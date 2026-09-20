import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { progressFor } from '@/features/progress/overview';
import { computeMastery, isAtLeast, requirementsFor } from '@/features/progress/mastery';
import { UNIT_BY_ID, allUnitMeta } from '@/data/curriculum';
import { DOMAINS } from '@/data/domains';
import { KnowledgeGraph } from '@/components/graph/knowledge-graph';
import type { GraphDomainStat, GraphEdge, GraphNode } from '@/components/graph/types';
import type { DomainId } from '@/types/curriculum';

export const metadata: Metadata = { title: 'Knowledge graph' };
export const dynamic = 'force-dynamic';

/**
 * The knowledge graph, assembled on the server.
 *
 * `allUnitMeta()` is the trimmed projection of the curriculum; the full units
 * are megabytes of teaching copy and never leave this process. What crosses to
 * the browser is one node per unit and one edge per prerequisite.
 */
export default async function GraphPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string | string[] }>;
}) {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const meta = allUnitMeta();

  const nodes: GraphNode[] = meta.map((m) => {
    const unit = UNIT_BY_ID.get(m.id);
    const progress = progressFor(state, m.id);
    const mastery = unit ? computeMastery(progress, requirementsFor(unit)) : 'NOT_STARTED';
    return {
      id: m.id,
      title: m.title,
      slug: m.slug,
      domain: m.domain,
      module: m.module,
      difficulty: m.difficulty,
      minutes: m.estimatedMinutes,
      mastery,
      completed: Boolean(progress.lessonCompletedAt),
      unlocks: m.leadsTo.length,
      prereqs: m.prerequisites,
      next: m.leadsTo,
    };
  });

  const known = new Set(nodes.map((n) => n.id));
  const edges: GraphEdge[] = [];
  for (const m of meta) {
    for (const p of m.prerequisites) {
      if (known.has(p)) edges.push({ from: p, to: m.id });
    }
  }

  const completedByDomain = new Map<DomainId, number>();
  const totalByDomain = new Map<DomainId, number>();
  for (const n of nodes) {
    totalByDomain.set(n.domain, (totalByDomain.get(n.domain) ?? 0) + 1);
    if (n.completed) completedByDomain.set(n.domain, (completedByDomain.get(n.domain) ?? 0) + 1);
  }

  const domains: GraphDomainStat[] = DOMAINS.map((d) => ({
    id: d.id,
    name: d.name,
    shortName: d.shortName,
    total: totalByDomain.get(d.id) ?? 0,
    completed: completedByDomain.get(d.id) ?? 0,
  }));

  const rawFocus = (await searchParams).focus;
  const focusId = Array.isArray(rawFocus) ? rawFocus[0] : rawFocus;
  const initialFocus = focusId && known.has(focusId) ? focusId : null;

  return (
    <KnowledgeGraph
      nodes={nodes}
      edges={edges}
      domains={domains}
      totals={{
        units: nodes.length,
        edges: edges.length,
        completed: nodes.filter((n) => n.completed).length,
        mastered: nodes.filter((n) => isAtLeast(n.mastery, 'MASTERED')).length,
      }}
      initialFocus={initialFocus}
    />
  );
}
