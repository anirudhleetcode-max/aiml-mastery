import * as React from 'react';
import { cn } from '@/lib/cn';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        'rounded-lg bg-gradient-to-r from-surface-2 via-surface-3 to-surface-2 bg-[length:280%_100%]',
        'motion-safe:animate-(--animate-shimmer)',
        className,
      )}
      {...props}
    />
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  body: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid place-items-center rounded-xl border border-dashed border-line px-6 py-14 text-center', className)}>
      {icon && <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-subtle">{icon}</div>}
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-subtle">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-3', className)}>
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-ink">{eyebrow}</p>
        )}
        <Tag className={cn('font-semibold text-ink', Tag === 'h1' ? 'text-2xl' : 'text-lg')}>{title}</Tag>
        {description && <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-subtle">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  icon,
  tone = 'default',
  className,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'xp';
  className?: string;
}) {
  const tones = {
    default: 'text-ink',
    primary: 'text-primary-ink',
    success: 'text-success',
    warning: 'text-warning',
    xp: 'text-xp',
  } as const;
  return (
    <div className={cn('rounded-xl border border-line bg-surface p-4', className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-subtle">{label}</p>
        {icon && <span className="text-subtle">{icon}</span>}
      </div>
      <p className={cn('mt-2 text-2xl font-semibold tabular-nums', tones[tone])}>{value}</p>
      {sub && <div className="mt-1 text-[12px] text-subtle">{sub}</div>}
    </div>
  );
}

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'rounded border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-[11px] text-muted',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
