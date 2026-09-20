import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

/**
 * The verification / reset token layer, against a real database.
 *
 * Every property that makes these links safe is a database-level property —
 * single use under concurrency, invalidation of the previous link, purpose
 * isolation, expiry — so mocking Prisma would test the mock. These run
 * against a throwaway SQLite file created from the real schema.
 */

const DB_FILE = path.resolve(process.cwd(), 'prisma/authtoken-test.db');
process.env.DATABASE_URL = `file:${DB_FILE}`;
process.env.AUTH_SECRET = 'auth-token-test-secret-long-enough-0123456789';

let tokens: typeof import('@/lib/auth/tokens');
let prisma: import('@prisma/client').PrismaClient;
let userA = '';
let userB = '';

beforeAll(async () => {
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
  execSync('npx prisma db push --skip-generate --accept-data-loss', {
    env: { ...process.env, DATABASE_URL: `file:${DB_FILE}` },
    stdio: 'pipe',
  });
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient({ datasources: { db: { url: `file:${DB_FILE}` } } });
  tokens = await import('@/lib/auth/tokens');
}, 120_000);

afterAll(async () => {
  await prisma?.$disconnect();
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
});

beforeEach(async () => {
  await prisma.authToken.deleteMany();
  await prisma.user.deleteMany();
  const a = await prisma.user.create({ data: { email: 'a@example.com', passwordHash: 'x' } });
  const b = await prisma.user.create({ data: { email: 'b@example.com', passwordHash: 'x' } });
  userA = a.id;
  userB = b.id;
});

describe('token generation', () => {
  it('produces URL-safe values with 256 bits of entropy', () => {
    const token = tokens.generateToken();
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    // 32 random bytes, base64url, unpadded.
    expect(token.length).toBe(43);
  });

  it('never repeats across a large sample', () => {
    const seen = new Set(Array.from({ length: 5_000 }, () => tokens.generateToken()));
    expect(seen.size).toBe(5_000);
  });

  it('hashes deterministically to 64 hex characters', () => {
    const token = tokens.generateToken();
    expect(tokens.hashToken(token)).toMatch(/^[0-9a-f]{64}$/);
    expect(tokens.hashToken(token)).toBe(tokens.hashToken(token));
    expect(tokens.hashToken(token)).not.toBe(tokens.hashToken(tokens.generateToken()));
  });
});

describe('storage', () => {
  it('never writes the raw token to the database', async () => {
    const { token } = await tokens.issueToken(userA, 'email-verification');
    const rows = await prisma.authToken.findMany();
    expect(rows).toHaveLength(1);
    expect(rows[0].tokenHash).toBe(tokens.hashToken(token));
    // The decisive assertion: the raw value appears nowhere in the row.
    expect(JSON.stringify(rows[0])).not.toContain(token);
  });

  it('ties the token to the account that asked for it', async () => {
    const { token } = await tokens.issueToken(userB, 'password-reset');
    const result = await tokens.consumeToken(token, 'password-reset');
    expect(result).toEqual({ ok: true, userId: userB });
  });

  it('gives each purpose its own lifetime', () => {
    expect(tokens.TOKEN_TTL_MS['password-reset']).toBeLessThan(tokens.TOKEN_TTL_MS['email-verification']);
    expect(tokens.TOKEN_TTL_MS['password-reset']).toBe(60 * 60 * 1000);
  });
});

