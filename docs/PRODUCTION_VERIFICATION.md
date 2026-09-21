# Production verification

What has actually been tested against the running system, what has only been
built, and what cannot be tested from here. Every row names its evidence so a
reader can check the claim rather than take it.

The categories are deliberately narrow:

| Category | Means |
|---|---|
| **VERIFIED** | Exercised directly, with a recorded result. |
| **BUILT** | Implemented and builds, but the runtime evidence is incomplete. |
| **DESIGNED** | The code exists and is reviewed, but nothing exercises it end to end. |
| **BLOCKED** | An external limitation prevents verification from here. |

Production URL: **https://aiml-mastery.vercel.app**
Verified at commit `8c1ba67`.

---

## The distinction this document exists to keep

A 2xx from Resend's API means **the provider accepted the message for
delivery**. It does not mean the message reached an inbox. The two are
recorded separately below and must not be collapsed, because the failure
between them — accepted, then bounced, or accepted and silently dropped — is
invisible from here by design: a send that fails deliberately does not fail
the signup it belongs to, so nothing in the application or its responses
would report it.

The production smoke test signs up `smoke-<timestamp>@example.com`.
`example.com` is reserved by RFC 2606 and accepts no mail, so that message
*cannot* reach an inbox. That is correct for a test that runs on every deploy
— it must not send real mail to anyone — but it means the smoke test can
never be the evidence for inbox delivery, no matter how many times it passes.

---

## Matrix

### Deployment and platform

| Gate | Status | Evidence |
|---|---|---|
| Production responds | VERIFIED | 39/39 smoke checks against the live alias — run [35633264735](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35633264735). |
| Deployed commit is the intended one | VERIFIED | Deploy run [35552920505](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35552920505) for `21a8b8b`; `git diff 21a8b8b..HEAD -- src/ prisma/ package.json package-lock.json next.config.ts` is empty, so no later commit changes the deployed artifact. |
| PostgreSQL read, write, persistence | VERIFIED | Smoke signs up, the row survives a logout and a fresh sign-in, and `/api/state` reads it back as JSON. |
| Database reachable from the deployment | VERIFIED | `/api/health` on the live site reports `"database":"ok"`. |
| Security headers | VERIFIED | All six asserted on the live response, through Vercel's proxy. |
| Session cookie flags | VERIFIED | `HttpOnly`, `Secure`, `SameSite=Lax` observed live. |
| API authorisation | VERIFIED | `/api/state` 401 anonymous; cross-origin login 403. |
| No client-side secrets | VERIFIED | Landing HTML scanned live; client bundles scanned in the repository. |
| Unknown route handling | VERIFIED | 404 rather than a stack trace. |

### Mail

| Gate | Status | Evidence |
|---|---|---|
| Transport is a real provider in production | VERIFIED | `/api/health` reports `"email":"resend"`, and the smoke test fails the deploy if it reports anything else. |
| The production API key is valid | VERIFIED | Run [35634577053](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35634577053): the provider answers `restricted_api_key`, which is a valid key scoped to sending only — not a rejected one. |
| Resend accepts a real send | VERIFIED | A real signup on the live site triggers a verification email; the deploy then reads the runtime log and fails on a logged rejection. None has appeared. |
| Account-existence is not disclosed | VERIFIED | A reset request for an address with no account is answered identically to one that has: `200 {"status":"sent", …}`. |
| Verification resend requires a session | VERIFIED | Anonymous `POST /api/auth/resend-verification` returns 401, so the endpoint is not an open mail-sending oracle. |
| Failed delivery does not fail the request | VERIFIED | Covered by unit tests against a failing transport; the route returns 200 and logs the failure. |
| No secret in mail-path responses or logs | VERIFIED | The provider's body is never echoed — only its status. The reset response never contains the token. |
| Token handling: expiry, reuse, purpose, cross-account | VERIFIED | Unit and integration tests against a real database. |
| **Sender is on a verified domain** | **BLOCKED** | The production key is send-only and cannot read the account's domains. See below. |
| **Verification email arrives in an inbox** | **BLOCKED** | See below. |
| **Password-reset email arrives in an inbox** | **BLOCKED** | See below. |

