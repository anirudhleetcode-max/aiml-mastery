'use client';

import * as React from 'react';
import { Readout, Slider, Toggle, VIZ, WidgetShell, useResponsiveCanvas } from './shared';
import { cn } from '@/lib/cn';

/**
 * Data augmentation, with the question nobody asks first: does the label
 * survive?
 *
 * Augmentation is usually taught as a list of transforms and a promise of more
 * data for free. The promise holds only while the transform preserves the
 * label, and that depends entirely on the task. A horizontal flip is the
 * default augmentation for photographs and a catastrophe for digits and text:
 * flip a 6 and you have something that is not a 6; flip a b and you have a d.
 * Every control here is checked against the selected task, and anything that
 * breaks the label is named and explained rather than quietly applied.
 */

const SIZE = 64;

/** Small, fast, seeded PRNG, so noise and cutout placement are reproducible. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Resolves a design token to something a canvas can paint. */
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

type SubjectId = 'digit' | 'letter' | 'cat' | 'sign';

interface Subject {
  id: SubjectId;
  label: string;
  task: string;
  classLabel: string;
  note: string;
}

const SUBJECTS: Record<SubjectId, Subject> = {
  digit: {
    id: 'digit',
    label: 'Digit',
    task: 'handwritten digit recognition',
    classLabel: '6',
    note: 'Orientation is the label. Rotate this far enough and the correct answer becomes a different class.',
  },
  letter: {
    id: 'letter',
    label: 'Letter',
    task: 'character recognition in text',
    classLabel: 'b',
    note: 'Latin letters come in mirrored pairs: b and d, p and q. A flip does not augment the class, it changes it.',
  },
  cat: {
    id: 'cat',
    label: 'Photo',
    task: 'object classification (is there a cat?)',
    classLabel: 'cat',
    note: 'Natural photographs are the forgiving case: the label depends on what is present, not on which way it faces.',
  },
  sign: {
    id: 'sign',
    label: 'Traffic sign',
    task: 'traffic-sign classification',
    classLabel: 'turn right',
    note: 'A mirrored right-turn sign is a perfectly valid image of a different instruction — the most expensive kind of mislabelling.',
  },
};

