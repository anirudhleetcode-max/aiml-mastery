import type { UnitMeta } from '@/data/curriculum';
import { addDays, dateKey, daysBetween, isWeekend } from '@/lib/format';
import type { DailyPlan, DailyPlanItem, StudyBudget } from '@/types/progress';

export const COURSE_START = '2026-09-20';
export const COURSE_END = '2026-12-31';

export interface ScheduleOptions {
  startDate: string;
  endDate: string;
  /** Minutes the learner has on a normal weekday. */
  dailyMinutes: StudyBudget | number;
  /** Fraction of the weekday budget available at weekends. */
  weekendFactor?: number;
  /** Minutes reserved each day for the daily test and review. */
  assessmentReserve?: number;
  /** Dates the learner has explicitly paused. */
  pausedDates?: string[];
}

export interface Schedule {
  days: DailyPlan[];
  byDate: Map<string, DailyPlan>;
  totalDays: number;
  studyDays: number;
  /** True when the curriculum does not fit the budget and days were compressed. */
  compressed: boolean;
  averageMinutesPerDay: number;
}

const DEFAULTS = { weekendFactor: 0.6, assessmentReserve: 10 };

/**
 * Builds the day-by-day plan.
 *
 * Deliberately *not* `214 / days`. Units carry different weights, so the
 * planner packs by estimated minutes against a real daily budget, gives
 * weekends a lighter load, and reserves time each day for the test and
 * review. Curriculum order already encodes prerequisites, so packing in
 * order is sufficient to keep every prerequisite ahead of its dependants.
 */
export function buildSchedule(units: UnitMeta[], options: ScheduleOptions): Schedule {
  const opts = { ...DEFAULTS, ...options };
  const paused = new Set(opts.pausedDates ?? []);

  const dates: string[] = [];
  const total = daysBetween(opts.startDate, opts.endDate);
  for (let i = 0; i <= total; i++) {
    const d = addDays(opts.startDate, i);
    if (!paused.has(d)) dates.push(d);
  }

  const capacityFor = (date: string) =>
    Math.max(
      15,
      Math.round(Number(opts.dailyMinutes) * (isWeekend(date) ? opts.weekendFactor : 1)) - opts.assessmentReserve,
    );

  const queue = [...units];
  const days: DailyPlan[] = [];
  let compressed = false;

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]!;
    const capacity = capacityFor(date);
    const items: DailyPlanItem[] = [];
    let used = 0;

    while (queue.length > 0) {
      const next = queue[0]!;
      const wouldUse = used + next.estimatedMinutes;
      // Always allow the first unit of a day, even if it exceeds the budget —
      // otherwise a 50-minute unit would stall a 30-minute-a-day schedule for ever.
      if (items.length > 0 && wouldUse > capacity) break;
      queue.shift();
      items.push({ unitId: next.id, kind: 'learn', estimatedMinutes: next.estimatedMinutes });
      used = wouldUse;
      if (used >= capacity) break;
    }

    days.push({
      date,
      dayNumber: i + 1,
      items,
      testRequired: items.length > 0,
      totalMinutes: used + (items.length > 0 ? opts.assessmentReserve : 0),
      theme: themeFor(items, units),
    });
  }

  // Never silently drop units: if the budget cannot absorb the curriculum,
  // spread the remainder across the tail so the deadline tracker can show an
  // honest — if demanding — required pace.
  if (queue.length > 0) {
    compressed = true;
    const tail = Math.min(days.length, Math.max(1, Math.ceil(days.length * 0.5)));
    const startIndex = days.length - tail;
    let cursor = 0;
    while (queue.length > 0) {
      const day = days[startIndex + (cursor % tail)]!;
      const next = queue.shift()!;
      day.items.push({ unitId: next.id, kind: 'learn', estimatedMinutes: next.estimatedMinutes });
      day.totalMinutes += next.estimatedMinutes;
      day.testRequired = true;
      cursor++;
    }
    for (const d of days) d.theme = themeFor(d.items, units);
  }

  const studyDays = days.filter((d) => d.items.length > 0).length;
  const totalMinutes = days.reduce((a, d) => a + d.totalMinutes, 0);

  return {
    days,
    byDate: new Map(days.map((d) => [d.date, d])),
    totalDays: days.length,
    studyDays,
    compressed,
    averageMinutesPerDay: studyDays ? Math.round(totalMinutes / studyDays) : 0,
  };
}

function themeFor(items: DailyPlanItem[], units: UnitMeta[]): string {
  if (items.length === 0) return 'Rest day';
  const byId = new Map(units.map((u) => [u.id, u]));
  const counts = new Map<string, number>();
  for (const it of items) {
    const module = byId.get(it.unitId)?.module;
    if (module) counts.set(module, (counts.get(module) ?? 0) + 1);
  }
  let best = '';
  let bestCount = 0;
  for (const [module, count] of counts) {
    if (count > bestCount) {
      best = module;
      bestCount = count;
    }
  }
  return best || 'Study';
}

/* ------------------------------------------------------------------ */
/* Pace and recovery                                                   */
/* ------------------------------------------------------------------ */

