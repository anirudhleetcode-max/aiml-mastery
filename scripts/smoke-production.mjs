/**
 * Smoke-tests a deployed instance over the public internet.
 *
 * This is deliberately a standalone script with no test-runner around it, so
 * it can be pointed at any URL from anywhere — a CI runner, a laptop, a
 * bastion — without the repository's dev dependencies being installed on the
 * far side. It asserts the things a deployment can break that a build cannot
 * catch: whether the database is actually reachable and persistent, whether
 * the session cookie is issued with production flags, whether the security
 * headers survived the platform's proxy, and whether protected routes are
 * still protected.
 *
 *   node scripts/smoke-production.mjs https://your-domain.example
 *
 * Exits non-zero on the first hard failure, so it can gate a deploy.
 */

const BASE = (process.argv[2] ?? process.env.SMOKE_URL ?? '').replace(/\/$/, '');
if (!BASE) {
  console.error('usage: node scripts/smoke-production.mjs <https://your-deployment>');
  process.exit(2);
}

let failures = 0;
let checks = 0;

function ok(name, detail = '') {
  checks += 1;
  console.log(`  PASS  ${name}${detail ? ` — ${detail}` : ''}`);
}
function bad(name, detail = '') {
  checks += 1;
  failures += 1;
  console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
}
function expect(cond, name, detail = '') {
  if (cond) ok(name, detail);
  else bad(name, detail);
}

const jar = new Map();
function storeCookies(res) {
  const raw = res.headers.getSetCookie?.() ?? [];
  for (const line of raw) {
    const [pair] = line.split(';');
    const idx = pair.indexOf('=');
    if (idx > 0) jar.set(pair.slice(0, idx).trim(), pair.slice(idx + 1).trim());
  }
  return raw;
}
const cookieHeader = () => [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');

async function get(path, opts = {}) {
  return fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { cookie: cookieHeader(), ...(opts.headers ?? {}) },
    ...opts,
  });
}
async function post(path, body) {
  return fetch(`${BASE}${path}`, {
    method: 'POST',
    redirect: 'manual',
    headers: { 'Content-Type': 'application/json', origin: BASE, cookie: cookieHeader() },
    body: JSON.stringify(body),
  });
}

console.log(`\nSmoke-testing ${BASE}\n`);

/* ---------------------------------------------- 1. it answers, over HTTPS */
expect(BASE.startsWith('https://'), 'served over HTTPS', BASE.split('://')[0]);

const home = await get('/');
expect(home.status === 200, 'GET / returns 200', `got ${home.status}`);
const html = await home.text();
expect(/<html/i.test(html), 'GET / returns HTML', `${html.length} bytes`);
expect(!/application error|internal server error/i.test(html), 'GET / is not a platform error page');

/* ---------------------------------------------- 2. security headers */
const headers = home.headers;
for (const [name, test] of [
  ['content-security-policy', (v) => v.includes("default-src 'self'")],
  ['x-content-type-options', (v) => v === 'nosniff'],
  ['x-frame-options', (v) => v.toUpperCase() === 'DENY'],
  ['referrer-policy', (v) => v.length > 0],
  ['permissions-policy', (v) => v.length > 0],
  ['strict-transport-security', (v) => v.includes('max-age')],
]) {
  const value = headers.get(name);
  expect(Boolean(value) && test(value), `header ${name}`, value ? value.slice(0, 48) : 'absent');
}
expect(!headers.get('x-powered-by'), 'x-powered-by is suppressed');

/* ---------------------------------------------- 3. public routes render */
for (const path of ['/login', '/signup', '/forgot-password']) {
  const res = await get(path);
  expect(res.status === 200, `GET ${path} returns 200`, `got ${res.status}`);
}

/* ---------------------------------------------- 4. protected routes redirect */
for (const path of ['/dashboard', '/interview', '/flashcards', '/labs', '/analytics', '/today', '/settings']) {
  const res = await get(path);
  const location = res.headers.get('location') ?? '';
  expect(
    (res.status === 307 || res.status === 302) && /\/login/.test(location),
    `GET ${path} redirects a signed-out visitor to /login`,
    `got ${res.status} ${location}`,
  );
}

/* ---------------------------------------------- 5. the database really works */
// Asked first, because every check below it fails the same opaque way when the
// answer is no: a 500 that says nothing about which part of the deployment is
// wrong. The classification comes from the deployment itself.
const health = await get('/api/health');
const healthBody = await health.json().catch(() => null);
expect(
  health.status === 200 && healthBody?.database === 'ok',
  'the deployment can reach its database',
  healthBody?.database ? `reported "${healthBody.database}"` : `got ${health.status}`,
);

const email = `smoke-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
const password = 'a-long-enough-smoke-passphrase';

const signup = await post('/api/auth/signup', { name: 'Smoke Test', email, password });
const setCookie = storeCookies(signup);
expect(signup.status === 200, 'signup writes to the production database', `got ${signup.status}`);

const sessionCookie = setCookie.find((c) => c.startsWith('aiml_session='));
expect(Boolean(sessionCookie), 'signup issues a session cookie');
if (sessionCookie) {
  expect(/HttpOnly/i.test(sessionCookie), 'session cookie is HttpOnly');
  expect(/Secure/i.test(sessionCookie), 'session cookie is Secure');
  expect(/SameSite=Lax/i.test(sessionCookie), 'session cookie is SameSite=Lax');
}

const authed = await get('/onboarding');
expect(authed.status === 200, 'a signed-in visitor reaches a protected route', `got ${authed.status}`);

/* ---------------------------------------------- 6. persistence across sessions */
const logout = await post('/api/auth/logout', {});
expect(logout.status === 200 || logout.status === 302, 'logout succeeds', `got ${logout.status}`);
jar.clear();

const relogin = await post('/api/auth/login', { email, password });
storeCookies(relogin);
expect(relogin.status === 200, 'the account survives logout and signs in again', `got ${relogin.status}`);

const state = await get('/api/state');
expect(state.status === 200, 'GET /api/state returns the learner state', `got ${state.status}`);
if (state.status === 200) {
  const body = await state.json().catch(() => null);
  expect(Boolean(body && typeof body === 'object'), 'learner state is real JSON read back from the database');
}

/* ---------------------------------------------- 7. authorisation is enforced */
jar.clear();
const anon = await get('/api/state');
expect(anon.status === 401, 'GET /api/state refuses an anonymous caller', `got ${anon.status}`);

const crossOrigin = await fetch(`${BASE}/api/auth/login`, {
  method: 'POST',
  redirect: 'manual',
  headers: { 'Content-Type': 'application/json', origin: 'https://evil.example' },
  body: JSON.stringify({ email, password }),
});
expect(crossOrigin.status === 403, 'a cross-origin login is rejected', `got ${crossOrigin.status}`);

/* ---------------------------------------------- 8. nothing leaks */
expect(!/sk-ant-|AUTH_SECRET|DATABASE_URL|postgres:\/\//i.test(html), 'no secret material in the landing HTML');
const notFound = await get('/this-route-does-not-exist');
expect(notFound.status === 404, 'an unknown route returns 404 rather than a stack trace', `got ${notFound.status}`);

console.log(`\n${checks - failures}/${checks} checks passed.\n`);
process.exit(failures === 0 ? 0 : 1);
