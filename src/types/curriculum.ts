/**
 * The curriculum content model.
 *
 * Everything the platform teaches lives in plain, serialisable data that
 * conforms to these types. No lesson content is ever embedded in UI code, so
 * curriculum can be edited, validated and regenerated without touching React.
 *
 * Authoring contract (enforced by `scripts/verify-curriculum.ts`):
 *   - every unit id is unique and matches `^[A-Z]{2,4}-\d{3}$`
 *   - every prerequisite resolves to a real unit that appears earlier
 *   - no unit may be a stub: minimum content thresholds are checked in CI
 */

export const DOMAIN_IDS = [
  'PY',
  'DSA',
  'NP',
  'PD',
  'VIZ',
  'SQL',
  'MATH',
  'STAT',
  'ML',
  'DL',
  'NLP',
  'CV',
  'GEN',
  'OPS',
] as const;

export type DomainId = (typeof DOMAIN_IDS)[number];

/** 1 = Beginner … 5 = Expert. Derived from curriculum complexity, not vibes. */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type UnitId = string;

/* ------------------------------------------------------------------ */
/* Content fragments                                                    */
/* ------------------------------------------------------------------ */

export interface Term {
  term: string;
  definition: string;
  /** Optional plain-language restatement for the glossary's "explain simply" row. */
  simple?: string;
}

export interface AnalogyMapping {
  /** The everyday thing in the story. */
  from: string;
  /** The technical thing it stands for. */
  to: string;
}

/**
 * An analogy is never allowed to dangle: `mapping` and `bridge` force the
 * author to connect the story back to the real concept (spec §74).
 */
export interface Analogy {
  scenario: string;
  mapping: AnalogyMapping[];
  /** Where the analogy breaks down / how it maps to the formal idea. */
  bridge: string;
  /** Honest statement of the analogy's limits. */
  limitations?: string;
}

export interface FormulaVariable {
  symbol: string;
  meaning: string;
}

export interface Formula {
  /** KaTeX source, without delimiters. */
  latex: string;
  name: string;
  meaning: string;
  variables: FormulaVariable[];
  /** Which formula-lab category this belongs to, if it should be indexed. */
  category?: FormulaCategory;
}

export type FormulaCategory =
  | 'linear-algebra'
  | 'calculus'
  | 'probability'
  | 'statistics'
  | 'regression'
  | 'classification'
  | 'optimization'
  | 'deep-learning'
  | 'information-theory'
  | 'complexity';

export interface MathematicalExplanation {
  /** Plain-language version of the maths, always first. */
  intuition: string;
  formulas: Formula[];
  /** Optional step-by-step derivation, each entry one readable step. */
  derivation?: string[];
}

export interface CodeExample {
  language: 'python' | 'sql' | 'bash' | 'text' | 'json' | 'yaml';
  title: string;
  code: string;
  explanation: string;
  /** Expected stdout, when deterministic. Shown next to the code. */
  output?: string;
  /** If true, the lesson offers to open this snippet in the code playground. */
  runnable?: boolean;
}

export interface WorkedExampleStep {
  label: string;
  detail: string;
  /** Optional KaTeX for this step. */
  latex?: string;
}

export interface WorkedExample {
  title: string;
  setup: string;
  steps: WorkedExampleStep[];
  conclusion: string;
}

export interface RealWorldExample {
  context: string;
  usage: string;
}

export interface ProjectConnection {
  /** e.g. "pandas", "scikit-learn", "FastAPI" */
  tool: string;
  /** Where in a real project this concept shows up. */
  role: string;
}

export interface CommonMistake {
  mistake: string;
  why: string;
  fix: string;
}

export type InterviewLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'internship'
  | 'ml-engineer'
  | 'ai-engineer';

export interface InterviewQuestion {
  level: InterviewLevel;
  question: string;
  answer: string;
  /** What a strong answer mentions that a weak one misses. */
  followUp?: string;
}

