'use client';

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlayButton, Readout, Slider, WidgetShell, useToken } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * What an embedding space is for, in three dimensions you can turn over.
 *
 * Two claims about word vectors sound like marketing until you can see them:
 * that words used in similar contexts end up near one another, and that some
 * directions in the space carry meaning, so that king − man + woman lands near
 * queen. Both are true of real models, and both are invisible in 300
 * dimensions.
 *
 * So these 24 vectors are hand-placed, not trained — a diagram of a real
 * phenomenon rather than a measurement of one, which the takeaway says out
 * loud. Nothing here is random: every coordinate is written down in the table
 * below, so there is no seed and nothing shifts between visits.
 *
 * Similarity is cosine, never distance, because cosine is what the field
 * actually uses and because it makes the analogy arrive where it should.
 * Selecting a word draws its nearest neighbours with the number on each line;
 * the analogy control adds the result vector as a ring so you can see it land
 * in the royalty cluster rather than be told that it does.
 */

type GroupKey = 'people' | 'animals' | 'foods' | 'countries' | 'verbs' | 'numbers';

const GROUPS: Record<GroupKey, { label: string; token: string; fallback: string }> = {
  people: { label: 'People', token: '--viz-series', fallback: '#8164f7' },
  animals: { label: 'Animals', token: '--viz-cat-mastered', fallback: '#199e70' },
  foods: { label: 'Foods', token: '--viz-cat-review', fallback: '#d95926' },
  countries: { label: 'Countries', token: '--viz-cat-learning', fallback: '#3987e5' },
  verbs: { label: 'Verbs', token: '--viz-series-soft', fallback: '#a78bfa' },
  numbers: { label: 'Numbers', token: '--viz-cat-none', fallback: '#4a5265' },
};

interface Word {
  word: string;
  group: GroupKey;
  v: [number, number, number];
}

/**
 * Hand-authored coordinates. The people cluster is laid out so that two real
 * directions exist inside it — one for gender, one for royalty — which is what
 * makes the analogy work rather than a coincidence.
 */
const WORDS: Word[] = [
  { word: 'man', group: 'people', v: [2.0, -1.2, 0.2] },
  { word: 'woman', group: 'people', v: [2.0, 1.2, 0.2] },
  { word: 'king', group: 'people', v: [2.6, -1.2, 1.6] },
  { word: 'queen', group: 'people', v: [2.5, 1.35, 1.7] },
  { word: 'prince', group: 'people', v: [2.35, -0.95, 1.3] },

  { word: 'dog', group: 'animals', v: [-2.3, 1.7, 0.5] },
  { word: 'cat', group: 'animals', v: [-2.2, 1.95, 0.35] },
  { word: 'horse', group: 'animals', v: [-2.45, 1.55, 0.8] },
  { word: 'wolf', group: 'animals', v: [-2.1, 1.85, 0.75] },
  { word: 'tiger', group: 'animals', v: [-2.35, 2.05, 0.6] },

  { word: 'bread', group: 'foods', v: [0.55, -2.35, 1.85] },
  { word: 'pizza', group: 'foods', v: [0.3, -2.55, 1.95] },
  { word: 'apple', group: 'foods', v: [0.6, -2.2, 2.05] },
  { word: 'soup', group: 'foods', v: [0.25, -2.45, 1.7] },

  { word: 'france', group: 'countries', v: [-1.15, -1.05, -2.45] },
  { word: 'japan', group: 'countries', v: [-1.35, -0.85, -2.35] },
  { word: 'brazil', group: 'countries', v: [-1.05, -1.25, -2.3] },
  { word: 'egypt', group: 'countries', v: [-1.25, -1.1, -2.55] },

  { word: 'run', group: 'verbs', v: [1.7, 2.35, -1.45] },
  { word: 'walk', group: 'verbs', v: [1.55, 2.5, -1.3] },
  { word: 'sing', group: 'verbs', v: [1.45, 2.3, -1.6] },

  { word: 'three', group: 'numbers', v: [-2.45, -1.85, 1.15] },
  { word: 'seven', group: 'numbers', v: [-2.6, -1.7, 1.25] },
  { word: 'twelve', group: 'numbers', v: [-2.4, -1.95, 1.3] },
];

type Vec3 = [number, number, number];

function cosine(a: Vec3, b: Vec3): number {
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const na = Math.hypot(a[0], a[1], a[2]);
  const nb = Math.hypot(b[0], b[1], b[2]);
  return na < 1e-9 || nb < 1e-9 ? 0 : dot / (na * nb);
}

