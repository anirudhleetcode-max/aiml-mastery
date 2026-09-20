'use client';

import * as React from 'react';
import { addDays, dateKey, formatDuration, parseDateKey, prettyDate } from '@/lib/format';
import type { DayActivity } from '@/types/progress';
import { cn } from '@/lib/cn';

/**
 * Contribution heatmap.
 *
 * Sequential encoding: one hue, five monotone steps (`--viz-seq-0…4`), with
 * the anchor inverted in dark mode so "nothing happened" reads as the surface
 * rather than as a bright cell. Every cell is a real button, so the grid is
 * keyboard-navigable and each day is announced by a screen reader.
 */

const LEVEL_LABELS = ['No activity', 'Low', 'Medium', 'High', 'Excellent'];

function levelFor(a: DayActivity | undefined): number {
  if (!a) return 0;
  const score = a.unitsCompleted * 2 + (a.testTaken ? 2 : 0) + Math.min(3, a.studySeconds / 2400) + a.teachBacks;
  if (score <= 0) return 0;
  if (score < 2) return 1;
  if (score < 4) return 2;
  if (score < 6.5) return 3;
  return 4;
}

export function ActivityHeatmap({
  activity,
  startDate,
  endDate,
  onSelect,
  selected,
  className,
}: {
  activity: Record<string, DayActivity>;
  startDate: string;
  endDate: string;
  onSelect?: (date: string) => void;
  selected?: string | null;
  className?: string;
}) {
  const today = dateKey();

  const weeks = React.useMemo(() => {
    // Start on the Sunday on or before startDate so columns are whole weeks.
    const first = parseDateKey(startDate);
    const lead = first.getDay();
    const gridStart = addDays(startDate, -lead);
    const out: { date: string; inRange: boolean }[][] = [];
    let cursor = gridStart;
    let guard = 0;
    while (cursor <= endDate && guard < 80) {
      const week: { date: string; inRange: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        week.push({ date: cursor, inRange: cursor >= startDate && cursor <= endDate });
        cursor = addDays(cursor, 1);
      }
      out.push(week);
      guard++;
    }
    return out;
  }, [startDate, endDate]);

  const monthLabels = React.useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstInRange = week.find((d) => d.inRange);
      if (!firstInRange) return;
      const m = parseDateKey(firstInRange.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ index: i, label: parseDateKey(firstInRange.date).toLocaleDateString('en-US', { month: 'short' }) });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-full">
          <div className="mb-1 flex gap-[3px] pl-7 text-[10px] text-subtle">
            {weeks.map((_, i) => {
              const label = monthLabels.find((m) => m.index === i);
              return (
                <span key={i} className="w-[13px] shrink-0">
                  {label?.label ?? ''}
                </span>
              );
            })}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex w-6 shrink-0 flex-col gap-[3px] pr-1 text-[9px] leading-[13px] text-subtle">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                <span key={i} className="h-[13px]">
                  {d}
                </span>
              ))}
            </div>

            <div role="grid" aria-label="Daily activity" className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div role="row" key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const a = activity[day.date];
                    const level = day.inRange ? levelFor(a) : 0;
                    const future = day.date > today;
                    const isSelected = selected === day.date;
                    const label = day.inRange
                      ? `${prettyDate(day.date, { weekday: 'short', year: 'numeric' })}: ${
                          a
                            ? `${a.unitsCompleted} unit${a.unitsCompleted === 1 ? '' : 's'}, ${a.xp} XP, ${formatDuration(a.studySeconds)}${a.testTaken ? `, test ${Math.round((a.testScore ?? 0) * 100)}%` : ''}`
                            : LEVEL_LABELS[0]
                        }`
                      : 'Outside the course window';

                    return (
                      <button
                        key={day.date}
                        role="gridcell"
                        type="button"
                        disabled={!day.inRange || !onSelect}
                        onClick={() => onSelect?.(day.date)}
                        title={label}
                        aria-label={label}
                        className={cn(
                          'h-[13px] w-[13px] rounded-[3px] border transition-[transform,border-color] duration-150',
                          day.inRange ? 'border-transparent' : 'border-transparent opacity-25',
                          onSelect && day.inRange && 'hover:scale-125 hover:border-ink/40',
                          isSelected && 'ring-2 ring-accent ring-offset-1 ring-offset-[hsl(var(--c-surface))]',
                          future && 'opacity-40',
                        )}
                        style={{ background: `var(--viz-seq-${level})` }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-[11px] text-subtle">
        <span>Click a day for its detail</span>
        {/*
          The ramp is one image, not five. Labelling each swatch individually
          put an aria-label on a role-less span (which is prohibited) and made
          a screen reader read five bare colour names between "Less" and
          "More"; one role="img" announces the scale as a single idea. The
          per-swatch `title` stays as a pointer affordance.
        */}
        <div
          className="flex items-center gap-1.5"
          role="img"
          aria-label={`Activity scale, least to most: ${LEVEL_LABELS.join(', ')}.`}
        >
          <span aria-hidden="true">Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span
              key={l}
              aria-hidden="true"
              className="h-[11px] w-[11px] rounded-[3px]"
              style={{ background: `var(--viz-seq-${l})` }}
              title={LEVEL_LABELS[l]}
            />
          ))}
          <span aria-hidden="true">More</span>
        </div>
      </div>
    </div>
  );
}
