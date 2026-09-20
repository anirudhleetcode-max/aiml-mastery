'use client';

import * as React from 'react';
import Link from 'next/link';
import { Shuffle } from 'lucide-react';
import type { LearningUnit } from '@/types/curriculum';
import { TeachBackSection } from '@/components/lesson/interactive';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { domainColor } from '@/data/domains';
import type { DomainId } from '@/types/curriculum';
import { pct, relativeTime } from '@/lib/format';
import { cn } from '@/lib/cn';

export interface TeachableUnit {
  id: string;
  title: string;
  slug: string;
  domain: DomainId;
  domainName: string;
  bestTeachingScore: number | null;
  lastTaughtAt: string | null;
  mastery: string;
}

/**
 * Teacher mode.
 *
 * Two modes: pick a concept deliberately, or take a random one — the second
 * is the closer simulation of being asked in an interview, which is the point
 * of the final teacher challenge.
 */
export function TeachHub({
  units,
  unitsById,
  challengeMode,
}: {
  units: TeachableUnit[];
  /** Full units, keyed by id, for the ones the learner can teach. */
  unitsById: Record<string, LearningUnit>;
  challengeMode?: boolean;
}) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState('');
  const [challengeQueue, setChallengeQueue] = React.useState<string[]>([]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return units;
    return units.filter((u) => `${u.title} ${u.domainName}`.toLowerCase().includes(q));
  }, [units, query]);

  const current = selected ? unitsById[selected] : null;

  function pickRandom() {
    const pool = units.filter((u) => u.id !== selected);
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)]!;
    setSelected(pick.id);
    setChallengeQueue((q) => [...q, pick.id]);
  }

  if (current) {
    const meta = units.find((u) => u.id === current.id)!;
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="text-[12.5px] text-subtle hover:text-ink"
          >
            ← Choose a different concept
          </button>
          <div className="flex items-center gap-2">
            {challengeMode && (
              <span className="text-[12px] text-subtle">
                {challengeQueue.length} concept{challengeQueue.length === 1 ? '' : 's'} this session
              </span>
            )}
            <Button size="sm" variant="secondary" onClick={pickRandom}>
              <Shuffle size={13} /> Another at random
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: domainColor(meta.domain) }}
              aria-hidden
            />
            <span className="text-[12px] text-subtle">{meta.domainName}</span>
            {meta.bestTeachingScore !== null && (
              <Badge tone={meta.bestTeachingScore >= 0.8 ? 'success' : 'info'}>
                best {pct(meta.bestTeachingScore)}
              </Badge>
            )}
            <Link href={`/learn/${current.slug}`} className="ml-auto text-[12px] text-primary hover:underline">
              Open the lesson
            </Link>
          </div>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-ink">{current.title}</h2>
        </div>

        <TeachBackSection unit={current} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-primary/25 bg-primary/[0.05] p-5">
        <h2 className="text-[15px] font-semibold text-ink">
          {challengeMode ? 'The final teacher challenge' : 'Pick something to teach'}
        </h2>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted">
          {challengeMode
            ? 'You are given concepts at random, the way an interviewer would. Explain each one as though to a bright nine-year-old who has never met it. No notes, no lesson open in another tab.'
            : 'Explaining a concept without notes is the only test that cannot be passed by recognition. Choose one you have finished, or take a random one.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={pickRandom} disabled={units.length === 0}>
            <Shuffle size={15} /> Give me a random concept
          </Button>
        </div>
      </div>

      {units.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-12 text-center text-[13px] leading-relaxed text-subtle">
          Teacher mode opens up once you have completed a lesson. Explaining something you have not yet read is not a
          useful exercise.
        </p>
      ) : (
        <>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a concept…"
            aria-label="Search concepts you can teach"
          />

          <ul className="grid gap-2 sm:grid-cols-2">
            {filtered.map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  onClick={() => setSelected(u.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface p-3.5 text-left transition-colors hover:border-line-strong hover:bg-surface-2"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: domainColor(u.domain) }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink">{u.title}</span>
                    <span className="text-[11.5px] text-subtle">
                      {u.domainName}
                      {u.lastTaughtAt && ` · taught ${relativeTime(u.lastTaughtAt)}`}
                    </span>
                  </span>
                  {u.bestTeachingScore !== null && (
                    <span
                      className={cn(
                        'shrink-0 text-[12px] font-medium tabular-nums',
                        u.bestTeachingScore >= 0.8 ? 'text-success' : 'text-warning',
                      )}
                    >
                      {pct(u.bestTeachingScore)}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-[13px] text-subtle">
              Nothing matches &ldquo;{query}&rdquo;.
            </p>
          )}
        </>
      )}
    </div>
  );
}
