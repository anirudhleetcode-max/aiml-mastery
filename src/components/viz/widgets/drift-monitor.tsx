'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * Why a broken model keeps returning HTTP 200.
 *
 * Nothing about a drifting model looks broken from the outside. The endpoint is
 * up, latency is flat, the error rate is zero, and the response body is a
 * perfectly well-formed probability. The only thing that changed is that the
 * inputs no longer look like the training data, and the outputs are no longer
 * right — and the second of those facts cannot be measured until the labels
 * arrive, which in most businesses is weeks later.
 *
 * So the widget shows the two clocks side by side. The input-drift clock (PSI
 * and the KS statistic) moves the day the shift starts. The accuracy clock is
 * the same curve delayed by the label lag, and it is the only one most teams
 * watch. The gap between them is the window in which a model is quietly wrong
 * and nothing in the infrastructure says so.
 *
 * Everything here is analytic — the distributions are normal, the bin
 * probabilities come from the normal CDF — so the numbers are stable and a
 * learner can check them.
 */

const DAYS = 60;
const DRIFT_START = 18;
const DRIFT_RAMP = 14; // days to reach the full shift

/** Abramowitz & Stegun 7.1.26 — plenty accurate for a monitoring panel. */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}
const cdf = (x: number, mu = 0, sd = 1) => 0.5 * (1 + erf((x - mu) / (sd * Math.SQRT2)));
const pdf = (x: number, mu = 0, sd = 1) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));

/** Ten equal-probability bins under the training distribution — the standard PSI construction. */
const EDGES: number[] = (() => {
  // Inverse normal CDF at 0.1 … 0.9, to three decimals.
  const z = [-1.282, -0.842, -0.524, -0.253, 0, 0.253, 0.524, 0.842, 1.282];
  return [-Infinity, ...z, Infinity];
})();

function psiFor(mu: number, sd: number): number {
  let total = 0;
  for (let i = 0; i < EDGES.length - 1; i++) {
    const expected = 0.1;
    const actual = Math.max(1e-4, cdf(EDGES[i + 1], mu, sd) - cdf(EDGES[i], mu, sd));
    total += (actual - expected) * Math.log(actual / expected);
  }
  return total;
}

/** Kolmogorov–Smirnov: the largest vertical gap between the two CDFs. */
function ksFor(mu: number, sd: number): number {
  let max = 0;
  for (let x = -5; x <= 5; x += 0.02) {
    max = Math.max(max, Math.abs(cdf(x, 0, 1) - cdf(x, mu, sd)));
  }
  return max;
}

const ramp = (day: number) => Math.min(1, Math.max(0, (day - DRIFT_START) / DRIFT_RAMP));
const shiftAt = (day: number, maxShift: number) => maxShift * ramp(day);

/** Accuracy falls with the shift, with a small deterministic wobble so it reads like a real chart. */
function accuracyAt(day: number, maxShift: number): number {
  const s = shiftAt(day, maxShift);
  const base = 0.91 - 0.25 * (1 - Math.exp(-0.9 * s));
  return base + 0.004 * Math.sin(day * 1.7);
}

/** With 5,000 requests a day per side, this is roughly the 5% critical value for KS. */
const KS_CRITICAL = 0.027;

