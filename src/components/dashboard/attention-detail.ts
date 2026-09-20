import { pct, prettyDate } from '@/lib/format';

/**
 * Detail strings for the dashboard's attention lists.
 *
 * Deliberately in a plain module rather than beside the component: the
 * dashboard is a server component and calls these during render, and a
 * function exported from a 'use client' file cannot be invoked on the server.
 */

export function weakDetail(bestScore: number, attempts: number): string {
  if (attempts === 0) return 'flagged difficult';
  return `best ${pct(bestScore)} \u00b7 ${attempts} attempt${attempts === 1 ? '' : 's'}`;
}

export function reviewDetail(nextReviewAt: string | null, today: string): string {
  if (!nextReviewAt) return 'due';
  if (nextReviewAt <= today) return 'due now';
  return prettyDate(nextReviewAt);
}
