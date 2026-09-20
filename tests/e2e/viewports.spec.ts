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
  { path: '/', auth: false },
  { path: '/login', auth: false },
  { path: '/signup', auth: false },
  { path: '/forgot-password', auth: false },
  { path: '/verify-email', auth: false },
  { path: '/dashboard', auth: true },
  { path: '/interview', auth: true },
  { path: '/flashcards', auth: true },
  { path: '/labs', auth: true },
  { path: '/analytics', auth: true },
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

    for (const route of ROUTES.filter((r) => r.auth)) {
      test(`${route.path} fits and renders`, async ({ page }) => {
        await page.goto(route.path);
        await expect(page.getByRole('heading').first()).toBeVisible();
        expect(await overflows(page), `${route.path} scrolls horizontally at ${width}px`).toBe(false);
      });
    }

    // The signed-out pages need a signed-out browser. `/login` and `/signup`
    // redirect anyone who is not, so testing them in the shared demo session
    // silently measured the dashboard instead — twice over, since the
    // dashboard already has its own row above.
    test.describe('signed out', () => {
      test.use({ storageState: { cookies: [], origins: [] } });

      for (const route of ROUTES.filter((r) => !r.auth)) {
        test(`${route.path} fits and renders`, async ({ page }) => {
          await page.goto(route.path);
          await expect(page.getByRole('heading').first()).toBeVisible();
          expect(await overflows(page), `${route.path} scrolls horizontally at ${width}px`).toBe(false);
        });
      }
    });
  });
}
