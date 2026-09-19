import type { Difficulty } from '@/types/curriculum';
import { addDays, dateKey } from '@/lib/format';
import type { UnitProgress } from '@/types/progress';

/**
 * Spaced repetition, tuned for a 103-day course rather than for indefinite
 * lifetime retention. The ladder is short and the top interval is capped so a
 * unit learned in week one is still revisited before the final assessment.
 */
export const REVIEW_STEPS = [1, 3, 7, 14, 30] as const;

export interface ReviewOutcome {
  nextReviewAt: string;
  reviewStep: number;
  /** Set when repeated failures mean the unit should be re-taught, not re-tested. */
  needsReteach: boolean;
  reason: string;
}

/**
 * Schedules the next review after an attempt.
 *
 * - A strong score advances one rung of the ladder.
 * - A borderline score repeats the current rung.
 * - A weak score drops back to the bottom, because reviewing something you do
 *   not yet understand is rehearsal of a mistake.
 *
 * Harder units move up the ladder more slowly, which is what "difficulty
 * should influence review frequency" means in practice.
 */
export function scheduleReview(
  score: number,
  progress: UnitProgress,
  difficulty: Difficulty,
  today: string = dateKey(),
): ReviewOutcome {
  const consecutiveFailures = score < 0.6 ? progress.reviewStep === 0 ? progress.attempts : 1 : 0;

  let step: number;
  let reason: string;

  if (score >= 0.9) {
    step = Math.min(REVIEW_STEPS.length - 1, progress.reviewStep + 1);
    reason = 'Strong recall — pushing the next review further out.';
  } else if (score >= 0.7) {
    step = Math.min(REVIEW_STEPS.length - 1, progress.reviewStep + (difficulty >= 4 ? 0 : 1));
    reason =
      difficulty >= 4
        ? 'Solid, but this is a hard concept — holding the interval steady.'
        : 'Solid recall — stepping the interval up.';
  } else if (score >= 0.5) {
    step = progress.reviewStep;
    reason = 'Shaky. Repeating the same interval rather than stretching it.';
  } else {
    step = 0;
    reason = 'This has not stuck yet. Back to a short interval.';
  }

  // Harder material is revisited sooner at the same rung.
  const base = REVIEW_STEPS[step]!;
  const interval = Math.max(1, Math.round(base * (difficulty >= 4 ? 0.75 : difficulty <= 2 ? 1.15 : 1)));

  return {
    nextReviewAt: addDays(today, interval),
    reviewStep: step,
    needsReteach: score < 0.5 && (progress.attempts >= 2 || consecutiveFailures >= 2),
    reason,
  };
}

export function isDueForReview(progress: UnitProgress, today: string = dateKey()): boolean {
  return Boolean(progress.nextReviewAt && progress.nextReviewAt <= today);
}

export function dueReviews(
  units: Record<string, UnitProgress>,
  today: string = dateKey(),
  limit = 10,
): UnitProgress[] {
  return Object.values(units)
    .filter((p) => isDueForReview(p, today))
    .sort((a, b) => (a.nextReviewAt ?? '').localeCompare(b.nextReviewAt ?? ''))
    .slice(0, limit);
}

/**
 * When a learner keeps failing, escalating difficulty is the wrong response.
 * This returns the "let's simplify this" ladder the spec asks for (§19).
 */
export function reteachStrategy(attempts: number): {
  title: string;
  steps: { label: string; detail: string }[];
} {
  if (attempts <= 2) {
    return {
      title: "Let's approach this differently",
      steps: [
        { label: 'Re-read the analogy', detail: 'Start from the story, not the definition.' },
        { label: 'Watch the visual', detail: 'See the mechanism before reading about it again.' },
        { label: 'Try one practice question', detail: 'Just one, with the hint open.' },
      ],
    };
  }
  return {
    title: "Let's rebuild the foundation",
    steps: [
      { label: 'Check the prerequisites', detail: 'Repeated failure here usually means a gap one level down.' },
      { label: 'Re-read the simple explanation only', detail: 'Skip the maths entirely on this pass.' },
      { label: 'Work the example by hand', detail: 'Write it out on paper before touching code.' },
      { label: 'Explain it aloud badly', detail: 'A rough explanation exposes exactly where the gap is.' },
      { label: 'Then retry the check', detail: 'Only after the other four.' },
    ],
  };
}
