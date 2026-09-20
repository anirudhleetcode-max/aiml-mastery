import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

/**
 * The rate limiter, against a real database.
 *
 * It moved out of process memory because an in-memory Map gives each instance
 * its own budget: four instances behind a load balancer would allow four
 * times the intended limit. These tests run against the shared store so the
 * counting, the window roll-over and the fail-open behaviour are checked
 * where they actually live.
 */

const DB_FILE = path.resolve(process.cwd(), 'prisma/ratelimit-test.db');
process.env.DATABASE_URL = `file:${DB_FILE}`;
process.env.AUTH_SECRET = 'rate-limit-test-secret-long-enough-0123456789';

let rateLimit: typeof import('@/lib/auth/rate-limit').rateLimit;
let pruneRateLimits: typeof import('@/lib/auth/rate-limit').pruneRateLimits;
let clientKey: typeof import('@/lib/auth/rate-limit').clientKey;
let sameOrigin: typeof import('@/lib/auth/rate-limit').sameOrigin;
let prisma: import('@prisma/client').PrismaClient;

beforeAll(async () => {
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
  execSync('npx prisma db push --skip-generate --accept-data-loss', {
    env: { ...process.env, DATABASE_URL: `file:${DB_FILE}` },
    stdio: 'pipe',
  });
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient({ datasources: { db: { url: `file:${DB_FILE}` } } });
  ({ rateLimit, pruneRateLimits, clientKey, sameOrigin } = await import('@/lib/auth/rate-limit'));
}, 120_000);

afterAll(async () => {
  await prisma?.$disconnect();
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
});

describe('rateLimit', () => {
  it('allows up to the limit and refuses the next request', async () => {
    const key = `test:allow:${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      const r = await rateLimit(key, 5, 60);
      expect(r.ok).toBe(true);
      expect(r.remaining).toBe(4 - i);
    }
    const blocked = await rateLimit(key, 5, 60);
    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('counts each key separately', async () => {
    const a = `test:sep:a:${Date.now()}`;
    const b = `test:sep:b:${Date.now()}`;
    await rateLimit(a, 1, 60);
    expect((await rateLimit(a, 1, 60)).ok).toBe(false);
    expect((await rateLimit(b, 1, 60)).ok).toBe(true);
  });

  it('starts a fresh window once the old one has passed', async () => {
    const key = `test:window:${Date.now()}`;
    await rateLimit(key, 1, 60);
    expect((await rateLimit(key, 1, 60)).ok).toBe(false);

    // Age the window rather than waiting a minute for it.
    await prisma.rateLimit.update({ where: { key }, data: { resetAt: BigInt(Date.now() - 1000) } });
    const after = await rateLimit(key, 1, 60);
    expect(after.ok).toBe(true);
    expect(after.remaining).toBe(0);
  });

  it('shares one budget across callers, which is the point of moving it', async () => {
    // Two "instances" are just two sequential callers against the same store;
    // an in-process Map would have given each its own count.
    const key = `test:shared:${Date.now()}`;
    await rateLimit(key, 3, 60);
    await rateLimit(key, 3, 60);
    await rateLimit(key, 3, 60);
    expect((await rateLimit(key, 3, 60)).ok).toBe(false);
  });

  it('keeps one row per key rather than one per request', async () => {
    const key = `test:rows:${Date.now()}`;
    for (let i = 0; i < 10; i++) await rateLimit(key, 100, 60);
    expect(await prisma.rateLimit.count({ where: { key } })).toBe(1);
  });

  it('prunes only windows that have expired', async () => {
    const live = `test:prune:live:${Date.now()}`;
    const dead = `test:prune:dead:${Date.now()}`;
    await rateLimit(live, 5, 600);
    await rateLimit(dead, 5, 600);
    await prisma.rateLimit.update({ where: { key: dead }, data: { resetAt: BigInt(Date.now() - 1) } });

    await pruneRateLimits();
    expect(await prisma.rateLimit.count({ where: { key: dead } })).toBe(0);
    expect(await prisma.rateLimit.count({ where: { key: live } })).toBe(1);
  });
});

describe('clientKey', () => {
  it('prefers the forwarded client address and scopes the key', () => {
    const req = new Request('https://example.com', { headers: { 'x-forwarded-for': '203.0.113.9, 10.0.0.1' } });
    expect(clientKey(req, 'login')).toBe('login:203.0.113.9');
  });

  it('falls back sensibly when no address header is present', () => {
    expect(clientKey(new Request('https://example.com'), 'login')).toBe('login:local');
  });
});

describe('sameOrigin', () => {
  it('accepts a matching origin and a request that omits one', () => {
    const match = new Request('https://example.com', {
      headers: { origin: 'https://example.com', host: 'example.com' },
    });
    expect(sameOrigin(match)).toBe(true);
    expect(sameOrigin(new Request('https://example.com'))).toBe(true);
  });

  it('rejects a cross-site origin, including a lookalike subdomain', () => {
    for (const origin of ['https://evil.com', 'https://example.com.evil.com', 'https://sub.example.com']) {
      const req = new Request('https://example.com', { headers: { origin, host: 'example.com' } });
      expect(sameOrigin(req)).toBe(false);
    }
  });

  it('rejects a malformed origin rather than throwing', () => {
    const req = new Request('https://example.com', { headers: { origin: 'not a url', host: 'example.com' } });
    expect(sameOrigin(req)).toBe(false);
  });
});
