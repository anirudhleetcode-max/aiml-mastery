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
 * So the host sets DATABASE_PROVIDER=postgresql alongside its DATABASE_URL,
 * and the build rewrites one line. Unset, nothing happens and local SQLite
 * development is untouched — which is why `npm run setup` still works with no
 * external service.
 *
 *   node scripts/db-provider.mjs            # honour DATABASE_PROVIDER
 *   node scripts/db-provider.mjs postgresql # or state it outright
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SUPPORTED = new Set(['sqlite', 'postgresql']);
const SCHEMA = path.resolve('prisma/schema.prisma');

const wanted = (process.argv[2] ?? process.env.DATABASE_PROVIDER ?? 'sqlite').toLowerCase();

if (!SUPPORTED.has(wanted)) {
  console.error(
    `[db-provider] "${wanted}" is not a supported provider. Use one of: ${[...SUPPORTED].join(', ')}.`,
  );
  process.exit(1);
}

const schema = readFileSync(SCHEMA, 'utf8');
const datasource = /(datasource\s+db\s*\{[^}]*?provider\s*=\s*")([a-z]+)(")/s;
const found = datasource.exec(schema);

if (!found) {
  console.error('[db-provider] could not find the datasource provider in prisma/schema.prisma.');
  process.exit(1);
}

const current = found[2];
if (current === wanted) {
  console.log(`[db-provider] schema already targets ${wanted}.`);
  process.exit(0);
}

writeFileSync(SCHEMA, schema.replace(datasource, `$1${wanted}$3`), 'utf8');
console.log(`[db-provider] datasource provider: ${current} → ${wanted}.`);

if (wanted === 'postgresql') {
  console.log('[db-provider] remember that DATABASE_URL must now be a postgresql:// connection string.');
}
