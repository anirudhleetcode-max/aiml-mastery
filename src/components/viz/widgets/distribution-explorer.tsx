'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * Five distributions, one set of controls, and one insistent point.
 *
 * The thing learners get wrong is the y-axis. A normal curve with σ = 0.2 is
 * two units tall, and "2" is not a probability — it is a density, a
 * probability *per unit of x*. Only the shaded area is a probability, which is
 * why the shaded band, the number it produces, and the matching rise in the
 * CDF are drawn together: area under the density = rise in the CDF = the
 * probability. The rug of seeded draws underneath is the empirical check —
 * roughly that fraction of the sample lands in the band.
 *
 * The discrete distributions are the counter-example that makes the point
 * land: for the binomial and the Poisson the bar heights really are
 * probabilities, and they sum to one rather than integrating to one.
 */

/** Small, fast, seeded PRNG. Same seed, same draws, every time. */
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

/* ---------------------------------------------------------------- maths --- */

/** Abramowitz & Stegun 7.1.26 — plenty of accuracy for a plot and a readout. */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const z = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * z);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-z * z);
  return sign * y;
}

function normalCdf(x: number, mu: number, sigma: number): number {
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));
}

/** Lanczos log-gamma, used for binomial and Poisson masses without overflow. */
function lgamma(z: number): number {
  const g = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  const x = z - 1;
  let a = 0.99999999999980993;
  for (let i = 0; i < g.length; i++) a += g[i] / (x + i + 1);
  const t = x + g.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function logChoose(n: number, k: number): number {
  return lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1);
}

