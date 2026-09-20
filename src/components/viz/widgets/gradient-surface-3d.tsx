'use client';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PlayButton, Readout, Slider, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';

/**
 * Gradient descent on a 3D loss surface — the marquee visualisation of the
 * whole platform.
 *
 * A glowing ball starts somewhere on the surface, the gradient arrow shows
 * which way is downhill, and each step moves it by `-learningRate * gradient`.
 * The learning-rate slider is the point of the whole thing: too small and it
 * crawls, too large and it overshoots and diverges, which the learner sees
 * happen rather than reads about.
 */

type SurfaceKind = 'bowl' | 'valley' | 'bumpy';

const SURFACES: Record<SurfaceKind, { label: string; f: (x: number, y: number) => number; note: string }> = {
  bowl: {
    label: 'Convex bowl',
    f: (x, y) => 0.32 * (x * x + y * y),
    note: 'One minimum. Gradient descent always gets there if the step size is sane.',
  },
  valley: {
    label: 'Narrow valley',
    f: (x, y) => 0.06 * x * x + 0.95 * y * y,
    note: 'Steep across, shallow along. This is why plain descent zig-zags and why momentum exists.',
  },
  bumpy: {
    label: 'Bumpy landscape',
    f: (x, y) => 0.22 * (x * x + y * y) + 1.15 * Math.sin(1.35 * x) * Math.cos(1.35 * y),
    note: 'Several local minima. Where you start changes where you end up.',
  },
};

function gradient(f: (x: number, y: number) => number, x: number, y: number): [number, number] {
  const h = 1e-3;
  return [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)];
}

const RANGE = 3.4;
const RES = 44;

function Surface({ kind }: { kind: SurfaceKind }) {
  const geometry = React.useMemo(() => {
    const geo = new THREE.PlaneGeometry(RANGE * 2, RANGE * 2, RES, RES);
    const pos = geo.attributes.position!;
    const colors = new Float32Array(pos.count * 3);
    const f = SURFACES[kind].f;

    let min = Infinity;
    let max = -Infinity;
    const heights: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const z = f(pos.getX(i), pos.getY(i));
      heights.push(z);
      if (z < min) min = z;
      if (z > max) max = z;
    }
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, heights[i]!);
      const t = (heights[i]! - min) / Math.max(1e-6, max - min);
      // low loss = cool teal, high loss = warm violet
      colors[i * 3] = 0.16 + t * 0.55;
      colors[i * 3 + 1] = 0.72 - t * 0.5;
      colors[i * 3 + 2] = 0.72 + t * 0.25;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, [kind]);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.85} metalness={0.05} />
      </mesh>
      <lineSegments>
        <wireframeGeometry args={[geometry]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.07} />
      </lineSegments>
    </group>
  );
}

interface StepState {
  x: number;
  y: number;
  history: [number, number, number][];
  diverged: boolean;
  steps: number;
}

function Ball({
  kind,
  lr,
  playing,
  stateRef,
  onTick,
}: {
  kind: SurfaceKind;
  lr: number;
  playing: boolean;
  stateRef: React.RefObject<StepState>;
  onTick: (s: StepState) => void;
}) {
  const ball = React.useRef<THREE.Mesh>(null);
  const arrow = React.useRef<THREE.ArrowHelper>(null);
  const accumulator = React.useRef(0);
  const { camera } = useThree();

  // `<line>` collides with SVG's element in JSX typings, so the trail is a real
  // THREE.Line mounted through <primitive>.
  const trailGeometry = React.useMemo(() => new THREE.BufferGeometry(), []);
  const trailMaterial = React.useMemo(
    () => new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.75 }),
    [],
  );
  const trailObject = React.useMemo(
    () => new THREE.Line(trailGeometry, trailMaterial),
    [trailGeometry, trailMaterial],
  );
  React.useEffect(
    () => () => {
      trailGeometry.dispose();
      trailMaterial.dispose();
    },
    [trailGeometry, trailMaterial],
  );

  useFrame((_, delta) => {
    const s = stateRef.current;
    if (!s) return;
    const f = SURFACES[kind].f;

    if (playing && !s.diverged) {
      accumulator.current += delta;
      // One descent step every 110ms, so the motion is readable.
      while (accumulator.current > 0.11) {
        accumulator.current -= 0.11;
        const [gx, gy] = gradient(f, s.x, s.y);
        s.x -= lr * gx;
        s.y -= lr * gy;
        s.steps += 1;
        if (!Number.isFinite(s.x) || !Number.isFinite(s.y) || Math.abs(s.x) > 60 || Math.abs(s.y) > 60) {
          s.diverged = true;
          break;
        }
        s.history.push([s.x, f(s.x, s.y) + 0.12, s.y]);
        if (s.history.length > 260) s.history.shift();
        onTick({ ...s });
      }
    }

    const z = f(s.x, s.y);
    if (ball.current) {
      const shown = Math.max(-2, Math.min(12, z));
      ball.current.position.set(s.x, shown + 0.16, s.y);
      ball.current.visible = !s.diverged;
    }

    if (arrow.current) {
      const [gx, gy] = gradient(f, s.x, s.y);
      const mag = Math.hypot(gx, gy);
      arrow.current.visible = !s.diverged && mag > 0.02;
      if (mag > 0.02) {
        // The arrow points downhill: the direction a step actually goes.
        arrow.current.position.set(s.x, Math.min(12, z) + 0.2, s.y);
        arrow.current.setDirection(new THREE.Vector3(-gx / mag, 0, -gy / mag));
        arrow.current.setLength(Math.min(1.9, 0.45 + mag * 0.42), 0.3, 0.18);
      }
    }

    if (s.history.length > 1) {
      trailGeometry.setFromPoints(s.history.map(([x, y, zz]) => new THREE.Vector3(x, Math.min(12, y), zz)));
    }

    camera.lookAt(0, 0.6, 0);
  });

  return (
    <>
      <mesh ref={ball}>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshStandardMaterial color="#ffd166" emissive="#ffb703" emissiveIntensity={1.5} roughness={0.25} />
      </mesh>
      <pointLight position={[0, 4, 0]} intensity={18} distance={16} color="#ffd8a8" />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <arrowHelper ref={arrow as any} args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, 0xff6b6b, 0.3, 0.18]} />
      <primitive object={trailObject} />
    </>
  );
}

