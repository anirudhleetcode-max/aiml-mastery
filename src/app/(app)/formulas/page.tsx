import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import { Sigma, Variable } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { ALL_UNITS } from '@/data/curriculum';
import type { DomainId, Formula, FormulaCategory } from '@/types/curriculum';
import { FormulaCard } from '@/components/lesson/math';
import { Stat } from '@/components/ui/misc';
import {
  FormulaLab,
  type FormulaCategoryOption,
  type FormulaItem,
} from '@/components/formulas/formula-lab';

export const metadata: Metadata = { title: 'Formula lab' };
export const dynamic = 'force-dynamic';

const OTHER = 'other';

/** Category order, and the labels shown on the tabs. */
const CATEGORY_LABELS: Record<FormulaCategory | typeof OTHER, string> = {
  'linear-algebra': 'Linear algebra',
  calculus: 'Calculus',
  probability: 'Probability',
  statistics: 'Statistics',
  regression: 'Regression',
  classification: 'Classification',
  optimization: 'Optimization',
  'deep-learning': 'Deep learning',
  'information-theory': 'Information theory',
  complexity: 'Complexity',
  other: 'Other',
};

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as (FormulaCategory | typeof OTHER)[];

interface Collected {
  key: string;
  formula: Formula;
  category: string;
  haystack: string;
  units: { id: string; title: string; slug: string; domain: DomainId }[];
}

/**
 * Walks the whole curriculum and collects every formula, keyed by its source
 * and name so the same identity written in two units is listed once with both
 * units cited. Server-only: the units themselves never leave this function.
 */
function collect(): Collected[] {
  const byFormula = new Map<string, Collected>();

  for (const unit of ALL_UNITS) {
    for (const f of unit.math?.formulas ?? []) {
      const key = `${f.latex}|${f.name}`;
      let entry = byFormula.get(key);
      if (!entry) {
        entry = {
          key,
          formula: f,
          category: f.category ?? OTHER,
          haystack: [f.name, f.meaning, ...f.variables.map((v) => `${v.symbol} ${v.meaning}`)]
            .join(' ')
            .toLowerCase(),
          units: [],
        };
        byFormula.set(key, entry);
      }
      if (!entry.units.some((u) => u.id === unit.id)) {
        entry.units.push({ id: unit.id, title: unit.title, slug: unit.slug, domain: unit.domain });
      }
    }
  }

  const rank = new Map(CATEGORY_ORDER.map((c, i) => [c as string, i]));
  return [...byFormula.values()].sort((a, b) => {
    const byCategory = (rank.get(a.category) ?? 99) - (rank.get(b.category) ?? 99);
    return byCategory !== 0 ? byCategory : a.formula.name.localeCompare(b.formula.name, 'en');
  });
}

export default async function FormulasPage() {
  await requireUser();

  const collected = collect();

  const items: FormulaItem[] = collected.map((c) => ({
    key: c.key,
    name: c.formula.name,
    category: c.category,
    haystack: c.haystack,
    units: c.units,
    card: <FormulaCard formula={c.formula} />,
  }));

  const counts = new Map<string, number>();
  for (const c of collected) counts.set(c.category, (counts.get(c.category) ?? 0) + 1);

  const categories: FormulaCategoryOption[] = CATEGORY_ORDER.filter((id) => (counts.get(id) ?? 0) > 0).map(
    (id) => ({ id, label: CATEGORY_LABELS[id], count: counts.get(id) ?? 0 }),
  );

  const variableCount = collected.reduce((a, c) => a + c.formula.variables.length, 0);
  const largest = categories.reduce<FormulaCategoryOption | null>(
    (m, c) => (m === null || c.count > m.count ? c : m),
    null,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Formula lab</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Every formula the curriculum uses, with what it means and what each symbol stands for. Nothing here is
          notation for its own sake: each one links back to the unit that derives it.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Formulas" value={collected.length} icon={<Sigma size={14} />} />
        <Stat label="Categories" value={categories.length} tone="primary" />
        <Stat label="Symbols explained" value={variableCount} icon={<Variable size={14} />} />
        <Stat
          label="Largest group"
          value={<span className="text-[15px] leading-7">{largest?.label ?? '—'}</span>}
          sub={largest ? `${largest.count} formulas` : undefined}
        />
      </div>

      <FormulaLab items={items} categories={categories} />
    </div>
  );
}
