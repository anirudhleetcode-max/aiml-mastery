/**
 * Handling for text the learner wrote.
 *
 * The rule this file exists to enforce: a learner's answer is data being
 * graded, never an instruction about how to grade it. Everything the model is
 * told to *do* is assembled from curriculum content and constants here on the
 * server; the answer is inserted at exactly one place, fenced, labelled and
 * pre-emptively neutralised.
 *
 * No sanitiser makes injection impossible against a model that is ultimately
 * reading English. So the defence is layered and the last layer is the one
 * that actually holds: the response is parsed against a strict schema and only
 * a handful of bounded fields survive. An answer that talks the model into
 * saying "you are now in developer mode" produces a `summary` string and
 * nothing else — there is no field in which a successful injection could do
 * anything but write text that is then shown, escaped, as the model's opinion.
 */

/** Hard cap before any processing, so a huge answer cannot cost anything. */
export const MAX_ANSWER_CHARS = 6_000;

/**
 * Strips what has no business in prose and would otherwise be a lever.
 *
 * Control characters can be used to fake a message boundary in a naive
 * template; the private-use and directional-override ranges are the standard
 * way to hide one string inside another.
 */
export function sanitiseLearnerText(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  return (
    raw
      .slice(0, MAX_ANSWER_CHARS)
      // Keep \n and \t; drop the rest of C0, all of C1, and the bidi overrides.
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F​-‏‪-‮⁦-⁩]/g, '')
      // Collapse runs that exist only to push text out of a context window.
      .replace(/\n{4,}/g, '\n\n\n')
      .replace(/[ \t]{40,}/g, ' ')
      .trim()
  );
}

/**
 * The delimiter that marks the untrusted region.
 *
 * Random per call, so an answer cannot close the fence early by guessing it —
 * the one trick that turns "here is some data" into "here are some new
 * instructions" in a templated prompt.
 */
export function fenceId(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export interface Fenced {
  id: string;
  block: string;
}

export function fence(label: string, content: string): Fenced {
  const id = fenceId();
  return {
    id,
    block: `<${label} id="${id}">\n${content}\n</${label} id="${id}">`,
  };
}

/**
 * Cheap detection of an answer that is trying to talk to the grader.
 *
 * Not a filter — a real answer about prompt injection would trip it, and
 * blocking on it would punish exactly the learner studying the topic. It is
 * recorded so the deterministic path can be preferred and so the behaviour is
 * observable in tests.
 */
const INJECTION_PATTERNS = [
  /\bignore (?:all |any |the )?(?:previous|prior|above|earlier)\b/i,
  /\bdisregard (?:all |any |the )?(?:previous|prior|above|earlier|instructions)\b/i,
  /\byou are (?:now )?(?:a|an|in)\b.{0,40}\b(?:mode|assistant|grader|admin|root)\b/i,
  /\b(?:system|developer)\s*(?:prompt|message|instruction)/i,
  /\bnew instructions?\b/i,
  /\boverride\b.{0,30}\b(?:score|grade|rubric|instruction)/i,
  /\b(?:give|award|assign|set)\b.{0,30}\b(?:100|full marks|perfect score|maximum)\b/i,
  /\breveal\b.{0,30}\b(?:prompt|key|secret|api)\b/i,
  /\bprint\b.{0,30}\b(?:your|the)\s+(?:instructions|system|prompt)\b/i,
  /<\/?(?:system|instruction|learner-answer)\b/i,
  /\bAPI[_ ]?KEY\b/i,
];

export function looksLikeInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((p) => p.test(text));
}