export interface PracticeQuestion {
  prompt: string;
  hint: string;
  solution: string;
  /** Starter code for practice that is best done in the playground. */
  starterCode?: string;
  language?: CodeExample['language'];
}

/* ------------------------------------------------------------------ */
/* Assessment                                                           */
/* ------------------------------------------------------------------ */

interface QuizBase {
  id: string;
  prompt: string;
  explanation: string;
  /** Concept tag used by the mistake notebook and revision engine. */
  concept?: string;
}

export type QuizQuestion =
  | (QuizBase & { type: 'mcq'; options: string[]; answerIndex: number })
  | (QuizBase & { type: 'multi'; options: string[]; answerIndices: number[] })
  | (QuizBase & { type: 'truefalse'; answer: boolean })
  | (QuizBase & { type: 'fill'; answers: string[] })
  | (QuizBase & { type: 'numeric'; answer: number; tolerance?: number; unit?: string })
  | (QuizBase & {
      type: 'code-output';
      code: string;
      language: CodeExample['language'];
      options: string[];
      answerIndex: number;
    })
  | (QuizBase & {
      type: 'debug';
      code: string;
      language: CodeExample['language'];
      options: string[];
      answerIndex: number;
    })
  | (QuizBase & { type: 'order'; items: string[] })
  | (QuizBase & { type: 'match'; pairs: { left: string; right: string }[] })
  | (QuizBase & { type: 'explain'; rubric: string[]; sampleAnswer: string });

export type QuizQuestionType = QuizQuestion['type'];

export interface Flashcard {
  front: string;
  back: string;
}

/* ------------------------------------------------------------------ */
/* Visual explanation                                                   */
/* ------------------------------------------------------------------ */

/**
 * Visuals are declarative so authors describe *what* to show and the renderer
 * decides *how*. `widget` escapes to a registered interactive component.
 */
export type Visual =
  | {
      kind: 'flow';
      title: string;
      caption?: string;
      steps: { label: string; detail?: string }[];
      /** Renders as a branching decision flow instead of a straight line. */
      branching?: boolean;
    }
  | {
      kind: 'compare';
      title: string;
      caption?: string;
      left: { heading: string; points: string[] };
      right: { heading: string; points: string[] };
    }
  | {
      kind: 'table';
      title: string;
      caption?: string;
      columns: string[];
      rows: string[][];
    }
  | {
      kind: 'annotated';
      title: string;
      caption?: string;
      /** A labelled breakdown, e.g. anatomy of a formula or an API call. */
      subject: string;
      annotations: { part: string; note: string }[];
    }
  | {
      kind: 'timeline';
      title: string;
      caption?: string;
      events: { when: string; what: string }[];
    }
  | {
      kind: 'ascii';
      title: string;
      caption?: string;
      art: string;
    }
  | {
      kind: 'widget';
      title: string;
      caption?: string;
      /** Key into the widget registry in `src/components/viz/registry.tsx`. */
      widget: WidgetId;
      props?: Record<string, unknown>;
    };

/** Interactive/animated explanation components available to curriculum authors. */
export const WIDGET_IDS = [
  'number-line-binary-search',
  'big-o-growth',
  'array-indexing',
  'linked-list',
  'stack-queue',
  'hash-table',
  'binary-tree',
  'graph-traversal',
  'sorting-race',
  'recursion-tree',
  'ndarray-explorer',
  'broadcasting',
  'dataframe-playground',
  'chart-chooser',
  'sql-playground',
  'vector-playground',
  'matrix-transform',
  'dot-product',
  'derivative-explorer',
  'gradient-surface-3d',
  'coin-flip-sim',
  'distribution-explorer',
  'bayes-explorer',
  'clt-sim',
  'confidence-interval-sim',
  'linear-regression-lab',
  'gradient-descent-lab',
  'logistic-boundary-lab',
  'knn-lab',
  'decision-tree-lab',
  'kmeans-lab',
  'pca-lab',
  'svm-margin-lab',
  'bias-variance-lab',
  'confusion-matrix-lab',
  'roc-lab',
  'regularization-lab',
  'neural-network-lab',
  'activation-explorer',
  'backprop-flow',
  'convolution-lab',
  'pooling-lab',
  'rnn-unroll',
  'attention-lab',
  'tokenizer-lab',
  'embedding-space-3d',
  'tfidf-lab',
  'transformer-flow',
  'image-pixels-lab',
  'edge-detection-lab',
  'augmentation-lab',
  'rag-flow',
  'context-window-lab',
  'ml-pipeline-flow',
  'drift-monitor',
  'docker-layers',
  'ci-cd-flow',
  'code-playground',
] as const;

