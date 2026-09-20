import { NextResponse } from 'next/server';
import { apiUser } from '@/lib/auth/guard';
import { rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { applyEvents } from '@/lib/sync/apply';
import { syncRequestSchema } from '@/lib/sync/events';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The single write endpoint.
 *
 * Accepts a batch of learner events, applies them idempotently inside one
 * transaction, and returns the authoritative state. A client that has been
 * offline simply posts its queue; duplicates are recognised by event id and
 * skipped, so retrying a partially-delivered batch is always safe.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const user = await apiUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const limit = await rateLimit(`sync:${user.id}`, 120, 60);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Slow down a moment.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = syncRequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Malformed sync payload.', issues: parsed.error.issues.slice(0, 5) }, { status: 400 });
  }

  try {
    const result = await applyEvents(user.id, parsed.data.events);
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[sync] failed', error);
    // The client keeps its queue on a 5xx and retries, so nothing is lost.
    return NextResponse.json({ error: 'Could not save right now. Your progress is queued and will retry.' }, { status: 503 });
  }
}
