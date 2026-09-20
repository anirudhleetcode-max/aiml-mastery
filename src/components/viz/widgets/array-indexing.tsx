'use client';

import * as React from 'react';
import { Readout, Slider, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * Python slicing, made positional.
 *
 * Almost every slicing mistake comes from thinking about *values* when the
 * slice is about *positions*: stop is exclusive, a negative index counts back
 * from the end, and a negative step walks the other way (which quietly flips
 * the meaning of start and stop). So the widget shows both index rulers at
 * once — 0..n-1 above, -n..-1 below — and numbers each selected cell in the
 * order the slice actually visits it. When step is negative the badges count
 * right to left, which is the whole lesson in one glance.
 */

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

/**
 * CPython's `slice.indices()` followed by the loop that consumes it.
 * Reproduced exactly, including the clamping, so the widget never disagrees
 * with the interpreter.
 */
function sliceIndices(
  len: number,
  rawStart: number | null,
  rawStop: number | null,
  step: number,
): { start: number; stop: number; visited: number[] } {
  const lower = step < 0 ? -1 : 0;
  const upper = step < 0 ? len - 1 : len;

  let start: number;
  if (rawStart === null) {
    start = step < 0 ? upper : lower;
  } else if (rawStart < 0) {
    start = Math.max(rawStart + len, lower);
  } else {
    start = Math.min(rawStart, upper);
  }

  let stop: number;
  if (rawStop === null) {
    stop = step < 0 ? lower : upper;
  } else if (rawStop < 0) {
    stop = Math.max(rawStop + len, lower);
  } else {
    stop = Math.min(rawStop, upper);
  }

  const visited: number[] = [];
  if (step > 0) {
    for (let i = start; i < stop; i += step) visited.push(i);
  } else {
    for (let i = start; i > stop; i += step) visited.push(i);
  }
  return { start, stop, visited };
}

/** `2`, `-3` or an empty string for an omitted bound. */
function bound(active: boolean, value: number): string {
  return active ? String(value) : '';
}

export default function ArrayIndexing() {
  const [n, setN] = React.useState(10);
  const [start, setStart] = React.useState(2);
  const [stop, setStop] = React.useState(7);
  const [step, setStep] = React.useState(1);
  const [useStart, setUseStart] = React.useState(true);
  const [useStop, setUseStop] = React.useState(true);

  const data = React.useMemo(() => LETTERS.slice(0, n), [n]);

  const { start: lo, stop: hi, visited } = sliceIndices(
    n,
    useStart ? start : null,
    useStop ? stop : null,
    step,
  );

  /** Position in the output, or -1. Drives the order badges. */
  const order = new Map<number, number>();
  visited.forEach((idx, k) => order.set(idx, k));

  const expr = `data[${bound(useStart, start)}:${bound(useStop, stop)}${step === 1 ? '' : `:${step}`}]`;
  const result = `[${visited.map((i) => `'${data[i]}'`).join(', ')}]`;

  const explanation = (() => {
    if (visited.length === 0) {
      return step > 0
        ? `start (${lo}) is not before stop (${hi}), so the walk never begins: Python returns an empty list rather than an error.`
        : `start (${lo}) is not after stop (${hi}), so a backwards walk has nowhere to go. Empty list, no error.`;
    }
    if (step < 0) {
      return `Walking backwards from index ${lo} while the position stays above ${hi}, ${-step} cell${step === -1 ? '' : 's'} at a time.`;
    }
    return `Walking forwards from index ${lo} while the position stays below ${hi}, ${step} cell${step === 1 ? '' : 's'} at a time.`;
  })();

  return (
    <WidgetShell
      takeaway="A slice describes positions, not values. stop is never included, a negative index is just len + i, and a negative step swaps which end you start from — which is why data[::-1] reverses a list and data[5:2] returns nothing."
      readout={
        <Readout
          items={[
            { label: 'Expression', value: expr },
            { label: 'Result', value: result, tone: visited.length ? 'good' : 'warn' },
            { label: 'Length', value: `${visited.length}` },
            { label: 'Resolved', value: `start=${lo}, stop=${hi}, step=${step}` },
          ]}
        />
      }
      controls={
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Slider
                label="start"
                value={start}
                min={-n}
                max={n}
                step={1}
                onChange={setStart}
                format={(v) => (useStart ? String(v) : 'omitted')}
                hint="Negative values count back from the end: -1 is the last cell."
              />
              <label className="mt-1 flex items-center gap-2 text-[11.5px] text-subtle">
                <input
                  type="checkbox"
                  checked={!useStart}
                  onChange={(e) => setUseStart(!e.target.checked)}
                  className="accent-[hsl(var(--c-primary))]"
                />
                Omit start (data[:…])
              </label>
            </div>
            <div>
              <Slider
                label="stop"
                value={stop}
                min={-n}
                max={n}
                step={1}
                onChange={setStop}
                format={(v) => (useStop ? String(v) : 'omitted')}
                hint="Exclusive. data[0:3] gives three cells, not four."
              />
              <label className="mt-1 flex items-center gap-2 text-[11.5px] text-subtle">
                <input
                  type="checkbox"
                  checked={!useStop}
                  onChange={(e) => setUseStop(!e.target.checked)}
                  className="accent-[hsl(var(--c-primary))]"
                />
                Omit stop (data[…:])
              </label>
            </div>
          </div>
          <Slider
            label="step"
            value={step}
            min={-3}
            max={3}
            step={1}
            onChange={(v) => setStep(v === 0 ? (step > 0 ? -1 : 1) : v)}
            format={(v) => String(v)}
            hint="Zero is a ValueError in Python, so this control skips it. Try -1 with both bounds omitted."
          />
          <Slider
            label="List length"
            value={n}
            min={5}
            max={LETTERS.length}
            step={1}
            onChange={(v) => {
              setN(v);
              setStart((s) => Math.max(-v, Math.min(v, s)));
              setStop((s) => Math.max(-v, Math.min(v, s)));
            }}
            format={(v) => `${v} cells`}
          />
        </>
      }
    >
      <div className="px-3 pt-4">
        <p className="mb-2 px-1 font-mono text-[12px] text-muted">
          data = [{data.map((d) => `'${d}'`).join(', ')}]
        </p>
        <div
          className="grid gap-[3px]"
          role="img"
          aria-label={`${expr} selects ${visited.length} of ${n} cells: ${result}`}
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {data.map((value, i) => {
            const pick = order.get(i);
            const selected = pick !== undefined;
            return (
              <div key={i} className="flex flex-col items-center">
                <span
                  className={cn(
                    'mb-0.5 font-mono text-[9px] tabular-nums',
                    selected ? 'text-accent' : 'text-transparent',
                  )}
                >
                  {selected ? pick + 1 : '0'}
                </span>
                <div
                  className={cn(
                    'flex h-10 w-full items-center justify-center rounded-md border font-mono text-[12px] transition-colors',
                    selected
                      ? 'border-primary bg-primary/20 font-semibold text-ink'
                      : 'border-line bg-surface-2 text-subtle',
                  )}
                >
                  {value}
                </div>
                <span className={cn('mt-1 font-mono text-[10px] tabular-nums', selected ? 'text-ink' : 'text-subtle')}>
                  {i}
                </span>
                <span className="font-mono text-[9px] tabular-nums text-subtle">{i - n}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-2 px-1 text-[11px] leading-relaxed text-subtle">
          Top number: order in the output. Middle row: positive index. Bottom row: the same cell&rsquo;s negative index.
        </p>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="font-mono text-[13px] text-ink">
          {expr} <span className="text-subtle">→</span>{' '}
          <span className={visited.length ? 'text-success' : 'text-warning'}>{result}</span>
        </p>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{explanation}</p>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-subtle">
          Slicing copies: the result is a new list, so changing it leaves <span className="font-mono">data</span>{' '}
          untouched. Reading one cell is O(1); the slice above costs O({visited.length || 1}) — one step per cell it
          keeps.
        </p>
      </div>
    </WidgetShell>
  );
}
