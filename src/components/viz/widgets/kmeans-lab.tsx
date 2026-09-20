'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * K-means, stepped by hand.
 *
 * The algorithm is two lines long and the widget refuses to hide either of
 * them: press Step once to assign every point to its nearest centroid, press
 * it again to move each centroid to the mean of what it caught. Repeat until
 * nothing moves. Inertia — the sum of squared distances to the assigned
 * centroid — falls at every single step, which is why it always terminates
 * and why it can only ever find a local optimum.
 *
 * "New start" re-seeds the centroids without touching the data. Doing that a
 * few times at k = 4 is the fastest way to learn why real implementations run
 * k-means ten times and keep the best inertia. The elbow plot underneath is
 * the other half of the practitioner's job: choosing k at all.
 */

interface Pt {
  x: number;
  y: number;
}

const LIM = 5;
const PAD = { l: 26, r: 12, t: 12, b: 22 };
const MAX_K = 6;

const CLUSTER_TOKENS = [
  'var(--viz-series)',
  'var(--viz-cat-learning)',
  'var(--viz-cat-mastered)',
  'var(--viz-cat-review)',
  'var(--viz-series-soft)',
  'var(--viz-cat-none)',
];

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

function makeData(seed: number): Pt[] {
  const rng = mulberry32(seed);
  const centres = [
    { x: -2.4, y: 2.1 },
    { x: 2.3, y: 2.4 },
    { x: -2.0, y: -2.3 },
    { x: 2.6, y: -1.9 },
  ];
  const pts: Pt[] = [];
  for (let i = 0; i < 128; i++) {
    const c = centres[i % centres.length]!;
    pts.push({
      x: Math.max(-4.8, Math.min(4.8, c.x + gauss(rng) * 0.95)),
      y: Math.max(-4.8, Math.min(4.8, c.y + gauss(rng) * 0.95)),
    });
  }
  return pts;
}

