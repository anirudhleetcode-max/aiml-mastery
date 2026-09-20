import 'server-only';
import type { LearningUnit } from '@/types/curriculum';
import { evaluateTeaching, type TeachingEvaluation } from '@/features/teaching/evaluate';
import { evaluateInterviewAnswer } from './interview';
import type { AnswerEvaluation } from './schema';

/**
 * Teach-back, read twice.
 *
 * The existing evaluator is transparent keyword-and-structure analysis against
 * the unit's authored `mustCover` points. That is genuinely useful — it can
 * always say exactly which points were covered and which were not, and it
 * never pretends to more certainty than it has. What it cannot see is the part
 * that matters most in an explanation: whether the mechanism is described
 * correctly, whether the order makes sense, and whether something stated
 * confidently is simply wrong. A learner can hit every keyword and still teach
 * the idea backwards.
 *
 * So the deterministic pass stays exactly as it was and keeps its job — it is
 * what the server records, what mastery is computed from, and what the learner
 * sees when no model is configured. The optional second reading adds the
 * judgement the first one cannot make, and is labelled as a second opinion
 * rather than replacing the first.
 *
 * Mastery deliberately does not move on the model's verdict. The teaching
 * score written by the sync pipeline comes from `evaluateTeaching` and nothing
 * here changes it, which keeps "mastery is earned with evidence" true of an
 * evidence source that cannot be audited after the fact.
 */

export interface TeachingReview {
  /** The authored-points analysis. Unchanged, and still authoritative. */
  deterministic: TeachingEvaluation;
  /** Present only when a model was configured and returned usable output. */
  ai: AnswerEvaluation | null;
}

/**
 * The reference an explanation is judged against.
 *
 * Built from the unit's own sample explanation and its must-cover points, so
 * the model is comparing the learner with the curriculum rather than with
 * whatever it happens to believe about the topic.
 */
function reference(unit: LearningUnit): string {
  return [
    unit.teachingPrompt.sampleExplanation,
    '',
    'A complete explanation covers:',
    ...unit.teachingPrompt.mustCover.map((point) => `- ${point}`),
  ].join('\n');
}

export async function reviewTeaching(unit: LearningUnit, text: string): Promise<TeachingReview> {
  const deterministic = evaluateTeaching(unit, text);

  const ai = await evaluateInterviewAnswer({
    question: unit.teachingPrompt.prompt,
    referenceAnswer: reference(unit),
    unitTitle: unit.title,
    unitText: [
      unit.title,
      unit.formalDefinition,
      unit.simpleExplanation,
      unit.whyItExists,
      ...unit.learningObjectives,
      ...unit.terminology.map((t) => `${t.term} ${t.definition}`),
    ].join(' '),
    terminology: unit.terminology,
    answer: text,
    mode: 'teaching',
  });

  // A degraded result is the deterministic grade wearing the AI shape, which
  // would be a second copy of what the caller already has. Return nothing
  // instead, and let the UI show one analysis rather than two identical ones.
  return { deterministic, ai: ai.degraded ? null : ai };
}
