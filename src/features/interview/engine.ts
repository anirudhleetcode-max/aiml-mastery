import { ALL_UNITS, UNIT_BY_ID } from '@/data/curriculum';
import { DOMAIN_BY_ID, DOMAINS } from '@/data/domains';
import type { DomainId, InterviewLevel, InterviewQuestion, LearningUnit } from '@/types/curriculum';
import type { InterviewAttemptState, InterviewConfidence, LearnerState } from '@/types/progress';

/**
 * Interview preparation, drawn from the curriculum's own 660 questions.
 *
 * The questions already existed — every unit carries two to four, written for
 * a named seniority — but they were only ever rendered inside the unit that
 * happened to teach them. That makes them a footnote to a lesson rather than
 * a thing you can practise, so this module treats the whole set as one bank:
 * addressable, filterable, and answerable in a session built around whatever
 * the learner is weakest at.
 *
 * Confidence rather than correctness is the recorded signal. These are prose
 * answers with no machine-checkable form, so the honest measurement is the
 * learner's own verdict after comparing their answer with the model one — the
 * same standard teach-back uses. Readiness is then computed from that evidence
 * rather than asserted, and a question nobody has attempted counts as nothing.
 */

export interface InterviewItem {
  /** Stable address: the unit plus the question's index within it. */
  unitId: string;
  questionIndex: number;
  question: InterviewQuestion;
  unitTitle: string;
  unitSlug: string;
  domain: DomainId;
  domainName: string;
  /** True when the learner has finished the unit that teaches this. */
  taught: boolean;
}

/** Ordered easiest to hardest, which is also the order a session presents them. */
export const LEVEL_ORDER: InterviewLevel[] = [
  'beginner',
  'internship',
  'intermediate',
  'ml-engineer',
  'advanced',
  'ai-engineer',
];

export const LEVEL_LABELS: Record<InterviewLevel, string> = {
  beginner: 'Beginner',
  internship: 'Internship',
  intermediate: 'Intermediate',
  'ml-engineer': 'ML engineer',
  advanced: 'Advanced',
  'ai-engineer': 'AI engineer',
};

/**
 * The three broad bands the spec asks for, mapped onto the six seniorities the
 * curriculum actually uses. Keeping both means a learner can filter coarsely
 * without the underlying data being flattened.
 */
export const BANDS = {
  beginner: ['beginner', 'internship'] as InterviewLevel[],
  intermediate: ['intermediate', 'ml-engineer'] as InterviewLevel[],
  advanced: ['advanced', 'ai-engineer'] as InterviewLevel[],
};

export type Band = keyof typeof BANDS;

let BANK: InterviewItem[] | null = null;

/** The whole question bank, built once per process. */
export function interviewBank(): InterviewItem[] {
  BANK ??= ALL_UNITS.flatMap((unit) =>
    unit.interviewQuestions.map((question, questionIndex) => ({
      unitId: unit.id,
      questionIndex,
      question,
      unitTitle: unit.title,
      unitSlug: unit.slug,
      domain: unit.domain,
      domainName: DOMAIN_BY_ID[unit.domain]?.name ?? unit.domain,
      taught: false,
    })),
  );
  return BANK;
}

const keyOf = (unitId: string, index: number) => `${unitId}#${index}`;

export function attemptIndex(attempts: InterviewAttemptState[]): Map<string, InterviewAttemptState> {
  const map = new Map<string, InterviewAttemptState>();
  for (const a of attempts) map.set(keyOf(a.unitId, a.questionIndex), a);
  return map;
}

export interface InterviewFilters {
  band?: Band | 'all';
  level?: InterviewLevel | 'all';
  domain?: DomainId | 'all';
  /** Only questions from units the learner has finished. */
  taughtOnly?: boolean;
  /** Only questions previously marked shaky or lost, or never attempted. */
  weakOnly?: boolean;
}

/**
 * Filters the bank, annotating each item with whether its unit is complete.
 *
 * `taughtOnly` exists because the spec is explicit that nothing should be
 * tested before it has been taught; a learner in week two should not be
 * ambushed by a transformer question.
 */
