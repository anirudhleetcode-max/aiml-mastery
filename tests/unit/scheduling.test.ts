import { describe, expect, it } from 'vitest';
import { buildSchedule, computePace, buildRecoveryPlan, COURSE_END, COURSE_START } from '@/features/scheduling/planner';
import { scheduleReview, isDueForReview, REVIEW_STEPS, reteachStrategy } from '@/features/revision/spaced';
import { daysBetween } from '@/lib/format';
import { emptyUnitProgress } from '@/types/progress';
import type { UnitMeta } from '@/data/curriculum';

function fakeUnits(n: number, minutes = 30): UnitMeta[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `PY-${String(i + 1).padStart(3, '0')}`,
    domain: 'PY' as const,
    module: 'First Steps',
    topic: 'topic',
    title: `Unit ${i + 1}`,
    slug: `unit-${i + 1}`,
    difficulty: 2,
    estimatedMinutes: minutes,
    prerequisites: i === 0 ? [] : [`PY-${String(i).padStart(3, '0')}`],
    leadsTo: [],
    objectives: 3,
    quizCount: 6,
    tags: [],
  }));
}

describe('the course window', () => {
  it('is the 103 days the product promises', () => {
    expect(daysBetween(COURSE_START, COURSE_END) + 1).toBe(103);
  });
});

describe('scheduling', () => {
  it('places every unit exactly once, in curriculum order', () => {
    const units = fakeUnits(214);
    const schedule = buildSchedule(units, {
      startDate: COURSE_START,
      endDate: COURSE_END,
      dailyMinutes: 60,
    });

    const placed = schedule.days.flatMap((d) => d.items.map((i) => i.unitId));
    expect(placed).toHaveLength(214);
    expect(new Set(placed).size).toBe(214);
    expect(placed).toEqual(units.map((u) => u.id));
  });

  it('never schedules a unit before its prerequisite — the property that actually matters', () => {
    const units = fakeUnits(214, 45);
    const schedule = buildSchedule(units, {
      startDate: COURSE_START,
      endDate: COURSE_END,
      dailyMinutes: 30,
    });

    const dayOf = new Map<string, number>();
    schedule.days.forEach((day, dayIndex) => {
      day.items.forEach((item, slot) => dayOf.set(item.unitId, dayIndex * 1000 + slot));
    });

    for (const unit of units) {
      for (const prereq of unit.prerequisites) {
        expect(dayOf.get(prereq)).toBeLessThan(dayOf.get(unit.id)!);
      }
    }
  });

  it('is not a naive division: heavier units take more of a day', () => {
    const light = buildSchedule(fakeUnits(60, 15), { startDate: COURSE_START, endDate: COURSE_END, dailyMinutes: 60 });
    const heavy = buildSchedule(fakeUnits(60, 90), { startDate: COURSE_START, endDate: COURSE_END, dailyMinutes: 60 });
    expect(light.studyDays).toBeLessThan(heavy.studyDays);
  });

  it('never stalls when a single unit exceeds the daily budget', () => {
    const schedule = buildSchedule(fakeUnits(20, 90), {
      startDate: COURSE_START,
      endDate: COURSE_END,
      dailyMinutes: 30,
    });
    const placed = schedule.days.flatMap((d) => d.items);
    expect(placed).toHaveLength(20);
  });

  it('gives weekends a lighter load', () => {
    const schedule = buildSchedule(fakeUnits(214, 30), {
      startDate: COURSE_START,
      endDate: COURSE_END,
      dailyMinutes: 120,
    });
    const weekday = schedule.days.filter((d) => ![0, 6].includes(new Date(d.date).getDay()) && d.items.length > 0);
    const weekend = schedule.days.filter((d) => [0, 6].includes(new Date(d.date).getDay()) && d.items.length > 0);
    const avg = (xs: typeof weekday) => xs.reduce((a, d) => a + d.totalMinutes, 0) / Math.max(1, xs.length);
    expect(avg(weekend)).toBeLessThan(avg(weekday));
  });

  it('skips paused dates entirely', () => {
    const paused = ['2026-09-21', '2026-09-22'];
    const schedule = buildSchedule(fakeUnits(30), {
      startDate: COURSE_START,
      endDate: COURSE_END,
      dailyMinutes: 60,
      pausedDates: paused,
    });
    for (const p of paused) expect(schedule.byDate.has(p)).toBe(false);
  });

  it('flags compression rather than silently dropping units', () => {
    const schedule = buildSchedule(fakeUnits(214, 90), {
      startDate: COURSE_START,
      endDate: COURSE_END,
      dailyMinutes: 30,
    });
    expect(schedule.compressed).toBe(true);
    expect(schedule.days.flatMap((d) => d.items)).toHaveLength(214);
  });

  it('requires a test on every day that has units', () => {
    const schedule = buildSchedule(fakeUnits(50), { startDate: COURSE_START, endDate: COURSE_END, dailyMinutes: 60 });
    for (const day of schedule.days) {
      expect(day.testRequired).toBe(day.items.length > 0);
    }
  });
});

