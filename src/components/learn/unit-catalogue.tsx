'use client';

import * as React from 'react';
import Link from 'next/link';
import { LayoutGrid, Rows3, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/misc';
import { domainColor } from '@/data/domains';
import { formatMinutes, pct } from '@/lib/format';
import { MASTERY_META, type MasteryLevel } from '@/types/progress';
import type { DomainId } from '@/types/curriculum';
import { cn } from '@/lib/cn';

export interface CatalogueUnit {
  id: string;
  title: string;
  slug: string;
  domain: DomainId;
  module: string;
  topic: string;
  difficulty: number;
  minutes: number;
  mastery: MasteryLevel;
  completed: boolean;
  bookmarked: boolean;
  weak: boolean;
  bestScore: number;
}

export interface CatalogueDomain {
  id: DomainId;
  name: string;
  shortName: string;
  count: number;
}

type StatusFilter = 'all' | 'not-started' | 'in-progress' | 'mastered' | 'bookmarked' | 'weak';
type SortKey = 'curriculum' | 'difficulty' | 'time' | 'score';
type Density = 'compact' | 'cards';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'not-started', label: 'Not started' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'mastered', label: 'Mastered' },
  { value: 'bookmarked', label: 'Bookmarked' },
  { value: 'weak', label: 'Weak' },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'curriculum', label: 'Curriculum order' },
  { value: 'difficulty', label: 'Difficulty, easiest first' },
  { value: 'time', label: 'Estimated time, shortest first' },
  { value: 'score', label: 'Best score, highest first' },
];

function isMastered(m: MasteryLevel): boolean {
  return m === 'MASTERED' || m === 'TEACHER';
}

function statusOf(u: CatalogueUnit): Exclude<StatusFilter, 'all' | 'bookmarked' | 'weak'> {
  if (isMastered(u.mastery)) return 'mastered';
  if (u.mastery === 'NOT_STARTED') return 'not-started';
  return 'in-progress';
}

/**
 * The catalogue view of the curriculum.
 *
 * The roadmap answers "where am I on the journey"; this answers "where is the
 * unit about X, and what will it cost me". Everything filters client-side over
 * a trimmed projection, so it stays instant across all 214 units.
 */
