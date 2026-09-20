/**
 * Curriculum integrity gate.
 *
 * This is the mechanism that keeps the promise of "214 real learning units"
 * honest: it checks structure (counts, ids, prerequisite ordering) *and*
 * substance (minimum content in every authored field, no placeholder copy).
 *
 *   npm run curriculum:verify          # fail on any error
 *   npm run curriculum:verify -- --stats
 */
import { ALL_UNITS, DOMAIN_UNIT_COUNTS, UNIT_BY_ID, UNIT_INDEX } from '../src/data/curriculum';
import { DOMAINS, PLANNED_UNITS } from '../src/data/domains';
import { TOTAL_UNITS, WIDGET_IDS, type LearningUnit } from '../src/types/curriculum';

/** `--domain=ML` checks a single domain in isolation, for authoring in progress. */
const domainArg = process.argv.find((a) => a.startsWith('--domain='))?.split('=')[1]?.toUpperCase();

const errors: string[] = [];
const warnings: string[] = [];

const err = (unit: string, msg: string) => errors.push(`${unit}: ${msg}`);
const warn = (unit: string, msg: string) => warnings.push(`${unit}: ${msg}`);

/* Stub detection. Deliberately narrow: "placeholder" and "dummy" are real
   technical vocabulary (a placeholder variable, a sentinel node), so the gate
   matches stub *phrases* rather than lone words that happen to be jargon. */
const PLACEHOLDER =
  /\b(coming soon|lorem ipsum|content pending|fill (this|me) in|write (this|me) later|tbd|fixme|xxx{2,})\b/i;
const TODO = /\bTODO\b/;
const WIDGETS = new Set<string>(WIDGET_IDS);

function textOf(u: LearningUnit): string {
  return JSON.stringify(u);
}

/* ---------------------------------------------------------------- */
/* Structure                                                          */
/* ---------------------------------------------------------------- */

if (!domainArg && ALL_UNITS.length !== TOTAL_UNITS) {
  errors.push(`TOTAL: expected exactly ${TOTAL_UNITS} units, found ${ALL_UNITS.length}`);
}

for (const d of DOMAINS) {
  if (domainArg && d.id !== domainArg) continue;
  const actual = DOMAIN_UNIT_COUNTS[d.id];
  const planned = PLANNED_UNITS[d.id];
  if (actual !== planned) {
    errors.push(`DOMAIN ${d.id}: planned ${planned} units, authored ${actual}`);
  }
}

const seenIds = new Set<string>();
const seenSlugs = new Set<string>();
const perDomainCounter = new Map<string, number>();

