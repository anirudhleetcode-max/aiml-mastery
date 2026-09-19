'use client';

import * as React from 'react';
import Link from 'next/link';
import { Flame, LogOut, Menu, Zap } from 'lucide-react';
import { useLearnerStore } from '@/lib/store/learner';
import { effectiveStreak } from '@/features/streak/streak';
import { levelFor } from '@/features/xp/levels';
import { formatXP } from '@/lib/format';
import { Sidebar } from './sidebar';
import { SyncIndicator } from './sync-indicator';
import { NotificationBell } from './notification-bell';
import { GlobalSearch } from './global-search';
import { cn } from '@/lib/cn';

export function Topbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const state = useLearnerStore((s) => s.state);

  const xp = state?.xp ?? 0;
  const level = levelFor(xp);
  const streak = state ? effectiveStreak(state.streak) : 0;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-line bg-canvas/85 px-3 backdrop-blur sm:px-5">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink lg:hidden"
        >
          <Menu size={18} />
        </button>

        <GlobalSearch />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <SyncIndicator />

          <Link
            href="/analytics"
            className="hidden items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] font-medium tabular-nums text-muted transition-colors hover:text-ink sm:flex"
            title={`${level.current.title} · ${level.next ? `${formatXP(level.xpToNext)} XP to ${level.next.title}` : 'Max level'}`}
          >
            <Zap size={13} className="text-xp" />
            {formatXP(xp)}
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12.5px] font-medium tabular-nums transition-colors',
              streak > 0 ? 'border-warning/30 bg-warning/10 text-warning' : 'border-line bg-surface-2 text-subtle',
            )}
            title={streak > 0 ? `${streak}-day streak` : 'No active streak — a session today starts one'}
          >
            <Flame size={13} />
            {streak}
          </Link>

          <NotificationBell />

          <form action="/api/auth/logout" method="post" onSubmit={onLogout}>
            <button
              type="submit"
              aria-label="Sign out"
              className="grid h-9 w-9 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <LogOut size={16} />
            </button>
          </form>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} aria-hidden />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface shadow-lift">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

async function onLogout(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  // Flush anything queued before the session goes away, so a sign-out never
  // silently discards the last few minutes of work.
  await useLearnerStore.getState().flush({ force: true }).catch(() => undefined);
  await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
  window.location.href = '/';
}