export function selectQuestions(
  state: Pick<LearnerState, 'units' | 'interviewAttempts'>,
  filters: InterviewFilters = {},
): InterviewItem[] {
  const attempts = attemptIndex(state.interviewAttempts);
  const levels =
    filters.level && filters.level !== 'all'
      ? new Set([filters.level])
      : filters.band && filters.band !== 'all'
        ? new Set(BANDS[filters.band])
        : null;

  return interviewBank()
    .map((item) => ({
      ...item,
      taught: state.units[item.unitId]?.lessonCompletedAt != null,
    }))
    .filter((item) => {
      if (levels && !levels.has(item.question.level)) return false;
      if (filters.domain && filters.domain !== 'all' && item.domain !== filters.domain) return false;
      if (filters.taughtOnly && !item.taught) return false;
      if (filters.weakOnly) {
        const a = attempts.get(keyOf(item.unitId, item.questionIndex));
        if (a && a.confidence === 'confident') return false;
      }
      return true;
    });
}

/**
 * Builds a practice session, weakest first.
 *
 * The ordering is the substance: questions the learner got lost on come
 * before shaky ones, which come before ones never attempted, which come
 * before ones already answered confidently. That way a short session spends
 * its time where the evidence says it is needed, which is what "generate a
 * session from weak areas" has to mean if it is to be more than a filter.
 */
export function buildSession(
  state: Pick<LearnerState, 'units' | 'interviewAttempts'>,
  filters: InterviewFilters = {},
  size = 10,
): InterviewItem[] {
  const attempts = attemptIndex(state.interviewAttempts);
  const rank = (item: InterviewItem) => {
    const a = attempts.get(keyOf(item.unitId, item.questionIndex));
    if (!a) return 2; // never attempted
    if (a.confidence === 'lost') return 0;
    if (a.confidence === 'shaky') return 1;
    return 3; // already confident — revisit last
  };

  const pool = selectQuestions(state, filters);
  return [...pool]
    .sort((a, b) => {
      const d = rank(a) - rank(b);
      if (d !== 0) return d;
      // Within a band, easier first, so a session warms up rather than
      // opening on the hardest thing the learner has ever failed.
      const la = LEVEL_ORDER.indexOf(a.question.level);
      const lb = LEVEL_ORDER.indexOf(b.question.level);
      if (la !== lb) return la - lb;
      return a.unitId.localeCompare(b.unitId) || a.questionIndex - b.questionIndex;
    })
    .slice(0, Math.max(1, Math.min(50, size)));
}

export interface DomainReadiness {
  domain: DomainId;
  name: string;
  total: number;
  attempted: number;
  confident: number;
  shaky: number;
  lost: number;
  /** Confident answers as a share of the domain's questions. */
  readiness: number;
}

export interface InterviewReadiness {
  total: number;
  attempted: number;
  confident: number;
  shaky: number;
  lost: number;
  /** Overall readiness: confident answers over the whole bank. */
  score: number;
  /** Readiness restricted to material the learner has actually been taught. */
  taughtScore: number;
  taughtTotal: number;
  byDomain: DomainReadiness[];
  byLevel: { level: InterviewLevel; label: string; total: number; confident: number; attempted: number }[];
  /** Units with at least one shaky or lost answer, worst first. */
  weakUnits: { unitId: string; title: string; slug: string; domain: DomainId; misses: number }[];
}

/**
 * Computes readiness from recorded attempts only.
 *
 * An unattempted question contributes to the denominator and not the
 * numerator, so readiness starts at zero and can only be moved by doing the
 * work. `taughtScore` is the more useful number mid-course: it asks how ready
 * you are on what you have covered, rather than penalising you for material
 * still ahead of you.
 */
