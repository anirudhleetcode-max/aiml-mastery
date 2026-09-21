import 'server-only';

/**
 * The one place the application talks to a language model.
 *
 * Three properties matter more than the feature it enables.
 *
 * The key never leaves the server. This module is `server-only`, so importing
 * it from a client component is a build error rather than a leak discovered in
 * a bundle. There is no public counterpart and no `NEXT_PUBLIC_` variable.
 *
 * It is optional. With no key configured the provider reports itself
 * unavailable and every caller falls back to deterministic grading, which is
 * why an unconfigured deployment is a fully working product rather than a
 * broken one.
 *
 * And it is bounded: a timeout, a token cap, and a single attempt. A tutor
 * feature must never be able to hang a request or run up an unbounded bill,
 * so failure here is ordinary and returns a typed result instead of throwing.
 */

export type AiProviderName = 'none' | 'anthropic';

/** Small, fast, and sufficient for grading a short prose answer. */
const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';
const TIMEOUT_MS = 20_000;
const MAX_OUTPUT_TOKENS = 1024;

export function aiProvider(): AiProviderName {
  return process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'none';
}

export function aiAvailable(): boolean {
  return aiProvider() !== 'none';
}

export interface CompletionRequest {
  /** Trusted instructions. Never contains learner text. */
  system: string;
  /** The turn content. Learner text lives here, inside delimiters. */
  user: string;
  /**
   * Seeds the assistant's reply so the model continues a JSON object rather
   * than opening with prose about one.
   */
  prefill?: string;
  maxTokens?: number;
}

export type CompletionResult =
  | { ok: true; text: string; model: string }
  | { ok: false; reason: 'unavailable' | 'timeout' | 'rate-limited' | 'error' };

export async function complete(request: CompletionRequest): Promise<CompletionResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { ok: false, reason: 'unavailable' };

  const model = process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL;
  const messages: { role: 'user' | 'assistant'; content: string }[] = [
    { role: 'user', content: request.user },
  ];
  if (request.prefill) messages.push({ role: 'assistant', content: request.prefill });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: request.maxTokens ?? MAX_OUTPUT_TOKENS,
        // Grading should be as reproducible as a sampled model allows, so the
        // same answer does not swing between verdicts on a re-run.
        temperature: 0,
        system: request.system,
        messages,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    });

    if (res.status === 429) return { ok: false, reason: 'rate-limited' };
    if (!res.ok) {
      // The status is diagnostic; the body can echo request content, so it
      // stays out of the log.
      console.error(`[ai] provider responded ${res.status}`);
      return { ok: false, reason: 'error' };
    }

    const body = (await res.json()) as { content?: { type?: string; text?: string }[] };
    const text = (body.content ?? [])
      .filter((part) => part?.type === 'text' && typeof part.text === 'string')
      .map((part) => part.text as string)
      .join('');

    if (!text.trim()) return { ok: false, reason: 'error' };
    return { ok: true, text, model };
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      return { ok: false, reason: 'timeout' };
    }
    console.error('[ai] request failed:', error instanceof Error ? error.name : 'unknown error');
    return { ok: false, reason: 'error' };
  }
}
