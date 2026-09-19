/**
 * Seeds a demo learner so the application looks alive during development and
 * evaluation (spec §60). Production users always start from zero — this only
 * creates the single, clearly-labelled demo account.
 *
 *   npm run db:seed
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ALL_UNITS } from '../src/data/curriculum';
import { DEFAULT_NOTIFICATION_PREFS } from '../src/lib/sync/state';
import { computeMastery, requirementsFor } from '../src/features/progress/mastery';
import { addDays, dateKey } from '../src/lib/format';
import { emptyUnitProgress } from '../src/types/progress';

const prisma = new PrismaClient();

const DEMO_EMAIL = 'demo@aimlmastery.app';
const DEMO_PASSWORD = 'demolearner2026';

/** Small deterministic PRNG so the demo data is identical on every seed. */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

async function main() {
  if (ALL_UNITS.length === 0) {
    console.error('No curriculum units found — seed aborted.');
    process.exit(1);
  }

  const rand = rng(20260920);
  const today = dateKey();
  const START = addDays(today, -45);

  console.log(`Seeding demo learner over ${ALL_UNITS.length} units…`);

  await prisma.user.deleteMany({ where: { email: DEMO_EMAIL } });

  const user = await prisma.user.create({
    data: {
      email: DEMO_EMAIL,
      passwordHash: await bcrypt.hash(DEMO_PASSWORD, 10),
      profile: {
        create: {
          name: 'Demo Learner',
          studyBudget: 60,
          preferredStudyTime: '19:00',
          experience: 'some-python',
          targetRole: 'ai-ml-intern',
          startDate: START,
          endDate: '2026-12-31',
          timezone: 'UTC',
          onboardedAt: new Date(),
          notificationPrefs: JSON.stringify(DEFAULT_NOTIFICATION_PREFS),
          pausedDates: '[]',
        },
      },
      state: {
        create: {
          xp: 8450,
          revision: 1,
          streakCurrent: 12,
          streakLongest: 14,
          streakLastDate: today,
          testStreak: 9,
          longestTestStreak: 11,
          teachingStreak: 3,
          freezesRemaining: 1,
          disciplineScore: 86,
          testsCompleted: 31,
          testsMissed: 3,
        },
      },
    },
    select: { id: true },
  });

  const COMPLETED = Math.min(47, ALL_UNITS.length);

  /* ---- unit progress ---- */
  for (let i = 0; i < COMPLETED; i++) {
    const unit = ALL_UNITS[i]!;
    const studiedOn = addDays(START, Math.floor((i / COMPLETED) * 44));
    const base = 0.62 + rand() * 0.38;
    const best = Math.min(1, base + (i < COMPLETED - 8 ? 0.1 : 0));
    const attempts = i < COMPLETED - 6 ? 2 : 1;

    const p = {
      ...emptyUnitProgress(unit.id),
      bestScore: best,
      lastScore: best - rand() * 0.08,
      attempts,
      practiceCompleted: best > 0.7 ? unit.practiceQuestions.length : 1,
      challengeCompleted: best > 0.88 && Boolean(unit.challenge),
      teachingScore: i % 5 === 0 ? 0.82 + rand() * 0.15 : null,
      lessonCompletedAt: `${studiedOn}T19:30:00.000Z`,
      lastStudiedAt: `${studiedOn}T20:10:00.000Z`,
      timeSpentSeconds: Math.round(unit.estimatedMinutes * 60 * (0.8 + rand() * 0.6)),
      nextReviewAt: i > COMPLETED - 12 ? addDays(today, Math.floor(rand() * 6) - 2) : addDays(today, 14),
      reviewStep: Math.min(4, Math.floor(best * 5)),
    };

    const mastery = computeMastery(p, requirementsFor(unit));

    await prisma.unitProgress.create({
      data: {
        userId: user.id,
        unitId: unit.id,
        mastery,
        bestScore: p.bestScore,
        lastScore: p.lastScore,
        attempts: p.attempts,
        practiceCompleted: p.practiceCompleted,
        challengeCompleted: p.challengeCompleted,
        teachingScore: p.teachingScore,
        lessonCompletedAt: new Date(p.lessonCompletedAt!),
        lastStudiedAt: new Date(p.lastStudiedAt!),
        timeSpentSeconds: p.timeSpentSeconds,
        nextReviewAt: p.nextReviewAt,
        reviewStep: p.reviewStep,
        weak: p.lastScore < 0.7,
        bookmarked: i % 9 === 0,
        flaggedDifficult: i % 13 === 0,
      },
    });
  }

  /* ---- daily activity, assessments, XP ---- */
  for (let d = 45; d >= 0; d--) {
    const date = addDays(today, -d);
    const dow = new Date(date).getDay();
    const rest = (dow === 0 && rand() < 0.5) || rand() < 0.08;
    if (rest) continue;

    const units = rand() < 0.25 ? 2 : 1;
    const score = Math.min(1, 0.68 + rand() * 0.3);
    const minutes = 35 + Math.round(rand() * 55);
    const xp = 25 * units + 100 + (score >= 0.9 ? 50 : 0);

    await prisma.dayActivity.create({
      data: {
        userId: user.id,
        date,
        unitsCompleted: units,
        xp,
        studySeconds: minutes * 60,
        testScore: score,
        testTaken: true,
        teachBacks: rand() < 0.2 ? 1 : 0,
      },
    });

    const unitIndex = Math.min(COMPLETED - 1, Math.floor(((45 - d) / 46) * COMPLETED));
    const unit = ALL_UNITS[unitIndex]!;

    await prisma.assessment.create({
      data: {
        id: `seed_as_${date}`,
        userId: user.id,
        kind: 'daily-test',
        date,
        unitIds: JSON.stringify([unit.id]),
        score,
        correct: Math.round(score * 10),
        total: 10,
        seconds: 300 + Math.round(rand() * 400),
        completedAt: new Date(`${date}T20:45:00.000Z`),
      },
    });

    await prisma.xpTransaction.create({
      data: {
        id: `seed_xp_${date}`,
        userId: user.id,
        amount: xp,
        reason: 'daily-test',
        detail: `Daily test — ${unit.title}`,
        unitId: unit.id,
        createdAt: new Date(`${date}T20:45:00.000Z`),
      },
    });

    await prisma.studySession.create({
      data: {
        id: `seed_ss_${date}`,
        userId: user.id,
        unitId: unit.id,
        kind: 'lesson',
        seconds: minutes * 60,
        startedAt: new Date(`${date}T19:30:00.000Z`),
      },
    });
  }

  /* ---- mistake notebook ---- */
  let mistakes = 0;
  for (let i = 0; i < COMPLETED && mistakes < 14; i++) {
    const unit = ALL_UNITS[i]!;
    const q = unit.quiz[i % unit.quiz.length];
    if (!q || q.type === 'explain') continue;
    mistakes++;
    await prisma.mistake.create({
      data: {
        id: `seed_mk_${q.id}`,
        userId: user.id,
        unitId: unit.id,
        questionId: q.id,
        prompt: q.prompt,
        yourAnswer: 'An earlier answer that did not hold up',
        correctAnswer: correctText(q),
        why: q.explanation,
        concept: q.concept ?? q.type,
        reviewAt: addDays(today, (i % 5) - 1),
        resolved: mistakes % 3 === 0,
        timesWrong: 1 + (i % 2),
        createdAt: new Date(addDays(today, -(20 - (i % 18)))),
      },
    });
  }

  /* ---- notes, teaching, achievements, notifications ---- */
  for (let i = 0; i < 6; i++) {
    const unit = ALL_UNITS[i * 3]!;
    await prisma.note.create({
      data: {
        userId: user.id,
        unitId: unit.id,
        body: `Key thing to remember about ${unit.title}: ${unit.learningObjectives[0] ?? unit.topic}.\n\nCome back to the worked example before the next test.`,
      },
    });
  }

  for (let i = 0; i < 4; i++) {
    const unit = ALL_UNITS[i * 5]!;
    await prisma.teachingAttempt.create({
      data: {
        id: `seed_te_${unit.id}`,
        userId: user.id,
        unitId: unit.id,
        text: `Here is how I would explain ${unit.title} to someone new...`,
        score: 0.78 + i * 0.05,
        clarity: 0.8,
        coverage: JSON.stringify(unit.teachingPrompt.mustCover.slice(0, 3)),
        missing: JSON.stringify(unit.teachingPrompt.mustCover.slice(3)),
        feedback: 'A good explanation with a gap or two. Close those and you are at teaching standard.',
        createdAt: new Date(addDays(today, -(3 + i * 4))),
      },
    });
  }

  for (const id of ['first-lesson', 'first-test', 'streak-7', 'units-10', 'first-teaching', 'perfect-test']) {
    await prisma.userAchievement.create({ data: { userId: user.id, achievementId: id } });
  }

  await prisma.notification.createMany({
    data: [
      {
        id: 'seed_ntf_1',
        userId: user.id,
        kind: 'test-due',
        title: "Today's test is still waiting",
        body: 'Complete it to protect your 12-day streak.',
        href: '/tests/daily',
        dedupeKey: `test-due-${today}`,
      },
      {
        id: 'seed_ntf_2',
        userId: user.id,
        kind: 'improvement',
        title: 'Your average improved by 9%',
        body: 'Compared with the same time last week. Whatever you changed, keep doing it.',
        href: '/analytics',
        dedupeKey: 'improvement-week',
        read: true,
      },
      {
        id: 'seed_ntf_3',
        userId: user.id,
        kind: 'weak-topic',
        title: 'One topic needs another pass',
        body: 'It has been below the understanding bar twice now. A guided re-teach is ready.',
        href: '/mistakes',
        dedupeKey: 'weak-topic-nudge',
      },
    ],
  });

  console.log(`  Demo learner ready — ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
  console.log(`  ${COMPLETED}/${ALL_UNITS.length} units complete, 8,450 XP, 12-day streak.`);
}

function correctText(q: (typeof ALL_UNITS)[number]['quiz'][number]): string {
  switch (q.type) {
    case 'mcq':
    case 'code-output':
    case 'debug':
      return q.options[q.answerIndex] ?? '';
    case 'multi':
      return q.answerIndices.map((i) => q.options[i]).join(', ');
    case 'truefalse':
      return q.answer ? 'True' : 'False';
    case 'fill':
      return q.answers[0] ?? '';
    case 'numeric':
      return String(q.answer);
    case 'order':
      return q.items.join(' → ');
    case 'match':
      return q.pairs.map((p) => `${p.left} → ${p.right}`).join('; ');
    default:
      return '';
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
