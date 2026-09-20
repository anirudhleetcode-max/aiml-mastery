import { prisma } from '@/lib/db';
import type { Overview } from '@/features/progress/overview';
import type { FullState } from '@/lib/sync/state';
import { isStreakAtRisk } from '@/features/streak/streak';
import { addDays, dateKey, daysBetween, pct } from '@/lib/format';
import type { NotificationKind } from '@/types/progress';

interface Candidate {
  kind: NotificationKind;
  title: string;
  body: string;
  href?: string;
  /** Dedupe key. Including the date makes "one per kind per day" structural. */
  dedupeKey: string;
}

/**
 * Works out which notifications are genuinely warranted right now.
 *
 * Two rules the spec is emphatic about, both enforced here rather than left to
 * discipline: nothing is sent that the learner has switched off, and the
 * dedupe key always contains the date, so the database's unique constraint
 * makes more than one notification of a kind per day impossible rather than
 * merely unlikely.
 */
export function computeDueNotifications(state: FullState, o: Overview): Candidate[] {
  const prefs = state.notificationPrefs;
  if (!prefs.enabled) return [];

  const today = o.today;
  const out: Candidate[] = [];
  const beforeStart = today < state.profile.startDate;

  /* ---- today's work is waiting ---- */
  if (!beforeStart && prefs.studyReminder) {
    const unfinished = o.todayPlan.filter((t) => !t.done);
    if (unfinished.length > 0) {
      const first = unfinished[0]!;
      out.push({
        kind: 'lesson-waiting',
        title: `${first.unit.title} is waiting`,
        body:
          unfinished.length === 1
            ? `About ${first.unit.estimatedMinutes} minutes. That is today's plan done.`
            : `${unfinished.length} units planned for today, starting with this one.`,
        href: `/learn/${first.unit.slug}`,
        dedupeKey: `lesson-waiting-${today}`,
      });
    }
  }

  /* ---- the daily test ---- */
  if (!beforeStart && prefs.testReminder && !o.todayTestDone && o.todayPlan.some((t) => t.done)) {
    out.push({
      kind: 'test-due',
      title: "Today's test is still waiting",
      body: 'It is drawn only from what you covered today, and it is what protects your streak.',
      href: '/tests/daily',
      dedupeKey: `test-due-${today}`,
    });
  }

  /* ---- streak at risk ---- */
  if (prefs.streakReminder && state.streak.current > 0 && isStreakAtRisk(state.streak, today)) {
    const gap = state.streak.lastActiveDate ? daysBetween(state.streak.lastActiveDate, today) : 0;
    const willBreak = gap >= 2 && state.streak.freezesRemaining === 0;
    out.push({
      kind: 'streak-risk',
      title: `Your ${state.streak.current}-day streak is at risk`,
      body: willBreak
        ? 'One session today keeps it. Without one it resets tonight.'
        : `A session today keeps it going. You have ${state.streak.freezesRemaining} freeze${state.streak.freezesRemaining === 1 ? '' : 's'} left if today is impossible.`,
      href: '/today',
      dedupeKey: `streak-risk-${today}`,
    });
  }

  /* ---- a topic that keeps going wrong ---- */
  if (o.weakUnits.length > 0) {
    const worst = o.weakUnits[0]!;
    if (worst.progress.attempts >= 2) {
      out.push({
        kind: 'weak-topic',
        title: `${worst.unit.title} needs another pass`,
        body: `Best ${pct(worst.progress.bestScore)} over ${worst.progress.attempts} attempts. A guided re-teach starts from the analogy rather than repeating the test.`,
        href: `/learn/${worst.unit.slug}#intuition`,
        dedupeKey: `weak-topic-${worst.unit.id}-${today}`,
      });
    }
  }

  /* ---- genuine improvement, worth noticing ---- */
  const thisWeek = averageScoreBetween(state, addDays(today, -6), today);
  const lastWeek = averageScoreBetween(state, addDays(today, -13), addDays(today, -7));
  if (thisWeek.count >= 2 && lastWeek.count >= 2) {
    const delta = thisWeek.average - lastWeek.average;
    if (delta >= 0.05) {
      out.push({
        kind: 'improvement',
        title: `Your average improved by ${Math.round(delta * 100)}%`,
        body: `${pct(thisWeek.average)} this week against ${pct(lastWeek.average)} last week. Whatever changed, keep doing it.`,
        href: '/analytics',
        dedupeKey: `improvement-${today}`,
      });
    }
  }

  /* ---- mastery in the last week ---- */
  const masteredThisWeek = Object.values(state.units).filter(
    (u) =>
      (u.mastery === 'MASTERED' || u.mastery === 'TEACHER') &&
      u.lastStudiedAt &&
      daysBetween(dateKey(new Date(u.lastStudiedAt)), today) <= 7,
  ).length;
  if (masteredThisWeek >= 3) {
    out.push({
      kind: 'mastery',
      title: `You have mastered ${masteredThisWeek} concepts this week`,
      body: 'Mastered means evidence, not exposure — scores held, practice done, and it stuck on a second attempt.',
      href: '/analytics',
      dedupeKey: `mastery-week-${weekKey(today)}`,
    });
  }

  /* ---- weekly summary, on Sundays only ---- */
  if (prefs.weeklySummary && new Date(today).getDay() === 0) {
    const week = averageScoreBetween(state, addDays(today, -6), today);
    const units = Object.values(state.activity)
      .filter((a) => a.date >= addDays(today, -6) && a.date <= today)
      .reduce((acc, a) => acc + a.unitsCompleted, 0);
    if (units > 0 || week.count > 0) {
      out.push({
        kind: 'weekly-summary',
        title: 'Your week in review',
        body: `${units} unit${units === 1 ? '' : 's'} completed${week.count > 0 ? `, averaging ${pct(week.average)} across ${week.count} test${week.count === 1 ? '' : 's'}` : ''}.`,
        href: '/analytics',
        dedupeKey: `weekly-summary-${weekKey(today)}`,
      });
    }
  }

  /* ---- behind schedule, with a plan rather than a scolding ---- */
  if (o.pace.status === 'behind') {
    out.push({
      kind: 'schedule-recalculated',
      title: 'Your plan has been rebuilt',
      body: `${Math.abs(o.pace.delta)} concepts behind. The plan now leads with the units that unblock the most later work, rather than piling everything onto tomorrow.`,
      href: '/today',
      dedupeKey: `recalculated-${weekKey(today)}`,
    });
  }

  return out;
}

