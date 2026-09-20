# Security notes

## Threat model

The sensitive asset here is a learner's own progress. There is no payment
data, no third-party data and no multi-tenant sharing. The properties that
matter are: nobody else can read or alter your progress, you cannot fabricate
your own progress, and nothing you do on the platform can execute code on the
server.

## Authentication

- Passwords are hashed with bcrypt at cost 12.
- The policy is length-first (minimum 10 characters) rather than a symbol
  soup: long passphrases are both stronger and likelier to be remembered.
- Sessions are JWTs signed with HS256 via `jose`, in an `httpOnly`,
  `SameSite=Lax`, `Secure`-in-production cookie.
- A server-side `AuthSession` row backs every token, so signing out actually
  revokes rather than merely expiring. A replayed cookie is rejected.
- `AUTH_SECRET` is validated at startup; a missing or short key throws rather
  than silently signing with something weak.
- Login returns one generic message and performs a bcrypt comparison even
  when the account does not exist, so the endpoint cannot be used to
  enumerate accounts.

## Email verification and password reset

Both flows share one token layer, and two decisions carry the security.

**Only a SHA-256 hash of each token reaches the database.** The raw value
exists in exactly one place — the link in the email — so a database dump
cannot be replayed against these endpoints. That is the same reasoning behind
`passwordHash`; the difference is that these tokens carry 256 bits of
randomness and live for hours, so a fast hash is the right one. bcrypt here
would add latency to defend against a guessing attack that the entropy has
already made impossible.

**Spending a token is a conditional `updateMany`, not a read then a write.**
Two requests arriving with the same token race, and only the one whose update
reports a changed row proceeds. That is what makes "single use" true under
concurrency rather than merely usually.

Around those:

- Issuing a token invalidates any outstanding one for the same purpose, so a
  resend replaces the previous link rather than adding to a set of live
  credentials.
- A token minted for verification cannot be spent as a password reset, even
  though both live in one table.
- Verification links last 24 hours; reset links last one, because a reset link
  is a live credential for whoever holds it.
- `/api/auth/forgot-password` returns one fixed body whatever happened —
  including for a malformed address — so it cannot be used to test a scraped
  address list for membership. Its timing is deliberately *not* constant:
  making it so would mean doing identical work for a non-existent account,
  which means pretending to send. The rate limit is the honest control, and
  there are two of them: per client and per address, so one attacker cycling
  client identities cannot bombard one victim's inbox.
- `/api/auth/resend-verification` requires a session. An unauthenticated
  resend endpoint is an email-sending oracle: point it at any address and
  whether mail arrives confirms whether an account exists. Requiring a session
  removes the oracle, and the only person who needs a resend is already signed
  in, because signup creates a session before the address is confirmed.
- Completing a reset revokes every session in the same transaction that
  changes the password, including the current browser's. Somebody resetting a
  password has usually lost control of the account, and leaving a thirty-day
  cookie alive on an attacker's machine would make the reset cosmetic.
- Link URLs are built from `APP_URL`, never from the request `Host` header. A
  link built from an attacker-controlled `Host` is a redirect to the attacker
  with a live token attached.
- Neither a password nor a token is ever logged. A test asserts this by
  spying on every console method through a full signup, forgot and reset.

Verification does not gate the application. An unconfirmed account signs in
normally and sees a persistent banner with the resend action. A hard wall in
front of a study tool converts a mail-delivery problem into lost progress,
which is a worse failure than an unconfirmed address.

## AI answer evaluation

Optional, off by default, and structured so that its worst case is a useless
paragraph rather than a security event.

**The key never reaches the browser.** `src/lib/ai/provider.ts` is marked
`server-only`, so importing it from a client component is a build error rather
than a leak found later in a bundle. There is no `NEXT_PUBLIC_` counterpart.
A test walks every `.ts`/`.tsx` file under `src/` on each run and asserts that
no client component imports a server module, that no file outside
`lib/ai`/`lib/email` names a provider key, and that the key is read inside a
function rather than captured at module scope.

**Nothing the client sends is trusted.** The evaluation routes take a unit id
and an item index, look the question up in the curriculum on the server, and
ignore anything else in the body. There is no `userId` field — identity comes
from the session cookie. A client cannot submit its own question, its own
reference answer, or its own score; tests assert each of those is disregarded.

**The learner's answer is data, never instruction.** It is truncated to 6,000
characters, stripped of C0/C1 control characters and bidirectional overrides,
and fenced in a block whose id is random per request, so it cannot close its
own block by guessing the delimiter. Everything the model is told to *do* is
assembled on the server from constants and curriculum content.

None of that is the real defence. No sanitiser is airtight against a model
that is ultimately reading English, so the layer that actually holds is the
last one: the reply is parsed with a strict Zod schema into four bounded
integers and five length-capped strings, with unknown keys stripped. An
injection that fully succeeds can still only write text into a summary that is
then rendered, escaped, as the model's opinion. Anything that fails to parse
— prose, truncated JSON, an array, a score of 500, a 50,000-character field —
is discarded rather than patched, and the deterministic grade is returned
instead.

**It decides nothing.** Interview readiness is computed only from
self-assessed confidence, as before. The spaced-repetition scheduler is driven
only by the learner's known/again press: an evaluation writes no
`FlashcardReview` row, moves no next-review date, changes no review step and
awards no XP. Tests prove that negative by scheduling a card, evaluating it as
harshly as the checker can, and asserting every scheduling field is unchanged.

