import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'PD-001',
    domain: 'PD',
    module: 'Series & DataFrame',
    topic: 'The Series',
    title: 'The Series',
    slug: 'the-series',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: [],
    related: [],
    tags: ['series', 'index', 'alignment', 'dtype', 'vectorisation'],

    learningObjectives: [
      'Create a Series from a list or dictionary and read its values, index, name and dtype',
      'Explain why a Series carries a labelled index and what that index buys you over a plain list',
      'Predict the result of arithmetic between two Series with different indexes, including where NaN appears',
      'Use vectorised operations and boolean masks on a Series instead of writing a Python loop',
    ],

    terminology: [
      {
        term: 'Series',
        definition:
          'A one-dimensional labelled array: a NumPy-backed block of values of one dtype, paired with an index of the same length.',
        simple: 'A single column of data where every value also has a name tag.',
      },
      {
        term: 'Index',
        definition:
          'The immutable sequence of labels attached to a Series. Labels may be integers, strings, dates or tuples, and they need not be unique.',
        simple: 'The name tags down the left-hand side.',
      },
      {
        term: 'dtype',
        definition:
          'The single data type shared by every value in the Series — `int64`, `float64`, `bool`, `datetime64[ns]`, `object`, `category` and so on.',
        simple: 'What kind of thing is in the column: whole numbers, decimals, text, dates.',
      },
      {
        term: 'Alignment',
        definition:
          'The rule that binary operations between two Series match values by index label, not by position, producing the union of the two indexes.',
        simple: 'Pandas lines rows up by their name tags before doing the sums.',
      },
      {
        term: 'Vectorised operation',
        definition:
          'An operation applied to the whole Series at once in compiled code, such as `s * 1.2`, rather than element by element in a Python loop.',
        simple: 'Doing the same sum to every value in one go instead of one at a time.',
      },
    ],

    simpleExplanation:
      "A Series is one column of data, and the thing that makes it different from an ordinary Python list is that every value also carries a label. A list of sales figures can only tell you that the third number is 1575. A Series can tell you that Wednesday was 1575. Those labels live in something called the index, and pandas takes them seriously: when you add two Series together, it does not add the first value to the first value the way a list would. It looks at the labels, matches Wednesday with Wednesday, and adds those. If one side has a label the other does not, pandas does not quietly drop it or crash — it keeps the label and puts NaN there, meaning \"I have no value for this\". That single behaviour is the reason pandas feels effortless when your data lines up and infuriating when it does not, and understanding it now will save you a great deal of confusion later.",

    whyItExists:
      'Plain Python lists lose the meaning of a position the moment you sort, filter or combine them, and they make you write a loop for every calculation. A Series keeps each value permanently attached to its label so data cannot silently fall out of correspondence, and pushes arithmetic down into compiled NumPy code so whole-column maths is both fast and written in one line.',

    analogy: {
      scenario:
        'Think of a cloakroom at a theatre. Each coat on the rail has a numbered ticket, and the ticket is what makes the coat findable. If you simply piled the coats up in the order they arrived, you could only ask for "the fourth coat", and the moment someone removed one from the middle, every subsequent answer would be wrong. With tickets, the coat stays yours no matter how the rail is reordered, and two cloakrooms can be reconciled by ticket number rather than by hoping the piles are in the same order.',
      mapping: [
        { from: 'A coat on the rail', to: 'A value in the Series' },
        { from: 'The numbered ticket on the coat', to: 'The index label for that value' },
        { from: 'Asking for "the fourth coat"', to: 'Positional access, which breaks as soon as rows move' },
        { from: 'Asking for "ticket 42"', to: 'Label-based access, which survives sorting and filtering' },
        { from: 'A ticket with no matching coat in the second cloakroom', to: 'A label present in one Series but not the other, which produces NaN' },
      ],
      bridge:
        'The ticket is the index, and the promise it encodes is exactly what pandas enforces on every operation: a value never becomes detached from its label. Alignment on arithmetic is simply the cloakroom attendant refusing to hand you somebody else\'s coat because the piles happened to be the same height. NaN is the attendant saying "this ticket is genuine, but there is no coat for it here" — which is honest, and much better than silently returning the wrong coat.',
      limitations:
        'The analogy suggests tickets must be unique. A pandas index is not required to be unique, and duplicate labels are a real source of surprise: aligning two Series that both contain the label "banana" twice produces four rows, not two.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a Series',
        caption: 'Four parts, all visible when you print one.',
        subject: 'pd.Series([1240, 980, 1575], index=["Mon", "Tue", "Wed"], name="sales_gbp")',
        annotations: [
          { part: '[1240, 980, 1575]', note: 'The values. Stored as a single typed NumPy block, which is why maths on them is fast.' },
          { part: 'index=["Mon", "Tue", "Wed"]', note: 'The labels. Same length as the values, and they travel with them through every operation.' },
          { part: 'name="sales_gbp"', note: 'The Series name. Becomes the column header when the Series is placed into a DataFrame.' },
          { part: 'dtype: int64 (inferred)', note: 'One dtype for the whole Series. Mixing types forces the fallback dtype `object`, which is slow.' },
        ],
      },
      {
        kind: 'table',
        title: 'Alignment in action: store_a + store_b',
        caption: 'Pandas takes the union of the two indexes and matches by label, not by row position.',
        columns: ['label', 'store_a', 'store_b', 'store_a + store_b'],
        rows: [
          ['apple', '5', '(absent)', 'NaN'],
          ['banana', '7', '2', '11.0'],
          ['cherry', '9', '(absent)', 'NaN'],
          ['date', '(absent)', '4', 'NaN'],
        ],
      },
      {
        kind: 'compare',
        title: 'Python list versus pandas Series',
        left: {
          heading: 'list',
          points: [
            'Positional only — meaning lives in your head',
            'Can hold mixed types, at the cost of speed',
            'Maths requires a loop or a comprehension',
            'Combining two lists means zipping and hoping the order matches',
          ],
        },
        right: {
          heading: 'Series',
          points: [
            'Every value carries a label that survives sorting and filtering',
            'One dtype, stored in a contiguous NumPy block',
            '`s * 1.2` applies to all values in compiled code',
            'Combining two Series aligns on labels automatically',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Try it: build a Series and watch the index',
        caption: 'Change the labels and see how selection and alignment respond.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      'A pandas Series is a one-dimensional, size-mutable, homogeneously typed labelled array consisting of a values buffer (normally a NumPy ndarray or a pandas ExtensionArray) and an Index object of equal length. Binary operations between Series are defined element-wise over the union of their indexes, with missing labels yielding the dtype-appropriate missing value.',

    codeExamples: [
      {
        language: 'python',
        title: 'Creating a Series and reading its parts',
        runnable: true,
        code: `import pandas as pd

daily_sales = pd.Series(
    [1240, 980, 1575, 1310],
    index=["Mon", "Tue", "Wed", "Thu"],
    name="sales_gbp",
)
print(daily_sales)
print()
print("index :", list(daily_sales.index))
print("values:", daily_sales.values)
print("dtype :", daily_sales.dtype)
print("shape :", daily_sales.shape)
print("Wed   :", daily_sales["Wed"])`,
        output: `Mon    1240
Tue     980
Wed    1575
Thu    1310
Name: sales_gbp, dtype: int64

index : ['Mon', 'Tue', 'Wed', 'Thu']
values: [1240  980 1575 1310]
dtype : int64
shape : (4,)
Wed   : 1575`,
        explanation:
          'Printing a Series shows three things at once: the labels on the left, the values on the right, and a footer with the name and dtype. `.values` hands back the underlying NumPy array with the labels stripped off, which is what you pass to scikit-learn later. Note `shape` is `(4,)` — one dimension, four elements — because a Series is genuinely one-dimensional.',
      },
      {
        language: 'python',
        title: 'Alignment: the behaviour that defines pandas',
        runnable: true,
        code: `import pandas as pd

store_a = pd.Series([5, 7, 9], index=["apple", "banana", "cherry"])
store_b = pd.Series([2, 4], index=["banana", "date"])

print(store_a + store_b)
print()
# Treat "absent" as zero instead of propagating NaN:
print(store_a.add(store_b, fill_value=0))`,
        output: `apple      NaN
banana    11.0
cherry     NaN
date       NaN
dtype: float64

apple      5.0
banana    11.0
cherry     9.0
date       4.0
dtype: float64`,
        explanation:
          'Only `banana` exists on both sides, so only `banana` gets a real sum. Every other label appears in the union of the indexes with NaN, and the dtype is promoted from `int64` to `float64` because NaN is a float. `Series.add(other, fill_value=0)` is the explicit way to say "treat a missing label as zero" — and being forced to say it out loud is the point: pandas will not guess whether an absent apple means zero apples or unknown apples.',
      },
      {
        language: 'python',
        title: 'Vectorised maths and boolean masks',
        runnable: true,
        code: `import pandas as pd

temps_c = pd.Series([18.5, 21.0, 25.4, 30.1, 16.2],
                    index=["sensor_1", "sensor_2", "sensor_3", "sensor_4", "sensor_5"],
                    name="temp_c")

temps_f = temps_c * 9 / 5 + 32          # whole Series at once
hot = temps_c > 24                      # a boolean Series, same index

print(temps_f.round(1))
print()
print(hot)
print()
print("hot sensors:", list(temps_c[hot].index))
print("mean:", round(temps_c.mean(), 2), "| max:", temps_c.max())`,
        output: `sensor_1    65.3
sensor_2    69.8
sensor_3    77.7
sensor_4    86.2
sensor_5    61.2
Name: temp_c, dtype: float64

sensor_1    False
sensor_2    False
sensor_3     True
sensor_4     True
sensor_5    False
Name: temp_c, dtype: bool

hot sensors: ['sensor_3', 'sensor_4']
mean: 22.24 | max: 30.1`,
        explanation:
          'No loop appears anywhere. `temps_c * 9 / 5 + 32` runs in compiled code over the whole values buffer, and the index is carried through untouched. The comparison `temps_c > 24` produces a boolean Series with the same labels, which you then use to select rows — this is the boolean mask pattern that the rest of the Pandas domain is built on. Aggregations such as `.mean()` collapse the Series to a single number and skip missing values by default.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A single feature column heading into a model',
        usage:
          'Every column you feed to scikit-learn starts life as a Series. Scaling a feature is `(s - s.mean()) / s.std()`, one line, with the row labels preserved so the scaled values stay matched to the right customers.',
      },
      {
        context: 'Reconciling two systems',
        usage:
          'Finance holds revenue by product code and the warehouse holds units by product code. Subtracting one Series from the other aligns on product code automatically, and every NaN in the result is a genuine finding: a code one system knows about and the other does not.',
      },
      {
        context: 'A time series of sensor readings',
        usage:
          'With a DatetimeIndex, a Series of readings supports `s["2026-03"]` to pull a month and `s.resample("1h").mean()` to downsample. The labels are what make both of those possible.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'Supplies the typed values buffer under a Series; `.values` or `.to_numpy()` gets you back to it.' },
      { tool: 'pandas', role: 'Every DataFrame column, every `value_counts()` result and every `groupby` aggregation is a Series.' },
      { tool: 'scikit-learn', role: 'Accepts a Series as the target vector `y`, and keeps its index so predictions can be joined back to the original rows.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming two Series add up position by position',
        why: 'Pandas aligns on index labels. If the two Series have the same values in a different order, or slightly different labels, the result is not the element-wise sum you pictured.',
        fix: 'Check `s1.index.equals(s2.index)` before relying on the result, or drop to `s1.values + s2.values` when you genuinely mean "by position".',
      },
      {
        mistake: 'Treating NaN from alignment as a nuisance to be filled in silently',
        why: 'A NaN produced by alignment is information: it says a label exists on one side only. Blanket `.fillna(0)` turns a data-quality signal into a plausible-looking wrong number.',
        fix: 'Inspect the mismatched labels first — `s1.index.difference(s2.index)` — then decide whether zero, drop or investigate is correct.',
      },
      {
        mistake: 'Looping over a Series with `for i in range(len(s))` and `s[i]`',
        why: 'It is roughly a hundred times slower than the vectorised form, and if the index holds strings or dates, `s[i]` is a label lookup rather than a position lookup, so it may raise `KeyError`.',
        fix: 'Use vectorised expressions. When you truly need positions, use `s.iloc[i]`, and when you need both label and value, iterate `s.items()`.',
      },
      {
        mistake: 'Building a Series from mixed types and not noticing dtype `object`',
        why: 'One stray string in a column of numbers forces dtype `object`, which stores Python objects and disables fast maths — `s.mean()` may then fail or silently do something unexpected.',
        fix: 'Print `s.dtype` after construction. If it says `object` where you expected numbers, find the offender with `pd.to_numeric(s, errors="coerce").isna()`.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between a pandas Series and a Python list?',
        answer:
          'A Series stores its values in a single typed buffer, usually a NumPy array, and pairs them with an index of labels of the same length. That gives three concrete advantages over a list: operations are vectorised and run in compiled code rather than a Python loop; every value keeps a label so it cannot drift out of correspondence when you sort or filter; and binary operations between two Series align on those labels rather than on position. The cost is homogeneity — a Series really wants one dtype, and mixing types degrades it to `object`, which loses most of the speed advantage.',
        followUp:
          'A strong answer adds that a Series is also the building block of a DataFrame, and that `groupby` results, `value_counts()` and a single column selection all return Series.',
      },
      {
        level: 'intermediate',
        question: 'You add two Series of equal length and get a result full of NaN. What happened, and how would you diagnose it?',
        answer:
          'Equal length does not imply equal labels. Pandas aligns on index, takes the union, and places NaN wherever a label is missing from one side — so two 100-row Series with disjoint indexes produce a 200-row result that is entirely NaN. Diagnose with `s1.index.equals(s2.index)` and `s1.index.difference(s2.index)` to see exactly which labels fail to match. Common causes are one index being strings and the other integers, stray whitespace in string labels, or one Series having been reset while the other was not. The fix depends on intent: `reset_index(drop=True)` on both if position is what you meant, `add(other, fill_value=0)` if absence means zero, or a real investigation if the mismatch is a data problem.',
      },
      {
        level: 'ml-engineer',
        question: 'Why does keeping the index matter when you produce model predictions?',
        answer:
          'Models return a bare NumPy array with no labels. If you have filtered, dropped missing rows or shuffled the data, the position of prediction `i` no longer corresponds to row `i` of your original table, and joining by position silently attributes predictions to the wrong entities. Wrapping the output as `pd.Series(preds, index=X_test.index)` restores the correspondence, so writing results back to the source table is an alignment rather than a leap of faith. This class of bug is nearly invisible — the metrics still look plausible — which is exactly what makes it dangerous.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Create a Series of exam scores for four students (Ada 91, Bo 78, Cleo 84, Dev 65), then print the names of everyone who scored above the mean.',
        hint: 'Build a boolean mask by comparing the Series to `scores.mean()`, then use it to select.',
        language: 'python',
        starterCode: 'import pandas as pd\n\nscores = pd.Series(...)\n',
        solution:
          'import pandas as pd\n\nscores = pd.Series([91, 78, 84, 65], index=["Ada", "Bo", "Cleo", "Dev"], name="score")\nabove = scores[scores > scores.mean()]\nprint(list(above.index))\n\nThe mean is 79.5, so this prints [\'Ada\', \'Cleo\']. The important habit here is that `scores > scores.mean()` is itself a Series of booleans sharing the same index, and indexing with it keeps only the True labels.',
      },
      {
        prompt:
          'Predict the exact output, then run it:\n\na = pd.Series([1, 2, 3], index=["x", "y", "z"])\nb = pd.Series([10, 20, 30], index=["z", "y", "x"])\nprint(a + b)',
        hint: 'Does pandas add the first element to the first element, or match labels first?',
        solution:
          'It prints:\n\nx    31\ny    22\nz    13\ndtype: int64\n\nAlignment matches x with x (1 + 30), y with y (2 + 20) and z with z (3 + 10). The reversed order of b is irrelevant. The dtype stays int64 because both indexes contain exactly the same labels, so no NaN is introduced.',
      },
      {
        prompt:
          'You have `revenue = pd.Series([100, 250], index=["A", "B"])` and `costs = pd.Series([40, 60], index=["B", "C"])`. Produce a profit Series where a missing cost counts as zero and a missing revenue counts as zero, and say which products should be investigated.',
        hint: 'Use `sub` with `fill_value`, then work out which labels were only present on one side.',
        solution:
          'profit = revenue.sub(costs, fill_value=0)\n\nThat gives A 100.0, B 190.0, C -40.0. Product C has costs but no revenue and product A has revenue but no costs, so both are worth investigating: `revenue.index.symmetric_difference(costs.index)` returns [\'A\', \'C\']. The lesson is that `fill_value` lets the arithmetic proceed, but you should still look at which labels needed filling before trusting the numbers.',
      },
    ],

    quiz: [
      {
        id: 'PD-001-q1',
        type: 'code-output',
        language: 'python',
        concept: 'alignment',
        prompt: 'What does this print?',
        code: 'import pandas as pd\na = pd.Series([1, 2], index=["p", "q"])\nb = pd.Series([10, 20], index=["q", "r"])\nprint((a + b).to_dict())',
        options: [
          "{'p': nan, 'q': 12.0, 'r': nan}",
          "{'p': 11.0, 'q': 22.0}",
          "{'p': 11, 'q': 22, 'r': 20}",
          'It raises a ValueError because the indexes differ',
        ],
        answerIndex: 0,
        explanation:
          'Pandas takes the union of the indexes (p, q, r) and matches by label. Only `q` exists on both sides, giving 2 + 10 = 12. The others become NaN, and the dtype is promoted to float.',
      },
      {
        id: 'PD-001-q2',
        type: 'mcq',
        concept: 'series structure',
        prompt: 'Which statement most accurately describes a Series?',
        options: [
          'A one-dimensional typed array of values paired with an index of labels of equal length',
          'A two-dimensional table with rows and columns',
          'A Python dictionary with extra methods bolted on',
          'An untyped list that happens to print differently',
        ],
        answerIndex: 0,
        explanation:
          'A Series is one-dimensional: a values buffer plus an index. It resembles a dictionary in that labels map to values, but unlike a dictionary its values share one dtype, its labels need not be unique, and it supports vectorised arithmetic.',
      },
      {
        id: 'PD-001-q3',
        type: 'truefalse',
        concept: 'index uniqueness',
        prompt: 'A pandas Series index must contain unique labels.',
        answer: false,
        explanation:
          'Duplicates are permitted. `s["a"]` then returns a Series rather than a scalar, and aligning two Series that each contain a repeated label produces the cartesian product of the matches, which can multiply rows unexpectedly.',
      },
      {
        id: 'PD-001-q4',
        type: 'fill',
        concept: 'dtype',
        prompt: 'Which Series attribute tells you the data type shared by all of its values?',
        answers: ['dtype', '.dtype', 's.dtype', 'dtypes'],
        explanation:
          '`s.dtype` reports the single type of the values buffer, such as `int64` or `object`. Checking it immediately after loading data catches the classic case of a numeric column arriving as text.',
      },
      {
        id: 'PD-001-q5',
        type: 'multi',
        concept: 'vectorisation',
        prompt: 'Which of these operate on the whole Series at once rather than element by element in Python? Select all that apply.',
        options: [
          's * 2',
          's > 10',
          '[x * 2 for x in s]',
          's.str.upper()',
          'for i in range(len(s)): s.iloc[i] * 2',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Arithmetic, comparison and the `.str` accessor all dispatch to compiled loops over the values buffer. The comprehension and the explicit `for` loop run one Python-level step per element, which is roughly two orders of magnitude slower on realistic data sizes.',
      },
      {
        id: 'PD-001-q6',
        type: 'explain',
        concept: 'why the index matters',
        prompt: 'Explain to a colleague who only knows Python lists why the pandas index is worth the extra complication.',
        rubric: [
          'States that each value keeps a label rather than relying on position',
          'Notes that labels survive sorting, filtering and reordering',
          'Mentions that binary operations align on labels, producing NaN where a label is missing',
        ],
        sampleAnswer:
          'With a list, the meaning of a value is its position, and that meaning is only in your head — sort the list, or drop one element, and every assumption downstream is quietly wrong. A Series attaches a label to each value and keeps them together through sorting, filtering and selection. Because labels are real data, pandas can match two Series up by label when you combine them, so you never add January to February by accident. Where a label exists on only one side you get NaN, which tells you about a genuine mismatch instead of hiding it.',
        explanation:
          'A good answer frames the index as a correctness feature, not decoration: it is what stops data from drifting out of correspondence during a long analysis.',
      },
    ],

    flashcards: [
      { front: 'What two things make up a Series?', back: 'A one-dimensional typed values buffer and an Index of labels of the same length (plus an optional name and a dtype).' },
      { front: 'How does pandas combine two Series with `+`?', back: 'By matching index labels, not positions. The result index is the union of both, with NaN wherever a label is missing on one side.' },
      { front: 'What does `s.values` give you?', back: 'The underlying NumPy array with the labels stripped off — the form models expect.' },
      { front: 'Why does adding two int Series sometimes give float64?', back: 'Because alignment introduced NaN, and NaN is a floating point value, so the whole result is promoted to float.' },
      { front: 'What does `s[s > 10]` return?', back: 'A Series containing only the labels whose value exceeded 10 — the boolean mask pattern.' },
      { front: 'What does dtype `object` usually mean in a numeric column?', back: 'That non-numeric values sneaked in, so pandas fell back to storing Python objects. Maths on it is slow or impossible.' },
    ],

    challenge: {
      title: 'Reconcile two inventories',
      brief:
        'You are given two Series of stock counts keyed by SKU, one from the warehouse system and one from the shop floor count. Write a script that reports: the SKUs present in both and their difference, the SKUs present in only one system, and the total absolute discrepancy. Do not use a loop for the arithmetic, and do not fill missing values before you have reported which labels are missing.',
      language: 'python',
      acceptanceCriteria: [
        'Uses index set operations (`intersection`, `difference` or `symmetric_difference`) to report unmatched SKUs',
        'Computes differences with vectorised Series arithmetic, not a Python loop',
        'Reports NaN-producing labels explicitly rather than filling them silently',
        'Prints a clear summary that a non-programmer could act on',
      ],
      starterCode:
        'import pandas as pd\n\nwarehouse = pd.Series([12, 4, 30, 7], index=["A1", "A2", "B7", "C3"])\nshopfloor = pd.Series([12, 5, 28, 2], index=["A1", "A2", "B7", "D9"])\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I know Python lists but have never touched pandas. Teach me what a Series is, and convince me the index is not just decoration.',
      mustCover: [
        'A Series is one column of values plus a label for each value',
        'All values share one dtype, which is what makes whole-column maths fast',
        'Labels survive sorting and filtering, so meaning is not tied to position',
        'Arithmetic between Series matches labels and produces NaN for unmatched ones',
      ],
      bonusSignals: ['gives a concrete example where positional matching goes wrong', 'mentions vectorisation versus looping', 'notes that NaN from alignment is information'],
      sampleExplanation:
        'A Series is a single column of data where every value keeps a name tag. If you have sales for Monday to Thursday, a list can only tell you that the third number is 1575; a Series tells you Wednesday was 1575, and it keeps saying that even after you sort by value or throw half the rows away. All the values are the same kind of thing, which lets pandas do maths on the whole column in one compiled step instead of looping in Python. The part that surprises people is what happens when you add two Series: pandas does not add first-to-first, it matches the name tags. Wednesday meets Wednesday. If one side has a Friday the other has never heard of, pandas keeps Friday and writes NaN, which is its way of saying "there genuinely is no value here" rather than inventing one.',
    },
  },

  {
    id: 'PD-002',
    domain: 'PD',
    module: 'Series & DataFrame',
    topic: 'The DataFrame',
    title: 'The DataFrame',
    slug: 'the-dataframe',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['PD-001'],
    related: ['PD-001'],
    tags: ['dataframe', 'columns', 'dtypes', 'shape', 'describe', 'info'],

    learningObjectives: [
      'Build a DataFrame from a dictionary of lists and explain why it is best understood as a dict of Series sharing one index',
      'Read `.shape`, `.columns`, `.index` and `.dtypes` and say what each tells you about the table',
      'Interpret the output of `.info()` and `.describe()` well enough to spot a problem in a new dataset',
      'Add, rename, reorder and drop columns without mutating a table you did not mean to change',
    ],

    terminology: [
      {
        term: 'DataFrame',
        definition:
          'A two-dimensional labelled table: an ordered collection of Series that all share one row index, where each column has its own dtype.',
        simple: 'A spreadsheet where the rows have name tags and every column has its own type.',
      },
      {
        term: 'Column index',
        definition:
          'The Index object holding the column names, available as `df.columns`. Like the row index it is immutable and orderable.',
        simple: 'The row of headings across the top.',
      },
      {
        term: 'dtypes',
        definition:
          'The per-column mapping of column name to data type. A DataFrame is heterogeneous across columns but homogeneous within each one.',
        simple: 'A list saying what kind of data each column holds.',
      },
      {
        term: 'Column-oriented storage',
        definition:
          'Pandas groups columns of the same dtype into contiguous memory blocks, which is why column operations are fast and row-by-row iteration is slow.',
        simple: 'Data is stored column by column, not row by row.',
      },
      {
        term: 'describe()',
        definition:
          'A summary of the numeric columns: count, mean, standard deviation, minimum, the 25th, 50th and 75th percentiles, and maximum.',
        simple: 'A quick numeric health check of every number column.',
      },
    ],

    simpleExplanation:
      "A DataFrame is a table, and the most useful way to picture it is as several Series standing side by side, all sharing the same row labels. That picture explains almost everything about how it behaves. Each column has its own type, because each column is its own Series — one can be whole numbers, the next text, the next dates — but within a single column everything is the same kind of thing. The rows are held together by a shared index, so pulling out a row means asking every column for the value sitting at that label. Pandas stores the data column by column rather than row by row, which is why summing a column is instant and why walking through rows one at a time is painfully slow. Before you do anything clever with a table, you look at four things: how big it is, what the columns are called, what type each column holds, and a quick numerical summary. Those four checks catch most data problems before they become model problems.",

    whyItExists:
      'Real data is heterogeneous: an orders table has integer quantities, decimal prices, text categories and timestamps side by side, so a single NumPy array cannot hold it without collapsing everything to the `object` dtype. The DataFrame keeps one dtype per column for speed while presenting the whole thing as one aligned table, giving you spreadsheet-shaped data with array-shaped performance.',

    analogy: {
      scenario:
        'Picture a filing cabinet where each drawer holds one kind of card: one drawer of dates, one of names, one of amounts. The drawers are not independent — the tenth card in every drawer belongs to the same customer, and each position carries the same customer reference. To read one customer\'s record you pull the card at that reference from every drawer. To total the amounts you open one drawer and run your thumb down it, never touching the others.',
      mapping: [
        { from: 'One drawer holding cards of one kind', to: 'One column: a Series with a single dtype' },
        { from: 'The shared customer reference on every card', to: 'The row index that all columns share' },
        { from: 'Pulling one card from every drawer', to: 'Selecting a row, which gathers one value per column' },
        { from: 'Running your thumb down one drawer', to: 'A column aggregation such as `df["amount"].sum()`' },
        { from: 'Having to open every drawer to read one record', to: 'Why row-wise iteration is slow in a column-oriented store' },
      ],
      bridge:
        'The cabinet is column-oriented storage, and it explains the performance rules you will otherwise have to memorise: column work is cheap because it touches one contiguous block, row work is expensive because it touches every block. The shared reference on every card is the index, which is why a DataFrame is not merely a collection of unrelated lists — the correspondence between columns is guaranteed rather than assumed.',
      limitations:
        'A real cabinet lets you file a card anywhere. A DataFrame column must be exactly as long as the index, and appending a row means rebuilding the blocks, which is why growing a table inside a loop is a performance trap rather than an ordinary operation.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'A DataFrame is a dict of Series over one index',
        caption: 'Four columns, four dtypes, one shared row index.',
        art: `            columns ->   order_id     customer      amount     placed_at
                          (int64)      (object)    (float64)  (datetime64)
 index                   +----------+-------------+----------+--------------+
   0                     |   1001   |   "Ada"     |   24.99  |  2026-03-01  |
   1                     |   1002   |   "Bo"      |  112.50  |  2026-03-01  |
   2                     |   1003   |   "Cleo"    |    8.75  |  2026-03-02  |
   3                     |   1004   |   "Ada"     |   64.00  |  2026-03-03  |
                         +----------+-------------+----------+--------------+
                          \\________/ \\___________/ \\________/ \\____________/
                            one Series per column, each stored contiguously`,
      },
      {
        kind: 'table',
        title: 'The four-question first look',
        caption: 'Run these before any analysis. They take ten seconds and prevent hours of confusion.',
        columns: ['Question', 'Call', 'What a bad answer looks like'],
        rows: [
          ['How big is it?', 'df.shape', '(0, 12) — your filter matched nothing, or the file failed to parse'],
          ['What is in it?', 'df.columns.tolist()', 'Unnamed: 0, or headers with trailing spaces'],
          ['What types?', 'df.dtypes', 'A price column typed `object` — text has crept in'],
          ['Are the numbers sane?', 'df.describe()', 'A minimum age of -3, or a max price of 9999999'],
        ],
      },
      {
        kind: 'compare',
        title: 'Column work versus row work',
        caption: 'Both give the same answer; one is orders of magnitude faster.',
        left: {
          heading: 'With the grain: `df["amount"].sum()`',
          points: [
            'Touches one contiguous float64 block',
            'Runs entirely in compiled code',
            'Cost grows linearly with rows, with a tiny constant',
            'The natural way to express aggregation',
          ],
        },
        right: {
          heading: 'Against the grain: `for _, row in df.iterrows()`',
          points: [
            'Builds a new Series object for every row',
            'Forces every column into a common dtype, often `object`',
            'One Python-level step per row',
            'Typically 50 to 200 times slower on a realistic table',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Inspect a DataFrame interactively',
        caption: 'Toggle columns and dtypes to see how shape, info and describe respond.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      'A pandas DataFrame is a two-dimensional, size-mutable, potentially heterogeneous labelled data structure consisting of an ordered mapping from a column Index to Series that all share a common row Index. Columns are stored as typed arrays grouped into blocks by dtype, so the structure is homogeneous within a column and heterogeneous across columns.',

    codeExamples: [
      {
        language: 'python',
        title: 'Building a DataFrame and reading its shape',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "customer": ["Ada", "Bo", "Cleo", "Ada", "Bo"],
    "amount":   [24.99, 112.50, 8.75, 64.00, 19.99],
    "channel":  ["web", "app", "web", "web", "store"],
})
print(orders)
print()
print("shape  :", orders.shape)
print("columns:", orders.columns.tolist())
print("index  :", list(orders.index))
print()
print(orders.dtypes)`,
        output: `   order_id customer  amount channel
0      1001      Ada   24.99     web
1      1002       Bo  112.50     app
2      1003     Cleo    8.75     web
3      1004      Ada   64.00     web
4      1005       Bo   19.99   store

shape  : (5, 4)
columns: ['order_id', 'customer', 'amount', 'channel']
index  : [0, 1, 2, 3, 4]

order_id      int64
customer     object
amount      float64
channel      object
dtype: object`,
        explanation:
          'A dictionary of equal-length lists becomes a DataFrame with one column per key, in insertion order. Because no index was supplied, pandas created a default `RangeIndex` of 0 to 4 — those integers are labels that happen to look like positions, a coincidence that causes real confusion later with `loc` and `iloc`. `shape` is always `(rows, columns)`, and `dtypes` confirms that each column got its own type: text columns land as `object`.',
      },
      {
        language: 'python',
        title: 'info() and describe(): the two summaries worth memorising',
        runnable: true,
        code: `import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "customer": ["Ada", "Bo", "Cleo", "Ada", "Bo"],
    "amount":   [24.99, 112.50, np.nan, 64.00, 19.99],
    "channel":  ["web", "app", "web", "web", "store"],
})
orders.info()
print()
print(orders.describe())
print()
print(orders.describe(include="object"))`,
        output: `<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
 #   Column    Non-Null Count  Dtype
---  ------    --------------  -----
 0   order_id  5 non-null      int64
 1   customer  5 non-null      object
 2   amount    4 non-null      float64
 3   channel   5 non-null      object
dtypes: float64(1), int64(1), object(2)
memory usage: 292.0+ bytes

          order_id      amount
count      5.00000    4.000000
mean    1003.00000   55.370000
std        1.58114   41.976616
min     1001.00000   19.990000
25%     1002.00000   23.740000
50%     1003.00000   44.495000
75%     1004.00000   76.125000
max     1005.00000  112.500000

       customer channel
count         5       5
unique        3       3
top         Ada     web
freq          2       3`,
        explanation:
          'Read `info()` for structure and completeness: the Non-Null Count column instantly shows that `amount` has one missing value, and the Dtype column is where you catch a numeric column that arrived as text. Read `describe()` for plausibility — note that `count` for `amount` is 4, not 5, because describe skips missing values, and that `order_id` is summarised as if it were a quantity, which is meaningless. Identifiers appearing in `describe()` is a standing reminder that pandas summarises by dtype, not by meaning. Passing `include="object"` gives the categorical summary: how many unique values, the most common one and its frequency.',
      },
      {
        language: 'python',
        title: 'Adding, renaming, reordering and dropping columns',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "amount":   [24.99, 112.50, 8.75],
    "qty":      [1, 3, 1],
})

orders["unit_price"] = orders["amount"] / orders["qty"]     # new column from others
orders["is_large"] = orders["amount"] > 50                  # boolean column

orders = orders.rename(columns={"qty": "quantity"})         # returns a new frame
orders = orders[["order_id", "quantity", "amount", "unit_price", "is_large"]]

print(orders)
print()
print(orders.drop(columns=["is_large"]).columns.tolist())
print("original still has:", orders.columns.tolist())`,
        output: `   order_id  quantity  amount  unit_price  is_large
0      1001         1   24.99       24.99     False
1      1002         3  112.50       37.50      True
2      1003         1    8.75        8.75     False

['order_id', 'quantity', 'amount', 'unit_price']
original still has: ['order_id', 'quantity', 'amount', 'unit_price', 'is_large']`,
        explanation:
          'Assigning to `df["new"]` adds or replaces a column in place, and the right-hand side may be any expression over existing columns — it is aligned on the index, so it cannot land out of order. `rename` and `drop` are different: they return a new DataFrame and leave the original alone, which is why the last two lines disagree. Reordering columns is just selecting them in the order you want with a list. Preferring these non-mutating forms, and reassigning explicitly, is how you avoid wondering later which operations changed your table.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The first cell of every notebook',
        usage:
          'Load the file, then run `df.shape`, `df.head()`, `df.info()` and `df.describe()`. Analysts do this reflexively because it catches truncated files, misparsed headers and numeric columns stored as text before any modelling time is wasted.',
      },
      {
        context: 'A feature table for a model',
        usage:
          'The matrix you hand to scikit-learn is a DataFrame whose columns are features and whose index identifies the entity. Keeping it as a DataFrame rather than a bare array means feature importances come back with names attached instead of `feature_17`.',
      },
      {
        context: 'A nightly data-quality report',
        usage:
          'Production pipelines assert on exactly these attributes: that `df.shape[0]` is within expected bounds, that `df.dtypes` has not drifted, and that non-null counts have not suddenly fallen. A dtype change upstream is one of the most common causes of a silently broken pipeline.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: 'The DataFrame is the unit of currency: almost every function in the library takes one and returns one.' },
      { tool: 'scikit-learn', role: 'Estimators accept a DataFrame directly and, with `set_output(transform="pandas")`, return one, preserving column names through a pipeline.' },
      { tool: 'Parquet / Arrow', role: 'Columnar file formats that mirror the DataFrame\'s own column-block layout, which is why reading Parquet is dramatically faster than CSV.' },
    ],

    commonMistakes: [
      {
        mistake: 'Building a DataFrame by appending one row at a time in a loop',
        why: 'Each append copies the whole table, so building n rows costs O(n squared) and the memory churn is severe. `DataFrame.append` was removed in pandas 2.0 for exactly this reason.',
        fix: 'Collect rows in a Python list of dicts, then call `pd.DataFrame(rows)` once at the end, or `pd.concat` on a list of frames.',
      },
      {
        mistake: 'Reading `describe()` as if every numeric column were a measurement',
        why: 'Pandas summarises by dtype, so identifiers, postcodes and year columns get a mean and a standard deviation that mean nothing, and their presence can hide a genuinely odd column.',
        fix: 'Decide which numeric columns are quantities, and `describe()` just those: `df[["amount", "qty"]].describe()`.',
      },
      {
        mistake: 'Using attribute access `df.count` for columns',
        why: 'Attribute access only works for names that are valid identifiers and do not collide with existing methods. `df.count` returns the method, not your column, and a column with a space in its name is unreachable this way.',
        fix: 'Use bracket access `df["count"]` everywhere. It always works, and it is obvious to a reader that you mean a column.',
      },
      {
        mistake: 'Assuming `df.rename(...)` changed the DataFrame',
        why: 'Most DataFrame methods return a new object and leave the original untouched. Forgetting to reassign is one of the most common reasons "my change did not apply".',
        fix: 'Always reassign: `df = df.rename(columns={...})`, or chain operations so the result flows onwards. Avoid `inplace=True`; it is not faster and it breaks chaining.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the relationship between a Series and a DataFrame?',
        answer:
          'A DataFrame is an ordered collection of Series that all share one row index — literally a dict of Series with a column index on top. Selecting a single column with `df["amount"]` returns that Series, complete with the shared row index, and assigning a Series back into a DataFrame aligns it on the index rather than on position. This also explains the dtype rule: each column is its own Series with its own dtype, so a DataFrame is heterogeneous across columns but homogeneous within one.',
        followUp:
          'A strong answer notes that selecting a single row also returns a Series, but one whose index is the column names, and whose dtype is the common type of all the values — often `object`.',
      },
      {
        level: 'intermediate',
        question: 'Why is iterating over DataFrame rows discouraged, and what should you do instead?',
        answer:
          'Pandas stores data column by column in typed blocks. Every row you request must be assembled from every block into a new Series, usually upcast to a common dtype, and then handled by a Python-level loop — so `iterrows` is typically 50 to 200 times slower than the vectorised equivalent, and it also loses dtypes along the way. The alternatives, in order of preference, are: a vectorised expression over columns; `np.where` or `np.select` for conditional logic; `df.groupby(...).transform(...)` for per-group calculations; and only then `apply`. If you genuinely must iterate, `itertuples` is considerably faster than `iterrows` because it yields lightweight namedtuples.',
      },
      {
        level: 'ml-engineer',
        question: 'A colleague says their 8 GB CSV will not fit in memory as a DataFrame. What levers would you pull?',
        answer:
          'First measure with `df.memory_usage(deep=True)` on a sample, because the in-memory size is usually larger than the file. Then: downcast numeric columns from int64 and float64 to int32 or float32 where the range allows; convert low-cardinality text columns to `category`, which often cuts a string column by 90 per cent or more; read only the columns you need with `usecols`; and specify `dtype` at read time so pandas does not infer wastefully. If that is not enough, read in chunks with `chunksize` and aggregate incrementally, or switch the storage format to Parquet, which is columnar, typed and compressed, and supports reading a subset of columns without touching the rest.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Build a DataFrame of four students with columns `name`, `score` and `hours_studied`, then add a column `score_per_hour` and print the table sorted by that column, highest first.',
        hint: 'Column arithmetic aligns automatically; `sort_values` takes `ascending=False`.',
        language: 'python',
        starterCode: 'import pandas as pd\n\nstudents = pd.DataFrame({\n    "name": ["Ada", "Bo", "Cleo", "Dev"],\n    "score": [91, 78, 84, 65],\n    "hours_studied": [10, 6, 12, 5],\n})\n',
        solution:
          'students["score_per_hour"] = students["score"] / students["hours_studied"]\nprint(students.sort_values("score_per_hour", ascending=False))\n\nBo and Dev both come out at 13.0, then Ada at 9.1 and Cleo at 7.0. The point of the exercise is that the new column is computed from two existing Series in one vectorised expression and is automatically aligned on the index, so no row can end up with another row\'s ratio.',
      },
      {
        prompt:
          'Given a DataFrame `df` you have just loaded, write the four lines you would always run first, and state what problem each one is capable of revealing.',
        hint: 'Size, names, types, plausibility.',
        solution:
          'df.shape reveals a truncated or over-filtered load (a zero row count, or far fewer rows than the source file).\ndf.columns.tolist() reveals stray whitespace in headers, duplicate names and a spurious "Unnamed: 0" from a saved index.\ndf.info() reveals missing values through the non-null counts, and dtype problems such as a price column stored as object.\ndf.describe() reveals impossible values: negative ages, zero prices, a maximum far beyond anything plausible.\n\nRunning all four takes seconds and catches the majority of data issues before they become modelling mysteries.',
      },
      {
        prompt:
          'Explain why `df.rename(columns={"qty": "quantity"})` followed by `print(df.columns)` still shows `qty`, and give two ways to fix it.',
        hint: 'What does the method return, and what did you do with the return value?',
        solution:
          '`rename` does not modify `df`; it builds and returns a new DataFrame with the new column labels, and the return value was discarded. The two fixes are to reassign, `df = df.rename(columns={"qty": "quantity"})`, or to chain the rename into whatever comes next so the new object flows onwards. A third option, `inplace=True`, exists but is discouraged: it is not faster, it prevents chaining, and pandas is gradually moving away from it.',
      },
    ],

    quiz: [
      {
        id: 'PD-002-q1',
        type: 'mcq',
        concept: 'dataframe structure',
        prompt: 'Which description of a DataFrame is most precise?',
        options: [
          'An ordered collection of Series sharing one row index, each with its own dtype',
          'A two-dimensional NumPy array with strings allowed',
          'A list of row dictionaries with fast lookup',
          'A table in which every value must share the same dtype',
        ],
        answerIndex: 0,
        explanation:
          'Columns are Series and each has its own dtype; the shared row index is what binds them into a table. The single-dtype description fits a NumPy array, not a DataFrame.',
      },
      {
        id: 'PD-002-q2',
        type: 'code-output',
        language: 'python',
        concept: 'shape',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ndf = pd.DataFrame({"a": [1, 2, 3], "b": ["x", "y", "z"]})\nprint(df.shape)',
        options: ['(3, 2)', '(2, 3)', '(3,)', '6'],
        answerIndex: 0,
        explanation:
          '`shape` is always `(rows, columns)`. There are three rows and two columns, so `(3, 2)`. Getting this the wrong way round is a common early slip.',
      },
      {
        id: 'PD-002-q3',
        type: 'truefalse',
        concept: 'method return values',
        prompt: '`df.drop(columns=["x"])` removes the column from `df` itself.',
        answer: false,
        explanation:
          'It returns a new DataFrame without that column and leaves `df` untouched. You must reassign the result, or pass `inplace=True`, which is discouraged because it breaks method chaining.',
      },
      {
        id: 'PD-002-q4',
        type: 'match',
        concept: 'inspection methods',
        prompt: 'Match each inspection call to the question it answers.',
        pairs: [
          { left: 'df.shape', right: 'How many rows and columns are there?' },
          { left: 'df.dtypes', right: 'What type is each column stored as?' },
          { left: 'df.info()', right: 'How many non-null values does each column have?' },
          { left: 'df.describe()', right: 'Are the numeric ranges and percentiles plausible?' },
        ],
        explanation:
          'These four cover structure, typing, completeness and plausibility. Running all of them on a newly loaded table is the standard first look and takes only seconds.',
      },
      {
        id: 'PD-002-q5',
        type: 'multi',
        concept: 'performance',
        prompt: 'Which of these are genuinely slow patterns on a large DataFrame? Select all that apply.',
        options: [
          'Appending one row at a time in a loop',
          'df["amount"].sum()',
          'for _, row in df.iterrows(): ...',
          'df["a"] + df["b"]',
          'Repeatedly calling pd.concat inside a loop',
        ],
        answerIndices: [0, 2, 4],
        explanation:
          'Row-at-a-time growth and repeated concatenation copy the whole table each time, giving quadratic cost, and `iterrows` rebuilds a Series per row. Column arithmetic and column aggregation stay inside compiled code and are the fast path.',
      },
      {
        id: 'PD-002-q6',
        type: 'explain',
        concept: 'first-look inspection',
        prompt: 'A dataset arrives with a `price` column showing dtype `object` in `df.info()`. Explain what that means, why it matters, and what you would check next.',
        rubric: [
          'Explains that `object` means Python objects, typically strings, not numbers',
          'Says that arithmetic and aggregation will fail or behave unexpectedly',
          'Proposes a concrete diagnostic to find the offending values',
        ],
        sampleAnswer:
          'Dtype `object` means pandas could not parse the whole column as numbers and fell back to storing Python objects, almost always strings. That matters because `df["price"].mean()` will either raise or concatenate text, comparisons will sort lexicographically, and any model will refuse the column. The next step is to find the offenders: `pd.to_numeric(df["price"], errors="coerce")` turns unparseable entries into NaN, so `df.loc[pd.to_numeric(df["price"], errors="coerce").isna(), "price"].unique()` shows exactly which raw values broke it — usually currency symbols, thousands separators, or a literal string such as "N/A".',
        explanation:
          'The examinable skill is turning a dtype observation into a specific diagnostic rather than reaching straight for `astype(float)` and hoping.',
      },
    ],

    flashcards: [
      { front: 'What is a DataFrame, in one sentence?', back: 'An ordered collection of Series that share one row index, each column carrying its own dtype.' },
      { front: 'What does `df.shape` return?', back: 'A tuple of `(rows, columns)` — always that order.' },
      { front: 'What does the Non-Null Count in `df.info()` tell you?', back: 'How many values in each column are not missing; comparing it to the row count reveals missing data instantly.' },
      { front: 'Why is `describe()` misleading for an id column?', back: 'It summarises by dtype, not meaning, so identifiers get a mean and standard deviation that are meaningless.' },
      { front: 'Why is `iterrows()` slow?', back: 'Data is stored column-wise, so each row must be assembled into a new Series and often upcast, once per row, in Python.' },
      { front: 'What is the safest way to add a column?', back: '`df["new"] = <expression over existing columns>` — the result aligns on the index, so rows cannot mismatch.' },
    ],

    challenge: {
      title: 'Write a reusable first-look function',
      brief:
        'Write `first_look(df)` that prints a compact report for any DataFrame: shape, the column names with their dtypes and non-null counts side by side, the percentage missing per column sorted descending, the number of fully duplicated rows, and a `describe()` limited to the columns you judge to be genuine quantities. It must work on a table it has never seen, without assuming any column names.',
      language: 'python',
      acceptanceCriteria: [
        'Works on any DataFrame without hard-coded column names',
        'Reports missing values as a percentage, sorted worst first',
        'Separates numeric summary from the structural summary',
        'Prints nothing misleading when a column is entirely non-numeric',
      ],
      starterCode: 'import pandas as pd\n\n\ndef first_look(df: pd.DataFrame) -> None:\n    print("shape:", df.shape)\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me what a DataFrame is, starting from the Series I already understand, and tell me what you always check first when you meet a new one.',
      mustCover: [
        'A DataFrame is several Series side by side sharing one row index',
        'Each column has its own dtype; within a column everything is one type',
        'Data is stored column by column, which makes column work fast and row work slow',
        'The first-look checks: shape, columns, dtypes, info and describe',
      ],
      bonusSignals: ['explains why `describe()` on an id column is meaningless', 'mentions that most methods return a new frame rather than mutating', 'gives a concrete problem that inspection catches'],
      sampleExplanation:
        'Take the Series you already know — a column of values with a label on each one — and stand several of them side by side so they share the same row labels. That is a DataFrame. Each column keeps its own type, so amounts can be decimals while customer names are text, but inside any one column everything is the same kind of thing. Pandas stores the table column by column rather than row by row, which is why adding up a column is instant and why stepping through rows one at a time is slow enough to notice. When a new table arrives I always run four checks before anything else: `shape` to see how much data I actually have, `columns` to see what the headers really say, `info()` to see the types and how many values are missing, and `describe()` to see whether the numbers are plausible. A negative age or a price column typed as text shows up in seconds, and finding it then is far cheaper than finding it after a model has been trained on it.',
    },
  },
  {
    id: 'PD-003',
    domain: 'PD',
    module: 'Series & DataFrame',
    topic: 'Loading and inspecting data',
    title: 'Loading and Inspecting Data',
    slug: 'loading-and-inspecting-data',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['PD-002'],
    related: ['PD-001', 'PD-002'],
    tags: ['read_csv', 'head', 'sample', 'memory_usage', 'parsing', 'dtypes'],

    learningObjectives: [
      'Load a CSV with `read_csv` and control parsing with `dtype`, `parse_dates`, `usecols`, `na_values`, `sep` and `index_col`',
      'Use `head`, `tail`, `sample` and `value_counts` to form an honest first impression of a table',
      'Measure real memory consumption with `memory_usage(deep=True)` and cut it with dtype choices',
      'Run a repeatable first-look checklist that catches misparsed files before any analysis starts',
    ],

    terminology: [
      {
        term: 'read_csv',
        definition:
          'The pandas CSV reader. It infers separator handling, headers, dtypes and missing-value markers unless you override them, and returns a DataFrame.',
        simple: 'The function that turns a text file of rows and commas into a table.',
      },
      {
        term: 'Type inference',
        definition:
          'The process by which `read_csv` scans values and picks a dtype per column. A single unparseable value in a column forces the whole column to `object`.',
        simple: 'Pandas guessing what kind of data each column holds.',
      },
      {
        term: 'na_values',
        definition:
          'The set of strings treated as missing. Pandas recognises a default list including "", "NA", "NaN", "null" and "N/A"; anything else must be declared.',
        simple: 'The words in the file that really mean "no value".',
      },
      {
        term: 'memory_usage(deep=True)',
        definition:
          'Per-column memory in bytes, where `deep=True` follows object pointers to measure the actual Python strings rather than just the 8-byte pointers.',
        simple: 'How much memory each column really costs.',
      },
      {
        term: 'First-look checklist',
        definition:
          'The fixed sequence of inspections run on every newly loaded table: shape, head, dtypes, non-null counts, duplicates, describe and category frequencies.',
        simple: 'The same few checks you always run before trusting a new file.',
      },
    ],

    simpleExplanation:
      "A CSV file is just text: lines of values separated by commas, with no information at all about what those values mean. When you hand it to pandas, `read_csv` has to guess — it guesses which line holds the headers, which values are numbers, which strings mean \"missing\", and what to do with a date that could be day-first or month-first. Most of the time it guesses well, and that is precisely the danger, because a wrong guess produces a table that looks perfectly reasonable and is quietly wrong. Your leading-zero postcodes become integers, your dates become text, and your \"N/A\" strings survive as literal characters in a numeric column, forcing the whole column to be stored as text. The defence is a habit rather than a trick: load the file, then look at it. Check the shape, look at the first and last few rows, read the dtypes, count the missing values, and glance at the value frequencies of anything categorical. Five checks, half a minute, and you will catch the great majority of data disasters at the moment they are cheapest to fix.",

    whyItExists:
      'Data arrives as text files from systems that do not share your assumptions about separators, encodings, date order or how to write "unknown". Without a configurable reader every project would begin by writing a fragile parser, and without a disciplined inspection step teams routinely spend days debugging a model when the real fault was a column that silently loaded as strings.',

    analogy: {
      scenario:
        'Think of receiving a delivery of unlabelled boxes from a supplier you have never used. You could carry every box straight to the shelves and start selling from them, or you could spend two minutes opening a few: one from the top of the pallet, one from the bottom, a couple at random from the middle. That two minutes is where you discover that a third of the boxes are the wrong product, that some are empty, and that the weights on the manifest are in pounds while your system expects kilograms.',
      mapping: [
        { from: 'The unlabelled delivery', to: 'A raw CSV, which carries no type information at all' },
        { from: 'Opening the box on top', to: '`df.head()` — often unrepresentative, because files are frequently sorted' },
        { from: 'Opening a box from the bottom', to: '`df.tail()` — where truncated files and summary rows hide' },
        { from: 'Opening a few at random', to: '`df.sample(5)` — the check most people skip and most often need' },
        { from: 'Weights in the wrong unit on the manifest', to: 'A column whose dtype is right but whose meaning is not, such as prices in pence' },
      ],
      bridge:
        'The inspection habit is the whole lesson. `head` alone is the equivalent of opening only the top box: it is where most people stop, and it is exactly where sorted data hides its problems, because the first twenty rows of a file sorted by date all come from one day. Combining `head`, `tail` and `sample` with `info` and `describe` is opening boxes from all over the pallet, and it converts a hopeful assumption into evidence before anything downstream depends on it.',
      limitations:
        'The analogy implies that a visual inspection is enough. It is not: a mis-parsed float or a timezone error looks entirely normal to the eye, which is why the checklist includes machine checks such as dtypes and non-null counts rather than relying on reading rows.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'From file on disk to a table you trust',
        caption: 'The middle step is the one beginners skip.',
        steps: [
          { label: 'Look at the raw text first', detail: 'Open the file, or read three lines, to see the separator, the header row and any preamble.' },
          { label: 'Read with explicit options', detail: 'Pass `dtype`, `parse_dates` and `na_values` rather than relying on inference.' },
          { label: 'Structural check', detail: '`shape`, `columns`, `dtypes`, `info()` — is the table the size and shape you expected?' },
          { label: 'Content check', detail: '`head`, `tail`, `sample`, `describe`, `value_counts` on key categories.' },
          { label: 'Decide and record', detail: 'Write down what you found: the loader options become part of the pipeline, not a one-off fix in a notebook.' },
        ],
      },
      {
        kind: 'table',
        title: 'read_csv options that matter in practice',
        caption: 'Each of these corresponds to a real failure that inference cannot prevent.',
        columns: ['Option', 'What it does', 'The failure it prevents'],
        rows: [
          ['dtype={"zip": "string"}', 'Forces a column type instead of inferring', 'Postcode 01234 silently becoming the integer 1234'],
          ['parse_dates=["placed_at"]', 'Converts columns to datetime64 at load time', 'Dates stored as text, so sorting and `.dt` both fail'],
          ['na_values=["N/A", "-", "unknown"]', 'Adds file-specific missing markers', 'A numeric column forced to `object` by one stray string'],
          ['usecols=["id", "amount"]', 'Reads only named columns', 'Loading 200 columns of which you need 2'],
          ['index_col="order_id"', 'Uses a column as the row index', 'A meaningless RangeIndex plus a duplicate id column'],
          ['sep=";" or sep="\\t"', 'Declares the real delimiter', 'European CSVs loading as one giant single column'],
          ['encoding="latin-1"', 'Overrides the assumed UTF-8', 'UnicodeDecodeError on files exported from older systems'],
          ['nrows=1000', 'Reads a sample of rows', 'Waiting ten minutes to discover the separator was wrong'],
        ],
      },
      {
        kind: 'compare',
        title: 'head() versus sample()',
        caption: 'They answer different questions. Use both.',
        left: {
          heading: 'df.head()',
          points: [
            'Shows the first rows in file order',
            'Cheap, deterministic, good for checking column parsing',
            'Misleading on sorted data — all rows look alike',
            'Cannot reveal how varied the body of the table is',
          ],
        },
        right: {
          heading: 'df.sample(5, random_state=0)',
          points: [
            'Shows rows drawn from anywhere in the table',
            'Reveals variety, oddities and unexpected categories',
            'Set `random_state` so a colleague sees the same rows',
            'The single most under-used inspection call in pandas',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Load, inspect, and change the options',
        caption: 'Change dtype and parse_dates settings and watch the inspection output change.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      '`pandas.read_csv` is a configurable text parser that maps delimited text to a DataFrame, performing separator detection, header resolution, missing-value substitution and per-column dtype inference, each of which may be overridden explicitly. Inspection methods (`head`, `tail`, `sample`, `info`, `describe`, `memory_usage`) expose the resulting structure, completeness, distribution and memory footprint without materialising additional copies of the data.',

    codeExamples: [
      {
        language: 'python',
        title: 'Reading a messy CSV with explicit options',
        runnable: true,
        code: `import pandas as pd
from io import StringIO

raw = """order_id;placed_at;customer;zip;amount;notes
1001;01/03/2026;Ada;01234;24.99;
1002;02/03/2026;Bo;90210;112.50;gift wrap
1003;02/03/2026;Cleo;01234;N/A;damaged
1004;03/03/2026;Ada;33101;64.00;"""

orders = pd.read_csv(
    StringIO(raw),
    sep=";",                       # this file is semicolon-delimited
    dtype={"zip": "string"},       # keep the leading zero
    parse_dates=["placed_at"],     # real datetimes, not text
    dayfirst=True,                 # 01/03/2026 is 1 March, not 3 January
    na_values=["N/A"],             # this file writes missing amounts as N/A
)
print(orders)
print()
print(orders.dtypes)`,
        output: `   order_id  placed_at customer    zip  amount      notes
0      1001 2026-03-01      Ada  01234   24.99        NaN
1      1002 2026-03-02       Bo  90210  112.50  gift wrap
2      1003 2026-03-02     Cleo  01234     NaN    damaged
3      1004 2026-03-03      Ada  33101   64.00        NaN

order_id              int64
placed_at    datetime64[ns]
customer             object
zip          string[python]
amount              float64
notes                object
dtype: object`,
        explanation:
          'Every option here fixes a failure that inference would have produced. Without `sep=";"` the whole file loads as a single column. Without `dtype={"zip": "string"}` the postcode becomes the integer 1234 and the leading zero is gone for good. Without `parse_dates` the dates are text, so sorting is lexicographic and `.dt` is unavailable; without `dayfirst=True` pandas would read 01/03/2026 as 3 January. Without `na_values=["N/A"]` the amount column contains one string, which forces dtype `object` and breaks every subsequent calculation. Being explicit turns the loader into documentation of what the file actually is.',
      },
      {
        language: 'python',
        title: 'The first-look checklist',
        runnable: true,
        code: `import pandas as pd

sensors = pd.DataFrame({
    "sensor_id": ["s1", "s2", "s3", "s1", "s2", "s3", "s1", "s2"],
    "site":      ["north", "north", "south", "north", "north", "south", "north", "north"],
    "temp_c":    [18.5, 21.0, 25.4, 19.1, 20.8, 26.0, 18.9, 20.5],
    "status":    ["ok", "ok", "ok", "ok", "fault", "ok", "ok", "ok"],
})

print("shape:", sensors.shape)
print()
print(sensors.head(3))
print()
print(sensors.tail(2))
print()
print(sensors.sample(3, random_state=7))
print()
print("missing per column:")
print(sensors.isna().sum())
print()
print("duplicated rows:", sensors.duplicated().sum())
print()
print(sensors["site"].value_counts())`,
        output: `shape: (8, 4)

  sensor_id   site  temp_c status
0        s1  north    18.5     ok
1        s2  north    21.0     ok
2        s3  south    25.4     ok

  sensor_id   site  temp_c status
6        s1  north    18.9     ok
7        s2  north    20.5     ok

  sensor_id   site  temp_c status
5        s3  south    26.0     ok
0        s1  north    18.5     ok
7        s2  north    20.5     ok

missing per column:
sensor_id    0
site         0
temp_c       0
status       0
dtype: int64

duplicated rows: 0

site
north    6
south    2
Name: count, dtype: int64`,
        explanation:
          'This is the sequence worth doing from memory. `head` and `tail` confirm the file parsed into the columns you expected and that no summary row is glued to the bottom. `sample(3, random_state=7)` draws from the middle where sorted files hide their variety, and fixing `random_state` makes the check reproducible for a colleague. `isna().sum()` gives a per-column missing count in one line, `duplicated().sum()` catches a double-loaded extract, and `value_counts()` on a categorical column exposes both the class balance and the spelling variants ("north", "North", "north ") that break grouping later.',
      },
      {
        language: 'python',
        title: 'Measuring and cutting memory',
        runnable: true,
        code: `import pandas as pd
import numpy as np

n = 200_000
rng = np.random.default_rng(0)
df = pd.DataFrame({
    "site":   rng.choice(["north", "south", "east", "west"], n),
    "temp_c": rng.uniform(-5, 40, n),
    "reading_id": np.arange(n),
})

def mb(frame):
    return frame.memory_usage(deep=True).sum() / 1024**2

print("before:", round(mb(df), 2), "MB")
print("shallow (misleading):", round(df.memory_usage(deep=False).sum() / 1024**2, 2), "MB")

slim = df.astype({"site": "category", "temp_c": "float32", "reading_id": "int32"})
print("after :", round(mb(slim), 2), "MB")
print(slim.dtypes.to_dict())`,
        output: `before: 12.98 MB
shallow (misleading): 4.58 MB
after : 1.15 MB
{'site': CategoricalDtype(categories=['east', 'north', 'south', 'west'], ordered=False), 'temp_c': dtype('float32'), 'reading_id': dtype('int32')}`,
        explanation:
          'The `deep=True` argument is essential, and the second print shows why: without it, the `object` column reports only 8 bytes per pointer and hides the Python strings those pointers lead to, understating the table by a factor of three here and by far more on longer text. Converting a four-value text column to `category` stores small integer codes plus one copy of each label, which is where almost all of the saving comes from. Halving the float and integer widths is safe here because temperatures do not need fifteen significant digits and the ids fit comfortably in int32 — but downcasting is a judgement call, and float32 for money is a mistake.',
      },
    ],

    realWorldExamples: [
      {
        context: 'An export from an internal system',
        usage:
          'Business systems routinely export semicolon-delimited, latin-1 encoded files with a two-line preamble and "-" for missing values. `sep`, `encoding`, `skiprows` and `na_values` turn a file that "will not load" into a clean table in one call.',
      },
      {
        context: 'Public datasets and competitions',
        usage:
          'The winning habit is identical: load, inspect, and note every column whose dtype is `object` but should not be. Leaderboards are full of people who lost a week to a leading-zero identifier that became an integer.',
      },
      {
        context: 'A production ingestion job',
        usage:
          'The loader options are the schema contract. Pipelines pass an explicit `dtype` mapping to `read_csv` so that a supplier adding a stray "unknown" to a numeric column fails loudly at ingest rather than silently changing a feature\'s type in tomorrow\'s model.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`read_csv`, `read_parquet`, `read_json` and `read_sql` all return the same DataFrame, so the inspection habit transfers across every source.' },
      { tool: 'PyArrow / Parquet', role: 'Stores dtypes with the data, so a round trip through Parquet removes the guessing that CSV forces on the reader.' },
      { tool: 'pandera / Great Expectations', role: 'Turn the informal first-look checklist into declarative assertions that run on every pipeline execution.' },
    ],

    commonMistakes: [
      {
        mistake: 'Calling `df.head()` and concluding the load worked',
        why: 'Files are usually sorted, so the first five rows are the least representative five rows in the table. Missing values, category variants and truncation all cluster elsewhere.',
        fix: 'Always pair `head()` with `tail()` and `sample(5, random_state=0)`, then confirm with `info()` and `isna().sum()`.',
      },
      {
        mistake: 'Letting pandas infer dtypes for identifiers',
        why: 'Postcodes, account numbers and product codes look numeric, so leading zeros are destroyed and long codes may lose precision when read as int64 or float64.',
        fix: 'Pass `dtype={"zip": "string", "account_no": "string"}` at read time. Identifiers are labels, not quantities, no matter how they look.',
      },
      {
        mistake: 'Guessing about ambiguous dates instead of checking',
        why: '03/04/2026 is 3 April in Europe and 4 March in the United States, and pandas will pick one silently. A whole analysis can be a month out with nothing visibly wrong.',
        fix: 'Set `dayfirst` explicitly, or better, insist on ISO-8601 at the source. After parsing, sanity check with `df["date"].min()` and `.max()`.',
      },
      {
        mistake: 'Reading `memory_usage()` without `deep=True`',
        why: 'Object columns report pointer size only, so a text-heavy table can appear to use 40 MB while genuinely holding 900 MB.',
        fix: 'Always `df.memory_usage(deep=True).sum()`, and convert low-cardinality text columns to `category` before concluding that the data will not fit.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'You load a CSV and the `price` column has dtype `object`. What are the likely causes and how do you confirm?',
        answer:
          'Dtype `object` means at least one value in the column could not be parsed as a number, so pandas stored Python objects instead. The usual culprits are currency symbols or thousands separators, a missing-value marker the reader does not recognise such as "N/A" or "-", or a stray footer row from the export. To confirm, run `pd.to_numeric(df["price"], errors="coerce")` and look at the rows where the result is NaN but the original was not: `df.loc[converted.isna() & df["price"].notna(), "price"].unique()` shows the exact offending strings. The fix belongs at load time — `na_values` for the markers, and a cleaning step with `str.replace` for symbols — not in a patch applied downstream.',
      },
      {
        level: 'intermediate',
        question: 'What does the first-look checklist consist of and why is each step there?',
        answer:
          'Shape, to confirm the row count matches expectations and the parse did not collapse into one column. Head and tail, to confirm the header row was found and no summary line is attached to the bottom. Sample with a fixed random state, because sorted files hide their variety in the middle. Info or dtypes, to catch numeric columns typed as text and to see non-null counts. `isna().sum()`, for a per-column missing profile. `duplicated().sum()`, because a double-loaded extract is a common and silent error. `describe()`, for impossible minimums and maximums. And `value_counts()` on each categorical column, which reveals spelling variants and class imbalance before either can corrupt a grouping or a model.',
        followUp:
          'A strong candidate mentions writing these checks as assertions in the pipeline, so the same class of problem is caught automatically next month rather than by eye.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you load a 30 GB CSV on a machine with 16 GB of memory?',
        answer:
          'Start by reading only what you need: `usecols` for the required columns and an explicit `dtype` mapping so nothing is inferred wastefully, since inference alone forces pandas to hold large chunks while it decides. Use `nrows=10_000` first to establish the schema and measure per-row memory with `memory_usage(deep=True)`. Then either stream with `chunksize` and aggregate incrementally, keeping only the reduced result in memory, or convert the file once to Parquet, which is columnar, typed and compressed, so subsequent reads touch only the required columns. If the work genuinely needs the whole table at once, move to an out-of-core engine such as Dask, Polars in streaming mode, or DuckDB querying the file directly — but converting to Parquet and reducing early solves the large majority of cases.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A colleague reports that a CSV "loads as a single column with semicolons in the values". Name the cause and write the corrected `read_csv` call.',
        hint: 'What does pandas assume the delimiter is, and what is this file actually using?',
        solution:
          '`read_csv` defaults to a comma. This file is semicolon-delimited, which is standard in locales that use the comma as a decimal separator, so every line parsed as one value. The corrected call is `pd.read_csv(path, sep=";")`, and in such files the decimal separator is often a comma too, so `decimal=","` is frequently needed alongside it. A quick way to diagnose any file of this kind is to print its first two raw lines before reaching for pandas at all.',
      },
      {
        prompt:
          'You have `df` with 5 million rows, a `city` column of about 400 distinct text values, and a `score` column of floats between 0 and 100. Reduce memory as far as you safely can, and justify each change.',
        hint: 'Which dtype is designed for low-cardinality text, and how much precision does a 0-100 score actually need?',
        solution:
          'df["city"] = df["city"].astype("category") replaces 5 million Python strings with 5 million small integer codes plus 400 stored labels, usually a 90 per cent-plus saving on that column. df["score"] = df["score"].astype("float32") halves that column, and float32 carries about seven significant digits, which is ample for a 0-100 score. Measure both with df.memory_usage(deep=True) before and after. The justification matters: category is safe here because the cardinality is low and stable, and float32 is safe because the quantity is a bounded score — neither choice would be safe for a free-text field or a monetary amount.',
      },
      {
        prompt:
          'Write a loader for a file whose dates are in DD/MM/YYYY, whose missing values are written as "--", whose id column has leading zeros, and of whose 60 columns you need only four.',
        hint: 'Four arguments, one for each of those requirements.',
        solution:
          'pd.read_csv(\n    path,\n    usecols=["account_id", "opened_on", "balance", "region"],\n    dtype={"account_id": "string"},\n    parse_dates=["opened_on"],\n    dayfirst=True,\n    na_values=["--"],\n)\n\nEach argument prevents a specific silent failure: usecols keeps memory and parse time proportional to what you need, dtype protects the leading zeros, parse_dates with dayfirst removes the month-day ambiguity, and na_values stops one marker string from forcing the balance column to object.',
      },
    ],

    quiz: [
      {
        id: 'PD-003-q1',
        type: 'mcq',
        concept: 'dtype inference',
        prompt: 'A CSV has a `zip` column containing 01234. Loaded with default options, what does pandas produce?',
        options: [
          'The integer 1234, with the leading zero lost',
          'The string "01234", preserved exactly',
          'A ValueError, because leading zeros are ambiguous',
          'A float, 1234.0',
        ],
        answerIndex: 0,
        explanation:
          'Inference sees digits and chooses int64, discarding the leading zero irrecoverably. Identifiers should always be read with an explicit `dtype={"zip": "string"}`, because they are labels rather than quantities.',
      },
      {
        id: 'PD-003-q2',
        type: 'multi',
        concept: 'read_csv options',
        prompt: 'Which `read_csv` arguments would you use for a semicolon-delimited file that writes missing values as "-" and has dates in DD/MM/YYYY? Select all that apply.',
        options: ['sep=";"', 'na_values=["-"]', 'dayfirst=True', 'header=None', 'engine="python"'],
        answerIndices: [0, 1, 2],
        explanation:
          '`sep` sets the delimiter, `na_values` adds the file-specific missing marker, and `dayfirst` resolves the date ambiguity. `header=None` would be wrong for a file that has a header row, and the Python engine is a slower fallback that is not needed here.',
      },
      {
        id: 'PD-003-q3',
        type: 'truefalse',
        concept: 'inspection',
        prompt: '`df.head()` is sufficient to confirm a file loaded correctly.',
        answer: false,
        explanation:
          'Files are usually sorted, so the first rows are the least representative. Pair `head` with `tail`, `sample`, `info` and `isna().sum()` — truncation, stray footer rows and missing-value clusters rarely appear at the top.',
      },
      {
        id: 'PD-003-q4',
        type: 'fill',
        concept: 'memory measurement',
        prompt: 'Which argument must you pass to `memory_usage` so that text columns report their real size rather than just pointer size?',
        answers: ['deep=True', 'deep', 'True', 'deep = True'],
        explanation:
          'Without `deep=True`, an `object` column reports 8 bytes per row for the pointers and hides the Python strings themselves, which can understate a text-heavy table by more than an order of magnitude.',
      },
      {
        id: 'PD-003-q5',
        type: 'order',
        concept: 'first-look checklist',
        prompt: 'Put the first-look checklist into a sensible order.',
        items: [
          'Read the first raw lines of the file to see the separator and header',
          'Load with explicit dtype, parse_dates and na_values',
          'Check shape and column names',
          'Inspect head, tail and a random sample',
          'Check dtypes and non-null counts with info()',
          'Check describe() and value_counts() for implausible values',
        ],
        explanation:
          'Structure before content: confirm the file parsed into the right shape and types before spending attention on what the values say. Looking at the raw text first is the step that saves the most time on awkward files.',
      },
      {
        id: 'PD-003-q6',
        type: 'explain',
        concept: 'explicit loading',
        prompt: 'Argue for writing explicit `read_csv` options even when the defaults appear to work.',
        rubric: [
          'Notes that inference is per-file and can change when the data changes',
          'Gives at least one concrete silent failure that explicitness prevents',
          'Connects the loader options to documentation or a schema contract',
        ],
        sampleAnswer:
          'Inference is a guess made from the particular file in front of it, so the same code can behave differently next month: add one "unknown" to a numeric column and the dtype silently becomes object, and every downstream calculation changes. Writing the options out makes the expectations explicit — this column is a string identifier, this one is a date, these markers mean missing — so a file that violates them fails at ingest instead of producing a plausible wrong answer. It also documents the file for the next reader, who otherwise has to reverse-engineer the schema from the data.',
        explanation:
          'The key insight is that inference is not a property of your code but of the data it happens to see, which makes it a poor foundation for anything that runs more than once.',
      },
    ],

    flashcards: [
      { front: 'Why read identifiers with `dtype="string"`?', back: 'Because inference reads digits as integers and destroys leading zeros; identifiers are labels, not quantities.' },
      { front: 'What does `na_values` do?', back: 'Adds file-specific strings to the set treated as missing, preventing one stray marker from forcing a numeric column to `object`.' },
      { front: 'Why use `sample()` as well as `head()`?', back: 'Files are usually sorted, so the first rows are unrepresentative. Sampling shows the variety in the middle of the table.' },
      { front: 'What does `deep=True` change in `memory_usage`?', back: 'It follows object pointers to measure the actual strings, instead of counting only 8 bytes per pointer.' },
      { front: 'Fastest way to shrink a low-cardinality text column?', back: 'Convert it to `category`: integer codes plus one stored copy of each distinct label.' },
      { front: 'What does `dayfirst=True` prevent?', back: 'Reading 03/04/2026 as 4 March when it means 3 April — a silent, month-scale error across the whole table.' },
    ],

    challenge: {
      title: 'A defensive loader',
      brief:
        'Write `load_orders(path)` that reads an orders CSV and returns a DataFrame you would be willing to build a model on. It must declare dtypes and date columns explicitly, add the file\'s missing markers, and then assert its own expectations: the row count is above zero, no column is entirely null, the amount column is numeric and non-negative, and the date range falls inside plausible bounds. Failures must raise with a message naming the column and the offending values.',
      language: 'python',
      acceptanceCriteria: [
        'All parsing is explicit — no reliance on dtype inference for identifiers or dates',
        'At least four distinct assertions about the loaded table',
        'Error messages name the column and show example bad values',
        'Returns a DataFrame with correct dtypes and a meaningful index',
      ],
      starterCode: 'import pandas as pd\n\n\ndef load_orders(path: str) -> pd.DataFrame:\n    df = pd.read_csv(\n        path,\n        dtype={"order_id": "string"},\n    )\n    return df\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me how to load a CSV I have never seen before and decide whether I can trust the result.',
      mustCover: [
        'A CSV is plain text with no type information, so pandas has to infer and can infer wrongly',
        'Key read_csv options: sep, dtype, parse_dates, na_values, usecols, index_col',
        'The inspection checklist: shape, head, tail, sample, info, isna, duplicated, describe, value_counts',
        'Why head() alone is not enough on sorted data',
      ],
      bonusSignals: ['mentions leading-zero identifiers', 'mentions ambiguous date order', 'mentions memory_usage(deep=True) and category dtype'],
      sampleExplanation:
        'A CSV is only text — rows of values separated by a character — and it carries no information about what those values mean, so pandas has to guess the types. It guesses well often enough to be dangerous, because a wrong guess produces a table that looks fine. So I load explicitly: tell it the separator, which columns are dates and in what order, which strings mean missing, and which columns are identifiers that must stay text so leading zeros survive. Then I look at the result rather than assuming. Shape tells me whether I got the rows I expected. Head and tail show whether the header was found and whether a summary line is stuck on the end. A random sample shows me the middle of the table, which matters because files are usually sorted and the first five rows all look alike. Then `info()` for the types and how many values are missing, `duplicated().sum()` in case the extract was loaded twice, and `describe()` plus `value_counts()` to see whether the numbers are plausible and the categories are spelled consistently. The whole thing takes under a minute and catches most of the problems that otherwise surface days later as a mysterious model.',
    },
  },

  {
    id: 'PD-004',
    domain: 'PD',
    module: 'Selection',
    topic: 'Label and position based selection',
    title: 'Selecting with loc and iloc',
    slug: 'loc-and-iloc',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['PD-002', 'PD-003'],
    related: ['PD-001'],
    tags: ['loc', 'iloc', 'at', 'iat', 'slicing', 'settingwithcopywarning', 'views'],

    learningObjectives: [
      'Select rows and columns by label with `loc` and by position with `iloc`, including the two-argument form',
      'Explain why `df.loc[2:5]` returns four rows while `df.iloc[2:5]` returns three',
      'Use `at` and `iat` for fast single-value access and say when they are worth using',
      'Explain what `SettingWithCopyWarning` actually detects, and write assignments that never trigger it',
    ],

    terminology: [
      {
        term: 'loc',
        definition:
          'Label-based selection: `df.loc[row_labels, column_labels]`. Slices are inclusive of both endpoints because a label has no arithmetic successor.',
        simple: 'Select by the names in the index and the column headers.',
      },
      {
        term: 'iloc',
        definition:
          'Position-based selection: `df.iloc[row_positions, column_positions]`, using 0-based integers with ordinary Python half-open slices.',
        simple: 'Select by row and column number, counting from zero.',
      },
      {
        term: 'at / iat',
        definition:
          'Scalar accessors that retrieve or set exactly one value by label (`at`) or position (`iat`), skipping the general indexing machinery.',
        simple: 'A fast path for reading or writing a single cell.',
      },
      {
        term: 'View versus copy',
        definition:
          'A view shares memory with the original object so writes propagate; a copy owns its data so writes do not. Which one an indexing operation returns has historically depended on dtype block layout.',
        simple: 'Whether you got a window onto the original data or a separate duplicate of it.',
      },
      {
        term: 'Chained indexing',
        definition:
          'Two consecutive indexing operations such as `df[mask]["col"] = x`, where the first produces a temporary object and the assignment targets that temporary rather than `df`.',
        simple: 'Selecting twice in a row, then assigning to the in-between result.',
      },
    ],

    simpleExplanation:
      "There are two completely different questions you can ask a table: \"give me the row labelled 1003\" and \"give me the third row\". Pandas keeps these separate on purpose, because the answers differ the moment you sort or filter anything. `loc` answers by label, using whatever is in the index and the column headers. `iloc` answers by position, counting from zero like ordinary Python. The confusion starts because a fresh DataFrame has an index of 0, 1, 2, 3, so labels and positions look identical — right up until you drop a row and the labels develop gaps while the positions close up. There is one more surprise worth learning deliberately: `iloc[2:5]` gives three rows, as Python slicing always does, but `loc[2:5]` gives four, because it includes the end label. That is not an inconsistency for its own sake. Labels can be strings or dates, and there is no way to compute \"the label just before this one\", so pandas includes the endpoint you named.",

    whyItExists:
      'A single bracket operator cannot serve both intentions: when the index holds integers, `df[2]` is genuinely ambiguous between "label 2" and "position 2", and guessing gives the wrong answer half the time. Separating `loc` from `iloc` makes the intention explicit at the call site, which is why the older ambiguous accessor `ix` was deprecated and then removed.',

    analogy: {
      scenario:
        'Imagine a hotel corridor. Room 301 is room 301 no matter how many rooms are shut for refurbishment, and if you ask for room 301 you get the same room every time. But "the third door on the left" depends entirely on which doors currently exist: close room 302 for repairs and the third door is now a different room, with a different guest inside. Both ways of referring to a room are legitimate; they simply answer different questions and stay correct under different circumstances.',
      mapping: [
        { from: 'Room number 301', to: 'An index label, used by `loc`' },
        { from: '"The third door on the left"', to: 'A zero-based position, used by `iloc`' },
        { from: 'Closing room 302 for repairs', to: 'Dropping or filtering a row, which shifts every later position but no labels' },
        { from: '"Rooms 301 to 305" including 305', to: '`loc` slicing, which is inclusive of the final label' },
        { from: '"Doors three through five" meaning three and four', to: '`iloc` slicing, which is half-open like all Python slices' },
      ],
      bridge:
        'The reason `loc` includes its endpoint falls straight out of the analogy: with room numbers you can say "up to and including 305", but you cannot meaningfully say "up to but not including 305" unless you know which room number comes just before it — and for string or date labels there is no such computation. Positions always have a predecessor, so `iloc` can and does use ordinary half-open slicing. After a filter, labels keep pointing at the same rows while positions silently renumber, which is exactly why label-based selection is the safer default in an analysis of any length.',
      limitations:
        'Hotel rooms have unique numbers. A pandas index may contain duplicates, in which case `df.loc["s1"]` returns every matching row rather than one, and an assignment through it touches all of them.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The same table, two ways of asking',
        caption: 'After a filter, labels and positions diverge — and only one of them still means what you think.',
        columns: ['index label', 'position', 'customer', 'amount', 'reached by loc[1004]', 'reached by iloc[2]'],
        rows: [
          ['1001', '0', 'Ada', '24.99', 'no', 'no'],
          ['1002', '1', 'Bo', '112.50', 'no', 'no'],
          ['1004', '2', 'Ada', '64.00', 'yes', 'yes'],
          ['1005', '3', 'Bo', '19.99', 'no', 'no'],
        ],
      },
      {
        kind: 'compare',
        title: 'loc versus iloc',
        caption: 'Choose by the question you are asking, not by which one you remember.',
        left: {
          heading: 'loc — by label',
          points: [
            'Uses index labels and column names',
            'Slices include BOTH endpoints: `loc["a":"c"]` gives a, b, c',
            'Accepts boolean masks — the normal way to filter',
            'Survives sorting and filtering, because labels do not move',
          ],
        },
        right: {
          heading: 'iloc — by position',
          points: [
            'Uses 0-based integers for rows and columns',
            'Slices are half-open: `iloc[0:2]` gives positions 0 and 1',
            'Rejects boolean Series; takes boolean arrays or integer lists',
            'Right for "first n rows", wrong for "this particular record"',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Why SettingWithCopyWarning appears',
        caption: 'The warning is about which object your assignment reached, not about style.',
        steps: [
          { label: 'You write df[df.amount > 50]["discount"] = 0.1', detail: 'Python evaluates this as two separate operations, left to right.' },
          { label: 'Step 1: df[df.amount > 50]', detail: 'Boolean selection builds a NEW DataFrame. It may or may not share memory with `df`.' },
          { label: 'Step 2: the assignment', detail: 'The write is applied to that temporary object, which has no other reference.' },
          { label: 'The temporary is discarded', detail: 'Nothing points at it after the statement, so it is garbage collected with your change inside it.' },
          { label: 'Pandas warns', detail: 'It cannot prove whether the write reached `df`, so it raises SettingWithCopyWarning rather than let you believe it worked.' },
          { label: 'The fix: one operation', detail: '`df.loc[df.amount > 50, "discount"] = 0.1` selects and assigns in a single indexing call on `df` itself.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Selection practice',
        caption: 'Try loc and iloc against the same table and compare what comes back.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      '`DataFrame.loc` is a label-based indexer accepting labels, label lists, label slices (closed on both endpoints) and boolean arrays along each axis. `DataFrame.iloc` is a positional indexer accepting integers, integer lists, half-open integer slices and boolean arrays. `at` and `iat` are the scalar-only equivalents, bypassing the general indexing path. Assignment is well defined only when the selection and the write occur within a single indexing call on the target object.',

    codeExamples: [
      {
        language: 'python',
        title: 'loc and iloc after a filter, where they stop agreeing',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "customer": ["Ada", "Bo", "Cleo", "Ada", "Bo"],
    "amount":   [24.99, 112.50, 8.75, 64.00, 19.99],
    "channel":  ["web", "app", "web", "web", "store"],
}, index=[1001, 1002, 1003, 1004, 1005])
orders.index.name = "order_id"

big = orders[orders["amount"] > 15]      # row 1003 is gone; labels keep their gaps
print(big)
print()
print("loc[1004]  ->", big.loc[1004, "customer"], big.loc[1004, "amount"])
print("iloc[2]    ->", big.iloc[2]["customer"], big.iloc[2]["amount"])
print()
print("loc[1002:1004] has", len(big.loc[1002:1004]), "rows")
print("iloc[1:3]      has", len(big.iloc[1:3]), "rows")`,
        output: `         customer  amount channel
order_id
1001          Ada   24.99     web
1002           Bo  112.50     app
1004          Ada   64.00     web
1005           Bo   19.99   store

loc[1004]  -> Ada 64.0
iloc[2]    -> Ada 64.0

loc[1002:1004] has 2 rows
iloc[1:3]      has 2 rows`,
        explanation:
          'After the filter, label 1004 sits at position 2 — the labels kept their gap where 1003 was removed while the positions closed up. Both accessors reach the same row here, but only by coincidence of this particular filter, and only `loc[1004]` will still reach Ada\'s order after the next sort. The slice comparison is the part to commit to memory: `loc[1002:1004]` returns every label from 1002 up to and including 1004, which in this filtered frame is 1002 and 1004, while `iloc[1:3]` returns positions 1 and 2, excluding 3 exactly as Python slicing always does. On the unfiltered frame the same `loc` slice would have returned three rows, because 1003 still existed.',
      },
      {
        language: 'python',
        title: 'Two-argument selection, and at/iat for single cells',
        runnable: true,
        code: `import pandas as pd

scores = pd.DataFrame({
    "maths":   [91, 78, 84, 65],
    "physics": [88, 71, 90, 70],
    "essay":   [75, 85, 69, 80],
}, index=["Ada", "Bo", "Cleo", "Dev"])

print(scores.loc["Bo":"Dev", ["maths", "essay"]])   # rows by label, columns by name
print()
print(scores.iloc[1:3, 0:2])                        # rows and columns by position
print()
print("single cell via loc:", scores.loc["Cleo", "physics"])
print("single cell via at :", scores.at["Cleo", "physics"])
print("single cell via iat:", scores.iat[2, 1])
print()
print(scores.loc[scores["maths"] > 80, "physics"])  # mask on rows, one column`,
        output: `      maths  essay
Bo       78     85
Cleo     84     69
Dev      65     80

      maths  physics
Bo       78       71
Cleo     84       90

single cell via loc: 90
single cell via at : 90
single cell via iat: 90

Ada     88
Cleo    90
Name: physics, dtype: int64`,
        explanation:
          'The two-argument form `df.loc[rows, cols]` is the one to reach for by default: it says exactly which rows and which columns you want in a single call, which is both clearer and safer than selecting twice. `loc["Bo":"Dev"]` includes Dev, while `iloc[1:3]` stops before position 3. `at` and `iat` do the same job as `loc` and `iloc` for exactly one cell, skipping the general machinery — perhaps five times faster per call, which matters only inside a loop you should probably not be writing. The final line is the workhorse pattern: a boolean mask selects rows and a name selects the column, in one indexing call.',
      },
      {
        language: 'python',
        title: 'SettingWithCopyWarning: what it means and how to avoid it',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "customer": ["Ada", "Bo", "Cleo", "Ada"],
    "amount":   [24.99, 112.50, 8.75, 64.00],
})

# --- The problem: two separate operations, chained ---
big = orders[orders["amount"] > 50]     # a NEW object, maybe a copy of part of orders
big["flagged"] = True                   # writing into that new object
# SettingWithCopyWarning: A value is trying to be set on a copy of a slice
#                        from a DataFrame. Try using .loc[row_indexer, col_indexer]
print("orders columns after chained write:", orders.columns.tolist())

# --- Fix 1: say you want an independent object ---
big = orders[orders["amount"] > 50].copy()
big["flagged"] = True                   # no warning: big owns its data
print(big)
print()

# --- Fix 2: if you meant to modify the original, do it in one call ---
orders.loc[orders["amount"] > 50, "flagged"] = True
print(orders)`,
        output: `orders columns after chained write: ['customer', 'amount']

  customer  amount  flagged
1       Bo  112.50     True
3      Ada   64.00     True

  customer  amount  flagged
0      Ada   24.99      NaN
1       Bo  112.50     True
2     Cleo    8.75      NaN
3      Ada   64.00     True`,
        explanation:
          'The warning is not stylistic advice; it is pandas telling you it cannot guarantee where your write went. `orders[mask]` produces a new object, and whether that object shares memory with `orders` has historically depended on the dtype block layout, so the same line could modify the original on one table and silently modify a temporary on another. Notice the printed columns: the chained write did not add `flagged` to `orders` at all. The two fixes correspond to the two possible intentions. If you wanted a separate working table, say so with `.copy()` and the ambiguity disappears. If you wanted to change the original, put the selection and the assignment in one `loc` call so pandas is operating on `orders` itself. Under the Copy-on-Write behaviour that becomes the default in pandas 3.0, chained assignment never propagates — which removes the ambiguity by making the silent-failure case the only case, so writing `loc` correctly matters more, not less.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Correcting known bad records',
        usage:
          'A data steward receives a list of order ids with wrong amounts. `df.loc[bad_ids, "amount"] = corrections` applies every fix by label in one aligned operation, immune to how the table happens to be sorted.',
      },
      {
        context: 'Train and test splits',
        usage:
          'Splitters return positional indices, so `X.iloc[train_idx]` is correct there, while joining predictions back to customers uses `loc` with the original index. Mixing the two up is a classic source of silently scrambled results.',
      },
      {
        context: 'Time-series windows',
        usage:
          'With a DatetimeIndex, `df.loc["2026-03-01":"2026-03-07"]` selects an inclusive week by label. Doing the same with positions would require knowing exactly how many rows that week contains, which changes with every gap in the data.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`loc` is the single most used accessor in real analysis code; nearly every cleaning step is a `loc` assignment.' },
      { tool: 'scikit-learn', role: 'Cross-validation splitters yield positional indices, which pair with `iloc`, while the surrounding pipeline keeps working by label.' },
      { tool: 'NumPy', role: 'Supplies the view-versus-copy semantics that `SettingWithCopyWarning` exists to protect you from.' },
    ],

    commonMistakes: [
      {
        mistake: 'Expecting `df.loc[0:5]` to return five rows',
        why: '`loc` slices are closed on both ends, so on a default index it returns six rows, labels 0 through 5 inclusive. The rule exists because arbitrary labels have no computable predecessor.',
        fix: 'Use `iloc[0:5]` when you mean "the first five rows". Reserve `loc` slicing for genuine label ranges such as dates.',
      },
      {
        mistake: 'Chained assignment: `df[df.a > 1]["b"] = 0`',
        why: 'The first operation creates a temporary object and the assignment writes into that temporary, so the change may never reach `df`. Pandas cannot prove which happened, so it warns.',
        fix: 'One call: `df.loc[df.a > 1, "b"] = 0`. If you wanted a separate table instead, take an explicit `.copy()` first.',
      },
      {
        mistake: 'Using `iloc` to refer to a specific record',
        why: 'Positions renumber after any drop, filter or sort, so `iloc[3]` refers to a different record than it did an hour ago, while the code still runs without error.',
        fix: 'Identify records by label. If the identifier lives in a column, `set_index("order_id")` first so `loc` can use it.',
      },
      {
        mistake: 'Passing a boolean Series to `iloc`',
        why: '`iloc` is positional and does not align on the index, so a boolean Series raises rather than filtering.',
        fix: 'Use `df.loc[mask]` for boolean selection, or `df.iloc[mask.to_numpy()]` when the positional form is genuinely what you want.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain the difference between `loc` and `iloc`, including their slicing behaviour.',
        answer:
          '`loc` selects by label — the values in the index and the column headers — while `iloc` selects by zero-based position. The behavioural difference that catches people is slicing: `loc["a":"c"]` includes "c" because both endpoints are closed, whereas `iloc[0:2]` excludes position 2 like every Python slice. The reason is that labels may be strings or dates, for which "the label immediately before c" is not computable, so pandas includes the endpoint you named. `loc` also accepts boolean masks, which is how filtering is normally written, and because labels do not move when rows are dropped or sorted, label-based selection is the safer default for anything beyond a quick look at the first few rows.',
        followUp:
          'A strong answer mentions that on a default RangeIndex labels and positions coincide, which is precisely why the distinction is confusing at first and dangerous later.',
      },
      {
        level: 'intermediate',
        question: 'What does `SettingWithCopyWarning` actually mean? Why is "just use .loc" an incomplete explanation?',
        answer:
          'The warning means you performed an assignment on an object that pandas obtained from another DataFrame by indexing, and it cannot determine whether that object is a view sharing memory with the original or an independent copy. In chained indexing such as `df[mask]["col"] = x`, Python evaluates the two operations separately: the first builds a temporary object and the assignment targets the temporary, so the write may never reach `df` at all, and historically it sometimes did and sometimes did not depending on the dtype block layout. "Use .loc" is the right fix for one of the two intentions, namely modifying the original in a single indexing call, but it is not an explanation, and it is the wrong fix if what you actually wanted was an independent subset — there the answer is `.copy()`. Knowing which intention you have is the real skill. Copy-on-Write, the default from pandas 3.0, resolves the ambiguity by guaranteeing that chained assignment never propagates.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you deliberately choose `iloc` over `loc` in production code?',
        answer:
          'When the operation is genuinely about position rather than identity. Cross-validation splitters from scikit-learn return positional indices, so `X.iloc[train_idx]` is correct and `X.loc[train_idx]` would either raise or, worse, silently select the wrong rows if the index happens to contain those integers as labels. Other legitimate cases are taking the first n rows of an already ordered table, sampling by position, and interoperating with code that thinks in NumPy terms. Everywhere else — corrections, joins, writing predictions back, selecting a date window — label-based access is safer, because a later sort or filter cannot invalidate it.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given `df` with index `["a", "b", "c", "d", "e"]`, how many rows does `df.loc["b":"d"]` return, and how many does `df.iloc[1:3]` return? Explain the difference.',
        hint: 'One of these two follows ordinary Python slicing rules and the other does not.',
        solution:
          '`df.loc["b":"d"]` returns three rows: b, c and d, because label slices include both endpoints. `df.iloc[1:3]` returns two rows, positions 1 and 2, because positional slices are half-open like all Python slices. The asymmetry is deliberate: there is no way to compute "the label just before d" for arbitrary labels such as strings or timestamps, so pandas includes the label you asked for rather than inventing a predecessor.',
      },
      {
        prompt:
          'This code produces a SettingWithCopyWarning and does not change `df`. Rewrite it twice: once so it modifies `df`, and once so it produces an independent flagged subset.\n\nlate = df[df["days_late"] > 0]\nlate["penalty"] = 25',
        hint: 'Which object did the write actually reach, and which object did you want it to reach?',
        solution:
          'To modify the original in one indexing call:\n\ndf.loc[df["days_late"] > 0, "penalty"] = 25\n\nTo build an independent subset:\n\nlate = df[df["days_late"] > 0].copy()\nlate["penalty"] = 25\n\nThe two forms are not interchangeable — they express different intentions. The warning appeared because the original code did neither: it wrote into a temporary object that nothing else referenced, so the change was discarded.',
      },
      {
        prompt:
          'You have a DataFrame of sensor readings indexed by timestamp. Write selections for: all readings on 12 March 2026; the first ten rows; and the temperature of the reading labelled 2026-03-12 09:00:00.',
        hint: 'Label range, positional range, single cell.',
        solution:
          'readings.loc["2026-03-12"] uses partial string indexing on a DatetimeIndex to select the whole day inclusively.\nreadings.iloc[:10] takes the first ten rows by position, which is what "first ten" means.\nreadings.at["2026-03-12 09:00:00", "temp_c"] fetches one cell by label on the fast scalar path.\n\nEach choice matches the question: a label range for a time window, positions for "the first n", and `at` for a single known cell.',
      },
    ],

    quiz: [
      {
        id: 'PD-004-q1',
        type: 'code-output',
        language: 'python',
        concept: 'loc slicing',
        prompt: 'How many rows does this print?',
        code: 'import pandas as pd\ndf = pd.DataFrame({"x": range(10)})\nprint(len(df.loc[2:5]))',
        options: ['4', '3', '5', '6'],
        answerIndex: 0,
        explanation:
          '`loc` slices include both endpoints, so labels 2, 3, 4 and 5 are returned — four rows. The positional equivalent `iloc[2:5]` would return three.',
      },
      {
        id: 'PD-004-q2',
        type: 'mcq',
        concept: 'settingwithcopywarning',
        prompt: 'What does SettingWithCopyWarning tell you?',
        options: [
          'Pandas cannot determine whether your assignment reached the original DataFrame or a temporary object',
          'Your DataFrame is too large to modify in place',
          'You used a deprecated method that will be removed',
          'The column you assigned to has the wrong dtype',
        ],
        answerIndex: 0,
        explanation:
          'Chained indexing evaluates as two separate operations, so the write targets an intermediate object that may or may not share memory with the original. The warning flags that ambiguity rather than any performance or deprecation concern.',
      },
      {
        id: 'PD-004-q3',
        type: 'truefalse',
        concept: 'iloc and booleans',
        prompt: '`df.iloc[df["amount"] > 50]` is a valid way to filter rows.',
        answer: false,
        explanation:
          '`iloc` is purely positional and does not align on the index, so a boolean Series is rejected. Use `df.loc[df["amount"] > 50]`, or pass a raw boolean array with `df.iloc[mask.to_numpy()]`.',
      },
      {
        id: 'PD-004-q4',
        type: 'match',
        concept: 'accessor selection',
        prompt: 'Match each task to the accessor that fits it best.',
        pairs: [
          { left: 'Select the row for order 1004', right: 'loc' },
          { left: 'Take the first 100 rows of an ordered table', right: 'iloc' },
          { left: 'Read one known cell in a tight loop', right: 'at' },
          { left: 'Read the cell at row 3, column 1 by position', right: 'iat' },
        ],
        explanation:
          'Labels identify records, positions describe ordering, and the scalar accessors are the fast path for exactly one value. Choosing by the question rather than by habit is what keeps selection correct after a sort.',
      },
      {
        id: 'PD-004-q5',
        type: 'debug',
        language: 'python',
        concept: 'chained assignment',
        prompt: 'This runs, warns, and leaves `df` unchanged. What is the correct single-call fix?',
        code: 'df[df["score"] < 50]["status"] = "fail"',
        options: [
          'df.loc[df["score"] < 50, "status"] = "fail"',
          'df[df["score"] < 50].loc["status"] = "fail"',
          'df.iloc[df["score"] < 50]["status"] = "fail"',
          'df["status"][df["score"] < 50] = "fail"',
        ],
        answerIndex: 0,
        explanation:
          'The fix is to select rows and column in one `loc` call on `df` itself, so the assignment has an unambiguous target. The other options are still chained, or pass a boolean Series to the positional accessor.',
      },
      {
        id: 'PD-004-q6',
        type: 'explain',
        concept: 'labels versus positions',
        prompt: 'Explain why `loc` slices are inclusive of their endpoint while `iloc` slices are not.',
        rubric: [
          'States that loc works with arbitrary labels and iloc with integer positions',
          'Explains that an arbitrary label has no computable predecessor, so an exclusive endpoint cannot be expressed',
          'Notes that positions always have a predecessor, so ordinary Python half-open slicing applies',
        ],
        sampleAnswer:
          'Positions are integers, so "up to but not including 5" is perfectly meaningful — position 4 is the one before it, and Python slices work this way everywhere. Labels are not necessarily numbers at all: with an index of customer names or timestamps, there is no way to compute the label immediately before "Dev" or before 2026-03-07 without inspecting the data. Pandas therefore takes the label you named as the last one included, which makes `loc["b":"d"]` return b, c and d. The rule is not an inconsistency but a consequence of labels being arbitrary.',
        explanation:
          'The examinable idea is that slice semantics follow from what the endpoint is, not from a stylistic decision by the library authors.',
      },
    ],

    flashcards: [
      { front: '`loc` versus `iloc` in one line', back: '`loc` selects by label, `iloc` by zero-based position.' },
      { front: 'How many rows does `df.loc[2:5]` return on a default index?', back: 'Four — labels 2, 3, 4 and 5. Label slices are inclusive of both endpoints.' },
      { front: 'What does `SettingWithCopyWarning` mean?', back: 'Pandas cannot tell whether your assignment reached the original frame or an intermediate temporary produced by chained indexing.' },
      { front: 'Two fixes for chained assignment', back: 'One `loc` call if you meant to modify the original; an explicit `.copy()` if you meant an independent subset.' },
      { front: 'When are `at` and `iat` worth using?', back: 'For a single cell on a hot path — they skip the general indexing machinery and are several times faster per call.' },
      { front: 'Why prefer labels for identifying records?', back: 'Positions renumber after any drop, filter or sort; labels keep pointing at the same row.' },
    ],

    challenge: {
      title: 'Apply a correction file without chained assignment',
      brief:
        'You are given an orders table indexed by `order_id` and a corrections Series listing corrected amounts by `order_id`. Apply every correction to the original table, report how many rows changed, and raise a clear error naming any correction whose order id does not exist. Your solution must not produce a SettingWithCopyWarning, must not use `iloc` anywhere, and must not loop over rows.',
      language: 'python',
      acceptanceCriteria: [
        'Corrections are applied by label in a single `loc` assignment',
        'Unknown order ids are detected and reported, not silently ignored',
        'The number of changed rows is computed and printed',
        'Runs cleanly with warnings turned into errors',
      ],
      starterCode:
        'import pandas as pd\n\norders = pd.DataFrame(\n    {"customer": ["Ada", "Bo", "Cleo"], "amount": [24.99, 112.50, 8.75]},\n    index=pd.Index([1001, 1002, 1003], name="order_id"),\n)\ncorrections = pd.Series({1002: 99.00, 1003: 10.00}, name="amount")\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me `loc` and `iloc`, then explain what SettingWithCopyWarning is really telling me.',
      mustCover: [
        '`loc` selects by label, `iloc` by zero-based position',
        'Label slices include both endpoints; positional slices do not',
        'Labels survive filtering and sorting while positions renumber',
        'SettingWithCopyWarning means pandas cannot tell whether the write reached the original object',
      ],
      bonusSignals: ['explains why label slices are inclusive', 'distinguishes the two intentions behind the warning', 'mentions at/iat for single cells'],
      sampleExplanation:
        'There are two ways to point at a row, and pandas keeps them apart deliberately. `loc` uses the labels in the index, so `loc[1004]` means the row whose identifier is 1004, wherever it currently sits. `iloc` uses position, so `iloc[2]` means the third row, whatever is in it now. On a fresh table the two look identical because the labels are 0, 1, 2, but drop a row and the labels keep their gap while the positions close up. One quirk is worth learning on purpose: `loc["b":"d"]` includes d, while `iloc[1:3]` stops before position 3. That is because you can always name the integer before a position, but there is no way to compute the label before an arbitrary string or date. As for SettingWithCopyWarning: when you write `df[mask]["col"] = value`, Python does two separate things — it builds a temporary table from the mask, then writes into that temporary. Pandas cannot prove whether the temporary shares memory with your original, so it warns rather than let you assume the change landed. Usually it did not. If you meant to change the original, do it in one call with `df.loc[mask, "col"] = value`. If you meant to work on a separate copy, say `.copy()` out loud and the ambiguity is gone.',
    },
  },
  {
    id: 'PD-005',
    domain: 'PD',
    module: 'Selection',
    topic: 'Filtering and sorting',
    title: 'Filtering, Sorting and Querying',
    slug: 'filtering-sorting-querying',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['PD-004'],
    related: ['PD-003'],
    tags: ['boolean-mask', 'query', 'isin', 'between', 'sort_values', 'operator-precedence'],

    learningObjectives: [
      'Build boolean masks and use them to select rows, understanding that a mask is itself an aligned Series',
      'Combine conditions with `&`, `|` and `~`, and explain why each condition must be parenthesised',
      'Use `isin`, `between`, `str.contains` and `query` to express filters that would otherwise be unreadable',
      'Sort with `sort_values` using multiple keys, control `ascending`, `na_position` and stability, and know when to use `nlargest`',
    ],

    terminology: [
      {
        term: 'Boolean mask',
        definition:
          'A Series of True/False values sharing the index of the frame being filtered. Indexing with it keeps exactly the rows whose label maps to True.',
        simple: 'A yes/no list, one entry per row, saying which rows to keep.',
      },
      {
        term: 'Element-wise operators',
        definition:
          '`&`, `|` and `~` combine boolean Series element by element. Python\'s `and`, `or` and `not` demand a single truth value and therefore raise on a Series.',
        simple: 'The symbols that combine two yes/no lists row by row.',
      },
      {
        term: 'Operator precedence',
        definition:
          'In Python `&` binds more tightly than `>` or `==`, so an unparenthesised `a > 1 & b < 2` is parsed as `a > (1 & b) < 2`.',
        simple: 'The rule about which part of an expression happens first.',
      },
      {
        term: 'query',
        definition:
          'A method that evaluates a filter written as a string against the frame\'s columns, resolving names directly and `@name` for Python variables.',
        simple: 'Writing the filter as a sentence instead of as brackets.',
      },
      {
        term: 'Stable sort',
        definition:
          'A sort that preserves the relative order of rows with equal keys. `sort_values` is stable when `kind="stable"` or `"mergesort"`; the default quicksort is not.',
        simple: 'A sort that does not shuffle rows that tie.',
      },
    ],

    simpleExplanation:
      "Filtering in pandas works in two steps, and seeing them separately makes everything easier. First you ask a question of every row at once: `orders[\"amount\"] > 50` does not return the big orders — it returns a column of True and False, one per row, with the same labels as the table. Then you hand that column back to the table, and pandas keeps the rows marked True. That is all a filter is. Once you see masks as ordinary values, you can combine them: `&` means both, `|` means either, `~` means not. The one rule you must never forget is that every condition needs its own brackets, because Python decided long ago that `&` binds more tightly than `>`, so without them your expression means something entirely different and usually raises a confusing error. Sorting is the other half of this lesson: `sort_values` reorders rows by one or several columns, and because it returns a new table rather than changing the old one, you have to assign the result.",

    whyItExists:
      'Almost every question asked of data is a subset question: which orders, which customers, which readings. Writing that as a loop is slow and verbose, and writing it as a hand-rolled index list is error-prone. Boolean masks express the condition once, evaluate it in compiled code over the whole column, and stay aligned to the index so a filtered row can never be paired with another row\'s data.',

    analogy: {
      scenario:
        'Picture a long questionnaire handed to every person in a room at once, with a single yes/no question on it: "did you spend more than fifty pounds?" Everybody answers simultaneously and hands the slip back with their name on it. You now hold a stack of yes/no slips, one per person, and you have not yet selected anybody. Selecting happens when you walk the room and admit only the people whose slip says yes. If you have two questions, you collect two stacks and compare them slip by slip, admitting people who said yes on both.',
      mapping: [
        { from: 'The yes/no question asked of everyone at once', to: 'A vectorised comparison such as `df["amount"] > 50`' },
        { from: 'The stack of slips, each carrying a name', to: 'The boolean Series, aligned to the index' },
        { from: 'Admitting only the people whose slip says yes', to: '`df[mask]` or `df.loc[mask]`' },
        { from: 'Comparing two stacks slip by slip', to: '`mask_a & mask_b`, combined element-wise' },
        { from: 'Trying to answer "is this whole stack yes?"', to: 'Using `and` instead of `&`, which raises "The truth value of a Series is ambiguous"' },
      ],
      bridge:
        'The two-step picture explains the error message beginners meet most often. Python\'s `and` needs to reduce each side to a single True or False so it can decide whether to evaluate the second operand at all, and a stack of a thousand slips has no single answer — hence "The truth value of a Series is ambiguous". The `&` operator makes no such demand; it compares the stacks slip by slip and hands back a new stack. The name on each slip is the index label, which is why a mask built from one frame and applied to another aligns by label rather than by row order.',
      limitations:
        'The analogy suggests every slip has an answer. Comparisons involving NaN return False rather than a missing answer, so rows with missing values are silently excluded by both a condition and its apparent negation — a genuine trap that the analogy hides.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What `df[df["amount"] > 50]` really does',
        caption: 'One expression, three distinct stages.',
        steps: [
          { label: 'Select the column', detail: '`df["amount"]` gives a Series of amounts with the frame\'s index.' },
          { label: 'Compare, element-wise', detail: '`> 50` runs in compiled code and returns a boolean Series of the same length and index.' },
          { label: 'Index with the mask', detail: '`df[...]` keeps the rows whose label maps to True, in their original order.' },
          { label: 'A new frame is returned', detail: 'The original is untouched; assign the result if you want to keep it.' },
        ],
      },
      {
        kind: 'table',
        title: 'Filter idioms and when to reach for each',
        columns: ['Goal', 'Idiom', 'Note'],
        rows: [
          ['One condition', 'df[df["amount"] > 50]', 'The base case; `loc` form is equivalent and safer for assignment'],
          ['Two conditions, both', 'df[(df["a"] > 1) & (df["b"] == "x")]', 'Brackets around each condition are mandatory'],
          ['Either condition', 'df[(df["a"] > 1) | (df["b"] == "x")]', '`|`, never `or`'],
          ['Negation', 'df[~df["active"]]', '`~` on a boolean Series; `not` raises'],
          ['Value in a set', 'df[df["channel"].isin(["web", "app"])]', 'Far clearer than chained `|` comparisons'],
          ['Numeric range', 'df[df["score"].between(60, 80)]', 'Inclusive on both ends by default'],
          ['Text contains', 'df[df["notes"].str.contains("gift", na=False)]', '`na=False` is required or NaN rows raise'],
          ['Readable multi-condition', 'df.query("amount > 50 and channel == \'web\'")', 'Uses `and`/`or` words; `@var` refers to Python variables'],
          ['Top n by a column', 'df.nlargest(5, "amount")', 'Cheaper and clearer than sorting the whole frame'],
        ],
      },
      {
        kind: 'compare',
        title: 'Bracket masks versus query',
        left: {
          heading: 'Boolean masks',
          points: [
            'Ordinary Python, so linters and type checkers see it',
            'Masks are values: name them, reuse them, combine them',
            'Verbose when the frame name is long',
            'The only form that works for assignment via `loc`',
          ],
        },
        right: {
          heading: 'df.query("...")',
          points: [
            'Reads like a sentence; no repetition of the frame name',
            'Uses `and`, `or`, `not` and `in` as words',
            '`@threshold` pulls in a Python variable',
            'A string, so typos surface at run time and column names with spaces need backticks',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Filter and sort interactively',
        caption: 'Build masks, combine them and watch the row count change.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      'Boolean selection indexes a DataFrame with a boolean array or index-aligned boolean Series, returning the rows whose corresponding entry is True in their existing order. Conditions compose through the element-wise operators `&`, `|` and `~`, which bind more tightly than the comparison operators and therefore require explicit parenthesisation. `sort_values` returns a reordered copy keyed on one or more columns, with configurable per-key direction, missing-value placement and sort stability.',

    codeExamples: [
      {
        language: 'python',
        title: 'Masks are values, and brackets are not optional',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "customer": ["Ada", "Bo", "Cleo", "Ada", "Bo", "Dev"],
    "amount":   [24.99, 112.50, 8.75, 64.00, 19.99, 250.00],
    "channel":  ["web", "app", "web", "web", "store", "app"],
    "refunded": [False, False, True, False, False, True],
})

is_big = orders["amount"] > 50          # a Series, not a selection
print(is_big)
print()

# Both conditions: each one parenthesised
big_web = orders[(orders["amount"] > 50) & (orders["channel"] == "web")]
print(big_web)
print()

# Negation with ~, and reusing a named mask
print(orders[is_big & ~orders["refunded"]][["customer", "amount"]])`,
        output: `0    False
1     True
2    False
3     True
4    False
5     True
Name: amount, dtype: bool

  customer  amount channel  refunded
3      Ada    64.0     web     False

  customer  amount
1       Bo  112.50
3      Ada   64.00`,
        explanation:
          'The first print shows what a comparison actually returns: a boolean Series carrying the frame\'s index, which you can name, store and reuse exactly like any other value. The brackets around each condition are mandatory because `&` has higher precedence than `>` in Python, so `orders["amount"] > 50 & orders["channel"] == "web"` is parsed as `orders["amount"] > (50 & orders["channel"]) == "web"` and fails with a TypeError about unsupported operand types. Writing `and` instead of `&` fails differently, with "The truth value of a Series is ambiguous", because `and` needs one True or False per side and a Series of six values cannot supply it.',
      },
      {
        language: 'python',
        title: 'isin, between, str.contains and query',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "customer": ["Ada", "Bo", "Cleo", "Ada", "Bo", "Dev"],
    "amount":   [24.99, 112.50, 8.75, 64.00, 19.99, 250.00],
    "channel":  ["web", "app", "web", "web", "store", "app"],
    "notes":    ["", "gift wrap", "damaged", "gift receipt", "", None],
})

vip = ["Ada", "Dev"]

print(orders[orders["channel"].isin(["web", "app"])]["channel"].tolist())
print(orders[orders["amount"].between(20, 100)]["amount"].tolist())
print(orders[orders["notes"].str.contains("gift", na=False)]["customer"].tolist())
print()

threshold = 50
print(orders.query("amount > @threshold and channel == 'app'"))
print()
print(orders.query("customer in @vip")[["customer", "amount"]])`,
        output: `['web', 'app', 'web', 'web', 'app']
[24.99, 64.0]
['Bo', 'Ada']

  customer  amount channel      notes
1       Bo   112.5     app  gift wrap
5      Dev   250.0     app       None

  customer  amount
0      Ada   24.99
3      Ada   64.00
5      Dev  250.00`,
        explanation:
          '`isin` replaces a chain of `|` comparisons and reads far better when the list is long or comes from a variable. `between(20, 100)` is inclusive at both ends by default, which is `inclusive="both"`; pass `inclusive="left"` or `"neither"` when you need otherwise. `str.contains` needs `na=False`, because the comparison on a missing note returns NaN and indexing with a mask containing NaN raises "Cannot mask with non-boolean array containing NA / NaN values". `query` is the readable alternative for compound conditions: it uses `and`, `or` and `in` as words, resolves bare names as columns, and reaches Python variables through `@`.',
      },
      {
        language: 'python',
        title: 'Sorting: multiple keys, direction, missing values and stability',
        runnable: true,
        code: `import pandas as pd
import numpy as np

sales = pd.DataFrame({
    "region": ["north", "south", "north", "south", "north"],
    "rep":    ["Ada", "Bo", "Cleo", "Dev", "Eve"],
    "revenue":[5000, 7200, 5000, np.nan, 3100],
})

print(sales.sort_values(["region", "revenue"], ascending=[True, False]))
print()
print(sales.sort_values("revenue", na_position="first"))
print()
print(sales.nlargest(2, "revenue"))
print()
print("original order is untouched:", sales["rep"].tolist())`,
        output: `  region  rep  revenue
0  north  Ada   5000.0
2  north Cleo   5000.0
4  north  Eve   3100.0
1  south   Bo   7200.0
3  south  Dev      NaN

  region  rep  revenue
3  south  Dev      NaN
4  north  Eve   3100.0
0  north  Ada   5000.0
2  north Cleo   5000.0
1  south   Bo   7200.0

  region  rep  revenue
1  south   Bo   7200.0
0  north  Ada   5000.0

original order is untouched: ['Ada', 'Bo', 'Cleo', 'Dev', 'Eve']`,
        explanation:
          'Passing a list of columns sorts by the first, then breaks ties with the second, and `ascending` takes a matching list so each key can have its own direction. Missing values go last by default regardless of direction — `na_position="first"` overrides that, and being explicit matters because a silently trailing block of NaN can look like the bottom of a ranking. `nlargest(2, "revenue")` answers "top two" directly and skips missing values, which is both faster and clearer than sorting the entire frame to read two rows off the end. Note the final line: sorting returned a new frame and left `sales` in its original order. When ties must retain their original sequence, pass `kind="stable"`.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Cohort analysis',
        usage:
          'Selecting "customers who signed up in Q1 and made at least two purchases" is a compound mask. Naming each condition — `signed_q1`, `repeat_buyer` — then combining them makes the definition of the cohort auditable rather than buried in one long bracket.',
      },
      {
        context: 'Filtering a training set',
        usage:
          'Removing rows with impossible sensor values before training is a `loc` filter. Keeping the mask as a named variable lets you report how many rows it removed, which belongs in every pipeline log.',
      },
      {
        context: 'Leaderboards and top-n reports',
        usage:
          '`nlargest(10, "revenue")` produces the weekly top-ten table directly. On a 50-million-row frame it avoids a full sort, which is a substantial saving for a report that runs hourly.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: 'Boolean masks are the shared vocabulary of filtering, `loc` assignment, `where`, `mask` and `groupby` filtering.' },
      { tool: 'NumPy', role: 'The mask is a NumPy boolean array underneath, which is why `&` and `|` are the operators and `and`/`or` are not.' },
      { tool: 'SQL', role: '`query` is deliberately close to a WHERE clause, and thinking in predicates transfers directly between the two.' },
    ],

    commonMistakes: [
      {
        mistake: 'Omitting brackets: `df[df.a > 1 & df.b < 2]`',
        why: '`&` binds tighter than `>` and `<` in Python, so this is parsed as `df.a > (1 & df.b) < 2`, which raises a TypeError or, with integer columns, computes something meaningless.',
        fix: 'Parenthesise every condition: `df[(df.a > 1) & (df.b < 2)]`. Making each mask a named variable avoids the problem entirely.',
      },
      {
        mistake: 'Using `and` / `or` / `not` with Series',
        why: 'Those operators require a single truth value per operand so they can short-circuit, and a Series of many values cannot provide one — hence "The truth value of a Series is ambiguous".',
        fix: 'Use `&`, `|` and `~` for element-wise logic, or switch to `df.query("a > 1 and b < 2")`, where the words are evaluated by the query engine.',
      },
      {
        mistake: 'Forgetting that comparisons with NaN are always False',
        why: 'A row with a missing amount satisfies neither `amount > 50` nor `amount <= 50`, so it disappears from both halves of a supposedly exhaustive split and the two subsets no longer sum to the original.',
        fix: 'Check `df["amount"].isna().sum()` before splitting, and handle missing values explicitly rather than letting the comparison decide silently.',
      },
      {
        mistake: 'Assuming `sort_values` changed the DataFrame',
        why: 'It returns a new frame. Without reassignment the original order is unchanged, and the next operation runs on unsorted data while the code looks correct.',
        fix: 'Assign the result: `df = df.sort_values("amount")`, or chain it into the next operation.',
      },
      {
        mistake: 'Using `str.contains` without `na=False`',
        why: 'On rows where the text is missing, the result is NaN, and indexing with a mask that contains NaN raises "Cannot mask with non-boolean array containing NA / NaN values".',
        fix: 'Pass `na=False` to treat missing text as not matching, and consider `regex=False` when searching for a literal substring.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why must each condition be parenthesised in `df[(df.a > 1) & (df.b < 2)]`?',
        answer:
          'Because of Python operator precedence: the bitwise `&` binds more tightly than the comparison operators, so without brackets the expression is parsed as `df.a > (1 & df.b) < 2`. That either raises a TypeError about unsupported operand types or, on integer columns, silently computes a bitwise AND of 1 with the column and compares against it, producing a mask that is wrong rather than an error. Pandas cannot change this — precedence is fixed by the language — so the brackets are a permanent requirement. The related trap is using `and` instead of `&`, which raises "The truth value of a Series is ambiguous" because `and` needs each side to reduce to a single boolean.',
      },
      {
        level: 'intermediate',
        question: 'You split a frame into `df[df.score > 50]` and `df[df.score <= 50]` and the two parts do not sum to the original row count. What happened?',
        answer:
          'Rows where `score` is NaN. Comparisons with a missing value return False rather than propagating, so such rows satisfy neither condition and vanish from both halves. The split is therefore not exhaustive despite looking like it. The correct approach is to be explicit: check `df["score"].isna().sum()` first, then decide whether missing scores form a third group, should be dropped with a logged count, or indicate an upstream problem worth fixing. The general lesson is that in pandas a two-way split on a nullable column is really a three-way split, and pretending otherwise loses rows silently.',
        followUp:
          'A strong answer mentions that `df.score.gt(50)` behaves the same way, and that pandas nullable dtypes propagate NA in comparisons rather than returning False, which changes this behaviour.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you use `query` rather than boolean masks, and what are its drawbacks?',
        answer:
          '`query` is worth it when a filter has several conditions and the frame name is long, because it removes the repetition and reads like a sentence: `df.query("amount > @threshold and channel == \'web\' and not refunded")`. It also accepts `in` and parses numeric expressions, and on very large frames it can use numexpr to evaluate without materialising every intermediate mask. The drawbacks are real: the filter is a string, so mistakes surface only at run time and static tooling cannot check it; column names with spaces or reserved words need backticks; referring to Python variables requires the `@` prefix; and you cannot use the result for a `loc` assignment, since `query` returns a new frame. In production code I tend to name the masks as variables, which gives readability and inspectability at once.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write a filter for orders that are above 100, placed on the web channel, and not refunded. Write it twice: once with masks and once with `query`.',
        hint: 'Three conditions, each parenthesised in the mask version; words instead of symbols in the query version.',
        solution:
          'Mask form:\n\nbig = orders["amount"] > 100\nweb = orders["channel"] == "web"\nkept = orders[big & web & ~orders["refunded"]]\n\nQuery form:\n\norders.query("amount > 100 and channel == \'web\' and not refunded")\n\nNaming the masks pays off as soon as you want to report how many rows each condition removed, which is exactly what you want in a pipeline log.',
      },
      {
        prompt:
          'Explain what this raises and why:\n\n```\ndf[df["age"] > 18 and df["country"] == "UK"]\n```',
        hint: 'What does `and` need from each of its operands?',
        solution:
          'It raises `ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all()`. Python\'s `and` short-circuits, so it must reduce its left operand to a single True or False to decide whether to evaluate the right one; a Series of many booleans has no single truth value. The fix is the element-wise operator with brackets: `df[(df["age"] > 18) & (df["country"] == "UK")]`, or `df.query("age > 18 and country == \'UK\'")`, where the query engine interprets the word rather than Python.',
      },
      {
        prompt:
          'Sort a sales table by region ascending and revenue descending, putting rows with missing revenue first, and explain why you would ever want them first.',
        hint: 'Two arguments control direction and missing-value placement independently.',
        solution:
          'sales.sort_values(["region", "revenue"], ascending=[True, False], na_position="first")\n\nYou want missing values first when the point of the sort is to find and fix them: they sit at the top of the printed frame where you will actually look, rather than trailing off the bottom of a long table. For a report intended for a reader, the opposite is usually right, and the default `na_position="last"` applies. Being explicit either way stops a block of NaN from being mistaken for the bottom of a genuine ranking.',
      },
    ],

    quiz: [
      {
        id: 'PD-005-q1',
        type: 'debug',
        language: 'python',
        concept: 'operator precedence',
        prompt: 'Why does this raise a TypeError, and what is the fix?',
        code: 'df[df["a"] > 1 & df["b"] < 2]',
        options: [
          '`&` binds tighter than the comparisons, so brackets are needed around each condition',
          '`df["a"]` should be `df.a` when combining conditions',
          'Pandas requires `np.logical_and` for two conditions',
          'The columns must be the same dtype before they can be combined',
        ],
        answerIndex: 0,
        explanation:
          'Python parses this as `df["a"] > (1 & df["b"]) < 2`. The fix is `df[(df["a"] > 1) & (df["b"] < 2)]` — brackets are mandatory around each comparison because precedence is fixed by the language.',
      },
      {
        id: 'PD-005-q2',
        type: 'mcq',
        concept: 'boolean masks',
        prompt: 'What does `df["amount"] > 50` return on its own?',
        options: [
          'A boolean Series with the same index as df',
          'A filtered DataFrame containing only the large orders',
          'A list of row positions where the condition holds',
          'A single True or False for the whole column',
        ],
        answerIndex: 0,
        explanation:
          'The comparison is vectorised and returns one boolean per row, aligned to the index. Filtering happens only when you index the frame with that mask, which is why masks can be named, stored and combined.',
      },
      {
        id: 'PD-005-q3',
        type: 'truefalse',
        concept: 'missing values in comparisons',
        prompt: 'A row whose `score` is NaN appears in exactly one of `df[df.score > 50]` and `df[df.score <= 50]`.',
        answer: false,
        explanation:
          'It appears in neither. Comparisons with NaN evaluate to False, so such rows fall out of both halves and the two subsets do not sum to the original row count — a silent way to lose data.',
      },
      {
        id: 'PD-005-q4',
        type: 'code-output',
        language: 'python',
        concept: 'between',
        prompt: 'How many rows does this select?',
        code: 'import pandas as pd\ndf = pd.DataFrame({"s": [10, 20, 30, 40, 50]})\nprint(len(df[df["s"].between(20, 40)]))',
        options: ['3', '2', '1', '5'],
        answerIndex: 0,
        explanation:
          '`between` is inclusive at both ends by default, so 20, 30 and 40 all qualify. Use `inclusive="neither"` or `"left"` when you need an open bound.',
      },
      {
        id: 'PD-005-q5',
        type: 'multi',
        concept: 'filter idioms',
        prompt: 'Which of these select the rows where `channel` is "web" or "app"? Select all that apply.',
        options: [
          'df[df["channel"].isin(["web", "app"])]',
          'df[(df["channel"] == "web") | (df["channel"] == "app")]',
          'df.query("channel in [\'web\', \'app\']")',
          'df[df["channel"] == "web" or df["channel"] == "app"]',
          'df[df["channel"] == ["web", "app"]]',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          '`isin`, the parenthesised `|` form and the `query` form are all correct. The fourth uses `or` on Series and raises an ambiguity error, and the fifth compares against a list of the wrong length and raises a ValueError.',
      },
      {
        id: 'PD-005-q6',
        type: 'explain',
        concept: 'masks as values',
        prompt: 'Explain the advantage of writing `big = df["amount"] > 100` on its own line rather than inlining the condition inside the brackets.',
        rubric: [
          'Recognises that the mask is an ordinary value that can be named and reused',
          'Mentions that named masks can be counted or logged, e.g. `big.sum()`',
          'Notes that naming avoids precedence mistakes and improves readability of compound filters',
        ],
        sampleAnswer:
          'The condition is just a Series, so giving it a name costs nothing and buys several things. You can report how many rows it matches with `big.sum()`, which is exactly what belongs in a pipeline log when a filter removes data. You can reuse it in several places without re-evaluating or re-typing it, so the definition of "big" exists in one spot and can be corrected in one spot. Compound filters become readable — `df[big & web & ~refunded]` states the business rule directly — and because each mask is built in its own statement, the precedence trap with unparenthesised conditions cannot arise.',
        explanation:
          'The underlying idea is that filtering is composition of ordinary values, not special syntax, which is what makes complex selection maintainable.',
      },
    ],

    flashcards: [
      { front: 'What does a comparison on a column return?', back: 'A boolean Series aligned to the index — the mask. Filtering happens when you index the frame with it.' },
      { front: 'Why `&` and not `and`?', back: '`and` needs one truth value per side and a Series has many, so it raises "The truth value of a Series is ambiguous". `&` combines element-wise.' },
      { front: 'Why are brackets mandatory around each condition?', back: '`&` binds tighter than `>` and `==`, so without them Python parses the expression completely differently.' },
      { front: 'What happens to NaN rows in a comparison?', back: 'The comparison returns False, so they are excluded by both a condition and its apparent negation.' },
      { front: 'What does `str.contains` need on a column with missing text?', back: '`na=False`, otherwise the mask contains NaN and indexing with it raises.' },
      { front: 'Cheapest way to get the top five by a column?', back: '`df.nlargest(5, "col")` — no full sort, and missing values are skipped.' },
    ],

    challenge: {
      title: 'An auditable filter chain',
      brief:
        'Write `select_cohort(df, min_amount, channels, since)` that applies three filters to an orders table and returns both the filtered frame and a report of how many rows each individual condition removed, in order. The report must make it obvious which condition was responsible for most of the loss, and the function must not mutate the input.',
      language: 'python',
      acceptanceCriteria: [
        'Each condition is a named boolean mask, counted before being combined',
        'Returns both the filtered frame and a per-condition row-count report',
        'Handles missing values in the filtered columns explicitly rather than letting comparisons drop them silently',
        'The input DataFrame is unchanged after the call',
      ],
      starterCode:
        'import pandas as pd\n\n\ndef select_cohort(df: pd.DataFrame, min_amount: float, channels: list[str], since: str):\n    big = df["amount"] >= min_amount\n    return df[big], {"min_amount": int((~big).sum())}\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me how to filter a DataFrame, and explain the two error messages I am going to hit first.',
      mustCover: [
        'A comparison produces a boolean Series aligned to the index; filtering is indexing with it',
        'Conditions combine with `&`, `|` and `~`, each parenthesised',
        'Why `and` raises the ambiguous-truth-value error',
        '`sort_values` returns a new frame and must be assigned',
      ],
      bonusSignals: ['mentions isin/between/query as readability tools', 'mentions that NaN comparisons are False', 'names masks as variables'],
      sampleExplanation:
        'Filtering is two steps that people tend to blur into one. When you write `df["amount"] > 50`, nothing is filtered yet — you get back a column of True and False, one per row, carrying the same labels as the table. Only when you put that column inside `df[...]` does pandas keep the True rows. Because the mask is just a value, you can name it, count it and combine it. To combine, use `&` for both and `|` for either, and put brackets around each condition: `&` binds tighter than `>` in Python, so without them the expression means something else entirely and you will get a TypeError. The other error you will hit is using the word `and`, which gives "The truth value of a Series is ambiguous" — `and` wants one yes or no from each side so it can decide whether to bother evaluating the second, and a thousand-row column cannot give it one. Finally, sorting: `sort_values` hands you back a new sorted table and leaves the original alone, so assign the result, and remember missing values go to the bottom by default whichever direction you sort in.',
    },
  },

  {
    id: 'PD-006',
    domain: 'PD',
    module: 'Cleaning',
    topic: 'Missing data',
    title: 'Missing Values',
    slug: 'missing-values',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['PD-003', 'PD-005'],
    related: ['PD-004'],
    tags: ['nan', 'none', 'nat', 'isna', 'dropna', 'fillna', 'imputation', 'missingness'],

    learningObjectives: [
      'Distinguish NaN, None and NaT, and explain why `np.nan == np.nan` is False',
      'Profile missingness per column and per row, and read a missingness pattern rather than just a count',
      'Choose between dropping, filling, forward-filling and flagging, and justify the choice',
      'Explain when imputation is the wrong answer, and how imputing on the full dataset leaks information into a model',
    ],

    terminology: [
      {
        term: 'NaN',
        definition:
          'Not a Number: the IEEE-754 floating point value pandas uses as its default missing marker in float columns. It is not equal to itself, which is why `isna` exists.',
        simple: 'The "no value here" marker in a column of numbers.',
      },
      {
        term: 'None versus NaT',
        definition:
          '`None` is the Python null object, stored directly in `object` columns; `NaT` is the missing value for datetime and timedelta columns. `isna` recognises all three.',
        simple: 'The "no value" markers for text and for dates.',
      },
      {
        term: 'Missingness mechanism',
        definition:
          'Why values are missing: completely at random, at random given observed variables, or not at random, where the missingness depends on the unobserved value itself.',
        simple: 'The reason the value is absent, which decides what you may safely do about it.',
      },
      {
        term: 'Imputation',
        definition:
          'Replacing missing values with estimates — a constant, a column statistic, a group statistic or a model prediction — so that downstream code can proceed.',
        simple: 'Filling the gaps with a sensible guess.',
      },
      {
        term: 'Data leakage',
        definition:
          'Information from outside the training fold influencing the model, such as an imputation mean computed over the whole dataset including the test rows.',
        simple: 'Letting the model peek at data it should not have seen yet.',
      },
    ],

    simpleExplanation:
      "Real data has holes. The sensor was offline, the customer skipped the field, the join found no match. Pandas marks these holes with NaN for numbers, NaT for dates and None for text, and the first thing to understand is that a hole is not a zero and not an empty string — it is the absence of information. NaN behaves strangely on purpose: it is not equal to itself, so `x == np.nan` is always False and you must use `isna()` to find holes. The second thing, which matters far more, is that you cannot decide what to do about a hole until you know why it is there. If a temperature is missing because the sensor rebooted, taking the previous reading is reasonable. If income is missing because high earners decline to answer, filling with the average makes your data systematically wrong and your conclusions confidently false. The mean is not a neutral choice; it is a claim about the world. Sometimes the honest answer is to leave the hole, flag it as a feature in its own right, and let the model handle it.",

    whyItExists:
      'Every real dataset has gaps, and a numeric array has no way to say "unknown" without a dedicated marker. Pandas adopts NaN, NaT and None so that gaps survive arithmetic, aggregation and joins instead of silently becoming zeros, and provides `isna`, `dropna` and `fillna` so that the decision about what a gap means stays with the analyst rather than being made by accident.',

    analogy: {
      scenario:
        'Imagine a class register where some attendance boxes are blank. A blank might mean the pupil was absent, or that the teacher forgot to tick, or that the pupil left the school in March and the rows after that are not about anybody at all. If you decide that blank means absent and compute an attendance rate, you will produce a precise number that is simply wrong for two of those three reasons, and nothing in the spreadsheet will tell you so.',
      mapping: [
        { from: 'The blank box', to: 'NaN, NaT or None in a column' },
        { from: 'Pupil genuinely absent', to: 'A value that is meaningfully zero or negative, which should be recorded as such, not left blank' },
        { from: 'Teacher forgot to tick', to: 'Missing completely at random — filling with a column statistic does little harm' },
        { from: 'Pupil left in March', to: 'Structurally missing: the row should probably not exist for those dates at all' },
        { from: 'Computing the rate by treating blanks as absences', to: '`fillna(0)` applied without asking what the blank means' },
      ],
      bridge:
        'The register makes the central point concrete: the same blank box has three different correct treatments, and the data alone cannot distinguish them. That is why the first step in handling missing values is never a method call — it is finding out how the data was collected. Pandas gives you `isna`, `dropna` and `fillna` precisely because the library refuses to choose for you. When high earners decline to state their income, the missingness depends on the hidden value itself, and filling with the mean pulls the distribution towards the middle and biases every downstream estimate in a direction you cannot detect from the filled data.',
      limitations:
        'The register suggests every blank has a discoverable cause. In practice the reason is often unrecorded, and the honest response is to test whether your conclusion changes under different treatments rather than to pretend certainty about one.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Deciding what to do with a gap',
        caption: 'The method call is the last step, not the first.',
        branching: true,
        steps: [
          { label: 'Measure it', detail: '`df.isna().sum()` per column and `df.isna().mean()` as a proportion. Also look at rows: how many have any gap at all?' },
          { label: 'Find out why', detail: 'Ask the data owner. Offline sensor, optional field, failed join and "not applicable" need different treatments.' },
          { label: 'Structurally missing?', detail: 'If the value cannot exist for that row (no delivery date for a cancelled order), leaving NaN or restructuring is correct; filling is not.' },
          { label: 'A few rows, missing at random?', detail: 'Dropping is defensible. Record how many rows you dropped and check the dropped rows are not a distinct group.' },
          { label: 'Time series with short gaps?', detail: 'Forward fill carries the last observation forward, which suits sensors and prices but never suits a target variable.' },
          { label: 'Otherwise impute, and flag', detail: 'Fill with a median or a group statistic, and add an `is_missing` indicator column so the model can learn from the gap itself.' },
          { label: 'Fit the filler on training data only', detail: 'Compute the statistic inside the pipeline, on the training fold, or you leak test information into the model.' },
        ],
      },
      {
        kind: 'table',
        title: 'The missing markers',
        columns: ['Marker', 'Appears in', 'Equality behaviour', 'Detected by'],
        rows: [
          ['`np.nan`', 'float columns; the default filler', '`np.nan == np.nan` is False', '`isna()` / `notna()`'],
          ['`None`', '`object` columns, and preserved by nullable dtypes', '`None == None` is True, but pandas still treats it as missing', '`isna()`'],
          ['`NaT`', '`datetime64[ns]` and `timedelta64[ns]`', 'Comparisons are False, like NaN', '`isna()`'],
          ['`pd.NA`', 'Nullable dtypes: `Int64`, `boolean`, `string`', 'Comparisons propagate as `NA`, not False', '`isna()`'],
        ],
      },
      {
        kind: 'compare',
        title: 'Drop versus fill',
        caption: 'Both destroy information. The question is which loss you can defend.',
        left: {
          heading: 'dropna()',
          points: [
            'Honest: no invented values enter the data',
            'Loses whole rows, including their good columns',
            'Biases the sample if missingness is related to the outcome',
            'Reasonable when few rows are affected and the gaps look random',
          ],
        },
        right: {
          heading: 'fillna(value)',
          points: [
            'Keeps every row and every other column',
            'Invents values that later code cannot distinguish from measurements',
            'Shrinks variance and weakens correlations, understating uncertainty',
            'Reasonable with a recorded justification and an added missing-indicator column',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Missingness explorer',
        caption: 'Compare drop, mean fill and forward fill on the same table and watch the summary statistics move.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      'A missing value in pandas is a sentinel — `np.nan` in float arrays, `NaT` in temporal arrays, `None` in object arrays, or `pd.NA` in nullable extension arrays — that propagates through arithmetic, is excluded by default from reductions such as `sum` and `mean`, and compares unequal to everything including itself. Detection is therefore identity-based via `isna`/`notna` rather than equality-based, and treatment (deletion, imputation, indication) is an analyst decision determined by the missingness mechanism, not by the data type.',

    codeExamples: [
      {
        language: 'python',
        title: 'Detecting and profiling missingness',
        runnable: true,
        code: `import pandas as pd
import numpy as np

readings = pd.DataFrame({
    "sensor":  ["s1", "s1", "s1", "s2", "s2", "s2"],
    "taken_at": pd.to_datetime(
        ["2026-03-01 09:00", "2026-03-01 10:00", None,
         "2026-03-01 09:00", "2026-03-01 10:00", "2026-03-01 11:00"]),
    "temp_c":  [18.5, np.nan, 19.2, 21.0, np.nan, np.nan],
    "note":    ["ok", None, "ok", "ok", "recalibrating", None],
})

print(readings.isna().sum())
print()
print((readings.isna().mean() * 100).round(1).to_dict())
print()
print("rows with any gap:", readings.isna().any(axis=1).sum(), "of", len(readings))
print()
print("nan == nan  ->", np.nan == np.nan)
print("isna finds it ->", readings["temp_c"].isna().sum())
print()
print(readings["temp_c"].mean(), "<- mean skips NaN by default")`,
        output: `sensor      0
taken_at    1
temp_c      3
note        2
dtype: int64

{'sensor': 0.0, 'taken_at': 16.7, 'temp_c': 50.0, 'note': 33.3}

rows with any gap: 5 of 6

nan == nan  -> False
isna finds it -> 3

19.566666666666666 <- mean skips NaN by default`,
        explanation:
          '`isna()` returns a boolean frame the same shape as the data, so `.sum()` counts per column and `.mean()` gives the proportion directly — the second is what you actually want to report, since 3 missing means something very different in 6 rows than in 6 million. The row-level view matters just as much: here five of six rows have a gap somewhere, so `dropna()` would leave one row and the analysis would be over. Note that `np.nan == np.nan` is False by IEEE definition, which is exactly why detection goes through `isna` rather than an equality test, and note that `mean()` silently skips the gaps rather than returning NaN, so an average computed over half the data looks identical to one computed over all of it.',
      },
      {
        language: 'python',
        title: 'Dropping, filling and forward filling, with the differences made visible',
        runnable: true,
        code: `import pandas as pd
import numpy as np

readings = pd.DataFrame({
    "sensor": ["s1", "s1", "s1", "s1"],
    "temp_c": [18.5, np.nan, np.nan, 19.4],
    "humidity": [55.0, 57.0, np.nan, 58.0],
})

print("drop rows with any gap:")
print(readings.dropna())
print()
print("drop rows only if temp_c is missing:")
print(readings.dropna(subset=["temp_c"]))
print()
print("fill with the column mean:")
print(readings.fillna(readings.mean(numeric_only=True)))
print()
print("forward fill (carry the last reading forward):")
print(readings.ffill())
print()
print("fill, but keep a record that you did:")
flagged = readings.assign(temp_was_missing=readings["temp_c"].isna())
flagged["temp_c"] = flagged["temp_c"].fillna(flagged["temp_c"].median())
print(flagged)`,
        output: `drop rows with any gap:
  sensor  temp_c  humidity
0     s1    18.5      55.0
3     s1    19.4      58.0

drop rows only if temp_c is missing:
  sensor  temp_c  humidity
0     s1    18.5      55.0
3     s1    19.4      58.0

fill with the column mean:
  sensor  temp_c  humidity
0     s1   18.50      55.00
1     s1   18.95      57.00
2     s1   18.95      56.67
3     s1   19.40      58.00

forward fill (carry the last reading forward):
  sensor  temp_c  humidity
0     s1    18.5      55.0
1     s1    18.5      57.0
2     s1    18.5      57.0
3     s1    19.4      58.0

fill, but keep a record that you did:
  sensor  temp_c  humidity  temp_was_missing
0     s1   18.50      55.0             False
1     s1   18.95      57.0              True
2     s1   18.95      57.0              True
3     s1   19.40      58.0             False`,
        explanation:
          'Four treatments of one small table, and each produces a different dataset. `dropna()` with no arguments removes a row if any column is missing, which is usually too aggressive — `subset=["temp_c"]` restricts the rule to the column you actually care about. Mean filling produces values such as 18.95 that never occurred and shrinks the variance, so any later standard deviation or correlation is understated. Forward filling is right for a sensor that reports only on change and badly wrong for anything where the previous row is not a reasonable stand-in — it also carries the last value across sensor boundaries unless you `groupby("sensor").ffill()`. The last block is the pattern worth adopting by default: fill if you must, but add an indicator column, so the model can learn that missingness itself was predictive and so a later reader can tell measurements from inventions.',
      },
      {
        language: 'python',
        title: 'Why imputing before the split leaks, and how to avoid it',
        runnable: true,
        code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(0)
df = pd.DataFrame({"x": rng.normal(50, 10, 200)})
df.loc[rng.choice(200, 40, replace=False), "x"] = np.nan
df["y"] = df["x"].fillna(50) * 2 + rng.normal(0, 1, 200)

# WRONG: the filler is computed over every row, including the test rows
leaky = df.copy()
leaky["x"] = leaky["x"].fillna(leaky["x"].mean())
print("mean used by the leaky fill :", round(leaky["x"].mean(), 4))

# RIGHT: split first, then learn the filler inside a pipeline on the training fold
X_train, X_test, y_train, y_test = train_test_split(
    df[["x"]], df["y"], test_size=0.25, random_state=0)
print("mean available at training time:", round(X_train["x"].mean(), 4))

model = make_pipeline(SimpleImputer(strategy="mean"), LinearRegression())
model.fit(X_train, y_train)
print("imputer learned:", round(model[0].statistics_[0], 4))
print("test score:", round(model.score(X_test, y_test), 4))`,
        output: `mean used by the leaky fill : 49.7413
mean available at training time: 49.4188
imputer learned: 49.4188
test score: 0.9981`,
        explanation:
          'The two means differ, and that difference is the leak. Filling before splitting lets a statistic computed partly from the test rows enter the training data, so the reported test score is optimistic by an unknown amount and the model cannot be reproduced at inference time, when no test set exists. Putting `SimpleImputer` inside a pipeline fixes both problems structurally: `fit` learns the filler from the training fold only, `transform` applies that stored value to the test fold and later to live data, and cross-validation repeats the whole thing per fold. This is the general principle — anything learned from data, including a mean, a median, a scaler or a category encoding, must be fitted inside the pipeline rather than applied to the frame beforehand.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Clinical and survey data',
        usage:
          'A missing symptom field frequently means "not asked because the earlier answer ruled it out", which is structurally missing, not unknown. Filling such fields with a median invents patients who were never observed.',
      },
      {
        context: 'Sensor and IoT streams',
        usage:
          'Gaps correspond to outages, and their length is the signal: a five-second gap is noise, an eight-hour gap is an incident. Teams typically forward fill short gaps within a device, leave long ones as NaN, and keep a gap-length feature.',
      },
      {
        context: 'Joined tables in a feature store',
        usage:
          'After a left join, NaN means "no matching record" — no purchase last month, no support ticket. Here zero genuinely is the right fill, and it is one of the few cases where filling needs no apology, though an indicator column still helps.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`SimpleImputer` and `IterativeImputer` inside a `Pipeline` learn fill values from the training fold only, which is what prevents leakage.' },
      { tool: 'missingno', role: 'Plots the missingness matrix so patterns — gaps that co-occur across columns — become visible instead of being summarised away.' },
      { tool: 'LightGBM / XGBoost', role: 'Handle NaN natively by learning a default direction at each split, so imputation is often unnecessary and sometimes harmful with these models.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reaching for `fillna(0)` as a default',
        why: 'Zero is a real measurement. Filling an unknown temperature with 0 fabricates a cold day; filling an unknown income with 0 fabricates a destitute customer, and every mean and correlation afterwards is wrong.',
        fix: 'Fill with zero only where absence genuinely means zero, typically after a left join. Otherwise use a median, a group statistic, or leave the gap and flag it.',
      },
      {
        mistake: 'Comparing to NaN with `==`',
        why: 'NaN is not equal to itself by the IEEE standard, so `df[df["x"] == np.nan]` matches nothing and returns an empty frame rather than an error.',
        fix: 'Use `df["x"].isna()` and `notna()`. There is no situation in pandas where `== np.nan` is the right tool.',
      },
      {
        mistake: 'Calling `dropna()` with no arguments on a wide table',
        why: 'It removes any row with a gap in any column, so a hundred columns each 2 per cent missing can eliminate most of the data even though no single column is a problem.',
        fix: 'Use `subset=` to name the columns that genuinely matter, or `thresh=` to require a minimum number of present values, and always print how many rows were removed.',
      },
      {
        mistake: 'Imputing before splitting into train and test',
        why: 'The fill value is learned from rows the model should not have seen, so the evaluation is optimistic and the transformation cannot be reproduced at inference time.',
        fix: 'Split first and put the imputer inside a `Pipeline`, so it is fitted on the training fold and merely applied elsewhere.',
      },
      {
        mistake: 'Forward filling across group boundaries',
        why: 'A plain `ffill()` on a table sorted by sensor and time carries the last reading of one sensor into the first row of the next, inventing a measurement attributed to the wrong device.',
        fix: 'Group first: `df.groupby("sensor")["temp_c"].ffill()`, and consider `limit=` so a gap longer than a few periods is not papered over.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between NaN, None and NaT, and how do you detect all three?',
        answer:
          'They are the missing markers for different column types. NaN is the IEEE floating point value used in float columns and is pandas\' general default. None is the Python null object, which appears in `object` columns and is preserved by the nullable dtypes. NaT is "not a time", used by datetime64 and timedelta64 columns. All three are detected by `isna()` and `notna()`, which is the only reliable route, because NaN is not equal to itself and `== None` is not the same test as `is None`. Pandas also has `pd.NA`, the marker for its nullable extension dtypes such as `Int64`, `boolean` and `string`, which differs from NaN in that comparisons propagate NA rather than returning False.',
      },
      {
        level: 'intermediate',
        question: 'When is imputation the wrong answer?',
        answer:
          'Three main cases. First, when the value is structurally missing — a delivery date for a cancelled order, a spouse\'s age for an unmarried respondent — because the quantity does not exist, and inventing it creates records of people who were never observed. Second, when the data is missing not at random, where the missingness depends on the hidden value itself: high earners declining to state income means the observed mean is already biased downward, so imputing that mean makes the bias systematic and invisible. Third, when the model handles missingness natively — gradient boosted trees learn a default split direction — so imputation only destroys the information that the value was absent. The general defence is to add a missing-indicator column whenever you do impute, keeping the fact of absence available even after the gap is filled, and to check whether your conclusions change under different treatments.',
        followUp:
          'A strong candidate mentions Rubin\'s taxonomy — missing completely at random, at random, and not at random — and notes that only the first justifies simple deletion without bias.',
      },
      {
        level: 'ml-engineer',
        question: 'A model performs well in cross-validation and poorly in production. How could missing-value handling be to blame?',
        answer:
          'Several routes. If imputation statistics were computed over the whole dataset before splitting, the cross-validation score is optimistic because test rows contributed to the fill values, and production has no such advantage. If the imputer lives outside the pipeline, the exact fill values may not have been persisted, so production computes a different mean from a different distribution, and the features shift. If missingness patterns differ between training and production — a field that was mostly populated historically becomes mostly empty after an upstream form change — then a constant fill silently becomes the modal value of that feature. The fix is structural: imputers inside the pipeline, the fitted artefact serialised with the model, and monitoring on per-feature missingness rates so a change in the missingness pattern raises an alert rather than a quiet accuracy decline.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A table of 10,000 customers has `income` missing for 18 per cent of rows, and the missingness is concentrated in the highest-value segment. Your colleague proposes `df["income"].fillna(df["income"].mean())`. Explain the problem and propose something better.',
        hint: 'Is the missingness independent of the value that is missing?',
        solution:
          'The missingness depends on the unobserved value itself, which makes it missing not at random. The observed mean is already biased downward because high earners are the ones declining to answer, so filling with that mean pulls the missing 18 per cent towards a value that is systematically too low, and every subsequent correlation involving income is attenuated. Better options: add an `income_missing` indicator so the model can use the fact of non-response, which here is informative; impute within segment rather than globally if a reliable segment variable exists; use a model that handles NaN natively; or state the limitation explicitly and report results both with and without the affected rows. What you must not do is replace the gap with a single number and present the result as if it were measured.',
      },
      {
        prompt:
          'Write code that forward fills a temperature column within each sensor, filling gaps of at most two consecutive readings and leaving longer gaps alone.',
        hint: 'Group before filling, and there is an argument that caps how far a fill will travel.',
        solution:
          'df["temp_c"] = df.sort_values(["sensor", "taken_at"]).groupby("sensor")["temp_c"].ffill(limit=2)\n\nSorting first matters, because forward fill is order-dependent and a table sorted by arrival time may interleave sensors. Grouping stops the last reading of one sensor from being carried into the next. `limit=2` encodes the judgement that a short outage may reasonably be bridged while a long one should stay visible as missing — the length of the gap is itself information about an incident, and papering over it hides exactly the event you would want to investigate.',
      },
      {
        prompt:
          'Explain why `df[df["x"] == np.nan]` returns an empty frame rather than the missing rows, and what to write instead.',
        hint: 'What does the IEEE standard say about NaN equality?',
        solution:
          'NaN is defined to be unequal to every value including itself, so the comparison returns False for every row and the mask selects nothing. No error is raised, which makes this a silent failure. The correct form is `df[df["x"].isna()]`, and the corresponding positive test is `notna()`. The same rule applies to NaT and to `pd.NA`, which is why `isna` is the single detection mechanism across every dtype rather than there being one test per marker.',
      },
    ],

    quiz: [
      {
        id: 'PD-006-q1',
        type: 'truefalse',
        concept: 'nan equality',
        prompt: '`np.nan == np.nan` evaluates to True.',
        answer: false,
        explanation:
          'NaN is defined by IEEE-754 to compare unequal to everything, including itself. That is precisely why pandas provides `isna()`, and why a mask written as `== np.nan` silently selects no rows.',
      },
      {
        id: 'PD-006-q2',
        type: 'mcq',
        concept: 'dropna',
        prompt: 'What does `df.dropna()` do by default?',
        options: [
          'Removes every row that has a missing value in any column',
          'Removes every column that contains a missing value',
          'Removes rows where all columns are missing',
          'Replaces missing values with the column mean',
        ],
        answerIndex: 0,
        explanation:
          'The defaults are `axis=0` and `how="any"`, so a single gap anywhere in a row removes it. On a wide table this can eliminate most of the data, which is why `subset=` and `thresh=` matter.',
      },
      {
        id: 'PD-006-q3',
        type: 'multi',
        concept: 'when to impute',
        prompt: 'In which situations is filling missing values with the column mean a defensible choice? Select all that apply.',
        options: [
          'A small percentage of values are missing for reasons unrelated to the value itself',
          'The missing values are concentrated in the highest-value customers',
          'The quantity cannot exist for those rows, such as a delivery date on a cancelled order',
          'You also add an indicator column recording that the value was imputed',
          'You compute the mean inside a pipeline fitted on the training fold only',
        ],
        answerIndices: [0, 3, 4],
        explanation:
          'Mean filling is reasonable when data is missing at random, when the imputation is recorded with an indicator, and when the statistic is learned inside the pipeline. It is wrong when missingness depends on the hidden value, and it is meaningless when the quantity does not exist for that row.',
      },
      {
        id: 'PD-006-q4',
        type: 'code-output',
        language: 'python',
        concept: 'aggregation with gaps',
        prompt: 'What does this print?',
        code: 'import pandas as pd, numpy as np\ns = pd.Series([2.0, np.nan, 4.0])\nprint(s.mean(), s.sum(), s.count())',
        options: ['3.0 6.0 2', '2.0 6.0 3', 'nan nan 3', '3.0 6.0 3'],
        answerIndex: 0,
        explanation:
          'Reductions skip missing values by default, so the mean is 6/2 = 3.0 and `count()` reports only the non-null values. This is convenient and dangerous: an average over half your data looks exactly like an average over all of it.',
      },
      {
        id: 'PD-006-q5',
        type: 'debug',
        language: 'python',
        concept: 'leakage',
        prompt: 'What is wrong with this preparation step?',
        code: 'df["income"] = df["income"].fillna(df["income"].mean())\nX_train, X_test, y_train, y_test = train_test_split(df.drop(columns="y"), df["y"])',
        options: [
          'The fill value is computed from all rows, including the ones that become the test set',
          'fillna cannot be used on a float column',
          'The mean should be the median for income data',
          'train_test_split must be called before any column is dropped',
        ],
        answerIndex: 0,
        explanation:
          'Imputing before splitting lets a statistic derived partly from the test rows enter training, inflating the reported score and producing a transformation that cannot be reproduced at inference. Put the imputer in a pipeline fitted on the training fold.',
      },
      {
        id: 'PD-006-q6',
        type: 'explain',
        concept: 'missingness mechanism',
        prompt: 'Explain why "what should I fill this with?" is the wrong first question about missing data.',
        rubric: [
          'States that the treatment depends on why the value is missing',
          'Distinguishes at least two mechanisms with different correct treatments',
          'Mentions a concrete harm from choosing a filler without knowing the mechanism',
        ],
        sampleAnswer:
          'Because the right treatment is determined by the reason for the gap, and the data alone cannot tell you the reason. If a sensor rebooted, the previous reading is a reasonable stand-in. If a field was never applicable — a delivery date on a cancelled order — then no value is correct and filling invents a fact. If high earners decline to state income, the gaps are concentrated at the top of the distribution, so filling with the observed mean drags the missing rows downward and biases every estimate involving income, in a way that is undetectable once the filling is done. So the first question is how the data was collected and what a blank means in that system; only then does the choice between dropping, forward filling, imputing with an indicator, or leaving the gap become answerable.',
        explanation:
          'The examinable idea is that imputation is a modelling assumption, not a formatting step, and it must be justified rather than defaulted to.',
      },
    ],

    flashcards: [
      { front: 'Why can you not test for NaN with `==`?', back: 'NaN compares unequal to everything including itself, so the mask matches nothing. Use `isna()` / `notna()`.' },
      { front: 'NaN, NaT, None, pd.NA — which goes where?', back: 'NaN in float columns, NaT in datetime/timedelta, None in object columns, pd.NA in nullable extension dtypes. All are found by `isna()`.' },
      { front: 'What does `dropna()` do by default?', back: 'Drops any row containing a gap in any column. Use `subset=` or `thresh=` to be less destructive.' },
      { front: 'When is `fillna(0)` genuinely right?', back: 'When absence really means zero — typically after a left join where "no matching purchase" means no spend.' },
      { front: 'Why add a missing-indicator column?', back: 'The fact that a value was absent is often predictive, and an indicator keeps that information after the gap is filled.' },
      { front: 'Why impute inside a pipeline?', back: 'So the fill statistic is learned from the training fold only; computing it over all rows leaks test information and inflates the score.' },
      { front: 'What does plain `ffill()` get wrong on grouped data?', back: 'It carries the last value across group boundaries. Use `df.groupby(key)[col].ffill()`, and consider `limit=`.' },
    ],

    challenge: {
      title: 'A missingness report that recommends a treatment',
      brief:
        'Write `missing_report(df)` that, for each column with gaps, reports the count and percentage missing, the dtype, whether the gaps cluster with gaps in other columns, and a suggested treatment drawn from a small set of rules you define and document: for example, a numeric column under 5 per cent missing suggests median imputation plus an indicator, a datetime column suggests investigation, and any column above 60 per cent missing suggests dropping the column rather than the rows. The output must state the reasoning, not just the recommendation.',
      language: 'python',
      acceptanceCriteria: [
        'Reports both absolute and relative missingness per column, sorted worst first',
        'Detects at least one case where gaps in two columns co-occur',
        'Recommendations are rule-based and the rule is printed alongside each recommendation',
        'Explicitly refuses to recommend imputation for columns it classifies as possibly structural',
      ],
      starterCode: 'import pandas as pd\n\n\ndef missing_report(df: pd.DataFrame) -> pd.DataFrame:\n    counts = df.isna().sum()\n    pct = df.isna().mean().mul(100).round(1)\n    return pd.DataFrame({"missing": counts, "pct": pct}).sort_values("pct", ascending=False)\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me how to handle missing values in a dataset, and tell me when filling them in is the wrong thing to do.',
      mustCover: [
        'NaN, NaT and None are markers for absence, detected with isna rather than ==',
        'The treatment depends on why the value is missing, not on the dtype',
        'Dropping, filling, forward filling and flagging each have specific appropriate cases',
        'Imputing before splitting leaks information into the model',
      ],
      bonusSignals: ['distinguishes missing at random from missing not at random', 'mentions the missing-indicator column', 'mentions structurally missing values'],
      sampleExplanation:
        'A missing value is the absence of information, and pandas marks it with NaN in number columns, NaT in date columns and None in text columns. The first practical thing to know is that NaN is not equal to itself, so you find gaps with `isna()`, never with `== nan`. The second, and far more important, is that you cannot pick a treatment until you know why the gap is there. If a sensor was offline for a minute, carrying the previous reading forward is sensible. If a field never applied to that row — a delivery date on an order that was cancelled — then no value is right and filling one in invents a fact. And if the gaps are concentrated where the value would have been extreme, such as high earners declining to state income, then the average you would fill with is already biased low, so filling makes your data systematically wrong in a direction you can no longer see. When you do fill, add a small True/False column recording that you filled it, because the absence was often itself informative. And do the filling inside your model pipeline rather than on the whole table first, otherwise the average you use has been computed partly from the test rows and your score is flattering you.',
    },
  },
  {
    id: 'PD-007',
    domain: 'PD',
    module: 'Cleaning',
    topic: 'Duplicates, dtypes and text',
    title: 'Duplicates, Types and Text Cleaning',
    slug: 'duplicates-types-text-cleaning',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['PD-006'],
    related: ['PD-003', 'PD-005'],
    tags: ['duplicated', 'drop_duplicates', 'astype', 'to_numeric', 'category', 'str-accessor'],

    learningObjectives: [
      'Find and remove duplicates with `duplicated` and `drop_duplicates`, controlling `subset` and `keep`',
      'Convert dtypes deliberately with `astype`, `to_numeric(errors=...)` and `to_datetime`, and know which failures each surfaces',
      'Use the `category` dtype where it saves memory and speeds up grouping, and know where it causes trouble',
      'Clean text with the `.str` accessor: strip, case-fold, replace, extract and split, without falling back to a loop',
    ],

    terminology: [
      {
        term: 'Duplicate row',
        definition:
          'A row whose values match another row across the columns you are checking. Whether that constitutes a duplicate is a business decision expressed through `subset`.',
        simple: 'A row that says the same thing as another row.',
      },
      {
        term: 'astype',
        definition:
          'A strict dtype conversion. Any value that cannot be converted raises, so it is the right choice when you believe the column is already clean.',
        simple: 'Change the column type, and complain loudly if anything does not fit.',
      },
      {
        term: 'to_numeric(errors=)',
        definition:
          'A tolerant numeric conversion. `errors="raise"` stops on the first bad value, `errors="coerce"` turns unconvertible values into NaN so you can inspect them.',
        simple: 'Convert to numbers, with a choice about what to do with the ones that will not convert.',
      },
      {
        term: 'category dtype',
        definition:
          'A dtype storing integer codes plus a dictionary of distinct values, cutting memory for low-cardinality text and speeding up grouping and sorting.',
        simple: 'Store each repeated label once and refer to it by a number.',
      },
      {
        term: '.str accessor',
        definition:
          'The namespace exposing vectorised string methods on a text Series — `str.strip`, `str.lower`, `str.replace`, `str.extract`, `str.split` — which skip missing values.',
        simple: 'The way to run a text operation on a whole column at once.',
      },
    ],

    simpleExplanation:
      "Three problems show up in almost every real dataset, and they are usually the same problem wearing different clothes: the data does not match what you assumed it was. Rows repeat, because an extract was loaded twice or a join multiplied them. Types are wrong, because a price column came in as text with a currency symbol attached, or an identifier was helpfully converted to a number and lost its leading zero. And text is inconsistent, because humans typed it: \"London\", \"london\", \" London \" and \"LONDON\" are four different values to a computer and one city to everyone else, which means a grouping by city silently reports four cities. Pandas gives you a direct tool for each. `duplicated` and `drop_duplicates` for repeated rows, where the important argument is which columns actually define a duplicate. `astype` and `to_numeric` for type conversion, where the important choice is whether you want to be told about bad values or have them turned into NaN so you can look at them. And the `.str` accessor for text, which applies a string operation to a whole column in one step.",

    whyItExists:
      'Data that is merely wrong in shape will break a pipeline loudly, but data that is duplicated, mistyped or inconsistently spelled produces plausible results that are quietly incorrect — double-counted revenue, a category split into four, a price column that cannot be averaged. These tools exist so each of those failures can be found deliberately and fixed once, at the edge of the system, rather than being worked around repeatedly downstream.',

    analogy: {
      scenario:
        'Think of merging two address books that have been kept by different people for years. The same friend appears twice because one book has her under her maiden name. Some phone numbers are stored as text with spaces and brackets and others as bare digits. And half the entries say "Manchester" while the rest say "manchester" or "Manchster". None of this stops you reading the books, but the moment you try to count how many friends you have in each city, the answer is confidently wrong.',
      mapping: [
        { from: 'The friend listed twice under two names', to: 'A duplicate row that `subset=["email"]` would catch but a full-row check would miss' },
        { from: 'Phone numbers stored inconsistently', to: 'A column whose dtype is `object` because the values are not uniformly formatted' },
        { from: '"Manchester" versus "manchester"', to: 'Case and whitespace variants that split one group into several' },
        { from: '"Manchster"', to: 'A genuine typo, which normalisation cannot fix and a lookup table must' },
        { from: 'Counting friends per city', to: 'A `groupby` whose group count is wrong before the cleaning is done' },
      ],
      bridge:
        'The address book makes clear that all three problems are failures of identity: the data does not agree with itself about what counts as the same thing. Deduplication asks which columns define sameness, type conversion asks what kind of thing a value is, and text normalisation asks which surface forms are the same underlying value. Notice too that normalisation handles the first three problems and cannot handle the fourth: no amount of `str.lower()` turns "Manchster" into "Manchester", which is why a fuzzy match or a controlled vocabulary is a different tool for a different job.',
      limitations:
        'The analogy suggests duplicates are always errors. In event data, two identical rows may be two genuinely identical events — two coffees bought a minute apart — and dropping them destroys real information. Deduplicate on an identifier, not on a pattern of values.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Before and after cleaning',
        caption: 'The same five rows, seen as the computer sees them and then as you meant them.',
        columns: ['row', 'city (raw)', 'price (raw)', 'city (clean)', 'price (clean)'],
        rows: [
          ['0', '"London"', '"£24.99"', 'london', '24.99'],
          ['1', '" london "', '"112.50"', 'london', '112.50'],
          ['2', '"LONDON"', '"1,240.00"', 'london', '1240.00'],
          ['3', '"Leeds"', '"N/A"', 'leeds', 'NaN'],
          ['4', '"Leeds"', '"8.75"', 'leeds', '8.75'],
        ],
      },
      {
        kind: 'flow',
        title: 'Converting a text column to numbers safely',
        caption: 'Coerce, inspect, then decide — never convert blindly.',
        steps: [
          { label: 'Try the conversion tolerantly', detail: '`converted = pd.to_numeric(df["price"], errors="coerce")` turns unconvertible values into NaN instead of raising.' },
          { label: 'Find what failed', detail: '`df.loc[converted.isna() & df["price"].notna(), "price"].unique()` lists the exact offending strings.' },
          { label: 'Fix the causes, not the symptoms', detail: 'Strip currency symbols and thousands separators with `.str.replace`; add genuine missing markers to `na_values` at load time.' },
          { label: 'Convert strictly and assert', detail: 'Re-run with `errors="raise"` so a new kind of bad value fails loudly rather than becoming a silent NaN.' },
        ],
      },
      {
        kind: 'compare',
        title: 'astype versus to_numeric',
        left: {
          heading: 'astype(float)',
          points: [
            'Strict: raises ValueError on the first unconvertible value',
            'The right choice when you believe the column is already clean',
            'Also used for int, bool, string and category conversions',
            'Fails on a whole column because of one bad row, which is often what you want',
          ],
        },
        right: {
          heading: 'pd.to_numeric(s, errors="coerce")',
          points: [
            'Tolerant: unconvertible values become NaN',
            'The right choice while investigating a dirty column',
            'Pairs with `downcast="integer"` or `"float"` to shrink the result',
            'Dangerous as a permanent fix — silently converts errors into gaps',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Clean a messy column',
        caption: 'Apply strip, lower and replace in sequence and watch the distinct-value count collapse.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      '`duplicated` marks rows whose projection onto a chosen subset of columns has been seen before under a `keep` policy, and `drop_duplicates` removes them. Dtype conversion is performed by `astype`, which is total and raises on failure, or by the `to_numeric`/`to_datetime` family, whose `errors` parameter selects between raising and coercing failures to the missing marker. The `.str` accessor exposes element-wise string operations over object and `string` dtype Series, propagating missing values rather than raising on them.',

    codeExamples: [
      {
        language: 'python',
        title: 'Duplicates: the subset is the whole decision',
        runnable: true,
        code: `import pandas as pd

signups = pd.DataFrame({
    "email":  ["a@x.com", "b@x.com", "a@x.com", "c@x.com", "a@x.com"],
    "name":   ["Ada", "Bo", "Ada L.", "Cleo", "Ada"],
    "source": ["web", "web", "app", "web", "web"],
    "signed_up": pd.to_datetime(
        ["2026-03-01", "2026-03-01", "2026-03-02", "2026-03-03", "2026-03-01"]),
})

print("fully identical rows:", signups.duplicated().sum())
print("rows with a repeated email:", signups.duplicated(subset=["email"]).sum())
print()
print(signups[signups.duplicated(subset=["email"], keep=False)].sort_values("email"))
print()
print("keep the earliest signup per email:")
print(signups.sort_values("signed_up").drop_duplicates(subset=["email"], keep="first"))`,
        output: `fully identical rows: 1
rows with a repeated email: 2

     email    name source  signed_up
0  a@x.com     Ada    web 2026-03-01
2  a@x.com  Ada L.    app 2026-03-02
4  a@x.com     Ada    web 2026-03-01

keep the earliest signup per email:
     email    name source  signed_up
0  a@x.com     Ada    web 2026-03-01
1  b@x.com      Bo    web 2026-03-01
3  c@x.com    Cleo    web 2026-03-03
`,
        explanation:
          'The two counts differ because they ask different questions. A full-row check finds only row 4, an exact copy of row 0. Checking on `email` finds that Ada appears three times, once with a different name and source — which is almost certainly the duplicate that matters to the business. `keep=False` marks every member of a duplicate group rather than just the repeats, which is the form to use when you want to look at the conflicts before deciding. And because `drop_duplicates` keeps the first occurrence in the frame\'s current order, sorting first is how you control which record survives: sort by date to keep the earliest, or sort descending to keep the most recent.',
      },
      {
        language: 'python',
        title: 'Converting types, and finding out what would not convert',
        runnable: true,
        code: `import pandas as pd

products = pd.DataFrame({
    "sku":   ["0012", "0034", "0056", "0078"],
    "price": ["£24.99", "112.50", "1,240.00", "N/A"],
    "qty":   ["3", "1", "2", "seven"],
})

# Step 1: find out what will not convert, without raising
bad_qty = pd.to_numeric(products["qty"], errors="coerce").isna() & products["qty"].notna()
print("unconvertible qty values:", products.loc[bad_qty, "qty"].tolist())

# Step 2: clean the causes
cleaned = products.copy()
cleaned["price"] = (cleaned["price"]
                    .str.replace("£", "", regex=False)
                    .str.replace(",", "", regex=False)
                    .replace("N/A", None))
cleaned["price"] = pd.to_numeric(cleaned["price"], errors="raise")
cleaned["qty"] = pd.to_numeric(cleaned["qty"], errors="coerce").astype("Int64")

print()
print(cleaned)
print()
print(cleaned.dtypes)`,
        output: `unconvertible qty values: ['seven']

    sku    price   qty
0  0012    24.99     3
1  0034   112.50     1
2  0056  1240.00     2
3  0078      NaN  <NA>

sku       object
price    float64
qty        Int64
dtype: object`,
        explanation:
          'The order of operations is the lesson. First use `errors="coerce"` diagnostically to list the exact strings that break the conversion — here "seven", which a human wrote into a quantity field. Then remove the known cosmetic problems from the price column with `.str.replace`, noting that `regex=False` is both faster and safer when the pattern is a literal, since "£" and "," would otherwise be treated as regular expressions. Then convert strictly with `errors="raise"`, so that a new kind of corruption next month fails loudly instead of quietly becoming a gap. The quantity uses the nullable `Int64` dtype, capital I, which unlike plain `int64` can hold a missing value — otherwise one NaN would force the whole column to float and your counts would print as 3.0.',
      },
      {
        language: 'python',
        title: 'Text cleaning with the .str accessor, and the category dtype',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "city":     ["London", " london ", "LONDON", "Leeds", "leeds ", "Manchster"],
    "ref":      ["ORD-2026-001", "ORD-2026-002", "ORD-2026-003",
                 "ORD-2025-014", "ORD-2025-015", "ORD-2026-004"],
})

print("distinct cities before:", orders["city"].nunique())

orders["city"] = orders["city"].str.strip().str.lower()
print("distinct cities after :", orders["city"].nunique())
print(orders["city"].value_counts().to_dict())
print()

# A spelling correction is a lookup, not a normalisation
orders["city"] = orders["city"].replace({"manchster": "manchester"})

# Pull structure out of a reference code
orders["year"] = orders["ref"].str.extract(r"ORD-(\\d{4})-").astype(int)
orders["seq"] = orders["ref"].str.split("-").str[-1]

orders["city"] = orders["city"].astype("category")
print(orders)
print()
print("city dtype:", orders["city"].dtype)
print("categories:", list(orders["city"].cat.categories))`,
        output: `distinct cities before: 6
distinct cities after : 3
{'london': 3, 'leeds': 2, 'manchster': 1}

         city           ref  year  seq
0      london  ORD-2026-001  2026  001
1      london  ORD-2026-002  2026  002
2      london  ORD-2026-003  2026  003
3       leeds  ORD-2025-014  2025  014
4       leeds  ORD-2025-015  2025  015
5  manchester  ORD-2026-004  2026  004

city dtype: category
categories: ['leeds', 'london', 'manchester']`,
        explanation:
          'Six distinct cities become three with two vectorised calls, because `strip` and `lower` collapse the whitespace and case variants that a computer sees as different values. That matters enormously: a `groupby("city")` before this step reports six cities and splits London\'s revenue three ways. "Manchster" is a genuinely different problem — a typo carries no rule to exploit — so it needs an explicit mapping, and in production a controlled vocabulary or a fuzzy match. `str.extract` with a capture group pulls structure out of a reference code, and `str.split("-").str[-1]` shows the chained `.str` indexing that reaches into the resulting lists. Converting the cleaned column to `category` at the end is the right order: categorising first would freeze the messy values into the category set.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A double-loaded extract',
        usage:
          'A nightly job reruns after a failure and appends the same day twice. Revenue doubles and nothing errors. `df.duplicated(subset=["order_id"]).sum()` in the pipeline catches it before the dashboard does.',
      },
      {
        context: 'Free-text country and city fields',
        usage:
          'Signup forms with a free-text country field produce dozens of spellings of the same country. Normalisation plus a lookup table is standard practice before any regional analysis, and the lookup table itself becomes a maintained artefact.',
      },
      {
        context: 'Memory-constrained feature engineering',
        usage:
          'A 50-million-row event table with a 30-value `event_type` column costs gigabytes as `object` and tens of megabytes as `category`, and `groupby` on the categorical version is markedly faster because it groups on integer codes.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`.str`, `astype` and `drop_duplicates` are the backbone of any cleaning stage, usually written as one chained transformation.' },
      { tool: 'pyarrow', role: 'Backs the `string[pyarrow]` dtype, which is faster and far more memory-efficient than `object` for text columns.' },
      { tool: 'scikit-learn', role: '`OrdinalEncoder` and `OneHotEncoder` consume cleaned categorical columns; unnormalised case variants become separate, useless features.' },
    ],

    commonMistakes: [
      {
        mistake: 'Calling `drop_duplicates()` with no subset',
        why: 'It requires every column to match, so a row that differs only in a timestamp or a free-text note survives even though it is the same business event.',
        fix: 'Deduplicate on the columns that define identity — usually a business key such as `order_id` or `email` — and sort first so you control which record is kept.',
      },
      {
        mistake: 'Leaving `errors="coerce"` in production code',
        why: 'It converts every unparseable value into NaN silently, so an upstream format change turns into a wave of missing data rather than a failure anyone notices.',
        fix: 'Use `coerce` to investigate, then fix the causes and switch to `errors="raise"` so new corruption is reported at ingest.',
      },
      {
        mistake: 'Using `.apply(str.strip)` instead of `.str.strip()`',
        why: '`apply` runs a Python function per element, which is far slower, and it raises `AttributeError` on any missing value because `None` has no `strip` method.',
        fix: 'Use the `.str` accessor, which is vectorised and skips missing values, returning NaN for them rather than raising.',
      },
      {
        mistake: 'Converting to `category` before cleaning the text',
        why: 'The category set is fixed at conversion time, so " London " and "LONDON" become permanent distinct categories, and later assignment of a new value raises unless you add it to the categories first.',
        fix: 'Normalise, map and correct first; convert to `category` as the last step. To add a value later, use `cat.add_categories`.',
      },
      {
        mistake: 'Assuming `astype(int)` on a column with gaps will work',
        why: 'Plain `int64` cannot represent a missing value, so pandas raises "Cannot convert non-finite values (NA or inf) to integer".',
        fix: 'Use the nullable `astype("Int64")`, or decide explicitly how the gaps should be handled before converting.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'How do you find duplicates in a DataFrame, and what decision must you make first?',
        answer:
          '`df.duplicated()` returns a boolean Series marking rows already seen, and `df.duplicated().sum()` counts them; `drop_duplicates` removes them. The decision that comes first is which columns define a duplicate, expressed with `subset`. A full-row comparison catches only exact copies and misses the more common case where the same entity appears twice with a slightly different name or timestamp, so deduplication is normally done on a business key such as an order id or an email. Two further arguments matter: `keep` chooses which member of the group survives, and since it works on the frame\'s current order, sorting beforehand is how you keep the most recent or the most complete record. `keep=False` marks every member of a duplicate group, which is the right form when you want to inspect the conflicts before deleting anything.',
      },
      {
        level: 'intermediate',
        question: 'A price column loaded as `object`. Walk me through turning it into a float safely.',
        answer:
          'First diagnose rather than convert: `converted = pd.to_numeric(df["price"], errors="coerce")`, then look at `df.loc[converted.isna() & df["price"].notna(), "price"].unique()` to see the exact strings that failed. Typically these are currency symbols, thousands separators, stray whitespace, or a missing marker such as "N/A" that the reader did not recognise. Fix each cause explicitly — `.str.replace` with `regex=False` for literals, and add the marker to `na_values` at load time so the problem is solved at the edge. Then convert strictly with `errors="raise"`, so a new kind of bad value next month fails visibly instead of silently becoming a gap. Leaving `coerce` in place is the mistake: it turns a data-quality incident into a quiet increase in missingness that nobody investigates.',
        followUp:
          'A strong answer also mentions checking for a decimal comma in European data, and never using float for money where exact cents matter.',
      },
      {
        level: 'ml-engineer',
        question: 'When is the `category` dtype worth using, and when does it cause problems?',
        answer:
          'It is worth it when cardinality is low relative to row count: the column is stored as small integer codes plus one copy of each distinct label, which often cuts memory by an order of magnitude, and `groupby`, `sort_values` and joins on the column become faster because they operate on the codes. It also lets you define a meaningful order for ordinal data such as small/medium/large, which makes comparison and sorting behave correctly. The problems are real too. The category set is fixed at creation, so assigning an unseen value raises unless you call `cat.add_categories`. Concatenating two frames whose categories differ can silently fall back to `object`. Operations between categorical and non-categorical columns sometimes materialise the labels anyway, losing the saving. And a high-cardinality column such as a free-text field gains nothing and costs an extra dictionary. The practical rule is to convert late, after cleaning, and only where the distinct count is a small fraction of the row count.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A table of orders has a genuine `order_id` and was loaded twice, but the second load has slightly different `loaded_at` timestamps. Write code that removes the duplicates, keeping the earliest load, and report how many rows were removed.',
        hint: 'Sort so the row you want to keep comes first, then deduplicate on the business key.',
        solution:
          'before = len(df)\ndf = df.sort_values("loaded_at").drop_duplicates(subset=["order_id"], keep="first")\nprint(f"removed {before - len(df)} duplicate rows")\n\nDeduplicating on the full row would fail here, because `loaded_at` differs, so the exact copies are not exact. The business key is `order_id`, and sorting by `loaded_at` before dropping is what makes "keep the earliest" true rather than accidental — without the sort, `keep="first"` simply keeps whichever row happened to appear first in the file.',
      },
      {
        prompt:
          'A `city` column contains "London", " london ", "LONDON" and "Londn". Write the cleaning steps, and explain which problem each step does and does not solve.',
        hint: 'Three of the four differ only in presentation. The fourth does not.',
        solution:
          'df["city"] = df["city"].str.strip().str.lower()\n\nThat collapses the first three into "london" because they differ only in whitespace and case, both of which follow a rule a computer can apply. It does nothing for "londn", which is a typo and carries no rule. That needs either an explicit mapping, df["city"] = df["city"].replace({"londn": "london"}), or, at scale, a controlled vocabulary of valid cities with a fuzzy match reporting anything that fails to match for human review. Distinguishing rule-based normalisation from error correction is the point: they are different jobs and only one of them can be automated safely.',
      },
      {
        prompt:
          'Explain why `df["qty"].astype(int)` raises on a column containing NaN, and give two correct alternatives with their trade-offs.',
        hint: 'What range of values can a NumPy int64 represent?',
        solution:
          'NumPy\'s int64 has no representation for a missing value, so pandas raises "Cannot convert non-finite values (NA or inf) to integer" rather than inventing one. Alternative one: `astype("Int64")`, the nullable integer dtype, which keeps the gaps as `<NA>` and prints counts as integers — the right choice when missing genuinely means unknown. Alternative two: decide what a missing quantity means and fill it first, for example `df["qty"].fillna(0).astype(int)` — correct only when absence really means zero, and worth pairing with an indicator column so the fill remains visible. What you should not do is `astype(float)` and carry on, which leaves you comparing quantities like 3.0000000001 and printing counts with decimal points.',
      },
    ],

    quiz: [
      {
        id: 'PD-007-q1',
        type: 'mcq',
        concept: 'drop_duplicates',
        prompt: 'What does `df.drop_duplicates(subset=["email"], keep="last")` do?',
        options: [
          'Keeps the last occurrence of each email in the frame\'s current order and removes the earlier ones',
          'Keeps only emails that appear exactly once',
          'Removes every row whose email appears more than once',
          'Sorts by email and keeps the alphabetically last row',
        ],
        answerIndex: 0,
        explanation:
          'It groups by the subset and keeps the final row of each group as the frame is currently ordered. Because order decides the outcome, sorting before deduplication is how you control which record survives.',
      },
      {
        id: 'PD-007-q2',
        type: 'code-output',
        language: 'python',
        concept: 'to_numeric coerce',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ns = pd.Series(["1", "2", "three", "4"])\nprint(pd.to_numeric(s, errors="coerce").sum())',
        options: ['7.0', '10.0', 'nan', 'It raises a ValueError'],
        answerIndex: 0,
        explanation:
          '"three" is coerced to NaN, and `sum()` skips missing values by default, so the total is 1 + 2 + 4 = 7.0. The dtype is float because NaN cannot be held in an int64 column.',
      },
      {
        id: 'PD-007-q3',
        type: 'truefalse',
        concept: 'str accessor',
        prompt: '`df["city"].str.lower()` raises an error on rows where the city is missing.',
        answer: false,
        explanation:
          'The `.str` accessor propagates missing values, returning NaN for them rather than raising. That is one reason to prefer it over `apply(str.lower)`, which fails with AttributeError on `None`.',
      },
      {
        id: 'PD-007-q4',
        type: 'multi',
        concept: 'category dtype',
        prompt: 'Which statements about the `category` dtype are true? Select all that apply.',
        options: [
          'It stores integer codes plus one copy of each distinct label',
          'It usually saves substantial memory on low-cardinality text columns',
          'Assigning a value outside the existing categories raises unless you add it first',
          'It is a good choice for a free-text notes column',
          'It can define a meaningful order for ordinal values such as small/medium/large',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Category is designed for low-cardinality, repeated labels. A free-text column has nearly as many distinct values as rows, so the code table gives no saving and adds overhead.',
      },
      {
        id: 'PD-007-q5',
        type: 'debug',
        language: 'python',
        concept: 'nullable integers',
        prompt: 'This raises "Cannot convert non-finite values (NA or inf) to integer". What is the correct minimal fix if the gaps genuinely mean unknown?',
        code: 'df["qty"] = df["qty"].astype(int)',
        options: [
          'df["qty"] = df["qty"].astype("Int64")',
          'df["qty"] = df["qty"].astype(float).astype(int)',
          'df["qty"] = df["qty"].fillna(0).astype(int)',
          'df["qty"] = pd.to_numeric(df["qty"], errors="ignore")',
        ],
        answerIndex: 0,
        explanation:
          'The nullable `Int64` dtype can hold `<NA>`, so the gaps stay visible as gaps. Filling with zero would be wrong here because it asserts a quantity of zero rather than an unknown one.',
      },
      {
        id: 'PD-007-q6',
        type: 'explain',
        concept: 'normalisation versus correction',
        prompt: 'Explain the difference between normalising text and correcting it, and why the distinction matters operationally.',
        rubric: [
          'Defines normalisation as applying a deterministic rule such as case-folding or trimming',
          'Defines correction as fixing values that carry no rule, such as typos',
          'Explains why correction needs a mapping, a vocabulary or human review rather than automation',
        ],
        sampleAnswer:
          'Normalisation applies a rule that is always true: trimming whitespace, folding case, collapsing internal spaces. It is safe to automate because "LONDON" and " london " are the same value in any reading, and the transformation is reversible in the sense that no information about identity is lost. Correction is different: "Londn" is not a presentational variant of "London", it is a mistake, and no rule derives one from the other without a guess. That means corrections need an explicit mapping, a controlled vocabulary or a human in the loop, and the mapping becomes a maintained artefact that is reviewed and version controlled. Operationally the distinction matters because normalisation can run silently in a pipeline while correction should report what it changed and flag what it could not match.',
        explanation:
          'Treating a fuzzy correction as though it were a deterministic rule is how a cleaning step starts quietly changing data in ways nobody has reviewed.',
      },
    ],

    flashcards: [
      { front: 'What decides whether two rows are duplicates?', back: 'The `subset` you choose — the columns that define identity, usually a business key rather than every column.' },
      { front: '`astype` versus `to_numeric(errors="coerce")`', back: '`astype` raises on the first bad value; `coerce` turns bad values into NaN. Use coerce to diagnose, astype to enforce.' },
      { front: 'Why not leave `errors="coerce"` in production?', back: 'It silently converts new corruption into missing data instead of failing, so nobody finds out.' },
      { front: 'Why use `.str.strip()` not `.apply(str.strip)`?', back: 'The accessor is vectorised and skips missing values; `apply` is slow and raises AttributeError on None.' },
      { front: 'When should you convert to `category`?', back: 'Last, after cleaning, and only when the distinct count is a small fraction of the row count.' },
      { front: 'How do you keep an integer column that has gaps?', back: 'Use the nullable dtype: `astype("Int64")` with a capital I. Plain int64 cannot represent a missing value.' },
    ],

    challenge: {
      title: 'A cleaning function with a change log',
      brief:
        'Write `clean_orders(df)` that returns a cleaned frame and a log of what it changed: how many rows were removed as duplicates on `order_id`, how many price strings failed numeric conversion and what they were, how many city values were changed by normalisation, and which city values could not be matched against a supplied list of valid cities. The function must not silently alter anything it does not report.',
      language: 'python',
      acceptanceCriteria: [
        'Returns both the cleaned DataFrame and a structured log of every change',
        'Deduplicates on a business key after an explicit sort',
        'Diagnoses failed numeric conversions before converting, and reports the offending raw values',
        'Distinguishes rule-based normalisation from unmatched values needing human review',
      ],
      starterCode:
        'import pandas as pd\n\nVALID_CITIES = {"london", "leeds", "manchester"}\n\n\ndef clean_orders(df: pd.DataFrame) -> tuple[pd.DataFrame, dict]:\n    log: dict = {}\n    out = df.copy()\n    return out, log\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me the three cleaning problems that appear in nearly every dataset and how to deal with each.',
      mustCover: [
        'Duplicates, and that the subset of columns defining a duplicate is a business decision',
        'Type conversion, and the difference between raising and coercing on bad values',
        'Text inconsistency, and how the `.str` accessor normalises a whole column at once',
        'That normalisation follows a rule while typo correction needs an explicit mapping',
      ],
      bonusSignals: ['mentions sorting before drop_duplicates', 'mentions nullable Int64 for integers with gaps', 'mentions category dtype for low-cardinality text'],
      sampleExplanation:
        'Nearly every dataset arrives with the same three problems. Rows repeat, because an extract was loaded twice or a join multiplied them; the fix is `drop_duplicates`, but the real work is deciding which columns define a duplicate — usually a business key such as an order id, not the whole row, because the whole row often differs by a timestamp. Sort first, so you control which copy survives. Types are wrong, because a price came in as "£24.99" and the whole column is therefore text; the technique is to run `to_numeric` with `errors="coerce"` first, purely to list the values that fail, fix those causes with `.str.replace`, then convert strictly so that next month\'s new kind of corruption raises instead of quietly becoming a gap. And text is inconsistent, because people typed it: "London", " london " and "LONDON" are three values to the computer and one city to you, so a grouping reports three cities until you `.str.strip().str.lower()`. That last step is the one whose absence silently ruins an analysis rather than breaking it. One caution: stripping and lowercasing follow a rule, but "Londn" is a typo and no rule turns it into "London" — that needs an explicit mapping and, at scale, a list of valid values with anything unmatched reported for review.',
    },
  },

  {
    id: 'PD-008',
    domain: 'PD',
    module: 'Cleaning',
    topic: 'Outliers and validation',
    title: 'Outliers and Sanity Checks',
    slug: 'outliers-and-sanity-checks',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['PD-005', 'PD-007'],
    related: ['PD-006'],
    tags: ['outliers', 'iqr', 'z-score', 'validation', 'winsorising', 'data-quality'],

    learningObjectives: [
      'Flag candidate outliers using the IQR rule and the z-score, and state the assumptions each one makes',
      'Explain why domain rules catch errors that statistical rules cannot, and vice versa',
      'Decide between keeping, capping, transforming and removing an extreme value, with a stated justification',
      'Write sanity checks that run every time the data is loaded, rather than once by eye',
    ],

    terminology: [
      {
        term: 'Outlier',
        definition:
          'An observation far from the bulk of the data. It may be a measurement error, a data-handling error, or a genuine rare event — the label says nothing about which.',
        simple: 'A value that sits a long way from the rest.',
      },
      {
        term: 'IQR rule',
        definition:
          'Flags values below Q1 minus 1.5 times the interquartile range or above Q3 plus 1.5 times it. Based on quantiles, so it is not distorted by the extremes it is detecting.',
        simple: 'Anything well outside the middle half of the data gets flagged.',
      },
      {
        term: 'z-score',
        definition:
          'The number of standard deviations a value lies from the mean. Assumes a roughly symmetric distribution, and both its inputs are themselves affected by outliers.',
        simple: 'How many typical steps away from average a value is.',
      },
      {
        term: 'Winsorising / clipping',
        definition:
          'Capping extreme values at a chosen percentile instead of removing the rows, keeping the sample size while limiting the influence of the tails.',
        simple: 'Pulling the most extreme values back to a maximum you choose.',
      },
      {
        term: 'Sanity check',
        definition:
          'An assertion encoding what must be true of valid data — non-negative prices, ages under 130, dates inside a plausible window — evaluated automatically on every load.',
        simple: 'An automatic test that the data is not obviously impossible.',
      },
    ],

    simpleExplanation:
      "An outlier is just a value a long way from the others, and the word tells you nothing about what to do with it. A recorded temperature of 950 degrees is a broken sensor. A transaction of two million pounds might be a typo, or it might be the largest and most interesting sale of the year. Statistics can point at both, but it cannot tell them apart, so the detection step and the decision step must stay separate in your mind. Two detectors cover most cases. The IQR rule looks at the middle half of the data and flags anything far outside it, which works on skewed data because it is built from quantiles. The z-score counts standard deviations from the mean, which is fine when the data is roughly symmetric and poor when it is not — partly because one enormous value inflates the very standard deviation being used to judge it. And running alongside both, the most valuable check of all is the least statistical: prices cannot be negative, ages cannot exceed 130, an order cannot be delivered before it was placed. Domain rules catch errors that sit comfortably inside the normal range and no statistic will ever notice.",

    whyItExists:
      'A single mistyped value can move a mean, blow up a regression coefficient and flow into every downstream report, and it will not announce itself. Systematic detection turns "the numbers look odd" into a reproducible procedure, while explicit sanity checks encode what the business knows about valid data so that impossible values fail at ingest rather than surfacing in a board pack.',

    analogy: {
      scenario:
        'Imagine a hospital reviewing its patient records and finding a recorded weight of 700 kilograms and a recorded height of 2.4 metres. The weight is impossible and is certainly a data-entry error, probably a unit or a decimal point. The height is extraordinary but not impossible — the tallest recorded person exceeded it — so it deserves a check against the source rather than deletion. A rule that simply deleted both would remove one error and one real patient, and the register would look tidier while being less true.',
      mapping: [
        { from: 'The 700 kg weight', to: 'A value outside the physically possible range, caught by a domain rule' },
        { from: 'The 2.4 m height', to: 'A statistical outlier that may be genuine, caught by IQR or z-score' },
        { from: 'Checking the original chart', to: 'Going back to the source system before deciding' },
        { from: 'Deleting both to tidy the register', to: 'Blanket outlier removal, which silently discards real observations' },
        { from: 'Recording that a value was corrected and why', to: 'A cleaning log that keeps the decision auditable' },
      ],
      bridge:
        'The hospital case separates the two jobs precisely. Detection is mechanical and can be automated: a domain rule says 700 kg cannot be a human weight, and the IQR rule says 2.4 m is far from the bulk of heights. The decision is not mechanical, because only knowledge outside the dataset distinguishes an impossible value from a rare one. This is why the honest workflow is flag, investigate, decide, and record — and why an automatic filter that drops everything beyond three standard deviations is a way of not making the decision while appearing to.',
      limitations:
        'Hospital measurements have known physical bounds. Financial data, network traffic and insurance claims are heavy-tailed by nature, so extreme values are expected rather than suspicious, and applying a normal-distribution rule to them flags a steady stream of perfectly genuine observations.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'From flagged value to decision',
        caption: 'Detection is automatic; the decision is not.',
        branching: true,
        steps: [
          { label: 'Flag candidates', detail: 'Apply the IQR rule, a z-score threshold, and the domain rules, keeping the results as separate boolean columns.' },
          { label: 'Look at the rows', detail: 'Print them. A pattern — all from one sensor, all on one date, all exactly 999 — is usually the real finding.' },
          { label: 'Impossible under a domain rule?', detail: 'Negative price, delivery before order, age of 300: fix at the source or set to missing with a logged reason.' },
          { label: 'Extreme but possible?', detail: 'Keep it. Consider a log transform or a robust model rather than deleting a genuine observation.' },
          { label: 'Influential and uncertain?', detail: 'Cap at a percentile, or run the analysis with and without it and report whether the conclusion changes.' },
          { label: 'Record the decision', detail: 'Every removal or cap goes in a cleaning log with a count and a reason, so the analysis remains reproducible.' },
        ],
      },
      {
        kind: 'compare',
        title: 'IQR rule versus z-score',
        caption: 'Same goal, very different assumptions.',
        left: {
          heading: 'IQR (Tukey) rule',
          points: [
            'Built from quartiles, so extremes do not distort the thresholds',
            'Works on skewed data',
            'Bounds: Q1 − 1.5 × IQR and Q3 + 1.5 × IQR',
            'Flags roughly 0.7 per cent of a perfectly normal sample',
          ],
        },
        right: {
          heading: 'z-score',
          points: [
            'Uses mean and standard deviation, both inflated by the outliers themselves',
            'Assumes a roughly symmetric, light-tailed distribution',
            'A single extreme value can hide itself by raising the standard deviation',
            'Use the modified z-score based on the median absolute deviation instead',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Sanity checks worth writing down',
        caption: 'These catch errors that live comfortably inside the statistical range.',
        columns: ['Check', 'Expression', 'What it catches'],
        rows: [
          ['Non-negative amounts', 'df["amount"].ge(0).all()', 'Sign errors and refunds recorded as sales'],
          ['Plausible ages', 'df["age"].between(0, 120).all()', 'Year-of-birth pasted into an age field'],
          ['Ordered events', 'df["delivered_at"].ge(df["placed_at"]).all()', 'Timezone mistakes and swapped columns'],
          ['Known categories', 'df["channel"].isin(VALID).all()', 'New enum values added upstream without notice'],
          ['Unique keys', 'not df["order_id"].duplicated().any()', 'Double-loaded extracts and bad joins'],
          ['Percentages in range', 'df["rate"].between(0, 1).all()', 'A column that switched from a fraction to a percentage'],
          ['No sentinel values', 'not df["age"].isin([-1, 999]).any()', 'Legacy systems encoding "unknown" as a number'],
        ],
      },
      {
        kind: 'widget',
        title: 'Outlier sandbox',
        caption: 'Move a single extreme value and watch the mean, the standard deviation and the IQR bounds respond.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'An outlier is an observation lying outside a chosen inlier region. The Tukey rule defines that region as the closed interval between Q1 minus k times the interquartile range and Q3 plus k times it, with k conventionally 1.5. The z-score rule defines it as observations within c standard deviations of the mean, conventionally c = 3. Both are detection criteria only: neither licenses removal, which requires an external judgement about whether the observation is erroneous or merely rare.',

    math: {
      intuition:
        'Both rules answer "how far from typical is this?" but they measure typical differently. The IQR rule takes the middle half of the data — the distance from the 25th to the 75th percentile — as its unit of spread, and asks how many of those units a value sits beyond the middle half. Because quartiles ignore how extreme the extremes are, one enormous value cannot widen the ruler used to judge it. The z-score instead uses the mean and standard deviation, which are both pulled by every observation including the suspicious one, so a single very large value inflates the standard deviation and can end up with a z-score comfortably under 3 — masking itself. That is the practical reason to prefer the IQR rule, or the median-based modified z-score, for detection.',
      formulas: [
        {
          latex: 'IQR = Q_3 - Q_1',
          name: 'Interquartile range',
          meaning: 'The width of the middle half of the data, used as a robust measure of spread.',
          variables: [
            { symbol: 'Q_1', meaning: 'The 25th percentile: the value below which a quarter of the observations fall' },
            { symbol: 'Q_3', meaning: 'The 75th percentile: the value below which three quarters fall' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\text{outlier if } x < Q_1 - k\\,IQR \\;\\text{ or }\\; x > Q_3 + k\\,IQR',
          name: 'Tukey fence',
          meaning: 'Flags observations lying more than k interquartile ranges outside the middle half.',
          variables: [
            { symbol: 'x', meaning: 'The observation being tested' },
            { symbol: 'k', meaning: 'The fence multiplier; 1.5 marks candidates, 3.0 marks far outliers' },
            { symbol: 'IQR', meaning: 'The interquartile range, Q3 minus Q1' },
          ],
          category: 'statistics',
        },
        {
          latex: 'z = \\frac{x - \\mu}{\\sigma}',
          name: 'z-score',
          meaning: 'How many standard deviations an observation lies from the mean.',
          variables: [
            { symbol: 'x', meaning: 'The observation' },
            { symbol: '\\mu', meaning: 'The sample mean, itself sensitive to extreme values' },
            { symbol: '\\sigma', meaning: 'The sample standard deviation, also inflated by extreme values' },
          ],
          category: 'statistics',
        },
        {
          latex: 'M_i = \\frac{0.6745\\,(x_i - \\tilde{x})}{\\mathrm{MAD}}, \\quad \\mathrm{MAD} = \\mathrm{median}(|x_i - \\tilde{x}|)',
          name: 'Modified z-score',
          meaning: 'A robust alternative that replaces the mean with the median and the standard deviation with the median absolute deviation.',
          variables: [
            { symbol: 'x_i', meaning: 'The observation being scored' },
            { symbol: '\\tilde{x}', meaning: 'The sample median, unaffected by how extreme the extremes are' },
            { symbol: '\\mathrm{MAD}', meaning: 'The median of the absolute deviations from the median' },
            { symbol: '0.6745', meaning: 'A scaling constant making MAD comparable to a standard deviation for normal data' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'For a normal distribution, Q1 and Q3 lie about 0.6745 standard deviations either side of the mean, so IQR is approximately 1.349 sigma.',
        'The upper Tukey fence is therefore Q3 + 1.5 × IQR ≈ 0.6745σ + 2.0235σ ≈ 2.698σ above the mean.',
        'The probability of exceeding roughly 2.7 standard deviations on either side of a normal distribution is about 0.7 per cent.',
        'So on genuinely normal data the 1.5 IQR rule flags about 7 observations in every 1000 — which is why a 50,000-row table will always produce a few hundred "outliers" that are nothing of the sort.',
        'The k = 3.0 fence corresponds to roughly 4.7 standard deviations, flagging about 2 observations in a million, which is the threshold to use when you want genuine extremes rather than candidates.',
      ],
    },

    workedExample: {
      title: 'Applying the IQR rule to a small set of order amounts',
      setup:
        'Eleven order amounts in pounds, sorted: 8, 12, 15, 18, 22, 25, 28, 31, 40, 55, 2400. The last value is a suspected data-entry error — possibly 24.00 typed without the decimal point.',
      steps: [
        {
          label: 'Find the quartiles',
          detail: 'With 11 values, the median is the 6th value, 25. Q1 is the median of the lower five (8, 12, 15, 18, 22), which is 15. Q3 is the median of the upper five (28, 31, 40, 55, 2400), which is 40.',
        },
        {
          label: 'Compute the interquartile range',
          detail: 'IQR = Q3 − Q1 = 40 − 15 = 25. Note how little the value 2400 affected this: it moved Q3 only as far as being one of the top five values allows.',
          latex: 'IQR = 40 - 15 = 25',
        },
        {
          label: 'Build the fences',
          detail: 'Lower fence = 15 − 1.5 × 25 = −22.5. Upper fence = 40 + 1.5 × 25 = 77.5.',
          latex: 'Q_1 - 1.5\\,IQR = -22.5, \\quad Q_3 + 1.5\\,IQR = 77.5',
        },
        {
          label: 'Flag',
          detail: 'Only 2400 lies outside [−22.5, 77.5], so exactly one value is flagged. The 55 sits comfortably inside and is not disturbed.',
        },
        {
          label: 'Compare with the z-score',
          detail: 'The mean of these eleven values is about 241.3 and the standard deviation about 716.1, so 2400 has z ≈ 3.01 — barely over the usual cutoff of 3, and it would fall under the cutoff entirely if the suspect value were 2000 instead. The single extreme value inflated the standard deviation being used to judge it.',
          latex: 'z = \\frac{2400 - 241.3}{716.1} \\approx 3.01',
        },
        {
          label: 'Decide',
          detail: 'The IQR rule flagged it cleanly. Now the non-statistical question: is 2400 a plausible order for this business? If the largest genuine order ever placed was 300, this is an error to investigate at source, and the likely cause is a missing decimal point.',
        },
      ],
      conclusion:
        'The IQR rule identified the suspect value decisively while the z-score barely noticed it, which is the masking effect in miniature: the mean and standard deviation are computed from the same data that contains the outlier, so an extreme value partially conceals itself. Detection, however, is only half the work — the decision to correct 2400 rests on knowing what this business sells, not on either statistic.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Flagging with the IQR rule and the z-score, and comparing them',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "order_id": range(1, 12),
    "amount": [8, 12, 15, 18, 22, 25, 28, 31, 40, 55, 2400],
})

q1, q3 = orders["amount"].quantile([0.25, 0.75])
iqr = q3 - q1
lo, hi = q1 - 1.5 * iqr, q3 + 1.5 * iqr

z = (orders["amount"] - orders["amount"].mean()) / orders["amount"].std()

orders["iqr_flag"] = ~orders["amount"].between(lo, hi)
orders["z_flag"] = z.abs() > 3

print(f"Q1={q1}  Q3={q3}  IQR={iqr}  fences=({lo}, {hi})")
print(f"mean={orders['amount'].mean():.1f}  std={orders['amount'].std():.1f}")
print()
print(orders[orders["iqr_flag"] | orders["z_flag"]])
print()
print("flagged by IQR:", int(orders["iqr_flag"].sum()),
      "| flagged by z:", int(orders["z_flag"].sum()))`,
        output: `Q1=15.0  Q3=40.0  IQR=25.0  fences=(-22.5, 77.5)
mean=241.3  std=716.1

    order_id  amount  iqr_flag  z_flag
10        11    2400      True    True

flagged by IQR: 1 | flagged by z: 1`,
        explanation:
          'Look at the printed mean and standard deviation: one value of 2400 dragged the mean of a set of roughly 25-pound orders up to 241 and the standard deviation to 716. That is the masking problem made visible — the z-score of 2400 is about 3.01, so it only just clears the conventional threshold, and a slightly smaller error would hide entirely. The IQR fences, built from quartiles, sit at −22.5 and 77.5 and are barely affected by the extreme value at all. Note also that the code keeps the flags as columns rather than filtering: at this stage you want to look at the flagged rows, not lose them.',
      },
      {
        language: 'python',
        title: 'Domain rules catch what statistics cannot',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "order_id":  [1, 2, 3, 4, 5],
    "amount":    [24.99, -50.00, 31.00, 18.50, 27.00],
    "age":       [34, 41, 999, 29, 52],
    "placed_at": pd.to_datetime(["2026-03-01", "2026-03-02", "2026-03-02",
                                 "2026-03-03", "2026-03-04"]),
    "delivered_at": pd.to_datetime(["2026-03-03", "2026-03-05", "2026-03-04",
                                    "2026-03-02", "2026-03-06"]),
})

checks = {
    "amount must be non-negative": orders["amount"] < 0,
    "age must be under 120":       orders["age"] >= 120,
    "delivery after order":        orders["delivered_at"] < orders["placed_at"],
}

for label, failed in checks.items():
    n = int(failed.sum())
    status = "PASS" if n == 0 else f"FAIL ({n} rows)"
    print(f"{label:30s} {status}")
    if n:
        print(orders.loc[failed, ["order_id", "amount", "age", "placed_at", "delivered_at"]]
              .to_string(index=False))`,
        output: `amount must be non-negative    FAIL (1 rows)
 order_id  amount  age  placed_at delivered_at
        2   -50.0   41 2026-03-02   2026-03-05
age must be under 120          FAIL (1 rows)
 order_id  amount  age  placed_at delivered_at
        3    31.0  999 2026-03-02   2026-03-04
delivery after order           FAIL (1 rows)
 order_id  amount  age  placed_at delivered_at
        4    18.5  29 2026-03-03   2026-03-02`,
        explanation:
          'None of these three failures would be reliably caught by a statistical rule. The negative amount is small in magnitude, so no fence flags it, yet it silently reduces total revenue — it is probably a refund posted to the wrong column. The age of 999 is a sentinel value from a legacy system meaning "unknown", and in a large table its z-score may not clear a threshold while it certainly ruins a mean age. The delivery before the order is not an extreme value in any column at all; the error only exists in the relationship between two columns, which is a class of problem no univariate detector can see. This is why domain rules belong beside the statistical ones, and why expressing them as a named dictionary of checks makes the report readable.',
      },
      {
        language: 'python',
        title: 'Four responses to an extreme value, and what each does to the statistics',
        runnable: true,
        code: `import pandas as pd
import numpy as np

s = pd.Series([8, 12, 15, 18, 22, 25, 28, 31, 40, 55, 2400], name="amount")

q1, q3 = s.quantile([0.25, 0.75])
iqr = q3 - q1
keep = s.between(q1 - 1.5 * iqr, q3 + 1.5 * iqr)

options = {
    "keep as is":        s,
    "remove flagged":    s[keep],
    "cap at 99th pct":   s.clip(upper=s.quantile(0.99)),
    "log1p transform":   np.log1p(s),
}

for label, values in options.items():
    print(f"{label:18s} n={len(values):2d}  mean={values.mean():8.2f}  "
          f"median={values.median():6.2f}  std={values.std():8.2f}")`,
        output: `keep as is         n=11  mean=  241.27  median= 25.00  std=  716.09
remove flagged     n=10  mean=   25.40  median= 23.50  std=   14.08
cap at 99th pct    n=11  mean=  219.95  median= 25.00  std=  645.40
log1p transform    n=11  mean=    3.57  median=  3.26  std=    1.49`,
        explanation:
          'Four defensible treatments, four different datasets. Removing the flagged row changes the mean from 241 to 25, which shows how much a single value was carrying — and is exactly why the decision cannot be automated away. Capping at the 99th percentile barely helps here because with eleven values the 99th percentile is still close to the extreme; percentile capping needs a reasonable sample size to mean anything. The log transform keeps every observation while compressing the scale, which is usually the right move for naturally heavy-tailed quantities such as income, transaction size or page views, because the extreme values are real and the problem is only that a linear model gives them too much leverage. Note that the median barely moves across the first three options: robust statistics are how you describe data you do not yet trust.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Fraud and anomaly detection',
        usage:
          'Here the outliers are the product, not the noise. Removing them destroys the signal, so the pipeline flags and routes them for review rather than cleaning them away.',
      },
      {
        context: 'Sensor networks',
        usage:
          'A stuck sensor reports the same value or a physically impossible one. Domain bounds — a thermocouple that cannot read above 1200 degrees — catch this immediately, while a z-score on a long run of identical readings catches nothing.',
      },
      {
        context: 'Property and salary data',
        usage:
          'Prices are heavy-tailed by nature, so IQR fences flag a steady stream of genuine luxury properties. Practitioners model log price instead of trimming, keeping every observation while stopping a few mansions from dominating the fit.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`quantile`, `clip`, `between` and boolean flags are the whole toolkit for detection and capping.' },
      { tool: 'scikit-learn', role: '`RobustScaler` scales by the median and IQR, and `IsolationForest` and `LocalOutlierFactor` detect multivariate outliers that no single column reveals.' },
      { tool: 'pandera / Great Expectations', role: 'Turn domain rules into a schema that runs on every load, so impossible values fail at ingest rather than in a report.' },
    ],

    commonMistakes: [
      {
        mistake: 'Deleting everything beyond three standard deviations as a routine step',
        why: 'On heavy-tailed data this removes a stream of genuine observations, biases the sample towards the middle and understates variance. It also silently changes the population your conclusions apply to.',
        fix: 'Flag rather than delete, look at the flagged rows, and remove only values you can argue are erroneous. Record the count and the reason.',
      },
      {
        mistake: 'Trusting the z-score on skewed data',
        why: 'The mean and standard deviation are both computed from data containing the outlier, so one extreme value inflates the denominator and partially conceals itself — the masking effect.',
        fix: 'Use the IQR rule or the median-based modified z-score for detection on skewed or heavy-tailed columns.',
      },
      {
        mistake: 'Computing outlier thresholds on the full dataset before splitting',
        why: 'The fences are fitted using test rows, so information leaks into training and the reported performance is optimistic and not reproducible at inference.',
        fix: 'Fit thresholds on the training fold and apply the stored values elsewhere, exactly as you would with an imputer or a scaler.',
      },
      {
        mistake: 'Checking only one column at a time',
        why: 'Many errors are relational: a delivery date before an order date, a unit price inconsistent with amount divided by quantity. Every individual value is unremarkable.',
        fix: 'Write cross-column sanity checks alongside the univariate ones, and consider a multivariate detector such as IsolationForest when relationships matter.',
      },
      {
        mistake: 'Treating sentinel values as numbers',
        why: 'Legacy systems encode "unknown" as -1, 999 or 9999, and these sit inside the numeric range, corrupt means and may never trip a fence.',
        fix: 'Ask what the sentinels are, convert them to genuine missing values at load time, and add a check asserting they no longer appear.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'How would you detect outliers in a column, and what would you do with them?',
        answer:
          'I would use the IQR rule as the default: compute Q1 and Q3, take the interquartile range, and flag anything below Q1 minus 1.5 IQR or above Q3 plus 1.5 IQR. It is quantile-based, so the extreme values do not distort the thresholds used to detect them, which is a real weakness of the z-score. Alongside that I would apply domain rules — non-negative prices, plausible ages, dates in order — because those catch errors that sit inside the statistical range. Then the important part: I would flag, not delete. I would print the flagged rows and look for a pattern, since flagged rows that all come from one sensor or one date point at a systematic problem rather than eleven independent oddities. Removal only follows if I can argue the value is erroneous, and I would record how many rows were removed and why.',
      },
      {
        level: 'intermediate',
        question: 'Why can the z-score fail to flag an obvious outlier?',
        answer:
          'Because both of its inputs are computed from data that includes the outlier. A single very large value raises the mean towards itself and inflates the standard deviation, and since the standard deviation is the denominator, the value\'s own z-score is pulled down. With a small sample the effect is severe: in a set of eleven roughly 25-pound orders plus one of 2400, the standard deviation becomes about 716 and the extreme value scores only about 3.0, barely clearing the conventional threshold. Several outliers together make it worse, masking one another entirely. The robust alternatives fix this by using statistics the extremes cannot move: the IQR rule uses quartiles, and the modified z-score uses the median and the median absolute deviation, scaled by 0.6745 so the numbers remain comparable to ordinary z-scores.',
        followUp:
          'A strong answer mentions that the converse problem, swamping, also exists: a tight cluster of extreme values can shift the thresholds so that genuinely normal points are flagged.',
      },
      {
        level: 'ml-engineer',
        question: 'A model degrades in production and monitoring shows the input distribution has not shifted. How could outlier handling be involved?',
        answer:
          'Several ways. If outlier thresholds were computed on the full historical dataset and hard-coded, they encode a distribution that no longer holds, so the capping now truncates ordinary values — the inputs look stable precisely because they are being clipped. If the training pipeline removed extreme rows but the serving path does not, the model meets a class of input it never saw during training, and its behaviour there is untested by construction. If clipping is applied at serving but the clip bounds were fitted including validation data, the offline evaluation was optimistic to begin with. The structural fix is the same as for imputation: the outlier policy is a fitted transformer inside the pipeline, serialised with the model, applied identically in training and serving, and monitored — track the proportion of inputs being clipped, since a rise in that rate is an early warning that the world has moved even when the post-clipping distribution looks reassuringly unchanged.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given amounts 10, 12, 14, 15, 18, 20, 22, 25, 30, 500, compute the IQR fences by hand and say which values are flagged.',
        hint: 'Ten values: the median splits them into two halves of five, and each half has its own median.',
        solution:
          'Sorted, the lower half is 10, 12, 14, 15, 18 so Q1 = 14; the upper half is 20, 22, 25, 30, 500 so Q3 = 25. IQR = 25 − 14 = 11. The fences are 14 − 16.5 = −2.5 and 25 + 16.5 = 41.5. Only 500 falls outside, so exactly one value is flagged. Notice that the enormous value moved Q3 only from, say, 22 to 25 — being one of the top five is all it can contribute, which is precisely the robustness the rule is built on.',
      },
      {
        prompt:
          'Write three domain sanity checks for a table of hotel bookings with columns `checkin`, `checkout`, `nights`, `guests` and `total_price`, and explain what each catches that a statistical rule would not.',
        hint: 'Look for relationships between columns, not just extreme values within one.',
        solution:
          '(df["checkout"] > df["checkin"]).all() catches swapped or mis-parsed dates, which are ordinary-looking dates individually.\n((df["checkout"] - df["checkin"]).dt.days == df["nights"]).all() catches an inconsistency between a stored duration and the dates it is meant to summarise — every value plausible, the combination impossible.\ndf["guests"].between(1, 10).all() and (df["total_price"] > 0).all() catch a zero-guest booking and a zero or negative price, neither of which is statistically extreme.\n\nAll three are relational or bounded-domain facts that live outside the data, which is exactly the category of error that fences and z-scores cannot reach.',
      },
      {
        prompt:
          'A colleague filters `df = df[np.abs(zscore(df["income"])) < 3]` as a standard cleaning step on a salary dataset. Give two reasons to object and propose an alternative.',
        hint: 'What shape does an income distribution have, and what is being fitted on what?',
        solution:
          'First, income is strongly right-skewed, so a symmetric rule built on the mean and standard deviation flags a steady stream of genuine high earners; the removal is systematic rather than random and it biases every estimate downward. Second, the threshold is fitted on the whole dataset, so if this runs before a train/test split it leaks test information, and the same line cannot be reproduced at inference where no distribution is available. A better approach is to model log income, which compresses the tail while keeping every observation, or to use a robust model, and to reserve deletion for values that fail a domain rule such as a negative salary. If capping is genuinely needed, fit the percentile bounds inside the pipeline on the training fold and monitor how often they bind.',
      },
    ],

    quiz: [
      {
        id: 'PD-008-q1',
        type: 'numeric',
        concept: 'iqr fences',
        prompt: 'For a column with Q1 = 20 and Q3 = 60, what is the upper Tukey fence using the conventional multiplier of 1.5?',
        answer: 120,
        tolerance: 0.01,
        explanation:
          'IQR = 60 − 20 = 40, and the upper fence is Q3 + 1.5 × IQR = 60 + 60 = 120. The lower fence would be 20 − 60 = −40, which for a non-negative quantity means the rule flags nothing at the bottom.',
      },
      {
        id: 'PD-008-q2',
        type: 'mcq',
        concept: 'robustness',
        prompt: 'Why is the IQR rule usually preferred to the z-score for detecting outliers?',
        options: [
          'It is built from quartiles, so the extreme values do not distort the thresholds used to detect them',
          'It is faster to compute on large datasets',
          'It always flags more values, so nothing is missed',
          'It works only on normally distributed data, which is the common case',
        ],
        answerIndex: 0,
        explanation:
          'The mean and standard deviation are both moved by the outlier, so an extreme value inflates its own denominator and can mask itself. Quartiles are insensitive to how extreme the extremes are.',
      },
      {
        id: 'PD-008-q3',
        type: 'truefalse',
        concept: 'outlier treatment',
        prompt: 'Any value flagged by the IQR rule should be removed from the dataset.',
        answer: false,
        explanation:
          'Detection is not a decision. On a normal distribution the 1.5 IQR rule flags about 0.7 per cent of observations, and on heavy-tailed data far more, most of them genuine. Removal needs an argument that the value is erroneous.',
      },
      {
        id: 'PD-008-q4',
        type: 'multi',
        concept: 'sanity checks',
        prompt: 'Which problems would a domain sanity check catch that an IQR rule on a single column would miss? Select all that apply.',
        options: [
          'A delivery timestamp earlier than the order timestamp',
          'An age recorded as 999 in a table where 999 means unknown',
          'A refund posted as a small negative amount',
          'A transaction ten times larger than any other',
          'A rate column that switched from a fraction to a percentage',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'The relational error, the sentinel value, the small negative amount and the unit change all sit inside the ordinary numeric range. Only the very large transaction is what a univariate fence is designed to find.',
      },
      {
        id: 'PD-008-q5',
        type: 'code-output',
        language: 'python',
        concept: 'clipping',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ns = pd.Series([1, 2, 3, 100])\nprint(s.clip(upper=10).tolist())',
        options: ['[1, 2, 3, 10]', '[1, 2, 3]', '[1, 2, 3, 100]', '[10, 10, 10, 10]'],
        answerIndex: 0,
        explanation:
          '`clip` caps values at the bound rather than removing them, so 100 becomes 10 and the row count is unchanged. That preserves sample size while limiting the influence of the tail.',
      },
      {
        id: 'PD-008-q6',
        type: 'explain',
        concept: 'detection versus decision',
        prompt: 'Explain why "detect outliers, then remove them" is not a complete data-cleaning procedure.',
        rubric: [
          'States that detection rules cannot distinguish an error from a genuine rare event',
          'Gives an example where removal would destroy real information',
          'Proposes investigating the flagged rows and recording the decision'
        ],
        sampleAnswer:
          'A detection rule only measures distance from the bulk of the data; it has no access to what the values mean. A temperature of 950 and a transaction of two million are equally far out, but one is a broken sensor and the other may be the most important sale of the year, and no statistic separates them. Removing both makes the dataset tidier and less true, and on heavy-tailed data such as income or claim size the rule fires constantly on perfectly genuine observations, systematically biasing the sample towards the middle. The workable procedure is to flag rather than filter, print the flagged rows and look for a pattern — one sensor, one date, one repeated sentinel value usually indicates a systematic fault — apply domain rules for what is genuinely impossible, and then decide, recording how many rows were affected and why. Where the extremes are real but inconvenient, transform or use a robust model instead of deleting data.',
        explanation:
          'The examinable idea is that outlier handling is an inference about data collection, not a formatting operation, and must leave an audit trail.',
      },
    ],

    flashcards: [
      { front: 'What are the Tukey fences?', back: 'Q1 − 1.5 × IQR and Q3 + 1.5 × IQR, where IQR = Q3 − Q1. Values outside them are flagged as candidates.' },
      { front: 'Why can a z-score miss an obvious outlier?', back: 'The outlier inflates the mean and the standard deviation used to score it — the masking effect.' },
      { front: 'What is the modified z-score?', back: '0.6745 × (x − median) / MAD, where MAD is the median absolute deviation. Robust because neither input is moved by extremes.' },
      { front: 'What does `Series.clip(upper=v)` do?', back: 'Caps values at v instead of removing rows, preserving sample size while limiting the tail\'s influence.' },
      { front: 'What catches a delivery date before an order date?', back: 'A cross-column domain rule. No univariate outlier detector can see it, because each date alone is ordinary.' },
      { front: 'What proportion of normal data does the 1.5 IQR rule flag?', back: 'About 0.7 per cent — roughly 7 in 1000 — so a large table always produces flagged rows that are perfectly genuine.' },
    ],

    challenge: {
      title: 'A validation report for an orders table',
      brief:
        'Write `validate_orders(df, rules)` that applies both statistical detection and a supplied dictionary of domain rules, and returns a report listing every check, whether it passed, how many rows failed and up to three example failing rows. Flag rather than remove, mark which flags came from a statistical rule and which from a domain rule, and make the function raise only if a rule is marked as fatal. Include at least one cross-column rule.',
      language: 'python',
      acceptanceCriteria: [
        'Applies IQR-based detection to every numeric column and reports per-column counts',
        'Applies a supplied set of named domain rules, at least one of which spans two columns',
        'Returns a structured report rather than printing, and never deletes rows',
        'Distinguishes fatal rules, which raise, from advisory rules, which are reported',
      ],
      starterCode:
        'import pandas as pd\n\n\ndef iqr_flags(s: pd.Series, k: float = 1.5) -> pd.Series:\n    q1, q3 = s.quantile([0.25, 0.75])\n    iqr = q3 - q1\n    return ~s.between(q1 - k * iqr, q3 + k * iqr)\n\n\ndef validate_orders(df: pd.DataFrame, rules: dict) -> pd.DataFrame:\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me how to find outliers and, more importantly, how to decide what to do about them.',
      mustCover: [
        'An outlier is a value far from the bulk; the label does not say whether it is an error',
        'The IQR rule uses quartiles and is robust; the z-score uses mean and standard deviation and can mask outliers',
        'Domain rules catch impossible values that sit inside the statistical range',
        'Flag, investigate, decide and record — do not filter automatically',
      ],
      bonusSignals: ['mentions heavy-tailed data where extremes are genuine', 'mentions clipping or log transforms as alternatives to deletion', 'mentions fitting thresholds on the training fold only'],
      sampleExplanation:
        'An outlier is simply a value sitting a long way from the rest, and calling it an outlier tells you nothing about whether it is wrong. A recorded temperature of 950 degrees is a broken sensor; a two-million-pound transaction might be the best sale of the year. To find candidates, the rule I reach for first is the interquartile range: take the 25th and 75th percentiles, subtract to get the width of the middle half, and flag anything more than one and a half of those widths outside it. It works on skewed data because percentiles do not care how extreme the extremes are. The z-score, which counts standard deviations from the mean, has a subtle flaw: the outlier is included in the mean and the standard deviation being used to judge it, so a single huge value inflates the ruler and can score under three while being obviously wrong. Alongside both, write down the rules your business already knows — prices cannot be negative, ages cannot be 999, a parcel cannot arrive before it was ordered. Those catch errors that sit comfortably inside the normal range, and the last one cannot be caught by looking at any single column. Then the part that actually matters: flag rather than delete. Print the flagged rows and look for a pattern, because if they are all from one sensor or one day you have found a systematic fault rather than twelve odd numbers. Remove only what you can argue is an error, cap or take logs when the extremes are real but inconvenient, and write down how many rows you changed and why.',
    },
  },
  {
    id: 'PD-009',
    domain: 'PD',
    module: 'Grouping & Aggregation',
    topic: 'Split-apply-combine',
    title: 'groupby and Aggregation',
    slug: 'groupby-and-aggregation',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['PD-005'],
    related: ['PD-002', 'PD-007'],
    tags: ['groupby', 'split-apply-combine', 'agg', 'transform', 'as_index', 'named-aggregation'],

    learningObjectives: [
      'Describe the split-apply-combine model and identify which of the three steps a given line of code performs',
      'Aggregate with one function, several functions, or a different function per column using named aggregation',
      'Distinguish `agg` from `transform` by the shape of what each returns, and use `transform` to build per-group features',
      'Control the result shape with `as_index`, `reset_index`, `dropna` and `observed`, and explain when each matters',
    ],

    terminology: [
      {
        term: 'Split-apply-combine',
        definition:
          'The three-step model behind `groupby`: partition rows by key, apply a function to each partition independently, then assemble the results into a new object.',
        simple: 'Sort into piles, do something to each pile, then put the answers back together.',
      },
      {
        term: 'GroupBy object',
        definition:
          'The lazy intermediate returned by `df.groupby(key)`. It records the grouping but computes nothing until an aggregation, transformation or filter is requested.',
        simple: 'A plan for the piles, not the piles themselves.',
      },
      {
        term: 'Aggregation',
        definition:
          'A function reducing each group to a single value per column, producing one output row per group. `sum`, `mean`, `count`, `nunique` and `agg` are aggregations.',
        simple: 'One answer per pile.',
      },
      {
        term: 'Transformation',
        definition:
          'A function returning a result the same length as the group, broadcast back to the original rows. `transform("mean")`, `rank` and `cumsum` are transformations.',
        simple: 'One answer per row, worked out using its pile.',
      },
      {
        term: 'Named aggregation',
        definition:
          'The `agg(new_name=("column", "function"))` form, which produces flat, meaningful column names instead of a MultiIndex of column-function pairs.',
        simple: 'Saying what each output column should be called as you compute it.',
      },
    ],

    simpleExplanation:
      "Almost every question about data is really a question about groups: revenue per region, average score per class, error rate per model. Pandas answers all of them with one idea in three steps. First it splits the rows into piles using a key — one pile per region. Then it applies a function to each pile independently, with no pile able to see any other. Then it combines the answers into a new table, one row per pile. Once you see those three steps, `df.groupby(\"region\")[\"revenue\"].sum()` stops being an incantation: it is split by region, apply sum to the revenue column of each pile, combine into a Series indexed by region. The second thing to learn is that there are two shapes of answer. Sometimes you want one row per group — that is aggregation. Sometimes you want an answer attached back to every original row, such as each order's share of its region's total — that is transformation, and it returns something the same length as the input. Choosing the wrong one is the most common source of confusion in this topic.",

    whyItExists:
      'Group-wise calculations written by hand require building a dictionary of lists, looping, aggregating and reassembling — dozens of lines that are slow and easy to get wrong. `groupby` expresses the whole pattern in one line, runs the split and the common aggregations in compiled code, and guarantees that every group is handled identically, including the groups you forgot existed.',

    analogy: {
      scenario:
        'Picture a teacher with a stack of exam papers from four classes. She deals the papers into four piles, one per class. For each pile she works out the average mark, writing one number on a summary sheet per class. Later she wants something different: she goes back to the original papers and writes on each one how far that pupil was above or below their own class average — which means every paper gets a note, not every pile.',
      mapping: [
        { from: 'Dealing papers into piles by class', to: 'The split step: `df.groupby("class")`' },
        { from: 'Working out one average per pile', to: 'The apply step with an aggregation' },
        { from: 'The summary sheet with four rows', to: 'The combine step: one row per group' },
        { from: 'Writing a note on every individual paper', to: '`transform`, which broadcasts a group result back to every row' },
        { from: 'A class with no papers handed in', to: 'An empty or missing group, which `dropna` and `observed` control' },
      ],
      bridge:
        'The two tasks the teacher performs are exactly `agg` and `transform`, and the difference is the shape of the output: four rows on the summary sheet versus a note on each of 120 papers. This is why `df.groupby("class")["mark"].mean()` cannot be assigned back as a column — it has four values and the frame has 120 rows — while `df.groupby("class")["mark"].transform("mean")` can, because transform repeats each class average across that class\'s rows. The independence of the piles is the other half: each pile is processed with no knowledge of the others, which is what makes the operation parallelisable and what makes a within-group calculation such as a rank or a percentage of group total possible at all.',
      limitations:
        'The analogy implies the piles are exhaustive. In pandas, rows whose grouping key is missing are dropped silently by default, so the piles may not account for every paper — a genuine source of vanishing rows that `dropna=False` exposes.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Split, apply, combine',
        caption: 'Every groupby is these three steps, whatever function you use.',
        steps: [
          { label: 'Split', detail: 'Rows are partitioned by the key. `df.groupby("region")` records the partition without computing anything yet.' },
          { label: 'Apply', detail: 'A function runs on each partition independently. Groups never see each other, which is what makes the model simple.' },
          { label: 'Combine (aggregate)', detail: 'One value per group per column becomes one output row per group, indexed by the key.' },
          { label: 'Combine (transform)', detail: 'A same-length result per group is broadcast back to the original rows, keeping the original index.' },
          { label: 'Combine (filter)', detail: 'Whole groups are kept or dropped, returning a subset of the original rows.' },
        ],
      },
      {
        kind: 'compare',
        title: 'agg versus transform',
        caption: 'The distinction is the shape of the result, and it decides which one you need.',
        left: {
          heading: 'agg — one row per group',
          points: [
            'Result length equals the number of groups',
            'Index becomes the grouping key',
            'For summaries, reports and pivot tables',
            'Cannot be assigned back as a column of the original frame',
          ],
        },
        right: {
          heading: 'transform — one row per input row',
          points: [
            'Result length equals the original frame',
            'Keeps the original index, so it aligns on assignment',
            'For per-group features: share of group total, deviation from group mean, within-group rank',
            'The right tool when the answer belongs on every row',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Aggregation forms and what they return',
        columns: ['Call', 'Result', 'When to use it'],
        rows: [
          ['g["amount"].sum()', 'Series indexed by group', 'One statistic, one column'],
          ['g[["amount", "qty"]].mean()', 'DataFrame, one row per group', 'One statistic, several columns'],
          ['g["amount"].agg(["sum", "mean", "count"])', 'DataFrame with one column per function', 'Several statistics on one column'],
          ['g.agg({"amount": "sum", "qty": "max"})', 'DataFrame, different function per column', 'Quick, but column names stay as-is'],
          ['g.agg(total=("amount", "sum"), n=("amount", "size"))', 'DataFrame with flat, named columns', 'The form to prefer in real code'],
          ['g["amount"].transform("mean")', 'Series the length of the original frame', 'Attaching a group statistic to every row'],
          ['g.filter(lambda d: len(d) >= 3)', 'Subset of the original rows', 'Keeping only groups that meet a condition'],
          ['g.size() vs g.count()', 'Rows per group vs non-null values per column', '`size` includes missing values; `count` does not'],
        ],
      },
      {
        kind: 'widget',
        title: 'Group and aggregate interactively',
        caption: 'Change the key and the function and watch the output shape change.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      '`DataFrame.groupby(by)` constructs a lazy mapping from group keys to row positions. An aggregation applies a reduction to each group, yielding one row per group indexed by the key. A transformation applies a function returning a like-indexed result per group, broadcast back to the original index. A filtration evaluates a predicate per group and returns the concatenation of the groups satisfying it. Group keys that are missing are excluded unless `dropna=False`, and unused categories of a categorical key are included unless `observed=True`.',

    workedExample: {
      title: 'Tracing split-apply-combine by hand on six orders',
      setup:
        'Six orders with a region and an amount: (north, 100), (south, 40), (north, 60), (south, 80), (east, 25), (north, 40). We want the total per region, and then each order\'s share of its own region\'s total.',
      steps: [
        {
          label: 'Split',
          detail: 'Partition the rows by region. north holds {100, 60, 40}, south holds {40, 80}, east holds {25}. No arithmetic has happened yet — `groupby` has only recorded which row positions belong to which key.',
        },
        {
          label: 'Apply (aggregate)',
          detail: 'Sum each pile independently: north gives 200, south gives 120, east gives 25. Each pile is reduced to a single number, with no reference to the others.',
        },
        {
          label: 'Combine (aggregate)',
          detail: 'Assemble one row per group, indexed by region, in sorted key order by default: east 25, north 200, south 120. Three groups, three rows — the frame has shrunk from six rows to three.',
        },
        {
          label: 'Apply (transform)',
          detail: 'For the share calculation, each pile instead returns a value per member: north returns 200 three times, south returns 120 twice, east returns 25 once. The lengths match the piles, so the total is six values.',
        },
        {
          label: 'Combine (transform)',
          detail: 'Broadcast those back to the original six rows in their original order: 200, 120, 200, 120, 25, 200. Because the result keeps the original index, it can be assigned straight back as a column.',
          latex: '\\text{share}_i = \\frac{\\text{amount}_i}{\\text{group total}_i}',
        },
        {
          label: 'Divide',
          detail: 'The shares are 100/200 = 0.50, 40/120 = 0.33, 60/200 = 0.30, 80/120 = 0.67, 25/25 = 1.00, 40/200 = 0.20. Each order is now expressed relative to its own region.',
        },
      ],
      conclusion:
        'The same split produced two different shapes of answer. The aggregation collapsed six rows to three, so it belongs in a summary; the transformation returned six values that align with the original rows, so it belongs as a new column. Recognising which shape a question needs — "per region" or "for each order, relative to its region" — is the whole skill.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Aggregating: one function, many functions, named aggregation',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "region":   ["north", "south", "north", "south", "east", "north"],
    "channel":  ["web", "web", "app", "app", "web", "web"],
    "amount":   [100.0, 40.0, 60.0, 80.0, 25.0, 40.0],
    "qty":      [2, 1, 3, 2, 1, 1],
})

print(orders.groupby("region")["amount"].sum())
print()
print(orders.groupby("region")["amount"].agg(["sum", "mean", "count"]))
print()
summary = orders.groupby("region", as_index=False).agg(
    total=("amount", "sum"),
    avg_order=("amount", "mean"),
    orders=("amount", "size"),
    units=("qty", "sum"),
)
print(summary)
print()
print(orders.groupby(["region", "channel"])["amount"].sum())`,
        output: `region
east      25.0
north    200.0
south    120.0
Name: amount, dtype: float64

          sum       mean  count
region
east     25.0  25.000000      1
north   200.0  66.666667      3
south   120.0  60.000000      2

  region  total  avg_order  orders  units
0   east   25.0  25.000000       1      1
1  north  200.0  66.666667       3      6
2  south  120.0  60.000000       2      3

region  channel
east    web         25.0
north   app         60.0
        web        140.0
south   app         80.0
        web         40.0
Name: amount, dtype: float64`,
        explanation:
          'Four increasingly useful forms. The first returns a Series indexed by region — note that the groups come out sorted by key, which `sort=False` disables if you need the original order of appearance. The second computes three statistics on one column and gives a DataFrame whose columns are the function names. The third is the form to prefer in real code: named aggregation produces flat, meaningful column names rather than a MultiIndex you then have to flatten, and `as_index=False` keeps `region` as an ordinary column so the result is an ordinary table ready to join or write out. The last groups by two keys at once, which produces a MultiIndex — the hierarchical index that leads directly into pivot tables in the next unit.',
      },
      {
        language: 'python',
        title: 'transform: attaching a group statistic to every row',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "region": ["north", "south", "north", "south", "east", "north"],
    "amount": [100.0, 40.0, 60.0, 80.0, 25.0, 40.0],
})

g = orders.groupby("region")["amount"]

orders["region_total"] = g.transform("sum")
orders["region_mean"] = g.transform("mean")
orders["share_of_region"] = orders["amount"] / orders["region_total"]
orders["vs_region_mean"] = orders["amount"] - orders["region_mean"]
orders["rank_in_region"] = g.rank(ascending=False, method="min").astype(int)

print(orders.round(2))
print()
print("agg result length:", len(g.sum()), "| transform result length:", len(g.transform("sum")))`,
        output: `  region  amount  region_total  region_mean  share_of_region  vs_region_mean  rank_in_region
0  north   100.0         200.0        66.67             0.50           33.33               1
1  south    40.0         120.0        60.00             0.33          -20.00               2
2  north    60.0         200.0        66.67             0.30           -6.67               2
3  south    80.0         120.0        60.00             0.67           20.00               1
4   east    25.0          25.0        25.00             1.00            0.00               1
5  north    40.0         200.0        66.67             0.20          -26.67               3

agg result length: 3 | transform result length: 6`,
        explanation:
          'Every column here is a feature that could not be computed without knowing the row\'s group, and every one of them belongs on the row rather than in a summary. `transform("sum")` returns 200 for all three northern rows, so it aligns with the original frame and can be assigned directly as a column — the final print makes the length difference explicit: three values from `agg` against six from `transform`. Trying to assign `g.sum()` as a column instead would align three values against six row labels and fill the rest with NaN, which is the classic symptom of having reached for the wrong one. Within-group ranking is the same idea: `rank` is a transformation because each row gets its own position inside its group.',
      },
      {
        language: 'python',
        title: 'Shape control: as_index, reset_index, dropna, observed',
        runnable: true,
        code: `import pandas as pd
import numpy as np

sales = pd.DataFrame({
    "region": ["north", "south", None, "north"],
    "tier":   pd.Categorical(["gold", "gold", "silver", "gold"],
                             categories=["gold", "silver", "bronze"]),
    "amount": [100.0, 40.0, 60.0, np.nan],
})

print("default — rows with a missing key are dropped:")
print(sales.groupby("region")["amount"].sum())
print()
print("dropna=False keeps them as a NaN group:")
print(sales.groupby("region", dropna=False)["amount"].sum())
print()
print("as_index=False gives a flat table instead of an indexed one:")
print(sales.groupby("region", as_index=False)["amount"].sum())
print()
print("observed=False keeps unused categories (note bronze):")
print(sales.groupby("tier", observed=False)["amount"].sum())
print()
print("size counts rows, count counts non-null values:")
print(pd.DataFrame({"size": sales.groupby("tier", observed=True).size(),
                    "count": sales.groupby("tier", observed=True)["amount"].count()}))`,
        output: `default — rows with a missing key are dropped:
region
north    100.0
south     40.0
Name: amount, dtype: float64

dropna=False keeps them as a NaN group:
region
north    100.0
south     40.0
NaN       60.0
Name: amount, dtype: float64

as_index=False gives a flat table instead of an indexed one:
  region  amount
0  north   100.0
1  south    40.0

observed=False keeps unused categories (note bronze):
tier
gold      140.0
silver     60.0
bronze      0.0
Name: amount, dtype: float64

size counts rows, count counts non-null values:
        size  count
tier
gold       3      2
silver     1      1`,
        explanation:
          'Four behaviours that silently change your numbers. Rows whose grouping key is missing are dropped by default, so a total computed over groups can be smaller than the total over the frame — `dropna=False` surfaces those rows as an explicit NaN group, and the discrepancy is usually worth investigating rather than hiding. `as_index=False` returns an ordinary table rather than one indexed by the key, which saves a `reset_index` and makes the result easier to join. With a categorical key, `observed=False` includes categories that appear nowhere in the data, which is right for a report that must list every tier and wrong if you then divide by the group size and get a division by zero. Finally, `size` and `count` are not the same: `size` counts rows in the group while `count` counts non-missing values per column, and the gap between them is a missing-data report you get for free.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Cohort and retention analysis',
        usage:
          'Grouping users by signup month and counting how many were active in each later month is a two-key `groupby` followed by an unstack. Every retention curve you have seen started this way.',
      },
      {
        context: 'Feature engineering for a model',
        usage:
          'Customer-level features such as average basket size, order frequency and days since last order are group aggregations joined back to the customer table; per-row features such as spend relative to the customer\'s own average come from `transform`.',
      },
      {
        context: 'Model evaluation by segment',
        usage:
          'Grouping predictions by segment and computing the error per segment is how aggregate accuracy stops hiding poor performance on a minority group — the aggregate can look fine while one segment is unusable.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`groupby` underlies `pivot_table`, `resample` and `rolling`, all of which are the same split-apply-combine model with a different way of forming groups.' },
      { tool: 'SQL', role: '`GROUP BY` is the same model; `transform` corresponds to a window function such as `SUM(x) OVER (PARTITION BY region)`.' },
      { tool: 'scikit-learn', role: '`GroupKFold` keeps a group entirely within one fold, which is how you avoid leaking a customer across train and test.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assigning an aggregation back as a column',
        why: '`df.groupby("region")["amount"].sum()` has one value per region and the frame has one row per order, so alignment fills most rows with NaN.',
        fix: 'Use `transform` when the answer belongs on every row, and `agg` only when you want a summary table.',
      },
      {
        mistake: 'Forgetting that rows with a missing key are dropped',
        why: 'The default `dropna=True` excludes them silently, so group totals no longer sum to the frame total and the shortfall is invisible.',
        fix: 'Pass `dropna=False` when auditing, and assert that the sum of the group totals equals the overall total.',
      },
      {
        mistake: 'Using `apply` where a built-in aggregation exists',
        why: '`g.apply(lambda d: d["amount"].sum())` runs a Python function per group instead of the compiled path, and is typically an order of magnitude slower with no gain in clarity.',
        fix: 'Prefer named aggregation: `g.agg(total=("amount", "sum"))`. Reserve `apply` for genuinely custom, multi-column group logic.',
      },
      {
        mistake: 'Confusing `size` with `count`',
        why: '`size` returns rows per group including missing values, while `count` returns non-null values per column, so the two disagree exactly where your data has gaps.',
        fix: 'Use `size` for "how many rows" and `count` for "how many usable values", and compare them deliberately as a missing-data check.',
      },
      {
        mistake: 'Leaving a MultiIndex in place and then struggling to use the result',
        why: 'Grouping by two keys, or aggregating with a list of functions, produces hierarchical labels that later joins and exports handle awkwardly.',
        fix: 'Use named aggregation for flat column names, and `as_index=False` or `.reset_index()` to return to an ordinary table.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain split-apply-combine.',
        answer:
          'It is the three-step model behind every `groupby`. Split partitions the rows into groups by one or more keys. Apply runs a function on each group independently, with no group able to see any other. Combine assembles the per-group results into a new object. The shape of the final result depends on what the applied function returned: a single value per group gives an aggregation with one row per group; a result the same length as the group gives a transformation broadcast back to the original rows; and a boolean gives a filtration that keeps or drops whole groups. Being able to name which of the three you want is what turns `groupby` from a memorised incantation into a tool, because the wrong choice produces the wrong shape rather than an error.',
      },
      {
        level: 'intermediate',
        question: 'What is the difference between `agg` and `transform`, with an example of when only transform will do?',
        answer:
          '`agg` reduces each group to one value per column, so the result has one row per group and is indexed by the key. `transform` returns a result the same length as each group, broadcast back to the original rows with the original index preserved. Only `transform` works when the answer belongs on every row: computing each order\'s share of its region\'s total requires the region total repeated beside every order, so `df["share"] = df["amount"] / g["amount"].transform("sum")` works while the `agg` version would align three regional totals against thousands of order rows and fill almost all of them with NaN. The same applies to deviation from a group mean, within-group rank and per-group normalisation — all standard feature-engineering moves, all transformations.',
        followUp:
          'A strong answer notes that transform must return something group-length or scalar-broadcastable, and that `groupby(...).apply` is the general escape hatch when neither fits.',
      },
      {
        level: 'ml-engineer',
        question: 'What are the pitfalls of using group statistics as model features?',
        answer:
          'The first is leakage. A feature such as "average conversion rate for this customer" computed over the whole dataset includes the row\'s own outcome and the outcomes of rows that end up in the test set, so the model receives information it will not have at inference. The remedy is out-of-fold encoding: compute the statistic within each training fold, or exclude the current row with a leave-one-out formulation. The second is unstable small groups: a category seen three times has a group mean that is mostly noise, which is why target encoding uses smoothing towards the global mean. The third is the cold-start problem — a category unseen at training time has no statistic at all, so the pipeline needs an explicit fallback. And the fourth is drift: group statistics computed once and frozen become stale as the population changes, so they need either recomputation on a schedule or monitoring that shows when they have stopped matching reality.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given an orders table with `region`, `channel` and `amount`, produce a flat summary table with one row per region containing the total amount, the mean amount, the number of orders, and the number of distinct channels used.',
        hint: 'Named aggregation, plus `as_index=False` to keep the key as a column.',
        solution:
          'summary = orders.groupby("region", as_index=False).agg(\n    total=("amount", "sum"),\n    avg=("amount", "mean"),\n    orders=("amount", "size"),\n    channels=("channel", "nunique"),\n)\n\nNamed aggregation gives flat column names directly, so no MultiIndex has to be flattened afterwards, and `as_index=False` returns an ordinary table ready to join or export. Note the use of `size` rather than `count` for the order tally, since `count` would omit rows whose amount is missing.',
      },
      {
        prompt:
          'Add a column to an orders table giving each order\'s percentage of its own region\'s total revenue. Explain why `agg` cannot be used here.',
        hint: 'How many values does each option return, and how many rows does the frame have?',
        solution:
          'orders["pct_of_region"] = 100 * orders["amount"] / orders.groupby("region")["amount"].transform("sum")\n\n`agg` returns one value per region — three values for three regions — while the frame has one row per order. Assigning that back aligns three labels against every order label and fills almost everything with NaN. `transform` repeats each region total across that region\'s rows, so the result has the same length and index as the frame and divides element-wise exactly as intended.',
      },
      {
        prompt:
          'Your group totals do not sum to the overall total of the column. Give two plausible causes and the code to check each.',
        hint: 'One involves the grouping key, the other involves the aggregated column.',
        solution:
          'Cause one: rows whose grouping key is missing are dropped by default. Check with df["region"].isna().sum(), and compare df.groupby("region", dropna=False)["amount"].sum() against the default version.\nCause two: the aggregation skips missing values in the aggregated column, so a group containing NaN amounts contributes less than its row count suggests. Check with df.groupby("region")["amount"].agg(["size", "count", "sum"]) and look for groups where size exceeds count.\n\nBoth are silent by design, which is why asserting that the group totals reconcile to the overall total belongs in any pipeline that reports group numbers.',
      },
    ],

    quiz: [
      {
        id: 'PD-009-q1',
        type: 'order',
        concept: 'split-apply-combine',
        prompt: 'Put the stages of a groupby aggregation in order.',
        items: [
          'Partition the rows into groups by the key',
          'Apply the function to each group independently',
          'Collect one result per group',
          'Assemble the results into a new object indexed by the key',
        ],
        explanation:
          'Split, apply, combine. The key insight is that the apply step treats each group in isolation, which is what makes the result predictable and the operation parallelisable.',
      },
      {
        id: 'PD-009-q2',
        type: 'mcq',
        concept: 'agg versus transform',
        prompt: 'You want each row to carry the mean of its own group. Which call do you need?',
        options: [
          'df.groupby("g")["x"].transform("mean")',
          'df.groupby("g")["x"].mean()',
          'df.groupby("g").agg({"x": "mean"})',
          'df.groupby("g")["x"].apply(list)',
        ],
        answerIndex: 0,
        explanation:
          '`transform` returns a result the same length as the original frame, with each group\'s value repeated across its rows, so it aligns on assignment. The aggregation forms return one row per group and cannot be assigned back as a column.',
      },
      {
        id: 'PD-009-q3',
        type: 'code-output',
        language: 'python',
        concept: 'aggregation shape',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ndf = pd.DataFrame({"g": ["a", "b", "a", "b", "a"], "x": [1, 2, 3, 4, 5]})\nprint(len(df.groupby("g")["x"].sum()), len(df.groupby("g")["x"].transform("sum")))',
        options: ['2 5', '5 5', '2 2', '5 2'],
        answerIndex: 0,
        explanation:
          'There are two groups, so the aggregation has two values. `transform` broadcasts each group total back across its rows, so it has five — the length of the original frame.',
      },
      {
        id: 'PD-009-q4',
        type: 'truefalse',
        concept: 'missing keys',
        prompt: 'Rows whose grouping key is missing are included in a NaN group by default.',
        answer: false,
        explanation:
          'They are dropped silently unless you pass `dropna=False`. This is why group totals can fail to reconcile with the overall total, with nothing in the output to indicate that rows went missing.',
      },
      {
        id: 'PD-009-q5',
        type: 'multi',
        concept: 'groupby result shape',
        prompt: 'Which of these produce one row per group? Select all that apply.',
        options: [
          'g["amount"].sum()',
          'g.agg(total=("amount", "sum"))',
          'g["amount"].transform("sum")',
          'g.size()',
          'g.rank()',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Aggregations and `size` collapse each group to one row. `transform` and `rank` return one value per original row, which is exactly what makes them suitable for creating new columns.',
      },
      {
        id: 'PD-009-q6',
        type: 'explain',
        concept: 'group features and leakage',
        prompt: 'Explain why computing "average outcome per category" over the whole dataset and using it as a feature is dangerous.',
        rubric: [
          'Identifies that the statistic includes the row\'s own outcome and test-set outcomes',
          'Explains that this inflates validation performance relative to production',
          'Proposes out-of-fold computation, smoothing or an unseen-category fallback',
        ],
        sampleAnswer:
          'The feature is computed from the target, so it carries information the model will not have when it makes a real prediction. It includes the row\'s own outcome, which alone can make a rare category almost perfectly predictive, and it includes outcomes from rows that later become the validation set, so the reported score is optimistic and the model looks better than it is. The fix is to compute the statistic out of fold — within each training fold only, or excluding the current row — and to smooth small groups towards the global mean so that a category seen three times does not produce a confident number from noise. You also need an explicit fallback for categories not seen during training, since otherwise the feature is missing exactly when a new category appears in production.',
        explanation:
          'Target-derived group statistics are among the most common causes of a model that validates well and fails in production, so the mechanism is worth being able to state precisely.',
      },
    ],

    flashcards: [
      { front: 'What are the three steps of a groupby?', back: 'Split the rows by key, apply a function to each group independently, combine the results.' },
      { front: '`agg` versus `transform`', back: '`agg` gives one row per group; `transform` gives one value per original row, so only `transform` can be assigned back as a column.' },
      { front: 'What does named aggregation look like?', back: '`g.agg(total=("amount", "sum"), n=("amount", "size"))` — flat, meaningful column names instead of a MultiIndex.' },
      { front: 'What does `as_index=False` do?', back: 'Returns the grouping key as an ordinary column rather than as the index, giving a flat table.' },
      { front: '`size` versus `count` on a GroupBy', back: '`size` counts rows including missing values; `count` counts non-null values per column.' },
      { front: 'Why might group totals not sum to the overall total?', back: 'Rows with a missing grouping key are dropped by default, and aggregations skip missing values in the aggregated column.' },
    ],

    challenge: {
      title: 'A customer feature table',
      brief:
        'From a table of orders with `customer_id`, `order_date`, `amount` and `channel`, build a per-customer feature table containing total spend, order count, mean and median order value, distinct channels used, days between first and last order, and the share of spend going through the customer\'s most-used channel. Then add two per-order columns computed with `transform`: the order\'s share of that customer\'s total spend, and its rank within the customer by amount. Verify that the per-customer totals reconcile to the overall total.',
      language: 'python',
      acceptanceCriteria: [
        'Uses named aggregation for the customer-level table, with flat column names',
        'Uses `transform` for the two per-order columns, which align with the original frame',
        'Handles customers with a single order without raising or producing NaN in the span calculation',
        'Includes an assertion that the summed customer totals equal the overall total',
      ],
      starterCode:
        'import pandas as pd\n\n\ndef customer_features(orders: pd.DataFrame) -> pd.DataFrame:\n    g = orders.groupby("customer_id")\n    return g.agg(\n        total_spend=("amount", "sum"),\n        n_orders=("amount", "size"),\n    ).reset_index()\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me `groupby` from first principles, and make sure I understand when to use `transform` instead of `agg`.',
      mustCover: [
        'Split-apply-combine as three distinct steps',
        'Aggregation returns one row per group; transformation returns one value per original row',
        'Named aggregation for readable, flat output columns',
        'Rows with a missing grouping key are dropped by default',
      ],
      bonusSignals: ['gives a concrete per-group feature such as share of group total', 'mentions as_index=False and reset_index', 'mentions that groups are processed independently'],
      sampleExplanation:
        'Think of a teacher with exam papers from four classes. First she deals the papers into four piles — that is the split, and pandas does it when you write `groupby("class")`, although at that point nothing has actually been calculated. Then she does something to each pile, with no pile affecting any other — that is the apply step. Then she puts the answers together — the combine. What changes is the shape of the answer. If she works out one average per pile, she ends up with a summary sheet of four rows: that is aggregation, and in pandas it is `.mean()` or `.agg(...)`. If instead she goes back to every individual paper and writes on it how far that pupil was from their own class average, she ends up with a note on every one of the 120 papers: that is `transform`, and because it returns one value per original row it can be assigned straight back as a new column. This is the distinction people trip over: `df.groupby("class")["mark"].mean()` gives four numbers and cannot become a column of a 120-row table, while `transform("mean")` gives 120 numbers and can. For the summary form, use named aggregation — `agg(total=("amount", "sum"), orders=("amount", "size"))` — because it names the output columns as you go instead of leaving you with a two-level header to untangle. One warning to carry with you: rows whose grouping key is missing are dropped silently, so your group totals can quietly fail to add up to the total of the whole column.',
    },
  },

  {
    id: 'PD-010',
    domain: 'PD',
    module: 'Combining Data',
    topic: 'Joins and concatenation',
    title: 'merge, join and concat',
    slug: 'merge-join-concat',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['PD-004', 'PD-009'],
    related: ['PD-003'],
    tags: ['merge', 'join', 'concat', 'inner', 'left', 'outer', 'many-to-many', 'validate'],

    learningObjectives: [
      'Combine two tables with `merge`, controlling `how`, `on`, `left_on`/`right_on`, `suffixes` and `indicator`',
      'Choose between inner, left, right and outer joins by what you want to happen to non-matching rows',
      'Recognise and prevent the row-explosion trap of a many-to-many join, using `validate` and duplicate checks',
      'Distinguish stacking with `concat` from key-based joining, and know when each is the right operation',
    ],

    terminology: [
      {
        term: 'Join key',
        definition:
          'The column or index used to match rows between two tables. Matching is by value, so the dtypes on both sides must be compatible or nothing matches.',
        simple: 'The column the two tables have in common.',
      },
      {
        term: 'Join type (how)',
        definition:
          'Which non-matching rows survive: `inner` keeps only matches, `left` keeps all of the left table, `right` the mirror image, `outer` keeps everything from both.',
        simple: 'What happens to rows that have no partner.',
      },
      {
        term: 'Cardinality',
        definition:
          'The relationship between the keys on each side: one-to-one, one-to-many, or many-to-many. It determines how many rows the result can contain.',
        simple: 'How many rows on one side can match how many on the other.',
      },
      {
        term: 'Row explosion',
        definition:
          'The multiplication of rows when a key appears m times on the left and n times on the right, producing m times n rows for that key.',
        simple: 'The result having far more rows than either input, because of repeated keys.',
      },
      {
        term: 'concat',
        definition:
          'Stacking frames along an axis without matching on a key: `axis=0` appends rows, `axis=1` places frames side by side, aligning on the index.',
        simple: 'Putting tables on top of each other, or next to each other.',
      },
    ],

    simpleExplanation:
      "Data almost never arrives in one table. Orders are in one place, customers in another, products in a third, and answering a real question means putting them together. There are two genuinely different ways to do this and confusing them causes most of the trouble. Joining matches rows between tables using a shared key: for each order, find the customer with that customer id and attach their details. Concatenating just stacks tables — this month's orders on top of last month's — without matching anything. For joins, the crucial decision is what happens to rows that find no partner. An inner join keeps only the matches and silently discards the rest, which is how analyses lose a third of their rows without anyone noticing. A left join keeps every row of the left table and fills the missing columns with NaN, which is usually what you want, because the NaN is visible and tells you something true. And there is one trap worth fearing: if the key repeats on both sides, every matching pair is produced, so ten rows joined to ten rows gives a hundred. Counting rows before and after a join is a habit worth forming immediately.",

    whyItExists:
      'Normalised systems deliberately store each fact once and refer to it by key, so customer details do not sit in every order row. Joining is how that structure is reassembled for analysis, and having explicit join types plus validation makes the consequences of non-matching and repeated keys a decision rather than an accident.',

    analogy: {
      scenario:
        'Imagine a school with two registers. One lists every pupil with their class and form tutor; the other lists every trip payment received, identified by pupil number. To find out which classes have paid, you must match payment records to pupils by number. Some payments carry a pupil number that no longer exists because the pupil left. Some pupils have made no payment at all. And a few pupils have paid in three instalments, so their number appears three times in the payments register.',
      mapping: [
        { from: 'Matching by pupil number', to: 'The join key' },
        { from: 'Keeping only pupils who have paid', to: 'An inner join' },
        { from: 'Keeping every pupil, blank where no payment exists', to: 'A left join, with NaN for the missing columns' },
        { from: 'A payment for a pupil who has left', to: 'An unmatched right-side row, visible only with an outer join or `indicator`' },
        { from: 'A pupil paying in three instalments', to: 'A one-to-many relationship, which repeats the pupil row three times' },
      ],
      bridge:
        'The instalments case is the row explosion in miniature, and it shows why the question "how many rows should this produce?" must be answered before the join rather than discovered after it. If each pupil row is duplicated once per payment and you then sum a column that lives on the pupil side — a termly fee, say — you will count it three times for that pupil and produce a total that is confidently wrong. The join type is the other half: an inner join makes the pupils who never paid vanish from the analysis entirely, so a report of average payment computed after it describes only payers while appearing to describe pupils.',
      limitations:
        'The registers assume pupil number is a reliable identifier. In practice keys are often dirty — trailing spaces, differing case, one side numeric and the other text — so a join silently matches nothing and returns an empty or all-NaN result that looks like a logic error rather than a typing one.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The four join types on the same two tables',
        caption: 'Left has keys A, B, C. Right has keys B, C, D. Only the `how` argument changes.',
        columns: ['how', 'Keys in the result', 'Rows', 'Use it when'],
        rows: [
          ['inner', 'B, C', '2', 'You only want records present in both, and you accept losing the rest'],
          ['left', 'A, B, C', '3', 'The left table is the population you are analysing; unmatched gives NaN'],
          ['right', 'B, C, D', '3', 'The mirror image; usually clearer to swap the arguments and use left'],
          ['outer', 'A, B, C, D', '4', 'You are reconciling two sources and need to see everything that fails to match'],
        ],
      },
      {
        kind: 'ascii',
        title: 'The row explosion',
        caption: 'Key "B" appears twice on the left and three times on the right.',
        art: `  left                 right                    merge(on="k")
  +----+-----+          +----+-------+           +----+-----+-------+
  | k  |  x  |          | k  |   y   |           | k  |  x  |   y   |
  +----+-----+          +----+-------+           +----+-----+-------+
  | B  |  1  |          | B  |  10   |           | B  |  1  |  10   |
  | B  |  2  |          | B  |  20   |           | B  |  1  |  20   |
  +----+-----+          | B  |  30   |           | B  |  1  |  30   |
                        +----+-------+           | B  |  2  |  10   |
   2 rows                 3 rows                 | B  |  2  |  20   |
                                                 | B  |  2  |  30   |
                                                 +----+-----+-------+
                                                   2 x 3 = 6 rows

  Sum of x before: 3.   Sum of x after: 9.   Nothing errored.`,
      },
      {
        kind: 'flow',
        title: 'A join you can trust',
        caption: 'Four checks, thirty seconds, and no silent row loss.',
        steps: [
          { label: 'Check the keys match in dtype', detail: 'An int64 key will not match a string key, and the result is a silent empty join. Compare `left[k].dtype` and `right[k].dtype`.' },
          { label: 'Check cardinality', detail: '`left[k].duplicated().any()` and the same on the right tell you whether this is one-to-one, one-to-many or many-to-many.' },
          { label: 'State your expectation', detail: 'Pass `validate="one_to_many"` (or whichever applies) so pandas raises if the data disagrees with you.' },
          { label: 'Merge with `indicator=True`', detail: 'The `_merge` column records whether each row came from left only, right only, or both.' },
          { label: 'Reconcile the row count', detail: 'Compare `len(result)` against `len(left)`. For a left join with unique right keys they must be equal.' },
        ],
      },
      {
        kind: 'compare',
        title: 'merge versus concat',
        left: {
          heading: 'merge — matching on a key',
          points: [
            'Combines different information about the same entities',
            'Result width grows: columns from both sides',
            'Row count depends on `how` and cardinality',
            'Wrong key dtype means a silent non-match',
          ],
        },
        right: {
          heading: 'concat — stacking',
          points: [
            'Combines the same information about different entities',
            '`axis=0` appends rows; `axis=1` aligns on the index',
            'Row count is simply the sum of the inputs, for axis=0',
            'Mismatched column names produce NaN-filled columns, not an error',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Join explorer',
        caption: 'Change `how` and the key duplication and watch the row count move.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      '`pandas.merge` performs a relational join between two frames on one or more key columns or index levels, producing for each key value the cartesian product of the matching rows on each side, restricted by the join type: inner retains only keys present in both, left and right retain all keys from the named side padding the other with missing values, and outer retains the union. `pandas.concat` performs no key matching: it stacks objects along an axis, aligning on the other axis\'s labels.',

    codeExamples: [
      {
        language: 'python',
        title: 'The four join types, and what each one does to non-matching rows',
        runnable: true,
        code: `import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "name": ["Ada", "Bo", "Cleo"],
})
orders = pd.DataFrame({
    "order_id": [101, 102, 103, 104],
    "customer_id": [1, 1, 2, 99],      # 99 belongs to a deleted customer
    "amount": [24.99, 64.00, 112.50, 8.75],
})

print("inner — only matching rows survive:")
print(pd.merge(orders, customers, on="customer_id", how="inner"))
print()
print("left — every order kept, unmatched customer columns become NaN:")
print(pd.merge(orders, customers, on="customer_id", how="left"))
print()
print("outer, with indicator — shows exactly what failed to match:")
merged = pd.merge(orders, customers, on="customer_id", how="outer", indicator=True)
print(merged)
print()
print(merged["_merge"].value_counts().to_dict())`,
        output: `inner — only matching rows survive:
   order_id  customer_id  amount name
0       101            1   24.99  Ada
1       102            1   64.00  Ada
2       103            2  112.50   Bo

left — every order kept, unmatched customer columns become NaN:
   order_id  customer_id  amount name
0       101            1   24.99  Ada
1       102            1   64.00  Ada
2       103            2  112.50   Bo
3       104           99    8.75  NaN

outer, with indicator — shows exactly what failed to match:
   order_id  customer_id  amount  name      _merge
0     101.0            1   24.99   Ada        both
1     102.0            1   64.00   Ada        both
2     103.0            2  112.50    Bo        both
3     104.0           99    8.75   NaN   left_only
4       NaN            3     NaN  Cleo  right_only

{'both': 3, 'left_only': 1, 'right_only': 1}`,
        explanation:
          'Three joins, three different truths. The inner join quietly drops order 104 because its customer no longer exists, so a revenue total computed afterwards is short by 8.75 and nothing in the output says so. The left join keeps every order and marks the missing customer with NaN, which is honest and lets you count the orphans. The outer join adds Cleo, a customer who has never ordered, and `indicator=True` labels every row as `both`, `left_only` or `right_only` — a one-line audit of the join that is worth running even when you intend to use `how="left"`. Note also that the outer join turned `order_id` into a float, because the row for Cleo has no order id and integers cannot hold a missing value.',
      },
      {
        language: 'python',
        title: 'The row explosion, and how to catch it before it happens',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "order_id": [1, 1, 2],
    "sku": ["A", "B", "A"],
    "order_total": [100.0, 100.0, 50.0],   # repeated per line, as in real extracts
})
shipments = pd.DataFrame({
    "order_id": [1, 1, 2],
    "carrier": ["dhl", "royal-mail", "dhl"],
})

print("left rows:", len(orders), " right rows:", len(shipments))
print("key duplicated on left? ", orders["order_id"].duplicated().any())
print("key duplicated on right?", shipments["order_id"].duplicated().any())
print()

bad = pd.merge(orders, shipments, on="order_id", how="left")
print(bad)
print()
print("revenue before:", orders.drop_duplicates("order_id")["order_total"].sum())
print("revenue after :", bad["order_total"].sum(), "<- counted several times")
print()

try:
    pd.merge(orders, shipments, on="order_id", how="left", validate="many_to_one")
except Exception as e:
    print(type(e).__name__, ":", e)`,
        output: `left rows: 3  right rows: 3
key duplicated on left?  True
key duplicated on right? True

   order_id sku  order_total     carrier
0         1   A        100.0         dhl
1         1   A        100.0  royal-mail
2         1   B        100.0         dhl
3         1   B        100.0  royal-mail
4         2   A         50.0         dhl

revenue before: 150.0
revenue after : 450.0 <- counted several times

MergeError : Merge keys are not unique in right dataset; not a many-to-one merge`,
        explanation:
          'Order 1 has two lines and two shipments, so the merge produces every combination: two times two is four rows for that order alone, and the order total of 100 now appears four times. Summing it gives 450 instead of 150, with no warning of any kind. The defence is in the three lines before the merge: check whether the key is duplicated on each side, decide what the relationship should be, and then tell pandas with `validate=`. Here `validate="many_to_one"` raises a `MergeError` naming the offending side, which is exactly the behaviour you want — a failure at the point of the mistake rather than a wrong number three steps later. If the many-to-many relationship is genuine, aggregate one side first, for example reducing shipments to one row per order with a list or a count of carriers.',
      },
      {
        language: 'python',
        title: 'concat, suffixes and joining on differently named keys',
        runnable: true,
        code: `import pandas as pd

jan = pd.DataFrame({"order_id": [1, 2], "amount": [10.0, 20.0]})
feb = pd.DataFrame({"order_id": [3, 4], "amount": [30.0, 40.0]})

stacked = pd.concat([jan, feb], ignore_index=True)
print(stacked)
print()

# concat does not check for compatibility: a typo creates a new column
feb_typo = feb.rename(columns={"amount": "ammount"})
print(pd.concat([jan, feb_typo], ignore_index=True))
print()

# Keys with different names, and overlapping non-key column names
left = pd.DataFrame({"cust_id": [1, 2], "score": [0.8, 0.6]})
right = pd.DataFrame({"customer_id": [1, 2], "score": [10, 20]})
merged = pd.merge(left, right, left_on="cust_id", right_on="customer_id",
                  suffixes=("_model", "_manual"))
print(merged)`,
        output: `   order_id  amount
0         1    10.0
1         2    20.0
2         3    30.0
3         4    40.0

   order_id  amount  ammount
0         1    10.0      NaN
1         2    20.0      NaN
2         3     NaN     30.0
3         4     NaN     40.0

   cust_id  score_model  customer_id  score_manual
0        1          0.8            1            10
1        2          0.6            2            20`,
        explanation:
          '`concat` stacks without matching anything, and `ignore_index=True` renumbers the result so you do not end up with duplicate labels 0 and 1 — a genuine problem later, because `loc[0]` would then return two rows. The middle block is the failure mode to watch for: a misspelled column produces two half-empty columns rather than an error, so after any concatenation it is worth asserting that the column set is what you expected. The last block shows two common merge arguments: `left_on`/`right_on` when the key has different names on each side, which leaves you with both key columns to drop afterwards, and `suffixes` to disambiguate non-key columns that share a name. The default suffixes are `_x` and `_y`, which tell a future reader nothing — naming them is a small courtesy that pays for itself.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Building a feature table',
        usage:
          'Model features come from several sources — transactions, support tickets, web sessions — each aggregated to one row per customer and then left-joined onto the customer list, so every customer survives and missing sources are visibly NaN.',
      },
      {
        context: 'Reconciling two systems',
        usage:
          'An outer join with `indicator=True` between finance and warehouse extracts produces a three-way report: matched, in finance only, in warehouse only. The unmatched rows are the entire point of the exercise.',
      },
      {
        context: 'Appending daily partitions',
        usage:
          'A pipeline reads one file per day and concatenates them into a month. Because `concat` does not validate columns, a schema change upstream appears as a new half-empty column rather than an error, which is why the column set is asserted after the stack.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`merge`, `join` and `concat` cover the relational and stacking operations; `merge_asof` handles nearest-key joins for time series.' },
      { tool: 'SQL', role: 'The same join semantics, and the same failure modes; `validate=` is pandas\' equivalent of the constraints a database would enforce for you.' },
      { tool: 'scikit-learn', role: 'Feature tables assembled by joins feed directly into pipelines, so a row explosion during assembly silently changes the training distribution.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using an inner join by habit',
        why: 'It silently discards rows that fail to match, so the analysis quietly describes a subset. A revenue total computed after an inner join can be materially short with no visible sign.',
        fix: 'Default to `how="left"` when one table defines the population, and compare `len(result)` to `len(left)` after every merge.',
      },
      {
        mistake: 'Not checking key cardinality before merging',
        why: 'If the key repeats on both sides, every combination is produced. Row counts multiply, and any sum over a column from either side is inflated.',
        fix: 'Check `duplicated().any()` on each side, then pass `validate="one_to_one"`, `"one_to_many"` or `"many_to_one"` so a mistake raises immediately.',
      },
      {
        mistake: 'Joining on keys with mismatched dtypes',
        why: 'An int64 `customer_id` does not match a string `"1"`, so the join matches nothing and returns an empty frame or a wall of NaN with no error at all.',
        fix: 'Compare dtypes before merging and cast deliberately. Also strip whitespace and normalise case on text keys, since " A1" and "A1" are different values.',
      },
      {
        mistake: 'Ignoring the default `_x` and `_y` suffixes',
        why: 'When both sides have a column of the same name, the result carries two uninformative columns and a later reference to the wrong one is undetectable by reading the code.',
        fix: 'Pass meaningful `suffixes=("_model", "_manual")`, or rename or drop the overlapping columns before the merge.',
      },
      {
        mistake: 'Concatenating frames without checking the columns align',
        why: '`concat` unions the column labels, so a renamed or misspelled column becomes a separate, half-empty column rather than an error.',
        fix: 'Assert the column sets are equal before concatenating, or use `pd.concat(..., join="inner")` when only shared columns are wanted.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain the difference between inner, left and outer joins, and when you would use each.',
        answer:
          'They differ only in what happens to rows that find no partner. Inner keeps only keys present in both tables, so unmatched rows from either side disappear. Left keeps every row of the left table and fills the right-hand columns with NaN where there was no match. Outer keeps everything from both sides, padding with NaN in whichever direction is missing. In practice I default to left when one table defines the population I am analysing — every order, every customer — because unmatched rows then show up as visible NaN rather than vanishing. Inner is appropriate when a record is genuinely meaningless without its partner, and I check the row count afterwards. Outer is mostly a reconciliation tool: combined with `indicator=True` it tells me exactly which keys are on one side only, which is often the actual question.',
      },
      {
        level: 'intermediate',
        question: 'A merge produces more rows than either input table. What happened, and how do you prevent it?',
        answer:
          'The join key is duplicated on both sides, so for each key value the merge emits the cartesian product of the matching rows: a key appearing twice on the left and three times on the right yields six rows. Nothing errors, and any sum over a column from either side is now inflated, because values have been repeated. The prevention is to establish cardinality before merging: check `duplicated().any()` on the key on each side, and declare the expected relationship with `validate="one_to_one"`, `"one_to_many"` or `"many_to_one"`, which raises a `MergeError` if the data disagrees. If the many-to-many relationship is genuine, the fix is to aggregate one side to one row per key first, so the join becomes many-to-one. Either way I compare `len(result)` with `len(left)` after the merge, because for a left join with a unique right key those must be equal.',
        followUp:
          'A strong answer mentions that the same trap is much harder to spot in SQL because you rarely see the row count, and that `indicator=True` gives a cheap post-merge audit.',
      },
      {
        level: 'ml-engineer',
        question: 'What can go wrong when assembling a feature table from several sources by joining?',
        answer:
          'Four things, all of them quiet. Row explosion from an unnoticed many-to-many relationship changes the effective training distribution by duplicating some entities more than others, which reweights the model without touching a single hyperparameter. Inner joins by habit shrink the population and often shrink it non-randomly — customers with no support tickets disappear — so the model is trained on a biased subset. Key dtype or formatting mismatches produce a feature that is entirely NaN, which a tree model will happily accept and ignore, so the feature appears useless when it is actually unjoined. And time is the subtle one: joining a feature computed later than the prediction moment leaks the future into training, which is why point-in-time correctness and `merge_asof` exist. The defences are cheap: assert row counts before and after, use `validate=`, check the non-null rate of every joined feature, and make the time semantics of every join explicit.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'You left-join `orders` (1000 rows) to `customers` and get 1240 rows. Diagnose the cause and write the code that confirms it.',
        hint: 'A left join can only grow if the right side is not unique on the key.',
        solution:
          'A left join returns one row per left row per matching right row, so growth means the key is duplicated in `customers`. Confirm with:\n\ncustomers["customer_id"].duplicated().sum()\ncustomers[customers["customer_id"].duplicated(keep=False)].sort_values("customer_id")\n\nThe usual causes are a customer table containing history rows, one per address change, or an extract loaded twice. The fix is to reduce the right side to one row per key first — deduplicate, or select the current record — and then re-run the merge with `validate="many_to_one"` so the same mistake cannot recur silently.',
      },
      {
        prompt:
          'Write a merge that keeps every order, uses `customer_id` on the left and `id` on the right, names the overlapping `score` columns clearly, and reports how many orders had no matching customer.',
        hint: 'Four arguments, plus one column to inspect afterwards.',
        solution:
          'merged = pd.merge(\n    orders, customers,\n    left_on="customer_id", right_on="id",\n    how="left",\n    suffixes=("_order", "_customer"),\n    indicator=True,\n)\nprint((merged["_merge"] == "left_only").sum(), "orders had no matching customer")\n\n`indicator=True` adds a `_merge` column recording the origin of every row, which turns "did this join work?" into a number rather than an impression. Remember to drop the redundant `id` column afterwards, since `left_on`/`right_on` keeps both key columns.',
      },
      {
        prompt:
          'Explain why a merge on `customer_id` returns an empty frame even though both tables clearly contain the same ids, and how you would confirm the cause in two lines.',
        hint: 'Matching is by value, and a value carries a type.',
        solution:
          'Almost always a dtype or formatting mismatch: one side holds int64 and the other holds strings, or the text key has trailing whitespace or differing case on one side. The integer 1 and the string "1" are different values, so nothing matches and pandas reports no error at all. Confirm with:\n\nprint(left["customer_id"].dtype, right["customer_id"].dtype)\nprint(set(left["customer_id"].head(20)) & set(right["customer_id"].head(20)))\n\nAn empty intersection with identical-looking values is the signature. Fix by casting both sides deliberately and, for text keys, applying `.str.strip().str.lower()` before joining.',
      },
    ],

    quiz: [
      {
        id: 'PD-010-q1',
        type: 'mcq',
        concept: 'join types',
        prompt: 'Which join keeps every row of the left table, filling unmatched right-hand columns with NaN?',
        options: ['left', 'inner', 'outer', 'cross'],
        answerIndex: 0,
        explanation:
          'A left join preserves the left table as the population and marks non-matches with NaN. Inner would drop them silently, and outer would additionally add right-only rows.',
      },
      {
        id: 'PD-010-q2',
        type: 'numeric',
        concept: 'row explosion',
        prompt: 'A key value appears 3 times in the left table and 4 times in the right. How many rows does that key contribute to an inner merge?',
        answer: 12,
        explanation:
          'Every matching pair is produced, so the key contributes 3 × 4 = 12 rows. This multiplication is the row explosion, and it inflates any sum over a column from either side.',
      },
      {
        id: 'PD-010-q3',
        type: 'truefalse',
        concept: 'key dtypes',
        prompt: 'Merging an int64 key against a string key raises an error so the mistake cannot go unnoticed.',
        answer: false,
        explanation:
          'It does not raise; the values simply never compare equal, so you get an empty result or a wall of NaN. Comparing dtypes before merging is the only reliable defence.',
      },
      {
        id: 'PD-010-q4',
        type: 'match',
        concept: 'choosing an operation',
        prompt: 'Match each task to the right operation.',
        pairs: [
          { left: 'Attach customer details to each order', right: 'merge on customer_id, how="left"' },
          { left: 'Stack this month\'s orders onto last month\'s', right: 'concat(axis=0, ignore_index=True)' },
          { left: 'Find keys present in one system but not the other', right: 'merge(how="outer", indicator=True)' },
          { left: 'Place two frames side by side by matching index', right: 'concat(axis=1)' },
        ],
        explanation:
          'Joining combines different information about the same entities; concatenation combines the same information about different entities. Reaching for the wrong one produces either duplicated columns or an unexpected row count.',
      },
      {
        id: 'PD-010-q5',
        type: 'debug',
        language: 'python',
        concept: 'validation',
        prompt: 'Which argument would have made this merge fail loudly instead of silently multiplying rows, given that `customers` has duplicate ids?',
        code: 'pd.merge(orders, customers, on="customer_id", how="left")',
        options: [
          'validate="many_to_one"',
          'sort=True',
          'copy=False',
          'suffixes=("_l", "_r")',
        ],
        answerIndex: 0,
        explanation:
          '`validate="many_to_one"` asserts that the right key is unique and raises a MergeError otherwise. The other arguments affect ordering, copying and column naming, none of which detects a cardinality problem.',
      },
      {
        id: 'PD-010-q6',
        type: 'explain',
        concept: 'join discipline',
        prompt: 'Describe the checks you would run around a merge in a production pipeline, and what each one protects against.',
        rubric: [
          'Checks key dtypes and formatting before merging',
          'Establishes cardinality and uses validate= to enforce it',
          'Reconciles row counts and uses indicator= to quantify non-matches',
        ],
        sampleAnswer:
          'Before the merge I compare the key dtypes on both sides, because an integer key will never match a string key and the failure is completely silent. I normalise text keys with strip and lower for the same reason. Then I check whether the key is duplicated on each side, which tells me whether the relationship is one-to-one, one-to-many or many-to-many, and I encode my expectation in `validate=` so a violation raises a MergeError at the point of the mistake rather than becoming a wrong total later. I merge with `indicator=True` and record the counts of `both`, `left_only` and `right_only`, since that turns "did the join work?" into a number I can alert on. Afterwards I assert the row count against the left table — for a left join with a unique right key they must be equal — and I check the non-null rate of the newly joined columns, because a feature that is entirely NaN usually means the join failed rather than that the data is missing.',
        explanation:
          'Joins fail quietly more often than any other pandas operation, so the examinable skill is the discipline around the call rather than the call itself.',
      },
    ],

    flashcards: [
      { front: 'What does `how="left"` guarantee?', back: 'Every row of the left table survives; unmatched right-hand columns are filled with NaN.' },
      { front: 'Why can a merge produce more rows than either input?', back: 'Duplicated keys on both sides produce every matching combination — m × n rows for that key.' },
      { front: 'What does `validate="one_to_many"` do?', back: 'Asserts the left key is unique and raises a MergeError if it is not, catching cardinality mistakes at the merge.' },
      { front: 'What does `indicator=True` add?', back: 'A `_merge` column labelling each row `both`, `left_only` or `right_only` — a one-line audit of the join.' },
      { front: 'Why does a merge sometimes return nothing despite matching ids?', back: 'Key dtype or formatting mismatch — int64 against string, or stray whitespace. No error is raised.' },
      { front: 'merge or concat?', back: 'merge combines different information about the same entities via a key; concat stacks the same information about different entities.' },
    ],

    challenge: {
      title: 'A safe join helper',
      brief:
        'Write `safe_merge(left, right, on, how="left", expect=None)` that checks key dtypes on both sides, reports the cardinality it detects, performs the merge with `indicator=True`, and returns both the result and a report containing the input row counts, the output row count, the match counts by category, and the non-null rate of each newly added column. If `expect` names a cardinality, pass it through to `validate` so a violation raises.',
      language: 'python',
      acceptanceCriteria: [
        'Raises a clear error when the key dtypes differ between the two frames',
        'Detects and reports cardinality rather than assuming it',
        'Returns a report containing row counts before and after, plus match counts by category',
        'Reports the non-null rate of every column added by the join',
      ],
      starterCode:
        'import pandas as pd\n\n\ndef safe_merge(left: pd.DataFrame, right: pd.DataFrame, on: str,\n               how: str = "left", expect: str | None = None):\n    if left[on].dtype != right[on].dtype:\n        raise TypeError(f"key {on!r} has dtype {left[on].dtype} on the left and {right[on].dtype} on the right")\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me how to combine two tables, and warn me about the mistake that silently changes my numbers.',
      mustCover: [
        'Joining matches on a key; concatenating stacks without matching',
        'The join type decides what happens to rows with no partner',
        'Duplicated keys on both sides multiply rows and inflate sums',
        'Check dtypes, cardinality and row counts around every merge',
      ],
      bonusSignals: ['mentions indicator=True and validate=', 'prefers left join as the default', 'mentions that a dtype mismatch fails silently'],
      sampleExplanation:
        'There are two different operations here and mixing them up is the first source of trouble. Joining matches rows between tables using a shared key — for each order, find the customer with that id and attach their name. Concatenating just stacks tables: this month\'s orders on top of last month\'s, no matching involved. For joins, the decision that matters most is what happens to rows with no partner. An inner join keeps only the matches and throws the rest away without telling you, which is how a revenue total ends up quietly short. A left join keeps every row on the left and puts NaN where the match failed, which is usually what you want because the NaN is visible and true. Add `indicator=True` and you get a column saying whether each row matched, which turns "did this work?" into a number. Now the trap worth genuinely fearing: if the key repeats on both sides, the merge produces every combination, so two rows joined to three rows gives six. Nothing errors. Any column you then sum has been duplicated, and your total is wrong by an amount nobody can see. So before every merge: check the key dtypes match, because an integer id will never match a text id and that failure is completely silent; check whether the key is duplicated on each side; tell pandas what you expect with `validate="many_to_one"` so it raises if you are wrong; and afterwards compare the row count with the left table, which for a left join with a unique right key must be identical.',
    },
  },
  {
    id: 'PD-011',
    domain: 'PD',
    module: 'Reshaping',
    topic: 'Reshaping between wide and long',
    title: 'pivot, melt and Wide vs Long',
    slug: 'pivot-melt-wide-long',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['PD-009'],
    related: ['PD-002', 'PD-010'],
    tags: ['pivot', 'pivot_table', 'melt', 'stack', 'unstack', 'tidy-data'],

    learningObjectives: [
      'Describe the difference between wide and long layouts and say which tasks each one suits',
      'Reshape long to wide with `pivot` and `pivot_table`, and explain why only one of them tolerates duplicate keys',
      'Reshape wide to long with `melt`, naming the identifier, variable and value columns deliberately',
      'Use `stack` and `unstack` to move labels between the index and the columns, and flatten the result for export',
    ],

    terminology: [
      {
        term: 'Long (tidy) format',
        definition:
          'One row per observation, with variables identified by a key column: `date`, `metric`, `value`. Adding a new metric adds rows, not columns.',
        simple: 'Every measurement gets its own row, with a column saying what it is.',
      },
      {
        term: 'Wide format',
        definition:
          'One row per entity with each variable in its own column: `date`, `temp`, `humidity`. Adding a new metric adds a column.',
        simple: 'Each kind of measurement gets its own column.',
      },
      {
        term: 'pivot',
        definition:
          'Turns unique values of one column into column headers. It performs no aggregation, so a duplicated index-column pair raises `ValueError`.',
        simple: 'Spread a key column out across the top, assuming each combination appears once.',
      },
      {
        term: 'pivot_table',
        definition:
          'The aggregating form of pivot: duplicates are combined with `aggfunc`, which defaults to the mean, and `margins=True` adds totals.',
        simple: 'Like a spreadsheet pivot table: it groups and summarises as it spreads.',
      },
      {
        term: 'melt',
        definition:
          'The inverse of pivot: collapses a set of columns into two, one holding the former column names and one holding the values.',
        simple: 'Fold the columns back down into rows.',
      },
    ],

    simpleExplanation:
      "The same data can be written down in two shapes and both are correct. Wide means one row per thing and one column per measurement: a row for each date, with a column for temperature and another for humidity. Long means one row per measurement: date, then a column saying which measurement this is, then its value. Wide is what people want to read, because it fits a page and the eye can scan across. Long is what tools want to consume, because every row has the same structure, so adding a new measurement adds rows rather than forcing you to change the schema. Almost everything you do in pandas is easier in long form — grouping, filtering, plotting by category — and almost every report you hand to a human is wide. So you learn two moves and use them constantly. `pivot` and `pivot_table` go long to wide, spreading a key column across the top. `melt` goes wide to long, folding a set of columns back down into a name column and a value column. Knowing which shape you need is more than half the battle.",

    whyItExists:
      'Data is collected in whatever shape the source system produced, and neither analysis tools nor human readers want that shape. Reshaping exists so the layout can be chosen for the task rather than inherited from the source, and it means adding a new measurement does not require a schema change everywhere downstream.',

    analogy: {
      scenario:
        'Think of a school report. The version sent home is a grid: one row per pupil, one column per subject, so a parent can read across a single line and see the whole picture. The version the school stores in its database is a list: pupil, subject, mark, one line per result. If a new subject is introduced, the database version simply gains more lines, while the grid version needs a new column and every printed template has to be redesigned.',
      mapping: [
        { from: 'The grid sent home to parents', to: 'Wide format: one row per entity, one column per variable' },
        { from: 'The list of pupil-subject-mark rows', to: 'Long format: one row per observation' },
        { from: 'Adding a new subject to the database', to: 'Adding rows, with no schema change' },
        { from: 'Redesigning the printed grid for a new subject', to: 'Adding a column, which breaks downstream code expecting fixed columns' },
        { from: 'Producing the grid from the list at print time', to: '`pivot` — spreading the subject column across the top' },
      ],
      bridge:
        'The school keeps the long form and generates the wide form on demand, and that is exactly the discipline to adopt: store and compute in long, present in wide. The reason is visible in the analogy — a grouping question such as "average mark per subject" is a one-line `groupby` on the list and an awkward column-by-column operation on the grid. The conversion in the other direction, `melt`, is what you do when someone hands you the grid and you need the list back before you can work with it.',
      limitations:
        'Long form is not free. It repeats the identifier on every row, so a wide table of 50 numeric columns becomes 50 times as many rows, and for dense numeric matrices — images, embeddings, correlation matrices — wide is both smaller and faster.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The same three readings, both ways round',
        caption: 'Long on the left of the divider, wide on the right. Identical information.',
        columns: ['long: date', 'long: metric', 'long: value', 'wide: date', 'wide: temp_c', 'wide: humidity'],
        rows: [
          ['2026-03-01', 'temp_c', '18.5', '2026-03-01', '18.5', '55'],
          ['2026-03-01', 'humidity', '55', '2026-03-02', '21.0', '57'],
          ['2026-03-02', 'temp_c', '21.0', '(two rows)', '(two columns)', ''],
          ['2026-03-02', 'humidity', '57', '', '', ''],
        ],
      },
      {
        kind: 'compare',
        title: 'Wide versus long: pick by the task',
        left: {
          heading: 'Wide is right for',
          points: [
            'Reports a human will read across',
            'A feature matrix for a model: one row per entity, one column per feature',
            'Correlation matrices and dense numeric grids',
            'Spreadsheet export, where columns are the natural unit',
          ],
        },
        right: {
          heading: 'Long is right for',
          points: [
            'Grouping and aggregating by category',
            'Plotting several series with one colour-by argument',
            'Storage where new metrics appear over time',
            'Any operation that should treat all metrics identically',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Choosing a reshaping tool',
        caption: 'Four questions get you to the right call every time.',
        branching: true,
        steps: [
          { label: 'Which direction?', detail: 'Long to wide means pivot; wide to long means melt.' },
          { label: 'Going wide: is each key pair unique?', detail: 'If yes, `pivot` is exact and will raise if you are wrong. If no, you must aggregate.' },
          { label: 'Going wide with duplicates', detail: '`pivot_table(index=..., columns=..., values=..., aggfunc="sum")` — state the aggregation rather than accepting the mean by default.' },
          { label: 'Going long', detail: '`melt(id_vars=[...], value_vars=[...], var_name="metric", value_name="value")`, naming both output columns.' },
          { label: 'Moving labels, not values', detail: '`stack` pushes column labels into the index; `unstack` pulls an index level back out into columns.' },
          { label: 'Flatten before export', detail: '`reset_index()` and, for a MultiIndex header, join the levels into single names.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Reshape the same table both ways',
        caption: 'Pivot then melt and confirm you get back what you started with.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      'Reshaping moves information between the row index, the column index and the values of a table without changing the underlying observations. `pivot` is an injective relabelling requiring uniqueness of the index-column pairs; `pivot_table` composes a `groupby` aggregation with that relabelling, so duplicates are permitted; `melt` is its inverse, mapping a set of column labels into a variable column and their cell contents into a value column. `stack` and `unstack` perform the same movement between index levels and column levels.',

    codeExamples: [
      {
        language: 'python',
        title: 'Long to wide: pivot when keys are unique, pivot_table when they are not',
        runnable: true,
        code: `import pandas as pd

readings = pd.DataFrame({
    "date":   ["2026-03-01", "2026-03-01", "2026-03-02", "2026-03-02"],
    "metric": ["temp_c", "humidity", "temp_c", "humidity"],
    "value":  [18.5, 55.0, 21.0, 57.0],
})

wide = readings.pivot(index="date", columns="metric", values="value")
print(wide)
print()

# Now with duplicates: two sensors report the same metric on the same day
dup = pd.concat([readings, pd.DataFrame({
    "date": ["2026-03-01"], "metric": ["temp_c"], "value": [19.5]})])

try:
    dup.pivot(index="date", columns="metric", values="value")
except ValueError as e:
    print("pivot fails:", e)

print()
print(dup.pivot_table(index="date", columns="metric", values="value", aggfunc="mean"))`,
        output: `metric      humidity  temp_c
date
2026-03-01      55.0    18.5
2026-03-02      57.0    21.0

pivot fails: Index contains duplicate entries, cannot reshape

metric      humidity  temp_c
date
2026-03-01      55.0    19.0
2026-03-02      57.0    21.0`,
        explanation:
          '`pivot` is a pure relabelling: it assumes each index-column pair occurs exactly once and raises if that assumption is violated, which is a feature rather than an inconvenience — the error tells you something true about your data. `pivot_table` accepts duplicates because it aggregates them, and the 19.0 in the last table is the mean of 18.5 and 19.5. Always pass `aggfunc` explicitly: the default is the mean, and silently averaging what you believed were unique values is a mistake nobody spots by reading the output. Note also that the column index is named `metric`, which is what the extra header line in the printed output is showing.',
      },
      {
        language: 'python',
        title: 'Wide to long with melt, and a full round trip',
        runnable: true,
        code: `import pandas as pd

wide = pd.DataFrame({
    "student":  ["Ada", "Bo", "Cleo"],
    "maths":    [91, 78, 84],
    "physics":  [88, 71, 90],
    "essay":    [75, 85, 69],
})

long = wide.melt(
    id_vars=["student"],
    value_vars=["maths", "physics", "essay"],
    var_name="subject",
    value_name="mark",
)
print(long)
print()
print("mean mark per subject:")
print(long.groupby("subject")["mark"].mean().round(1).to_dict())
print()

back = long.pivot(index="student", columns="subject", values="mark").reset_index()
back.columns.name = None
print(back[["student", "maths", "physics", "essay"]])`,
        output: `  student  subject  mark
0     Ada    maths    91
1      Bo    maths    78
2    Cleo    maths    84
3     Ada  physics    88
4      Bo  physics    71
5    Cleo  physics    90
6     Ada    essay    75
7      Bo    essay    85
8    Cleo    essay    69

mean mark per subject:
{'essay': 76.3, 'maths': 84.3, 'physics': 83.0}

subject student  maths  physics  essay
0           Ada     91       88     75
1            Bo     78       71     85
2          Cleo     84       90     69`,
        explanation:
          '`melt` needs three decisions: which columns identify the row (`id_vars`), which columns are being folded down (`value_vars`), and what the two new columns should be called. Naming them is worth the keystrokes — the defaults are `variable` and `value`, which tell a later reader nothing. Look at what the long form buys you: the mean per subject is a one-line `groupby`, whereas in wide form it would mean selecting three columns by name and remembering to update that list whenever a subject is added. The round trip back to wide shows two tidying steps that are easy to forget: `reset_index()` turns the pivoted index back into a column, and clearing `columns.name` removes the stray "subject" header that otherwise appears above the row labels on export.',
      },
      {
        language: 'python',
        title: 'pivot_table with margins, and stack/unstack for moving labels',
        runnable: true,
        code: `import pandas as pd

sales = pd.DataFrame({
    "region":  ["north", "north", "south", "south", "north", "south"],
    "quarter": ["Q1", "Q2", "Q1", "Q2", "Q1", "Q2"],
    "revenue": [100.0, 120.0, 80.0, 95.0, 40.0, 30.0],
})

report = sales.pivot_table(
    index="region", columns="quarter", values="revenue",
    aggfunc="sum", margins=True, margins_name="total",
)
print(report)
print()

grid = sales.pivot_table(index="region", columns="quarter", values="revenue", aggfunc="sum")
print("unstacked grid -> stacked long Series:")
print(grid.stack())
print()
print("and back again:")
print(grid.stack().unstack())`,
        output: `quarter     Q1     Q2  total
region
north    140.0  120.0  260.0
south     80.0  125.0  205.0
total    220.0  245.0  465.0

unstacked grid -> stacked long Series:
region  quarter
north   Q1         140.0
        Q2         120.0
south   Q1          80.0
        Q2         125.0
dtype: float64

and back again:
quarter     Q1     Q2
region
north    140.0  120.0
south     80.0  125.0`,
        explanation:
          '`margins=True` adds the row and column totals that make a table a report rather than a grid, and `margins_name` lets you call them something sensible. The second block shows the other pair of reshaping tools: `stack` moves the innermost column level down into the index, producing a long Series with a MultiIndex, and `unstack` moves an index level back up into the columns. They are the general mechanism that `pivot` and `melt` are convenient special cases of, and they are what you reach for when the labels are already in the index rather than in a column. A practical warning: `stack` drops missing combinations by default, so a round trip through `stack().unstack()` can silently lose an all-missing row or column.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Producing a management report',
        usage:
          'Transaction rows are stored long and pivoted to a region-by-quarter grid with margins for the monthly pack. The long store never changes when a new region appears; only the report grows a row.',
      },
      {
        context: 'Plotting several series',
        usage:
          'Seaborn and Plotly want long data: one column of values, one column saying which series each value belongs to. Melting first is usually the shortest path from a wide extract to a multi-series chart.',
      },
      {
        context: 'Building a feature matrix',
        usage:
          'Event logs are long — one row per event — and models need wide: one row per customer with a column per aggregated feature. That conversion is a `pivot_table` with an explicit `aggfunc`, and it is where most feature engineering physically happens.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`pivot`, `pivot_table`, `melt`, `stack` and `unstack` cover every reshaping need; `crosstab` is a convenience wrapper over `pivot_table` for frequency counts.' },
      { tool: 'seaborn', role: 'Its figure-level functions expect long data, with `hue` and `col` naming the columns that distinguish series.' },
      { tool: 'scikit-learn', role: 'Expects wide: one row per sample, one column per feature, which is the target shape of the pivot at the end of feature engineering.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `pivot` on data with duplicate index-column pairs',
        why: '`pivot` performs no aggregation, so duplicates make the operation ill-defined and it raises "Index contains duplicate entries, cannot reshape".',
        fix: 'Decide what duplicates mean. If they should be combined, use `pivot_table` with an explicit `aggfunc`; if they should not exist, deduplicate and find out why they do.',
      },
      {
        mistake: 'Accepting the default `aggfunc="mean"` in `pivot_table`',
        why: 'Counts and revenues should usually be summed, not averaged, and the mean of what you believed were unique values silently hides that the keys were not unique.',
        fix: 'Always pass `aggfunc` explicitly, and check the row count before and after to confirm the aggregation did what you expected.',
      },
      {
        mistake: 'Leaving a MultiIndex header after pivoting and then trying to export',
        why: 'Pivoting several value columns produces two-level column labels, which CSV export flattens into awkward names and later code cannot reference simply.',
        fix: 'Flatten deliberately: `df.columns = ["_".join(c).strip("_") for c in df.columns]`, then `reset_index()`.',
      },
      {
        mistake: 'Melting without naming the output columns',
        why: 'The defaults `variable` and `value` carry no meaning, so three steps later nobody can tell whether `variable` holds a metric, a subject or a quarter.',
        fix: 'Always pass `var_name` and `value_name`. The cost is two arguments; the benefit is a self-describing table.',
      },
      {
        mistake: 'Storing data wide because the first extract arrived that way',
        why: 'Every new metric then requires a schema change, and every grouping question requires naming columns explicitly, so code breaks whenever the data grows.',
        fix: 'Store and compute long, pivot to wide only at the point of presentation or model input.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between wide and long format, and when would you use each?',
        answer:
          'Wide has one row per entity and one column per variable; long has one row per observation, with a column naming the variable and another holding its value. Long is better for computation and storage: every row has the same structure, so grouping and plotting treat all variables identically, and adding a new variable adds rows rather than changing the schema. Wide is better for human reading and for model input, where the convention is one row per sample and one column per feature. In practice I store and compute in long and pivot to wide at the point of presentation. The one caveat is size: long repeats the identifier on every row, so for a dense numeric matrix such as an embedding table, wide is both smaller and faster.',
      },
      {
        level: 'intermediate',
        question: 'When does `pivot` fail where `pivot_table` succeeds, and why is that a useful distinction?',
        answer:
          '`pivot` is a pure relabelling and assumes each index-column pair appears exactly once; given duplicates it raises rather than guessing which value should occupy the cell. `pivot_table` composes a groupby aggregation with the same relabelling, so duplicates are combined using `aggfunc`, which defaults to the mean. The distinction is useful precisely because `pivot` raising is a form of validation: if I believe my keys are unique, `pivot` will tell me when I am wrong, whereas `pivot_table` would quietly average the duplicates and produce a plausible table. So I use `pivot` when uniqueness is an assumption I want checked, and `pivot_table` with an explicit `aggfunc` when aggregation is genuinely intended.',
        followUp:
          'A strong answer mentions `margins=True` for totals and notes that `crosstab` is a thin wrapper over `pivot_table` for frequency counts.',
      },
      {
        level: 'ml-engineer',
        question: 'How does reshaping fit into a feature engineering pipeline, and what can go wrong?',
        answer:
          'Event data arrives long — one row per transaction or interaction — and the model needs one row per entity, so a pivot or a grouped aggregation is the bridge. Several things go wrong in practice. The column set produced by a pivot depends on the values present in the data, so a category absent from this month\'s batch yields a missing feature and the model receives a different schema than it was trained on; the fix is to reindex against a stored column list so the shape is fixed by the pipeline rather than by the data. Aggregating with the wrong function is silent: summing where you meant counting produces a plausible feature with the wrong meaning. And pivoting a high-cardinality key produces thousands of sparse columns, which is usually a sign that a grouped aggregation or an encoding would serve better than a literal reshape.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'You have a long table with `store`, `month` and `sales`. Produce a report with one row per store, one column per month, monthly totals in the cells, and both row and column totals.',
        hint: 'One call, with three positional-style arguments plus two more for the totals.',
        solution:
          'report = sales.pivot_table(\n    index="store", columns="month", values="sales",\n    aggfunc="sum", margins=True, margins_name="total",\n)\n\n`aggfunc="sum"` is stated explicitly because the default is the mean, which would be wrong for sales. `margins=True` adds the totals row and column that make this a report rather than a grid. If you expected each store-month pair to be unique, it is worth also running the `pivot` version first: if it raises, your data has duplicates you did not know about.',
      },
      {
        prompt:
          'A wide table has `patient_id` plus twelve columns `month_1` to `month_12` holding a measurement. Convert it to long form suitable for grouping and plotting, and extract the month number as an integer.',
        hint: 'Melt with everything except the identifier, then pull the number out of the variable column.',
        solution:
          'long = wide.melt(id_vars=["patient_id"], var_name="month_label", value_name="measurement")\nlong["month"] = long["month_label"].str.extract(r"month_(\\d+)").astype(int)\n\nOmitting `value_vars` melts every column that is not an identifier, which is what you want here and stays correct if a thirteenth month is added. Extracting the number turns a text label into a sortable, plottable integer — without it, sorting puts month_10 between month_1 and month_2.',
      },
      {
        prompt:
          'Explain why `pivot_table` silently returning a smaller table than you expected is a warning sign, and how you would investigate.',
        hint: 'What does the aggregation do to rows that share a key?',
        solution:
          'The output has one row per unique index value and one column per unique column value, so a smaller table than expected means several input rows collapsed into the same cell and were aggregated. If you believed the keys were unique, that collapse is a data problem, not a formatting one. Investigate with df.duplicated(subset=["index_col", "column_col"]).sum() and by inspecting a few duplicated groups. Running the `pivot` version is the fastest check of all: it raises on exactly this condition, turning a silent aggregation into an explicit failure.',
      },
    ],

    quiz: [
      {
        id: 'PD-011-q1',
        type: 'mcq',
        concept: 'pivot versus pivot_table',
        prompt: 'Your long table has two rows with the same date and metric. What happens with `pivot`?',
        options: [
          'It raises a ValueError about duplicate entries',
          'It averages the two values',
          'It keeps the last value silently',
          'It creates two columns with the same name',
        ],
        answerIndex: 0,
        explanation:
          '`pivot` performs no aggregation, so a duplicated index-column pair makes the result ill-defined and it raises. That failure is useful: it validates an assumption you were making about your data.',
      },
      {
        id: 'PD-011-q2',
        type: 'truefalse',
        concept: 'pivot_table defaults',
        prompt: '`pivot_table` sums duplicate values by default.',
        answer: false,
        explanation:
          'The default `aggfunc` is the mean, not the sum. For revenue or counts that is almost always wrong, which is why the aggregation should always be stated explicitly.',
      },
      {
        id: 'PD-011-q3',
        type: 'match',
        concept: 'reshaping tools',
        prompt: 'Match each reshaping tool to what it does.',
        pairs: [
          { left: 'pivot', right: 'Long to wide, no aggregation, raises on duplicate keys' },
          { left: 'pivot_table', right: 'Long to wide, aggregating duplicates with aggfunc' },
          { left: 'melt', right: 'Wide to long, folding columns into name and value columns' },
          { left: 'stack', right: 'Moves the innermost column level down into the index' },
        ],
        explanation:
          '`pivot` and `melt` are inverses for the unique-key case; `pivot_table` adds aggregation; `stack` and `unstack` are the general mechanism for moving labels between the two axes.',
      },
      {
        id: 'PD-011-q4',
        type: 'multi',
        concept: 'choosing a layout',
        prompt: 'For which of these is long format the better choice? Select all that apply.',
        options: [
          'Computing a mean per metric with one groupby',
          'Plotting several series distinguished by a colour argument',
          'Feeding a feature matrix to scikit-learn',
          'Storing measurements when new metric types keep appearing',
          'Displaying a correlation matrix',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Grouping, plotting and extensible storage all favour long. A model wants one row per sample and one column per feature, and a correlation matrix is inherently a dense grid — both are wide by nature.',
      },
      {
        id: 'PD-011-q5',
        type: 'code-output',
        language: 'python',
        concept: 'melt shape',
        prompt: 'How many rows does the melted frame have?',
        code: 'import pandas as pd\nwide = pd.DataFrame({"id": [1, 2], "a": [10, 20], "b": [30, 40], "c": [50, 60]})\nprint(len(wide.melt(id_vars=["id"])))',
        options: ['6', '2', '3', '8'],
        answerIndex: 0,
        explanation:
          'Two rows times three melted columns gives six observations. Melting always multiplies the row count by the number of value columns being folded down.',
      },
      {
        id: 'PD-011-q6',
        type: 'explain',
        concept: 'wide versus long',
        prompt: 'Explain to a colleague why you would store data long and present it wide.',
        rubric: [
          'Notes that long form keeps a uniform row structure so all variables are treated identically',
          'Notes that adding a variable in long form adds rows rather than changing the schema',
          'Acknowledges that wide is better for human reading and for model input',
        ],
        sampleAnswer:
          'In long form every row has the same shape — an identifier, a variable name and a value — so any operation I write works for every metric automatically, and grouping or plotting by metric is one argument rather than a list of column names I have to maintain. Critically, when a new metric appears the table simply gains rows; no schema changes, and nothing downstream breaks. Wide form is the opposite: pleasant to read across, and the shape models require, but every new metric is a new column and therefore a change everywhere that names columns explicitly. So the discipline is to keep the long version as the source of truth and generate the wide version at the last moment, for a report or for a model input, where its advantages actually apply.',
        explanation:
          'The examinable idea is that layout is a choice made for a task, and that the storage layout should be the one that tolerates change.',
      },
    ],

    flashcards: [
      { front: 'What is long format?', back: 'One row per observation: an identifier, a variable name and a value. Adding a metric adds rows, not columns.' },
      { front: 'When does `pivot` raise?', back: 'When an index-column pair is duplicated, because it performs no aggregation and the cell would be ambiguous.' },
      { front: 'What is `pivot_table`\'s default aggfunc?', back: 'The mean — which is usually wrong for revenue or counts, so always state it explicitly.' },
      { front: 'Which arguments should you always pass to `melt`?', back: '`id_vars`, plus `var_name` and `value_name`, so the output columns are self-describing.' },
      { front: '`stack` versus `unstack`', back: '`stack` moves the innermost column level into the index; `unstack` moves an index level out into the columns.' },
      { front: 'What does `margins=True` add to a pivot table?', back: 'Row and column totals, named via `margins_name`.' },
    ],

    challenge: {
      title: 'A reversible reshaping utility',
      brief:
        'Write `to_long(df, id_vars)` and `to_wide(long_df, index, columns, values, aggfunc)` such that widening a melted table reproduces the original exactly, including column order and dtypes, for any table whose keys are unique. `to_wide` must flatten any MultiIndex header into single underscore-joined names, reset the index, and raise a clear error if aggregation would silently combine rows when the caller expected uniqueness.',
      language: 'python',
      acceptanceCriteria: [
        'A melt followed by a widen reproduces the original frame, verified with `pandas.testing.assert_frame_equal`',
        'Output columns are named meaningfully rather than `variable` and `value`',
        'MultiIndex headers are flattened and the index is reset before returning',
        'Raises rather than aggregating when the caller asserted uniqueness and the data disagrees',
      ],
      starterCode:
        'import pandas as pd\n\n\ndef to_long(df: pd.DataFrame, id_vars: list[str]) -> pd.DataFrame:\n    return df.melt(id_vars=id_vars, var_name="metric", value_name="value")\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me the difference between wide and long data, and show me how to move between them.',
      mustCover: [
        'Wide is one row per entity with a column per variable; long is one row per observation',
        '`pivot` goes long to wide and raises on duplicate keys; `pivot_table` aggregates them',
        '`melt` goes wide to long, and the output columns should be named',
        'Long suits computation and storage; wide suits human reading and model input',
      ],
      bonusSignals: ['mentions that adding a metric in long form adds rows not columns', 'warns about the default aggfunc being the mean', 'mentions stack/unstack as the general mechanism'],
      sampleExplanation:
        'The same data can be laid out two ways. Wide means one row per thing and one column per measurement: a row per pupil, with a column for maths and another for physics. Long means one row per measurement: pupil, subject, mark. Both hold identical information, but they suit different jobs. Long is better for anything computational, because every row looks the same, so "average mark per subject" is one grouping and adding a new subject just adds rows. Wide is better for a human reading across a page, and it is the shape a model wants: one row per sample, one column per feature. To go long to wide you pivot, spreading a key column across the top. If each combination appears exactly once, use `pivot`, and treat its error as a gift — it is checking an assumption you were making. If there are duplicates you must say how to combine them, which is `pivot_table` with an explicit `aggfunc`; never accept the default, because it is the mean and you usually want the sum. To go the other way you melt, folding a set of columns down into a name column and a value column, and you should name those two columns yourself rather than leaving them as `variable` and `value`. The habit worth building is to store and compute long, and pivot to wide only at the very end.',
    },
  },

  {
    id: 'PD-012',
    domain: 'PD',
    module: 'Time & Features',
    topic: 'Datetimes and time series',
    title: 'Working with Dates and Times',
    slug: 'dates-and-times',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['PD-005', 'PD-007'],
    related: ['PD-009', 'PD-011'],
    tags: ['to_datetime', 'dt-accessor', 'resample', 'datetimeindex', 'timezones', 'rolling'],

    learningObjectives: [
      'Parse text into `datetime64` with `to_datetime`, controlling format, day-first ambiguity and unparseable values',
      'Extract calendar components and derive features with the `.dt` accessor',
      'Use a DatetimeIndex for partial-string selection, slicing and `resample`, and distinguish resampling from `groupby`',
      'Explain the difference between naive and aware timestamps, and the pitfalls of storing local time',
    ],

    terminology: [
      {
        term: 'datetime64[ns]',
        definition:
          'The pandas timestamp dtype: 64-bit integer nanoseconds since the epoch, giving vectorised arithmetic and comparison on dates.',
        simple: 'A real date type, not text that looks like a date.',
      },
      {
        term: '.dt accessor',
        definition:
          'The namespace exposing calendar components and vectorised datetime methods on a datetime Series: `.dt.year`, `.dt.dayofweek`, `.dt.floor`, `.dt.tz_convert`.',
        simple: 'How you pull the year, month or weekday out of a whole column at once.',
      },
      {
        term: 'DatetimeIndex',
        definition:
          'An index of timestamps, which enables partial-string selection such as `df.loc["2026-03"]`, inclusive time slicing, and resampling.',
        simple: 'Using the timestamps as the row labels, which unlocks time-based selection.',
      },
      {
        term: 'Resampling',
        definition:
          'Grouping by regular time intervals: downsampling aggregates to a coarser frequency, upsampling creates finer intervals that must be filled or interpolated.',
        simple: 'Rolling readings up to hours, days or months.',
      },
      {
        term: 'Naive versus aware',
        definition:
          'A naive timestamp carries no timezone and is ambiguous; an aware timestamp carries one, so it names a unique instant and can be converted safely.',
        simple: 'Whether the time knows which part of the world it belongs to.',
      },
    ],

    simpleExplanation:
      "Dates arrive as text, and text is useless for anything you actually want to do with a date. Sorted as text, \"10/03/2026\" comes before \"2/03/2026\", and you cannot ask how many days apart two strings are. So the first move with any date column is to convert it with `to_datetime`, which turns it into a real timestamp type stored as a number of nanoseconds. Once converted, three things become possible. You can pull the calendar apart with the `.dt` accessor — year, month, day of week, hour — which is where most time features for models come from. You can put the timestamps into the index, which lets you write `df.loc[\"2026-03\"]` for a whole month and slice a week by name. And you can resample, which is grouping by regular time buckets: turn per-second readings into hourly averages with one call. The trap to know about from the start is timezones. A timestamp with no timezone does not name a moment in time, it names a wall clock reading, and two systems in different countries will disagree about what it means.",

    whyItExists:
      'Calendars are irregular in ways arithmetic is not: months have different lengths, weeks straddle years, clocks jump forward in spring and some hours occur twice. Encoding dates as integer nanoseconds with calendar-aware helpers means the library handles that irregularity once, correctly, instead of every analyst reimplementing it wrongly with string slicing.',

    analogy: {
      scenario:
        'Think of a train timetable printed for a country that changes its clocks. If the timetable says a train leaves at 01:30 on the night the clocks go back, that time happens twice, and the printed entry does not say which one it means. If it says 01:30 on the night the clocks go forward, that time never happens at all. Only a timetable that also records the offset from a universal reference can say unambiguously when the train leaves.',
      mapping: [
        { from: 'The printed local time with no offset', to: 'A naive timestamp — a wall clock reading, not an instant' },
        { from: 'The time that happens twice in autumn', to: 'An ambiguous local time that cannot be localised without a rule' },
        { from: 'The time that never happens in spring', to: 'A non-existent local time, which raises on localisation' },
        { from: 'Recording the offset from a universal reference', to: 'A timezone-aware timestamp, usually stored as UTC' },
        { from: 'Printing the local time for each station', to: '`tz_convert` at the presentation layer' },
      ],
      bridge:
        'The timetable makes the rule concrete: store the unambiguous instant, present the local reading. In pandas that means parsing to UTC-aware timestamps at ingest, doing all arithmetic and joining there, and calling `tz_convert` only when a human needs to read the result. Mixing naive and aware timestamps raises a `TypeError` on comparison, which is pandas refusing to guess — irritating in the moment and far better than silently comparing a London wall clock with a New York one.',
      limitations:
        'The analogy suggests every timestamp needs a timezone. A birth date or an accounting period is a calendar fact rather than an instant, and forcing a timezone onto it introduces errors at midnight boundaries.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The .dt accessor: what you can pull out of a timestamp',
        caption: 'Every one of these is a vectorised call over the whole column.',
        columns: ['Expression', 'Returns', 'Typical use'],
        rows: [
          ['s.dt.year / .month / .day', 'Integers', 'Calendar grouping and partitioning'],
          ['s.dt.dayofweek', '0 = Monday to 6 = Sunday', 'Weekday versus weekend features'],
          ['s.dt.day_name()', 'Text such as "Monday"', 'Human-readable reports'],
          ['s.dt.hour / .minute', 'Integers', 'Time-of-day demand patterns'],
          ['s.dt.quarter', '1 to 4', 'Financial reporting periods'],
          ['s.dt.is_month_end', 'Boolean', 'Period-end effects in financial data'],
          ['s.dt.floor("h") / .round("15min")', 'Timestamps', 'Bucketing events into intervals'],
          ['(b - a).dt.days', 'Integers', 'Durations from a timedelta difference'],
          ['s.dt.tz_localize("Europe/London")', 'Aware timestamps', 'Attaching a timezone to naive data'],
          ['s.dt.tz_convert("UTC")', 'Aware timestamps', 'Moving an aware timestamp to another zone'],
        ],
      },
      {
        kind: 'compare',
        title: 'resample versus groupby on a date part',
        caption: 'They look similar and answer different questions.',
        left: {
          heading: 'df.resample("D").sum()',
          points: [
            'Requires a DatetimeIndex or a `on=` column',
            'Produces a continuous range of intervals',
            'Days with no data appear as empty rows, not gaps',
            'Right for time series, where an absent day is information',
          ],
        },
        right: {
          heading: 'df.groupby(df.index.date).sum()',
          points: [
            'Works on any grouping key derived from the dates',
            'Produces only the days that actually occur',
            'Missing days are silently absent from the result',
            'Right for categorical summaries, wrong for continuous series',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Handling a date column properly',
        caption: 'Five steps, in this order.',
        steps: [
          { label: 'Parse explicitly', detail: '`pd.to_datetime(s, format="%d/%m/%Y")` — a stated format is faster and refuses to misread ambiguous dates.' },
          { label: 'Check what failed', detail: 'With `errors="coerce"`, inspect the rows that became NaT before deciding what to do with them.' },
          { label: 'Decide on timezone', detail: 'Localise to the source zone and convert to UTC, or deliberately keep it naive for pure calendar facts.' },
          { label: 'Sanity check the range', detail: '`s.min()` and `s.max()` catch two-digit-year disasters and epoch defaults such as 1970-01-01.' },
          { label: 'Set the index if the data is a time series', detail: 'A DatetimeIndex enables partial-string selection, inclusive slicing, `resample` and `rolling`.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Datetime feature workshop',
        caption: 'Parse, extract components and resample the same series.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      'Pandas represents timestamps as `datetime64[ns]`, a 64-bit integer count of nanoseconds from the Unix epoch, optionally carrying a timezone to form an aware type. `to_datetime` maps text or numeric input to this representation under a given format and error policy. A DatetimeIndex supports partial-string indexing, inclusive label slicing and frequency-based resampling, which is a groupby over regular calendar intervals with explicit handling of empty intervals.',

    codeExamples: [
      {
        language: 'python',
        title: 'Parsing, and why the format argument matters',
        runnable: true,
        code: `import pandas as pd

raw = pd.Series(["01/03/2026", "15/03/2026", "2026-03-20", "not a date"])

# Tolerant parse to discover what breaks
parsed = pd.to_datetime(raw, dayfirst=True, format="mixed", errors="coerce")
print(parsed)
print("unparseable:", raw[parsed.isna()].tolist())
print()

clean = pd.Series(["01/03/2026", "15/03/2026", "20/03/2026"])
strict = pd.to_datetime(clean, format="%d/%m/%Y")
print(strict.dt.strftime("%Y-%m-%d").tolist())
print("dtype:", strict.dtype)
print()

# Text sorts wrongly; timestamps sort correctly
as_text = pd.Series(["10/03/2026", "2/03/2026", "21/03/2026"])
print("as text :", sorted(as_text))
print("as dates:", pd.to_datetime(as_text, dayfirst=True).sort_values().dt.strftime("%d %b").tolist())`,
        output: `0   2026-03-01
1   2026-03-15
2   2026-03-20
3          NaT
dtype: datetime64[ns]
unparseable: ['not a date']

['2026-03-01', '2026-03-15', '2026-03-20']
dtype: datetime64[ns]

as text : ['10/03/2026', '2/03/2026', '21/03/2026']
as dates: ['02 Mar', '10 Mar', '21 Mar']`,
        explanation:
          'The last block is the reason dates must be parsed rather than left as text: sorted as strings, "10/03/2026" comes before "2/03/2026" because "1" precedes "2" character by character, and no error is raised to tell you the ordering is nonsense. Parsing fixes that and also enables subtraction, comparison and every `.dt` method. Use `errors="coerce"` first to find the values that will not parse, since they become `NaT` and can be listed; then state an explicit `format` for the production parse, which is both considerably faster on large columns and safe against a value such as 03/04/2026 being silently read in the wrong convention.',
      },
      {
        language: 'python',
        title: 'The .dt accessor and derived features',
        runnable: true,
        code: `import pandas as pd

orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "placed_at": pd.to_datetime([
        "2026-03-02 09:15", "2026-03-07 18:40",
        "2026-03-08 11:05", "2026-03-31 23:50"]),
    "delivered_at": pd.to_datetime([
        "2026-03-04 14:00", "2026-03-09 10:00",
        "2026-03-13 16:30", "2026-04-02 09:00"]),
})

orders["year"] = orders["placed_at"].dt.year
orders["weekday"] = orders["placed_at"].dt.day_name()
orders["is_weekend"] = orders["placed_at"].dt.dayofweek >= 5
orders["hour"] = orders["placed_at"].dt.hour
orders["month_end"] = orders["placed_at"].dt.is_month_end
orders["lead_days"] = (orders["delivered_at"] - orders["placed_at"]).dt.days

print(orders[["order_id", "weekday", "is_weekend", "hour", "month_end", "lead_days"]])
print()
print("mean lead time (days):", round(orders["lead_days"].mean(), 2))
print("hour bucket:", orders["placed_at"].dt.floor("h").dt.strftime("%H:%M").tolist())`,
        output: `   order_id   weekday  is_weekend  hour  month_end  lead_days
0         1    Monday       False     9      False          2
1         2  Saturday        True    18      False          1
2         3    Sunday        True    11      False          5
3         4   Tuesday       False    23       True          1

mean lead time (days): 2.25
hour bucket: ['09:00', '18:00', '11:00', '23:00']`,
        explanation:
          'Every column here is a model feature that a human would otherwise extract by slicing strings. `dayofweek >= 5` is the standard weekend flag, with Monday as 0; `day_name()` is for reports, not for models, since text categories need encoding. Subtracting two datetime columns gives a timedelta Series, and `.dt.days` turns it into an integer — note that this truncates, so 1 day 23 hours reports as 1, and `.dt.total_seconds() / 86400` is the right call when partial days matter. `floor("h")` buckets a timestamp down to the hour, which is how you aggregate events into intervals without losing the date.',
      },
      {
        language: 'python',
        title: 'DatetimeIndex selection, resampling and rolling windows',
        runnable: true,
        code: `import pandas as pd
import numpy as np

idx = pd.date_range("2026-03-01", periods=10, freq="D", name="date")
sales = pd.DataFrame({"revenue": [100, 120, 90, 140, 160, 80, 95, 130, 150, 110]}, index=idx)

print("one day by partial string:")
print(sales.loc["2026-03-04"])
print()
print("an inclusive week by label slice:", len(sales.loc["2026-03-02":"2026-03-08"]), "rows")
print()
print("resampled to 3-day totals:")
print(sales.resample("3D")["revenue"].sum())
print()
print("3-day rolling mean:")
print(sales["revenue"].rolling(3).mean().round(1).tail(4))
print()

gappy = sales.drop(index=pd.to_datetime(["2026-03-05", "2026-03-06"]))
print("resample keeps the empty days visible:")
print(gappy.resample("D")["revenue"].sum().loc["2026-03-04":"2026-03-07"])`,
        output: `revenue    140
Name: 2026-03-04 00:00:00, dtype: int64

an inclusive week by label slice: 7 rows

resampled to 3-day totals:
date
2026-03-01    310
2026-03-04    380
2026-03-07    375
2026-03-10    110
Freq: 3D, Name: revenue, dtype: int64

3-day rolling mean:
date
2026-03-07    111.7
2026-03-08    101.7
2026-03-09    125.0
2026-03-10    130.0
Name: revenue, dtype: float64

resample keeps the empty days visible:
date
2026-03-04    140
2026-03-05      0
2026-03-06      0
2026-03-07     95
Freq: D, Name: revenue, dtype: int64`,
        explanation:
          'A DatetimeIndex changes what selection can express. `loc["2026-03-04"]` is partial-string indexing — give it "2026-03" and you get the whole month — and a label slice is inclusive at both ends, so the week from the 2nd to the 8th is seven rows rather than six. `resample("3D")` groups into regular calendar intervals and is the correct tool for time series because it materialises intervals that contain no data, as the last block shows: the two removed days appear as zeros rather than vanishing. A `groupby` on the date would have silently omitted them, and a chart drawn from that would imply the series jumped from the 4th to the 7th. `rolling(3)` is the moving-window counterpart, producing NaN until the window is full.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Demand forecasting',
        usage:
          'Hour of day, day of week and holiday flags derived with `.dt` are usually stronger predictors of demand than anything else in the table, which is why datetime feature extraction is the first step of most forecasting pipelines.',
      },
      {
        context: 'Monitoring and alerting',
        usage:
          'Per-request logs are resampled to one-minute error rates with a rolling mean over the last five minutes, which is exactly `resample` followed by `rolling` and is what dashboards display.',
      },
      {
        context: 'A global service storing timestamps',
        usage:
          'Events are stored as UTC-aware timestamps and converted for display. Teams that store local time discover during the autumn clock change that an hour of data is genuinely ambiguous and cannot be repaired.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`to_datetime`, the `.dt` accessor, `resample` and `rolling` cover parsing, features and time aggregation.' },
      { tool: 'statsmodels / Prophet', role: 'Expect a regular DatetimeIndex, which is what `resample` and `asfreq` exist to produce from irregular event data.' },
      { tool: 'scikit-learn', role: '`TimeSeriesSplit` respects temporal order so validation folds never contain data from before the training period.' },
    ],

    commonMistakes: [
      {
        mistake: 'Leaving dates as text and sorting or comparing them',
        why: 'String comparison is lexicographic, so "10/03" sorts before "2/03" and no error is raised. Every window, join and ordering afterwards is wrong.',
        fix: 'Convert with `to_datetime` at load time, and confirm with `df["date"].dtype` that it says `datetime64[ns]`.',
      },
      {
        mistake: 'Relying on inference for ambiguous date formats',
        why: 'Pandas may read 03/04/2026 as either 3 April or 4 March, and it can even infer differently for different rows in older code paths, producing a table that is internally inconsistent.',
        fix: 'Pass an explicit `format`, or `dayfirst=True` when the convention is known, and check `min()` and `max()` afterwards.',
      },
      {
        mistake: 'Using `groupby(df.date.dt.date)` for a time series',
        why: 'Intervals with no data simply do not appear, so gaps become invisible and any chart or rolling calculation implicitly treats the series as continuous when it is not.',
        fix: 'Use `resample`, which materialises every interval in the range, and then decide deliberately whether an empty interval means zero or missing.',
      },
      {
        mistake: 'Mixing naive and timezone-aware timestamps',
        why: 'Comparison raises `TypeError: Cannot compare tz-naive and tz-aware timestamps`, and where it does not raise, joins silently fail to match.',
        fix: 'Pick one convention at ingest — normally localise to the source zone then convert to UTC — and convert to local time only for display.',
      },
      {
        mistake: 'Assuming `.dt.days` gives a fractional duration',
        why: 'It truncates to whole days, so a lead time of 1 day 23 hours reports as 1, understating durations systematically.',
        fix: 'Use `.dt.total_seconds() / 3600` or `/ 86400` when partial units matter.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why convert a date column from text to datetime, and what does it enable?',
        answer:
          'Text comparison is lexicographic, so sorting puts "10/03/2026" before "2/03/2026" and no error indicates that the ordering is meaningless. Converting to `datetime64[ns]` stores the value as an integer number of nanoseconds, which makes comparison and sorting correct, makes subtraction produce a timedelta, and unlocks the `.dt` accessor for extracting calendar components. Putting the timestamps in the index unlocks more: partial-string selection such as `df.loc["2026-03"]`, inclusive time slicing, and `resample` for regular interval aggregation. It is also more compact than the equivalent strings, since each value is eight bytes rather than a Python string object.',
      },
      {
        level: 'intermediate',
        question: 'What is the difference between `resample` and grouping by a date part, and when does it matter?',
        answer:
          'Both group rows into time buckets, but `resample` works from a continuous time range and materialises every interval in it, including ones containing no rows, whereas a groupby produces only the keys that actually occur. That difference matters whenever absence is information. If a sensor goes offline for two days, `resample("D")` gives those days as empty or zero rows, so the gap is visible and a rolling average over a fixed window covers the right span of time; a groupby silently omits them, so the next value appears adjacent to the previous one and any chart or window calculation misrepresents the timeline. Resample also understands calendar frequencies such as month-end and business days, and offers `origin` and `closed` to control bucket boundaries, which a naive groupby cannot express.',
        followUp:
          'A strong answer notes that upsampling creates rows that must be filled or interpolated, and that the choice between `ffill`, interpolation and leaving NaN is a modelling decision.',
      },
      {
        level: 'ml-engineer',
        question: 'What timezone discipline would you enforce in a data pipeline, and why?',
        answer:
          'Parse to timezone-aware timestamps at ingest, localised to the zone the source actually used, then convert immediately to UTC and store UTC everywhere. All arithmetic, joining, windowing and storage happen in UTC; conversion to local time happens only at presentation. The reason is that a naive local timestamp does not identify an instant: on the night clocks go back, 01:30 occurs twice, so ordering and deduplication are genuinely undecidable, and on the night they go forward some local times never exist at all. Mixing naive and aware values raises on comparison, which is pandas refusing to guess, and silent join failures are worse than that error. The one exception is pure calendar facts — a birth date, an accounting period — which are not instants and should stay naive dates, because attaching a timezone to them introduces off-by-one errors at midnight.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A column of dates in DD/MM/YYYY contains a few values such as "unknown". Parse the column, list the unparseable values, and then produce a weekday-name column.',
        hint: 'Coerce first to find the bad values, then extract.',
        solution:
          'parsed = pd.to_datetime(df["date"], dayfirst=True, errors="coerce")\nbad = df.loc[parsed.isna() & df["date"].notna(), "date"].unique()\nprint("unparseable:", bad)\ndf["date"] = parsed\ndf["weekday"] = df["date"].dt.day_name()\n\nCoercing turns the unparseable values into NaT so they can be listed rather than crashing the load, and once the causes are known you would normally add them to `na_values` at read time and switch to an explicit `format` for speed and safety.',
      },
      {
        prompt:
          'You have per-minute sensor readings with occasional outages. Produce hourly means in a way that makes the outages visible, and explain why `groupby` would not.',
        hint: 'The difference is what happens to intervals containing no rows.',
        solution:
          'hourly = readings.set_index("taken_at")["temp_c"].resample("1h").mean()\n\nHours with no readings appear as NaN rather than being omitted, so a chart shows a break and `hourly.isna().sum()` counts the outage directly. A groupby on `taken_at.dt.floor("h")` would produce only the hours that contain data, so a three-hour outage would compress into an apparently continuous series and any rolling window over it would silently span a different amount of real time than intended.',
      },
      {
        prompt:
          'Explain what goes wrong when a European and a United States office both write naive local timestamps into the same table, and describe the fix.',
        hint: 'Does a naive timestamp identify a moment in time?',
        solution:
          'A naive timestamp is a wall clock reading, not an instant, so 14:00 from London and 14:00 from New York are five hours apart in reality but compare as equal and sort as identical. Ordering events across offices is therefore wrong, deduplication can merge distinct events, and durations computed across offices are nonsense. Worse, during clock changes some local times are ambiguous or non-existent, so the damage cannot be repaired afterwards from the stored data alone. The fix is to localise each source to the zone it actually used at ingest, convert everything to UTC for storage and computation, and convert back to a local zone only when displaying results to a person.',
      },
    ],

    quiz: [
      {
        id: 'PD-012-q1',
        type: 'mcq',
        concept: 'parsing',
        prompt: 'Why should you pass an explicit `format` to `to_datetime` in production code?',
        options: [
          'It is faster and removes the risk of an ambiguous date being read in the wrong convention',
          'It is the only way to handle missing values',
          'Inference is unavailable for columns longer than a thousand rows',
          'It converts the column to text for safe storage',
        ],
        answerIndex: 0,
        explanation:
          'A stated format skips inference, which is significantly faster on large columns, and it refuses input that does not match rather than guessing between day-first and month-first.',
      },
      {
        id: 'PD-012-q2',
        type: 'code-output',
        language: 'python',
        concept: 'dt accessor',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ns = pd.to_datetime(pd.Series(["2026-03-07"]))\nprint(s.dt.dayofweek[0], s.dt.day_name()[0])',
        options: ['5 Saturday', '6 Saturday', '5 Friday', '0 Saturday'],
        answerIndex: 0,
        explanation:
          '7 March 2026 is a Saturday, and `dayofweek` numbers Monday as 0, so Saturday is 5. The `>= 5` test is the standard weekend flag.',
      },
      {
        id: 'PD-012-q3',
        type: 'truefalse',
        concept: 'resample versus groupby',
        prompt: 'Grouping by `df.index.date` and resampling to daily frequency always give the same rows.',
        answer: false,
        explanation:
          'Resampling materialises every day in the range, including days with no data, while a groupby produces only the days that occur. That difference is exactly what makes gaps visible or invisible.',
      },
      {
        id: 'PD-012-q4',
        type: 'multi',
        concept: 'datetime index',
        prompt: 'Which of these become possible once timestamps are in the index? Select all that apply.',
        options: [
          'df.loc["2026-03"] to select a whole month',
          'df.resample("W").sum()',
          'An inclusive slice such as df.loc["2026-03-01":"2026-03-07"]',
          'df.rolling("7D").mean() using a time-based window',
          'Sorting text dates correctly without conversion',
        ],
        answerIndices: [0, 1, 2, 3],
        explanation:
          'Partial-string selection, resampling, inclusive label slicing and time-based rolling windows all require a DatetimeIndex. Text dates sort lexicographically no matter where they sit.',
      },
      {
        id: 'PD-012-q5',
        type: 'debug',
        language: 'python',
        concept: 'timezones',
        prompt: 'This raises "Cannot compare tz-naive and tz-aware timestamps". What is the underlying problem?',
        code: 'events[events["ts"] > pd.Timestamp("2026-03-01", tz="UTC")]',
        options: [
          'The `ts` column is naive, so it names a wall clock reading rather than an instant and cannot be compared with an aware timestamp',
          'Comparison operators are not supported on datetime columns',
          'The timestamp literal must be a string',
          'The column needs to be sorted before it can be compared',
        ],
        answerIndex: 0,
        explanation:
          'Pandas refuses to guess a timezone for the naive side. Localise the column to the zone the source used and convert to UTC, then the comparison is well defined.',
      },
      {
        id: 'PD-012-q6',
        type: 'explain',
        concept: 'storing time',
        prompt: 'Explain why a pipeline should store UTC and convert for display, rather than storing local time.',
        rubric: [
          'States that a naive local timestamp does not uniquely identify an instant',
          'Gives the clock-change failure: an hour repeats in autumn and is skipped in spring',
          'Proposes localising at ingest, storing UTC, converting at presentation',
        ],
        sampleAnswer:
          'A local timestamp without an offset is a reading from a wall clock, not a point in time, so the same text can mean different instants in different places and ordering across sources is meaningless. Clock changes make this unrepairable rather than merely awkward: when clocks go back, 01:30 happens twice and the stored value cannot say which, and when they go forward some local times never occur at all. Storing UTC gives every row an unambiguous instant, so comparison, deduplication, joins and durations are all well defined, and converting to a local zone at the point of display is a cheap, lossless operation. The exception is a pure calendar fact such as a date of birth, which is not an instant and should stay a naive date.',
        explanation:
          'The examinable idea is the distinction between an instant and a wall clock reading, which is what makes timezone bugs unrecoverable rather than merely inconvenient.',
      },
    ],

    flashcards: [
      { front: 'Why not leave dates as text?', back: 'Text sorts lexicographically, so 10/03 comes before 2/03, and no arithmetic or `.dt` method is available.' },
      { front: 'What does `.dt.dayofweek` return for Saturday?', back: '5 — Monday is 0, so `>= 5` is the standard weekend test.' },
      { front: 'resample or groupby for a time series?', back: 'Resample: it materialises intervals with no data, so gaps stay visible.' },
      { front: 'What is a naive timestamp?', back: 'One with no timezone — a wall clock reading, which does not identify a unique instant.' },
      { front: 'What is the standard timezone discipline?', back: 'Localise at ingest, store and compute in UTC, convert to local only for display.' },
      { front: 'Why can `.dt.days` understate a duration?', back: 'It truncates to whole days; use `.dt.total_seconds()` when partial units matter.' },
    ],

    challenge: {
      title: 'An hourly reliability report',
      brief:
        'Given a log of requests with a timestamp column and a boolean `failed`, build an hourly report containing request count, failure count, failure rate, and a three-hour rolling failure rate. Hours with no requests must appear in the output with a count of zero and a missing rate rather than being omitted. Parse timestamps explicitly, treat them as UTC, and add a column giving the local hour in Europe/London so an on-call engineer can read it.',
      language: 'python',
      acceptanceCriteria: [
        'Timestamps are parsed with an explicit format and handled as timezone-aware UTC',
        'Uses `resample` so empty hours appear with a zero count',
        'Failure rate is missing rather than zero for hours with no requests',
        'Includes a local-time column produced with `tz_convert`, not by adding an offset manually',
      ],
      starterCode:
        'import pandas as pd\n\n\ndef hourly_reliability(logs: pd.DataFrame) -> pd.DataFrame:\n    ts = pd.to_datetime(logs["ts"], format="%Y-%m-%d %H:%M:%S", utc=True)\n    logs = logs.assign(ts=ts).set_index("ts")\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me how to work with dates in pandas, including the timezone trap.',
      mustCover: [
        'Text dates must be parsed with to_datetime before anything works correctly',
        'The `.dt` accessor extracts calendar components for features',
        'A DatetimeIndex enables partial-string selection, inclusive slicing and resample',
        'Naive timestamps do not identify an instant; store UTC and convert for display',
      ],
      bonusSignals: ['mentions that text dates sort lexicographically', 'contrasts resample with groupby on gaps', 'mentions explicit format for speed and safety'],
      sampleExplanation:
        'Dates arrive as text and text is useless for date work: sorted as strings, "10/03/2026" comes before "2/03/2026" and nothing warns you. So the first move is always `to_datetime`, which turns the column into a real timestamp type. Use `errors="coerce"` the first time to find the values that will not parse, then state an explicit format for the real load — it is faster, and it refuses to guess whether 03/04 means 3 April or 4 March. Once parsed, three things open up. The `.dt` accessor pulls the calendar apart: year, month, hour, day of week, with Monday as zero so `>= 5` is your weekend flag. Putting the timestamps in the index lets you write `df.loc["2026-03"]` for a whole month and slice a week by name, inclusively at both ends. And `resample` groups by regular intervals — hourly means from per-minute readings in one call. Prefer it to a groupby on the date, because resample creates the empty intervals too, so an outage shows up as a gap instead of silently disappearing. The trap to respect is timezones. A timestamp with no zone is a wall clock reading, not a moment: on the night the clocks go back, 01:30 happens twice and the stored value cannot tell you which. So localise at the edge, store everything in UTC, do all your arithmetic there, and convert to local time only when a person is going to read it.',
    },
  },
  {
    id: 'PD-013',
    domain: 'PD',
    module: 'Time & Features',
    topic: 'Element-wise operations and feature preparation',
    title: 'apply, map and Feature Preparation',
    slug: 'apply-map-feature-prep',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['PD-009', 'PD-012'],
    related: ['PD-006', 'PD-007', 'PD-011'],
    tags: ['apply', 'map', 'lambda', 'vectorisation', 'np-where', 'feature-engineering'],

    learningObjectives: [
      'Distinguish `map`, `apply` on a Series, `apply` on a DataFrame and the deprecated `applymap`, and say what each iterates over',
      'Explain concretely why `apply` is slow, and replace common `apply` patterns with vectorised equivalents',
      'Choose between `np.where`, `np.select`, `map` with a dictionary and `apply` for conditional logic',
      'Assemble a model-ready feature table: encoded categories, scaled numerics and derived features, fitted inside a pipeline',
    ],

    terminology: [
      {
        term: 'Series.map',
        definition:
          'Element-wise substitution using a dictionary, Series or function. With a dictionary, unmatched values become NaN rather than being left alone.',
        simple: 'Swap each value for another using a lookup or a small function.',
      },
      {
        term: 'Series.apply',
        definition:
          'Calls a Python function once per element, with no assumption that the function is a lookup. Slower than `map` for substitution, more general for arbitrary logic.',
        simple: 'Run your own function on every value, one at a time.',
      },
      {
        term: 'DataFrame.apply',
        definition:
          'Calls a function once per column (`axis=0`, the default) or once per row (`axis=1`). Row-wise application builds a Series per row and is the slowest common pattern.',
        simple: 'Run a function down each column, or across each row.',
      },
      {
        term: 'Vectorisation',
        definition:
          'Expressing a calculation as whole-array operations that execute in compiled code, avoiding the per-element Python function call that `apply` requires.',
        simple: 'Doing the whole column in one compiled step instead of one value at a time.',
      },
      {
        term: 'Feature preparation',
        definition:
          'Converting a cleaned table into the numeric matrix a model requires: encoding categories, scaling numerics, deriving features, and fitting every transformation on training data only.',
        simple: 'Turning a table people can read into numbers a model can use.',
      },
    ],

    simpleExplanation:
      "`apply` is the function beginners reach for whenever a calculation feels complicated, and it is almost always the slowest way to do it. The reason is worth understanding rather than memorising. A vectorised expression such as `df[\"price\"] * 1.2` hands the whole column to compiled code, which runs one tight loop over a block of memory. `df[\"price\"].apply(lambda p: p * 1.2)` instead asks Python to call your function once per row, and each of those calls involves unboxing a value into a Python object, executing interpreted bytecode, and boxing the result back. That overhead is typically fifty to two hundred times the cost of the arithmetic itself. So the working rule is: first look for a vectorised expression, then for `np.where` or `np.select` if the logic is conditional, then for a dictionary `map` if it is a lookup, then for `groupby.transform` if it depends on a group — and only reach for `apply` when the logic genuinely cannot be expressed any other way. The second half of this unit is where all of it lands: turning a cleaned table into the numeric matrix a model can actually consume.",

    whyItExists:
      '`apply` exists because some logic genuinely cannot be vectorised — parsing a nested structure, calling an external service, applying a rule that depends on several columns in an irregular way. The problem is that it reads like the obvious tool for everything, so it becomes the default, and a pipeline that should take two seconds takes four minutes for reasons that never show up as an error.',

    analogy: {
      scenario:
        'Imagine a postal sorting office with a machine that reads ten thousand envelopes a minute, and one clerk who can read about two a second. For any job the machine can do — sort by postcode, weigh, frank — sending the envelopes through it is not slightly better, it is three orders of magnitude better. But the machine only knows a fixed set of operations. An envelope with handwriting it cannot parse, or one that needs a judgement about whether an address is genuine, must go to the clerk. A well-run office sends everything through the machine and routes only the genuine exceptions to the human.',
      mapping: [
        { from: 'The sorting machine', to: 'Vectorised operations running in compiled code' },
        { from: 'The clerk reading one envelope at a time', to: '`apply` calling a Python function per element' },
        { from: 'The fixed set of operations the machine knows', to: 'Arithmetic, comparison, `.str`, `.dt`, `np.where`, `map`' },
        { from: 'The genuinely unusual envelope', to: 'Logic that truly cannot be vectorised' },
        { from: 'Sending every envelope to the clerk because it is simpler to explain', to: 'Reaching for `apply` by habit' },
      ],
      bridge:
        'The machine-versus-clerk ratio is a real measurement, not a figure of speech: on a million-row column, a vectorised multiplication takes milliseconds and the equivalent `apply` takes seconds. The reason is exactly the clerk\'s overhead — the per-item handling cost dominates the work itself. The corollary matters as much as the rule: routing the genuine exceptions to the clerk is correct, so `apply` is not a code smell in itself. It becomes one when it is handling envelopes the machine could have read.',
      limitations:
        'The analogy understates how often a seemingly clerk-only task can be machined. Multi-branch conditional logic looks irreducibly bespoke and is expressed perfectly by `np.select`; a lookup table looks like a function and is a dictionary `map`.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'What each method iterates over',
        caption: 'Choosing correctly starts with knowing what gets passed to your function.',
        columns: ['Call', 'Function receives', 'Returns', 'Notes'],
        rows: [
          ['s.map(dict)', 'One value', 'Series', 'Fastest substitution; unmatched keys become NaN'],
          ['s.map(func)', 'One value', 'Series', 'Slightly leaner than `apply` for a pure element function'],
          ['s.apply(func)', 'One value', 'Series', 'General element-wise; accepts extra arguments'],
          ['df.apply(func)', 'One column as a Series', 'Series or DataFrame', 'The default, `axis=0`; often fine, since it runs once per column'],
          ['df.apply(func, axis=1)', 'One row as a Series', 'Series or DataFrame', 'Builds a Series per row — the slowest common pattern'],
          ['df.map(func)', 'One value', 'DataFrame', 'Element-wise over every cell; replaced `applymap` in pandas 2.1'],
          ['g.transform(func)', 'One group as a Series', 'Same length as input', 'Per-group features; prefer over apply for group logic'],
        ],
      },
      {
        kind: 'flow',
        title: 'Before you write apply, try these in order',
        caption: 'Most `apply` calls in real code are one of the first four.',
        branching: true,
        steps: [
          { label: 'Is it arithmetic or comparison?', detail: 'Write the expression directly: `df["a"] * df["b"]`, `df["x"] > 10`.' },
          { label: 'Is it two-branch conditional?', detail: '`np.where(cond, value_if_true, value_if_false)` — one compiled pass.' },
          { label: 'Is it multi-branch?', detail: '`np.select([c1, c2, c3], [v1, v2, v3], default=v0)` — still one compiled pass.' },
          { label: 'Is it a lookup?', detail: '`s.map(mapping_dict)`, which is a hash lookup per element rather than a Python call.' },
          { label: 'Is it text or dates?', detail: 'The `.str` and `.dt` accessors are vectorised versions of the obvious loops.' },
          { label: 'Does it depend on a group?', detail: '`groupby(key)[col].transform(...)` for per-group values.' },
          { label: 'Genuinely irregular logic?', detail: 'Now `apply` is the right answer. Measure it, and consider `itertuples` if it must iterate rows.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Two ways to write the same rule',
        caption: 'Identical output; the left runs in compiled code, the right calls Python once per row.',
        left: {
          heading: 'Vectorised',
          points: [
            'np.select([df.amount > 100, df.amount > 50], ["high", "mid"], default="low")',
            'One compiled pass over the column',
            'Handles NaN predictably through the default branch',
            'Milliseconds on a million rows',
          ],
        },
        right: {
          heading: 'Row-wise apply',
          points: [
            'df.apply(lambda r: "high" if r.amount > 100 else ..., axis=1)',
            'Builds a Series object for every row',
            'Upcasts mixed dtypes to `object` on the way in',
            'Seconds on a million rows, for the same answer',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Rewrite an apply as a vectorised expression',
        caption: 'Compare the two forms and confirm they agree before trusting the faster one.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      '`Series.map` performs element-wise substitution from a mapping or callable; `Series.apply` and `DataFrame.map` invoke a Python callable once per element; `DataFrame.apply` invokes a callable once per column or, with `axis=1`, once per row, materialising a Series for each. Each incurs one Python-level call and one boxing/unboxing round trip per unit of iteration, whereas a vectorised expression dispatches a single compiled loop over the underlying typed buffer — the source of the one-to-two order of magnitude difference in throughput.',

    workedExample: {
      title: 'Turning a row-wise apply into a vectorised expression',
      setup:
        'A pricing rule: orders over 100 get a 15 per cent discount, orders over 50 get 5 per cent, everything else gets none, and refunded orders always get none regardless of amount. The first implementation is a row-wise `apply`.',
      steps: [
        {
          label: 'The starting point',
          detail: 'df.apply(lambda r: 0.0 if r.refunded else (0.15 if r.amount > 100 else (0.05 if r.amount > 50 else 0.0)), axis=1). Correct, readable, and the slowest way to express it: one Python call and one constructed Series per row.',
        },
        {
          label: 'Name the conditions',
          detail: 'Each branch of the rule is a boolean Series over the whole column: big = df["amount"] > 100, mid = df["amount"] > 50, refunded = df["refunded"]. Naming them separates the business rule from the mechanism.',
        },
        {
          label: 'Order the conditions',
          detail: '`np.select` takes the first condition that matches, so ordering encodes precedence. Refunded must come first, because it overrides amount entirely.',
          latex: '\\text{discount} = \\begin{cases} 0.00 & \\text{refunded} \\\\ 0.15 & \\text{amount} > 100 \\\\ 0.05 & \\text{amount} > 50 \\\\ 0.00 & \\text{otherwise} \\end{cases}',
        },
        {
          label: 'Write the vectorised form',
          detail: 'np.select([refunded, big, mid], [0.0, 0.15, 0.05], default=0.0). One compiled pass, no Python function calls, and the precedence is now visible as a list rather than buried in nested conditionals.',
        },
        {
          label: 'Verify equivalence before trusting it',
          detail: 'Run both on the same frame and compare with `pandas.testing.assert_series_equal`. Rewrites of conditional logic are exactly where an off-by-one boundary slips in, so the check is not optional.',
        },
        {
          label: 'Measure',
          detail: 'On a million rows the apply form takes several seconds and the np.select form a few milliseconds. The gap comes from the per-row overhead, not from the arithmetic, which is why the rewrite wins by two orders of magnitude rather than by a few per cent.',
        },
      ],
      conclusion:
        'The rewrite is faster because it removes a per-row Python call, and it is also clearer: the conditions are named, the precedence is explicit in the list order, and the rule can be read without unpicking nested ternaries. The habit to take away is to write the conditions as named masks first — after that, the vectorised form usually writes itself.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'map, apply and their vectorised replacements',
        runnable: true,
        code: `import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "amount":   [24.99, 112.50, 8.75, 64.00, 250.00],
    "channel":  ["web", "app", "web", "store", "app"],
    "refunded": [False, False, True, False, False],
})

# 1. Lookup -> map with a dictionary, not apply
channel_fee = {"web": 0.01, "app": 0.02, "store": 0.03}
orders["fee_rate"] = orders["channel"].map(channel_fee)

# 2. Two-branch conditional -> np.where
orders["status"] = np.where(orders["refunded"], "refunded", "settled")

# 3. Multi-branch conditional -> np.select (order encodes precedence)
conditions = [orders["refunded"], orders["amount"] > 100, orders["amount"] > 50]
choices = [0.00, 0.15, 0.05]
orders["discount"] = np.select(conditions, choices, default=0.00)

# 4. Plain arithmetic -> just write it
orders["net"] = orders["amount"] * (1 - orders["discount"]) * (1 - orders["fee_rate"])

print(orders.round(3))
print()
unmapped = pd.Series(["web", "phone"]).map(channel_fee)
print("map on an unknown key gives NaN:", unmapped.tolist())`,
        output: `   amount channel  refunded  fee_rate    status  discount      net
0   24.99     web     False      0.01   settled      0.00   24.740
1  112.50     app     False      0.02   settled      0.15   93.713
2    8.75     web      True      0.01  refunded      0.00    8.663
3   64.00   store     False      0.03   settled      0.05   58.976
4  250.00     app     False      0.02   settled      0.15  208.250

map on an unknown key gives NaN: [0.01, nan]`,
        explanation:
          'Four common shapes of logic, none of which needs `apply`. A dictionary `map` is a hash lookup per element rather than a Python function call, and the final line shows its one sharp edge: an unmatched key silently becomes NaN, so a new channel appearing upstream produces missing fees rather than an error — always check `result.isna().sum()` after mapping, or use `.map(d).fillna(default)` deliberately. `np.where` covers the two-branch case, and `np.select` the multi-branch case, where the order of the conditions expresses precedence: `refunded` is listed first so it overrides the amount rules. The last column is plain arithmetic over three Series, which is the fastest thing in the file and also the most readable.',
      },
      {
        language: 'python',
        title: 'Measuring the cost of apply',
        runnable: true,
        code: `import pandas as pd
import numpy as np
import time

n = 1_000_000
rng = np.random.default_rng(0)
df = pd.DataFrame({"amount": rng.uniform(0, 200, n), "qty": rng.integers(1, 5, n)})

def timed(label, fn):
    t0 = time.perf_counter()
    out = fn()
    print(f"{label:28s} {time.perf_counter() - t0:7.3f}s")
    return out

a = timed("vectorised", lambda: df["amount"] * df["qty"])
b = timed("Series.apply", lambda: df["amount"].apply(lambda x: x * 2))
c = timed("DataFrame.apply(axis=1)", lambda: df.apply(lambda r: r.amount * r.qty, axis=1))
d = timed("np.where", lambda: np.where(df["amount"] > 100, "high", "low"))
e = timed("apply for the same rule", lambda: df["amount"].apply(lambda x: "high" if x > 100 else "low"))

print()
print("same answer?", np.array_equal(a.to_numpy(), c.to_numpy()))`,
        output: `vectorised                     0.004s
Series.apply                   0.213s
DataFrame.apply(axis=1)        7.842s
np.where                       0.011s
apply for the same rule        0.186s

same answer? True`,
        explanation:
          'These are the numbers behind the advice. Multiplying two columns takes four milliseconds; the same calculation as a row-wise `apply` takes nearly eight seconds, roughly two thousand times slower, because each row must be materialised as a Series with mixed dtypes before your function sees it. Element-wise `Series.apply` is far better than the row-wise form but still fifty times slower than the vectorised expression, since it pays one Python call per value. Conditional logic shows the same pattern: `np.where` is essentially free while the equivalent `apply` is not. Nothing here errors, and on a thousand-row development sample every version feels instant — which is precisely why this problem reaches production before anyone notices.',
      },
      {
        language: 'python',
        title: 'Assembling a model-ready feature table',
        runnable: true,
        code: `import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

orders = pd.DataFrame({
    "amount":     [24.99, 112.50, 8.75, 64.00, 250.00, 31.00, 78.20, 45.10],
    "qty":        [1, 3, 1, 2, 4, 1, 2, 1],
    "channel":    ["web", "app", "web", "store", "app", "web", "app", "store"],
    "placed_at":  pd.to_datetime(["2026-03-02 09:15", "2026-03-07 18:40",
                                  "2026-03-08 11:05", "2026-03-09 23:50",
                                  "2026-03-10 08:05", "2026-03-11 13:20",
                                  "2026-03-14 20:00", "2026-03-15 07:45"]),
    "churned":    [0, 1, 0, 1, 1, 0, 1, 0],
})

# Derived features: vectorised, deterministic, no fitting required
feats = orders.assign(
    unit_price=orders["amount"] / orders["qty"],
    hour=orders["placed_at"].dt.hour,
    is_weekend=(orders["placed_at"].dt.dayofweek >= 5).astype(int),
)
X = feats[["amount", "qty", "unit_price", "hour", "is_weekend", "channel"]]
y = feats["churned"]

numeric = ["amount", "qty", "unit_price", "hour", "is_weekend"]
categorical = ["channel"]

pre = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")),
                      ("scale", StandardScaler())]), numeric),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
])

model = Pipeline([("prep", pre), ("clf", LogisticRegression(max_iter=1000))])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)
model.fit(X_train, y_train)

print("feature names out:", list(model[:-1].get_feature_names_out()))
print("train rows:", len(X_train), "| test rows:", len(X_test))
print("test accuracy:", round(model.score(X_test, y_test), 3))`,
        output: `feature names out: ['num__amount', 'num__qty', 'num__unit_price', 'num__hour', 'num__is_weekend', 'cat__channel_app', 'cat__channel_store', 'cat__channel_web']
train rows: 6 | test rows: 2
test accuracy: 0.5`,
        explanation:
          'This is where the whole domain arrives. Two kinds of work are deliberately kept apart. Derived features such as unit price, hour of day and a weekend flag are deterministic functions of a single row, so they can be computed in pandas before the split without leaking anything — nothing about them is learned from the data. Anything that learns a statistic — an imputation median, a scaler\'s mean and standard deviation, the set of categories an encoder knows — must live inside the pipeline, because those values must be derived from the training fold alone and then applied unchanged to test data and to live traffic. `handle_unknown="ignore"` is what stops an unseen channel from raising in production, and `get_feature_names_out()` keeps the column names attached so coefficients and importances are interpretable afterwards. The accuracy is meaningless on eight rows; the structure is the lesson.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A slow nightly job',
        usage:
          'The most common single cause of a pandas job taking hours is a row-wise `apply` over millions of rows. Replacing it with `np.select` or a merge against a lookup table routinely turns hours into seconds.',
      },
      {
        context: 'Category encoding for a model',
        usage:
          'A dictionary `map` is the natural way to encode a small ordinal category, but the mapping must be stored and reused at inference, which is why an encoder inside a pipeline is preferred once the category set can change.',
      },
      {
        context: 'Parsing a semi-structured column',
        usage:
          'A JSON blob per row genuinely requires `apply`, since the structure varies. The usual approach is to apply once, expand the result with `pd.json_normalize`, and never touch the raw column again.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: '`np.where` and `np.select` supply the vectorised conditional logic that replaces most `apply` calls.' },
      { tool: 'scikit-learn', role: '`ColumnTransformer` and `Pipeline` hold every fitted transformation so it is learned on training data and reproduced at inference.' },
      { tool: 'Polars / DuckDB', role: 'Enforce vectorised expressions by design, which is one reason teams with heavy per-row logic move to them.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `df.apply(..., axis=1)` as the default way to combine columns',
        why: 'Each row is materialised as a Series, usually upcast to `object`, and your function is called once per row — often a thousand times slower than the equivalent expression.',
        fix: 'Write the expression over columns, or use `np.where` / `np.select` for conditionals. Reserve row-wise apply for logic that genuinely cannot be expressed that way.',
      },
      {
        mistake: 'Not noticing that `map` with a dictionary turns unmatched values into NaN',
        why: 'A new category appearing upstream produces silent missing values rather than an error, and the resulting NaN then propagates into every derived feature.',
        fix: 'Check `mapped.isna().sum()` against the original, or use `.map(d).fillna(default)`, or a merge with `indicator=True` when you need to see what failed to match.',
      },
      {
        mistake: 'Fitting scalers or encoders before splitting into train and test',
        why: 'The scaler\'s mean and the encoder\'s category list are learned from data the model should not see, so the evaluation is optimistic and the transformation cannot be reproduced at inference.',
        fix: 'Put every fitted transformation inside a `Pipeline` and fit only on the training fold. Deterministic per-row derivations may be computed beforehand.',
      },
      {
        mistake: 'One-hot encoding a high-cardinality column',
        why: 'Thousands of sparse columns inflate memory and training time and usually generalise poorly, and any category absent from training becomes an unfillable gap.',
        fix: 'Group rare categories into an "other" bucket, or use target encoding computed out of fold, or a model that handles categorical features natively.',
      },
      {
        mistake: 'Optimising `apply` by rewriting it without checking the results still match',
        why: 'Conditional rewrites are exactly where boundary conditions and NaN handling change silently, so the faster version can be quietly wrong.',
        fix: 'Compare the old and new outputs with `pandas.testing.assert_series_equal` on a real sample before deleting the slow version.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is `apply` slower than a vectorised operation?',
        answer:
          'A vectorised expression hands the whole typed buffer to compiled code, which runs one tight loop with no Python involvement. `apply` calls a Python function once per element or, worse, once per row, and every call pays for unboxing the value into a Python object, executing interpreted bytecode and boxing the result back. That per-item overhead dominates the actual arithmetic, so the gap is typically fifty to two hundred times for element-wise apply and can exceed a thousand for `axis=1`, where a Series must also be constructed for each row and dtypes are upcast to `object`. The practical consequence is that the difference is invisible on a development sample of a few thousand rows and becomes a production incident at a few million.',
      },
      {
        level: 'intermediate',
        question: 'Give three `apply` patterns and their vectorised replacements.',
        answer:
          'First, a two-branch conditional such as `s.apply(lambda x: "high" if x > 100 else "low")` becomes `np.where(s > 100, "high", "low")`, which is a single compiled pass. Second, a multi-branch rule written as nested ternaries inside a row-wise apply becomes `np.select([c1, c2, c3], [v1, v2, v3], default=v0)`, where the order of the conditions expresses precedence explicitly rather than burying it in nesting. Third, a lookup such as `s.apply(lambda x: mapping[x])` becomes `s.map(mapping)`, which does a hash lookup per element rather than a Python call — and handles unmatched keys by producing NaN, which you should check for. I would add a fourth: anything computed per group, such as a share of a group total, belongs in `groupby(...).transform(...)` rather than an apply that recomputes the group statistic for every row.',
        followUp:
          'A strong answer mentions verifying equivalence with `assert_series_equal` after the rewrite, because conditional boundaries and NaN handling are where these changes go wrong.',
      },
      {
        level: 'ml-engineer',
        question: 'Walk me through preparing a cleaned table for a model. What belongs in pandas and what belongs in a pipeline?',
        answer:
          'The dividing line is whether the transformation learns anything from the data. Deterministic per-row derivations belong in pandas and can be done before the split: unit price from amount and quantity, hour of day and weekday from a timestamp, a duration from two dates, a ratio between two columns. Nothing about them depends on other rows, so computing them early leaks nothing and makes them easy to inspect. Anything fitted belongs in a scikit-learn pipeline: imputation statistics, scaler means and standard deviations, the encoder\'s category list, any target-derived encoding. Those must be learned on the training fold and applied unchanged to validation, test and production, which is what a `ColumnTransformer` inside a `Pipeline` guarantees. In practice that means `handle_unknown="ignore"` on the encoder so an unseen category does not raise in production, `get_feature_names_out()` so coefficients remain interpretable, and serialising the whole fitted pipeline rather than the model alone, so serving applies exactly the transformations training used.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Rewrite this without `apply`, and say how you would confirm the rewrite is correct:\n\ndf["band"] = df.apply(lambda r: "A" if r.score >= 80 else ("B" if r.score >= 60 else "C"), axis=1)',
        hint: 'Multi-branch conditional over one column, with precedence.',
        solution:
          'import numpy as np\ndf["band"] = np.select([df["score"] >= 80, df["score"] >= 60], ["A", "B"], default="C")\n\nThe conditions are evaluated in order, so listing 80 before 60 reproduces the nested precedence exactly. Confirm with pandas.testing.assert_series_equal(old, new) on a real sample before deleting the original: rewrites of branching logic are exactly where a boundary flips from >= to > unnoticed, and where NaN scores change which branch they land in.',
      },
      {
        prompt:
          'You map a `country` column through a dictionary of country codes and the result has 2,400 missing values out of 100,000. What happened and how do you handle it properly?',
        hint: 'What does `map` do with a key that is not in the dictionary?',
        solution:
          'Unmatched keys become NaN silently. Those 2,400 rows contain country values your dictionary does not know — typically new countries, spelling variants or case differences that a `.str.strip().str.lower()` normalisation would have fixed. Diagnose with df.loc[mapped.isna(), "country"].value_counts(), which shows exactly which values failed and how often. Then either extend the mapping, normalise the text first, or map with an explicit fallback: df["country"].map(codes).fillna("UNKNOWN"). What you should not do is fill silently without looking, since the distribution of the unmatched values usually tells you which of those three causes it is.',
      },
      {
        prompt:
          'Explain which of these belong before a train/test split and which belong inside a pipeline: hour of day from a timestamp, standard scaling, one-hot encoding, ratio of two columns, median imputation.',
        hint: 'Does the transformation learn a value from the data?',
        solution:
          'Before the split: hour of day and the ratio of two columns. Both are deterministic functions of a single row, so no information from other rows is involved and nothing can leak.\nInside the pipeline: standard scaling (learns a mean and standard deviation), one-hot encoding (learns the set of categories), and median imputation (learns a median). Each of these fits a value from the data, so fitting it on the full dataset would use test rows and produce an optimistic evaluation and a transformation that cannot be reproduced at inference.\n\nThe rule that generalises: if the transformation has a `fit` step, it belongs in the pipeline.',
      },
    ],

    quiz: [
      {
        id: 'PD-013-q1',
        type: 'mcq',
        concept: 'apply performance',
        prompt: 'Why is `df.apply(func, axis=1)` particularly slow?',
        options: [
          'Each row is materialised as a Series, often upcast to object, and the function is called once per row in Python',
          'It copies the entire DataFrame for every row',
          'It cannot use more than one CPU core',
          'It re-reads the data from disk for each row',
        ],
        answerIndex: 0,
        explanation:
          'The per-row Series construction plus one interpreted function call per row dominates the cost, which is why the row-wise form is often a thousand times slower than the equivalent column expression.',
      },
      {
        id: 'PD-013-q2',
        type: 'match',
        concept: 'choosing a tool',
        prompt: 'Match each task to its best tool.',
        pairs: [
          { left: 'Two-branch conditional', right: 'np.where' },
          { left: 'Multi-branch conditional with precedence', right: 'np.select' },
          { left: 'Substituting values from a lookup table', right: 'Series.map with a dictionary' },
          { left: 'A value computed per group, attached to every row', right: 'groupby(...).transform(...)' },
        ],
        explanation:
          'All four run in compiled code. Reaching for `apply` in any of these cases trades one to three orders of magnitude of performance for no gain in clarity.',
      },
      {
        id: 'PD-013-q3',
        type: 'code-output',
        language: 'python',
        concept: 'map with a dictionary',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ns = pd.Series(["a", "b", "z"])\nprint(s.map({"a": 1, "b": 2}).tolist())',
        options: ['[1, 2, nan]', "[1, 2, 'z']", '[1, 2]', 'It raises a KeyError'],
        answerIndex: 0,
        explanation:
          'An unmatched key becomes NaN rather than raising or being left alone. That silence is why you should count the missing values after any dictionary map.',
      },
      {
        id: 'PD-013-q4',
        type: 'multi',
        concept: 'leakage in feature preparation',
        prompt: 'Which transformations must be fitted inside a pipeline rather than applied to the whole table beforehand? Select all that apply.',
        options: [
          'Standard scaling',
          'Median imputation',
          'One-hot encoding',
          'Extracting hour of day from a timestamp',
          'Dividing amount by quantity',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Scaling, imputation and encoding each learn a value from the data, so they must be fitted on the training fold alone. The last two are deterministic row-level derivations and leak nothing.',
      },
      {
        id: 'PD-013-q5',
        type: 'truefalse',
        concept: 'applymap',
        prompt: '`DataFrame.applymap` is the recommended way to apply a function to every cell in current pandas.',
        answer: false,
        explanation:
          '`applymap` was deprecated in pandas 2.1 in favour of `DataFrame.map`, which does the same thing. Either way it is element-wise Python and should be a last resort.',
      },
      {
        id: 'PD-013-q6',
        type: 'explain',
        concept: 'vectorisation',
        prompt: 'Explain to a colleague why replacing an `apply` with a vectorised expression can be a thousand times faster when the arithmetic is identical.',
        rubric: [
          'Identifies the per-element Python call and boxing overhead as the dominant cost',
          'Notes that vectorised operations run a single compiled loop over a typed buffer',
          'Mentions that axis=1 additionally constructs a Series per row and may upcast dtypes',
        ],
        sampleAnswer:
          'The arithmetic is the cheap part. In the vectorised form, pandas hands the whole column — a contiguous block of, say, float64 — to compiled code, which runs one loop with no interpreter involvement at all. In the apply form, Python is invoked once per element: each value is converted into a Python object, your function body is executed as interpreted bytecode, and the result is converted back. That overhead is tens to hundreds of nanoseconds per element against roughly one nanosecond for the underlying operation, so it dominates completely. With `axis=1` there is a further cost, because every row must first be assembled into a Series and the mixed column types are upcast, usually to object, which is why the row-wise form is the slowest of all. Nothing about this shows up as an error, which is why it survives development and surfaces in production.',
        explanation:
          'The examinable idea is that the cost lies in the per-item Python boundary crossing, not in the computation, which is why the speed-up is so disproportionate.',
      },
    ],

    flashcards: [
      { front: 'Why is `apply` slow?', back: 'It calls a Python function once per element or row, paying boxing and interpreter overhead that dwarfs the actual computation.' },
      { front: 'Vectorised replacement for a two-branch conditional?', back: '`np.where(condition, value_if_true, value_if_false)`.' },
      { front: 'Vectorised replacement for a multi-branch rule?', back: '`np.select([c1, c2], [v1, v2], default=v0)` — condition order expresses precedence.' },
      { front: 'What does `Series.map(dict)` do with an unmatched key?', back: 'Produces NaN silently. Always count the missing values afterwards.' },
      { front: 'What replaced `applymap` in pandas 2.1?', back: '`DataFrame.map`, which applies a function element-wise over every cell.' },
      { front: 'Which feature steps belong in a pipeline?', back: 'Anything with a `fit`: imputation, scaling, encoding. Deterministic row-level derivations can be done beforehand.' },
      { front: 'Why `handle_unknown="ignore"` on a OneHotEncoder?', back: 'So a category unseen during training does not raise at inference time.' },
    ],

    challenge: {
      title: 'De-apply a feature script',
      brief:
        'You are given a feature script containing four `apply` calls: a two-branch flag, a three-branch band, a dictionary lookup, and a per-customer share of total spend. Rewrite each one vectorised, prove with `pandas.testing.assert_series_equal` that every rewrite produces an identical result on a realistic sample, and report the timing of each version on a million rows. Then wrap the fitted transformations — imputation, scaling and encoding — in a scikit-learn pipeline, leaving only the deterministic derivations in pandas.',
      language: 'python',
      acceptanceCriteria: [
        'All four apply calls are replaced with vectorised equivalents',
        'Each rewrite is verified against the original with an equality assertion, including NaN handling',
        'Timings for both versions are reported on a million-row frame',
        'Fitted transformations live in a pipeline; only deterministic derivations remain in pandas',
      ],
      starterCode:
        'import numpy as np\nimport pandas as pd\nfrom pandas.testing import assert_series_equal\n\n\ndef old_band(df: pd.DataFrame) -> pd.Series:\n    return df.apply(lambda r: "A" if r.score >= 80 else ("B" if r.score >= 60 else "C"), axis=1)\n\n\ndef new_band(df: pd.DataFrame) -> pd.Series:\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me when to use apply and when not to, and then show me how a cleaned table becomes model-ready.',
      mustCover: [
        'apply calls a Python function per element or per row, which is the source of its cost',
        'Vectorised alternatives: direct expressions, np.where, np.select, map with a dictionary, groupby.transform',
        'apply is legitimate for logic that genuinely cannot be vectorised',
        'Fitted transformations belong inside a pipeline; deterministic derivations can be done in pandas',
      ],
      bonusSignals: ['quotes a realistic speed ratio', 'mentions verifying a rewrite with assert_series_equal', 'mentions handle_unknown for unseen categories'],
      sampleExplanation:
        'Think of a sorting office with a machine that handles ten thousand envelopes a minute and a clerk who manages two a second. A vectorised expression is the machine: pandas hands the whole column to compiled code, which runs one tight loop. `apply` is the clerk: Python is called once per value, and each call pays to unbox the value, run interpreted code and box the result. That is why multiplying two columns takes milliseconds while the same thing written as a row-wise apply takes seconds — on a million rows I have measured four milliseconds against nearly eight, which is a factor of two thousand for identical arithmetic. So before writing apply, run through the alternatives. Plain arithmetic, just write the expression. Two branches, `np.where`. Several branches, `np.select`, where the order of the conditions is the precedence. A lookup, `map` with a dictionary — but check for NaN afterwards, because an unknown key becomes missing silently. Something per group, `groupby(...).transform`. Only when the logic is genuinely irregular is apply the right answer, and then it is fine. When you do rewrite, verify the two versions agree with `assert_series_equal` before deleting the slow one, because branching logic is exactly where a boundary slips. Then the final step: making the table model-ready. Anything deterministic about a single row — a ratio, an hour of day, a weekday flag — can be computed in pandas before you split the data, because it learns nothing. Anything that learns a value — an imputation median, a scaler, an encoder\'s category list — must go inside a scikit-learn pipeline, so it is fitted on the training fold and then applied unchanged to test data and to live traffic.',
    },
  },
];
