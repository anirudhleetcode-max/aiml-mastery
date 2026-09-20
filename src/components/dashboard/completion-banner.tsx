'use client';

import Link from 'next/link';
import { Check, Crown, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress';
import { domainColor } from '@/data/domains';
import type { DomainId } from '@/types/curriculum';
import { formatDuration, pct } from '@/lib/format';
import { cn } from '@/lib/cn';

export interface CompletionDomain {
  id: DomainId;
  name: string;
  total: number;
  completed: number;
  mastered: number;
  averageScore: number;
}

/**
 * The dashboard transforms when the curriculum is finished (spec §84).
 *
 * It deliberately does not say "well done and goodbye". Finishing the units
 * is the point at which the two things that actually matter — the final
 * assessment and being able to teach any of it on demand — become available.
 */
export function CompletionBanner({
  domains,
  totals,
  finalAssessmentBest,
  teacherLevelCount,
  totalStudySeconds,
}: {
  domains: CompletionDomain[];
  totals: { total: number; completed: number; mastered: number };
  finalAssessmentBest: number | null;
  teacherLevelCount: number;
  totalStudySeconds: number;
}) {
  const allComplete = domains.every((d) => d.completed === d.total);

  return (
    <section className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-surface to-primary/[0.07] p-6 sm:p-8">
      <div className="absolute inset-0 grid-bg opacity-[0.18] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />

      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-ink">
            <Crown size={13} /> Curriculum complete
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
            AI/ML mastery complete
          </h2>
          <p className="mt-1.5 text-lg font-semibold tabular-nums text-primary-ink">
            {totals.completed} / {totals.total}
          </p>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-muted">
            {formatDuration(totalStudySeconds)} of study, {totals.mastered} concepts mastered and{' '}
            {teacherLevelCount} you can teach without notes. What remains is the part that proves it.
          </p>
        </div>

        <ProgressRing value={1} size={104} stroke={9}>
          <Check size={30} className="text-success" strokeWidth={2.5} />
        </ProgressRing>
      </div>

      <ul className="relative mt-6 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((d) => {
          const done = d.completed === d.total;
          return (
            <li
              key={d.id}
              className={cn(
                'flex items-center gap-2.5 rounded-lg border px-3 py-2',
                done ? 'border-success/25 bg-success/[0.05]' : 'border-line bg-surface/60',
              )}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: domainColor(d.id) }}
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{d.name}</span>
              {d.averageScore > 0 && (
                <span className="shrink-0 text-[11.5px] tabular-nums text-subtle">{pct(d.averageScore)}</span>
              )}
              {done ? (
                <Check size={14} className="shrink-0 text-success" strokeWidth={3} />
              ) : (
                <span className="shrink-0 text-[11.5px] tabular-nums text-subtle">
                  {d.completed}/{d.total}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="relative mt-6 flex flex-wrap gap-2 border-t border-primary/20 pt-5">
        <Link href="/final-assessment">
          <Button size="lg">
            <Crown size={16} />
            {finalAssessmentBest === null
              ? 'Take the final assessment'
              : `Retake the final assessment (best ${pct(finalAssessmentBest)})`}
          </Button>
        </Link>
        <Link href="/teach?challenge=1">
          <Button size="lg" variant="outline">
            <GraduationCap size={16} /> The teacher challenge
          </Button>
        </Link>
      </div>

      {!allComplete && (
        <p className="relative mt-3 text-[12.5px] text-subtle">
          Every scheduled unit is done. The domains above that are not yet full are ones you skipped ahead of.
        </p>
      )}
    </section>
  );
}
