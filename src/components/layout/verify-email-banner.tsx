'use client';

import * as React from 'react';
import { MailWarning } from 'lucide-react';

type State = 'idle' | 'sending' | 'sent' | 'already' | 'limited' | 'error';

/**
 * Standing reminder for a signed-in learner whose address is not confirmed.
 *
 * The product deliberately does *not* lock an unverified account out of the
 * app. Learning is the point, the address is only needed to reach someone
 * later, and a hard gate in front of a study tool turns a delivery problem
 * into lost progress. So verification is a persistent, dismissible-per-session
 * nudge with the resend action attached, not a wall.
 */
export function VerifyEmailBanner({ email }: { email: string }) {
  const [state, setState] = React.useState<State>('idle');
  const [hidden, setHidden] = React.useState(false);

  if (hidden || state === 'already') return null;

  async function resend() {
    setState('sending');
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      if (res.status === 429) return setState('limited');
      if (!res.ok) return setState('error');
      const data = (await res.json()) as { status?: string };
      setState(data.status === 'already-verified' ? 'already' : 'sent');
    } catch {
      setState('error');
    }
  }

  const message: Record<State, string> = {
    idle: `Confirm ${email} so we can reach you about your account.`,
    sending: 'Sending…',
    sent: 'Link sent. Check your inbox — and your spam folder.',
    already: '',
    limited: 'A link went out recently. Check your inbox, then try again in a few minutes.',
    error: 'That did not send. Try again in a moment.',
  };

  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-warning/25 bg-warning/[0.08] px-4 py-2.5 text-[13px] text-ink sm:px-6 lg:px-8"
    >
      <MailWarning aria-hidden className="size-4 shrink-0 text-warning" />
      <p className="min-w-0 flex-1">{message[state]}</p>
      {state !== 'sent' && (
        <button
          type="button"
          onClick={resend}
          disabled={state === 'sending'}
          className="rounded-md border border-line bg-surface px-2.5 py-1 font-medium text-ink transition-colors hover:bg-surface-2 disabled:opacity-60"
        >
          Resend verification email
        </button>
      )}
      <button
        type="button"
        onClick={() => setHidden(true)}
        className="rounded-md px-2 py-1 text-subtle transition-colors hover:text-ink"
      >
        Dismiss
      </button>
    </div>
  );
}
