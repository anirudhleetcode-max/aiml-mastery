import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Android wrapper for the deployed application.
 *
 * This app is a *client* for https://aiml-mastery.vercel.app, not a second
 * copy of it. The reason is not convenience, it is the session cookie.
 *
 * `src/lib/auth/session.ts` issues `aiml_session` as HttpOnly + Secure +
 * SameSite=Lax. Those three flags decide the whole architecture:
 *
 *   - SameSite=Lax means the cookie is only sent on same-site requests. If the
 *     WebView loaded bundled assets from `capacitor://localhost` and called
 *     the API cross-origin, every authenticated request would be a cross-site
 *     request and the browser would strip the cookie. Login would appear to
 *     succeed and then every protected route would 401.
 *   - Secure means the cookie is refused over anything but HTTPS, so
 *     `cleartext` stays off and the scheme stays https.
 *   - HttpOnly means no amount of injected JavaScript can carry the session
 *     across an origin boundary, which is correct and is not going to be
 *     worked around here.
 *
 * Loading the production origin directly makes the WebView a first-party
 * browsing context for that origin, so cookies, CSP, CSRF origin checks and
 * the `upgrade-insecure-requests` policy all behave exactly as they do in a
 * desktop browser. Nothing about the server had to change to support Android.
 *
 * Static export was never an option either: `next.config.ts` sets
 * `output: 'standalone'` and the app has API routes, middleware-style guards
 * and database access, so `next export` would produce a shell that cannot log
 * anybody in.
 */
const config: CapacitorConfig = {
  appId: 'com.anirudh.aimlmastery',
  appName: 'AI/ML Mastery',

  // Required by the CLI even though the remote server is what actually gets
  // loaded. It holds a branded bootstrap page, which is what the WebView shows
  // for the instant before the first remote paint.
  webDir: 'capacitor-shell',

  server: {
    url: 'https://aiml-mastery.vercel.app',

    // Only this host stays inside the app. Anything else — a docs link, a
    // provider's page — is handed to the system browser by
    // `AimlWebViewClient`, so no external destination is ever trapped in a
    // WebView that has no address bar and no way back.
    allowNavigation: ['aiml-mastery.vercel.app'],

    // The session cookie is `Secure`. Plaintext HTTP would silently drop it.
    androidScheme: 'https',
    cleartext: false,
  },

  android: {
    // The server sets `upgrade-insecure-requests`; refusing mixed content in
    // the WebView too means a downgrade cannot happen on the client either.
    allowMixedContent: false,

    // A shipped app should not expose a remote debugging surface.
    webContentsDebuggingEnabled: false,

    // Matches the dark surface the site paints first, so the gap between the
    // splash screen and the first remote frame is not a white flash.
    backgroundColor: '#0b0f19',
  },
};

export default config;
