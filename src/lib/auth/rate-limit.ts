import { prisma } from '@/lib/db';

/**
 * A fixed-window rate limiter backed by the database.
 *
 * It was in-process, which is fine for one Node server and wrong the moment
 * there are two: each instance keeps its own Map, so N instances behind a
 * load balancer allow N times the intended limit. That is the control quietly
 * not working rather than failing loudly, which is the worse of the two.
 *
 * The store is the database the app already has — no Redis, no new service.
 * Each key is one row holding its window's end and a count, rewritten when
 * the window expires, so the table stays proportional to active clients
 * rather than to total requests.
 */

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/** Applied when the store is unreachable — see the note in `rateLimit`. */
const ALLOW: RateLimitResult = { ok: true, remaining: 0, retryAfterSeconds: 0 };

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  try {
    const row = await prisma.rateLimit.findUnique({ where: { key } });

    // No row, or the window has passed: start a fresh one.
    if (!row || Number(row.resetAt) <= now) {
      const resetAt = BigInt(now + windowMs);
      await prisma.rateLimit.upsert({
        where: { key },
        create: { key, count: 1, resetAt },
        update: { count: 1, resetAt },
      });
      return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
    }

    const updated = await prisma.rateLimit.update({
      where: { key },
      data: { count: { increment: 1 } },
      select: { count: true, resetAt: true },
    });

    if (updated.count > limit) {
      return {
        ok: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil((Number(updated.resetAt) - now) / 1000)),
      };
    }
    return { ok: true, remaining: limit - updated.count, retryAfterSeconds: 0 };
  } catch {
    // Fail open. A limiter that rejects every request when its store hiccups
    // is a denial of service on the application itself, and the endpoints
    // behind it are already authenticated and validated. The trade is
    // deliberate: availability over a brief window of unthrottled requests.
    return ALLOW;
  }
}

/**
 * Removes expired counters.
 *
 * Rows are rewritten in place while a key stays active, so this only clears
 * keys that have gone quiet. Safe to call on any schedule, or never — the
 * table grows with distinct clients rather than with requests.
 */
export async function pruneRateLimits(): Promise<number> {
  const { count } = await prisma.rateLimit.deleteMany({ where: { resetAt: { lt: BigInt(Date.now()) } } });
  return count;
}

/** Best-effort client identity for rate limiting. */
export function clientKey(req: Request, scope: string): string {
  const fwd = req.headers.get('x-forwarded-for');
  const ip = fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'local';
  return `${scope}:${ip}`;
}

/**
 * Rejects cross-site state-changing requests. SameSite=Lax already blocks the
 * classic CSRF form post; this closes the gap for same-site subdomains and
 * makes the intent explicit.
 */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin fetches may omit Origin
  const host = req.headers.get('host');
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
