import type { Term } from '@/types/curriculum';
import type { QuestionKind } from './classify';
import { stem, stemAll } from './words';

/**
 * Grading that needs no model.
 *
 * This runs first and always, and on most questions it is most of the answer.
 * The curriculum already states what a good answer contains — each unit
 * carries authored `terminology`, and the reference answer names the concepts
 * by their proper names — so "did they mention the things that matter" is a
 * measurement, not a guess.
 *
 * What it deliberately does not claim: that coverage is understanding. A
 * learner can list every term and still be wrong about how they relate, which
 * is exactly the gap the optional AI pass exists to close. So the numbers here
 * are reported as coverage and depth rather than as a verdict, and the summary
 * language stays descriptive.
 */

/** Words too common to carry meaning, so they never become expected concepts. */
const EMPTY: ReadonlySet<string> = new Set<string>();

const STOP = new Set(
  `a an the and or but if then than that this these those with without within into onto from for to of on in at by as is are was were be been being it its it's you your we our they their he she them us i me my
  do does did done doing have has had having can could should would may might must will shall not no nor only just also very more most less least much many few
  what which who whom whose when where why how all any both each other some such same so too own new old first second next last one two three
  use used uses using make makes made get gets got give gives given take takes taken see sees seen say says said know knows known think thinks thought
  example examples case cases thing things way ways time times part parts kind kinds sort sorts number numbers set sets value values result results
  because while during before after above below between through over under again further once here there`
    .split(/\s+/)
    .filter(Boolean),
);


function contentTokens(text: string): Set<string> {
  return new Set(stemAll(text).filter((w) => !STOP.has(w)));
}

export interface ExpectedConcept {
  /** How the concept is written for a human. */
  label: string;
  /** Normalised tokens that count as having mentioned it. */
  keys: string[];
  /** Authored terminology outranks a term merely salient in the answer. */
  source: 'terminology' | 'reference';
}

/**
 * Works out what a strong answer would contain.
 *
 * Authored terminology comes first and is trusted: a unit that defines
 * "vanishing gradient" means it. Salient phrases from the reference answer
 * fill in the rest — multi-word technical phrases before single words, since
 * "learning rate" is a concept and "rate" is not.
 */
export interface ConceptOptions {
  limit?: number;
  /**
   * How many curriculum units use each stemmed word. Supply
   * `curriculumFrequency()`. Omitted, only the built-in stop list applies and
   * single words fall back to ranking by how often the reference repeats them.
   */
  frequency?: {
    df: ReadonlyMap<string, number>;
    documents: number;
    common: ReadonlySet<string>;
    terms: ReadonlySet<string>;
  };
  /**
   * The unit's own framing — title, objectives, definitions, terminology.
   *
   * This is the sharpest of the three filters. A concept the reference answer
   * leans on is almost always named somewhere in the unit that teaches it,
   * while the incidental prose of that one answer is not: for the unit on
   * compiled versus interpreted languages, "compiled", "bytecode" and
   * "CPython" all appear in its framing and "everyday", "ahead" and "tight"
   * do not.
   */
  unitText?: string;
}

