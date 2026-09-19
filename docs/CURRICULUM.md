# The 214-Unit Curriculum

This file is the authoritative outline. Every unit below exists as authored
content in `src/data/curriculum/<domain>.ts` and is checked by
`npm run curriculum:verify`, which fails if counts, ids, prerequisite ordering
or per-field content minimums are wrong.

| # | Domain | Units | File |
|---|--------|-------|------|
| 01 | Python | 21 | `python.ts` |
| 02 | Data Structures & Algorithms | 19 | `dsa.ts` |
| 03 | NumPy | 10 | `numpy.ts` |
| 04 | Pandas | 13 | `pandas.ts` |
| 05 | Data Visualization | 8 | `viz.ts` |
| 06 | SQL & Databases | 13 | `sql.ts` |
| 07 | Mathematics for ML | 16 | `math.ts` |
| 08 | Probability & Statistics | 15 | `stats.ts` |
| 09 | Machine Learning | 32 | `ml.ts` |
| 10 | Deep Learning | 20 | `dl.ts` |
| 11 | NLP | 11 | `nlp.ts` |
| 12 | Computer Vision | 10 | `cv.ts` |
| 13 | Generative AI & LLMs | 13 | `genai.ts` |
| 14 | MLOps & ML System Design | 13 | `mlops.ts` |
| | **Total** | **214** | |

---

## 01 — Python (`PY`, 21 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| PY-001 | First Steps | Your First Python Program | your-first-python-program | 1 | 25 |
| PY-002 | First Steps | Variables and Names | variables-and-names | 1 | 25 |
| PY-003 | Core Data Types | Numbers and Type Conversion | numbers-and-type-conversion | 1 | 30 |
| PY-004 | Core Data Types | Strings and Text | strings-and-text | 1 | 35 |
| PY-005 | Core Data Types | Operators and Expressions | operators-and-expressions | 1 | 30 |
| PY-006 | Collections | Lists | lists | 2 | 35 |
| PY-007 | Collections | Tuples and Immutability | tuples-and-immutability | 2 | 25 |
| PY-008 | Collections | Dictionaries | dictionaries | 2 | 35 |
| PY-009 | Collections | Sets | sets | 2 | 25 |
| PY-010 | Control Flow | Conditionals and Truthiness | conditionals-and-truthiness | 1 | 30 |
| PY-011 | Control Flow | Loops and Iteration | loops-and-iteration | 2 | 35 |
| PY-012 | Functions | Defining Functions | defining-functions | 2 | 35 |
| PY-013 | Functions | Arguments, Defaults and Scope | arguments-defaults-and-scope | 3 | 35 |
| PY-014 | Functions | Recursion | recursion | 3 | 35 |
| PY-015 | Object-Oriented Python | Classes and Objects | classes-and-objects | 3 | 40 |
| PY-016 | Object-Oriented Python | Inheritance, Polymorphism and Dunder Methods | inheritance-and-polymorphism | 4 | 40 |
| PY-017 | Pythonic Patterns | Comprehensions | comprehensions | 3 | 30 |
| PY-018 | Pythonic Patterns | Iterators and Generators | iterators-and-generators | 4 | 35 |
| PY-019 | Pythonic Patterns | Lambdas, Functional Tools and Decorators | lambdas-and-decorators | 4 | 40 |
| PY-020 | Working Like an Engineer | Errors, Exceptions and Files | errors-exceptions-and-files | 3 | 40 |
| PY-021 | Working Like an Engineer | Modules, Environments, Testing and Clean Code | modules-environments-and-testing | 3 | 45 |

