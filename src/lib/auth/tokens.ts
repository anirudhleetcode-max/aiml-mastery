import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { prisma } from '@/lib/db';

/**
 * Single-use, expiring tokens for email verification and password reset.
 *
 * Two decisions carry the security here.
 *
 * Only a SHA-256 hash of the token reaches the database. The raw value exists
 * in exactly one place — the link in the email — so a database dump cannot be
 * replayed against these endpoints. That is the same reasoning that puts a
 * bcrypt hash in `passwordHash`; the difference is that these tokens are high
 * entropy and short lived, so a fast hash is the right one. bcrypt here would
 * add latency to defend against a guessing attack that 256 bits of randomness
 * has already made impossible.
 *
 * And consuming a token is a conditional update rather than a read followed by
 * a write. Two requests arriving with the same token race, and only the one
 * whose `updateMany` reports a changed row is allowed to proceed — which is
 * what makes "single use" true under concurrency rather than merely usually.
 */

export type TokenPurpose = 'email-verification' | 'password-reset';

/** How long each kind of link stays valid. */
export const TOKEN_TTL_MS: Record<TokenPurpose, number> = {
  // Long enough to survive a spam folder and a night's sleep.
  'email-verification': 1000 * 60 * 60 * 24,
  // Short: a reset link is a live credential for whoever holds it.
  'password-reset': 1000 * 60 * 60,
};

/** 256 bits, URL-safe. Long enough that guessing is not a threat model. */
export function generateToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export interface IssuedToken {
  token: string;
  expiresAt: Date;
}

/**
 * Issues a token, invalidating any outstanding one for the same purpose.
 *
 * Invalidating first means a resend genuinely replaces the previous link
 * rather than adding to a growing set of live credentials — so a link that
 * leaked from an old email stops working the moment a new one is requested.
 */
export async function issueToken(userId: string, purpose: TokenPurpose): Promise<IssuedToken> {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS[purpose]);

  await prisma.$transaction([
    prisma.authToken.updateMany({
      where: { userId, purpose, usedAt: null },
      data: { usedAt: new Date() },
    }),
    prisma.authToken.create({ data: { userId, purpose, tokenHash, expiresAt } }),
  ]);

  return { token, expiresAt };
}

export type ConsumeResult =
  | { ok: true; userId: string }
  | { ok: false; reason: 'invalid' | 'expired' | 'used' };

/**
 * Spends a token, or explains why it cannot be spent.
 *
 * The three failure reasons are deliberately distinguishable to the caller so
 * the UI can say something useful — an expired link and a typo need different
 * advice. They are *not* distinguishable to an attacker in a way that helps:
 * every reason requires already holding a token hash that exists, and the
 * generic ones collapse to "invalid".
 */
export async function consumeToken(rawToken: string, purpose: TokenPurpose): Promise<ConsumeResult> {
  if (typeof rawToken !== 'string' || rawToken.length < 16 || rawToken.length > 256) {
    return { ok: false, reason: 'invalid' };
  }

  const tokenHash = hashToken(rawToken);
  const row = await prisma.authToken.findUnique({
    where: { tokenHash },
    select: { id: true, userId: true, purpose: true, expiresAt: true, usedAt: true },
  });

  if (!row) return { ok: false, reason: 'invalid' };

  // A token minted for verification must not be spendable as a reset, even
  // though both live in one table.
  if (!purposeMatches(row.purpose, purpose)) return { ok: false, reason: 'invalid' };
  if (row.usedAt) return { ok: false, reason: 'used' };
  if (row.expiresAt.getTime() <= Date.now()) return { ok: false, reason: 'expired' };

  // The conditional update is the single-use guarantee: if a concurrent
  // request spent it microseconds ago, `count` is 0 and this caller loses.
  const { count } = await prisma.authToken.updateMany({
    where: { id: row.id, usedAt: null },
    data: { usedAt: new Date() },
  });
  if (count === 0) return { ok: false, reason: 'used' };

  return { ok: true, userId: row.userId };
}

/** Constant-time comparison of two purposes, for uniformity with the rest. */
function purposeMatches(stored: string, expected: TokenPurpose): boolean {
  const a = Buffer.from(stored);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Deletes tokens that are expired or spent.
 *
 * Safe to call on any schedule, or never — the table grows with issued links
 * rather than with requests, and every row is already inert.
 */
export async function pruneAuthTokens(): Promise<number> {
  const { count } = await prisma.authToken.deleteMany({
    where: { OR: [{ expiresAt: { lt: new Date() } }, { usedAt: { not: null } }] },
  });
  return count;
}
