import type { UnitId } from '@/types/curriculum';

/**
 * Cross-domain edges.
 *
 * Domain files are authored independently, so each one only knows about its
 * own units. This overlay adds the connections *between* domains — the ones
 * that make the curriculum a graph rather than fourteen parallel tracks, and
 * that let a learner see that backpropagation is the chain rule and that
 * Naive Bayes is Bayes' theorem with an assumption bolted on.
 *
 * `prerequisites` must always point at an *earlier* domain in curriculum
 * order (PY, DSA, NP, PD, VIZ, SQL, MATH, STAT, ML, DL, NLP, CV, GEN, OPS);
 * `related` may point anywhere. The verifier checks both, and also checks
 * that every id here actually exists.
 */
export interface CrossLink {
  prerequisites?: UnitId[];
  related?: UnitId[];
}

export const CROSS_LINKS: Record<UnitId, CrossLink> = {
  /* ---- NumPy rests on Python ---- */
  'NP-001': { prerequisites: ['PY-006'], related: ['DSA-003'] },
  'NP-004': { prerequisites: ['PY-006'] },
  'NP-006': { prerequisites: ['PY-011'], related: ['DSA-001'] },
  'NP-010': { related: ['MATH-007'] },

  /* ---- Pandas rests on NumPy and Python collections ---- */
  'PD-001': { prerequisites: ['NP-001'] },
  'PD-002': { prerequisites: ['NP-002', 'PY-008'] },
  'PD-005': { prerequisites: ['NP-005'] },
  'PD-009': { prerequisites: ['PY-008'], related: ['SQL-007'] },
  'PD-010': { related: ['SQL-009'] },
  'PD-013': { prerequisites: ['PY-017'], related: ['PY-019'] },

  /* ---- Visualisation rests on pandas ---- */
  'VIZ-002': { prerequisites: ['PD-002'] },
  'VIZ-004': { prerequisites: ['PD-002'] },
  'VIZ-005': { prerequisites: ['PD-002'] },

  /* ---- SQL sits alongside pandas ---- */
  'SQL-007': { related: ['PD-009'] },
  'SQL-009': { related: ['PD-010'] },

  /* ---- Maths reuses NumPy for its worked examples ---- */
  'MATH-003': { prerequisites: ['NP-002'] },
  'MATH-005': { prerequisites: ['NP-010'] },
  'MATH-007': { prerequisites: ['NP-010'] },

  /* ---- Statistics rests on maths and visualisation ---- */
  'STAT-001': { prerequisites: ['MATH-001'] },
  'STAT-006': { prerequisites: ['MATH-001'] },
  'STAT-008': { related: ['VIZ-004'] },
  'STAT-009': { related: ['VIZ-005'] },
  'STAT-010': { prerequisites: ['MATH-002'], related: ['VIZ-004'] },

  /* ---- Machine learning is where every earlier domain lands ---- */
  'ML-003': { prerequisites: ['PD-002'] },
  'ML-004': { prerequisites: ['STAT-012'] },
  'ML-005': { prerequisites: ['MATH-013', 'STAT-009'] },
  'ML-006': { prerequisites: ['MATH-007'] },
  'ML-007': { prerequisites: ['STAT-008'] },
  'ML-008': { prerequisites: ['MATH-014', 'MATH-016'], related: ['MATH-013'] },
  'ML-009': { prerequisites: ['MATH-002'], related: ['MATH-005'] },
  'ML-010': { prerequisites: ['MATH-004'] },
  'ML-011': { prerequisites: ['STAT-004'] },
  'ML-012': { prerequisites: ['MATH-005'] },
  'ML-013': { prerequisites: ['MATH-002'] },
  'ML-014': { related: ['DSA-009'] },
  'ML-017': { prerequisites: ['MATH-004'] },
  'ML-018': { related: ['DSA-012'] },
  'ML-019': { prerequisites: ['MATH-010', 'MATH-011'], related: ['STAT-009'] },
  'ML-021': { prerequisites: ['STAT-001'] },
  'ML-023': { related: ['VIZ-005'] },
  'ML-024': { prerequisites: ['STAT-012'] },
  'ML-027': { prerequisites: ['PD-006', 'PD-008'] },
  'ML-028': { prerequisites: ['PD-007'], related: ['STAT-010'] },
  'ML-029': { prerequisites: ['PD-013'] },
  'ML-030': { prerequisites: ['MATH-004'] },
  'ML-031': { prerequisites: ['PY-015'] },
  'ML-032': { prerequisites: ['PY-020'], related: ['OPS-010'] },

  /* ---- Deep learning rests on ML and calculus ---- */
  'DL-001': { prerequisites: ['ML-009', 'MATH-005'] },
  'DL-002': { prerequisites: ['MATH-002'] },
  'DL-003': { prerequisites: ['MATH-007', 'NP-010'] },
  'DL-004': { prerequisites: ['ML-013'] },
  'DL-005': { prerequisites: ['MATH-015'], related: ['ML-008'] },
  'DL-007': { related: ['ML-008'] },
  'DL-008': { prerequisites: ['ML-008'] },
  'DL-010': { prerequisites: ['STAT-006'] },
  'DL-011': { prerequisites: ['ML-025'] },
  'DL-012': { prerequisites: ['ML-028'] },
  'DL-013': { prerequisites: ['NP-007'] },
  'DL-020': { prerequisites: ['MATH-005'] },

  /* ---- NLP rests on Python strings, maths and deep learning ---- */
  'NLP-001': { prerequisites: ['PY-004'], related: ['DSA-004'] },
  'NLP-002': { prerequisites: ['PY-008', 'PY-009'] },
  'NLP-004': { prerequisites: ['NP-002'] },
  'NLP-005': { prerequisites: ['MATH-002'], related: ['STAT-009'] },
  'NLP-006': { prerequisites: ['MATH-005'] },
  'NLP-007': { prerequisites: ['MATH-005'], related: ['ML-010'] },
  'NLP-008': { prerequisites: ['STAT-005'] },
  'NLP-009': { prerequisites: ['DL-020'] },
  'NLP-010': { prerequisites: ['ML-009', 'ML-022'] },
  'NLP-011': { related: ['ML-021'] },

  /* ---- Vision rests on arrays and convolution ---- */
  'CV-001': { prerequisites: ['NP-002'] },
  'CV-002': { prerequisites: ['NP-009'] },
  'CV-003': { prerequisites: ['ML-028'] },
  'CV-004': { prerequisites: ['ML-025'] },
  'CV-005': { prerequisites: ['DL-013'] },
  'CV-007': { prerequisites: ['DL-016'] },
  'CV-008': { related: ['ML-023'] },
  'CV-010': { prerequisites: ['DL-016'] },

  /* ---- Generative AI rests on transformers and embeddings ---- */
  'GEN-002': { prerequisites: ['NLP-008'] },
  'GEN-003': { prerequisites: ['NLP-001'] },
  'GEN-004': { prerequisites: ['NLP-006'] },
  'GEN-005': { prerequisites: ['DL-020'], related: ['NLP-009', 'MATH-005'] },
  'GEN-006': { prerequisites: ['DL-020'] },
  'GEN-007': { prerequisites: ['ML-004'] },
  'GEN-008': { prerequisites: ['CV-010'], related: ['ML-030'] },
  'GEN-011': { related: ['STAT-015', 'ML-023'] },
  'GEN-012': { prerequisites: ['NLP-007'], related: ['DSA-011'] },
  'GEN-013': { prerequisites: ['NLP-007'] },

  /* ---- MLOps rests on everything shippable ---- */
  'OPS-003': { prerequisites: ['PY-021'] },
  'OPS-005': { prerequisites: ['PY-015', 'ML-032'] },
  'OPS-006': { prerequisites: ['VIZ-002'] },
  'OPS-008': { prerequisites: ['PY-021'] },
  'OPS-010': { prerequisites: ['ML-032'] },
  'OPS-011': { prerequisites: ['PY-020'] },
  'OPS-012': { prerequisites: ['STAT-015'], related: ['ML-025'] },
  'OPS-013': { prerequisites: ['ML-031', 'SQL-013'], related: ['DSA-019'] },
};
