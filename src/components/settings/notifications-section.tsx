'use client';

import * as React from 'react';
import { BellOff, Check, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input, Switch } from '@/components/ui/input';
import { useLearnerStore } from '@/lib/store/learner';
import type { NotificationPrefs } from '@/types/progress';
import type { SettingsData } from './types';
import { isTime } from './types';

type PermissionState = 'unsupported' | 'default' | 'granted' | 'denied';

/**
 * Reminders are the one part of the platform that can reach a learner who is
 * not looking at it, so every switch here says what it will actually send, and
 * the browser-push state is reported honestly rather than optimistically.
 */
export function NotificationsSection({ data }: { data: SettingsData }) {
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);

  const [prefs, setPrefs] = React.useState<NotificationPrefs>(data.notifications);
  const [permission, setPermission] = React.useState<PermissionState>('default');
  const [pushNote, setPushNote] = React.useState<string | null>(null);
  const [requesting, setRequesting] = React.useState(false);
  const [unread, setUnread] = React.useState(data.unreadNotifications);
  const touched = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission as PermissionState);
  }, []);

  React.useEffect(() => {
    if (!touched.current) return;
    const timer = setTimeout(() => {
      emit({
        type: 'prefs-updated',
        notifications: {
          enabled: prefs.enabled,
          browserPush: prefs.browserPush,
          morningReminder: prefs.morningReminder,
          studyReminder: prefs.studyReminder,
          testReminder: prefs.testReminder,
          streakReminder: prefs.streakReminder,
          weeklySummary: prefs.weeklySummary,
          ...(isTime(prefs.morningTime) ? { morningTime: prefs.morningTime } : {}),
          ...(isTime(prefs.studyTime) ? { studyTime: prefs.studyTime } : {}),
          ...(isTime(prefs.testTime) ? { testTime: prefs.testTime } : {}),
        },
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [prefs, emit]);

  function set(next: Partial<NotificationPrefs>) {
    touched.current = true;
    setPrefs((p) => ({ ...p, ...next }));
  }

  async function togglePush(next: boolean) {
    if (!next) {
      setPushNote(null);
      set({ browserPush: false });
      return;
    }
    if (permission === 'unsupported') {
      setPushNote('This browser does not support web notifications, so push cannot be switched on here. Everything else on this page still works.');
      return;
    }
    if (permission === 'denied') {
      setPushNote('Your browser is blocking notifications for this site, and a page cannot undo that. Open the padlock or site-settings menu in the address bar, allow notifications, then come back and try again.');
      return;
    }
    if (permission === 'granted') {
      setPushNote(null);
      set({ browserPush: true });
      return;
    }

    setRequesting(true);
    try {
      const result = (await Notification.requestPermission()) as PermissionState;
      setPermission(result);
      if (result === 'granted') {
        setPushNote(null);
        set({ browserPush: true });
      } else if (result === 'denied') {
        setPushNote('You chose to block notifications, so push stays off. Nothing will be sent to this browser until you allow it in your browser settings.');
        set({ browserPush: false });
      } else {
        setPushNote('The permission prompt was dismissed without an answer, so push stays off. You can ask again whenever you like.');
        set({ browserPush: false });
      }
    } catch {
      setPushNote('The browser refused the permission request. Push stays off rather than silently failing later.');
      set({ browserPush: false });
    } finally {
      setRequesting(false);
    }
  }

  function markAllRead() {
    patch((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
    emit({ type: 'notification-read', id: null });
    setUnread(0);
  }

  const pushOnButPermissionMissing = prefs.browserPush && permission !== 'granted';

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line px-4">
        <Switch
          id="set-notifications-enabled"
          checked={prefs.enabled}
          onChange={(v) => set({ enabled: v })}
          label="Notifications"
          description="The master switch. Turned off, nothing is sent by any channel and every reminder below is suspended — your progress, streak and plan carry on exactly as before."
        />
      </div>

      {!prefs.enabled && (
        <p className="flex items-start gap-2 rounded-lg border border-line bg-surface-2 p-3 text-[12.5px] leading-relaxed text-muted">
          <BellOff size={14} className="mt-0.5 shrink-0 text-subtle" aria-hidden />
          Notifications are off. The settings below are kept exactly as they are and come back the moment you turn
          the master switch on again.
        </p>
      )}

      <fieldset disabled={!prefs.enabled} className="space-y-5 disabled:opacity-55">
        <div className="rounded-xl border border-line px-4">
          <Switch
            id="set-browser-push"
            checked={prefs.browserPush}
            onChange={(v) => void togglePush(v)}
            label="Browser push"
            description="Sends reminders to this device even when the tab is closed. Your browser asks for permission first, and only you can grant it."
          />
          <div className="pb-3 text-[12px] leading-relaxed">
            {permission === 'granted' && !pushNote && (
              <p className="flex items-start gap-1.5 text-success">
                <Check size={13} className="mt-0.5 shrink-0" aria-hidden />
                This browser has granted permission.
              </p>
            )}
            {requesting && <p className="text-subtle">Waiting for your answer to the browser prompt.</p>}
            {pushNote && (
              <p role="status" className="flex items-start gap-1.5 text-warning">
                <ShieldAlert size={13} className="mt-0.5 shrink-0" aria-hidden />
                {pushNote}
              </p>
            )}
            {pushOnButPermissionMissing && !pushNote && (
              <p role="status" className="text-warning">
                Push is switched on for your account, but this browser has not granted permission, so nothing will
                arrive here until it does.
              </p>
            )}
          </div>
        </div>

        <div className="divide-y divide-line rounded-xl border border-line px-4">
          <Switch
            id="set-morning-reminder"
            checked={prefs.morningReminder}
            onChange={(v) => set({ morningReminder: v })}
            label="Morning reminder"
            description="One message early in the day naming the units your plan has scheduled, so you know what is waiting before the day fills up."
          />
          {prefs.morningReminder && (
            <div className="py-3">
              <Field label="Morning reminder time" htmlFor="set-morning-time">
                <Input
                  id="set-morning-time"
                  type="time"
                  value={prefs.morningTime}
                  onChange={(e) => set({ morningTime: e.target.value })}
                  className="max-w-40"
                />
              </Field>
            </div>
          )}

          <Switch
            id="set-study-reminder"
            checked={prefs.studyReminder}
            onChange={(v) => set({ studyReminder: v })}
            label="Study reminder"
            description="A nudge at the hour you said you study, and only if the day's units are still unfinished. Finish early and it stays quiet."
          />
          {prefs.studyReminder && (
            <div className="py-3">
              <Field label="Study reminder time" htmlFor="set-study-reminder-time">
                <Input
                  id="set-study-reminder-time"
                  type="time"
                  value={prefs.studyTime}
                  onChange={(e) => set({ studyTime: e.target.value })}
                  className="max-w-40"
                />
              </Field>
            </div>
          )}

          <Switch
            id="set-test-reminder"
            checked={prefs.testReminder}
            onChange={(v) => set({ testReminder: v })}
            label="Test reminder"
            description="Sent later in the evening when you have completed units but not yet taken the daily test on them. Skipping the test is what costs you the test streak."
          />
          {prefs.testReminder && (
            <div className="py-3">
              <Field label="Test reminder time" htmlFor="set-test-reminder-time">
                <Input
                  id="set-test-reminder-time"
                  type="time"
                  value={prefs.testTime}
                  onChange={(e) => set({ testTime: e.target.value })}
                  className="max-w-40"
                />
              </Field>
            </div>
          )}

          <Switch
            id="set-streak-reminder"
            checked={prefs.streakReminder}
            onChange={(v) => set({ streakReminder: v })}
            label="Streak reminder"
            description="A single late warning on a day where your streak is about to break and you still have a freeze or a few minutes left to save it."
          />

          <Switch
            id="set-weekly-summary"
            checked={prefs.weeklySummary}
            onChange={(v) => set({ weeklySummary: v })}
            label="Weekly summary"
            description="One message a week: units completed, average score, which topics are slipping, and whether you are ahead of or behind your deadline."
          />
        </div>
      </fieldset>

      <p className="rounded-lg border border-line bg-surface-2 p-3 text-[12.5px] leading-relaxed text-muted">
        You will never receive more than one notification of a kind per day. If a reminder of that kind has
        already gone out, the platform stays quiet rather than repeating itself.
      </p>

      {unread > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" onClick={markAllRead}>
            Mark all {unread} as read
          </Button>
          <p className="text-[12px] text-subtle">Clears the badge without deleting anything from your history.</p>
        </div>
      )}
    </div>
  );
}
