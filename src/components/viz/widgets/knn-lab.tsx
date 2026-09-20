'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * K-nearest neighbours, with the thing that actually breaks it in production.
 *
 * The query point is draggable, the ring is the neighbourhood, and the tally
 * underneath is the entire algorithm — there is no training, only counting.
 *
 * The scaling toggle is the reason this lab exists. Feature x₂ is recorded in
 * a unit twenty times finer than x₁, which is an ordinary thing for a dataset
 * to do (grams against kilograms, rupees against thousands). Nothing about
 * the data changes, yet the neighbourhood collapses into a flat band that
 * ignores x₁ entirely and the prediction flips. The ring is drawn as the real
 * unit ball of the metric in use, so a stretched axis or a Manhattan distance
 * changes its shape rather than just its size.
 */

interface Pt {
  x: number;
  y: number;
  label: 0 | 1;
}

const LIM = 5;
const PAD = { l: 28, r: 12, t: 12, b: 24 };
/** How badly the second feature is scaled when the learner turns scaling off. */
const RAW_STRETCH = 20;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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

function makeData(seed: number): Pt[] {
  const rng = mulberry32(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < 40; i++) {
    const label: 0 | 1 = i % 2 === 0 ? 1 : 0;
    // The classes differ in x₁ only. x₂ is pure spread — informative about
    // nothing, which is what makes its scale so destructive.
    const x = (label === 1 ? 1.6 : -1.6) + (rng() - 0.5) * 1.8;
    const y = (rng() - 0.5) * 8.4;
    pts.push({ x: Math.max(-4.8, Math.min(4.8, x)), y: Math.max(-4.6, Math.min(4.6, y)), label });
  }
  return pts;
}

