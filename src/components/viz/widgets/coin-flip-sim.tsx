'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * The law of large numbers, one flip at a time.
 *
 * Learners arrive believing that 7 heads in 10 flips is evidence of a bent
 * coin. The chart says otherwise: the shaded funnel is the range that holds
 * 95% of honest coins, and at n = 10 it is enormous — roughly 2 to 8 heads.
 * The funnel only closes as n grows, and the running proportion is dragged
 * into it. Small samples are wild; large samples are tame. Nothing else in
 * probability pays off as quickly as internalising that.
 *
 * The x-axis is logarithmic on purpose. On a linear axis the interesting part
 * — the first hundred flips, where the line thrashes — is a single pixel.
 */

/** Small, fast, seeded PRNG. Same seed, same coin, every time. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Resolves a design token to something a canvas can paint, following nested var() indirection. */
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

interface Run {
  n: number;
  heads: number;
  /** Down-sampled running proportion: every flip early on, log-spaced later. */
  traj: { n: number; p: number }[];
  /** The last few outcomes, for the slow hand-flipped build-up. */
  recent: number[];
}

const EMPTY: Run = { n: 0, heads: 0, traj: [], recent: [] };
const MAX_FLIPS = 100_000;
const BATCHES = [10, 100, 1_000, 10_000];
/** 1.96 standard errors — the two-sided 95% band for a proportion. */
const Z95 = 1.96;

