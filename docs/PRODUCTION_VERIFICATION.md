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

---

## The distinction this document exists to keep

A 2xx from Resend's API means **the provider accepted the message for
delivery**. It does not mean the message reached an inbox. The two are
recorded separately below and must not be collapsed, because the failure
between them — accepted, then bounced — is silent by design: a send that
fails deliberately does not fail the signup it belongs to, so nothing in the
application or its logs would report it.

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
| Production responds | VERIFIED | Smoke suite against the live alias, all checks passing. |
| Deployed commit is the intended one | VERIFIED | Deploy workflow prints the commit and aliases it; no later deploy exists. |
| PostgreSQL read, write, persistence | VERIFIED | Smoke signs up, the row survives a logout and a fresh sign-in, and `/api/state` reads it back as JSON. |
| Security headers | VERIFIED | All six asserted on the live response, through Vercel's proxy. |
| Session cookie flags | VERIFIED | `HttpOnly`, `Secure`, `SameSite=Lax` observed live. |
| API authorisation | VERIFIED | `/api/state` 401 anonymous; cross-origin login 403. |
| No client-side secrets | VERIFIED | Landing HTML scanned live; client bundles scanned in the repository. |

### Mail

| Gate | Status | Evidence |
|---|---|---|
| Transport is a real provider in production | VERIFIED | `/api/health` on the live site reports `"email":"resend"`, and the smoke test fails the deploy if it reports anything else. |
| Resend accepts a real send | VERIFIED | A real signup on the live site triggers a verification email; the deploy then reads the runtime log and fails on a logged rejection. None has appeared. |
| Account-existence is not disclosed | VERIFIED | A reset request for an address with no account is answered identically to one that has. |
| Verification resend requires a session | VERIFIED | Anonymous `POST /api/auth/resend-verification` returns 401, so the endpoint is not an open mail-sending oracle. |
| Token handling: expiry, reuse, purpose, cross-account | VERIFIED | Unit and integration tests against a real database. |
| **Verification email arrives in an inbox** | **BLOCKED** | See below. |
| **Password-reset email arrives in an inbox** | **BLOCKED** | See below. |

### Container

| Gate | Status | Evidence |
|---|---|---|
| Image builds | VERIFIED | Built on a GitHub Actions runner by `.github/workflows/docker.yml`. |
| Image carries no credential | VERIFIED | The image environment is inspected for credential-bearing names, and the shipped files are scanned for the builder stage's placeholder. |
| Standalone server and assets present | VERIFIED | `server.js`, `.next/static`, `public` and the generated client are all checked inside the image. |
| Built for PostgreSQL | VERIFIED | The datasource provider is read back out of the image rather than assumed from the build argument. |
| Container starts and serves | VERIFIED | Runs against a throwaway Postgres service container; `/api/health` reports a healthy database. |
| Container writes to PostgreSQL | VERIFIED | A real signup through the real client returns 200 with an `HttpOnly` session cookie. |
| Image published to a registry | DESIGNED | Nothing pushes it anywhere; the build exists to prove the image is sound, not to distribute it. |

### Suites

| Gate | Status | Evidence |
|---|---|---|
| Unit and integration | VERIFIED | Run locally and in CI on every push. |
| End-to-end | VERIFIED | Against a production build rather than `next dev`, locally and in CI. |
| Curriculum integrity | VERIFIED | 214/214 units, 14/14 domains, and the quiz, flashcard and interview totals. |
| Accessibility | VERIFIED | axe, no serious violations, across the core pages and a lesson. |
| Responsive | VERIFIED | 320, 375, 390, 412, 768, 1024, 1280, 1440 — no horizontal scroll, heading visible. |
| Performance, live site | VERIFIED | Measured on the alias in a real Chromium, signed in and signed out. |
| Dependency audit | VERIFIED | `npm audit --omit=dev` reports zero vulnerabilities. |

---

## The blocked gates, in full

### Inbox receipt of the verification email

**What was tested.** A real account is created on the live site on every
deploy. The application sends its verification email through Resend, and the
deploy reads the deployment's runtime log afterwards and fails if the
application logged a rejection.

**Exact result.** Resend's API accepted the message. No rejection was logged.
`/api/health` reports the transport as `resend`, so the mail path is the real
one and not the console fallback.

**What remains unverified.** That a message arrives in a mailbox and that the
link inside it works when clicked. Acceptance and delivery are different
events, and the recipient the smoke test uses — an `@example.com` address —
is reserved and undeliverable by construction, so no amount of passing runs
can turn this into inbox evidence.

**Why it is blocked.** Verifying receipt requires a mailbox that this project
can read. There is none: no mailbox credential exists in the repository or the
environment, and none should be committed. The development environment also
has no outbound internet, so even a mailbox API could only be reached from a
CI runner.

**Exact action required to close it.** A person with a real mailbox performs
this once, on the live site:

1. Open `https://aiml-mastery.vercel.app/signup` and sign up with a real
   address you can read.
2. Confirm the message arrives. Check the sender is the configured
   `EMAIL_FROM` identity and the subject names the platform.
3. Click the verification link. It should land on the site and report the
   account verified; the unverified banner should then be gone from
   `/today`.
4. Sign out, open `https://aiml-mastery.vercel.app/forgot-password`, and
   request a reset for the same address.
5. Confirm that message arrives, click its link, set a new password that
   satisfies the policy, and sign in with it.

If step 2 or 5 produces nothing, the cause is almost certainly the sender
identity rather than the application: Resend only delivers to arbitrary
recipients from a **verified domain**, and its default
`onboarding@resend.dev` sender is restricted to the account owner's own
address. Check the domain's verification state in Resend and the `EMAIL_FROM`
value on the Vercel project.

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

## What this document is not

It is not a claim that the application is finished. It records what has been
observed. Where something has not been observed, it says so, and says what
would be required to observe it.
