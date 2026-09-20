'use client';

import * as React from 'react';
import { PlayButton, Readout, Slider, WidgetShell, VIZ } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * A 2x2 matrix is a thing that does something to the plane.
 *
 * The four numbers mean nothing on their own, so the widget never shows them
 * alone: the grid, the letter F and the unit square all move together as the
 * sliders move. The F is there because it is asymmetric in both directions —
 * a square or a circle would hide reflection completely, and reflection is
 * half the reason the determinant has a sign.
 *
 * The determinant is the point of the whole thing. It is drawn, not merely
 * printed: the shaded quadrilateral *is* the unit square after the map, and
 * its area *is* |det|. Push the sliders until that quadrilateral has no area
 * left and the grid falls onto a single line — everything collapses, two
 * different inputs land on the same output, and no inverse can exist. The
 * blend slider exists so the collapse can be watched happening rather than
 * arrived at.
 */

const R = 5;
const VB = 300;
const PAD = 18;
const SCALE = (VB - PAD * 2) / (R * 2);
const CX = VB / 2;
const CY = VB / 2;

const sx = (x: number) => CX + x * SCALE;
const sy = (y: number) => CY - y * SCALE;

type M = [number, number, number, number]; // a b c d, row major

function apply(m: M, x: number, y: number): [number, number] {
  return [m[0] * x + m[1] * y, m[2] * x + m[3] * y];
}

/** Blend between the identity and the chosen matrix, so the map can be watched. */
function blend(m: M, t: number): M {
  const I: M = [1, 0, 0, 1];
  return [
    I[0] + (m[0] - I[0]) * t,
    I[1] + (m[1] - I[1]) * t,
    I[2] + (m[2] - I[2]) * t,
    I[3] + (m[3] - I[3]) * t,
  ];
}

const det = (m: M) => m[0] * m[3] - m[1] * m[2];

/** An asymmetric letter F, so both a rotation and a reflection are unmistakable. */
const F_SHAPE: [number, number][] = [
  [0.2, 0.2],
  [0.8, 0.2],
  [0.8, 1.4],
  [1.6, 1.4],
  [1.6, 2.0],
  [0.8, 2.0],
  [0.8, 2.6],
  [2.0, 2.6],
  [2.0, 3.2],
  [0.2, 3.2],
];

const PRESETS: { label: string; m: M; note: string }[] = [
  { label: 'Identity', m: [1, 0, 0, 1], note: 'Nothing moves. det = 1: areas unchanged, orientation unchanged.' },
  { label: 'Scale', m: [1.8, 0, 0, 1.8], note: 'Every length grows by 1.8, so every area grows by 1.8² = 3.24. That is what the determinant is counting.' },
  { label: 'Rotate', m: [0.8, -0.6, 0.6, 0.8], note: 'A rotation of 36.9°. Rotations never change area or handedness, so det is exactly 1.' },
  { label: 'Shear', m: [1, 1, 0, 1], note: 'The grid slants but the area of every cell is untouched: det = 1 even though nothing looks the same.' },
  { label: 'Reflect', m: [-1, 0, 0, 1], note: 'A mirror through the vertical axis. The F reads backwards and det is −1: the sign is the handedness.' },
  { label: 'Singular', m: [1, 2, 0.5, 1], note: 'The second column is twice the first, so the whole plane lands on one line. det = 0 and there is no way back.' },
];

