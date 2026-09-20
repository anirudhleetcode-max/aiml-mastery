import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { progressFor } from '@/features/progress/overview';
import { computeMastery, isWeak, requirementsFor } from '@/features/progress/mastery';
import { ALL_UNITS, DOMAIN_UNIT_COUNTS } from '@/data/curriculum';
import { DOMAINS } from '@/data/domains';
import {
  UnitCatalogue,
  type CatalogueDomain,
  type CatalogueUnit,
} from '@/components/learn/unit-catalogue';

export const metadata: Metadata = { title: 'Browse units' };
export const dynamic = 'force-dynamic';

export default async function LearnIndexPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  // Only these fields cross to the browser. The authored units themselves —
  // several megabytes of teaching copy — never leave the server.
  const units: CatalogueUnit[] = ALL_UNITS.map((u) => {
    const p = progressFor(state, u.id);
    const req = requirementsFor(u);
    return {
      id: u.id,
      title: u.title,
      slug: u.slug,
      domain: u.domain,
      module: u.module,
      topic: u.topic,
      difficulty: u.difficulty,
      minutes: u.estimatedMinutes,
      mastery: computeMastery(p, req),
      completed: Boolean(p.lessonCompletedAt),
      bookmarked: p.bookmarked,
      weak: isWeak(p, req),
      bestScore: p.bestScore,
    };
  });

  const domains: CatalogueDomain[] = DOMAINS.map((d) => ({
    id: d.id,
    name: d.name,
    shortName: d.shortName,
    count: DOMAIN_UNIT_COUNTS[d.id],
  }));

  const totals = {
    total: units.length,
    completed: units.filter((u) => u.completed).length,
    mastered: units.filter((u) => u.mastery === 'MASTERED' || u.mastery === 'TEACHER').length,
    bookmarked: units.filter((u) => u.bookmarked).length,
    weak: units.filter((u) => u.weak).length,
  };

  return <UnitCatalogue units={units} domains={domains} totals={totals} />;
}