export default function KnnLab() {
  const [seed, setSeed] = React.useState(9);
  const [k, setK] = React.useState(5);
  const [metric, setMetric] = React.useState<'euclidean' | 'manhattan'>('euclidean');
  const [scaling, setScaling] = React.useState<'scaled' | 'raw'>('scaled');
  const [query, setQuery] = React.useState({ x: 0.4, y: 0.6 });
  const [dragging, setDragging] = React.useState(false);

  const points = React.useMemo(() => makeData(seed), [seed]);
  const sx = 1;
  const sy = scaling === 'raw' ? RAW_STRETCH : 1;

  const dist = React.useCallback(
    (a: { x: number; y: number }, b: { x: number; y: number }) => {
      const dx = (a.x - b.x) * sx;
      const dy = (a.y - b.y) * sy;
      return metric === 'euclidean' ? Math.hypot(dx, dy) : Math.abs(dx) + Math.abs(dy);
    },
    [metric, sx, sy],
  );

  const neighbours = React.useMemo(() => {
    const ranked = points
      .map((p, i) => ({ i, d: dist(query, p), label: p.label }))
      .sort((a, b) => a.d - b.d);
    return ranked.slice(0, k);
  }, [points, query, k, dist]);

  const votes = React.useMemo(() => {
    let one = 0;
    for (const n of neighbours) if (n.label === 1) one += 1;
    return { one, zero: neighbours.length - one };
  }, [neighbours]);

  const tie = votes.one === votes.zero;
  // A tie is broken by the closest neighbour — the honest fallback, and the
  // reason an odd k is the usual advice for two classes.
  const prediction: 0 | 1 = tie ? (neighbours[0]?.label ?? 1) : votes.one > votes.zero ? 1 : 0;
  const radius = neighbours.length > 0 ? neighbours[neighbours.length - 1]!.d : 0;

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const cls1 = resolve('var(--viz-cat-mastered)', '#199e70');
      const cls0 = resolve('var(--viz-cat-learning)', '#3987e5');
      const ink = resolve('hsl(var(--c-text))', '#eee');
      const accent = resolve('var(--viz-series)', '#8164f7');

      const X = (v: number) => PAD.l + ((v + LIM) / (2 * LIM)) * plotW;
      const Y = (v: number) => PAD.t + plotH - ((v + LIM) / (2 * LIM)) * plotH;
      const ux = plotW / (2 * LIM);
      const uy = plotH / (2 * LIM);

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(PAD.l + (plotW / 4) * i, PAD.t);
        ctx.lineTo(PAD.l + (plotW / 4) * i, PAD.t + plotH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(PAD.l, PAD.t + (plotH / 4) * i);
        ctx.lineTo(PAD.l + plotW, PAD.t + (plotH / 4) * i);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.strokeStyle = grid;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);

      // The neighbourhood: the exact set of points within `radius` under the
      // metric in force, drawn in data space so a stretched axis flattens it.
      ctx.save();
      ctx.beginPath();
      ctx.rect(PAD.l, PAD.t, plotW, plotH);
      ctx.clip();
      const rx = (radius / sx) * ux;
      const ry = (radius / sy) * uy;
      const qx = X(query.x);
      const qy = Y(query.y);
      ctx.beginPath();
      if (metric === 'euclidean') {
        ctx.ellipse(qx, qy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
      } else {
        ctx.moveTo(qx - rx, qy);
        ctx.lineTo(qx, qy - ry);
        ctx.lineTo(qx + rx, qy);
        ctx.lineTo(qx, qy + ry);
        ctx.closePath();
      }
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = accent;
      ctx.fill();
      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.75;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Spokes to the chosen neighbours.
      const chosen = new Set(neighbours.map((n) => n.i));
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      for (const n of neighbours) {
        const p = points[n.i]!;
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(X(p.x), Y(p.y));
        ctx.stroke();
      }
      ctx.restore();

      for (let i = 0; i < points.length; i++) {
        const p = points[i]!;
        const px = X(p.x);
        const py = Y(p.y);
        const inSet = chosen.has(i);
        ctx.globalAlpha = inSet ? 1 : 0.4;
        ctx.fillStyle = p.label === 1 ? cls1 : cls0;
        ctx.strokeStyle = ink;
        ctx.lineWidth = inSet ? 2 : 0;
        if (p.label === 1) {
          ctx.beginPath();
          ctx.arc(px, py, inSet ? 5.5 : 4, 0, Math.PI * 2);
          ctx.fill();
          if (inSet) ctx.stroke();
        } else {
          const s = inSet ? 5 : 3.6;
          ctx.fillRect(px - s, py - s, s * 2, s * 2);
          if (inSet) ctx.strokeRect(px - s, py - s, s * 2, s * 2);
        }
        ctx.globalAlpha = 1;
      }

      // Query point: a cross, so it is never confused with the data.
      ctx.strokeStyle = ink;
      ctx.lineWidth = dragging ? 3 : 2.25;
      ctx.beginPath();
      ctx.moveTo(qx - 7, qy);
      ctx.lineTo(qx + 7, qy);
      ctx.moveTo(qx, qy - 7);
      ctx.lineTo(qx, qy + 7);
      ctx.stroke();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('x₁', PAD.l + plotW / 2, h - 8);
      ctx.save();
      ctx.translate(10, PAD.t + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('x₂', 0, 0);
      ctx.restore();
    },
    [points, neighbours, query.x, query.y, radius, metric, sx, sy, dragging],
  );

  const toData = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const plotW = rect.width - PAD.l - PAD.r;
    const plotH = rect.height - PAD.t - PAD.b;
    const x = ((e.clientX - rect.left - PAD.l) / Math.max(1, plotW)) * 2 * LIM - LIM;
    const y = LIM - ((e.clientY - rect.top - PAD.t) / Math.max(1, plotH)) * 2 * LIM;
    return { x: Math.max(-LIM, Math.min(LIM, x)), y: Math.max(-LIM, Math.min(LIM, y)) };
  };

  const share = neighbours.length ? votes.one / neighbours.length : 0;

  return (
    <WidgetShell
      takeaway="KNN has no parameters to learn — only a distance. Switch scaling off and x₂, which separates nothing, is measured in a unit twenty times finer; it swallows the distance, the neighbourhood flattens into a band, and the same query gets a different answer."
      readout={
        <Readout
          items={[
            { label: 'Prediction', value: prediction === 1 ? 'Class A' : 'Class B', tone: prediction === 1 ? 'good' : 'default' },
            { label: 'Votes', value: `${votes.one} A / ${votes.zero} B${tie ? ' (tie)' : ''}`, tone: tie ? 'warn' : 'default' },
            { label: 'Confidence', value: `${(Math.max(share, 1 - share) * 100).toFixed(0)}%` },
            { label: `${k}th distance`, value: radius.toFixed(2) },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Neighbours (k)"
            value={k}
            min={1}
            max={15}
            step={1}
            onChange={setK}
            format={(v) => String(v)}
            hint="k = 1 follows every stray point; large k smooths the boundary until it stops responding to where the query actually is."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Toggle
              label="Distance"
              value={metric}
              onChange={(v) => setMetric(v as 'euclidean' | 'manhattan')}
              options={[
                { value: 'euclidean', label: 'Euclidean' },
                { value: 'manhattan', label: 'Manhattan' },
              ]}
            />
            <Toggle
              label="Feature scaling"
              value={scaling}
              onChange={(v) => setScaling(v as 'scaled' | 'raw')}
              options={[
                { value: 'scaled', label: 'Standardised' },
                { value: 'raw', label: `Raw units (x₂ ×${RAW_STRETCH})` },
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
            Distance in force:{' '}
            <span className="font-mono text-accent">
              {metric === 'euclidean'
                ? `√( Δx₁² + (${sy}·Δx₂)² )`
                : `|Δx₁| + |${sy}·Δx₂|`}
            </span>
            . The dashed outline is every location exactly that far from the query.
          </p>
        </>
      }
    >
      <div className="h-72 w-full">
        <canvas
          ref={canvasRef}
          className="block touch-none"
          role="img"
          aria-label={`Labelled points with a query point at x₁ ${query.x.toFixed(1)}, x₂ ${query.y.toFixed(1)}. Its ${k} nearest neighbours are ${votes.one} of class A and ${votes.zero} of class B, so the prediction is class ${prediction === 1 ? 'A' : 'B'}.`}
          onPointerDown={(e) => {
            setQuery(toData(e));
            setDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (dragging) setQuery(toData(e));
          }}
          onPointerUp={(e) => {
            setDragging(false);
            if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          }}
          onPointerCancel={() => setDragging(false)}
        />
      </div>
      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">The vote</p>
        <div className="space-y-1.5">
          {[
            { name: 'Class A (circles)', n: votes.one, cls: 'bg-viz-mastered' },
            { name: 'Class B (squares)', n: votes.zero, cls: 'bg-viz-learning' },
          ].map((row) => (
            <div key={row.name} className="flex items-center gap-2">
              <span className="w-32 shrink-0 text-[11.5px] text-muted">{row.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                <div
                  className={`h-full rounded-full ${row.cls}`}
                  style={{ width: `${neighbours.length ? (row.n / neighbours.length) * 100 : 0}%` }}
                />
              </div>
              <span className="w-6 text-right font-mono text-[12px] tabular-nums text-ink">{row.n}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Drag anywhere on the plot to move the query. Nothing was trained: the answer is recomputed from all{' '}
          {points.length} stored points every time you move, which is why KNN is cheap to fit and expensive to serve.
        </p>
      </div>
    </WidgetShell>
  );
}
