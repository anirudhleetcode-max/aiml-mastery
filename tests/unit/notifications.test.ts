import { describe, expect, it } from 'vitest';
import { computeDueNotifications } from '@/features/notifications/engine';
import type { Overview } from '@/features/progress/overview';
import type { FullState } from '@/lib/sync/state';
import type { NotificationKind } from '@/types/progress';

/**
 * Which notifications are warranted, and — more importantly — which are not.
 *
 * The rule this engine exists to keep is that nothing is sent that the learner
 * switched off, and nothing is sent twice in a day. The second is enforced by
 * a unique constraint on the dedupe key rather than by discipline, so these
 * tests check the key contains the date; the first is checked switch by
 * switch, because a preference that silently does nothing is worse than no
 * preference at all.
 */

const TODAY = '2026-09-20';

const PREFS = {
  enabled: true,
  browserPush: false,
  morningReminder: true,
  morningTime: '08:00',
  studyReminder: true,
  studyTime: '19:00',
  testReminder: true,
  testTime: '20:00',
  streakReminder: true,
  weeklySummary: true,
  achievementAlerts: true,
  goalReminder: true,
};

function state(over: Partial<FullState> = {}): FullState {
  return {
    notificationPrefs: { ...PREFS },
    profile: { startDate: '2026-09-01' },
    streak: { current: 0, longest: 0, lastActiveDate: null, freezesRemaining: 2 },
    units: {},
    assessments: [],
    activity: {},
    achievements: [],
    ...over,
  } as unknown as FullState;
}

function overview(over: Partial<Overview> = {}): Overview {
  return {
    today: TODAY,
    todayPlan: [],
    todayTestDone: true,
    dueReviews: [],
    weakUnits: [],
    pace: { status: 'on-track', delta: 0 },
    goals: {
      dailyUnits: { current: 0, target: 1, progress: 0, met: false },
      dailyMinutes: { current: 0, target: 60, progress: 0, met: false },
      weeklyUnits: { current: 0, target: 7, progress: 0, met: false },
      weeklyActiveDays: { current: 0, target: 5, progress: 0, met: false },
      dayComplete: true,
    },
    ...over,
  } as unknown as Overview;
}

const kinds = (s: FullState, o: Overview): NotificationKind[] =>
  computeDueNotifications(s, o).map((c) => c.kind);

const unit = (id: string, title: string) => ({
  unit: { id, title, slug: title.toLowerCase().replace(/\s+/g, '-'), domain: 'python' },
  progress: { attempts: 3, bestScore: 0.5, nextReviewAt: '2026-09-18' },
});

describe('the master switch', () => {
  it('silences everything when notifications are off', () => {
    const s = state({ notificationPrefs: { ...PREFS, enabled: false } } as Partial<FullState>);
    const o = overview({ todayPlan: [{ unit: { id: 'PY-001', title: 'X', slug: 'x' }, done: false }] } as Partial<Overview>);
    expect(computeDueNotifications(s, o)).toEqual([]);
  });
});

