'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell, useResponsiveCanvas } from './shared';

/**
 * The confusion matrix as a live object rather than a table in a slide.
 *
 * Two hundred and forty examples have already been scored by a model; the
 * threshold slider is the only thing left to decide, and every number in the
 * widget follows from it. Dragging it shows the trade that no amount of
 * modelling removes: catching more positives means accepting more false
 * alarms.
 *
 * The imbalanced preset is the part worth staying with. Four per cent of the
 * examples are positive, so a model that simply answers "no" to everything
 * scores 96% accuracy. The widget prints that number next to the real one.
 * When accuracy can be beaten by a constant, it is not measuring anything.
 */

interface Example {
  score: number;
  label: 0 | 1;
}

type Preset = 'balanced' | 'imbalanced';

const N = 240;
const PAD = { l: 44, r: 12, t: 16, b: 26 };

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

function makeData(seed: number, preset: Preset): Example[] {
  const rng = mulberry32(seed);
  const prevalence = preset === 'balanced' ? 0.5 : 0.04;
  const posMean = preset === 'balanced' ? 1.5 : 0.5;
  const negMean = preset === 'balanced' ? -1.5 : -1.3;
  const out: Example[] = [];
  for (let i = 0; i < N; i++) {
    const label: 0 | 1 = rng() < prevalence ? 1 : 0;
    const z = (label === 1 ? posMean : negMean) + gauss(rng);
    out.push({ score: sigmoid(z), label });
  }
  return out;
}

function confusion(data: Example[], threshold: number) {
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;
  for (const e of data) {
    const pred = e.score >= threshold ? 1 : 0;
    if (e.label === 1 && pred === 1) tp += 1;
    else if (e.label === 0 && pred === 1) fp += 1;
    else if (e.label === 0 && pred === 0) tn += 1;
    else fn += 1;
  }
  const safe = (num: number, den: number) => (den === 0 ? 0 : num / den);
  const precision = safe(tp, tp + fp);
  const recall = safe(tp, tp + fn);
  return {
    tp,
    fp,
    tn,
    fn,
    accuracy: safe(tp + tn, data.length),
    precision,
    recall,
    specificity: safe(tn, tn + fp),
    f1: precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall),
  };
}

