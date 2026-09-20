'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, WidgetShell } from './shared';
import { cn } from '@/lib/cn';

/**
 * What "three-dimensional" actually means.
 *
 * A NumPy array is a flat block of bytes plus a rule for reading it. The rule
 * is the shape and the strides; everything else — rows, columns, slices — is
 * how we choose to draw that rule on a page. So this widget always shows two
 * pictures of the same array at once: the nested boxes a learner imagines, and
 * the single flat buffer the machine actually holds. Clicking a cell links the
 * two: index tuple on one side, one integer offset on the other.
 *
 * The memory-order toggle is the payoff. Nothing about the boxes changes when
 * you switch C to Fortran order, but the flat buffer is rebuilt in a different
 * sequence — which is the clearest demonstration that shape is a view, not a
 * container.
 */

const DTYPES = [
  { value: 'int8', label: 'int8', itemsize: 1 },
  { value: 'int32', label: 'int32', itemsize: 4 },
  { value: 'float32', label: 'float32', itemsize: 4 },
  { value: 'float64', label: 'float64', itemsize: 8 },
] as const;

type DtypeName = (typeof DTYPES)[number]['value'];
type Order = 'C' | 'F';

/** Element strides, in elements (not bytes), for the given memory order. */
function stridesOf(shape: number[], order: Order): number[] {
  const st = new Array<number>(shape.length).fill(1);
  if (order === 'C') {
    for (let i = shape.length - 2; i >= 0; i--) st[i] = st[i + 1] * shape[i + 1];
  } else {
    for (let i = 1; i < shape.length; i++) st[i] = st[i - 1] * shape[i - 1];
  }
  return st;
}

function dot(idx: number[], st: number[]): number {
  let sum = 0;
  for (let i = 0; i < idx.length; i++) sum += idx[i] * st[i];
  return sum;
}

function fmtShape(shape: number[]): string {
  return shape.length === 1 ? `(${shape[0]},)` : `(${shape.join(', ')})`;
}

function fmtBytes(n: number): string {
  return n < 1024 ? `${n} B` : `${(n / 1024).toFixed(1)} KB`;
}

const PRESETS: { label: string; ndim: 1 | 2 | 3; slices: number; rows: number; cols: number; note: string }[] = [
  { label: '(3,)', ndim: 1, slices: 2, rows: 3, cols: 3, note: 'A vector. One axis, three numbers in a line.' },
  { label: '(2, 3)', ndim: 2, slices: 2, rows: 2, cols: 3, note: 'A matrix. Two rows of three — the shape of a small table.' },
  { label: '(2, 3, 4)', ndim: 3, slices: 2, rows: 3, cols: 4, note: 'Two 3×4 matrices stacked. The first axis picks which matrix.' },
  { label: '(4, 4)', ndim: 2, slices: 2, rows: 4, cols: 4, note: 'A square matrix. Rows and columns are just axes 0 and 1.' },
];

