'use client';

import * as React from 'react';
import { PlayButton, Readout, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * A pipeline run, and the argument for every gate in it.
 *
 * A CI/CD diagram is a row of boxes that always pass, which teaches nothing:
 * the reason a pipeline is shaped the way it is only becomes visible when a
 * stage fails. So here every stage can be made to fail, and when one does the
 * run stops exactly where it would in a real system — with the stages after it
 * marked skipped, and a panel saying what that gate was protecting and what it
 * costs to ship without it.
 *
 * The ordering is the second lesson. The stages are arranged cheapest first,
 * and the readout names how long it took to find the failure against how long
 * the same failure would have taken if the gate sat at the end. A ten-second
 * lint failure found after a seven-minute training run is not a different
 * outcome; it is the same outcome, paid for at four hundred times the price.
 */

interface Stage {
  id: string;
  label: string;
  seconds: number;
  /** Shown while the stage runs. */
  doing: string;
  /** The failure message a real runner would print. */
  failure: string;
  why: string;
  cost: string;
  /** Percentage of production traffic exposed once this stage completes. */
  traffic?: number;
}

const STAGES: Stage[] = [
  {
    id: 'lint',
    label: 'Lint',
    seconds: 12,
    doing: 'ruff check . — style, unused imports, obvious mistakes',
    failure: 'F821 undefined name "reuslts" — app/scoring.py:41',
    why: 'It is the cheapest possible check, so it goes first. Style consistency is the least of it: linters catch undefined names and unreachable code that would otherwise surface as a runtime error in production.',
    cost: 'Twelve seconds here, or a NameError at 3am in a path that only runs for refunds.',
  },
  {
    id: 'types',
    label: 'Typecheck',
    seconds: 25,
    doing: 'mypy app/ — signatures, None handling, dataframe contracts',
    failure: 'error: Argument 1 to "predict" has incompatible type "list[str]"; expected "ndarray"',
    why: 'Types are the only check here that reads every branch, including the ones no test covers. In ML code the common catch is a column that is sometimes a string and sometimes a float.',
    cost: 'A whole class of production errors that tests miss because nobody wrote a test for that combination of arguments.',
  },
  {
    id: 'unit',
    label: 'Unit tests',
    seconds: 95,
    doing: 'pytest tests/unit — 214 tests over transforms and scoring logic',
    failure: 'FAILED tests/unit/test_features.py::test_age_buckets — expected 5 buckets, got 4',
    why: 'Unit tests pin the behaviour of the transforms that sit between raw data and the model. They are the only fast check that runs your actual feature code.',
    cost: 'A silently changed feature definition. The model still trains, still scores well offline, and quietly means something different in production.',
  },
  {
    id: 'data',
    label: 'Data tests',
    seconds: 40,
    doing: 'great_expectations checkpoint run — schema, ranges, null rates, row counts',
    failure: 'Expectation failed: column "price_usd" — 31% null, expected at most 2%',
    why: 'The gate that has no equivalent in ordinary software. Code can be perfect while the data it is fed has changed units, changed nullability, or arrived half-written.',
    cost: 'Training on corrupt data. Every downstream metric looks fine, because the metrics are computed on the same corrupt data.',
  },
  {
    id: 'train',
    label: 'Train + evaluate',
    seconds: 420,
    doing: 'Fitting on the current snapshot, scoring on the held-out split, logging to the tracking server',
    failure: 'Run failed: CUDA out of memory after 3 epochs',
    why: 'The expensive stage, which is why four cheap gates run before it. It produces a candidate model and its metrics, and it logs the data version and the code version alongside them.',
    cost: 'Not a gate so much as the work itself — but running it before the cheap checks is what turns a typo into a seven-minute round trip.',
  },
  {
    id: 'gate',
    label: 'Performance gate',
    seconds: 15,
    doing: 'Comparing candidate AUC 0.881 against production 0.887 and the -0.5% tolerance',
    failure: 'Candidate AUC 0.862 is 2.8% below production 0.887 — blocking promotion',
    why: 'The model-specific gate: a new model ships only if it beats the one already serving, on the same slices, by more than noise. It also checks per-segment metrics, so an overall gain that hides a regression for one group is caught.',
    cost: 'Shipping a worse model with a green pipeline. Nothing else in CI/CD knows what "worse" means for a model, so without this gate every training run is a promotion.',
  },
  {
    id: 'build',
    label: 'Build image',
    seconds: 150,
    doing: 'docker build, pinning the model artifact and its signature into the image',
    failure: 'Build failed: pip could not resolve torch==2.4.1 with cuda 12.1 on this base image',
    why: 'The model and the code that serves it are versioned together, in one artifact, so the thing tested is the thing deployed.',
    cost: 'A model file and a serving image that drift apart, and a preprocessing mismatch nobody can reproduce locally.',
  },
  {
    id: 'canary',
    label: 'Deploy canary',
    seconds: 300,
    doing: 'Routing 5% of traffic to the new image, watching latency, error rate and prediction distribution',
    failure: 'Canary aborted: prediction mean shifted from 0.23 to 0.61 within 4 minutes — rolling back',
    why: 'The first contact with real traffic, at a blast radius you choose. Offline evaluation cannot see serving skew, cold caches or a feature service that returns defaults under load.',
    cost: 'Every deployment becomes an experiment on 100% of users, discovered through a support ticket instead of a metric.',
    traffic: 5,
  },
  {
    id: 'full',
    label: 'Deploy 100%',
    seconds: 120,
    doing: 'Shifting the remaining traffic, keeping the previous version warm for rollback',
    failure: 'Rollout halted at 60%: p99 latency 840 ms exceeds the 500 ms budget',
    why: 'A progressive rollout with the old version still running, so rollback is a routing change rather than a rebuild.',
    cost: 'A full-fleet deploy with no way back except a fresh build — minutes of outage instead of seconds.',
    traffic: 100,
  },
];

const TOTAL = STAGES.reduce((s, x) => s + x.seconds, 0);
const START = STAGES.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + STAGES[i - 1].seconds);
  return acc;
}, []);

