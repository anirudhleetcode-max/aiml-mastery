/**
 * Stand-in for the `server-only` package under Vitest.
 *
 * The real package is a tripwire: it resolves to a throwing module under any
 * condition but React's `react-server`, which is exactly how it stops a
 * server module from being pulled into a client bundle. Vitest resolves the
 * client condition, so importing a server module in a test would trip the
 * wire even though nothing is being bundled.
 *
 * Aliasing it here keeps the guard doing its real job in `next build` — where
 * it matters — while letting tests import the modules it protects.
 */
export {};