## 02 — Data Structures & Algorithms (`DSA`, 19 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| DSA-001 | Complexity | Big-O and Time Complexity | big-o-and-time-complexity | 2 | 40 |
| DSA-002 | Complexity | Space Complexity and Trade-offs | space-complexity-and-trade-offs | 3 | 30 |
| DSA-003 | Linear Structures | Arrays and Dynamic Arrays | arrays-and-dynamic-arrays | 2 | 35 |
| DSA-004 | Linear Structures | Strings as Data Structures | strings-as-data-structures | 2 | 30 |
| DSA-005 | Linear Structures | Linked Lists | linked-lists | 3 | 40 |
| DSA-006 | Linear Structures | Stacks and Queues | stacks-and-queues | 3 | 35 |
| DSA-007 | Hashing | Hash Tables | hash-tables | 3 | 40 |
| DSA-008 | Hashing | Sets and Deduplication Patterns | sets-and-deduplication | 2 | 30 |
| DSA-009 | Trees & Heaps | Trees and Binary Trees | trees-and-binary-trees | 3 | 40 |
| DSA-010 | Trees & Heaps | Binary Search Trees | binary-search-trees | 3 | 40 |
| DSA-011 | Trees & Heaps | Heaps and Priority Queues | heaps-and-priority-queues | 4 | 40 |
| DSA-012 | Graphs | Graphs and Representations | graphs-and-representations | 3 | 35 |
| DSA-013 | Graphs | Breadth-First Search | breadth-first-search | 3 | 40 |
| DSA-014 | Graphs | Depth-First Search | depth-first-search | 3 | 40 |
| DSA-015 | Recursion & Search | Recursion and Backtracking | recursion-and-backtracking | 4 | 45 |
| DSA-016 | Recursion & Search | Binary Search | binary-search | 3 | 35 |
| DSA-017 | Sorting | Sorting Algorithms | sorting-algorithms | 3 | 45 |
| DSA-018 | Algorithmic Patterns | Two Pointers, Sliding Window and Prefix Sums | two-pointers-and-sliding-window | 4 | 45 |
| DSA-019 | Algorithmic Patterns | Greedy Algorithms and Dynamic Programming | greedy-and-dynamic-programming | 5 | 50 |

## 03 — NumPy (`NP`, 10 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| NP-001 | The ndarray | The ndarray: NumPy's Core Object | the-ndarray | 2 | 30 |
| NP-002 | The ndarray | Shape, Dimensions and dtype | shape-dimensions-and-dtype | 2 | 35 |
| NP-003 | The ndarray | Creating Arrays and Random Data | creating-arrays-and-random-data | 2 | 30 |
| NP-004 | Selecting Data | Indexing and Slicing | numpy-indexing-and-slicing | 2 | 35 |
| NP-005 | Selecting Data | Boolean Masks and Fancy Indexing | boolean-masks-and-fancy-indexing | 3 | 35 |
| NP-006 | Broadcasting & Vectorisation | Vectorisation: Replacing Loops | vectorisation | 3 | 35 |
| NP-007 | Broadcasting & Vectorisation | Broadcasting Rules | broadcasting-rules | 3 | 40 |
| NP-008 | Maths on Arrays | Aggregation and the axis Argument | aggregation-and-axis | 3 | 35 |
| NP-009 | Maths on Arrays | Reshaping, Stacking and Splitting | reshaping-and-stacking | 3 | 35 |
| NP-010 | Linear Algebra | Matrix Operations with NumPy | matrix-operations-with-numpy | 3 | 35 |

## 04 — Pandas (`PD`, 13 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| PD-001 | Series & DataFrame | The Series | the-series | 2 | 30 |
| PD-002 | Series & DataFrame | The DataFrame | the-dataframe | 2 | 35 |
| PD-003 | Series & DataFrame | Loading and Inspecting Data | loading-and-inspecting-data | 2 | 30 |
| PD-004 | Selection | Selecting with loc and iloc | loc-and-iloc | 2 | 35 |
| PD-005 | Selection | Filtering, Sorting and Querying | filtering-sorting-querying | 2 | 35 |
| PD-006 | Cleaning | Missing Values | missing-values | 3 | 40 |
| PD-007 | Cleaning | Duplicates, Types and Text Cleaning | duplicates-types-text-cleaning | 3 | 35 |
| PD-008 | Cleaning | Outliers and Sanity Checks | outliers-and-sanity-checks | 3 | 35 |
| PD-009 | Grouping & Aggregation | groupby and Aggregation | groupby-and-aggregation | 3 | 45 |
| PD-010 | Combining Data | merge, join and concat | merge-join-concat | 3 | 45 |
| PD-011 | Reshaping | pivot, melt and Wide vs Long | pivot-melt-wide-long | 3 | 40 |
| PD-012 | Time & Features | Working with Dates and Times | dates-and-times | 3 | 35 |
| PD-013 | Time & Features | apply, map and Feature Preparation | apply-map-feature-prep | 3 | 40 |

