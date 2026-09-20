import { chromium } from '@playwright/test';
const BASE = 'http://localhost:3112';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const errors = [];
const failed = [];
ctx.on('page', (p) => {
  p.on('console', (m) => { if (m.type() === 'error') errors.push(`${m.text().slice(0,90)}`); });
  p.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  p.on('requestfailed', (r) => failed.push(r.url()));
  p.on('response', (r) => { if (r.status() === 404) failed.push(`404 ${r.url()}`); });
});
await ctx.request.post(`${BASE}/api/auth/login`, { headers: { 'Content-Type': 'application/json', Origin: BASE }, data: { email: 'sandbox-check@example.com', password: 'Sandbox-Check-2026' } });
const page = await ctx.newPage();

// control: an existing page, to attribute shared warnings
await page.goto(`${BASE}/tests`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
console.log('control /tests console errors:', errors.length, errors.slice(0,3));
errors.length = 0;

// notes autosave
await page.goto(`${BASE}/notes`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.getByRole('button', { name: 'Edit' }).first().click();
const ta = page.locator('textarea').first();
await ta.click();
await ta.type('Second browser pass.');
await page.waitForTimeout(400);
console.log('notes: while typing status =', (await page.locator('[aria-live="polite"]').first().innerText()).trim());
await page.waitForTimeout(1800);
console.log('notes: after debounce status =', (await page.locator('[aria-live="polite"]').first().innerText()).trim());
await page.getByRole('button', { name: 'Done' }).click();
await page.waitForTimeout(1500);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(800);
console.log('notes: persisted after reload =', await page.getByText(/Second browser pass/).count());

// practice hint/solution
await page.goto(`${BASE}/practice`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const hintBtn = page.getByRole('button', { name: /^Hint$/ }).first();
const hintId = await hintBtn.getAttribute('aria-controls');
console.log('practice: hint panel hidden before =', await page.locator(`#${hintId}`).isHidden());
await hintBtn.click();
await page.waitForTimeout(200);
console.log('practice: hint panel visible after =', await page.locator(`#${hintId}`).isVisible());
console.log('practice: hint text starts =', (await page.locator(`#${hintId}`).innerText()).slice(0, 40).replace(/\n/g, ' '));

// mistakes persistence across reload
await page.goto(`${BASE}/mistakes`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.getByRole('button', { name: /Mark resolved/ }).first().click();
await page.waitForTimeout(1600);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(900);
console.log('mistakes: put-back buttons after reload =', await page.getByRole('button', { name: /Put back/ }).count());

// keyboard operability on the flashcard
await page.goto(`${BASE}/flashcards`, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await page.getByRole('button', { name: /Show the answer/ }).focus();
await page.keyboard.press('Enter');
await page.waitForTimeout(250);
console.log('flashcards: flipped with Enter =', await page.getByRole('button', { name: /Show the question/ }).count());
await page.keyboard.press('Tab');
console.log('flashcards: next focus =', await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 24)));

console.log('failed/404 requests:', [...new Set(failed)].slice(0, 5));
console.log('page console errors:', [...new Set(errors)].slice(0, 6));
await browser.close();
