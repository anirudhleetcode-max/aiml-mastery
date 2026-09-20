'use client';

import * as React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLearnerStore } from '@/lib/store/learner';
import { relativeTime } from '@/lib/format';

/**
 * Per-unit private notes, autosaved.
 *
 * Saving goes through the same offline queue as everything else, so a note
 * written on a train survives the tunnel.
 */
export function NotesPanel({
  open,
  onClose,
  unitId,
  unitTitle,
}: {
  open: boolean;
  onClose: () => void;
  unitId: string;
  unitTitle: string;
}) {
  const note = useLearnerStore((s) => s.state?.notes.find((n) => n.unitId === unitId));
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);

  const [body, setBody] = React.useState(note?.body ?? '');
  const [saved, setSaved] = React.useState(true);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (open) setBody(note?.body ?? '');
  }, [open, note?.body]);

  const save = React.useCallback(
    (value: string) => {
      emit({ type: 'note-saved', unitId, body: value });
      patch((s) => {
        const existing = s.notes.find((n) => n.unitId === unitId);
        const updatedAt = new Date().toISOString();
        return {
          ...s,
          notes: existing
            ? s.notes.map((n) => (n.unitId === unitId ? { ...n, body: value, updatedAt } : n))
            : [...s.notes, { id: `local_${unitId}`, unitId, body: value, updatedAt }],
        };
      });
      setSaved(true);
    },
    [emit, patch, unitId],
  );

  function onChange(value: string) {
    setBody(value);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(value), 900);
  }

  // Never lose an in-flight edit when the panel closes.
  React.useEffect(() => {
    if (open) return;
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!saved) save(body);
        onClose();
      }}
      title="Your notes"
      description={unitTitle}
      size="lg"
      footer={
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] text-subtle">
            {saved ? (
              <>
                <Check size={12} className="text-success" />
                {note?.updatedAt ? `Saved ${relativeTime(note.updatedAt)}` : 'Saved'}
              </>
            ) : (
              <>
                <Loader2 size={12} className="animate-spin" /> Saving…
              </>
            )}
          </span>
          <Button
            size="sm"
            onClick={() => {
              if (!saved) save(body);
              onClose();
            }}
          >
            Done
          </Button>
        </div>
      }
    >
      <Textarea
        data-autofocus
        value={body}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          'What clicked, what did not, and the one thing you want to remember.\n\nCode, formulas and checklists all belong here — this is your page, not a form.'
        }
        className="min-h-64 font-[inherit] text-[14px] leading-relaxed"
        aria-label={`Notes for ${unitTitle}`}
      />
      <p className="mt-2 text-[11.5px] leading-relaxed text-subtle">
        Private to you. Notes appear in your Notes page and in search results.
      </p>
    </Dialog>
  );
}
