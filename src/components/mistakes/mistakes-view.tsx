'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import type { DomainId } from '@/types/curriculum';
import { domainColor } from '@/data/domains';
import { useLearnerStore } from '@/lib/store/learner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/input';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/misc';
import { prettyDate, relativeTime } from '@/lib/format';

export interface MistakeRow {
  id: string;
  questionId: string;
  unitId: string;
  unitTitle: string;
  unitSlug: string;
  domainId: DomainId;
  domainName: string;
  prompt: string;
  yourAnswer: string;
  correctAnswer: string;
  why: string;
  concept: string;
  createdAt: string;
  reviewAt: string;
  resolved: boolean;
  timesWrong: number;
}

type View = 'unresolved' | 'due' | 'resolved' | 'all';

const VIEWS: { id: View; label: string }[] = [
  { id: 'unresolved', label: 'Unresolved' },
  { id: 'due', label: 'Due now' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'all', label: 'All' },
];

/**
 * The revision database, filtered and grouped.
 *
 * Resolution is a learner judgement rather than a score, so it writes through
 * the ordinary event queue and projects locally first — the card settles the
 * moment it is pressed, offline or not.
 */
export function MistakesView({
  rows,
  today,
  domains,
}: {
  rows: MistakeRow[];
  today: string;
  domains: { id: DomainId; name: string }[];
}) {
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);
  const liveMistakes = useLearnerStore((s) => s.state?.mistakes);

  const [view, setView] = React.useState<View>('unresolved');
  const [domain, setDomain] = React.useState<string>('all');

  const resolvedById = React.useMemo(() => {
    const map = new Map<string, boolean>();
    for (const m of liveMistakes ?? []) map.set(m.questionId, m.resolved);
    return map;
  }, [liveMistakes]);

  const isResolved = React.useCallback(
    (row: MistakeRow) => resolvedById.get(row.questionId) ?? row.resolved,
    [resolvedById],
  );

  function toggle(row: MistakeRow) {
    const next = !isResolved(row);
    emit({ type: 'mistake-resolved', questionId: row.questionId, resolved: next });
    patch((s) => ({
      ...s,
      mistakes: s.mistakes.map((m) => (m.questionId === row.questionId ? { ...m, resolved: next } : m)),
    }));
  }

  const counts = React.useMemo(() => {
    let unresolved = 0;
    let due = 0;
    let resolved = 0;
    for (const r of rows) {
      if (isResolved(r)) resolved += 1;
      else {
        unresolved += 1;
        if (r.reviewAt <= today) due += 1;
      }
    }
    return { unresolved, due, resolved, all: rows.length };
  }, [rows, isResolved, today]);

  const filtered = React.useMemo(() => {
    return rows.filter((r) => {
      if (domain !== 'all' && r.domainId !== domain) return false;
      const resolved = isResolved(r);
      switch (view) {
        case 'unresolved':
          return !resolved;
        case 'due':
          return !resolved && r.reviewAt <= today;
        case 'resolved':
          return resolved;
        default:
          return true;
      }
    });
  }, [rows, domain, view, isResolved, today]);

  const grouped = React.useMemo(() => {
    const order: DomainId[] = [];
    const map = new Map<DomainId, MistakeRow[]>();
    for (const r of filtered) {
      const list = map.get(r.domainId);
      if (list) list.push(r);
      else {
        map.set(r.domainId, [r]);
        order.push(r.domainId);
      }
    }
    return order.map((id) => ({ id, name: map.get(id)![0]!.domainName, rows: map.get(id)! }));
  }, [filtered]);

  const selectId = React.useId();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tabs
          items={VIEWS.map((v) => ({
            id: v.id,
            label: v.label,
            badge: (
              <span className="tabular-nums text-subtle">
                {v.id === 'unresolved'
                  ? counts.unresolved
                  : v.id === 'due'
                    ? counts.due
                    : v.id === 'resolved'
                      ? counts.resolved
                      : counts.all}
              </span>
            ),
          }))}
          value={view}
          onValueChange={(id) => setView(id as View)}
          className="min-w-0 flex-1"
        />
        <div className="flex items-center gap-2">
          <label htmlFor={selectId} className="text-[12.5px] font-medium text-subtle">
            Domain
          </label>
          <Select
            id={selectId}
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="h-9 w-44 text-[13px]"
          >
            <option value="all">All domains</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={view === 'resolved' ? 'Nothing marked resolved yet' : 'Nothing here'}
          body={
            view === 'resolved'
              ? 'Work through an entry, then mark it resolved to move it into this list.'
              : 'No entries match this filter. Widen it, or take a test to see where the gaps are.'
          }
        />
      ) : (
        <div className="space-y-6">
          {grouped.map((group) => (
            <section key={group.id} aria-label={`${group.name} mistakes`}>
              <h2 className="mb-2.5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-subtle">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: domainColor(group.id) }}
                  aria-hidden
                />
                {group.name}
                <span className="tabular-nums font-normal">{group.rows.length}</span>
              </h2>
              <ul className="space-y-3">
                {group.rows.map((row) => (
                  <li key={row.id}>
                    <MistakeCard row={row} resolved={isResolved(row)} today={today} onToggle={() => toggle(row)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function MistakeCard({
  row,
  resolved,
  today,
  onToggle,
}: {
  row: MistakeRow;
  resolved: boolean;
  today: string;
  onToggle: () => void;
}) {
  const due = !resolved && row.reviewAt <= today;

  return (
    <article className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="primary">{row.concept}</Badge>
        {row.timesWrong > 1 && <Badge tone="warning">{row.timesWrong} times wrong</Badge>}
        {resolved ? (
          <Badge tone="success">Resolved</Badge>
        ) : due ? (
          <Badge tone="danger">Due {prettyDate(row.reviewAt)}</Badge>
        ) : (
          <Badge tone="neutral">Review {prettyDate(row.reviewAt)}</Badge>
        )}
        <span className="ml-auto text-[11.5px] text-subtle">{relativeTime(row.createdAt)}</span>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-ink">{row.prompt}</p>

      <dl className="mt-3.5 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-danger/25 bg-danger/[0.06] p-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-danger">You answered</dt>
          <dd className="mt-1 whitespace-pre-wrap text-[13px] leading-relaxed text-muted">{row.yourAnswer}</dd>
        </div>
        <div className="rounded-lg border border-success/25 bg-success/[0.06] p-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-success">Correct answer</dt>
          <dd className="mt-1 whitespace-pre-wrap text-[13px] leading-relaxed text-muted">{row.correctAnswer}</dd>
        </div>
      </dl>

      <p className="mt-3 text-[13px] leading-relaxed text-muted">
        <span className="font-medium text-ink">Why it was wrong: </span>
        {row.why}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3.5">
        <Link
          href={`/learn/${row.unitSlug}`}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-primary-ink hover:underline"
        >
          {row.unitTitle}
          <ArrowRight size={12} />
        </Link>
        <Button
          size="sm"
          variant={resolved ? 'ghost' : 'subtle'}
          aria-pressed={resolved}
          onClick={onToggle}
          className="ml-auto"
        >
          {resolved ? (
            <>
              <RotateCcw size={13} /> Put back
            </>
          ) : (
            <>
              <Check size={13} /> Mark resolved
            </>
          )}
        </Button>
      </div>
    </article>
  );
}
