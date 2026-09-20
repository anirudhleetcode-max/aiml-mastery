'use client';

import * as React from 'react';
import type { WidgetId } from '@/types/curriculum';
import { Skeleton } from '@/components/ui/misc';

/**
 * Interactive explanation widgets.
 *
 * Widgets live one-per-file at `./widgets/<widget-id>.tsx`, and are resolved
 * by a dynamic import over that directory. The bundler turns this into a
 * context of lazy chunks, so a lesson about dictionaries never downloads the
 * 3D loss-surface renderer, and adding a widget means adding a file — there
 * is no registry to keep in sync.
 */

type WidgetComponent = React.ComponentType<{ props?: Record<string, unknown> }>;

const cache = new Map<string, React.LazyExoticComponent<WidgetComponent>>();

function loadWidget(id: WidgetId) {
  const existing = cache.get(id);
  if (existing) return existing;
  const lazy = React.lazy(async () => {
    const mod = (await import(`./widgets/${id}`)) as { default: WidgetComponent };
    return { default: mod.default };
  });
  cache.set(id, lazy);
  return lazy;
}

export function WidgetMount({ widget, props }: { widget: WidgetId; props?: Record<string, unknown> }) {
  const [mounted, setMounted] = React.useState(false);

  // These are all canvas- or measurement-driven, so none of them can render on
  // the server. Mounting after hydration avoids a wasted SSR pass entirely.
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <Skeleton className="h-64 w-full" />;

  const Component = loadWidget(widget);

  return (
    <WidgetBoundary widget={widget}>
      <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <Component props={props} />
      </React.Suspense>
    </WidgetBoundary>
  );
}

/**
 * A failing widget must never take a lesson down with it — the text is the
 * substance, the widget is the illustration.
 */
class WidgetBoundary extends React.Component<
  { widget: string; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error(`[widget:${this.props.widget}]`, error);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-[12.5px] text-subtle">
          This interactive illustration could not load in your browser. The explanation above stands on its own.
        </div>
      );
    }
    return this.props.children;
  }
}
