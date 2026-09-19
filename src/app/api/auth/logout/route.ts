import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { clearSessionCookie, readSession } from '@/lib/auth/session';
import { sameOrigin } from '@/lib/auth/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const session = await readSession();
  if (session) {
    // Revoke server-side too, so the token is dead even if the cookie survives.
    await prisma.authSession
      .update({ where: { id: session.sessionId }, data: { revokedAt: new Date() } })
      .catch(() => undefined);
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
