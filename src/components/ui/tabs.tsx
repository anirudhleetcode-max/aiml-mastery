'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

/**
 * Roving-tabindex tablist. Arrow keys move focus, Home/End jump to the ends —
 * the WAI-ARIA pattern, because lessons lean on this heavily.
 */
export function Tabs({
  items,
  value,
  onValueChange,
  className,
  size = 'md',
}: {
  items: TabItem[];
  value: string;
  onValueChange: (id: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = items.length - 1;
    let next = -1;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === -1) return;
    e.preventDefault();
    const item = items[next];
    if (!item) return;
    onValueChange(item.id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center gap-1 overflow-x-auto rounded-xl border border-line bg-surface-2 p-1',
        className,
      )}
    >
      {items.map((item, i) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onKeyDown={(e) => onKeyDown(e, i)}
            onClick={() => onValueChange(item.id)}
            className={cn(
              'relative inline-flex shrink-0 items-center gap-1.5 rounded-lg font-medium transition-colors duration-150',
              size === 'sm' ? 'h-7 px-2.5 text-[12px]' : 'h-9 px-3.5 text-[13px]',
              active ? 'bg-surface text-ink shadow-soft' : 'text-subtle hover:text-ink',
            )}
          >
            {item.icon}
            {item.label}
            {item.badge}
          </button>
        );
      })}
    </div>
  );
}
