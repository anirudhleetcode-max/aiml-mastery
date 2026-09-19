'use client';

import Link from 'next/link';
import { ArrowRight, Check, ClipboardCheck, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { domainColor } from '@/data/domains';
import { formatMinutes } from '@/lib/format';
import type { DomainId } from '@/types/curriculum';
import { cn } from '@/lib/cn';

export interface TodayItem {
  id: string;
  title: string;
  slug: string;
  domain: DomainId;
  module: string;
  minutes: number;
  done: boolean;
}

export function TodayCard({
  items,
  testDone,
  testHref = '/tests/daily',
  theme,
}: {
  items: TodayItem[];
  testDone: boolean;
  testHref?: string;
  theme: string;
}) {
  const done = items.filter((i) => i.done).length;
  const totalSteps = items.length + 1; // the daily test is always a step
  const completedSteps = done + (testDone ? 1 : 0);
  const progress = totalSteps ? completedSteps / totalSteps : 0;
  const next = items.find((i) => !i.done);
  const allLessonsDone = items.length > 0 && done === items.length;

  return (
    <section className="rounded-xl border border-line bg-surface p-5" aria-labelledby="today-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="today-heading" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">
            Today&rsquo;s mission
          </h2>
          <p className="mt-2 text-lg font-semibold tracking-tight text-ink">{theme}</p>
        </div>
        <Badge tone={progress === 1 ? 'success' : 'primary'}>{Math.round(progress * 100)}% complete</Badge>
      </div>

      <ProgressBar value={progress} className="mt-4" label="Today's progress" />

      {items.length === 0 ? (
        <p className="mt-5 rounded-lg border border-dashed border-line px-4 py-6 text-center text-[13px] text-subtle">
          No units scheduled today — this is a planned rest day. A short review is still worth doing.
        </p>
      ) : (
        <ul className="mt-5 space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/learn/${item.slug}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                  item.done ? 'border-line bg-surface-2/50' : 'border-line hover:border-line-strong hover:bg-surface-2',
                )}
              >
                <span
                  className={cn(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-full',
                    item.done ? 'bg-success/15 text-success' : 'text-subtle',
                  )}
                >
                  {item.done ? <Check size={13} strokeWidth={3} /> : <Circle size={13} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('block truncate text-[14px] font-medium', item.done ? 'text-subtle line-through' : 'text-ink')}>
                    {item.title}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-subtle">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: domainColor(item.domain) }} aria-hidden />
                    {item.module} · {formatMinutes(item.minutes)}
                  </span>
                </span>
              </Link>
            </li>
          ))}

          <li>
            <Link
              href={testHref}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                testDone
                  ? 'border-line bg-surface-2/50'
                  : allLessonsDone
                    ? 'border-primary/40 bg-primary/8 hover:border-primary/60'
                    : 'border-line hover:border-line-strong hover:bg-surface-2',
              )}
            >
              <span
                className={cn(
                  'grid h-6 w-6 shrink-0 place-items-center rounded-full',
                  testDone ? 'bg-success/15 text-success' : 'text-primary',
                )}
              >
                {testDone ? <Check size={13} strokeWidth={3} /> : <ClipboardCheck size={13} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn('block text-[14px] font-medium', testDone ? 'text-subtle line-through' : 'text-ink')}>
                  Daily test
                </span>
                <span className="mt-0.5 block text-[11.5px] text-subtle">
                  {testDone
                    ? 'Done — your streak is protected.'
                    : `Drawn only from today's ${items.length === 1 ? 'unit' : 'units'}.`}
                </span>
              </span>
            </Link>
          </li>
        </ul>
      )}

      <div className="mt-5">
        {next ? (
          <Link href={`/learn/${next.slug}`}>
            <Button className="w-full group" size="lg">
              Continue: {next.title}
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        ) : !testDone && items.length > 0 ? (
          <Link href={testHref}>
            <Button className="w-full" size="lg">
              Take today&rsquo;s test
              <ArrowRight size={16} />
            </Button>
          </Link>
        ) : (
          <Link href="/today">
            <Button className="w-full" size="lg" variant="secondary">
              Open today&rsquo;s mission
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
