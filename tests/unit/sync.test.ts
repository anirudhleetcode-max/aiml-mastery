import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

/**
 * Integration tests for the write path.
 *
 * These run against a real (throwaway) SQLite database, because the properties
 * that matter here — that the server grades rather than trusting the client,
 * and that a replayed offline batch is applied exactly once — only hold if the
 * transaction and the idempotency ledger actually behave.
 */

const DB_FILE = path.resolve(process.cwd(), 'prisma/test.db');
process.env.DATABASE_URL = `file:${DB_FILE}`;
process.env.AUTH_SECRET = 'test-secret-that-is-definitely-long-enough-0123456789';

let prisma: import('@prisma/client').PrismaClient;
let applyEvents: typeof import('@/lib/sync/apply').applyEvents;
let userId: string;
let firstUnit: import('@/types/curriculum').LearningUnit;

beforeAll(async () => {
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
  execSync('npx prisma db push --skip-generate --accept-data-loss', {
    env: { ...process.env, DATABASE_URL: `file:${DB_FILE}` },
    stdio: 'pipe',
  });

  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient({ datasources: { db: { url: `file:${DB_FILE}` } } });

  const { newUserData } = await import('@/lib/auth/bootstrap');
  const user = await prisma.user.create({
    data: newUserData('sync-test@example.com', 'Sync Test', 'not-a-real-hash'),
    select: { id: true },
  });
  userId = user.id;

  ({ applyEvents } = await import('@/lib/sync/apply'));
  const { ALL_UNITS } = await import('@/data/curriculum');
  firstUnit = ALL_UNITS[0]!;
}, 120_000);

afterAll(async () => {
  await prisma?.$disconnect();
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
});

function envelope(id: string, event: unknown) {
  return { id, at: new Date().toISOString(), event } as never;
}

