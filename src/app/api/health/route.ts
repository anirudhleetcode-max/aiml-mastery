import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Says whether this instance can actually reach its database.
 *
 * A deployment can be green in every way a build can measure and still be
 * unable to open a connection: the client generated for the wrong engine, the
 * wrong datasource provider, a schema that was never pushed, credentials that
 * do not work from the runtime's network. From outside, all of those look
 * identical — a 500 from whichever endpoint touched the database first — and
 * the platform's logs are not always reachable from where the deploy was run.
 *
 * So this reports a *classification*, never the underlying text. Prisma's
 * errors quote the connection string and the host, and this endpoint is
 * public; the vocabulary below is fixed and deliberately coarse, which is
 * enough to tell the four failure modes apart and carries nothing an
 * anonymous caller should not see.
 */

type Status =
  | 'ok'
  | 'engine-missing'
  | 'unreachable'
  | 'auth-failed'
  | 'schema-missing'
  | 'env-missing'
  | 'url-scheme-mismatch'
  | 'unknown';

/** Maps a driver error onto the fixed vocabulary, without quoting it. */
function classify(error: unknown): Status {
  const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);

  // The client was generated for a platform other than the one serving it.
  if (/query engine|libquery_engine|binaryTargets|Unable to require|QueryEngine/i.test(text)) {
    return 'engine-missing';
  }
  // Prisma resolves env("DATABASE_URL") itself, so an unset variable surfaces
  // here rather than as a connection failure.
  if (/environment variable not found|not found: DATABASE_URL/i.test(text)) return 'env-missing';
  // The generated client and the connection string disagree about the driver.
  if (/must start with the protocol|invalid protocol|the provided database string/i.test(text)) {
    return 'url-scheme-mismatch';
  }
  if (/P1000|authentication failed|password authentication/i.test(text)) return 'auth-failed';
  if (/P1001|P1002|can't reach|timed out|ECONNREFUSED|ENOTFOUND/i.test(text)) return 'unreachable';
  if (/P2021|P2022|does not exist in the current database|relation .* does not exist/i.test(text)) {
    return 'schema-missing';
  }
  return 'unknown';
}

/**
 * The error's class name and Prisma's error code, which name a fault without
 * describing it. Neither carries a host, a credential or a query — unlike the
 * message, which carries all three.
 */
function fingerprint(error: unknown) {
  const named = error as { name?: string; code?: string; errorCode?: string };
  const code = named?.code ?? named?.errorCode;
  return {
    kind: typeof named?.name === 'string' ? named.name.slice(0, 60) : 'Error',
    ...(typeof code === 'string' ? { code: code.slice(0, 12) } : {}),
  };
}

export async function GET() {
  let database: Status = 'unknown';
  let detail: { kind: string; code?: string } | null = null;

  try {
    // Cheap and side-effect free: it proves a connection and a round trip
    // without depending on any table having rows.
    await prisma.$queryRaw`SELECT 1`;
    database = 'ok';
  } catch (error) {
    database = classify(error);
    detail = fingerprint(error);
    // The full error belongs in the platform's logs, not in the response.
    console.error('[health] database check failed:', error);
  }

  const body = { ok: database === 'ok', database, ...(detail ? { detail } : {}) };
  return NextResponse.json(body, {
    status: body.ok ? 200 : 503,
    headers: { 'cache-control': 'no-store' },
  });
}
