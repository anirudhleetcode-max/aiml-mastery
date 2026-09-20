'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * One token's walk through a transformer, with the arithmetic left in.
 *
 * Every explanation of attention eventually reaches for a metaphor — the token
 * "looks at" other tokens, the model "pays attention". Metaphors are where the
 * understanding stops. So this widget never shows a metaphor without the tensor
 * underneath it: at every stage you get the shape the tensor actually has and
 * the first eight numbers actually in it, computed here, in this file, from a
 * seeded toy model (d_model = 8, one head, a twelve-word vocabulary).
 *
 * The numbers are real in the sense that matters: the embeddings are looked up
 * from a weight matrix, the positional encoding is the sinusoid from the paper,
 * the attention weights are a real softmax over real scaled dot products, the
 * layer norm really does centre and scale, and the final distribution really is
 * a softmax of a real logit vector. Nothing is hard-coded to look plausible.
 *
 * Two things are deliberately shrunk: d_model (768 numbers do not fit on a
 * phone) and the vocabulary (50,000 rows do not either). The shape readout
 * always names both the toy figure and its GPT-scale counterpart, so the
 * learner scales the mental model rather than memorising the toy.
 */

/* ------------------------------------------------------------------ *
 * A tiny, seeded linear-algebra kit. Same seed, same model, forever.
 * ------------------------------------------------------------------ */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal via Box–Muller, scaled the way real init is scaled. */
function makeNormal(seed: number, scale: number): () => number {
  const rng = mulberry32(seed);
  return () => {
    const u = Math.max(1e-9, rng());
    const v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * scale;
  };
}

function matrix(rows: number, cols: number, seed: number, scale: number): number[][] {
  const n = makeNormal(seed, scale);
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => n()));
}

/** row vector × matrix (rows × cols) → vector of length cols. */
function vecMat(v: number[], m: number[][]): number[] {
  const cols = m[0].length;
  const out = new Array<number>(cols).fill(0);
  for (let i = 0; i < v.length; i++) {
    const vi = v[i];
    if (vi === 0) continue;
    const row = m[i];
    for (let j = 0; j < cols; j++) out[j] += vi * row[j];
  }
  return out;
}

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function add(a: number[], b: number[]): number[] {
  return a.map((v, i) => v + b[i]);
}

function softmax(v: number[]): number[] {
  const max = Math.max(...v);
  const exps = v.map((x) => Math.exp(x - max));
  const sum = exps.reduce((s, x) => s + x, 0);
  return exps.map((x) => x / sum);
}

/** LayerNorm with gamma = 1, beta = 0 — the part that does the work. */
function layerNorm(v: number[]): number[] {
  const mean = v.reduce((s, x) => s + x, 0) / v.length;
  const varr = v.reduce((s, x) => s + (x - mean) ** 2, 0) / v.length;
  const sd = Math.sqrt(varr + 1e-5);
  return v.map((x) => (x - mean) / sd);
}

function gelu(x: number): number {
  // The tanh approximation used by GPT-2 and friends.
  return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)));
}

/* ------------------------------------------------------------------ *
 * The toy model
 * ------------------------------------------------------------------ */

const D = 8; // d_model
const D_FF = 16; // the feed-forward hidden width (4× d_model in real models is 32; 16 keeps the preview honest about ratios without the clutter)
const MAX_BLOCKS = 6;

const VOCAB = ['the', 'cat', 'sat', 'on', 'a', 'mat', 'dog', 'ran', 'fast', 'floor', 'and', 'slept'];
const SENTENCE = ['the', 'cat', 'sat', 'on', 'the', 'mat'];
const IDS = SENTENCE.map((w) => VOCAB.indexOf(w));

/** Embedding table: one row of d_model numbers per vocabulary entry. */
const EMB = matrix(VOCAB.length, D, 11, 0.9);

