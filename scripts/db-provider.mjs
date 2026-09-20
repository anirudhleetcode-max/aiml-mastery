/**
 * Keeps prisma/schema.prisma's datasource provider in step with the
 * environment it is being built for.
 *
 * Prisma will not take `provider` from an environment variable — it has to be
 * a literal in the schema — and a managed serverless host cannot keep a SQLite
 * file, because its filesystem is per-invocation. Those two facts together are
 * the whole reason this script exists: without it, deploying to Vercel or any
 * similar platform builds successfully and then silently loses every learner's
 * progress between requests, which is the worst kind of failure because it
 * looks like success.
 *
 * The provider is decided in this order:
 *
 *   1. an explicit argument           node scripts/db-provider.mjs postgresql
 *   2. DATABASE_PROVIDER
 *   3. the scheme of DATABASE_URL
 *   4. sqlite
 *
 * Step 3 matters more than it looks. A build that runs this script without
 * DATABASE_PROVIDER set — `vercel build` does exactly that, because it runs
 * `npm run build` in its own environment — would otherwise fall through to
 * sqlite and generate a SQLite client against a postgresql:// URL. That
 * combination compiles, deploys, serves every page that does not touch the
 * database, and then fails every single read and write at runtime. Deriving
 * the provider from the URL makes the client and the connection string agree
 * by construction, whichever variable happened to survive the trip.
 *
 * And when both are present and disagree, this stops the build. A mismatch
 * here cannot produce a working deployment, so failing loudly at build time
 * is strictly better than failing quietly at request time.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SUPPORTED = new Set(['sqlite', 'postgresql']);
const SCHEMA = path.resolve('prisma/schema.prisma');

/** The provider a connection string implies, or null if it says nothing. */
function providerFromUrl(url) {
  if (!url) return null;
  const scheme = /^([a-z+]+):/i.exec(url.trim())?.[1]?.toLowerCase();
  if (!scheme) return null;
  if (scheme === 'file') return 'sqlite';
  if (scheme === 'postgres' || scheme === 'postgresql') return 'postgresql';
  return null;
}

const stated = process.argv[2] ?? process.env.DATABASE_PROVIDER ?? null;
const implied = providerFromUrl(process.env.DATABASE_URL);

if (stated && implied && stated.toLowerCase() !== implied) {
  console.error(
    `[db-provider] DATABASE_URL is a ${implied} connection string but the provider was given as "${stated}".\n` +
      '[db-provider] A client generated for one cannot talk to the other, so this build would fail at runtime rather than here.',
  );
  process.exit(1);
}

const wanted = (stated ?? implied ?? 'sqlite').toLowerCase();

if (!SUPPORTED.has(wanted)) {
  console.error(
    `[db-provider] "${wanted}" is not a supported provider. Use one of: ${[...SUPPORTED].join(', ')}.`,
  );
  process.exit(1);
}

const source = stated ? 'stated' : implied ? 'derived from DATABASE_URL' : 'default';

const schema = readFileSync(SCHEMA, 'utf8');
const datasource = /(datasource\s+db\s*\{[^}]*?provider\s*=\s*")([a-z]+)(")/s;
const found = datasource.exec(schema);

if (!found) {
  console.error('[db-provider] could not find the datasource provider in prisma/schema.prisma.');
  process.exit(1);
}

const current = found[2];
if (current === wanted) {
  console.log(`[db-provider] schema already targets ${wanted} (${source}).`);
  process.exit(0);
}

writeFileSync(SCHEMA, schema.replace(datasource, `$1${wanted}$3`), 'utf8');
console.log(`[db-provider] datasource provider: ${current} → ${wanted} (${source}).`);

if (wanted === 'postgresql') {
  console.log('[db-provider] remember that DATABASE_URL must now be a postgresql:// connection string.');
}
