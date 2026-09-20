import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { NotebookPen } from 'lucide-react';
import { requireUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';
import { UNIT_BY_ID } from '@/data/curriculum';
import { DOMAIN_BY_ID } from '@/data/domains';
import { Stat } from '@/components/ui/misc';
import { NotesView, type NoteRow, type NoteUnitMeta } from '@/components/notes/notes-view';
import { relativeTime } from '@/lib/format';
import type { LearningUnit } from '@/types/curriculum';

export const metadata: Metadata = { title: 'Notes' };
export const dynamic = 'force-dynamic';

function metaFor(unit: LearningUnit): NoteUnitMeta {
  return {
    unitId: unit.id,
    title: unit.title,
    slug: unit.slug,
    domainId: unit.domain,
    domainName: DOMAIN_BY_ID[unit.domain]?.name ?? unit.domain,
    module: unit.module,
  };
}

export default async function NotesPage() {
  const user = await requireUser();
  const state = await loadState(user.id);
  if (!state) redirect('/login');

  const units: Record<string, NoteUnitMeta> = {};

  const notes: NoteRow[] = state.notes.flatMap((n) => {
    const unit = UNIT_BY_ID.get(n.unitId);
    if (!unit || n.body.trim().length === 0) return [];
    units[unit.id] = metaFor(unit);
    return [{ unitId: n.unitId, body: n.body, updatedAt: n.updatedAt }];
  });

  const withNote = new Set(notes.map((n) => n.unitId));

  const prompts: NoteUnitMeta[] = Object.values(state.units)
    .filter((p) => p.lessonCompletedAt && !withNote.has(p.unitId))
    .sort((a, b) => (b.lessonCompletedAt ?? '').localeCompare(a.lessonCompletedAt ?? ''))
    .flatMap((p) => {
      const unit = UNIT_BY_ID.get(p.unitId);
      if (!unit) return [];
      const meta = metaFor(unit);
      units[unit.id] = meta;
      return [meta];
    });

  const words = notes.reduce((a, n) => a + n.body.trim().split(/\s+/).filter(Boolean).length, 0);
  const lastEdited = notes.reduce((latest, n) => (n.updatedAt > latest ? n.updatedAt : latest), '');

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Notes</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-subtle">
          What you wrote down in your own words, newest first. Notes are private, autosaved, and searchable here and
          from the unit they belong to.
        </p>
      </header>

      {notes.length > 0 && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <Stat label="Notes" value={notes.length} icon={<NotebookPen size={14} />} />
          <Stat label="Words written" value={words.toLocaleString('en-US')} />
          <Stat
            label="Last edited"
            value={<span className="text-base leading-snug">{lastEdited ? relativeTime(lastEdited) : '—'}</span>}
            className="col-span-2 lg:col-span-1"
          />
        </div>
      )}

      <NotesView initialNotes={notes} units={units} prompts={prompts} />
    </div>
  );
}
