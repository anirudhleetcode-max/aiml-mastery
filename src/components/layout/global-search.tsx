'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Search } from 'lucide-react';
import { KIND_LABELS, type SearchResult } from '@/features/curriculum/search';
import { domainColor } from '@/data/domains';
import { Kbd } from '@/components/ui/misc';
import { cn } from '@/lib/cn';

/**
 * Global search. Opens with ⌘K / Ctrl-K, searches lessons, definitions,
 * formulas, common mistakes, interview questions, flashcards and code.
 * Implemented as a combobox so it is usable entirely from the keyboard.
 */
export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 10);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  React.useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=18`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as { results: SearchResult[] };
        setResults(data.results);
        setActive(0);
      } catch {
        /* aborted or offline */
      } finally {
        setLoading(false);
      }
    }, 170);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  React.useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  function go(result: SearchResult) {
    setOpen(false);
    setQuery('');
    router.push(result.href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      const r = results[active];
      if (r) {
        e.preventDefault();
        go(r);
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 10);
        }}
        className="flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 text-[13px] text-subtle transition-colors hover:border-line-strong hover:text-muted sm:max-w-sm"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Search everything…</span>
        <Kbd>⌘K</Kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
          <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
          <div
            role="combobox"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-controls="search-results"
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={17} className="shrink-0 text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search lessons, definitions, formulas, mistakes, interview questions…"
                aria-label="Search the curriculum"
                aria-autocomplete="list"
                aria-activedescendant={results[active] ? `search-opt-${active}` : undefined}
                className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle"
              />
              {loading && <Loader2 size={15} className="animate-spin text-subtle" />}
            </div>

            <ul
              ref={listRef}
              id="search-results"
              role="listbox"
              aria-label="Search results"
              className="max-h-[55vh] overflow-y-auto p-2"
            >
              {results.length === 0 && query.trim().length >= 2 && !loading && (
                <li className="px-3 py-10 text-center text-[13px] text-subtle">
                  Nothing matched &ldquo;{query}&rdquo;. Try a concept name like &ldquo;overfitting&rdquo; or
                  &ldquo;broadcasting&rdquo;.
                </li>
              )}
              {results.length === 0 && query.trim().length < 2 && (
                <li className="px-3 py-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Try searching for</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {['overfitting', 'gradient descent', 'broadcasting', 'precision recall', 'attention', 'GROUP BY', 'eigenvector'].map(
                      (s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setQuery(s)}
                          className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-[12.5px] text-muted hover:border-line-strong hover:text-ink"
                        >
                          {s}
                        </button>
                      ),
                    )}
                  </div>
                </li>
              )}
              {results.map((r, i) => (
                <li key={`${r.kind}-${r.unitId}-${i}`}>
                  <button
                    id={`search-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    data-active={i === active}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      i === active ? 'bg-surface-2' : 'hover:bg-surface-2/60',
                    )}
                  >
                    <span
                      className="mt-1 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: domainColor(r.domain) }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[13.5px] font-medium text-ink">{r.title}</span>
                        <span className="shrink-0 rounded bg-surface-3 px-1.5 py-0.5 text-[10.5px] text-subtle">
                          {KIND_LABELS[r.kind]}
                        </span>
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-[12.5px] text-subtle">{r.snippet}</span>
                      <span className="mt-0.5 block text-[11px] text-subtle/80">
                        {r.domainName} · {r.unitTitle}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[11px] text-subtle">
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>↵</Kbd> open
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>esc</Kbd> close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
