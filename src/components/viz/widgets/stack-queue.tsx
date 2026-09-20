'use client';

import * as React from 'react';
import { PlayButton, Readout, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * One instruction tape, two containers.
 *
 * LIFO and FIFO are easy words and a hard intuition, because a stack and a
 * queue are described separately and then compared in prose. Here the *same*
 * program drives both at once, so the divergence is structural rather than
 * asserted: the pushes land identically, and the first `take` already pulls a
 * different letter out of each. The two output rows at the bottom are the
 * punchline — same input, reversed output.
 */

const BTN =
  'rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const CAPACITY = 6;

type Op = { kind: 'push'; value: string } | { kind: 'take' };

const DEFAULT_PROGRAM: Op[] = [
  { kind: 'push', value: 'A' },
  { kind: 'push', value: 'B' },
  { kind: 'push', value: 'C' },
  { kind: 'take' },
  { kind: 'push', value: 'D' },
  { kind: 'take' },
  { kind: 'take' },
  { kind: 'take' },
];

interface Sim {
  stack: string[];
  queue: string[];
  stackOut: string[];
  queueOut: string[];
  /** What the most recently executed op did, for the highlight and the note. */
  lastStack: { value: string; kind: 'in' | 'out' } | null;
  lastQueue: { value: string; kind: 'in' | 'out' } | null;
  note: string;
}

function simulate(ops: Op[], upto: number): Sim {
  const stack: string[] = [];
  const queue: string[] = [];
  const stackOut: string[] = [];
  const queueOut: string[] = [];
  let lastStack: Sim['lastStack'] = null;
  let lastQueue: Sim['lastQueue'] = null;
  let note = 'Nothing has run yet. Step forward to feed the same operation to both containers.';

  for (let i = 0; i < upto; i++) {
    const op = ops[i];
    if (op.kind === 'push') {
      stack.push(op.value);
      queue.push(op.value);
      lastStack = { value: op.value, kind: 'in' };
      lastQueue = { value: op.value, kind: 'in' };
      note = `push('${op.value}') — the stack puts it on top, the queue puts it at the rear. So far the two look identical.`;
    } else {
      const s = stack.pop();
      const q = queue.shift();
      if (s === undefined || q === undefined) {
        lastStack = null;
        lastQueue = null;
        note = 'take() on an empty container: Python raises IndexError rather than handing back a quiet None.';
      } else {
        stackOut.push(s);
        queueOut.push(q);
        lastStack = { value: s, kind: 'out' };
        lastQueue = { value: q, kind: 'out' };
        note =
          s === q
            ? `take() — only one item was left, so both containers gave up '${s}'.`
            : `take() — the stack returns '${s}', the newest item. The queue returns '${q}', the oldest. Same call, different answer.`;
      }
    }
  }
  return { stack, queue, stackOut, queueOut, lastStack, lastQueue, note };
}

function Chip({
  value,
  tone,
}: {
  value: string;
  tone: 'idle' | 'in' | 'out';
}) {
  return (
    <span
      className={cn(
        'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 font-mono text-[13px] font-medium',
        tone === 'in' && 'border-primary bg-primary/20 text-ink',
        tone === 'out' && 'border-warning bg-warning/15 text-ink',
        tone === 'idle' && 'border-line bg-surface-3 text-muted',
      )}
    >
      {value}
    </span>
  );
}

export default function StackQueue() {
  const reduced = usePrefersReducedMotion();
  const [ops, setOps] = React.useState<Op[]>(DEFAULT_PROGRAM);
  const [cursor, setCursor] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const sim = simulate(ops, cursor);
  const atEnd = cursor >= ops.length;

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (atEnd) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setCursor((c) => Math.min(ops.length, c + 1)), 950);
    return () => window.clearTimeout(id);
  }, [playing, cursor, atEnd, ops.length, reduced]);

  const pushed = ops.filter((o) => o.kind === 'push').length;
  const addPush = () => {
    const value = LETTERS[pushed % LETTERS.length];
    setOps((o) => [...o, { kind: 'push', value }]);
  };
  const addTake = () => setOps((o) => [...o, { kind: 'take' }]);
  const reset = () => {
    setOps(DEFAULT_PROGRAM);
    setCursor(0);
    setPlaying(false);
  };

  const diverged = sim.stackOut.join('') !== sim.queueOut.join('');

  return (
    <WidgetShell
      takeaway="A stack and a queue accept exactly the same pushes; they differ only in which end take() reads from. That one choice is why a stack reverses what it is given and a queue preserves it — and why undo, call frames and DFS want a stack while print jobs, fair scheduling and BFS want a queue."
      readout={
        <Readout
          items={[
            { label: 'Step', value: `${cursor} / ${ops.length}` },
            { label: 'Stack out (LIFO)', value: sim.stackOut.join(' ') || '—' },
            { label: 'Queue out (FIFO)', value: sim.queueOut.join(' ') || '—', tone: diverged ? 'warn' : 'default' },
            { label: 'Cost of either op', value: 'O(1)', tone: 'good' },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            {reduced ? (
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setCursor((c) => Math.min(ops.length, c + 1))} disabled={atEnd} className={BTN}>
                  Step
                </button>
                <button type="button" onClick={() => setCursor(0)} className={BTN}>
                  Reset
                </button>
              </div>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => {
                  if (atEnd) setCursor(0);
                  setPlaying((p) => !p);
                }}
                onStep={() => setCursor((c) => Math.min(ops.length, c + 1))}
                onReset={() => {
                  setCursor(0);
                  setPlaying(false);
                }}
                label="the program"
              />
            )}
            <div className="flex flex-wrap items-center gap-1.5">
              <button type="button" onClick={addPush} disabled={ops.length >= 14 || pushed >= LETTERS.length} className={BTN}>
                + push
              </button>
              <button type="button" onClick={addTake} disabled={ops.length >= 14} className={BTN}>
                + take
              </button>
              <button type="button" onClick={reset} className={BTN}>
                Reset program
              </button>
            </div>
          </div>

          {/* The tape itself is a control: click any instruction to jump there. */}
          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">Program (both containers run it)</p>
            <div className="flex flex-wrap gap-1">
              {ops.map((op, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCursor(i + 1);
                    setPlaying(false);
                  }}
                  aria-current={i === cursor - 1 ? 'step' : undefined}
                  className={cn(
                    'rounded border px-1.5 py-0.5 font-mono text-[11px] transition-colors',
                    i === cursor - 1
                      ? 'border-accent bg-accent/15 text-ink'
                      : i < cursor
                        ? 'border-line bg-surface-2 text-subtle'
                        : 'border-line text-muted hover:text-ink',
                  )}
                >
                  {op.kind === 'push' ? `push('${op.value}')` : 'take()'}
                </button>
              ))}
            </div>
          </div>
        </>
      }
    >
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {/* ---------------- stack ---------------- */}
        <section
          className="rounded-lg border border-line bg-surface-2/40 p-3"
          role="img"
          aria-label={`Stack, top first: ${[...sim.stack].reverse().join(', ') || 'empty'}`}
        >
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-[12.5px] font-semibold text-ink">Stack</h4>
            <span className="text-[11px] text-subtle">LIFO — push and take at the top</span>
          </div>
          <div className="flex h-44 flex-col-reverse items-center justify-start gap-1 rounded-md border border-dashed border-line px-2 py-2">
            {sim.stack.length === 0 && <span className="mb-auto mt-auto text-[11px] text-subtle">empty</span>}
            {sim.stack.map((v, i) => (
              <Chip
                key={`${v}-${i}`}
                value={v}
                tone={i === sim.stack.length - 1 && sim.lastStack?.kind === 'in' ? 'in' : 'idle'}
              />
            ))}
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-subtle">
            <span>bottom ↓</span>
            <span className="text-accent">↑ top (both ends of the action)</span>
          </div>
          <p className="mt-2 text-[11.5px] text-muted">
            Last out:{' '}
            <span className="font-mono text-ink">{sim.stackOut[sim.stackOut.length - 1] ?? '—'}</span>
          </p>
        </section>

        {/* ---------------- queue ---------------- */}
        <section
          className="rounded-lg border border-line bg-surface-2/40 p-3"
          role="img"
          aria-label={`Queue, front first: ${sim.queue.join(', ') || 'empty'}`}
        >
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-[12.5px] font-semibold text-ink">Queue</h4>
            <span className="text-[11px] text-subtle">FIFO — in at the rear, out at the front</span>
          </div>
          <div className="flex h-44 flex-col justify-center gap-2 rounded-md border border-dashed border-line px-2 py-2">
            <div className="flex flex-wrap items-center gap-1">
              {sim.queue.length === 0 && <span className="text-[11px] text-subtle">empty</span>}
              {sim.queue.map((v, i) => (
                <Chip key={`${v}-${i}`} value={v} tone={i === sim.queue.length - 1 && sim.lastQueue?.kind === 'in' ? 'in' : 'idle'} />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-subtle">
              <span className="text-accent">← front (take here)</span>
              <span>rear (push here) ←</span>
            </div>
          </div>
          <p className="mt-2 text-[11.5px] text-muted">
            Last out: <span className="font-mono text-ink">{sim.queueOut[sim.queueOut.length - 1] ?? '—'}</span>
          </p>
        </section>
      </div>

      <div className="border-t border-line px-4 py-2.5">
        <p className="text-[12px] leading-relaxed text-muted">{sim.note}</p>
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Output so far</p>
        <div className="space-y-1.5 text-[12px]">
          <div className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-subtle">Stack</span>
            <span className="font-mono text-ink">{sim.stackOut.join(' → ') || '—'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-subtle">Queue</span>
            <span className="font-mono text-ink">{sim.queueOut.join(' → ') || '—'}</span>
          </div>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          {diverged
            ? 'The two rows have already parted. Nothing about the inputs differed — only which end take() reads.'
            : 'The rows still agree. Keep stepping: they separate the moment more than one item is waiting.'}
        </p>
      </div>
    </WidgetShell>
  );
}
