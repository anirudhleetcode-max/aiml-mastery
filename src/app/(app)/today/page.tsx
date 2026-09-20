import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CalendarDays, ClipboardCheck, GraduationCap, RotateCcw, Sparkles } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { reteachStrategy } from '@/features/revision/spaced';
import { TodayCard } from '@/components/dashboard/today-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stat, SectionHeading } from '@/components/ui/misc';
import { ProgressBar } from '@/components/ui/progress';
import { domainColor } from '@/data/domains';
import { formatDuration, formatMinutes, greeting, pct, prettyDateLong } from '@/lib/format';

export const metadata: Metadata = { title: "Today's mission" };
export const dynamic = 'force-dynamic';

export default async function TodayPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);
  const plan = o.schedule.byDate.get(o.today);
  const dayNumber = plan?.dayNumber ?? 0;
  const activity = state.activity[o.today];
  const name = state.profile.name.split(' ')[0] ?? state.profile.name;
  const beforeStart = o.today < state.profile.startDate;

  const totalPlannedMinutes = o.todayPlan.reduce((a, t) => a + t.unit.estimatedMinutes, 0);
  const worstUnit = o.weakUnits[0];
  const reteach = worstUnit ? reteachStrategy(worstUnit.progress.attempts) : null;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {beforeStart ? 'Before you begin' : `Day ${dayNumber} of ${o.schedule.totalDays}`}
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">
          {greeting()}, {name}.
        </h1>
        <p className="mt-1 text-[13.5px] text-subtle">{prettyDateLong(o.today)}</p>
      </header>

      {beforeStart && (
        <section className="rounded-xl border border-primary/30 bg-primary/[0.06] p-6 text-center">
          <Sparkles size={22} className="mx-auto text-primary" />
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink">Welcome to your AI/ML journey</h2>
          <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted">
            {o.schedule.totalDays} days. {o.totals.total} concepts. One mission: understand AI/ML deeply enough to
            build it and teach it.
          </p>
          <p className="mt-3 text-[13px] text-subtle">
            Your plan starts on {prettyDateLong(state.profile.startDate)}. Nothing stops you beginning early.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {o.nextUp && (
              <Link href={`/learn/${o.nextUp.slug}`}>
                <Button size="lg">Start unit one: {o.nextUp.title}</Button>
              </Link>
            )}
            <Link href="/roadmap">
              <Button size="lg" variant="outline">
                Explore the roadmap
              </Button>
            </Link>
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Planned today" value={formatMinutes(totalPlannedMinutes + 10)} icon={<CalendarDays size={14} />} />
        <Stat label="Studied today" value={formatDuration(activity?.studySeconds ?? 0)} />
        <Stat
          label="Daily test"
          value={o.todayTestDone ? 'Done' : 'Waiting'}
          tone={o.todayTestDone ? 'success' : 'warning'}
          icon={<ClipboardCheck size={14} />}
        />
        <Stat
          label="Reviews due"
          value={o.dueReviews.length}
          tone={o.dueReviews.length > 0 ? 'warning' : 'default'}
          icon={<RotateCcw size={14} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <TodayCard
          theme={plan?.theme ?? 'Rest day'}
          testDone={o.todayTestDone}
          items={o.todayPlan.map((t) => ({
            id: t.unit.id,
            title: t.unit.title,
            slug: t.unit.slug,
            domain: t.unit.domain,
            module: t.unit.module,
            minutes: t.unit.estimatedMinutes,
            done: t.done,
          }))}
        />

        <div className="space-y-4">
          {/* --------------------------------------------- Reviews due */}
          <section className="rounded-xl border border-line bg-surface p-5">
            <SectionHeading
              as="h2"
              title="Spaced review"
              description={
                o.dueReviews.length === 0
                  ? 'Nothing is due. Reviews are scheduled automatically after each test, sooner when a score was shaky.'
                  : 'These are due today. Fifteen minutes here is worth more than an hour of new material.'
              }
            />
            {o.dueReviews.length > 0 && (
              <>
                <ul className="mt-4 space-y-1.5">
                  {o.dueReviews.slice(0, 5).map((r) => (
                    <li key={r.unit.id}>
                      <Link
                        href={`/learn/${r.unit.slug}`}
                        className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-2"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: domainColor(r.unit.domain) }}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1 truncate text-[13px] text-ink group-hover:text-primary">
                          {r.unit.title}
                        </span>
                        <span className="shrink-0 text-[11.5px] tabular-nums text-subtle">
                          best {pct(r.progress.bestScore)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/tests/review" className="mt-3 inline-block">
                  <Button size="sm" variant="subtle">
                    Start review session ({o.dueReviews.length})
                  </Button>
                </Link>
              </>
            )}
          </section>

          {/* ------------------------------------------ Re-teach panel */}
          {worstUnit && reteach && (
            <section className="rounded-xl border border-warning/25 bg-warning/[0.05] p-5">
              <Badge tone="warning">{reteach.title}</Badge>
              <p className="mt-3 text-[14px] font-semibold text-ink">{worstUnit.unit.title}</p>
              <p className="mt-1 text-[12.5px] text-subtle">
                Best score {pct(worstUnit.progress.bestScore)} over {worstUnit.progress.attempts} attempt
                {worstUnit.progress.attempts === 1 ? '' : 's'}. Repeating the test is not the answer.
              </p>
              <ol className="mt-3 space-y-2">
                {reteach.steps.map((s, i) => (
                  <li key={i} className="flex gap-2.5 text-[12.5px] leading-relaxed">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-surface-3 text-[10px] font-semibold tabular-nums text-subtle">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-medium text-ink">{s.label}. </span>
                      <span className="text-muted">{s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Link href={`/learn/${worstUnit.unit.slug}#intuition`} className="mt-3 inline-block">
                <Button size="sm" variant="secondary">
                  Start with the analogy
                </Button>
              </Link>
            </section>
          )}

          {/* -------------------------------------------- Teach it back */}
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
              <GraduationCap size={15} className="text-subtle" /> Teach something back
            </h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-subtle">
              The fastest way to find out whether today actually landed. Pick anything you have finished and explain
              it without looking.
            </p>
            <Link href="/teach" className="mt-3 inline-block">
              <Button size="sm" variant="subtle">
                Open teacher mode
              </Button>
            </Link>
          </section>
        </div>
      </div>

      {/* ------------------------------------------------ Daily report */}
      <section className="rounded-xl border border-line bg-surface p-5">
        <SectionHeading
          as="h2"
          title="Today's report"
          description="Updated live as you work. The full history lives in Analytics."
        />
        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-5">
          {[
            { label: 'Lessons', value: `${o.todayPlan.filter((t) => t.done).length}/${Math.max(1, o.todayPlan.length)}` },
            { label: 'Test', value: activity?.testTaken ? pct(activity.testScore ?? 0) : '—' },
            { label: 'XP today', value: `+${activity?.xp ?? 0}` },
            { label: 'Study time', value: formatDuration(activity?.studySeconds ?? 0) },
            { label: 'Taught back', value: activity?.teachBacks ?? 0 },
          ].map((s) => (
            <div key={s.label} className="bg-surface px-3 py-2.5">
              <dt className="text-[10.5px] uppercase tracking-[0.1em] text-subtle">{s.label}</dt>
              <dd className="mt-0.5 text-[16px] font-semibold tabular-nums text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[12px]">
            <span className="text-subtle">Curriculum progress</span>
            <span className="tabular-nums text-muted">
              {o.totals.completed}/{o.totals.total} · {o.pace.message}
            </span>
          </div>
          <ProgressBar value={o.totals.completed / o.totals.total} label="Curriculum progress" />
        </div>

        {o.nextUp && (
          <p className="mt-4 border-t border-line pt-4 text-[13px] text-subtle">
            <span className="font-medium text-ink">Tomorrow: </span>
            {o.schedule.byDate.get(new Date(new Date(o.today).getTime() + 86400000).toISOString().slice(0, 10))?.theme ??
              o.nextUp.module}
          </p>
        )}
      </section>
    </div>
  );
}
