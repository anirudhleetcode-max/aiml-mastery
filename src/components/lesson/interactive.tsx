'use client';

import * as React from 'react';
import { Check, ChevronRight, Lightbulb, RotateCw, Sparkles } from 'lucide-react';
import type { Challenge, Flashcard, LearningUnit, PracticeQuestion, QuizQuestion, TeachingPrompt } from '@/types/curriculum';
import { gradeQuestion, scoreTest, type Graded, type Response } from '@/features/testing/scoring';
import { evaluateTeaching, type TeachingEvaluation } from '@/features/teaching/evaluate';
import type { AnswerEvaluation } from '@/features/evaluation/schema';
import { EvaluationResult } from '@/components/evaluation/answer-evaluator';
import { useLearnerStore } from '@/lib/store/learner';
import { QuestionCard } from '@/components/testing/question-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/input';
import { dateKey, pct } from '@/lib/format';
import { cn } from '@/lib/cn';

/* ------------------------------------------------------------------ */
/* Practice                                                            */
/* ------------------------------------------------------------------ */

export function PracticeSection({
  unitId,
  questions,
}: {
  unitId: string;
  questions: PracticeQuestion[];
}) {
  const emit = useLearnerStore((s) => s.emit);
  const completed = useLearnerStore((s) => s.state?.units[unitId]?.practiceCompleted ?? 0);
  const [shown, setShown] = React.useState<Record<number, 'hint' | 'solution' | null>>({});
  const [done, setDone] = React.useState<Set<number>>(new Set());

  return (
    <div className="space-y-4">
      <Intro
        title="Practice"
        body="Attempt each one before opening the hint. Getting it wrong first is what makes the solution stick — reading a solution you never struggled with teaches almost nothing."
      />

      <div className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-4 py-2.5">
        <ProgressBar value={Math.min(1, completed / Math.max(1, questions.length))} className="flex-1" size="sm" label="Practice completed" />
        <span className="shrink-0 text-[12px] tabular-nums text-subtle">
          {Math.min(completed, questions.length)}/{questions.length} recorded
        </span>
      </div>

      {questions.map((q, i) => {
        const state = shown[i] ?? null;
        const isDone = done.has(i);
        return (
          <div key={i} className="rounded-xl border border-line bg-surface p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-surface-3 text-[11px] font-semibold tabular-nums text-subtle">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink">{q.prompt}</p>

                {q.starterCode && (
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-surface-2 p-3 font-mono text-[12.5px] leading-[1.7] text-muted">
                    {q.starterCode}
                  </pre>
                )}

                {state && (
                  <div
                    className={cn(
                      'mt-3 rounded-lg border p-3.5',
                      state === 'hint' ? 'border-info/25 bg-info/[0.06]' : 'border-success/25 bg-success/[0.06]',
                    )}
                  >
                    <p className={cn('text-[12px] font-semibold', state === 'hint' ? 'text-info' : 'text-success')}>
                      {state === 'hint' ? 'Hint' : 'Solution'}
                    </p>
                    <p className="mt-1.5 whitespace-pre-wrap text-[13px] leading-relaxed text-muted">
                      {state === 'hint' ? q.hint : q.solution}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {state !== 'hint' && state !== 'solution' && (
                    <Button size="sm" variant="ghost" onClick={() => setShown((s) => ({ ...s, [i]: 'hint' }))}>
                      <Lightbulb size={13} /> Hint
                    </Button>
                  )}
                  {state !== 'solution' && (
                    <Button size="sm" variant="ghost" onClick={() => setShown((s) => ({ ...s, [i]: 'solution' }))}>
                      Show solution
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant={isDone ? 'secondary' : 'subtle'}
                    disabled={isDone}
                    onClick={() => {
                      setDone((d) => new Set(d).add(i));
                      emit({ type: 'practice-completed', unitId, practiceIndex: i });
                    }}
                  >
                    {isDone ? <><Check size={13} /> Recorded</> : 'I worked this through'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quick check                                                         */
/* ------------------------------------------------------------------ */

export function QuickCheckSection({
  unitId,
  unitTitle,
  questions,
}: {
  unitId: string;
  unitTitle: string;
  questions: QuizQuestion[];
}) {
  const emit = useLearnerStore((s) => s.emit);
  const flush = useLearnerStore((s) => s.flush);
  const [responses, setResponses] = React.useState<(Response | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = React.useState<boolean[]>(() => questions.map(() => false));
  const [submitted, setSubmitted] = React.useState(false);

  const graded: Graded[] = questions.map((q, i) => gradeQuestion(q, responses[i] ?? null));
  const allRevealed = revealed.every(Boolean);
  const result = scoreTest(graded);

  function reveal(i: number) {
    setRevealed((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }

  React.useEffect(() => {
    if (!allRevealed || submitted) return;
    setSubmitted(true);
    emit({
      type: 'assessment-submitted',
      kind: 'quick-check',
      date: dateKey(),
      seconds: 0,
      answers: questions.map((q, i) => ({
        unitId,
        questionId: q.id,
        response: responses[i] ?? null,
        seconds: 0,
      })),
    });
    void flush();
  }, [allRevealed, submitted, emit, flush, questions, responses, unitId]);

  return (
    <div className="space-y-4">
      <Intro
        title="Quick check"
        body={`A few questions on ${unitTitle}, answered one at a time with the explanation straight after. This is not the daily test — it is a check that the idea landed before you move on.`}
      />

      {questions.map((q, i) => (
        <div key={q.id}>
          <QuestionCard
            question={q}
            response={responses[i] ?? null}
            onChange={(r) =>
              setResponses((prev) => {
                const next = [...prev];
                next[i] = r;
                return next;
              })
            }
            revealed={revealed[i] ?? false}
            correct={graded[i]?.correct}
            index={i}
            total={questions.length}
          />
          {!revealed[i] && (
            <div className="mt-2 flex justify-end">
              <Button size="sm" variant="secondary" disabled={responses[i] === null} onClick={() => reveal(i)}>
                Check <ChevronRight size={13} />
              </Button>
            </div>
          )}
        </div>
      ))}

      {allRevealed && (
        <div className="rounded-xl border border-line bg-surface-2 p-5 text-center">
          <p className="text-2xl font-semibold tabular-nums text-ink">{pct(result.score)}</p>
          <p className="mt-1 text-[13px] text-subtle">
            {result.correct} of {result.total} correct
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
            {result.score >= 0.7
              ? 'That is the understanding bar cleared. The full unit test raises it to 85%.'
              : 'Below the bar — worth re-reading the intuition and the visual before the unit test.'}
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flashcards                                                          */
/* ------------------------------------------------------------------ */

export function FlashcardsSection({ cards, unitTitle }: { cards: Flashcard[]; unitTitle: string }) {
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [known, setKnown] = React.useState<Set<number>>(new Set());
  const [again, setAgain] = React.useState<Set<number>>(new Set());

  const card = cards[index]!;
  const finished = known.size + again.size >= cards.length;

  function mark(kind: 'known' | 'again') {
    (kind === 'known' ? setKnown : setAgain)((s) => new Set(s).add(index));
    setFlipped(false);
    setIndex((i) => (i + 1 < cards.length ? i + 1 : i));
  }

  return (
    <div className="space-y-4">
      <Intro
        title="Flashcards"
        body={`Recall beats recognition. Try to answer out loud before flipping — the effort is what builds the memory, not the reading.`}
      />

      <div className="flex items-center gap-3">
        <ProgressBar value={(known.size + again.size) / cards.length} className="flex-1" size="sm" label="Cards reviewed" />
        <span className="shrink-0 text-[12px] tabular-nums text-subtle">
          {index + 1}/{cards.length}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? 'Show the question' : 'Show the answer'}
        className="grid min-h-56 w-full place-items-center rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-8 text-center transition-colors hover:border-line-strong"
      >
        <div>
          <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-subtle">
            {flipped ? 'Answer' : 'Question'}
          </p>
          <p className={cn('leading-relaxed', flipped ? 'text-[15px] text-muted' : 'text-[17px] font-medium text-ink')}>
            {flipped ? card.back : card.front}
          </p>
          {!flipped && <p className="mt-5 text-[12px] text-subtle">Click to flip</p>}
        </div>
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => mark('again')} disabled={!flipped}>
            <RotateCw size={13} /> Review again
          </Button>
          <Button size="sm" variant="subtle" onClick={() => mark('known')} disabled={!flipped}>
            <Check size={13} /> I knew it
          </Button>
        </div>
        <div className="flex gap-2 text-[12px] text-subtle">
          <span className="text-success">{known.size} known</span>
          <span className="text-warning">{again.size} to review</span>
        </div>
      </div>

      {finished && (
        <div className="rounded-xl border border-line bg-surface-2 p-5 text-center">
          <p className="text-[14px] font-medium text-ink">
            {known.size} of {cards.length} recalled on {unitTitle}.
          </p>
          <p className="mt-1.5 text-[13px] text-subtle">
            {again.size > 0
              ? 'The ones you flagged are worth another pass before the daily test.'
              : 'All of them. This unit is in memory, not just on the page.'}
          </p>
          <Button
            size="sm"
            variant="ghost"
            className="mt-3"
            onClick={() => {
              setKnown(new Set());
              setAgain(new Set());
              setIndex(0);
              setFlipped(false);
            }}
          >
            Run through again
          </Button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Teacher mode                                                        */
/* ------------------------------------------------------------------ */

export function TeachBackSection({ unit }: { unit: LearningUnit }) {
  const emit = useLearnerStore((s) => s.emit);
  const flush = useLearnerStore((s) => s.flush);
  const best = useLearnerStore((s) => s.state?.units[unit.id]?.teachingScore ?? null);

  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState<TeachingEvaluation | null>(null);
  const [showSample, setShowSample] = React.useState(false);
  // The optional second reading. Null while none has been asked for or when
  // no model is configured; the analysis above stands on its own either way.
  const [review, setReview] = React.useState<AnswerEvaluation | null>(null);
  const [reviewing, setReviewing] = React.useState(false);
  const [reviewFailed, setReviewFailed] = React.useState(false);

  function submit() {
    const evaluation = evaluateTeaching(unit, text);
    setResult(evaluation);
    emit({ type: 'teaching-submitted', unitId: unit.id, text });
    void flush();
  }

  /**
   * Asks for a closer reading of the same explanation.
   *
   * Deliberately a second, explicit step rather than part of submitting: the
   * points analysis is instant and is what gets recorded, and waiting on a
   * network round trip before showing it would make the fast, certain half of
   * the feedback hostage to the slow, optional half.
   */
  async function askForReview() {
    setReviewing(true);
    setReviewFailed(false);
    try {
      const res = await fetch('/api/evaluate/teaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId: unit.id, text }),
      });
      if (!res.ok) {
        setReviewFailed(true);
        return;
      }
      const data = (await res.json().catch(() => null)) as { evaluation?: AnswerEvaluation | null } | null;
      if (data?.evaluation) setReview(data.evaluation);
      else setReviewFailed(true);
    } catch {
      setReviewFailed(true);
    } finally {
      setReviewing(false);
    }
  }

  const prompt: TeachingPrompt = unit.teachingPrompt;

  return (
    <div className="space-y-4">
      <Intro
        title="Teach it back"
        body="This is the last step because it is the real one. Anyone can recognise a correct answer; explaining it without notes is what proves you understand it."
      />

      <div className="rounded-xl border border-primary/25 bg-primary/[0.05] p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-ink">The prompt</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink">{prompt.prompt}</p>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Explain it in your own words. Aim for a short paragraph — the kind of thing you would actually say out loud."
        className="min-h-48 text-[14px] leading-relaxed"
        aria-label="Your explanation"
        disabled={Boolean(result)}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[12px] text-subtle">
          {text.trim() ? `${text.trim().split(/\s+/).length} words` : 'Around 60–200 words is the sweet spot'}
          {best !== null && ` · your best here: ${pct(best)}`}
        </span>
        {result ? (
          <Button
            variant="secondary"
            onClick={() => {
              setResult(null);
              setShowSample(false);
              setReview(null);
              setReviewFailed(false);
            }}
          >
            Try again
          </Button>
        ) : (
          <Button onClick={submit} disabled={text.trim().length < 20}>
            <Sparkles size={15} /> Get feedback
          </Button>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Teaching score</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums text-ink">{pct(result.score)}</p>
              </div>
              <Badge tone={result.score >= 0.8 ? 'success' : result.score >= 0.6 ? 'info' : 'warning'}>
                {result.score >= 0.8 ? 'Teaching standard' : result.score >= 0.6 ? 'Nearly there' : 'Keep working'}
              </Badge>
            </div>

            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{result.verdict}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 sm:grid-cols-5">
              {(
                [
                  ['Coverage', result.dimensions.coverage],
                  ['Clarity', result.dimensions.clarity],
                  ['Depth', result.dimensions.depth],
                  ['Examples', result.dimensions.examples],
                  ['Terminology', result.dimensions.terminology],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] text-subtle">{label}</dt>
                  <dd className="mt-1">
                    <ProgressBar value={value} size="sm" label={label} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-success/25 bg-success/[0.05] p-4">
              <p className="text-[12px] font-semibold text-success">Covered ({result.covered.length})</p>
              <ul className="mt-2 space-y-1.5">
                {result.covered.length === 0 && <li className="text-[12.5px] text-subtle">Nothing yet.</li>}
                {result.covered.map((c) => (
                  <li key={c} className="flex gap-2 text-[12.5px] leading-relaxed text-muted">
                    <Check size={13} className="mt-0.5 shrink-0 text-success" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-warning/25 bg-warning/[0.05] p-4">
              <p className="text-[12px] font-semibold text-warning">Missing ({result.missing.length})</p>
              <ul className="mt-2 space-y-1.5">
                {result.missing.length === 0 && (
                  <li className="text-[12.5px] text-subtle">Nothing — you covered every point.</li>
                )}
                {result.missing.map((m) => (
                  <li key={m} className="flex gap-2 text-[12.5px] leading-relaxed text-muted">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-warning" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {result.improvements.length > 0 && (
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-subtle">How to make it better</p>
              <ul className="mt-2.5 space-y-2">
                {result.improvements.map((imp, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* The optional second reading. The analysis above is what was
              recorded and what mastery is computed from; this adds the
              judgement a points check cannot make. */}
          <div className="rounded-xl border border-line bg-surface p-5">
            {review ? (
              <EvaluationResult evaluation={review} />
            ) : (
              <>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-subtle">A closer reading</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  The analysis above checks which of this unit&rsquo;s points you covered. It cannot tell whether the
                  mechanism you described is right, or whether anything you stated confidently is wrong — which is the
                  part that matters most in an explanation.
                </p>
                <Button size="sm" className="mt-3" onClick={askForReview} loading={reviewing} disabled={reviewing}>
                  <Sparkles size={14} /> Read it more closely
                </Button>
                {reviewFailed && (
                  <p role="status" className="mt-3 text-[12.5px] leading-relaxed text-subtle">
                    No closer reading is available right now — either no evaluation model is configured for this
                    deployment, or it could not be reached. The feedback above is unaffected.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="rounded-xl border border-line bg-surface p-5">
            <button
              type="button"
              onClick={() => setShowSample((s) => !s)}
              aria-expanded={showSample}
              className="text-[13px] font-medium text-primary-ink hover:underline"
            >
              {showSample ? 'Hide' : 'Show'} a reference explanation
            </button>
            {showSample && (
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{prompt.sampleExplanation}</p>
            )}
            <p className="mt-3 border-t border-line pt-3 text-[11.5px] leading-relaxed text-subtle">
              This feedback is generated by checking your text against the specific points this unit says a good
              explanation covers. It measures coverage and structure, not eloquence — read the reference explanation
              and judge your own for yourself.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Challenge                                                           */
/* ------------------------------------------------------------------ */

export function ChallengeSection({ unitId, challenge }: { unitId: string; challenge: Challenge }) {
  const emit = useLearnerStore((s) => s.emit);
  const done = useLearnerStore((s) => s.state?.units[unitId]?.challengeCompleted ?? false);
  const [checked, setChecked] = React.useState<Set<number>>(new Set());

  const allChecked = checked.size === challenge.acceptanceCriteria.length;

  return (
    <div className="space-y-4">
      <Intro
        title="Challenge"
        body="Build something small that could only be built by someone who understood the unit. This is what moves you from proficient to mastered."
      />

      <div className="rounded-xl border border-line bg-surface p-5">
        <h3 className="text-[15px] font-semibold text-ink">{challenge.title}</h3>
        <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-muted">{challenge.brief}</p>

        {challenge.starterCode && (
          <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface-2 p-3.5 font-mono text-[12.5px] leading-[1.7] text-muted">
            {challenge.starterCode}
          </pre>
        )}

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-subtle">Done when</p>
          <ul className="mt-2.5 space-y-2">
            {challenge.acceptanceCriteria.map((c, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    checked={done || checked.has(i)}
                    disabled={done}
                    onChange={(e) => {
                      setChecked((s) => {
                        const next = new Set(s);
                        if (e.target.checked) next.add(i);
                        else next.delete(i);
                        return next;
                      });
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--c-primary))]"
                  />
                  {c}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          {done ? (
            <Badge tone="success">
              <Check size={11} /> Challenge complete
            </Badge>
          ) : (
            <Button
              disabled={!allChecked}
              onClick={() => emit({ type: 'challenge-completed', unitId })}
            >
              <Check size={15} /> I built it
            </Button>
          )}
          {!allChecked && !done && (
            <p className="mt-2 text-[12px] text-subtle">
              Tick every criterion once your solution genuinely meets it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Intro({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">{body}</p>
    </div>
  );
}