type Status = 'pending' | 'running' | 'passed' | 'failed' | 'skipped';

function fmtDuration(s: number): string {
  return s >= 60 ? `${Math.floor(s / 60)}m ${String(Math.round(s % 60)).padStart(2, '0')}s` : `${Math.round(s)}s`;
}

export default function CiCdFlow() {
  const reduced = usePrefersReducedMotion();
  const [failing, setFailing] = React.useState<string[]>([]);
  const [elapsed, setElapsed] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  const firstFailIndex = STAGES.findIndex((s) => failing.includes(s.id));
  /** Where the run ends: the end of the failing stage, or the end of the pipeline. */
  const runEnd = firstFailIndex === -1 ? TOTAL : START[firstFailIndex] + STAGES[firstFailIndex].seconds;

  React.useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(() => {
      setElapsed((e) => {
        const next = e + 14;
        if (next >= runEnd) {
          setPlaying(false);
          return runEnd;
        }
        return next;
      });
    }, 60);
    return () => window.clearInterval(id);
  }, [playing, reduced, runEnd]);

  // Rewind whenever the failure set changes — the previous run no longer applies.
  React.useEffect(() => {
    setElapsed(0);
    setPlaying(false);
  }, [failing]);

  const statusOf = (i: number): Status => {
    const s = STAGES[i];
    const start = START[i];
    const end = start + s.seconds;
    if (firstFailIndex !== -1 && i > firstFailIndex && elapsed >= runEnd) return 'skipped';
    if (elapsed <= start) return 'pending';
    if (elapsed < end) return 'running';
    return failing.includes(s.id) ? 'failed' : 'passed';
  };

  const runningIndex = STAGES.findIndex((_, i) => statusOf(i) === 'running');
  const failedIndex = STAGES.findIndex((_, i) => statusOf(i) === 'failed');
  const finished = elapsed >= runEnd;
  const detailId = selected ?? (failedIndex !== -1 ? STAGES[failedIndex].id : runningIndex !== -1 ? STAGES[runningIndex].id : STAGES[0].id);
  const detail = STAGES.find((s) => s.id === detailId) as Stage;
  const detailIndex = STAGES.indexOf(detail);

  /** How much production traffic the new version is actually serving right now. */
  const canaryIndex = STAGES.findIndex((s) => s.id === 'canary');
  const fullIndex = STAGES.findIndex((s) => s.id === 'full');
  const liveTraffic =
    statusOf(fullIndex) === 'passed' ? 100 : statusOf(canaryIndex) === 'passed' ? (STAGES[canaryIndex].traffic ?? 0) : 0;

  const feedbackTime = failedIndex !== -1 ? START[failedIndex] + STAGES[failedIndex].seconds : null;
  /** What the same failure would have cost if this gate ran last instead of where it is. */
  const ifLast = failedIndex !== -1 ? TOTAL : null;

  const toggleFail = (id: string) =>
    setFailing((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const statusStyle: Record<Status, { dot: string; text: string; bar: string; word: string }> = {
    pending: { dot: 'bg-surface-3', text: 'text-subtle', bar: 'bg-surface-3', word: 'queued' },
    running: { dot: 'bg-accent', text: 'text-ink', bar: 'bg-accent', word: 'running' },
    passed: { dot: 'bg-success', text: 'text-muted', bar: 'bg-success', word: 'passed' },
    failed: { dot: 'bg-danger', text: 'text-ink', bar: 'bg-danger', word: 'failed' },
    skipped: { dot: 'bg-surface-3', text: 'text-subtle', bar: 'bg-surface-3', word: 'skipped' },
  };

  return (
    <WidgetShell
      takeaway="Gates are ordered by what they cost, not by what they check. Fail the lint stage and the run ends in twelve seconds; move that same failure behind training and it costs nineteen minutes of compute to learn the same thing — and a pipeline with no performance gate will happily promote a model that is worse than the one already serving."
      readout={
        <Readout
          items={[
            { label: 'Elapsed', value: fmtDuration(elapsed) },
            {
              label: 'Result',
              value: !finished ? 'running' : failedIndex !== -1 ? `failed at ${STAGES[failedIndex].label.toLowerCase()}` : 'deployed',
              tone: !finished ? 'default' : failedIndex !== -1 ? 'bad' : 'good',
            },
            { label: 'Traffic on the new version', value: `${liveTraffic}%`, tone: liveTraffic > 0 ? 'good' : 'default' },
            ...(feedbackTime !== null && ifLast !== null
              ? [{ label: 'Same failure, gate last', value: fmtDuration(ifLast), tone: 'warn' as const }]
              : []),
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <PlayButton
              playing={playing}
              onToggle={() => {
                // Motion reduced: run the pipeline to its stopping point without animating it.
                if (reduced) {
                  setElapsed(runEnd);
                  return;
                }
                if (finished) setElapsed(0);
                setPlaying((p) => !p);
              }}
              onStep={() => {
                setPlaying(false);
                const nextBoundary = START.concat(runEnd).find((t) => t > elapsed + 0.001);
                setElapsed(Math.min(runEnd, nextBoundary ?? runEnd));
              }}
              onReset={() => {
                setPlaying(false);
                setElapsed(0);
              }}
              label="the pipeline run"
            />
            {reduced && (
              <span className="text-[11px] text-subtle">
                Motion reduced — Play jumps to the end of the run; Step advances one stage.
              </span>
            )}
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">Make a stage fail</p>
            <div className="flex flex-wrap gap-1">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={failing.includes(s.id)}
                  onClick={() => toggleFail(s.id)}
                  className={cn(
                    'rounded-md border px-2 py-1 text-[11px] transition-colors',
                    failing.includes(s.id)
                      ? 'border-danger bg-danger/10 text-ink'
                      : 'border-line bg-surface-2 text-subtle hover:text-ink',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[11px] text-subtle">
              Only the first failing stage matters — everything after it is never reached, which is the point of a
              pipeline rather than a checklist.
            </p>
          </div>
        </>
      }
    >
      <div className="space-y-1 p-3">
        {STAGES.map((s, i) => {
          const status = statusOf(i);
          const style = statusStyle[status];
          const start = START[i];
          const progress =
            status === 'passed' || status === 'failed' ? 1 : status === 'running' ? (elapsed - start) / s.seconds : 0;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={detailId === s.id}
              onClick={() => setSelected(s.id)}
              className={cn(
                'w-full rounded-md border px-2 py-1.5 text-left transition-colors',
                detailId === s.id ? 'border-primary/60 bg-primary/[0.06]' : 'border-transparent hover:border-line',
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn('h-2 w-2 shrink-0 rounded-full', style.dot)} />
                <span className={cn('min-w-0 flex-1 truncate text-[12px] font-medium', style.text)}>{s.label}</span>
                {s.traffic !== undefined && status === 'passed' && (
                  <span className="shrink-0 rounded bg-success/15 px-1 text-[9.5px] font-medium text-success">
                    {s.traffic}% traffic
                  </span>
                )}
                <span className="shrink-0 text-[10px] text-subtle">{style.word}</span>
                <span className="w-10 shrink-0 text-right font-mono text-[10px] tabular-nums text-subtle">
                  {fmtDuration(s.seconds)}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className={cn('h-full rounded-full', style.bar, !reduced && 'transition-[width] duration-100')}
                  style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
                />
              </div>
              {status === 'running' && <p className="mt-1 text-[10.5px] leading-snug text-subtle">{s.doing}</p>}
              {status === 'failed' && (
                <p className="mt-1 font-mono text-[10px] leading-snug text-danger">{s.failure}</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-line p-4">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-[13px] font-semibold text-ink">{detail.label}</h3>
          <span className="font-mono text-[10.5px] text-subtle">
            stage {detailIndex + 1} of {STAGES.length} · {fmtDuration(detail.seconds)} · starts at{' '}
            {fmtDuration(START[detailIndex])}
          </span>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-subtle">Why this gate exists</p>
          <p className="text-[11.5px] leading-relaxed text-muted">{detail.why}</p>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-subtle">What shipping without it costs</p>
          <p className="text-[11.5px] leading-relaxed text-muted">{detail.cost}</p>
        </div>
        {failedIndex !== -1 && finished && (
          <p className="rounded-md border border-danger/40 bg-danger/[0.07] px-2 py-1.5 text-[11.5px] leading-relaxed text-ink">
            The run stopped at {STAGES[failedIndex].label.toLowerCase()} after {fmtDuration(feedbackTime ?? 0)}, and the{' '}
            {STAGES.length - failedIndex - 1} stages after it never ran. Nothing reached production: traffic stayed on
            the previous version for the whole run.{' '}
            {failedIndex <= 3
              ? `Because this gate is cheap and runs early, the failure cost ${fmtDuration(feedbackTime ?? 0)} instead of the ${fmtDuration(TOTAL)} a full pipeline takes.`
              : 'This one had to run after training, so the feedback was expensive — which is the argument for catching everything catchable before the expensive stage.'}
          </p>
        )}
        {finished && failedIndex === -1 && (
          <p className="rounded-md border border-success/40 bg-success/[0.07] px-2 py-1.5 text-[11.5px] leading-relaxed text-ink">
            Every gate passed in {fmtDuration(TOTAL)} and the new model now serves 100% of traffic, with the previous
            version still warm. A green pipeline is not a promise that the model is good — it is a record that a
            specific set of checks, each of which you chose, did not object.
          </p>
        )}
      </div>
    </WidgetShell>
  );
}