describe('the sync write path', () => {
  it('records a completed lesson and awards XP once', async () => {
    const result = await applyEvents(userId, [
      envelope('ev-lesson-1', { type: 'lesson-completed', unitId: firstUnit.id, seconds: 600 }),
    ]);

    expect(result.applied).toEqual(['ev-lesson-1']);
    expect(result.state.units[firstUnit.id]?.lessonCompletedAt).toBeTruthy();
    expect(result.state.units[firstUnit.id]?.mastery).toBe('INTRODUCED');
    expect(result.state.xp).toBeGreaterThan(0);
  });

  it('is idempotent: replaying the same event id changes nothing', async () => {
    const before = await applyEvents(userId, []);
    const xpBefore = before.state.xp;

    const replay = await applyEvents(userId, [
      envelope('ev-lesson-1', { type: 'lesson-completed', unitId: firstUnit.id, seconds: 600 }),
    ]);

    expect(replay.skipped).toEqual(['ev-lesson-1']);
    expect(replay.applied).toEqual([]);
    expect(replay.state.xp).toBe(xpBefore);
  });

  it('grades submitted answers on the server rather than trusting the client', async () => {
    const question = firstUnit.quiz.find((q) => q.type === 'mcq');
    expect(question).toBeDefined();
    if (!question || question.type !== 'mcq') return;

    const wrongIndex = question.answerIndex === 0 ? 1 : 0;

    const result = await applyEvents(userId, [
      envelope('ev-test-wrong', {
        type: 'assessment-submitted',
        kind: 'unit-test',
        date: '2026-09-20',
        seconds: 60,
        // A deliberately wrong answer. There is no field in which a client
        // could claim a score — the protocol simply does not carry one.
        answers: [{ unitId: firstUnit.id, questionId: question.id, response: { kind: 'choice', index: wrongIndex }, seconds: 10 }],
      }),
    ]);

    expect(result.effects.lastAssessment?.score).toBe(0);
    expect(result.effects.lastAssessment?.correct).toBe(0);
  });

  it('turns a wrong answer into a mistake-notebook entry, and a later right answer resolves it', async () => {
    const question = firstUnit.quiz.find((q) => q.type === 'mcq');
    if (!question || question.type !== 'mcq') return;

    const afterWrong = await applyEvents(userId, []);
    const entry = afterWrong.state.mistakes.find((m) => m.questionId === question.id);
    expect(entry).toBeDefined();
    expect(entry?.resolved).toBe(false);
    expect(entry?.correctAnswer).toBe(question.options[question.answerIndex]);

    const result = await applyEvents(userId, [
      envelope('ev-test-right', {
        type: 'assessment-submitted',
        kind: 'unit-test',
        date: '2026-09-21',
        seconds: 60,
        answers: [
          { unitId: firstUnit.id, questionId: question.id, response: { kind: 'choice', index: question.answerIndex }, seconds: 10 },
        ],
      }),
    ]);

    expect(result.state.mistakes.find((m) => m.questionId === question.id)?.resolved).toBe(true);
  });

  it('ignores answers to questions that do not belong to the claimed unit', async () => {
    const { ALL_UNITS } = await import('@/data/curriculum');
    const other = ALL_UNITS.find((u) => u.id !== firstUnit.id);
    if (!other) return;

    const result = await applyEvents(userId, [
      envelope('ev-test-mismatch', {
        type: 'assessment-submitted',
        kind: 'unit-test',
        date: '2026-09-22',
        seconds: 10,
        answers: [
          // Question id from `other`, but claimed against `firstUnit`.
          { unitId: firstUnit.id, questionId: other.quiz[0]!.id, response: { kind: 'choice', index: 0 }, seconds: 5 },
        ],
      }),
    ]);

    // Nothing gradeable, so no assessment is recorded at all.
    expect(result.effects.lastAssessment).toBeUndefined();
  });

  it('scores a teach-back on the server and stores the coverage breakdown', async () => {
    const result = await applyEvents(userId, [
      envelope('ev-teach-1', {
        type: 'teaching-submitted',
        unitId: firstUnit.id,
        text:
          'A program is an ordered list of instructions that a computer follows exactly, in order, from top to ' +
          'bottom. The Python interpreter is a separate program that reads your file and carries out each ' +
          'instruction one at a time, because the computer cannot guess what you meant. For example, print writes ' +
          'text to the screen, which is how you see that anything happened.',
      }),
    ]);

    const attempt = result.state.teachingAttempts[0];
    expect(attempt).toBeDefined();
    expect(attempt!.score).toBeGreaterThan(0);
    expect(attempt!.coverage.length + attempt!.missing.length).toBeGreaterThan(0);
    expect(result.state.units[firstUnit.id]?.teachingScore).toBeGreaterThan(0);
  });

  it('cannot inflate practice by repeating the same item', async () => {
    const result = await applyEvents(userId, [
      envelope('ev-practice-1', { type: 'practice-completed', unitId: firstUnit.id, practiceIndex: 0 }),
      envelope('ev-practice-2', { type: 'practice-completed', unitId: firstUnit.id, practiceIndex: 0 }),
      envelope('ev-practice-3', { type: 'practice-completed', unitId: firstUnit.id, practiceIndex: 0 }),
    ]);

    // Three events, one distinct item: the count is one.
    expect(result.state.units[firstUnit.id]?.practiceCompleted).toBe(1);

    const second = await applyEvents(userId, [
      envelope('ev-practice-4', { type: 'practice-completed', unitId: firstUnit.id, practiceIndex: 1 }),
    ]);
    expect(second.state.units[firstUnit.id]?.practiceCompleted).toBe(2);
  });

  it('ignores a practice index that does not exist', async () => {
    const before = await applyEvents(userId, []);
    const result = await applyEvents(userId, [
      envelope('ev-practice-bogus', { type: 'practice-completed', unitId: firstUnit.id, practiceIndex: 39 }),
    ]);
    expect(result.state.units[firstUnit.id]?.practiceCompleted).toBe(
      before.state.units[firstUnit.id]?.practiceCompleted,
    );
  });

  it('never lets XP go negative', async () => {
    const state = await applyEvents(userId, []);
    expect(state.state.xp).toBeGreaterThanOrEqual(0);
  });

  it('applies a mixed batch atomically and bumps the revision', async () => {
    const before = await applyEvents(userId, []);
    const result = await applyEvents(userId, [
      envelope('ev-batch-a', { type: 'bookmark-toggled', unitId: firstUnit.id, value: true }),
      envelope('ev-batch-b', { type: 'note-saved', unitId: firstUnit.id, body: 'Remember the interpreter model.' }),
      envelope('ev-batch-c', { type: 'difficult-flagged', unitId: firstUnit.id, value: true }),
    ]);

    expect(result.applied).toHaveLength(3);
    expect(result.state.units[firstUnit.id]?.bookmarked).toBe(true);
    expect(result.state.units[firstUnit.id]?.flaggedDifficult).toBe(true);
    expect(result.state.notes.find((n) => n.unitId === firstUnit.id)?.body).toContain('interpreter');
    expect(result.state.revision).toBeGreaterThan(before.state.revision);
  });

  it('resets a unit without destroying notes or XP', async () => {
    const before = await applyEvents(userId, []);
    const result = await applyEvents(userId, [envelope('ev-reset', { type: 'unit-reset', unitId: firstUnit.id })]);

    expect(result.state.units[firstUnit.id]?.mastery).toBe('NOT_STARTED');
    expect(result.state.units[firstUnit.id]?.bestScore).toBe(0);
    expect(result.state.notes.find((n) => n.unitId === firstUnit.id)?.body).toContain('interpreter');
    expect(result.state.xp).toBe(before.state.xp);
  });
});

