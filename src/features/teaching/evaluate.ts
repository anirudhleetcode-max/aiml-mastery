import type { LearningUnit } from '@/types/curriculum';

/**
 * Teacher Mode evaluation.
 *
 * The goal of this platform is that the learner can *explain* the idea, so
 * feedback here has to be specific. It is built from the unit's own
 * `teachingPrompt.mustCover` points, which means it can always say exactly
 * what was covered and what was missing — never a bare "correct".
 *
 * This is transparent keyword-and-structure analysis, not a claim to
 * understand prose. The UI says so, and always shows the reference
 * explanation alongside the feedback so the learner can judge for themselves.
 */

export interface TeachingEvaluation {
  score: number; // 0–1 overall
  dimensions: {
    coverage: number;
    clarity: number;
    depth: number;
    examples: number;
    terminology: number;
  };
  covered: string[];
  missing: string[];
  strengths: string[];
  improvements: string[];
  verdict: string;
  wordCount: number;
}

const FILLER = /\b(um|uh|like|basically|literally|obviously|just|really|very|stuff|things?)\b/gi;
const HEDGE = /\b(i think|maybe|sort of|kind of|i guess|probably|not sure)\b/gi;
const EXAMPLE_MARKERS =
  /\b(for example|for instance|such as|imagine|suppose|say you|picture|consider|e\.g\.|like when|think of)\b/i;
const CAUSAL_MARKERS = /\b(because|since|so that|which means|therefore|this is why|the reason|as a result|in order to)\b/i;

const normalise = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

function keywordsOf(phrase: string): string[] {
  const stop = new Set([
    'the','a','an','and','or','of','to','in','is','it','that','this','with','for','on','as','by','be','are',
    'was','mentions','says','explains','states','describes','notes','uses','gives','includes','can','you','your',
    'what','why','how','when','which','their','they','them','from','into','than','more','most','some','each',
    'does','not','its','only','also','one','two','three','over','under','between',
  ]);
  return normalise(phrase)
    .split(/[^a-z0-9+-]+/)
    .filter((w) => w.length > 3 && !stop.has(w));
}

export function evaluateTeaching(unit: LearningUnit, text: string): TeachingEvaluation {
  const body = normalise(text);
  const words = body ? body.split(/\s+/) : [];
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 2);

  if (wordCount < 20) {
    return {
      score: 0,
      dimensions: { coverage: 0, clarity: 0, depth: 0, examples: 0, terminology: 0 },
      covered: [],
      missing: unit.teachingPrompt.mustCover,
      strengths: [],
      improvements: [
        'This is too short to evaluate. Aim for at least a short paragraph — roughly 60 to 200 words.',
        'Start by answering "what is it?" in one sentence, then "why does it exist?".',
      ],
      verdict: 'Not enough to work with yet. Teaching something is harder than recognising it, which is exactly the point.',
      wordCount,
    };
  }

  /* Coverage — the substance of the score. */
  const covered: string[] = [];
  const missing: string[] = [];
  for (const point of unit.teachingPrompt.mustCover) {
    const keys = keywordsOf(point);
    if (keys.length === 0) continue;
    const hits = keys.filter((k) => body.includes(k)).length;
    if (hits / keys.length >= 0.34) covered.push(point);
    else missing.push(point);
  }
  const coverage = unit.teachingPrompt.mustCover.length
    ? covered.length / unit.teachingPrompt.mustCover.length
    : 0;

  /* Terminology — did they use the unit's own vocabulary correctly? */
  const termHits = unit.terminology.filter((t) => body.includes(normalise(t.term))).length;
  const terminology = unit.terminology.length ? Math.min(1, termHits / Math.min(3, unit.terminology.length)) : 0;

  /* Examples — a real teacher grounds the idea. */
  const bonusHits = (unit.teachingPrompt.bonusSignals ?? []).filter((s) =>
    keywordsOf(s).some((k) => body.includes(k)),
  ).length;
  const examples = Math.min(1, (EXAMPLE_MARKERS.test(text) ? 0.7 : 0) + bonusHits * 0.15);

  /* Depth — explanation, not recitation. */
  const causal = CAUSAL_MARKERS.test(text) ? 0.5 : 0;
  const lengthDepth = Math.min(0.5, wordCount / 320);
  const depth = Math.min(1, causal + lengthDepth);

  /* Clarity — short sentences, few fillers, low hedging. */
  const avgSentence = sentences.length ? wordCount / sentences.length : wordCount;
  const sentencePenalty = avgSentence > 34 ? 0.35 : avgSentence > 26 ? 0.15 : 0;
  const fillerPenalty = Math.min(0.3, ((text.match(FILLER)?.length ?? 0) / Math.max(1, wordCount)) * 12);
  const hedgePenalty = Math.min(0.2, (text.match(HEDGE)?.length ?? 0) * 0.07);
  const clarity = Math.max(0, 1 - sentencePenalty - fillerPenalty - hedgePenalty);

  const dimensions = { coverage, clarity, depth, examples, terminology };

  // Coverage dominates: an explanation that misses the point is not rescued by
  // being well written.
  const score =
    coverage * 0.5 + clarity * 0.14 + depth * 0.16 + examples * 0.1 + terminology * 0.1;

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (coverage >= 0.8) strengths.push('You covered nearly everything that matters about this concept.');
  if (clarity >= 0.85) strengths.push('Your sentences are short and direct — that is genuinely hard to do.');
  if (examples >= 0.6) strengths.push('You grounded the idea in a concrete example rather than staying abstract.');
  if (depth >= 0.6) strengths.push('You explained *why*, not just *what*.');
  if (terminology >= 0.7) strengths.push('You used the proper vocabulary alongside the plain-language version.');

  if (missing.length > 0) {
    improvements.push(
      `You did not touch on: ${missing.join('; ')}. A listener would walk away without ${
        missing.length === 1 ? 'that piece' : 'those pieces'
      }.`,
    );
  }
  if (!EXAMPLE_MARKERS.test(text)) {
    improvements.push('Add one concrete example. "For instance…" is the fastest way to make an abstract idea land.');
  }
  if (!CAUSAL_MARKERS.test(text)) {
    improvements.push('Say *why* at least once. "Because…" is the difference between explaining and reciting.');
  }
  if (avgSentence > 30) {
    improvements.push(`Your sentences average ${Math.round(avgSentence)} words. Cut them roughly in half.`);
  }
  if (terminology < 0.4) {
    improvements.push(
      `Introduce the real terms too — ${unit.terminology.slice(0, 2).map((t) => `"${t.term}"`).join(' and ')} — ` +
        'after you have explained the idea simply. A good teacher gives both.',
    );
  }
  if (wordCount > 450) {
    improvements.push('This is long. A nine-year-old stops listening; tighten it to the core idea plus one example.');
  }

  const verdict =
    score >= 0.85
      ? 'You could teach this. Clear, covered and grounded — this is the standard to hold everywhere else.'
      : score >= 0.7
        ? 'A good explanation with a gap or two. Close those and you are at teaching standard.'
        : score >= 0.5
          ? 'You understand the shape of it, but a listener would still be missing pieces. Work the gaps below and try again.'
          : 'This reads as recall rather than understanding. Re-read the analogy and the visual, then explain it again without looking.';

  return {
    score: Math.max(0, Math.min(1, score)),
    dimensions,
    covered,
    missing,
    strengths,
    improvements,
    verdict,
    wordCount,
  };
}
