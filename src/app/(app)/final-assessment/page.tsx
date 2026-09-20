import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Crown, GraduationCap, Lock } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { buildFinalAssessment } from '@/features/testing/generate';
import { unitsOfDomain, UNIT_BY_ID } from '@/data/curriculum';
import { DOMAINS, domainColor } from '@/data/domains';
import { TestRunner } from '@/components/testing/test-runner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { grade } from '@/features/testing/scoring';
import { pct, prettyDate } from '@/lib/format';

export const metadata: Metadata = { title: 'Final assessment' };
export const dynamic = 'force-dynamic';

const UNLOCK_SHARE = 0.8;

export default async function FinalAssessmentPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string }>;
}) {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const params = await searchParams;
  const o = buildOverview(state);
  const required = Math.round(o.totals.total * UNLOCK_SHARE);
  const unlocked = o.totals.completed >= required;

  const attempts = state.assessments.filter((a) => a.kind === 'final-assessment');
  const best = attempts.reduce((m, a) => Math.max(m, a.score), 0);

  /* ---- Running the assessment ---- */
  if (params.start === '1' && unlocked) {
    const groups = DOMAINS.map((d) => ({
      domain: d.id,
      domainName: d.name,
      units: unitsOfDomain(d.id).filter((u) => state.units[u.id]?.lessonCompletedAt),
    })).filter((g) => g.units.length > 0);

    const test = buildFinalAssessment(groups, 5);

    return (
      <TestRunner
        test={{
          kind: 'final-assessment',
          title: test.title,
          description: test.description,
          suggestedMinutes: test.suggestedMinutes,
          questions: test.questions.map((q) => {
            const unit = UNIT_BY_ID.get(q.unitId)!;
            return { question: q.question, unitId: q.unitId, unitTitle: unit.title, unitSlug: unit.slug };
          }),
        }}
        mode="end"
        backHref="/final-assessment"
      />
    );
  }

  /* ---- Domain-by-domain report from past attempts ---- */
  const perDomain = DOMAINS.map((d) => {
    const units = unitsOfDomain(d.id);
    let correct = 0;
    let total = 0;
    for (const a of attempts) {
      for (const ans of a.answers) {
        if (!units.some((u) => u.id === ans.unitId)) continue;
        total += 1;
        if (ans.correct) correct += 1;
      }
    }
    return { domain: d, correct, total, score: total ? correct / total : 0 };
  }).filter((d) => d.total > 0);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header className="rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-6 text-center">
        <Crown size={26} className="mx-auto text-primary" />
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">AI/ML Master Assessment</h1>
        <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-muted">
          Every domain, mixed formats, no hints and no explanations until the end. The result is broken down domain
          by domain rather than reduced to a single number — one score tells you almost nothing about where to go
          next.
        </p>

        {unlocked ? (
          <div className="mt-6">
            <Link href="/final-assessment?start=1">
              <Button size="lg">{attempts.length > 0 ? 'Take it again' : 'Begin the assessment'}</Button>
            </Link>
            <p className="mt-2 text-[12px] text-subtle">
              Drawn from the {o.totals.completed} units you have completed. Around 60–70 questions.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <div className="mx-auto max-w-sm">
              <ProgressBar value={o.totals.completed / required} label="Progress toward unlocking" size="lg" />
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[12.5px] text-subtle">
                <Lock size={12} /> {o.totals.completed} of {required} units — {required - o.totals.completed} to go
              </p>
            </div>
            <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-subtle">
              It unlocks at {Math.round(UNLOCK_SHARE * 100)}% of the curriculum. Sitting it earlier would test
              material you have not been taught, which measures nothing useful.
            </p>
          </div>
        )}
      </header>

      {attempts.length > 0 && (
        <section className="rounded-xl border border-line bg-surface p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[14px] font-semibold text-ink">Domain-by-domain mastery report</h2>
            <Badge tone={grade(best).tone}>Best {pct(best)}</Badge>
          </div>
          <p className="mt-1.5 text-[12.5px] text-subtle">
            Across {attempts.length} attempt{attempts.length === 1 ? '' : 's'}, most recently{' '}
            {prettyDate(attempts[0]!.date)}.
          </p>

          <ul className="mt-4 space-y-2.5">
            {perDomain.map((d) => (
              <li key={d.domain.id} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: domainColor(d.domain.id) }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{d.domain.name}</span>
                <ProgressBar value={d.score} className="w-28 shrink-0" size="sm" label={`${d.domain.name} score`} />
                <span className="w-16 shrink-0 text-right text-[12px] tabular-nums text-muted">
                  {pct(d.score)} · {d.correct}/{d.total}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
            <div className="rounded-lg border border-success/25 bg-success/[0.05] p-3.5">
              <p className="text-[12px] font-semibold text-success">Strongest</p>
              <p className="mt-1 text-[13px] text-muted">
                {perDomain.length > 0
                  ? [...perDomain].sort((a, b) => b.score - a.score)[0]!.domain.name
                  : '—'}
              </p>
            </div>
            <div className="rounded-lg border border-warning/25 bg-warning/[0.05] p-3.5">
              <p className="text-[12px] font-semibold text-warning">Needs the most work</p>
              <p className="mt-1 text-[13px] text-muted">
                {perDomain.length > 0
                  ? [...perDomain].sort((a, b) => a.score - b.score)[0]!.domain.name
                  : '—'}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="text-[14px] font-semibold text-ink">What it covers</h2>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-subtle">
          Five questions per domain you have studied, spread across units rather than clustered.
        </p>
        <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
          {DOMAINS.map((d) => {
            const stat = o.domains.find((x) => x.domain.id === d.id)!;
            return (
              <li key={d.id} className="flex items-center gap-2.5 text-[12.5px]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: domainColor(d.id) }} aria-hidden />
                <span className="flex-1 text-muted">{d.name}</span>
                <span className="tabular-nums text-subtle">
                  {stat.completed}/{stat.total}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-xl border border-primary/25 bg-primary/[0.05] p-5">
        <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          <GraduationCap size={15} className="text-primary" /> And then the real one
        </h2>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted">
          After the assessment comes the teacher challenge: random concepts, one after another, explained in your own
          words with nothing open. That is the test this whole platform is actually pointed at.
        </p>
        <Link href="/teach?challenge=1" className="mt-3 inline-block">
          <Button size="sm" variant="subtle">
            Open the teacher challenge
          </Button>
        </Link>
      </section>
    </div>
  );
}
