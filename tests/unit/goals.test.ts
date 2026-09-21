import { describe, expect, it } from 'vitest';
import { computeGoals } from '@/features/progress/goals';
import type { DayActivity } from '@/types/progress';

/**
 * Daily and weekly goals.
 *
 * The property worth protecting is that a goal cannot be met by lowering it.
 * Every target here is derived from the plan and the deadline, so these tests
 * mostly check that the arithmetic follows the evidence rather than flattering
 * it — including the cases where flattery would be easy: an empty day, a rest
 * day with nothing planned, and a week with a single heroic session in it.
 */

const day = (date: string, over: Partial<DayActivity> = {}): DayActivity => ({
  date,
  unitsCompleted: 0,
  xp: 0,
  studySeconds: 0,
  testScore: null,
  testTaken: false,
  teachBacks: 0,
  ...over,
});

const TODAY = '2026-09-20';
const inputs = { today: TODAY, plannedMinutes: 60, plannedUnits: 2, requiredPace: 1.6 };

function state(days: DayActivity[]) {
  return { activity: Object.fromEntries(days.map((d) => [d.date, d])) };
}

describe('daily goals', () => {
  it('starts at zero on a day with no activity', () => {
    const g = computeGoals(state([]), inputs);
    expect(g.dailyUnits.current).toBe(0);
    expect(g.dailyUnits.progress).toBe(0);
    expect(g.dailyMinutes.met).toBe(false);
    expect(g.dayComplete).toBe(false);
  });

  it('counts minutes from recorded study time, not from intent', () => {
    const g = computeGoals(state([day(TODAY, { studySeconds: 1800 })]), inputs);
    expect(g.dailyMinutes.current).toBe(30);
    expect(g.dailyMinutes.target).toBe(60);
    expect(g.dailyMinutes.progress).toBeCloseTo(0.5, 5);
    expect(g.dailyMinutes.met).toBe(false);
  });

  it('is complete only when both lessons and minutes are done', () => {
    const lessonsOnly = computeGoals(state([day(TODAY, { unitsCompleted: 2, studySeconds: 60 })]), inputs);
    expect(lessonsOnly.dailyUnits.met).toBe(true);
    expect(lessonsOnly.dayComplete).toBe(false);

    const both = computeGoals(state([day(TODAY, { unitsCompleted: 2, studySeconds: 3600 })]), inputs);
    expect(both.dayComplete).toBe(true);
  });

  it('clamps progress at 1 rather than rewarding overshoot', () => {
    const g = computeGoals(state([day(TODAY, { unitsCompleted: 9, studySeconds: 36_000 })]), inputs);
    expect(g.dailyUnits.progress).toBe(1);
    expect(g.dailyMinutes.progress).toBe(1);
    expect(g.dailyUnits.current).toBe(9);
  });

  it('treats a rest day as complete rather than permanently unmet', () => {
    const rest = { ...inputs, plannedMinutes: 0, plannedUnits: 0 };
    const g = computeGoals(state([day(TODAY, { unitsCompleted: 1, studySeconds: 600 })]), rest);
    expect(g.dayComplete).toBe(true);
  });

  it('never divides by a zero target', () => {
    const g = computeGoals(state([]), { ...inputs, plannedMinutes: 0, plannedUnits: 0, requiredPace: 0 });
    for (const goal of [g.dailyUnits, g.dailyMinutes, g.weeklyUnits, g.weeklyActiveDays]) {
      expect(Number.isFinite(goal.progress)).toBe(true);
      expect(goal.target).toBeGreaterThan(0);
    }
  });
});

describe('weekly goals', () => {
  it('asks for seven days of the pace the deadline requires', () => {
    const g = computeGoals(state([]), inputs);
    // 1.6/day × 7, not a round number chosen to look achievable.
    expect(g.weeklyUnits.target).toBeCloseTo(11.2, 5);
  });

  it('counts the last seven days and ignores the eighth', () => {
    const days = [
      day('2026-09-20', { unitsCompleted: 1 }),
      day('2026-09-16', { unitsCompleted: 2 }),
      day('2026-09-14', { unitsCompleted: 4 }), // exactly seven days back
      day('2026-09-13', { unitsCompleted: 99 }), // outside the window
    ];
    const g = computeGoals(state(days), inputs);
    expect(g.weeklyUnits.current).toBe(7);
  });

  it('counts a day as active on study time, a finished unit, or a test', () => {
    const days = [
      day('2026-09-20', { studySeconds: 60 }),
      day('2026-09-19', { unitsCompleted: 1 }),
      day('2026-09-18', { testTaken: true }),
      day('2026-09-17'),
    ];
    const g = computeGoals(state(days), inputs);
    expect(g.weeklyActiveDays.current).toBe(3);
    expect(g.weeklyActiveDays.target).toBe(5);
  });

  it('cannot be satisfied by one heroic day when the target is a habit', () => {
    const g = computeGoals(state([day(TODAY, { unitsCompleted: 40, studySeconds: 40_000 })]), inputs);
    expect(g.weeklyUnits.met).toBe(true);
    // ...but five days of showing up is a different claim, and is not met.
    expect(g.weeklyActiveDays.current).toBe(1);
    expect(g.weeklyActiveDays.met).toBe(false);
  });
});

describe('goals follow the plan', () => {
  it('moves when the plan moves', () => {
    const light = computeGoals(state([day(TODAY, { unitsCompleted: 1, studySeconds: 1800 })]), {
      ...inputs,
      plannedUnits: 1,
      plannedMinutes: 30,
    });
    const heavy = computeGoals(state([day(TODAY, { unitsCompleted: 1, studySeconds: 1800 })]), {
      ...inputs,
      plannedUnits: 4,
      plannedMinutes: 120,
    });
    expect(light.dayComplete).toBe(true);
    expect(heavy.dayComplete).toBe(false);
  });

  it('tightens the weekly target when the deadline demands more', () => {
    const relaxed = computeGoals(state([]), { ...inputs, requiredPace: 1 });
    const urgent = computeGoals(state([]), { ...inputs, requiredPace: 3 });
    expect(urgent.weeklyUnits.target).toBeGreaterThan(relaxed.weeklyUnits.target);
  });
});
