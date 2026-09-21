'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertCircle, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';

/**
 * Starts a password reset.
 *
 * The confirmation is identical whether or not the address has an account,
 * because the server's answer is identical — saying "no such account" here
 * would turn the form into a membership check for any address someone cares
 * to try.
 */
export function ForgotPasswordForm() {
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Native submission before hydration would GET the address into the URL.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Try again in a moment.');
        return;
      }
      setSent(true);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div>
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-success/12 text-success">
          <MailCheck size={20} />
        </div>
        <h1 className="text-[26px] font-semibold tracking-tight text-ink">Check your email</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
          If an account exists for that address, a reset link is on its way. It expires in an hour and works once.
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-subtle">
          Nothing arrived? Check spam, then try again — we deliberately do not confirm whether an address is
          registered, so this page looks the same either way.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-[13.5px] font-medium text-primary-ink hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-tight text-ink">Reset your password</h1>
      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
        Enter the address you signed up with and we will send a link to set a new password.
      </p>

      <form method="post" action="/api/auth/forgot-password" onSubmit={onSubmit} className="mt-7 space-y-4">
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger/8 p-3 text-[13px] text-danger"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </Field>

        <Button type="submit" className="w-full" loading={pending} disabled={!ready}>
          Send the reset link
        </Button>

        <noscript>
          <p className="text-[12.5px] text-warning">
            This form needs JavaScript so your address is sent in the request body rather than the URL.
          </p>
        </noscript>
      </form>

      <p className="mt-6 text-[13.5px] text-subtle">
        Remembered it?{' '}
        <Link href="/login" className="font-medium text-primary-ink hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
