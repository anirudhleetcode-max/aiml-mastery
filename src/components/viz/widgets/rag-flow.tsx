'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * Retrieval-augmented generation, with the retrieval left visible.
 *
 * The demo everyone builds hides the only interesting part. A question goes in,
 * an answer comes out, and the learner concludes that the vector database is
 * the clever bit. It is not. The vector database is a sorted list; what decides
 * whether the answer is right is whether the sentence containing the answer
 * survived chunking intact and scored highly enough to be pasted into the
 * prompt. So this widget shows the score for every chunk, the prompt that gets
 * assembled, and — the part usually missing — whether the sentence that
 * actually answers the question made it in.
 *
 * Two controls carry the lesson:
 *   • chunk size, which can cut an answer in half and is the single most
 *     common cause of a RAG system that "works on the demo questions";
 *   • k, which at 0 gives ungrounded generation: the same model, same question,
 *     answering confidently from nothing.
 *
 * Embeddings here are a readable stand-in for a real model: eight labelled
 * topic dimensions instead of 1,536 learned ones. The arithmetic — normalise,
 * take cosine similarity, sort, keep k — is exactly what a production
 * retriever does.
 */

/* ------------------------------------------------------------------ *
 * The corpus: eight short pages of an internal handbook
 * ------------------------------------------------------------------ */

interface Doc {
  id: string;
  title: string;
  text: string;
  /** The one sentence that answers this page's question. Chunking may cut it. */
  fact: string;
  /** What an ungrounded model says instead — fluent, specific, wrong. */
  invented: string;
}

const CORPUS: Doc[] = [
  {
    id: 'limits',
    title: 'Rate limits',
    text: 'The Meridian API allows 120 requests per minute for each project key. Requests above that limit receive HTTP 429 with a Retry-After header. The limit is counted per project, not per user, and burst credit does not accumulate.',
    fact: 'The Meridian API allows 120 requests per minute for each project key.',
    invented: 'The API allows 1,000 requests per minute, and paid plans are never throttled.',
  },
  {
    id: 'retention',
    title: 'Data retention',
    text: 'Prediction logs are kept for 30 days and then deleted. Training datasets are held for two years in cold storage. A customer deletion request is processed within seven working days.',
    fact: 'Prediction logs are kept for 30 days and then deleted.',
    invented: 'Prediction logs are kept for 90 days, and deletion requests are processed immediately.',
  },
  {
    id: 'sla',
    title: 'Availability target',
    text: 'Meridian targets 99.9 percent availability in each calendar month. Service credits are issued automatically when a month falls below that target. Scheduled maintenance is excluded from the availability calculation.',
    fact: 'Meridian targets 99.9 percent availability in each calendar month.',
    invented: 'Meridian guarantees 99.99 percent uptime, with credits issued on request.',
  },
  {
    id: 'auth',
    title: 'Tokens and authentication',
    text: 'An access token expires one hour after it is issued and must be renewed with the refresh token. A refresh token stays valid for thirty days. Every token is scoped to a single project.',
    fact: 'An access token expires one hour after it is issued and must be renewed with the refresh token.',
    invented: 'Access tokens are valid for 24 hours and refresh automatically in the background.',
  },
  {
    id: 'regions',
    title: 'Regions',
    text: 'Meridian runs in three regions: Frankfurt, Oregon and Singapore. A project is pinned to one region when it is created and cannot be moved afterwards. A cross-region read adds roughly 120 milliseconds of latency.',
    fact: 'A project is pinned to one region when it is created and cannot be moved afterwards.',
    invented: 'A project can be moved between regions from the console in a few minutes.',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    text: 'Batch inference costs 40 cents per thousand predictions. Real-time inference costs 90 cents per thousand predictions. Training is billed separately at 3 dollars per GPU hour.',
    fact: 'Real-time inference costs 90 cents per thousand predictions.',
    invented: 'Real-time inference costs 25 cents per thousand predictions on every plan.',
  },
  {
    id: 'incidents',
    title: 'Incident response',
    text: 'A Sev-1 incident pages the on-call engineer within five minutes. The status page is updated within fifteen minutes of a confirmed outage. A written postmortem follows within five working days.',
    fact: 'The status page is updated within fifteen minutes of a confirmed outage.',
    invented: 'The status page updates automatically the moment any error rate rises.',
  },
  {
    id: 'versions',
    title: 'Model versions',
    text: 'Every deployed model keeps its three previous versions available for rollback. A rollback is one API call and completes in under a minute. Older versions are archived rather than deleted.',
    fact: 'Every deployed model keeps its three previous versions available for rollback.',
    invented: 'Every model keeps ten previous versions, and rollback takes about half an hour.',
  },
];

