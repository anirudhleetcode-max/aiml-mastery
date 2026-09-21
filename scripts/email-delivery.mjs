#!/usr/bin/env node
/**
 * Real-delivery verification for the transactional email path.
 *
 * The production smoke test signs up an `@example.com` address. RFC 2606
 * reserves that domain and no mail server accepts mail for it, which is
 * exactly right for a check that runs on every deploy — it must never send
 * real mail to a real person — but it means no number of passing smoke runs
 * is evidence that anything is delivered. A 2xx from Resend means the message
 * was accepted for delivery. It does not mean it arrived.
 *
 * This closes that gap, in three stages that are deliberately reported
 * separately because they are different claims:
 *
 *   accepted   the provider took the message and returned an id
 *   delivered  the provider observed the receiving mail server accept it
 *   received   the message was read out of an actual mailbox over IMAP,
 *              its link extracted, and the link exercised
 *
 * Only the third is inbox receipt. The first two are the provider's own
 * account of what happened and are reported as such.
 *
 * Stages 1 and 2 need RESEND_API_KEY and a recipient. Stage 3 additionally
 * needs IMAP credentials for that recipient's mailbox; without them it reports
 * BLOCKED rather than passing quietly, because a check that goes quiet when
 * it cannot run is worse than one that is absent.
 *
 * Nothing here prints a credential, a token or a message body. Links are
 * printed with their token masked.
 *
 * Usage:
 *   node scripts/email-delivery.mjs --to you@example.net [--base-url https://…]
 *
 * Environment:
 *   RESEND_API_KEY   required
 *   EMAIL_FROM       the sender identity to test; defaults to the app's default
 *   IMAP_HOST        optional — enables stage 3
 *   IMAP_PORT        optional, default 993
 *   IMAP_USER        optional — defaults to --to
 *   IMAP_PASSWORD    optional
 */

import tls from 'node:tls';

const args = process.argv.slice(2);
function arg(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
}

const TO = arg('to');
const BASE_URL = (arg('base-url', 'https://aiml-mastery.vercel.app') || '').replace(/\/+$/, '');
const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || 'AI/ML Mastery <onboarding@resend.dev>';

if (!TO) {
  console.error('Usage: node scripts/email-delivery.mjs --to <address> [--base-url <url>]');
  process.exit(2);
}
if (!KEY) {
  console.error('RESEND_API_KEY is not set. Nothing can be verified without it.');
  process.exit(2);
}

/** Masks the token in a URL so a live link never lands in a log. */
const maskLink = (s) => String(s).replace(/(token=)[A-Za-z0-9_-]+/g, '$1REDACTED');
/** Shows an address as `a…z@domain`, enough to correlate, not enough to harvest. */
function maskAddress(address) {
  const [local, domain] = String(address).split('@');
  if (!domain) return '***';
  const head = local.slice(0, 1);
  const tail = local.length > 1 ? local.slice(-1) : '';
  return `${head}…${tail}@${domain}`;
}

const results = [];
function record(stage, status, detail) {
  results.push({ stage, status, detail });
  const mark = status === 'PASS' ? 'PASS' : status === 'BLOCKED' ? 'BLOCKED' : 'FAIL';
  console.log(`  ${mark}  ${stage} — ${detail}`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ───────────────────────────── Resend ─────────────────────────────

async function resend(path, init = {}) {
  const res = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(20_000),
  });
  const body = await res.json().catch(() => null);
  return { status: res.status, body };
}

/**
 * Polls a message's status until the provider reports something terminal.
 *
 * `last_event` walks queued → sent → delivered, or lands on bounced,
 * complained or delivery_delayed. Anything other than `delivered` is reported
 * as it is; a delivery that is merely still in flight is not a delivery.
 */
async function awaitDeliveryEvent(id, timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;
  let last = 'unknown';
  while (Date.now() < deadline) {
    const { status, body } = await resend(`/emails/${id}`);
    if (status !== 200) return { event: `status-lookup-returned-${status}`, terminal: false };
    last = body?.last_event ?? 'unknown';
    if (last === 'delivered' || last === 'bounced' || last === 'complained') {
      return { event: last, terminal: true };
    }
    await sleep(5_000);
  }
  return { event: last, terminal: false };
}

// ───────────────────────────── IMAP ─────────────────────────────
//
// A deliberately small IMAP client. The protocol needed here is four commands
// over a TLS socket, and a dependency that exists to wrap four commands is a
// dependency that can break a verification job for reasons unrelated to what
// it verifies.

