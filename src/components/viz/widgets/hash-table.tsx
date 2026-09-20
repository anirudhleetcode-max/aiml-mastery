'use client';

import * as React from 'react';
import { Readout, Slider, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * A hash table with nothing hidden.
 *
 * "Dictionary lookup is O(1)" is true on average and false in the worst case,
 * and a learner who never sees a chain grow cannot tell which they are in. So
 * the hash function here is deliberately small enough to check by hand —
 * sum of character codes, mod capacity — and the arithmetic is printed for
 * every key. Collisions then arrive on their own, the chains get long, and the
 * resize button shows the fix: more buckets, every key rehashed, chains short
 * again.
 */

const BTN =
  'rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40';

/** Three-letter keys, so the character-code sum stays checkable in your head. */
const KEYS = ['cat', 'dog', 'fig', 'owl', 'ant', 'bee', 'elk', 'yak', 'cod', 'emu', 'jay', 'ram'];

const LOAD_LIMIT = 0.75;

function codes(key: string): number[] {
  return Array.from(key, (ch) => ch.charCodeAt(0));
}

function sumCodes(key: string): number {
  return codes(key).reduce((a, b) => a + b, 0);
}

function hash(key: string, capacity: number): number {
  return sumCodes(key) % capacity;
}

export default function HashTable() {
  const [capacity, setCapacity] = React.useState(8);
  const [count, setCount] = React.useState(4);
  const [selected, setSelected] = React.useState<string | null>(null);
  /** Bucket each key sat in before the last resize, so the rehash is visible. */
  const [before, setBefore] = React.useState<Record<string, number> | null>(null);

  const inserted = React.useMemo(() => KEYS.slice(0, count), [count]);

  const buckets = React.useMemo(() => {
    const out: string[][] = Array.from({ length: capacity }, () => []);
    for (const key of inserted) out[hash(key, capacity)].push(key);
    return out;
  }, [inserted, capacity]);

  const load = inserted.length / capacity;
  const longest = buckets.reduce((m, b) => Math.max(m, b.length), 0);
  const collisions = buckets.reduce((acc, b) => acc + Math.max(0, b.length - 1), 0);

  /** Probes for a successful lookup: one comparison per link walked. */
  const probesFor = (key: string) => buckets[hash(key, capacity)].indexOf(key) + 1;
  const avgProbes = inserted.length
    ? inserted.reduce((a, k) => a + probesFor(k), 0) / inserted.length
    : 0;

  const focus = selected ?? inserted[inserted.length - 1] ?? null;
  const focusBucket = focus ? hash(focus, capacity) : null;
  const focusProbes = focus ? probesFor(focus) : 0;

  const insertNext = () => {
    if (count >= KEYS.length) return;
    setBefore(null);
    setSelected(KEYS[count]);
    setCount((c) => c + 1);
  };

  const resize = () => {
    const snapshot: Record<string, number> = {};
    for (const key of inserted) snapshot[key] = hash(key, capacity);
    setBefore(snapshot);
    setCapacity((c) => Math.min(32, c * 2));
  };

  const shrink = () => {
    const snapshot: Record<string, number> = {};
    for (const key of inserted) snapshot[key] = hash(key, capacity);
    setBefore(snapshot);
    setCapacity((c) => Math.max(4, Math.floor(c / 2)));
  };

  const reset = () => {
    setCapacity(8);
    setCount(4);
    setSelected(null);
    setBefore(null);
  };

  const moved = before ? inserted.filter((k) => before[k] !== hash(k, capacity)).length : 0;

  return (
    <WidgetShell
      takeaway="A hash table is only O(1) while the chains stay short. The hash spreads keys across buckets, the load factor says how crowded they are, and a resize is the price you pay — every key rehashed — to keep the average lookup one comparison instead of a walk down a list."
      readout={
        <Readout
          items={[
            { label: 'Keys / buckets', value: `${inserted.length} / ${capacity}` },
            {
              label: 'Load factor α',
              value: load.toFixed(2),
              tone: load > LOAD_LIMIT ? 'bad' : load > 0.5 ? 'warn' : 'good',
            },
            { label: 'Collisions', value: `${collisions}`, tone: collisions > 0 ? 'warn' : 'good' },
            { label: 'Average lookup', value: `${avgProbes.toFixed(2)} probes · O(1)`, tone: 'good' },
            {
              label: 'Worst lookup',
              value: `${longest} probe${longest === 1 ? '' : 's'} · O(n)`,
              tone: longest > 2 ? 'bad' : 'warn',
            },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" onClick={insertNext} disabled={count >= KEYS.length} className={BTN}>
              Insert &lsquo;{KEYS[Math.min(count, KEYS.length - 1)]}&rsquo;
            </button>
            <button type="button" onClick={resize} disabled={capacity >= 32} className={BTN}>
              Resize ×2 (rehash all)
            </button>
            <button type="button" onClick={shrink} disabled={capacity <= 4} className={BTN}>
              Halve capacity
            </button>
            <button type="button" onClick={reset} className={BTN}>
              Reset
            </button>
          </div>
          <Slider
            label="Keys inserted"
            value={count}
            min={0}
            max={KEYS.length}
            step={1}
            onChange={(v) => {
              setBefore(null);
              setCount(v);
              setSelected(null);
            }}
            format={(v) => `${v} of ${KEYS.length}`}
            hint="Drag past the load limit and watch the chains — not the buckets — be what actually grows."
          />
          <p className="text-[11px] leading-relaxed text-subtle">
            Click any key to look it up and count the comparisons it costs.
          </p>
        </>
      }
    >
      {/* ---- the hash function, worked out for one key ---- */}
      <div className="border-b border-line bg-surface-2/40 px-4 py-3">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">The hash function</p>
        {focus ? (
          <p className="font-mono text-[12px] leading-relaxed text-ink">
            <span className="text-accent">&lsquo;{focus}&rsquo;</span> → {codes(focus).join(' + ')} ={' '}
            {sumCodes(focus)} → {sumCodes(focus)} % {capacity} ={' '}
            <span className="font-semibold text-primary-ink">bucket {focusBucket}</span>
          </p>
        ) : (
          <p className="text-[12px] text-muted">Insert a key to see the arithmetic.</p>
        )}
        <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
          {focus
            ? `Finding '${focus}' costs ${focusProbes} comparison${focusProbes === 1 ? '' : 's'}: the bucket is found by arithmetic in one step, then the chain inside it is walked one link at a time.`
            : 'Real hash functions scramble far harder than a character sum, but the shape is the same: key in, bucket index out, same answer every time.'}
        </p>
      </div>

      {/* ---- buckets ---- */}
      <div
        className="space-y-1 px-3 py-3"
        role="img"
        aria-label={`Hash table with ${capacity} buckets holding ${inserted.length} keys. Longest chain ${longest}.`}
      >
        {buckets.map((chain, i) => {
          const hot = focusBucket === i;
          return (
            <div key={i} className="flex items-start gap-2">
              <span
                className={cn(
                  'mt-1 w-6 shrink-0 text-right font-mono text-[11px] tabular-nums',
                  hot ? 'text-primary-ink' : 'text-subtle',
                )}
              >
                {i}
              </span>
              <div
                className={cn(
                  'flex min-h-8 flex-1 flex-wrap items-center gap-1 rounded-md border px-1.5 py-1',
                  hot ? 'border-primary bg-primary/10' : chain.length > 1 ? 'border-warning/60 bg-surface-2' : 'border-line bg-surface-2/50',
                )}
              >
                {chain.length === 0 && <span className="px-1 text-[11px] text-subtle">empty</span>}
                {chain.map((key, pos) => {
                  const isFocus = key === focus;
                  const probed = hot && focus !== null && pos < buckets[i].indexOf(focus);
                  const rehomed = before ? before[key] !== i : false;
                  return (
                    <React.Fragment key={key}>
                      {pos > 0 && <span className="text-[11px] text-subtle">→</span>}
                      <button
                        type="button"
                        onClick={() => setSelected(key)}
                        className={cn(
                          'rounded border px-1.5 py-0.5 font-mono text-[11.5px] transition-colors',
                          isFocus
                            ? 'border-primary bg-primary/25 text-ink'
                            : probed
                              ? 'border-warning bg-warning/15 text-ink'
                              : 'border-line bg-surface-3 text-muted hover:text-ink',
                        )}
                      >
                        {key}
                        {rehomed && <span className="ml-1 text-[9px] text-success">moved</span>}
                      </button>
                    </React.Fragment>
                  );
                })}
                {chain.length > 1 && (
                  <span className="ml-auto pr-1 text-[10px] text-warning">chain of {chain.length}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- load factor bar ---- */}
      <div className="border-t border-line px-4 py-3">
        <div className="mb-1 flex items-baseline justify-between text-[11.5px]">
          <span className="text-subtle">Load factor α = keys / buckets</span>
          <span className={cn('font-mono tabular-nums', load > LOAD_LIMIT ? 'text-danger' : 'text-muted')}>
            {inserted.length} / {capacity} = {load.toFixed(2)}
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-3">
          <div
            className={cn('h-full rounded-full', load > LOAD_LIMIT ? 'bg-danger' : 'bg-primary')}
            style={{ width: `${Math.min(100, load * 100)}%` }}
          />
          <div className="absolute inset-y-0 w-px bg-warning" style={{ left: `${LOAD_LIMIT * 100}%` }} />
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
          {before && moved > 0
            ? `Resized to ${capacity} buckets: ${moved} of ${inserted.length} keys landed somewhere new, because the bucket index is sum % capacity and the capacity just changed. That rehash is O(n) — rare enough that the amortised cost of an insert stays O(1).`
            : load > LOAD_LIMIT
              ? `Past the 0.75 mark Python's dict would already have grown itself. Chains of ${longest} mean a lookup can cost ${longest} comparisons instead of one.`
              : 'Below the 0.75 mark most buckets hold zero or one key, which is the regime where "dictionary lookup is O(1)" is a fair description.'}
        </p>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Average versus worst case
        </p>
        <div className="grid gap-2 text-[11.5px] leading-relaxed sm:grid-cols-2">
          <p className="text-muted">
            <span className="font-medium text-success">Average, O(1).</span> With α = {load.toFixed(2)}, a chain holds{' '}
            {load.toFixed(2)} keys on average, so a lookup is {avgProbes.toFixed(2)} comparisons here — independent of
            how many keys the table holds.
          </p>
          <p className="text-muted">
            <span className="font-medium text-danger">Worst, O(n).</span> If every key hashed to one bucket the table
            would degrade into a linked list. The longest chain right now is {longest}, so the slowest lookup costs{' '}
            {longest} comparison{longest === 1 ? '' : 's'}.
          </p>
        </div>
      </div>
    </WidgetShell>
  );
}
