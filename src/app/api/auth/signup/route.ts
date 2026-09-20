import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { newUserData } from '@/lib/auth/bootstrap';
import { issueToken } from '@/lib/auth/tokens';
import { sendEmail } from '@/lib/email/send';
import { verificationEmail } from '@/lib/email/messages';

export const runtime = 'nodejs';

const schema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200),
  name: z.string().min(1).max(80),
});

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const limit = await rateLimit(clientKey(req, 'signup'), 5, 60 * 15);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many sign-up attempts. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Check the form and try again.' }, { status: 400 });

  const { email, password, name } = parsed.data;
  const policy = validatePassword(password);
  if (!policy.ok) return NextResponse.json({ error: policy.message }, { status: 400 });

  const normalisedEmail = email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email: normalisedEmail }, select: { id: true } });
  if (existing) {
    return NextResponse.json({ error: 'An account with that email already exists.' }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: newUserData(normalisedEmail, name.trim(), passwordHash),
    select: { id: true, email: true },
  });

  const session = await prisma.authSession.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      userAgent: req.headers.get('user-agent')?.slice(0, 200) ?? null,
    },
    select: { id: true },
  });

  await setSessionCookie(await createSessionToken({ userId: user.id, sessionId: session.id, email: user.email }));

  // The account is usable immediately and unverified. Blocking a new learner
  // behind a mailbox round trip before they have seen anything is how you
  // lose them; the banner and the gentle gate below do the work instead.
  const { token } = await issueToken(user.id, 'email-verification');
  const sent = await sendEmail(verificationEmail(user.email, name.trim(), token));
  if (!sent.ok) {
    // A provider outage must not fail a signup that otherwise succeeded —
    // the learner can resend from the banner.
    console.error('[email] verification send failed:', sent.error);
  }

  return NextResponse.json({ ok: true, needsOnboarding: true });
}
