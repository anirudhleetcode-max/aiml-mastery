'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * L1 against L2, with the coefficients on show.
 *
 * A degree-9 polynomial has far more freedom than twenty-two noisy points can
 * justify, so at α ≈ 0 it wobbles. Both penalties fix that, and the fitted
 * curves end up looking similar — which is exactly why the bar chart matters
 * more than the curve here.
 *
 * Ridge shrinks every coefficient smoothly toward zero and arrives at none of
 * them: nine small numbers. Lasso's penalty has a corner at zero, so as α
 * rises coefficients hit exactly zero and stay there, one after another. That
 * is feature selection, and it is the whole practical difference between the
 * two. Watch the "exact zeros" count rather than the curve.
 *
 * Ridge is solved in closed form; lasso by cyclic coordinate descent with
 * soft-thresholding, both on standardised basis columns so the two α scales
 * are comparable.
 */

const DEGREE = 9;
const N_TRAIN = 22;
const N_TEST = 60;
const PAD = { l: 34, r: 12, t: 14, b: 24 };
const ALPHAS = Array.from({ length: 41 }, (_, i) => Math.pow(10, -6 + (i / 40) * 7));

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

function truth(x: number): number {
  return Math.sin(2 * Math.PI * x) * 0.8;
}

/** Powers of t = 2x − 1, degree 1 upward; the intercept is handled by centring. */
function features(x: number): number[] {
  const t = 2 * x - 1;
  const row: number[] = [];
  let p = 1;
  for (let d = 1; d <= DEGREE; d++) {
    p *= t;
    row.push(p);
  }
  return row;
}

interface Dataset {
  x: number[];
  y: number[];
}

function makeData(seed: number, noise: number): { train: Dataset; test: Dataset } {
  const rng = mulberry32(seed);
  const draw = (n: number): Dataset => {
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i < n; i++) {
      const xv = rng();
      x.push(xv);
      y.push(truth(xv) + gauss(rng) * noise);
    }
    return { x, y };
  };
  return { train: draw(N_TRAIN), test: draw(N_TEST) };
}

interface Standardised {
  Z: number[][];
  mean: number[];
  sd: number[];
  yMean: number;
  yc: number[];
}

function standardise(d: Dataset): Standardised {
  const rows = d.x.map(features);
  const m = DEGREE;
  const mean = new Array<number>(m).fill(0);
  const sd = new Array<number>(m).fill(0);
  for (const r of rows) for (let j = 0; j < m; j++) mean[j] = mean[j]! + r[j]! / rows.length;
  for (const r of rows) for (let j = 0; j < m; j++) sd[j] = sd[j]! + (r[j]! - mean[j]!) ** 2 / rows.length;
  for (let j = 0; j < m; j++) sd[j] = Math.sqrt(sd[j]!) || 1;
  const Z = rows.map((r) => r.map((v, j) => (v - mean[j]!) / sd[j]!));
  const yMean = d.y.reduce((s, v) => s + v, 0) / d.y.length;
  return { Z, mean, sd, yMean, yc: d.y.map((v) => v - yMean) };
}

function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]!]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r]![col]!) > Math.abs(M[pivot]![col]!)) pivot = r;
    const tmp = M[col]!;
    M[col] = M[pivot]!;
    M[pivot] = tmp;
    const p = M[col]![col]!;
    if (Math.abs(p) < 1e-14) continue;
    for (let r = col + 1; r < n; r++) {
      const factor = M[r]![col]! / p;
      if (factor === 0) continue;
      for (let c = col; c <= n; c++) M[r]![c] = M[r]![c]! - factor * M[col]![c]!;
    }
  }
  const out = new Array<number>(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = M[r]![n]!;
    for (let c = r + 1; c < n; c++) s -= M[r]![c]! * out[c]!;
    const d = M[r]![r]!;
    out[r] = Math.abs(d) < 1e-14 ? 0 : s / d;
  }
  return out;
}

