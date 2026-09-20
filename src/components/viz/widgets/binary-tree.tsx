'use client';

import * as React from 'react';
import { PlayButton, Readout, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Four traversals over one tree.
 *
 * The names (pre-, in-, post-order) say where the *root* is handled relative
 * to its children, and that is the only thing that changes — the walk itself
 * is identical. Stepping makes that visible: the same edges are followed in
 * the same order, but the moment a node is emitted moves. Inorder on a BST
 * coming out sorted is the payoff, so the output row is always on screen.
 *
 * The shape toggle exists for the other half of the lesson: the same seven
 * values inserted in sorted order give a tree of height 6, and every "O(log n)
 * search" claim quietly assumes that did not happen.
 */

const BTN =
  'rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40';

const C = {
  ink: 'hsl(var(--c-text))',
  subtle: 'hsl(var(--c-text-subtle))',
  line: 'hsl(var(--c-border))',
  surface2: 'hsl(var(--c-surface-2))',
  surface3: 'hsl(var(--c-surface-3))',
  primary: 'hsl(var(--c-primary))',
  primaryContrast: 'hsl(var(--c-primary-contrast))',
  accent: 'hsl(var(--c-accent))',
  success: 'hsl(var(--c-success))',
} as const;

interface TNode {
  value: number;
  left: number;
  right: number;
  depth: number;
  /** Position in the inorder walk — doubles as the x coordinate. */
  slot: number;
}

const BALANCED = [50, 30, 70, 20, 40, 60, 80];
const SKEWED = [20, 30, 40, 50, 60, 70, 80];

/** Ordinary BST insertion, so the shape follows from the insertion order. */
function buildTree(order: number[]): TNode[] {
  const nodes: TNode[] = [];
  const add = (value: number) => {
    const node: TNode = { value, left: -1, right: -1, depth: 0, slot: 0 };
    nodes.push(node);
    const self = nodes.length - 1;
    if (self === 0) return;
    let cur = 0;
    let depth = 1;
    for (;;) {
      if (value < nodes[cur].value) {
        if (nodes[cur].left === -1) {
          nodes[cur].left = self;
          break;
        }
        cur = nodes[cur].left;
      } else {
        if (nodes[cur].right === -1) {
          nodes[cur].right = self;
          break;
        }
        cur = nodes[cur].right;
      }
      depth++;
    }
    node.depth = depth;
  };
  order.forEach(add);

  // Inorder position gives a layout that never overlaps, balanced or not.
  let slot = 0;
  const assign = (i: number) => {
    if (i === -1) return;
    assign(nodes[i].left);
    nodes[i].slot = slot++;
    assign(nodes[i].right);
  };
  assign(0);
  return nodes;
}

type Order = 'pre' | 'in' | 'post' | 'level';

function traverse(nodes: TNode[], order: Order): number[] {
  const out: number[] = [];
  if (nodes.length === 0) return out;
  if (order === 'level') {
    const queue = [0];
    while (queue.length) {
      const i = queue.shift() as number;
      out.push(i);
      if (nodes[i].left !== -1) queue.push(nodes[i].left);
      if (nodes[i].right !== -1) queue.push(nodes[i].right);
    }
    return out;
  }
  const walk = (i: number) => {
    if (i === -1) return;
    if (order === 'pre') out.push(i);
    walk(nodes[i].left);
    if (order === 'in') out.push(i);
    walk(nodes[i].right);
    if (order === 'post') out.push(i);
  };
  walk(0);
  return out;
}

const NOTES: Record<Order, string> = {
  pre: 'Root, then the entire left subtree, then the right. This is the order you would use to copy a tree or print an expression in prefix form — a node is emitted before anything below it exists in the output.',
  in: 'Left, root, right. On a binary search tree this always comes out sorted, which is the reason to keep values ordered by position rather than in a list.',
  post: 'Both children before the parent. This is the order for freeing memory or evaluating an expression tree: a node is only handled once everything under it is finished.',
  level:
    'One depth at a time, driven by a queue instead of recursion. Level order is breadth-first search applied to a tree — and the only one of the four that needs no call stack.',
};

const CODE: Record<Order, string> = {
  pre: 'visit(node); walk(node.left); walk(node.right)',
  in: 'walk(node.left); visit(node); walk(node.right)',
  post: 'walk(node.left); walk(node.right); visit(node)',
  level: 'queue = [root]; while queue: node = queue.pop(0); visit(node); queue += children',
};

function useWidth<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry?.contentRect;
      if (box) setW(Math.round(box.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, w };
}

export default function BinaryTree() {
  const reduced = usePrefersReducedMotion();
  const [shape, setShape] = React.useState<'balanced' | 'skewed'>('balanced');
  const [order, setOrder] = React.useState<Order>('in');
  const [cursor, setCursor] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const nodes = React.useMemo(() => buildTree(shape === 'balanced' ? BALANCED : SKEWED), [shape]);
  const sequence = React.useMemo(() => traverse(nodes, order), [nodes, order]);

  React.useEffect(() => {
    setCursor(0);
    setPlaying(false);
  }, [shape, order]);

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (cursor >= sequence.length) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setCursor((c) => Math.min(sequence.length, c + 1)), 700);
    return () => window.clearTimeout(id);
  }, [playing, cursor, sequence.length, reduced]);

  const visitedAt = new Map<number, number>();
  sequence.slice(0, cursor).forEach((n, k) => visitedAt.set(n, k + 1));
  const current = cursor > 0 ? sequence[cursor - 1] : null;
  const output = sequence.slice(0, cursor).map((i) => nodes[i].value);
  const height = nodes.reduce((m, n) => Math.max(m, n.depth), 0);

  /* ---- layout ---- */
  const GAP_X = 42;
  const GAP_Y = 54;
  const vbW = nodes.length * GAP_X + 24;
  const vbH = (height + 1) * GAP_Y + 24;
  const { ref, w } = useWidth<HTMLDivElement>();
  const boxW = Math.max(280, w);
  const scale = Math.min(1.7, boxW / vbW);
  const x = (n: TNode) => 12 + n.slot * GAP_X + GAP_X / 2;
  const y = (n: TNode) => 24 + n.depth * GAP_Y;

  const step = () => setCursor((c) => Math.min(sequence.length, c + 1));
  const reset = () => {
    setCursor(0);
    setPlaying(false);
  };

  const sortedOut = order === 'in' && cursor === sequence.length;

  return (
    <WidgetShell
      takeaway="All four traversals follow exactly the same edges; they differ only in when a node is written down. Inorder on a search tree is the one that comes out sorted, and level order is the one that needs a queue instead of the call stack."
      readout={
        <Readout
          items={[
            { label: 'Traversal', value: { pre: 'preorder', in: 'inorder', post: 'postorder', level: 'level-order' }[order] },
            { label: 'Visited', value: `${cursor} / ${sequence.length}` },
            { label: 'Current', value: current === null ? '—' : String(nodes[current].value), tone: 'default' },
            { label: 'Output', value: output.join(' ') || '—', tone: sortedOut ? 'good' : 'default' },
            {
              label: 'Tree height',
              value: `${height}`,
              tone: shape === 'skewed' ? 'bad' : 'good',
            },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Traversal order"
            value={order}
            onChange={(v) => setOrder(v as Order)}
            options={[
              { value: 'pre', label: 'Preorder' },
              { value: 'in', label: 'Inorder' },
              { value: 'post', label: 'Postorder' },
              { value: 'level', label: 'Level-order' },
            ]}
          />
          <Toggle
            label="Tree shape (same seven values, different insertion order)"
            value={shape}
            onChange={(v) => setShape(v as 'balanced' | 'skewed')}
            options={[
              { value: 'balanced', label: 'Balanced' },
              { value: 'skewed', label: 'Inserted in sorted order' },
            ]}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            {reduced ? (
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={step} disabled={cursor >= sequence.length} className={BTN}>
                  Step
                </button>
                <button type="button" onClick={reset} className={BTN}>
                  Reset
                </button>
              </div>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => {
                  if (cursor >= sequence.length) setCursor(0);
                  setPlaying((p) => !p);
                }}
                onStep={step}
                onReset={reset}
                label="the traversal"
              />
            )}
            <button type="button" onClick={() => setCursor(sequence.length)} className={BTN}>
              Show all
            </button>
          </div>
        </>
      }
    >
      <div ref={ref} className="w-full overflow-hidden px-2 pt-2">
        <svg
          width={boxW}
          height={vbH * scale}
          viewBox={`0 0 ${vbW} ${vbH}`}
          role="img"
          aria-label={`Binary search tree of ${nodes.length} values, height ${height}. ${
            cursor === 0 ? 'No nodes visited yet.' : `Visited so far: ${output.join(', ')}.`
          }`}
          className="block"
        >
          {/* edges first, so nodes sit on top of them */}
          {nodes.map((n, i) =>
            ([n.left, n.right] as const).map((child, side) =>
              child === -1 ? null : (
                <line
                  key={`${i}-${side}`}
                  x1={x(n)}
                  y1={y(n)}
                  x2={x(nodes[child])}
                  y2={y(nodes[child])}
                  stroke={visitedAt.has(i) && visitedAt.has(child) ? C.primary : C.line}
                  strokeWidth={visitedAt.has(i) && visitedAt.has(child) ? 1.6 : 1.2}
                />
              ),
            ),
          )}

          {nodes.map((n, i) => {
            const at = visitedAt.get(i);
            const isCurrent = i === current;
            return (
              <g key={i}>
                <circle
                  cx={x(n)}
                  cy={y(n)}
                  r={15}
                  fill={at ? C.primary : C.surface2}
                  stroke={isCurrent ? C.accent : at ? C.primary : C.line}
                  strokeWidth={isCurrent ? 2.4 : 1.2}
                />
                <text
                  x={x(n)}
                  y={y(n) + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="ui-monospace, monospace"
                  fill={at ? C.primaryContrast : C.ink}
                >
                  {n.value}
                </text>
                {at && (
                  <>
                    <circle cx={x(n) + 14} cy={y(n) - 13} r={7.5} fill={C.surface3} stroke={C.accent} strokeWidth={1} />
                    <text
                      x={x(n) + 14}
                      y={y(n) - 10}
                      textAnchor="middle"
                      fontSize={8.5}
                      fontWeight={600}
                      fontFamily="ui-monospace, monospace"
                      fill={C.accent}
                    >
                      {at}
                    </text>
                  </>
                )}
                {i === 0 && (
                  <text x={x(n)} y={y(n) - 19} textAnchor="middle" fontSize={9} fill={C.subtle}>
                    root
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Output sequence</p>
        <div className="flex flex-wrap items-center gap-1">
          {sequence.map((nodeIndex, k) => {
            const done = k < cursor;
            return (
              <span
                key={k}
                className={`rounded border px-1.5 py-0.5 font-mono text-[11.5px] ${
                  k === cursor - 1
                    ? 'border-accent bg-accent/15 text-ink'
                    : done
                      ? 'border-line bg-surface-2 text-ink'
                      : 'border-dashed border-line text-subtle opacity-50'
                }`}
              >
                {done ? nodes[nodeIndex].value : '·'}
              </span>
            );
          })}
        </div>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-subtle">{CODE[order]}</p>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{NOTES[order]}</p>
        {sortedOut && (
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-success">
            The output is in ascending order, and it would be for any binary search tree of any shape — sortedness is a
            property of the ordering rule, not of the layout.
          </p>
        )}
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
          {shape === 'skewed'
            ? `Every value was larger than the last, so every insert went right: height ${height} for ${nodes.length} nodes. Searching this costs O(n) — it is a linked list wearing a tree's clothes, and it is why self-balancing trees exist.`
            : `Height ${height} for ${nodes.length} nodes, so a search compares at most ${height + 1} values. That is the O(log n) a balanced tree buys you.`}
        </p>
      </div>
    </WidgetShell>
  );
}
