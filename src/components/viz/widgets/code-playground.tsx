'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/lib/store/ui';
import { Readout, WidgetShell } from './shared';

/**
 * A Python playground that runs entirely in the learner's browser.
 *
 * The security property is the whole design: learner code never reaches a
 * server. CPython is compiled to WebAssembly (Pyodide) and loaded from a CDN
 * on demand, and it runs inside a Web Worker — a separate thread with no DOM,
 * no cookies and no access to this page. A runaway loop therefore cannot
 * freeze the lesson, and a ten-second watchdog terminates the worker outright
 * rather than asking it politely to stop.
 *
 * Nothing is fetched until the learner presses Run, so a lesson that merely
 * mentions Python does not pay ten megabytes for the privilege.
 */

const PYODIDE_VERSION = '0.26.4';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

/** How long a single run may take before the worker is killed. */
const RUN_TIMEOUT_MS = 10_000;
/** How long the download + boot may take before we admit it is not coming. */
const BOOT_TIMEOUT_MS = 60_000;

const OFFLINE_MESSAGE =
  'Your browser reports that it is offline, so the Python runtime cannot be downloaded. The code below is still real Python — read it, copy it, and run it locally.';

const CDN_MESSAGE =
  'The Python runtime could not be downloaded, so code cannot run here. A firewall, an extension or a dropped connection will do this. The code below is still real Python — read it, copy it, and run it locally.';

const NO_WORKER_MESSAGE =
  'This browser does not support Web Workers, and running Python on the main thread could freeze the page. The code below is still real Python — read it, copy it, and run it locally.';

const DEFAULT_CODE = `# This runs in your browser. Nothing is sent to a server.
scores = {"Ada": 91, "Bo": 64, "Cleo": 78, "Dev": 88}

average = sum(scores.values()) / len(scores)
print("average:", round(average, 1))

for name, score in scores.items():
    verdict = "pass" if score >= 70 else "retake"
    print(f"{name:<5} {score:>3}  {verdict}")

# Predict the next line before you run it.
sorted(scores, key=scores.get, reverse=True)
`;

/**
 * The worker, as source text. Building it from a Blob at runtime keeps this
 * widget to a single file — no separate worker entry point, no bundler config.
 * Classic workers may `importScripts` across origins, which is how Pyodide
 * gets in.
 */
const WORKER_SOURCE = `
'use strict';
var BASE = '${PYODIDE_BASE}';
var ready = null;

function post(msg) { self.postMessage(msg); }

async function boot() {
  importScripts(BASE + 'pyodide.js');
  var py = await self.loadPyodide({ indexURL: BASE });
  py.setStdout({ batched: function (s) { post({ type: 'out', stream: 'out', text: s }); } });
  py.setStderr({ batched: function (s) { post({ type: 'out', stream: 'err', text: s }); } });
  return py;
}

self.onmessage = async function (event) {
  var data = event.data || {};
  if (data.type !== 'run') return;

  if (!ready) {
    post({ type: 'booting' });
    ready = boot();
  }

  var py;
  try {
    py = await ready;
  } catch (err) {
    ready = null;
    post({ type: 'bootfail', message: String((err && err.message) || err) });
    return;
  }

  post({ type: 'started' });

  // A fresh namespace per run, so each Run behaves like running a script
  // rather than like a REPL that quietly remembers last time's variables.
  var ns = py.toPy({});
  try {
    var result = await py.runPythonAsync(data.code, { globals: ns });
    var value = '';
    if (result !== undefined && result !== null) {
      try {
        var repr = py.runPython('repr');
        value = repr(result);
        repr.destroy();
      } catch (e) {
        value = String(result);
      }
      if (result && typeof result.destroy === 'function') {
        try { result.destroy(); } catch (e) {}
      }
    }
    post({ type: 'done', value: value });
  } catch (err) {
    // PythonError.message is the real traceback. Learners need to read it.
    post({ type: 'error', message: (err && err.message) ? String(err.message) : String(err) });
  } finally {
    try { ns.destroy(); } catch (e) {}
  }
};
`;

type Stream = 'out' | 'err' | 'value' | 'sys';
interface OutLine {
  stream: Stream;
  text: string;
}

type Status = 'idle' | 'booting' | 'running' | 'unavailable';

