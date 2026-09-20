'use client';

import * as React from 'react';
import { PlayButton, Readout, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * BFS and DFS on one graph, with the container on screen.
 *
 * The algorithms differ by a single line — take from the front, or take from
 * the top — and every other difference follows from it. So this widget refuses
 * to describe the difference and shows it instead, three ways at once:
 *
 *   1. Every node carries its distance from the start (L0, L1, L2 …). BFS
 *      fills every L1 before touching an L2; DFS is at L4 by its seventh
 *      visit while an L1 node is still untouched.
 *   2. The queue or stack is drawn as chips with the "next out" end marked,
 *      because that end *is* the algorithm.
 *   3. The discovery edges thicken as they are used. BFS draws a fan; DFS
 *      draws a rope. Same graph, same edges available, different picture.
 *
 * The comparison strip underneath holds both visit orders at once, so the
 * divergence is readable without replaying anything.
 */

const BTN =
  'rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40';

const C = {
  ink: 'hsl(var(--c-text))',
  muted: 'hsl(var(--c-text-muted))',
  subtle: 'hsl(var(--c-text-subtle))',
  line: 'hsl(var(--c-border))',
  surface2: 'hsl(var(--c-surface-2))',
  surface3: 'hsl(var(--c-surface-3))',
  primary: 'hsl(var(--c-primary))',
  accent: 'hsl(var(--c-accent))',
  warning: 'hsl(var(--c-warning))',
} as const;

/** One validated categorical colour per distance ring, always paired with the L-label. */
const LAYER_COLOURS = [
  'hsl(var(--c-accent))',
  'var(--viz-cat-mastered)',
  'var(--viz-series)',
  'var(--viz-cat-review)',
  'var(--viz-cat-learning)',
];

interface GNode {
  id: string;
  x: number;
  y: number;
}

const NODES: GNode[] = [
  { id: 'A', x: 32, y: 116 },
  { id: 'B', x: 104, y: 44 },
  { id: 'C', x: 104, y: 116 },
  { id: 'D', x: 104, y: 190 },
  { id: 'E', x: 180, y: 26 },
  { id: 'F', x: 180, y: 104 },
  { id: 'G', x: 180, y: 198 },
  { id: 'H', x: 254, y: 60 },
  { id: 'I', x: 254, y: 158 },
  { id: 'J', x: 310, y: 108 },
];

/** Neighbour lists are ordered, and the order is shown, so every step is reproducible. */
const ADJ: Record<string, string[]> = {
  A: ['B', 'C', 'D'],
  B: ['A', 'E', 'F'],
  C: ['A', 'F'],
  D: ['A', 'G'],
  E: ['B', 'H'],
  F: ['B', 'C', 'H'],
  G: ['D', 'I'],
  H: ['E', 'F', 'J', 'I'],
  I: ['G', 'J', 'H'],
  J: ['H', 'I'],
};

const EDGES: [string, string][] = (() => {
  const out: [string, string][] = [];
  for (const [a, ns] of Object.entries(ADJ)) {
    for (const b of ns) if (a < b) out.push([a, b]);
  }
  return out;
})();

type Algo = 'bfs' | 'dfs';

interface Frame {
  /** Contents of the queue or stack after this step. Index 0 is "next out" for BFS, last is for DFS. */
  container: string[];
  visited: string[];
  current: string | null;
  tree: [string, string][];
  note: string;
}

function distances(start: string): Record<string, number> {
  const dist: Record<string, number> = { [start]: 0 };
  const queue = [start];
  while (queue.length) {
    const n = queue.shift() as string;
    for (const m of ADJ[n]) {
      if (dist[m] === undefined) {
        dist[m] = dist[n] + 1;
        queue.push(m);
      }
    }
  }
  return dist;
}

function buildFrames(algo: Algo, start: string, dist: Record<string, number>): Frame[] {
  const frames: Frame[] = [];
  const visited: string[] = [];
  const tree: [string, string][] = [];

  if (algo === 'bfs') {
    const seen = new Set([start]);
    const queue: string[] = [start];
    frames.push({
      container: [...queue],
      visited: [],
      current: null,
      tree: [],
      note: `${start} goes into the queue. A queue hands back whatever has waited longest, and that single rule is what makes the search expand as a ring.`,
    });
    while (queue.length) {
      const node = queue.shift() as string;
      visited.push(node);
      const fresh = ADJ[node].filter((n) => !seen.has(n));
      for (const n of fresh) {
        seen.add(n);
        queue.push(n);
        tree.push([node, n]);
      }
      frames.push({
        container: [...queue],
        visited: [...visited],
        current: node,
        tree: [...tree],
        note: fresh.length
          ? `Dequeue ${node} (L${dist[node]}). Its unseen neighbours ${fresh.join(', ')} join the back of the queue, behind everything already waiting — so the rest of L${dist[node]} is served before any of them.`
          : `Dequeue ${node} (L${dist[node]}). Every neighbour is already in the queue or visited, so nothing is added. The ring keeps closing.`,
      });
    }
  } else {
    const stack: string[] = [start];
    const onStack = new Map<string, string | null>([[start, null]]);
    frames.push({
      container: [...stack],
      visited: [],
      current: null,
      tree: [],
      note: `${start} goes onto the stack. A stack hands back whatever arrived most recently, which is why this search commits to one branch and rides it to the end.`,
    });
    while (stack.length) {
      const node = stack.pop() as string;
      if (visited.includes(node)) continue;
      const parent = onStack.get(node) ?? null;
      if (parent) tree.push([parent, node]);
      visited.push(node);
      const fresh = ADJ[node].filter((n) => !visited.includes(n));
      // Pushed in reverse so the first listed neighbour ends up on top.
      for (let i = fresh.length - 1; i >= 0; i--) {
        stack.push(fresh[i]);
        onStack.set(fresh[i], node);
      }
      frames.push({
        container: [...stack],
        visited: [...visited],
        current: node,
        tree: [...tree],
        note: fresh.length
          ? `Pop ${node} (L${dist[node]}). Push ${fresh.join(', ')} on top. The next pop takes ${fresh[0]}, the newest arrival — so the walk keeps going away from ${start} rather than finishing what it started.`
          : `Pop ${node} (L${dist[node]}). Dead end: nothing new to push, so the next pop backtracks to something left on the stack ages ago.`,
      });
    }
  }
  return frames;
}

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

const VB_W = 340;
const VB_H = 226;

export default function GraphTraversal() {
  const reduced = usePrefersReducedMotion();
  const [algo, setAlgo] = React.useState<Algo>('bfs');
  const [start, setStart] = React.useState('A');
  const [cursor, setCursor] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const dist = React.useMemo(() => distances(start), [start]);
  const frames = React.useMemo(() => buildFrames(algo, start, dist), [algo, start, dist]);
  const other = React.useMemo(() => buildFrames(algo === 'bfs' ? 'dfs' : 'bfs', start, dist), [algo, start, dist]);

  React.useEffect(() => {
    setCursor(0);
    setPlaying(false);
  }, [algo, start]);

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (cursor >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setCursor((c) => Math.min(frames.length - 1, c + 1)), 850);
    return () => window.clearTimeout(id);
  }, [playing, cursor, frames.length, reduced]);

  const frame = frames[Math.min(cursor, frames.length - 1)];
  const visitedAt = new Map<string, number>();
  frame.visited.forEach((id, i) => visitedAt.set(id, i + 1));
  const inContainer = new Set(frame.container);
  const nextOut = frame.container.length
    ? algo === 'bfs'
      ? frame.container[0]
      : frame.container[frame.container.length - 1]
    : null;
  const treeSet = new Set(frame.tree.map(([a, b]) => `${a}|${b}`));

  const maxLayer = Math.max(...Object.values(dist));
  const reachedLayer = frame.visited.length ? Math.max(...frame.visited.map((n) => dist[n])) : -1;
  const layerCounts = Array.from({ length: maxLayer + 1 }, (_, l) => ({
    total: NODES.filter((n) => dist[n.id] === l).length,
    done: frame.visited.filter((n) => dist[n] === l).length,
  }));

  const myOrder = frames[frames.length - 1].visited;
  const otherOrder = other[other.length - 1].visited;
  const bfsOrder = algo === 'bfs' ? myOrder : otherOrder;
  const dfsOrder = algo === 'bfs' ? otherOrder : myOrder;

  /** Two facts that make the divergence numeric rather than impressionistic. */
  const deepest = NODES.map((n) => n.id).reduce((best, id) => (dist[id] > dist[best] ? id : best), start);
  const lateNeighbour = ADJ[start].reduce((best, id) =>
    dfsOrder.indexOf(id) > dfsOrder.indexOf(best) ? id : best,
  );

  const step = () => setCursor((c) => Math.min(frames.length - 1, c + 1));
  const reset = () => {
    setCursor(0);
    setPlaying(false);
  };

  const { ref, w } = useWidth<HTMLDivElement>();
  const boxW = Math.max(300, w);
  const scale = Math.min(1.6, boxW / VB_W);

  return (
    <WidgetShell
      takeaway="BFS and DFS differ by one line — take from the front of a queue, or from the top of a stack — and everything else follows. BFS finishes every node at distance k before it looks at distance k+1, which is why it finds shortest paths; DFS commits to one branch and rides it to the end, which is why it fits recursion and finds cycles."
      readout={
        <Readout
          items={[
            { label: 'Algorithm', value: algo === 'bfs' ? 'BFS (queue, FIFO)' : 'DFS (stack, LIFO)' },
            { label: 'Visited', value: `${frame.visited.length} / ${NODES.length}` },
            {
              label: algo === 'bfs' ? 'Queue' : 'Stack',
              value: frame.container.length ? frame.container.join(' ') : 'empty',
            },
            {
              label: 'Deepest layer reached',
              value: reachedLayer < 0 ? '—' : `L${reachedLayer} of L${maxLayer}`,
              tone: algo === 'dfs' && reachedLayer === maxLayer && frame.visited.length < NODES.length ? 'warn' : 'default',
            },
            { label: 'Order', value: frame.visited.join(' ') || '—' },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Traversal"
            value={algo}
            onChange={(v) => setAlgo(v as Algo)}
            options={[
              { value: 'bfs', label: 'BFS — queue' },
              { value: 'dfs', label: 'DFS — stack' },
            ]}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            {reduced ? (
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={step} disabled={cursor >= frames.length - 1} className={BTN}>
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
                  if (cursor >= frames.length - 1) setCursor(0);
                  setPlaying((p) => !p);
                }}
                onStep={step}
                onReset={reset}
                label="the traversal"
              />
            )}
            <p className="text-[11px] text-subtle">
              Step {cursor} of {frames.length - 1} · click a node to start there
            </p>
          </div>
        </>
      }
    >
      {/* ---- the container: the one line that differs ---- */}
      <div className="border-b border-line bg-surface-2/40 px-4 py-2.5">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3">
          <span className="text-[12px] font-medium text-ink">
            {algo === 'bfs' ? 'Queue' : 'Stack'}
          </span>
          <span className="text-[11px] text-subtle">
            {algo === 'bfs' ? 'take from the front — oldest first' : 'take from the top — newest first'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {frame.container.length === 0 && <span className="text-[11.5px] text-subtle">empty — the search is finished</span>}
          {frame.container.map((id, i) => (
            <span
              key={`${id}-${i}`}
              className={cn(
                'rounded border px-1.5 py-0.5 font-mono text-[11.5px]',
                id === nextOut ? 'border-accent bg-accent/15 text-ink' : 'border-line bg-surface-3 text-muted',
              )}
            >
              {id}
              {id === nextOut && <span className="ml-1 text-[9px] text-accent">next</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ---- the graph ---- */}
      <div ref={ref} className="w-full overflow-hidden px-2 pt-2">
        <svg
          width={boxW}
          height={VB_H * scale}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label={`Graph of ten nodes explored by ${algo === 'bfs' ? 'breadth-first' : 'depth-first'} search from ${start}. Visited so far: ${frame.visited.join(', ') || 'none'}.`}
          className="block"
        >
          {EDGES.map(([a, b]) => {
            const na = NODES.find((n) => n.id === a) as GNode;
            const nb = NODES.find((n) => n.id === b) as GNode;
            const isTree = treeSet.has(`${a}|${b}`) || treeSet.has(`${b}|${a}`);
            return (
              <line
                key={`${a}${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={isTree ? C.primary : C.line}
                strokeWidth={isTree ? 2.6 : 1.2}
                opacity={isTree ? 1 : 0.8}
              />
            );
          })}

          {NODES.map((n) => {
            const at = visitedAt.get(n.id);
            const layer = dist[n.id] ?? 0;
            const colour = LAYER_COLOURS[Math.min(layer, LAYER_COLOURS.length - 1)];
            const isCurrent = frame.current === n.id;
            const waiting = inContainer.has(n.id) && !at;
            return (
              <g key={n.id} onClick={() => setStart(n.id)} style={{ cursor: 'pointer' }}>
                {waiting && (
                  <circle cx={n.x} cy={n.y} r={19} fill="none" stroke={C.warning} strokeWidth={1.2} strokeDasharray="3 3" />
                )}
                {isCurrent && <circle cx={n.x} cy={n.y} r={20.5} fill="none" stroke={C.accent} strokeWidth={2} />}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={14}
                  fill={at ? C.surface3 : C.surface2}
                  stroke={at ? colour : C.line}
                  strokeWidth={at ? 3 : 1.2}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="ui-monospace, monospace"
                  fill={at ? C.ink : C.subtle}
                >
                  {n.id}
                </text>
                {/* distance label: the wave is never carried by colour alone */}
                <text
                  x={n.x}
                  y={n.y + 25}
                  textAnchor="middle"
                  fontSize={8.5}
                  fontFamily="ui-monospace, monospace"
                  fill={at ? C.muted : C.subtle}
                >
                  L{layer}
                </text>
                {at && (
                  <>
                    <circle cx={n.x + 13} cy={n.y - 13} r={7.5} fill={C.surface3} stroke={colour} strokeWidth={1.2} />
                    <text
                      x={n.x + 13}
                      y={n.y - 10}
                      textAnchor="middle"
                      fontSize={8.5}
                      fontWeight={600}
                      fontFamily="ui-monospace, monospace"
                      fill={C.ink}
                    >
                      {at}
                    </text>
                  </>
                )}
                {n.id === start && (
                  <text x={n.x} y={n.y - 20} textAnchor="middle" fontSize={9} fill={C.accent}>
                    start
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ---- layer progress: the wave, as numbers ---- */}
      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Nodes visited, by distance from {start}
        </p>
        <div className="space-y-1">
          {layerCounts.map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 shrink-0 font-mono text-[11px] text-subtle">L{i}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{
                    width: `${(l.done / l.total) * 100}%`,
                    background: LAYER_COLOURS[Math.min(i, LAYER_COLOURS.length - 1)],
                  }}
                />
              </div>
              <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted">
                {l.done}/{l.total}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
          {algo === 'bfs'
            ? 'Watch the bars fill strictly top to bottom. A BFS bar never starts until the one above it is full — that is the guarantee that makes BFS a shortest-path algorithm on an unweighted graph.'
            : 'Watch several bars fill at once, out of order. DFS reaches the far side of the graph before it has finished the nodes next door, so the step at which it first sees a node says nothing about how far away that node is.'}
        </p>
      </div>

      <div className="border-t border-line px-4 py-2.5">
        <p className="text-[12px] leading-relaxed text-muted">{frame.note}</p>
      </div>

      {/* ---- both orders, side by side ---- */}
      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Visit order, both algorithms
        </p>
        {(
          [
            ['BFS', bfsOrder, algo === 'bfs'] as const,
            ['DFS', dfsOrder, algo === 'dfs'] as const,
          ]
        ).map(([name, order, active]) => (
          <div key={name} className={cn('mb-1 flex items-center gap-2', !active && 'opacity-60')}>
            <span className={cn('w-8 shrink-0 text-[11px] font-medium', active ? 'text-ink' : 'text-subtle')}>{name}</span>
            <div className="flex flex-wrap gap-1">
              {order.map((id, i) => (
                <span
                  key={`${name}-${id}`}
                  className={cn(
                    'rounded border px-1 py-0.5 font-mono text-[11px]',
                    active && i < frame.visited.length ? 'border-line bg-surface-2 text-ink' : 'border-line text-subtle',
                  )}
                  style={{
                    borderColor: active && i < frame.visited.length ? LAYER_COLOURS[Math.min(dist[id], 4)] : undefined,
                  }}
                >
                  {id}
                  <span className="ml-0.5 text-[8.5px] text-subtle">{dist[id]}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
        <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
          {deepest} sits {dist[deepest]} edges from {start}: BFS reaches it {bfsOrder.indexOf(deepest) + 1}th, DFS{' '}
          {dfsOrder.indexOf(deepest) + 1}th. {lateNeighbour} is a single edge from {start}, yet DFS leaves it until{' '}
          {dfsOrder.indexOf(lateNeighbour) + 1}th while BFS takes it {bfsOrder.indexOf(lateNeighbour) + 1}th. Both
          visit all {NODES.length} nodes and both cost O(V + E); only the order differs, and the order is the reason you
          pick one.
        </p>
      </div>
    </WidgetShell>
  );
}
