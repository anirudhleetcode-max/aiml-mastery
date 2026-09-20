'use client';

import * as React from 'react';
import { Readout, Slider, WidgetShell, VIZ } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * The dot product, with its sign made visible.
 *
 * Everything a learner needs from this operation is a single geometric fact:
 * it asks "how much of a points the way b points". Positive means the same
 * general direction, zero means at right angles, negative means opposed. The
 * arithmetic (ax·bx + ay·by) never says that out loud, so the plane itself is
 * shaded here — green on b's side of the perpendicular, amber on the far side
 * — and the shading rotates as b rotates. Drag a across that boundary and the
 * number changes sign at exactly the moment the arrow crosses it.
 *
 * The projection is drawn as a dropped perpendicular because that is where
 * the formula comes from: |a|cos θ is the length of a's shadow on b, and the
 * dot product is that shadow times |b|.
 *
 * The cosine-similarity line is not decoration. It is the same number with the
 * lengths divided out, and it is how the learner will meet this again when two
 * sentence embeddings need comparing.
 */

const R = 5;
const VB = 300;
const PAD = 18;
const SCALE = (VB - PAD * 2) / (R * 2);
const CX = VB / 2;
const CY = VB / 2;

const sx = (x: number) => CX + x * SCALE;
const sy = (y: number) => CY - y * SCALE;
const rad = (deg: number) => (deg * Math.PI) / 180;

