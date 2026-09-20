'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Gradient descent in one parameter — the flat companion to the 3D surface.
 *
 * The loss here is a real one: mean squared error of `y = w·x` over a small
 * seeded dataset, so the parabola on the left is not a drawing, it is the
 * function being minimised. The ball is w. Each step moves it by
 * `−α · dL/dw`, and the slider walks the learner through the four regimes
 * every practitioner meets: crawl, converge, oscillate, diverge.
 *
 * The right-hand panel is the chart you actually stare at when training:
 * loss against iteration. A healthy run drops fast then flattens; an
 * oscillating run saw-tooths; a diverging run leaves the chart. Switching to
 * stochastic gradients makes the curve noisy without changing where it is
 * heading, which is the honest picture of SGD.
 */

interface Sample {
  x: number;
  y: number;
}

const W_MIN = -2;
const W_MAX = 6.5;
const W_START = 6;
const MAX_STEPS = 300;
const PAD = { l: 36, r: 12, t: 14, b: 26 };

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

function makeData(seed: number): Sample[] {
  const rng = mulberry32(seed);
  const trueW = 1.8 + rng() * 0.7;
  const out: Sample[] = [];
  for (let i = 0; i < 24; i++) {
    const x = 0.25 + (i / 23) * 1.75;
    out.push({ x, y: trueW * x + gauss(rng) * 0.55 });
  }
  return out;
}

/** Mean squared error of the one-parameter model y = w·x. */
function loss(data: Sample[], w: number): number {
  let s = 0;
  for (const d of data) {
    const r = w * d.x - d.y;
    s += r * r;
  }
  return s / data.length;
}

/** dL/dw, averaged over the batch (or over a single sample, for SGD). */
function grad(data: Sample[], w: number, subset?: Sample[]): number {
  const set = subset ?? data;
  let s = 0;
  for (const d of set) s += 2 * d.x * (w * d.x - d.y);
  return s / set.length;
}

interface Run {
  w: number;
  steps: number;
  history: number[];
  path: number[];
  diverged: boolean;
}

