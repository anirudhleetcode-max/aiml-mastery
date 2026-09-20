'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Network, Search, X } from 'lucide-react';
import { DOMAINS, domainColor } from '@/data/domains';
import { isAtLeast } from '@/features/progress/mastery';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { MASTERY_META } from '@/types/progress';
import type { DomainId } from '@/types/curriculum';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/misc';
import { cn } from '@/lib/cn';
import { GraphCanvas, type FocusRequest } from './graph-canvas';
import type { GraphDomainStat, GraphEdge, GraphNode, GraphTotals } from './types';

export interface KnowledgeGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  domains: GraphDomainStat[];
  totals: GraphTotals;
  initialFocus: string | null;
}

/**
 * The knowledge graph.
 *
 * Two views of one dataset: a force-directed canvas for shape, and a list for
 * anyone using a screen reader or a keyboard. Both read from the same nodes
 * and edges, so they can never drift apart.
 */
export function KnowledgeGraph({ nodes, edges, domains, totals, initialFocus }: KnowledgeGraphProps) {
  const reducedMotion = usePrefersReducedMotion();

  const [view, setView] = React.useState<'graph' | 'list'>('graph');
  const [query, setQuery] = React.useState('');
  const [picked, setPicked] = React.useState<Set<DomainId>>(() => new Set());
  const [completedOnly, setCompletedOnly] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(initialFocus);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [focus, setFocus] = React.useState<FocusRequest | null>(
    initialFocus ? { id: initialFocus, nonce: 0 } : null,
  );
  const nonce = React.useRef(0);

  const byId = React.useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const visible = React.useMemo(() => {
    const out = new Set<string>();
    for (const n of nodes) {
      if (picked.size > 0 && !picked.has(n.domain)) continue;
      if (completedOnly && !n.completed) continue;
      out.add(n.id);
    }
    return out;
  }, [nodes, picked, completedOnly]);

  const matches = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return nodes
      .filter((n) => `${n.title} ${n.id} ${n.module}`.toLowerCase().includes(q))
      .slice(0, 7);
  }, [nodes, query]);

  const listed = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return nodes.filter(
      (n) => visible.has(n.id) && (q.length === 0 || `${n.title} ${n.id} ${n.module}`.toLowerCase().includes(q)),
    );
  }, [nodes, visible, query]);

  const selectAndCentre = React.useCallback((id: string) => {
    nonce.current += 1;
    setSelected(id);
    setFocus({ id, nonce: nonce.current });
  }, []);

  function toggleDomain(id: DomainId) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const active = selected ? byId.get(selected) ?? null : null;
  const shownCount = visible.size;

  const ariaLabel =
    `Force-directed knowledge graph of ${totals.units} units and ${totals.edges} prerequisite links, ` +
    `coloured by domain and sized by how many units each one unlocks. ` +
    `Switch to the list view for the same relationships as text.`;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Knowledge graph</p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">Everything, and what it rests on</h1>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-subtle">
              Each circle is a unit, coloured by domain and sized by how much it unlocks. Arrows run from a
              prerequisite to the unit that needs it. Hover to isolate a neighbourhood, select to read the detail.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-right">
            {[
              { label: 'Units', value: totals.units },
              { label: 'Links', value: totals.edges },
              { label: 'Completed', value: totals.completed },
              { label: 'Mastered', value: totals.mastered },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-[10.5px] uppercase tracking-[0.1em] text-subtle">{s.label}</dt>
                <dd className="text-[17px] font-semibold tabular-nums text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-4 rounded-xl border border-line bg-surface p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-48 flex-1">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && matches[0]) {
                  e.preventDefault();
                  selectAndCentre(matches[0].id);
                  setQuery('');
                }
              }}
              placeholder={`Find a unit among ${totals.units}…`}
              aria-label="Search for a unit and centre it"
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
            {view === 'graph' && matches.length > 0 && (
              <ul className="absolute left-0 right-0 top-11 z-30 overflow-hidden rounded-lg border border-line bg-surface shadow-lift">
                {matches.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => {
                        selectAndCentre(m.id);
                        setQuery('');
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-surface-2"
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: domainColor(m.domain) }}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{m.title}</span>
                      <span className="shrink-0 font-mono text-[11px] text-subtle">{m.id}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Tabs
            items={[
              { id: 'graph', label: 'Graph' },
              { id: 'list', label: 'List' },
            ]}
            value={view}
            onValueChange={(v) => setView(v as 'graph' | 'list')}
            size="sm"
          />

          <button
            type="button"
            aria-pressed={completedOnly}
            onClick={() => setCompletedOnly((v) => !v)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors',
              completedOnly ? 'border-success/40 bg-success/12 text-success' : 'border-line text-subtle hover:text-ink',
            )}
          >
            <Check size={13} /> Only what I have completed
          </button>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by domain">
          <button
            type="button"
            aria-pressed={picked.size === 0}
            onClick={() => setPicked(new Set())}
            className={cn(
              'rounded-lg border px-2.5 py-1 text-[12px] font-medium transition-colors',
              picked.size === 0 ? 'border-primary/40 bg-primary/12 text-primary' : 'border-line text-subtle hover:text-ink',
            )}
          >
            All domains
          </button>
          {domains.map((d) => {
            const on = picked.has(d.id);
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggleDomain(d.id)}
                className="rounded-lg border px-2.5 py-1 text-[12px] font-medium transition-colors"
                style={{
                  borderColor: domainColor(d.id, on ? 0.5 : 0.22),
                  background: on ? domainColor(d.id, 0.14) : 'transparent',
                  color: on ? domainColor(d.id) : undefined,
                }}
                title={`${d.name} — ${d.completed} of ${d.total} complete`}
              >
                {d.shortName}
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-[11.5px] text-subtle">
          Showing {shownCount} of {totals.units} units.
          {picked.size > 0 || completedOnly ? (
            <button
              type="button"
              onClick={() => {
                setPicked(new Set());
                setCompletedOnly(false);
              }}
              className="ml-2 font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </p>
      </div>

      {view === 'graph' ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="h-[58vh] min-h-[380px] w-full sm:h-[66vh]">
              <GraphCanvas
                nodes={nodes}
                edges={edges}
                visible={visible}
                selected={selected}
                hovered={hovered}
                onSelect={setSelected}
                onHover={setHovered}
                focus={focus}
                reducedMotion={reducedMotion}
                ariaLabel={ariaLabel}
              />
            </div>
            <Legend />
          </div>

          <DetailPanel node={active} byId={byId} onPick={selectAndCentre} onClose={() => setSelected(null)} />
        </div>
      ) : (
        <ListView units={listed} byId={byId} total={totals.units} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line px-4 py-2.5 text-[11.5px] text-subtle">
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: domainColor('ML', 0.5) }} aria-hidden />
        not started
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full border"
          style={{ borderColor: domainColor('ML'), background: domainColor('ML', 0.55) }}
          aria-hidden
        />
        in progress
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="h-3 w-3 rounded-full border-2"
          style={{ borderColor: domainColor('ML', 0.4), background: domainColor('ML') }}
          aria-hidden
        />
        mastered
      </span>
      <span>larger circle means it unlocks more</span>
      <span className="hidden sm:inline">drag to pan, scroll to zoom</span>
    </div>
  );
}

function DetailPanel({
  node,
  byId,
  onPick,
  onClose,
}: {
  node: GraphNode | null;
  byId: Map<string, GraphNode>;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  if (!node) {
    return (
      <aside className="rounded-xl border border-line bg-surface p-5">
        <p className="text-[13px] font-medium text-ink">Nothing selected</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-subtle">
          Select a circle to see what it needs, what it unlocks, and where you stand on it. Hovering isolates a unit
          and its immediate neighbours.
        </p>
      </aside>
    );
  }

  const domain = DOMAINS.find((d) => d.id === node.domain);
  const mastery = MASTERY_META[node.mastery];
  const prereqs = node.prereqs.map((id) => byId.get(id)).filter((n): n is GraphNode => Boolean(n));
  const next = node.next.map((id) => byId.get(id)).filter((n): n is GraphNode => Boolean(n));

  return (
    <aside className="max-h-[70vh] overflow-y-auto rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: domainColor(node.domain) }}
          >
            {domain?.name ?? node.domain}
          </p>
          <h2 className="mt-1 text-[15px] font-semibold leading-snug text-ink">{node.title}</h2>
          <p className="mt-1 font-mono text-[11px] text-subtle">{node.id}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Clear selection"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-subtle hover:text-ink"
        >
          <X size={14} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Badge tone={isAtLeast(node.mastery, 'MASTERED') ? 'success' : node.completed ? 'primary' : 'neutral'}>
          {mastery.label}
        </Badge>
        <Badge tone="neutral">difficulty {node.difficulty}</Badge>
        <Badge tone="neutral">{node.minutes}m</Badge>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-subtle">{mastery.requirement}</p>
      <p className="mt-2 text-[12px] text-subtle">{node.module}</p>

      <Relations title="Rests on" items={prereqs} onPick={onPick} empty="Nothing. This is a starting point." />
      <Relations
        title={`Unlocks ${node.next.length > 0 ? `(${node.next.length})` : ''}`.trim()}
        items={next}
        onPick={onPick}
        empty="Nothing yet depends on this one."
      />

      <Link
        href={`/learn/${node.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-primary hover:underline"
      >
        Open the lesson <ArrowRight size={13} />
      </Link>
    </aside>
  );
}

function Relations({
  title,
  items,
  onPick,
  empty,
}: {
  title: string;
  items: GraphNode[];
  onPick: (id: string) => void;
  empty: string;
}) {
  return (
    <div className="mt-4">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">{title}</p>
      {items.length === 0 ? (
        <p className="text-[12px] text-subtle">{empty}</p>
      ) : (
        <ul className="space-y-1">
          {items.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => onPick(r.id)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-surface-2"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: domainColor(r.domain) }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-muted">{r.title}</span>
                {r.completed && <Check size={12} className="shrink-0 text-success" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ListView({ units, byId, total }: { units: GraphNode[]; byId: Map<string, GraphNode>; total: number }) {
  if (units.length === 0) {
    return (
      <EmptyState
        className="mt-4"
        icon={<Network size={18} />}
        title="No units match"
        body="Widen the domain filter, clear the search, or turn off the completed-only filter."
      />
    );
  }

  return (
    <div className="mt-4">
      <p className="mb-2 text-[12px] text-subtle">
        {units.length} of {total} units, with their prerequisite relationships as text.
      </p>
      <ul className="space-y-2">
        {units.map((u) => {
          const prereqs = u.prereqs.map((id) => byId.get(id)).filter((n): n is GraphNode => Boolean(n));
          const next = u.next.map((id) => byId.get(id)).filter((n): n is GraphNode => Boolean(n));
          return (
            <li key={u.id} className="rounded-xl border border-line bg-surface p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: u.completed ? domainColor(u.domain) : domainColor(u.domain, 0.2),
                    boxShadow: `0 0 0 1px ${domainColor(u.domain, 0.6)}`,
                  }}
                  aria-hidden
                />
                <Link href={`/learn/${u.slug}`} className="text-[13.5px] font-medium text-ink hover:text-primary">
                  {u.title}
                </Link>
                <span className="font-mono text-[11px] text-subtle">{u.id}</span>
                <Badge tone={isAtLeast(u.mastery, 'MASTERED') ? 'success' : u.completed ? 'primary' : 'neutral'}>
                  {MASTERY_META[u.mastery].label}
                </Badge>
              </div>

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <RelationLinks label="Rests on" items={prereqs} empty="nothing — a starting point" />
                <RelationLinks label="Unlocks" items={next} empty="nothing yet" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RelationLinks({ label, items, empty }: { label: string; items: GraphNode[]; empty: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">{label}</p>
      {items.length === 0 ? (
        <p className="mt-1 text-[12px] text-subtle">{empty}</p>
      ) : (
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {items.map((r) => (
            <li key={r.id}>
              <Link
                href={`/learn/${r.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2 py-1 text-[12px] text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: domainColor(r.domain) }}
                  aria-hidden
                />
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
