import { ALL_UNITS, UNIT_BY_ID, prerequisitesOf, leadsTo } from '@/data/curriculum';
import { DOMAIN_BY_ID } from '@/data/domains';
import { CONFIDENT_COVERAGE, resolveConcept, searchCurriculum } from '@/features/curriculum/search';
import type { LearningUnit, QuizQuestion } from '@/types/curriculum';

/**
 * The tutor.
 *
 * This is a retrieval tutor, not a language model: it identifies what the
 * learner is asking, finds the right unit, and composes an answer out of that
 * unit's own authored teaching content. That is a deliberate design choice —
 * everything it says is material a human wrote and the verifier checked, so it
 * cannot hallucinate, and it can always cite exactly where an answer came from.
 * The UI says so plainly rather than implying a general-purpose assistant.
 *
 * What it does add is pedagogy: it starts short, it knows what you have
 * already studied and got wrong, and it offers the next useful step rather
 * than emptying a whole lesson onto the screen.
 */

export type TutorBlock =
  | { kind: 'text'; body: string }
  | { kind: 'callout'; tone: 'info' | 'accent' | 'warning'; label: string; body: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'mapping'; items: { from: string; to: string }[] }
  | { kind: 'math'; latex: string; name: string; meaning: string; variables: { symbol: string; meaning: string }[] }
  | { kind: 'code'; language: string; code: string; explanation: string; output?: string }
  | { kind: 'quiz'; question: QuizQuestion; unitId: string }
  | { kind: 'units'; label: string; units: { id: string; title: string; slug: string; domain: string }[] };

export interface TutorReply {
  blocks: TutorBlock[];
  /** Follow-up prompts, so the learner is never left guessing what to ask. */
  suggestions: string[];
  /** The unit the answer was drawn from, for citation. */
  source?: { id: string; title: string; slug: string; domain: string };
  intent: Intent;
}

export type Intent =
  | 'define'
  | 'simple'
  | 'why'
  | 'intuition'
  | 'math'
  | 'example'
  | 'code'
  | 'mistakes'
  | 'interview'
  | 'quiz'
  | 'compare'
  | 'prerequisites'
  | 'next'
  | 'weak'
  | 'progress'
  | 'howto'
  | 'unknown';

export interface TutorContext {
  /** The unit the learner is currently on, if any. */
  currentUnitId?: string;
  completedUnitIds: string[];
  weakUnitIds: string[];
  /** Concepts from the mistake notebook, most-missed first. */
  missedConcepts: string[];
  nextUnitId?: string;
  completedCount: number;
  totalCount: number;
}

/* ------------------------------------------------------------------ */
/* Intent                                                              */
/* ------------------------------------------------------------------ */