export interface PaceReport {
  today: string;
  daysElapsed: number;
  daysRemaining: number;
  totalUnits: number;
  completedUnits: number;
  remainingUnits: number;
  /** Units the plan expected to be finished by end of today. */
  expectedByNow: number;
  /** Positive = ahead, negative = behind. */
  delta: number;
  /** Units per day needed from tomorrow to finish on time. */
  requiredPace: number;
  /** Units per day achieved so far. */
  actualPace: number;
  status: 'ahead' | 'on-track' | 'slightly-behind' | 'behind' | 'finished' | 'not-started';
  message: string;
}

export function computePace(
  schedule: Schedule,
  completedUnitIds: Set<string>,
  today: string = dateKey(),
): PaceReport {
  const totalUnits = schedule.days.reduce((a, d) => a + d.items.length, 0);
  const completedUnits = completedUnitIds.size;
  const remainingUnits = Math.max(0, totalUnits - completedUnits);

  const first = schedule.days[0]?.date ?? today;
  const last = schedule.days[schedule.days.length - 1]?.date ?? today;

  const daysElapsed = Math.max(0, Math.min(schedule.totalDays, daysBetween(first, today) + 1));
  const daysRemaining = Math.max(0, daysBetween(today, last));

  let expectedByNow = 0;
  for (const day of schedule.days) {
    if (day.date > today) break;
    expectedByNow += day.items.length;
  }

  const delta = completedUnits - expectedByNow;
  const requiredPace = daysRemaining > 0 ? remainingUnits / daysRemaining : remainingUnits;
  const actualPace = daysElapsed > 0 ? completedUnits / daysElapsed : 0;

  let status: PaceReport['status'];
  if (remainingUnits === 0) status = 'finished';
  else if (today < first) status = 'not-started';
  else if (delta >= 2) status = 'ahead';
  else if (delta >= -1) status = 'on-track';
  else if (delta >= -5) status = 'slightly-behind';
  else status = 'behind';

  const messages: Record<PaceReport['status'], string> = {
    finished: 'Every scheduled unit is complete. The final assessment is waiting.',
    'not-started': 'Your journey begins on 20 September 2026.',
    ahead: `You are ${delta} concept${delta === 1 ? '' : 's'} ahead of schedule.`,
    'on-track': 'You are on track. Keep the rhythm.',
    'slightly-behind': `You are ${Math.abs(delta)} concept${Math.abs(delta) === 1 ? '' : 's'} behind. One focused session closes the gap.`,
    behind: `You are ${Math.abs(delta)} concepts behind schedule. A recovery plan is ready below.`,
  };

  return {
    today,
    daysElapsed,
    daysRemaining,
    totalUnits,
    completedUnits,
    remainingUnits,
    expectedByNow,
    delta,
    requiredPace,
    actualPace,
    status,
    message: messages[status],
  };
}

export interface RecoveryPlan {
  needed: boolean;
  /** Ordered unit ids to tackle next, highest leverage first. */
  priority: { unitId: string; reason: string }[];
  perDay: number;
  daysRemaining: number;
  summary: string;
}

/**
 * When the learner falls behind, the answer is not "do everything tomorrow".
 * Work is re-prioritised: unblocking prerequisites first (they gate the most
 * future units), then weak topics that will keep costing marks, then the
 * ordinary backlog.
 */
export function buildRecoveryPlan(
  schedule: Schedule,
  units: UnitMeta[],
  completed: Set<string>,
  weak: Set<string>,
  pace: PaceReport,
): RecoveryPlan {
  const byId = new Map(units.map((u) => [u.id, u]));
  const outstanding: { unitId: string; reason: string; weight: number }[] = [];

  for (const day of schedule.days) {
    if (day.date > pace.today) break;
    for (const item of day.items) {
      if (completed.has(item.unitId)) continue;
      const unit = byId.get(item.unitId);
      if (!unit) continue;
      // A unit that gates many others is worth more than one that gates none.
      const gatingWeight = unit.leadsTo.filter((id) => !completed.has(id)).length;
      outstanding.push({
        unitId: unit.id,
        reason:
          gatingWeight >= 2
            ? `Unlocks ${gatingWeight} later units`
            : weak.has(unit.id)
              ? 'Marked weak — worth redoing properly'
              : 'Missed from your plan',
        weight: gatingWeight * 10 + (weak.has(unit.id) ? 5 : 0) + (6 - unit.difficulty),
      });
    }
  }

  for (const id of weak) {
    if (outstanding.some((o) => o.unitId === id)) continue;
    const unit = byId.get(id);
    if (!unit) continue;
    outstanding.push({ unitId: id, reason: 'Weak topic — revisit before it compounds', weight: 4 });
  }

  outstanding.sort((a, b) => b.weight - a.weight);

  const daysRemaining = Math.max(1, pace.daysRemaining);
  const perDay = Math.ceil(pace.remainingUnits / daysRemaining);

  return {
    needed: pace.status === 'behind' || pace.status === 'slightly-behind',
    priority: outstanding.slice(0, 12).map(({ unitId, reason }) => ({ unitId, reason })),
    perDay,
    daysRemaining,
    summary:
      outstanding.length === 0
        ? 'Nothing outstanding — you are caught up.'
        : `${outstanding.length} outstanding unit${outstanding.length === 1 ? '' : 's'}. ` +
          `Finishing on time needs about ${perDay} unit${perDay === 1 ? '' : 's'} a day for the remaining ${daysRemaining} days. ` +
          'Prerequisites come first — they unblock everything downstream.',
  };
}
