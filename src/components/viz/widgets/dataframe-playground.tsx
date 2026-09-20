'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * A pandas pipeline you can watch run.
 *
 * Beginners learn pandas as a pile of method names. The thing that actually
 * makes it usable is the shape of the pipeline: filter narrows rows, sort
 * reorders rows, selection narrows columns, and groupby is the only step that
 * *destroys* rows and replaces them with one row per group. Those four verbs
 * cover most real work.
 *
 * So the controls are the four verbs, the code panel is regenerated from them
 * character by character, and the table underneath is the honest result. The
 * row counter between the two is deliberately loud, because "how many rows do
 * I have now" is the question a beginner keeps failing to ask.
 *
 * The data is generated from a seeded PRNG with the seed on screen, so a
 * learner can come back to seed 7 and see exactly the orders they saw before.
 */

/** Small, fast, seeded PRNG. Same seed, same orders, every time. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Order {
  order_id: number;
  customer: string;
  region: string;
  amount: number;
  date: string;
  status: string;
}

const CUSTOMERS = [
  'Ada Okafor',
  'Ben Liu',
  'Cara Dias',
  'Dmitri Novak',
  'Eve Marchand',
  'Farid Haddad',
  'Grace Yoon',
  'Hugo Silva',
  'Ines Bauer',
  'Jonas Berg',
];
const REGIONS = ['North', 'South', 'East', 'West'];
const STATUSES = ['shipped', 'pending', 'returned'];
const COLUMNS = ['order_id', 'customer', 'region', 'amount', 'date', 'status'] as const;
type Column = (typeof COLUMNS)[number];

function buildOrders(seed: number): Order[] {
  const rand = mulberry32(seed * 2654435761);
  return CUSTOMERS.map((customer, i) => {
    // Amounts are skewed low with a long tail, the way real order values are.
    const base = 18 + rand() * 90;
    const spike = rand() < 0.25 ? 120 + rand() * 340 : 0;
    const day = 2 + Math.floor(rand() * 26);
    return {
      order_id: 1001 + i,
      customer,
      region: REGIONS[Math.floor(rand() * REGIONS.length)],
      amount: Math.round((base + spike) * 100) / 100,
      date: `2024-03-${String(day).padStart(2, '0')}`,
      status: STATUSES[Math.floor(rand() * STATUSES.length)],
    };
  });
}

type FilterKind = 'none' | 'region' | 'status' | 'amount';
type SortKey = 'none' | 'amount' | 'date' | 'customer';
type GroupKey = 'none' | 'region' | 'status';
type Agg = 'sum' | 'mean' | 'count' | 'max';

const AGG_LABEL: Record<Agg, string> = { sum: 'sum', mean: 'mean', count: 'count', max: 'max' };

function money(v: number): string {
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function DataframePlayground({ props }: { props?: Record<string, unknown> }) {
  void props;
  // The table redraws instantly; honouring reduced motion here means dropping
  // the colour fades on the column chips rather than stopping an animation.
  const ease = usePrefersReducedMotion() ? '' : 'transition-colors';
  const [seed, setSeed] = React.useState(7);
  const [filterKind, setFilterKind] = React.useState<FilterKind>('none');
  const [filterRegion, setFilterRegion] = React.useState('West');
  const [filterStatus, setFilterStatus] = React.useState('shipped');
  const [minAmount, setMinAmount] = React.useState(100);
  const [sortKey, setSortKey] = React.useState<SortKey>('none');
  const [descending, setDescending] = React.useState(true);
  const [group, setGroup] = React.useState<GroupKey>('none');
  const [agg, setAgg] = React.useState<Agg>('sum');
  const [selected, setSelected] = React.useState<Column[]>([...COLUMNS]);

  const df = React.useMemo(() => buildOrders(seed), [seed]);

  const filtered = React.useMemo(() => {
    if (filterKind === 'none') return df;
    if (filterKind === 'region') return df.filter((r) => r.region === filterRegion);
    if (filterKind === 'status') return df.filter((r) => r.status === filterStatus);
    return df.filter((r) => r.amount >= minAmount);
  }, [df, filterKind, filterRegion, filterStatus, minAmount]);

  /** groupby is the step that changes what a row *means*, so it runs on its own path. */
  const grouped = React.useMemo(() => {
    if (group === 'none') return null;
    const buckets = new Map<string, number[]>();
    for (const r of filtered) {
      const key = group === 'region' ? r.region : r.status;
      const list = buckets.get(key) ?? [];
      list.push(r.amount);
      buckets.set(key, list);
    }
    const rows = [...buckets.entries()].map(([key, amounts]) => {
      const value =
        agg === 'sum'
          ? amounts.reduce((a, b) => a + b, 0)
          : agg === 'mean'
            ? amounts.reduce((a, b) => a + b, 0) / amounts.length
            : agg === 'count'
              ? amounts.length
              : Math.max(...amounts);
      return { key, value: Math.round(value * 100) / 100, n: amounts.length };
    });
    rows.sort((x, y) =>
      sortKey === 'none' ? x.key.localeCompare(y.key) : descending ? y.value - x.value : x.value - y.value,
    );
    return rows;
  }, [filtered, group, agg, sortKey, descending]);

  const sorted = React.useMemo(() => {
    if (sortKey === 'none') return filtered;
    const copy = [...filtered];
    copy.sort((x, y) => {
      const cmp =
        sortKey === 'amount'
          ? x.amount - y.amount
          : sortKey === 'date'
            ? x.date.localeCompare(y.date)
            : x.customer.localeCompare(y.customer);
      return descending ? -cmp : cmp;
    });
    return copy;
  }, [filtered, sortKey, descending]);

  const shownColumns = selected.length === 0 ? ([...COLUMNS] as Column[]) : selected;
  const outRows = grouped ? grouped.length : sorted.length;

  /** The code is generated from the same state the table is, so they cannot drift. */
  const code = React.useMemo(() => {
    const steps: string[] = [];
    if (filterKind === 'region') steps.push(`.loc[df["region"] == "${filterRegion}"]`);
    else if (filterKind === 'status') steps.push(`.loc[df["status"] == "${filterStatus}"]`);
    else if (filterKind === 'amount') steps.push(`.loc[df["amount"] >= ${minAmount}]`);

    if (group !== 'none') {
      steps.push(`.groupby("${group}", as_index=False)["amount"]`);
      steps.push(`.${AGG_LABEL[agg]}()`);
      if (sortKey !== 'none') steps.push(`.sort_values("amount", ascending=${descending ? 'False' : 'True'})`);
    } else {
      if (sortKey !== 'none') steps.push(`.sort_values("${sortKey}", ascending=${descending ? 'False' : 'True'})`);
      if (selected.length > 0 && selected.length < COLUMNS.length)
        steps.push(`[[${selected.map((c) => `"${c}"`).join(', ')}]]`);
    }

    if (steps.length === 0) return 'out = df  # no steps yet, so out is the whole frame';
    return ['out = (', '    df', ...steps.map((s) => `    ${s}`), ')'].join('\n');
  }, [filterKind, filterRegion, filterStatus, minAmount, group, agg, sortKey, descending, selected]);

  const aggColumn = group === 'none' ? '' : agg === 'count' ? 'amount_count' : `amount_${AGG_LABEL[agg]}`;

  return (
    <WidgetShell
      takeaway="Filter, sort and column selection all hand back a frame with the same kind of row you started with. groupby is the odd one out: it throws your rows away and gives you one row per group, which is why the row counter drops the moment you switch it on."
      readout={
        <Readout
          items={[
            { label: 'rows in', value: String(df.length) },
            { label: 'after filter', value: String(filtered.length), tone: filtered.length === 0 ? 'bad' : 'default' },
            { label: 'rows out', value: String(outRows), tone: group !== 'none' ? 'good' : 'default' },
            { label: 'columns out', value: String(group !== 'none' ? 2 : shownColumns.length) },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Data seed"
            value={seed}
            min={1}
            max={40}
            onChange={setSeed}
            format={(v) => `#${v}`}
            hint="Same seed, same ten orders. Change it to test a pipeline against a different sample."
          />
          <Toggle
            label="1. Filter rows"
            value={filterKind}
            onChange={(v) => setFilterKind(v as FilterKind)}
            options={[
              { value: 'none', label: 'No filter' },
              { value: 'region', label: 'region ==' },
              { value: 'status', label: 'status ==' },
              { value: 'amount', label: 'amount ≥' },
            ]}
          />
          {filterKind === 'region' && (
            <Toggle
              label="region equals"
              value={filterRegion}
              onChange={setFilterRegion}
              options={REGIONS.map((r) => ({ value: r, label: r }))}
            />
          )}
          {filterKind === 'status' && (
            <Toggle
              label="status equals"
              value={filterStatus}
              onChange={setFilterStatus}
              options={STATUSES.map((s) => ({ value: s, label: s }))}
            />
          )}
          {filterKind === 'amount' && (
            <Slider
              label="amount at least"
              value={minAmount}
              min={0}
              max={400}
              step={10}
              onChange={setMinAmount}
              format={(v) => `$${v}`}
            />
          )}

          <Toggle
            label="2. Sort"
            value={sortKey}
            onChange={(v) => setSortKey(v as SortKey)}
            options={[
              { value: 'none', label: 'Original order' },
              { value: 'amount', label: 'amount' },
              { value: 'date', label: 'date' },
              { value: 'customer', label: 'customer' },
            ]}
          />
          {sortKey !== 'none' && (
            <Toggle
              label="direction"
              value={descending ? 'desc' : 'asc'}
              onChange={(v) => setDescending(v === 'desc')}
              options={[
                { value: 'asc', label: 'Ascending' },
                { value: 'desc', label: 'Descending' },
              ]}
            />
          )}

          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">3. Keep columns</p>
            <div className="flex flex-wrap gap-1.5">
              {COLUMNS.map((c) => {
                const on = selected.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={group !== 'none'}
                    aria-pressed={on}
                    onClick={() =>
                      setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...COLUMNS].filter((x) => prev.includes(x) || x === c)))
                    }
                    className={cn(
                      'rounded-md border px-2 py-1 font-mono text-[11.5px] disabled:opacity-40',
                      ease,
                      on ? 'border-primary bg-primary/15 text-ink' : 'border-line bg-surface-2 text-subtle hover:text-ink',
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-[11px] text-subtle">
              {group !== 'none'
                ? 'groupby decides the columns, so selection is off while it is on.'
                : 'Deselect everything and pandas would hand you an empty frame; here it falls back to all six.'}
            </p>
          </div>

          <Toggle
            label="4. Group by and aggregate"
            value={group}
            onChange={(v) => setGroup(v as GroupKey)}
            options={[
              { value: 'none', label: 'No grouping' },
              { value: 'region', label: 'region' },
              { value: 'status', label: 'status' },
            ]}
          />
          {group !== 'none' && (
            <Toggle
              label="aggregate amount with"
              value={agg}
              onChange={(v) => setAgg(v as Agg)}
              options={[
                { value: 'sum', label: 'sum' },
                { value: 'mean', label: 'mean' },
                { value: 'count', label: 'count' },
                { value: 'max', label: 'max' },
              ]}
            />
          )}
        </>
      }
    >
      <div className="border-b border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">The equivalent pandas</p>
        <pre className="overflow-x-auto rounded-md border border-line bg-surface-2 p-2.5 font-mono text-[11.5px] leading-relaxed text-ink">
{code}
        </pre>
      </div>

      <div className="p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
          {group === 'none' ? `out — ${outRows} of ${df.length} rows` : `out — one row per ${group}`}
        </p>
        <div className="overflow-x-auto">
          {grouped ? (
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-line text-left text-subtle">
                  <th scope="col" className="py-1.5 pr-3 font-mono font-medium">
                    {group}
                  </th>
                  <th scope="col" className="py-1.5 pr-3 font-mono font-medium">
                    {aggColumn}
                  </th>
                  <th scope="col" className="py-1.5 font-medium">
                    rows collapsed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {grouped.map((r) => (
                  <tr key={r.key}>
                    <td className="py-1.5 pr-3 font-medium text-ink">{r.key}</td>
                    <td className="py-1.5 pr-3 font-mono tabular-nums text-accent">
                      {agg === 'count' ? r.value : money(r.value)}
                    </td>
                    <td className="py-1.5 tabular-nums text-subtle">{r.n}</td>
                  </tr>
                ))}
                {grouped.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-3 text-[11.5px] text-muted">
                      The filter left nothing to group. pandas returns an empty frame rather than an error.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-line text-left text-subtle">
                  {shownColumns.map((c) => (
                    <th key={c} scope="col" className="whitespace-nowrap py-1.5 pr-3 font-mono font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sorted.map((r) => (
                  <tr key={r.order_id}>
                    {shownColumns.map((c) => (
                      <td
                        key={c}
                        className={cn(
                          'whitespace-nowrap py-1.5 pr-3',
                          c === 'amount' ? 'font-mono tabular-nums text-accent' : 'text-muted',
                          c === 'order_id' && 'font-mono tabular-nums text-ink',
                        )}
                      >
                        {c === 'amount' ? money(r.amount) : String(r[c])}
                      </td>
                    ))}
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={shownColumns.length} className="py-3 text-[11.5px] text-muted">
                      No rows match. An empty frame is a normal pandas result, not an error — which is exactly why a
                      silently wrong filter is so easy to miss.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Every step returns a new frame; <code className="font-mono text-accent">df</code> itself is never touched.
          That is why the pipeline can be read top to bottom, and why forgetting to assign the result is the most
          common pandas mistake of all.
        </p>
      </div>
    </WidgetShell>
  );
}
