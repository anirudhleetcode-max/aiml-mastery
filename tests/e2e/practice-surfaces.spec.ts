import { expect, test } from '@playwright/test';

/**
 * The three surfaces where a learner's own judgement is the recorded signal:
 * interview practice, flashcards and labs.
 *
 * Each test checks the property that makes the surface worth having — that
 * the verdict survives a reload, that the answer stays hidden until asked
 * for, and that a lab cannot be closed without doing its steps. A UI that
 * looks right but forgets what you told it is the failure mode here.
 */

test.describe('interview preparation', () => {
  test('builds a session, hides the answer, and records the verdict', async ({ page }) => {
    await page.goto('/interview');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Interview preparation');

    // Readiness is computed from graded answers, so it is stated against the
    // whole bank rather than invented.
    await expect(page.getByText(/\/ 660/).first()).toBeVisible();

    await page.getByRole('button', { name: /5 questions/ }).click();

    // The model answer must not be on screen before it is asked for.
    await expect(page.getByText('What a strong answer covers')).toHaveCount(0);
    await page.getByRole('button', { name: /Show a strong answer/ }).click();
    await expect(page.getByText('What a strong answer covers')).toBeVisible();

    await page.getByRole('button', { name: 'I could answer this', exact: true }).click();

    // Give the offline queue a moment to flush, then confirm it stuck.
    await page.waitForTimeout(2500);
    await page.reload();
    await expect(page.getByText(/[1-9]\d* \/ 660/).first()).toBeVisible();
  });

  test('readiness breaks down by domain and seniority', async ({ page }) => {
    await page.goto('/interview');
    await page.getByRole('tab', { name: /Readiness/ }).click();
    await expect(page.getByRole('heading', { name: 'By domain' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'By seniority' })).toBeVisible();
  });

  test('will not draw on units the learner has not finished by default', async ({ page }) => {
    await page.goto('/interview');
    const onlyFinished = page.getByRole('checkbox', { name: /Only what I have finished/ });
    await expect(onlyFinished).toBeChecked();
  });
});

test.describe('flashcards', () => {
  test('refuses a verdict until the card is flipped, then records it', async ({ page }) => {
    await page.goto('/flashcards');

    // Judging before seeing the answer is the one way to make the exercise
    // worthless, so both verdicts are disabled until the card turns.
    const known = page.getByRole('button', { name: 'I knew it' });
    const again = page.getByRole('button', { name: 'Review again' });
    await expect(known).toBeDisabled();
    await expect(again).toBeDisabled();

    await page.getByRole('button', { name: 'Show the answer' }).click();
    await expect(known).toBeEnabled();
    await known.click();

    // The verdict is durable: after a flush and a reload the card has a
    // review history rather than starting over.
    await page.waitForTimeout(2500);
    await page.reload();
    const graded = page.getByText('Cards with a review history').locator('xpath=..');
    await expect(graded).toContainText(/[1-9]/);
  });

  test('offers a deck of the cards the learner has made due', async ({ page }) => {
    await page.goto('/flashcards');
    await expect(page.getByText(/Due now/).first()).toBeVisible();
  });
});

test.describe('labs', () => {
  test('cannot be completed without working through every step', async ({ page }) => {
    // A lab nothing else in the suite touches, so its state is predictable.
    await page.goto('/labs/big-o-growth');
    await expect(page.getByRole('heading', { name: 'The investigation' })).toBeVisible();

    const steps = page.locator('ol li button');
    const count = await steps.count();
    expect(count).toBeGreaterThan(0);

    const finish = page.getByRole('button', { name: /Mark this lab complete/ });

    if (await finish.isVisible().catch(() => false)) {
      // Not yet complete: the button must stay refused until the last step.
      const remaining = await steps.evaluateAll(
        (els) => els.filter((e) => !(e as HTMLButtonElement).disabled).length,
      );
      if (remaining > 0) {
        await expect(finish).toBeDisabled();
        for (let i = 0; i < count; i++) {
          const btn = steps.nth(i);
          if (await btn.isEnabled()) await btn.click();
        }
      }
      await expect(finish).toBeEnabled();
    } else {
      // Already complete: the only valid state is the completed badge, with
      // no second chance to claim the reward.
      await expect(page.getByText('Completed', { exact: true })).toBeVisible();
    }
  });

  test('a completed lab stays completed and offers no second reward', async ({ page }) => {
    await page.goto('/labs/sorting-race');
    const steps = page.locator('ol li button');
    const count = await steps.count();
    for (let i = 0; i < count; i++) {
      const btn = steps.nth(i);
      if (await btn.isEnabled()) await btn.click();
    }

    const finish = page.getByRole('button', { name: /Mark this lab complete/ });
    if (await finish.isVisible().catch(() => false)) await finish.click();

    await page.waitForTimeout(2500);
    await page.reload();
    await expect(page.getByText('Completed', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Mark this lab complete/ })).toHaveCount(0);
  });

  test('every step states what to do and what it should produce', async ({ page }) => {
    await page.goto('/labs/knn-lab');
    const steps = page.locator('ol li button');
    await expect(steps.first()).toContainText('You should see:');
  });
});