## 05 — Data Visualization (`VIZ`, 8 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| VIZ-001 | Why Plot | Why Visualisation Matters | why-visualisation-matters | 1 | 25 |
| VIZ-002 | Matplotlib | Matplotlib Fundamentals: Figure and Axes | matplotlib-figure-and-axes | 2 | 35 |
| VIZ-003 | Matplotlib | Line and Bar Charts | line-and-bar-charts | 2 | 30 |
| VIZ-004 | Distributions & Relationships | Histograms and Distributions | histograms-and-distributions | 2 | 35 |
| VIZ-005 | Distributions & Relationships | Scatter Plots and Correlation | scatter-plots-and-correlation | 2 | 35 |
| VIZ-006 | Seaborn & Statistical Plots | Seaborn, Box Plots and Heatmaps | seaborn-box-plots-heatmaps | 3 | 40 |
| VIZ-007 | Reading Charts Critically | Choosing the Right Chart | choosing-the-right-chart | 2 | 30 |
| VIZ-008 | Reading Charts Critically | Misleading Graphs and Honest Reading | misleading-graphs | 3 | 30 |

## 06 — SQL & Databases (`SQL`, 13 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| SQL-001 | Relational Foundations | What a Database Is | what-a-database-is | 1 | 25 |
| SQL-002 | Relational Foundations | Tables, Rows, Columns and Types | tables-rows-columns | 1 | 30 |
| SQL-003 | Relational Foundations | Primary and Foreign Keys | primary-and-foreign-keys | 2 | 35 |
| SQL-004 | Querying | SELECT and Projection | select-and-projection | 1 | 30 |
| SQL-005 | Querying | WHERE: Filtering Rows | where-filtering-rows | 2 | 35 |
| SQL-006 | Querying | ORDER BY, LIMIT and NULL Handling | order-by-limit-nulls | 2 | 30 |
| SQL-007 | Aggregation | Aggregate Functions and GROUP BY | aggregate-functions-group-by | 2 | 40 |
| SQL-008 | Aggregation | HAVING vs WHERE | having-vs-where | 3 | 25 |
| SQL-009 | Joins | INNER and LEFT JOIN | inner-and-left-join | 3 | 45 |
| SQL-010 | Joins | Other Joins and Join Pitfalls | other-joins-and-pitfalls | 3 | 35 |
| SQL-011 | Advanced SQL | Subqueries and CTEs | subqueries-and-ctes | 4 | 40 |
| SQL-012 | Advanced SQL | Window Functions | window-functions | 4 | 45 |
| SQL-013 | Design & Performance | Indexes, Normalisation and Transactions | indexes-normalisation-transactions | 4 | 45 |

## 07 — Mathematics for ML (`MATH`, 16 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| MATH-001 | Algebraic Foundations | Equations and Functions | equations-and-functions | 1 | 30 |
| MATH-002 | Algebraic Foundations | Exponentials and Logarithms | exponentials-and-logarithms | 2 | 35 |
| MATH-003 | Vectors | Scalars, Vectors and Tensors | scalars-vectors-tensors | 2 | 30 |
| MATH-004 | Vectors | Vector Operations and Norms | vector-operations-and-norms | 2 | 35 |
| MATH-005 | Vectors | The Dot Product and Similarity | dot-product-and-similarity | 3 | 35 |
| MATH-006 | Matrices | Matrices as Data and as Functions | matrices-as-data-and-functions | 3 | 35 |
| MATH-007 | Matrices | Matrix Multiplication | matrix-multiplication | 3 | 40 |
| MATH-008 | Matrices | Transpose, Identity and Inverse | transpose-identity-inverse | 3 | 35 |
| MATH-009 | Matrix Structure | Determinants and Linear Independence | determinants-and-independence | 4 | 35 |
| MATH-010 | Matrix Structure | Eigenvalues and Eigenvectors | eigenvalues-and-eigenvectors | 5 | 45 |
| MATH-011 | Matrix Structure | Basis, Rank and Dimensionality | basis-rank-dimensionality | 4 | 35 |
| MATH-012 | Calculus | Limits and Continuity | limits-and-continuity | 3 | 30 |
| MATH-013 | Calculus | Derivatives and Slope | derivatives-and-slope | 3 | 40 |
| MATH-014 | Calculus | Partial Derivatives and Gradients | partial-derivatives-and-gradients | 4 | 40 |
| MATH-015 | Calculus | The Chain Rule | the-chain-rule | 4 | 35 |
| MATH-016 | Optimisation Maths | Minima, Maxima and Convexity | minima-maxima-convexity | 4 | 40 |

