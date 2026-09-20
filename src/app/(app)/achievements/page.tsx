import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  Award,
  Binary,
  Boxes,
  Brain,
  CheckCheck,
  ClipboardCheck,
  Code2,
  Crown,
  Database,
  Dices,
  Eraser,
  Eye,
  Flame,
  Gem,
  GraduationCap,
  Grid3x3,
  Hammer,
  LineChart,
  Lock,
  MessageSquareText,
  Milestone,
  Moon,
  Network,
  NotebookPen,
  Presentation,
  RotateCcw,
  Sigma,
  Sparkles,
  Sunrise,
  Table2,
  Target,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview, completedDomains } from '@/features/progress/overview';
import { evaluateAchievements, type AchievementProgress } from '@/features/progress/achievements';
import { ACHIEVEMENTS, TIER_STYLES, type Achievement } from '@/data/achievements';
import { Badge } from '@/components/ui/badge';
import { Stat, SectionHeading } from '@/components/ui/misc';
import { ProgressBar } from '@/components/ui/progress';
import { formatXP, relativeTime } from '@/lib/format';
import { cn } from '@/lib/cn';

export const metadata: Metadata = { title: 'Achievements' };
export const dynamic = 'force-dynamic';

/**
 * Explicit rather than a dynamic lookup: the bundler can then tree-shake every
 * icon the registry does not actually name, and a renamed icon fails loudly
 * here instead of quietly rendering nothing.
 */
const ICONS: Record<string, LucideIcon> = {
  Award,
  Binary,
  Boxes,
  Brain,
  CheckCheck,
  ClipboardCheck,
  Code2,
  Crown,
  Database,
  Dices,
  Eraser,
  Eye,
  Flame,
  Gem,
  GraduationCap,
  Grid3x3,
  Hammer,
  LineChart,
  MessageSquareText,
  Milestone,
  Moon,
  Network,
  NotebookPen,
  Presentation,
  RotateCcw,
  Sigma,
  Sparkles,
  Sunrise,
  Table2,
  Target,
  Trophy,
};

const GROUPS: { id: Achievement['group']; title: string; description: string }[] = [
  { id: 'milestones', title: 'Milestones', description: 'The markers along the way from the first lesson to the last.' },
  { id: 'streaks', title: 'Streaks', description: 'What showing up repeatedly, rather than heroically, earns.' },
  { id: 'mastery', title: 'Mastery', description: 'Depth rather than coverage: units you have genuinely made yours.' },
  { id: 'domains', title: 'Domains', description: 'One badge for finishing every unit in a domain.' },
  { id: 'teaching', title: 'Teaching', description: 'Explaining a thing well is the last step of learning it.' },
  { id: 'craft', title: 'Craft', description: 'Habits around the work: notes, corrections, and coming back.' },
];

