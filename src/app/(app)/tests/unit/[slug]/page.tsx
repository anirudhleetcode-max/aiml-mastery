import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { getUnit } from '@/data/curriculum';
import { buildUnitTest } from '@/features/testing/generate';
import { TestRunner } from '@/components/testing/test-runner';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnit(slug);
  return { title: unit ? `${unit.title} — unit test` : 'Unit test' };
}

export default async function UnitTestPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();

  const attempts = state.units[unit.id]?.attempts ?? 0;
  const test = buildUnitTest(unit, attempts);

  return (
    <TestRunner
      test={{
        kind: 'unit-test',
        title: test.title,
        description: test.description,
        suggestedMinutes: test.suggestedMinutes,
        questions: test.questions.map((q) => ({
          question: q.question,
          unitId: unit.id,
          unitTitle: unit.title,
          unitSlug: unit.slug,
        })),
      }}
      mode="immediate"
      backHref={`/learn/${unit.slug}`}
    />
  );
}
