'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export function ProgressBar({
  value,
  className,
  barClassName,
  label,
  size = 'md',
}: {
  /** 0–1 */
  value: number;
  className?: string;
  barClassName?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const v = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  const h = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(v * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('w-full overflow-hidden rounded-full bg-surface-3', h, className)}
    >
      <div
        className={cn(
          'h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-700 ease-out',
          barClassName,
        )}
        style={{ width: `${v * 100}%` }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  size = 88,
  stroke = 8,
  className,
  trackClassName,
  children,
  gradientId = 'ring-grad',
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  trackClassName?: string;
  children?: React.ReactNode;
  gradientId?: string;
}) {
  const v = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const uid = React.useId().replace(/:/g, '');
  const gid = `${gradientId}-${uid}`;
  return (
    <div className={cn('relative inline-grid place-items-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--c-primary))" />
            <stop offset="100%" stopColor="hsl(var(--c-accent))" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className={cn('stroke-surface-3', trackClassName)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={`url(#${gid})`}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
