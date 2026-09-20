'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bookmark, Check, CircleAlert, NotebookPen, RotateCcw } from 'lucide-react';
import { useLearnerStore } from '@/lib/store/learner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { MASTERY_META, type MasteryLevel } from '@/types/progress';
import { NotesPanel } from './notes-panel';
import { cn } from '@/lib/cn';

export interface LessonSection {
  id: string;
  label: string;
  node: React.ReactNode;
}

export interface LessonMeta {
  unitId: string;
  title: string;
  slug: string;
  domainName: string;
  domainId: string;
  module: string;
  topic: string;
  difficulty: number;
  estimatedMinutes: number;
  prevSlug: string | null;
  prevTitle: string | null;
  nextSlug: string | null;
  nextTitle: string | null;
}

/**
 * The lesson player.
 *
 * Sections are rendered on the server (so KaTeX and syntax highlighting never
 * ship to the browser) and handed to this client shell as nodes. The shell
 * owns navigation, the time-on-unit timer, bookmarking, notes and completion.
 */
export function LessonShell({
  meta,
  sections,
  initialSection,
}: {
  meta: LessonMeta;
  sections: LessonSection[];
  initialSection?: string;
}) {
  const progress = useLearnerStore((s) => s.state?.units[meta.unitId]);
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);

  const startIndex = Math.max(0, sections.findIndex((s) => s.id === initialSection));
  const [index, setIndex] = React.useState(initialSection ? startIndex : 0);
  const [notesOpen, setNotesOpen] = React.useState(false);
  const [furthest, setFurthest] = React.useState(index);

  const sessionStart = React.useRef(Date.now());
  const contentRef = React.useRef<HTMLDivElement>(null);

  const mastery: MasteryLevel = progress?.mastery ?? 'NOT_STARTED';
  const completed = Boolean(progress?.lessonCompletedAt);
  const bookmarked = progress?.bookmarked ?? false;
  const difficult = progress?.flaggedDifficult ?? false;

  // Record time on the unit when the learner leaves, so study-time totals are
  // real rather than estimated from page views.
  React.useEffect(() => {
    const unitId = meta.unitId;
    const started = sessionStart.current;
    return () => {
      const seconds = Math.round((Date.now() - started) / 1000);
      if (seconds > 20) {
        useLearnerStore.getState().emit({ type: 'session-recorded', unitId, kind: 'lesson', seconds: Math.min(seconds, 7200) });
      }
    };
  }, [meta.unitId]);

  React.useEffect(() => {
    setFurthest((f) => Math.max(f, index));
    contentRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    // Keep the URL shareable without a navigation.
    const section = sections[index];
    if (section && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${section.id}`);
    }
  }, [index, sections]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey) setIndex((i) => Math.min(sections.length - 1, i + 1));
      if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey) setIndex((i) => Math.max(0, i - 1));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sections.length]);

  function markComplete() {
    const seconds = Math.round((Date.now() - sessionStart.current) / 1000);
    emit({ type: 'lesson-completed', unitId: meta.unitId, seconds: Math.min(seconds, 7200) });
    patch((s) => {
      const existing = s.units[meta.unitId];
      if (!existing) return s;
      return {
        ...s,
        units: {
          ...s.units,
          [meta.unitId]: {
            ...existing,
            lessonCompletedAt: existing.lessonCompletedAt ?? new Date().toISOString(),
            mastery: existing.mastery === 'NOT_STARTED' ? 'INTRODUCED' : existing.mastery,
          },
        },
      };
    });
  }

  function toggle(kind: 'bookmark' | 'difficult') {
    const value = kind === 'bookmark' ? !bookmarked : !difficult;
    emit(
      kind === 'bookmark'
        ? { type: 'bookmark-toggled', unitId: meta.unitId, value }
        : { type: 'difficult-flagged', unitId: meta.unitId, value },
    );
    patch((s) => {
      const existing = s.units[meta.unitId];
      if (!existing) return s;
      return {
        ...s,
        units: {
          ...s.units,
          [meta.unitId]: { ...existing, [kind === 'bookmark' ? 'bookmarked' : 'flaggedDifficult']: value },
        },
      };
    });
  }

  const section = sections[index]!;
  const readProgress = (furthest + 1) / sections.length;

  return (
    <div className="mx-auto max-w-6xl">
      {/* ------------------------------------------------- Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-subtle">
          <li>
            <Link href="/roadmap" className="hover:text-ink">AI/ML</Link>
          </li>
          <li aria-hidden>→</li>
          <li>
            <Link href={`/roadmap#${meta.domainId}`} className="hover:text-ink">{meta.domainName}</Link>
          </li>
          <li aria-hidden>→</li>
          <li>{meta.module}</li>
          <li aria-hidden>→</li>
          <li className="font-medium text-muted">{meta.topic}</li>
        </ol>
      </nav>

      {/* ------------------------------------------------------ Header */}
      <header className="rounded-xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary">{meta.unitId}</Badge>
              <Badge tone={mastery === 'NOT_STARTED' ? 'neutral' : 'success'}>{MASTERY_META[mastery].label}</Badge>
              <span className="text-[12px] text-subtle" title={`Difficulty ${meta.difficulty} of 5`}>
                {'★'.repeat(meta.difficulty)}
                <span className="text-subtle/40">{'★'.repeat(5 - meta.difficulty)}</span>
              </span>
              <span className="text-[12px] text-subtle">~{meta.estimatedMinutes} min</span>
            </div>
            <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-ink">{meta.title}</h1>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => toggle('bookmark')}
              aria-pressed={bookmarked}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this unit'}
              className={cn(
                'grid h-9 w-9 place-items-center rounded-lg border transition-colors',
                bookmarked ? 'border-primary/40 bg-primary/10 text-primary' : 'border-line text-subtle hover:text-ink',
              )}
            >
              <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              onClick={() => toggle('difficult')}
              aria-pressed={difficult}
              aria-label={difficult ? 'Unmark as difficult' : 'Mark as difficult'}
              title="Mark as difficult — it will be prioritised for review"
              className={cn(
                'grid h-9 w-9 place-items-center rounded-lg border transition-colors',
                difficult ? 'border-warning/40 bg-warning/10 text-warning' : 'border-line text-subtle hover:text-ink',
              )}
            >
              <CircleAlert size={15} />
            </button>
            <button
              type="button"
              onClick={() => setNotesOpen(true)}
              aria-label="Open notes"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-subtle transition-colors hover:text-ink"
            >
              <NotebookPen size={15} />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="shrink-0 text-[12px] tabular-nums text-subtle">
            {index + 1}/{sections.length}
          </span>
          <ProgressBar value={readProgress} className="flex-1" label="Lesson progress" />
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[200px_1fr]">
        {/* ------------------------------------------------ Section nav */}
        <nav aria-label="Lesson sections" className="lg:sticky lg:top-20 lg:self-start">
          <ol className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {sections.map((s, i) => (
              <li key={s.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? 'step' : undefined}
                  className={cn(
                    'flex w-full items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-left text-[12.5px] font-medium transition-colors',
                    i === index ? 'bg-primary/12 text-primary' : 'text-subtle hover:bg-surface-2 hover:text-ink',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px] tabular-nums',
                      i < furthest ? 'border-success/50 bg-success/15 text-success' : i === index ? 'border-primary text-primary' : 'border-line text-subtle',
                    )}
                  >
                    {i < furthest ? <Check size={9} strokeWidth={3.5} /> : i + 1}
                  </span>
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* --------------------------------------------------- Content */}
        <div ref={contentRef} className="min-w-0 scroll-mt-20">
          <section key={section.id} aria-label={section.label} className="min-h-[24rem]">
            {section.node}
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <Button variant="ghost" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              <ArrowLeft size={15} /> {sections[index - 1]?.label ?? 'Back'}
            </Button>

            {index < sections.length - 1 ? (
              <Button onClick={() => setIndex((i) => i + 1)}>
                {sections[index + 1]?.label} <ArrowRight size={15} />
              </Button>
            ) : completed ? (
              <div className="flex items-center gap-2">
                <Badge tone="success">
                  <Check size={11} /> Lesson complete
                </Badge>
                {meta.nextSlug && (
                  <Link href={`/learn/${meta.nextSlug}`}>
                    <Button>
                      Next: {meta.nextTitle} <ArrowRight size={15} />
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <Button onClick={markComplete} size="lg">
                <Check size={16} /> Mark lesson complete
              </Button>
            )}
          </div>

          {/* ------------------------------------------- Unit footer nav */}
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {meta.prevSlug ? (
              <Link
                href={`/learn/${meta.prevSlug}`}
                className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              >
                <p className="text-[11px] uppercase tracking-[0.1em] text-subtle">Previous unit</p>
                <p className="mt-1 text-[13.5px] font-medium text-ink group-hover:text-primary">{meta.prevTitle}</p>
              </Link>
            ) : (
              <div />
            )}
            {meta.nextSlug && (
              <Link
                href={`/learn/${meta.nextSlug}`}
                className="group rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-line-strong"
              >
                <p className="text-[11px] uppercase tracking-[0.1em] text-subtle">Next unit</p>
                <p className="mt-1 text-[13.5px] font-medium text-ink group-hover:text-primary">{meta.nextTitle}</p>
              </Link>
            )}
          </div>

          {completed && (
            <button
              type="button"
              onClick={() => emit({ type: 'unit-reset', unitId: meta.unitId })}
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-subtle hover:text-ink"
            >
              <RotateCcw size={12} /> Reset my progress on this unit
            </button>
          )}
        </div>
      </div>

      <NotesPanel open={notesOpen} onClose={() => setNotesOpen(false)} unitId={meta.unitId} unitTitle={meta.title} />
    </div>
  );
}
