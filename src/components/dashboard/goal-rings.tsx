import { CheckCircle2, Flame, Target } from 'lucide-react';
import type { GoalSet } from '@/features/progress/goals';
import { ProgressBar } from '@/components/ui/progress';
import { cn } from '@/lib/cn';

/**
 * Today's and this week's goals.
 *
 * Every number here is derived from the plan and the recorded activity — the
 * goal is not a separate thing the learner sets and then congratulates
 * themselves against. That matters: a goal you can lower is a goal that will
 * be met on a week when nothing got done, and this platform's whole claim is
 * that progress is evidence rather than assertion.
 */
export function GoalRings({ goals }: { goals: GoalSet }) {
  const rows = [
    {
      key: 'units',
      label: "Today's lessons",
      value: `${goals.dailyUnits.current} / ${goals.dailyUnits.target}`,
      goal: goals.dailyUnits,
    },
    {
      key: 'minutes',
      label: 'Today’s minutes',
      value: `${goals.dailyMinutes.current} / ${goals.dailyMinutes.target}`,
      goal: goals.dailyMinutes,
    },
    {
      key: 'weekly',
      label: 'Units this week',
      value: `${goals.weeklyUnits.current} / ${goals.weeklyUnits.target}`,
      goal: goals.weeklyUnits,
    },
    {
      key: 'days',
      label: 'Active days (7d)',
      value: `${goals.weeklyActiveDays.current} / ${goals.weeklyActiveDays.target}`,
      goal: goals.weeklyActiveDays,
    },
  ];

  return (
    <section
      className="min-w-0 rounded-xl border border-line bg-surface p-4 sm:p-5"
      aria-labelledby="goals-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Target size={15} className="text-subtle" />
          <h2 id="goals-heading" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">
            Goals
          </h2>
        </div>
        {goals.dayComplete ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-[11.5px] font-medium text-success">
            <CheckCircle2 size={12} /> Today is done
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[11.5px] font-medium text-subtle">
            <Flame size={12} /> In progress
          </span>
        )}
      </div>

      {/* A <dl>'s <div> wrapper may contain only <dt> and <dd>, so the bar
          lives inside the <dd> rather than beside it. */}
      <dl className="mt-4 space-y-3.5">
        {rows.map((row) => (
          <div key={row.key}>
            <dt className="min-w-0 truncate text-[12.5px] text-muted">{row.label}</dt>
            <dd className="mt-1.5 flex items-center gap-3">
              <ProgressBar value={row.goal.progress} size="sm" label={row.label} className="min-w-0 flex-1" />
              <span
                className={cn(
                  'shrink-0 text-[12.5px] font-medium tabular-nums',
                  row.goal.met ? 'text-success' : 'text-ink',
                )}
              >
                {row.value}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 border-t border-line pt-3 text-[11.5px] leading-relaxed text-subtle">
        Targets come from your plan and your deadline, not from a number you picked — so they move when your
        progress does.
      </p>
    </section>
  );
}
