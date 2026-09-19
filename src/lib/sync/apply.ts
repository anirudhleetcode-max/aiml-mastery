import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { ALL_UNITS, UNIT_BY_ID } from '@/data/curriculum';
import { DOMAINS } from '@/data/domains';
import { computeMastery, isWeak, requirementsFor } from '@/features/progress/mastery';
import { newlyUnlocked } from '@/features/progress/achievements';
import { scheduleReview } from '@/features/revision/spaced';
import { gradeQuestion, type Response as GradeResponse } from '@/features/testing/scoring';
import { evaluateTeaching } from '@/features/teaching/evaluate';
import { recordActivity, effectiveStreak } from '@/features/streak/streak';
import { ACHIEVEMENT_BY_ID } from '@/data/achievements';
import { XP_VALUES, awardsForAssessment, updateDiscipline } from '@/features/xp/rules';
import { addDays, dateKey } from '@/lib/format';
import type { LearnerEvent } from './events';
import { loadState, type FullState } from './state';

type Tx = Prisma.TransactionClient;

export interface ApplyResult {
  state: FullState;
  applied: string[];
  skipped: string[];
  /** Things worth showing the learner as a result of this batch. */
  effects: {
    xpAwards: { amount: number; detail: string }[];
    achievementsUnlocked: string[];
    milestones: number[];
    masteryChanges: { unitId: string; from: string; to: string }[];
    lastAssessment?: { id: string; score: number; correct: number; total: number };
  };
}

const QUESTION_INDEX = (() => {
  const map = new Map<string, { unitId: string; question: (typeof ALL_UNITS)[number]['quiz'][number] }>();
  for (const unit of ALL_UNITS) {
    for (const q of unit.quiz) map.set(q.id, { unitId: unit.id, question: q });
  }
  return map;
})();

async function ensureProgress(tx: Tx, userId: string, unitId: string) {
  const existing = await tx.unitProgress.findUnique({ where: { userId_unitId: { userId, unitId } } });
  if (existing) return existing;
  return tx.unitProgress.create({ data: { userId, unitId } });
}

async function bumpActivity(
  tx: Tx,
  userId: string,
  date: string,
  patch: { units?: number; xp?: number; seconds?: number; testScore?: number; teachBacks?: number },
) {
  const existing = await tx.dayActivity.findUnique({ where: { userId_date: { userId, date } } });
  const data = {
    unitsCompleted: (existing?.unitsCompleted ?? 0) + (patch.units ?? 0),
    xp: (existing?.xp ?? 0) + (patch.xp ?? 0),
    studySeconds: (existing?.studySeconds ?? 0) + (patch.seconds ?? 0),
    teachBacks: (existing?.teachBacks ?? 0) + (patch.teachBacks ?? 0),
    testScore: patch.testScore !== undefined ? Math.max(existing?.testScore ?? 0, patch.testScore) : existing?.testScore ?? null,
    testTaken: patch.testScore !== undefined ? true : (existing?.testTaken ?? false),
  };
  if (existing) {
    await tx.dayActivity.update({ where: { id: existing.id }, data });
  } else {
    await tx.dayActivity.create({ data: { userId, date, ...data } });
  }
}

async function awardXP(
  tx: Tx,
  userId: string,
  entries: { reason: string; amount: number; detail: string; unitId?: string }[],
  at: Date,
  effects: ApplyResult['effects'],
) {
  if (entries.length === 0) return 0;
  let delta = 0;
  for (const [i, e] of entries.entries()) {
    if (e.amount === 0) continue;
    delta += e.amount;
    await tx.xpTransaction.create({
      data: {
        id: `xp_${at.getTime().toString(36)}_${i}_${Math.random().toString(36).slice(2, 8)}`,
        userId,
        amount: e.amount,
        reason: e.reason,
        detail: e.detail,
        unitId: e.unitId ?? null,
        createdAt: at,
      },
    });
    effects.xpAwards.push({ amount: e.amount, detail: e.detail });
  }
  return delta;
}

