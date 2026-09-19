'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

/**
 * Shared chart chrome.
 *
 * Every chart in the app is wrapped in `ChartFrame`, which gives it a title,
 * an optional legend slot and — importantly — a table view. Several of the
 * validated chart colours sit below 3:1 contrast in light mode, and the
 * relief rule for that is visible labels or a table; this is the table.
 */
export function ChartFrame({
  title,
  subtitle,
  action,
  legend,
  table,
  children,
  className,
  height = 240,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  legend?: React.ReactNode;
  table?: { columns: string[]; rows: (string | number)[][] };
  children: React.ReactNode;
  className?: string;
  height?: number;
}) {
  const [showTable, setShowTable] = React.useState(false);
  const id = React.useId();

  return (
    <figure className={cn('rounded-xl border border-line bg-surface p-5', className)}>
      <figcaption className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-[12.5px] leading-relaxed text-subtle">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          {table && (
            <button
              type="button"
              onClick={() => setShowTable((v) => !v)}
              aria-expanded={showTable}
              aria-controls={`${id}-table`}
              className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[11.5px] text-subtle transition-colors hover:text-ink"
            >
              {showTable ? 'Show chart' : 'Show data'}
            </button>
          )}
        </div>
      </figcaption>

      {showTable && table ? (
        <div id={`${id}-table`} className="overflow-x-auto" style={{ minHeight: height }}>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                {table.columns.map((c) => (
                  <th key={c} scope="col" className="py-1.5 pr-4 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={cn('py-1.5 pr-4', j === 0 ? 'text-ink' : 'tabular-nums text-muted')}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ height }}>{children}</div>
      )}

      {legend && !showTable && <div className="mt-3 border-t border-line pt-3">{legend}</div>}
    </figure>
  );
}

export function Legend({
  items,
  className,
}: {
  items: { label: string; color: string; value?: string }[];
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-4 gap-y-1.5', className)}>
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5 text-[12px]">
          <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: i.color }} aria-hidden />
          <span className="text-muted">{i.label}</span>
          {i.value !== undefined && <span className="tabular-nums text-subtle">{i.value}</span>}
        </li>
      ))}
    </ul>
  );
}

/** The tooltip used by every Recharts surface, so hover feels identical everywhere. */
export function VizTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number | string; color?: string; payload?: Record<string, unknown> }[];
  label?: string | number;
  formatter?: (value: number | string, name: string, entry: Record<string, unknown>) => React.ReactNode;
  labelFormatter?: (label: string | number) => React.ReactNode;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-surface/97 px-3 py-2 text-[12px] shadow-lift backdrop-blur">
      {label !== undefined && (
        <p className="mb-1 font-medium text-ink">{labelFormatter ? labelFormatter(label) : label}</p>
      )}
      <ul className="space-y-0.5">
        {payload.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            {p.color && <span className="h-2 w-2 rounded-[2px]" style={{ background: p.color }} aria-hidden />}
            <span className="text-subtle">{p.name}</span>
            <span className="ml-auto pl-3 font-medium tabular-nums text-ink">
              {formatter && p.value !== undefined
                ? formatter(p.value, p.name ?? '', p.payload ?? {})
                : String(p.value ?? '')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const AXIS_STYLE = {
  tick: { fill: 'var(--viz-axis)', fontSize: 11 },
  axisLine: false as const,
  tickLine: false as const,
};
