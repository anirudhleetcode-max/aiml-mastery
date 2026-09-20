'use client';

import * as React from 'react';
import { AlertTriangle, CircleCheck, Loader2, Sparkles, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AnswerEvaluation } from '@/features/evaluation/schema';

/**
 * Optional written evaluation of a typed answer.
 *
 * It is a study aid, not a grade of record. The learner's own verdict — the
 * confidence buttons on an interview question, the known/again buttons on a
 * card — is still what the platform stores and still what readiness and
 * scheduling are computed from. This panel adds a second opinion beside that,
 * clearly attributed, and says so when the second opinion came from a keyword
 * check rather than a model.
 *
 * Nothing here blocks anything. The request is fired on demand, the rest of
 * the page stays interactive while it runs, and a failure renders as the
 * deterministic result with a note rather than as an error that costs the
 * learner their place in the session.
 */

type State =
  | { phase: 'idle' }
  | { phase: 'running' }
  | { phase: 'done'; evaluation: AnswerEvaluation }
  | { phase: 'failed'; message: string };

export interface AnswerEvaluatorProps {
  endpoint: string;
  /** Identifies the item on the server. Never carries the question text. */
  body: Record<string, string | number>;
  label: string;
  placeholder: string;
  /** Rendered under the result, for the caller's own follow-up controls. */
  children?: (evaluation: AnswerEvaluation) => React.ReactNode;
  onEvaluated?: (evaluation: AnswerEvaluation) => void;
}

const MAX_CHARS = 6_000;

const DEGRADED_NOTE: Record<NonNullable<AnswerEvaluation['degraded']>, string> = {
  unavailable: 'No evaluation model is configured, so this is a concept check against the reference answer.',
  timeout: 'The evaluation model took too long, so this is the concept check instead.',
  'rate-limited': 'The evaluation model is busy, so this is the concept check instead.',
  error: 'The evaluation model could not be reached, so this is the concept check instead.',
  'invalid-output': 'The evaluation model returned something unusable, so this is the concept check instead.',
};

export function AnswerEvaluator({
  endpoint,
  body,
  label,
  placeholder,
  children,
  onEvaluated,
}: AnswerEvaluatorProps) {
  const fieldId = React.useId();
  const [answer, setAnswer] = React.useState('');
  const [state, setState] = React.useState<State>({ phase: 'idle' });
  const abort = React.useRef<AbortController | null>(null);

  // A learner who moves to the next question mid-request should not have the
  // previous answer's verdict land on it.
  const key = JSON.stringify(body);
  React.useEffect(() => {
    abort.current?.abort();
    abort.current = null;
    setAnswer('');
    setState({ phase: 'idle' });
  }, [key]);

  React.useEffect(() => () => abort.current?.abort(), []);

  async function evaluate() {
    const text = answer.trim();
    if (!text) return;

    abort.current?.abort();
    const controller = new AbortController();
    abort.current = controller;
    setState({ phase: 'running' });

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, answer: text.slice(0, MAX_CHARS) }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        setState({ phase: 'failed', message: 'Evaluating a bit fast — give it a minute and try again.' });
        return;
      }
      if (!res.ok) {
        setState({ phase: 'failed', message: 'That could not be evaluated. Your answer is still here.' });
        return;
      }

      const data = (await res.json()) as { evaluation?: AnswerEvaluation };
      if (!data.evaluation) {
        setState({ phase: 'failed', message: 'That could not be evaluated. Your answer is still here.' });
        return;
      }
      setState({ phase: 'done', evaluation: data.evaluation });
      onEvaluated?.(data.evaluation);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setState({ phase: 'failed', message: 'That could not be evaluated. Your answer is still here.' });
    }
  }

  const running = state.phase === 'running';

  return (
    <div className="space-y-3">
      <label className="block text-[12.5px] font-medium text-ink" htmlFor={fieldId}>
        {label}
      </label>
      <textarea
        id={fieldId}
        value={answer}
        onChange={(e) => setAnswer(e.target.value.slice(0, MAX_CHARS))}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-y rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13.5px] leading-relaxed text-ink placeholder:text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={evaluate} disabled={running || answer.trim().length === 0}>
          {running ? <Loader2 size={14} className="animate-spin" /> : <WandSparkles size={14} />}
          {running ? 'Evaluating…' : 'Evaluate my answer'}
        </Button>
        {running && (
          <button
            type="button"
            onClick={() => {
              abort.current?.abort();
              setState({ phase: 'idle' });
            }}
            className="text-[12.5px] text-subtle underline-offset-2 hover:text-ink hover:underline"
          >
            Cancel
          </button>
        )}
        <span className="text-[11.5px] tabular-nums text-subtle">
          {answer.length}/{MAX_CHARS}
        </span>
      </div>

      {state.phase === 'failed' && (
        <p role="status" className="flex items-start gap-2 rounded-lg border border-warning/25 bg-warning/[0.07] p-3 text-[12.5px] text-ink">
          <AlertTriangle size={14} className="mt-px shrink-0 text-warning" />
          {state.message}
        </p>
      )}

      {state.phase === 'done' && (
        <>
          <EvaluationResult evaluation={state.evaluation} />
          {children?.(state.evaluation)}
        </>
      )}
    </div>
  );
}