export function expectedConcepts(
  referenceAnswer: string,
  terminology: Term[] = [],
  options: ConceptOptions = {},
): ExpectedConcept[] {
  const limit = options.limit ?? 8;
  const common = options.frequency?.common ?? EMPTY;
  const terms = options.frequency?.terms;
  const df = options.frequency?.df;
  const unitWords = options.unitText ? new Set(stemAll(options.unitText)) : null;
  const out: ExpectedConcept[] = [];
  const claimed = new Set<string>();
  const referenceLower = referenceAnswer.toLowerCase();

  for (const term of terminology) {
    const label = term.term.trim();
    if (!label) continue;
    // Only terms the reference answer actually relies on. A unit's full
    // glossary is broader than any one question.
    if (!referenceLower.includes(label.toLowerCase())) continue;
    const keys = stemAll(label).filter((w) => !STOP.has(w));
    if (keys.length === 0 || keys.some((k) => claimed.has(k))) continue;
    keys.forEach((k) => claimed.add(k));
    out.push({ label, keys, source: 'terminology' });
  }

  // Backtick spans and Capitalised Multi-Word Phrases are the reference
  // answer's own way of flagging that something is a name.
  const phrases = [
    ...referenceAnswer.matchAll(/`([^`\n]{2,40})`/g),
    ...referenceAnswer.matchAll(/\b([A-Z][a-z]+(?: [A-Z][a-z]+)+)\b/g),
  ].map((m) => m[1]);

  for (const phrase of phrases) {
    if (out.length >= limit) break;
    const keys = stemAll(phrase).filter((w) => !STOP.has(w));
    if (keys.length === 0 || keys.some((k) => claimed.has(k))) continue;
    keys.forEach((k) => claimed.add(k));
    out.push({ label: phrase, keys, source: 'reference' });
  }

  // Then single words from the reference — but ranked by how *rare* they are
  // across the curriculum, not by how often this one answer repeats them.
  // Repetition picks "executed" and "ahead"; rarity picks "bytecode" and
  // "CPython", which is what a learner actually needs to be told they missed.
  const counts = new Map<string, number>();
  const display = new Map<string, string>();
  for (const raw of referenceAnswer.split(/[^A-Za-z0-9_'-]+/)) {
    const key = stem(raw);
    if (key.length < 4 || STOP.has(key) || claimed.has(key) || common.has(key)) continue;
    // Adverbs are never the concept.
    if (raw.toLowerCase().endsWith('ly')) continue;
    // The word has to be attested as a concept somewhere: in this unit's own
    // framing, in some unit's glossary, or by looking like a name. Without
    // this, "tight" and "everyday" join the list beside "bytecode", and a
    // learner is told they failed to mention "ahead".
    if (
      (unitWords || terms) &&
      !unitWords?.has(key) &&
      !terms?.has(key) &&
      !looksLikeAName(raw)
    ) {
      continue;
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
    if (!display.has(key)) display.set(key, raw);
  }

  const ranked = [...counts.entries()].sort((a, b) => {
    if (df) {
      // A word the corpus has never seen is not evidence of rarity, it is
      // evidence of nothing — so it sorts last rather than first.
      const rarity = (df.get(a[0]) ?? Number.MAX_SAFE_INTEGER) - (df.get(b[0]) ?? Number.MAX_SAFE_INTEGER);
      if (rarity !== 0) return rarity;
    }
    return b[1] - a[1] || a[0].localeCompare(b[0]);
  });

  for (const [key] of ranked) {
    if (out.length >= limit) break;
    claimed.add(key);
    out.push({ label: display.get(key) ?? key, keys: [key], source: 'reference' });
  }

  return out.slice(0, limit);
}

export interface DeterministicGrade {
  /** Concepts from the expected set that the answer mentions. */
  covered: string[];
  /** Concepts it does not. */
  missing: string[];
  /** Covered over expected, 0–1. */
  coverage: number;
  /** Words in the learner's answer. */
  words: number;
  /**
   * Length relative to what this kind of question needs, 0–1. Not a proxy for
   * quality — it only catches an answer too short to have said anything.
   */
  depth: number;
  /** Kind-specific evidence: a number where a number was asked for, and so on. */
  signals: string[];
  /** 0–100, from coverage and depth only. Never presented as a final verdict. */
  score: number;
  /** True when the answer is too thin for any grading to be meaningful. */
  tooShort: boolean;
}

/** Roughly how many words a competent answer runs to, per kind. */
const TARGET_WORDS: Record<QuestionKind, number> = {
  conceptual: 60,
  coding: 70,
  mathematical: 60,
  'system-design': 120,
  behavioral: 110,
  'ml-theory': 80,
  'sql-data': 50,
  debugging: 70,
  explanation: 70,
};

const MIN_WORDS = 8;

/**
 * Identifiers the curriculum never glossed but that are plainly names:
 * CPython, NumPy, k-means, L2, ReLU. An internal capital, a digit or an
 * underscore is what distinguishes them from ordinary prose.
 */
function looksLikeAName(raw: string): boolean {
  return /[a-z][A-Z]|[0-9_]|^[A-Z]{2,}$/.test(raw);
}

export function gradeDeterministically(
  answer: string,
  expected: ExpectedConcept[],
  kind: QuestionKind,
): DeterministicGrade {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const present = contentTokens(answer);
  const rawTokens = new Set(stemAll(answer));

  const covered: string[] = [];
  const missing: string[] = [];
  for (const concept of expected) {
    // A multi-word concept counts as covered when every one of its words is
    // present, so "gradient" alone does not claim "gradient clipping".
    const hit = concept.keys.every((k) => present.has(k) || rawTokens.has(k));
    (hit ? covered : missing).push(concept.label);
  }

  const coverage = expected.length === 0 ? 0 : covered.length / expected.length;
  const target = TARGET_WORDS[kind];
  const depth = Math.max(0, Math.min(1, words / target));

  const signals: string[] = [];
  if (/```|\bdef \b|\breturn\b|[[\]{}()]=?|=>/.test(answer)) signals.push('contains code');
  if (/\b\d+(?:\.\d+)?\b/.test(answer)) signals.push('contains a number');
  if (/\b(?:for example|e\.g\.|such as|for instance)\b/i.test(answer)) signals.push('gives an example');
  if (/\b(?:because|since|therefore|so that|which means|the reason)\b/i.test(answer)) signals.push('gives a reason');
  if (/\b(?:trade-?off|however|but|on the other hand|whereas|unless)\b/i.test(answer)) signals.push('weighs a trade-off');

  const tooShort = words < MIN_WORDS;

  // Coverage dominates; depth can only move the score within a band. An answer
  // naming nothing cannot reach a pass by being long.
  const score = tooShort ? 0 : Math.round(Math.min(100, coverage * 80 + depth * 20));

  return { covered, missing, coverage, words, depth, signals, score, tooShort };
}
