'use client';

import * as React from 'react';
import { Readout, Toggle, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * The same text, split three ways.
 *
 * A model does not see words and it certainly does not see letters — it sees
 * integers standing for subword pieces. Almost every strange behaviour a
 * learner will meet comes from that gap: the rare word that costs eleven
 * tokens, the invoice number chopped at an arbitrary digit, and the famous
 * inability to count the letters in "strawberry" when the model was handed two
 * pieces and never saw an r at all.
 *
 * The subword split is a hand-built greedy longest-match over a small vocabulary
 * rather than a trained BPE merge table, which keeps every id checkable while
 * behaving the way a real tokenizer behaves.
 */

/** Word-initial marker, as in SentencePiece. A leading space is part of the token. */
const SPACE = '▁';

/**
 * A small vocabulary: whole common words, then the morpheme-ish fragments a
 * merge-based tokenizer tends to learn, then digit pairs, then single characters.
 */
const VOCAB: string[] = [
  // common whole words (with their leading space, as a real vocabulary stores them)
  `${SPACE}the`, `${SPACE}quick`, `${SPACE}brown`, `${SPACE}fox`, `${SPACE}jumps`, `${SPACE}over`,
  `${SPACE}lazy`, `${SPACE}dog`, `${SPACE}is`, `${SPACE}are`, `${SPACE}in`, `${SPACE}on`, `${SPACE}for`,
  `${SPACE}how`, `${SPACE}many`, `${SPACE}order`, `${SPACE}shipped`, `${SPACE}and`, `${SPACE}a`,
  `${SPACE}to`, `${SPACE}of`, `${SPACE}it`, `${SPACE}was`, `${SPACE}not`,
  // fragments
  `${SPACE}anti`, 'dis', 'establish', 'ment', 'arian', 'ism', `${SPACE}un`, 'question', 'able', 'ably',
  `${SPACE}hepat`, 'ato', 'toxic', `${SPACE}straw`, 'berry', `${SPACE}rasp`, `${SPACE}count`, 'ing', 'ed',
  'ly', 'er', 'ers', 'ion', 'tion', 'ness', 'able', `${SPACE}pre`, `${SPACE}re`, 's',
  // numbers, split the way real tokenizers split them
  '123', '456', '789', '20', '24', '19', '00', '99', '12', '50', '7',
  // punctuation and whitespace
  '.', ',', '?', '!', "'", '-', ':', '$', '%', '/', '\n', SPACE,
];

/** Ids start above the byte range, so the byte fallback below is visibly different. */
const ID_BASE = 256;
const VOCAB_ID = new Map(VOCAB.map((piece, i) => [piece, ID_BASE + i]));

interface Tok {
  text: string;
  id: number;
  /** True when no vocabulary entry matched and the tokenizer fell back to a byte. */
  fallback?: boolean;
}

/** Greedy longest match, left to right — the same shape as a real BPE encoder. */
function subword(text: string): Tok[] {
  const marked = text.replace(/ /g, SPACE);
  const out: Tok[] = [];
  let i = 0;
  const lower = marked.toLowerCase();
  while (i < marked.length) {
    let matched = '';
    for (const piece of VOCAB) {
      if (piece.length > matched.length && lower.startsWith(piece, i)) matched = piece;
    }
    if (matched) {
      out.push({ text: marked.slice(i, i + matched.length), id: VOCAB_ID.get(matched) ?? 0 });
      i += matched.length;
    } else {
      const ch = marked[i];
      out.push({ text: ch, id: ch.charCodeAt(0) % ID_BASE, fallback: true });
      i += 1;
    }
  }
  return out;
}

function whitespace(text: string): Tok[] {
  return text
    .split(/(\s+)/)
    .filter((s) => s.trim().length > 0)
    .map((w) => ({ text: w, id: (VOCAB_ID.get(SPACE + w.toLowerCase()) ?? 30000 + (hash(w) % 20000)) }));
}

function characters(text: string): Tok[] {
  return Array.from(text).map((c) => ({ text: c === ' ' ? SPACE : c, id: c.charCodeAt(0) }));
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const PRESETS: { id: string; label: string; text: string; lesson: string }[] = [
  {
    id: 'plain',
    label: 'Ordinary',
    text: 'The quick brown fox jumps over the lazy dog.',
    lesson:
      'Common English is cheap: most words are a single token, so token count tracks word count closely. This is the case people generalise from, and it is the least representative one.',
  },
  {
    id: 'rare',
    label: 'Rare word',
    text: 'Antidisestablishmentarianism is unquestionably hepatotoxic.',
    lesson:
      'Rare words are not in the vocabulary, so they shatter into fragments. Three words here cost far more than three tokens — which is why an API bill for technical or non-English text is higher than the word count suggests.',
  },
  {
    id: 'numbers',
    label: 'Numbers',
    text: 'Order 1234567 shipped on 2024-06-01 for $1,299.50',
    lesson:
      'Digits are grouped by whatever fragments the vocabulary happens to contain, so 1234567 does not split into place values and 2024 may not stay whole. The model sees arbitrary chunks, which is a large part of why arithmetic is hard for it.',
  },
  {
    id: 'letters',
    label: 'Counting letters',
    text: 'How many r s are in strawberry',
    lesson:
      'Look at the subword row: "strawberry" arrives as a couple of pieces, and the letter r never appears as anything the model can count. Asking for letter counts asks the model to recover information the tokenizer threw away.',
  },
];

const MAX_SHOWN = 140;

export default function TokenizerLab() {
  const [presetId, setPresetId] = React.useState('rare');
  const [text, setText] = React.useState(PRESETS[1].text);

  const rows = React.useMemo(
    () => [
      { key: 'sub', label: 'Subword (BPE-style)', toks: subword(text), note: 'What a language model actually reads.' },
      { key: 'ws', label: 'Whitespace', toks: whitespace(text), note: 'What a human counts as words.' },
      { key: 'ch', label: 'Character', toks: characters(text), note: 'What a spelling task would need.' },
    ],
    [text],
  );

  const sub = rows[0].toks;
  const words = rows[1].toks;
  const chars = rows[2].toks;
  const perWord = words.length ? sub.length / words.length : 0;
  const preset = PRESETS.find((p) => p.id === presetId);

  const longestWord = React.useMemo(() => {
    let best = { word: '', pieces: 0 };
    let current = { word: '', pieces: 0 };
    for (const t of sub) {
      if (t.text.startsWith(SPACE) || /\s/.test(t.text)) {
        if (current.pieces > best.pieces) best = current;
        current = { word: t.text.replace(SPACE, ''), pieces: 1 };
      } else {
        current = { word: current.word + t.text, pieces: current.pieces + 1 };
      }
    }
    return current.pieces > best.pieces ? current : best;
  }, [sub]);

  return (
    <WidgetShell
      takeaway={`Token count is not word count. Here ${words.length} words become ${sub.length} subword tokens (${perWord.toFixed(2)} per word), and "${longestWord.word || 'the longest word'}" alone costs ${longestWord.pieces} of them. Context limits, latency and price are all measured in the middle row, not the one you can read.`}
      readout={
        <Readout
          items={[
            { label: 'Subword tokens', value: String(sub.length), tone: perWord > 2 ? 'warn' : 'default' },
            { label: 'Words', value: String(words.length) },
            { label: 'Characters', value: String(chars.length) },
            { label: 'Tokens per word', value: perWord.toFixed(2), tone: perWord > 2.5 ? 'bad' : perWord > 1.6 ? 'warn' : 'good' },
            { label: 'Chars per token', value: sub.length ? (chars.length / sub.length).toFixed(2) : '0' },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Preset"
            value={presetId}
            onChange={(id) => {
              const p = PRESETS.find((x) => x.id === id);
              if (!p) return;
              setPresetId(id);
              setText(p.text);
            }}
            options={PRESETS.map((p) => ({ value: p.id, label: p.label }))}
          />
          <div>
            <label htmlFor="tokenizer-input" className="mb-1 block text-[12px] font-medium text-muted">
              Text to tokenise
            </label>
            <textarea
              id="tokenizer-input"
              value={text}
              rows={2}
              onChange={(e) => {
                setText(e.target.value);
                setPresetId('');
              }}
              className="w-full resize-y rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-ink outline-none focus:border-primary"
            />
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            {preset?.lesson ??
              'Your own text. The subword vocabulary here is small and hand-built, so unfamiliar words fragment further than a production tokenizer would — the behaviour is the same, only exaggerated.'}
          </p>
        </>
      }
    >
      <div className="divide-y divide-line">
        {rows.map((row) => {
          const shown = row.toks.slice(0, MAX_SHOWN);
          return (
            <div key={row.key} className="p-4">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">{row.label}</p>
                <span className="font-mono text-[11.5px] tabular-nums text-accent">{row.toks.length} tokens</span>
              </div>
              <div className="flex flex-wrap gap-1" role="list" aria-label={`${row.label} tokens`}>
                {shown.map((t, i) => (
                  <span
                    key={`${row.key}-${i}`}
                    role="listitem"
                    className={cn(
                      'rounded-[4px] border px-1 py-0.5 text-center',
                      t.fallback ? 'border-warning/50 bg-warning/[0.08]' : 'border-line bg-surface-2',
                    )}
                  >
                    <span className="block whitespace-pre text-[12px] leading-tight text-ink">{t.text}</span>
                    <span className="block font-mono text-[9px] leading-tight text-subtle">{t.id}</span>
                  </span>
                ))}
                {row.toks.length > MAX_SHOWN && (
                  <span className="self-center text-[11px] text-subtle">+{row.toks.length - MAX_SHOWN} more</span>
                )}
              </div>
              <p className="mt-1.5 text-[10.5px] leading-snug text-subtle">{row.note}</p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">How the three compare</p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-line text-left text-subtle">
                <th scope="col" className="py-1.5 pr-3 font-medium">Split</th>
                <th scope="col" className="py-1.5 pr-3 text-right font-medium">Count</th>
                <th scope="col" className="py-1.5 pr-3 text-right font-medium">Vocabulary needed</th>
                <th scope="col" className="py-1.5 font-medium">Trade-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <td className="py-1.5 pr-3 font-medium text-ink">Whitespace</td>
                <td className="py-1.5 pr-3 text-right tabular-nums text-muted">{words.length}</td>
                <td className="py-1.5 pr-3 text-right text-muted">millions</td>
                <td className="py-1.5 text-muted">Short sequences, but any unseen word is an unknown.</td>
              </tr>
              <tr className="bg-primary/[0.05]">
                <td className="py-1.5 pr-3 font-medium text-ink">Subword</td>
                <td className="py-1.5 pr-3 text-right tabular-nums text-muted">{sub.length}</td>
                <td className="py-1.5 pr-3 text-right text-muted">tens of thousands</td>
                <td className="py-1.5 text-muted">Nothing is unknown; rare words simply cost more tokens.</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 font-medium text-ink">Character</td>
                <td className="py-1.5 pr-3 text-right tabular-nums text-muted">{chars.length}</td>
                <td className="py-1.5 pr-3 text-right text-muted">a few hundred</td>
                <td className="py-1.5 text-muted">Spelling is visible, but sequences get long and slow.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Tokens outlined in the warning tint fell back to a single character because nothing in the vocabulary matched
          — the last resort that guarantees any text can be encoded.
        </p>
      </div>
    </WidgetShell>
  );
}
