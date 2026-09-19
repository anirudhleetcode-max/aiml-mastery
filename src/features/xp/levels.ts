/**
 * XP levels. Titles describe growing capability rather than cartoon ranks, and
 * the curve is deliberately gentle early and long at the top: the learner
 * should feel movement in week one without the last level being trivial.
 */
export interface Level {
  level: number;
  title: string;
  subtitle: string;
  minXP: number;
}

export const LEVELS: Level[] = [
  { level: 1, title: 'AI Explorer', subtitle: 'Getting your bearings', minXP: 0 },
  { level: 2, title: 'Python Apprentice', subtitle: 'The language is becoming yours', minXP: 1_000 },
  { level: 3, title: 'Data Navigator', subtitle: 'You can move data around confidently', minXP: 3_000 },
  { level: 4, title: 'ML Apprentice', subtitle: 'First models, first intuitions', minXP: 6_500 },
  { level: 5, title: 'Model Builder', subtitle: 'You choose algorithms on purpose', minXP: 11_000 },
  { level: 6, title: 'Neural Architect', subtitle: 'Depth no longer intimidates you', minXP: 17_000 },
  { level: 7, title: 'AI Engineer', subtitle: 'You can ship what you build', minXP: 25_000 },
  { level: 8, title: 'ML Specialist', subtitle: 'Depth across every domain', minXP: 35_000 },
  { level: 9, title: 'AI Mentor', subtitle: 'You can teach this to someone else', minXP: 48_000 },
  { level: 10, title: 'AI/ML Master', subtitle: 'Understand it, build it, explain it', minXP: 65_000 },
];

export interface LevelState {
  current: Level;
  next: Level | null;
  /** 0–1 progress through the current level. 1 when max level is reached. */
  progress: number;
  xpIntoLevel: number;
  xpForLevel: number;
  xpToNext: number;
}

export function levelFor(xp: number): LevelState {
  const safeXP = Math.max(0, Math.floor(xp));
  let index = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (safeXP >= LEVELS[i]!.minXP) {
      index = i;
      break;
    }
  }
  const current = LEVELS[index]!;
  const next = LEVELS[index + 1] ?? null;
  if (!next) {
    return { current, next: null, progress: 1, xpIntoLevel: safeXP - current.minXP, xpForLevel: 0, xpToNext: 0 };
  }
  const xpForLevel = next.minXP - current.minXP;
  const xpIntoLevel = safeXP - current.minXP;
  return {
    current,
    next,
    progress: Math.min(1, xpIntoLevel / xpForLevel),
    xpIntoLevel,
    xpForLevel,
    xpToNext: next.minXP - safeXP,
  };
}