/* ------------------------------------------------------------------ *
 * Embeddings: eight dimensions you can read
 * ------------------------------------------------------------------ */

const DIMS: { label: string; terms: string[] }[] = [
  { label: 'limits', terms: ['rate', 'limit', 'limits', 'limited', 'request', 'requests', 'minute', '429', 'throttle', 'throttled', 'burst', 'quota', 'retry'] },
  { label: 'retention', terms: ['retention', 'retained', 'log', 'logs', 'kept', 'keep', 'stored', 'storage', 'delete', 'deleted', 'deletion', 'erase'] },
  { label: 'uptime', terms: ['availability', 'available', 'uptime', 'sla', 'percent', '99', 'credit', 'credits', 'maintenance', 'downtime'] },
  { label: 'auth', terms: ['token', 'tokens', 'access', 'expire', 'expires', 'refresh', 'renewed', 'auth', 'authentication', 'login', 'scoped', 'hour'] },
  { label: 'regions', terms: ['region', 'regions', 'frankfurt', 'oregon', 'singapore', 'pinned', 'move', 'moved', 'latency', 'milliseconds', 'eu', 'residency'] },
  { label: 'pricing', terms: ['price', 'pricing', 'cost', 'costs', 'cents', 'dollars', 'billed', 'billing', 'charge', 'batch', 'gpu', 'inference', 'predictions'] },
  { label: 'incidents', terms: ['incident', 'incidents', 'sev', 'sev-1', 'outage', 'on-call', 'oncall', 'paged', 'pages', 'status', 'postmortem', 'escalate'] },
  { label: 'versions', terms: ['version', 'versions', 'rollback', 'roll', 'deployed', 'deploy', 'deployment', 'previous', 'archived', 'model'] },
];

const TERM_TO_DIM = new Map<string, number>();
DIMS.forEach((d, i) => d.terms.forEach((t) => TERM_TO_DIM.set(t, i)));

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9. -]/g, ' ').split(/\s+/).filter(Boolean);
}

/** Sub-linear term weighting, then L2 normalisation — cosine is then a dot product. */
function embed(text: string): number[] {
  const counts = new Array<number>(DIMS.length).fill(0);
  for (const raw of words(text)) {
    const w = raw.replace(/\.$/, '');
    const dim = TERM_TO_DIM.get(w);
    if (dim !== undefined) counts[dim] += 1;
  }
  const weighted = counts.map((c) => (c === 0 ? 0 : 1 + Math.log(c)));
  const norm = Math.sqrt(weighted.reduce((s, x) => s + x * x, 0));
  return norm === 0 ? weighted : weighted.map((x) => x / norm);
}

