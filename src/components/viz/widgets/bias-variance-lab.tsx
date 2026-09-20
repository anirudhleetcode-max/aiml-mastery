'use client';

import * as React from 'react';
import { Readout, Slider, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * Bias and variance, fitted rather than asserted.
 *
 * The true function is known here — it is drawn as a dashed line — which is
 * the one luxury a textbook has and a practitioner does not. Ten independent
 * samples are drawn from it, a polynomial of the chosen degree is fitted to
 * each, and all ten fits are drawn at once.
 *
 * The spread between those ten faint curves *is* the variance. The distance
 * between their average (the heavy line) and the dashed truth *is* the bias.
 * At degree 1 the ten fits agree with each other and all miss: low variance,
 * high bias. At degree 9 each one chases its own sample's noise: low bias,
 * enormous variance. The panel below adds the number that matters — error on
 * data the model has never seen — and it bottoms out in the middle.
 *
 * The fit is ordinary least squares on a Vandermonde basis, solved with
 * Gaussian elimination and a whisper of ridge for conditioning.
 */

const M_SAMPLES = 10;
const MAX_DEGREE = 9;
const PAD = { l: 34, r: 12, t: 14, b: 24 };
const TEST_GRID = 60;

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

/** The truth the model is trying to recover. x runs from 0 to 1. */
function truth(x: number): number {
  return Math.sin(2 * Math.PI * x) * 0.85;
}

/** Map x∈[0,1] to [-1,1]; the basis is far better conditioned there. */
function basis(x: number, degree: number): number[] {
  const t = 2 * x - 1;
  const row: number[] = [1];
  for (let d = 1; d <= degree; d++) row.push(row[d - 1]! * t);
  return row;
}

/** Solves A·c = b by Gaussian elimination with partial pivoting. */
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
    if (Math.abs(p) < 1e-12) continue;
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
    out[r] = Math.abs(d) < 1e-12 ? 0 : s / d;
  }
  return out;
}

/** Least-squares polynomial fit via the normal equations. */
function polyfit(xs: number[], ys: number[], degree: number): number[] {
  const m = degree + 1;
  const A: number[][] = Array.from({ length: m }, () => new Array<number>(m).fill(0));
  const b = new Array<number>(m).fill(0);
  for (let i = 0; i < xs.length; i++) {
    const phi = basis(xs[i]!, degree);
    for (let r = 0; r < m; r++) {
      b[r] = b[r]! + phi[r]! * ys[i]!;
      for (let c = 0; c < m; c++) A[r]![c] = A[r]![c]! + phi[r]! * phi[c]!;
    }
  }
  // Tikhonov floor: keeps the solve finite when the degree outruns the data.
  for (let r = 0; r < m; r++) A[r]![r] = A[r]![r]! + 1e-8;
  return solve(A, b);
}

function evalPoly(coef: number[], x: number): number {
  const phi = basis(x, coef.length - 1);
  let s = 0;
  for (let i = 0; i < coef.length; i++) s += coef[i]! * phi[i]!;
  return s;
}

interface Sample {
  xs: number[];
  ys: number[];
}

function makeSamples(seed: number, n: number, noise: number): Sample[] {
  const rng = mulberry32(seed);
  const out: Sample[] = [];
  for (let s = 0; s < M_SAMPLES; s++) {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < n; i++) {
      const x = rng();
      xs.push(x);
      ys.push(truth(x) + gauss(rng) * noise);
    }
    out.push({ xs, ys });
  }
  return out;
}

