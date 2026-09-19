'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';
import { Logo } from '@/components/layout/logo';
import { useLearnerStore } from '@/lib/store/learner';
import { COURSE_END, COURSE_START, buildSchedule } from '@/features/scheduling/planner';
import { daysBetween, formatMinutes, prettyDate } from '@/lib/format';
import { TOTAL_UNITS } from '@/types/curriculum';
import type { ExperienceLevel, StudyBudget, TargetRole } from '@/types/progress';
import { cn } from '@/lib/cn';

const BUDGETS: { value: StudyBudget; label: string; detail: string }[] = [
  { value: 30, label: '30 minutes', detail: 'One concept most days. Tight but doable.' },
  { value: 60, label: '1 hour', detail: 'The recommended pace for finishing on time.' },
  { value: 120, label: '2 hours', detail: 'Comfortable margin, time for the labs.' },
  { value: 180, label: '3 hours', detail: 'Fast. You will finish early and go deeper.' },
  { value: 240, label: '4+ hours', detail: 'Full-time study.' },
];

const EXPERIENCE: { value: ExperienceLevel; label: string; detail: string }[] = [
  { value: 'complete-beginner', label: 'Complete beginner', detail: 'I have never written code.' },
  { value: 'some-python', label: 'Some Python', detail: 'I can write a loop and a function.' },
  { value: 'cs-student', label: 'CS student', detail: 'I know programming; ML is the new part.' },
  { value: 'career-switcher', label: 'Career switcher', detail: 'I work in tech, moving into ML.' },
];

const ROLES: { value: TargetRole; label: string }[] = [
  { value: 'ai-ml-intern', label: 'AI/ML internship' },
  { value: 'ml-engineer', label: 'ML engineer' },
  { value: 'data-scientist', label: 'Data scientist' },
  { value: 'ai-engineer', label: 'AI engineer (LLM products)' },
  { value: 'research', label: 'Research' },
  { value: 'undecided', label: 'Still deciding' },
];

/**
 * Onboarding asks only what changes the plan. Experience level and target role
 * are used for emphasis and framing — the curriculum itself does not shrink,
 * because the 214 units are the point.
 */
