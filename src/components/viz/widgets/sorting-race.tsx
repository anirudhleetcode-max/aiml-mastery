'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * Four sorts over one array, with the counters that actually decide.
 *
 * Animated sorting is usually a light show: pretty, and it teaches nothing,
 * because "faster" on screen is just a shorter timer. What separates these
 * algorithms is the *count* of comparisons and moves, so those are the
 * headline here and the bars are the illustration. The starting-order toggle
 * is the real lesson: on nearly-sorted data insertion sort drops to roughly n
 * comparisons and beats merge sort outright, which is why every production
 * sort falls back to it for small or almost-ordered runs.
 */

const BTN =
  'rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40';

type Algo = 'bubble' | 'insertion' | 'merge' | 'quick';
type Preset = 'random' | 'nearly' | 'reversed';

interface SFrame {
  arr: number[];
  compare: [number, number] | null;
  moved: number[];
  pivot: number | null;
  /** Sub-array the algorithm is currently working inside, for merge and quick. */
  range: [number, number] | null;
  sorted: number;
  comps: number;
  moves: number;
  note: string;
}

/** Seeded, so a learner can re-run the same array and reason about the counts. */
function makeArray(n: number, preset: Preset): number[] {
  let seed = 20250917;
  const rand = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
  const base = Array.from({ length: n }, (_, i) => i + 1);
  if (preset === 'reversed') return base.slice().reverse();
  if (preset === 'nearly') {
    const out = base.slice();
    // Three adjacent transpositions: close to sorted, but genuinely unsorted.
    for (const at of [Math.floor(n * 0.2), Math.floor(n * 0.55), Math.floor(n * 0.8)]) {
      const i = Math.min(n - 2, Math.max(0, at));
      [out[i], out[i + 1]] = [out[i + 1], out[i]];
    }
    return out;
  }
  const out = base.slice();
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildFrames(input: number[], algo: Algo): SFrame[] {
  const a = input.slice();
  const frames: SFrame[] = [];
  let comps = 0;
  let moves = 0;
  const push = (
    note: string,
    opts: Partial<Pick<SFrame, 'compare' | 'moved' | 'pivot' | 'range' | 'sorted'>> = {},
  ) => {
    if (frames.length > 4000) return;
    frames.push({
      arr: a.slice(),
      compare: opts.compare ?? null,
      moved: opts.moved ?? [],
      pivot: opts.pivot ?? null,
      range: opts.range ?? null,
      sorted: opts.sorted ?? 0,
      comps,
      moves,
      note,
    });
  };
  const n = a.length;

  if (algo === 'bubble') {
    let sorted = 0;
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - 1 - i; j++) {
        comps++;
        push(`Compare ${a[j]} and ${a[j + 1]} — bubble sort only ever looks at neighbours.`, {
          compare: [j, j + 1],
          sorted,
        });
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          moves++;
          swapped = true;
          push(`Out of order, so swap. The largest value keeps drifting right.`, { moved: [j, j + 1], sorted });
        }
      }
      sorted = i + 1;
      push(`Pass ${i + 1} done: the largest ${sorted} value${sorted === 1 ? '' : 's'} are parked at the end for good.`, {
        sorted,
      });
      if (!swapped) {
        push('A whole pass with no swaps, so the array is already sorted and bubble sort can stop early.', {
          sorted: n,
        });
        break;
      }
    }
    push('Sorted.', { sorted: n });
  }

  if (algo === 'insertion') {
    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;
      comps++;
      push(`Take ${key} and compare it with ${a[j]}, the last value of the sorted prefix.`, {
        compare: [j, i],
        sorted: i,
      });
      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        moves++;
        push(`${a[j]} is bigger than ${key}, so shift it one place right.`, { moved: [j + 1], sorted: i });
        j--;
        if (j >= 0) {
          comps++;
          push(`Compare ${key} with ${a[j]}.`, { compare: [j, j + 1], sorted: i });
        }
      }
      a[j + 1] = key;
      moves++;
      push(`${key} drops into place at index ${j + 1}. The prefix is sorted again, now ${i + 1} long.`, {
        moved: [j + 1],
        sorted: i + 1,
      });
    }
    push('Sorted.', { sorted: n });
  }

  if (algo === 'merge') {
    const sort = (lo: number, hi: number) => {
      if (hi - lo < 2) return;
      const mid = (lo + hi) >> 1;
      sort(lo, mid);
      sort(mid, hi);
      const tmp: number[] = [];
      let i = lo;
      let j = mid;
      while (i < mid && j < hi) {
        comps++;
        push(`Merging [${lo}…${hi - 1}]: compare ${a[i]} and ${a[j]}, the fronts of two already-sorted halves.`, {
          compare: [i, j],
          range: [lo, hi - 1],
        });
        tmp.push(a[i] <= a[j] ? a[i++] : a[j++]);
      }
      while (i < mid) tmp.push(a[i++]);
      while (j < hi) tmp.push(a[j++]);
      for (let k = 0; k < tmp.length; k++) {
        a[lo + k] = tmp[k];
        moves++;
        push(`Write ${tmp[k]} back into index ${lo + k}. Merge sort pays for its speed with this scratch space.`, {
          moved: [lo + k],
          range: [lo, hi - 1],
        });
      }
    };
    sort(0, n);
    push('Sorted. Every merge compared two ordered runs, which is why the count barely moves when the data changes.', {
      sorted: n,
    });
  }

  if (algo === 'quick') {
    const sort = (lo: number, hi: number) => {
      if (lo >= hi) return;
      const pivot = a[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        comps++;
        push(`Partitioning [${lo}…${hi}] around pivot ${pivot}: is ${a[j]} smaller?`, {
          compare: [j, hi],
          pivot: hi,
          range: [lo, hi],
        });
        if (a[j] < pivot) {
          if (i !== j) {
            [a[i], a[j]] = [a[j], a[i]];
            moves++;
            push(`Yes — swap it into the "smaller than pivot" region on the left.`, {
              moved: [i, j],
              pivot: hi,
              range: [lo, hi],
            });
          }
          i++;
        }
      }
      [a[i], a[hi]] = [a[hi], a[i]];
      moves++;
      push(`Pivot ${pivot} moves to index ${i}. It is now in its final position, and the two sides are handled separately.`, {
        moved: [i, hi],
        pivot: i,
        range: [lo, hi],
      });
      sort(lo, i - 1);
      sort(i + 1, hi);
    };
    sort(0, n - 1);
    push('Sorted. Note that a sorted or reversed input makes this pivot choice the worst one — the partitions come out empty on one side.', {
      sorted: n,
    });
  }

  return frames;
}