describe('every kind is reachable, and every switch works', () => {
  it('notifies about unfinished work in today’s plan', () => {
    const o = overview({
      todayPlan: [{ unit: { id: 'PY-001', title: 'Variables', slug: 'variables', estimatedMinutes: 30 }, done: false }],
    } as unknown as Partial<Overview>);
    expect(kinds(state(), o)).toContain('lesson-waiting');
    expect(kinds(state({ notificationPrefs: { ...PREFS, studyReminder: false } } as Partial<FullState>), o)).not.toContain(
      'lesson-waiting',
    );
  });

  it('notifies about the daily test only once some work is done', () => {
    const done = { unit: { id: 'PY-001', title: 'V', slug: 'v', estimatedMinutes: 30 }, done: true };
    const o = overview({ todayTestDone: false, todayPlan: [done] } as unknown as Partial<Overview>);
    expect(kinds(state(), o)).toContain('test-due');
    // Nothing studied yet — the test reminder would be premature.
    const untouched = overview({ todayTestDone: false, todayPlan: [] });
    expect(kinds(state(), untouched)).not.toContain('test-due');
    expect(kinds(state({ notificationPrefs: { ...PREFS, testReminder: false } } as Partial<FullState>), o)).not.toContain(
      'test-due',
    );
  });

  it('warns about a streak only when one exists and is at risk', () => {
    const atRisk = state({ streak: { current: 9, longest: 9, lastActiveDate: '2026-09-18', freezesRemaining: 0 } } as Partial<FullState>);
    expect(kinds(atRisk, overview())).toContain('streak-risk');

    const noStreak = state({ streak: { current: 0, longest: 4, lastActiveDate: '2026-09-18', freezesRemaining: 2 } } as Partial<FullState>);
    expect(kinds(noStreak, overview())).not.toContain('streak-risk');
  });

  it('notifies about reviews that have come due', () => {
    const o = overview({ dueReviews: [unit('PY-002', 'Loops')] } as unknown as Partial<Overview>);
    expect(kinds(state(), o)).toContain('revision-due');
    expect(kinds(state({ notificationPrefs: { ...PREFS, studyReminder: false } } as Partial<FullState>), o)).not.toContain(
      'revision-due',
    );
  });

  it('notifies about an achievement unlocked today, and not one from last week', () => {
    const todayUnlock = state({ achievements: [{ id: 'first-lesson', unlockedAt: `${TODAY}T09:00:00.000Z` }] } as Partial<FullState>);
    expect(kinds(todayUnlock, overview())).toContain('achievement');

    const old = state({ achievements: [{ id: 'first-lesson', unlockedAt: '2026-09-10T09:00:00.000Z' }] } as Partial<FullState>);
    expect(kinds(old, overview())).not.toContain('achievement');

    const off = state({
      achievements: [{ id: 'first-lesson', unlockedAt: `${TODAY}T09:00:00.000Z` }],
      notificationPrefs: { ...PREFS, achievementAlerts: false },
    } as Partial<FullState>);
    expect(kinds(off, overview())).not.toContain('achievement');
  });

  it('nudges about the day’s goal only once the learner has started', () => {
    const started = overview({
      goals: {
        dailyUnits: { current: 1, target: 3, progress: 0.33, met: false },
        dailyMinutes: { current: 20, target: 60, progress: 0.33, met: false },
        weeklyUnits: { current: 1, target: 7, progress: 0.14, met: false },
        weeklyActiveDays: { current: 1, target: 5, progress: 0.2, met: false },
        dayComplete: false,
      },
    } as unknown as Partial<Overview>);
    expect(kinds(state(), started)).toContain('goal-progress');

    // Not opened today: `lesson-waiting` already covers that case, and two
    // messages about the same silence is nagging.
    const untouched = overview({
      goals: {
        dailyUnits: { current: 0, target: 3, progress: 0, met: false },
        dailyMinutes: { current: 0, target: 60, progress: 0, met: false },
        weeklyUnits: { current: 0, target: 7, progress: 0, met: false },
        weeklyActiveDays: { current: 0, target: 5, progress: 0, met: false },
        dayComplete: false,
      },
    } as unknown as Partial<Overview>);
    expect(kinds(state(), untouched)).not.toContain('goal-progress');

    expect(kinds(state({ notificationPrefs: { ...PREFS, goalReminder: false } } as Partial<FullState>), started)).not.toContain(
      'goal-progress',
    );
  });

  it('flags a topic that keeps going wrong', () => {
    const o = overview({ weakUnits: [unit('PY-003', 'Dicts')] } as unknown as Partial<Overview>);
    expect(kinds(state(), o)).toContain('weak-topic');
  });

  it('says the plan was rebuilt when the learner is behind', () => {
    const o = overview({ pace: { status: 'behind', delta: -4 } } as unknown as Partial<Overview>);
    expect(kinds(state(), o)).toContain('schedule-recalculated');
  });
});

describe('deduplication is structural', () => {
  it('puts the date in every dedupe key, so at most one of a kind lands per day', () => {
    const s = state({
      streak: { current: 9, longest: 9, lastActiveDate: '2026-09-18', freezesRemaining: 0 },
      achievements: [{ id: 'first-lesson', unlockedAt: `${TODAY}T09:00:00.000Z` }],
    } as Partial<FullState>);
    const o = overview({
      todayTestDone: false,
      todayPlan: [{ unit: { id: 'PY-001', title: 'V', slug: 'v', estimatedMinutes: 30 }, done: false }],
      dueReviews: [unit('PY-002', 'Loops')],
      weakUnits: [unit('PY-003', 'Dicts')],
      pace: { status: 'behind', delta: -4 },
    } as unknown as Partial<Overview>);

    const candidates = computeDueNotifications(s, o);
    expect(candidates.length).toBeGreaterThan(3);
    for (const c of candidates) {
      // Either the date itself, or the ISO week it belongs to.
      expect(c.dedupeKey).toMatch(/2026-09-\d{2}/);
    }
    expect(new Set(candidates.map((c) => c.dedupeKey)).size).toBe(candidates.length);
  });

  it('gives every candidate somewhere to go', () => {
    const o = overview({
      todayPlan: [{ unit: { id: 'PY-001', title: 'V', slug: 'v', estimatedMinutes: 30 }, done: false }],
      dueReviews: [unit('PY-002', 'Loops')],
    } as unknown as Partial<Overview>);
    for (const c of computeDueNotifications(state(), o)) {
      expect(c.href, `${c.kind} has no destination`).toBeTruthy();
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.body.length).toBeGreaterThan(0);
    }
  });
});

describe('before the course starts', () => {
  it('says nothing about lessons, tests or reviews', () => {
    const s = state({ profile: { startDate: '2026-12-01' } } as Partial<FullState>);
    const o = overview({
      todayTestDone: false,
      todayPlan: [{ unit: { id: 'PY-001', title: 'V', slug: 'v', estimatedMinutes: 30 }, done: false }],
      dueReviews: [unit('PY-002', 'Loops')],
    } as unknown as Partial<Overview>);
    const k = kinds(s, o);
    expect(k).not.toContain('lesson-waiting');
    expect(k).not.toContain('test-due');
    expect(k).not.toContain('revision-due');
  });
});
