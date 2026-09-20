import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { LAB_BY_ID, LABS } from '@/data/labs';
import { DOMAIN_BY_ID, domainColor } from '@/data/domains';
import { WidgetMount } from '@/components/viz/widget-mount';
import { Button } from '@/components/ui/button';
import { getUnit } from '@/data/curriculum';

export async function generateMetadata({ params }: { params: Promise<{ lab: string }> }): Promise<Metadata> {
  const { lab } = await params;
  const entry = LAB_BY_ID.get(lab);
  return { title: entry ? entry.title : 'Lab' };
}

export default async function LabPage({ params }: { params: Promise<{ lab: string }> }) {
  const { lab } = await params;
  const entry = LAB_BY_ID.get(lab);
  if (!entry) notFound();

  const domain = DOMAIN_BY_ID[entry.domain];
  const unit = getUnit(entry.unitSlug);
  const siblings = LABS.filter((l) => l.domain === entry.domain && l.id !== entry.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link href="/labs" className="inline-flex items-center gap-1.5 text-[12.5px] text-subtle hover:text-ink">
        <ArrowLeft size={13} /> All labs
      </Link>

      <header className="rounded-xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded px-2 py-0.5 text-[11px] font-semibold"
            style={{ background: domainColor(entry.domain, 0.14), color: domainColor(entry.domain) }}
          >
            {domain?.name ?? entry.domain}
          </span>
        </div>
        <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-ink">{entry.title}</h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">{entry.blurb}</p>
        <p className="mt-3 rounded-lg border border-accent/25 bg-accent/[0.05] p-3 text-[13px] leading-relaxed text-muted">
          <span className="font-medium text-accent">The point of this lab: </span>
          {entry.goal}
        </p>
      </header>

      <WidgetMount widget={entry.id} />

      {unit && (
        <section className="rounded-xl border border-line bg-surface p-5">
          <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
            <BookOpen size={15} className="text-subtle" /> The lesson behind it
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{unit.simpleExplanation.slice(0, 280)}…</p>
          <Link href={`/learn/${unit.slug}`} className="mt-3 inline-block">
            <Button size="sm" variant="subtle">
              Read {unit.title}
            </Button>
          </Link>
        </section>
      )}

      {siblings.length > 0 && (
        <section>
          <h2 className="mb-2.5 text-[13px] font-semibold text-ink">More {domain?.shortName} labs</h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link
                key={s.id}
                href={`/labs/${s.id}`}
                className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
