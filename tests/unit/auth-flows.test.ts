import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

/**
 * The email-verification and password-reset routes, end to end against a real
 * database.
 *
 * These call the actual route handlers rather than re-implementing their
 * logic, because the properties worth testing — that a reset revokes every
 * session, that a forgotten address cannot be distinguished from a known one,
 * that a spent link stays spent — live in the handler and the transaction, not
 * in a helper.
 *
 * Two things are stubbed and nothing else: `next/headers` (there is no request
 * scope outside a server) and the email transport (so the test can read the
 * link that would have been mailed). The rate limiter, the token layer, the
 * schema and the password policy all run for real.
 */

const DB_FILE = path.resolve(process.cwd(), 'prisma/authflow-test.db');
process.env.DATABASE_URL = `file:${DB_FILE}`;
process.env.AUTH_SECRET = 'auth-flow-test-secret-long-enough-0123456789';
process.env.APP_URL = 'http://localhost:3000';

/** Cookie jar standing in for the browser's. Hoisted for the mock factories. */
const { jar, outbox } = vi.hoisted(() => ({
  jar: new Map<string, string>(),
  /** Every message the app tried to send, in order. */
  outbox: [] as { to: string; subject: string; text: string; html: string }[],
}));

vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string, opts?: { maxAge?: number }) => {
      if (opts?.maxAge === 0 || value === '') jar.delete(name);
      else jar.set(name, value);
    },
    delete: (name: string) => jar.delete(name),
  }),
}));

vi.mock('@/lib/email/send', async () => {
  const actual = await vi.importActual<typeof import('@/lib/email/send')>('@/lib/email/send');
  return {
    ...actual,
    sendEmail: async (message: { to: string; subject: string; text: string; html: string }) => {
      outbox.push(message);
      return { ok: true as const };
    },
  };
});

let prisma: import('@prisma/client').PrismaClient;
let routes: {
  signup: typeof import('@/app/api/auth/signup/route').POST;
  login: typeof import('@/app/api/auth/login/route').POST;
  verify: typeof import('@/app/api/auth/verify-email/route').POST;
  resend: typeof import('@/app/api/auth/resend-verification/route').POST;
  forgot: typeof import('@/app/api/auth/forgot-password/route').POST;
  reset: typeof import('@/app/api/auth/reset-password/route').POST;
};

const ORIGIN = 'http://localhost:3000';

