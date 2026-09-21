import { ALL_UNITS } from '@/data/curriculum';
import { stem } from './words';

/**
 * Which words the curriculum uses everywhere.
 *
 * A hand-written stop list catches "the" and "because" but not "program",
 * "directly" or "value" — words that are perfectly ordinary in this subject
 * and therefore useless as evidence that a learner understood something. The
 * curriculum can answer that question about itself: a word appearing in a
 * third of 214 units is common vocabulary, and a word concentrated in a few is
 * a term of art.
 *
 * That is document frequency, computed once per process over text the platform
 * already has. It costs one pass at first use and makes the difference between
 * "you did not mention Program" and "you did not mention bytecode".
 */

/**
 * Above this share of units, a word carries no information about this answer.
 *
 * Eight percent of 214 units is eighteen, which lands where it should: "value",
 * "data" and "program" are above it, "interpreter", "bytecode" and
 * "backpropagation" below. A term of art that does cross the line is almost
 * always in its unit's authored terminology, which bypasses this filter
 * entirely — so the cost of being slightly too aggressive here is low.
 */
const UBIQUITY_THRESHOLD = 0.08;

let CACHE: CurriculumFrequency | null = null;

/**
 * The prose a unit is made of, excluding code — a variable name that happens
 * to be `data` should not make "data" look common.
 */
function unitProse(unit: (typeof ALL_UNITS)[number]): string {
  return [
    unit.title,
    unit.simpleExplanation,
    unit.whyItExists,
    unit.formalDefinition,
    ...unit.learningObjectives,
    ...unit.interviewQuestions.map((q) => `${q.question} ${q.answer}`),
    ...unit.commonMistakes.map((m) => `${m.mistake} ${m.why} ${m.fix}`),
  ].join(' ');
}

export interface CurriculumFrequency {
  /** Stemmed word to the number of units that use it. */
  df: ReadonlyMap<string, number>;
  /** How many units were counted, so a share can be computed. */
  documents: number;
  /** Words at or above the ubiquity threshold. */
  common: ReadonlySet<string>;
  /**
   * Every word appearing in any unit's authored terminology.
   *
   * This is the discriminator that document frequency turned out not to be.
   * "tight" appears in eleven units and "eigenvector" in two, so rarity cannot
   * tell them apart — but a human wrote down that eigenvector is a term and
   * tight is not, and that judgement is already in the curriculum. Rarity then
   * only has to order the terms among themselves.
   */
  terms: ReadonlySet<string>;
}

export function curriculumFrequency(): CurriculumFrequency {
  if (CACHE) return CACHE;

  const df = new Map<string, number>();
  for (const unit of ALL_UNITS) {
    const seen = new Set<string>();
    for (const raw of unitProse(unit).split(/[^A-Za-z0-9_'-]+/)) {
      const key = stem(raw);
      if (key.length < 3) continue;
      seen.add(key);
    }
    for (const key of seen) df.set(key, (df.get(key) ?? 0) + 1);
  }

  const cutoff = Math.max(3, Math.ceil(ALL_UNITS.length * UBIQUITY_THRESHOLD));
  const common = new Set([...df.entries()].filter(([, n]) => n >= cutoff).map(([w]) => w));

  const terms = new Set<string>();
  for (const unit of ALL_UNITS) {
    for (const term of unit.terminology) {
      for (const raw of term.term.split(/[^A-Za-z0-9_]+/)) {
        const key = stem(raw);
        if (key.length > 2) terms.add(key);
      }
    }
  }

  CACHE = { df, documents: ALL_UNITS.length, common, terms };
  return CACHE;
}

/** Convenience for the common case of only wanting the ubiquity set. */
export function commonCurriculumWords(): ReadonlySet<string> {
  return curriculumFrequency().common;
}

