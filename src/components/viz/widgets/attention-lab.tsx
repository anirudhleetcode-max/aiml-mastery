'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, VIZ, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * Attention as a weighted lookup, with the arithmetic on screen.
 *
 * Every token emits a query ("what am I looking for?"), a key ("what am I?")
 * and a value ("what do I contribute?"). The score between two tokens is a dot
 * product, divided by √d so the softmax does not saturate, and the softmax of
 * those scores is the row of weights. That is the entire mechanism, and the
 * table at the bottom shows it one multiplication at a time.
 *
 * The query and key vectors here are hand-authored from four interpretable
 * dimensions — entity, thing, action, property — rather than learned, so that
 * the pattern is linguistically sensible and a learner can see *why* a pronoun
 * attends to a noun. A trained transformer learns vectors that do the same job
 * in hundreds of dimensions nobody has named.
 */

const DIMS = ['entity', 'thing', 'action', 'property'] as const;
const D = 4;

type Role = 'animate' | 'object' | 'verb' | 'adj' | 'func';

interface RoleSpec {
  /** What this kind of word *is* — its key. */
  k: number[];
  /** What this kind of word is *looking for* — its query. */
  q: number[];
  /** What it contributes if attended to: (entity-ness, event-ness). */
  v: [number, number];
  gloss: string;
}

const ROLES: Record<Role, RoleSpec> = {
  animate: { k: [0.95, 0.15, 0.05, 0.1], q: [0.15, 0.1, 0.8, 0.5], v: [0.9, 0.1], gloss: 'animate noun' },
  object: { k: [0.1, 0.95, 0.05, 0.15], q: [0.2, 0.1, 0.7, 0.45], v: [0.6, 0.2], gloss: 'thing' },
  verb: { k: [0.1, 0.1, 0.95, 0.1], q: [0.8, 0.6, 0.1, 0.15], v: [0.2, 0.9], gloss: 'verb' },
  adj: { k: [0.15, 0.15, 0.1, 0.95], q: [0.7, 0.5, 0.15, 0.1], v: [0.3, 0.4], gloss: 'property' },
  func: { k: [0.12, 0.12, 0.12, 0.12], q: [0.25, 0.25, 0.25, 0.25], v: [0.1, 0.1], gloss: 'function word' },
};

const LEXICON: Record<string, Role> = {
  animal: 'animate',
  cat: 'animate',
  mouse: 'animate',
  chef: 'animate',
  friend: 'animate',
  street: 'object',
  mat: 'object',
  fish: 'object',
  book: 'object',
  paris: 'object',
  cross: 'verb',
  chased: 'verb',
  cooked: 'verb',
  sat: 'verb',
  trained: 'verb',
  was: 'verb',
  did: 'verb',
  tired: 'adj',
  hungry: 'adj',
  small: 'adj',
  warm: 'adj',
  the: 'func',
  a: 'func',
  not: 'func',
  too: 'func',
  because: 'func',
  who: 'func',
  in: 'func',
  on: 'func',
  it: 'func',
};

/**
 * Word-level query overrides. A pronoun is the whole reason this widget exists:
 * "it" is looking for a noun, and leans towards the animate one because the
 * clause it sits in ("was too tired") is a property of a creature, not a road.
 */
const QUERY_OVERRIDES: Record<string, number[]> = {
  it: [0.95, 0.5, 0.1, 0.25],
  tired: [0.95, 0.2, 0.15, 0.1],
  because: [0.2, 0.2, 0.75, 0.3],
  who: [0.9, 0.15, 0.2, 0.1],
};

const PRESETS: { id: string; label: string; text: string; note: string }[] = [
  {
    id: 'pronoun',
    label: 'Pronoun',
    text: 'the animal did not cross the street because it was too tired',
    note: 'Two candidate nouns, one pronoun. Select "it" and watch the weight land on animal rather than street.',
  },
  {
    id: 'simple',
    label: 'Adjectives',
    text: 'the hungry cat chased the small mouse',
    note: 'Adjectives look for the noun they describe; verbs look for their arguments.',
  },
  {
    id: 'clause',
    label: 'Relative clause',
    text: 'the chef who trained in paris cooked the fish',
    note: 'The relative pronoun "who" reaches back past four words to the chef — a dependency an RNN struggles to keep.',
  },
];

