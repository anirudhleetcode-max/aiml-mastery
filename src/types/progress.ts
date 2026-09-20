import type { DomainId, QuizQuestionType, UnitId } from './curriculum';

/* ------------------------------------------------------------------ */
/* Mastery                                                              */
/* ------------------------------------------------------------------ */

/**
 * Mastery is evidence-based (spec §8, §71). Opening a lesson can only ever
 * reach level 1; every level above that requires a recorded artefact.
 */
export const MASTERY_LEVELS = [
  'NOT_STARTED',
  'INTRODUCED',
  'UNDERSTOOD',
  'PRACTICED',
  'PROFICIENT',
  'MASTERED',
  'TEACHER',
] as const;

export type MasteryLevel = (typeof MASTERY_LEVELS)[number];

export const MASTERY_META: Record<
  MasteryLevel,
  { level: number; label: string; requirement: string; accent: string }
> = {
  NOT_STARTED: { level: 0, label: 'Not started', requirement: 'Open the lesson to begin.', accent: 'slate' },
  INTRODUCED: { level: 1, label: 'Introduced', requirement: 'You have read the lesson through.', accent: 'slate' },
  UNDERSTOOD: { level: 2, label: 'Understood', requirement: 'Scored 70% or better on the check.', accent: 'sky' },
  PRACTICED: { level: 3, label: 'Practiced', requirement: 'Completed the practice exercises.', accent: 'cyan' },
  PROFICIENT: { level: 4, label: 'Proficient', requirement: 'Scored 85% or better on a full test.', accent: 'emerald' },
  MASTERED: { level: 5, label: 'Mastered', requirement: 'Solved the challenge and held 85% on review.', accent: 'violet' },
  TEACHER: { level: 6, label: 'Teacher', requirement: 'Explained it clearly, unaided, in your own words.', accent: 'amber' },
};

/** Coarse buckets used by the donut chart and roadmap filters. */
export type ProgressBucket = 'mastered' | 'learning' | 'review' | 'not-started';

export interface UnitProgress {
  unitId: UnitId;
  mastery: MasteryLevel;
  /** Best full-test score, 0–1. */
  bestScore: number;
  /** Most recent score, 0–1. */
  lastScore: number;
  attempts: number;
  practiceCompleted: number;
  challengeCompleted: boolean;
  teachingScore: number | null;
  lessonCompletedAt: string | null;
  lastStudiedAt: string | null;
  /** Total seconds spent inside this unit. */
  timeSpentSeconds: number;
  /** Set by the revision engine. ISO date. */
  nextReviewAt: string | null;
  /** Spaced-repetition interval index (see `reviewSteps`). */
  reviewStep: number;
  /** Author-independent signal that this unit keeps going wrong. */
  weak: boolean;
  skipped: boolean;
  bookmarked: boolean;
  flaggedDifficult: boolean;
}

export function emptyUnitProgress(unitId: UnitId): UnitProgress {
  return {
    unitId,
    mastery: 'NOT_STARTED',
    bestScore: 0,
    lastScore: 0,
    attempts: 0,
    practiceCompleted: 0,
    challengeCompleted: false,
    teachingScore: null,
    lessonCompletedAt: null,
    lastStudiedAt: null,
    timeSpentSeconds: 0,
    nextReviewAt: null,
    reviewStep: 0,
    weak: false,
    skipped: false,
    bookmarked: false,
    flaggedDifficult: false,
  };
}

/* ------------------------------------------------------------------ */
/* Assessment records                                                   */
/* ------------------------------------------------------------------ */

export interface AnswerRecord {
  questionId: string;
  unitId: UnitId;
  type: QuizQuestionType;
  correct: boolean;
  /** Serialised learner response, shape depends on question type. */
  response: unknown;
  /** Seconds spent on this question. */
  seconds: number;
}

export type AssessmentKind =
  | 'quick-check'
  | 'daily-test'
  | 'unit-test'
  | 'review'
  | 'domain-exam'
  | 'final-assessment'
  | 'diagnostic';

export interface AssessmentResult {
  id: string;
  kind: AssessmentKind;
  /** ISO date (yyyy-mm-dd) the assessment belongs to. */
  date: string;
  unitIds: UnitId[];
  score: number; // 0–1
  correct: number;
  total: number;
  seconds: number;
  answers: AnswerRecord[];
  completedAt: string;
}

export interface MistakeEntry {
  id: string;
  unitId: UnitId;
  questionId: string;
  prompt: string;
  yourAnswer: string;
  correctAnswer: string;
  why: string;
  concept: string;
  createdAt: string;
  reviewAt: string;
  resolved: boolean;
  timesWrong: number;
}

/* ------------------------------------------------------------------ */
/* Gamification                                                         */
/* ------------------------------------------------------------------ */

export type XPReason =
  | 'lesson-complete'
  | 'practice-complete'
  | 'quick-check'
  | 'daily-test'
  | 'high-score-bonus'
  | 'perfect-bonus'
  | 'teaching'
  | 'challenge'
  | 'streak-milestone'
  | 'domain-complete'
  | 'domain-mastered'
  | 'review-complete'
  | 'flashcard-session'
  | 'interview-answered'
  | 'lab-complete'
  | 'achievement'
  | 'missed-test'
  | 'missed-test-overdue';

