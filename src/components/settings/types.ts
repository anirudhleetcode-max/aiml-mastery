import type { DomainId } from '@/types/curriculum';
import type {
  ExperienceLevel,
  MasteryLevel,
  NotificationPrefs,
  StudyBudget,
  TargetRole,
} from '@/types/progress';

/**
 * Everything the settings page ships to the browser.
 *
 * The server does all of the curriculum work — schedules are built for each
 * budget, units are projected down to a handful of fields — so the client
 * never sees the full curriculum.
 */

export interface BudgetPace {
  budget: StudyBudget;
  /** Units the plan expects on a typical study day. */
  unitsPerDay: number;
  /** Average minutes a study day actually asks for, test time included. */
  averageMinutes: number;
  studyDays: number;
  /** True when the curriculum does not fit before the deadline at this budget. */
  compressed: boolean;
}

export interface ScheduleDay {
  /** yyyy-mm-dd */
  date: string;
  units: number;
  minutes: number;
  paused: boolean;
  weekend: boolean;
}

export interface ScheduleSummary {
  today: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  studyDays: number;
  averageMinutes: number;
  totalUnits: number;
  completedUnits: number;
  remainingUnits: number;
  daysRemaining: number;
  compressed: boolean;
  /** The next few weeks, so a date can be paused before it arrives. */
  upcoming: ScheduleDay[];
  /** Paused dates that fall outside the upcoming window, so none get stranded. */
  pausedElsewhere: ScheduleDay[];
}

export interface DataSummary {
  email: string;
  totalUnits: number;
  unitsCompleted: number;
  unitsInProgress: number;
  unitsMastered: number;
  testsTaken: number;
  notes: number;
  mistakes: number;
  mistakesUnresolved: number;
  teachBacks: number;
  sessions: number;
  studyMinutes: number;
  achievements: number;
  xp: number;
}

/** A unit with recorded progress — the only kind a reset can affect. */
export interface ResettableUnit {
  id: string;
  title: string;
  slug: string;
  domain: DomainId;
  module: string;
  topic: string;
  mastery: MasteryLevel;
  attempts: number;
  bestScore: number;
  practiceCompleted: number;
  challengeCompleted: boolean;
  taught: boolean;
  completed: boolean;
  hasNote: boolean;
  minutesSpent: number;
}

export interface SettingsData {
  profile: {
    name: string;
    studyBudget: StudyBudget;
    preferredStudyTime: string;
    experience: ExperienceLevel;
    targetRole: TargetRole;
    timezone: string;
  };
  /** The appearance choices stored on the account, as opposed to on this device. */
  settings: {
    theme: 'dark' | 'light' | 'system';
    reduceMotion: boolean;
    highContrast: boolean;
    fontScale: number;
  };
  notifications: NotificationPrefs;
  unreadNotifications: number;
  budgets: BudgetPace[];
  schedule: ScheduleSummary;
  data: DataSummary;
  resettable: ResettableUnit[];
}

const TIME_PATTERN = /^\d{2}:\d{2}$/;

/** The sync protocol only accepts HH:MM, so a half-typed time is never sent. */
export function isTime(value: string): boolean {
  return TIME_PATTERN.test(value);
}
