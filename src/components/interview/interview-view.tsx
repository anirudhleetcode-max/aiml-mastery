'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Eye, RotateCw, Shuffle, Timer } from 'lucide-react';
import type { DomainId, InterviewLevel } from '@/types/curriculum';
import type { InterviewAttemptState, InterviewConfidence } from '@/types/progress';
import { domainColor } from '@/data/domains';
import { useLearnerStore } from '@/lib/store/learner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/input';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/misc';
import { ProgressBar } from '@/components/ui/progress';
import { pct } from '@/lib/format';

export interface InterviewRow {
  unitId: string;
  questionIndex: number;
  level: InterviewLevel;
  question: string;
  answer: string;
  followUp: string | null;
  unitTitle: string;
  unitSlug: string;
  domain: DomainId;
  domainName: string;
  taught: boolean;
}

const LEVEL_ORDER: InterviewLevel[] = [
  'beginner',
  'internship',
  'intermediate',
  'ml-engineer',
  'advanced',
  'ai-engineer',
];
const LEVEL_LABELS: Record<InterviewLevel, string> = {
  beginner: 'Beginner',
  internship: 'Internship',
  intermediate: 'Intermediate',
  'ml-engineer': 'ML engineer',
  advanced: 'Advanced',
  'ai-engineer': 'AI engineer',
};
const BANDS: Record<string, InterviewLevel[]> = {
  beginner: ['beginner', 'internship'],
  intermediate: ['intermediate', 'ml-engineer'],
  advanced: ['advanced', 'ai-engineer'],
};

const CONFIDENCE: { id: InterviewConfidence; label: string; tone: 'success' | 'warning' | 'danger' }[] = [
  { id: 'confident', label: 'I could answer this', tone: 'success' },
  { id: 'shaky', label: 'I half knew it', tone: 'warning' },
  { id: 'lost', label: 'I could not answer', tone: 'danger' },
];

const key = (unitId: string, index: number) => `${unitId}#${index}`;

type View = 'session' | 'browse' | 'readiness';

/**
 * Interview practice.
 *
 * The interaction is deliberately answer-first: the model answer stays hidden
 * until the learner asks for it, because reading a good answer and recognising
 * it is not the same as being able to produce one — and recognition is exactly
 * what an interview does not reward. The grade is only offered after the
 * reveal, and the elapsed timer starts on the question rather than the reveal
 * so hesitation is visible.
 */