function imapConnect({ host, port, user, password }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host }, () => {});
    socket.setEncoding('utf8');
    let buffer = '';
    let counter = 0;
    const waiters = [];

    socket.on('data', (chunk) => {
      buffer += chunk;
      for (const waiter of [...waiters]) {
        const done = new RegExp(`^${waiter.tag} (OK|NO|BAD)[^\\r\\n]*`, 'm').exec(buffer);
        if (!done) continue;
        const payload = buffer;
        buffer = '';
        waiters.splice(waiters.indexOf(waiter), 1);
        if (done[1] === 'OK') waiter.resolve(payload);
        else waiter.reject(new Error(`IMAP ${done[1]}`));
      }
    });
    socket.on('error', reject);
    socket.setTimeout(45_000, () => {
      socket.destroy();
      reject(new Error('IMAP timeout'));
    });

    const send = (command) =>
      new Promise((res, rej) => {
        const tag = `a${++counter}`;
        waiters.push({ tag, resolve: res, reject: rej });
        socket.write(`${tag} ${command}\r\n`);
      });

    // The greeting arrives untagged; give it a moment, then log in.
    setTimeout(async () => {
      try {
        buffer = '';
        await send(`LOGIN "${user}" "${password}"`);
        resolve({ send, close: () => socket.end() });
      } catch (err) {
        socket.destroy();
        reject(err);
      }
    }, 800);
  });
}

/**
 * Looks in the mailbox for a message sent to this run's address, and returns
 * its body. Checks the Junk folder too: a message filtered as spam did arrive,
 * and saying so is more useful than reporting nothing arrived.
 */
async function findMessage({ host, port, user, password }, subjectFragment, attempts = 12) {
  const session = await imapConnect({ host, port, user, password });
  try {
    for (let i = 0; i < attempts; i++) {
      for (const box of ['INBOX', 'Junk', 'Spam', '[Gmail]/Spam']) {
        let selected;
        try {
          selected = await session.send(`SELECT "${box}"`);
        } catch {
          continue; // Folder does not exist on this server.
        }
        if (!selected) continue;
        let found;
        try {
          found = await session.send(`SEARCH SUBJECT "${subjectFragment}"`);
        } catch {
          continue;
        }
        const ids = (/^\* SEARCH([0-9 ]*)/m.exec(found)?.[1] ?? '').trim().split(/\s+/).filter(Boolean);
        if (ids.length === 0) continue;
        const newest = ids[ids.length - 1];
        const body = await session.send(`FETCH ${newest} (BODY.PEEK[TEXT])`);
        return { box, body };
      }
      await sleep(10_000);
    }
    return null;
  } finally {
    try {
      session.close();
    } catch {
      /* the socket is being closed either way */
    }
  }
}

// ───────────────────────────── stages ─────────────────────────────

console.log(`\nEmail delivery verification`);
console.log(`  recipient: ${maskAddress(TO)}`);
console.log(`  sender:    ${FROM.replace(/<.*>/, (m) => m)}`);
console.log(`  target:    ${BASE_URL}\n`);

let failed = 0;

// Stage 1 — the provider accepts a message from this sender identity.
const probeSubject = `Delivery probe ${Date.now()}`;
let probeId = null;
{
  const { status, body } = await resend('/emails', {
    method: 'POST',
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: probeSubject,
      text: 'Automated delivery verification for aiml-mastery. No action is needed.',
    }),
  });
  if (status >= 200 && status < 300 && body?.id) {
    probeId = body.id;
    record('provider accepts a send from the configured sender', 'PASS', `id ${body.id}`);
  } else {
    // The provider's own message is the useful part and contains no secret:
    // "domain is not verified" and "you can only send to your own address"
    // are the two answers that actually explain a production mail failure.
    record(
      'provider accepts a send from the configured sender',
      'FAIL',
      `HTTP ${status}${body?.message ? ` — ${body.message}` : ''}`,
    );
    failed++;
  }
}

// Stage 2 — the provider reports the receiving server accepted it.
if (probeId) {
  const { event, terminal } = await awaitDeliveryEvent(probeId);
  if (event === 'delivered') {
    record('provider reports the message delivered', 'PASS', `last_event "${event}"`);
  } else if (terminal) {
    record('provider reports the message delivered', 'FAIL', `last_event "${event}"`);
    failed++;
  } else {
    record('provider reports the message delivered', 'BLOCKED', `still "${event}" after the polling window`);
  }
}