export default function MatrixTransform({ props }: { props?: Record<string, unknown> }) {
  void props;
  const reduced = usePrefersReducedMotion();
  const clipId = React.useId().replace(/:/g, '');
  const [m, setM] = React.useState<M>([0.8, -0.6, 0.6, 0.8]);
  const [t, setT] = React.useState(1);
  const [playing, setPlaying] = React.useState(false);
  const [note, setNote] = React.useState(PRESETS[2].note);

  // Ping-pong between the identity and the matrix so the collapse has a
  // before and an after. Reduced motion never starts this loop.
  React.useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    let last = performance.now();
    let dir = 1;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setT((prev) => {
        let next = prev + dir * dt * 0.55;
        if (next >= 1) {
          next = 1;
          dir = -1;
        } else if (next <= 0) {
          next = 0;
          dir = 1;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  React.useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const live = blend(m, t);
  const d = det(live);
  const collapsed = Math.abs(d) < 0.02;
  const nearCollapse = Math.abs(d) < 0.25;

  const P = (x: number, y: number) => {
    const [u, v] = apply(live, x, y);
    return `${sx(u).toFixed(2)},${sy(v).toFixed(2)}`;
  };

  const gridLines: React.ReactNode[] = [];
  for (let k = -R; k <= R; k++) {
    const major = k === 0;
    const [x1, y1] = apply(live, k, -R);
    const [x2, y2] = apply(live, k, R);
    const [x3, y3] = apply(live, -R, k);
    const [x4, y4] = apply(live, R, k);
    gridLines.push(
      <line
        key={`v${k}`}
        x1={sx(x1)}
        y1={sy(y1)}
        x2={sx(x2)}
        y2={sy(y2)}
        style={{ stroke: major ? VIZ.axis : VIZ.grid }}
        strokeWidth={major ? 1.6 : 0.8}
      />,
    );
    gridLines.push(
      <line
        key={`h${k}`}
        x1={sx(x3)}
        y1={sy(y3)}
        x2={sx(x4)}
        y2={sy(y4)}
        style={{ stroke: major ? VIZ.axis : VIZ.grid }}
        strokeWidth={major ? 1.6 : 0.8}
      />,
    );
  }

  /** When det = 0, this direction is squashed to the origin — the reason no inverse exists. */
  const nullDir = (() => {
    const [a, b, c, dd] = live;
    const v: [number, number] = Math.hypot(a, b) > 1e-6 ? [b, -a] : [dd, -c];
    const len = Math.hypot(v[0], v[1]);
    return len < 1e-6 ? null : ([v[0] / len, v[1] / len] as [number, number]);
  })();

  const orientation = collapsed ? 'collapsed' : d > 0 ? 'preserved' : 'flipped';

  return (
    <WidgetShell
      takeaway="The determinant is the area of that shaded square after the map, with a minus sign when the F comes out backwards. Drive it to zero and the grid falls onto a single line: area gone, information gone, no inverse — which is the whole meaning of a singular matrix."
      readout={
        <Readout
          items={[
            { label: 'det', value: d.toFixed(3), tone: collapsed ? 'bad' : d < 0 ? 'warn' : 'good' },
            { label: 'area factor', value: `${Math.abs(d).toFixed(3)}×` },
            { label: 'orientation', value: orientation, tone: collapsed ? 'bad' : d < 0 ? 'warn' : 'default' },
            { label: 'invertible', value: collapsed ? 'no' : 'yes', tone: collapsed ? 'bad' : 'good' },
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
                    setM(p.m);
                    setNote(p.note);
                    setT(1);
                  }}
                  className={cn(
                    'rounded-md border px-2 py-1 text-[11.5px] transition-colors',
                    p.m.every((v, i) => Math.abs(v - m[i]) < 1e-9)
                      ? 'border-primary bg-primary/15 text-ink'
                      : 'border-line bg-surface-2 text-muted hover:border-line-strong hover:text-ink',
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-subtle">{note}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {(['a', 'b', 'c', 'd'] as const).map((name, i) => (
              <Slider
                key={name}
                label={
                  i === 0
                    ? 'a — where î’s x goes'
                    : i === 1
                      ? 'b — where ĵ’s x goes'
                      : i === 2
                        ? 'c — where î’s y goes'
                        : 'd — where ĵ’s y goes'
                }
                value={m[i]}
                min={-3}
                max={3}
                step={0.01}
                onChange={(v) => {
                  setM((prev) => {
                    const next = [...prev] as M;
                    next[i] = v;
                    return next;
                  });
                  setNote('Custom matrix. The two columns are where the basis vectors î and ĵ land.');
                }}
                format={(v) => v.toFixed(2)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <Slider
              className="min-w-[10rem] flex-1"
              label="Blend from identity"
              value={t}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => {
                setPlaying(false);
                setT(v);
              }}
              format={(v) => `${Math.round(v * 100)}%`}
              hint="Slide from the untouched grid to the full transform and watch what happens to the area."
            />
            <PlayButton
              playing={playing && !reduced}
              onToggle={() => {
                if (reduced) setT((p) => (p > 0.5 ? 0 : 1));
                else setPlaying((p) => !p);
              }}
              onStep={() => {
                setPlaying(false);
                setT((p) => Math.min(1, Math.round((p + 0.25) * 100) / 100));
              }}
              onReset={() => {
                setPlaying(false);
                setT(1);
              }}
              label="the blend from identity to the matrix"
            />
          </div>
          {reduced && (
            <p className="-mt-1 text-[11px] text-subtle">
              Motion is reduced, so the blend does not animate. Use Step, or drag the blend slider.
            </p>
          )}
        </>
      }
    >
      <div className="p-3">
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          className="mx-auto block w-full max-w-[22rem]"
          role="img"
          aria-label={`The plane under the matrix [[${live[0].toFixed(2)}, ${live[1].toFixed(2)}], [${live[2].toFixed(2)}, ${live[3].toFixed(2)}]], determinant ${d.toFixed(3)}, orientation ${orientation}`}
        >
          <defs>
            <clipPath id={`clip-${clipId}`}>
              <rect x={PAD - 6} y={PAD - 6} width={VB - (PAD - 6) * 2} height={VB - (PAD - 6) * 2} rx={6} />
            </clipPath>
          </defs>

          <g clipPath={`url(#clip-${clipId})`}>
            <g style={{ opacity: 0.6 }}>{gridLines}</g>

            {/* The unit square before the map, for comparison. */}
            <polygon
              points={`${sx(0)},${sy(0)} ${sx(1)},${sy(0)} ${sx(1)},${sy(1)} ${sx(0)},${sy(1)}`}
              fill="none"
              style={{ stroke: VIZ.muted }}
              strokeWidth={1.2}
              strokeDasharray="4 3"
            />

            {/* The unit square after the map: its area IS the determinant. */}
            <polygon
              points={`${P(0, 0)} ${P(1, 0)} ${P(1, 1)} ${P(0, 1)}`}
              style={{
                fill: collapsed ? VIZ.warn : d < 0 ? VIZ.warn : VIZ.good,
                fillOpacity: collapsed ? 0.1 : 0.3,
                stroke: collapsed ? VIZ.warn : d < 0 ? VIZ.warn : VIZ.good,
              }}
              strokeWidth={2}
            />

            {/* The direction that gets crushed to a point. */}
            {nearCollapse && nullDir && (
              <line
                x1={sx(nullDir[0] * -R * 1.6)}
                y1={sy(nullDir[1] * -R * 1.6)}
                x2={sx(nullDir[0] * R * 1.6)}
                y2={sy(nullDir[1] * R * 1.6)}
                style={{ stroke: VIZ.warn, opacity: collapsed ? 0.9 : 0.35 }}
                strokeWidth={1.6}
                strokeDasharray="7 5"
              />
            )}

            <polygon
              points={F_SHAPE.map(([x, y]) => P(x, y)).join(' ')}
              style={{ fill: VIZ.series, fillOpacity: 0.34, stroke: VIZ.series }}
              strokeWidth={2}
              strokeLinejoin="round"
            />

            {/* Basis vectors: the two columns of the matrix, drawn. */}
            {([
              { v: apply(live, 1, 0), color: VIZ.good, name: 'î' },
              { v: apply(live, 0, 1), color: VIZ.info, name: 'ĵ' },
            ] as const).map((bv) => (
              <g key={bv.name}>
                <line
                  x1={sx(0)}
                  y1={sy(0)}
                  x2={sx(bv.v[0])}
                  y2={sy(bv.v[1])}
                  style={{ stroke: bv.color }}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <circle cx={sx(bv.v[0])} cy={sy(bv.v[1])} r={3.4} style={{ fill: bv.color }} />
                <text
                  x={sx(bv.v[0]) + 9}
                  y={sy(bv.v[1]) - 6}
                  fontSize={11}
                  fontWeight={600}
                  style={{ fill: bv.color }}
                >
                  {bv.name}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* The loud part. A zero determinant is not a small number; it is a different world. */}
      <div
        className={cn(
          'border-t px-4 py-3',
          collapsed ? 'border-line bg-danger/[0.09]' : nearCollapse ? 'border-line bg-warning/[0.07]' : 'border-line',
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-mono text-[13px] text-ink">
            det = ({live[0].toFixed(2)})({live[3].toFixed(2)}) − ({live[1].toFixed(2)})({live[2].toFixed(2)}) ={' '}
          </span>
          <span
            className={cn(
              'font-mono text-[15px] font-semibold tabular-nums',
              collapsed ? 'text-danger' : d < 0 ? 'text-warning' : 'text-success',
            )}
          >
            {d.toFixed(3)}
          </span>
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-muted">
          {collapsed ? (
            <>
              <strong className="text-danger">The plane has collapsed onto a line.</strong> Every point on the dashed
              direction lands on the same output, so the map has thrown information away and cannot be undone —
              <code className="mx-1 font-mono text-accent">np.linalg.inv</code> raises
              <code className="ml-1 font-mono text-accent">LinAlgError: Singular matrix</code>. The F has no area left
              to have.
            </>
          ) : nearCollapse ? (
            <>
              Nearly singular. The square still has area {Math.abs(d).toFixed(3)}, but only just — an inverse exists on
              paper and is numerically useless, which is what an <em>ill-conditioned</em> matrix means in practice.
            </>
          ) : d < 0 ? (
            <>
              Negative determinant: the F comes out mirror-imaged. The magnitude {Math.abs(d).toFixed(3)} is still the
              area factor; the minus sign records that the plane was turned over.
            </>
          ) : (
            <>
              Every area in the plane is multiplied by {d.toFixed(3)}, and the F keeps its handedness. Drag{' '}
              <span className="font-mono text-accent">b</span> or <span className="font-mono text-accent">c</span>{' '}
              until this number reaches zero, or take the Singular preset, and watch the grid fall onto one line.
            </>
          )}
        </p>
      </div>
    </WidgetShell>
  );
}
