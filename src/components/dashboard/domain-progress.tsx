'use client';

import Link from 'next/link';
import { domainColor } from '@/data/domains';
import type { DomainStat } from '@/features/progress/overview';
import { formatMinutes, pct } from '@/lib/format';

/**
 * Per-domain progress. Colour here is wayfinding — it identifies the domain,
 * matching the dot used everywhere else in the app — while the bar length
 * carries the value.
 */
export function DomainProgress({ domains }: { domains: DomainStat[] }) {
  return (
    <section className="rounded-xl border border-line bg-surface p-5" aria-labelledby="domains-heading">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="domains-heading" className="text-[14px] font-semibold text-ink">
          Progress by domain
        </h2>
        <Link href="/roadmap" className="text-[12px] text-primary-ink hover:underline">
          Open roadmap
        </Link>
      </div>

      <ul className="mt-4 space-y-3">
        {domains.map((d) => (
          <li key={d.domain.id}>
            <Link href={`/roadmap#${d.domain.id}`} className="group block">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: domainColor(d.domain.id) }}
                  aria-hidden
                />
                <span className="flex-1 truncate text-[13px] font-medium text-ink group-hover:text-primary-ink">
                  {d.domain.name}
                </span>
                <span className="shrink-0 text-[12px] tabular-nums text-subtle">
                  {d.completed}/{d.total}
                </span>
                <span className="w-10 shrink-0 text-right text-[12px] font-medium tabular-nums text-muted">
                  {pct(d.progress)}
                </span>
              </div>
              <div className="mt-1.5 ml-4.5 h-1.5 overflow-hidden rounded-full bg-surface-3" style={{ marginLeft: 18 }}>
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{ width: `${d.progress * 100}%`, background: domainColor(d.domain.id) }}
                />
              </div>
              <div className="mt-1 flex gap-3 text-[11px] text-subtle" style={{ marginLeft: 18 }}>
                {d.mastered > 0 && <span>{d.mastered} mastered</span>}
                {d.averageScore > 0 && <span>avg {pct(d.averageScore)}</span>}
                {d.weakCount > 0 && <span className="text-warning">{d.weakCount} weak</span>}
                {d.estimatedRemainingMinutes > 0 && <span>~{formatMinutes(d.estimatedRemainingMinutes)} left</span>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
