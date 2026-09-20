'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/input';
import { useLearnerStore } from '@/lib/store/learner';
import { formatMinutes, prettyDate, prettyDateLong } from '@/lib/format';
import type { ScheduleDay, SettingsData } from './types';

function dayLabel(date: string): string {
  return prettyDate(date, { weekday: 'short', year: undefined });
}

function daySummary(day: ScheduleDay): string {
  if (day.paused) return 'Paused. This day holds no units and the work moves to the days after it.';
  if (day.units === 0) return day.weekend ? 'Rest day. Nothing scheduled.' : 'Nothing scheduled.';
  return `${day.units} unit${day.units === 1 ? '' : 's'} · about ${formatMinutes(day.minutes)}${
    day.weekend ? ' · lighter weekend load' : ''
  }`;
}

export function ScheduleSection({ data }: { data: SettingsData }) {
  const router = useRouter();
  const emit = useLearnerStore((s) => s.emit);
  const flush = useLearnerStore((s) => s.flush);
  const s = data.schedule;

  const [paused, setPaused] = React.useState<Set<string>>(
    () => new Set([...s.upcoming.filter((d) => d.paused), ...s.pausedElsewhere].map((d) => d.date)),
  );
  const [expanded, setExpanded] = React.useState(false);
  const [recalculating, setRecalculating] = React.useState(false);
  const [pendingChanges, setPendingChanges] = React.useState(false);

  function togglePause(date: string, next: boolean) {
    setPaused((prev) => {
      const copy = new Set(prev);
      if (next) copy.add(date);
      else copy.delete(date);
      return copy;
    });
    setPendingChanges(true);
    emit({ type: 'schedule-paused', date, paused: next });
  }

  async function recalculate() {
    setRecalculating(true);
    await flush({ force: true });
    router.refresh();
    setPendingChanges(false);
    setRecalculating(false);
  }

  const visible = expanded ? s.upcoming : s.upcoming.slice(0, 10);
  const strandedPauses = s.pausedElsewhere.filter((d) => paused.has(d.date));

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {[
          { label: 'Starts', value: prettyDate(s.startDate, { year: 'numeric' }) },
          { label: 'Deadline', value: prettyDate(s.endDate, { year: 'numeric' }) },
          { label: 'Study days left', value: String(s.daysRemaining) },
          { label: 'Units left', value: `${s.remainingUnits} of ${s.totalUnits}` },
        ].map((item) => (
          <div key={item.label} className="bg-surface px-3 py-2.5">
            <dt className="text-[10.5px] uppercase tracking-[0.1em] text-subtle">{item.label}</dt>
            <dd className="mt-0.5 text-[14px] font-semibold tabular-nums text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-[12.5px] leading-relaxed text-subtle">
        Your window runs from {prettyDateLong(s.startDate)} to {prettyDateLong(s.endDate)}: {s.totalDays} days, of
        which {s.studyDays} currently carry units, at a typical {formatMinutes(s.averageMinutes)} a day.
        {s.compressed
          ? ' At your current budget the remaining units do not quite fit, so the later weeks are loaded more heavily.'
          : ''}
      </p>

      <div>
        <h3 className="text-[13px] font-medium text-ink">Pause specific days</h3>
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-subtle">
          Pause a day you already know you will lose — travel, an exam, a wedding — and the planner leaves it
          empty instead of marking you behind. A paused day costs you nothing: no missed test, no streak damage,
          no discipline penalty.
        </p>

        <div className="mt-3 divide-y divide-line rounded-xl border border-line px-4">
          {visible.map((day) => (
            <Switch
              key={day.date}
              id={`pause-${day.date}`}
              checked={paused.has(day.date)}
              onChange={(v) => togglePause(day.date, v)}
              label={`Pause ${dayLabel(day.date)}`}
              description={daySummary({ ...day, paused: paused.has(day.date) })}
            />
          ))}
          {visible.length === 0 && (
            <p className="py-4 text-[12.5px] text-subtle">
              There are no days left in the course window to pause.
            </p>
          )}
        </div>

        {s.upcoming.length > visible.length && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-2 text-[12.5px] font-medium text-primary-ink hover:underline"
          >
            Show all {s.upcoming.length} upcoming days
          </button>
        )}

        {strandedPauses.length > 0 && (
          <div className="mt-4 rounded-xl border border-line bg-surface-2 p-4">
            <h4 className="text-[12.5px] font-medium text-ink">Paused days further ahead</h4>
            <p className="mt-1 text-[12px] leading-relaxed text-subtle">
              These fall outside the list above. Switch one off to put it back into the plan.
            </p>
            <div className="mt-2 divide-y divide-line">
              {strandedPauses.map((day) => (
                <Switch
                  key={day.date}
                  id={`pause-far-${day.date}`}
                  checked={paused.has(day.date)}
                  onChange={(v) => togglePause(day.date, v)}
                  label={`Pause ${prettyDate(day.date, { year: 'numeric' })}`}
                  description="Paused. Switch off to return this day to your plan."
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <h3 className="flex items-center gap-2 text-[13px] font-medium text-ink">
          <CalendarClock size={15} className="text-primary-ink" aria-hidden />
          Recalculate my plan
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
          Recalculating never piles the backlog onto tomorrow. The planner takes everything you have not finished
          and sorts it by leverage first: a unit that several later units depend on is scheduled ahead of one that
          nothing depends on, because leaving a prerequisite unlearned quietly blocks the work behind it. Weak
          topics come next, since they keep costing marks until they are repaired, and the ordinary backlog comes
          last. That ordered list is then packed across the days you actually have left — paused days skipped,
          weekends lighter, time reserved each day for the test — so the load lands where there is room for it
          rather than all at once.
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
          Nothing is dropped. If the remaining work genuinely does not fit your budget, the plan says so instead
          of quietly losing units.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="secondary" onClick={recalculate} loading={recalculating}>
            Recalculate now
          </Button>
          <p aria-live="polite" className="text-[12px] text-subtle">
            {pendingChanges
              ? 'Your paused days are saved. Recalculate to see the rebuilt plan.'
              : 'Your plan is already up to date.'}
          </p>
        </div>
      </div>
    </div>
  );
}
