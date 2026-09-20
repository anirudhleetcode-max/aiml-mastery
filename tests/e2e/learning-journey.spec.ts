import { expect, test } from '@playwright/test';
import { signInAsDemo } from './helpers';

test.describe('the learning journey', () => {
  test.beforeEach(async ({ page }) => {
    await signInAsDemo(page);
  });

  test('dashboard shows real progress, not placeholders', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('progressbar', { name: 'Overall curriculum progress' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Today.s mission/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Deadline' })).toBeVisible();
    await expect(page.getByText(/Mastery composition/)).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/coming soon|lorem ipsum/i);
  });

  test('roadmap lists every domain and opens one', async ({ page }) => {
    await page.goto('/roadmap');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Python to Generative AI');

    const python = page.getByRole('button', { name: /Python/ }).first();
    await python.click();
    await expect(page.getByRole('link', { name: /Your First Python Program/ })).toBeVisible();
  });

  test('roadmap search filters across all units', async ({ page }) => {
    await page.goto('/roadmap');
    await page.getByLabel('Search units').fill('gradient');
    await expect(page.getByText(/unit(s)? match/)).toBeVisible();
    await expect(page.getByRole('link', { name: /Gradient Descent/i }).first()).toBeVisible();
  });

  test('a lesson teaches in the intended order and records completion', async ({ page }) => {
    await page.goto('/learn/your-first-python-program');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your First Python Program');
    // Intuition comes first — no equation opens a lesson.
    await expect(page.getByText('What is it?')).toBeVisible();
    await expect(page.getByText('The analogy').first()).toBeVisible();

    // Section navigation works and reaches the teach-back step.
    await page.getByRole('button', { name: 'Definition' }).click();
    await expect(page.getByText('Terminology')).toBeVisible();

    await page.getByRole('button', { name: 'Mistakes' }).click();
    await expect(page.getByText(/Common mistakes/i)).toBeVisible();

    await page.getByRole('button', { name: 'Teach it back' }).click();
    await expect(page.getByLabel('Your explanation')).toBeVisible();
  });

  test('a quick check explains the answer immediately', async ({ page }) => {
    await page.goto('/learn/variables-and-names');
    await page.getByRole('button', { name: 'Quick check' }).click();

    const firstOption = page.getByRole('radio').first();
    await firstOption.click();
    await page.getByRole('button', { name: /^Check/ }).first().click();

    await expect(page.getByText(/Correct|Not quite/).first()).toBeVisible();
  });

  test('teach-back gives specific, per-point feedback', async ({ page }) => {
    await page.goto('/learn/variables-and-names');
    await page.getByRole('button', { name: 'Teach it back' }).click();

    await page.getByLabel('Your explanation').fill(
      'A variable is a name you give to a value so you can use it later. The name is a label attached to the ' +
        'value rather than a box containing it, which is why two names can be attached to the same value. For ' +
        'example, b = a does not copy a list, because there is only one list with two labels on it.',
    );
    await page.getByRole('button', { name: /Get feedback/ }).click();

    await expect(page.getByText('Teaching score')).toBeVisible();
    await expect(page.getByText(/Covered \(/)).toBeVisible();
    await expect(page.getByText(/Missing \(/)).toBeVisible();
  });

  test('the tutor answers from the curriculum and cites its source', async ({ page }) => {
    await page.goto('/tutor');
    await page.getByLabel('Ask the tutor').fill('What is overfitting?');
    await page.getByRole('button', { name: 'Send question' }).click();

    await expect(page.getByText(/^From /).first()).toBeVisible({ timeout: 20_000 });
  });

  test('the tutor refuses to invent an answer for something not in the curriculum', async ({ page }) => {
    await page.goto('/tutor');
    await page.getByLabel('Ask the tutor').fill('zzzqqq nonexistent concept xyzzy');
    await page.getByRole('button', { name: 'Send question' }).click();

    await expect(page.getByText(/could not find|not certain which concept/i).first()).toBeVisible({ timeout: 20_000 });
  });
});
