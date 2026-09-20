import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { progressFor } from '@/features/progress/overview';
import { computeMastery, isAtLeast, requirementsFor } from '@/features/progress/mastery';
import { UNIT_BY_ID, allUnitMeta } from '@/data/curriculum';
import { DOMAINS } from '@/data/domains';
import { MindMapView, type MindDomain, type MindModule, type MindUnit } from '@/components/mind-map/mind-map-view';

export const metadata: Metadata = { title: 'Mind map' };
export const dynamic = 'force-dynamic';

/**
 * The mind map, assembled on the server.
 *
 * Same trimmed projection as the knowledge graph, shaped as a hierarchy
 * instead of a network: centre, domains, modules, units.
 */
export default async function MindMapPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const meta = allUnitMeta();

  const domains: MindDomain[] = DOMAINS.map((d) => {
    const order: string[] = [];
    const grouped = new Map<string, MindUnit[]>();
    let completed = 0;
    let total = 0;

    for (const m of meta) {
      if (m.domain !== d.id) continue;
      const unit = UNIT_BY_ID.get(m.id);
      const progress = progressFor(state, m.id);
      const mastery = unit ? computeMastery(progress, requirementsFor(unit)) : 'NOT_STARTED';
      const done = Boolean(progress.lessonCompletedAt);

      total += 1;
      if (done) completed += 1;

      if (!grouped.has(m.module)) {
        grouped.set(m.module, []);
        order.push(m.module);
      }
      grouped.get(m.module)!.push({
        id: m.id,
        title: m.title,
        slug: m.slug,
        completed: done,
        mastered: isAtLeast(mastery, 'MASTERED'),
      });
    }

    const modules: MindModule[] = order.map((name) => ({ name, units: grouped.get(name) ?? [] }));

    return {
      id: d.id,
      name: d.name,
      shortName: d.shortName,
      tagline: d.tagline,
      total,
      completed,
      modules,
    };
  });

  const totals = domains.reduce(
    (acc, d) => ({ total: acc.total + d.total, completed: acc.completed + d.completed }),
    { total: 0, completed: 0 },
  );

  return <MindMapView domains={domains} totals={totals} />;
}