/** A request the way the app's own fetch would make it. */
function post(url: string, body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`${ORIGIN}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: 'localhost:3000',
      origin: ORIGIN,
      'x-forwarded-for': '203.0.113.7',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

/** Pulls the token out of the most recent message to an address. */
function linkTokenFor(email: string): string {
  const message = [...outbox].reverse().find((m) => m.to === email);
  if (!message) throw new Error(`no message sent to ${email}`);
  const match = /[?&]token=([A-Za-z0-9_-]+)/.exec(message.text) ?? /[?&]token=([A-Za-z0-9_-]+)/.exec(message.html);
  if (!match) throw new Error(`no token in message to ${email}`);
  return match[1];
}

beforeAll(async () => {
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
  execSync('npx prisma db push --skip-generate --accept-data-loss', {
    env: { ...process.env, DATABASE_URL: `file:${DB_FILE}` },
    stdio: 'pipe',
  });
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient({ datasources: { db: { url: `file:${DB_FILE}` } } });
  routes = {
    signup: (await import('@/app/api/auth/signup/route')).POST,
    login: (await import('@/app/api/auth/login/route')).POST,
    verify: (await import('@/app/api/auth/verify-email/route')).POST,
    resend: (await import('@/app/api/auth/resend-verification/route')).POST,
    forgot: (await import('@/app/api/auth/forgot-password/route')).POST,
    reset: (await import('@/app/api/auth/reset-password/route')).POST,
  };
}, 120_000);

afterAll(async () => {
  await prisma?.$disconnect();
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
});

beforeEach(async () => {
  jar.clear();
  outbox.length = 0;
  await prisma.rateLimit.deleteMany();
  await prisma.authToken.deleteMany();
  await prisma.authSession.deleteMany();
  await prisma.user.deleteMany();
});

afterEach(() => {
  vi.useRealTimers();
});

const PASSWORD = 'correct-horse-battery';

async function signup(email: string, password = PASSWORD) {
  const res = await routes.signup(post('/api/auth/signup', { email, password, name: 'Test Learner' }));
  return { res, body: await res.json() };
}

describe('signup issues a verification link', () => {
  it('creates the account unverified and mails a link', async () => {
    const { res } = await signup('new@example.com');
    expect(res.status).toBe(200);

    const user = await prisma.user.findUnique({ where: { email: 'new@example.com' } });
    expect(user?.emailVerifiedAt).toBeNull();

    expect(outbox).toHaveLength(1);
    expect(outbox[0].to).toBe('new@example.com');
    expect(linkTokenFor('new@example.com')).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it('signs the learner in immediately — an unconfirmed address is not a lockout', async () => {
    await signup('new@example.com');
    expect(jar.get('aiml_session')).toBeTruthy();
  });

  it('never puts the raw token in the database', async () => {
    await signup('new@example.com');
    const token = linkTokenFor('new@example.com');
    const rows = await prisma.authToken.findMany();
    expect(rows.map((r) => r.tokenHash)).not.toContain(token);
  });
});

describe('verifying an address', () => {
  it('confirms the account and is idempotent afterwards', async () => {
    await signup('new@example.com');
    const token = linkTokenFor('new@example.com');

    const first = await routes.verify(post('/api/auth/verify-email', { token }));
    expect(await first.json()).toEqual({ status: 'verified' });

    const user = await prisma.user.findUnique({ where: { email: 'new@example.com' } });
    expect(user?.emailVerifiedAt).toBeInstanceOf(Date);

    const second = await routes.verify(post('/api/auth/verify-email', { token }));
    expect((await second.json()).status).toBe('used');
  });

  it('reports an expired link as expired, not as invalid', async () => {
    await signup('new@example.com');
    const token = linkTokenFor('new@example.com');
    await prisma.authToken.updateMany({ data: { expiresAt: new Date(Date.now() - 1000) } });

    const res = await routes.verify(post('/api/auth/verify-email', { token }));
    expect((await res.json()).status).toBe('expired');
  });

  it('rejects a forged token without touching any account', async () => {
    await signup('new@example.com');
    const res = await routes.verify(post('/api/auth/verify-email', { token: 'A'.repeat(43) }));
    expect((await res.json()).status).toBe('invalid');
    const user = await prisma.user.findUnique({ where: { email: 'new@example.com' } });
    expect(user?.emailVerifiedAt).toBeNull();
  });

  it('will not verify one account with another account’s link', async () => {
    await signup('a@example.com');
    const tokenA = linkTokenFor('a@example.com');
    jar.clear();
    await signup('b@example.com');

    await routes.verify(post('/api/auth/verify-email', { token: tokenA }));
    const b = await prisma.user.findUnique({ where: { email: 'b@example.com' } });
    expect(b?.emailVerifiedAt).toBeNull();
    const a = await prisma.user.findUnique({ where: { email: 'a@example.com' } });
    expect(a?.emailVerifiedAt).toBeInstanceOf(Date);
  });

  it('rejects a cross-origin post', async () => {
    await signup('new@example.com');
    const token = linkTokenFor('new@example.com');
    const res = await routes.verify(
      post('/api/auth/verify-email', { token }, { origin: 'https://evil.example' }),
    );
    expect(res.status).toBe(403);
  });
});

describe('resending a verification link', () => {
  it('requires a session, so it cannot be used to probe addresses', async () => {
    await signup('new@example.com');
    jar.clear();
    const res = await routes.resend(post('/api/auth/resend-verification', {}));
    expect(res.status).toBe(401);
  });

  it('replaces the previous link rather than adding a second live one', async () => {
    await signup('new@example.com');
    const first = linkTokenFor('new@example.com');

    await routes.resend(post('/api/auth/resend-verification', {}));
    const second = linkTokenFor('new@example.com');
    expect(second).not.toBe(first);

    expect((await (await routes.verify(post('/api/auth/verify-email', { token: first }))).json()).status).toBe('used');
    expect((await (await routes.verify(post('/api/auth/verify-email', { token: second }))).json()).status).toBe(
      'verified',
    );
  });

  it('answers already-verified without sending anything', async () => {
    await signup('new@example.com');
    await routes.verify(post('/api/auth/verify-email', { token: linkTokenFor('new@example.com') }));
    const before = outbox.length;

    const res = await routes.resend(post('/api/auth/resend-verification', {}));
    expect((await res.json()).status).toBe('already-verified');
    expect(outbox).toHaveLength(before);
  });

  it('rate-limits the account so it cannot be used to mailbomb its own inbox', async () => {
    await signup('new@example.com');
    const statuses: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      statuses.push((await routes.resend(post('/api/auth/resend-verification', {}))).status);
    }
    expect(statuses.slice(0, 3)).toEqual([200, 200, 200]);
    expect(statuses.slice(3)).toEqual([429, 429]);
  });
});

describe('an unverified account can still sign in', () => {
  it('logs in and is flagged for the banner rather than blocked', async () => {
    await signup('new@example.com');
    jar.clear();

    const res = await routes.login(post('/api/auth/login', { email: 'new@example.com', password: PASSWORD }));
    expect(res.status).toBe(200);
    expect(jar.get('aiml_session')).toBeTruthy();

    const user = await prisma.user.findUnique({ where: { email: 'new@example.com' } });
    expect(user?.emailVerifiedAt).toBeNull();
  });
});

describe('forgot password never reveals whether an account exists', () => {
  it('answers identically for a known and an unknown address', async () => {
    await signup('known@example.com');
    outbox.length = 0;

    const hit = await routes.forgot(post('/api/auth/forgot-password', { email: 'known@example.com' }));
    const miss = await routes.forgot(post('/api/auth/forgot-password', { email: 'nobody@example.com' }));

    expect(hit.status).toBe(miss.status);
    expect(await hit.json()).toEqual(await miss.json());

    // ...and only the real account was mailed.
    expect(outbox.map((m) => m.to)).toEqual(['known@example.com']);
  });

  it('answers identically for a malformed address', async () => {
    const good = await routes.forgot(post('/api/auth/forgot-password', { email: 'known@example.com' }));
    const junk = await routes.forgot(post('/api/auth/forgot-password', { email: 'not-an-address' }));
    expect(junk.status).toBe(good.status);
    expect(await junk.json()).toEqual(await good.json());
  });

  it('never puts the reset token in the response body', async () => {
    await signup('known@example.com');
    const res = await routes.forgot(post('/api/auth/forgot-password', { email: 'known@example.com' }));
    const body = JSON.stringify(await res.json());
    expect(body).not.toContain(linkTokenFor('known@example.com'));
    expect(body.toLowerCase()).not.toContain('token');
  });

  it('caps requests aimed at one address, still without changing the answer', async () => {
    await signup('victim@example.com');
    outbox.length = 0;

    const statuses: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      const res = await routes.forgot(
        post('/api/auth/forgot-password', { email: 'victim@example.com' }, { 'x-forwarded-for': `198.51.100.${i}` }),
      );
      statuses.push(res.status);
    }
    // Every answer is the generic 200 — the limit is invisible to the caller —
    // but the inbox stops receiving.
    expect(statuses).toEqual([200, 200, 200, 200, 200]);
    expect(outbox).toHaveLength(3);
  });
});

describe('completing a password reset', () => {
  async function requestReset(email: string) {
    await routes.forgot(post('/api/auth/forgot-password', { email }));
    return linkTokenFor(email);
  }

  it('changes the password and signs the old password out of existence', async () => {
    await signup('u@example.com');
    const token = await requestReset('u@example.com');

    const res = await routes.reset(post('/api/auth/reset-password', { token, password: 'a-brand-new-passphrase' }));
    expect(await res.json()).toEqual({ status: 'reset' });

    const old = await routes.login(post('/api/auth/login', { email: 'u@example.com', password: PASSWORD }));
    expect(old.status).toBe(401);

    const fresh = await routes.login(
      post('/api/auth/login', { email: 'u@example.com', password: 'a-brand-new-passphrase' }),
    );
    expect(fresh.status).toBe(200);
  });

  it('revokes every existing session', async () => {
    await signup('u@example.com');
    const before = await prisma.authSession.findMany({ where: { revokedAt: null } });
    expect(before.length).toBeGreaterThan(0);

    const token = await requestReset('u@example.com');
    await routes.reset(post('/api/auth/reset-password', { token, password: 'a-brand-new-passphrase' }));

    expect(await prisma.authSession.count({ where: { revokedAt: null } })).toBe(0);
    // and the current browser's cookie is cleared too
    expect(jar.get('aiml_session')).toBeUndefined();
  });

  it('verifies the address, because a reset proves control of the mailbox', async () => {
    await signup('u@example.com');
    const token = await requestReset('u@example.com');
    await routes.reset(post('/api/auth/reset-password', { token, password: 'a-brand-new-passphrase' }));

    const user = await prisma.user.findUnique({ where: { email: 'u@example.com' } });
    expect(user?.emailVerifiedAt).toBeInstanceOf(Date);
  });

  it('refuses a second use of the same link', async () => {
    await signup('u@example.com');
    const token = await requestReset('u@example.com');
    await routes.reset(post('/api/auth/reset-password', { token, password: 'a-brand-new-passphrase' }));

    const replay = await routes.reset(post('/api/auth/reset-password', { token, password: 'yet-another-passphrase' }));
    expect(replay.status).toBe(410);
    expect((await replay.json()).status).toBe('used');

    const still = await routes.login(
      post('/api/auth/login', { email: 'u@example.com', password: 'a-brand-new-passphrase' }),
    );
    expect(still.status).toBe(200);
  });

  it('invalidates a previously requested link when a new one is requested', async () => {
    await signup('u@example.com');
    const first = await requestReset('u@example.com');
    const second = await requestReset('u@example.com');

    const stale = await routes.reset(post('/api/auth/reset-password', { token: first, password: 'a-good-passphrase' }));
    expect((await stale.json()).status).toBe('used');

    const current = await routes.reset(
      post('/api/auth/reset-password', { token: second, password: 'a-good-passphrase' }),
    );
    expect((await current.json()).status).toBe('reset');
  });

  it('refuses an expired link', async () => {
    await signup('u@example.com');
    const token = await requestReset('u@example.com');
    await prisma.authToken.updateMany({ where: { purpose: 'password-reset' }, data: { expiresAt: new Date(Date.now() - 1) } });

    const res = await routes.reset(post('/api/auth/reset-password', { token, password: 'a-good-passphrase' }));
    expect(res.status).toBe(410);
    expect((await res.json()).status).toBe('expired');
  });

  it('enforces the existing password policy before spending the link', async () => {
    await signup('u@example.com');
    const token = await requestReset('u@example.com');

    const weak = await routes.reset(post('/api/auth/reset-password', { token, password: 'short' }));
    expect(weak.status).toBe(400);
    expect((await weak.json()).status).toBe('weak');

    // The link survived, so a rejected password does not cost a round trip
    // through the inbox.
    const retry = await routes.reset(post('/api/auth/reset-password', { token, password: 'a-good-passphrase' }));
    expect((await retry.json()).status).toBe('reset');
  });

  it('will not reset one account with another account’s link', async () => {
    await signup('a@example.com');
    jar.clear();
    await signup('b@example.com');
    const tokenA = await requestReset('a@example.com');

    await routes.reset(post('/api/auth/reset-password', { token: tokenA, password: 'a-good-passphrase' }));

    const asB = await routes.login(post('/api/auth/login', { email: 'b@example.com', password: 'a-good-passphrase' }));
    expect(asB.status).toBe(401);
    const asA = await routes.login(post('/api/auth/login', { email: 'a@example.com', password: 'a-good-passphrase' }));
    expect(asA.status).toBe(200);
  });

  it('will not accept a verification token as a reset token', async () => {
    await signup('u@example.com');
    const verification = linkTokenFor('u@example.com');

    const res = await routes.reset(
      post('/api/auth/reset-password', { token: verification, password: 'a-good-passphrase' }),
    );
    expect(res.status).toBe(400);
    expect((await res.json()).status).toBe('invalid');

    const old = await routes.login(post('/api/auth/login', { email: 'u@example.com', password: PASSWORD }));
    expect(old.status).toBe(200);
  });

  it('rejects a cross-origin post', async () => {
    await signup('u@example.com');
    const token = await requestReset('u@example.com');
    const res = await routes.reset(
      post('/api/auth/reset-password', { token, password: 'a-good-passphrase' }, { origin: 'https://evil.example' }),
    );
    expect(res.status).toBe(403);
  });
});

describe('what reaches the logs and the wire', () => {
  it('never writes a password or a token to the console', async () => {
    const lines: string[] = [];
    const spies = (['log', 'info', 'warn', 'error', 'debug'] as const).map((level) =>
      vi.spyOn(console, level).mockImplementation((...args: unknown[]) => {
        lines.push(args.map(String).join(' '));
      }),
    );

    try {
      await signup('u@example.com');
      const verification = linkTokenFor('u@example.com');
      await routes.forgot(post('/api/auth/forgot-password', { email: 'u@example.com' }));
      const reset = linkTokenFor('u@example.com');
      await routes.reset(post('/api/auth/reset-password', { token: reset, password: 'a-good-passphrase' }));

      const all = lines.join('\n');
      expect(all).not.toContain(PASSWORD);
      expect(all).not.toContain('a-good-passphrase');
      expect(all).not.toContain(verification);
      expect(all).not.toContain(reset);
    } finally {
      spies.forEach((s) => s.mockRestore());
    }
  });
});
