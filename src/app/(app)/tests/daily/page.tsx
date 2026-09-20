import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { buildDailyTest } from '@/features/testing/generate';
import { TestRunner } from '@/components/testing/test-runner';
import { EmptyState } from '@/components/ui/misc';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Daily test' };
export const dynamic = 'force-dynamic';

export default async function DailyTestPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);

  // The rule from the spec: whatever was studied today is what gets tested —
  // even if that was a single subtopic. Nothing untaught ever appears.
  const studiedToday = o.todayPlan.filter((t) => t.done).map((t) => t.unit);

  if (studiedToday.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <EmptyState
          title="Nothing studied today yet"
          body="The daily test is built from exactly what you covered today, so it unlocks once you have finished at least one unit. That is deliberate: a test on material you have not been taught measures nothing."
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/today">
                <Button size="sm">Open today&rsquo;s mission</Button>
              </Link>
              <Link href="/tests/review">
                <Button size="sm" variant="secondary">
                  Do a review instead
                </Button>
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  const weak = new Set(o.weakUnits.map((w) => w.unit.id));
  const test = buildDailyTest(studiedToday, o.today, { weakUnitIds: weak });

  return (
    <TestRunner
      test={{
        kind: 'daily-test',
        title: test.title,
        description: test.description,
        suggestedMinutes: test.suggestedMinutes,
        questions: test.questions.map((q) => {
          const unit = studiedToday.find((u) => u.id === q.unitId)!;
          return { question: q.question, unitId: q.unitId, unitTitle: unit.title, unitSlug: unit.slug };
        }),
      }}
      mode="immediate"
    />
  );
}
