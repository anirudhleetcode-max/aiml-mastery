'use client';

import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/misc';

export interface AttentionItem {
  id: string;
  title: string;
  slug: string;
  detail: string;
}

export function AttentionList({
  weak,
  reviews,
}: {
  weak: AttentionItem[];
  reviews: AttentionItem[];
}) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <Panel
        title="Needs another pass"
        icon={<AlertTriangle size={14} className="text-warning" />}
        items={weak}
        emptyTitle="Nothing shaky"
        emptyBody="No unit is currently scoring below the understanding bar. That is worth noticing."
        tone="warning"
      />
      <Panel
        title="Due for review"
        icon={<RotateCcw size={14} className="text-info" />}
        items={reviews}
        emptyTitle="Nothing due"
        emptyBody="Reviews are scheduled automatically after each test. The next one will appear here."
        tone="info"
      />
    </section>
  );
}

function Panel({
  title,
  icon,
  items,
  emptyTitle,
  emptyBody,
  tone,
}: {
  title: string;
  icon: React.ReactNode;
  items: AttentionItem[];
  emptyTitle: string;
  emptyBody: string;
  tone: 'warning' | 'info';
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          {icon}
          {title}
        </h2>
        {items.length > 0 && <Badge tone={tone}>{items.length}</Badge>}
      </div>

      {items.length === 0 ? (
        <EmptyState title={emptyTitle} body={emptyBody} className="mt-4 border-0 px-0 py-8" />
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {items.slice(0, 5).map((item) => (
            <li key={item.id}>
              <Link href={`/learn/${item.slug}`} className="group flex items-baseline justify-between gap-3 py-2.5">
                <span className="min-w-0 truncate text-[13px] font-medium text-ink group-hover:text-primary-ink">
                  {item.title}
                </span>
                <span className="shrink-0 text-[11.5px] tabular-nums text-subtle">{item.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
