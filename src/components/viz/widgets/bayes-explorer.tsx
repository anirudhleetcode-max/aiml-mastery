'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, Toggle, VIZ, WidgetShell, useResponsiveCanvas } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Bayes' theorem as ten thousand people rather than four symbols.
 *
 * The medical-test problem is the one result in probability that almost
 * everybody, including clinicians, gets wrong: told a test is 99% accurate and
 * the result is positive, people answer "99%" when the truth for a 1-in-1000
 * disease is about 9%. Symbols do not fix this. Counting people does.
 *
 * So the widget commits to a fixed population of 10,000 and never leaves it.
 * The grid shows every one of them; the bar under it keeps only the ones who
 * tested positive, which *is* the posterior — the length of the true-positive
 * stripe divided by the length of the bar. The sampler at the bottom pulls
 * random people out of the positive column one at a time, so the abstract
 * ratio arrives as a tally of actual outcomes.
 *
 * Every quantity in Bayes' rule is on screen and named: the prior is the
 * diseased block, the likelihood is the fraction of it the test catches, the
 * evidence is the whole positive bar, the posterior is the stripe.
 */

/** Small, fast, seeded PRNG, so a shared screenshot shows the same people. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Resolves a design token to something a canvas can paint, following nested var() indirection. */
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

const POP = 10_000;
const COLS = 100;

interface Counts {
  sick: number;
  well: number;
  tp: number;
  fn: number;
  fp: number;
  tn: number;
}

function countsFor(prevalence: number, sensitivity: number, specificity: number): Counts {
  const sick = Math.round(POP * prevalence);
  const well = POP - sick;
  const tp = Math.round(sick * sensitivity);
  const fn = sick - tp;
  const tn = Math.round(well * specificity);
  const fp = well - tn;
  return { sick, well, tp, fn, fp, tn };
}

/**
 * Cell order, read left-to-right and top-to-bottom: true positives, then false
 * negatives, then false positives, then everybody who is correctly cleared.
 * Grouping this way turns the prevalence into a visible block at the top and
 * the false positives into the band that dwarfs it.
 */
type Group = 'tp' | 'fn' | 'fp' | 'tn';

const GROUP_LABEL: Record<Group, string> = {
  tp: 'True positive — has the disease, test says positive',
  fn: 'False negative — has the disease, test says negative',
  fp: 'False positive — healthy, test says positive',
  tn: 'True negative — healthy, test says negative',
};

const PRESETS = [
  { key: 'classic', label: 'Classic 1-in-1000', prevalence: 0.001, sensitivity: 0.99, specificity: 0.99 },
  { key: 'screening', label: 'Breast screening', prevalence: 0.004, sensitivity: 0.87, specificity: 0.89 },
  { key: 'common', label: 'Common condition', prevalence: 0.2, sensitivity: 0.95, specificity: 0.9 },
  { key: 'perfect', label: 'Perfectly specific', prevalence: 0.001, sensitivity: 0.99, specificity: 1 },
];

function pct(v: number, digits = 2): string {
  return `${(v * 100).toFixed(digits)}%`;
}

