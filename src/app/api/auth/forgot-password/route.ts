import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { issueToken } from '@/lib/auth/tokens';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { sendEmail } from '@/lib/email/send';
import { passwordResetEmail } from '@/lib/email/messages';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ email: z.string().email().max(200) });

/** The one response this endpoint gives, whatever happened. */
const GENERIC = {
  status: 'sent' as const,
  message: 'If an account exists for that address, a reset link is on its way.',
};

/**
 * Starts a password reset.
 *
 * Always answers identically. Whether the address has an account, whether the
 * account is verified, whether mail was actually delivered — none of it is
 * observable, because any difference turns this into a free membership oracle
 * for a scraped address list.
 *
 * The timing is not constant, and deliberately so: making it constant would
 * mean doing the same work for a non-existent account, which means issuing
 * and sending nothing while pretending to. The rate limit is what bounds the
 * value of a timing signal here, and it is the honest control.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const limit = await rateLimit(clientKey(req, 'forgot-password'), 5, 60 * 15);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  // Even a malformed address gets the generic answer, so that "is this a
  // valid address here?" cannot be probed through the 400.
  if (!parsed.success) return NextResponse.json(GENERIC);

  const email = parsed.data.email.toLowerCase().trim();

  // A second limit keyed on the address stops one attacker cycling client
  // identities to bombard a single victim's inbox.
  const perAddress = await rateLimit(`forgot-password:addr:${email}`, 3, 60 * 15);
  if (!perAddress.ok) return NextResponse.json(GENERIC);

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, profile: { select: { name: true } } },
  });

  if (user) {
    const { token } = await issueToken(user.id, 'password-reset');
    const result = await sendEmail(passwordResetEmail(user.email, user.profile?.name ?? '', token));
    if (!result.ok) {
      console.error('[email] password reset send failed:', result.error);
    }
  }

  return NextResponse.json(GENERIC);
}
