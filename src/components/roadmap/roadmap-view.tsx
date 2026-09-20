'use client';

import * as React from 'react';
import Link from 'next/link';
import { Check, ChevronRight, Filter, Search, X } from 'lucide-react';
import { domainColor } from '@/data/domains';
import type { DomainId } from '@/types/curriculum';
import { MASTERY_META, type MasteryLevel } from '@/types/progress';
import { ProgressRing } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatMinutes, pct } from '@/lib/format';
import { cn } from '@/lib/cn';

export interface RoadmapUnit {
  id: string;
  title: string;
  slug: string;
  module: string;
  difficulty: number;
  minutes: number;
  mastery: MasteryLevel;
  completed: boolean;
  weak: boolean;
  bookmarked: boolean;
  dueReview: boolean;
  score: number;
}

export interface RoadmapDomain {
  id: DomainId;
  order: number;
  name: string;
  tagline: string;
  total: number;
  completed: number;
  mastered: number;
  progress: number;
  averageScore: number;
  remainingMinutes: number;
  weakCount: number;
  units: RoadmapUnit[];
}

type StatusFilter = 'all' | 'not-started' | 'in-progress' | 'mastered' | 'weak' | 'bookmarked' | 'review';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'not-started', label: 'Not started' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'mastered', label: 'Mastered' },
  { value: 'weak', label: 'Weak' },
  { value: 'review', label: 'Due review' },
  { value: 'bookmarked', label: 'Bookmarked' },
];

/**
 * The whole journey on one page.
 *
 * Domains form a vertical spine; opening one reveals its modules and units.
 * Search and filters apply across all 214 units at once and auto-expand the
 * domains that still have matches, so a filtered roadmap never looks empty
 * when results exist further down.
 */
