# AI/ML Mastery

A complete, adaptive learning platform that takes a beginner from their first
Python variable to building and explaining Generative AI systems — **214
structured learning units across 14 domains**, with daily tests, interactive
laboratories, spaced revision and evidence-based mastery tracking.

The curriculum runs **20 September 2026 → 31 December 2026**: 103 days.

---

## What this actually is

Most courses hand you a list of topics. This is built around a single claim:

> If you can teach it to a nine-year-old, you understand it. If you cannot,
> you have memorised it.

Every one of the 214 units follows the same arc, and the platform is built to
enforce it:

1. **What is it?** — plain language. No unit opens with an equation.
2. **Why does it exist?** — what was painful before someone invented this.
3. **Analogy** — a story, with an explicit map back to the technical concept
   and an honest statement of where the analogy breaks down.
4. **Visual intuition** — see the mechanism move.
5. **The mathematics** — now the symbols name things you already understand.
   Every variable is explained.
6. **Worked example** — real numbers you can check by hand.
7. **Code** — runnable, with output and an explanation of *why*.
8. **Common mistakes** — the specific ways this goes wrong in practice.
9. **Interview perspective** — what a strong answer sounds like.
10. **Practice and test** — evidence, not a checkbox.
11. **Teach it back** — the last step, because it is the real one.

Beyond the lessons, four surfaces practise the same material in the forms an
interview and a job actually demand:

