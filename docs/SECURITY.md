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

Current limits: signup 5 per 15 minutes per client, login 10 per 10 minutes
per client, sync 120 per minute per user, tutor 60 per minute per user.

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

No secret is referenced in client code. `.env` is git-ignored and
`.env.example` documents what is needed. `AUTH_SECRET` must be replaced in
production — generate one with `openssl rand -base64 48`.

## Dependency advisories

`npm audit` is clean of runtime advisories. Two moderate advisories remain,
both in Vitest's mocking package, which is a development dependency that
never ships and only affects test files we author ourselves. `postcss` and
`deepmerge-ts` are pinned forward via `overrides` to clear the high-severity
advisories that reached us transitively through Next's bundled copy and the
Prisma CLI.

## Known limitations

- There is no email verification or password reset flow; both need an email
  provider, which this deployment does not have.
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
