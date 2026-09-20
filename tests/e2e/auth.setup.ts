import { test as setup, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { DEMO } from './helpers';

export const DEMO_STATE = path.join('playwright', '.auth', 'demo.json');

/**
 * Signs in once for the whole run and saves the session.
 *
 * The login endpoint is rate limited to ten attempts per ten minutes per
 * client — a production control we are not going to weaken for tests. A suite
 * that signs in per test exhausts that budget and every later test fails with
 * "Too many attempts", which looks like a broken app and is not. Authenticating
 * once here also removes about a second from every test that needs a session.
 */
/**
 * Clears rate-limit counters before the run.
 *
 * The limiter is shared state in the database, so counters survive a server
 * restart — which is the whole point of moving it there. But the suite signs
 * up two fresh accounts per run against a 5-per-15-minutes budget, so two
 * runs in quick succession would exhaust it and every later test would fail
 * on what looks like a broken signup page. Resetting counters is setup in the
 * same sense that seeding the database is; it changes nothing about how the
 * limiter behaves in production.
 */
setup('clear rate-limit counters', async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    await prisma.rateLimit.deleteMany({});
  } finally {
    await prisma.$disconnect();
  }
});

setup('authenticate as the demo learner', async ({ page }) => {
  // Visiting the protected tree first makes the dev server compile the whole
  // authenticated layout — sidebar, charts, 3D — while we are still signed
  // out and it costs nothing. Without it that compile lands inside the
  // post-login navigation, where a cold start can outrun any sensible
  // timeout and report a working login as a broken one.
  await page.goto('/dashboard');
  await page.waitForURL(/\/login/, { timeout: 120_000 });

  await page.getByLabel('Email').fill(DEMO.email);
  await page.getByLabel('Password', { exact: true }).fill(DEMO.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 120_000 });
  await expect(page).toHaveURL(/\/(dashboard|onboarding)/);

  fs.mkdirSync(path.dirname(DEMO_STATE), { recursive: true });
  await page.context().storageState({ path: DEMO_STATE });
});
