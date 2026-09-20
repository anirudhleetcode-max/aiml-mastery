'use client';

import * as React from 'react';
import { useLearnerStore } from '@/lib/store/learner';
import { AppearanceSection } from './appearance-section';
import { DataSection } from './data-section';
import { NotificationsSection } from './notifications-section';
import { ProfileSection } from './profile-section';
import { ScheduleSection } from './schedule-section';
import type { SettingsData } from './types';

const SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'data', label: 'Your data' },
] as const;

const SYNC_COPY: Record<string, string> = {
  idle: 'All changes saved.',
  syncing: 'Saving your changes.',
  saved: 'Saved.',
  offline: 'You are offline. Changes are queued on this device and sent as soon as you reconnect.',
  error: 'Your last change could not be saved. It stays queued and will be retried.',
};

export function SettingsView({ data }: { data: SettingsData }) {
  const status = useLearnerStore((s) => s.status);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Settings</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          Everything here changes how the platform behaves for you. Each setting says what it actually does, so
          you can tell what you are agreeing to before you change it. Changes save as you make them, except on the
          profile, where the schedule is rebuilt and so waits for you to confirm.
        </p>
      </header>

      <nav aria-label="Settings sections" className="sticky top-16 z-20 -mx-1 rounded-xl border border-line bg-canvas/90 p-2 backdrop-blur">
        <ul className="flex flex-wrap gap-1.5">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-medium text-subtle transition-colors hover:border-line-strong hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/25"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p aria-live="polite" className="px-1 pt-2 text-[11.5px] text-subtle">
          {SYNC_COPY[status] ?? SYNC_COPY.idle}
        </p>
      </nav>

      <Section
        id="profile"
        title="Profile"
        description="Who the platform thinks you are, how much time you really have, and what you are working towards."
      >
        <ProfileSection data={data} />
      </Section>

      <Section
        id="appearance"
        title="Appearance and accessibility"
        description="How the platform looks and moves. Every choice takes effect on this device straight away and follows you to the next one."
      >
        <AppearanceSection data={data} />
      </Section>

      <Section
        id="notifications"
        title="Notifications"
        description="What the platform may send you, when, and through which channel."
      >
        <NotificationsSection data={data} />
      </Section>

      <Section
        id="schedule"
        title="Schedule"
        description="Your course window, the days you have chosen to skip, and how the plan rebuilds itself around them."
      >
        <ScheduleSection data={data} />
      </Section>

      <Section
        id="data"
        title="Your data"
        description="What is stored about your learning, how to take a copy of it, and the one way to remove progress."
      >
        <DataSection data={data} />
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-32 rounded-xl border border-line bg-surface p-4 sm:p-6"
    >
      <h2 id={`${id}-heading`} className="text-[15px] font-semibold text-ink">
        {title}
      </h2>
      <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-subtle">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
