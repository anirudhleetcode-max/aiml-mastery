import { ACHIEVEMENTS } from '@/data/achievements';
import type { DomainId } from '@/types/curriculum';
import type { LearnerState } from '@/types/progress';

export interface AchievementProgress {
  id: string;
  unlocked: boolean;
  /** 0–1 toward unlocking. */
  progress: number;
  progressLabel: string;
}

export interface AchievementContext {
  state: LearnerState;
  completedUnits: number;
  masteredUnits: number;
  teacherUnits: number;
  totalUnits: number;
  completedDomains: Set<DomainId>;
  effectiveStreak: number;
  bestTestScore: number;
  now?: Date;
}

/**
 * Evaluates every achievement against current state. Returns progress for all
 * of them, not just unlocked ones, so the achievements page can show how close
 * the learner is rather than only what they have.
 */
export function evaluateAchievements(ctx: AchievementContext): AchievementProgress[] {
  const { state } = ctx;
  const out: AchievementProgress[] = [];
  const unlocked = new Set(state.achievements.map((a) => a.id));

  const ratio = (value: number, target: number) => ({
    progress: Math.min(1, target === 0 ? 0 : value / target),
    progressLabel: `${Math.min(value, target)} / ${target}`,
  });

  const notesUnits = new Set(state.notes.filter((n) => n.body.trim().length > 0).map((n) => n.unitId)).size;
  const resolvedMistakes = state.mistakes.filter((m) => m.resolved).length;

  for (const a of ACHIEVEMENTS) {
    let r: { progress: number; progressLabel: string };

    if (a.id.startsWith('domain-')) {
      const domain = a.id.slice('domain-'.length) as DomainId;
      const done = ctx.completedDomains.has(domain);
      r = { progress: done ? 1 : 0, progressLabel: done ? 'Complete' : 'In progress' };
    } else if (a.id.startsWith('streak-')) {
      r = ratio(Math.max(ctx.effectiveStreak, state.streak.longest), Number(a.id.slice('streak-'.length)));
    } else if (a.id.startsWith('units-')) {
      const target = a.id === 'units-214' ? ctx.totalUnits : Number(a.id.slice('units-'.length));
      r = ratio(ctx.completedUnits, target);
    } else if (a.id.startsWith('mastered-')) {
      r = ratio(ctx.masteredUnits, Number(a.id.slice('mastered-'.length)));
    } else if (a.id.startsWith('teacher-') && a.id !== 'teacher-challenge') {
      r = ratio(ctx.teacherUnits, Number(a.id.slice('teacher-'.length)));
    } else {
      switch (a.id) {
        case 'first-lesson':
          r = ratio(Math.min(1, ctx.completedUnits), 1);
          break;
        case 'first-test':
          r = ratio(Math.min(1, state.assessments.length), 1);
          break;
        case 'perfect-test':
          r = { progress: ctx.bestTestScore >= 1 ? 1 : ctx.bestTestScore, progressLabel: `Best ${Math.round(ctx.bestTestScore * 100)}%` };
          break;
        case 'first-teaching':
          r = ratio(Math.min(1, state.teachingAttempts.length), 1);
          break;
        case 'first-challenge':
          r = ratio(Math.min(1, Object.values(state.units).filter((u) => u.challengeCompleted).length), 1);
          break;
        case 'note-taker':
          r = ratio(notesUnits, 20);
          break;
        case 'mistake-slayer':
          r = ratio(resolvedMistakes, 25);
          break;
        case 'final-assessment': {
          const best = state.assessments.filter((x) => x.kind === 'final-assessment').reduce((m, x) => Math.max(m, x.score), 0);
          r = { progress: best >= 0.85 ? 1 : best, progressLabel: best > 0 ? `Best ${Math.round(best * 100)}%` : 'Not attempted' };
          break;
        }
        default:
          r = { progress: unlocked.has(a.id) ? 1 : 0, progressLabel: unlocked.has(a.id) ? 'Unlocked' : 'Locked' };
      }
    }

    out.push({ id: a.id, unlocked: unlocked.has(a.id) || r.progress >= 1, ...r });
  }

  return out;
}

/** Achievements newly satisfied but not yet recorded. */
export function newlyUnlocked(ctx: AchievementContext): string[] {
  const recorded = new Set(ctx.state.achievements.map((a) => a.id));
  return evaluateAchievements(ctx)
    .filter((a) => a.progress >= 1 && !recorded.has(a.id))
    .map((a) => a.id);
}
