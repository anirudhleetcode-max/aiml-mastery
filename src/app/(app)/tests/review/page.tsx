import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { buildReviewTest } from '@/features/testing/generate';
import { TestRunner } from '@/components/testing/test-runner';
import { EmptyState } from '@/components/ui/misc';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Spaced review' };
export const dynamic = 'force-dynamic';

export default async function ReviewPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const o = buildOverview(state);
  const units = o.dueReviews.map((r) => r.unit);

  if (units.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <EmptyState
          title="Nothing due for review"
          body="The revision engine schedules each unit again after a test — one day out if the score was shaky, up to a month out once it is solid. Come back when something is due, or retake a unit test directly."
          action={
            <Link href="/tests">
              <Button size="sm">Back to tests</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const test = buildReviewTest(units, state.units);

  return (
    <TestRunner
      test={{
        kind: 'review',
        title: test.title,
        description: test.description,
        suggestedMinutes: test.suggestedMinutes,
        questions: test.questions.map((q) => {
          const unit = units.find((u) => u.id === q.unitId)!;
          return { question: q.question, unitId: q.unitId, unitTitle: unit.title, unitSlug: unit.slug };
        }),
      }}
      mode="immediate"
    />
  );
}
