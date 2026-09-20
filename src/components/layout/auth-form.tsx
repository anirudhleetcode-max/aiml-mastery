'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const isSignup = mode === 'signup';
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  // Until this component has hydrated, a submit would be handled natively by
  // the browser. With the default GET method that puts the password in the
  // URL and in history, so the form declares method="post" *and* the button
  // stays disabled until the JavaScript handler is actually attached.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = isSignup
      ? {
          name: String(form.get('name') ?? '').trim(),
          email: String(form.get('email') ?? '').trim(),
          password: String(form.get('password') ?? ''),
        }
      : { email: String(form.get('email') ?? '').trim(), password: String(form.get('password') ?? '') };

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; needsOnboarding?: boolean };
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Try again.');
        setPending(false);
        return;
      }
      router.push(data.needsOnboarding ? '/onboarding' : '/dashboard');
      router.refresh();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
      setPending(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        {isSignup ? 'Create your account' : 'Welcome back'}
      </h1>
      <p className="mt-2 text-[14px] leading-relaxed text-subtle">
        {isSignup
          ? 'One account, 214 units, and a plan that adapts to the time you actually have.'
          : 'Your streak, your schedule and your mistake notebook are waiting.'}
      </p>

      <form
        onSubmit={onSubmit}
        method="post"
        action={`/api/auth/${mode}`}
        className="mt-8 space-y-4"
        noValidate
      >
        {isSignup && (
          <Field label="Your name" htmlFor="name">
            <Input id="name" name="name" autoComplete="name" required maxLength={80} placeholder="Anirudh" />
          </Field>
        )}

        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            aria-invalid={error ? true : undefined}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          hint={isSignup ? 'At least 10 characters. A memorable phrase beats a clever symbol.' : undefined}
        >
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
              minLength={isSignup ? 10 : 1}
              className="pr-10"
              aria-invalid={error ? true : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-subtle hover:text-ink"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </Field>

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger/8 p-3 text-[13px] text-danger">
            <AlertCircle size={15} className="mt-px shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={pending || !ready} disabled={!ready}>
          {isSignup ? 'Start my journey' : 'Sign in'}
        </Button>

        <noscript>
          <p className="rounded-lg border border-warning/25 bg-warning/[0.06] p-3 text-[12.5px] leading-relaxed text-warning">
            This form needs JavaScript. It is disabled rather than left working, because without it your password
            would be sent in a way that is not safe.
          </p>
        </noscript>
      </form>

      <p className="mt-6 text-center text-[13px] text-subtle">
        {isSignup ? 'Already have an account? ' : "Don't have an account? "}
        <Link href={isSignup ? '/login' : '/signup'} className="font-medium text-primary-ink hover:underline">
          {isSignup ? 'Sign in' : 'Create one'}
        </Link>
      </p>

      {!isSignup && (
        <div className="mt-8 rounded-xl border border-line bg-surface-2 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-subtle">Demo account</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            Sign in with <code className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[12px] text-accent">demo@aimlmastery.app</code>{' '}
            and password <code className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[12px] text-accent">demolearner2026</code>{' '}
            to explore a populated dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
