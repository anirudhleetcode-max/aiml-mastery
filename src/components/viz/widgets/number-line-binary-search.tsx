'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Binary search on a sorted number line.
 *
 * Linear search is easy to imagine; halving is not, because nothing in daily
 * life halves a search space. So the whole widget is built around one image:
 * after every comparison, half of the remaining cells visibly die. The
 * "eliminated now" style is deliberately different from "eliminated earlier",
 * because the moment of the cut is the thing worth watching. The step counter
 * sits next to ceil(log2(n + 1)) so the learner can check the bound themselves
 * rather than take it on faith.
 */

const BTN =
  'rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink';

/** Token-resolved colours. No raw hex: every one of these is a theme variable. */
const C = {
  ink: 'hsl(var(--c-text))',
  muted: 'hsl(var(--c-text-muted))',
  subtle: 'hsl(var(--c-text-subtle))',
  line: 'hsl(var(--c-border))',
  surface2: 'hsl(var(--c-surface-2))',
  surface3: 'hsl(var(--c-surface-3))',
  primary: 'hsl(var(--c-primary))',
  primarySoft: 'hsl(var(--c-primary-soft))',
  accent: 'hsl(var(--c-accent))',
  success: 'hsl(var(--c-success))',
  danger: 'hsl(var(--c-danger))',
  warning: 'hsl(var(--c-warning))',
} as const;

/** Width of the element's box, tracked so the SVG can be drawn in real pixels. */
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

/** Deterministic sorted values — a learner can re-derive every step they see. */
function buildValues(n: number): number[] {
  let seed = 20250917 % 2147483647;
  const next = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
  const out: number[] = [];
  let v = 2 + Math.floor(next() * 4);
  for (let i = 0; i < n; i++) {
    out.push(v);
    v += 1 + Math.floor(next() * 7);
  }
  return out;
}

interface Frame {
  lo: number;
  hi: number;
  mid: number;
  /** -1: mid is too small, 1: mid is too large, 0: hit. */
  cmp: -1 | 0 | 1;
}

