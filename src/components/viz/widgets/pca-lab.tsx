'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * Principal components on a correlated cloud.
 *
 * PCA is a rotation: it looks for the direction along which the data varies
 * most, calls it PC1, and puts PC2 at right angles to it. The arrows are
 * drawn two standard deviations long, so their lengths *are* the square roots
 * of the eigenvalues, and the explained-variance bars are those eigenvalues
 * normalised.
 *
 * Both axes share one scale. That is deliberate: without it, the plot would
 * silently standardise the picture and hide the lesson of the standardise
 * toggle. In raw units x₂ is recorded in a unit that makes its numbers eight
 * times larger, PC1 swings round to point almost straight up, and PCA reports
 * that one component explains 99% of the variance — a statement about the
 * choice of units, not about the data.
 *
 * The projection slider collapses every point onto PC1. What is left over at
 * t = 1 is exactly the variance PC2 was carrying.
 */

interface Pt {
  x: number;
  y: number;
}

const PAD = { l: 26, r: 14, t: 14, b: 24 };
/** How much larger feature 2's unit is before standardising. */
const UNIT_GAP = 8;

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

function makeData(seed: number, rho: number): Pt[] {
  const rng = mulberry32(seed);
  const out: Pt[] = [];
  for (let i = 0; i < 90; i++) {
    const z1 = gauss(rng);
    const z2 = gauss(rng);
    const a = z1;
    const b = rho * z1 + Math.sqrt(Math.max(0, 1 - rho * rho)) * z2;
    // x₂ carries the same information but is written in a coarser unit.
    out.push({ x: a * 1.1, y: b * 1.1 * UNIT_GAP });
  }
  return out;
}

/** Closed-form eigendecomposition of a symmetric 2×2 covariance matrix. */
function pca(pts: Pt[]) {
  const n = pts.length || 1;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  for (const p of pts) {
    sxx += (p.x - mx) ** 2;
    syy += (p.y - my) ** 2;
    sxy += (p.x - mx) * (p.y - my);
  }
  sxx /= n - 1;
  syy /= n - 1;
  sxy /= n - 1;

  const mid = (sxx + syy) / 2;
  const diff = Math.sqrt(((sxx - syy) / 2) ** 2 + sxy * sxy);
  const l1 = mid + diff;
  const l2 = Math.max(0, mid - diff);

  let v1: [number, number];
  if (Math.abs(sxy) > 1e-12) {
    const vx = sxy;
    const vy = l1 - sxx;
    const m = Math.hypot(vx, vy) || 1;
    v1 = [vx / m, vy / m];
  } else {
    v1 = sxx >= syy ? [1, 0] : [0, 1];
  }
  const v2: [number, number] = [-v1[1], v1[0]];
  const corr = sxx * syy > 0 ? sxy / Math.sqrt(sxx * syy) : 0;
  return { mx, my, sxx, syy, sxy, l1, l2, v1, v2, corr };
}

