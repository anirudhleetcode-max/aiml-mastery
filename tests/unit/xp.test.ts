import { describe, expect, it } from 'vitest';
import { LEVELS, levelFor } from '@/features/xp/levels';
import { applyXP, awardsForAssessment, updateDiscipline, XP_VALUES } from '@/features/xp/rules';

describe('levels', () => {
  it('starts everyone at level 1', () => {
    expect(levelFor(0).current.level).toBe(1);
    expect(levelFor(0).progress).toBe(0);
  });

  it('is monotonic in XP', () => {
    let last = 0;
    for (let xp = 0; xp <= 80_000; xp += 500) {
      const level = levelFor(xp).current.level;
      expect(level).toBeGreaterThanOrEqual(last);
      last = level;
    }
  });

  it('lands exactly on a level boundary', () => {
    for (const level of LEVELS) {
      expect(levelFor(level.minXP).current.level).toBe(level.level);
    }
  });

  it('caps at the final level and reports no next level', () => {
    const top = LEVELS[LEVELS.length - 1]!;
    const state = levelFor(top.minXP + 999_999);
    expect(state.current.level).toBe(top.level);
    expect(state.next).toBeNull();
    expect(state.progress).toBe(1);
  });

  it('treats negative or non-finite XP as zero rather than throwing', () => {
    expect(levelFor(-500).current.level).toBe(1);
    expect(levelFor(Number.NaN).current.level).toBe(1);
  });
});

describe('XP balance', () => {
  it('never goes negative, however large the penalty', () => {
    expect(applyXP(50, XP_VALUES['missed-test'])).toBe(0);
    expect(applyXP(0, XP_VALUES['missed-test-overdue'])).toBe(0);
    expect(applyXP(10, -10_000)).toBe(0);
  });

  it('adds normally when positive', () => {
    expect(applyXP(100, 25)).toBe(125);
  });
});

describe('assessment awards', () => {
  it('gives a perfect-score bonus but not both bonuses', () => {
    const awards = awardsForAssessment('daily-test', 1, ['PY-001']);
    const reasons = awards.map((a) => a.reason);
    expect(reasons).toContain('perfect-bonus');
    expect(reasons).not.toContain('high-score-bonus');
  });

  it('gives the high-score bonus between 90% and 100%', () => {
    const awards = awardsForAssessment('daily-test', 0.92, ['PY-001']);
    expect(awards.map((a) => a.reason)).toContain('high-score-bonus');
  });

  it('gives only partial credit below 50%, and never a bonus', () => {
    const awards = awardsForAssessment('daily-test', 0.3, ['PY-001']);
    expect(awards).toHaveLength(1);
    expect(awards[0]!.amount).toBeLessThan(XP_VALUES['daily-test']);
    expect(awards[0]!.amount).toBeGreaterThan(0);
  });
});

describe('discipline', () => {
  it('recovers faster than it falls and never bottoms out from one miss', () => {
    expect(updateDiscipline(80, 'missed')).toBe(74);
    expect(updateDiscipline(80, 'completed')).toBe(84);
    expect(updateDiscipline(12, 'overdue')).toBe(10);
  });

  it('stays inside 10–100', () => {
    let score = 100;
    for (let i = 0; i < 50; i++) score = updateDiscipline(score, 'overdue');
    expect(score).toBe(10);
    for (let i = 0; i < 100; i++) score = updateDiscipline(score, 'completed');
    expect(score).toBe(100);
  });
});
