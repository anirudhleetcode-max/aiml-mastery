import type { Page } from '@playwright/test';

export const DEMO = { email: 'demo@aimlmastery.app', password: 'demolearner2026' };

/** Signs in as the seeded demo learner, who already has progress. */
export async function signInAsDemo(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(DEMO.email);
  await page.getByLabel('Password', { exact: true }).fill(DEMO.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 30_000 });
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
  await page.waitForURL(/\/onboarding/, { timeout: 30_000 });
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
  await page.waitForURL(/\/today/, { timeout: 30_000 });
}
