'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, CircleCheck, Loader2, MailCheck } from 'lucide-react';

type Status = 'checking' | 'verified' | 'already' | 'expired' | 'used' | 'invalid' | 'error';

/**
 * Spends a verification token from an email link.
 *
 * The exchange happens on mount rather than behind a button: the learner
 * already expressed intent by clicking the link, and an extra click before
 * anything happens reads as a broken page. It posts rather than putting the
 * token in a GET so the token never lands in a referrer header, and the
 * result is a single unambiguous state.
 */
export function VerifyEmailView() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const [status, setStatus] = React.useState<Status>(token ? 'checking' : 'invalid');

  React.useEffect(() => {
    if (!token) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = (await res.json()) as { status?: string };
        if (cancelled) return;

        switch (data.status) {
          case 'verified':
            setStatus('verified');
            break;
          case 'used':
            // Clicking the link twice is the usual cause, and the honest
            // reading is that the address is confirmed.
            setStatus('already');
            break;
          case 'expired':
            setStatus('expired');
            break;
          case 'invalid':
            setStatus('invalid');
            break;
          default:
            setStatus('error');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === 'checking') {
    return (
      <div>
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-surface-3 text-subtle">
          <Loader2 size={20} className="animate-spin" />
        </div>
        <h1 className="text-[26px] font-semibold tracking-tight text-ink">Confirming your email…</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-muted">This takes a second.</p>
      </div>
    );
  }

  const views: Record<Exclude<Status, 'checking'>, {
    tone: 'success' | 'warning' | 'danger';
    icon: React.ReactNode;
    title: string;
    body: string;
    action: { href: string; label: string };
  }> = {
    verified: {
      tone: 'success',
      icon: <CircleCheck size={20} />,
      title: 'Email confirmed',
      body: 'Your address is verified. Password resets and reminders will reach you.',
      action: { href: '/dashboard', label: 'Go to your dashboard' },
    },
    already: {
      tone: 'success',
      icon: <MailCheck size={20} />,
      title: 'Already confirmed',
      body: 'This address was verified previously — the link works once, so nothing more is needed.',
      action: { href: '/dashboard', label: 'Go to your dashboard' },
    },
    expired: {
      tone: 'warning',
      icon: <AlertCircle size={20} />,
      title: 'That link has expired',
      body: 'Verification links last 24 hours. Sign in and use the banner at the top to send a fresh one.',
      action: { href: '/login', label: 'Sign in to resend' },
    },
    used: {
      tone: 'success',
      icon: <MailCheck size={20} />,
      title: 'Already confirmed',
      body: 'This link has already been used, which means the address is verified.',
      action: { href: '/dashboard', label: 'Go to your dashboard' },
    },
    invalid: {
      tone: 'danger',
      icon: <AlertCircle size={20} />,
      title: 'That link is not valid',
      body: 'It may have been truncated by your email client. Sign in and resend from the banner at the top.',
      action: { href: '/login', label: 'Sign in to resend' },
    },
    error: {
      tone: 'danger',
      icon: <AlertCircle size={20} />,
      title: 'Something went wrong',
      body: 'We could not confirm the address just now. Try the link again in a moment.',
      action: { href: '/login', label: 'Go to sign in' },
    },
  };

  const v = views[status];
  const tones = {
    success: 'bg-success/12 text-success',
    warning: 'bg-warning/12 text-warning',
    danger: 'bg-danger/12 text-danger',
  } as const;

  return (
    <div>
      <div className={`mb-5 grid h-11 w-11 place-items-center rounded-xl ${tones[v.tone]}`}>{v.icon}</div>
      <h1 className="text-[26px] font-semibold tracking-tight text-ink">{v.title}</h1>
      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{v.body}</p>
      <Link
        href={v.action.href}
        className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-on-primary hover:bg-primary-soft"
      >
        {v.action.label}
      </Link>
    </div>
  );
}
