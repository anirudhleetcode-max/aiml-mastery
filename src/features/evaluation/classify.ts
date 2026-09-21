/**
 * What kind of question is this?
 *
 * Classification comes first because it decides how much of the grading can
 * be done without a model at all. "What does `len()` return for a dict?" has
 * a checkable answer; "How would you design a feature store?" does not. Asking
 * a language model to grade the first is slower, costlier and less reliable
 * than checking it, and treating the second as a keyword match would be a lie
 * dressed as a score.
 *
 * The classifier is deterministic and runs on the server against curriculum
 * text only — never against the learner's answer, which must not be able to
 * influence how it is graded.
 */

export type QuestionKind =
  | 'conceptual'
  | 'coding'
  | 'mathematical'
  | 'system-design'
  | 'behavioral'
  | 'ml-theory'
  | 'sql-data'
  | 'debugging'
  | 'explanation';

export const KIND_LABELS: Record<QuestionKind, string> = {
  conceptual: 'Conceptual',
  coding: 'Coding',
  mathematical: 'Mathematical',
  'system-design': 'System design',
  behavioral: 'Behavioural',
  'ml-theory': 'ML/AI theory',
  'sql-data': 'SQL / data',
  debugging: 'Debugging',
  explanation: 'Explanation',
};

/**
 * How much of the verdict a machine can settle on its own.
 *
 * `high` means concept coverage is close to the whole story — the reference
 * answer names specific things and an answer either names them or does not.
 * `low` means the interesting part is the reasoning between the terms, which
 * is where a model earns its place.
 */
export type DeterministicConfidence = 'high' | 'medium' | 'low';

export const KIND_CONFIDENCE: Record<QuestionKind, DeterministicConfidence> = {
  conceptual: 'medium',
  coding: 'medium',
  mathematical: 'high',
  'system-design': 'low',
  behavioral: 'low',
  'ml-theory': 'medium',
  'sql-data': 'high',
  debugging: 'medium',
  explanation: 'low',
};

interface Rule {
  kind: QuestionKind;
  /** Higher wins when several rules match. */
  weight: number;
  patterns: RegExp[];
}

/**
 * Ordered by how specific the evidence is. A question mentioning "design a
 * system that scales" is a design question even though it also says "explain",
 * so the narrower signals carry more weight than the broad ones.
 */
