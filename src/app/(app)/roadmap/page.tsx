import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview, progressFor } from '@/features/progress/overview';
import { computeMastery, isWeak, requirementsFor } from '@/features/progress/mastery';
import { isDueForReview } from '@/features/revision/spaced';
import { unitsOfDomain } from '@/data/curriculum';
import { RoadmapView, type RoadmapDomain } from '@/components/roadmap/roadmap-view';

export const metadata: Metadata = { title: 'Roadmap' };
export const dynamic = 'force-dynamic';

export default async function RoadmapPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);

  const domains: RoadmapDomain[] = o.domains.map((d) => ({
    id: d.domain.id,
    order: d.domain.order,
    name: d.domain.name,
    tagline: d.domain.tagline,
    total: d.total,
    completed: d.completed,
    mastered: d.mastered,
    progress: d.progress,
    averageScore: d.averageScore,
    remainingMinutes: d.estimatedRemainingMinutes,
    weakCount: d.weakCount,
    units: unitsOfDomain(d.domain.id).map((u) => {
      const p = progressFor(state, u.id);
      const req = requirementsFor(u);
      return {
        id: u.id,
        title: u.title,
        slug: u.slug,
        module: u.module,
        difficulty: u.difficulty,
        minutes: u.estimatedMinutes,
        mastery: computeMastery(p, req),
        completed: Boolean(p.lessonCompletedAt),
        weak: isWeak(p, req),
        bookmarked: p.bookmarked,
        dueReview: isDueForReview(p, o.today),
        score: p.bestScore,
      };
    }),
  }));

  return (
    <RoadmapView
      domains={domains}
      totals={{
        total: o.totals.total,
        completed: o.totals.completed,
        inProgress: o.totals.inProgress,
        remaining: o.totals.remaining,
        mastered: o.totals.mastered,
      }}
    />
  );
}
