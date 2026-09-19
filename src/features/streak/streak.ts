import { addDays, dateKey, daysBetween } from '@/lib/format';
import type { StreakState } from '@/types/progress';

export const STREAK_MILESTONES = [7, 14, 30, 50, 75, 100] as const;

export function emptyStreak(): StreakState {
  return {
    current: 0,
    longest: 0,
    lastActiveDate: null,
    testStreak: 0,
    longestTestStreak: 0,
    teachingStreak: 0,
    weeksActive: 0,
    freezesRemaining: 2,
  };
}

export interface StreakUpdate {
  streak: StreakState;
  /** Milestones newly crossed by this update. */
  milestonesReached: number[];
  /** True when a rest day was absorbed by a freeze instead of breaking the streak. */
  freezeUsed: boolean;
}

/**
 * Records activity on `today` and returns the new streak state.
 *
 * Two humane details, per the spec's insistence on motivation over punishment:
 * a single missed day is absorbed by a "freeze" if one is available, and the
 * longest streak is never reduced — past effort stays on the record.
 */
export function recordActivity(
  state: StreakState,
  today: string = dateKey(),
  opts: { tookTest?: boolean; taught?: boolean } = {},
): StreakUpdate {
  const next: StreakState = { ...state };
  let freezeUsed = false;

  if (state.lastActiveDate === today) {
    // Already counted today; only the sub-streaks can still change.
    if (opts.tookTest) {
      next.testStreak = state.testStreak;
    }
    return { streak: next, milestonesReached: [], freezeUsed };
  }

  const gap = state.lastActiveDate ? daysBetween(state.lastActiveDate, today) : Infinity;

  if (gap === 1 || state.lastActiveDate === null) {
    next.current = state.current + 1;
  } else if (gap === 2 && state.freezesRemaining > 0) {
    next.current = state.current + 1;
    next.freezesRemaining = state.freezesRemaining - 1;
    freezeUsed = true;
  } else {
    next.current = 1;
  }

  next.lastActiveDate = today;
  next.longest = Math.max(state.longest, next.current);
  next.weeksActive = Math.max(state.weeksActive, Math.ceil(next.current / 7));

  if (opts.tookTest) {
    next.testStreak = gap <= 1 || state.lastActiveDate === null ? state.testStreak + 1 : 1;
    next.longestTestStreak = Math.max(state.longestTestStreak, next.testStreak);
  }
  if (opts.taught) {
    next.teachingStreak = gap <= 1 ? state.teachingStreak + 1 : 1;
  }

  const milestonesReached = STREAK_MILESTONES.filter((m) => state.current < m && next.current >= m);

  // Crossing a milestone restores one freeze, capped at two.
  if (milestonesReached.length > 0) {
    next.freezesRemaining = Math.min(2, next.freezesRemaining + 1);
  }

  return { streak: next, milestonesReached: [...milestonesReached], freezeUsed };
}

/** True when the streak will break unless the learner acts today. */
export function isStreakAtRisk(state: StreakState, today: string = dateKey()): boolean {
  if (state.current === 0 || !state.lastActiveDate) return false;
  return daysBetween(state.lastActiveDate, today) >= 1;
}

/** The streak as it should be *displayed* — a stale streak reads as broken. */
export function effectiveStreak(state: StreakState, today: string = dateKey()): number {
  if (!state.lastActiveDate) return 0;
  const gap = daysBetween(state.lastActiveDate, today);
  if (gap <= 1) return state.current;
  if (gap === 2 && state.freezesRemaining > 0) return state.current;
  return 0;
}

export function nextMilestone(current: number): number | null {
  return STREAK_MILESTONES.find((m) => m > current) ?? null;
}

export function streakCalendar(state: StreakState, today: string = dateKey()): string[] {
  const days: string[] = [];
  const n = effectiveStreak(state, today);
  for (let i = n - 1; i >= 0; i--) days.push(addDays(today, -i));
  return days;
}
