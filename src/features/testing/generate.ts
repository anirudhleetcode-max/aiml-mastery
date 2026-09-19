import type { LearningUnit, QuizQuestion } from '@/types/curriculum';
import type { AssessmentKind, UnitProgress } from '@/types/progress';

export interface GeneratedTest {
  kind: AssessmentKind;
  title: string;
  description: string;
  unitIds: string[];
  questions: { question: QuizQuestion; unitId: string }[];
  /** Suggested time in minutes, ~45s per question rounded up. */
  suggestedMinutes: number;
}

/**
 * Deterministic shuffle, so a test can be regenerated identically from a seed
 * (useful for "redo this test" and for reproducible tests in CI).
 */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let s = seed >>> 0 || 1;
  const rand = () => {
    // xorshift32 — small, fast, good enough for question ordering.
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Builds the end-of-day assessment.
 *
 * Rule from the spec: *whatever* the learner studied today gets tested today,
 * even if that was a single subtopic. Questions come only from units already
 * studied — nothing is tested before it is taught.
 */
export function buildDailyTest(
  units: LearningUnit[],
  date: string,
  opts: { questionsPerUnit?: number; maxQuestions?: number; weakUnitIds?: Set<string> } = {},
): GeneratedTest {
  const perUnit = opts.questionsPerUnit ?? (units.length === 1 ? 10 : units.length === 2 ? 6 : 4);
  const max = opts.maxQuestions ?? 14;
  const seed = hashSeed(date + units.map((u) => u.id).join(''));

  const picked: { question: QuizQuestion; unitId: string }[] = [];

  for (const unit of units) {
    // Weak units get one extra question — the test should target what is shaky.
    const want = perUnit + (opts.weakUnitIds?.has(unit.id) ? 1 : 0);
    const pool = seededShuffle(unit.quiz, seed + hashSeed(unit.id));
    // Prefer a mix of types over a run of identical formats.
    const chosen = diversify(pool, want);
    for (const q of chosen) picked.push({ question: q, unitId: unit.id });
  }

  const questions = seededShuffle(picked, seed).slice(0, max);

  return {
    kind: 'daily-test',
    title: units.length === 1 ? `Daily test — ${units[0]!.title}` : `Daily test — ${units.length} units`,
    description:
      units.length === 1
        ? `Everything you studied today, on ${units[0]!.title}.`
        : `Drawn only from today's units: ${units.map((u) => u.title).join(', ')}.`,
    unitIds: units.map((u) => u.id),
    questions,
    suggestedMinutes: Math.max(5, Math.ceil((questions.length * 45) / 60)),
  };
}

export function buildUnitTest(unit: LearningUnit, attempt = 0): GeneratedTest {
  const seed = hashSeed(unit.id) + attempt * 7919;
  const questions = seededShuffle(unit.quiz, seed).map((question) => ({ question, unitId: unit.id }));
  return {
    kind: 'unit-test',
    title: `${unit.title} — unit test`,
    description: 'Every question is drawn from this unit. Explanations appear immediately after you answer.',
    unitIds: [unit.id],
    questions,
    suggestedMinutes: Math.max(4, Math.ceil((questions.length * 45) / 60)),
  };
}

export function buildQuickCheck(unit: LearningUnit): GeneratedTest {
  const seed = hashSeed(`quick-${unit.id}`);
  const questions = diversify(seededShuffle(unit.quiz, seed), 3).map((question) => ({ question, unitId: unit.id }));
  return {
    kind: 'quick-check',
    title: 'Quick check',
    description: 'Three questions to confirm the idea landed before you move on.',
    unitIds: [unit.id],
    questions,
    suggestedMinutes: 3,
  };
}

export function buildReviewTest(units: LearningUnit[], progress: Record<string, UnitProgress>): GeneratedTest {
  const seed = hashSeed(`review-${units.map((u) => u.id).join('')}`);
  const picked: { question: QuizQuestion; unitId: string }[] = [];
  for (const unit of units) {
    const weak = (progress[unit.id]?.bestScore ?? 0) < 0.85;
    const pool = seededShuffle(unit.quiz, seed + hashSeed(unit.id));
    for (const q of diversify(pool, weak ? 3 : 2)) picked.push({ question: q, unitId: unit.id });
  }
  return {
    kind: 'review',
    title: 'Spaced review',
    description: 'Concepts due for revisiting. Short, and worth doing before they fade.',
    unitIds: units.map((u) => u.id),
    questions: seededShuffle(picked, seed).slice(0, 12),
    suggestedMinutes: 8,
  };
}

export function buildDomainExam(units: LearningUnit[], domainName: string): GeneratedTest {
  const seed = hashSeed(`domain-${domainName}`);
  const picked: { question: QuizQuestion; unitId: string }[] = [];
  for (const unit of units) {
    for (const q of diversify(seededShuffle(unit.quiz, seed + hashSeed(unit.id)), 1)) {
      picked.push({ question: q, unitId: unit.id });
    }
  }
  return {
    kind: 'domain-exam',
    title: `${domainName} — domain exam`,
    description: `One question from every unit in ${domainName}. This is the checkpoint before moving on.`,
    unitIds: units.map((u) => u.id),
    questions: seededShuffle(picked, seed),
    suggestedMinutes: Math.max(10, Math.ceil((picked.length * 50) / 60)),
  };
}

/**
 * The final assessment: breadth across every domain, weighted toward the
 * heavier domains, and deliberately mixed in format.
 */
export function buildFinalAssessment(
  unitsByDomain: { domain: string; domainName: string; units: LearningUnit[] }[],
  questionsPerDomain = 5,
): GeneratedTest {
  const seed = hashSeed('final-mastery-assessment');
  const picked: { question: QuizQuestion; unitId: string }[] = [];

  for (const group of unitsByDomain) {
    const pool: { question: QuizQuestion; unitId: string }[] = [];
    for (const unit of group.units) {
      for (const q of unit.quiz) pool.push({ question: q, unitId: unit.id });
    }
    const shuffled = seededShuffle(pool, seed + hashSeed(group.domain));
    const want = Math.min(questionsPerDomain, shuffled.length);
    const chosen: typeof shuffled = [];
    const seenUnits = new Set<string>();
    // Spread across units within the domain before repeating any unit.
    for (const item of shuffled) {
      if (chosen.length >= want) break;
      if (seenUnits.has(item.unitId) && seenUnits.size < group.units.length) continue;
      seenUnits.add(item.unitId);
      chosen.push(item);
    }
    for (const item of shuffled) {
      if (chosen.length >= want) break;
      if (!chosen.includes(item)) chosen.push(item);
    }
    picked.push(...chosen);
  }

  return {
    kind: 'final-assessment',
    title: 'AI/ML Master Assessment',
    description:
      'Every domain, mixed formats, no hints. The report afterwards is broken down domain by domain rather than reduced to a single number.',
    unitIds: [...new Set(picked.map((p) => p.unitId))],
    questions: picked,
    suggestedMinutes: Math.ceil((picked.length * 60) / 60),
  };
}

/** Picks `n` questions preferring format variety over the raw shuffled order. */
function diversify(pool: QuizQuestion[], n: number): QuizQuestion[] {
  if (pool.length <= n) return [...pool];
  const out: QuizQuestion[] = [];
  const used = new Set<string>();
  const typesSeen = new Set<string>();

  for (const q of pool) {
    if (out.length >= n) break;
    if (typesSeen.has(q.type)) continue;
    out.push(q);
    used.add(q.id);
    typesSeen.add(q.type);
  }
  for (const q of pool) {
    if (out.length >= n) break;
    if (used.has(q.id)) continue;
    out.push(q);
    used.add(q.id);
  }
  return out;
}
