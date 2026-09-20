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
