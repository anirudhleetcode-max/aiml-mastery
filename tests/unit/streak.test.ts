import { describe, expect, it } from 'vitest';
import { effectiveStreak, emptyStreak, isStreakAtRisk, nextMilestone, recordActivity } from '@/features/streak/streak';

describe('streaks', () => {
  it('starts at one on the first day of activity', () => {
    const { streak } = recordActivity(emptyStreak(), '2026-09-20');
    expect(streak.current).toBe(1);
    expect(streak.longest).toBe(1);
  });

  it('increments on consecutive days', () => {
    let s = recordActivity(emptyStreak(), '2026-09-20').streak;
    s = recordActivity(s, '2026-09-21').streak;
    s = recordActivity(s, '2026-09-22').streak;
    expect(s.current).toBe(3);
  });

  it('is idempotent within a day', () => {
    let s = recordActivity(emptyStreak(), '2026-09-20').streak;
    s = recordActivity(s, '2026-09-20').streak;
    expect(s.current).toBe(1);
  });

  it('absorbs a single missed day with a freeze', () => {
    let s = recordActivity(emptyStreak(), '2026-09-20').streak;
    s = recordActivity(s, '2026-09-21').streak;
    const update = recordActivity(s, '2026-09-23');
    expect(update.freezeUsed).toBe(true);
    expect(update.streak.current).toBe(3);
    expect(update.streak.freezesRemaining).toBe(1);
  });

  it('breaks after a long gap, but never reduces the longest streak', () => {
    let s = emptyStreak();
    for (let d = 20; d <= 27; d++) s = recordActivity(s, `2026-09-${d}`).streak;
    expect(s.current).toBe(8);
    const after = recordActivity(s, '2026-10-15').streak;
    expect(after.current).toBe(1);
    expect(after.longest).toBe(8);
  });

  it('reports milestones exactly once, as they are crossed', () => {
    let s = emptyStreak();
    const reached: number[] = [];
    for (let i = 0; i < 40; i++) {
      const date = new Date(2026, 8, 20 + i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const update = recordActivity(s, key);
      s = update.streak;
      reached.push(...update.milestonesReached);
    }
    expect(reached).toEqual([7, 14, 30]);
    expect(new Set(reached).size).toBe(reached.length);
  });

  it('shows a stale streak as broken without mutating stored state', () => {
    let s = recordActivity(emptyStreak(), '2026-09-20').streak;
    s = { ...s, freezesRemaining: 0 };
    expect(effectiveStreak(s, '2026-09-21')).toBe(1);
    expect(effectiveStreak(s, '2026-09-25')).toBe(0);
    expect(s.current).toBe(1);
  });

  it('flags risk the day after the last activity', () => {
    const s = recordActivity(emptyStreak(), '2026-09-20').streak;
    expect(isStreakAtRisk(s, '2026-09-20')).toBe(false);
    expect(isStreakAtRisk(s, '2026-09-21')).toBe(true);
  });

  it('knows the next milestone', () => {
    expect(nextMilestone(0)).toBe(7);
    expect(nextMilestone(7)).toBe(14);
    expect(nextMilestone(100)).toBeNull();
  });

  it('tracks the test streak separately from the study streak', () => {
    let s = recordActivity(emptyStreak(), '2026-09-20', { tookTest: true }).streak;
    s = recordActivity(s, '2026-09-21').streak;
    expect(s.current).toBe(2);
    expect(s.testStreak).toBe(1);
  });
});
