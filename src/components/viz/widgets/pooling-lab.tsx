'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, VIZ, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * Pooling: the downsample that keeps the evidence and throws away the address.
 *
 * Two ideas have to land. The first is mechanical — every output cell comes
 * from one window of the input, and the output size is a formula the learner
 * can compute — so tapping an output cell lights up its source window and
 * writes out the max or the mean.
 *
 * The second is the reason pooling exists: shift the image by one pixel and
 * most of the pooled output does not change. The counter in the readout makes
 * that concrete instead of asking the learner to take "translation invariance"
 * on faith.
 */

const N = 8;

/** Small, fast, seeded PRNG, so the same seed always gives the same image. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Shift = 'none' | 'right' | 'down';

/** A bright blob on a quiet background, so pooling has structure to preserve. */
function makeInput(seed: number): number[][] {
  const rng = mulberry32(seed * 40503 + 17);
  const cx = 2.4 + rng() * 1.4;
  const cy = 2.2 + rng() * 1.6;
  const g: number[][] = [];
  for (let r = 0; r < N; r++) {
    const row: number[] = [];
    for (let c = 0; c < N; c++) {
      const d = Math.hypot(r - cy, c - cx);
      const blob = 9 * Math.exp(-(d * d) / 4.5);
      row.push(Math.max(0, Math.min(9, Math.round(blob + rng() * 2.2))));
    }
    g.push(row);
  }
  return g;
}

function shiftGrid(g: number[][], shift: Shift): number[][] {
  if (shift === 'none') return g;
  const out: number[][] = [];
  for (let r = 0; r < N; r++) {
    const row: number[] = [];
    for (let c = 0; c < N; c++) {
      if (shift === 'right') row.push(c === 0 ? 0 : g[r][c - 1]);
      else row.push(r === 0 ? 0 : g[r - 1][c]);
    }
    out.push(row);
  }
  return out;
}

function outSize(n: number, pool: number, stride: number): number {
  return Math.floor((n - pool) / stride) + 1;
}

function pool(g: number[][], size: number, stride: number, mode: 'max' | 'avg'): number[] {
  const o = outSize(N, size, stride);
  const vals: number[] = [];
  for (let r = 0; r < o; r++) {
    for (let c = 0; c < o; c++) {
      let best = -Infinity;
      let sum = 0;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const v = g[r * stride + i][c * stride + j];
          if (v > best) best = v;
          sum += v;
        }
      }
      vals.push(mode === 'max' ? best : sum / (size * size));
    }
  }
  return vals;
}

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2));

