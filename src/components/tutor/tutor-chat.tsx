'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUp, Bot, Loader2, RotateCcw, User } from 'lucide-react';
import type { TutorBlock, TutorReply } from '@/features/tutor/engine';
import { gradeQuestion, type Response } from '@/features/testing/scoring';
import { QuestionCard } from '@/components/testing/question-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface Turn {
  id: string;
  role: 'learner' | 'tutor';
  text?: string;
  reply?: TutorReply;
}

export function TutorChat({
  starters,
  currentUnitId,
  currentUnitTitle,
}: {
  starters: string[];
  currentUnitId?: string;
  currentUnitTitle?: string;
}) {
  const [turns, setTurns] = React.useState<Turn[]>([]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns, busy]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setInput('');
    setBusy(true);
    setTurns((t) => [...t, { id: `l${Date.now()}`, role: 'learner', text: q }]);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, currentUnitId }),
      });
      if (!res.ok) throw new Error('request failed');
      const data = (await res.json()) as { reply: TutorReply };
      setTurns((t) => [...t, { id: `t${Date.now()}`, role: 'tutor', reply: data.reply }]);
    } catch {
      setTurns((t) => [
        ...t,
        {
          id: `e${Date.now()}`,
          role: 'tutor',
          reply: {
            intent: 'unknown',
            blocks: [
              {
                kind: 'text',
                body: 'I could not reach the server. If you are offline, the lesson pages you have already opened still work — the tutor needs a connection because it reads the whole curriculum server-side.',
              },
            ],
            suggestions: [],
          },
        },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex h-[calc(100dvh-8rem)] flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-4" role="log" aria-live="polite" aria-label="Tutor conversation">
        {turns.length === 0 && (
          <div className="rounded-xl border border-line bg-surface p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 text-primary">
              <Bot size={19} />
            </span>
            <h2 className="mt-4 text-lg font-semibold tracking-tight text-ink">
              {currentUnitTitle ? `Ask me about ${currentUnitTitle}` : 'Ask me anything in the curriculum'}
            </h2>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted">
              I answer from the 214 authored units — the same explanations, analogies, worked examples and interview
              answers you find in the lessons. I know what you have studied, what you have got wrong, and what you
              have not reached yet, so I can point you at the right thing rather than the nearest thing.
            </p>
            <p className="mt-3 max-w-2xl rounded-lg border border-line bg-surface-2 p-3 text-[12.5px] leading-relaxed text-subtle">
              To be clear about what this is: a retrieval tutor over the curriculum, not a general-purpose chatbot.
              If a concept is not in the 214 units, I will tell you rather than invent an answer — and every reply
              cites the unit it came from.
            </p>

            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Try asking</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {starters.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-left text-[12.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {turns.map((turn) =>
          turn.role === 'learner' ? (
            <div key={turn.id} className="flex justify-end gap-3">
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-primary/12 px-4 py-2.5 text-[14px] leading-relaxed text-ink">
                {turn.text}
              </p>
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-3 text-subtle">
                <User size={14} />
              </span>
            </div>
          ) : (
            <div key={turn.id} className="flex gap-3">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                <Bot size={14} />
              </span>
              <div className="min-w-0 flex-1 space-y-3">
                {turn.reply?.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}

                {turn.reply?.source && (
                  <p className="text-[11.5px] text-subtle">
                    From{' '}
                    <Link href={`/learn/${turn.reply.source.slug}`} className="text-primary hover:underline">
                      {turn.reply.source.title}
                    </Link>{' '}
                    · {turn.reply.source.domain}
                  </p>
                )}

                {turn.reply && turn.reply.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {turn.reply.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="rounded-lg border border-line px-2.5 py-1 text-[12px] text-subtle transition-colors hover:border-line-strong hover:text-ink"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        {busy && (
          <div className="flex items-center gap-3 text-[13px] text-subtle">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
              <Loader2 size={14} className="animate-spin" />
            </span>
            Looking it up…
          </div>
        )}

        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void ask(input);
        }}
        className="shrink-0 rounded-xl border border-line bg-surface p-2"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void ask(input);
              }
            }}
            rows={1}
            maxLength={500}
            placeholder={currentUnitTitle ? `Ask about ${currentUnitTitle}…` : 'Ask about any concept, or about your progress…'}
            aria-label="Ask the tutor"
            className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-[14px] text-ink outline-none placeholder:text-subtle"
          />
          <div className="flex items-center gap-1">
            {turns.length > 0 && (
              <button
                type="button"
                onClick={() => setTurns([])}
                aria-label="Clear conversation"
                className="grid h-9 w-9 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <RotateCcw size={15} />
              </button>
            )}
            <Button type="submit" size="icon" disabled={!input.trim() || busy} aria-label="Send question">
              <ArrowUp size={16} />
            </Button>
          </div>
        </div>
      </form>
      <p className="mt-2 shrink-0 text-center text-[11px] text-subtle">
        Answers are composed from authored curriculum content. Press Enter to send, Shift+Enter for a new line.
      </p>
    </div>
  );
}

function Block({ block }: { block: TutorBlock }) {
  switch (block.kind) {
    case 'text':
      return <p className="text-[14px] leading-relaxed text-muted">{block.body}</p>;

    case 'callout': {
      const tones = {
        info: 'border-info/25 bg-info/[0.06] text-info',
        accent: 'border-accent/25 bg-accent/[0.05] text-accent',
        warning: 'border-warning/25 bg-warning/[0.06] text-warning',
      } as const;
      return (
        <div className={cn('rounded-xl border p-3.5', tones[block.tone])}>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.1em]">{block.label}</p>
          <p className="mt-1.5 whitespace-pre-line text-[13.5px] leading-relaxed text-muted">{block.body}</p>
        </div>
      );
    }

    case 'list':
      return block.ordered ? (
        <ol className="space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-surface-3 text-[10px] font-semibold tabular-nums text-subtle">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'mapping':
      return (
        <div className="grid gap-1.5 rounded-xl border border-line bg-surface-2 p-3.5 sm:grid-cols-2">
          {block.items.map((m) => (
            <div key={m.from} className="flex items-center gap-2 text-[12.5px]">
              <span className="text-subtle">{m.from}</span>
              <span className="shrink-0 text-accent">→</span>
              <span className="font-medium text-ink">{m.to}</span>
            </div>
          ))}
        </div>
      );

    case 'math':
      return (
        <div className="rounded-xl border border-line bg-surface-2 p-4">
          <p className="text-[13px] font-semibold text-ink">{block.name}</p>
          <pre className="my-2.5 overflow-x-auto rounded-lg bg-surface px-3 py-2.5 text-center font-mono text-[13px] text-accent">
            {block.latex}
          </pre>
          <p className="text-[13px] leading-relaxed text-muted">{block.meaning}</p>
          <dl className="mt-2.5 space-y-1 border-t border-line pt-2.5">
            {block.variables.map((v) => (
              <div key={v.symbol} className="flex gap-3 text-[12.5px]">
                <dt className="min-w-10 shrink-0 text-right font-mono text-accent">{v.symbol}</dt>
                <dd className="text-subtle">{v.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case 'code':
      return (
        <div className="overflow-hidden rounded-xl border border-line bg-surface-2">
          <div className="border-b border-line px-3 py-1.5">
            <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[10.5px] uppercase text-subtle">
              {block.language}
            </span>
          </div>
          <pre className="overflow-x-auto p-3.5 font-mono text-[12.5px] leading-[1.7] text-muted">{block.code}</pre>
          {block.output && (
            <div className="border-t border-line bg-surface/60 px-3.5 py-2.5">
              <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-subtle">Output</p>
              <pre className="overflow-x-auto font-mono text-[12.5px] text-muted">{block.output}</pre>
            </div>
          )}
          <p className="border-t border-line px-3.5 py-2.5 text-[12.5px] leading-relaxed text-muted">
            {block.explanation}
          </p>
        </div>
      );

    case 'units':
      return (
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">{block.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {block.units.map((u) => (
              <Link
                key={u.id}
                href={`/learn/${u.slug}`}
                className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                {u.title}
                <span className="ml-1.5 text-subtle/70">{u.domain}</span>
              </Link>
            ))}
          </div>
        </div>
      );

    case 'quiz':
      return <InlineQuiz block={block} />;
  }
}

function InlineQuiz({ block }: { block: Extract<TutorBlock, { kind: 'quiz' }> }) {
  const [response, setResponse] = React.useState<Response | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  const graded = gradeQuestion(block.question, response);

  return (
    <div>
      <QuestionCard
        question={block.question}
        response={response}
        onChange={setResponse}
        revealed={revealed}
        correct={graded.correct}
        index={0}
        total={1}
      />
      {!revealed && (
        <div className="mt-2 flex justify-end">
          <Button size="sm" variant="secondary" disabled={response === null} onClick={() => setRevealed(true)}>
            Check answer
          </Button>
        </div>
      )}
    </div>
  );
}
