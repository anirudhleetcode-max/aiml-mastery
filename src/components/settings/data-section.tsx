'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Download, RotateCcw, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLearnerStore } from '@/lib/store/learner';
import { domainColor } from '@/data/domains';
import { dateKey, formatMinutes, formatXP, pct } from '@/lib/format';
import { MASTERY_META } from '@/types/progress';
import { cn } from '@/lib/cn';
import type { ResettableUnit, SettingsData } from './types';

export function DataSection({ data }: { data: SettingsData }) {
  const router = useRouter();
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);
  const flush = useLearnerStore((s) => s.flush);

  const d = data.data;

  /* ---------------------------------------------------------- download */
  const [downloading, setDownloading] = React.useState(false);
  const [downloadNote, setDownloadNote] = React.useState<string | null>(null);
  const [downloadFailed, setDownloadFailed] = React.useState(false);

  async function download() {
    setDownloading(true);
    setDownloadNote(null);
    setDownloadFailed(false);
    try {
      const res = await fetch('/api/state', { cache: 'no-store' });
      if (!res.ok) {
        setDownloadFailed(true);
        setDownloadNote(
          res.status === 401
            ? 'Your session has expired, so nothing was downloaded. Sign in again and try once more.'
            : `The export could not be built (status ${res.status}). Nothing was downloaded.`,
        );
        return;
      }
      const payload: unknown = await res.json();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `aiml-mastery-${dateKey()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setDownloadNote('Saved to your downloads as a JSON file. It contains everything above, nothing about anyone else.');
    } catch {
      setDownloadFailed(true);
      setDownloadNote('The request did not reach the server, so nothing was downloaded. Check your connection and try again.');
    } finally {
      setDownloading(false);
    }
  }

  /* ------------------------------------------------------- reset a unit */
  const [query, setQuery] = React.useState('');
  const [candidate, setCandidate] = React.useState<ResettableUnit | null>(null);
  const [resetting, setResetting] = React.useState(false);
  const [resetDone, setResetDone] = React.useState<string | null>(null);
  const [resetIds, setResetIds] = React.useState<Set<string>>(() => new Set());

  const matches = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = data.resettable.filter((u) => !resetIds.has(u.id));
    if (!q) return pool.slice(0, 8);
    return pool
      .filter((u) => `${u.title} ${u.topic} ${u.module} ${u.id}`.toLowerCase().includes(q))
      .slice(0, 20);
  }, [data.resettable, query, resetIds]);

  const poolSize = data.resettable.length - resetIds.size;

  async function confirmReset() {
    if (!candidate) return;
    const unit = candidate;
    setResetting(true);
    patch((s) => {
      const prev = s.units[unit.id];
      if (!prev) return s;
      return {
        ...s,
        units: {
          ...s.units,
          [unit.id]: {
            ...prev,
            mastery: 'NOT_STARTED',
            bestScore: 0,
            lastScore: 0,
            attempts: 0,
            practiceCompleted: 0,
            challengeCompleted: false,
            teachingScore: null,
            lessonCompletedAt: null,
            nextReviewAt: null,
            reviewStep: 0,
            weak: false,
          },
        },
      };
    });
    emit({ type: 'unit-reset', unitId: unit.id });
    await flush({ force: true });
    setResetIds((prev) => new Set(prev).add(unit.id));
    setResetting(false);
    setCandidate(null);
    setQuery('');
    setResetDone(`${unit.title} is back to Not started. It has returned to your plan as unlearned.`);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[13px] font-medium text-ink">What is stored</h3>
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-subtle">
          Your account holds the record of what you have studied and how it went. Nothing here is shared with
          anyone, and the platform stores no data about you beyond this.
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {[
            { label: 'Units in progress', value: String(d.unitsInProgress) },
            { label: 'Units completed', value: `${d.unitsCompleted} of ${d.totalUnits}` },
            { label: 'Units mastered', value: String(d.unitsMastered) },
            { label: 'Tests taken', value: String(d.testsTaken) },
            { label: 'Notes written', value: String(d.notes) },
            { label: 'Mistakes logged', value: `${d.mistakes}${d.mistakesUnresolved > 0 ? ` · ${d.mistakesUnresolved} open` : ''}` },
            { label: 'Teach-backs', value: String(d.teachBacks) },
            { label: 'Study recorded', value: formatMinutes(d.studyMinutes) },
            { label: 'Study sessions', value: String(d.sessions) },
            { label: 'Achievements', value: String(d.achievements) },
            { label: 'XP earned', value: formatXP(d.xp) },
            { label: 'Sign-in email', value: d.email },
          ].map((item) => (
            <div key={item.label} className="bg-surface px-3 py-2.5">
              <dt className="text-[10.5px] uppercase tracking-[0.1em] text-subtle">{item.label}</dt>
              <dd className="mt-0.5 truncate text-[13.5px] font-semibold tabular-nums text-ink" title={item.value}>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={download} loading={downloading}>
          <Download size={15} aria-hidden /> Download my data
        </Button>
        <p aria-live="polite" className={cn('max-w-md text-[12px] leading-relaxed', downloadFailed ? 'text-danger' : 'text-subtle')}>
          {downloadNote ?? 'A single JSON file with your profile, every unit’s progress, all test results, notes, mistakes and XP history.'}
        </p>
      </div>

      {/* ------------------------------------------------------ danger zone */}
      <section aria-labelledby="danger-zone-heading" className="rounded-xl border border-danger/35 bg-danger/[0.04] p-4 sm:p-5">
        <h3 id="danger-zone-heading" className="text-[13px] font-semibold text-danger">
          Danger zone
        </h3>
        <p className="mt-1 max-w-2xl text-[12.5px] leading-relaxed text-muted">
          Resetting a unit throws away the evidence you built up for it. It is the right move when a score no
          longer reflects what you know and you want to learn the unit properly again — and the wrong move if you
          only want to retake a test, which you can do from the Tests page without losing anything.
        </p>

        <div className="mt-4">
          <label htmlFor="reset-unit-search" className="text-[12.5px] font-medium text-ink">
            Reset a single unit
          </label>
          <p className="mt-1 text-[12px] leading-relaxed text-subtle">
            {poolSize === 0
              ? 'No unit has recorded progress yet, so there is nothing that a reset could affect.'
              : `Search the ${poolSize} unit${poolSize === 1 ? '' : 's'} that have recorded progress. Units you have never opened cannot be reset, because there is nothing stored for them.`}
          </p>

          {poolSize > 0 && (
            <>
              <div className="relative mt-2 max-w-md">
                <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" aria-hidden />
                <Input
                  id="reset-unit-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, topic, module or unit id"
                  autoComplete="off"
                  className="h-9 pl-9"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear unit search"
                    className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-subtle hover:text-ink"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <ul className="mt-2 max-w-2xl divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
                {matches.map((u) => (
                  <li key={u.id}>
                    <button
                      type="button"
                      onClick={() => setCandidate(u)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
                    >
                      <span
                        aria-hidden
                        className="h-8 w-1 shrink-0 rounded-full"
                        style={{ background: domainColor(u.domain) }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink">{u.title}</span>
                        <span className="mt-0.5 block truncate text-[11.5px] text-subtle">
                          <span className="font-mono">{u.id}</span> · {u.module} ·{' '}
                          {MASTERY_META[u.mastery].label}
                          {u.attempts > 0 ? ` · best ${pct(u.bestScore)}` : ''}
                        </span>
                      </span>
                      <Badge tone="danger">Reset</Badge>
                    </button>
                  </li>
                ))}
                {matches.length === 0 && (
                  <li className="px-3 py-3 text-[12.5px] text-subtle">
                    No unit with recorded progress matches that search.
                  </li>
                )}
              </ul>
              {!query && poolSize > matches.length && (
                <p className="mt-1.5 text-[11.5px] text-subtle">
                  Showing {matches.length} of {poolSize}. Type to narrow the list.
                </p>
              )}
            </>
          )}

          <p aria-live="polite" className="mt-2 text-[12.5px] text-muted">
            {resetDone ?? ''}
          </p>
        </div>
      </section>

      <Dialog
        open={candidate !== null}
        onClose={() => {
          if (!resetting) setCandidate(null);
        }}
        title={candidate ? `Reset ${candidate.title}?` : 'Reset unit'}
        description="This cannot be undone, and it is the only way progress is ever removed from a unit."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCandidate(null)} disabled={resetting}>
              Keep my progress
            </Button>
            <Button variant="danger" onClick={confirmReset} loading={resetting}>
              <RotateCcw size={15} aria-hidden /> Reset this unit
            </Button>
          </>
        }
      >
        {candidate && (
          <div className="space-y-4 text-[13px] leading-relaxed">
            <div>
              <p className="font-medium text-ink">What you will lose</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted">
                <li>
                  Its mastery level, currently{' '}
                  <span className="font-medium text-ink">{MASTERY_META[candidate.mastery].label}</span>, drops back
                  to Not started.
                </li>
                <li>
                  {candidate.attempts > 0
                    ? `Its best score of ${pct(candidate.bestScore)} and all ${candidate.attempts} recorded attempt${candidate.attempts === 1 ? '' : 's'} on this unit.`
                    : 'Its scores, once there are any. No test has been recorded for this unit yet.'}
                </li>
                <li>
                  {candidate.practiceCompleted > 0
                    ? `${candidate.practiceCompleted} completed practice exercise${candidate.practiceCompleted === 1 ? '' : 's'}.`
                    : 'Any completed practice exercises.'}
                  {candidate.challengeCompleted ? ' The solved challenge is cleared too.' : ''}
                </li>
                {candidate.taught && <li>Your teach-back score for this unit.</li>}
                {candidate.completed && <li>The lesson-complete marker, so the unit counts as unlearned again.</li>}
                <li>Its place in the spaced-review schedule, and any weak-topic flag on it.</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-ink">What is kept</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted">
                <li>{candidate.hasNote ? 'Your note on this unit.' : 'Your notes, wherever you have written them.'}</li>
                <li>Every mistake-notebook entry from this unit, so what tripped you up is still there.</li>
                <li>
                  The XP you already earned, your streak, and the{' '}
                  {formatMinutes(candidate.minutesSpent)} of study time recorded against this unit.
                </li>
                <li>Its bookmark, if you had saved it.</li>
              </ul>
            </div>

            <p className="rounded-lg border border-line bg-surface-2 p-3 text-[12.5px] text-muted">
              The unit returns to your plan as unlearned, so the schedule will make room for it again and your
              remaining pace will shift by one unit.
            </p>
          </div>
        )}
      </Dialog>
    </div>
  );
}
