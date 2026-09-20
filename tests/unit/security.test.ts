import { describe, expect, it } from 'vitest';
import { eventSchema } from '@/lib/sync/events';

/**
 * The write protocol's security surface.
 *
 * Every learner action arrives as an event, so the schema is the boundary
 * that decides what the server will even consider. These cases are the ones
 * a hostile client would actually try: out-of-range indices to reach rows
 * that do not exist, invented enum values to slip past a switch, oversized
 * strings, and derived state the client is not allowed to assert.
 *
 * The complementary runtime properties — cross-user isolation, XP that cannot
 * be farmed by replay, and a lab that cannot be completed without its steps —
 * are exercised against a real database in sync.test.ts.
 */

const valid = (event: unknown) => eventSchema.safeParse(event).success;

describe('the event schema rejects malformed input', () => {
  it('bounds every index against a plausible maximum', () => {
    expect(valid({ type: 'flashcard-reviewed', unitId: 'PY-001', cardIndex: 0, grade: 'known' })).toBe(true);
    expect(valid({ type: 'flashcard-reviewed', unitId: 'PY-001', cardIndex: 99999, grade: 'known' })).toBe(false);
    expect(valid({ type: 'flashcard-reviewed', unitId: 'PY-001', cardIndex: -1, grade: 'known' })).toBe(false);
    expect(valid({ type: 'flashcard-reviewed', unitId: 'PY-001', cardIndex: 1.5, grade: 'known' })).toBe(false);
  });

  it('accepts only the enum values the UI can produce', () => {
    expect(valid({ type: 'flashcard-reviewed', unitId: 'PY-001', cardIndex: 0, grade: 'perfect' })).toBe(false);
    expect(
      valid({ type: 'interview-attempted', unitId: 'PY-001', questionIndex: 0, confidence: 'expert', seconds: 0 }),
    ).toBe(false);
    expect(
      valid({ type: 'interview-attempted', unitId: 'PY-001', questionIndex: 0, confidence: 'confident', seconds: 0 }),
    ).toBe(true);
  });

  it('constrains unit ids to the curriculum id shape', () => {
    expect(valid({ type: 'lesson-completed', unitId: 'PY-001', seconds: 10 })).toBe(true);
    expect(valid({ type: 'lesson-completed', unitId: 'DROP TABLE users', seconds: 10 })).toBe(false);
    expect(valid({ type: 'lesson-completed', unitId: '../../etc/passwd', seconds: 10 })).toBe(false);
    expect(valid({ type: 'lesson-completed', unitId: "PY-001'; --", seconds: 10 })).toBe(false);
  });

  it('caps string lengths so a payload cannot be used to exhaust storage', () => {
    expect(valid({ type: 'lab-step-completed', labId: 'x'.repeat(500), stepIndex: 0 })).toBe(false);
    expect(valid({ type: 'note-saved', unitId: 'PY-001', body: 'x'.repeat(100_000) })).toBe(false);
  });

  it('caps a reported duration at something a human could have spent', () => {
    expect(valid({ type: 'lab-completed', labId: 'big-o-growth', seconds: 600 })).toBe(true);
    expect(valid({ type: 'lab-completed', labId: 'big-o-growth', seconds: 99_999_999 })).toBe(false);
  });

  it('has no field through which a client could assert a score or an XP total', () => {
    // The protocol's central property: the client says what happened, and the
    // server derives everything else. A schema that accepted a score would
    // make every other guarantee decorative.
    const source = eventSchema.toString();
    for (const forbidden of ['score', 'xp', 'mastery', 'correct']) {
      expect(source.toLowerCase()).not.toContain(`${forbidden}:`);
    }
    expect(
      valid({ type: 'assessment-submitted', id: 'a1', kind: 'daily-test', unitIds: ['PY-001'], score: 1, answers: [] }),
    ).toBe(false);
  });

  it('rejects an unknown event type outright', () => {
    expect(valid({ type: 'grant-xp', amount: 50_000 })).toBe(false);
    expect(valid({ type: 'unlock-achievement', id: 'everything' })).toBe(false);
  });
});