**It cannot be farmed or amplified.** Both routes are rate-limited per client
*and* per account — the account limit is the one that bounds upstream spend,
since rotating `X-Forwarded-For` defeats the client limit and a test
demonstrates that it does. An answer too short to grade never reaches the
provider at all. Stored evaluations are one row per `(user, target, unit,
item)` with an attempt counter, so a replayed request is a repeat rather than
a new row, and there is no `GET` route: the only way a stored evaluation
reaches a browser is in the response to the request that created it, so there
is no id to enumerate.

**Failure is ordinary.** Unavailable, timed out, rate-limited, unreachable and
unparseable each return the deterministic evaluation with a field naming what
happened. There is no path through the evaluator that produces nothing, and no
failure that costs a learner their place in a session.

## Authorisation

Every API route resolves the user from the session and scopes every query to
that `userId`. There is no endpoint that takes a user id from the request.

## CSRF

`SameSite=Lax` blocks the classic cross-site form post. Every mutating route
additionally checks that `Origin`, when present, matches `Host`.

## Rate limiting

Fixed-window, counted in the database rather than in process memory. The
in-memory version was correct for a single Node server and wrong for two:
each instance would keep its own Map, so N instances behind a load balancer
allow N times the intended limit — the control quietly not working rather
than failing loudly.

The store is the database the app already has; no Redis, no new service.
One row per key holds the window's end and a count, rewritten when the
window expires, so the table is proportional to active clients rather than
to total requests. `pruneRateLimits()` clears keys that have gone quiet and
is safe to call on any schedule, or never.

It fails open. If the store is unreachable the request is allowed, because a
limiter that rejects everything when its backend hiccups is a denial of
service on the application itself, and the endpoints behind it are already
authenticated and input-validated. That trade is deliberate.

Current limits:

| Endpoint | Limit |
|---|---|
| Signup | 5 per 15 min per client |
| Login | 10 per 10 min per client |
| Sync | 120 per min per user |
| Tutor | 60 per min per user |
| Forgot password | 5 per 15 min per client, and 3 per 15 min per address |
| Resend verification | 5 per 15 min per client, and 3 per 15 min per account |
| Verify email | 20 per 10 min per client |
| Reset password | 10 per 15 min per client |
| Answer evaluation | 40 per 10 min per client, and 30 per 10 min per account |

Where two limits are listed they apply together. The second one is not
redundant: a client limit cannot see an attacker rotating addresses, and an
address or account limit cannot see one client hammering many targets.

## Input validation

Every request body is parsed with a Zod schema before it reaches any logic.
The sync protocol carries *events*, not derived state: there is no field in
which a client could claim a score, a mastery level or an XP total. The
server re-grades every submitted answer against the real curriculum.

## Injection

All database access goes through Prisma's parameterised query builder; no raw
SQL is constructed anywhere. React escapes by default, and the three places
that use `dangerouslySetInnerHTML` are all server-generated from curriculum
source, never from user input:

- KaTeX output, rendered server-side from authored LaTeX
- syntax-highlighted code, HTML-escaped before any span is added
- the pre-paint theme script, a static string

## Executing learner code

The Python playground runs in Pyodide, inside a Web Worker, in the learner's
own browser, with a timeout and a Stop button. Nothing a learner writes is
ever sent to or executed on the server.

The SQL playground is a purpose-built interpreter over a fixed in-memory
sample dataset. It touches no real database.

## HTTP headers

`next.config.ts` sets a Content-Security-Policy that names the only two
external origins this app legitimately uses (Google Fonts, and jsDelivr for
the Pyodide runtime), plus `X-Content-Type-Options`, `X-Frame-Options: DENY`,
`Referrer-Policy`, `Permissions-Policy` and HSTS. API responses are
`no-store`.

## Secrets

No secret is referenced in client code, and a test enforces it rather than a
convention doing so (see *AI answer evaluation* above). `.env` is git-ignored;
`.env.example` lists variable names and placeholder values only, never a real
credential. `AUTH_SECRET` must be replaced in production — generate one with
`openssl rand -base64 48`.

Secrets live in the host's secret store, not in the repository, not in the
build output, and not in a log line. The email transport logs provider status
codes rather than response bodies, because a body can echo request content;
the AI provider does the same.

The `file` email transport, which writes messages to disk so an end-to-end
test can read its own inbox, refuses to activate when `NODE_ENV` is
`production` regardless of what the environment asks for.

## Dependency advisories

`npm audit` is clean of runtime advisories. Two moderate advisories remain,
both in Vitest's mocking package, which is a development dependency that
never ships and only affects test files we author ourselves. `postcss` and
`deepmerge-ts` are pinned forward via `overrides` to clear the high-severity
advisories that reached us transitively through Next's bundled copy and the
Prisma CLI.

## Known limitations

- Email delivery needs a provider. Without `RESEND_API_KEY` the console
  transport prints verification and reset links to the server log: correct for
  development and unusable for real users, who cannot read that log. The flows
  themselves are complete either way.
- AI evaluation needs `ANTHROPIC_API_KEY`. Without it the feature is
  deterministic rather than absent, and the UI attributes the difference.
- Quiz answers reach the browser for tests run in `immediate` mode, because
  per-question feedback is the point of that mode and a round trip per
  question would make it unusable. A learner willing to open devtools can
  therefore read an answer before submitting it. This is deliberate and
  bounded: the server still grades what was actually submitted, so the
  recorded result reflects real answers, and the spec's requirement is that
  completion cannot be marked *accidentally* — which evidence-based mastery
  enforces. A learner determined to deceive their own study tool is not a
  threat this design tries to stop.
- The syntax highlighter and KaTeX render to HTML via
  `dangerouslySetInnerHTML`. Both are fed curriculum source rather than
  learner input, and both are safe independently of that: every highlighter
  branch HTML-escapes its output, and KaTeX runs with `trust: false` so it
  cannot emit `\href` to a `javascript:` URL.
