import { createHash, randomBytes } from 'node:crypto';
import type { Page } from '@playwright/test';

export const DEMO = { email: 'demo@aimlmastery.app', password: 'demolearner2026' };

/**
 * Ensures the page is in an authenticated demo session.
 *
 * Projects load a session saved once by `auth.setup.ts`, so this is normally a
 * no-op that just confirms the cookie survived. It falls back to a real sign-in
 * for any spec that opted out of the stored state — but note the login endpoint
 * is rate limited to ten attempts per ten minutes, so that path must stay rare.
 */
export async function signInAsDemo(page: Page) {
  await page.goto('/dashboard');
  if (!/\/login/.test(page.url())) return;

  await page.getByLabel('Email').fill(DEMO.email);
  await page.getByLabel('Password', { exact: true }).fill(DEMO.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 120_000 });
}

/** Creates a brand-new account and returns its credentials. */
export async function signUpFresh(page: Page) {
  const email = `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
  const password = 'a-long-enough-test-passphrase';
  await page.goto('/signup');
  await page.getByLabel('Your name').fill('E2E Learner');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Start my journey' }).click();
  await page.waitForURL(/\/onboarding/, { timeout: 120_000 });
  return { email, password };
}

/** Walks the five onboarding steps with sensible answers. */
export async function completeOnboarding(page: Page) {
  await page.getByLabel('Name').fill('E2E Learner');
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /1 hour a day/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /Some Python/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /AI\/ML internship/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /Start day one/ }).click();
  await page.waitForURL(/\/today/, { timeout: 120_000 });
}

/**
 * Issues a verification or reset token directly, the way the server does.
 *
 * The suite runs against the production build, where the file email transport
 * is refused by design — it writes live tokens to disk, and that guard is not
 * something to relax for a test. So these specs mint a token instead of
 * reading one out of an inbox.
 *
 * What that gives up is narrow and covered elsewhere: that the token embedded
 * in the email body is one the server will accept is asserted in
 * tests/unit/auth-flows.test.ts, which sends through the real transport seam,
 * pulls the token out of the actual message, and spends it against a real
 * database. What remains here — the verification page, the reset form, session
 * revocation, single use — is exactly what a browser is needed for.
 *
 * The hashing is duplicated from src/lib/auth/tokens.ts rather than imported,
 * because Playwright resolves this file outside the app's module aliases. If
 * the two ever diverge, every spec below fails loudly on the next run rather
 * than silently testing nothing.
 */
export async function mintToken(
  email: string,
  purpose: 'email-verification' | 'password-reset',
): Promise<string> {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email }, select: { id: true } });
    const token = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const ttlMs = purpose === 'password-reset' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

    // Same invalidate-then-issue the server performs, so a minted token
    // behaves exactly like one that arrived by email.
    await prisma.authToken.updateMany({
      where: { userId: user.id, purpose, usedAt: null },
      data: { usedAt: new Date() },
    });
    await prisma.authToken.create({
      data: { userId: user.id, purpose, tokenHash, expiresAt: new Date(Date.now() + ttlMs) },
    });
    return token;
  } finally {
    await prisma.$disconnect();
  }
}

/** How many unspent links of a kind the account currently holds. */
export async function liveTokenCount(
  email: string,
  purpose: 'email-verification' | 'password-reset',
): Promise<number> {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (!user) return 0;
    return prisma.authToken.count({
      where: { userId: user.id, purpose, usedAt: null, expiresAt: { gt: new Date() } },
    });
  } finally {
    await prisma.$disconnect();
  }
}
