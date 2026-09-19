# Curriculum authoring brief

You are writing teaching content, not filling in a form. The standard is:
**a motivated beginner reads the unit once and genuinely understands the idea.**

## Where things live

- Type contract: `src/types/curriculum.ts` (read it first — it is the schema)
- Unit outline (ids, modules, titles, slugs, difficulty, minutes): `docs/CURRICULUM.md`
- **Reference standard**: `src/data/curriculum/python.ts`, units `PY-001` and `PY-002`.
  Match that depth, tone and specificity. Do not write shallower content.
- Verifier: `npm run curriculum:verify` — must pass with zero errors.

## Hard rules

1. Each domain file exports `export const UNITS: LearningUnit[] = [ ... ]`
   in exactly the order given in `docs/CURRICULUM.md`, with those exact
   `id`, `module`, `title`, `slug`, `difficulty` and `estimatedMinutes` values.
2. `prerequisites` must reference units that appear **earlier in the global
   curriculum order** (domain order is: PY, DSA, NP, PD, VIZ, SQL, MATH, STAT,
   ML, DL, NLP, CV, GEN, OPS). Referencing a later unit fails the build.
   You may reference units from earlier domains; only reference ids that exist
   in `docs/CURRICULUM.md`.
3. Same rule applies to `related`: every id must exist. Keep `related` to
   ids you are confident about — prefer within your own domain plus earlier
   domains.
4. Never write placeholder text. The words "coming soon", "TODO", "TBD",
   "placeholder", "lorem ipsum" fail the build.
5. Every `quiz` id is `<UNIT-ID>-qN`.
6. Widget names in `visuals` must come from `WIDGET_IDS` in the type file.
7. British or American spelling is fine, but be consistent within a file.

## Minimum substance per unit (the verifier enforces these)

| field | minimum |
|---|---|
| `learningObjectives` | 3 (aim for 4) |
| `terminology` | 3 (aim for 4–5) |
| `simpleExplanation` | 220 chars — aim for a real 150–220 word ELI9 paragraph |
| `whyItExists` | 110 chars — what problem it solves |
| `analogy` | scenario ≥60 chars, ≥2 mappings, a `bridge` connecting it back |
| `visuals` | 1 (aim for 2–3: a `flow`, a `compare`/`table`, and a `widget` where one fits) |
| `formalDefinition` | 80 chars — the precise technical statement |
| `codeExamples` | ≥1 with real code + ≥40-char explanation (aim 2–3) |
| `realWorldExamples` | 2 (aim 3) |
| `commonMistakes` | 2 (aim 3–4), each with `why` and `fix` |
| `interviewQuestions` | 2 (aim 3), answers ≥80 chars and actually good |
| `practiceQuestions` | 2 (aim 3), each with `hint` and a real worked `solution` |
| `quiz` | 5 (aim 6), ≥2 distinct types, every `explanation` ≥30 chars |
| `flashcards` | 3 (aim 5) |
| `teachingPrompt` | ≥3 `mustCover` points, `sampleExplanation` ≥200 chars |

Also include, wherever the topic supports it: `math` (KaTeX, with every
variable explained), `workedExample`, `projectConnections`, `challenge`.
Maths-heavy units **must** have `math`. Algorithm units **must** have
`workedExample`.

## The teaching pattern every unit follows

1. `simpleExplanation` — the nine-year-old pass. Concrete, no unexplained jargon.
2. `whyItExists` — what was painful before this idea existed.
3. `analogy` — a story, then `mapping` + `bridge` that tie it back explicitly.
   An analogy with no bridge is a failure; say where it breaks down.
4. `visuals` — show the mechanism.
5. `formalDefinition` — now that it means something, state it precisely.
6. `math` — intuition first, then formulas with every symbol named.
7. `codeExamples` — runnable, with output, and an explanation of *why*.
8. `commonMistakes`, `interviewQuestions`, `practiceQuestions`, `quiz`,
   `flashcards`, `teachingPrompt`.

Intuition always precedes notation. Never open with an equation.

## Tone

Sophisticated, warm, direct. Write like an excellent teacher talking to a
capable adult who happens to be new to this. No hype, no emoji, no
exclamation marks, no "Let's dive in!". Be specific: name the real library,
the real error message, the real failure mode.

## Available widgets

See `WIDGET_IDS` in `src/types/curriculum.ts`. Use a widget only where it
genuinely aids understanding, and pass `props` only if obvious.