describe('consuming', () => {
  it('accepts a fresh token exactly once', async () => {
    const { token } = await tokens.issueToken(userA, 'email-verification');
    expect(await tokens.consumeToken(token, 'email-verification')).toEqual({ ok: true, userId: userA });
    expect(await tokens.consumeToken(token, 'email-verification')).toEqual({ ok: false, reason: 'used' });
  });

  it('lets exactly one of two concurrent requests win', async () => {
    const { token } = await tokens.issueToken(userA, 'password-reset');
    const results = await Promise.all([
      tokens.consumeToken(token, 'password-reset'),
      tokens.consumeToken(token, 'password-reset'),
      tokens.consumeToken(token, 'password-reset'),
    ]);
    expect(results.filter((r) => r.ok)).toHaveLength(1);
    expect(results.filter((r) => !r.ok)).toHaveLength(2);
  });

  it('rejects an expired token', async () => {
    const { token } = await tokens.issueToken(userA, 'password-reset');
    await prisma.authToken.updateMany({ data: { expiresAt: new Date(Date.now() - 1000) } });
    expect(await tokens.consumeToken(token, 'password-reset')).toEqual({ ok: false, reason: 'expired' });
  });

  it('will not spend a verification token as a password reset', async () => {
    const { token } = await tokens.issueToken(userA, 'email-verification');
    expect(await tokens.consumeToken(token, 'password-reset')).toEqual({ ok: false, reason: 'invalid' });
    // and the token is still unspent, so the legitimate use still works
    expect(await tokens.consumeToken(token, 'email-verification')).toEqual({ ok: true, userId: userA });
  });

  it('rejects a token that was never issued', async () => {
    expect(await tokens.consumeToken(tokens.generateToken(), 'email-verification')).toEqual({
      ok: false,
      reason: 'invalid',
    });
  });

  it.each([
    ['empty', ''],
    ['too short to be a token', 'abc'],
    ['absurdly long', 'a'.repeat(5000)],
    ['a raw sha-256 hash of a real token', 'f'.repeat(64)],
  ])('rejects a malformed token (%s)', async (_label, value) => {
    expect(await tokens.consumeToken(value, 'email-verification')).toEqual({ ok: false, reason: 'invalid' });
  });

  it('rejects the stored hash presented as if it were the token', async () => {
    const { token } = await tokens.issueToken(userA, 'email-verification');
    const stored = (await prisma.authToken.findFirst())!.tokenHash;
    expect(stored).not.toBe(token);
    expect(await tokens.consumeToken(stored, 'email-verification')).toEqual({ ok: false, reason: 'invalid' });
  });
});

describe('reissue', () => {
  it('invalidates the previous link for the same purpose', async () => {
    const first = await tokens.issueToken(userA, 'password-reset');
    const second = await tokens.issueToken(userA, 'password-reset');

    expect(await tokens.consumeToken(first.token, 'password-reset')).toEqual({ ok: false, reason: 'used' });
    expect(await tokens.consumeToken(second.token, 'password-reset')).toEqual({ ok: true, userId: userA });
  });

  it('leaves the other purpose alone', async () => {
    const verify = await tokens.issueToken(userA, 'email-verification');
    await tokens.issueToken(userA, 'password-reset');
    expect(await tokens.consumeToken(verify.token, 'email-verification')).toEqual({ ok: true, userId: userA });
  });

  it('leaves another account alone', async () => {
    const forB = await tokens.issueToken(userB, 'password-reset');
    await tokens.issueToken(userA, 'password-reset');
    expect(await tokens.consumeToken(forB.token, 'password-reset')).toEqual({ ok: true, userId: userB });
  });
});

describe('pruning', () => {
  it('removes spent and expired rows and keeps live ones', async () => {
    const live = await tokens.issueToken(userA, 'email-verification');
    const spent = await tokens.issueToken(userB, 'email-verification');
    await tokens.consumeToken(spent.token, 'email-verification');
    await prisma.authToken.create({
      data: { userId: userB, purpose: 'password-reset', tokenHash: 'stale', expiresAt: new Date(Date.now() - 1000) },
    });

    expect(await tokens.pruneAuthTokens()).toBe(2);
    const left = await prisma.authToken.findMany();
    expect(left).toHaveLength(1);
    expect(left[0].tokenHash).toBe(tokens.hashToken(live.token));
  });
});

describe('cascade', () => {
  it('drops tokens when the account is deleted', async () => {
    await tokens.issueToken(userA, 'email-verification');
    await prisma.user.delete({ where: { id: userA } });
    expect(await prisma.authToken.count({ where: { userId: userA } })).toBe(0);
  });
});
