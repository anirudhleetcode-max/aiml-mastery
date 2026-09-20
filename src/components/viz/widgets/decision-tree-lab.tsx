'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * A decision tree grown one level at a time, shown twice.
 *
 * On the canvas: the plane, carved into axis-aligned boxes. In the panel
 * below: the same tree as a diagram, with the impurity and the class counts
 * at every node. Watching the two together is the point — a node in the
 * diagram *is* a rectangle on the plane, and a split *is* a vertical or
 * horizontal line.
 *
 * The split search is real CART: for each feature, sort the points, sweep
 * every threshold between neighbouring values, and keep the one that lowers
 * the weighted impurity of the children the most.
 *
 * Eight per cent of the labels are deliberately wrong. That is what makes the
 * overfitting visible: past depth three the tree starts growing boxes whose
 * only job is to enclose a single mislabelled point, training accuracy runs
 * to 100%, and the held-out accuracy falls.
 */

interface Pt {
  x: number;
  y: number;
  label: 0 | 1;
  test: boolean;
}

interface Bounds {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

interface TNode {
  depth: number;
  counts: [number, number];
  n: number;
  impurity: number;
  bounds: Bounds;
  feature?: 0 | 1;
  threshold?: number;
  left?: TNode;
  right?: TNode;
}

type Crit = 'gini' | 'entropy';

const LIM = 5;
const PAD = { l: 28, r: 12, t: 12, b: 24 };

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
  const pts: Pt[] = [];
  for (let i = 0; i < 130; i++) {
    const x = (rng() * 2 - 1) * 4.7;
    const y = (rng() * 2 - 1) * 4.7;
    // A pattern a tree can express exactly: two opposite corners.
    const clean: 0 | 1 = (x > 0.4 && y > 0.2) || (x < -1.2 && y < -0.8) ? 1 : 0;
    const flipped = rng() < 0.08;
    pts.push({ x, y, label: (flipped ? (1 - clean) : clean) as 0 | 1, test: rng() < 0.4 });
  }
  return pts;
}

function impurityOf(counts: [number, number], crit: Crit): number {
  const n = counts[0] + counts[1];
  if (n === 0) return 0;
  const p0 = counts[0] / n;
  const p1 = counts[1] / n;
  if (crit === 'gini') return 1 - p0 * p0 - p1 * p1;
  const term = (p: number) => (p <= 0 ? 0 : -p * Math.log2(p));
  return term(p0) + term(p1);
}

function countOf(idx: number[], pts: Pt[]): [number, number] {
  let a = 0;
  let b = 0;
  for (const i of idx) {
    if (pts[i]!.label === 0) a += 1;
    else b += 1;
  }
  return [a, b];
}

/** Exhaustive threshold sweep on both features — the actual CART split search. */
function bestSplit(idx: number[], pts: Pt[], crit: Crit) {
  const parent = countOf(idx, pts);
  const n = idx.length;
  const parentImp = impurityOf(parent, crit);
  let best: { feature: 0 | 1; threshold: number; gain: number } | null = null;

  for (const feature of [0, 1] as const) {
    const sorted = idx
      .map((i) => ({ v: feature === 0 ? pts[i]!.x : pts[i]!.y, label: pts[i]!.label }))
      .sort((a, b) => a.v - b.v);
    const left: [number, number] = [0, 0];
    const right: [number, number] = [parent[0], parent[1]];
    for (let i = 0; i < n - 1; i++) {
      const s = sorted[i]!;
      left[s.label] += 1;
      right[s.label] -= 1;
      const next = sorted[i + 1]!;
      if (next.v - s.v < 1e-9) continue;
      const nl = i + 1;
      const nr = n - nl;
      const weighted = (nl / n) * impurityOf(left, crit) + (nr / n) * impurityOf(right, crit);
      const gain = parentImp - weighted;
      if (!best || gain > best.gain) best = { feature, threshold: (s.v + next.v) / 2, gain };
    }
  }
  return best;
}

function build(idx: number[], depth: number, bounds: Bounds, pts: Pt[], crit: Crit, maxDepth: number): TNode {
  const counts = countOf(idx, pts);
  const node: TNode = { depth, counts, n: idx.length, impurity: impurityOf(counts, crit), bounds };
  if (depth >= maxDepth || node.impurity === 0 || idx.length < 4) return node;
  const split = bestSplit(idx, pts, crit);
  if (!split || split.gain <= 1e-9) return node;
  const leftIdx = idx.filter((i) => (split.feature === 0 ? pts[i]!.x : pts[i]!.y) <= split.threshold);
  const rightIdx = idx.filter((i) => (split.feature === 0 ? pts[i]!.x : pts[i]!.y) > split.threshold);
  if (leftIdx.length === 0 || rightIdx.length === 0) return node;
  node.feature = split.feature;
  node.threshold = split.threshold;
  node.left = build(
    leftIdx,
    depth + 1,
    split.feature === 0 ? { ...bounds, x1: split.threshold } : { ...bounds, y1: split.threshold },
    pts,
    crit,
    maxDepth,
  );
  node.right = build(
    rightIdx,
    depth + 1,
    split.feature === 0 ? { ...bounds, x0: split.threshold } : { ...bounds, y0: split.threshold },
    pts,
    crit,
    maxDepth,
  );
  return node;
}

