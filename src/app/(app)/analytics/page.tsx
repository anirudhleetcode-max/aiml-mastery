import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Flame, GraduationCap, Timer, TrendingUp, Zap } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { CompositionDonut, TrendChart, BarsChart } from '@/components/charts/charts';
import { ChartFrame } from '@/components/charts/primitives';
import { ActivityPanel, PeriodReports, type PeriodSummary } from '@/components/analytics/period-report';
import { Stat, SectionHeading } from '@/components/ui/misc';
import { ProgressBar } from '@/components/ui/progress';
import { MASTERY_LEVELS, MASTERY_META } from '@/types/progress';
import { levelFor } from '@/features/xp/levels';
import { disciplineLabel } from '@/features/xp/rules';
import { addDays, dateKey, daysBetween, formatDuration, formatXP, parseDateKey, pct, prettyDate } from '@/lib/format';

export const metadata: Metadata = { title: 'Analytics' };
export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);
  const level = levelFor(state.xp);
  const discipline = disciplineLabel(state.discipline.score);

  const donut = [
    { key: 'mastered', label: 'Mastered', value: o.totals.buckets.mastered, color: 'var(--viz-cat-mastered)' },
    { key: 'learning', label: 'Learning', value: o.totals.buckets.learning, color: 'var(--viz-cat-learning)' },
    { key: 'review', label: 'Due review', value: o.totals.buckets.review, color: 'var(--viz-cat-review)' },
    { key: 'not-started', label: 'Not started', value: o.totals.buckets['not-started'], color: 'var(--viz-cat-none)' },
  ];

  const scoreSeries = o.activitySeries
    .filter((d) => d.score !== null)
    .map((d) => ({ date: d.date, value: d.score ?? 0 }));

  const domainScores = o.domains
    .filter((d) => d.averageScore > 0)
    .map((d) => ({ label: d.domain.shortName, value: d.averageScore }));

  const domainProgress = o.domains.map((d) => ({ label: d.domain.shortName, value: d.progress }));

  const weeks = buildPeriods(state, o, 'week');
  const months = buildPeriods(state, o, 'month');

  const masteryDistribution = MASTERY_LEVELS.filter((l) => l !== 'NOT_STARTED').map((l) => ({
    label: MASTERY_META[l].label,
    value: o.totals.masteryCounts[l],
  }));

  const totalActiveDays = Object.values(state.activity).filter((a) => a.studySeconds > 0 || a.unitsCompleted > 0).length;
  const elapsedDays = Math.max(1, daysBetween(state.profile.startDate, o.today) + 1);

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Analytics</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          What the numbers actually say about your learning — not just how much you have done, but whether it is
          sticking.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <Stat label="Level" value={level.current.level} sub={level.current.title} icon={<TrendingUp size={14} />} />
        <Stat label="XP" value={formatXP(state.xp)} tone="xp" icon={<Zap size={14} />} sub={level.next ? `${formatXP(level.xpToNext)} to next` : 'Max level'} />
        <Stat label="Streak" value={o.streak} tone="warning" icon={<Flame size={14} />} sub={`longest ${state.streak.longest}`} />
        <Stat
          label="Test average"
          value={o.totals.averageScore > 0 ? pct(o.totals.averageScore) : '—'}
          icon={<GraduationCap size={14} />}
          sub={`${o.totals.testsTaken} tests`}
        />
        <Stat label="Study time" value={formatDuration(o.totals.totalStudySeconds)} icon={<Timer size={14} />} sub={`${totalActiveDays}/${elapsedDays} active days`} />
        <Stat label="Discipline" value={state.discipline.score} tone={discipline.tone === 'danger' ? 'warning' : 'success'} sub={discipline.label} />
      </div>

      {/* --------------------------------------------------- Composition */}
      <div className="grid gap-4 lg:grid-cols-3">
        <CompositionDonut
          title={`Where the ${o.totals.total} units stand`}
          subtitle="Mastered, learning, due for review, untouched"
          slices={donut}
          total={o.totals.total}
          centreLabel="mastered"
          centreValue={String(o.totals.buckets.mastered)}
        />

        <ChartFrame
          title="Mastery distribution"
          subtitle="Evidence-based: each level needs a recorded artefact"
          height={230}
          table={{ columns: ['Level', 'Units'], rows: masteryDistribution.map((m) => [m.label, m.value]) }}
        >
          <ul className="flex h-full flex-col justify-center gap-2.5">
            {masteryDistribution.map((m, i) => (
              <li key={m.label} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-[12px] text-muted">{m.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{
                      width: `${o.totals.total ? (m.value / o.totals.total) * 100 : 0}%`,
                      background: `var(--viz-seq-${Math.min(4, i + 1)})`,
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-[12px] tabular-nums text-subtle">{m.value}</span>
              </li>
            ))}
          </ul>
        </ChartFrame>

        {scoreSeries.length > 1 ? (
          <TrendChart
            data={scoreSeries}
            title="Test scores over time"
            subtitle="Every graded test"
            valueLabel="Score"
            percent
            domainMax={1}
            format="score"
          />
        ) : (
          <ChartFrame title="Test scores over time" subtitle="Needs at least two graded tests" height={230}>
            <div className="grid h-full place-items-center">
              <p className="max-w-xs text-center text-[13px] leading-relaxed text-subtle">
                A trend needs more than one point. After a few daily tests this chart is the clearest signal of
                whether things are sticking.
              </p>
            </div>
          </ChartFrame>
        )}
      </div>

      {/* ------------------------------------------------------- Trends */}
      <div className="grid gap-4 lg:grid-cols-3">
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
          format="xp"
        />
        <TrendChart
          data={o.activitySeries.map((d) => ({ date: d.date, value: d.minutes }))}
          title="Study time"
          subtitle="Last 60 days, in minutes"
          valueLabel="Minutes"
          format="minutes"
        />
      </div>

      {/* ------------------------------------------------------ Domains */}
      <div className="grid gap-4 lg:grid-cols-2">
        <BarsChart
          data={domainProgress}
          title="Completion by domain"
          subtitle="Share of each domain's units finished"
          valueLabel="Complete"
          percent
          horizontal
          height={340}
          format="percent"
        />
        {domainScores.length > 0 ? (
          <BarsChart
            data={domainScores}
            title="Average score by domain"
            subtitle="Across units you have been tested on"
            valueLabel="Average"
            percent
            horizontal
            height={340}
            format="percent"
          />
        ) : (
          <ChartFrame title="Average score by domain" subtitle="Nothing graded yet" height={340}>
            <div className="grid h-full place-items-center">
              <p className="max-w-xs text-center text-[13px] leading-relaxed text-subtle">
                Once you have taken tests across a few domains, this is where the shape of your strengths shows up.
              </p>
            </div>
          </ChartFrame>
        )}
      </div>

      {/* ----------------------------------------------------- Activity */}
      <ActivityPanel activity={state.activity} startDate={state.profile.startDate} endDate={state.profile.endDate} />

      <PeriodReports weeks={weeks} months={months} />

      {/* ------------------------------------------------- Weak topics */}
      <section className="rounded-xl border border-line bg-surface p-5">
        <SectionHeading
          as="h2"
          title="Where the effort should go"
          description="Ranked by how much a fix is worth: a weak prerequisite costs you repeatedly, downstream."
        />
        {o.weakUnits.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line px-4 py-8 text-center text-[13px] text-subtle">
            Nothing is currently below the understanding bar.
          </p>
        ) : (
          <ul className="mt-4 space-y-2.5">
            {o.weakUnits.map((w) => (
              <li key={w.unit.id} className="flex flex-wrap items-center gap-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">{w.unit.title}</span>
                  <span className="text-[11.5px] text-subtle">
                    {w.progress.attempts} attempt{w.progress.attempts === 1 ? '' : 's'} · last {pct(w.progress.lastScore)}
                  </span>
                </span>
                <ProgressBar value={w.progress.bestScore} className="w-28 shrink-0" size="sm" label={`${w.unit.title} best score`} />
                <span className="w-12 shrink-0 text-right text-[12px] tabular-nums text-muted">
                  {pct(w.progress.bestScore)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/** Aggregates daily activity into week or month buckets for the reports table. */
function buildPeriods(
  state: NonNullable<Awaited<ReturnType<typeof loadState>>>,
  o: ReturnType<typeof buildOverview>,
  grain: 'week' | 'month',
): PeriodSummary[] {
  const buckets = new Map<string, { label: string; days: string[] }>();
  const start = state.profile.startDate;
  const end = o.today < state.profile.endDate ? o.today : state.profile.endDate;
  const span = daysBetween(start, end);
  if (span < 0) return [];

  for (let i = 0; i <= span; i++) {
    const date = addDays(start, i);
    const d = parseDateKey(date);
    let key: string;
    let label: string;

    if (grain === 'month') {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else {
      const monday = new Date(d);
      monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      key = dateKey(monday);
      label = `Week of ${prettyDate(key)}`;
    }

    const existing = buckets.get(key);
    if (existing) existing.days.push(date);
    else buckets.set(key, { label, days: [date] });
  }

  const domainByUnit = new Map(o.meta.map((m) => [m.id, m.domain]));
  const domainNames = new Map(o.domains.map((d) => [d.domain.id, d.domain.shortName]));

  return [...buckets.entries()]
    .map(([key, bucket]) => {
      let units = 0;
      let xp = 0;
      let studySeconds = 0;
      let testsTaken = 0;
      let scoreSum = 0;
      let activeDays = 0;

      for (const date of bucket.days) {
        const a = state.activity[date];
        if (!a) continue;
        units += a.unitsCompleted;
        xp += a.xp;
        studySeconds += a.studySeconds;
        if (a.testTaken) {
          testsTaken += 1;
          scoreSum += a.testScore ?? 0;
        }
        if (a.studySeconds > 0 || a.unitsCompleted > 0) activeDays += 1;
      }

      // Strongest/weakest domain in the period, from assessments in range.
      const inRange = state.assessments.filter((x) => bucket.days.includes(x.date));
      const byDomain = new Map<string, { sum: number; n: number }>();
      for (const a of inRange) {
        for (const unitId of a.unitIds) {
          const domain = domainByUnit.get(unitId);
          if (!domain) continue;
          const entry = byDomain.get(domain) ?? { sum: 0, n: 0 };
          entry.sum += a.score;
          entry.n += 1;
          byDomain.set(domain, entry);
        }
      }
      const ranked = [...byDomain.entries()]
        .map(([d, v]) => ({ domain: d, avg: v.sum / v.n }))
        .sort((a, b) => b.avg - a.avg);

      return {
        key,
        label: bucket.label,
        units,
        xp,
        studySeconds,
        testsTaken,
        averageScore: testsTaken ? scoreSum / testsTaken : 0,
        activeDays,
        totalDays: bucket.days.length,
        strongest: ranked[0] ? (domainNames.get(ranked[0].domain as never) ?? null) : null,
        weakest: ranked.length > 1 ? (domainNames.get(ranked[ranked.length - 1]!.domain as never) ?? null) : null,
      };
    })
    .filter((p) => p.units > 0 || p.studySeconds > 0)
    .reverse();
}
