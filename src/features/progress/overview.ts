import { ALL_UNITS, UNIT_BY_ID, allUnitMeta, type UnitMeta } from '@/data/curriculum';
import { DOMAINS, type Domain } from '@/data/domains';
import { bucketFor, computeMastery, isWeak, requirementsFor } from '@/features/progress/mastery';
import {
  buildRecoveryPlan, buildSchedule, computePace, COURSE_END, COURSE_START,
  type PaceReport, type RecoveryPlan, type Schedule,
} from '@/features/scheduling/planner';
import { isDueForReview } from '@/features/revision/spaced';
import { effectiveStreak } from '@/features/streak/streak';
import { levelFor, type LevelState } from '@/features/xp/levels';
import { addDays, dateKey, daysBetween } from '@/lib/format';
import type { FullState } from '@/lib/sync/state';
import type { DomainId, LearningUnit } from '@/types/curriculum';
import {
  emptyUnitProgress, type DayActivity, type MasteryLevel, type ProgressBucket, type UnitProgress,
} from '@/types/progress';

export interface DomainStat {
  domain: Domain;
  total: number;
  completed: number;
  mastered: number;
  inProgress: number;
  /** 0–1 completion. */
  progress: number;
  /** 0–1 average best score across attempted units. */
  averageScore: number;
  estimatedRemainingMinutes: number;
  weakCount: number;
}

export interface Overview {
  today: string;
  totals: {
    total: number;
    completed: number;
    mastered: number;
    teacher: number;
    inProgress: number;
    remaining: number;
    buckets: Record<ProgressBucket, number>;
    masteryCounts: Record<MasteryLevel, number>;
    averageScore: number;
    totalStudySeconds: number;
    testsTaken: number;
  };
  level: LevelState;
  streak: number;
  domains: DomainStat[];
  schedule: Schedule;
  pace: PaceReport;
  recovery: RecoveryPlan;
  todayPlan: { unit: LearningUnit; progress: UnitProgress; done: boolean }[];
  todayTestDone: boolean;
  dueReviews: { unit: LearningUnit; progress: UnitProgress }[];
  weakUnits: { unit: LearningUnit; progress: UnitProgress }[];
  continueWith: LearningUnit | null;
  nextUp: LearningUnit | null;
  activitySeries: { date: string; units: number; xp: number; minutes: number; score: number | null }[];
  completedUnitIds: Set<string>;
  meta: UnitMeta[];
}

export function progressFor(state: FullState, unitId: string): UnitProgress {
  return state.units[unitId] ?? emptyUnitProgress(unitId);
}

/**
 * Everything the dashboard, analytics and today's mission need, computed once.
 *
 * Runs on the server: it touches the full curriculum, which never ships to the
 * browser.
 */