export default function BiasVarianceLab() {
  const [seed, setSeed] = React.useState(17);
  const [degree, setDegree] = React.useState(3);
  const [noise, setNoise] = React.useState(0.22);
  const [n, setN] = React.useState(16);

  const samples = React.useMemo(() => makeSamples(seed, n, noise), [seed, n, noise]);

  const grid = React.useMemo(
    () => Array.from({ length: TEST_GRID }, (_, i) => i / (TEST_GRID - 1)),
    [],
  );

  /** Every degree, every sample: the fits and the decomposition that follows. */
  const sweep = React.useMemo(() => {
    const rows: {
      degree: number;
      train: number;
      test: number;
      bias2: number;
      variance: number;
      curves: number[][];
      average: number[];
    }[] = [];
    for (let d = 1; d <= MAX_DEGREE; d++) {
      const curves: number[][] = [];
      let train = 0;
      for (const s of samples) {
        const coef = polyfit(s.xs, s.ys, d);
        let e = 0;
        for (let i = 0; i < s.xs.length; i++) e += (evalPoly(coef, s.xs[i]!) - s.ys[i]!) ** 2;
        train += e / s.xs.length;
        curves.push(grid.map((x) => evalPoly(coef, x)));
      }
      train /= samples.length;

      const average = grid.map((_, gi) => curves.reduce((acc, c) => acc + c[gi]!, 0) / curves.length);
      let bias2 = 0;
      let variance = 0;
      for (let gi = 0; gi < grid.length; gi++) {
        bias2 += (average[gi]! - truth(grid[gi]!)) ** 2;
        let v = 0;
        for (const c of curves) v += (c[gi]! - average[gi]!) ** 2;
        variance += v / curves.length;
      }
      bias2 /= grid.length;
      variance /= grid.length;
      // Expected error on unseen data is bias² + variance + the noise floor.
      rows.push({ degree: d, train, test: bias2 + variance + noise * noise, bias2, variance, curves, average });
    }
    return rows;
  }, [samples, grid, noise]);

  const current = sweep[degree - 1]!;
  const bestDegree = sweep.reduce((best, r) => (r.test < best.test ? r : best), sweep[0]!).degree;

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

      const YL = 1.8;
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

      // The ten fits: the visible spread is the variance.
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = series;
      ctx.lineWidth = 1;
      for (const c of current.curves) {
        ctx.beginPath();
        c.forEach((y, i) => {
          const px = X(grid[i]!);
          const py = Y(y);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // The first sample's points, so the learner sees what a fit is fitting.
      const first = samples[0]!;
      ctx.fillStyle = dotC;
      for (let i = 0; i < first.xs.length; i++) {
        ctx.beginPath();
        ctx.arc(X(first.xs[i]!), Y(first.ys[i]!), 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // The average fit: the bias is its distance from the truth.
      ctx.strokeStyle = series;
      ctx.lineWidth = 2.75;
      ctx.beginPath();
      current.average.forEach((y, i) => {
        const px = X(grid[i]!);
        const py = Y(y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      ctx.strokeStyle = truthC;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      grid.forEach((x, i) => {
        const py = Y(truth(x));
        if (i === 0) ctx.moveTo(X(x), py);
        else ctx.lineTo(X(x), py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('+1.8', PAD.l - 4, PAD.t + 8);
      ctx.fillText('0', PAD.l - 4, Y(0) + 3);
      ctx.fillText('−1.8', PAD.l - 4, PAD.t + plotH + 3);
      ctx.textAlign = 'center';
      ctx.fillText('x', PAD.l + plotW / 2, h - 8);
      ctx.textAlign = 'left';
      ctx.fillText('dashed: the true function', PAD.l + 5, PAD.t + 11);
    },
    [current, grid, samples],
  );

  const { canvasRef: errRef } = useResponsiveCanvas(
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

      const maxE = Math.max(0.05, ...sweep.map((r) => Math.max(r.train, Math.min(r.test, 1.2))));
      const X = (d: number) => PAD.l + ((d - 1) / (MAX_DEGREE - 1)) * plotW;
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
      ctx.moveTo(X(degree), PAD.t);
      ctx.lineTo(X(degree), PAD.t + plotH);
      ctx.stroke();
      ctx.globalAlpha = 1;

      const line = (key: 'train' | 'test', colour: string) => {
        ctx.strokeStyle = colour;
        ctx.lineWidth = 2;
        ctx.beginPath();
        sweep.forEach((r, i) => {
          const px = X(r.degree);
          const py = Y(r[key]);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.fillStyle = colour;
        for (const r of sweep) {
          ctx.beginPath();
          ctx.arc(X(r.degree), Y(r[key]), r.degree === degree ? 4 : 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      line('train', trainC);
      line('test', testC);

      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = testC;
      ctx.textAlign = 'left';
      ctx.fillText('test error', PAD.l + 5, PAD.t + 11);
      ctx.fillStyle = trainC;
      ctx.fillText('train error', PAD.l + 5, PAD.t + 23);
      ctx.fillStyle = axis;
      ctx.textAlign = 'center';
      for (let d = 1; d <= MAX_DEGREE; d += 2) ctx.fillText(String(d), X(d), h - 8);
      ctx.fillText('polynomial degree', PAD.l + plotW / 2, PAD.t - 2);
      ctx.textAlign = 'right';
      ctx.fillText(maxE.toFixed(2), PAD.l - 4, PAD.t + 8);
      ctx.fillText('0', PAD.l - 4, PAD.t + plotH + 3);
    },
    [sweep, degree],
  );

  return (
    <WidgetShell
      takeaway={`The heavy line is the average of ten fits and the faint ones are the fits themselves: bias is how far that average sits from the dashed truth, variance is how far the fits sit from each other. Train error falls forever; test error bottoms out near degree ${bestDegree} and then climbs, because past that point the extra flexibility is spent on noise.`}
      readout={
        <Readout
          items={[
            { label: 'Train MSE', value: current.train.toFixed(4) },
            { label: 'Test MSE', value: current.test.toFixed(4), tone: degree === bestDegree ? 'good' : current.test > sweep[bestDegree - 1]!.test * 2 ? 'bad' : 'default' },
            { label: 'Bias²', value: current.bias2.toFixed(4), tone: current.bias2 > 0.1 ? 'warn' : 'default' },
            { label: 'Variance', value: current.variance.toFixed(4), tone: current.variance > 0.1 ? 'warn' : 'default' },
            { label: 'Noise floor (σ²)', value: (noise * noise).toFixed(4) },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Polynomial degree"
            value={degree}
            min={1}
            max={MAX_DEGREE}
            step={1}
            onChange={setDegree}
            format={(v) => String(v)}
            hint="Degree 1 is a straight line: all ten fits agree and all ten are wrong. Degree 9 fits every wobble of its own sample and none of anyone else's."
          />
          <Slider
            label="Noise in each sample (σ)"
            value={noise}
            min={0}
            max={0.6}
            step={0.02}
            onChange={setNoise}
            format={(v) => v.toFixed(2)}
            hint="σ² is the floor: no model, however good, can score below it on unseen data."
          />
          <Slider
            label="Points per sample"
            value={n}
            min={8}
            max={40}
            step={1}
            onChange={setN}
            format={(v) => String(v)}
            hint="More data is the one move that reduces variance without adding bias. Take n to 40 and watch degree 9 become survivable."
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11.5px] text-subtle">Ten independent samples, refitted on every change.</p>
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
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="h-60 w-full">
          <canvas
            ref={fitRef}
            className="block"
            role="img"
            aria-label={`Ten degree-${degree} polynomial fits to ten different samples, with their average and the true function.`}
          />
        </div>
        <div className="h-60 w-full">
          <canvas
            ref={errRef}
            className="block"
            role="img"
            aria-label={`Train and test error against polynomial degree. Test error is lowest at degree ${bestDegree}.`}
          />
        </div>
      </div>
    </WidgetShell>
  );
}
