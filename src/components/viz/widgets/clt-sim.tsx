'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * The central limit theorem, with a population chosen to be as un-normal as
 * possible.
 *
 * The usual misreading is that "everything is normal if you collect enough
 * data". It is not: the left-hand histogram is the population, and no amount
 * of sampling makes it any less lopsided or any less two-humped. What goes
 * normal is the right-hand histogram — the distribution of the *sample mean*,
 * a different quantity entirely. Holding both on screen at once is the whole
 * argument.
 *
 * The second half of the theorem is quantitative and is easy to miss: the
 * sampling distribution is not just normal, it is normal with a standard
 * deviation of σ/√n. The readout puts the observed spread of the means next to
 * that prediction, so the √n is something the learner watches happen rather
 * than something they are told.
 */

/** Small, fast, seeded PRNG. Same seed, same samples, every time. */
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

function gauss(rng: () => number): number {
  const u = Math.max(1e-12, rng());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

interface Population {
  key: string;
  label: string;
  /** What makes this population awkward, in one line. */
  note: string;
  mean: number;
  sd: number;
  range: [number, number];
  draw: (rng: () => number) => number;
}

// Lognormal(0, 0.75): the standard heavy right tail — incomes, session lengths.
const LN_S = 0.75;
const LN_MEAN = Math.exp((LN_S * LN_S) / 2);
const LN_SD = Math.sqrt((Math.exp(LN_S * LN_S) - 1) * Math.exp(LN_S * LN_S));

// A 50/50 mixture with two clearly separated humps, and no mass at its own mean.
const BI = { m1: 0.22, s1: 0.06, m2: 0.8, s2: 0.08 };
const BI_MEAN = (BI.m1 + BI.m2) / 2;
const BI_SD = Math.sqrt(
  0.5 * (BI.s1 * BI.s1 + BI.m1 * BI.m1) + 0.5 * (BI.s2 * BI.s2 + BI.m2 * BI.m2) - BI_MEAN * BI_MEAN,
);

const POPULATIONS: Population[] = [
  {
    key: 'skewed',
    label: 'Skewed',
    note: 'A long right tail: most values small, a few enormous. Mean sits well above the mode.',
    mean: LN_MEAN,
    sd: LN_SD,
    range: [0, 6],
    draw: (rng) => Math.exp(LN_S * gauss(rng)),
  },
  {
    key: 'bimodal',
    label: 'Bimodal',
    note: 'Two separate groups. Almost nobody is near the population mean, yet the means pile up there.',
    mean: BI_MEAN,
    sd: BI_SD,
    range: [0, 1],
    draw: (rng) => (rng() < 0.5 ? BI.m1 + BI.s1 * gauss(rng) : BI.m2 + BI.s2 * gauss(rng)),
  },
  {
    key: 'uniform',
    label: 'Uniform',
    note: 'Flat — every value equally likely, no central tendency at all in the population.',
    mean: 0.5,
    sd: Math.sqrt(1 / 12),
    range: [0, 1],
    draw: (rng) => rng(),
  },
  {
    key: 'exponential',
    label: 'Exponential',
    note: 'Waiting times: the most likely value is zero and the tail never quite ends.',
    mean: 1,
    sd: 1,
    range: [0, 5],
    draw: (rng) => -Math.log(Math.max(1e-12, rng())),
  },
];

const POP_BINS = 46;
const MEAN_BINS = 41;
const POP_DRAWS = 20_000;
const MAX_SAMPLES = 6_000;
const PAD = { l: 8, r: 8, t: 16, b: 22 };

interface Acc {
  count: number;
  sum: number;
  sumsq: number;
  bins: number[];
  /** The individual values of the most recent sample, for the ticks on the left. */
  last: number[];
  lastMean: number | null;
}

function emptyAcc(): Acc {
  return { count: 0, sum: 0, sumsq: 0, bins: new Array(MEAN_BINS).fill(0), last: [], lastMean: null };
}

function histogram(values: number[], lo: number, hi: number, bins: number): number[] {
  const out = new Array(bins).fill(0) as number[];
  for (const v of values) {
    const idx = Math.min(bins - 1, Math.max(0, Math.floor(((v - lo) / (hi - lo)) * bins)));
    out[idx] += 1;
  }
  return out;
}

export default function CltSim() {
  const reduced = usePrefersReducedMotion();
  const [popKey, setPopKey] = React.useState('skewed');
  const [n, setN] = React.useState(5);
  const [seed, setSeed] = React.useState(5);
  const [playing, setPlaying] = React.useState(false);
  const [tick, setTick] = React.useState(0);

  const pop = POPULATIONS.find((p) => p.key === popKey) ?? POPULATIONS[0];
  const se = pop.sd / Math.sqrt(n);
  // The means are binned over ±4 standard errors, so the axis is comparable to
  // the normal curve drawn over it rather than to whatever happened to turn up.
  const mLo = pop.mean - 4 * se;
  const mHi = pop.mean + 4 * se;

  const accRef = React.useRef<Acc>(emptyAcc());
  const rngRef = React.useRef<() => number>(mulberry32(5));

  // A fixed, generously sized look at the population itself. It never changes
  // as samples are drawn — that is the point.
  const popHist = React.useMemo(() => {
    const rng = mulberry32(917);
    const values = Array.from({ length: POP_DRAWS }, () => pop.draw(rng));
    return histogram(values, pop.range[0], pop.range[1], POP_BINS);
  }, [pop]);

  const reset = React.useCallback(() => {
    accRef.current = emptyAcc();
    rngRef.current = mulberry32(seed);
    setPlaying(false);
    setTick((t) => t + 1);
  }, [seed]);

  // Changing n, the population or the seed invalidates every mean collected so far.
  React.useEffect(() => {
    accRef.current = emptyAcc();
    rngRef.current = mulberry32(seed * 131 + n);
    setPlaying(false);
    setTick((t) => t + 1);
  }, [seed, n, popKey]);

  const drawSamples = React.useCallback(
    (howMany: number) => {
      const acc = accRef.current;
      const rng = rngRef.current;
      const budget = Math.min(howMany, MAX_SAMPLES - acc.count);
      for (let s = 0; s < budget; s++) {
        let sum = 0;
        const keep = s === budget - 1;
        const values: number[] = [];
        for (let i = 0; i < n; i++) {
          const v = pop.draw(rng);
          sum += v;
          if (keep && values.length < 200) values.push(v);
        }
        const m = sum / n;
        acc.count += 1;
        acc.sum += m;
        acc.sumsq += m * m;
        const idx = Math.min(MEAN_BINS - 1, Math.max(0, Math.floor(((m - mLo) / (mHi - mLo)) * MEAN_BINS)));
        acc.bins[idx] += 1;
        if (keep) {
          acc.last = values;
          acc.lastMean = m;
        }
      }
      setTick((t) => t + 1);
    },
    [n, pop, mLo, mHi],
  );

  React.useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    const loop = () => {
      if (accRef.current.count >= MAX_SAMPLES) {
        setPlaying(false);
        return;
      }
      drawSamples(4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced, drawSamples]);

  React.useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const acc = accRef.current;
  const obsMean = acc.count > 0 ? acc.sum / acc.count : 0;
  const obsSd =
    acc.count > 1 ? Math.sqrt(Math.max(0, acc.sumsq / acc.count - obsMean * obsMean) * (acc.count / (acc.count - 1))) : 0;

  /* --------------------------------------------------- population panel --- */

  const popPanel = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const info = resolve('var(--viz-cat-learning)', '#3987e5');
      const warn = resolve('var(--viz-cat-review)', '#d95926');

      const [lo, hi] = pop.range;
      const x = (v: number) => PAD.l + ((v - lo) / (hi - lo)) * plotW;
      const base = PAD.t + plotH;
      const maxCount = Math.max(1, ...popHist);
      const bw = plotW / POP_BINS;

      ctx.fillStyle = info;
      ctx.globalAlpha = 0.8;
      popHist.forEach((count, i) => {
        const bh = (count / maxCount) * plotH;
        ctx.fillRect(PAD.l + i * bw, base - bh, Math.max(1, bw - 1), bh);
      });
      ctx.globalAlpha = 1;

      // The most recent sample, as ticks where its values actually fell.
      const acc2 = accRef.current;
      ctx.strokeStyle = warn;
      ctx.lineWidth = 1.5;
      for (const v of acc2.last) {
        const px = x(Math.min(hi, Math.max(lo, v)));
        ctx.beginPath();
        ctx.moveTo(px, base + 2);
        ctx.lineTo(px, base + 8);
        ctx.stroke();
      }

      ctx.strokeStyle = axis;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(PAD.l, base);
      ctx.lineTo(w - PAD.r, base);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Population mean, for comparison with the right-hand panel.
      ctx.strokeStyle = axis;
      ctx.setLineDash([4, 3]);
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(x(pop.mean), PAD.t - 4);
      ctx.lineTo(x(pop.mean), base);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`μ = ${pop.mean.toFixed(2)}`, Math.min(w - 26, Math.max(26, x(pop.mean))), PAD.t - 6);
      ctx.textAlign = 'left';
      ctx.fillText(lo.toFixed(1), PAD.l, h - 6);
      ctx.textAlign = 'right';
      ctx.fillText(hi.toFixed(1), w - PAD.r, h - 6);
      ctx.textAlign = 'center';
      ctx.fillStyle = warn;
      if (acc2.last.length > 0) ctx.fillText(`the ${n} values in the last sample`, w / 2, h - 6);
    },
    [pop, popHist, tick, n],
  );

  /* ------------------------------------------ sampling-distribution panel --- */

  const meanPanel = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const series = resolve('var(--viz-series)', '#8164f7');
      const good = resolve('var(--viz-cat-mastered)', '#199e70');
      const warn = resolve('var(--viz-cat-review)', '#d95926');

      const x = (v: number) => PAD.l + ((v - mLo) / (mHi - mLo)) * plotW;
      const base = PAD.t + plotH;
      const acc2 = accRef.current;
      const binW = (mHi - mLo) / MEAN_BINS;

      // Both the bars and the curve are put on a density scale, so the overlay
      // is a prediction rather than a decoration.
      const normal = (v: number) => Math.exp(-((v - pop.mean) ** 2) / (2 * se * se)) / (se * Math.sqrt(2 * Math.PI));
      const peak = normal(pop.mean);
      const maxDensity = Math.max(
        peak,
        acc2.count > 0 ? Math.max(...acc2.bins) / (acc2.count * binW) : 0,
      );
      const y = (d: number) => base - (d / (maxDensity * 1.1)) * plotH;

      if (acc2.count > 0) {
        ctx.fillStyle = series;
        ctx.globalAlpha = 0.82;
        const bw = plotW / MEAN_BINS;
        acc2.bins.forEach((count, i) => {
          const density = count / (acc2.count * binW);
          const top = y(density);
          if (count > 0) ctx.fillRect(PAD.l + i * bw, top, Math.max(1, bw - 1), base - top);
        });
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = axis;
        ctx.font = '12px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Draw samples to build this', w / 2, PAD.t + plotH / 2);
      }

      // Normal(μ, σ/√n) — the theorem's actual claim.
      ctx.strokeStyle = good;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 160; i++) {
        const v = mLo + ((mHi - mLo) / 160) * i;
        const px = x(v);
        const py = y(normal(v));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.strokeStyle = axis;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PAD.l, base);
      ctx.lineTo(w - PAD.r, base);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Where the most recent sample's mean landed.
      if (acc2.lastMean !== null) {
        const px = x(Math.min(mHi, Math.max(mLo, acc2.lastMean)));
        ctx.strokeStyle = warn;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, base + 2);
        ctx.lineTo(px, base + 8);
        ctx.stroke();
      }

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(mLo.toFixed(2), PAD.l, h - 6);
      ctx.textAlign = 'right';
      ctx.fillText(mHi.toFixed(2), w - PAD.r, h - 6);
      ctx.textAlign = 'center';
      ctx.fillStyle = good;
      ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(`Normal(μ, σ/√n), SE = ${se.toFixed(3)}`, w / 2, PAD.t - 5);
    },
    [pop, se, mLo, mHi, tick],
  );

  const atCap = acc.count >= MAX_SAMPLES;

  return (
    <WidgetShell
      takeaway="The left histogram never becomes normal — more sampling does not straighten out a two-humped or long-tailed population. What goes normal is the right histogram, the distribution of the sample mean, and it does so even at n = 5 or 10. Watch the observed spread of the means track σ/√n: quadruple n and it halves."
      readout={
        <Readout
          items={[
            { label: 'Population μ', value: pop.mean.toFixed(3) },
            { label: 'Population σ', value: pop.sd.toFixed(3) },
            { label: 'Samples', value: acc.count.toLocaleString('en-US') },
            { label: 'Mean of means', value: acc.count > 0 ? obsMean.toFixed(3) : '—' },
            { label: 'SD of means', value: acc.count > 1 ? obsSd.toFixed(3) : '—', tone: 'good' },
            { label: 'Predicted σ/√n', value: se.toFixed(3), tone: 'warn' },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Population shape"
            value={popKey}
            onChange={setPopKey}
            options={POPULATIONS.map((p) => ({ value: p.key, label: p.label }))}
          />
          <Slider
            label="Sample size n"
            value={n}
            min={1}
            max={60}
            step={1}
            onChange={setN}
            format={(v) => String(v)}
            hint="n = 1 reproduces the population exactly — one value is its own mean. Every step up pulls the right-hand shape towards the normal curve."
          />
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => drawSamples(1)}
              disabled={atCap}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              Draw one sample
            </button>
            {[25, 250, 2000].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => drawSamples(k)}
                disabled={atCap}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[12px] font-medium tabular-nums text-muted transition-colors hover:text-ink disabled:opacity-40"
              >
                +{k.toLocaleString('en-US')}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {reduced ? (
              <>
                <p className="text-[11.5px] leading-relaxed text-subtle">
                  Continuous sampling is off because you have asked for reduced motion. The buttons above add samples a
                  batch at a time.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
                >
                  Reset
                </button>
              </>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => setPlaying((v) => !v)}
                onStep={() => drawSamples(1)}
                onReset={reset}
                label="continuous sampling"
              />
            )}
            <button
              type="button"
              onClick={() => setSeed((s) => (s % 997) + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New sample (seed {seed})
            </button>
          </div>
        </>
      }
    >
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-surface px-3 pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">The population</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted">{pop.note}</p>
          <div className="h-40 w-full">
            <canvas
              ref={popPanel.canvasRef}
              className="block"
              role="img"
              aria-label={`Histogram of the ${pop.label.toLowerCase()} population, mean ${pop.mean.toFixed(2)}, standard deviation ${pop.sd.toFixed(2)}`}
            />
          </div>
        </div>
        <div className="bg-surface px-3 pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Means of samples of {n}
          </p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted">
            {acc.count.toLocaleString('en-US')} sample means so far, against Normal(μ, σ/√n).
          </p>
          <div className="h-40 w-full">
            <canvas
              ref={meanPanel.canvasRef}
              className="block"
              role="img"
              aria-label={`Histogram of ${acc.count} sample means with a normal curve of standard error ${se.toFixed(3)} overlaid`}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          What the standard error does as n grows
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-1.5 pr-3 font-medium">n</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">σ/√n</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">Width of the middle 95%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[1, 4, 16, 64].map((k) => (
                <tr key={k} className={k === n ? 'text-ink' : 'text-muted'}>
                  <td className="py-1.5 pr-3 font-medium tabular-nums">{k}</td>
                  <td className="py-1.5 pr-3 tabular-nums">{(pop.sd / Math.sqrt(k)).toFixed(3)}</td>
                  <td className="py-1.5 pr-3 tabular-nums">±{((1.96 * pop.sd) / Math.sqrt(k)).toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Precision costs quadratically: going from n = 4 to n = 16 halves the standard error, and halving it again
          needs n = 64. The theorem also has limits — it is about means, it needs finite variance, and heavier skew
          needs a larger n before the normal curve fits well. Try the skewed population at n = 1, then n = 30.
        </p>
      </div>
    </WidgetShell>
  );
}
