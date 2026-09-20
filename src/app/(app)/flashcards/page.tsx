import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { progressFor } from '@/features/progress/overview';
import { isWeak, requirementsFor } from '@/features/progress/mastery';
import { isDueForReview } from '@/features/revision/spaced';
import { ALL_UNITS, unitsOfDomain } from '@/data/curriculum';
import { DOMAIN_BY_ID, DOMAINS } from '@/data/domains';
import { Stat } from '@/components/ui/misc';
import { FlashcardSession, type DeckUnit } from '@/components/flashcards/flashcard-session';
import { dateKey } from '@/lib/format';
import type { DomainId, LearningUnit } from '@/types/curriculum';

export const metadata: Metadata = { title: 'Flashcards' };
export const dynamic = 'force-dynamic';

export default async function FlashcardsPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const today = dateKey();

  const started = ALL_UNITS.filter((u) => {
    const p = state.units[u.id];
    return Boolean(p && (p.lessonCompletedAt || p.attempts > 0 || p.lastStudiedAt));
  });

  const fallback = started.length === 0;
  const firstDomain = DOMAINS[0]!;
  const source: LearningUnit[] = fallback ? unitsOfDomain(firstDomain.id) : started;

  // Per-card schedule. A card the learner graded has its own next-review
  // date, which is finer than the unit-level date used elsewhere: you can
  // know nine cards in a unit and keep missing the tenth.
  const reviewByCard = new Map(
    state.flashcardReviews.map((r) => [`${r.unitId}:${r.cardIndex}`, r]),
  );
  const cardDue = (unitId: string, index: number) => {
    const r = reviewByCard.get(`${unitId}:${index}`);
    // Never graded counts as due: it has not been tested even once.
    return !r || r.nextReviewAt <= today;
  };

  const units: DeckUnit[] = source
    .filter((u) => u.flashcards.length > 0)
    .map((u) => {
      const p = progressFor(state, u.id);
      return {
        unitId: u.id,
        title: u.title,
        slug: u.slug,
        domainId: u.domain,
        domainName: DOMAIN_BY_ID[u.domain]?.name ?? u.domain,
        bookmarked: p.bookmarked,
        weak: isWeak(p, requirementsFor(u)),
        due: isDueForReview(p, today),
        cards: u.flashcards.map((c, i) => ({ front: c.front, back: c.back, due: cardDue(u.id, i) })),
      };
    });

  const present = new Set(units.map((u) => u.domainId));
  const domains: { id: DomainId; name: string }[] = DOMAINS.filter((d) => present.has(d.id)).map((d) => ({
    id: d.id,
    name: d.name,
  }));

  const totalCards = units.reduce((a, u) => a + u.cards.length, 0);
  const dueCards = units.reduce((a, u) => a + u.cards.filter((c) => c.due).length, 0);
  const gradedCards = state.flashcardReviews.length;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Flashcards</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Recall beats recognition. Say the answer out loud before you flip: the effort of retrieving it is what moves
          a fact from the page into memory. Your verdict schedules the card: one you could not recall returns
          tomorrow, one you knew returns later. Judge yourself honestly — nobody else sees it, and a flattering
          verdict only buys you a card you have not learned.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Cards available" value={totalCards} />
        <Stat label="Due now" value={dueCards} tone={dueCards > 0 ? 'warning' : 'success'} sub="Never graded, or scheduled for today" />
        <Stat label="Graded" value={gradedCards} sub="Cards with a review history" />
        <Stat label="Units in deck" value={units.length} />
        <Stat
          label="Domains"
          value={domains.length}
          className="col-span-2 sm:col-span-1"
          sub={domains.length > 0 ? domains.map((d) => d.name).slice(0, 3).join(' · ') : undefined}
        />
      </div>

      <FlashcardSession units={units} domains={domains} fallback={fallback} />
    </div>
  );
}
