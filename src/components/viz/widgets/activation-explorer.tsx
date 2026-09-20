'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, VIZ, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * Every activation and its derivative, on the same axes.
 *
 * The plot is not the lesson — the derivative row underneath is. A sigmoid
 * unit sitting at z = 4 has a slope of 0.018, and ten such layers multiply to
 * 3 × 10⁻¹⁸. That single number is why deep sigmoid networks did not train for
 * twenty years, and why ReLU — whose derivative is exactly 1 — replaced them.
 * The depth slider does that multiplication live for all six functions at once.
 *
 * The cost of ReLU is in the same table: exactly 0 for every negative input,
 * which means a unit that drifts negative for all data stops learning forever.
 */

/** Resolves a design token to something a canvas can paint. */
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

type ActId = 'sigmoid' | 'tanh' | 'relu' | 'leaky' | 'gelu' | 'softmax';

interface Activation {
  id: ActId;
  label: string;
  formula: string;
  f: (x: number) => number;
  d: (x: number) => number;
  /** Largest value the derivative ever takes — the best case for one layer. */
  maxD: number;
  note: string;
}

const LEAK = 0.1;
const GELU_C = Math.sqrt(2 / Math.PI);
const GELU_A = 0.044715;

/** The other three logits the softmax panel competes against. */
const SOFTMAX_REST = [1, 0.2, -0.5];

function softmaxProbs(x: number): number[] {
  const logits = [x, ...SOFTMAX_REST];
  const m = Math.max(...logits);
  const ex = logits.map((l) => Math.exp(l - m));
  const s = ex.reduce((a, b) => a + b, 0);
  return ex.map((e) => e / s);
}

const ACTIVATIONS: Activation[] = [
  {
    id: 'sigmoid',
    label: 'Sigmoid',
    formula: 'σ(x) = 1 / (1 + e⁻ˣ)',
    f: (x) => 1 / (1 + Math.exp(-x)),
    d: (x) => {
      const s = 1 / (1 + Math.exp(-x));
      return s * (1 - s);
    },
    maxD: 0.25,
    note: 'Squashes everything into (0, 1). The derivative peaks at 0.25 and is under 0.01 outside roughly ±5.',
  },
  {
    id: 'tanh',
    label: 'tanh',
    formula: 'tanh(x) = (eˣ − e⁻ˣ) / (eˣ + e⁻ˣ)',
    f: (x) => Math.tanh(x),
    d: (x) => 1 - Math.tanh(x) ** 2,
    maxD: 1,
    note: 'Zero-centred, so the gradients of a layer are not all the same sign. Still saturates at both ends.',
  },
  {
    id: 'relu',
    label: 'ReLU',
    formula: 'ReLU(x) = max(0, x)',
    f: (x) => (x > 0 ? x : 0),
    d: (x) => (x > 0 ? 1 : 0),
    maxD: 1,
    note: 'Derivative exactly 1 for positive inputs — the gradient passes through undamped — and exactly 0 below zero.',
  },
  {
    id: 'leaky',
    label: 'Leaky ReLU',
    formula: 'f(x) = x if x > 0, else 0.1x',
    f: (x) => (x > 0 ? x : LEAK * x),
    d: (x) => (x > 0 ? 1 : LEAK),
    maxD: 1,
    note: 'The negative side gets slope 0.1 instead of 0, so a unit pushed negative can still climb back out.',
  },
  {
    id: 'gelu',
    label: 'GELU',
    formula: 'GELU(x) ≈ 0.5x (1 + tanh(√(2/π)(x + 0.044715x³)))',
    f: (x) => 0.5 * x * (1 + Math.tanh(GELU_C * (x + GELU_A * x * x * x))),
    d: (x) => {
      const u = GELU_C * (x + GELU_A * x * x * x);
      const t = Math.tanh(u);
      return 0.5 * (1 + t) + 0.5 * x * (1 - t * t) * GELU_C * (1 + 3 * GELU_A * x * x);
    },
    maxD: 1.084,
    note: 'A smoothed ReLU, and the default inside transformers. Slightly negative near x = −1, and differentiable everywhere.',
  },
  {
    id: 'softmax',
    label: 'Softmax',
    formula: 'p₁ = e^x / (e^x + e¹ + e⁰·² + e⁻⁰·⁵)',
    f: (x) => softmaxProbs(x)[0],
    // For the chosen output, ∂p₁/∂x₁ = p₁(1 − p₁) — the same shape as the sigmoid's.
    d: (x) => {
      const p = softmaxProbs(x)[0];
      return p * (1 - p);
    },
    maxD: 0.25,
    note: 'Not an elementwise function: it turns a whole vector into a distribution that sums to 1. Its own slope saturates exactly like the sigmoid.',
  },
];

