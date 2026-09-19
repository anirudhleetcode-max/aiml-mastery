import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';

export const runtime = 'nodejs';

const schema = z.object({ email: z.string().email().max(200), password: z.string().min(1).max(200) });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const limit = rateLimit(clientKey(req, 'login'), 10, 60 * 10);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Check the form and try again.' }, { status: 400 });

  const email = parsed.data.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true, profile: { select: { onboardedAt: true } } },
  });

  // Same generic message and comparable timing whether or not the email exists,
  // so this endpoint cannot be used to enumerate accounts.
  const valid = user ? await verifyPassword(parsed.data.password, user.passwordHash) : await verifyPassword(parsed.data.password, '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvali');

  if (!user || !valid) {
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
  }

  const session = await prisma.authSession.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      userAgent: req.headers.get('user-agent')?.slice(0, 200) ?? null,
    },
    select: { id: true },
  });

  await setSessionCookie(await createSessionToken({ userId: user.id, sessionId: session.id, email: user.email }));
  return NextResponse.json({ ok: true, needsOnboarding: !user.profile?.onboardedAt });
}
