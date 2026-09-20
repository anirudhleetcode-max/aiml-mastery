import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

/** Written by the `setup` project; every other project starts signed in. */
const DEMO_STATE = path.join('playwright', '.auth', 'demo.json');

const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  // `next dev` compiles a route on first visit, and this app's authenticated
  // tree is large. A generous ceiling costs nothing on a warm run and is the
  // difference between a cold-start report of "broken" and the truth.
  timeout: 150_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium' },
  },
  projects: [
    // Signs in once and saves the session. The login endpoint is rate limited
    // to ten attempts per ten minutes, so a suite that signs in per test
    // exhausts that budget and reports a wall of false failures.
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'desktop',
      dependencies: ['setup'],
      // responsive.spec.ts is explicitly a phone spec; at 1440px there is no
      // navigation drawer to open because the sidebar is always present.
      testIgnore: /auth\.setup\.ts|responsive\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, storageState: DEMO_STATE },
    },
    {
      name: 'mobile',
      dependencies: ['setup'],
      testMatch: /responsive\.spec\.ts/,
      use: { ...devices['Pixel 7'], storageState: DEMO_STATE },
    },
  ],
  // Runs against the production build, not `next dev`.
  //
  // `next dev` compiles each route on its first visit. With 57 tests that was
  // merely slow; at 127 it is fatal — a CI runner spent over two minutes
  // compiling the authenticated tree for the very first sign-in and the whole
  // suite never ran. The production server has no compile step, so the suite
  // is both faster and a more faithful target: it is what actually ships.
  //
  // `E2E_DEV=1` restores the dev server for iterating on a single spec.
  webServer: {
    command: process.env.E2E_DEV
      ? `npx next dev --port ${PORT}`
      : `npx next start --port ${PORT}`,
    env: { APP_URL: BASE_URL },
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
