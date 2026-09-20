'use client';

import * as React from 'react';
import { Readout, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * Broadcasting, read right to left.
 *
 * Every NumPy broadcasting rule a learner ever needs fits in one sentence:
 * line the shapes up by their *last* axis, and each pair must either match or
 * contain a 1. The trouble is that the sentence is invisible in code — you
 * write `a + b` and either get an array or a ValueError, with nothing in
 * between to look at.
 *
 * So this widget makes the alignment itself the object on screen. The table is
 * the rule; the grids underneath are the consequence. Cells that NumPy
 * *invented* by stretching a size-1 axis are drawn hollow and dashed, because
 * the single most useful thing to know about broadcasting is that those cells
 * do not exist in memory — nothing is copied, a stride is simply set to zero.
 *
 * The `(3,) + (3,1)` preset is here for one reason: it succeeds. It hands back
 * a 3x3 matrix when the learner wanted 3 numbers, and it does so silently.
 * That is the bug this widget is really trying to prevent.
 *
 * Nothing here is random — the cell values are np.arange-style counters — so
 * there is no seed to expose.
 */

const MAX_AXES = 4;
const MAX_DIM = 512;
/** Beyond this the grids stop being a picture and start being a wall. */
const DRAW_LIMIT = 8;

function fmtShape(s: number[]): string {
  if (s.length === 0) return '()';
  if (s.length === 1) return `(${s[0]},)`;
  return `(${s.join(', ')})`;
}

interface Pair {
  /** null means the array has no such axis, so NumPy pads it with a 1. */
  a: number | null;
  b: number | null;
  ok: boolean;
  out: number;
  reason: string;
}

/** The whole rule: pad on the left, then compare pairwise. */
function align(a: number[], b: number[]): { pairs: Pair[]; ok: boolean; out: number[] } {
  const n = Math.max(a.length, b.length);
  const pairs: Pair[] = [];
  let ok = true;

  for (let k = 0; k < n; k++) {
    const ai = k - (n - a.length);
    const bi = k - (n - b.length);
    const av = ai >= 0 ? a[ai] : null;
    const bv = bi >= 0 ? b[bi] : null;
    const ae = av ?? 1;
    const be = bv ?? 1;

    const equal = ae === be;
    const stretchA = !equal && ae === 1;
    const stretchB = !equal && be === 1;
    const good = equal || stretchA || stretchB;
    if (!good) ok = false;

    let reason: string;
    if (!good) reason = `${ae} and ${be} are neither equal nor 1`;
    else if (equal) reason = ae === 1 ? 'both 1' : `both ${ae}`;
    else if (stretchA) reason = av === null ? 'A has no axis here, so it is padded with 1 and stretched' : 'A is 1, so it is stretched';
    else reason = bv === null ? 'B has no axis here, so it is padded with 1 and stretched' : 'B is 1, so it is stretched';

    pairs.push({ a: av, b: bv, ok: good, out: Math.max(ae, be), reason });
  }

  return { pairs, ok, out: pairs.map((p) => p.out) };
}

/** C-order strides, in elements. */
function stridesOf(shape: number[]): number[] {
  const st = new Array<number>(shape.length).fill(1);
  for (let i = shape.length - 2; i >= 0; i--) st[i] = st[i + 1] * shape[i + 1];
  return st;
}

/**
 * Where a result index lands in one of the operands, and whether getting there
 * required stretching (i.e. whether this cell is a copy of a neighbour).
 */
function sourceOf(src: number[], out: number[], idx: number[]): { flat: number; copied: boolean } {
  const off = out.length - src.length;
  const st = stridesOf(src);
  let flat = 0;
  let copied = false;
  for (let k = 0; k < out.length; k++) {
    const j = k - off;
    const dim = j >= 0 ? src[j] : 1;
    if (dim === 1 && out[k] > 1 && idx[k] > 0) copied = true;
    if (j >= 0) flat += (dim === 1 ? 0 : idx[k]) * st[j];
  }
  return { flat, copied };
}

/** A values are tens, B values are units, so every sum is readable at a glance. */
const valueA = (flat: number) => (flat + 1) * 10;
const valueB = (flat: number) => flat + 1;

const PRESETS: { label: string; a: number[]; b: number[]; note: string }[] = [
  {
    label: '(3,1) + (1,4)',
    a: [3, 1],
    b: [1, 4],
    note: 'Both operands stretch, in opposite directions, and the result is bigger than either input. This is how you build a multiplication table without a loop.',
  },
  {
    label: '(3,) + (4,)',
    a: [3],
    b: [4],
    note: 'The classic failure. 3 and 4 are neither equal nor 1, so there is no honest answer and NumPy refuses.',
  },
  {
    label: '(3,) + (3,1)',
    a: [3],
    b: [3, 1],
    note: 'The trap. Nothing errors. You asked for three numbers and got a 3x3 matrix, because the (3,) was padded to (1,3) and then stretched down.',
  },
  {
    label: '(4,3) + (3,)',
    a: [4, 3],
    b: [3],
    note: 'Adding one row to every row — centring a dataset by subtracting the column means looks exactly like this.',
  },
  {
    label: '(256,256,3) + (3,)',
    a: [256, 256, 3],
    b: [3],
    note: 'Tinting an image: one RGB triple applied to all 65,536 pixels. No loop, and no second copy of the image in memory.',
  },
];

function ShapeEditor({
  name,
  shape,
  onChange,
}: {
  name: string;
  shape: number[];
  onChange: (s: number[]) => void;
}) {
  // Nothing here animates, so honouring reduced motion means dropping the
  // small colour fades on the controls rather than stopping anything.
  const ease = usePrefersReducedMotion() ? '' : 'transition-colors';
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <p className="text-[12px] font-medium text-muted">Array {name}</p>
        <span className="font-mono text-[12px] tabular-nums text-accent">{fmtShape(shape)}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {shape.map((d, i) => (
          <label
            key={i}
            className="flex items-center gap-1 rounded-md border border-line bg-surface-2 px-1.5 py-1"
          >
            <span className="text-[9.5px] uppercase tracking-[0.08em] text-subtle">
              ax{i - shape.length}
            </span>
            <input
              type="number"
              min={1}
              max={MAX_DIM}
              value={d}
              aria-label={`Array ${name}, axis ${i - shape.length} size`}
              onChange={(e) => {
                const raw = Math.round(Number(e.target.value));
                const v = Number.isFinite(raw) ? Math.max(1, Math.min(MAX_DIM, raw)) : 1;
                onChange(shape.map((x, j) => (j === i ? v : x)));
              }}
              className="w-11 bg-transparent text-right font-mono text-[12px] tabular-nums text-ink outline-none focus:text-primary-ink"
            />
          </label>
        ))}
        <button
          type="button"
          disabled={shape.length >= MAX_AXES}
          onClick={() => onChange([1, ...shape])}
          className={cn(
            'rounded-md border border-line bg-surface-2 px-2 py-1 text-[11.5px] text-muted hover:text-ink disabled:opacity-40',
            ease,
          )}
        >
          + axis
        </button>
        <button
          type="button"
          disabled={shape.length <= 1}
          onClick={() => onChange(shape.slice(1))}
          className={cn(
            'rounded-md border border-line bg-surface-2 px-2 py-1 text-[11.5px] text-muted hover:text-ink disabled:opacity-40',
            ease,
          )}
        >
          − axis
        </button>
      </div>
    </div>
  );
}