const MAX_TOKENS = 12;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_TOKENS);
}

/** Deterministic vector for a word the lexicon does not know. */
function hashVec(token: string, seed: number, salt: number): number[] {
  let h = (2166136261 ^ (seed * 2654435761)) >>> 0;
  for (let i = 0; i < token.length; i++) h = Math.imul(h ^ token.charCodeAt(i), 16777619) >>> 0;
  return new Array(D).fill(0).map((_, i) => {
    const x = Math.imul(h ^ ((i + salt) * 0x9e3779b9), 0x85ebca6b) >>> 0;
    return Math.round(((x % 1000) / 1000) * 60) / 100 + 0.1;
  });
}

interface Token {
  text: string;
  role: Role | 'unknown';
  gloss: string;
  q: number[];
  k: number[];
  v: [number, number];
}

function analyse(tokens: string[], seed: number): Token[] {
  return tokens.map((t) => {
    const role = LEXICON[t];
    if (!role) {
      const k = hashVec(t, seed, 1);
      const q = hashVec(t, seed, 7);
      return { text: t, role: 'unknown', gloss: 'not in the lexicon', q, k, v: [0.4, 0.4] as [number, number] };
    }
    const spec = ROLES[role];
    return { text: t, role, gloss: spec.gloss, q: QUERY_OVERRIDES[t] ?? spec.q, k: spec.k, v: spec.v };
  });
}

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function softmax(scores: number[]): number[] {
  const m = Math.max(...scores);
  const ex = scores.map((s) => Math.exp(s - m));
  const total = ex.reduce((a, b) => a + b, 0);
  return ex.map((e) => e / total);
}