export default function CodePlayground({ props }: { props?: Record<string, unknown> }) {
  const seed = typeof props?.code === 'string' && props.code.trim() ? (props.code as string) : DEFAULT_CODE;

  const [code, setCode] = React.useState(seed);
  const [lines, setLines] = React.useState<OutLine[]>([]);
  const [status, setStatus] = React.useState<Status>('idle');
  const [fatal, setFatal] = React.useState<string | null>(null);
  const [booted, setBooted] = React.useState(false);
  const [elapsed, setElapsed] = React.useState<number | null>(null);
  const [copied, setCopied] = React.useState(false);

  const reduced = usePrefersReducedMotion();

  const workerRef = React.useRef<Worker | null>(null);
  const urlRef = React.useRef<string | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAt = React.useRef(0);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const gutterRef = React.useRef<HTMLDivElement>(null);

  const busy = status === 'booting' || status === 'running';

  // A new `props.code` (a different lesson, same mounted widget) reseeds.
  React.useEffect(() => {
    setCode(seed);
    setLines([]);
  }, [seed]);

  const disarm = React.useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const kill = React.useCallback(() => {
    disarm();
    workerRef.current?.terminate();
    workerRef.current = null;
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setBooted(false);
  }, [disarm]);

  React.useEffect(() => kill, [kill]);

  const append = React.useCallback((line: OutLine) => {
    setLines((prev) => (prev.length > 400 ? [...prev.slice(-400), line] : [...prev, line]));
  }, []);

  /**
   * One watchdog at a time. Both paths through `run` arm it, so a worker that
   * dies quietly — a blocked CDN, a crashed tab — still resolves into a real
   * message rather than a spinner that never stops.
   */
  const armBootWatchdog = React.useCallback(() => {
    disarm();
    timerRef.current = setTimeout(() => {
      kill();
      setFatal(CDN_MESSAGE);
      setStatus('unavailable');
    }, BOOT_TIMEOUT_MS);
  }, [disarm, kill]);

  const armRunWatchdog = React.useCallback(() => {
    disarm();
    timerRef.current = setTimeout(() => {
      kill();
      append({
        stream: 'err',
        text: 'Your code ran for too long — check for an infinite loop. The runtime was stopped and will reload on your next run.',
      });
      setStatus('idle');
      setElapsed(RUN_TIMEOUT_MS);
    }, RUN_TIMEOUT_MS);
  }, [append, disarm, kill]);

  const spawn = React.useCallback((): Worker => {
    const blob = new Blob([WORKER_SOURCE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    urlRef.current = url;
    const worker = new Worker(url);

    worker.onmessage = (event: MessageEvent) => {
      const m = event.data as { type: string; text?: string; stream?: Stream; value?: string; message?: string };

      if (m.type === 'booting') {
        setStatus('booting');
        armBootWatchdog();
        return;
      }

      if (m.type === 'started') {
        setBooted(true);
        setStatus('running');
        startedAt.current = performance.now();
        armRunWatchdog();
        return;
      }

      if (m.type === 'out') {
        append({ stream: m.stream === 'err' ? 'err' : 'out', text: m.text ?? '' });
        return;
      }

      if (m.type === 'done') {
        disarm();
        setElapsed(performance.now() - startedAt.current);
        setStatus('idle');
        if (m.value) append({ stream: 'value', text: m.value });
        return;
      }

      if (m.type === 'error') {
        disarm();
        setElapsed(performance.now() - startedAt.current);
        setStatus('idle');
        append({ stream: 'err', text: m.message ?? 'Unknown error' });
        return;
      }

      if (m.type === 'bootfail') {
        kill();
        setFatal(CDN_MESSAGE);
        setStatus('unavailable');
      }
    };

    // A worker that cannot even load its own script lands here.
    worker.onerror = () => {
      kill();
      setFatal(CDN_MESSAGE);
      setStatus('unavailable');
    };

    return worker;
  }, [append, armBootWatchdog, armRunWatchdog, disarm, kill]);

  const run = React.useCallback(() => {
    if (busy) return;
    setLines([]);
    setFatal(null);
    setElapsed(null);

    if (typeof Worker === 'undefined') {
      setFatal(NO_WORKER_MESSAGE);
      setStatus('unavailable');
      return;
    }

    if (!workerRef.current && typeof navigator !== 'undefined' && navigator.onLine === false) {
      setFatal(OFFLINE_MESSAGE);
      setStatus('unavailable');
      return;
    }

    if (!workerRef.current) {
      try {
        workerRef.current = spawn();
      } catch {
        setFatal(CDN_MESSAGE);
        setStatus('unavailable');
        return;
      }
      setStatus('booting');
      armBootWatchdog();
    } else {
      setStatus('running');
      startedAt.current = performance.now();
      armRunWatchdog();
    }

    workerRef.current.postMessage({ type: 'run', code });
  }, [armBootWatchdog, armRunWatchdog, busy, code, spawn]);

  const stop = React.useCallback(() => {
    if (!busy) return;
    kill();
    setStatus('idle');
    append({ stream: 'sys', text: 'Stopped. The runtime will reload on your next run.' });
  }, [append, busy, kill]);

  const reset = React.useCallback(() => {
    setCode(seed);
    setLines([]);
    setFatal(null);
    setElapsed(null);
  }, [seed]);

  const copy = React.useCallback(() => {
    void navigator.clipboard?.writeText(code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => undefined,
    );
  }, [code]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      run();
      return;
    }
    if (e.key === 'Tab') {
      // Tab indents rather than leaving the editor. Shift+Tab still escapes,
      // so the widget never becomes a keyboard trap.
      if (e.shiftKey) return;
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: end } = el;
      const next = `${code.slice(0, s)}    ${code.slice(end)}`;
      setCode(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 4;
      });
    }
  };

  const lineCount = React.useMemo(() => code.split('\n').length, [code]);

  const statusLabel =
    status === 'booting'
      ? 'starting Python'
      : status === 'running'
        ? 'running'
        : status === 'unavailable'
          ? 'unavailable'
          : booted
            ? 'ready'
            : 'not started';

  return (
    <WidgetShell
      takeaway="Predict the output before you press Run. The gap between what you expected and what Python printed is the only part of this that teaches you anything — including the tracebacks, which are instructions, not insults."
      readout={
        <Readout
          items={[
            { label: 'Status', value: statusLabel, tone: status === 'unavailable' ? 'warn' : busy ? 'warn' : 'default' },
            { label: 'Runtime', value: `Python via Pyodide ${PYODIDE_VERSION}` },
            { label: 'Last run', value: elapsed === null ? '—' : `${(elapsed / 1000).toFixed(2)} s` },
          ]}
        />
      }
      controls={
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={run}
            disabled={busy}
            className="rounded-md bg-primary px-3 py-1 text-[12px] font-semibold text-on-primary transition-opacity disabled:opacity-50"
          >
            {status === 'booting' ? 'Starting…' : status === 'running' ? 'Running…' : 'Run'}
          </button>
          <button
            type="button"
            onClick={stop}
            disabled={!busy}
            className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink disabled:opacity-40"
          >
            Stop
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <span className="ml-auto text-[11px] text-subtle">Ctrl/Cmd + Enter runs</span>
        </div>
      }
    >
      <div className="p-3 sm:p-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Python</p>
          <p className="text-[11px] text-subtle">Runs in your browser — no code leaves this page</p>
        </div>

        {/* Editor: gutter and textarea share font, size and line-height, and
            the textarea does not soft-wrap, so the numbers stay aligned. */}
        <div className="flex overflow-hidden rounded-md border border-line bg-surface-2 focus-within:border-line-strong">
          <div
            ref={gutterRef}
            aria-hidden="true"
            className="w-8 shrink-0 select-none overflow-hidden border-r border-line bg-surface-3/40 py-3 text-right font-mono text-[12.5px] leading-[20px] text-subtle"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="pr-1.5 tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            onScroll={(e) => {
              if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
            }}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            wrap="off"
            aria-label="Python code editor"
            className="h-56 min-w-0 flex-1 resize-y bg-transparent px-2.5 py-3 font-mono text-[12.5px] leading-[20px] text-ink outline-none"
          />
        </div>

        {!booted && status === 'idle' && !fatal && (
          <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
            The first Run downloads the Python runtime — a few megabytes, once per session. After that, runs start
            instantly.
          </p>
        )}

        {status === 'booting' && (
          <p className="mt-2 flex items-center gap-2 text-[11.5px] text-muted" role="status">
            <span
              className={cn('inline-block h-1.5 w-1.5 rounded-full bg-accent', !reduced && 'animate-pulse')}
              aria-hidden="true"
            />
            Downloading and starting Python. This happens once per session.
          </p>
        )}

        {fatal && (
          <p className="mt-2 rounded-md border border-warning/40 bg-warning/[0.08] px-3 py-2 text-[11.5px] leading-relaxed text-muted">
            {fatal}
          </p>
        )}

        <div className="mt-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Output</p>
          <div
            aria-live="polite"
            aria-label="Program output"
            className="max-h-56 min-h-16 overflow-auto rounded-md border border-line bg-surface-2 px-2.5 py-2 font-mono text-[12px] leading-[1.55]"
          >
            {lines.length === 0 ? (
              <p className="text-subtle">
                {status === 'running'
                  ? 'Running…'
                  : status === 'booting'
                    ? 'Waiting for the runtime…'
                    : 'Nothing yet. Press Run.'}
              </p>
            ) : (
              lines.map((line, i) => (
                <pre
                  key={i}
                  className={cn(
                    'whitespace-pre-wrap break-words',
                    line.stream === 'err' && 'text-danger',
                    line.stream === 'value' && 'text-accent',
                    line.stream === 'sys' && 'text-subtle',
                    line.stream === 'out' && 'text-ink',
                  )}
                >
                  {line.text}
                </pre>
              ))
            )}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