/** Ridge in closed form: (ZᵀZ/n + αI)β = Zᵀy/n. */
function fitRidge(S: Standardised, alpha: number): number[] {
  const m = DEGREE;
  const n = S.Z.length;
  const A: number[][] = Array.from({ length: m }, () => new Array<number>(m).fill(0));
  const b = new Array<number>(m).fill(0);
  for (let i = 0; i < n; i++) {
    const z = S.Z[i]!;
    for (let r = 0; r < m; r++) {
      b[r] = b[r]! + (z[r]! * S.yc[i]!) / n;
      for (let c = 0; c < m; c++) A[r]![c] = A[r]![c]! + (z[r]! * z[c]!) / n;
    }
  }
  for (let r = 0; r < m; r++) A[r]![r] = A[r]![r]! + alpha;
  return solve(A, b);
}

/** Lasso by cyclic coordinate descent. The soft-threshold is where zeros come from. */
function fitLasso(S: Standardised, alpha: number): number[] {
  const m = DEGREE;
  const n = S.Z.length;
  const beta = new Array<number>(m).fill(0);
  const residual = [...S.yc];
  // Columns are standardised, so zⱼ·zⱼ/n = 1 and the update is a clean
  // soft-threshold of the correlation between column j and the residual.
  for (let sweepI = 0; sweepI < 220; sweepI++) {
    let maxDelta = 0;
    for (let j = 0; j < m; j++) {
      let rho = 0;
      for (let i = 0; i < n; i++) rho += S.Z[i]![j]! * (residual[i]! + S.Z[i]![j]! * beta[j]!);
      rho /= n;
      const next = Math.sign(rho) * Math.max(0, Math.abs(rho) - alpha);
      const delta = next - beta[j]!;
      if (delta !== 0) {
        for (let i = 0; i < n; i++) residual[i] = residual[i]! - S.Z[i]![j]! * delta;
        beta[j] = next;
        maxDelta = Math.max(maxDelta, Math.abs(delta));
      }
    }
    if (maxDelta < 1e-9) break;
  }
  return beta;
}

function predictor(S: Standardised, beta: number[]) {
  return (x: number) => {
    const f = features(x);
    let s = S.yMean;
    for (let j = 0; j < DEGREE; j++) s += beta[j]! * ((f[j]! - S.mean[j]!) / S.sd[j]!);
    return s;
  };
}

function mse(d: Dataset, f: (x: number) => number): number {
  let s = 0;
  for (let i = 0; i < d.x.length; i++) s += (f(d.x[i]!) - d.y[i]!) ** 2;
  return s / d.x.length;
}

