import { expect, test } from '@playwright/test';
import { completeOnboarding, liveTokenCount, mintToken, signUpFresh } from './helpers';

// Every test here is about a signed-out or newly-created account, so the
// shared demo session would get in the way.
test.use({ storageState: { cookies: [], origins: [] } });

/**
 * The reset form has two password fields, so a loose label match is ambiguous.
 */
async function setNewPassword(page: import('@playwright/test').Page, password: string) {
  await page.getByLabel('New password', { exact: true }).fill(password);
  await page.getByLabel('Confirm new password', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Set the new password' }).click();
}

/**
 * Clears the shared rate-limit counters before each test in this file.
 *
 * Every test here signs a brand-new account up, against a production limit of
 * five signups per fifteen minutes per client. That limit is correct and is
 * not being changed — what is being reset is a counter, in the same sense
 * that the database is seeded. Without this, the sixth test in a run fails on
 * what looks like a broken signup page and is not.
 */
test.beforeEach(async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    await prisma.rateLimit.deleteMany({});
  } finally {
    await prisma.$disconnect();
  }
});

test.describe('email verification', () => {
  test('a new account is unverified, is told so, and can confirm from the real link', async ({ page }) => {
    const { email } = await signUpFresh(page);
    await completeOnboarding(page);

    // The banner is the standing reminder, and it carries the resend action.
    const banner = page.getByRole('status').filter({ hasText: email });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole('button', { name: 'Resend verification email' })).toBeVisible();

    // Signing up issued a real link; that is what the banner is about.
    expect(await liveTokenCount(email, 'email-verification')).toBe(1);

    await page.goto(`/verify-email?token=${await mintToken(email, 'email-verification')}`);
    await expect(page.getByRole('heading', { name: /verified|confirmed/i })).toBeVisible();

    // And the reminder is gone for good.
    await page.goto('/today');
    await expect(page.getByRole('status').filter({ hasText: email })).toHaveCount(0);
  });

  test('a link that has already been spent says so rather than failing silently', async ({ page }) => {
    const { email } = await signUpFresh(page);
    await completeOnboarding(page);
    const token = await mintToken(email, 'email-verification');

    await page.goto(`/verify-email?token=${token}`);
    await expect(page.getByRole('heading', { name: /verified|confirmed/i })).toBeVisible();

    await page.goto(`/verify-email?token=${token}`);
    await expect(page.getByText(/already been used|already used/i)).toBeVisible();
  });

  test('an invented token is rejected without hinting at what a real one looks like', async ({ page }) => {
    await page.goto(`/verify-email?token=${'A'.repeat(43)}`);
    await expect(page.getByRole('heading', { name: /link|invalid/i })).toBeVisible();
  });

  test('a missing token is handled as a bad link, not a crash', async ({ page }) => {
    await page.goto('/verify-email');
    await expect(page.getByRole('heading')).toBeVisible();
  });

  test('resending replaces the previous link', async ({ page }) => {
    const { email } = await signUpFresh(page);
    await completeOnboarding(page);
    const first = await mintToken(email, 'email-verification');

    await page.getByRole('button', { name: 'Resend verification email' }).click();
    await expect(page.getByText(/Link sent/i)).toBeVisible();

    // The resend issued a replacement, and there is exactly one live link.
    await expect(async () => {
      expect(await liveTokenCount(email, 'email-verification')).toBe(1);
    }).toPass({ timeout: 15_000 });

    // The old link is dead the moment a new one exists.
    await page.goto(`/verify-email?token=${first}`);
    await expect(page.getByText(/already been used|already used|no longer/i)).toBeVisible();
  });
});

test.describe('password reset', () => {
  test('runs from the login page through the emailed link to a working new password', async ({ page }) => {
    const { email } = await signUpFresh(page);
    await completeOnboarding(page);

    // Somebody resetting a password is signed out; /login redirects anyone who
    // is not, so staying signed in here would test the dashboard instead.
    await page.context().clearCookies();
    await page.goto('/login');

    await page.getByRole('link', { name: /Forgot your password/i }).click();
    await expect(page).toHaveURL(/\/forgot-password/);

    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Send the reset link' }).click();
    await expect(page.getByText(/If an account exists/i)).toBeVisible();

    // The form issued a real reset link; spend an equivalent one.
    expect(await liveTokenCount(email, 'password-reset')).toBe(1);
    const reset = await mintToken(email, 'password-reset');

    await page.goto(`/reset-password?token=${reset}`);
    await setNewPassword(page, 'a-completely-new-passphrase');
    await expect(page.getByRole('heading', { name: 'Password changed' })).toBeVisible();

    // The reset signed every session out, so the app is closed until we sign
    // in again — with the new password.
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);

    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill('a-completely-new-passphrase');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL(/\/(dashboard|today)/, { timeout: 30_000 });
  });

  test('says the same thing for an address with no account', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByLabel('Email').fill(`nobody-${Date.now()}@example.com`);
    await page.getByRole('button', { name: 'Send the reset link' }).click();
    await expect(page.getByText(/If an account exists/i)).toBeVisible();
  });

  test('refuses a reset link that does not exist', async ({ page }) => {
    await page.goto(`/reset-password?token=${'B'.repeat(43)}`);
    await setNewPassword(page, 'a-completely-new-passphrase');
    await expect(page.getByRole('heading', { name: 'That link is not valid' })).toBeVisible();
  });

  test('still applies the password policy on the reset form', async ({ page }) => {
    const { email } = await signUpFresh(page);
    await completeOnboarding(page);
    await page.context().clearCookies();
    await page.goto('/forgot-password');
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Send the reset link' }).click();

    const token = await mintToken(email, 'password-reset');

    await page.goto(`/reset-password?token=${token}`);
    await setNewPassword(page, 'short');

    // The field carries `minLength`, so the browser refuses to submit and no
    // request is made — the page simply stays put with the field marked
    // invalid. That is the convenience layer; the server enforces the same
    // rule on a request that skips the browser entirely, which is asserted in
    // tests/unit/auth-flows.test.ts against a real database.
    await expect(page.getByRole('heading', { name: 'Choose a new password' })).toBeVisible();
    const tooShort = await page
      .getByLabel('New password', { exact: true })
      .evaluate((el) => (el as HTMLInputElement).validity.tooShort);
    expect(tooShort).toBe(true);

    // The rejected password did not spend the link, so the learner does not
    // have to go back to their inbox for a typo.
    await setNewPassword(page, 'a-completely-new-passphrase');
    await expect(page.getByRole('heading', { name: 'Password changed' })).toBeVisible();
  });
});
