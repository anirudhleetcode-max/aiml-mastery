import { describe, expect, it } from 'vitest';
import { evaluateTeaching } from '@/features/teaching/evaluate';
import type { LearningUnit } from '@/types/curriculum';

const unit = {
  id: 'PY-002',
  title: 'Variables and Names',
  terminology: [
    { term: 'Variable', definition: 'A name bound to an object.' },
    { term: 'Assignment', definition: 'The = operation.' },
    { term: 'Object', definition: 'Every value in Python.' },
  ],
  teachingPrompt: {
    prompt: 'Teach me what a variable is.',
    mustCover: [
      'A variable is a name you give to a value so you can use it later',
      'The name is a label attached to the value, not a container holding it',
      'Two names can be attached to the same value',
      'Changing the value itself differs from moving a label to a new value',
    ],
    bonusSignals: ['uses a concrete analogy such as labels or nicknames'],
    sampleExplanation: 'x'.repeat(220),
  },
} as unknown as LearningUnit;

describe('teach-back evaluation', () => {
  it('refuses to score something too short to evaluate', () => {
    const result = evaluateTeaching(unit, 'A variable is a thing.');
    expect(result.score).toBe(0);
    expect(result.missing).toEqual(unit.teachingPrompt.mustCover);
    expect(result.improvements.length).toBeGreaterThan(0);
  });

  it('rewards an explanation that covers the required points', () => {
    const good =
      'A variable is a name you give to a value so you can use it later. The name is a label attached to the ' +
      'value rather than a container holding it, which matters because two names can be attached to the same ' +
      'value. For example, if you write b = a with a list, you have not made a second list — you have added a ' +
      'second label. So changing the value itself is different from moving a label to a new value, because ' +
      'changing it is visible through every name pointing at it.';
    const result = evaluateTeaching(unit, good);
    expect(result.score).toBeGreaterThan(0.7);
    expect(result.covered.length).toBeGreaterThanOrEqual(3);
    expect(result.dimensions.examples).toBeGreaterThan(0);
    expect(result.dimensions.depth).toBeGreaterThan(0);
  });

  it('does not reward length without coverage', () => {
    const waffle =
      'Variables are really important and you use them all the time in programming, and honestly they are just ' +
      'basically a thing that you need to know about because everyone uses them and they are very useful. '.repeat(3);
    const result = evaluateTeaching(unit, waffle);
    expect(result.score).toBeLessThan(0.5);
    expect(result.missing.length).toBeGreaterThan(1);
  });

  it('names every missing point so feedback is actionable', () => {
    // Long enough to be evaluated properly, but deliberately covering only the
    // first of the four required points.
    const partial =
      'A variable is a name you give to a value so you can use it later in your program. ' +
      'You write the name on the left and the thing you want to remember on the right, and ' +
      'from then on the name stands in for it wherever you use it.';
    const result = evaluateTeaching(unit, partial);
    expect(result.covered.length + result.missing.length).toBe(unit.teachingPrompt.mustCover.length);
    expect(result.improvements.join(' ')).toContain(result.missing[0]!);
  });

  it('penalises very long sentences and filler', () => {
    const rambling =
      'So basically a variable is like literally just a thing that you know obviously you use to store stuff and ' +
      'things in your program which is basically what everyone does when they are writing code that needs to ' +
      'remember something for later on in the program which is most programs really if you think about it.';
    const result = evaluateTeaching(unit, rambling);
    expect(result.dimensions.clarity).toBeLessThan(0.8);
  });

  it('keeps every score within range', () => {
    for (const text of ['', 'short', 'a '.repeat(600)]) {
      const r = evaluateTeaching(unit, text);
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(1);
      for (const value of Object.values(r.dimensions)) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });
});