function Arrow({
  to,
  from = { x: 0, y: 0 },
  color,
  width = 3,
  dashed = false,
  label,
}: {
  to: { x: number; y: number };
  from?: { x: number; y: number };
  color: string;
  width?: number;
  dashed?: boolean;
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
  const h = Math.min(9, len * 0.7);
  const bx = x2 - ux * h;
  const by = y2 - uy * h;
  return (
    <g>
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
        points={`${x2},${y2} ${bx - uy * h * 0.42},${by + ux * h * 0.42} ${bx + uy * h * 0.42},${by - ux * h * 0.42}`}
        style={{ fill: color }}
      />
      {label && (
        <text x={x2 + ux * 12} y={y2 + uy * 12 + 4} textAnchor="middle" fontSize={12} fontWeight={700} style={{ fill: color }}>
          {label}
        </text>
      )}
    </g>
  );
}

const PRESETS: { label: string; aAng: number; bAng: number; note: string }[] = [
  { label: 'Same direction', aAng: 30, bAng: 30, note: 'θ = 0, cos θ = 1. The dot product is as large as those two lengths allow: |a||b|.' },
  { label: 'Acute', aAng: 65, bAng: 15, note: 'Under 90°, so the shadow falls on b itself and the dot product is positive.' },
  { label: 'Perpendicular', aAng: 105, bAng: 15, note: 'θ = 90°, cos θ = 0. The shadow has no length, so the dot product is exactly zero however long the vectors are.' },
  { label: 'Obtuse', aAng: 150, bAng: 15, note: 'Past 90° the shadow falls on the far side of the origin, so the number goes negative.' },
  { label: 'Opposed', aAng: 195, bAng: 15, note: 'θ = 180°, cos θ = −1. The most negative the dot product can be: −|a||b|.' },
];

export default function DotProduct({ props }: { props?: Record<string, unknown> }) {
  void props;
  const reduced = usePrefersReducedMotion();
  const clipId = React.useId().replace(/:/g, '');
  const [aAng, setAAng] = React.useState(65);
  const [aLen, setALen] = React.useState(3.8);
  const [bAng, setBAng] = React.useState(15);
  const [bLen, setBLen] = React.useState(3.2);
  const [note, setNote] = React.useState(PRESETS[1].note);
  const [dragging, setDragging] = React.useState<'a' | 'b' | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const a = { x: aLen * Math.cos(rad(aAng)), y: aLen * Math.sin(rad(aAng)) };
  const b = { x: bLen * Math.cos(rad(bAng)), y: bLen * Math.sin(rad(bAng)) };

  const dot = a.x * b.x + a.y * b.y;
  const cos = aLen < 1e-6 || bLen < 1e-6 ? 0 : dot / (aLen * bLen);
  const theta = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;

  // Scalar projection of a onto b, then the point it lands on.
  const projScalar = bLen < 1e-6 ? 0 : dot / bLen;
  const projPoint = bLen < 1e-6 ? { x: 0, y: 0 } : { x: (dot / (bLen * bLen)) * b.x, y: (dot / (bLen * bLen)) * b.y };

  const sign = Math.abs(dot) < 0.05 ? 'zero' : dot > 0 ? 'positive' : 'negative';

  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return;
    const vx = ((e.clientX - rect.left) / rect.width) * VB;
    const vy = ((e.clientY - rect.top) / rect.height) * VB;
    const x = (vx - CX) / SCALE;
    const y = (CY - vy) / SCALE;
    const len = Math.max(0.4, Math.min(R - 0.3, Math.hypot(x, y)));
    let ang = (Math.atan2(y, x) * 180) / Math.PI;
    if (ang < 0) ang += 360;
    if (dragging === 'a') {
      setAAng(Math.round(ang));
      setALen(Math.round(len * 10) / 10);
    } else {
      setBAng(Math.round(ang));
      setBLen(Math.round(len * 10) / 10);
    }
    setNote('Dragged by hand. Watch the sign flip the instant the arrow crosses the dashed boundary.');
  };

  const gridLines: React.ReactNode[] = [];
  for (let k = -R; k <= R; k++) {
    const major = k === 0;
    gridLines.push(
      <line key={`v${k}`} x1={sx(k)} y1={sy(-R)} x2={sx(k)} y2={sy(R)} style={{ stroke: major ? VIZ.axis : VIZ.grid }} strokeWidth={major ? 1.4 : 0.7} />,
    );
    gridLines.push(
      <line key={`h${k}`} x1={sx(-R)} y1={sy(k)} x2={sx(R)} y2={sy(k)} style={{ stroke: major ? VIZ.axis : VIZ.grid }} strokeWidth={major ? 1.4 : 0.7} />,
    );
  }

  const markerLeft = `${((Math.max(-1, Math.min(1, cos)) + 1) / 2) * 100}%`;

  return (
    <WidgetShell
      takeaway="The dot product measures how much of a points the way b points. It is positive on b's side of the dashed line, exactly zero on it, and negative beyond it — and once you divide the two lengths out, that same number is the cosine similarity you will use to compare embeddings."
      readout={
        <Readout
          items={[
            { label: 'a · b', value: dot.toFixed(2), tone: sign === 'zero' ? 'warn' : sign === 'positive' ? 'good' : 'bad' },
            { label: 'θ', value: `${theta.toFixed(1)}°` },
            { label: 'cos θ', value: cos.toFixed(3) },
            { label: 'shadow of a on b', value: projScalar.toFixed(2) },
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
                    setAAng(p.aAng);
                    setBAng(p.bAng);
                    setNote(p.note);
                  }}
                  className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[11.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-subtle">{note}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            <Slider label="a — direction" value={aAng} min={0} max={359} onChange={setAAng} format={(v) => `${v}°`} />
            <Slider label="a — length" value={aLen} min={0.4} max={4.6} step={0.1} onChange={setALen} format={(v) => v.toFixed(1)} />
            <Slider label="b — direction" value={bAng} min={0} max={359} onChange={setBAng} format={(v) => `${v}°`} />
            <Slider label="b — length" value={bLen} min={0.4} max={4.6} step={0.1} onChange={setBLen} format={(v) => v.toFixed(1)} />
          </div>
          <p className="text-[11.5px] leading-relaxed text-subtle">
            Change only the lengths and cos θ does not move at all — the angle is the part that carries the meaning,
            which is precisely why similarity is measured with the cosine rather than with the raw dot product.
          </p>
        </>
      }
    >
      <div className="p-3">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB} ${VB}`}
          className="mx-auto block w-full max-w-[22rem] touch-none select-none"
          role="img"
          aria-label={`Vectors a and b at ${theta.toFixed(0)} degrees apart. The dot product is ${dot.toFixed(2)}, which is ${sign}.`}
          onPointerMove={onMove}
          onPointerUp={() => setDragging(null)}
          onPointerLeave={() => setDragging(null)}
        >
          <defs>
            <clipPath id={`dp-${clipId}`}>
              <rect x={PAD - 6} y={PAD - 6} width={VB - (PAD - 6) * 2} height={VB - (PAD - 6) * 2} rx={6} />
            </clipPath>
          </defs>

          <g clipPath={`url(#dp-${clipId})`}>
            {/* The sign of the dot product is a half-plane, so draw it as one. */}
            <g transform={`rotate(${-bAng} ${CX} ${CY})`}>
              <rect x={CX} y={CY - 400} width={400} height={800} style={{ fill: VIZ.good, fillOpacity: 0.1 }} />
              <rect x={CX - 400} y={CY - 400} width={400} height={800} style={{ fill: VIZ.warn, fillOpacity: 0.1 }} />
              <text x={CX + 58} y={CY - 96} fontSize={11} fontWeight={600} textAnchor="middle" style={{ fill: VIZ.good }}>
                a · b &gt; 0
              </text>
              <text x={CX - 58} y={CY - 96} fontSize={11} fontWeight={600} textAnchor="middle" style={{ fill: VIZ.warn }}>
                a · b &lt; 0
              </text>
            </g>

            <g style={{ opacity: 0.5 }}>{gridLines}</g>

            {/* The boundary: every vector on this line has a zero dot product with b. */}
            <line
              x1={sx(-b.y * 3)}
              y1={sy(b.x * 3)}
              x2={sx(b.y * 3)}
              y2={sy(-b.x * 3)}
              style={{ stroke: VIZ.axis }}
              strokeWidth={1.4}
              strokeDasharray="6 5"
            />

            {/* Projection: the shadow, and the perpendicular that drops onto it. */}
            {Math.abs(projScalar) > 0.02 && (
              <>
                <line
                  x1={sx(0)}
                  y1={sy(0)}
                  x2={sx(projPoint.x)}
                  y2={sy(projPoint.y)}
                  style={{ stroke: dot >= 0 ? VIZ.good : VIZ.warn }}
                  strokeWidth={7}
                  strokeLinecap="butt"
                  opacity={0.55}
                />
                <line
                  x1={sx(a.x)}
                  y1={sy(a.y)}
                  x2={sx(projPoint.x)}
                  y2={sy(projPoint.y)}
                  style={{ stroke: VIZ.muted }}
                  strokeWidth={1.4}
                  strokeDasharray="4 3"
                />
                <circle cx={sx(projPoint.x)} cy={sy(projPoint.y)} r={3} style={{ fill: dot >= 0 ? VIZ.good : VIZ.warn }} />
              </>
            )}

            <Arrow to={b} color={VIZ.info} label="b" />
            <Arrow to={a} color={VIZ.series} label="a" />

            {(['a', 'b'] as const).map((key) => {
              const v = key === 'a' ? a : b;
              return (
                <circle
                  key={key}
                  cx={sx(v.x)}
                  cy={sy(v.y)}
                  r={9}
                  style={{
                    fill: key === 'a' ? VIZ.series : VIZ.info,
                    fillOpacity: dragging === key ? 0.45 : 0.25,
                    stroke: key === 'a' ? VIZ.series : VIZ.info,
                  }}
                  strokeWidth={2}
                  className="cursor-grab"
                  onPointerDown={(e) => {
                    (e.target as Element).setPointerCapture?.(e.pointerId);
                    setDragging(key);
                  }}
                />
              );
            })}
          </g>
        </svg>
        <p className="mt-1 text-center text-[11px] text-subtle">Drag either circle, or use the sliders below.</p>
      </div>

      {/* The sign, spelled out, because the sign is the whole lesson. */}
      <div className="border-t border-line px-4 py-3">
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">cos θ — cosine similarity</p>
          <span
            className={cn(
              'font-mono text-[13px] font-semibold tabular-nums',
              sign === 'zero' ? 'text-warning' : sign === 'positive' ? 'text-success' : 'text-danger',
            )}
          >
            {cos.toFixed(3)}
          </span>
        </div>
        <div className="relative h-6 rounded-md border border-line bg-surface-2">
          <div className="absolute inset-y-0 left-1/2 w-px bg-line-strong" aria-hidden="true" />
          <div
            className={cn('absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface', reduced ? '' : 'transition-[left] duration-150')}
            style={{ left: markerLeft, backgroundColor: sign === 'zero' ? VIZ.warn : sign === 'positive' ? VIZ.good : VIZ.series }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-1 flex justify-between text-[10.5px] text-subtle">
          <span>−1 opposed</span>
          <span>0 perpendicular</span>
          <span>+1 identical</span>
        </div>

        <dl className="mt-3 space-y-1 text-[12px]">
          <div className="flex flex-wrap justify-between gap-x-3">
            <dt className="text-subtle">components</dt>
            <dd className="font-mono tabular-nums text-ink">
              ({a.x.toFixed(2)})({b.x.toFixed(2)}) + ({a.y.toFixed(2)})({b.y.toFixed(2)}) = {dot.toFixed(2)}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-3">
            <dt className="text-subtle">geometry</dt>
            <dd className="font-mono tabular-nums text-ink">
              {aLen.toFixed(1)} × {bLen.toFixed(1)} × cos {theta.toFixed(1)}° = {dot.toFixed(2)}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-3">
            <dt className="text-subtle">cosine similarity</dt>
            <dd className="font-mono tabular-nums text-accent">
              {dot.toFixed(2)} ÷ ({aLen.toFixed(1)} × {bLen.toFixed(1)}) = {cos.toFixed(3)}
            </dd>
          </div>
        </dl>

        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          {sign === 'zero' ? (
            <>
              <strong className="text-warning">Zero.</strong> a has no shadow on b at all. In an embedding space this
              is what &quot;unrelated&quot; looks like — not opposite, just carrying no shared direction.
            </>
          ) : sign === 'positive' ? (
            <>
              <strong className="text-success">Positive.</strong> The shadow falls along b, so a is pointing the same
              general way. At cos θ = 0.9 two embeddings would be read as near-synonyms.
            </>
          ) : (
            <>
              <strong className="text-danger">Negative.</strong> The shadow falls behind the origin, on the wrong side
              of b. The two vectors disagree about direction, and the arithmetic says so with a minus sign.
            </>
          )}
        </p>
      </div>
    </WidgetShell>
  );
}
