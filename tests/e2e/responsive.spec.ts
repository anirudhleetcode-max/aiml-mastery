import { expect, test } from '@playwright/test';
import { signInAsDemo } from './helpers';

/** Runs on a phone viewport. Desktop is the richest experience; mobile must stay fully usable. */
test.describe('mobile', () => {
  test('the landing page fits without horizontal scrolling', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('the app shell opens its navigation drawer', async ({ page }) => {
    await signInAsDemo(page);
    await page.goto('/dashboard');

    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(page.getByRole('link', { name: 'Roadmap', exact: true })).toBeVisible();
  });

  test('a lesson is readable and navigable on a phone', async ({ page }) => {
    await signInAsDemo(page);
    await page.goto('/learn/your-first-python-program');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
});
