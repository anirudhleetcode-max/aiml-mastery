'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, VIZ, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * A recurrent cell, folded and unrolled, with the hidden state written out.
 *
 * The folded picture — a box with an arrow into itself — explains nothing on
 * its own. Unrolled, with two real numbers of hidden state per timestep, it
 * becomes obvious that "recurrent" means the same weights applied again to a
 * carried-over vector.
 *
 * The gradient panel is the payoff. ∂h_T/∂h_t is a product of one Jacobian per
 * step, and each Jacobian is the recurrent matrix multiplied by tanh′ ≤ 1. The
 * product shrinks geometrically with distance, so the signal from the last word
 * reaches the first word as a rounding error. That is the problem LSTMs and
 * attention were invented to solve, and here it is as a bar chart.
 */

const SENTENCES: Record<string, string[]> = {
  clause: ['the', 'movie', 'that', 'my', 'friend', 'recommended', 'last', 'week', 'was', 'great', 'today', 'again'],
  negation: ['i', 'did', 'not', 'think', 'the', 'long', 'slow', 'second', 'half', 'was', 'good', 'enough'],
};

/** Hand-authored two-dimensional embeddings, so the hidden state is readable. */
const EMBEDDINGS: Record<string, [number, number]> = {
  the: [0.1, -0.1],
  a: [0.1, -0.1],
  i: [0.3, 0.2],
  my: [0.25, 0.15],
  that: [0.05, 0.3],
  movie: [0.9, 0.2],
  friend: [0.7, 0.35],
  week: [0.4, -0.5],
  half: [0.35, -0.4],
  did: [-0.2, 0.4],
  not: [-0.9, 0.6],
  think: [0.2, 0.55],
  recommended: [0.6, 0.7],
  was: [-0.1, 0.45],
  great: [0.95, 0.8],
  good: [0.8, 0.6],
  enough: [0.3, 0.25],
  long: [-0.3, -0.35],
  slow: [-0.6, -0.45],
  second: [0.15, -0.3],
  last: [0.2, -0.45],
  today: [0.3, -0.2],
  again: [0.25, 0.1],
};

function embed(token: string): [number, number] {
  const known = EMBEDDINGS[token];
  if (known) return known;
  let h = 2166136261;
  for (let i = 0; i < token.length; i++) h = Math.imul(h ^ token.charCodeAt(i), 16777619);
  return [(((h >>> 8) % 200) - 100) / 120, (((h >>> 16) % 200) - 100) / 120];
}

const WX: number[][] = [
  [0.8, -0.4],
  [0.35, 0.9],
];
const WH_BASE: number[][] = [
  [0.9, -0.3],
  [0.25, 0.85],
];
const B: number[] = [0.05, -0.05];

function scaledWh(scale: number): number[][] {
  return WH_BASE.map((row) => row.map((v) => v * scale));
}

function stepCell(x: [number, number], h: number[], Wh: number[][]): number[] {
  const out: number[] = [];
  for (let i = 0; i < 2; i++) {
    const z = WX[i][0] * x[0] + WX[i][1] * x[1] + Wh[i][0] * h[0] + Wh[i][1] * h[1] + B[i];
    out.push(Math.tanh(z));
  }
  return out;
}

/** 2×2 matrix product. */
function matmul(a: number[][], b: number[][]): number[][] {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}

function frob(m: number[][]): number {
  return Math.sqrt(m[0][0] ** 2 + m[0][1] ** 2 + m[1][0] ** 2 + m[1][1] ** 2);
}

