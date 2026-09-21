import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VerifyEmailView } from '@/components/layout/verify-email-view';

export const metadata: Metadata = { title: 'Confirm your email' };

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="text-[14px] text-subtle">Loading…</p>}>
      <VerifyEmailView />
    </Suspense>
  );
}