async function notify(
  tx: Tx,
  userId: string,
  n: { id?: string; kind: string; title: string; body: string; href?: string; dedupeKey: string },
) {
  const existing = await tx.notification.findUnique({
    where: { userId_dedupeKey: { userId, dedupeKey: n.dedupeKey } },
  });
  if (existing) return;
  await tx.notification.create({
    data: {
      id: n.id ?? `ntf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      userId,
      kind: n.kind,
      title: n.title,
      body: n.body,
      href: n.href ?? null,
      dedupeKey: n.dedupeKey,
    },
  });
}

/**
 * Applies a batch of learner events.
 *
 * The whole batch runs in one transaction: either every event lands or none
 * does, so an interrupted sync can be retried safely. Each event is guarded by
 * a unique (userId, eventId) row, which makes replay after an offline period
 * idempotent rather than duplicative.
 */
export async function applyEvents(userId: string, events: LearnerEvent[]): Promise<ApplyResult> {
  const applied: string[] = [];
  const skipped: string[] = [];
  const effects: ApplyResult['effects'] = {
    xpAwards: [],
    achievementsUnlocked: [],
    milestones: [],
    masteryChanges: [],
  };

  await prisma.$transaction(
    async (tx) => {
      let xpDelta = 0;

      for (const envelope of events) {
        const already = await tx.appliedEvent.findUnique({
          where: { userId_eventId: { userId, eventId: envelope.id } },
        });
        if (already) {
          skipped.push(envelope.id);
          continue;
        }

        const at = new Date(envelope.at);
        const safeAt = Number.isFinite(at.getTime()) ? at : new Date();
        const day = dateKey(safeAt);
        const e = envelope.event;

        switch (e.type) {
          case 'lesson-completed': {
            const unit = UNIT_BY_ID.get(e.unitId);
            if (!unit) break;
            const row = await ensureProgress(tx, userId, e.unitId);
            const before = row.mastery;
            const firstTime = !row.lessonCompletedAt;
            const updated = await tx.unitProgress.update({
              where: { id: row.id },
              data: {
                lessonCompletedAt: row.lessonCompletedAt ?? safeAt,
                lastStudiedAt: safeAt,
                timeSpentSeconds: row.timeSpentSeconds + e.seconds,
              },
            });
            const after = computeMastery(toProgress(updated), requirementsFor(unit));
            await tx.unitProgress.update({ where: { id: row.id }, data: { mastery: after } });
            if (before !== after) effects.masteryChanges.push({ unitId: e.unitId, from: before, to: after });
            if (firstTime) {
              xpDelta += await awardXP(
                tx,
                userId,
                [{ reason: 'lesson-complete', amount: XP_VALUES['lesson-complete'], detail: `Lesson: ${unit.title}`, unitId: unit.id }],
                safeAt,
                effects,
              );
              await bumpActivity(tx, userId, day, { units: 1, xp: XP_VALUES['lesson-complete'], seconds: e.seconds });
            } else {
              await bumpActivity(tx, userId, day, { seconds: e.seconds });
            }
            break;
          }

          case 'practice-completed': {
            const unit = UNIT_BY_ID.get(e.unitId);
            if (!unit || e.practiceIndex >= unit.practiceQuestions.length) break;
            const row = await ensureProgress(tx, userId, e.unitId);
            const before = row.mastery;
            const next = Math.min(unit.practiceQuestions.length, row.practiceCompleted + 1);
            const updated = await tx.unitProgress.update({
              where: { id: row.id },
              data: { practiceCompleted: next, lastStudiedAt: safeAt },
            });
            const after = computeMastery(toProgress(updated), requirementsFor(unit));
            await tx.unitProgress.update({ where: { id: row.id }, data: { mastery: after } });
            if (before !== after) effects.masteryChanges.push({ unitId: e.unitId, from: before, to: after });
            xpDelta += await awardXP(
              tx,
              userId,
              [{ reason: 'practice-complete', amount: XP_VALUES['practice-complete'], detail: `Practice: ${unit.title}`, unitId: unit.id }],
              safeAt,
              effects,
            );
            await bumpActivity(tx, userId, day, { xp: XP_VALUES['practice-complete'] });
            break;
          }

          case 'challenge-completed': {
            const unit = UNIT_BY_ID.get(e.unitId);
            if (!unit || !unit.challenge) break;
            const row = await ensureProgress(tx, userId, e.unitId);
            if (!row.challengeCompleted) {
              const before = row.mastery;
              const updated = await tx.unitProgress.update({
                where: { id: row.id },
                data: { challengeCompleted: true, lastStudiedAt: safeAt },
              });
              const after = computeMastery(toProgress(updated), requirementsFor(unit));
              await tx.unitProgress.update({ where: { id: row.id }, data: { mastery: after } });
              if (before !== after) effects.masteryChanges.push({ unitId: e.unitId, from: before, to: after });
              xpDelta += await awardXP(
                tx,
                userId,
                [{ reason: 'challenge', amount: XP_VALUES.challenge, detail: `Challenge: ${unit.challenge.title}`, unitId: unit.id }],
                safeAt,
                effects,
              );
              await bumpActivity(tx, userId, day, { xp: XP_VALUES.challenge });
            }
            break;
          }

          case 'assessment-submitted': {
            // The client sends answers. The server grades them against the
            // real curriculum — a client-reported score is never trusted.
            const graded: {
              unitId: string;
              questionId: string;
              type: string;
              correct: boolean;
              credit: number;
              response: unknown;
              seconds: number;
              correctAnswer: string;
              yourAnswer: string;
              explanation: string;
              concept: string;
              prompt: string;
            }[] = [];

            for (const a of e.answers) {
              const found = QUESTION_INDEX.get(a.questionId);
              if (!found || found.unitId !== a.unitId) continue;
              const result = gradeQuestion(found.question, (a.response as GradeResponse | null) ?? null);
              graded.push({
                unitId: a.unitId,
                questionId: a.questionId,
                type: found.question.type,
                correct: result.correct,
                credit: result.credit,
                response: a.response,
                seconds: a.seconds,
                correctAnswer: result.correctAnswerText,
                yourAnswer: result.yourAnswerText,
                explanation: found.question.explanation,
                concept: found.question.concept ?? found.question.type,
                prompt: found.question.prompt,
              });
            }

            if (graded.length === 0) break;

            const total = graded.length;
            const correct = graded.filter((g) => g.correct).length;
            const score = graded.reduce((acc, g) => acc + g.credit, 0) / total;
            const unitIds = [...new Set(graded.map((g) => g.unitId))];
            const assessmentId = `as_${envelope.id.slice(0, 24)}`;

            await tx.assessment.create({
              data: {
                id: assessmentId,
                userId,
                kind: e.kind,
                date: e.date,
                unitIds: JSON.stringify(unitIds),
                score,
                correct,
                total,
                seconds: e.seconds,
                completedAt: safeAt,
                answers: {
                  create: graded.map((g) => ({
                    questionId: g.questionId,
                    unitId: g.unitId,
                    type: g.type,
                    correct: g.correct,
                    credit: g.credit,
                    response: JSON.stringify(g.response ?? null),
                    seconds: g.seconds,
                  })),
                },
              },
            });

            effects.lastAssessment = { id: assessmentId, score, correct, total };

            // Per-unit score, so a multi-unit test updates each unit honestly.
            for (const uid of unitIds) {
              const unit = UNIT_BY_ID.get(uid);
              if (!unit) continue;
              const forUnit = graded.filter((g) => g.unitId === uid);
              const unitScore = forUnit.reduce((a, g) => a + g.credit, 0) / forUnit.length;
              const row = await ensureProgress(tx, userId, uid);
              const before = row.mastery;
              const req = requirementsFor(unit);
              const isFull = e.kind !== 'quick-check';

              const review = scheduleReview(unitScore, toProgress(row), unit.difficulty, e.date);
              const updated = await tx.unitProgress.update({
                where: { id: row.id },
                data: {
                  attempts: isFull ? row.attempts + 1 : row.attempts,
                  bestScore: Math.max(row.bestScore, unitScore),
                  lastScore: unitScore,
                  lastStudiedAt: safeAt,
                  nextReviewAt: review.nextReviewAt,
                  reviewStep: review.reviewStep,
                },
              });
              const progress = toProgress(updated);
              const after = computeMastery(progress, req);
              await tx.unitProgress.update({
                where: { id: row.id },
                data: { mastery: after, weak: isWeak(progress, req) },
              });
              if (before !== after) effects.masteryChanges.push({ unitId: uid, from: before, to: after });

              if (review.needsReteach) {
                await notify(tx, userId, {
                  kind: 'weak-topic',
                  title: `Let's simplify ${unit.title}`,
                  body: 'This one has not stuck yet. A guided re-teach is ready — analogy first, maths later.',
                  href: `/learn/${unit.slug}?mode=reteach`,
                  dedupeKey: `reteach-${uid}-${e.date}`,
                });
              }
            }

            // Wrong answers become mistake-notebook entries.
            for (const g of graded) {
              if (g.correct) continue;
              const existing = await tx.mistake.findUnique({
                where: { userId_questionId: { userId, questionId: g.questionId } },
              });
              if (existing) {
                await tx.mistake.update({
                  where: { id: existing.id },
                  data: {
                    timesWrong: existing.timesWrong + 1,
                    resolved: false,
                    yourAnswer: g.yourAnswer,
                    reviewAt: addDays(e.date, 2),
                  },
                });
              } else {
                await tx.mistake.create({
                  data: {
                    id: `mk_${g.questionId}`.slice(0, 80),
                    userId,
                    unitId: g.unitId,
                    questionId: g.questionId,
                    prompt: g.prompt,
                    yourAnswer: g.yourAnswer,
                    correctAnswer: g.correctAnswer,
                    why: g.explanation,
                    concept: g.concept,
                    reviewAt: addDays(e.date, 1),
                    createdAt: safeAt,
                  },
                });
              }
            }

            // Answering correctly now resolves the matching open mistake.
            for (const g of graded) {
              if (!g.correct) continue;
              const existing = await tx.mistake.findUnique({
                where: { userId_questionId: { userId, questionId: g.questionId } },
              });
              if (existing && !existing.resolved) {
                await tx.mistake.update({ where: { id: existing.id }, data: { resolved: true } });
              }
            }

            const awards = awardsForAssessment(e.kind, score, unitIds);
            xpDelta += await awardXP(tx, userId, awards.map((a) => ({ ...a })), safeAt, effects);
            await bumpActivity(tx, userId, day, {
              xp: awards.reduce((a, x) => a + x.amount, 0),
              seconds: e.seconds,
              ...(e.kind === 'daily-test' || e.kind === 'unit-test' ? { testScore: score } : {}),
            });

            if (e.kind === 'daily-test' || e.kind === 'unit-test') {
              const meta = await tx.learnerMeta.findUnique({ where: { userId } });
              if (meta) {
                await tx.learnerMeta.update({
                  where: { userId },
                  data: {
                    testsCompleted: meta.testsCompleted + 1,
                    disciplineScore: updateDiscipline(meta.disciplineScore, 'completed'),
                  },
                });
              }
            }
            break;
          }

          case 'teaching-submitted': {
            const unit = UNIT_BY_ID.get(e.unitId);
            if (!unit) break;
            const evaluation = evaluateTeaching(unit, e.text);
            await tx.teachingAttempt.create({
              data: {
                id: `te_${envelope.id.slice(0, 24)}`,
                userId,
                unitId: e.unitId,
                text: e.text.slice(0, 12000),
                score: evaluation.score,
                clarity: evaluation.dimensions.clarity,
                coverage: JSON.stringify(evaluation.covered),
                missing: JSON.stringify(evaluation.missing),
                feedback: evaluation.verdict,
                createdAt: safeAt,
              },
            });

            const row = await ensureProgress(tx, userId, e.unitId);
            const before = row.mastery;
            const updated = await tx.unitProgress.update({
              where: { id: row.id },
              data: {
                teachingScore: Math.max(row.teachingScore ?? 0, evaluation.score),
                lastStudiedAt: safeAt,
              },
            });
            const after = computeMastery(toProgress(updated), requirementsFor(unit));
            await tx.unitProgress.update({ where: { id: row.id }, data: { mastery: after } });
            if (before !== after) effects.masteryChanges.push({ unitId: e.unitId, from: before, to: after });

            xpDelta += await awardXP(
              tx,
              userId,
              [
                {
                  reason: 'teaching',
                  amount: Math.round(XP_VALUES.teaching * Math.max(0.4, evaluation.score)),
                  detail: `Taught back: ${unit.title}`,
                  unitId: unit.id,
                },
              ],
              safeAt,
              effects,
            );
            await bumpActivity(tx, userId, day, { teachBacks: 1 });
            break;
          }

          case 'note-saved': {
            if (!UNIT_BY_ID.has(e.unitId)) break;
            const existing = await tx.note.findUnique({ where: { userId_unitId: { userId, unitId: e.unitId } } });
            if (existing) {
              await tx.note.update({ where: { id: existing.id }, data: { body: e.body } });
            } else {
              await tx.note.create({ data: { userId, unitId: e.unitId, body: e.body } });
            }
            break;
          }

          case 'bookmark-toggled':
          case 'difficult-flagged':
          case 'skip-toggled': {
            if (!UNIT_BY_ID.has(e.unitId)) break;
            const row = await ensureProgress(tx, userId, e.unitId);
            const field =
              e.type === 'bookmark-toggled' ? 'bookmarked' : e.type === 'difficult-flagged' ? 'flaggedDifficult' : 'skipped';
            await tx.unitProgress.update({ where: { id: row.id }, data: { [field]: e.value } });
            break;
          }

          case 'mistake-resolved': {
            const existing = await tx.mistake.findUnique({
              where: { userId_questionId: { userId, questionId: e.questionId } },
            });
            if (existing) await tx.mistake.update({ where: { id: existing.id }, data: { resolved: e.resolved } });
            break;
          }

          case 'session-recorded': {
            await tx.studySession.create({
              data: {
                id: `ss_${envelope.id.slice(0, 24)}`,
                userId,
                unitId: e.unitId,
                kind: e.kind,
                seconds: e.seconds,
                startedAt: safeAt,
              },
            });
            if (e.unitId && UNIT_BY_ID.has(e.unitId)) {
              const row = await ensureProgress(tx, userId, e.unitId);
              await tx.unitProgress.update({
                where: { id: row.id },
                data: { timeSpentSeconds: row.timeSpentSeconds + e.seconds, lastStudiedAt: safeAt },
              });
            }
            await bumpActivity(tx, userId, day, { seconds: e.seconds });
            break;
          }

          case 'profile-updated': {
            await tx.profile.update({
              where: { userId },
              data: {
                ...(e.name !== undefined ? { name: e.name } : {}),
                ...(e.studyBudget !== undefined ? { studyBudget: e.studyBudget } : {}),
                ...(e.preferredStudyTime !== undefined ? { preferredStudyTime: e.preferredStudyTime } : {}),
                ...(e.experience !== undefined ? { experience: e.experience } : {}),
                ...(e.targetRole !== undefined ? { targetRole: e.targetRole } : {}),
                ...(e.timezone !== undefined ? { timezone: e.timezone } : {}),
                ...(e.markOnboarded ? { onboardedAt: safeAt } : {}),
              },
            });
            break;
          }

          case 'prefs-updated': {
            const profile = await tx.profile.findUnique({ where: { userId } });
            if (!profile) break;
            let prefs: Record<string, unknown> = {};
            try {
              prefs = JSON.parse(profile.notificationPrefs) as Record<string, unknown>;
            } catch {
              prefs = {};
            }
            await tx.profile.update({
              where: { userId },
              data: {
                ...(e.theme !== undefined ? { theme: e.theme } : {}),
                ...(e.reduceMotion !== undefined ? { reduceMotion: e.reduceMotion } : {}),
                ...(e.highContrast !== undefined ? { highContrast: e.highContrast } : {}),
                ...(e.fontScale !== undefined ? { fontScale: e.fontScale } : {}),
                ...(e.notifications ? { notificationPrefs: JSON.stringify({ ...prefs, ...e.notifications }) } : {}),
              },
            });
            break;
          }

          case 'notification-read': {
            if (e.id === null) {
              await tx.notification.updateMany({ where: { userId, read: false }, data: { read: true } });
            } else {
              await tx.notification.updateMany({ where: { userId, id: e.id }, data: { read: true } });
            }
            break;
          }

          case 'schedule-paused': {
            const profile = await tx.profile.findUnique({ where: { userId } });
            if (!profile) break;
            let paused: string[] = [];
            try {
              paused = JSON.parse(profile.pausedDates) as string[];
            } catch {
              paused = [];
            }
            const set = new Set(paused);
            if (e.paused) set.add(e.date);
            else set.delete(e.date);
            await tx.profile.update({ where: { userId }, data: { pausedDates: JSON.stringify([...set].sort()) } });
            break;
          }

          case 'unit-reset': {
            const row = await tx.unitProgress.findUnique({ where: { userId_unitId: { userId, unitId: e.unitId } } });
            if (row) {
              await tx.unitProgress.update({
                where: { id: row.id },
                data: {
                  mastery: 'NOT_STARTED',
                  bestScore: 0,
                  lastScore: 0,
                  attempts: 0,
                  practiceCompleted: 0,
                  challengeCompleted: false,
                  teachingScore: null,
                  lessonCompletedAt: null,
                  nextReviewAt: null,
                  reviewStep: 0,
                  weak: false,
                },
              });
            }
            break;
          }
        }

        await tx.appliedEvent.create({ data: { userId, eventId: envelope.id, type: e.type } });
        applied.push(envelope.id);
      }

      /* ---------------- derived state, once per batch ---------------- */

      if (applied.length > 0) {
        const meta = await tx.learnerMeta.findUnique({ where: { userId } });
        if (meta) {
          const today = dateKey();
          const tookTest = events.some(
            (x) => x.event.type === 'assessment-submitted' && x.event.kind !== 'quick-check',
          );
          const taught = events.some((x) => x.event.type === 'teaching-submitted');
          const update = recordActivity(
            {
              current: meta.streakCurrent,
              longest: meta.streakLongest,
              lastActiveDate: meta.streakLastDate,
              testStreak: meta.testStreak,
              longestTestStreak: meta.longestTestStreak,
              teachingStreak: meta.teachingStreak,
              weeksActive: 0,
              freezesRemaining: meta.freezesRemaining,
            },
            today,
            { tookTest, taught },
          );

          effects.milestones = update.milestonesReached;
          let streakXP = 0;
          if (update.milestonesReached.length > 0) {
            streakXP = await awardXP(
              tx,
              userId,
              update.milestonesReached.map((m) => ({
                reason: 'streak-milestone',
                amount: XP_VALUES['streak-milestone'],
                detail: `${m}-day streak`,
              })),
              new Date(),
              effects,
            );
          }

          await tx.learnerMeta.update({
            where: { userId },
            data: {
              xp: Math.max(0, meta.xp + xpDelta + streakXP),
              revision: meta.revision + 1,
              streakCurrent: update.streak.current,
              streakLongest: update.streak.longest,
              streakLastDate: update.streak.lastActiveDate,
              testStreak: update.streak.testStreak,
              longestTestStreak: update.streak.longestTestStreak,
              teachingStreak: update.streak.teachingStreak,
              freezesRemaining: update.streak.freezesRemaining,
            },
          });
        }
      }
    },
    { timeout: 30_000, maxWait: 10_000 },
  );

  /* Achievements are evaluated after the batch, against final state. */
  const state = await loadState(userId);
  if (!state) throw new Error('State vanished mid-sync');

  const unlocked = await grantAchievements(userId, state, effects);
  effects.achievementsUnlocked = unlocked;

  const finalState = unlocked.length > 0 ? ((await loadState(userId)) ?? state) : state;
  return { state: finalState, applied, skipped, effects };
}