const BANDS: { min: number; label: string; tone: string }[] = [
  { min: 80, label: 'Strong', tone: 'text-success' },
  { min: 60, label: 'Solid', tone: 'text-primary-ink' },
  { min: 35, label: 'Partial', tone: 'text-warning' },
  { min: 0, label: 'Thin', tone: 'text-danger' },
];

export function EvaluationResult({ evaluation }: { evaluation: AnswerEvaluation }) {
  const band = BANDS.find((b) => evaluation.scores.overall >= b.min)!;

  return (
    <div role="status" className="space-y-3 rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">
          {evaluation.source === 'ai' ? <Sparkles size={12} /> : <CircleCheck size={12} />}
          {evaluation.source === 'ai' ? 'AI evaluation' : 'Concept check'}
        </p>
        <p className={`text-[13px] font-semibold tabular-nums ${band.tone}`}>
          {band.label} · {evaluation.scores.overall}/100
        </p>
      </div>

      <p className="text-[13.5px] leading-relaxed text-muted">{evaluation.summary}</p>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
        {(
          [
            ['Correctness', evaluation.scores.correctness],
            ['Completeness', evaluation.scores.completeness],
            ['Depth', evaluation.scores.technicalDepth],
            ['Clarity', evaluation.scores.clarity],
          ] as const
        ).map(([name, value]) => (
          <div key={name}>
            <dt className="text-[11px] text-subtle">{name}</dt>
            <dd className="text-[13px] font-medium tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      {evaluation.coveredConcepts.length > 0 && (
        <ConceptList title="You covered" items={evaluation.coveredConcepts} tone="border-success/30 text-success" />
      )}
      {evaluation.missingConcepts.length > 0 && (
        <ConceptList title="Not mentioned" items={evaluation.missingConcepts} tone="border-line text-muted" />
      )}
      {evaluation.misconceptions.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Worth re-checking</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed text-muted">
            {evaluation.misconceptions.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-[12.5px] leading-relaxed text-muted">
        <strong className="text-ink">Next time: </strong>
        {evaluation.suggestedImprovement}
      </p>
      <p className="border-t border-line pt-3 text-[12.5px] leading-relaxed text-subtle">
        <strong className="text-ink">They would then ask: </strong>
        {evaluation.followUpQuestion}
      </p>

      {evaluation.degraded && (
        <p className="text-[11.5px] leading-relaxed text-subtle">{DEGRADED_NOTE[evaluation.degraded]}</p>
      )}
      <p className="text-[11.5px] leading-relaxed text-subtle">
        This is feedback, not a mark. Your own verdict below is what gets recorded.
      </p>
    </div>
  );
}

function ConceptList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">{title}</p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className={`rounded-full border px-2 py-0.5 text-[11.5px] ${tone}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
