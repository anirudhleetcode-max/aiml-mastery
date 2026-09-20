import { describe, expect, it } from 'vitest';
import { gradeExplanation, gradeQuestion, grade, scoreTest } from '@/features/testing/scoring';
import type { QuizQuestion } from '@/types/curriculum';

const mcq: QuizQuestion = {
  id: 'T-001-q1',
  type: 'mcq',
  prompt: 'Pick B',
  options: ['A', 'B', 'C'],
  answerIndex: 1,
  explanation: 'B is correct because it is B.',
};

describe('grading', () => {
  it('grades multiple choice', () => {
    expect(gradeQuestion(mcq, { kind: 'choice', index: 1 }).correct).toBe(true);
    expect(gradeQuestion(mcq, { kind: 'choice', index: 0 }).correct).toBe(false);
  });

  it('treats a missing answer as wrong but still reports the correct one', () => {
    const g = gradeQuestion(mcq, null);
    expect(g.correct).toBe(false);
    expect(g.credit).toBe(0);
    expect(g.correctAnswerText).toBe('B');
    expect(g.yourAnswerText).toBe('No answer');
  });

  it('gives partial credit on multi-select and penalises wrong picks', () => {
    const q: QuizQuestion = {
      id: 'T-001-q2',
      type: 'multi',
      prompt: 'Pick A and B',
      options: ['A', 'B', 'C', 'D'],
      answerIndices: [0, 1],
      explanation: 'A and B only.',
    };
    expect(gradeQuestion(q, { kind: 'choices', indices: [0, 1] }).credit).toBe(1);
    expect(gradeQuestion(q, { kind: 'choices', indices: [0] }).credit).toBe(0.5);
    expect(gradeQuestion(q, { kind: 'choices', indices: [0, 1, 2] }).credit).toBe(0.5);
    expect(gradeQuestion(q, { kind: 'choices', indices: [2, 3] }).credit).toBe(0);
    expect(gradeQuestion(q, { kind: 'choices', indices: [0, 1] }).correct).toBe(true);
    expect(gradeQuestion(q, { kind: 'choices', indices: [0] }).correct).toBe(false);
  });

  it('accepts any listed answer for fill-in, ignoring case and punctuation', () => {
    const q: QuizQuestion = {
      id: 'T-001-q3',
      type: 'fill',
      prompt: 'Comment character?',
      answers: ['#', 'hash'],
      explanation: 'A hash starts a comment.',
    };
    expect(gradeQuestion(q, { kind: 'text', value: ' Hash ' }).correct).toBe(true);
    expect(gradeQuestion(q, { kind: 'text', value: '#' }).correct).toBe(true);
    expect(gradeQuestion(q, { kind: 'text', value: '//' }).correct).toBe(false);
  });

  it('applies a tolerance to numeric answers', () => {
    const q: QuizQuestion = {
      id: 'T-001-q4',
      type: 'numeric',
      prompt: 'What is 1/3?',
      answer: 0.3333,
      tolerance: 0.001,
      explanation: 'One third.',
    };
    expect(gradeQuestion(q, { kind: 'number', value: 0.3334 }).correct).toBe(true);
    expect(gradeQuestion(q, { kind: 'number', value: 0.4 }).correct).toBe(false);
    expect(gradeQuestion(q, { kind: 'number', value: Number.NaN }).correct).toBe(false);
  });

  it('gives ordering partial credit for correct adjacent pairs', () => {
    const q: QuizQuestion = {
      id: 'T-001-q5',
      type: 'order',
      prompt: 'Order them',
      items: ['one', 'two', 'three', 'four'],
      explanation: 'Numerical order.',
    };
    expect(gradeQuestion(q, { kind: 'order', order: [0, 1, 2, 3] }).credit).toBe(1);
    expect(gradeQuestion(q, { kind: 'order', order: [3, 2, 1, 0] }).credit).toBe(0);
    const partial = gradeQuestion(q, { kind: 'order', order: [0, 1, 3, 2] });
    expect(partial.credit).toBeGreaterThan(0);
    expect(partial.correct).toBe(false);
  });

  it('grades matching proportionally', () => {
    const q: QuizQuestion = {
      id: 'T-001-q6',
      type: 'match',
      prompt: 'Match them',
      pairs: [
        { left: 'a', right: '1' },
        { left: 'b', right: '2' },
      ],
      explanation: 'Letters to numbers.',
    };
    expect(gradeQuestion(q, { kind: 'match', pairs: { a: '1', b: '2' } }).credit).toBe(1);
    expect(gradeQuestion(q, { kind: 'match', pairs: { a: '1', b: '1' } }).credit).toBe(0.5);
  });

  it('grades true/false and code-output questions', () => {
    const tf: QuizQuestion = { id: 'T-q7', type: 'truefalse', prompt: 'True?', answer: true, explanation: 'Because yes.' };
    expect(gradeQuestion(tf, { kind: 'boolean', value: true }).correct).toBe(true);
    expect(gradeQuestion(tf, { kind: 'boolean', value: false }).correct).toBe(false);

    const co: QuizQuestion = {
      id: 'T-q8',
      type: 'code-output',
      prompt: 'Output?',
      code: 'print(1+1)',
      language: 'python',
      options: ['1', '2', '11'],
      answerIndex: 1,
      explanation: 'Addition, not concatenation.',
    };
    expect(gradeQuestion(co, { kind: 'choice', index: 1 }).correct).toBe(true);
  });
});

describe('explanation grading', () => {
  const rubric = [
    'Mentions that a variable is a name bound to an object',
    'Mentions that two names can refer to the same object',
    'Mentions that mutation is visible through both names',
  ];

  it('scores zero for an empty or trivial answer', () => {
    expect(gradeExplanation('', rubric).score).toBe(0);
    expect(gradeExplanation('dunno', rubric).score).toBe(0);
  });

  it('credits the points actually covered, and names the misses', () => {
    const result = gradeExplanation(
      'A variable is a name bound to an object in memory, and two names can refer to the same object.',
      rubric,
    );
    expect(result.score).toBeGreaterThan(0.5);
    expect(result.covered.length + result.missing.length).toBe(rubric.length);
  });

  it('does not reward length alone', () => {
    const waffle = 'This is a long answer about something entirely unrelated. '.repeat(12);
    expect(gradeExplanation(waffle, rubric).score).toBe(0);
  });
});

describe('test scoring', () => {
  it('sums partial credit rather than counting only whole-right answers', () => {
    const result = scoreTest([
      { correct: true, credit: 1, correctAnswerText: '', yourAnswerText: '' },
      { correct: false, credit: 0.5, correctAnswerText: '', yourAnswerText: '' },
      { correct: false, credit: 0, correctAnswerText: '', yourAnswerText: '' },
    ]);
    expect(result.correct).toBe(1);
    expect(result.total).toBe(3);
    expect(result.score).toBeCloseTo(0.5, 5);
  });

  it('handles an empty test without dividing by zero', () => {
    expect(scoreTest([]).score).toBe(0);
  });

  it('maps scores to sensible grades', () => {
    expect(grade(1).letter).toBe('A+');
    expect(grade(0.86).letter).toBe('A');
    expect(grade(0.71).letter).toBe('B');
    expect(grade(0.2).tone).toBe('danger');
  });
});
