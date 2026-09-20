'use client';

import * as React from 'react';
import { Readout, Toggle, WidgetShell } from './shared';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { cn } from '@/lib/cn';

/**
 * Why requirements.txt is copied before the source.
 *
 * Every Dockerfile instruction produces a layer, and a layer is reused only if
 * its own inputs are unchanged *and* every layer beneath it was reused. That
 * single rule — the cascade — is the whole of build caching, and it means the
 * order of two adjacent COPY lines decides whether a one-character code change
 * costs two seconds or a minute and a half.
 *
 * The widget lets the learner move those lines and watch the cost change. Two
 * details are worth pointing at while they do: the finished image is exactly
 * the same size either way, so this is not an optimisation of the artifact but
 * of the loop around it; and the bytes pushed to the registry change with it,
 * which is what turns a slow build into a slow deploy.
 */

type Kind = 'base' | 'workdir' | 'copy-req' | 'install' | 'copy-src' | 'cmd';
type Scenario = 'code' | 'deps' | 'none';

interface Line {
  id: Kind;
  text: string;
  /** Bytes the layer adds to the image. */
  size: number;
  /** Seconds to execute when it has to be rebuilt. */
  seconds: number;
  movable: boolean;
  note: string;
}

const MB = 1024 * 1024;

const INITIAL: Line[] = [
  { id: 'base', text: 'FROM python:3.11-slim', size: 142 * MB, seconds: 0, movable: false, note: 'The base image. Pulled once and shared by every image built on it.' },
  { id: 'workdir', text: 'WORKDIR /app', size: 0, seconds: 0.1, movable: false, note: 'Metadata only — it creates a directory entry and nothing else.' },
  { id: 'copy-req', text: 'COPY requirements.txt .', size: 4 * 1024, seconds: 0.2, movable: true, note: 'Four kilobytes of text. Its only job is to give the install step something to hash that changes rarely.' },
  { id: 'install', text: 'RUN pip install -r requirements.txt', size: 486 * MB, seconds: 74, movable: true, note: 'The expensive layer: resolve, download and compile every dependency. This is the layer worth protecting.' },
  { id: 'copy-src', text: 'COPY . .', size: 12 * MB, seconds: 0.4, movable: true, note: 'The application source — the thing that changes twenty times a day.' },
  { id: 'cmd', text: 'CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]', size: 0, seconds: 0, movable: false, note: 'Metadata only. It records the default command; nothing runs at build time.' },
];

const MOVABLE_FROM = 2;
const MOVABLE_TO = 4;

const NAIVE_ORDER: Kind[] = ['base', 'workdir', 'copy-src', 'copy-req', 'install', 'cmd'];
const GOOD_ORDER: Kind[] = ['base', 'workdir', 'copy-req', 'install', 'copy-src', 'cmd'];

interface LayerResult {
  line: Line;
  hit: boolean;
  reason: string;
}

interface BuildResult {
  layers: LayerResult[];
  seconds: number;
  pushed: number;
  imageSize: number;
  /** Set when the Dockerfile cannot build at all in this order. */
  error: string | null;
}

const OVERHEAD = 1.4; // context transfer and image assembly, whatever the cache does

function build(order: Line[], scenario: Scenario): BuildResult {
  const layers: LayerResult[] = [];
  let broken = false;
  let error: string | null = null;
  let requirementsPresent = false;

  for (const line of order) {
    if (line.id === 'copy-req' || line.id === 'copy-src') requirementsPresent = true;
    if (line.id === 'install' && !requirementsPresent && error === null) {
      error =
        'ERROR: Could not open requirements file: [Errno 2] No such file or directory — the install runs before anything has been copied into the image.';
    }

    // Does this layer's own input change in this scenario?
    let selfMiss = false;
    let reason = 'unchanged, and every layer below it was reused';
    if (scenario === 'code' && line.id === 'copy-src') {
      selfMiss = true;
      reason = 'the source changed, so the checksum of the copied files changed';
    } else if (scenario === 'deps' && line.id === 'copy-req') {
      selfMiss = true;
      reason = 'requirements.txt changed';
    } else if (scenario === 'deps' && line.id === 'copy-src') {
      selfMiss = true;
      reason = 'requirements.txt lives inside the build context this line copies, so this layer changed too';
    }

    const hit = !broken && !selfMiss;
    if (!hit && !selfMiss) reason = 'a layer below it was rebuilt, so the cache chain is broken from here down';
    if (!hit) broken = true;
    layers.push({ line, hit, reason });
  }

  const seconds = layers.reduce((s, l) => s + (l.hit ? 0 : l.line.seconds), 0) + OVERHEAD;
  const pushed = layers.reduce((s, l) => s + (l.hit ? 0 : l.line.size), 0);
  const imageSize = layers.reduce((s, l) => s + l.line.size, 0);
  return { layers, seconds, pushed, imageSize, error };
}