const RULES: Rule[] = [
  {
    kind: 'behavioral',
    weight: 60,
    patterns: [
      /\btell me about a time\b/i,
      /\bdescribe a (?:time|situation|project) (?:when|where|you)\b/i,
      /\bhow (?:do|would) you (?:handle|deal with|approach) (?:a )?(?:disagree|conflict|deadline|stakeholder|teammate)/i,
      /\bwalk me through (?:a|your) (?:project|experience)\b/i,
    ],
  },
  {
    kind: 'sql-data',
    weight: 55,
    patterns: [
      /\bSQL\b/,
      /\b(?:SELECT|GROUP BY|JOIN|WHERE|HAVING|WINDOW FUNCTION)\b/,
      /\b(?:inner|outer|left|right) join\b/i,
      /\bnormalis?ation\b.*\b(?:table|schema|database)\b/i,
      /\bquery\b.*\b(?:table|rows?|database)\b/i,
    ],
  },
  {
    kind: 'debugging',
    weight: 50,
    patterns: [
      /\bwhy (?:does|is|would) (?:this|the) (?:code|function|script|model|query|snippet)\b/i,
      /\b(?:debug|fix|diagnose|troubleshoot)\b/i,
      /\bwhat(?:'s| is) wrong with\b/i,
      /\b(?:error|exception|traceback|stack trace|bug)\b/i,
      /\bfails? (?:silently|at runtime|with)\b/i,
    ],
  },
  {
    kind: 'system-design',
    weight: 48,
    patterns: [
      /\bdesign (?:a|an|the)\b/i,
      /\barchitect(?:ure)?\b/i,
      /\bhow would you (?:build|scale|deploy|structure|productionis|serve)/i,
      /\b(?:pipeline|throughput|latency budget|availability|failover|sharding|load balanc)/i,
      /\bat scale\b/i,
      /\btrade-?offs? (?:between|of|when)\b.*\b(?:system|service|infrastructure|deployment)\b/i,
    ],
  },
  {
    kind: 'mathematical',
    weight: 45,
    patterns: [
      /\b(?:derive|derivation|prove|proof)\b/i,
      /\bcompute the\b/i,
      /\bwhat is the (?:gradient|derivative|expectation|variance|probability|complexity)\b/i,
      /\b(?:big-?o|time complexity|space complexity)\b/i,
      /\b(?:equation|formula|closed form)\b/i,
      /\bshow that\b/i,
    ],
  },
  {
    kind: 'coding',
    weight: 40,
    patterns: [
      /\b(?:write|implement|code)\b.*\b(?:function|class|method|script|loop|query)\b/i,
      /\bhow (?:do|would) you (?:write|implement)\b/i,
      /\bwhat does (?:this|the following) (?:code|snippet|function) (?:do|return|print)\b/i,
      /\bin (?:Python|NumPy|pandas|PyTorch|TensorFlow)\b.*\bhow\b/i,
      /`[^`]+`/,
    ],
  },
  {
    kind: 'ml-theory',
    weight: 35,
    patterns: [
      /\b(?:bias[- ]variance|overfitting|underfitting|regularis|gradient descent|backpropagation)\b/i,
      /\b(?:precision|recall|F1|ROC|AUC|cross[- ]validation|confusion matrix)\b/i,
      /\b(?:attention|transformer|embedding|convolution|recurrent|fine[- ]tun|RAG|hallucinat)/i,
      /\b(?:supervised|unsupervised|reinforcement) learning\b/i,
      /\b(?:loss function|objective function|optimis(?:er|ation)|learning rate)\b/i,
    ],
  },
  {
    kind: 'explanation',
    weight: 43,
    patterns: [
      /\bexplain\b.*\b(?:to a|as if|in plain|simply|intuition)\b/i,
      /\bin your own words\b/i,
      /\bhow would you explain\b/i,
      /\bwhat(?:'s| is) the intuition\b/i,
    ],
  },
  {
    kind: 'conceptual',
    weight: 10,
    patterns: [
      /\bwhat (?:is|are|does)\b/i,
      /\bdifference between\b/i,
      /\bwhen (?:would|should) you use\b/i,
      /\bwhy (?:does|do|is|are)\b/i,
      /\bcompare\b/i,
    ],
  },
];

export interface Classification {
  kind: QuestionKind;
  confidence: DeterministicConfidence;
  /** The patterns that fired, so a surprising classification is explainable. */
  signals: string[];
}

function match(text: string): { rule: Rule; hits: number }[] {
  return RULES.map((rule) => ({ rule, hits: rule.patterns.filter((p) => p.test(text)).length })).filter(
    (m) => m.hits > 0,
  );
}

/**
 * Classifies from the question, falling back to its reference answer.
 *
 * The question decides. A reference answer that mentions SQL in passing must
 * not be able to relabel a question about precision and recall, so the answer
 * is consulted only when the question itself carries no signal at all — which
 * happens with terse phrasings like "And if it is sparse?" whose meaning lives
 * entirely in the material around it.
 *
 * The learner's answer is not an input here, and there is no parameter for it.
 * How a question is graded must not depend on what was written in reply.
 */
export function classifyQuestion(question: string, referenceAnswer = ''): Classification {
  const fromQuestion = match(question);
  const matches = fromQuestion.length > 0 ? fromQuestion : match(referenceAnswer);

  const signals = matches.map((m) => `${m.rule.kind}:${m.hits}`);
  // Weight first; more corroborating patterns breaks a tie.
  const best = matches.sort((a, b) => b.rule.weight - a.rule.weight || b.hits - a.hits)[0];

  const kind = best?.rule.kind ?? 'conceptual';
  return { kind, confidence: KIND_CONFIDENCE[kind], signals };
}
