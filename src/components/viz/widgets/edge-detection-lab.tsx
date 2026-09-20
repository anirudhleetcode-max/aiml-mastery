'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, VIZ, WidgetShell, useResponsiveCanvas } from './shared';
import { cn } from '@/lib/cn';

/**
 * Edge detection, which is convolution wearing a different hat.
 *
 * The same sliding-window arithmetic from the convolution lab is applied here
 * to a real image-sized grid, and the kernel for the selected filter is printed
 * beside the result. Sobel-x is nine numbers; "detecting vertical edges" is
 * what those nine numbers do, not a separate algorithm.
 *
 * The two honest complications are here too: a threshold, because a gradient
 * magnitude is continuous and a decision about what counts as an edge is not;
 * and noise, because the Laplacian in particular amplifies it, which is why
 * blur-then-edge is the standard recipe rather than an optimisation.
 */

const SIZE = 56;

/** Small, fast, seeded PRNG, so the noise is the same for the same seed. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Resolves a design token to something a canvas can paint. */
function makeResolve() {
  const style = getComputedStyle(document.documentElement);
  const expand = (input: string, depth: number): string =>
    depth > 4
      ? input
      : input.replace(/var\((--[a-z0-9-]+)\)/g, (_m, name: string) =>
          expand(style.getPropertyValue(name).trim(), depth + 1),
        );
  return (token: string, fallback: string) => {
    const out = expand(token, 0).trim();
    return out === '' || out.includes('var(') ? fallback : out;
  };
}

/** A synthetic scene: a square, a disc, a diagonal bar and a soft ramp. */
function makeImage(noise: number, seed: number): Float32Array {
  const rng = mulberry32(seed * 7919 + 3);
  const img = new Float32Array(SIZE * SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let v = 0.12 + 0.1 * (x / SIZE); // a gentle ramp, so flat is not perfectly flat
      if (x >= 6 && x < 22 && y >= 6 && y < 22) v = 0.85; // square
      if (Math.hypot(x - 38, y - 16) < 9) v = 0.62; // disc
      if (Math.abs(y - 0.8 * x - 10) < 2.4 && y > 26) v = 0.95; // diagonal bar
      if (y >= 40 && y < 48 && x >= 4 && x < 50) v = 0.35; // low-contrast strip
      img[y * SIZE + x] = Math.max(0, Math.min(1, v + (rng() * 2 - 1) * noise));
    }
  }
  return img;
}

interface Filter {
  id: string;
  label: string;
  kernel: number[];
  /** A second pass applied first, for the blur-then-edge recipe. */
  pre?: number[];
  signed: boolean;
  magnitude?: boolean;
  note: string;
}

const GAUSS = [1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16];
const SOBEL_X = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
const SOBEL_Y = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
const LAPLACIAN = [0, 1, 0, 1, -4, 1, 0, 1, 0];

const FILTERS: Filter[] = [
  {
    id: 'sobelx',
    label: 'Sobel-x',
    kernel: SOBEL_X,
    signed: true,
    note: 'Right column minus left column. It fires on vertical edges and is blind to horizontal ones — the left and right sides of the square light up, the top and bottom do not.',
  },
  {
    id: 'sobely',
    label: 'Sobel-y',
    kernel: SOBEL_Y,
    signed: true,
    note: 'The same kernel rotated. Now the horizontal edges respond and the vertical ones vanish. Neither kernel is an edge detector on its own.',
  },
  {
    id: 'magnitude',
    label: 'Gradient magnitude',
    kernel: SOBEL_X,
    signed: false,
    magnitude: true,
    note: '√(Gx² + Gy²) — run both Sobel kernels and combine them, so the response no longer depends on the direction of the edge. This is what people mean by "Sobel edge detection".',
  },
  {
    id: 'laplacian',
    label: 'Laplacian',
    kernel: LAPLACIAN,
    signed: true,
    note: 'A second derivative: it responds to where the brightness gradient itself changes, giving thin double lines around each edge — and it amplifies noise more than Sobel does.',
  },
  {
    id: 'blur',
    label: 'Gaussian blur',
    kernel: GAUSS,
    signed: false,
    note: 'Not an edge detector at all. A weighted local average, the same sliding window with nine positive weights that sum to 1, which is why the output stays in the same brightness range.',
  },
  {
    id: 'bluredge',
    label: 'Blur, then edge',
    kernel: SOBEL_X,
    pre: GAUSS,
    signed: false,
    magnitude: true,
    note: 'Smooth first, then take the gradient. With noise turned up this is dramatically cleaner than the raw gradient — the standard first two steps of the Canny detector.',
  },
];