export function RoadmapView({
  domains,
  totals,
  initialOpen,
}: {
  domains: RoadmapDomain[];
  totals: { total: number; completed: number; inProgress: number; remaining: number; mastered: number };
  initialOpen?: string;
}) {
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState<StatusFilter>('all');
  const [difficulty, setDifficulty] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<Set<string>>(() => new Set(initialOpen ? [initialOpen] : []));

  const filtering = query.trim().length > 0 || status !== 'all' || difficulty !== null;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return domains.map((d) => ({
      ...d,
      units: d.units.filter((u) => {
        if (q && !`${u.title} ${u.module} ${u.id}`.toLowerCase().includes(q)) return false;
        if (difficulty !== null && u.difficulty !== difficulty) return false;
        switch (status) {
          case 'not-started':
            return u.mastery === 'NOT_STARTED';
          case 'in-progress':
            return u.mastery !== 'NOT_STARTED' && u.mastery !== 'MASTERED' && u.mastery !== 'TEACHER';
          case 'mastered':
            return u.mastery === 'MASTERED' || u.mastery === 'TEACHER';
          case 'weak':
            return u.weak;
          case 'review':
            return u.dueReview;
          case 'bookmarked':
            return u.bookmarked;
          default:
            return true;
        }
      }),
    }));
  }, [domains, query, status, difficulty]);

  const matchCount = filtered.reduce((a, d) => a + d.units.length, 0);

  React.useEffect(() => {
    if (!filtering) return;
    setOpen(new Set(filtered.filter((d) => d.units.length > 0).map((d) => d.id)));
  }, [filtering, filtered]);

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">The roadmap</p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">
              Python to Generative AI, in order
            </h1>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-subtle">
              Fourteen domains, ordered so everything you need arrives before you need it. Open a domain to see its
              modules and units.
            </p>
          </div>
          <ProgressRing value={totals.total ? totals.completed / totals.total : 0} size={96} stroke={9}>
            <div className="text-center">
              <p className="text-xl font-semibold tabular-nums text-ink">{totals.completed}</p>
              <p className="text-[10px] text-subtle">of {totals.total}</p>
            </div>
          </ProgressRing>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {[
            { label: 'Total', value: totals.total },
            { label: 'Completed', value: totals.completed },
            { label: 'In progress', value: totals.inProgress },
            { label: 'Remaining', value: totals.remaining },
          ].map((s) => (
            <div key={s.label} className="bg-surface px-3 py-2.5">
              <dt className="text-[10.5px] uppercase tracking-[0.1em] text-subtle">{s.label}</dt>
              <dd className="mt-0.5 text-[17px] font-semibold tabular-nums text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="sticky top-16 z-20 mt-4 rounded-xl border border-line bg-canvas/90 p-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-44 flex-1">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${totals.total} units…`}
              aria-label="Search units"
              className="h-9 pl-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-subtle hover:text-ink"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Filter by status">
            {STATUS_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                aria-pressed={status === o.value}
                onClick={() => setStatus(o.value)}
                className={cn(
                  'rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                  status === o.value
                    ? 'border-primary/40 bg-primary/12 text-primary'
                    : 'border-line text-subtle hover:text-ink',
                )}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1" role="group" aria-label="Filter by difficulty">
            <Filter size={13} className="text-subtle" />
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={difficulty === d}
                aria-label={`Difficulty ${d}`}
                onClick={() => setDifficulty(difficulty === d ? null : d)}
                className={cn(
                  'h-7 w-7 rounded-lg border text-[11px] font-semibold tabular-nums transition-colors',
                  difficulty === d
                    ? 'border-primary/40 bg-primary/12 text-primary'
                    : 'border-line text-subtle hover:text-ink',
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {filtering && (
          <p className="mt-2 text-[12px] text-subtle">
            {matchCount} unit{matchCount === 1 ? '' : 's'} match.
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setStatus('all');
                setDifficulty(null);
              }}
              className="ml-2 font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </p>
        )}
      </div>

      <ol className="relative mt-5 space-y-3">
        <span
          className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-line via-line to-transparent"
          aria-hidden
        />

        {filtered.map((d) => {
          const isOpen = open.has(d.id);
          if (filtering && d.units.length === 0) return null;

          return (
            <li key={d.id} id={d.id} className="relative scroll-mt-32">
              <div className="flex gap-4">
                <span
                  className="relative z-10 mt-4 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border-2 bg-canvas text-[10px] font-semibold tabular-nums"
                  style={{ borderColor: domainColor(d.id, d.progress > 0 ? 1 : 0.35), color: domainColor(d.id) }}
                >
                  {d.progress === 1 ? <Check size={11} strokeWidth={3} /> : d.order}
                </span>

                <div className="min-w-0 flex-1 rounded-xl border border-line bg-surface">
                  <button
                    type="button"
                    onClick={() => toggle(d.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 p-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-[15px] font-semibold text-ink">{d.name}</h2>
                        <span
                          className="rounded px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums"
                          style={{ background: domainColor(d.id, 0.12), color: domainColor(d.id) }}
                        >
                          {d.completed}/{d.total}
                        </span>
                        {d.mastered > 0 && <Badge tone="success">{d.mastered} mastered</Badge>}
                        {d.weakCount > 0 && <Badge tone="warning">{d.weakCount} weak</Badge>}
                      </div>
                      <p className="mt-1 text-[12.5px] text-subtle">{d.tagline}</p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                          <div
                            className="h-full rounded-full transition-[width] duration-700"
                            style={{ width: `${d.progress * 100}%`, background: domainColor(d.id) }}
                          />
                        </div>
                        <span className="shrink-0 text-[11.5px] tabular-nums text-subtle">{pct(d.progress)}</span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-subtle">
                        {d.averageScore > 0 && <span>avg score {pct(d.averageScore)}</span>}
                        {d.remainingMinutes > 0 && <span>~{formatMinutes(d.remainingMinutes)} remaining</span>}
                        <span>
                          {d.units.length} unit{d.units.length === 1 ? '' : 's'} shown
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className={cn('mt-1 shrink-0 text-subtle transition-transform', isOpen && 'rotate-90')}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-line p-4">
                      <ModuleList units={d.units} />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}

        <li className="relative">
          <div className="flex gap-4">
            <span
              className="relative z-10 mt-4 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border-2 border-primary bg-canvas text-primary"
              aria-hidden
            >
              <Check size={11} strokeWidth={3} />
            </span>
            <div className="min-w-0 flex-1 rounded-xl border border-primary/30 bg-primary/[0.06] p-5 text-center">
              <p className="text-[15px] font-semibold text-ink">AI/ML Master</p>
              <p className="mt-1 text-[13px] leading-relaxed text-subtle">
                All {totals.total} units complete, then the final assessment and the teacher challenge.
              </p>
              <Link
                href="/final-assessment"
                className="mt-3 inline-block text-[12.5px] font-medium text-primary hover:underline"
              >
                See what the final assessment covers →
              </Link>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}

function ModuleList({ units }: { units: RoadmapUnit[] }) {
  const modules: { name: string; units: RoadmapUnit[] }[] = [];
  for (const u of units) {
    const last = modules[modules.length - 1];
    if (last && last.name === u.module) last.units.push(u);
    else modules.push({ name: u.module, units: [u] });
  }

  return (
    <div className="space-y-4">
      {modules.map((m) => (
        <div key={m.name}>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">{m.name}</p>
          <ul className="space-y-1">
            {m.units.map((u) => (
              <li key={u.id}>
                <Link
                  href={`/learn/${u.slug}`}
                  className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-surface-2"
                >
                  <span
                    className={cn(
                      'grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[9px]',
                      u.mastery === 'MASTERED' || u.mastery === 'TEACHER'
                        ? 'border-success/50 bg-success/15 text-success'
                        : u.completed
                          ? 'border-primary/50 bg-primary/12 text-primary'
                          : 'border-line text-subtle',
                    )}
                    title={MASTERY_META[u.mastery].label}
                  >
                    {u.completed ? <Check size={10} strokeWidth={3} /> : ''}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink group-hover:text-primary">
                      {u.title}
                    </span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-subtle">
                      <span className="font-mono">{u.id}</span>
                      <span title={`Difficulty ${u.difficulty} of 5`}>{'★'.repeat(u.difficulty)}</span>
                      <span>{u.minutes}m</span>
                      {u.score > 0 && <span>best {pct(u.score)}</span>}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-1">
                    {u.dueReview && <Badge tone="info">review</Badge>}
                    {u.weak && <Badge tone="warning">weak</Badge>}
                    {u.bookmarked && <Badge tone="primary">saved</Badge>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
