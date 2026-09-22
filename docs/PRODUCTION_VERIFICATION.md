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

The deployed artifact is commit `21a8b8b`. Everything on this branch since
then changes only workflows, scripts, the Dockerfile and these documents —
`git diff 21a8b8b..HEAD -- src/ prisma/ package.json package-lock.json
next.config.ts` is empty — so nothing here required a redeploy and production
was not disturbed to produce this report.

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
| Production responds | VERIFIED | 39/39 smoke checks against the live alias — runs [35633264735](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35633264735) and [35635004832](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35635004832), the second at the end of this pass. |
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

### Android client

The APK is a WebView client for the deployed site; see [ANDROID.md](ANDROID.md).
Everything below was read back out of the built artifact, not from the sources
that were meant to produce it.

| Gate | Status | Evidence |
|---|---|---|
| APK builds | VERIFIED | Run [35764036995](https://github.com/anirudhleetcode-max/aiml-mastery/actions/runs/35764036995), all 13 steps green. |
| Debug APK exists and is a real package | VERIFIED | 4,600,373 bytes; `file` reports an Android package with an APK Signing Block; six `classes*.dex`, `resources.arsc` and the launcher icons are present in the archive. |
| Debug APK is installable | VERIFIED | `apksigner verify` → **Verifies**, APK Signature Scheme v2, signer `CN=Android Debug`. |
| Package id | VERIFIED | `aapt dump badging` → `com.anirudh.aimlmastery`. |
| Application label | VERIFIED | `aapt dump badging` → `AI/ML Mastery`, on the application and the launchable activity. |
| Launcher entry point | VERIFIED | `launchable-activity: com.anirudh.aimlmastery.MainActivity`, adaptive icon. |
| SDK levels | VERIFIED | minSdk 24, targetSdk 36, compileSdk 36. |
| Least privilege | VERIFIED | The only platform permission is `INTERNET`. CI fails the build on any other `android.permission.*`. |
| Points at production | VERIFIED | `assets/capacitor.config.json` inside the APK carries `https://aiml-mastery.vercel.app`, `cleartext: false`, and an `allowNavigation` list of exactly that one host. |
| Icons come from the site's own mark | VERIFIED | All 26 raster variants are generated from `public/icon.svg` by `scripts/android-icons.mjs`. |
| Production source unchanged | VERIFIED | `git diff 21a8b8b..HEAD -- src/ prisma/ next.config.ts` is empty, and the Capacitor packages are devDependencies, so production's runtime dependency block is unchanged. |
| Release APK builds | BUILT | 3,443,278 bytes, produced unsigned. |
| **Release APK is installable** | **BLOCKED** | No signing key exists. `apksigner verify` → `DOES NOT VERIFY: Missing META-INF/MANIFEST.MF`, which is the correct result for an unsigned build. See below. |
| **Runtime behaviour on a device** | **BLOCKED** | No emulator or physical device was available. See below. |

### Suites

| Gate | Status | Evidence |
|---|---|---|
| Unit and integration | VERIFIED | 740/740 in 22 files; green in CI on every push. |
| Email and token tests specifically | VERIFIED | 62/62 — `auth-flows` 28, `auth-tokens` 24, `email-transport` 10. |
| Frontend component tests | VERIFIED | 351/351 in `widgets.test.ts`. |
| End-to-end | VERIFIED | 137/137 against a production build rather than `next dev`. |
| Account-flow end-to-end specifically | VERIFIED | 11/11 in `account-flows.spec.ts` — verification, spent links, invented tokens, resend, reset through the emailed link. |
| Typecheck, lint, contrast, curriculum integrity | VERIFIED | All four green in the same run. |
| Production build | VERIFIED | `npm run build` completes; 16 static pages generated. |
| `./scripts/verify-all.sh --full` | VERIFIED | 7/7 steps, exit 0, in one clean run. |
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

### Android: release signing

**What was tested.** `assembleRelease` runs on every Android workflow run. The
signing config in `android/app/build.gradle` reads a keystore from
`android/keystore.properties` or from `ANDROID_KEYSTORE_PATH` /
`ANDROID_KEYSTORE_PASSWORD` / `ANDROID_KEY_ALIAS` / `ANDROID_KEY_PASSWORD`.

**Exact result.** The release APK built — 3,443,278 bytes — and is unsigned,
because no keystore is configured. `apksigner verify` reports
`DOES NOT VERIFY: Missing META-INF/MANIFEST.MF`.

**What remains unverified.** That a signed release can be installed and
updated.

**Why it is blocked.** No signing key exists for this project and none was
invented. Android identifies an app by its signing certificate, so a key
generated by a build script is a key that can never ship an update to the same
installs — and a keystore committed to a repository is a credential anyone can
use to publish as this app.

**Exact action required to close it.** Generate a keystore locally, keep it
somewhere durable, and add four repository secrets:
`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`,
`ANDROID_KEY_PASSWORD`. The next Android run signs the release automatically.
The debug APK is installable today and needs none of this.

### Android: runtime behaviour on a device

**What was tested.** Everything that can be asserted about a file: it builds,
it is a well-formed package, it is signed, and its manifest carries the
intended identity, SDK levels and permissions.

**Exact result.** All of the above VERIFIED, above.

**What remains unverified.** Everything that requires the app to run: sign-in
through the WebView, session persistence across a relaunch, navigation between
protected routes, the back gesture walking site history, the native offline
screen and its retry, the splash handover, and keyboard behaviour on a focused
input.

**Why it is blocked.** No Android emulator or physical device was available.
The build environment has no KVM, and the development environment has neither
an SDK nor the network access to obtain one.

**Exact action required to close it.** Install
`artifacts/android/aiml-mastery-debug.apk` on a device and walk: launch →
splash → landing → sign in → dashboard → a lesson → back gesture → an external
link → aeroplane mode → the offline screen's Retry → sign out → sign in again.
Anything that fails there is a wrapper bug, not a production one — the same
flows are covered against the live site by the 39-check production smoke and
the 137-test end-to-end suite.

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
