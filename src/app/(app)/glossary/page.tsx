import type { Metadata } from 'next';
import { BookOpen, Layers, SpellCheck } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { ALL_UNITS } from '@/data/curriculum';
import { DOMAIN_BY_ID, DOMAINS } from '@/data/domains';
import type { DomainId } from '@/types/curriculum';
import { Stat } from '@/components/ui/misc';
import {
  GlossaryBrowser,
  type GlossaryDomainOption,
  type GlossaryEntry,
} from '@/components/glossary/glossary-browser';

export const metadata: Metadata = { title: 'Glossary' };
export const dynamic = 'force-dynamic';

/**
 * Builds the glossary index from the full curriculum.
 *
 * Runs on the server only: `ALL_UNITS` is several megabytes of teaching copy,
 * and what crosses to the browser is just the term, its definition, its plain
 * restatement and the units that cite it.
 */
function buildIndex(): GlossaryEntry[] {
  const byTerm = new Map<string, GlossaryEntry>();

  for (const unit of ALL_UNITS) {
    for (const t of unit.terminology) {
      const term = t.term.trim();
      if (!term) continue;
      const key = term.toLowerCase();

      let entry = byTerm.get(key);
      if (!entry) {
        const first = term[0]!.toUpperCase();
        entry = {
          key,
          term,
          definition: t.definition,
          simple: t.simple,
          letter: /[A-Z]/.test(first) ? first : '#',
          domains: [],
          units: [],
        };
        byTerm.set(key, entry);
      }

      // The first definition wins; a later unit may still supply the plain
      // restatement the first one lacked, and every source unit is kept.
      if (!entry.simple && t.simple) entry.simple = t.simple;
      if (!entry.domains.includes(unit.domain)) entry.domains.push(unit.domain);
      if (!entry.units.some((u) => u.id === unit.id)) {
        entry.units.push({ id: unit.id, title: unit.title, slug: unit.slug, domain: unit.domain });
      }
    }
  }

  const entries = [...byTerm.values()];
  for (const e of entries) {
    e.domains.sort((a, b) => DOMAIN_BY_ID[a].order - DOMAIN_BY_ID[b].order);
    e.units.sort((a, b) => a.id.localeCompare(b.id));
  }

  entries.sort((a, b) => a.key.localeCompare(b.key, 'en'));
  return entries;
}

export default async function GlossaryPage() {
  await requireUser();

  const entries = buildIndex();

  const counts = new Map<DomainId, number>();
  for (const e of entries) {
    for (const d of e.domains) counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  const domains: GlossaryDomainOption[] = DOMAINS.filter((d) => (counts.get(d.id) ?? 0) > 0).map((d) => ({
    id: d.id,
    name: d.shortName,
    count: counts.get(d.id) ?? 0,
  }));

  const withSimple = entries.filter((e) => Boolean(e.simple)).length;
  const crossDomain = entries.filter((e) => e.domains.length > 1).length;

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Glossary</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Every technical term the curriculum defines, gathered in one place. Each entry keeps its formal
          definition, the plain restatement where one exists, and a way back to the units that teach it.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Terms" value={entries.length} icon={<SpellCheck size={14} />} />
        <Stat label="Plain restatements" value={withSimple} icon={<BookOpen size={14} />} tone="primary" />
        <Stat label="Across domains" value={crossDomain} icon={<Layers size={14} />} sub="defined in more than one" />
        <Stat label="Domains covered" value={domains.length} sub={`of ${DOMAINS.length}`} />
      </div>

      <GlossaryBrowser entries={entries} domains={domains} />
    </div>
  );
}
