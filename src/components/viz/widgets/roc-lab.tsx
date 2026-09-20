'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * ROC, AUC, and the case against them.
 *
 * The left panel is what the model produced: two score distributions, one per
 * class. Everything else in the widget is derived from them by sliding a
 * threshold from right to left and writing down what happens. The curve on
 * the right is traced by that sweep, with the current threshold marked on
 * both panels at once, so the learner can see which part of the curve a
 * given operating point lives on.
 *
 * AUC is the area under the ROC curve, and it equals the probability that a
 * random positive scores above a random negative — a statement about
 * *ranking*, which is why it does not move when the classes become
 * imbalanced. Precision does move, badly, because it divides by the number of
 * positive predictions and most of those are now negatives. Drag the
 * imbalance slider with the PR view open: AUC barely flinches while average
 * precision falls through the floor. That is when PR is the honest chart.
 */

interface Example {
  score: number;
  label: 0 | 1;
}

const N = 400;
const PAD = { l: 34, r: 12, t: 14, b: 26 };

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rng: () => number): number {
  let u = 0;
  while (u === 0) u = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

function makeResolve() {
  const style = getComputedStyle(document.documentElement);
  const expand = (input: string, depth: number): string =>
    depth > 4
      ? input
      : input.replace(/var\((--[a-z0-9-]+)\)/g, (_m, name: string) =>
          expand(style.getPropertyValue(name).trim(), depth + 1),
        );
  return (token: string, fallback: string) => {
    const out = expand(token, 0).trim();
    return out === '' || out.includes('var(') ? fallback : out;
  };
}

function sigmoid(z: number): number {
  return z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
}

function makeData(seed: number, separation: number, prevalence: number): Example[] {
  const rng = mulberry32(seed);
  const out: Example[] = [];
  for (let i = 0; i < N; i++) {
    const label: 0 | 1 = rng() < prevalence ? 1 : 0;
    const z = (label === 1 ? separation / 2 : -separation / 2) + gauss(rng);
    out.push({ score: sigmoid(z), label });
  }
  return out;
}

interface CurvePoint {
  threshold: number;
  tpr: number;
  fpr: number;
  precision: number;
  recall: number;
}

/** One sweep of the threshold from 1 down to 0, recording every operating point. */
function sweep(data: Example[]) {
  const sorted = [...data].sort((a, b) => b.score - a.score);
  const P = data.reduce((s, e) => s + e.label, 0);
  const Nn = data.length - P;
  const points: CurvePoint[] = [{ threshold: 1.0001, tpr: 0, fpr: 0, precision: 1, recall: 0 }];
  let tp = 0;
  let fp = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i]!.label === 1) tp += 1;
    else fp += 1;
    const next = sorted[i + 1];
    if (next && Math.abs(next.score - sorted[i]!.score) < 1e-12) continue;
    points.push({
      threshold: sorted[i]!.score,
      tpr: P === 0 ? 0 : tp / P,
      fpr: Nn === 0 ? 0 : fp / Nn,
      precision: tp + fp === 0 ? 1 : tp / (tp + fp),
      recall: P === 0 ? 0 : tp / P,
    });
  }

  let auc = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!;
    const b = points[i]!;
    auc += ((b.fpr - a.fpr) * (b.tpr + a.tpr)) / 2;
  }
  // Average precision: the PR curve's area, summed the way scikit-learn does it.
  let ap = 0;
  for (let i = 1; i < points.length; i++) {
    ap += (points[i]!.recall - points[i - 1]!.recall) * points[i]!.precision;
  }
  return { points, auc, ap, prevalence: P / data.length, positives: P };
}

function at(points: CurvePoint[], threshold: number): CurvePoint {
  // The operating point actually in force: the last one whose score ≥ threshold.
  let best = points[0]!;
  for (const p of points) {
    if (p.threshold >= threshold) best = p;
    else break;
  }
  return best;
}