/** One convolution pass with edge-replicated borders. */
function convolve(src: Float32Array, k: number[]): Float32Array {
  const out = new Float32Array(SIZE * SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let s = 0;
      for (let j = -1; j <= 1; j++) {
        const yy = Math.min(SIZE - 1, Math.max(0, y + j));
        for (let i = -1; i <= 1; i++) {
          const xx = Math.min(SIZE - 1, Math.max(0, x + i));
          s += src[yy * SIZE + xx] * k[(j + 1) * 3 + (i + 1)];
        }
      }
      out[y * SIZE + x] = s;
    }
  }
  return out;
}

function applyFilter(img: Float32Array, f: Filter): Float32Array {
  const base = f.pre ? convolve(img, f.pre) : img;
  if (f.magnitude) {
    const gx = convolve(base, SOBEL_X);
    const gy = convolve(base, SOBEL_Y);
    const out = new Float32Array(SIZE * SIZE);
    for (let i = 0; i < out.length; i++) out[i] = Math.hypot(gx[i], gy[i]);
    return out;
  }
  return convolve(base, f.kernel);
}

const fmtK = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2));

export default function EdgeDetectionLab() {
  const [filterId, setFilterId] = React.useState('magnitude');
  const [threshold, setThreshold] = React.useState(0.5);
  const [noise, setNoise] = React.useState(0.04);
  const [seed, setSeed] = React.useState(2);

  const filter = FILTERS.find((f) => f.id === filterId) ?? FILTERS[0];
  const image = React.useMemo(() => makeImage(noise, seed), [noise, seed]);
  const result = React.useMemo(() => applyFilter(image, filter), [image, filter]);

  const isEdge = filter.id !== 'blur';
  const maxAbs = React.useMemo(() => {
    let m = 1e-6;
    for (const v of result) m = Math.max(m, Math.abs(v));
    return m;
  }, [result]);

  const above = React.useMemo(() => {
    let n = 0;
    for (const v of result) if (Math.abs(v) / maxAbs >= threshold) n++;
    return n;
  }, [result, maxAbs, threshold]);

  const drawInput = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const resolve = makeResolve();
      const ink = resolve('hsl(var(--c-text))', '#eee');
      const bg = resolve('hsl(var(--c-surface-2))', '#111');
      const cell = Math.min(w, h) / SIZE;
      const ox = (w - cell * SIZE) / 2;
      const oy = (h - cell * SIZE) / 2;
      ctx.fillStyle = bg;
      ctx.fillRect(ox, oy, cell * SIZE, cell * SIZE);
      ctx.fillStyle = ink;
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          ctx.globalAlpha = Math.max(0, Math.min(1, image[y * SIZE + x]));
          ctx.fillRect(ox + x * cell, oy + y * cell, cell + 0.5, cell + 0.5);
        }
      }
      ctx.globalAlpha = 1;
    },
    [image],
  );

  const drawOutput = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const resolve = makeResolve();
      const bg = resolve('hsl(var(--c-surface-2))', '#111');
      const ink = resolve('hsl(var(--c-text))', '#eee');
      const hot = resolve(VIZ.good, '#199e70');
      const pos = resolve(VIZ.series, '#8164f7');
      const neg = resolve(VIZ.warn, '#d95926');
      const cell = Math.min(w, h) / SIZE;
      const ox = (w - cell * SIZE) / 2;
      const oy = (h - cell * SIZE) / 2;
      ctx.fillStyle = bg;
      ctx.fillRect(ox, oy, cell * SIZE, cell * SIZE);

      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const v = result[y * SIZE + x];
          const rel = Math.abs(v) / maxAbs;
          if (!isEdge) {
            ctx.fillStyle = ink;
            ctx.globalAlpha = Math.max(0, Math.min(1, v));
          } else if (rel >= threshold) {
            // Above threshold: this is what the detector calls an edge.
            ctx.fillStyle = hot;
            ctx.globalAlpha = 1;
          } else {
            ctx.fillStyle = v < 0 ? neg : pos;
            ctx.globalAlpha = rel * 0.75;
          }
          ctx.fillRect(ox + x * cell, oy + y * cell, cell + 0.5, cell + 0.5);
        }
      }
      ctx.globalAlpha = 1;
    },
    [result, maxAbs, threshold, isEdge],
  );

  const { canvasRef: inputCanvas } = useResponsiveCanvas(drawInput, [drawInput]);
  const { canvasRef: outputCanvas } = useResponsiveCanvas(drawOutput, [drawOutput]);

  const kernelShown = filter.magnitude ? SOBEL_X : filter.kernel;

  return (
    <WidgetShell
      takeaway="An edge detector is a convolution with a particular kernel and nothing more. Sobel-x subtracts the left column from the right, so it answers one question — how fast is brightness changing horizontally — and everything else, including the threshold that turns a number into an edge, is a decision layered on top."
      readout={
        <Readout
          items={[
            { label: 'Filter', value: filter.label },
            { label: 'Kernel sum', value: fmtK(Math.round(kernelShown.reduce((a, b) => a + b, 0) * 100) / 100) },
            { label: 'Peak response', value: maxAbs.toFixed(3) },
            {
              label: 'Pixels called edge',
              value: isEdge ? `${above} (${((above / (SIZE * SIZE)) * 100).toFixed(1)}%)` : 'n/a — blur only',
              tone: isEdge && above / (SIZE * SIZE) > 0.3 ? 'warn' : 'default',
            },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Filter"
            value={filterId}
            onChange={setFilterId}
            options={FILTERS.map((f) => ({ value: f.id, label: f.label }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider
              label="Edge threshold"
              value={threshold}
              min={0.05}
              max={0.95}
              step={0.01}
              onChange={setThreshold}
              format={(v) => `${(v * 100).toFixed(0)}% of peak`}
              hint={isEdge ? 'Above this fraction of the peak response a pixel is called an edge.' : 'The blur has no threshold — its output is an image, not a decision.'}
            />
            <Slider
              label="Sensor noise"
              value={noise}
              min={0}
              max={0.25}
              step={0.01}
              onChange={setNoise}
              format={(v) => v.toFixed(2)}
              hint="Turn this up, then compare Laplacian against blur-then-edge."
            />
          </div>
          <Slider label="Seed (noise)" value={seed} min={1} max={9} step={1} onChange={setSeed} hint="Same seed, same grain." />
          <p className="text-[11.5px] leading-relaxed text-subtle">{filter.note}</p>
        </>
      }
    >
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-surface p-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Input {SIZE}×{SIZE}
          </p>
          <div className="h-44 w-full">
            <canvas
              ref={inputCanvas}
              className="block"
              role="img"
              aria-label="Synthetic input image: a bright square, a disc, a diagonal bar and a low-contrast strip"
            />
          </div>
        </div>
        <div className="bg-surface p-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            After {filter.label}
          </p>
          <div className="h-44 w-full">
            <canvas
              ref={outputCanvas}
              className="block"
              role="img"
              aria-label={`Output of ${filter.label}; ${above} pixels are above the ${(threshold * 100).toFixed(0)} percent threshold`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-4 border-t border-line px-4 py-3">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            {filter.pre ? 'Second kernel (the first is the blur)' : 'The kernel'}
          </p>
          <div className="grid w-24 grid-cols-3 gap-px">
            {kernelShown.map((v, i) => (
              <div
                key={i}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-[2px] border border-line text-[10px] tabular-nums',
                  v > 0 ? 'text-ink' : v < 0 ? 'text-warning' : 'text-subtle',
                )}
                style={{ background: 'hsl(var(--c-surface-2))' }}
              >
                {fmtK(v)}
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-[180px] flex-1 space-y-1.5 text-[11.5px] leading-relaxed text-subtle">
          <p>
            {filter.magnitude
              ? 'The magnitude view runs Sobel-x and Sobel-y over the same image and combines them as √(Gx² + Gy²), so an edge at any angle responds.'
              : 'Each output pixel is the nine neighbouring input pixels multiplied by these nine weights and added up — exactly the operation in the convolution lab, run over the whole image.'}
          </p>
          <p>
            Solid green pixels are above the threshold. Sub-threshold responses are drawn faintly, warm where the signed
            response is negative, so you can see what the threshold is discarding.
          </p>
          {filter.id === 'laplacian' && noise > 0.1 && (
            <p className="text-warning">
              At this noise level the Laplacian is responding to grain as strongly as to real edges — switch to blur,
              then edge, and compare.
            </p>
          )}
        </div>
      </div>
    </WidgetShell>
  );
}
