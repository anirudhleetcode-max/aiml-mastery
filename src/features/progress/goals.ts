import { addDays, dateKey } from '@/lib/format';
import type { DayActivity, LearnerState } from '@/types/progress';

/**
 * Daily and weekly goals.
 *
 * Deliberately derived rather than stored. A goal the learner can edit
 * independently of their plan is a second source of truth that drifts: set a
 * goal of one unit a day against a schedule needing two, and the platform
 * congratulates you while the deadline slips. So the goal *is* the plan —
 * today's scheduled minutes, and the week's share of what finishing on time
 * requires — and it moves when progress moves, which is the property the
 * dashboard is claiming when it shows a ring filling up.
 *
 * Nothing here is a new record. Every number comes from `activity`, the
 * schedule and the profile, so a goal cannot disagree with the analytics
 * page about what happened.
 */

export interface Goal {
  /** What the learner has done so far in the period. */
  current: number;
  /** What the period asks for. Never zero, so progress is always defined. */
  target: number;
  /** 0–1, clamped. */
  progress: number;
  met: boolean;
}

export interface GoalSet {
  /** Minutes studied today against today's planned minutes. */
  dailyMinutes: Goal;
  /** Lessons finished today against how many today's plan holds. */
  dailyUnits: Goal;
  /** Units finished in the last seven days against the pace the deadline needs. */
  weeklyUnits: Goal;
  /** Days active in the last seven, against a five-day habit. */
  weeklyActiveDays: Goal;
  /** True when every daily goal is met — what the streak and the UI celebrate. */
  dayComplete: boolean;
}

/** A habit target rather than a schedule one: five days in seven is sustainable. */
const ACTIVE_DAYS_TARGET = 5;

function goal(current: number, target: number): Goal {
  const safeTarget = Math.max(1, Math.round(target * 100) / 100);
  const progress = Math.max(0, Math.min(1, current / safeTarget));
  return { current, target: safeTarget, progress, met: current >= safeTarget };
}

export interface GoalInputs {
  today: string;
  /** Minutes today's plan asks for, from the schedule. */
  plannedMinutes: number;
  /** Lessons today's plan holds. */
  plannedUnits: number;
  /** Units per day the deadline requires, from the pace report. */
  requiredPace: number;
}

export function computeGoals(
  state: Pick<LearnerState, 'activity'>,
  { today, plannedMinutes, plannedUnits, requiredPace }: GoalInputs,
): GoalSet {
  const todayActivity: DayActivity | undefined = state.activity[today];
  const minutesToday = Math.round((todayActivity?.studySeconds ?? 0) / 60);

  const week: DayActivity[] = [];
  for (let i = 0; i < 7; i += 1) {
    const day = state.activity[addDays(today, -i)];
    if (day) week.push(day);
  }

  const unitsThisWeek = week.reduce((a, d) => a + d.unitsCompleted, 0);
  const activeDays = week.filter((d) => d.studySeconds > 0 || d.unitsCompleted > 0 || d.testTaken).length;

  const dailyMinutes = goal(minutesToday, plannedMinutes);
  const dailyUnits = goal(todayActivity?.unitsCompleted ?? 0, plannedUnits);

  return {
    dailyMinutes,
    dailyUnits,
    // Seven days of the pace the deadline actually requires, rather than a
    // round number that happens to look encouraging.
    weeklyUnits: goal(unitsThisWeek, requiredPace * 7),
    weeklyActiveDays: goal(activeDays, ACTIVE_DAYS_TARGET),
    // A rest day has nothing planned, so it is complete by definition rather
    // than permanently unmet.
    dayComplete: dailyUnits.met && dailyMinutes.met,
  };
}

/** Convenience for the notification engine, which only needs today. */
export function dailyGoalUnmet(goals: GoalSet): boolean {
  return !goals.dayComplete;
}

export { dateKey };
