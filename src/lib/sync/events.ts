import { z } from 'zod';

/**
 * The write protocol.
 *
 * The client never sends derived state — no scores, no XP totals, no mastery
 * levels. It sends *what happened*, and the server derives everything else
 * from the curriculum. That is what makes offline replay safe and what stops
 * a crafted request from awarding itself 50,000 XP.
 */

const unitId = z.string().regex(/^[A-Z]{2,4}-\d{3}$/, 'invalid unit id');
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected yyyy-mm-dd');
const seconds = z.number().int().min(0).max(60 * 60 * 12);

export const responseSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('choice'), index: z.number().int().min(-1).max(50) }),
  z.object({ kind: z.literal('choices'), indices: z.array(z.number().int().min(0).max(50)).max(50) }),
  z.object({ kind: z.literal('boolean'), value: z.boolean() }),
  z.object({ kind: z.literal('text'), value: z.string().max(8000) }),
  z.object({ kind: z.literal('number'), value: z.number() }),
  z.object({ kind: z.literal('order'), order: z.array(z.number().int().min(0).max(50)).max(50) }),
  z.object({ kind: z.literal('match'), pairs: z.record(z.string().max(200), z.string().max(200)) }),
]);

export const eventSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('lesson-completed'), unitId, seconds: seconds.default(0) }),
  z.object({ type: z.literal('practice-completed'), unitId, practiceIndex: z.number().int().min(0).max(40) }),
  z.object({ type: z.literal('challenge-completed'), unitId }),
  z.object({
    type: z.literal('assessment-submitted'),
    kind: z.enum(['quick-check', 'daily-test', 'unit-test', 'review', 'domain-exam', 'final-assessment', 'diagnostic']),
    date: isoDate,
    answers: z
      .array(
        z.object({
          unitId,
          questionId: z.string().max(120),
          response: responseSchema.nullable(),
          seconds: z.number().int().min(0).max(3600).default(0),
        }),
      )
      .min(1)
      .max(400),
    seconds: seconds.default(0),
  }),
  z.object({ type: z.literal('teaching-submitted'), unitId, text: z.string().min(1).max(12000) }),
  z.object({ type: z.literal('note-saved'), unitId, body: z.string().max(40000) }),
  z.object({ type: z.literal('bookmark-toggled'), unitId, value: z.boolean() }),
  z.object({ type: z.literal('difficult-flagged'), unitId, value: z.boolean() }),
  z.object({ type: z.literal('skip-toggled'), unitId, value: z.boolean() }),
  z.object({ type: z.literal('mistake-resolved'), questionId: z.string().max(120), resolved: z.boolean() }),
  z.object({
    type: z.literal('session-recorded'),
    unitId: unitId.nullable(),
    kind: z.enum(['lesson', 'practice', 'test', 'lab', 'review', 'teach']),
    seconds,
  }),
  z.object({
    type: z.literal('profile-updated'),
    name: z.string().min(1).max(80).optional(),
    studyBudget: z.union([z.literal(30), z.literal(60), z.literal(120), z.literal(180), z.literal(240)]).optional(),
    preferredStudyTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    experience: z.enum(['complete-beginner', 'some-python', 'cs-student', 'career-switcher']).optional(),
    targetRole: z.enum(['ai-ml-intern', 'ml-engineer', 'data-scientist', 'ai-engineer', 'research', 'undecided']).optional(),
    timezone: z.string().max(64).optional(),
    markOnboarded: z.boolean().optional(),
  }),
  z.object({
    type: z.literal('prefs-updated'),
    theme: z.enum(['dark', 'light', 'system']).optional(),
    reduceMotion: z.boolean().optional(),
    highContrast: z.boolean().optional(),
    fontScale: z.number().int().min(85).max(140).optional(),
    notifications: z
      .object({
        enabled: z.boolean().optional(),
        browserPush: z.boolean().optional(),
        morningReminder: z.boolean().optional(),
        morningTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
        studyReminder: z.boolean().optional(),
        studyTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
        testReminder: z.boolean().optional(),
        testTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
        streakReminder: z.boolean().optional(),
        weeklySummary: z.boolean().optional(),
        achievementAlerts: z.boolean().optional(),
        goalReminder: z.boolean().optional(),
      })
      .optional(),
  }),
  z.object({ type: z.literal('notification-read'), id: z.string().max(80).nullable() }),

  // A flashcard has no id of its own in the curriculum schema, so it is
  // addressed by its position in the unit's deck. The server bounds the index
  // against the real deck, so an out-of-range index records nothing.
  z.object({
    type: z.literal('flashcard-reviewed'),
    unitId,
    cardIndex: z.number().int().min(0).max(60),
    grade: z.enum(['known', 'again']),
  }),

  // Confidence rather than correctness: an interview answer is prose, and the
  // learner comparing their answer with the model one is the only honest
  // signal available without a grader.
  z.object({
    type: z.literal('interview-attempted'),
    unitId,
    questionIndex: z.number().int().min(0).max(40),
    confidence: z.enum(['confident', 'shaky', 'lost']),
    seconds: seconds.default(0),
  }),

  z.object({
    type: z.literal('lab-step-completed'),
    labId: z.string().max(80),
    stepIndex: z.number().int().min(0).max(40),
  }),
  z.object({ type: z.literal('lab-completed'), labId: z.string().max(80), seconds: seconds.default(0) }),
  z.object({ type: z.literal('schedule-paused'), date: isoDate, paused: z.boolean() }),
  z.object({ type: z.literal('unit-reset'), unitId }),
]);

export type LearnerEventBody = z.infer<typeof eventSchema>;

export const envelopeSchema = z.object({
  /** Client-generated id; replaying the same id is a no-op. */
  id: z.string().min(8).max(80),
  at: z.string().datetime({ offset: true }).or(z.string().datetime()),
  event: eventSchema,
});

export type LearnerEvent = z.infer<typeof envelopeSchema>;

export const syncRequestSchema = z.object({
  events: z.array(envelopeSchema).max(200),
});

export type SyncRequest = z.infer<typeof syncRequestSchema>;
