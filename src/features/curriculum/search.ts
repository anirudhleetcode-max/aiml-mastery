import { ALL_UNITS } from '@/data/curriculum';
import { DOMAIN_BY_ID } from '@/data/domains';
import type { DomainId, LearningUnit } from '@/types/curriculum';

export type SearchKind =
  | 'unit'
  | 'term'
  | 'formula'
  | 'mistake'
  | 'interview'
  | 'flashcard'
  | 'objective'
  | 'code';

export interface SearchResult {
  kind: SearchKind;
  title: string;
  snippet: string;
  unitId: string;
  unitTitle: string;
  domain: DomainId;
  domainName: string;
  href: string;
  score: number;
}

interface IndexEntry {
  kind: SearchKind;
  title: string;
  snippet: string;
  haystack: string;
  unit: LearningUnit;
  anchor: string;
  weight: number;
}

/**
 * A flat, lazily-built index over every teachable fragment of the curriculum:
 * units, terminology, formulas, common mistakes, interview questions,
 * flashcards, objectives and code examples.
 *
 * Built once per server process and reused. Deliberately server-side — the
 * full curriculum is megabytes of teaching copy and has no business in a
 * client bundle.
 */
let INDEX: IndexEntry[] | null = null;

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const unit of ALL_UNITS) {
    const push = (
      kind: SearchKind,
      title: string,
      snippet: string,
      extra: string,
      anchor: string,
      weight: number,
    ) => {
      entries.push({
        kind,
        title,
        snippet,
        haystack: `${title}\n${snippet}\n${extra}`.toLowerCase(),
        unit,
        anchor,
        weight,
      });
    };

    push(
      'unit',
      unit.title,
      unit.simpleExplanation.slice(0, 200),
      [unit.topic, unit.module, ...(unit.tags ?? []), unit.whyItExists, unit.formalDefinition].join(' '),
      '',
      10,
    );

    for (const t of unit.terminology) {
      push('term', t.term, t.simple ?? t.definition, t.definition, '#terminology', 8);
    }
    for (const f of unit.math?.formulas ?? []) {
      push(
        'formula',
        f.name,
        f.meaning,
        `${f.latex} ${f.variables.map((v) => `${v.symbol} ${v.meaning}`).join(' ')}`,
        '#mathematics',
        6,
      );
    }
    for (const m of unit.commonMistakes) {
      push('mistake', m.mistake, m.why, m.fix, '#mistakes', 5);
    }
    for (const q of unit.interviewQuestions) {
      push('interview', q.question, q.answer.slice(0, 200), q.answer, '#interview', 5);
    }
    for (const c of unit.flashcards) {
      push('flashcard', c.front, c.back, '', '#flashcards', 3);
    }
    for (const o of unit.learningObjectives) {
      push('objective', o, `Learning objective in ${unit.title}`, '', '', 2);
    }
    for (const c of unit.codeExamples) {
      push('code', c.title, c.explanation.slice(0, 180), c.code, '#code', 4);
    }
  }

  return entries;
}

function getIndex(): IndexEntry[] {
  INDEX ??= buildIndex();
  return INDEX;
}

/** Scores a haystack against a query. Phrase beats all-terms beats some-terms. */
function score(haystack: string, query: string, terms: string[], weight: number): number {
  if (haystack.includes(query)) {
    const atStart = haystack.startsWith(query) ? 30 : 0;
    return weight * 4 + atStart + Math.max(0, 20 - haystack.indexOf(query) / 8);
  }
  let hits = 0;
  for (const t of terms) if (haystack.includes(t)) hits++;
  if (hits === 0) return 0;
  if (hits === terms.length) return weight * 2 + hits * 3;
  return weight * (hits / terms.length);
}

export function searchCurriculum(
  rawQuery: string,
  opts: { limit?: number; kinds?: SearchKind[]; domain?: DomainId } = {},
): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 2) return [];

  const terms = query.split(/\s+/).filter((t) => t.length > 1);
  const limit = opts.limit ?? 24;
  const kinds = opts.kinds ? new Set(opts.kinds) : null;

  const scored: SearchResult[] = [];

  for (const entry of getIndex()) {
    if (kinds && !kinds.has(entry.kind)) continue;
    if (opts.domain && entry.unit.domain !== opts.domain) continue;

    const s = score(entry.haystack, query, terms, entry.weight);
    if (s <= 0) continue;

    scored.push({
      kind: entry.kind,
      title: entry.title,
      snippet: entry.snippet,
      unitId: entry.unit.id,
      unitTitle: entry.unit.title,
      domain: entry.unit.domain,
      domainName: DOMAIN_BY_ID[entry.unit.domain]?.name ?? entry.unit.domain,
      href: `/learn/${entry.unit.slug}${entry.anchor}`,
      score: s,
    });
  }

  scored.sort((a, b) => b.score - a.score);

  // Keep a spread of result kinds near the top rather than twenty flashcards.
  const perKind = new Map<SearchKind, number>();
  const out: SearchResult[] = [];
  for (const r of scored) {
    const n = perKind.get(r.kind) ?? 0;
    if (n >= Math.max(3, Math.ceil(limit / 3))) continue;
    perKind.set(r.kind, n + 1);
    out.push(r);
    if (out.length >= limit) break;
  }
  return out;
}

export const KIND_LABELS: Record<SearchKind, string> = {
  unit: 'Lesson',
  term: 'Definition',
  formula: 'Formula',
  mistake: 'Common mistake',
  interview: 'Interview question',
  flashcard: 'Flashcard',
  objective: 'Objective',
  code: 'Code example',
};
