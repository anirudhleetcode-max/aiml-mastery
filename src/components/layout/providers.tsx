'use client';

import * as React from 'react';
import type { FullState } from '@/lib/sync/state';
import { installSyncListeners, useLearnerStore } from '@/lib/store/learner';
import { applyUIPrefs, readUIPrefs } from '@/lib/store/ui';

/**
 * Hydrates the learner store with server state, reconciles UI preferences and
 * installs the connectivity listeners that drive the offline queue.
 */
export function Providers({ initialState, children }: { initialState: FullState | null; children: React.ReactNode }) {
  const hydrate = useLearnerStore((s) => s.hydrate);

  React.useEffect(() => {
    hydrate(initialState);
    return installSyncListeners();
  }, [hydrate, initialState]);

  // The server is the source of truth for preferences across devices; the
  // inline theme script only knows about this browser.
  React.useEffect(() => {
    if (!initialState) return;
    const local = readUIPrefs();
    const server = initialState.settings;
    if (
      local.theme !== server.theme ||
      local.reduceMotion !== server.reduceMotion ||
      local.highContrast !== server.highContrast ||
      local.fontScale !== server.fontScale
    ) {
      applyUIPrefs(server);
    }
  }, [initialState]);

  return <>{children}</>;
}
