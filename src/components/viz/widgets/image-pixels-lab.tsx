'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * An image is a tensor of integers. Not "like" one — it is one.
 *
 * Everything a learner later does to images (convolutions, normalisation,
 * augmentation, the first layer of a CNN) is arithmetic on this grid of
 * numbers, so the grid has to stop being an abstraction first. Sixteen by
 * sixteen is the largest picture whose every value can be shown on a phone,
 * which is why it is sixteen by sixteen.
 *
 * Three things do the teaching. The zoom, which keeps going until the picture
 * dissolves into the numbers that were always there. The channel switch, which
 * shows the same pixel carrying three independent values. And the shape
 * readout, which says 16 x 16 x 3 = 768 integers and means it.
 *
 * The sensor-noise control is seeded and the seed is on screen, so a learner
 * can return to the same "photograph" whenever they want.
 */

const N = 16;

/** Small, fast, seeded PRNG. Same seed, same grain, every time. */
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
      : input.replace(/var\((--[a-z0-9-]+)\)/g, (_m, name: string) => expand(style.getPropertyValue(name).trim(), depth + 1));
  return (token: string, fallback: string) => {
    const out = expand(token, 0).trim();
    return out === '' || out.includes('var(') ? fallback : out;
  };
}

type Pattern = 'gradient' | 'disc' | 'corner' | 'stripes';
type Channel = 'rgb' | 'r' | 'g' | 'b' | 'gray';

const PATTERN_NOTE: Record<Pattern, string> = {
  gradient: 'Red rises left to right, green rises top to bottom, blue is flat. Every pixel is a different mix.',
  disc: 'A bright disc on a dark field — the simplest thing an edge detector has to find.',
  corner: 'A hard corner. The jump between neighbouring numbers is what a convolution kernel responds to.',
  stripes: 'Alternating columns: the highest spatial frequency this grid can represent at all.',
};

function buildImage(pattern: Pattern, noise: number, seed: number): Uint8ClampedArray {
  const rand = mulberry32(seed * 2654435761 + 11);
  const data = new Uint8ClampedArray(N * N * 3);
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      let red = 0;
      let green = 0;
      let blue = 0;
      if (pattern === 'gradient') {
        red = (c / (N - 1)) * 255;
        green = (r / (N - 1)) * 255;
        blue = 64;
      } else if (pattern === 'disc') {
        const d = Math.hypot(r - 7.5, c - 7.5);
        const inside = d < 5.2 ? 1 : d < 6.2 ? 0.45 : 0;
        red = 30 + inside * 210;
        green = 34 + inside * 190;
        blue = 52 + inside * 120;
      } else if (pattern === 'corner') {
        const on = r >= 6 && c >= 5 ? 1 : 0;
        red = 24 + on * 214;
        green = 28 + on * 206;
        blue = 46 + on * 176;
      } else {
        const on = c % 3 === 0 ? 1 : 0;
        red = 40 + on * 195;
        green = 44 + on * 160;
        blue = 70 + on * 175;
      }
      const jitter = () => (rand() - 0.5) * 2 * noise;
      const i = (r * N + c) * 3;
      data[i] = red + jitter();
      data[i + 1] = green + jitter();
      data[i + 2] = blue + jitter();
    }
  }
  return data;
}