export default function RocLab() {
  const [seed, setSeed] = React.useState(41);
  const [separation, setSeparation] = React.useState(2.4);
  const [prevalencePct, setPrevalencePct] = React.useState(50);
  const [threshold, setThreshold] = React.useState(0.5);
  const [view, setView] = React.useState<'roc' | 'pr'>('roc');

  const data = React.useMemo(
    () => makeData(seed, separation, prevalencePct / 100),
    [seed, separation, prevalencePct],
  );
  const curve = React.useMemo(() => sweep(data), [data]);
  const op = at(curve.points, threshold);

  const { canvasRef: distRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const pos = resolve('var(--viz-cat-mastered)', '#199e70');
      const neg = resolve('var(--viz-cat-learning)', '#3987e5');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      const BINS = 30;
      const hp = new Array<number>(BINS).fill(0);
      const hn = new Array<number>(BINS).fill(0);
      for (const e of data) {
        const bin = Math.min(BINS - 1, Math.floor(e.score * BINS));
        if (e.label === 1) hp[bin] = hp[bin]! + 1;
        else hn[bin] = hn[bin]! + 1;
      }
      // Each class is scaled to its own height, otherwise a 2% positive class
      // is a flat line and the overlap cannot be judged at all.
      const maxP = Math.max(1, ...hp);
      const maxN = Math.max(1, ...hn);

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);

      const bw = plotW / BINS;
      const drawHist = (hist: number[], max: number, colour: string, alpha: number) => {
        ctx.fillStyle = colour;
        ctx.globalAlpha = alpha;
        hist.forEach((v, i) => {
          const bh = (v / max) * plotH;
          ctx.fillRect(PAD.l + i * bw, PAD.t + plotH - bh, Math.max(1, bw - 1), bh);
        });
        ctx.globalAlpha = 1;
      };
      drawHist(hn, maxN, neg, 0.55);
      drawHist(hp, maxP, pos, 0.55);

      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(PAD.l + threshold * plotW, PAD.t - 4);
      ctx.lineTo(PAD.l + threshold * plotW, PAD.t + plotH + 4);
      ctx.stroke();

      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = pos;
      ctx.textAlign = 'right';
      ctx.fillText(`positives (${curve.positives})`, PAD.l + plotW - 4, PAD.t + 11);
      ctx.fillStyle = neg;
      ctx.fillText(`negatives (${data.length - curve.positives})`, PAD.l + plotW - 4, PAD.t + 23);
      ctx.fillStyle = axis;
      ctx.textAlign = 'center';
      ctx.fillText('model score', PAD.l + plotW / 2, h - 8);
      ctx.textAlign = 'left';
      ctx.fillText('0', PAD.l, h - 8);
      ctx.textAlign = 'right';
      ctx.fillText('1', PAD.l + plotW, h - 8);
      ctx.textAlign = 'left';
      ctx.fillText('each class scaled to its own height', PAD.l + 3, PAD.t + plotH - 5);
    },
    [data, threshold, curve.positives],
  );

  const { canvasRef: curveRef } = useResponsiveCanvas(
    (ctx, w, h) => {
      const plotW = w - PAD.l - PAD.r;
      const plotH = h - PAD.t - PAD.b;
      if (plotW <= 0 || plotH <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', '#7a8296');
      const grid = resolve('var(--viz-grid)', 'rgba(140,150,170,0.25)');
      const series = resolve('var(--viz-series)', '#8164f7');
      const ink = resolve('hsl(var(--c-text))', '#eee');

      const X = (v: number) => PAD.l + v * plotW;
      const Y = (v: number) => PAD.t + plotH - v * plotH;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD.l, PAD.t, plotW, plotH);
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      if (view === 'roc') {
        ctx.moveTo(X(0), Y(0));
        ctx.lineTo(X(1), Y(1));
      } else {
        ctx.moveTo(X(0), Y(curve.prevalence));
        ctx.lineTo(X(1), Y(curve.prevalence));
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Area under the curve, shaded.
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = series;
      ctx.beginPath();
      ctx.moveTo(X(0), Y(0));
      for (const p of curve.points) {
        ctx.lineTo(X(view === 'roc' ? p.fpr : p.recall), Y(view === 'roc' ? p.tpr : p.precision));
      }
      ctx.lineTo(X(1), Y(0));
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = series;
      ctx.lineWidth = 2;
      ctx.beginPath();
      curve.points.forEach((p, i) => {
        const px = X(view === 'roc' ? p.fpr : p.recall);
        const py = Y(view === 'roc' ? p.tpr : p.precision);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      const ox = X(view === 'roc' ? op.fpr : op.recall);
      const oy = Y(view === 'roc' ? op.tpr : op.precision);
      ctx.strokeStyle = ink;
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PAD.l, oy);
      ctx.lineTo(ox, oy);
      ctx.lineTo(ox, PAD.t + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(ox, oy, 5, 0, Math.PI * 2);
      ctx.fillStyle = ink;
      ctx.fill();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(view === 'roc' ? 'false positive rate' : 'recall', PAD.l + plotW / 2, h - 8);
      ctx.save();
      ctx.translate(11, PAD.t + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(view === 'roc' ? 'true positive rate' : 'precision', 0, 0);
      ctx.restore();
      ctx.textAlign = 'left';
      ctx.fillText(
        view === 'roc' ? `AUC ${curve.auc.toFixed(3)}` : `AP ${curve.ap.toFixed(3)} · baseline ${curve.prevalence.toFixed(3)}`,
        PAD.l + 5,
        PAD.t + plotH - 6,
      );
    },
    [curve, view, op],
  );

  return (
    <WidgetShell
      takeaway="AUC only asks whether positives are ranked above negatives, so it holds steady as the positive class gets rarer. Precision does not — it divides by everything the model flagged. Take imbalance to 2% and watch AUC stay respectable while average precision collapses toward the prevalence line."
      readout={
        <Readout
          items={[
            { label: 'AUC', value: curve.auc.toFixed(3), tone: curve.auc > 0.85 ? 'good' : curve.auc < 0.65 ? 'bad' : 'default' },
            { label: 'Average precision', value: curve.ap.toFixed(3), tone: curve.ap < curve.prevalence * 2 ? 'bad' : 'default' },
            { label: 'PR baseline', value: curve.prevalence.toFixed(3) },
            { label: 'TPR (recall)', value: op.tpr.toFixed(3) },
            { label: 'FPR', value: op.fpr.toFixed(3) },
            { label: 'Precision', value: op.precision.toFixed(3) },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Decision threshold"
            value={threshold}
            min={0.01}
            max={0.99}
            step={0.01}
            onChange={setThreshold}
            format={(v) => v.toFixed(2)}
            hint="The threshold picks a point on the curve. It does not change the curve — that is the difference between choosing an operating point and improving a model."
          />
          <Slider
            label="Class separation"
            value={separation}
            min={0}
            max={4}
            step={0.1}
            onChange={setSeparation}
            format={(v) => v.toFixed(1)}
            hint="At 0 the distributions coincide, the curve is the diagonal and AUC is 0.5 — the score carries no information at all."
          />
          <Slider
            label="Positives in the data"
            value={prevalencePct}
            min={1}
            max={50}
            step={1}
            onChange={setPrevalencePct}
            format={(v) => `${v}%`}
            hint="Nothing about the model changes as you drag this — only how often the positive class occurs."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Toggle
              label="Curve"
              value={view}
              onChange={(v) => setView(v as 'roc' | 'pr')}
              options={[
                { value: 'roc', label: 'ROC' },
                { value: 'pr', label: 'Precision–recall' },
              ]}
            />
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New data
            </button>
          </div>
        </>
      }
    >
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="h-52 w-full">
          <canvas
            ref={distRef}
            className="block"
            role="img"
            aria-label={`Score histograms for both classes with the threshold marked at ${threshold.toFixed(2)}.`}
          />
        </div>
        <div className="h-52 w-full">
          <canvas
            ref={curveRef}
            className="block"
            role="img"
            aria-label={
              view === 'roc'
                ? `ROC curve with area ${curve.auc.toFixed(3)}, current point at false positive rate ${op.fpr.toFixed(2)} and true positive rate ${op.tpr.toFixed(2)}.`
                : `Precision-recall curve with average precision ${curve.ap.toFixed(3)}, current point at recall ${op.recall.toFixed(2)} and precision ${op.precision.toFixed(2)}.`
            }
          />
        </div>
      </div>
    </WidgetShell>
  );
}
