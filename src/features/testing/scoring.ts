import type { QuizQuestion } from '@/types/curriculum';

/**
 * Answer checking for every question type.
 *
 * Kept as pure functions with no UI or storage dependency so the same logic
 * runs in the browser for instant feedback and on the server when a result is
 * submitted — the client's claim about its own score is never trusted.
 */

export type Response =
  | { kind: 'choice'; index: number }
  | { kind: 'choices'; indices: number[] }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'text'; value: string }
  | { kind: 'number'; value: number }
  | { kind: 'order'; order: number[] }
  | { kind: 'match'; pairs: Record<string, string> };

export interface Graded {
  correct: boolean;
  /** Partial credit, 0–1. Whole-question correctness still uses `correct`. */
  credit: number;
  correctAnswerText: string;
  yourAnswerText: string;
}

const normalise = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[`"'’]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?]+$/, '');

export function gradeQuestion(question: QuizQuestion, response: Response | null): Graded {
  if (response === null) {
    return { correct: false, credit: 0, correctAnswerText: correctAnswerText(question), yourAnswerText: 'No answer' };
  }

  switch (question.type) {
    case 'mcq':
    case 'code-output':
    case 'debug': {
      const idx = response.kind === 'choice' ? response.index : -1;
      const correct = idx === question.answerIndex;
      return {
        correct,
        credit: correct ? 1 : 0,
        correctAnswerText: question.options[question.answerIndex] ?? '',
        yourAnswerText: question.options[idx] ?? 'No answer',
      };
    }

    case 'multi': {
      const picked = response.kind === 'choices' ? [...new Set(response.indices)] : [];
      const answer = new Set(question.answerIndices);
      const hits = picked.filter((i) => answer.has(i)).length;
      const misses = picked.filter((i) => !answer.has(i)).length;
      // Reward hits, penalise wrong picks, never below zero.
      const credit = answer.size === 0 ? 0 : Math.max(0, (hits - misses) / answer.size);
      return {
        correct: credit === 1,
        credit,
        correctAnswerText: question.answerIndices.map((i) => question.options[i]).join(', '),
        yourAnswerText: picked.length ? picked.map((i) => question.options[i]).join(', ') : 'No answer',
      };
    }

    case 'truefalse': {
      const value = response.kind === 'boolean' ? response.value : null;
      const correct = value === question.answer;
      return {
        correct,
        credit: correct ? 1 : 0,
        correctAnswerText: question.answer ? 'True' : 'False',
        yourAnswerText: value === null ? 'No answer' : value ? 'True' : 'False',
      };
    }

    case 'fill': {
      const text = response.kind === 'text' ? response.value : '';
      const correct = question.answers.some((a) => normalise(a) === normalise(text));
      return {
        correct,
        credit: correct ? 1 : 0,
        correctAnswerText: question.answers[0] ?? '',
        yourAnswerText: text || 'No answer',
      };
    }

    case 'numeric': {
      const value = response.kind === 'number' ? response.value : NaN;
      const tol = question.tolerance ?? 1e-9;
      const correct = Number.isFinite(value) && Math.abs(value - question.answer) <= tol;
      return {
        correct,
        credit: correct ? 1 : 0,
        correctAnswerText: `${question.answer}${question.unit ? ` ${question.unit}` : ''}`,
        yourAnswerText: Number.isFinite(value) ? String(value) : 'No answer',
      };
    }

    case 'order': {
      const order = response.kind === 'order' ? response.order : [];
      const target = question.items.map((_, i) => i);
      const correct = order.length === target.length && order.every((v, i) => v === target[i]);
      // Partial credit for adjacent pairs in the right relative order.
      let adjacent = 0;
      for (let i = 0; i < order.length - 1; i++) if (order[i]! < order[i + 1]!) adjacent++;
      const credit = correct ? 1 : target.length > 1 ? adjacent / (target.length - 1) : 0;
      return {
        correct,
        credit,
        correctAnswerText: question.items.join(' → '),
        yourAnswerText: order.length ? order.map((i) => question.items[i]).join(' → ') : 'No answer',
      };
    }

    case 'match': {
      const pairs = response.kind === 'match' ? response.pairs : {};
      const hits = question.pairs.filter((p) => pairs[p.left] === p.right).length;
      const credit = question.pairs.length ? hits / question.pairs.length : 0;
      return {
        correct: credit === 1,
        credit,
        correctAnswerText: question.pairs.map((p) => `${p.left} → ${p.right}`).join('; '),
        yourAnswerText:
          Object.keys(pairs).length === 0
            ? 'No answer'
            : Object.entries(pairs)
                .map(([l, r]) => `${l} → ${r}`)
                .join('; '),
      };
    }

    case 'explain': {
      const text = response.kind === 'text' ? response.value : '';
      const { score } = gradeExplanation(text, question.rubric);
      return {
        correct: score >= 0.6,
        credit: score,
        correctAnswerText: question.sampleAnswer,
        yourAnswerText: text || 'No answer',
      };
    }
  }
}

export function correctAnswerText(question: QuizQuestion): string {
  switch (question.type) {
    case 'mcq':
    case 'code-output':
    case 'debug':
      return question.options[question.answerIndex] ?? '';
    case 'multi':
      return question.answerIndices.map((i) => question.options[i]).join(', ');
    case 'truefalse':
      return question.answer ? 'True' : 'False';
    case 'fill':
      return question.answers[0] ?? '';
    case 'numeric':
      return String(question.answer);
    case 'order':
      return question.items.join(' → ');
    case 'match':
      return question.pairs.map((p) => `${p.left} → ${p.right}`).join('; ');
    case 'explain':
      return question.sampleAnswer;
  }
}

/**
 * Rubric-based grading for free-text answers.
 *
 * Deliberately transparent rather than clever: each rubric point is matched by
 * its significant keywords, so the learner can always be shown *which* point
 * they covered and which they missed. A black-box score would not be useful
 * feedback, and pretending to grade prose precisely would be dishonest.
 */
export function gradeExplanation(
  text: string,
  rubric: string[],
): { score: number; covered: string[]; missing: string[] } {
  const body = normalise(text);
  if (body.length < 15) return { score: 0, covered: [], missing: rubric };

  const covered: string[] = [];
  const missing: string[] = [];

  for (const point of rubric) {
    const keywords = keywordsOf(point);
    if (keywords.length === 0) {
      missing.push(point);
      continue;
    }
    const hits = keywords.filter((k) => body.includes(k)).length;
    if (hits / keywords.length >= 0.4) covered.push(point);
    else missing.push(point);
  }

  return { score: rubric.length ? covered.length / rubric.length : 0, covered, missing };
}

const STOPWORDS = new Set([
  'the','a','an','and','or','of','to','in','is','it','that','this','with','for','on','as','by','be','are','was',
  'mentions','says','notes','explains','states','describes','identifies','uses','gives','includes','should','must',
  'not','its','their','which','when','what','why','how','can','you','your','they','them','from','at','into','than',
  'one','two','three','also','only','any','each','both','other','same','more','most','some','such','no','nor',
]);

function keywordsOf(sentence: string): string[] {
  return normalise(sentence)
    .split(/[^a-z0-9-]+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w))
    .slice(0, 6);
}

export interface ScoredTest {
  score: number;
  correct: number;
  total: number;
  creditTotal: number;
}

export function scoreTest(graded: Graded[]): ScoredTest {
  const total = graded.length;
  const correct = graded.filter((g) => g.correct).length;
  const creditTotal = graded.reduce((a, g) => a + g.credit, 0);
  return {
    total,
    correct,
    creditTotal,
    // Partial credit counts, so a nearly-right multi-select is not a zero.
    score: total === 0 ? 0 : creditTotal / total,
  };
}

export function grade(score: number): { letter: string; label: string; tone: 'success' | 'info' | 'warning' | 'danger' } {
  if (score >= 0.95) return { letter: 'A+', label: 'Outstanding', tone: 'success' };
  if (score >= 0.85) return { letter: 'A', label: 'Proficient', tone: 'success' };
  if (score >= 0.7) return { letter: 'B', label: 'Understood', tone: 'info' };
  if (score >= 0.55) return { letter: 'C', label: 'Shaky', tone: 'warning' };
  return { letter: 'D', label: 'Needs another pass', tone: 'danger' };
}
