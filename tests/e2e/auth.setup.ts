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
setup('authenticate as the demo learner', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(DEMO.email);
  await page.getByLabel('Password', { exact: true }).fill(DEMO.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 30_000 });
  await expect(page).toHaveURL(/\/(dashboard|onboarding)/);

  fs.mkdirSync(path.dirname(DEMO_STATE), { recursive: true });
  await page.context().storageState({ path: DEMO_STATE });
});