export function UnitCatalogue({
  units,
  domains,
  totals,
}: {
  units: CatalogueUnit[];
  domains: CatalogueDomain[];
  totals: { total: number; completed: number; mastered: number; bookmarked: number; weak: number };
}) {
  const [query, setQuery] = React.useState('');
  const [domain, setDomain] = React.useState<DomainId | 'all'>('all');
  const [difficulty, setDifficulty] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<StatusFilter>('all');
  const [sort, setSort] = React.useState<SortKey>('curriculum');
  const [density, setDensity] = React.useState<Density>('compact');

  const order = React.useMemo(() => new Map(units.map((u, i) => [u.id, i])), [units]);
  const domainName = React.useMemo(() => new Map(domains.map((d) => [d.id, d.shortName])), [domains]);

  const filtering = query.trim().length > 0 || domain !== 'all' || difficulty !== null || status !== 'all';

  const shown = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = units.filter((u) => {
      if (q && !`${u.title} ${u.topic} ${u.module} ${u.id}`.toLowerCase().includes(q)) return false;
      if (domain !== 'all' && u.domain !== domain) return false;
      if (difficulty !== null && u.difficulty !== difficulty) return false;
      switch (status) {
        case 'not-started':
        case 'in-progress':
        case 'mastered':
          return statusOf(u) === status;
        case 'bookmarked':
          return u.bookmarked;
        case 'weak':
          return u.weak;
        default:
          return true;
      }
    });

    const index = (u: CatalogueUnit) => order.get(u.id) ?? 0;
    out.sort((a, b) => {
      switch (sort) {
        case 'difficulty':
          return a.difficulty - b.difficulty || index(a) - index(b);
        case 'time':
          return a.minutes - b.minutes || index(a) - index(b);
        case 'score':
          return b.bestScore - a.bestScore || index(a) - index(b);
        default:
          return index(a) - index(b);
      }
    });
    return out;
  }, [units, query, domain, difficulty, status, sort, order]);

  function clearFilters() {
    setQuery('');
    setDomain('all');
    setDifficulty(null);
    setStatus('all');
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Browse units</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Every one of the {totals.total} units, as a catalogue rather than a journey. Search it when you know
          what you want to look up; use the roadmap when you want to know what comes next.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 text-[12px] text-subtle">
        <span>{totals.completed} completed</span>
        <span aria-hidden>·</span>
        <span>{totals.mastered} mastered</span>
        <span aria-hidden>·</span>
        <span>{totals.bookmarked} bookmarked</span>
        <span aria-hidden>·</span>
        <span>{totals.weak} marked weak</span>
      </div>

      <section aria-label="Search and filters" className="sticky top-16 z-20 space-y-2.5 rounded-xl border border-line bg-canvas/90 p-3 backdrop-blur">
        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" aria-hidden />
          <Input
            id="catalogue-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${totals.total} units by title, topic, module or id`}
            aria-label="Search units by title, topic, module or unit id"
            autoComplete="off"
            className="h-9 pl-9 pr-9"
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

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="catalogue-domain" className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              Domain
            </label>
            <Select
              id="catalogue-domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value as DomainId | 'all')}
              className="h-9"
            >
              <option value="all">All domains ({totals.total})</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.count})
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="catalogue-sort" className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              Sort by
            </label>
            <Select id="catalogue-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-9">
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-x-4 gap-y-2.5">
          <div className="flex flex-col gap-1">
            <span id="catalogue-status-label" className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              Status
            </span>
            <div className="flex flex-wrap gap-1" role="group" aria-labelledby="catalogue-status-label">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  aria-pressed={status === s.value}
                  onClick={() => setStatus(s.value)}
                  className={cn(
                    'rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                    status === s.value
                      ? 'border-primary/40 bg-primary/12 text-primary'
                      : 'border-line text-subtle hover:text-ink',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span id="catalogue-difficulty-label" className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              Difficulty
            </span>
            <div className="flex gap-1" role="group" aria-labelledby="catalogue-difficulty-label">
              <button
                type="button"
                aria-pressed={difficulty === null}
                onClick={() => setDifficulty(null)}
                className={cn(
                  'rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                  difficulty === null ? 'border-primary/40 bg-primary/12 text-primary' : 'border-line text-subtle hover:text-ink',
                )}
              >
                Any
              </button>
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={difficulty === d}
                  aria-label={`Difficulty ${d} of 5`}
                  onClick={() => setDifficulty(difficulty === d ? null : d)}
                  className={cn(
                    'h-[30px] w-[30px] rounded-lg border text-[12px] font-semibold tabular-nums transition-colors',
                    difficulty === d ? 'border-primary/40 bg-primary/12 text-primary' : 'border-line text-subtle hover:text-ink',
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span id="catalogue-density-label" className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              Layout
            </span>
            <div className="flex gap-1" role="group" aria-labelledby="catalogue-density-label">
              <button
                type="button"
                aria-pressed={density === 'compact'}
                onClick={() => setDensity('compact')}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                  density === 'compact' ? 'border-primary/40 bg-primary/12 text-primary' : 'border-line text-subtle hover:text-ink',
                )}
              >
                <Rows3 size={13} aria-hidden /> Table
              </button>
              <button
                type="button"
                aria-pressed={density === 'cards'}
                onClick={() => setDensity('cards')}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                  density === 'cards' ? 'border-primary/40 bg-primary/12 text-primary' : 'border-line text-subtle hover:text-ink',
                )}
              >
                <LayoutGrid size={13} aria-hidden /> Cards
              </button>
            </div>
          </div>
        </div>
      </section>

      <p aria-live="polite" className="text-[12.5px] text-subtle">
        Showing <span className="font-medium tabular-nums text-ink">{shown.length}</span> of {totals.total} units
        {filtering ? ' that match your filters' : ''}
        {sort !== 'curriculum' ? `, sorted by ${SORT_OPTIONS.find((s) => s.value === sort)?.label.toLowerCase()}` : ''}.
        {filtering && (
          <button type="button" onClick={clearFilters} className="ml-2 font-medium text-primary hover:underline">
            Clear filters
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <EmptyState
          title="Nothing matches those filters"
          body="No unit in the curriculum fits every filter at once. Widening the difficulty or status usually brings results straight back."
          action={
            <Button size="sm" variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : density === 'compact' ? (
        <CompactTable units={shown} domainName={domainName} />
      ) : (
        <CardGrid units={shown} domainName={domainName} />
      )}
    </div>
  );
}

