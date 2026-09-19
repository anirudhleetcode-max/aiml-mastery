import type { Prisma } from '@prisma/client';
import { DEFAULT_NOTIFICATION_PREFS } from '@/lib/sync/state';
import { COURSE_END, COURSE_START } from '@/features/scheduling/planner';

/** Everything a brand-new learner needs in order for the app to render. */
export function newUserData(email: string, name: string, passwordHash: string): Prisma.UserCreateInput {
  return {
    email,
    passwordHash,
    profile: {
      create: {
        name,
        startDate: COURSE_START,
        endDate: COURSE_END,
        notificationPrefs: JSON.stringify(DEFAULT_NOTIFICATION_PREFS),
        pausedDates: '[]',
      },
    },
    state: { create: {} },
    notifications: {
      create: [
        {
          id: `ntf_welcome_${Date.now().toString(36)}`,
          kind: 'lesson-waiting',
          title: 'Welcome to your AI/ML journey',
          body: '214 concepts, 103 days, one mission: understand AI/ML deeply enough to build it and teach it.',
          href: '/today',
          dedupeKey: 'welcome',
        },
      ],
    },
  };
}
