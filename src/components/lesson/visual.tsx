import { ArrowRight, CornerDownRight } from 'lucide-react';
import type { Visual } from '@/types/curriculum';
import { WidgetMount } from '@/components/viz/widget-mount';
import { cn } from '@/lib/cn';

/**
 * Renders the declarative `Visual` union. Curriculum authors describe *what*
 * to show; this decides how, so every diagram in 214 units looks like it
 * belongs to the same product.
 */
export function VisualBlock({ visual }: { visual: Visual }) {
  return (
    <figure className="rounded-xl border border-line bg-surface-2 p-4 sm:p-5">
      <figcaption className="mb-4">
        <h4 className="text-[13.5px] font-semibold text-ink">{visual.title}</h4>
        {visual.caption && <p className="mt-1 text-[12.5px] leading-relaxed text-subtle">{visual.caption}</p>}
      </figcaption>
      <Body visual={visual} />
    </figure>
  );
}

function Body({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case 'flow':
      return (
        <ol className={cn('flex gap-2', visual.branching ? 'flex-col' : 'flex-col')}>
          {visual.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line bg-surface text-[11px] font-semibold tabular-nums text-primary-ink">
                  {i + 1}
                </span>
                {i < visual.steps.length - 1 && <span className="mt-1 w-px flex-1 bg-line" aria-hidden />}
              </div>
              <div className={cn('min-w-0 pb-3', i === visual.steps.length - 1 && 'pb-0')}>
                <p className="text-[13.5px] font-medium text-ink">{step.label}</p>
                {step.detail && <p className="mt-0.5 text-[12.5px] leading-relaxed text-subtle">{step.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      );

    case 'compare':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {[visual.left, visual.right].map((side, i) => (
            <div key={i} className="rounded-lg border border-line bg-surface p-4">
              <p className={cn('text-[12.5px] font-semibold', i === 0 ? 'text-primary-ink' : 'text-accent')}>
                {side.heading}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {side.points.map((p, j) => (
                  <li key={j} className="flex gap-2 text-[12.5px] leading-relaxed text-muted">
                    <span
                      className={cn('mt-[7px] h-1 w-1 shrink-0 rounded-full', i === 0 ? 'bg-primary' : 'bg-accent')}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className="overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-line bg-surface-2/60">
                {visual.columns.map((c) => (
                  <th key={c} scope="col" className="px-3 py-2 text-left font-semibold text-ink">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {visual.rows.map((row, i) => (
                <tr key={i} className="align-top">
                  {row.map((cell, j) => (
                    <td key={j} className={cn('px-3 py-2 leading-relaxed', j === 0 ? 'font-medium text-ink' : 'text-muted')}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'annotated':
      return (
        <div>
          <div className="rounded-lg border border-line bg-surface px-4 py-3 text-center font-mono text-[14px] text-ink">
            {visual.subject}
          </div>
          <ul className="mt-3 space-y-2">
            {visual.annotations.map((a, i) => (
              <li key={i} className="flex gap-2.5 text-[12.5px] leading-relaxed">
                <CornerDownRight size={13} className="mt-1 shrink-0 text-primary-ink" />
                <span>
                  <code className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[12px] text-accent">{a.part}</code>
                  <span className="ml-2 text-muted">{a.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'timeline':
      return (
        <ol className="space-y-3">
          {visual.events.map((e, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-20 shrink-0 text-right text-[12px] font-medium tabular-nums text-primary-ink">{e.when}</span>
              <span className="relative flex flex-col items-center">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {i < visual.events.length - 1 && <span className="mt-1 w-px flex-1 bg-line" aria-hidden />}
              </span>
              <span className="min-w-0 pb-2 text-[12.5px] leading-relaxed text-muted">{e.what}</span>
            </li>
          ))}
        </ol>
      );

    case 'ascii':
      return (
        <pre className="overflow-x-auto rounded-lg border border-line bg-surface p-4 font-mono text-[12px] leading-[1.6] text-muted">
          {visual.art}
        </pre>
      );

    case 'widget':
      return <WidgetMount widget={visual.widget} props={visual.props} />;
  }
}

export function FlowStrip({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {steps.map((s, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[11.5px] text-muted">{s}</span>
          {i < steps.length - 1 && <ArrowRight size={11} className="text-subtle" />}
        </span>
      ))}
    </div>
  );
}
