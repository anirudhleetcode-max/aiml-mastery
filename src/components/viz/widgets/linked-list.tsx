'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * A singly linked list, with the walking made visible.
 *
 * Learners meet linked lists after arrays and take away the wrong headline —
 * "insertion is O(1)". It is, *once you are standing on the right node*, and
 * getting there is the whole cost. So every operation here plays in two acts:
 * the hops (counted, one frame each, because that is the O(n) part) and then
 * the rewiring (two pointer writes, no matter how long the list is). Insert at
 * head skips act one entirely, which is exactly why it is the cheap one.
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
  danger: 'hsl(var(--c-danger))',
} as const;

const VALUES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const MAX_NODES = 7;

interface ListNode {
  id: number;
  value: string;
}

interface Frame {
  nodes: ListNode[];
  /** Node the traversal pointer is standing on. */
  cursor: number | null;
  /** Node that has just been allocated and linked in. */
  fresh: number | null;
  /** Node about to be unlinked. */
  doomed: number | null;
  hops: number;
  note: string;
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

/** The hops a traversal makes before it can touch index `k`. */
function walkFrames(nodes: ListNode[], k: number, purpose: string): Frame[] {
  const frames: Frame[] = [];
  for (let i = 0; i < k; i++) {
    frames.push({
      nodes,
      cursor: i,
      fresh: null,
      doomed: null,
      hops: i + 1,
      note: `Hop ${i + 1}: standing on index ${i} ('${nodes[i].value}'). ${purpose} There is no arithmetic shortcut — the only way to index ${k} is through every node before it.`,
    });
  }
  return frames;
}

export default function LinkedList() {
  const reduced = usePrefersReducedMotion();
  const uid = React.useId().replace(/:/g, '');

  const initial = React.useMemo<ListNode[]>(
    () => [
      { id: 1, value: 'a' },
      { id: 2, value: 'b' },
      { id: 3, value: 'c' },
      { id: 4, value: 'd' },
    ],
    [],
  );

  const [nodes, setNodes] = React.useState<ListNode[]>(initial);
  const [nextId, setNextId] = React.useState(5);
  const [index, setIndex] = React.useState(2);
  const [frames, setFrames] = React.useState<Frame[]>([]);
  const [cursor, setCursor] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [summary, setSummary] = React.useState({
    op: 'Starting list',
    hops: 0,
    cost: 'O(1)',
    writes: 0,
  });

  const frame: Frame | null = frames.length ? frames[Math.min(cursor, frames.length - 1)] : null;
  const shown = frame ? frame.nodes : nodes;

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (cursor >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setCursor((c) => Math.min(frames.length - 1, c + 1)), 900);
    return () => window.clearTimeout(id);
  }, [playing, cursor, frames.length, reduced]);

  const run = (built: Frame[], op: string, hops: number, cost: string, writes: number) => {
    setFrames(built);
    setCursor(0);
    setSummary({ op, hops, cost, writes });
    setPlaying(!reduced && built.length > 1);
  };

  const freshValue = () => VALUES.find((v) => !nodes.some((n) => n.value === v)) ?? 'z';

  const insertHead = () => {
    if (nodes.length >= MAX_NODES) return;
    const node = { id: nextId, value: freshValue() };
    setNextId((i) => i + 1);
    const after = [node, ...nodes];
    setNodes(after);
    run(
      [
        {
          nodes,
          cursor: null,
          fresh: null,
          doomed: null,
          hops: 0,
          note: `Allocate a node holding '${node.value}'. Nothing has been walked yet, and nothing will be.`,
        },
        {
          nodes: after,
          cursor: null,
          fresh: 0,
          doomed: null,
          hops: 0,
          note: `new.next = head, then head = new. Two writes, and the list could have a million nodes without changing that.`,
        },
      ],
      `insert '${node.value}' at head`,
      0,
      'O(1)',
      2,
    );
  };

  const insertAt = () => {
    if (nodes.length >= MAX_NODES) return;
    const k = Math.min(index, nodes.length);
    if (k === 0) {
      insertHead();
      return;
    }
    const node = { id: nextId, value: freshValue() };
    setNextId((i) => i + 1);
    const after = [...nodes.slice(0, k), node, ...nodes.slice(k)];
    setNodes(after);
    run(
      [
        ...walkFrames(nodes, k, `Looking for index ${k - 1}, the node whose pointer has to change.`),
        {
          nodes: after,
          cursor: k - 1,
          fresh: k,
          doomed: null,
          hops: k,
          note: `Rewire: new.next = node ${k - 1}'s old next, then node ${k - 1}.next = new. The splice itself is two writes — the ${k} hop${k === 1 ? '' : 's'} to reach here are what made this O(n).`,
        },
      ],
      `insert '${node.value}' at index ${k}`,
      k,
      'O(n) to find, O(1) to link',
      2,
    );
  };

  const deleteAt = () => {
    if (nodes.length <= 1) return;
    const k = Math.min(index, nodes.length - 1);
    const gone = nodes[k];
    const after = nodes.filter((_, i) => i !== k);
    setNodes(after);
    const built: Frame[] = [
      ...walkFrames(nodes, k, `Looking for index ${k === 0 ? 0 : k - 1}, the node that points at the victim.`),
      {
        nodes,
        cursor: k === 0 ? null : k - 1,
        fresh: null,
        doomed: k,
        hops: k,
        note:
          k === 0
            ? `Deleting the head: head = head.next. One write, no walking.`
            : `Found it. Node ${k - 1}.next now skips '${gone.value}' and points straight at what came after it.`,
      },
      {
        nodes: after,
        cursor: null,
        fresh: null,
        doomed: null,
        hops: k,
        note: `'${gone.value}' is unlinked. Nothing else moved: unlike an array, the neighbours never shift to close the gap.`,
      },
    ];
    run(built, `delete index ${k} ('${gone.value}')`, k, k === 0 ? 'O(1)' : 'O(n) to find, O(1) to unlink', 1);
  };

  const reset = () => {
    setNodes(initial);
    setNextId(5);
    setIndex(2);
    setFrames([]);
    setCursor(0);
    setPlaying(false);
    setSummary({ op: 'Starting list', hops: 0, cost: 'O(1)', writes: 0 });
  };

  /* ---- layout: a wrapping snake, so it survives a 360px screen ---- */
  const { ref, w } = useWidth<HTMLDivElement>();
  const width = Math.max(300, w);
  const NODE_W = 66;
  const NODE_H = 40;
  const PITCH = 88;
  const ROW_H = 76;
  const perRow = Math.max(2, Math.min(shown.length, Math.floor((width - 44) / PITCH) || 2));
  const rows = Math.max(1, Math.ceil(shown.length / perRow));
  const height = 28 + rows * ROW_H;
  const px = (i: number) => 6 + (i % perRow) * PITCH;
  const py = (i: number) => 26 + Math.floor(i / perRow) * ROW_H;

  const note = frame?.note ?? 'Use the buttons to insert or delete, then step through what the pointers actually do.';
  const atEnd = frames.length === 0 || cursor >= frames.length - 1;

  return (
    <WidgetShell
      takeaway="Rewiring a linked list is always two pointer writes. What costs you is standing in the right place first: inserting at the head never walks, inserting at index k walks k nodes, and that gap is the whole trade against an array."
      readout={
        <Readout
          items={[
            { label: 'Operation', value: summary.op },
            { label: 'Hops walked', value: `${summary.hops}`, tone: summary.hops > 0 ? 'warn' : 'good' },
            { label: 'Pointer writes', value: `${summary.writes}`, tone: 'good' },
            { label: 'Cost', value: summary.cost, tone: summary.hops > 0 ? 'warn' : 'good' },
            { label: 'Length', value: `${shown.length}` },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" onClick={insertHead} disabled={nodes.length >= MAX_NODES} className={BTN}>
              Insert at head
            </button>
            <button type="button" onClick={insertAt} disabled={nodes.length >= MAX_NODES} className={BTN}>
              Insert at index
            </button>
            <button type="button" onClick={deleteAt} disabled={nodes.length <= 1} className={BTN}>
              Delete at index
            </button>
            <button type="button" onClick={reset} className={BTN}>
              Reset list
            </button>
          </div>
          <Slider
            label="Index for insert / delete"
            value={index}
            min={0}
            max={Math.max(0, MAX_NODES - 1)}
            step={1}
            onChange={setIndex}
            format={(v) => `${Math.min(v, Math.max(0, nodes.length))}`}
            hint="Index 0 is the head — the only position that costs nothing to reach."
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            {reduced ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCursor((c) => Math.min(frames.length - 1, c + 1))}
                  disabled={atEnd}
                  className={BTN}
                >
                  Step
                </button>
                <button type="button" onClick={() => setCursor(0)} disabled={!frames.length} className={BTN}>
                  Replay
                </button>
              </div>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => {
                  if (!frames.length) return;
                  if (atEnd) setCursor(0);
                  setPlaying((p) => !p);
                }}
                onStep={() => setCursor((c) => Math.min(frames.length - 1, c + 1))}
                onReset={() => {
                  setCursor(0);
                  setPlaying(false);
                }}
                label="the rewiring"
              />
            )}
            <p className="text-[11px] text-subtle">
              Frame {frames.length ? Math.min(cursor + 1, frames.length) : 0} of {frames.length}
            </p>
          </div>
        </>
      }
    >
      <div ref={ref} className="w-full overflow-hidden px-2 pt-2">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Linked list of ${shown.length} nodes: ${shown.map((n) => n.value).join(' → ')} → None. ${note}`}
          className="block"
        >
          <defs>
            <marker id={`${uid}-a`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill={C.muted} />
            </marker>
            <marker id={`${uid}-p`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill={C.primary} />
            </marker>
            <marker id={`${uid}-d`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill={C.danger} />
            </marker>
          </defs>

          {/* head pointer */}
          <text x={8} y={14} fontSize={11} fontWeight={600} fontFamily="ui-monospace, monospace" fill={C.accent}>
            head
          </text>
          <line x1={34} y1={10} x2={px(0) + 14} y2={py(0) - 3} stroke={C.accent} strokeWidth={1} markerEnd={`url(#${uid}-a)`} />

          {shown.map((node, i) => {
            const x = px(i);
            const y = py(i);
            const isFresh = frame?.fresh === i;
            const isDoomed = frame?.doomed === i;
            const isCursor = frame?.cursor === i;
            const stroke = isDoomed ? C.danger : isFresh ? C.success : isCursor ? C.accent : C.line;
            const next = i + 1 < shown.length ? i + 1 : null;
            const sameRow = next !== null && Math.floor(next / perRow) === Math.floor(i / perRow);
            const linkColour = isFresh || frame?.fresh === next ? C.success : isDoomed ? C.danger : C.muted;
            const marker = linkColour === C.success ? `${uid}-p` : linkColour === C.danger ? `${uid}-d` : `${uid}-a`;

            return (
              <g key={node.id}>
                {/* the node: a value cell and a next-pointer cell */}
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={5}
                  fill={isCursor ? C.surface3 : C.surface2}
                  stroke={stroke}
                  strokeWidth={isFresh || isDoomed || isCursor ? 1.8 : 1}
                  opacity={isDoomed ? 0.7 : 1}
                />
                <line x1={x + 44} y1={y} x2={x + 44} y2={y + NODE_H} stroke={C.line} strokeWidth={1} />
                <text
                  x={x + 22}
                  y={y + 25}
                  textAnchor="middle"
                  fontSize={13}
                  fontFamily="ui-monospace, monospace"
                  fill={isDoomed ? C.danger : C.ink}
                >
                  {node.value}
                </text>
                <circle cx={x + 55} cy={y + 20} r={3} fill={isDoomed ? C.danger : C.muted} />
                {isDoomed && (
                  <line x1={x + 4} y1={y + NODE_H - 4} x2={x + NODE_W - 4} y2={y + 4} stroke={C.danger} strokeWidth={1.4} />
                )}

                {/* index + role labels */}
                <text
                  x={x + 22}
                  y={y + NODE_H + 13}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="ui-monospace, monospace"
                  fill={isCursor ? C.accent : C.subtle}
                >
                  {i}
                </text>
                {isFresh && (
                  <text x={x + 22} y={y - 4} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.success}>
                    new
                  </text>
                )}
                {isCursor && !isFresh && (
                  <text x={x + 22} y={y - 4} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.accent}>
                    here
                  </text>
                )}

                {/* next pointer */}
                {next !== null && sameRow && (
                  <line
                    x1={x + 55}
                    y1={y + 20}
                    x2={px(next) - 2}
                    y2={y + 20}
                    stroke={linkColour}
                    strokeWidth={isFresh || frame?.fresh === next ? 1.8 : 1.2}
                    markerEnd={`url(#${marker})`}
                  />
                )}
                {next !== null && !sameRow && (
                  <polyline
                    points={`${x + 55},${y + 20} ${x + 78},${y + 20} ${x + 78},${y + 58} ${px(next) - 14},${y + 58} ${px(next) - 14},${py(next) + 20} ${px(next) - 2},${py(next) + 20}`}
                    fill="none"
                    stroke={linkColour}
                    strokeWidth={1.2}
                    markerEnd={`url(#${marker})`}
                  />
                )}
                {next === null && (
                  <>
                    <line x1={x + 55} y1={y + 20} x2={x + 78} y2={y + 20} stroke={C.muted} strokeWidth={1.2} markerEnd={`url(#${uid}-a)`} />
                    <text x={x + 82} y={y + 24} fontSize={11} fontFamily="ui-monospace, monospace" fill={C.subtle}>
                      None
                    </text>
                  </>
                )}

                {/* the bypass: what the previous node's pointer becomes */}
                {isDoomed && i > 0 && Math.floor((i - 1) / perRow) === Math.floor(i / perRow) && i + 1 <= shown.length - 1 && (
                  <path
                    d={`M ${px(i - 1) + 55} ${py(i - 1) + 14} Q ${x + 33} ${y - 18} ${px(i + 1) - 2} ${py(i + 1) + 14}`}
                    fill="none"
                    stroke={C.success}
                    strokeWidth={1.6}
                    strokeDasharray="4 3"
                    markerEnd={`url(#${uid}-p)`}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="border-t border-line px-4 py-2.5">
        <p className="text-[12px] leading-relaxed text-muted">{note}</p>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 pb-3 text-[11px] text-subtle">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: C.accent }} /> traversal pointer
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: C.success }} /> newly linked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: C.danger }} /> being unlinked
        </span>
      </div>
    </WidgetShell>
  );
}