/** Standard normal draw (Box–Muller), fed from the seeded stream. */
function gauss(rng: () => number): number {
  const u = Math.max(1e-12, rng());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

/* --------------------------------------------------------- definitions --- */

type Params = Record<string, number>;

interface ParamSpec {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
}

interface Dist {
  key: string;
  label: string;
  /** Bar heights are probabilities; curve heights are densities. */
  discrete: boolean;
  /** The generative story — what has to happen in the world to produce this shape. */
  story: string;
  params: ParamSpec[];
  defaults: Params;
  mean: (p: Params) => number;
  variance: (p: Params) => number;
  /** Density at x for continuous, mass at integer x for discrete. */
  pdf: (x: number, p: Params) => number;
  /** P(X ≤ x). */
  cdf: (x: number, p: Params) => number;
  /** The x-range worth plotting. */
  domain: (p: Params) => [number, number];
  sample: (rng: () => number, p: Params) => number;
}

/** Uniform's two bounds have to stay ordered and non-degenerate however they are dragged. */
function uniBounds(p: Params): [number, number] {
  const a = Math.min(p.a, p.b);
  const b = Math.max(p.a, p.b);
  return b - a < 0.25 ? [a, a + 0.25] : [a, b];
}

const DISTS: Dist[] = [
  {
    key: 'normal',
    label: 'Normal',
    discrete: false,
    story: 'Many small independent nudges added together — heights, measurement error, sample means.',
    params: [
      { key: 'mu', label: 'Mean μ', min: -4, max: 4, step: 0.1, format: (v) => v.toFixed(1) },
      { key: 'sigma', label: 'Standard deviation σ', min: 0.2, max: 3, step: 0.05, format: (v) => v.toFixed(2) },
    ],
    defaults: { mu: 0, sigma: 1 },
    mean: (p) => p.mu,
    variance: (p) => p.sigma * p.sigma,
    pdf: (x, p) => Math.exp(-((x - p.mu) ** 2) / (2 * p.sigma * p.sigma)) / (p.sigma * Math.sqrt(2 * Math.PI)),
    cdf: (x, p) => normalCdf(x, p.mu, p.sigma),
    domain: (p) => [p.mu - 4 * p.sigma, p.mu + 4 * p.sigma],
    sample: (rng, p) => p.mu + p.sigma * gauss(rng),
  },
  {
    key: 'uniform',
    label: 'Uniform',
    discrete: false,
    story: 'Every value in a range equally plausible — a random seed, a phase, a fair spinner.',
    params: [
      { key: 'a', label: 'Lower limit a', min: -4, max: 4, step: 0.25, format: (v) => v.toFixed(2) },
      { key: 'b', label: 'Upper limit b', min: -4, max: 4, step: 0.25, format: (v) => v.toFixed(2) },
    ],
    defaults: { a: -1, b: 2 },
    mean: (p) => {
      const [a, b] = uniBounds(p);
      return (a + b) / 2;
    },
    variance: (p) => {
      const [a, b] = uniBounds(p);
      return (b - a) ** 2 / 12;
    },
    pdf: (x, p) => {
      const [a, b] = uniBounds(p);
      return x >= a && x <= b ? 1 / (b - a) : 0;
    },
    cdf: (x, p) => {
      const [a, b] = uniBounds(p);
      return x <= a ? 0 : x >= b ? 1 : (x - a) / (b - a);
    },
    domain: (p) => {
      const [a, b] = uniBounds(p);
      const pad = (b - a) * 0.25;
      return [a - pad, b + pad];
    },
    sample: (rng, p) => {
      const [a, b] = uniBounds(p);
      return a + rng() * (b - a);
    },
  },
  {
    key: 'binomial',
    label: 'Binomial',
    discrete: true,
    story: 'Count the successes in n independent trials that each succeed with probability p.',
    params: [
      { key: 'n', label: 'Trials n', min: 1, max: 40, step: 1, format: (v) => String(v) },
      { key: 'p', label: 'Success probability p', min: 0.02, max: 0.98, step: 0.01, format: (v) => v.toFixed(2) },
    ],
    defaults: { n: 20, p: 0.35 },
    mean: (p) => p.n * p.p,
    variance: (p) => p.n * p.p * (1 - p.p),
    pdf: (x, p) => {
      const k = Math.round(x);
      if (k < 0 || k > p.n || Math.abs(x - k) > 1e-9) return 0;
      return Math.exp(logChoose(p.n, k) + k * Math.log(p.p) + (p.n - k) * Math.log(1 - p.p));
    },
    cdf: (x, p) => {
      const top = Math.floor(x + 1e-9);
      if (top < 0) return 0;
      let s = 0;
      for (let k = 0; k <= Math.min(top, p.n); k++) {
        s += Math.exp(logChoose(p.n, k) + k * Math.log(p.p) + (p.n - k) * Math.log(1 - p.p));
      }
      return Math.min(1, s);
    },
    domain: (p) => [0, p.n],
    sample: (rng, p) => {
      let k = 0;
      for (let i = 0; i < p.n; i++) if (rng() < p.p) k++;
      return k;
    },
  },
  {
    key: 'poisson',
    label: 'Poisson',
    discrete: true,
    story: 'Count of rare independent events in a fixed window — arrivals per minute, typos per page.',
    params: [{ key: 'lambda', label: 'Rate λ', min: 0.2, max: 20, step: 0.1, format: (v) => v.toFixed(1) }],
    defaults: { lambda: 4 },
    mean: (p) => p.lambda,
    variance: (p) => p.lambda,
    pdf: (x, p) => {
      const k = Math.round(x);
      if (k < 0 || Math.abs(x - k) > 1e-9) return 0;
      return Math.exp(k * Math.log(p.lambda) - p.lambda - lgamma(k + 1));
    },
    cdf: (x, p) => {
      const top = Math.floor(x + 1e-9);
      if (top < 0) return 0;
      let s = 0;
      for (let k = 0; k <= top; k++) s += Math.exp(k * Math.log(p.lambda) - p.lambda - lgamma(k + 1));
      return Math.min(1, s);
    },
    domain: (p) => [0, Math.max(6, Math.ceil(p.lambda + 4 * Math.sqrt(p.lambda) + 2))],
    sample: (rng, p) => {
      // Knuth's method: multiply uniforms until the product drops below e^-λ.
      const limit = Math.exp(-p.lambda);
      let k = 0;
      let prod = rng();
      while (prod > limit && k < 400) {
        k++;
        prod *= rng();
      }
      return k;
    },
  },
  {
    key: 'exponential',
    label: 'Exponential',
    discrete: false,
    story: 'Waiting time until the next Poisson event — memoryless, so waiting longer buys you nothing.',
    params: [{ key: 'lambda', label: 'Rate λ', min: 0.2, max: 4, step: 0.05, format: (v) => v.toFixed(2) }],
    defaults: { lambda: 1 },
    mean: (p) => 1 / p.lambda,
    variance: (p) => 1 / (p.lambda * p.lambda),
    pdf: (x, p) => (x < 0 ? 0 : p.lambda * Math.exp(-p.lambda * x)),
    cdf: (x, p) => (x <= 0 ? 0 : 1 - Math.exp(-p.lambda * x)),
    domain: (p) => [0, 6 / p.lambda],
    sample: (rng, p) => -Math.log(Math.max(1e-12, rng())) / p.lambda,
  },
];

const PAD = { l: 36, r: 12, t: 14, b: 26 };
const RUG_H = 13;
const DRAWS = 240;

function fmt(v: number, digits = 3): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) >= 1000) return v.toFixed(0);
  return v.toFixed(digits);
}