const BY_ID = new Map(ACTIVATIONS.map((a) => [a.id, a]));
const PROBE_POINTS = [-4, -1, 0, 1, 4];

const X_MIN = -6;
const X_MAX = 6;
const Y_MIN = -1.3;
const Y_MAX = 2.4;

export default function ActivationExplorer() {
  const [id, setId] = React.useState<ActId>('sigmoid');
  const [x, setX] = React.useState(3);
  const [depth, setDepth] = React.useState(10);

  const active = BY_ID.get(id) ?? ACTIVATIONS[0];
  const fx = active.f(x);
  const dx = active.d(x);
  const probs = softmaxProbs(x);

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 34, r: 12, t: 12, b: 20 };
      const pw = w - pad.l - pad.r;
      const ph = h - pad.t - pad.b;
      if (pw <= 0 || ph <= 0) return;

      const resolve = makeResolve();
      const grid = resolve(VIZ.grid, 'rgba(128,128,128,0.3)');
      const axis = resolve(VIZ.axis, '#888');
      const fCol = resolve(VIZ.series, '#8164f7');
      const dCol = resolve(VIZ.warn, '#d95926');
      const flat = resolve(VIZ.muted, '#4a5265');

      const px = (v: number) => pad.l + ((v - X_MIN) / (X_MAX - X_MIN)) * pw;
      const py = (v: number) => pad.t + ph - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * ph;

      // Shade the region where the derivative is effectively zero: the band a
      // gradient cannot escape from.
      ctx.fillStyle = flat;
      ctx.globalAlpha = 0.25;
      let runStart: number | null = null;
      for (let i = 0; i <= 240; i++) {
        const v = X_MIN + ((X_MAX - X_MIN) * i) / 240;
        const dead = Math.abs(active.d(v)) < 0.01;
        if (dead && runStart === null) runStart = v;
        if ((!dead || i === 240) && runStart !== null) {
          ctx.fillRect(px(runStart), pad.t, Math.max(1, px(v) - px(runStart)), ph);
          runStart = null;
        }
      }
      ctx.globalAlpha = 1;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (const gy of [-1, 0, 1, 2]) {
        ctx.beginPath();
        ctx.moveTo(pad.l, py(gy));
        ctx.lineTo(w - pad.r, py(gy));
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.strokeStyle = axis;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(px(0), pad.t);
      ctx.lineTo(px(0), pad.t + ph);
      ctx.moveTo(pad.l, py(0));
      ctx.lineTo(w - pad.r, py(0));
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      for (const gy of [-1, 0, 1, 2]) ctx.fillText(String(gy), pad.l - 5, py(gy) + 3);
      ctx.textAlign = 'center';
      for (const gx of [-4, 0, 4]) ctx.fillText(String(gx), px(gx), h - 6);

      ctx.save();
      ctx.beginPath();
      ctx.rect(pad.l, pad.t, pw, ph);
      ctx.clip();

      const curve = (g: (v: number) => number, colour: string, dash: number[]) => {
        ctx.strokeStyle = colour;
        ctx.lineWidth = 2;
        ctx.setLineDash(dash);
        ctx.beginPath();
        for (let i = 0; i <= 300; i++) {
          const v = X_MIN + ((X_MAX - X_MIN) * i) / 300;
          const y = py(g(v));
          if (i === 0) ctx.moveTo(px(v), y);
          else ctx.lineTo(px(v), y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };

      // Solid for the function, dashed for its derivative, plus written labels:
      // the two lines are distinguishable without seeing colour at all.
      curve(active.f, fCol, []);
      curve(active.d, dCol, [5, 3]);

      const markerX = px(x);
      ctx.strokeStyle = axis;
      ctx.setLineDash([1, 3]);
      ctx.beginPath();
      ctx.moveTo(markerX, pad.t);
      ctx.lineTo(markerX, pad.t + ph);
      ctx.stroke();
      ctx.setLineDash([]);
      for (const [v, colour] of [
        [fx, fCol],
        [dx, dCol],
      ] as [number, string][]) {
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(markerX, py(v), 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = fCol;
      ctx.fillText('f(x)', pad.l + 6, pad.t + 12);
      ctx.fillStyle = dCol;
      ctx.fillText("f'(x) — dashed", pad.l + 6, pad.t + 26);
    },
    [id, x],
  );

  const survives = (a: Activation) => Math.pow(a.d(x), depth);
  const fmtSmall = (v: number) => (v === 0 ? '0' : Math.abs(v) < 1e-4 ? v.toExponential(1) : v.toFixed(4));

  return (
    <WidgetShell
      takeaway="A sigmoid unit at x = 4 has a slope of 0.018; stack ten of them and the gradient arriving at the first layer is a hundred-millionth of what left the loss. ReLU's slope is exactly 1 on the positive side — nothing is lost — but exactly 0 on the negative side, where a unit can get stuck for good."
      readout={
        <Readout
          items={[
            { label: 'f(x)', value: fx.toFixed(4) },
            { label: "f'(x)", value: fmtSmall(dx), tone: Math.abs(dx) < 0.01 ? 'bad' : Math.abs(dx) > 0.9 ? 'good' : 'default' },
            { label: `f'(x)^${depth}`, value: fmtSmall(survives(active)), tone: survives(active) < 1e-4 ? 'bad' : 'default' },
            { label: 'max slope', value: active.maxD.toFixed(3) },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Activation"
            value={id}
            onChange={(v) => setId(v as ActId)}
            options={ACTIVATIONS.map((a) => ({ value: a.id, label: a.label }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider
              label="Input x"
              value={x}
              min={-6}
              max={6}
              step={0.1}
              onChange={setX}
              format={(v) => v.toFixed(1)}
              hint="Move past ±3 and watch the sigmoid's slope collapse."
            />
            <Slider
              label="Layers stacked"
              value={depth}
              min={1}
              max={20}
              step={1}
              onChange={setDepth}
              hint="The gradient reaching layer 1 is the product of one slope per layer."
            />
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            <span className="font-mono text-[11px] text-accent">{active.formula}</span> — {active.note}
          </p>
        </>
      }
    >
      <div className="h-56 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`${active.label} plotted with its derivative; at x equals ${x.toFixed(1)} the value is ${fx.toFixed(3)} and the slope is ${dx.toFixed(4)}`}
        />
      </div>

      {id === 'softmax' && (
        <div className="border-t border-line px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Softmax over four logits
          </p>
          <div className="space-y-1.5">
            {[x, ...SOFTMAX_REST].map((logit, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-24 shrink-0 font-mono text-[11.5px] tabular-nums text-muted">
                  z{i + 1} = {logit.toFixed(2)}
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded-sm bg-surface-2">
                  <div
                    className="h-full rounded-sm"
                    style={{ width: `${Math.max(1, probs[i] * 100)}%`, background: i === 0 ? VIZ.series : VIZ.muted }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right font-mono text-[11.5px] tabular-nums text-ink">
                  {probs[i].toFixed(3)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
            The four probabilities sum to {probs.reduce((a, b) => a + b, 0).toFixed(3)}. Raising one logit takes
            probability away from the others — which is why softmax is a competition, not six independent sigmoids.
          </p>
        </div>
      )}

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Derivative at each input, and after {depth} layers
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-1.5 pr-3 font-medium">
                  f&apos;(x) at
                </th>
                {PROBE_POINTS.map((p) => (
                  <th key={p} scope="col" className="py-1.5 pr-3 text-right font-medium tabular-nums">
                    {p}
                  </th>
                ))}
                <th scope="col" className="py-1.5 text-right font-medium">
                  ^{depth} at x = {x.toFixed(1)}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ACTIVATIONS.map((a) => {
                const chain = Math.pow(a.d(x), depth);
                return (
                  <tr key={a.id} className={a.id === id ? 'bg-primary/[0.06]' : undefined}>
                    <td className="py-1.5 pr-3 font-medium text-ink">{a.label}</td>
                    {PROBE_POINTS.map((p) => {
                      const d = a.d(p);
                      return (
                        <td
                          key={p}
                          className={`py-1.5 pr-3 text-right tabular-nums ${
                            d === 0 ? 'text-danger' : d < 0.05 ? 'text-warning' : 'text-muted'
                          }`}
                        >
                          {d === 0 ? '0' : d.toFixed(3)}
                        </td>
                      );
                    })}
                    <td
                      className={`py-1.5 text-right tabular-nums ${
                        chain < 1e-4 ? 'text-danger' : chain > 0.5 ? 'text-success' : 'text-muted'
                      }`}
                    >
                      {fmtSmall(chain)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Red cells are dead gradients: nothing that arrives at such a unit reaches the weights below it. The shaded
          band on the plot marks every input where the selected function&apos;s slope is under 0.01.
        </p>
      </div>
    </WidgetShell>
  );
}
