import 'server-only';
import { pruneRateLimits } from '@/lib/auth/rate-limit';
import { pruneAuthTokens } from '@/lib/auth/tokens';

/**
 * Housekeeping, without a scheduler.
 *
 * Two tables accumulate rows that are inert the moment they are written:
 * spent and expired auth tokens, and rate-limit windows for clients that have
 * gone quiet. Neither grows fast, and neither affects correctness — every
 * query already filters on expiry — so this is about not leaving a table to
 * grow without bound for the lifetime of a deployment.
 *
 * It runs opportunistically rather than on a cron because the deployment
 * targets this project documents do not all offer one, and a cleanup that
 * requires infrastructure the host might not have is a cleanup that quietly
 * never happens. At most one pass per process per hour, fire-and-forget, so
 * the learner whose request happened to trigger it waits for nothing and a
 * failure costs nothing.
 *
 * It is called from the routes that issue tokens rather than from
 * `issueToken` itself, which would make the token module depend on the module
 * that prunes it — a cycle, and one that would put housekeeping inside a
 * transaction's blast radius.
 *
 * `npm run db:prune` runs the same work synchronously, for anyone who would
 * rather have a cron job do it.
 */

const INTERVAL_MS = 1000 * 60 * 60;
let lastRun = 0;

export async function pruneNow(): Promise<{ tokens: number; rateLimits: number }> {
  const [tokens, rateLimits] = await Promise.all([pruneAuthTokens(), pruneRateLimits()]);
  return { tokens, rateLimits };
}

/** Fire-and-forget. Never throws, never awaited by a request path. */
export function maybePrune(): void {
  const now = Date.now();
  if (now - lastRun < INTERVAL_MS) return;
  // Claim the slot before the work starts, so two concurrent requests do not
  // both decide it is their turn.
  lastRun = now;
  void pruneNow().catch((error: unknown) => {
    console.error('[maintenance] prune failed:', error instanceof Error ? error.name : 'unknown');
  });
}

/** Test seam: lets a test exercise the interval without waiting an hour. */
export function resetPruneClock(): void {
  lastRun = 0;
}