export default function RegularizationLab() {
  const [seed, setSeed] = React.useState(23);
  const [logAlpha, setLogAlpha] = React.useState(-3);
  const [penalty, setPenalty] = React.useState<'l1' | 'l2'>('l1');
  const noise = 0.18;

  const alpha = Math.pow(10, logAlpha);
  const data = React.useMemo(() => makeData(seed, noise), [seed]);
  const S = React.useMemo(() => standardise(data.train), [data]);

  const beta = React.useMemo(
    () => (penalty === 'l1' ? fitLasso(S, alpha) : fitRidge(S, alpha)),
    [S, alpha, penalty],
  );
  const predict = React.useMemo(() => predictor(S, beta), [S, beta]);

  const trainErr = mse(data.train, predict);
  const testErr = mse(data.test, predict);
  const zeros = beta.filter((b) => Math.abs(b) < 1e-6).length;
  const maxAbs = Math.max(1e-6, ...beta.map((b) => Math.abs(b)));

  /** The full regularisation path, so the learner sees where this α sits. */
  const path = React.useMemo(
    () =>
      ALPHAS.map((a) => {
        const b = penalty === 'l1' ? fitLasso(S, a) : fitRidge(S, a);
        const f = predictor(S, b);
        return { alpha: a, train: mse(data.train, f), test: mse(data.test, f), zeros: b.filter((v) => Math.abs(v) < 1e-6).length };
      }),
    [S, data, penalty],
  );
  const bestAlpha = path.reduce((best, r) => (r.test < best.test ? r : best), path[0]!);

  const { canvasRef: fitRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const gridC = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const series = resolve('var(--viz-series)', '#8164f7');
      const truthC = resolve('var(--viz-cat-mastered)', '#199e70');
      const dotC = resolve('var(--viz-cat-learning)', '#3987e5');

      const YL = 1.7;
      const X = (x: number) => PAD.l + x * plotW;
      const Y = (y: number) => PAD.t + plotH / 2 - (y / YL) * (plotH / 2);

      ctx.strokeStyle = gridC;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 4; i++) {
        const gy = PAD.t + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(PAD.l, gy);
        ctx.lineTo(PAD.l + plotW, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.save();
      ctx.beginPath();
      ctx.rect(PAD.l, PAD.t, plotW, plotH);
      ctx.clip();

      ctx.strokeStyle = truthC;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const x = i / 120;
        const py = Y(truth(x));
        if (i === 0) ctx.moveTo(X(x), py);
        else ctx.lineTo(X(x), py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = series;
      ctx.lineWidth = 2.75;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = i / 200;
        const py = Y(predict(x));
        if (i === 0) ctx.moveTo(X(x), py);
        else ctx.lineTo(X(x), py);
      }
      ctx.stroke();

      ctx.fillStyle = dotC;
      for (let i = 0; i < data.train.x.length; i++) {
        ctx.beginPath();
        ctx.arc(X(data.train.x[i]!), Y(data.train.y[i]!), 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('x', PAD.l + plotW / 2, h - 8);
      ctx.textAlign = 'left';
      ctx.fillText('dashed: the true function', PAD.l + 5, PAD.t + 11);
      ctx.textAlign = 'right';
      ctx.fillText('+1.7', PAD.l - 4, PAD.t + 8);
      ctx.fillText('0', PAD.l - 4, Y(0) + 3);
      ctx.fillText('−1.7', PAD.l - 4, PAD.t + plotH + 3);
    },
    [data, predict],
  );

  const { canvasRef: pathRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const gridC = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const trainC = resolve('var(--viz-cat-learning)', '#3987e5');
      const testC = resolve('var(--viz-cat-review)', '#d95926');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      const maxE = Math.max(0.02, ...path.map((r) => Math.min(Math.max(r.train, r.test), 0.6)));
      const X = (a: number) => PAD.l + ((Math.log10(a) + 6) / 7) * plotW;
      const Y = (v: number) => PAD.t + plotH - (Math.min(v, maxE) / maxE) * plotH;

      ctx.strokeStyle = gridC;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 3; i++) {
        const gy = PAD.t + (plotH / 3) * i;
        ctx.beginPath();
        ctx.moveTo(PAD.l, gy);
        ctx.lineTo(PAD.l + plotW, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(X(alpha), PAD.t);
      ctx.lineTo(X(alpha), PAD.t + plotH);
      ctx.stroke();
      ctx.globalAlpha = 1;

      const line = (key: 'train' | 'test', colour: string) => {
        ctx.strokeStyle = colour;
        ctx.lineWidth = 2;
        ctx.beginPath();
        path.forEach((r, i) => {
          const px = X(r.alpha);
          const py = Y(r[key]);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      };
      line('train', trainC);
      line('test', testC);

      ctx.fillStyle = testC;
      ctx.beginPath();
      ctx.arc(X(bestAlpha.alpha), Y(bestAlpha.test), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = testC;
      ctx.textAlign = 'left';
      ctx.fillText('test error', PAD.l + 5, PAD.t + 11);
      ctx.fillStyle = trainC;
      ctx.fillText('train error', PAD.l + 5, PAD.t + 23);
      ctx.fillStyle = axis;
      ctx.textAlign = 'center';
      for (const e of [-6, -4, -2, 0]) ctx.fillText(`1e${e}`, X(Math.pow(10, e)), h - 8);
      ctx.fillText('α (log scale)', PAD.l + plotW / 2, PAD.t - 2);
      ctx.textAlign = 'right';
      ctx.fillText(maxE.toFixed(2), PAD.l - 4, PAD.t + 8);
      ctx.fillText('0', PAD.l - 4, PAD.t + plotH + 3);
    },
    [path, alpha, bestAlpha],
  );

  return (
    <WidgetShell
      takeaway="Both penalties tame the wobble, but only L1 sets coefficients to exactly zero — count them in the bar chart as α rises. Ridge keeps all nine and makes them small; lasso deletes terms outright, which is why it doubles as feature selection."
      readout={
        <Readout
          items={[
            { label: 'α', value: alpha < 0.001 ? alpha.toExponential(1) : alpha.toFixed(4) },
            { label: 'Train MSE', value: trainErr.toFixed(4) },
            { label: 'Test MSE', value: testErr.toFixed(4), tone: testErr < bestAlpha.test * 1.15 ? 'good' : testErr > bestAlpha.test * 3 ? 'bad' : 'default' },
            { label: 'Exact zeros', value: `${zeros} of ${DEGREE}`, tone: zeros > 0 ? 'good' : 'default' },
            { label: 'Best α here', value: bestAlpha.alpha.toExponential(1) },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Regularisation strength (α)"
            value={logAlpha}
            min={-6}
            max={1}
            step={0.1}
            onChange={setLogAlpha}
            format={(v) => `10^${v.toFixed(1)}`}
            hint="At the left-hand end the penalty is off and the curve chases every point. At the right it wins outright and the fit flattens to the mean."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Toggle
              label="Penalty"
              value={penalty}
              onChange={(v) => setPenalty(v as 'l1' | 'l2')}
              options={[
                { value: 'l1', label: 'L1 — lasso' },
                { value: 'l2', label: 'L2 — ridge' },
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
            {penalty === 'l1'
              ? 'Minimising MSE + α·Σ|βⱼ|. The absolute value has a corner at zero, so the optimum often sits exactly on it.'
              : 'Minimising MSE + α·Σβⱼ². The square is smooth at zero, so the optimum approaches it and never arrives.'}
          </p>
        </>
      }
    >
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="h-56 w-full">
          <canvas
            ref={fitRef}
            className="block"
            role="img"
            aria-label={`A degree-9 polynomial fitted to 22 points with ${penalty === 'l1' ? 'lasso' : 'ridge'} at alpha ${alpha.toExponential(1)}.`}
          />
        </div>
        <div className="h-56 w-full">
          <canvas
            ref={pathRef}
            className="block"
            role="img"
            aria-label={`Train and test error against alpha, with the current alpha marked. Test error is lowest near ${bestAlpha.alpha.toExponential(1)}.`}
          />
        </div>
      </div>
      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Coefficients on standardised features
        </p>
        <div className="space-y-1">
          {beta.map((b, j) => {
            const zero = Math.abs(b) < 1e-6;
            return (
              <div key={j} className="flex items-center gap-2">
                <span className="w-8 shrink-0 font-mono text-[11px] text-muted">β{j + 1}</span>
                <div className="relative h-2.5 flex-1 rounded-full bg-surface-3">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-line-strong" />
                  <div
                    className={`absolute inset-y-0 rounded-full ${zero ? 'bg-transparent' : b > 0 ? 'bg-viz-series' : 'bg-viz-review'}`}
                    style={{
                      width: `${(Math.abs(b) / maxAbs) * 50}%`,
                      left: b >= 0 ? '50%' : undefined,
                      right: b < 0 ? '50%' : undefined,
                    }}
                  />
                </div>
                <span
                  className={`w-16 shrink-0 text-right font-mono text-[11px] tabular-nums ${zero ? 'text-success' : 'text-ink'}`}
                >
                  {zero ? '0' : b.toFixed(3)}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          β1 multiplies x, β9 multiplies x⁹. Bars run left for negative and right for positive; a value shown as an
          exact 0 means the term has been removed from the model, not merely made small.
        </p>
      </div>
    </WidgetShell>
  );
}
