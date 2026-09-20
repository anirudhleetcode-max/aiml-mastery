'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * The context window as a budget, and what happens when the budget is blown.
 *
 * A learner's first mental model of context is a memory: things go in, the
 * model remembers them. The useful model is a fixed-size buffer that someone
 * else fills on your behalf — system prompt, tool definitions, history,
 * retrieved chunks, the question, and the space the answer itself will need.
 * Everything competes for the same tokens, and when it does not fit, something
 * is thrown away by a policy you probably did not choose.
 *
 * The part worth dwelling on is that overflow is silent. No exception, no
 * warning field in the response — the request succeeds, the answer is fluent,
 * and the rule that said "never quote a price you cannot cite" is simply no
 * longer in the prompt. So this widget names, for every evicted block, the
 * specific behaviour that disappears with it.
 *
 * The second panel is the reason context windows are not simply made huge:
 * attention compares every token with every other token, so the work grows
 * with the square of the sequence while the KV cache grows only linearly.
 */

const WINDOWS = [2048, 4096, 8192, 16384, 32768, 65536, 131072];

interface Rule {
  id: string;
  label: string;
  tokens: number;
  /** What stops working the moment this block falls out of the prompt. */
  lost: string;
}

const SYSTEM_RULES: Rule[] = [
  { id: 'persona', label: 'Persona and tone', tokens: 180, lost: 'The replies drift back to generic assistant voice, mid-conversation.' },
  { id: 'price', label: 'Never quote a price without a citation', tokens: 90, lost: 'The model starts inventing prices again, with the same confident phrasing it used when the rule was present.' },
  { id: 'schema', label: 'Output JSON schema', tokens: 340, lost: 'Responses stop parsing. This one at least fails loudly downstream — most do not.' },
  { id: 'tools', label: 'Tool definitions (4 tools)', tokens: 760, lost: 'The model can no longer call tools, so it answers from memory instead of looking anything up.' },
  { id: 'examples', label: 'Few-shot examples (3)', tokens: 1200, lost: 'Formatting and edge-case handling regress to the base model — the quality drop is real and invisible.' },
];

/** Deterministic, plausible turn sizes: some turns are a word, some are a pasted log. */
function turnTokens(i: number): number {
  const cycle = [120, 260, 90, 540, 180, 310, 140, 220];
  return cycle[i % cycle.length];
}
function docTokens(i: number): number {
  const cycle = [420, 380, 510, 460, 340, 490];
  return cycle[i % cycle.length];
}

type Kind = 'system' | 'history' | 'docs' | 'question' | 'reserve';

interface Block {
  id: string;
  kind: Kind;
  label: string;
  tokens: number;
  lost: string;
}

const KIND_STYLE: Record<Kind, { bar: string; dot: string; name: string }> = {
  system: { bar: 'bg-primary', dot: 'bg-primary', name: 'System' },
  history: { bar: 'bg-accent', dot: 'bg-accent', name: 'History' },
  docs: { bar: 'bg-success', dot: 'bg-success', name: 'Retrieved' },
  question: { bar: 'bg-warning', dot: 'bg-warning', name: 'Question' },
  reserve: { bar: 'bg-surface-3', dot: 'bg-surface-3', name: 'Reserved for the answer' },
};

type Policy = 'oldest' | 'docs' | 'middle';

