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

Fixed-window limits on sign-up (5 per 15 minutes per IP), login (10 per 10
minutes per IP), sync (120 per minute per user) and the tutor (60 per minute
per user). In-process by design — this runs as a single Node server, and
reaching for Redis here would be infrastructure without a purpose. The
interface is narrow enough that swapping in a shared store is a one-file
change.

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

- Rate limiting is per-process, so it would need a shared store behind more
  than one instance.
- There is no email verification or password reset flow; both need an email
  provider, which this deployment does not have.
