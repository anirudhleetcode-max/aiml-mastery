'use client';

import * as React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { ActivityHeatmap } from '@/components/charts/heatmap';
import type { DayActivity } from '@/types/progress';
import { formatDuration, pct, prettyDate, prettyDateLong } from '@/lib/format';

/**
 * The heatmap plus a detail panel for whichever day is selected — the spec's
 * "click a day to see lessons, tests, score, XP and study time".
 */
export function ActivityPanel({
  activity,
  startDate,
  endDate,
}: {
  activity: Record<string, DayActivity>;
  startDate: string;
  endDate: string;
}) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const day = selected ? activity[selected] : undefined;

  return (
    <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[14px] font-semibold text-ink">Daily activity</h2>
        <p className="text-[12px] text-subtle">
          {prettyDate(startDate, { year: 'numeric' })} – {prettyDate(endDate, { year: 'numeric' })}
        </p>
      </div>

      <div className="mt-4">
        <ActivityHeatmap
          activity={activity}
          startDate={startDate}
          endDate={endDate}
          selected={selected}
          onSelect={(d) => setSelected((prev) => (prev === d ? null : d))}
        />
      </div>

      {selected && (
        <div className="mt-4 rounded-lg border border-line bg-surface-2 p-4">
          <p className="text-[13px] font-semibold text-ink">{prettyDateLong(selected)}</p>
          {day ? (
            <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { label: 'Units', value: String(day.unitsCompleted) },
                { label: 'Test', value: day.testTaken ? pct(day.testScore ?? 0) : 'not taken' },
                { label: 'XP', value: `+${day.xp}` },
                { label: 'Study time', value: formatDuration(day.studySeconds) },
                { label: 'Taught back', value: String(day.teachBacks) },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-[11px] uppercase tracking-[0.1em] text-subtle">{s.label}</dt>
                  <dd className="mt-0.5 text-[15px] font-semibold tabular-nums text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-2 text-[13px] text-subtle">
              Nothing recorded on this day. Rest days are part of a sustainable plan — the streak has two freezes for
              exactly this reason.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export interface PeriodSummary {
  key: string;
  label: string;
  units: number;
  xp: number;
  studySeconds: number;
  testsTaken: number;
  averageScore: number;
  activeDays: number;
  totalDays: number;
  strongest: string | null;
  weakest: string | null;
}

/** Weekly and monthly reports, switchable. */
export function PeriodReports({ weeks, months }: { weeks: PeriodSummary[]; months: PeriodSummary[] }) {
  const [view, setView] = React.useState('weekly');
  const rows = view === 'weekly' ? weeks : months;

  return (
    <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[14px] font-semibold text-ink">Reports</h2>
          <p className="mt-0.5 text-[12.5px] text-subtle">
            {view === 'weekly'
              ? 'Every week since you started, newest first.'
              : 'September through December, the whole run.'}
          </p>
        </div>
        <Tabs
          size="sm"
          value={view}
          onValueChange={setView}
          items={[
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' },
          ]}
        />
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-line px-4 py-8 text-center text-[13px] text-subtle">
          Reports appear once you have a week of activity behind you.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-2 pr-4 font-medium">Period</th>
                <th scope="col" className="py-2 pr-4 font-medium">Units</th>
                <th scope="col" className="py-2 pr-4 font-medium">Avg score</th>
                <th scope="col" className="py-2 pr-4 font-medium">XP</th>
                <th scope="col" className="py-2 pr-4 font-medium">Study time</th>
                <th scope="col" className="py-2 pr-4 font-medium">Consistency</th>
                <th scope="col" className="py-2 font-medium">Strongest / weakest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.key}>
                  <td className="py-2 pr-4 font-medium text-ink">{r.label}</td>
                  <td className="py-2 pr-4 tabular-nums text-muted">{r.units}</td>
                  <td className="py-2 pr-4 tabular-nums text-muted">{r.testsTaken ? pct(r.averageScore) : '—'}</td>
                  <td className="py-2 pr-4 tabular-nums text-muted">{r.xp.toLocaleString('en-US')}</td>
                  <td className="py-2 pr-4 tabular-nums text-muted">{formatDuration(r.studySeconds)}</td>
                  <td className="py-2 pr-4 tabular-nums text-muted">
                    {r.activeDays}/{r.totalDays} days
                  </td>
                  <td className="py-2 text-subtle">
                    {r.strongest ? <span className="text-success">{r.strongest}</span> : '—'}
                    {r.weakest && <span className="text-warning"> · {r.weakest}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
