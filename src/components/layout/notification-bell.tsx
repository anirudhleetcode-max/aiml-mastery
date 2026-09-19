'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bell, Check } from 'lucide-react';
import { useLearnerStore } from '@/lib/store/learner';
import { relativeTime } from '@/lib/format';
import { cn } from '@/lib/cn';

export function NotificationBell() {
  const [open, setOpen] = React.useState(false);
  const notifications = useLearnerStore((s) => s.state?.notifications ?? []);
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);
  const ref = React.useRef<HTMLDivElement>(null);

  const unread = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  function markAll() {
    patch((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
    emit({ type: 'notification-read', id: null });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
        aria-expanded={open}
        className="relative grid h-9 w-9 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface-2 hover:text-ink"
      >
        <Bell size={16} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9.5px] font-semibold text-on-primary">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface shadow-lift">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <p className="text-[13px] font-semibold text-ink">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAll}
                className="flex items-center gap-1 text-[12px] text-primary hover:underline"
              >
                <Check size={12} /> Mark all read
              </button>
            )}
          </div>
          <ul className="max-h-96 divide-y divide-line overflow-y-auto">
            {notifications.length === 0 && (
              <li className="px-4 py-10 text-center text-[13px] text-subtle">
                Nothing yet. Reminders appear here when a test is due or a streak is at risk.
              </li>
            )}
            {notifications.slice(0, 20).map((n) => {
              const body = (
                <>
                  <p className={cn('text-[13px] font-medium', n.read ? 'text-muted' : 'text-ink')}>{n.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-subtle">{n.body}</p>
                  <p className="mt-1 text-[11px] text-subtle/80">{relativeTime(n.createdAt)}</p>
                </>
              );
              return (
                <li key={n.id} className={cn('px-4 py-3', !n.read && 'bg-primary/[0.04]')}>
                  {n.href ? (
                    <Link href={n.href} onClick={() => setOpen(false)} className="block">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href="/settings#notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-line px-4 py-2.5 text-center text-[12px] text-subtle hover:text-ink"
          >
            Notification settings
          </Link>
        </div>
      )}
    </div>
  );
}
