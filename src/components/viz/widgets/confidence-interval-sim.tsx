'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * A hundred confidence intervals, and the sentence they are meant to kill.
 *
 * "There is a 95% chance the true mean is in this interval" is the single most
 * common misstatement in applied statistics. It cannot be right: the true mean
 * is a fixed number, the interval is what is random, and a particular interval
 * either contains it or does not. The only way to make that concrete is to
 * show the thing that actually has a 95% property — the *procedure*, repeated.
 *
 * So the chart draws one line per sample, all from the same population with the
 * same known true mean, and colours each by whether it caught that mean. About
 * five of every hundred miss, and nothing about a missing interval looks
 * different from the inside: it is built from the same formula and the same
 * kind of data as the ones that succeeded.
 *
 * σ is treated as known so the interval is a clean z-interval and the arithmetic
 * stays visible; with σ estimated the critical value comes from a t
 * distribution and the interpretation is unchanged.
 */

/** Small, fast, seeded PRNG. Same seed, same hundred samples, every time. */
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

/** Acklam's rational approximation to the inverse normal CDF. */
function probit(p: number): number {
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const lo = 0.02425;
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p < lo) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  if (p > 1 - lo) return -probit(1 - p);
  const q = p - 0.5;
  const r = q * q;
  return (
    ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
}

