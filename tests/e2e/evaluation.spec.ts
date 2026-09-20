import { expect, test } from '@playwright/test';

/**
 * The two evaluation surfaces, in a browser, signed in as the demo learner.
 *
 * These deliberately do not assert a particular score. The point is that the
 * feature is optional, that it returns something usable with no model
 * configured, and — the one that matters — that it does not take over the
 * decisions the learner is supposed to be making.
 */

/** A session starts by choosing its length; there is no generic "start". */
async function startInterviewSession(page: import('@playwright/test').Page) {
  await page.goto('/interview');
  await page.getByRole('button', { name: '10 questions' }).click();
  // Anchored: the readiness copy says "You have graded 1 of 660", which an
  // unanchored /1 of \d+/ also matches once any question has been graded.
  await expect(page.getByText(/^1 of \d+$/)).toBeVisible();
}

test.describe('evaluating an interview answer', () => {
  test('is optional, and the question can still be answered without it', async ({ page }) => {
    await startInterviewSession(page);

    await expect(page.getByLabel(/write your answer out/i)).toBeVisible();

    // Skipping straight to the model answer works exactly as it did before.
    await page.getByRole('button', { name: /Show a strong answer/i }).click();
    await expect(page.getByText(/What a strong answer covers/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'I could answer this' })).toBeVisible();
  });

  test('returns concept feedback and says where the verdict came from', async ({ page }) => {
    await startInterviewSession(page);

    await page
      .getByLabel(/write your answer out/i)
      .fill(
        'Python is an interpreted, dynamically typed language. CPython compiles the source to bytecode and an interpreter loop executes it, rather than compiling ahead of time to machine code.',
      );
    await page.getByRole('button', { name: /Evaluate my answer/i }).click();

    const result = page.getByRole('status').filter({ hasText: /Concept check|AI evaluation/ });
    await expect(result).toBeVisible({ timeout: 30_000 });
    await expect(result).toContainText(/Correctness/);
    await expect(result).toContainText(/They would then ask/);
    // The disclaimer is not decoration — it is the feature's contract.
    await expect(result).toContainText(/Your own verdict below is what gets recorded/i);
  });

  test('does not record anything by itself', async ({ page }) => {
    await startInterviewSession(page);

    await page.getByLabel(/write your answer out/i).fill('An answer long enough to be worth evaluating properly.');
    await page.getByRole('button', { name: /Evaluate my answer/i }).click();
    await expect(page.getByRole('status').filter({ hasText: /Concept check|AI evaluation/ })).toBeVisible({
      timeout: 30_000,
    });

    // Still on the same question: evaluating did not advance the session, did
    // not reveal the answer, and did not grade anything.
    await expect(page.getByText(/^1 of \d+$/)).toBeVisible();
    await expect(page.getByText(/What a strong answer covers/i)).toHaveCount(0);
  });
});

test.describe('checking a flashcard recall', () => {
  test('offers a suggestion but leaves the grading buttons to the learner', async ({ page }) => {
    // The deck opens straight onto a card; there is nothing to press first.
    await page.goto('/flashcards');
    await expect(page.getByRole('button', { name: 'Review again' })).toBeVisible();

    await page.getByText(/write your recall and have it checked/i).click();
    await page
      .getByLabel(/What came back to you/i)
      .fill('A short attempt at recalling what this card is asking about.');
    await page.getByRole('button', { name: /Evaluate my answer/i }).click();

    await expect(page.getByText(/Reads like/i)).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(/your button is what sets the next review date/i)).toBeVisible();

    // Neither grading button has been pressed, so the card has not been graded
    // and both stay disabled until it is flipped.
    await expect(page.getByRole('button', { name: 'I knew it' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Review again' })).toBeDisabled();
  });
});
