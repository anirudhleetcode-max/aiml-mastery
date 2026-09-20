'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, CircleCheck, Eye, EyeOff, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';

type Status = 'ready' | 'done' | 'invalid' | 'expired' | 'used';

/** What the server can answer. 'reset' is success; the rest are the failures. */
type ServerStatus = 'reset' | 'weak' | 'invalid' | 'expired' | 'used';

/**
 * Completes a password reset.
 *
 * The token is read from the query string and posted in the request body,
 * never echoed back into the page. The three unhappy states are distinguished
 * because they need different advice — an expired link means request another,
 * a used one usually means the reset already worked — and each offers the one
 * action that resolves it.
 */
export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token') ?? '';

  const [status, setStatus] = React.useState<Status>('ready');
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [show, setShow] = React.useState(false);

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const password = String(form.get('password') ?? '');
    const confirm = String(form.get('confirm') ?? '');

    if (password !== confirm) {
      setError('The two passwords do not match.');
      setPending(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { status?: ServerStatus; error?: string };

      if (data.status === 'reset') {
        setStatus('done');
        // A reset revokes every session, so the next step is a deliberate
        // sign-in — which also proves the new password was typed correctly.
        setTimeout(() => router.push('/login'), 2200);
        return;
      }
      if (data.status === 'weak') {
        setError(data.error ?? 'Choose a longer password.');
        return;
      }
      if (data.status === 'expired' || data.status === 'used' || data.status === 'invalid') {
        setStatus(data.status);
        return;
      }
      setError(data.error ?? 'Something went wrong. Try again in a moment.');
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  if (!token) {
    return (
      <Outcome
        tone="warning"
        icon={<LinkIcon size={20} />}
        title="That link is incomplete"
        body="The address is missing its token. Copy the whole link from the email, or request a new one."
        action={{ href: '/forgot-password', label: 'Request a new link' }}
      />
    );
  }

  if (status === 'done') {
    return (
      <Outcome
        tone="success"
        icon={<CircleCheck size={20} />}
        title="Password changed"
        body="Every other device has been signed out. Taking you to sign in…"
        action={{ href: '/login', label: 'Sign in now' }}
      />
    );
  }

  if (status === 'expired') {
    return (
      <Outcome
        tone="warning"
        icon={<LinkIcon size={20} />}
        title="That link has expired"
        body="Reset links last an hour, deliberately — a live one is a credential. Request a fresh one and it will work."
        action={{ href: '/forgot-password', label: 'Send a new link' }}
      />
    );
  }

  if (status === 'used') {
    return (
      <Outcome
        tone="warning"
        icon={<LinkIcon size={20} />}
        title="That link has already been used"
        body="Each link works once. If you already set a new password, sign in with it. If not, request another."
        action={{ href: '/login', label: 'Go to sign in' }}
        secondary={{ href: '/forgot-password', label: 'Request another link' }}
      />
    );
  }

  if (status === 'invalid') {
    return (
      <Outcome
        tone="danger"
        icon={<AlertCircle size={20} />}
        title="That link is not valid"
        body="It may have been mistyped or truncated by your email client. Requesting a new one is the quickest fix."
        action={{ href: '/forgot-password', label: 'Send a new link' }}
      />
    );
  }

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-tight text-ink">Choose a new password</h1>
      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
        Length beats symbols. Ten characters minimum, and a passphrase you will actually remember beats anything you
        have to write down.
      </p>

      <form method="post" action="/api/auth/reset-password" onSubmit={onSubmit} className="mt-7 space-y-4">
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger/8 p-3 text-[13px] text-danger"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Field label="New password" htmlFor="password">
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={show ? 'text' : 'password'}
              autoComplete="new-password"
              required
              minLength={10}
              placeholder="At least 10 characters"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-subtle hover:text-ink"
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </Field>

        <Field label="Confirm new password" htmlFor="confirm">
          <Input
            id="confirm"
            name="confirm"
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            required
            minLength={10}
          />
        </Field>

        <Button type="submit" className="w-full" loading={pending} disabled={!hydrated}>
          Set the new password
        </Button>

        <p className="text-[12.5px] leading-relaxed text-subtle">
          Setting a new password signs out every other device, including any you have lost access to.
        </p>

        <noscript>
          <p className="text-[12.5px] text-warning">
            This form needs JavaScript so the token and password are sent in the request body rather than the URL.
          </p>
        </noscript>
      </form>
    </div>
  );
}

function Outcome({
  tone,
  icon,
  title,
  body,
  action,
  secondary,
}: {
  tone: 'success' | 'warning' | 'danger';
  icon: React.ReactNode;
  title: string;
  body: string;
  action: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  const tones = {
    success: 'bg-success/12 text-success',
    warning: 'bg-warning/12 text-warning',
    danger: 'bg-danger/12 text-danger',
  } as const;

  return (
    <div>
      <div className={`mb-5 grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}>{icon}</div>
      <h1 className="text-[26px] font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={action.href}
          className="rounded-lg bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-on-primary hover:bg-primary-soft"
        >
          {action.label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className="rounded-lg border border-line px-4 py-2.5 text-[13.5px] font-medium text-muted hover:text-ink"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
