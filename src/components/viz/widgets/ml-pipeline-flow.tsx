'use client';

import * as React from 'react';
import { Readout, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * The lifecycle, drawn as the loop it actually is.
 *
 * Two things get lost when this diagram is printed in a book. The first is that
 * it does not end: monitoring detects drift and feeds retraining, so "deploy"
 * is a point on a circle rather than the finish line. The second is that the
 * arrows carry all the risk. A pipeline whose boxes are all correct and whose
 * arrows are drawn slightly wrong produces a model with a beautiful validation
 * score and no predictive power — which is why this widget has a leakage mode
 * that draws those wrong arrows explicitly, with the score gap they cause.
 *
 * Clicking a stage gives the same three facts for each: what happens there,
 * what usually goes wrong, and which tool people reach for.
 */

const NW = 96;
const NH = 40;
const HGAP = 12;
const VGAP = 24;
const X0 = 18;
const Y0 = 8;
const VB_W = 336;
const VB_H = Y0 + 4 * NH + 3 * VGAP + 12;

interface Stage {
  id: string;
  label: string;
  col: 0 | 1 | 2;
  row: 0 | 1 | 2 | 3;
  what: string;
  wrong: string;
  tool: string;
}

/** Snake order: left to right, then down and back, so every arrow is short. */
const STAGES: Stage[] = [
  {
    id: 'raw', label: 'Raw data', col: 0, row: 0,
    what: 'Events, exports and third-party files land somewhere durable, with the timestamp they arrived and the timestamp they describe kept separate.',
    wrong: 'The two timestamps get conflated, and a feature quietly starts using information that was not available at prediction time.',
    tool: 'S3 or GCS, Kafka, Airbyte',
  },
  {
    id: 'validate', label: 'Validate', col: 1, row: 0,
    what: 'Schema, types, ranges, null rates and row counts are asserted before anything downstream runs. Failures stop the pipeline rather than propagating.',
    wrong: 'There is no validation, so an upstream team changes a unit from dollars to cents and the model silently retrains on nonsense.',
    tool: 'Great Expectations, Pandera, dbt tests',
  },
  {
    id: 'clean', label: 'Clean', col: 2, row: 0,
    what: 'Deduplicate, fix obvious corruption, decide what a missing value means. Every decision is recorded so it can be reapplied identically at serving time.',
    wrong: 'Cleaning rules live in a notebook and never make it into the serving path, so training and production see different data.',
    tool: 'pandas, Polars, Spark',
  },
  {
    id: 'split', label: 'Split', col: 2, row: 1,
    what: 'Separate train, validation and test — by time if the problem is temporal, by group if rows share an entity. This happens before any fitting.',
    wrong: 'A random split on data with repeated users or overlapping time windows puts near-copies of test rows into training.',
    tool: 'scikit-learn: TimeSeriesSplit, GroupKFold',
  },
  {
    id: 'features', label: 'Features', col: 1, row: 1,
    what: 'Scaling, encoding, aggregates and embeddings — fitted on the training split only, then applied to the others.',
    wrong: 'The classic leak: a scaler or target encoder fitted on all the data before the split. Validation scores rise and production does not.',
    tool: 'scikit-learn Pipeline, Feast, dbt',
  },
  {
    id: 'train', label: 'Train', col: 0, row: 1,
    what: 'Fit the model on the training split, logging the data version, the code version, the hyperparameters and the seed.',
    wrong: 'A run that cannot be reproduced. Six weeks later nobody can say which data produced the model in production.',
    tool: 'scikit-learn, PyTorch, XGBoost, MLflow',
  },
  {
    id: 'evaluate', label: 'Evaluate', col: 0, row: 2,
    what: 'Score on held-out data against a baseline, sliced by segment, with the metric that matches the business cost of each error type.',
    wrong: 'Reporting accuracy on an imbalanced problem, where predicting the majority class scores 98% and helps nobody.',
    tool: 'scikit-learn metrics, Evidently',
  },
  {
    id: 'tune', label: 'Tune', col: 1, row: 2,
    what: 'Search hyperparameters against the validation split, then confirm the winner once on the untouched test split.',
    wrong: 'Tuning against the test set. After two hundred trials the test score is a training score wearing a disguise.',
    tool: 'Optuna, Ray Tune',
  },
  {
    id: 'register', label: 'Register', col: 2, row: 2,
    what: 'Store the model as a versioned artifact with its metrics, its data lineage and its signature — the contract of input names, types and shapes.',
    wrong: 'The artifact is a pickle file on one engineer’s laptop, with no record of the library versions it was created with.',
    tool: 'MLflow Model Registry, W&B Artifacts',
  },
  {
    id: 'deploy', label: 'Deploy', col: 2, row: 3,
    what: 'Ship the artifact behind an interface — batch job, online endpoint or embedded library — usually to a small slice of traffic first.',
    wrong: 'The serving code re-implements preprocessing by hand, so training and serving disagree in ways no test catches.',
    tool: 'Docker, FastAPI, KServe, SageMaker',
  },
  {
    id: 'monitor', label: 'Monitor', col: 1, row: 3,
    what: 'Watch inputs for drift, outputs for distribution shift, and — once labels arrive — the actual metric. Alert on all three separately.',
    wrong: 'Only infrastructure is monitored. Latency and error rate look perfect while the predictions slowly stop being right.',
    tool: 'Evidently, Prometheus, WhyLabs',
  },
  {
    id: 'retrain', label: 'Retrain', col: 0, row: 3,
    what: 'Drift or a metric drop triggers the loop again, on fresher data, through exactly the same validated path.',
    wrong: 'Retraining is a manual afternoon that happens when someone complains, so the model is always as stale as the last complaint.',
    tool: 'Airflow, Dagster, Kubeflow Pipelines',
  },
];

const BY_ID = new Map(STAGES.map((s) => [s.id, s]));
const px = (s: Stage) => ({ x: X0 + s.col * (NW + HGAP), y: Y0 + s.row * (NH + VGAP) });
const centre = (s: Stage) => {
  const p = px(s);
  return { cx: p.x + NW / 2, cy: p.y + NH / 2 };
};

interface Leak {
  id: string;
  title: string;
  from: string;
  to: string;
  stages: string[];
  detail: string;
  offline: string;
  online: string;
  fix: string;
}

const LEAKS: Leak[] = [
  {
    id: 'scaler',
    title: 'Scaler fitted before the split',
    from: 'clean',
    to: 'features',
    stages: ['clean', 'features', 'split'],
    detail:
      'StandardScaler().fit_transform(X) is called on the whole frame, and only then is the data split. The mean and standard deviation the scaler learned were computed from rows that are now in the test set, so every test row was transformed using a statistic that knew about it.',
    offline: '0.94',
    online: '0.71',
    fix: 'Put the scaler inside a Pipeline and fit the Pipeline on the training split only. The transform then travels with the model to production.',
  },
  {
    id: 'resample',
    title: 'Oversampling before the split',
    from: 'clean',
    to: 'train',
    stages: ['clean', 'train', 'split'],
    detail:
      'SMOTE runs on the full dataset, inventing minority rows by interpolating between neighbours. The split then scatters synthetic rows and the originals they were built from across train and test, so the test set contains near-duplicates of training rows.',
    offline: '0.97',
    online: '0.63',
    fix: 'Resample inside the cross-validation fold, after the split, and never touch the test set with it.',
  },
  {
    id: 'testtune',
    title: 'Tuning against the test set',
    from: 'tune',
    to: 'evaluate',
    stages: ['tune', 'evaluate'],
    detail:
      'Each trial is scored on the test split and the best one is reported. No single run cheats, but selecting the maximum over two hundred noisy scores is itself a form of fitting — the reported number is the luckiest sample, not an estimate of future performance.',
    offline: '0.91',
    online: '0.84',
    fix: 'Tune on a validation split and touch the test split once, at the end, for a number you are prepared to publish.',
  },
];

export default function MlPipelineFlow() {
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = React.useState<'clean' | 'leak'>('clean');
  const [selectedStage, setSelectedStage] = React.useState('split');
  const [selectedLeak, setSelectedLeak] = React.useState(LEAKS[0].id);

  const stage = BY_ID.get(selectedStage) ?? STAGES[0];
  const leak = LEAKS.find((l) => l.id === selectedLeak) ?? LEAKS[0];
  const leakMode = mode === 'leak';
  const highlighted = leakMode ? new Set(leak.stages) : new Set<string>();

  /** The straight arrows that follow the snake order. */
  const arrows = React.useMemo(() => {
    const out: { key: string; d: string }[] = [];
    for (let i = 0; i < STAGES.length - 1; i++) {
      const a = STAGES[i];
      const b = STAGES[i + 1];
      const pa = px(a);
      const pb = px(b);
      if (a.row === b.row) {
        const goingRight = b.col > a.col;
        const x1 = goingRight ? pa.x + NW : pa.x;
        const x2 = goingRight ? pb.x - 5 : pb.x + NW + 5;
        out.push({ key: `${a.id}-${b.id}`, d: `M ${x1} ${pa.y + NH / 2} L ${x2} ${pb.y + NH / 2}` });
      } else {
        out.push({
          key: `${a.id}-${b.id}`,
          d: `M ${pa.x + NW / 2} ${pa.y + NH} L ${pb.x + NW / 2} ${pb.y - 5}`,
        });
      }
    }
    return out;
  }, []);

  const retrain = px(BY_ID.get('retrain') as Stage);
  const train = px(BY_ID.get('train') as Stage);
  const loopPath = `M ${retrain.x} ${retrain.y + NH / 2} L 7 ${retrain.y + NH / 2} L 7 ${train.y + NH / 2} L ${train.x - 5} ${train.y + NH / 2}`;

  const leakPath = (l: Leak): string => {
    const a = BY_ID.get(l.from) as Stage;
    const b = BY_ID.get(l.to) as Stage;
    if (l.id === 'testtune') {
      // A back edge drawn under the row, so it cannot be confused with the forward arrow.
      const ca = centre(a);
      const cb = centre(b);
      const y = px(a).y + NH + 10;
      return `M ${ca.cx} ${px(a).y + NH} L ${ca.cx} ${y} L ${cb.cx} ${y} L ${cb.cx} ${px(b).y + NH + 5}`;
    }
    const pa = px(a);
    const pb = px(b);
    return `M ${pa.x + NW / 2} ${pa.y + NH} L ${pb.x + NW / 2} ${pb.y - 5}`;
  };

  return (
    <WidgetShell
      takeaway="The boxes are the easy part. Leakage is an arrow drawn one step too early — a statistic computed before the split — and it does not announce itself: the offline score goes up, which is exactly the signal a team uses to decide it is ready to ship."
      readout={
        <Readout
          items={
            leakMode
              ? [
                  { label: 'Leak', value: leak.title.split(' ').slice(0, 2).join(' ') },
                  { label: 'Offline AUC', value: leak.offline, tone: 'good' },
                  { label: 'Production AUC', value: leak.online, tone: 'bad' },
                  { label: 'Gap', value: (Number(leak.offline) - Number(leak.online)).toFixed(2), tone: 'warn' },
                ]
              : [
                  { label: 'Stage', value: stage.label },
                  { label: 'Position', value: `${STAGES.indexOf(stage) + 1} of ${STAGES.length}` },
                  { label: 'Tool', value: stage.tool.split(',')[0] },
                ]
          }
        />
      }
      controls={
        <>
          <Toggle
            label="View"
            value={mode}
            onChange={(v) => setMode(v as 'clean' | 'leak')}
            options={[
              { value: 'clean', label: 'The pipeline' },
              { value: 'leak', label: 'Data leakage' },
            ]}
          />
          {leakMode ? (
            <div>
              <p className="mb-1 text-[12px] font-medium text-muted">Wrongly drawn arrow</p>
              <div className="flex flex-wrap gap-1">
                {LEAKS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={l.id === selectedLeak}
                    onClick={() => setSelectedLeak(l.id)}
                    className={cn(
                      'rounded-md border px-2 py-1 text-[11px] transition-colors',
                      l.id === selectedLeak
                        ? 'border-danger bg-danger/10 text-ink'
                        : 'border-line bg-surface-2 text-subtle hover:text-ink',
                    )}
                  >
                    {l.title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-1 text-[12px] font-medium text-muted">Stage</p>
              <div className="flex flex-wrap gap-1">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={s.id === selectedStage}
                    onClick={() => setSelectedStage(s.id)}
                    className={cn(
                      'rounded-md border px-2 py-1 text-[11px] transition-colors',
                      s.id === selectedStage
                        ? 'border-primary bg-primary/10 text-ink'
                        : 'border-line bg-surface-2 text-subtle hover:text-ink',
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <div className="p-3">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="block w-full"
          role="img"
          aria-label="The machine learning lifecycle: raw data, validate, clean, split, features, train, evaluate, tune, register, deploy, monitor, and a retrain loop back to training"
        >
          <defs>
            <marker id="mlp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--viz-axis)" />
            </marker>
            <marker id="mlp-arrow-bad" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(var(--c-danger))" />
            </marker>
          </defs>

          {arrows.map((a) => (
            <path
              key={a.key}
              d={a.d}
              fill="none"
              stroke="var(--viz-axis)"
              strokeWidth={1.2}
              markerEnd="url(#mlp-arrow)"
              opacity={leakMode ? 0.35 : 0.8}
            />
          ))}

          {/* The loop that makes it a lifecycle. */}
          <path
            d={loopPath}
            fill="none"
            stroke="var(--viz-cat-learning)"
            strokeWidth={1.2}
            strokeDasharray="4 3"
            markerEnd="url(#mlp-arrow)"
            opacity={leakMode ? 0.3 : 0.9}
          />
          <text
            x={13}
            y={(retrain.y + train.y) / 2 + NH / 2}
            fill="var(--viz-cat-learning)"
            fontSize={8.5}
            textAnchor="middle"
            transform={`rotate(-90 13 ${(retrain.y + train.y) / 2 + NH / 2})`}
          >
            drift detected
          </text>

          {leakMode &&
            LEAKS.map((l) => (
              <path
                key={l.id}
                d={leakPath(l)}
                fill="none"
                stroke="hsl(var(--c-danger))"
                strokeWidth={l.id === selectedLeak ? 1.8 : 1}
                strokeDasharray="3 3"
                markerEnd="url(#mlp-arrow-bad)"
                opacity={l.id === selectedLeak ? 1 : 0.28}
              />
            ))}

          {STAGES.map((s) => {
            const p = px(s);
            const active = !leakMode && s.id === selectedStage;
            const flagged = highlighted.has(s.id);
            return (
              <g
                key={s.id}
                onClick={() => {
                  if (!leakMode) setSelectedStage(s.id);
                }}
                className={leakMode ? undefined : 'cursor-pointer'}
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width={NW}
                  height={NH}
                  rx={7}
                  fill={active ? 'hsl(var(--c-primary) / 0.14)' : flagged ? 'hsl(var(--c-danger) / 0.10)' : 'hsl(var(--c-surface-2))'}
                  stroke={active ? 'hsl(var(--c-primary))' : flagged ? 'hsl(var(--c-danger))' : 'hsl(var(--c-border))'}
                  strokeWidth={active || flagged ? 1.4 : 1}
                  className={reduced ? undefined : 'transition-colors duration-200'}
                />
                <text
                  x={p.x + NW / 2}
                  y={p.y + NH / 2 + 3.5}
                  textAnchor="middle"
                  fontSize={11}
                  fill={active || flagged ? 'hsl(var(--c-text))' : 'hsl(var(--c-text-muted))'}
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {leakMode ? (
        <div className="space-y-2 border-t border-line p-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[13px] font-semibold text-ink">{leak.title}</h3>
            <span className="font-mono text-[11px] text-subtle">
              {BY_ID.get(leak.from)?.label} → {BY_ID.get(leak.to)?.label}
            </span>
          </div>
          <p className="text-[11.5px] leading-relaxed text-muted">{leak.detail}</p>
          <div className="flex items-end gap-3">
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[10.5px] text-subtle">Reported offline</p>
              <div className="h-4 w-full rounded-sm bg-surface-2">
                <div className="h-full rounded-sm bg-success" style={{ width: `${Number(leak.offline) * 100}%` }} />
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-success">AUC {leak.offline}</p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[10.5px] text-subtle">First month in production</p>
              <div className="h-4 w-full rounded-sm bg-surface-2">
                <div className="h-full rounded-sm bg-danger" style={{ width: `${Number(leak.online) * 100}%` }} />
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-danger">AUC {leak.online}</p>
            </div>
          </div>
          <p className="rounded-md border border-line bg-surface-2 px-2 py-1.5 text-[11.5px] leading-relaxed text-muted">
            <span className="font-medium text-ink">Fix: </span>
            {leak.fix}
          </p>
        </div>
      ) : (
        <div className="space-y-2 border-t border-line p-4">
          <h3 className="text-[13px] font-semibold text-ink">{stage.label}</h3>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-subtle">What happens</p>
            <p className="text-[11.5px] leading-relaxed text-muted">{stage.what}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-subtle">What goes wrong</p>
            <p className="text-[11.5px] leading-relaxed text-muted">{stage.wrong}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-subtle">Usual tools</p>
            <p className="font-mono text-[11px] text-accent">{stage.tool}</p>
          </div>
        </div>
      )}
    </WidgetShell>
  );
}
