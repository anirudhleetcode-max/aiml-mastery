import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Eraser } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { UNIT_BY_ID } from '@/data/curriculum';
import { DOMAIN_BY_ID, DOMAINS } from '@/data/domains';
import { Stat, EmptyState, SectionHeading } from '@/components/ui/misc';
import { MistakesView, type MistakeRow } from '@/components/mistakes/mistakes-view';
import { dateKey } from '@/lib/format';
import type { DomainId } from '@/types/curriculum';

export const metadata: Metadata = { title: 'My mistakes' };
export const dynamic = 'force-dynamic';

export default async function MistakesPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const today = dateKey();

  const rows: MistakeRow[] = state.mistakes.flatMap((m) => {
    const unit = UNIT_BY_ID.get(m.unitId);
    if (!unit) return [];
    return [
      {
        id: m.id,
        questionId: m.questionId,
        unitId: m.unitId,
        unitTitle: unit.title,
        unitSlug: unit.slug,
        domainId: unit.domain,
        domainName: DOMAIN_BY_ID[unit.domain]?.name ?? unit.domain,
        prompt: m.prompt,
        yourAnswer: m.yourAnswer,
        correctAnswer: m.correctAnswer,
        why: m.why,
        concept: m.concept,
        createdAt: m.createdAt,
        reviewAt: m.reviewAt,
        resolved: m.resolved,
        timesWrong: m.timesWrong,
      },
    ];
  });

  const unresolved = rows.filter((r) => !r.resolved).length;
  const resolved = rows.length - unresolved;

  const conceptCounts = new Map<string, number>();
  for (const r of rows) conceptCounts.set(r.concept, (conceptCounts.get(r.concept) ?? 0) + r.timesWrong);
  const mostMissed = [...conceptCounts.entries()].sort((a, b) => b[1] - a[1])[0] ?? null;

  const presentDomains = new Set(rows.map((r) => r.domainId));
  const domains: { id: DomainId; name: string }[] = DOMAINS.filter((d) => presentDomains.has(d.id)).map((d) => ({
    id: d.id,
    name: d.name,
  }));

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">My mistakes</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Every question you got wrong, kept with the answer you gave and the reason it was wrong. This is the most
          useful page on the site: the gap between what you think you know and what you do know is written down here.
        </p>
      </header>

      {rows.length === 0 ? (
        <EmptyState
          icon={<Eraser size={18} />}
          title="No mistakes recorded yet"
          body="Wrong answers are captured automatically after any test, together with what you chose, the correct answer and why the difference matters. They are scheduled for review and stay here until you mark them resolved."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Recorded" value={rows.length} icon={<Eraser size={14} />} />
            <Stat label="Unresolved" value={unresolved} tone={unresolved > 0 ? 'warning' : 'success'} />
            <Stat label="Resolved" value={resolved} tone="success" />
            <Stat
              label="Most missed"
              value={<span className="text-base leading-snug">{mostMissed ? mostMissed[0] : '—'}</span>}
              sub={mostMissed ? `${mostMissed[1]} wrong answers` : undefined}
            />
          </div>

          <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
            <SectionHeading
              as="h2"
              title="The entries"
              description="Grouped by domain. An entry stays unresolved until you decide you could answer it cold."
              className="mb-4"
            />
            <MistakesView rows={rows} today={today} domains={domains} />
          </section>
        </>
      )}
    </div>
  );
}
