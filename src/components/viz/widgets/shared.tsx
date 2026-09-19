'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

/**
 * Shared chrome for every interactive widget, so 57 illustrations across the
 * curriculum share one visual language and one set of accessibility habits.
 */

export function WidgetShell({
  children,
  controls,
  readout,
  className,
  takeaway,
}: {
  children: React.ReactNode;
  controls?: React.ReactNode;
  readout?: React.ReactNode;
  className?: string;
  /** One sentence naming what the learner should notice. */
  takeaway?: string;
}) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-line bg-surface', className)}>
      <div className="relative">{children}</div>
      {readout && <div className="border-t border-line bg-surface-2/50 px-4 py-2.5">{readout}</div>}
      {controls && <div className="space-y-3 border-t border-line px-4 py-3">{controls}</div>}
      {takeaway && (
        <p className="border-t border-line bg-primary/[0.05] px-4 py-2.5 text-[12px] leading-relaxed text-muted">
          <span className="font-medium text-primary">Notice: </span>
          {takeaway}
        </p>
      )}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v) => String(v),
  hint,
  className,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  hint?: string;
  className?: string;
}) {
  const id = React.useId();
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[12px] font-medium text-muted">
          {label}
        </label>
        <span className="font-mono text-[12px] tabular-nums text-accent">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-[hsl(var(--c-primary))]"
      />
      {hint && <p className="mt-1 text-[11px] leading-relaxed text-subtle">{hint}</p>}
    </div>
  );
}

export function Toggle({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div>
      <p className="mb-1 text-[12px] font-medium text-muted">{label}</p>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1 rounded-lg border border-line bg-surface-2 p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors',
              value === o.value ? 'bg-surface text-ink shadow-soft' : 'text-subtle hover:text-ink',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Readout({ items }: { items: { label: string; value: string; tone?: 'default' | 'good' | 'warn' | 'bad' }[] }) {
  const tones = {
    default: 'text-ink',
    good: 'text-success',
    warn: 'text-warning',
    bad: 'text-danger',
  } as const;
  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-1.5">
      {items.map((i) => (
        <div key={i.label} className="flex items-baseline gap-1.5">
          <dt className="text-[11.5px] text-subtle">{i.label}</dt>
          <dd className={cn('font-mono text-[12.5px] font-medium tabular-nums', tones[i.tone ?? 'default'])}>
            {i.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function PlayButton({
  playing,
  onToggle,
  onReset,
  onStep,
  label = 'animation',
}: {
  playing: boolean;
  onToggle: () => void;
  onReset?: () => void;
  onStep?: () => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
      >
        {playing ? 'Pause' : 'Play'}
      </button>
      {onStep && (
        <button
          type="button"
          onClick={onStep}
          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
        >
          Step
        </button>
      )}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
        >
          Reset
        </button>
      )}
    </div>
  );
}

/** Canvas sized to its container and to devicePixelRatio, with a resize observer. */
export function useResponsiveCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  deps: React.DependencyList,
) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry?.contentRect;
      if (box) setSize({ w: Math.round(box.width), h: Math.round(box.height) });
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.w === 0 || size.h === 0) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);
    draw(ctx, size.w, size.h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.w, size.h, ...deps]);

  return { canvasRef, size };
}

/** Reads a themed CSS custom property, with a fallback for SSR/first paint. */
export function useToken(name: string, fallback: string): string {
  const [value, setValue] = React.useState(fallback);
  React.useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      if (v) setValue(v);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => observer.disconnect();
  }, [name]);
  return value;
}

export const VIZ = {
  series: 'var(--viz-series)',
  seriesSoft: 'var(--viz-series-soft)',
  good: 'var(--viz-cat-mastered)',
  warn: 'var(--viz-cat-review)',
  info: 'var(--viz-cat-learning)',
  muted: 'var(--viz-cat-none)',
  grid: 'var(--viz-grid)',
  axis: 'var(--viz-axis)',
} as const;