export default function NdarrayExplorer() {
  const [ndim, setNdim] = React.useState<1 | 2 | 3>(3);
  const [slices, setSlices] = React.useState(2);
  const [rows, setRows] = React.useState(3);
  const [cols, setCols] = React.useState(4);
  const [dtype, setDtype] = React.useState<DtypeName>('int32');
  const [order, setOrder] = React.useState<Order>('C');
  const [rawSel, setRawSel] = React.useState({ s: 0, r: 0, c: 0 });
  const [note, setNote] = React.useState(PRESETS[2].note);

  // The drawing is always a stack of grids; lower dimensions simply collapse
  // the unused axes to a single slice or a single row.
  const nSlices = ndim === 3 ? slices : 1;
  const nRows = ndim >= 2 ? rows : 1;
  const nCols = cols;

  const shape = React.useMemo<number[]>(
    () => (ndim === 1 ? [nCols] : ndim === 2 ? [nRows, nCols] : [nSlices, nRows, nCols]),
    [ndim, nSlices, nRows, nCols],
  );

  const sel = {
    s: Math.min(rawSel.s, nSlices - 1),
    r: Math.min(rawSel.r, nRows - 1),
    c: Math.min(rawSel.c, nCols - 1),
  };

  const size = shape.reduce((a, b) => a * b, 1);
  const itemsize = DTYPES.find((d) => d.value === dtype)!.itemsize;
  const memStrides = stridesOf(shape, order);
  const cStrides = stridesOf(shape, 'C');

  /** Index tuple for a cell of the drawing, in the current number of dimensions. */
  const tupleOf = React.useCallback(
    (s: number, r: number, c: number): number[] => (ndim === 1 ? [c] : ndim === 2 ? [r, c] : [s, r, c]),
    [ndim],
  );

  // The array holds np.arange(size).reshape(shape), so an element's *value* is
  // its C-order position and its *offset* depends on the memory order. When the
  // two disagree, the flat strip below shows exactly how.
  const valueAt = (s: number, r: number, c: number) => dot(tupleOf(s, r, c), cStrides);
  const offsetAt = (s: number, r: number, c: number) => dot(tupleOf(s, r, c), memStrides);

  /** buffer[offset] = the value stored there, plus the axis-0 index it came from. */
  const buffer = React.useMemo(() => {
    const buf: { value: number; group: number }[] = new Array(size);
    for (let s = 0; s < nSlices; s++) {
      for (let r = 0; r < nRows; r++) {
        for (let c = 0; c < nCols; c++) {
          const idx = ndim === 1 ? [c] : ndim === 2 ? [r, c] : [s, r, c];
          buf[dot(idx, memStrides)] = { value: dot(idx, cStrides), group: idx[0] };
        }
      }
    }
    return buf;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, nSlices, nRows, nCols, ndim, order]);

  const selTuple = tupleOf(sel.s, sel.r, sel.c);
  const selValue = valueAt(sel.s, sel.r, sel.c);
  const selOffset = offsetAt(sel.s, sel.r, sel.c);

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setNdim(p.ndim);
    setSlices(p.slices);
    setRows(p.rows);
    setCols(p.cols);
    setRawSel({ s: 0, r: 0, c: 0 });
    setNote(p.note);
  };

  const cellSizeClass = nCols > 4 ? 'text-[10px]' : 'text-[11px]';

  const renderGrid = (s: number) => (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${nCols}, minmax(0, 1fr))` }}
      role="group"
      aria-label={ndim === 3 ? `Slice ${s} of the array` : 'Array elements'}
    >
      {Array.from({ length: nRows }, (_, r) =>
        Array.from({ length: nCols }, (_, c) => {
          const isSel = s === sel.s && r === sel.r && c === sel.c;
          const tuple = tupleOf(s, r, c);
          return (
            <button
              key={`${r}-${c}`}
              type="button"
              onClick={() => setRawSel({ s, r, c })}
              aria-pressed={isSel}
              aria-label={`Index ${tuple.join(', ')}, value ${valueAt(s, r, c)}`}
              className={cn(
                'flex aspect-square items-center justify-center rounded-[5px] border font-mono tabular-nums transition-colors',
                cellSizeClass,
                isSel
                  ? 'border-primary bg-primary/20 font-semibold text-ink ring-1 ring-primary'
                  : 'border-line bg-surface-2 text-muted hover:border-line-strong hover:text-ink',
              )}
            >
              {valueAt(s, r, c)}
            </button>
          );
        }),
      )}
    </div>
  );

  return (
    <WidgetShell
      takeaway="A shape is not a container — it is a rule for turning an index tuple into one offset into a single flat run of memory. Switch the order from C to Fortran and the boxes above stay put while the buffer below is rewritten: that gap is where most NumPy confusion lives."
      readout={
        <Readout
          items={[
            { label: 'shape', value: fmtShape(shape) },
            { label: 'ndim', value: String(shape.length) },
            { label: 'size', value: String(size) },
            { label: 'dtype', value: dtype },
            { label: 'itemsize', value: `${itemsize} B` },
            { label: 'nbytes', value: fmtBytes(size * itemsize) },
          ]}
        />
      }
      controls={
        <>
          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">Common shapes</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <Toggle
            label="Number of axes"
            value={String(ndim)}
            onChange={(v) => {
              setNdim(Number(v) as 1 | 2 | 3);
              setNote(
                Number(v) === 1
                  ? 'One axis: position is a single number.'
                  : Number(v) === 2
                    ? 'Two axes: row then column.'
                    : 'Three axes: slice, then row, then column.',
              );
            }}
            options={[
              { value: '1', label: '1D' },
              { value: '2', label: '2D' },
              { value: '3', label: '3D' },
            ]}
          />
          {ndim === 3 && (
            <Slider
              label="Axis 0 — how many slices"
              value={slices}
              min={1}
              max={4}
              onChange={setSlices}
              hint="Each slice is one whole matrix. Indexing with a[k] hands you the k-th one."
            />
          )}
          {ndim >= 2 && (
            <Slider label={`Axis ${ndim - 2} — rows per slice`} value={rows} min={1} max={5} onChange={setRows} />
          )}
          <Slider
            label={`Axis ${ndim - 1} — columns (the last, fastest-moving axis)`}
            value={cols}
            min={1}
            max={6}
            onChange={setCols}
          />
          <Toggle
            label="dtype"
            value={dtype}
            onChange={(v) => setDtype(v as DtypeName)}
            options={DTYPES.map((d) => ({ value: d.value, label: d.label }))}
          />
          <Toggle
            label="Memory order"
            value={order}
            onChange={(v) => setOrder(v as Order)}
            options={[
              { value: 'C', label: 'C (row-major)' },
              { value: 'F', label: 'Fortran (column-major)' },
            ]}
          />
        </>
      }
    >
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="font-mono text-[12.5px] text-ink">
            np.arange({size}).reshape{fmtShape(shape)}
          </p>
          <p className="text-[11.5px] text-subtle">{note}</p>
        </div>

        {/* The nested picture: a stack of grids, each grid a stack of rows. */}
        <div className="space-y-2">
          {Array.from({ length: nSlices }, (_, s) => (
            <div key={s} className={ndim === 3 ? 'flex items-start gap-2' : undefined}>
              {ndim === 3 && (
                <span
                  className={cn(
                    'mt-1 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums',
                    s === sel.s ? 'border-primary bg-primary/10 text-primary-ink' : 'border-line text-subtle',
                  )}
                >
                  a[{s}]
                </span>
              )}
              <div
                className={cn(
                  'min-w-0 flex-1 rounded-md border p-1.5',
                  ndim === 3 && s === sel.s ? 'border-line-strong bg-surface-2/40' : 'border-line',
                )}
                // A small, capped indent so a stack of slices reads as depth
                // rather than as four unrelated grids.
                style={ndim === 3 ? { marginLeft: Math.min(s, 3) * 6 } : undefined}
              >
                {renderGrid(s)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The machine's picture: one flat run of elements. */}
      <div className="border-t border-line p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          The same array in memory — {size} elements, {order === 'C' ? 'last axis first' : 'first axis first'}
        </p>
        <div className="flex flex-wrap gap-[3px]" role="img" aria-label={`Flat memory buffer of ${size} elements`}>
          {buffer.map((cell, i) => (
            <span
              key={i}
              className={cn(
                'flex h-6 min-w-6 items-center justify-center rounded-[4px] border px-1 font-mono text-[10px] tabular-nums',
                i === selOffset
                  ? 'border-primary bg-primary/20 font-semibold text-ink'
                  : cell.group % 2 === 0
                    ? 'border-line bg-surface-2 text-subtle'
                    : 'border-line bg-surface-3 text-subtle',
              )}
            >
              {cell.value}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Shading alternates with the axis-0 index, so you can see which elements sit next to each other. In C order a
          row is contiguous; in Fortran order a column is.
        </p>
      </div>

      {/* The bridge between the two pictures. */}
      <div className="border-t border-line bg-surface-2/40 p-4">
        <p className="mb-1.5 font-mono text-[13px] text-ink">
          a[{selTuple.join(', ')}] = {selValue}
        </p>
        <dl className="grid gap-x-4 gap-y-1 text-[11.5px] sm:grid-cols-2">
          <div className="flex justify-between gap-2 sm:block">
            <dt className="text-subtle">strides (elements)</dt>
            <dd className="font-mono tabular-nums text-muted">({memStrides.join(', ')})</dd>
          </div>
          <div className="flex justify-between gap-2 sm:block">
            <dt className="text-subtle">strides (bytes)</dt>
            <dd className="font-mono tabular-nums text-muted">({memStrides.map((s) => s * itemsize).join(', ')})</dd>
          </div>
          <div className="flex justify-between gap-2 sm:block">
            <dt className="text-subtle">offset</dt>
            <dd className="font-mono tabular-nums text-accent">
              {selTuple.map((v, i) => `${v}×${memStrides[i]}`).join(' + ')} = {selOffset}
            </dd>
          </div>
          <div className="flex justify-between gap-2 sm:block">
            <dt className="text-subtle">byte offset</dt>
            <dd className="font-mono tabular-nums text-muted">
              {selOffset} × {itemsize} = {selOffset * itemsize}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          One multiply-and-add per axis, and the machine knows where your element is. No searching, no pointers to
          follow — that is why indexing an array is constant time.
        </p>
      </div>
    </WidgetShell>
  );
}