for (const u of ALL_UNITS) {
  const tag = u.id;
  const skip = Boolean(domainArg) && u.domain !== domainArg;
  if (skip) {
    perDomainCounter.set(u.domain, (perDomainCounter.get(u.domain) ?? 0) + 1);
    seenIds.add(u.id);
    seenSlugs.add(u.slug);
    continue;
  }

  if (seenIds.has(u.id)) err(tag, 'duplicate id');
  seenIds.add(u.id);

  if (seenSlugs.has(u.slug)) err(tag, `duplicate slug "${u.slug}"`);
  seenSlugs.add(u.slug);

  if (!new RegExp(`^${u.domain}-\\d{3}$`).test(u.id)) {
    err(tag, `id must look like ${u.domain}-001`);
  }

  const n = (perDomainCounter.get(u.domain) ?? 0) + 1;
  perDomainCounter.set(u.domain, n);
  const expectedId = `${u.domain}-${String(n).padStart(3, '0')}`;
  if (u.id !== expectedId) err(tag, `ids must be sequential within a domain; expected ${expectedId}`);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(u.slug)) err(tag, `slug "${u.slug}" must be kebab-case`);

  const domain = DOMAINS.find((d) => d.id === u.domain);
  if (!domain) err(tag, `unknown domain "${u.domain}"`);
  else if (!domain.modules.includes(u.module)) {
    err(tag, `module "${u.module}" is not declared on domain ${u.domain}`);
  }

  if (u.difficulty < 1 || u.difficulty > 5) err(tag, `difficulty ${u.difficulty} out of range`);
  if (u.estimatedMinutes < 10 || u.estimatedMinutes > 120) {
    err(tag, `estimatedMinutes ${u.estimatedMinutes} outside 10–120`);
  }

  /* Prerequisites must exist and come strictly earlier — this rules out
     cycles and forward references in one check. */
  const myIndex = UNIT_INDEX.get(u.id)!;
  for (const p of u.prerequisites) {
    if (!UNIT_BY_ID.has(p)) {
      err(tag, `prerequisite "${p}" does not exist`);
      continue;
    }
    const pIndex = UNIT_INDEX.get(p)!;
    if (pIndex >= myIndex) err(tag, `prerequisite "${p}" must appear earlier in the curriculum`);
  }
  if (new Set(u.prerequisites).size !== u.prerequisites.length) err(tag, 'duplicate prerequisites');

  for (const r of u.related ?? []) {
    if (!UNIT_BY_ID.has(r)) err(tag, `related unit "${r}" does not exist`);
    if (r === u.id) err(tag, 'a unit cannot be related to itself');
  }

  /* -------------------------------------------------------------- */
  /* Substance                                                       */
  /* -------------------------------------------------------------- */

  const blob = textOf(u);
  if (PLACEHOLDER.test(blob)) err(tag, 'contains placeholder copy');
  if (TODO.test(blob)) err(tag, 'contains a TODO marker');

  if (u.learningObjectives.length < 3) err(tag, `needs >= 3 learning objectives (has ${u.learningObjectives.length})`);
  if (u.terminology.length < 3) err(tag, `needs >= 3 terminology entries (has ${u.terminology.length})`);
  if (u.simpleExplanation.trim().length < 220) err(tag, 'simpleExplanation is too short to actually teach anything');
  if (u.whyItExists.trim().length < 110) err(tag, 'whyItExists is too short');
  if (u.formalDefinition.trim().length < 80) err(tag, 'formalDefinition is too short');

  if (u.analogy.mapping.length < 2) err(tag, 'analogy needs >= 2 explicit mappings back to the concept');
  if (u.analogy.bridge.trim().length < 60) err(tag, 'analogy.bridge must connect the story to the technical idea');
  if (u.analogy.scenario.trim().length < 60) err(tag, 'analogy.scenario is too short');

  if (u.visuals.length < 1) err(tag, 'needs at least one visual explanation');
  for (const v of u.visuals) {
    if (v.kind === 'widget' && !WIDGETS.has(v.widget)) err(tag, `unknown widget "${v.widget}"`);
    if (v.kind === 'flow' && v.steps.length < 3) err(tag, 'a flow visual needs >= 3 steps');
    if (v.kind === 'table' && v.rows.some((r) => r.length !== v.columns.length)) {
      err(tag, 'table visual has a row whose width does not match its columns');
    }
  }

  const hasCode = u.codeExamples.length > 0;
  const hasMath = (u.math?.formulas.length ?? 0) > 0;
  if (!hasCode && !hasMath) err(tag, 'needs at least one code example or one formula');
  for (const c of u.codeExamples) {
    if (c.code.trim().length < 20) err(tag, `code example "${c.title}" is too short`);
    if (c.explanation.trim().length < 40) err(tag, `code example "${c.title}" needs a real explanation`);
  }

  if (u.realWorldExamples.length < 2) err(tag, `needs >= 2 real-world examples (has ${u.realWorldExamples.length})`);
  if (u.commonMistakes.length < 2) err(tag, `needs >= 2 common mistakes (has ${u.commonMistakes.length})`);
  for (const m of u.commonMistakes) {
    if (!m.why.trim() || !m.fix.trim()) err(tag, `mistake "${m.mistake}" is missing why/fix`);
  }

  if (u.interviewQuestions.length < 2) err(tag, `needs >= 2 interview questions (has ${u.interviewQuestions.length})`);
  for (const q of u.interviewQuestions) {
    if (q.answer.trim().length < 80) err(tag, `interview answer for "${q.question}" is too thin`);
  }

  if (u.practiceQuestions.length < 2) err(tag, `needs >= 2 practice questions (has ${u.practiceQuestions.length})`);
  for (const p of u.practiceQuestions) {
    if (!p.hint.trim()) err(tag, `practice "${p.prompt.slice(0, 40)}…" has no hint`);
    if (p.solution.trim().length < 30) err(tag, `practice "${p.prompt.slice(0, 40)}…" has no real solution`);
  }

  if (u.flashcards.length < 3) err(tag, `needs >= 3 flashcards (has ${u.flashcards.length})`);

  if (u.teachingPrompt.mustCover.length < 3) err(tag, 'teachingPrompt needs >= 3 mustCover points');
  if (u.teachingPrompt.sampleExplanation.trim().length < 200) err(tag, 'teachingPrompt.sampleExplanation is too short');

  /* Quiz ------------------------------------------------------------ */
  if (u.quiz.length < 5) err(tag, `needs >= 5 quiz questions (has ${u.quiz.length})`);
  const types = new Set(u.quiz.map((q) => q.type));
  if (types.size < 2) err(tag, 'quiz must mix at least two question types');
  const qIds = new Set<string>();
  for (const q of u.quiz) {
    if (qIds.has(q.id)) err(tag, `duplicate quiz question id "${q.id}"`);
    qIds.add(q.id);
    if (!q.id.startsWith(u.id)) warn(tag, `quiz id "${q.id}" should be prefixed with the unit id`);
    if (q.explanation.trim().length < 30) err(tag, `quiz "${q.id}" needs an explanation of the answer`);

    switch (q.type) {
      case 'mcq':
      case 'code-output':
      case 'debug': {
        if (q.options.length < 3) err(tag, `quiz "${q.id}" needs >= 3 options`);
        if (new Set(q.options).size !== q.options.length) err(tag, `quiz "${q.id}" has duplicate options`);
        if (q.answerIndex < 0 || q.answerIndex >= q.options.length) err(tag, `quiz "${q.id}" answerIndex out of range`);
        break;
      }
      case 'multi': {
        if (q.options.length < 3) err(tag, `quiz "${q.id}" needs >= 3 options`);
        if (q.answerIndices.length < 1) err(tag, `quiz "${q.id}" needs >= 1 correct option`);
        if (q.answerIndices.some((i) => i < 0 || i >= q.options.length)) err(tag, `quiz "${q.id}" answerIndices out of range`);
        break;
      }
      case 'fill': {
        if (q.answers.length < 1 || q.answers.some((a) => !a.trim())) err(tag, `quiz "${q.id}" needs accepted answers`);
        break;
      }
      case 'order': {
        if (q.items.length < 3) err(tag, `quiz "${q.id}" needs >= 3 orderable items`);
        break;
      }
      case 'match': {
        if (q.pairs.length < 3) err(tag, `quiz "${q.id}" needs >= 3 pairs`);
        break;
      }
      case 'explain': {
        if (q.rubric.length < 2) err(tag, `quiz "${q.id}" needs a rubric of >= 2 points`);
        if (q.sampleAnswer.trim().length < 80) err(tag, `quiz "${q.id}" needs a sample answer`);
        break;
      }
      case 'numeric':
      case 'truefalse':
        break;
    }
  }
}

