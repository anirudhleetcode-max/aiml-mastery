'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Loader2, PenLine, Search, X } from 'lucide-react';
import type { DomainId } from '@/types/curriculum';
import { domainColor } from '@/data/domains';
import { useLearnerStore } from '@/lib/store/learner';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { EmptyState, SectionHeading } from '@/components/ui/misc';
import { relativeTime } from '@/lib/format';
import { cn } from '@/lib/cn';

export interface NoteUnitMeta {
  unitId: string;
  title: string;
  slug: string;
  domainId: DomainId;
  domainName: string;
  module: string;
}

export interface NoteRow {
  unitId: string;
  body: string;
  updatedAt: string;
}

/**
 * Every note in one place.
 *
 * Editing happens in the list rather than in a separate screen, because a note
 * is usually corrected in the same breath as it is reread. Saving reuses the
 * lesson panel's contract: a debounced `note-saved` event plus a local patch,
 * so the text is on screen long before it is on the server.
 */
export function NotesView({
  initialNotes,
  units,
  prompts,
}: {
  initialNotes: NoteRow[];
  units: Record<string, NoteUnitMeta>;
  prompts: NoteUnitMeta[];
}) {
  const liveNotes = useLearnerStore((s) => s.state?.notes);
  const [query, setQuery] = React.useState('');
  const [openUnitId, setOpenUnitId] = React.useState<string | null>(null);
  /** A unit being written about from the prompt list; it stays there until done. */
  const [draftUnitId, setDraftUnitId] = React.useState<string | null>(null);

  const notes: NoteRow[] = React.useMemo(() => {
    const source = liveNotes ?? initialNotes;
    return [...source]
      .filter((n) => units[n.unitId] && n.body.trim().length > 0 && n.unitId !== draftUnitId)
      .map((n) => ({ unitId: n.unitId, body: n.body, updatedAt: n.updatedAt }))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [liveNotes, initialNotes, units, draftUnitId]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => {
      const meta = units[n.unitId];
      return `${n.body} ${meta?.title ?? ''} ${meta?.module ?? ''}`.toLowerCase().includes(q);
    });
  }, [notes, query, units]);

  const written = new Set(notes.map((n) => n.unitId));
  const stillOpen = prompts.filter((p) => !written.has(p.unitId) || p.unitId === draftUnitId);
  const draftMeta = stillOpen.find((p) => p.unitId === draftUnitId) ?? null;

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your notes and unit titles"
          aria-label="Search notes"
          className="pl-9"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-subtle transition-colors hover:bg-surface-3 hover:text-ink"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {notes.length === 0 ? (
        <EmptyState
          icon={<PenLine size={18} />}
          title="No notes yet"
          body="A note written in your own words while the lesson is still open is worth more later than any highlight. Open a unit, use the notes panel, and it appears here."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No note matches that"
          body={`Nothing in your ${notes.length} note${notes.length === 1 ? '' : 's'} contains “${query.trim()}”. Try a shorter word, or the unit title.`}
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((note) => {
            const meta = units[note.unitId]!;
            return (
              <li key={note.unitId}>
                <NoteCard
                  meta={meta}
                  note={note}
                  query={query.trim()}
                  open={openUnitId === note.unitId}
                  onOpenChange={(open) => setOpenUnitId(open ? note.unitId : null)}
                />
              </li>
            );
          })}
        </ul>
      )}

      {stillOpen.length > 0 && (
        <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          <SectionHeading
            as="h2"
            title="Units you finished without a note"
            description="No obligation. Writing one line about what surprised you is usually enough to make the unit come back later."
            className="mb-4"
          />
          <ul className="divide-y divide-line">
            {stillOpen.slice(0, 12).map((meta) => (
              <li key={meta.unitId} className="flex flex-wrap items-center gap-3 py-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: domainColor(meta.domainId) }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">{meta.title}</span>
                  <span className="text-[11.5px] text-subtle">{meta.domainName}</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDraftUnitId(draftUnitId === meta.unitId ? null : meta.unitId)}
                  aria-expanded={draftUnitId === meta.unitId}
                >
                  <PenLine size={13} /> Write a note
                </Button>
              </li>
            ))}
          </ul>

          {draftMeta && (
            <div className="mt-4 rounded-lg border border-line bg-surface-2 p-3.5">
              <NoteEditor meta={draftMeta} initialBody="" onDone={() => setDraftUnitId(null)} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function NoteCard({
  meta,
  note,
  query,
  open,
  onOpenChange,
}: {
  meta: NoteUnitMeta;
  note: NoteRow;
  query: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const preview = note.body.trim().split('\n').slice(0, 3).join('\n');

  return (
    <article className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: domainColor(meta.domainId) }}
          aria-hidden
        />
        <Link
          href={`/learn/${meta.slug}`}
          className="min-w-0 truncate text-[13.5px] font-semibold text-ink hover:text-primary hover:underline"
        >
          {meta.title}
        </Link>
        <span className="text-[11.5px] text-subtle">{meta.domainName}</span>
        <span className="ml-auto text-[11.5px] text-subtle">Edited {relativeTime(note.updatedAt)}</span>
      </div>

      {open ? (
        <div className="mt-3">
          <NoteEditor meta={meta} initialBody={note.body} onDone={() => onOpenChange(false)} />
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => onOpenChange(true)}
            aria-expanded={false}
            aria-label={`Edit your note on ${meta.title}`}
            className="mt-3 block w-full rounded-lg border border-line bg-surface-2 p-3 text-left transition-colors hover:border-line-strong"
          >
            <p
              className={cn(
                'whitespace-pre-wrap text-[13px] leading-relaxed text-muted',
                !query && 'line-clamp-3',
              )}
            >
              {query ? note.body : preview}
            </p>
          </button>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => onOpenChange(true)}>
              <PenLine size={13} /> Edit
            </Button>
            <Link
              href={`/learn/${meta.slug}`}
              className="ml-auto inline-flex items-center gap-1.5 text-[12.5px] font-medium text-primary hover:underline"
            >
              Open the unit
              <ArrowRight size={12} />
            </Link>
          </div>
        </>
      )}
    </article>
  );
}

