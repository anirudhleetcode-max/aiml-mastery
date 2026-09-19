'use client';

import { Check, CloudOff, Loader2, RefreshCw, TriangleAlert } from 'lucide-react';
import { useLearnerStore } from '@/lib/store/learner';
import { cn } from '@/lib/cn';

/**
 * Honest status. When the connection drops the learner is told their work is
 * queued rather than left wondering whether a test result vanished.
 */
export function SyncIndicator({ className }: { className?: string }) {
  const status = useLearnerStore((s) => s.status);
  const pending = useLearnerStore((s) => s.queue.length);
  const flush = useLearnerStore((s) => s.flush);

  if (status === 'idle' && pending === 0) return null;

  const config = {
    syncing: { icon: Loader2, text: 'Saving…', tone: 'text-subtle', spin: true },
    saved: { icon: Check, text: 'Saved', tone: 'text-success', spin: false },
    offline: {
      icon: CloudOff,
      text: pending > 0 ? `Offline — ${pending} change${pending === 1 ? '' : 's'} queued` : 'Offline',
      tone: 'text-warning',
      spin: false,
    },
    error: { icon: TriangleAlert, text: `Retrying — ${pending} queued`, tone: 'text-warning', spin: false },
    idle: { icon: RefreshCw, text: `${pending} queued`, tone: 'text-subtle', spin: false },
  }[status];

  const Icon = config.icon;
  const retryable = status === 'error' || status === 'offline' || (status === 'idle' && pending > 0);

  return (
    <button
      type="button"
      onClick={retryable ? () => void flush({ force: true }) : undefined}
      disabled={!retryable}
      title={
        pending > 0
          ? 'Your progress is saved on this device and will sync automatically. Click to retry now.'
          : undefined
      }
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11.5px] font-medium transition-colors',
        retryable && 'hover:bg-surface-2',
        config.tone,
        className,
      )}
    >
      <Icon size={13} className={config.spin ? 'animate-spin' : undefined} />
      <span className="hidden sm:inline">{config.text}</span>
    </button>
  );
}
