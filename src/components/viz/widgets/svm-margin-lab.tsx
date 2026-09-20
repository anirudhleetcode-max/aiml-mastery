'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * Support vector machines: the widest street, and what it costs to keep it.
 *
 * The boundary is trained here, in the browser, by a simplified SMO solver on
 * the dual problem — so the support vectors it circles are the points whose
 * α came out non-zero, not points chosen to look convincing. Delete every
 * other point and the boundary would not move by a pixel; that is the claim
 * the circles are making, and it is true.
 *
 * C is the price of a violation. Small C buys a wide margin and tolerates
 * points inside it. Large C insists on classifying the training set and will
 * bend the boundary into a narrow corridor to do it. On the overlapping
 * preset that trade is unavoidable: no line separates those classes.
 *
 * The kernel toggle is the other idea. The RBF kernel measures similarity
 * rather than coordinates, and on the rings preset it finds a circular
 * boundary that no straight line could ever approximate.
 */

interface Pt {
  x: number;
  y: number;
  label: 1 | -1;
}

type Preset = 'separable' | 'overlapping' | 'rings';
type Kernel = 'linear' | 'rbf';

const LIM = 5;
const PAD = { l: 26, r: 12, t: 12, b: 22 };
const GAMMA = 0.4;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rng: () => number): number {
  let u = 0;
  while (u === 0) u = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

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

function makeData(preset: Preset, seed: number): Pt[] {
  const rng = mulberry32(seed);
  const pts: Pt[] = [];
  const clamp = (v: number) => Math.max(-4.6, Math.min(4.6, v));
  if (preset === 'rings') {
    for (let i = 0; i < 48; i++) {
      const inner = i % 2 === 0;
      const r = inner ? 0.4 + rng() * 1.1 : 3.1 + rng() * 1.2;
      const th = rng() * Math.PI * 2;
      pts.push({ x: clamp(Math.cos(th) * r), y: clamp(Math.sin(th) * r), label: inner ? 1 : -1 });
    }
    return pts;
  }
  const spread = preset === 'separable' ? 0.8 : 1.5;
  const offset = preset === 'separable' ? 2.1 : 1.15;
  for (let i = 0; i < 44; i++) {
    const label: 1 | -1 = i % 2 === 0 ? 1 : -1;
    pts.push({
      x: clamp(label * offset + gauss(rng) * spread),
      y: clamp(label * offset * 0.55 + gauss(rng) * spread),
      label,
    });
  }
  return pts;
}

function kernelOf(a: Pt | { x: number; y: number }, b: Pt, kind: Kernel): number {
  if (kind === 'linear') return a.x * b.x + a.y * b.y;
  const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  return Math.exp(-GAMMA * d2);
}

/**
 * Simplified SMO on the soft-margin dual. Two multipliers are optimised at a
 * time under the equality constraint Σ αᵢyᵢ = 0; the partner index is chosen
 * from a seeded generator so the same inputs always give the same boundary.
 */
function trainSvm(pts: Pt[], C: number, kind: Kernel) {
  const n = pts.length;
  const K: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) row.push(kernelOf(pts[i]!, pts[j]!, kind));
    K.push(row);
  }
  const alpha = new Array<number>(n).fill(0);
  let b = 0;
  const tol = 1e-3;
  const rng = mulberry32(4242);

  const decision = (i: number) => {
    let s = b;
    for (let j = 0; j < n; j++) if (alpha[j]! > 0) s += alpha[j]! * pts[j]!.label * K[j]![i]!;
    return s;
  };

  let passes = 0;
  let guard = 0;
  while (passes < 6 && guard < 120) {
    guard += 1;
    let changed = 0;
    for (let i = 0; i < n; i++) {
      const yi = pts[i]!.label;
      const Ei = decision(i) - yi;
      if (!((yi * Ei < -tol && alpha[i]! < C) || (yi * Ei > tol && alpha[i]! > 0))) continue;
      let j = Math.floor(rng() * (n - 1));
      if (j >= i) j += 1;
      const yj = pts[j]!.label;
      const Ej = decision(j) - yj;
      const ai = alpha[i]!;
      const aj = alpha[j]!;
      const L = yi !== yj ? Math.max(0, aj - ai) : Math.max(0, ai + aj - C);
      const H = yi !== yj ? Math.min(C, C + aj - ai) : Math.min(C, ai + aj);
      if (H - L < 1e-12) continue;
      const eta = 2 * K[i]![j]! - K[i]![i]! - K[j]![j]!;
      if (eta >= -1e-12) continue;
      let ajNew = aj - (yj * (Ei - Ej)) / eta;
      ajNew = Math.min(H, Math.max(L, ajNew));
      if (Math.abs(ajNew - aj) < 1e-6) continue;
      const aiNew = ai + yi * yj * (aj - ajNew);
      const b1 = b - Ei - yi * (aiNew - ai) * K[i]![i]! - yj * (ajNew - aj) * K[i]![j]!;
      const b2 = b - Ej - yi * (aiNew - ai) * K[i]![j]! - yj * (ajNew - aj) * K[j]![j]!;
      alpha[i] = aiNew;
      alpha[j] = ajNew;
      b = aiNew > 1e-8 && aiNew < C - 1e-8 ? b1 : ajNew > 1e-8 && ajNew < C - 1e-8 ? b2 : (b1 + b2) / 2;
      changed += 1;
    }
    passes = changed === 0 ? passes + 1 : 0;
  }

  const f = (p: { x: number; y: number }) => {
    let s = b;
    for (let j = 0; j < n; j++) if (alpha[j]! > 1e-8) s += alpha[j]! * pts[j]!.label * kernelOf(p, pts[j]!, kind);
    return s;
  };

  // For a linear kernel the primal weight vector falls straight out of the αs.
  const w: [number, number] = [0, 0];
  if (kind === 'linear') {
    for (let j = 0; j < n; j++) {
      w[0] += alpha[j]! * pts[j]!.label * pts[j]!.x;
      w[1] += alpha[j]! * pts[j]!.label * pts[j]!.y;
    }
  }

  let errors = 0;
  let inside = 0;
  for (const p of pts) {
    const v = f(p);
    if (Math.sign(v) !== p.label) errors += 1;
    if (p.label * v < 1) inside += 1;
  }
  const sv = alpha.map((a, i) => ({ a, i })).filter((s) => s.a > 1e-6);

  return { alpha, b, f, w, errors, inside, sv, norm: Math.hypot(w[0], w[1]) };
}

