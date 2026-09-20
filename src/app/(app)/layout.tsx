import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { buildOverview } from '@/features/progress/overview';
import { refreshNotifications } from '@/features/notifications/engine';
import { Providers } from '@/components/layout/providers';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Toaster } from '@/components/layout/toaster';
import { BrowserNotifications } from '@/components/layout/browser-notifications';
import { VerifyEmailBanner } from '@/components/layout/verify-email-banner';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const state = await loadState(user.id);

  if (!state) redirect('/login');
  if (!state.profile.onboardedAt) redirect('/onboarding');

  // Notifications are derived from state rather than pushed on a schedule.
  // Every dedupe key contains the date, so the unique constraint makes
  // "at most one of a kind per day" structural rather than aspirational, and
  // calling this on every page load is therefore safe.
  const overview = buildOverview(state);
  const created = await refreshNotifications(user.id, state, overview).catch(() => 0);
  const current = created > 0 ? ((await loadState(user.id)) ?? state) : state;

  return (
    <Providers initialState={current}>
      <div className="flex min-h-dvh">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 lg:block xl:w-64">
          <Sidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          {!user.emailVerifiedAt && <VerifyEmailBanner email={user.email} />}
          {/* `px-3` on the narrowest phones: at 320px a 16px gutter each side
              leaves too little for a dense dashboard card to fit. */}
          <main id="main" className="flex-1 px-3 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
      <BrowserNotifications />
    </Providers>
  );
}