const ANALOGIES: { a: string; b: string; c: string; label: string }[] = [
  { a: 'king', b: 'man', c: 'woman', label: 'king − man + woman' },
  { a: 'queen', b: 'woman', c: 'man', label: 'queen − woman + man' },
  { a: 'dog', b: 'cat', c: 'apple', label: 'dog − cat + apple' },
];

/** A text label baked into a canvas texture — no font is fetched over the network. */
function makeLabelSprite(text: string, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 64);
    ctx.font = '600 38px ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.strokeText(text, 128, 34);
    ctx.fillStyle = color;
    ctx.fillText(text, 128, 34);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.5, 0.375, 1);
  return sprite;
}

function Cloud({
  colors,
  selected,
  neighbours,
  onSelect,
  analogyPoint,
  analogyTarget,
  linkColor,
  analogyColor,
}: {
  colors: Record<GroupKey, string>;
  selected: string | null;
  neighbours: { word: string; sim: number }[];
  onSelect: (w: string) => void;
  analogyPoint: Vec3 | null;
  analogyTarget: Vec3 | null;
  linkColor: string;
  analogyColor: string;
}) {
  const sphere = React.useMemo(() => new THREE.SphereGeometry(0.15, 18, 18), []);
  const ring = React.useMemo(() => new THREE.TorusGeometry(0.3, 0.06, 10, 28), []);

  const materials = React.useMemo(() => {
    const out = {} as Record<GroupKey, THREE.MeshStandardMaterial>;
    (Object.keys(GROUPS) as GroupKey[]).forEach((g) => {
      out[g] = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors[g]),
        emissive: new THREE.Color(colors[g]),
        emissiveIntensity: 0.3,
        roughness: 0.45,
        metalness: 0.05,
      });
    });
    return out;
  }, [colors]);

  const analogyMaterial = React.useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(analogyColor), emissive: new THREE.Color(analogyColor), emissiveIntensity: 0.9, roughness: 0.3 }),
    [analogyColor],
  );

  // Textures are expensive, so the sprites are built once per palette and only
  // their opacity changes as the selection moves.
  const sprites = React.useMemo(
    () =>
      WORDS.map((w) => {
        const s = makeLabelSprite(w.word, colors[w.group]);
        s.position.set(w.v[0], w.v[1] + 0.34, w.v[2]);
        return s;
      }),
    [colors],
  );

  React.useEffect(() => {
    sprites.forEach((s, i) => {
      const word = WORDS[i].word;
      const isHot = word === selected || neighbours.some((n) => n.word === word);
      s.material.opacity = selected === null || isHot ? 1 : 0.3;
    });
  }, [sprites, selected, neighbours]);

  // Neighbour links and the analogy arrow share one line object.
  const lineGeometry = React.useMemo(() => new THREE.BufferGeometry(), []);
  const lineMaterial = React.useMemo(
    () => new THREE.LineBasicMaterial({ color: new THREE.Color(linkColor), transparent: true, opacity: 0.85 }),
    [linkColor],
  );
  const lineObject = React.useMemo(() => new THREE.LineSegments(lineGeometry, lineMaterial), [lineGeometry, lineMaterial]);

  React.useEffect(() => {
    const pts: THREE.Vector3[] = [];
    const sel = WORDS.find((w) => w.word === selected);
    if (sel) {
      for (const n of neighbours) {
        const other = WORDS.find((w) => w.word === n.word);
        if (!other) continue;
        pts.push(new THREE.Vector3(...sel.v), new THREE.Vector3(...other.v));
      }
    }
    if (analogyPoint && analogyTarget) {
      pts.push(new THREE.Vector3(...analogyPoint), new THREE.Vector3(...analogyTarget));
    }
    lineGeometry.setFromPoints(pts.length ? pts : [new THREE.Vector3(), new THREE.Vector3()]);
  }, [lineGeometry, selected, neighbours, analogyPoint, analogyTarget]);

  // Disposal is split one effect per resource. Sharing a single effect would
  // mean that rebuilding the labels also disposed the sphere geometry that all
  // 24 points are still drawing with.
  React.useEffect(() => () => sphere.dispose(), [sphere]);
  React.useEffect(() => () => ring.dispose(), [ring]);
  React.useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);
  React.useEffect(() => () => analogyMaterial.dispose(), [analogyMaterial]);
  React.useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);
  React.useEffect(() => () => lineMaterial.dispose(), [lineMaterial]);
  React.useEffect(
    () => () =>
      sprites.forEach((s) => {
        s.material.map?.dispose();
        s.material.dispose();
      }),
    [sprites],
  );

  return (
    <>
      {WORDS.map((w) => {
        const isSelected = w.word === selected;
        const isNeighbour = neighbours.some((n) => n.word === w.word);
        const scale = isSelected ? 1.9 : isNeighbour ? 1.4 : 1;
        return (
          <mesh
            key={w.word}
            geometry={sphere}
            material={materials[w.group]}
            position={w.v}
            scale={scale}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(w.word);
            }}
          />
        );
      })}
      {sprites.map((s, i) => (
        <primitive key={WORDS[i].word} object={s} />
      ))}
      <primitive object={lineObject} />
      {analogyPoint && (
        <mesh geometry={ring} material={analogyMaterial} position={analogyPoint} rotation={[Math.PI / 2, 0, 0]} />
      )}
    </>
  );
}

