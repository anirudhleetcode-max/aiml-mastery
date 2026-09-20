'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * The call tree of fib(n), and what memoisation does to it.
 *
 * "Naive fibonacci is exponential" is a sentence learners repeat long before
 * they can point at the reason. The reason is visible only as a shape: the
 * same subtree, drawn again and again, because a plain recursive call has no
 * memory of having already answered that question. So the tree is drawn in
 * full, every repeat of a subproblem can be highlighted at once, and the memo
 * toggle collapses those repeats into single cache hits — turning a tree that
 * doubles with n into a spine that grows by one node.
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
  success: 'hsl(var(--c-success))',
  warning: 'hsl(var(--c-warning))',
} as const;

interface CallNode {
  id: number;
  k: number;
  children: number[];
  depth: number;
  x: number;
  /** Answered straight from the cache — no subtree underneath. */
  hit: boolean;
  /** First time this argument is computed in the whole run. */
  first: boolean;
  /** Position in evaluation order, which is a preorder walk. */
  order: number;
  value: number;
}

function buildCalls(n: number, memo: boolean): CallNode[] {
  const nodes: CallNode[] = [];
  const cache = new Map<number, number>();
  const seen = new Set<number>();
  let order = 0;

  const call = (k: number, depth: number): number => {
    const id = nodes.length;
    const node: CallNode = {
      id,
      k,
      children: [],
      depth,
      x: 0,
      hit: false,
      first: !seen.has(k),
      order: order++,
      value: 0,
    };
    nodes.push(node);

    if (memo && cache.has(k)) {
      node.hit = true;
      node.value = cache.get(k) as number;
      return id;
    }
    seen.add(k);
    if (k <= 1) {
      node.value = k;
      if (memo) cache.set(k, k);
      return id;
    }
    const left = call(k - 1, depth + 1);
    const right = call(k - 2, depth + 1);
    node.children = [left, right];
    node.value = nodes[left].value + nodes[right].value;
    if (memo) cache.set(k, node.value);
    return id;
  };

  call(n, 0);

  // Tidy layout: leaves take the next slot, parents centre over their children.
  let slot = 0;
  const place = (id: number) => {
    const node = nodes[id];
    if (node.children.length === 0) {
      node.x = slot++;
      return;
    }
    node.children.forEach(place);
    node.x = (nodes[node.children[0]].x + nodes[node.children[node.children.length - 1]].x) / 2;
  };
  place(0);
  return nodes;
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

export default function RecursionTree() {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = React.useState(5);
  const [memo, setMemo] = React.useState(false);
  const [highlight, setHighlight] = React.useState<number | null>(null);
  const [cursor, setCursor] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const nodes = React.useMemo(() => buildCalls(n, memo), [n, memo]);
  const plain = React.useMemo(() => buildCalls(n, false), [n]);
  const memoised = React.useMemo(() => buildCalls(n, true), [n]);

  React.useEffect(() => {
    setCursor(nodes.length);
    setPlaying(false);
  }, [nodes]);

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (cursor >= nodes.length) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setCursor((c) => Math.min(nodes.length, c + 1)), Math.max(90, 700 / Math.sqrt(nodes.length)));
    return () => window.clearTimeout(id);
  }, [playing, cursor, nodes.length, reduced]);

  const revealed = (node: CallNode) => node.order < cursor;
  const counts = React.useMemo(() => {
    const out = new Map<number, number>();
    for (const node of nodes) out.set(node.k, (out.get(node.k) ?? 0) + 1);
    return out;
  }, [nodes]);

  const result = nodes[0].value;
  const duplicates = nodes.filter((node) => !node.first).length;
  const unique = counts.size;
  const saved = plain.length - memoised.length;

  const maxDepth = nodes.reduce((m, node) => Math.max(m, node.depth), 0);
  const leaves = nodes.filter((node) => node.children.length === 0).length;

  const GAP_X = 30;
  const GAP_Y = 44;
  const vbW = Math.max(120, leaves * GAP_X + 24);
  const vbH = (maxDepth + 1) * GAP_Y + 30;
  const { ref, w } = useWidth<HTMLDivElement>();
  const boxW = Math.max(280, w);
  const scale = Math.min(1.5, boxW / vbW);
  const R = Math.max(8, Math.min(13, GAP_X / 2 - 2));
  const px = (node: CallNode) => 12 + node.x * GAP_X + GAP_X / 2;
  const py = (node: CallNode) => 22 + node.depth * GAP_Y;

  return (
    <WidgetShell
      takeaway="Naive fib(n) is slow because the same subproblem is solved over and over — the tree is wide, not deep. Memoisation does not make the recursion cleverer; it just refuses to answer the same question twice, which turns an exponential tree into a linear spine."
      readout={
        <Readout
          items={[
            { label: 'fib(n)', value: `fib(${n}) = ${result}` },
            { label: 'Calls made', value: `${nodes.length}`, tone: memo ? 'good' : 'bad' },
            { label: 'Distinct subproblems', value: `${unique}`, tone: 'good' },
            { label: 'Repeat calls', value: `${duplicates}`, tone: duplicates > 0 ? 'warn' : 'good' },
            { label: 'Saved by memo', value: `${saved} calls`, tone: 'good' },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Memoisation"
            value={memo ? 'on' : 'off'}
            onChange={(v) => setMemo(v === 'on')}
            options={[
              { value: 'off', label: 'Plain recursion' },
              { value: 'on', label: 'Memoised' },
            ]}
          />
          <Slider
            label="n"
            value={n}
            min={2}
            max={7}
            step={1}
            onChange={(v) => {
              setN(v);
              setHighlight(null);
            }}
            format={(v) => `fib(${v})`}
            hint="Each step of n roughly multiplies the plain call count by 1.6 — and adds exactly one call to the memoised version."
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            {reduced ? (
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setCursor((c) => Math.min(nodes.length, c + 1))} disabled={cursor >= nodes.length} className={BTN}>
                  Step
                </button>
                <button type="button" onClick={() => setCursor(0)} className={BTN}>
                  Clear
                </button>
                <button type="button" onClick={() => setCursor(nodes.length)} className={BTN}>
                  Show all
                </button>
              </div>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => {
                  if (cursor >= nodes.length) setCursor(0);
                  setPlaying((p) => !p);
                }}
                onStep={() => setCursor((c) => Math.min(nodes.length, c + 1))}
                onReset={() => {
                  setCursor(0);
                  setPlaying(false);
                }}
                label="the calls"
              />
            )}
            <p className="text-[11px] text-subtle">
              Call {Math.min(cursor, nodes.length)} of {nodes.length}
            </p>
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
          aria-label={`Call tree for fib(${n}) ${memo ? 'with memoisation' : 'without memoisation'}: ${nodes.length} calls, ${duplicates} of them repeats of a subproblem already solved.`}
          className="block"
        >
          {nodes.map((node) =>
            node.children.map((child) => {
              const kid = nodes[child];
              return (
                <line
                  key={`${node.id}-${child}`}
                  x1={px(node)}
                  y1={py(node) + R}
                  x2={px(kid)}
                  y2={py(kid) - R}
                  stroke={C.line}
                  strokeWidth={1.1}
                  opacity={revealed(kid) ? 1 : 0.25}
                />
              );
            }),
          )}

          {nodes.map((node) => {
            const on = revealed(node);
            const picked = highlight === node.k;
            const repeat = !node.first && !node.hit;
            const stroke = node.hit ? C.success : picked ? C.primary : repeat ? C.warning : C.line;
            const cx = px(node);
            const cy = py(node);
            return (
              <g
                key={node.id}
                onClick={() => setHighlight((h) => (h === node.k ? null : node.k))}
                style={{ cursor: 'pointer' }}
                opacity={on ? 1 : 0.22}
              >
                {node.hit ? (
                  /* cache hits get a different shape, not just a different colour */
                  <rect
                    x={cx - R}
                    y={cy - R}
                    width={R * 2}
                    height={R * 2}
                    rx={3}
                    fill={picked ? C.surface3 : C.surface2}
                    stroke={stroke}
                    strokeWidth={2}
                  />
                ) : (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={R}
                    fill={picked ? C.surface3 : C.surface2}
                    stroke={stroke}
                    strokeWidth={picked ? 2.4 : repeat ? 1.8 : 1.2}
                    strokeDasharray={repeat && !picked ? '3 2' : undefined}
                  />
                )}
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize={Math.max(8, R - 2)}
                  fontFamily="ui-monospace, monospace"
                  fill={picked ? C.ink : C.muted}
                >
                  {node.k}
                </text>
                {node.id === 0 && (
                  <text x={cx} y={cy - R - 5} textAnchor="middle" fontSize={9} fill={C.subtle}>
                    fib({n})
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 pb-2 text-[11px] text-subtle">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border" style={{ borderColor: C.line }} /> first time this
          argument is seen
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-dashed" style={{ borderColor: C.warning }} />{' '}
          recomputing something already solved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: C.success }} /> cache hit
        </span>
      </div>

      {/* ---- repeated subproblems, counted ---- */}
      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          How often each subproblem is called
        </p>
        <div className="flex flex-wrap gap-1">
          {Array.from(counts.keys())
            .sort((a, b) => a - b)
            .map((k) => {
              const c = counts.get(k) as number;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setHighlight((h) => (h === k ? null : k))}
                  aria-pressed={highlight === k}
                  className={cn(
                    'rounded border px-1.5 py-0.5 font-mono text-[11px] transition-colors',
                    highlight === k
                      ? 'border-primary bg-primary/20 text-ink'
                      : c > 1
                        ? 'border-warning/60 bg-surface-2 text-muted hover:text-ink'
                        : 'border-line bg-surface-2 text-subtle hover:text-ink',
                  )}
                >
                  fib({k}) ×{c}
                </button>
              );
            })}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
          {highlight !== null
            ? `fib(${highlight}) is called ${counts.get(highlight)} time${counts.get(highlight) === 1 ? '' : 's'}${
                memo
                  ? '. Only the first call does any work; the rest are answered from the cache in one step, which is why they have no subtree.'
                  : `. Every one of them rebuilds the same subtree from scratch, because a plain recursive call remembers nothing between invocations.`
              }`
            : 'Click a subproblem to highlight every call to it in the tree. The repeats are the entire cost.'}
        </p>
      </div>

      {/* ---- the two shapes, as numbers ---- */}
      <div className="border-t border-line px-4 py-3">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-1.5 pr-3 font-medium">n</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">Plain calls</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">Memoised calls</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">fib(n)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[2, 4, 6, 8, 10, 15, 20, 30].map((row) => {
                const plainCalls = 2 * fib(row + 1) - 1;
                return (
                  <tr key={row} className={row === n ? 'bg-primary/[0.06]' : undefined}>
                    <td className="py-1.5 pr-3 font-medium tabular-nums text-ink">{row}</td>
                    <td className={cn('py-1.5 pr-3 tabular-nums', plainCalls > 100000 ? 'text-danger' : plainCalls > 1000 ? 'text-warning' : 'text-muted')}>
                      {plainCalls.toLocaleString('en-US')}
                    </td>
                    <td className="py-1.5 pr-3 tabular-nums text-success">{(2 * row - 1).toLocaleString('en-US')}</td>
                    <td className="py-1.5 pr-3 tabular-nums text-muted">{fib(row).toLocaleString('en-US')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The plain column grows by about 1.6× per row — O(φⁿ). The memoised column grows by two. At n = 30 that is the
          difference between two and a half million calls and fifty-nine, from one dictionary.
        </p>
      </div>
    </WidgetShell>
  );
}

function fib(k: number): number {
  let a = 0;
  let b = 1;
  for (let i = 0; i < k; i++) [a, b] = [b, a + b];
  return a;
}