/** Draws the subject once into an offscreen canvas and reads back intensities. */
function makeSource(subject: SubjectId): Float32Array {
  const out = new Float32Array(SIZE * SIZE);
  if (typeof document === 'undefined') return out;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return out;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';

  if (subject === 'digit' || subject === 'letter') {
    ctx.font = `bold ${subject === 'digit' ? 50 : 52}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(SUBJECTS[subject].classLabel, SIZE / 2, SIZE / 2 + 2);
  } else if (subject === 'cat') {
    // Head, ears, body, tail — enough of a creature to recognise after a flip.
    ctx.beginPath();
    ctx.ellipse(32, 40, 17, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(32, 24, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(23, 16);
    ctx.lineTo(25, 4);
    ctx.lineTo(33, 14);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(41, 16);
    ctx.lineTo(39, 4);
    ctx.lineTo(31, 14);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(48, 44);
    ctx.quadraticCurveTo(60, 40, 56, 26);
    ctx.stroke();
  } else {
    // A right-pointing arrow inside a rounded plate.
    ctx.globalAlpha = 0.35;
    ctx.fillRect(6, 6, 52, 52);
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(14, 27);
    ctx.lineTo(36, 27);
    ctx.lineTo(36, 17);
    ctx.lineTo(52, 32);
    ctx.lineTo(36, 47);
    ctx.lineTo(36, 37);
    ctx.lineTo(14, 37);
    ctx.closePath();
    ctx.fill();
  }

  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  for (let i = 0; i < SIZE * SIZE; i++) out[i] = data[i * 4] / 255;
  return out;
}

interface Params {
  flipH: boolean;
  flipV: boolean;
  rotate: number;
  zoom: number;
  brightness: number;
  contrast: number;
  noise: number;
  cutout: number;
  seed: number;
}

function augment(src: Float32Array, p: Params): Float32Array {
  const out = new Float32Array(SIZE * SIZE);
  const rng = mulberry32(p.seed * 9176 + 5);
  const theta = (-p.rotate * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  // The cutout patch is placed once, from the seed, not per pixel.
  const cutSize = p.cutout * SIZE;
  const cutX = rng() * (SIZE - cutSize);
  const cutY = rng() * (SIZE - cutSize);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      // Inverse mapping: for each output pixel, find where it came from.
      let nx = ((x + 0.5) / SIZE) * 2 - 1;
      let ny = ((y + 0.5) / SIZE) * 2 - 1;
      nx /= p.zoom;
      ny /= p.zoom;
      let rx = nx * cos - ny * sin;
      let ry = nx * sin + ny * cos;
      if (p.flipH) rx = -rx;
      if (p.flipV) ry = -ry;
      const sx = Math.round(((rx + 1) / 2) * SIZE - 0.5);
      const sy = Math.round(((ry + 1) / 2) * SIZE - 0.5);
      let v = sx >= 0 && sx < SIZE && sy >= 0 && sy < SIZE ? src[sy * SIZE + sx] : 0;

      v = (v - 0.5) * p.contrast + 0.5 + p.brightness;
      if (p.noise > 0) v += (rng() * 2 - 1) * p.noise;
      if (p.cutout > 0 && x >= cutX && x < cutX + cutSize && y >= cutY && y < cutY + cutSize) v = 0;
      out[y * SIZE + x] = Math.max(0, Math.min(1, v));
    }
  }
  return out;
}

type Verdict = 'safe' | 'risky' | 'destroys';

interface Check {
  name: string;
  verdict: Verdict;
  reason: string;
}

function checks(subject: SubjectId, p: Params): Check[] {
  const list: Check[] = [];
  const orientationMatters = subject !== 'cat';

  if (p.flipH) {
    list.push(
      subject === 'cat'
        ? { name: 'Horizontal flip', verdict: 'safe', reason: 'A mirrored cat is still a cat. This is why horizontal flip is the default augmentation for natural photographs.' }
        : subject === 'letter'
          ? { name: 'Horizontal flip', verdict: 'destroys', reason: 'A mirrored b is a d. The image is still a letter, but no longer this letter — training on it teaches the model that b and d are the same class.' }
          : subject === 'digit'
            ? { name: 'Horizontal flip', verdict: 'destroys', reason: 'A mirrored 6 is not any digit. The label 6 is now false, and the model is being taught nonsense.' }
            : { name: 'Horizontal flip', verdict: 'destroys', reason: 'A mirrored "turn right" sign reads as "turn left". The pixels are plausible; the label is wrong, which is worse than no data.' },
    );
  }
  if (p.flipV) {
    list.push(
      subject === 'cat'
        ? { name: 'Vertical flip', verdict: 'risky', reason: 'The label survives — it is still a cat — but upside-down cats never appear at test time, so the capacity spent on them is wasted.' }
        : subject === 'digit'
          ? { name: 'Vertical flip', verdict: 'destroys', reason: 'Flipping a 6 vertically produces a shape much closer to a 9. The label no longer matches the image.' }
          : { name: 'Vertical flip', verdict: 'destroys', reason: 'Vertical mirroring turns this class into a different one (b into p, an arrow sign into an invalid instruction).' },
    );
  }
  const rot = Math.abs(p.rotate);
  if (rot > 0.5) {
    if (subject === 'digit' && rot > 100) {
      list.push({ name: `Rotation ${p.rotate.toFixed(0)}°`, verdict: 'destroys', reason: 'Rotate a 6 by about 180° and you have a 9 — the textbook example of an augmentation that silently relabels your data.' });
    } else if (orientationMatters && rot > 45) {
      list.push({ name: `Rotation ${p.rotate.toFixed(0)}°`, verdict: 'destroys', reason: 'Past about 45° the character or sign is no longer a plausible example of its class in any real dataset.' });
    } else if (rot > (subject === 'cat' ? 35 : 15)) {
      list.push({ name: `Rotation ${p.rotate.toFixed(0)}°`, verdict: 'risky', reason: 'Small rotations are genuine variation; large ones drift outside the distribution you will actually see.' });
    } else {
      list.push({ name: `Rotation ${p.rotate.toFixed(0)}°`, verdict: 'safe', reason: 'A few degrees of tilt is exactly the variation a camera or a handwriting sample produces.' });
    }
  }
  if (p.zoom > 1.01) {
    list.push(
      p.zoom > 1.9
        ? { name: `Crop ${p.zoom.toFixed(2)}×`, verdict: 'risky', reason: 'At this zoom the subject is being cut by the frame; a crop that removes the distinguishing part of the object removes the label with it.' }
        : { name: `Crop ${p.zoom.toFixed(2)}×`, verdict: 'safe', reason: 'Random cropping teaches the model that the object can sit anywhere and at any scale in the frame.' },
    );
  }
  if (Math.abs(p.brightness) > 0.01) {
    list.push({ name: `Brightness ${p.brightness > 0 ? '+' : ''}${p.brightness.toFixed(2)}`, verdict: Math.abs(p.brightness) > 0.35 ? 'risky' : 'safe', reason: Math.abs(p.brightness) > 0.35 ? 'Pushed this far the subject is washing out; photometric changes are safe only while the subject stays visible.' : 'Photometric changes never move a pixel, so the shape — and therefore the label — is untouched.' });
  }
  if (Math.abs(p.contrast - 1) > 0.01) {
    list.push({ name: `Contrast ${p.contrast.toFixed(2)}×`, verdict: p.contrast < 0.5 ? 'risky' : 'safe', reason: p.contrast < 0.5 ? 'Near-flat contrast leaves almost no signal to learn from.' : 'Cameras and scanners vary in contrast; this is free, label-preserving variation.' });
  }
  if (p.noise > 0.01) {
    list.push({ name: `Noise ${p.noise.toFixed(2)}`, verdict: p.noise > 0.35 ? 'risky' : 'safe', reason: p.noise > 0.35 ? 'Beyond this the subject is buried, and the model is being asked to learn from grain.' : 'Sensor noise is real, and training through it is the cheapest robustness you can buy.' });
  }
  if (p.cutout > 0.01) {
    list.push(
      p.cutout > 0.45
        ? { name: `Cutout ${(p.cutout * 100).toFixed(0)}%`, verdict: 'risky', reason: 'Occluding this much of the image can remove the only region that identifies the class — the loop of the 6, the arrowhead of the sign.' }
        : { name: `Cutout ${(p.cutout * 100).toFixed(0)}%`, verdict: 'safe', reason: 'Hiding a patch stops the model leaning on any single region, which is the whole idea behind cutout and random erasing.' },
    );
  }
  return list;
}

export default function AugmentationLab() {
  const [subject, setSubject] = React.useState<SubjectId>('digit');
  const [flipH, setFlipH] = React.useState(true);
  const [flipV, setFlipV] = React.useState(false);
  const [rotate, setRotate] = React.useState(0);
  const [zoom, setZoom] = React.useState(1);
  const [brightness, setBrightness] = React.useState(0);
  const [contrast, setContrast] = React.useState(1);
  const [noise, setNoise] = React.useState(0);
  const [cutout, setCutout] = React.useState(0);
  const [seed, setSeed] = React.useState(3);

  const params: Params = { flipH, flipV, rotate, zoom, brightness, contrast, noise, cutout, seed };
  const source = React.useMemo(() => makeSource(subject), [subject]);
  const result = React.useMemo(() => augment(source, params), [source, flipH, flipV, rotate, zoom, brightness, contrast, noise, cutout, seed]); // eslint-disable-line react-hooks/exhaustive-deps

  const verdicts = checks(subject, params);
  const broken = verdicts.filter((c) => c.verdict === 'destroys');
  const risky = verdicts.filter((c) => c.verdict === 'risky');
  const status: Verdict = broken.length ? 'destroys' : risky.length ? 'risky' : 'safe';

  const paint = React.useCallback((grid: Float32Array) => (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const resolve = makeResolve();
    const ink = resolve('hsl(var(--c-text))', '#eee');
    const bg = resolve('hsl(var(--c-surface-2))', '#111');
    const cell = Math.min(w, h) / SIZE;
    const ox = (w - cell * SIZE) / 2;
    const oy = (h - cell * SIZE) / 2;
    ctx.fillStyle = bg;
    ctx.fillRect(ox, oy, cell * SIZE, cell * SIZE);
    ctx.fillStyle = ink;
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        ctx.globalAlpha = grid[y * SIZE + x];
        ctx.fillRect(ox + x * cell, oy + y * cell, cell + 0.5, cell + 0.5);
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  const drawSource = React.useMemo(() => paint(source), [paint, source]);
  const drawResult = React.useMemo(() => paint(result), [paint, result]);
  const { canvasRef: originalCanvas } = useResponsiveCanvas(drawSource, [drawSource]);
  const { canvasRef: augmentedCanvas } = useResponsiveCanvas(drawResult, [drawResult]);

  const subj = SUBJECTS[subject];
  const activeCount = verdicts.length;

  return (
    <WidgetShell
      takeaway="Augmentation is only free data while the label survives the transform. A horizontal flip is the default for photographs and a labelling error for digits, letters and traffic signs — so the question is never 'which augmentations are good', it is 'which of them leave this task's label alone'."
      readout={
        <Readout
          items={[
            { label: 'Task', value: subj.task },
            { label: 'Label', value: subj.classLabel },
            { label: 'Augmentations applied', value: String(activeCount) },
            {
              label: 'Label status',
              value: status === 'destroys' ? 'broken' : status === 'risky' ? 'questionable' : 'preserved',
              tone: status === 'destroys' ? 'bad' : status === 'risky' ? 'warn' : 'good',
            },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="Subject and task"
            value={subject}
            onChange={(v) => setSubject(v as SubjectId)}
            options={Object.values(SUBJECTS).map((s) => ({ value: s.id, label: s.label }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle
              label="Horizontal flip"
              value={flipH ? 'on' : 'off'}
              onChange={(v) => setFlipH(v === 'on')}
              options={[
                { value: 'off', label: 'Off' },
                { value: 'on', label: 'On' },
              ]}
            />
            <Toggle
              label="Vertical flip"
              value={flipV ? 'on' : 'off'}
              onChange={(v) => setFlipV(v === 'on')}
              options={[
                { value: 'off', label: 'Off' },
                { value: 'on', label: 'On' },
              ]}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label="Rotation" value={rotate} min={-180} max={180} step={5} onChange={setRotate} format={(v) => `${v}°`} />
            <Slider label="Crop / zoom" value={zoom} min={1} max={2.5} step={0.05} onChange={setZoom} format={(v) => `${v.toFixed(2)}×`} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label="Brightness" value={brightness} min={-0.5} max={0.5} step={0.02} onChange={setBrightness} format={(v) => v.toFixed(2)} />
            <Slider label="Contrast" value={contrast} min={0.2} max={2} step={0.05} onChange={setContrast} format={(v) => `${v.toFixed(2)}×`} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label="Noise" value={noise} min={0} max={0.5} step={0.01} onChange={setNoise} format={(v) => v.toFixed(2)} />
            <Slider label="Cutout" value={cutout} min={0} max={0.6} step={0.02} onChange={setCutout} format={(v) => `${(v * 100).toFixed(0)}% of the frame`} />
          </div>
          <Slider
            label="Seed (noise and cutout placement)"
            value={seed}
            min={1}
            max={9}
            step={1}
            onChange={setSeed}
            hint="Same seed, same augmented sample — which is what makes a run reproducible."
          />
          <p className="text-[11.5px] leading-relaxed text-subtle">{subj.note}</p>
        </>
      }
    >
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-surface p-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Original · label {subj.classLabel}
          </p>
          <div className="h-40 w-full">
            <canvas ref={originalCanvas} className="block" role="img" aria-label={`Original training image, labelled ${subj.classLabel}`} />
          </div>
        </div>
        <div className="bg-surface p-3">
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Augmented</p>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium',
                status === 'destroys' ? 'bg-danger/10 text-danger' : status === 'risky' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success',
              )}
            >
              {status === 'destroys' ? `label is no longer "${subj.classLabel}"` : status === 'risky' ? 'label survives, distribution does not' : `still "${subj.classLabel}"`}
            </span>
          </div>
          <div className="h-40 w-full">
            <canvas
              ref={augmentedCanvas}
              className="block"
              role="img"
              aria-label={`Augmented image; label status: ${status === 'destroys' ? 'broken' : status === 'risky' ? 'questionable' : 'preserved'}`}
            />
          </div>
        </div>
      </div>

      {broken.length > 0 && (
        <div className="border-t border-line bg-danger/[0.07] px-4 py-3">
          <p className="mb-1 text-[12px] font-semibold text-danger">
            This sample would be mislabelled in your training set
          </p>
          <ul className="space-y-1">
            {broken.map((c) => (
              <li key={c.name} className="text-[11.5px] leading-relaxed text-muted">
                <span className="font-medium text-ink">{c.name}:</span> {c.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-line px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Every augmentation you have applied, checked against {subj.task}
        </p>
        {verdicts.length === 0 ? (
          <p className="text-[11.5px] leading-relaxed text-subtle">
            Nothing is applied yet. Turn on a flip or drag the rotation slider and the verdict for this task appears
            here.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {verdicts.map((c) => (
              <li key={c.name} className="flex gap-2 text-[11.5px] leading-relaxed">
                <span
                  className={cn(
                    'mt-[2px] h-4 shrink-0 rounded px-1.5 text-[9.5px] font-semibold uppercase leading-4 tracking-wide',
                    c.verdict === 'destroys'
                      ? 'bg-danger/15 text-danger'
                      : c.verdict === 'risky'
                        ? 'bg-warning/15 text-warning'
                        : 'bg-success/15 text-success',
                  )}
                >
                  {c.verdict === 'destroys' ? 'breaks' : c.verdict}
                </span>
                <span className="text-muted">
                  <span className="font-medium text-ink">{c.name}</span> — {c.reason}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
          Geometric transforms move pixels and can therefore change the class; photometric ones — brightness, contrast,
          noise — leave every shape where it was and are safe for every task here, up to the point where the subject
          stops being visible.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-4 py-2 text-[11px] text-subtle">
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-full align-middle" style={{ background: VIZ.good }} /> label
          preserved
        </span>
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-full align-middle" style={{ background: VIZ.warn }} />{' '}
          label survives but the sample is unrealistic
        </span>
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-full align-middle" style={{ background: 'hsl(var(--c-danger))' }} />{' '}
          label destroyed
        </span>
      </div>
    </WidgetShell>
  );
}
