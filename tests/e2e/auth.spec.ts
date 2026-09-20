import { expect, test } from '@playwright/test';
import { completeOnboarding, signUpFresh } from './helpers';

// These exercise the sign-in and sign-up UI itself, so they must start
// from a signed-out browser rather than the shared demo session.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('authentication and onboarding', () => {
  test('rejects a weak password with a useful message', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel('Your name').fill('Short Password');
    await page.getByLabel('Email').fill(`short-${Date.now()}@example.com`);
    await page.getByLabel('Password', { exact: true }).fill('short');
    await page.getByRole('button', { name: 'Start my journey' }).click();
    await expect(page.locator('form').getByRole('alert')).toContainText(/10 characters/i);
  });

  test('rejects a wrong password without revealing whether the account exists', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('definitely-not-a-user@example.com');
    await page.getByLabel('Password', { exact: true }).fill('some-wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('form').getByRole('alert')).toContainText('Email or password is incorrect.');
  });

  test('a new learner signs up, onboards and lands on a real plan', async ({ page }) => {
    await signUpFresh(page);
    await expect(page.getByRole('heading', { name: 'What should we call you?' })).toBeVisible();

    await completeOnboarding(page);

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Good (morning|afternoon|evening)|Still up/);
    // Onboarding lands on today's mission, which situates the learner in the
    // real course window and lists actual units rather than a placeholder.
    await expect(page.getByText(/Day 1 of \d+/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Today.s mission/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Your First Python Program/ }).first()).toBeVisible();
  });

  test('protects the app from signed-out visitors', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('signing out ends the session', async ({ page }) => {
    await signUpFresh(page);
    await completeOnboarding(page);
    await page.getByRole('button', { name: 'Sign out' }).click();
    await page.waitForURL('/', { timeout: 20_000 });
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});
