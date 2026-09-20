import { NextResponse } from 'next/server';
import { z } from 'zod';
import { apiUser } from '@/lib/auth/guard';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { answer } from '@/features/tutor/engine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  query: z.string().min(1).max(500),
  currentUnitId: z.string().regex(/^[A-Z]{2,4}-\d{3}$/).optional(),
});

/**
 * The tutor runs on the server because it reads the full curriculum, which is
 * several megabytes and has no business in a client bundle. It also means the
 * learner's context (what they have studied, what they keep getting wrong) is
 * assembled from the authoritative state rather than from whatever the browser
 * happens to believe.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const user = await apiUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const limit = rateLimit(clientKey(req, `tutor:${user.id}`), 60, 60);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'One question at a time — try again in a moment.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });

  const state = await loadState(user.id);
  if (!state) return NextResponse.json({ error: 'No learner state.' }, { status: 404 });

  const o = buildOverview(state);

  const missedConcepts = Object.entries(
    state.mistakes
      .filter((m) => !m.resolved)
      .reduce<Record<string, number>>((acc, m) => {
        acc[m.concept] = (acc[m.concept] ?? 0) + m.timesWrong;
        return acc;
      }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .map(([concept]) => concept);

  const reply = answer(parsed.data.query, {
    currentUnitId: parsed.data.currentUnitId,
    completedUnitIds: [...o.completedUnitIds],
    weakUnitIds: o.weakUnits.map((w) => w.unit.id),
    missedConcepts,
    nextUnitId: o.continueWith?.id ?? o.nextUp?.id,
    completedCount: o.totals.completed,
    totalCount: o.totals.total,
  });

  return NextResponse.json({ reply }, { headers: { 'Cache-Control': 'no-store' } });
}
