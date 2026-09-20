import { describe, expect, it } from 'vitest';
import { answer } from '@/features/tutor/engine';
import { CONFIDENT_COVERAGE, resolveConcept } from '@/features/curriculum/search';
import type { TutorContext } from '@/features/tutor/engine';

const CTX: TutorContext = {
  completedUnitIds: [],
  weakUnitIds: [],
  missedConcepts: [],
  completedCount: 0,
  totalCount: 214,
};

/** The first thing the tutor says, which is where a refusal would appear. */
function opening(query: string): string {
  const first = answer(query, CTX).blocks[0]!;
  return 'body' in first ? String(first.body) : first.kind;
}

const confident = (q: string) => {
  const m = resolveConcept(q);
  return !!m && m.coverage >= CONFIDENT_COVERAGE && m.specific;
};

/**
 * The tutor must answer only from authored content. The failure mode that
 * matters is not silence, it is fluency: a search index that matches
 * substrings will happily return a real unit for "zzzqqq nonexistent concept
 * xyzzy", and the tutor would then explain that unit as though it had been
 * asked about it. These tests pin the gate that prevents it.
 */
describe('the tutor refuses to answer what it was not asked', () => {
  it.each([
    'zzzqqq nonexistent concept xyzzy',
    'asdfgh qwerty',
    'tell me about the thing',
    'how do i do an example',
    'what is the meaning of life',
  ])('does not commit to a unit for %j', (query) => {
    expect(confident(query)).toBe(false);
    expect(opening(query)).toMatch(/could not find|not certain which concept/i);
  });

  it('says plainly that it only answers from the curriculum', () => {
    expect(opening('asdfgh qwerty')).toMatch(/only answer from the 214 authored units/i);
  });
});

describe('the tutor still answers real questions', () => {
  it.each([
    'gradient descent',
    'what is overfitting',
    'pandas groupby',
    'ROC curve',
    'what is a p-value',
    'numpy broadcasting',
    'SQL join',
    'lasso',
    'docker',
    'cross validation',
    'explain gradient descent simply',
    // British/American spelling must not change the answer.
    'normalization',
    'regularisation',
  ])('resolves %j to a unit', (query) => {
    expect(confident(query)).toBe(true);
    expect(opening(query)).not.toMatch(/could not find|not certain which concept/i);
  });

  it('routes a question to the unit that is actually about it', () => {
    const reply = answer('what is overfitting', CTX);
    expect(reply.source?.title).toMatch(/overfitting/i);
  });

  it('gates on naming a concept, not on matching any substring', () => {
    // "concept" and "example" appear all over the curriculum prose; on their
    // own they name nothing, so they must not clear the gate.
    expect(confident('explain a concept')).toBe(false);
    expect(confident('give me an example of a method')).toBe(false);
  });
});
