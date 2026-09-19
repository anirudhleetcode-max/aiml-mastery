import katex from 'katex';
import type { Formula, MathematicalExplanation } from '@/types/curriculum';
import { cn } from '@/lib/cn';

/**
 * Maths is rendered on the server with KaTeX and shipped as HTML, so the
 * browser never downloads a formula renderer. Only the stylesheet crosses.
 *
 * `throwOnError: false` means a malformed expression degrades to visible red
 * source rather than taking the page down — and the curriculum verifier would
 * have flagged it long before a learner saw it.
 */
function render(latex: string, display: boolean): string {
  return katex.renderToString(latex, {
    displayMode: display,
    throwOnError: false,
    strict: false,
    output: 'html',
    trust: false,
  });
}

export function Math({ tex, display = false, className }: { tex: string; display?: boolean; className?: string }) {
  return (
    <span
      className={cn(display && 'block overflow-x-auto', className)}
      // KaTeX output is generated here from curriculum source, not from user input.
      dangerouslySetInnerHTML={{ __html: render(tex, display) }}
    />
  );
}

export function FormulaCard({ formula }: { formula: Formula }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-[13.5px] font-semibold text-ink">{formula.name}</h4>
        {formula.category && (
          <span className="rounded bg-surface-3 px-1.5 py-0.5 text-[10.5px] uppercase tracking-wide text-subtle">
            {formula.category.replace('-', ' ')}
          </span>
        )}
      </div>

      <div className="my-3 overflow-x-auto rounded-lg bg-surface px-4 py-3 text-center">
        <Math tex={formula.latex} display />
      </div>

      <p className="text-[13px] leading-relaxed text-muted">{formula.meaning}</p>

      {formula.variables.length > 0 && (
        <dl className="mt-3 space-y-1.5 border-t border-line pt-3">
          {formula.variables.map((v) => (
            <div key={v.symbol} className="flex gap-3 text-[12.5px]">
              <dt className="min-w-12 shrink-0 text-right">
                <Math tex={v.symbol} className="text-accent" />
              </dt>
              <dd className="text-subtle">{v.meaning}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export function MathSection({ math }: { math: MathematicalExplanation }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-accent/25 bg-accent/[0.05] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">The idea, in words</p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{math.intuition}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {math.formulas.map((f) => (
          <FormulaCard key={f.name + f.latex} formula={f} />
        ))}
      </div>

      {math.derivation && math.derivation.length > 0 && (
        <details className="group rounded-xl border border-line bg-surface-2 p-4">
          <summary className="cursor-pointer list-none text-[13px] font-semibold text-ink marker:content-none">
            <span className="inline-flex items-center gap-2">
              <span className="text-subtle transition-transform group-open:rotate-90">▸</span>
              Where this comes from, step by step
            </span>
          </summary>
          <ol className="mt-4 space-y-2.5">
            {math.derivation.map((step, i) => (
              <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-surface-3 text-[10.5px] font-semibold tabular-nums text-subtle">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}