## 08 — Probability & Statistics (`STAT`, 15 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| STAT-001 | Probability | Probability, Sample Spaces and Events | probability-sample-spaces-events | 1 | 30 |
| STAT-002 | Probability | Combining Probabilities | combining-probabilities | 2 | 35 |
| STAT-003 | Conditional Probability | Conditional Probability and Independence | conditional-probability | 3 | 35 |
| STAT-004 | Conditional Probability | Bayes' Theorem | bayes-theorem | 4 | 45 |
| STAT-005 | Random Variables | Random Variables and Distributions | random-variables | 3 | 35 |
| STAT-006 | Random Variables | Expectation and Variance | expectation-and-variance | 3 | 35 |
| STAT-007 | Describing Data | Mean, Median and Mode | mean-median-mode | 1 | 30 |
| STAT-008 | Describing Data | Spread: Variance and Standard Deviation | spread-variance-std | 2 | 30 |
| STAT-009 | Describing Data | Covariance and Correlation | covariance-and-correlation | 3 | 35 |
| STAT-010 | Distributions | The Normal Distribution | the-normal-distribution | 3 | 40 |
| STAT-011 | Distributions | Binomial, Poisson and Other Useful Distributions | binomial-poisson-distributions | 3 | 35 |
| STAT-012 | Sampling & Inference | Sampling and Sampling Bias | sampling-and-bias | 3 | 30 |
| STAT-013 | Sampling & Inference | The Central Limit Theorem | central-limit-theorem | 4 | 40 |
| STAT-014 | Sampling & Inference | Confidence Intervals | confidence-intervals | 4 | 40 |
| STAT-015 | Interpreting Evidence | Hypothesis Testing, p-values and Causation | hypothesis-testing-and-p-values | 4 | 45 |

## 09 — Machine Learning (`ML`, 32 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| ML-001 | Foundations | AI, Machine Learning and Deep Learning | ai-ml-and-deep-learning | 1 | 30 |
| ML-002 | Foundations | Supervised, Unsupervised and Reinforcement Learning | types-of-learning | 2 | 35 |
| ML-003 | Foundations | Features, Labels and the Shape of a Dataset | features-and-labels | 2 | 30 |
| ML-004 | Foundations | Training, Validation and Test Splits | train-validation-test-splits | 2 | 35 |
| ML-005 | Regression | Linear Regression | linear-regression | 3 | 45 |
| ML-006 | Regression | Multiple and Polynomial Regression | multiple-and-polynomial-regression | 3 | 40 |
| ML-007 | Regression | Regression Loss Functions and Metrics | regression-losses-and-metrics | 3 | 40 |
| ML-008 | Regression | Gradient Descent | gradient-descent | 4 | 50 |
| ML-009 | Classification | Logistic Regression | logistic-regression | 4 | 45 |
| ML-010 | Classification | K-Nearest Neighbours | k-nearest-neighbours | 2 | 35 |
| ML-011 | Classification | Naive Bayes | naive-bayes | 3 | 40 |
| ML-012 | Classification | Support Vector Machines | support-vector-machines | 4 | 45 |
| ML-013 | Classification | Cross-Entropy and Classification Losses | cross-entropy-loss | 4 | 35 |
| ML-014 | Trees & Ensembles | Decision Trees | decision-trees | 3 | 45 |
| ML-015 | Trees & Ensembles | Random Forests and Bagging | random-forests-and-bagging | 4 | 40 |
| ML-016 | Trees & Ensembles | Boosting, Gradient Boosting and XGBoost | boosting-and-xgboost | 4 | 45 |
| ML-017 | Clustering | K-Means Clustering | k-means-clustering | 3 | 40 |
| ML-018 | Clustering | Hierarchical and Density-Based Clustering | hierarchical-and-dbscan | 4 | 40 |
| ML-019 | Dimensionality Reduction | Principal Component Analysis | principal-component-analysis | 4 | 45 |
| ML-020 | Dimensionality Reduction | Feature Selection and Extraction | feature-selection-and-extraction | 3 | 35 |
| ML-021 | Evaluation | Accuracy and the Confusion Matrix | confusion-matrix | 2 | 35 |
| ML-022 | Evaluation | Precision, Recall and F1 | precision-recall-f1 | 3 | 40 |
| ML-023 | Evaluation | ROC Curves and AUC | roc-and-auc | 4 | 40 |
| ML-024 | Evaluation | Cross-Validation | cross-validation | 3 | 35 |
| ML-025 | Bias & Variance | Overfitting and Underfitting | overfitting-and-underfitting | 3 | 40 |
| ML-026 | Bias & Variance | The Bias–Variance Trade-off | bias-variance-tradeoff | 4 | 40 |
| ML-027 | Data Preparation | Missing Values and Outliers | missing-values-and-outliers | 3 | 35 |
| ML-028 | Data Preparation | Encoding, Scaling and Normalisation | encoding-scaling-normalisation | 3 | 40 |
| ML-029 | Data Preparation | Feature Engineering | feature-engineering | 3 | 40 |
| ML-030 | Optimisation & Regularisation | Regularisation and Hyperparameter Tuning | regularisation-and-tuning | 4 | 45 |
| ML-031 | Practical ML | scikit-learn Pipelines | sklearn-pipelines | 3 | 40 |
| ML-032 | Practical ML | Model Persistence, Tracking and Reproducibility | persistence-and-reproducibility | 3 | 35 |