### Container

| Gate | Status | Evidence |
|---|---|---|
| Image builds | VERIFIED | Run [35634244665](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35634244665), all 18 steps green. |
| Image carries no credential in its environment | VERIFIED | `docker image inspect` is searched for `AUTH_SECRET`, `DATABASE_URL`, `RESEND_API_KEY`, `ANTHROPIC_API_KEY`, `EMAIL_FROM`. None is present. |
| The builder's placeholder secret does not ship | VERIFIED | `/app` is scanned inside the image for the builder stage's placeholder `AUTH_SECRET`. Not found. |
| No secret-bearing file was copied in | VERIFIED | `/app` is searched for `.env*`, `*.pem`, `*.key`, `*.p12`, `*.pfx`, `id_rsa*`, `id_ed25519*`, `.npmrc`, `.netrc`, `*.db`, `.vercel`, `.git` — none present — and then by content for a Resend or Anthropic key prefix, a PEM private-key header, and a Postgres URL carrying a password. |
| Standalone server and assets present | VERIFIED | `server.js`, `.next/static`, `public` and the generated client are all checked inside the image. |
| Built for PostgreSQL | VERIFIED | The datasource provider is read back out of the image rather than assumed from the build argument. |
| Container starts and serves | VERIFIED | The container's own log: `- Network: http://0.0.0.0:3000` / `✓ Ready in 112ms`. |
| Health endpoint responds from inside the container | VERIFIED | `GET /api/health` returns `"ok":true`, `"database":"ok"` against a throwaway Postgres service container. |
| Container writes to PostgreSQL | VERIFIED | A real signup through the real client returns 200 with an `HttpOnly` session cookie. |
| Container still refuses an anonymous caller | VERIFIED | `GET /api/state` returns 401. |
| Image published to a registry | DESIGNED | Nothing pushes it anywhere; the build exists to prove the image is sound, not to distribute it. |

### Suites

| Gate | Status | Evidence |
|---|---|---|
| Unit and integration | VERIFIED | 740/740 in 22 files, locally at `8c1ba67`; green in CI on every push. |
| End-to-end | VERIFIED | 137/137 against a production build rather than `next dev`. |
| Typecheck, lint, contrast, curriculum integrity | VERIFIED | All four green in the same run. |
| Production build | VERIFIED | `npm run build` completes; 16 static pages generated. |
| Accessibility | VERIFIED | axe, no serious violations, across the core pages and a lesson. |
| Responsive | VERIFIED | 320, 375, 390, 412, 768, 1024, 1280, 1440 — no horizontal scroll, heading visible. |
| Performance, live site | VERIFIED | Measured on the alias in a real Chromium, signed in and signed out. |
| Dependency audit | VERIFIED | `npm audit --omit=dev` reports zero vulnerabilities. |

---

## The blocked gates, in full

### Sender identity: is the domain verified?

**What was tested.** `scripts/email-delivery.mjs --config-only`, run against
production's own `RESEND_API_KEY` and `EMAIL_FROM`, asks the provider for the
account's domains and compares them against the configured sender. It sends
nothing.

**Exact result.** Run
[35634577053](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35634577053):

```
PASS     the API key is accepted by the provider — the key is valid and
         scoped to sending only, so it is refused on management endpoints
         by design
BLOCKED  the configured sender is on a verified domain — a send-only key
         cannot read the account's domains
```

**What remains unverified.** Whether the configured sender is on a domain the
Resend account has verified. This matters more than it sounds: Resend
delivers to an arbitrary recipient only from a **verified domain**, and its
shared `onboarding@resend.dev` sender is restricted to the account owner's own
address. A deployment configured with the latter accepts every send, returns
2xx for every one of them, and delivers to nobody else — which from outside is
indistinguishable from a deployment that works. It is the single most likely
cause if the inbox checks below ever come back empty.

**Exact action required to close it.** Either check the domain's state in the
Resend dashboard directly, or add a full-access Resend key as a repository
secret for this job alone and re-run the Email delivery workflow with no
recipient. The production key must stay send-only; a deployment has no reason
to be able to read or alter its provider account.

### Inbox receipt of the verification and reset emails

