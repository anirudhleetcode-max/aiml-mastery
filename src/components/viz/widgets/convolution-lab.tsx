'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, VIZ, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * A convolution, one multiply-accumulate at a time.
 *
 * Learners meet convolution as a diagram of a sliding square and come away
 * with no idea what is being computed. So this widget refuses to abstract: the
 * nine products for the current window are written out as arithmetic, summed,
 * and dropped into the output grid, which fills in cell by cell as the kernel
 * walks the image. Editing the kernel changes what the feature map detects,
 * and the presets make the point that "edge detector" is not a special
 * mechanism — it is nine numbers.
 */

const N = 8;
const K = 3;
const OUT = N - K + 1;

type InputId = 'edge' | 'corner' | 'diagonal' | 'texture';

/** Small, fast, seeded PRNG, so the texture preset is the same every visit. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const INPUT_NOTE: Record<InputId, string> = {
  edge: 'A dark half and a light half, with one vertical edge between them. The clearest test of a filter.',
  corner: 'A bright square on a dark field: four edges and four corners.',
  diagonal: 'A diagonal stripe, which the two Sobel kernels respond to equally.',
  texture: 'Seeded noise. Most filters produce noise back — structure is what filters find.',
};

function makeInput(id: InputId, seed: number): number[][] {
  const rng = mulberry32(seed * 2654435761 + 11);
  const g: number[][] = [];
  for (let r = 0; r < N; r++) {
    const row: number[] = [];
    for (let c = 0; c < N; c++) {
      if (id === 'edge') row.push(c < N / 2 ? 1 : 8);
      else if (id === 'corner') row.push(r >= 2 && r <= 5 && c >= 2 && c <= 5 ? 9 : 1);
      else if (id === 'diagonal') row.push(Math.abs(r - c) <= 1 ? 9 : 1);
      else row.push(Math.round(rng() * 9));
    }
    g.push(row);
  }
  return g;
}

interface KernelPreset {
  id: string;
  label: string;
  k: number[];
  note: string;
}

const KERNELS: KernelPreset[] = [
  { id: 'identity', label: 'Identity', k: [0, 0, 0, 0, 1, 0, 0, 0, 0], note: 'Copies the centre pixel. The output is the input, cropped by the border.' },
  {
    id: 'blur',
    label: 'Blur',
    k: new Array(9).fill(0.11),
    note: 'Every neighbour gets an equal ninth. Averaging removes detail, which is exactly what smoothing means.',
  },
  { id: 'sharpen', label: 'Sharpen', k: [0, -1, 0, -1, 5, -1, 0, -1, 0], note: 'Centre boosted, neighbours subtracted. It exaggerates whatever difference already exists.' },
  { id: 'sobelx', label: 'Sobel-x', k: [-1, 0, 1, -2, 0, 2, -1, 0, 1], note: 'Right column minus left column: large where brightness changes horizontally, zero on flat areas.' },
  { id: 'sobely', label: 'Sobel-y', k: [-1, -2, -1, 0, 0, 0, 1, 2, 1], note: 'The same idea rotated: it responds to horizontal edges and ignores vertical ones.' },
  { id: 'emboss', label: 'Emboss', k: [-2, -1, 0, -1, 1, 1, 0, 1, 2], note: 'A directional difference plus a bias toward the centre, which reads as a lit relief.' },
];

function convolveAt(input: number[][], k: number[], r: number, c: number): number {
  let s = 0;
  for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) s += input[r + i][c + j] * k[i * K + j];
  return s;
}

function fmt(v: number): string {
  const r = Math.round(v * 100) / 100;
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
}

export default function ConvolutionLab() {
  const reduced = usePrefersReducedMotion();
  const [inputId, setInputId] = React.useState<InputId>('edge');
  const [seed, setSeed] = React.useState(4);
  const [kernelId, setKernelId] = React.useState('sobelx');
  const [kernel, setKernel] = React.useState<number[]>(KERNELS[3].k.slice());
  const [selected, setSelected] = React.useState(0);
  const [pos, setPos] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const input = React.useMemo(() => makeInput(inputId, seed), [inputId, seed]);

  const preset = KERNELS.find((p) => p.id === kernelId);
  const isCustom = !preset || preset.k.some((v, i) => Math.abs(v - kernel[i]) > 1e-9);

  const outputs = React.useMemo(() => {
    const vals: number[] = [];
    for (let r = 0; r < OUT; r++) for (let c = 0; c < OUT; c++) vals.push(convolveAt(input, kernel, r, c));
    return vals;
  }, [input, kernel]);

  const maxAbs = Math.max(1, ...outputs.map((v) => Math.abs(v)));
  const cursor = Math.min(pos, OUT * OUT - 1);
  const cr = Math.floor(cursor / OUT);
  const cc = cursor % OUT;

  React.useEffect(() => {
    if (!playing || reduced) return;
    const t = window.setInterval(() => {
      setPos((p) => {
        if (p >= OUT * OUT) {
          setPlaying(false);
          return p;
        }
        return p + 1;
      });
    }, 320);
    return () => window.clearInterval(t);
  }, [playing, reduced]);

  // A new image or a new kernel means the feature map has to be rebuilt.
  React.useEffect(() => {
    setPos(0);
    setPlaying(false);
  }, [inputId, seed, kernel]);

  const applyPreset = (id: string) => {
    const p = KERNELS.find((x) => x.id === id);
    if (!p) return;
    setKernelId(id);
    setKernel(p.k.slice());
  };

  const terms = React.useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const r = cr + Math.floor(i / K);
        const c = cc + (i % K);
        return { pixel: input[r][c], weight: kernel[i], product: input[r][c] * kernel[i] };
      }),
    [input, kernel, cr, cc],
  );
  const currentValue = terms.reduce((s, t) => s + t.product, 0);
  const done = pos >= OUT * OUT;

  return (
    <WidgetShell
      takeaway="A convolution is nine multiplications and an addition, repeated at every position. Change the nine numbers and you change what the layer detects — which is precisely what training a convolutional network does."
      readout={
        <Readout
          items={[
            { label: 'Window', value: `row ${cr}, col ${cc}` },
            { label: 'Output', value: fmt(currentValue), tone: Math.abs(currentValue) > maxAbs * 0.6 ? 'good' : 'default' },
            { label: 'Filled', value: `${Math.min(pos, OUT * OUT)} / ${OUT * OUT}` },
            { label: 'Output size', value: `${N} − ${K} + 1 = ${OUT}` },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Toggle
              label="Input image"
              value={inputId}
              onChange={(v) => setInputId(v as InputId)}
              options={[
                { value: 'edge', label: 'Edge' },
                { value: 'corner', label: 'Square' },
                { value: 'diagonal', label: 'Diagonal' },
                { value: 'texture', label: 'Texture' },
              ]}
            />
            <PlayButton
              playing={playing}
              onToggle={() => setPlaying((p) => !p)}
              onStep={() => setPos((p) => Math.min(OUT * OUT, p + 1))}
              onReset={() => {
                setPos(0);
                setPlaying(false);
              }}
              label="the sliding kernel"
            />
          </div>
          <Toggle
            label={`Kernel${isCustom ? ' (edited)' : ''}`}
            value={isCustom ? '' : kernelId}
            onChange={applyPreset}
            options={KERNELS.map((k) => ({ value: k.id, label: k.label }))}
          />
          <Slider
            label={`Weight at kernel row ${Math.floor(selected / K)}, column ${selected % K}`}
            value={kernel[selected]}
            min={-4}
            max={4}
            step={0.25}
            onChange={(v) => setKernel((k) => k.map((old, i) => (i === selected ? v : old)))}
            format={(v) => fmt(v)}
            hint="Tap a kernel cell above to select it, then drag to change what the filter looks for."
          />
          {inputId === 'texture' && (
            <Slider label="Seed" value={seed} min={1} max={9} step={1} onChange={setSeed} hint="Same seed, same texture." />
          )}
          <p className="text-[11.5px] leading-relaxed text-subtle">
            {INPUT_NOTE[inputId]} {isCustom ? 'This kernel has been edited by hand.' : preset?.note}
          </p>
          {reduced && (
            <p className="text-[11.5px] leading-relaxed text-subtle">
              The slide is not animated because you have asked for reduced motion. Press{' '}
              <strong className="text-ink">Step</strong> to move the kernel one position.
            </p>
          )}
        </>
      }
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Input {N}×{N}</p>
          <div
            className="grid gap-px"
            style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
            role="img"
            aria-label={`Input image, ${N} by ${N}, kernel currently at row ${cr} column ${cc}`}
          >
            {input.map((row, r) =>
              row.map((v, c) => {
                const inWindow = r >= cr && r < cr + K && c >= cc && c < cc + K;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={cn(
                      'flex aspect-square items-center justify-center rounded-[2px] text-[9.5px] font-medium tabular-nums',
                      inWindow ? 'text-ink ring-2 ring-inset ring-[hsl(var(--c-primary))]' : 'text-muted',
                    )}
                    style={{ background: `color-mix(in srgb, ${VIZ.series} ${Math.round((v / 9) * 55)}%, transparent)` }}
                  >
                    {v}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        <div className="sm:pt-6">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Kernel 3×3</p>
          <div className="grid w-28 grid-cols-3 gap-px">
            {kernel.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Kernel weight row ${Math.floor(i / K)} column ${i % K}, value ${fmt(v)}`}
                aria-pressed={selected === i}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-[2px] border text-[10px] font-medium tabular-nums transition-colors',
                  selected === i ? 'border-primary bg-primary/10 text-ink' : 'border-line bg-surface-2 text-muted hover:text-ink',
                )}
              >
                {fmt(v)}
              </button>
            ))}
          </div>
          <p className="mt-1.5 w-28 text-[10.5px] leading-snug text-subtle">Sum {fmt(kernel.reduce((a, b) => a + b, 0))}</p>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Feature map {OUT}×{OUT}
          </p>
          <div
            className="grid gap-px"
            style={{ gridTemplateColumns: `repeat(${OUT}, minmax(0, 1fr))` }}
            role="img"
            aria-label={`Output feature map, ${Math.min(pos, OUT * OUT)} of ${OUT * OUT} cells computed`}
          >
            {outputs.map((v, i) => {
              const filled = i < pos;
              const isCursor = i === cursor && !done;
              const tint = Math.round((Math.abs(v) / maxAbs) * 60);
              return (
                <div
                  key={i}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-[2px] text-[9px] font-medium tabular-nums',
                    filled ? 'text-ink' : 'text-subtle',
                    isCursor && 'ring-2 ring-inset ring-[hsl(var(--c-primary))]',
                  )}
                  style={{
                    background: filled
                      ? `color-mix(in srgb, ${v < 0 ? VIZ.warn : VIZ.series} ${tint}%, transparent)`
                      : 'hsl(var(--c-surface-2))',
                  }}
                >
                  {filled ? fmt(v) : ''}
                </div>
              );
            })}
          </div>
          <p className="mt-1.5 text-[10.5px] leading-snug text-subtle">
            Negative values are shown in the warm tint; the number is always printed.
          </p>
        </div>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          The multiply-accumulate at row {cr}, column {cc}
        </p>
        <div className="grid grid-cols-3 gap-x-3 gap-y-1 font-mono text-[11.5px] tabular-nums sm:grid-cols-3">
          {terms.map((t, i) => (
            <span key={i} className={t.product === 0 ? 'text-subtle' : 'text-muted'}>
              {t.pixel} × {fmt(t.weight)} = <span className="text-ink">{fmt(t.product)}</span>
            </span>
          ))}
        </div>
        <p className="mt-2 font-mono text-[12px] tabular-nums text-muted">
          sum ={' '}
          {terms
            .map((t) => fmt(t.product))
            .join(' + ')
            .replace(/\+ -/g, '− ')}{' '}
          = <span className="font-semibold text-accent">{fmt(currentValue)}</span>
        </p>
      </div>
    </WidgetShell>
  );
}
