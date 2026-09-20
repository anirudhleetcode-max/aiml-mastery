'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input, Select } from '@/components/ui/input';
import { useLearnerStore } from '@/lib/store/learner';
import { formatMinutes } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { ExperienceLevel, StudyBudget, TargetRole } from '@/types/progress';
import type { BudgetPace, SettingsData } from './types';
import { isTime } from './types';

const BUDGETS: { value: StudyBudget; label: string; detail: string }[] = [
  { value: 30, label: '30 minutes', detail: 'One concept most days. Tight, but it fits around a full schedule.' },
  { value: 60, label: '1 hour', detail: 'The pace the curriculum was written for.' },
  { value: 120, label: '2 hours', detail: 'Room for the labs and for going back over what did not land.' },
  { value: 180, label: '3 hours', detail: 'You will finish early and have time to go deeper.' },
  { value: 240, label: '4 hours or more', detail: 'Full-time study.' },
];

const EXPERIENCE: { value: ExperienceLevel; label: string }[] = [
  { value: 'complete-beginner', label: 'Complete beginner' },
  { value: 'some-python', label: 'Some Python' },
  { value: 'cs-student', label: 'CS student' },
  { value: 'career-switcher', label: 'Career switcher' },
];

const ROLES: { value: TargetRole; label: string }[] = [
  { value: 'ai-ml-intern', label: 'AI/ML internship' },
  { value: 'ml-engineer', label: 'ML engineer' },
  { value: 'data-scientist', label: 'Data scientist' },
  { value: 'ai-engineer', label: 'AI engineer (LLM products)' },
  { value: 'research', label: 'Research' },
  { value: 'undecided', label: 'Still deciding' },
];

function paceFor(budgets: BudgetPace[], budget: StudyBudget): BudgetPace | undefined {
  return budgets.find((b) => b.budget === budget);
}