/**
 * The three surfaces added after the first release — flashcards, interview
 * practice and labs — all write through the same event path, so the same
 * properties have to hold: the server bounds every index against the real
 * curriculum, and XP is awarded for genuinely new work rather than for
 * repeating an action.
 */
describe('flashcard review', () => {
  it('records a verdict and schedules the card', async () => {
    const result = await applyEvents(userId, [
      envelope('fc-1', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 0, grade: 'known' }),
    ]);
    expect(result.applied).toEqual(['fc-1']);

    const row = result.state.flashcardReviews.find((r) => r.unitId === firstUnit.id && r.cardIndex === 0);
    expect(row).toBeTruthy();
    expect(row!.lastGrade).toBe('known');
    expect(row!.timesKnown).toBe(1);
    // "known" advances one rung, so the card is not due again today.
    expect(row!.nextReviewAt > new Date().toISOString().slice(0, 10)).toBe(true);
  });

  it('sends a card you could not recall back to the shortest interval', async () => {
    await applyEvents(userId, [
      envelope('fc-2', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 1, grade: 'known' }),
      envelope('fc-3', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 1, grade: 'known' }),
    ]);
    const climbed = (await applyEvents(userId, [])).state.flashcardReviews.find(
      (r) => r.unitId === firstUnit.id && r.cardIndex === 1,
    )!;
    expect(climbed.reviewStep).toBeGreaterThan(0);

    const after = await applyEvents(userId, [
      envelope('fc-4', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 1, grade: 'again' }),
    ]);
    const dropped = after.state.flashcardReviews.find((r) => r.unitId === firstUnit.id && r.cardIndex === 1)!;
    expect(dropped.reviewStep).toBe(0);
    expect(dropped.timesAgain).toBe(1);
  });

  it('awards XP for a card once, however often it is regraded', async () => {
    const before = (await applyEvents(userId, [])).state.xp;
    await applyEvents(userId, [
      envelope('fc-5', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 2, grade: 'known' }),
    ]);
    const afterFirst = (await applyEvents(userId, [])).state.xp;
    expect(afterFirst).toBeGreaterThan(before);

    await applyEvents(userId, [
      envelope('fc-6', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 2, grade: 'again' }),
      envelope('fc-7', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 2, grade: 'known' }),
    ]);
    expect((await applyEvents(userId, [])).state.xp).toBe(afterFirst);
  });

  it('ignores a card index the unit does not have', async () => {
    const result = await applyEvents(userId, [
      envelope('fc-bad', { type: 'flashcard-reviewed', unitId: firstUnit.id, cardIndex: 59, grade: 'known' }),
    ]);
    expect(result.state.flashcardReviews.some((r) => r.cardIndex === 59)).toBe(false);
  });
});

describe('interview practice', () => {
  it('records a confidence verdict', async () => {
    await applyEvents(userId, [
      envelope('iv-1', {
        type: 'interview-attempted',
        unitId: firstUnit.id,
        questionIndex: 0,
        confidence: 'shaky',
        seconds: 45,
      }),
    ]);
    const row = (await applyEvents(userId, [])).state.interviewAttempts.find(
      (a) => a.unitId === firstUnit.id && a.questionIndex === 0,
    );
    expect(row).toBeTruthy();
    expect(row!.confidence).toBe('shaky');
    expect(row!.seconds).toBe(45);
  });

  it('updates the verdict on a second attempt without double-awarding XP', async () => {
    const before = (await applyEvents(userId, [])).state.xp;
    await applyEvents(userId, [
      envelope('iv-2', {
        type: 'interview-attempted',
        unitId: firstUnit.id,
        questionIndex: 0,
        confidence: 'confident',
        seconds: 20,
      }),
    ]);
    const after = await applyEvents(userId, []);
    const row = after.state.interviewAttempts.find((a) => a.unitId === firstUnit.id && a.questionIndex === 0)!;
    expect(row.confidence).toBe('confident');
    expect(row.attempts).toBe(2);
    expect(after.state.xp).toBe(before);
  });

  it('ignores a question index the unit does not have', async () => {
    await applyEvents(userId, [
      envelope('iv-bad', {
        type: 'interview-attempted',
        unitId: firstUnit.id,
        questionIndex: 39,
        confidence: 'confident',
        seconds: 1,
      }),
    ]);
    const rows = (await applyEvents(userId, [])).state.interviewAttempts;
    expect(rows.some((a) => a.questionIndex === 39)).toBe(false);
  });
});

