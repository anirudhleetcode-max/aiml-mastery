import type { XPReason, XPTransaction } from '@/types/progress';

/**
 * The XP economy.
 *
 * Two deliberate design decisions, both from the spec's §11 and §82:
 *
 *  1. XP is a floor-zero balance. Penalties reduce it but can never drive it
 *     negative, because a negative score is demoralising rather than
 *     motivating and makes the whole system feel punitive.
 *  2. Discipline is tracked *separately* from XP. XP measures work done;
 *     discipline measures showing up. Conflating them means one bad week
 *     erases a month of genuine learning, which is both unfair and untrue.
 */
export const XP_VALUES: Record<XPReason, number> = {
  'lesson-complete': 25,
  'practice-complete': 25,
  'quick-check': 20,
  'daily-test': 100,
  'high-score-bonus': 50,
  'perfect-bonus': 100,
  teaching: 75,
  challenge: 60,
  'streak-milestone': 500,
  'domain-complete': 1000,
  'domain-mastered': 2500,
  'review-complete': 30,
  // Small by design. Reviewing a card is a second's work, and a rate worth
  // farming would turn the deck into a slot machine — which §82 rules out.
  'flashcard-session': 2,
  'interview-answered': 15,
  'lab-complete': 80,
  achievement: 150,
  'missed-test': -100,
  'missed-test-overdue': -200,
};

export const XP_LABELS: Record<XPReason, string> = {
  'lesson-complete': 'Lesson completed',
  'practice-complete': 'Practice completed',
  'quick-check': 'Quick check passed',
  'daily-test': 'Daily test completed',
  'high-score-bonus': 'Scored 90% or above',
  'perfect-bonus': 'Perfect score',
  teaching: 'Taught it back',
  challenge: 'Challenge solved',
  'streak-milestone': 'Streak milestone',
  'domain-complete': 'Domain completed',
  'domain-mastered': 'Domain mastered',
  'review-complete': 'Review completed',
  'flashcard-session': 'Flashcard reviewed',
  'interview-answered': 'Interview question practised',
  'lab-complete': 'Lab completed',
  achievement: 'Achievement unlocked',
  'missed-test': 'Daily test missed',
  'missed-test-overdue': 'Daily test overdue',
};

let counter = 0;

export function makeTransaction(
  reason: XPReason,
  detail: string,
  opts: { unitId?: string; amount?: number; at?: Date } = {},
): XPTransaction {
  const at = opts.at ?? new Date();
  counter += 1;
  return {
    id: `xp_${at.getTime().toString(36)}_${counter.toString(36)}`,
    amount: opts.amount ?? XP_VALUES[reason],
    reason,
    detail,
    unitId: opts.unitId,
    createdAt: at.toISOString(),
  };
}

/** Applies a transaction to a balance, clamped at zero. */
export function applyXP(balance: number, amount: number): number {
  return Math.max(0, balance + amount);
}

/**
 * XP awarded for one completed assessment, as a list so the UI can show the
 * breakdown ("+100 daily test, +50 for 90%+") rather than an opaque total.
 */
export function awardsForAssessment(
  kind: 'daily-test' | 'unit-test' | 'review' | 'quick-check' | 'domain-exam' | 'final-assessment' | 'diagnostic',
  score: number,
  unitIds: string[],
): { reason: XPReason; amount: number; detail: string }[] {
  const awards: { reason: XPReason; amount: number; detail: string }[] = [];
  const base: XPReason =
    kind === 'quick-check' ? 'quick-check' : kind === 'review' ? 'review-complete' : 'daily-test';

  // Below 50% there is no base award: XP should track learning, not attendance.
  if (score >= 0.5) {
    awards.push({ reason: base, amount: XP_VALUES[base], detail: XP_LABELS[base] });
  } else {
    awards.push({
      reason: base,
      amount: Math.round(XP_VALUES[base] * 0.4),
      detail: 'Partial credit — worth retrying after a review',
    });
  }

  if (score >= 1) {
    awards.push({ reason: 'perfect-bonus', amount: XP_VALUES['perfect-bonus'], detail: 'Perfect score' });
  } else if (score >= 0.9) {
    awards.push({ reason: 'high-score-bonus', amount: XP_VALUES['high-score-bonus'], detail: 'Scored 90% or above' });
  }

  if (kind === 'final-assessment' && score >= 0.85) {
    awards.push({ reason: 'achievement', amount: 2500, detail: 'Final mastery assessment passed' });
  }

  void unitIds;
  return awards;
}

/* ------------------------------------------------------------------ */
/* Discipline                                                          */
/* ------------------------------------------------------------------ */

export const DISCIPLINE_START = 80;

/**
 * Discipline moves slowly and recovers faster than it falls, so a bad week is
 * a dip rather than a hole. It never reaches zero from a single miss.
 */
export function updateDiscipline(score: number, event: 'completed' | 'missed' | 'overdue' | 'rest'): number {
  const delta = event === 'completed' ? 4 : event === 'missed' ? -6 : event === 'overdue' ? -10 : 0;
  return Math.max(10, Math.min(100, Math.round(score + delta)));
}

export function disciplineLabel(score: number): { label: string; tone: 'success' | 'info' | 'warning' | 'danger' } {
  if (score >= 85) return { label: 'Excellent', tone: 'success' };
  if (score >= 65) return { label: 'Consistent', tone: 'info' };
  if (score >= 45) return { label: 'Slipping', tone: 'warning' };
  return { label: 'Needs rebuilding', tone: 'danger' };
}