export default function DriftMonitor() {
  const reduced = usePrefersReducedMotion();
  const [maxShift, setMaxShift] = React.useState(1.2);
  const [lag, setLag] = React.useState(14);
  const [day, setDay] = React.useState(DAYS);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(() => {
      setDay((d) => {
        if (d >= DAYS) {
          setPlaying(false);
          return d;
        }
        return d + 1;
      });
    }, 90);
    return () => window.clearInterval(id);
  }, [playing, reduced]);

  const shift = shiftAt(day, maxShift);
  const psi = psiFor(shift, 1);
  const ks = ksFor(shift, 1);
  const trueAcc = accuracyAt(day, maxShift);
  const observedDay = Math.max(0, day - lag);
  const observedAcc = accuracyAt(observedDay, maxShift);

  const psiLevel = psi > 0.25 ? 'act' : psi > 0.1 ? 'watch' : 'stable';
  const firstPsiAlertDay = React.useMemo(() => {
    for (let d = 0; d <= DAYS; d++) if (psiFor(shiftAt(d, maxShift), 1) > 0.1) return d;
    return null;
  }, [maxShift]);
  const firstAccDropDay = React.useMemo(() => {
    for (let d = 0; d <= DAYS; d++) if (accuracyAt(d, maxShift) < 0.87) return d;
    return null;
  }, [maxShift]);
  const blindDays =
    firstPsiAlertDay !== null && firstAccDropDay !== null ? firstAccDropDay + lag - firstPsiAlertDay : null;

  /* ---------------- Panel 1: the two distributions ---------------- */
  const { canvasRef: histRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 8, r: 8, t: 10, b: 20 };
      const plotW = w - pad.l - pad.r;
      const plotH = h - pad.t - pad.b;
      if (plotW <= 0 || plotH <= 0) return;
      const style = getComputedStyle(document.documentElement);
      const resolve = (n: string, fb: string) => style.getPropertyValue(n).trim() || fb;
      const axis = resolve('--viz-axis', '#888');
      const grid = resolve('--viz-grid', 'rgba(128,128,128,0.25)');
      const trainCol = resolve('--viz-cat-none', '#4a5265');
      const prodCol = resolve('--viz-series', '#8164f7');

      const lo = -4.2;
      const hi = 4.2 + Math.max(0, maxShift);
      const bins = 34;
      const binW = (hi - lo) / bins;
      const x = (v: number) => pad.l + ((v - lo) / (hi - lo)) * plotW;
      const peak = pdf(0) * binW;
      const y = (p: number) => pad.t + plotH - (p / peak) * plotH;

      // Bin edges used by PSI, drawn faintly so the metric is not a black box.
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      for (const e of EDGES) {
        if (!Number.isFinite(e)) continue;
        ctx.beginPath();
        ctx.moveTo(x(e), pad.t);
        ctx.lineTo(x(e), pad.t + plotH);
        ctx.stroke();
      }

      const drawBars = (mu: number, colour: string, alpha: number) => {
        ctx.fillStyle = colour;
        ctx.globalAlpha = alpha;
        for (let i = 0; i < bins; i++) {
          const left = lo + i * binW;
          const p = pdf(left + binW / 2, mu, 1) * binW;
          const top = y(p);
          ctx.fillRect(x(left) + 0.5, top, Math.max(1, (plotW / bins) - 1), pad.t + plotH - top);
        }
        ctx.globalAlpha = 1;
      };

      drawBars(0, trainCol, 0.75);
      drawBars(shift, prodCol, 0.72);

      ctx.strokeStyle = axis;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.l, pad.t + plotH);
      ctx.lineTo(w - pad.r, pad.t + plotH);
      ctx.stroke();

      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = trainCol;
      ctx.textAlign = 'left';
      ctx.fillText('training', pad.l + 2, pad.t + 10);
      ctx.fillStyle = prodCol;
      ctx.fillText(`production (day ${day})`, pad.l + 2, pad.t + 22);
      ctx.fillStyle = axis;
      ctx.textAlign = 'center';
      ctx.fillText('−4σ', x(-4), h - 6);
      ctx.fillText('0', x(0), h - 6);
      ctx.fillText('+4σ', x(4), h - 6);
    },
    [shift, maxShift, day],
  );

  /* ---------------- Panel 2: two clocks over 60 days ---------------- */
  const { canvasRef: timeRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 34, r: 10, t: 10, b: 22 };
      const plotW = w - pad.l - pad.r;
      if (plotW <= 0) return;
      const gap = 14;
      const topH = (h - pad.t - pad.b - gap) * 0.58;
      const botH = h - pad.t - pad.b - gap - topH;
      const topY = pad.t;
      const botY = pad.t + topH + gap;

      const style = getComputedStyle(document.documentElement);
      const resolve = (n: string, fb: string) => style.getPropertyValue(n).trim() || fb;
      const axis = resolve('--viz-axis', '#888');
      const grid = resolve('--viz-grid', 'rgba(128,128,128,0.25)');
      const series = resolve('--viz-series', '#8164f7');
      const good = resolve('--viz-cat-mastered', '#199e70');
      const warn = resolve('--viz-cat-review', '#d95926');
      const muted = resolve('--viz-cat-none', '#4a5265');

      const x = (d: number) => pad.l + (d / DAYS) * plotW;
      const accY = (a: number) => topY + topH - ((a - 0.6) / 0.35) * topH;
      const psiMax = 0.6;
      const psiY = (p: number) => botY + botH - (Math.min(p, psiMax) / psiMax) * botH;

      ctx.font = '9.5px ui-sans-serif, system-ui, sans-serif';

      // --- accuracy panel ---
      ctx.strokeStyle = grid;
      ctx.setLineDash([2, 4]);
      for (const a of [0.7, 0.8, 0.9]) {
        ctx.beginPath();
        ctx.moveTo(pad.l, accY(a));
        ctx.lineTo(w - pad.r, accY(a));
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.fillStyle = axis;
      ctx.textAlign = 'right';
      for (const a of [0.7, 0.8, 0.9]) ctx.fillText(a.toFixed(1), pad.l - 4, accY(a) + 3);

      // True accuracy: real, but unknowable today.
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let d = 0; d <= day; d++) {
        const py = accY(accuracyAt(d, maxShift));
        if (d === 0) ctx.moveTo(x(d), py);
        else ctx.lineTo(x(d), py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Measured accuracy: only exists up to today minus the label lag.
      ctx.strokeStyle = good;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let d = 0; d <= Math.max(0, day - lag); d++) {
        const py = accY(accuracyAt(d, maxShift));
        if (d === 0) ctx.moveTo(x(d), py);
        else ctx.lineTo(x(d), py);
      }
      ctx.stroke();

      // The gap between what is true and what is measurable.
      if (day - lag > 0) {
        ctx.fillStyle = warn;
        ctx.globalAlpha = 0.14;
        ctx.fillRect(x(Math.max(0, day - lag)), topY, x(day) - x(Math.max(0, day - lag)), topH);
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = muted;
      ctx.textAlign = 'left';
      ctx.fillText('true accuracy', pad.l + 3, topY + 9);
      ctx.fillStyle = good;
      ctx.fillText('accuracy you can measure', pad.l + 3, topY + 20);

      // --- PSI panel ---
      ctx.strokeStyle = warn;
      ctx.setLineDash([4, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.l, psiY(0.25));
      ctx.lineTo(w - pad.r, psiY(0.25));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = warn;
      ctx.textAlign = 'right';
      ctx.fillText('0.25', pad.l - 4, psiY(0.25) + 3);
      ctx.fillStyle = axis;
      ctx.fillText('0', pad.l - 4, psiY(0) + 3);

      ctx.strokeStyle = series;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let d = 0; d <= day; d++) {
        const py = psiY(psiFor(shiftAt(d, maxShift), 1));
        if (d === 0) ctx.moveTo(x(d), py);
        else ctx.lineTo(x(d), py);
      }
      ctx.stroke();
      ctx.fillStyle = series;
      ctx.textAlign = 'left';
      ctx.fillText('PSI on the input feature', pad.l + 3, botY + 9);

      // Today marker and the day the shift began.
      ctx.strokeStyle = axis;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(x(DRIFT_START), topY);
      ctx.lineTo(x(DRIFT_START), botY + botH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = axis;
      ctx.textAlign = 'center';
      ctx.fillText('shift begins', x(DRIFT_START), h - 6);
      ctx.fillText(`day ${day}`, Math.min(w - pad.r - 14, Math.max(pad.l + 14, x(day))), h - 6);

      ctx.strokeStyle = series;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x(day), topY);
      ctx.lineTo(x(day), botY + botH);
      ctx.stroke();
    },
    [day, lag, maxShift],
  );

  return (
    <WidgetShell
      takeaway="Input drift is observable today; accuracy is observable only when the labels arrive. That is the whole argument for monitoring the inputs — for the length of your label lag, PSI is the only evidence you have that anything is wrong, and the endpoint will keep returning 200 either way."
      readout={
        <Readout
          items={[
            { label: 'Shift', value: `${shift.toFixed(2)}σ` },
            { label: 'PSI', value: psi.toFixed(3), tone: psiLevel === 'act' ? 'bad' : psiLevel === 'watch' ? 'warn' : 'good' },
            { label: 'KS', value: ks.toFixed(3), tone: ks > KS_CRITICAL ? 'warn' : 'good' },
            { label: 'Accuracy on the dashboard', value: observedAcc.toFixed(3), tone: observedAcc < 0.85 ? 'bad' : 'good' },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <PlayButton
              playing={playing}
              onToggle={() => {
                if (day >= DAYS) setDay(0);
                setPlaying((p) => !p);
              }}
              onStep={() => {
                setPlaying(false);
                setDay((d) => Math.min(DAYS, d + 1));
              }}
              onReset={() => {
                setPlaying(false);
                setDay(0);
              }}
              label="the 60 days"
            />
            {reduced && <span className="text-[11px] text-subtle">Motion reduced — use Step or the day slider.</span>}
          </div>
          <Slider label="Day" value={day} min={0} max={DAYS} step={1} onChange={(v) => { setPlaying(false); setDay(v); }} format={(v) => `${v} of ${DAYS}`} />
          <Slider
            label="Production shift"
            value={maxShift}
            min={0}
            max={3}
            step={0.05}
            onChange={setMaxShift}
            format={(v) => `${v.toFixed(2)}σ`}
            hint="A marketing campaign, a new device mix, a pricing change — the feature moves, and nothing upstream tells the model."
          />
          <Slider
            label="Label lag"
            value={lag}
            min={0}
            max={30}
            step={1}
            onChange={setLag}
            format={(v) => (v === 0 ? 'labels arrive instantly' : `${v} days`)}
            hint="How long before you learn whether a prediction was right. Churn: 30 days. Fraud chargebacks: 60. Ad clicks: minutes."
          />
        </>
      }
    >
      {/* The status strip that is always green — the point of the widget. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line bg-surface-2/60 px-4 py-2 text-[11px]">
        <span className="flex items-center gap-1.5 text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          HTTP 200 · 5,000 req/day
        </span>
        <span className="text-subtle">p95 latency 42 ms</span>
        <span className="text-subtle">error rate 0.00%</span>
        <span className="text-subtle">uptime 100%</span>
      </div>

      <div className="space-y-4 p-4">
        <section>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Feature: average session length (z-scored)
          </p>
          <div className="h-40 w-full">
            <canvas
              ref={histRef}
              className="block"
              role="img"
              aria-label={`Training distribution centred at zero against the production distribution centred at ${shift.toFixed(2)} standard deviations; PSI ${psi.toFixed(3)}`}
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-line bg-surface-2/60 p-2">
              <p className="text-[10.5px] text-subtle">Population Stability Index</p>
              <p
                className={cn(
                  'font-mono text-[15px] font-semibold tabular-nums',
                  psiLevel === 'act' ? 'text-danger' : psiLevel === 'watch' ? 'text-warning' : 'text-success',
                )}
              >
                {psi.toFixed(3)}
              </p>
              <div className="mt-1 h-1.5 w-full rounded-full bg-surface-3">
                <div
                  className={cn('h-full rounded-full', psiLevel === 'act' ? 'bg-danger' : psiLevel === 'watch' ? 'bg-warning' : 'bg-success')}
                  style={{ width: `${Math.min(100, (psi / 0.5) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-[10.5px] leading-snug text-subtle">
                &lt; 0.10 stable · 0.10–0.25 investigate · &gt; 0.25 act
              </p>
            </div>
            <div className="rounded-md border border-line bg-surface-2/60 p-2">
              <p className="text-[10.5px] text-subtle">KS statistic</p>
              <p className={cn('font-mono text-[15px] font-semibold tabular-nums', ks > KS_CRITICAL ? 'text-warning' : 'text-success')}>
                {ks.toFixed(3)}
              </p>
              <div className="mt-1 h-1.5 w-full rounded-full bg-surface-3">
                <div
                  className={cn('h-full rounded-full', ks > KS_CRITICAL ? 'bg-warning' : 'bg-success')}
                  style={{ width: `${Math.min(100, ks * 200)}%` }}
                />
              </div>
              <p className="mt-1 text-[10.5px] leading-snug text-subtle">
                critical value {KS_CRITICAL.toFixed(3)} at n = 5,000 per side
              </p>
            </div>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-subtle">
            KS crosses its threshold almost immediately: with five thousand rows a day, a shift far too small to matter
            is still statistically significant. PSI is the blunter, more useful instrument — it asks how much the
            distribution moved, not whether it moved at all.
          </p>
        </section>

        <section>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Two clocks: drift detected, and accuracy measured
          </p>
          <div className="h-52 w-full">
            <canvas
              ref={timeRef}
              className="block"
              role="img"
              aria-label={`Sixty days: PSI rises from day ${DRIFT_START} while measured accuracy only reflects days up to ${observedDay}, ${lag} days behind`}
            />
          </div>
          <div className="mt-2 rounded-md border border-line bg-surface-2/60 p-2.5 text-[11.5px] leading-relaxed text-muted">
            {blindDays !== null && blindDays > 0 ? (
              <>
                On day {day} the input monitor already shows PSI {psi.toFixed(2)}. The accuracy chart is still showing
                day {observedDay}, because that is the most recent day whose labels have arrived — so the dashboard
                reads {observedAcc.toFixed(3)} while the model is really at {trueAcc.toFixed(3)}. Drift is visible from
                day {firstPsiAlertDay}; the accuracy drop is not visible until day {(firstAccDropDay ?? 0) + lag}. That
                is <span className="font-medium text-warning">{blindDays} days</span> of wrong answers returned with a
                200 and a confident probability.
              </>
            ) : (
              <>
                At this shift the feature has barely moved: PSI stays under 0.10 and accuracy holds near{' '}
                {trueAcc.toFixed(3)}. Raise the production shift and watch the PSI line lift days before the accuracy
                line can possibly react.
              </>
            )}
          </div>
        </section>
      </div>
    </WidgetShell>
  );
}