/** Per-block projections. Seeded per block so block 3 is not block 1 again. */
const BLOCKS = Array.from({ length: MAX_BLOCKS }, (_, b) => ({
  wq: matrix(D, D, 101 + b * 17, 0.5),
  wk: matrix(D, D, 211 + b * 17, 0.5),
  wv: matrix(D, D, 307 + b * 17, 0.5),
  wo: matrix(D, D, 401 + b * 17, 0.5),
  w1: matrix(D, D_FF, 503 + b * 17, 0.5),
  w2: matrix(D_FF, D, 601 + b * 17, 0.45),
}));

/** The sinusoidal positional encoding from "Attention is all you need". */
function positional(pos: number): number[] {
  return Array.from({ length: D }, (_, i) => {
    const pair = Math.floor(i / 2);
    const angle = pos / Math.pow(10000, (2 * pair) / D);
    return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  });
}

interface BlockTrace {
  /** Attention weights of the focus token over every position (causally masked). */
  weights: number[];
  scores: number[];
  q: number[];
  k: number[];
  v: number[];
  context: number[];
  afterAttn: number[];
  ffHidden: number[];
  afterFF: number[];
}

interface Trace {
  embedding: number[];
  pos: number[];
  embedPlusPos: number[];
  blocks: BlockTrace[];
  logits: number[];
  probs: number[];
}

/**
 * Runs the whole sequence forward — attention needs every position, not just
 * the one being followed — and keeps the focus token's slice at each step.
 */
function runModel(focus: number, nBlocks: number): Trace {
  const T = IDS.length;
  const embeddings = IDS.map((id) => EMB[id].slice());
  const positions = Array.from({ length: T }, (_, t) => positional(t));
  let hidden = embeddings.map((e, t) => add(e, positions[t]));

  const blocks: BlockTrace[] = [];
  for (let b = 0; b < nBlocks; b++) {
    const w = BLOCKS[b];
    const qs = hidden.map((h) => vecMat(h, w.wq));
    const ks = hidden.map((h) => vecMat(h, w.wk));
    const vs = hidden.map((h) => vecMat(h, w.wv));

    const next: number[][] = [];
    let trace: BlockTrace | null = null;

    for (let t = 0; t < T; t++) {
      // Causal mask: position t may only see positions 0..t.
      const raw = ks.map((k, j) => (j <= t ? dot(qs[t], k) / Math.sqrt(D) : Number.NEGATIVE_INFINITY));
      const attn = softmax(raw);
      const context = new Array<number>(D).fill(0);
      for (let j = 0; j <= t; j++) {
        for (let d = 0; d < D; d++) context[d] += attn[j] * vs[j][d];
      }
      const projected = vecMat(context, w.wo);
      const afterAttn = layerNorm(add(hidden[t], projected)); // residual, then norm
      const ffHidden = vecMat(afterAttn, w.w1).map(gelu);
      const ffOut = vecMat(ffHidden, w.w2);
      const afterFF = layerNorm(add(afterAttn, ffOut)); // residual again
      next.push(afterFF);

      if (t === focus) {
        trace = {
          weights: attn.map((p, j) => (j <= t ? p : 0)),
          scores: raw.map((r) => (Number.isFinite(r) ? r : Number.NEGATIVE_INFINITY)),
          q: qs[t],
          k: ks[t],
          v: vs[t],
          context,
          afterAttn,
          ffHidden,
          afterFF,
        };
      }
    }
    hidden = next;
    if (trace) blocks.push(trace);
  }

  // Weight tying: the output head is the embedding table transposed.
  const final = hidden[focus];
  const logits = EMB.map((row) => dot(final, row));
  return {
    embedding: embeddings[focus],
    pos: positions[focus],
    embedPlusPos: add(embeddings[focus], positions[focus]),
    blocks,
    logits,
    probs: softmax(logits),
  };
}

/* ------------------------------------------------------------------ *
 * Stage plan
 * ------------------------------------------------------------------ */

type StageKind = 'text' | 'ids' | 'embed' | 'pos' | 'attn' | 'addnorm' | 'ffn' | 'logits' | 'softmax';

