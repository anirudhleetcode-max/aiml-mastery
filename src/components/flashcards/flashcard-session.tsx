'use client';

import * as React from 'react';
import Link from 'next/link';
import { Check, RotateCw, Shuffle } from 'lucide-react';
import type { DomainId } from '@/types/curriculum';
import { domainColor } from '@/data/domains';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress';
import { EmptyState } from '@/components/ui/misc';
import { pct } from '@/lib/format';
import { cn } from '@/lib/cn';
import { useLearnerStore } from '@/lib/store/learner';

export interface DeckUnit {
  unitId: string;
  title: string;
  slug: string;
  domainId: DomainId;
  domainName: string;
  bookmarked: boolean;
  weak: boolean;
  due: boolean;
  /** `due` is per card: never graded, or scheduled for today or earlier. */
  cards: { front: string; back: string; due: boolean }[];
}

interface SessionCard {
  key: string;
  front: string;
  back: string;
  unitTitle: string;
  unitSlug: string;
  domainId: DomainId;
}

type DeckId = string;

interface Session {
  /** Identity of the deck this session was built from. */
  source: SessionCard[];
  queue: string[];
  position: number;
  flipped: boolean;
  known: Set<string>;
  again: Set<string>;
}

function freshSession(source: SessionCard[], queue?: string[]): Session {
  return {
    source,
    queue: queue ?? source.map((c) => c.key),
    position: 0,
    flipped: false,
    known: new Set(),
    again: new Set(),
  };
}

/** Deterministic shuffle so a re-render never reorders the deck mid-session. */
function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * A study session across the whole curriculum.
 *
 * Each verdict is recorded and schedules the card on the same ladder unit
 * review uses, so a card you could not recall comes back tomorrow and one you
 * knew comes back later. Grading is still the learner's own call — recall has
 * no machine-checkable form — but it now has consequences, which is the only
 * thing that makes honest grading worth anything.
 */
