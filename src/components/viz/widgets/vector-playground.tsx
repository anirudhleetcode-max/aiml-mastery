'use client';

import * as React from 'react';
import { Readout, Slider, WidgetShell, VIZ } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * Two vectors you can take hold of.
 *
 * A vector only becomes intuitive once moving one end changes every number
 * that depends on it, at the same time. So the components, both norms and the
 * unit vector are recomputed on every pixel of drag, and the sum is drawn
 * tip-to-tail rather than as a third arrow appearing from nowhere — because
 * "slide b so its tail sits on a's tip" is the whole definition, and it is
 * invisible in a b + a expression.
 *
 * The difference is drawn twice on purpose: once from the origin, where the
 * algebra puts it, and once as the dashed arrow from b's tip to a's tip, where
 * the geometry puts it. Those are the same arrow. Learners who see that stop
 * guessing signs.
 *
 * Dragging is the fast path; the number inputs are the real one. They make the
 * widget fully keyboard-operable and let a learner type an exact value instead
 * of hunting for it.
 */

const R = 6; // the plane runs from -6 to 6 on both axes
const VB = 300;
const PAD = 18;
const SCALE = (VB - PAD * 2) / (R * 2);
const CX = VB / 2;
const CY = VB / 2;

const sx = (x: number) => CX + x * SCALE;
const sy = (y: number) => CY - y * SCALE;

const round2 = (v: number) => Math.round(v * 100) / 100;
const clampR = (v: number) => Math.max(-R, Math.min(R, v));

interface Vec {
  x: number;
  y: number;
}

function add(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y };
}
function sub(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y };
}
function scale(a: Vec, k: number): Vec {
  return { x: a.x * k, y: a.y * k };
}
const l1 = (a: Vec) => Math.abs(a.x) + Math.abs(a.y);
const l2 = (a: Vec) => Math.hypot(a.x, a.y);

