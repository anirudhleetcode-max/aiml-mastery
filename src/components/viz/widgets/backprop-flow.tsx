'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, VIZ, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Backpropagation as arithmetic.
 *
 * A 2-2-1 network with eight weights and real numbers in it. The learner steps
 * forward — every weighted sum, every sigmoid — and then backward, where each
 * step is a single multiplication of a number already on screen by a local
 * slope already on screen. Nothing is hidden inside a framework call and
 * nothing is approximated: a learner with a calculator can check every line.
 *
 * The last step applies the update and reports the new loss, because the point
 * of all that arithmetic is that the loss goes down.
 */

const f4 = (v: number) => v.toFixed(4);
const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

interface Weights {
  w1: number;
  w2: number;
  w3: number;
  w4: number;
  w5: number;
  w6: number;
  b1: number;
  b2: number;
  b3: number;
}

const INITIAL: Weights = { w1: 0.15, w2: 0.25, w3: 0.2, w4: 0.3, w5: 0.45, w6: 0.5, b1: 0.35, b2: 0.35, b3: 0.6 };

interface Pass {
  z1: number;
  a1: number;
  z2: number;
  a2: number;
  z3: number;
  a3: number;
  loss: number;
}

function forward(w: Weights, x1: number, x2: number, target: number): Pass {
  const z1 = w.w1 * x1 + w.w2 * x2 + w.b1;
  const a1 = sigmoid(z1);
  const z2 = w.w3 * x1 + w.w4 * x2 + w.b2;
  const a2 = sigmoid(z2);
  const z3 = w.w5 * a1 + w.w6 * a2 + w.b3;
  const a3 = sigmoid(z3);
  return { z1, a1, z2, a2, z3, a3, loss: 0.5 * (a3 - target) ** 2 };
}

interface Grads {
  dLda3: number;
  da3dz3: number;
  d3: number;
  dw5: number;
  dw6: number;
  db3: number;
  dLda1: number;
  da1dz1: number;
  d1: number;
  dw1: number;
  dw2: number;
  db1: number;
  dLda2: number;
  da2dz2: number;
  d2: number;
  dw3: number;
  dw4: number;
  db2: number;
}

function backward(w: Weights, p: Pass, x1: number, x2: number, target: number): Grads {
  const dLda3 = p.a3 - target;
  const da3dz3 = p.a3 * (1 - p.a3);
  const d3 = dLda3 * da3dz3;
  const dLda1 = d3 * w.w5;
  const da1dz1 = p.a1 * (1 - p.a1);
  const d1 = dLda1 * da1dz1;
  const dLda2 = d3 * w.w6;
  const da2dz2 = p.a2 * (1 - p.a2);
  const d2 = dLda2 * da2dz2;
  return {
    dLda3,
    da3dz3,
    d3,
    dw5: d3 * p.a1,
    dw6: d3 * p.a2,
    db3: d3,
    dLda1,
    da1dz1,
    d1,
    dw1: d1 * x1,
    dw2: d1 * x2,
    db1: d1,
    dLda2,
    da2dz2,
    d2,
    dw3: d2 * x1,
    dw4: d2 * x2,
    db2: d2,
  };
}

interface Part {
  label: string;
  expr: string;
  value: number;
}

interface Step {
  phase: 'forward' | 'backward' | 'update';
  title: string;
  parts: Part[];
  nodes: string[];
  edges: string[];
  note: string;
}

