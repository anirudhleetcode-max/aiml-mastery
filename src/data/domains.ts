import type { Domain, DomainId } from '@/types/curriculum';

/**
 * The 14 domains of the curriculum, in the order they are learned.
 *
 * `plannedUnits` is the authoritative allocation of the 214 units. The
 * verifier fails the build if the authored content does not match it
 * exactly, which is what keeps "214" an actual guarantee rather than a slogan.
 */
export const DOMAINS: Domain[] = [
  {
    id: 'PY',
    order: 1,
    name: 'Python',
    shortName: 'Python',
    tagline: 'The language you will think in',
    description:
      'Everything in this curriculum is expressed in Python. This domain takes you from your first variable to writing clean, tested, idiomatic code you would be happy to show an interviewer.',
    accent: 'PY',
    icon: 'Code2',
    modules: [
      'First Steps',
      'Core Data Types',
      'Collections',
      'Control Flow',
      'Functions',
      'Object-Oriented Python',
      'Pythonic Patterns',
      'Working Like an Engineer',
    ],
  },
  {
    id: 'DSA',
    order: 2,
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    tagline: 'How to think about cost',
    description:
      'Machine learning is applied computation. Knowing which structure to reach for, and what it costs, is what separates code that works on a toy dataset from code that works on a real one.',
    accent: 'DSA',
    icon: 'Binary',
    modules: [
      'Complexity',
      'Linear Structures',
      'Hashing',
      'Trees & Heaps',
      'Graphs',
      'Recursion & Search',
      'Sorting',
      'Algorithmic Patterns',
    ],
  },
  {
    id: 'NP',
    order: 3,
    name: 'NumPy',
    shortName: 'NumPy',
    tagline: 'Arrays are the atom of ML',
    description:
      'Every tensor in PyTorch and every matrix in scikit-learn is an ndarray in spirit. Learn to see shapes, broadcast without fear, and replace loops with vectorised maths.',
    accent: 'NP',
    icon: 'Grid3x3',
    modules: ['The ndarray', 'Selecting Data', 'Broadcasting & Vectorisation', 'Maths on Arrays', 'Linear Algebra'],
  },
  {
    id: 'PD',
    order: 4,
    name: 'Pandas',
    shortName: 'Pandas',
    tagline: 'Where real data gets tamed',
    description:
      'Most of an ML job is data wrangling. This domain makes you fluent in Series and DataFrames: selecting, cleaning, grouping, joining and reshaping until data is model-ready.',
    accent: 'PD',
    icon: 'Table2',
    modules: ['Series & DataFrame', 'Selection', 'Cleaning', 'Grouping & Aggregation', 'Combining Data', 'Reshaping', 'Time & Features'],
  },
  {
    id: 'VIZ',
    order: 5,
    name: 'Data Visualization',
    shortName: 'Viz',
    tagline: 'Seeing is understanding',
    description:
      'A plot is a thinking tool, not decoration. Learn which chart answers which question, how to read one honestly, and how to spot a graph that is lying to you.',
    accent: 'VIZ',
    icon: 'LineChart',
    modules: ['Why Plot', 'Matplotlib', 'Distributions & Relationships', 'Seaborn & Statistical Plots', 'Reading Charts Critically'],
  },
  {
    id: 'SQL',
    order: 6,
    name: 'SQL & Databases',
    shortName: 'SQL',
    tagline: 'Data lives in databases',
    description:
      'Before data reaches a notebook it lives in tables. Learn to query it precisely — filtering, grouping, joining, windowing — and to understand the design decisions behind the schema.',
    accent: 'SQL',
    icon: 'Database',
    modules: ['Relational Foundations', 'Querying', 'Aggregation', 'Joins', 'Advanced SQL', 'Design & Performance'],
  },
  {
    id: 'MATH',
    order: 7,
    name: 'Mathematics for ML',
    shortName: 'Maths',
    tagline: 'The language underneath',
    description:
      'Not maths for its own sake — exactly the algebra, linear algebra and calculus that appear inside models, taught intuition-first so the symbols mean something.',
    accent: 'MATH',
    icon: 'Sigma',
    modules: ['Algebraic Foundations', 'Vectors', 'Matrices', 'Matrix Structure', 'Calculus', 'Optimisation Maths'],
  },
  {
    id: 'STAT',
    order: 8,
    name: 'Probability & Statistics',
    shortName: 'Stats',
    tagline: 'Reasoning under uncertainty',
    description:
      'Models are claims about uncertain things. This domain gives you the vocabulary and the instincts: distributions, expectation, sampling, inference, and the traps in between.',
    accent: 'STAT',
    icon: 'Dices',
    modules: ['Probability', 'Conditional Probability', 'Random Variables', 'Describing Data', 'Distributions', 'Sampling & Inference', 'Interpreting Evidence'],
  },
  {
    id: 'ML',
    order: 9,
    name: 'Machine Learning',
    shortName: 'ML',
    tagline: 'Learning from data',
    description:
      'The heart of the curriculum. Every algorithm is taught the same way: intuition, picture, maths, code, strengths, weaknesses, when to use it, and how it fails.',
    accent: 'ML',
    icon: 'Brain',
    modules: [
      'Foundations',
      'Regression',
      'Classification',
      'Trees & Ensembles',
      'Clustering',
      'Dimensionality Reduction',
      'Evaluation',
      'Bias & Variance',
      'Data Preparation',
      'Optimisation & Regularisation',
      'Practical ML',
    ],
  },
  {
    id: 'DL',
    order: 10,
    name: 'Deep Learning',
    shortName: 'Deep Learning',
    tagline: 'Layers that learn features',
    description:
      'From a single neuron to attention. You will watch data flow forward, loss flow backward, and understand why depth changes what a model can represent.',
    accent: 'DL',
    icon: 'Network',
    modules: ['The Neuron', 'Training a Network', 'Optimisers', 'Regularising Deep Nets', 'Convolutional Networks', 'Sequence Models', 'Attention & Transformers'],
  },
  {
    id: 'NLP',
    order: 11,
    name: 'Natural Language Processing',
    shortName: 'NLP',
    tagline: 'Teaching machines to read',
    description:
      'Text is messy, discrete and deeply structured. Learn to turn language into numbers without losing meaning — from tokenisation to embeddings to transformers.',
    accent: 'NLP',
    icon: 'MessageSquareText',
    modules: ['Text Preprocessing', 'Classical Representations', 'Embeddings', 'Sequence Modelling', 'NLP Tasks'],
  },
  {
    id: 'CV',
    order: 12,
    name: 'Computer Vision',
    shortName: 'Vision',
    tagline: 'Making sense of pixels',
    description:
      'An image is a tensor of numbers. Learn how convolution finds structure in it, and how classification, detection and segmentation build on that one idea.',
    accent: 'CV',
    icon: 'Eye',
    modules: ['Images as Data', 'Preprocessing & Augmentation', 'Convolution in Practice', 'Vision Tasks', 'Architectures & Transfer'],
  },
  {
    id: 'GEN',
    order: 13,
    name: 'Generative AI & LLMs',
    shortName: 'GenAI',
    tagline: 'The models of this moment',
    description:
      'What a large language model actually is, how it is trained and adapted, how to prompt and ground it, and how to judge whether its output can be trusted.',
    accent: 'GEN',
    icon: 'Sparkles',
    modules: ['Generative Foundations', 'Inside a Transformer LM', 'Training & Adaptation', 'Using LLMs Well', 'Grounding & Retrieval', 'Agents & Evaluation'],
  },
  {
    id: 'OPS',
    order: 14,
    name: 'MLOps & ML System Design',
    shortName: 'MLOps',
    tagline: 'From notebook to production',
    description:
      'A model that lives only in a notebook has no users. Version it, serve it, containerise it, monitor it, and design the system around it.',
    accent: 'OPS',
    icon: 'Boxes',
    modules: ['Version Control', 'Serving Models', 'Packaging & Delivery', 'Tracking & Reproducibility', 'Monitoring', 'ML System Design'],
  },
];

/**
 * The authoritative per-domain unit allocation. Sums to exactly 214.
 */
export const PLANNED_UNITS: Record<DomainId, number> = {
  PY: 21,
  DSA: 19,
  NP: 10,
  PD: 13,
  VIZ: 8,
  SQL: 13,
  MATH: 16,
  STAT: 15,
  ML: 32,
  DL: 20,
  NLP: 11,
  CV: 10,
  GEN: 13,
  OPS: 13,
};

export const DOMAIN_BY_ID: Record<DomainId, Domain> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d]),
) as Record<DomainId, Domain>;

export function domainAccentVar(id: DomainId): string {
  return `var(--d-${id})`;
}

/** `hsl(var(--d-ML) / 0.2)` style helper for inline styles. */
export function domainColor(id: DomainId, alpha = 1): string {
  return alpha === 1 ? `hsl(var(--d-${id}))` : `hsl(var(--d-${id}) / ${alpha})`;
}