/** Half-width of the 95% band for the proportion of heads after n flips. */
function band(p: number, n: number): number {
  return n <= 0 ? 0.5 : Z95 * Math.sqrt((p * (1 - p)) / n);
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export default function CoinFlipSim() {
  const reduced = usePrefersReducedMotion();
  const [bias, setBias] = React.useState(0.5);
  const [seed, setSeed] = React.useState(7);
  const [playing, setPlaying] = React.useState(false);
  /** Mirrors the run for rendering; the run itself lives in a ref so batches stay cheap. */
  const [view, setView] = React.useState<{ n: number; heads: number; recent: number[]; tick: number }>({
    n: 0,
    heads: 0,
    recent: [],
    tick: 0,
  });

  const runRef = React.useRef<Run>({ ...EMPTY });
  const rngRef = React.useRef<() => number>(mulberry32(7));

  const publish = React.useCallback(() => {
    const r = runRef.current;
    setView((v) => ({ n: r.n, heads: r.heads, recent: r.recent.slice(), tick: v.tick + 1 }));
  }, []);

  const reset = React.useCallback(() => {
    runRef.current = { ...EMPTY, traj: [], recent: [] };
    rngRef.current = mulberry32(seed);
    setPlaying(false);
    publish();
  }, [seed, publish]);

  // A new bias or a new seed is a new experiment, not a continuation of this one.
  React.useEffect(() => {
    runRef.current = { ...EMPTY, traj: [], recent: [] };
    rngRef.current = mulberry32(seed);
    setPlaying(false);
    setView({ n: 0, heads: 0, recent: [], tick: 0 });
  }, [seed, bias]);

  const flip = React.useCallback(
    (count: number) => {
      const run = runRef.current;
      const rng = rngRef.current;
      const target = Math.min(count, MAX_FLIPS - run.n);
      for (let i = 0; i < target; i++) {
        const head = rng() < bias ? 1 : 0;
        run.n += 1;
        run.heads += head;
        run.recent.push(head);
        if (run.recent.length > 40) run.recent.shift();
        // Keep every one of the first 150 points, then log-spaced samples.
        const last = run.traj[run.traj.length - 1];
        if (!last || run.n <= 150 || run.n >= last.n * 1.03) run.traj.push({ n: run.n, p: run.heads / run.n });
      }
      const last = run.traj[run.traj.length - 1];
      if (run.n > 0 && (!last || last.n !== run.n)) run.traj.push({ n: run.n, p: run.heads / run.n });
      publish();
    },
    [bias, publish],
  );

  // Continuous run: starts at one flip per frame and accelerates, so the early
  // thrashing is visible before the line settles down.
  React.useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    const loop = () => {
      const n = runRef.current.n;
      if (n >= MAX_FLIPS) {
        setPlaying(false);
        return;
      }
      flip(Math.max(1, Math.min(400, Math.round(n / 25) + 1)));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced, flip]);

  React.useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const { n, heads } = view;
  const prop = n > 0 ? heads / n : 0;
  const dev = prop - bias;
  const half = band(bias, n);
  const inside = n === 0 || Math.abs(dev) <= half;

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 34, r: 10, t: 12, b: 24 };
      const plotW = w - pad.l - pad.r;
      const plotH = h - pad.t - pad.b;
      if (plotW <= 0 || plotH <= 0) return;

      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(128,128,128,0.25)');
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const series = resolve('var(--viz-series)', 'rgba(129,100,247,1)');
      const soft = resolve('var(--viz-series-soft)', 'rgba(167,139,250,1)');
      const info = resolve('var(--viz-cat-learning)', 'rgba(57,135,229,1)');

      const run = runRef.current;
      // Axis stops at the next power of ten, so it only ever steps, never jitters.
      const decades = Math.max(1, Math.ceil(Math.log10(Math.max(10, run.n))));
      const x = (v: number) => pad.l + (Math.log10(Math.max(1, v)) / decades) * plotW;
      const y = (v: number) => pad.t + plotH - clamp01(v) * plotH;

      // y grid + labels
      ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 4; i++) {
        const value = 1 - i / 4;
        const gy = y(value);
        ctx.strokeStyle = grid;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(pad.l, gy);
        ctx.lineTo(w - pad.r, gy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = axis;
        ctx.fillText(value.toFixed(2), pad.l - 5, gy + 4);
      }

      // x ticks: one per decade
      ctx.textAlign = 'center';
      for (let d = 0; d <= decades; d++) {
        const v = Math.pow(10, d);
        const px = x(v);
        ctx.fillStyle = axis;
        ctx.fillText(v >= 1000 ? `${v / 1000}k` : String(v), Math.min(w - pad.r - 8, Math.max(pad.l + 8, px)), h - 7);
      }

      // The 95% funnel for an honest coin with this bias. This band is the
      // whole argument: it is wide at ten flips and a sliver at ten thousand.
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = info;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const nv = Math.pow(10, (decades / 120) * i);
        ctx.lineTo(x(nv), y(bias + band(bias, nv)));
      }
      for (let i = 120; i >= 0; i--) {
        const nv = Math.pow(10, (decades / 120) * i);
        ctx.lineTo(x(nv), y(bias - band(bias, nv)));
      }
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // Expected proportion
      ctx.strokeStyle = soft;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.l, y(bias));
      ctx.lineTo(w - pad.r, y(bias));
      ctx.stroke();
      ctx.setLineDash([]);

      // Running proportion
      if (run.traj.length > 0) {
        ctx.strokeStyle = series;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        run.traj.forEach((pt, i) => {
          const px = x(pt.n);
          const py = y(pt.p);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        const end = run.traj[run.traj.length - 1];
        if (end) {
          ctx.fillStyle = series;
          ctx.beginPath();
          ctx.arc(x(end.n), y(end.p), 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.fillStyle = axis;
        ctx.textAlign = 'center';
        ctx.font = '12px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Flip the coin to start', pad.l + plotW / 2, pad.t + plotH / 2);
      }

      // Band label, anchored at the left edge where the funnel is widest.
      ctx.fillStyle = axis;
      ctx.textAlign = 'left';
      ctx.font = '10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('95% of honest runs', pad.l + 4, pad.t + 10);
    },
    [view.tick, bias],
  );

  const atCap = n >= MAX_FLIPS;

  return (
    <WidgetShell
      takeaway="Ten flips landing 7 heads is ordinary — the 95% band at n = 10 runs from about 2 heads to 8. It is only at hundreds or thousands of flips that the proportion is pinned close to the true rate, and that narrowing, not any single result, is the law of large numbers."
      readout={
        <Readout
          items={[
            { label: 'Flips', value: n.toLocaleString('en-US') },
            { label: 'Heads', value: heads.toLocaleString('en-US') },
            { label: 'Proportion', value: n > 0 ? prop.toFixed(4) : '—' },
            {
              label: 'Deviation',
              value: n > 0 ? `${dev >= 0 ? '+' : ''}${dev.toFixed(4)}` : '—',
              tone: n === 0 ? 'default' : inside ? 'good' : 'warn',
            },
            { label: '95% band', value: n > 0 ? `±${half.toFixed(4)}` : '—' },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => flip(1)}
              disabled={atCap}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              Flip once
            </button>
            {BATCHES.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => flip(b)}
                disabled={atCap}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[12px] font-medium tabular-nums text-muted transition-colors hover:text-ink disabled:opacity-40"
              >
                +{b.toLocaleString('en-US')}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {reduced ? (
              <p className="text-[11.5px] leading-relaxed text-subtle">
                Continuous flipping is off because you have asked for reduced motion. The buttons above add flips a
                batch at a time.
              </p>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => setPlaying((p) => !p)}
                onStep={() => flip(1)}
                onReset={reset}
                label="continuous flipping"
              />
            )}
            {reduced && (
              <button
                type="button"
                onClick={reset}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={() => setSeed((s) => (s % 999) + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New coin (seed {seed})
            </button>
          </div>
          <Slider
            label="True probability of heads"
            value={bias}
            min={0.05}
            max={0.95}
            step={0.01}
            onChange={setBias}
            format={(v) => v.toFixed(2)}
            hint="Changing the bias starts a fresh run. The dashed line is what the proportion is converging to."
          />
        </>
      }
    >
      <div className="h-56 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`Running proportion of heads over ${n} flips, currently ${n > 0 ? prop.toFixed(3) : 'not started'}, against a true rate of ${bias.toFixed(2)}`}
        />
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Most recent flips</p>
        <div className="flex flex-wrap gap-1" aria-label="The last forty outcomes, newest at the right">
          {view.recent.length === 0 && <span className="text-[12px] text-subtle">No flips yet.</span>}
          {view.recent.map((r, i) => (
            <span
              key={`${i}-${r}`}
              className={`inline-flex h-5 w-5 items-center justify-center rounded font-mono text-[11px] font-semibold ${
                r === 1 ? 'bg-primary/15 text-primary' : 'bg-surface-3 text-subtle'
              }`}
            >
              {r === 1 ? 'H' : 'T'}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          What an honest coin is allowed to do
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-1.5 pr-3 font-medium">Flips</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">95% of runs land in</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">As a proportion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[10, 100, 1_000, 10_000].map((m) => {
                const hw = band(bias, m) * m;
                const lo = Math.max(0, Math.round(bias * m - hw));
                const hi = Math.min(m, Math.round(bias * m + hw));
                return (
                  <tr key={m}>
                    <td className="py-1.5 pr-3 font-medium tabular-nums text-ink">{m.toLocaleString('en-US')}</td>
                    <td className="py-1.5 pr-3 tabular-nums text-muted">
                      {lo.toLocaleString('en-US')} – {hi.toLocaleString('en-US')} heads
                    </td>
                    <td className="py-1.5 pr-3 tabular-nums text-muted">
                      {(lo / m).toFixed(3)} – {(hi / m).toFixed(3)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The width of that range grows like √n while the number of flips grows like n, so the range as a{' '}
          <em>proportion</em> shrinks by a factor of ten for every hundredfold increase in flips.
        </p>
      </div>
    </WidgetShell>
  );
}
