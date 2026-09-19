'use client';

import { create } from 'zustand';
import type { LearnerEventBody } from '@/lib/sync/events';
import type { FullState } from '@/lib/sync/state';

/* ------------------------------------------------------------------ */
/* Durable offline queue                                               */
/* ------------------------------------------------------------------ */

const QUEUE_KEY = 'aiml.queue.v1';
const STATE_KEY = 'aiml.state.v1';

interface QueuedEvent {
  id: string;
  at: string;
  event: LearnerEventBody;
}

function readQueue(): QueuedEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as QueuedEvent[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: QueuedEvent[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-400)));
  } catch {
    // Storage can be full or blocked; the in-memory queue still works for
    // this session, so this is a degradation rather than a failure.
  }
}

function cacheState(state: FullState | null) {
  if (typeof window === 'undefined' || !state) return;
  try {
    window.localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    /* non-fatal */
  }
}

function readCachedState(): FullState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    return raw ? (JSON.parse(raw) as FullState) : null;
  } catch {
    return null;
  }
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `ev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

export type SyncStatus = 'idle' | 'syncing' | 'offline' | 'error' | 'saved';

export interface Toast {
  id: string;
  title: string;
  body?: string;
  tone: 'success' | 'info' | 'warning' | 'xp' | 'achievement';
  icon?: string;
}

interface LearnerStore {
  state: FullState | null;
  hydrated: boolean;
  queue: QueuedEvent[];
  status: SyncStatus;
  lastSyncedAt: string | null;
  toasts: Toast[];

  hydrate: (state: FullState | null) => void;
  emit: (event: LearnerEventBody) => void;
  flush: (opts?: { force?: boolean }) => Promise<void>;
  refresh: () => Promise<void>;
  toast: (t: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
  /** Applies an immediate local projection so the UI never waits on the network. */
  patch: (fn: (draft: FullState) => FullState) => void;
}

let flushTimer: ReturnType<typeof setTimeout> | null = null;
let inFlight = false;

export const useLearnerStore = create<LearnerStore>((set, get) => ({
  state: null,
  hydrated: false,
  queue: [],
  status: 'idle',
  lastSyncedAt: null,
  toasts: [],

  hydrate: (state) => {
    const queue = readQueue();
    const cached = state ?? readCachedState();
    set({ state: cached, hydrated: true, queue });
    cacheState(cached);
    if (queue.length > 0) void get().flush({ force: true });
  },

  patch: (fn) => {
    const current = get().state;
    if (!current) return;
    const next = fn(current);
    set({ state: next });
    cacheState(next);
  },

  emit: (event) => {
    const entry: QueuedEvent = { id: newId(), at: new Date().toISOString(), event };
    const queue = [...get().queue, entry];
    set({ queue });
    writeQueue(queue);

    // Coalesce rapid interactions into one request.
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = setTimeout(() => void get().flush(), 700);
  },

  flush: async (opts) => {
    if (typeof window === 'undefined') return;
    const { queue } = get();
    if (queue.length === 0 && !opts?.force) return;
    if (inFlight) return;

    if (!navigator.onLine) {
      set({ status: 'offline' });
      return;
    }
    if (queue.length === 0) return;

    inFlight = true;
    set({ status: 'syncing' });
    const batch = queue.slice(0, 100);

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: batch }),
      });

      if (res.status === 401) {
        // Session gone. Keep the queue — it will replay after signing in.
        set({ status: 'error' });
        return;
      }
      if (!res.ok) {
        set({ status: 'error' });
        return;
      }

      const data = (await res.json()) as {
        state: FullState;
        applied: string[];
        skipped: string[];
        effects: {
          xpAwards: { amount: number; detail: string }[];
          achievementsUnlocked: string[];
          milestones: number[];
        };
      };

      const settled = new Set([...data.applied, ...data.skipped]);
      const remaining = get().queue.filter((q) => !settled.has(q.id));
      set({ state: data.state, queue: remaining, status: 'saved', lastSyncedAt: new Date().toISOString() });
      writeQueue(remaining);
      cacheState(data.state);

      const xpTotal = data.effects.xpAwards.reduce((a, x) => a + x.amount, 0);
      if (xpTotal > 0) {
        get().toast({
          tone: 'xp',
          title: `+${xpTotal} XP`,
          body: data.effects.xpAwards.map((a) => a.detail).slice(0, 3).join(' · '),
        });
      }
      for (const m of data.effects.milestones) {
        get().toast({ tone: 'success', title: `${m}-day streak`, body: 'Consistency is doing the work.' });
      }
      for (const id of data.effects.achievementsUnlocked) {
        get().toast({ tone: 'achievement', title: 'Achievement unlocked', body: id });
      }

      if (remaining.length > 0) {
        setTimeout(() => void get().flush(), 400);
      } else {
        setTimeout(() => {
          if (get().status === 'saved') set({ status: 'idle' });
        }, 2200);
      }
    } catch {
      set({ status: navigator.onLine ? 'error' : 'offline' });
    } finally {
      inFlight = false;
    }
  },

  refresh: async () => {
    try {
      const res = await fetch('/api/state', { cache: 'no-store' });
      if (!res.ok) return;
      const data = (await res.json()) as { state: FullState };
      set({ state: data.state });
      cacheState(data.state);
    } catch {
      /* offline; cached state stands */
    }
  },

  toast: (t) => {
    const id = newId();
    set({ toasts: [...get().toasts, { ...t, id }] });
    setTimeout(() => get().dismissToast(id), 5200);
  },

  dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));

/** Wires browser connectivity + page-lifecycle events to the queue. */
export function installSyncListeners() {
  if (typeof window === 'undefined') return () => undefined;
  const store = useLearnerStore.getState;

  const onOnline = () => {
    useLearnerStore.setState({ status: 'idle' });
    void store().flush({ force: true });
  };
  const onOffline = () => useLearnerStore.setState({ status: 'offline' });
  const onVisibility = () => {
    if (document.visibilityState === 'visible') void store().flush();
  };
  // Best-effort final drain when the tab goes away.
  const onPageHide = () => {
    const { queue } = store();
    if (queue.length === 0 || !navigator.sendBeacon) return;
    try {
      navigator.sendBeacon('/api/sync', new Blob([JSON.stringify({ events: queue.slice(0, 100) })], { type: 'application/json' }));
    } catch {
      /* the queue is already durable in localStorage */
    }
  };

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onPageHide);

  if (!navigator.onLine) useLearnerStore.setState({ status: 'offline' });

  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', onPageHide);
  };
}

export const selectUnit = (unitId: string) => (s: LearnerStore) => s.state?.units[unitId];
export const selectXP = (s: LearnerStore) => s.state?.xp ?? 0;
export const selectPendingCount = (s: LearnerStore) => s.queue.length;