/** One grid of cells, drawn at the *result* shape so stretching is visible. */
function StretchGrid({
  title,
  src,
  out,
  label,
  kind,
}: {
  title: string;
  src: number[];
  out: number[];
  label: string;
  kind: 'a' | 'b';
}) {
  const cols = out.length === 0 ? 1 : out[out.length - 1];
  const rows = out.length >= 2 ? out[out.length - 2] : 1;
  const lead = out.slice(0, Math.max(0, out.length - 2));
  const leadIsBig = lead.some((d) => d > 1);

  const cells: { text: string; copied: boolean }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = out.length === 1 ? [c] : [...lead.map(() => 0), r, c];
      const s = sourceOf(src, out, idx);
      cells.push({ text: String(kind === 'a' ? valueA(s.flat) : valueB(s.flat)), copied: s.copied });
    }
  }

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">{title}</p>
        <p className="font-mono text-[11px] tabular-nums text-muted">{label}</p>
      </div>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: cols * 46 }}
        role="img"
        aria-label={`${title}: ${rows} by ${cols} grid`}
      >
        {cells.map((cell, i) => (
          <span
            key={i}
            className={cn(
              'flex h-8 items-center justify-center rounded-[5px] border font-mono text-[11px] tabular-nums',
              cell.copied
                ? 'border-dashed border-line-strong bg-transparent text-subtle'
                : 'border-line bg-surface-2 text-ink',
            )}
          >
            {cell.text}
          </span>
        ))}
      </div>
      {leadIsBig && (
        <p className="mt-1 text-[11px] text-subtle">Showing index 0 along the leading axes.</p>
      )}
    </div>
  );
}

