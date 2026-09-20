import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/layout/reset-password-form';

export const metadata: Metadata = { title: 'Choose a new password' };

export default function ResetPasswordPage() {
  // useSearchParams needs a Suspense boundary to avoid opting the whole route
  // out of static optimisation.
  return (
    <Suspense fallback={<p className="text-[14px] text-subtle">Loading…</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
