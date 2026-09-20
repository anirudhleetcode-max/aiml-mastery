'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * The derivative as a second curve, not as a rule.
 *
 * A learner can differentiate x² long before they can say what 2x *is*. The
 * gap closes when the two plots sit one above the other on a shared x-axis:
 * drag the point along the top curve and the dot on the bottom curve tracks
 * it, crossing zero at precisely the moment the tangent goes flat. Turning
 * points on top, zero crossings underneath — same x, every time. That is the
 * fact the whole of gradient descent stands on.
 *
 * The secant is the other half. With h at 2 it is visibly the wrong line;
 * shrink h and it rotates into the tangent while the numeric error in the
 * readout falls away. That is the limit definition, performed rather than
 * stated.
 *
 * Everything is analytic and deterministic — there is no sampling and no
 * randomness anywhere in this widget.
 */

interface Curve {
  key: string;
  label: string;
  expr: string;
  dexpr: string;
  f: (x: number) => number;
  df: (x: number) => number;
  domain: [number, number];
  note: string;
}

const CURVES: Curve[] = [
  {
    key: 'square',
    label: 'x²',
    expr: 'f(x) = x²',
    dexpr: "f'(x) = 2x",
    f: (x) => x * x,
    df: (x) => 2 * x,
    domain: [-3, 3],
    note: 'The derivative is a straight line through the origin: the slope grows steadily, and is negative on the whole left half.',
  },
  {
    key: 'sin',
    label: 'sin x',
    expr: 'f(x) = sin x',
    dexpr: "f'(x) = cos x",
    f: Math.sin,
    df: Math.cos,
    domain: [-6.3, 6.3],
    note: 'Differentiating shifts the wave a quarter turn. Every peak of sin sits above a zero of cos.',
  },
  {
    key: 'cubic',
    label: 'x³ − 3x',
    expr: 'f(x) = x³ − 3x',
    dexpr: "f'(x) = 3x² − 3",
    f: (x) => x * x * x - 3 * x,
    df: (x) => 3 * x * x - 3,
    domain: [-2.6, 2.6],
    note: 'Two turning points, and the derivative is a parabola that crosses zero at exactly those two places: x = −1 and x = 1.',
  },
  {
    key: 'exp',
    label: 'eˣ',
    expr: 'f(x) = eˣ',
    dexpr: "f'(x) = eˣ",
    f: Math.exp,
    df: Math.exp,
    domain: [-3, 2],
    note: 'The one curve that is its own derivative. The two plots are the same shape, which is why e turns up everywhere.',
  },
  {
    key: 'log',
    label: 'log x',
    expr: 'f(x) = ln x',
    dexpr: "f'(x) = 1 / x",
    f: Math.log,
    df: (x) => 1 / x,
    domain: [0.12, 6],
    note: 'Always rising, never turning: the derivative is positive everywhere but sinks toward zero, which is why log flattens large numbers.',
  },
];

/** Resolves a design token to something a canvas can paint. */
function makeResolve() {
  const style = getComputedStyle(document.documentElement);
  const expand = (input: string, depth: number): string =>
    depth > 4
      ? input
      : input.replace(/var\((--[a-z0-9-]+)\)/g, (_m, name: string) => expand(style.getPropertyValue(name).trim(), depth + 1));
  return (token: string, fallback: string) => {
    const out = expand(token, 0).trim();
    return out === '' || out.includes('var(') ? fallback : out;
  };
}

const PAD = { l: 40, r: 12, t: 12, b: 20 };

function rangeOf(g: (x: number) => number, [lo, hi]: [number, number]): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i <= 200; i++) {
    const v = g(lo + ((hi - lo) * i) / 200);
    if (!Number.isFinite(v)) continue;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [-1, 1];
  const pad = Math.max(0.35, (max - min) * 0.12);
  return [min - pad, max + pad];
}

/** Zeros of the derivative, found by scanning for sign changes — the turning points. */
function turningPoints(curve: Curve): number[] {
  const [lo, hi] = curve.domain;
  const out: number[] = [];
  const steps = 600;
  let prev = curve.df(lo);
  for (let i = 1; i <= steps; i++) {
    const x = lo + ((hi - lo) * i) / steps;
    const v = curve.df(x);
    if (Number.isFinite(prev) && Number.isFinite(v) && prev !== 0 && prev * v < 0) {
      // Bisect for a clean value, so the label reads −1.00 and not −0.997.
      let a = lo + ((hi - lo) * (i - 1)) / steps;
      let b = x;
      for (let k = 0; k < 40; k++) {
        const mid = (a + b) / 2;
        if (curve.df(a) * curve.df(mid) <= 0) b = mid;
        else a = mid;
      }
      out.push((a + b) / 2);
    }
    prev = v;
  }
  return out;
}