function orderFrom(ids: Kind[]): Line[] {
  return ids.map((id) => INITIAL.find((l) => l.id === id) as Line);
}

function fmtSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < MB) return `${(bytes / 1024).toFixed(0)} kB`;
  return `${(bytes / MB).toFixed(0)} MB`;
}

function fmtSeconds(s: number): string {
  return s >= 60 ? `${Math.floor(s / 60)}m ${Math.round(s % 60)}s` : `${s.toFixed(1)}s`;
}

export default function DockerLayers() {
  const reduced = usePrefersReducedMotion();
  const [order, setOrder] = React.useState<Line[]>(INITIAL);
  const [scenario, setScenario] = React.useState<Scenario>('code');

  const result = React.useMemo(() => build(order, scenario), [order, scenario]);
  const goodResult = React.useMemo(() => build(orderFrom(GOOD_ORDER), scenario), [scenario]);
  const naiveResult = React.useMemo(() => build(orderFrom(NAIVE_ORDER), scenario), [scenario]);
  const worst = Math.max(goodResult.seconds, naiveResult.seconds, result.seconds);

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < MOVABLE_FROM || target > MOVABLE_TO) return;
    setOrder((prev) => {
      const next = prev.slice();
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
  };

  const isGoodOrder = order.map((l) => l.id).join() === GOOD_ORDER.join();
  const rebuildsPerWeek = 100; // twenty code pushes a day
  const weeklyMinutes = ((result.seconds - goodResult.seconds) * rebuildsPerWeek) / 60;

  return (
    <WidgetShell
      takeaway="A layer is reused only if nothing below it changed, so the cheap line that changes constantly must sit above the expensive line that almost never does. Copying the source before installing dependencies puts a 74-second install downstream of every one-character edit — and the finished image is byte-for-byte the same size either way."
      readout={
        <Readout
          items={[
            { label: 'Rebuild', value: fmtSeconds(result.seconds), tone: result.seconds > 20 ? 'bad' : 'good' },
            { label: 'Cache hits', value: `${result.layers.filter((l) => l.hit).length}/${result.layers.length}` },
            { label: 'Pushed to registry', value: fmtSize(result.pushed), tone: result.pushed > 100 * MB ? 'warn' : 'good' },
            { label: 'Image size', value: fmtSize(result.imageSize) },
          ]}
        />
      }
      controls={
        <>
          <Toggle
            label="What changed since the last build"
            value={scenario}
            onChange={(v) => setScenario(v as Scenario)}
            options={[
              { value: 'code', label: 'One line of app code' },
              { value: 'deps', label: 'A dependency' },
              { value: 'none', label: 'Nothing' },
            ]}
          />
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setOrder(orderFrom(GOOD_ORDER))}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-muted transition-colors hover:text-ink"
            >
              Requirements first
            </button>
            <button
              type="button"
              onClick={() => setOrder(orderFrom(NAIVE_ORDER))}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-muted transition-colors hover:text-ink"
            >
              Copy everything first
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-subtle">
            Or move the three middle lines yourself with the arrows. Only those three can move — a FROM must come
            first and a CMD does nothing until runtime.
          </p>
        </>
      }
    >
      <div className="p-3">
        {/* The Dockerfile, one row per layer */}
        <div className="overflow-hidden rounded-md border border-line">
          {order.map((line, i) => {
            const layer = result.layers[i];
            const movable = line.movable;
            return (
              <div
                key={line.id}
                className={cn(
                  'flex items-start gap-2 border-b border-line px-2 py-1.5 last:border-b-0',
                  layer.hit ? 'bg-surface' : 'bg-danger/[0.05]',
                )}
              >
                <span className="w-4 shrink-0 pt-0.5 text-right font-mono text-[10px] text-subtle">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <code className="block break-words font-mono text-[11px] leading-relaxed text-ink">{line.text}</code>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span
                      className={cn(
                        'rounded px-1 text-[9.5px] font-medium',
                        layer.hit ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
                      )}
                    >
                      {layer.hit ? 'CACHED' : 'REBUILT'}
                    </span>
                    <span className="font-mono text-[10px] text-subtle">{fmtSize(line.size)}</span>
                    <span className="font-mono text-[10px] text-subtle">
                      {layer.hit ? '0.0s' : fmtSeconds(line.seconds)}
                    </span>
                    <span className="text-[10px] text-subtle">{layer.reason}</span>
                  </div>
                </div>
                {movable && (
                  <div className="flex shrink-0 flex-col gap-0.5">
                    <button
                      type="button"
                      aria-label={`Move ${line.text} up`}
                      disabled={i <= MOVABLE_FROM}
                      onClick={() => move(i, -1)}
                      className="rounded border border-line bg-surface-2 px-1.5 text-[10px] leading-4 text-muted transition-colors hover:text-ink disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label={`Move ${line.text} down`}
                      disabled={i >= MOVABLE_TO}
                      onClick={() => move(i, 1)}
                      className="rounded border border-line bg-surface-2 px-1.5 text-[10px] leading-4 text-muted transition-colors hover:text-ink disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {result.error && (
          <p className="mt-2 rounded-md border border-danger/40 bg-danger/[0.07] px-2 py-1.5 font-mono text-[10.5px] leading-relaxed text-danger">
            {result.error}
          </p>
        )}

        {/* The comparison that carries the lesson */}
        <div className="mt-3 space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
            Rebuild after {scenario === 'code' ? 'a one-line code change' : scenario === 'deps' ? 'a dependency change' : 'no change at all'}
          </p>
          {[
            { label: 'Requirements first', value: goodResult.seconds, good: true },
            { label: 'Copy everything first', value: naiveResult.seconds, good: false },
            { label: 'Your order', value: result.seconds, good: isGoodOrder },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="w-28 shrink-0 text-[11px] text-muted">{row.label}</span>
              <div className="h-3.5 min-w-0 flex-1 rounded-sm bg-surface-2">
                <div
                  className={cn(
                    'h-full rounded-sm',
                    row.value > 20 ? 'bg-danger' : 'bg-success',
                    !reduced && 'transition-[width] duration-300',
                  )}
                  style={{ width: `${Math.max(2, (row.value / worst) * 100)}%` }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-[10.5px] tabular-nums text-subtle">
                {fmtSeconds(row.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t border-line p-4 text-[11.5px] leading-relaxed text-muted">
        {scenario === 'code' && (
          <p>
            {isGoodOrder ? (
              <>
                Only <code className="font-mono text-[11px] text-accent">COPY . .</code> and the layers above it in the
                file changed, so pip is never re-run: {fmtSeconds(result.seconds)} and {fmtSize(result.pushed)} pushed.
                The dependency layer is untouched, which is exactly what the ordering bought.
              </>
            ) : (
              <>
                The source was copied before the install, so a one-character edit invalidates{' '}
                <code className="font-mono text-[11px] text-accent">COPY . .</code> and every layer after it — including
                the 74-second pip install that has nothing to do with the change. At {rebuildsPerWeek} rebuilds a week
                that is {Math.round(weeklyMinutes)} extra minutes of CI time, every week, for a file nobody edited.
              </>
            )}
          </p>
        )}
        {scenario === 'deps' && (
          <p>
            A genuine dependency change has to re-run pip — no ordering avoids that, and both orders cost roughly the
            same here. That is the honest half of the story: layer ordering does not make builds fast, it makes the
            common case skip the slow layer. Dependencies change weekly; source changes hourly.
          </p>
        )}
        {scenario === 'none' && (
          <p>
            Nothing changed, so every layer is reused and the build is metadata assembly plus context transfer. This is
            the ceiling: {fmtSeconds(result.seconds)} is as fast as any rebuild of this image can be, whatever the
            ordering.
          </p>
        )}
        <p className="text-subtle">
          The image is {fmtSize(result.imageSize)} in every arrangement — layer order changes what has to be rebuilt and
          re-pushed, never what the container finally contains.
        </p>
      </div>
    </WidgetShell>
  );
}
