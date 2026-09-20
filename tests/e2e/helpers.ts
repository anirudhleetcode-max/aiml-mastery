import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Page } from '@playwright/test';

export const DEMO = { email: 'demo@aimlmastery.app', password: 'demolearner2026' };

/**
 * Ensures the page is in an authenticated demo session.
 *
 * Projects load a session saved once by `auth.setup.ts`, so this is normally a
 * no-op that just confirms the cookie survived. It falls back to a real sign-in
 * for any spec that opted out of the stored state — but note the login endpoint
 * is rate limited to ten attempts per ten minutes, so that path must stay rare.
 */
export async function signInAsDemo(page: Page) {
  await page.goto('/dashboard');
  if (!/\/login/.test(page.url())) return;

  await page.getByLabel('Email').fill(DEMO.email);
  await page.getByLabel('Password', { exact: true }).fill(DEMO.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 30_000 });
}

/** Creates a brand-new account and returns its credentials. */
export async function signUpFresh(page: Page) {
  const email = `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
  const password = 'a-long-enough-test-passphrase';
  await page.goto('/signup');
  await page.getByLabel('Your name').fill('E2E Learner');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Start my journey' }).click();
  await page.waitForURL(/\/onboarding/, { timeout: 30_000 });
  return { email, password };
}

/** Walks the five onboarding steps with sensible answers. */
export async function completeOnboarding(page: Page) {
  await page.getByLabel('Name').fill('E2E Learner');
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /1 hour a day/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /Some Python/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /AI\/ML internship/ }).click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /Start day one/ }).click();
  await page.waitForURL(/\/today/, { timeout: 30_000 });
}

/**
 * Reads the message the app just sent, from the file transport's outbox.
 *
 * The alternative — asserting that a screen says a link was sent — proves only
 * that the screen says so. Reading the real message and clicking the real
 * link is the difference between testing the flow and testing the copy.
 */
export interface CapturedEmail {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export function outboxFor(email: string, subject?: RegExp): CapturedEmail | null {
  const file = path.resolve('playwright', '.auth', 'outbox.jsonl');
  if (!existsSync(file)) return null;
  const messages = readFileSync(file, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as CapturedEmail);
  return (
    [...messages].reverse().find((m) => m.to === email && (!subject || subject.test(m.subject))) ?? null
  );
}

/**
 * Polls the outbox, since the send happens after the response is returned.
 *
 * `subject` matters more than it looks: a reset asked for by an account that
 * has not verified yet has two messages waiting for it, and taking the most
 * recent one is a coin flip.
 */
export async function waitForEmail(email: string, subject?: RegExp, timeoutMs = 20_000): Promise<CapturedEmail> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const message = outboxFor(email, subject);
    if (message) return message;
    if (Date.now() > deadline) {
      throw new Error(`no ${subject ?? 'message'} reached ${email} within ${timeoutMs}ms`);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

/** Pulls the single-use token out of a verification or reset link. */
export function tokenFrom(message: { text: string; html: string }): string {
  const match = /[?&]token=([A-Za-z0-9_-]+)/.exec(message.text) ?? /[?&]token=([A-Za-z0-9_-]+)/.exec(message.html);
  if (!match) throw new Error('no token in message');
  return match[1];
}
