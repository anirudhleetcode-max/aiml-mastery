'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, VIZ, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * A neural network you can actually train, in the browser, on a dataset you
 * choose — forward pass, backward pass and gradient step written out in this
 * file rather than delegated to a library.
 *
 * Three things happen at once, and the learner needs all three side by side:
 * the decision boundary bending to fit the data, the edges of the diagram
 * thickening as weights grow, and the loss curve falling. Depth and width are
 * sliders, so the honest lesson — that a linear dataset needs neither, and a
 * spiral needs both — is something the learner discovers by breaking it.
 *
 * Everything is deterministic given the seed: the sample, the initialisation
 * and therefore the whole trajectory.
 */

/** Small, fast, seeded PRNG. Same seed, same network, every time. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal, from a uniform generator (Box–Muller). */
function gauss(rng: () => number): number {
  const u = Math.max(1e-9, rng());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

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

// ---------------------------------------------------------------------------
// Activations
// ---------------------------------------------------------------------------

type ActName = 'relu' | 'tanh' | 'sigmoid';

const ACTS: Record<ActName, { label: string; f: (z: number) => number; d: (a: number) => number; note: string }> = {
  relu: {
    label: 'ReLU',
    f: (z) => (z > 0 ? z : 0),
    // a > 0 exactly when z > 0, so the activation is enough to recover the slope.
    d: (a) => (a > 0 ? 1 : 0),
    note: 'Gradient 1 on the positive side, 0 on the negative side. Fast, and occasionally fatal.',
  },
  tanh: {
    label: 'tanh',
    f: (z) => Math.tanh(z),
    d: (a) => 1 - a * a,
    note: 'Smooth and zero-centred. Saturates at both ends, so deep stacks lose gradient.',
  },
  sigmoid: {
    label: 'Sigmoid',
    f: (z) => 1 / (1 + Math.exp(-z)),
    d: (a) => a * (1 - a),
    note: 'Derivative peaks at 0.25, so every hidden layer shrinks the gradient at least fourfold.',
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type DataKind = 'spiral' | 'xor' | 'circles' | 'linear';

interface Pt {
  x: number;
  y: number;
  label: 0 | 1;
}

const DATA_NOTE: Record<DataKind, string> = {
  spiral: 'Two interleaved arms. Nothing short of a couple of wide hidden layers will separate these.',
  xor: 'The classic. No straight line works, but one hidden layer of four is plenty.',
  circles: 'An inner blob inside a ring. A single hidden layer bends the boundary into a loop.',
  linear: 'Linearly separable. A network with no hidden layer at all would do — the depth is wasted.',
};

const N_POINTS = 170;

function makeData(kind: DataKind, seed: number): Pt[] {
  const rng = mulberry32(seed * 7919 + 13);
  const pts: Pt[] = [];
  const jitter = () => (rng() * 2 - 1) * 0.07;

  if (kind === 'spiral') {
    const per = Math.floor(N_POINTS / 2);
    for (let arm = 0; arm < 2; arm++) {
      for (let i = 0; i < per; i++) {
        const t = (i / per) * 3.1;
        const r = 0.1 + t * 0.26;
        const angle = t * 2.1 + arm * Math.PI;
        pts.push({
          x: Math.min(1, Math.max(-1, r * Math.cos(angle) + jitter())),
          y: Math.min(1, Math.max(-1, r * Math.sin(angle) + jitter())),
          label: arm as 0 | 1,
        });
      }
    }
    return pts;
  }

  if (kind === 'circles') {
    for (let i = 0; i < N_POINTS; i++) {
      const inner = i % 2 === 0;
      const r = inner ? rng() * 0.36 : 0.62 + rng() * 0.32;
      const angle = rng() * Math.PI * 2;
      pts.push({ x: r * Math.cos(angle), y: r * Math.sin(angle), label: inner ? 1 : 0 });
    }
    return pts;
  }

  for (let i = 0; i < N_POINTS; i++) {
    const x = rng() * 1.8 - 0.9;
    const y = rng() * 1.8 - 0.9;
    const label: 0 | 1 = kind === 'xor' ? (x * y > 0 ? 1 : 0) : 0.85 * x + 0.5 * y + 0.06 > 0 ? 1 : 0;
    pts.push({ x, y, label });
  }
  return pts;
}

// ---------------------------------------------------------------------------
// The network. Forward and backward, by hand.
// ---------------------------------------------------------------------------

interface Net {
  sizes: number[];
  /** W[l][j][i]: weight from unit i of layer l to unit j of layer l+1. */
  W: number[][][];
  b: number[][];
}

function makeNet(sizes: number[], seed: number): Net {
  const rng = mulberry32(seed * 104729 + 7);
  const W: number[][][] = [];
  const b: number[][] = [];
  for (let l = 0; l < sizes.length - 1; l++) {
    const fanIn = sizes[l];
    // He-style scaling: keeps activations from shrinking or exploding at init.
    const scale = Math.sqrt(2 / fanIn);
    const layer: number[][] = [];
    for (let j = 0; j < sizes[l + 1]; j++) {
      const row: number[] = [];
      for (let i = 0; i < fanIn; i++) row.push(gauss(rng) * scale);
      layer.push(row);
    }
    W.push(layer);
    b.push(new Array<number>(sizes[l + 1]).fill(0));
  }
  return { sizes, W, b };
}

/** Returns every intermediate activation; the last one is the sigmoid output. */
function forward(net: Net, input: number[], act: ActName): number[][] {
  const acts: number[][] = [input];
  const L = net.W.length;
  for (let l = 0; l < L; l++) {
    const prev = acts[l];
    const out: number[] = [];
    for (let j = 0; j < net.W[l].length; j++) {
      const row = net.W[l][j];
      let s = net.b[l][j];
      for (let i = 0; i < row.length; i++) s += row[i] * prev[i];
      out.push(l === L - 1 ? 1 / (1 + Math.exp(-s)) : ACTS[act].f(s));
    }
    acts.push(out);
  }
  return acts;
}

function predict(net: Net, x: number, y: number, act: ActName): number {
  const acts = forward(net, [x, y], act);
  return acts[acts.length - 1][0];
}

/**
 * One full-batch epoch of gradient descent on binary cross-entropy.
 *
 * With a sigmoid output and a cross-entropy loss the output delta collapses to
 * `prediction − target`; every earlier delta is that delta pushed back through
 * the transpose of the weights and multiplied by the local activation slope.
 * That product-of-slopes is backpropagation, and it is the loop below.
 */
function trainEpoch(net: Net, data: Pt[], lr: number, act: ActName): number {
  const L = net.W.length;
  const gW = net.W.map((m) => m.map((r) => r.map(() => 0)));
  const gb = net.b.map((v) => v.map(() => 0));
  let loss = 0;

  for (const p of data) {
    const acts = forward(net, [p.x, p.y], act);
    const out = acts[L][0];
    loss -= p.label * Math.log(out + 1e-9) + (1 - p.label) * Math.log(1 - out + 1e-9);

    let delta: number[] = [out - p.label];
    for (let l = L - 1; l >= 0; l--) {
      const prev = acts[l];
      for (let j = 0; j < delta.length; j++) {
        gb[l][j] += delta[j];
        for (let i = 0; i < prev.length; i++) gW[l][j][i] += delta[j] * prev[i];
      }
      if (l > 0) {
        const back = new Array<number>(prev.length).fill(0);
        for (let j = 0; j < delta.length; j++) {
          const row = net.W[l][j];
          for (let i = 0; i < row.length; i++) back[i] += row[i] * delta[j];
        }
        // Multiply by the local slope of the hidden activation — the chain rule.
        for (let i = 0; i < prev.length; i++) back[i] *= ACTS[act].d(prev[i]);
        delta = back;
      }
    }
  }

  const n = data.length;
  for (let l = 0; l < L; l++) {
    for (let j = 0; j < net.W[l].length; j++) {
      net.b[l][j] -= (lr * gb[l][j]) / n;
      for (let i = 0; i < net.W[l][j].length; i++) net.W[l][j][i] -= (lr * gW[l][j][i]) / n;
    }
  }
  return loss / n;
}

function accuracy(net: Net, data: Pt[], act: ActName): number {
  let right = 0;
  for (const p of data) if ((predict(net, p.x, p.y, act) > 0.5 ? 1 : 0) === p.label) right++;
  return right / data.length;
}

function maxAbsWeight(net: Net): number {
  let m = 0;
  for (const layer of net.W) for (const row of layer) for (const w of row) m = Math.max(m, Math.abs(w));
  return m;
}

const EPOCHS_PER_FRAME = 4;
const MAX_EPOCHS = 4000;

export default function NeuralNetworkLab() {
  const reduced = usePrefersReducedMotion();
  const [dataset, setDataset] = React.useState<DataKind>('xor');
  const [depth, setDepth] = React.useState(1);
  const [width, setWidth] = React.useState(4);
  const [lr, setLr] = React.useState(0.6);
  const [act, setAct] = React.useState<ActName>('tanh');
  const [seed, setSeed] = React.useState(3);
  const [playing, setPlaying] = React.useState(false);
  const [stats, setStats] = React.useState({ epoch: 0, loss: 0.693, acc: 0.5, wmax: 0 });
  const [, setFrame] = React.useState(0);

  const sizes = React.useMemo(() => [2, ...new Array<number>(depth).fill(width), 1], [depth, width]);
  const data = React.useMemo(() => makeData(dataset, seed), [dataset, seed]);

  const netRef = React.useRef<Net>(makeNet([2, 4, 1], 3));
  const lossRef = React.useRef<number[]>([]);
  /** Epoch and loss live in a ref so the training loop is not rebuilt each frame. */
  const progressRef = React.useRef({ epoch: 0, loss: 0.693 });

  const reset = React.useCallback(() => {
    netRef.current = makeNet(sizes, seed);
    lossRef.current = [];
    progressRef.current = { epoch: 0, loss: 0.693 };
    setPlaying(false);
    setStats({ epoch: 0, loss: 0.693, acc: accuracy(netRef.current, data, act), wmax: maxAbsWeight(netRef.current) });
    setFrame((f) => f + 1);
  }, [sizes, seed, data, act]);

  // Any structural change is a new experiment, not a continuation of this one.
  React.useEffect(() => {
    reset();
  }, [reset]);

  const runEpochs = React.useCallback(
    (count: number) => {
      const net = netRef.current;
      const p = progressRef.current;
      for (let i = 0; i < count && p.epoch < MAX_EPOCHS; i++) {
        p.loss = trainEpoch(net, data, lr, act);
        p.epoch++;
        if (p.epoch % 2 === 0) lossRef.current.push(p.loss);
      }
      if (lossRef.current.length > 900) lossRef.current = lossRef.current.slice(-900);
      setStats({ epoch: p.epoch, loss: p.loss, acc: accuracy(net, data, act), wmax: maxAbsWeight(net) });
      setFrame((f) => f + 1);
    },
    [data, lr, act],
  );

  // Training loop. Nothing runs when paused, and nothing auto-runs under
  // reduced motion — the Step button drives it instead.
  React.useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    const tick = () => {
      runEpochs(EPOCHS_PER_FRAME);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced, runEpochs]);

  React.useEffect(() => {
    if (stats.epoch >= MAX_EPOCHS && playing) setPlaying(false);
  }, [stats.epoch, playing]);

  // --- decision boundary + data --------------------------------------------
  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const size = Math.min(w, h);
      const ox = (w - size) / 2;
      const oy = (h - size) / 2;
      const resolve = makeResolve();
      const cls1 = resolve(VIZ.series, '#8164f7');
      const cls0 = resolve(VIZ.good, '#199e70');
      const axis = resolve(VIZ.axis, '#888');
      const net = netRef.current;

      const step = Math.max(5, Math.round(size / 38));
      for (let px = 0; px < size; px += step) {
        for (let py = 0; py < size; py += step) {
          const x = ((px + step / 2) / size) * 2 - 1;
          const y = 1 - ((py + step / 2) / size) * 2;
          const p = predict(net, x, y, act);
          ctx.globalAlpha = Math.min(0.5, Math.abs(p - 0.5) * 0.95);
          ctx.fillStyle = p > 0.5 ? cls1 : cls0;
          ctx.fillRect(ox + px, oy + py, step + 1, step + 1);
        }
      }
      ctx.globalAlpha = 1;

      // Points: filled circle for class 1, hollow square for class 0, so the
      // two classes are distinguishable without relying on colour.
      for (const p of data) {
        const cx = ox + ((p.x + 1) / 2) * size;
        const cy = oy + ((1 - p.y) / 2) * size;
        if (p.label === 1) {
          ctx.fillStyle = cls1;
          ctx.beginPath();
          ctx.arc(cx, cy, 3.1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = cls0;
          ctx.lineWidth = 1.6;
          ctx.strokeRect(cx - 2.6, cy - 2.6, 5.2, 5.2);
        }
      }

      ctx.strokeStyle = axis;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      ctx.strokeRect(ox + 0.5, oy + 0.5, size - 1, size - 1);
      ctx.globalAlpha = 1;
    },
    [data, act, stats.epoch, stats.loss, depth, width, seed],
  );

  // --- loss curve ----------------------------------------------------------
  const { canvasRef: lossCanvas } = useResponsiveCanvas(
    (ctx, w, h) => {
      const resolve = makeResolve();
      const grid = resolve(VIZ.grid, 'rgba(128,128,128,0.3)');
      const line = resolve(VIZ.series, '#8164f7');
      const axis = resolve(VIZ.axis, '#888');
      const hist = lossRef.current;
      const pad = { l: 30, r: 8, t: 8, b: 14 };
      const pw = w - pad.l - pad.r;
      const ph = h - pad.t - pad.b;
      if (pw <= 0 || ph <= 0) return;

      const top = Math.max(0.25, ...hist.slice(0, 4), hist[0] ?? 0.72);
      ctx.strokeStyle = grid;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 2; i++) {
        const gy = pad.t + (ph / 2) * i;
        ctx.beginPath();
        ctx.moveTo(pad.l, gy);
        ctx.lineTo(w - pad.r, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(top.toFixed(2), pad.l - 5, pad.t + 4);
      ctx.fillText('0', pad.l - 5, pad.t + ph + 3);
      ctx.textAlign = 'left';
      ctx.fillText('loss per epoch', pad.l + 4, h - 3);

      if (hist.length < 2) return;
      ctx.strokeStyle = line;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let i = 0; i < hist.length; i++) {
        const x = pad.l + (i / (hist.length - 1)) * pw;
        const y = pad.t + ph - Math.min(1, hist[i] / top) * ph;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    },
    [stats.epoch, stats.loss],
  );

  // --- network diagram ------------------------------------------------------
  const net = netRef.current;
  const wmax = Math.max(0.2, stats.wmax);
  const diagram = React.useMemo(() => {
    const W = 320;
    const H = 150;
    const cols = net.sizes.length;
    const xs = net.sizes.map((_, l) => 26 + (l * (W - 52)) / Math.max(1, cols - 1));
    const ys = net.sizes.map((n) =>
      new Array(n).fill(0).map((_, j) => H / 2 + (j - (n - 1) / 2) * Math.min(24, (H - 30) / Math.max(1, n))),
    );
    return { W, H, xs, ys };
  }, [net.sizes]);

  const verdict =
    stats.epoch === 0
      ? 'Untrained. The boundary is whatever the random initialisation happened to draw.'
      : stats.acc > 0.97
        ? 'Separated. The boundary has found the structure.'
        : stats.acc > 0.85
          ? 'Most points on the right side; the awkward ones are near the boundary.'
          : stats.loss > 0.69
            ? 'Not learning. Try a smaller learning rate, or more units.'
            : 'Still bending. Keep training, or add width.';

  return (
    <WidgetShell
      takeaway="A hidden layer is what lets the boundary bend. Watch the edges: training is nothing but those weights changing, and the curve you see is the direct consequence of their values."
      readout={
        <Readout
          items={[
            { label: 'Epoch', value: String(stats.epoch) },
            { label: 'Loss', value: stats.loss.toFixed(4), tone: stats.loss < 0.1 ? 'good' : stats.loss > 0.6 ? 'warn' : 'default' },
            { label: 'Accuracy', value: `${(stats.acc * 100).toFixed(1)}%`, tone: stats.acc > 0.95 ? 'good' : stats.acc < 0.7 ? 'bad' : 'default' },
            { label: 'Params', value: String(sizes.slice(0, -1).reduce((s, n, i) => s + n * sizes[i + 1] + sizes[i + 1], 0)) },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Toggle
              label="Dataset"
              value={dataset}
              onChange={(v) => setDataset(v as DataKind)}
              options={[
                { value: 'linear', label: 'Linear' },
                { value: 'xor', label: 'XOR' },
                { value: 'circles', label: 'Circles' },
                { value: 'spiral', label: 'Spiral' },
              ]}
            />
            <PlayButton
              playing={playing}
              onToggle={() => setPlaying((p) => !p)}
              onStep={() => runEpochs(20)}
              onReset={reset}
              label="training"
            />
          </div>
          <Toggle
            label="Hidden activation"
            value={act}
            onChange={(v) => setAct(v as ActName)}
            options={Object.entries(ACTS).map(([value, a]) => ({ value, label: a.label }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label="Hidden layers" value={depth} min={1} max={3} step={1} onChange={setDepth} />
            <Slider label="Neurons per layer" value={width} min={2} max={8} step={1} onChange={setWidth} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider
              label="Learning rate"
              value={lr}
              min={0.02}
              max={3}
              step={0.02}
              onChange={setLr}
              format={(v) => v.toFixed(2)}
            />
            <Slider
              label="Seed (sample and initialisation)"
              value={seed}
              min={1}
              max={12}
              step={1}
              onChange={setSeed}
              hint="Same seed, same run — every time."
            />
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            {DATA_NOTE[dataset]} {ACTS[act].note}
          </p>
        </>
      }
    >
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="h-60 w-full bg-surface p-1">
          <canvas
            ref={canvasRef}
            className="block"
            role="img"
            aria-label={`Decision boundary after ${stats.epoch} epochs, accuracy ${(stats.acc * 100).toFixed(0)} percent`}
          />
        </div>
        <div className="bg-surface">
          <svg
            viewBox={`0 0 ${diagram.W} ${diagram.H}`}
            className="block h-40 w-full"
            role="img"
            aria-label={`Network diagram: ${net.sizes.join(' to ')} units, edge thickness showing weight magnitude`}
          >
            {net.W.map((layer, l) =>
              layer.map((row, j) =>
                row.map((w, i) => (
                  <line
                    key={`${l}-${j}-${i}`}
                    x1={diagram.xs[l]}
                    y1={diagram.ys[l][i]}
                    x2={diagram.xs[l + 1]}
                    y2={diagram.ys[l + 1][j]}
                    stroke={w >= 0 ? VIZ.series : VIZ.warn}
                    strokeDasharray={w >= 0 ? undefined : '3 2'}
                    strokeWidth={0.4 + (Math.abs(w) / wmax) * 3.2}
                    strokeOpacity={0.25 + (Math.abs(w) / wmax) * 0.7}
                  />
                )),
              ),
            )}
            {net.sizes.map((n, l) =>
              new Array(n).fill(0).map((_, j) => (
                <circle
                  key={`n-${l}-${j}`}
                  cx={diagram.xs[l]}
                  cy={diagram.ys[l][j]}
                  r={5.5}
                  fill="hsl(var(--c-surface-2))"
                  stroke="hsl(var(--c-border-strong))"
                  strokeWidth={1}
                />
              )),
            )}
            <text x={diagram.xs[0]} y={diagram.H - 4} fontSize="9" textAnchor="middle" fill="hsl(var(--c-text-subtle))">
              x, y
            </text>
            <text
              x={diagram.xs[diagram.xs.length - 1]}
              y={diagram.H - 4}
              fontSize="9"
              textAnchor="middle"
              fill="hsl(var(--c-text-subtle))"
            >
              p
            </text>
          </svg>
          <div className="h-20 w-full px-1 pb-1">
            <canvas ref={lossCanvas} className="block" role="img" aria-label="Training loss per epoch" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-4 py-2 text-[11px] text-subtle">
        <span>
          <span className="mr-1 inline-block h-[2px] w-4 align-middle" style={{ background: VIZ.series }} /> positive
          weight (solid)
        </span>
        <span>
          <span
            className="mr-1 inline-block h-[2px] w-4 align-middle"
            style={{ background: VIZ.warn, opacity: 0.85 }}
          />{' '}
          negative weight (dashed)
        </span>
        <span>thickness = |w|, largest {wmax.toFixed(2)}</span>
        <span className="text-muted">{verdict}</span>
      </div>
      {reduced && (
        <p className="border-t border-line px-4 py-2 text-[11.5px] leading-relaxed text-subtle">
          Continuous training is off because you have asked for reduced motion. Each press of{' '}
          <strong className="text-ink">Step</strong> runs twenty epochs and redraws the boundary.
        </p>
      )}
    </WidgetShell>
  );
}
