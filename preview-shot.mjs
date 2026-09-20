import { chromium } from '@playwright/test';
const BASE = 'http://127.0.0.1:3200';
const OUT = process.argv[2] ?? '/tmp/shots';
const routes = process.argv.slice(3);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push('PAGEERROR ' + e.message.split('\n')[0]));
page.on('console', m => { if (m.type()==='error' && !m.text().includes('404')) errs.push('CONSOLE ' + m.text().slice(0,160)); });

await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
// Wait for hydration: the submit button is deliberately disabled until then.
await page.getByRole('button', { name: 'Sign in' }).waitFor({ state: 'visible' });
await page.waitForFunction(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.textContent?.includes('Sign in'));
  return b && !b.disabled;
}, null, { timeout: 60000 });
await page.getByLabel('Email').fill('demo@aimlmastery.app');
await page.getByLabel('Password', { exact: true }).fill('demolearner2026');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL(/dashboard|onboarding/, { timeout: 60000 });

for (const r of routes) {
  const name = r.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'root';
  try {
    const res = await page.goto(`${BASE}${r}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`${res?.status()} ${r}`);
  } catch (e) {
    console.log(`FAIL ${r}: ${String(e).split('\n')[0].slice(0,120)}`);
  }
}
if (errs.length) console.log('\nERRORS:\n' + [...new Set(errs)].slice(0,12).join('\n'));
else console.log('\nno page errors');
await browser.close();