## 10 — Deep Learning (`DL`, 20 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| DL-001 | The Neuron | From Linear Model to Neuron | from-linear-model-to-neuron | 3 | 35 |
| DL-002 | The Neuron | Activation Functions | activation-functions | 3 | 40 |
| DL-003 | The Neuron | Layers and Forward Propagation | layers-and-forward-propagation | 3 | 40 |
| DL-004 | Training a Network | Loss Functions for Neural Networks | neural-network-losses | 3 | 35 |
| DL-005 | Training a Network | Backpropagation | backpropagation | 5 | 50 |
| DL-006 | Training a Network | Epochs, Batches and Batch Size | epochs-batches-batch-size | 3 | 35 |
| DL-007 | Training a Network | Learning Rate and Schedules | learning-rate-and-schedules | 4 | 35 |
| DL-008 | Optimisers | SGD and Momentum | sgd-and-momentum | 4 | 40 |
| DL-009 | Optimisers | Adam and Adaptive Optimisers | adam-and-adaptive-optimisers | 4 | 40 |
| DL-010 | Regularising Deep Nets | Weight Initialisation | weight-initialisation | 4 | 35 |
| DL-011 | Regularising Deep Nets | Dropout | dropout | 3 | 35 |
| DL-012 | Regularising Deep Nets | Batch Normalisation | batch-normalisation | 4 | 40 |
| DL-013 | Convolutional Networks | Convolution and Filters | convolution-and-filters | 4 | 45 |
| DL-014 | Convolutional Networks | Padding, Stride and Feature Maps | padding-stride-feature-maps | 4 | 40 |
| DL-015 | Convolutional Networks | Pooling and Downsampling | pooling-and-downsampling | 3 | 30 |
| DL-016 | Convolutional Networks | CNN Architectures End to End | cnn-architectures | 4 | 40 |
| DL-017 | Sequence Models | Recurrent Neural Networks | recurrent-neural-networks | 4 | 45 |
| DL-018 | Sequence Models | LSTM and GRU | lstm-and-gru | 5 | 45 |
| DL-019 | Sequence Models | Sequence-to-Sequence and the Limits of Recurrence | seq2seq-and-limits-of-recurrence | 4 | 35 |
| DL-020 | Attention & Transformers | Attention and the Transformer Block | attention-and-transformers | 5 | 50 |

## 11 — Natural Language Processing (`NLP`, 11 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| NLP-001 | Text Preprocessing | Text as Data and Tokenisation | text-as-data-and-tokenisation | 2 | 35 |
| NLP-002 | Text Preprocessing | Vocabulary, Stop Words and Normalisation | vocabulary-and-stop-words | 2 | 30 |
| NLP-003 | Text Preprocessing | Stemming, Lemmatisation and n-grams | stemming-lemmatisation-ngrams | 3 | 35 |
| NLP-004 | Classical Representations | Bag of Words | bag-of-words | 2 | 35 |
| NLP-005 | Classical Representations | TF-IDF | tf-idf | 3 | 40 |
| NLP-006 | Embeddings | Word Embeddings and Word2Vec | word-embeddings-and-word2vec | 4 | 45 |
| NLP-007 | Embeddings | Semantic Similarity and Embedding Spaces | semantic-similarity | 3 | 35 |
| NLP-008 | Sequence Modelling | Language Modelling | language-modelling | 4 | 40 |
| NLP-009 | Sequence Modelling | Attention in NLP and Transformer Encoders | attention-in-nlp | 5 | 45 |
| NLP-010 | NLP Tasks | Text Classification and Sentiment Analysis | text-classification-and-sentiment | 3 | 40 |
| NLP-011 | NLP Tasks | Named Entity Recognition and Sequence Labelling | named-entity-recognition | 4 | 35 |