export function FlashcardSession({
  units,
  domains,
  fallback,
}: {
  units: DeckUnit[];
  domains: { id: DomainId; name: string }[];
  /** True when no unit has been started and the deck comes from the first domain. */
  fallback: boolean;
}) {
  const decks = React.useMemo(() => {
    const counts = {
      dueCards: units.reduce((a, u) => a + u.cards.filter((c) => c.due).length, 0),
      bookmarked: units.filter((u) => u.bookmarked).length,
      weak: units.filter((u) => u.weak).length,
      due: units.filter((u) => u.due).length,
    };
    const list: { id: DeckId; label: string }[] = [
      {
        id: 'all',
        label: fallback
          ? `The opening domain (${units.length} units)`
          : `Everything you have started (${units.length} units)`,
      },
    ];
    if (counts.bookmarked > 0) list.push({ id: 'bookmarked', label: `Bookmarked units (${counts.bookmarked})` });
    if (counts.weak > 0) list.push({ id: 'weak', label: `Units you are weak on (${counts.weak})` });
    if (counts.dueCards > 0) {
      // Listed first because it is the deck a returning learner wants: the
      // individual cards their own grading has scheduled for today.
      list.unshift({ id: 'due-cards', label: `Cards due now (${counts.dueCards})` });
    }
    if (counts.due > 0) list.push({ id: 'due', label: `Units due for review (${counts.due})` });
    for (const d of domains) {
      const n = units.filter((u) => u.domainId === d.id).length;
      if (n > 0) list.push({ id: `domain:${d.id}`, label: `${d.name} (${n})` });
    }
    return list;
  }, [units, domains, fallback]);

  const [deck, setDeck] = React.useState<DeckId>('all');
  const [shuffle, setShuffle] = React.useState(true);
  const [seed, setSeed] = React.useState(1);

  const cards: SessionCard[] = React.useMemo(() => {
    const selected = units.filter((u) => {
      if (deck === 'all') return true;
      if (deck === 'bookmarked') return u.bookmarked;
      if (deck === 'weak') return u.weak;
      if (deck === 'due') return u.due;
      if (deck === 'due-cards') return u.cards.some((c) => c.due);
      if (deck.startsWith('domain:')) return u.domainId === deck.slice(7);
      return true;
    });
    const flat = selected.flatMap((u) =>
      u.cards
        // The card-level deck narrows to the individual cards that are due,
        // not merely to units containing one.
        .map((c, i) => ({ c, i }))
        .filter(({ c }) => (deck === 'due-cards' ? c.due : true))
        .map(({ c, i }) => ({
          key: `${u.unitId}:${i}`,
          front: c.front,
          back: c.back,
          unitTitle: u.title,
          unitSlug: u.slug,
          domainId: u.domainId,
        })),
    );
    return shuffle ? shuffled(flat, seed) : flat;
  }, [units, deck, shuffle, seed]);

  // The session is derived from the deck during render rather than in an
  // effect, so the first card is on screen in the server-rendered HTML instead
  // of appearing a frame later.
  const emit = useLearnerStore((s) => s.emit);
  const [session, setSession] = React.useState<Session>(() => freshSession(cards));
  let current = session;
  if (current.source !== cards) {
    current = freshSession(cards);
    setSession(current);
  }

  const { queue, position, flipped, known, again } = current;

  const byKey = React.useMemo(() => new Map(cards.map((c) => [c.key, c])), [cards]);
  const currentKey = queue[position];
  const card = currentKey ? byKey.get(currentKey) : undefined;
  const finished = queue.length > 0 && position >= queue.length;

  function mark(kind: 'known' | 'again') {
    const key = current.queue[current.position];
    if (key) {
      // `unitId:index` is the card's address; the server bounds the index
      // against the real deck, so a stale key records nothing.
      const [unitId, rawIndex] = key.split(':');
      const cardIndex = Number(rawIndex);
      if (unitId && Number.isInteger(cardIndex) && cardIndex >= 0) {
        emit({ type: 'flashcard-reviewed', unitId, cardIndex, grade: kind });
      }
    }
    setSession((s) => {
      const key = s.queue[s.position];
      if (!key) return s;
      const next = new Set(kind === 'known' ? s.known : s.again).add(key);
      return {
        ...s,
        known: kind === 'known' ? next : s.known,
        again: kind === 'again' ? next : s.again,
        flipped: false,
        position: s.position + 1,
      };
    });
  }

  function setFlipped(update: (f: boolean) => boolean) {
    setSession((s) => ({ ...s, flipped: update(s.flipped) }));
  }

  function restart(keys: string[]) {
    setSession(freshSession(cards, keys));
  }

  const deckSelectId = React.useId();
  const total = queue.length;
  const reviewed = Math.min(position, total);

  if (units.length === 0) {
    return (
      <EmptyState
        title="No cards to study yet"
        body="Flashcards are written alongside every unit. Open a lesson and its cards join this deck."
        action={
          <Link href="/roadmap">
            <Button size="sm">Find a unit</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-line bg-surface p-4">
        <div className="min-w-0 flex-1">
          <label htmlFor={deckSelectId} className="text-[12.5px] font-medium text-ink">
            Deck
          </label>
          <Select
            id={deckSelectId}
            value={deck}
            onChange={(e) => setDeck(e.target.value)}
            className="mt-1.5"
          >
            {decks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </Select>
        </div>
        <Button
          variant={shuffle ? 'subtle' : 'secondary'}
          aria-pressed={shuffle}
          onClick={() => {
            setShuffle((s) => !s);
            setSeed((s) => s + 1);
          }}
        >
          <Shuffle size={14} /> Shuffle
        </Button>
        {shuffle && (
          <Button variant="ghost" onClick={() => setSeed((s) => s + 1)}>
            <RotateCw size={14} /> Reshuffle
          </Button>
        )}
      </div>

      {fallback && (
        <p className="rounded-lg border border-line bg-surface-2 px-4 py-3 text-[12.5px] leading-relaxed text-subtle">
          You have not started a unit yet, so this deck is the opening domain. Once you begin working through the
          curriculum, the deck follows what you have covered.
        </p>
      )}

      {total === 0 ? (
        <EmptyState
          title="This deck is empty"
          body="Choose another deck, or start a unit in this one to bring its cards in."
        />
      ) : finished ? (
        <Summary
          total={total}
          known={known.size}
          again={again.size}
          flagged={[...again]
            .map((k) => byKey.get(k))
            .filter((c): c is SessionCard => Boolean(c))}
          onRunAgain={() => restart(cards.map((c) => c.key))}
          onRunFlagged={() => restart([...again])}
        />
      ) : (
        <>
          <div className="flex items-center gap-3">
            <ProgressBar value={total ? reviewed / total : 0} className="flex-1" size="sm" label="Cards reviewed" />
            <span className="shrink-0 text-[12px] tabular-nums text-subtle">
              {reviewed + 1}/{total}
            </span>
          </div>

          {card && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: domainColor(card.domainId) }}
                  aria-hidden
                />
                <Link
                  href={`/learn/${card.unitSlug}`}
                  className="truncate text-[12.5px] font-medium text-muted hover:text-primary-ink hover:underline"
                >
                  {card.unitTitle}
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                aria-pressed={flipped}
                aria-label={flipped ? 'Show the question' : 'Show the answer'}
                className="grid min-h-56 w-full place-items-center rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-6 text-center transition-colors hover:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:p-8"
              >
                <div>
                  <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-subtle">
                    {flipped ? 'Answer' : 'Question'}
                  </p>
                  <p
                    className={cn(
                      'leading-relaxed',
                      flipped ? 'text-[15px] text-muted' : 'text-[17px] font-medium text-ink',
                    )}
                  >
                    {flipped ? card.back : card.front}
                  </p>
                  {!flipped && <p className="mt-5 text-[12px] text-subtle">Answer it out loud, then flip</p>}
                </div>
              </button>

              <p aria-live="polite" className="sr-only">
                Card {reviewed + 1} of {total}. {flipped ? 'Answer shown.' : 'Question shown.'}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => mark('again')} disabled={!flipped}>
                    <RotateCw size={13} /> Review again
                  </Button>
                  <Button size="sm" variant="subtle" onClick={() => mark('known')} disabled={!flipped}>
                    <Check size={13} /> I knew it
                  </Button>
                </div>
                <div className="flex gap-2 text-[12px]">
                  <Badge tone="success">{known.size} known</Badge>
                  <Badge tone="warning">{again.size} to review</Badge>
                </div>
              </div>

              {!flipped && (
                <p className="text-[12px] text-subtle">
                  Flip the card before judging yourself. Deciding you knew it before seeing the answer is the one way
                  to get nothing out of this.
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

function Summary({
  total,
  known,
  again,
  flagged,
  onRunAgain,
  onRunFlagged,
}: {
  total: number;
  known: number;
  again: number;
  flagged: SessionCard[];
  onRunAgain: () => void;
  onRunFlagged: () => void;
}) {
  const units = [...new Set(flagged.map((c) => c.unitTitle))].slice(0, 6);

  return (
    <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-ink">Session complete</p>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-ink">
        {known} of {total} recalled
      </h2>
      <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-subtle">
        {again === 0
          ? 'Every card in this deck came back. Recall at this level is what a test measures, so this one is ready.'
          : `That is ${pct(total ? known / total : 0)} on this deck. The ${again} card${again === 1 ? '' : 's'} you flagged are the ones worth another pass.`}
      </p>

      <ProgressBar value={total ? known / total : 0} className="mt-4" label="Cards recalled" />

      {units.length > 0 && (
        <div className="mt-4 border-t border-line pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Flagged cards came from</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {units.map((u) => (
              <Badge key={u} tone="neutral">
                {u}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" onClick={onRunAgain}>
          Run the deck again
        </Button>
        {again > 0 && (
          <Button size="sm" variant="secondary" onClick={onRunFlagged}>
            Only the {again} flagged
          </Button>
        )}
      </div>
    </div>
  );
}
