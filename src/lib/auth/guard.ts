import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { readSession, type SessionPayload } from './session';

/**
 * Verifies the JWT *and* that the server-side session row is still live, so a
 * logged-out or revoked session cannot be resurrected by replaying a cookie.
 */
export interface CurrentUser {
  id: string;
  email: string;
  /** Null until the address is confirmed; the timestamp is the audit record. */
  emailVerifiedAt: Date | null;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await readSession();
  if (!session) return null;

  const row = await prisma.authSession.findUnique({
    where: { id: session.sessionId },
    select: {
      revokedAt: true,
      expiresAt: true,
      userId: true,
      user: { select: { id: true, email: true, emailVerifiedAt: true } },
    },
  });

  if (!row || row.revokedAt || row.expiresAt < new Date() || row.userId !== session.userId) return null;
  return row.user;
}

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

/** API-route variant: returns null instead of redirecting. */
export async function apiUser(): Promise<CurrentUser | null> {
  return getCurrentUser();
}

export type { SessionPayload };
