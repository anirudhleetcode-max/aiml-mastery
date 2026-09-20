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
        cards: u.flashcards.map((c) => ({ front: c.front, back: c.back })),
      };
    });

  const present = new Set(units.map((u) => u.domainId));
  const domains: { id: DomainId; name: string }[] = DOMAINS.filter((d) => present.has(d.id)).map((d) => ({
    id: d.id,
    name: d.name,
  }));

  const totalCards = units.reduce((a, u) => a + u.cards.length, 0);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Flashcards</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Recall beats recognition. Say the answer out loud before you flip: the effort of retrieving it is what moves
          a fact from the page into memory. Nothing here is recorded, so judge yourself honestly.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Cards available" value={totalCards} />
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
