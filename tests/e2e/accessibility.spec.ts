import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { signInAsDemo } from './helpers';

/**
 * Automated accessibility checks.
 *
 * These catch the mechanical failures — contrast, missing names, bad roles,
 * heading order. They are a floor, not a ceiling: keyboard flows and the
 * non-visual alternatives (chart tables, the graph's list view) are covered
 * by the other specs.
 */
async function scan(page: Page, context?: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    // Canvas-based teaching widgets carry role="img" and an aria-label plus a
    // text alternative beside them; axe cannot see inside a canvas.
    .exclude('canvas')
    .analyze();

  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  if (serious.length > 0) {
    console.log(
      `\n${context ?? page.url()} violations:\n` +
        serious
          .map((v) => `  [${v.impact}] ${v.id}: ${v.help}\n    ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join('\n    ')}`)
          .join('\n'),
    );
  }
  return serious;
}

test.describe('accessibility', () => {
  test('landing page has no serious violations', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(await scan(page, 'landing')).toEqual([]);
  });

  test('landing page passes in light mode too', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('radio', { name: 'Light theme' }).click();
    await page.waitForTimeout(400);
    expect(await scan(page, 'landing (light)')).toEqual([]);
  });

  test('sign-in form is properly labelled', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'networkidle' });
    expect(await scan(page, 'login')).toEqual([]);
  });

  test('the core app pages have no serious violations', async ({ page }) => {
    await signInAsDemo(page);

    for (const path of ['/dashboard', '/today', '/roadmap', '/tests', '/analytics', '/labs', '/interview', '/flashcards']) {
      await page.goto(path, { waitUntil: 'networkidle' });
      expect(await scan(page, path), `serious violations on ${path}`).toEqual([]);
    }
  });

  test('a lesson page has no serious violations', async ({ page }) => {
    await signInAsDemo(page);
    await page.goto('/learn/your-first-python-program', { waitUntil: 'networkidle' });
    expect(await scan(page, 'lesson')).toEqual([]);
  });

  test('reduced motion is honoured when the OS asks for it', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    // The hero falls back to a static treatment rather than a WebGL canvas.
    await expect(page.locator('canvas')).toHaveCount(0);
    await context.close();
  });

  test('every interactive control is reachable by keyboard on the dashboard', async ({ page }) => {
    await signInAsDemo(page);
    await page.goto('/dashboard');

    const reachable = await page.evaluate(() => {
      const selector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const all = [...document.querySelectorAll<HTMLElement>(selector)];
      const visible = all.filter((el) => el.offsetParent !== null || el.tagName === 'A');
      const unreachable = visible.filter((el) => el.tabIndex < 0);
      return { total: visible.length, unreachable: unreachable.length };
    });

    expect(reachable.total).toBeGreaterThan(10);
    expect(reachable.unreachable).toBe(0);
  });
});