export function InterviewView({
  rows,
  attempts,
  domains,
  byDomain,
  byLevel,
  weakUnits,
}: {
  rows: InterviewRow[];
  attempts: InterviewAttemptState[];
  domains: { id: DomainId; name: string }[];
  byDomain: { domain: DomainId; name: string; total: number; confident: number; attempted: number; readiness: number }[];
  byLevel: { level: InterviewLevel; label: string; total: number; confident: number; attempted: number }[];
  weakUnits: { unitId: string; title: string; slug: string; domain: DomainId; misses: number }[];
}) {
  const emit = useLearnerStore((s) => s.emit);
  const patch = useLearnerStore((s) => s.patch);
  const live = useLearnerStore((s) => s.state?.interviewAttempts);

  const [view, setView] = React.useState<View>('session');
  const [band, setBand] = React.useState<string>('all');
  const [domain, setDomain] = React.useState<string>('all');
  const [taughtOnly, setTaughtOnly] = React.useState(true);

  const [session, setSession] = React.useState<InterviewRow[] | null>(null);
  const [position, setPosition] = React.useState(0);
  const [revealed, setRevealed] = React.useState(false);
  const [startedAt, setStartedAt] = React.useState(() => Date.now());
  const [elapsed, setElapsed] = React.useState(0);

  const graded = React.useMemo(() => {
    const map = new Map<string, InterviewConfidence>();
    for (const a of live ?? attempts) map.set(key(a.unitId, a.questionIndex), a.confidence);
    return map;
  }, [live, attempts]);

  const filtered = React.useMemo(() => {
    const levels = band === 'all' ? null : new Set(BANDS[band]);
    return rows.filter((r) => {
      if (levels && !levels.has(r.level)) return false;
      if (domain !== 'all' && r.domain !== domain) return false;
      if (taughtOnly && !r.taught) return false;
      return true;
    });
  }, [rows, band, domain, taughtOnly]);

  /** Weakest first — lost, then shaky, then unseen, then already solid. */
  const ranked = React.useMemo(() => {
    const rank = (r: InterviewRow) => {
      const c = graded.get(key(r.unitId, r.questionIndex));
      if (c === 'lost') return 0;
      if (c === 'shaky') return 1;
      if (c === undefined) return 2;
      return 3;
    };
    return [...filtered].sort((a, b) => {
      const d = rank(a) - rank(b);
      if (d !== 0) return d;
      const la = LEVEL_ORDER.indexOf(a.level);
      const lb = LEVEL_ORDER.indexOf(b.level);
      return la - lb || a.unitId.localeCompare(b.unitId) || a.questionIndex - b.questionIndex;
    });
  }, [filtered, graded]);

  React.useEffect(() => {
    if (!session || revealed) return;
    const id = window.setInterval(() => setElapsed(Math.round((Date.now() - startedAt) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [session, revealed, startedAt]);

  function start(size: number) {
    setSession(ranked.slice(0, size));
    setPosition(0);
    setRevealed(false);
    setStartedAt(Date.now());
    setElapsed(0);
  }

  function grade(row: InterviewRow, confidence: InterviewConfidence) {
    emit({
      type: 'interview-attempted',
      unitId: row.unitId,
      questionIndex: row.questionIndex,
      confidence,
      seconds: Math.min(60 * 60, elapsed),
    });
    // Project locally so the card settles immediately, online or not.
    patch((s) => {
      const rest = s.interviewAttempts.filter(
        (a) => !(a.unitId === row.unitId && a.questionIndex === row.questionIndex),
      );
      return {
        ...s,
        interviewAttempts: [
          ...rest,
          {
            unitId: row.unitId,
            questionIndex: row.questionIndex,
            confidence,
            seconds: elapsed,
            attempts: 1,
            lastAttemptAt: new Date().toISOString(),
          },
        ],
      };
    });
    next();
  }

  function next() {
    setRevealed(false);
    setStartedAt(Date.now());
    setElapsed(0);
    setPosition((p) => p + 1);
  }

  const current = session?.[position] ?? null;
  const sessionDone = session != null && position >= session.length;

  return (
    <div className="space-y-4">
      <Tabs
        items={[
          { id: 'session', label: 'Practice session' },
          { id: 'browse', label: 'Browse the bank', badge: <span className="tabular-nums text-subtle">{filtered.length}</span> },
          { id: 'readiness', label: 'Readiness' },
        ]}
        value={view}
        onValueChange={(id) => setView(id as View)}
      />

      {/* ------------------------------------------------------- filters */}
      {view !== 'readiness' && (
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-[12.5px] font-medium text-subtle">
            Level
            <Select value={band} onChange={(e) => setBand(e.target.value)} className="h-9 w-44 text-[13px]">
              <option value="all">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
          </label>
          <label className="flex flex-col gap-1 text-[12.5px] font-medium text-subtle">
            Domain
            <Select value={domain} onChange={(e) => setDomain(e.target.value)} className="h-9 w-48 text-[13px]">
              <option value="all">All domains</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </label>
          <label className="flex items-center gap-2 pb-2 text-[12.5px] text-muted">
            <input
              type="checkbox"
              checked={taughtOnly}
              onChange={(e) => setTaughtOnly(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-[hsl(var(--c-primary))]"
            />
            Only what I have finished
          </label>
        </div>
      )}

      {/* ------------------------------------------------------- session */}
      {view === 'session' && (
        <>
          {session == null && (
            <div className="rounded-xl border border-line bg-surface-2 p-5">
              <p className="text-[13.5px] font-semibold text-ink">Build a session</p>
              <p className="mt-1 text-[13px] leading-relaxed text-subtle">
                Questions are ordered by what you have struggled with: ones you could not answer first, then shaky
                ones, then ones you have never seen. {filtered.length} question{filtered.length === 1 ? '' : 's'} match
                your filters.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[5, 10, 20].map((n) => (
                  <Button key={n} size="sm" onClick={() => start(n)} disabled={filtered.length === 0}>
                    <Shuffle size={13} /> {n} questions
                  </Button>
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="mt-3 text-[12.5px] text-warning">
                  Nothing matches. Widen the level or domain, or untick &ldquo;only what I have finished&rdquo;.
                </p>
              )}
            </div>
          )}

          {current && (
            <article className="rounded-xl border border-line bg-surface-2 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded px-2 py-0.5 text-[11px] font-semibold"
                    style={{ background: domainColor(current.domain, 0.14), color: domainColor(current.domain) }}
                  >
                    {current.domainName}
                  </span>
                  <Badge tone="primary">{LEVEL_LABELS[current.level]}</Badge>
                  {graded.has(key(current.unitId, current.questionIndex)) && (
                    <Badge tone="neutral">Seen before</Badge>
                  )}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[12px] tabular-nums text-subtle">
                  <Timer size={13} /> {elapsed}s
                  <span className="ml-2">
                    {position + 1} of {session!.length}
                  </span>
                </span>
              </div>

              <ProgressBar
                value={(position + 1) / session!.length}
                className="mt-3"
                label="Session progress"
              />

              <h3 className="mt-4 text-[16px] font-semibold leading-snug text-ink">{current.question}</h3>

              {!revealed ? (
                <div className="mt-4">
                  <p className="text-[13px] leading-relaxed text-subtle">
                    Answer it out loud, properly, before you reveal anything. Recognising a good answer is not the same
                    as producing one, and only one of those is what an interview measures.
                  </p>
                  <Button className="mt-3" onClick={() => setRevealed(true)}>
                    <Eye size={14} /> Show a strong answer
                  </Button>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg border border-line bg-surface p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">
                      What a strong answer covers
                    </p>
                    <p className="mt-2 whitespace-pre-line text-[13.5px] leading-relaxed text-muted">
                      {current.answer}
                    </p>
                    {current.followUp && (
                      <p className="mt-3 border-t border-line pt-3 text-[12.5px] leading-relaxed text-subtle">
                        <strong className="text-ink">Follow-up: </strong>
                        {current.followUp}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-[12.5px] font-medium text-ink">How did yours compare?</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {CONFIDENCE.map((c) => (
                        <Button
                          key={c.id}
                          size="sm"
                          variant={c.id === 'confident' ? 'success' : c.id === 'shaky' ? 'secondary' : 'danger'}
                          onClick={() => grade(current, c.id)}
                        >
                          {c.label}
                        </Button>
                      ))}
                    </div>
                    <p className="mt-2 text-[12px] text-subtle">
                      Your answer to this is what readiness is computed from. Grade it the way an interviewer would.
                    </p>
                  </div>

                  <Link
                    href={`/learn/${current.unitSlug}`}
                    className="inline-flex items-center gap-1.5 text-[12.5px] text-primary-ink hover:underline"
                  >
                    Read {current.unitTitle} <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </article>
          )}

          {sessionDone && (
            <div className="rounded-xl border border-line bg-surface-2 p-5 text-center">
              <Check size={20} className="mx-auto text-success" />
              <p className="mt-2 text-[14px] font-semibold text-ink">Session complete</p>
              <p className="mt-1 text-[13px] text-subtle">
                {session!.length} question{session!.length === 1 ? '' : 's'} graded. The readiness tab has moved.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button size="sm" onClick={() => start(session!.length)}>
                  <RotateCw size={13} /> Another {session!.length}
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setSession(null)}>
                  Change the filters
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* -------------------------------------------------------- browse */}
      {view === 'browse' && (
        <div className="space-y-2">
          {ranked.length === 0 ? (
            <EmptyState
              icon={<Shuffle size={18} />}
              title="Nothing matches those filters"
              body="Widen the level or the domain, or untick “only what I have finished” to see questions from units still ahead of you."
            />
          ) : (
            ranked.slice(0, 60).map((r) => {
              const c = graded.get(key(r.unitId, r.questionIndex));
              return (
                <details key={key(r.unitId, r.questionIndex)} className="group rounded-lg border border-line bg-surface p-3.5">
                  <summary className="cursor-pointer list-none marker:content-none">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[13.5px] font-medium leading-snug text-ink">{r.question}</span>
                      {c && (
                        <Badge tone={c === 'confident' ? 'success' : c === 'shaky' ? 'warning' : 'danger'}>
                          {c === 'confident' ? 'Solid' : c === 'shaky' ? 'Shaky' : 'Missed'}
                        </Badge>
                      )}
                    </div>
                    <span className="mt-1 block text-[11.5px] text-subtle">
                      {r.domainName} · {r.unitTitle} · {LEVEL_LABELS[r.level]}
                    </span>
                  </summary>
                  <p className="mt-3 whitespace-pre-line border-t border-line pt-3 text-[13px] leading-relaxed text-muted">
                    {r.answer}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CONFIDENCE.map((cc) => (
                      <Button
                        key={cc.id}
                        size="sm"
                        variant={cc.id === 'confident' ? 'success' : cc.id === 'shaky' ? 'secondary' : 'danger'}
                        onClick={() => {
                          emit({
                            type: 'interview-attempted',
                            unitId: r.unitId,
                            questionIndex: r.questionIndex,
                            confidence: cc.id,
                            seconds: 0,
                          });
                          patch((s) => ({
                            ...s,
                            interviewAttempts: [
                              ...s.interviewAttempts.filter(
                                (a) => !(a.unitId === r.unitId && a.questionIndex === r.questionIndex),
                              ),
                              {
                                unitId: r.unitId,
                                questionIndex: r.questionIndex,
                                confidence: cc.id,
                                seconds: 0,
                                attempts: 1,
                                lastAttemptAt: new Date().toISOString(),
                              },
                            ],
                          }));
                        }}
                      >
                        {cc.label}
                      </Button>
                    ))}
                  </div>
                </details>
              );
            })
          )}
          {ranked.length > 60 && (
            <p className="pt-1 text-[12px] text-subtle">
              Showing the 60 most useful of {ranked.length}. Narrow the filters, or run a session instead.
            </p>
          )}
        </div>
      )}

      {/* ----------------------------------------------------- readiness */}
      {view === 'readiness' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-[13.5px] font-semibold text-ink">By domain</h3>
            <p className="mt-0.5 text-[12.5px] text-subtle">
              Confident answers as a share of that domain&rsquo;s questions. A domain you have not practised reads zero,
              which is the honest starting point rather than a flattering one.
            </p>
            <ul className="mt-3 space-y-2">
              {byDomain.map((d) => (
                <li key={d.domain} className="flex items-center gap-3">
                  <span className="w-40 shrink-0 truncate text-[12.5px] text-muted">{d.name}</span>
                  <ProgressBar value={d.readiness} className="flex-1" label={`${d.name} interview readiness`} />
                  <span className="w-24 shrink-0 text-right text-[12px] tabular-nums text-subtle">
                    {d.confident}/{d.total} · {pct(d.readiness)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13.5px] font-semibold text-ink">By seniority</h3>
            <ul className="mt-3 space-y-2">
              {byLevel.map((l) => (
                <li key={l.level} className="flex items-center gap-3">
                  <span className="w-40 shrink-0 truncate text-[12.5px] text-muted">{l.label}</span>
                  <ProgressBar
                    value={l.total ? l.confident / l.total : 0}
                    className="flex-1"
                    label={`${l.label} interview readiness`}
                  />
                  <span className="w-24 shrink-0 text-right text-[12px] tabular-nums text-subtle">
                    {l.confident}/{l.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13.5px] font-semibold text-ink">Units behind your misses</h3>
            {weakUnits.length === 0 ? (
              <p className="mt-1 text-[12.5px] text-subtle">
                Nothing flagged yet. This fills in as you grade answers as shaky or missed.
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {weakUnits.map((u) => (
                  <li key={u.unitId}>
                    <Link
                      href={`/learn/${u.slug}`}
                      className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[13px] hover:border-line-strong"
                    >
                      <span className="truncate text-ink">{u.title}</span>
                      <span className="shrink-0 text-[12px] text-warning">
                        {u.misses} question{u.misses === 1 ? '' : 's'} to revisit
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
