import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { consumeToken } from '@/lib/auth/tokens';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ token: z.string().min(16).max(256) });

/**
 * Spends a verification token.
 *
 * Rate limited on the client rather than the token because the token is the
 * thing being guessed: a per-token limit would be per-guess and therefore no
 * limit at all. Guessing is not a realistic attack against 256 bits, but the
 * limit also caps the cost of someone replaying a captured link in a loop.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const limit = await rateLimit(clientKey(req, 'verify-email'), 20, 60 * 10);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ status: 'invalid' as const }, { status: 400 });

  const result = await consumeToken(parsed.data.token, 'email-verification');
  if (!result.ok) {
    // `used` is reported as its own state because the common cause is a
    // learner clicking the link twice, and telling them their account is
    // already verified is more useful than calling it invalid.
    return NextResponse.json({ status: result.reason }, { status: result.reason === 'invalid' ? 400 : 410 });
  }

  await prisma.user.update({
    where: { id: result.userId },
    // `updatedAt` moves too; the timestamp is the audit record.
    data: { emailVerifiedAt: new Date() },
  });

  return NextResponse.json({ status: 'verified' as const });
}