/** Autosaving editor, same contract as the lesson notes panel. */
function NoteEditor({
  meta,
  initialBody,
  onDone,
}: {
  meta: NoteUnitMeta;
  initialBody: string;
  onDone: () => void;
}) {
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);

  const [body, setBody] = React.useState(initialBody);
  const [saved, setSaved] = React.useState(true);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const fieldId = React.useId();

  const save = React.useCallback(
    (value: string) => {
      emit({ type: 'note-saved', unitId: meta.unitId, body: value });
      patch((s) => {
        const existing = s.notes.find((n) => n.unitId === meta.unitId);
        const updatedAt = new Date().toISOString();
        return {
          ...s,
          notes: existing
            ? s.notes.map((n) => (n.unitId === meta.unitId ? { ...n, body: value, updatedAt } : n))
            : [...s.notes, { id: `local_${meta.unitId}`, unitId: meta.unitId, body: value, updatedAt }],
        };
      });
      setSaved(true);
    },
    [emit, patch, meta.unitId],
  );

  function onChange(value: string) {
    setBody(value);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(value), 900);
  }

  // A pending edit must never be lost when the editor unmounts.
  const bodyRef = React.useRef(body);
  bodyRef.current = body;
  const savedRef = React.useRef(saved);
  savedRef.current = saved;
  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (!savedRef.current) save(bodyRef.current);
    },
    [save],
  );

  return (
    <div>
      <label htmlFor={fieldId} className="text-[12.5px] font-medium text-ink">
        Your note on {meta.title}
      </label>
      <Textarea
        id={fieldId}
        autoFocus
        value={body}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'What clicked, what did not, and the one thing you want to remember.'}
        className="mt-1.5 min-h-44 text-[14px] leading-relaxed"
      />
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[12px] text-subtle" aria-live="polite">
          {saved ? (
            <>
              <Check size={12} className="text-success" /> Saved
            </>
          ) : (
            <>
              <Loader2 size={12} className="animate-spin" /> Saving
            </>
          )}
        </span>
        <Button
          size="sm"
          className="ml-auto"
          onClick={() => {
            if (!saved) save(body);
            onDone();
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
