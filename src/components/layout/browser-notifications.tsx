'use client';

import * as React from 'react';
import { useLearnerStore } from '@/lib/store/learner';

const SHOWN_KEY = 'aiml.notified.v1';

/**
 * Mirrors unread in-app notifications to the browser's notification centre,
 * but only when the learner has explicitly granted permission *and* enabled
 * browser push in settings.
 *
 * Restraint is deliberate (spec §82): at most one browser notification per
 * page load, only for notifications created in the last hour, and never the
 * same one twice — which ids are already shown is remembered locally.
 */
export function BrowserNotifications() {
  const notifications = useLearnerStore((s) => s.state?.notifications ?? []);
  const prefs = useLearnerStore((s) => s.state?.notificationPrefs);

  React.useEffect(() => {
    if (!prefs?.enabled || !prefs.browserPush) return;
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    if (document.visibilityState === 'visible') return; // do not interrupt someone already here

    let shown: string[] = [];
    try {
      shown = JSON.parse(window.localStorage.getItem(SHOWN_KEY) ?? '[]') as string[];
    } catch {
      shown = [];
    }

    const cutoff = Date.now() - 60 * 60 * 1000;
    const candidate = notifications.find(
      (n) => !n.read && !shown.includes(n.id) && new Date(n.createdAt).getTime() > cutoff,
    );
    if (!candidate) return;

    try {
      const notification = new Notification(candidate.title, {
        body: candidate.body,
        tag: candidate.dedupeKey,
        icon: '/icon.svg',
      });
      notification.onclick = () => {
        window.focus();
        if (candidate.href) window.location.href = candidate.href;
        notification.close();
      };
      window.localStorage.setItem(SHOWN_KEY, JSON.stringify([...shown, candidate.id].slice(-80)));
    } catch {
      // Blocked or unsupported in this context; the in-app centre still has it.
    }
  }, [notifications, prefs?.enabled, prefs?.browserPush]);

  return null;
}