export function ProfileSection({ data }: { data: SettingsData }) {
  const router = useRouter();
  const emit = useLearnerStore((s) => s.emit);
  const flush = useLearnerStore((s) => s.flush);

  const saved = data.profile;
  const [name, setName] = React.useState(saved.name);
  const [budget, setBudget] = React.useState<StudyBudget>(saved.studyBudget);
  const [time, setTime] = React.useState(saved.preferredStudyTime);
  const [experience, setExperience] = React.useState<ExperienceLevel>(saved.experience);
  const [role, setRole] = React.useState<TargetRole>(saved.targetRole);
  const [saving, setSaving] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const nameError = name.trim().length === 0 ? 'A name is needed — it is what the daily report greets you by.' : undefined;
  const timeError = isTime(time) ? undefined : 'Enter a time as hours and minutes, for example 19:00.';

  const budgetChanged = budget !== saved.studyBudget;
  const dirty =
    name.trim() !== saved.name ||
    budgetChanged ||
    time !== saved.preferredStudyTime ||
    experience !== saved.experience ||
    role !== saved.targetRole;

  const nextPace = paceFor(data.budgets, budget);

  async function save() {
    if (nameError || timeError) return;
    setSaving(true);
    setConfirmed(false);
    emit({
      type: 'profile-updated',
      name: name.trim(),
      studyBudget: budget,
      preferredStudyTime: time,
      experience,
      targetRole: role,
    });
    await flush({ force: true });
    setSaving(false);
    setConfirmed(true);
    router.refresh();
  }

  function discard() {
    setName(saved.name);
    setBudget(saved.studyBudget);
    setTime(saved.preferredStudyTime);
    setExperience(saved.experience);
    setRole(saved.targetRole);
    setConfirmed(false);
  }

  return (
    <div className="space-y-6">
      <Field label="Name" htmlFor="set-name" hint="Shown on your dashboard and in the daily report. It is not used anywhere else." error={nameError}>
        <Input
          id="set-name"
          value={name}
          maxLength={80}
          aria-invalid={Boolean(nameError)}
          onChange={(e) => setName(e.target.value)}
          className="max-w-sm"
        />
      </Field>

      <fieldset>
        <legend className="text-[13px] font-medium text-ink">Daily study budget</legend>
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-subtle">
          The plan is packed against this number rather than dividing the curriculum by the days left, so an
          honest answer produces a schedule you can actually keep.
        </p>
        <div className="mt-3 space-y-2" role="radiogroup" aria-label="Daily study budget">
          {BUDGETS.map((b) => {
            const pace = paceFor(data.budgets, b.value);
            const active = budget === b.value;
            return (
              <button
                key={b.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setBudget(b.value)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors',
                  active ? 'border-primary/50 bg-primary/8' : 'border-line hover:border-line-strong',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                    active ? 'border-primary bg-primary text-on-primary' : 'border-line-strong',
                  )}
                >
                  {active && <Check size={11} strokeWidth={3} />}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium text-ink">{b.label} a day</span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-subtle">{b.detail}</span>
                  {pace && (
                    <span className="mt-1 block text-[11.5px] tabular-nums text-subtle">
                      about {pace.unitsPerDay} unit{pace.unitsPerDay === 1 ? '' : 's'} a day across{' '}
                      {pace.studyDays} study days, typically {formatMinutes(pace.averageMinutes)}
                      {pace.compressed ? ' — and some days carry extra to make the deadline' : ''}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {budgetChanged && nextPace && (
        <div role="status" className="rounded-xl border border-primary/30 bg-primary/[0.07] p-4">
          <p className="text-[13px] font-medium text-ink">Saving this rebuilds your schedule</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
            Every remaining unit is repacked against {budget} minutes a day. Your new pace works out at about{' '}
            <span className="font-medium text-ink">{nextPace.unitsPerDay} units a day</span> over{' '}
            <span className="font-medium text-ink">{nextPace.studyDays} study days</span>, with a typical day of{' '}
            <span className="font-medium text-ink">{formatMinutes(nextPace.averageMinutes)}</span> once the daily
            test is counted. Work you have already completed stays completed, and nothing is dropped from the
            curriculum.
          </p>
          {nextPace.compressed && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-warning">
              At this budget the remaining units do not quite fit before the deadline, so the planner loads the
              later weeks more heavily. The deadline tracker will keep telling you the truth about your pace.
            </p>
          )}
        </div>
      )}

      <Field
        label="Preferred study time"
        htmlFor="set-study-time"
        hint="When your study reminder goes out, and the hour the plan assumes you sit down."
        error={timeError}
      >
        <Input
          id="set-study-time"
          type="time"
          value={time}
          aria-invalid={Boolean(timeError)}
          onChange={(e) => setTime(e.target.value)}
          className="max-w-40"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Experience level"
          htmlFor="set-experience"
          hint="Changes emphasis and framing, never content. Everyone covers all 214 units."
        >
          <Select id="set-experience" value={experience} onChange={(e) => setExperience(e.target.value as ExperienceLevel)}>
            {EXPERIENCE.map((x) => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Target role"
          htmlFor="set-role"
          hint="Decides which interview questions surface first inside each unit."
        >
          <Select id="set-role" value={role} onChange={(e) => setRole(e.target.value as TargetRole)}>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <p className="text-[12px] text-subtle">
        Time zone on this account: <span className="text-muted">{saved.timezone || 'not set'}</span>. It is used to
        decide when a day ends for streaks and reminders.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={save} loading={saving} disabled={!dirty || Boolean(nameError) || Boolean(timeError)}>
          Save profile
        </Button>
        {dirty && (
          <Button variant="ghost" onClick={discard} disabled={saving}>
            Discard changes
          </Button>
        )}
        <p aria-live="polite" className="text-[12.5px] text-subtle">
          {dirty ? 'Unsaved changes.' : confirmed ? 'Profile saved, and your plan has been rebuilt.' : ''}
        </p>
      </div>
    </div>
  );
}