function searchFrames(values: number[], target: number): Frame[] {
  const frames: Frame[] = [];
  let lo = 0;
  let hi = values.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = values[mid];
    const cmp: -1 | 0 | 1 = v === target ? 0 : v < target ? -1 : 1;
    frames.push({ lo, hi, mid, cmp });
    if (cmp === 0) break;
    if (cmp < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return frames;
}

type CellState = 'active' | 'dead' | 'cut' | 'probe' | 'found' | 'survives';

function classify(i: number, frame: Frame | null): CellState {
  if (!frame) return 'active';
  if (i < frame.lo || i > frame.hi) return 'dead';
  if (i === frame.mid) return frame.cmp === 0 ? 'found' : 'probe';
  if (frame.cmp === 0) return 'dead';
  const cutSide = frame.cmp === -1 ? i < frame.mid : i > frame.mid;
  return cutSide ? 'cut' : 'survives';
}

const FILL: Record<CellState, string> = {
  active: C.surface3,
  dead: C.surface2,
  cut: C.surface2,
  probe: C.accent,
  found: C.success,
  survives: C.surface3,
};

const STROKE: Record<CellState, string> = {
  active: C.line,
  dead: C.line,
  cut: C.danger,
  probe: C.accent,
  found: C.success,
  survives: C.primarySoft,
};

export default function NumberLineBinarySearch() {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = React.useState(15);
  const values = React.useMemo(() => buildValues(n), [n]);
  const [target, setTarget] = React.useState(() => buildValues(15)[11]);
  const [cursor, setCursor] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const lowest = values[0];
  const highest = values[values.length - 1];

  // Keep the target inside the current range when the list size changes.
  React.useEffect(() => {
    setTarget((t) => Math.min(Math.max(t, lowest), highest));
  }, [lowest, highest]);

  const frames = React.useMemo(() => searchFrames(values, target), [values, target]);

  React.useEffect(() => {
    setCursor(0);
    setPlaying(false);
  }, [frames]);

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (cursor >= frames.length) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setCursor((c) => Math.min(frames.length, c + 1)), 850);
    return () => window.clearTimeout(id);
  }, [playing, cursor, frames.length, reduced]);

  const frame = cursor > 0 ? frames[cursor - 1] ?? null : null;
  const finished = cursor >= frames.length;
  const last = frames[frames.length - 1];
  const hit = last && last.cmp === 0;
  const windowSize = frame ? frame.hi - frame.lo + 1 : values.length;
  const worstCase = Math.ceil(Math.log2(values.length + 1));

  const { ref, w } = useWidth<HTMLDivElement>();
  const width = Math.max(240, w);
  const padX = 14;
  const inner = width - padX * 2;
  const gap = values.length > 1 ? inner / (values.length - 1) : inner;
  const cellW = Math.max(5, Math.min(30, gap - 3));
  const x = (i: number) => padX + (values.length > 1 ? (inner / (values.length - 1)) * i : inner / 2);
  const showValues = cellW >= 19;

  const cellY = 50;
  const cellH = 28;
  const height = 132;

  const status = !frame
    ? `Ready. ${values.length} values, so at most ${worstCase} comparisons.`
    : frame.cmp === 0
      ? `Found ${target} at index ${frame.mid} after ${cursor} comparison${cursor === 1 ? '' : 's'}.`
      : finished
        ? `${target} is not in the list. ${cursor} comparisons ruled out every cell.`
        : frame.cmp === -1
          ? `values[${frame.mid}] = ${values[frame.mid]} < ${target}, so the left half is gone.`
          : `values[${frame.mid}] = ${values[frame.mid]} > ${target}, so the right half is gone.`;

  const step = () => setCursor((c) => Math.min(frames.length, c + 1));
  const reset = () => {
    setCursor(0);
    setPlaying(false);
  };

  return (
    <WidgetShell
      takeaway="Every comparison throws away half of what is left, so doubling the list adds one step, not twice the work. A thousand values take ten comparisons; a million take twenty."
      readout={
        <Readout
          items={[
            { label: 'Comparisons', value: `${cursor}`, tone: cursor > worstCase ? 'bad' : 'default' },
            { label: 'Worst case ⌈log₂(n+1)⌉', value: `${worstCase}` },
            { label: 'Still in play', value: `${finished && !hit ? 0 : windowSize} of ${values.length}` },
            {
              label: 'Status',
              value: status,
              tone: finished ? (hit ? 'good' : 'warn') : 'default',
            },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            {reduced ? (
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={step} className={BTN}>
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
                  if (cursor >= frames.length) setCursor(0);
                  setPlaying((p) => !p);
                }}
                onStep={step}
                onReset={reset}
                label="the search"
              />
            )}
            <p className="text-[11px] text-subtle">Click a cell to search for that value.</p>
          </div>
          <Slider
            label="Target value"
            value={target}
            min={lowest}
            max={highest}
            step={1}
            onChange={(v) => setTarget(Math.round(v))}
            format={(v) => String(v)}
            hint="Values between the marks are not in the list — the search still finishes in the same number of steps and reports nothing found."
          />
          <Slider
            label="List length (n)"
            value={n}
            min={7}
            max={31}
            step={1}
            onChange={setN}
            format={(v) => String(v)}
            hint="Doubling n adds exactly one comparison to the worst case."
          />
        </>
      }
    >
      <div ref={ref} className="w-full px-1 pt-3">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Binary search over ${values.length} sorted values looking for ${target}. ${status}`}
          className="block"
        >
          {/* the line the values sit on */}
          <line x1={padX} y1={cellY + cellH / 2} x2={width - padX} y2={cellY + cellH / 2} stroke={C.line} strokeWidth={1} />

          {/* the live window, drawn as a band behind the cells */}
          {frame && frame.cmp !== 0 && (
            <rect
              x={x(frame.lo) - cellW / 2 - 3}
              y={cellY - 6}
              width={x(frame.hi) - x(frame.lo) + cellW + 6}
              height={cellH + 12}
              rx={7}
              fill="none"
              stroke={C.primary}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}

          {values.map((v, i) => {
            const s = classify(i, frame);
            const cx = x(i);
            return (
              <g key={i} onClick={() => setTarget(v)} style={{ cursor: 'pointer' }}>
                <rect
                  x={cx - cellW / 2}
                  y={cellY}
                  width={cellW}
                  height={cellH}
                  rx={4}
                  fill={FILL[s]}
                  stroke={STROKE[s]}
                  strokeWidth={s === 'probe' || s === 'found' || s === 'cut' ? 1.6 : 1}
                  opacity={s === 'dead' ? 0.4 : s === 'cut' ? 0.65 : 1}
                />
                {s === 'cut' && (
                  <line
                    x1={cx - cellW / 2 + 2}
                    y1={cellY + cellH - 3}
                    x2={cx + cellW / 2 - 2}
                    y2={cellY + 3}
                    stroke={C.danger}
                    strokeWidth={1.2}
                    opacity={0.8}
                  />
                )}
                {showValues && (
                  <text
                    x={cx}
                    y={cellY + cellH / 2 + 4}
                    textAnchor="middle"
                    fontSize={11}
                    fontFamily="ui-monospace, monospace"
                    fill={s === 'probe' || s === 'found' ? 'hsl(var(--c-primary-contrast))' : s === 'dead' ? C.subtle : C.ink}
                  >
                    {v}
                  </text>
                )}
                {v === target && (
                  <circle cx={cx} cy={cellY + cellH + 9} r={2.5} fill={C.warning} />
                )}
              </g>
            );
          })}

          {/* lo / mid / hi markers */}
          {frame &&
            (
              [
                ['lo', frame.lo, C.primary],
                ['mid', frame.mid, C.accent],
                ['hi', frame.hi, C.primary],
              ] as const
            ).map(([label, idx, colour], k) => (
              <g key={label}>
                <line
                  x1={x(idx)}
                  y1={cellY - 4}
                  x2={x(idx)}
                  y2={label === 'mid' ? 20 : 34 - k * 0}
                  stroke={colour}
                  strokeWidth={1}
                  opacity={0.7}
                />
                <text
                  x={Math.min(width - 12, Math.max(12, x(idx)))}
                  y={label === 'mid' ? 15 : 30}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="ui-monospace, monospace"
                  fill={colour}
                >
                  {label}={idx}
                </text>
              </g>
            ))}

          {/* index ruler */}
          <text x={padX} y={height - 26} textAnchor="middle" fontSize={10} fill={C.subtle} fontFamily="ui-monospace, monospace">
            0
          </text>
          <text
            x={width - padX}
            y={height - 26}
            textAnchor="middle"
            fontSize={10}
            fill={C.subtle}
            fontFamily="ui-monospace, monospace"
          >
            {values.length - 1}
          </text>

          {/* halving bar: how much of the list survives right now */}
          <rect x={padX} y={height - 16} width={inner} height={6} rx={3} fill={C.surface2} />
          <rect
            x={frame ? x(frame.lo) - cellW / 2 : padX}
            y={height - 16}
            width={Math.max(2, frame ? x(frame.hi) - x(frame.lo) + cellW : inner)}
            height={6}
            rx={3}
            fill={finished && !hit ? C.surface3 : hit && finished ? C.success : C.primary}
            opacity={finished && !hit ? 0.5 : 1}
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 pb-3 text-[11px] text-subtle">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: C.accent }} /> probe (mid)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: C.danger }} /> cut this step
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: C.primarySoft }} /> still live
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: C.warning }} /> target
        </span>
      </div>
    </WidgetShell>
  );
}
