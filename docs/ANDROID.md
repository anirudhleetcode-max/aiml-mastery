# Android

The Android app is a **client for the deployed site**, not a second copy of the
platform. It ships a native shell that loads
`https://aiml-mastery.vercel.app` in a WebView. There is no second backend, no
second database, and no duplicated business logic.

| | |
|---|---|
| Package | `com.anirudh.aimlmastery` |
| Application label | AI/ML Mastery |
| Wrapper | Capacitor 8 |
| minSdk / targetSdk | 24 / 36 |
| Permissions | `INTERNET`, and nothing else |
| Loads | `https://aiml-mastery.vercel.app` |

---

## Why a remote WebView and not a bundled app

This was decided by the session cookie, not by preference.

`src/lib/auth/session.ts` issues `aiml_session` with `HttpOnly`, `Secure` and
`SameSite=Lax`. Each flag rules something out:

- **`SameSite=Lax`** — the cookie travels only on same-site requests. If the
  APK bundled the web assets and served them from `capacitor://localhost`,
  every call to `/api/*` would be cross-site and the browser would strip the
  cookie. Sign-in would appear to succeed, and then every protected route
  would return 401. This is the failure mode that makes bundled Capacitor apps
  with cookie auth mysteriously "forget" the user.
- **`Secure`** — the cookie is refused over plaintext, so the scheme has to be
  `https` and cleartext stays off.
- **`HttpOnly`** — no injected script can read the session and carry it across
  an origin boundary. That is correct, and it was not worked around.

Loading the production origin directly makes the WebView a **first-party
browsing context** for that origin. Cookies, CSP, the CSRF origin check and
`upgrade-insecure-requests` then behave exactly as they do in a desktop
browser. **No server-side change was required to support Android.**

Static export was never an option either: `next.config.ts` sets
`output: 'standalone'`, and the app has API routes, server-side auth guards and
database access. `next export` would produce a shell that cannot sign anybody
in.

---

## What the native layer adds

The production site is not modified to accommodate Android, so nothing is
injected into it. Everything below is native, in
`android/app/src/main/java/com/anirudh/aimlmastery/`.

**Back navigation.** Capacitor 8's `BridgeActivity` contains no back handling
at all — the default gesture finishes the activity, so from a lesson three
levels deep "back" would close the app. `MainActivity` registers an
`OnBackPressedCallback` that walks the site's history first and only then lets
the platform exit. It uses the dispatcher rather than overriding
`onBackPressed()`, which is deprecated and bypassed entirely by predictive back
on Android 13+.

**Failure and offline.** A WebView whose load fails renders a blank white
rectangle. `AimlWebViewClient` catches main-frame failures and shows a native
offline screen with a Retry button. Native, because the one thing guaranteed
unavailable when a page fails to load is the page.

Two distinctions it gets right:

- only **main-frame** failures count, so one 404'd image does not replace a
  page being read;
- only **transport errors and 5xx** count. The app answers 401 on a protected
  route for a signed-out visitor and renders a real page for it. Treating that
  as "offline" would hide the sign-in redirect behind an error screen.

The copy promises no cached lessons, because there are none. This is a
server-backed platform and the offline screen says so.

**Window insets.** `targetSdk 36` enforces edge-to-edge, so without handling,
content draws under the status bar and the gesture pill. Insets are applied as
padding, and the IME inset is included so the keyboard cannot cover the field
being typed into.

**External links.** No new code was needed. `Bridge.launchIntent` already hands
any host outside `server.allowNavigation` to the system browser, and that list
contains exactly one entry. Nothing external is ever trapped in a chrome-less
WebView — which also means no authentication flow can be.

---

## Branding

Icons are generated from the site's existing `public/icon.svg`, so the launcher
icon and the favicon are the same mark. To regenerate all 26 raster variants
after changing the SVG:

```bash
node scripts/android-icons.mjs
```

That covers legacy launcher icons, round icons, adaptive-icon foregrounds and
the legacy splash images. The Android 12+ splash is drawn from the theme using
the brand mark on the brand surface.

---

## Building

The development environment for this repository **cannot** build the APK: its
gateway answers `403` to `CONNECT dl.google.com`, and `maven.google.com`
redirects to that host, so the Android Gradle Plugin and every AndroidX
artifact are unreachable. Ubuntu's packaged SDK stops at API 23. The build
therefore runs on a GitHub Actions runner, the same way the Docker image does.

Trigger the **Android** workflow (or push a change under `android/`). It:

1. installs `platforms;android-36` and `build-tools;36.0.0`,
2. runs `npx cap sync android`,
3. runs `./gradlew assembleDebug`,
4. reads the package id, label and permission set **back out of the built
   APK** rather than trusting the sources,
5. fails if any permission other than `INTERNET` appears,
6. uploads the APK as a workflow artifact.

On a machine with a normal Android SDK, the same build is:

```bash
npm ci
npx cap sync android
cd android && ./gradlew assembleDebug
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Release signing

`android/app/build.gradle` reads the keystore from `android/keystore.properties`
or from `ANDROID_KEYSTORE_PATH` / `ANDROID_KEYSTORE_PASSWORD` /
`ANDROID_KEY_ALIAS` / `ANDROID_KEY_PASSWORD`. If none is present the release
build still runs and produces an **unsigned** APK.

That is deliberate. Android identifies an app by its signing key, so a key
invented by a build script is a key that can never ship an update to the same
installs. No keystore is generated automatically and none is committed.

To enable signed releases, create a keystore locally and add these repository
secrets: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`,
`ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`.

The Capacitor template ships `android/.gitignore` with its keystore rules
commented out, which would have committed any `.jks` placed there. Those rules
are now active, and `*.jks`, `*.keystore` and `keystore.properties` are ignored
at the repository root as well.

---

## What is not verified

No physical device or emulator was available in the environment that produced
this, so the APK's runtime behaviour — sign-in, navigation, the back gesture,
the offline screen — has **not** been exercised on a device. The build-time
facts (package id, label, permissions, size) are asserted in CI against the
built artifact. See `docs/PRODUCTION_VERIFICATION.md` for how this repository
separates what was observed from what was only built.