describe('pace', () => {
  const units = fakeUnits(103, 30);
  const schedule = buildSchedule(units, { startDate: COURSE_START, endDate: COURSE_END, dailyMinutes: 60 });

  it('reports not-started before the course begins', () => {
    expect(computePace(schedule, new Set(), '2026-09-19').status).toBe('not-started');
  });

  it('reports behind when nothing has been done after several weeks', () => {
    const pace = computePace(schedule, new Set(), '2026-10-20');
    expect(pace.status).toBe('behind');
    expect(pace.delta).toBeLessThan(0);
    expect(pace.requiredPace).toBeGreaterThan(0);
  });

  it('reports finished when everything is complete', () => {
    const all = new Set(units.map((u) => u.id));
    expect(computePace(schedule, all, '2026-10-20').status).toBe('finished');
  });

  it('never produces a negative remaining count', () => {
    const extra = new Set([...units.map((u) => u.id), 'PY-999']);
    expect(computePace(schedule, extra, '2026-10-20').remainingUnits).toBeGreaterThanOrEqual(0);
  });
});

describe('recovery planning', () => {
  it('prioritises units that unblock the most downstream work', () => {
    const units = fakeUnits(20);
    units[0] = { ...units[0]!, leadsTo: ['PY-002', 'PY-003', 'PY-004'] };
    const schedule = buildSchedule(units, { startDate: COURSE_START, endDate: COURSE_END, dailyMinutes: 60 });
    const pace = computePace(schedule, new Set(), '2026-10-20');
    const plan = buildRecoveryPlan(schedule, units, new Set(), new Set(), pace);

    expect(plan.needed).toBe(true);
    expect(plan.priority[0]?.unitId).toBe('PY-001');
    expect(plan.priority[0]?.reason).toMatch(/unlocks/i);
    expect(plan.perDay).toBeGreaterThan(0);
  });

  it('reports nothing outstanding when caught up', () => {
    const units = fakeUnits(10);
    const schedule = buildSchedule(units, { startDate: COURSE_START, endDate: COURSE_END, dailyMinutes: 60 });
    const done = new Set(units.map((u) => u.id));
    const pace = computePace(schedule, done, '2026-10-20');
    const plan = buildRecoveryPlan(schedule, units, done, new Set(), pace);
    expect(plan.priority).toHaveLength(0);
  });
});

describe('spaced repetition', () => {
  const p = emptyUnitProgress('PY-001');

  it('advances the interval on a strong score', () => {
    const result = scheduleReview(0.95, p, 2, '2026-09-20');
    expect(result.reviewStep).toBe(1);
    expect(result.nextReviewAt > '2026-09-20').toBe(true);
  });

  it('drops back to the shortest interval on a weak score', () => {
    const advanced = { ...p, reviewStep: 3 };
    const result = scheduleReview(0.3, advanced, 2, '2026-09-20');
    expect(result.reviewStep).toBe(0);
  });

  it('holds the interval steady on a borderline score', () => {
    const at = { ...p, reviewStep: 2 };
    expect(scheduleReview(0.6, at, 2, '2026-09-20').reviewStep).toBe(2);
  });

  it('holds harder concepts back a rung even on a good score', () => {
    expect(scheduleReview(0.75, p, 5, '2026-09-20').reviewStep).toBe(0);
    expect(scheduleReview(0.75, p, 2, '2026-09-20').reviewStep).toBe(1);
  });

  it('asks for a re-teach after repeated failure rather than another test', () => {
    const struggling = { ...p, attempts: 3 };
    expect(scheduleReview(0.2, struggling, 3, '2026-09-20').needsReteach).toBe(true);
    expect(scheduleReview(0.2, p, 3, '2026-09-20').needsReteach).toBe(false);
  });

  it('never schedules beyond the top of the ladder', () => {
    let progress = { ...p };
    for (let i = 0; i < 10; i++) {
      const r = scheduleReview(1, progress, 1, '2026-09-20');
      progress = { ...progress, reviewStep: r.reviewStep };
    }
    expect(progress.reviewStep).toBe(REVIEW_STEPS.length - 1);
  });

  it('knows when a review is due', () => {
    expect(isDueForReview({ ...p, nextReviewAt: '2026-09-20' }, '2026-09-21')).toBe(true);
    expect(isDueForReview({ ...p, nextReviewAt: '2026-09-22' }, '2026-09-21')).toBe(false);
    expect(isDueForReview(p, '2026-09-21')).toBe(false);
  });

  it('escalates the re-teach strategy with repeated attempts', () => {
    expect(reteachStrategy(1).steps.length).toBeLessThan(reteachStrategy(5).steps.length);
  });
});