describe('labs', () => {
  it('will not complete a lab whose steps are unfinished', async () => {
    const { LABS } = await import('@/data/labs');
    const lab = LABS[0]!;

    await applyEvents(userId, [
      envelope('lab-1', { type: 'lab-step-completed', labId: lab.id, stepIndex: 0 }),
      envelope('lab-2', { type: 'lab-completed', labId: lab.id, seconds: 300 }),
    ]);

    const row = (await applyEvents(userId, [])).state.labs.find((l) => l.labId === lab.id);
    expect(row).toBeTruthy();
    expect(row!.stepsDone).toEqual([0]);
    // The completion event was applied but refused to close an unfinished lab.
    expect(row!.completedAt).toBeNull();
  });

  it('completes once every step is ticked, and awards XP once', async () => {
    const { LABS } = await import('@/data/labs');
    const lab = LABS[0]!;
    const before = (await applyEvents(userId, [])).state.xp;

    await applyEvents(
      userId,
      lab.steps.map((_, i) =>
        envelope(`lab-step-${i}`, { type: 'lab-step-completed', labId: lab.id, stepIndex: i }),
      ),
    );
    await applyEvents(userId, [envelope('lab-done', { type: 'lab-completed', labId: lab.id, seconds: 300 })]);

    const done = await applyEvents(userId, []);
    const row = done.state.labs.find((l) => l.labId === lab.id)!;
    expect(row.stepsDone).toHaveLength(lab.steps.length);
    expect(row.completedAt).toBeTruthy();
    expect(done.state.xp).toBeGreaterThan(before);

    // Completing it again must not pay twice.
    await applyEvents(userId, [envelope('lab-done-2', { type: 'lab-completed', labId: lab.id, seconds: 60 })]);
    expect((await applyEvents(userId, [])).state.xp).toBe(done.state.xp);
  });

  it('cannot inflate the step count by ticking one step repeatedly', async () => {
    const { LABS } = await import('@/data/labs');
    const lab = LABS[1]!;
    await applyEvents(userId, [
      envelope('rep-1', { type: 'lab-step-completed', labId: lab.id, stepIndex: 0 }),
      envelope('rep-2', { type: 'lab-step-completed', labId: lab.id, stepIndex: 0 }),
      envelope('rep-3', { type: 'lab-step-completed', labId: lab.id, stepIndex: 0 }),
    ]);
    const row = (await applyEvents(userId, [])).state.labs.find((l) => l.labId === lab.id)!;
    expect(row.stepsDone).toEqual([0]);
  });

  it('ignores an unknown lab id', async () => {
    await applyEvents(userId, [
      envelope('lab-unknown', { type: 'lab-step-completed', labId: 'not-a-lab', stepIndex: 0 }),
    ]);
    expect((await applyEvents(userId, [])).state.labs.some((l) => l.labId === 'not-a-lab')).toBe(false);
  });
});

/**
 * The headline XP number must always be the sum of the transactions behind it.
 *
 * This is not a nicety: XP is the most visible number in the product, and a
 * total that cannot be explained by its own ledger is invented data however
 * plausible it looks. The seed asserted a total 2,775 higher than the
 * transactions it wrote, which went unnoticed precisely because nobody was
 * checking the two against each other.
 */
describe('XP integrity', () => {
  it('keeps meta.xp equal to the sum of the ledger after every kind of award', async () => {
    const { ALL_UNITS } = await import('@/data/curriculum');
    const { LABS } = await import('@/data/labs');
    const unit = ALL_UNITS[12]!;
    const lab = LABS[2]!;

    await applyEvents(userId, [
      envelope('inv-lesson', { type: 'lesson-completed', unitId: unit.id, seconds: 600 }),
      envelope('inv-practice', { type: 'practice-completed', unitId: unit.id, practiceIndex: 0 }),
      envelope('inv-challenge', { type: 'challenge-completed', unitId: unit.id }),
      envelope('inv-card', { type: 'flashcard-reviewed', unitId: unit.id, cardIndex: 0, grade: 'known' }),
      envelope('inv-interview', {
        type: 'interview-attempted',
        unitId: unit.id,
        questionIndex: 0,
        confidence: 'confident',
        seconds: 30,
      }),
      ...lab.steps.map((_, i) =>
        envelope(`inv-lab-${i}`, { type: 'lab-step-completed', labId: lab.id, stepIndex: i }),
      ),
      envelope('inv-lab-done', { type: 'lab-completed', labId: lab.id, seconds: 120 }),
    ]);

    const ledger = await prisma.xpTransaction.aggregate({ where: { userId }, _sum: { amount: true } });
    const meta = await prisma.learnerMeta.findUnique({ where: { userId } });
    expect(meta?.xp).toBe(Math.max(0, ledger._sum.amount ?? 0));
  });

  it('never lets the balance go negative', async () => {
    const meta = await prisma.learnerMeta.findUnique({ where: { userId } });
    expect(meta!.xp).toBeGreaterThanOrEqual(0);
  });
});