function predict(node: TNode, p: { x: number; y: number }): 0 | 1 {
  let cur = node;
  while (cur.left && cur.right && cur.feature !== undefined && cur.threshold !== undefined) {
    const v = cur.feature === 0 ? p.x : p.y;
    cur = v <= cur.threshold ? cur.left : cur.right;
  }
  return cur.counts[1] > cur.counts[0] ? 1 : 0;
}

function leavesOf(node: TNode, out: TNode[] = []): TNode[] {
  if (!node.left || !node.right) out.push(node);
  else {
    leavesOf(node.left, out);
    leavesOf(node.right, out);
  }
  return out;
}

export default function DecisionTreeLab() {
  const [seed, setSeed] = React.useState(4);
  const [maxDepth, setMaxDepth] = React.useState(2);
  const [crit, setCrit] = React.useState<Crit>('gini');

  const points = React.useMemo(() => makeData(seed), [seed]);
  const trainIdx = React.useMemo(() => points.map((_, i) => i).filter((i) => !points[i]!.test), [points]);
  const testIdx = React.useMemo(() => points.map((_, i) => i).filter((i) => points[i]!.test), [points]);

  const tree = React.useMemo(
    () => build(trainIdx, 0, { x0: -LIM, x1: LIM, y0: -LIM, y1: LIM }, points, crit, maxDepth),
    [trainIdx, points, crit, maxDepth],
  );

  const leaves = React.useMemo(() => leavesOf(tree), [tree]);

  const acc = React.useMemo(() => {
    const score = (list: number[]) => {
      if (list.length === 0) return 0;
      let ok = 0;
      for (const i of list) if (predict(tree, points[i]!) === points[i]!.label) ok += 1;
      return ok / list.length;
    };
    return { train: score(trainIdx), test: score(testIdx) };
  }, [tree, points, trainIdx, testIdx]);

  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const cls1 = resolve('var(--viz-cat-mastered)', '#199e70');
      const cls0 = resolve('var(--viz-cat-learning)', '#3987e5');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      const X = (v: number) => PAD.l + ((v + LIM) / (2 * LIM)) * plotW;
      const Y = (v: number) => PAD.t + plotH - ((v + LIM) / (2 * LIM)) * plotH;

      // Leaf rectangles, tinted by their majority class and how pure they are.
      for (const leaf of leaves) {
        const n = leaf.n || 1;
        const purity = Math.max(leaf.counts[0], leaf.counts[1]) / n;
        const major = leaf.counts[1] > leaf.counts[0] ? 1 : 0;
        ctx.globalAlpha = 0.08 + (purity - 0.5) * 0.44;
        ctx.fillStyle = major === 1 ? cls1 : cls0;
        const x = X(leaf.bounds.x0);
        const y = Y(leaf.bounds.y1);
        ctx.fillRect(x, y, X(leaf.bounds.x1) - x, Y(leaf.bounds.y0) - y);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 0.75;
        ctx.globalAlpha = 0.35;
        ctx.strokeRect(x, y, X(leaf.bounds.x1) - x, Y(leaf.bounds.y0) - y);
        ctx.globalAlpha = 1;
      }

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);

      for (const p of points) {
        const px = X(p.x);
        const py = Y(p.y);
        const wrong = predict(tree, p) !== p.label;
        ctx.globalAlpha = p.test ? 0.95 : 0.85;
        ctx.fillStyle = p.label === 1 ? cls1 : cls0;
        if (p.label === 1) {
          ctx.beginPath();
          ctx.arc(px, py, p.test ? 3.6 : 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(px - 3, py - 3, 6, 6);
        }
        if (wrong) {
          ctx.globalAlpha = 1;
          ctx.strokeStyle = resolve('var(--viz-cat-review)', '#d95926');
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('x₁', PAD.l + plotW / 2, h - 8);
      ctx.save();
      ctx.translate(10, PAD.t + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('x₂', 0, 0);
      ctx.restore();
    },
    [points, leaves, tree],
  );

  // Tree diagram layout: leaves in reading order, parents centred over children.
  const layout = React.useMemo(() => {
    const NODE_W = 78;
    const NODE_H = 38;
    const GAP_Y = 26;
    const nodes: { node: TNode; x: number; y: number }[] = [];
    const edges: { x1: number; y1: number; x2: number; y2: number; label: string }[] = [];
    let cursor = 0;
    const walk = (node: TNode): number => {
      const y = node.depth * (NODE_H + GAP_Y) + NODE_H / 2 + 6;
      let x: number;
      if (!node.left || !node.right) {
        x = cursor * (NODE_W + 10) + NODE_W / 2 + 6;
        cursor += 1;
      } else {
        const lx = walk(node.left);
        const rx = walk(node.right);
        x = (lx + rx) / 2;
        edges.push({ x1: x, y1: y + NODE_H / 2, x2: lx, y2: y + NODE_H + GAP_Y - NODE_H / 2, label: 'yes' });
        edges.push({ x1: x, y1: y + NODE_H / 2, x2: rx, y2: y + NODE_H + GAP_Y - NODE_H / 2, label: 'no' });
      }
      nodes.push({ node, x, y });
      return x;
    };
    walk(tree);
    const width = Math.max(240, cursor * (NODE_W + 10) + 12);
    const height = (maxDepth + 1) * (NODE_H + GAP_Y) + 12;
    return { nodes, edges, width, height, NODE_W, NODE_H };
  }, [tree, maxDepth]);

  const gap = acc.train - acc.test;

  return (
    <WidgetShell
      takeaway="Every node in the diagram is a rectangle on the plane. Raise the depth past three and the tree stops finding structure and starts building boxes around individual mislabelled points: training accuracy climbs to 100% while held-out accuracy falls. That gap is overfitting, measured."
      readout={
        <Readout
          items={[
            { label: 'Leaves', value: String(leaves.length) },
            { label: 'Train accuracy', value: `${(acc.train * 100).toFixed(1)}%`, tone: 'default' },
            { label: 'Test accuracy', value: `${(acc.test * 100).toFixed(1)}%`, tone: acc.test > 0.85 ? 'good' : acc.test < 0.75 ? 'bad' : 'default' },
            { label: 'Gap', value: `${(gap * 100).toFixed(1)} pts`, tone: gap > 0.1 ? 'bad' : gap > 0.05 ? 'warn' : 'good' },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Maximum depth"
            value={maxDepth}
            min={0}
            max={5}
            step={1}
            onChange={setMaxDepth}
            format={(v) => (v === 0 ? '0 (no splits)' : String(v))}
            hint="Depth 0 predicts the majority class everywhere. Each extra level can double the number of boxes."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Toggle
              label="Impurity measure"
              value={crit}
              onChange={(v) => setCrit(v as Crit)}
              options={[
                { value: 'gini', label: 'Gini' },
                { value: 'entropy', label: 'Entropy' },
              ]}
            />
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New data
            </button>
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            {crit === 'gini'
              ? 'Gini = 1 − p₀² − p₁². Zero when a node holds one class only, 0.5 when it is an even mix.'
              : 'Entropy = −p₀log₂p₀ − p₁log₂p₁, in bits. Zero for a pure node, 1 for an even mix. It picks almost the same splits as Gini, a little more slowly.'}
          </p>
        </>
      }
    >
      <div className="h-64 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`Scatter plot partitioned into ${leaves.length} axis-aligned boxes by a depth-${maxDepth} decision tree. Training accuracy ${(acc.train * 100).toFixed(0)} percent, test accuracy ${(acc.test * 100).toFixed(0)} percent.`}
        />
      </div>
      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          The tree ({crit === 'gini' ? 'Gini' : 'entropy'} and class counts at every node)
        </p>
        <div className="overflow-x-auto">
          <svg
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            role="img"
            aria-label={`Tree diagram with ${layout.nodes.length} nodes and ${leaves.length} leaves.`}
            className="block"
          >
            {layout.edges.map((e, i) => (
              <line
                key={`e${i}`}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                className="stroke-line-strong"
                strokeWidth={1.25}
              />
            ))}
            {layout.nodes.map((n, i) => {
              const leaf = !n.node.left || !n.node.right;
              const major = n.node.counts[1] > n.node.counts[0] ? 1 : 0;
              return (
                <g key={`n${i}`} transform={`translate(${n.x - layout.NODE_W / 2}, ${n.y - layout.NODE_H / 2})`}>
                  <rect
                    width={layout.NODE_W}
                    height={layout.NODE_H}
                    rx={6}
                    className={
                      leaf
                        ? major === 1
                          ? 'fill-viz-mastered/20 stroke-viz-mastered'
                          : 'fill-viz-learning/20 stroke-viz-learning'
                        : 'fill-surface-2 stroke-line-strong'
                    }
                    strokeWidth={1}
                  />
                  <text x={layout.NODE_W / 2} y={14} textAnchor="middle" className="fill-ink text-[9.5px] font-medium">
                    {leaf
                      ? major === 1
                        ? 'predict A'
                        : 'predict B'
                      : `${n.node.feature === 0 ? 'x₁' : 'x₂'} ≤ ${n.node.threshold!.toFixed(2)}`}
                  </text>
                  <text x={layout.NODE_W / 2} y={25} textAnchor="middle" className="fill-muted text-[8.5px]">
                    {crit === 'gini' ? 'gini' : 'H'} {n.node.impurity.toFixed(3)}
                  </text>
                  <text x={layout.NODE_W / 2} y={34} textAnchor="middle" className="fill-subtle text-[8.5px]">
                    {n.node.counts[1]} A / {n.node.counts[0]} B
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Left branch is &ldquo;yes&rdquo;. Circles are class A, squares class B; an orange ring marks a point the tree
          gets wrong. Forty per cent of the points are held out and never used to choose a split.
        </p>
      </div>
    </WidgetShell>
  );
}
