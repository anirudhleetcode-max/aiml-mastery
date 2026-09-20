'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Linear regression you fit with your hands before you let the maths do it.
 *
 * The sliders move a line; the vertical segments are the residuals, the
 * numbers underneath are the loss. "Fit it for me" jumps to the least-squares
 * solution, and the gap between the learner's eyeballed MSE and the optimum is
 * the whole lesson: fitting is not drawing a nice-looking line, it is
 * minimising a number that is written down in advance.
 *
 * Drawing the residuals as *squares* (the second view) is the other half —
 * MSE is literally the average area of those boxes, which is why one far-off
 * point drags the line so hard.
 */

interface Pt {
  x: number;
  y: number;
}

const PAD = { l: 34, r: 14, t: 14, b: 26 };
const X_MAX = 10;
const Y_MAX = 12;
const N_POINTS = 14;

/** Small, fast, seeded PRNG. Same seed, same cloud, every time. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal, Box–Muller. */
function gauss(rng: () => number): number {
  let u = 0;
  while (u === 0) u = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
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

function makePoints(seed: number, noise: number): Pt[] {
  const rng = mulberry32(seed);
  const trueSlope = 0.62 + rng() * 0.3;
  const trueIntercept = 1.6 + rng() * 2.2;
  const pts: Pt[] = [];
  for (let i = 0; i < N_POINTS; i++) {
    const x = ((i + 0.5) / N_POINTS) * X_MAX + (rng() - 0.5) * 0.5;
    const y = trueSlope * x + trueIntercept + gauss(rng) * noise;
    pts.push({ x: Math.min(X_MAX, Math.max(0, x)), y: Math.min(Y_MAX - 0.3, Math.max(0.3, y)) });
  }
  return pts;
}

/** Ordinary least squares in closed form: the slope is covariance over variance. */
function leastSquares(pts: Pt[]): { slope: number; intercept: number } {
  const n = pts.length;
  if (n < 2) return { slope: 0, intercept: 0 };
  let sx = 0;
  let sy = 0;
  for (const p of pts) {
    sx += p.x;
    sy += p.y;
  }
  const mx = sx / n;
  const my = sy / n;
  let sxy = 0;
  let sxx = 0;
  for (const p of pts) {
    sxy += (p.x - mx) * (p.y - my);
    sxx += (p.x - mx) * (p.x - mx);
  }
  const slope = sxx < 1e-9 ? 0 : sxy / sxx;
  return { slope, intercept: my - slope * mx };
}

function metrics(pts: Pt[], slope: number, intercept: number) {
  const n = pts.length || 1;
  let se = 0;
  let ae = 0;
  let sy = 0;
  for (const p of pts) {
    const r = p.y - (slope * p.x + intercept);
    se += r * r;
    ae += Math.abs(r);
    sy += p.y;
  }
  const my = sy / n;
  let sst = 0;
  for (const p of pts) sst += (p.y - my) * (p.y - my);
  return { mse: se / n, mae: ae / n, r2: sst < 1e-9 ? 0 : 1 - se / sst };
}

export default function LinearRegressionLab() {
  const reduced = usePrefersReducedMotion();
  const [seed, setSeed] = React.useState(11);
  const [noise, setNoise] = React.useState(1.1);
  const [slope, setSlope] = React.useState(0.25);
  const [intercept, setIntercept] = React.useState(6);
  const [view, setView] = React.useState<'lines' | 'squares'>('lines');
  const [points, setPoints] = React.useState<Pt[]>(() => makePoints(11, 1.1));
  const [dragging, setDragging] = React.useState<number | null>(null);

  // New seed or new noise level is a new dataset, not a continuation.
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPoints(makePoints(seed, noise));
  }, [seed, noise]);

  const best = React.useMemo(() => leastSquares(points), [points]);
  const now = React.useMemo(() => metrics(points, slope, intercept), [points, slope, intercept]);
  const bestMetrics = React.useMemo(
    () => metrics(points, best.slope, best.intercept),
    [points, best.slope, best.intercept],
  );

  // "Fit it for me" eases the line across so the learner sees which way it had
  // to move; with reduced motion it simply arrives.
  const rafRef = React.useRef(0);
  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const fit = React.useCallback(() => {
    const target = leastSquares(points);
    const roundedSlope = Math.round(target.slope * 100) / 100;
    const roundedIntercept = Math.round(target.intercept * 10) / 10;
    if (reduced) {
      setSlope(roundedSlope);
      setIntercept(roundedIntercept);
      return;
    }
    cancelAnimationFrame(rafRef.current);
    const fromS = slope;
    const fromI = intercept;
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 480);
      const e = 1 - Math.pow(1 - k, 3);
      setSlope(Math.round((fromS + (roundedSlope - fromS) * e) * 100) / 100);
      setIntercept(Math.round((fromI + (roundedIntercept - fromI) * e) * 10) / 10);
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [points, slope, intercept, reduced]);

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const series = resolve('var(--viz-series)', '#8164f7');
      const warn = resolve('var(--viz-cat-review)', '#d95926');

      const X = (v: number) => PAD.l + (v / X_MAX) * plotW;
      const Y = (v: number) => PAD.t + plotH - (v / Y_MAX) * plotH;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 4; i++) {
        const gy = PAD.t + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(PAD.l, gy);
        ctx.lineTo(w - PAD.r, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.fillStyle = axis;
      ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        ctx.fillText(String(Math.round((Y_MAX / 4) * (4 - i))), PAD.l - 5, PAD.t + (plotH / 4) * i + 4);
      }
      ctx.textAlign = 'center';
      ctx.fillText('x', w - PAD.r - 4, h - 8);
      ctx.fillText('0', PAD.l, h - 8);

      // Residuals first, so the points and the line sit on top of them.
      ctx.save();
      for (const p of points) {
        const pred = slope * p.x + intercept;
        const px = X(p.x);
        const py = Y(p.y);
        const ry = Y(pred);
        if (view === 'squares') {
          const side = Math.abs(ry - py);
          ctx.globalAlpha = 0.16;
          ctx.fillStyle = warn;
          ctx.fillRect(px, Math.min(py, ry), side, side);
          ctx.globalAlpha = 0.5;
          ctx.strokeStyle = warn;
          ctx.lineWidth = 1;
          ctx.strokeRect(px, Math.min(py, ry), side, side);
        } else {
          ctx.globalAlpha = 0.75;
          ctx.strokeStyle = warn;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, ry);
          ctx.stroke();
        }
      }
      ctx.restore();

      // The fitted line, clipped to the plot.
      ctx.save();
      ctx.beginPath();
      ctx.rect(PAD.l, PAD.t, plotW, plotH);
      ctx.clip();
      ctx.strokeStyle = series;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(X(0), Y(intercept));
      ctx.lineTo(X(X_MAX), Y(slope * X_MAX + intercept));
      ctx.stroke();
      ctx.restore();

      for (let i = 0; i < points.length; i++) {
        const p = points[i]!;
        ctx.beginPath();
        ctx.arc(X(p.x), Y(p.y), i === dragging ? 6 : 4.2, 0, Math.PI * 2);
        ctx.fillStyle = resolve('var(--viz-cat-learning)', '#3987e5');
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = resolve('var(--viz-seq-0)', '#111');
        ctx.stroke();
      }
    },
    [points, slope, intercept, view, dragging],
  );

  const toData = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const plotW = rect.width - PAD.l - PAD.r;
    const plotH = rect.height - PAD.t - PAD.b;
    return {
      px,
      py,
      x: ((px - PAD.l) / Math.max(1, plotW)) * X_MAX,
      y: ((PAD.t + plotH - py) / Math.max(1, plotH)) * Y_MAX,
    };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const plotW = rect.width - PAD.l - PAD.r;
    const plotH = rect.height - PAD.t - PAD.b;
    const { px, py } = toData(e);
    let hit: number | null = null;
    let bestDist = 18 * 18;
    for (let i = 0; i < points.length; i++) {
      const p = points[i]!;
      const dx = PAD.l + (p.x / X_MAX) * plotW - px;
      const dy = PAD.t + plotH - (p.y / Y_MAX) * plotH - py;
      const d = dx * dx + dy * dy;
      if (d < bestDist) {
        bestDist = d;
        hit = i;
      }
    }
    if (hit !== null) {
      setDragging(hit);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragging === null) return;
    const { x, y } = toData(e);
    setPoints((prev) =>
      prev.map((p, i) =>
        i === dragging
          ? { x: Math.min(X_MAX, Math.max(0, x)), y: Math.min(Y_MAX - 0.2, Math.max(0.2, y)) }
          : p,
      ),
    );
  };

  const onUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragging === null) return;
    setDragging(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const gap = now.mse - bestMetrics.mse;

  return (
    <WidgetShell
      takeaway="Least squares does not find the line that looks right — it finds the one number, mean squared error, that no other line can beat. Drag one point far from the rest and watch how hard a single squared residual pulls the optimum."
      readout={
        <Readout
          items={[
            { label: 'MSE', value: now.mse.toFixed(3), tone: gap < 0.02 ? 'good' : gap > 2 ? 'bad' : 'default' },
            { label: 'MAE', value: now.mae.toFixed(3) },
            { label: 'R²', value: now.r2.toFixed(3), tone: now.r2 < 0 ? 'bad' : now.r2 > 0.8 ? 'good' : 'default' },
            { label: 'Best possible MSE', value: bestMetrics.mse.toFixed(3) },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Slope (w)"
            value={slope}
            min={-1}
            max={2.5}
            step={0.01}
            onChange={setSlope}
            format={(v) => v.toFixed(2)}
          />
          <Slider
            label="Intercept (b)"
            value={intercept}
            min={-2}
            max={10}
            step={0.1}
            onChange={setIntercept}
            format={(v) => v.toFixed(1)}
          />
          <Slider
            label="Noise in the data (σ)"
            value={noise}
            min={0}
            max={3}
            step={0.1}
            onChange={setNoise}
            format={(v) => v.toFixed(1)}
            hint="At σ = 0 the points sit exactly on a line and the best MSE is zero. Nothing real looks like that."
          />
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Toggle
              label="Residual view"
              value={view}
              onChange={(v) => setView(v as 'lines' | 'squares')}
              options={[
                { value: 'lines', label: 'Segments' },
                { value: 'squares', label: 'Squares' },
              ]}
            />
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={fit}
                className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-[12px] font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Fit it for me
              </button>
              <button
                type="button"
                onClick={() => setSeed((s) => s + 1)}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
              >
                New data
              </button>
            </div>
          </div>
        </>
      }
    >
      <div className="h-64 w-full">
        <canvas
          ref={canvasRef}
          className="block touch-none"
          role="img"
          aria-label={`Scatter plot of ${points.length} points with a fitted line of slope ${slope.toFixed(2)} and intercept ${intercept.toFixed(1)}. Mean squared error ${now.mse.toFixed(2)}, the best possible is ${bestMetrics.mse.toFixed(2)}.`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>
      <p className="border-t border-line px-4 py-2 text-[11.5px] leading-relaxed text-subtle">
        Drag any point to move it. The orange marks are residuals — the vertical distance from each point to your
        line. MSE averages their squares, MAE averages their lengths, and R² asks how much better your line is than
        simply predicting the mean of y.
      </p>
    </WidgetShell>
  );
}