export function OnboardingFlow({ defaultName }: { defaultName: string }) {
  const router = useRouter();
  const emit = useLearnerStore((s) => s.emit);
  const flush = useLearnerStore((s) => s.flush);
  const meta = React.useRef<{ id: string; estimatedMinutes: number; module: string }[] | null>(null);

  const [step, setStep] = React.useState(0);
  const [saving, setSaving] = React.useState(false);
  const [name, setName] = React.useState(defaultName);
  const [budget, setBudget] = React.useState<StudyBudget>(60);
  const [time, setTime] = React.useState('19:00');
  const [experience, setExperience] = React.useState<ExperienceLevel>('complete-beginner');
  const [role, setRole] = React.useState<TargetRole>('ai-ml-intern');
  const [preview, setPreview] = React.useState<{ perDay: number; avgMinutes: number; compressed: boolean } | null>(null);

  // The schedule preview needs unit weights; fetch the trimmed index once.
  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/curriculum/meta');
        if (!res.ok) return;
        const data = (await res.json()) as { units: { id: string; estimatedMinutes: number; module: string }[] };
        if (!cancelled) meta.current = data.units;
      } catch {
        /* preview is a nicety, not a requirement */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (step !== 4 || !meta.current) return;
    const schedule = buildSchedule(
      meta.current.map((u) => ({
        id: u.id,
        estimatedMinutes: u.estimatedMinutes,
        module: u.module,
      })) as never,
      { startDate: COURSE_START, endDate: COURSE_END, dailyMinutes: budget },
    );
    setPreview({
      perDay: Number((TOTAL_UNITS / Math.max(1, schedule.studyDays)).toFixed(1)),
      avgMinutes: schedule.averageMinutesPerDay,
      compressed: schedule.compressed,
    });
  }, [step, budget]);

  const totalDays = daysBetween(COURSE_START, COURSE_END) + 1;
  const steps = ['Your name', 'Time', 'Experience', 'Goal', 'Your plan'];

  async function finish() {
    setSaving(true);
    emit({
      type: 'profile-updated',
      name: name.trim() || defaultName,
      studyBudget: budget,
      preferredStudyTime: time,
      experience,
      targetRole: role,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      markOnboarded: true,
    });
    emit({ type: 'prefs-updated', notifications: { studyTime: time } });
    await flush({ force: true });
    router.push('/today');
    router.refresh();
  }

  const canContinue = step !== 0 || name.trim().length > 0;

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <Logo className="h-8 w-8" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Setting up</p>
          <p className="text-[14px] font-medium text-ink">Step {step + 1} of {steps.length} · {steps[step]}</p>
        </div>
      </div>

      <div className="mb-8 flex gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={steps.length} aria-label="Onboarding progress">
        {steps.map((s, i) => (
          <span
            key={s}
            className={cn('h-1 flex-1 rounded-full transition-colors duration-300', i <= step ? 'bg-primary' : 'bg-surface-3')}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
        {step === 0 && (
          <div>
            <h1 className="text-xl font-semibold text-ink">What should we call you?</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              Used on your dashboard and in your daily report. Nothing else.
            </p>
            <Field label="Name" htmlFor="ob-name" className="mt-6">
              <Input
                id="ob-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name.trim()) setStep(1);
                }}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-xl font-semibold text-ink">How much time do you actually have?</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              Be honest rather than aspirational — the plan is built from this number, and an
              over-optimistic answer just means falling behind on day four.
            </p>
            <div className="mt-6 space-y-2">
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBudget(b.value)}
                  aria-pressed={budget === b.value}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors',
                    budget === b.value ? 'border-primary/50 bg-primary/8' : 'border-line hover:border-line-strong',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                      budget === b.value ? 'border-primary bg-primary text-on-primary' : 'border-line-strong',
                    )}
                  >
                    {budget === b.value && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-medium text-ink">{b.label} a day</span>
                    <span className="block text-[12.5px] text-subtle">{b.detail}</span>
                  </span>
                </button>
              ))}
            </div>
            <Field label="Preferred study time" htmlFor="ob-time" className="mt-6" hint="Used for your daily reminder.">
              <Input id="ob-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="max-w-40" />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-xl font-semibold text-ink">Where are you starting from?</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              This changes emphasis and pacing, not content. Everyone does all {TOTAL_UNITS} units —
              you can move quickly through what you already know.
            </p>
            <div className="mt-6 space-y-2">
              {EXPERIENCE.map((e) => (
                <button
                  key={e.value}
                  type="button"
                  onClick={() => setExperience(e.value)}
                  aria-pressed={experience === e.value}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors',
                    experience === e.value ? 'border-primary/50 bg-primary/8' : 'border-line hover:border-line-strong',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                      experience === e.value ? 'border-primary bg-primary text-on-primary' : 'border-line-strong',
                    )}
                  >
                    {experience === e.value && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-medium text-ink">{e.label}</span>
                    <span className="block text-[12.5px] text-subtle">{e.detail}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-xl font-semibold text-ink">What are you aiming at?</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              Used to prioritise which interview questions surface first.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  aria-pressed={role === r.value}
                  className={cn(
                    'rounded-xl border p-3.5 text-left text-[14px] font-medium transition-colors',
                    role === r.value ? 'border-primary/50 bg-primary/8 text-ink' : 'border-line text-muted hover:border-line-strong hover:text-ink',
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-xl font-semibold text-ink">Your plan, {name.trim() || 'there'}</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-subtle">
              Built from your actual budget, weighted by how long each unit really takes — not by
              dividing {TOTAL_UNITS} by {totalDays}.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              <div className="bg-surface p-4">
                <dt className="text-[11px] uppercase tracking-[0.1em] text-subtle">Starts</dt>
                <dd className="mt-1 text-[15px] font-semibold text-ink">{prettyDate(COURSE_START, { year: 'numeric' })}</dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="text-[11px] uppercase tracking-[0.1em] text-subtle">Deadline</dt>
                <dd className="mt-1 text-[15px] font-semibold text-ink">{prettyDate(COURSE_END, { year: 'numeric' })}</dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="text-[11px] uppercase tracking-[0.1em] text-subtle">Typical day</dt>
                <dd className="mt-1 text-[15px] font-semibold text-ink">
                  {preview ? formatMinutes(preview.avgMinutes) : formatMinutes(budget)}
                </dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="text-[11px] uppercase tracking-[0.1em] text-subtle">Concepts a day</dt>
                <dd className="mt-1 text-[15px] font-semibold tabular-nums text-ink">{preview ? preview.perDay : '—'}</dd>
              </div>
            </dl>

            {preview?.compressed && (
              <p className="mt-4 rounded-lg border border-warning/25 bg-warning/8 p-3 text-[12.5px] leading-relaxed text-warning">
                At {budget} minutes a day the full curriculum does not quite fit before 31 December, so some
                days carry extra. You can raise your budget now or later in Settings — the plan recalculates
                either way, and the deadline tracker will always tell you the truth about your pace.
              </p>
            )}

            <p className="mt-5 text-[13px] leading-relaxed text-subtle">
              Weekends are lighter, every study day ends with a test on exactly what you covered, and
              if you miss days the plan rebuilds around prerequisites rather than piling everything onto
              tomorrow.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || saving}
        >
          <ArrowLeft size={15} /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
            Continue <ArrowRight size={15} />
          </Button>
        ) : (
          <Button onClick={finish} loading={saving} size="lg">
            Start day one <ArrowRight size={15} />
          </Button>
        )}
      </div>
    </div>
  );
}
