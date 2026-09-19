import type { DomainId, LearningUnit, UnitId } from '@/types/curriculum';
import { DOMAINS, PLANNED_UNITS } from '@/data/domains';

import { UNITS as PY } from './python';
import { UNITS as DSA } from './dsa';
import { UNITS as NP } from './numpy';
import { UNITS as PD } from './pandas';
import { UNITS as VIZ } from './viz';
import { UNITS as SQL } from './sql';
import { UNITS as MATH } from './math';
import { UNITS as STAT } from './stats';
import { UNITS as ML } from './ml';
import { UNITS as DL } from './dl';
import { UNITS as NLP } from './nlp';
import { UNITS as CV } from './cv';
import { UNITS as GEN } from './genai';
import { UNITS as OPS } from './mlops';

const DOMAIN_UNITS: Record<DomainId, LearningUnit[]> = {
  PY,
  DSA,
  NP,
  PD,
  VIZ,
  SQL,
  MATH,
  STAT,
  ML,
  DL,
  NLP,
  CV,
  GEN,
  OPS,
};

/** Every unit in curriculum order. This is the single source of truth. */
export const ALL_UNITS: LearningUnit[] = DOMAINS.flatMap((d) => DOMAIN_UNITS[d.id]);

export const UNIT_BY_ID: ReadonlyMap<UnitId, LearningUnit> = new Map(ALL_UNITS.map((u) => [u.id, u]));
export const UNIT_BY_SLUG: ReadonlyMap<string, LearningUnit> = new Map(ALL_UNITS.map((u) => [u.slug, u]));

/** Position of a unit in the global curriculum order, 0-based. */
export const UNIT_INDEX: ReadonlyMap<UnitId, number> = new Map(ALL_UNITS.map((u, i) => [u.id, i]));

export function getUnit(idOrSlug: string): LearningUnit | undefined {
  return UNIT_BY_ID.get(idOrSlug) ?? UNIT_BY_SLUG.get(idOrSlug);
}

export function unitsOfDomain(domain: DomainId): LearningUnit[] {
  return DOMAIN_UNITS[domain];
}

export function domainModules(domain: DomainId): { module: string; units: LearningUnit[] }[] {
  const order: string[] = [];
  const grouped = new Map<string, LearningUnit[]>();
  for (const u of DOMAIN_UNITS[domain]) {
    if (!grouped.has(u.module)) {
      grouped.set(u.module, []);
      order.push(u.module);
    }
    grouped.get(u.module)!.push(u);
  }
  return order.map((module) => ({ module, units: grouped.get(module)! }));
}

/**
 * Units that list `id` as a prerequisite. Computed once rather than authored,
 * so the forward and backward edges of the knowledge graph can never disagree.
 */
const LEADS_TO = (() => {
  const map = new Map<UnitId, UnitId[]>();
  for (const u of ALL_UNITS) {
    for (const p of u.prerequisites) {
      const list = map.get(p);
      if (list) list.push(u.id);
      else map.set(p, [u.id]);
    }
  }
  return map;
})();

export function leadsTo(id: UnitId): UnitId[] {
  return LEADS_TO.get(id) ?? [];
}

export function prerequisitesOf(id: UnitId): LearningUnit[] {
  return (UNIT_BY_ID.get(id)?.prerequisites ?? [])
    .map((p) => UNIT_BY_ID.get(p))
    .filter((u): u is LearningUnit => Boolean(u));
}

/** Transitive prerequisite closure, nearest first. Used by the recovery planner. */
export function allPrerequisites(id: UnitId, seen = new Set<UnitId>()): UnitId[] {
  const unit = UNIT_BY_ID.get(id);
  if (!unit) return [];
  const out: UnitId[] = [];
  for (const p of unit.prerequisites) {
    if (seen.has(p)) continue;
    seen.add(p);
    out.push(p, ...allPrerequisites(p, seen));
  }
  return out;
}

export function relatedUnits(id: UnitId): LearningUnit[] {
  const unit = UNIT_BY_ID.get(id);
  if (!unit) return [];
  const ids = new Set([...(unit.related ?? []), ...leadsTo(id)]);
  return [...ids].map((i) => UNIT_BY_ID.get(i)).filter((u): u is LearningUnit => Boolean(u));
}

export function nextUnit(id: UnitId): LearningUnit | undefined {
  const i = UNIT_INDEX.get(id);
  return i === undefined ? undefined : ALL_UNITS[i + 1];
}

export function previousUnit(id: UnitId): LearningUnit | undefined {
  const i = UNIT_INDEX.get(id);
  return i === undefined || i === 0 ? undefined : ALL_UNITS[i - 1];
}

export const TOTAL_AUTHORED_UNITS = ALL_UNITS.length;

export const DOMAIN_UNIT_COUNTS: Record<DomainId, number> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, DOMAIN_UNITS[d.id].length]),
) as Record<DomainId, number>;

export { DOMAIN_UNITS, PLANNED_UNITS };

/* ------------------------------------------------------------------ */
/* Lightweight projections                                             */
/* ------------------------------------------------------------------ */

/**
 * Trimmed unit shape safe to ship to the browser in bulk. The full units are
 * several megabytes of teaching copy; the roadmap, search and graph only ever
 * need this.
 */
export interface UnitMeta {
  id: UnitId;
  domain: DomainId;
  module: string;
  topic: string;
  title: string;
  slug: string;
  difficulty: number;
  estimatedMinutes: number;
  prerequisites: UnitId[];
  leadsTo: UnitId[];
  objectives: number;
  quizCount: number;
  tags: string[];
}

export function toMeta(u: LearningUnit): UnitMeta {
  return {
    id: u.id,
    domain: u.domain,
    module: u.module,
    topic: u.topic,
    title: u.title,
    slug: u.slug,
    difficulty: u.difficulty,
    estimatedMinutes: u.estimatedMinutes,
    prerequisites: u.prerequisites,
    leadsTo: leadsTo(u.id),
    objectives: u.learningObjectives.length,
    quizCount: u.quiz.length,
    tags: u.tags ?? [],
  };
}

let metaCache: UnitMeta[] | null = null;

export function allUnitMeta(): UnitMeta[] {
  metaCache ??= ALL_UNITS.map(toMeta);
  return metaCache;
}