export default function AttentionLab() {
  const [text, setText] = React.useState(PRESETS[0].text);
  const [presetId, setPresetId] = React.useState('pronoun');
  const [queryIndex, setQueryIndex] = React.useState(8);
  const [scaled, setScaled] = React.useState(true);
  const [seed, setSeed] = React.useState(5);

  const tokens = React.useMemo(() => tokenize(text), [text]);
  const analysed = React.useMemo(() => analyse(tokens, seed), [tokens, seed]);

  const qi = Math.min(queryIndex, Math.max(0, analysed.length - 1));
  const query = analysed[qi];

  const scaleDivisor = scaled ? Math.sqrt(D) : 1;

  const rows = React.useMemo(
    () =>
      analysed.map((tokenA) => {
        const raw = analysed.map((tokenB) => dot(tokenA.q, tokenB.k));
        const scores = raw.map((r) => r / scaleDivisor);
        return { raw, scores, weights: softmax(scores) };
      }),
    [analysed, scaleDivisor],
  );

  const row = rows[qi];
  const weights = row?.weights ?? [];
  const top = weights
    .map((w, i) => ({ w, i }))
    .sort((a, b) => b.w - a.w)
    .filter((e) => e.i !== qi)
    .slice(0, 2);

  const expSum = row ? row.scores.reduce((s, v) => s + Math.exp(v - Math.max(...row.scores)), 0) : 1;
  const shift = row ? Math.max(...row.scores) : 0;

  // The mixed value vector: attention's actual output for this query.
  const mixed = analysed.reduce(
    (acc, t, i) => [acc[0] + weights[i] * t.v[0], acc[1] + weights[i] * t.v[1]],
    [0, 0] as number[],
  );

  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setPresetId(id);
    setText(p.text);
    const toks = tokenize(p.text);
    const pick = toks.findIndex((t) => t === 'it' || t === 'who' || t === 'chased');
    setQueryIndex(pick >= 0 ? pick : 0);
  };

  const note = PRESETS.find((p) => p.id === presetId)?.note ?? '';
  const sharpest = Math.max(...weights, 0);

  return (
    <WidgetShell
      takeaway={`Attention is a weighted average: score every token against the query with a dot product, divide by √d, softmax, then mix the values in those proportions. The query, key and value vectors here are hand-authored from four named dimensions so the pattern is readable — a trained transformer learns vectors that do the same job in dimensions no one has labelled.`}
      readout={
        <Readout
          items={[
            { label: 'Query', value: query?.text ?? '—' },
            { label: 'Attends most to', value: top[0] ? `${analysed[top[0].i].text} (${(top[0].w * 100).toFixed(1)}%)` : '—', tone: 'good' },
            { label: 'Then', value: top[1] ? `${analysed[top[1].i].text} (${(top[1].w * 100).toFixed(1)}%)` : '—' },
            { label: 'Peak weight', value: sharpest.toFixed(3), tone: sharpest > 0.6 ? 'warn' : 'default' },
            { label: 'Tokens', value: String(analysed.length) },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Sentence preset"
            value={presetId}
            onChange={applyPreset}
            options={PRESETS.map((p) => ({ value: p.id, label: p.label }))}
          />
          <div>
            <label htmlFor="attention-sentence" className="mb-1 block text-[12px] font-medium text-muted">
              Sentence (edit freely; up to {MAX_TOKENS} tokens)
            </label>
            <input
              id="attention-sentence"
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setPresetId('');
              }}
              className="w-full rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-ink outline-none focus:border-primary"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle
              label="Scaling"
              value={scaled ? 'on' : 'off'}
              onChange={(v) => setScaled(v === 'on')}
              options={[
                { value: 'on', label: 'Divide by √d' },
                { value: 'off', label: 'Unscaled' },
              ]}
            />
            <Slider
              label="Seed (vectors for unknown words)"
              value={seed}
              min={1}
              max={9}
              step={1}
              onChange={setSeed}
              hint="Words outside the lexicon get deterministic vectors from this seed."
            />
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            {note || 'Edited sentence. Words in the lexicon carry authored vectors; the rest are seeded.'}{' '}
            {scaled
              ? 'Scores are divided by √4 = 2, which keeps the softmax from saturating.'
              : 'Without the √d division the scores are larger, the softmax sharper, and gradients through it smaller — which is exactly why the scaling is in the formula.'}
          </p>
        </>
      }
    >
      <div className="p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Pick a query token, then read its attention
        </p>
        <div className="flex flex-wrap gap-1">
          {analysed.map((t, i) => (
            <button
              key={`${t.text}-${i}`}
              type="button"
              onClick={() => setQueryIndex(i)}
              aria-pressed={i === qi}
              aria-label={`Use ${t.text} as the query; it receives ${(weights[i] * 100 || 0).toFixed(0)} percent of the current attention`}
              className={cn(
                'rounded-md border px-1.5 py-1 text-[12px] transition-colors',
                i === qi ? 'border-primary text-ink' : 'border-transparent text-muted hover:text-ink',
              )}
              style={{
                background:
                  i === qi
                    ? 'hsl(var(--c-primary) / 0.16)'
                    : `color-mix(in srgb, ${VIZ.good} ${Math.round((weights[i] ?? 0) * 85)}%, transparent)`,
              }}
            >
              {t.text}
              <span className="ml-1 font-mono text-[9.5px] text-subtle">{((weights[i] ?? 0) * 100).toFixed(0)}%</span>
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[10.5px] leading-snug text-subtle">
          Shading is the attention weight from <span className="font-medium text-ink">{query?.text}</span>; the
          percentage is printed on every token so the pattern does not depend on seeing colour.
        </p>
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Attention weights from {query?.text}
        </p>
        <div className="space-y-1">
          {analysed.map((t, i) => (
            <div key={`bar-${t.text}-${i}`} className="flex items-center gap-2">
              <span className={cn('w-20 shrink-0 truncate text-right text-[11px]', i === qi ? 'text-ink' : 'text-subtle')}>
                {t.text}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-sm bg-surface-2">
                <div
                  className="h-full rounded-sm"
                  style={{ width: `${Math.max(0.5, (weights[i] ?? 0) * 100)}%`, background: i === qi ? VIZ.muted : VIZ.series }}
                />
              </div>
              <span className="w-12 shrink-0 text-right font-mono text-[10.5px] tabular-nums text-muted">
                {(weights[i] ?? 0).toFixed(3)}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The weights sum to {weights.reduce((a, b) => a + b, 0).toFixed(3)}. Mixing the value vectors in these
          proportions gives [{mixed[0].toFixed(3)}, {mixed[1].toFixed(3)}] on the (entity, event) axes — the output
          attention hands to the next layer for this token.
        </p>
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Full attention matrix — row = query, column = key
        </p>
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-[1px] text-[9px]">
            <thead>
              <tr>
                <th className="w-16" />
                {analysed.map((t, i) => (
                  <th key={`h-${i}`} scope="col" className="max-w-[26px] truncate px-0.5 font-normal text-subtle">
                    {t.text.slice(0, 4)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`r-${i}`}>
                  <th
                    scope="row"
                    className={cn('w-16 max-w-[64px] truncate pr-1 text-right text-[10px] font-normal', i === qi ? 'text-ink' : 'text-subtle')}
                  >
                    <button type="button" onClick={() => setQueryIndex(i)} className="hover:text-ink">
                      {analysed[i].text}
                    </button>
                  </th>
                  {r.weights.map((w, j) => (
                    <td
                      key={`c-${i}-${j}`}
                      title={`${analysed[i].text} → ${analysed[j].text}: ${w.toFixed(3)}`}
                      className={cn(
                        'h-[22px] w-[22px] text-center tabular-nums',
                        i === qi ? 'text-ink' : 'text-subtle',
                        i === qi && 'ring-1 ring-inset ring-[hsl(var(--c-primary))]',
                      )}
                      style={{ background: `color-mix(in srgb, ${VIZ.series} ${Math.round(w * 90)}%, transparent)` }}
                    >
                      {w >= 0.1 ? w.toFixed(1).slice(1) : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[10.5px] leading-snug text-subtle">
          Every row sums to 1. Cells show the weight to two digits where it exceeds 0.1; hover any cell for the exact
          value.
        </p>
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Scaled dot-product, written out for &ldquo;{query?.text}&rdquo;
        </p>
        <p className="mb-2 font-mono text-[11px] leading-relaxed text-muted">
          q = [{query?.q.map((v) => v.toFixed(2)).join(', ')}] over ({DIMS.join(', ')})
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-1 pr-2 font-medium">key token</th>
                <th scope="col" className="py-1 pr-2 font-medium">q · k</th>
                <th scope="col" className="py-1 pr-2 text-right font-medium">= dot</th>
                <th scope="col" className="py-1 pr-2 text-right font-medium">÷ {scaleDivisor.toFixed(0)}</th>
                <th scope="col" className="py-1 pr-2 text-right font-medium">exp</th>
                <th scope="col" className="py-1 text-right font-medium">weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {analysed.map((t, i) => {
                const raw = row?.raw[i] ?? 0;
                const sc = row?.scores[i] ?? 0;
                const ex = Math.exp(sc - shift);
                return (
                  <tr key={`m-${i}`} className={weights[i] === sharpest ? 'bg-primary/[0.06]' : undefined}>
                    <td className="py-1 pr-2 text-ink">{t.text}</td>
                    <td className="py-1 pr-2 font-mono text-[10px] tabular-nums text-subtle">
                      {query?.q.map((qv, d) => `${qv.toFixed(2)}×${t.k[d].toFixed(2)}`).join(' + ')}
                    </td>
                    <td className="py-1 pr-2 text-right font-mono tabular-nums text-muted">{raw.toFixed(3)}</td>
                    <td className="py-1 pr-2 text-right font-mono tabular-nums text-muted">{sc.toFixed(3)}</td>
                    <td className="py-1 pr-2 text-right font-mono tabular-nums text-muted">{ex.toFixed(3)}</td>
                    <td className="py-1 text-right font-mono tabular-nums font-semibold text-accent">
                      {(weights[i] ?? 0).toFixed(3)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The exponentials sum to {expSum.toFixed(3)}; each weight is that token&apos;s exponential divided by the sum,
          which is all softmax is. The largest exponent is subtracted from every score first — a numerical trick that
          changes nothing about the answer and stops e^score overflowing.
        </p>
      </div>
    </WidgetShell>
  );
}