function Orbit({
  spin,
  yaw,
  pitch,
  children,
}: {
  spin: boolean;
  yaw: number;
  pitch: number;
  children: React.ReactNode;
}) {
  const outer = React.useRef<THREE.Group>(null);
  const inner = React.useRef<THREE.Group>(null);
  const drift = React.useRef(0);

  useFrame((_, delta) => {
    if (spin) drift.current += delta * 0.22;
    if (outer.current) outer.current.rotation.x = pitch;
    if (inner.current) inner.current.rotation.y = yaw + drift.current;
  });

  return (
    <group ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

export default function EmbeddingSpace3D({ props }: { props?: Record<string, unknown> }) {
  void props;
  const reduced = usePrefersReducedMotion();

  const colors: Record<GroupKey, string> = {
    people: useToken(GROUPS.people.token, GROUPS.people.fallback),
    animals: useToken(GROUPS.animals.token, GROUPS.animals.fallback),
    foods: useToken(GROUPS.foods.token, GROUPS.foods.fallback),
    countries: useToken(GROUPS.countries.token, GROUPS.countries.fallback),
    verbs: useToken(GROUPS.verbs.token, GROUPS.verbs.fallback),
    numbers: useToken(GROUPS.numbers.token, GROUPS.numbers.fallback),
  };
  const linkColor = useToken('--viz-cat-mastered', '#199e70');
  const analogyColor = useToken('--viz-cat-review', '#d95926');
  const gridColor = useToken('--viz-cat-none', '#4a5265');

  const [selected, setSelected] = React.useState<string | null>('king');
  const [spin, setSpin] = React.useState(false);
  const [yaw, setYaw] = React.useState(0.5);
  const [pitch, setPitch] = React.useState(0.22);
  const [showAnalogy, setShowAnalogy] = React.useState(true);
  const [analogy, setAnalogy] = React.useState(ANALOGIES[0]);

  React.useEffect(() => {
    if (reduced) setSpin(false);
  }, [reduced]);

  const drag = React.useRef<{ x: number; y: number } | null>(null);

  const neighbours = React.useMemo(() => {
    const sel = WORDS.find((w) => w.word === selected);
    if (!sel) return [];
    return WORDS.filter((w) => w.word !== sel.word)
      .map((w) => ({ word: w.word, group: w.group, sim: cosine(sel.v, w.v) }))
      .sort((a, b) => b.sim - a.sim)
      .slice(0, 4);
  }, [selected]);

  const analogyResult = React.useMemo(() => {
    if (!showAnalogy) return null;
    const A = WORDS.find((w) => w.word === analogy.a);
    const B = WORDS.find((w) => w.word === analogy.b);
    const C = WORDS.find((w) => w.word === analogy.c);
    if (!A || !B || !C) return null;
    const v: Vec3 = [A.v[0] - B.v[0] + C.v[0], A.v[1] - B.v[1] + C.v[1], A.v[2] - B.v[2] + C.v[2]];
    const ranked = WORDS.filter((w) => ![analogy.a, analogy.b, analogy.c].includes(w.word))
      .map((w) => ({ word: w.word, sim: cosine(v, w.v), v: w.v }))
      .sort((x, y) => y.sim - x.sim);
    return { v, ranked: ranked.slice(0, 3) };
  }, [showAnalogy, analogy]);

  const topSim = neighbours[0];

  const selectOptions = WORDS.map((w) => (
    <option key={w.word} value={w.word}>
      {w.word}
    </option>
  ));

  const wordPicker = (label: string, value: string, onChange: (v: string) => void) => (
    <label className="flex min-w-0 flex-1 items-center gap-1.5">
      <span className="shrink-0 text-[11.5px] text-subtle">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 rounded-md border border-line bg-surface-2 px-1.5 py-1 font-mono text-[12px] text-ink outline-none focus:border-primary"
      >
        {selectOptions}
      </select>
    </label>
  );

  return (
    <WidgetShell
      takeaway="This is a hand-made illustration, not a trained model: 24 vectors placed by hand in 3 dimensions so the structure is visible at all. Real embeddings do exactly this in 300 to 4096 dimensions, where no one can look — which is why cosine similarity, and not your eyes, is the instrument."
      readout={
        <Readout
          items={[
            { label: 'selected', value: selected ?? '—' },
            { label: 'nearest', value: topSim ? topSim.word : '—' },
            { label: 'cos', value: topSim ? topSim.sim.toFixed(3) : '—', tone: 'good' },
            ...(analogyResult
              ? [{ label: 'analogy → ', value: `${analogyResult.ranked[0].word} (${analogyResult.ranked[0].sim.toFixed(3)})`, tone: 'good' as const }]
              : []),
          ]}
        />
      }
      controls={
        <>
          <div>
            <p className="mb-1 text-[12px] font-medium text-muted">Pick a word</p>
            <div className="flex flex-wrap gap-1">
              {WORDS.map((w) => {
                const isSel = w.word === selected;
                const isN = neighbours.some((n) => n.word === w.word);
                return (
                  <button
                    key={w.word}
                    type="button"
                    aria-pressed={isSel}
                    onClick={() => setSelected(w.word)}
                    className={cn(
                      'rounded-md border px-1.5 py-0.5 font-mono text-[11px] transition-colors',
                      isSel ? 'border-primary bg-primary/20 text-ink' : isN ? 'border-line-strong text-ink' : 'border-line bg-surface-2 text-subtle hover:text-ink',
                    )}
                    style={isSel || isN ? { borderColor: colors[w.group] } : undefined}
                  >
                    {w.word}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex min-w-[11rem] flex-1 flex-col gap-2">
              <Slider label="Turn (yaw)" value={yaw} min={-3.14} max={3.14} step={0.01} onChange={setYaw} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
              <Slider label="Tilt (pitch)" value={pitch} min={-0.9} max={0.9} step={0.01} onChange={setPitch} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
            </div>
            <PlayButton
              playing={spin && !reduced}
              onToggle={() => {
                if (!reduced) setSpin((s) => !s);
              }}
              onReset={() => {
                setSpin(false);
                setYaw(0.5);
                setPitch(0.22);
              }}
              label="the slow rotation"
            />
          </div>
          {reduced && (
            <p className="-mt-1 text-[11px] text-subtle">
              Motion is reduced, so the cloud does not spin. Drag it, or use the two sliders.
            </p>
          )}

          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-[12px] font-medium text-muted">Analogy: a − b + c</p>
              <button
                type="button"
                aria-pressed={showAnalogy}
                onClick={() => setShowAnalogy((s) => !s)}
                className={cn(
                  'rounded-md border px-2 py-0.5 text-[11.5px] transition-colors',
                  showAnalogy ? 'border-primary bg-primary/15 text-ink' : 'border-line bg-surface-2 text-subtle hover:text-ink',
                )}
              >
                {showAnalogy ? 'On' : 'Off'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ANALOGIES.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => {
                    setAnalogy(a);
                    setShowAnalogy(true);
                  }}
                  className={cn(
                    'rounded-md border px-2 py-1 font-mono text-[11px] transition-colors',
                    analogy.label === a.label ? 'border-primary bg-primary/15 text-ink' : 'border-line bg-surface-2 text-muted hover:text-ink',
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {wordPicker('a', analogy.a, (v) => setAnalogy((p) => ({ ...p, a: v, label: `${v} − ${p.b} + ${p.c}` })))}
              {wordPicker('− b', analogy.b, (v) => setAnalogy((p) => ({ ...p, b: v, label: `${p.a} − ${v} + ${p.c}` })))}
              {wordPicker('+ c', analogy.c, (v) => setAnalogy((p) => ({ ...p, c: v, label: `${p.a} − ${p.b} + ${v}` })))}
            </div>
          </div>
        </>
      }
    >
      <div
        className="h-72 w-full touch-none bg-[hsl(var(--c-surface-2))] sm:h-80"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY };
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          drag.current = { x: e.clientX, y: e.clientY };
          setYaw((p) => Math.max(-3.14, Math.min(3.14, p + dx * 0.008)));
          setPitch((p) => Math.max(-0.9, Math.min(0.9, p + dy * 0.006)));
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerLeave={() => {
          drag.current = null;
        }}
      >
        <Canvas camera={{ position: [0, 2.4, 9.2], fov: 46 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'low-power' }}>
          <ambientLight intensity={0.85} />
          <directionalLight position={[4, 7, 6]} intensity={1.1} />
          <Orbit spin={spin && !reduced} yaw={yaw} pitch={pitch}>
            <gridHelper args={[10, 10, gridColor, gridColor]} position={[0, -3.4, 0]} />
            <Cloud
              colors={colors}
              selected={selected}
              neighbours={neighbours}
              onSelect={setSelected}
              analogyPoint={analogyResult ? analogyResult.v : null}
              analogyTarget={analogyResult ? (WORDS.find((w) => w.word === analogyResult.ranked[0].word)?.v ?? null) : null}
              linkColor={linkColor}
              analogyColor={analogyColor}
            />
          </Orbit>
        </Canvas>
      </div>

      <div className="border-t border-line p-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {(Object.keys(GROUPS) as GroupKey[]).map((g) => (
            <span key={g} className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[g] }} aria-hidden="true" />
              {GROUPS[g].label}
            </span>
          ))}
        </div>

        {selected && (
          <div className="mt-3">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
              Nearest to “{selected}” by cosine similarity
            </p>
            <ul className="space-y-1">
              {neighbours.map((n) => (
                <li key={n.word} className="flex items-center gap-2 text-[12px]">
                  <span className="w-16 shrink-0 font-mono text-ink">{n.word}</span>
                  <span className="h-1.5 min-w-[2px] flex-1 overflow-hidden rounded-full bg-surface-3">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${Math.max(0, n.sim) * 100}%`, backgroundColor: linkColor }}
                    />
                  </span>
                  <span className="w-14 shrink-0 text-right font-mono tabular-nums text-muted">{n.sim.toFixed(3)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-subtle">
              Similarity runs from −1 to 1, and words from other clusters land near zero or below. Distance is not used
              here: a long vector and a short one pointing the same way are the same word direction.
            </p>
          </div>
        )}

        {analogyResult && (
          <div className="mt-3 rounded-md border border-line bg-surface-2/60 p-3">
            <p className="font-mono text-[12.5px] text-ink">
              {analogy.a} − {analogy.b} + {analogy.c} = ({analogyResult.v.map((n) => n.toFixed(2)).join(', ')})
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {analogyResult.ranked.map((r, i) => (
                <li key={r.word} className="flex items-baseline gap-2 text-[12px]">
                  <span className={cn('w-4 shrink-0 font-mono tabular-nums', i === 0 ? 'text-accent' : 'text-subtle')}>
                    {i + 1}.
                  </span>
                  <span className={cn('w-16 shrink-0 font-mono', i === 0 ? 'font-semibold text-ink' : 'text-muted')}>
                    {r.word}
                  </span>
                  <span className="font-mono tabular-nums text-muted">{r.sim.toFixed(3)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-subtle">
              The ring in the scene is where that arithmetic lands. It does not sit exactly on{' '}
              {analogyResult.ranked[0].word} — it never does, in a real model either. The claim is only that the
              nearest word to the result is the one that completes the analogy, and the gap between the top two scores
              is how much that claim is worth.
            </p>
          </div>
        )}

        <details className="mt-3">
          <summary className="cursor-pointer text-[11.5px] text-subtle hover:text-ink">
            The 24 vectors, written out
          </summary>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-[11.5px]">
              <thead>
                <tr className="border-b border-line text-left text-subtle">
                  <th scope="col" className="py-1 pr-3 font-medium">word</th>
                  <th scope="col" className="py-1 pr-3 font-medium">cluster</th>
                  <th scope="col" className="py-1 font-medium">vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {WORDS.map((w) => (
                  <tr key={w.word}>
                    <td className="py-1 pr-3 font-mono text-ink">{w.word}</td>
                    <td className="py-1 pr-3 text-muted">{GROUPS[w.group].label}</td>
                    <td className="py-1 font-mono tabular-nums text-muted">
                      [{w.v.map((n) => n.toFixed(2)).join(', ')}]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </WidgetShell>
  );
}
