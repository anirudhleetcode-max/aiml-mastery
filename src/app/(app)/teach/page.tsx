import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { GraduationCap } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { UNIT_BY_ID } from '@/data/curriculum';
import { DOMAIN_BY_ID } from '@/data/domains';
import { TeachHub, type TeachableUnit } from '@/components/tutor/teach-hub';
import { Stat } from '@/components/ui/misc';
import { pct } from '@/lib/format';
import type { LearningUnit } from '@/types/curriculum';

export const metadata: Metadata = { title: 'Teacher mode' };
export const dynamic = 'force-dynamic';

export default async function TeachPage({ searchParams }: { searchParams: Promise<{ challenge?: string }> }) {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const params = await searchParams;
  const challengeMode = params.challenge === '1';

  const completed = Object.values(state.units).filter((u) => u.lessonCompletedAt);

  const units: TeachableUnit[] = [];
  const unitsById: Record<string, LearningUnit> = {};

  for (const p of completed) {
    const unit = UNIT_BY_ID.get(p.unitId);
    if (!unit) continue;
    unitsById[unit.id] = unit;
    const lastAttempt = state.teachingAttempts.find((t) => t.unitId === unit.id);
    units.push({
      id: unit.id,
      title: unit.title,
      slug: unit.slug,
      domain: unit.domain,
      domainName: DOMAIN_BY_ID[unit.domain]?.name ?? unit.domain,
      bestTeachingScore: p.teachingScore,
      lastTaughtAt: lastAttempt?.createdAt ?? null,
      mastery: p.mastery,
    });
  }

  const taught = state.teachingAttempts.length;
  const averageTeaching = taught
    ? state.teachingAttempts.reduce((a, t) => a + t.score, 0) / taught
    : 0;
  const atTeacherLevel = Object.values(state.units).filter((u) => u.mastery === 'TEACHER').length;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header>
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          <GraduationCap size={13} /> Teacher mode
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">
          If you can teach it, you understand it
        </h1>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          The highest mastery level in this platform is not a test score. It is being able to explain the concept
          clearly, in your own words, with nothing open in front of you.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Explanations given" value={taught} />
        <Stat label="Average score" value={taught ? pct(averageTeaching) : '—'} tone={averageTeaching >= 0.8 ? 'success' : 'default'} />
        <Stat label="At teacher level" value={atTeacherLevel} tone="success" sub={`of ${units.length} completed`} />
        <Stat label="Teaching streak" value={state.streak.teachingStreak} tone="warning" />
      </div>

      <TeachHub units={units} unitsById={unitsById} challengeMode={challengeMode} />

      {state.teachingAttempts.length > 0 && (
        <section className="rounded-xl border border-line bg-surface p-5">
          <h2 className="text-[14px] font-semibold text-ink">Your recent explanations</h2>
          <ul className="mt-3 divide-y divide-line">
            {state.teachingAttempts.slice(0, 8).map((t) => {
              const unit = UNIT_BY_ID.get(t.unitId);
              return (
                <li key={t.id} className="py-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-[13.5px] font-medium text-ink">{unit?.title ?? t.unitId}</span>
                    <span className={t.score >= 0.8 ? 'text-[12.5px] text-success' : 'text-[12.5px] text-warning'}>
                      {pct(t.score)}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-subtle">{t.text}</p>
                  {t.missing.length > 0 && (
                    <p className="mt-1.5 text-[11.5px] text-warning">Missed: {t.missing.join('; ')}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