export function computeReadiness(
  state: Pick<LearnerState, 'units' | 'interviewAttempts'>,
): InterviewReadiness {
  const attempts = attemptIndex(state.interviewAttempts);
  const bank = interviewBank();

  let attempted = 0;
  let confident = 0;
  let shaky = 0;
  let lost = 0;
  let taughtTotal = 0;
  let taughtConfident = 0;

  const domainAgg = new Map<DomainId, DomainReadiness>();
  const levelAgg = new Map<InterviewLevel, { total: number; confident: number; attempted: number }>();
  const unitMisses = new Map<string, number>();

  for (const item of bank) {
    const taught = state.units[item.unitId]?.lessonCompletedAt != null;
    const a = attempts.get(keyOf(item.unitId, item.questionIndex));

    let d = domainAgg.get(item.domain);
    if (!d) {
      d = {
        domain: item.domain,
        name: item.domainName,
        total: 0,
        attempted: 0,
        confident: 0,
        shaky: 0,
        lost: 0,
        readiness: 0,
      };
      domainAgg.set(item.domain, d);
    }
    d.total += 1;

    const l = levelAgg.get(item.question.level) ?? { total: 0, confident: 0, attempted: 0 };
    l.total += 1;
    levelAgg.set(item.question.level, l);

    if (taught) taughtTotal += 1;

    if (a) {
      attempted += 1;
      d.attempted += 1;
      l.attempted += 1;
      if (a.confidence === 'confident') {
        confident += 1;
        d.confident += 1;
        l.confident += 1;
        if (taught) taughtConfident += 1;
      } else {
        if (a.confidence === 'shaky') {
          shaky += 1;
          d.shaky += 1;
        } else {
          lost += 1;
          d.lost += 1;
        }
        unitMisses.set(item.unitId, (unitMisses.get(item.unitId) ?? 0) + 1);
      }
    }
  }

  for (const d of domainAgg.values()) d.readiness = d.total ? d.confident / d.total : 0;

  const weakUnits = [...unitMisses.entries()]
    .map(([unitId, misses]) => {
      const unit = UNIT_BY_ID.get(unitId) as LearningUnit | undefined;
      return {
        unitId,
        title: unit?.title ?? unitId,
        slug: unit?.slug ?? '',
        domain: (unit?.domain ?? 'ML') as DomainId,
        misses,
      };
    })
    .sort((a, b) => b.misses - a.misses || a.title.localeCompare(b.title))
    .slice(0, 12);

  return {
    total: bank.length,
    attempted,
    confident,
    shaky,
    lost,
    score: bank.length ? confident / bank.length : 0,
    taughtScore: taughtTotal ? taughtConfident / taughtTotal : 0,
    taughtTotal,
    byDomain: DOMAINS.map((dom) => domainAgg.get(dom.id)).filter((d): d is DomainReadiness => d != null),
    byLevel: LEVEL_ORDER.map((level) => ({
      level,
      label: LEVEL_LABELS[level],
      ...(levelAgg.get(level) ?? { total: 0, confident: 0, attempted: 0 }),
    })),
    weakUnits,
  };
}

/** A plain-English verdict, so a percentage is never shown without a reading. */
export function readinessVerdict(r: InterviewReadiness): { label: string; detail: string } {
  if (r.attempted === 0) {
    return {
      label: 'Not started',
      detail: `${r.total} questions are waiting. Readiness is measured from answers you have graded, so it starts at zero by design.`,
    };
  }
  const covered = r.attempted / r.total;
  const quality = r.attempted ? r.confident / r.attempted : 0;

  if (covered < 0.1) {
    return {
      label: 'Early days',
      detail: `You have graded ${r.attempted} of ${r.total}. Too few to read a trend — ${Math.round(quality * 100)}% of them felt solid so far.`,
    };
  }
  if (quality >= 0.8 && covered >= 0.5) {
    return {
      label: 'Interview ready',
      detail: `${Math.round(quality * 100)}% of the ${r.attempted} you have graded felt solid, across more than half the bank. Keep the weak list short and rehearse out loud.`,
    };
  }
  if (quality >= 0.6) {
    return {
      label: 'Getting there',
      detail: `${Math.round(quality * 100)}% felt solid. The ${r.shaky + r.lost} you flagged are the whole gap — work those before adding breadth.`,
    };
  }
  return {
    label: 'Needs work',
    detail: `Only ${Math.round(quality * 100)}% of your graded answers felt solid. Re-read the units behind the weak list rather than doing more questions.`,
  };
}

export const CONFIDENCE_LABELS: Record<InterviewConfidence, string> = {
  confident: 'I could answer this',
  shaky: 'I half knew it',
  lost: 'I could not answer',
};
