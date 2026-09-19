'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useUIPrefs } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

const OPTIONS = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const [prefs, update] = useUIPrefs();

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn('flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5', className)}
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => {
        const active = prefs.theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            onClick={() => update({ theme: value })}
            className={cn(
              'grid h-7 w-7 place-items-center rounded-md transition-colors',
              active ? 'bg-surface text-ink shadow-soft' : 'text-subtle hover:text-ink',
            )}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
