import { describe, expect, it } from 'vitest';
import {
  BANDS,
  buildSession,
  computeReadiness,
  interviewBank,
  LEVEL_ORDER,
  readinessVerdict,
  selectQuestions,
} from '@/features/interview/engine';
import type { InterviewAttemptState, LearnerState, UnitProgress } from '@/types/progress';

type State = Pick<LearnerState, 'units' | 'interviewAttempts'>;

function unit(overrides: Partial<UnitProgress> = {}): UnitProgress {
  return {
    unitId: 'PY-001',
    mastery: 'UNDERSTOOD',
    bestScore: 0,
    lastScore: 0,
    attempts: 0,
    practiceCompleted: 0,
    challengeCompleted: false,
    teachingScore: null,
    lessonCompletedAt: '2026-09-21T10:00:00.000Z',
    lastStudiedAt: null,
    timeSpentSeconds: 0,
    nextReviewAt: null,
    reviewStep: 0,
    weak: false,
    skipped: false,
    bookmarked: false,
    flaggedDifficult: false,
    ...overrides,
  };
}

const attempt = (
  unitId: string,
  questionIndex: number,
  confidence: InterviewAttemptState['confidence'],
): InterviewAttemptState => ({
  unitId,
  questionIndex,
  confidence,
  seconds: 30,
  attempts: 1,
  lastAttemptAt: '2026-09-21T10:00:00.000Z',
});

const EMPTY: State = { units: {}, interviewAttempts: [] };

describe('the interview bank', () => {
  it('exposes every authored question exactly once', () => {
    const bank = interviewBank();
    expect(bank.length).toBe(660);
    const keys = new Set(bank.map((i) => `${i.unitId}#${i.questionIndex}`));
    expect(keys.size).toBe(bank.length);
  });

  it('gives every question a resolvable unit and domain', () => {
    for (const item of interviewBank()) {
      expect(item.unitTitle).not.toBe('');
      expect(item.unitSlug).not.toBe('');
      expect(item.domainName).not.toBe(item.domain);
    }
  });

  it('uses only levels the band map covers', () => {
    const covered = new Set(Object.values(BANDS).flat());
    for (const item of interviewBank()) {
      expect(covered.has(item.question.level)).toBe(true);
      expect(LEVEL_ORDER).toContain(item.question.level);
    }
  });
});

describe('filtering', () => {
  it('narrows by band', () => {
    const all = selectQuestions(EMPTY);
    const beginner = selectQuestions(EMPTY, { band: 'beginner' });
    expect(beginner.length).toBeGreaterThan(0);
    expect(beginner.length).toBeLessThan(all.length);
    expect(beginner.every((i) => BANDS.beginner.includes(i.question.level))).toBe(true);
  });

  it('narrows by domain', () => {
    const ml = selectQuestions(EMPTY, { domain: 'ML' });
    expect(ml.length).toBeGreaterThan(0);
    expect(ml.every((i) => i.domain === 'ML')).toBe(true);
  });

  it('never tests what has not been taught when asked not to', () => {
    const state: State = { units: { 'PY-001': unit() }, interviewAttempts: [] };
    const taught = selectQuestions(state, { taughtOnly: true });
    expect(taught.length).toBeGreaterThan(0);
    expect(taught.every((i) => i.unitId === 'PY-001')).toBe(true);
  });

  it('drops confidently answered questions from a weak-only pool', () => {
    const bank = interviewBank();
    const first = bank[0]!;
    const state: State = {
      units: {},
      interviewAttempts: [attempt(first.unitId, first.questionIndex, 'confident')],
    };
    const weak = selectQuestions(state, { weakOnly: true });
    expect(weak.some((i) => i.unitId === first.unitId && i.questionIndex === first.questionIndex)).toBe(false);
  });
});

