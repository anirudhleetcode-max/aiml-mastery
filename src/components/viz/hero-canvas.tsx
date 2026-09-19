'use client';

import dynamic from 'next/dynamic';

/**
 * Client-side boundary for the WebGL hero. Loading it with `ssr: false` keeps
 * three.js out of the server bundle and off the first paint entirely — the
 * page is readable before any of it arrives.
 */
const HeroNetwork = dynamic(() => import('./hero-network'), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--c-primary)/0.18),transparent_62%)]" />
    </div>
  ),
});

export function HeroCanvas() {
  return <HeroNetwork />;
}
