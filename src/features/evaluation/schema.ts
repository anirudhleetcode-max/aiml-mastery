import { z } from 'zod';
import type { QuestionKind } from './classify';

/**
 * The shape an evaluation is allowed to have.
 *
 * Model output is parsed through this and nothing else. Whatever comes back
 * over the wire is untrusted text that happens to look like JSON: it may be
 * truncated, may carry extra keys, may contain scores outside the range, and
 * may be an attempt by an injected instruction to put content somewhere the UI
 * will render. Parsing rather than casting is what stops any of that from
 * reaching the database or the screen.
 *
 * Every string is length-capped for the same reason — a validated field that
 * can hold a megabyte is still a way to fill a page.
 */

const line = z.string().trim().min(1).max(400);
const band = z.number().int().min(0).max(100);

export const aiEvaluationSchema = z
  .object({
    correctness: band,
    completeness: band,
    technicalDepth: band,
    clarity: band,
    /** Concepts a strong answer covers that this one did not. */
    missingConcepts: z.array(line).max(8).default([]),
    /** Things the answer asserts that are wrong, not merely absent. */
    misconceptions: z.array(line).max(6).default([]),
    /** One concrete thing to do differently next time. */
    suggestedImprovement: z.string().trim().min(1).max(600),
    /** What an interviewer would ask next. */
    followUpQuestion: z.string().trim().min(1).max(400),
    /** One or two sentences a human would actually read first. */
    summary: z.string().trim().min(1).max(600),
  })
  .strip();

export type AiEvaluation = z.infer<typeof aiEvaluationSchema>;

/** Where each number came from, which the UI shows rather than hides. */
export type EvaluationSource = 'deterministic' | 'ai';

export interface EvaluationScores {
  correctness: number;
  completeness: number;
  technicalDepth: number;
  clarity: number;
  /** The single headline number, 0–100. */
  overall: number;
}

export interface AnswerEvaluation {
  kind: QuestionKind;
  source: EvaluationSource;
  scores: EvaluationScores;
  missingConcepts: string[];
  misconceptions: string[];
  suggestedImprovement: string;
  followUpQuestion: string;
  summary: string;
  /** Concepts the deterministic pass found, shown alongside either source. */
  coveredConcepts: string[];
  /** Populated when the AI pass was attempted and did not produce a result. */
  degraded?: 'unavailable' | 'timeout' | 'rate-limited' | 'error' | 'invalid-output';
  /** Everything needed to explain a score after the fact. */
  meta: {
    words: number;
    coverage: number;
    model?: string;
    evaluatedAt: string;
  };
}

/** The persisted shape, so a stored row can be read back with confidence. */
export const storedEvaluationSchema = z.object({
  kind: z.string().max(40),
  source: z.enum(['deterministic', 'ai']),
  scores: z.object({
    correctness: band,
    completeness: band,
    technicalDepth: band,
    clarity: band,
    overall: band,
  }),
  missingConcepts: z.array(z.string().max(400)).max(8),
  misconceptions: z.array(z.string().max(400)).max(6),
  suggestedImprovement: z.string().max(600),
  followUpQuestion: z.string().max(400),
  summary: z.string().max(600),
  coveredConcepts: z.array(z.string().max(400)).max(12),
  degraded: z.enum(['unavailable', 'timeout', 'rate-limited', 'error', 'invalid-output']).optional(),
  meta: z.object({
    words: z.number().int().min(0),
    coverage: z.number().min(0).max(1),
    model: z.string().max(80).optional(),
    evaluatedAt: z.string().max(40),
  }),
});
