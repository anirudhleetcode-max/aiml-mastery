import type { NextConfig } from 'next';

/**
 * Security headers.
 *
 * The Content-Security-Policy is deliberately explicit about the two places
 * this app legitimately reaches outside itself:
 *   - Google Fonts, for the two webfonts
 *   - jsDelivr, for the Pyodide runtime the Python playground downloads into
 *     a Web Worker. Learner code never runs on the server, so this is the
 *     mechanism that keeps that true.
 * `'unsafe-inline'` for scripts is required by Next's hydration payload and
 * the pre-paint theme script; `'unsafe-eval'` is required by Pyodide's
 * WebAssembly runtime. Both are scoped by the rest of the policy.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://cdn.jsdelivr.net",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Traces the server's real dependencies into `.next/standalone`, so the
  // container in the Dockerfile ships the server and what it imports rather
  // than the whole node_modules tree. Platforms that build from source ignore
  // this; the ones that take an image are several hundred megabytes lighter
  // for it.
  output: 'standalone',

  // The curriculum is large and lives only on the server; keeping it out of
  // any client bundle is the single biggest thing we do for page weight.
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],

  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', '@react-three/drei'],
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Learner state must never be cached by an intermediary.
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