export default function DistributionExplorer() {
  const [key, setKey] = React.useState('normal');
  const [allParams, setAllParams] = React.useState<Record<string, Params>>(() =>
    Object.fromEntries(DISTS.map((d) => [d.key, { ...d.defaults }])),
  );
  const [bounds, setBounds] = React.useState<[number, number]>([-1.4, 1.4]);
  const [seed, setSeed] = React.useState(11);

  const dist = DISTS.find((d) => d.key === key) ?? DISTS[0];
  const p = allParams[dist.key];
  const [dLo, dHi] = dist.domain(p);
  // Discrete bars are centred on integers, so the drawn range is padded by half
  // a step at each end — otherwise the first and last bars are sliced in two.
  const vLo = dist.discrete ? dLo - 0.5 : dLo;
  const vHi = dist.discrete ? dHi + 0.5 : dHi;

  // A new distribution is a new question: put the band back where it can be seen.
  React.useEffect(() => {
    const d = DISTS.find((x) => x.key === key) ?? DISTS[0];
    const [lo, hi] = d.domain(allParams[d.key]);
    setBounds([lo + (hi - lo) * 0.35, lo + (hi - lo) * 0.65]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Parameters can move the domain out from under the band; keep it inside.
  React.useEffect(() => {
    setBounds(([b0, b1]) => {
      const n0 = Math.min(Math.max(b0, dLo), dHi);
      const n1 = Math.min(Math.max(b1, dLo), dHi);
      if (!(n1 > n0)) return [dLo + (dHi - dLo) * 0.35, dLo + (dHi - dLo) * 0.65];
      return [n0, n1];
    });
  }, [dLo, dHi]);

  // Integers only for the discrete distributions — a band from 2.3 to 5.8 heads is not a thing.
  const b0 = dist.discrete ? Math.round(Math.max(bounds[0], dLo)) : bounds[0];
  const b1 = dist.discrete ? Math.round(Math.min(bounds[1], dHi)) : bounds[1];

  const mean = dist.mean(p);
  const variance = dist.variance(p);
  const sd = Math.sqrt(Math.max(0, variance));
  const prob = dist.discrete
    ? Math.max(0, dist.cdf(b1, p) - dist.cdf(b0 - 1, p))
    : Math.max(0, dist.cdf(b1, p) - dist.cdf(b0, p));

  // A seeded sample, so the empirical rug can be compared with the exact area.
  const draws = React.useMemo(() => {
    const rng = mulberry32(seed * 7919 + 13);
    return Array.from({ length: DRAWS }, () => ({ x: dist.sample(rng, p), j: rng() }));
  }, [seed, dist, p]);

  const inBand = draws.filter((d) =>
    dist.discrete ? Math.round(d.x) >= b0 && Math.round(d.x) <= b1 : d.x >= b0 && d.x <= b1,
  ).length;

  /* ------------------------------------------------------- density plot --- */

  const density = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b - RUG_H;
      if (plotW <= 0 || plotH <= 0) return;

      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(128,128,128,0.25)');
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const series = resolve('var(--viz-series)', '#8164f7');
      const soft = resolve('var(--viz-series-soft)', '#a78bfa');
      const muted = resolve('var(--viz-cat-none)', '#7c8496');

      const base = PAD.t + plotH;
      const x = (v: number) => PAD.l + ((v - vLo) / (vHi - vLo)) * plotW;

      let yMax = 0;
      if (dist.discrete) {
        for (let k = Math.ceil(dLo); k <= Math.floor(dHi); k++) yMax = Math.max(yMax, dist.pdf(k, p));
      } else {
        for (let i = 0; i <= 240; i++) yMax = Math.max(yMax, dist.pdf(dLo + ((dHi - dLo) / 240) * i, p));
      }
      yMax = Math.max(1e-9, yMax) * 1.15;
      const y = (v: number) => base - (v / yMax) * plotH;

      // Horizontal grid, labelled on the left so the density scale is legible.
      ctx.font = '10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 3; i++) {
        const value = (yMax / 3) * i;
        const gy = y(value);
        ctx.strokeStyle = grid;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(PAD.l, gy);
        ctx.lineTo(w - PAD.r, gy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = axis;
        ctx.fillText(value.toFixed(value < 1 ? 2 : 1), PAD.l - 5, gy + 3.5);
      }

      if (dist.discrete) {
        const kLo = Math.ceil(dLo);
        const kHi = Math.floor(dHi);
        const slot = plotW / (kHi - kLo + 1);
        const bw = Math.max(1.5, Math.min(slot * 0.74, 22));
        for (let k = kLo; k <= kHi; k++) {
          const mass = dist.pdf(k, p);
          const cx = x(k);
          const inside = k >= b0 && k <= b1;
          ctx.fillStyle = inside ? series : muted;
          ctx.globalAlpha = inside ? 0.95 : 0.4;
          const top = y(mass);
          ctx.fillRect(cx - bw / 2, top, bw, Math.max(0.5, base - top));
          ctx.globalAlpha = 1;
        }
      } else {
        // Shaded band first, then the curve on top of it.
        ctx.fillStyle = series;
        ctx.globalAlpha = 0.24;
        ctx.beginPath();
        ctx.moveTo(x(b0), base);
        const steps = 160;
        for (let i = 0; i <= steps; i++) {
          const xv = b0 + ((b1 - b0) / steps) * i;
          ctx.lineTo(x(xv), y(dist.pdf(xv, p)));
        }
        ctx.lineTo(x(b1), base);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.strokeStyle = series;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        for (let i = 0; i <= 320; i++) {
          const xv = dLo + ((dHi - dLo) / 320) * i;
          const px = x(xv);
          const py = y(dist.pdf(xv, p));
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Baseline
      ctx.strokeStyle = axis;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PAD.l, base);
      ctx.lineTo(w - PAD.r, base);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // The seeded draws, as a rug under the axis. Ticks inside the band are
      // the empirical counterpart of the shaded area.
      for (const d of draws) {
        const inside = dist.discrete ? Math.round(d.x) >= b0 && Math.round(d.x) <= b1 : d.x >= b0 && d.x <= b1;
        const px = x(d.x);
        if (px < PAD.l - 1 || px > w - PAD.r + 1) continue;
        ctx.strokeStyle = inside ? soft : muted;
        ctx.globalAlpha = inside ? 0.85 : 0.45;
        ctx.lineWidth = 1;
        const ty = base + 3 + d.j * (RUG_H - 6);
        ctx.beginPath();
        ctx.moveTo(px, ty);
        ctx.lineTo(px, ty + 3.5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Draggable bounds. For the discrete cases they sit on the bar edges, so
      // the shaded set is unambiguous.
      const hx0 = x(dist.discrete ? b0 - 0.5 : b0);
      const hx1 = x(dist.discrete ? b1 + 0.5 : b1);
      for (const hx of [hx0, hx1]) {
        ctx.strokeStyle = series;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(hx, PAD.t - 2);
        ctx.lineTo(hx, base + RUG_H);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = series;
        ctx.beginPath();
        ctx.moveTo(hx, base + RUG_H + 1);
        ctx.lineTo(hx - 4.5, base + RUG_H + 8);
        ctx.lineTo(hx + 4.5, base + RUG_H + 8);
        ctx.closePath();
        ctx.fill();
      }

      // x labels: the domain ends plus the two bounds.
      ctx.font = '10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = axis;
      ctx.textAlign = 'left';
      ctx.fillText(fmt(dLo, dist.discrete ? 0 : 1), PAD.l, h - 4);
      ctx.textAlign = 'right';
      ctx.fillText(fmt(dHi, dist.discrete ? 0 : 1), w - PAD.r, h - 4);
      ctx.textAlign = 'center';
      ctx.fillStyle = series;
      ctx.font = '600 10.5px ui-sans-serif, system-ui, sans-serif';
      const labelY = h - 4;
      const l0 = fmt(b0, dist.discrete ? 0 : 2);
      const l1 = fmt(b1, dist.discrete ? 0 : 2);
      if (hx1 - hx0 > 46) {
        ctx.fillText(l0, Math.min(w - PAD.r - 14, Math.max(PAD.l + 14, hx0)), labelY);
        ctx.fillText(l1, Math.min(w - PAD.r - 14, Math.max(PAD.l + 14, hx1)), labelY);
      } else {
        ctx.fillText(`${l0} – ${l1}`, Math.min(w - PAD.r - 30, Math.max(PAD.l + 30, (hx0 + hx1) / 2)), labelY);
      }

      // Says out loud what the y-axis is.
      ctx.textAlign = 'left';
      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(dist.discrete ? 'probability P(X = k)' : 'density (not probability)', PAD.l + 2, PAD.t + 1);
    },
    [dist, p, b0, b1, vLo, vHi, draws],
  );

  /* ----------------------------------------------------------- CDF plot --- */

  const cdf = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - 18;
      if (plotW <= 0 || plotH <= 0) return;

      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(128,128,128,0.25)');
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const series = resolve('var(--viz-series)', '#8164f7');
      const info = resolve('var(--viz-cat-learning)', '#3987e5');

      const x = (v: number) => PAD.l + ((v - vLo) / (vHi - vLo)) * plotW;
      const y = (v: number) => PAD.t + plotH - v * plotH;

      ctx.font = '10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      for (const v of [0, 0.5, 1]) {
        ctx.strokeStyle = grid;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(PAD.l, y(v));
        ctx.lineTo(w - PAD.r, y(v));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = axis;
        ctx.fillText(v.toFixed(1), PAD.l - 5, y(v) + 3.5);
      }

      ctx.strokeStyle = series;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (dist.discrete) {
        // A step per integer: the jump height is exactly that outcome's probability.
        let prev = 0;
        ctx.moveTo(x(dLo), y(0));
        for (let k = Math.ceil(dLo); k <= Math.floor(dHi); k++) {
          const c = dist.cdf(k, p);
          ctx.lineTo(x(k), y(prev));
          ctx.lineTo(x(k), y(c));
          prev = c;
        }
        ctx.lineTo(x(dHi), y(prev));
      } else {
        for (let i = 0; i <= 320; i++) {
          const xv = dLo + ((dHi - dLo) / 320) * i;
          const px = x(xv);
          const py = y(dist.cdf(xv, p));
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      // The same probability, read as a rise: F(upper) − F(lower).
      const lo = dist.discrete ? dist.cdf(b0 - 1, p) : dist.cdf(b0, p);
      const hi = dist.cdf(b1, p);
      const hx0 = x(dist.discrete ? b0 - 0.5 : b0);
      const hx1 = x(dist.discrete ? b1 + 0.5 : b1);

      ctx.strokeStyle = info;
      ctx.lineWidth = 1.25;
      ctx.setLineDash([3, 3]);
      for (const [px, v] of [
        [hx0, lo],
        [hx1, hi],
      ] as const) {
        ctx.beginPath();
        ctx.moveTo(PAD.l, y(v));
        ctx.lineTo(px, y(v));
        ctx.lineTo(px, PAD.t + plotH);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // The gap between the two levels is the shaded area from the panel above.
      const gapX = Math.min(w - PAD.r - 6, hx1 + 10);
      ctx.strokeStyle = info;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gapX, y(lo));
      ctx.lineTo(gapX, y(hi));
      ctx.stroke();
      for (const v of [lo, hi]) {
        ctx.fillStyle = info;
        ctx.beginPath();
        ctx.arc(gapX, y(v), 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = info;
      ctx.font = '600 10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = gapX > w * 0.72 ? 'right' : 'left';
      ctx.fillText(
        `rise = ${(hi - lo).toFixed(3)}`,
        gapX + (gapX > w * 0.72 ? -6 : 6),
        Math.max(PAD.t + 10, (y(lo) + y(hi)) / 2 + 3.5),
      );

      ctx.fillStyle = axis;
      ctx.textAlign = 'left';
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('CDF: P(X ≤ x)', PAD.l + 2, h - 5);
    },
    [dist, p, b0, b1, vLo, vHi],
  );

  /* ----------------------------------------------------------- dragging --- */

  const dragRef = React.useRef<0 | 1 | null>(null);

  const valueAt = React.useCallback(
    (clientX: number): number | null => {
      const el = density.canvasRef.current;
      const plotW = density.size.w - PAD.l - PAD.r;
      if (!el || plotW <= 0) return null;
      const rect = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (clientX - rect.left - PAD.l) / plotW));
      return Math.min(dHi, Math.max(dLo, vLo + t * (vHi - vLo)));
    },
    [density.canvasRef, density.size.w, dLo, dHi, vLo, vHi],
  );

  const moveHandle = React.useCallback(
    (which: 0 | 1, v: number) => {
      const gap = dist.discrete ? 0 : (dHi - dLo) * 0.01;
      setBounds(([c0, c1]) =>
        which === 0 ? [Math.min(v, c1 - gap), c1] : [c0, Math.max(v, c0 + gap)],
      );
    },
    [dist.discrete, dHi, dLo],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const v = valueAt(e.clientX);
    if (v === null) return;
    const which: 0 | 1 = Math.abs(v - b0) <= Math.abs(v - b1) ? 0 : 1;
    dragRef.current = which;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveHandle(which, v);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragRef.current === null) return;
    const v = valueAt(e.clientX);
    if (v !== null) moveHandle(dragRef.current, v);
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const boundStep = dist.discrete ? 1 : Math.max(0.01, (dHi - dLo) / 200);
  const empirical = inBand / DRAWS;

  return (
    <WidgetShell
      takeaway="The height of a density curve is not a probability — set σ below 0.4 and the normal curve climbs past 1. Only area is probability: the shaded region, the rise in the CDF below it and the fraction of draws in the rug are three views of the same number. For the binomial and Poisson the bars really are probabilities, because there is no width to integrate over."
      readout={
        <Readout
          items={[
            { label: 'Mean', value: fmt(mean) },
            { label: 'Variance', value: fmt(variance) },
            { label: 'SD', value: fmt(sd) },
            {
              label: dist.discrete ? `P(${fmt(b0, 0)} ≤ X ≤ ${fmt(b1, 0)})` : `P(${fmt(b0, 2)} < X < ${fmt(b1, 2)})`,
              value: prob.toFixed(4),
              tone: 'good',
            },
            { label: `${DRAWS} draws in band`, value: `${inBand} (${empirical.toFixed(3)})` },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Distribution"
            value={key}
            onChange={setKey}
            options={DISTS.map((d) => ({ value: d.key, label: d.label }))}
          />
          {dist.params.map((spec) => (
            <Slider
              key={`${dist.key}-${spec.key}`}
              label={spec.label}
              value={p[spec.key]}
              min={spec.min}
              max={spec.max}
              step={spec.step}
              onChange={(v) =>
                setAllParams((prev) => ({ ...prev, [dist.key]: { ...prev[dist.key], [spec.key]: v } }))
              }
              format={spec.format}
            />
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider
              label="Lower bound"
              value={b0}
              min={dLo}
              max={dHi}
              step={boundStep}
              onChange={(v) => moveHandle(0, v)}
              format={(v) => fmt(v, dist.discrete ? 0 : 2)}
            />
            <Slider
              label="Upper bound"
              value={b1}
              min={dLo}
              max={dHi}
              step={boundStep}
              onChange={(v) => moveHandle(1, v)}
              format={(v) => fmt(v, dist.discrete ? 0 : 2)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSeed((s) => (s % 499) + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New sample (seed {seed})
            </button>
            <button
              type="button"
              onClick={() => setAllParams((prev) => ({ ...prev, [dist.key]: { ...dist.defaults } }))}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              Reset parameters
            </button>
            <p className="text-[11px] leading-relaxed text-subtle">Drag either dashed line on the chart to move the band.</p>
          </div>
        </>
      }
    >
      <div className="h-56 w-full touch-none">
        <canvas
          ref={density.canvasRef}
          className="block cursor-ew-resize"
          role="img"
          aria-label={`${dist.label} ${dist.discrete ? 'probability mass' : 'density'} with the region from ${fmt(b0, 2)} to ${fmt(b1, 2)} shaded, holding probability ${prob.toFixed(3)}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />
      </div>
      <div className="h-32 w-full border-t border-line">
        <canvas
          ref={cdf.canvasRef}
          className="block"
          role="img"
          aria-label={`Cumulative distribution for the ${dist.label} distribution, rising by ${prob.toFixed(3)} across the shaded region`}
        />
      </div>
      <div className="border-t border-line px-4 py-3">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Where this shape comes from</p>
        <p className="text-[12px] leading-relaxed text-muted">{dist.story}</p>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          {dist.discrete
            ? 'Discrete: every bar is a probability in its own right, and the bars sum to 1.'
            : 'Continuous: P(X = any exact value) is 0, so questions have to be asked about intervals. Multiply density by a small width to get a probability.'}
        </p>
      </div>
    </WidgetShell>
  );
}
