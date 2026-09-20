import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Award, BookOpen, Flame, GraduationCap, Timer, Zap } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { DeadlineTracker } from '@/components/dashboard/deadline-tracker';
import { TodayCard } from '@/components/dashboard/today-card';
import { DomainProgress } from '@/components/dashboard/domain-progress';
import { CompletionBanner } from '@/components/dashboard/completion-banner';
import { AttentionList, reviewDetail, weakDetail } from '@/components/dashboard/attention-list';
import { CompositionDonut, TrendChart } from '@/components/charts/charts';
import { ActivityHeatmap } from '@/components/charts/heatmap';
import { ChartFrame } from '@/components/charts/primitives';
import { ProgressBar, ProgressRing } from '@/components/ui/progress';
import { Stat } from '@/components/ui/misc';
import { Button } from '@/components/ui/button';
import { ALL_UNITS } from '@/data/curriculum';
import { formatDuration, formatXP, greeting, pct } from '@/lib/format';
import { disciplineLabel } from '@/features/xp/rules';

export const metadata: Metadata = { title: 'Dashboard' };
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);
  const name = state.profile.name.split(' ')[0] ?? state.profile.name;
  const discipline = disciplineLabel(state.discipline.score);

  const unitTitles = Object.fromEntries(ALL_UNITS.map((u) => [u.id, { title: u.title, slug: u.slug }]));

  const donut = [
    { key: 'mastered', label: 'Mastered', value: o.totals.buckets.mastered, color: 'var(--viz-cat-mastered)' },
    { key: 'learning', label: 'Learning', value: o.totals.buckets.learning, color: 'var(--viz-cat-learning)' },
    { key: 'review', label: 'Due review', value: o.totals.buckets.review, color: 'var(--viz-cat-review)' },
    { key: 'not-started', label: 'Not started', value: o.totals.buckets['not-started'], color: 'var(--viz-cat-none)' },
  ];

  const overall = o.totals.total ? o.totals.completed / o.totals.total : 0;
  const scoreSeries = o.activitySeries.filter((d) => d.score !== null).map((d) => ({ date: d.date, value: d.score ?? 0 }));

  const curriculumComplete = o.totals.completed >= o.totals.total;
  const finalBest = state.assessments
    .filter((a) => a.kind === 'final-assessment')
    .reduce<number | null>((m, a) => (m === null ? a.score : Math.max(m, a.score)), null);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {curriculumComplete && (
        <CompletionBanner
          totals={{ total: o.totals.total, completed: o.totals.completed, mastered: o.totals.mastered }}
          finalAssessmentBest={finalBest}
          teacherLevelCount={o.totals.teacher}
          totalStudySeconds={o.totals.totalStudySeconds}
          domains={o.domains.map((d) => ({
            id: d.domain.id,
            name: d.domain.name,
            total: d.total,
            completed: d.completed,
            mastered: d.mastered,
            averageScore: d.averageScore,
          }))}
        />
      )}

      {/* ---------------------------------------------------- Greeting */}
      <header className="rounded-xl border border-line bg-gradient-to-br from-surface to-surface-2 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[13px] text-subtle">{greeting()}, {name}.</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              {o.pace.status === 'finished'
                ? 'AI/ML mastery complete.'
                : o.totals.completed === 0
                  ? 'Your journey starts here.'
                  : `${o.totals.completed} of ${o.totals.total} concepts understood.`}
            </h1>
            <div className="mt-4 flex max-w-md items-center gap-3">
              <ProgressBar value={overall} label="Overall curriculum progress" className="flex-1" size="lg" />
              <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink">{pct(overall)}</span>
            </div>
            <p className="mt-2 text-[12.5px] text-subtle">
              {o.level.current.title} · {o.level.next
                ? `${formatXP(o.level.xpToNext)} XP to ${o.level.next.title}`
                : 'Maximum level reached'}
            </p>
          </div>

          <ProgressRing value={o.level.progress} size={104} stroke={9}>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.1em] text-subtle">Level</p>
              <p className="text-2xl font-semibold tabular-nums text-ink">{o.level.current.level}</p>
            </div>
          </ProgressRing>
        </div>
      </header>

      {/* ------------------------------------------------------- Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <Stat label="XP" value={formatXP(state.xp)} tone="xp" icon={<Zap size={14} />} sub={o.level.current.title} />
        <Stat
          label="Streak"
          value={o.streak}
          tone={o.streak > 0 ? 'warning' : 'default'}
          icon={<Flame size={14} />}
          sub={`longest ${state.streak.longest}`}
        />
        <Stat label="Mastered" value={o.totals.mastered} tone="success" icon={<Award size={14} />} sub={`${o.totals.teacher} at teacher level`} />
        <Stat label="Completed" value={o.totals.completed} icon={<BookOpen size={14} />} sub={`${o.totals.remaining} remaining`} />
        <Stat
          label="Test average"
          value={o.totals.averageScore > 0 ? pct(o.totals.averageScore) : '—'}
          icon={<GraduationCap size={14} />}
          sub={`${o.totals.testsTaken} taken`}
        />
        <Stat
          label="Study time"
          value={formatDuration(o.totals.totalStudySeconds)}
          icon={<Timer size={14} />}
          sub={
            <span className={discipline.tone === 'danger' ? 'text-danger' : undefined}>
              Discipline: {discipline.label}
            </span>
          }
        />
      </div>

      {/* --------------------------------------------- Today + deadline */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TodayCard
          theme={o.schedule.byDate.get(o.today)?.theme ?? 'Rest day'}
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
        <DeadlineTracker pace={o.pace} recovery={o.recovery} endDate={state.profile.endDate} unitTitles={unitTitles} />
      </div>

      {/* ------------------------------------------------------ Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <CompositionDonut
          title="Mastery composition"
          subtitle="Where all 214 units currently stand"
          slices={donut}
          total={o.totals.total}
          centreLabel="mastered"
          centreValue={String(o.totals.buckets.mastered)}
        />
        <TrendChart
          data={o.activitySeries.map((d) => ({ date: d.date, value: d.units }))}
          title="Units completed"
          subtitle="Last 60 days"
          valueLabel="Units"
        />
        <TrendChart
          data={o.activitySeries.map((d) => ({ date: d.date, value: d.xp }))}
          title="XP earned"
          subtitle="Last 60 days"
          valueLabel="XP"
          format={(v) => formatXP(v)}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartFrame
            title="Daily activity"
            subtitle={`${state.profile.startDate} to ${state.profile.endDate}`}
            height={150}
          >
            <ActivityHeatmap
              activity={state.activity}
              startDate={state.profile.startDate}
              endDate={state.profile.endDate}
            />
          </ChartFrame>
        </div>
        {scoreSeries.length > 0 ? (
          <TrendChart
            data={scoreSeries}
            title="Test scores"
            subtitle="Every graded test"
            valueLabel="Score"
            percent
            domainMax={1}
            format={(v) => `${Math.round(v * 100)}%`}
          />
        ) : (
          <ChartFrame title="Test scores" subtitle="Nothing graded yet" height={190}>
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="text-[13px] text-subtle">Your score history appears here after your first test.</p>
                <Link href="/tests" className="mt-3 inline-block">
                  <Button size="sm" variant="subtle">Go to tests</Button>
                </Link>
              </div>
            </div>
          </ChartFrame>
        )}
      </div>

      {/* --------------------------------------------- Domains + focus */}
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <DomainProgress domains={o.domains} />
        <div className="space-y-4">
          <AttentionList
            weak={o.weakUnits.map((w) => ({
              id: w.unit.id,
              title: w.unit.title,
              slug: w.unit.slug,
              detail: weakDetail(w.progress.bestScore, w.progress.attempts),
            }))}
            reviews={o.dueReviews.map((r) => ({
              id: r.unit.id,
              title: r.unit.title,
              slug: r.unit.slug,
              detail: reviewDetail(r.progress.nextReviewAt, o.today),
            }))}
          />
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="text-[14px] font-semibold text-ink">Keep going</h2>
            <p className="mt-1 text-[12.5px] leading-relaxed text-subtle">
              {o.totals.completed === 0
                ? 'Nothing is more useful right now than starting the first unit.'
                : o.recovery.needed
                  ? 'Your weak topics are your next opportunity — they are worth more than new material.'
                  : 'One concept closer. Consistency is what is actually building here.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {o.continueWith && (
                <Link href={`/learn/${o.continueWith.slug}`}>
                  <Button size="sm">Continue: {o.continueWith.title}</Button>
                </Link>
              )}
              {o.nextUp && o.nextUp.id !== o.continueWith?.id && (
                <Link href={`/learn/${o.nextUp.slug}`}>
                  <Button size="sm" variant="secondary">Next up: {o.nextUp.title}</Button>
                </Link>
              )}
              <Link href="/tutor">
                <Button size="sm" variant="ghost">Ask the tutor</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