export default function ConfusionMatrixLab() {
  const [seed, setSeed] = React.useState(29);
  const [preset, setPreset] = React.useState<Preset>('balanced');
  const [threshold, setThreshold] = React.useState(0.5);

  const data = React.useMemo(() => makeData(seed, preset), [seed, preset]);
  const m = React.useMemo(() => confusion(data, threshold), [data, threshold]);
  const positives = m.tp + m.fn;
  const prevalence = positives / data.length;
  const trivialAccuracy = 1 - prevalence;

  const { canvasRef } = useResponsiveCanvas(
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

      const rowY = (label: 0 | 1) => PAD.t + (label === 1 ? plotH * 0.3 : plotH * 0.74);
      const X = (s: number) => PAD.l + s * plotW;

      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(PAD.l + (plotW / 4) * i, PAD.t);
        ctx.lineTo(PAD.l + (plotW / 4) * i, PAD.t + plotH);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Every scored example, jittered within its true-label row.
      const rng = mulberry32(88);
      for (const e of data) {
        const jitter = (rng() - 0.5) * plotH * 0.3;
        const px = X(e.score);
        const py = rowY(e.label) + jitter;
        const predicted = e.score >= threshold ? 1 : 0;
        const correct = predicted === e.label;
        ctx.globalAlpha = correct ? 0.55 : 1;
        ctx.fillStyle = e.label === 1 ? pos : neg;
        if (e.label === 1) {
          ctx.beginPath();
          ctx.arc(px, py, 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(px - 2.8, py - 2.8, 5.6, 5.6);
        }
        if (!correct) {
          ctx.strokeStyle = resolve('var(--viz-cat-review)', '#d95926');
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(px, py, 5.5, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(X(threshold), PAD.t - 4);
      ctx.lineTo(X(threshold), PAD.t + plotH + 4);
      ctx.stroke();

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('actual yes', PAD.l - 5, rowY(1) + 3);
      ctx.fillText('actual no', PAD.l - 5, rowY(0) + 3);
      ctx.textAlign = 'center';
      ctx.fillText('model score', PAD.l + plotW / 2, h - 8);
      ctx.fillText('0', PAD.l, h - 8);
      ctx.fillText('1', PAD.l + plotW, h - 8);
      ctx.fillStyle = ink;
      ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = X(threshold) > PAD.l + plotW * 0.7 ? 'right' : 'left';
      ctx.fillText(`threshold ${threshold.toFixed(2)} →`, X(threshold) + 4, PAD.t + 6);
    },
    [data, threshold],
  );

  const cells = [
    { key: 'tp', title: 'True positive', n: m.tp, note: 'caught', cls: 'border-success/40 bg-success/10 text-success' },
    { key: 'fp', title: 'False positive', n: m.fp, note: 'false alarm', cls: 'border-warning/40 bg-warning/10 text-warning' },
    { key: 'fn', title: 'False negative', n: m.fn, note: 'missed', cls: 'border-danger/40 bg-danger/10 text-danger' },
    { key: 'tn', title: 'True negative', n: m.tn, note: 'correctly ignored', cls: 'border-line bg-surface-2 text-muted' },
  ];

  const formulas = [
    { name: 'Accuracy', formula: '(TP + TN) / all', sub: `(${m.tp} + ${m.tn}) / ${data.length}`, value: m.accuracy },
    { name: 'Precision', formula: 'TP / (TP + FP)', sub: `${m.tp} / (${m.tp} + ${m.fp})`, value: m.precision },
    { name: 'Recall', formula: 'TP / (TP + FN)', sub: `${m.tp} / (${m.tp} + ${m.fn})`, value: m.recall },
    { name: 'Specificity', formula: 'TN / (TN + FP)', sub: `${m.tn} / (${m.tn} + ${m.fp})`, value: m.specificity },
    { name: 'F1', formula: '2PR / (P + R)', sub: `2 × ${m.precision.toFixed(2)} × ${m.recall.toFixed(2)} / ${(m.precision + m.recall).toFixed(2)}`, value: m.f1 },
  ];

  return (
    <WidgetShell
      takeaway={`Accuracy counts the diagonal and nothing else, so it rewards whichever answer is common. On the imbalanced preset a model that always says no scores ${(trivialAccuracy * 100).toFixed(1)}% — read recall and precision, and read them together.`}
      readout={
        <Readout
          items={[
            { label: 'Accuracy', value: `${(m.accuracy * 100).toFixed(1)}%`, tone: m.accuracy > trivialAccuracy ? 'good' : 'bad' },
            { label: 'Precision', value: m.precision.toFixed(3) },
            { label: 'Recall', value: m.recall.toFixed(3), tone: m.recall < 0.5 ? 'bad' : m.recall > 0.85 ? 'good' : 'warn' },
            { label: 'F1', value: m.f1.toFixed(3) },
            { label: 'Always-no baseline', value: `${(trivialAccuracy * 100).toFixed(1)}%`, tone: 'warn' },
          ]}
        />
      }
      controls={
        <>
          <Slider
            label="Decision threshold"
            value={threshold}
            min={0.02}
            max={0.98}
            step={0.01}
            onChange={setThreshold}
            format={(v) => v.toFixed(2)}
            hint="Lower it to catch more positives at the cost of false alarms; raise it to be sure about the ones you flag and miss the rest."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Toggle
              label="Dataset"
              value={preset}
              onChange={(v) => setPreset(v as Preset)}
              options={[
                { value: 'balanced', label: 'Balanced (50%)' },
                { value: 'imbalanced', label: 'Imbalanced (4%)' },
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
          <p className="text-[11.5px] leading-relaxed text-subtle">
            {positives} of {data.length} examples are genuinely positive ({(prevalence * 100).toFixed(1)}%).{' '}
            {preset === 'imbalanced'
              ? 'This is the shape of fraud, disease screening and defect detection — the interesting class is the rare one.'
              : 'An even split, where accuracy is at its most trustworthy.'}
          </p>
        </>
      }
    >
      <div className="h-44 w-full">
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label={`Scored examples split by true label, with the decision threshold at ${threshold.toFixed(2)}. ${m.tp} true positives, ${m.fp} false positives, ${m.fn} false negatives, ${m.tn} true negatives.`}
        />
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-1.5 text-center">
          <div />
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-subtle">predicted yes</p>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-subtle">predicted no</p>
          <p className="self-center text-[10.5px] font-semibold uppercase tracking-[0.08em] text-subtle">actual yes</p>
          {[cells[0]!, cells[2]!].map((c) => (
            <div key={c.key} className={`rounded-md border px-2 py-2 ${c.cls}`}>
              <p className="font-mono text-[17px] font-semibold tabular-nums">{c.n}</p>
              <p className="text-[10.5px] opacity-80">{c.title}</p>
            </div>
          ))}
          <p className="self-center text-[10.5px] font-semibold uppercase tracking-[0.08em] text-subtle">actual no</p>
          {[cells[1]!, cells[3]!].map((c) => (
            <div key={c.key} className={`rounded-md border px-2 py-2 ${c.cls}`}>
              <p className="font-mono text-[17px] font-semibold tabular-nums">{c.n}</p>
              <p className="text-[10.5px] opacity-80">{c.title}</p>
            </div>
          ))}
        </div>
        <dl className="mt-3 space-y-1">
          {formulas.map((f) => (
            <div key={f.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11.5px]">
              <dt className="w-20 shrink-0 font-medium text-muted">{f.name}</dt>
              <dd className="font-mono text-subtle">{f.formula}</dd>
              <dd className="font-mono text-subtle">= {f.sub}</dd>
              <dd className="font-mono font-medium tabular-nums text-ink">= {f.value.toFixed(3)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </WidgetShell>
  );
}