function averageScoreBetween(state: FullState, from: string, to: string): { average: number; count: number } {
  const inRange = state.assessments.filter((a) => a.date >= from && a.date <= to && a.kind !== 'quick-check');
  if (inRange.length === 0) return { average: 0, count: 0 };
  return { average: inRange.reduce((a, x) => a + x.score, 0) / inRange.length, count: inRange.length };
}

function weekKey(date: string): string {
  const d = new Date(date);
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return dateKey(monday);
}

/**
 * Persists any warranted notifications. The unique (userId, dedupeKey)
 * constraint does the deduplication, so calling this on every page load is
 * safe and cheap.
 */
export async function refreshNotifications(userId: string, state: FullState, o: Overview): Promise<number> {
  const candidates = computeDueNotifications(state, o);
  if (candidates.length === 0) return 0;

  // Never dump a pile of notifications at once: at most three per refresh,
  // highest-priority first.
  const priority: NotificationKind[] = [
    'streak-risk',
    'test-due',
    'weak-topic',
    'lesson-waiting',
    'schedule-recalculated',
    'weekly-summary',
    'improvement',
    'mastery',
  ];
  const ordered = [...candidates].sort(
    (a, b) => priority.indexOf(a.kind) - priority.indexOf(b.kind),
  );

  // Upsert rather than create-and-catch. The unique constraint is the dedupe
  // mechanism, but letting it *throw* on every page load buried real errors in
  // a stream of expected ones — an update that changes nothing is silent.
  let created = 0;
  for (const c of ordered.slice(0, 3)) {
    const result = await prisma.notification.upsert({
      where: { userId_dedupeKey: { userId, dedupeKey: c.dedupeKey } },
      update: {},
      create: {
        id: `ntf_${c.dedupeKey}`.slice(0, 80),
        userId,
        kind: c.kind,
        title: c.title,
        body: c.body,
        href: c.href ?? null,
        dedupeKey: c.dedupeKey,
      },
      select: { createdAt: true },
    });
    // Newly created rows have a timestamp from this moment.
    if (Date.now() - result.createdAt.getTime() < 5_000) created += 1;
  }
  return created;
}
