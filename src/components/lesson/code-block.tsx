'use client';

import * as React from 'react';
import { Check, Copy, Play } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * A code sample. The highlighted HTML is produced on the server (see
 * `src/lib/highlight.ts`) and passed in, so no highlighting library ships to
 * the browser; this component only adds copy and "open in playground".
 */
export function CodeBlock({
  html,
  raw,
  language,
  title,
  output,
  runnable,
  onRun,
  className,
}: {
  html: string;
  raw: string;
  language: string;
  title?: string;
  output?: string;
  runnable?: boolean;
  onRun?: (code: string) => void;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked; the code is selectable either way */
    }
  }

  return (
    <div className={cn('overflow-hidden rounded-xl border border-line bg-surface-2', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-1.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[10.5px] uppercase text-subtle">
            {language}
          </span>
          {title && <span className="truncate text-[12.5px] font-medium text-muted">{title}</span>}
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          {runnable && onRun && (
            <button
              type="button"
              onClick={() => onRun(raw)}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] text-subtle transition-colors hover:bg-surface-3 hover:text-ink"
            >
              <Play size={11} /> Run
            </button>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? 'Copied' : 'Copy code'}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] text-subtle transition-colors hover:bg-surface-3 hover:text-ink"
          >
            {copied ? <Check size={11} className="text-success" /> : <Copy size={11} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <pre className="overflow-x-auto p-4 text-[12.5px] leading-[1.7]">
        <code
          className="font-mono"
          // Server-highlighted, HTML-escaped curriculum source.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>

      {output && (
        <div className="border-t border-line bg-surface/60 px-4 py-3">
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-subtle">Output</p>
          <pre className="overflow-x-auto font-mono text-[12.5px] leading-[1.7] text-muted">{output}</pre>
        </div>
      )}
    </div>
  );
}