export default function SvmMarginLab() {
  const [preset, setPreset] = React.useState<Preset>('separable');
  const [kernel, setKernel] = React.useState<Kernel>('linear');
  const [logC, setLogC] = React.useState(0);
  const [seed, setSeed] = React.useState(7);

  const C = Math.pow(10, logC);
  const points = React.useMemo(() => makeData(preset, seed), [preset, seed]);
  const model = React.useMemo(() => trainSvm(points, C, kernel), [points, C, kernel]);

  const marginWidth = kernel === 'linear' && model.norm > 1e-6 ? 2 / model.norm : NaN;

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const posC = resolve('var(--viz-cat-mastered)', '#199e70');
      const negC = resolve('var(--viz-cat-learning)', '#3987e5');
      const ink = resolve('hsl(var(--c-text))', '#eee');
      const warnC = resolve('var(--viz-cat-review)', '#d95926');

      const X = (v: number) => PAD.l + ((v + LIM) / (2 * LIM)) * plotW;
      const Y = (v: number) => PAD.t + plotH - ((v + LIM) / (2 * LIM)) * plotH;

      // Decision values on a grid: cheap, and it works for any kernel.
      const cell = 6;
      const cols = Math.ceil(plotW / cell);
      const rows = Math.ceil(plotH / cell);
      const vals: number[] = new Array(cols * rows);
      for (let ci = 0; ci < cols; ci++) {
        for (let ri = 0; ri < rows; ri++) {
          const dx = ((ci * cell + cell / 2) / plotW) * 2 * LIM - LIM;
          const dy = LIM - ((ri * cell + cell / 2) / plotH) * 2 * LIM;
          vals[ri * cols + ci] = model.f({ x: dx, y: dy });
        }
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(PAD.l, PAD.t, plotW, plotH);
      ctx.clip();
      for (let ci = 0; ci < cols; ci++) {
        for (let ri = 0; ri < rows; ri++) {
          const v = vals[ri * cols + ci]!;
          ctx.fillStyle = v >= 0 ? posC : negC;
          ctx.globalAlpha = Math.abs(v) < 1 ? 0.05 : 0.16;
          ctx.fillRect(PAD.l + ci * cell, PAD.t + ri * cell, cell, cell);
        }
      }
      // Contours: cells where the sign of f, f−1 or f+1 flips against a neighbour.
      const flip = (a: number, b: number) => (a >= 0) !== (b >= 0);
      for (let ci = 0; ci < cols - 1; ci++) {
        for (let ri = 0; ri < rows - 1; ri++) {
          const v = vals[ri * cols + ci]!;
          const vr = vals[ri * cols + ci + 1]!;
          const vd = vals[(ri + 1) * cols + ci]!;
          const draw = (colour: string, alpha: number, size: number) => {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = colour;
            ctx.fillRect(PAD.l + ci * cell, PAD.t + ri * cell, size, size);
          };
          if (flip(v, vr) || flip(v, vd)) draw(ink, 0.95, cell);
          else if (flip(v - 1, vr - 1) || flip(v - 1, vd - 1) || flip(v + 1, vr + 1) || flip(v + 1, vd + 1))
            draw(axis, 0.8, cell);
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);

      const svSet = new Set(model.sv.map((s) => s.i));
      for (let i = 0; i < points.length; i++) {
        const p = points[i]!;
        const px = X(p.x);
        const py = Y(p.y);
        const wrong = Math.sign(model.f(p)) !== p.label;
        ctx.fillStyle = p.label === 1 ? posC : negC;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1.2;
        if (p.label === 1) {
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(px - 3.4, py - 3.4, 6.8, 6.8);
        }
        if (svSet.has(i)) {
          // Circled: this point has a non-zero α and is holding the boundary up.
          ctx.strokeStyle = ink;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (wrong) {
          ctx.strokeStyle = warnC;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(px - 5, py - 5);
          ctx.lineTo(px + 5, py + 5);
          ctx.moveTo(px + 5, py - 5);
          ctx.lineTo(px - 5, py + 5);
          ctx.stroke();
        }
      }

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(kernel === 'linear' ? 'boundary: w·x + b = 0' : 'boundary: Σ αᵢyᵢK(xᵢ, x) + b = 0', PAD.l + 5, PAD.t + 12);
      ctx.fillText('faint band: the margin, |f| < 1', PAD.l + 5, PAD.t + 24);
    },
    [points, model, kernel],
  );

  return (
    <WidgetShell
      takeaway="Only the circled points have a non-zero α — those are the support vectors, and they alone define the boundary. Push C up and the margin narrows to swallow the errors; pull it down and the street widens until points are allowed to stand in it."
      readout={
        <Readout
          items={[
            { label: 'C', value: C < 1 ? C.toFixed(2) : C.toFixed(1) },
            { label: 'Support vectors', value: `${model.sv.length} of ${points.length}` },
            { label: 'Margin width', value: Number.isNaN(marginWidth) ? 'n/a (RBF)' : marginWidth.toFixed(2) },
            { label: 'Inside the margin', value: String(model.inside) },
            {
              label: 'Training errors',
              value: String(model.errors),
              tone: model.errors === 0 ? 'good' : model.errors > points.length * 0.15 ? 'bad' : 'warn',
            },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="C (cost of a violation)"
            value={logC}
            min={-2}
            max={2}
            step={0.1}
            onChange={setLogC}
            format={(v) => `10^${v.toFixed(1)} = ${Math.pow(10, v) < 1 ? Math.pow(10, v).toFixed(2) : Math.pow(10, v).toFixed(1)}`}
            hint="Low C: a wide margin, some points allowed inside it. High C: the training set must be classified, whatever the margin costs."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Toggle
              label="Data"
              value={preset}
              onChange={(v) => setPreset(v as Preset)}
              options={[
                { value: 'separable', label: 'Separable' },
                { value: 'overlapping', label: 'Overlapping' },
                { value: 'rings', label: 'Rings' },
              ]}
            />
            <Toggle
              label="Kernel"
              value={kernel}
              onChange={(v) => setKernel(v as Kernel)}
              options={[
                { value: 'linear', label: 'Linear' },
                { value: 'rbf', label: 'RBF' },
              ]}
            />
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New data
            </button>
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            {preset === 'rings'
              ? kernel === 'linear'
                ? 'A straight line cannot enclose the inner ring; every C setting is a different way of being wrong. Switch to RBF.'
                : `RBF with γ = ${GAMMA}: similarity falls off with distance, and the boundary closes around the inner ring.`
              : preset === 'overlapping'
                ? 'These classes genuinely overlap, so some training error is the correct answer. C decides how much.'
                : 'Cleanly separable: at high C the margin touches the closest points on each side and nothing else matters.'}
          </p>
        </>
      }
    >
      <div className="h-72 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`Two classes with a trained support vector machine boundary. ${model.sv.length} support vectors, ${model.errors} training errors at C = ${C.toFixed(2)}.`}
        />
      </div>
      <p className="border-t border-line px-4 py-2 text-[11.5px] leading-relaxed text-subtle">
        Circles are class +1, squares class −1. A ring marks a support vector; a cross marks a point on the wrong side
        of the boundary. The solver is simplified SMO, run to convergence on every change.
      </p>
    </WidgetShell>
  );
}