describe('session building', () => {
  it('puts the questions you got lost on first', () => {
    const bank = interviewBank();
    const lost = bank[400]!;
    const shaky = bank[401]!;
    const state: State = {
      units: {},
      interviewAttempts: [
        attempt(lost.unitId, lost.questionIndex, 'lost'),
        attempt(shaky.unitId, shaky.questionIndex, 'shaky'),
      ],
    };
    const session = buildSession(state, {}, 10);
    expect(session[0]!.unitId).toBe(lost.unitId);
    expect(session[0]!.questionIndex).toBe(lost.questionIndex);
    expect(session[1]!.unitId).toBe(shaky.unitId);
  });

  it('ranks confidently answered questions last', () => {
    const bank = interviewBank();
    const done = bank[0]!;
    const state: State = {
      units: {},
      interviewAttempts: [attempt(done.unitId, done.questionIndex, 'confident')],
    };
    const session = buildSession(state, {}, 5);
    expect(session.some((i) => i.unitId === done.unitId && i.questionIndex === done.questionIndex)).toBe(false);
  });

  it('respects the requested size and clamps it', () => {
    expect(buildSession(EMPTY, {}, 7)).toHaveLength(7);
    expect(buildSession(EMPTY, {}, 0)).toHaveLength(1);
    expect(buildSession(EMPTY, {}, 9999)).toHaveLength(50);
  });

  it('warms up: within a rank band, easier levels come first', () => {
    const session = buildSession(EMPTY, {}, 20);
    const levels = session.map((i) => LEVEL_ORDER.indexOf(i.question.level));
    expect(levels).toEqual([...levels].sort((a, b) => a - b));
  });
});

describe('readiness', () => {
  it('is zero before anything is attempted, and says so', () => {
    const r = computeReadiness(EMPTY);
    expect(r.attempted).toBe(0);
    expect(r.score).toBe(0);
    expect(r.taughtScore).toBe(0);
    expect(readinessVerdict(r).label).toBe('Not started');
  });

  it('counts only confident answers toward the score', () => {
    const bank = interviewBank();
    const state: State = {
      units: {},
      interviewAttempts: [
        attempt(bank[0]!.unitId, bank[0]!.questionIndex, 'confident'),
        attempt(bank[1]!.unitId, bank[1]!.questionIndex, 'shaky'),
        attempt(bank[2]!.unitId, bank[2]!.questionIndex, 'lost'),
      ],
    };
    const r = computeReadiness(state);
    expect(r.attempted).toBe(3);
    expect(r.confident).toBe(1);
    expect(r.shaky).toBe(1);
    expect(r.lost).toBe(1);
    expect(r.score).toBeCloseTo(1 / 660, 6);
  });

  it('measures taught material separately from the whole bank', () => {
    const bank = interviewBank();
    const target = bank.find((i) => i.unitId === 'PY-001')!;
    const state: State = {
      units: { 'PY-001': unit() },
      interviewAttempts: [attempt(target.unitId, target.questionIndex, 'confident')],
    };
    const r = computeReadiness(state);
    expect(r.taughtTotal).toBeGreaterThan(0);
    expect(r.taughtTotal).toBeLessThan(r.total);
    // Readiness on covered material is far higher than across the whole bank.
    expect(r.taughtScore).toBeGreaterThan(r.score);
  });

  it('surfaces the units behind the misses, worst first', () => {
    const bank = interviewBank();
    const worst = bank.filter((i) => i.unitId === bank[0]!.unitId);
    const other = bank.find((i) => i.unitId !== bank[0]!.unitId)!;
    const state: State = {
      units: {},
      interviewAttempts: [
        ...worst.map((i) => attempt(i.unitId, i.questionIndex, 'lost')),
        attempt(other.unitId, other.questionIndex, 'shaky'),
      ],
    };
    const r = computeReadiness(state);
    expect(r.weakUnits[0]!.unitId).toBe(bank[0]!.unitId);
    expect(r.weakUnits[0]!.misses).toBe(worst.length);
    expect(r.weakUnits[0]!.title).not.toBe(r.weakUnits[0]!.unitId);
  });

  it('totals per domain to the bank size', () => {
    const r = computeReadiness(EMPTY);
    expect(r.byDomain.reduce((s, d) => s + d.total, 0)).toBe(r.total);
    expect(r.byLevel.reduce((s, l) => s + l.total, 0)).toBe(r.total);
  });

  it('never claims readiness from unattempted questions', () => {
    const r = computeReadiness(EMPTY);
    for (const d of r.byDomain) expect(d.readiness).toBe(0);
  });
});
