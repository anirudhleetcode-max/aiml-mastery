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
through the GitHub API from inside the restricted environment. The blocker is
therefore not "deployment is impossible" but "four secrets have to be created
by a human", which is the list in the one-time setup above.

### What is verified, and what is not

| | Status |
|---|---|
| Production build (`npm run build`) | Verified — passes, and emits `.next/standalone`. |
| Standalone server starts and serves | Verified — `node .next/standalone/server.js` run directly: `/`, `/login`, `/signup` return 200; `/interview`, `/flashcards`, `/labs`, `/analytics` return 307 to `/login` signed out; a real signup wrote to the database and set a `Secure; HttpOnly; SameSite=lax` cookie; all six security headers present. Note that `next dev` overwrites `.next`, so build immediately before checking. |
| Full test suite | Verified — 730 unit/integration and 127 end-to-end, the latter against this same production server rather than `next dev`. |
| `./scripts/verify-all.sh --full` twice consecutively | Verified — 7/7 both runs. |
| Postgres provider switch | Verified mechanically — `scripts/db-provider.mjs` rewrites the schema in both directions and the build consumes it. **Not** verified against a real Postgres server, because none is reachable from here. |
| `Dockerfile` builds | **Not verified.** No Docker daemon in this environment. The build it runs is verified and the layout it copies matches what that build produces, but treat the first `docker build` as a step to watch. |
| Deployed to a public URL | **Not done.** Blocked as above, pending the four secrets. |
| Live smoke test | **Not run.** `scripts/smoke-production.mjs` is written and syntax-checked; it runs automatically as the last step of the Deploy workflow. |
