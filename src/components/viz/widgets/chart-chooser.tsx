'use client';

import * as React from 'react';
import { Toggle, WidgetShell, VIZ } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * Choosing a chart is not a matter of taste.
 *
 * It follows from two things a learner already knows before opening a plotting
 * library: what question is being asked, and what kinds of column are on hand.
 * Fix those two and the chart is nearly determined — which is the opposite of
 * how charting is usually taught ("here are forty chart types, pick one you
 * like").
 *
 * The widget therefore refuses to be a gallery. It asks the two questions,
 * names one chart, and — the part that actually changes behaviour — draws the
 * wrong chart next to the right one so the learner can see the specific way
 * the wrong one misleads. Every example is a real inline SVG rendered from
 * fixed, hand-chosen numbers; nothing here is random, so the same choice
 * always draws the same picture.
 */

const X0 = 16;
const X1 = 194;
const Y0 = 8;
const Y1 = 82;
const px = (t: number) => X0 + t * (X1 - X0);
const py = (t: number) => Y1 - t * (Y1 - Y0);

/** Fixed illustration data, chosen so each chart has something to show. */
const BARS = [0.92, 0.68, 0.52, 0.41, 0.24];
const GROUPS = [
  [0.78, 0.52],
  [0.62, 0.66],
  [0.48, 0.34],
  [0.35, 0.55],
];
const PARTS = [0.42, 0.27, 0.19, 0.12];
const HIST = [0.06, 0.18, 0.46, 0.92, 0.74, 0.38, 0.16, 0.07];
const SCATTER: [number, number][] = [
  [0.06, 0.18],
  [0.15, 0.3],
  [0.23, 0.24],
  [0.31, 0.44],
  [0.4, 0.38],
  [0.47, 0.56],
  [0.55, 0.5],
  [0.63, 0.66],
  [0.71, 0.6],
  [0.8, 0.78],
  [0.88, 0.71],
  [0.96, 0.87],
];
const TREND = [0.3, 0.38, 0.34, 0.47, 0.53, 0.49, 0.6, 0.67, 0.64, 0.75, 0.82, 0.88];
const SERIES_3 = [
  [0.22, 0.3, 0.34, 0.41, 0.46, 0.55, 0.6, 0.66],
  [0.5, 0.47, 0.44, 0.42, 0.38, 0.36, 0.33, 0.3],
  [0.12, 0.16, 0.2, 0.19, 0.24, 0.27, 0.3, 0.36],
];
const BOXES = [
  { lo: 0.12, q1: 0.28, med: 0.42, q3: 0.58, hi: 0.78 },
  { lo: 0.3, q1: 0.46, med: 0.52, q3: 0.6, hi: 0.74 },
  { lo: 0.05, q1: 0.18, med: 0.3, q3: 0.62, hi: 0.94 },
];
const HEAT = [
  [0.1, 0.25, 0.55, 0.95],
  [0.2, 0.45, 0.8, 0.6],
  [0.6, 0.85, 0.35, 0.2],
  [0.9, 0.5, 0.2, 0.1],
];
const PIE9 = [0.2, 0.16, 0.14, 0.12, 0.11, 0.09, 0.08, 0.06, 0.04];

const PALETTE = [VIZ.series, VIZ.info, VIZ.warn, VIZ.good, VIZ.muted];

function axes() {
  return (
    <g style={{ stroke: VIZ.axis, opacity: 0.55 }} strokeWidth={1}>
      <line x1={X0} y1={Y1} x2={X1} y2={Y1} />
      <line x1={X0} y1={Y0} x2={X0} y2={Y1} />
    </g>
  );
}

function pieSlice(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const p = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  const [sx, sy] = p(a0);
  const [ex, ey] = p(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${cx.toFixed(2)} ${cy.toFixed(2)} L ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;
}

type ChartKind =
  | 'bar'
  | 'groupedBar'
  | 'stackedBar'
  | 'stacked100'
  | 'histogram'
  | 'box'
  | 'dynamite'
  | 'scatter'
  | 'connectedScatter'
  | 'line'
  | 'multiLine'
  | 'barPerPeriod'
  | 'stackedArea'
  | 'pieMany'
  | 'heatmap';

function Chart({ kind, label }: { kind: ChartKind; label: string }) {
  const body = (() => {
    switch (kind) {
      case 'bar': {
        const w = (X1 - X0) / BARS.length;
        return (
          <>
            {axes()}
            {BARS.map((v, i) => (
              <rect
                key={i}
                x={px(i / BARS.length) + w * 0.2}
                y={py(v)}
                width={w * 0.6}
                height={Y1 - py(v)}
                rx={1}
                style={{ fill: VIZ.series }}
              />
            ))}
          </>
        );
      }
      case 'groupedBar': {
        const w = (X1 - X0) / GROUPS.length;
        return (
          <>
            {axes()}
            {GROUPS.map((pair, i) =>
              pair.map((v, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={px(i / GROUPS.length) + w * (0.16 + j * 0.34)}
                  y={py(v)}
                  width={w * 0.3}
                  height={Y1 - py(v)}
                  rx={1}
                  style={{ fill: j === 0 ? VIZ.series : VIZ.info }}
                />
              )),
            )}
          </>
        );
      }
      case 'stackedBar': {
        const w = (X1 - X0) / GROUPS.length;
        return (
          <>
            {axes()}
            {GROUPS.map((_, i) => {
              let acc = 0;
              return PARTS.slice(0, 3).map((p, j) => {
                const h = p * (0.7 + i * 0.1);
                const y = py(acc + h);
                const rect = (
                  <rect
                    key={`${i}-${j}`}
                    x={px(i / GROUPS.length) + w * 0.22}
                    y={y}
                    width={w * 0.56}
                    height={py(acc) - y}
                    style={{ fill: PALETTE[j] }}
                  />
                );
                acc += h;
                return rect;
              });
            })}
          </>
        );
      }
      case 'stacked100': {
        let acc = 0;
        return (
          <g>
            {PARTS.map((p, i) => {
              const x = px(acc);
              acc += p;
              return (
                <g key={i}>
                  <rect x={x} y={30} width={px(acc) - x} height={26} style={{ fill: PALETTE[i] }} />
                  <text
                    x={(x + px(acc)) / 2}
                    y={70}
                    textAnchor="middle"
                    fontSize={9}
                    style={{ fill: VIZ.axis }}
                  >
                    {Math.round(p * 100)}%
                  </text>
                </g>
              );
            })}
          </g>
        );
      }
      case 'histogram': {
        const w = (X1 - X0) / HIST.length;
        return (
          <>
            {axes()}
            {HIST.map((v, i) => (
              <rect
                key={i}
                x={px(i / HIST.length)}
                y={py(v)}
                width={w - 0.6}
                height={Y1 - py(v)}
                style={{ fill: VIZ.series }}
              />
            ))}
          </>
        );
      }
      case 'box': {
        const w = (X1 - X0) / BOXES.length;
        return (
          <>
            {axes()}
            {BOXES.map((b, i) => {
              const cx = px((i + 0.5) / BOXES.length);
              return (
                <g key={i} style={{ stroke: VIZ.series }} strokeWidth={1.4} fill="none">
                  <line x1={cx} y1={py(b.lo)} x2={cx} y2={py(b.hi)} />
                  <line x1={cx - 6} y1={py(b.lo)} x2={cx + 6} y2={py(b.lo)} />
                  <line x1={cx - 6} y1={py(b.hi)} x2={cx + 6} y2={py(b.hi)} />
                  <rect
                    x={cx - w * 0.22}
                    y={py(b.q3)}
                    width={w * 0.44}
                    height={py(b.q1) - py(b.q3)}
                    style={{ fill: VIZ.series, fillOpacity: 0.22 }}
                  />
                  <line x1={cx - w * 0.22} y1={py(b.med)} x2={cx + w * 0.22} y2={py(b.med)} strokeWidth={2.2} />
                </g>
              );
            })}
          </>
        );
      }
      case 'dynamite': {
        const w = (X1 - X0) / BOXES.length;
        return (
          <>
            {axes()}
            {BOXES.map((b, i) => {
              const cx = px((i + 0.5) / BOXES.length);
              return (
                <g key={i}>
                  <rect
                    x={cx - w * 0.22}
                    y={py(b.med)}
                    width={w * 0.44}
                    height={Y1 - py(b.med)}
                    style={{ fill: VIZ.warn }}
                  />
                  <g style={{ stroke: VIZ.axis }} strokeWidth={1.3}>
                    <line x1={cx} y1={py(b.med)} x2={cx} y2={py(b.med + 0.1)} />
                    <line x1={cx - 5} y1={py(b.med + 0.1)} x2={cx + 5} y2={py(b.med + 0.1)} />
                  </g>
                </g>
              );
            })}
          </>
        );
      }
      case 'scatter':
        return (
          <>
            {axes()}
            {SCATTER.map(([x, y], i) => (
              <circle key={i} cx={px(x)} cy={py(y)} r={2.6} style={{ fill: VIZ.series, fillOpacity: 0.8 }} />
            ))}
          </>
        );
      case 'connectedScatter': {
        // Same points, drawn in row order — which is not the x order, so the
        // line doubles back on itself and invents a journey nobody took.
        const shuffledOrder = [0, 5, 2, 9, 4, 11, 1, 7, 3, 10, 6, 8];
        const path = shuffledOrder
          .map((idx, k) => `${k === 0 ? 'M' : 'L'} ${px(SCATTER[idx][0]).toFixed(1)} ${py(SCATTER[idx][1]).toFixed(1)}`)
          .join(' ');
        return (
          <>
            {axes()}
            <path d={path} fill="none" style={{ stroke: VIZ.warn }} strokeWidth={1.3} />
            {SCATTER.map(([x, y], i) => (
              <circle key={i} cx={px(x)} cy={py(y)} r={2.2} style={{ fill: VIZ.series }} />
            ))}
          </>
        );
      }
      case 'line': {
        const path = TREND.map(
          (v, i) => `${i === 0 ? 'M' : 'L'} ${px(i / (TREND.length - 1)).toFixed(1)} ${py(v).toFixed(1)}`,
        ).join(' ');
        return (
          <>
            {axes()}
            <path d={path} fill="none" style={{ stroke: VIZ.series }} strokeWidth={2} strokeLinejoin="round" />
          </>
        );
      }
      case 'multiLine':
        return (
          <>
            {axes()}
            {SERIES_3.map((s, j) => (
              <path
                key={j}
                d={s.map((v, i) => `${i === 0 ? 'M' : 'L'} ${px(i / (s.length - 1)).toFixed(1)} ${py(v).toFixed(1)}`).join(' ')}
                fill="none"
                style={{ stroke: PALETTE[j] }}
                strokeWidth={1.8}
                strokeLinejoin="round"
              />
            ))}
          </>
        );
      case 'barPerPeriod': {
        const w = (X1 - X0) / TREND.length;
        return (
          <>
            {axes()}
            {TREND.map((v, i) => (
              <rect
                key={i}
                x={px(i / TREND.length) + w * 0.22}
                y={py(v)}
                width={w * 0.56}
                height={Y1 - py(v)}
                style={{ fill: VIZ.warn }}
              />
            ))}
          </>
        );
      }
      case 'stackedArea': {
        const n = SERIES_3[0].length;
        let lower = new Array<number>(n).fill(0);
        return (
          <>
            {axes()}
            {SERIES_3.map((s, j) => {
              const upper = s.map((v, i) => lower[i] + v * 0.6);
              const top = upper.map((v, i) => `${i === 0 ? 'M' : 'L'} ${px(i / (n - 1)).toFixed(1)} ${py(v).toFixed(1)}`);
              const bottom = [...lower]
                .map((v, i) => ({ v, i }))
                .reverse()
                .map(({ v, i }) => `L ${px(i / (n - 1)).toFixed(1)} ${py(v).toFixed(1)}`);
              const d = `${top.join(' ')} ${bottom.join(' ')} Z`;
              lower = upper;
              return <path key={j} d={d} style={{ fill: PALETTE[j], fillOpacity: 0.85 }} />;
            })}
          </>
        );
      }
      case 'pieMany': {
        let a = -Math.PI / 2;
        return (
          <g>
            {PIE9.map((p, i) => {
              const a1 = a + p * Math.PI * 2;
              const d = pieSlice(100, 45, 36, a, a1);
              a = a1;
              return <path key={i} d={d} style={{ fill: PALETTE[i % PALETTE.length], fillOpacity: 1 - (i % 3) * 0.18 }} />;
            })}
          </g>
        );
      }
      case 'heatmap': {
        const cw = (X1 - X0) / 4;
        const ch = (Y1 - Y0) / 4;
        const seq = ['var(--viz-seq-0)', 'var(--viz-seq-1)', 'var(--viz-seq-2)', 'var(--viz-seq-3)', 'var(--viz-seq-4)'];
        return (
          <g>
            {HEAT.map((row, r) =>
              row.map((v, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={X0 + c * cw}
                  y={Y0 + r * ch}
                  width={cw - 1}
                  height={ch - 1}
                  style={{ fill: seq[Math.min(4, Math.round(v * 4))] }}
                />
              )),
            )}
          </g>
        );
      }
    }
  })();

  return (
    <svg viewBox="0 0 200 96" className="block w-full" role="img" aria-label={label}>
      {body}
    </svg>
  );
}

type Question = 'comparison' | 'distribution' | 'relationship' | 'composition' | 'trend';
type Shape = 'cat-num' | 'cat-cat-num' | 'num' | 'num-num' | 'time-num' | 'time-cat-num';

const SHAPE_LABEL: Record<Shape, string> = {
  'cat-num': 'One category + one number',
  'cat-cat-num': 'Two categories + a number',
  num: 'One number, many rows',
  'num-num': 'Two numbers',
  'time-num': 'Time + one number',
  'time-cat-num': 'Time + a category + a number',
};

interface Rec {
  chart: ChartKind;
  name: string;
  encode: string;
  why: string;
  care: string;
  mistake: { chart: ChartKind; name: string; why: string };
}

const RECS: Record<Question, Partial<Record<Shape, Rec>>> = {
  comparison: {
    'cat-num': {
      chart: 'bar',
      name: 'Bar chart, sorted, zero baseline',
      encode: 'category → position along one axis, value → bar length',
      why: 'Length against a common baseline is the most accurately judged encoding people have. Two bars differing by 5% look like they differ by 5%.',
      care: 'Sort by value unless the categories have their own order. Alphabetical order hides the ranking that the reader came for.',
      mistake: {
        chart: 'pieMany',
        name: 'Pie chart',
        why: 'A pie asks the reader to compare angles and wedge areas, which people judge far less accurately than length. A 14% slice and a 16% slice are indistinguishable, and by the sixth slice the palette has run out of colours and started repeating.',
      },
    },
    'cat-cat-num': {
      chart: 'groupedBar',
      name: 'Grouped bars (or small multiples past ~4 groups)',
      encode: 'outer category → group position, inner category → colour, value → length',
      why: 'Every bar still starts at zero, so any bar can be compared with any other. Grouping keeps the within-group comparison adjacent, which is usually the one that matters.',
      care: 'Past four or five inner categories, split into small multiples. Grouped bars stop being readable long before they stop being drawable.',
      mistake: {
        chart: 'stackedBar',
        name: 'Stacked bars',
        why: 'Only the bottom segment sits on a shared baseline. Every segment above it floats on a start line that moves from bar to bar, so comparing the middle series across groups is guesswork. Stacking answers "what is the total", not "which is bigger".',
      },
    },
  },
  distribution: {
    num: {
      chart: 'histogram',
      name: 'Histogram',
      encode: 'value → bin position, count → bar height',
      why: 'It shows the shape: where the mass sits, whether there are two humps, how long the tail is, and whether anything sits far out on its own.',
      care: 'Bin width is a real choice, not a default. Too wide and you erase the second hump; too narrow and you are plotting noise. Try a few.',
      mistake: {
        chart: 'dynamite',
        name: 'A bar of the mean with an error bar',
        why: 'Two numbers standing in for a thousand. A mean of 50 looks identical whether the data clusters at 50 or splits evenly between 0 and 100 — and the second case is the one you needed to know about.',
      },
    },
    'cat-num': {
      chart: 'box',
      name: 'Box plot, or a strip plot when n is small',
      encode: 'category → position, distribution → box, whiskers and outliers',
      why: 'One box per group shows median, spread and skew side by side, so you can see that group C is not higher on average but is far more variable.',
      care: 'Under about 30 points per group, draw the points themselves. A box plot of seven observations is a summary of almost nothing.',
      mistake: {
        chart: 'dynamite',
        name: 'Bars of means with error bars',
        why: 'The bar implies the data runs from zero upward, which it usually does not, and the error bar hides skew and outliers entirely. Different distributions produce identical pictures.',
      },
    },
  },
  relationship: {
    'num-num': {
      chart: 'scatter',
      name: 'Scatter plot',
      encode: 'variable one → x, variable two → y, one mark per observation',
      why: 'Nothing is aggregated away. Curvature, clusters, ceilings and outliers are all visible, and a fitted line can be laid on top once you have seen what it is fitting.',
      care: 'Look before you fit. Anscombe’s four datasets share a mean, a variance and a regression line, and look nothing like one another.',
      mistake: {
        chart: 'connectedScatter',
        name: 'Joining the dots',
        why: 'A line says "this came next". When x is not an ordered sequence, the line traces the order the rows happened to sit in the file, which is an accident of storage being presented as a finding.',
      },
    },
    'cat-cat-num': {
      chart: 'heatmap',
      name: 'Heatmap',
      encode: 'category one → rows, category two → columns, value → colour',
      why: 'A grid of colour makes block structure and diagonals jump out. It is how you read a confusion matrix or a correlation matrix at a glance.',
      care: 'Use a sequential scale for magnitudes and a diverging one only when zero is a real midpoint. Colour reads to about three levels, so put the numbers in the cells when precision matters.',
      mistake: {
        chart: 'groupedBar',
        name: 'Sixteen grouped bars',
        why: 'The same numbers, but the reader now has to hold sixteen lengths in memory to find the pattern instead of seeing a bright block. Grid position beats bar position once both variables are categorical.',
      },
    },
  },
  composition: {
    'cat-num': {
      chart: 'stacked100',
      name: 'A single 100% stacked bar, with the parts labelled',
      encode: 'part → segment length along one bar, total → the whole bar',
      why: 'Parts of one whole, in one row, with each share readable as a length. It stacks neatly under a headline and survives being 320 pixels wide.',
      care: 'Order the segments largest first and label them directly. Anything under about 3% should be folded into "other" rather than drawn as a sliver.',
      mistake: {
        chart: 'pieMany',
        name: 'A nine-slice pie',
        why: 'Beyond three or four parts a pie becomes a colour-matching puzzle: the reader looks up a legend, finds the slice, judges an angle, and repeats. The palette also runs out, so two slices end up nearly the same colour.',
      },
    },
    'time-cat-num': {
      chart: 'stackedArea',
      name: 'Stacked area chart',
      encode: 'time → x, part → band thickness, total → the top edge',
      why: 'The top edge is the total over time and each band is one part’s contribution, so you get the aggregate and the mix in one picture.',
      care: 'Only the bottom band has a flat baseline, so read band thickness, not band height. If one part’s own trend is the question, give it its own line chart.',
      mistake: {
        chart: 'pieMany',
        name: 'One pie per time period',
        why: 'Readers cannot track a slice across three separate pies — the slice moves, rotates and changes neighbours. A continuous band keeps each part in the same place so the eye can follow it.',
      },
    },
  },
  trend: {
    'time-num': {
      chart: 'line',
      name: 'Line chart',
      encode: 'time → x, value → y, connected in time order',
      why: 'The line is the shape of the change. Slope carries the meaning, and the eye reads acceleration, plateaus and reversals without being told to.',
      care: 'A line chart may omit zero if the y-axis is clearly labelled — but the axis then becomes a claim, so make the range an honest one rather than the one that makes the change look biggest.',
      mistake: {
        chart: 'barPerPeriod',
        name: 'One bar per period',
        why: 'Twelve separate lengths instead of one shape. Bars also demand a zero baseline, which squashes the variation you were plotting, and they imply each period is an independent category rather than a point in a sequence.',
      },
    },
    'time-cat-num': {
      chart: 'multiLine',
      name: 'Multiple lines, labelled directly',
      encode: 'time → x, value → y, category → one line each',
      why: 'Each series keeps its own baseline, so every line can be read on its own and compared with the others. Up to about five lines this beats anything else.',
      care: 'Label the lines at their right-hand end instead of using a legend. A legend makes the reader look away from the data and back again for every series.',
      mistake: {
        chart: 'stackedBar',
        name: 'Stacked bars over time',
        why: 'Stacking makes each series sit on the one below it, so a series can look like it is growing purely because something underneath it grew. Only the total and the bottom band are readable.',
      },
    },
  },
};

const QUESTION_OPTIONS: { value: Question; label: string; gloss: string }[] = [
  { value: 'comparison', label: 'Comparison', gloss: 'Which is bigger?' },
  { value: 'distribution', label: 'Distribution', gloss: 'How is it spread out?' },
  { value: 'relationship', label: 'Relationship', gloss: 'Do these move together?' },
  { value: 'composition', label: 'Composition', gloss: 'What is it made of?' },
  { value: 'trend', label: 'Trend', gloss: 'How has it changed over time?' },
];

export default function ChartChooser({ props }: { props?: Record<string, unknown> }) {
  void props;
  const reduced = usePrefersReducedMotion();
  const [question, setQuestion] = React.useState<Question>('comparison');
  const shapes = Object.keys(RECS[question]) as Shape[];
  const [shape, setShape] = React.useState<Shape>('cat-num');

  const activeShape = shapes.includes(shape) ? shape : shapes[0];
  const rec = RECS[question][activeShape];

  // Changing the question changes which data shapes are even possible, so the
  // second control is rebuilt rather than left showing a stale option.
  const chooseQuestion = (q: Question) => {
    setQuestion(q);
    const next = Object.keys(RECS[q]) as Shape[];
    if (!next.includes(activeShape)) setShape(next[0]);
  };

  if (!rec) return null;

  const fade = reduced ? '' : 'transition-opacity duration-200';

  return (
    <WidgetShell
      takeaway="The chart is mostly decided before you open a plotting library: name the question, name the column types, and one form usually wins. The wrong chart is rarely ugly — it is readable, confident and quietly misleading."
      controls={
        <>
          <Toggle
            label="1. What are you asking?"
            value={question}
            onChange={(v) => chooseQuestion(v as Question)}
            options={QUESTION_OPTIONS.map((q) => ({ value: q.value, label: q.label }))}
          />
          <p className="-mt-1 text-[11.5px] text-subtle">
            {QUESTION_OPTIONS.find((q) => q.value === question)?.gloss}
          </p>
          <Toggle
            label="2. What columns do you have?"
            value={activeShape}
            onChange={(v) => setShape(v as Shape)}
            options={shapes.map((s) => ({ value: s, label: SHAPE_LABEL[s] }))}
          />
        </>
      }
    >
      <div className="p-4">
        <div key={`${question}-${activeShape}`} className={cn('space-y-3', fade)}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-success">Use this</p>
            <h3 className="mt-0.5 text-[14px] font-semibold text-ink">{rec.name}</h3>
            <p className="mt-0.5 font-mono text-[11px] text-subtle">{rec.encode}</p>
          </div>
          <div className="rounded-md border border-line bg-surface-2 px-2 py-2">
            <Chart kind={rec.chart} label={`Example of a ${rec.name}`} />
          </div>
          <p className="text-[12.5px] leading-relaxed text-muted">{rec.why}</p>
          <p className="rounded-md border-l-2 border-accent bg-surface-2/60 py-1.5 pl-2.5 pr-2 text-[12px] leading-relaxed text-muted">
            <span className="font-medium text-accent">Watch out: </span>
            {rec.care}
          </p>
        </div>
      </div>

      <div className={cn('border-t border-line bg-danger/[0.05] p-4', fade)} key={`m-${question}-${activeShape}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-danger">
          What people reach for instead
        </p>
        <h3 className="mt-0.5 text-[14px] font-semibold text-ink">{rec.mistake.name}</h3>
        <div className="mt-2 rounded-md border border-line bg-surface-2 px-2 py-2">
          <Chart kind={rec.mistake.chart} label={`The same data drawn as a ${rec.mistake.name}, which misleads`} />
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{rec.mistake.why}</p>
      </div>
    </WidgetShell>
  );
}