export interface XPTransaction {
  id: string;
  amount: number;
  reason: XPReason;
  detail: string;
  unitId?: UnitId;
  createdAt: string;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string | null;
  testStreak: number;
  longestTestStreak: number;
  teachingStreak: number;
  weeksActive: number;
  /** Days the learner may miss without losing the streak. */
  freezesRemaining: number;
}

export interface DisciplineState {
  /** 0–100. Rewards showing up; recovers, never spirals. */
  score: number;
  testsDue: number;
  testsCompleted: number;
  testsMissed: number;
}

/* ------------------------------------------------------------------ */
/* Planning                                                             */
/* ------------------------------------------------------------------ */

export interface DailyPlanItem {
  unitId: UnitId;
  kind: 'learn' | 'review' | 'practice' | 'catch-up';
  estimatedMinutes: number;
}

export interface DailyPlan {
  /** yyyy-mm-dd */
  date: string;
  dayNumber: number;
  items: DailyPlanItem[];
  /** Whether a daily test is expected on this date. */
  testRequired: boolean;
  totalMinutes: number;
  theme: string;
}

export interface DayActivity {
  date: string;
  unitsCompleted: number;
  xp: number;
  studySeconds: number;
  testScore: number | null;
  testTaken: boolean;
  teachBacks: number;
}

/* ------------------------------------------------------------------ */
/* Learner                                                              */
/* ------------------------------------------------------------------ */

export type StudyBudget = 30 | 60 | 120 | 180 | 240;

export type ExperienceLevel = 'complete-beginner' | 'some-python' | 'cs-student' | 'career-switcher';

export type TargetRole =
  | 'ai-ml-intern'
  | 'ml-engineer'
  | 'data-scientist'
  | 'ai-engineer'
  | 'research'
  | 'undecided';

export interface LearnerProfile {
  name: string;
  studyBudget: StudyBudget;
  /** 24h local time, e.g. "19:00". */
  preferredStudyTime: string;
  experience: ExperienceLevel;
  targetRole: TargetRole;
  onboardedAt: string | null;
  startDate: string;
  endDate: string;
  timezone: string;
}

export interface NotificationPrefs {
  enabled: boolean;
  browserPush: boolean;
  morningReminder: boolean;
  morningTime: string;
  studyReminder: boolean;
  studyTime: string;
  testReminder: boolean;
  testTime: string;
  streakReminder: boolean;
  weeklySummary: boolean;
  /** Notify when an achievement unlocks. */
  achievementAlerts: boolean;
}

export type NotificationKind =
  | 'lesson-waiting'
  | 'test-due'
  | 'revision-due'
  | 'streak-risk'
  | 'improvement'
  | 'mastery'
  | 'weak-topic'
  | 'weekly-summary'
  | 'achievement'
  | 'schedule-recalculated';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href?: string;
  createdAt: string;
  read: boolean;
  /** Notifications never nag: one per kind per day is the hard ceiling. */
  dedupeKey: string;
}

export interface NoteEntry {
  id: string;
  unitId: UnitId;
  body: string;
  updatedAt: string;
}

export interface TeachingAttempt {
  id: string;
  unitId: UnitId;
  text: string;
  score: number; // 0–1
  coverage: string[];
  missing: string[];
  feedback: string;
  clarity: number;
  createdAt: string;
}

export interface StudySession {
  id: string;
  unitId: UnitId | null;
  startedAt: string;
  seconds: number;
  kind: 'lesson' | 'practice' | 'test' | 'lab' | 'review' | 'teach';
}

export interface AchievementState {
  id: string;
  unlockedAt: string;
}

/** Everything the app persists for one learner. */
/** One graded flashcard, scheduled on the same ladder as unit review. */
export interface FlashcardReviewState {
  unitId: string;
  cardIndex: number;
  lastGrade: 'known' | 'again';
  timesSeen: number;
  timesKnown: number;
  timesAgain: number;
  reviewStep: number;
  nextReviewAt: string;
  lastReviewedAt: string;
}

/** Self-assessed confidence on one interview question. */
export type InterviewConfidence = 'confident' | 'shaky' | 'lost';

export interface InterviewAttemptState {
  unitId: string;
  questionIndex: number;
  confidence: InterviewConfidence;
  seconds: number;
  attempts: number;
  lastAttemptAt: string;
}

export interface LabProgressState {
  labId: string;
  stepsDone: number[];
  completedAt: string | null;
  seconds: number;
}

export interface LearnerState {
  profile: LearnerProfile;
  units: Record<UnitId, UnitProgress>;
  xp: number;
  xpLog: XPTransaction[];
  streak: StreakState;
  discipline: DisciplineState;
  assessments: AssessmentResult[];
  mistakes: MistakeEntry[];
  notes: NoteEntry[];
  teachingAttempts: TeachingAttempt[];
  sessions: StudySession[];
  achievements: AchievementState[];
  notifications: AppNotification[];
  notificationPrefs: NotificationPrefs;
  activity: Record<string, DayActivity>;
  /** Dates on which the learner explicitly paused the schedule. */
  pausedDates: string[];
  domainProgressCache?: Record<DomainId, number>;
  updatedAt: string;
  /** Monotonic counter used to resolve offline/online sync conflicts. */
  revision: number;
  flashcardReviews: FlashcardReviewState[];
  interviewAttempts: InterviewAttemptState[];
  labs: LabProgressState[];
}
