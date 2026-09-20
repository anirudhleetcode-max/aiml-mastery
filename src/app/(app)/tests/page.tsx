import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Calendar, Crown, RotateCcw, Target } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { grade } from '@/features/testing/scoring';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stat, EmptyState, SectionHeading } from '@/components/ui/misc';
import { ProgressBar } from '@/components/ui/progress';
import { UNIT_BY_ID } from '@/data/curriculum';
import { formatDuration, pct, prettyDate } from '@/lib/format';

export const metadata: Metadata = { title: 'Tests' };
export const dynamic = 'force-dynamic';

export default async function TestsPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);
  const recent = state.assessments.slice(0, 20);
  const average = state.assessments.length
    ? state.assessments.reduce((a, x) => a + x.score, 0) / state.assessments.length
    : 0;
  const best = state.assessments.reduce((m, x) => Math.max(m, x.score), 0);

  const canTakeDaily = o.todayPlan.some((t) => t.done);
  const attemptedUnits = Object.values(state.units)
    .filter((u) => u.lessonCompletedAt)
    .map((u) => UNIT_BY_ID.get(u.unitId))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Tests</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Every study day ends with a test drawn only from what you covered that day. Nothing is ever tested before
          it has been taught.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Tests taken" value={state.assessments.length} icon={<Calendar size={14} />} />
        <Stat label="Average" value={average > 0 ? pct(average) : '—'} tone={average >= 0.85 ? 'success' : 'default'} />
        <Stat label="Best" value={best > 0 ? pct(best) : '—'} tone="success" />
        <Stat label="Test streak" value={state.streak.testStreak} tone="warning" sub={`longest ${state.streak.longestTestStreak}`} />
      </div>

      {/* ------------------------------------------------ Take a test */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          icon={<Target size={16} />}
          title="Daily test"
          body={
            o.todayTestDone
              ? "Today's test is done. Your streak is protected."
              : canTakeDaily
                ? `Drawn from the ${o.todayPlan.filter((t) => t.done).length} unit${o.todayPlan.filter((t) => t.done).length === 1 ? '' : 's'} you completed today.`
                : 'Complete at least one unit today and the daily test unlocks.'
          }
          action={
            <Link href="/tests/daily">
              <Button size="sm" disabled={!canTakeDaily && !o.todayTestDone} variant={o.todayTestDone ? 'secondary' : 'primary'}>
                {o.todayTestDone ? 'Retake' : 'Start'}
              </Button>
            </Link>
          }
          badge={o.todayTestDone ? <Badge tone="success">Complete</Badge> : <Badge tone="warning">Due</Badge>}
        />

        <Card
          icon={<RotateCcw size={16} />}
          title="Spaced review"
          body={
            o.dueReviews.length > 0
              ? `${o.dueReviews.length} unit${o.dueReviews.length === 1 ? '' : 's'} due for revisiting before they fade.`
              : 'Nothing due yet. Reviews are scheduled after each test, sooner when a score was shaky.'
          }
          action={
            <Link href="/tests/review">
              <Button size="sm" disabled={o.dueReviews.length === 0} variant="secondary">
                Start review
              </Button>
            </Link>
          }
          badge={o.dueReviews.length > 0 ? <Badge tone="info">{o.dueReviews.length}</Badge> : undefined}
        />

        <Card
          icon={<Crown size={16} />}
          title="Final assessment"
          body={`Every domain, mixed formats, no hints. Unlocks once you have completed ${Math.round(o.totals.total * 0.8)} units.`}
          action={
            <Link href="/final-assessment">
              <Button size="sm" variant="secondary">
                {o.totals.completed >= o.totals.total * 0.8 ? 'Begin' : 'Preview'}
              </Button>
            </Link>
          }
          badge={
            o.totals.completed >= o.totals.total * 0.8 ? (
              <Badge tone="primary">Unlocked</Badge>
            ) : (
              <Badge tone="neutral">{o.totals.completed}/{Math.round(o.totals.total * 0.8)}</Badge>
            )
          }
        />
      </div>

      {/* --------------------------------------------- Per-unit tests */}
      <section className="rounded-xl border border-line bg-surface p-5">
        <SectionHeading
          as="h2"
          title="Unit tests"
          description="A full test on a single unit. Scoring 85% here is what moves it to Proficient."
        />
        {attemptedUnits.length === 0 ? (
          <EmptyState
            className="mt-4 border-0 px-0"
            title="No units completed yet"
            body="Finish a lesson and its unit test appears here."
          />
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {attemptedUnits.slice(0, 12).map((u) => {
              const p = state.units[u.id]!;
              return (
                <li key={u.id} className="flex flex-wrap items-center gap-3 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink">{u.title}</span>
                    <span className="text-[11.5px] text-subtle">
                      {p.attempts > 0 ? `best ${pct(p.bestScore)} · ${p.attempts} attempt${p.attempts === 1 ? '' : 's'}` : 'not attempted'}
                    </span>
                  </span>
                  <ProgressBar value={p.bestScore} className="w-24 shrink-0" size="sm" label={`${u.title} best score`} />
                  <Link href={`/tests/unit/${u.slug}`}>
                    <Button size="sm" variant="ghost">
                      {p.attempts > 0 ? 'Retake' : 'Take'}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* ------------------------------------------------- Test history */}
      <section className="rounded-xl border border-line bg-surface p-5">
        <SectionHeading as="h2" title="History" description="Every graded test, newest first." />
        {recent.length === 0 ? (
          <EmptyState
            className="mt-4 border-0 px-0"
            title="No tests yet"
            body="Your score history, and the pattern in it, starts with the first one."
          />
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-line text-left text-subtle">
                  <th scope="col" className="py-2 pr-4 font-medium">Date</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Type</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Covered</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Score</th>
                  <th scope="col" className="py-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recent.map((a) => {
                  const g = grade(a.score);
                  const titles = a.unitIds.map((id) => UNIT_BY_ID.get(id)?.title).filter(Boolean);
                  return (
                    <tr key={a.id}>
                      <td className="py-2 pr-4 text-muted">{prettyDate(a.date)}</td>
                      <td className="py-2 pr-4 capitalize text-muted">{a.kind.replace('-', ' ')}</td>
                      <td className="max-w-64 truncate py-2 pr-4 text-subtle">
                        {titles.length > 1 ? `${titles[0]} +${titles.length - 1}` : (titles[0] ?? '—')}
                      </td>
                      <td className="py-2 pr-4">
                        <span className="flex items-center gap-2">
                          <span className="tabular-nums text-ink">{pct(a.score)}</span>
                          <Badge tone={g.tone}>{g.letter}</Badge>
                        </span>
                      </td>
                      <td className="py-2 tabular-nums text-subtle">{formatDuration(a.seconds)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Card({
  icon,
  title,
  body,
  action,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/12 text-primary">{icon}</span>
        {badge}
      </div>
      <h2 className="mt-3.5 text-[14px] font-semibold text-ink">{title}</h2>
      <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-subtle">{body}</p>
      <div className="mt-4">{action}</div>
    </div>
  );
}
