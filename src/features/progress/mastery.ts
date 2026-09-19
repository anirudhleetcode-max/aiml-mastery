import { DEFAULT_MASTERY, type LearningUnit, type MasteryRequirements } from '@/types/curriculum';
import { MASTERY_LEVELS, type MasteryLevel, type ProgressBucket, type UnitProgress } from '@/types/progress';

export function requirementsFor(unit: LearningUnit): MasteryRequirements {
  return { ...DEFAULT_MASTERY, ...(unit.masteryRequirements ?? {}) };
}

/**
 * Mastery is derived, never stored as an opinion.
 *
 * Each level requires a specific piece of recorded evidence, so it is
 * impossible to "mark everything complete" by clicking around (spec §71).
 * The rules are monotonic: reaching a level always implies every level below.
 */
export function computeMastery(progress: UnitProgress, req: MasteryRequirements): MasteryLevel {
  if (!progress.lessonCompletedAt && progress.attempts === 0) return 'NOT_STARTED';

  const introduced = Boolean(progress.lessonCompletedAt);
  if (!introduced) return 'NOT_STARTED';

  const understood = progress.bestScore >= req.understoodScore;
  if (!understood) return 'INTRODUCED';

  const practiced = progress.practiceCompleted >= req.practiceRequired;
  if (!practiced) return 'UNDERSTOOD';

  const proficient = progress.bestScore >= req.proficientScore;
  if (!proficient) return 'PRACTICED';

  // MASTERED needs durability: a second successful attempt (or a solved
  // challenge) proves the score was not a single lucky run.
  const durable = progress.attempts >= 2 || progress.challengeCompleted;
  if (!durable) return 'PROFICIENT';

  const taught = (progress.teachingScore ?? 0) >= 0.8;
  if (!req.teachRequired || !taught) return 'MASTERED';

  return 'TEACHER';
}

export function masteryRank(level: MasteryLevel): number {
  return MASTERY_LEVELS.indexOf(level);
}

export function isAtLeast(level: MasteryLevel, minimum: MasteryLevel): boolean {
  return masteryRank(level) >= masteryRank(minimum);
}

/** What the learner must do next to move up one level. */
export function nextMasteryStep(
  progress: UnitProgress,
  req: MasteryRequirements,
): { target: MasteryLevel; action: string } | null {
  const level = computeMastery(progress, req);
  switch (level) {
    case 'NOT_STARTED':
      return { target: 'INTRODUCED', action: 'Read the lesson through to the end.' };
    case 'INTRODUCED':
      return {
        target: 'UNDERSTOOD',
        action: `Score ${Math.round(req.understoodScore * 100)}% or better on the unit check.`,
      };
    case 'UNDERSTOOD':
      return {
        target: 'PRACTICED',
        action: `Complete ${req.practiceRequired - progress.practiceCompleted} more practice exercise${
          req.practiceRequired - progress.practiceCompleted === 1 ? '' : 's'
        }.`,
      };
    case 'PRACTICED':
      return {
        target: 'PROFICIENT',
        action: `Score ${Math.round(req.proficientScore * 100)}% or better on a full test.`,
      };
    case 'PROFICIENT':
      return {
        target: 'MASTERED',
        action: progress.challengeCompleted
          ? 'Hold your score on one more attempt to prove it was not a fluke.'
          : 'Solve the challenge, or hold your score on a second attempt.',
      };
    case 'MASTERED':
      return { target: 'TEACHER', action: 'Explain this concept clearly in your own words in Teacher Mode.' };
    case 'TEACHER':
      return null;
  }
}

/** Coarse bucket for the donut chart and roadmap filters. */
export function bucketFor(progress: UnitProgress, req: MasteryRequirements, today: string): ProgressBucket {
  const level = computeMastery(progress, req);
  if (progress.nextReviewAt && progress.nextReviewAt <= today && level !== 'NOT_STARTED') return 'review';
  if (isAtLeast(level, 'MASTERED')) return 'mastered';
  if (level === 'NOT_STARTED') return 'not-started';
  return 'learning';
}

/**
 * A unit is "weak" when the evidence says it has not stuck: a low recent
 * score, or repeated attempts that never cleared the understanding bar.
 */
export function isWeak(progress: UnitProgress, req: MasteryRequirements): boolean {
  if (progress.attempts === 0) return false;
  if (progress.flaggedDifficult) return true;
  if (progress.lastScore < req.understoodScore) return true;
  return progress.attempts >= 3 && progress.bestScore < req.proficientScore;
}
