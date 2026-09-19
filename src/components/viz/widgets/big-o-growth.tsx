'use client';

import * as React from 'react';
import { Readout, Slider, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * Big-O growth, made concrete.
 *
 * The point is not the shapes of the curves — it is the *numbers* underneath.
 * At n = 1,000, O(n²) is a million operations and O(log n) is ten. Reading
 * that row of numbers does more for intuition than any amount of asymptotic
 * notation, so the table is as prominent as the plot.
 */

interface Curve {
  key: string;
  label: string;
  f: (n: number) => number;
  colorVar: string;
  note: string;
}

const CURVES: Curve[] = [
  { key: 'log', label: 'O(log n)', f: (n) => Math.log2(Math.max(2, n)), colorVar: 'var(--viz-cat-mastered)', note: 'Binary search. Halving the problem each step.' },
  { key: 'n', label: 'O(n)', f: (n) => n, colorVar: 'var(--viz-cat-learning)', note: 'One pass over the data.' },
  { key: 'nlogn', label: 'O(n log n)', f: (n) => n * Math.log2(Math.max(2, n)), colorVar: 'var(--viz-series)', note: 'Good sorting. The practical ceiling for comparison sorts.' },
  { key: 'n2', label: 'O(n²)', f: (n) => n * n, colorVar: 'var(--viz-cat-review)', note: 'Nested loops. Fine at 100, fatal at 100,000.' },
];

const SCALE_POINTS = [10, 100, 1_000, 10_000, 100_000];

function fmt(v: number): string {
  if (v < 1000) return v.toFixed(v < 10 ? 1 : 0);
  if (v < 1e6) return `${(v / 1e3).toFixed(1)}k`;
  if (v < 1e9) return `${(v / 1e6).toFixed(1)}M`;
  if (v < 1e12) return `${(v / 1e9).toFixed(1)}B`;
  return v.toExponential(1);
}

export default function BigOGrowth() {
  const [n, setN] = React.useState(40);
  const [logScale, setLogScale] = React.useState(false);

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 44, r: 12, t: 14, b: 26 };
      const plotW = w - pad.l - pad.r;
      const plotH = h - pad.t - pad.b;
      if (plotW <= 0 || plotH <= 0) return;

      const style = getComputedStyle(document.documentElement);
      const resolve = (v: string) => {
        const name = v.match(/var\((--[a-z0-9-]+)\)/)?.[1];
        return name ? style.getPropertyValue(name).trim() || '#888' : v;
      };
      const grid = resolve('var(--viz-grid)') || 'rgba(255,255,255,0.08)';
      const axis = resolve('var(--viz-axis)') || '#888';

      const maxN = Math.max(10, n);
      const rawMax = Math.max(...CURVES.map((c) => c.f(maxN)));
      const yMax = logScale ? Math.log10(rawMax + 1) : rawMax;

      const x = (v: number) => pad.l + (v / maxN) * plotW;
      const y = (v: number) => {
        const t = (logScale ? Math.log10(v + 1) : v) / Math.max(1e-9, yMax);
        return pad.t + plotH - t * plotH;
      };

      // grid
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 4; i++) {
        const gy = pad.t + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.l, gy);
        ctx.lineTo(w - pad.r, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // axis labels
      ctx.fillStyle = axis;
      ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const value = (yMax / 4) * (4 - i);
        const shown = logScale ? Math.pow(10, value) - 1 : value;
        ctx.fillText(fmt(shown), pad.l - 6, pad.t + (plotH / 4) * i + 4);
      }
      ctx.textAlign = 'center';
      ctx.fillText('0', pad.l, h - 8);
      ctx.fillText(`n = ${maxN}`, w - pad.r - 18, h - 8);

      // curves
      for (const c of CURVES) {
        ctx.strokeStyle = resolve(c.colorVar);
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= 160; i++) {
          const nv = (maxN / 160) * i;
          const py = y(Math.min(c.f(nv), rawMax));
          if (i === 0) ctx.moveTo(x(nv), py);
          else ctx.lineTo(x(nv), py);
        }
        ctx.stroke();

        const endY = y(Math.min(c.f(maxN), rawMax));
        ctx.fillStyle = resolve(c.colorVar);
        ctx.beginPath();
        ctx.arc(x(maxN), endY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        // Direct label on every curve — four series, so no legend box needed.
        ctx.textAlign = 'right';
        ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(c.label, x(maxN) - 8, Math.max(pad.t + 9, endY - 6));
      }
    },
    [n, logScale],
  );

  return (
    <WidgetShell
      takeaway="Constant factors stop mattering as n grows. An O(n²) algorithm that is 100× faster per operation still loses to O(n log n) once the data is big enough — which, in machine learning, it always is."
      readout={
        <Readout
          items={CURVES.map((c) => ({
            label: c.label,
            value: fmt(c.f(n)),
            tone: c.key === 'n2' && c.f(n) > 1e6 ? 'bad' : c.key === 'log' ? 'good' : 'default',
          }))}
        />
      }
      controls={
        <>
          <Slider
            label="Input size (n)"
            value={n}
            min={10}
            max={400}
            step={1}
            onChange={setN}
            format={(v) => v.toLocaleString('en-US')}
            hint="Drag right and watch O(n²) leave the chart while O(log n) barely moves."
          />
          <label className="flex items-center gap-2 text-[12px] text-muted">
            <input
              type="checkbox"
              checked={logScale}
              onChange={(e) => setLogScale(e.target.checked)}
              className="accent-[hsl(var(--c-primary))]"
            />
            Logarithmic y-axis (so the slower curves stay visible)
          </label>
        </>
      }
    >
      <div className="h-56 w-full">
        <canvas ref={canvasRef} className="block" role="img" aria-label="Growth of common complexity classes" />
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Operations at realistic input sizes
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-1.5 pr-3 font-medium">n</th>
                {CURVES.map((c) => (
                  <th key={c.key} scope="col" className="py-1.5 pr-3 font-medium">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SCALE_POINTS.map((p) => (
                <tr key={p}>
                  <td className="py-1.5 pr-3 font-medium tabular-nums text-ink">{p.toLocaleString('en-US')}</td>
                  {CURVES.map((c) => {
                    const v = c.f(p);
                    return (
                      <td
                        key={c.key}
                        className={`py-1.5 pr-3 tabular-nums ${v > 1e9 ? 'text-danger' : v > 1e7 ? 'text-warning' : 'text-muted'}`}
                      >
                        {fmt(v)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          At a billion operations a second, the red cells take minutes to hours. That is the whole reason complexity
          analysis exists.
        </p>
      </div>
    </WidgetShell>
  );
}
