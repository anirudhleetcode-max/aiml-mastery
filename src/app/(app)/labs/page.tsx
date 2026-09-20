import type { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Sparkles } from 'lucide-react';
import { LABS } from '@/data/labs';
import { DOMAINS, domainColor } from '@/data/domains';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = { title: 'Labs' };

export default function LabsPage() {
  const featured = LABS.filter((l) => l.featured);
  const byDomain = DOMAINS.map((d) => ({ domain: d, labs: LABS.filter((l) => l.domain === d.id) })).filter(
    (g) => g.labs.length > 0,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-ink">Laboratories</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">Go and break something</h1>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          {LABS.length} interactive mechanisms, each one a thing you can only really understand by moving a slider
          and watching what happens. Every lab also appears inside the lesson that teaches it — this page just
          collects them.
        </p>
      </header>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-ink">
          <Sparkles size={15} className="text-primary-ink" /> Start here
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((lab) => (
            <LabCard key={lab.id} lab={lab} large />
          ))}
        </div>
      </section>

      {byDomain.map(({ domain, labs }) => (
        <section key={domain.id}>
          <h2 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-ink">
            <span className="h-2 w-2 rounded-full" style={{ background: domainColor(domain.id) }} aria-hidden />
            {domain.name}
            <span className="text-[12px] font-normal text-subtle">
              {labs.length} lab{labs.length === 1 ? '' : 's'}
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function LabCard({ lab, large }: { lab: (typeof LABS)[number]; large?: boolean }) {
  return (
    <Link
      href={`/labs/${lab.id}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="grid h-9 w-9 place-items-center rounded-lg"
          style={{ background: domainColor(lab.domain, 0.14), color: domainColor(lab.domain) }}
        >
          <FlaskConical size={17} />
        </span>
        {large && <Badge tone="primary">Featured</Badge>}
      </div>
      <h3 className="mt-3.5 text-[14.5px] font-semibold text-ink group-hover:text-primary-ink">{lab.title}</h3>
      <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-subtle">{lab.blurb}</p>
      <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-muted">
        <span className="font-medium text-accent">You will understand: </span>
        {lab.goal}
      </p>
    </Link>
  );
}