export default function ContextWindowLab() {
  const reduced = usePrefersReducedMotion();
  const [windowIdx, setWindowIdx] = React.useState(1); // 4,096
  const [turns, setTurns] = React.useState(14);
  const [docs, setDocs] = React.useState(4);
  const [questionTokens, setQuestionTokens] = React.useState(120);
  const [reserve, setReserve] = React.useState(700);
  const [policy, setPolicy] = React.useState<Policy>('oldest');
  const [enabledRules, setEnabledRules] = React.useState<string[]>(SYSTEM_RULES.map((r) => r.id));

  const windowSize = WINDOWS[windowIdx];

  /** Everything competing for the window, in the order it is laid out in the prompt. */
  const blocks = React.useMemo<Block[]>(() => {
    const out: Block[] = [];
    for (const r of SYSTEM_RULES) {
      if (enabledRules.includes(r.id)) {
        out.push({ id: `sys-${r.id}`, kind: 'system', label: r.label, tokens: r.tokens, lost: r.lost });
      }
    }
    for (let i = 0; i < turns; i++) {
      out.push({
        id: `turn-${i}`,
        kind: 'history',
        label: `Turn ${i + 1}`,
        tokens: turnTokens(i),
        lost:
          i === 0
            ? 'Turn 1 held the constraint you stated once — "we deploy on Tuesdays". It is gone, and the model will contradict it in the same tone it used when it agreed.'
            : `The exchange in turn ${i + 1} is gone. The model will re-ask something you already answered, or quietly stop applying it.`,
      });
    }
    for (let i = 0; i < docs; i++) {
      out.push({
        id: `doc-${i}`,
        kind: 'docs',
        label: `Retrieved chunk ${i + 1}`,
        tokens: docTokens(i),
        lost: `Chunk ${i + 1} was retrieved, ranked and then dropped before the model saw it. Your retrieval metrics still count it as a hit.`,
      });
    }
    out.push({
      id: 'question',
      kind: 'question',
      label: 'Current question',
      tokens: questionTokens,
      lost: 'Never dropped — without it there is nothing to answer.',
    });
    return out;
  }, [enabledRules, turns, docs, questionTokens]);

  const requested = blocks.reduce((s, b) => s + b.tokens, 0) + reserve;

  /** Eviction order for the chosen policy — first id in the list goes first. */
  const evictionOrder = React.useMemo(() => {
    const history = blocks.filter((b) => b.kind === 'history');
    const retrieved = blocks.filter((b) => b.kind === 'docs');
    const system = blocks.filter((b) => b.kind === 'system');
    if (policy === 'docs') return [...retrieved.slice().reverse(), ...history, ...system.slice().reverse()];
    if (policy === 'middle') {
      // Keep the first turn and the most recent ones; eat outwards from the middle.
      const middle = history.slice(1, Math.max(1, history.length - 2));
      return [...middle, ...retrieved.slice().reverse(), ...history.slice(Math.max(1, history.length - 2)), ...system.slice().reverse()];
    }
    return [...history, ...retrieved.slice().reverse(), ...system.slice().reverse()];
  }, [blocks, policy]);

  const dropped = React.useMemo(() => {
    const out = new Set<string>();
    let total = requested;
    for (const b of evictionOrder) {
      if (total <= windowSize) break;
      out.add(b.id);
      total -= b.tokens;
    }
    return out;
  }, [evictionOrder, requested, windowSize]);

  const kept = blocks.filter((b) => !dropped.has(b.id));
  const used = kept.reduce((s, b) => s + b.tokens, 0) + reserve;
  const droppedTokens = requested - used;
  const overflowed = dropped.size > 0;
  const stillOver = used > windowSize; // even after evicting everything evictable

  const byKind = (k: Kind) => kept.filter((b) => b.kind === k).reduce((s, b) => s + b.tokens, 0);
  const segments: { kind: Kind; tokens: number }[] = [
    { kind: 'system', tokens: byKind('system') },
    { kind: 'history', tokens: byKind('history') },
    { kind: 'docs', tokens: byKind('docs') },
    { kind: 'question', tokens: byKind('question') },
    { kind: 'reserve', tokens: reserve },
  ];

  /* Quadratic attention cost, drawn against the window sizes on offer. */
  const { canvasRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const pad = { l: 40, r: 10, t: 12, b: 24 };
      const plotW = w - pad.l - pad.r;
      const plotH = h - pad.t - pad.b;
      if (plotW <= 0 || plotH <= 0) return;
      const style = getComputedStyle(document.documentElement);
      const resolve = (name: string, fb: string) => style.getPropertyValue(name).trim() || fb;
      const grid = resolve('--viz-grid', 'rgba(128,128,128,0.25)');
      const axis = resolve('--viz-axis', '#888');
      const series = resolve('--viz-series', '#8164f7');
      const linear = resolve('--viz-cat-mastered', '#199e70');

      const maxN = WINDOWS[WINDOWS.length - 1];
      const x = (n: number) => pad.l + (n / maxN) * plotW;
      const yq = (n: number) => pad.t + plotH - (n / maxN) ** 2 * plotH;
      const yl = (n: number) => pad.t + plotH - (n / maxN) * plotH;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 3; i++) {
        const gy = pad.t + (plotH / 3) * i;
        ctx.beginPath();
        ctx.moveTo(pad.l, gy);
        ctx.lineTo(w - pad.r, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Linear reference: KV cache memory.
      ctx.strokeStyle = linear;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x(0), yl(0));
      ctx.lineTo(x(maxN), yl(maxN));
      ctx.stroke();

      // Quadratic: attention score matrix.
      ctx.strokeStyle = series;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const n = (maxN / 120) * i;
        if (i === 0) ctx.moveTo(x(n), yq(n));
        else ctx.lineTo(x(n), yq(n));
      }
      ctx.stroke();

      // Where this prompt sits.
      const here = Math.min(used, maxN);
      ctx.strokeStyle = axis;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x(here), pad.t);
      ctx.lineTo(x(here), pad.t + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = series;
      ctx.beginPath();
      ctx.arc(x(here), yq(here), 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = axis;
      ctx.textAlign = 'left';
      ctx.fillText('attention work  ∝ n²', pad.l + 4, pad.t + 11);
      ctx.fillStyle = linear;
      ctx.fillText('KV cache  ∝ n', pad.l + 4, pad.t + 24);
      ctx.fillStyle = axis;
      ctx.textAlign = 'center';
      ctx.fillText('0', pad.l, h - 8);
      ctx.fillText('128k tokens', w - pad.r - 26, h - 8);
      ctx.textAlign = 'right';
      ctx.fillText('cost', pad.l - 6, pad.t + 10);
    },
    [used],
  );

  const attentionRatio = (used / 1000) ** 2; // relative to a 1,000-token prompt
  const kvBytes = used * 32 * 2 * 4096 * 2; // 32 layers × (K and V) × d_model × 2 bytes (fp16)

  return (
    <WidgetShell
      takeaway="Overflow is not an error — it is an eviction. The call still returns 200, the answer still reads well, and the only thing that changed is that a rule, a turn or a retrieved chunk is no longer in the prompt. Budget the window deliberately, because if you do not, a truncation policy you never chose will do it for you."
      readout={
        <Readout
          items={[
            { label: 'Window', value: `${(windowSize / 1024).toFixed(0)}k` },
            { label: 'Requested', value: requested.toLocaleString('en-US') },
            {
              label: 'Dropped',
              value: droppedTokens.toLocaleString('en-US'),
              tone: droppedTokens > 0 ? 'bad' : 'good',
            },
            { label: 'Attention cost', value: `${attentionRatio.toFixed(attentionRatio < 10 ? 1 : 0)}×`, tone: attentionRatio > 200 ? 'warn' : 'default' },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Context window"
            value={windowIdx}
            min={0}
            max={WINDOWS.length - 1}
            step={1}
            onChange={setWindowIdx}
            format={(v) => `${WINDOWS[v].toLocaleString('en-US')} tokens`}
            hint="Every step doubles the window — and quadruples the attention work at the far end of it."
          />
          <Slider label="Conversation turns" value={turns} min={0} max={30} step={1} onChange={setTurns} format={(v) => `${v} turns`} />
          <Slider label="Retrieved chunks" value={docs} min={0} max={10} step={1} onChange={setDocs} format={(v) => `${v} chunks`} />
          <Slider
            label="Current question"
            value={questionTokens}
            min={20}
            max={2000}
            step={20}
            onChange={setQuestionTokens}
            format={(v) => `${v} tokens`}
            hint="A pasted stack trace is a thousand tokens on its own."
          />
          <Slider
            label="Reserved for the answer"
            value={reserve}
            min={0}
            max={4000}
            step={100}
            onChange={setReserve}
            format={(v) => `${v} tokens`}
            hint="Output shares the window with input. Forgetting this is why a long prompt returns a truncated answer."
          />
          <Toggle
            label="Truncation policy"
            value={policy}
            onChange={(v) => setPolicy(v as Policy)}
            options={[
              { value: 'oldest', label: 'Drop oldest turns' },
              { value: 'docs', label: 'Drop retrieved first' },
              { value: 'middle', label: 'Middle-out' },
            ]}
          />
          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">System prompt blocks</p>
            <div className="flex flex-wrap gap-1">
              {SYSTEM_RULES.map((r) => {
                const on = enabledRules.includes(r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setEnabledRules((prev) => (on ? prev.filter((id) => id !== r.id) : [...prev, r.id]))
                    }
                    className={cn(
                      'rounded-md border px-2 py-1 text-[11px] transition-colors',
                      on ? 'border-primary bg-primary/10 text-ink' : 'border-line bg-surface-2 text-subtle hover:text-ink',
                    )}
                  >
                    {r.label}
                    <span className="ml-1 font-mono text-[9.5px] text-subtle">{r.tokens}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      }
    >
      <div className="space-y-4 p-4">
        {/* The budget bar */}
        <section>
          <div className="mb-1 flex items-baseline justify-between text-[11px]">
            <span className="font-semibold uppercase tracking-[0.1em] text-subtle">Window fill</span>
            <span className="font-mono tabular-nums text-muted">
              {used.toLocaleString('en-US')} / {windowSize.toLocaleString('en-US')}
            </span>
          </div>
          <div
            className="flex h-7 w-full overflow-hidden rounded-md border border-line bg-surface-2"
            role="img"
            aria-label={`${used} of ${windowSize} tokens used; ${droppedTokens} tokens dropped`}
          >
            {segments.map((s) => (
              <div
                key={s.kind}
                className={cn(KIND_STYLE[s.kind].bar, 'h-full', !reduced && 'transition-[width] duration-300')}
                style={{ width: `${(s.tokens / windowSize) * 100}%` }}
                title={`${KIND_STYLE[s.kind].name}: ${s.tokens} tokens`}
              />
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {segments.map((s) => (
              <span key={s.kind} className="flex items-center gap-1 text-[10.5px] text-subtle">
                <span className={cn('h-2 w-2 rounded-[2px]', KIND_STYLE[s.kind].dot)} />
                {KIND_STYLE[s.kind].name} {s.tokens.toLocaleString('en-US')}
              </span>
            ))}
          </div>
          {overflowed ? (
            <p className="mt-2 rounded-md border border-danger/40 bg-danger/[0.07] px-2 py-1.5 text-[11.5px] leading-relaxed text-ink">
              The prompt asked for {requested.toLocaleString('en-US')} tokens and the window holds{' '}
              {windowSize.toLocaleString('en-US')}. {dropped.size} block{dropped.size === 1 ? '' : 's'} (
              {droppedTokens.toLocaleString('en-US')} tokens) were removed before the request was sent. The API returned
              200.
            </p>
          ) : (
            <p className="mt-2 text-[11.5px] text-muted">
              Everything fits, with {(windowSize - used).toLocaleString('en-US')} tokens of headroom. Add turns or
              chunks until it does not.
            </p>
          )}
          {stillOver && (
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-danger">
              Even with everything evictable gone, the question and the reserved answer space exceed the window. This is
              the one case that does raise an error — which makes it the safest failure in this widget.
            </p>
          )}
        </section>

        {/* Block ledger */}
        <section>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            What is in the prompt, and what was quietly taken out
          </p>
          <div className="max-h-56 space-y-0.5 overflow-y-auto rounded-md border border-line bg-surface-2/40 p-1.5">
            {blocks.map((b) => {
              const gone = dropped.has(b.id);
              return (
                <div key={b.id} className={cn('rounded px-1.5 py-1', gone && 'bg-danger/[0.06]')}>
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 shrink-0 rounded-[2px]', gone ? 'bg-danger' : KIND_STYLE[b.kind].dot)} />
                    <span
                      className={cn(
                        'min-w-0 flex-1 truncate text-[11.5px]',
                        gone ? 'text-subtle line-through' : 'text-muted',
                      )}
                    >
                      {b.label}
                    </span>
                    <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-subtle">{b.tokens}</span>
                  </div>
                  {gone && <p className="mt-0.5 pl-4 text-[11px] leading-relaxed text-danger">{b.lost}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quadratic cost */}
        <section>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Why the window is not simply made huge
          </p>
          <div className="h-40 w-full">
            <canvas
              ref={canvasRef}
              className="block"
              role="img"
              aria-label="Attention cost grows with the square of sequence length while KV cache memory grows linearly"
            />
          </div>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
            Self-attention scores every token against every other token, so this prompt&apos;s{' '}
            {used.toLocaleString('en-US')} tokens need {(used * used).toExponential(1)} pairwise scores per head per
            layer — {attentionRatio.toFixed(attentionRatio < 10 ? 1 : 0)}× the work of a 1,000-token prompt. The KV
            cache, meanwhile, grows only linearly: about {(kvBytes / 1e9).toFixed(2)} GB at 32 layers and d_model 4096
            in fp16. Doubling the window doubles the memory and quadruples the compute, which is why long-context
            pricing and latency climb faster than the token count does.
          </p>
        </section>
      </div>
    </WidgetShell>
  );
}
