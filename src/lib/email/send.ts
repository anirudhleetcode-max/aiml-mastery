import 'server-only';
import { appendFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

/**
 * Transactional email.
 *
 * Two transports, chosen by environment rather than by code:
 *
 *   console  — the development default. Prints the message, including the
 *              link, to the server log. No credential, no network, and the
 *              whole verification and reset flow is exercisable locally.
 *   resend   — production. One authenticated POST, implemented with `fetch`
 *              rather than an SDK: the SDK wraps exactly this call, and a
 *              dependency that adds nothing is a dependency that can break.
 *
 * Adding another provider means implementing one function and adding a case.
 * The rest of the application only ever sees `sendEmail`.
 *
 * `server-only` is imported at the top so that a component accidentally
 * importing this fails the build rather than shipping an API key to a browser.
 */

export type EmailTransport = 'console' | 'resend' | 'file';

export interface EmailMessage {
  to: string;
  subject: string;
  /** Plain text. Every message here is readable without HTML by design. */
  text: string;
  html: string;
}

export interface SendResult {
  ok: boolean;
  transport: EmailTransport;
  /** Provider message id, where the provider returns one. */
  id?: string;
  /** Set when the send failed. Never contains the message body or a token. */
  error?: string;
}

function transport(): EmailTransport {
  const explicit = process.env.EMAIL_TRANSPORT?.toLowerCase();
  if (explicit === 'resend' || explicit === 'console') return explicit;
  // The file transport writes live tokens to disk, which is right for a test
  // run reading its own inbox and wrong everywhere else — so it is refused in
  // a production build regardless of what the environment asks for.
  if (explicit === 'file' && process.env.NODE_ENV !== 'production') return 'file';
  // Infer rather than fail: a key present means somebody configured a
  // provider, and its absence in development should not break signup.
  return process.env.RESEND_API_KEY ? 'resend' : 'console';
}

export function emailFrom(): string {
  return process.env.EMAIL_FROM ?? 'AI/ML Mastery <onboarding@resend.dev>';
}

/**
 * The origin used to build links in emails.
 *
 * Deliberately read from configuration rather than from the request, because
 * a link built from an attacker-controlled Host header is a redirect to the
 * attacker with a live token attached.
 */
export function appUrl(): string {
  const raw = process.env.APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return raw.replace(/\/+$/, '');
}

async function sendViaResend(message: EmailMessage): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, transport: 'resend', error: 'RESEND_API_KEY is not set' };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: emailFrom(),
        to: [message.to],
        subject: message.subject,
        text: message.text,
        html: message.html,
      }),
      // A hung provider must not hold an HTTP handler open indefinitely.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      // The provider's body can echo the request; log the status only.
      return { ok: false, transport: 'resend', error: `provider responded ${res.status}` };
    }
    const body = (await res.json().catch(() => null)) as { id?: string } | null;
    return { ok: true, transport: 'resend', id: body?.id };
  } catch (err) {
    return {
      ok: false,
      transport: 'resend',
      error: err instanceof Error ? err.name : 'send failed',
    };
  }
}

/**
 * Appends the message to a JSONL file, for a test that needs to read the link
 * it was just sent. The equivalent of running a local mail catcher, without
 * the process.
 */
function sendViaFile(message: EmailMessage): SendResult {
  const target = process.env.EMAIL_OUTBOX_PATH;
  if (!target) return { ok: false, transport: 'file', error: 'EMAIL_OUTBOX_PATH is not set' };
  try {
    mkdirSync(dirname(target), { recursive: true });
    appendFileSync(target, `${JSON.stringify({ ...message, at: new Date().toISOString() })}\n`, 'utf8');
    return { ok: true, transport: 'file' };
  } catch (error) {
    return { ok: false, transport: 'file', error: error instanceof Error ? error.name : 'write failed' };
  }
}

function sendViaConsole(message: EmailMessage): SendResult {
  console.info(
    [
      '',
      '──────────────────────────────────────────────────────────────',
      ' EMAIL (console transport — set RESEND_API_KEY to send for real)',
      `   to:      ${message.to}`,
      `   subject: ${message.subject}`,
      '',
      message.text,
      '──────────────────────────────────────────────────────────────',
      '',
    ].join('\n'),
  );
  return { ok: true, transport: 'console' };
}

/**
 * Sends a message, never throwing.
 *
 * Callers treat a failed send as a non-event on purpose: a signup that 500s
 * because an email provider is having a bad minute is worse than a signup
 * that succeeds with a resend link available. The result is returned so a
 * caller can log it.
 */
export async function sendEmail(message: EmailMessage): Promise<SendResult> {
  const t = transport();
  if (t === 'resend') return sendViaResend(message);
  if (t === 'file') return sendViaFile(message);
  return sendViaConsole(message);
}

/** True when a real provider is configured, for surfacing in diagnostics. */
export function emailConfigured(): boolean {
  return transport() !== 'console';
}