const ABOUT: Record<Algo, { best: string; worst: string; blurb: string }> = {
  bubble: {
    best: 'O(n) with the early exit',
    worst: 'O(n²)',
    blurb:
      'Compares neighbours and swaps, over and over. Nobody ships it, but it is the clearest example of a quadratic algorithm: the work is a pass per element, and each pass is a walk of the array.',
  },
  insertion: {
    best: 'O(n)',
    worst: 'O(n²)',
    blurb:
      'Grows a sorted prefix, one value at a time. Its best case is genuinely useful: on nearly-ordered data each value stops after a comparison or two, which is why real sorts switch to it for short runs.',
  },
  merge: {
    best: 'O(n log n)',
    worst: 'O(n log n)',
    blurb:
      'Splits in half, sorts each half, then merges two ordered runs. The count is the same whatever the input — steady, predictable, and paid for with O(n) extra memory.',
  },
  quick: {
    best: 'O(n log n)',
    worst: 'O(n²) on already-ordered input with this pivot',
    blurb:
      'Partitions around a pivot, then recurses. Usually the fastest in practice because it works in place, but the last-element pivot degenerates on sorted data — which is exactly what the "reversed" and "nearly sorted" presets expose.',
  },
};

export default function SortingRace() {
  const reduced = usePrefersReducedMotion();
  const [algo, setAlgo] = React.useState<Algo>('insertion');
  const [preset, setPreset] = React.useState<Preset>('random');
  const [n, setN] = React.useState(14);
  const [cursor, setCursor] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const input = React.useMemo(() => makeArray(n, preset), [n, preset]);
  const frames = React.useMemo(() => buildFrames(input, algo), [input, algo]);

  React.useEffect(() => {
    setCursor(0);
    setPlaying(false);
  }, [algo, preset, n]);

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (cursor >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    const delay = Math.max(40, 420 / Math.sqrt(frames.length));
    const id = window.setTimeout(() => setCursor((c) => Math.min(frames.length - 1, c + 1)), delay);
    return () => window.clearTimeout(id);
  }, [playing, cursor, frames.length, reduced]);

  const frame = frames[Math.min(cursor, frames.length - 1)] ?? {
    arr: input,
    compare: null,
    moved: [],
    pivot: null,
    range: null,
    sorted: 0,
    comps: 0,
    moves: 0,
    note: '',
  };
  const max = Math.max(...frame.arr);
  const done = cursor >= frames.length - 1;
  const totals = frames[frames.length - 1];

  const quadratic = Math.round((n * (n - 1)) / 2);
  const linearithmic = Math.round(n * Math.log2(Math.max(2, n)));

  return (
    <WidgetShell
      takeaway="Comparisons, not seconds, are what an algorithm costs. Watch the counters rather than the bars: merge sort spends the same on any input, while insertion sort collapses to about n comparisons when the data is nearly ordered and blows up to n²/2 when it is reversed."
      readout={
        <Readout
          items={[
            { label: 'Comparisons', value: `${frame.comps}`, tone: frame.comps > quadratic ? 'bad' : 'default' },
            { label: 'Moves', value: `${frame.moves}` },
            { label: 'Step', value: `${cursor} / ${frames.length - 1}` },
            { label: 'n²/2', value: `${quadratic}`, tone: 'warn' },
            { label: 'n log₂n', value: `${linearithmic}`, tone: 'good' },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Algorithm"
            value={algo}
            onChange={(v) => setAlgo(v as Algo)}
            options={[
              { value: 'bubble', label: 'Bubble' },
              { value: 'insertion', label: 'Insertion' },
              { value: 'merge', label: 'Merge' },
              { value: 'quick', label: 'Quick' },
            ]}
          />
          <Toggle
            label="Starting order"
            value={preset}
            onChange={(v) => setPreset(v as Preset)}
            options={[
              { value: 'random', label: 'Shuffled' },
              { value: 'nearly', label: 'Nearly sorted' },
              { value: 'reversed', label: 'Reversed' },
            ]}
          />
          <Slider
            label="Array size (n)"
            value={n}
            min={6}
            max={24}
            step={1}
            onChange={setN}
            format={(v) => String(v)}
            hint="Double n and watch the quadratic sorts roughly quadruple their comparisons while merge sort only edges up."
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            {reduced ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCursor((c) => Math.min(frames.length - 1, c + 1))}
                  disabled={done}
                  className={BTN}
                >
                  Step
                </button>
                <button type="button" onClick={() => setCursor(0)} className={BTN}>
                  Reset
                </button>
              </div>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => {
                  if (done) setCursor(0);
                  setPlaying((p) => !p);
                }}
                onStep={() => setCursor((c) => Math.min(frames.length - 1, c + 1))}
                onReset={() => {
                  setCursor(0);
                  setPlaying(false);
                }}
                label="the sort"
              />
            )}
            <button type="button" onClick={() => setCursor(frames.length - 1)} className={BTN}>
              Run to end
            </button>
          </div>
        </>
      }
    >
      <div className="px-3 pt-4">
        <div
          className="flex h-40 items-end gap-[3px]"
          role="img"
          aria-label={`${algo} sort on ${n} values, step ${cursor} of ${frames.length - 1}. ${frame.comps} comparisons, ${frame.moves} moves.`}
        >
          {frame.arr.map((v, i) => {
            const isCompare = frame.compare?.includes(i) ?? false;
            const isMoved = frame.moved.includes(i);
            const isPivot = frame.pivot === i;
            const isSorted =
              frame.sorted >= frame.arr.length ||
              (algo === 'bubble' ? i >= frame.arr.length - frame.sorted : algo === 'insertion' ? i < frame.sorted : false);
            const inRange = frame.range ? i >= frame.range[0] && i <= frame.range[1] : true;
            return (
              <div key={i} className="flex h-full flex-1 flex-col justify-end">
                <div
                  className={cn(
                    'w-full rounded-t-[2px] transition-[height] duration-150',
                    isPivot
                      ? 'bg-primary'
                      : isMoved
                        ? 'bg-warning'
                        : isCompare
                          ? 'bg-accent'
                          : isSorted
                            ? 'bg-success'
                            : 'bg-surface-3',
                  )}
                  style={{ height: `${(v / max) * 100}%`, opacity: inRange ? 1 : 0.35 }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-subtle">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-accent" /> comparing
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-warning" /> just moved
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-primary" /> pivot
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-success" /> final position
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm bg-surface-3" /> untouched · dimmed = outside the current sub-array
          </span>
        </div>
      </div>

      <div className="border-t border-line px-4 py-2.5">
        <p className="text-[12px] leading-relaxed text-muted">{frame.note || 'Press Play or Step to start.'}</p>
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11.5px]">
          <span className="text-subtle">
            Best case <span className="font-mono text-success">{ABOUT[algo].best}</span>
          </span>
          <span className="text-subtle">
            Worst case <span className="font-mono text-danger">{ABOUT[algo].worst}</span>
          </span>
          <span className="text-subtle">
            Full run <span className="font-mono text-ink">{totals.comps} comparisons, {totals.moves} moves</span>
          </span>
        </div>
        <p className="text-[11.5px] leading-relaxed text-muted">{ABOUT[algo].blurb}</p>
        {preset === 'nearly' && (
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
            This array is three adjacent swaps away from sorted. Insertion sort needs about {n} comparisons to confirm
            it; merge sort still performs its full {linearithmic}-odd, because it has no way to notice the data was
            almost ready.
          </p>
        )}
        {preset === 'reversed' && (
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
            Reversed input is the worst case for insertion sort — every value walks the whole prefix — and for this
            quicksort&rsquo;s last-element pivot, which splits the array into an empty side and everything else.
          </p>
        )}
      </div>
    </WidgetShell>
  );
}
