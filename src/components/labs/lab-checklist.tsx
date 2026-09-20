'use client';

import * as React from 'react';
import { Check, CircleCheck } from 'lucide-react';
import type { LabStep } from '@/data/labs';
import { useLearnerStore } from '@/lib/store/learner';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress';
import { cn } from '@/lib/cn';

/**
 * The lab's investigation, as a checklist.
 *
 * Each step names a specific manipulation and the specific thing it should
 * produce, so ticking one is a claim about something observable rather than
 * about having visited the page. The widget above is the apparatus; this is
 * the protocol. Completion is only offered once every step is ticked, and the
 * server re-checks that set, so the button cannot skip the work.
 */
export function LabChecklist({
  labId,
  steps,
  initialDone,
  initiallyComplete,
}: {
  labId: string;
  steps: LabStep[];
  initialDone: number[];
  initiallyComplete: boolean;
}) {
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);
  const live = useLearnerStore((s) => s.state?.labs);

  const server = React.useMemo(() => live?.find((l) => l.labId === labId), [live, labId]);
  const done = React.useMemo(() => new Set(server?.stepsDone ?? initialDone), [server, initialDone]);
  const complete = server ? server.completedAt != null : initiallyComplete;

  const startedAt = React.useRef(Date.now());
  const allTicked = done.size >= steps.length;

  function tick(stepIndex: number) {
    if (done.has(stepIndex)) return;
    emit({ type: 'lab-step-completed', labId, stepIndex });
    patch((s) => {
      const existing = s.labs.find((l) => l.labId === labId);
      const next = [...new Set([...(existing?.stepsDone ?? []), stepIndex])].sort((a, b) => a - b);
      return {
        ...s,
        labs: [
          ...s.labs.filter((l) => l.labId !== labId),
          { labId, stepsDone: next, completedAt: existing?.completedAt ?? null, seconds: existing?.seconds ?? 0 },
        ],
      };
    });
  }

  function finish() {
    const seconds = Math.min(60 * 60 * 4, Math.round((Date.now() - startedAt.current) / 1000));
    emit({ type: 'lab-completed', labId, seconds });
    patch((s) => {
      const existing = s.labs.find((l) => l.labId === labId);
      return {
        ...s,
        labs: [
          ...s.labs.filter((l) => l.labId !== labId),
          {
            labId,
            stepsDone: existing?.stepsDone ?? [...done],
            completedAt: new Date().toISOString(),
            seconds: (existing?.seconds ?? 0) + seconds,
          },
        ],
      };
    });
  }

  return (
    <section className="rounded-xl border border-line bg-surface p-5" aria-labelledby="lab-steps-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="lab-steps-heading" className="text-[14px] font-semibold text-ink">
            The investigation
          </h2>
          <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-subtle">
            Do each step in the lab above and tick it once you have seen what it describes. The point is the
            observation, not the tick.
          </p>
        </div>
        {complete && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-success/12 px-2.5 py-1 text-[12px] font-medium text-success">
            <CircleCheck size={14} /> Completed
          </span>
        )}
      </div>

      <ProgressBar value={steps.length ? done.size / steps.length : 0} className="mt-4" label="Lab steps completed" />
      <p className="mt-1.5 text-[12px] tabular-nums text-subtle">
        {done.size} of {steps.length} steps
      </p>

      <ol className="mt-4 space-y-2.5">
        {steps.map((step, i) => {
          const ticked = done.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => tick(i)}
                aria-pressed={ticked}
                disabled={ticked}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors',
                  ticked
                    ? 'cursor-default border-success/25 bg-success/[0.06]'
                    : 'border-line bg-surface-2 hover:border-line-strong',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10.5px] font-semibold tabular-nums',
                    ticked ? 'border-success bg-success text-white' : 'border-line text-subtle',
                  )}
                >
                  {ticked ? <Check size={12} /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13.5px] font-medium leading-snug text-ink">{step.task}</span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-subtle">
                    <strong className="font-medium text-muted">You should see: </strong>
                    {step.expect}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {!complete && (
        <div className="mt-4 border-t border-line pt-4">
          <Button onClick={finish} disabled={!allTicked}>
            <CircleCheck size={14} /> Mark this lab complete
          </Button>
          {!allTicked && (
            <p className="mt-2 text-[12px] text-subtle">
              {steps.length - done.size} step{steps.length - done.size === 1 ? '' : 's'} still to work through. The
              server checks the set, so this cannot be skipped.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
