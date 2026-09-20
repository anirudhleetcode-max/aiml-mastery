'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Flag } from 'lucide-react';
import type { QuizQuestion } from '@/types/curriculum';
import type { AssessmentKind } from '@/types/progress';
import { gradeQuestion, grade, scoreTest, type Graded, type Response } from '@/features/testing/scoring';
import { useLearnerStore } from '@/lib/store/learner';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { dateKey, formatDuration, pct } from '@/lib/format';
import { QuestionCard } from './question-card';
import { cn } from '@/lib/cn';

export interface RunnableTest {
  kind: AssessmentKind;
  title: string;
  description: string;
  questions: { question: QuizQuestion; unitId: string; unitTitle: string; unitSlug: string }[];
  suggestedMinutes: number;
}

type Mode = 'immediate' | 'end';

/**
 * The assessment runner.
 *
 * Grading happens locally so feedback is instant, but the result that counts
 * is the one the server computes from the submitted answers — the client
 * never reports its own score. The submission is queued through the offline
 * queue, so finishing a test on a dropped connection still counts.
 */
export function TestRunner({
  test,
  mode = 'immediate',
  backHref = '/tests',
}: {
  test: RunnableTest;
  /** `immediate` explains each answer as it is given; `end` withholds until submission. */
  mode?: Mode;
  backHref?: string;
}) {
  const router = useRouter();
  const emit = useLearnerStore((s) => s.emit);
  const flush = useLearnerStore((s) => s.flush);

  const [index, setIndex] = React.useState(0);
  const [responses, setResponses] = React.useState<(Response | null)[]>(() => test.questions.map(() => null));
  const [revealed, setRevealed] = React.useState<boolean[]>(() => test.questions.map(() => false));
  const [finished, setFinished] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);

  const startedAt = React.useRef(Date.now());
  const questionStart = React.useRef(Date.now());
  const perQuestionSeconds = React.useRef<number[]>(test.questions.map(() => 0));

  React.useEffect(() => {
    const t = setInterval(() => setElapsed(Math.round((Date.now() - startedAt.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  // Guard against losing a test to a stray refresh.
  React.useEffect(() => {
    if (finished) return;
    const answered = responses.some((r) => r !== null);
    if (!answered) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [finished, responses]);

  const current = test.questions[index]!;
  const total = test.questions.length;
  const answeredCount = responses.filter((r) => r !== null).length;

  const graded: Graded[] = React.useMemo(
    () => test.questions.map((q, i) => gradeQuestion(q.question, responses[i] ?? null)),
    [test.questions, responses],
  );

  function recordTime() {
    const seconds = Math.round((Date.now() - questionStart.current) / 1000);
    perQuestionSeconds.current[index] = (perQuestionSeconds.current[index] ?? 0) + seconds;
    questionStart.current = Date.now();
  }

  function setResponse(r: Response) {
    setResponses((prev) => {
      const next = [...prev];
      next[index] = r;
      return next;
    });
  }

  function reveal() {
    setRevealed((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  function go(delta: number) {
    recordTime();
    setIndex((i) => Math.max(0, Math.min(total - 1, i + delta)));
  }

  async function submit() {
    recordTime();
    setSubmitting(true);

    emit({
      type: 'assessment-submitted',
      kind: test.kind as 'quick-check' | 'daily-test' | 'unit-test' | 'review' | 'domain-exam' | 'final-assessment' | 'diagnostic',
      date: dateKey(),
      seconds: Math.round((Date.now() - startedAt.current) / 1000),
      answers: test.questions.map((q, i) => ({
        unitId: q.unitId,
        questionId: q.question.id,
        response: responses[i] ?? null,
        seconds: perQuestionSeconds.current[i] ?? 0,
      })),
    });

    setFinished(true);
    setSubmitting(false);
    // Best-effort immediate sync; if it fails the queue keeps it safe.
    void flush({ force: true });
    router.refresh();
  }

  if (finished) {
    return <Results test={test} graded={graded} seconds={elapsed} backHref={backHref} />;
  }

  const isRevealed = revealed[index] ?? false;
  const hasResponse = responses[index] !== null;
  const allAnswered = answeredCount === total;
  const isLast = index === total - 1;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-ink">{test.title}</h1>
            <p className="mt-1 text-[13px] leading-relaxed text-subtle">{test.description}</p>
          </div>
          <div className="flex items-center gap-2 text-[12.5px] tabular-nums text-subtle">
            <Clock size={13} />
            {formatDuration(elapsed)}
            <span className="text-subtle/60">/ ~{test.suggestedMinutes}m</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ProgressBar value={answeredCount / total} className="flex-1" label="Questions answered" />
          <span className="shrink-0 text-[12px] tabular-nums text-subtle">
            {answeredCount}/{total}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1" role="tablist" aria-label="Jump to question">
          {test.questions.map((_, i) => {
            const answered = responses[i] !== null;
            const done = revealed[i];
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Question ${i + 1}${answered ? ', answered' : ', unanswered'}`}
                onClick={() => {
                  recordTime();
                  setIndex(i);
                }}
                className={cn(
                  'h-1.5 flex-1 min-w-3 rounded-full transition-colors',
                  i === index
                    ? 'bg-primary'
                    : done && mode === 'immediate'
                      ? graded[i]?.correct
                        ? 'bg-success/70'
                        : 'bg-danger/60'
                      : answered
                        ? 'bg-primary/40'
                        : 'bg-surface-3',
                )}
              />
            );
          })}
        </div>
      </div>

      <QuestionCard
        question={current.question}
        response={responses[index] ?? null}
        onChange={setResponse}
        revealed={mode === 'immediate' && isRevealed}
        correct={graded[index]?.correct}
        index={index}
        total={total}
      />

      <p className="mt-2 text-right text-[11.5px] text-subtle">
        From{' '}
        <Link href={`/learn/${current.unitSlug}`} className="hover:text-primary hover:underline">
          {current.unitTitle}
        </Link>
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => go(-1)} disabled={index === 0}>
          <ArrowLeft size={15} /> Previous
        </Button>

        <div className="flex items-center gap-2">
          {mode === 'immediate' && !isRevealed && (
            <Button variant="secondary" onClick={reveal} disabled={!hasResponse}>
              Check answer
            </Button>
          )}
          {!isLast ? (
            <Button onClick={() => go(1)} disabled={mode === 'immediate' && !isRevealed && !hasResponse}>
              Next <ArrowRight size={15} />
            </Button>
          ) : (
            <Button onClick={submit} loading={submitting} disabled={!allAnswered}>
              <Flag size={15} /> Finish test
            </Button>
          )}
        </div>
      </div>

      {!allAnswered && isLast && (
        <p className="mt-3 text-right text-[12px] text-warning">
          {total - answeredCount} question{total - answeredCount === 1 ? '' : 's'} still unanswered.
        </p>
      )}
    </div>
  );
}

function Results({
  test,
  graded,
  seconds,
  backHref,
}: {
  test: RunnableTest;
  graded: Graded[];
  seconds: number;
  backHref: string;
}) {
  const result = scoreTest(graded);
  const g = grade(result.score);
  const wrong = graded.map((x, i) => ({ ...x, i })).filter((x) => !x.correct);

  const byUnit = new Map<string, { title: string; slug: string; correct: number; total: number }>();
  test.questions.forEach((q, i) => {
    const entry = byUnit.get(q.unitId) ?? { title: q.unitTitle, slug: q.unitSlug, correct: 0, total: 0 };
    entry.total += 1;
    if (graded[i]?.correct) entry.correct += 1;
    byUnit.set(q.unitId, entry);
  });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl border border-line bg-surface p-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">{test.title}</p>
        <p className="mt-3 text-5xl font-semibold tabular-nums text-ink">{pct(result.score)}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Badge tone={g.tone}>{g.letter} · {g.label}</Badge>
          <span className="text-[12.5px] text-subtle">
            {result.correct} of {result.total} · {formatDuration(seconds)}
          </span>
        </div>
        <ProgressBar value={result.score} className="mx-auto mt-5 max-w-sm" size="lg" label="Test score" />
        <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-muted">
          {result.score >= 0.9
            ? 'That is a proficient score. This material is holding.'
            : result.score >= 0.7
              ? 'Above the understanding bar. The misses below are worth five minutes each.'
              : 'Below the understanding bar — which is information, not a verdict. The explanations below are the actual lesson.'}
        </p>
      </div>

      {byUnit.size > 1 && (
        <div className="mt-4 rounded-xl border border-line bg-surface p-5">
          <h2 className="text-[14px] font-semibold text-ink">By unit</h2>
          <ul className="mt-3 space-y-2">
            {[...byUnit.entries()].map(([id, u]) => (
              <li key={id} className="flex items-center gap-3">
                <Link href={`/learn/${u.slug}`} className="min-w-0 flex-1 truncate text-[13px] text-ink hover:text-primary">
                  {u.title}
                </Link>
                <ProgressBar value={u.correct / u.total} className="w-24 shrink-0" size="sm" label={`${u.title} score`} />
                <span className="w-12 shrink-0 text-right text-[12px] tabular-nums text-subtle">
                  {u.correct}/{u.total}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {wrong.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-3 text-[14px] font-semibold text-ink">
            {wrong.length} to review — saved to your mistake notebook
          </h2>
          <div className="space-y-3">
            {wrong.map((w) => {
              const q = test.questions[w.i]!;
              return (
                <div key={w.i} className="rounded-xl border border-line bg-surface p-5">
                  <p className="text-[14px] font-medium leading-relaxed text-ink">{q.question.prompt}</p>
                  <dl className="mt-3 space-y-1.5 text-[13px]">
                    <div className="flex gap-2">
                      <dt className="shrink-0 text-subtle">You said</dt>
                      <dd className="text-danger">{w.yourAnswerText}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 text-subtle">Correct</dt>
                      <dd className="text-success">{w.correctAnswerText}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-muted">
                    {q.question.explanation}
                  </p>
                  <Link
                    href={`/learn/${q.unitSlug}`}
                    className="mt-3 inline-block text-[12.5px] font-medium text-primary hover:underline"
                  >
                    Revisit {q.unitTitle} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href={backHref}>
          <Button>Back to tests</Button>
        </Link>
        <Link href="/mistakes">
          <Button variant="secondary">Open mistake notebook</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
