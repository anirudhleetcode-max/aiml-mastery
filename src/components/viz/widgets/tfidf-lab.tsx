'use client';

import * as React from 'react';
import { Readout, Toggle, VIZ, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * TF-IDF, built from four documents you can edit.
 *
 * The formula is two ideas multiplied together, and both are visible here: how
 * often a term appears in *this* document, and how unusual it is across *all*
 * of them. The second half is what makes the method work — "the" occurs in
 * every document, so its inverse document frequency is exactly zero and it
 * scores nothing no matter how often it appears. A stop-word list is a
 * convenience; the maths already knew.
 *
 * Both the textbook idf and the smoothed variant scikit-learn actually uses are
 * available, because the difference between them — whether a term in every
 * document scores zero or merely little — trips people up constantly.
 */

const DEFAULT_DOCS = [
  'the cat sat on the mat and the cat purred',
  'the dog chased the cat around the garden',
  'the garden gate was open so the dog escaped',
  'the cat and the dog now share the garden',
];

type IdfMode = 'plain' | 'smooth';

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function idfOf(mode: IdfMode, n: number, df: number): number {
  // Textbook: ln(N / df) — a term in every document scores exactly zero.
  // Smoothed (scikit-learn): 1 + ln((1 + N) / (1 + df)) — never zero, never divides by zero.
  return mode === 'plain' ? Math.log(n / Math.max(1, df)) : 1 + Math.log((1 + n) / (1 + df));
}

const MAX_COLS = 12;

export default function TfidfLab() {
  const [docs, setDocs] = React.useState<string[]>(DEFAULT_DOCS);
  const [mode, setMode] = React.useState<IdfMode>('plain');
  const [term, setTerm] = React.useState('cat');
  const [docIndex, setDocIndex] = React.useState(0);

  const tokenised = React.useMemo(() => docs.map(tokenize), [docs]);
  const n = docs.length;

  const stats = React.useMemo(() => {
    const totals = new Map<string, number>();
    const df = new Map<string, number>();
    for (const toks of tokenised) {
      const seen = new Set<string>();
      for (const t of toks) {
        totals.set(t, (totals.get(t) ?? 0) + 1);
        seen.add(t);
      }
      for (const t of seen) df.set(t, (df.get(t) ?? 0) + 1);
    }
    const vocab = [...totals.keys()].sort((a, b) => (totals.get(b) ?? 0) - (totals.get(a) ?? 0) || a.localeCompare(b));
    return { totals, df, vocab };
  }, [tokenised]);

  const counts = React.useMemo(
    () => tokenised.map((toks) => toks.reduce((m, t) => m.set(t, (m.get(t) ?? 0) + 1), new Map<string, number>())),
    [tokenised],
  );

  const tfidf = React.useCallback(
    (t: string, d: number) => {
      const len = tokenised[d].length || 1;
      const tf = (counts[d].get(t) ?? 0) / len;
      return tf * idfOf(mode, n, stats.df.get(t) ?? 0);
    },
    [counts, tokenised, mode, n, stats.df],
  );

  const columns = stats.vocab.slice(0, MAX_COLS);
  const selected = stats.vocab.includes(term) ? term : (columns[0] ?? '');
  const df = stats.df.get(selected) ?? 0;
  const idf = idfOf(mode, n, df);
  const di = Math.min(docIndex, n - 1);
  const docLen = tokenised[di].length || 1;
  const tf = (counts[di].get(selected) ?? 0) / docLen;

  const topPerDoc = React.useMemo(
    () =>
      tokenised.map((toks, d) => {
        const unique = [...new Set(toks)];
        return unique
          .map((t) => ({ term: t, score: tfidf(t, d) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 4);
      }),
    [tokenised, tfidf],
  );

  const everywhere = stats.vocab.filter((t) => (stats.df.get(t) ?? 0) === n);
  const maxCell = Math.max(1e-9, ...stats.vocab.flatMap((t) => docs.map((_, d) => tfidf(t, d))));

  return (
    <WidgetShell
      takeaway={`Term frequency alone would rank "${everywhere[0] ?? 'the'}" first in every document. Multiplying by inverse document frequency fixes that: a term appearing in all ${n} documents gets idf = ln(${n}/${n}) = 0${mode === 'smooth' ? ' under the textbook formula, and only a small constant under the smoothed one' : ''}, so its score collapses to zero and the words that actually distinguish a document rise to the top.`}
      readout={
        <Readout
          items={[
            { label: 'Term', value: selected || '—' },
            { label: 'tf (doc ' + (di + 1) + ')', value: `${counts[di].get(selected) ?? 0}/${docLen} = ${tf.toFixed(3)}` },
            { label: 'df', value: `${df} / ${n}` },
            { label: 'idf', value: idf.toFixed(3), tone: idf === 0 ? 'bad' : idf > 0.6 ? 'good' : 'warn' },
            { label: 'tf-idf', value: (tf * idf).toFixed(4), tone: tf * idf === 0 ? 'bad' : 'default' },
          ]}
        />
      }
      controls={
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle
              label="idf formula"
              value={mode}
              onChange={(v) => setMode(v as IdfMode)}
              options={[
                { value: 'plain', label: 'ln(N / df)' },
                { value: 'smooth', label: '1 + ln((1+N)/(1+df))' },
              ]}
            />
            <Toggle
              label="Document for the arithmetic"
              value={String(di)}
              onChange={(v) => setDocIndex(Number(v))}
              options={docs.map((_, i) => ({ value: String(i), label: `Doc ${i + 1}` }))}
            />
          </div>
          <div className="space-y-2">
            {docs.map((d, i) => (
              <div key={i}>
                <label htmlFor={`tfidf-doc-${i}`} className="mb-0.5 block text-[11.5px] font-medium text-muted">
                  Document {i + 1} · {tokenised[i].length} tokens
                </label>
                <input
                  id={`tfidf-doc-${i}`}
                  type="text"
                  value={d}
                  onChange={(e) => setDocs((prev) => prev.map((old, j) => (j === i ? e.target.value : old)))}
                  className="w-full rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            Edit any document and the whole table recomputes. Removing a word from one document raises the idf of that
            word for every other document — the weights are a property of the corpus, not of a single text.
          </p>
        </>
      }
    >
      <div className="p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Document-term matrix — raw counts, shaded by tf-idf
        </p>
        <div className="overflow-x-auto">
          <table className="text-[11px]">
            <thead>
              <tr>
                <th className="pr-2" />
                {columns.map((t) => (
                  <th key={t} scope="col" className="px-0.5 pb-1 font-medium">
                    <button
                      type="button"
                      onClick={() => setTerm(t)}
                      className={cn(
                        'block max-w-[52px] truncate rounded px-1 py-0.5 text-[10.5px] transition-colors',
                        t === selected ? 'bg-primary/15 text-ink' : 'text-subtle hover:text-ink',
                      )}
                    >
                      {t}
                    </button>
                  </th>
                ))}
                <th scope="col" className="pl-2 pb-1 text-right text-[10.5px] font-medium text-subtle">
                  idf
                </th>
              </tr>
            </thead>
            <tbody>
              {docs.map((_, d) => (
                <tr key={d}>
                  <th scope="row" className="whitespace-nowrap pr-2 text-right text-[10.5px] font-normal text-subtle">
                    Doc {d + 1}
                  </th>
                  {columns.map((t) => {
                    const c = counts[d].get(t) ?? 0;
                    const score = tfidf(t, d);
                    return (
                      <td
                        key={t}
                        title={`${t} in doc ${d + 1}: count ${c}, tf-idf ${score.toFixed(4)}`}
                        className={cn(
                          'h-[26px] min-w-[26px] text-center tabular-nums',
                          c === 0 ? 'text-subtle' : score === 0 ? 'text-danger' : 'text-ink',
                          t === selected && 'ring-1 ring-inset ring-[hsl(var(--c-primary))]',
                        )}
                        style={{
                          background: `color-mix(in srgb, ${VIZ.series} ${Math.round((score / maxCell) * 80)}%, transparent)`,
                        }}
                      >
                        {c || ''}
                      </td>
                    );
                  })}
                  <td className="pl-2 text-right font-mono text-[10px] tabular-nums text-subtle" />
                </tr>
              ))}
              <tr>
                <th scope="row" className="pr-2 pt-1 text-right text-[10.5px] font-normal text-subtle">
                  idf
                </th>
                {columns.map((t) => {
                  const v = idfOf(mode, n, stats.df.get(t) ?? 0);
                  return (
                    <td
                      key={`idf-${t}`}
                      className={cn(
                        'pt-1 text-center font-mono text-[9.5px] tabular-nums',
                        v === 0 ? 'text-danger' : v > 0.6 ? 'text-success' : 'text-muted',
                      )}
                    >
                      {v.toFixed(2)}
                    </td>
                  );
                })}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The number in a cell is the raw count; the shading is the tf-idf weight, so a common word can be the largest
          count in its row and still be the palest cell.{' '}
          {everywhere.length > 0 && (
            <>
              Appearing in all {n} documents:{' '}
              <span className="font-medium text-danger">{everywhere.join(', ')}</span>.
            </>
          )}
        </p>
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          The arithmetic for &ldquo;{selected}&rdquo; in document {di + 1}
        </p>
        <div className="space-y-1 font-mono text-[12px] tabular-nums">
          <p className="text-muted">
            tf = count / length = {counts[di].get(selected) ?? 0} / {docLen} ={' '}
            <span className="text-ink">{tf.toFixed(4)}</span>
          </p>
          <p className="text-muted">
            df = documents containing it = {df} of {n}
          </p>
          <p className="text-muted">
            idf ={' '}
            {mode === 'plain'
              ? `ln(${n} / ${df || 1}) = ln(${(n / Math.max(1, df)).toFixed(3)})`
              : `1 + ln((1 + ${n}) / (1 + ${df})) = 1 + ln(${((1 + n) / (1 + df)).toFixed(3)})`}{' '}
            = <span className={idf === 0 ? 'text-danger' : 'text-ink'}>{idf.toFixed(4)}</span>
          </p>
          <p className="text-muted">
            tf-idf = {tf.toFixed(4)} × {idf.toFixed(4)} ={' '}
            <span className="font-semibold text-accent">{(tf * idf).toFixed(4)}</span>
          </p>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          {idf === 0
            ? `Because "${selected}" appears in all ${n} documents, ln(${n}/${n}) = 0 and the product is zero however often the word occurs. That single multiplication is the whole of stop-word removal.`
            : `"${selected}" appears in ${df} of ${n} documents, so it carries real information about which document you are reading.`}{' '}
          {mode === 'smooth'
            ? 'The smoothed form adds 1 to the numerator and denominator and then adds 1 to the result, so a term present everywhere keeps a small non-zero weight and a term absent from the corpus never divides by zero.'
            : 'Switch to the smoothed formula to see what scikit-learn does instead — and why no weight is ever exactly zero there.'}
        </p>
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Top-weighted terms per document
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {topPerDoc.map((list, d) => (
            <div key={d} className="rounded-md border border-line bg-surface-2/40 p-2">
              <p className="mb-1 text-[11px] font-medium text-muted">Document {d + 1}</p>
              <div className="flex flex-wrap gap-1">
                {list.map((e) => (
                  <button
                    key={e.term}
                    type="button"
                    onClick={() => {
                      setTerm(e.term);
                      setDocIndex(d);
                    }}
                    className={cn(
                      'rounded border border-line px-1.5 py-0.5 text-[11px] transition-colors hover:text-ink',
                      e.term === selected ? 'text-ink' : 'text-muted',
                    )}
                    style={{ background: `color-mix(in srgb, ${VIZ.good} ${Math.round((e.score / maxCell) * 70)}%, transparent)` }}
                  >
                    {e.term}{' '}
                    <span className="font-mono text-[9.5px] tabular-nums text-subtle">{e.score.toFixed(3)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          These are the terms a search engine would match on, and the features a bag-of-words classifier would lean on.
          Notice that none of them is a word common to every document.
        </p>
      </div>
    </WidgetShell>
  );
}
