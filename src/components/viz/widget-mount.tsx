'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { WidgetId } from '@/types/curriculum';
import { Skeleton } from '@/components/ui/misc';

/**
 * Interactive explanation widgets.
 *
 * Each is loaded only when a lesson actually renders it, so a lesson about
 * dictionaries never downloads the 3D loss-surface renderer. `ssr: false`
 * because every one of these is canvas- or measurement-driven.
 */
const Loading = () => <Skeleton className="h-64 w-full" />;
const opts = { ssr: false as const, loading: Loading };

export const WIDGETS: Record<WidgetId, React.ComponentType<{ props?: Record<string, unknown> }>> = {
  'number-line-binary-search': dynamic(() => import('./widgets/number-line-binary-search'), opts),
  'big-o-growth': dynamic(() => import('./widgets/big-o-growth'), opts),
  'array-indexing': dynamic(() => import('./widgets/array-indexing'), opts),
  'linked-list': dynamic(() => import('./widgets/linked-list'), opts),
  'stack-queue': dynamic(() => import('./widgets/stack-queue'), opts),
  'hash-table': dynamic(() => import('./widgets/hash-table'), opts),
  'binary-tree': dynamic(() => import('./widgets/binary-tree'), opts),
  'graph-traversal': dynamic(() => import('./widgets/graph-traversal'), opts),
  'sorting-race': dynamic(() => import('./widgets/sorting-race'), opts),
  'recursion-tree': dynamic(() => import('./widgets/recursion-tree'), opts),
  'ndarray-explorer': dynamic(() => import('./widgets/ndarray-explorer'), opts),
  broadcasting: dynamic(() => import('./widgets/broadcasting'), opts),
  'dataframe-playground': dynamic(() => import('./widgets/dataframe-playground'), opts),
  'chart-chooser': dynamic(() => import('./widgets/chart-chooser'), opts),
  'sql-playground': dynamic(() => import('./widgets/sql-playground'), opts),
  'vector-playground': dynamic(() => import('./widgets/vector-playground'), opts),
  'matrix-transform': dynamic(() => import('./widgets/matrix-transform'), opts),
  'dot-product': dynamic(() => import('./widgets/dot-product'), opts),
  'derivative-explorer': dynamic(() => import('./widgets/derivative-explorer'), opts),
  'gradient-surface-3d': dynamic(() => import('./widgets/gradient-surface-3d'), opts),
  'coin-flip-sim': dynamic(() => import('./widgets/coin-flip-sim'), opts),
  'distribution-explorer': dynamic(() => import('./widgets/distribution-explorer'), opts),
  'bayes-explorer': dynamic(() => import('./widgets/bayes-explorer'), opts),
  'clt-sim': dynamic(() => import('./widgets/clt-sim'), opts),
  'confidence-interval-sim': dynamic(() => import('./widgets/confidence-interval-sim'), opts),
  'linear-regression-lab': dynamic(() => import('./widgets/linear-regression-lab'), opts),
  'gradient-descent-lab': dynamic(() => import('./widgets/gradient-descent-lab'), opts),
  'logistic-boundary-lab': dynamic(() => import('./widgets/logistic-boundary-lab'), opts),
  'knn-lab': dynamic(() => import('./widgets/knn-lab'), opts),
  'decision-tree-lab': dynamic(() => import('./widgets/decision-tree-lab'), opts),
  'kmeans-lab': dynamic(() => import('./widgets/kmeans-lab'), opts),
  'pca-lab': dynamic(() => import('./widgets/pca-lab'), opts),
  'svm-margin-lab': dynamic(() => import('./widgets/svm-margin-lab'), opts),
  'bias-variance-lab': dynamic(() => import('./widgets/bias-variance-lab'), opts),
  'confusion-matrix-lab': dynamic(() => import('./widgets/confusion-matrix-lab'), opts),
  'roc-lab': dynamic(() => import('./widgets/roc-lab'), opts),
  'regularization-lab': dynamic(() => import('./widgets/regularization-lab'), opts),
  'neural-network-lab': dynamic(() => import('./widgets/neural-network-lab'), opts),
  'activation-explorer': dynamic(() => import('./widgets/activation-explorer'), opts),
  'backprop-flow': dynamic(() => import('./widgets/backprop-flow'), opts),
  'convolution-lab': dynamic(() => import('./widgets/convolution-lab'), opts),
  'pooling-lab': dynamic(() => import('./widgets/pooling-lab'), opts),
  'rnn-unroll': dynamic(() => import('./widgets/rnn-unroll'), opts),
  'attention-lab': dynamic(() => import('./widgets/attention-lab'), opts),
  'tokenizer-lab': dynamic(() => import('./widgets/tokenizer-lab'), opts),
  'embedding-space-3d': dynamic(() => import('./widgets/embedding-space-3d'), opts),
  'tfidf-lab': dynamic(() => import('./widgets/tfidf-lab'), opts),
  'transformer-flow': dynamic(() => import('./widgets/transformer-flow'), opts),
  'image-pixels-lab': dynamic(() => import('./widgets/image-pixels-lab'), opts),
  'edge-detection-lab': dynamic(() => import('./widgets/edge-detection-lab'), opts),
  'augmentation-lab': dynamic(() => import('./widgets/augmentation-lab'), opts),
  'rag-flow': dynamic(() => import('./widgets/rag-flow'), opts),
  'context-window-lab': dynamic(() => import('./widgets/context-window-lab'), opts),
  'ml-pipeline-flow': dynamic(() => import('./widgets/ml-pipeline-flow'), opts),
  'drift-monitor': dynamic(() => import('./widgets/drift-monitor'), opts),
  'docker-layers': dynamic(() => import('./widgets/docker-layers'), opts),
  'ci-cd-flow': dynamic(() => import('./widgets/ci-cd-flow'), opts),
  'code-playground': dynamic(() => import('./widgets/code-playground'), opts),
};

export function WidgetMount({ widget, props }: { widget: WidgetId; props?: Record<string, unknown> }) {
  const Component = WIDGETS[widget];
  if (!Component) return null;
  return (
    <ErrorBoundary widget={widget}>
      <Component props={props} />
    </ErrorBoundary>
  );
}

/**
 * A failing widget must never take a lesson down with it — the text is the
 * substance, the widget is the illustration.
 */
class ErrorBoundary extends React.Component<
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
