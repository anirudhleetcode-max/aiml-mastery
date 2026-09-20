'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { domainColor } from '@/data/domains';
import type { DomainId } from '@/types/curriculum';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/misc';

export interface FormulaItem {
  key: string;
  name: string;
  /** Category key, or 'other' when the author left it unset. */
  category: string;
  /** Lower-cased name + meaning + variable descriptions, built on the server. */
  haystack: string;
  units: { id: string; title: string; slug: string; domain: DomainId }[];
  /** The whole card, rendered on the server so KaTeX never ships to the browser. */
  card: React.ReactNode;
}

export interface FormulaCategoryOption {
  id: string;
  label: string;
  count: number;
}

/**
 * The formula lab's reading surface.
 *
 * Every card arrives pre-rendered from the server — the browser receives
 * typeset HTML and a small search string per formula, never KaTeX or the
 * curriculum itself. Choosing a category shows that category; typing searches
 * across all of them, because a formula is usually easier to recall by what it
 * does than by where it was filed.
 */
export function FormulaLab({
  items,
  categories,
}: {
  items: FormulaItem[];
  categories: FormulaCategoryOption[];
}) {
  const [category, setCategory] = React.useState(categories[0]?.id ?? 'other');
  const [query, setQuery] = React.useState('');
  const deferredQuery = React.useDeferredValue(query);

  const searching = deferredQuery.trim().length > 0;

  const visible = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return items.filter((i) => i.category === category);
    return items.filter((i) => i.haystack.includes(q));
  }, [items, category, deferredQuery]);

  const groups = React.useMemo(() => {
    const out: { id: string; label: string; items: FormulaItem[] }[] = [];
    for (const c of categories) {
      const matched = visible.filter((i) => i.category === c.id);
      if (matched.length > 0) out.push({ id: c.id, label: c.label, items: matched });
    }
    return out;
  }, [visible, categories]);

  const activeLabel = categories.find((c) => c.id === category)?.label ?? 'Formulas';

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <label htmlFor="formula-search" className="sr-only">
            Search formulas by name, meaning or variable
          </label>
          <Search
            size={15}
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
          />
          <Input
            id="formula-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a name, what it means, or what a symbol stands for"
            autoComplete="off"
            aria-describedby="formula-count"
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

        <Tabs
          items={categories.map((c) => ({
            id: c.id,
            label: c.label,
            badge: (
              <span className="ml-0.5 rounded bg-surface-3 px-1 text-[10.5px] tabular-nums text-subtle">
                {c.count}
              </span>
            ),
          }))}
          value={category}
          onValueChange={setCategory}
          className={searching ? 'opacity-60' : undefined}
        />

        <p id="formula-count" role="status" aria-live="polite" className="text-[12.5px] text-subtle">
          {searching
            ? `${visible.length} formula${visible.length === 1 ? '' : 's'} match, across every category`
            : `${visible.length} formula${visible.length === 1 ? '' : 's'} in ${activeLabel.toLowerCase()}`}
        </p>
      </div>

      <div role="tabpanel" aria-label={searching ? 'Search results' : activeLabel} className="space-y-6">
        {groups.length === 0 ? (
          <EmptyState
            title="Nothing matches that"
            body="Search covers the name, the meaning and every variable description. A shorter word usually finds more."
            action={
              <Button size="sm" variant="secondary" onClick={() => setQuery('')}>
                Clear the search
              </Button>
            }
          />
        ) : (
          groups.map((g) => (
            <section key={g.id} aria-labelledby={`formula-group-${g.id}`}>
              {searching && (
                <h2
                  id={`formula-group-${g.id}`}
                  className="mb-3 flex items-baseline gap-2 border-b border-line pb-2 text-[14px] font-semibold text-ink"
                >
                  {g.label}
                  <span className="text-[11.5px] font-normal text-subtle">{g.items.length}</span>
                </h2>
              )}
              {!searching && (
                <h2 id={`formula-group-${g.id}`} className="sr-only">
                  {g.label}
                </h2>
              )}
              <ul className="grid gap-3 lg:grid-cols-2">
                {g.items.map((item) => (
                  <li key={item.key} className="flex flex-col">
                    {item.card}
                    <p className="mt-2 flex flex-wrap items-center gap-1.5 px-1 text-[11.5px] text-subtle">
                      <span>Taught in</span>
                      {item.units.map((u) => (
                        <Link
                          key={u.id}
                          href={`/learn/${u.slug}`}
                          className="inline-flex max-w-full items-center rounded-md border px-2 py-0.5 transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/25"
                          style={{
                            color: domainColor(u.domain),
                            borderColor: domainColor(u.domain, 0.35),
                            backgroundColor: domainColor(u.domain, 0.08),
                          }}
                        >
                          <span className="truncate">{u.title}</span>
                        </Link>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