function nearest(p: Pt, centroids: Pt[]): number {
  let best = 0;
  let bestD = Infinity;
  for (let c = 0; c < centroids.length; c++) {
    const cc = centroids[c]!;
    const d = (p.x - cc.x) ** 2 + (p.y - cc.y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

function inertiaOf(pts: Pt[], centroids: Pt[], assign: number[]): number {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const c = centroids[assign[i] ?? 0];
    if (!c) continue;
    s += (pts[i]!.x - c.x) ** 2 + (pts[i]!.y - c.y) ** 2;
  }
  return s;
}

/** Centroids seeded by sampling distinct data points — plain Forgy initialisation. */
function initCentroids(pts: Pt[], k: number, seed: number): Pt[] {
  const rng = mulberry32(seed);
  const chosen: number[] = [];
  let guard = 0;
  while (chosen.length < k && guard < 500) {
    const i = Math.floor(rng() * pts.length);
    if (!chosen.includes(i)) chosen.push(i);
    guard += 1;
  }
  return chosen.map((i) => ({ ...pts[i]! }));
}

/** Runs k-means to convergence; used for the elbow plot, not for the animation. */
function runToConvergence(pts: Pt[], k: number, seed: number): number {
  let centroids = initCentroids(pts, k, seed);
  const assign = new Array<number>(pts.length).fill(0);
  for (let it = 0; it < 60; it++) {
    let changed = false;
    for (let i = 0; i < pts.length; i++) {
      const a = nearest(pts[i]!, centroids);
      if (a !== assign[i]) changed = true;
      assign[i] = a;
    }
    const sums = centroids.map(() => ({ x: 0, y: 0, n: 0 }));
    for (let i = 0; i < pts.length; i++) {
      const s = sums[assign[i]!]!;
      s.x += pts[i]!.x;
      s.y += pts[i]!.y;
      s.n += 1;
    }
    centroids = centroids.map((c, j) => {
      const s = sums[j]!;
      return s.n === 0 ? c : { x: s.x / s.n, y: s.y / s.n };
    });
    if (!changed && it > 0) break;
  }
  return inertiaOf(pts, centroids, assign);
}

interface State {
  centroids: Pt[];
  assign: number[];
  phase: 'assign' | 'update';
  iteration: number;
  history: number[];
  settled: boolean;
}

export default function KmeansLab() {
  const reduced = usePrefersReducedMotion();
  const [dataSeed, setDataSeed] = React.useState(21);
  const [initSeed, setInitSeed] = React.useState(3);
  const [k, setK] = React.useState(4);
  const [playing, setPlaying] = React.useState(false);

  const points = React.useMemo(() => makeData(dataSeed), [dataSeed]);

  const fresh = React.useCallback(
    (): State => ({
      centroids: initCentroids(points, k, initSeed),
      assign: new Array<number>(points.length).fill(-1),
      phase: 'assign',
      iteration: 0,
      history: [],
      settled: false,
    }),
    [points, k, initSeed],
  );

  const [state, setState] = React.useState<State>(fresh);
  React.useEffect(() => {
    setPlaying(false);
    setState(fresh());
  }, [fresh]);

  const step = React.useCallback(() => {
    setState((s) => {
      if (s.settled) return s;
      if (s.phase === 'assign') {
        const assign = points.map((p) => nearest(p, s.centroids));
        return { ...s, assign, phase: 'update' };
      }
      const sums = s.centroids.map(() => ({ x: 0, y: 0, n: 0 }));
      for (let i = 0; i < points.length; i++) {
        const idx = s.assign[i];
        if (idx === undefined || idx < 0) continue;
        const acc = sums[idx]!;
        acc.x += points[i]!.x;
        acc.y += points[i]!.y;
        acc.n += 1;
      }
      let moved = 0;
      const centroids = s.centroids.map((c, j) => {
        const acc = sums[j]!;
        if (acc.n === 0) return c;
        const next = { x: acc.x / acc.n, y: acc.y / acc.n };
        moved = Math.max(moved, Math.hypot(next.x - c.x, next.y - c.y));
        return next;
      });
      return {
        centroids,
        assign: s.assign,
        phase: 'assign',
        iteration: s.iteration + 1,
        history: [...s.history, inertiaOf(points, centroids, s.assign)].slice(-24),
        settled: moved < 1e-4,
      };
    });
  }, [points]);

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
      while (acc > 650) {
        acc -= 650;
        stepRef.current();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  React.useEffect(() => {
    if (state.settled) setPlaying(false);
  }, [state.settled]);

  const onToggle = () => {
    if (reduced) {
      for (let i = 0; i < 40; i++) stepRef.current();
      return;
    }
    setPlaying((p) => !p);
  };

  const inertia = React.useMemo(
    () => (state.assign.some((a) => a >= 0) ? inertiaOf(points, state.centroids, state.assign) : NaN),
    [points, state.centroids, state.assign],
  );

  // The elbow: the best inertia reachable at each k, over several restarts.
  const elbow = React.useMemo(() => {
    const out: number[] = [];
    for (let kk = 1; kk <= 8; kk++) {
      let best = Infinity;
      for (let r = 0; r < 5; r++) best = Math.min(best, runToConvergence(points, kk, 100 + r * 37 + kk));
      out.push(best);
    }
    return out;
  }, [points]);

  const bestForK = elbow[k - 1] ?? NaN;
  const sizes = React.useMemo(() => {
    const out = new Array<number>(k).fill(0);
    for (const a of state.assign) if (a >= 0 && a < k) out[a] = (out[a] ?? 0) + 1;
    return out;
  }, [state.assign, k]);

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const ink = resolve('hsl(var(--c-text))', '#eee');
      const muted = resolve('var(--viz-cat-none)', '#4a5265');
      const colours = CLUSTER_TOKENS.map((t) => resolve(t, '#888'));

      const X = (v: number) => PAD.l + ((v + LIM) / (2 * LIM)) * plotW;
      const Y = (v: number) => PAD.t + plotH - ((v + LIM) / (2 * LIM)) * plotH;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);

      // A thread from each point to its centroid: the assignment, without colour.
      if (state.assign.some((a) => a >= 0)) {
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = 1;
        for (let i = 0; i < points.length; i++) {
          const a = state.assign[i]!;
          const c = state.centroids[a];
          if (!c) continue;
          ctx.strokeStyle = colours[a % colours.length]!;
          ctx.beginPath();
          ctx.moveTo(X(points[i]!.x), Y(points[i]!.y));
          ctx.lineTo(X(c.x), Y(c.y));
          ctx.stroke();
        }
        ctx.restore();
      }

      for (let i = 0; i < points.length; i++) {
        const a = state.assign[i] ?? -1;
        ctx.fillStyle = a >= 0 ? colours[a % colours.length]! : muted;
        ctx.beginPath();
        ctx.arc(X(points[i]!.x), Y(points[i]!.y), 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Centroids: a numbered diamond, readable without relying on hue.
      for (let c = 0; c < state.centroids.length; c++) {
        const p = state.centroids[c]!;
        const px = X(p.x);
        const py = Y(p.y);
        ctx.beginPath();
        ctx.moveTo(px, py - 9);
        ctx.lineTo(px + 9, py);
        ctx.lineTo(px, py + 9);
        ctx.lineTo(px - 9, py);
        ctx.closePath();
        ctx.fillStyle = colours[c % colours.length]!;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = ink;
        ctx.stroke();
        ctx.fillStyle = ink;
        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(c + 1), px, py - 13);
      }
    },
    [points, state.assign, state.centroids],
  );

  const { canvasRef: elbowRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 34, r: 10, t: 12, b: 24 };
      const plotW = w - pad.l - pad.r;
      const plotH = h - pad.t - pad.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const series = resolve('var(--viz-series)', '#8164f7');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      const maxI = Math.max(...elbow, 1);
      const X = (kk: number) => pad.l + ((kk - 1) / 7) * plotW;
      const Y = (v: number) => pad.t + plotH - (v / maxI) * plotH;

      ctx.strokeStyle = grid;
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      for (let i = 0; i <= 3; i++) {
        const gy = pad.t + (plotH / 3) * i;
        ctx.beginPath();
        ctx.moveTo(pad.l, gy);
        ctx.lineTo(pad.l + plotW, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.strokeStyle = series;
      ctx.lineWidth = 2;
      ctx.beginPath();
      elbow.forEach((v, i) => {
        const px = X(i + 1);
        const py = Y(v);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      elbow.forEach((v, i) => {
        const kk = i + 1;
        ctx.beginPath();
        ctx.arc(X(kk), Y(v), kk === k ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = kk === k ? ink : series;
        ctx.fill();
      });

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      for (let kk = 1; kk <= 8; kk++) ctx.fillText(String(kk), X(kk), h - 8);
      ctx.fillText('k', pad.l + plotW / 2, pad.t - 2);
      ctx.textAlign = 'right';
      ctx.fillText(String(Math.round(maxI)), pad.l - 4, pad.t + 8);
      ctx.fillText('0', pad.l - 4, pad.t + plotH + 3);
    },
    [elbow, k],
  );

  const maxHist = Math.max(...state.history, 1);

  return (
    <WidgetShell
      takeaway="Inertia falls at every step and at every increase of k, so it can never tell you the right k on its own — only the bend in the elbow can. Press New start a few times at the same k and watch the final inertia change: k-means finds a local optimum, not the optimum."
      readout={
        <Readout
          items={[
            { label: 'Iteration', value: String(state.iteration) },
            { label: 'Next step', value: state.settled ? 'settled' : state.phase === 'assign' ? 'assign points' : 'move centroids', tone: state.settled ? 'good' : 'default' },
            { label: 'Inertia', value: Number.isNaN(inertia) ? '—' : inertia.toFixed(1) },
            { label: 'Best known at this k', value: bestForK.toFixed(1), tone: !Number.isNaN(inertia) && inertia > bestForK * 1.02 ? 'warn' : 'good' },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Clusters (k)"
            value={k}
            min={2}
            max={MAX_K}
            step={1}
            onChange={setK}
            format={(v) => String(v)}
            hint="The data was drawn from four blobs. Ask for six and k-means will happily split two of them in half — it never declines to answer."
          />
          <div className="flex flex-wrap items-center gap-1.5">
            <PlayButton
              playing={playing}
              onToggle={onToggle}
              onStep={step}
              onReset={() => {
                setPlaying(false);
                setState(fresh());
              }}
              label="clustering"
            />
            <button
              type="button"
              onClick={() => setInitSeed((s) => s + 1)}
              className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-[12px] font-medium text-primary transition-colors hover:bg-primary/20"
            >
              New start
            </button>
            <button
              type="button"
              onClick={() => setDataSeed((s) => s + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New data
            </button>
          </div>
          {reduced && (
            <p className="text-[11.5px] leading-relaxed text-subtle">
              Reduced motion is on, so Play runs the clustering straight to its settled state. Step still advances one
              half-iteration at a time.
            </p>
          )}
          <p className="text-[11.5px] leading-relaxed text-subtle">
            Cluster sizes: {sizes.map((n, i) => `#${i + 1}: ${n}`).join(' · ') || 'not assigned yet'}
          </p>
        </>
      }
    >
      <div className="h-72 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`${points.length} points assigned to ${k} numbered centroids after ${state.iteration} iterations. Inertia ${Number.isNaN(inertia) ? 'not yet computed' : inertia.toFixed(0)}.`}
        />
      </div>
      <div className="grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Inertia per iteration</p>
          {state.history.length === 0 ? (
            <p className="text-[11.5px] text-subtle">Step through an update to record the first value.</p>
          ) : (
            <div className="flex h-24 items-end gap-1" role="img" aria-label={`Inertia over ${state.history.length} iterations, ending at ${state.history[state.history.length - 1]!.toFixed(0)}.`}>
              {state.history.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-viz-series"
                  style={{ height: `${Math.max(3, (v / maxHist) * 100)}%` }}
                  title={`Iteration ${i + 1}: ${v.toFixed(1)}`}
                />
              ))}
            </div>
          )}
          <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
            It only ever goes down. Both halves of the step — assigning and averaging — are guaranteed not to increase
            it, which is the whole convergence proof.
          </p>
        </div>
        <div className="px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Elbow plot</p>
          <div className="h-24 w-full">
            <canvas
              ref={elbowRef}
              className="block"
              role="img"
              aria-label={`Best inertia against k from 1 to 8, with k = ${k} highlighted. The bend sits at k = 4.`}
            />
          </div>
          <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
            Best of five restarts at each k. The bend, not the minimum, is the answer — at k = 128 inertia would be
            exactly zero.
          </p>
        </div>
      </div>
    </WidgetShell>
  );
}
