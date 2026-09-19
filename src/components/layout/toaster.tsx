'use client';

import { Award, CheckCircle2, Flame, Info, Zap } from 'lucide-react';
import { useLearnerStore } from '@/lib/store/learner';
import { cn } from '@/lib/cn';

const ICONS = {
  success: CheckCircle2,
  info: Info,
  warning: Flame,
  xp: Zap,
  achievement: Award,
} as const;

const TONES = {
  success: 'border-success/30 text-success',
  info: 'border-info/30 text-info',
  warning: 'border-warning/30 text-warning',
  xp: 'border-xp/35 text-xp',
  achievement: 'border-accent-2/35 text-accent-2',
} as const;

export function Toaster() {
  const toasts = useLearnerStore((s) => s.toasts);
  const dismiss = useLearnerStore((s) => s.dismissToast);

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const Icon = ICONS[t.tone];
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            className={cn(
              'pointer-events-auto flex w-full items-start gap-3 rounded-xl border bg-surface/95 p-3.5 text-left shadow-lift backdrop-blur',
              'motion-safe:animate-in',
              TONES[t.tone],
            )}
            style={{ animation: 'toast-in 260ms cubic-bezier(0.22,1,0.36,1)' }}
          >
            <Icon size={17} className="mt-px shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold text-ink">{t.title}</span>
              {t.body && <span className="mt-0.5 block truncate text-[12.5px] text-subtle">{t.body}</span>}
            </span>
          </button>
        );
      })}
      <style>{`@keyframes toast-in { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
