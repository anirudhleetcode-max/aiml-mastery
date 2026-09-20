import { describe, expect, it } from 'vitest';
import { computeMastery, bucketFor, isAtLeast, isWeak, nextMasteryStep } from '@/features/progress/mastery';
import { DEFAULT_MASTERY } from '@/types/curriculum';
import { emptyUnitProgress } from '@/types/progress';

const req = DEFAULT_MASTERY;
const base = () => emptyUnitProgress('PY-001');

describe('mastery is evidence-based', () => {
  it('is NOT_STARTED with no evidence at all', () => {
    expect(computeMastery(base(), req)).toBe('NOT_STARTED');
  });

  it('reaches only INTRODUCED from reading the lesson', () => {
    const p = { ...base(), lessonCompletedAt: '2026-09-20T10:00:00Z' };
    expect(computeMastery(p, req)).toBe('INTRODUCED');
  });

  it('will not grant UNDERSTOOD below the score bar', () => {
    const p = { ...base(), lessonCompletedAt: 'x', bestScore: 0.69, attempts: 1 };
    expect(computeMastery(p, req)).toBe('INTRODUCED');
  });

  it('grants UNDERSTOOD at exactly the bar', () => {
    const p = { ...base(), lessonCompletedAt: 'x', bestScore: 0.7, attempts: 1 };
    expect(computeMastery(p, req)).toBe('UNDERSTOOD');
  });

  it('requires practice before PRACTICED', () => {
    const p = { ...base(), lessonCompletedAt: 'x', bestScore: 0.9, attempts: 1, practiceCompleted: 1 };
    expect(computeMastery(p, req)).toBe('UNDERSTOOD');
  });

  it('requires durability — a single high score is only PROFICIENT', () => {
    const p = {
      ...base(),
      lessonCompletedAt: 'x',
      bestScore: 0.9,
      attempts: 1,
      practiceCompleted: 2,
    };
    expect(computeMastery(p, req)).toBe('PROFICIENT');
  });

  it('grants MASTERED on a second attempt or a solved challenge', () => {
    const twice = { ...base(), lessonCompletedAt: 'x', bestScore: 0.9, attempts: 2, practiceCompleted: 2 };
    expect(computeMastery(twice, req)).toBe('MASTERED');

    const challenge = { ...base(), lessonCompletedAt: 'x', bestScore: 0.9, attempts: 1, practiceCompleted: 2, challengeCompleted: true };
    expect(computeMastery(challenge, req)).toBe('MASTERED');
  });

  it('reserves TEACHER for a strong teach-back', () => {
    const p = {
      ...base(),
      lessonCompletedAt: 'x',
      bestScore: 0.9,
      attempts: 2,
      practiceCompleted: 2,
      teachingScore: 0.79,
    };
    expect(computeMastery(p, req)).toBe('MASTERED');
    expect(computeMastery({ ...p, teachingScore: 0.8 }, req)).toBe('TEACHER');
  });

  it('cannot be reached by clicking around: no score means no progress past INTRODUCED', () => {
    const clicky = {
      ...base(),
      lessonCompletedAt: 'x',
      practiceCompleted: 99,
      challengeCompleted: true,
      teachingScore: 1,
      bookmarked: true,
    };
    expect(computeMastery(clicky, req)).toBe('INTRODUCED');
  });
});

describe('mastery helpers', () => {
  it('orders levels correctly', () => {
    expect(isAtLeast('MASTERED', 'UNDERSTOOD')).toBe(true);
    expect(isAtLeast('UNDERSTOOD', 'MASTERED')).toBe(false);
    expect(isAtLeast('TEACHER', 'TEACHER')).toBe(true);
  });

  it('always names a concrete next step until TEACHER', () => {
    const p = { ...base(), lessonCompletedAt: 'x' };
    expect(nextMasteryStep(p, req)?.target).toBe('UNDERSTOOD');
    const top = { ...p, bestScore: 1, attempts: 2, practiceCompleted: 2, teachingScore: 1 };
    expect(nextMasteryStep(top, req)).toBeNull();
  });

  it('buckets a due review ahead of its mastery level', () => {
    const p = { ...base(), lessonCompletedAt: 'x', bestScore: 0.95, attempts: 2, practiceCompleted: 2, nextReviewAt: '2026-09-20' };
    expect(bucketFor(p, req, '2026-09-21')).toBe('review');
    expect(bucketFor(p, req, '2026-09-19')).toBe('mastered');
  });

  it('flags a unit weak on a low recent score or repeated failure', () => {
    expect(isWeak({ ...base(), attempts: 1, lastScore: 0.5 }, req)).toBe(true);
    expect(isWeak({ ...base(), attempts: 3, lastScore: 0.8, bestScore: 0.8 }, req)).toBe(true);
    expect(isWeak({ ...base(), attempts: 1, lastScore: 0.95, bestScore: 0.95 }, req)).toBe(false);
    expect(isWeak(base(), req)).toBe(false);
  });
});
