/**
 * Performance audit.
 *
 * Measures the Core Web Vitals that actually matter for this app on a real
 * Chromium, plus transferred bytes per route. Not a Lighthouse replacement —
 * it is the subset that is meaningful to check on every change, run against a
 * production build.
 *
 *   npm run build && npm start &
 *   node scripts/perf-audit.mjs http://127.0.0.1:3000
 */
import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:3000';
const ROUTES = [
  { path: '/', name: 'Landing', auth: false },
  { path: '/login', name: 'Login', auth: false },
  { path: '/dashboard', name: 'Dashboard', auth: true },
  { path: '/roadmap', name: 'Roadmap', auth: true },
  { path: '/learn/your-first-python-program', name: 'Lesson', auth: true },
  { path: '/analytics', name: 'Analytics', auth: true },
  { path: '/labs', name: 'Labs', auth: true },
];

// This repository's development sandbox ships a Chromium at a fixed path and
// blocks the download Playwright would otherwise do; a CI runner installs its
// own the usual way. Use the pinned one only when it is actually there, so the
// same script runs in both places.
const PINNED = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(PINNED) ? { executablePath: PINNED } : {});

// Reuse the session the e2e setup project saved, when there is one. The login
// endpoint is rate limited to ten attempts per ten minutes, so a perf run
// after a test run would otherwise be refused and silently measure the login
// page for every authenticated route.
const SAVED = 'playwright/.auth/demo.json';
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  ...(existsSync(SAVED) ? { storageState: SAVED } : {}),
});
const page = await context.newPage();

await page.goto(`${BASE}/dashboard`);
if (/\/login/.test(page.url())) {
  await page.getByLabel('Email').fill('demo@aimlmastery.app');
  await page.getByLabel('Password', { exact: true }).fill('demolearner2026');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/dashboard|onboarding/, { timeout: 30000 }).catch(() => {});
}

// A deployed instance has no seeded demo learner, so falling back to creating
// one is what makes it possible to measure the signed-in routes anywhere other
// than a development machine — which is the only measurement that says
// anything about what a real user waits for.
if (/\/login/.test(page.url())) {
  const stamp = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  await page.goto(`${BASE}/signup`);
  await page.getByLabel('Your name').fill('Perf Audit');
  await page.getByLabel('Email').fill(`perf-${stamp}@example.com`);
  await page.getByLabel('Password', { exact: true }).fill('a-long-enough-perf-passphrase');
  await page.getByRole('button', { name: 'Start my journey' }).click();
  await page.waitForURL(/\/onboarding/, { timeout: 120000 }).catch(() => {});

  // A new account is held at onboarding by the app shell's layout, so without
  // walking it every "authenticated" route below would measure the onboarding
  // page instead — the same class of quiet mismeasurement the refusal below
  // exists to prevent.
  if (/\/onboarding/.test(page.url())) {
    await page.getByLabel('Name').fill('Perf Audit');
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /1 hour a day/ }).click();
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /Some Python/ }).click();
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /AI\/ML internship/ }).click();
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /Start day one/ }).click();
    await page.waitForURL(/\/today/, { timeout: 120000 }).catch(() => {});
  }
  await page.goto(`${BASE}/dashboard`);
}

// Measuring the login page seven times and calling it a perf report is worse
// than reporting nothing, so refuse to continue rather than swallow this.
if (/\/login|\/signup|\/onboarding/.test(page.url())) {
  console.error(
    '\n  Could not authenticate — every signed-in route would measure the login\n' +
      '  page instead. Against a local build, seed the database (npm run db:reset)\n' +
      '  and let the login rate limiter\'s window clear. Against a deployment,\n' +
      '  this means signup itself is failing, which is a fault worth chasing on\n' +
      '  its own.\n',
  );
  await browser.close();
  process.exit(1);
}

const rows = [];

// Routes marked auth:false must be measured signed out, or `/login` simply
// redirects to the dashboard and the row reports the wrong page's numbers.
const anon = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const route of ROUTES) {
  const measured = await (route.auth ? context : anon).newPage();
  let transferred = 0;
  let requests = 0;
  const errors = [];

  measured.on('response', async (res) => {
    requests += 1;
    try {
      const len = Number(res.headers()['content-length'] ?? 0);
      transferred += Number.isFinite(len) ? len : 0;
    } catch { /* ignore */ }
  });
  measured.on('pageerror', (e) => errors.push(e.message));

  const start = Date.now();
  await measured.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle', timeout: 60000 });
  const loadMs = Date.now() - start;

  const vitals = await measured.evaluate(
    () =>
      new Promise((resolve) => {
        const out = { lcp: 0, cls: 0, fcp: 0, ttfb: 0, domNodes: 0 };
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav) out.ttfb = Math.round(nav.responseStart);
        const paint = performance.getEntriesByName('first-contentful-paint')[0];
        if (paint) out.fcp = Math.round(paint.startTime);

        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            if (last) out.lcp = Math.round(last.startTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });

          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) out.cls += entry.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch { /* unsupported */ }

        setTimeout(() => {
          out.domNodes = document.getElementsByTagName('*').length;
          out.cls = Math.round(out.cls * 1000) / 1000;
          resolve(out);
        }, 1200);
      }),
  );

  rows.push({
    Route: route.name,
    'TTFB (ms)': vitals.ttfb,
    'FCP (ms)': vitals.fcp,
    'LCP (ms)': vitals.lcp,
    CLS: vitals.cls,
    'Load (ms)': loadMs,
    Requests: requests,
    'KB': Math.round(transferred / 1024),
    'DOM nodes': vitals.domNodes,
    Errors: errors.length,
  });

  if (errors.length) console.log(`  ${route.name} page errors:`, errors.slice(0, 3));
  await measured.close();
}

console.table(rows);

const budgets = { 'LCP (ms)': 2500, CLS: 0.1, 'DOM nodes': 3000 };
let failed = 0;
for (const row of rows) {
  for (const [metric, limit] of Object.entries(budgets)) {
    if (row[metric] > limit) {
      console.log(`  OVER BUDGET: ${row.Route} ${metric} = ${row[metric]} (budget ${limit})`);
      failed += 1;
    }
  }
  if (row.Errors > 0) {
    console.log(`  PAGE ERRORS: ${row.Route}`);
    failed += 1;
  }
}
console.log(failed === 0 ? '\n  All routes within budget.\n' : `\n  ${failed} budget breach(es).\n`);

await browser.close();
process.exit(failed === 0 ? 0 : 1);