function Scene({
  kind,
  lr,
  playing,
  stateRef,
  onTick,
}: {
  kind: SurfaceKind;
  lr: number;
  playing: boolean;
  stateRef: React.RefObject<StepState>;
  onTick: (s: StepState) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 9, 4]} intensity={1.4} />
      <Surface kind={kind} />
      <Ball kind={kind} lr={lr} playing={playing} stateRef={stateRef} onTick={onTick} />
    </>
  );
}

const START: Record<SurfaceKind, [number, number]> = {
  bowl: [2.6, -2.2],
  valley: [3.0, 1.5],
  bumpy: [2.7, 2.4],
};

export default function GradientSurface3D() {
  const reduced = usePrefersReducedMotion();
  const [kind, setKind] = React.useState<SurfaceKind>('bowl');
  const [lr, setLr] = React.useState(0.25);
  const [playing, setPlaying] = React.useState(false);
  const [tick, setTick] = React.useState<{ loss: number; steps: number; diverged: boolean; grad: number }>({
    loss: 0,
    steps: 0,
    diverged: false,
    grad: 0,
  });

  const stateRef = React.useRef<StepState>({ x: START.bowl[0], y: START.bowl[1], history: [], diverged: false, steps: 0 });

  const reset = React.useCallback(
    (k: SurfaceKind = kind) => {
      const [x, y] = START[k];
      stateRef.current = { x, y, history: [], diverged: false, steps: 0 };
      const f = SURFACES[k].f;
      const [gx, gy] = gradient(f, x, y);
      setTick({ loss: f(x, y), steps: 0, diverged: false, grad: Math.hypot(gx, gy) });
    },
    [kind],
  );

  React.useEffect(() => {
    reset(kind);
    setPlaying(false);
  }, [kind, reset]);

  const onTick = React.useCallback(
    (s: StepState) => {
      const f = SURFACES[kind].f;
      const [gx, gy] = gradient(f, s.x, s.y);
      setTick({ loss: f(s.x, s.y), steps: s.steps, diverged: s.diverged, grad: Math.hypot(gx, gy) });
    },
    [kind],
  );

  const verdict = tick.diverged
    ? 'Diverged — the steps were larger than the valley.'
    : tick.grad < 0.02 && tick.steps > 0
      ? 'Converged — the slope is flat, so the steps stop.'
      : lr < 0.05
        ? 'Crawling. It will get there, eventually.'
        : lr > 0.6
          ? 'Large steps — watch for overshoot.'
          : 'Descending.';

  return (
    <WidgetShell
      takeaway="The learning rate is the size of each step. Too small and training takes forever; too large and the ball jumps past the bottom and can diverge entirely."
      readout={
        <Readout
          items={[
            { label: 'Loss', value: tick.loss.toFixed(3), tone: tick.diverged ? 'bad' : tick.loss < 0.05 ? 'good' : 'default' },
            { label: 'Gradient', value: tick.grad.toFixed(3) },
            { label: 'Steps', value: String(tick.steps) },
            { label: 'Status', value: verdict, tone: tick.diverged ? 'bad' : tick.grad < 0.02 && tick.steps > 0 ? 'good' : 'default' },
          ]}
        />
      }
      controls={
        <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Toggle
              label="Loss surface"
              value={kind}
              onChange={(v) => setKind(v as SurfaceKind)}
              options={Object.entries(SURFACES).map(([value, s]) => ({ value, label: s.label }))}
            />
            <PlayButton
              playing={playing}
              onToggle={() => setPlaying((p) => !p)}
              onReset={() => {
                setPlaying(false);
                reset();
              }}
              label="gradient descent"
            />
          </div>
          <Slider
            label="Learning rate (α)"
            value={lr}
            min={0.01}
            max={1.2}
            step={0.01}
            onChange={setLr}
            format={(v) => v.toFixed(2)}
            hint={SURFACES[kind].note}
          />
        </>
      }
    >
      <div className="h-72 w-full bg-[hsl(var(--c-surface-2))] sm:h-80">
        {reduced ? (
          <div className="grid h-full place-items-center p-6 text-center">
            <p className="max-w-sm text-[12.5px] leading-relaxed text-subtle">
              The 3D animation is off because you have asked for reduced motion. Use{' '}
              <strong className="text-ink">Step</strong> below to advance the descent one step at a time, or read the
              readout: at α = {lr.toFixed(2)} the loss moves from its start toward zero by{' '}
              <span className="font-mono text-accent">−α × gradient</span> each step.
            </p>
          </div>
        ) : (
          <Canvas
            camera={{ position: [6.8, 6.4, 8.2], fov: 42 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: 'low-power' }}
          >
            <Scene kind={kind} lr={lr} playing={playing} stateRef={stateRef} onTick={onTick} />
          </Canvas>
        )}
      </div>
    </WidgetShell>
  );
}