const PATTERNS: [Intent, RegExp][] = [
  ['simple', /\b(like i'?m (nine|9|five|5|a kid|a child)|simply|simple terms|eli5|plain english|in plain|dumb(ed)? down)\b/i],
  ['math', /\b(math(s|ematically)?|equation|formula|derive|derivation|proof|notation)\b/i],
  ['code', /\b(code|implement|python|sklearn|scikit|pytorch|numpy|write it|in practice how)\b/i],
  ['quiz', /\b(quiz|test me|question me|ask me|practi[cs]e question|check my)\b/i],
  ['interview', /\b(interview|asked in an interview|hiring|technical round)\b/i],
  ['mistakes', /\b(mistake|wrong|error|trap|pitfall|gotcha|goes wrong|mess(ed)? up)\b/i],
  ['example', /\b(example|for instance|show me a case|worked|real world|where is it used|use case)\b/i],
  ['intuition', /\b(intuition|intuitive|analogy|picture|visuali[sz]e|imagine|feel for)\b/i],
  ['why', /\b(why (does|do|is|are|would)|what problem|what.s the point|reason for|purpose of)\b/i],
  ['prerequisites', /\b(prerequisite|before (i|this)|what do i need|background for|comes before)\b/i],
  ['next', /\b(what (should|do) i (study|learn|do) next|what.s next|next unit|next topic|next lesson)\b/i],
  ['weak', /\b(weak|struggling|bad at|worst|need (to )?(review|revise)|keep getting wrong)\b/i],
  ['progress', /\b(how (am i|far)|my progress|how much left|on track|behind schedule|am i doing)\b/i],
  ['compare', /\b(difference between|vs\.?|versus|compared (to|with)|better than)\b/i],
  ['howto', /\b(how do i|how to|how can i|how does one)\b/i],
  ['define', /\b(what is|what are|define|meaning of|what does .* mean|tell me about|explain)\b/i],
];

export function detectIntent(query: string): Intent {
  for (const [intent, re] of PATTERNS) {
    if (re.test(query)) return intent;
  }
  return 'unknown';
}

/* ------------------------------------------------------------------ */
/* Resolution                                                          */
/* ------------------------------------------------------------------ */

/** Finds the unit a question is about: an explicit match, else the current unit. */
function resolveUnit(query: string, ctx: TutorContext): LearningUnit | undefined {
  const stripped = query
    .replace(
      /\b(what is|what are|define|explain|tell me about|how do i|how to|show me|give me|the|a|an|like i'?m nine|simply|mathematically|in code|an example of|quiz me on)\b/gi,
      ' ',
    )
    .replace(/[?!.]/g, ' ')
    .trim();

  if (stripped.length >= 3) {
    // `searchCurriculum` matches substrings, which is right for a search box —
    // a loose hit is a useful suggestion — and wrong here. Its top result for
    // "zzzqqq nonexistent concept xyzzy" was a real unit, and the tutor would
    // then have explained that unit as though it had been asked about. Commit
    // to a unit only when the question actually names something we teach.
    const match = resolveConcept(stripped);
    if (!match || match.coverage < CONFIDENT_COVERAGE || !match.specific) {
      // Anything weaker falls through so the caller can offer candidates or
      // say it found nothing, rather than answering the wrong question
      // fluently. That refusal is the whole point of the gate.
      return undefined;
    }

    // The gate decides *whether* to answer; the search index decides *which*
    // unit, because it ranks by relevance while the gate only measures
    // whether the question named something. Many units clear the gate at full
    // coverage, so using it to rank would pick an arbitrary one.
    const hits = searchCurriculum(stripped, { limit: 6 });
    const best = hits.find((h) => h.kind === 'unit') ?? hits[0];
    const ranked = best ? UNIT_BY_ID.get(best.unitId) : undefined;
    return ranked ?? match.unit;
  }

  return ctx.currentUnitId ? UNIT_BY_ID.get(ctx.currentUnitId) : undefined;
}

function cite(unit: LearningUnit) {
  return {
    id: unit.id,
    title: unit.title,
    slug: unit.slug,
    domain: DOMAIN_BY_ID[unit.domain]?.name ?? unit.domain,
  };
}

function unitRefs(units: LearningUnit[]) {
  return units.map((u) => ({
    id: u.id,
    title: u.title,
    slug: u.slug,
    domain: DOMAIN_BY_ID[u.domain]?.name ?? u.domain,
  }));
}

/* ------------------------------------------------------------------ */
/* Answering                                                           */
/* ------------------------------------------------------------------ */

export function answer(query: string, ctx: TutorContext): TutorReply {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return {
      intent: 'unknown',
      blocks: [{ kind: 'text', body: 'Ask me about any concept in the curriculum, or about where you are up to.' }],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const intent = detectIntent(trimmed);

  // Questions about the learner rather than about a concept.
  switch (intent) {
    case 'next':
      return answerNext(ctx);
    case 'weak':
      return answerWeak(ctx);
    case 'progress':
      return answerProgress(ctx);
    default:
      break;
  }

  if (intent === 'compare') {
    const comparison = answerCompare(trimmed);
    if (comparison) return comparison;
  }

  const unit = resolveUnit(trimmed, ctx);
  if (!unit) {
    const hits = searchCurriculum(trimmed, { limit: 5 });
    if (hits.length === 0) {
      return {
        intent,
        blocks: [
          {
            kind: 'text',
            body: `I could not find "${trimmed}" in the curriculum. I only answer from the 214 authored units, so if it is not covered I would rather say so than invent something.`,
          },
        ],
        suggestions: ['What should I study next?', 'Where am I weak?', 'Explain gradient descent simply'],
      };
    }
    return {
      intent,
      blocks: [
        { kind: 'text', body: 'I am not certain which concept you mean. These look closest:' },
        {
          kind: 'units',
          label: 'Possible matches',
          units: hits.map((h) => ({
            id: h.unitId,
            title: h.unitTitle,
            slug: h.href.replace('/learn/', '').split('#')[0]!,
            domain: h.domainName,
          })),
        },
      ],
      suggestions: hits.slice(0, 3).map((h) => `Explain ${h.unitTitle} simply`),
    };
  }

  const reply = composeForUnit(unit, intent, ctx);
  return { ...reply, source: cite(unit) };
}

function composeForUnit(unit: LearningUnit, intent: Intent, ctx: TutorContext): Omit<TutorReply, 'source'> {
  const studied = ctx.completedUnitIds.includes(unit.id);
  const isWeak = ctx.weakUnitIds.includes(unit.id);

  const base = (blocks: TutorBlock[], suggestions: string[]): Omit<TutorReply, 'source'> => {
    const extra: TutorBlock[] = [];
    if (isWeak) {
      extra.push({
        kind: 'callout',
        tone: 'warning',
        label: 'You have found this one hard',
        body: 'Your best score here is below the understanding bar. Start from the analogy rather than the maths — and ask me for a quiz once it feels clearer.',
      });
    } else if (!studied) {
      const prereqs = prerequisitesOf(unit.id).filter((p) => !ctx.completedUnitIds.includes(p.id));
      if (prereqs.length > 0) {
        extra.push({
          kind: 'callout',
          tone: 'info',
          label: 'Worth doing first',
          body: `This builds on ${prereqs.map((p) => p.title).join(', ')}, which you have not finished yet. It will make far more sense afterwards.`,
        });
      }
    }
    return { intent, blocks: [...blocks, ...extra], suggestions };
  };

  switch (intent) {
    case 'simple':
    case 'define':
    case 'unknown':
      return base(
        [
          { kind: 'text', body: unit.simpleExplanation },
          {
            kind: 'callout',
            tone: 'accent',
            label: 'The precise version',
            body: unit.formalDefinition,
          },
        ],
        [
          `Why does ${unit.title} exist?`,
          `Show me the intuition for ${unit.title}`,
          unit.math ? `Explain ${unit.title} mathematically` : `Show me ${unit.title} in code`,
          `Quiz me on ${unit.title}`,
        ],
      );

    case 'why':
      return base(
        [
          { kind: 'text', body: unit.whyItExists },
          { kind: 'callout', tone: 'accent', label: 'Which is why', body: unit.analogy.bridge },
        ],
        [`Show me the intuition for ${unit.title}`, `What goes wrong with ${unit.title}?`, `Give me an example of ${unit.title}`],
      );

    case 'intuition':
      return base(
        [
          { kind: 'text', body: unit.analogy.scenario },
          { kind: 'mapping', items: unit.analogy.mapping },
          { kind: 'callout', tone: 'accent', label: 'Tying it back', body: unit.analogy.bridge },
          ...(unit.analogy.limitations
            ? [{ kind: 'callout' as const, tone: 'warning' as const, label: 'Where the analogy breaks down', body: unit.analogy.limitations }]
            : []),
        ],
        [`Now explain ${unit.title} precisely`, unit.math ? `Show me the maths for ${unit.title}` : `Show me the code`, `Quiz me on ${unit.title}`],
      );

    case 'math': {
      if (!unit.math) {
        return base(
          [
            {
              kind: 'text',
              body: `${unit.title} does not have a mathematical formulation in this curriculum — it is a conceptual or practical unit. Here is the precise definition instead.`,
            },
            { kind: 'callout', tone: 'accent', label: 'Formally', body: unit.formalDefinition },
          ],
          [`Show me ${unit.title} in code`, `Give me an example of ${unit.title}`],
        );
      }
      return base(
        [
          { kind: 'callout', tone: 'info', label: 'The idea in words, first', body: unit.math.intuition },
          ...unit.math.formulas.map(
            (f): TutorBlock => ({
              kind: 'math',
              latex: f.latex,
              name: f.name,
              meaning: f.meaning,
              variables: f.variables,
            }),
          ),
          ...(unit.math.derivation ? [{ kind: 'list' as const, ordered: true, items: unit.math.derivation }] : []),
        ],
        [`Give me a worked example of ${unit.title}`, `Show me ${unit.title} in code`, `Quiz me on ${unit.title}`],
      );
    }

    case 'code': {
      if (unit.codeExamples.length === 0) {
        return base(
          [{ kind: 'text', body: `${unit.title} has no code example in this curriculum. Here is the core idea instead.` }, { kind: 'text', body: unit.simpleExplanation }],
          [`Explain ${unit.title} mathematically`, `Give me an example of ${unit.title}`],
        );
      }
      return base(
        unit.codeExamples.slice(0, 2).map(
          (c): TutorBlock => ({
            kind: 'code',
            language: c.language,
            code: c.code,
            explanation: c.explanation,
            output: c.output,
          }),
        ),
        [`What goes wrong with ${unit.title}?`, `Quiz me on ${unit.title}`, `Give me an interview question on ${unit.title}`],
      );
    }

    case 'example': {
      const blocks: TutorBlock[] = [];
      if (unit.workedExample) {
        blocks.push({ kind: 'text', body: `${unit.workedExample.title}. ${unit.workedExample.setup}` });
        blocks.push({ kind: 'list', ordered: true, items: unit.workedExample.steps.map((s) => `${s.label}: ${s.detail}`) });
        blocks.push({ kind: 'callout', tone: 'accent', label: 'So', body: unit.workedExample.conclusion });
      }
      blocks.push({
        kind: 'list',
        items: unit.realWorldExamples.map((r) => `${r.context}: ${r.usage}`),
      });
      return base(blocks, [`Show me ${unit.title} in code`, `What goes wrong with ${unit.title}?`, `Quiz me on ${unit.title}`]);
    }

    case 'mistakes':
      return base(
        [
          { kind: 'text', body: `The specific ways ${unit.title} goes wrong in practice:` },
          ...unit.commonMistakes.map(
            (m): TutorBlock => ({
              kind: 'callout',
              tone: 'warning',
              label: m.mistake,
              body: `${m.why}\n\nFix: ${m.fix}`,
            }),
          ),
        ],
        [`Quiz me on ${unit.title}`, `Give me an interview question on ${unit.title}`],
      );

    case 'interview': {
      const q = unit.interviewQuestions[0]!;
      return base(
        [
          { kind: 'callout', tone: 'info', label: `Interview question (${q.level.replace('-', ' ')})`, body: q.question },
          { kind: 'text', body: 'Answer it out loud before reading on — the gap between what you can recognise and what you can say is the whole point.' },
          { kind: 'callout', tone: 'accent', label: 'A strong answer', body: q.answer },
          ...(q.followUp ? [{ kind: 'callout' as const, tone: 'info' as const, label: 'What separates a strong answer', body: q.followUp }] : []),
        ],
        [
          unit.interviewQuestions.length > 1 ? `Another interview question on ${unit.title}` : `Quiz me on ${unit.title}`,
          `What goes wrong with ${unit.title}?`,
        ],
      );
    }

    case 'quiz': {
      const q = unit.quiz[Math.floor(Math.random() * unit.quiz.length)]!;
      return base(
        [
          { kind: 'text', body: `One question on ${unit.title}. Answer it, then I will explain either way.` },
          { kind: 'quiz', question: q, unitId: unit.id },
        ],
        [`Another question on ${unit.title}`, `Explain ${unit.title} simply`, `Take the full unit test`],
      );
    }

    case 'prerequisites': {
      const prereqs = prerequisitesOf(unit.id);
      const unlocks = leadsTo(unit.id)
        .map((id) => UNIT_BY_ID.get(id))
        .filter((u): u is LearningUnit => Boolean(u));
      return base(
        [
          {
            kind: 'text',
            body: prereqs.length
              ? `${unit.title} builds directly on ${prereqs.length} earlier unit${prereqs.length === 1 ? '' : 's'}.`
              : `${unit.title} has no prerequisites — it is a starting point.`,
          },
          ...(prereqs.length ? [{ kind: 'units' as const, label: 'Comes after', units: unitRefs(prereqs) }] : []),
          ...(unlocks.length ? [{ kind: 'units' as const, label: 'Unlocks', units: unitRefs(unlocks.slice(0, 6)) }] : []),
        ],
        [`Explain ${unit.title} simply`, 'What should I study next?'],
      );
    }

    case 'howto':
      return base(
        [
          { kind: 'text', body: unit.simpleExplanation },
          ...(unit.codeExamples[0]
            ? [
                {
                  kind: 'code' as const,
                  language: unit.codeExamples[0].language,
                  code: unit.codeExamples[0].code,
                  explanation: unit.codeExamples[0].explanation,
                  output: unit.codeExamples[0].output,
                },
              ]
            : []),
        ],
        [`What goes wrong with ${unit.title}?`, `Quiz me on ${unit.title}`],
      );

    default:
      return base([{ kind: 'text', body: unit.simpleExplanation }], [`Why does ${unit.title} exist?`, `Quiz me on ${unit.title}`]);
  }
}

/* ------------------------------------------------------------------ */
/* Learner-state answers                                               */
/* ------------------------------------------------------------------ */

function answerNext(ctx: TutorContext): TutorReply {
  const next = ctx.nextUnitId ? UNIT_BY_ID.get(ctx.nextUnitId) : undefined;
  const weak = ctx.weakUnitIds.map((id) => UNIT_BY_ID.get(id)).filter((u): u is LearningUnit => Boolean(u));

  const blocks: TutorBlock[] = [];

  if (weak.length > 0) {
    blocks.push({
      kind: 'callout',
      tone: 'warning',
      label: 'Before new material',
      body: `${weak.length} unit${weak.length === 1 ? ' is' : 's are'} still below the understanding bar. Shoring those up is worth more than moving forward — they are prerequisites for things you have not met yet.`,
    });
    blocks.push({ kind: 'units', label: 'Worth another pass', units: unitRefs(weak.slice(0, 4)) });
  }

  if (next) {
    blocks.push({ kind: 'text', body: `Your next unscheduled unit is ${next.title}, in ${DOMAIN_BY_ID[next.domain]?.name}. It takes about ${next.estimatedMinutes} minutes.` });
    blocks.push({ kind: 'units', label: 'Next up', units: unitRefs([next]) });
  } else {
    blocks.push({ kind: 'text', body: 'You have completed every unit. The final assessment and the teacher challenge are what remain.' });
  }

  return {
    intent: 'next',
    blocks,
    suggestions: next ? [`Explain ${next.title} simply`, `What do I need before ${next.title}?`, 'Where am I weak?'] : ['How am I doing?'],
  };
}

function answerWeak(ctx: TutorContext): TutorReply {
  const weak = ctx.weakUnitIds.map((id) => UNIT_BY_ID.get(id)).filter((u): u is LearningUnit => Boolean(u));

  if (weak.length === 0) {
    return {
      intent: 'weak',
      blocks: [
        {
          kind: 'text',
          body: 'Nothing is currently below the understanding bar. That is worth noticing — it means the material you have covered has actually stuck, not just been read.',
        },
      ],
      suggestions: ['What should I study next?', 'How am I doing?'],
    };
  }

  const blocks: TutorBlock[] = [
    {
      kind: 'text',
      body: `${weak.length} unit${weak.length === 1 ? '' : 's'} need another pass. Your weak topics are the highest-value thing you can work on — they are cheaper to fix now than after three more units have been built on top of them.`,
    },
    { kind: 'units', label: 'Needs work', units: unitRefs(weak.slice(0, 6)) },
  ];

  if (ctx.missedConcepts.length > 0) {
    blocks.push({
      kind: 'callout',
      tone: 'info',
      label: 'The pattern in your mistakes',
      body: `You have most often gone wrong on: ${ctx.missedConcepts.slice(0, 4).join(', ')}. That is a theme, not bad luck.`,
    });
  }

  const first = weak[0]!;
  return {
    intent: 'weak',
    blocks,
    suggestions: [`Show me the intuition for ${first.title}`, `What goes wrong with ${first.title}?`, `Quiz me on ${first.title}`],
  };
}

function answerProgress(ctx: TutorContext): TutorReply {
  const share = ctx.totalCount ? Math.round((ctx.completedCount / ctx.totalCount) * 100) : 0;
  return {
    intent: 'progress',
    blocks: [
      {
        kind: 'text',
        body: `You have completed ${ctx.completedCount} of ${ctx.totalCount} units — ${share}% of the curriculum. ${
          ctx.weakUnitIds.length > 0
            ? `${ctx.weakUnitIds.length} of those are still shaky.`
            : 'Nothing is currently flagged as weak.'
        }`,
      },
      {
        kind: 'callout',
        tone: 'info',
        label: 'A caveat worth stating',
        body: 'Units completed is the easiest thing to measure and the least interesting. Mastery level and whether you can teach a concept back are the numbers that actually predict whether you will pass an interview.',
      },
    ],
    suggestions: ['What should I study next?', 'Where am I weak?'],
  };
}

function answerCompare(query: string): TutorReply | null {
  const parts = query.split(/\b(?:vs\.?|versus|difference between|compared (?:to|with))\b/i);
  const tail = parts[parts.length - 1] ?? '';
  const terms = tail.split(/\band\b|,/i).map((t) => t.trim().replace(/[?.]/g, '')).filter((t) => t.length > 2);
  if (terms.length < 2) return null;

  const found = terms
    .slice(0, 2)
    .map((t) => searchCurriculum(t, { limit: 1 })[0])
    .filter(Boolean);
  if (found.length < 2) return null;

  const units = found.map((f) => UNIT_BY_ID.get(f!.unitId)).filter((u): u is LearningUnit => Boolean(u));
  if (units.length < 2) return null;

  return {
    intent: 'compare',
    blocks: [
      { kind: 'text', body: `Here is each one in its own words. Reading them side by side is usually more useful than a list of differences.` },
      ...units.map((u): TutorBlock => ({ kind: 'callout', tone: 'accent', label: u.title, body: u.simpleExplanation })),
      { kind: 'units', label: 'Both units', units: unitRefs(units) },
    ],
    suggestions: units.map((u) => `What goes wrong with ${u.title}?`),
  };
}

export const DEFAULT_SUGGESTIONS = [
  'What should I study next?',
  'Where am I weak?',
  'Explain gradient descent like I am nine',
  'What is overfitting?',
  'Give me an interview question on precision and recall',
];

export function starterPrompts(currentUnit?: LearningUnit): string[] {
  if (!currentUnit) return DEFAULT_SUGGESTIONS;
  return [
    `Explain ${currentUnit.title} like I am nine`,
    `Why does ${currentUnit.title} exist?`,
    currentUnit.math ? `Explain ${currentUnit.title} mathematically` : `Show me ${currentUnit.title} in code`,
    `What goes wrong with ${currentUnit.title}?`,
    `Quiz me on ${currentUnit.title}`,
  ];
}

export const TOTAL_UNIT_COUNT = ALL_UNITS.length;