interface Stage {
  kind: StageKind;
  block: number; // -1 outside the stack
  label: string;
}

function planStages(nBlocks: number): Stage[] {
  const stages: Stage[] = [
    { kind: 'text', block: -1, label: 'Tokenize' },
    { kind: 'ids', block: -1, label: 'Token ids' },
    { kind: 'embed', block: -1, label: 'Embedding' },
    { kind: 'pos', block: -1, label: '+ position' },
  ];
  for (let b = 0; b < nBlocks; b++) {
    stages.push({ kind: 'attn', block: b, label: `Attention ${b + 1}` });
    stages.push({ kind: 'addnorm', block: b, label: `Add + norm ${b + 1}` });
    stages.push({ kind: 'ffn', block: b, label: `Feed-forward ${b + 1}` });
  }
  stages.push({ kind: 'logits', block: -1, label: 'Logits' });
  stages.push({ kind: 'softmax', block: -1, label: 'Softmax' });
  return stages;
}

/* ------------------------------------------------------------------ *
 * Presentation helpers
 * ------------------------------------------------------------------ */

/** A vector drawn as signed bars plus its literal numbers. */
function VectorStrip({ values, label, max }: { values: number[]; label: string; max?: number }) {
  const scale = max ?? Math.max(0.4, ...values.map((v) => Math.abs(v)));
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium text-subtle">{label}</p>
      <div className="flex items-stretch gap-[3px]" role="img" aria-label={`${label}: ${values.map((v) => v.toFixed(2)).join(', ')}`}>
        {values.map((v, i) => (
          <div key={i} className="relative h-10 flex-1 rounded-[3px] bg-surface-2">
            <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
            <div
              className={cn('absolute inset-x-[2px] rounded-[2px]', v >= 0 ? 'bg-primary' : 'bg-warning')}
              style={{
                height: `${Math.max(2, (Math.abs(v) / scale) * 50)}%`,
                top: v >= 0 ? undefined : '50%',
                bottom: v >= 0 ? '50%' : undefined,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-[3px] overflow-x-auto font-mono text-[9.5px] tabular-nums text-muted">
        {values.map((v, i) => (
          <span key={i} className="flex-1 text-center">
            {v.toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
}

function ShapeTag({ shape, note }: { shape: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11.5px] text-accent">{shape}</code>
      <span className="text-[11px] text-subtle">{note}</span>
    </div>
  );
}

export default function TransformerFlow() {
  const reduced = usePrefersReducedMotion();
  const [nBlocks, setNBlocks] = React.useState(2);
  const [focus, setFocus] = React.useState(IDS.length - 1);
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const stages = React.useMemo(() => planStages(nBlocks), [nBlocks]);
  const trace = React.useMemo(() => runModel(focus, nBlocks), [focus, nBlocks]);
  const stage = stages[Math.min(step, stages.length - 1)];
  const clampedStep = Math.min(step, stages.length - 1);

  React.useEffect(() => {
    if (step > stages.length - 1) setStep(stages.length - 1);
  }, [stages.length, step]);

  // Auto-advance, one stage a second, stopping at the distribution.
  React.useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= stages.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, [playing, reduced, stages.length]);

  const T = IDS.length;
  const paramCount =
    VOCAB.length * D + nBlocks * (4 * D * D + D * D_FF + D_FF * D);

  const block = stage.block >= 0 ? trace.blocks[stage.block] : null;
  const top = React.useMemo(
    () =>
      trace.probs
        .map((p, i) => ({ word: VOCAB[i], p }))
        .sort((a, b) => b.p - a.p)
        .slice(0, 5),
    [trace.probs],
  );

  return (
    <WidgetShell
      takeaway="A transformer never does anything to a word — it does arithmetic to a vector. Attention is a softmax over dot products that mixes other positions' vectors into this one, and the stack of blocks just repeats that mix until the last position's vector points at a plausible next token."
      readout={
        <Readout
          items={[
            { label: 'Stage', value: `${clampedStep + 1}/${stages.length}` },
            { label: 'Following', value: `"${SENTENCE[focus]}" @ ${focus}` },
            { label: 'Blocks', value: String(nBlocks) },
            { label: 'Parameters', value: paramCount.toLocaleString('en-US') },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <PlayButton
              playing={playing}
              onToggle={() => {
                // With motion reduced there is no playback, so Play jumps to the end state.
                if (reduced) {
                  setStep(stages.length - 1);
                  return;
                }
                if (clampedStep >= stages.length - 1) setStep(0);
                setPlaying((p) => !p);
              }}
              onReset={() => {
                setPlaying(false);
                setStep(0);
              }}
              label="the forward pass"
            />
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setStep((s) => Math.max(0, s - 1));
              }}
              disabled={clampedStep === 0}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setStep((s) => Math.min(stages.length - 1, s + 1));
              }}
              disabled={clampedStep >= stages.length - 1}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              Forward
            </button>
          </div>
          {reduced && (
            <p className="text-[11px] text-subtle">
              Motion is reduced, so playback is off: Back and Forward walk the stages, and Play jumps to the final
              distribution.
            </p>
          )}
          <Slider
            label="Transformer blocks"
            value={nBlocks}
            min={1}
            max={MAX_BLOCKS}
            step={1}
            onChange={(v) => {
              setPlaying(false);
              setNBlocks(v);
            }}
            format={(v) => `${v} × (attention + FFN)`}
            hint="GPT-3 stacks 96 of these. Every extra block is another full attention-and-feed-forward round on the same shaped vector."
          />
          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">Token to follow</p>
            <div className="flex flex-wrap gap-1">
              {SENTENCE.map((w, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={focus === i}
                  onClick={() => setFocus(i)}
                  className={cn(
                    'rounded-md border px-2 py-1 font-mono text-[11.5px] transition-colors',
                    focus === i
                      ? 'border-primary bg-primary/10 text-ink'
                      : 'border-line bg-surface-2 text-subtle hover:text-ink',
                  )}
                >
                  {w}
                  <span className="ml-1 text-[9.5px] text-subtle">{i}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      }
    >
      {/* Stage rail */}
      <div className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2">
        {stages.map((s, i) => (
          <button
            key={`${s.kind}-${s.block}-${i}`}
            type="button"
            aria-current={i === clampedStep}
            onClick={() => {
              setPlaying(false);
              setStep(i);
            }}
            className={cn(
              'shrink-0 rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
              i === clampedStep
                ? 'bg-primary/15 text-ink'
                : i < clampedStep
                  ? 'text-muted hover:text-ink'
                  : 'text-subtle hover:text-muted',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-3 p-4">
        {stage.kind === 'text' && (
          <>
            <ShapeTag shape="6 strings" note="not yet numbers — nothing can be multiplied here" />
            <div className="flex flex-wrap gap-1.5">
              {SENTENCE.map((w, i) => (
                <span
                  key={i}
                  className={cn(
                    'rounded-md border px-2 py-1 font-mono text-[12px]',
                    i === focus ? 'border-primary bg-primary/10 text-ink' : 'border-line bg-surface-2 text-muted',
                  )}
                >
                  {w}
                </span>
              ))}
            </div>
            <p className="text-[11.5px] leading-relaxed text-muted">
              The tokenizer splits text into pieces it already knows. Here one word is one token; real tokenizers split
              rarer words into fragments, which is why an unusual name can cost five tokens.
            </p>
          </>
        )}

        {stage.kind === 'ids' && (
          <>
            <ShapeTag shape={`[${T}] int64`} note={`one row index into a ${VOCAB.length}-word vocabulary (GPT-2: 50,257)`} />
            <div className="flex flex-wrap gap-1.5">
              {SENTENCE.map((w, i) => (
                <span
                  key={i}
                  className={cn(
                    'rounded-md border px-2 py-1 text-center font-mono text-[12px]',
                    i === focus ? 'border-primary bg-primary/10 text-ink' : 'border-line bg-surface-2 text-muted',
                  )}
                >
                  {IDS[i]}
                  <span className="ml-1 text-[9.5px] text-subtle">{w}</span>
                </span>
              ))}
            </div>
            <p className="text-[11.5px] leading-relaxed text-muted">
              An id carries no meaning. Id {IDS[focus]} is nothing but the row number where &quot;{SENTENCE[focus]}
              &quot; happens to live in the table.
            </p>
          </>
        )}

        {stage.kind === 'embed' && (
          <>
            <ShapeTag shape={`[${T}, ${D}]`} note={`row ${IDS[focus]} of a [${VOCAB.length}, ${D}] table — GPT-3 uses [50257, 12288]`} />
            <VectorStrip values={trace.embedding} label={`Embedding of "${SENTENCE[focus]}"`} />
            <p className="text-[11.5px] leading-relaxed text-muted">
              The lookup is the whole operation: id {IDS[focus]} selects a row, and that row is a learned point in {D}
              -dimensional space. These numbers are the only place a word&apos;s meaning lives.
            </p>
          </>
        )}

        {stage.kind === 'pos' && (
          <>
            <ShapeTag shape={`[${T}, ${D}]`} note="same shape in, same shape out — position is added, not appended" />
            <VectorStrip values={trace.pos} label={`Positional encoding for slot ${focus}`} max={1} />
            <VectorStrip values={trace.embedPlusPos} label="Embedding + position (the block's input)" />
            <p className="text-[11.5px] leading-relaxed text-muted">
              Attention sees a set, not a sequence — without this step &quot;the cat sat&quot; and &quot;sat cat
              the&quot; are the same input. The sinusoids give each slot a distinct, smoothly varying signature that is
              summed straight into the embedding.
            </p>
          </>
        )}

        {stage.kind === 'attn' && block && (
          <>
            <ShapeTag
              shape={`scores [${T}] → weights [${T}]`}
              note={`q·kᵀ / √${D}, causally masked, then softmax`}
            />
            <div className="space-y-1">
              {SENTENCE.map((w, j) => {
                const allowed = j <= focus;
                const weight = block.weights[j];
                return (
                  <div key={j} className="flex items-center gap-2">
                    <span className="w-10 shrink-0 font-mono text-[11px] text-muted">{w}</span>
                    <div className="h-4 min-w-0 flex-1 rounded-sm bg-surface-2">
                      <div
                        className={cn('h-full rounded-sm', allowed ? 'bg-primary' : 'bg-surface-3')}
                        style={{ width: `${allowed ? Math.max(1.5, weight * 100) : 100}%` }}
                      />
                    </div>
                    <span className="w-24 shrink-0 text-right font-mono text-[10.5px] tabular-nums text-subtle">
                      {allowed ? `${block.scores[j].toFixed(2)} → ${(weight * 100).toFixed(1)}%` : '−∞ masked'}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <VectorStrip values={block.q} label="query" />
              <VectorStrip values={block.k} label="key" />
              <VectorStrip values={block.v} label="value" />
            </div>
            <VectorStrip values={block.context} label="Σ weightⱼ × valueⱼ (the mixed context vector)" />
            <p className="text-[11.5px] leading-relaxed text-muted">
              Every weight above is a softmax of one dot product. The output is the weighted average of the other
              positions&apos; value vectors — that, and nothing more mysterious, is what &quot;attending&quot; means.
              Positions after {focus} are masked to −∞ so a decoder cannot read its own future.
            </p>
          </>
        )}

        {stage.kind === 'addnorm' && block && (
          <>
            <ShapeTag shape={`[${D}] + [${D}] → LayerNorm → [${D}]`} note="mean 0, variance 1, shape unchanged" />
            <VectorStrip values={block.afterAttn} label="LayerNorm(input + attention output)" />
            <p className="text-[11.5px] leading-relaxed text-muted">
              The residual connection adds the block&apos;s input back to its output, so a block only has to learn a
              correction rather than rebuild the vector — the reason 96 layers train at all. LayerNorm then re-centres
              the result: mean {(block.afterAttn.reduce((s, x) => s + x, 0) / D).toFixed(2)}, standard deviation 1.00,
              which keeps the next block&apos;s inputs in a range its weights expect.
            </p>
          </>
        )}

        {stage.kind === 'ffn' && block && (
          <>
            <ShapeTag shape={`[${D}] → [${D_FF}] → [${D}]`} note={`widen, GELU, project back — ~${Math.round(((D * D_FF + D_FF * D) / (4 * D * D + D * D_FF + D_FF * D)) * 100)}% of the block's parameters`} />
            <VectorStrip values={block.ffHidden} label={`Hidden layer after GELU [${D_FF}]`} />
            <VectorStrip values={block.afterFF} label="LayerNorm(residual + FFN output) — this block's output" />
            <p className="text-[11.5px] leading-relaxed text-muted">
              Attention moved information between positions; the feed-forward network does the thinking within one
              position, independently of every other token. Note the shape at the end: identical to the input, which is
              why blocks stack {nBlocks === 1 ? 'at all' : `— the next of the ${nBlocks} takes this vector unchanged in form`}.
            </p>
          </>
        )}

        {stage.kind === 'logits' && (
          <>
            <ShapeTag shape={`[${VOCAB.length}]`} note={`final vector × embeddingᵀ — one raw score per vocabulary entry`} />
            <div className="space-y-1">
              {VOCAB.map((w, i) => (
                <div key={w} className="flex items-center gap-2">
                  <span className="w-12 shrink-0 font-mono text-[11px] text-muted">{w}</span>
                  <div className="relative h-3.5 min-w-0 flex-1 rounded-sm bg-surface-2">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-line" />
                    <div
                      className={cn('absolute inset-y-0 rounded-sm', trace.logits[i] >= 0 ? 'bg-accent' : 'bg-warning')}
                      style={{
                        left: trace.logits[i] >= 0 ? '50%' : undefined,
                        right: trace.logits[i] >= 0 ? undefined : '50%',
                        width: `${Math.min(50, (Math.abs(trace.logits[i]) / Math.max(...trace.logits.map(Math.abs))) * 50)}%`,
                      }}
                    />
                  </div>
                  <span className="w-12 shrink-0 text-right font-mono text-[10.5px] tabular-nums text-subtle">
                    {trace.logits[i].toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11.5px] leading-relaxed text-muted">
              Logits are unbounded and can be negative — they are not probabilities and must not be read as confidence.
              This model ties the output head to the embedding table, so each score is the dot product of the final
              vector with a word&apos;s own embedding row.
            </p>
          </>
        )}

        {stage.kind === 'softmax' && (
          <>
            <ShapeTag shape={`[${VOCAB.length}] summing to 1.00`} note="exponentiate, then divide by the total" />
            <div className="space-y-1">
              {top.map((t, i) => (
                <div key={t.word} className="flex items-center gap-2">
                  <span className="w-12 shrink-0 font-mono text-[11px] text-muted">{t.word}</span>
                  <div className="h-4 min-w-0 flex-1 rounded-sm bg-surface-2">
                    <div
                      className={cn('h-full rounded-sm', i === 0 ? 'bg-success' : 'bg-primary/60')}
                      style={{ width: `${Math.max(1.5, t.p * 100)}%` }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right font-mono text-[10.5px] tabular-nums text-subtle">
                    {(t.p * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11.5px] leading-relaxed text-muted">
              This is the model&apos;s entire output: a probability for every token in the vocabulary. Generation is
              sampling one word from this distribution, appending it, and running all {stages.length} stages again — the
              untrained toy weights here make the ranking arbitrary, but the shape of the answer is exactly right.
            </p>
          </>
        )}
      </div>
    </WidgetShell>
  );
}