export default function BayesExplorer() {
  const reduced = usePrefersReducedMotion();
  const [prevalence, setPrevalence] = React.useState(0.001);
  const [sensitivity, setSensitivity] = React.useState(0.99);
  const [specificity, setSpecificity] = React.useState(0.99);
  const [view, setView] = React.useState('all');
  const [seed, setSeed] = React.useState(3);
  const [drawn, setDrawn] = React.useState<{ index: number; group: Group }[]>([]);
  const [playing, setPlaying] = React.useState(false);

  const c = React.useMemo(
    () => countsFor(prevalence, sensitivity, specificity),
    [prevalence, sensitivity, specificity],
  );

  const positives = c.tp + c.fp;
  // Bayes, written as counts: posterior = true positives / everyone who tested positive.
  const posterior = positives > 0 ? c.tp / positives : 0;
  const evidence = positives / POP;
  const negatives = POP - positives;
  const posteriorNeg = negatives > 0 ? c.fn / negatives : 0;
  const lrPos = specificity < 1 ? sensitivity / (1 - specificity) : Infinity;
  const priorOdds = prevalence < 1 ? prevalence / (1 - prevalence) : Infinity;

  const rngRef = React.useRef<() => number>(mulberry32(3));

  const resetDraws = React.useCallback(() => {
    rngRef.current = mulberry32(seed);
    setDrawn([]);
    setPlaying(false);
  }, [seed]);

  // A different population is a different experiment; the old tally is void.
  React.useEffect(() => {
    rngRef.current = mulberry32(seed);
    setDrawn([]);
    setPlaying(false);
  }, [seed, prevalence, sensitivity, specificity]);

  /** Pull one person at random out of the column of positive results. */
  const drawPositive = React.useCallback(() => {
    if (positives === 0) return;
    const r = rngRef.current();
    const offset = Math.floor(r * positives);
    // Positives are the true positives, then the false positives further down.
    const index = offset < c.tp ? offset : c.tp + c.fn + (offset - c.tp);
    const group: Group = offset < c.tp ? 'tp' : 'fp';
    setDrawn((prev) => [...prev.slice(-59), { index, group }]);
  }, [positives, c.tp, c.fn]);

  React.useEffect(() => {
    if (!playing || reduced) return;
    if (drawn.length >= 60) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(drawPositive, 180);
    return () => window.clearTimeout(id);
  }, [playing, reduced, drawn.length, drawPositive]);

  React.useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const drawnSick = drawn.filter((d) => d.group === 'tp').length;
  const latest = drawn.length > 0 ? drawn[drawn.length - 1] : null;

  /* --------------------------------------------------------------- grid --- */

  const grid = useResponsiveCanvas(
    (ctx, w, h) => {
      if (w <= 0 || h <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const tpCol = resolve('var(--viz-cat-review)', '#d95926');
      const fnCol = resolve('var(--viz-series)', '#8164f7');
      const fpCol = resolve('var(--viz-cat-learning)', '#3987e5');
      const tnCol = resolve('var(--viz-cat-none)', '#7c8496');

      // Reserve room above the grid for its caption, which was being clipped
      // against the top edge.
      const CAPTION = 16;
      const side = Math.min(w - 8, h - 8 - CAPTION);
      const cell = side / COLS;
      // A gap between squares only reads as a gap when there is room for one.
      // Below ~4px the inset plus antialiasing ate most of the fill and the
      // whole population block looked like empty space.
      const inset = cell >= 4 ? 0.3 : 0;
      const x0 = (w - side) / 2;
      const y0 = CAPTION + (h - CAPTION - side) / 2;

      const dim = view === 'positive';
      const order: Group[] = ['tn', 'fp', 'fn', 'tp'];
      const colours: Record<Group, string> = { tp: tpCol, fn: fnCol, fp: fpCol, tn: tnCol };
      const counts: Record<Group, number> = { tp: c.tp, fn: c.fn, fp: c.fp, tn: c.tn };
      const starts: Record<Group, number> = { tp: 0, fn: c.tp, fp: c.tp + c.fn, tn: c.tp + c.fn + c.fp };

      // One fill per group rather than ten thousand, so dragging a slider is cheap.
      for (const g of order) {
        if (counts[g] === 0) continue;
        ctx.fillStyle = colours[g];
        // The true negatives are the bulk of the population, so they have to
        // be visible as a block — at 0.35 on a dark surface the whole grid
        // read as empty.
        ctx.globalAlpha = dim && (g === 'tn' || g === 'fn') ? 0.22 : g === 'tn' ? 0.8 : 1;
        ctx.beginPath();
        for (let i = starts[g]; i < starts[g] + counts[g]; i++) {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          ctx.rect(x0 + col * cell + inset, y0 + row * cell + inset, cell - inset * 2, cell - inset * 2);
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Rule under the diseased block: the prior, drawn as a boundary.
      if (c.sick > 0 && c.sick < POP) {
        const rowOfBoundary = (c.tp + c.fn) / COLS;
        ctx.strokeStyle = axis;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x0, y0 + rowOfBoundary * cell);
        ctx.lineTo(x0 + side, y0 + rowOfBoundary * cell);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Whoever was last pulled out of the positive column gets a ring.
      if (latest) {
        const col = latest.index % COLS;
        const row = Math.floor(latest.index / COLS);
        ctx.strokeStyle = axis;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(x0 + (col + 0.5) * cell, y0 + (row + 0.5) * cell, Math.max(3, cell * 1.6), 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = axis;
      ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('10,000 people · 1 square = 1 person', x0, y0 - 5);
    },
    [c, view, latest],
  );

  /* ------------------------------------------- the bar of positive tests --- */

  const bar = useResponsiveCanvas(
    (ctx, w, h) => {
      if (w <= 0 || h <= 0) return;
      const resolve = makeResolve();
      const axis = resolve('var(--viz-axis)', 'rgba(128,128,128,0.9)');
      const tpCol = resolve('var(--viz-cat-review)', '#d95926');
      const fpCol = resolve('var(--viz-cat-learning)', '#3987e5');

      const pad = 12;
      const barW = w - pad * 2;
      const barY = 22;
      const barH = Math.max(16, h - barY - 26);
      if (barW <= 0) return;

      if (positives === 0) {
        ctx.fillStyle = axis;
        ctx.font = '12px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Nobody tests positive with these settings', w / 2, h / 2);
        return;
      }

      const tpW = (c.tp / positives) * barW;
      ctx.fillStyle = tpCol;
      ctx.fillRect(pad, barY, tpW, barH);
      ctx.fillStyle = fpCol;
      ctx.fillRect(pad + tpW, barY, barW - tpW, barH);

      ctx.fillStyle = axis;
      ctx.font = '10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Everyone who tested positive: ${positives.toLocaleString('en-US')} people`, pad, 13);

      // Labels go inside the stripe when it is wide enough, underneath when it is a sliver.
      ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif';
      const tpLabel = `${c.tp.toLocaleString('en-US')} really ill (${pct(posterior, 1)})`;
      const fpLabel = `${c.fp.toLocaleString('en-US')} false alarms (${pct(1 - posterior, 1)})`;
      if (tpW > ctx.measureText(tpLabel).width + 14) {
        ctx.fillStyle = resolve('var(--viz-seq-0)', '#111');
        ctx.textAlign = 'left';
        ctx.fillText(tpLabel, pad + 7, barY + barH / 2 + 4);
      } else {
        ctx.fillStyle = tpCol;
        ctx.textAlign = 'left';
        ctx.fillText(tpLabel, pad, barY + barH + 15);
        ctx.strokeStyle = tpCol;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad + Math.max(0.8, tpW), barY + barH);
        ctx.lineTo(pad + 2, barY + barH + 5);
        ctx.stroke();
      }
      if (barW - tpW > ctx.measureText(fpLabel).width + 14) {
        ctx.fillStyle = resolve('var(--viz-seq-0)', '#111');
        ctx.textAlign = 'right';
        ctx.fillText(fpLabel, pad + barW - 7, barY + barH / 2 + 4);
      } else {
        ctx.fillStyle = fpCol;
        ctx.textAlign = 'right';
        ctx.fillText(fpLabel, pad + barW, barY + barH + 15);
      }
    },
    [c, positives, posterior],
  );

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setPrevalence(p.prevalence);
    setSensitivity(p.sensitivity);
    setSpecificity(p.specificity);
  };

  return (
    <WidgetShell
      takeaway="With the classic preset the test is right 99% of the time and a positive result still means only a 9% chance of being ill: the 10 people the test catches are buried among the 100 healthy people it wrongly flags. A test result does not replace the base rate, it updates it — posterior odds = prior odds × likelihood ratio — so when the prior is tiny, even strong evidence leaves it small."
      readout={
        <Readout
          items={[
            { label: 'Prior P(D)', value: pct(prevalence, 2) },
            { label: 'Likelihood P(+|D)', value: pct(sensitivity, 1) },
            { label: 'Evidence P(+)', value: pct(evidence, 2) },
            { label: 'Posterior P(D|+)', value: pct(posterior, 1), tone: posterior < 0.5 ? 'warn' : 'good' },
            { label: 'P(D|−)', value: pct(posteriorNeg, 3), tone: 'good' },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESETS.map((p) => {
              const active =
                Math.abs(p.prevalence - prevalence) < 1e-9 &&
                Math.abs(p.sensitivity - sensitivity) < 1e-9 &&
                Math.abs(p.specificity - specificity) < 1e-9;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => applyPreset(p)}
                  aria-pressed={active}
                  className={`rounded-md border border-line px-2.5 py-1 text-[12px] font-medium transition-colors ${
                    active ? 'bg-primary/10 text-primary-ink' : 'bg-surface-2 text-muted hover:text-ink'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
          <Slider
            label="Prevalence — the prior P(disease)"
            value={Math.log10(prevalence)}
            min={-4}
            max={-0.3}
            step={0.01}
            onChange={(v) => setPrevalence(Number(Math.pow(10, v).toFixed(5)))}
            format={() => `${pct(prevalence, 2)} · ${Math.round(POP * prevalence).toLocaleString('en-US')} of 10,000`}
            hint="Logarithmic, because the interesting range runs from 1 in 10,000 to 1 in 2."
          />
          <Slider
            label="Sensitivity — P(positive | disease)"
            value={sensitivity}
            min={0.5}
            max={1}
            step={0.005}
            onChange={setSensitivity}
            format={(v) => pct(v, 1)}
          />
          <Slider
            label="Specificity — P(negative | no disease)"
            value={specificity}
            min={0.5}
            max={1}
            step={0.005}
            onChange={setSpecificity}
            format={(v) => pct(v, 1)}
            hint="This is the slider that matters. One point of specificity costs 99 false alarms per 10,000 people."
          />
          <Toggle
            label="Grid view"
            value={view}
            onChange={setView}
            options={[
              { value: 'all', label: 'Everyone' },
              { value: 'positive', label: 'Dim the negatives' },
            ]}
          />
          <div className="flex flex-wrap items-center gap-1.5">
            {reduced ? (
              <button
                type="button"
                onClick={drawPositive}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
              >
                Draw a positive result
              </button>
            ) : (
              <PlayButton
                playing={playing}
                onToggle={() => setPlaying((v) => !v)}
                onStep={drawPositive}
                onReset={resetDraws}
                label="drawing positive results"
              />
            )}
            {reduced && (
              <button
                type="button"
                onClick={resetDraws}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={() => setSeed((s) => (s % 997) + 1)}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
            >
              New sample (seed {seed})
            </button>
          </div>
        </>
      }
    >
      <div className="h-[20rem] w-full sm:h-[26rem]">
        <canvas
          ref={grid.canvasRef}
          className="block"
          role="img"
          aria-label={`Grid of 10,000 people: ${c.tp} true positives, ${c.fn} false negatives, ${c.fp} false positives, ${c.tn} true negatives. ${pct(posterior, 1)} of positive results are genuine.`}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-line px-4 py-3 text-[11.5px]">
        {(['tp', 'fn', 'fp', 'tn'] as Group[]).map((g) => {
          const swatch = { tp: VIZ.warn, fn: VIZ.series, fp: VIZ.info, tn: VIZ.muted }[g];
          const count = { tp: c.tp, fn: c.fn, fp: c.fp, tn: c.tn }[g];
          const short = { tp: 'True positive', fn: 'False negative', fp: 'False positive', tn: 'True negative' }[g];
          return (
            <div key={g} className="flex items-center gap-2" title={GROUP_LABEL[g]}>
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-[3px]"
                style={{ backgroundColor: swatch, opacity: g === 'tn' ? 0.45 : 1 }}
                aria-hidden
              />
              <span className="text-subtle">{short}</span>
              <span className="ml-auto font-mono tabular-nums text-ink">{count.toLocaleString('en-US')}</span>
            </div>
          );
        })}
      </div>

      <div className="h-24 w-full border-t border-line">
        <canvas
          ref={bar.canvasRef}
          className="block"
          role="img"
          aria-label={`Of ${positives.toLocaleString('en-US')} positive results, ${c.tp.toLocaleString('en-US')} are genuine and ${c.fp.toLocaleString('en-US')} are false alarms`}
        />
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          People pulled at random from the positive column
        </p>
        {drawn.length === 0 ? (
          <p className="text-[12px] text-subtle">
            Nobody drawn yet. Each draw picks one person uniformly from everyone whose test came back positive.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-1" aria-label="Most recent draws, newest at the right">
              {drawn.map((d, i) => (
                <span
                  key={`${i}-${d.index}`}
                  title={GROUP_LABEL[d.group]}
                  className={`inline-flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-semibold ${
                    d.group === 'tp' ? 'bg-warning/20 text-warning' : 'bg-info/15 text-info'
                  }`}
                >
                  {d.group === 'tp' ? 'D' : 'H'}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
              {drawnSick} of {drawn.length} drawn ({pct(drawnSick / drawn.length, 0)}) actually have the disease. D = has
              the disease, H = healthy. The long-run share is the posterior, {pct(posterior, 1)}.
            </p>
          </>
        )}
      </div>

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          The same answer, four ways
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <tbody className="divide-y divide-line">
              <tr>
                <td className="py-1.5 pr-3 text-subtle">Counting people</td>
                <td className="py-1.5 font-mono tabular-nums text-ink">
                  {c.tp.toLocaleString('en-US')} ÷ {positives.toLocaleString('en-US')} = {pct(posterior, 1)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 text-subtle">Bayes&apos; rule</td>
                <td className="py-1.5 font-mono tabular-nums text-ink">
                  {pct(sensitivity, 1)} × {pct(prevalence, 2)} ÷ {pct(evidence, 2)} = {pct(posterior, 1)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 text-subtle">Odds form</td>
                <td className="py-1.5 font-mono tabular-nums text-ink">
                  {priorOdds < 1 ? `1 : ${Math.round(1 / priorOdds).toLocaleString('en-US')}` : priorOdds.toFixed(2)}{' '}
                  × LR+ {Number.isFinite(lrPos) ? lrPos.toFixed(1) : '∞'} = {pct(posterior, 1)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 text-subtle">False alarms per catch</td>
                <td className="py-1.5 font-mono tabular-nums text-ink">
                  {c.tp > 0 ? `${(c.fp / c.tp).toFixed(1)} healthy people flagged per genuine case` : 'no genuine cases caught'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The evidence term P(+) is just the whole positive bar — the normaliser that turns a likelihood into a
          probability. Push specificity to 100% and the false alarms vanish, which is why screening programmes are
          designed around specificity, not accuracy.
        </p>
      </div>
    </WidgetShell>
  );
}