/* ---------------------------------------------------------------- */
/* Report                                                             */
/* ---------------------------------------------------------------- */

const bold = (s: string) => `\u001b[1m${s}\u001b[0m`;
const red = (s: string) => `\u001b[31m${s}\u001b[0m`;
const green = (s: string) => `\u001b[32m${s}\u001b[0m`;
const yellow = (s: string) => `\u001b[33m${s}\u001b[0m`;
const dim = (s: string) => `\u001b[2m${s}\u001b[0m`;

if (process.argv.includes('--stats')) {
  console.log(bold('\n  Curriculum statistics\n'));
  const rows = DOMAINS.map((d) => {
    const units = ALL_UNITS.filter((u) => u.domain === d.id);
    const minutes = units.reduce((a, u) => a + u.estimatedMinutes, 0);
    const quiz = units.reduce((a, u) => a + u.quiz.length, 0);
    const cards = units.reduce((a, u) => a + u.flashcards.length, 0);
    const avgDiff = units.length ? units.reduce((a, u) => a + u.difficulty, 0) / units.length : 0;
    return { Domain: d.name, Units: units.length, Planned: PLANNED_UNITS[d.id], Hours: (minutes / 60).toFixed(1), Quiz: quiz, Cards: cards, Diff: avgDiff.toFixed(1) };
  });
  console.table(rows);
  const totalMin = ALL_UNITS.reduce((a, u) => a + u.estimatedMinutes, 0);
  console.log(
    `  ${bold(String(ALL_UNITS.length))} units · ${bold((totalMin / 60).toFixed(0))} hours of material · ` +
      `${bold(String(ALL_UNITS.reduce((a, u) => a + u.quiz.length, 0)))} quiz questions · ` +
      `${bold(String(ALL_UNITS.reduce((a, u) => a + u.flashcards.length, 0)))} flashcards · ` +
      `${bold(String(ALL_UNITS.reduce((a, u) => a + u.interviewQuestions.length, 0)))} interview questions\n`,
  );
}

if (warnings.length) {
  console.log(yellow(`\n  ${warnings.length} warning(s):`));
  for (const w of warnings.slice(0, 40)) console.log(dim(`    • ${w}`));
  if (warnings.length > 40) console.log(dim(`    … and ${warnings.length - 40} more`));
}

if (errors.length) {
  console.log(red(bold(`\n  ✗ ${errors.length} curriculum error(s):\n`)));
  for (const e of errors.slice(0, 80)) console.log(red(`    • ${e}`));
  if (errors.length > 80) console.log(red(`    … and ${errors.length - 80} more`));
  console.log('');
  process.exit(1);
}

if (domainArg) {
  console.log(green(bold(`\n  ✓ Domain ${domainArg} valid — ${DOMAIN_UNIT_COUNTS[domainArg as keyof typeof DOMAIN_UNIT_COUNTS]} units complete.\n`)));
} else {
  console.log(green(bold(`\n  ✓ Curriculum valid — ${ALL_UNITS.length}/${TOTAL_UNITS} units authored and complete.\n`)));
}
