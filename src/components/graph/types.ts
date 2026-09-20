import type { DomainId } from '@/types/curriculum';
import type { MasteryLevel } from '@/types/progress';

/**
 * The trimmed payload the knowledge graph ships to the browser.
 *
 * The authored curriculum is several megabytes of teaching copy; nothing here
 * is larger than it needs to be to draw a node, label it and explain it.
 */
export interface GraphNode {
  id: string;
  title: string;
  slug: string;
  domain: DomainId;
  module: string;
  difficulty: number;
  minutes: number;
  mastery: MasteryLevel;
  completed: boolean;
  /** How many units list this one as a prerequisite. Drives node size. */
  unlocks: number;
  prereqs: string[];
  next: string[];
}

/** A directed prerequisite edge: `from` must come before `to`. */
export interface GraphEdge {
  from: string;
  to: string;
}

export interface GraphDomainStat {
  id: DomainId;
  name: string;
  shortName: string;
  total: number;
  completed: number;
}

export interface GraphTotals {
  units: number;
  edges: number;
  completed: number;
  mastered: number;
}
