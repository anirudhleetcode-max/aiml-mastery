import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { getUnit } from '@/data/curriculum';
import { starterPrompts } from '@/features/tutor/engine';
import { TutorChat } from '@/components/tutor/tutor-chat';

export const metadata: Metadata = { title: 'AI tutor' };
export const dynamic = 'force-dynamic';

export default async function TutorPage({
  searchParams,
}: {
  searchParams: Promise<{ unit?: string; q?: string }>;
}) {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const params = await searchParams;
  const o = buildOverview(state);

  // Default context is whatever the learner is currently working on, so
  // "explain this differently" means something without being spelled out.
  const contextUnit = params.unit ? getUnit(params.unit) : (o.continueWith ?? undefined);

  return (
    <div className="mx-auto max-w-3xl">
      <TutorChat
        starters={starterPrompts(contextUnit)}
        currentUnitId={contextUnit?.id}
        currentUnitTitle={contextUnit?.title}
      />
    </div>
  );
}