function buildSteps(w: Weights, g: Grads, p: Pass, x1: number, x2: number, target: number, lr: number): Step[] {
  return [
    {
      phase: 'forward',
      title: 'Weighted sum into hidden unit 1',
      parts: [
        {
          label: 'z₁',
          expr: `${f4(w.w1)}×${f4(x1)} + ${f4(w.w2)}×${f4(x2)} + ${f4(w.b1)}`,
          value: p.z1,
        },
      ],
      nodes: ['x1', 'x2', 'h1'],
      edges: ['w1', 'w2'],
      note: 'Each input times the weight on its edge, plus the bias. That is the whole of a neuron before the activation.',
    },
    {
      phase: 'forward',
      title: 'Activate hidden unit 1',
      parts: [{ label: 'a₁', expr: `σ(${f4(p.z1)}) = 1 / (1 + e^−${f4(p.z1)})`, value: p.a1 }],
      nodes: ['h1'],
      edges: [],
      note: 'The sigmoid squashes the sum into (0, 1). Remember a₁ — it comes back in the backward pass.',
    },
    {
      phase: 'forward',
      title: 'Weighted sum into hidden unit 2',
      parts: [{ label: 'z₂', expr: `${f4(w.w3)}×${f4(x1)} + ${f4(w.w4)}×${f4(x2)} + ${f4(w.b2)}`, value: p.z2 }],
      nodes: ['x1', 'x2', 'h2'],
      edges: ['w3', 'w4'],
      note: 'The same two inputs, different weights, so a different answer. That is all a second unit is.',
    },
    {
      phase: 'forward',
      title: 'Activate hidden unit 2',
      parts: [{ label: 'a₂', expr: `σ(${f4(p.z2)})`, value: p.a2 }],
      nodes: ['h2'],
      edges: [],
      note: 'The hidden layer is now two numbers: a₁ and a₂.',
    },
    {
      phase: 'forward',
      title: 'Weighted sum into the output',
      parts: [{ label: 'z₃', expr: `${f4(w.w5)}×${f4(p.a1)} + ${f4(w.w6)}×${f4(p.a2)} + ${f4(w.b3)}`, value: p.z3 }],
      nodes: ['h1', 'h2', 'out'],
      edges: ['w5', 'w6'],
      note: 'The hidden activations are the inputs to the next layer. Nothing new happens — the same operation, one level up.',
    },
    {
      phase: 'forward',
      title: 'Activate the output',
      parts: [{ label: 'a₃', expr: `σ(${f4(p.z3)})`, value: p.a3 }],
      nodes: ['out'],
      edges: [],
      note: 'This is the prediction.',
    },
    {
      phase: 'forward',
      title: 'Loss',
      parts: [{ label: 'L', expr: `½ × (${f4(p.a3)} − ${f4(target)})²`, value: p.loss }],
      nodes: ['out'],
      edges: [],
      note: `The prediction is ${p.a3 > target ? 'above' : 'below'} the target by ${f4(Math.abs(p.a3 - target))}. Squared error turns that into one number to minimise.`,
    },
    {
      phase: 'backward',
      title: 'How the loss responds to the output',
      parts: [{ label: '∂L/∂a₃', expr: `${f4(p.a3)} − ${f4(target)}`, value: g.dLda3 }],
      nodes: ['out'],
      edges: [],
      note: 'Differentiating ½(a₃ − y)² gives exactly (a₃ − y). The first link of the chain, and the only place the target appears.',
    },
    {
      phase: 'backward',
      title: 'Local slope of the output sigmoid',
      parts: [{ label: '∂a₃/∂z₃', expr: `${f4(p.a3)} × (1 − ${f4(p.a3)})`, value: g.da3dz3 }],
      nodes: ['out'],
      edges: [],
      note: 'σ′(z) = σ(z)(1 − σ(z)), so the slope is computed from the activation you already have. It never exceeds 0.25.',
    },
    {
      phase: 'backward',
      title: 'Chain rule: the error signal at the output',
      parts: [{ label: 'δ₃ = ∂L/∂z₃', expr: `${f4(g.dLda3)} × ${f4(g.da3dz3)}`, value: g.d3 }],
      nodes: ['out'],
      edges: [],
      note: 'Multiply the two numbers above. That multiplication is the chain rule — there is nothing else to it.',
    },
    {
      phase: 'backward',
      title: 'Gradients for the output weights',
      parts: [
        { label: '∂L/∂w₅', expr: `${f4(g.d3)} × a₁ = ${f4(g.d3)} × ${f4(p.a1)}`, value: g.dw5 },
        { label: '∂L/∂w₆', expr: `${f4(g.d3)} × a₂ = ${f4(g.d3)} × ${f4(p.a2)}`, value: g.dw6 },
        { label: '∂L/∂b₃', expr: `${f4(g.d3)} × 1`, value: g.db3 },
      ],
      nodes: ['h1', 'h2', 'out'],
      edges: ['w5', 'w6'],
      note: 'A weight gradient is the error signal above it times the activation below it. A loud input earns a big correction.',
    },
    {
      phase: 'backward',
      title: 'Push the signal back along the edges',
      parts: [
        { label: '∂L/∂a₁', expr: `${f4(g.d3)} × w₅ = ${f4(g.d3)} × ${f4(w.w5)}`, value: g.dLda1 },
        { label: '∂L/∂a₂', expr: `${f4(g.d3)} × w₆ = ${f4(g.d3)} × ${f4(w.w6)}`, value: g.dLda2 },
      ],
      nodes: ['h1', 'h2'],
      edges: ['w5', 'w6'],
      note: 'The same weights are used going backwards. A hidden unit connected by a large weight receives a large share of the blame.',
    },
    {
      phase: 'backward',
      title: 'Error signals inside the hidden layer',
      parts: [
        { label: 'δ₁', expr: `${f4(g.dLda1)} × ${f4(p.a1)}(1 − ${f4(p.a1)}) = ${f4(g.dLda1)} × ${f4(g.da1dz1)}`, value: g.d1 },
        { label: 'δ₂', expr: `${f4(g.dLda2)} × ${f4(g.da2dz2)}`, value: g.d2 },
      ],
      nodes: ['h1', 'h2'],
      edges: [],
      note: 'Another local slope, another multiplication. Each layer the signal crosses multiplies it by a number under 0.25 — this is where vanishing gradients come from.',
    },
    {
      phase: 'backward',
      title: 'Gradients for the input weights',
      parts: [
        { label: '∂L/∂w₁', expr: `${f4(g.d1)} × ${f4(x1)}`, value: g.dw1 },
        { label: '∂L/∂w₂', expr: `${f4(g.d1)} × ${f4(x2)}`, value: g.dw2 },
        { label: '∂L/∂w₃', expr: `${f4(g.d2)} × ${f4(x1)}`, value: g.dw3 },
        { label: '∂L/∂w₄', expr: `${f4(g.d2)} × ${f4(x2)}`, value: g.dw4 },
      ],
      nodes: ['x1', 'x2', 'h1', 'h2'],
      edges: ['w1', 'w2', 'w3', 'w4'],
      note: 'Same rule as before: error signal above, activation below. Every weight in the network now has a gradient.',
    },
    {
      phase: 'update',
      title: 'Take the step',
      parts: [
        { label: 'w₅ ←', expr: `${f4(w.w5)} − ${f4(lr)} × ${f4(g.dw5)}`, value: w.w5 - lr * g.dw5 },
        { label: 'w₁ ←', expr: `${f4(w.w1)} − ${f4(lr)} × ${f4(g.dw1)}`, value: w.w1 - lr * g.dw1 },
      ],
      nodes: ['x1', 'x2', 'h1', 'h2', 'out'],
      edges: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'],
      note: 'Every weight moves against its gradient, by the learning rate. Press Apply update below to run the forward pass again on the new weights.',
    },
  ];
}