function gauss(rng: () => number): number {
  const u = Math.max(1e-12, rng());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

/** A fictional but concrete population: blood pressure in mmHg. */
const TRUE_MEAN = 100;
const TRUE_SD = 15;
const RUN_SIZE = 100;
const PAD = { l: 10, r: 10, t: 20, b: 22 };

interface Interval {
  mean: number;
  half: number;
  hit: boolean;
}

export default function ConfidenceIntervalSim() {
  const reduced = usePrefersReducedMotion();
  const [level, setLevel] = React.useState(0.95);
  const [n, setN] = React.useState(25);
  const [seed, setSeed] = React.useState(4);
  const [playing, setPlaying] = React.useState(false);
  const [intervals, setIntervals] = React.useState<Interval[]>([]);
  /** Coverage across every interval this widget has drawn, not just the visible hundred. */
  const [lifetime, setLifetime] = React.useState({ drawn: 0, hits: 0 });

  const z = probit(1 - (1 - level) / 2);
  const se = TRUE_SD / Math.sqrt(n);
  const half = z * se;

  const rngRef = React.useRef<() => number>(mulberry32(4));
  /** Mirrors `intervals` so a batch can be built outside the state updater. */
  const intervalsRef = React.useRef<Interval[]>([]);

  const restart = React.useCallback(() => {
    rngRef.current = mulberry32(seed * 7919 + n);
    intervalsRef.current = [];
    setIntervals([]);
    setPlaying(false);
  }, [seed, n]);

  // A new level, sample size or seed means a new experiment.
  React.useEffect(() => {
    rngRef.current = mulberry32(seed * 7919 + n);
    intervalsRef.current = [];
    setIntervals([]);
    setPlaying(false);
  }, [seed, n, level]);

  const addIntervals = React.useCallback(
    (howMany: number) => {
      const rng = rngRef.current;
      const current = intervalsRef.current;
      const budget = Math.min(howMany, RUN_SIZE - current.length);
      if (budget <= 0) return;
      const next = current.slice();
      let hits = 0;
      for (let i = 0; i < budget; i++) {
        let sum = 0;
        for (let k = 0; k < n; k++) sum += TRUE_MEAN + TRUE_SD * gauss(rng);
        const mean = sum / n;
        const hit = Math.abs(mean - TRUE_MEAN) <= half;
        if (hit) hits += 1;
        next.push({ mean, half, hit });
      }
      intervalsRef.current = next;
      setIntervals(next);
      setLifetime((l) => ({ drawn: l.drawn + budget, hits: l.hits + hits }));
    },
    [n, half],
  );

  React.useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    const loop = () => {
      if (intervalsRef.current.length >= RUN_SIZE) {
        setPlaying(false);
        return;
      }
      addIntervals(2);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced, addIntervals]);

  React.useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const misses = intervals.filter((i) => !i.hit).length;
  const expectedMisses = RUN_SIZE * (1 - level);
  const lifetimeCoverage = lifetime.drawn > 0 ? lifetime.hits / lifetime.drawn : 0;

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;

      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const good = resolve('var(--viz-cat-mastered)', '#199e70');
      const miss = resolve('var(--viz-cat-review)', '#d95926');
      const grid = resolve('var(--viz-grid)', 'rgba(128,128,128,0.25)');

      // The axis follows the interval width, so the picture stays readable from
      // n = 5 to n = 200. The numbers on it say what the scale actually is.
      const span = Math.max(half * 2.6, se * 4.4);
      const xLo = TRUE_MEAN - span;
      const xHi = TRUE_MEAN + span;
      const x = (v: number) => PAD.l + ((v - xLo) / (xHi - xLo)) * plotW;
      const rowH = plotH / RUN_SIZE;

      for (const v of [TRUE_MEAN - span / 2, TRUE_MEAN + span / 2]) {
        ctx.strokeStyle = grid;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(x(v), PAD.t);
        ctx.lineTo(x(v), PAD.t + plotH);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // The truth: a fixed vertical line. It is the intervals that move.
      ctx.strokeStyle = axis;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x(TRUE_MEAN), PAD.t - 6);
      ctx.lineTo(x(TRUE_MEAN), PAD.t + plotH + 4);
      ctx.stroke();
      ctx.fillStyle = axis;
      ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`true mean μ = ${TRUE_MEAN}`, Math.min(w - 46, Math.max(46, x(TRUE_MEAN))), PAD.t - 9);

      const lw = Math.max(1, Math.min(2.2, rowH - 0.7));
      intervals.forEach((iv, i) => {
        const y = PAD.t + (i + 0.5) * rowH;
        ctx.strokeStyle = iv.hit ? good : miss;
        ctx.globalAlpha = iv.hit ? 0.75 : 1;
        ctx.lineWidth = iv.hit ? lw : Math.max(lw, 2);
        ctx.beginPath();
        ctx.moveTo(x(iv.mean - iv.half), y);
        ctx.lineTo(x(iv.mean + iv.half), y);
        ctx.stroke();
        // End caps and the sample mean itself, so a miss is readable without colour.
        if (rowH > 2.4) {
          ctx.beginPath();
          ctx.arc(x(iv.mean), y, Math.min(1.8, rowH / 2.4), 0, Math.PI * 2);
          ctx.fillStyle = iv.hit ? good : miss;
          ctx.fill();
        }
        if (!iv.hit) {
          // Misses get a marker in the margin as well as a colour.
          ctx.fillStyle = miss;
          ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('×', 1, y + 3);
        }
        ctx.globalAlpha = 1;
      });

      if (intervals.length === 0) {
        ctx.fillStyle = axis;
        ctx.font = '12px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Draw samples to build a hundred intervals', w / 2, PAD.t + plotH / 2);
      }

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(xLo.toFixed(1), PAD.l, h - 6);
      ctx.textAlign = 'right';
      ctx.fillText(xHi.toFixed(1), w - PAD.r, h - 6);
      ctx.textAlign = 'center';
      ctx.fillText(`${intervals.length} of ${RUN_SIZE} intervals`, w / 2, h - 6);
    },
    [intervals, half, se, n],
  );

  const done = intervals.length >= RUN_SIZE;

  return (
    <WidgetShell
      takeaway="The 95% belongs to the procedure, not to any one interval. Run a hundred and about five miss — and a miss is built from exactly the same formula and the same honest data as a hit, so no interval can tell you which kind it is. Once you have your one interval, μ is either inside it or it is not; what you are entitled to say is that intervals made this way catch μ 95% of the time."
      readout={
        <Readout
          items={[
            { label: 'Confidence level', value: `${(level * 100).toFixed(1)}%` },
            { label: 'Intervals', value: `${intervals.length}` },
            { label: 'Missed', value: `${misses}`, tone: misses > 0 ? 'warn' : 'default' },
            { label: 'Expected misses', value: expectedMisses.toFixed(1) },
            { label: 'Interval width', value: `±${half.toFixed(2)}` },
            {
              label: 'Coverage so far',
              value: lifetime.drawn > 0 ? `${(lifetimeCoverage * 100).toFixed(1)}% of ${lifetime.drawn}` : '—',
              tone: 'good',
            },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Confidence level"
            value={level}
            min={0.8}
            max={0.995}
            step={0.005}
            onChange={(v) => setLevel(Number(v.toFixed(3)))}
            format={(v) => `${(v * 100).toFixed(1)}%  (z = ${probit(1 - (1 - v) / 2).toFixed(2)})`}
            hint="Higher confidence is not free: it buys coverage with width. A 99.5% interval is nearly twice as wide as an 80% one."
          />
          <Slider
            label="Sample size n"
            value={n}
            min={5}
            max={200}
            step={1}
            onChange={setN}
            format={(v) => String(v)}
            hint="A larger sample narrows every interval but does not change how often they miss — the miss rate is set by the confidence level alone."
          />
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => addIntervals(RUN_SIZE)}
              disabled={done}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              Run 100 at once
            </button>
            <button
              type="button"
              onClick={() => addIntervals(1)}
              disabled={done}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              One more sample
            </button>
            {!reduced && (
              <PlayButton
                playing={playing}
                onToggle={() => setPlaying((v) => !v)}
                onStep={() => addIntervals(1)}
                onReset={restart}
                label="interval drawing"
              />
            )}
            {reduced && (
              <button
                type="button"
                onClick={restart}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={() => setSeed((s) => (s % 997) + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New sample (seed {seed})
            </button>
          </div>
          {reduced && (
            <p className="text-[11.5px] leading-relaxed text-subtle">
              Intervals appear all at once because you have asked for reduced motion; add them one at a time with the
              button above to watch the count build.
            </p>
          )}
        </>
      }
    >
      <div className="h-72 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`${intervals.length} confidence intervals drawn from a population with true mean ${TRUE_MEAN}; ${misses} of them, marked with a cross, miss it`}
        />
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          What each part of the interval is
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <tbody className="divide-y divide-line">
              <tr>
                <td className="py-1.5 pr-3 text-subtle">The population</td>
                <td className="py-1.5 font-mono tabular-nums text-ink">
                  μ = {TRUE_MEAN}, σ = {TRUE_SD} — fixed, known here, unknown in real work
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 text-subtle">Standard error</td>
                <td className="py-1.5 font-mono tabular-nums text-ink">
                  σ/√n = {TRUE_SD}/√{n} = {se.toFixed(3)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 text-subtle">The interval</td>
                <td className="py-1.5 font-mono tabular-nums text-ink">
                  x̄ ± {z.toFixed(2)} × {se.toFixed(3)} = x̄ ± {half.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 text-subtle">What is random</td>
                <td className="py-1.5 text-ink">x̄, and therefore the interval. Not μ.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Drop the level to 80% and roughly twenty of the hundred lines turn to misses while every line gets shorter:
          confidence and precision trade against each other, and only the sample size buys both. The crossed-out lines
          are not mistakes — they are the price of the guarantee, paid at the advertised rate.
        </p>
      </div>
    </WidgetShell>
  );
}