function StatusBadges({ unit }: { unit: CatalogueUnit }) {
  return (
    <span className="flex flex-wrap items-center gap-1">
      {isMastered(unit.mastery) ? (
        <Badge tone="success">{MASTERY_META[unit.mastery].label}</Badge>
      ) : unit.mastery === 'NOT_STARTED' ? (
        <Badge tone="neutral">Not started</Badge>
      ) : (
        <Badge tone="primary">{MASTERY_META[unit.mastery].label}</Badge>
      )}
      {unit.weak && <Badge tone="warning">weak</Badge>}
      {unit.bookmarked && <Badge tone="info">saved</Badge>}
    </span>
  );
}

function CompactTable({ units, domainName }: { units: CatalogueUnit[]; domainName: Map<DomainId, string> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[42rem] text-[13px]">
        <caption className="sr-only">Units matching the current search and filters</caption>
        <thead>
          <tr className="border-b border-line text-left text-subtle">
            <th scope="col" className="py-2.5 pl-4 pr-3 font-medium">Unit</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Domain</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Module</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Difficulty</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Time</th>
            <th scope="col" className="py-2.5 pr-3 font-medium">Status</th>
            <th scope="col" className="py-2.5 pr-4 font-medium">Best</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {units.map((u) => (
            <tr key={u.id} className="transition-colors hover:bg-surface-2">
              <th scope="row" className="max-w-72 py-2.5 pl-4 pr-3 text-left font-normal">
                <Link href={`/learn/${u.slug}`} className="block truncate font-medium text-ink hover:text-primary">
                  {u.title}
                </Link>
                <span className="block truncate text-[11px] text-subtle">
                  <span className="font-mono">{u.id}</span> · {u.topic}
                </span>
              </th>
              <td className="py-2.5 pr-3">
                <span
                  className="inline-flex rounded px-1.5 py-0.5 text-[11px] font-medium"
                  style={{ background: domainColor(u.domain, 0.12), color: domainColor(u.domain) }}
                >
                  {domainName.get(u.domain) ?? u.domain}
                </span>
              </td>
              <td className="max-w-44 truncate py-2.5 pr-3 text-subtle">{u.module}</td>
              <td className="py-2.5 pr-3 text-muted">
                <span aria-label={`Difficulty ${u.difficulty} of 5`}>{'★'.repeat(u.difficulty)}</span>
              </td>
              <td className="py-2.5 pr-3 tabular-nums text-subtle">{u.minutes}m</td>
              <td className="py-2.5 pr-3">
                <StatusBadges unit={u} />
              </td>
              <td className="py-2.5 pr-4 tabular-nums text-muted">{u.bestScore > 0 ? pct(u.bestScore) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardGrid({ units, domainName }: { units: CatalogueUnit[]; domainName: Map<DomainId, string> }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {units.map((u) => (
        <li key={u.id}>
          <Link
            href={`/learn/${u.slug}`}
            className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-line-strong"
          >
            <span aria-hidden className="h-1 w-full" style={{ background: domainColor(u.domain) }} />
            <span className="flex flex-1 flex-col p-4">
              <span className="flex items-center justify-between gap-2">
                <span
                  className="inline-flex rounded px-1.5 py-0.5 text-[11px] font-medium"
                  style={{ background: domainColor(u.domain, 0.12), color: domainColor(u.domain) }}
                >
                  {domainName.get(u.domain) ?? u.domain}
                </span>
                <span className="font-mono text-[11px] text-subtle">{u.id}</span>
              </span>

              <span className="mt-2 block text-[14px] font-semibold leading-snug text-ink">{u.title}</span>
              <span className="mt-1 block text-[12px] text-subtle">
                {u.module} · {u.topic}
              </span>

              <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-subtle">
                <span aria-label={`Difficulty ${u.difficulty} of 5`}>{'★'.repeat(u.difficulty)}</span>
                <span>{formatMinutes(u.minutes)}</span>
                {u.bestScore > 0 && <span>best {pct(u.bestScore)}</span>}
              </span>

              <span className="mt-3 flex flex-1 items-end">
                <StatusBadges unit={u} />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