export default function DerivativeExplorer({ props }: { props?: Record<string, unknown> }) {
  void props;
  const reduced = usePrefersReducedMotion();
  const [key, setKey] = React.useState('cubic');
  const curve = CURVES.find((c) => c.key === key) ?? CURVES[2];
  const [lo, hi] = curve.domain;

  const [x0, setX0] = React.useState(-1.7);
  const [showSecant, setShowSecant] = React.useState(true);
  const [h, setH] = React.useState(1.2);
  const [playing, setPlaying] = React.useState(false);

  // Keep the point inside whichever curve is on screen.
  React.useEffect(() => {
    setX0((p) => Math.max(lo + (hi - lo) * 0.05, Math.min(hi - (hi - lo) * 0.05, p)));
  }, [lo, hi]);

  // h shrinking toward zero is the limit definition, animated. Reduced motion
  // gets the Step button instead, which halves h on each press.
  React.useEffect(() => {
    if (!playing || reduced || !showSecant) return;
    let raf = 0;
    const tick = () => {
      let done = false;
      setH((prev) => {
        const next = prev * 0.972;
        if (next <= 0.01) {
          done = true;
          return 0.01;
        }
        return Math.round(next * 10000) / 10000;
      });
      if (done) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced, showSecant]);

  React.useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const turns = React.useMemo(() => turningPoints(curve), [curve]);
  const fRange = React.useMemo(() => rangeOf(curve.f, curve.domain), [curve]);
  const dRange = React.useMemo(() => rangeOf(curve.df, curve.domain), [curve]);

  const slope = curve.df(x0);
  const x1 = Math.min(hi, x0 + h);
  const secant = (curve.f(x1) - curve.f(x0)) / Math.max(1e-9, x1 - x0);
  const error = Math.abs(secant - slope);

  /** Shared x-mapping, so both canvases put the same x in the same column. */
  const makeX = (w: number) => (x: number) => PAD.l + ((x - lo) / (hi - lo)) * (w - PAD.l - PAD.r);
  const makeY = (hh: number, [a, b]: [number, number]) => (v: number) =>
    PAD.t + (hh - PAD.t - PAD.b) * (1 - (v - a) / Math.max(1e-9, b - a));

  const drawCurve = React.useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      hh: number,
      g: (x: number) => number,
      yr: [number, number],
      color: string,
    ) => {
      const X = makeX(w);
      const Y = makeY(hh, yr);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= 320; i++) {
        const x = lo + ((hi - lo) * i) / 320;
        const v = g(x);
        if (!Number.isFinite(v) || v < yr[0] - (yr[1] - yr[0]) || v > yr[1] + (yr[1] - yr[0])) {
          started = false;
          continue;
        }
        if (!started) {
          ctx.moveTo(X(x), Y(v));
          started = true;
        } else ctx.lineTo(X(x), Y(v));
      }
      ctx.stroke();
    },
    // makeX and makeY are pure functions of PAD and the domain, so the domain
    // is the only dependency that matters here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lo, hi],
  );

  const top = useResponsiveCanvas(
    (ctx, w, hh) => {
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(128,128,128,0.3)');
      const axis = resolve('var(--viz-axis)', '#8a8a8a');
      const series = resolve('var(--viz-series)', '#8164f7');
      const good = resolve('var(--viz-cat-mastered)', '#199e70');
      const warn = resolve('var(--viz-cat-review)', '#d95926');
      const muted = resolve('var(--viz-cat-none)', '#4a5265');

      const X = makeX(w);
      const Y = makeY(hh, fRange);

      // axes
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      if (fRange[0] < 0 && fRange[1] > 0) {
        ctx.beginPath();
        ctx.moveTo(PAD.l, Y(0));
        ctx.lineTo(w - PAD.r, Y(0));
        ctx.stroke();
      }
      if (lo < 0 && hi > 0) {
        ctx.beginPath();
        ctx.moveTo(X(0), PAD.t);
        ctx.lineTo(X(0), hh - PAD.b);
        ctx.stroke();
      }

      // turning points, marked on both plots at the same x
      ctx.strokeStyle = muted;
      ctx.setLineDash([3, 4]);
      for (const t of turns) {
        ctx.beginPath();
        ctx.moveTo(X(t), PAD.t);
        ctx.lineTo(X(t), hh - PAD.b);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      drawCurve(ctx, w, hh, curve.f, fRange, series);

      // secant first, so the tangent sits on top of it
      if (showSecant) {
        const y0 = curve.f(x0);
        const y1 = curve.f(x1);
        ctx.strokeStyle = warn;
        ctx.lineWidth = 1.6;
        const ext = (hi - lo) * 0.6;
        ctx.beginPath();
        ctx.moveTo(X(x0 - ext), Y(y0 - secant * ext));
        ctx.lineTo(X(x1 + ext), Y(y1 + secant * ext));
        ctx.stroke();
        ctx.fillStyle = warn;
        ctx.beginPath();
        ctx.arc(X(x1), Y(y1), 3.4, 0, Math.PI * 2);
        ctx.fill();
        // the rise-over-run triangle
        ctx.strokeStyle = warn;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(X(x0), Y(y0));
        ctx.lineTo(X(x1), Y(y0));
        ctx.lineTo(X(x1), Y(y1));
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // tangent
      const y0 = curve.f(x0);
      ctx.strokeStyle = good;
      ctx.lineWidth = 2;
      const ext = (hi - lo) * 0.45;
      ctx.beginPath();
      ctx.moveTo(X(x0 - ext), Y(y0 - slope * ext));
      ctx.lineTo(X(x0 + ext), Y(y0 + slope * ext));
      ctx.stroke();

      ctx.fillStyle = good;
      ctx.beginPath();
      ctx.arc(X(x0), Y(y0), 5, 0, Math.PI * 2);
      ctx.fill();

      // labels
      ctx.fillStyle = axis;
      ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(curve.expr, PAD.l + 4, PAD.t + 10);
      ctx.textAlign = 'right';
      ctx.fillText(fRange[1].toFixed(1), PAD.l - 5, PAD.t + 8);
      ctx.fillText(fRange[0].toFixed(1), PAD.l - 5, hh - PAD.b);
    },
    [curve, x0, h, showSecant, fRange, turns, slope, secant, x1, drawCurve],
  );

  const bottom = useResponsiveCanvas(
    (ctx, w, hh) => {
      const resolve = makeResolve();
      const grid = resolve('var(--viz-grid)', 'rgba(128,128,128,0.3)');
      const axis = resolve('var(--viz-axis)', '#8a8a8a');
      const info = resolve('var(--viz-cat-learning)', '#3987e5');
      const good = resolve('var(--viz-cat-mastered)', '#199e70');
      const muted = resolve('var(--viz-cat-none)', '#4a5265');
      const danger = resolve('hsl(var(--c-danger))', '#e0435f');

      const X = makeX(w);
      const Y = makeY(hh, dRange);

      // The zero line is the whole point of this panel, so it is drawn loud.
      if (dRange[0] < 0 && dRange[1] > 0) {
        ctx.strokeStyle = danger;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(PAD.l, Y(0));
        ctx.lineTo(w - PAD.r, Y(0));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = danger;
        ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText("f' = 0", PAD.l + 3, Y(0) - 4);
      }

      if (lo < 0 && hi > 0) {
        ctx.strokeStyle = grid;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(X(0), PAD.t);
        ctx.lineTo(X(0), hh - PAD.b);
        ctx.stroke();
      }

      ctx.strokeStyle = muted;
      ctx.setLineDash([3, 4]);
      for (const t of turns) {
        ctx.beginPath();
        ctx.moveTo(X(t), PAD.t);
        ctx.lineTo(X(t), hh - PAD.b);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      drawCurve(ctx, w, hh, curve.df, dRange, info);

      const dv = curve.df(x0);
      if (Number.isFinite(dv)) {
        ctx.strokeStyle = good;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(X(x0), PAD.t);
        ctx.lineTo(X(x0), hh - PAD.b);
        ctx.stroke();
        ctx.fillStyle = good;
        ctx.beginPath();
        ctx.arc(X(x0), Y(Math.max(dRange[0], Math.min(dRange[1], dv))), 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = axis;
      ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(curve.dexpr, PAD.l + 4, PAD.t + 10);
      ctx.textAlign = 'right';
      ctx.fillText(dRange[1].toFixed(1), PAD.l - 5, PAD.t + 8);
      ctx.fillText(dRange[0].toFixed(1), PAD.l - 5, hh - PAD.b);
      ctx.textAlign = 'center';
      ctx.fillText(lo.toFixed(1), PAD.l + 8, hh - 5);
      ctx.fillText(hi.toFixed(1), w - PAD.r - 8, hh - 5);
    },
    [curve, x0, dRange, turns, drawCurve],
  );

  const pickX = (clientX: number, el: HTMLCanvasElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const w = rect.width;
    const t = (clientX - rect.left - PAD.l) / Math.max(1, w - PAD.l - PAD.r);
    const x = lo + Math.max(0, Math.min(1, t)) * (hi - lo);
    setX0(Math.round(x * 100) / 100);
  };

  const slopeWord = Math.abs(slope) < 0.02 ? 'flat — a turning point' : slope > 0 ? 'rising' : 'falling';

  const readoutItems: { label: string; value: string; tone?: 'default' | 'good' | 'warn' | 'bad' }[] = [
    { label: 'x', value: x0.toFixed(2) },
    { label: 'f(x)', value: curve.f(x0).toFixed(3) },
    { label: "f'(x)", value: slope.toFixed(3), tone: Math.abs(slope) < 0.02 ? 'warn' : slope > 0 ? 'good' : 'bad' },
  ];
  if (showSecant) {
    readoutItems.push({ label: 'secant', value: secant.toFixed(3) });
    readoutItems.push({ label: 'error', value: error.toFixed(4), tone: error < 0.02 ? 'good' : 'default' });
  }

  return (
    <WidgetShell
      takeaway="The bottom curve is the slope of the top one, plotted against the same x. Wherever the top curve turns over, the bottom curve crosses zero — that crossing is exactly what an optimiser is hunting for when it looks for a minimum."
      readout={<Readout items={readoutItems} />}
      controls={
        <>
          <Toggle
            label="Curve"
            value={key}
            onChange={(v) => setKey(v)}
            options={CURVES.map((c) => ({ value: c.key, label: c.label }))}
          />
          <p className="-mt-1 text-[11.5px] leading-relaxed text-subtle">{curve.note}</p>
          <Slider
            label="Point x"
            value={x0}
            min={Math.round((lo + (hi - lo) * 0.04) * 100) / 100}
            max={Math.round((hi - (hi - lo) * 0.04) * 100) / 100}
            step={0.01}
            onChange={setX0}
            format={(v) => v.toFixed(2)}
            hint={`The tangent is ${slopeWord}. Drag the top plot directly if you prefer.`}
          />
          <label className="flex items-center gap-2 text-[12px] text-muted">
            <input
              type="checkbox"
              checked={showSecant}
              onChange={(e) => {
                setShowSecant(e.target.checked);
                if (!e.target.checked) setPlaying(false);
              }}
              className="accent-[hsl(var(--c-primary))]"
            />
            Show the secant through x and x + h
          </label>
          {showSecant && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <Slider
                  className="min-w-[10rem] flex-1"
                  label="Gap h"
                  value={h}
                  min={0.01}
                  max={2}
                  step={0.01}
                  onChange={(v) => {
                    setPlaying(false);
                    setH(v);
                  }}
                  format={(v) => v.toFixed(2)}
                />
                <PlayButton
                  playing={playing && !reduced}
                  onToggle={() => {
                    if (reduced) setH((p) => Math.max(0.01, Math.round((p / 2) * 100) / 100));
                    else setPlaying((p) => !p);
                  }}
                  onStep={() => {
                    setPlaying(false);
                    setH((p) => Math.max(0.01, Math.round((p / 2) * 100) / 100));
                  }}
                  onReset={() => {
                    setPlaying(false);
                    setH(1.2);
                  }}
                  label="h shrinking toward zero"
                />
              </div>
              <p className="-mt-1 text-[11.5px] leading-relaxed text-subtle">
                {reduced
                  ? 'Motion is reduced, so h does not animate. Press Step to halve it and watch the error fall.'
                  : 'Press Play and watch the amber line rotate onto the green one. That rotation is the limit as h → 0.'}
              </p>
            </>
          )}
        </>
      }
    >
      <div
        className="h-52 w-full touch-none"
        onPointerDown={(e) => pickX(e.clientX, top.canvasRef.current)}
        onPointerMove={(e) => {
          if (e.buttons === 1) pickX(e.clientX, top.canvasRef.current);
        }}
      >
        <canvas
          ref={top.canvasRef}
          className="block cursor-ew-resize"
          role="img"
          aria-label={`${curve.expr} with a tangent at x = ${x0.toFixed(2)} of slope ${slope.toFixed(3)}`}
        />
      </div>
      <div className="h-40 w-full border-t border-line">
        <canvas
          ref={bottom.canvasRef}
          className="block"
          role="img"
          aria-label={`${curve.dexpr}, the derivative, plotted on the same x-axis. At x = ${x0.toFixed(2)} it is ${slope.toFixed(3)}.`}
        />
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="font-mono text-[12px] text-ink">
          {showSecant ? (
            <>
              [f({x1.toFixed(2)}) − f({x0.toFixed(2)})] / {(x1 - x0).toFixed(2)} = {secant.toFixed(3)}
              <span className="text-subtle"> → </span>
              <span className="text-success">{slope.toFixed(3)}</span>
            </>
          ) : (
            <>
              f&apos;({x0.toFixed(2)}) = {slope.toFixed(3)}
            </>
          )}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-muted">
          {turns.length > 0 ? (
            <>
              This curve turns at {turns.map((t) => t.toFixed(2)).join(' and ')}. Put the point on either one and the
              slope reads zero, while the dot on the lower plot sits exactly on the red line. That is the only
              signal gradient descent ever has that it has arrived.
            </>
          ) : (
            <>
              This curve never turns, so the lower plot never touches the red line: the slope keeps its sign for the
              whole domain. A loss surface shaped like this has no minimum to find.
            </>
          )}
        </p>
      </div>
    </WidgetShell>
  );
}
