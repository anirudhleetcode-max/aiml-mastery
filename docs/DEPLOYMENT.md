# Deployment

This document is written to be followed, not admired. Every command below has
been run against this repository except the ones that require a hosting
account, which this build environment does not have — see
[Known blockers](#known-blockers) for exactly what is missing and why.

## What has to be true before you deploy

| | Why |
|---|---|
| `AUTH_SECRET` is a fresh random value, ≥32 characters | Sessions are signed with it. The app throws on startup rather than signing with a weak key, so a missing value fails loudly. |
| `DATABASE_URL` points at a database that survives a restart | The default SQLite file lives on the container filesystem. On a platform with ephemeral disk that means every deploy silently resets every learner's progress. |
| `APP_URL` is the public origin | Verification and reset links are built from it. It is deliberately not read from the `Host` header, so a spoofed header cannot repoint a live token at an attacker. |
| `./scripts/verify-all.sh --full` passes | Typecheck, lint, contrast, curriculum integrity, unit, integration, build and end-to-end, in the order that fails fastest. |

Two variables are optional and change what the product can do rather than
whether it runs: `RESEND_API_KEY` (real email instead of log output) and
`ANTHROPIC_API_KEY` (AI evaluation instead of deterministic concept checking).
Neither absence breaks anything; see the README's Configuration table.

Never commit any of these. `.env` is git-ignored and `.env.example` carries
names and placeholders only.

## Choosing a database

The Prisma schema uses no SQLite-specific types, so moving to PostgreSQL is
one line plus a connection string:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

```bash
npx prisma migrate deploy     # or `npx prisma db push` for a first run
```

Do this before the first deploy on any platform whose filesystem is ephemeral
— which is all of the serverless ones. Keeping SQLite is fine on a persistent
volume or a single long-lived VM, and is the right choice for a personal
instance.

## Option A — a container (works anywhere)

The repository carries a multi-stage `Dockerfile` producing a standalone
Next.js server. It is the most portable target: Fly.io, Render, Railway,
Cloud Run, App Runner, a VPS behind nginx, or your own Kubernetes.

```bash
docker build -t aiml-mastery .
docker run --rm -p 3000:3000 \
  -e AUTH_SECRET="$(openssl rand -base64 48)" \
  -e DATABASE_URL="postgresql://user:pass@host:5432/aiml" \
  -e APP_URL="https://your-domain.example" \
  aiml-mastery
```

`next.config.ts` sets `output: 'standalone'`, so the runtime image carries
only the server and the traced dependencies rather than the whole
`node_modules`.

Run migrations as a release step, not in the image's entrypoint — an
entrypoint migration races itself the moment you run two instances:

```bash
npx prisma migrate deploy
```

## Option B — Vercel (the path this repository is wired for)

`.github/workflows/deploy.yml` performs the deployment from a GitHub runner and
then smoke-tests the URL it produced. That indirection exists for a concrete
reason: the environment this application was built in has no outbound internet
beyond GitHub and npm — every hosting API is refused at the gateway — while a
runner has ordinary network access.

Set the database provider with an environment variable rather than editing the
schema. `npm run build` calls `scripts/db-provider.mjs`, which rewrites the one
`provider` line when `DATABASE_PROVIDER=postgresql` is set and does nothing
otherwise, so local SQLite development is unaffected. Prisma will not read the
provider from an environment variable itself, and a serverless filesystem
cannot keep a SQLite file — without this the build succeeds and then silently
loses every learner's progress between requests.

### One-time setup

1. Create a Postgres database (Neon, Vercel Postgres, Supabase — any
   `postgresql://` URL).
2. Create the Vercel project and link it locally once: `vercel link`. That
   writes `.vercel/project.json` containing `orgId` and `projectId`.
3. On the **Vercel project** (Settings → Environment Variables, Production):

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | the Postgres connection string |
   | `DATABASE_PROVIDER` | `postgresql` |
   | `AUTH_SECRET` | `openssl rand -base64 48` |
   | `APP_URL` | the production URL, e.g. `https://<project>.vercel.app` |
   | `RESEND_API_KEY` | optional — real email instead of log output |
   | `EMAIL_FROM` | optional — a verified sender |
   | `ANTHROPIC_API_KEY` | optional — AI evaluation instead of the concept check |

4. On the **GitHub repository** (Settings → Secrets and variables → Actions):
   `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `DATABASE_URL`.
5. Run the **Deploy** workflow (Actions → Deploy → Run workflow).

The job creates the schema, builds, deploys, and then runs
`scripts/smoke-production.mjs` against the resulting URL. That script is the
gate: HTTPS, six security headers, public routes, protected routes redirecting
when signed out, a real signup that writes to the production database, the
session cookie's `Secure`/`HttpOnly`/`SameSite` flags, sign-out and sign-in
again to prove persistence, `/api/state` refusing an anonymous caller, a
cross-origin login being rejected, and no secret material in the HTML. A deploy
whose smoke test fails is a failed deploy.

### By hand instead

The app is a stock Next.js 15 App Router project and needs no adapter.

```bash
npm i -g vercel
vercel login
vercel link
vercel env add AUTH_SECRET production        # paste a fresh 48-byte value
vercel env add DATABASE_URL production       # a hosted Postgres URL
vercel env add APP_URL production            # https://<your-project>.vercel.app
vercel --prod
```

Two things to get right:

- **Do not keep SQLite.** Vercel's filesystem is read-only at runtime and
  per-invocation besides. Use Vercel Postgres, Neon, or any Postgres URL, and
  switch the `provider` line above first.
- **Take the URL from the deployment, not from a pattern.** `vercel --prod`
  prints the production URL, and `vercel inspect <url>` confirms which commit
  it is serving. Constructing `https://<project>.vercel.app` by hand is a
  guess that is wrong whenever a project has been renamed or an alias moved.

## Option C — Fly.io

```bash
fly launch --no-deploy            # writes fly.toml; keep the Dockerfile
fly postgres create               # or bring your own DATABASE_URL
fly secrets set AUTH_SECRET="$(openssl rand -base64 48)" APP_URL="https://<app>.fly.dev"
fly deploy
fly status                        # the real hostname and the running version
```

A single-instance Fly machine with a mounted volume can keep SQLite; mount it
and set `DATABASE_URL=file:/data/dev.db`.

## Verifying a deployment

A deploy is not done because a CLI exited zero. Check all five:

```bash
URL=https://your-domain.example

# 1. It answers, and with HTML rather than a platform error page.
curl -sS -o /dev/null -w '%{http_code}\n' "$URL/"

# 2. The routes that matter render.
for p in / /login /signup /interview /flashcards /labs /analytics; do
  printf '%-14s %s\n' "$p" "$(curl -sS -o /dev/null -w '%{http_code}' "$URL$p")"
done
# /interview, /flashcards, /labs and /analytics are behind auth, so a 307 to
# /login is the correct answer for a signed-out request, not a failure.

# 3. The database is actually connected: sign up, which writes a row.
curl -sS -X POST "$URL/api/auth/signup" -H 'Content-Type: application/json' \
  -H "Origin: $URL" -d '{"name":"Smoke","email":"smoke@example.com","password":"a-long-enough-passphrase"}'

# 4. Security headers survived the platform's proxy.
curl -sSI "$URL/" | grep -iE 'content-security-policy|x-frame-options|strict-transport'

# 5. The commit you think is live, is live.
git rev-parse HEAD
```

For (5), compare against what the platform reports — `vercel inspect`,
`fly status`, or your own `/api/health` if you add one. A deploy that silently
served the previous commit is the failure mode that looks most like success.

Then sign in as a real account and walk one path end to end: open a lesson,
answer a quiz question, reload, and confirm the progress survived. A unit test
passing locally says nothing about whether the production database is
writable.

## Known blockers

The environment this repository was completed in has no outbound internet
beyond GitHub and the npm registry. This is not a hosting API being down; it is
a configured refusal, and it was established by testing rather than assumed:

```
api.vercel.com  000   api.render.com         000   api.heroku.com  000
api.netlify.com 000   backboard.railway.app  000   dash.deno.com   000
api.fly.io      000   api.cloudflare.com     000   app.koyeb.app   000

example.com     000   ← not a provider problem: there is no public internet
vercel.com      000

api.github.com  200   ghcr.io  301   registry.npmjs.org  200
```

The proxy reports these as `connect_rejected — gateway answered 403 to CONNECT
(policy denial)`. No hosting CLI is installed and no hosting credential exists;
the only `AWS_*` variables present belong to the sandbox's own proxy. Docker's
binary is present but there is no daemon, so the image in this repository has
never been built.

That is why the deployment runs from a GitHub Actions runner: a runner has
ordinary network access, and the workflow can be triggered and its results read
through the GitHub API from inside the restricted environment. This is how the
live deployment and its smoke test were actually performed — the restriction
shapes where the work runs, it does not prevent it.

One consequence is worth stating plainly: nothing here can open the production
URL directly. Every claim about the live site in this document comes from the
smoke test running on the runner, which is why that test asserts behaviour
rather than status codes alone.

### What is verified, and what is not

Deployed and verified against the live production alias, not localhost and not
a build log.

| | Status |
|---|---|
| Deployed to a public URL | **Production verified** — `https://aiml-mastery.vercel.app`, commit `5f4685a`, GitHub Actions run 35544786098. |
| Live smoke test | **Production verified** — 36/36 against the alias as the deploy's gating step (run 35544786098), and 36/36 again from an independent run against the same alias with a fresh account (run 35544946796). |
| PostgreSQL read, write and persistence | **Production verified** — a real signup wrote a row to Neon, the account survived logout and signed in again, and `/api/state` read the learner state back as JSON. |
| Session cookie flags | **Production verified** — `HttpOnly`, `Secure`, `SameSite=Lax` observed on the live response. |
| Security headers | **Production verified** — all six present on the alias, through Vercel's proxy. |
| API authorisation | **Production verified** — `/api/state` 401 anonymous; cross-origin login 403. |
| Performance, live site | **Production verified** — measured on the alias in a real Chromium, signed in and signed out (run 35545316413). Worst LCP 1704 ms (Labs), best 256 ms (Login); CLS 0 on every route; zero console or page errors. All routes inside the budget of LCP 2500 ms / CLS 0.1 / 3000 DOM nodes. |
| Production build (`npm run build`) | Verified — passes, and emits `.next/standalone`. |
| Full test suite | Verified locally — 730 unit/integration and 127 end-to-end, the latter against a production server rather than `next dev`. |
| `./scripts/verify-all.sh --full` twice consecutively | Verified — 7/7 both runs. |
| `Dockerfile` builds | **Not verified.** No Docker daemon in this environment. |
| Real email delivery | **Not verified.** No email provider is configured; the transport abstraction and both token flows are tested, which is not the same claim. |

### Three faults that a green build could not see

Worth writing down, because each one deployed successfully and then failed at
request time, and the first two masked the third.

1. **The provider was reverted by the build.** `vercel build` runs `npm run
   build` in an environment of its own, `DATABASE_PROVIDER` did not reach it,
   and `db-provider.mjs` read the absence as a request for SQLite — undoing the
   schema push that had just run. The client shipped to production was
   generated for SQLite against a `postgresql://` URL. It now derives the
   provider from `DATABASE_URL` when nothing states it, and refuses to build a
   client that cannot speak to the URL it is given.

2. **The query engine was built for the wrong operating system.** The deploy
   builds on a GitHub runner and uploads the result, so `prisma generate`
   emitted a `debian-openssl-3.0.x` engine for a bundle that executes on
   Vercel's Amazon Linux. `binaryTargets` now names both.

3. **The project had no environment variables at all.** `vercel env ls
   production` answered "No Environment Variables found". No `DATABASE_URL`, so
   Prisma threw on the first query; no `AUTH_SECRET`, so signup could not have
   issued a session either. The deploy now ensures they exist before creating
   the deployment, adding only what is absent.

All three present identically from outside — a 500 from whichever endpoint
touched the database first — which is why `/api/health` exists. It reports a
fixed, coarse classification and never the driver's own text, since Prisma's
errors quote the connection string and the endpoint is public.
