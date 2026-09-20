'use client';

import Link from 'next/link';
import { CalendarClock, TrendingDown, TrendingUp, Check, Minus } from 'lucide-react';
import type { PaceReport, RecoveryPlan } from '@/features/scheduling/planner';
import { ProgressBar } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { prettyDate } from '@/lib/format';
import { cn } from '@/lib/cn';

const STATUS_STYLES = {
  ahead: { tone: 'text-success', bg: 'bg-success/10 border-success/25', icon: TrendingUp },
  'on-track': { tone: 'text-success', bg: 'bg-success/10 border-success/25', icon: Check },
  'slightly-behind': { tone: 'text-warning', bg: 'bg-warning/10 border-warning/25', icon: TrendingDown },
  behind: { tone: 'text-danger', bg: 'bg-danger/10 border-danger/25', icon: TrendingDown },
  finished: { tone: 'text-success', bg: 'bg-success/10 border-success/25', icon: Check },
  'not-started': { tone: 'text-info', bg: 'bg-info/10 border-info/25', icon: Minus },
} as const;

/**
 * The permanent deadline panel. It states the required pace honestly — if the
 * learner is behind it says so, and offers a rebuilt plan rather than simply
 * piling the backlog onto tomorrow.
 */
export function DeadlineTracker({
  pace,
  recovery,
  endDate,
  unitTitles,
}: {
  pace: PaceReport;
  recovery: RecoveryPlan;
  endDate: string;
  unitTitles: Record<string, { title: string; slug: string }>;
}) {
  const style = STATUS_STYLES[pace.status];
  const Icon = style.icon;
  const completion = pace.totalUnits ? pace.completedUnits / pace.totalUnits : 0;

  return (
    <section className="min-w-0 rounded-xl border border-line bg-surface p-4 sm:p-5" aria-labelledby="deadline-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock size={15} className="text-subtle" />
            <h2 id="deadline-heading" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">
              Deadline
            </h2>
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {prettyDate(endDate, { year: 'numeric', month: 'long' })}
          </p>
          <p className="mt-1 text-[13px] text-subtle">
            {pace.daysRemaining} day{pace.daysRemaining === 1 ? '' : 's'} remaining
          </p>
        </div>

        {/* `min-w-0` on both the badge and its text: the pace message is a
            full sentence, and without these the flex default of
            `min-width: auto` keeps it on one line and pushes the dashboard
            wider than a phone. */}
        <div className={cn('flex min-w-0 items-center gap-2 rounded-lg border px-3 py-2', style.bg)}>
          <Icon size={15} className={cn('shrink-0', style.tone)} />
          <span className={cn('min-w-0 text-[12.5px] font-medium', style.tone)}>{pace.message}</span>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {[
          { label: 'Total', value: pace.totalUnits },
          { label: 'Completed', value: pace.completedUnits },
          { label: 'Remaining', value: pace.remainingUnits },
          { label: 'Required pace', value: `${pace.requiredPace.toFixed(1)}/day` },
        ].map((s) => (
          <div key={s.label} className="bg-surface px-3 py-2.5">
            <dt className="text-[10.5px] uppercase tracking-[0.1em] text-subtle">{s.label}</dt>
            <dd className="mt-0.5 text-[16px] font-semibold tabular-nums text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[12px]">
          <span className="text-subtle">Curriculum progress</span>
          <span className="font-medium tabular-nums text-ink">
            {pace.completedUnits} / {pace.totalUnits}
          </span>
        </div>
        <ProgressBar value={completion} label="Curriculum progress" size="lg" />
      </div>

      {recovery.needed && recovery.priority.length > 0 && (
        <div className="mt-5 rounded-lg border border-warning/25 bg-warning/[0.06] p-4">
          <p className="text-[12.5px] font-semibold text-warning">Recovery plan</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{recovery.summary}</p>
          <ul className="mt-3 space-y-1.5">
            {recovery.priority.slice(0, 4).map((p) => {
              const unit = unitTitles[p.unitId];
              if (!unit) return null;
              return (
                <li key={p.unitId} className="flex items-baseline justify-between gap-3 text-[12.5px]">
                  {/* `truncate` sets `white-space: nowrap`, which makes this
                      flex item's automatic minimum the full title width — so
                      it needs `min-w-0` to actually truncate. */}
                  <Link
                    href={`/learn/${unit.slug}`}
                    className="min-w-0 truncate font-medium text-ink hover:text-primary-ink hover:underline"
                  >
                    {unit.title}
                  </Link>
                  <span className="shrink-0 text-subtle">{p.reason}</span>
                </li>
              );
            })}
          </ul>
          <Link href="/today" className="mt-3 inline-block">
            <Button size="sm" variant="subtle">
              Open the rebuilt plan
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
