'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import type { QuizQuestion } from '@/types/curriculum';
import type { Response } from '@/features/testing/scoring';
import { Textarea } from '@/components/ui/input';
import { cn } from '@/lib/cn';

/**
 * Renders any of the ten question types with an appropriate input.
 *
 * `revealed` switches the card from answering to explaining: the correct
 * option is marked, the learner's wrong choice is marked, and the
 * explanation is shown. The spec is explicit that an incorrect answer is
 * explained immediately, not banked for a report at the end.
 */
export function QuestionCard({
  question,
  response,
  onChange,
  revealed,
  correct,
  disabled,
  index,
  total,
  codeHtml,
}: {
  question: QuizQuestion;
  response: Response | null;
  onChange: (r: Response) => void;
  revealed: boolean;
  correct?: boolean;
  disabled?: boolean;
  index: number;
  total: number;
  /** Server-highlighted code, when the question carries a snippet. */
  codeHtml?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">
          Question {index + 1} of {total}
        </span>
        <span className="rounded bg-surface-3 px-1.5 py-0.5 text-[10.5px] uppercase tracking-wide text-subtle">
          {TYPE_LABELS[question.type]}
        </span>
      </div>

      <p className="text-[15px] font-medium leading-relaxed text-ink">{question.prompt}</p>

      {'code' in question && question.code && (
        <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-surface-2 p-3.5 text-[12.5px] leading-[1.7]">
          <code
            className="font-mono"
            {...(codeHtml
              ? { dangerouslySetInnerHTML: { __html: codeHtml } }
              : { children: question.code })}
          />
        </pre>
      )}

      <div className="mt-4">
        <Body
          question={question}
          response={response}
          onChange={onChange}
          revealed={revealed}
          disabled={disabled}
        />
      </div>

      {revealed && (
        <div
          className={cn(
            'mt-4 rounded-lg border p-3.5',
            correct ? 'border-success/25 bg-success/[0.06]' : 'border-warning/25 bg-warning/[0.06]',
          )}
        >
          <p className={cn('flex items-center gap-1.5 text-[12.5px] font-semibold', correct ? 'text-success' : 'text-warning')}>
            {correct ? <Check size={14} /> : <X size={14} />}
            {correct ? 'Correct' : 'Not quite'}
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{question.explanation}</p>
          {question.type === 'explain' && (
            <details className="mt-3">
              <summary className="cursor-pointer text-[12.5px] font-medium text-primary">
                Show a strong answer
              </summary>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{question.sampleAnswer}</p>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

const TYPE_LABELS: Record<QuizQuestion['type'], string> = {
  mcq: 'Multiple choice',
  multi: 'Select all that apply',
  truefalse: 'True or false',
  fill: 'Fill in the blank',
  numeric: 'Numerical',
  'code-output': 'Code output',
  debug: 'Debugging',
  order: 'Put in order',
  match: 'Matching',
  explain: 'Explain it',
};

function Body({
  question,
  response,
  onChange,
  revealed,
  disabled,
}: {
  question: QuizQuestion;
  response: Response | null;
  onChange: (r: Response) => void;
  revealed: boolean;
  disabled?: boolean;
}) {
  const locked = revealed || disabled;

  switch (question.type) {
    case 'mcq':
    case 'code-output':
    case 'debug': {
      const picked = response?.kind === 'choice' ? response.index : -1;
      return (
        <ul className="space-y-2" role="radiogroup" aria-label="Answer options">
          {question.options.map((option, i) => {
            const isAnswer = i === question.answerIndex;
            const isPicked = i === picked;
            return (
              <li key={i}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isPicked}
                  disabled={locked}
                  onClick={() => onChange({ kind: 'choice', index: i })}
                  className={cn(optionClass(isPicked, revealed, isAnswer), 'w-full text-left')}
                >
                  <span className={markerClass(isPicked, revealed, isAnswer)}>
                    {revealed && isAnswer ? <Check size={11} strokeWidth={3} /> : String.fromCharCode(65 + i)}
                  </span>
                  <span className="min-w-0 flex-1 text-[13.5px] leading-relaxed">{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      );
    }

    case 'multi': {
      const picked = new Set(response?.kind === 'choices' ? response.indices : []);
      const answers = new Set(question.answerIndices);
      return (
        <ul className="space-y-2">
          {question.options.map((option, i) => {
            const isPicked = picked.has(i);
            const isAnswer = answers.has(i);
            return (
              <li key={i}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={isPicked}
                  disabled={locked}
                  onClick={() => {
                    const next = new Set(picked);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    onChange({ kind: 'choices', indices: [...next] });
                  }}
                  className={cn(optionClass(isPicked, revealed, isAnswer), 'w-full text-left')}
                >
                  <span className={cn(markerClass(isPicked, revealed, isAnswer), 'rounded-md')}>
                    {isPicked || (revealed && isAnswer) ? <Check size={11} strokeWidth={3} /> : ''}
                  </span>
                  <span className="min-w-0 flex-1 text-[13.5px] leading-relaxed">{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      );
    }

    case 'truefalse': {
      const picked = response?.kind === 'boolean' ? response.value : null;
      return (
        <div className="flex gap-2">
          {[true, false].map((value) => {
            const isPicked = picked === value;
            const isAnswer = question.answer === value;
            return (
              <button
                key={String(value)}
                type="button"
                role="radio"
                aria-checked={isPicked}
                disabled={locked}
                onClick={() => onChange({ kind: 'boolean', value })}
                className={cn(optionClass(isPicked, revealed, isAnswer), 'flex-1 justify-center')}
              >
                <span className="text-[13.5px] font-medium">{value ? 'True' : 'False'}</span>
              </button>
            );
          })}
        </div>
      );
    }

    case 'fill':
      return (
        <input
          type="text"
          disabled={locked}
          value={response?.kind === 'text' ? response.value : ''}
          onChange={(e) => onChange({ kind: 'text', value: e.target.value })}
          placeholder="Type your answer"
          aria-label="Your answer"
          className="h-11 w-full max-w-md rounded-lg border border-line bg-surface-2 px-3.5 font-mono text-[14px] text-ink placeholder:font-sans placeholder:text-subtle focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-70"
        />
      );

    case 'numeric':
      return (
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="any"
            disabled={locked}
            value={response?.kind === 'number' && Number.isFinite(response.value) ? response.value : ''}
            onChange={(e) => onChange({ kind: 'number', value: Number(e.target.value) })}
            placeholder="0"
            aria-label="Your numeric answer"
            className="h-11 w-40 rounded-lg border border-line bg-surface-2 px-3.5 font-mono text-[14px] tabular-nums text-ink focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-70"
          />
          {question.unit && <span className="text-[13px] text-subtle">{question.unit}</span>}
        </div>
      );

    case 'order': {
      const order = response?.kind === 'order' ? response.order : question.items.map((_, i) => i);
      const move = (from: number, to: number) => {
        if (to < 0 || to >= order.length) return;
        const next = [...order];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item!);
        onChange({ kind: 'order', order: next });
      };
      return (
        <ol className="space-y-1.5">
          {order.map((itemIndex, position) => (
            <li
              key={itemIndex}
              className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2"
            >
              <span className="w-5 shrink-0 text-[12px] font-semibold tabular-nums text-subtle">{position + 1}</span>
              <span className="min-w-0 flex-1 text-[13px] text-ink">{question.items[itemIndex]}</span>
              <span className="flex shrink-0 gap-0.5">
                <button
                  type="button"
                  disabled={locked || position === 0}
                  onClick={() => move(position, position - 1)}
                  aria-label={`Move "${question.items[itemIndex]}" up`}
                  className="grid h-6 w-6 place-items-center rounded text-subtle hover:bg-surface-3 hover:text-ink disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={locked || position === order.length - 1}
                  onClick={() => move(position, position + 1)}
                  aria-label={`Move "${question.items[itemIndex]}" down`}
                  className="grid h-6 w-6 place-items-center rounded text-subtle hover:bg-surface-3 hover:text-ink disabled:opacity-30"
                >
                  ↓
                </button>
              </span>
            </li>
          ))}
        </ol>
      );
    }

    case 'match': {
      const pairs = response?.kind === 'match' ? response.pairs : {};
      const rights = [...question.pairs.map((p) => p.right)].sort();
      return (
        <ul className="space-y-2">
          {question.pairs.map((pair) => {
            const chosen = pairs[pair.left] ?? '';
            const isRight = revealed && chosen === pair.right;
            return (
              <li key={pair.left} className="flex flex-wrap items-center gap-2">
                <span className="min-w-36 flex-1 text-[13px] text-ink">{pair.left}</span>
                <select
                  disabled={locked}
                  value={chosen}
                  aria-label={`Match for ${pair.left}`}
                  onChange={(e) => onChange({ kind: 'match', pairs: { ...pairs, [pair.left]: e.target.value } })}
                  className={cn(
                    'h-9 min-w-44 flex-1 rounded-lg border bg-surface-2 px-2.5 text-[13px] text-ink',
                    revealed ? (isRight ? 'border-success/50' : 'border-warning/50') : 'border-line',
                  )}
                >
                  <option value="">Choose…</option>
                  {rights.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {revealed && !isRight && <span className="text-[12px] text-success">→ {pair.right}</span>}
              </li>
            );
          })}
        </ul>
      );
    }

    case 'explain':
      return (
        <div>
          <Textarea
            disabled={locked}
            value={response?.kind === 'text' ? response.value : ''}
            onChange={(e) => onChange({ kind: 'text', value: e.target.value })}
            placeholder="Explain in your own words. A few sentences is plenty."
            aria-label="Your explanation"
            className="min-h-32"
          />
          <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
            Graded against {question.rubric.length} specific points. You will be told which ones you covered.
          </p>
        </div>
      );
  }
}

function optionClass(picked: boolean, revealed: boolean, isAnswer: boolean): string {
  return cn(
    'flex items-center gap-3 rounded-lg border px-3.5 py-3 transition-colors',
    !revealed && !picked && 'border-line hover:border-line-strong hover:bg-surface-2',
    !revealed && picked && 'border-primary/50 bg-primary/8',
    revealed && isAnswer && 'border-success/45 bg-success/[0.07]',
    revealed && picked && !isAnswer && 'border-danger/45 bg-danger/[0.06]',
    revealed && !picked && !isAnswer && 'border-line opacity-60',
    'disabled:cursor-default',
  );
}

function markerClass(picked: boolean, revealed: boolean, isAnswer: boolean): string {
  return cn(
    'grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-semibold',
    !revealed && picked && 'border-primary bg-primary text-on-primary',
    !revealed && !picked && 'border-line-strong text-subtle',
    revealed && isAnswer && 'border-success bg-success text-white',
    revealed && picked && !isAnswer && 'border-danger bg-danger text-white',
    revealed && !picked && !isAnswer && 'border-line-strong text-subtle',
  );
}