// Stage 3 — the application's own send path, through the deployed site.
//
// A reset is only sent for an address that has an account, so the account is
// made first. An address that already has one answers 409 and that is a
// success for this purpose: the account exists, which is all the next step
// needs.
let resetRequested = false;
{
  const signup = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: BASE_URL },
    body: JSON.stringify({
      name: 'Delivery Verification',
      email: TO,
      password: process.env.DELIVERY_PROBE_PASSWORD || `probe-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }),
  }).catch(() => ({ status: 0 }));

  if (signup.status === 200) {
    record('the deployed application creates an account for this address', 'PASS', 'HTTP 200 — verification email sent');
  } else if (signup.status === 409) {
    record('the deployed application already has an account for this address', 'PASS', 'HTTP 409 — reusing it');
  } else {
    record('the deployed application creates an account for this address', 'FAIL', `HTTP ${signup.status}`);
    failed++;
  }

  if (signup.status === 200 || signup.status === 409) {
    const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: BASE_URL },
      body: JSON.stringify({ email: TO }),
    }).catch(() => ({ status: 0 }));
    if (res.status === 200) {
      resetRequested = true;
      record('the deployed application accepts a reset request for this address', 'PASS', 'HTTP 200');
    } else {
      record('the deployed application accepts a reset request for this address', 'FAIL', `HTTP ${res.status}`);
      failed++;
    }
  }
}

// Stage 4 — actual receipt, which is the only stage that is inbox evidence.
const imap = {
  host: process.env.IMAP_HOST,
  port: Number(process.env.IMAP_PORT ?? 993),
  user: process.env.IMAP_USER || TO,
  password: process.env.IMAP_PASSWORD,
};

if (!imap.host || !imap.password) {
  record(
    'the message is observed in an actual mailbox',
    'BLOCKED',
    'IMAP_HOST / IMAP_PASSWORD are not configured, so no mailbox can be read from here',
  );
  console.log(
    '\n  Inbox receipt is NOT verified by this run. Provider acceptance and the\n' +
      '  provider\'s own delivery event are not the same claim and are not recorded\n' +
      '  as one. See docs/PRODUCTION_VERIFICATION.md for the procedure that closes\n' +
      '  this, either by configuring a mailbox for this job or by hand.\n',
  );
} else {
  const found = await findMessage(imap, probeSubject);
  if (found) {
    record('the probe message is observed in an actual mailbox', 'PASS', `found in ${found.box}`);
  } else {
    record('the probe message is observed in an actual mailbox', 'FAIL', 'not found within the polling window');
    failed++;
  }

  const verification = await findMessage(imap, 'Confirm your email');
  if (verification) {
    record('the verification email is observed in an actual mailbox', 'PASS', `found in ${verification.box}`);
    const link = /https?:\/\/[^\s"'<>]*\/verify-email\?token=[A-Za-z0-9_-]+/.exec(
      verification.body.replace(/=\r?\n/g, ''),
    )?.[0];
    if (!link) {
      record('the verification email contains a usable link', 'FAIL', 'no link found in the body');
      failed++;
    } else {
      console.log(`        link: ${maskLink(link)}`);
      const page = await fetch(link, { redirect: 'manual' }).catch(() => ({ status: 0 }));
      if (page.status === 200 || page.status === 307) {
        record('the verification link is accepted by the deployment', 'PASS', `HTTP ${page.status}`);
      } else {
        record('the verification link is accepted by the deployment', 'FAIL', `HTTP ${page.status}`);
        failed++;
      }
    }
  } else {
    record('the verification email is observed in an actual mailbox', 'FAIL', 'not found within the polling window');
    failed++;
  }

  if (resetRequested) {
    const mail = await findMessage(imap, 'Reset your password');
    if (!mail) {
      record('the application\'s reset email is observed in an actual mailbox', 'FAIL', 'not found');
      failed++;
    } else {
      record('the application\'s reset email is observed in an actual mailbox', 'PASS', `found in ${mail.box}`);
      const link = /https?:\/\/[^\s"'<>]*\/reset-password\?token=[A-Za-z0-9_-]+/.exec(
        mail.body.replace(/=\r?\n/g, ''),
      )?.[0];
      if (!link) {
        record('the received message contains a usable reset link', 'FAIL', 'no link found in the body');
        failed++;
      } else {
        console.log(`        link: ${maskLink(link)}`);
        const page = await fetch(link, { redirect: 'manual' }).catch(() => ({ status: 0 }));
        if (page.status === 200) {
          record('the received link opens the reset form', 'PASS', 'HTTP 200');
        } else {
          record('the received link opens the reset form', 'FAIL', `HTTP ${page.status}`);
          failed++;
        }
      }
    }
  }
}

const blocked = results.filter((r) => r.status === 'BLOCKED').length;
const passed = results.filter((r) => r.status === 'PASS').length;
console.log(`\n  ${passed} passed, ${failed} failed, ${blocked} blocked.\n`);
process.exit(failed > 0 ? 1 : 0);