## 12 — Computer Vision (`CV`, 10 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| CV-001 | Images as Data | Pixels, Channels and Colour | pixels-channels-and-colour | 2 | 30 |
| CV-002 | Images as Data | Images as Tensors | images-as-tensors | 2 | 30 |
| CV-003 | Preprocessing & Augmentation | Resizing and Normalisation | image-resizing-and-normalisation | 2 | 30 |
| CV-004 | Preprocessing & Augmentation | Data Augmentation | data-augmentation | 3 | 35 |
| CV-005 | Convolution in Practice | Convolution Filters and Edge Detection | convolution-filters-edge-detection | 3 | 40 |
| CV-006 | Convolution in Practice | OpenCV Fundamentals | opencv-fundamentals | 2 | 35 |
| CV-007 | Vision Tasks | Image Classification | image-classification | 3 | 35 |
| CV-008 | Vision Tasks | Object Detection and Bounding Boxes | object-detection | 4 | 45 |
| CV-009 | Vision Tasks | Image Segmentation | image-segmentation | 4 | 40 |
| CV-010 | Architectures & Transfer | Transfer Learning and CNN Architectures | transfer-learning | 4 | 40 |

## 13 — Generative AI & LLMs (`GEN`, 13 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| GEN-001 | Generative Foundations | What Generative AI Is | what-generative-ai-is | 2 | 30 |
| GEN-002 | Generative Foundations | Language Models and Next-Token Prediction | next-token-prediction | 3 | 40 |
| GEN-003 | Inside a Transformer LM | Tokens and Tokenisation for LLMs | llm-tokenisation | 3 | 35 |
| GEN-004 | Inside a Transformer LM | Embeddings and Positional Encoding | embeddings-and-positional-encoding | 4 | 40 |
| GEN-005 | Inside a Transformer LM | Self-Attention | self-attention | 5 | 50 |
| GEN-006 | Inside a Transformer LM | The Transformer Block and the Context Window | transformer-block-and-context-window | 4 | 40 |
| GEN-007 | Training & Adaptation | Pretraining: How an LLM Learns | pretraining | 3 | 35 |
| GEN-008 | Training & Adaptation | Fine-Tuning, Instruction Tuning and RLHF | fine-tuning-and-rlhf | 4 | 45 |
| GEN-009 | Using LLMs Well | Prompt Engineering | prompt-engineering | 3 | 40 |
| GEN-010 | Using LLMs Well | Structured Outputs and Tool Calling | structured-outputs-and-tool-calling | 4 | 40 |
| GEN-011 | Using LLMs Well | Hallucinations, Evaluation and AI Safety | hallucinations-and-ai-safety | 3 | 40 |
| GEN-012 | Grounding & Retrieval | Vector Databases and Semantic Search | vector-databases-and-semantic-search | 4 | 40 |
| GEN-013 | Agents & Evaluation | Retrieval-Augmented Generation and Agents | rag-and-agents | 4 | 45 |

## 14 — MLOps & ML System Design (`OPS`, 13 units)

| id | module | title | slug | diff | min |
|----|--------|-------|------|------|-----|
| OPS-001 | Version Control | Git Fundamentals | git-fundamentals | 2 | 40 |
| OPS-002 | Version Control | GitHub, Branches and Collaboration | github-and-branches | 2 | 35 |
| OPS-003 | Serving Models | Environments and Dependency Management | environments-and-dependencies | 2 | 30 |
| OPS-004 | Serving Models | APIs and HTTP for ML | apis-and-http-for-ml | 3 | 35 |
| OPS-005 | Serving Models | Serving a Model with FastAPI | serving-with-fastapi | 3 | 45 |
| OPS-006 | Serving Models | Streamlit and Quick Demos | streamlit-demos | 2 | 30 |
| OPS-007 | Packaging & Delivery | Docker and Containers | docker-and-containers | 3 | 45 |
| OPS-008 | Packaging & Delivery | CI/CD for Machine Learning | ci-cd-for-ml | 4 | 40 |
| OPS-009 | Packaging & Delivery | Deployment and Cloud Concepts | deployment-and-cloud | 3 | 35 |
| OPS-010 | Tracking & Reproducibility | Experiment, Model and Data Versioning | experiment-and-data-versioning | 3 | 40 |
| OPS-011 | Monitoring | Logging, Monitoring and Observability | logging-and-monitoring | 3 | 35 |
| OPS-012 | Monitoring | Model Drift and Data Drift | model-and-data-drift | 4 | 40 |
| OPS-013 | ML System Design | Designing an ML System End to End | ml-system-design | 5 | 50 |
