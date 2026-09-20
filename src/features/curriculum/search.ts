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

/* ------------------------------------------------------------------ */
/* Concept resolution                                                   */
/* ------------------------------------------------------------------ */

/**
 * Words that carry no topical meaning here. `score()` uses substring matching,
 * which is right for a search box — a loose match is a useful suggestion — but
 * means "thing" hits "something" and "me" hits almost everything. The tutor
 * cannot afford that: committing to a unit on an incidental match is how it
 * would end up confidently answering a question nobody asked.
 */
const STOPWORDS = new Set([
  'about', 'above', 'after', 'again', 'also', 'and', 'any', 'anything', 'are', 'because', 'been',
  'before', 'being', 'between', 'both', 'but', 'can', 'concept', 'could', 'did', 'does', 'doing',
  'done', 'each', 'else', 'even', 'ever', 'every', 'everything', 'example', 'explain', 'for',
  'from', 'get', 'give', 'going', 'good', 'happen', 'has', 'have', 'help', 'here', 'how', 'idea',
  'into', 'its', 'just', 'know', 'let', 'like', 'make', 'many', 'may', 'mean', 'means', 'method',
  'might', 'more', 'most', 'much', 'must', 'need', 'not', 'now', 'often', 'one', 'only', 'other',
  'out', 'over', 'own', 'please', 'put', 'really', 'right', 'same', 'say', 'see', 'should', 'show',
  'simple', 'simply', 'some', 'something', 'stuff', 'such', 'sure', 'take', 'tell', 'than', 'that',
  'the', 'their', 'them', 'then', 'there', 'these', 'they', 'thing', 'things', 'think', 'this',
  'those', 'through', 'time', 'told', 'too', 'topic', 'understand', 'use', 'used', 'using', 'very',
  'want', 'was', 'way', 'well', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'why',
  'will', 'with', 'work', 'works', 'would', 'you', 'your',
]);

/** Title, topic, module, tags and terminology — the text that names a concept. */
let SALIENT: { unit: LearningUnit; words: Set<string>; joined: string }[] | null = null;

function salientIndex() {
  SALIENT ??= ALL_UNITS.map((unit) => {
    const text = [
      unit.title,
      unit.topic,
      unit.module,
      ...(unit.tags ?? []),
      ...unit.terminology.map((t) => t.term),
      ...unit.flashcards.map((f) => f.front),
      // Naming the domain is naming something we teach: "pandas groupby" and
      // "SQL join" each pair a domain word with a topic word.
      DOMAIN_BY_ID[unit.domain]?.name ?? '',
      DOMAIN_BY_ID[unit.domain]?.shortName ?? '',
    ]
      .join(' ')
      .toLowerCase();
    return {
      unit,
      words: new Set(text.split(/[^a-z0-9+#]+/).filter((w) => w.length > 1)),
      // Spaces removed so "groupby" finds "group by" and "kmeans" finds "k-means".
      joined: text.replace(/[^a-z0-9+#]+/g, ''),
    };
  });
  return SALIENT;
}

/** True when two words are the same concept modulo spelling (-ise/-ize, plurals). */
function akin(a: string, b: string): boolean {
  if (a === b) return true;
  const n = Math.min(a.length, b.length);
  if (n < 5) return false;
  let i = 0;
  while (i < n && a[i] === b[i]) i += 1;
  return i >= 5 && Math.abs(a.length - b.length) <= 3;
}

export interface ConceptMatch {
  unit: LearningUnit;
  /** Fraction of the query's content words that name something this unit teaches. */
  coverage: number;
  /** Whether at least one matched word is rare enough to actually pick this unit out. */
  specific: boolean;
}

/**
 * Resolves a question to the unit it is *about*, or null when the question
 * does not name anything in the curriculum.
 *
 * Unlike `searchCurriculum`, this matches whole words against salient fields
 * only and reports coverage, so a caller can refuse to answer rather than pick
 * the least-bad row. Nonsense scores 0 and multi-word questions that graze a
 * single common word score below the threshold a caller should demand.
 */
export function resolveConcept(rawQuery: string): ConceptMatch | null {
  const content = rawQuery
    .toLowerCase()
    .split(/[^a-z0-9+#-]+/)
    .map((w) => w.replace(/^-+|-+$/g, ''))
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

  if (content.length === 0) return null;

  let best: ConceptMatch | null = null;
  for (const { unit, words, joined } of salientIndex()) {
    let hit = 0;
    let specific = false;
    for (const w of content) {
      const parts = w.split('-').filter((p) => p.length > 2);
      // Keep the salient word that matched: specificity is a property of the
      // curriculum's vocabulary, so "normalization" has to be judged by the
      // "normalisation" it matched rather than by its own (absent) spelling.
      let via: string | null = null;
      if (words.has(w)) via = w;
      else {
        const part = parts.find((p) => words.has(p));
        if (part) via = part;
        else {
          const kin = [...words].find((sw) => akin(w, sw));
          if (kin) via = kin;
          else if (w.length >= 5 && joined.includes(w.replace(/-/g, ''))) via = w;
        }
      }
      if (via === null) continue;
      hit += 1;
      if (isSpecificWord(via)) specific = true;
    }
    if (hit === 0) continue;
    const coverage = hit / content.length;
    const better = !best || coverage > best.coverage || (coverage === best.coverage && specific && !best.specific);
    if (better) best = { unit, coverage, specific };
  }
  return best;
}

/**
 * Coverage at or above which a caller may answer *about* the matched unit.
 * Below it the question grazes the curriculum without naming anything in it,
 * and the honest response is to offer candidates rather than pick one.
 */
export const CONFIDENT_COVERAGE = 0.6;

/**
 * A word is specific when few units mention it. "lasso" names one idea;
 * "code" and "data" appear everywhere, so a question consisting only of
 * generic words has not named a concept however completely it is "covered".
 */
let DOC_FREQ: Map<string, number> | null = null;

function docFreq(): Map<string, number> {
  if (!DOC_FREQ) {
    DOC_FREQ = new Map();
    for (const { words } of salientIndex()) {
      for (const w of words) DOC_FREQ.set(w, (DOC_FREQ.get(w) ?? 0) + 1);
    }
  }
  return DOC_FREQ;
}

/** At most this share of units may mention a word for it to count as specific. */
const SPECIFIC_MAX_SHARE = 0.08;

export function isSpecificWord(word: string): boolean {
  const df = docFreq().get(word.toLowerCase()) ?? 0;
  return df > 0 && df <= Math.max(2, Math.ceil(ALL_UNITS.length * SPECIFIC_MAX_SHARE));
}