export default function RnnUnroll() {
  const reduced = usePrefersReducedMotion();
  const [sentence, setSentence] = React.useState<'clause' | 'negation'>('clause');
  const [length, setLength] = React.useState(8);
  const [scale, setScale] = React.useState(1);
  const [revealed, setRevealed] = React.useState(8);
  const [playing, setPlaying] = React.useState(false);

  const tokens = React.useMemo(() => SENTENCES[sentence].slice(0, length), [sentence, length]);
  const Wh = React.useMemo(() => scaledWh(scale), [scale]);

  const states = React.useMemo(() => {
    const hs: number[][] = [[0, 0]];
    for (const t of tokens) hs.push(stepCell(embed(t), hs[hs.length - 1], Wh));
    return hs;
  }, [tokens, Wh]);

  /**
   * ‖∂h_T/∂h_t‖ for every t: the product of Jacobians diag(1 − h²)·Wh from the
   * last step back to step t, accumulated one factor at a time.
   */
  const gradients = React.useMemo(() => {
    const T = tokens.length;
    let acc: number[][] = [
      [1, 0],
      [0, 1],
    ];
    const out: number[] = new Array(T).fill(0);
    out[T - 1] = 1;
    for (let k = T; k >= 2; k--) {
      const h = states[k];
      const jac: number[][] = [
        [(1 - h[0] ** 2) * Wh[0][0], (1 - h[0] ** 2) * Wh[0][1]],
        [(1 - h[1] ** 2) * Wh[1][0], (1 - h[1] ** 2) * Wh[1][1]],
      ];
      acc = matmul(acc, jac);
      out[k - 2] = frob(acc) / Math.SQRT2;
    }
    return out;
  }, [tokens.length, states, Wh]);

  React.useEffect(() => {
    setRevealed(tokens.length);
  }, [tokens.length, scale]);

  React.useEffect(() => {
    if (!playing || reduced) return;
    const t = window.setInterval(() => {
      setRevealed((r) => {
        if (r >= tokens.length) {
          setPlaying(false);
          return r;
        }
        return r + 1;
      });
    }, 550);
    return () => window.clearInterval(t);
  }, [playing, reduced, tokens.length]);

  const reachFirst = gradients[0];
  const maxGrad = Math.max(...gradients, 1e-12);
  const regime = scale > 1.25 ? 'exploding' : reachFirst < 0.05 ? 'vanishing' : 'usable';

  return (
    <WidgetShell
      takeaway={`Every timestep multiplies the gradient by the same matrix and by tanh′, which is at most 1. After ${tokens.length} steps the signal reaching the first word is ${reachFirst < 0.001 ? reachFirst.toExponential(1) : reachFirst.toFixed(4)} of what left the last one — so a plain RNN cannot learn a dependency that spans a sentence. Gates, and later attention, exist to give that signal a path that does not decay.`}
      readout={
        <Readout
          items={[
            { label: 'Timesteps', value: String(tokens.length) },
            { label: 'h_T', value: `[${states[revealed]?.[0].toFixed(3) ?? '0.000'}, ${states[revealed]?.[1].toFixed(3) ?? '0.000'}]` },
            {
              label: '‖∂h_T/∂h₁‖',
              value: reachFirst < 0.001 ? reachFirst.toExponential(2) : reachFirst.toFixed(4),
              tone: regime === 'vanishing' ? 'bad' : regime === 'exploding' ? 'warn' : 'good',
            },
            { label: 'Regime', value: regime, tone: regime === 'usable' ? 'good' : regime === 'exploding' ? 'warn' : 'bad' },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Toggle
              label="Sequence"
              value={sentence}
              onChange={(v) => setSentence(v as 'clause' | 'negation')}
              options={[
                { value: 'clause', label: 'Long clause' },
                { value: 'negation', label: 'Early negation' },
              ]}
            />
            <PlayButton
              playing={playing}
              onToggle={() => {
                if (revealed >= tokens.length) setRevealed(0);
                setPlaying((p) => !p);
              }}
              onStep={() => setRevealed((r) => Math.min(tokens.length, r + 1))}
              onReset={() => {
                setRevealed(0);
                setPlaying(false);
              }}
              label="the sequence"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider
              label="Sequence length"
              value={length}
              min={3}
              max={12}
              step={1}
              onChange={setLength}
              hint="Lengthen it and watch the leftmost gradient bar disappear."
            />
            <Slider
              label="Recurrent weight scale"
              value={scale}
              min={0.2}
              max={1.8}
              step={0.05}
              onChange={setScale}
              format={(v) => `${v.toFixed(2)}×`}
              hint="Below 1 the gradient decays; well above 1 it explodes instead."
            />
          </div>
          {reduced && (
            <p className="text-[11.5px] leading-relaxed text-subtle">
              The sequence does not play automatically because you have asked for reduced motion. Use{' '}
              <strong className="text-ink">Step</strong> to advance one timestep.
            </p>
          )}
        </>
      }
    >
      <div className="grid gap-4 border-b border-line p-4 sm:grid-cols-[150px_1fr] sm:items-center">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Folded</p>
          <svg viewBox="0 0 140 110" className="block h-28 w-full" role="img" aria-label="A recurrent cell with its hidden state looping back into itself">
            <rect x={42} y={38} width={56} height={34} rx={8} fill="hsl(var(--c-surface-2))" stroke="hsl(var(--c-primary))" strokeWidth={1.4} />
            <text x={70} y={59} fontSize="10" textAnchor="middle" fill="hsl(var(--c-text))">
              tanh
            </text>
            <line x1={70} y1={92} x2={70} y2={74} stroke="hsl(var(--c-border-strong))" strokeWidth={1.2} />
            <text x={70} y={104} fontSize="9" textAnchor="middle" fill="hsl(var(--c-text-subtle))">
              xₜ
            </text>
            <line x1={70} y1={36} x2={70} y2={22} stroke="hsl(var(--c-border-strong))" strokeWidth={1.2} />
            <text x={70} y={16} fontSize="9" textAnchor="middle" fill="hsl(var(--c-text-subtle))">
              hₜ
            </text>
            <path
              d="M98 55 C124 55 124 26 104 26 L104 40"
              fill="none"
              stroke={VIZ.series}
              strokeWidth={1.6}
              markerEnd="url(#rnn-arrow)"
            />
            <defs>
              <marker id="rnn-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 z" fill={VIZ.series} />
              </marker>
            </defs>
            <text x={122} y={72} fontSize="8.5" textAnchor="middle" fill="hsl(var(--c-text-subtle))">
              hₜ₋₁
            </text>
          </svg>
        </div>
        <p className="text-[11.5px] leading-relaxed text-muted">
          <span className="font-mono text-[11px] text-accent">hₜ = tanh(Wx·xₜ + Wh·hₜ₋₁ + b)</span>
          <br />
          One cell, one set of weights, applied once per token. The loop on the left and the row of boxes below are the
          same computation drawn two ways — unrolling is a change of picture, not of model. Wh is scaled to{' '}
          {scale.toFixed(2)}× here, so Wh = [[{Wh[0][0].toFixed(2)}, {Wh[0][1].toFixed(2)}], [{Wh[1][0].toFixed(2)},{' '}
          {Wh[1][1].toFixed(2)}]].
        </p>
      </div>

      <div className="p-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Unrolled — hidden state after each token
        </p>
        <div className="overflow-x-auto pb-1">
          <div className="flex items-stretch gap-1.5" style={{ minWidth: `${tokens.length * 62}px` }}>
            {tokens.map((tok, i) => {
              const on = i < revealed;
              const h = states[i + 1];
              return (
                <div
                  key={`${tok}-${i}`}
                  className={cn(
                    'flex-1 rounded-md border px-1 py-1.5 text-center transition-colors',
                    on ? 'border-primary/50 bg-primary/[0.07]' : 'border-line bg-surface-2/40',
                  )}
                >
                  <p className={cn('truncate text-[10.5px] font-medium', on ? 'text-ink' : 'text-subtle')}>{tok}</p>
                  <p className="text-[9px] text-subtle">t = {i + 1}</p>
                  <div className="mt-1 space-y-[3px]">
                    {[0, 1].map((d) => {
                      const v = on ? h[d] : 0;
                      return (
                        <div key={d} className="flex items-center gap-1">
                          <span className="w-2 text-[8px] text-subtle">h{d + 1}</span>
                          <div className="relative h-2 flex-1 rounded-sm bg-surface-3">
                            <div
                              className="absolute top-0 h-full rounded-sm"
                              style={{
                                left: v >= 0 ? '50%' : `${50 + v * 50}%`,
                                width: `${Math.abs(v) * 50}%`,
                                background: v >= 0 ? VIZ.series : VIZ.warn,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className={cn('mt-1 font-mono text-[8.5px] tabular-nums', on ? 'text-muted' : 'text-subtle')}>
                    {on ? `${h[0].toFixed(2)}, ${h[1].toFixed(2)}` : '—'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-1.5 text-[10.5px] leading-snug text-subtle">
          Bars run from the centre: right of centre is positive, left is negative, and the pair of numbers underneath is
          the state itself. The state at t = {tokens.length} is everything the network still knows about the whole
          sequence.
        </p>
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Gradient magnitude ‖∂h_T/∂h_t‖ by distance from the end
        </p>
        <div className="space-y-1">
          {tokens.map((tok, i) => {
            const g = gradients[i];
            const rel = Math.max(0.004, g / maxGrad);
            return (
              <div key={`g-${tok}-${i}`} className="flex items-center gap-2">
                <span className="w-16 shrink-0 truncate text-right text-[10.5px] text-subtle">{tok}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-sm bg-surface-2">
                  <div
                    className="h-full rounded-sm"
                    style={{ width: `${rel * 100}%`, background: g < 0.05 ? VIZ.muted : g > 2 ? VIZ.warn : VIZ.good }}
                  />
                </div>
                <span
                  className={cn(
                    'w-16 shrink-0 text-right font-mono text-[10px] tabular-nums',
                    g < 0.05 ? 'text-danger' : g > 2 ? 'text-warning' : 'text-muted',
                  )}
                >
                  {g < 0.001 ? g.toExponential(1) : g.toFixed(3)}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Each bar is the size of the gradient that reaches that token from the final hidden state. The decay is
          geometric: one factor of roughly {(scale * 0.87).toFixed(2)} per step, because tanh′ = 1 − h² is under 1
          everywhere and the recurrent matrix is scaled by {scale.toFixed(2)}. Push the scale above about 1.3 and the
          opposite failure appears — the product explodes instead, which is what gradient clipping is for.
        </p>
      </div>
    </WidgetShell>
  );
}