export function buildOverview(state: FullState, todayOverride?: string): Overview {
  const today = todayOverride ?? dateKey();
  const meta = allUnitMeta();

  /* ---- per-unit roll-up ---- */
  const buckets: Record<ProgressBucket, number> = { mastered: 0, learning: 0, review: 0, 'not-started': 0 };
  const masteryCounts: Record<MasteryLevel, number> = {
    NOT_STARTED: 0, INTRODUCED: 0, UNDERSTOOD: 0, PRACTICED: 0, PROFICIENT: 0, MASTERED: 0, TEACHER: 0,
  };

  const completedUnitIds = new Set<string>();
  const weakUnits: { unit: LearningUnit; progress: UnitProgress }[] = [];
  const dueReviews: { unit: LearningUnit; progress: UnitProgress }[] = [];

  let scoreSum = 0;
  let scoreCount = 0;
  let mastered = 0;
  let teacher = 0;
  let inProgress = 0;

  for (const unit of ALL_UNITS) {
    const p = progressFor(state, unit.id);
    const req = requirementsFor(unit);
    const level = computeMastery(p, req);

    masteryCounts[level] += 1;
    buckets[bucketFor(p, req, today)] += 1;

    if (p.lessonCompletedAt) completedUnitIds.add(unit.id);
    if (level === 'MASTERED' || level === 'TEACHER') mastered += 1;
    if (level === 'TEACHER') teacher += 1;
    if (level !== 'NOT_STARTED' && level !== 'MASTERED' && level !== 'TEACHER') inProgress += 1;

    if (p.attempts > 0) {
      scoreSum += p.bestScore;
      scoreCount += 1;
    }
    if (isWeak(p, req)) weakUnits.push({ unit, progress: p });
    if (isDueForReview(p, today)) dueReviews.push({ unit, progress: p });
  }

  /* ---- per-domain ---- */
  const domains: DomainStat[] = DOMAINS.map((domain) => {
    const units = ALL_UNITS.filter((u) => u.domain === domain.id);
    let completed = 0;
    let domMastered = 0;
    let domInProgress = 0;
    let sum = 0;
    let count = 0;
    let remainingMinutes = 0;
    let weakCount = 0;

    for (const u of units) {
      const p = progressFor(state, u.id);
      const req = requirementsFor(u);
      const level = computeMastery(p, req);
      if (p.lessonCompletedAt) completed += 1;
      else remainingMinutes += u.estimatedMinutes;
      if (level === 'MASTERED' || level === 'TEACHER') domMastered += 1;
      else if (level !== 'NOT_STARTED') domInProgress += 1;
      if (p.attempts > 0) {
        sum += p.bestScore;
        count += 1;
      }
      if (isWeak(p, req)) weakCount += 1;
    }

    return {
      domain,
      total: units.length,
      completed,
      mastered: domMastered,
      inProgress: domInProgress,
      progress: units.length ? completed / units.length : 0,
      averageScore: count ? sum / count : 0,
      estimatedRemainingMinutes: remainingMinutes,
      weakCount,
    };
  });

  /* ---- schedule & pace ---- */
  const schedule = buildSchedule(meta, {
    startDate: state.profile.startDate || COURSE_START,
    endDate: state.profile.endDate || COURSE_END,
    dailyMinutes: state.profile.studyBudget,
    pausedDates: state.pausedDates,
  });

  const pace = computePace(schedule, completedUnitIds, today);
  const recovery = buildRecoveryPlan(schedule, meta, completedUnitIds, new Set(weakUnits.map((w) => w.unit.id)), pace);

  const plan = schedule.byDate.get(today);
  const todayPlan = (plan?.items ?? []).flatMap((item) => {
    const unit = UNIT_BY_ID.get(item.unitId);
    if (!unit) return [];
    const p = progressFor(state, unit.id);
    return [{ unit, progress: p, done: Boolean(p.lessonCompletedAt) }];
  });

  const todayTestDone = state.assessments.some(
    (a) => a.date === today && (a.kind === 'daily-test' || a.kind === 'unit-test'),
  );

  /* ---- what to do next ---- */
  const continueWith =
    todayPlan.find((t) => !t.done)?.unit ??
    ALL_UNITS.find((u) => {
      const p = progressFor(state, u.id);
      return p.lessonCompletedAt && computeMastery(p, requirementsFor(u)) === 'INTRODUCED';
    }) ??
    null;

  const nextUp = ALL_UNITS.find((u) => !state.units[u.id]?.lessonCompletedAt) ?? null;

  /* ---- activity series for charts ---- */
  const seriesStart = addDays(today, -59);
  const activitySeries: Overview['activitySeries'] = [];
  const span = Math.max(0, daysBetween(seriesStart, today));
  for (let i = 0; i <= span; i++) {
    const date = addDays(seriesStart, i);
    const a: DayActivity | undefined = state.activity[date];
    activitySeries.push({
      date,
      units: a?.unitsCompleted ?? 0,
      xp: a?.xp ?? 0,
      minutes: Math.round((a?.studySeconds ?? 0) / 60),
      score: a?.testTaken ? (a.testScore ?? 0) : null,
    });
  }

  const totalStudySeconds = Object.values(state.activity).reduce((acc, a) => acc + a.studySeconds, 0);

  return {
    today,
    totals: {
      total: ALL_UNITS.length,
      completed: completedUnitIds.size,
      mastered,
      teacher,
      inProgress,
      remaining: ALL_UNITS.length - completedUnitIds.size,
      buckets,
      masteryCounts,
      averageScore: scoreCount ? scoreSum / scoreCount : 0,
      totalStudySeconds,
      testsTaken: state.assessments.length,
    },
    level: levelFor(state.xp),
    streak: effectiveStreak(state.streak, today),
    domains,
    schedule,
    pace,
    recovery,
    todayPlan,
    todayTestDone,
    dueReviews: dueReviews.slice(0, 12),
    weakUnits: weakUnits.slice(0, 12),
    continueWith,
    nextUp,
    activitySeries,
    completedUnitIds,
    meta,
  };
}

/** Domains where every unit has been completed. */
export function completedDomains(overview: Overview): Set<DomainId> {
  return new Set(overview.domains.filter((d) => d.total > 0 && d.completed === d.total).map((d) => d.domain.id));
}