/** A line with a solid head, drawn in viewBox units. */
function Arrow({
  from,
  to,
  color,
  width = 2.2,
  dashed = false,
  head = 8,
  opacity = 1,
  label,
}: {
  from: Vec;
  to: Vec;
  color: string;
  width?: number;
  dashed?: boolean;
  head?: number;
  opacity?: number;
  label?: string;
}) {
  const x1 = sx(from.x);
  const y1 = sy(from.y);
  const x2 = sx(to.x);
  const y2 = sy(to.y);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return null;
  const ux = dx / len;
  const uy = dy / len;
  const h = Math.min(head, len * 0.7);
  const bx = x2 - ux * h;
  const by = y2 - uy * h;
  const px = -uy;
  const py = ux;

  return (
    <g style={{ opacity }}>
      <line
        x1={x1}
        y1={y1}
        x2={bx}
        y2={by}
        style={{ stroke: color }}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <polygon
        points={`${x2},${y2} ${bx + px * h * 0.42},${by + py * h * 0.42} ${bx - px * h * 0.42},${by - py * h * 0.42}`}
        style={{ fill: color }}
      />
      {label && (
        <text
          x={x2 + ux * 11}
          y={y2 + uy * 11 + 4}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          style={{ fill: color }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step: number;
}) {
  const id = React.useId();
  return (
    <div className="flex items-center gap-1.5">
      <label htmlFor={id} className="font-mono text-[11.5px] text-subtle">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        min={-R}
        max={R}
        step={step}
        onChange={(e) => {
          const v = Number(e.target.value);
          onChange(Number.isFinite(v) ? clampR(v) : 0);
        }}
        className="w-16 rounded-md border border-line bg-surface-2 px-1.5 py-1 text-right font-mono text-[12px] tabular-nums text-ink outline-none focus:border-primary"
      />
    </div>
  );
}

export default function VectorPlayground({ props }: { props?: Record<string, unknown> }) {
  void props;
  const reduced = usePrefersReducedMotion();
  const [a, setA] = React.useState<Vec>({ x: 4, y: 1.5 });
  const [b, setB] = React.useState<Vec>({ x: -1.5, y: 3 });
  const [k, setK] = React.useState(1.5);
  const [show, setShow] = React.useState({ sum: true, diff: false, scalar: false });
  const [snap, setSnap] = React.useState(true);
  const [dragging, setDragging] = React.useState<'a' | 'b' | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const quantise = React.useCallback(
    (v: number) => (snap ? Math.round(v * 2) / 2 : Math.round(v * 100) / 100),
    [snap],
  );

  const pointTo = (clientX: number, clientY: number): Vec | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return null;
    const vx = ((clientX - rect.left) / rect.width) * VB;
    const vy = ((clientY - rect.top) / rect.height) * VB;
    return { x: clampR(quantise((vx - CX) / SCALE)), y: clampR(quantise((CY - vy) / SCALE)) };
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const p = pointTo(e.clientX, e.clientY);
    if (!p) return;
    if (dragging === 'a') setA(p);
    else setB(p);
  };

  const sum = add(a, b);
  const diff = sub(a, b);
  const ka = scale(a, k);
  const magA = l2(a);
  const unitA: Vec = magA < 1e-9 ? { x: 0, y: 0 } : scale(a, 1 / magA);

  const gridLines: React.ReactNode[] = [];
  for (let i = -R; i <= R; i++) {
    const major = i === 0;
    gridLines.push(
      <line
        key={`v${i}`}
        x1={sx(i)}
        y1={sy(-R)}
        x2={sx(i)}
        y2={sy(R)}
        style={{ stroke: major ? VIZ.axis : VIZ.grid }}
        strokeWidth={major ? 1.4 : 0.8}
      />,
    );
    gridLines.push(
      <line
        key={`h${i}`}
        x1={sx(-R)}
        y1={sy(i)}
        x2={sx(R)}
        y2={sy(i)}
        style={{ stroke: major ? VIZ.axis : VIZ.grid }}
        strokeWidth={major ? 1.4 : 0.8}
      />,
    );
  }

  const trans = reduced || dragging ? '' : 'transition-[opacity] duration-150';

  return (
    <WidgetShell
      takeaway="A vector is a list of numbers and an arrow at the same time. Adding is sliding b until its tail meets a's tip; a − b is the arrow that points from b to a; and the unit vector keeps the direction while throwing the length away, which is exactly what cosine similarity does later."
      readout={
        <Readout
          items={[
            { label: 'a', value: `(${round2(a.x)}, ${round2(a.y)})` },
            { label: '‖a‖₁', value: round2(l1(a)).toFixed(2) },
            { label: '‖a‖₂', value: magA.toFixed(3) },
            { label: 'â', value: `(${round2(unitA.x).toFixed(2)}, ${round2(unitA.y).toFixed(2)})`, tone: 'good' },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 text-[12px] font-semibold" style={{ color: VIZ.series }}>
                a
              </span>
              <NumberField label="x" value={a.x} step={snap ? 0.5 : 0.1} onChange={(v) => setA((p) => ({ ...p, x: v }))} />
              <NumberField label="y" value={a.y} step={snap ? 0.5 : 0.1} onChange={(v) => setA((p) => ({ ...p, y: v }))} />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-[12px] font-semibold" style={{ color: VIZ.info }}>
                b
              </span>
              <NumberField label="x" value={b.x} step={snap ? 0.5 : 0.1} onChange={(v) => setB((p) => ({ ...p, x: v }))} />
              <NumberField label="y" value={b.y} step={snap ? 0.5 : 0.1} onChange={(v) => setB((p) => ({ ...p, y: v }))} />
            </div>
          </div>

          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">Show</p>
            <div className="flex flex-wrap gap-1.5">
              {([
                ['sum', 'a + b, tip to tail'],
                ['diff', 'a − b'],
                ['scalar', 'k · a'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={show[key]}
                  onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
                  className={cn(
                    'rounded-md border px-2 py-1 text-[11.5px] transition-colors',
                    show[key] ? 'border-primary bg-primary/15 text-ink' : 'border-line bg-surface-2 text-subtle hover:text-ink',
                  )}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                aria-pressed={snap}
                onClick={() => setSnap((s) => !s)}
                className={cn(
                  'rounded-md border px-2 py-1 text-[11.5px] transition-colors',
                  snap ? 'border-primary bg-primary/15 text-ink' : 'border-line bg-surface-2 text-subtle hover:text-ink',
                )}
              >
                Snap to ½
              </button>
            </div>
          </div>

          {show.scalar && (
            <Slider
              label="Scalar k"
              value={k}
              min={-2}
              max={3}
              step={0.25}
              onChange={setK}
              format={(v) => v.toFixed(2)}
              hint="Scaling changes length, never direction — until k goes negative, which flips the arrow through the origin."
            />
          )}
        </>
      }
    >
      <div className="p-3">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB} ${VB}`}
          className="mx-auto block w-full max-w-[22rem] touch-none select-none"
          role="img"
          aria-label={`Vector a is ${round2(a.x)}, ${round2(a.y)}; vector b is ${round2(b.x)}, ${round2(b.y)}; their sum is ${round2(sum.x)}, ${round2(sum.y)}`}
          onPointerMove={onMove}
          onPointerUp={() => setDragging(null)}
          onPointerLeave={() => setDragging(null)}
        >
          <g style={{ opacity: 0.55 }}>{gridLines}</g>

          {/* Tick numbers on the two axes, every second unit. */}
          <g fontSize={9} style={{ fill: VIZ.axis }}>
            {[-4, -2, 2, 4, 6].map((i) => (
              <text key={`tx${i}`} x={sx(i)} y={CY + 11} textAnchor="middle">
                {i}
              </text>
            ))}
            {[-4, -2, 2, 4, 6].map((i) => (
              <text key={`ty${i}`} x={CX - 5} y={sy(i) + 3} textAnchor="end">
                {i}
              </text>
            ))}
          </g>

          {show.scalar && <Arrow from={{ x: 0, y: 0 }} to={ka} color={VIZ.muted} width={5} opacity={0.55} />}

          {show.sum && (
            <>
              {/* b, slid so its tail sits on a's tip — the definition, drawn. */}
              <Arrow from={a} to={sum} color={VIZ.info} width={1.8} dashed opacity={0.8} />
              <Arrow from={{ x: 0, y: 0 }} to={sum} color={VIZ.good} width={2.6} label="a+b" />
            </>
          )}

          {show.diff && (
            <>
              <Arrow from={b} to={a} color={VIZ.warn} width={1.8} dashed opacity={0.85} />
              <Arrow from={{ x: 0, y: 0 }} to={diff} color={VIZ.warn} width={2.6} label="a−b" />
            </>
          )}

          <Arrow from={{ x: 0, y: 0 }} to={a} color={VIZ.series} width={3} label="a" />
          <Arrow from={{ x: 0, y: 0 }} to={b} color={VIZ.info} width={3} label="b" />

          {/* Drag handles, drawn last so they sit on top of every arrow. */}
          {(['a', 'b'] as const).map((key) => {
            const v = key === 'a' ? a : b;
            return (
              <circle
                key={key}
                cx={sx(v.x)}
                cy={sy(v.y)}
                r={dragging === key ? 10 : 8}
                style={{ fill: key === 'a' ? VIZ.series : VIZ.info, fillOpacity: 0.28, stroke: key === 'a' ? VIZ.series : VIZ.info }}
                strokeWidth={2}
                className="cursor-grab"
                onPointerDown={(e) => {
                  (e.target as Element).setPointerCapture?.(e.pointerId);
                  setDragging(key);
                }}
              />
            );
          })}
        </svg>
        <p className={cn('mt-1 text-center text-[11px] text-subtle', trans)}>
          Drag either filled circle, or type exact components below.
        </p>
      </div>

      <div className="border-t border-line p-4">
        <table className="w-full text-[12px]">
          <caption className="sr-only">Components and norms of each vector</caption>
          <thead>
            <tr className="border-b border-line text-left text-subtle">
              <th scope="col" className="py-1.5 pr-3 font-medium">
                vector
              </th>
              <th scope="col" className="py-1.5 pr-3 font-medium">
                components
              </th>
              <th scope="col" className="py-1.5 pr-3 font-medium">
                ‖·‖₁
              </th>
              <th scope="col" className="py-1.5 font-medium">
                ‖·‖₂
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {[
              { name: 'a', v: a, color: VIZ.series, on: true },
              { name: 'b', v: b, color: VIZ.info, on: true },
              { name: 'a + b', v: sum, color: VIZ.good, on: show.sum },
              { name: 'a − b', v: diff, color: VIZ.warn, on: show.diff },
              { name: `${k} · a`, v: ka, color: VIZ.muted, on: show.scalar },
            ]
              .filter((r) => r.on)
              .map((r) => (
                <tr key={r.name}>
                  <td className="py-1.5 pr-3 font-mono font-medium" style={{ color: r.color }}>
                    {r.name}
                  </td>
                  <td className="py-1.5 pr-3 font-mono tabular-nums text-ink">
                    ({round2(r.v.x).toFixed(2)}, {round2(r.v.y).toFixed(2)})
                  </td>
                  <td className="py-1.5 pr-3 font-mono tabular-nums text-muted">{l1(r.v).toFixed(2)}</td>
                  <td className="py-1.5 font-mono tabular-nums text-muted">{l2(r.v).toFixed(3)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          The two norms measure different things. ‖a‖₁ is how far you walk along the grid lines, which is why an L1
          penalty pushes coefficients all the way to zero; ‖a‖₂ is the straight-line distance, which is what almost
          every distance and every gradient step uses.
        </p>
      </div>
    </WidgetShell>
  );
}
