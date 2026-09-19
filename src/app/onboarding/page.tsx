import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { Providers } from '@/components/layout/providers';
import { OnboardingFlow } from '@/components/layout/onboarding-flow';

export const metadata: Metadata = { title: 'Set up your plan' };

export default async function OnboardingPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');
  if (state.profile.onboardedAt) redirect('/dashboard');

  return (
    <Providers initialState={state}>
      <main id="main" className="relative min-h-dvh">
        <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-4 py-12 sm:px-6">
          <OnboardingFlow defaultName={state.profile.name} />
        </div>
      </main>
    </Providers>
  );
}