async function grantAchievements(
  userId: string,
  state: FullState,
  effects: ApplyResult['effects'],
): Promise<string[]> {
  const completedDomains = new Set<(typeof DOMAINS)[number]['id']>();
  for (const d of DOMAINS) {
    const units = ALL_UNITS.filter((u) => u.domain === d.id);
    if (units.length === 0) continue;
    if (units.every((u) => (state.units[u.id]?.lessonCompletedAt ?? null) !== null)) completedDomains.add(d.id);
  }

  const values = Object.values(state.units);
  const ids = newlyUnlocked({
    state,
    completedUnits: values.filter((u) => u.lessonCompletedAt).length,
    masteredUnits: values.filter((u) => u.mastery === 'MASTERED' || u.mastery === 'TEACHER').length,
    teacherUnits: values.filter((u) => u.mastery === 'TEACHER').length,
    totalUnits: ALL_UNITS.length,
    completedDomains,
    effectiveStreak: effectiveStreak(state.streak),
    bestTestScore: state.assessments.reduce((m, a) => Math.max(m, a.score), 0),
  });

  if (ids.length === 0) return [];

  await prisma.$transaction(async (tx) => {
    for (const id of ids) {
      const achievement = ACHIEVEMENT_BY_ID.get(id);
      if (!achievement) continue;
      await tx.userAchievement.upsert({
        where: { userId_achievementId: { userId, achievementId: id } },
        update: {},
        create: { userId, achievementId: id },
      });
      await tx.xpTransaction.create({
        data: {
          id: `xp_ach_${id}_${Date.now().toString(36)}`,
          userId,
          amount: achievement.xp,
          reason: 'achievement',
          detail: `Achievement: ${achievement.name}`,
        },
      });
      await notify(tx, userId, {
        kind: 'achievement',
        title: `Achievement unlocked — ${achievement.name}`,
        body: achievement.description,
        href: '/achievements',
        dedupeKey: `achievement-${id}`,
      });
      effects.xpAwards.push({ amount: achievement.xp, detail: `Achievement: ${achievement.name}` });
    }
    const meta = await tx.learnerMeta.findUnique({ where: { userId } });
    if (meta) {
      const total = ids.reduce((a, id) => a + (ACHIEVEMENT_BY_ID.get(id)?.xp ?? 0), 0);
      await tx.learnerMeta.update({
        where: { userId },
        data: { xp: Math.max(0, meta.xp + total), revision: meta.revision + 1 },
      });
    }
  });

  return ids;
}

