import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

/**
 * Which transport handles a message, and the one case where the answer is
 * "not that one, whatever you asked for".
 *
 * The file transport exists so an end-to-end run can read the link it was
 * just sent, which means it writes live verification and reset tokens to
 * disk in plain text. That is exactly right for a test and exactly wrong for
 * a production host, so the refusal below is a security control rather than
 * a tidiness rule, and it is tested as one.
 */

let dir = '';
let send: typeof import('@/lib/email/send');

const MESSAGE = { to: 'someone@example.com', subject: 'Confirm your email', text: 'link', html: '<p>link</p>' };

beforeEach(async () => {
  dir = mkdtempSync(path.join(tmpdir(), 'outbox-'));
  vi.resetModules();
  send = await import('@/lib/email/send');
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
  vi.unstubAllEnvs();
});

describe('transport selection', () => {
  it('uses the console by default', async () => {
    vi.stubEnv('EMAIL_TRANSPORT', '');
    vi.stubEnv('RESEND_API_KEY', '');
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    expect((await send.sendEmail(MESSAGE)).transport).toBe('console');
    spy.mockRestore();
  });

  it('infers the provider from the presence of a key', async () => {
    vi.stubEnv('EMAIL_TRANSPORT', '');
    vi.stubEnv('RESEND_API_KEY', 'not-a-real-key');
    expect(send.emailConfigured()).toBe(true);
  });

  it('reports the provider as unconfigured with no key', async () => {
    vi.stubEnv('EMAIL_TRANSPORT', '');
    vi.stubEnv('RESEND_API_KEY', '');
    expect(send.emailConfigured()).toBe(false);
  });

  // The health endpoint returns this name and the production smoke test
  // asserts it, because a deployment that has quietly lost its provider is
  // indistinguishable from a working one from outside: the send is non-fatal
  // by design, so signup still returns 200 either way.
  it('names the transport it will actually use', async () => {
    vi.stubEnv('EMAIL_TRANSPORT', '');
    vi.stubEnv('RESEND_API_KEY', 'not-a-real-key');
    expect(send.emailTransport()).toBe('resend');

    vi.stubEnv('RESEND_API_KEY', '');
    expect(send.emailTransport()).toBe('console');
  });

  it('never reports a transport outside the three it can run', async () => {
    vi.stubEnv('EMAIL_TRANSPORT', 'carrier-pigeon');
    vi.stubEnv('RESEND_API_KEY', '');
    expect(['console', 'resend', 'file']).toContain(send.emailTransport());
  });
});

describe('the file transport', () => {
  it('writes one JSON line per message and creates its directory', async () => {
    const target = path.join(dir, 'nested', 'outbox.jsonl');
    vi.stubEnv('EMAIL_TRANSPORT', 'file');
    vi.stubEnv('EMAIL_OUTBOX_PATH', target);

    expect((await send.sendEmail(MESSAGE)).ok).toBe(true);
    expect((await send.sendEmail({ ...MESSAGE, subject: 'Reset your password' })).ok).toBe(true);

    const lines = readFileSync(target, 'utf8').trim().split('\n');
    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0]).subject).toBe('Confirm your email');
    expect(JSON.parse(lines[1]).subject).toBe('Reset your password');
  });

  it('fails cleanly, without throwing, when no path is configured', async () => {
    vi.stubEnv('EMAIL_TRANSPORT', 'file');
    vi.stubEnv('EMAIL_OUTBOX_PATH', '');
    const result = await send.sendEmail(MESSAGE);
    expect(result.ok).toBe(false);
    expect(result.transport).toBe('file');
  });

  it('is refused in production no matter what the environment asks for', async () => {
    const target = path.join(dir, 'outbox.jsonl');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('EMAIL_TRANSPORT', 'file');
    vi.stubEnv('EMAIL_OUTBOX_PATH', target);
    vi.stubEnv('RESEND_API_KEY', '');

    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const result = await send.sendEmail(MESSAGE);
    spy.mockRestore();

    // Falls through to the console transport, and nothing reached the disk.
    expect(result.transport).toBe('console');
    expect(() => readFileSync(target, 'utf8')).toThrow();
  });
});

describe('links in messages', () => {
  it('builds them from configuration, never from a request header', async () => {
    vi.stubEnv('APP_URL', 'https://configured.example');
    expect(send.appUrl()).toBe('https://configured.example');
  });

  it('strips a trailing slash so a link never doubles it', async () => {
    vi.stubEnv('APP_URL', 'https://configured.example/');
    expect(send.appUrl()).toBe('https://configured.example');
  });
});
