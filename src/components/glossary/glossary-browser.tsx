'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { domainColor } from '@/data/domains';
import type { DomainId } from '@/types/curriculum';
import { Input, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/misc';
import { cn } from '@/lib/cn';

export interface GlossarySource {
  id: string;
  title: string;
  slug: string;
  domain: DomainId;
}

export interface GlossaryEntry {
  /** Lower-cased term — stable key and the search haystack's first field. */
  key: string;
  term: string;
  definition: string;
  simple?: string;
  /** 'A'–'Z', or '#' for anything that does not start with a letter. */
  letter: string;
  domains: DomainId[];
  units: GlossarySource[];
}

export interface GlossaryDomainOption {
  id: DomainId;
  name: string;
  count: number;
}

const LETTERS = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

/**
 * The reading surface for the glossary index.
 *
 * The index itself is built on the server from the full curriculum; this
 * component only ever sees the trimmed entries. Filtering is deferred so a
 * fast typist is never held up by re-rendering several hundred cards.
 */
export function GlossaryBrowser({
  entries,
  domains,
}: {
  entries: GlossaryEntry[];
  domains: GlossaryDomainOption[];
}) {
  const [query, setQuery] = React.useState('');
  const [domain, setDomain] = React.useState<'all' | DomainId>('all');
  const deferredQuery = React.useDeferredValue(query);

  const domainName = React.useMemo(() => {
    const map = new Map<DomainId, string>();
    for (const d of domains) map.set(d.id, d.name);
    return map;
  }, [domains]);

  const filtered = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q && domain === 'all') return entries;
    return entries.filter((e) => {
      if (domain !== 'all' && !e.domains.includes(domain)) return false;
      if (!q) return true;
      return (
        e.key.includes(q) ||
        e.definition.toLowerCase().includes(q) ||
        (e.simple ?? '').toLowerCase().includes(q)
      );
    });
  }, [entries, deferredQuery, domain]);

  const groups = React.useMemo(() => {
    const out: { letter: string; entries: GlossaryEntry[] }[] = [];
    for (const e of filtered) {
      const last = out[out.length - 1];
      if (last && last.letter === e.letter) last.entries.push(e);
      else out.push({ letter: e.letter, entries: [e] });
    }
    return out;
  }, [filtered]);

  const present = React.useMemo(() => new Set(groups.map((g) => g.letter)), [groups]);
  const filtering = query.trim().length > 0 || domain !== 'all';

  return (
    <div className="space-y-5">
      {/* ------------------------------------------------------ controls */}
      <div className="sticky top-0 z-10 -mx-4 space-y-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="glossary-search" className="sr-only">
              Search terms and definitions
            </label>
            <Search
              size={15}
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
            />
            <Input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a term or a definition"
              autoComplete="off"
              aria-describedby="glossary-count"
              className="pl-9 pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear the search"
                className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-subtle transition-colors hover:bg-surface-3 hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/25"
              >
                <X size={14} aria-hidden />
              </button>
            )}
          </div>

          <div className="sm:w-56">
            <label htmlFor="glossary-domain" className="sr-only">
              Filter by domain
            </label>
            <Select
              id="glossary-domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value as 'all' | DomainId)}
            >
              <option value="all">Every domain</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.count})
                </option>
              ))}
            </Select>
          </div>
        </div>

        <nav aria-label="Jump to a letter" className="flex flex-wrap gap-1">
          {LETTERS.map((l) =>
            present.has(l) ? (
              <a
                key={l}
                href={`#glossary-${l === '#' ? 'other' : l}`}
                className="grid h-7 w-7 place-items-center rounded-md border border-line bg-surface-2 text-[11.5px] font-medium text-muted transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              >
                {l}
              </a>
            ) : (
              <span
                key={l}
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-md border border-transparent text-[11.5px] text-subtle/45"
              >
                {l}
              </span>
            ),
          )}
        </nav>

        <p id="glossary-count" role="status" aria-live="polite" className="text-[12.5px] text-subtle">
          {filtering
            ? `${filtered.length} of ${entries.length} terms match`
            : `${entries.length} terms across the curriculum`}
        </p>
      </div>

      {/* ------------------------------------------------------- results */}
      {groups.length === 0 ? (
        <EmptyState
          title="No term matches that"
          body="Try a shorter word, or widen the domain filter. Definitions are searched as well as the terms themselves."
          action={
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setQuery('');
                setDomain('all');
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        groups.map((group) => (
          <section
            key={group.letter}
            id={`glossary-${group.letter === '#' ? 'other' : group.letter}`}
            aria-labelledby={`glossary-heading-${group.letter === '#' ? 'other' : group.letter}`}
            className="scroll-mt-44 sm:scroll-mt-40"
          >
            <h2
              id={`glossary-heading-${group.letter === '#' ? 'other' : group.letter}`}
              className="flex items-baseline gap-2 border-b border-line pb-2 text-[15px] font-semibold text-ink"
            >
              {group.letter}
              <span className="text-[11.5px] font-normal text-subtle">
                {group.entries.length} term{group.entries.length === 1 ? '' : 's'}
              </span>
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {group.entries.map((e) => (
                <li key={e.key}>
                  <TermCard entry={e} domainName={domainName} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

function TermCard({
  entry,
  domainName,
}: {
  entry: GlossaryEntry;
  domainName: Map<DomainId, string>;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1.5">
        <h3 className="min-w-0 text-[14px] font-semibold text-ink">{entry.term}</h3>
        <span className="flex flex-wrap gap-1">
          {entry.domains.map((d) => (
            <span
              key={d}
              className="rounded-full border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide"
              style={{
                color: domainColor(d),
                borderColor: domainColor(d, 0.35),
                backgroundColor: domainColor(d, 0.1),
              }}
            >
              {domainName.get(d) ?? d}
            </span>
          ))}
        </span>
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-muted">{entry.definition}</p>

      {entry.simple && (
        <p className="mt-2.5 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[12.5px] leading-relaxed text-subtle">
          <span className="font-medium text-ink">In plain words. </span>
          {entry.simple}
        </p>
      )}

      <div className="mt-auto pt-3">
        <p className="sr-only">Units that teach this term</p>
        <ul className="flex flex-wrap gap-1.5 border-t border-line pt-3">
          {entry.units.map((u) => (
            <li key={u.id}>
              <Link
                href={`/learn/${u.slug}`}
                className={cn(
                  'inline-flex max-w-full items-center rounded-md border border-line bg-surface-2 px-2 py-1 text-[11.5px] text-subtle',
                  'transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/25',
                )}
              >
                <span className="truncate">{u.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
