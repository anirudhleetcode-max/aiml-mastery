/**
 * Deletes rows that are already inert: spent or expired auth tokens, and
 * rate-limit windows whose clients have gone quiet.
 *
 * The app also does this opportunistically (see src/lib/maintenance.ts), so
 * this script is for hosts that would rather run it from cron than have a
 * request pay for it. Safe to run at any time, or never.
 */
import { pruneRateLimits } from '../src/lib/auth/rate-limit';
import { pruneAuthTokens } from '../src/lib/auth/tokens';
import { prisma } from '../src/lib/db';

async function main() {
  const [tokens, rateLimits] = await Promise.all([pruneAuthTokens(), pruneRateLimits()]);
  console.log(`Pruned ${tokens} auth token(s) and ${rateLimits} rate-limit window(s).`);
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