export default function PcaLab() {
  const [seed, setSeed] = React.useState(13);
  const [rho, setRho] = React.useState(0.82);
  const [standardise, setStandardise] = React.useState<'raw' | 'z'>('raw');
  const [t, setT] = React.useState(0);

  const raw = React.useMemo(() => makeData(seed, rho), [seed, rho]);

  // Standardising is one line: subtract the mean, divide by the standard
  // deviation, per feature. Everything downstream is unchanged.
  const working = React.useMemo(() => {
    if (standardise === 'raw') return raw;
    const base = pca(raw);
    const sx = Math.sqrt(base.sxx) || 1;
    const sy = Math.sqrt(base.syy) || 1;
    return raw.map((p) => ({ x: (p.x - base.mx) / sx, y: (p.y - base.my) / sy }));
  }, [raw, standardise]);

  const P = React.useMemo(() => pca(working), [working]);
  const total = P.l1 + P.l2 || 1;
  const evr1 = P.l1 / total;
  const evr2 = P.l2 / total;
  const angle = (Math.atan2(P.v1[1], P.v1[0]) * 180) / Math.PI;

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const pc1c = resolve('var(--viz-series)', '#8164f7');
      const pc2c = resolve('var(--viz-cat-review)', '#d95926');
      const dot = resolve('var(--viz-cat-learning)', '#3987e5');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      // One shared scale for both axes, so a difference in units is visible
      // as a difference in spread rather than being quietly normalised away.
      let span = 0;
      for (const p of working) span = Math.max(span, Math.abs(p.x - P.mx), Math.abs(p.y - P.my));
      span = Math.max(span * 1.15, 1e-6);
      const scale = Math.min(plotW, plotH) / (2 * span);
      const cx = PAD.l + plotW / 2;
      const cy = PAD.t + plotH / 2;
      const X = (v: number) => cx + (v - P.mx) * scale;
      const Y = (v: number) => cy - (v - P.my) * scale;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(PAD.l, cy);
      ctx.lineTo(PAD.l + plotW, cy);
      ctx.moveTo(cx, PAD.t);
      ctx.lineTo(cx, PAD.t + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.save();
      ctx.beginPath();
      ctx.rect(PAD.l, PAD.t, plotW, plotH);
      ctx.clip();

      // Points, with each one's slide toward its PC1 projection.
      for (const p of working) {
        const dx = p.x - P.mx;
        const dy = p.y - P.my;
        const s = dx * P.v1[0] + dy * P.v1[1];
        const projX = P.mx + s * P.v1[0];
        const projY = P.my + s * P.v1[1];
        const px = p.x + (projX - p.x) * t;
        const py = p.y + (projY - p.y) * t;
        if (t > 0.02 && t < 0.999) {
          ctx.strokeStyle = axis;
          ctx.globalAlpha = 0.35;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(X(p.x), Y(p.y));
          ctx.lineTo(X(px), Y(py));
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = dot;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(X(px), Y(py), 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Component arrows, two standard deviations long.
      const arrow = (v: [number, number], len: number, colour: string, label: string) => {
        const ex = P.mx + v[0] * len;
        const ey = P.my + v[1] * len;
        ctx.strokeStyle = colour;
        ctx.fillStyle = colour;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(X(P.mx), Y(P.my));
        ctx.lineTo(X(ex), Y(ey));
        ctx.stroke();
        const ang = Math.atan2(Y(ey) - Y(P.my), X(ex) - X(P.mx));
        ctx.beginPath();
        ctx.moveTo(X(ex), Y(ey));
        ctx.lineTo(X(ex) - 9 * Math.cos(ang - 0.4), Y(ey) - 9 * Math.sin(ang - 0.4));
        ctx.lineTo(X(ex) - 9 * Math.cos(ang + 0.4), Y(ey) - 9 * Math.sin(ang + 0.4));
        ctx.closePath();
        ctx.fill();
        ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, X(ex) + 12 * Math.cos(ang), Y(ey) + 12 * Math.sin(ang) + 4);
      };

      arrow(P.v1, 2 * Math.sqrt(P.l1), pc1c, 'PC1');
      arrow(P.v2, 2 * Math.sqrt(P.l2), pc2c, 'PC2');
      ctx.restore();

      ctx.beginPath();
      ctx.arc(X(P.mx), Y(P.my), 3, 0, Math.PI * 2);
      ctx.fillStyle = ink;
      ctx.fill();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(standardise === 'raw' ? 'x₁ (raw units)' : 'x₁ (standardised)', PAD.l + plotW / 2, h - 8);
      ctx.save();
      ctx.translate(10, PAD.t + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(standardise === 'raw' ? `x₂ (unit ×${UNIT_GAP})` : 'x₂ (standardised)', 0, 0);
      ctx.restore();
    },
    [working, P, t, standardise],
  );

  const keptVariance = evr1 + (1 - t) * evr2;

  return (
    <WidgetShell
      takeaway="PCA answers whichever question the units ask it. In raw units PC1 points almost straight up and claims 99% of the variance, because x₂ happens to be written in bigger numbers. Standardise first and the components finally describe the shape of the data rather than the choice of measuring stick."
      readout={
        <Readout
          items={[
            { label: 'PC1 explained', value: `${(evr1 * 100).toFixed(1)}%`, tone: evr1 > 0.97 ? 'warn' : 'default' },
            { label: 'PC2 explained', value: `${(evr2 * 100).toFixed(1)}%` },
            { label: 'PC1 direction', value: `${angle.toFixed(1)}°` },
            { label: 'Correlation', value: P.corr.toFixed(2) },
            { label: 'Variance kept', value: `${(keptVariance * 100).toFixed(1)}%`, tone: keptVariance > 0.95 ? 'good' : 'default' },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Projection onto PC1"
            value={t}
            min={0}
            max={1}
            step={0.02}
            onChange={setT}
            format={(v) => (v === 0 ? 'off' : v === 1 ? 'fully projected' : v.toFixed(2))}
            hint="At 1 the cloud is a line: two numbers per point have become one, and the variance thrown away is exactly PC2's."
          />
          <Slider
            label="Correlation between the features"
            value={rho}
            min={0}
            max={0.98}
            step={0.02}
            onChange={setRho}
            format={(v) => v.toFixed(2)}
            hint="At 0 the features share nothing and, standardised, the two components explain 50% each — there is no compression to be had."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Toggle
              label="Preprocessing"
              value={standardise}
              onChange={(v) => setStandardise(v as 'raw' | 'z')}
              options={[
                { value: 'raw', label: 'Raw units' },
                { value: 'z', label: 'Standardised' },
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
        </>
      }
    >
      <div className="h-72 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`A correlated cloud of 90 points with PC1 at ${angle.toFixed(0)} degrees explaining ${(evr1 * 100).toFixed(0)} percent of the variance and PC2 explaining ${(evr2 * 100).toFixed(0)} percent.`}
        />
      </div>
      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Explained variance ratio</p>
        <div className="space-y-1.5">
          {[
            { name: 'PC1', v: evr1, cls: 'bg-viz-series' },
            { name: 'PC2', v: evr2, cls: 'bg-viz-review' },
          ].map((row) => (
            <div key={row.name} className="flex items-center gap-2">
              <span className="w-10 shrink-0 text-[11.5px] text-muted">{row.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                <div className={`h-full rounded-full ${row.cls}`} style={{ width: `${row.v * 100}%` }} />
              </div>
              <span className="w-14 text-right font-mono text-[12px] tabular-nums text-ink">
                {(row.v * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The ratios are the eigenvalues of the covariance matrix, divided by their sum. The arrows are its
          eigenvectors, drawn two standard deviations long — which is why PC1 is always the longer one.
        </p>
      </div>
    </WidgetShell>
  );
}
