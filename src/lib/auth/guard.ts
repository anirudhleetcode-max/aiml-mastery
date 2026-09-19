import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { readSession, type SessionPayload } from './session';

/**
 * Verifies the JWT *and* that the server-side session row is still live, so a
 * logged-out or revoked session cannot be resurrected by replaying a cookie.
 */
export async function getCurrentUser(): Promise<{ id: string; email: string } | null> {
  const session = await readSession();
  if (!session) return null;

  const row = await prisma.authSession.findUnique({
    where: { id: session.sessionId },
    select: { revokedAt: true, expiresAt: true, userId: true, user: { select: { id: true, email: true } } },
  });

  if (!row || row.revokedAt || row.expiresAt < new Date() || row.userId !== session.userId) return null;
  return row.user;
}

export async function requireUser(): Promise<{ id: string; email: string }> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

/** API-route variant: returns null instead of redirecting. */
export async function apiUser(): Promise<{ id: string; email: string } | null> {
  return getCurrentUser();
}

export type { SessionPayload };
