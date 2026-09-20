import { prisma } from '@/lib/db';
import type {
  AppNotification,
  AssessmentResult,
  DayActivity,
  FlashcardReviewState,
  InterviewAttemptState,
  LabProgressState,
  LearnerProfile,
  LearnerState,
  MistakeEntry,
  NoteEntry,
  NotificationPrefs,
  StudySession,
  TeachingAttempt,
  UnitProgress,
  XPTransaction,
} from '@/types/progress';
import type { MasteryLevel, XPReason } from '@/types/progress';

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  enabled: true,
  browserPush: false,
  morningReminder: true,
  morningTime: '08:00',
  studyReminder: true,
  studyTime: '19:00',
  testReminder: true,
  testTime: '21:00',
  streakReminder: true,
  weeklySummary: true,
};

export interface UISettings {
  theme: 'dark' | 'light' | 'system';
  reduceMotion: boolean;
  highContrast: boolean;
  fontScale: number;
}

export interface FullState extends LearnerState {
  settings: UISettings;
  email: string;
}

function parseJSON<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Assembles the complete learner state from normalised rows. */
export async function loadState(userId: string): Promise<FullState | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      state: true,
      progress: true,
      xpTransactions: { orderBy: { createdAt: 'desc' }, take: 400 },
      achievements: true,
      mistakes: { orderBy: { createdAt: 'desc' }, take: 400 },
      notes: true,
      teachingAttempts: { orderBy: { createdAt: 'desc' }, take: 200 },
      sessions: { orderBy: { startedAt: 'desc' }, take: 500 },
      activity: true,
      notifications: { orderBy: { createdAt: 'desc' }, take: 60 },
      assessments: {
        orderBy: { completedAt: 'desc' },
        take: 250,
        include: { answers: true },
      },
      flashcardReviews: true,
      interviewAttempts: true,
      labCompletions: true,
    },
  });

  if (!user || !user.profile || !user.state) return null;
  const p = user.profile;
  const meta = user.state;

  const profile: LearnerProfile = {
    name: p.name,
    studyBudget: p.studyBudget as LearnerProfile['studyBudget'],
    preferredStudyTime: p.preferredStudyTime,
    experience: p.experience as LearnerProfile['experience'],
    targetRole: p.targetRole as LearnerProfile['targetRole'],
    onboardedAt: p.onboardedAt?.toISOString() ?? null,
    startDate: p.startDate,
    endDate: p.endDate,
    timezone: p.timezone,
  };

  const units: Record<string, UnitProgress> = {};
  for (const row of user.progress) {
    units[row.unitId] = {
      unitId: row.unitId,
      mastery: row.mastery as MasteryLevel,
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

  const assessments: AssessmentResult[] = user.assessments.map((a) => ({
    id: a.id,
    kind: a.kind as AssessmentResult['kind'],
    date: a.date,
    unitIds: parseJSON<string[]>(a.unitIds, []),
    score: a.score,
    correct: a.correct,
    total: a.total,
    seconds: a.seconds,
    completedAt: a.completedAt.toISOString(),
    answers: a.answers.map((ans) => ({
      questionId: ans.questionId,
      unitId: ans.unitId,
      type: ans.type as AssessmentResult['answers'][number]['type'],
      correct: ans.correct,
      response: parseJSON<unknown>(ans.response, null),
      seconds: ans.seconds,
    })),
  }));

  const xpLog: XPTransaction[] = user.xpTransactions.map((t) => ({
    id: t.id,
    amount: t.amount,
    reason: t.reason as XPReason,
    detail: t.detail,
    unitId: t.unitId ?? undefined,
    createdAt: t.createdAt.toISOString(),
  }));

  const mistakes: MistakeEntry[] = user.mistakes.map((m) => ({
    id: m.id,
    unitId: m.unitId,
    questionId: m.questionId,
    prompt: m.prompt,
    yourAnswer: m.yourAnswer,
    correctAnswer: m.correctAnswer,
    why: m.why,
    concept: m.concept,
    createdAt: m.createdAt.toISOString(),
    reviewAt: m.reviewAt,
    resolved: m.resolved,
    timesWrong: m.timesWrong,
  }));

  const notes: NoteEntry[] = user.notes.map((n) => ({
    id: n.id,
    unitId: n.unitId,
    body: n.body,
    updatedAt: n.updatedAt.toISOString(),
  }));

  const teachingAttempts: TeachingAttempt[] = user.teachingAttempts.map((t) => ({
    id: t.id,
    unitId: t.unitId,
    text: t.text,
    score: t.score,
    coverage: parseJSON<string[]>(t.coverage, []),
    missing: parseJSON<string[]>(t.missing, []),
    feedback: t.feedback,
    clarity: t.clarity,
    createdAt: t.createdAt.toISOString(),
  }));

  const sessions: StudySession[] = user.sessions.map((s) => ({
    id: s.id,
    unitId: s.unitId,
    startedAt: s.startedAt.toISOString(),
    seconds: s.seconds,
    kind: s.kind as StudySession['kind'],
  }));

  const activity: Record<string, DayActivity> = {};
  for (const a of user.activity) {
    activity[a.date] = {
      date: a.date,
      unitsCompleted: a.unitsCompleted,
      xp: a.xp,
      studySeconds: a.studySeconds,
      testScore: a.testScore,
      testTaken: a.testTaken,
      teachBacks: a.teachBacks,
    };
  }

  const notifications: AppNotification[] = user.notifications.map((n) => ({
    id: n.id,
    kind: n.kind as AppNotification['kind'],
    title: n.title,
    body: n.body,
    href: n.href ?? undefined,
    createdAt: n.createdAt.toISOString(),
    read: n.read,
    dedupeKey: n.dedupeKey,
  }));

  const flashcardReviews: FlashcardReviewState[] = user.flashcardReviews.map((r) => ({
    unitId: r.unitId,
    cardIndex: r.cardIndex,
    lastGrade: r.lastGrade === 'again' ? 'again' : 'known',
    timesSeen: r.timesSeen,
    timesKnown: r.timesKnown,
    timesAgain: r.timesAgain,
    reviewStep: r.reviewStep,
    nextReviewAt: r.nextReviewAt,
    lastReviewedAt: r.lastReviewedAt.toISOString(),
  }));

  const interviewAttempts: InterviewAttemptState[] = user.interviewAttempts.map((r) => ({
    unitId: r.unitId,
    questionIndex: r.questionIndex,
    confidence: (r.confidence === 'confident' || r.confidence === 'shaky' ? r.confidence : 'lost'),
    seconds: r.seconds,
    attempts: r.attempts,
    lastAttemptAt: r.lastAttemptAt.toISOString(),
  }));

  const labs: LabProgressState[] = user.labCompletions.map((r) => ({
    labId: r.labId,
    stepsDone: parseJSON<number[]>(r.stepsDone, []),
    completedAt: r.completedAt?.toISOString() ?? null,
    seconds: r.seconds,
  }));

  return {
    flashcardReviews,
    interviewAttempts,
    labs,
    email: user.email,
    profile,
    units,
    xp: meta.xp,
    xpLog,
    streak: {
      current: meta.streakCurrent,
      longest: meta.streakLongest,
      lastActiveDate: meta.streakLastDate,
      testStreak: meta.testStreak,
      longestTestStreak: meta.longestTestStreak,
      teachingStreak: meta.teachingStreak,
      weeksActive: Math.ceil(meta.streakLongest / 7),
      freezesRemaining: meta.freezesRemaining,
    },
    discipline: {
      score: meta.disciplineScore,
      testsDue: meta.testsDue,
      testsCompleted: meta.testsCompleted,
      testsMissed: meta.testsMissed,
    },
    assessments,
    mistakes,
    notes,
    teachingAttempts,
    sessions,
    achievements: user.achievements.map((a) => ({ id: a.achievementId, unlockedAt: a.unlockedAt.toISOString() })),
    notifications,
    notificationPrefs: { ...DEFAULT_NOTIFICATION_PREFS, ...parseJSON<Partial<NotificationPrefs>>(p.notificationPrefs, {}) },
    activity,
    pausedDates: parseJSON<string[]>(p.pausedDates, []),
    settings: {
      theme: p.theme as UISettings['theme'],
      reduceMotion: p.reduceMotion,
      highContrast: p.highContrast,
      fontScale: p.fontScale,
    },
    updatedAt: meta.updatedAt.toISOString(),
    revision: meta.revision,
  };
}
