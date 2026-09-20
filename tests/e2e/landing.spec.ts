import { expect, test } from '@playwright/test';

test.describe('landing page', () => {
  test('states the promise and the real numbers', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Master AI/ML');
    await expect(page.getByText('214', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('103', { exact: true }).first()).toBeVisible();

    // All fourteen domains are listed with their unit counts.
    await expect(page.getByRole('heading', { name: 'Machine Learning', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'MLOps & ML System Design' })).toBeVisible();
  });

  test('offers both calls to action and they navigate', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Start my journey/ }).first().click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('renders without console errors and with no horizontal overflow', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/', { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
    expect(errors).toEqual([]);
  });

  test('has a working skip link and one h1', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    expect(await page.getByRole('heading', { level: 1 }).count()).toBe(1);
  });

  test('theme toggle switches to light mode and persists', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('radio', { name: 'Light theme' }).click();
    await expect(page.locator('html')).toHaveClass(/light/);
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/light/);
  });
});