- **Interview preparation** — the curriculum's 660 questions as one bank,
  filterable by seniority and domain, with sessions ordered by what you have
  struggled with. The model answer stays hidden until you ask for it, because
  recognising a good answer is not what an interview measures. Readiness is
  computed from verdicts you recorded, so it starts at zero. You can also
  write an answer out and have it checked before revealing anything — see
  [Answer evaluation](#answer-evaluation).
- **Flashcards** — each verdict schedules the card on the same ladder unit
  review uses; a card you could not recall comes back tomorrow. A typed recall
  can be checked first, but the checker only ever offers an opinion: your
  known/again press is what moves the schedule.
- **Labs** — 39 interactive instruments, each with an ordered investigation
  naming a specific manipulation and the specific thing it should produce. A
  lab closes only once every step is ticked, and the server re-checks the set.
- **Teacher mode** — explain a unit in your own words and get per-point
  feedback on what you covered and what you missed.

## Quick start

```bash
npm install
npm run setup     # generate the Prisma client, create the database, seed demo data
npm run dev       # http://localhost:3000
```

The demo account is printed by the seed step:

```
demo@aimlmastery.app  /  demolearner2026
```

It has ~47 units completed, roughly 12,700 XP and a 12-day streak, so every chart and
report has something real in it. Production users always start from zero.

### Configuration

Copy `.env.example` to `.env` and fill it in. Only two variables are required;
the rest turn optional features on.

| Variable | Required | What it does |
|---|---|---|
| `DATABASE_URL` | yes | Prisma connection string. `file:./dev.db` for SQLite. |
| `AUTH_SECRET` | yes | Signing key for session cookies. At least 32 characters — generate with `openssl rand -base64 48`. |
| `APP_URL` | in production | Absolute base URL used to build links in emails. Read from configuration rather than the request `Host` header, so a spoofed `Host` cannot repoint a reset link. |
| `EMAIL_TRANSPORT` | no | `console` (default) prints messages to the server log; `resend` sends them. Inferred as `resend` when `RESEND_API_KEY` is set. |
| `RESEND_API_KEY` | no | API key from resend.com. Without it, verification and reset links appear in the server log and the flows still work end to end. |
| `EMAIL_FROM` | no | Sender address. Must be verified at the provider. |
| `ANTHROPIC_API_KEY` | no | Turns on AI answer evaluation. Without it, evaluation falls back to deterministic concept checking — see below. |
| `ANTHROPIC_MODEL` | no | Overrides the evaluation model. |

No secret is ever exposed to the browser. There is no `NEXT_PUBLIC_` variable
holding a key, the modules that read these are marked `server-only`, and a
test walks the source tree on every run to prove both.

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit and integration tests |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run curriculum:verify` | Curriculum integrity gate |
| `npm run curriculum:verify -- --stats` | Per-domain curriculum statistics |
| `npm run check:contrast` | WCAG AA gate on the UI design tokens |
| `npm run test:a11y` | Playwright + axe accessibility checks |
| `npm run perf` | Performance audit against a running build |
| `npm run verify` | Typecheck, lint, contrast, curriculum, tests |
| `./scripts/verify-all.sh --full` | The above, plus build and end-to-end |
| `docker build -t aiml-mastery .` | Container image — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| `npm run db:reset` | Drop, recreate and reseed the database |

## Architecture

```
src/
  app/
    (marketing)   the landing page
    (auth)        sign in, sign up
    (app)         the authenticated product
    api/          auth, sync, tutor, search, curriculum
  components/
    ui/           accessible primitives
    charts/       validated data visualisation
    viz/widgets/  58 interactive teaching widgets
    lesson/       the lesson player
    testing/      the assessment engine
  features/       pure domain logic — no UI, fully unit-tested
    xp/ progress/ streak/ scheduling/ testing/ revision/ teaching/ tutor/
  data/
    curriculum/   the 214 units, one file per domain
    domains.ts    the 14 domains and the unit allocation
    labs.ts       the interactive laboratories
  lib/
    auth/ db/ sync/ store/ ai/ email/
```

`features/evaluation/` holds the answer evaluator: question classification,
deterministic concept grading, the schema the model's reply must satisfy, and
the curriculum word-frequency pass that decides which words are concepts.
`lib/ai/` and `lib/email/` are the two seams that reach outside the process,
both marked `server-only`.

Two rules keep this maintainable:

- **Curriculum content is data, never UI.** No lesson text lives in a React
  component. Editing a lesson never means touching code.
- **Domain logic is pure.** Everything in `src/features/` is testable without a
  browser, a database or a network.

### The write path

There is exactly one endpoint that changes anything: `POST /api/sync`. It
accepts a batch of *events* — what the learner did — and never derived state.

- The client cannot report a score. The protocol has no field for one. The
  server re-grades every answer against the real curriculum.
- Events are idempotent by `(userId, eventId)` and applied in a single
  transaction, so a replayed offline batch lands exactly once.
- The client keeps a durable queue in `localStorage` and flushes on reconnect,
  visibility change and `pagehide`. A test finished on a dropped connection is
  not lost.

### Mastery is earned

Opening a lesson can only ever reach level 1. Every level above requires a
recorded artefact:

| Level | Requires |
|---|---|
| Introduced | Read the lesson through |
| Understood | 70%+ on the unit check |
| Practiced | Practice exercises completed |
| Proficient | 85%+ on a full test |
| Mastered | Held that score on a second attempt, or solved the challenge |
| Teacher | Explained it clearly, unaided, in your own words |

## Curriculum integrity

`npm run curriculum:verify` is a build gate, not a linter. It checks
**structure** (exactly 214 units, sequential ids, unique slugs, every
prerequisite resolving to a unit that appears earlier — which rules out cycles
and forward references in one check) *and* **substance**: minimum authored
content in every field, at least five quiz questions mixing at least two
formats, every quiz explanation present, every analogy carrying an explicit
bridge back to the concept, and no stub copy anywhere.

That is what makes "214 real units" a property of the build rather than a claim
in a README.

## Technology

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Prisma · SQLite · Recharts · three.js / React Three Fiber · KaTeX · Zustand ·
Zod · Vitest · Playwright.

Both external services — the email provider and the evaluation model — are
reached over `fetch` behind a small internal seam, with no SDK, a timeout and
a typed failure result. Neither is required to run the platform.

### Switching to PostgreSQL

The schema uses no SQLite-specific types. Change one line in
`prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

point `DATABASE_URL` at your server, and run `npx prisma migrate dev`.

## Design decisions worth knowing

**Charts are validated, not eyeballed.** The categorical palette was run
through a colour checker for lightness band, chroma floor, colour-vision-
deficiency separation, a normal-vision floor and contrast against both
surfaces, and passes all-pairs in light and dark. One measure per axis — never
a dual-axis chart. Nominal bars take a single hue, because bar length already
encodes the value. Every chart has a table view.

**The tutor is retrieval, not generation.** It identifies what you are asking,
finds the right unit, and answers from that unit's authored content, citing
its source. It cannot hallucinate, and when a concept is not in the curriculum
it says so instead of inventing an answer.

**Teach-back feedback is transparent.** It measures coverage against the
unit's own "must cover" points and reports exactly which ones you hit and
missed. It measures structure and coverage, not eloquence, and the UI says so.

**Gamification without dark patterns.** XP has a floor of zero — penalties
reduce it, never below. Discipline is tracked separately from XP, so a bad week
does not erase a good month. Streaks come with two freezes. Notifications are
capped at one of a kind per day by a database constraint, not by good
intentions.

**Learner code never runs on the server.** The Python playground executes in
Pyodide inside a Web Worker in the learner's own browser, with a timeout.

## Answer evaluation

Two surfaces let you write an answer out and have it checked: an interview
question before you reveal the model answer, and a flashcard before you flip
it. Both are optional, and both are advisory.

**Deterministic first, model second.** Every evaluation starts by classifying
the question from curriculum text alone — conceptual, coding, mathematical,
system design, behavioural, ML theory, SQL, debugging or explanation — and
then grading the answer against the concepts the reference answer relies on.
Only where the reasoning *between* the concepts is the point does a language
model get asked to refine that result, and only if one is configured. With no
`ANTHROPIC_API_KEY` the feature is not disabled; it is deterministic, and the
UI says which of the two produced what you are reading.

Working out which words in a reference answer are concepts turned out to be
the hard part. Term frequency picks whatever the answer repeats. Document
frequency across the 214 units separates "value" from "bytecode" but not
"tight" from "eigenvector", since both are rare here. What works is the unit's
own framing: a concept the reference leans on is named somewhere in the unit
that teaches it, and the incidental prose of one answer is not.

**Your answer is data, never instruction.** It is length-capped, stripped of
control and bidirectional-override characters, and fenced with a random
per-request id so it cannot close its own block; everything the model is told
to *do* is assembled on the server from constants and curriculum content. None
of that is the real defence, because no sanitiser is airtight against a model
reading English — the defence is that the reply is parsed against a strict
schema into a handful of bounded fields. An injection that fully succeeds can
still only write text into a summary that is then displayed as the model's
opinion. Anything that fails to parse is discarded, not patched.

**It cannot decide anything.** Interview readiness is still computed only from
the confidence you recorded. The spaced-repetition scheduler is still driven
only by your known/again press: evaluating a card writes no review row, moves
no next-review date and awards no XP. Tests assert that negative directly.

**It cannot break a session.** Unavailable, timed out, rate-limited,
unreachable and unparseable all return the deterministic evaluation with a
note saying which happened.

## Deploying

Live at **https://aiml-mastery.vercel.app**, on Vercel with a Neon PostgreSQL
database, deployed by `.github/workflows/deploy.yml` and gated on
`scripts/smoke-production.mjs` — a deploy whose smoke test fails is a failed
deploy. The smoke test exercises the live alias rather than inspecting a build
log: it signs up, checks the row survives a logout and a fresh sign-in, reads
the learner state back, and asserts the cookie flags and security headers on
the response the platform's proxy actually returns.

[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) covers three targets — a container
(portable anywhere), Vercel, and Fly.io — with the environment each needs, the
one-line change from SQLite to PostgreSQL, a verification that does not accept
"the CLI exited zero" as evidence, and a table separating what the live site
has proved from what has only been checked locally.

## Accessibility

Keyboard navigation throughout (roving tabindex on tab lists, focus trapping in
dialogs, a skip link), real labels on every control, ARIA roles where a role is
implied, a table alternative for every chart, a list alternative for the
knowledge graph, and user-controlled reduced motion, high contrast, font
scaling and theme — applied before first paint so nothing flashes.
