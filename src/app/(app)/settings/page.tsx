import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { computeMastery, requirementsFor } from '@/features/progress/mastery';
import { buildSchedule, COURSE_END, COURSE_START } from '@/features/scheduling/planner';
import { ALL_UNITS, allUnitMeta } from '@/data/curriculum';
import { addDays, daysBetween, isWeekend } from '@/lib/format';
import { SettingsView } from '@/components/settings/settings-view';
import type { BudgetPace, ResettableUnit, ScheduleDay, SettingsData } from '@/components/settings/types';
import type { StudyBudget } from '@/types/progress';

export const metadata: Metadata = { title: 'Settings' };
export const dynamic = 'force-dynamic';

const BUDGET_VALUES: StudyBudget[] = [30, 60, 120, 180, 240];
/** How far ahead the pause picker reaches. Far enough to plan a trip, short enough to scan. */
const PAUSE_WINDOW_DAYS = 28;

export default async function SettingsPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);
  const meta = allUnitMeta();
  const startDate = state.profile.startDate || COURSE_START;
  const endDate = state.profile.endDate || COURSE_END;

  /* ---- what each budget would actually ask of them ---- */
  const budgets: BudgetPace[] = BUDGET_VALUES.map((budget) => {
    const schedule = buildSchedule(meta, {
      startDate,
      endDate,
      dailyMinutes: budget,
      pausedDates: state.pausedDates,
    });
    return {
      budget,
      unitsPerDay: Number((meta.length / Math.max(1, schedule.studyDays)).toFixed(1)),
      averageMinutes: schedule.averageMinutesPerDay,
      studyDays: schedule.studyDays,
      compressed: schedule.compressed,
    };
  });

  /* ---- the days they can still pause ---- */
  const pausedSet = new Set(state.pausedDates);
  const today = o.today;
  const upcoming: ScheduleDay[] = [];
  const daysToEnd = daysBetween(today, endDate);
  for (let i = 0; i <= Math.min(PAUSE_WINDOW_DAYS, Math.max(-1, daysToEnd)); i++) {
    const date = addDays(today, i);
    const plan = o.schedule.byDate.get(date);
    upcoming.push({
      date,
      units: plan?.items.length ?? 0,
      minutes: plan?.totalMinutes ?? 0,
      paused: pausedSet.has(date),
      weekend: isWeekend(date),
    });
  }
  const upcomingDates = new Set(upcoming.map((d) => d.date));
  const pausedElsewhere: ScheduleDay[] = state.pausedDates
    .filter((date) => !upcomingDates.has(date))
    .sort()
    .map((date) => ({ date, units: 0, minutes: 0, paused: true, weekend: isWeekend(date) }));

  /* ---- only units with something recorded can be reset ---- */
  const notedUnits = new Set(state.notes.map((n) => n.unitId));
  const resettable: ResettableUnit[] = ALL_UNITS.flatMap((u) => {
    const p = state.units[u.id];
    if (!p) return [];
    const touched =
      Boolean(p.lessonCompletedAt) ||
      p.attempts > 0 ||
      p.practiceCompleted > 0 ||
      p.challengeCompleted ||
      p.teachingScore !== null;
    if (!touched) return [];
    return [
      {
        id: u.id,
        title: u.title,
        slug: u.slug,
        domain: u.domain,
        module: u.module,
        topic: u.topic,
        mastery: computeMastery(p, requirementsFor(u)),
        attempts: p.attempts,
        bestScore: p.bestScore,
        practiceCompleted: p.practiceCompleted,
        challengeCompleted: p.challengeCompleted,
        taught: p.teachingScore !== null,
        completed: Boolean(p.lessonCompletedAt),
        hasNote: notedUnits.has(u.id),
        minutesSpent: Math.round(p.timeSpentSeconds / 60),
      },
    ];
  });

  const data: SettingsData = {
    profile: {
      name: state.profile.name,
      studyBudget: state.profile.studyBudget,
      preferredStudyTime: state.profile.preferredStudyTime,
      experience: state.profile.experience,
      targetRole: state.profile.targetRole,
      timezone: state.profile.timezone,
    },
    settings: state.settings,
    notifications: state.notificationPrefs,
    unreadNotifications: state.notifications.filter((n) => !n.read).length,
    budgets,
    schedule: {
      today,
      startDate,
      endDate,
      totalDays: o.schedule.totalDays,
      studyDays: o.schedule.studyDays,
      averageMinutes: o.schedule.averageMinutesPerDay,
      totalUnits: o.totals.total,
      completedUnits: o.totals.completed,
      remainingUnits: o.totals.remaining,
      daysRemaining: o.pace.daysRemaining,
      compressed: o.schedule.compressed,
      upcoming,
      pausedElsewhere,
    },
    data: {
      email: state.email,
      totalUnits: o.totals.total,
      unitsCompleted: o.totals.completed,
      unitsInProgress: o.totals.inProgress,
      unitsMastered: o.totals.mastered,
      testsTaken: state.assessments.length,
      notes: state.notes.length,
      mistakes: state.mistakes.length,
      mistakesUnresolved: state.mistakes.filter((m) => !m.resolved).length,
      teachBacks: state.teachingAttempts.length,
      sessions: state.sessions.length,
      studyMinutes: Math.round(o.totals.totalStudySeconds / 60),
      achievements: state.achievements.length,
      xp: state.xp,
    },
    resettable,
  };

  return <SettingsView data={data} />;
}