function cosine(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

/* ------------------------------------------------------------------ *
 * Chunking
 * ------------------------------------------------------------------ */

interface Chunk {
  key: string;
  docId: string;
  docTitle: string;
  part: number;
  parts: number;
  text: string;
  vector: number[];
  /** Does this chunk hold the page's answer sentence whole? */
  holdsFact: boolean;
  /** Does it hold part of it, with the rest in a neighbouring chunk? */
  splitsFact: boolean;
}

function chunkCorpus(size: number, overlap: boolean): Chunk[] {
  const stride = overlap ? Math.max(1, Math.round(size / 2)) : size;
  const out: Chunk[] = [];
  for (const doc of CORPUS) {
    const tokens = doc.text.split(/\s+/);
    const factTokens = doc.fact.split(/\s+/);
    const factStart = tokens.findIndex((_, i) => tokens.slice(i, i + factTokens.length).join(' ') === doc.fact);
    const factEnd = factStart + factTokens.length - 1;

    const starts: number[] = [];
    for (let s = 0; s < tokens.length; s += stride) starts.push(s);
    starts.forEach((start, idx) => {
      const end = Math.min(tokens.length, start + size) - 1;
      const text = tokens.slice(start, end + 1).join(' ');
      const holds = factStart >= 0 && start <= factStart && end >= factEnd;
      const overlapsFact = factStart >= 0 && start <= factEnd && end >= factStart;
      out.push({
        key: `${doc.id}-${idx}`,
        docId: doc.id,
        docTitle: doc.title,
        part: idx + 1,
        parts: starts.length,
        text,
        vector: embed(text),
        holdsFact: holds,
        splitsFact: overlapsFact && !holds,
      });
    });
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Questions
 * ------------------------------------------------------------------ */

const PRESETS: { q: string; docId: string | null }[] = [
  { q: 'How many requests per minute can one project make?', docId: 'limits' },
  { q: 'How long are prediction logs kept?', docId: 'retention' },
  { q: 'When does an access token expire?', docId: 'auth' },
  { q: 'What does real-time inference cost?', docId: 'pricing' },
  { q: 'Can a project be moved to another region?', docId: 'regions' },
  { q: 'How many model versions can I roll back to?', docId: 'versions' },
  { q: 'Does Meridian fine-tune models on my own data?', docId: null },
];

/** Which page ought to answer this, judged from the question's own terms. */
function goldDocFor(question: string): Doc | null {
  const explicit = PRESETS.find((p) => p.q.toLowerCase() === question.trim().toLowerCase());
  if (explicit) return explicit.docId ? (CORPUS.find((d) => d.id === explicit.docId) ?? null) : null;
  const qv = embed(question);
  if (qv.every((v) => v === 0)) return null;
  let best: Doc | null = null;
  let bestScore = 0.35; // below this, no page is really about the question
  for (const doc of CORPUS) {
    const s = cosine(qv, embed(doc.text));
    if (s > bestScore) {
      bestScore = s;
      best = doc;
    }
  }
  return best;
}

const estTokens = (text: string) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length * 1.35));

export default function RagFlow() {
  const [question, setQuestion] = React.useState(PRESETS[0].q);
  const [chunkSize, setChunkSize] = React.useState(20);
  const [k, setK] = React.useState(3);
  const [overlap, setOverlap] = React.useState<'none' | 'half'>('none');

  const chunks = React.useMemo(() => chunkCorpus(chunkSize, overlap === 'half'), [chunkSize, overlap]);
  const qVector = React.useMemo(() => embed(question), [question]);
  const gold = React.useMemo(() => goldDocFor(question), [question]);

  const ranked = React.useMemo(
    () =>
      chunks
        .map((c) => ({ chunk: c, score: cosine(qVector, c.vector) }))
        .sort((a, b) => b.score - a.score),
    [chunks, qVector],
  );
  const selected = ranked.slice(0, k);

  const goldChunkRetrieved = gold ? selected.some((r) => r.chunk.docId === gold.id && r.chunk.holdsFact) : false;
  const goldChunkSplit = gold ? selected.some((r) => r.chunk.docId === gold.id && r.chunk.splitsFact) : false;
  const factSurvivesChunking = gold ? chunks.some((c) => c.docId === gold.id && c.holdsFact) : false;

  const contextBlock = selected
    .map((r, i) => `[${i + 1}] ${r.chunk.docTitle} (part ${r.chunk.part}/${r.chunk.parts})\n${r.chunk.text}`)
    .join('\n\n');
  const systemPrompt = 'Answer only from the context below. If the context does not contain the answer, say so.';
  const prompt = `${systemPrompt}\n\nContext:\n${selected.length ? contextBlock : '(empty — nothing was retrieved)'}\n\nQuestion: ${question}`;

  type Verdict = 'grounded' | 'split' | 'missing' | 'ungrounded' | 'out-of-corpus';
  const verdict: Verdict =
    k === 0 ? 'ungrounded' : !gold ? 'out-of-corpus' : goldChunkRetrieved ? 'grounded' : goldChunkSplit ? 'split' : 'missing';

  const citation = selected.findIndex((r) => gold && r.chunk.docId === gold.id && (r.chunk.holdsFact || r.chunk.splitsFact));
  const splitChunk = selected.find((r) => gold && r.chunk.docId === gold.id && r.chunk.splitsFact)?.chunk;

  const answerTone: Record<Verdict, string> = {
    grounded: 'border-success/40 bg-success/[0.07]',
    split: 'border-warning/40 bg-warning/[0.07]',
    missing: 'border-danger/40 bg-danger/[0.07]',
    ungrounded: 'border-danger/40 bg-danger/[0.07]',
    'out-of-corpus': 'border-line bg-surface-2',
  };

  return (
    <WidgetShell
      takeaway="Retrieval quality is decided by chunking, not by the vector store. Cut the chunk size until the answer sentence straddles a boundary and the same embeddings, the same similarity metric and the same k return a confident half-answer — which is worse than no answer, because it still looks grounded."
      readout={
        <Readout
          items={[
            { label: 'Chunks', value: String(chunks.length) },
            { label: 'Top score', value: (selected[0]?.score ?? 0).toFixed(3) },
            { label: 'Prompt', value: `${estTokens(prompt)} tok` },
            {
              label: 'Answer span',
              value:
                k === 0 ? 'not retrieved' : verdict === 'grounded' ? 'intact' : verdict === 'split' ? 'split' : 'missing',
              tone: verdict === 'grounded' ? 'good' : verdict === 'split' ? 'warn' : 'bad',
            },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Chunk size"
            value={chunkSize}
            min={6}
            max={44}
            step={2}
            onChange={setChunkSize}
            format={(v) => `${v} words`}
            hint="Small chunks score precisely but slice sentences in half; whole-page chunks keep the answer together and dilute the score with everything else on the page."
          />
          <Slider
            label="Chunks retrieved (k)"
            value={k}
            min={0}
            max={6}
            step={1}
            onChange={setK}
            format={(v) => (v === 0 ? '0 — no retrieval' : String(v))}
            hint="Drag to 0 for ungrounded generation: the same question, answered from the model's memory alone."
          />
          <Toggle
            label="Chunk overlap"
            value={overlap}
            onChange={(v) => setOverlap(v as 'none' | 'half')}
            options={[
              { value: 'none', label: 'None' },
              { value: 'half', label: '50% overlap' },
            ]}
          />
        </>
      }
    >
      <div className="space-y-4 p-4">
        {/* 1 — the question */}
        <section>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">1 · Question</p>
          <label htmlFor="rag-question" className="sr-only">
            Question to ask the corpus
          </label>
          <input
            id="rag-question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask the handbook something"
            className="w-full rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-ink outline-none placeholder:text-subtle focus:border-primary"
          />
          <div className="mt-1.5 flex flex-wrap gap-1">
            {PRESETS.map((p) => (
              <button
                key={p.q}
                type="button"
                onClick={() => setQuestion(p.q)}
                className={cn(
                  'rounded-md border px-2 py-0.5 text-[11px] transition-colors',
                  question === p.q ? 'border-primary bg-primary/10 text-ink' : 'border-line bg-surface-2 text-subtle hover:text-ink',
                )}
              >
                {p.docId ? p.q.split(' ').slice(0, 4).join(' ') + '…' : 'not in the corpus'}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="shrink-0 text-[11px] text-subtle">query vector</span>
            <div className="flex min-w-0 flex-1 gap-[2px]" role="img" aria-label={`Query embedding: ${DIMS.map((d, i) => `${d.label} ${qVector[i].toFixed(2)}`).join(', ')}`}>
              {qVector.map((v, i) => (
                <div key={i} className="h-4 flex-1 rounded-[2px] bg-surface-2" title={DIMS[i].label}>
                  <div className="h-full rounded-[2px] bg-accent" style={{ width: `${v * 100}%` }} />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-1 font-mono text-[10px] text-subtle">
            [{qVector.map((v) => v.toFixed(2)).join(', ')}] · dims: {DIMS.map((d) => d.label).join(' · ')}
          </p>
        </section>

        {/* 2 — chunking + scoring */}
        <section>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            2 · {chunks.length} chunks scored by cosine similarity
          </p>
          <div className="max-h-64 space-y-1 overflow-y-auto rounded-md border border-line bg-surface-2/40 p-1.5">
            {ranked.map((r, i) => {
              const picked = i < k;
              return (
                <div
                  key={r.chunk.key}
                  className={cn(
                    'rounded-md border px-2 py-1.5',
                    picked ? 'border-primary/50 bg-primary/[0.08]' : 'border-transparent',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn('w-4 shrink-0 text-center font-mono text-[10px]', picked ? 'text-primary-ink' : 'text-subtle')}>
                      {picked ? i + 1 : '·'}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-muted">
                      {r.chunk.docTitle}
                      <span className="text-subtle"> {r.chunk.part}/{r.chunk.parts}</span>
                    </span>
                    <div className="h-2 w-16 shrink-0 rounded-sm bg-surface-3">
                      <div
                        className={cn('h-full rounded-sm', picked ? 'bg-primary' : 'bg-viz-none')}
                        style={{ width: `${Math.max(1, r.score * 100)}%` }}
                      />
                    </div>
                    <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-subtle">
                      {r.score.toFixed(2)}
                    </span>
                  </div>
                  {picked && (
                    <p className="mt-1 pl-6 text-[11px] leading-relaxed text-muted">
                      {r.chunk.text}
                      {gold && r.chunk.docId === gold.id && r.chunk.holdsFact && (
                        <span className="ml-1 rounded bg-success/15 px-1 text-[9.5px] font-medium text-success">answer sentence, whole</span>
                      )}
                      {gold && r.chunk.docId === gold.id && r.chunk.splitsFact && (
                        <span className="ml-1 rounded bg-warning/15 px-1 text-[9.5px] font-medium text-warning">answer sentence, cut</span>
                      )}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {gold && !factSurvivesChunking && (
            <p className="mt-1.5 text-[11px] leading-relaxed text-warning">
              At {chunkSize} words per chunk no chunk in the corpus contains &quot;{gold.fact}&quot; whole. No value of k
              can fix that — the damage was done at indexing time, hours before the question was asked.
            </p>
          )}
        </section>

        {/* 3 — the assembled prompt */}
        <section>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            3 · Prompt sent to the model — {estTokens(prompt)} tokens
          </p>
          <pre className="max-h-44 overflow-auto whitespace-pre-wrap rounded-md border border-line bg-surface-2 p-2 font-mono text-[10.5px] leading-relaxed text-muted">
            {prompt}
          </pre>
          <p className="mt-1 text-[11px] text-subtle">
            This string is the entire difference between RAG and a plain chat call. There is no other channel: if a fact
            is not in this text, the model does not have it.
          </p>
        </section>

        {/* 4 — the answer */}
        <section>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">4 · Answer</p>
          <div className={cn('rounded-md border p-2.5', answerTone[verdict])}>
            {verdict === 'grounded' && gold && (
              <>
                <p className="text-[12.5px] leading-relaxed text-ink">
                  {gold.fact} <span className="font-mono text-[10.5px] text-primary-ink">[{citation + 1}]</span>
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  Grounded: every clause traces to chunk [{citation + 1}], {selected[citation]?.chunk.docTitle}. The
                  citation is checkable, which is the only reason to trust the sentence.
                </p>
              </>
            )}
            {verdict === 'split' && gold && (
              <>
                <p className="text-[12.5px] leading-relaxed text-ink">
                  {splitChunk?.text} <span className="font-mono text-[10.5px] text-warning">[{citation + 1}]</span>
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-warning">
                  The chunk boundary fell inside the answer. The model receives half a sentence with a citation attached
                  and completes the other half from its own priors — a plausible answer with a real source attached to
                  it, which is the hardest failure of all to catch in review.
                </p>
              </>
            )}
            {verdict === 'missing' && gold && (
              <>
                <p className="text-[12.5px] leading-relaxed text-ink">
                  The context does not contain the answer.
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  The page that answers this — {gold.title} — was not in the top {k}. The system prompt is doing the
                  work here: without the &quot;say so&quot; instruction the model would answer anyway, and it would say
                  something like &quot;{gold.invented}&quot;
                </p>
              </>
            )}
            {verdict === 'ungrounded' && (
              <>
                <p className="text-[12.5px] leading-relaxed text-ink">
                  {gold ? gold.invented : 'Meridian supports fine-tuning on customer data through the console, with adapters trained in about an hour.'}
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-danger">
                  k = 0, so nothing was retrieved and there is no citation to check. The sentence is specific, fluent,
                  correctly formatted and wrong. Compare it with the handbook above — this is what every RAG system
                  degrades to the moment retrieval silently returns nothing.
                </p>
              </>
            )}
            {verdict === 'out-of-corpus' && (
              <>
                <p className="text-[12.5px] leading-relaxed text-ink">The context does not contain the answer.</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  Nothing in these eight pages is about this question, and the top score above says so — {(selected[0]?.score ?? 0).toFixed(2)}.
                  A similarity floor that refuses to retrieve below roughly 0.3 is the cheapest guard a RAG system can
                  have, because retrieval always returns its k best chunks, however bad they are.
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </WidgetShell>
  );
}