const NODE_POS: Record<string, { x: number; y: number; label: string }> = {
  x1: { x: 32, y: 42, label: 'x₁' },
  x2: { x: 32, y: 118, label: 'x₂' },
  h1: { x: 148, y: 42, label: 'a₁' },
  h2: { x: 148, y: 118, label: 'a₂' },
  out: { x: 268, y: 80, label: 'a₃' },
};

const EDGES: { id: keyof Weights; from: string; to: string }[] = [
  { id: 'w1', from: 'x1', to: 'h1' },
  { id: 'w2', from: 'x2', to: 'h1' },
  { id: 'w3', from: 'x1', to: 'h2' },
  { id: 'w4', from: 'x2', to: 'h2' },
  { id: 'w5', from: 'h1', to: 'out' },
  { id: 'w6', from: 'h2', to: 'out' },
];

export default function BackpropFlow() {
  const reduced = usePrefersReducedMotion();
  const [x1, setX1] = React.useState(0.6);
  const [x2, setX2] = React.useState(0.2);
  const [target, setTarget] = React.useState(0.9);
  const [lr, setLr] = React.useState(0.5);
  const [weights, setWeights] = React.useState<Weights>(INITIAL);
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [updates, setUpdates] = React.useState(0);
  const [prevLoss, setPrevLoss] = React.useState<number | null>(null);

  const pass = React.useMemo(() => forward(weights, x1, x2, target), [weights, x1, x2, target]);
  const grads = React.useMemo(() => backward(weights, pass, x1, x2, target), [weights, pass, x1, x2, target]);
  const steps = React.useMemo(
    () => buildSteps(weights, grads, pass, x1, x2, target, lr),
    [weights, grads, pass, x1, x2, target, lr],
  );
  const current = steps[Math.min(step, steps.length - 1)];

  // Auto-advance, one step per second and a quarter, and never under reduced motion.
  React.useEffect(() => {
    if (!playing || reduced) return;
    const t = window.setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1250);
    return () => window.clearInterval(t);
  }, [playing, reduced, steps.length]);

  const applyUpdate = () => {
    setPrevLoss(pass.loss);
    setWeights((w) => ({
      w1: w.w1 - lr * grads.dw1,
      w2: w.w2 - lr * grads.dw2,
      w3: w.w3 - lr * grads.dw3,
      w4: w.w4 - lr * grads.dw4,
      w5: w.w5 - lr * grads.dw5,
      w6: w.w6 - lr * grads.dw6,
      b1: w.b1 - lr * grads.db1,
      b2: w.b2 - lr * grads.db2,
      b3: w.b3 - lr * grads.db3,
    }));
    setUpdates((u) => u + 1);
    setStep(0);
  };

  const reset = () => {
    setWeights(INITIAL);
    setStep(0);
    setPlaying(false);
    setUpdates(0);
    setPrevLoss(null);
  };

  const valueAt = (id: string): string => {
    if (id === 'x1') return f4(x1);
    if (id === 'x2') return f4(x2);
    if (id === 'h1') return step >= 1 ? f4(pass.a1) : '?';
    if (id === 'h2') return step >= 3 ? f4(pass.a2) : '?';
    return step >= 5 ? f4(pass.a3) : '?';
  };

  const gradAt = (id: keyof Weights): number =>
    ({ w1: grads.dw1, w2: grads.dw2, w3: grads.dw3, w4: grads.dw4, w5: grads.dw5, w6: grads.dw6, b1: grads.db1, b2: grads.db2, b3: grads.db3 })[id];

  const backwardNow = current.phase !== 'forward';

  return (
    <WidgetShell
      takeaway="Every line of the backward pass is one number already on screen multiplied by one local slope already on screen. Backpropagation is bookkeeping for the chain rule — there is no step you could not do by hand."
      readout={
        <Readout
          items={[
            { label: 'Step', value: `${step + 1} / ${steps.length}` },
            { label: 'Phase', value: current.phase === 'forward' ? 'forward' : current.phase === 'backward' ? 'backward' : 'update' },
            { label: 'Prediction', value: f4(pass.a3) },
            {
              label: 'Loss',
              value: f4(pass.loss),
              tone: prevLoss === null ? 'default' : pass.loss < prevLoss ? 'good' : 'bad',
            },
            ...(prevLoss !== null
              ? [{ label: 'Change', value: `${pass.loss - prevLoss >= 0 ? '+' : ''}${(pass.loss - prevLoss).toFixed(5)}`, tone: (pass.loss < prevLoss ? 'good' : 'bad') as 'good' | 'bad' }]
              : []),
            { label: 'Updates applied', value: String(updates) },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <PlayButton
              playing={playing}
              onToggle={() => setPlaying((p) => !p)}
              onStep={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              onReset={reset}
              label="the pass"
            />
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              Back
            </button>
            <button
              type="button"
              onClick={applyUpdate}
              className="rounded-md border border-line bg-primary/10 px-2.5 py-1 text-[12px] font-medium text-primary transition-colors hover:bg-primary/15"
            >
              Apply update
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label="Input x₁" value={x1} min={0} max={1} step={0.05} onChange={setX1} format={(v) => v.toFixed(2)} />
            <Slider label="Input x₂" value={x2} min={0} max={1} step={0.05} onChange={setX2} format={(v) => v.toFixed(2)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label="Target y" value={target} min={0} max={1} step={0.05} onChange={setTarget} format={(v) => v.toFixed(2)} />
            <Slider
              label="Learning rate η"
              value={lr}
              min={0.1}
              max={4}
              step={0.1}
              onChange={setLr}
              format={(v) => v.toFixed(1)}
              hint="Apply the update a few times and watch the loss fall."
            />
          </div>
          {reduced && (
            <p className="text-[11.5px] leading-relaxed text-subtle">
              Auto-advance is off because you have asked for reduced motion. Use{' '}
              <strong className="text-ink">Step</strong> and <strong className="text-ink">Back</strong> to move through
              the pass yourself.
            </p>
          )}
        </>
      }
    >
      <div className="px-2 pt-2">
        <svg
          viewBox="0 0 300 160"
          className="block h-40 w-full"
          role="img"
          aria-label={`Two-two-one network. Current step: ${current.title}.`}
        >
          {EDGES.map((e) => {
            const a = NODE_POS[e.from];
            const b = NODE_POS[e.to];
            const on = current.edges.includes(e.id);
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 4;
            return (
              <g key={e.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={on ? (backwardNow ? VIZ.warn : VIZ.series) : 'hsl(var(--c-border-strong))'}
                  strokeWidth={on ? 2.2 : 1}
                  strokeDasharray={on && backwardNow ? '4 3' : undefined}
                />
                <text x={mx} y={my} fontSize="8.5" textAnchor="middle" fill={on ? 'hsl(var(--c-text))' : 'hsl(var(--c-text-subtle))'}>
                  {e.id} = {weights[e.id].toFixed(3)}
                </text>
                {on && backwardNow && (
                  <text x={mx} y={my + 10} fontSize="8" textAnchor="middle" fill="hsl(var(--c-warning))">
                    ∂L/∂{e.id} = {gradAt(e.id).toFixed(4)}
                  </text>
                )}
              </g>
            );
          })}
          {Object.entries(NODE_POS).map(([id, n]) => {
            const on = current.nodes.includes(id);
            return (
              <g key={id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={17}
                  fill={on ? 'hsl(var(--c-primary) / 0.15)' : 'hsl(var(--c-surface-2))'}
                  stroke={on ? 'hsl(var(--c-primary))' : 'hsl(var(--c-border-strong))'}
                  strokeWidth={on ? 2 : 1}
                />
                <text x={n.x} y={n.y - 2} fontSize="9" textAnchor="middle" fill="hsl(var(--c-text-muted))">
                  {n.label}
                </text>
                <text x={n.x} y={n.y + 9} fontSize="9.5" textAnchor="middle" fill="hsl(var(--c-text))" fontWeight="600">
                  {valueAt(id)}
                </text>
              </g>
            );
          })}
          <text x={268} y={130} fontSize="8.5" textAnchor="middle" fill="hsl(var(--c-text-subtle))">
            target {f4(target)}
          </text>
          <text x={150} y={152} fontSize="9" textAnchor="middle" fill={backwardNow ? 'hsl(var(--c-warning))' : 'hsl(var(--c-text-subtle))'}>
            {backwardNow ? '← gradients flowing backward' : 'values flowing forward →'}
          </text>
        </svg>
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[12.5px] font-semibold text-ink">
            {step + 1}. {current.title}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
              current.phase === 'forward'
                ? 'bg-primary/10 text-primary'
                : current.phase === 'backward'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-success/10 text-success'
            }`}
          >
            {current.phase === 'forward' ? 'forward pass' : current.phase === 'backward' ? 'backward pass' : 'weight update'}
          </span>
        </div>
        <div className="space-y-1.5">
          {current.parts.map((p) => (
            <div key={p.label} className="flex flex-wrap items-baseline gap-x-2 font-mono text-[12px] tabular-nums">
              <span className="text-muted">{p.label}</span>
              <span className="text-subtle">=</span>
              <span className="text-subtle">{p.expr}</span>
              <span className="text-subtle">=</span>
              <span className="font-semibold text-accent">{f4(p.value)}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-muted">{current.note}</p>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Every number in this pass
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[11.5px]">
            <tbody className="divide-y divide-line">
              {[
                ['z₁, a₁', `${f4(pass.z1)}, ${f4(pass.a1)}`, 'δ₁', f4(grads.d1)],
                ['z₂, a₂', `${f4(pass.z2)}, ${f4(pass.a2)}`, 'δ₂', f4(grads.d2)],
                ['z₃, a₃', `${f4(pass.z3)}, ${f4(pass.a3)}`, 'δ₃', f4(grads.d3)],
                ['L', f4(pass.loss), '∂L/∂a₃', f4(grads.dLda3)],
                ['∂L/∂w₁, ∂L/∂w₂', `${f4(grads.dw1)}, ${f4(grads.dw2)}`, '∂L/∂b₁', f4(grads.db1)],
                ['∂L/∂w₃, ∂L/∂w₄', `${f4(grads.dw3)}, ${f4(grads.dw4)}`, '∂L/∂b₂', f4(grads.db2)],
                ['∂L/∂w₅, ∂L/∂w₆', `${f4(grads.dw5)}, ${f4(grads.dw6)}`, '∂L/∂b₃', f4(grads.db3)],
              ].map((row) => (
                <tr key={row[0]}>
                  <th scope="row" className="py-1 pr-2 text-left font-medium text-muted">
                    {row[0]}
                  </th>
                  <td className="py-1 pr-4 font-mono tabular-nums text-ink">{row[1]}</td>
                  <th scope="row" className="py-1 pr-2 text-left font-medium text-muted">
                    {row[2]}
                  </th>
                  <td className="py-1 font-mono tabular-nums text-ink">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          δ₁ and δ₂ are smaller than δ₃ by roughly the factor a(1 − a) ≤ 0.25 that each sigmoid contributes. Two layers
          of that is a sixteenth; fifty layers is nothing at all.
        </p>
      </div>
    </WidgetShell>
  );
}