export default async function AchievementsPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);

  // The same context `grantAchievements` builds when it writes unlocks.
  const evaluated = evaluateAchievements({
    state,
    completedUnits: o.totals.completed,
    masteredUnits: o.totals.mastered,
    teacherUnits: o.totals.teacher,
    totalUnits: o.totals.total,
    completedDomains: completedDomains(o),
    effectiveStreak: o.streak,
    bestTestScore: state.assessments.reduce((m, a) => Math.max(m, a.score), 0),
  });

  const progressById = new Map<string, AchievementProgress>(evaluated.map((a) => [a.id, a]));
  const unlockedAt = new Map(state.achievements.map((a) => [a.id, a.unlockedAt]));

  const unlockedCount = evaluated.filter((a) => a.unlocked).length;
  const earnedXp = ACHIEVEMENTS.reduce((sum, a) => (progressById.get(a.id)?.unlocked ? sum + a.xp : sum), 0);
  const totalXp = ACHIEVEMENTS.reduce((sum, a) => sum + a.xp, 0);

  // Closest thing still to earn. Secret ones are left out: naming them would
  // give away the very thing that makes them secret.
  const nextUp = ACHIEVEMENTS.filter((a) => !a.secret && !progressById.get(a.id)?.unlocked)
    .map((a) => ({ achievement: a, progress: progressById.get(a.id)! }))
    .sort((x, y) => y.progress.progress - x.progress.progress || x.achievement.xp - y.achievement.xp)[0];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Achievements</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          A record of what you have actually done, not a scoreboard. Locked entries show how far along you are, so
          the next one is always a known distance away.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat
          label="Unlocked"
          value={`${unlockedCount} / ${ACHIEVEMENTS.length}`}
          icon={<Trophy size={14} />}
          sub={`${Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}% of the set`}
        />
        <Stat
          label="XP from achievements"
          value={formatXP(earnedXp)}
          tone="xp"
          sub={`of ${formatXP(totalXp)} available`}
        />
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-subtle">Closest to unlocking</p>
          {nextUp ? (
            <>
              <p className="mt-2 text-[14px] font-semibold text-ink">{nextUp.achievement.name}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-subtle">{nextUp.achievement.description}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <ProgressBar
                  value={nextUp.progress.progress}
                  size="sm"
                  label={`${nextUp.achievement.name} progress`}
                />
                <span className="shrink-0 text-[11.5px] tabular-nums text-subtle">
                  {nextUp.progress.progressLabel}
                </span>
              </div>
            </>
          ) : (
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Everything on the board is unlocked. There is nothing left to chase.
            </p>
          )}
        </div>
      </div>

      {GROUPS.map((group) => {
        const all = ACHIEVEMENTS.filter((a) => a.group === group.id);
        const shown = all.filter((a) => !a.secret || progressById.get(a.id)?.unlocked);
        const hidden = all.length - shown.length;
        const groupUnlocked = all.filter((a) => progressById.get(a.id)?.unlocked).length;
        if (all.length === 0) return null;

        return (
          <section key={group.id} className="rounded-xl border border-line bg-surface p-5">
            <SectionHeading
              as="h2"
              title={group.title}
              description={group.description}
              action={
                <Badge tone={groupUnlocked === all.length ? 'success' : 'neutral'}>
                  {groupUnlocked} / {all.length}
                </Badge>
              }
            />
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((a) => (
                <li key={a.id}>
                  <AchievementCard
                    achievement={a}
                    progress={progressById.get(a.id)}
                    unlockedAt={unlockedAt.get(a.id)}
                  />
                </li>
              ))}
              {hidden > 0 && (
                <li>
                  <SecretSlot count={hidden} />
                </li>
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function AchievementCard({
  achievement,
  progress,
  unlockedAt,
}: {
  achievement: Achievement;
  progress?: AchievementProgress;
  unlockedAt?: string;
}) {
  const unlocked = Boolean(progress?.unlocked);
  const tier = TIER_STYLES[achievement.tier];
  const Icon = ICONS[achievement.icon] ?? Award;

  return (
    <article
      aria-label={`${achievement.name}, ${unlocked ? 'unlocked' : 'locked'}`}
      className={cn(
        'flex h-full flex-col rounded-xl border p-4',
        unlocked ? cn('border-line bg-surface-2 ring-1', tier.ring) : 'border-line bg-surface-2/40',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          aria-hidden
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-lg',
            unlocked ? cn(tier.bg, tier.text) : 'bg-surface-3 text-subtle',
          )}
        >
          <Icon size={18} />
        </span>
        <span className="flex flex-col items-end gap-1">
          <span
            className={cn(
              'rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
              unlocked ? cn(tier.bg, tier.text, 'border-transparent') : 'border-line text-subtle',
            )}
          >
            {tier.label}
          </span>
          <span className={cn('text-[11px] tabular-nums', unlocked ? 'text-xp' : 'text-subtle')}>
            {formatXP(achievement.xp)}
          </span>
        </span>
      </div>

      <h3 className={cn('mt-3 text-[13.5px] font-semibold', unlocked ? 'text-ink' : 'text-muted')}>
        {achievement.name}
      </h3>
      <p className="mt-1 flex-1 text-[12px] leading-relaxed text-subtle">{achievement.description}</p>

      {unlocked ? (
        <p className={cn('mt-3 text-[11.5px] font-medium', tier.text)}>
          {unlockedAt ? `Unlocked ${relativeTime(unlockedAt)}` : 'Unlocked'}
        </p>
      ) : (
        <div className="mt-3 space-y-1.5">
          <ProgressBar
            value={progress?.progress ?? 0}
            size="sm"
            label={`${achievement.name} progress`}
            barClassName="from-subtle to-muted"
          />
          <p className="text-[11.5px] tabular-nums text-subtle">{progress?.progressLabel ?? 'Locked'}</p>
        </div>
      )}
    </article>
  );
}

function SecretSlot({ count }: { count: number }) {
  return (
    <article
      aria-label={`${count} hidden achievement${count === 1 ? '' : 's'}, not yet unlocked`}
      className="flex h-full flex-col rounded-xl border border-dashed border-line bg-surface-2/30 p-4"
    >
      <span aria-hidden className="grid h-10 w-10 place-items-center rounded-lg bg-surface-3 text-subtle">
        <Lock size={18} />
      </span>
      <h3 className="mt-3 text-[13.5px] font-semibold text-muted">
        {count} hidden {count === 1 ? 'achievement' : 'achievements'}
      </h3>
      <p className="mt-1 flex-1 text-[12px] leading-relaxed text-subtle">
        These name themselves only once earned. They are for things worth doing anyway.
      </p>
    </article>
  );
}
