'use client';

import * as React from 'react';
import { Readout, Slider, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Logistic regression, split into its two halves.
 *
 * On the left is the plane: a straight boundary where z = w₁x + w₂y + b is
 * zero, with the shading showing the predicted probability of class 1. The
 * shading is one hue at varying opacity on purpose — probability is a single
 * quantity, and giving each side its own colour would suggest two.
 *
 * On the right is the squashing function that turns that z into the
 * probability. Drag the hollow probe point on the plane and watch its z slide
 * along the sigmoid: everything logistic regression does is "measure a signed
 * distance from a line, then squash it".
 *
 * Turning ‖w‖ up steepens the sigmoid, which narrows the band of genuine
 * uncertainty (the dashed 0.25 and 0.75 lines) without moving the boundary at
 * all. That is the difference between where the model splits and how sure it
 * claims to be.
 */

interface Pt {
  x: number;
  y: number;
  label: 0 | 1;
}

const LIM = 5;
const PAD = { l: 30, r: 12, t: 12, b: 24 };

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

function sigmoid(z: number): number {
  return z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
}

function makeData(seed: number, overlap: number): Pt[] {
  const rng = mulberry32(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < 44; i++) {
    const label: 0 | 1 = i % 2 === 0 ? 1 : 0;
    const cx = label === 1 ? 1.7 : -1.7;
    const cy = label === 1 ? 1.5 : -1.5;
    const x = cx + gauss(rng) * overlap;
    const y = cy + gauss(rng) * overlap;
    pts.push({
      x: Math.max(-LIM + 0.2, Math.min(LIM - 0.2, x)),
      y: Math.max(-LIM + 0.2, Math.min(LIM - 0.2, y)),
      label,
    });
  }
  return pts;
}

/** Batch gradient descent on the logistic loss, run on standardised features. */
function trainLogistic(pts: Pt[]): { w1: number; w2: number; b: number } {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  const sx = Math.sqrt(pts.reduce((s, p) => s + (p.x - mx) ** 2, 0) / n) || 1;
  const sy = Math.sqrt(pts.reduce((s, p) => s + (p.y - my) ** 2, 0) / n) || 1;

  let a1 = 0;
  let a2 = 0;
  let c = 0;
  const lr = 0.4;
  // A whisper of L2 keeps the weights finite when the classes separate
  // perfectly — otherwise the optimum is at infinity.
  const l2 = 0.004;
  for (let it = 0; it < 500; it++) {
    let g1 = 0;
    let g2 = 0;
    let gb = 0;
    for (const p of pts) {
      const zx = (p.x - mx) / sx;
      const zy = (p.y - my) / sy;
      const err = sigmoid(a1 * zx + a2 * zy + c) - p.label;
      g1 += err * zx;
      g2 += err * zy;
      gb += err;
    }
    a1 -= lr * (g1 / n + l2 * a1);
    a2 -= lr * (g2 / n + l2 * a2);
    c -= lr * (gb / n);
  }
  // Undo the standardisation so the numbers mean something in the plot's units.
  const w1 = a1 / sx;
  const w2 = a2 / sy;
  const b = c - (a1 * mx) / sx - (a2 * my) / sy;
  return { w1, w2, b };
}

export default function LogisticBoundaryLab() {
  const reduced = usePrefersReducedMotion();
  const [seed, setSeed] = React.useState(3);
  const [overlap, setOverlap] = React.useState(1.1);
  const [w1, setW1] = React.useState(0.9);
  const [w2, setW2] = React.useState(0.2);
  const [b, setB] = React.useState(-0.4);
  const [probe, setProbe] = React.useState({ x: 1.2, y: -1.8 });
  const [dragging, setDragging] = React.useState(false);

  const points = React.useMemo(() => makeData(seed, overlap), [seed, overlap]);

  const stats = React.useMemo(() => {
    let correct = 0;
    let ll = 0;
    for (const p of points) {
      const pr = sigmoid(w1 * p.x + w2 * p.y + b);
      if ((pr >= 0.5 ? 1 : 0) === p.label) correct += 1;
      const clamped = Math.min(1 - 1e-9, Math.max(1e-9, pr));
      ll += -(p.label * Math.log(clamped) + (1 - p.label) * Math.log(1 - clamped));
    }
    return { acc: correct / points.length, logloss: ll / points.length, norm: Math.hypot(w1, w2) };
  }, [points, w1, w2, b]);

  const probeZ = w1 * probe.x + w2 * probe.y + b;
  const probeP = sigmoid(probeZ);

  const rafRef = React.useRef(0);
  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const train = React.useCallback(() => {
    const t = trainLogistic(points);
    const target = {
      w1: Math.max(-3, Math.min(3, Math.round(t.w1 * 100) / 100)),
      w2: Math.max(-3, Math.min(3, Math.round(t.w2 * 100) / 100)),
      b: Math.max(-6, Math.min(6, Math.round(t.b * 100) / 100)),
    };
    if (reduced) {
      setW1(target.w1);
      setW2(target.w2);
      setB(target.b);
      return;
    }
    cancelAnimationFrame(rafRef.current);
    const from = { w1, w2, b };
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 520);
      const e = 1 - Math.pow(1 - k, 3);
      setW1(Math.round((from.w1 + (target.w1 - from.w1) * e) * 100) / 100);
      setW2(Math.round((from.w2 + (target.w2 - from.w2) * e) * 100) / 100);
      setB(Math.round((from.b + (target.b - from.b) * e) * 100) / 100);
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [points, reduced, w1, w2, b]);

  const { canvasRef: planeRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const series = resolve('var(--viz-series)', '#8164f7');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const cls1 = resolve('var(--viz-cat-mastered)', '#199e70');
      const cls0 = resolve('var(--viz-cat-learning)', '#3987e5');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      const X = (v: number) => PAD.l + ((v + LIM) / (2 * LIM)) * plotW;
      const Y = (v: number) => PAD.t + plotH - ((v + LIM) / (2 * LIM)) * plotH;

      // Probability field: one hue, opacity carries the number.
      const cell = 10;
      ctx.save();
      ctx.fillStyle = series;
      for (let px = PAD.l; px < PAD.l + plotW; px += cell) {
        for (let py = PAD.t; py < PAD.t + plotH; py += cell) {
          const dx = ((px + cell / 2 - PAD.l) / plotW) * 2 * LIM - LIM;
          const dy = LIM - ((py + cell / 2 - PAD.t) / plotH) * 2 * LIM;
          const p = sigmoid(w1 * dx + w2 * dy + b);
          ctx.globalAlpha = p * 0.5;
          ctx.fillRect(px, py, Math.min(cell, PAD.l + plotW - px), Math.min(cell, PAD.t + plotH - py));
        }
      }
      ctx.restore();

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);

      // Boundary (p = 0.5) and the two edges of genuine uncertainty.
      const drawLevel = (target: number, dash: number[], width: number) => {
        // w1·x + w2·y + b = target, drawn across the visible square.
        ctx.setLineDash(dash);
        ctx.lineWidth = width;
        ctx.beginPath();
        if (Math.abs(w2) > Math.abs(w1)) {
          const yAt = (x: number) => (target - b - w1 * x) / w2;
          ctx.moveTo(X(-LIM), Y(yAt(-LIM)));
          ctx.lineTo(X(LIM), Y(yAt(LIM)));
        } else if (Math.abs(w1) > 1e-6) {
          const xAt = (y: number) => (target - b - w2 * y) / w1;
          ctx.moveTo(X(xAt(-LIM)), Y(-LIM));
          ctx.lineTo(X(xAt(LIM)), Y(LIM));
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };

      ctx.save();
      ctx.beginPath();
      ctx.rect(PAD.l, PAD.t, plotW, plotH);
      ctx.clip();
      ctx.strokeStyle = axis;
      drawLevel(Math.log(0.75 / 0.25), [4, 4], 1);
      drawLevel(-Math.log(0.75 / 0.25), [4, 4], 1);
      ctx.strokeStyle = ink;
      drawLevel(0, [], 2.5);
      ctx.restore();

      // Points: colour *and* shape, so the classes survive a greyscale print.
      for (const p of points) {
        const px = X(p.x);
        const py = Y(p.y);
        const pred = sigmoid(w1 * p.x + w2 * p.y + b) >= 0.5 ? 1 : 0;
        ctx.lineWidth = 1.5;
        ctx.fillStyle = p.label === 1 ? cls1 : cls0;
        ctx.strokeStyle = pred === p.label ? resolve('var(--viz-seq-0)', '#111') : resolve('var(--viz-cat-review)', '#d95926');
        if (p.label === 1) {
          ctx.beginPath();
          ctx.arc(px, py, 4.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillRect(px - 3.6, py - 3.6, 7.2, 7.2);
          ctx.strokeRect(px - 3.6, py - 3.6, 7.2, 7.2);
        }
      }

      // The probe.
      ctx.beginPath();
      ctx.arc(X(probe.x), Y(probe.y), dragging ? 9 : 7.5, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = ink;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(X(probe.x), Y(probe.y), 2, 0, Math.PI * 2);
      ctx.fillStyle = ink;
      ctx.fill();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('p = 0.25', PAD.l + 4, PAD.t + plotH - 5);
      ctx.textAlign = 'right';
      ctx.fillText('p = 0.75', PAD.l + plotW - 4, PAD.t + 12);
    },
    [points, w1, w2, b, probe.x, probe.y, dragging],
  );

  const { canvasRef: sigRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 30, r: 10, t: 12, b: 24 };
      const plotW = w - pad.l - pad.r;
      const plotH = h - pad.t - pad.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const series = resolve('var(--viz-series)', '#8164f7');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      const ZL = 8;
      const X = (z: number) => pad.l + ((z + ZL) / (2 * ZL)) * plotW;
      const Y = (p: number) => pad.t + plotH - p * plotH;

      ctx.strokeStyle = grid;
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.l, Y(0.5));
      ctx.lineTo(pad.l + plotW, Y(0.5));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(X(0), pad.t);
      ctx.lineTo(X(0), pad.t + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = series;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const z = -ZL + ((2 * ZL) / 120) * i;
        const py = Y(sigmoid(z));
        if (i === 0) ctx.moveTo(X(z), py);
        else ctx.lineTo(X(z), py);
      }
      ctx.stroke();

      const z = Math.max(-ZL, Math.min(ZL, probeZ));
      ctx.strokeStyle = ink;
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(X(z), pad.t + plotH);
      ctx.lineTo(X(z), Y(sigmoid(z)));
      ctx.lineTo(pad.l, Y(sigmoid(z)));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(X(z), Y(sigmoid(z)), 4.5, 0, Math.PI * 2);
      ctx.fillStyle = ink;
      ctx.fill();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('1.0', pad.l - 4, pad.t + 8);
      ctx.fillText('0.5', pad.l - 4, Y(0.5) + 3);
      ctx.fillText('0.0', pad.l - 4, pad.t + plotH + 3);
      ctx.textAlign = 'center';
      ctx.fillText('z = w₁x + w₂y + b', pad.l + plotW / 2, h - 8);
    },
    [probeZ],
  );

  const movePropose = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const plotW = rect.width - PAD.l - PAD.r;
    const plotH = rect.height - PAD.t - PAD.b;
    const x = ((e.clientX - rect.left - PAD.l) / Math.max(1, plotW)) * 2 * LIM - LIM;
    const y = LIM - ((e.clientY - rect.top - PAD.t) / Math.max(1, plotH)) * 2 * LIM;
    return { x: Math.max(-LIM, Math.min(LIM, x)), y: Math.max(-LIM, Math.min(LIM, y)) };
  };

  return (
    <WidgetShell
      takeaway="The boundary is where z = 0 — nothing more than a straight line. Scaling w₁ and w₂ up leaves that line exactly where it was but squeezes the uncertain band around it, so the model keeps the same decisions and becomes far more confident about them."
      readout={
        <Readout
          items={[
            { label: 'Accuracy', value: `${(stats.acc * 100).toFixed(1)}%`, tone: stats.acc > 0.9 ? 'good' : stats.acc < 0.7 ? 'bad' : 'default' },
            { label: 'Log loss', value: stats.logloss.toFixed(3), tone: stats.logloss < 0.35 ? 'good' : stats.logloss > 1 ? 'bad' : 'default' },
            { label: 'Probe z', value: probeZ.toFixed(2) },
            { label: 'Probe p', value: probeP.toFixed(3) },
            { label: '‖w‖', value: stats.norm.toFixed(2) },
          ]}
        />
      }
      controls={
        <>
          <Slider label="Weight w₁ (on x)" value={w1} min={-3} max={3} step={0.05} onChange={setW1} format={(v) => v.toFixed(2)} />
          <Slider label="Weight w₂ (on y)" value={w2} min={-3} max={3} step={0.05} onChange={setW2} format={(v) => v.toFixed(2)} />
          <Slider label="Bias b" value={b} min={-6} max={6} step={0.05} onChange={setB} format={(v) => v.toFixed(2)} />
          <Slider
            label="Class overlap (σ)"
            value={overlap}
            min={0.4}
            max={2.2}
            step={0.1}
            onChange={setOverlap}
            format={(v) => v.toFixed(1)}
            hint="Past about σ = 1.6 no straight line can separate them, and log loss stops going near zero however you turn the weights."
          />
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={train}
              className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-[12px] font-medium text-primary transition-colors hover:bg-primary/20"
            >
              Train it for me
            </button>
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New data
            </button>
            <span className="text-[11.5px] text-subtle">500 steps of gradient descent on the log loss.</span>
          </div>
        </>
      }
    >
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="h-64 w-full sm:col-span-2">
          <canvas
            ref={planeRef}
            className="block touch-none"
            role="img"
            aria-label={`Two classes of points with a straight decision boundary. Accuracy ${(stats.acc * 100).toFixed(0)} percent, log loss ${stats.logloss.toFixed(2)}. Shading opacity is the predicted probability of class 1.`}
            onPointerDown={(e) => {
              setProbe(movePropose(e));
              setDragging(true);
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (dragging) setProbe(movePropose(e));
            }}
            onPointerUp={(e) => {
              setDragging(false);
              if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerCancel={() => setDragging(false)}
          />
        </div>
        <div className="h-44 w-full sm:h-64">
          <canvas
            ref={sigRef}
            className="block"
            role="img"
            aria-label={`The sigmoid function, with the probe's z of ${probeZ.toFixed(2)} mapped to a probability of ${probeP.toFixed(2)}.`}
          />
        </div>
      </div>
      <p className="border-t border-line px-4 py-2 text-[11.5px] leading-relaxed text-subtle">
        Circles are class 1, squares are class 0; an orange outline marks a point the model currently gets wrong. Tap
        or drag anywhere on the plane to move the hollow probe and read its z off the sigmoid.
      </p>
    </WidgetShell>
  );
}