export default function GradientDescentLab() {
  const reduced = usePrefersReducedMotion();
  const [seed, setSeed] = React.useState(5);
  const [lr, setLr] = React.useState(0.12);
  const [mode, setMode] = React.useState<'batch' | 'stochastic'>('batch');
  const [playing, setPlaying] = React.useState(false);

  const data = React.useMemo(() => makeData(seed), [seed]);

  // Curvature of the parabola. Plain descent diverges once α exceeds 2/H, and
  // starts to overshoot (while still converging) past 1/H — the regime labels
  // below are computed from this, not guessed.
  const curvature = React.useMemo(() => {
    let s = 0;
    for (const d of data) s += 2 * d.x * d.x;
    return s / data.length;
  }, [data]);

  const optimum = React.useMemo(() => {
    let num = 0;
    let den = 0;
    for (const d of data) {
      num += d.x * d.y;
      den += d.x * d.x;
    }
    return den < 1e-9 ? 0 : num / den;
  }, [data]);

  const [run, setRun] = React.useState<Run>(() => ({
    w: W_START,
    steps: 0,
    history: [],
    path: [W_START],
    diverged: false,
  }));

  const reset = React.useCallback(() => {
    setPlaying(false);
    setRun({ w: W_START, steps: 0, history: [loss(data, W_START)], path: [W_START], diverged: false });
  }, [data]);

  React.useEffect(() => {
    setPlaying(false);
    setRun({ w: W_START, steps: 0, history: [loss(data, W_START)], path: [W_START], diverged: false });
  }, [data, lr, mode]);

  const step = React.useCallback(() => {
    setRun((s) => {
      if (s.diverged || s.steps >= MAX_STEPS) return s;
      // Deterministic "random" sample order, so a stochastic run is
      // reproducible: same seed, same jitter.
      const pick = mode === 'stochastic' ? [data[(s.steps * 7 + 3) % data.length]!] : undefined;
      const g = grad(data, s.w, pick);
      const w = s.w - lr * g;
      const diverged = !Number.isFinite(w) || Math.abs(w) > 60;
      const history = s.history.concat(diverged ? [] : [loss(data, w)]);
      const path = s.path.concat(diverged ? [] : [w]);
      return {
        w: diverged ? s.w : w,
        steps: s.steps + 1,
        history: history.slice(-MAX_STEPS),
        path: path.slice(-MAX_STEPS),
        diverged,
      };
    });
  }, [data, lr, mode]);

  const stepRef = React.useRef(step);
  stepRef.current = step;

  React.useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (t: number) => {
      acc += t - last;
      last = t;
      // One step every 90ms: fast enough to feel like training, slow enough to read.
      while (acc > 90) {
        acc -= 90;
        stepRef.current();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  React.useEffect(() => {
    if (run.diverged || run.steps >= MAX_STEPS) setPlaying(false);
  }, [run.diverged, run.steps]);

  const onToggle = () => {
    if (reduced) {
      // Reduced motion: no ticking ball. Advance the run to its resting state.
      for (let i = 0; i < 40; i++) stepRef.current();
      return;
    }
    setPlaying((p) => !p);
  };

  const ratio = lr * curvature;
  const regime =
    run.diverged || ratio >= 2
      ? { key: 'diverge', label: 'Diverging', tone: 'bad' as const, note: 'Each step overshoots further than the last. The loss grows without bound.' }
      : ratio >= 1
        ? { key: 'oscillate', label: 'Oscillating', tone: 'warn' as const, note: 'It still converges, but it crosses the minimum every step and wastes most of the motion.' }
        : ratio >= 0.12
          ? { key: 'healthy', label: 'Healthy', tone: 'good' as const, note: 'Steep descent early, small steps near the bottom. This is what you want.' }
          : { key: 'crawl', label: 'Crawling', tone: 'default' as const, note: 'It will get there — after far more steps than you have patience for.' };

  const currentLoss = run.diverged ? Infinity : loss(data, run.w);
  const currentGrad = run.diverged ? Infinity : grad(data, run.w);

  const { canvasRef: curveRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const series = resolve('var(--viz-series)', '#8164f7');
      const good = resolve('var(--viz-cat-mastered)', '#199e70');
      const warnC = resolve('var(--viz-cat-review)', '#d95926');

      const lossMax = Math.max(loss(data, W_MIN), loss(data, W_MAX)) * 1.05;
      const X = (v: number) => PAD.l + ((v - W_MIN) / (W_MAX - W_MIN)) * plotW;
      const Y = (v: number) => PAD.t + plotH - (Math.min(v, lossMax) / lossMax) * plotH;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 3; i++) {
        const gy = PAD.t + (plotH / 3) * i;
        ctx.beginPath();
        ctx.moveTo(PAD.l, gy);
        ctx.lineTo(w - PAD.r, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // The loss curve itself.
      ctx.strokeStyle = series;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const wv = W_MIN + ((W_MAX - W_MIN) / 140) * i;
        const py = Y(loss(data, wv));
        if (i === 0) ctx.moveTo(X(wv), py);
        else ctx.lineTo(X(wv), py);
      }
      ctx.stroke();

      // Minimum marker.
      ctx.strokeStyle = good;
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(X(optimum), PAD.t);
      ctx.lineTo(X(optimum), PAD.t + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = good;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('minimum', X(optimum), PAD.t - 3);

      // Every position the ball has occupied, so the zig-zag is visible.
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = warnC;
      for (const wv of run.path) {
        if (wv < W_MIN || wv > W_MAX) continue;
        ctx.beginPath();
        ctx.arc(X(wv), Y(loss(data, wv)), 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (!run.diverged && run.w >= W_MIN && run.w <= W_MAX) {
        const bx = X(run.w);
        const by = Y(loss(data, run.w));
        // The step that is about to be taken.
        const nextW = run.w - lr * grad(data, run.w);
        if (nextW >= W_MIN && nextW <= W_MAX) {
          ctx.strokeStyle = warnC;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(X(nextW), by);
          ctx.stroke();
          const dir = Math.sign(X(nextW) - bx) || 1;
          ctx.beginPath();
          ctx.moveTo(X(nextW), by);
          ctx.lineTo(X(nextW) - dir * 6, by - 4);
          ctx.lineTo(X(nextW) - dir * 6, by + 4);
          ctx.closePath();
          ctx.fillStyle = warnC;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(bx, by, 6, 0, Math.PI * 2);
        ctx.fillStyle = resolve('hsl(var(--c-xp))', 'hsl(41 94% 60%)');
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = resolve('var(--viz-seq-0)', '#111');
        ctx.stroke();
      }

      ctx.fillStyle = axis;
      ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('parameter w', PAD.l + plotW / 2, h - 8);
      ctx.textAlign = 'right';
      ctx.fillText(lossMax.toFixed(1), PAD.l - 5, PAD.t + 8);
      ctx.fillText('0', PAD.l - 5, PAD.t + plotH + 4);
    },
    [data, run.w, run.path, run.diverged, lr, optimum],
  );

  const { canvasRef: historyRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const series = resolve('var(--viz-cat-learning)', '#3987e5');
      const bad = resolve('var(--viz-cat-review)', '#d95926');

      const hist = run.history;
      const maxL = Math.max(0.001, ...hist);
      const n = Math.max(20, hist.length);

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 3; i++) {
        const gy = PAD.t + (plotH / 3) * i;
        ctx.beginPath();
        ctx.moveTo(PAD.l, gy);
        ctx.lineTo(w - PAD.r, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.fillStyle = axis;
      ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('iteration', PAD.l + plotW / 2, h - 8);
      ctx.textAlign = 'right';
      ctx.fillText(maxL.toFixed(2), PAD.l - 5, PAD.t + 8);
      ctx.fillText('0', PAD.l - 5, PAD.t + plotH + 4);

      if (hist.length > 1) {
        ctx.strokeStyle = run.diverged ? bad : series;
        ctx.lineWidth = 2;
        ctx.beginPath();
        hist.forEach((v, i) => {
          const px = PAD.l + (i / Math.max(1, n - 1)) * plotW;
          const py = PAD.t + plotH - (v / maxL) * plotH;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      } else {
        ctx.fillStyle = axis;
        ctx.textAlign = 'center';
        ctx.fillText('Press Step or Play', PAD.l + plotW / 2, PAD.t + plotH / 2);
      }

      if (run.diverged) {
        ctx.fillStyle = bad;
        ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('loss left the chart', PAD.l + plotW / 2, PAD.t + 14);
      }
    },
    [run.history, run.diverged],
  );

  return (
    <WidgetShell
      takeaway="There is no universally safe learning rate — only one that is right for the curvature of this loss. Below α ≈ 0.12/curvature it crawls, around 1/curvature it converges fast, past 2/curvature every step overshoots more than the last and the run is dead."
      readout={
        <Readout
          items={[
            { label: 'w', value: run.diverged ? '—' : run.w.toFixed(3) },
            { label: 'Loss', value: run.diverged ? '∞' : currentLoss.toFixed(4), tone: run.diverged ? 'bad' : currentLoss < 0.4 ? 'good' : 'default' },
            { label: 'dL/dw', value: run.diverged ? '—' : currentGrad.toFixed(3) },
            { label: 'Steps', value: String(run.steps) },
            { label: 'Regime', value: regime.label, tone: regime.tone },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Toggle
              label="Gradient estimate"
              value={mode}
              onChange={(v) => setMode(v as 'batch' | 'stochastic')}
              options={[
                { value: 'batch', label: 'Batch (all 24)' },
                { value: 'stochastic', label: 'Stochastic (1)' },
              ]}
            />
            <PlayButton playing={playing} onToggle={onToggle} onStep={step} onReset={reset} label="descent" />
          </div>
          <Slider
            label="Learning rate (α)"
            value={lr}
            min={0.005}
            max={0.9}
            step={0.005}
            onChange={setLr}
            format={(v) => v.toFixed(3)}
            hint={`${regime.note} (α × curvature = ${ratio.toFixed(2)}; divergence begins at 2.00)`}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11.5px] text-subtle">
              {mode === 'stochastic'
                ? 'One sample per step: cheap, noisy, and it never fully settles.'
                : 'Every sample per step: smooth, expensive, and it settles exactly.'}
            </p>
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New data
            </button>
          </div>
          {reduced && (
            <p className="text-[11.5px] leading-relaxed text-subtle">
              Reduced motion is on, so Play advances 40 steps at once instead of animating. Step still moves one
              iteration at a time.
            </p>
          )}
        </>
      }
    >
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="h-52 w-full">
          <canvas
            ref={curveRef}
            className="block"
            role="img"
            aria-label={`Loss as a function of the parameter w, with the current value ${run.w.toFixed(2)} marked as a ball on the curve.`}
          />
        </div>
        <div className="h-52 w-full">
          <canvas
            ref={historyRef}
            className="block"
            role="img"
            aria-label={`Loss against iteration over ${run.steps} steps.`}
          />
        </div>
      </div>
    </WidgetShell>
  );
}
