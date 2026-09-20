import 'server-only';
import type { Term } from '@/types/curriculum';
import { evaluateInterviewAnswer } from './interview';
import type { FlashcardEvaluation, RecallSuggestion } from './schema';

/**
 * Checking a typed flashcard recall.
 *
 * The important word in this file is *suggestion*. The spaced-repetition
 * scheduler is the platform's memory of what a learner knows, and it is driven
 * by their own known/again decision after seeing the card's back. Nothing here
 * writes to it, and nothing here presses either button.
 *
 * That is not caution for its own sake. A recall check compares short prose to
 * short prose, gets it wrong sometimes, and the cost of being wrong is not a
 * bad score — it is a card scheduled a month out that the learner cannot
 * actually recall, or a card they know perfectly being shown every day. The
 * learner is the only one who can tell whether what surfaced in their head was
 * the right idea in different words. So the machine offers a reading and they
 * decide.
 *
 * A shorter recall threshold applies than for an interview answer, because a
 * flashcard back is a sentence and a correct recall of it is a sentence.
 */

export type { FlashcardEvaluation, RecallSuggestion } from './schema';

/** Where the bands sit. Deliberately generous about wording, strict about substance. */
const KNOWN_AT = 70;
const PARTIAL_AT = 35;

export interface FlashcardInput {
  front: string;
  back: string;
  unitTitle: string;
  unitText?: string;
  terminology?: Term[];
  answer: string;
  useAi?: boolean;
}

export async function evaluateFlashcardRecall(input: FlashcardInput): Promise<FlashcardEvaluation> {
  const evaluation = await evaluateInterviewAnswer({
    question: input.front,
    referenceAnswer: input.back,
    unitTitle: input.unitTitle,
    unitText: input.unitText,
    terminology: input.terminology,
    answer: input.answer,
    useAi: input.useAi,
    mode: 'flashcard',
  });

  // Correctness carries more weight here than the blended score does. A recall
  // that is right but terse should not be marked down for lacking depth — depth
  // is not what a flashcard is for.
  const basis = Math.round(evaluation.scores.correctness * 0.7 + evaluation.scores.overall * 0.3);

  let suggestion: RecallSuggestion;
  let suggestionReason: string;

  if (evaluation.misconceptions.length > 0) {
    // Something stated wrongly outranks any amount of coverage: a confident
    // wrong answer is the one case where seeing the card again soon matters
    // most.
    suggestion = 'again';
    suggestionReason = 'Part of that does not match the card, so it is worth seeing again soon.';
  } else if (basis >= KNOWN_AT) {
    suggestion = 'known';
    suggestionReason = 'That covers what the card asks for.';
  } else if (basis >= PARTIAL_AT) {
    suggestion = 'partial';
    suggestionReason = 'The gist is there, with pieces missing — your call whether that counts as knowing it.';
  } else {
    suggestion = 'again';
    suggestionReason = 'Not much of the card came back this time.';
  }

  return { ...evaluation, suggestion, suggestionReason };
}