function toProgress(row: {
  unitId: string;
  mastery: string;
  bestScore: number;
  lastScore: number;
  attempts: number;
  practiceCompleted: number;
  challengeCompleted: boolean;
  teachingScore: number | null;
  lessonCompletedAt: Date | null;
  lastStudiedAt: Date | null;
  timeSpentSeconds: number;
  nextReviewAt: string | null;
  reviewStep: number;
  weak: boolean;
  skipped: boolean;
  bookmarked: boolean;
  flaggedDifficult: boolean;
}) {
  return {
    unitId: row.unitId,
    mastery: row.mastery as import('@/types/progress').MasteryLevel,
    bestScore: row.bestScore,
    lastScore: row.lastScore,
    attempts: row.attempts,
    practiceCompleted: row.practiceCompleted,
    challengeCompleted: row.challengeCompleted,
    teachingScore: row.teachingScore,
    lessonCompletedAt: row.lessonCompletedAt?.toISOString() ?? null,
    lastStudiedAt: row.lastStudiedAt?.toISOString() ?? null,
    timeSpentSeconds: row.timeSpentSeconds,
    nextReviewAt: row.nextReviewAt,
    reviewStep: row.reviewStep,
    weak: row.weak,
    skipped: row.skipped,
    bookmarked: row.bookmarked,
    flaggedDifficult: row.flaggedDifficult,
  };
}
