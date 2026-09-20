import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { apiUser } from '@/lib/auth/guard';
import { issueToken } from '@/lib/auth/tokens';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { sendEmail } from '@/lib/email/send';
import { verificationEmail } from '@/lib/email/messages';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Sends a fresh verification link to the signed-in account.
 *
 * Deliberately requires a session rather than taking an email address. An
 * unauthenticated resend endpoint is an email-sending oracle: anyone could
 * point it at any address and confirm, by whether mail arrives, that the
 * address has an account here. Requiring a session removes the oracle
 * entirely, and the only person who needs a resend is already signed in —
 * signup creates a session before the address is confirmed.
 *
 * Two limits apply together: one per client, one per account. The account
 * limit is what stops a signed-in user from using the endpoint to mailbomb
 * their own address, which is the abuse the client limit cannot see.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const user = await apiUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const perClient = await rateLimit(clientKey(req, 'resend-verify'), 5, 60 * 15);
  const perAccount = await rateLimit(`resend-verify:user:${user.id}`, 3, 60 * 15);
  if (!perClient.ok || !perAccount.ok) {
    const retry = Math.max(perClient.retryAfterSeconds, perAccount.retryAfterSeconds);
    return NextResponse.json(
      { error: 'A link was sent recently. Check your inbox and spam folder, then try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(retry) } },
    );
  }

  const row = await prisma.user.findUnique({
    where: { id: user.id },
    select: { email: true, emailVerifiedAt: true, profile: { select: { name: true } } },
  });
  if (!row) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  // Already verified is a success, not an error: the caller wanted a verified
  // address and has one.
  if (row.emailVerifiedAt) return NextResponse.json({ status: 'already-verified' as const });

  const { token } = await issueToken(user.id, 'email-verification');
  const result = await sendEmail(verificationEmail(row.email, row.profile?.name ?? '', token));
  if (!result.ok) {
    console.error('[email] verification send failed:', result.error);
  }

  // The response does not report whether delivery succeeded. A provider
  // outage is ours to fix, not something to expose as a per-address signal.
  return NextResponse.json({ status: 'sent' as const });
}
