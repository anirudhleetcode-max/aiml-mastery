import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ClipboardList } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { progressFor } from '@/features/progress/overview';
import { isWeak, requirementsFor } from '@/features/progress/mastery';
import { ALL_UNITS } from '@/data/curriculum';
import { DOMAIN_BY_ID, DOMAINS } from '@/data/domains';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/misc';
import { PracticeView, type PracticeUnit } from '@/components/practice/practice-view';
import type { DomainId } from '@/types/curriculum';

export const metadata: Metadata = { title: 'Practice' };
export const dynamic = 'force-dynamic';

export default async function PracticePage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const started = ALL_UNITS.filter((u) => {
    const p = state.units[u.id];
    return Boolean(p && (p.lessonCompletedAt || p.attempts > 0 || p.lastStudiedAt));
  });

  const units: PracticeUnit[] = started.map((u) => {
    const p = progressFor(state, u.id);
    return {
      unitId: u.id,
      title: u.title,
      slug: u.slug,
      domainId: u.domain,
      domainName: DOMAIN_BY_ID[u.domain]?.name ?? u.domain,
      weak: isWeak(p, requirementsFor(u)),
      practiceCompleted: p.practiceCompleted,
      challengeCompleted: p.challengeCompleted,
      questions: u.practiceQuestions.map((q) => ({
        prompt: q.prompt,
        hint: q.hint,
        solution: q.solution,
        ...(q.starterCode ? { starterCode: q.starterCode } : {}),
      })),
      challenge: u.challenge
        ? {
            title: u.challenge.title,
            brief: u.challenge.brief,
            acceptanceCriteria: u.challenge.acceptanceCriteria,
          }
        : null,
    };
  });

  const present = new Set(units.map((u) => u.domainId));
  const domains: { id: DomainId; name: string }[] = DOMAINS.filter((d) => present.has(d.id)).map((d) => ({
    id: d.id,
    name: d.name,
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Practice</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Every exercise from the units you have opened, in one place. Attempt each one before you open the hint:
          reading a solution you never struggled with teaches almost nothing.
        </p>
      </header>

      {units.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={18} />}
          title="Practice arrives with your first unit"
          body="Exercises are written for every unit in the curriculum. As soon as you open a lesson, its practice appears here so you can come back to it without hunting through the unit again."
          action={
            <Link href="/today">
              <Button size="sm">See today&rsquo;s plan</Button>
            </Link>
          }
        />
      ) : (
        <PracticeView units={units} domains={domains} />
      )}
    </div>
  );
}
