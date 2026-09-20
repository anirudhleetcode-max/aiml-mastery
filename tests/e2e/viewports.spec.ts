import { expect, test } from '@playwright/test';

/**
 * Every route, at every width the product claims to support.
 *
 * The check is deliberately narrow: no horizontal page scroll, and the main
 * heading visible. Those two catch the overwhelming majority of responsive
 * breakage — a grid item that will not shrink below its content, a fixed
 * width, a table that escapes its container — and neither produces false
 * failures the way a screenshot comparison does.
 *
 * 390 is in the list because it is the iPhone 12–15 width, which is the single
 * most common phone viewport in the world and sits awkwardly between the 375
 * and 412 that design systems usually test.
 */

const WIDTHS = [320, 375, 390, 412, 768, 1024, 1440];

const ROUTES = [
  { path: '/', heading: /./, auth: false },
  { path: '/login', heading: /Welcome back/, auth: false },
  { path: '/signup', heading: /Create your account/, auth: false },
  { path: '/forgot-password', heading: /password/i, auth: false },
  { path: '/verify-email', heading: /./, auth: false },
  { path: '/dashboard', heading: /./, auth: true },
  { path: '/interview', heading: /./, auth: true },
  { path: '/flashcards', heading: /./, auth: true },
  { path: '/labs', heading: /./, auth: true },
  { path: '/analytics', heading: /./, auth: true },
];

async function overflows(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    // One pixel of slack: sub-pixel layout rounding is not a bug.
    return doc.scrollWidth > doc.clientWidth + 1;
  });
}

for (const width of WIDTHS) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of ROUTES) {
      test(`${route.path} fits and renders`, async ({ page }) => {
        await page.goto(route.path);
        await expect(page.getByRole('heading').first()).toBeVisible();
        expect(await overflows(page), `${route.path} scrolls horizontally at ${width}px`).toBe(false);
      });
    }
  });
}
