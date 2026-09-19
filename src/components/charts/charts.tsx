'use client';

import * as React from 'react';
import {
  Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { AXIS_STYLE, ChartFrame, Legend, VizTooltip } from './primitives';
import { prettyDate } from '@/lib/format';

/* ------------------------------------------------------------------ */
/* Composition donut                                                    */
/* ------------------------------------------------------------------ */

export interface DonutSlice {
  key: string;
  label: string;
  value: number;
  color: string;
}

/**
 * Mastery composition. Every slice is direct-labelled with its name and count
 * and a table view is available, which is what licenses the one validated
 * colour that sits below 3:1 on the light surface.
 */
export function CompositionDonut({
  slices,
  total,
  centreLabel,
  centreValue,
  title,
  subtitle,
  height = 230,
}: {
  slices: DonutSlice[];
  total: number;
  centreLabel: string;
  centreValue: string;
  title: string;
  subtitle?: string;
  height?: number;
}) {
  const data = slices.filter((s) => s.value > 0);

  return (
    <ChartFrame
      title={title}
      subtitle={subtitle}
      height={height}
      legend={
        <Legend
          items={slices.map((s) => ({
            label: s.label,
            color: s.color,
            value: `${s.value} · ${total ? Math.round((s.value / total) * 100) : 0}%`,
          }))}
        />
      }
      table={{
        columns: ['State', 'Units', 'Share'],
        rows: slices.map((s) => [s.label, s.value, `${total ? Math.round((s.value / total) * 100) : 0}%`]),
      }}
    >
      <div className="relative h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="64%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="hsl(var(--c-surface))"
              strokeWidth={2}
              isAnimationActive
              animationDuration={650}
            >
              {data.map((s) => (
                <Cell key={s.key} fill={s.color} />
              ))}
            </Pie>
            <Tooltip
              content={<VizTooltip formatter={(v) => `${v} of ${total}`} />}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="text-2xl font-semibold tabular-nums text-ink">{centreValue}</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-subtle">{centreLabel}</p>
          </div>
        </div>
      </div>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Trend                                                                */
/* ------------------------------------------------------------------ */

export interface TrendPoint {
  date: string;
  value: number;
}

/**
 * One measure over time, one axis. Two measures of different scale get two
 * charts rather than a second y-axis.
 */
export function TrendChart({
  data,
  title,
  subtitle,
  valueLabel,
  format = (v) => String(v),
  height = 210,
  domainMax,
  percent = false,
  action,
}: {
  data: TrendPoint[];
  title: string;
  subtitle?: string;
  valueLabel: string;
  format?: (v: number) => string;
  height?: number;
  domainMax?: number;
  percent?: boolean;
  action?: React.ReactNode;
}) {
  const id = React.useId().replace(/:/g, '');

  return (
    <ChartFrame
      title={title}
      subtitle={subtitle}
      height={height}
      action={action}
      table={{
        columns: ['Date', valueLabel],
        rows: data.map((d) => [prettyDate(d.date), format(d.value)]),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--viz-series)" stopOpacity={0.32} />
              <stop offset="100%" stopColor="var(--viz-series)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--viz-grid)" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="date"
            {...AXIS_STYLE}
            tickFormatter={(d: string) => prettyDate(d)}
            minTickGap={28}
          />
          <YAxis
            {...AXIS_STYLE}
            width={44}
            domain={[0, domainMax ?? 'auto']}
            tickFormatter={(v: number) => (percent ? `${Math.round(v * 100)}%` : format(v))}
          />
          <Tooltip
            content={<VizTooltip formatter={(v) => format(Number(v))} labelFormatter={(l) => prettyDate(String(l), { weekday: 'short' })} />}
            cursor={{ stroke: 'var(--viz-series)', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            name={valueLabel}
            stroke="var(--viz-series)"
            strokeWidth={2}
            fill={`url(#fill-${id})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: 'hsl(var(--c-surface))' }}
            isAnimationActive
            animationDuration={700}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Bars                                                                 */
/* ------------------------------------------------------------------ */

export interface BarDatum {
  label: string;
  value: number;
  /** Optional per-entity colour. Used only where the bar *is* the entity. */
  color?: string;
}

/**
 * Nominal bars take a single hue: the bar length already encodes the value, so
 * spending the colour channel on it would re-encode what length shows. A
 * per-entity colour is passed only where colour is doing wayfinding (domains).
 */
export function BarsChart({
  data,
  title,
  subtitle,
  valueLabel,
  format = (v) => String(v),
  height = 240,
  horizontal = false,
  percent = false,
}: {
  data: BarDatum[];
  title: string;
  subtitle?: string;
  valueLabel: string;
  format?: (v: number) => string;
  height?: number;
  horizontal?: boolean;
  percent?: boolean;
}) {
  return (
    <ChartFrame
      title={title}
      subtitle={subtitle}
      height={height}
      table={{ columns: ['Item', valueLabel], rows: data.map((d) => [d.label, format(d.value)]) }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 6, right: 12, left: horizontal ? 8 : -12, bottom: 0 }}
          barCategoryGap={horizontal ? '22%' : '30%'}
        >
          <CartesianGrid stroke="var(--viz-grid)" strokeDasharray="2 4" vertical={horizontal} horizontal={!horizontal} />
          {horizontal ? (
            <>
              <XAxis
                type="number"
                {...AXIS_STYLE}
                domain={percent ? [0, 1] : [0, 'auto']}
                tickFormatter={(v: number) => (percent ? `${Math.round(v * 100)}%` : format(v))}
              />
              <YAxis type="category" dataKey="label" {...AXIS_STYLE} width={120} />
            </>
          ) : (
            <>
              <XAxis dataKey="label" {...AXIS_STYLE} interval={0} />
              <YAxis
                {...AXIS_STYLE}
                width={44}
                domain={percent ? [0, 1] : [0, 'auto']}
                tickFormatter={(v: number) => (percent ? `${Math.round(v * 100)}%` : format(v))}
              />
            </>
          )}
          <Tooltip
            content={<VizTooltip formatter={(v) => format(Number(v))} />}
            cursor={{ fill: 'hsl(var(--c-surface-3) / 0.55)' }}
          />
          <Bar
            dataKey="value"
            name={valueLabel}
            radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            isAnimationActive
            animationDuration={650}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color ?? 'var(--viz-series)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
