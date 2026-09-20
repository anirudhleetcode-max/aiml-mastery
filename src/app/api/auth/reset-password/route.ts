import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { consumeToken } from '@/lib/auth/tokens';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { clearSessionCookie } from '@/lib/auth/session';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  token: z.string().min(16).max(256),
  password: z.string().min(1).max(200),
});

/**
 * Completes a password reset.
 *
 * Three things happen together, in one transaction, because a partial reset
 * is worse than none: the password changes, every session is revoked, and any
 * other outstanding reset token is spent.
 *
 * Revoking sessions is the point of the whole flow. Somebody resetting a
 * password has usually lost control of the account or fears they have, and
 * leaving a thirty-day cookie alive on the attacker's machine would make the
 * reset cosmetic. The current browser is signed out too — a reset ends with a
 * deliberate sign-in, which also proves the new password was typed correctly.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const limit = await rateLimit(clientKey(req, 'reset-password'), 10, 60 * 15);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ status: 'invalid' as const }, { status: 400 });

  // The policy is checked before the token is spent, so a password the policy
  // rejects does not burn a link the learner would then have to re-request.
  const policy = validatePassword(parsed.data.password);
  if (!policy.ok) return NextResponse.json({ status: 'weak' as const, error: policy.message }, { status: 400 });

  const result = await consumeToken(parsed.data.token, 'password-reset');
  if (!result.ok) {
    return NextResponse.json({ status: result.reason }, { status: result.reason === 'invalid' ? 400 : 410 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const now = new Date();

  await prisma.$transaction([
    prisma.user.update({
      where: { id: result.userId },
      data: {
        passwordHash,
        // Completing a reset proves control of the mailbox, which is exactly
        // what verification asks for — so an unverified account that resets
        // its password is verified by the same evidence.
        emailVerifiedAt: now,
      },
    }),
    prisma.authSession.updateMany({
      where: { userId: result.userId, revokedAt: null },
      data: { revokedAt: now },
    }),
    prisma.authToken.updateMany({
      where: { userId: result.userId, purpose: 'password-reset', usedAt: null },
      data: { usedAt: now },
    }),
  ]);

  await clearSessionCookie();
  return NextResponse.json({ status: 'reset' as const });
}