export default function PoolingLab() {
  const [mode, setMode] = React.useState<'max' | 'avg'>('max');
  const [size, setSize] = React.useState(2);
  const [stride, setStride] = React.useState(2);
  const [seed, setSeed] = React.useState(3);
  const [shift, setShift] = React.useState<Shift>('none');
  const [selected, setSelected] = React.useState(0);

  const base = React.useMemo(() => makeInput(seed), [seed]);
  const input = React.useMemo(() => shiftGrid(base, shift), [base, shift]);

  const o = outSize(N, size, stride);
  const outputs = React.useMemo(() => pool(input, size, stride, mode), [input, size, stride, mode]);
  const baseOutputs = React.useMemo(() => pool(base, size, stride, mode), [base, size, stride, mode]);
  const shiftedRight = React.useMemo(
    () => pool(shiftGrid(base, 'right'), size, stride, mode),
    [base, size, stride, mode],
  );

  // How much of the pooled map survives a one-pixel translation unchanged?
  const unchanged = baseOutputs.reduce((n, v, i) => n + (Math.abs(v - shiftedRight[i]) < 1e-9 ? 1 : 0), 0);

  const idx = Math.min(selected, outputs.length - 1);
  const sr = Math.floor(idx / o);
  const sc = idx % o;

  const window = React.useMemo(() => {
    const cells: { r: number; c: number; v: number }[] = [];
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++) {
        const r = sr * stride + i;
        const c = sc * stride + j;
        if (r < N && c < N) cells.push({ r, c, v: input[r][c] });
      }
    return cells;
  }, [input, size, stride, sr, sc]);

  const winner = window.reduce((b, cell) => (cell.v > b.v ? cell : b), window[0]);
  const sum = window.reduce((s, cell) => s + cell.v, 0);
  const result = mode === 'max' ? winner.v : sum / window.length;
  const covered = stride >= size ? 'no overlap' : 'windows overlap';
  const dropped = N - ((o - 1) * stride + size);

  return (
    <WidgetShell
      takeaway={`Pooling keeps the strongest evidence in a window and forgets where inside the window it was. That is why shifting this image one pixel to the right leaves ${unchanged} of ${baseOutputs.length} pooled values completely unchanged — partial translation invariance, bought by throwing away position.`}
      readout={
        <Readout
          items={[
            { label: 'Output size', value: `⌊(${N} − ${size}) / ${stride}⌋ + 1 = ${o}` },
            { label: 'Selected', value: `${fmt(result)} (row ${sr}, col ${sc})` },
            { label: 'Unchanged after 1px shift', value: `${unchanged} / ${baseOutputs.length}`, tone: unchanged > baseOutputs.length / 2 ? 'good' : 'warn' },
            { label: 'Rows ignored at the edge', value: String(dropped), tone: dropped > 0 ? 'warn' : 'default' },
          ]}
        />
      }
      controls={
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle
              label="Pooling"
              value={mode}
              onChange={(v) => setMode(v as 'max' | 'avg')}
              options={[
                { value: 'max', label: 'Max' },
                { value: 'avg', label: 'Average' },
              ]}
            />
            <Toggle
              label="Translate the input"
              value={shift}
              onChange={(v) => setShift(v as Shift)}
              options={[
                { value: 'none', label: 'Original' },
                { value: 'right', label: 'Right 1px' },
                { value: 'down', label: 'Down 1px' },
              ]}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label="Pool size" value={size} min={2} max={4} step={1} onChange={setSize} format={(v) => `${v}×${v}`} />
            <Slider
              label="Stride"
              value={stride}
              min={1}
              max={4}
              step={1}
              onChange={setStride}
              hint={`Stride ${stride} with a ${size}×${size} window: ${covered}.`}
            />
          </div>
          <Slider label="Seed (image)" value={seed} min={1} max={9} step={1} onChange={setSeed} hint="Same seed, same image." />
        </>
      }
    >
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Input {N}×{N}
            {shift !== 'none' && <span className="ml-1 font-normal normal-case tracking-normal text-warning">shifted</span>}
          </p>
          <div
            className="grid gap-px"
            style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
            role="img"
            aria-label={`Input grid, selected pooling window at row ${sr}, column ${sc}`}
          >
            {input.map((row, r) =>
              row.map((v, c) => {
                const inWindow = window.some((w) => w.r === r && w.c === c);
                const isWinner = mode === 'max' && inWindow && r === winner.r && c === winner.c;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={cn(
                      'flex aspect-square items-center justify-center rounded-[2px] text-[10px] tabular-nums',
                      inWindow ? 'font-semibold text-ink ring-2 ring-inset ring-[hsl(var(--c-primary))]' : 'text-muted',
                      isWinner && 'underline decoration-2 underline-offset-2',
                    )}
                    style={{ background: `color-mix(in srgb, ${VIZ.series} ${Math.round((v / 9) * 55)}%, transparent)` }}
                  >
                    {v}
                  </div>
                );
              }),
            )}
          </div>
          <p className="mt-1.5 text-[10.5px] leading-snug text-subtle">
            {mode === 'max'
              ? 'The underlined cell is the one that survives; the other cells in the window are discarded entirely.'
              : 'Every cell in the window contributes an equal share to the average.'}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Pooled {o}×{o}
          </p>
          <div
            className="grid gap-px"
            style={{ gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))`, maxWidth: `${o * 42}px` }}
          >
            {outputs.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Pooled value ${fmt(v)} at row ${Math.floor(i / o)}, column ${i % o}`}
                aria-pressed={i === idx}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-[2px] text-[10px] tabular-nums transition-colors',
                  i === idx ? 'font-semibold text-ink ring-2 ring-inset ring-[hsl(var(--c-primary))]' : 'text-muted hover:text-ink',
                )}
                style={{ background: `color-mix(in srgb, ${VIZ.good} ${Math.round((v / 9) * 55)}%, transparent)` }}
              >
                {fmt(v)}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[10.5px] leading-snug text-subtle">
            Tap any pooled cell to see the window it came from. {N}×{N} = {N * N} numbers became {o}×{o} ={' '}
            {o * o} — a {((1 - (o * o) / (N * N)) * 100).toFixed(0)}% reduction.
          </p>
        </div>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Where output ({sr}, {sc}) came from
        </p>
        <p className="font-mono text-[12px] tabular-nums text-muted">
          {mode === 'max' ? 'max' : 'mean'}({window.map((w) => w.v).join(', ')}){' '}
          {mode === 'avg' && <span>= {sum} / {window.length} </span>}= <span className="font-semibold text-accent">{fmt(result)}</span>
        </p>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Window top-left is input row {sr * stride}, column {sc * stride} — output index times stride. With stride{' '}
          {stride} and window {size}, the last window starts at {(o - 1) * stride} and ends at {(o - 1) * stride + size - 1}
          {dropped > 0
            ? `, so the final ${dropped} row${dropped > 1 ? 's and columns are' : ' and column are'} never pooled.`
            : ', so every pixel is covered.'}
        </p>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Translation test: original against a one-pixel shift
        </p>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Original', vals: baseOutputs },
            { label: 'Shifted right 1px', vals: shiftedRight },
          ].map((set) => (
            <div key={set.label}>
              <p className="mb-1 text-[10.5px] text-subtle">{set.label}</p>
              <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))`, width: `${o * 26}px` }}>
                {set.vals.map((v, i) => {
                  const same = Math.abs(baseOutputs[i] - shiftedRight[i]) < 1e-9;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex aspect-square items-center justify-center rounded-[2px] text-[9px] tabular-nums',
                        same ? 'text-muted' : 'font-semibold text-warning',
                      )}
                      style={{ background: same ? 'hsl(var(--c-surface-2))' : 'color-mix(in srgb, var(--viz-cat-review) 22%, transparent)' }}
                    >
                      {fmt(v)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Cells in the warm tint changed; plain cells are identical. Max pooling usually survives a small shift because
          the largest value in a window is often still the largest after the shift. Average pooling does not — every
          cell contributes, so every cell moving changes the mean.
        </p>
      </div>
    </WidgetShell>
  );
}
