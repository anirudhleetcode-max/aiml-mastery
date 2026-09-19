import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'DSA-001',
    domain: 'DSA',
    module: 'Complexity',
    topic: 'Asymptotic analysis',
    title: 'Big-O and Time Complexity',
    slug: 'big-o-and-time-complexity',
    difficulty: 2,
    estimatedMinutes: 40,
    prerequisites: [],
    tags: ['big-o', 'complexity', 'asymptotics', 'growth', 'scalability'],

    learningObjectives: [
      'Count the work an algorithm does in terms of the input size n rather than in seconds on your laptop',
      'Write a Big-O expression correctly, dropping constant factors and lower-order terms',
      'Rank O(1), O(log n), O(n), O(n log n), O(n^2) and O(2^n) and predict which ones survive a million-row dataset',
      'Distinguish best, average and worst case, and say which one an interviewer means when they ask "what is the complexity?"',
    ],

    terminology: [
      {
        term: 'Input size (n)',
        definition:
          'The measure of how much data the algorithm is given — usually the number of elements, but sometimes the number of characters, nodes or edges. Complexity is always stated relative to it.',
        simple: 'How big the pile of stuff you handed the algorithm is.',
      },
      {
        term: 'Big-O notation',
        definition:
          'An upper bound on how the number of basic operations grows as n grows. O(f(n)) means "eventually no worse than a constant multiple of f(n)".',
        simple: 'A label describing how much slower things get when the input gets bigger.',
      },
      {
        term: 'Constant factor',
        definition:
          'The fixed multiplier hidden by Big-O. An O(n) algorithm doing 50 operations per element and one doing 3 are both O(n), but the second is roughly 17 times faster in practice.',
        simple: 'How much work each individual step costs — ignored by Big-O, felt by your users.',
      },
      {
        term: 'Worst case',
        definition:
          'The largest number of operations over all inputs of size n. This is what a bare Big-O statement normally refers to, because it is the only bound you can promise.',
        simple: 'How bad it can possibly get for an input of that size.',
      },
      {
        term: 'Asymptotic behaviour',
        definition:
          'How a function behaves as n heads towards infinity. It is what justifies discarding lower-order terms: for large n, n^2 utterly dominates 1000n.',
        simple: 'What happens when the input keeps getting bigger and bigger.',
      },
    ],

    simpleExplanation:
      "Suppose two people each write a program to find duplicate names in a list, and you want to know which one is better. You could time them both on your laptop, but that measures your laptop as much as the programs: a faster machine, a warmer cache or a different day gives a different answer. So computer scientists measure something more stable — how the amount of work grows when the list gets bigger. If doubling the list roughly doubles the work, we call that O(n). If doubling the list quadruples the work, that is O(n^2). If doubling the list adds only one extra step, that is O(log n), and it is wonderful. Big-O is deliberately blunt: it throws away constants and small terms and keeps only the shape of the growth, because that shape is what decides whether your code still finishes when the dataset goes from a thousand rows to ten million. A slow O(n) program beats a clever O(n^2) one on every input that actually matters.",

    whyItExists:
      'Raw timings are not portable: they depend on the machine, the language, the compiler and how warm the cache was. Big-O exists to compare algorithms independently of all of that, and to answer the only question that scales — what happens to this code when the data gets ten times bigger?',

    analogy: {
      scenario:
        "Two assistants are asked to check a wedding guest list for duplicate names. The first compares every guest with every other guest, one pair at a time. The second reads down the list once, ticking each name off in a ledger and shouting the moment a name is already ticked. With twenty guests both finish before you have poured a drink. With twenty thousand, the second is done in a second and the first is still going after lunch — not because that assistant is slow, but because the number of pairs grew four hundred times when the list grew twenty times.",
      mapping: [
        { from: 'The number of guests on the list', to: 'The input size, n' },
        { from: 'Comparing every pair of guests', to: 'A nested loop: O(n^2) operations' },
        { from: 'One pass with a ledger of ticked names', to: 'A single loop plus a hash set: O(n) operations' },
        { from: 'How quickly an individual assistant reads a name', to: 'The constant factor that Big-O deliberately ignores' },
        { from: 'Both looking fine at twenty guests', to: 'Small n hides asymptotic differences entirely' },
      ],
      bridge:
        'The comparison that matters is not "who is quicker per name" but "what happens to the total when the list grows". That is precisely what Big-O captures: the first assistant does n(n-1)/2 comparisons, which grows like n^2, and the second does n, and no amount of personal speed will let the first one win at scale.',
      limitations:
        'The analogy hides two real effects. The ledger costs memory, which the pair-comparison method does not need, and for very small lists the pairwise assistant genuinely wins because setting up a ledger has overhead. Big-O says nothing about either.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Watch the growth curves separate',
        caption: 'Drag n upward and see how quickly n^2 leaves the others behind.',
        widget: 'big-o-growth',
      },
      {
        kind: 'table',
        title: 'What each class costs at scale',
        caption: 'Approximate basic operations. Assume a machine doing 10^8 operations per second.',
        columns: ['Complexity', 'n = 10', 'n = 1,000', 'n = 1,000,000', 'Typical example'],
        rows: [
          ['O(1)', '1', '1', '1', 'Look up a dict key; index an array'],
          ['O(log n)', '3', '10', '20', 'Binary search a sorted array'],
          ['O(n)', '10', '1,000', '1,000,000', 'Scan a list once'],
          ['O(n log n)', '33', '10,000', '20,000,000', 'Sorting with Timsort or merge sort'],
          ['O(n^2)', '100', '1,000,000', '10^12 (about 3 hours)', 'Compare every pair of items'],
          ['O(2^n)', '1,024', 'beyond the age of the universe', 'hopeless', 'Enumerating every subset naively'],
        ],
      },
      {
        kind: 'flow',
        title: 'How to read complexity off a piece of code',
        caption: 'Four questions, asked in this order, settle most cases.',
        steps: [
          { label: 'Name n', detail: 'Decide what the input size actually is: list length, string length, number of graph edges.' },
          { label: 'Find the loops', detail: 'A loop over all n elements is n work. Nested loops multiply; sequential loops add.' },
          { label: 'Cost the body', detail: 'What does one iteration do? A dict lookup is O(1); an `in list` check is O(n) and turns a loop into O(n^2).' },
          { label: 'Include hidden work', detail: 'Slicing, sorting, string concatenation and copying all cost something. `sorted()` inside a loop is n log n per iteration.' },
          { label: 'Drop and simplify', detail: 'Discard constants and lower-order terms: 3n^2 + 90n + 500 becomes O(n^2).' },
        ],
      },
    ],

    formalDefinition:
      'For functions f and g mapping positive integers to non-negative reals, f(n) = O(g(n)) if there exist constants c > 0 and n0 such that f(n) <= c * g(n) for every n >= n0. Time complexity applies this to T(n), the maximum number of elementary operations the algorithm performs on any input of size n, under a model where each elementary operation costs one unit.',

    math: {
      intuition:
        'Big-O is a promise about eventual behaviour, not about small inputs. Saying f(n) = O(n^2) means: past some point n0, the curve f never rises above some fixed multiple of n^2. Both the multiple c and the threshold n0 are allowed to be large, which is exactly why constant factors vanish from the notation — you can always fold them into c.',
      formulas: [
        {
          latex: 'f(n) = O(g(n)) \\iff \\exists\\, c > 0,\\; n_0 > 0 \\;:\\; 0 \\le f(n) \\le c\\,g(n) \\quad \\forall n \\ge n_0',
          name: 'Definition of Big-O',
          meaning: 'f grows no faster than g, up to a constant factor, once n is large enough.',
          category: 'complexity',
          variables: [
            { symbol: 'f(n)', meaning: 'The actual operation count of the algorithm on input size n' },
            { symbol: 'g(n)', meaning: 'The simple reference function we compare against, such as n, n log n or n^2' },
            { symbol: 'c', meaning: 'Any fixed positive multiplier; it absorbs all constant factors' },
            { symbol: 'n_0', meaning: 'The threshold beyond which the bound must hold; behaviour on small inputs is irrelevant' },
          ],
        },
        {
          latex: '\\Omega(g): f(n) \\ge c\\,g(n),\\quad \\Theta(g): c_1 g(n) \\le f(n) \\le c_2 g(n)',
          name: 'Omega and Theta',
          meaning: 'Omega is a lower bound (at least this slow), Theta is a tight bound (exactly this growth, up to constants).',
          category: 'complexity',
          variables: [
            { symbol: '\\Omega', meaning: 'Lower bound: comparison sorting is Omega(n log n)' },
            { symbol: '\\Theta', meaning: 'Tight bound: merge sort is Theta(n log n) in every case' },
            { symbol: 'c_1, c_2', meaning: 'The two constants sandwiching f between multiples of g' },
          ],
        },
        {
          latex: '\\sum_{i=0}^{n-1} (n - 1 - i) = \\frac{n(n-1)}{2} = \\tfrac{1}{2}n^2 - \\tfrac{1}{2}n = O(n^2)',
          name: 'Cost of an all-pairs nested loop',
          meaning: 'The classic triangular loop where the inner loop starts at i+1 — still quadratic despite doing half the work.',
          category: 'complexity',
          variables: [
            { symbol: 'i', meaning: 'Index of the outer loop' },
            { symbol: 'n - 1 - i', meaning: 'Number of inner iterations performed for that value of i' },
            { symbol: 'n(n-1)/2', meaning: 'Total comparisons: the number of unordered pairs' },
          ],
        },
      ],
      derivation: [
        'The outer loop runs with i = 0, 1, ..., n-1.',
        'For a given i, the inner loop runs from j = i+1 to n-1, which is n - 1 - i iterations.',
        'Total = (n-1) + (n-2) + ... + 1 + 0, the sum of the first n-1 integers.',
        'That sum equals n(n-1)/2 = n^2/2 - n/2.',
        'Drop the constant 1/2 and the lower-order term n/2: the result is O(n^2).',
      ],
    },

    workedExample: {
      title: 'Counting the work in a duplicate check, exactly',
      setup:
        'Take names = ["ana", "bo", "cy", "di", "ed", "ana"], so n = 6, and the pairwise algorithm: for each i, compare names[i] against every later names[j]. We will count comparisons, then generalise.',
      steps: [
        { label: 'i = 0 ("ana")', detail: 'Compare with indices 1..5 — that is 5 comparisons. The last one, against names[5] = "ana", matches, but assume the worst case where no duplicate exists so we must keep going.' },
        { label: 'i = 1 ("bo")', detail: 'Compare with indices 2..5 — 4 comparisons.' },
        { label: 'i = 2 ("cy")', detail: 'Compare with indices 3..5 — 3 comparisons.' },
        { label: 'i = 3 ("di")', detail: '2 comparisons.' },
        { label: 'i = 4 ("ed")', detail: '1 comparison.' },
        { label: 'i = 5', detail: '0 comparisons: there is nothing after the last element.' },
        { label: 'Total', detail: '5 + 4 + 3 + 2 + 1 + 0 = 15 comparisons, which is exactly n(n-1)/2 = 6 * 5 / 2.', latex: 'T(6) = \\frac{6 \\cdot 5}{2} = 15' },
        { label: 'Generalise', detail: 'T(n) = n^2/2 - n/2. At n = 6,000 that is about 18 million comparisons; at n = 60,000 it is about 1.8 billion — a hundredfold rise for a tenfold input.' },
        { label: 'Compare the ledger version', detail: 'The set-based version does one hash insert and one membership test per element: T(n) = 2n, so 12 operations at n = 6 and 120,000 at n = 60,000.' },
      ],
      conclusion:
        'Time complexity of the pairwise version is O(n^2) in the worst case (no duplicates) and O(1) in the best case (the first two elements match). Space complexity is O(1): it stores only loop indices. The set version is O(n) time and O(n) extra space. Big-O made the comparison without running either program: 15 versus 12 operations at n = 6 is noise, but 1.8 billion versus 120,000 at n = 60,000 is the difference between a coffee break and an instant answer.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The same task at two complexities, measured',
        runnable: true,
        code: `import time

def has_duplicate_pairs(items):      # O(n^2) time, O(1) space
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j]:
                return True
    return False

def has_duplicate_set(items):        # O(n) time, O(n) space
    seen = set()
    for x in items:
        if x in seen:
            return True
        seen.add(x)
    return False

data = list(range(20_000))           # worst case: no duplicates at all

for fn in (has_duplicate_pairs, has_duplicate_set):
    start = time.perf_counter()
    fn(data)
    print(f"{fn.__name__:22} {time.perf_counter() - start:.4f}s")`,
        output: `has_duplicate_pairs    4.9131s
has_duplicate_set      0.0012s`,
        explanation:
          'Both functions are correct; only their growth differs. The quadratic version performs about 200 million comparisons here, the linear one about 40,000. Double n to 40,000 and the first takes roughly four times as long while the second takes twice as long — that ratio, not the absolute seconds, is what Big-O predicts. Exact timings vary by machine, which is the whole reason we do not compare algorithms with a stopwatch.',
      },
      {
        language: 'python',
        title: 'The hidden O(n) inside an innocent-looking loop',
        runnable: true,
        code: `def count_common_slow(a, b):
    """Looks like one loop. Is actually O(len(a) * len(b))."""
    total = 0
    for x in a:
        if x in b:          # b is a list: 'in' scans it, O(len(b))
            total += 1
    return total

def count_common_fast(a, b):
    b_set = set(b)          # one-off O(len(b))
    return sum(1 for x in a if x in b_set)   # O(1) per test

a = list(range(5_000))
b = list(range(2_500, 7_500))
print(count_common_slow(a, b), count_common_fast(a, b))`,
        output: `2500 2500`,
        explanation:
          'The operator `in` costs O(1) on a set or dict but O(n) on a list or tuple, because a list must be scanned element by element. A single-line change turns 12.5 million comparisons into 10,000. This one substitution is the most common real performance fix in data code, and you can only see it if you cost the body of the loop rather than just counting the loops.',
      },
      {
        language: 'python',
        title: 'Reducing an expression to its Big-O',
        code: `def process(rows):               # n = len(rows)
    total = 0                    # O(1)
    for r in rows:               # n iterations
        total += r               # O(1) each        -> n
    ordered = sorted(rows)       # O(n log n)
    for i in range(len(rows)):   # n iterations
        for j in range(3):       # 3 iterations, constant
            total += ordered[i] * j   # O(1)        -> 3n
    return total

# T(n) = 1 + n + n log n + 3n  =  n log n + 4n + 1  ->  O(n log n)`,
        explanation:
          'Sequential blocks add, so you take the largest: n log n dominates 4n for every n above about 16, and the constant 1 never mattered. The inner loop over `range(3)` does not contribute a factor of n because 3 does not grow with the input — a fixed-size loop is a constant factor, not a dimension.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A nightly feature-engineering job that stopped finishing',
        usage:
          'A pipeline that joined two lists with a nested loop ran in four minutes on 5,000 customers. At 200,000 customers the same code needed roughly 1,600 times as long — around four days. Replacing the inner scan with a dict lookup made it linear and it finished in seconds.',
      },
      {
        context: 'Similarity search over embeddings',
        usage:
          'Comparing every query vector with every stored vector is O(n*m) and is exactly why vector databases exist: approximate nearest-neighbour indexes trade exactness for something closer to O(log n) per query.',
      },
      {
        context: 'Interview screening',
        usage:
          'Almost every coding interview ends with "what is the time and space complexity?" A correct O(n^2) solution plus an accurate complexity analysis usually scores better than an O(n) solution the candidate cannot reason about.',
      },
    ],

    projectConnections: [
      { tool: 'cProfile / time.perf_counter', role: 'Measures constant factors that Big-O ignores, and tells you which function to analyse in the first place.' },
      { tool: 'NumPy', role: 'Does not change the complexity of an operation but shrinks its constant factor enormously by pushing the loop into compiled C.' },
      { tool: 'scikit-learn', role: 'Documents fit-time complexity per estimator — kernel SVMs are roughly O(n^2) to O(n^3) in samples, which is why they stop being an option on large datasets.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing O(2n + 5) or O(3n^2)',
        why: 'Big-O already discards constant multipliers and additive constants; keeping them suggests a misunderstanding of what the notation means.',
        fix: 'Simplify to the dominant term with no coefficient: O(n) and O(n^2). Say "about 3n operations" in prose if the constant genuinely matters.',
      },
      {
        mistake: 'Assuming `x in collection` is always cheap',
        why: 'Membership is O(1) on sets and dicts but O(n) on lists, tuples and strings. Inside a loop over n items that difference silently turns O(n) into O(n^2).',
        fix: 'Convert to a set once before the loop when you will test membership repeatedly, and remember the conversion itself costs O(n) and O(n) memory.',
      },
      {
        mistake: 'Confusing the number of loops with the complexity',
        why: 'Two nested loops that each run a fixed number of times are constant work, while one loop containing `sorted()` is O(n^2 log n). The body matters as much as the nesting.',
        fix: 'Cost the body explicitly, including library calls. Ask "how many elementary operations does one iteration perform?" before multiplying.',
      },
      {
        mistake: 'Treating O(n log n) as barely better than O(n^2)',
        why: 'The logarithm grows extraordinarily slowly: at n = 1,000,000, log2 n is only about 20, so n log n is 50,000 times smaller than n^2.',
        fix: 'Keep the concrete table in mind. Anything above n log n should make you look for a better algorithm before you look for a faster machine.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the time complexity of this and why: for i in range(n): for j in range(i, n): total += 1?',
        answer:
          'It is O(n^2). The inner loop runs n - i times for each i, so the total is n + (n-1) + ... + 1 = n(n+1)/2 = n^2/2 + n/2 operations. Dropping the constant 1/2 and the lower-order n/2 leaves O(n^2). The key point is that halving the work does not change the growth class: doubling n still roughly quadruples the running time, which is the only thing Big-O claims to describe.',
        followUp:
          'A strong answer volunteers that this is also Theta(n^2), because the bound is tight in both directions, and that the space complexity is O(1).',
      },
      {
        level: 'intermediate',
        question: 'When would you deliberately choose an algorithm with worse Big-O?',
        answer:
          'When n is small and bounded, or when the constant factors dominate. Insertion sort is O(n^2) but beats merge sort for arrays of fewer than about 30 elements, which is why CPython\'s Timsort uses binary insertion sort on small runs. Similarly, a linear scan of a 20-element list is faster than building a hash set because hashing has real per-element cost. Big-O describes asymptotic behaviour; if your n never leaves the region where asymptotics have not kicked in, measure instead of theorise.',
        followUp:
          'Mentioning cache locality earns credit: an O(n) scan of a contiguous array can outrun an O(log n) traversal of a pointer-chasing tree at modest sizes.',
      },
      {
        level: 'ml-engineer',
        question: 'Why does complexity analysis matter for machine learning specifically, when the heavy work happens inside optimised libraries?',
        answer:
          'Because the libraries only optimise the constant factor, not the growth. Training a kernel SVM is roughly quadratic to cubic in the number of samples, so no amount of vectorisation makes it viable at ten million rows — you switch to a linear model or SGD instead. Attention in a transformer is O(L^2) in sequence length, which is the direct reason long-context models need sparse or linear attention variants. And in the data layer, an accidental O(n^2) join in a Python preprocessing step will dominate the training time of an otherwise efficient model.',
        followUp:
          'The strongest answers name a concrete asymptotic constraint in their own work and the architectural decision it forced.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'State the time and space complexity of this function and justify both:\n\n```\ndef f(matrix):\n    out = []\n    for row in matrix:            # n rows\n        out.append(sum(row))      # each row has m entries\n    return out\n```',
        hint: 'There are two different input dimensions here. Does `sum(row)` cost O(1)?',
        solution:
          'Time is O(n*m), where n is the number of rows and m the row length, because `sum(row)` itself walks all m entries and that happens n times. Writing it as O(n) would be wrong: it hides the inner traversal. If the matrix is square with side n, this is O(n^2) — which is also just "linear in the number of elements", the best possible for anything that must read every entry. Space is O(n) for the output list, or O(1) auxiliary if you do not count the returned value.',
      },
      {
        prompt: 'A function takes 2 seconds on 10,000 items and 8 seconds on 20,000 items. What is its likely complexity, and roughly how long will 80,000 items take?',
        hint: 'Doubling the input multiplied the time by four. Which growth class does that?',
        solution:
          'Quadrupling for a doubling is the signature of O(n^2). From 20,000 to 80,000 is another doubling twice over, so the time multiplies by 4 * 4 = 16: about 128 seconds. This kind of back-of-the-envelope extrapolation is what makes complexity practically useful — two measurements let you predict the third, and if the prediction is badly wrong your mental model of the code is wrong somewhere.',
      },
      {
        prompt: 'Rewrite this to be O(n) instead of O(n^2), and explain what you traded away:\n\n```\ncommon = [x for x in list_a if x in list_b]\n```',
        hint: 'Which operation inside the comprehension is secretly linear?',
        solution:
          'set_b = set(list_b) followed by common = [x for x in list_a if x in set_b].\n\nThe membership test drops from O(len(list_b)) to O(1) average, making the whole thing O(len(list_a) + len(list_b)). The trade is memory: the set holds up to len(list_b) elements, so you have swapped O(1) extra space for O(m) extra space. It also loses nothing about ordering here, because the output order still follows list_a — but note the set itself is unordered, so never iterate it expecting list_b\'s order.',
      },
    ],

    quiz: [
      {
        id: 'DSA-001-q1',
        type: 'mcq',
        concept: 'simplifying big-o',
        prompt: 'An algorithm performs exactly 5n^2 + 300n + 12000 operations. What is its time complexity?',
        options: ['O(n^2)', 'O(5n^2)', 'O(n^2 + n)', 'O(12000)'],
        answerIndex: 0,
        explanation:
          'Constant factors and lower-order terms are discarded because they cannot change the growth shape. For large n, 5n^2 dominates everything else, so the answer is O(n^2) with no coefficient.',
      },
      {
        id: 'DSA-001-q2',
        type: 'order',
        concept: 'growth ordering',
        prompt: 'Order these complexity classes from fastest-growing to slowest-growing.',
        items: ['O(2^n)', 'O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)', 'O(1)'],
        explanation:
          'Exponential beats polynomial, higher polynomials beat lower ones, and any polynomial beats a logarithm. The practical dividing line is around O(n log n): above it, large datasets become impractical.',
      },
      {
        id: 'DSA-001-q3',
        type: 'numeric',
        concept: 'counting operations',
        prompt: 'For `for i in range(n): for j in range(i+1, n): compare(i, j)` with n = 6, how many times does compare run?',
        answer: 15,
        explanation:
          'It runs n(n-1)/2 = 6*5/2 = 15 times — one per unordered pair. Halving the work compared with a full n^2 double loop leaves the complexity at O(n^2).',
      },
      {
        id: 'DSA-001-q4',
        type: 'code-output',
        language: 'python',
        concept: 'hidden linear operations',
        prompt: 'Which statement about this code is correct?',
        code: `seen = []
for x in data:            # len(data) == n
    if x not in seen:
        seen.append(x)`,
        options: [
          'It is O(n^2) because `not in` scans the list `seen` on every iteration',
          'It is O(n) because there is only one loop',
          'It is O(n log n) because appending keeps the list sorted',
          'It is O(1) because append is constant time',
        ],
        answerIndex: 0,
        explanation:
          'The single visible loop runs n times, but each iteration performs a linear scan of `seen`, which can grow to n elements. That is n * n / 2 comparisons on average: O(n^2). Using a set makes it O(n).',
      },
      {
        id: 'DSA-001-q5',
        type: 'truefalse',
        concept: 'best vs worst case',
        prompt: 'An algorithm that is O(n^2) in the worst case can still finish in a constant number of steps on some inputs.',
        answer: true,
        explanation:
          'Worst case is an upper bound over all inputs of size n, not a description of every run. Linear search is O(n) worst case but O(1) when the target happens to be the first element.',
      },
      {
        id: 'DSA-001-q6',
        type: 'explain',
        concept: 'why big-o ignores constants',
        prompt: 'Explain to a teammate why we drop constant factors in Big-O, and when that decision misleads you.',
        rubric: [
          'Says constants depend on machine, language and implementation rather than on the algorithm',
          'Says growth class determines behaviour as n increases, and dominates constants eventually',
          'Gives an honest case where constants matter: small n, or a 50x constant in production code',
        ],
        sampleAnswer:
          'Constants describe the machine and the implementation, not the idea: the same algorithm in C and in pure Python differs by perhaps fifty times in constant factor but has identical Big-O. Since the growth class eventually dominates any constant, comparing classes tells you which program survives a bigger dataset. It misleads you when n is small and stays small, or when the constant is genuinely enormous — a 50x constant on an O(n log n) algorithm can lose to an O(n^2) one right up to several thousand elements, so for bounded inputs you measure rather than theorise.',
        explanation:
          'The examinable insight is that Big-O answers a scaling question, not a speed question, and that a careful engineer knows which of the two they are actually being asked.',
      },
    ],

    flashcards: [
      { front: 'What does O(n log n) mean in plain words?', back: 'Work grows a little faster than linearly: doubling the input slightly more than doubles the work. It is the complexity of good general-purpose sorting.' },
      { front: 'Cost of `x in my_list` versus `x in my_set`?', back: 'O(n) for a list (it scans), O(1) average for a set or dict (it hashes). Inside a loop this is the difference between O(n^2) and O(n).' },
      { front: 'Why drop lower-order terms?', back: 'Because for large n the dominant term swamps them: at n = 1,000,000, n^2 is a million times larger than n.' },
      { front: 'What does a bare "O(n)" normally refer to?', back: 'Worst-case time complexity, unless stated otherwise. Average case and best case must be named explicitly.' },
      { front: 'n(n-1)/2 comparisons simplifies to what?', back: 'O(n^2). Halving the work changes the constant factor, never the growth class.' },
      { front: 'Time went 2s -> 8s when n doubled. Complexity?', back: 'Roughly O(n^2): a 2x input producing a 4x time is the quadratic signature.' },
    ],

    challenge: {
      title: 'Measure the curve yourself',
      brief:
        'Write a script that times three functions — a linear scan, a sort, and an all-pairs nested loop — at n = 1,000, 2,000, 4,000 and 8,000. Print a table of n, seconds, and the ratio of each timing to the previous one. Then write two sentences explaining what each ratio column tells you about the complexity, and note where your measured ratios disagree with theory and why (warm-up, caching, interpreter overhead).',
      language: 'python',
      acceptanceCriteria: [
        'All three functions are timed at four input sizes with the same measurement method',
        'The output includes a ratio column, not just raw seconds',
        'The write-up identifies the ratio expected for O(n), O(n log n) and O(n^2)',
        'The write-up names at least one concrete reason measurements deviate from theory',
      ],
      starterCode: 'import time, random\n\ndef linear_scan(xs):\n    return max(xs)\n\n# add sort_it and all_pairs, then time each at n = 1000, 2000, 4000, 8000\n',
    },

    teachingPrompt: {
      prompt:
        'A colleague says "my code runs in 0.3 seconds, so it is fast enough". Teach them what Big-O measures instead, and why your answer should change their mind.',
      mustCover: [
        'Big-O describes how work grows with input size, not how many seconds something takes',
        'Constant factors and lower-order terms are dropped because they do not affect growth',
        'The practical consequence: an O(n^2) algorithm becomes unusable long before an O(n) one does',
        'Worst case is the default guarantee, and best case can be far better',
      ],
      bonusSignals: ['gives concrete numbers at a large n', 'mentions that small n hides the difference', 'notes the space cost of the faster alternative'],
      sampleExplanation:
        'Zero point three seconds is a fact about today\'s input on today\'s laptop; it says nothing about tomorrow\'s. Big-O asks a different question: if the data gets ten times bigger, what happens to the work? If the answer is "ten times more", the algorithm is O(n) and your 0.3 seconds becomes 3. If the answer is "a hundred times more", it is O(n^2) and your 0.3 seconds becomes half a minute — and at a hundred times the data, an hour. We drop constants and small terms because they depend on the machine and the language, not on the idea, and because the growth term eventually swamps them anyway. The number quoted is the worst case, since that is the only one you can actually promise; some inputs will be much luckier.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-002',
    domain: 'DSA',
    module: 'Complexity',
    topic: 'Memory cost and trade-offs',
    title: 'Space Complexity and Trade-offs',
    slug: 'space-complexity-and-trade-offs',
    difficulty: 3,
    estimatedMinutes: 30,
    prerequisites: ['DSA-001'],
    related: ['DSA-001'],
    tags: ['space-complexity', 'memory', 'trade-offs', 'in-place', 'call-stack'],

    learningObjectives: [
      'Separate total space from auxiliary space, and say which one a complexity claim refers to',
      'Account for the memory a recursive function consumes on the call stack',
      'Describe a concrete time/space trade-off and choose a side with a stated reason',
      'Recognise when an algorithm is genuinely in-place and when it only looks in-place',
    ],

    terminology: [
      {
        term: 'Space complexity',
        definition:
          'How the memory an algorithm uses grows with input size n, measured in the same asymptotic style as time complexity.',
        simple: 'How much extra room the algorithm needs when the input gets bigger.',
      },
      {
        term: 'Auxiliary space',
        definition:
          'The extra memory the algorithm allocates beyond the input itself. This is what people normally quote: merge sort is O(n) auxiliary, quicksort O(log n).',
        simple: 'The scratch paper, not counting the question sheet you were handed.',
      },
      {
        term: 'In-place',
        definition:
          'An algorithm that transforms its input using only O(1) — or sometimes O(log n) — auxiliary space, rather than building a separate copy.',
        simple: 'Rearranging the furniture in the room instead of renting a second room.',
      },
      {
        term: 'Call stack',
        definition:
          'The region of memory holding one frame per active function call, with local variables and the return address. Recursion depth d costs O(d) space even when no data structure is allocated.',
        simple: 'The pile of half-finished jobs the computer is keeping track of.',
      },
      {
        term: 'Memoisation',
        definition:
          'Storing computed results so repeated subproblems are answered by lookup. The canonical trade: spend memory to buy time.',
        simple: 'Writing down answers you already worked out so you never redo them.',
      },
    ],

    simpleExplanation:
      "Every algorithm needs somewhere to put things while it works, and that space grows with the input just as time does. If you write a function that copies a list to sort it, you need room for a second list, so the memory grows in step with n. If instead you shuffle the elements around inside the original list, you need only a couple of temporary variables no matter how long the list is. That second version uses constant space. The reason this matters is that memory is a hard wall in a way that time is not: a slow program eventually finishes, while a program that asks for more memory than exists simply dies, often with a MemoryError or a silent kill from the operating system. The interesting part is that time and space can usually be traded against each other. Store more and you can often compute faster, because you stop recomputing things you already knew. Store less and you pay in repeated work. Choosing where to sit on that line is one of the real decisions in engineering.",

    whyItExists:
      'Memory is finite and unforgiving: exceeding it kills the process rather than slowing it down. Space complexity exists so you can predict whether an algorithm fits in the machine you actually have, and so you can reason about deliberately trading memory for speed instead of stumbling into it.',

    analogy: {
      scenario:
        "Consider two ways of alphabetising a huge pile of paper invoices on a small desk. The first clerk clears a second desk, deals the invoices into labelled piles there, then merges them back — fast and tidy, but it needs a whole extra desk roughly the size of the original pile. The second clerk has only the one desk and must swap invoices around in place, which takes more shuffling but never needs more room than the pile already occupies. If the office has a spare desk, the first method wins on time. If it does not, the first method is not merely slower, it is impossible.",
      mapping: [
        { from: 'The pile of invoices you were given', to: 'The input, which is not counted as auxiliary space' },
        { from: 'The extra desk of the same size', to: 'O(n) auxiliary space, as used by merge sort' },
        { from: 'Swapping invoices within the one desk', to: 'An in-place algorithm with O(1) auxiliary space' },
        { from: 'Having no spare desk at all', to: 'A MemoryError, or the OS killing the process' },
        { from: 'A sticky note of totals you already worked out', to: 'Memoisation: extra memory that removes repeated work' },
      ],
      bridge:
        'The clerk\'s spare desk is exactly what "auxiliary space" names, and the reason we measure it separately from the input is that the input is a cost you cannot avoid while the scratch space is a choice you make. When an algorithm is described as O(1) space, it means the scratch space stays the same size however big the pile grows.',
      limitations:
        'Real memory is not a flat desk: an object in Python carries substantial per-object overhead, and a list of a million small integers costs far more than a million machine words. Asymptotic space analysis hides those constant factors just as Big-O hides time constants.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Two ways to reverse a list',
        caption: 'Same output, different memory profile.',
        left: {
          heading: 'Copying — `list(reversed(xs))`',
          points: [
            'Allocates a brand-new list of n elements',
            'O(n) auxiliary space',
            'Leaves the original untouched, which callers often rely on',
            'Slightly faster in practice for small lists: no repeated swaps',
          ],
        },
        right: {
          heading: 'In place — `xs.reverse()`',
          points: [
            'Swaps elements around within the existing list',
            'O(1) auxiliary space — two index variables',
            'Destroys the original order, which can surprise a caller sharing the list',
            'The only option when the data barely fits in memory',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Auxiliary space of algorithms you will meet',
        columns: ['Algorithm', 'Time', 'Auxiliary space', 'Where the space goes'],
        rows: [
          ['Linear scan for a maximum', 'O(n)', 'O(1)', 'One running best-so-far variable'],
          ['Merge sort', 'O(n log n)', 'O(n)', 'The merge buffer'],
          ['Quicksort (in-place partition)', 'O(n log n) average', 'O(log n)', 'Recursion stack, depth log n when balanced'],
          ['Counting duplicates with a set', 'O(n)', 'O(n)', 'The set of seen values'],
          ['Recursive factorial(n)', 'O(n)', 'O(n)', 'n stack frames, one per call'],
          ['Iterative factorial(n)', 'O(n)', 'O(1)', 'One accumulator variable'],
        ],
      },
      {
        kind: 'flow',
        title: 'Deciding where to sit on the trade-off',
        caption: 'Ask these in order when memory and speed pull in different directions.',
        steps: [
          { label: 'Is the data bounded?', detail: 'If n cannot exceed a few thousand, spend memory freely and optimise for clarity.' },
          { label: 'Does it fit?', detail: 'Estimate bytes: n elements times the per-element cost. If it is near the machine limit, in-place or streaming is not optional.' },
          { label: 'Is work repeated?', detail: 'If the same subproblem recurs, caching converts exponential time into linear time — the best trade available.' },
          { label: 'Can you stream?', detail: 'Generators and chunked reads turn O(n) space into O(1) or O(chunk) when you only need one pass.' },
          { label: 'Measure', detail: 'Use tracemalloc or sys.getsizeof to check the real numbers before believing your own estimate.' },
        ],
      },
    ],

    formalDefinition:
      'Space complexity S(n) is the maximum amount of memory, as a function of input size n, that an algorithm occupies at any single moment during execution. Total space counts the input; auxiliary space counts only additional allocations, including the call stack. As with time, it is reported asymptotically, so constant per-element overheads are absorbed into the notation.',

    math: {
      intuition:
        'Space is a peak measurement, not a total: what matters is the largest amount in use at one instant, because that is what must fit. Memory that is allocated and released does not accumulate. For recursion, the peak is reached at the deepest point of the call chain, so depth rather than number of calls sets the bound.',
      formulas: [
        {
          latex: 'S_{\\text{total}}(n) = S_{\\text{input}}(n) + S_{\\text{aux}}(n)',
          name: 'Total versus auxiliary space',
          meaning: 'A complexity claim must say which of the two it means; "O(1) space" almost always means auxiliary.',
          category: 'complexity',
          variables: [
            { symbol: 'S_{\\text{input}}', meaning: 'Memory holding the input itself, which the algorithm did not choose to allocate' },
            { symbol: 'S_{\\text{aux}}', meaning: 'Everything the algorithm allocates: buffers, sets, recursion frames' },
          ],
        },
        {
          latex: 'S_{\\text{stack}}(n) = O(d) \\quad \\text{where } d = \\text{maximum recursion depth}',
          name: 'Cost of the call stack',
          meaning: 'Each active call holds a frame; only the deepest chain is alive at once, so depth and not total call count is what you pay.',
          category: 'complexity',
          variables: [
            { symbol: 'd', meaning: 'The greatest number of frames stacked simultaneously' },
            { symbol: 'O(d)', meaning: 'Linear in depth: balanced recursion gives O(log n), a recursion over a list gives O(n)' },
          ],
        },
        {
          latex: 'T_{\\text{naive}}(n) = O(2^n) \\;\\xrightarrow{\\;+\\,O(n)\\text{ memory}\\;}\\; T_{\\text{memo}}(n) = O(n)',
          name: 'The memoisation trade',
          meaning: 'Storing n subproblem answers collapses exponential recomputation into a single pass — the most dramatic trade in the subject.',
          category: 'complexity',
          variables: [
            { symbol: 'T_{\\text{naive}}', meaning: 'Time for naive recursive Fibonacci, which recomputes the same subproblems' },
            { symbol: 'T_{\\text{memo}}', meaning: 'Time once each subproblem is computed exactly once and cached' },
            { symbol: 'O(n)\\text{ memory}', meaning: 'The cache holding one entry per distinct subproblem' },
          ],
        },
      ],
    },

    workedExample: {
      title: 'Where the memory actually goes in a recursive sum',
      setup:
        'Trace recursive_sum([3, 1, 4, 1, 5]) where recursive_sum(xs) returns 0 for an empty list and xs[0] + recursive_sum(xs[1:]) otherwise. We count both stack frames and the slices it creates.',
      steps: [
        { label: 'Call 1', detail: 'recursive_sum([3,1,4,1,5]) allocates the slice [1,4,1,5] (4 elements) and suspends. One frame alive.' },
        { label: 'Call 2', detail: 'recursive_sum([1,4,1,5]) allocates [4,1,5]. Two frames alive, plus two live slices.' },
        { label: 'Call 3', detail: 'recursive_sum([4,1,5]) allocates [1,5]. Three frames alive.' },
        { label: 'Call 4', detail: 'recursive_sum([1,5]) allocates [5]. Four frames alive.' },
        { label: 'Call 5', detail: 'recursive_sum([5]) allocates []. Five frames alive — this is the peak.' },
        { label: 'Base case', detail: 'recursive_sum([]) returns 0 with a sixth frame. Peak depth d = 6 for n = 5.' },
        { label: 'Unwinding', detail: 'Frames return 5, then 6, then 10, then 11, then 14. Each returning frame releases its slice.' },
        { label: 'Total slice memory at the peak', detail: '4 + 3 + 2 + 1 + 0 = 10 elements alive simultaneously, which is n(n-1)/2 in general.', latex: '\\sum_{k=0}^{n-1} k = \\frac{n(n-1)}{2} = O(n^2)' },
      ],
      conclusion:
        'Time complexity is O(n^2), not O(n), because each of the n calls copies a slice of average length n/2 — the slicing is the hidden cost. Space complexity is O(n) for the stack plus O(n^2) for the simultaneously live slices, so O(n^2) overall. Replacing the slice with an index argument, recursive_sum(xs, i), makes it O(n) time and O(n) space; rewriting as a loop makes it O(n) time and O(1) auxiliary space. The same arithmetic, three different memory profiles.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Measuring peak memory rather than guessing',
        runnable: true,
        code: `import tracemalloc

def squares_list(n):        # O(n) space: the whole list is alive at once
    return [i * i for i in range(n)]

def squares_stream(n):      # O(1) space: one value alive at a time
    return sum(i * i for i in range(n))

tracemalloc.start()
total = sum(squares_list(1_000_000))
peak_list = tracemalloc.get_traced_memory()[1]
tracemalloc.stop()

tracemalloc.start()
total2 = squares_stream(1_000_000)
peak_stream = tracemalloc.get_traced_memory()[1]
tracemalloc.stop()

print(total == total2)
print(f"list comprehension peak: {peak_list / 1e6:.1f} MB")
print(f"generator peak:          {peak_stream / 1e6:.4f} MB")`,
        output: `True
list comprehension peak: 40.0 MB
generator peak:          0.0001 MB`,
        explanation:
          'Both compute the identical number in the same O(n) time, but the comprehension materialises a million integers before summing them while the generator yields one at a time. Swapping square brackets for round ones is the cheapest memory optimisation in Python, and `tracemalloc` is how you prove it rather than assert it. The exact megabyte figure depends on integer caching and platform, but the ratio is the point.',
      },
      {
        language: 'python',
        title: 'Buying time with memory: memoisation',
        runnable: true,
        code: `from functools import lru_cache
import time

def fib_naive(n):                 # O(2^n) time, O(n) stack space
    return n if n < 2 else fib_naive(n - 1) + fib_naive(n - 2)

@lru_cache(maxsize=None)
def fib_memo(n):                  # O(n) time, O(n) cache + O(n) stack
    return n if n < 2 else fib_memo(n - 1) + fib_memo(n - 2)

def fib_iter(n):                  # O(n) time, O(1) space
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

start = time.perf_counter(); fib_naive(30); naive = time.perf_counter() - start
start = time.perf_counter(); fib_memo(30);  memo = time.perf_counter() - start
print(f"naive {naive:.4f}s   memoised {memo:.6f}s   iterative gives {fib_iter(30)}")`,
        output: `naive 0.2214s   memoised 0.000024s   iterative gives 832040`,
        explanation:
          'The naive version recomputes fib(28) hundreds of thousands of times; the cache stores each of the n distinct answers once and turns exponential time into linear. The third version shows the trade is not always necessary: because each step needs only the previous two values, a rolling pair of variables achieves O(n) time at O(1) space. When you can find such a formulation, it strictly dominates the cached one.',
      },
      {
        language: 'python',
        title: 'In-place versus copying, and who notices',
        runnable: true,
        code: `def dedupe_copy(xs):          # O(n) time, O(n) space, order preserved
    seen, out = set(), []
    for x in xs:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out

def sort_in_place(xs):        # O(n log n) time, O(1) auxiliary, MUTATES xs
    xs.sort()
    return xs

data = [3, 1, 3, 2, 1]
print(dedupe_copy(data), data)     # original untouched
sort_in_place(data)
print(data)                        # original rearranged`,
        output: `[3, 1, 2] [3, 1, 3, 2, 1]
[1, 1, 2, 3, 3]`,
        explanation:
          'In-place work saves memory but silently changes an object the caller may still be using — the same shared-reference issue that makes `df2 = df` dangerous in pandas. That is why `sorted()` (copy, O(n) space) and `list.sort()` (in place, O(1) auxiliary) both exist: the library refuses to choose for you, because the right answer depends on whether anyone else holds a reference to that list.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Loading a dataset larger than RAM',
        usage:
          'Reading a 40 GB CSV with `pd.read_csv` fails outright on a 16 GB machine. Processing it with `chunksize` turns O(n) space into O(chunk), at the cost of extra passes and more complicated aggregation code.',
      },
      {
        context: 'Choosing batch size when training a network',
        usage:
          'Activation memory grows roughly linearly with batch size, so the batch that fits is a space-complexity decision. Gradient checkpointing is the same trade in reverse: recompute activations during the backward pass to cut memory, paying perhaps 30% more time.',
      },
      {
        context: 'Precomputed embeddings in a retrieval system',
        usage:
          'Storing embeddings for a million documents costs a few gigabytes but removes a forward pass per query. The whole design of a vector store is an industrial-scale time-for-space trade.',
      },
    ],

    projectConnections: [
      { tool: 'tracemalloc / memory_profiler', role: 'Report actual peak allocation so space claims can be verified rather than assumed.' },
      { tool: 'Python generators', role: 'The standard tool for turning O(n) pipelines into O(1) streaming ones.' },
      { tool: 'PyTorch', role: '`torch.utils.checkpoint` trades recomputation time for activation memory; `inplace=True` on ReLU saves a tensor-sized allocation per layer.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting the recursion stack when claiming O(1) space',
        why: 'A recursive function with no data structures still allocates one frame per active call, so a recursion of depth n uses O(n) space and can hit RecursionError at about 1,000 frames in CPython.',
        fix: 'Count the maximum depth explicitly. If it is proportional to n, say O(n) space, and consider an iterative version with an explicit stack.',
      },
      {
        mistake: 'Treating the output as auxiliary space',
        why: 'An algorithm that must return n results cannot use less than O(n) total space, so counting the output makes every such algorithm look equally expensive and hides real differences.',
        fix: 'Quote auxiliary space, excluding the required output, and say so: "O(1) auxiliary, excluding the returned list of n items".',
      },
      {
        mistake: 'Assuming slicing is free',
        why: '`xs[1:]` copies the elements, so a recursion that slices at each level costs O(n^2) time and memory rather than O(n).',
        fix: 'Pass indices instead of slices, or use `memoryview` / NumPy views where genuinely no copy is wanted.',
      },
      {
        mistake: 'Caching without a bound',
        why: 'An unbounded `lru_cache(maxsize=None)` on a function called with many distinct arguments grows without limit and turns a speed optimisation into a memory leak in a long-running service.',
        fix: 'Set a real `maxsize`, or key the cache on a small bounded domain, and monitor process memory in production.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the space complexity of merge sort and of quicksort, and why do they differ?',
        answer:
          'Merge sort needs an auxiliary buffer to merge two sorted halves, so it is O(n) auxiliary space; the merge step cannot be done in place without a substantially more complex algorithm. In-place quicksort partitions within the array itself, so its only auxiliary cost is the recursion stack: O(log n) when partitions are balanced, degrading to O(n) in the worst case unless you recurse on the smaller side first and loop on the larger. That difference is a major reason quicksort is the default for in-memory arrays while merge sort dominates external and stable sorting.',
        followUp:
          'A strong answer mentions that Python\'s Timsort is a merge sort variant and therefore O(n) space, which is the price of guaranteed stability and O(n log n) worst case.',
      },
      {
        level: 'intermediate',
        question: 'You must find whether any two numbers in a list sum to a target. Give an O(n) time solution and state its space cost, then a solution that uses O(1) extra space.',
        answer:
          'The O(n) time solution keeps a set of values seen so far and, for each x, tests whether target - x is in it; that is O(n) time and O(n) auxiliary space. The O(1) space solution sorts the list first and then walks two pointers inward from both ends, moving the left pointer up when the sum is too small and the right pointer down when it is too large: O(n log n) time and O(1) auxiliary space if the sort is in-place. So you are trading a log factor of time against linear memory, and which is better depends on whether n is large enough for the memory to hurt and whether you are allowed to reorder the input.',
        followUp:
          'Asking whether mutating the caller\'s list is acceptable shows the awareness interviewers are actually probing for.',
      },
      {
        level: 'ml-engineer',
        question: 'Explain gradient checkpointing as a complexity trade-off.',
        answer:
          'A standard backward pass needs every layer\'s activations, so activation memory is O(L) in the number of layers. Gradient checkpointing stores activations only at selected checkpoints and recomputes the intermediate ones during the backward pass, reducing memory to roughly O(sqrt(L)) with an optimal checkpoint spacing while adding about one extra forward pass, typically 20 to 40 per cent more time. It is the classic time-for-space trade applied at the framework level, and it is what allows a model that would otherwise not fit to train on the GPU you have.',
        followUp:
          'Connecting it to activation memory scaling with batch size and sequence length shows real systems experience.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'State the auxiliary space complexity of each and justify:\n(a) `sum(x*x for x in xs)`\n(b) `sum([x*x for x in xs])`\n(c) `xs.sort()`\n(d) `sorted(xs)`',
        hint: 'Which of these materialise a whole collection before consuming it?',
        solution:
          '(a) O(1): the generator produces one value at a time and sum keeps a single accumulator.\n(b) O(n): the list comprehension builds the full list of squares first, then sums it.\n(c) O(1) auxiliary in practice for Timsort on typical data, though Timsort\'s merge buffer makes the true worst case O(n); it mutates xs and returns None.\n(d) O(n): it allocates a new sorted list and leaves xs untouched.\n\nThe pair (a)/(b) differ by two characters and by 40 MB at n = 1,000,000, which is why the generator form is the default in production code.',
      },
      {
        prompt: 'A recursive function processes a balanced binary tree of n nodes. What is its space complexity, and how does the answer change if the tree is a single long chain?',
        hint: 'Space is governed by the deepest simultaneous chain of calls, not the total number of calls.',
        solution:
          'For a balanced tree the depth is about log2(n), so the call stack uses O(log n) space even though all n nodes are visited — sibling calls finish and release their frames before the next begins. For a degenerate tree that is one long chain, depth equals n, so space becomes O(n) and at n above roughly 1,000 CPython raises RecursionError. This is precisely why unbalanced binary search trees are a practical hazard and not merely a theoretical one.',
      },
      {
        prompt: 'Rewrite this to use O(1) auxiliary space, and say what you give up:\n\n```\ndef running_max(xs):\n    prefix = [xs[:i+1] for i in range(len(xs))]\n    return [max(p) for p in prefix]\n```',
        hint: 'Do you need every prefix stored, or just the best value so far?',
        solution:
          'def running_max(xs):\n    out, best = [], float("-inf")\n    for x in xs:\n        best = max(best, x)\n        out.append(best)\n    return out\n\nThe original builds n slices totalling O(n^2) elements and takes O(n^2) time; the rewrite is O(n) time with O(1) auxiliary space beyond the required output. What you give up is nothing at all here — the prefixes were never needed, only their maxima. That is the common case: apparent space requirements often dissolve once you identify the single value that actually carries the state forward.',
      },
    ],

    quiz: [
      {
        id: 'DSA-002-q1',
        type: 'mcq',
        concept: 'auxiliary space',
        prompt: 'A function takes a list of n numbers and returns their maximum using a single variable. What is its auxiliary space complexity?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        answerIndex: 0,
        explanation:
          'The input is not counted as auxiliary space, and the algorithm allocates only one running variable regardless of n. That is constant auxiliary space.',
      },
      {
        id: 'DSA-002-q2',
        type: 'truefalse',
        concept: 'recursion stack',
        prompt: 'A recursive function that allocates no lists or dictionaries always uses O(1) space.',
        answer: false,
        explanation:
          'Each active call occupies a stack frame holding locals and a return address, so a recursion of depth d uses O(d) space. Recursing once per list element therefore costs O(n) space and risks RecursionError.',
      },
      {
        id: 'DSA-002-q3',
        type: 'match',
        concept: 'space of common algorithms',
        prompt: 'Match each algorithm to its auxiliary space complexity.',
        pairs: [
          { left: 'Merge sort', right: 'O(n) — the merge buffer' },
          { left: 'In-place quicksort (balanced)', right: 'O(log n) — the recursion stack' },
          { left: 'Iterative linear scan for a maximum', right: 'O(1) — one accumulator' },
          { left: 'Memoised Fibonacci', right: 'O(n) — one cache entry per subproblem' },
        ],
        explanation:
          'Space comes from three places only: allocated data structures, the recursion stack, and copies of the input. Naming which one an algorithm pays is the whole skill.',
      },
      {
        id: 'DSA-002-q4',
        type: 'code-output',
        language: 'python',
        concept: 'generators versus lists',
        prompt: 'Which statement about the two expressions is correct?',
        code: `a = sum([x * x for x in range(10_000_000)])
b = sum(x * x for x in range(10_000_000))`,
        options: [
          'They give the same result, but `a` holds ten million integers in memory at once and `b` does not',
          'They give different results because generators skip the last element',
          '`b` is O(n) space and `a` is O(1) space',
          '`b` raises a TypeError because sum needs a sequence',
        ],
        answerIndex: 0,
        explanation:
          'The square brackets build the full list before summing — O(n) space, hundreds of megabytes here. The generator expression yields one value at a time, so it is O(1) space for the same O(n) time and the same answer.',
      },
      {
        id: 'DSA-002-q5',
        type: 'fill',
        concept: 'in-place terminology',
        prompt: 'An algorithm that rearranges its input using only O(1) extra memory is described by which single hyphenated term?',
        answers: ['in-place', 'in place', 'inplace'],
        explanation:
          'In-place algorithms mutate the input rather than building a copy. The benefit is constant auxiliary space; the cost is that any other reference to that data sees the change.',
      },
      {
        id: 'DSA-002-q6',
        type: 'explain',
        concept: 'time-space trade-off',
        prompt: 'Describe one concrete time/space trade-off and explain how you would decide which side to take.',
        rubric: [
          'Names a specific trade, such as memoisation, precomputed embeddings, or gradient checkpointing',
          'States what is gained and what is paid, in complexity terms',
          'Gives a decision rule based on the size of n or the memory actually available',
        ],
        sampleAnswer:
          'Memoising a recursive function is the clearest case: storing one answer per distinct subproblem costs O(n) memory and collapses O(2^n) recomputation into O(n) time. I would take that trade whenever the number of distinct subproblems is small relative to available memory, which for a sequence problem over a few thousand items it always is. I would refuse it when the argument domain is unbounded — caching on arbitrary user strings in a long-running service grows without limit — and there I would either bound the cache size or restructure the computation so only the last few results need keeping, which is how an iterative Fibonacci reaches O(1) space.',
        explanation:
          'The marking point is that the answer names both sides of the trade in complexity terms and gives a rule for choosing, rather than asserting that caching is simply good.',
      },
    ],

    flashcards: [
      { front: 'Auxiliary space versus total space', back: 'Auxiliary excludes the input (and usually the required output); total includes everything. "O(1) space" nearly always means auxiliary.' },
      { front: 'Space cost of recursion depth d', back: 'O(d) for the call stack, one frame per active call — even if the function allocates nothing.' },
      { front: 'Merge sort space versus quicksort space', back: 'Merge sort O(n) for the merge buffer; in-place quicksort O(log n) for the stack when partitions are balanced.' },
      { front: 'What does memoisation trade?', back: 'O(number of distinct subproblems) memory in exchange for never recomputing a subproblem — often exponential time down to linear.' },
      { front: 'Why is `xs[1:]` expensive in recursion?', back: 'It copies the remaining elements, so slicing at each of n levels costs O(n^2) time and memory. Pass an index instead.' },
      { front: 'Cheapest memory win in Python?', back: 'Replace a list comprehension with a generator expression when the result is consumed once: O(n) space becomes O(1).' },
    ],

    challenge: {
      title: 'Three implementations, one measurement table',
      brief:
        'Implement "sum of the squares of the first n integers" three ways: a materialised list, a generator, and a closed-form formula. Measure both time and peak memory for each at n = 1,000,000 using `time.perf_counter` and `tracemalloc`, print a table, and write a short paragraph stating the time and space complexity of each and which you would ship, with a reason that mentions readability as well as cost.',
      language: 'python',
      acceptanceCriteria: [
        'All three implementations return the identical value',
        'Peak memory is measured with tracemalloc, not estimated',
        'The write-up states time and space complexity for each of the three',
        'The recommendation gives a reason beyond "it is fastest"',
      ],
      starterCode: 'import time, tracemalloc\n\ndef via_list(n):\n    return sum([i * i for i in range(n)])\n\n# add via_generator and via_formula, then measure all three\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who already understands Big-O for time what space complexity adds, and why they should care even though memory is cheap.',
      mustCover: [
        'Space complexity measures peak memory growth as a function of n, in the same asymptotic style as time',
        'Auxiliary space excludes the input, and the call stack counts towards it',
        'Time and space can be traded against each other deliberately',
        'Running out of memory kills a program, whereas being slow only delays it',
      ],
      bonusSignals: ['gives a concrete example such as memoisation or chunked reading', 'mentions that recursion depth is a memory cost', 'notes that in-place work mutates the caller\'s data'],
      sampleExplanation:
        'Space complexity asks the same question as time complexity, but about memory: if the input gets ten times bigger, how much more room does the algorithm need? We usually quote auxiliary space, which is everything the algorithm allocates beyond the input it was handed — buffers, sets, and, easy to forget, one stack frame per active recursive call. It matters more sharply than time because the failure is different in kind: a slow program eventually finishes, while a program that needs more memory than the machine has is simply killed. The interesting part is that the two resources are exchangeable. Cache the answers to repeated subproblems and you spend memory to erase work; stream your data through a generator instead of materialising a list and you spend an extra pass to reclaim gigabytes. Knowing you have that dial, and which way to turn it for the n you actually face, is the skill.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-003',
    domain: 'DSA',
    module: 'Linear Structures',
    topic: 'Contiguous storage and amortised growth',
    title: 'Arrays and Dynamic Arrays',
    slug: 'arrays-and-dynamic-arrays',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['DSA-001', 'DSA-002'],
    related: ['DSA-001', 'DSA-002'],
    tags: ['array', 'dynamic-array', 'list', 'amortised', 'cache-locality'],

    learningObjectives: [
      'Explain why indexing an array is O(1) by reference to the address arithmetic that makes it so',
      'Give the cost of append, insert, delete and search on a Python list and justify each',
      'Explain amortised O(1) append in terms of capacity doubling, and why the average stays constant despite occasional O(n) copies',
      'Choose between a Python list, a tuple, an array.array and a NumPy array for a given job',
    ],

    terminology: [
      {
        term: 'Array',
        definition:
          'A block of contiguous memory holding fixed-size slots, so the address of element i can be computed arithmetically instead of searched for.',
        simple: 'A row of identical boxes side by side, numbered from zero.',
      },
      {
        term: 'Random access',
        definition:
          'The ability to read or write any element in the same constant time, regardless of position. It is the defining property of an array.',
        simple: 'Jumping straight to box number 7 without walking past boxes 0 to 6.',
      },
      {
        term: 'Dynamic array',
        definition:
          'An array that grows by allocating a larger block and copying elements across when it fills. Python\'s `list`, C++\'s `vector` and Java\'s `ArrayList` are all dynamic arrays.',
        simple: 'A row of boxes that quietly moves to a bigger shelf when it runs out of room.',
      },
      {
        term: 'Capacity versus length',
        definition:
          'Length is how many elements are stored; capacity is how many slots are allocated. Appends are cheap while length < capacity.',
        simple: 'How full the shelf is, versus how many spaces the shelf has.',
      },
      {
        term: 'Amortised cost',
        definition:
          'The average cost per operation over a long sequence of operations, even if individual operations differ wildly. Append is amortised O(1) despite occasional O(n) resizes.',
        simple: 'The cost per item once you spread the occasional big bill over all the small ones.',
      },
    ],

    simpleExplanation:
      "An array is the simplest useful data structure: a run of equally sized slots laid end to end in memory. Because the slots are the same size and next to each other, the computer can work out exactly where element number 7 lives with one multiplication and one addition, so reaching any element costs the same tiny amount of time no matter how long the array is. That is why arrays underpin almost everything else. The catch is that a block of memory has a fixed size, and one day you want to add another item. A dynamic array — which is what a Python list really is — solves this by keeping a little spare room at the end. When the spare room runs out it asks for a bigger block, copies everything across and carries on. That copy is genuinely expensive, but it happens rarely and the new block is much bigger, so if you average the cost over all the appends you have done, each one still costs a constant amount. Inserting in the middle is a different story: everything after the insertion point has to shuffle along.",

    whyItExists:
      'Computers address memory by number, so a structure whose elements sit at predictable addresses can be reached by arithmetic rather than by searching. Dynamic arrays exist on top of that so programmers get constant-time indexing without having to know the final size of their data in advance.',

    analogy: {
      scenario:
        "Think of a long shelf of identically sized pigeonholes numbered from zero, bolted to the wall at a known starting point. To reach pigeonhole 7 you do not walk along counting — you know each hole is 20 cm wide, so you stride to 140 cm from the left edge and reach straight in. When the shelf fills up, the caretaker does not extend it; he bolts up a shelf twice as long elsewhere, carries everything across, and unbolts the old one. That move is a real afternoon of work, but because the new shelf is twice the size it happens half as often each time, so across a whole year of filing the average effort per document stays small.",
      mapping: [
        { from: 'Pigeonhole width times the hole number, from the shelf start', to: 'Address arithmetic: base + i * itemsize, giving O(1) indexing' },
        { from: 'The shelf being one fixed run on the wall', to: 'Contiguous memory allocation' },
        { from: 'Bolting up a shelf twice as long and carrying everything across', to: 'Reallocation with a growth factor, costing O(n) for that one append' },
        { from: 'Empty holes at the right-hand end', to: 'Spare capacity beyond the current length' },
        { from: 'Squeezing a document into hole 3 and shifting everything right', to: 'list.insert(3, x): O(n) because the tail must move' },
      ],
      bridge:
        'The shelf makes the central trade visible. Constant-time access is bought by demanding one unbroken run of memory, and that same demand is exactly what makes growing expensive and inserting in the middle expensive. Every property of an array, good and bad, follows from the elements being adjacent and equally sized.',
      limitations:
        'A Python list is not quite this shelf: it stores pointers to objects rather than the objects themselves, so the pigeonholes all hold addresses of documents kept elsewhere. That is why a Python list can mix types, and why a NumPy array — which really does store the values inline — is both smaller and far faster for numerical work.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Index arithmetic in action',
        caption: 'Change the index and watch the address calculation that makes access O(1).',
        widget: 'array-indexing',
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a dynamic array',
        subject: '[ 10 | 20 | 30 | 40 | _ | _ | _ | _ ]   len = 4, capacity = 8',
        annotations: [
          { part: 'base address', note: 'Where the block starts. Element i lives at base + i * itemsize.' },
          { part: 'len = 4', note: 'The number of elements actually stored. This is what `len()` reports.' },
          { part: 'capacity = 8', note: 'Slots allocated. Appends are O(1) until len reaches capacity.' },
          { part: 'the empty slots', note: 'Deliberate slack. Without it, every append would need a full copy.' },
          { part: 'overflow', note: 'When len == capacity, allocate a larger block, copy all n elements, free the old block: O(n) for that append only.' },
        ],
      },
      {
        kind: 'table',
        title: 'Cost of every list operation you will actually use',
        caption: 'n is the current length. These are the numbers to quote in an interview.',
        columns: ['Operation', 'Complexity', 'Why'],
        rows: [
          ['`xs[i]` read or write', 'O(1)', 'One multiplication and one addition to find the address'],
          ['`xs.append(x)`', 'O(1) amortised', 'Constant while spare capacity lasts; O(n) on the rare resize'],
          ['`xs.pop()` from the end', 'O(1)', 'Just decrement the length; nothing moves'],
          ['`xs.pop(0)` or `xs.insert(0, x)`', 'O(n)', 'Every remaining element shifts by one slot'],
          ['`x in xs`', 'O(n)', 'A linear scan — no ordering information is available'],
          ['`xs[a:b]`', 'O(b - a)', 'Allocates and fills a new list'],
          ['`len(xs)`', 'O(1)', 'The length is stored, not counted'],
          ['`xs.sort()`', 'O(n log n)', 'Timsort, in place'],
        ],
      },
    ],

    formalDefinition:
      'An array is a contiguous allocation of n equally sized cells supporting access to cell i in constant time via the address computation base + i * itemsize. A dynamic array augments this with a capacity c >= n and a growth policy: when an append finds n == c, it allocates a block of size f * c for some growth factor f > 1, copies the n existing elements, and releases the old block. Any growth factor strictly greater than 1 yields amortised O(1) append.',

    math: {
      intuition:
        'The reason doubling works is that the expensive copies get rarer exactly as fast as they get more expensive. Copying 512 elements is eight times the work of copying 64, but it happens one eighth as often. Sum the copies over n appends and the total is a constant multiple of n, so the average per append is constant. Growing by a fixed number of slots instead of a fixed factor destroys this: then the copies get more expensive without getting rarer, and appending n items costs O(n^2).',
      formulas: [
        {
          latex: '\\text{address}(i) = \\text{base} + i \\times \\text{itemsize}',
          name: 'Array address arithmetic',
          meaning: 'Any element is reachable with one multiply and one add, which is what makes indexing O(1).',
          category: 'complexity',
          variables: [
            { symbol: '\\text{base}', meaning: 'Memory address of element 0' },
            { symbol: 'i', meaning: 'The zero-based index' },
            { symbol: '\\text{itemsize}', meaning: 'Bytes per slot — 8 for a pointer on a 64-bit build, 4 for a float32 in NumPy' },
          ],
        },
        {
          latex: '\\sum_{k=0}^{\\log_2 n} 2^k = 2^{\\log_2 n + 1} - 1 = 2n - 1 < 2n',
          name: 'Total copy work under doubling',
          meaning: 'All resizes together move fewer than 2n elements, so n appends cost O(n) in total.',
          category: 'complexity',
          variables: [
            { symbol: '2^k', meaning: 'Elements copied at the k-th resize, when capacity goes from 2^k to 2^(k+1)' },
            { symbol: '\\log_2 n', meaning: 'How many resizes occur while growing to n elements' },
            { symbol: '2n', meaning: 'The upper bound on total copy work — a constant multiple of n' },
          ],
        },
        {
          latex: 'C_{\\text{amortised}} = \\frac{n \\cdot O(1) + 2n}{n} = O(1)',
          name: 'Amortised cost of append',
          meaning: 'Total work across n appends divided by n is constant, even though one individual append can cost O(n).',
          category: 'complexity',
          variables: [
            { symbol: 'n \\cdot O(1)', meaning: 'The cheap part: writing each element into its slot' },
            { symbol: '2n', meaning: 'The total copying across all resizes, from the sum above' },
            { symbol: 'C_{\\text{amortised}}', meaning: 'Average cost per append over the whole sequence' },
          ],
        },
      ],
      derivation: [
        'Start with capacity 1 and append n items, doubling capacity whenever it fills.',
        'Resizes occur at lengths 1, 2, 4, 8, ..., up to the largest power of two below n.',
        'The resize at capacity 2^k copies 2^k elements.',
        'Total copied = 1 + 2 + 4 + ... + 2^(log2 n) = 2n - 1, a geometric series.',
        'Add the n constant-time writes: total work is at most 3n, so the average per append is at most 3 — a constant.',
        'Contrast a fixed increment of 100: resizes happen at 100, 200, 300, ..., copying 100 + 200 + ... + n = O(n^2) in total.',
      ],
    },

    workedExample: {
      title: 'Watching capacity grow across nine appends',
      setup:
        'Append the values 1 through 9 to an empty dynamic array that starts with capacity 1 and doubles when full. Track length, capacity, and elements copied at each step.',
      steps: [
        { label: 'append 1', detail: 'len 0 == cap 0, so allocate capacity 1 and copy 0 elements. Store. len = 1, cap = 1. Copies so far: 0.' },
        { label: 'append 2', detail: 'len 1 == cap 1: allocate capacity 2, copy 1 element. Store. len = 2, cap = 2. Copies: 1.' },
        { label: 'append 3', detail: 'len 2 == cap 2: allocate capacity 4, copy 2 elements. Store. len = 3, cap = 4. Copies: 3.' },
        { label: 'append 4', detail: 'Spare capacity exists. Store directly — O(1). len = 4, cap = 4. Copies: 3.' },
        { label: 'append 5', detail: 'len 4 == cap 4: allocate capacity 8, copy 4 elements. Store. len = 5, cap = 8. Copies: 7.' },
        { label: 'appends 6, 7, 8', detail: 'Three cheap O(1) stores; no resize. len = 8, cap = 8. Copies still 7.' },
        { label: 'append 9', detail: 'len 8 == cap 8: allocate capacity 16, copy 8 elements. Store. len = 9, cap = 16. Copies: 15.' },
        { label: 'Tally', detail: '15 elements copied across 9 appends, under the bound 2n = 18. Only 4 of the 9 appends resized at all.', latex: '1 + 2 + 4 + 8 = 15 < 2 \\cdot 9' },
        { label: 'Extrapolate', detail: 'At n = 1,000,000 there are about 20 resizes, copying fewer than 2,000,000 elements in total — an average of under two copies per append.' },
      ],
      conclusion:
        'Append is O(1) amortised and O(n) in the worst individual case; the worst case is unavoidable but occurs on only about log2(n) of the n appends. Space is O(n) with a constant factor between 1 and 2 depending on where in the growth cycle you stop — a list of a million items may hold capacity for up to two million. CPython actually over-allocates by roughly 12.5 per cent rather than doubling, which trims that memory overhead while keeping the geometric growth that guarantees the amortised bound.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Seeing CPython over-allocate',
        runnable: true,
        code: `import sys

xs = []
last = sys.getsizeof(xs)
print(f"len=0 bytes={last}")

for i in range(1, 20):
    xs.append(i)
    size = sys.getsizeof(xs)
    if size != last:                 # only print when the block actually grew
        print(f"len={len(xs):3d} bytes={size}  <-- reallocated")
        last = size`,
        output: `len=0 bytes=56
len=  1 bytes=88  <-- reallocated
len=  5 bytes=120  <-- reallocated
len=  9 bytes=184  <-- reallocated
len= 17 bytes=248  <-- reallocated`,
        explanation:
          'Reallocation happens at lengths 1, 5, 9, 17 — four times in nineteen appends, with the gaps growing geometrically. Between those points appends are pure O(1) writes into pre-allocated slots. The exact byte figures vary by CPython version and platform, but the pattern of increasingly rare, increasingly large jumps is the signature of geometric growth and is what makes the amortised bound hold.',
      },
      {
        language: 'python',
        title: 'The O(n) operation hiding in plain sight',
        runnable: true,
        code: `import time
from collections import deque

n = 100_000

xs = list(range(n))
start = time.perf_counter()
while xs:
    xs.pop(0)                 # O(n) each: every element shifts left
print(f"list.pop(0)   {time.perf_counter() - start:.3f}s")

dq = deque(range(n))
start = time.perf_counter()
while dq:
    dq.popleft()              # O(1) each
print(f"deque.popleft {time.perf_counter() - start:.3f}s")`,
        output: `list.pop(0)   0.9142s
deque.popleft 0.0061s`,
        explanation:
          'Removing from the front of a list forces all n-1 remaining elements to shift one slot left, so draining the list is O(n^2) overall. A deque is implemented as a doubly linked list of blocks and can remove from either end in O(1). Whenever you find yourself writing `pop(0)` or `insert(0, x)` in a loop, that is the signal to reach for `collections.deque`.',
      },
      {
        language: 'python',
        title: 'Four array-shaped options, and when each wins',
        runnable: true,
        code: `import array, sys
import numpy as np

n = 100_000
py_list = list(range(n))          # pointers to int objects; any types allowed
py_tuple = tuple(range(n))        # same layout, immutable, slightly smaller
typed = array.array("i", range(n))  # 4-byte ints stored inline, stdlib
np_arr = np.arange(n, dtype=np.int32)

for name, obj in [("list", py_list), ("tuple", py_tuple),
                  ("array.array", typed), ("numpy", np_arr)]:
    size = sys.getsizeof(obj)
    print(f"{name:12} {size/1024:8.1f} KB")

print("vectorised sum:", np_arr.sum())`,
        output: `list            781.3 KB
tuple           781.3 KB
array.array     391.3 KB
numpy           391.4 KB

vectorised sum: 4999950000`,
        explanation:
          'A Python list of a million integers stores a million 8-byte pointers plus the integer objects themselves, which is why it is roughly twice the size of a typed array before you even count the objects. Reach for a list when you need mixed types or frequent appends, a tuple when the sequence is fixed and hashable, `array.array` for compact homogeneous storage without a dependency, and NumPy whenever you will do arithmetic — its contiguous layout makes both memory and cache behaviour dramatically better.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature matrices in scikit-learn',
        usage:
          'Every estimator expects an array-like of shape (n_samples, n_features) backed by contiguous memory, because the underlying BLAS routines rely on address arithmetic and cache locality to run at hardware speed.',
      },
      {
        context: 'Building a training log row by row',
        usage:
          'Appending per-epoch metrics to a list is amortised O(1) and is the correct pattern; the common mistake is to build a DataFrame by concatenating a new row each epoch, which copies the whole frame every time and is O(n^2).',
      },
      {
        context: 'Token id sequences in NLP',
        usage:
          'A tokenised document is an array of integer ids, and models index into embedding tables by those ids. The whole pipeline depends on O(1) random access by position.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'The array idea taken seriously: fixed dtype, inline storage, strides, and vectorised operations over contiguous memory.' },
      { tool: 'collections.deque', role: 'The structure to use when you need O(1) insertion or removal at the front as well as the back.' },
      { tool: 'pandas', role: 'A DataFrame column is an array; `pd.concat` in a loop is the classic accidental O(n^2), fixed by collecting rows in a list and concatenating once.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `list.pop(0)` or `list.insert(0, x)` inside a loop',
        why: 'Both shift every subsequent element, so each call is O(n) and the loop becomes O(n^2). On 100,000 items that is the difference between milliseconds and a minute.',
        fix: 'Use `collections.deque` for queue-like access, or iterate in reverse, or build the result in append order and reverse once at the end.',
      },
      {
        mistake: 'Growing a list with `xs = xs + [item]` in a loop',
        why: 'The `+` operator builds a brand-new list each iteration, copying all existing elements, giving O(n^2) time and needless garbage. `append` mutates in place and is amortised O(1).',
        fix: 'Use `xs.append(item)`, or a list comprehension, or `xs.extend(other)` when adding many items at once.',
      },
      {
        mistake: 'Believing every append is O(1)',
        why: 'The bound is amortised, not worst case: the append that triggers a resize genuinely copies n elements. In a latency-sensitive loop that occasional spike is real and measurable.',
        fix: 'Say "amortised O(1)" when it matters, and pre-size with `[None] * n` when you know the final length and need predictable per-operation latency.',
      },
      {
        mistake: 'Creating a 2D grid with `[[0] * cols] * rows`',
        why: 'The outer multiplication copies the same inner list reference `rows` times, so writing `grid[0][0] = 1` appears to change every row.',
        fix: 'Use a comprehension: `[[0] * cols for _ in range(rows)]`, which evaluates the inner list afresh for each row.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is indexing an array O(1) but indexing a linked list O(n)?',
        answer:
          'Array elements occupy equally sized cells in one contiguous block, so the address of element i is base + i * itemsize — a multiply and an add, independent of i and of n. A linked list scatters its nodes anywhere in memory and connects them by pointers, so the only way to reach node i is to start at the head and follow i links. The difference is not about cleverness but about layout: contiguity buys arithmetic addressing, and pointer structures give it up in exchange for cheap insertion.',
        followUp:
          'Mentioning cache lines strengthens this: sequential array traversal loads several elements per cache miss, while pointer chasing usually pays a miss per node.',
      },
      {
        level: 'intermediate',
        question: 'Explain amortised O(1) append. Why does a fixed-size growth increment not achieve it?',
        answer:
          'With a geometric growth factor, the copy at capacity c moves c elements but the next copy does not happen until capacity has grown by a factor f, so copies become rarer exactly as fast as they become more expensive. Summing the geometric series 1 + 2 + 4 + ... gives fewer than 2n total element moves across n appends, so the average per append is constant even though individual appends can be O(n). With a fixed increment of k slots, resizes happen every k appends and the i-th copy moves i*k elements, so the total is k + 2k + 3k + ... = O(n^2 / k) — still quadratic in n, so appending n items costs O(n^2) however large k is.',
        followUp:
          'A strong answer distinguishes amortised from average-case: amortised is a worst-case guarantee over a sequence, with no probability involved.',
      },
      {
        level: 'ml-engineer',
        question: 'Why does a NumPy array of a million floats outperform a Python list of the same values by far more than the complexity suggests?',
        answer:
          'Both are O(n) to traverse, so the difference is entirely constant factor and memory layout. A Python list stores pointers to boxed float objects scattered on the heap, so summing it costs a pointer dereference, a type check and an unboxing per element, and almost every element is a fresh cache miss. A NumPy array stores raw 8-byte doubles contiguously, so a cache line brings eight values at once, no boxing occurs, and the loop runs in compiled C that the CPU can vectorise with SIMD instructions. Together that is routinely a 50 to 100 times speedup at identical asymptotic complexity, which is the practical lesson that Big-O tells you when to worry but not always where the time goes.',
        followUp:
          'Naming `dtype` and C-contiguous layout, and noting that a NumPy array of dtype=object throws all of this away, shows real depth.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Give the complexity of each and briefly justify:\n(a) `xs[len(xs) // 2]`\n(b) `xs.insert(len(xs) // 2, 9)`\n(c) `xs.append(9)`\n(d) `9 in xs`',
        hint: 'Ask in each case: does anything have to move, and does anything have to be searched?',
        solution:
          '(a) O(1): position is irrelevant, the address is computed directly.\n(b) O(n): the second half of the list shifts one slot right, which is n/2 moves — constant factor aside, linear.\n(c) O(1) amortised: constant while capacity lasts, O(n) on the occasional resize.\n(d) O(n): with no ordering information available, membership requires a linear scan; use a set if you do this repeatedly.\n\nThe pattern worth internalising: reads by index are free, changes at the end are cheap, changes anywhere else are linear.',
      },
      {
        prompt: 'A colleague builds a list of 200,000 results with `results = results + [row]` inside a loop and it takes 40 seconds. Explain why, and fix it.',
        hint: 'What does `+` do that `append` does not?',
        solution:
          '`results + [row]` allocates a new list and copies every element already collected, so iteration i copies i elements: 1 + 2 + ... + 200,000 is about 2 * 10^10 element copies, which is O(n^2). `results.append(row)` mutates the existing list in place at amortised O(1), making the loop O(n) overall and finishing in well under a second. The same trap appears as `df = pd.concat([df, new_row])` in a loop; the fix there is identical — collect into a list and concatenate once at the end.',
      },
      {
        prompt: 'Implement a fixed-capacity ring buffer over a pre-allocated list that supports push and pop in O(1) with no resizing. What does it give up?',
        hint: 'Keep two indices modulo the capacity rather than moving elements.',
        solution:
          'class Ring:\n    def __init__(self, cap):\n        self.buf = [None] * cap\n        self.head = self.size = 0\n        self.cap = cap\n    def push(self, x):\n        if self.size == self.cap:\n            raise IndexError("full")\n        self.buf[(self.head + self.size) % self.cap] = x\n        self.size += 1\n    def pop(self):\n        if not self.size:\n            raise IndexError("empty")\n        x = self.buf[self.head]\n        self.head = (self.head + 1) % self.cap\n        self.size -= 1\n        return x\n\nBoth operations are O(1) worst case, not merely amortised, and memory is fixed at O(cap) with no reallocation spikes — which is why ring buffers are standard in audio, networking and streaming-metrics code. What you give up is unbounded growth: the buffer must reject or overwrite when full, and you must choose which.',
      },
    ],

    quiz: [
      {
        id: 'DSA-003-q1',
        type: 'mcq',
        concept: 'why indexing is constant time',
        prompt: 'What makes `xs[500_000]` take the same time as `xs[0]` on a Python list?',
        options: [
          'The address is computed as base + i * itemsize, which is one multiply and one add regardless of i',
          'Python caches every index it has previously accessed',
          'The list is kept sorted so binary search finds the index quickly',
          'The interpreter scans forward but does so very quickly in C',
        ],
        answerIndex: 0,
        explanation:
          'Contiguous equally sized slots mean the location of any element is arithmetic, not search. This is the defining property of an array, and it is exactly what a linked list gives up.',
      },
      {
        id: 'DSA-003-q2',
        type: 'truefalse',
        concept: 'amortised analysis',
        prompt: 'Because `list.append` is amortised O(1), no individual call to append can ever take O(n) time.',
        answer: false,
        explanation:
          'Amortised means the average over a sequence is constant, not that every call is. The append that triggers a resize copies all n existing elements and genuinely costs O(n); it just happens rarely enough that the average stays constant.',
      },
      {
        id: 'DSA-003-q3',
        type: 'numeric',
        concept: 'total copy work under doubling',
        prompt: 'Starting from capacity 1 and doubling on overflow, how many elements are copied in total while appending 9 items?',
        answer: 15,
        explanation:
          'Resizes occur at lengths 1, 2, 4 and 8, copying 1 + 2 + 4 + 8 = 15 elements — comfortably under the 2n = 18 bound that guarantees amortised O(1).',
      },
      {
        id: 'DSA-003-q4',
        type: 'debug',
        language: 'python',
        concept: 'shared inner references',
        prompt: 'Setting `grid[0][0] = 1` changes the first element of every row. What is wrong?',
        code: `grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)   # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]`,
        options: [
          'The outer `* 3` repeats the same inner list reference three times, so all rows are one object',
          '`[0] * 3` creates a tuple, which cannot be indexed independently',
          'Assignment to `grid[0][0]` is not supported on nested lists',
          'The grid needs to be created with `range` instead of multiplication',
        ],
        answerIndex: 0,
        explanation:
          'List multiplication copies references, not objects. Use `[[0] * 3 for _ in range(3)]` so the inner list expression is evaluated once per row and each row is a distinct object.',
      },
      {
        id: 'DSA-003-q5',
        type: 'match',
        concept: 'operation costs',
        prompt: 'Match each list operation to its complexity.',
        pairs: [
          { left: 'xs[i]', right: 'O(1)' },
          { left: 'xs.append(x)', right: 'O(1) amortised' },
          { left: 'xs.insert(0, x)', right: 'O(n)' },
          { left: 'xs.sort()', right: 'O(n log n)' },
        ],
        explanation:
          'Indexing is arithmetic, appending is amortised by geometric growth, anything that shifts the tail is linear, and comparison sorting cannot beat n log n.',
      },
      {
        id: 'DSA-003-q6',
        type: 'multi',
        concept: 'choosing a structure',
        prompt: 'You will repeatedly remove items from the front of a 500,000-element sequence. Which choices are sensible? Select all that apply.',
        options: [
          'Use `collections.deque` and `popleft`',
          'Use a list and `pop(0)`',
          'Reverse the list once and use `pop()` from the end',
          'Use a list and `del xs[0]`',
        ],
        answerIndices: [0, 2],
        explanation:
          'A deque removes from either end in O(1). Reversing once costs O(n) and then every `pop()` from the end is O(1), which is a perfectly good trick when order can be handled. Both `pop(0)` and `del xs[0]` shift the remaining elements and are O(n) per call.',
      },
    ],

    flashcards: [
      { front: 'Why is array indexing O(1)?', back: 'Contiguous equally sized cells mean address(i) = base + i * itemsize — arithmetic, not search.' },
      { front: 'Cost of `list.append`?', back: 'O(1) amortised. Individual appends that trigger a resize copy all n elements and cost O(n).' },
      { front: 'Why does doubling give amortised O(1)?', back: 'Copies double in cost but halve in frequency; the geometric series totals under 2n moves for n appends.' },
      { front: 'Cost of `list.pop(0)`?', back: 'O(n) — every later element shifts one slot left. Use `collections.deque.popleft()` for O(1).' },
      { front: 'list versus NumPy array for a million floats', back: 'Same O(n) traversal, but NumPy stores raw values contiguously with no boxing, giving far better memory use and cache behaviour.' },
      { front: 'What is wrong with `[[0] * 3] * 3`?', back: 'All three rows are the same list object. Use `[[0] * 3 for _ in range(3)]`.' },
    ],

    challenge: {
      title: 'Build a dynamic array and prove the amortised bound',
      brief:
        'Implement a DynamicArray class over a fixed-size backing store (use `[None] * capacity`) supporting append, get, set and len. Start at capacity 1 and double on overflow, counting every element copy. Append 100,000 items, then report total copies, copies divided by n, and the number of resizes. Repeat with a growth policy that adds 100 slots instead of doubling and compare both numbers, explaining the difference in complexity terms.',
      language: 'python',
      acceptanceCriteria: [
        'Indexing is implemented by direct slot access, not by scanning',
        'Appending resizes only when length equals capacity, and copies are counted',
        'The doubling run reports total copies below 2n',
        'The fixed-increment run is shown to be O(n^2) with numbers, not just asserted',
      ],
      starterCode: 'class DynamicArray:\n    def __init__(self):\n        self._store = [None]\n        self._len = 0\n        self.copies = 0\n\n    def __len__(self):\n        return self._len\n\n    # implement append, __getitem__, __setitem__ and _resize\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who has used Python lists for months, but never wondered how they work, why indexing is instant, why appending is usually instant, and why inserting at the front is not.',
      mustCover: [
        'Elements sit in one contiguous block of equally sized slots, so the address of element i is computed arithmetically',
        'A list keeps spare capacity, so most appends just fill a waiting slot',
        'When capacity runs out the whole thing is copied to a bigger block — expensive but rare, giving amortised O(1)',
        'Inserting or removing at the front shifts every later element, which is O(n)',
      ],
      bonusSignals: ['mentions the geometric series that bounds total copying', 'names deque as the fix for front operations', 'notes that a Python list stores pointers rather than values'],
      sampleExplanation:
        'A list is one unbroken run of equally sized slots in memory. Because the slots are identical and adjacent, the computer works out where element 7 lives by multiplying 7 by the slot size and adding the start address, so reaching any element costs the same whether the list holds ten items or ten million. Appending is nearly as cheap because the list deliberately keeps a few empty slots at the end; most appends simply fill one. Occasionally the spare room runs out, and then the list allocates a much bigger block and copies everything across — that single append really is expensive, but because each new block is a multiple of the old one, those copies get rarer as fast as they get bigger, so the average cost per append stays constant. Inserting at the front is different in kind: there is no spare room at the left, so every existing element must shuffle one slot to the right, and that is unavoidably work proportional to the length. If you need to add and remove at the front, a deque is the structure designed for it.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