**What was tested.** Two separate paths, deliberately not conflated:

1. A real account is created on the live site on every deploy. The application
   sends its verification email through Resend, and the deploy reads the
   deployment's runtime log afterwards and fails if the application logged a
   rejection.
2. `scripts/email-delivery.mjs` (the Email delivery workflow) sends through
   Resend with the deployment's own key and sender identity, polls the message
   until the provider reports a terminal event, then drives the deployed
   application's own signup and reset endpoints for the same address, then
   reads the mailbox over IMAP, extracts the link, and opens it.

**Exact result.** Path 1: Resend's API accepted the message; no rejection was
logged; `/api/health` reports the transport as `resend`, so the mail path is
the real one and not the console fallback. Path 2: stages 1 and 2 need a
recipient and stage 4 needs a mailbox; the job has been run only in
`--config-only` mode, because neither a recipient address nor mailbox
credentials exist for this project.

**What remains unverified.** That a message arrives in a mailbox, and that the
link inside it works when clicked. Acceptance and delivery are different
events. The recipient the smoke test uses is reserved and undeliverable by
construction, so no number of passing smoke runs can turn this into inbox
evidence.

**Why it is blocked.** Verifying receipt requires a mailbox this project can
read. There is none: no mailbox credential exists in the repository or the
environment, and none should be committed. The development environment also
has no outbound internet, so even a mailbox API could only be reached from a
CI runner.

**Exact action required to close it — automated.** Add these repository
secrets and dispatch the **Email delivery** workflow with a `recipient`:

| Secret | Value |
|---|---|
| `IMAP_HOST` | the mailbox's IMAP server, e.g. `imap.gmail.com` |
| `IMAP_PORT` | optional, defaults to `993` |
| `IMAP_USER` | optional, defaults to the recipient address |
| `IMAP_PASSWORD` | an app password for that mailbox, never the account password |

The job then verifies acceptance, the provider's delivery event, the
application's own send, actual receipt in the inbox *or the junk folder*, and
that the link in the received message opens. Nothing it prints contains a
credential, a message body, or an unmasked token.

**Exact action required to close it — by hand.** A person with a real mailbox
performs this once, on the live site:

1. Open `https://aiml-mastery.vercel.app/signup` and sign up with a real
   address you can read.
2. Confirm the message arrives. Check the sender is the configured
   `EMAIL_FROM` identity and the subject is `Confirm your email — AI/ML
   Mastery`.
3. Click the verification link. It should land on the site and report the
   account verified; the unverified banner should then be gone from `/today`.
4. Sign out, open `https://aiml-mastery.vercel.app/forgot-password`, and
   request a reset for the same address.
5. Confirm that message arrives with the subject `Reset your password — AI/ML
   Mastery`, click its link, set a new password that satisfies the policy, and
   sign in with it.

If step 2 or 5 produces nothing, look at the sender identity before looking at
the application — see the blocked gate above.

Do not paste the message, the link, or the token anywhere — the link is a
single-use credential for that account.

### Registry publication of the image

**What was tested.** The image builds, starts, connects to PostgreSQL, serves
a healthy `/api/health`, and completes a real signup.

**What remains unverified.** Nothing publishes it, so no pull-and-run of a
distributed artifact has been exercised.

**Exact action required to close it.** Add a push step to
`.github/workflows/docker.yml` with registry credentials, then pull the
published tag on a clean host and repeat the runtime checks the workflow
already performs.

---

## A note on flaky tests

None were found in the suites themselves. One false alarm was produced and is
recorded here because the failure mode is worth knowing: a verification run
that reported 8 failures across the SQLite-backed test files — socket
timeouts, and one `attempt to write a readonly database` — turned out to be
two copies of the full suite running at once against the same working tree,
launched by mistake into the same log. Re-run once, on the same commit with
nothing else running, the suite is 740/740.

The signature of that mistake is worth recognising: two different totals for
the same run in one log, and the same test index reported twice with different
durations. Neither result was a product defect and neither was reported as
one.

---

## What this document is not

It is not a claim that the application is finished. It records what has been
observed. Where something has not been observed, it says so, and says what
would be required to observe it.
