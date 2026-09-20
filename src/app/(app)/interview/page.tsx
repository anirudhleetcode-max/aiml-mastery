import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MessagesSquare } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { DOMAINS } from '@/data/domains';
import { Stat, SectionHeading } from '@/components/ui/misc';
import { computeReadiness, readinessVerdict, selectQuestions } from '@/features/interview/engine';
import { InterviewView, type InterviewRow } from '@/components/interview/interview-view';

export const metadata: Metadata = { title: 'Interview preparation' };
export const dynamic = 'force-dynamic';

/**
 * Interview preparation over the curriculum's own question bank.
 *
 * The full bank is several hundred kilobytes of prose, so this page sends the
 * client only the fields the practice UI renders and keeps the rest — like
 * every other curriculum surface here — on the server.
 */
export default async function InterviewPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const readiness = computeReadiness(state);
  const verdict = readinessVerdict(readiness);

  const rows: InterviewRow[] = selectQuestions(state).map((item) => ({
    unitId: item.unitId,
    questionIndex: item.questionIndex,
    level: item.question.level,
    question: item.question.question,
    answer: item.question.answer,
    followUp: item.question.followUp ?? null,
    unitTitle: item.unitTitle,
    unitSlug: item.unitSlug,
    domain: item.domain,
    domainName: item.domainName,
    taught: item.taught,
  }));

  const presentDomains = new Set(rows.map((r) => r.domain));

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Interview preparation</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Every interview question in the curriculum, in one place. Answer out loud first, then reveal the model answer
          and grade yourself honestly — that verdict is what readiness below is computed from, so flattering yourself
          here only produces a flattering number.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat
          label="Readiness"
          value={`${Math.round(readiness.taughtScore * 100)}%`}
          sub="On material you have finished"
          icon={<MessagesSquare size={14} />}
          tone={readiness.taughtScore >= 0.8 ? 'success' : readiness.taughtScore >= 0.5 ? 'warning' : 'default'}
        />
        <Stat label="Graded" value={`${readiness.attempted} / ${readiness.total}`} sub="Questions you have answered" />
        <Stat label="Solid" value={readiness.confident} tone="success" sub="Felt answerable" />
        <Stat
          label="To revisit"
          value={readiness.shaky + readiness.lost}
          tone={readiness.shaky + readiness.lost > 0 ? 'warning' : 'success'}
          sub="Shaky or unanswered"
        />
      </div>

      <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
        <SectionHeading as="h2" eyebrow="Where you stand" title={verdict.label} description={verdict.detail} />
      </section>

      <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
        <SectionHeading
          as="h2"
          title="Practise"
          description="Build a session from what you are weakest at, or filter the bank yourself. Nothing is drawn from a unit you have not finished unless you ask for it."
          className="mb-4"
        />
        <InterviewView
          rows={rows}
          attempts={state.interviewAttempts}
          domains={DOMAINS.filter((d) => presentDomains.has(d.id)).map((d) => ({ id: d.id, name: d.name }))}
          byDomain={readiness.byDomain}
          byLevel={readiness.byLevel}
          weakUnits={readiness.weakUnits}
        />
      </section>
    </div>
  );
}