export default function Broadcasting({ props }: { props?: Record<string, unknown> }) {
  void props;
  const ease = usePrefersReducedMotion() ? '' : 'transition-colors';
  const [a, setA] = React.useState<number[]>([3, 1]);
  const [b, setB] = React.useState<number[]>([1, 4]);
  const [note, setNote] = React.useState(PRESETS[0].note);

  const { pairs, ok, out } = React.useMemo(() => align(a, b), [a, b]);

  const cols = out.length === 0 ? 1 : out[out.length - 1];
  const rows = out.length >= 2 ? out[out.length - 2] : 1;
  const drawable = ok && rows <= DRAW_LIMIT && cols <= DRAW_LIMIT;

  const outSize = out.reduce((x, y) => x * y, 1);
  const inSize = a.reduce((x, y) => x * y, 1) + b.reduce((x, y) => x * y, 1);

  /** The message NumPy actually prints, trailing space and all. */
  const errorText = `ValueError: operands could not be broadcast together with shapes ${fmtShape(a).replace(/, /g, ',')} ${fmtShape(b).replace(/, /g, ',')} `;

  const sumCells = React.useMemo(() => {
    if (!drawable) return [];
    const lead = out.slice(0, Math.max(0, out.length - 2));
    const list: string[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = out.length === 1 ? [c] : [...lead.map(() => 0), r, c];
        const sa = sourceOf(a, out, idx);
        const sb = sourceOf(b, out, idx);
        list.push(String(valueA(sa.flat) + valueB(sb.flat)));
      }
    }
    return list;
  }, [drawable, out, rows, cols, a, b]);

  return (
    <WidgetShell
      takeaway="Shapes are compared from the right, and a 1 is a licence to stretch. The dangerous case is not the ValueError — it is (3,) + (3,1), which succeeds and hands you a 3x3 matrix you never asked for."
      readout={
        <Readout
          items={[
            { label: 'A', value: fmtShape(a) },
            { label: 'B', value: fmtShape(b) },
            {
              label: 'result',
              value: ok ? fmtShape(out) : 'ValueError',
              tone: ok ? 'good' : 'bad',
            },
            { label: 'elements in / out', value: ok ? `${inSize} → ${outSize}` : '—' },
          ]}
        />
      }
      controls={
        <>
          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">Presets</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setA(p.a);
                    setB(p.b);
                    setNote(p.note);
                  }}
                  className={cn(
                    'rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11.5px] text-muted hover:border-line-strong hover:text-ink',
                    ease,
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <ShapeEditor name="A" shape={a} onChange={(s) => setA(s)} />
          <ShapeEditor name="B" shape={b} onChange={(s) => setB(s)} />
          <p className="text-[11.5px] leading-relaxed text-subtle">{note}</p>
        </>
      }
    >
      {/* The rule itself: shapes right-aligned, one verdict per axis pair. */}
      <div className="p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
          Aligned from the right
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-0 text-[12px]">
            <caption className="sr-only">Axis-by-axis broadcast compatibility, aligned from the trailing axis</caption>
            <thead>
              <tr className="text-right text-subtle">
                <th scope="col" className="py-1 pr-3 text-left font-medium">
                  axis
                </th>
                {pairs.map((_, i) => (
                  <th key={i} scope="col" className="py-1 pl-3 font-mono font-medium tabular-nums">
                    {i - pairs.length}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="text-right">
                <th scope="row" className="py-1.5 pr-3 text-left font-medium text-muted">
                  A
                </th>
                {pairs.map((p, i) => (
                  <td key={i} className={cn('py-1.5 pl-3 font-mono tabular-nums', p.a === null ? 'text-subtle' : 'text-ink')}>
                    {p.a === null ? '1*' : p.a}
                  </td>
                ))}
              </tr>
              <tr className="text-right">
                <th scope="row" className="py-1.5 pr-3 text-left font-medium text-muted">
                  B
                </th>
                {pairs.map((p, i) => (
                  <td key={i} className={cn('py-1.5 pl-3 font-mono tabular-nums', p.b === null ? 'text-subtle' : 'text-ink')}>
                    {p.b === null ? '1*' : p.b}
                  </td>
                ))}
              </tr>
              <tr className="text-right">
                <th scope="row" className="py-1.5 pr-3 text-left font-medium text-muted">
                  compatible
                </th>
                {pairs.map((p, i) => (
                  <td
                    key={i}
                    className={cn('py-1.5 pl-3 font-mono text-[13px]', p.ok ? 'text-success' : 'text-danger')}
                  >
                    {p.ok ? 'yes' : 'no'}
                  </td>
                ))}
              </tr>
              <tr className="text-right">
                <th scope="row" className="py-1.5 pr-3 text-left font-medium text-muted">
                  result
                </th>
                {pairs.map((p, i) => (
                  <td
                    key={i}
                    className={cn(
                      'py-1.5 pl-3 font-mono font-semibold tabular-nums',
                      p.ok ? 'text-primary-ink' : 'text-subtle',
                    )}
                  >
                    {p.ok ? p.out : '—'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-subtle">
          <span className="font-mono">1*</span> marks an axis the array does not have. NumPy pads the shorter shape on
          the left with 1s before comparing — which is why a 1-D array is a <em>row</em>, never a column.
        </p>
        <ul className="mt-2 space-y-0.5">
          {pairs.map((p, i) => (
            <li key={i} className="text-[11.5px] leading-relaxed">
              <span className="font-mono text-subtle">axis {i - pairs.length}: </span>
              <span className={p.ok ? 'text-muted' : 'text-danger'}>{p.reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The consequence. */}
      {ok ? (
        <div className="space-y-3 border-t border-line p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
            What the operands look like once stretched
          </p>
          {drawable ? (
            <>
              <StretchGrid title="A" src={a} out={out} label={`${fmtShape(a)} → ${fmtShape(out)}`} kind="a" />
              <p className="text-center font-mono text-[15px] text-muted">+</p>
              <StretchGrid title="B" src={b} out={out} label={`${fmtShape(b)} → ${fmtShape(out)}`} kind="b" />
              <p className="text-center font-mono text-[15px] text-muted">=</p>
              <div>
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">A + B</p>
                  <p className="font-mono text-[11px] tabular-nums text-primary-ink">{fmtShape(out)}</p>
                </div>
                <div
                  className="grid gap-1"
                  style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: cols * 46 }}
                  role="img"
                  aria-label={`Result grid of shape ${fmtShape(out)}`}
                >
                  {sumCells.map((t, i) => (
                    <span
                      key={i}
                      className="flex h-8 items-center justify-center rounded-[5px] border border-primary/40 bg-primary/10 font-mono text-[11px] font-semibold tabular-nums text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11.5px] leading-relaxed text-subtle">
                Dashed hollow cells are the stretched ones. They are not in memory: NumPy sets that axis&apos;s stride
                to zero and reads the same element over and over, which is why broadcasting costs no extra RAM.
              </p>
            </>
          ) : (
            <p className="rounded-md border border-line bg-surface-2 p-3 text-[11.5px] leading-relaxed text-muted">
              The result is {fmtShape(out)} — {outSize.toLocaleString('en-US')} elements, too many to draw cell by cell.
              The rule is the same at any size: {fmtShape(b)} is padded and stretched across every one of them, and no
              copy is made. Pick a smaller preset to see the cells.
            </p>
          )}
        </div>
      ) : (
        <div className="border-t border-line bg-danger/[0.06] p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-danger">
            What Python prints
          </p>
          <pre className="overflow-x-auto rounded-md border border-line bg-surface-2 p-2.5 font-mono text-[11px] leading-relaxed text-muted">
{`>>> a = np.ones(${fmtShape(a).replace(/, /g, ', ')})
>>> b = np.ones(${fmtShape(b).replace(/, /g, ', ')})
>>> a + b
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
`}<span className="text-danger">{errorText}</span>
          </pre>
          <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
            The fix is almost always to give one array an explicit axis of length 1 — <code className="font-mono text-accent">b[:, None]</code> or{' '}
            <code className="font-mono text-accent">b.reshape(-1, 1)</code> — so that the trailing pair contains a 1
            and the rule has something to work with.
          </p>
        </div>
      )}
    </WidgetShell>
  );
}
