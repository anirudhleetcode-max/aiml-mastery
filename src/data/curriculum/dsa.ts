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

  {
    id: 'DSA-004',
    domain: 'DSA',
    module: 'Linear Structures',
    topic: 'Immutable sequences of characters',
    title: 'Strings as Data Structures',
    slug: 'strings-as-data-structures',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['DSA-003'],
    related: ['DSA-001', 'DSA-003'],
    tags: ['strings', 'immutability', 'join', 'anagram', 'text-processing'],

    learningObjectives: [
      'Explain what immutability costs and buys when a string is modified in a loop',
      'Give the complexity of indexing, slicing, concatenating, joining and searching a string',
      'Apply the standard string interview patterns: frequency counting, two pointers and sliding window',
      'Distinguish characters, code points and bytes well enough to avoid encoding bugs in a text pipeline',
    ],

    terminology: [
      {
        term: 'Immutability',
        definition:
          'A string object can never be modified after creation. Every operation that appears to change one — upper(), replace(), += — actually builds a new string.',
        simple: 'Once the word is printed, you cannot edit it; you can only print a new one.',
      },
      {
        term: 'Interning',
        definition:
          'CPython stores one shared copy of certain short, identifier-like strings so equal literals can be the same object, which makes equality checks fast in the common case.',
        simple: 'Keeping a single master copy of common words instead of many duplicates.',
      },
      {
        term: 'Code point',
        definition:
          'An integer that Unicode assigns to a character. A Python `str` is a sequence of code points; indexing gives you one code point, not one byte.',
        simple: 'The official number for a letter or symbol, agreed worldwide.',
      },
      {
        term: 'Encoding',
        definition:
          'The rule mapping code points to bytes for storage or transmission. UTF-8 uses one byte for ASCII and up to four for other characters, so len(str) and len(bytes) differ.',
        simple: 'How the numbers for letters get written down as actual computer bytes.',
      },
      {
        term: 'String builder pattern',
        definition:
          'Collecting pieces in a list and calling "".join(pieces) once, so total work is O(total length) rather than the O(n^2) of repeated concatenation.',
        simple: 'Gather all the scraps first, then glue them together in one go.',
      },
    ],

    simpleExplanation:
      "A string is an array whose slots hold characters, so most of what you know about arrays carries straight over: reaching the fifth character is instant, scanning for a substring means looking at the characters one by one. The one big difference is that strings in Python cannot be changed once they exist. If you write name = name + \"!\", Python does not add an exclamation mark to the existing string; it builds an entirely new string containing everything from the old one plus the new character, and points the name at that. For a single line of code nobody notices. Inside a loop that runs ten thousand times it is a disaster, because you copy the whole growing string on every pass. The fix is always the same: collect the pieces in a list, which can genuinely be appended to cheaply, and glue them together once at the end with join. Immutability is not an oversight — it is what lets strings be dictionary keys and be shared safely — but it does mean building text has to be done deliberately.",

    whyItExists:
      'Text is the dominant form of human data, and it needs a representation that is safe to share, hashable so it can key a dictionary, and cheap to index. Immutability delivers all three, at the price of making in-place editing impossible and making naive concatenation quadratic.',

    analogy: {
      scenario:
        "Think of a string as a line of type set in metal for an old printing press. Once the line is locked into its frame, you cannot slide an extra letter in — the whole point is that it is fixed, so several pages can safely reuse the same line without one page's edit corrupting another's. To produce a longer line you set a new one from scratch. A printer who needed a hundred-word paragraph would never re-set the entire line a hundred times, once per word; he would gather the words in a tray and set the whole paragraph in a single pass.",
      mapping: [
        { from: 'The locked line of metal type', to: 'An immutable string object' },
        { from: 'Several pages safely reusing one line', to: 'Strings being shareable, hashable and usable as dict keys' },
        { from: 'Re-setting the whole line to add a word', to: '`s = s + word`, which copies all existing characters: O(len(s))' },
        { from: 'Gathering words in a tray, then setting once', to: 'Appending to a list and calling `"".join(parts)`: O(total length)' },
        { from: 'Counting letters in a line without touching it', to: 'Read-only operations such as indexing, slicing and counting' },
      ],
      bridge:
        'The tray is the whole lesson. Because each individual concatenation copies everything accumulated so far, doing it n times costs 1 + 2 + ... + n = O(n^2) character copies, while collecting into a list costs O(1) amortised per piece and one final O(total) pass. That is the same geometric-growth argument that made list append cheap in the previous unit, applied to text.',
      limitations:
        'CPython contains an optimisation that sometimes resizes a string in place when it has exactly one reference, so a naive `s += x` loop occasionally appears fast. It is an implementation detail that vanishes the moment a second reference exists, and it does not exist in PyPy or Jython, so never rely on it.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'A string is an indexable sequence',
        caption: 'Index and slice a short string and watch the positions, including negative indices.',
        widget: 'array-indexing',
        props: { sequence: ['m', 'a', 'c', 'h', 'i', 'n', 'e'] },
      },
      {
        kind: 'table',
        title: 'What each string operation costs',
        caption: 'n is the string length, k the slice or pattern length.',
        columns: ['Operation', 'Complexity', 'Note'],
        rows: [
          ['`s[i]`', 'O(1)', 'Direct indexing into the code-point array'],
          ['`s[a:b]`', 'O(b - a)', 'Allocates and copies a new string'],
          ['`len(s)`', 'O(1)', 'Stored on the object'],
          ['`s + t`', 'O(len(s) + len(t))', 'Both are copied into a fresh object'],
          ['`"".join(parts)`', 'O(total length)', 'One allocation, one pass — the correct way to build text'],
          ['`sub in s`', 'O(n * k) worst case', 'CPython uses a mix of Crochemore-Perrin and Boyer-Moore, near O(n) in practice'],
          ['`s.replace(a, b)`', 'O(n)', 'Builds a new string; the original is untouched'],
          ['`sorted(s)`', 'O(n log n)', 'Returns a list of characters, not a string'],
        ],
      },
      {
        kind: 'compare',
        title: 'Building a 100,000-word document',
        caption: 'Identical output, quadratically different cost.',
        left: {
          heading: 'Concatenation in a loop',
          points: [
            '`out = out + word` on each iteration',
            'Copies every character accumulated so far, every time',
            'O(n^2) total character copies',
            'Creates and discards n intermediate string objects',
          ],
        },
        right: {
          heading: 'Collect and join',
          points: [
            '`parts.append(word)` then `"".join(parts)`',
            'Each append is amortised O(1)',
            'O(total length) overall, one final allocation',
            'Reads better, and is what every style guide recommends',
          ],
        },
      },
    ],

    formalDefinition:
      'A Python `str` is an immutable sequence of Unicode code points with O(1) indexed access and a cached hash, so it can serve as a dictionary key. Every operation that changes content returns a new object; the original is never modified. Encoding to `bytes` maps each code point to one or more bytes under a chosen codec, so the byte length is generally not equal to the code-point length.',

    math: {
      intuition:
        'Repeated concatenation and list-building differ by exactly the same argument that separates fixed-increment growth from geometric growth in a dynamic array. Each concatenation copies everything already accumulated, so the copies grow linearly and their sum is quadratic; each list append copies nothing, and only the final join touches every character once.',
      formulas: [
        {
          latex: '\\sum_{i=1}^{n} i \\cdot k = k \\cdot \\frac{n(n+1)}{2} = O(n^2 k)',
          name: 'Cost of n concatenations of k-character pieces',
          meaning: 'The i-th concatenation copies the i*k characters gathered so far, so the total is quadratic in the number of pieces.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of pieces concatenated' },
            { symbol: 'k', meaning: 'Average characters per piece' },
            { symbol: 'i \\cdot k', meaning: 'Characters already accumulated before the i-th concatenation' },
          ],
        },
        {
          latex: 'T_{\\text{join}}(n, k) = O(nk)',
          name: 'Cost of the join pattern',
          meaning: 'Appending n pieces is O(n) total and the single join pass copies each of the nk characters exactly once.',
          category: 'complexity',
          variables: [
            { symbol: 'nk', meaning: 'Total characters in the final string' },
            { symbol: 'T_{\\text{join}}', meaning: 'Total time, linear in output size — the best any builder can do' },
          ],
        },
      ],
      derivation: [
        'Let each piece have k characters and let there be n pieces.',
        'Before concatenation i, the accumulated string holds (i-1)k characters.',
        'Building the new string copies (i-1)k + k = ik characters.',
        'Summing over i = 1..n gives k(1 + 2 + ... + n) = k n(n+1)/2.',
        'Discarding constants, that is O(n^2 k) — quadratic in the number of pieces.',
        'The join pattern instead performs n amortised-O(1) appends plus one pass over nk characters: O(nk).',
      ],
    },

    workedExample: {
      title: 'Anagram check by frequency counting, traced',
      setup:
        'Decide whether "listen" and "silent" are anagrams using a single dictionary of character counts: add one for every character of the first word, subtract one for every character of the second, then check that every count is zero. Both words have n = 6 characters.',
      steps: [
        { label: 'Length guard', detail: 'len("listen") == len("silent") == 6. If the lengths differed we could return False immediately in O(1).' },
        { label: 'Count "listen"', detail: 'After the first pass the table is {l: 1, i: 1, s: 1, t: 1, e: 1, n: 1}. Six dictionary updates, each O(1) average.' },
        { label: 'Subtract s', detail: 'counts[s] goes 1 -> 0.' },
        { label: 'Subtract i', detail: 'counts[i] goes 1 -> 0.' },
        { label: 'Subtract l', detail: 'counts[l] goes 1 -> 0.' },
        { label: 'Subtract e', detail: 'counts[e] goes 1 -> 0.' },
        { label: 'Subtract n', detail: 'counts[n] goes 1 -> 0.' },
        { label: 'Subtract t', detail: 'counts[t] goes 1 -> 0. The table is now all zeros.' },
        { label: 'Verdict', detail: 'Every value is zero, so the two words use exactly the same multiset of characters: they are anagrams.' },
        { label: 'Counter-case', detail: 'For "listen" against "listed", the d key would end at -1 and the n key at +1, so the check fails on the first non-zero entry.' },
      ],
      conclusion:
        'Time complexity is O(n): two passes of n constant-time dictionary operations, plus a final scan of at most n distinct keys. Space complexity is O(min(n, a)) where a is the alphabet size, since the table never holds more entries than there are distinct characters — O(1) if the alphabet is fixed at 26 letters. The obvious alternative, sorted(a) == sorted(b), is correct and one line long but costs O(n log n) time and O(n) space, so counting wins asymptotically while sorting wins on readability for short inputs.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Concatenation versus join, measured',
        runnable: true,
        code: `import time

words = [f"token{i}" for i in range(50_000)]

start = time.perf_counter()
out = ""
for w in words:
    out = out + w + " "          # copies everything accumulated, every time
concat = time.perf_counter() - start

start = time.perf_counter()
out2 = " ".join(words) + " "     # one pass over the final character count
join = time.perf_counter() - start

print(out == out2)
print(f"concatenation {concat:.4f}s   join {join:.4f}s")`,
        output: `True
concatenation 0.3918s   join 0.0021s`,
        explanation:
          'Note that `out = out + w + " "` defeats the CPython in-place-resize optimisation because the intermediate `out + w` creates a second reference. That makes the quadratic behaviour visible, which is exactly the point: the optimisation is fragile and the join pattern is not. At 500,000 words the gap becomes roughly a hundredfold, because the concatenation cost grows quadratically while join grows linearly.',
      },
      {
        language: 'python',
        title: 'Three interview patterns in one file',
        runnable: true,
        code: `from collections import Counter

def is_anagram(a, b):                      # frequency counting: O(n) time
    return Counter(a) == Counter(b)

def is_palindrome(s):                      # two pointers: O(n) time, O(1) space
    i, j = 0, len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return False
        i, j = i + 1, j - 1
    return True

def longest_unique_substring(s):           # sliding window: O(n) time
    last_seen, start, best = {}, 0, 0
    for i, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= start:
            start = last_seen[ch] + 1      # shrink the window past the repeat
        last_seen[ch] = i
        best = max(best, i - start + 1)
    return best

print(is_anagram("listen", "silent"))
print(is_palindrome("racecar"), is_palindrome("raceca"))
print(longest_unique_substring("abcabcbb"))`,
        output: `True
True False
3`,
        explanation:
          'These three shapes cover a large share of string questions. Frequency counting answers "same characters?" in O(n). Two pointers answer symmetry questions in O(n) time and O(1) space, beating the tempting `s == s[::-1]`, which allocates a reversed copy. The sliding window keeps a left boundary that only ever moves right, so every index is visited at most twice — which is why it is O(n) and not O(n^2) despite containing what looks like nested movement.',
      },
      {
        language: 'python',
        title: 'Characters, code points and bytes are three different things',
        runnable: true,
        code: `s = "café"
print(len(s), [ord(c) for c in s])

utf8 = s.encode("utf-8")
print(len(utf8), utf8)

latin = s.encode("latin-1")
print(len(latin), latin)

# The classic failure: decoding with the wrong codec
try:
    utf8.decode("ascii")
except UnicodeDecodeError as e:
    print("UnicodeDecodeError:", e.reason)`,
        output: `4 [99, 97, 102, 233]
5 b'caf\\xc3\\xa9'
4 b'caf\\xe9'
UnicodeDecodeError: ordinal not in range(128)`,
        explanation:
          'The string has four characters but five UTF-8 bytes, because the é needs two. Truncating text by byte count therefore risks slicing a character in half, and this is the root cause of the mojibake you see in badly handled datasets. Always decode at the boundary of your system, work in `str` internally, and encode again on the way out — the rule is often called the Unicode sandwich.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Tokenisation in an NLP pipeline',
        usage:
          'A tokeniser scans millions of documents, splits them and looks fragments up in a vocabulary. Every scan is a string traversal and every lookup is a hash of an immutable string — the immutability is what makes caching the hash safe.',
      },
      {
        context: 'Building a prompt or a SQL statement',
        usage:
          'Assembling a long prompt from retrieved chunks is exactly the builder pattern: append the chunks to a list and join once. Doing it with `+=` in a retrieval loop over a few thousand passages is a measurable, needless cost.',
      },
      {
        context: 'Cleaning scraped text',
        usage:
          'Normalising whitespace, stripping accents and casefolding are all operations that return new strings. Chaining five of them over a million rows copies the text five times, which is why pandas users push such work into vectorised `.str` methods or a single pass.',
      },
    ],

    projectConnections: [
      { tool: 'collections.Counter', role: 'One-line character or token frequency tables, the backbone of anagram, vocabulary and n-gram work.' },
      { tool: 're (regular expressions)', role: 'Pattern search over strings; a compiled pattern reused in a loop avoids re-parsing the pattern n times.' },
      { tool: 'Hugging Face tokenizers', role: 'Implements exactly the string algorithms in this unit in Rust, because doing them per-character in Python is too slow at corpus scale.' },
    ],

    commonMistakes: [
      {
        mistake: 'Building text with `+=` inside a loop',
        why: 'Each concatenation copies all characters accumulated so far, making the loop O(n^2). The occasional CPython in-place optimisation hides this until a second reference exists, and then it reappears.',
        fix: 'Append pieces to a list and call `"".join(parts)` once, or write directly to a file or `io.StringIO` handle.',
      },
      {
        mistake: 'Expecting a string method to modify the string',
        why: 'Strings are immutable, so `s.upper()` returns a new string and leaves `s` untouched. Calling it without assigning is a silent no-op.',
        fix: 'Always capture the result: `s = s.upper()`. If you find yourself wanting in-place edits, build a list of characters and join at the end.',
      },
      {
        mistake: 'Assuming one character is one byte',
        why: 'A Python `str` holds code points; UTF-8 encodes many of them in two to four bytes. Slicing encoded bytes by a character count corrupts multi-byte characters.',
        fix: 'Do all slicing on `str`, and encode only at input and output boundaries. Specify the encoding explicitly in `open()` rather than relying on the platform default.',
      },
      {
        mistake: 'Testing membership with `s.find(sub) != -1` and then searching again',
        why: 'It scans the string twice for no reason, and `find` returning 0 for a match at the start trips up truthiness checks.',
        fix: 'Use `if sub in s` for a boolean test, and `idx = s.find(sub)` followed by `if idx != -1` when you need the position.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is building a string with += in a loop slow, and what is the standard fix?',
        answer:
          'Strings are immutable, so each concatenation allocates a new object and copies every character accumulated so far. Over n pieces that is 1 + 2 + ... + n copies, which is O(n^2). The fix is to append the pieces to a list — amortised O(1) each — and call "".join(parts) once, which allocates exactly one final string and copies each character exactly once, giving O(total length). CPython sometimes resizes in place when the string has a single reference, which can hide the problem in toy benchmarks, but it is an implementation detail and disappears as soon as another reference exists.',
        followUp:
          'A strong answer notes that the same quadratic trap appears as repeated `pd.concat` or list `+` and generalises the principle: never repeatedly copy a growing accumulator.',
      },
      {
        level: 'intermediate',
        question: 'Give two ways to test whether two strings are anagrams and compare their complexity.',
        answer:
          'Sorting both and comparing is O(n log n) time and O(n) space, and it is one readable line: sorted(a) == sorted(b). Counting character frequencies with a dictionary or Counter is O(n) time and O(min(n, alphabet)) space, and it also lets you answer follow-ups like "which characters differ" without a second pass. For a fixed alphabet the count table is constant sized, so counting is strictly better asymptotically; for short words the sort is fast enough and easier to read. I would write the Counter version and say why, because the interviewer is testing whether you notice that sorting is doing more work than the question requires.',
        followUp:
          'The usual follow-up is grouping a list of words into anagram classes, where the sorted string becomes a dictionary key — a nice example of paying O(n log n) deliberately to obtain a hashable canonical form.',
      },
      {
        level: 'ml-engineer',
        question: 'A text-preprocessing job for 20 million documents is CPU-bound in Python. Where would you look first?',
        answer:
          'First at accidental quadratic behaviour: string accumulation with +=, repeated `re.compile` inside the loop, or membership tests against a list of stopwords instead of a set. Those are single-line fixes with order-of-magnitude effects. Next at the number of passes: five chained normalisation calls copy the text five times, so combining them into one translation table or one compiled regular expression cuts both allocations and traversals. Then at the boundary: decoding once into str and staying there, rather than repeatedly encoding and decoding. Only after that would I reach for multiprocessing or a Rust-backed tokeniser, because parallelising quadratic code just buys you a constant factor on top of the wrong algorithm.',
        followUp:
          'Mentioning `str.translate` with a precomputed table, or batching through a compiled regular expression, shows practical familiarity rather than textbook recall.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'What is the time complexity of `"".join(s[i] for i in range(len(s) - 1, -1, -1))` compared with `s[::-1]`, and which would you use?',
        hint: 'Both must produce n characters. Where does the constant factor differ?',
        solution:
          'Both are O(n) time and O(n) space — you cannot reverse n characters in less than linear time, and the result is a new string of length n either way. The difference is constant factor and clarity: `s[::-1]` runs entirely in C with one allocation, while the join version drives a Python-level generator and is several times slower. Use `s[::-1]`. The asymptotic tie is a useful reminder that Big-O does not rank implementations within a class; measurement and readability do.',
      },
      {
        prompt: 'Write a function that returns the first non-repeating character of a string, or None. State its complexity.',
        hint: 'Count first, then scan in the original order — two passes, not nested loops.',
        solution:
          'from collections import Counter\n\ndef first_unique(s):\n    counts = Counter(s)\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return None\n\nThe first pass builds the table in O(n); the second scans in original order and stops at the first count of one, also O(n). Total is O(n) time and O(min(n, alphabet)) space. The naive alternative — for each character, count its occurrences in the whole string — is O(n^2), and spotting that the count table can be built once is the entire point of the question.',
      },
      {
        prompt: 'A colleague writes `text = text.replace(a, b)` for 40 different replacement pairs over a 5 MB document. What is the cost, and how would you improve it?',
        hint: 'How many times is the document traversed and copied?',
        solution:
          'Each `replace` scans and copies the entire document, so 40 replacements means 40 full passes and 40 allocations of roughly 5 MB: O(40n) time and 200 MB of churn. For single-character replacements, `str.translate` with a table built by `str.maketrans` does the whole job in one pass. For multi-character patterns, compile one alternation regular expression, `re.compile("|".join(map(re.escape, keys)))`, and use `pattern.sub(lambda m: mapping[m.group()], text)` — again one pass. Both turn O(kn) into O(n) where k is the number of rules, and the improvement is easy to demonstrate with timeit.',
      },
    ],

    quiz: [
      {
        id: 'DSA-004-q1',
        type: 'mcq',
        concept: 'cost of concatenation',
        prompt: 'What is the total time complexity of building a string by concatenating n pieces of constant length in a loop?',
        options: ['O(n^2)', 'O(n)', 'O(n log n)', 'O(1) amortised'],
        answerIndex: 0,
        explanation:
          'Each concatenation copies everything accumulated so far, so the copies total 1 + 2 + ... + n = O(n^2). Collecting the pieces in a list and joining once is O(n).',
      },
      {
        id: 'DSA-004-q2',
        type: 'code-output',
        language: 'python',
        concept: 'immutability',
        prompt: 'What does this print?',
        code: `s = "hello"
s.upper()
print(s)`,
        options: ['hello', 'HELLO', 'None', 'It raises AttributeError'],
        answerIndex: 0,
        explanation:
          'Strings are immutable, so `upper()` returns a new string and discards it here because the result is not assigned. `s` is unchanged. Writing `s = s.upper()` is required.',
      },
      {
        id: 'DSA-004-q3',
        type: 'truefalse',
        concept: 'characters versus bytes',
        prompt: 'For any Python string s, len(s) always equals len(s.encode("utf-8")).',
        answer: false,
        explanation:
          'Only for pure ASCII. UTF-8 uses two to four bytes for other code points, so "café" has length 4 as a string but 5 as UTF-8 bytes. Slicing bytes by a character count can split a character in half.',
      },
      {
        id: 'DSA-004-q4',
        type: 'multi',
        concept: 'string operation costs',
        prompt: 'Which of these operations on a string of length n are O(n) or worse? Select all that apply.',
        options: ['`s[500]`', '`s + t`', '`sorted(s)`', '`len(s)`', '`s.replace("a", "b")`'],
        answerIndices: [1, 2, 4],
        explanation:
          'Indexing and len are O(1) because position is arithmetic and length is stored. Concatenation and replace both build a new string of size n, and sorting is O(n log n).',
      },
      {
        id: 'DSA-004-q5',
        type: 'fill',
        concept: 'string builder',
        prompt: 'Which string method should you call on a list of pieces to assemble them in linear time?',
        answers: ['join', 'str.join', '"".join', 'join()'],
        explanation:
          '`"".join(parts)` walks the list once to compute the total length, allocates exactly one string, and copies each character once — linear in the output size.',
      },
      {
        id: 'DSA-004-q6',
        type: 'explain',
        concept: 'why immutability is a feature',
        prompt: 'Explain what immutability buys us, given that it makes editing text more awkward.',
        rubric: [
          'Says an immutable object can be shared without defensive copying',
          'Says the hash can be computed once and cached, making strings usable as dict keys and set members',
          'Acknowledges the cost: every edit allocates, and naive accumulation is quadratic',
        ],
        sampleAnswer:
          'Because a string can never change, anyone holding a reference to it is safe: you can pass it to a function, store it in a cache and use it in two data structures at once with no risk that someone else edits it underneath you, and with no need to copy defensively. It also means the hash is fixed for the object\'s lifetime, so it can be computed once and cached, which is exactly what makes strings usable as dictionary keys and set members — and dictionary lookup by string key is everywhere, from vocabularies to configuration. The price is that every apparent edit allocates a new object, so accumulating text with += in a loop is quadratic and you must use the join pattern instead.',
        explanation:
          'The marking point is recognising immutability as a deliberate trade that buys hashability and safe sharing, not as a limitation the language forgot to remove.',
      },
    ],

    flashcards: [
      { front: 'Why is `s += x` in a loop O(n^2)?', back: 'Strings are immutable, so each concatenation copies everything accumulated so far. Use a list plus `"".join()` for O(n).' },
      { front: 'Cost of `s[a:b]`?', back: 'O(b - a): slicing allocates and copies a new string. Slicing is not free just because it is one line.' },
      { front: 'Anagram check: counting versus sorting', back: 'Counter is O(n) time, O(alphabet) space; sorting is O(n log n) time, O(n) space. Counting wins asymptotically, sorting reads better.' },
      { front: 'Two-pointer palindrome versus `s == s[::-1]`', back: 'Both O(n) time, but two pointers use O(1) space and can exit early; the slice allocates a full reversed copy.' },
      { front: 'What makes strings usable as dict keys?', back: 'Immutability: the hash can never change after creation, so it is computed once and cached.' },
      { front: 'Why can len(s) differ from len(s.encode("utf-8"))?', back: 'len(str) counts code points; UTF-8 uses one to four bytes per code point, so non-ASCII text has more bytes than characters.' },
    ],

    challenge: {
      title: 'A word-frequency report from raw text',
      brief:
        'Write a function that takes a block of raw text and returns the ten most common words, normalised to lowercase with punctuation stripped, together with their counts. Build the report string with the join pattern, not with repeated concatenation. Then time your function on a text repeated to about 5 MB, and add a short note stating the time and space complexity of each stage — normalisation, splitting, counting and report building.',
      language: 'python',
      acceptanceCriteria: [
        'Normalisation happens in a single pass, using str.translate or one compiled regular expression',
        'Counting uses a dictionary or Counter, not nested loops over the word list',
        'The final report is assembled with "".join or "\\n".join',
        'The note states the complexity of each stage, including the space held by the count table',
      ],
      starterCode: 'import re\nfrom collections import Counter\n\ndef top_words(text, k=10):\n    # normalise once, split, count, then build the report with join\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who writes Python daily why their loop that builds a report string is slow, and what immutability has to do with it.',
      mustCover: [
        'A string cannot be modified after creation, so every apparent edit allocates a new string',
        'Concatenating in a loop copies the whole accumulated string each time, giving quadratic total work',
        'The fix is to append pieces to a list and join once, which is linear in the output size',
        'Immutability is not an accident: it is what makes strings safe to share and usable as dictionary keys',
      ],
      bonusSignals: ['gives the 1 + 2 + ... + n argument explicitly', 'mentions that the CPython in-place optimisation is unreliable', 'connects the pattern to list + and pd.concat in loops'],
      sampleExplanation:
        'A Python string can never be changed once it exists. When you write report = report + line, Python does not extend the old string — it allocates a brand-new one and copies every character of the old one into it, plus the new line. On the first pass that is trivial; on the ten-thousandth pass you are copying ten thousand lines\' worth of text to add one more. Add those copies up and you get 1 + 2 + 3 + ... + n, which is proportional to n squared, and that is why the loop crawls. Collect the lines in a list instead: appending to a list copies nothing, and "\\n".join(lines) at the end walks the pieces once, works out the exact final size, allocates once and copies each character a single time. Immutability is worth this inconvenience, because it means a string you hold can never be altered by someone else, and its hash never changes — which is precisely what lets strings be dictionary keys.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-005',
    domain: 'DSA',
    module: 'Linear Structures',
    topic: 'Pointer-linked sequences',
    title: 'Linked Lists',
    slug: 'linked-lists',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DSA-003'],
    related: ['DSA-002', 'DSA-003', 'DSA-004'],
    tags: ['linked-list', 'pointers', 'nodes', 'reversal', 'two-pointer'],

    learningObjectives: [
      'Describe a node-and-pointer structure and explain why it has no random access',
      'Insert and delete at the head, tail and middle of a singly linked list and give the cost of each',
      'Reverse a singly linked list iteratively with three pointers, and explain the invariant that makes it work',
      'Choose honestly between a linked list and a dynamic array for a given access pattern',
    ],

    terminology: [
      {
        term: 'Node',
        definition:
          'A small object holding a value plus one or more references to other nodes. In a singly linked list each node has `value` and `next`.',
        simple: 'A box containing a thing and an arrow pointing to the next box.',
      },
      {
        term: 'Head and tail',
        definition:
          'The head is the first node and the only entry point to the list; the tail is the last node, whose `next` is None. Losing the head reference loses the entire list.',
        simple: 'The front of the chain and the back of it.',
      },
      {
        term: 'Singly versus doubly linked',
        definition:
          'A singly linked node points only forward; a doubly linked node also points back. Doubly linked costs one extra reference per node but allows O(1) deletion given only the node itself.',
        simple: 'Arrows in one direction, or arrows in both.',
      },
      {
        term: 'Dummy (sentinel) node',
        definition:
          'A placeholder node placed before the real head so that insertion and deletion need no special case for an empty list or for the first element.',
        simple: 'A blank first box so the front is never a special case.',
      },
      {
        term: 'Pointer chasing',
        definition:
          'Following references from node to node. Because nodes are scattered in memory, each hop is likely to be a cache miss, which is why linked lists lose badly to arrays in practice.',
        simple: 'Hopping from box to box, with the computer having to fetch each box fresh.',
      },
    ],

    simpleExplanation:
      "An array keeps its elements side by side, which is why you can jump straight to any one of them. A linked list does the opposite: each element sits wherever memory happens to have room, and carries an arrow pointing to the next one. To find the fifth element you must start at the front and follow four arrows, so reaching an element is no longer instant — it costs as much as the distance you travel. In exchange, you get something arrays are bad at: once you are standing at a spot, inserting or removing an element is just a matter of re-pointing a couple of arrows, with nothing to shuffle along. That makes linked lists the natural shape for things that are constantly being spliced, and it makes them the internal machinery of structures you use every day, like a deque or an LRU cache. But be honest about the trade: because the boxes are scattered, the processor cannot prefetch them, so for straightforward scanning an array wins by a large constant factor even where the complexity looks identical.",

    whyItExists:
      'Arrays demand one unbroken block of memory, so growing them means copying and inserting in the middle means shifting. Linked lists give up random access to buy O(1) splicing anywhere you already stand, and they never need to relocate existing elements.',

    analogy: {
      scenario:
        "Picture a treasure hunt through a town. Each clue is hidden in a different place and tells you only where the next clue is. To reach the seventh clue there is no shortcut: you must visit the first six. But if you decide to add a new stop between clue three and clue four, you do not have to rewrite the whole hunt — you write one new clue pointing to the old clue four, and change clue three to point at your new one. Two edits, no matter how long the hunt is.",
      mapping: [
        { from: 'One hidden clue', to: 'A node holding a value and a next reference' },
        { from: 'The instruction on the clue telling you where to go next', to: 'The `next` pointer' },
        { from: 'Having to visit clues 1 to 6 to reach clue 7', to: 'O(n) access by position — no random access' },
        { from: 'Splicing in a new stop by rewriting two clues', to: 'O(1) insertion once you hold the preceding node' },
        { from: 'Losing the first clue and the hunt being over', to: 'Losing the head reference makes the whole list unreachable and garbage-collected' },
      ],
      bridge:
        'The hunt makes the asymmetry concrete: finding a position is expensive because information about location lives only in the chain, while editing is cheap because nothing physically moves. An array is the reverse — positions are free because they are arithmetic, edits are costly because elements must shift. Every difference between the two structures follows from where the position information lives.',
      limitations:
        'The analogy under-sells the memory cost. Each clue needs a reference as well as a value, so a singly linked list of integers in CPython uses several times the memory of a list, and a doubly linked one more still. It also hides the cache effect, which is usually a bigger practical penalty than the extra bytes.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Insert and delete by re-pointing arrows',
        caption: 'Add and remove nodes and watch which references change and which do not.',
        widget: 'linked-list',
      },
      {
        kind: 'compare',
        title: 'Dynamic array versus singly linked list',
        caption: 'Neither is better; they are good at different things.',
        left: {
          heading: 'Dynamic array (Python list)',
          points: [
            'Index access O(1) by address arithmetic',
            'Append O(1) amortised, insert or delete in the middle O(n)',
            'Contiguous memory: excellent cache behaviour, a few bytes per element',
            'Occasional O(n) resize spike when capacity is exceeded',
          ],
        },
        right: {
          heading: 'Singly linked list',
          points: [
            'Index access O(n): you must walk from the head',
            'Insert or delete O(1) once you hold the preceding node',
            'Scattered memory: a likely cache miss per hop, plus a reference per node',
            'No resizing ever — nodes are allocated one at a time',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Deleting the node after a given node',
        caption: 'Three steps, and none of them touches any other element.',
        steps: [
          { label: 'Stand at `prev`', detail: 'You must already hold the node before the one you intend to remove — this is why deletion by value is O(n) but deletion given prev is O(1).' },
          { label: 'Read `victim = prev.next`', detail: 'Grab a reference to the node being unlinked before you overwrite anything.' },
          { label: 'Re-point `prev.next = victim.next`', detail: 'The chain now skips the victim entirely. This single assignment is the deletion.' },
          { label: 'Optionally clear `victim.next = None`', detail: 'Helps garbage collection and prevents a stale reference walking back into the live list.' },
          { label: 'Nothing else moves', detail: 'No element shifts position, unlike the O(n) shuffle a list would perform.' },
        ],
      },
    ],

    formalDefinition:
      'A singly linked list is a sequence represented as a chain of nodes, each holding a value and a reference to its successor, terminated by a null reference; the structure is identified by a reference to its head. Access to the element at position i is O(i), while insertion or deletion adjacent to a held node is O(1) since it requires only a constant number of reference assignments and no relocation of other elements.',

    math: {
      intuition:
        'The cost model is simple: every operation costs the distance you had to travel plus a constant amount of re-pointing. Searching averages half the list, so it is linear; editing once you have arrived is free of n entirely. Memory per element is the value plus one reference for singly linked, two for doubly linked, which is why the structure is wasteful for small values.',
      formulas: [
        {
          latex: 'T_{\\text{access}}(i) = O(i), \\qquad T_{\\text{search}}(n) = O(n), \\qquad T_{\\text{splice}} = O(1)',
          name: 'Linked list cost model',
          meaning: 'Travel is linear in distance; editing after arrival is constant.',
          category: 'complexity',
          variables: [
            { symbol: 'i', meaning: 'Position being accessed, counted from the head' },
            { symbol: 'n', meaning: 'Number of nodes in the list' },
            { symbol: 'T_{\\text{splice}}', meaning: 'Cost of inserting or deleting given the adjacent node reference' },
          ],
        },
        {
          latex: 'M_{\\text{singly}} = n(v + p), \\qquad M_{\\text{doubly}} = n(v + 2p)',
          name: 'Memory overhead of linking',
          meaning: 'Every node pays for its pointers, which is the hidden constant-factor cost of the structure.',
          category: 'complexity',
          variables: [
            { symbol: 'v', meaning: 'Bytes for the stored value or its reference' },
            { symbol: 'p', meaning: 'Bytes per pointer — 8 on a 64-bit build, plus Python object overhead of roughly 48 bytes per node' },
            { symbol: 'n', meaning: 'Number of nodes' },
          ],
        },
      ],
    },

    workedExample: {
      title: 'Reversing 1 -> 2 -> 3 -> 4 with three pointers',
      setup:
        'Reverse a singly linked list in place. Maintain prev (head of the already-reversed part), curr (the node being processed) and nxt (a saved reference so the chain is not lost). Start with prev = None, curr = node(1). The invariant is: everything before curr has already been reversed and is reachable from prev.',
      steps: [
        { label: 'Start', detail: 'prev = None, curr = 1 -> 2 -> 3 -> 4. Nothing reversed yet.' },
        { label: 'Iteration 1', detail: 'nxt = 2. Set 1.next = prev = None. prev = 1, curr = 2. Reversed part: 1. Remaining: 2 -> 3 -> 4.' },
        { label: 'Iteration 2', detail: 'nxt = 3. Set 2.next = 1. prev = 2, curr = 3. Reversed part: 2 -> 1. Remaining: 3 -> 4.' },
        { label: 'Iteration 3', detail: 'nxt = 4. Set 3.next = 2. prev = 3, curr = 4. Reversed part: 3 -> 2 -> 1. Remaining: 4.' },
        { label: 'Iteration 4', detail: 'nxt = None. Set 4.next = 3. prev = 4, curr = None. Reversed part: 4 -> 3 -> 2 -> 1. Remaining: nothing.' },
        { label: 'Loop ends', detail: 'curr is None, so the loop exits. Return prev, which is node 4 — the new head.' },
        { label: 'Why nxt is essential', detail: 'The assignment curr.next = prev destroys the only reference to the rest of the list. Saving nxt first is what prevents losing the tail — omit it and you get a one-element list.' },
        { label: 'Pointer count', detail: 'Each of the n iterations performs exactly three assignments, independent of n.', latex: 'T(n) = 3n + c = O(n)' },
      ],
      conclusion:
        'Time complexity is O(n): each node is visited exactly once and each visit does constant work. Space complexity is O(1) auxiliary — three references, regardless of list length. This beats the obvious alternative of copying values into a Python list, reversing it and writing them back, which is also O(n) time but O(n) space. The recursive formulation is elegant but costs O(n) stack space and raises RecursionError beyond about a thousand nodes, so the iterative three-pointer version is the one to produce in an interview.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A singly linked list with the operations that matter',
        runnable: true,
        code: `class Node:
    __slots__ = ("value", "next")          # trims per-node memory noticeably
    def __init__(self, value, nxt=None):
        self.value, self.next = value, nxt

class LinkedList:
    def __init__(self):
        self.head = None
        self._size = 0

    def push_front(self, value):           # O(1)
        self.head = Node(value, self.head)
        self._size += 1

    def find(self, value):                 # O(n): must walk the chain
        node = self.head
        while node and node.value != value:
            node = node.next
        return node

    def remove(self, value):               # O(n) to locate, O(1) to unlink
        prev, node = None, self.head
        while node and node.value != value:
            prev, node = node, node.next
        if node is None:
            return False
        if prev is None:
            self.head = node.next          # removing the head
        else:
            prev.next = node.next          # the whole deletion: one assignment
        self._size -= 1
        return True

    def __iter__(self):
        node = self.head
        while node:
            yield node.value
            node = node.next

ll = LinkedList()
for v in (3, 2, 1):
    ll.push_front(v)
print(list(ll))
ll.remove(2)
print(list(ll), len(list(ll)))`,
        output: `[1, 2, 3]
[1, 3] 2`,
        explanation:
          'Notice the asymmetry that defines the structure: `push_front` is O(1) because the head is the one position you already hold, while `remove` spends O(n) finding the node and then O(1) actually removing it. The `prev is None` branch is the special case a dummy head node would eliminate. `__slots__` matters here because a list of ten thousand nodes otherwise carries ten thousand instance dictionaries.',
      },
      {
        language: 'python',
        title: 'Iterative reversal and the two-pointer middle-finding trick',
        runnable: true,
        code: `def reverse(head):                 # O(n) time, O(1) space
    prev, curr = None, head
    while curr:
        nxt = curr.next            # save it: the next line destroys this link
        curr.next = prev
        prev, curr = curr, nxt
    return prev

def middle(head):                  # slow/fast pointers: one pass, O(1) space
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow

def has_cycle(head):               # Floyd's algorithm: O(n) time, O(1) space
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            return True
    return False

def to_list(head):
    out, node = [], head
    while node:
        out.append(node.value)
        node = node.next
    return out

head = Node(1, Node(2, Node(3, Node(4, Node(5)))))
print(middle(head).value)
head = reverse(head)
print(to_list(head))
print(has_cycle(head))`,
        output: `3
[5, 4, 3, 2, 1]
False`,
        explanation:
          'The slow/fast pattern is the linked-list equivalent of binary search: because fast moves twice as quickly, it reaches the end after n/2 steps of slow, which therefore lands on the middle. The same two pointers detect a cycle, since in a loop the fast pointer gains one position per step on the slow one and must eventually collide with it. Both are O(n) time and O(1) space, and both are impossible to express as cleanly on an array — which is a fair answer to "when is a linked list actually nice to work with?".',
      },
      {
        language: 'python',
        title: 'Where linked lists actually live in production Python',
        runnable: true,
        code: `from collections import deque, OrderedDict

dq = deque([1, 2, 3])
dq.appendleft(0)      # O(1): impossible in O(1) on a list
dq.append(4)
print(dq, dq.popleft(), dq.pop())

# An LRU cache is a hash map plus a doubly linked list of recency order
cache = OrderedDict()
def get(key):
    if key not in cache:
        return None
    cache.move_to_end(key)          # O(1): unlink and relink two pointers
    return cache[key]

for k, v in [("a", 1), ("b", 2), ("c", 3)]:
    cache[k] = v
get("a")
print(list(cache.keys()))           # 'a' has moved to the most-recent end`,
        output: `deque([0, 1, 2, 3, 4]) 0 4
['b', 'c', 'a']`,
        explanation:
          'You will rarely hand-roll a linked list in Python, but you will use them constantly through other people\'s. `deque` is a doubly linked list of fixed-size blocks, which is why both ends are O(1). `OrderedDict.move_to_end` is O(1) precisely because recency order is a doubly linked list: promoting an entry unlinks a node and relinks it at the end, with no shifting. `functools.lru_cache` is built on exactly this combination of hash map for lookup and linked list for order.',
      },
    ],

    realWorldExamples: [
      {
        context: 'LRU caches in inference services',
        usage:
          'Caching recent model outputs or embeddings requires O(1) lookup plus O(1) recency updates. The standard implementation is a hash map to nodes of a doubly linked list, which is what `functools.lru_cache` and most Redis-style eviction policies do.',
      },
      {
        context: 'Replay buffers in reinforcement learning',
        usage:
          'A bounded buffer that discards the oldest transition as new ones arrive is a queue. `collections.deque(maxlen=N)` gives O(1) appends and O(1) eviction at the far end, which a Python list cannot.',
      },
      {
        context: 'Undo history and streaming pipelines',
        usage:
          'Editors and dataflow systems keep operations in a doubly linked chain so a step can be spliced out or a branch inserted without rewriting the surrounding sequence.',
      },
    ],

    projectConnections: [
      { tool: 'collections.deque', role: 'The production answer whenever you need O(1) work at both ends — queues, sliding windows, replay buffers.' },
      { tool: 'functools.lru_cache', role: 'Hash map plus linked recency order; understanding the node structure explains why its operations are all O(1).' },
      { tool: 'PyTorch autograd', role: 'The backward graph is a linked structure of nodes referencing their inputs, traversed once during backpropagation.' },
    ],

    commonMistakes: [
      {
        mistake: 'Overwriting `curr.next` before saving the rest of the list',
        why: 'The next reference is the only route to the remaining nodes; reassigning it first makes everything after the current node unreachable and immediately garbage.',
        fix: 'Always save `nxt = curr.next` before modifying `curr.next`. This is the single most common bug in linked-list code.',
      },
      {
        mistake: 'Forgetting the empty-list and single-node cases',
        why: 'Code written for the general case often dereferences `head.next` or assumes a previous node exists, raising AttributeError on an empty or one-element list.',
        fix: 'Use a dummy sentinel node before the head so insertion and deletion have no special case, and test explicitly with lists of length 0, 1 and 2.',
      },
      {
        mistake: 'Reaching for a linked list because "insertion is O(1)"',
        why: 'Insertion is O(1) only once you already hold the adjacent node. Finding that node is O(n), and in a pointer-chasing scan a linked list is typically several times slower than a contiguous array of the same length.',
        fix: 'Use a list unless you genuinely need O(1) edits at positions you already hold, or O(1) operations at both ends — and then use `deque` rather than writing your own.',
      },
      {
        mistake: 'Writing recursive traversals over long lists',
        why: 'One stack frame per node means O(n) space and RecursionError past CPython\'s default limit of about 1,000 frames.',
        fix: 'Write the loop. Iteration over a linked list is naturally a while loop and uses O(1) space.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Reverse a singly linked list. Walk through your pointers and state the complexity.',
        answer:
          'Keep three references: prev starting at None, curr starting at head, and nxt saved inside the loop. On each iteration save nxt = curr.next, set curr.next = prev to flip the link, then advance prev = curr and curr = nxt. When curr becomes None, prev is the new head. The invariant is that everything before curr is already reversed and reachable from prev. It is O(n) time because each node is touched once, and O(1) auxiliary space because only three references exist regardless of length. The critical detail is saving nxt before overwriting curr.next — skip it and you sever the list after the first node.',
        followUp:
          'A common follow-up is reversing only a sublist between positions m and n, which is the same loop plus a dummy head node so the boundary cases stay uniform.',
      },
      {
        level: 'intermediate',
        question: 'How do you detect a cycle in a linked list in O(1) space, and why does it work?',
        answer:
          'Floyd\'s tortoise and hare: advance a slow pointer one node and a fast pointer two nodes per iteration. If the list ends, fast hits None and there is no cycle. If there is a cycle, both pointers eventually enter it, and since fast gains exactly one position on slow per iteration, the gap shrinks by one each step and must reach zero, so they meet. It is O(n) time and O(1) space. The alternative is a set of visited nodes, which is also O(n) time but O(n) space; the two-pointer version is preferred precisely because it uses constant memory.',
        followUp:
          'Strong candidates continue to finding the cycle entry point: reset one pointer to the head and advance both one step at a time, and they meet at the start of the loop.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you actually choose a linked list over an array in a production Python system?',
        answer:
          'Almost never directly, and that honesty is part of the answer. The cases that survive scrutiny are: a queue or bounded buffer needing O(1) work at both ends, where `collections.deque` is the right tool; an LRU or recency structure where an entry must be promoted in O(1) without shifting, which is a hash map plus a doubly linked list; and intrusive lists inside allocators or schedulers where an element must be unlinked in O(1) from a position it already knows. For anything you will scan, index or slice, a list or a NumPy array wins by a large constant factor because of cache locality, even where the complexity looks identical. The reason to understand linked lists is that they are the internal machinery of deque, OrderedDict and graph adjacency structures.',
        followUp:
          'Mentioning the cache-miss-per-hop cost, rather than only the asymptotics, is what distinguishes a practitioner from someone reciting a textbook.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a function that returns the k-th node from the end of a singly linked list in one pass with O(1) extra space.',
        hint: 'Start a second pointer k nodes ahead and advance both together.',
        solution:
          'def kth_from_end(head, k):\n    lead = head\n    for _ in range(k):\n        if lead is None:\n            return None\n        lead = lead.next\n    trail = head\n    while lead:\n        lead, trail = lead.next, trail.next\n    return trail\n\nOnce lead is k nodes ahead, the gap between the two pointers never changes, so when lead falls off the end trail is exactly k from the end. Time is O(n) with a single traversal, space is O(1). The two-pass alternative — count the length, then walk n - k nodes — is equally valid and equally O(n); the interviewer is checking whether you can maintain a fixed offset invariant.',
      },
      {
        prompt: 'Merge two sorted singly linked lists into one sorted list without allocating new nodes. What is the complexity?',
        hint: 'A dummy head node removes every special case about which list contributes the first element.',
        solution:
          'def merge(a, b):\n    dummy = Node(None)\n    tail = dummy\n    while a and b:\n        if a.value <= b.value:\n            tail.next, a = a, a.next\n        else:\n            tail.next, b = b, b.next\n        tail = tail.next\n    tail.next = a or b\n    return dummy.next\n\nTime is O(n + m), since each node is relinked exactly once, and auxiliary space is O(1) — only the dummy and two references, with no new nodes allocated. The `tail.next = a or b` line attaches whatever remains of the non-exhausted list in constant time, which is something an array merge cannot do without copying. This is also the merge step of merge sort, which is why linked lists can be merge-sorted with O(1) auxiliary space while arrays cannot.',
      },
      {
        prompt: 'Explain precisely why `list.insert(0, x)` is O(n) but `deque.appendleft(x)` is O(1), in terms of memory layout.',
        hint: 'What has to physically move in each case?',
        solution:
          'A Python list is one contiguous block with element i at base + i * 8. Inserting at index 0 means every existing element must occupy a slot one higher, so n pointers are physically copied — O(n), and the copy happens on every call. A deque is a doubly linked list of fixed-size blocks with a head block that has spare room at its left end; appendleft writes into that spare slot, or allocates one new block and links it in with a constant number of pointer assignments. Nothing existing moves, so the cost is O(1) regardless of length. The general principle: contiguity makes positions arithmetic but makes edits expensive, and linking makes edits cheap but makes positions expensive.',
      },
    ],

    quiz: [
      {
        id: 'DSA-005-q1',
        type: 'mcq',
        concept: 'access cost',
        prompt: 'What is the time complexity of accessing the 500th element of a singly linked list with 1,000 nodes?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
        answerIndex: 0,
        explanation:
          'There is no address arithmetic to exploit, so you must follow 500 next pointers from the head. Access by position is linear in the position, hence O(n) in the worst case.',
      },
      {
        id: 'DSA-005-q2',
        type: 'order',
        concept: 'reversal algorithm',
        prompt: 'Put the body of the iterative reversal loop in the correct order.',
        items: ['nxt = curr.next', 'curr.next = prev', 'prev = curr', 'curr = nxt'],
        explanation:
          'Saving nxt must come first: the second statement overwrites the only reference to the rest of the list. Advancing prev before curr matters too, since curr is needed to set prev.',
      },
      {
        id: 'DSA-005-q3',
        type: 'truefalse',
        concept: 'insertion cost',
        prompt: 'Inserting into the middle of a singly linked list is O(1) in all circumstances.',
        answer: false,
        explanation:
          'The splice itself is O(1), but only once you hold the preceding node. Reaching that node by position or by value is O(n), so insertion by value is linear overall.',
      },
      {
        id: 'DSA-005-q4',
        type: 'debug',
        language: 'python',
        concept: 'losing the rest of the list',
        prompt: 'This reversal returns a list containing only one node. What is wrong?',
        code: `prev, curr = None, head
while curr:
    curr.next = prev
    prev = curr
    curr = curr.next`,
        options: [
          'curr.next is overwritten before the rest of the list is saved, so `curr = curr.next` reads the already-reassigned pointer',
          'prev should be initialised to head rather than None',
          'The loop condition should be `while curr.next`',
          'The list must be doubly linked for reversal to work',
        ],
        answerIndex: 0,
        explanation:
          'After `curr.next = prev`, the node no longer points forward, so the final line walks backwards into the reversed part. Saving `nxt = curr.next` first, before the reassignment, fixes it.',
      },
      {
        id: 'DSA-005-q5',
        type: 'match',
        concept: 'structure selection',
        prompt: 'Match each requirement to the structure that satisfies it best.',
        pairs: [
          { left: 'O(1) append and pop at both ends', right: 'collections.deque (doubly linked blocks)' },
          { left: 'O(1) access by index', right: 'Python list (dynamic array)' },
          { left: 'O(1) promotion of an entry to most-recent', right: 'Hash map plus doubly linked list (LRU)' },
          { left: 'Contiguous numeric data for fast arithmetic', right: 'NumPy array' },
        ],
        explanation:
          'Structure choice follows access pattern: arithmetic addressing for indexing, linked nodes for cheap splicing, and a hash map wherever lookup by key must be constant.',
      },
      {
        id: 'DSA-005-q6',
        type: 'explain',
        concept: 'array versus linked list trade-off',
        prompt: 'A colleague proposes replacing a list with a linked list "because insertion is O(1)". Respond.',
        rubric: [
          'Points out that insertion is O(1) only when the adjacent node is already held, and locating it is O(n)',
          'Mentions the practical cost: pointer chasing causes cache misses and extra memory per node',
          'Names the cases where linking genuinely wins, such as operations at both ends or O(1) recency promotion',
        ],
        sampleAnswer:
          'The O(1) claim is conditional: splicing costs a couple of pointer assignments, but only once you are standing at the right node, and getting there means walking from the head, which is O(n). Unless the code already holds a reference to the insertion point, the whole operation is linear, exactly like list.insert. On top of that, nodes are scattered in memory, so each hop tends to cost a cache miss and every node carries a pointer plus per-object overhead — in CPython that is several times the memory of a list. The cases where linking genuinely wins are operations at both ends, for which deque already exists, and structures like an LRU cache where a node held by a hash map must be promoted in constant time. If neither applies, keeping the list is the faster and simpler choice.',
        explanation:
          'The examinable judgement is that asymptotics are necessary but not sufficient: the conditional nature of the O(1) and the cache behaviour both have to appear.',
      },
    ],

    flashcards: [
      { front: 'Why is there no random access in a linked list?', back: 'Nodes are scattered in memory and reachable only through next pointers, so position i costs i hops — there is no address arithmetic.' },
      { front: 'The three pointers in iterative reversal', back: 'prev, curr and nxt. Save nxt before flipping curr.next = prev, then advance prev and curr. O(n) time, O(1) space.' },
      { front: 'What is a dummy head node for?', back: 'It removes the special case for an empty list or an operation at the first position, so insertion and deletion code stays uniform.' },
      { front: 'Floyd\'s cycle detection', back: 'Slow moves one node, fast moves two. If they meet there is a cycle; if fast hits None there is not. O(n) time, O(1) space.' },
      { front: 'Which real Python structures are linked lists?', back: '`collections.deque` (doubly linked blocks) and the recency order inside `OrderedDict` and `functools.lru_cache`.' },
      { front: 'Insertion in a linked list is O(1) — when?', back: 'Only when you already hold the adjacent node. Finding it first is O(n).' },
    ],

    challenge: {
      title: 'An LRU cache from first principles',
      brief:
        'Implement an LRU cache with capacity k supporting get(key) and put(key, value), both in O(1), using a dictionary mapping keys to nodes of a doubly linked list that holds recency order. On get, unlink the node and relink it at the most-recent end. On put beyond capacity, evict the node at the least-recent end. Add an assertion-based test that exercises eviction order, and write two sentences justifying why every operation is O(1).',
      language: 'python',
      acceptanceCriteria: [
        'get and put both perform a constant number of pointer assignments, with no traversal',
        'Eviction removes the least recently used key, proven by a test with at least five operations',
        'Sentinel head and tail nodes are used so no branch is needed for empty or single-entry cases',
        'The justification names both the hash map lookup and the constant-time unlink and relink',
      ],
      starterCode: 'class Node:\n    __slots__ = ("key", "value", "prev", "next")\n    def __init__(self, key=None, value=None):\n        self.key, self.value = key, value\n        self.prev = self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.map = {}\n        self.head, self.tail = Node(), Node()   # sentinels\n        self.head.next, self.tail.prev = self.tail, self.head\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who is comfortable with Python lists what a linked list is, what it is good at, and why they have probably never needed to write one.',
      mustCover: [
        'Each node holds a value plus a reference to the next node, so elements need not be adjacent in memory',
        'There is no random access: reaching position i costs i hops',
        'Insertion and deletion are O(1) once you hold the adjacent node, because nothing shifts',
        'The practical cost is cache misses and per-node memory, which is why arrays usually win in Python',
      ],
      bonusSignals: ['mentions deque and lru_cache as real uses', 'explains the saved-next-pointer step in reversal', 'is honest that the O(1) insertion claim is conditional'],
      sampleExplanation:
        'A linked list stores each element in its own little box that also holds an arrow to the next box. Because the boxes are not side by side, there is no way to jump straight to the fifth one — you start at the front and follow four arrows. That is the cost. The benefit is that once you are standing somewhere, inserting or deleting is just re-pointing two arrows: nothing else in the structure moves, whereas a Python list has to shift every element after the insertion point. In practice you have probably never written one, and that is reasonable. Scattered boxes mean the processor cannot prefetch, so scanning a linked list is several times slower than scanning a list of the same length, and every node costs extra memory for its arrow. Where the idea does earn its keep is inside things you already use: deque gets O(1) at both ends this way, and an LRU cache promotes an entry to most-recent in constant time by unlinking one node and relinking it, which no array can do.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-006',
    domain: 'DSA',
    module: 'Linear Structures',
    topic: 'Restricted-access containers',
    title: 'Stacks and Queues',
    slug: 'stacks-and-queues',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['DSA-003', 'DSA-005'],
    related: ['DSA-003', 'DSA-004', 'DSA-005'],
    tags: ['stack', 'queue', 'deque', 'lifo', 'fifo', 'monotonic-stack'],

    learningObjectives: [
      'Explain LIFO and FIFO discipline and give a problem that each one solves naturally',
      'Implement a stack with a Python list and a queue with collections.deque, and justify both choices on complexity grounds',
      'Use a stack to validate nested structure and to evaluate expressions',
      'Recognise the monotonic stack pattern and explain why it is O(n) despite its inner loop',
    ],

    terminology: [
      {
        term: 'Stack (LIFO)',
        definition:
          'A container where the last item added is the first removed. Operations are push, pop and peek, all O(1) at the same end.',
        simple: 'A pile of plates: you take from the top.',
      },
      {
        term: 'Queue (FIFO)',
        definition:
          'A container where the first item added is the first removed. Operations are enqueue at one end and dequeue at the other, both O(1) with the right structure.',
        simple: 'A line at a ticket desk: first in, first served.',
      },
      {
        term: 'Deque',
        definition:
          'A double-ended queue supporting O(1) append and pop at both ends. `collections.deque` implements one over a doubly linked list of blocks.',
        simple: 'A line you can join or leave from either end.',
      },
      {
        term: 'Call stack',
        definition:
          'The runtime\'s own stack of function frames. Every function call pushes a frame and every return pops one, which is why recursion depth is bounded.',
        simple: 'The computer\'s own pile of unfinished jobs.',
      },
      {
        term: 'Monotonic stack',
        definition:
          'A stack whose contents are kept sorted in one direction by popping violating elements on push. It answers "next greater element" style questions in O(n) total.',
        simple: 'A pile you keep tidy by throwing out anything smaller before adding the new item.',
      },
    ],

    simpleExplanation:
      "Stacks and queues are containers that deliberately give up flexibility. A list lets you touch any position; a stack insists that you only ever add and remove at one end, and a queue insists that you add at one end and remove at the other. That sounds like a downside until you notice how often the restriction matches the problem. When you are tracking things that must be undone in reverse order — open brackets, nested function calls, the path you took into a maze — the last thing you opened is always the first thing you must close, and that is exactly a stack. When you are processing things in the order they arrived — jobs in a print queue, nodes discovered while exploring a network — the first thing in should be the first thing out, and that is a queue. Because both restrict where you may touch, both can be implemented so every operation is constant time, and because the discipline matches the problem, the resulting code is usually shorter and harder to get wrong than the equivalent with an unrestricted list.",

    whyItExists:
      'Many problems have a natural processing order that is either strictly reverse-of-arrival or strictly order-of-arrival. Encoding that order in the data structure makes the code match the problem, guarantees O(1) operations, and removes a whole class of index-juggling bugs.',

    analogy: {
      scenario:
        "Think of two trays in an office. The first is a spike of the old-fashioned kind: paperwork is pushed down onto it and only the sheet on top can be lifted off, so the most recently filed item is the first one you deal with. The second is a pipe: envelopes are pushed in at the left and drop out at the right, so they emerge in exactly the order they arrived. Neither tray lets you reach into the middle, and that is deliberate. The spike is what you want when handling interruptions — finish the thing you just started before returning to what it interrupted. The pipe is what you want when fairness matters, because nobody who arrived later can get served first.",
      mapping: [
        { from: 'The spike where only the top sheet is reachable', to: 'A stack: push and pop at the same end, LIFO' },
        { from: 'The pipe with an in end and an out end', to: 'A queue: enqueue at the back, dequeue at the front, FIFO' },
        { from: 'Not being able to reach into the middle', to: 'The restricted interface that guarantees O(1) operations' },
        { from: 'Handling an interruption and returning to what it interrupted', to: 'The call stack, and recursive or nested processing' },
        { from: 'Serving people in arrival order', to: 'Breadth-first search, task scheduling, buffering' },
      ],
      bridge:
        'The restriction is the feature. Because you may only touch one designated end, the implementation never has to shift or search, so every operation is a constant number of steps. And because the discipline mirrors the problem\'s natural order, choosing the right one of the two often turns a fiddly index-tracking loop into six obvious lines — which is why "which of these two do I need?" is a genuinely useful first question when facing a traversal problem.',
      limitations:
        'The analogy suggests the two are interchangeable containers. They are not: swapping a stack for a queue in a graph traversal changes depth-first into breadth-first and changes the answer, which is the subject of two later units.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Push, pop, enqueue, dequeue',
        caption: 'Run the same sequence of values through a stack and a queue and compare the output order.',
        widget: 'stack-queue',
      },
      {
        kind: 'compare',
        title: 'Stack versus queue',
        caption: 'Same operations count, opposite ordering discipline.',
        left: {
          heading: 'Stack — LIFO',
          points: [
            'push and pop at the same end, both O(1)',
            'Python: a plain list with append and pop',
            'Natural for nesting, undo, backtracking, expression parsing',
            'Reverses the order of whatever passes through it',
          ],
        },
        right: {
          heading: 'Queue — FIFO',
          points: [
            'enqueue at the back, dequeue at the front, both O(1)',
            'Python: collections.deque with append and popleft',
            'Natural for scheduling, buffering, level-by-level traversal',
            'Preserves the order of whatever passes through it',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Choosing an implementation in Python',
        columns: ['Need', 'Use', 'Why not the alternative'],
        rows: [
          ['Stack', '`list` with `append` / `pop`', 'Both are O(1) at the end; deque works too but adds overhead for no benefit'],
          ['Queue', '`collections.deque` with `append` / `popleft`', '`list.pop(0)` is O(n), making the whole loop O(n^2)'],
          ['Bounded buffer', '`deque(maxlen=n)`', 'Evicts from the far end automatically in O(1); a list would need an O(n) slice'],
          ['Priority order', '`heapq`', 'A queue serves by arrival, not by priority — that is a heap, covered later'],
          ['Thread-safe queue', '`queue.Queue`', '`deque` is atomic for single appends but not for check-then-act sequences across threads'],
        ],
      },
    ],

    formalDefinition:
      'A stack is an abstract data type supporting push(x), pop() and peek() under a last-in-first-out discipline, where pop returns the most recently pushed element not yet removed. A queue supports enqueue(x) and dequeue() under first-in-first-out discipline, where dequeue returns the least recently enqueued element not yet removed. Both admit implementations in which every operation runs in O(1) worst-case or amortised time and the container occupies O(n) space.',

    math: {
      intuition:
        'The interesting piece of arithmetic here is not the O(1) operations but the monotonic stack. It contains a while loop inside a for loop, which looks quadratic, yet the total work is linear — because each element is pushed exactly once and popped at most once, so the inner loop can execute at most n times across the whole run, not n times per iteration. This is amortised analysis again, in a different disguise.',
      formulas: [
        {
          latex: 'T_{\\text{push}} = T_{\\text{pop}} = T_{\\text{peek}} = O(1)',
          name: 'Stack and queue operation costs',
          meaning: 'The restricted interface is what guarantees constant time: nothing is searched and nothing is shifted.',
          category: 'complexity',
          variables: [
            { symbol: 'T_{\\text{push}}', meaning: 'Cost of adding an element — amortised O(1) on a dynamic array, worst case O(1) on a deque' },
            { symbol: 'T_{\\text{pop}}', meaning: 'Cost of removing from the designated end' },
          ],
        },
        {
          latex: '\\text{total inner iterations} \\le n \;\\Rightarrow\; T_{\\text{monotonic}}(n) = O(n)',
          name: 'Why a monotonic stack is linear',
          meaning: 'Each element enters the stack once and leaves once, bounding all inner-loop work by n across the entire algorithm.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of elements processed' },
            { symbol: '\\text{total inner iterations}', meaning: 'The sum of all pops over the whole run, not per outer iteration' },
          ],
        },
      ],
      derivation: [
        'Consider the outer loop over n elements, each of which is pushed exactly once.',
        'The inner while loop only ever pops elements that are already on the stack.',
        'An element can be popped at most once, because it is never pushed again.',
        'Therefore the total number of inner iterations across the whole algorithm is at most n.',
        'Total work is n pushes plus at most n pops plus n constant-time comparisons: O(n).',
        'The worst case for any single outer iteration is still O(n) pops, which is why this must be argued by amortisation rather than by inspecting one iteration.',
      ],
    },

    workedExample: {
      title: 'Validating nested brackets with a stack, character by character',
      setup:
        'Check whether "{[()]}" is correctly nested. Push every opening bracket; on a closing bracket, pop and verify the pair matches. The string is balanced only if every pop matches and the stack is empty at the end. n = 6.',
      steps: [
        { label: 'Read "{"', detail: 'Opening bracket: push it. Stack: ["{"].' },
        { label: 'Read "["', detail: 'Opening bracket: push. Stack: ["{", "["].' },
        { label: 'Read "("', detail: 'Opening bracket: push. Stack: ["{", "[", "("].' },
        { label: 'Read ")"', detail: 'Closing bracket: pop "(" and check it is the partner of ")". It is. Stack: ["{", "["].' },
        { label: 'Read "]"', detail: 'Closing bracket: pop "[", which matches "]". Stack: ["{"].' },
        { label: 'Read "}"', detail: 'Closing bracket: pop "{", which matches "}". Stack: [].' },
        { label: 'End of string', detail: 'The stack is empty, so every opening bracket was closed in the right order. Return True.' },
        { label: 'Failure mode A', detail: 'For "{[}]", reading "}" pops "[", which is not its partner — mismatch detected immediately, in O(1).' },
        { label: 'Failure mode B', detail: 'For "{[", the loop finishes with the stack holding two unclosed brackets, so the final emptiness check returns False. Omitting that check is the most common bug in this problem.' },
        { label: 'Failure mode C', detail: 'For ")", the first closing bracket finds an empty stack, so popping must be guarded — otherwise IndexError.' },
      ],
      conclusion:
        'Time complexity is O(n): each character is examined once and performs at most one push and one pop, each O(1). Space complexity is O(n) in the worst case, reached by a string of n opening brackets such as "((((((", which are all on the stack simultaneously. No other structure solves this as cleanly, because the defining property of correct nesting — the most recently opened bracket must close first — is precisely LIFO discipline. This is why stacks appear in every parser, every JSON reader and every compiler.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Stack and queue, with the trap in between',
        runnable: true,
        code: `from collections import deque
import time

stack = []                 # a list IS a stack: append/pop are O(1)
for x in [1, 2, 3]:
    stack.append(x)
print("stack pops:", stack.pop(), stack.pop())

queue = deque()            # deque IS a queue: append/popleft are O(1)
for x in [1, 2, 3]:
    queue.append(x)
print("queue pops:", queue.popleft(), queue.popleft())

n = 200_000
start = time.perf_counter()
q = list(range(n))
while q:
    q.pop(0)               # O(n) per call -> O(n^2) overall
list_time = time.perf_counter() - start

start = time.perf_counter()
d = deque(range(n))
while d:
    d.popleft()            # O(1) per call -> O(n) overall
deque_time = time.perf_counter() - start
print(f"list as queue {list_time:.3f}s   deque as queue {deque_time:.3f}s")`,
        output: `stack pops: 3 2
queue pops: 1 2
list as queue 3.612s   deque as queue 0.012s`,
        explanation:
          'The stack is free: a Python list already does exactly the right thing at its end. The queue is where people go wrong, because `pop(0)` looks symmetrical with `pop()` but shifts every remaining element. This single substitution is the most common performance bug in hand-written breadth-first search, and it turns an O(V + E) traversal into an O(V^2 + E) one.',
      },
      {
        language: 'python',
        title: 'Bracket validation and expression evaluation',
        runnable: true,
        code: `def is_balanced(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack           # unclosed brackets remain -> False

def eval_rpn(tokens):
    """Reverse Polish notation: '3 4 + 2 *' -> 14."""
    stack = []
    ops = {"+": lambda a, b: a + b, "-": lambda a, b: a - b,
           "*": lambda a, b: a * b, "/": lambda a, b: int(a / b)}
    for t in tokens:
        if t in ops:
            b, a = stack.pop(), stack.pop()    # order matters for - and /
            stack.append(ops[t](a, b))
        else:
            stack.append(int(t))
    return stack.pop()

print(is_balanced("{[()]}"), is_balanced("{[}]"), is_balanced("{["))
print(eval_rpn(["3", "4", "+", "2", "*"]))`,
        output: `True False False
14`,
        explanation:
          'Both functions are O(n) time and O(n) space, and both rely on the same insight: the element you need next is always the most recent one you have not yet consumed. Note the two guards in `is_balanced` — `not stack` catches a closing bracket with nothing open, and `return not stack` catches openings that were never closed. Note also the `b, a = stack.pop(), stack.pop()` ordering in the evaluator: operands come off in reverse, which is the bug that makes subtraction and division silently wrong if you get it the wrong way round.',
      },
      {
        language: 'python',
        title: 'Monotonic stack: next greater element in one pass',
        runnable: true,
        code: `def next_greater(nums):
    """For each element, the next element to its right that is larger."""
    result = [-1] * len(nums)
    stack = []                       # holds indices, values decreasing
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x  # x is the answer for that waiting index
        stack.append(i)
    return result

nums = [2, 1, 2, 4, 3]
print(next_greater(nums))

# Trace: i=0 push 0. i=1 push 1. i=2 pop 1 (1<2) -> result[1]=2, push 2.
# i=3 pop 2 and 0 (both <4) -> result[2]=4, result[0]=4, push 3.
# i=4 push 4. Stack leftovers 3 and 4 keep their -1.`,
        output: `[4, 2, 4, -1, -1]`,
        explanation:
          'The nested while loop makes this look quadratic, but each index is pushed exactly once and popped at most once, so the total pops across the whole run are bounded by n: the algorithm is O(n) time and O(n) space. The stack holds indices whose answers are still unknown, in decreasing value order, which is why the invariant is called monotonic. This pattern solves a surprising range of problems — daily temperatures, largest rectangle in a histogram, stock spans — and recognising it is worth far more than memorising any one of them.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The Python interpreter itself',
        usage:
          'Every function call pushes a frame onto the call stack and every return pops one; the traceback you read after an exception is that stack printed out, innermost frame last.',
      },
      {
        context: 'Data loading in PyTorch',
        usage:
          'A DataLoader with workers puts prepared batches on a FIFO queue while the training loop consumes from the other end, so GPU work overlaps with CPU preprocessing. The queue depth is the `prefetch_factor` knob.',
      },
      {
        context: 'Tokenisers and JSON parsers',
        usage:
          'Any parser for a nested format keeps a stack of open constructs. The error "unexpected end of input" is literally the observation that the stack was not empty when the input ran out.',
      },
    ],

    projectConnections: [
      { tool: 'collections.deque', role: 'The correct queue in Python, and a bounded buffer via maxlen — the default choice for BFS frontiers and sliding windows.' },
      { tool: 'queue.Queue / multiprocessing.Queue', role: 'Thread- and process-safe FIFO queues used to decouple producers from consumers in data pipelines.' },
      { tool: 'Celery / RabbitMQ', role: 'Distributed task queues: the same FIFO discipline, with the queue living on another machine and surviving restarts.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `list.pop(0)` as a queue',
        why: 'Removing from the front shifts all remaining elements, so each dequeue is O(n) and a full traversal becomes O(n^2). On 200,000 items that is seconds instead of milliseconds.',
        fix: 'Use `collections.deque` with `popleft()`. If you are writing BFS, this is the single most important line to get right.',
      },
      {
        mistake: 'Popping without checking that the stack is non-empty',
        why: 'A closing bracket or an operator arriving with an empty stack raises IndexError, which surfaces as a crash on malformed input rather than a clean False.',
        fix: 'Guard with `if not stack: return False` before popping, and treat an unexpected empty stack as an input validity signal rather than an exception.',
      },
      {
        mistake: 'Forgetting the final emptiness check in bracket matching',
        why: 'A string of only opening brackets never triggers a mismatch, so the loop completes and the function wrongly returns True.',
        fix: 'End with `return not stack`. Anything left on the stack was opened and never closed.',
      },
      {
        mistake: 'Assuming a monotonic stack must be quadratic because it has a nested loop',
        why: 'Counting loop nesting rather than total operations gives the wrong answer; the inner loop is bounded across the whole run, not per outer iteration.',
        fix: 'Count how many times each element can be pushed and popped. If it is once each, the algorithm is linear no matter how the loops are nested.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'How would you implement a queue in Python, and why not with a list?',
        answer:
          'With collections.deque: append to add at the back and popleft to remove from the front, both O(1) worst case because a deque is a doubly linked list of fixed-size blocks and neither end requires shifting. A list can serve as a queue only by using pop(0), which shifts every remaining element left and is therefore O(n) per dequeue, making a full drain O(n^2). A list is the right choice for a stack, though, since append and pop at the end are both O(1) amortised. If the queue crosses threads or processes, use queue.Queue instead, because deque operations are only individually atomic and a check-then-pop sequence is not.',
        followUp:
          'A good follow-up is implementing a queue using two stacks, where amortised O(1) dequeue comes from only transferring when the output stack is empty.',
      },
      {
        level: 'intermediate',
        question: 'Explain the monotonic stack pattern and prove it is O(n).',
        answer:
          'You keep a stack of elements whose answers are still pending, maintained in sorted order in one direction. When a new element arrives, you pop every stacked element that the new one resolves — for next-greater, everything smaller than it — and record the answer for each, then push the new element. The proof of linearity is an amortisation argument: each element is pushed exactly once and can be popped at most once, so the total number of inner-loop iterations over the entire run is bounded by n, even though a single outer iteration can pop O(n) items. Total work is therefore O(n) time and O(n) space. It solves next greater element, daily temperatures, stock span and largest rectangle in a histogram with the same skeleton.',
        followUp:
          'Being asked to adapt it to next smaller element tests whether the candidate understood the invariant or memorised the comparison direction.',
      },
      {
        level: 'ml-engineer',
        question: 'Where does queueing show up in a machine-learning serving system, and what does queue depth tell you?',
        answer:
          'Requests arriving faster than the model can serve them wait in a FIFO queue in front of the inference workers, and batching systems deliberately hold requests briefly to assemble a larger batch for GPU efficiency. Queue depth is the key observability signal: a stable depth means arrival rate matches service rate, while a monotonically growing depth means the system is saturated and latency will rise without bound regardless of how much buffering you add, since a queue converts an overload into latency rather than removing it. The practical responses are to shed load, to cap the queue and fail fast, or to add capacity — and the batching knob is a direct latency-for-throughput trade of exactly the kind this domain keeps returning to.',
        followUp:
          'Mentioning Little\'s law — average latency equals queue length divided by throughput — connects the data structure to capacity planning.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Implement a queue using two stacks with amortised O(1) dequeue. Explain why it is amortised rather than worst case.',
        hint: 'Push onto an inbox stack; only move everything to an outbox when the outbox is empty.',
        solution:
          'class Queue:\n    def __init__(self):\n        self.inbox, self.outbox = [], []\n    def enqueue(self, x):\n        self.inbox.append(x)\n    def dequeue(self):\n        if not self.outbox:\n            while self.inbox:\n                self.outbox.append(self.inbox.pop())\n        return self.outbox.pop()\n\nReversing the inbox into the outbox restores arrival order. A single dequeue can cost O(n) when it triggers a transfer, but each element is moved between the stacks exactly once in its lifetime, so over any sequence of k operations the total work is O(k): amortised O(1). It is not worst-case O(1) precisely because that one transfer is unavoidable and linear when it happens — the same distinction as dynamic array resizing.',
      },
      {
        prompt: 'Given daily temperatures [73, 74, 75, 71, 69, 72, 76], return for each day how many days you must wait for a warmer temperature. State the complexity.',
        hint: 'Keep a stack of indices whose answers are still unknown, with decreasing temperatures.',
        solution:
          'def daily_temperatures(t):\n    res = [0] * len(t)\n    stack = []\n    for i, x in enumerate(t):\n        while stack and t[stack[-1]] < x:\n            j = stack.pop()\n            res[j] = i - j\n        stack.append(i)\n    return res\n\nThe answer is [1, 1, 4, 2, 1, 1, 0]. It is the monotonic stack with the result recorded as an index difference instead of a value. Time is O(n) because each index is pushed and popped at most once; space is O(n) for the stack, which in the worst case of a strictly decreasing sequence holds every index. The brute-force alternative scans forward from every day and is O(n^2).',
      },
      {
        prompt: 'A colleague reports that their breadth-first search over a 100,000-node graph takes several minutes. What is the most likely single-line cause?',
        hint: 'What structure are they most likely using for the frontier?',
        solution:
          'They are almost certainly using a list with `frontier.pop(0)` as the queue. Each dequeue shifts every remaining element, so with a frontier that can hold tens of thousands of nodes, the traversal degrades from O(V + E) to something closer to O(V^2 + E). Replacing the list with `collections.deque` and `pop(0)` with `popleft()` restores linear behaviour and typically takes the runtime from minutes to well under a second. The second candidate, if that is not it, is a `visited` list instead of a `visited` set, which makes every membership test O(V).',
      },
    ],

    quiz: [
      {
        id: 'DSA-006-q1',
        type: 'mcq',
        concept: 'choosing a queue implementation',
        prompt: 'Which is the correct way to implement a FIFO queue in Python?',
        options: [
          '`collections.deque` with `append` and `popleft`',
          'A list with `append` and `pop(0)`',
          'A list with `insert(0, x)` and `pop()`',
          'A set, adding and removing arbitrary elements',
        ],
        answerIndex: 0,
        explanation:
          'Both deque ends are O(1). The two list-based options each perform an O(n) shift on every operation, turning a linear traversal into a quadratic one. A set has no ordering at all.',
      },
      {
        id: 'DSA-006-q2',
        type: 'code-output',
        language: 'python',
        concept: 'LIFO versus FIFO',
        prompt: 'What does this print?',
        code: `from collections import deque
s, q = [], deque()
for x in [1, 2, 3]:
    s.append(x); q.append(x)
print(s.pop(), q.popleft())`,
        options: ['3 1', '1 3', '3 3', '1 1'],
        answerIndex: 0,
        explanation:
          'The stack returns the last value pushed (3) and the queue returns the first value enqueued (1). That single difference is the whole distinction between LIFO and FIFO.',
      },
      {
        id: 'DSA-006-q3',
        type: 'truefalse',
        concept: 'monotonic stack complexity',
        prompt: 'An algorithm with a while loop nested inside a for loop must be at least O(n^2).',
        answer: false,
        explanation:
          'Only if the inner loop can run O(n) times per outer iteration. In a monotonic stack each element is pushed once and popped at most once, bounding all inner iterations by n across the whole run — so it is O(n).',
      },
      {
        id: 'DSA-006-q4',
        type: 'debug',
        language: 'python',
        concept: 'bracket validation edge case',
        prompt: 'This returns True for the input "(((", which is wrong. What is missing?',
        code: `def is_balanced(s):
    stack = []
    for ch in s:
        if ch == "(":
            stack.append(ch)
        elif ch == ")":
            if not stack:
                return False
            stack.pop()
    return True`,
        options: [
          'The final line should be `return not stack`, since unclosed brackets remain on it',
          'The stack should be a deque rather than a list',
          '`stack.append(ch)` should push the closing bracket instead',
          'The loop should iterate over the string in reverse',
        ],
        answerIndex: 0,
        explanation:
          'Nothing ever detects openings that were never closed. Returning `not stack` requires the stack to be empty at the end, which is the other half of the balance condition.',
      },
      {
        id: 'DSA-006-q5',
        type: 'match',
        concept: 'matching structure to problem',
        prompt: 'Match each problem to the discipline that fits it naturally.',
        pairs: [
          { left: 'Validating nested brackets', right: 'Stack (LIFO)' },
          { left: 'Shortest path in an unweighted graph', right: 'Queue (FIFO)' },
          { left: 'Undo history in an editor', right: 'Stack (LIFO)' },
          { left: 'Buffering batches between a loader and a trainer', right: 'Queue (FIFO)' },
        ],
        explanation:
          'Anything whose natural order is reverse-of-arrival — nesting, undo, backtracking — is a stack. Anything that must preserve arrival order — fairness, level-by-level exploration, buffering — is a queue.',
      },
      {
        id: 'DSA-006-q6',
        type: 'explain',
        concept: 'why restricted interfaces help',
        prompt: 'Why is it useful to reach for a stack or a queue rather than just using a list and tracking indices yourself?',
        rubric: [
          'Says the restricted interface guarantees O(1) operations because nothing is searched or shifted',
          'Says the discipline matches the problem\'s natural processing order, making the code shorter and less error-prone',
          'Gives an example where the choice of discipline changes the algorithm, such as DFS versus BFS',
        ],
        sampleAnswer:
          'Restricting where you may add and remove is what makes every operation constant time: nothing has to be searched for and nothing has to shift. Beyond the complexity, the restriction encodes the problem. If the rule is "the most recently opened thing must be closed first", a stack enforces that for you, and the bracket-matching code becomes six obvious lines instead of an index-juggling loop with off-by-one risks. The choice between the two is not cosmetic either: running a graph traversal with a stack gives depth-first order and with a queue gives breadth-first order, and only the queue version finds shortest paths in an unweighted graph. Choosing the discipline is choosing the algorithm.',
        explanation:
          'The point being assessed is that the data structure carries the ordering rule, so picking the right one is a design decision rather than a container preference.',
      },
    ],

    flashcards: [
      { front: 'Stack versus queue in one line', back: 'Stack is last-in-first-out (push/pop at one end); queue is first-in-first-out (add at back, remove at front).' },
      { front: 'Correct Python stack and queue', back: 'Stack: a list with append/pop. Queue: collections.deque with append/popleft. Never list.pop(0).' },
      { front: 'Two checks bracket validation needs', back: 'Guard against popping an empty stack, and require the stack to be empty at the end (`return not stack`).' },
      { front: 'Why is a monotonic stack O(n)?', back: 'Each element is pushed once and popped at most once, so total inner-loop work is bounded by n across the whole run.' },
      { front: 'What is the call stack?', back: 'The interpreter\'s own LIFO stack of function frames; a traceback is that stack printed, and RecursionError is it overflowing.' },
      { front: 'deque(maxlen=n) does what?', back: 'Keeps a bounded buffer: appending past the limit evicts from the opposite end in O(1). Ideal for replay buffers and rolling windows.' },
    ],

    challenge: {
      title: 'A tiny expression evaluator',
      brief:
        'Write an evaluator for arithmetic expressions given as strings, supporting +, -, *, / and parentheses with correct precedence, using two stacks: one for numbers and one for operators. Handle multi-digit numbers and arbitrary whitespace. Include tests for "2 + 3 * 4", "(2 + 3) * 4" and a malformed input such as "2 + (3", which must fail cleanly rather than raise IndexError, and state the time and space complexity of your solution.',
      language: 'python',
      acceptanceCriteria: [
        'Precedence is handled by comparing operators against the operator stack, not by string rewriting',
        'Parentheses are matched using the stack, and unmatched ones produce a clear error',
        'Multi-digit numbers and whitespace are parsed correctly',
        'The write-up states O(n) time and O(n) space with a one-sentence justification',
      ],
      starterCode: 'PRECEDENCE = {"+": 1, "-": 1, "*": 2, "/": 2}\n\ndef evaluate(expr):\n    numbers, operators = [], []\n    # scan the expression once, pushing and resolving as precedence requires\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone the difference between a stack and a queue, and help them decide which one a given problem needs.',
      mustCover: [
        'A stack removes the most recently added item; a queue removes the oldest',
        'Both restrict access to designated ends, which is what makes every operation O(1)',
        'Stacks fit nesting, undo and backtracking; queues fit arrival-order processing and level-by-level exploration',
        'In Python, use a list for a stack and collections.deque for a queue, because list.pop(0) is O(n)',
      ],
      bonusSignals: ['notes that swapping the two turns DFS into BFS', 'mentions the call stack as a real stack', 'gives the bracket-matching example'],
      sampleExplanation:
        'A stack is a pile: you add to the top and you take from the top, so the last thing in is the first thing out. A queue is a line: you join at the back and you are served from the front, so the first thing in is the first thing out. Both refuse to let you reach into the middle, and that refusal is what makes them fast — there is never anything to search for or shift along, so every operation costs the same tiny amount. Choosing between them is really choosing an order of work. If the problem is about nesting — closing brackets, undoing edits, retreating out of a dead end — the thing you need next is always the most recent one, so it is a stack. If the problem is about handling things in the order they arrived, or exploring a network one ring at a time, it is a queue. One practical warning for Python: a list makes a perfect stack, but using it as a queue with pop(0) is slow, because removing from the front shifts everything else along. Use collections.deque for queues.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-007',
    domain: 'DSA',
    module: 'Hashing',
    topic: 'Constant-time lookup by key',
    title: 'Hash Tables',
    slug: 'hash-tables',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DSA-001', 'DSA-003'],
    related: ['DSA-001', 'DSA-003', 'DSA-004'],
    tags: ['hash-table', 'dict', 'collisions', 'load-factor', 'hashing'],

    learningObjectives: [
      'Explain how a hash function plus array indexing turns a key into a location in constant time',
      'Describe collisions and the two standard resolutions, chaining and open addressing, and say which CPython uses',
      'Define load factor and explain why a table resizes before it fills',
      'Justify why dictionary operations are O(1) on average but O(n) in the worst case, and what makes an object usable as a key',
    ],

    terminology: [
      {
        term: 'Hash function',
        definition:
          'A function mapping an arbitrary key to a fixed-size integer, quickly and deterministically, spreading distinct keys as evenly as possible over the output range.',
        simple: 'A recipe that turns any label into a number.',
      },
      {
        term: 'Bucket (slot)',
        definition:
          'One position in the underlying array. The index is derived from the hash, usually as hash(key) modulo the table size.',
        simple: 'The numbered pigeonhole the recipe sends you to.',
      },
      {
        term: 'Collision',
        definition:
          'Two distinct keys mapping to the same bucket. Unavoidable, since there are vastly more possible keys than buckets, so every hash table needs a resolution strategy.',
        simple: 'Two different labels being sent to the same pigeonhole.',
      },
      {
        term: 'Load factor',
        definition:
          'The ratio of stored entries to table capacity, written alpha = n/m. As it rises, collisions and probe lengths rise with it, so implementations resize before it gets high.',
        simple: 'How full the shelf is. The fuller it gets, the more shuffling every lookup needs.',
      },
      {
        term: 'Hashability',
        definition:
          'An object can be a key only if it has a hash value that never changes during its lifetime and is consistent with equality. Lists and dicts are therefore unhashable; strings, numbers and tuples of hashables are not.',
        simple: 'A label can only be used if it will never secretly rewrite itself.',
      },
    ],

    simpleExplanation:
      "Looking something up in a list means checking the entries one by one until you find it. A hash table does something cleverer: it runs the key through a function that turns it into a number, and uses that number to decide which slot of an array the value belongs in. Storing and retrieving then take the same tiny amount of work no matter how much data there is, because you compute the location instead of searching for it. The complication is that two different keys can land on the same slot, which is called a collision, and every hash table needs a plan for that — either keep a little list in each slot, or go looking for the next free slot nearby. Collisions are rare when the table has plenty of room, so the implementation watches how full it is and quietly moves everything into a bigger array before crowding sets in. That is why looking up a Python dictionary key is effectively instant, and also why, in a carefully constructed worst case where every key collides, it degrades to scanning everything.",

    whyItExists:
      'Sorted structures answer "where is this key?" in O(log n) and unsorted ones in O(n), but a great many programs need lookup by name millions of times. Hashing converts the key itself into an address, removing the search entirely and making lookup independent of how much data is stored.',

    analogy: {
      scenario:
        "Imagine a cloakroom with a hundred numbered hooks and a rule for choosing one: add up the letters of the owner's surname and take the remainder when divided by a hundred. To hang a coat you compute the number and walk straight to that hook; to collect it you compute the same number and walk straight back. Nobody searches the rail. Occasionally two surnames produce the same number, so the attendant either hangs both coats on that hook and checks the labels, or walks to the next free hook and remembers to check onwards when collecting. If the cloakroom gets more than about two-thirds full, the attendant opens a bigger room and rehangs everything, because in a crowded room the walk to a free hook stops being short.",
      mapping: [
        { from: 'The letter-summing rule', to: 'The hash function' },
        { from: 'The hook number it produces', to: 'The bucket index, hash(key) modulo capacity' },
        { from: 'Walking straight to a numbered hook', to: 'O(1) average lookup — computing a location rather than searching' },
        { from: 'Two surnames giving the same number', to: 'A collision' },
        { from: 'Several coats on one hook, checked by label', to: 'Separate chaining, plus the equality check that confirms the right key' },
        { from: 'Moving to a bigger room at two-thirds full', to: 'Resizing when the load factor exceeds a threshold' },
      ],
      bridge:
        'The cloakroom makes the guarantee and its limit visible at the same time. Lookup is constant because the hook is computed, not searched for — but only while collisions stay rare, which is exactly what the load-factor rule preserves. If the hash were terrible and sent every surname to hook 7, the attendant would be back to searching a rail of a hundred coats, which is precisely the O(n) worst case.',
      limitations:
        'The analogy suggests keys are stored in hook order. They are not: a hash table has no useful ordering, and iteration order in CPython reflects insertion order only because dicts keep a separate compact array of entries, not because the buckets are sorted.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Hashing, collisions and probing',
        caption: 'Insert keys and watch which bucket each lands in, and what happens when two coincide.',
        widget: 'hash-table',
      },
      {
        kind: 'flow',
        title: 'What `d["learning_rate"]` actually does',
        caption: 'Five steps, each constant time in the common case.',
        steps: [
          { label: 'Hash the key', detail: 'hash("learning_rate") produces a 64-bit integer. For strings the value is computed once and cached on the object.' },
          { label: 'Reduce to an index', detail: 'The low bits of the hash are masked to the table size, giving a bucket number.' },
          { label: 'Probe the bucket', detail: 'If it is empty, the key is absent — raise KeyError. Otherwise compare the stored hash first, which is a cheap integer test.' },
          { label: 'Confirm with equality', detail: 'If the hashes match, compare the keys with `==`. Equal hashes do not guarantee equal keys, so this check is what makes the answer correct.' },
          { label: 'Return, or keep probing', detail: 'On a match, return the value. On a mismatch, move to the next probe position and repeat until a match or an empty slot is found.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Two ways to resolve a collision',
        caption: 'Both are in wide use; CPython chose the second.',
        left: {
          heading: 'Separate chaining',
          points: [
            'Each bucket holds a small list of entries',
            'Simple to implement; deletion is trivial',
            'Expected probe length is 1 + alpha, tolerable even above alpha = 1',
            'Costs a pointer per entry and scatters memory, hurting cache behaviour',
          ],
        },
        right: {
          heading: 'Open addressing (CPython)',
          points: [
            'All entries live in the array; a collision probes another slot',
            'Excellent cache behaviour — no pointer chasing',
            'Degrades sharply as alpha approaches 1, so it must resize earlier (CPython at 2/3)',
            'Deletion needs a tombstone marker so probe chains are not broken',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Dictionary operation costs',
        columns: ['Operation', 'Average', 'Worst case', 'Note'],
        rows: [
          ['`d[k]` lookup', 'O(1)', 'O(n)', 'Worst case needs every key to collide — adversarial, not accidental'],
          ['`d[k] = v` insert', 'O(1) amortised', 'O(n)', 'The occasional resize rehashes every entry'],
          ['`del d[k]`', 'O(1)', 'O(n)', 'Leaves a tombstone in an open-addressed table'],
          ['`k in d`', 'O(1)', 'O(n)', 'The single most valuable constant-time operation in everyday Python'],
          ['Iterating `for k in d`', 'O(n)', 'O(n)', 'Insertion order since Python 3.7, guaranteed by the language'],
          ['`len(d)`', 'O(1)', 'O(1)', 'Stored, not counted'],
        ],
      },
    ],

    formalDefinition:
      'A hash table stores key-value pairs in an array of m buckets, placing a pair at an index derived from h(key) where h is a hash function mapping keys to integers. Under the simple uniform hashing assumption, in which each key is equally likely to map to any bucket independently of the others, the expected cost of search, insertion and deletion is O(1 + alpha) with alpha = n/m; maintaining alpha below a constant by resizing therefore yields expected O(1) operations, while the worst case, in which all keys collide, is O(n).',

    math: {
      intuition:
        'The whole guarantee rests on keeping the table roomy. If a fraction alpha of the slots are occupied and keys are spread evenly, then a probe finds an empty slot with probability 1 - alpha, so the expected number of probes is 1/(1 - alpha). At alpha = 0.5 that is two probes; at 0.9 it is ten; at 0.99 it is a hundred. This is why an implementation resizes at a fixed threshold rather than waiting until the table is full — the cost does not creep up, it explodes.',
      formulas: [
        {
          latex: '\\alpha = \\frac{n}{m}',
          name: 'Load factor',
          meaning: 'The fraction of the table that is occupied — the single number that controls performance.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of stored entries' },
            { symbol: 'm', meaning: 'Number of buckets allocated' },
            { symbol: '\\alpha', meaning: 'Load factor; CPython resizes when it exceeds 2/3' },
          ],
        },
        {
          latex: 'E[\\text{probes}_{\\text{chaining}}] = 1 + \\alpha, \\qquad E[\\text{probes}_{\\text{open}}] \\approx \\frac{1}{1 - \\alpha}',
          name: 'Expected probe counts',
          meaning: 'Chaining degrades linearly with load; open addressing degrades hyperbolically and must be kept well below full.',
          category: 'complexity',
          variables: [
            { symbol: '\\alpha', meaning: 'Load factor' },
            { symbol: 'E[\\text{probes}]', meaning: 'Expected number of slots examined for an unsuccessful search' },
          ],
        },
        {
          latex: 'i_0 = h(k) \\bmod m, \\qquad i_{j+1} = (5 i_j + 1 + \\text{perturb}) \\bmod m',
          name: 'CPython probe sequence (simplified)',
          meaning: 'When a slot is taken, the next index is derived from the previous one and the unused high bits of the hash, which spreads clustered keys apart.',
          category: 'complexity',
          variables: [
            { symbol: 'h(k)', meaning: 'The 64-bit hash of the key' },
            { symbol: 'm', meaning: 'Table size, always a power of two, so the modulo is a bit mask' },
            { symbol: '\\text{perturb}', meaning: 'A shifting copy of the full hash, mixing in bits the initial mask discarded' },
          ],
        },
      ],
      derivation: [
        'Assume keys are distributed uniformly and independently over m buckets, and n entries are stored.',
        'The probability that a given probe lands on an occupied slot is alpha = n/m.',
        'For an unsuccessful search under open addressing, probes continue until an empty slot is found.',
        'The number of probes is geometrically distributed with success probability 1 - alpha.',
        'Its expectation is 1/(1 - alpha), which is a constant provided alpha is bounded away from 1.',
        'Resizing whenever alpha exceeds a fixed threshold therefore guarantees expected O(1) operations, with the rehash cost of O(n) amortised over the n insertions that filled the table.',
      ],
    },

    workedExample: {
      title: 'Inserting five keys into an eight-bucket table',
      setup:
        'Use a table with m = 8 buckets, open addressing, and a deliberately simple hash: h(key) = sum of the character codes. The bucket is h(key) mod 8, and on a collision we probe the next slot, wrapping around. Insert "ab", "ba", "cd", "dc" and "ef".',
      steps: [
        { label: 'Insert "ab"', detail: 'h = 97 + 98 = 195. 195 mod 8 = 3. Bucket 3 is empty: store there. Table: {3: "ab"}. Load factor 1/8.' },
        { label: 'Insert "ba"', detail: 'h = 98 + 97 = 195 — the same hash, because this toy function ignores order. 195 mod 8 = 3, which is occupied by "ab". Compare keys: "ab" != "ba", so this is a genuine collision. Probe bucket 4, which is empty: store there. Table: {3: "ab", 4: "ba"}.' },
        { label: 'Insert "cd"', detail: 'h = 99 + 100 = 199. 199 mod 8 = 7. Empty: store. Table: {3: "ab", 4: "ba", 7: "cd"}.' },
        { label: 'Insert "dc"', detail: 'h = 199 again. Bucket 7 is occupied by a different key, so probe bucket 0 (wrapping around). Empty: store. Table: {0: "dc", 3: "ab", 4: "ba", 7: "cd"}.' },
        { label: 'Insert "ef"', detail: 'h = 101 + 102 = 203. 203 mod 8 = 3. Occupied by "ab" — collision. Probe 4: occupied by "ba" — still colliding. Probe 5: empty, store. Three probes for one insertion.' },
        { label: 'Load factor check', detail: 'Five entries in eight buckets is alpha = 0.625, just under CPython\'s 2/3 threshold. One more insertion would trigger a resize to sixteen buckets and a rehash of all entries.' },
        { label: 'Lookup "ef"', detail: 'Recompute h = 203, start at bucket 3, compare "ab" (no), probe 4, compare "ba" (no), probe 5, compare "ef" (yes). Three probes — the same path the insertion took, which is why the probe sequence must be deterministic.' },
        { label: 'Lookup a missing key "xy"', detail: 'h = 120 + 121 = 241, 241 mod 8 = 1. Bucket 1 is empty, so the key is absent after exactly one probe. An empty slot is proof of absence, which is why deletions must leave tombstones rather than truly emptying a slot.' },
        { label: 'The adversarial case', detail: 'If all five keys hashed to bucket 3, insertion of the fifth would probe four occupied slots first. With n such keys, every operation becomes O(n).', latex: 'E[\\text{probes}] = \\frac{1}{1 - \\alpha} = \\frac{1}{1 - 0.625} = 2.67' },
      ],
      conclusion:
        'Average time per operation is O(1) — the expected probe count of 2.67 at this load factor does not grow with n, only with alpha, which resizing holds constant. Space is O(m) with m proportional to n, so O(n) overall with a constant factor of roughly 1.5 to account for the deliberate empty slots. The worst case is O(n) per operation and requires either a pathological hash function or an adversary choosing keys, which is why Python randomises string hashes per process by default.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A hash table in forty lines, chaining edition',
        runnable: true,
        code: `class HashMap:
    def __init__(self, capacity=8):
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0

    def _index(self, key):
        return hash(key) % len(self.buckets)

    def put(self, key, value):
        bucket = self.buckets[self._index(key)]
        for i, (k, _) in enumerate(bucket):
            if k == key:                       # equality, not just hash
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self.size += 1
        if self.size / len(self.buckets) > 0.66:
            self._resize()

    def get(self, key, default=None):
        for k, v in self.buckets[self._index(key)]:
            if k == key:
                return v
        return default

    def _resize(self):
        old = self.buckets
        self.buckets = [[] for _ in range(len(old) * 2)]
        self.size = 0
        for bucket in old:
            for k, v in bucket:                # every key is rehashed
                self.put(k, v)

m = HashMap()
for i, word in enumerate(["alpha", "beta", "gamma", "delta", "epsilon", "zeta"]):
    m.put(word, i)
print(m.get("gamma"), m.get("missing", -1), m.size, len(m.buckets))
print("bucket occupancy:", [len(b) for b in m.buckets])`,
        output: `2 -1 6 16
bucket occupancy: [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0]`,
        explanation:
          'Two details carry the whole idea. The hash only chooses a bucket; the `k == key` comparison is what makes the answer correct, because distinct keys can share a hash. And `_resize` must rehash every entry rather than copying buckets across, since the bucket index depends on the table size — this is the O(n) step that makes insertion amortised rather than worst-case O(1). Exact occupancy varies between runs because CPython randomises string hashing per process.',
      },
      {
        language: 'python',
        title: 'What makes an object usable as a key',
        runnable: true,
        code: `print(hash("model"), hash((1, 2)), hash(3.0) == hash(3))

try:
    {[1, 2]: "value"}
except TypeError as e:
    print("TypeError:", e)

# A mutable key breaks the invariant that hash never changes
class Sloppy:
    def __init__(self, tag): self.tag = tag
    def __hash__(self): return hash(self.tag)
    def __eq__(self, other): return self.tag == other.tag

k = Sloppy("a")
d = {k: 1}
k.tag = "b"                      # the hash has now changed underneath the dict
print("lookup after mutation:", d.get(k), "but it is still stored:", list(d.values()))`,
        output: `-6027429987219240105 -3550055125485641917 True
TypeError: unhashable type: 'list'
lookup after mutation: None but it is still stored: [1]`,
        explanation:
          'A key must have a hash that never changes and that agrees with equality. Lists are unhashable precisely because they are mutable, so Python refuses at the point of use rather than corrupting the table later. The Sloppy class shows what the refusal protects you from: after mutating the key, its hash sends the lookup to a different bucket, so the entry becomes unreachable while still occupying space. Note also that hash(3.0) == hash(3), which is deliberate — equal values must hash equally, so 3 and 3.0 are the same dictionary key.',
      },
      {
        language: 'python',
        title: 'The lookup that actually changes your runtime',
        runnable: true,
        code: `import time

vocabulary = [f"token_{i}" for i in range(50_000)]
queries = [f"token_{i}" for i in range(0, 50_000, 5)]

start = time.perf_counter()
hits = sum(1 for q in queries if q in vocabulary)      # O(n) per query
list_time = time.perf_counter() - start

vocab_set = set(vocabulary)                             # one-off O(n)
start = time.perf_counter()
hits2 = sum(1 for q in queries if q in vocab_set)       # O(1) per query
set_time = time.perf_counter() - start

vocab_ids = {w: i for i, w in enumerate(vocabulary)}     # the NLP pattern
print(hits, hits2, vocab_ids["token_42"])
print(f"list membership {list_time:.3f}s   hash membership {set_time:.5f}s")`,
        output: `10000 10000 42
list membership 2.144s   hash membership 0.00131s`,
        explanation:
          'This is the hash table earning its place in daily work. Ten thousand membership tests against a fifty-thousand-element list is 250 million comparisons; against a set it is ten thousand hashes. The dictionary comprehension on the penultimate line is the token-to-id vocabulary that every NLP pipeline builds, and it is a hash table for exactly this reason: a tokeniser performs one lookup per token over billions of tokens, so the difference between O(1) and O(n) there is the difference between feasible and impossible.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Vocabulary lookup in NLP',
        usage:
          'Every tokeniser maps token strings to integer ids through a hash table. A 50,000-entry vocabulary queried billions of times during training only works because each lookup is independent of vocabulary size.',
      },
      {
        context: 'Feature stores and joins',
        usage:
          'A hash join — the default strategy in pandas `merge` and in most query engines — builds a hash table on the smaller table\'s key column, then scans the larger one once, giving O(n + m) instead of the O(n*m) of a nested-loop join.',
      },
      {
        context: 'Deduplicating training data',
        usage:
          'Detecting exact duplicate documents across a corpus is a single pass with a set of content hashes. The same idea at the near-duplicate level becomes MinHash and locality-sensitive hashing.',
      },
    ],

    projectConnections: [
      { tool: 'dict / set', role: 'The everyday hash tables of Python; `collections.Counter` and `defaultdict` are thin conveniences over the same structure.' },
      { tool: 'pandas', role: '`merge`, `groupby` and `drop_duplicates` are all hash-table algorithms under the surface, which is why they are near-linear rather than quadratic.' },
      { tool: 'Feature hashing (the hashing trick)', role: 'scikit-learn\'s `HashingVectorizer` maps features to a fixed number of columns with a hash function, trading occasional collisions for constant memory and no vocabulary pass.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a list where a set or dict is needed for membership',
        why: '`in` on a list is a linear scan, so testing n items against a list of m is O(n*m). The same code with a set is O(n + m).',
        fix: 'Build the set once before the loop. The conversion costs O(m) time and memory, and repays itself after a handful of lookups.',
      },
      {
        mistake: 'Trying to use a list or dict as a dictionary key',
        why: 'Mutable objects are unhashable because their hash would change as they change, silently making entries unreachable. Python raises `TypeError: unhashable type` instead.',
        fix: 'Convert to an immutable equivalent: a tuple for a list, a `frozenset` for a set, or a canonical string form for structured keys.',
      },
      {
        mistake: 'Overriding `__eq__` without `__hash__`',
        why: 'Defining `__eq__` sets `__hash__` to None, so instances become unhashable and cannot go in a set or dict. Overriding `__hash__` alone, inconsistently with equality, is worse: equal objects land in different buckets.',
        fix: 'Define both together so equal objects always hash equally, or use `@dataclass(frozen=True)`, which generates a consistent pair for you.',
      },
      {
        mistake: 'Relying on hash values being stable across runs',
        why: 'CPython randomises string and bytes hashing per process by default, as a defence against algorithmic complexity attacks, so `hash("a")` differs between runs and must never be persisted.',
        fix: 'For a stable fingerprint, use `hashlib.md5`/`sha256` on the encoded bytes, or set PYTHONHASHSEED only when reproducibility of iteration order genuinely matters.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why is dictionary lookup O(1) on average but O(n) in the worst case?',
        answer:
          'The average case assumes the hash spreads keys roughly uniformly, so the expected number of probes depends only on the load factor and not on n — with open addressing it is about 1/(1 - alpha), and resizing keeps alpha below a constant, so the expectation is constant. The worst case is when every key hashes to the same bucket: then the structure degenerates into a linear scan of a single chain or probe sequence, and each operation is O(n). In practice this requires either a badly designed hash function or an adversary choosing keys deliberately, which is why CPython randomises string hashing per process. You should also remember insertion is amortised O(1), because the occasional resize rehashes every entry at O(n) cost, spread over the insertions that filled the table.',
        followUp:
          'Mentioning algorithmic complexity attacks on web frameworks, and hash randomisation as the mitigation, shows the security dimension.',
      },
      {
        level: 'intermediate',
        question: 'What must be true of an object for it to be a dictionary key, and why?',
        answer:
          'It must be hashable: it needs a `__hash__` that returns the same value for the object\'s whole lifetime, and that value must be consistent with `__eq__`, so any two objects that compare equal hash equally. The reason is that the table finds an entry by recomputing the hash and walking to that bucket; if the hash changed after insertion, the entry would be stranded in a bucket nobody will look in, and if equal objects hashed differently, the same logical key could be stored twice. Mutable built-ins are therefore unhashable by design, and Python enforces this at insertion time with a TypeError. Immutability is the easy way to satisfy the requirement, which is why tuples of hashables are fine and lists are not.',
        followUp:
          'The standard follow-up is why defining `__eq__` alone makes a class unhashable, and how `@dataclass(frozen=True)` solves it.',
      },
      {
        level: 'ml-engineer',
        question: 'Explain the hashing trick and when you would accept its collisions.',
        answer:
          'Instead of building a vocabulary that maps each feature name to a column index, you hash the feature name directly into a fixed number of columns, typically 2^18 or 2^20. It removes the vocabulary pass entirely, so features can be processed in a single streaming pass with constant memory, and it handles unseen features at serving time without a retraining step or an out-of-vocabulary bucket. The cost is that distinct features can collide into the same column, which is a small amount of added noise in the model. That is acceptable when the feature space is huge and sparse — text n-grams, ad-tech categorical crosses — because the number of columns can be made large enough that collisions among frequent features are rare, and linear models are fairly robust to the resulting noise. It is not acceptable when you need to interpret coefficients, because a collided column no longer corresponds to one feature.',
        followUp:
          'Adding that a signed hash can make collisions cancel in expectation rather than accumulate shows genuine depth.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'A dict holds a million entries. Explain why `d["key"]` does not get slower than it was at a thousand entries, and what would make it slower.',
        hint: 'Which quantity does the probe count depend on?',
        solution:
          'The expected probe count depends only on the load factor alpha = n/m, not on n itself. Because the table doubles its capacity whenever alpha exceeds two-thirds, alpha oscillates within a fixed band forever, so the expected work per lookup is the same at a million entries as at a thousand. What would make it slower: keys with a poor or colliding hash, which lengthens probe chains regardless of alpha; keys whose `__eq__` or `__hash__` is expensive, since those are called per probe; and memory effects, because a million-entry table no longer fits in cache, so each probe is more likely to be a cache miss — a constant-factor cost that Big-O does not capture but that you can measure.',
      },
      {
        prompt: 'Implement a function that groups a list of words into anagram classes, and state its complexity.',
        hint: 'You need a canonical form of each word that can serve as a hashable key.',
        solution:
          'from collections import defaultdict\n\ndef group_anagrams(words):\n    groups = defaultdict(list)\n    for w in words:\n        groups["".join(sorted(w))].append(w)\n    return list(groups.values())\n\nSorting each word produces a canonical key shared by all its anagrams, and the dictionary does the grouping in one pass. For n words of maximum length k, the cost is O(n * k log k) time — dominated by sorting each word — and O(n * k) space. Using a tuple of 26 letter counts as the key instead removes the log factor, giving O(n * k), which is the answer to expect as a follow-up. The insight being tested is that a hash map turns grouping from a quadratic pairwise comparison into a single pass.',
      },
      {
        prompt: 'Why does `{3: "int", 3.0: "float", True: "bool"}` end up with fewer than three entries? What does it contain?',
        hint: 'What does Python require of the hashes of objects that compare equal?',
        solution:
          'It contains two entries: {3: "float", True: "bool"}.\n\nPython requires that objects which compare equal hash equally, and 3 == 3.0 is True, so hash(3) == hash(3.0) and the dictionary treats them as the same key — the second assignment overwrites the value while keeping the original key object 3. True is a different story: it equals 1, not 3, so it is a separate key that displays as True. The lesson is that numeric keys collide deliberately across int, float and bool whenever their values are equal, which surprises people who use 1 and True as distinct keys in a configuration dictionary and is a real source of silent bugs.',
      },
    ],

    quiz: [
      {
        id: 'DSA-007-q1',
        type: 'mcq',
        concept: 'why lookup is constant time',
        prompt: 'What makes a hash table lookup independent of the number of stored entries?',
        options: [
          'The key is converted into an array index by a hash function, so the location is computed rather than searched for',
          'The entries are kept sorted, so binary search finds them in logarithmic time',
          'The interpreter caches every key that has been looked up before',
          'Entries are stored contiguously, so the CPU can scan them very quickly',
        ],
        answerIndex: 0,
        explanation:
          'Hashing turns the key itself into an address. The only remaining work is confirming the key with an equality check and, occasionally, following a short probe sequence — neither of which grows with n while the load factor is bounded.',
      },
      {
        id: 'DSA-007-q2',
        type: 'truefalse',
        concept: 'collisions',
        prompt: 'A good hash function eliminates collisions entirely.',
        answer: false,
        explanation:
          'There are far more possible keys than buckets, so collisions are unavoidable by the pigeonhole principle. A good hash function only makes them rare and evenly spread; every hash table still needs a resolution strategy.',
      },
      {
        id: 'DSA-007-q3',
        type: 'numeric',
        concept: 'load factor',
        prompt: 'A table has 12 entries stored in 16 buckets. What is its load factor, to two decimal places?',
        answer: 0.75,
        tolerance: 0.01,
        explanation:
          'alpha = n/m = 12/16 = 0.75. This is above CPython\'s two-thirds threshold, so a real dict would already have resized to 32 buckets and rehashed every entry.',
      },
      {
        id: 'DSA-007-q4',
        type: 'debug',
        language: 'python',
        concept: 'hashability',
        prompt: 'This raises `TypeError: unhashable type: \'list\'`. What is the right fix?',
        code: `seen = set()
for row in rows:
    seen.add(row)          # row is a list like [1, 2, 3]`,
        options: [
          'Convert each row to a tuple: `seen.add(tuple(row))`',
          'Use a list instead of a set for `seen`',
          'Call `seen.add(hash(row))` to hash the list manually',
          'Sort each row before adding it',
        ],
        answerIndex: 0,
        explanation:
          'Lists are mutable and therefore unhashable, because their hash could change after insertion. A tuple of the same values is immutable and hashable. Storing bare hashes instead would lose the ability to compare keys and risk silent collisions.',
      },
      {
        id: 'DSA-007-q5',
        type: 'multi',
        concept: 'hash table properties',
        prompt: 'Which statements about Python dictionaries are true? Select all that apply.',
        options: [
          'Lookup is O(1) on average and O(n) in the worst case',
          'Iteration follows insertion order as of Python 3.7',
          'Keys must be hashable',
          'Keys are stored in sorted order so ranges can be queried efficiently',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Hash tables have no ordering by key, so range queries need a sorted structure such as a balanced tree. Insertion order is preserved by a separate compact entry array, which is an implementation choice rather than a property of hashing.',
      },
      {
        id: 'DSA-007-q6',
        type: 'explain',
        concept: 'resizing and amortisation',
        prompt: 'Explain why a hash table resizes before it is full, and why insertion is still amortised O(1) despite the resize.',
        rubric: [
          'Says probe length grows sharply as the load factor approaches 1, roughly as 1/(1 - alpha) for open addressing',
          'Says a resize allocates a larger table and rehashes every entry, costing O(n)',
          'Explains that geometric growth spreads that O(n) cost over the insertions that caused it, keeping the average constant',
        ],
        sampleAnswer:
          'As the table fills, a probe is more likely to land on an occupied slot, and for open addressing the expected number of probes grows like 1/(1 - alpha) — two probes at half full, ten at ninety per cent, a hundred at ninety-nine. Waiting until the table is full would therefore destroy the constant-time guarantee, so implementations resize at a fixed threshold; CPython uses two-thirds. The resize itself is genuinely expensive: a bigger array is allocated and every entry is rehashed, because the bucket index depends on the table size, so it costs O(n). But because the capacity grows by a constant factor, the doublings become rarer exactly as fast as they become more expensive, so the total rehash work over n insertions is a constant multiple of n and the average cost per insertion stays constant. It is the same geometric-series argument that makes list append amortised O(1).',
        explanation:
          'The examinable idea is that the constant-time guarantee is maintained actively by a resizing policy, and that the policy\'s cost is amortised by geometric growth rather than avoided.',
      },
    ],

    flashcards: [
      { front: 'How does a hash table achieve O(1) lookup?', back: 'A hash function converts the key into an array index, so the location is computed rather than searched for; an equality check confirms the key.' },
      { front: 'What is the load factor, and why does it matter?', back: 'alpha = entries / buckets. Expected probes grow like 1/(1 - alpha) for open addressing, so implementations resize once it exceeds a threshold (2/3 in CPython).' },
      { front: 'Chaining versus open addressing', back: 'Chaining keeps a list per bucket, tolerating alpha > 1. Open addressing stores everything in the array with better cache behaviour but must resize earlier. CPython uses open addressing.' },
      { front: 'What makes an object hashable?', back: 'A `__hash__` that never changes during its lifetime and agrees with `__eq__`. Mutable built-ins like list and dict are therefore unhashable.' },
      { front: 'Why is dict lookup O(n) in the worst case?', back: 'If every key collides, the probe sequence or chain degenerates into a linear scan. It needs a bad hash or an adversary, which hash randomisation defends against.' },
      { front: 'Why not persist `hash("abc")` between runs?', back: 'CPython randomises string hashing per process to resist complexity attacks. Use hashlib for a stable fingerprint.' },
    ],

    challenge: {
      title: 'Open addressing with tombstones',
      brief:
        'Implement a hash map using open addressing rather than chaining, with linear probing, a resize at load factor 0.66, and correct deletion using tombstone markers so probe chains are not broken. Add a method that reports the average number of probes per successful lookup, then insert 10,000 keys and show empirically that the average stays roughly constant as the table grows, while a version that never resizes degrades sharply.',
      language: 'python',
      acceptanceCriteria: [
        'Deletion uses a tombstone and a subsequent lookup for a key further along the probe chain still succeeds',
        'Resizing rehashes all live entries and drops tombstones',
        'Average probe count is measured, not asserted, and reported at several table sizes',
        'The no-resize comparison demonstrates the 1/(1 - alpha) blow-up with real numbers',
      ],
      starterCode: 'EMPTY = object()\nTOMBSTONE = object()\n\nclass OpenHashMap:\n    def __init__(self, capacity=8):\n        self.keys = [EMPTY] * capacity\n        self.values = [None] * capacity\n        self.size = 0\n        self.probes = 0\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who uses Python dictionaries every day how they actually work, and why the answer explains both their speed and their restrictions.',
      mustCover: [
        'A hash function turns the key into a number, which is reduced to an index into an array',
        'Two keys can land in the same slot: that is a collision, resolved by chaining or by probing nearby slots',
        'The table keeps spare room and resizes when it gets about two-thirds full, which is what keeps lookups constant',
        'Keys must be hashable — their hash must never change — which is why lists cannot be keys',
      ],
      bonusSignals: ['notes that an equality check is still needed after the hash matches', 'explains the worst case and why it is rare', 'connects it to why set membership is fast'],
      sampleExplanation:
        'When you write d["learning_rate"], Python does not look through the dictionary. It runs the key through a hash function, which turns the text into a large number, then uses some of that number\'s bits to pick a slot in an array — so it walks straight to one place instead of searching. It still compares the key stored there with yours, because two different keys can produce the same slot; that is called a collision, and when it happens Python simply tries the next slot in a fixed sequence until it finds your key or an empty space. Collisions stay rare only while the table has room, so the dictionary watches how full it is and, at about two-thirds, allocates a bigger array and re-files every entry. That is also why keys have to be hashable: the whole scheme depends on being able to recompute the same slot later, so if a key could change after you stored it, the entry would be stranded in a slot nobody will ever look in. Lists can change, so Python refuses them as keys outright rather than letting you corrupt the table.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-008',
    domain: 'DSA',
    module: 'Hashing',
    topic: 'Membership and uniqueness',
    title: 'Sets and Deduplication Patterns',
    slug: 'sets-and-deduplication',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['DSA-007'],
    related: ['DSA-004', 'DSA-007'],
    tags: ['set', 'deduplication', 'membership', 'frozenset', 'data-leakage'],

    learningObjectives: [
      'Explain a set as a hash table without values, and give the complexity of membership, insertion and the set operations',
      'Deduplicate a sequence with and without preserving order, and justify the method chosen',
      'Use set algebra — union, intersection, difference — to replace nested loops',
      'Identify where deduplication protects a machine-learning workflow, particularly against train/test leakage',
    ],

    terminology: [
      {
        term: 'Set',
        definition:
          'An unordered collection of distinct hashable elements, implemented as a hash table that stores only keys. Membership, insertion and deletion are O(1) on average.',
        simple: 'A bag that refuses duplicates and can tell you instantly whether something is inside.',
      },
      {
        term: 'Frozenset',
        definition:
          'An immutable set. Because it cannot change, it is hashable, so it can be an element of another set or a dictionary key.',
        simple: 'A sealed bag, so it can itself be put inside other bags.',
      },
      {
        term: 'Set difference',
        definition:
          'a - b is the elements of a that are not in b. Computed in O(len(a)) by testing each element of a against b, not by comparing every pair.',
        simple: 'What is left of the first pile after removing anything that also appears in the second.',
      },
      {
        term: 'Order-preserving deduplication',
        definition:
          'Removing duplicates while keeping first-occurrence order, achieved with a seen-set and an output list, or in one expression with dict.fromkeys.',
        simple: 'Throwing out repeats but keeping everything else in the order it arrived.',
      },
      {
        term: 'Data leakage (by duplication)',
        definition:
          'The same or near-identical record appearing in both training and evaluation data, which inflates measured performance because the model has effectively memorised the test example.',
        simple: 'Accidentally letting the model see the exam questions while it revises.',
      },
    ],

    simpleExplanation:
      "A set is a dictionary that has given up its values and kept only its keys. That one change makes it the right tool for two questions that come up constantly: is this thing already here, and which things appear in both of these collections. Because it is a hash table underneath, asking whether an item is in a set of ten million takes the same time as asking about a set of ten — no scanning, just a computed location. Sets also refuse duplicates by construction, so adding something twice leaves you with one copy, which makes deduplication almost free. The two things to remember are that a set has no order, so if you need to keep the original sequence you must track it yourself, and that its elements must be hashable, so lists cannot go in but tuples can. Once those are in your fingers, whole categories of nested-loop code collapse into a single line of set algebra.",

    whyItExists:
      'Uniqueness and membership are so common that they deserve a structure with no wasted machinery: dropping the values from a hash table gives constant-time membership, automatic duplicate rejection, and set algebra that replaces quadratic pairwise comparison with linear passes.',

    analogy: {
      scenario:
        "Think of the guest list on a clipboard at a private event, compared with a guest list held by a doorman who has memorised a system of pigeonholes. The clipboard doorman runs a finger down four hundred names for every arrival. The pigeonhole doorman computes where a name would be filed and checks that one place, so he answers just as fast at the four-thousandth name as at the fourth. He also physically cannot file the same name twice, and when the organisers ask which guests appear on both this list and the VIP list, he walks the shorter list once rather than comparing every pair.",
      mapping: [
        { from: 'Filing a name into a computed pigeonhole', to: 'Hashing an element to a bucket: O(1) average membership' },
        { from: 'Being unable to file the same name twice', to: 'A set storing at most one copy of each element' },
        { from: 'Running a finger down the whole clipboard', to: '`x in my_list`: O(n) per test' },
        { from: 'Walking the shorter list once to find names on both', to: '`a & b`, computed in O(min(len(a), len(b)))' },
        { from: 'The pigeonholes being in no meaningful sequence', to: 'A set having no ordering: iteration order is an implementation detail' },
      ],
      bridge:
        'The doorman\'s advantage is not diligence, it is filing: he computes a location instead of searching. That is exactly the hash table from the previous unit with the values thrown away, and every property of a set — constant membership, automatic uniqueness, linear set algebra, no ordering, hashable elements only — follows from that single structural fact.',
      limitations:
        'The analogy suggests names are simply present or absent, but real deduplication is usually about near-duplicates: two documents differing by a whitespace character are distinct to a set and identical to a human. That gap is why normalisation before hashing, and techniques like MinHash, exist.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'A set is a hash table with no values',
        caption: 'Add elements and watch membership resolve to one computed bucket.',
        widget: 'hash-table',
        props: { mode: 'set' },
      },
      {
        kind: 'table',
        title: 'Set operation costs',
        caption: 'n and m are the sizes of the two sets involved.',
        columns: ['Operation', 'Complexity', 'Note'],
        rows: [
          ['`x in s`', 'O(1) average', 'The reason sets exist; O(n) worst case under pathological hashing'],
          ['`s.add(x)` / `s.discard(x)`', 'O(1) average', 'Amortised, including the occasional resize'],
          ['`a | b` (union)', 'O(n + m)', 'Every element of both is hashed into the result'],
          ['`a & b` (intersection)', 'O(min(n, m))', 'Iterates the smaller set, testing membership in the larger'],
          ['`a - b` (difference)', 'O(n)', 'One pass over a with O(1) tests against b'],
          ['`a <= b` (subset)', 'O(n)', 'Every element of a is tested against b'],
          ['`set(xs)` from a list', 'O(n)', 'One hash per element; O(n) extra space'],
        ],
      },
      {
        kind: 'compare',
        title: 'Two ways to deduplicate',
        caption: 'Choose by whether order carries meaning.',
        left: {
          heading: 'Order does not matter — `set(xs)`',
          points: [
            'One pass, O(n) time and O(n) space',
            'Shortest possible code',
            'Result order is arbitrary and must not be relied on',
            'Elements must be hashable',
          ],
        },
        right: {
          heading: 'Order matters — `dict.fromkeys(xs)`',
          points: [
            'Also O(n) time and O(n) space',
            'Keeps first-occurrence order, guaranteed since Python 3.7',
            'Equivalent to a seen-set plus an output list, in one expression',
            'Use the explicit loop when you also need to act on the duplicates',
          ],
        },
      },
    ],

    formalDefinition:
      'A set is an unordered collection of distinct hashable elements supporting membership, insertion and deletion in expected O(1) time, implemented as a hash table whose entries carry keys only. The standard algebraic operations — union, intersection, difference and symmetric difference — are computed by iterating one operand and performing constant-time membership tests on the other, giving complexity linear in the size of the iterated operand rather than in the product of the sizes.',

    math: {
      intuition:
        'The asymmetry in set algebra is worth internalising: intersection iterates the smaller operand because membership is symmetric and cheap either way, whereas difference must iterate the left operand specifically, since the result is defined by it. That is why a & b is O(min(n, m)) while a - b is O(n) regardless of m.',
      formulas: [
        {
          latex: 'T_{\\cap}(n, m) = O(\\min(n, m)), \\qquad T_{\\cup}(n, m) = O(n + m), \\qquad T_{\\setminus}(n, m) = O(n)',
          name: 'Cost of set algebra',
          meaning: 'Each operation is linear in what it must iterate, never in the product of the two sizes.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Size of the left operand' },
            { symbol: 'm', meaning: 'Size of the right operand' },
            { symbol: '\\cap, \\cup, \\setminus', meaning: 'Intersection, union and difference respectively' },
          ],
        },
        {
          latex: '|A \\cup B| = |A| + |B| - |A \\cap B|',
          name: 'Inclusion-exclusion',
          meaning: 'The size of a union counts the overlap once, not twice — the arithmetic behind duplicate accounting when merging datasets.',
          category: 'complexity',
          variables: [
            { symbol: '|A|', meaning: 'Number of distinct elements in A' },
            { symbol: '|A \\cap B|', meaning: 'Number of elements appearing in both, which is the count of duplicates across the two sources' },
          ],
        },
        {
          latex: 'J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}',
          name: 'Jaccard similarity',
          meaning: 'The standard overlap measure between two sets, and the quantity MinHash estimates cheaply for near-duplicate detection.',
          category: 'statistics',
          variables: [
            { symbol: 'J', meaning: 'Similarity between 0 (disjoint) and 1 (identical)' },
            { symbol: '|A \\cap B|', meaning: 'Elements shared by both sets, such as shingles common to two documents' },
            { symbol: '|A \\cup B|', meaning: 'Total distinct elements across both' },
          ],
        },
      ],
    },

    workedExample: {
      title: 'Deduplicating while preserving order, element by element',
      setup:
        'Deduplicate ["b", "a", "c", "a", "b", "d"] keeping first-occurrence order, using a seen-set and an output list. n = 6.',
      steps: [
        { label: 'Start', detail: 'seen = {}, out = []. Nothing processed.' },
        { label: '"b"', detail: 'Not in seen — one O(1) hash lookup. Add to seen and append to out. seen = {b}, out = [b].' },
        { label: '"a"', detail: 'Not in seen. seen = {b, a}, out = [b, a].' },
        { label: '"c"', detail: 'Not in seen. seen = {b, a, c}, out = [b, a, c].' },
        { label: '"a"', detail: 'Already in seen: one O(1) test, then skip. Nothing is appended and nothing is scanned.' },
        { label: '"b"', detail: 'Already in seen: skip.' },
        { label: '"d"', detail: 'Not in seen. seen = {b, a, c, d}, out = [b, a, c, d].' },
        { label: 'Result', detail: 'out = ["b", "a", "c", "d"] — first-occurrence order preserved, duplicates removed.' },
        { label: 'Compare the naive version', detail: 'Replacing the set with `if x not in out` makes each test a linear scan of out, giving O(n^2) comparisons: 15 at n = 6, but 5 * 10^9 at n = 100,000.' },
        { label: 'One-line equivalent', detail: 'list(dict.fromkeys(xs)) does exactly this, using the dictionary\'s guaranteed insertion order instead of a separate list.' },
      ],
      conclusion:
        'Time complexity is O(n): one constant-time hash operation per element, with no rescanning. Space complexity is O(n) for the seen-set plus O(k) for the k unique elements in the output — worst case O(n) when everything is unique. The naive `not in out` version is O(n^2) time with O(k) space, so the seen-set buys a factor of n in time for a factor of at most 2 in memory. That is the trade in its purest form, and it is almost always worth taking.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Four deduplication patterns and when each is right',
        runnable: true,
        code: `xs = ["b", "a", "c", "a", "b", "d"]

print(set(xs))                       # fastest, order arbitrary
print(list(dict.fromkeys(xs)))       # order preserved, one expression

seen, out, dupes = set(), [], []
for x in xs:                          # order preserved AND duplicates captured
    (out if x not in seen else dupes).append(x)
    seen.add(x)
print(out, dupes)

rows = [[1, 2], [3, 4], [1, 2]]       # unhashable elements need a key function
unique_rows = list(dict.fromkeys(tuple(r) for r in rows))
print([list(r) for r in unique_rows])`,
        output: `{'a', 'b', 'c', 'd'}
['b', 'a', 'c', 'd']
['b', 'a', 'c', 'd'] ['a', 'b']
[[1, 2], [3, 4]]`,
        explanation:
          'All four are O(n). Use `set()` when order is genuinely irrelevant and say so in a comment, because a reader cannot tell the difference between "order does not matter" and "the author forgot about order". Use `dict.fromkeys` when it does. Use the explicit loop when you need to report what was dropped, which in a data pipeline you usually do. The last pattern is the standard fix for unhashable elements: convert to a canonical hashable form, deduplicate, and convert back.',
      },
      {
        language: 'python',
        title: 'Set algebra replacing nested loops',
        runnable: true,
        code: `train_ids = {f"doc_{i}" for i in range(0, 10_000)}
test_ids  = {f"doc_{i}" for i in range(9_900, 12_000)}

overlap = train_ids & test_ids
print(f"leaked ids: {len(overlap)}")
print(f"test-only:  {len(test_ids - train_ids)}")
print(f"union:      {len(train_ids | test_ids)}")
print(f"jaccard:    {len(overlap) / len(train_ids | test_ids):.4f}")

clean_test = test_ids - train_ids     # the fix: remove the overlap from test
assert not (train_ids & clean_test)
print(f"clean test size: {len(clean_test)}")`,
        output: `leaked ids: 100
test-only:  2000
union:      12000
jaccard:    0.0083
clean test size: 2000`,
        explanation:
          'Each of these lines would otherwise be a nested loop over 10,000 by 2,100 elements — 21 million comparisons — and instead each is a single linear pass. The leakage check is worth building into every split routine: a hundred shared ids out of two thousand test examples would inflate the reported score by several points, and the failure is silent, because a leaked model looks excellent right up until deployment.',
      },
      {
        language: 'python',
        title: 'Sets of sets, and the frozenset requirement',
        runnable: true,
        code: `try:
    {{1, 2}, {3, 4}}                 # a set of mutable sets
except TypeError as e:
    print("TypeError:", e)

pairs = {frozenset({1, 2}), frozenset({2, 1}), frozenset({3, 4})}
print(len(pairs), pairs)             # {1,2} and {2,1} are the same pair

cache = {frozenset({"lr", "batch"}): "config A"}
print(cache[frozenset({"batch", "lr"})])`,
        output: `TypeError: unhashable type: 'set'
2 {frozenset({1, 2}), frozenset({3, 4})}
config A`,
        explanation:
          'A set can only contain hashable elements, and an ordinary set is mutable and therefore unhashable — the same rule that keeps lists out of dictionaries. `frozenset` is the immutable version, which makes it usable as an element or a key. The example also shows why it is the natural representation for unordered pairs and for feature subsets: order and duplication vanish, so {1,2} and {2,1} are literally the same key, which is exactly what you want when caching results keyed by a combination of options.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Guarding against train/test leakage',
        usage:
          'Before evaluating, hash the normalised content of every training and test record and intersect the two sets. A non-empty intersection means the reported metric is optimistic, and the fix — removing the overlap from the test set — is one line of set difference.',
      },
      {
        context: 'Corpus deduplication for language models',
        usage:
          'Large text corpora contain enormous exact-duplicate fractions. Deduplicating with a set of content hashes before training reduces cost, reduces memorisation of repeated passages, and measurably improves held-out performance.',
      },
      {
        context: 'Stopword and vocabulary filtering',
        usage:
          'Filtering tokens against a stopword set is O(1) per token; against a list it is O(len(stopwords)) per token, which over billions of tokens is the difference between a preprocessing step and a bottleneck.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`drop_duplicates`, `isin` and `Index.difference` are set operations over hash tables, which is why they scale linearly.' },
      { tool: 'scikit-learn', role: '`GroupShuffleSplit` exists because deduplication must respect groups — splitting by row when near-duplicates share a group leaks information across the split.' },
      { tool: 'datasketch / MinHash', role: 'Estimates Jaccard similarity between sets without comparing them exhaustively, which is how near-duplicate detection is done at corpus scale.' },
    ],

    commonMistakes: [
      {
        mistake: 'Relying on the iteration order of a set',
        why: 'Sets have no defined order, and for strings it varies between processes because of hash randomisation. Code that works today can produce a different order tomorrow.',
        fix: 'Use `sorted(s)` when you need a deterministic order, or `dict.fromkeys` when you need insertion order.',
      },
      {
        mistake: 'Deduplicating with `if x not in result` on a list',
        why: 'That membership test is a linear scan of the growing result, making the loop O(n^2). It looks identical to the set version and is thousands of times slower at scale.',
        fix: 'Keep a separate `seen` set for the tests and append to the output list, or use `dict.fromkeys`.',
      },
      {
        mistake: 'Assuming `set()` handles any element',
        why: 'Lists, dicts and sets are unhashable, so `set(list_of_lists)` raises TypeError, and near-duplicates that differ by whitespace or case are treated as distinct.',
        fix: 'Convert to tuples or frozensets for structural elements, and normalise text — casefold, strip, collapse whitespace — before hashing.',
      },
      {
        mistake: 'Deduplicating after splitting train and test',
        why: 'Removing duplicates within each split independently leaves cross-split duplicates untouched, which is precisely the leakage you were trying to prevent.',
        fix: 'Deduplicate the full dataset first, then split — and split by group or by document hash when near-duplicates cluster.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'How would you remove duplicates from a list while preserving order, and what is the complexity?',
        answer:
          'Keep a set of items already seen and build an output list: for each element, test membership in the set, and if absent add it to both. That is O(n) time, because each membership test and insertion is O(1) on average, and O(n) space for the set. In modern Python the same thing is one expression — list(dict.fromkeys(xs)) — because dictionaries preserve insertion order as of 3.7 and reject duplicate keys. The mistake to avoid is testing `if x not in output`, which scans a growing list and makes the whole loop O(n^2). If the elements are unhashable, such as lists, convert them to tuples first or deduplicate on a computed key.',
        followUp:
          'A good follow-up is deduplicating by a key function, for example by a normalised form of a string, which is where a plain set stops being sufficient.',
      },
      {
        level: 'intermediate',
        question: 'What is the complexity of a & b and of a - b, and why are they different?',
        answer:
          'Intersection is O(min(len(a), len(b))): the implementation iterates the smaller set and tests each element for membership in the larger, which is valid because membership is symmetric and each test is O(1). Difference is O(len(a)) regardless of the size of b, because the result is defined by the left operand — every element of a must be examined to decide whether it survives, and no element of b can add anything. So intersecting a ten-element set with a million-element one is ten operations, while subtracting a ten-element set from a million-element one is still a million. Knowing which operand drives the cost is occasionally the difference between a fast and a slow pipeline step.',
        followUp:
          'Asking how you would compute the intersection of twenty sets efficiently tests whether the candidate thinks to sort by size and intersect the smallest first.',
      },
      {
        level: 'ml-engineer',
        question: 'How does duplication in a dataset harm a model, and what would you do about it?',
        answer:
          'Two distinct harms. Within the training set, duplicates re-weight the data: a passage appearing a thousand times is effectively a thousand gradient updates towards memorising it, which encourages verbatim regurgitation and distorts the loss landscape. Across the train/test boundary, duplication is leakage: the model is evaluated on examples it has memorised, so the metric is optimistic and the failure only becomes visible in production. My procedure is to normalise first — casefold, collapse whitespace, strip boilerplate — then deduplicate the full dataset on a content hash before splitting, then verify with a set intersection that the splits are disjoint, and finally check for near-duplicates with MinHash or embedding similarity, because exact hashing misses the document that differs by one character. Deduplication is also the cheapest quality intervention available: it reduces training cost and improves held-out performance at the same time.',
        followUp:
          'Mentioning group-aware splitting, so that near-duplicates from the same source stay on one side of the split, shows experience with real datasets.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Given two lists of user ids, return the ids present in both, with no duplicates, sorted. State the complexity.',
        hint: 'Convert once, intersect, then sort.',
        solution:
          'def common_ids(a, b):\n    return sorted(set(a) & set(b))\n\nBuilding the two sets is O(n + m), the intersection is O(min(n, m)), and the final sort is O(k log k) where k is the number of common ids, so the total is O(n + m + k log k) — dominated by the set construction for any realistic input. Space is O(n + m). The nested-loop alternative, `[x for x in a if x in b]`, is O(n * m) and also fails to remove duplicates. Sorting at the end is what makes the output deterministic, which matters if it is written to a file that gets diffed.',
      },
      {
        prompt: 'You have 2 million document strings and need to find which appear more than once. Do it in one pass and state the memory cost.',
        hint: 'One set is not enough — you need to distinguish "seen once" from "seen again".',
        solution:
          'def find_duplicates(docs):\n    seen, dupes = set(), set()\n    for d in docs:\n        h = hash(d)          # or hashlib.sha256(d.encode()).digest() for stability\n        if h in seen:\n            dupes.add(h)\n        else:\n            seen.add(h)\n    return dupes\n\nOne pass, O(n) time, and O(n) space for the seen set. Storing hashes rather than the documents themselves is the important memory decision: 2 million 8-byte hashes is a few tens of megabytes, while 2 million documents could be many gigabytes. The trade is a small probability of a hash collision reporting a false duplicate, which for a 64-bit hash over 2 million items is around 10^-7 — acceptable for a report, not acceptable for silent deletion, where you would confirm the candidates by comparing the actual text.',
      },
      {
        prompt: 'Write a check that fails loudly if a train/test split shares any examples, and explain what to do when it fires.',
        hint: 'Normalise before hashing, or the check will miss the duplicates that matter.',
        solution:
          'def assert_disjoint(train, test, key=lambda d: " ".join(d.lower().split())):\n    train_keys = {key(d) for d in train}\n    overlap = {key(d) for d in test} & train_keys\n    if overlap:\n        raise ValueError(f"{len(overlap)} examples leak across the split")\n\nThe cost is O(n + m) time and O(n + m) space, which is negligible next to training. The normalisation in `key` is the part that earns its keep: without casefolding and whitespace collapsing, two records differing by a trailing space look distinct and the check passes while leakage remains. When it fires, remove the overlap from the test set rather than from train — the test set must stay untouched by anything the model saw — and then investigate why the duplicates exist at all, because they usually indicate a join or a scrape that ran twice.',
      },
    ],

    quiz: [
      {
        id: 'DSA-008-q1',
        type: 'mcq',
        concept: 'membership complexity',
        prompt: 'What is the average complexity of `x in s` when s is a set of one million elements?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        answerIndex: 0,
        explanation:
          'A set is a hash table, so membership computes a bucket from the element\'s hash rather than scanning. Size does not affect the expected cost while the load factor is bounded.',
      },
      {
        id: 'DSA-008-q2',
        type: 'code-output',
        language: 'python',
        concept: 'order-preserving deduplication',
        prompt: 'What does this print?',
        code: `xs = ["b", "a", "b", "c", "a"]
print(list(dict.fromkeys(xs)))`,
        options: ["['b', 'a', 'c']", "['a', 'b', 'c']", "['b', 'a', 'b', 'c', 'a']", "{'b', 'a', 'c'}"],
        answerIndex: 0,
        explanation:
          'Dictionary keys are unique and, since Python 3.7, preserve insertion order, so this deduplicates while keeping first-occurrence order. `set(xs)` would also deduplicate but would lose the order.',
      },
      {
        id: 'DSA-008-q3',
        type: 'truefalse',
        concept: 'set ordering',
        prompt: 'Iterating a set of strings twice in the same process gives the same order, and that order is safe to rely on across runs.',
        answer: false,
        explanation:
          'Within one process the order is stable, but it is not defined by the language and varies across runs because string hashing is randomised per process. Use sorted() for determinism.',
      },
      {
        id: 'DSA-008-q4',
        type: 'match',
        concept: 'set algebra',
        prompt: 'Match each expression to what it computes and its cost.',
        pairs: [
          { left: 'a & b', right: 'Elements in both — O(min(n, m))' },
          { left: 'a | b', right: 'Elements in either — O(n + m)' },
          { left: 'a - b', right: 'Elements in a but not b — O(n)' },
          { left: 'a ^ b', right: 'Elements in exactly one — O(n + m)' },
        ],
        explanation:
          'Each operation is linear in what it must iterate, never in the product of the sizes — which is why set algebra replaces nested loops.',
      },
      {
        id: 'DSA-008-q5',
        type: 'debug',
        language: 'python',
        concept: 'quadratic deduplication',
        prompt: 'This works but takes minutes on 200,000 items. What is the fix?',
        code: `unique = []
for x in items:
    if x not in unique:
        unique.append(x)`,
        options: [
          'Track membership in a separate set: `if x not in seen: seen.add(x); unique.append(x)`',
          'Sort `items` first so duplicates are adjacent',
          'Replace `append` with `insert(0, x)`',
          'Wrap the loop in a list comprehension',
        ],
        answerIndex: 0,
        explanation:
          '`x not in unique` scans a growing list, making the loop O(n^2). A set makes each test O(1), giving O(n) overall while still preserving order in the output list.',
      },
      {
        id: 'DSA-008-q6',
        type: 'explain',
        concept: 'deduplication and leakage',
        prompt: 'Explain why duplicate records matter in a machine-learning dataset, and how a set helps.',
        rubric: [
          'Distinguishes duplication within training data from duplication across the train/test boundary',
          'Says cross-split duplication inflates evaluation metrics because the model has effectively memorised the test example',
          'Describes a concrete O(n) check using sets, and mentions normalising before hashing',
        ],
        sampleAnswer:
          'Duplicates inside the training set silently re-weight the data: a passage that appears a thousand times gets a thousand times the gradient pressure, which encourages memorisation rather than generalisation. Duplicates spanning the train and test sets are worse, because evaluation then measures recall of memorised examples and the score is optimistic in a way that only shows up after deployment. A set makes the check cheap: build the set of normalised training records, intersect it with the test records, and the size of the intersection is the leak, all in O(n + m) time. The normalisation step matters as much as the set — casefolding and collapsing whitespace, so that records differing by a trailing space are recognised as the same record — and for near-duplicates you go further, to MinHash or embedding similarity, because exact hashing cannot see them.',
        explanation:
          'The point being assessed is that deduplication is a correctness concern for evaluation, not just a tidiness or storage concern, and that the check itself is trivially cheap.',
      },
    ],

    flashcards: [
      { front: 'What is a set, structurally?', back: 'A hash table storing keys only. Membership, insertion and deletion are O(1) average; there is no ordering.' },
      { front: 'Deduplicate while preserving order', back: '`list(dict.fromkeys(xs))`, or a seen-set plus an output list. Both O(n). Never `if x not in output_list`, which is O(n^2).' },
      { front: 'Cost of `a & b` versus `a - b`', back: 'Intersection is O(min(n, m)) — it iterates the smaller set. Difference is O(len(a)) regardless of b\'s size.' },
      { front: 'Why can a set not contain a list or another set?', back: 'Elements must be hashable, and mutable objects are not. Use a tuple or a frozenset instead.' },
      { front: 'What is a frozenset for?', back: 'An immutable, hashable set — usable as a dict key or as an element of another set, ideal for unordered combinations.' },
      { front: 'Why deduplicate before splitting train and test?', back: 'Deduplicating each split separately leaves cross-split duplicates, which is leakage and inflates the reported metric.' },
    ],

    challenge: {
      title: 'A leakage audit for a dataset split',
      brief:
        'Write an audit function that takes a training list and a test list of text records and reports: the number of exact duplicates within each split, the number of exact duplicates across the splits after normalisation, and the ten longest leaked records. Normalisation should casefold, collapse whitespace and strip punctuation. Then produce a cleaned test set with the leaks removed, assert it is disjoint from training, and print how much the test set shrank. State the time and space complexity of the audit.',
      language: 'python',
      acceptanceCriteria: [
        'Normalisation is applied before any hashing or comparison',
        'Within-split and cross-split duplicates are reported separately',
        'The cleaned test set is verified disjoint with an assertion, not just assumed',
        'The complexity statement is O(n + m) time and space, with a one-line justification',
      ],
      starterCode: 'import re\n\nPUNCT = re.compile(r"[^\\w\\s]")\n\ndef normalise(text):\n    return " ".join(PUNCT.sub("", text).lower().split())\n\ndef audit(train, test):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone the difference between a list and a set, and give them a rule for when to reach for each.',
      mustCover: [
        'A set is a hash table without values: membership is O(1) and duplicates are rejected automatically',
        'A list keeps order and allows duplicates and indexing; a set gives up all three',
        'Set algebra — intersection, union, difference — replaces nested loops with linear passes',
        'Elements of a set must be hashable, so lists must become tuples',
      ],
      bonusSignals: ['gives the deduplication patterns for both order-sensitive and order-free cases', 'mentions the leakage check', 'notes that set iteration order must not be relied on'],
      sampleExplanation:
        'A list remembers everything you put in it, in the order you put it, and finding something means looking through it one item at a time. A set forgets order, refuses duplicates, and finds things by computing where they would be, so asking whether an item is present takes the same tiny amount of time in a set of ten million as in a set of ten. That single difference is the rule: if you will ask "is this in there?" more than a handful of times, or if you need uniqueness, use a set. It also gives you algebra for free — the items in both collections, the items in one but not the other — each computed in a single pass instead of comparing every pair. Two catches. Sets have no order, so if the sequence matters, deduplicate with dict.fromkeys instead, which keeps first-occurrence order. And everything you put in a set must be hashable, so a list of values has to become a tuple first.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-009',
    domain: 'DSA',
    module: 'Trees & Heaps',
    topic: 'Hierarchies and traversal',
    title: 'Trees and Binary Trees',
    slug: 'trees-and-binary-trees',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DSA-005', 'DSA-006'],
    related: ['DSA-005', 'DSA-006'],
    tags: ['tree', 'binary-tree', 'traversal', 'preorder', 'inorder', 'level-order'],

    learningObjectives: [
      'Use tree vocabulary precisely: root, child, parent, leaf, depth, height, subtree',
      'Relate the height of a binary tree to its node count, and explain why balance matters',
      'Implement preorder, inorder, postorder and level-order traversal, recursively and iteratively',
      'Choose the traversal that matches a task, such as evaluating an expression or printing a hierarchy',
    ],

    terminology: [
      {
        term: 'Tree',
        definition:
          'A connected acyclic structure of nodes in which every node except the root has exactly one parent. A tree with n nodes has exactly n - 1 edges.',
        simple: 'A family tree shape: one thing at the top, branches downward, no loops.',
      },
      {
        term: 'Depth and height',
        definition:
          'Depth of a node is the number of edges from the root to it; height of a tree is the greatest depth of any node. A single node has height 0.',
        simple: 'How far down a node sits, and how far down the deepest one goes.',
      },
      {
        term: 'Binary tree',
        definition:
          'A tree in which every node has at most two children, conventionally named left and right. The left/right distinction is part of the structure, not an arbitrary ordering.',
        simple: 'A tree where every box has at most two boxes hanging under it.',
      },
      {
        term: 'Balanced tree',
        definition:
          'One whose height is O(log n) — informally, where no subtree is dramatically deeper than its sibling. Balance is what makes tree operations logarithmic rather than linear.',
        simple: 'A tree that spreads out rather than growing into a long straggly chain.',
      },
      {
        term: 'Traversal',
        definition:
          'A systematic visit to every node exactly once. The four standard orders are preorder, inorder, postorder and level-order, and each suits different tasks.',
        simple: 'A rule for walking the whole tree without missing or repeating anything.',
      },
    ],

    simpleExplanation:
      "A tree is what you get when data has a hierarchy rather than a sequence: one thing at the top, things hanging beneath it, and nothing ever looping back. Folders containing folders, a company's reporting lines, the nested structure of a web page and the parsed form of a sentence are all trees, and so is the decision tree that a model learns. A binary tree is the special case where each node has at most two children, which is the shape most algorithms are built on because two choices per step is exactly what halving requires. The crucial number about any tree is its height, because most operations walk from the root down to a leaf, and the height tells you how many steps that is. A tree that spreads evenly has a height of about log2 of its node count, so a million nodes are twenty steps from the root; a tree that has degenerated into a chain has height equal to its node count, and every operation becomes a scan. Most of what follows in this domain is about keeping trees short.",

    whyItExists:
      'Sequences cannot express containment or branching, yet a great deal of real data is hierarchical and a great many algorithms work by repeatedly halving a search space. Trees give both: a structure that mirrors nesting, and a shape whose height grows logarithmically so that a root-to-leaf walk is cheap.',

    analogy: {
      scenario:
        "Think of a large company's reporting chart. The chief executive is at the top; each person has exactly one manager and any number of reports; nobody reports to someone beneath them, which is what stops the chart becoming a tangle. To pass a message to everyone, you have a choice of methods. You can hand it to a person, then have them deal with their whole first report's branch before starting the second, going as deep as possible each time. Or you can tell everyone at the executive level, then everyone at the next level down, then the level below that. Both reach everybody exactly once, but the order is completely different, and which one you want depends on the message.",
      mapping: [
        { from: 'The chief executive', to: 'The root node' },
        { from: 'Each person having exactly one manager', to: 'Each node having exactly one parent, which makes it a tree rather than a graph' },
        { from: 'People with no reports', to: 'Leaf nodes' },
        { from: 'Finishing one branch entirely before starting the next', to: 'Depth-first traversal — preorder, inorder or postorder' },
        { from: 'Informing an entire level before moving down', to: 'Level-order traversal, driven by a queue' },
        { from: 'The number of levels between the chief and the most junior person', to: 'The height of the tree, which bounds the cost of a root-to-leaf walk' },
      ],
      bridge:
        'The single-manager rule is what makes the chart a tree, and it is exactly the property that guarantees a traversal terminates without needing a visited set: there is precisely one path from the root to each node and no way to arrive back where you started. The moment you allow a second manager or a loop, you have a graph, you need cycle protection, and three units of this domain change character.',
      limitations:
        'Real org charts have dotted-line reporting and matrix management, which makes them graphs rather than trees. That is not a flaw in the analogy so much as a preview: the general case is the subject of the graph units, and trees are the well-behaved special case.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Build a tree and traverse it',
        caption: 'Step through preorder, inorder, postorder and level-order on the same tree and watch the visit sequence differ.',
        widget: 'binary-tree',
      },
      {
        kind: 'ascii',
        title: 'The tree used throughout this unit',
        caption: 'Seven nodes, height 2, perfectly balanced.',
        art: `        1
      /   \\
     2     3
    / \\   / \\
   4   5 6   7`,
      },
      {
        kind: 'table',
        title: 'The four traversals and what each is for',
        columns: ['Traversal', 'Visit order', 'On the tree above', 'Natural use'],
        rows: [
          ['Preorder', 'node, left, right', '1 2 4 5 3 6 7', 'Copying or serialising a tree — the parent must exist before its children'],
          ['Inorder', 'left, node, right', '4 2 5 1 6 3 7', 'Reading a binary search tree in sorted order'],
          ['Postorder', 'left, right, node', '4 5 2 6 7 3 1', 'Deleting a tree, or evaluating an expression where children must be resolved first'],
          ['Level-order', 'by depth, left to right', '1 2 3 4 5 6 7', 'Printing a hierarchy, or anything that needs shallowest-first order'],
        ],
      },
      {
        kind: 'compare',
        title: 'Balanced versus degenerate',
        caption: 'Same nodes, same operations, completely different cost.',
        left: {
          heading: 'Balanced — height about log2(n)',
          points: [
            'A million nodes are 20 levels from the root',
            'Root-to-leaf operations are O(log n)',
            'Recursive traversal uses O(log n) stack space',
            'This is the shape every tree algorithm assumes',
          ],
        },
        right: {
          heading: 'Degenerate — height n - 1',
          points: [
            'Every node has one child: the tree is a linked list',
            'Root-to-leaf operations become O(n)',
            'Recursive traversal uses O(n) stack and hits RecursionError near 1,000 nodes',
            'Produced by inserting already-sorted data into an unbalanced tree',
          ],
        },
      },
    ],

    formalDefinition:
      'A rooted tree is a connected acyclic graph with a distinguished root, in which every node other than the root has exactly one parent; a tree with n nodes has exactly n - 1 edges. A binary tree additionally assigns each node at most two distinguished children, left and right. Any traversal visits each of the n nodes exactly once and is therefore O(n) in time, using O(h) auxiliary space for depth-first orders, where h is the height, and O(w) for level-order, where w is the maximum width.',

    math: {
      intuition:
        'The reason trees are useful is that width grows exponentially with depth while depth grows only logarithmically with size. Each additional level can hold twice as many nodes as the last, so the number of levels needed to hold n nodes is about log2(n). That is the entire source of the O(log n) that appears throughout the rest of this domain, and it evaporates the moment a tree stops being balanced.',
      formulas: [
        {
          latex: 'n \\le 2^{h+1} - 1 \\quad \\Longleftrightarrow \\quad h \\ge \\lceil \\log_2(n+1) \\rceil - 1',
          name: 'Height bound for a binary tree',
          meaning: 'A binary tree of height h holds at most 2^(h+1) - 1 nodes, so n nodes need at least log2(n+1) - 1 levels.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of nodes' },
            { symbol: 'h', meaning: 'Height: the number of edges on the longest root-to-leaf path' },
            { symbol: '2^{h+1} - 1', meaning: 'Node count of a perfect binary tree of height h' },
          ],
        },
        {
          latex: '\\text{level } d \\text{ holds at most } 2^d \\text{ nodes}',
          name: 'Width of a level',
          meaning: 'Capacity doubles per level, which is why depth grows logarithmically in node count.',
          category: 'complexity',
          variables: [
            { symbol: 'd', meaning: 'Depth of the level, with the root at depth 0' },
            { symbol: '2^d', meaning: 'Maximum nodes at that depth in a binary tree' },
          ],
        },
        {
          latex: 'T_{\\text{traverse}}(n) = O(n), \\qquad S_{\\text{DFS}} = O(h), \\qquad S_{\\text{BFS}} = O(w)',
          name: 'Traversal costs',
          meaning: 'Every traversal touches each node once; the space differs because depth-first holds a path while level-order holds a level.',
          category: 'complexity',
          variables: [
            { symbol: 'h', meaning: 'Height — O(log n) if balanced, O(n) if degenerate' },
            { symbol: 'w', meaning: 'Maximum width, which for a balanced tree is about n/2 at the last level' },
          ],
        },
      ],
      derivation: [
        'The root level holds 1 node, which is 2^0.',
        'Each node has at most 2 children, so level d holds at most twice level d-1, giving at most 2^d.',
        'Summing over levels 0 to h gives 1 + 2 + 4 + ... + 2^h = 2^(h+1) - 1, a geometric series.',
        'Hence n <= 2^(h+1) - 1 for any binary tree of height h.',
        'Rearranging gives h >= log2(n+1) - 1: no binary tree with n nodes can be shorter than this.',
        'A perfect tree achieves the bound, so the best possible height is logarithmic — and the worst, a chain, is n - 1.',
      ],
    },

    workedExample: {
      title: 'All four traversals on the same seven-node tree',
      setup:
        'The tree has root 1 with children 2 and 3; node 2 has children 4 and 5; node 3 has children 6 and 7. Height is 2, n = 7. We trace each order and note the auxiliary structure it needs.',
      steps: [
        { label: 'Preorder: visit, left, right', detail: 'Visit 1. Descend left to 2, visit it. Descend left to 4, visit; 4 is a leaf so return. Right to 5, visit, return. Back up to 1, right to 3, visit. Left to 6, visit. Right to 7, visit. Sequence: 1 2 4 5 3 6 7.' },
        { label: 'Why preorder for copying', detail: 'The parent is emitted before its children, so a reader can construct the parent node before it needs somewhere to attach the children. Serialisation formats use this order for exactly that reason.' },
        { label: 'Inorder: left, visit, right', detail: 'Descend to 4 (leftmost), visit 4. Return to 2, visit 2. Go right to 5, visit 5. Return to 1, visit 1. Descend right to 3, then left to 6, visit 6. Visit 3. Go right, visit 7. Sequence: 4 2 5 1 6 3 7.' },
        { label: 'Why inorder matters', detail: 'On a binary search tree, where every left descendant is smaller and every right descendant larger, this order emits the values sorted. That single fact is the subject of the next unit.' },
        { label: 'Postorder: left, right, visit', detail: 'Reach 4, visit. Reach 5, visit. Now both children of 2 are done, so visit 2. Reach 6, visit. Reach 7, visit. Visit 3. Finally visit 1. Sequence: 4 5 2 6 7 3 1.' },
        { label: 'Why postorder for evaluation', detail: 'A node is visited only after both its children, so in an expression tree the operands are already computed when the operator is reached. Freeing a tree uses the same order: never delete a parent while its children still need it.' },
        { label: 'Level-order: by depth', detail: 'Use a queue. Enqueue 1. Dequeue 1, visit, enqueue 2 and 3. Dequeue 2, visit, enqueue 4 and 5. Dequeue 3, visit, enqueue 6 and 7. Dequeue and visit 4, 5, 6, 7. Sequence: 1 2 3 4 5 6 7.' },
        { label: 'Peak queue size', detail: 'The queue holds at most one full level: 4 nodes here, at the last level. For a balanced tree of n nodes that is about n/2, so level-order uses O(n) space while depth-first uses O(h) = O(log n).' },
        { label: 'Degenerate contrast', detail: 'If the same seven nodes formed a right-leaning chain, height would be 6. Every traversal is still O(n) in time, but recursive depth-first would now use 7 stack frames instead of 3 — and with a million nodes, RecursionError.' },
      ],
      conclusion:
        'All four traversals are O(n) time, since each node is visited exactly once and does constant work. They differ in space: the three depth-first orders use O(h) auxiliary space — O(log n) for a balanced tree, O(n) for a degenerate one — while level-order uses O(w), which is O(n/2) for a balanced tree and O(1) for a chain. The orders are not interchangeable: preorder for copying because parents come first, inorder for sorted output on a search tree, postorder for evaluation and deletion because children come first, and level-order whenever shallowest-first matters. Choosing the wrong one usually produces output that looks plausible and is subtly wrong.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The four traversals, recursive and iterative',
        runnable: true,
        code: `from collections import deque

class Node:
    __slots__ = ("value", "left", "right")
    def __init__(self, value, left=None, right=None):
        self.value, self.left, self.right = value, left, right

root = Node(1, Node(2, Node(4), Node(5)), Node(3, Node(6), Node(7)))

def preorder(n):
    return [] if n is None else [n.value] + preorder(n.left) + preorder(n.right)

def inorder(n):
    return [] if n is None else inorder(n.left) + [n.value] + inorder(n.right)

def postorder(n):
    return [] if n is None else postorder(n.left) + postorder(n.right) + [n.value]

def level_order(n):
    out, q = [], deque([n] if n else [])
    while q:
        node = q.popleft()
        out.append(node.value)
        if node.left:  q.append(node.left)
        if node.right: q.append(node.right)
    return out

def preorder_iterative(n):
    out, stack = [], [n] if n else []
    while stack:
        node = stack.pop()
        out.append(node.value)
        if node.right: stack.append(node.right)   # right first: popped second
        if node.left:  stack.append(node.left)
    return out

print("pre  ", preorder(root))
print("in   ", inorder(root))
print("post ", postorder(root))
print("level", level_order(root))
print("pre iterative", preorder_iterative(root))`,
        output: `pre   [1, 2, 4, 5, 3, 6, 7]
in    [4, 2, 5, 1, 6, 3, 7]
post  [4, 5, 2, 6, 7, 3, 1]
level [1, 2, 3, 4, 5, 6, 7]
pre iterative [1, 2, 4, 5, 3, 6, 7]`,
        explanation:
          'The three recursive versions differ only in where the node itself appears relative to the two recursive calls, which is worth noticing because it means one mental template covers all three. The iterative preorder replaces the call stack with an explicit stack, and pushes the right child first so the left is popped first — get that backwards and you silently get a mirrored traversal. Compare it with `level_order`, which is the same skeleton with a queue instead of a stack: swapping the structure swaps depth-first for breadth-first, which is precisely the relationship explored in the DFS and BFS units.',
      },
      {
        language: 'python',
        title: 'Height, balance and why concatenation is the wrong habit',
        runnable: true,
        code: `def height(n):
    return -1 if n is None else 1 + max(height(n.left), height(n.right))

def count(n):
    return 0 if n is None else 1 + count(n.left) + count(n.right)

def is_balanced(n):
    def check(node):                      # returns height, or -2 if unbalanced
        if node is None:
            return -1
        lh = check(node.left)
        if lh == -2: return -2
        rh = check(node.right)
        if rh == -2: return -2
        return -2 if abs(lh - rh) > 1 else 1 + max(lh, rh)
    return check(n) != -2

chain = Node(1, None, Node(2, None, Node(3, None, Node(4))))
print(height(root), count(root), is_balanced(root))
print(height(chain), count(chain), is_balanced(chain))`,
        output: `2 7 True
3 4 False`,
        explanation:
          'Height is defined here with an empty tree at -1 so that a single node has height 0, which makes the arithmetic in `is_balanced` clean; the other convention exists and you should state which you are using. `is_balanced` is O(n) because it computes each subtree height once on the way back up — the naive version that calls `height` inside the recursion recomputes heights and is O(n^2), which is a classic interview trap. Note also that the traversals in the previous example use list concatenation, which is O(n) per call and makes them O(n^2) overall; for production code, append into a shared list or yield from a generator.',
      },
      {
        language: 'python',
        title: 'An expression tree evaluated postorder',
        runnable: true,
        code: `# Represents (3 + 4) * (10 - 6)
expr = Node("*",
            Node("+", Node(3), Node(4)),
            Node("-", Node(10), Node(6)))

OPS = {"+": lambda a, b: a + b, "-": lambda a, b: a - b,
       "*": lambda a, b: a * b, "/": lambda a, b: a / b}

def evaluate(n):
    if n.left is None and n.right is None:     # a leaf holds a number
        return n.value
    left = evaluate(n.left)                    # children first...
    right = evaluate(n.right)
    return OPS[n.value](left, right)           # ...then the operator

def to_infix(n):
    if n.left is None:
        return str(n.value)
    return f"({to_infix(n.left)} {n.value} {to_infix(n.right)})"

print(to_infix(expr), "=", evaluate(expr))`,
        output: `((3 + 4) * (10 - 6)) = 28`,
        explanation:
          'This is postorder with a purpose: an operator cannot be applied until both operands are known, which is exactly the postorder guarantee that a node is visited after its children. `to_infix` is inorder with parentheses added, and it shows why inorder alone is ambiguous — without the brackets, 3 + 4 * 10 - 6 would parse differently. Every compiler, spreadsheet formula engine and query planner contains a version of this structure, and so does the autograd graph in PyTorch, where the backward pass is a postorder walk.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Decision trees in machine learning',
        usage:
          'A fitted `DecisionTreeClassifier` is a binary tree where each internal node is a threshold test and each leaf a prediction. Inference is a single root-to-leaf walk, so its cost is the tree\'s depth — which is exactly why `max_depth` is the main capacity knob.',
      },
      {
        context: 'Parsing and computation graphs',
        usage:
          'Source code, JSON and SQL are all parsed into trees, and evaluated postorder. PyTorch\'s autograd builds a graph of operations and walks it backwards so that every consumer is processed before its input, which is the same ordering discipline.',
      },
      {
        context: 'Hierarchical clustering and file systems',
        usage:
          'A dendrogram is a binary tree of merges, and cutting it at a height gives a clustering. Directory structures are trees, which is why `os.walk` is a traversal and why recursive deletion must be postorder.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: 'Tree ensembles — random forests and gradient boosting — are collections of binary trees; prediction cost is the number of trees times their depth.' },
      { tool: 'ast (Python standard library)', role: 'Parses Python source into a tree and offers `ast.NodeVisitor`, which is a preorder traversal with a hook per node type.' },
      { tool: 'scipy.cluster.hierarchy', role: 'Produces dendrograms: binary merge trees that are cut at a chosen height to yield clusters.' },
    ],

    commonMistakes: [
      {
        mistake: 'Confusing depth with height, or disagreeing about the empty tree',
        why: 'Depth measures downward from the root for a node; height measures the longest path down from a node. Some texts count nodes and some count edges, so a single node is height 0 or 1 depending on convention.',
        fix: 'State your convention in a docstring. Use edge-counting with an empty tree at -1, which makes `1 + max(left, right)` come out right without special cases.',
      },
      {
        mistake: 'Computing height inside a balance check',
        why: 'Calling a separate `height()` at every node recomputes the same subtrees repeatedly, giving O(n^2) on a skewed tree — the same overlapping-subproblem waste that motivates dynamic programming.',
        fix: 'Return height and the balance verdict together from one bottom-up recursion, so each subtree is measured once: O(n).',
      },
      {
        mistake: 'Using recursion on a tree that may be degenerate',
        why: 'Recursion depth equals tree height, so a chain of 10,000 nodes exceeds CPython\'s default recursion limit and raises RecursionError.',
        fix: 'Use an explicit stack for depth-first traversal when the tree is not guaranteed balanced, or raise the limit knowingly. Never raise the limit as a reflex — it converts a clean exception into a segmentation fault.',
      },
      {
        mistake: 'Building traversal output with list concatenation',
        why: '`left + [node] + right` allocates a new list at every node, making the traversal O(n^2) in time and memory even though it visits each node once.',
        fix: 'Append into one shared list, or write the traversal as a generator with `yield` and `yield from`, which is O(n) and streams.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Give the four traversals of a binary tree and say when each is the right choice.',
        answer:
          'Preorder visits the node then left then right, so parents appear before children — the order you want for copying or serialising a tree, since the parent must exist before its children can be attached. Inorder visits left, node, right; on a binary search tree this emits the values in sorted order, which is the main reason it exists. Postorder visits left, right, node, so children are finished before their parent — the order for evaluating an expression tree, for computing sizes or heights bottom-up, and for deleting a tree safely. Level-order visits by depth using a queue and is what you want for printing a hierarchy or for anything where shallowest-first matters, including shortest paths in the graph setting. All four are O(n) time; the depth-first ones use O(h) space and level-order uses O(w).',
        followUp:
          'A natural follow-up is which pair of traversals uniquely determines a tree: preorder plus inorder does, but preorder plus postorder does not, because it cannot distinguish a single left child from a single right child.',
      },
      {
        level: 'intermediate',
        question: 'Why is the height of a tree the number that matters, and what makes a tree degenerate?',
        answer:
          'Almost every tree operation — search, insert, delete, a prediction in a decision tree — is a walk from the root to a leaf, so its cost is proportional to the height rather than the node count. In a balanced tree each level can hold twice as many nodes as the last, so n nodes fit in about log2(n) levels and a million nodes are twenty steps from the root. A tree degenerates when insertions arrive in an order that always extends the same side — inserting already-sorted data into an unbalanced binary search tree is the classic case — at which point every node has one child, the height becomes n - 1, and the structure is a linked list with extra overhead. That is why self-balancing trees like AVL and red-black trees exist, and why interview answers should state complexity in terms of h and then say what h is under balance.',
        followUp:
          'Being asked what happens to recursion in the degenerate case tests whether the candidate connects height to stack space and RecursionError.',
      },
      {
        level: 'ml-engineer',
        question: 'How does tree structure determine the cost of prediction in a gradient-boosted model?',
        answer:
          'Prediction walks each tree from root to leaf, so the cost per tree is its depth, and the total is the number of trees times the average depth — for a typical LightGBM model, perhaps 500 trees of depth 8, so about 4,000 comparisons per row, entirely independent of the training set size. That is why boosted trees serve so cheaply despite expensive training. It also explains the tuning knobs: `max_depth` and `num_leaves` control both capacity and inference latency simultaneously, and `n_estimators` trades accuracy against a linear increase in prediction cost. When latency matters you can prune or distil the ensemble, and because each tree is an independent root-to-leaf walk, the work vectorises and parallelises well across rows.',
        followUp:
          'Mentioning that memory locality of the tree layout matters at serving scale, which is why libraries store trees as flat arrays rather than pointer-linked nodes, shows systems awareness.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a function returning the maximum depth of a binary tree, then rewrite it iteratively. State the complexity of each.',
        hint: 'The iterative version can carry the depth alongside each node in the stack or queue.',
        solution:
          'def max_depth(n):\n    return 0 if n is None else 1 + max(max_depth(n.left), max_depth(n.right))\n\ndef max_depth_iter(root):\n    best, stack = 0, [(root, 1)] if root else []\n    while stack:\n        node, d = stack.pop()\n        best = max(best, d)\n        if node.left:  stack.append((node.left, d + 1))\n        if node.right: stack.append((node.right, d + 1))\n    return best\n\nBoth are O(n) time since every node is visited once. The recursive version uses O(h) stack space and fails with RecursionError on a degenerate tree of more than about a thousand nodes; the iterative version uses O(h) heap space for the explicit stack and has no such limit. This is the standard reason to convert a tree recursion to an explicit stack in production code.',
      },
      {
        prompt: 'Given preorder [1, 2, 4, 5, 3, 6, 7] and inorder [4, 2, 5, 1, 6, 3, 7], reconstruct the tree. Explain the method and its complexity.',
        hint: 'The first preorder element is the root. Where does it sit in the inorder list?',
        solution:
          'The first preorder value, 1, is the root. Find 1 in the inorder list: everything to its left, [4, 2, 5], is the left subtree and everything to its right, [6, 3, 7], is the right subtree. The left subtree has three nodes, so the next three preorder values, [2, 4, 5], describe it, and the remaining [3, 6, 7] describe the right. Recurse on each half. The result is the tree used throughout this unit.\n\nA naive implementation scans the inorder list at every step, giving O(n^2). Building a value-to-index dictionary from the inorder list first makes each lookup O(1), so the reconstruction is O(n) time and O(n) space. Note that preorder plus postorder would not be enough: it cannot distinguish a lone left child from a lone right child, because the ambiguity is exactly what inorder resolves.',
      },
      {
        prompt: 'Write a level-order traversal that returns a list of lists, one per depth, and explain the extra bookkeeping.',
        hint: 'Record the queue length before draining a level.',
        solution:
          'from collections import deque\n\ndef levels(root):\n    out, q = [], deque([root] if root else [])\n    while q:\n        n = len(q)                     # exactly the nodes at this depth\n        row = []\n        for _ in range(n):\n            node = q.popleft()\n            row.append(node.value)\n            if node.left:  q.append(node.left)\n            if node.right: q.append(node.right)\n        out.append(row)\n    return out\n\nThe single extra line, capturing `len(q)` before the inner loop, is what separates levels: at that moment the queue contains precisely the current depth, because children are only appended after. Time is O(n) and space is O(w) for the queue, where w is the widest level — about n/2 for a balanced tree. This exact pattern reappears in breadth-first search when you need distances rather than just reachability.',
      },
    ],

    quiz: [
      {
        id: 'DSA-009-q1',
        type: 'mcq',
        concept: 'traversal orders',
        prompt: 'Which traversal of a binary search tree produces the values in sorted order?',
        options: ['Inorder', 'Preorder', 'Postorder', 'Level-order'],
        answerIndex: 0,
        explanation:
          'Inorder visits the entire left subtree, then the node, then the right. Since every left descendant is smaller and every right descendant larger, the emitted sequence is ascending.',
      },
      {
        id: 'DSA-009-q2',
        type: 'order',
        concept: 'postorder sequence',
        prompt: 'Put these nodes in postorder for the tree with root 1, children 2 and 3, where 2 has children 4 and 5 and 3 has children 6 and 7.',
        items: ['4', '5', '2', '6', '7', '3', '1'],
        explanation:
          'Postorder finishes both children before visiting a node, so each parent appears immediately after its subtree and the root comes last. This is the order in which an expression tree must be evaluated.',
      },
      {
        id: 'DSA-009-q3',
        type: 'numeric',
        concept: 'height and node count',
        prompt: 'What is the maximum number of nodes in a binary tree of height 3 (edge-counting, root at height 0)?',
        answer: 15,
        explanation:
          'Levels hold at most 1, 2, 4 and 8 nodes, summing to 2^4 - 1 = 15. This bound is what makes balanced-tree operations logarithmic: doubling capacity per level means n nodes need only about log2(n) levels.',
      },
      {
        id: 'DSA-009-q4',
        type: 'truefalse',
        concept: 'traversal complexity',
        prompt: 'Level-order traversal uses less auxiliary space than recursive inorder traversal on a balanced tree.',
        answer: false,
        explanation:
          'Level-order holds a whole level in the queue, about n/2 nodes for a balanced tree, so it is O(n). Depth-first holds only the current root-to-node path, which is O(h) = O(log n) when balanced.',
      },
      {
        id: 'DSA-009-q5',
        type: 'debug',
        language: 'python',
        concept: 'iterative traversal ordering',
        prompt: 'This iterative preorder prints the tree mirrored. What is wrong?',
        code: `out, stack = [], [root]
while stack:
    node = stack.pop()
    out.append(node.value)
    if node.left:  stack.append(node.left)
    if node.right: stack.append(node.right)`,
        options: [
          'The children are pushed in the wrong order: push right first so left is popped first',
          'It should use a queue rather than a stack',
          '`out.append` should happen after the children are pushed',
          'The loop should check `node is not None` instead of `while stack`',
        ],
        answerIndex: 0,
        explanation:
          'A stack reverses the order things come out, so pushing left then right pops right first and produces node-right-left. Pushing right first restores true preorder.',
      },
      {
        id: 'DSA-009-q6',
        type: 'explain',
        concept: 'why height matters',
        prompt: 'Explain why the height of a tree, rather than its node count, determines the cost of most tree operations — and what can go wrong.',
        rubric: [
          'Says most operations are a single root-to-leaf walk, so cost is proportional to height',
          'Says a balanced binary tree has height about log2(n), because each level can hold twice the previous one',
          'Says a degenerate tree has height n - 1 and every operation becomes linear, and names a cause such as inserting sorted data',
        ],
        sampleAnswer:
          'Searching, inserting or predicting in a tree means starting at the root and following one path down until you reach a leaf, so the number of steps is the length of that path, not the number of nodes in the tree. Because each level of a binary tree can hold twice as many nodes as the one above, n nodes fit into roughly log2(n) levels, which is why a million-node balanced tree is only about twenty steps deep. The danger is that nothing enforces this automatically: if values arrive in sorted order and each new one goes to the right of the last, every node ends up with a single child, the height becomes n - 1, and the tree is a linked list wearing a costume — every operation is O(n), and recursive traversal overflows the call stack. That is why self-balancing trees exist and why complexity for trees should be quoted as O(h), with a separate statement of what h is.',
        explanation:
          'The examinable idea is the relationship between height and node count, plus the awareness that balance is a property that must be maintained rather than assumed.',
      },
    ],

    flashcards: [
      { front: 'Height of a balanced binary tree with n nodes?', back: 'About log2(n), because each level can hold twice as many nodes as the one above. A degenerate tree has height n - 1.' },
      { front: 'The four traversals in one line', back: 'Preorder: node, left, right. Inorder: left, node, right. Postorder: left, right, node. Level-order: by depth, using a queue.' },
      { front: 'Which traversal sorts a BST?', back: 'Inorder — every left descendant is smaller and every right larger, so left-node-right emits ascending values.' },
      { front: 'Which traversal evaluates an expression tree?', back: 'Postorder: both operands are computed before the operator is applied.' },
      { front: 'Space cost: depth-first versus level-order', back: 'Depth-first is O(h), the current path. Level-order is O(w), a whole level — about n/2 for a balanced tree.' },
      { front: 'Stack or queue: what changes?', back: 'A stack gives depth-first order, a queue gives breadth-first. Same skeleton, different structure, different algorithm.' },
    ],

    challenge: {
      title: 'Serialise and rebuild a binary tree',
      brief:
        'Write serialise(root) producing a single string, and deserialise(s) rebuilding an identical tree, such that deserialise(serialise(t)) matches t for every tree including empty ones, single nodes and heavily skewed ones. Use preorder with explicit markers for absent children so the structure is unambiguous. Include a round-trip test over at least four differently shaped trees and an iterative traversal that verifies equality without recursion, then state the time and space complexity of both directions.',
      language: 'python',
      acceptanceCriteria: [
        'Null children are represented explicitly so that skewed trees round-trip correctly',
        'Deserialisation is a single pass over the tokens, not a repeated search',
        'The test covers the empty tree, a single node, a balanced tree and a left-skewed chain',
        'Both directions are stated as O(n) time and O(n) space, with a justification',
      ],
      starterCode: 'NULL = "#"\n\ndef serialise(root):\n    parts = []\n    # preorder walk, emitting NULL for missing children\n    ...\n    return ",".join(parts)\n\ndef deserialise(s):\n    tokens = iter(s.split(","))\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone what a tree is, why height is the number that matters, and why there are four different ways to walk one.',
      mustCover: [
        'A tree is a hierarchy: one root, every other node with exactly one parent, and no cycles',
        'Height determines the cost of most operations, because they walk root to leaf',
        'A balanced binary tree has height about log2(n); a degenerate one is effectively a linked list',
        'The traversal orders differ in when a node is visited relative to its children, and each suits a different task',
      ],
      bonusSignals: ['gives an example of each traversal being the right choice', 'notes that swapping a stack for a queue changes depth-first to breadth-first', 'mentions decision trees or parse trees as real instances'],
      sampleExplanation:
        'A tree is data arranged as a hierarchy: one item at the top called the root, each other item hanging beneath exactly one parent, and no way to loop back around. Folders, org charts, parsed sentences and the decision trees a model learns all have this shape. The number that governs everything is the height — how many levels deep it goes — because nearly every operation is a walk from the root down to a leaf, and the height is the length of that walk. When a binary tree is nicely spread out, each level holds twice as many items as the one above, so a million items sit only about twenty levels down, and operations are cheap. When items arrive in sorted order and always attach to the same side, the tree degenerates into a long chain, the height becomes the item count, and it is no better than a list. As for walking the tree, the four standard orders differ only in when you deal with a node relative to its children: before them if you are copying the structure, between them if you want a search tree in sorted order, after them if you are computing something that depends on the children, and level by level if you want the shallowest items first.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-010',
    domain: 'DSA',
    module: 'Trees & Heaps',
    topic: 'Ordered trees',
    title: 'Binary Search Trees',
    slug: 'binary-search-trees',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DSA-009'],
    related: ['DSA-007', 'DSA-009'],
    tags: ['bst', 'search-tree', 'rotation', 'balance', 'ordered-map'],

    learningObjectives: [
      'State the binary search tree invariant precisely and use it to search in O(h) comparisons',
      'Insert into a BST and explain why insertion order determines the resulting shape',
      'Delete a node in all three cases, including the two-child case via the inorder successor',
      'Explain how a BST degenerates into a list, and what a self-balancing tree does about it',
    ],

    terminology: [
      {
        term: 'BST invariant',
        definition:
          'For every node, all values in its left subtree are smaller and all values in its right subtree are larger. The condition applies to entire subtrees, not merely to the immediate children.',
        simple: 'Everything on the left is smaller, everything on the right is bigger — all the way down.',
      },
      {
        term: 'Inorder successor',
        definition:
          'The next-largest value in the tree: the leftmost node of the right subtree when one exists. It is the value that replaces a deleted node with two children.',
        simple: 'The smallest value that is still bigger than this one.',
      },
      {
        term: 'Degenerate tree',
        definition:
          'A BST whose nodes each have at most one child, so its height is n - 1. Inserting already-sorted data into an unbalanced BST produces exactly this.',
        simple: 'A search tree that has collapsed into a long chain.',
      },
      {
        term: 'Rotation',
        definition:
          'A local, constant-time restructuring that changes the height of a subtree while preserving the BST invariant. Self-balancing trees use rotations to keep the height logarithmic.',
        simple: 'A small rearrangement that makes a lopsided branch shorter without breaking the ordering.',
      },
      {
        term: 'Ordered map',
        definition:
          'A key-value structure that also supports order-dependent queries: minimum, maximum, predecessor, successor and range scans. A balanced BST provides one; a hash table does not.',
        simple: 'A dictionary that also knows what comes next.',
      },
    ],

    simpleExplanation:
      "A binary search tree is a tree with one rule attached: at every node, everything smaller goes left and everything larger goes right. That rule turns a tree into a decision procedure. To find a value you compare it with the root and go one way, then compare again and go one way, discarding half the remaining possibilities at each step — the same halving that makes looking up a name in a physical dictionary fast. If the tree is nicely spread out, a million values are about twenty comparisons from the root. The rule also means that reading the tree left-node-right emits everything in sorted order, for free, which is something a hash table can never do. The catch is that nothing in the basic structure enforces the spread. Insert values that already arrive in ascending order and every one attaches to the right of the last, producing a chain with the height of a list and none of a list's compactness. That single failure mode is why real systems use self-balancing variants that rearrange themselves as they go.",

    whyItExists:
      'Hash tables answer "is this exact key present?" in constant time but know nothing about order, so they cannot give you the minimum, the next key, or everything between two bounds. A search tree keeps data ordered while still offering logarithmic lookup, which is what range queries, sorted iteration and successor queries require.',

    analogy: {
      scenario:
        "Imagine guessing a number between 1 and 100 where each guess is answered only with 'higher' or 'lower'. Guess 50, hear 'higher', and ninety-nine possibilities become forty-nine. Guess 75, hear 'lower', and you are down to twenty-four. Seven guesses are enough for any number, because each answer halves what remains. A binary search tree is that game frozen into a structure: each node is a question already asked, its left branch is the 'lower' answer and its right branch is the 'higher' one. But the tree only plays well if the questions were well chosen. If the first question was 'is it higher than 1?', then 'higher than 2?', then 'higher than 3?', you are not halving anything — you are counting.",
      mapping: [
        { from: 'Each guess and its higher/lower answer', to: 'A comparison at a node, choosing the left or right child' },
        { from: 'Halving the remaining range', to: 'Discarding one entire subtree at each step' },
        { from: 'Seven guesses for a hundred numbers', to: 'O(log n) search in a balanced tree' },
        { from: 'Asking "higher than 1? higher than 2?"', to: 'A degenerate tree built from sorted insertions: O(n) search' },
        { from: 'Choosing a middle number to guess', to: 'Balance — which rotations maintain automatically in an AVL or red-black tree' },
      ],
      bridge:
        'The guessing game explains both the promise and the failure in one picture. The logarithm comes from discarding half the candidates per comparison, and it is available only when each node genuinely sits near the middle of the values beneath it. The BST invariant guarantees correctness — you will never look in the wrong subtree — but it says nothing about shape, and shape is where the performance lives.',
      limitations:
        'The analogy suggests you may pick your questions. In a BST you do not: the shape is dictated by the order the data arrived, which is why balancing has to be done actively by the structure rather than chosen up front.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Search, insert and watch the shape emerge',
        caption: 'Insert values in sorted order, then in shuffled order, and compare the resulting heights.',
        widget: 'binary-tree',
        props: { mode: 'bst' },
      },
      {
        kind: 'ascii',
        title: 'The tree built in this unit',
        caption: 'Inserted in the order 50, 30, 70, 20, 40, 60, 80.',
        art: `          50
        /    \\
      30      70
     /  \\    /  \\
   20    40 60    80`,
      },
      {
        kind: 'flow',
        title: 'Deleting a node: three cases',
        caption: 'Every deletion is one of these, and the third is the only one with any subtlety.',
        steps: [
          { label: 'Find the node', detail: 'Walk down comparing, O(h). If it is absent, there is nothing to do.' },
          { label: 'Case 1 — leaf', detail: 'No children: detach it by setting the parent link to None.' },
          { label: 'Case 2 — one child', detail: 'Promote the single child into the deleted node\'s place. The invariant is preserved because the whole subtree already sat on the correct side.' },
          { label: 'Case 3 — two children', detail: 'Find the inorder successor: the leftmost node of the right subtree. Copy its value into the node being deleted.' },
          { label: 'Delete the successor', detail: 'The successor has no left child by construction, so removing it is case 1 or case 2 — the recursion cannot go deeper than one more level.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Hash table versus balanced search tree',
        caption: 'Choose by whether you need order.',
        left: {
          heading: 'Hash table (dict)',
          points: [
            'Lookup, insert, delete: O(1) average',
            'No ordering: no min, no successor, no range query',
            'Keys must be hashable',
            'The right default whenever you only ask about exact keys',
          ],
        },
        right: {
          heading: 'Balanced BST (ordered map)',
          points: [
            'Lookup, insert, delete: O(log n) worst case',
            'Sorted iteration, min, max, predecessor, successor, range scans',
            'Keys must be comparable rather than hashable',
            'Worth the log factor whenever order is part of the question',
          ],
        },
      },
    ],

    formalDefinition:
      'A binary search tree is a binary tree in which every node v satisfies: all keys in the left subtree of v are less than key(v), and all keys in the right subtree of v are greater. Search, insertion and deletion each follow a single root-to-leaf path and therefore run in O(h) time, where h is the height; h is O(log n) when the tree is balanced and O(n) in the degenerate case. An inorder traversal visits keys in ascending order, in O(n).',

    math: {
      intuition:
        'Each comparison discards one entire subtree, so the number of candidates falls by roughly half per step when the tree is balanced — that is where the logarithm comes from. The averaging result is also worth knowing: if n distinct keys are inserted in uniformly random order, the expected height is about 1.39 log2 n, so a randomly built BST is nearly balanced by accident. It is only adversarial or sorted input that ruins it, which is exactly the input real systems tend to have.',
      formulas: [
        {
          latex: 'T_{\\text{search}} = T_{\\text{insert}} = T_{\\text{delete}} = O(h)',
          name: 'BST operation cost',
          meaning: 'Every basic operation follows one root-to-leaf path, so cost is the height, not the node count.',
          category: 'complexity',
          variables: [
            { symbol: 'h', meaning: 'Height of the tree: O(log n) balanced, O(n) degenerate' },
            { symbol: 'n', meaning: 'Number of stored keys' },
          ],
        },
        {
          latex: 'E[h_{\\text{random}}] \\approx 4.31 \\ln n \\approx 2.99 \\log_2 n',
          name: 'Expected height of a randomly built BST',
          meaning: 'Random insertion order gives a height within a constant factor of optimal — which is why randomised insertion or a treap works.',
          category: 'complexity',
          variables: [
            { symbol: 'E[h]', meaning: 'Expected height over all n! insertion orders, each equally likely' },
            { symbol: 'n', meaning: 'Number of keys inserted' },
          ],
        },
        {
          latex: 'h_{\\text{AVL}} < 1.44 \\log_2 (n + 2) - 0.33',
          name: 'AVL height bound',
          meaning: 'An AVL tree keeps every node\'s subtree heights within one of each other, bounding the height at under 1.44 log2 n and guaranteeing O(log n) worst case.',
          category: 'complexity',
          variables: [
            { symbol: 'h_{\\text{AVL}}', meaning: 'Height of an AVL tree holding n keys' },
            { symbol: '1.44', meaning: 'The constant arising from the Fibonacci-shaped worst case, the sparsest legal AVL tree' },
          ],
        },
      ],
      derivation: [
        'A search compares the target with the current node and descends into exactly one child.',
        'Each descent discards the other subtree entirely, so the candidate set shrinks by the size of that subtree.',
        'In a balanced tree the two subtrees have roughly equal size, so the candidate set halves: n, n/2, n/4, ...',
        'The process stops when one candidate remains, after about log2 n steps.',
        'In a degenerate tree the discarded subtree is empty, so the candidate set shrinks by one per step, giving n steps.',
        'Therefore the complexity is O(h), and the whole engineering problem is keeping h logarithmic.',
      ],
    },

    workedExample: {
      title: 'Insert, search and delete on a seven-node BST',
      setup:
        'Insert 50, 30, 70, 20, 40, 60, 80 in that order into an empty BST, then search for 40, then delete 30. Each insertion walks down until it finds an empty slot.',
      steps: [
        { label: 'Insert 50', detail: 'The tree is empty, so 50 becomes the root. Height 0.' },
        { label: 'Insert 30', detail: '30 < 50, go left; the slot is empty, so 30 becomes the left child of 50.' },
        { label: 'Insert 70', detail: '70 > 50, go right; empty, so 70 becomes the right child.' },
        { label: 'Insert 20 and 40', detail: '20 < 50 then 20 < 30, so it lands left of 30. 40 < 50 then 40 > 30, so it lands right of 30. Two comparisons each.' },
        { label: 'Insert 60 and 80', detail: 'Symmetrically, 60 lands left of 70 and 80 right of 70. The tree is now perfectly balanced with height 2 and 7 nodes.' },
        { label: 'Search 40', detail: 'Compare with 50: smaller, go left. Compare with 30: larger, go right. Compare with 40: found. Three comparisons, equal to depth + 1 — and log2(7) is about 2.8, so this is the logarithmic behaviour in action.' },
        { label: 'Search 45 (absent)', detail: '45 < 50 go left, 45 > 30 go right, 45 > 40 go right — the slot is empty, so 45 is absent. Failure also costs O(h), and the empty slot reached is precisely where 45 would be inserted.' },
        { label: 'Delete 30 — identify the case', detail: '30 has two children (20 and 40), so this is case 3. Find its inorder successor: the leftmost node of the right subtree, which is 40 itself since 40 has no left child.' },
        { label: 'Delete 30 — replace and remove', detail: 'Copy 40 into the node currently holding 30, then delete the original 40 node, which is a leaf: case 1. Result: 50 with children 40 and 70; 40 has left child 20.' },
        { label: 'Verify with inorder', detail: 'Inorder now gives 20, 40, 50, 60, 70, 80 — still ascending, so the invariant survived the deletion. Checking with an inorder traversal is the fastest way to catch a broken BST operation.' },
        { label: 'The degenerate contrast', detail: 'Inserting 20, 30, 40, 50, 60, 70, 80 in ascending order instead gives a right-leaning chain of height 6. Searching for 80 takes 7 comparisons instead of 3, and at n = 1,000,000 it would take a million instead of twenty.' },
      ],
      conclusion:
        'Search, insert and delete are each O(h) time — three comparisons here, versus seven in the degenerate version of the same data — with O(1) auxiliary space if written iteratively, or O(h) stack space if recursive. Space for the structure is O(n). The deletion case analysis matters because only case 3 has subtlety: replacing with the inorder successor preserves the invariant precisely because the successor is, by definition, greater than everything in the left subtree and smaller than everything remaining in the right. This example also shows the whole weakness of the plain BST: identical data in a different arrival order gives identical correctness and completely different performance.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A BST with search, insert and the three-case delete',
        runnable: true,
        code: `class Node:
    __slots__ = ("key", "left", "right")
    def __init__(self, key):
        self.key, self.left, self.right = key, None, None

def insert(node, key):
    if node is None:
        return Node(key)
    if key < node.key:
        node.left = insert(node.left, key)
    elif key > node.key:
        node.right = insert(node.right, key)
    return node                       # equal keys are ignored: a set, not a multiset

def search(node, key):                # iterative: O(h) time, O(1) space
    steps = 0
    while node:
        steps += 1
        if key == node.key:
            return True, steps
        node = node.left if key < node.key else node.right
    return False, steps

def delete(node, key):
    if node is None:
        return None
    if key < node.key:
        node.left = delete(node.left, key)
    elif key > node.key:
        node.right = delete(node.right, key)
    else:
        if node.left is None:  return node.right      # cases 1 and 2
        if node.right is None: return node.left
        succ = node.right                              # case 3
        while succ.left:
            succ = succ.left
        node.key = succ.key
        node.right = delete(node.right, succ.key)
    return node

def inorder(node, out=None):
    out = [] if out is None else out
    if node:
        inorder(node.left, out); out.append(node.key); inorder(node.right, out)
    return out

root = None
for k in [50, 30, 70, 20, 40, 60, 80]:
    root = insert(root, k)
print(inorder(root))
print(search(root, 40), search(root, 45))
root = delete(root, 30)
print(inorder(root))`,
        output: `[20, 30, 40, 50, 60, 70, 80]
(True, 3) (False, 3)
[20, 40, 50, 60, 70, 80]`,
        explanation:
          'Insert and delete return the (possibly new) subtree root, which is the idiom that removes all parent-pointer bookkeeping — each recursive call reattaches its result to the caller. The two-child delete copies the successor\'s key rather than relinking nodes, which is simpler and correct; note that the recursive removal of the successor is guaranteed to hit case 1 or 2, because a leftmost node has no left child. Searching for an absent key costs the same O(h) as a successful search, and lands exactly where the key would be inserted.',
      },
      {
        language: 'python',
        title: 'Degeneration, measured',
        runnable: true,
        code: `import random

def height(node):
    return -1 if node is None else 1 + max(height(node.left), height(node.right))

n = 2_000

sorted_root = None
for k in range(n):                    # ascending input: the worst case
    sorted_root = insert(sorted_root, k)

shuffled = list(range(n))
random.shuffle(shuffled)
random_root = None
for k in shuffled:
    random_root = insert(random_root, k)

print(f"sorted insertion  -> height {height(sorted_root)}")
print(f"random insertion  -> height {height(random_root)} (log2 n is {n.bit_length() - 1})")
print("search cost in the sorted tree: ", search(sorted_root, n - 1)[1])
print("search cost in the random tree: ", search(random_root, n - 1)[1])`,
        output: `sorted insertion  -> height 1999
random insertion  -> height 25 (log2 n is 10)
search cost in the sorted tree:  2000
search cost in the random tree:  17`,
        explanation:
          'The same two thousand keys give a tree of height 1,999 or a tree of height 25 depending only on arrival order — a hundredfold difference in search cost, with no difference in the data. Note that the random tree\'s height of about 25 is roughly 2.5 times log2(2000), matching the expected 1.39 * log2 n to 3 * log2 n range from the theory. In practice sorted input is common, not exotic: database keys, timestamps and id columns all arrive in order, which is why an unbalanced BST is a trap rather than a curiosity.',
      },
      {
        language: 'python',
        title: 'What you actually use in Python',
        runnable: true,
        code: `import bisect

# There is no built-in BST. For a sorted sequence, bisect gives the same queries.
prices = [10, 25, 33, 47, 58, 71, 90]

i = bisect.bisect_left(prices, 47)
print("index of 47:", i)                              # O(log n) search
print("first >= 40:", prices[bisect.bisect_left(prices, 40)])   # successor
print("range 30..60:", prices[bisect.bisect_left(prices, 30):bisect.bisect_right(prices, 60)])

bisect.insort(prices, 50)          # O(log n) to find, O(n) to shift
print(prices)

# For heavy insert-and-query workloads, sortedcontainers.SortedList is the
# practical answer: O(log n) add and remove with excellent constant factors.`,
        output: `index of 47: 3
first >= 40: 47
range 30..60: [33, 47, 58]
prices: [10, 25, 33, 47, 50, 58, 71, 90]`,
        explanation:
          'Python ships no balanced BST, and most of the time you do not need one: a sorted list plus `bisect` gives O(log n) search, successor and range queries, which covers the majority of ordered-map needs. The catch is `insort`, which finds the position in O(log n) but then shifts elements in O(n) — fine for occasional insertion, wrong for a write-heavy workload. For that, `sortedcontainers.SortedList` maintains a list of lists and achieves effectively logarithmic updates. Knowing that a dict cannot answer "what is the next key after this one" is the point at which you go looking for one of these.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Database indexes',
        usage:
          'A B-tree index — a search tree with high branching factor chosen so each node fills a disk page — is what makes `WHERE created_at BETWEEN ... AND ...` fast. A hash index cannot serve that query at all, because hashing destroys order.',
      },
      {
        context: 'Decision trees in machine learning',
        usage:
          'Each internal node tests `feature <= threshold`, sending smaller values one way and larger the other. Prediction is a root-to-leaf walk in exactly the BST sense, and `max_depth` is a direct cap on that walk.',
      },
      {
        context: 'Interval and range queries in time-series systems',
        usage:
          'Monitoring stores keep measurements in ordered structures so that "everything between 09:00 and 09:05" is a range scan rather than a full pass. Order is the entire point, so a hash map is not an option.',
      },
    ],

    projectConnections: [
      { tool: 'bisect', role: 'Binary search over a sorted list: the standard-library substitute for a BST when reads dominate writes.' },
      { tool: 'sortedcontainers', role: 'Pure-Python SortedList, SortedDict and SortedSet with logarithmic updates — the practical ordered map in Python.' },
      { tool: 'scikit-learn DecisionTreeClassifier', role: 'A learned search tree: thresholds instead of keys, with depth controlling both accuracy and inference cost.' },
    ],

    commonMistakes: [
      {
        mistake: 'Checking only the immediate children when validating a BST',
        why: 'The invariant constrains entire subtrees, so a tree can satisfy every local parent-child comparison and still be invalid — a node in the far left subtree can exceed the root.',
        fix: 'Validate with a min/max bound passed down the recursion, or simply check that an inorder traversal is strictly ascending.',
      },
      {
        mistake: 'Assuming a BST is balanced',
        why: 'Nothing in the basic structure enforces balance, and real inputs — ids, timestamps, sorted exports — are frequently ordered, which produces the worst case rather than a rare one.',
        fix: 'Quote complexity as O(h) and say what h is. Use a self-balancing structure, randomise insertion order, or use a sorted list with bisect if reads dominate.',
      },
      {
        mistake: 'Deleting a two-child node by promoting an arbitrary child',
        why: 'Promoting the left or right child directly breaks the invariant, because that child\'s subtree does not span the deleted node\'s whole range.',
        fix: 'Replace with the inorder successor (or predecessor) and then delete that node, which by construction has at most one child.',
      },
      {
        mistake: 'Reaching for a BST when a dict would do',
        why: 'A hash table is O(1) rather than O(log n) and needs no balancing; the tree only earns its keep when you need order — min, max, successor or range.',
        fix: 'Ask what queries you actually run. Only order-dependent queries justify the tree, and in Python that usually means bisect or sortedcontainers rather than a hand-written BST.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'How do you validate that a binary tree is a valid BST?',
        answer:
          'Recurse with a permitted range for each node. The root may hold any value; the left child is constrained to (-infinity, root), the right child to (root, +infinity), and each level narrows the interval further. At each node check that its key lies strictly inside the interval, then recurse with updated bounds. It is O(n) time and O(h) space. The common wrong answer compares only each node with its two children, which accepts invalid trees — a node deep in the left subtree can exceed the root while satisfying every local comparison. An equally valid approach is to run an inorder traversal and check that it is strictly ascending, which has the same complexity and is easier to get right, though the bounds version short-circuits sooner on a violation.',
        followUp:
          'Asking how duplicates should be handled is a good probe: the invariant must be stated as strictly less and strictly greater, or a consistent convention chosen and documented.',
      },
      {
        level: 'intermediate',
        question: 'When would you choose a balanced BST over a hash table?',
        answer:
          'Whenever the queries involve order. A hash table gives O(1) exact-key lookup but knows nothing about relative position, so it cannot answer "what is the smallest key", "what key comes after this one", "give me everything between two bounds" or "iterate in sorted order" without an O(n log n) sort. A balanced BST answers all of those in O(log n) or O(log n + k) for a range of k results, at the cost of a logarithmic rather than constant lookup and the requirement that keys be comparable rather than hashable. That is precisely why database indexes are B-trees rather than hash tables: range predicates and ORDER BY dominate real queries. If every query is an exact-key lookup, the hash table is strictly better.',
        followUp:
          'Mentioning that Python has no built-in balanced tree, and that bisect or sortedcontainers fills the gap, shows practical rather than academic knowledge.',
      },
      {
        level: 'advanced',
        question: 'What does a rotation do, and why does a self-balancing tree need them?',
        answer:
          'A rotation is a constant-time relinking of three references that changes the local shape of a subtree while preserving the inorder sequence, and therefore the BST invariant. A right rotation at node y with left child x makes x the new subtree root, y its right child, and x\'s former right subtree becomes y\'s left subtree — the inorder order of all involved nodes is unchanged, but the height of one side drops by one. Self-balancing trees need them because insertion and deletion can only make a tree taller or shorter at one path, and a local repair is the only way to restore a height invariant without rebuilding. AVL trees keep the subtree heights within one and perform at most two rotations per insertion; red-black trees keep a weaker colour-based invariant and so rotate less but allow a taller tree, up to 2 log2(n+1). The trade is rebalancing work against query depth, which is why AVL is preferred for read-heavy workloads and red-black for write-heavy ones.',
        followUp:
          'Being able to say that a B-tree generalises this to many keys per node, chosen to match a disk page, connects the topic to database internals.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a function returning the k-th smallest key in a BST. State the complexity and how you would improve it for repeated queries.',
        hint: 'Which traversal emits keys in sorted order, and can you stop early?',
        solution:
          'def kth_smallest(root, k):\n    stack, node = [], root\n    while stack or node:\n        while node:\n            stack.append(node)\n            node = node.left\n        node = stack.pop()\n        k -= 1\n        if k == 0:\n            return node.key\n        node = node.right\n    return None\n\nThis is an iterative inorder traversal that stops as soon as the k-th value is emitted, so it is O(h + k) time and O(h) space — much better than traversing the whole tree when k is small. For repeated queries, store a subtree size in every node and maintain it on insert and delete; then you can descend directly, comparing k with the left subtree size at each step, giving O(h) per query. That augmented structure is called an order-statistic tree and is how databases answer percentile queries on an index.',
      },
      {
        prompt: 'Explain what happens when you insert the keys 1 through 1,000 in ascending order into a plain BST, and give two different fixes.',
        hint: 'Where does each new key attach?',
        solution:
          'Every key is larger than all those before it, so each one walks the entire right spine and attaches at the bottom: the tree becomes a right-leaning chain of height 999. Insertion i costs i comparisons, so building the tree is O(n^2) — about 500,000 comparisons — and every subsequent search is O(n). Recursive traversal would also raise RecursionError.\n\nFix one: shuffle the input before insertion, which gives an expected height of about 1.39 log2 n, roughly 14 here. This is cheap and effective when you control the insertion order and the data is static. Fix two: use a self-balancing structure that rotates on insertion — an AVL or red-black tree, or in Python a `sortedcontainers.SortedList` — which guarantees O(log n) regardless of arrival order. The second is the right answer for a live system, because you rarely control the order in which data arrives.',
      },
      {
        prompt: 'Implement a range query: return all keys in [low, high] in sorted order, visiting as few nodes as possible.',
        hint: 'Use the invariant to prune: if the node key is below low, the whole left subtree is irrelevant.',
        solution:
          'def range_query(node, low, high, out=None):\n    out = [] if out is None else out\n    if node is None:\n        return out\n    if node.key > low:\n        range_query(node.left, low, high, out)      # left may contain matches\n    if low <= node.key <= high:\n        out.append(node.key)\n    if node.key < high:\n        range_query(node.right, low, high, out)     # right may contain matches\n    return out\n\nThe two guards are the pruning: if the current key is not greater than low, nothing in the left subtree can be in range, so the entire subtree is skipped in O(1). The complexity is O(h + k) where k is the number of results, since the traversal follows at most two root-to-leaf boundary paths plus the matched region. This is the operation that justifies choosing a tree over a hash table, and it is exactly what a database does for a BETWEEN predicate on an indexed column.',
      },
    ],

    quiz: [
      {
        id: 'DSA-010-q1',
        type: 'mcq',
        concept: 'bst invariant',
        prompt: 'Which statement correctly expresses the binary search tree invariant?',
        options: [
          'For every node, all keys in the left subtree are smaller and all keys in the right subtree are larger',
          'Each node\'s left child is smaller and right child is larger than it',
          'The tree is balanced, with left and right subtree heights differing by at most one',
          'Keys are stored in level order from smallest to largest',
        ],
        answerIndex: 0,
        explanation:
          'The condition applies to whole subtrees, not just immediate children — which is exactly why validating by comparing each node with its two children accepts invalid trees.',
      },
      {
        id: 'DSA-010-q2',
        type: 'numeric',
        concept: 'search cost',
        prompt: 'In the tree built from 50, 30, 70, 20, 40, 60, 80, how many key comparisons does searching for 40 require?',
        answer: 3,
        explanation:
          'Compare with 50 (go left), with 30 (go right), then with 40 (found): three comparisons, equal to the node\'s depth plus one. For a balanced tree this is about log2(n).',
      },
      {
        id: 'DSA-010-q3',
        type: 'truefalse',
        concept: 'degeneration',
        prompt: 'Inserting already-sorted keys into a plain BST produces a tree with O(log n) height.',
        answer: false,
        explanation:
          'Each key is larger than all previous ones, so it attaches at the bottom of the right spine. The height becomes n - 1 and every operation degrades to O(n) — the tree is a linked list with extra overhead.',
      },
      {
        id: 'DSA-010-q4',
        type: 'mcq',
        concept: 'deletion',
        prompt: 'When deleting a node with two children, which value replaces it?',
        options: [
          'The inorder successor: the leftmost node of its right subtree',
          'Its left child, promoted directly',
          'The largest value in the whole tree',
          'Any leaf node, chosen arbitrarily',
        ],
        answerIndex: 0,
        explanation:
          'The inorder successor is greater than everything in the left subtree and smaller than everything remaining in the right, so it is the unique value that preserves the invariant. It has no left child, so removing it is the easy case.',
      },
      {
        id: 'DSA-010-q5',
        type: 'match',
        concept: 'structure selection',
        prompt: 'Match each query to the structure that answers it efficiently.',
        pairs: [
          { left: 'Is key k present?', right: 'Hash table — O(1) average' },
          { left: 'What is the smallest key?', right: 'Balanced BST — O(log n)' },
          { left: 'All keys between a and b', right: 'Balanced BST — O(log n + k)' },
          { left: 'Iterate all keys in sorted order', right: 'Balanced BST — O(n) inorder, no sort needed' },
        ],
        explanation:
          'Hashing destroys order, so anything order-dependent needs a tree. Anything that only asks about an exact key should use the hash table, which is a constant factor faster and needs no balancing.',
      },
      {
        id: 'DSA-010-q6',
        type: 'explain',
        concept: 'balance',
        prompt: 'Explain why a BST gives O(log n) operations in theory but can give O(n) in practice, and what is done about it.',
        rubric: [
          'Says each comparison discards one subtree, halving the candidates only when the tree is balanced',
          'Says nothing in the plain structure enforces balance, and sorted input produces a chain of height n - 1',
          'Names a remedy: self-balancing via rotations (AVL, red-black), randomised insertion, or a different structure',
        ],
        sampleAnswer:
          'Every operation walks one path from the root to a leaf, and each comparison lets you throw away an entire subtree. When the two subtrees are of similar size, that means halving the remaining candidates at each step, so the path is about log2 n long. But the invariant only guarantees correctness, not shape: it says where a key must go, not that the result will be bushy. If keys arrive in ascending order — and ids, timestamps and sorted exports usually do — every new key attaches to the bottom of the right spine and the tree becomes a chain of height n - 1, so searches become linear scans and recursive traversal overflows the stack. The fix is to rebalance actively. AVL and red-black trees perform constant-time rotations during insertion and deletion to keep the height logarithmic in the worst case; alternatively, shuffling the input gives an expected height of about 1.4 log2 n, and in Python a sorted list with bisect or sortedcontainers is usually the pragmatic answer.',
        explanation:
          'The examinable judgement is separating the correctness invariant from the shape property, and recognising that the pathological input is the common case rather than an exotic one.',
      },
    ],

    flashcards: [
      { front: 'State the BST invariant', back: 'For every node, all keys in its left subtree are smaller and all keys in its right subtree are larger — subtrees, not just children.' },
      { front: 'Cost of BST search, insert and delete', back: 'O(h): logarithmic when balanced, linear when degenerate. Always quote h and then say what h is.' },
      { front: 'Deleting a node with two children', back: 'Replace its key with the inorder successor (leftmost node of the right subtree), then delete that successor, which has at most one child.' },
      { front: 'How does a BST degenerate?', back: 'Sorted insertions: every key attaches to the right spine, giving height n - 1 and O(n) operations.' },
      { front: 'BST versus hash table', back: 'Hash: O(1) exact lookup, no order. BST: O(log n) lookup plus min, max, successor, range and sorted iteration.' },
      { front: 'Python\'s ordered structures', back: 'No built-in BST. Use `bisect` over a sorted list for read-heavy work, or `sortedcontainers.SortedList` for logarithmic updates.' },
    ],

    challenge: {
      title: 'An ordered map with range queries and a balance report',
      brief:
        'Implement a BST-backed ordered map supporting put, get, delete, min, max, successor and range(low, high). Track and expose the height after every operation. Then build the same 5,000 keys twice — once in sorted order and once shuffled — and produce a short report comparing final height, average search comparisons over 1,000 random lookups, and the theoretical log2(n). Finish by describing in two sentences which rotation you would apply to fix the worst imbalance you observed.',
      language: 'python',
      acceptanceCriteria: [
        'range(low, high) prunes subtrees rather than traversing the whole tree',
        'Deletion handles all three cases and is verified by checking inorder output stays ascending',
        'The report gives measured average comparison counts for both insertion orders, not just heights',
        'The closing note correctly names a left or right rotation and what it would achieve',
      ],
      starterCode: 'class Node:\n    __slots__ = ("key", "value", "left", "right")\n    def __init__(self, key, value):\n        self.key, self.value = key, value\n        self.left = self.right = None\n\nclass OrderedMap:\n    def __init__(self):\n        self.root = None\n        self.comparisons = 0\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who understands binary trees what makes a binary search tree different, why it is fast, and why it sometimes is not.',
      mustCover: [
        'The invariant: everything in the left subtree is smaller, everything in the right is larger',
        'Each comparison discards an entire subtree, which is where the logarithm comes from',
        'Inorder traversal emits the keys in sorted order, which a hash table cannot do',
        'Sorted insertions produce a chain of height n - 1, so balance must be maintained actively',
      ],
      bonusSignals: ['connects the halving to the higher/lower guessing game', 'names the two-child deletion rule', 'says when a dict would be the better choice'],
      sampleExplanation:
        'A binary search tree adds one rule to an ordinary binary tree: at every node, everything smaller sits in the left branch and everything larger in the right — and that holds for the whole branch, not just the immediate child. The rule turns the tree into the higher-or-lower guessing game. You compare your value with the root, learn which half it is in, and throw the other half away; compare again and throw half of what remains away. When the tree is nicely spread, twenty comparisons are enough for a million values. You also get sorted order for nothing: walking left, then the node, then right emits every key in ascending sequence, which is why databases index with search trees rather than hash tables — hashing cannot answer "give me everything between these two dates". The weakness is that the rule fixes where each value must go but says nothing about the resulting shape. Feed it values that are already in order and each one attaches below the last, so the tree grows into a straight chain and every search becomes a scan. Real implementations therefore rebalance themselves as they go, with small local rearrangements called rotations.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-011',
    domain: 'DSA',
    module: 'Trees & Heaps',
    topic: 'Partial order and top-k',
    title: 'Heaps and Priority Queues',
    slug: 'heaps-and-priority-queues',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['DSA-009'],
    related: ['DSA-003', 'DSA-006', 'DSA-009'],
    tags: ['heap', 'priority-queue', 'heapq', 'top-k', 'heapify'],

    learningObjectives: [
      'State the heap property and explain why it is weaker than sorting — and why that weakness is the point',
      'Map a complete binary tree onto an array using index arithmetic, with no pointers at all',
      'Trace sift-up and sift-down and justify the O(log n) cost of push and pop',
      'Solve top-k selection with a size-k heap in O(n log k) and say when that beats sorting',
    ],

    terminology: [
      {
        term: 'Heap property',
        definition:
          'In a min-heap, every node is less than or equal to both its children; in a max-heap, greater than or equal. It constrains parents and children only — siblings are unordered.',
        simple: 'Every box holds something no bigger than the boxes hanging under it.',
      },
      {
        term: 'Complete binary tree',
        definition:
          'A tree where every level is full except possibly the last, which fills left to right. This shape is what allows the tree to be stored in a contiguous array with no gaps.',
        simple: 'A tree with no holes, filled in reading order.',
      },
      {
        term: 'Sift-up and sift-down',
        definition:
          'The repair operations. Sift-up moves a too-small element towards the root after a push; sift-down moves a too-large element towards the leaves after a pop. Each walks one root-to-leaf path: O(log n).',
        simple: 'Letting a light item bubble up, or a heavy item sink down, until it sits in a legal place.',
      },
      {
        term: 'Priority queue',
        definition:
          'The abstract structure that always yields the highest-priority element next, regardless of insertion order. A heap is its standard implementation.',
        simple: 'A queue where importance, not arrival time, decides who is served next.',
      },
      {
        term: 'Heapify',
        definition:
          'Turning an arbitrary array into a heap in place. Done bottom-up it costs O(n), not O(n log n), because most nodes are near the leaves and sift down barely at all.',
        simple: 'Rearranging a whole pile into heap order in one sweep.',
      },
    ],

    simpleExplanation:
      "Sorting a million numbers to find the smallest ten is wasteful: you have carefully arranged 999,990 values you do not care about. A heap is the structure for when you only ever need the extreme. It keeps a much weaker promise than sorting — every parent is smaller than its children, and siblings are in no particular order — but that weak promise is enough to guarantee the very smallest value sits at the root, where you can see it instantly. Removing it costs only a walk down one path, fixing the order as you go, which is about twenty steps for a million items rather than a million. The second clever part is that this tree never actually exists as boxes and arrows. Because the tree is always filled in level by level with no gaps, you can store it in a plain array and compute where a node's children are with arithmetic: the children of position i live at 2i+1 and 2i+2. So a heap is a flat array with a rule, which makes it compact, cache-friendly and about as fast as a data structure gets.",

    whyItExists:
      'Repeatedly asking for the current minimum or maximum is common — schedulers, shortest-path algorithms, top-k retrieval — and both a sorted list and a linear scan are wrong for it: one pays too much per insertion, the other too much per query. A heap gives O(log n) for both.',

    analogy: {
      scenario:
        "Picture a hospital emergency department rather than a bakery queue. Nobody is served in arrival order; the most urgent case goes next. The triage nurse does not maintain a fully ranked list of every patient in the building, which would be enormous work and constantly out of date. She maintains something much weaker: each patient is grouped under someone at least as urgent as they are, so the single most urgent case is always known and immediately available at the top. When that patient goes through, the gap is filled by moving one person up and letting them settle to their proper level, which takes a few comparisons rather than a re-ranking of the whole department.",
      mapping: [
        { from: 'The single most urgent patient, always identified', to: 'The minimum (or maximum) sitting at the root: O(1) to peek' },
        { from: 'Not maintaining a full ranking of everyone', to: 'The heap property being weaker than sorted order' },
        { from: 'Filling the gap and letting the new top settle downward', to: 'Sift-down after a pop: O(log n)' },
        { from: 'A new arrival being placed and moving up past less urgent cases', to: 'Sift-up after a push: O(log n)' },
        { from: 'Two patients of similar urgency in no defined order', to: 'Siblings being unordered — a heap is not a sorted structure' },
      ],
      bridge:
        'The department works because it maintains exactly as much order as the question requires and no more. That is the structural insight: full sorting costs n log n and answers "what is the complete ranking", while the heap property costs O(log n) per update and answers only "what is the single most extreme item" — which, for a scheduler or a top-k query, is the only question ever asked.',
      limitations:
        'The analogy hides that a heap cannot search. Asking "is patient X waiting?" requires scanning every node, O(n), because the heap property gives no guidance about where a particular value lives. Heaps are for extremes, never for lookup.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'A min-heap and the array that holds it',
        caption: 'The tree is conceptual; the array is what exists in memory.',
        art: `            1                index: 0  1  2  3  4  5
          /   \\               array: [1, 3, 2, 7, 4, 5]
         3     2
        / \\   /                parent(i) = (i - 1) // 2
       7   4 5                 left(i)   = 2i + 1
                               right(i)  = 2i + 2`,
      },
      {
        kind: 'flow',
        title: 'What `heappop` does',
        caption: 'Five steps, and only the third involves any real work.',
        steps: [
          { label: 'Read the root', detail: 'Position 0 holds the minimum. This is the value that will be returned: O(1).' },
          { label: 'Move the last element to the root', detail: 'The array\'s final element fills the hole, keeping the tree complete with no gaps.' },
          { label: 'Sift down', detail: 'Compare with both children; swap with the smaller if it is less than the node. Repeat until both children are larger or a leaf is reached.' },
          { label: 'Shrink the array', detail: 'The last slot is discarded; the heap now holds n - 1 elements.' },
          { label: 'Cost', detail: 'The sift-down path is at most the height of the tree, so the whole operation is O(log n) with O(1) extra space.' },
        ],
      },
      {
        kind: 'table',
        title: 'Heap operations and their costs',
        columns: ['Operation', 'Complexity', 'Note'],
        rows: [
          ['Peek at the minimum', 'O(1)', 'It is always at index 0'],
          ['`heappush`', 'O(log n)', 'Append, then sift up at most the height'],
          ['`heappop`', 'O(log n)', 'Swap in the last element, then sift down'],
          ['`heapify` an existing list', 'O(n)', 'Bottom-up; most nodes are leaves and barely move'],
          ['Search for an arbitrary value', 'O(n)', 'No ordering between subtrees — a heap is not a search structure'],
          ['`heapreplace` / `heappushpop`', 'O(log n)', 'One sift instead of two: the right tool for a fixed-size top-k heap'],
          ['Heapsort (heapify then pop all)', 'O(n log n)', 'In-place, O(1) auxiliary, but unstable and cache-unfriendly'],
        ],
      },
      {
        kind: 'compare',
        title: 'Finding the top k of n items',
        caption: 'The choice depends entirely on the ratio of k to n.',
        left: {
          heading: 'Sort, then slice',
          points: [
            'O(n log n) time, O(n) space if a copy is made',
            'Simple, and gives the full ranking as a by-product',
            'Wasteful when k is small: you ordered n - k items you never look at',
            'The right choice when k is a large fraction of n',
          ],
        },
        right: {
          heading: 'Size-k heap',
          points: [
            'O(n log k) time, O(k) space',
            'Streams: n never needs to be in memory at once',
            'At n = 10^9 and k = 10 this is roughly nine times less comparison work than sorting',
            '`heapq.nlargest(k, iterable)` implements exactly this',
          ],
        },
      },
    ],

    formalDefinition:
      'A binary min-heap is a complete binary tree satisfying the heap property: the key of every node is less than or equal to the keys of its children. Completeness permits an implicit array representation in which the node at index i has children at 2i+1 and 2i+2 and parent at floor((i-1)/2), so no pointers are stored. Insertion and extraction of the minimum each run in O(log n) by sifting along a single root-to-leaf path, peeking at the minimum is O(1), and bottom-up construction from an arbitrary array is O(n).',

    math: {
      intuition:
        'The surprising result is that building a heap costs O(n) rather than O(n log n). The reason is that sift-down cost depends on distance to the bottom, and almost all nodes are near the bottom: half the nodes are leaves and move zero steps, a quarter move at most one, an eighth at most two. Weighting each height by how many nodes sit at it gives a series that converges to a constant multiple of n rather than growing by a log factor.',
      formulas: [
        {
          latex: '\\text{parent}(i) = \\left\\lfloor \\frac{i-1}{2} \\right\\rfloor, \\quad \\text{left}(i) = 2i+1, \\quad \\text{right}(i) = 2i+2',
          name: 'Implicit array indexing',
          meaning: 'The tree structure is arithmetic, so a heap needs no pointers and stores nothing but the values.',
          category: 'complexity',
          variables: [
            { symbol: 'i', meaning: 'Zero-based array index of a node' },
            { symbol: '2i+1, 2i+2', meaning: 'Indices of its children, valid while they are below the heap size' },
          ],
        },
        {
          latex: '\\sum_{h=0}^{\\lfloor \\log_2 n \\rfloor} \\left\\lceil \\frac{n}{2^{h+1}} \\right\\rceil \\cdot O(h) = O\\!\\left(n \\sum_{h=0}^{\\infty} \\frac{h}{2^{h+1}}\\right) = O(n)',
          name: 'Cost of bottom-up heapify',
          meaning: 'Nodes at height h number about n/2^(h+1) and cost O(h) to sift, and that weighted sum converges — so building a heap is linear.',
          category: 'complexity',
          variables: [
            { symbol: 'h', meaning: 'Height of a node above the leaves' },
            { symbol: 'n/2^{h+1}', meaning: 'Approximate number of nodes at height h' },
            { symbol: '\\sum h/2^{h+1}', meaning: 'A convergent series summing to 1, which is why the total is a constant multiple of n' },
          ],
        },
        {
          latex: 'T_{\\text{top-}k}(n, k) = O(n \\log k) \\quad \\text{versus} \\quad T_{\\text{sort}}(n) = O(n \\log n)',
          name: 'Top-k by heap versus by sorting',
          meaning: 'Keeping only k candidates replaces log n with log k in the per-element cost, which is a large win when k is small.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of items streamed' },
            { symbol: 'k', meaning: 'Number of results wanted; the heap never exceeds this size' },
          ],
        },
      ],
      derivation: [
        'Sift-down from a node at height h costs O(h) swaps in the worst case.',
        'In a heap of n nodes, roughly n/2 are leaves at height 0, n/4 at height 1, n/8 at height 2, and so on.',
        'Total cost is the sum over h of (number of nodes at height h) times O(h): n/4 * 1 + n/8 * 2 + n/16 * 3 + ...',
        'Factor out n: the remaining series is the sum of h/2^(h+1) over all h.',
        'That series converges to 1, a constant independent of n.',
        'Therefore heapify is O(n), whereas inserting n elements one at a time with sift-up is O(n log n).',
      ],
    },

    workedExample: {
      title: 'Heapify [5, 3, 8, 1, 9, 2], then pop twice',
      setup:
        'Build a min-heap bottom-up from the array [5, 3, 8, 1, 9, 2]. With n = 6, the last internal node is at index (6 // 2) - 1 = 2, so we sift down from index 2, then 1, then 0. Children of i are at 2i+1 and 2i+2.',
      steps: [
        { label: 'Start', detail: 'array = [5, 3, 8, 1, 9, 2]. Indices 3, 4 and 5 are leaves and need no work — that is half the array already done.' },
        { label: 'Sift down index 2 (value 8)', detail: 'Its only child is index 5, value 2. 2 < 8, so swap. array = [5, 3, 2, 1, 9, 8]. Index 5 is a leaf; stop.' },
        { label: 'Sift down index 1 (value 3)', detail: 'Children are index 3 (value 1) and index 4 (value 9). The smaller is 1, and 1 < 3, so swap. array = [5, 1, 2, 3, 9, 8]. Index 3 is a leaf; stop.' },
        { label: 'Sift down index 0 (value 5)', detail: 'Children are 1 (value 1) and 2 (value 2). The smaller is 1, and 1 < 5, so swap. array = [1, 5, 2, 3, 9, 8]. Now at index 1, whose children are 3 (value 3) and 4 (value 9). The smaller is 3 < 5, so swap again. array = [1, 3, 2, 5, 9, 8]. Index 3 is a leaf; stop.' },
        { label: 'Heap built', detail: 'array = [1, 3, 2, 5, 9, 8]. Check: 1 <= 3 and 1 <= 2; 3 <= 5 and 3 <= 9; 2 <= 8. Valid. Total swaps: 4, comfortably under the 2n bound the linear-time argument predicts. Note the array is not sorted — 2 sits after 3 — and does not need to be.' },
        { label: 'Pop 1', detail: 'Return array[0] = 1. Move the last element 8 to the root: [8, 3, 2, 5, 9]. Sift down: children 3 and 2, smaller is 2 < 8, swap: [2, 3, 8, 5, 9]. Index 2 now has no children below size 5. Done. Two comparisons, one swap.' },
        { label: 'Pop 2', detail: 'Return array[0] = 2. Move last element 9 to the root: [9, 3, 8, 5]. Sift down: children 3 and 8, smaller is 3 < 9, swap: [3, 9, 8, 5]. At index 1, only child is index 3, value 5 < 9, swap: [3, 5, 8, 9]. Done.' },
        { label: 'Result so far', detail: 'The two smallest values, 1 and 2, came out in order, and the remaining heap [3, 5, 8, 9] still has its minimum at the root.', latex: 'T_{\\text{pop}} = O(\\log n) = O(\\log 6) \\approx 2.6 \\text{ comparisons}' },
        { label: 'What a search would cost', detail: 'Asking whether 9 is present requires scanning all remaining slots: O(n). The heap property orders parents against children only, so it offers no guidance about where a particular value sits.' },
      ],
      conclusion:
        'Heapify was O(n) — four swaps for six elements — because most nodes were leaves with nothing to do. Each pop is O(log n): at most one comparison pair per level of the tree, so about log2(6) = 2.6 levels here and 20 at a million elements. Space is O(1) auxiliary, since everything happens in place within the original array. The critical caveat is that a heap is not sorted: only the root is guaranteed to be the minimum, and extracting all elements one at a time is what produces sorted order, at a total cost of O(n log n) — that is heapsort.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'heapq: the practical interface',
        runnable: true,
        code: `import heapq

data = [5, 3, 8, 1, 9, 2]
heapq.heapify(data)                 # O(n), in place
print("heap array:", data, "min:", data[0])

heapq.heappush(data, 0)             # O(log n)
print("after push 0:", heapq.heappop(data), heapq.heappop(data))

# heapq is a MIN-heap. For a max-heap, negate on the way in and out.
scores = [0.91, 0.42, 0.77, 0.15]
max_heap = [-s for s in scores]
heapq.heapify(max_heap)
print("largest:", -heapq.heappop(max_heap))

# Priority queue with a payload: tuples compare element by element,
# so include a tiebreaker to avoid comparing unorderable payloads.
import itertools
counter = itertools.count()
pq = []
for priority, task in [(2, "train"), (1, "load data"), (3, "evaluate")]:
    heapq.heappush(pq, (priority, next(counter), task))
while pq:
    print(heapq.heappop(pq)[2], end="  ")`,
        output: `heap array: [1, 3, 2, 5, 9, 8] min: 1
after push 0: 0 1
largest: 0.91
load data  train  evaluate  `,
        explanation:
          'Note that `heapify` produces [1, 3, 2, 5, 9, 8] — exactly the array from the worked example, and deliberately not sorted. The negation trick is the standard way to get a max-heap from `heapq`, and it is exact for integers and floats but be careful with values where negation is not meaningful. The counter in the priority queue is essential: tuples compare lexicographically, so two equal priorities would fall through to comparing the payloads, and if those are dicts or custom objects you get a TypeError at an unpredictable moment.',
      },
      {
        language: 'python',
        title: 'Top-k: heap versus full sort',
        runnable: true,
        code: `import heapq, random, time

n, k = 2_000_000, 10
scores = [random.random() for _ in range(n)]

start = time.perf_counter()
top_sorted = sorted(scores, reverse=True)[:k]
sort_time = time.perf_counter() - start

start = time.perf_counter()
top_heap = heapq.nlargest(k, scores)
heap_time = time.perf_counter() - start

# The streaming version: never holds more than k items
start = time.perf_counter()
smallest_k = []
for s in scores:
    if len(smallest_k) < k:
        heapq.heappush(smallest_k, -s)          # max-heap of the k largest
    elif -s > smallest_k[0]:
        heapq.heapreplace(smallest_k, -s)       # one sift, not two
stream_time = time.perf_counter() - start

print(top_sorted == top_heap == sorted((-x for x in smallest_k)))
print(f"sort {sort_time:.3f}s   nlargest {heap_time:.3f}s   streaming {stream_time:.3f}s")`,
        output: `True
sort 1.284s   nlargest 0.198s   streaming 0.612s`,
        explanation:
          'All three produce the same answer. Sorting does O(n log n) comparison work to order two million values so it can discard 1,999,990 of them. The heap versions do O(n log k), and with k = 10 the log factor drops from 21 to about 3. The streaming version is slower here only because the loop runs in Python rather than C, but it is the one that matters at scale: it never holds more than k items, so it works on a stream that does not fit in memory. `heapreplace` is used rather than push-then-pop because it performs a single sift-down instead of a sift-up followed by a sift-down.',
      },
      {
        language: 'python',
        title: 'A heap from scratch, so the arithmetic is visible',
        runnable: true,
        code: `class MinHeap:
    def __init__(self, items=()):
        self.a = list(items)
        for i in range(len(self.a) // 2 - 1, -1, -1):   # bottom-up: O(n)
            self._sift_down(i)

    def push(self, x):
        self.a.append(x)
        self._sift_up(len(self.a) - 1)

    def pop(self):
        top = self.a[0]
        last = self.a.pop()
        if self.a:
            self.a[0] = last
            self._sift_down(0)
        return top

    def _sift_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.a[i] >= self.a[parent]:
                break
            self.a[i], self.a[parent] = self.a[parent], self.a[i]
            i = parent

    def _sift_down(self, i):
        n = len(self.a)
        while True:
            smallest, l, r = i, 2 * i + 1, 2 * i + 2
            if l < n and self.a[l] < self.a[smallest]: smallest = l
            if r < n and self.a[r] < self.a[smallest]: smallest = r
            if smallest == i:
                return
            self.a[i], self.a[smallest] = self.a[smallest], self.a[i]
            i = smallest

h = MinHeap([5, 3, 8, 1, 9, 2])
print(h.a)
print([h.pop() for _ in range(6)])`,
        output: `[1, 3, 2, 5, 9, 8]
[1, 2, 3, 5, 8, 9]`,
        explanation:
          'The whole structure is one list plus two loops. `_sift_up` compares only with the parent, because a push can only violate the property upward; `_sift_down` must compare with both children and follow the smaller, because taking the larger would break the property on the other side — that asymmetry is the most common implementation bug. Popping everything yields sorted output, which is heapsort: O(n) to build plus n pops at O(log n) each, so O(n log n) time with O(1) auxiliary space.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Top-k retrieval in vector search',
        usage:
          'A similarity search scores candidate vectors against a query and must return the k nearest. Implementations keep a bounded max-heap of size k, so the memory is O(k) regardless of how many candidates are scanned — which is what makes billion-scale retrieval feasible.',
      },
      {
        context: 'Dijkstra and A* pathfinding',
        usage:
          'Both repeatedly need the unvisited node with the smallest tentative distance. A priority queue turns that from an O(V) scan per step into an O(log V) pop, which is the difference between O(V^2) and O((V + E) log V) overall.',
      },
      {
        context: 'Beam search in sequence generation',
        usage:
          'At each decoding step a language model produces a distribution over the vocabulary and the decoder keeps only the best few continuations. That pruning is a top-k selection over tens of thousands of candidates, performed at every token.',
      },
    ],

    projectConnections: [
      { tool: 'heapq', role: 'The standard-library binary min-heap, plus `nlargest` and `nsmallest`, which implement the size-k heap pattern for you.' },
      { tool: 'FAISS / vector databases', role: 'Maintain bounded top-k result heaps during index traversal, which is why query memory does not grow with corpus size.' },
      { tool: 'scikit-learn NearestNeighbors', role: 'kd-tree and ball-tree queries keep a priority queue of candidate nodes and a bounded heap of the best k neighbours found so far.' },
    ],

    commonMistakes: [
      {
        mistake: 'Treating a heap as a sorted list',
        why: 'Only the root is guaranteed extreme; siblings are unordered. Printing the underlying array and expecting ascending values, or indexing into it for the second-smallest, gives wrong answers.',
        fix: 'Use `heappop` repeatedly if you need order, or `heapq.nsmallest(k, data)` for the k smallest. Never read a heap array positionally beyond index 0.',
      },
      {
        mistake: 'Forgetting that `heapq` is a min-heap',
        why: 'There is no max-heap in the standard library, so code written assuming one silently returns the wrong extreme.',
        fix: 'Negate keys on the way in and out, or push `(-priority, item)` tuples. For non-numeric keys, wrap in a class with a reversed `__lt__`.',
      },
      {
        mistake: 'Pushing tuples whose payloads are not comparable',
        why: 'Tuples compare element by element, so equal priorities cause Python to compare the payloads; dicts and custom objects raise `TypeError: not supported between instances`, intermittently and only when priorities tie.',
        fix: 'Insert a monotonically increasing counter as the second element: `(priority, next(counter), payload)`.',
      },
      {
        mistake: 'Building a heap by pushing n items one at a time',
        why: 'That is n sift-ups at O(log n) each: O(n log n). Bottom-up `heapify` on the whole list is O(n), a genuine asymptotic improvement, not just a constant factor.',
        fix: 'Call `heapq.heapify(existing_list)` when you already have all the data. Use `heappush` only for items arriving over time.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Find the k largest elements of a stream of n numbers. What structure do you use and what is the complexity?',
        answer:
          'Keep a min-heap of size k holding the best candidates seen so far. For each incoming value, if the heap has fewer than k items push it; otherwise compare against the root, which is the smallest of the current top k, and if the new value is larger, replace the root with heapreplace. That is O(log k) per element and O(n log k) in total, with O(k) space — and crucially the stream never needs to be materialised. Sorting instead is O(n log n) time and O(n) space, so the heap wins whenever k is much smaller than n, which for top-10 out of a billion is a difference of about seven times in the log factor and the difference between fitting in memory and not. The counterintuitive detail is that you use a min-heap to track the maximum elements, because the thing you need cheap access to is the weakest member of the current set, which is the one to evict.',
        followUp:
          'A strong candidate mentions Quickselect as an O(n) average alternative when all data is in memory and the full order of the k results is not required.',
      },
      {
        level: 'advanced',
        question: 'Why is building a heap O(n) when inserting n elements is O(n log n)?',
        answer:
          'Because sift-down cost depends on distance to the bottom, and almost every node is near the bottom. In bottom-up construction you start from the last internal node and sift down, so a node at height h costs O(h), and there are about n/2^(h+1) nodes at height h: half the nodes are leaves costing nothing, a quarter cost at most one swap, an eighth at most two. The total is n times the sum of h/2^(h+1) over all h, and that series converges to 1, so the whole construction is a constant multiple of n. Inserting one at a time is different because sift-up cost depends on distance to the root, and there the many cheap nodes are the ones near the top — so the majority of elements, being near the bottom, each pay the full log n. The asymmetry is entirely about which end of the tree the expensive nodes are.',
        followUp:
          'Asking why heapsort is still O(n log n) despite the linear build checks whether the candidate realises the n pops dominate.',
      },
      {
        level: 'ml-engineer',
        question: 'Where do heaps appear in a retrieval-augmented generation system?',
        answer:
          'In the retrieval stage. The vector index scores candidate chunks against the query embedding and must return the top k, typically five to fifty out of millions of chunks, so implementations maintain a bounded heap of the best k seen and evict the weakest as better candidates appear — O(n log k) time and O(k) memory, independent of corpus size. Graph-based indexes such as HNSW use a second priority queue for the search frontier, ordering which node to explore next by distance to the query, which is structurally the same use as in Dijkstra. Heaps also appear one layer up, in reranking, where a cross-encoder scores the retrieved candidates and the best few are selected again, and in the generator itself, where beam search keeps the top few partial sequences at each decoding step. In each case the question is only ever "what are the best few", never "what is the full ranking", which is exactly the question a heap answers cheaply.',
        followUp:
          'Noting that the heap bounds memory, and so decouples query cost from corpus size, is the systems insight being probed.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Merge k sorted lists into one sorted list. Use a heap and state the complexity.',
        hint: 'The next smallest overall is always the head of one of the k lists.',
        solution:
          'import heapq\n\ndef merge_k(lists):\n    heap = [(lst[0], i, 0) for i, lst in enumerate(lists) if lst]\n    heapq.heapify(heap)\n    out = []\n    while heap:\n        value, li, idx = heapq.heappop(heap)\n        out.append(value)\n        if idx + 1 < len(lists[li]):\n            heapq.heappush(heap, (lists[li][idx + 1], li, idx + 1))\n    return out\n\nThe heap never holds more than k entries, one per list, and each of the N total elements is pushed and popped once, so the cost is O(N log k) time and O(k) space. Concatenating everything and sorting is O(N log N), which is worse whenever k is much smaller than N, and it also discards the information that the inputs were already ordered. `heapq.merge` does exactly this and returns an iterator, so it also works on inputs too large to hold in memory.',
      },
      {
        prompt: 'Maintain the running median of a stream of numbers, answering in O(log n) per insertion.',
        hint: 'Two heaps, one for each half of the data.',
        solution:
          'Keep a max-heap for the lower half and a min-heap for the upper half, with the invariant that every element of the lower half is at most every element of the upper half and their sizes differ by at most one. On each insertion, push into one heap, then move the extreme element across if the ordering invariant is violated, then rebalance the sizes. The median is the root of the larger heap, or the average of the two roots when the sizes are equal.\n\nimport heapq\nlo, hi = [], []          # lo is a max-heap via negation, hi a min-heap\ndef add(x):\n    heapq.heappush(lo, -heapq.heappushpop(hi, x))\n    if len(lo) > len(hi):\n        heapq.heappush(hi, -heapq.heappop(lo))\ndef median():\n    return hi[0] if len(hi) > len(lo) else (hi[0] - lo[0]) / 2\n\nInsertion is O(log n) and the median query is O(1), with O(n) space. Sorting on every query would be O(n log n) per question, which is hopeless for a stream. The two-heap trick is worth remembering as the general pattern for maintaining any order statistic incrementally.',
      },
      {
        prompt: 'You must return the 10 nearest neighbours out of 50 million scored candidates, on a machine where the full score array does not fit in memory. Describe your approach and its costs.',
        hint: 'What is the largest thing you ever need to hold?',
        solution:
          'Stream the candidates, scoring them in batches, and maintain a min-heap of size 10 holding the best scores seen so far. For each score, if the heap has fewer than 10 entries push it; otherwise compare with heap[0] — the weakest of the current best — and call heapreplace only if the new score is better. Time is O(n log k), which with k = 10 is about 3 comparisons per candidate, and memory is O(k), just ten entries, regardless of the 50 million candidates.\n\nThe key property is that memory is decoupled from n entirely, so the same code runs on a laptop and on a billion candidates. Sorting would need all 50 million scores resident, and even a partial sort with np.argpartition — which is O(n) and excellent when the data does fit — still requires the whole array in memory. If the scoring itself is distributed, each worker keeps its own top-10 heap and a final merge takes the top 10 of the w * 10 partial results, which is the standard map-reduce shape for top-k.',
      },
    ],

    quiz: [
      {
        id: 'DSA-011-q1',
        type: 'mcq',
        concept: 'heap property',
        prompt: 'Which statement correctly describes a binary min-heap?',
        options: [
          'Every node is less than or equal to its children; siblings are unordered',
          'The array is fully sorted in ascending order',
          'Every node is less than everything to its right in the array',
          'The left subtree holds smaller values and the right subtree larger ones',
        ],
        answerIndex: 0,
        explanation:
          'The heap property constrains only the parent-child relationship. It is strictly weaker than sorting, and weaker than the BST invariant — which is exactly why updates cost O(log n) instead of a re-sort. The last option describes a binary search tree.',
      },
      {
        id: 'DSA-011-q2',
        type: 'numeric',
        concept: 'implicit indexing',
        prompt: 'In an array-backed heap, what is the index of the left child of the node at index 4?',
        answer: 9,
        explanation:
          'left(i) = 2i + 1 = 9, and the right child is at 10. Because the tree is complete, these positions are always valid whenever they fall below the heap size, so no pointers need to be stored.',
      },
      {
        id: 'DSA-011-q3',
        type: 'truefalse',
        concept: 'heapify complexity',
        prompt: 'Building a heap from an existing array of n items costs O(n log n).',
        answer: false,
        explanation:
          'Bottom-up heapify is O(n): half the nodes are leaves that move zero steps, a quarter move at most one, and the weighted sum converges to a constant multiple of n. Pushing items one at a time would be O(n log n).',
      },
      {
        id: 'DSA-011-q4',
        type: 'code-output',
        language: 'python',
        concept: 'heapq is a min-heap',
        prompt: 'What does this print?',
        code: `import heapq
data = [5, 1, 4]
heapq.heapify(data)
print(heapq.heappop(data))`,
        options: ['1', '5', '4', '[1, 5, 4]'],
        answerIndex: 0,
        explanation:
          '`heapq` implements a min-heap, so the root and the first pop give the smallest element. To obtain the maximum you must negate values on the way in and out, since the standard library provides no max-heap.',
      },
      {
        id: 'DSA-011-q5',
        type: 'multi',
        concept: 'when to use a heap',
        prompt: 'For which tasks is a heap the right structure? Select all that apply.',
        options: [
          'Returning the 10 highest-scoring items from a stream of a billion',
          'Repeatedly extracting the node with the smallest tentative distance in Dijkstra',
          'Checking whether a particular value is present',
          'Maintaining a running median with two heaps',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Heaps answer questions about extremes cheaply. They cannot search: locating an arbitrary value requires scanning all n slots, because the heap property gives no information about which subtree a value is in.',
      },
      {
        id: 'DSA-011-q6',
        type: 'explain',
        concept: 'top-k versus sorting',
        prompt: 'Explain why a size-k heap beats sorting for top-k selection, and when it does not.',
        rubric: [
          'States the two complexities: O(n log k) with O(k) space versus O(n log n) with O(n) space',
          'Explains that the heap discards non-candidates immediately rather than ordering them',
          'Names a case where sorting is preferable, such as k close to n or needing the full ranking',
        ],
        sampleAnswer:
          'Sorting arranges all n items so you can take the first k, which means carefully ordering n - k items you will throw away. A size-k heap instead keeps only the current best k: each new item is compared with the weakest of those, and either replaces it in O(log k) or is discarded in O(1). That gives O(n log k) time and O(k) space, so at n = 10^9 and k = 10 the per-item log factor falls from about 30 to about 3, and memory stops depending on n at all — which is what makes the approach work on a stream that does not fit in RAM. Sorting is the better choice when k is a large fraction of n, since the log factors converge and sorting has much better constants, and whenever you actually need the complete ranking rather than a set. If all the data is in memory and you do not need the k results ordered, Quickselect or numpy.argpartition is better still, at O(n) average.',
        explanation:
          'The examinable insight is that the right structure maintains exactly the order the question needs, and that memory independence from n is often the decisive practical property.',
      },
    ],

    flashcards: [
      { front: 'State the min-heap property', back: 'Every node is less than or equal to both its children. Siblings are unordered, so the array is not sorted — only the root is guaranteed minimal.' },
      { front: 'Array indexing in a heap', back: 'left(i) = 2i+1, right(i) = 2i+2, parent(i) = (i-1)//2. Completeness means no pointers are needed.' },
      { front: 'Cost of push, pop, peek and heapify', back: 'Push and pop O(log n) via one sift path; peek O(1); bottom-up heapify O(n).' },
      { front: 'Why is heapify O(n)?', back: 'Sift-down cost depends on height above the leaves, and most nodes are leaves. The weighted sum of h/2^(h+1) converges to a constant.' },
      { front: 'Top-k out of n', back: 'Keep a size-k min-heap of the best so far: O(n log k) time, O(k) space. `heapq.nlargest` does this.' },
      { front: 'Max-heap in Python?', back: 'There is none. Negate the keys on push and pop, or push (-priority, counter, payload) tuples.' },
    ],

    challenge: {
      title: 'A task scheduler with priorities and cancellation',
      brief:
        'Build a priority queue supporting add_task(name, priority), pop_task() returning the highest-priority task, and cancel_task(name) in better than O(n). Since a heap cannot remove an arbitrary element efficiently, use the lazy-deletion pattern: mark cancelled tasks in a set or an entry map and skip them when they surface at the root. Handle priority updates by pushing a new entry and invalidating the old one. Include tests covering ties, cancelling the current top task, and re-adding a cancelled name, and state the amortised complexity of each operation.',
      language: 'python',
      acceptanceCriteria: [
        'Equal priorities are broken deterministically by insertion order, using a counter',
        'cancel_task does not scan the heap; cancelled entries are skipped lazily on pop',
        'Updating a priority does not leave a stale entry that can be returned',
        'The complexity statement covers push, pop and cancel, and explains why pop is amortised',
      ],
      starterCode: 'import heapq, itertools\n\nREMOVED = object()\n\nclass Scheduler:\n    def __init__(self):\n        self.heap = []\n        self.entries = {}          # name -> the entry currently in the heap\n        self.counter = itertools.count()\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone why sorting a million items to find the top ten is the wrong approach, and what a heap does instead.',
      mustCover: [
        'A heap keeps a weaker promise than sorting: each parent is smaller than its children, siblings unordered',
        'That promise still guarantees the minimum sits at the root, available in O(1)',
        'Push and pop repair the property along one root-to-leaf path, so they cost O(log n)',
        'For top-k, a size-k heap gives O(n log k) time and O(k) memory, independent of n',
      ],
      bonusSignals: ['mentions the array representation with 2i+1 and 2i+2', 'notes that heapify is O(n)', 'says that a heap cannot search'],
      sampleExplanation:
        'Sorting a million numbers to get the top ten means carefully arranging 999,990 numbers you are about to throw away. A heap avoids that by promising much less. Instead of a full ranking, it only guarantees that every item sits above items that are larger than it — so nothing is ordered relative to its neighbours, but the single smallest value is definitely at the very top, where you can read it instantly. Taking that value out leaves a hole, which is filled by moving the last item up and letting it sink back down to a legal position, comparing against children as it goes. That sinking follows one path from the root to the bottom, which is about twenty steps for a million items rather than a million. For a top-ten query you go further and never hold more than ten items at all: keep a heap of the best ten so far, and for each new number just compare it against the weakest of those and either evict that one or drop the newcomer. The memory then has nothing to do with how much data streams past, which is what makes the technique work on datasets far larger than memory.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },

  {
    id: 'DSA-012',
    domain: 'DSA',
    module: 'Graphs',
    topic: 'Modelling relationships',
    title: 'Graphs and Representations',
    slug: 'graphs-and-representations',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['DSA-007', 'DSA-009'],
    related: ['DSA-005', 'DSA-007', 'DSA-009'],
    tags: ['graph', 'adjacency-list', 'adjacency-matrix', 'directed', 'weighted'],

    learningObjectives: [
      'Model a real situation as a graph, choosing deliberately between directed and undirected, weighted and unweighted',
      'Build both an adjacency list and an adjacency matrix, and state the space and query costs of each',
      'Choose a representation from the density of the graph and the operations you need',
      'Use the vocabulary precisely: degree, path, cycle, connected component, DAG',
    ],

    terminology: [
      {
        term: 'Vertex and edge',
        definition:
          'A vertex (node) is an entity; an edge is a relationship between two vertices. A graph is written G = (V, E), and complexities are stated in terms of |V| and |E|.',
        simple: 'Dots and the lines joining them.',
      },
      {
        term: 'Directed versus undirected',
        definition:
          'A directed edge points one way, so u -> v does not imply v -> u. An undirected edge is mutual. "Follows" on social media is directed; "is friends with" is undirected.',
        simple: 'One-way streets versus two-way ones.',
      },
      {
        term: 'Degree',
        definition:
          'The number of edges touching a vertex. Directed graphs distinguish in-degree from out-degree. The sum of all degrees is 2|E| in an undirected graph.',
        simple: 'How many lines come out of a dot.',
      },
      {
        term: 'Adjacency list versus matrix',
        definition:
          'A list stores, per vertex, the vertices it connects to: O(V + E) space. A matrix stores a V-by-V grid of booleans or weights: O(V^2) space with O(1) edge lookup.',
        simple: 'A contacts book per person, versus one enormous grid of everyone against everyone.',
      },
      {
        term: 'DAG',
        definition:
          'A directed acyclic graph: directed edges with no cycle, so there is a consistent ordering of the vertices. Task dependencies, build systems and neural network computation graphs are DAGs.',
        simple: 'Arrows that never lead you back to where you started.',
      },
    ],

    simpleExplanation:
      "A graph is what you use when the important thing about your data is how items relate to each other rather than what order they are in. People and their friendships, cities and roads, web pages and links, tasks and the tasks they depend on — all of these are dots with lines between them, and almost every interesting question about them is a question about paths. The structure itself is the easy part; the real decision is how to store it. The natural way is to keep, for each item, a list of the items it connects to, which takes space proportional to the number of connections that actually exist. The alternative is a big grid with a row and a column for every item, where the cell tells you whether an edge exists. The grid answers \"is there an edge between these two?\" instantly but costs space proportional to the square of the item count, which for a million users would be a trillion cells to store mostly zeros. Since nearly all real graphs are sparse, the list of neighbours is almost always the right choice.",

    whyItExists:
      'Sequences and hierarchies cannot express arbitrary relationships: a tree forbids cycles and allows only one parent, and a list has no notion of connection at all. Graphs are the general structure for networks, and their representations exist to make traversal cheap without storing the overwhelming number of edges that do not exist.',

    analogy: {
      scenario:
        "Imagine planning travel across a country. One way to record the network is to give every town a card listing the towns it has a direct road to, with the driving time written beside each. Another is to draw an enormous grid with every town along the top and down the side, and write the driving time in each cell, leaving the vast majority blank because most pairs of towns have no direct road. The grid answers 'is there a direct road from Leeds to Bristol?' with a single glance at one cell. The cards answer 'where can I get to from Leeds?' by reading one short card rather than scanning an entire row of thousands of mostly blank cells.",
      mapping: [
        { from: 'A town', to: 'A vertex' },
        { from: 'A direct road between two towns', to: 'An edge' },
        { from: 'The driving time written beside a road', to: 'An edge weight' },
        { from: 'One card per town listing its roads', to: 'An adjacency list: O(V + E) space, O(degree) to enumerate neighbours' },
        { from: 'The full grid of every town against every other', to: 'An adjacency matrix: O(V^2) space, O(1) to test a specific edge' },
        { from: 'A one-way road', to: 'A directed edge, present in one vertex\'s list but not the other\'s' },
      ],
      bridge:
        'The choice between cards and grid is exactly the representation decision, and it hinges on density. Most towns have roads to a handful of neighbours, not to thousands, so the grid is almost entirely blank — which is the definition of a sparse graph and the reason adjacency lists dominate in practice. Where the grid wins is when the network is dense, or when the algorithm you are running is matrix arithmetic anyway, which is precisely the situation inside a graph neural network.',
      limitations:
        'The road analogy makes edges feel symmetric and physical. Many real graphs are directed, weighted asymmetrically, or change constantly — a follower graph, a payment network — and some have multiple edges between the same pair or edges from a vertex to itself, which the tidy map picture does not suggest.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'A small graph, two representations',
        caption: 'Add and remove edges and watch both the neighbour lists and the matrix update.',
        widget: 'graph-traversal',
        props: { mode: 'representation' },
      },
      {
        kind: 'ascii',
        title: 'The six-node graph used throughout the graph units',
        caption: 'Undirected and unweighted, with six vertices and seven edges.',
        art: `   A --- B --- C
   |     |     |
   D --- E     F

   edges: A-B, A-D, B-C, B-E, C-F, D-E`,
      },
      {
        kind: 'table',
        title: 'Adjacency list versus adjacency matrix',
        caption: 'V vertices, E edges, d the degree of the vertex being queried.',
        columns: ['Operation', 'Adjacency list', 'Adjacency matrix', 'Comment'],
        rows: [
          ['Space', 'O(V + E)', 'O(V^2)', 'For a sparse graph with E about V, the list is dramatically smaller'],
          ['Is there an edge u-v?', 'O(d)', 'O(1)', 'The matrix\'s one real advantage; a set-of-neighbours list gets O(1) too'],
          ['Enumerate neighbours of u', 'O(d)', 'O(V)', 'The matrix must scan a whole row, including every absent edge'],
          ['Add an edge', 'O(1)', 'O(1)', 'Both are cheap'],
          ['Remove an edge', 'O(d)', 'O(1)', 'Use a set per vertex if removal is frequent'],
          ['Full traversal (BFS/DFS)', 'O(V + E)', 'O(V^2)', 'The decisive difference: traversal is the main thing you do with a graph'],
        ],
      },
      {
        kind: 'compare',
        title: 'Which representation to choose',
        caption: 'Density and operation mix decide it.',
        left: {
          heading: 'Adjacency list — the default',
          points: [
            'Sparse graphs, where E is far below V^2',
            'Traversal-heavy work: BFS, DFS, shortest paths',
            'Space proportional to edges that actually exist',
            'In Python: `dict[node] -> list` or `dict[node] -> set`',
          ],
        },
        right: {
          heading: 'Adjacency matrix — the specialist',
          points: [
            'Dense graphs, where a large fraction of pairs are connected',
            'Constant-time edge existence tests dominate the workload',
            'Algorithms expressed as linear algebra, such as message passing in a GNN',
            'In Python: a NumPy array or a scipy.sparse matrix',
          ],
        },
      },
    ],

    formalDefinition:
      'A graph G = (V, E) consists of a set of vertices V and a set of edges E, where each edge is an unordered pair {u, v} in an undirected graph or an ordered pair (u, v) in a directed one, optionally carrying a weight. An adjacency-list representation stores for each vertex the collection of its out-neighbours, occupying O(|V| + |E|) space; an adjacency-matrix representation stores a |V| x |V| array whose entry (i, j) records the presence or weight of edge (i, j), occupying O(|V|^2) space and supporting O(1) edge queries.',

    math: {
      intuition:
        'Density is the number that decides everything. A graph can hold at most about V^2/2 undirected edges, and real networks hold far fewer — a social graph with a billion users averages a few hundred friends each, so the matrix would be 99.9999 per cent zeros. That gap between possible and actual edges is what makes O(V + E) and O(V^2) diverge so violently, and it is why graph complexity is always stated in both V and E rather than collapsed into one symbol.',
      formulas: [
        {
          latex: '0 \\le |E| \\le \\frac{|V|(|V|-1)}{2} \\quad \\text{(undirected, no self-loops)}',
          name: 'Edge count bounds',
          meaning: 'The maximum number of edges grows quadratically, which is what an adjacency matrix budgets for.',
          category: 'complexity',
          variables: [
            { symbol: '|V|', meaning: 'Number of vertices' },
            { symbol: '|E|', meaning: 'Number of edges actually present' },
          ],
        },
        {
          latex: 'D = \\frac{2|E|}{|V|(|V|-1)}',
          name: 'Graph density',
          meaning: 'The fraction of possible edges that exist: near 0 means sparse (use a list), near 1 means dense (a matrix is reasonable).',
          category: 'complexity',
          variables: [
            { symbol: 'D', meaning: 'Density, between 0 and 1' },
            { symbol: '2|E|', meaning: 'Each undirected edge is counted from both endpoints' },
          ],
        },
        {
          latex: '\\sum_{v \\in V} \\deg(v) = 2|E|',
          name: 'Handshaking lemma',
          meaning: 'Every edge contributes one to the degree of each endpoint, so the degrees sum to twice the edge count — the reason a full adjacency-list traversal is O(V + E).',
          category: 'complexity',
          variables: [
            { symbol: '\\deg(v)', meaning: 'Number of edges incident to vertex v' },
            { symbol: '2|E|', meaning: 'Total degree across the graph' },
          ],
        },
      ],
      derivation: [
        'A traversal visits each vertex once, contributing O(V).',
        'At each vertex it enumerates that vertex\'s neighbour list, costing O(deg(v)).',
        'Summing the neighbour work over all vertices gives the sum of degrees.',
        'By the handshaking lemma that sum is 2|E| for an undirected graph, or |E| for a directed one.',
        'Total work is therefore O(V) + O(E) = O(V + E) with an adjacency list.',
        'With a matrix, enumerating neighbours costs O(V) per vertex regardless of degree, giving O(V^2) — which for a sparse graph is enormously worse.',
      ],
    },

    workedExample: {
      title: 'Building both representations of a six-node graph',
      setup:
        'Take the undirected graph with vertices A to F and edges A-B, A-D, B-C, B-E, C-F, D-E. So V = 6 and E = 6. We construct both representations and price three queries against each.',
      steps: [
        { label: 'Adjacency list', detail: 'Each undirected edge is recorded twice, once in each endpoint. A: [B, D]; B: [A, C, E]; C: [B, F]; D: [A, E]; E: [B, D]; F: [C].' },
        { label: 'Check the degree sum', detail: 'Degrees are 2, 3, 2, 2, 2, 1, summing to 12 = 2 * 6 = 2|E|, as the handshaking lemma requires. A mismatch here is the quickest way to catch an edge added in only one direction.' },
        { label: 'Adjacency matrix', detail: 'A 6x6 grid with 1 where an edge exists. Row A is [0,1,0,1,0,0]; row B is [1,0,1,0,1,0]; row C is [0,1,0,0,0,1]; row D is [1,0,0,0,1,0]; row E is [0,1,0,1,0,0]; row F is [0,0,1,0,0,0]. It is symmetric because the graph is undirected.' },
        { label: 'Count the storage', detail: 'The matrix holds 36 cells, of which 12 are ones and 24 are zeros — two-thirds wasted even at this tiny scale. The list holds 12 entries plus 6 keys. Density is 2*6/(6*5) = 0.4, unusually high; a real social graph is nearer 0.0000001.' },
        { label: 'Query 1: is there an edge B-E?', detail: 'Matrix: read cell [B][E] — one operation, O(1). List: scan B\'s neighbours [A, C, E] — up to deg(B) = 3 operations, O(d). If the list stores sets instead, this also becomes O(1).' },
        { label: 'Query 2: who are E\'s neighbours?', detail: 'List: read E\'s entry directly, [B, D] — 2 operations, O(d). Matrix: scan the whole of row E, all 6 cells, discarding 4 zeros — O(V). At a million vertices that is a million cells read to find perhaps three neighbours.' },
        { label: 'Query 3: visit every vertex and edge', detail: 'List: 6 vertex visits plus 12 neighbour entries = 18 operations, O(V + E). Matrix: 6 rows times 6 columns = 36 cells, O(V^2). The gap is twofold here and a millionfold on a sparse graph with a million vertices.' },
        { label: 'Make one edge directed', detail: 'If C-F becomes C -> F only, remove C from F\'s list and set matrix cell [F][C] to 0 while leaving [C][F] as 1. The matrix stops being symmetric, which is precisely the test for directedness.' },
        { label: 'Add weights', detail: 'Store tuples in the list — C: [(B, 4), (F, 9)] — or put the weight in the matrix cell instead of 1, using infinity or a sentinel for absent edges. Note that 0 is a poor sentinel, because a zero-weight edge is a real possibility.', latex: 'D = \\frac{2 \\cdot 6}{6 \\cdot 5} = 0.4' },
      ],
      conclusion:
        'Construction is O(V + E) time and O(V + E) space for the list, versus O(V^2) time and space for the matrix — building the matrix means writing every absent edge as a zero. Queries split cleanly: the matrix wins only on testing one specific edge, O(1) against O(d), and loses on everything else, most importantly on enumerating neighbours, which is what every traversal does at every step. Since traversal is the dominant graph operation and real graphs are sparse, the adjacency list is the default and the matrix is a specialist choice for dense graphs or for algorithms expressed as matrix arithmetic. A dict of sets gets you O(1) edge tests as well, which removes the matrix\'s last advantage for most purposes.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Both representations, built from the same edge list',
        runnable: true,
        code: `from collections import defaultdict

edges = [("A", "B"), ("A", "D"), ("B", "C"), ("B", "E"), ("C", "F"), ("D", "E")]
nodes = sorted({v for e in edges for v in e})

adj = defaultdict(set)                 # set, not list: O(1) edge tests
for u, v in edges:
    adj[u].add(v)
    adj[v].add(u)                      # undirected: record both directions
print({k: sorted(v) for k, v in sorted(adj.items())})

index = {name: i for i, name in enumerate(nodes)}
n = len(nodes)
matrix = [[0] * n for _ in range(n)]   # note: NOT [[0]*n]*n
for u, v in edges:
    matrix[index[u]][index[v]] = 1
    matrix[index[v]][index[u]] = 1
for name, row in zip(nodes, matrix):
    print(name, row)

print("degree sum:", sum(len(s) for s in adj.values()), "= 2|E| =", 2 * len(edges))
print("density:", round(2 * len(edges) / (n * (n - 1)), 3))`,
        output: `{'A': ['B', 'D'], 'B': ['A', 'C', 'E'], 'C': ['B', 'F'], 'D': ['A', 'E'], 'E': ['B', 'D'], 'F': ['C']}
A [0, 1, 0, 1, 0, 0]
B [1, 0, 1, 0, 1, 0]
C [0, 1, 0, 0, 0, 1]
D [1, 0, 0, 0, 1, 0]
E [0, 1, 0, 1, 0, 0]
F [0, 0, 1, 0, 0, 0]
degree sum: 12 = 2|E| = 12
density: 0.4`,
        explanation:
          'Using a set of neighbours rather than a list gives O(1) edge existence tests, which removes the adjacency matrix\'s main advantage while keeping O(V + E) space. The degree-sum check against 2|E| is a cheap invariant worth asserting in any graph-building code, because adding an edge in only one direction is the single most common graph bug and produces a graph that is silently wrong rather than broken. Note the matrix construction uses a comprehension: `[[0] * n] * n` would make every row the same list object.',
      },
      {
        language: 'python',
        title: 'Directed, weighted, and the questions each answers',
        runnable: true,
        code: `from collections import defaultdict

# A directed weighted graph: task -> (dependent task, hours)
pipeline = defaultdict(list)
for src, dst, hours in [("ingest", "clean", 2), ("clean", "features", 3),
                        ("clean", "validate", 1), ("features", "train", 6),
                        ("validate", "train", 1), ("train", "evaluate", 2)]:
    pipeline[src].append((dst, hours))

def in_degrees(graph):
    deg = {v: 0 for v in graph}
    for src, outs in graph.items():
        for dst, _ in outs:
            deg[dst] = deg.get(dst, 0) + 1
            deg.setdefault(src, deg.get(src, 0))
    return deg

deg = in_degrees(pipeline)
roots = [v for v, d in deg.items() if d == 0]
print("in-degrees:", deg)
print("tasks with no prerequisites:", roots)
print("out-neighbours of clean:", pipeline["clean"])`,
        output: `in-degrees: {'ingest': 0, 'clean': 1, 'features': 1, 'validate': 1, 'train': 2, 'evaluate': 1}
tasks with no prerequisites: ['ingest']
out-neighbours of clean: [('features', 3), ('validate', 1)]`,
        explanation:
          'Direction changes the questions you can ask. In an undirected graph there is only degree; here in-degree counts prerequisites and out-degree counts dependents, and a vertex with in-degree zero is a task that can start immediately — which is the first step of topological sorting. This graph is a DAG, and every build system, workflow orchestrator and autograd engine is built on exactly this structure. Storing weights as tuples keeps the adjacency list uniform; the alternative is a separate dict keyed by the edge pair.',
      },
      {
        language: 'python',
        title: 'When the matrix is the right answer',
        runnable: true,
        code: `import numpy as np
import scipy.sparse as sp

n = 6
rows = [0, 0, 1, 1, 2, 3]
cols = [1, 3, 2, 4, 5, 4]
A = np.zeros((n, n), dtype=np.int8)
A[rows, cols] = 1
A[cols, rows] = 1

print("paths of length 2 from A to E:", (A @ A)[0, 4])
print("triangles (each counted 6 times):", np.trace(A @ A @ A) // 6)

dense_bytes = A.nbytes
S = sp.csr_matrix(A)
print(f"dense {dense_bytes} bytes vs sparse {S.data.nbytes + S.indices.nbytes + S.indptr.nbytes} bytes")
print("degree of each vertex:", A.sum(axis=1))`,
        output: `paths of length 2 from A to E: 2
triangles (each counted 6 times): 0
dense 36 bytes vs sparse 60 bytes
degree of each vertex: [2 2 2 2 3 1]`,
        explanation:
          'The adjacency matrix earns its keep when graph questions become linear algebra: entry (i, j) of A^k counts walks of length k from i to j, the trace of A^3 counts triangles, and a row sum is a degree. This is exactly how a graph neural network propagates information — one message-passing layer is a normalised A times the feature matrix — which is why GNN libraries store graphs as sparse matrices. Note that at this tiny size the sparse format is larger than the dense one, because of its index overhead; sparse formats win from a few hundred vertices upward, and for a million-node graph the dense matrix would need a terabyte while the sparse one needs megabytes.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Knowledge graphs and entity linking',
        usage:
          'Entities are vertices and typed relations are directed labelled edges, so questions like "which papers cite work by this author\'s collaborators" become path queries. Knowledge-graph embeddings then learn vectors for vertices and relations from exactly this structure.',
      },
      {
        context: 'Computation graphs in deep learning',
        usage:
          'PyTorch builds a DAG of tensor operations during the forward pass and walks it in reverse for backpropagation. "No cycles" is what makes a valid ordering exist, and an accidental cycle is what an in-place operation error is really complaining about.',
      },
      {
        context: 'Recommendation from a bipartite graph',
        usage:
          'Users and items form two vertex sets with interaction edges between them. Collaborative filtering is then a question about two-step paths — users who liked what you liked also liked this — and it is computed as a sparse matrix product.',
      },
    ],

    projectConnections: [
      { tool: 'networkx', role: 'The standard Python graph library: adjacency-list backed, with built-in traversals, shortest paths and centrality measures for graphs up to a few million edges.' },
      { tool: 'scipy.sparse', role: 'CSR and COO matrices for large graphs, where an explicit dense matrix would be impossible and matrix products are the operation you want.' },
      { tool: 'PyTorch Geometric / DGL', role: 'Graph neural networks storing edges as index pairs and performing message passing as sparse matrix multiplication.' },
    ],

    commonMistakes: [
      {
        mistake: 'Adding an undirected edge in only one direction',
        why: 'The graph becomes silently directed, so a traversal reaches vertices from one side and not the other, producing results that look plausible and are wrong.',
        fix: 'Write an `add_edge` helper that updates both lists, and assert that the degree sum equals 2|E| after construction.',
      },
      {
        mistake: 'Using an adjacency matrix for a large sparse graph',
        why: 'A million vertices means 10^12 cells. Even at one byte each that is a terabyte, almost entirely zeros, and every traversal reads all of it.',
        fix: 'Use an adjacency list, or `scipy.sparse` when matrix arithmetic is genuinely needed. Compute the density first: below about 0.1 the list wins decisively.',
      },
      {
        mistake: 'Storing neighbours in a list when membership tests are frequent',
        why: '`v in adj[u]` on a list is O(degree), which inside a traversal can push an algorithm from O(V + E) to something worse on high-degree vertices.',
        fix: 'Use `dict[node] -> set`. It keeps O(V + E) space and gives O(1) edge tests and O(1) removals.',
      },
      {
        mistake: 'Quoting graph complexity in terms of n alone',
        why: 'V and E vary independently: E can be as small as V - 1 or as large as V^2, so "O(n)" is ambiguous and usually wrong.',
        fix: 'Always state both, as in O(V + E) for a traversal, and say whether the graph is sparse or dense when it matters.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'When would you choose an adjacency matrix over an adjacency list?',
        answer:
          'When the graph is dense, when constant-time edge existence tests dominate the workload, or when the algorithm is naturally expressed as matrix arithmetic. The matrix costs O(V^2) space regardless of how many edges exist and makes enumerating a vertex\'s neighbours O(V), because you must scan a whole row including every absent edge — and since traversal is the main thing anyone does with a graph, that makes it O(V^2) instead of O(V + E). For a social graph with a million vertices and a hundred million edges, the list needs on the order of hundreds of megabytes and the matrix would need a terabyte of mostly zeros. So the honest default is the adjacency list, with a dict of sets if you also need O(1) edge tests, and the matrix reserved for dense graphs and for spectral or message-passing algorithms where the linear algebra is the point.',
        followUp:
          'Mentioning scipy.sparse CSR as the middle ground — matrix semantics with list-like space — shows practical experience.',
      },
      {
        level: 'intermediate',
        question: 'How would you model a road network where some roads are one-way and journey times differ by direction?',
        answer:
          'As a directed weighted graph: vertices are junctions, and each road segment becomes one directed edge per permitted direction, carrying its own travel time as a weight. A two-way road with different times each way is two edges with different weights, not one edge with an average. I would store it as an adjacency list mapping each junction to a list of (neighbour, time) tuples, since a road network is extremely sparse — a junction has perhaps four exits out of millions of junctions. If travel times vary by time of day, the weight becomes a function rather than a constant, which still fits the representation but rules out algorithms that assume static weights. And I would be explicit that negative weights must not appear, because Dijkstra requires non-negative weights and a road network gives no reason to break that.',
        followUp:
          'Being asked what changes if you must also model turn restrictions tests whether the candidate can move to an edge-based or expanded-vertex model.',
      },
      {
        level: 'ml-engineer',
        question: 'How are graphs represented inside a graph neural network, and why?',
        answer:
          'Usually as an edge index — two parallel arrays of source and destination vertex ids — plus a dense feature matrix of shape (V, F). That is an adjacency list in columnar form, chosen because it is O(E) in memory and maps directly onto the gather-scatter operations a GPU performs efficiently. A message-passing layer is then mathematically a sparse adjacency matrix times the feature matrix, followed by a learned transformation, so libraries keep the graph as a sparse tensor and never materialise the dense V-by-V matrix, which for a million-node graph would be impossible. The practical consequences follow directly from the representation: mini-batching requires sampling subgraphs because you cannot fit the whole neighbourhood expansion, and high-degree vertices dominate both memory and compute, which is why neighbour sampling caps the fan-out per layer.',
        followUp:
          'Explaining why neighbourhood expansion grows exponentially with layer count, and how sampling bounds it, shows real familiarity with training GNNs.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a function that converts an edge list into an adjacency list, supporting a `directed` flag, and state the complexity.',
        hint: 'The only difference between the two cases is whether you record the reverse edge.',
        solution:
          'from collections import defaultdict\n\ndef build(edges, directed=False):\n    adj = defaultdict(set)\n    for u, v in edges:\n        adj[u].add(v)\n        if not directed:\n            adj[v].add(u)\n        else:\n            adj.setdefault(v, set())    # ensure sinks appear as vertices\n    return dict(adj)\n\nTime is O(E) and space is O(V + E). The `setdefault` line matters more than it looks: without it, a vertex with no outgoing edges never appears as a key, so iterating the graph silently skips it and any traversal reports the wrong vertex count. Using sets rather than lists also makes duplicate edges in the input idempotent, which is usually what you want when building from scraped or joined data.',
      },
      {
        prompt: 'Given an adjacency list, count the number of connected components in an undirected graph without writing a full traversal from scratch — describe the algorithm and its complexity.',
        hint: 'Every unvisited vertex you start from begins a new component.',
        solution:
          'Keep a global visited set. Iterate over all vertices; whenever you meet one that has not been visited, increment the component counter and run a traversal (BFS or DFS) from it, marking everything reachable as visited. Because each vertex and each edge is examined exactly once across all the traversals combined, the total cost is O(V + E) time and O(V) space, not O(V) separate traversals of O(V + E) each.\n\nThe subtlety worth stating in an interview is that the outer loop is what makes this work on a disconnected graph: a single traversal only ever reaches one component, so any code that starts from an arbitrary vertex and stops is answering a different question. This is the standard shape for "count islands", "number of friend circles" and duplicate-record clustering by transitive matching.',
      },
      {
        prompt: 'A graph has 100,000 vertices and 400,000 edges. Compute its density, give the memory for both representations, and recommend one.',
        hint: 'Count cells for the matrix and entries for the list.',
        solution:
          'Density = 2E / (V(V-1)) = 800,000 / (100,000 * 99,999) which is about 8 * 10^-5 — extremely sparse, with an average degree of 8.\n\nAdjacency matrix: 10^10 cells. At one byte each that is 10 GB, and with a 64-bit float weight, 80 GB. Adjacency list: roughly 800,000 neighbour entries for the undirected duplication plus 100,000 keys, so on the order of tens of megabytes in Python and a few megabytes in a compact array form. That is a factor of about a thousand.\n\nUse the adjacency list, as a dict of sets so edge tests stay O(1). Traversal then costs O(V + E) = 500,000 operations rather than the matrix\'s 10^10. The only reason to consider a matrix here would be an algorithm requiring matrix products, in which case use scipy.sparse CSR, which gives matrix semantics at O(E) space.',
      },
    ],

    quiz: [
      {
        id: 'DSA-012-q1',
        type: 'mcq',
        concept: 'representation space',
        prompt: 'A graph has 1,000,000 vertices and 3,000,000 edges. Which representation should you use?',
        options: [
          'Adjacency list, because the matrix would need 10^12 cells that are almost all zero',
          'Adjacency matrix, because edge lookups are O(1)',
          'Either, since both use O(V + E) space',
          'An adjacency matrix, because it traverses faster',
        ],
        answerIndex: 0,
        explanation:
          'Density here is about 6 * 10^-6. The matrix costs O(V^2) regardless of edge count and makes traversal O(V^2), while the list costs O(V + E) and traverses in O(V + E).',
      },
      {
        id: 'DSA-012-q2',
        type: 'numeric',
        concept: 'handshaking lemma',
        prompt: 'An undirected graph has 9 edges. What is the sum of all vertex degrees?',
        answer: 18,
        explanation:
          'Each edge contributes 1 to the degree of each of its two endpoints, so the degrees sum to 2|E| = 18. Checking this after building a graph catches edges added in only one direction.',
      },
      {
        id: 'DSA-012-q3',
        type: 'truefalse',
        concept: 'directed graphs',
        prompt: 'In a directed graph, the adjacency matrix is always symmetric.',
        answer: false,
        explanation:
          'Symmetry means every edge has a matching reverse edge, which is the definition of undirected. A directed graph is symmetric only in the special case where every edge happens to be mutual.',
      },
      {
        id: 'DSA-012-q4',
        type: 'match',
        concept: 'modelling choices',
        prompt: 'Match each situation to the graph type that models it correctly.',
        pairs: [
          { left: 'Facebook friendships', right: 'Undirected, unweighted' },
          { left: 'Twitter follows', right: 'Directed, unweighted' },
          { left: 'Road network with travel times', right: 'Directed, weighted' },
          { left: 'Task dependencies in a pipeline', right: 'Directed acyclic graph (DAG)' },
        ],
        explanation:
          'Direction encodes whether the relationship is mutual; weights encode cost. Acyclicity is an extra property that makes a consistent ordering possible, which is what a scheduler needs.',
      },
      {
        id: 'DSA-012-q5',
        type: 'debug',
        language: 'python',
        concept: 'undirected edge bug',
        prompt: 'A traversal from A reaches B but a traversal from B never reaches A. What is wrong with this construction?',
        code: `adj = defaultdict(set)
for u, v in edges:
    adj[u].add(v)`,
        options: [
          'For an undirected graph the reverse edge is missing: also do `adj[v].add(u)`',
          '`defaultdict(set)` should be `defaultdict(list)`',
          'The edges need to be sorted before insertion',
          'Vertices must be integers rather than strings',
        ],
        answerIndex: 0,
        explanation:
          'Recording only one direction produces a directed graph. The degree sum will come to |E| instead of 2|E|, which is the quickest way to detect the bug.',
      },
      {
        id: 'DSA-012-q6',
        type: 'explain',
        concept: 'choosing a representation',
        prompt: 'Explain how you decide between an adjacency list and an adjacency matrix.',
        rubric: [
          'Compares O(V + E) space against O(V^2), and connects the choice to density',
          'Notes that enumerating neighbours is O(degree) with a list and O(V) with a matrix, which dominates traversal cost',
          'Names a genuine case for the matrix: dense graphs, or algorithms expressed as matrix arithmetic',
        ],
        sampleAnswer:
          'I start with density, the fraction of possible edges that actually exist. Real networks are overwhelmingly sparse — a million users with a few hundred friends each is a density of around 10^-4 — so a V-by-V matrix would be almost entirely zeros and would cost 10^12 cells to store them. An adjacency list costs O(V + E), which here is a few hundred million entries rather than a trillion. The operation mix matters just as much: the matrix\'s one advantage is testing a specific edge in O(1), but enumerating a vertex\'s neighbours means scanning an entire row, O(V), and neighbour enumeration is what every traversal does at every step, so traversal becomes O(V^2) rather than O(V + E). Storing neighbours as sets rather than lists gives O(1) edge tests as well, which removes the matrix\'s last advantage. I would reach for a matrix only for a dense graph, or when the algorithm is linear algebra — spectral methods, or message passing in a graph neural network — and even then I would use a sparse matrix format rather than a dense one.',
        explanation:
          'The examinable judgement is connecting density and operation mix to the space and time costs, rather than reciting the two complexities without a decision rule.',
      },
    ],

    flashcards: [
      { front: 'Adjacency list versus matrix: space', back: 'List O(V + E); matrix O(V^2). Real graphs are sparse, so the list is the default.' },
      { front: 'Why is traversal O(V + E) with an adjacency list?', back: 'Each vertex is visited once and each edge examined once; the degree sum is 2|E| by the handshaking lemma.' },
      { front: 'What does a matrix give you that a list does not?', back: 'O(1) edge existence tests — but a dict of sets gives that too, at O(V + E) space.' },
      { front: 'Directed versus undirected', back: 'Directed edges go one way (follows, depends-on); undirected are mutual (friendship, roads). Undirected means the matrix is symmetric.' },
      { front: 'What is a DAG and where do you meet one?', back: 'A directed graph with no cycles: task dependencies, build systems, and the autograd computation graph in PyTorch.' },
      { front: 'Most common graph-building bug', back: 'Adding an undirected edge in only one direction. Check that the degree sum equals 2|E|.' },
    ],

    challenge: {
      title: 'A graph class that reports on itself',
      brief:
        'Implement a Graph class supporting directed and undirected modes, weighted edges, add_edge, neighbours, has_edge, degree and a `stats()` method reporting vertex count, edge count, density, degree distribution (min, mean, max) and the number of isolated vertices. Store the graph as a dict of dicts so weights and O(1) edge tests both work. Then load a graph of at least 10,000 vertices — generated or from a public edge list — and print the stats, together with the estimated memory of the equivalent dense matrix, to make the representation argument with real numbers.',
      language: 'python',
      acceptanceCriteria: [
        'Undirected mode records both directions and the degree sum equals twice the edge count',
        'has_edge is O(1) and neighbours is O(degree)',
        'stats() reports density and the degree distribution, not just counts',
        'The dense-matrix memory estimate is computed from V, with the units stated',
      ],
      starterCode: 'class Graph:\n    def __init__(self, directed=False):\n        self.directed = directed\n        self.adj = {}          # node -> {neighbour: weight}\n\n    def add_edge(self, u, v, weight=1.0):\n        ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone what a graph is, what makes it different from a tree, and how to decide how to store one.',
      mustCover: [
        'A graph is vertices plus edges, and models relationships rather than order or containment',
        'Edges may be directed or undirected, weighted or not, and the modelling choice must match reality',
        'An adjacency list stores each vertex\'s neighbours: O(V + E) space, O(degree) to enumerate them',
        'An adjacency matrix is a V-by-V grid: O(V^2) space, O(1) edge tests, and wasteful for sparse graphs',
      ],
      bonusSignals: ['explains density as the deciding factor', 'notes that a tree is a graph with no cycles and one parent per node', 'mentions that most real graphs are extremely sparse'],
      sampleExplanation:
        'A graph is just things and the connections between them — people and friendships, junctions and roads, tasks and what they depend on. A tree is the tidy special case: one thing at the top, every other thing with exactly one parent, and no loops. A graph drops both restrictions, so anything can connect to anything and paths can come back round on themselves, which is why graph algorithms need to remember where they have already been. The interesting decision is how to store one. The natural way is to keep, for each item, the list of items it connects to: that takes space proportional to the number of connections that really exist, and asking "where can I go from here?" just means reading one short list. The alternative is a big square grid with every item along both edges, where each cell says whether a connection exists. The grid answers "is there a link between these two specific items?" instantly, but it reserves space for every possible connection, and in real networks almost none of them exist — a million users would need a trillion cells to record a few hundred friends each. So unless the network is unusually dense, or you are doing matrix mathematics on it, the list of neighbours is the right choice.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
];