export type WidgetId = (typeof WIDGET_IDS)[number];

/* ------------------------------------------------------------------ */
/* Teaching + mastery                                                   */
/* ------------------------------------------------------------------ */

export interface TeachingPrompt {
  /** The question posed to the learner in Teacher Mode. */
  prompt: string;
  /** Concepts a good explanation must cover — drives automatic feedback. */
  mustCover: string[];
  /** Keywords that signal genuine understanding rather than recitation. */
  bonusSignals?: string[];
  /** A reference explanation shown only after the learner submits. */
  sampleExplanation: string;
}

export interface Challenge {
  title: string;
  brief: string;
  acceptanceCriteria: string[];
  starterCode?: string;
  language?: CodeExample['language'];
}

export interface MasteryRequirements {
  /** Score (0–1) needed to reach UNDERSTOOD. Default 0.7. */
  understoodScore: number;
  /** Score (0–1) needed to reach PROFICIENT. Default 0.85. */
  proficientScore: number;
  /** Practice items that must be attempted to reach PRACTICED. */
  practiceRequired: number;
  /** Whether a teach-back is required for TEACHER. Default true. */
  teachRequired: boolean;
}

/* ------------------------------------------------------------------ */
/* The learning unit                                                    */
/* ------------------------------------------------------------------ */

export interface LearningUnit {
  id: UnitId;
  domain: DomainId;
  module: string;
  topic: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  prerequisites: UnitId[];
  /** Ids of units that build directly on this one (computed if omitted). */
  leadsTo?: UnitId[];
  /** Non-prerequisite conceptual neighbours, for the knowledge graph. */
  related?: UnitId[];

  learningObjectives: string[];
  terminology: Term[];

  /** The "explain it to a bright nine-year-old" pass. Always comes first. */
  simpleExplanation: string;
  /** Why this exists and what problem it solves. */
  whyItExists: string;
  analogy: Analogy;
  visuals: Visual[];
  /** The precise, technically correct statement. */
  formalDefinition: string;
  math?: MathematicalExplanation;
  workedExample?: WorkedExample;
  codeExamples: CodeExample[];
  realWorldExamples: RealWorldExample[];
  projectConnections?: ProjectConnection[];
  commonMistakes: CommonMistake[];
  interviewQuestions: InterviewQuestion[];
  practiceQuestions: PracticeQuestion[];
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  challenge?: Challenge;
  teachingPrompt: TeachingPrompt;
  masteryRequirements?: Partial<MasteryRequirements>;
  /** Free-text tags used by global search. */
  tags?: string[];
}

/* ------------------------------------------------------------------ */
/* Structure                                                            */
/* ------------------------------------------------------------------ */

export interface Domain {
  id: DomainId;
  order: number;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Tailwind-friendly accent token name, resolved in the design system. */
  accent: string;
  icon: string;
  modules: string[];
}

export const DEFAULT_MASTERY: MasteryRequirements = {
  understoodScore: 0.7,
  proficientScore: 0.85,
  practiceRequired: 2,
  teachRequired: true,
};

export const TOTAL_UNITS = 214;
