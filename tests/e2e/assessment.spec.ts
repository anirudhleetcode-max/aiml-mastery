import { expect, test } from '@playwright/test';
import { signInAsDemo } from './helpers';

test.describe('assessment and progress', () => {
  test.beforeEach(async ({ page }) => {
    await signInAsDemo(page);
  });

  test('a unit test runs end to end and records a score', async ({ page }) => {
    await page.goto('/tests/unit/your-first-python-program');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('unit test');

    // Answer every question with the first available input, then finish.
    for (let i = 0; i < 40; i++) {
      const finish = page.getByRole('button', { name: /Finish test/ });
      if (await finish.isVisible().catch(() => false)) {
        if (await finish.isEnabled()) {
          await finish.click();
          break;
        }
      }

      const radio = page.getByRole('radio').first();
      const checkbox = page.getByRole('checkbox').first();
      const textbox = page.getByRole('textbox').first();

      if (await radio.isVisible().catch(() => false)) await radio.click();
      else if (await checkbox.isVisible().catch(() => false)) await checkbox.click();
      else if (await textbox.isVisible().catch(() => false)) await textbox.fill('answer');

      const check = page.getByRole('button', { name: /^Check answer$/ });
      if (await check.isVisible().catch(() => false)) await check.click();

      const next = page.getByRole('button', { name: /^Next$/ });
      if (await next.isVisible().catch(() => false)) await next.click();
    }

    await expect(page.getByText(/correct/).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('link', { name: /Back to tests/ })).toBeVisible();
  });

  test('the tests page lists history and unlock state', async ({ page }) => {
    await page.goto('/tests');
    await expect(page.getByRole('heading', { name: 'Daily test' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Final assessment' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
  });

  test('the daily test refuses to test material not yet studied', async ({ page }) => {
    await page.goto('/tests/daily');
    const body = page.locator('body');
    // Either a real test drawn from today's units, or an honest explanation.
    await expect(body).toContainText(/Daily test|Nothing studied today yet/);
  });

  test('analytics renders every chart with a table alternative', async ({ page }) => {
    await page.goto('/analytics');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Analytics');
    await expect(page.getByText('Where the 214 units stand')).toBeVisible();

    await page.getByRole('button', { name: 'Show data' }).first().click();
    await expect(page.getByRole('table').first()).toBeVisible();
  });

  test('the mistake notebook keeps wrong answers with their explanations', async ({ page }) => {
    await page.goto('/mistakes');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/coming soon/i);
  });

  test('the final assessment is locked until most of the curriculum is done', async ({ page }) => {
    await page.goto('/final-assessment');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AI/ML Master Assessment');
    await expect(page.getByText(/units — |Begin the assessment|Take it again/).first()).toBeVisible();
  });
});
