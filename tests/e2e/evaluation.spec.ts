import { expect, test } from '@playwright/test';

/**
 * The two evaluation surfaces, in a browser, signed in as the demo learner.
 *
 * These deliberately do not assert a particular score. The point is that the
 * feature is optional, that it returns something usable with no model
 * configured, and — the one that matters — that it does not take over the
 * decisions the learner is supposed to be making.
 */

test.describe('evaluating an interview answer', () => {
  test('is optional, and the question can still be answered without it', async ({ page }) => {
    await page.goto('/interview');
    await page.getByRole('button', { name: /Start a .*session|Start session|Start/i }).first().click();

    const box = page.getByLabel(/write your answer out/i);
    await expect(box).toBeVisible();

    // Skipping straight to the model answer works exactly as it did before.
    await page.getByRole('button', { name: /Show a strong answer/i }).click();
    await expect(page.getByText(/What a strong answer covers/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /I knew that|Shaky|Lost/i }).first()).toBeVisible();
  });

  test('returns concept feedback and says where the verdict came from', async ({ page }) => {
    await page.goto('/interview');
    await page.getByRole('button', { name: /Start a .*session|Start session|Start/i }).first().click();

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
    await page.goto('/interview');
    await page.getByRole('button', { name: /Start a .*session|Start session|Start/i }).first().click();

    const position = await page.getByText(/\d+ of \d+/).first().textContent();

    await page.getByLabel(/write your answer out/i).fill('An answer good enough to be worth evaluating properly.');
    await page.getByRole('button', { name: /Evaluate my answer/i }).click();
    await expect(page.getByRole('status').filter({ hasText: /Concept check|AI evaluation/ })).toBeVisible({
      timeout: 30_000,
    });

    // Still on the same question: evaluating did not advance the session, did
    // not reveal the answer, and did not grade anything.
    await expect(page.getByText(/\d+ of \d+/).first()).toHaveText(position!);
    await expect(page.getByText(/What a strong answer covers/i)).toHaveCount(0);
  });
});

test.describe('checking a flashcard recall', () => {
  test('offers a suggestion but leaves the grading buttons to the learner', async ({ page }) => {
    await page.goto('/flashcards');
    await page.getByRole('button', { name: /Start|Review/i }).first().click();

    const check = page.getByText(/write your recall and have it checked/i);
    await expect(check).toBeVisible();
    await check.click();

    await page.getByLabel(/What came back to you/i).fill('A short attempt at recalling what this card is asking about.');
    await page.getByRole('button', { name: /Evaluate my answer/i }).click();

    await expect(page.getByText(/Reads like/i)).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(/your button is what sets the next review date/i)).toBeVisible();

    // Neither grading button has been pressed, so the card has not moved on.
    await expect(page.getByRole('button', { name: 'I knew it' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Review again' })).toBeDisabled();
  });
});
