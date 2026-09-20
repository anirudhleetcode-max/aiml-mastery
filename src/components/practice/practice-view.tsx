'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Hammer, Lightbulb } from 'lucide-react';
import type { DomainId } from '@/types/curriculum';
import { domainColor } from '@/data/domains';
import { useLearnerStore } from '@/lib/store/learner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, Switch } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress';
import { EmptyState, SectionHeading } from '@/components/ui/misc';

export interface PracticeQuestionRow {
  prompt: string;
  hint: string;
  solution: string;
  starterCode?: string;
}

export interface PracticeUnit {
  unitId: string;
  title: string;
  slug: string;
  domainId: DomainId;
  domainName: string;
  weak: boolean;
  practiceCompleted: number;
  challengeCompleted: boolean;
  questions: PracticeQuestionRow[];
  challenge: { title: string; brief: string; acceptanceCriteria: string[] } | null;
}

/**
 * Practice across every unit the learner has opened.
 *
 * Recording an exercise is a self-report, exactly as it is inside a lesson:
 * the server counts how many were worked through, never which ones, so this
 * view mirrors that and keeps the per-question state local.
 */
export function PracticeView({
  units,
  domains,
}: {
  units: PracticeUnit[];
  domains: { id: DomainId; name: string }[];
}) {
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);
  const liveUnits = useLearnerStore((s) => s.state?.units);

  const [domain, setDomain] = React.useState<string>('all');
  const [weakOnly, setWeakOnly] = React.useState(false);
  const [done, setDone] = React.useState<Set<string>>(new Set());

  const recordedFor = React.useCallback(
    (u: PracticeUnit) => Math.min(liveUnits?.[u.unitId]?.practiceCompleted ?? u.practiceCompleted, u.questions.length),
    [liveUnits],
  );

  const totals = React.useMemo(() => {
    let recorded = 0;
    let available = 0;
    for (const u of units) {
      recorded += recordedFor(u);
      available += u.questions.length;
    }
    return { recorded, available };
  }, [units, recordedFor]);

  const filtered = React.useMemo(
    () =>
      units.filter((u) => {
        if (domain !== 'all' && u.domainId !== domain) return false;
        if (weakOnly && !u.weak) return false;
        return u.questions.length > 0;
      }),
    [units, domain, weakOnly],
  );

  const challenges = React.useMemo(
    () =>
      units.filter((u) => {
        if (!u.challenge) return false;
        if (domain !== 'all' && u.domainId !== domain) return false;
        if (weakOnly && !u.weak) return false;
        return true;
      }),
    [units, domain, weakOnly],
  );

  function record(unit: PracticeUnit, index: number) {
    const key = `${unit.unitId}:${index}`;
    if (done.has(key)) return;
    setDone((s) => new Set(s).add(key));
    emit({ type: 'practice-completed', unitId: unit.unitId, practiceIndex: index });
    patch((s) => {
      const row = s.units[unit.unitId];
      if (!row) return s;
      return {
        ...s,
        units: {
          ...s.units,
          [unit.unitId]: {
            ...row,
            practiceCompleted: Math.min(unit.questions.length, row.practiceCompleted + 1),
          },
        },
      };
    });
  }

  const domainSelectId = React.useId();

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <ProgressBar
            value={totals.available ? totals.recorded / totals.available : 0}
            className="min-w-40 flex-1"
            label="Practice recorded"
          />
          <span className="shrink-0 text-[12.5px] tabular-nums text-subtle">
            {totals.recorded}/{totals.available} recorded
          </span>
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-subtle">
          Counted across the {units.length} unit{units.length === 1 ? '' : 's'} you have started. Two recorded
          exercises in a unit is what moves it to Practiced.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-line bg-surface p-4">
        <div className="flex min-w-48 flex-1 items-center gap-2">
          <label htmlFor={domainSelectId} className="shrink-0 text-[12.5px] font-medium text-ink">
            Domain
          </label>
          <Select id={domainSelectId} value={domain} onChange={(e) => setDomain(e.target.value)} className="h-9">
            <option value="all">All domains</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </div>
        <Switch
          checked={weakOnly}
          onChange={setWeakOnly}
          label="Units I am weak on"
          description="Units where a recent score fell short, or that you flagged as difficult."
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing matches those filters"
          body="Widen the domain, or turn off the weak-units filter to see everything you have started."
        />
      ) : (
        <div className="space-y-6">
          {filtered.map((unit) => (
            <section key={unit.unitId} aria-label={`Practice for ${unit.title}`}>
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: domainColor(unit.domainId) }}
                  aria-hidden
                />
                <Link
                  href={`/learn/${unit.slug}`}
                  className="text-[13.5px] font-semibold text-ink hover:text-primary-ink hover:underline"
                >
                  {unit.title}
                </Link>
                <span className="text-[11.5px] text-subtle">{unit.domainName}</span>
                {unit.weak && <Badge tone="warning">Weak</Badge>}
                <span className="ml-auto text-[11.5px] tabular-nums text-subtle">
                  {recordedFor(unit)}/{unit.questions.length} recorded
                </span>
              </div>
              <ul className="space-y-3">
                {unit.questions.map((q, i) => (
                  <li key={i}>
                    <QuestionCard
                      question={q}
                      index={i}
                      recorded={done.has(`${unit.unitId}:${i}`)}
                      onRecord={() => record(unit, i)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {challenges.length > 0 && (
        <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          <SectionHeading
            as="h2"
            title="Build something"
            description="Each started unit ends with a challenge: a small thing to build rather than a question to answer. This is where practice becomes something you could show someone."
            className="mb-4"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {challenges.map((unit) => (
              <article
                key={unit.unitId}
                className="flex h-full flex-col rounded-xl border border-line bg-surface-2 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent">
                    <Hammer size={15} />
                  </span>
                  {unit.challengeCompleted && <Badge tone="success">Done</Badge>}
                </div>
                <h3 className="mt-3 text-[13.5px] font-semibold text-ink">{unit.challenge!.title}</h3>
                <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-subtle">{unit.challenge!.brief}</p>
                {unit.challenge!.acceptanceCriteria.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {unit.challenge!.acceptanceCriteria.slice(0, 3).map((c) => (
                      <li key={c} className="flex gap-2 text-[12px] leading-relaxed text-muted">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/learn/${unit.slug}#challenge`}
                  className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-primary-ink hover:underline"
                >
                  Open the challenge in {unit.title}
                  <ArrowRight size={12} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  index,
  recorded,
  onRecord,
}: {
  question: PracticeQuestionRow;
  index: number;
  recorded: boolean;
  onRecord: () => void;
}) {
  const [hint, setHint] = React.useState(false);
  const [solution, setSolution] = React.useState(false);
  const hintId = React.useId();
  const solutionId = React.useId();

  return (
    <article className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-surface-3 text-[11px] font-semibold tabular-nums text-subtle">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink">{question.prompt}</p>

          {question.starterCode && (
            <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-surface-2 p-3 font-mono text-[12.5px] leading-[1.7] text-muted">
              {question.starterCode}
            </pre>
          )}

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              aria-expanded={hint}
              aria-controls={hintId}
              onClick={() => setHint((h) => !h)}
            >
              <Lightbulb size={13} /> {hint ? 'Hide hint' : 'Hint'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              aria-expanded={solution}
              aria-controls={solutionId}
              onClick={() => setSolution((s) => !s)}
            >
              {solution ? 'Hide solution' : 'Solution'}
            </Button>
            <Button
              size="sm"
              variant={recorded ? 'ghost' : 'subtle'}
              disabled={recorded}
              onClick={onRecord}
              className="ml-auto"
            >
              <Check size={13} /> {recorded ? 'Recorded' : 'I worked this through'}
            </Button>
          </div>

          <div id={hintId} hidden={!hint} className="mt-3 rounded-lg border border-warning/25 bg-warning/[0.06] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-warning">Hint</p>
            <p className="mt-1 whitespace-pre-wrap text-[13px] leading-relaxed text-muted">{question.hint}</p>
          </div>

          <div id={solutionId} hidden={!solution} className="mt-3 rounded-lg border border-line bg-surface-2 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Solution</p>
            <p className="mt-1 whitespace-pre-wrap text-[13px] leading-relaxed text-muted">{question.solution}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
