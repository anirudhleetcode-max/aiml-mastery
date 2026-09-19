'use client';

import * as React from 'react';

export interface UIPrefs {
  theme: 'dark' | 'light' | 'system';
  reduceMotion: boolean;
  highContrast: boolean;
  fontScale: number;
}

export const DEFAULT_UI: UIPrefs = { theme: 'dark', reduceMotion: false, highContrast: false, fontScale: 100 };

const KEY = 'aiml.ui.v1';

export function readUIPrefs(): UIPrefs {
  if (typeof window === 'undefined') return DEFAULT_UI;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...DEFAULT_UI, ...(JSON.parse(raw) as Partial<UIPrefs>) } : DEFAULT_UI;
  } catch {
    return DEFAULT_UI;
  }
}

export function applyUIPrefs(prefs: UIPrefs) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const light = prefs.theme === 'light' || (prefs.theme === 'system' && systemLight);
  root.classList.toggle('light', light);
  root.classList.toggle('dark', !light);
  root.classList.toggle('reduce-motion', prefs.reduceMotion);
  root.classList.toggle('contrast-high', prefs.highContrast);
  root.style.setProperty('--root-font-size', `${prefs.fontScale}%`);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    /* non-fatal */
  }
}

/** Shared UI preference state. Kept out of the learner store so it works logged out. */
export function useUIPrefs(): [UIPrefs, (patch: Partial<UIPrefs>) => void] {
  const [prefs, setPrefs] = React.useState<UIPrefs>(DEFAULT_UI);

  React.useEffect(() => {
    setPrefs(readUIPrefs());
  }, []);

  const update = React.useCallback((patch: Partial<UIPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      applyUIPrefs(next);
      return next;
    });
  }, []);

  return [prefs, update];
}

/** True when the user or their OS has asked for less motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => setReduced(mq.matches || document.documentElement.classList.contains('reduce-motion'));
    check();
    mq.addEventListener('change', check);
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      mq.removeEventListener('change', check);
      observer.disconnect();
    };
  }, []);
  return reduced;
}
