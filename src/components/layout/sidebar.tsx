'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Award, BarChart3, BookMarked, BookOpen, Bot, Calendar, FlaskConical, GraduationCap,
  LayoutDashboard, Map, MessagesSquare, NotebookPen, Settings, Sigma, SpellCheck, Target, Network,
  ClipboardList, Eraser, Layers,
} from 'lucide-react';
import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/cn';

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Learn',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/today', label: "Today's mission", icon: Target },
      { href: '/roadmap', label: 'Roadmap', icon: Map },
      { href: '/learn', label: 'Browse units', icon: BookOpen },
      { href: '/labs', label: 'Labs', icon: FlaskConical },
      { href: '/tutor', label: 'AI tutor', icon: Bot },
    ],
  },
  {
    title: 'Practice',
    items: [
      { href: '/practice', label: 'Practice', icon: ClipboardList },
      { href: '/tests', label: 'Tests', icon: Calendar },
      { href: '/flashcards', label: 'Flashcards', icon: BookMarked },
      { href: '/mistakes', label: 'My mistakes', icon: Eraser },
      { href: '/interview', label: 'Interview prep', icon: MessagesSquare },
      { href: '/teach', label: 'Teacher mode', icon: GraduationCap },
    ],
  },
  {
    title: 'Track',
    items: [
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/achievements', label: 'Achievements', icon: Award },
      { href: '/notes', label: 'Notes', icon: NotebookPen },
    ],
  },
  {
    title: 'Reference',
    items: [
      { href: '/glossary', label: 'Glossary', icon: SpellCheck },
      { href: '/formulas', label: 'Formula lab', icon: Sigma },
      { href: '/graph', label: 'Knowledge graph', icon: Network },
      { href: '/mind-map', label: 'Mind map', icon: Layers },
    ],
  },
];

export function Sidebar({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn('flex h-full flex-col border-r border-line bg-surface/60', className)}>
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-line px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onNavigate}>
          <Logo className="h-7 w-7" />
          <span className="text-[14.5px] font-semibold tracking-tight text-ink">AI/ML Mastery</span>
        </Link>
      </div>

      <nav aria-label="Main" className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors',
                        active ? 'bg-primary/12 text-primary-ink' : 'text-muted hover:bg-surface-2 hover:text-ink',
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <item.icon size={16} className="shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-line p-3">
        <Link
          href="/settings"
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors',
            pathname.startsWith('/settings') ? 'bg-primary/12 text-primary-ink' : 'text-muted hover:bg-surface-2 hover:text-ink',
          )}
        >
          <Settings size={16} />
          Settings
        </Link>
      </div>
    </div>
  );
}