/** Rec. 601 luma — the weights are not equal, because human eyes are not. */
function luma(r: number, g: number, b: number): number {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function ImagePixelsLab({ props }: { props?: Record<string, unknown> }) {
  void props;
  const reduced = usePrefersReducedMotion();
  const [pattern, setPattern] = React.useState<Pattern>('gradient');
  const [channel, setChannel] = React.useState<Channel>('rgb');
  const [zoom, setZoom] = React.useState(16);
  const [noise, setNoise] = React.useState(10);
  const [seed, setSeed] = React.useState(3);
  const [cursor, setCursor] = React.useState({ r: 5, c: 10 });

  const data = React.useMemo(() => buildImage(pattern, noise, seed), [pattern, noise, seed]);

  /** Where the last paint put the grid, so pointer coordinates can be inverted. */
  const layout = React.useRef({ ox: 0, oy: 0, cell: 0, startR: 0, startC: 0, n: N });

  const at = React.useCallback(
    (r: number, c: number) => {
      const i = (r * N + c) * 3;
      return { r: data[i], g: data[i + 1], b: data[i + 2] };
    },
    [data],
  );

  /** What a single number looks like in the channel the learner picked. */
  const shown = React.useCallback(
    (r: number, c: number): { css: string; value: number | null } => {
      const p = at(r, c);
      if (channel === 'rgb') return { css: `rgb(${p.r} ${p.g} ${p.b})`, value: null };
      if (channel === 'gray') {
        const y = luma(p.r, p.g, p.b);
        return { css: `rgb(${y} ${y} ${y})`, value: y };
      }
      const v = channel === 'r' ? p.r : channel === 'g' ? p.g : p.b;
      // A single channel is a single number: show it as grey, not as a colour
      // wash, so brightness means magnitude and nothing else.
      return { css: `rgb(${v} ${v} ${v})`, value: v };
    },
    [at, channel],
  );

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const resolve = makeResolve();
      const line = resolve('var(--viz-grid)', 'rgba(128,128,128,0.4)');
      const axis = resolve('var(--viz-axis)', '#8a8a8a');
      const accent = resolve('hsl(var(--c-primary))', '#7c5cf5');

      const n = zoom;
      const startR = clamp(cursor.r - Math.floor(n / 2), 0, N - n);
      const startC = clamp(cursor.c - Math.floor(n / 2), 0, N - n);
      const cell = Math.floor(Math.min(w - 8, h - 8) / n);
      const ox = Math.round((w - cell * n) / 2);
      const oy = Math.round((h - cell * n) / 2);
      layout.current = { ox, oy, cell, startR, startC, n };

      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          const sr = startR + r;
          const sc = startC + c;
          const { css, value } = shown(sr, sc);
          ctx.fillStyle = css;
          ctx.fillRect(ox + c * cell, oy + r * cell, cell, cell);

          // Once a cell is big enough to hold two digits, stop drawing a
          // picture and start drawing the tensor.
          if (cell >= 30 && value !== null) {
            ctx.fillStyle = value > 140 ? '#000000' : '#ffffff';
            ctx.font = `${Math.min(13, cell / 2.6)}px ui-monospace, monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(value), ox + c * cell + cell / 2, oy + r * cell + cell / 2);
          }
        }
      }

      if (cell >= 12) {
        ctx.strokeStyle = line;
        ctx.lineWidth = 1;
        for (let k = 0; k <= n; k++) {
          ctx.beginPath();
          ctx.moveTo(ox + k * cell + 0.5, oy);
          ctx.lineTo(ox + k * cell + 0.5, oy + n * cell);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ox, oy + k * cell + 0.5);
          ctx.lineTo(ox + n * cell, oy + k * cell + 0.5);
          ctx.stroke();
        }
      }

      // The cursor cell, marked with a ring rather than a colour change so it
      // survives every channel setting.
      const cr = cursor.r - startR;
      const cc = cursor.c - startC;
      if (cr >= 0 && cr < n && cc >= 0 && cc < n) {
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(ox + cc * cell - 1, oy + cr * cell - 1, cell + 2, cell + 2);
      }

      // Axis ticks: row index down the left, column index across the top.
      ctx.fillStyle = axis;
      ctx.font = '9px ui-monospace, monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      if (cell >= 18 && ox >= 14) {
        for (let r = 0; r < n; r++) ctx.fillText(String(startR + r), ox - 3, oy + r * cell + cell / 2);
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      if (cell >= 18 && oy >= 12) {
        for (let c = 0; c < n; c++) ctx.fillText(String(startC + c), ox + c * cell + cell / 2, oy - 2);
      }
    },
    [data, channel, zoom, cursor.r, cursor.c, shown],
  );

  const pick = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { ox, oy, cell, startR, startC, n } = layout.current;
    if (cell <= 0) return;
    const c = Math.floor((clientX - rect.left - ox) / cell);
    const r = Math.floor((clientY - rect.top - oy) / cell);
    if (r < 0 || c < 0 || r >= n || c >= n) return;
    setCursor({ r: clamp(startR + r, 0, N - 1), c: clamp(startC + c, 0, N - 1) });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    const d = step[e.key];
    if (!d) return;
    e.preventDefault();
    setCursor((p) => ({ r: clamp(p.r + d[0], 0, N - 1), c: clamp(p.c + d[1], 0, N - 1) }));
  };

  const p = at(cursor.r, cursor.c);
  const y = luma(p.r, p.g, p.b);

  const neighbourhood = React.useMemo(() => {
    const rows: { r: number; cells: { c: number; value: number; rgb: string }[] }[] = [];
    for (let dr = -1; dr <= 1; dr++) {
      const r = clamp(cursor.r + dr, 0, N - 1);
      const cells: { c: number; value: number; rgb: string }[] = [];
      for (let dc = -1; dc <= 1; dc++) {
        const c = clamp(cursor.c + dc, 0, N - 1);
        const q = at(r, c);
        const value = channel === 'r' ? q.r : channel === 'g' ? q.g : channel === 'b' ? q.b : luma(q.r, q.g, q.b);
        cells.push({ c, value, rgb: `rgb(${q.r} ${q.g} ${q.b})` });
      }
      rows.push({ r, cells });
    }
    return rows;
  }, [at, cursor.r, cursor.c, channel]);

  return (
    <WidgetShell
      takeaway="Zoom far enough and the picture disappears, leaving 768 integers in a 16 × 16 × 3 block. Every convolution, every normalisation and every augmentation you will write later is arithmetic on exactly these numbers."
      readout={
        <Readout
          items={[
            { label: 'pixel', value: `[${cursor.r}, ${cursor.c}]` },
            { label: 'R', value: String(p.r) },
            { label: 'G', value: String(p.g) },
            { label: 'B', value: String(p.b) },
            { label: 'gray', value: String(y) },
            { label: 'shape', value: '(16, 16, 3) uint8' },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Picture"
            value={pattern}
            onChange={(v) => setPattern(v as Pattern)}
            options={[
              { value: 'gradient', label: 'Gradient' },
              { value: 'disc', label: 'Disc' },
              { value: 'corner', label: 'Corner' },
              { value: 'stripes', label: 'Stripes' },
            ]}
          />
          <p className="-mt-1 text-[11.5px] leading-relaxed text-subtle">{PATTERN_NOTE[pattern]}</p>
          <Toggle
            label="Channel"
            value={channel}
            onChange={(v) => setChannel(v as Channel)}
            options={[
              { value: 'rgb', label: 'All three' },
              { value: 'r', label: 'R' },
              { value: 'g', label: 'G' },
              { value: 'b', label: 'B' },
              { value: 'gray', label: 'Grayscale' },
            ]}
          />
          <Slider
            label="Zoom"
            value={zoom}
            min={4}
            max={16}
            step={4}
            onChange={(v) => setZoom(v)}
            format={(v) => `${v} × ${v} pixels shown`}
            hint={
              zoom <= 8
                ? 'Each cell now shows the stored integer. Pick a single channel to see all of them at once.'
                : 'Zoom in to 8 or 4 and the cells start printing their own values.'
            }
          />
          <Slider
            label="Sensor noise"
            value={noise}
            min={0}
            max={40}
            onChange={setNoise}
            format={(v) => `±${v}`}
            hint="Real sensors never return the same number twice. This is why models are trained with augmentation."
          />
          <Slider
            label="Noise seed"
            value={seed}
            min={1}
            max={24}
            onChange={setSeed}
            format={(v) => `#${v}`}
            hint="Same seed, same grain. Nothing here changes unless you change it."
          />
        </>
      }
    >
      <div
        className="h-64 w-full touch-none bg-surface-2 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-72"
        tabIndex={0}
        role="application"
        aria-label={`16 by 16 image, cursor on row ${cursor.r} column ${cursor.c}, red ${p.r}, green ${p.g}, blue ${p.b}. Use the arrow keys to move.`}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          e.currentTarget.focus();
          pick(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === 'mouse') pick(e.clientX, e.clientY);
        }}
      >
        <canvas ref={canvasRef} className="block" role="img" aria-label="Synthetic 16 by 16 image drawn pixel by pixel" />
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
          The 3 × 3 neighbourhood around [{cursor.r}, {cursor.c}]
          {channel === 'rgb' ? ' — switch off "All three" to read the numbers' : ` — ${channel === 'gray' ? 'gray' : channel.toUpperCase()} values`}
        </p>
        <div className="flex flex-wrap items-start gap-4">
          <table className="text-[11px]">
            <caption className="sr-only">Pixel values in the three by three neighbourhood of the cursor</caption>
            <tbody>
              {neighbourhood.map((row) => (
                <tr key={row.r}>
                  <th scope="row" className="pr-1.5 text-right font-mono font-normal text-subtle">
                    {row.r}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="p-0.5">
                      <span
                        className={cn(
                          'flex h-9 w-11 items-center justify-center rounded-[4px] border font-mono tabular-nums',
                          row.r === cursor.r && cell.c === cursor.c
                            ? 'border-primary text-ink'
                            : 'border-line text-muted',
                          reduced ? '' : 'transition-colors duration-150',
                        )}
                        style={channel === 'rgb' ? { backgroundColor: cell.rgb } : undefined}
                      >
                        {channel === 'rgb' ? '' : cell.value}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <dl className="min-w-[9rem] flex-1 space-y-1 text-[11.5px]">
            <div className="flex justify-between gap-2">
              <dt className="text-subtle">total numbers</dt>
              <dd className="font-mono tabular-nums text-muted">16 × 16 × 3 = 768</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-subtle">bytes</dt>
              <dd className="font-mono tabular-nums text-muted">768 B</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-subtle">index of this pixel</dt>
              <dd className="font-mono tabular-nums text-accent">img[{cursor.r}, {cursor.c}]</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-subtle">gray from RGB</dt>
              <dd className="font-mono tabular-nums text-muted">
                0.299·{p.r} + 0.587·{p.g} + 0.114·{p.b} = {y}
              </dd>
            </div>
          </dl>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Grayscale is a weighted sum, not an average: green carries most of the brightness a human eye perceives, blue
          almost none. A plain mean of the three channels produces a visibly wrong picture.
        </p>
      </div>
    </WidgetShell>
  );
}
