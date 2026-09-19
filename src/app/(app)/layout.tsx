import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { Providers } from '@/components/layout/providers';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Toaster } from '@/components/layout/toaster';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const state = await loadState(user.id);

  if (!state) redirect('/login');
  if (!state.profile.onboardedAt) redirect('/onboarding');

  return (
    <Providers initialState={state}>
      <div className="flex min-h-dvh">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 lg:block xl:w-64">
          <Sidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main id="main" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </Providers>
  );
}
