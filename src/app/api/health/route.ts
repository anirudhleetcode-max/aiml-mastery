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

type Status = 'ok' | 'engine-missing' | 'unreachable' | 'auth-failed' | 'schema-missing' | 'unknown';

/** Maps a driver error onto the fixed vocabulary, without quoting it. */
function classify(error: unknown): Status {
  const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);

  // The client was generated for a platform other than the one serving it.
  if (/query engine|libquery_engine|binaryTargets|Unable to require|QueryEngine/i.test(text)) {
    return 'engine-missing';
  }
  if (/P1000|authentication failed|password authentication/i.test(text)) return 'auth-failed';
  if (/P1001|P1002|can't reach|timed out|ECONNREFUSED|ENOTFOUND/i.test(text)) return 'unreachable';
  if (/P2021|P2022|does not exist in the current database|relation .* does not exist/i.test(text)) {
    return 'schema-missing';
  }
  return 'unknown';
}

export async function GET() {
  let database: Status = 'unknown';

  try {
    // Cheap and side-effect free: it proves a connection and a round trip
    // without depending on any table having rows.
    await prisma.$queryRaw`SELECT 1`;
    database = 'ok';
  } catch (error) {
    database = classify(error);
    // The full error belongs in the platform's logs, not in the response.
    console.error('[health] database check failed:', error);
  }

  const body = { ok: database === 'ok', database };
  return NextResponse.json(body, {
    status: body.ok ? 200 : 503,
    headers: { 'cache-control': 'no-store' },
  });
}
