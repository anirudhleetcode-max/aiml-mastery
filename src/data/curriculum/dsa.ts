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
  {
    id: 'DSA-013',
    domain: 'DSA',
    module: 'Graphs',
    topic: 'Level-order traversal and unweighted shortest paths',
    title: 'Breadth-First Search',
    slug: 'breadth-first-search',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DSA-006', 'DSA-012'],
    related: ['DSA-008', 'DSA-009', 'DSA-011'],
    tags: ['bfs', 'graph', 'queue', 'shortest-path', 'traversal', 'levels'],

    learningObjectives: [
      'Run breadth-first search by hand on a small graph, maintaining the queue, the visited set, the distance map and the parent map at every step',
      'Explain why BFS finds the shortest path in an unweighted graph, and why that guarantee collapses the moment edges carry weights',
      'Reconstruct an actual shortest path from the parent map rather than only reporting its length',
      'Write BFS over an implicit graph — a grid, a word ladder, a state space — where the adjacency list is computed on demand rather than stored',
      'State the O(V + E) time and O(V) space costs and justify each term from the code',
    ],

    terminology: [
      {
        term: 'Frontier',
        definition:
          'The set of vertices at the current distance from the source — everything BFS is about to expand. Implemented as the contents of the queue, which at any moment holds vertices from at most two adjacent levels.',
        simple: 'The ring of places you have just reached and are about to look beyond.',
      },
      {
        term: 'Discovered versus expanded',
        definition:
          'A vertex is discovered when it is first seen and pushed onto the queue; it is expanded when it is popped and its neighbours are examined. BFS marks vertices on discovery, not on expansion.',
        simple: 'Spotting a place from a distance is not the same as walking to it and looking around.',
      },
      {
        term: 'Parent (predecessor) map',
        definition:
          'A dictionary recording, for each discovered vertex, the vertex from which it was first reached. Following it backwards from a target to the source yields an actual shortest path.',
        simple: 'A trail of breadcrumbs saying "I got here from there".',
      },
      {
        term: 'BFS tree',
        definition:
          'The subgraph formed by the edges that discovered new vertices. It is a spanning tree of the reachable component in which the depth of every vertex equals its true distance from the source.',
        simple: 'The skeleton of first-arrival routes, with the start at the top.',
      },
      {
        term: 'Implicit graph',
        definition:
          'A graph whose vertices and edges are generated on demand by a successor function rather than stored in memory — a maze grid, the legal moves of a puzzle, the one-letter neighbours of a word.',
        simple: 'A map you make up as you walk instead of carrying one.',
      },
    ],

    simpleExplanation:
      'Imagine dropping a pebble into a still pond. The ripple reaches everything one step away first, then everything two steps away, then three — and it never reaches something five steps away before something three steps away. Breadth-first search is that ripple made into an algorithm. You start at one vertex, look at all of its neighbours, then all of their neighbours, and so on, expanding outwards one complete ring at a time. The only machinery you need is a queue, which hands vertices back in the order they arrived, and a set recording which vertices you have already seen so the ripple does not wash back over itself. Because the rings come out in order of distance, the first time BFS touches a vertex it has arrived by the shortest possible route — so you get shortest paths for free, without ever comparing routes. That single guarantee is why BFS answers questions like "how many introductions away is this person?" and "what is the smallest number of moves that solves this puzzle?" while a depth-first wander, which plunges down one path until it is stuck, answers neither.',

    whyItExists:
      'Every question of the form "what is the fewest steps from here to there?" needs a traversal that discovers vertices in order of distance. Wandering a graph at random, or plunging down one branch at a time, finds a path but almost never the shortest one, and comparing all paths explicitly is exponential. BFS gives the minimum hop count in O(V + E) with nothing more exotic than a queue.',

    analogy: {
      scenario:
        'You are new in a city and want to know how many introductions it takes to reach the mayor. You ask everyone you know directly — that is one introduction. None of them is the mayor, so you ask each of them for everyone they know, and you note the names down in the order they are offered. Those are two introductions away. You work through that whole list before you start on anyone three away, and you keep a notebook of every name already heard so you never chase the same person twice. The moment the mayor\'s name appears, you stop: the number of rings you have been through is exactly the answer, and by asking "who told me about you?" back along the chain you recover the actual sequence of introductions.',
      mapping: [
        { from: 'A person', to: 'A vertex' },
        { from: '"Knows directly"', to: 'An edge' },
        { from: 'The list of names waiting to be asked, in arrival order', to: 'The FIFO queue' },
        { from: 'The notebook of names already heard', to: 'The visited set, written on discovery' },
        { from: 'Finishing all two-away people before starting three-away', to: 'Level-by-level expansion, which is what gives the shortest-path guarantee' },
        { from: '"Who told me about you?"', to: 'The parent map, followed backwards to reconstruct the path' },
      ],
      bridge:
        'The notebook is the part beginners drop, and it is the part that matters: without it the same person is queued by every mutual acquaintance, the queue grows exponentially and the search never terminates on a graph with a cycle. Writing the name down at the moment you first hear it — not when you get round to asking them — is what bounds the queue to O(V) and keeps every vertex enqueued exactly once. The strict ring-by-ring discipline is the other half: it is what makes the first arrival the shortest arrival.',
      limitations:
        'The story treats every introduction as equally costly, which is exactly the assumption BFS makes. If some introductions took a week and others ten minutes, fewest-hops would no longer mean fastest, and you would need Dijkstra\'s algorithm with a priority queue instead of a plain queue. The analogy also hides memory cost: the frontier of a social graph three hops out can be millions of people, and BFS holds an entire frontier at once.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'BFS expanding ring by ring',
        caption: 'Step through the queue one pop at a time and watch the frontier move outwards from the source.',
        widget: 'graph-traversal',
        props: { mode: 'bfs', start: 'A' },
      },
      {
        kind: 'ascii',
        title: 'The six-node graph, coloured by BFS distance from A',
        caption: 'Distances: A = 0; B and D = 1; C and E = 2; F = 3. The BFS tree edges are A-B, A-D, B-C, B-E, C-F.',
        art: `   level 0     level 1     level 2     level 3

      A ------- B ------- C ------- F
      |         |
      |         |
      D ------- E
   (level 1) (level 2)

   edges: A-B, A-D, B-C, B-E, C-F, D-E
   D-E is a cross edge: both endpoints are already discovered`,
      },
      {
        kind: 'flow',
        title: 'The BFS loop',
        caption: 'Five lines of state, one loop. Everything else is bookkeeping.',
        steps: [
          { label: 'Seed', detail: 'Put the source in the queue, set dist[source] = 0 and mark it visited. A multi-source BFS seeds several vertices at distance 0 instead.' },
          { label: 'Pop the front', detail: 'Take the oldest vertex u off the queue. FIFO order is what guarantees vertices come out in non-decreasing distance.' },
          { label: 'Enumerate neighbours', detail: 'For each v adjacent to u, ask only one question: has v been discovered already?' },
          { label: 'Discover and record', detail: 'If not, set dist[v] = dist[u] + 1, parent[v] = u, mark v visited immediately, and push it. Marking here, not on pop, is the whole correctness argument for the queue bound.' },
          { label: 'Repeat until empty', detail: 'When the queue drains, every vertex reachable from the source has its final distance and every unreachable vertex is simply absent from the map.' },
          { label: 'Reconstruct', detail: 'Walk parent[] backwards from the target to the source and reverse the list to get an actual shortest path, not just its length.' },
        ],
      },
      {
        kind: 'compare',
        title: 'BFS versus a weighted shortest path',
        caption: 'BFS is Dijkstra\'s algorithm for the special case where every edge costs one.',
        left: {
          heading: 'BFS — unweighted',
          points: [
            'Plain FIFO queue; each vertex enters and leaves once',
            'O(V + E), no comparisons between competing routes',
            'First arrival is final: a vertex is never re-discovered at a smaller distance',
            'Correct only when every edge has the same cost',
          ],
        },
        right: {
          heading: 'Dijkstra — non-negative weights',
          points: [
            'Priority queue keyed by tentative distance (see heaps)',
            'O((V + E) log V) with a binary heap',
            'A vertex may be reached cheaply later, so distances are relaxed as you go',
            'Requires non-negative weights; negative edges need Bellman-Ford',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Which traversal answers which question',
        caption: 'The queue-versus-stack choice is the whole difference, and it changes what the traversal can promise.',
        columns: ['Question', 'Use', 'Why'],
        rows: [
          ['Fewest hops from A to B', 'BFS', 'Discovers vertices in non-decreasing distance order, so the first arrival is optimal'],
          ['All vertices within k hops', 'BFS', 'Stop expanding once dist exceeds k; the frontier is exactly the k-th ring'],
          ['Does a path exist at all?', 'Either', 'Both reach every vertex in the component; DFS uses less memory on wide graphs'],
          ['Is the graph bipartite?', 'BFS', 'Two-colour by level parity; any edge inside a level proves an odd cycle'],
          ['Topological order of a DAG', 'DFS or Kahn', 'Needs finishing times or in-degree counts, not distances'],
          ['Shortest path with edge weights', 'Neither', 'Use Dijkstra with a priority queue; BFS would return the wrong route'],
        ],
      },
    ],

    formalDefinition:
      'Breadth-first search from a source s in a graph G = (V, E) computes, for every vertex v reachable from s, the distance d(v) — the minimum number of edges on any s-to-v path — and a predecessor pi(v) such that the predecessor edges form a breadth-first tree rooted at s. It maintains a FIFO queue of discovered-but-not-yet-expanded vertices; the algorithm repeatedly dequeues a vertex u and, for each neighbour v not yet discovered, sets d(v) = d(u) + 1 and pi(v) = u before enqueueing v. Using an adjacency list it runs in O(|V| + |E|) time and O(|V|) auxiliary space, and it is exactly Dijkstra\'s algorithm specialised to unit edge weights.',

    math: {
      intuition:
        'Two facts do all the work. First, the queue never holds vertices from more than two consecutive levels, so distances come out in non-decreasing order — a vertex at distance k + 1 can only be discovered from one at distance k, and every distance-k vertex is already queued ahead of it. Second, each vertex is discovered once and expanded once, and expanding it costs work proportional to its degree, so the total is the sum of all degrees, which the handshaking lemma pins at 2|E|.',
      formulas: [
        {
          latex: 'd(v) = \\min\\{\\, |P| : P \\text{ is a path from } s \\text{ to } v \\,\\}',
          name: 'Unweighted shortest distance',
          meaning: 'What BFS computes: the least number of edges on any route from the source to v, or infinity if v is unreachable.',
          category: 'complexity',
          variables: [
            { symbol: 's', meaning: 'The source vertex BFS starts from' },
            { symbol: 'v', meaning: 'Any other vertex' },
            { symbol: '|P|', meaning: 'The number of edges on path P' },
          ],
        },
        {
          latex: 'd(v) = d(u) + 1 \\quad \\text{for the edge } (u, v) \\text{ that first discovers } v',
          name: 'The BFS update rule',
          meaning: 'Every vertex takes its distance from the vertex that reached it first, which is why the predecessor edges form a tree of shortest paths.',
          category: 'complexity',
          variables: [
            { symbol: 'u', meaning: 'The vertex being expanded, already holding its final distance' },
            { symbol: 'v', meaning: 'A neighbour being discovered for the first time' },
          ],
        },
        {
          latex: 'T(V, E) = O\\big(|V| + |E|\\big), \\qquad S(V) = O(|V|)',
          name: 'Cost of BFS on an adjacency list',
          meaning: 'Each vertex is enqueued and dequeued once, contributing |V|; each edge is examined once per endpoint, contributing 2|E| = O(|E|).',
          category: 'complexity',
          variables: [
            { symbol: 'T', meaning: 'Time, counted in basic operations' },
            { symbol: 'S', meaning: 'Auxiliary space: the queue, the visited set, the distance and parent maps' },
          ],
        },
        {
          latex: '|\\text{frontier}| \\le b^{d} \\quad \\text{with branching factor } b',
          name: 'Frontier growth',
          meaning: 'The practical memory limit of BFS: on a graph where each vertex has b neighbours, the ring at depth d holds up to b^d vertices, which is why BFS on a deep state space exhausts memory long before it exhausts time.',
          category: 'complexity',
          variables: [
            { symbol: 'b', meaning: 'Branching factor, the typical out-degree' },
            { symbol: 'd', meaning: 'Depth of the current ring' },
          ],
        },
      ],
      derivation: [
        'Claim: when BFS dequeues vertices, their d values are non-decreasing. The queue starts with s alone at distance 0.',
        'Inductive step: suppose every vertex dequeued so far had distance k or k + 1, with all distance-k vertices ahead of all distance-(k + 1) ones. Expanding a distance-k vertex appends only distance-(k + 1) vertices to the back.',
        'So the queue always holds a block of distance-k vertices followed by a block of distance-(k + 1) vertices, and FIFO order preserves that invariant.',
        'Correctness follows: if v were reachable in fewer than d(v) edges, there would be a path s = u_0, ..., u_m = v with m < d(v); its second-to-last vertex u_(m-1) has distance at most m - 1, would be expanded before any distance-d(v) vertex, and would have discovered v then — a contradiction.',
        'Cost: the discovered check makes every vertex enter the queue at most once, so the pop loop runs at most |V| times.',
        'Each pop enumerates deg(u) neighbours, and summing deg(u) over all vertices gives 2|E| in an undirected graph, |E| in a directed one.',
        'Total time is therefore O(|V| + |E|). Space is O(|V|) for the maps plus O(|V|) worst-case queue, since the frontier can be nearly the whole graph.',
      ],
    },

    workedExample: {
      title: 'BFS by hand on the six-node graph, from A',
      setup:
        'The graph from the previous unit: vertices A to F, undirected edges A-B, A-D, B-C, B-E, C-F, D-E. Adjacency lists in alphabetical order are A: [B, D], B: [A, C, E], C: [B, F], D: [A, E], E: [B, D], F: [C]. Start at A. Track four things at every step — the queue (front on the left), the visited set, dist and parent.',
      steps: [
        {
          label: 'Initialise',
          detail: 'queue = [A]; visited = {A}; dist = {A: 0}; parent = {A: none}. Nothing else is known yet, and no other vertex has a distance — absent means "undiscovered", which is also how unreachable vertices will end up.',
        },
        {
          label: 'Pop A (distance 0)',
          detail: 'Neighbours B and D are both undiscovered. Set dist[B] = 1, parent[B] = A, dist[D] = 1, parent[D] = A, mark both visited and enqueue them. queue = [B, D]. Level 1 is now fully known even though we have not looked at either vertex.',
        },
        {
          label: 'Pop B (distance 1)',
          detail: 'Neighbours are A, C, E. A is already visited, so it is skipped — this is the check that stops the ripple washing backwards. C and E are new: dist = 2 for both, parent[C] = parent[E] = B. queue = [D, C, E].',
        },
        {
          label: 'Pop D (distance 1)',
          detail: 'Neighbours are A (visited) and E. E was discovered one step ago from B and is already marked, so nothing happens. This is the moment that matters: the edge D-E is a cross edge, and because E was marked on discovery rather than on expansion, it is not enqueued a second time. queue = [C, E].',
        },
        {
          label: 'Pop C (distance 2)',
          detail: 'Neighbours are B (visited) and F (new). dist[F] = 3, parent[F] = C, enqueue. queue = [E, F]. Notice the queue now holds one distance-2 vertex followed by one distance-3 vertex — never more than two adjacent levels, exactly as the invariant promises.',
        },
        {
          label: 'Pop E (distance 2)',
          detail: 'Neighbours B and D are both visited. Nothing is discovered. queue = [F].',
        },
        {
          label: 'Pop F (distance 3)',
          detail: 'Its only neighbour C is visited. queue = []. The loop ends.',
        },
        {
          label: 'Read off the answers',
          detail: 'Visit order: A, B, D, C, E, F. Distances: A = 0, B = 1, D = 1, C = 2, E = 2, F = 3. Levels: {A}, {B, D}, {C, E}, {F}. Every vertex appears, so the graph is connected.',
          latex: 'd(A){=}0,\\; d(B){=}d(D){=}1,\\; d(C){=}d(E){=}2,\\; d(F){=}3',
        },
        {
          label: 'Reconstruct the path to F',
          detail: 'parent[F] = C, parent[C] = B, parent[B] = A, parent[A] = none. Reversed, that is A -> B -> C -> F, three edges, matching dist[F] = 3. There is no shorter route: F touches only C, C touches only B and F, and B is two from A.',
        },
        {
          label: 'Count the work',
          detail: '6 pops and 12 neighbour inspections (each undirected edge is looked at from both ends), so 18 basic operations for V = 6, E = 6 — precisely the O(V + E) = O(6 + 6) the formula predicts, not V^2 = 36.',
          latex: 'T = |V| + 2|E| = 6 + 12 = 18',
        },
        {
          label: 'What changes with a different tie-break',
          detail: 'If A\'s list were [D, B] instead, the visit order would be A, D, B, E, C, F and parent[E] would be D rather than B. Distances would be identical. BFS pins down the distances uniquely; the particular shortest path it returns depends on neighbour order, which is worth saying out loud when a test asserts on one exact path.',
        },
      ],
      conclusion:
        'Time is O(V + E) = 18 operations here: every vertex is enqueued exactly once because discovery marks it immediately, and every edge is inspected exactly twice, once from each endpoint. Space is O(V) — the queue peaked at three entries, and the visited, dist and parent maps hold one entry per vertex. The essential discipline is marking on enqueue: had we marked on dequeue instead, E would have been pushed by both B and D, and on a dense graph that duplication multiplies the queue by the average degree. The parent map costs nothing extra and upgrades the answer from "F is three hops away" to "here is the route", which is almost always what the caller actually wanted.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'BFS with distances, parents and path reconstruction',
        runnable: true,
        code: `from collections import deque

adj = {"A": ["B", "D"], "B": ["A", "C", "E"], "C": ["B", "F"],
       "D": ["A", "E"], "E": ["B", "D"], "F": ["C"]}

def bfs(adj, start):
    dist = {start: 0}
    parent = {start: None}
    order = []
    q = deque([start])
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in dist:              # mark on ENQUEUE, not on dequeue
                dist[v] = dist[u] + 1
                parent[v] = u
                q.append(v)
    return order, dist, parent

order, dist, parent = bfs(adj, "A")
print("visit order:", order)
print("distances:  ", dist)

def path_to(parent, target):
    path = []
    while target is not None:
        path.append(target)
        target = parent[target]
    return path[::-1]

print("shortest A->F:", path_to(parent, "F"), "length", dist["F"])`,
        output: `visit order: ['A', 'B', 'D', 'C', 'E', 'F']
distances:   {'A': 0, 'B': 1, 'D': 1, 'C': 2, 'E': 2, 'F': 3}
shortest A->F: ['A', 'B', 'C', 'F'] length 3`,
        explanation:
          'The dist dictionary doubles as the visited set, which removes a whole class of bug where the two disagree. Use collections.deque and not a list: list.pop(0) is O(n) because every remaining element shifts left, so a list-based queue silently turns an O(V + E) traversal into O(V^2 + E). The parent map is three extra lines and turns a distance into a route; note that path_to relies on parent[start] being None as the stopping sentinel, so a start vertex mapped to itself would loop forever.',
      },
      {
        language: 'python',
        title: 'Level-by-level BFS, when you want the rings themselves',
        runnable: true,
        code: `from collections import deque

adj = {"A": ["B", "D"], "B": ["A", "C", "E"], "C": ["B", "F"],
       "D": ["A", "E"], "E": ["B", "D"], "F": ["C"]}

def bfs_levels(adj, start):
    seen = {start}
    frontier = [start]
    depth = 0
    while frontier:
        yield depth, frontier
        nxt = []
        for u in frontier:
            for v in adj[u]:
                if v not in seen:
                    seen.add(v)
                    nxt.append(v)
        frontier = nxt
        depth += 1

for d, layer in bfs_levels(adj, "A"):
    print(f"level {d}: {sorted(layer)}")`,
        output: `level 0: ['A']
level 1: ['B', 'D']
level 2: ['C', 'E']
level 3: ['F']`,
        explanation:
          'Swapping the queue for two lists — the current frontier and the one being built — makes the level structure explicit, which is what you want for "friends of friends", "all nodes within k hops" or level-order printing of a tree. It is the same algorithm with the same O(V + E) cost; the only difference is that the level boundary is structural instead of being inferred from a distance map. Stopping early when depth reaches k gives a bounded-radius neighbourhood, which is exactly how a graph neural network samples the receptive field of a node.',
      },
      {
        language: 'python',
        title: 'BFS on an implicit graph: fewest moves through a maze',
        runnable: true,
        code: `from collections import deque

grid = ["....#",
        ".##.#",
        "....."]
R, C = len(grid), len(grid[0])
start, goal = (0, 0), (2, 4)

dist = {start: 0}
q = deque([start])
while q:
    r, c = q.popleft()
    if (r, c) == goal:
        break
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != "#" and (nr, nc) not in dist:
            dist[(nr, nc)] = dist[(r, c)] + 1
            q.append((nr, nc))

print("fewest moves:", dist.get(goal))
print("cells discovered:", len(dist), "of", R * C)`,
        output: `fewest moves: 6
cells discovered: 11 of 15`,
        explanation:
          'There is no adjacency list here at all: the neighbours of a cell are computed from the four offsets, and the graph exists only as the successor rule plus the wall test. This is the shape of most real BFS code — puzzle solvers, word ladders, flood fill, reachability in a state machine — and it is why "build the graph first" is usually the wrong instinct. The bounds check must come before the grid lookup, since Python happily indexes grid[-1] and wraps to the last row, producing a wrong answer rather than an exception.',
      },
      {
        language: 'python',
        title: 'Multi-source BFS: distance to the nearest of several starts',
        runnable: true,
        code: `from collections import deque

grid = ["..#..",
        ".##..",
        "....."]
R, C = len(grid), len(grid[0])
sources = [(0, 0), (2, 4)]           # two first-aid points
dist = {s: 0 for s in sources}
q = deque(sources)                    # seed the queue with ALL sources at once

while q:
    r, c = q.popleft()
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != "#" and (nr, nc) not in dist:
            dist[(nr, nc)] = dist[(r, c)] + 1
            q.append((nr, nc))

for r in range(R):
    print(" ".join("#" if grid[r][c] == "#" else str(dist[(r, c)]) for c in range(C)))
print("furthest free cell is", max(dist.values()), "steps from help")`,
        output: `0 1 # 3 2
1 # # 2 1
2 3 2 1 0
furthest free cell is 3 steps from help`,
        explanation:
          'Seeding the queue with every source at distance zero computes the distance to the nearest source for all cells in a single O(V + E) pass, instead of running one BFS per source and taking the minimum, which would cost O(k(V + E)) for k sources. The trick works because the invariant is about the queue holding non-decreasing distances, not about there being one root; conceptually you have added a virtual super-source joined to every real source by a zero-cost edge. This is the standard solution to "rotting oranges", "walls and gates" and nearest-facility queries on a grid.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Degrees of separation in a social or professional network',
        usage:
          'LinkedIn\'s "2nd degree" badge is a bounded BFS from you, expanded two rings and stopped. The frontier is the reason it is bounded: at an average degree of a few hundred, ring three is already hundreds of millions of profiles, so the product limits the radius rather than the runtime.',
      },
      {
        context: 'Knowledge-graph retrieval for grounded question answering',
        usage:
          'Given the entities mentioned in a question, a retrieval step runs BFS one or two hops out over a knowledge graph to gather neighbouring facts, which are then serialised into a language model\'s context. The hop limit is both a relevance decision and a token-budget decision.',
      },
      {
        context: 'Crawlers and dependency resolution',
        usage:
          'A web crawler is BFS over an implicit graph of links, which is what keeps it near the seed pages rather than plunging down one site forever. Package managers use the same shape to find the shallowest version of a transitive dependency.',
      },
      {
        context: 'Mini-batch sampling for graph neural networks',
        usage:
          'PyTorch Geometric\'s NeighborLoader takes a batch of target nodes and expands a fixed number of BFS rings with a capped fan-out per ring. That is exactly bounded multi-source BFS, and the cap exists because an unbounded frontier would swallow the whole graph in three layers.',
      },
    ],

    projectConnections: [
      { tool: 'collections.deque', role: 'The queue behind every BFS in Python: O(1) append and popleft, unlike a list whose pop(0) is O(n).' },
      { tool: 'networkx', role: 'nx.shortest_path, nx.bfs_layers and nx.descendants_at_distance are BFS with the bookkeeping already written; useful as a reference implementation to test your own against.' },
      { tool: 'PyTorch Geometric', role: 'NeighborLoader performs bounded multi-hop BFS sampling to build mini-batches, because full-neighbourhood expansion is intractable past two layers.' },
      { tool: 'scipy.sparse.csgraph', role: 'breadth_first_order and shortest_path run BFS in compiled code over CSR matrices, for graphs too large for a Python-level loop.' },
    ],

    commonMistakes: [
      {
        mistake: 'Marking vertices visited when they are dequeued instead of when they are enqueued',
        why: 'A vertex reachable from several frontier vertices gets pushed once per discoverer. The queue can grow to O(E) instead of O(V), and on a dense graph the duplicate pops dominate the runtime — the algorithm is still correct, just needlessly slow and memory-hungry.',
        fix: 'Add to the visited set (or write dist[v]) in the same breath as q.append(v). Using the dist dictionary as the visited set makes the mistake structurally impossible.',
      },
      {
        mistake: 'Using a plain list as the queue and calling pop(0)',
        why: 'list.pop(0) shifts every remaining element left, costing O(n). With a frontier of n vertices the traversal degrades from O(V + E) to O(V^2 + E), which is invisible on a ten-node test and fatal at a million.',
        fix: 'Use collections.deque and popleft(). If you genuinely need a list, pop from the end — but then you have written DFS, not BFS, and your shortest-path guarantee is gone.',
      },
      {
        mistake: 'Using BFS on a weighted graph',
        why: 'BFS counts edges, not cost. A two-hop route over two expensive edges beats a three-hop route over three cheap ones in BFS\'s eyes, so it confidently returns a path that is not the cheapest.',
        fix: 'Use Dijkstra with a heap for non-negative weights, or Bellman-Ford if weights can be negative. The one exception is 0-1 weights, where a double-ended queue — push 0-edges to the front, 1-edges to the back — keeps the O(V + E) cost.',
      },
      {
        mistake: 'Recording the distance but not the parent, then needing the route',
        why: 'Recovering a path after the fact means re-running the search or walking distances backwards, and the second is subtly wrong on graphs where several neighbours share a distance unless you check adjacency too.',
        fix: 'Populate parent[v] = u at the same moment as dist[v] = dist[u] + 1. It costs one dictionary write and one pointer per vertex.',
      },
      {
        mistake: 'Running BFS from one vertex and concluding the graph is disconnected, or vice versa',
        why: 'A single BFS only ever sees one connected component, so "some vertices have no distance" means unreachable from this source — not that the graph is broken.',
        fix: 'Loop over all vertices and start a fresh BFS from each unvisited one if you need every component; the total cost is still O(V + E).',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why does BFS find the shortest path in an unweighted graph, and what exactly breaks when edges have weights?',
        answer:
          'Because the FIFO queue makes vertices come out in non-decreasing distance order. The invariant is that the queue only ever holds vertices from two consecutive levels, k and k + 1: expanding a level-k vertex can only append level-(k + 1) vertices to the back, so every level-k vertex is dequeued before any level-(k + 1) one. That means the first time a vertex is discovered it has been reached by a minimum-edge path, and re-discovery can never improve it, which is why the visited check can be an unconditional skip. With weights that argument collapses: dequeue order now reflects hop count rather than cost, so a vertex may first be discovered over a cheap-looking two-hop route that is actually expensive, and BFS has no mechanism to revise it. The fix is to order by accumulated cost instead of arrival — a priority queue — which is Dijkstra at O((V + E) log V). The special case worth knowing is 0-1 weights, where a deque with front-pushes for zero-cost edges restores O(V + E).',
        followUp:
          'A strong answer volunteers that BFS is Dijkstra with unit weights, and can state the two-level queue invariant rather than just asserting that "BFS goes level by level".',
      },
      {
        level: 'intermediate',
        question: 'You need the shortest route between two specific vertices in a graph with 50 million nodes. Plain BFS is too slow. What do you do?',
        answer:
          'Run BFS from both ends at once — bidirectional search. Alternate expanding the frontier from the source and from the target, and stop when the two visited sets intersect; the answer is the distance from each side to the meeting vertex, summed. The win is exponential in the branching factor: a one-sided search to depth d explores about b^d vertices, while two searches to depth d/2 explore about 2 * b^(d/2), which for b = 100 and d = 6 is a million times smaller. The requirements are that you can enumerate predecessors as well as successors, which is free in an undirected graph and needs a reverse index in a directed one, and that you expand the smaller frontier each round. The subtlety candidates miss is the stopping condition: you cannot stop at the first common vertex found mid-expansion on odd-length paths without checking every meeting point at the current radius, or you can return a path one edge too long. If weights were involved I would use bidirectional Dijkstra or A* with an admissible heuristic instead.',
        followUp:
          'Mentioning that landmark-based or contraction-hierarchy preprocessing beats both for repeated road-network queries shows awareness of the production answer.',
      },
      {
        level: 'ml-engineer',
        question: 'Where does BFS show up in a machine-learning system, as opposed to in a coding puzzle?',
        answer:
          'Three places I see it regularly. First, neighbourhood sampling for graph neural networks: a layer aggregates from one-hop neighbours, so an L-layer model needs the L-ring around each target node, and libraries implement that as bounded BFS with a fan-out cap per ring because the true receptive field grows like b^L. Second, retrieval over a knowledge graph for grounded generation: from the entities a question mentions, expand one or two hops to collect candidate facts, then rank them; the radius is chosen against the context budget, not against correctness. Third, dependency and lineage analysis in pipelines — which downstream feature tables and models are affected if this upstream source changes is a reachability query over a DAG, and BFS gives it by shortest hop, which is a useful proxy for blast radius. In all three the operative constraint is the frontier, not the time bound: memory is what forces a hop limit, a fan-out cap or sampling.',
        followUp:
          'Connecting exponential neighbourhood expansion to why GraphSAGE samples a fixed number of neighbours per layer shows the candidate has actually trained a GNN.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a function that returns every vertex within exactly k hops of a source, and explain why you cannot simply filter a full BFS by distance in a graph with a billion edges.',
        hint: 'The level-by-level form gives you the ring for free; the point is where you stop.',
        solution:
          'from collections import deque\n\ndef within_k(adj, start, k):\n    seen = {start}\n    frontier = [start]\n    rings = [[start]]\n    for _ in range(k):\n        nxt = []\n        for u in frontier:\n            for v in adj.get(u, ()):\n                if v not in seen:\n                    seen.add(v)\n                    nxt.append(v)\n        if not nxt:\n            break\n        rings.append(nxt)\n        frontier = nxt\n    return rings[-1] if len(rings) > k else []\n\nThe loop runs exactly k times, so the cost is proportional to the number of vertices and edges inside the k-ball, not to the whole graph: O(V_k + E_k). Filtering a full BFS would first traverse all billion edges and then discard almost everything, which is the same answer at enormously greater cost — and on a graph that does not fit in memory it is not merely slower, it is impossible. Returning rings[-1] rather than seen distinguishes "exactly k" from "at most k"; the guard handles a graph whose component is shallower than k, where the honest answer is an empty ring rather than the last non-empty one.',
      },
      {
        prompt: 'Determine whether an undirected graph is bipartite — whether its vertices can be split into two groups with every edge crossing between them — using BFS. State the complexity.',
        hint: 'Colour each vertex by the parity of its BFS level and look for an edge that fails.',
        solution:
          'from collections import deque\n\ndef is_bipartite(adj):\n    colour = {}\n    for src in adj:\n        if src in colour:\n            continue\n        colour[src] = 0\n        q = deque([src])\n        while q:\n            u = q.popleft()\n            for v in adj[u]:\n                if v not in colour:\n                    colour[v] = 1 - colour[u]\n                    q.append(v)\n                elif colour[v] == colour[u]:\n                    return False        # an edge inside a level: odd cycle\n    return True\n\nThe argument is that BFS assigns each vertex a level, and colouring by level parity satisfies every tree edge automatically. The only edges that can break bipartiteness are the ones joining two vertices of the same level, and such an edge closes a cycle of odd length, which is precisely the obstruction. Cost is one traversal, O(V + E) time and O(V) space. The outer loop over sources is not optional: a disconnected graph can have one bipartite component and one that is not, and starting from a single vertex would miss it. In practice this is how you check whether a user-item interaction graph really is bipartite before feeding it to an algorithm that assumes so.',
      },
      {
        prompt: 'A word ladder transforms "cold" into "warm" by changing one letter at a time, with every intermediate word in a given dictionary. Describe a BFS solution and give its complexity in terms of the word length L and the dictionary size N.',
        hint: 'The vertices are words; you never need to build the edge list explicitly.',
        solution:
          'Treat each dictionary word as a vertex, with an edge between words differing in exactly one letter, and run BFS from the start word until the target is dequeued; the distance is the ladder length. Never materialise the edges by comparing every pair, which is O(N^2 L). Instead, generate neighbours on demand: for each of the L positions try all 26 letters and keep the candidates present in a set of the dictionary, which costs O(26L) per word with O(L) hashing, so the whole traversal is O(N * L * 26) — linear in the dictionary.\n\nAn alternative that is faster when L is large is to precompute buckets keyed by wildcard patterns, so "cold" indexes into "*old", "c*ld", "co*d" and "col*", and neighbours are the union of its buckets. That is O(N L) preprocessing and makes neighbour lookup a few dictionary hits. Either way, remove each word from the dictionary as it is discovered so it cannot be queued twice, and use BFS rather than DFS because the question asks for the shortest ladder — DFS would find some ladder, usually a long one.',
      },
    ],

    quiz: [
      {
        id: 'DSA-013-q1',
        type: 'mcq',
        concept: 'data structure choice',
        prompt: 'What happens if you replace the queue in BFS with a stack, changing nothing else?',
        options: [
          'You get depth-first search, and the shortest-path guarantee disappears',
          'Nothing changes; both visit the same vertices in the same order',
          'The traversal becomes O(V^2)',
          'It stops terminating on graphs with cycles',
        ],
        answerIndex: 0,
        explanation:
          'LIFO order expands the most recently discovered vertex, so the search plunges down one branch instead of expanding rings. It still visits every reachable vertex in O(V + E), but the first arrival at a vertex is no longer along a minimum-edge path.',
      },
      {
        id: 'DSA-013-q2',
        type: 'numeric',
        concept: 'shortest distance',
        prompt: 'In the graph with edges A-B, A-D, B-C, B-E, C-F, D-E, how many edges are on the shortest path from A to F?',
        answer: 3,
        explanation:
          'BFS gives A = 0; B and D = 1; C and E = 2; F = 3. The route is A -> B -> C -> F, and no shorter one exists because F touches only C, which is itself two hops from A.',
      },
      {
        id: 'DSA-013-q3',
        type: 'order',
        concept: 'the BFS loop',
        prompt: 'Put the steps of one iteration of BFS into the correct order.',
        items: [
          'Dequeue the front vertex u',
          'Iterate over the neighbours of u',
          'Check whether the neighbour v has already been discovered',
          'Record dist[v] = dist[u] + 1 and parent[v] = u',
          'Mark v as discovered and enqueue it',
        ],
        explanation:
          'The order matters in one specific place: marking and enqueueing must happen together, at discovery. Deferring the mark until v is dequeued lets several frontier vertices push the same v.',
      },
      {
        id: 'DSA-013-q4',
        type: 'truefalse',
        concept: 'weighted graphs',
        prompt: 'BFS returns the cheapest route in a graph whose edges carry travel times.',
        answer: false,
        explanation:
          'BFS minimises the number of edges, not their total weight, so it will happily prefer two slow edges over three fast ones. Weighted shortest paths need Dijkstra with a priority queue, or Bellman-Ford if weights may be negative.',
      },
      {
        id: 'DSA-013-q5',
        type: 'debug',
        language: 'python',
        concept: 'queue implementation',
        prompt: 'This BFS gives the right answers but runs far slower than O(V + E) on large graphs. Why?',
        code: `q = [start]
while q:
    u = q.pop(0)
    for v in adj[u]:
        if v not in seen:
            seen.add(v); q.append(v)`,
        options: [
          'list.pop(0) is O(n) because every remaining element shifts left; use collections.deque and popleft()',
          '`seen` should be a list rather than a set',
          'The neighbours must be sorted before they are appended',
          'The distance map is missing, which changes the complexity',
        ],
        answerIndex: 0,
        explanation:
          'Removing from the front of a Python list re-indexes the whole list, so each pop costs O(n) and the traversal degrades to O(V^2 + E). deque.popleft() is O(1) because a deque is a doubly linked list of blocks.',
      },
      {
        id: 'DSA-013-q6',
        type: 'explain',
        concept: 'correctness of BFS',
        prompt: 'Explain why the first time BFS reaches a vertex, it has reached it by a shortest path.',
        rubric: [
          'States the queue invariant: only two consecutive levels are ever in the queue, so dequeue order is non-decreasing in distance',
          'Argues that a shorter path would have a predecessor at a smaller distance, which would have been expanded first and discovered the vertex earlier',
          'Notes that this is why re-discovery can be skipped outright, and that the guarantee is specific to unit edge weights',
        ],
        sampleAnswer:
          'BFS processes vertices in non-decreasing order of distance from the source, because a vertex at distance k only ever appends vertices at distance k + 1 to the back of the queue, so the queue holds a block of level-k vertices followed by a block of level-(k + 1) vertices and nothing else. Now suppose some vertex v were first discovered at distance d but actually had a path of length m < d. That path\'s second-to-last vertex sits at distance at most m - 1, which is smaller than d - 1, so it would have been dequeued before the vertex that actually discovered v, and when it was expanded it would have discovered v then — giving v a distance of at most m, contradicting the assumption. Hence first arrival is shortest arrival, and that is exactly why the algorithm can skip an already-seen vertex without comparing anything. The argument leans entirely on every edge costing the same; with weights, dequeue order stops tracking cost and you need a priority queue.',
      },
    ],

    flashcards: [
      { front: 'Which data structure makes a traversal breadth-first?', back: 'A FIFO queue (collections.deque). It expands the oldest discovered vertex, so the search moves outwards one complete ring at a time.' },
      { front: 'Time and space complexity of BFS on an adjacency list?', back: 'O(V + E) time — each vertex enqueued once, each edge inspected once per endpoint — and O(V) space for the queue, visited set, distance map and parent map.' },
      { front: 'When must a vertex be marked as visited?', back: 'At discovery, in the same step as the enqueue. Marking on dequeue lets several frontier vertices push the same vertex, inflating the queue to O(E).' },
      { front: 'What does BFS guarantee that DFS does not?', back: 'That the first time it reaches a vertex is by a path with the fewest edges — shortest paths in an unweighted graph, plus the level structure.' },
      { front: 'How do you recover the actual shortest path, not just its length?', back: 'Store parent[v] = u when v is discovered from u, then walk parent backwards from the target to the source and reverse the list.' },
      { front: 'What is multi-source BFS?', back: 'Seeding the queue with several vertices all at distance 0, which computes the distance to the nearest source for every vertex in one O(V + E) pass.' },
    ],

    challenge: {
      title: 'Shortest chain of shared authors',
      brief:
        'Given a list of papers, each with a list of authors, build the co-authorship graph — two researchers are adjacent if they appear on a paper together — and write a function that returns the shortest chain of collaborators connecting two named researchers, or None if no chain exists. Report both the chain and its length, and make it work on a file of a hundred thousand papers without materialising the edge list twice.',
      acceptanceCriteria: [
        'Builds an adjacency structure in O(sum of squared author-list lengths) and documents why a paper with k authors contributes k(k-1)/2 edges',
        'Uses collections.deque and marks vertices on enqueue, not on dequeue',
        'Returns the actual chain via a parent map, with the endpoints included, and None for unreachable pairs',
        'Handles the trivial case where the two names are the same, and the case where a name is absent from the graph, without raising',
        'Includes a test asserting the chain length equals the BFS distance and that every consecutive pair in the chain really is adjacent',
      ],
      starterCode: 'from collections import defaultdict, deque\n\ndef build_coauthor_graph(papers):\n    """papers: list[list[str]] of author names. Returns dict[str, set[str]]."""\n    adj = defaultdict(set)\n    ...\n\ndef shortest_chain(adj, a, b):\n    """Return the shortest list of names from a to b inclusive, or None."""\n    ...\n',
      language: 'python',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how breadth-first search works, why it finds shortest paths, and when it is the wrong tool.',
      mustCover: [
        'BFS uses a FIFO queue and expands the graph one complete ring of equal distance at a time',
        'Vertices must be marked visited at discovery, when they are enqueued, or the queue fills with duplicates',
        'First arrival is shortest arrival, which is what makes BFS a shortest-path algorithm on unweighted graphs',
        'The cost is O(V + E) time and O(V) space, with the frontier being the real memory constraint',
        'With edge weights the guarantee fails and you need Dijkstra with a priority queue instead',
      ],
      bonusSignals: [
        'reconstructs the path from a parent map rather than only reporting a distance',
        'mentions multi-source BFS or bidirectional search',
        'notes that BFS is Dijkstra specialised to unit weights',
        'explains that the frontier can grow like b^d, which is what forces hop limits in practice',
      ],
      sampleExplanation:
        'Breadth-first search explores a network the way a ripple crosses a pond. You begin at one point and look at everything one step away, then everything two steps away, and so on, finishing each ring completely before starting the next. The machinery is a queue, which hands things back in the order they arrived, plus a set of everything already seen so you never revisit. The moment you first write something into that set, you also record how far away it is and which neighbour you came from. Those two notes are the whole payoff: because the rings come out in order, the first time you touch a place you have arrived by the fewest possible steps, so there is no need to compare routes at all — and following the "who found me" notes backwards reconstructs the route itself. The cost is one visit per node and one look per connection, which is as cheap as reading the network. Two cautions matter. Mark a node as seen the instant you queue it, not when you get round to it, otherwise several neighbours will queue the same node and the queue balloons. And if the connections have costs rather than all being equal — travel times, prices — the guarantee evaporates, because now fewest steps is not cheapest, and you need a priority queue that orders by accumulated cost instead.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
  {
    id: 'DSA-014',
    domain: 'DSA',
    module: 'Graphs',
    topic: 'Depth-first traversal, cycles and ordering',
    title: 'Depth-First Search',
    slug: 'depth-first-search',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DSA-012', 'DSA-013'],
    related: ['DSA-006', 'DSA-009', 'DSA-013'],
    tags: ['dfs', 'graph', 'stack', 'recursion', 'cycle-detection', 'topological-sort', 'components'],

    learningObjectives: [
      'Run depth-first search by hand, recording both the preorder (when a vertex is entered) and the postorder (when it is finished), and say why the second is the more useful of the two',
      'Write DFS both recursively and iteratively with an explicit stack, and explain exactly why the iterative version must push neighbours in reverse to match the recursion',
      'Detect a cycle in an undirected graph using the parent check, and in a directed graph using three colours, and explain why the undirected rule is wrong for directed graphs',
      'Produce a topological order of a DAG as the reverse of DFS finishing times, and justify why that works',
      'Count connected components, and state the O(V + E) time and O(V) space costs including the recursion stack',
    ],

    terminology: [
      {
        term: 'Preorder and postorder',
        definition:
          'Preorder is the sequence of vertices in the order they are first entered; postorder is the order in which their recursive calls finish, after all descendants are done. Most of DFS\'s power lives in the postorder.',
        simple: 'When you walked in, versus when you finally walked back out.',
      },
      {
        term: 'Back edge',
        definition:
          'An edge from the vertex currently being explored to one of its own ancestors in the DFS tree — a vertex that has been entered but not yet finished. A back edge is precisely a cycle.',
        simple: 'A door that leads back into a room you are still standing in.',
      },
      {
        term: 'White / grey / black colouring',
        definition:
          'Undiscovered, on the current recursion stack, and fully finished. Meeting a grey vertex means a cycle; meeting a black one means a vertex already fully explored and is harmless.',
        simple: 'Not visited yet, being visited right now, done with.',
      },
      {
        term: 'Topological order',
        definition:
          'A linear ordering of a DAG\'s vertices in which every edge points forwards. It exists if and only if the graph has no cycle, and the reverse of DFS postorder is always one.',
        simple: 'A to-do list where nothing appears before something it depends on.',
      },
      {
        term: 'Connected component',
        definition:
          'A maximal set of vertices mutually reachable by paths. One traversal explores exactly one component, so counting components means looping over all vertices and starting a fresh traversal from each unvisited one.',
        simple: 'An island of things joined to each other but to nothing else.',
      },
    ],

    simpleExplanation:
      'Depth-first search is how most people actually explore a maze: pick a corridor, follow it as far as it goes, and only when you hit a dead end do you back up to the last junction and try a different turn. That single habit — go deep first, retreat only when stuck — gives an algorithm with a completely different character from breadth-first search, which spreads out evenly in all directions. Because retreating happens exactly when a subtree is finished, DFS naturally knows two things about every vertex: when it went in, and when it came out. The going-in order tells you little, but the coming-out order is enormously useful. If you meet a door leading back into a room you are still inside, you have found a loop. If you list rooms in the order you finally leave them and then reverse that list, you get a valid order for tasks that depend on each other. And the code is often three lines, because the call stack already is the stack you would otherwise have to write by hand. The price is that DFS makes no promise about distance: the first route it finds to a place is frequently a ridiculous scenic detour.',

    whyItExists:
      'Some graph questions are not about distance at all: does this dependency graph contain a cycle, in what order can these build steps run, which records belong to the same cluster, is this edge critical to connectivity? Those are all statements about the structure of exploration — about ancestry and finishing order — and depth-first search is the traversal that exposes them, at the same O(V + E) cost as BFS but with O(depth) frontier memory instead of O(width).',

    analogy: {
      scenario:
        'You are exploring a cave system with a ball of string. You tie one end at the entrance and walk down the first passage you find, unspooling as you go. At each junction you take the first unexplored branch. When a passage dead-ends, or opens into a chamber you have already chalked, you reel the string back to the last junction and take the next branch there. Two things fall out of this without any extra effort. If you ever find a passage that opens into a chamber your own string is currently running through, you have proved the cave has a loop. And if you write down each chamber\'s name at the moment you finally reel out of it for good, you have a list in which every chamber appears only after everything reachable beyond it.',
      mapping: [
        { from: 'The unspooled string', to: 'The recursion stack — the path of grey, currently-open vertices from the root to where you are' },
        { from: 'Chalking a chamber on first entry', to: 'Marking a vertex discovered, giving the preorder' },
        { from: 'Reeling back out of a chamber for good', to: 'Finishing a vertex, giving the postorder' },
        { from: 'A passage into a chamber your own string runs through', to: 'A back edge, which is exactly a cycle' },
        { from: 'A passage into a chamber already chalked and left behind', to: 'A forward or cross edge, which is harmless and proves nothing' },
        { from: 'Reversing the list of exit times', to: 'Topological order of a DAG' },
      ],
      bridge:
        'The distinction between "a chamber your string currently runs through" and "a chamber you finished with earlier" is the entire cycle-detection algorithm, and it is why a single visited set is not enough for directed graphs: you need three states, not two. Grey means on the stack — an ancestor — and only an edge to grey is a cycle. Black means explored and exited, and an edge to black in a directed graph is perfectly legal, which is the case a two-state implementation gets wrong by reporting a cycle that is not there.',
      limitations:
        'A real caver can see several passages at once and choose sensibly; DFS is blind and takes the first branch in whatever order the adjacency list happens to be in, which is why its answers about routes are arbitrary. The string is also a finite resource: in code it is the call stack, and a path of ten thousand vertices in CPython raises RecursionError long before memory runs out.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'DFS plunging and backtracking',
        caption: 'Run DFS and BFS on the same graph from the same source and compare the visit orders side by side.',
        widget: 'graph-traversal',
        props: { mode: 'dfs', start: 'A', compareWith: 'bfs' },
      },
      {
        kind: 'ascii',
        title: 'The same six-node graph, seen by DFS from A',
        caption: 'Preorder A, B, C, F, E, D. Postorder F, C, D, E, B, A. The edge D-A is a back edge: it closes the cycle A-B-E-D-A.',
        art: `   DFS tree (solid) and the one back edge (dotted)

        A
        |
        B
       / \\
      C   E
      |   |
      F   D ....... back to A  (cycle A-B-E-D-A)

   graph edges: A-B, A-D, B-C, B-E, C-F, D-E
   BFS from A:  A B D C E F   (D is 1 hop away)
   DFS from A:  A B C F E D   (D is visited last, via a 3-edge detour)`,
      },
      {
        kind: 'compare',
        title: 'BFS and DFS on the same graph, side by side',
        caption: 'Identical asymptotics, opposite personalities. The only code difference is queue versus stack.',
        left: {
          heading: 'BFS — queue, breadth',
          points: [
            'Visit order from A: A, B, D, C, E, F',
            'Finds D at distance 1, its true shortest distance',
            'Memory is the frontier width, up to O(V)',
            'Answers: shortest hops, levels, bipartiteness, nearest source',
          ],
        },
        right: {
          heading: 'DFS — stack, depth',
          points: [
            'Visit order from A: A, B, C, F, E, D',
            'Reaches D last, along a three-edge detour A-B-E-D',
            'Memory is the current path depth, O(depth) — far smaller on wide graphs',
            'Answers: cycles, topological order, components, bridges and articulation points, strongly connected components',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'DFS with three colours',
        caption: 'The colouring is what makes cycle detection correct in a directed graph.',
        steps: [
          { label: 'Enter u: paint it grey', detail: 'Grey means "on the current recursion stack". Append u to the preorder list.' },
          { label: 'Look at each neighbour v', detail: 'Three cases, and only three. The whole algorithm is deciding between them.' },
          { label: 'v is white', detail: 'Undiscovered: recurse into it. This edge becomes a tree edge of the DFS forest.' },
          { label: 'v is grey', detail: 'v is an ancestor still open on the stack, so the edge u -> v is a back edge and the graph has a cycle. In an undirected graph, exclude the immediate parent, because u-v and v-u are the same edge.' },
          { label: 'v is black', detail: 'Already finished. Ignore it: in a directed graph this is a forward or cross edge and proves nothing about cycles.' },
          { label: 'Leave u: paint it black', detail: 'All descendants are done. Append u to the postorder list. Reversed postorder is a topological order when the graph is acyclic.' },
        ],
        branching: true,
      },
      {
        kind: 'table',
        title: 'What each edge classification tells you',
        caption: 'Classification is relative to the DFS tree being built, and is the basis of most advanced graph algorithms.',
        columns: ['Edge type', 'Target colour when seen', 'Meaning', 'Used for'],
        rows: [
          ['Tree edge', 'White', 'The edge that first discovers the target', 'Building the DFS forest, counting components'],
          ['Back edge', 'Grey', 'Points to an ancestor still on the stack', 'Cycle detection; its absence proves a DAG'],
          ['Forward edge', 'Black, a descendant', 'Points to an already-finished descendant', 'Only meaningful in directed graphs; harmless'],
          ['Cross edge', 'Black, not a descendant', 'Points into a finished sibling subtree', 'Appears in directed graphs and between components'],
        ],
      },
    ],

    formalDefinition:
      'Depth-first search explores a graph by recursively visiting an undiscovered neighbour of the current vertex before considering the current vertex\'s remaining neighbours, backtracking when no undiscovered neighbour remains. It assigns each vertex a discovery time and a finishing time, and the intervals [discovery, finishing] of two vertices are either disjoint or nested — the parenthesis theorem — so that v is a descendant of u in the DFS forest exactly when v\'s interval is nested inside u\'s. An edge (u, v) encountered while v is still open (grey) is a back edge, and a directed graph is acyclic if and only if a DFS of it produces no back edge; in that case the reverse order of finishing times is a topological order. DFS runs in O(|V| + |E|) time with an adjacency list and uses O(|V|) space in the worst case, dominated by the recursion stack whose depth is the length of the longest path explored.',

    math: {
      intuition:
        'DFS costs exactly what BFS costs — each vertex is opened once and each edge is examined once from each endpoint — but it spends its memory differently. BFS holds a whole level, which on a wide graph is enormous; DFS holds one root-to-current path, which on a wide, shallow graph is tiny and on a long, thin graph is the whole graph. The subtler mathematical content is the parenthesis theorem, which says the open and close times nest like brackets, and that is what licenses reading ancestry, cycles and topological order straight off the finishing times.',
      formulas: [
        {
          latex: 'T(V, E) = O\\big(|V| + |E|\\big), \\qquad S = O(\\text{longest path}) \\le O(|V|)',
          name: 'Cost of DFS',
          meaning: 'Same time bound as BFS; space is the depth of the recursion, not the width of a frontier.',
          category: 'complexity',
          variables: [
            { symbol: '|V|', meaning: 'Vertices, each opened and closed exactly once' },
            { symbol: '|E|', meaning: 'Edges, each inspected once per endpoint' },
          ],
        },
        {
          latex: 'u \\text{ is an ancestor of } v \\iff d(u) < d(v) < f(v) < f(u)',
          name: 'Parenthesis theorem',
          meaning: 'Discovery and finishing times nest like well-formed brackets, so ancestry is a pure interval containment test — the basis for classifying edges.',
          category: 'complexity',
          variables: [
            { symbol: 'd(u)', meaning: 'Discovery time: when u is painted grey' },
            { symbol: 'f(u)', meaning: 'Finishing time: when u is painted black' },
          ],
        },
        {
          latex: 'G \\text{ is a DAG} \\iff \\text{DFS}(G) \\text{ produces no back edge}',
          name: 'Acyclicity test',
          meaning: 'One traversal decides acyclicity; a back edge u -> v exhibits the cycle explicitly as the tree path from v down to u plus that edge.',
          category: 'complexity',
          variables: [
            { symbol: 'G', meaning: 'A directed graph' },
          ],
        },
        {
          latex: '(u, v) \\in E \\implies f(u) > f(v) \\quad \\text{in a DAG}',
          name: 'Why reverse postorder is topological',
          meaning: 'Every edge in a DAG goes from a later-finishing vertex to an earlier-finishing one, so sorting by decreasing finishing time puts every vertex before its successors.',
          category: 'complexity',
          variables: [
            { symbol: 'f(u)', meaning: 'Finishing time of the source of the edge' },
            { symbol: 'f(v)', meaning: 'Finishing time of the target' },
          ],
        },
      ],
      derivation: [
        'Take any edge (u, v) in a DAG and consider the colour of v when the edge is examined, while u is grey.',
        'If v is white, DFS recurses into v, so v finishes before u returns: f(v) < f(u).',
        'If v is black, v finished before the edge was even looked at, so again f(v) < f(u).',
        'If v were grey, it would be an ancestor of u still on the stack, and the edge u -> v would close a cycle — impossible in a DAG.',
        'So for every edge f(u) > f(v), without exception.',
        'Listing vertices in decreasing finishing time therefore places the source of every edge before its target, which is the definition of a topological order.',
        'Since postorder appends vertices in increasing finishing time, reversing the postorder list is exactly that ordering, obtained in one O(V + E) traversal with no sorting step.',
      ],
    },

    workedExample: {
      title: 'DFS by hand on the same six-node graph, and the contrast with BFS',
      setup:
        'The identical graph and adjacency order as the BFS unit: A: [B, D], B: [A, C, E], C: [B, F], D: [A, E], E: [B, D], F: [C]. Start at A, take neighbours in the listed order, and record a preorder, a postorder and the recursion stack at each step. The point of reusing the graph is that every difference in the output is caused by the queue becoming a stack, and nothing else.',
      steps: [
        {
          label: 'Enter A',
          detail: 'stack = [A]; preorder = [A]. A\'s neighbours are B then D. Take B first.',
        },
        {
          label: 'Enter B from A',
          detail: 'stack = [A, B]; preorder = [A, B]. B\'s neighbours are A, C, E. A is grey — it is B\'s parent, and in an undirected graph the edge back to your parent is the same edge you arrived on, so it is skipped rather than reported as a cycle. Next is C.',
        },
        {
          label: 'Enter C from B',
          detail: 'stack = [A, B, C]; preorder = [A, B, C]. Neighbours are B (grey, the parent — skip) and F.',
        },
        {
          label: 'Enter F from C',
          detail: 'stack = [A, B, C, F]; preorder = [A, B, C, F]. F\'s only neighbour is C, its parent. Nothing left: F is a dead end.',
        },
        {
          label: 'Finish F, finish C',
          detail: 'F goes black; postorder = [F]. Control returns to C, whose neighbour list is exhausted, so C goes black; postorder = [F, C]. stack = [A, B]. This retreat is the backtracking that gives the algorithm its shape.',
        },
        {
          label: 'Enter E from B',
          detail: 'Back in B, the next unexplored neighbour is E. stack = [A, B, E]; preorder = [A, B, C, F, E]. E\'s neighbours are B (parent, skip) and D.',
        },
        {
          label: 'Enter D from E — and find the cycle',
          detail: 'stack = [A, B, E, D]; preorder = [A, B, C, F, E, D]. D\'s neighbours are A and E. E is the parent, skipped. A is grey and is not D\'s parent, so the edge D-A is a back edge, and it exhibits the cycle explicitly: read the stack from A down to D and add the edge, giving A-B-E-D-A.',
        },
        {
          label: 'Unwind',
          detail: 'D has nothing left, so it goes black; postorder = [F, C, D]. E finishes; postorder = [F, C, D, E]. B finishes; postorder = [F, C, D, E, B]. Back at A, the remaining neighbour D is already black, so it is ignored, and A finishes.',
        },
        {
          label: 'Read off the result',
          detail: 'Preorder: A, B, C, F, E, D. Postorder: F, C, D, E, B, A. One traversal, six vertices, every vertex reached — so the graph is connected — and one back edge, so it has a cycle.',
        },
        {
          label: 'Contrast with BFS directly',
          detail: 'BFS from A gave A, B, D, C, E, F with D at distance 1. DFS reaches D last, by the three-edge route A-B-E-D, and would report that route if you asked it for a path. Identical graph, identical start, identical O(V + E) cost — the queue-to-stack swap is the only change, and it costs the shortest-path guarantee entirely.',
          latex: '\\text{BFS: } A,B,D,C,E,F \\quad\\text{vs}\\quad \\text{DFS: } A,B,C,F,E,D',
        },
        {
          label: 'Peak memory',
          detail: 'The DFS stack peaked at four entries (A, B, E, D); the BFS queue peaked at three. On this tiny graph that is noise, but the asymptotics differ in kind: DFS is bounded by the longest path and BFS by the widest level, which is why BFS drowns on a high-branching state space and DFS drowns on a long chain.',
        },
        {
          label: 'Now make it a DAG and sort it',
          detail: 'On the directed pipeline ingest -> clean -> {features, validate} -> train -> evaluate, DFS from ingest finishes evaluate, train, features, then validate, clean and ingest. Reversing that postorder gives ingest, clean, validate, features, train, evaluate — a valid execution order, produced by one traversal with no sorting step anywhere.',
        },
      ],
      conclusion:
        'DFS costs O(V + E) time — six vertex opens plus twelve directed neighbour inspections, exactly as for BFS — and O(depth) space, four stack frames here against a worst case of O(V) on a path graph. What it buys for that identical price is structural information BFS does not produce: the back edge D-A proves a cycle and names it, the postorder reversed gives a topological order on a DAG, and an outer loop over unvisited vertices counts connected components. What it gives up is distance. D is one hop from A and DFS reports a three-hop route, so any question phrased as "fewest" or "nearest" belongs to BFS, and any question phrased as "is there a cycle", "in what order", or "which cluster" belongs to DFS.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Recursive and iterative DFS, and why the iterative version reverses',
        runnable: true,
        code: `adj = {"A": ["B", "D"], "B": ["A", "C", "E"], "C": ["B", "F"],
       "D": ["A", "E"], "E": ["B", "D"], "F": ["C"]}

def dfs(adj, start):
    seen, pre, post = set(), [], []
    def visit(u):
        seen.add(u)
        pre.append(u)
        for v in adj[u]:
            if v not in seen:
                visit(v)
        post.append(u)          # everything below u is finished
    visit(start)
    return pre, post

pre, post = dfs(adj, "A")
print("preorder :", pre)
print("postorder:", post)

def dfs_iterative(adj, start):
    seen, order, stack = set(), [], [start]
    while stack:
        u = stack.pop()
        if u in seen:           # a vertex can be stacked twice before it is popped
            continue
        seen.add(u)
        order.append(u)
        for v in reversed(adj[u]):     # reversed => same order as the recursion
            if v not in seen:
                stack.append(v)
    return order

print("iterative:", dfs_iterative(adj, "A"))`,
        output: `preorder : ['A', 'B', 'C', 'F', 'E', 'D']
postorder: ['F', 'C', 'D', 'E', 'B', 'A']
iterative: ['A', 'B', 'C', 'F', 'E', 'D']`,
        explanation:
          'Two details separate a working iterative DFS from a broken one. First, neighbours are pushed in reverse, because a stack returns the last pushed item first and the recursion takes the first neighbour first; without reversed() the traversal is still a valid DFS but visits a different order, which breaks any test asserting on the sequence. Second, the seen check must be repeated after popping, not only before pushing: the same vertex can be pushed by two different neighbours before either pop happens, so the pre-push filter is an optimisation and the post-pop filter is the correctness guard. The recursive version needs neither because the call stack cannot contain a duplicate of a vertex already marked.',
      },
      {
        language: 'python',
        title: 'Counting connected components',
        runnable: true,
        code: `adj = {"A": ["B", "D"], "B": ["A", "C", "E"], "C": ["B", "F"],
       "D": ["A", "E"], "E": ["B", "D"], "F": ["C"],
       "G": ["H"], "H": ["G"]}          # a second, disconnected island

def components(adj):
    seen, comps = set(), []
    for s in adj:                        # the outer loop is not optional
        if s in seen:
            continue
        stack, comp = [s], []
        seen.add(s)
        while stack:
            u = stack.pop()
            comp.append(u)
            for v in adj[u]:
                if v not in seen:
                    seen.add(v)
                    stack.append(v)
        comps.append(sorted(comp))
    return comps

print(components(adj))
print("component count:", len(components(adj)))`,
        output: `[['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H']]
component count: 2`,
        explanation:
          'The outer loop over every vertex is what turns a single traversal into a component count: one DFS only ever reaches one component, so starting from an arbitrary vertex and stopping answers a different question. The total cost is still O(V + E), not O(V) traversals of O(V + E) each, because the shared seen set means each vertex and edge is touched exactly once across all the inner traversals combined. This is the algorithm behind "number of islands", friend-circle counting, and deduplicating records that match transitively — A matches B, B matches C, so all three are one entity even though A and C never matched directly.',
      },
      {
        language: 'python',
        title: 'Cycle detection: the parent rule for undirected, three colours for directed',
        runnable: true,
        code: `def has_cycle_undirected(adj):
    seen = set()
    def visit(u, parent):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                if visit(v, u):
                    return True
            elif v != parent:      # a seen, non-parent neighbour closes a cycle
                print(f"  back edge {u}-{v} closes a cycle")
                return True
        return False
    return any(visit(s, None) for s in adj if s not in seen)

adj = {"A": ["B", "D"], "B": ["A", "C", "E"], "C": ["B", "F"],
       "D": ["A", "E"], "E": ["B", "D"], "F": ["C"]}
tree = {"A": ["B", "C"], "B": ["A"], "C": ["A", "D"], "D": ["C"]}
print("cycle in the 6-node graph:", has_cycle_undirected(adj))
print("cycle in a tree:", has_cycle_undirected(tree))`,
        output: `  back edge D-A closes a cycle
cycle in the 6-node graph: True
cycle in a tree: False`,
        explanation:
          'In an undirected graph every edge appears in both adjacency lists, so arriving at B from A and then seeing A again is not a cycle — it is the same edge looked at from the other end. Excluding the immediate parent fixes that, and any other already-seen neighbour genuinely closes a loop. Note the rule is wrong in two situations: a directed graph, where an edge to a finished vertex is legal and the parent exclusion would hide real cycles, and an undirected multigraph with two parallel edges between the same pair, which is a cycle that the parent check silently forgives unless you track edge identity rather than vertex identity.',
      },
      {
        language: 'python',
        title: 'Topological sort of a pipeline DAG, and what a cycle looks like',
        runnable: true,
        code: `pipeline = {"ingest": ["clean"], "clean": ["features", "validate"],
            "features": ["train"], "validate": ["train"],
            "train": ["evaluate"], "evaluate": []}

WHITE, GREY, BLACK = 0, 1, 2

def topo_sort(graph):
    colour = {v: WHITE for v in graph}
    out = []
    def visit(u):
        colour[u] = GREY                       # on the stack
        for v in graph[u]:
            if colour[v] == GREY:
                raise ValueError(f"cycle: {u} -> {v} is a back edge")
            if colour[v] == WHITE:
                visit(v)
        colour[u] = BLACK
        out.append(u)                          # postorder
    for v in graph:
        if colour[v] == WHITE:
            visit(v)
    return out[::-1]                           # reverse postorder

print("topological order:", topo_sort(pipeline))

pipeline["evaluate"] = ["clean"]               # someone wires a feedback edge
try:
    topo_sort(pipeline)
except ValueError as e:
    print("ValueError:", e)`,
        output: `topological order: ['ingest', 'clean', 'validate', 'features', 'train', 'evaluate']
ValueError: cycle: evaluate -> clean is a back edge`,
        explanation:
          'Three colours rather than a boolean visited flag is the whole point. Grey means the vertex is an open ancestor on the current stack, so an edge into grey is a back edge and a genuine cycle; black means finished, and an edge into black is a perfectly legal shortcut in a DAG — a two-state implementation would report that as a cycle and refuse a valid pipeline. Reverse postorder needs no sorting step because finishing times already encode the constraint: every edge in a DAG runs from a later-finishing vertex to an earlier-finishing one. Kahn\'s algorithm, which repeatedly removes in-degree-zero vertices from a queue, computes the same thing iteratively and is preferable when the graph is deep enough to overflow the recursion limit.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Build systems, schedulers and autograd',
        usage:
          'Make, Bazel, Airflow and PyTorch all topologically sort a dependency DAG before executing it, and all report a cycle as an error rather than looping forever. PyTorch\'s backward pass walks the computation graph in reverse topological order, which is why an in-place operation that creates a cycle produces a runtime error rather than wrong gradients.',
      },
      {
        context: 'Entity resolution and transitive deduplication',
        usage:
          'When fuzzy matching says record A resembles B and B resembles C, the true clusters are the connected components of the match graph. A DFS or union-find pass over the pairwise matches collapses them into entities, and the component count is the deduplicated row count.',
      },
      {
        context: 'Import-cycle and package-dependency analysis',
        usage:
          'Python\'s circular-import failures, npm\'s dependency resolution and linting rules such as import/no-cycle are all DFS back-edge detection over a module graph. The error message naming a chain of files is literally the grey stack at the moment the back edge was found.',
      },
      {
        context: 'Knowledge-graph reasoning over paths',
        usage:
          'Multi-hop question answering enumerates candidate reasoning chains — entity to relation to entity — with a depth-bounded DFS, because the question is which chain of facts supports an answer rather than how far away something is. Depth bounding is essential: an unbounded DFS on a dense knowledge graph never returns.',
      },
    ],

    projectConnections: [
      { tool: 'networkx', role: 'dfs_preorder_nodes, find_cycle, topological_sort, connected_components and strongly_connected_components are all DFS with the bookkeeping done for you.' },
      { tool: 'Apache Airflow', role: 'Validates that a DAG really is acyclic at parse time and derives task execution order from a topological sort of the dependency graph.' },
      { tool: 'PyTorch autograd', role: 'Builds a DAG of operations in the forward pass and traverses it in reverse topological order during backward, which is why every op must be recorded on the way in.' },
      { tool: 'sys.setrecursionlimit', role: 'The lever you reach for when a recursive DFS on a deep graph raises RecursionError — although converting to an explicit stack is the more honest fix.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a two-state visited set to detect cycles in a directed graph',
        why: 'A vertex reachable by two different paths is seen twice legitimately — that is a diamond, not a cycle. A boolean flag cannot distinguish "ancestor still on the stack" from "finished long ago", so the code reports cycles in perfectly valid DAGs.',
        fix: 'Use three colours: white, grey (on the stack), black (finished). Only an edge into grey is a back edge. Remember to repaint to black on the way out.',
      },
      {
        mistake: 'Applying the undirected parent check to a directed graph',
        why: 'In a directed graph u -> v does not imply v -> u, so excluding the parent hides real two-cycles and mislabels legal cross edges. The rule exists only because undirected edges appear in both adjacency lists.',
        fix: 'Keep the parent exclusion for undirected graphs and the three-colour rule for directed ones, and never mix them. Write down which kind of graph the function expects.',
      },
      {
        mistake: 'Recursing on a deep graph in CPython',
        why: 'The default recursion limit is 1000 frames, so a path of a few thousand vertices — a long chain of dependencies, a linked-list-shaped graph, a deep filesystem tree — raises RecursionError, often in production on the one large input.',
        fix: 'Convert to an explicit stack, or raise sys.setrecursionlimit and the thread stack size together. An iterative DFS with the post-pop visited check is the robust choice for graphs of unknown depth.',
      },
      {
        mistake: 'Expecting DFS to return a short path',
        why: 'DFS returns the first path it stumbles on, which is determined by adjacency-list order, not by length. It found D at distance three in a graph where D is one hop from the source.',
        fix: 'Use BFS for fewest hops and Dijkstra for least cost. DFS is for cycles, ordering, components and connectivity structure.',
      },
      {
        mistake: 'Forgetting the outer loop over unvisited vertices',
        why: 'One traversal explores exactly one component, so a disconnected graph is silently half-analysed: components go uncounted and cycles in the unvisited part go undetected.',
        fix: 'Wrap the traversal in a loop over all vertices, starting a new DFS from each still-white one. The shared colour map keeps the total cost at O(V + E).',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'How do you detect a cycle in a directed graph, and why is a plain visited set not enough?',
        answer:
          'Run DFS with three states per vertex: white for undiscovered, grey for on the current recursion stack, black for finished. When examining an edge u -> v while u is grey, an edge into a grey vertex is a back edge and proves a cycle, because grey means v is an ancestor of u that is still open, so there is a tree path from v down to u and this edge closes it. An edge into black is a forward or cross edge and is entirely legal in a DAG. That last case is exactly what a plain boolean visited set gets wrong: with two states you cannot tell an ancestor from a vertex that was finished ten calls ago, so a diamond — A pointing to both B and C, each pointing to D — reports a cycle that does not exist. The cost is one traversal, O(V + E) time and O(V) space, and the grey stack at the moment of detection is the cycle itself, which is what makes a useful error message. Kahn\'s algorithm is the iterative alternative: repeatedly remove vertices with in-degree zero, and if any remain, they form a cycle.',
        followUp:
          'Being asked how to report the cycle and not just its existence tests whether the candidate realises the grey path on the stack is the answer.',
      },
      {
        level: 'intermediate',
        question: 'Why does reversing DFS postorder produce a topological order?',
        answer:
          'Take any edge u -> v in a DAG and look at v\'s colour when DFS examines that edge, with u grey. If v is white, DFS recurses into it, so v finishes before u does. If v is black, it finished even earlier. And v cannot be grey, because that would be a back edge and the graph is acyclic by assumption. So in every case f(u) > f(v): the finishing time of the source exceeds the finishing time of the target, for every edge without exception. Listing vertices in decreasing finishing time therefore places each vertex ahead of everything it points to, which is the definition of a topological order. Postorder appends vertices in increasing finishing time, so reversing it is exactly that list, obtained from a single O(V + E) traversal with no comparison sort involved. In practice I would use Kahn\'s in-degree algorithm if I also wanted a deterministic tie-break or needed to avoid recursion depth limits on a deep graph, and either way I would validate acyclicity rather than assume it.',
        followUp:
          'A strong candidate notes that topological order is generally not unique and says which tie-break their implementation produces.',
      },
      {
        level: 'ml-engineer',
        question: 'You have 40 million fuzzy-matched record pairs and need to collapse them into entities. How do you do it, and what is the risk?',
        answer:
          'Build a graph whose vertices are records and whose edges are accepted pairwise matches, then take its connected components — each component is one entity. A DFS or BFS with an outer loop over unvisited vertices does this in O(V + E), and at this scale I would use union-find instead, which is effectively linear, streams the pairs without materialising adjacency lists, and parallelises far better. The real risk is not performance but transitive over-merging: matching is not transitive, so a single weak edge between two genuine clusters collapses them, and one bad threshold can produce a component containing a million records. I would guard against that by monitoring the component size distribution, refusing to merge components above a size cap, and using stronger blocking or a higher match threshold for the edges that join large components. Where accuracy matters most, correlation clustering or looking for bridges — single edges whose removal splits a component — gives a principled way to cut the suspicious links rather than accepting whatever the transitive closure produces.',
        followUp:
          'Mentioning union-find with path compression, and the size-distribution monitor as the practical safety net, distinguishes someone who has run this in production.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write an iterative DFS that returns the preorder in exactly the same sequence as the recursive version, and explain the two places where a naive implementation goes wrong.',
        hint: 'A stack reverses the order you push in, and a vertex can be pushed twice before it is popped once.',
        solution:
          'def dfs_iterative(adj, start):\n    seen, order, stack = set(), [], [start]\n    while stack:\n        u = stack.pop()\n        if u in seen:\n            continue            # guard 1: it may have been stacked twice\n        seen.add(u)\n        order.append(u)\n        for v in reversed(adj[u]):   # guard 2: restore the recursion order\n            if v not in seen:\n                stack.append(v)\n    return order\n\nThe first trap is ordering: the recursion visits adj[u][0] first, but a stack pops the last thing pushed, so pushing in list order visits the last neighbour first. Pushing reversed(adj[u]) restores the recursive sequence. The second is duplication: unlike BFS, the mark cannot be applied at push time if you want to match the recursion, because a vertex may sit on the stack under several entries and should be visited when the deepest branch reaches it. So the post-pop `if u in seen: continue` is the correctness guard, and the pre-push filter is only an optimisation. Cost is unchanged at O(V + E) time and O(V) space, but the iterative version survives graphs deeper than the 1000-frame CPython recursion limit.',
      },
      {
        prompt: 'Given a directed graph of Python module imports, write a function that returns one concrete import cycle as a list of module names, or None if the graph is acyclic.',
        hint: 'The cycle is sitting on the stack at the moment you find the back edge.',
        solution:
          'WHITE, GREY, BLACK = 0, 1, 2\n\ndef find_cycle(graph):\n    colour = {v: WHITE for v in graph}\n    stack = []\n    def visit(u):\n        colour[u] = GREY\n        stack.append(u)\n        for v in graph.get(u, ()):  \n            if colour.get(v, WHITE) == GREY:\n                return stack[stack.index(v):] + [v]\n            if colour.get(v, WHITE) == WHITE:\n                found = visit(v)\n                if found:\n                    return found\n        colour[u] = BLACK\n        stack.pop()\n        return None\n    for v in graph:\n        if colour[v] == WHITE:\n            found = visit(v)\n            if found:\n                return found\n    return None\n\nThe key realisation is that detection and reporting are the same step: when the edge u -> v hits a grey vertex, the portion of the explicit stack from v onwards is precisely the cycle, and appending v again closes it for readability. Using graph.get(v, WHITE) tolerates modules that appear only as import targets and have no entry of their own, which is the usual shape of a scraped import graph. Cost is O(V + E) time and O(V) space. This is exactly the analysis behind the import/no-cycle lint rule, and the message it prints is this list.',
      },
      {
        prompt: 'The same six-node graph gives BFS order A, B, D, C, E, F and DFS order A, B, C, F, E, D from A. Explain precisely which line of code causes the difference, and give one question each traversal answers that the other cannot answer efficiently.',
        hint: 'Both algorithms are identical apart from which end of the pending collection they take from.',
        solution:
          'The difference is a single line: BFS removes from the front of the pending collection (deque.popleft, FIFO) and DFS removes from the back (list.pop, LIFO). Everything else — the visited set, the neighbour loop, the O(V + E) cost — is identical. FIFO makes the pending collection hold at most two consecutive distance levels, which is what forces vertices out in non-decreasing distance and gives the shortest-path guarantee. LIFO makes it hold the current root-to-node path plus pending siblings, which is what makes ancestry, and therefore cycles and finishing order, visible.\n\nOnly BFS answers "what is the fewest number of edges from A to F?" in one pass, because first arrival is shortest arrival; DFS found D by a three-edge detour when D is one hop away. Only DFS answers "does this graph contain a cycle, and what is it?" cheaply, because the cycle is the grey path currently on the stack, a notion BFS simply does not maintain. Topological sorting, articulation points, bridges and strongly connected components all belong to DFS for the same reason; levels, bipartiteness and nearest-source distances belong to BFS.',
      },
    ],

    quiz: [
      {
        id: 'DSA-014-q1',
        type: 'mcq',
        concept: 'cycle detection',
        prompt: 'While running DFS on a directed graph you find an edge pointing to a vertex that is already black (finished). What does this prove?',
        options: [
          'Nothing about cycles — it is a forward or cross edge and is perfectly legal in a DAG',
          'The graph contains a cycle',
          'The graph is disconnected',
          'The traversal has a bug and must restart',
        ],
        answerIndex: 0,
        explanation:
          'Only an edge into a grey vertex — one still open on the recursion stack, hence an ancestor — is a back edge and proves a cycle. Edges into finished vertices happen whenever two paths converge, which is a diamond, not a loop.',
      },
      {
        id: 'DSA-014-q2',
        type: 'order',
        concept: 'topological sort',
        prompt: 'Order these steps of producing a topological order with DFS.',
        items: [
          'Paint the vertex grey when entering it',
          'Recurse into every white neighbour, raising an error on any grey one',
          'Paint the vertex black when all neighbours are exhausted',
          'Append the vertex to the postorder list',
          'Reverse the finished postorder list',
        ],
        explanation:
          'The vertex is appended only after every descendant has finished, so the postorder is in increasing finishing time. Reversing it puts each vertex ahead of everything it points to, which is a topological order.',
      },
      {
        id: 'DSA-014-q3',
        type: 'truefalse',
        concept: 'shortest paths',
        prompt: 'If DFS finds a path from u to v, that path has the fewest possible edges.',
        answer: false,
        explanation:
          'DFS returns the first path it stumbles into, chosen by adjacency-list order. In the worked example it reached D by a three-edge detour when D was one hop from the source. Fewest hops is BFS territory.',
      },
      {
        id: 'DSA-014-q4',
        type: 'code-output',
        language: 'python',
        concept: 'iterative traversal order',
        prompt: 'What does this print, given adj = {"A": ["B", "D"], "B": ["A", "C", "E"], "C": ["B", "F"], "D": ["A", "E"], "E": ["B", "D"], "F": ["C"]}?',
        code: `seen, order, stack = set(), [], ["A"]
while stack:
    u = stack.pop()
    if u in seen:
        continue
    seen.add(u); order.append(u)
    for v in adj[u]:          # NOT reversed
        if v not in seen:
            stack.append(v)
print(order)`,
        options: [
          "['A', 'D', 'E', 'B', 'C', 'F']",
          "['A', 'B', 'C', 'F', 'E', 'D']",
          "['A', 'B', 'D', 'C', 'E', 'F']",
          "['A', 'D', 'B', 'E', 'C', 'F']",
        ],
        answerIndex: 0,
        explanation:
          'Pushing B then D means D is popped first, so the traversal dives A, D, E, then B and onwards — a valid DFS, but the mirror image of the recursive order. Pushing reversed(adj[u]) is what makes the iterative version match the recursion.',
      },
      {
        id: 'DSA-014-q5',
        type: 'fill',
        concept: 'colour states',
        prompt: 'In three-colour DFS, an edge pointing to a ______ vertex is a back edge and proves the graph has a cycle.',
        answers: ['grey', 'gray', 'GREY', 'GRAY'],
        explanation:
          'Grey means the vertex has been entered but not finished, so it is still on the recursion stack and is therefore an ancestor of the current vertex. The tree path from it down to the current vertex, plus this edge, is the cycle.',
      },
      {
        id: 'DSA-014-q6',
        type: 'explain',
        concept: 'BFS versus DFS',
        prompt: 'The only code difference between BFS and DFS is which end of the pending collection you remove from. Explain what that one change buys and what it costs.',
        rubric: [
          'Identifies FIFO versus LIFO as the sole structural difference, with both at O(V + E) time',
          'Explains that FIFO yields non-decreasing distance order and hence shortest paths, while LIFO yields ancestry information and hence cycles, topological order and components',
          'Contrasts the memory profiles: frontier width for BFS against path depth for DFS',
        ],
        sampleAnswer:
          'Swap deque.popleft for list.pop and the traversal changes character completely while its cost does not move: both visit every vertex once and every edge once per endpoint, O(V + E) time. Taking from the front means the pending collection holds at most two adjacent distance levels, so vertices emerge in non-decreasing distance and first arrival is shortest arrival — that is the shortest-path guarantee, plus levels, bipartiteness and nearest-source queries. Taking from the back means the pending collection tracks the current root-to-node path, so the algorithm always knows its own ancestors; an edge into one of them is a cycle, the order in which calls finish gives a topological order on a DAG, and an outer loop over unvisited vertices counts components. The costs mirror each other in memory: BFS holds a whole level, which on a graph with branching factor 100 is hopeless three rings out, while DFS holds one path, which is tiny on a wide graph and fatal on a chain of a million vertices, where CPython raises RecursionError at a thousand frames.',
      },
    ],

    flashcards: [
      { front: 'What is a back edge, and what does it prove?', back: 'An edge to a vertex still open on the recursion stack (grey). It proves the graph contains a cycle, and the grey stack from that vertex onwards is the cycle itself.' },
      { front: 'How do you get a topological order from DFS?', back: 'Take the postorder — vertices appended as their calls finish — and reverse it. Every edge in a DAG runs from a later-finishing vertex to an earlier-finishing one.' },
      { front: 'Why three colours instead of a visited boolean?', back: 'A boolean cannot distinguish an ancestor still on the stack from a vertex finished long ago, so it reports cycles in valid DAGs wherever two paths converge.' },
      { front: 'Why must an iterative DFS push neighbours in reverse?', back: 'A stack returns the last item pushed, while the recursion takes the first neighbour first, so pushing reversed(adj[u]) reproduces the recursive visit order.' },
      { front: 'Time and space cost of DFS?', back: 'O(V + E) time, the same as BFS. Space is O(depth of the deepest path), worst case O(V) — the recursion stack, which is why CPython raises RecursionError past about 1000 frames.' },
      { front: 'Which questions belong to DFS rather than BFS?', back: 'Cycles, topological order, connected and strongly connected components, bridges and articulation points — anything about structure rather than distance.' },
    ],

    challenge: {
      title: 'A dependency checker for a task pipeline',
      brief:
        'Write a small library that takes a dict of task -> list of tasks it depends on and offers three operations: validate (raise with a readable cycle if one exists), order (a valid execution sequence), and levels (groups of tasks that could run in parallel, where every task in group k depends only on tasks in earlier groups). Make the cycle message name the actual chain, not merely the fact of a cycle.',
      acceptanceCriteria: [
        'Uses three-colour DFS and reports a concrete cycle as an ordered list of task names that closes on itself',
        'order() returns reverse postorder and is verified by an assertion that every dependency appears earlier in the list',
        'levels() assigns each task the longest depth from any root, so parallel groups are genuinely safe, and explains why shortest depth would be wrong',
        'Handles tasks that appear only as dependencies and never as keys, without raising KeyError',
        'Does not blow the recursion limit on a chain of 100,000 tasks — either iterative, or with a documented and justified limit change',
      ],
      starterCode: 'class Pipeline:\n    def __init__(self, deps: dict[str, list[str]]):\n        self.deps = deps\n\n    def validate(self) -> None:\n        """Raise ValueError naming the cycle, or return None."""\n        ...\n\n    def order(self) -> list[str]:\n        ...\n\n    def levels(self) -> list[list[str]]:\n        ...\n',
      language: 'python',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how depth-first search works, what it can tell you that breadth-first search cannot, and how it detects cycles.',
      mustCover: [
        'DFS follows one branch to its end and backtracks, using a stack — usually the call stack itself',
        'Every vertex has a time it is entered and a time it is finished, and the finishing order is where the useful information lives',
        'A cycle is an edge to a vertex still open on the stack, which needs three states rather than a visited boolean in a directed graph',
        'Reversing the finishing order gives a topological order of a DAG',
        'The cost is O(V + E) time and O(depth) space, and DFS gives no shortest-path guarantee',
      ],
      bonusSignals: [
        'contrasts the visit order with BFS on the same graph',
        'mentions the parenthesis theorem or interval nesting',
        'notes the CPython recursion limit and the iterative rewrite',
        'connects it to build systems, import cycles or autograd',
      ],
      sampleExplanation:
        'Depth-first search explores the way you would explore a cave with a ball of string: take the first passage you see, keep going until you hit a dead end, then reel back to the last junction and take the next one. In code the string is the call stack, so a recursive version is only a few lines. Two moments matter for each place you visit: when you walk in, and when you finally walk back out for good. The walking-out order is the valuable one. Because you only leave a place after everything beyond it is finished, writing names down as you leave and then reversing the list gives an order in which nothing appears before something it depends on — which is exactly what a build system or a task scheduler needs. Cycles come from the same picture. While you are inside a room, your string is still running through it; if you find a passage leading into a room your own string currently occupies, you have gone in a circle, and the stretch of string from that room to where you stand is the loop. That is why a simple "have I seen this before" flag is not enough in a one-way network: seeing a place you finished with earlier is fine, since two different routes can converge, and only seeing a place you are still inside is a real loop. What DFS cannot tell you is distance. It reports the first route it stumbled on, which may be an absurd detour, so any question about fewest steps belongs to breadth-first search instead.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
  {
    id: 'DSA-015',
    domain: 'DSA',
    module: 'Recursion & Search',
    topic: 'Self-similar problems and systematic search',
    title: 'Recursion and Backtracking',
    slug: 'recursion-and-backtracking',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['DSA-002', 'DSA-014'],
    related: ['DSA-001', 'DSA-009', 'DSA-014'],
    tags: ['recursion', 'backtracking', 'base-case', 'recursion-tree', 'subsets', 'n-queens', 'call-stack'],

    learningObjectives: [
      'Write a recursive function by naming the base case first, then the single step that shrinks the problem, and prove to yourself that the shrinking always terminates',
      'Draw a recursion tree for a small input and read the time complexity off it as nodes times work-per-node, and the space complexity off its depth',
      'Apply the choose / explore / unchoose pattern to enumerate subsets, permutations and other combinatorial spaces without ever copying the partial state',
      'Prune a backtracking search with constraint checks, and quantify the saving against brute force on the N-queens problem',
      'Recognise when recursion is being used for exhaustive search, when it hides overlapping subproblems that memoisation should collapse, and when it is simply a worse loop',
    ],

    terminology: [
      {
        term: 'Base case',
        definition:
          'The input small enough to answer outright, with no further recursive call. Every recursive function needs at least one, and every recursive call must move measurably towards it.',
        simple: 'The size of problem you can just answer, which stops the function calling itself forever.',
      },
      {
        term: 'Recursive case',
        definition:
          'The branch that expresses the answer for size n in terms of the answer for strictly smaller inputs. Writing it correctly means trusting that the smaller call already works — the recursive leap of faith.',
        simple: 'The step where you hand a smaller version of the same job to yourself.',
      },
      {
        term: 'Call stack',
        definition:
          'The runtime structure holding one frame per in-progress call, with its local variables and return address. Recursion depth is stack depth, and CPython caps it at 1000 frames by default.',
        simple: 'The pile of unfinished jobs, each waiting for the one above it to come back.',
      },
      {
        term: 'Recursion tree',
        definition:
          'A drawing with one node per call, children being the calls it makes. Total time is the number of nodes times the work each does; maximum stack depth is the height of the tree.',
        simple: 'A picture of every call the function makes, branching downwards.',
      },
      {
        term: 'Backtracking',
        definition:
          'Depth-first search over a tree of partial solutions in which each step makes a choice, recurses, then undoes the choice. Pruning abandons a branch as soon as the partial solution cannot possibly be completed.',
        simple: 'Try something, see where it leads, and if it leads nowhere put it back exactly as it was and try the next thing.',
      },
      {
        term: 'Pruning',
        definition:
          'Rejecting a partial candidate before exploring its subtree, using a constraint that can only get harder to satisfy. Pruning does not change the worst-case bound but routinely changes the practical runtime by orders of magnitude.',
        simple: 'Not bothering to explore a path you can already see is hopeless.',
      },
    ],

    simpleExplanation:
      'Recursion is what happens when a function solves a problem by calling itself on a smaller version of the same problem. To make that work you need exactly two things: a case so small you can answer it outright, and a rule that turns a big case into smaller ones. Getting the factorial of five means five times the factorial of four, and the factorial of zero is one — that is the whole definition, and the machine keeps track of the unfinished multiplications for you on a stack of paused calls. Backtracking is recursion used for searching rather than computing. You are standing at a fork with several options, so you take one, write it down, and explore everything that follows from it. When that branch runs out you rub out what you wrote and try the next option, leaving the world exactly as you found it. That rub-it-out step — undo the choice — is what lets one shared scratchpad serve the entire search instead of copying the state at every fork. Add one more habit, refusing to explore a branch you can already see is doomed, and a search that would take longer than the age of the universe finishes in milliseconds.',

    whyItExists:
      'Some structures are defined in terms of themselves — a tree is a node with subtrees, a nested document contains nested documents, a permutation is a first element followed by a permutation of the rest — and code that mirrors that definition is dramatically shorter and easier to get right than an explicit stack. Backtracking exists because many problems have no formula at all, only a space of candidates to be searched systematically, and it searches that space without ever materialising it.',

    analogy: {
      scenario:
        'You are trying to get through a hedge maze with a piece of chalk. At each junction you mark the branch you are taking, walk down it, and keep going. If you reach a dead end you walk back to the last junction and rub out your mark before taking the next branch, so the path you are carrying always describes exactly where you are and nothing more. Two refinements turn that from an ordeal into a method. First, if a sign at a junction says "no exit this way", you do not walk down it at all — that is pruning, and it saves everything beyond it. Second, if you notice you have arrived at a junction you have solved before, you look up what you learned last time rather than walking the whole thing again — that is memoisation, and it is what separates an exponential search from a fast one.',
      mapping: [
        { from: 'The chalk path you are carrying', to: 'The partial solution, one shared mutable list' },
        { from: 'Marking a branch on the way in', to: 'The choose step, appending to that list' },
        { from: 'Rubbing the mark out on the way back', to: 'The unchoose step, popping it again' },
        { from: 'The junctions between you and the entrance', to: 'The call stack, whose depth is the recursion depth' },
        { from: 'A sign saying "no exit this way"', to: 'A pruning constraint that cuts an entire subtree' },
        { from: 'Remembering a junction you have solved before', to: 'Memoisation, which collapses overlapping subproblems' },
      ],
      bridge:
        'The rub-it-out step is the one people leave out, and leaving it out is the classic backtracking bug: the chalk path accumulates marks from branches you have already abandoned, so the partial solution is contaminated by earlier attempts and the results are wrong in a way that looks almost right. The reason to undo rather than to pass a fresh copy down is cost: copying the path at every junction turns O(depth) space into O(nodes times depth) and adds a copy to every single call, which on a tree with millions of nodes is the difference between finishing and not.',
      limitations:
        'A maze walker can see a whole corridor at once and reason about it; a recursive function sees only its own frame and whatever it was passed. And real chalk never runs out, whereas the call stack does — CPython raises RecursionError at about a thousand frames, which is shallow enough to hit on a long linked list or a deep JSON document.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'The recursion tree of fib(5)',
        caption: 'Expand each call and watch the same subproblems reappear; switch memoisation on to see 15 calls collapse to 9.',
        widget: 'recursion-tree',
        props: { fn: 'fib', n: 5 },
      },
      {
        kind: 'ascii',
        title: 'The subset tree for [1, 2, 3]',
        caption: 'One level per element, two branches per level: take it or leave it. Eight leaves, 2^3 subsets.',
        art: `                      []
                 take 1 /  \\ skip 1
                 [1]          []
            2 /     \\ 2     2 /   \\ 2
        [1,2]      [1]     [2]     []
        3 / \\      3 / \\   3 / \\   3 / \\
  [1,2,3] [1,2] [1,3] [1] [2,3] [2] [3]  []

  leaves = 2^3 = 8 subsets; internal nodes = 7; depth = 3`,
      },
      {
        kind: 'flow',
        title: 'The choose / explore / unchoose loop',
        caption: 'Every backtracking solution you will ever write is this shape with a different is_valid.',
        steps: [
          { label: 'Base case: is the candidate complete?', detail: 'If the partial solution is a full answer, record a copy of it and return. Copying here matters: the shared list keeps mutating after you return.' },
          { label: 'Enumerate the options at this position', detail: 'The set of legal next moves — which element to add, which column to place a queen in, which digit to write in this cell.' },
          { label: 'Prune', detail: 'Skip any option that already violates a constraint. This cuts the whole subtree below it, and it is where essentially all the speed comes from.' },
          { label: 'Choose', detail: 'Apply the option to the shared state: append to the path, add to the occupied sets, decrement the remaining budget.' },
          { label: 'Explore', detail: 'Recurse one level deeper. Trust that the recursive call handles the rest of the problem correctly.' },
          { label: 'Unchoose', detail: 'Undo every mutation the choose step made, in reverse. The invariant is that the function leaves the state exactly as it found it.' },
        ],
      },
      {
        kind: 'table',
        title: 'Reading complexity off a recursion tree',
        caption: 'Nodes times work per node gives time; height gives stack space. b is the branching factor and d the depth.',
        columns: ['Pattern', 'Recurrence', 'Tree shape', 'Time', 'Stack space'],
        rows: [
          ['Linear recursion (factorial, list sum)', 'T(n) = T(n-1) + O(1)', 'A chain of n nodes', 'O(n)', 'O(n)'],
          ['Halving (binary search)', 'T(n) = T(n/2) + O(1)', 'A chain of log n nodes', 'O(log n)', 'O(log n)'],
          ['Divide and conquer (merge sort)', 'T(n) = 2T(n/2) + O(n)', 'log n levels, O(n) work per level', 'O(n log n)', 'O(log n)'],
          ['Naive Fibonacci', 'T(n) = T(n-1) + T(n-2) + O(1)', 'Nearly a binary tree of depth n', 'O(phi^n), about O(1.618^n)', 'O(n)'],
          ['Subsets', 'T(n) = 2T(n-1) + O(1)', 'A full binary tree of depth n', 'O(2^n)', 'O(n)'],
          ['Permutations', 'T(n) = n * T(n-1) + O(1)', 'Branching n, then n-1, then n-2', 'O(n!)', 'O(n)'],
        ],
      },
      {
        kind: 'compare',
        title: 'Backtracking versus brute force',
        caption: 'Same answer, same worst-case bound, wildly different practice — measured on 8-queens.',
        left: {
          heading: 'Generate then test',
          points: [
            'Enumerate every complete candidate, then check each one',
            '8-queens: 8^8 = 16,777,216 boards to build and test',
            'No information from a failed candidate is reused',
            'Trivial to write, hopeless past tiny inputs',
          ],
        },
        right: {
          heading: 'Backtracking with pruning',
          points: [
            'Reject a partial candidate the moment it becomes illegal',
            '8-queens: 15,720 placements examined, about a thousandfold fewer',
            'One illegal placement eliminates an entire subtree of boards',
            'Same code shape, one extra validity check per option',
          ],
        },
      },
    ],

    formalDefinition:
      'A recursive function is one defined in terms of itself on strictly smaller inputs, comprising one or more base cases answered without recursion and one or more recursive cases whose arguments are guaranteed to approach a base case under a well-founded ordering, which is what makes termination provable. Its cost is given by a recurrence relation T(n) that can be solved by expansion, by the recursion-tree method — total time equals the number of nodes multiplied by the work done at each, and auxiliary space equals the maximum depth times the frame size — or by the Master Theorem for divide-and-conquer forms. Backtracking is depth-first traversal of the implicit tree of partial candidates, extending a candidate by one choice at each level, abandoning any candidate that provably cannot be completed to a solution, and restoring the prior state on return so that a single mutable representation of the candidate suffices for the entire search.',

    math: {
      intuition:
        'Every recursive function has a recurrence, and the recurrence is a description of its recursion tree. To get the time, count the nodes and multiply by the work each does; to get the space, measure the height. That is why subsets cost 2^n — a binary tree of depth n has 2^n leaves — while permutations cost n! — the branching factor shrinks by one each level, so the leaf count is n times (n-1) times (n-2) and so on. And it is why naive Fibonacci is exponential: the tree branches twice at almost every node even though there are only n genuinely distinct subproblems, which is precisely the redundancy that memoisation removes.',
      formulas: [
        {
          latex: 'T(n) = T(n-1) + T(n-2) + O(1) \\;\\Longrightarrow\\; T(n) = \\Theta(\\varphi^{n}), \\quad \\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618',
          name: 'Naive Fibonacci recurrence',
          meaning: 'The call count itself follows the Fibonacci recurrence, so it grows like the golden ratio to the n — the canonical example of overlapping subproblems being recomputed.',
          category: 'complexity',
          variables: [
            { symbol: 'T(n)', meaning: 'Number of calls made to compute fib(n)' },
            { symbol: '\\varphi', meaning: 'The golden ratio, the dominant root of x^2 = x + 1' },
          ],
        },
        {
          latex: '\\text{time} = (\\text{nodes in the tree}) \\times (\\text{work per node}), \\qquad \\text{stack} = (\\text{height}) \\times (\\text{frame size})',
          name: 'The recursion-tree method',
          meaning: 'The general recipe for reading complexity off a recursive definition without solving the recurrence algebraically.',
          category: 'complexity',
          variables: [
            { symbol: '\\text{nodes}', meaning: 'Total number of calls, summed over every level' },
            { symbol: '\\text{height}', meaning: 'Longest chain of nested calls, which bounds the stack' },
          ],
        },
        {
          latex: '\\sum_{k=0}^{n} \\binom{n}{k} = 2^{n}, \\qquad \\text{number of permutations} = n!',
          name: 'Sizes of the classic search spaces',
          meaning: 'Enumerating all subsets is inescapably 2^n and all permutations n!, so any enumeration algorithm is at best O(output size) — the goal of pruning is to avoid the candidates you do not need, not to beat these bounds.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of elements' },
            { symbol: '\\binom{n}{k}', meaning: 'Number of subsets of size k' },
          ],
        },
        {
          latex: 'T(n) = a\\,T(n/b) + f(n) \\;\\Longrightarrow\\; T(n) = \\Theta(n^{\\log_b a}) \\text{ when } f(n) = O(n^{\\log_b a - \\epsilon})',
          name: 'Master Theorem, case 1',
          meaning: 'The shortcut for divide-and-conquer recurrences: a subproblems of size n/b each, plus f(n) to combine them. Merge sort is a = 2, b = 2, f(n) = n, which lands in the balanced case and gives n log n.',
          category: 'complexity',
          variables: [
            { symbol: 'a', meaning: 'Number of recursive calls per level' },
            { symbol: 'b', meaning: 'Factor by which the input shrinks' },
            { symbol: 'f(n)', meaning: 'Work done outside the recursive calls' },
          ],
        },
      ],
      derivation: [
        'Count the calls made by naive fib(n). Let C(n) be that count, with C(0) = C(1) = 1.',
        'Each call to fib(n) for n >= 2 makes one call to fib(n-1) and one to fib(n-2), so C(n) = 1 + C(n-1) + C(n-2).',
        'This is the Fibonacci recurrence plus a constant, so C(n) = 2 * F(n+1) - 1, where F is the Fibonacci sequence itself.',
        'Since F(n) grows as phi^n / sqrt(5), the number of calls grows as phi^n — exponential, and measurably so: fib(30) makes 2,692,537 calls.',
        'But there are only n + 1 distinct arguments, 0 through n, so almost every call recomputes something already computed.',
        'Memoising turns the tree into a directed acyclic graph with n + 1 distinct nodes, each computed once, giving O(n) time at the cost of O(n) space — fib(30) drops from 2,692,537 calls to 31 distinct computations.',
        'This is exactly the observation that turns exponential recursion into dynamic programming, which the greedy-and-DP unit develops in full.',
      ],
    },

    workedExample: {
      title: 'Enumerating every subset of [1, 2, 3] by hand',
      setup:
        'The rule is one decision per element, taken left to right: include it or do not. The function keeps a single shared list called path and an index i saying which element is being decided. When i reaches the end of the input, path is a complete subset and is copied into the output. Read the trace as a depth-first walk of the tree in the visual above, and watch path mutate and then get restored.',
      steps: [
        { label: 'backtrack(0), path = []', detail: 'Element 1 is undecided. Choose to take it: append 1, so path = [1]. Recurse to depth 1.' },
        { label: 'backtrack(1), path = [1]', detail: 'Take 2: path = [1, 2]. Recurse to depth 2.' },
        { label: 'backtrack(2), path = [1, 2]', detail: 'Take 3: path = [1, 2, 3]. Recurse to depth 3.' },
        { label: 'backtrack(3) — base case', detail: 'i equals len(nums), so path is complete. Record a copy: output = [[1, 2, 3]]. Return. Recording path itself rather than path.copy() would store a reference to a list that is about to be emptied, which is the single most common bug in this pattern.' },
        { label: 'Unchoose 3, then skip 3', detail: 'Back at depth 2, pop 3 so path = [1, 2], then recurse without taking 3. The base case fires again: output = [[1, 2, 3], [1, 2]]. Depth 2 is now exhausted and returns.' },
        { label: 'Unchoose 2, then skip 2', detail: 'Back at depth 1, pop 2 so path = [1], then recurse. Depth 2 now decides 3 both ways, giving [1, 3] and [1]. output = [[1,2,3], [1,2], [1,3], [1]].' },
        { label: 'Unchoose 1, then skip 1', detail: 'Back at depth 0, pop 1 so path = [], then recurse without 1. The right half of the tree mirrors the left, producing [2, 3], [2], [3] and finally the empty subset.' },
        { label: 'Final output', detail: '[[1,2,3], [1,2], [1,3], [1], [2,3], [2], [3], []] — eight subsets, 2^3, in exactly the depth-first order of the tree.' },
        { label: 'Verify the invariant', detail: 'Every call returns with path exactly as it found it: each append is matched by a pop before the function returns. Check this by asserting len(path) == i at the top of the function; if the assertion ever fails, an unchoose is missing.', latex: '|\\text{path}| = i \\text{ on entry to } \\texttt{backtrack}(i)' },
        { label: 'Complexity from the tree', detail: 'The tree has 2^(n+1) - 1 = 15 nodes for n = 3, with O(1) work at each internal node and O(n) at each of the 2^n leaves for the copy. Time is O(n * 2^n), dominated by writing out the output; space is O(n) for the path plus O(n) stack depth, excluding the O(n * 2^n) needed to hold the answers.', latex: 'T(n) = \\Theta(n \\cdot 2^{n}), \\quad S_{\\text{aux}}(n) = \\Theta(n)' },
        { label: 'The same skeleton, with pruning: 4-queens', detail: 'Replace "take or skip element i" with "place a queen in row i at some column c", and prune any c that shares a column or diagonal with a queen already placed. Start row 0 at column 0: row 1 can then only be column 2 or 3. Column 2 leaves row 2 with nothing legal, so that branch dies after one extra placement rather than after enumerating the 16 boards beneath it. Column 3 lets row 2 take column 1, but then row 3 has nothing, so the whole of row 0 = column 0 is dead.' },
        { label: 'The first solution', detail: 'Row 0 = column 1 forces row 1 = column 3, then row 2 = column 0 and row 3 = column 2 — the solution (1, 3, 0, 2). A second, its mirror image, is (2, 0, 3, 1). Pruning examined 60 candidate placements in total against 4^4 = 256 complete boards for generate-and-test; at n = 8 the gap is 15,720 against 16,777,216.' },
      ],
      conclusion:
        'Subset enumeration costs Theta(n * 2^n) time, because there are 2^n subsets and each is copied out in O(n), and Theta(n) auxiliary space: one shared path of length at most n, plus a call stack of depth at most n. No algorithm can do better on time, since the output alone is that large — which is the honest answer to "can we speed up subsets?" and is worth distinguishing from problems where the exponential is avoidable. Backtracking\'s real leverage is elsewhere: the identical skeleton with a validity check prunes doomed branches before they are explored, and on 8-queens that turns 16.7 million candidate boards into 15,720 placements examined. The invariant that makes it all work is that each call leaves the shared state exactly as it found it, so choose must be undone by an exactly matching unchoose on every path out of the function, including early returns.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Subsets with choose / explore / unchoose',
        runnable: true,
        code: `def subsets(nums, trace=False):
    out, path = [], []
    def backtrack(i):
        assert len(path) <= i          # the invariant: nothing left over from a sibling
        if i == len(nums):             # base case: every element decided
            out.append(path.copy())    # copy! path keeps mutating after we return
            if trace:
                print(f"  leaf -> {{{', '.join(map(str, path))}}}")
            return
        path.append(nums[i])           # choose
        backtrack(i + 1)               # explore
        path.pop()                     # unchoose
        backtrack(i + 1)               # skip nums[i]
    backtrack(0)
    return out

print(subsets([1, 2, 3], trace=True))
print("count:", len(subsets([1, 2, 3])), "= 2^3")`,
        output: `  leaf -> {1, 2, 3}
  leaf -> {1, 2}
  leaf -> {1, 3}
  leaf -> {1}
  leaf -> {2, 3}
  leaf -> {2}
  leaf -> {3}
  leaf -> {}
[[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []]
count: 8 = 2^3`,
        explanation:
          'One shared list serves the whole search, which is why the pop is not optional: without it, path accumulates elements from branches already abandoned and every later subset is wrong. The copy in the base case is the mirror-image trap — appending path itself stores a reference to a list that will be empty by the time the function returns, so the output becomes a list of eight empty lists. Cost is Theta(n * 2^n) time and Theta(n) auxiliary space. Swapping the order of the two recursive calls changes only the order of the output, not its contents, which is a useful sanity check that you have understood the tree rather than memorised the code.',
      },
      {
        language: 'python',
        title: 'The recursion tree is real: counting calls in naive Fibonacci',
        runnable: true,
        code: `calls = 0
def fib(n):
    global calls
    calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)

for n in (5, 10, 20, 30):
    calls = 0
    v = fib(n)
    print(f"fib({n}) = {v:<7} calls = {calls}")

from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    return n if n < 2 else fib_memo(n - 1) + fib_memo(n - 2)

print("fib_memo(30) =", fib_memo(30), "cache:", fib_memo.cache_info())`,
        output: `fib(5) = 5       calls = 15
fib(10) = 55      calls = 177
fib(20) = 6765    calls = 21891
fib(30) = 832040  calls = 2692537
fib_memo(30) = 832040 cache: CacheInfo(hits=28, misses=31, maxsize=None, currsize=31)`,
        explanation:
          'The call counts follow the Fibonacci numbers themselves — 2 * F(n+1) - 1 — so they grow like 1.618^n, and the printed figures match: each increment of 10 in n multiplies the work by roughly 120. Yet there are only 31 distinct arguments for n = 30, which is exactly what the cache_info line shows: 31 misses, meaning 31 real computations, and 28 hits. That gap between the number of calls and the number of distinct subproblems is the definition of overlapping subproblems, and collapsing it is the whole idea of dynamic programming. Note that lru_cache requires hashable arguments, which is why memoised functions take tuples rather than lists.',
      },
      {
        language: 'python',
        title: 'N-queens: the same skeleton plus pruning',
        runnable: true,
        code: `def solve_n_queens(n, trace=False):
    cols, diag, anti = set(), set(), set()     # occupied columns and both diagonals
    board, solutions = [], []
    nodes = 0

    def place(row):
        nonlocal nodes
        if row == n:                            # base case: all rows filled
            solutions.append(tuple(board))
            return
        for c in range(n):
            nodes += 1
            if c in cols or (row - c) in diag or (row + c) in anti:
                continue                        # prune: this square is attacked
            cols.add(c); diag.add(row - c); anti.add(row + c); board.append(c)
            if trace:
                print("  " * row + f"row {row} -> col {c}")
            place(row + 1)                      # explore
            cols.remove(c); diag.remove(row - c); anti.remove(row + c); board.pop()

    place(0)
    return solutions, nodes

sols, nodes = solve_n_queens(4, trace=True)
print("solutions:", sols)
print("candidate placements examined:", nodes, "out of", 4 ** 4, "brute-force boards")
for n in (6, 8):
    s, k = solve_n_queens(n)
    print(f"n={n}: {len(s)} solutions, {k} placements examined vs {n**n} brute force")`,
        output: `row 0 -> col 0
  row 1 -> col 2
  row 1 -> col 3
    row 2 -> col 1
row 0 -> col 1
  row 1 -> col 3
    row 2 -> col 0
      row 3 -> col 2
row 0 -> col 2
  row 1 -> col 0
    row 2 -> col 3
      row 3 -> col 1
row 0 -> col 3
  row 1 -> col 0
  row 1 -> col 1
solutions: [(1, 3, 0, 2), (2, 0, 3, 1)]
candidate placements examined: 60 out of 256 brute-force boards
n=6: 4 solutions, 894 placements examined vs 46656 brute force
n=8: 92 solutions, 15720 placements examined vs 16777216 brute force`,
        explanation:
          'Three sets do all the pruning, and the diagonal encoding is the trick worth remembering: every square on a north-west diagonal has the same value of row - col, and every square on a north-east diagonal the same row + col, so an attack test is three O(1) set lookups rather than a scan of the board. One queen placed in row 0 eliminates a column and two diagonals for every remaining row, which is why 8-queens examines 15,720 placements rather than the 16.7 million boards generate-and-test would build. Note that the unchoose step must undo all four mutations; forgetting one of the diagonal sets produces a program that finds some valid solutions and silently misses others, which is far harder to spot than a crash. The trace also shows the first dead end plainly: row 0 = 0 then row 1 = 2 prints with no row 2 beneath it.',
      },
      {
        language: 'python',
        title: 'Permutations, and the copy bug seen in the wild',
        runnable: true,
        code: `def permutations(nums):
    out, path, used = [], [], [False] * len(nums)
    def backtrack():
        if len(path) == len(nums):
            out.append(tuple(path))
            return
        for i, x in enumerate(nums):
            if used[i]:
                continue                 # each element used at most once
            used[i] = True; path.append(x)
            backtrack()
            path.pop(); used[i] = False  # undo BOTH mutations
    backtrack()
    return out

print(permutations([1, 2, 3]))

def subsets_buggy(nums):
    out, path = [], []
    def backtrack(i):
        if i == len(nums):
            out.append(path)             # BUG: appends the same list object
            return
        path.append(nums[i]); backtrack(i + 1); path.pop(); backtrack(i + 1)
    backtrack(0)
    return out

print("what forgetting .copy() gives you:", subsets_buggy([1, 2, 3]))`,
        output: `[(1, 2, 3), (1, 3, 2), (2, 1, 3), (2, 3, 1), (3, 1, 2), (3, 2, 1)]
[[], [], [], [], [], [], [], []]`,
        explanation:
          'Permutations branch n ways at the first level, n - 1 at the second and so on, so the tree has n! leaves and the algorithm is Theta(n * n!) — for n = 12 that is already half a billion tuples, which is the honest reason "just try all orderings" is not a plan. The used array is the pruning: it is what stops the same element appearing twice, and it must be reset in the unchoose step alongside the pop, since a single missed undo corrupts every sibling branch. The second function shows the copy bug producing its characteristic output: eight references to one list, which is empty by the time anything prints it. The symptom — the right number of results, all identical and all empty — is distinctive enough to diagnose on sight.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Parsers and tree-structured data',
        usage:
          'JSON, HTML and source code are recursively defined, so the code that walks them is recursive: json.loads builds nested structures with nested calls, and Python raises RecursionError on documents nested past 1000 levels — a real denial-of-service vector that parsers defend against with explicit depth limits.',
      },
      {
        context: 'Hyperparameter and neural-architecture search',
        usage:
          'Searching a space of configurations is backtracking with pruning: a partial configuration that already violates a memory or latency budget is abandoned before the remaining dimensions are explored, which is exactly the N-queens saving applied to a search space nobody can enumerate.',
      },
      {
        context: 'Constraint solvers and schedulers',
        usage:
          'Sudoku solvers, exam timetabling, register allocation and SAT solvers are all backtracking with progressively cleverer pruning — unit propagation and conflict-driven clause learning are pruning rules that let a solver ignore an astronomically large fraction of the candidate space.',
      },
      {
        context: 'Beam search and constrained decoding in language models',
        usage:
          'Generating text is a search over sequences, and constrained decoding — forcing valid JSON, or a grammar — is backtracking over token prefixes with the grammar as the pruning rule. The reason beam search is preferred to exhaustive search is that the tree has vocabulary-size branching at every position.',
      },
    ],

    projectConnections: [
      { tool: 'functools.lru_cache', role: 'One decorator turns an exponential recursive function into a linear one by memoising on the argument tuple; the standard first move when a recursive solution is correct but too slow.' },
      { tool: 'sys.setrecursionlimit / threading.stack_size', role: 'The escape hatch for legitimately deep recursion, and the pair of knobs you need together — raising the limit alone can segfault the interpreter rather than raising RecursionError.' },
      { tool: 'itertools', role: 'combinations, permutations and product implement the classic enumerations in C. Reach for them before writing your own, and write your own when you need pruning, which itertools cannot do.' },
      { tool: 'python-constraint / OR-Tools', role: 'Production constraint solvers built on backtracking with sophisticated propagation, for scheduling and assignment problems too large for a hand-rolled search.' },
    ],

    commonMistakes: [
      {
        mistake: 'Appending the shared path instead of a copy of it',
        why: 'Python lists are references. Storing path stores a pointer to the one list the whole search mutates, so by the time the function returns every recorded result is the same empty list.',
        fix: 'Append path.copy(), list(path) or tuple(path) at the base case. The symptom is unmistakable: the correct number of results, all identical.',
      },
      {
        mistake: 'Forgetting the unchoose step, or undoing only some of the mutations',
        why: 'The next branch inherits state from the abandoned one, so results are contaminated in a way that still looks plausible. Partial undo is worse than none: N-queens that forgets one diagonal set still finds valid solutions, just not all of them.',
        fix: 'Make every choose and unchoose a matched pair on the same two lines of the loop, undo in reverse order, and assert an invariant such as len(path) == depth at the top of the function.',
      },
      {
        mistake: 'A base case that cannot be reached',
        why: 'If the recursive call does not strictly shrink the input — passing n instead of n - 1, or recursing on the same node — the function recurses until the stack is exhausted and raises RecursionError, which is reported at whatever call happened to overflow rather than at the real bug.',
        fix: 'Name the quantity that decreases and check that every recursive call decreases it. Handle the boundary explicitly too: n <= 0 rather than n == 0, so a negative input terminates instead of running away.',
      },
      {
        mistake: 'Recursing deeply in CPython',
        why: 'The default limit is 1000 frames, and each frame is expensive. A recursive walk over a linked list, a long dependency chain or a deep JSON document hits it on real data having passed every test.',
        fix: 'Convert tail-style recursion to a loop — CPython does not eliminate tail calls — or use an explicit stack. Raise the limit only when you also raise the thread stack size and know the true depth bound.',
      },
      {
        mistake: 'Using recursion where a loop is plainly better',
        why: 'A recursive sum over a list costs a stack frame per element and is slower and more fragile than a for loop, with no gain in clarity. Recursion earns its keep on self-similar structure, not on sequences.',
        fix: 'Ask whether the data is genuinely recursive — trees, nested documents, branching search. If it is a flat sequence, iterate.',
      },
      {
        mistake: 'Leaving an exponential recursion exponential when the subproblems overlap',
        why: 'Naive Fibonacci makes 2.7 million calls for n = 30 to compute 31 distinct values. The same pattern hides in grid paths, edit distance and coin change, where the recursive formulation is correct but unusable.',
        fix: 'Count the distinct argument tuples. If it is polynomial while the call count is exponential, add lru_cache or convert to a table — that is the whole content of dynamic programming.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Walk me through how you would write any backtracking solution, and how you reason about its complexity.',
        answer:
          'I start by naming three things: what a complete candidate looks like, which makes the base case; what the options are at each step; and which constraint lets me reject a partial candidate early. The body is then always the same shape — for each option, skip it if it violates the constraint, otherwise apply it to the shared state, recurse, and undo exactly what I applied. Keeping one mutable candidate rather than copying at every level is what keeps auxiliary space at O(depth) instead of O(nodes times depth), and the discipline that makes it safe is that every function call leaves the state exactly as it found it. For complexity I draw the recursion tree: the branching factor times the depth gives the node count, multiplied by the work per node, so subsets are 2^n, permutations n!, and N-queens is bounded by n! but in practice enormously less because pruning cuts whole subtrees. Space is the height of the tree times the frame size, plus whatever the shared state costs. I always say explicitly that pruning does not improve the worst-case bound — it improves the practical runtime, and for 8-queens that is 15,720 placements against 16.7 million boards.',
        followUp:
          'Asking how they would test it separates people who assert the invariant len(path) == depth from people who only check the final output.',
      },
      {
        level: 'intermediate',
        question: 'When should you convert a recursive solution to an iterative one, and how?',
        answer:
          'Three triggers. First, depth: CPython raises RecursionError at about 1000 frames, so any recursion whose depth scales with the input — a linked list, a dependency chain, a deeply nested document — needs converting before it meets real data. Second, performance: a Python frame is expensive, so hot recursive code with a trivial body is often two or three times faster as a loop. Third, resumability: an explicit stack can be checkpointed or streamed, a call stack cannot. The mechanical conversion is to make the implicit stack explicit — push the arguments you would have passed, pop in the loop, and for post-order work push a marker or a second entry recording that the children are done. Tail recursion is the easy case and becomes a plain while loop, since CPython performs no tail-call elimination. The cases where I would not convert are genuinely tree-shaped recursion of bounded depth, where the recursive form is much clearer; log-depth recursion such as binary search or the recursion in merge sort, where the depth is 20 for a million elements and will never overflow; and anything where the explicit-stack version would need to reconstruct most of a call frame by hand.',
        followUp:
          'Mentioning that raising sys.setrecursionlimit without also raising the thread stack size can segfault rather than raise shows real experience.',
      },
      {
        level: 'ai-engineer',
        question: 'A candidate writes a correct recursive solution that times out on the large test. What is your diagnostic process?',
        answer:
          'I count two numbers: how many calls the function makes, and how many distinct argument tuples it can possibly have. If the call count is exponential while the distinct-argument count is polynomial, the subproblems overlap and memoisation fixes it outright — that is naive Fibonacci with 2.7 million calls over 31 distinct arguments, and one lru_cache decorator turns it linear. If the distinct-argument count is itself exponential, memoisation cannot help and the question becomes whether a better pruning rule exists, or whether the problem needs a different formulation such as a greedy rule with a proof, or an approximation. The intermediate case is worth naming too: sometimes the state is unnecessarily fine-grained — carrying the whole path when only its length and last element matter — and coarsening the memo key collapses an exponential state space into a polynomial one. I would also check the mundane causes before any of that: quadratic string concatenation inside the recursion, an O(n) membership test against a list where a set belongs, or copying the candidate at every node instead of mutating and undoing.',
        followUp:
          'The strongest answers mention coarsening the memo key, since that is the step that turns a correct memoisation into a fast one.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a function that returns all subsets of a list that may contain duplicates, with no duplicate subsets in the output. Explain the pruning rule.',
        hint: 'Sort first, then at each level skip an option identical to the one you just tried and rejected at the same level.',
        solution:
          'def subsets_with_dups(nums):\n    nums = sorted(nums)\n    out, path = [], []\n    def backtrack(start):\n        out.append(path.copy())\n        for i in range(start, len(nums)):\n            if i > start and nums[i] == nums[i - 1]:\n                continue                 # same value already tried at this level\n            path.append(nums[i])\n            backtrack(i + 1)\n            path.pop()\n    backtrack(0)\n    return out\n\nsubsets_with_dups([1, 2, 2]) -> [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]\n\nSorting puts equal values next to each other so the duplicate test is a comparison with the immediate predecessor. The condition i > start is what makes it correct: within one call, choosing the second 2 after having already explored the first 2 would regenerate an identical subtree, so it is skipped; but the first occurrence at each level, and any occurrence reached through a deeper call, is still allowed, which is how [2, 2] survives. Worst case is unchanged at O(n * 2^n), but on heavily duplicated input the output and the runtime shrink to the number of distinct subsets. The frequent wrong fix is deduplicating the output at the end, which costs the full 2^n work first and needs the subsets hashable.',
      },
      {
        prompt: 'Implement a recursive flatten for arbitrarily nested lists, then explain why it fails on a list nested 5000 deep and rewrite it iteratively.',
        hint: 'The iterative version needs a stack, and the order you push determines the order you get out.',
        solution:
          'def flatten(xs):\n    out = []\n    for x in xs:\n        if isinstance(x, list):\n            out.extend(flatten(x))\n        else:\n            out.append(x)\n    return out\n\nRecursion depth equals nesting depth, so a 5000-deep structure raises RecursionError: maximum recursion depth exceeded. That is not a hypothetical — it is the standard failure when parsing untrusted JSON, and it is why parsers impose explicit depth limits.\n\ndef flatten_iter(xs):\n    out, stack = [], [iter(xs)]\n    while stack:\n        it = stack[-1]\n        for x in it:\n            if isinstance(x, list):\n                stack.append(iter(x))\n                break              # descend, resuming this iterator later\n            out.append(x)\n        else:\n            stack.pop()            # this iterator is exhausted\n    return out\n\nKeeping iterators rather than lists on the stack is what preserves order: each frame remembers its own position, which is exactly the state a call frame was holding. Both versions are O(total elements) in time; the iterative one uses heap memory for the stack, which is bounded by available RAM rather than by the 1000-frame recursion limit.',
      },
      {
        prompt: 'Solve the combination-sum problem: given distinct positive candidates and a target, return every multiset of candidates summing to the target, where each candidate may be reused. State why the search terminates and give the pruning rule.',
        hint: 'Sort ascending; once a candidate exceeds the remaining target, so does every later one.',
        solution:
          'def combination_sum(candidates, target):\n    candidates = sorted(candidates)\n    out, path = [], []\n    def backtrack(start, remaining):\n        if remaining == 0:\n            out.append(path.copy())\n            return\n        for i in range(start, len(candidates)):\n            if candidates[i] > remaining:\n                break                # sorted, so every later candidate also overshoots\n            path.append(candidates[i])\n            backtrack(i, remaining - candidates[i])   # i, not i + 1: reuse allowed\n            path.pop()\n    backtrack(0, target)\n    return out\n\ncombination_sum([2, 3, 6, 7], 7) -> [[2, 2, 3], [7]]\n\nTermination rests on remaining strictly decreasing: every candidate is positive, so each recursive call reduces it by at least one and it cannot pass zero without the break firing first. Passing i rather than i + 1 permits reuse while the non-decreasing index prevents [2, 3] and [3, 2] both appearing, which is what keeps the output a set of multisets. The break rather than continue is the pruning that matters, and it depends on the sort: it eliminates the entire tail of the candidate list at every node. Worst-case complexity is exponential — bounded by roughly O(len(candidates)^(target/min_candidate)) — which is unavoidable, since the output itself can be exponentially large.',
      },
    ],

    quiz: [
      {
        id: 'DSA-015-q1',
        type: 'debug',
        language: 'python',
        concept: 'the copy bug',
        prompt: 'This subset generator returns eight empty lists. What is wrong?',
        code: `def subsets(nums):
    out, path = [], []
    def backtrack(i):
        if i == len(nums):
            out.append(path)
            return
        path.append(nums[i]); backtrack(i + 1)
        path.pop(); backtrack(i + 1)
    backtrack(0)
    return out`,
        options: [
          'out.append(path) stores a reference to the one shared list; it must be path.copy()',
          'The pop() should come before the first recursive call',
          'The base case should be i > len(nums)',
          'path must be declared global inside backtrack',
        ],
        answerIndex: 0,
        explanation:
          'Appending path stores a pointer, not a snapshot. By the time the search finishes, every pop has run, so all eight stored references point at the same now-empty list. path.copy(), list(path) or tuple(path) takes the snapshot.',
      },
      {
        id: 'DSA-015-q2',
        type: 'numeric',
        concept: 'recursion tree size',
        prompt: 'How many calls does the naive recursive fib(5) make in total, counting the initial call?',
        answer: 15,
        explanation:
          'The count satisfies C(n) = 1 + C(n-1) + C(n-2) with C(0) = C(1) = 1, giving 1, 1, 3, 5, 9, 15. The tree has 15 nodes to compute 6 distinct values, which is the redundancy memoisation removes.',
      },
      {
        id: 'DSA-015-q3',
        type: 'multi',
        concept: 'requirements for correct recursion',
        prompt: 'Which of these are genuinely required for a recursive function to terminate and be correct?',
        options: [
          'At least one base case answered without recursion',
          'Every recursive call moves strictly towards a base case',
          'The function must return a value',
          'The recursion depth must be at most log n',
          'Any mutation of shared state must be undone before returning',
        ],
        answerIndices: [0, 1, 4],
        explanation:
          'Base case plus strict progress is what proves termination, and restoring shared state is what makes sibling branches independent. Recursive functions may return nothing, and depth can legitimately be O(n) as long as it fits the stack.',
      },
      {
        id: 'DSA-015-q4',
        type: 'order',
        concept: 'the backtracking skeleton',
        prompt: 'Put the backtracking steps in the order they appear inside the option loop.',
        items: [
          'Skip the option if it violates a constraint (prune)',
          'Apply the option to the shared state (choose)',
          'Recurse to the next position (explore)',
          'Undo the mutation (unchoose)',
        ],
        explanation:
          'Pruning comes before choosing so the doomed subtree is never entered at all, and unchoose must be the last statement in the loop body so the next option starts from an uncontaminated state.',
      },
      {
        id: 'DSA-015-q5',
        type: 'truefalse',
        concept: 'what pruning buys',
        prompt: 'Pruning improves the worst-case asymptotic complexity of a backtracking search.',
        answer: false,
        explanation:
          'It improves practical runtime, often by orders of magnitude — 8-queens goes from 16.7 million candidate boards to 15,720 placements — but the worst case remains exponential, since an adversarial input can defeat any fixed pruning rule.',
      },
      {
        id: 'DSA-015-q6',
        type: 'explain',
        concept: 'recursion trees and memoisation',
        prompt: 'Explain how you work out the complexity of a recursive function, and how you know whether memoisation will help.',
        rubric: [
          'Describes the recursion-tree method: nodes times work per node for time, height times frame size for space',
          'Distinguishes the number of calls from the number of distinct argument tuples',
          'Concludes that memoisation helps exactly when the calls are exponential but the distinct states are polynomial, and gives an example',
        ],
        sampleAnswer:
          'I draw the recursion tree: one node per call, with children for the calls it makes. The time is the number of nodes multiplied by the work done at each node outside the recursive calls, and the auxiliary space is the height of the tree, because that is the deepest the call stack ever gets. Subsets branch two ways for n levels, so 2^n leaves and O(n * 2^n) with the copy at each leaf; permutations branch n then n-1 then n-2, so n! leaves; naive Fibonacci branches twice at nearly every node down to depth n, giving about 1.618^n. Whether memoisation helps is a separate count: how many distinct argument tuples can the function be called with? For Fibonacci there are only n + 1 of them, so 2.7 million calls at n = 30 are recomputing 31 values and caching makes it linear. For subsets, the argument is the whole partial path, so there are 2^n distinct states and caching gains nothing — the output is genuinely that large. The useful middle case is where the state is finer than it needs to be: if I am carrying an entire path when only its length and last element affect the answer, coarsening the key can turn an exponential state space into a polynomial one, which is exactly the move from brute-force recursion to dynamic programming.',
      },
    ],

    flashcards: [
      { front: 'The two required parts of any recursive function?', back: 'A base case answered without recursion, and a recursive case whose arguments strictly approach that base case — which together prove termination.' },
      { front: 'The backtracking pattern in four words?', back: 'Prune, choose, explore, unchoose. Every mutation applied on the way down is undone on the way back up, so one shared candidate serves the whole search.' },
      { front: 'How do you read time and space off a recursion tree?', back: 'Time is the number of nodes times the work per node; auxiliary space is the height of the tree times the frame size.' },
      { front: 'Cost of enumerating all subsets and all permutations?', back: 'Theta(n * 2^n) and Theta(n * n!) respectively, with O(n) auxiliary space. Both are output-bound, so no algorithm does better.' },
      { front: 'When does memoisation turn exponential recursion into polynomial?', back: 'When the number of distinct argument tuples is polynomial while the call count is exponential — overlapping subproblems, as in fib(30): 2,692,537 calls over 31 distinct arguments.' },
      { front: 'Why does path.copy() matter at the base case?', back: 'Python appends a reference, not a snapshot. Storing the shared path means every recorded result points at the same list, which is empty once the search unwinds.' },
      { front: 'What is CPython\'s default recursion limit, and what does exceeding it do?', back: '1000 frames, after which RecursionError is raised. Deep structures — long lists, nested JSON, dependency chains — need an explicit stack rather than a bigger limit.' },
    ],

    challenge: {
      title: 'A Sudoku solver with measurable pruning',
      brief:
        'Write a backtracking solver for standard 9x9 Sudoku that reports how many candidate placements it examined. Then add one improvement — always fill the empty cell with the fewest legal candidates next, the minimum-remaining-values heuristic — and measure the reduction on the same puzzle. Explain the result in terms of the search tree.',
      acceptanceCriteria: [
        'Maintains row, column and box occupancy incrementally rather than re-scanning the grid on every candidacy test',
        'Undoes every mutation on backtrack, verified by asserting the grid is unchanged after a failed branch',
        'Counts and reports candidate placements examined, for both the naive cell order and the minimum-remaining-values order',
        'Solves a published "hard" puzzle, and reports honestly if the anti-backtracking puzzle designed to defeat naive ordering takes much longer',
        'Explains the measured difference as a reduction in branching factor near the root of the search tree, not as a change to the worst-case bound',
      ],
      starterCode: 'def solve(grid: list[list[int]]) -> tuple[bool, int]:\n    """Solve in place. Return (solved, placements_examined)."""\n    ...\n\ndef candidates(grid, r, c) -> set[int]:\n    ...\n',
      language: 'python',
    },

    teachingPrompt: {
      prompt:
        'Teach someone what recursion is, what backtracking adds to it, and how to reason about the cost of both.',
      mustCover: [
        'A recursive function needs a base case and a recursive case that strictly shrinks the problem',
        'The call stack holds one frame per in-progress call, so recursion depth is memory and CPython caps it around 1000',
        'Backtracking is choose, explore, unchoose over a tree of partial solutions, with pruning to skip doomed branches',
        'Complexity comes from the recursion tree: nodes times work for time, height for space',
        'Overlapping subproblems make naive recursion exponential, and memoisation collapses it',
      ],
      bonusSignals: [
        'explains why the candidate is mutated and restored rather than copied',
        'gives the 2^n and n! figures for subsets and permutations',
        'notes that pruning changes practical runtime but not the worst-case bound',
        'mentions RecursionError and when to rewrite iteratively',
      ],
      sampleExplanation:
        'Recursion is a function that solves a problem by calling itself on a smaller version of the same problem. It needs two parts: a case small enough to answer on the spot, and a rule that reduces a bigger case to smaller ones. The reduction has to be genuine — strictly smaller every time — or the calls never stop, and since the machine keeps a note of every paused call, running away means running out of memory rather than looping quietly. That pile of paused calls is also the cost model: the deepest the pile ever gets is the memory the function needs, and the total number of calls is the time. Draw the calls as a tree and both numbers are there to read. Backtracking is recursion used to search rather than to compute. You are building a candidate answer one decision at a time, so at each step you take an option, write it into a shared scratchpad, explore everything that follows, and then rub it out before trying the next option — the rubbing out is what lets one scratchpad serve the entire search instead of copying it at every fork, and forgetting it is the classic bug. The other habit is refusing to explore an option that already breaks a rule: placing a queen where an existing queen attacks eliminates every arrangement underneath that choice, which is how a problem with sixteen million possible boards is settled by examining fifteen thousand placements. One last distinction is worth drawing. If your recursion is slow because it keeps recomputing the same small problems, remember the answers and it becomes fast. If it is slow because the space of genuinely different candidates really is enormous, no amount of remembering helps, and better pruning or a different formulation is the only way out.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
  {
    id: 'DSA-016',
    domain: 'DSA',
    module: 'Recursion & Search',
    topic: 'Halving a search space',
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['DSA-001', 'DSA-003'],
    related: ['DSA-010', 'DSA-015'],
    tags: ['binary-search', 'logarithmic', 'invariant', 'bisect', 'off-by-one', 'search-on-answer'],

    learningObjectives: [
      'State the loop invariant of a binary search precisely, and use it to derive the correct initial bounds, loop condition and updates rather than guessing at plus and minus one',
      'Implement the three variants — exact match, first index not less than a target, first index greater than a target — and say which one a given question needs',
      'Use the bisect module correctly, including bisect_left versus bisect_right on duplicates and the insort family',
      'Recognise a problem that admits binary search on the answer: a monotone predicate over a numeric range, where checking a candidate is cheap but computing the optimum directly is not',
      'Justify the O(log n) time and O(1) space bounds, and identify the three off-by-one traps that cause infinite loops or missed elements',
    ],

    terminology: [
      {
        term: 'Loop invariant',
        definition:
          'A statement about the search bounds that is true before the loop, preserved by every iteration, and strong enough at exit to give the answer. For binary search it is "if the target is present, its index lies within the current bounds".',
        simple: 'The promise the code keeps at every single step, which is what makes the final answer right.',
      },
      {
        term: 'Half-open interval',
        definition:
          'A range written [lo, hi) that includes lo and excludes hi. Writing binary search over half-open bounds eliminates most off-by-one errors, because hi is always "one past the last candidate" and the loop condition is simply lo < hi.',
        simple: 'A range where the right end is a fence post, not a place you can stand.',
      },
      {
        term: 'bisect_left and bisect_right',
        definition:
          'Python\'s standard implementations: bisect_left returns the first index where a value could be inserted keeping order, so the leftmost position of an equal run; bisect_right returns one past the rightmost equal element.',
        simple: 'Where a new item would go if it queued in front of its equals, or behind them.',
      },
      {
        term: 'Monotone predicate',
        definition:
          'A yes/no test over an ordered range that, once true, stays true — or once false, stays false. Binary search finds the boundary between the two regions, and needs nothing else about the problem.',
        simple: 'A switch that flips once and never flips back as you move along the range.',
      },
      {
        term: 'Binary search on the answer',
        definition:
          'Searching the range of possible answers rather than an array, using a feasibility check as the predicate. Applies whenever "can we achieve X?" is cheap to test and monotone in X.',
        simple: 'Guessing the answer, checking whether it works, and halving your guess range accordingly.',
      },
    ],

    simpleExplanation:
      'Think about looking up a word in a paper dictionary. Nobody starts at page one. You open it somewhere in the middle, see whether your word comes before or after the words on that page, and then throw away the half that cannot contain it. Repeat, and the pile of pages still in play halves every time: a thousand pages become five hundred, then two hundred and fifty, and after about ten looks you are on the right page. That is binary search, and the reason it feels like magic is the arithmetic of halving — a million items takes twenty checks, a billion takes thirty. Two conditions make it legal. The data must be sorted, because the whole method rests on being able to tell which half to discard from a single comparison. And you must be honest about your bounds: the entire craft of writing binary search correctly is keeping a clear promise about which range of positions could still hold the answer, and updating that range so it always shrinks. Get the promise right and the plus-ones and minus-ones follow from it. Guess at them instead, and you get a loop that runs forever or a search that misses the very element it is standing on.',

    whyItExists:
      'Scanning a sorted collection linearly throws away the ordering you paid to create. Binary search converts that ordering into a logarithmic lookup, which is the difference between 500,000 comparisons and 20 on a million-element array, and the same idea generalises to searching the space of possible answers whenever feasibility is cheap to check and monotone.',

    analogy: {
      scenario:
        'A friend picks a whole number between 1 and 100 and you must find it, being told after each guess only whether you are too high or too low. Guessing 1, 2, 3 in turn takes up to a hundred questions. Guessing 50 first halves the field immediately: if the answer is higher, everything from 1 to 50 is gone in a single question. Keep halving and seven questions always suffice, because two to the power seven exceeds a hundred. The discipline that makes it work is bookkeeping: after each answer you must know exactly which numbers are still possible. If you are told "higher than 50" and you keep 50 in the range, you can end up asking about it forever; if you drop 51 as well, you can lose the answer entirely.',
      mapping: [
        { from: 'The range of numbers still possible', to: 'The interval [lo, hi] — the loop invariant' },
        { from: 'Guessing the middle', to: 'mid = lo + (hi - lo) // 2' },
        { from: '"Too low" — discard everything up to and including the guess', to: 'lo = mid + 1' },
        { from: '"Too high" — discard the guess and everything above', to: 'hi = mid - 1' },
        { from: 'Running out of possible numbers', to: 'lo > hi, meaning the target is absent, with lo being its insertion point' },
        { from: 'Seven questions for a hundred numbers', to: 'ceil(log2 n) comparisons' },
      ],
      bridge:
        'The "keep 50 in the range after being told higher" mistake is precisely the infinite loop that catches everyone: if a branch can leave lo and hi unchanged, the search never terminates, and with integer division rounding down it is the lo = mid branch that does it. Requiring every branch to strictly shrink the interval is not a stylistic preference, it is the termination proof. The other half — never discarding a value that could still be the answer — is the correctness proof. Every off-by-one argument in binary search is one of those two statements in disguise.',
      limitations:
        'The guessing game has a total order and a free comparison, which is not always true. On disk or over a network, each probe costs a random seek, so a B-tree with a high branching factor beats binary search on a sorted file despite the same asymptotics; and on an array in RAM, a linear scan of a few dozen elements often beats binary search outright because it is cache-friendly and branch-predictable, which is why real implementations switch to a scan below a threshold.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Halving the interval',
        caption: 'Pick a target and step through: watch lo, hi and mid move, and count the comparisons against a linear scan.',
        widget: 'number-line-binary-search',
        props: { array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target: 23 },
      },
      {
        kind: 'ascii',
        title: 'Searching for 23 in a ten-element array',
        caption: 'Three comparisons instead of six. The brackets mark the live interval at each step.',
        art: `index:   0   1   2    3    4    5    6    7    8    9
array:   2   5   8   12   16   23   38   56   72   91

step 1  [ 2   5   8   12   16*  23   38   56   72   91 ]   mid=4, 16 < 23 -> go right
step 2                          [ 23   38   56*  72   91 ] mid=7, 56 > 23 -> go left
step 3                          [ 23*  38 ]                mid=5, 23 = 23 -> found

comparisons: 3        linear scan would take 6
log2(10) = 3.32, so ceil = 4 is the worst case`,
      },
      {
        kind: 'flow',
        title: 'Deriving the code from the invariant',
        caption: 'Write the promise first and the plus-ones stop being guesswork.',
        steps: [
          { label: 'State the invariant', detail: 'If the target is present, its index is in [lo, hi]. That single sentence determines everything that follows.' },
          { label: 'Initialise so the invariant is true', detail: 'lo = 0 and hi = n - 1 covers the whole array, so the promise holds before the first iteration.' },
          { label: 'Loop while the interval is non-empty', detail: 'lo <= hi, because [lo, hi] with lo == hi still contains one candidate that has not been examined.' },
          { label: 'Probe the middle', detail: 'mid = lo + (hi - lo) // 2, which is identical to (lo + hi) // 2 in Python but avoids overflow in fixed-width languages.' },
          { label: 'Restore the invariant, strictly shrinking', detail: 'If a[mid] < target, everything up to mid is too small: lo = mid + 1. If a[mid] > target, hi = mid - 1. Both exclude mid, so the interval always shrinks and the loop must terminate.' },
          { label: 'Read the exit condition', detail: 'Falling out means lo > hi, so the interval is empty and by the invariant the target is absent. lo is then exactly where it would be inserted — which is what bisect_left returns.' },
        ],
      },
      {
        kind: 'table',
        title: 'The three variants and when to use each',
        caption: 'a is sorted ascending. Getting the variant right matters more than micro-optimising the loop.',
        columns: ['Question', 'Variant', 'Bounds and condition', 'Returns'],
        rows: [
          ['Is x present, and where?', 'Exact match', '[0, n-1], while lo <= hi, exclude mid', 'An index of x, or -1'],
          ['Where would x be inserted, before its equals?', 'Lower bound (bisect_left)', '[0, n), while lo < hi, hi = mid', 'First index with a[i] >= x'],
          ['Where would x be inserted, after its equals?', 'Upper bound (bisect_right)', '[0, n), while lo < hi, hi = mid', 'First index with a[i] > x'],
          ['How many copies of x are there?', 'Both bounds', 'bisect_right - bisect_left', 'A count, in O(log n)'],
          ['Smallest feasible capacity / speed / size', 'Search on the answer', '[min possible, max possible], predicate is monotone', 'The boundary value'],
        ],
      },
      {
        kind: 'compare',
        title: 'Searching an array versus searching the answer',
        caption: 'Same halving, different search space. The second is what interview questions are usually testing.',
        left: {
          heading: 'Binary search on an array',
          points: [
            'The space is indices 0 to n-1',
            'The comparison is a[mid] against the target',
            'Requires the array to be sorted',
            'O(log n) comparisons, O(1) space',
          ],
        },
        right: {
          heading: 'Binary search on the answer',
          points: [
            'The space is every candidate answer, e.g. capacities from max(w) to sum(w)',
            'The comparison is a feasibility check: can we do it with capacity mid?',
            'Requires the predicate to be monotone in the candidate',
            'O(log(range) * cost of one check)',
          ],
        },
      },
    ],

    formalDefinition:
      'Binary search locates a target in a sequence sorted by a total order by repeatedly maintaining an interval of candidate positions and halving it: at each step it compares the target with the element at the midpoint and discards the half that the ordering proves cannot contain the target. With the invariant "if the target is present its index lies in [lo, hi]", the interval strictly shrinks each iteration, so the algorithm terminates after at most floor(log2 n) + 1 comparisons, giving O(log n) time and O(1) auxiliary space in its iterative form. Generalised, binary search finds the boundary of any monotone predicate p over a totally ordered domain — the least x with p(x) true — which is what licenses searching a space of candidate answers rather than an array of stored values.',

    math: {
      intuition:
        'Each comparison discards half the remaining candidates, so the question "how many comparisons?" is really "how many times can you halve n before reaching one?" — which is the definition of a base-two logarithm. The growth is so slow that doubling the data costs exactly one extra comparison, and that is the whole reason sorted structures are worth their maintenance cost. The information-theoretic view says the same thing from the other side: a yes/no comparison yields one bit, distinguishing n possibilities needs log2 n bits, so no comparison-based search can do better.',
      formulas: [
        {
          latex: 'T(n) = T(n/2) + O(1) \\;\\Longrightarrow\\; T(n) = O(\\log_2 n)',
          name: 'The binary search recurrence',
          meaning: 'One constant-time comparison plus a search of half the data. The recursion tree is a single chain of depth log2 n, which is both the time and, in the recursive form, the stack depth.',
          category: 'complexity',
          variables: [
            { symbol: 'T(n)', meaning: 'Comparisons needed on an interval of n candidates' },
            { symbol: 'n/2', meaning: 'The surviving half after one comparison' },
          ],
        },
        {
          latex: '\\text{comparisons} \\le \\lfloor \\log_2 n \\rfloor + 1',
          name: 'Exact worst-case bound',
          meaning: 'For n = 10 that is 4; for a million, 20; for a billion, 30. Doubling n adds exactly one comparison.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of elements in the sorted range' },
          ],
        },
        {
          latex: '\\text{sorted once, searched } k \\text{ times: } O(n \\log n) + k\\,O(\\log n) \\;<\\; k\\,O(n) \\iff k \\gtrsim \\log n',
          name: 'When sorting first pays for itself',
          meaning: 'The break-even analysis that decides between a linear scan and sort-then-search: the sort is amortised across queries, so a handful of lookups favours scanning and many lookups favour sorting — or a hash table, if you need only equality.',
          category: 'complexity',
          variables: [
            { symbol: 'k', meaning: 'Number of searches performed against the same data' },
            { symbol: 'n', meaning: 'Number of elements' },
          ],
        },
        {
          latex: 'p \\text{ monotone on } [lo, hi] \\;\\Longrightarrow\\; \\exists!\\, x^{*} : p(x) \\text{ false for } x < x^{*},\\; \\text{true for } x \\ge x^{*}',
          name: 'The boundary of a monotone predicate',
          meaning: 'Formalises binary search on the answer: monotonicity guarantees a unique switching point, and the search finds it in log2(range) evaluations of the predicate.',
          category: 'complexity',
          variables: [
            { symbol: 'p', meaning: 'The feasibility check, e.g. "can all packages ship within D days at capacity x?"' },
            { symbol: 'x^{*}', meaning: 'The answer: the least feasible candidate' },
          ],
        },
      ],
      derivation: [
        'Start with n candidates. After one comparison at most ceil(n/2) remain, because mid is excluded from both branches.',
        'After k comparisons at most n / 2^k remain.',
        'The loop ends when fewer than one candidate remains: n / 2^k < 1, that is 2^k > n.',
        'Taking base-two logarithms, k > log2 n, so k = floor(log2 n) + 1 comparisons suffice in the worst case.',
        'For n = 1,000,000 that is 20; for n = 1,000,000,000 it is 30. A linear scan would need 500,000 and 500,000,000 respectively on average.',
        'The lower bound matches: each comparison returns one of two outcomes, so k comparisons distinguish at most 2^k arrangements, and distinguishing n positions requires 2^k >= n. Binary search is therefore optimal among comparison-based searches.',
      ],
    },

    workedExample: {
      title: 'Two searches traced by hand, one hit and one miss',
      setup:
        'The array a = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], with indices 0 to 9. Use the exact-match variant: lo = 0, hi = 9, loop while lo <= hi, mid = lo + (hi - lo) // 2, and both branches exclude mid. Search first for 23, which is present, and then for 40, which is not, and watch what the failed search leaves behind.',
      steps: [
        { label: 'Search 23 — initialise', detail: 'lo = 0, hi = 9. Invariant: if 23 is in the array, its index is in [0, 9]. Trivially true.' },
        { label: 'Iteration 1', detail: 'mid = 0 + (9 - 0) // 2 = 4, a[4] = 16. Since 16 < 23, every index 0 to 4 holds a value at most 16 and can be discarded: lo = 5. Live interval [5, 9], five candidates left.' },
        { label: 'Iteration 2', detail: 'mid = 5 + (9 - 5) // 2 = 7, a[7] = 56. Since 56 > 23, indices 7 to 9 are too large: hi = 6. Live interval [5, 6], two candidates.' },
        { label: 'Iteration 3', detail: 'mid = 5 + (6 - 5) // 2 = 5, a[5] = 23. Match — return 5. Three comparisons, against six for a left-to-right scan, and against the worst case of floor(log2 10) + 1 = 4.', latex: '\\lfloor \\log_2 10 \\rfloor + 1 = 4' },
        { label: 'Search 40 — iterations 1 and 2', detail: 'Identical to before: mid = 4 gives 16 < 40 so lo = 5; mid = 7 gives 56 > 40 so hi = 6. Live interval [5, 6].' },
        { label: 'Iteration 3', detail: 'mid = 5, a[5] = 23 < 40, so lo = 6. Live interval [6, 6] — still non-empty, which is exactly why the loop condition must be lo <= hi and not lo < hi. Using the strict condition here would exit now and miss a candidate that has never been examined.' },
        { label: 'Iteration 4', detail: 'mid = 6, a[6] = 38 < 40, so lo = 7. Now lo = 7 > hi = 6, the interval is empty, and the loop exits: 40 is absent.' },
        { label: 'What the failure left behind', detail: 'lo = 7 is the insertion point: a[6] = 38 is the last value below 40 and a[7] = 56 is the first above it, so inserting 40 at index 7 keeps the array sorted. bisect.bisect_left(a, 40) returns exactly 7. A search that returns -1 has thrown this away.' },
        { label: 'Why every branch must exclude mid', detail: 'Suppose iteration 1 had set lo = mid instead of mid + 1. With lo = 4 and hi = 9, mid becomes 6, then the interval [6, 9] gives mid 7, and on an interval of size two, mid = lo, so lo = mid leaves lo and hi untouched and the loop spins forever. Integer division rounds down, so mid can equal lo but never hi — which is precisely why lo = mid hangs and hi = mid does not.' },
        { label: 'Now search the answer instead of the array', detail: 'Ship weights [1..10] must go out in order within 5 days; find the smallest daily capacity. The candidate range is [max(w), sum(w)] = [10, 55], since capacity below 10 cannot carry the heaviest package and 55 ships everything in one day. The predicate "5 days suffice at capacity x" is monotone: more capacity never needs more days.' },
        { label: 'Halving the capacity range', detail: 'mid = 32 needs 2 days — feasible, so nothing above 32 can be the answer: hi = 32. mid = 21 needs 3 days: hi = 21. mid = 15 needs exactly 5 days: hi = 15. mid = 12 needs 6 days — infeasible, so lo = 13. mid = 14 needs 6 days: lo = 15. Now lo = hi = 15 and the loop ends.', latex: '\\lceil \\log_2 (55 - 10) \\rceil = 6 \\text{ probes}' },
        { label: 'Check the boundary', detail: 'Capacity 14 needs 6 days and capacity 15 needs 5, so 15 is exactly the switching point of the predicate. Note the update rule here is hi = mid, not mid - 1: a feasible mid might itself be the answer and must not be discarded, which is the half-open form and the reason this variant uses while lo < hi.' },
      ],
      conclusion:
        'Both searches cost O(log n): three and four comparisons on ten elements, against a worst case of floor(log2 10) + 1 = 4, and O(1) extra space since only three integers are kept. The generalisation costs O(log(range) * cost of one predicate evaluation): six probes over a capacity range of 45, each costing an O(n) simulation, so O(n log(sum of weights)) overall — trivial compared with trying every capacity. Three rules carry all of it. The invariant says which positions are still candidates; every branch must shrink the interval strictly, or the loop hangs; and the exit state is informative — lo is the insertion point of a missing element, and the switching point of a monotone predicate. Note also that the two variants use different loop conditions on purpose: exact match keeps lo <= hi with both branches excluding mid, while boundary-finding uses lo < hi with hi = mid, because a candidate that satisfies the predicate may be the answer itself.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Exact match, traced',
        runnable: true,
        code: `def binary_search(a, target, verbose=False):
    lo, hi = 0, len(a) - 1        # invariant: if present, target is in a[lo..hi]
    while lo <= hi:               # <= : [lo, lo] still holds an unexamined candidate
        mid = lo + (hi - lo) // 2 # same as (lo + hi)//2 here, overflow-safe elsewhere
        if verbose:
            print(f"  lo={lo} hi={hi} mid={mid} a[mid]={a[mid]}")
        if a[mid] == target:
            return mid
        if a[mid] < target:
            lo = mid + 1          # a[mid] and everything left of it is too small
        else:
            hi = mid - 1          # a[mid] and everything right of it is too large
    return -1                     # lo is now the insertion point

a = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("find 23 ->", binary_search(a, 23, verbose=True))
print("find 40 ->", binary_search(a, 40, verbose=True))`,
        output: `  lo=0 hi=9 mid=4 a[mid]=16
  lo=5 hi=9 mid=7 a[mid]=56
  lo=5 hi=6 mid=5 a[mid]=23
find 23 -> 5
  lo=0 hi=9 mid=4 a[mid]=16
  lo=5 hi=9 mid=7 a[mid]=56
  lo=5 hi=6 mid=5 a[mid]=23
  lo=6 hi=6 mid=6 a[mid]=38
find 40 -> -1`,
        explanation:
          'Every line follows from the invariant. hi starts at n - 1 because the interval is closed at both ends; the condition is lo <= hi because an interval of one element still contains an unexamined candidate; and both updates use mid plus or minus one because a[mid] has just been ruled out, which is also what guarantees the interval strictly shrinks and the loop terminates. The mid formula matters outside Python: in Java or C, (lo + hi) can overflow a 32-bit int on a large array, a bug that sat in the JDK\'s own binary search for nine years. Note the miss costs one comparison more than the hit, and ends with lo = 7, the correct insertion point — information this function throws away and bisect_left keeps.',
      },
      {
        language: 'python',
        title: 'bisect: the version you should actually use',
        runnable: true,
        code: `import bisect

a = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("bisect_left(a, 40) =", bisect.bisect_left(a, 40))   # insertion point for a miss
print("bisect_left(a, 23) =", bisect.bisect_left(a, 23))   # index of an existing value

dups = [1, 3, 3, 3, 3, 7, 9]
lo = bisect.bisect_left(dups, 3)
hi = bisect.bisect_right(dups, 3)
print(f"3 occupies [{lo}, {hi}) -> {hi - lo} copies")

grades = [60, 70, 80, 90]
labels = ["F", "D", "C", "B", "A"]
for score in (55, 60, 79, 90, 100):
    print(score, "->", labels[bisect.bisect_right(grades, score)])`,
        output: `bisect_left(a, 40) = 7
bisect_left(a, 23) = 5
3 occupies [1, 5) -> 4 copies
55 -> F
60 -> D
79 -> C
90 -> A
100 -> A`,
        explanation:
          'bisect is a C implementation of the half-open variant, and reaching for it removes an entire category of bug from your code. Three idioms are worth memorising. Testing presence is i = bisect_left(a, x); found = i < len(a) and a[i] == x — the length check is not optional, since a value larger than everything returns len(a). Counting duplicates is bisect_right minus bisect_left, in O(log n) rather than a scan. And bucketing a value into ranges is a single bisect_right into the boundary list, which is how pandas.cut and histogram binning work; note that bisect_right puts a score of exactly 60 into the D bucket, so which of bisect_left and bisect_right you choose is a decision about whether boundaries are inclusive.',
      },
      {
        language: 'python',
        title: 'Binary search on the answer: minimum shipping capacity',
        runnable: true,
        code: `def days_needed(weights, capacity):
    days, load = 1, 0
    for w in weights:                      # packages must ship in the given order
        if load + w > capacity:
            days += 1
            load = 0
        load += w
    return days

def min_capacity(weights, deadline, verbose=False):
    lo, hi = max(weights), sum(weights)    # invariant: the answer lies in [lo, hi]
    while lo < hi:                         # half-open: hi is itself a live candidate
        mid = (lo + hi) // 2
        d = days_needed(weights, mid)
        if verbose:
            print(f"  lo={lo} hi={hi} mid={mid} -> {d} days "
                  f"({'feasible' if d <= deadline else 'too slow'})")
        if d <= deadline:
            hi = mid                       # mid works; something smaller might too
        else:
            lo = mid + 1                   # mid fails, so does anything smaller
    return lo

w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("minimum capacity:", min_capacity(w, 5, verbose=True))
print("checks:", [(c, days_needed(w, c)) for c in (14, 15, 16)])`,
        output: `  lo=10 hi=55 mid=32 -> 2 days (feasible)
  lo=10 hi=32 mid=21 -> 3 days (feasible)
  lo=10 hi=21 mid=15 -> 5 days (feasible)
  lo=10 hi=15 mid=12 -> 6 days (too slow)
  lo=13 hi=15 mid=14 -> 6 days (too slow)
minimum capacity: 15`,
        explanation:
          'There is no array here at all: the search space is the range of candidate capacities, and the comparison is a simulation. The three things to get right are the bounds — max(weights) because nothing smaller can carry the heaviest item, sum(weights) because that always finishes in one day — the monotonicity, since more capacity can never need more days, and the asymmetric update, hi = mid rather than mid - 1, because a feasible candidate may be the answer itself. Cost is O(n log(sum of weights)): six evaluations of an O(n) check. This shape covers a whole family of problems — minimum eating speed, smallest largest partition sum, maximum minimum distance, and capacity planning for real services — and the giveaway is always a question asking for the smallest or largest value such that some property holds.',
      },
      {
        language: 'python',
        title: 'The infinite loop, demonstrated',
        runnable: true,
        code: `def broken(a, t, budget=6):
    lo, hi = 0, len(a) - 1
    steps = 0
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < t:
            lo = mid            # BUG: mid stays inside the live interval
        else:
            hi = mid
        steps += 1
        print(f"  step {steps}: lo={lo} hi={hi} mid={mid}")
        if steps == budget:
            print("  ...still going: lo and hi never meet")
            return None
    return lo

broken([1, 3, 5, 7], 7)`,
        output: `  step 1: lo=1 hi=3 mid=1
  step 2: lo=2 hi=3 mid=2
  step 3: lo=2 hi=3 mid=2
  step 4: lo=2 hi=3 mid=2
  step 5: lo=2 hi=3 mid=2
  step 6: lo=2 hi=3 mid=2
  ...still going: lo and hi never meet`,
        explanation:
          'Once the interval narrows to two elements, integer division makes mid equal lo, so lo = mid is a no-op and the state never changes again. The asymmetry is the thing to internalise: because // rounds down, mid can equal lo but never hi, which is why hi = mid is safe in the half-open variant while lo = mid always hangs. The correct pairs are lo = mid + 1 with hi = mid for lower-bound searches, or lo = mid + 1 with hi = mid - 1 for exact match. If a problem genuinely needs lo = mid — searching for the last feasible value rather than the first — bias the midpoint upwards with mid = lo + (hi - lo + 1) // 2, which makes mid equal hi instead and restores termination.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Database indexes and log-structured storage',
        usage:
          'A B-tree index is binary search generalised to a high branching factor so that each probe reads one disk page rather than one element, and every sorted SSTable in RocksDB, Cassandra or a Parquet row group is searched by bisection over its index block. The asymptotics are the same; the branching factor is chosen to match the block size.',
      },
      {
        context: 'Sampling from a categorical distribution',
        usage:
          'Drawing a token from a language model\'s output distribution means taking the cumulative sum of the probabilities and binary searching it with a uniform random number, which is exactly np.searchsorted. Nucleus sampling additionally uses a bisection over the sorted cumulative probabilities to find the top-p cutoff.',
      },
      {
        context: 'Capacity planning and hyperparameter tuning by bisection',
        usage:
          'Finding the largest batch size that fits in GPU memory, or the smallest number of replicas that holds latency under a service-level objective, is binary search on the answer with an experiment as the predicate — valid precisely because the property is monotone, and worth stating out loud because non-monotone metrics quietly break it.',
      },
      {
        context: 'git bisect',
        usage:
          'Finding the commit that introduced a bug is binary search over history with the test suite as the predicate, taking about ten builds to isolate one commit among a thousand. It relies on the same monotonicity assumption: that the bug, once introduced, stays present.',
      },
    ],

    projectConnections: [
      { tool: 'bisect', role: 'The standard library\'s correct implementation. bisect_left, bisect_right and insort cover almost every array-search need, and the key= parameter added in Python 3.10 handles sorting by a derived value.' },
      { tool: 'numpy.searchsorted', role: 'Vectorised binary search over a sorted array for a whole array of queries at once — the workhorse behind histogram binning, digitisation and cumulative-distribution sampling.' },
      { tool: 'pandas', role: 'A sorted index uses binary search for .loc lookups and slices, which is why is_monotonic_increasing on an index is worth checking when lookups seem slow.' },
      { tool: 'sortedcontainers', role: 'SortedList and SortedDict keep a collection sorted with O(log n) insertion and bisect-style queries, for when the data changes between searches.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing lo = mid instead of lo = mid + 1',
        why: 'Integer division rounds down, so on a two-element interval mid equals lo. The assignment changes nothing, the loop state repeats forever, and the process hangs rather than crashing — the worst failure mode to diagnose in production.',
        fix: 'Require every branch to strictly shrink the interval. Use lo = mid + 1 with hi = mid, or bias the midpoint upwards with mid = lo + (hi - lo + 1) // 2 when you genuinely need lo = mid.',
      },
      {
        mistake: 'Mismatching the loop condition and the bounds',
        why: 'Closed bounds [0, n-1] need lo <= hi; half-open bounds [0, n) need lo < hi. Mixing them either exits with an unexamined candidate still live — missing an element that is present — or dereferences a[n] and raises IndexError.',
        fix: 'Pick one convention and derive the rest from it. Half-open with hi = len(a) and while lo < hi is the form that generalises to the bisect variants, so prefer it.',
      },
      {
        mistake: 'Binary searching data that is not sorted, or sorted by a different key',
        why: 'The result is not an error but a wrong answer: the comparison discards a half that may contain the target, and the function reports "absent" for a value sitting in the array. Sorting by name and searching by date is the same bug wearing a disguise.',
        fix: 'Assert the precondition in development, or sort once and document the invariant. When you need lookups by several keys, keep a hash index per key rather than re-sorting.',
      },
      {
        mistake: 'Assuming bisect_left tells you the value is present',
        why: 'It returns an insertion point, which for a value larger than everything is len(a). Indexing a[i] straight away raises IndexError, and comparing without a length guard is a latent crash on the largest input.',
        fix: 'Use i = bisect_left(a, x); found = i < len(a) and a[i] == x. Write it once as a helper rather than inline at every call site.',
      },
      {
        mistake: 'Applying binary search on the answer to a non-monotone predicate',
        why: 'The method finds a boundary, and if the predicate switches back and forth there is no single boundary to find. The search returns one of the switching points, silently, with no indication that it is not the optimum.',
        fix: 'State the monotonicity explicitly — "if x works then x + 1 works" — and test it on a sample of the range. If it does not hold, use ternary search for a unimodal function, or a proper optimiser.',
      },
      {
        mistake: 'Reaching for binary search on a small or unsorted-in-cache array',
        why: 'Below a few dozen elements, a linear scan wins: it is branch-predictable and reads contiguous cache lines, while binary search jumps about and mispredicts almost every branch. Sorting first to enable one search is also a clear loss, at O(n log n) against O(n).',
        fix: 'Scan below a threshold — real implementations of sort and search do exactly this — and sort only when the data will be searched many times, or use a hash table when you need equality lookups rather than order.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Write binary search and explain how you decide between mid + 1, mid - 1 and mid.',
        answer:
          'I write the invariant down first: if the target is present, its index lies in [lo, hi]. That fixes the initialisation to lo = 0, hi = n - 1, the loop condition to lo <= hi since a one-element interval still holds an unexamined candidate, and both updates to exclude mid — lo = mid + 1 when a[mid] is too small, hi = mid - 1 when it is too large — because the comparison has just ruled mid out. Excluding mid also guarantees the interval strictly shrinks, which is the termination proof. For the boundary variants the invariant changes and so do the updates: searching for the first index with a[i] >= x, I use half-open bounds [0, n) with while lo < hi and hi = mid rather than mid - 1, because a candidate satisfying the predicate might itself be the answer and must stay live. The asymmetry between hi = mid, which is safe, and lo = mid, which hangs, comes from integer division rounding down so mid can equal lo but never hi. I would also mention mid = lo + (hi - lo) // 2 for languages with fixed-width integers, and that in Python I would just call bisect.',
        followUp:
          'Asking what the function should return when the value is absent tests whether they know the exit value of lo is the insertion point.',
      },
      {
        level: 'intermediate',
        question: 'Given a sorted array with duplicates, return the first and last index of a target in O(log n). How?',
        answer:
          'Two binary searches with different tie-breaking. The first index is the lower bound: search for the first position where a[i] >= target, and check that a[i] actually equals it. The last index is the upper bound minus one: find the first position where a[i] > target and step back. In Python that is bisect_left and bisect_right, and the count of occurrences is simply their difference. Written by hand, the difference is what happens on equality: for the lower bound, a[mid] == target sets hi = mid, keeping mid live because an earlier copy may exist; for the upper bound, equality sets lo = mid + 1, pushing past the run. The naive alternative — find any occurrence, then walk outwards — is O(log n + k) where k is the number of duplicates, which degrades to O(n) on an array that is entirely one value, and that is precisely the case an interviewer will test. Total cost is two O(log n) searches with O(1) space, and the pair of bounds generalises directly to range queries on a sorted column.',
        followUp:
          'A strong candidate notes that this is how a range predicate on a sorted database index is evaluated: two bisections delimiting a contiguous block.',
      },
      {
        level: 'ml-engineer',
        question: 'You must find the largest batch size that trains without an out-of-memory error. Describe your approach and its assumptions.',
        answer:
          'Binary search on the answer, with a short training step as the predicate. The range is [1, some batch size that certainly fails], which I would find first by doubling from a known-good value — exponential search — so I do not have to guess an upper bound. Then bisect: if batch size mid runs a few steps without an out-of-memory error, it becomes the new lower bound; if it fails, the new upper bound. About ten to twelve probes cover a range up to a few thousand, which is a handful of minutes rather than a sweep. The assumption is monotonicity: if batch size b fits, every smaller one fits. That is nearly true, since activation memory grows with batch size, but there are honest exceptions worth stating — cuDNN or Flash Attention may pick a different algorithm with a different workspace at particular sizes, memory fragmentation makes failures non-deterministic, and gradient checkpointing or variable sequence lengths change the picture entirely. So I would clear the allocator cache between probes, run several steps rather than one to catch a peak that only appears at optimiser step time, and take roughly ninety per cent of the discovered maximum as the value I actually ship.',
        followUp:
          'Mentioning exponential search to establish the upper bound, and the safety margin for fragmentation, is what distinguishes a practical answer from a textbook one.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Implement bisect_left yourself, then explain in one sentence why its loop condition and updates differ from the exact-match version.',
        hint: 'Use half-open bounds and let the equality case keep mid alive.',
        solution:
          'def bisect_left(a, x):\n    lo, hi = 0, len(a)          # half-open: hi is one past the last candidate\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if a[mid] < x:\n            lo = mid + 1        # a[mid] is strictly too small: never the answer\n        else:\n            hi = mid            # a[mid] >= x: mid may BE the answer, keep it live\n    return lo\n\nThe difference is what the code is looking for. Exact match is hunting one specific position and can discard mid the moment it compares unequal, so both updates step past it and the loop runs while lo <= hi. Lower bound is hunting a boundary, and a candidate satisfying a[mid] >= x is itself a legitimate answer, so the update must be hi = mid rather than mid - 1 — which forces the half-open convention and the strict loop condition, because [lo, lo) is genuinely empty. Termination still holds: the lo branch adds one, and the hi branch strictly decreases hi since mid < hi always. The return value is meaningful whether or not x is present: it is the index of the first element not less than x, equal to len(a) when x exceeds everything.',
      },
      {
        prompt: 'Find the minimum element of an array that was sorted ascending and then rotated an unknown number of positions, for example [16, 23, 38, 2, 5, 8, 12], in O(log n).',
        hint: 'Compare the midpoint with the right end rather than with a target value.',
        solution:
          'def find_min_rotated(a):\n    lo, hi = 0, len(a) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if a[mid] > a[hi]:\n            lo = mid + 1     # the rotation point is strictly right of mid\n        else:\n            hi = mid         # mid could be the minimum itself\n    return a[lo]\n\nThe trick is that there is no target to compare against, so the predicate is about structure: a[mid] > a[hi] means the segment from mid to hi is not sorted, which can only happen if the rotation point lies in (mid, hi], so lo = mid + 1. Otherwise mid to hi is sorted and the minimum is at mid or to its left, so hi = mid keeps mid live. Comparing with a[lo] instead does not work, because a rotation of zero makes a[mid] > a[lo] on a perfectly sorted array and sends the search the wrong way. Cost is O(log n) time, O(1) space. With duplicates the bound degrades to O(n) in the worst case — for [2, 2, 2, 1, 2] no comparison distinguishes the halves, and the standard fix of decrementing hi when a[mid] == a[hi] is correct but linear on an all-equal array.',
      },
      {
        prompt: 'A monotonically increasing function f is expensive to evaluate and defined on integers 1 to 10^9. Find the largest x with f(x) <= T, using as few evaluations as possible, without any array.',
        hint: 'You are looking for the last true rather than the first true, which changes how you pick the midpoint.',
        solution:
          'def last_true(lo, hi, ok):\n    """Largest x in [lo, hi] with ok(x) true, or lo - 1 if none."""\n    best = lo - 1\n    while lo <= hi:\n        mid = lo + (hi - lo) // 2\n        if ok(mid):\n            best = mid\n            lo = mid + 1     # mid works; look for something bigger\n        else:\n            hi = mid - 1\n    return best\n\nlargest = last_true(1, 10**9, lambda x: f(x) <= T)\n\nThis costs ceil(log2(10^9)) = 30 evaluations of f, regardless of where the boundary sits, and O(1) space. Carrying a `best` variable is the clearest way to write last-true searches: it sidesteps the trap of the symmetric formulation, where lo = mid would be needed and would hang unless the midpoint is biased upwards with mid = lo + (hi - lo + 1) // 2. The only requirement on f is monotonicity — the predicate must switch from true to false exactly once — and it is worth asserting the endpoints first, since if f(1) > T the answer is "none" and if f(10^9) <= T the range was too small. This is the pattern behind rate-limit calibration, learning-rate range tests and any "largest safe value" question.',
      },
    ],

    quiz: [
      {
        id: 'DSA-016-q1',
        type: 'numeric',
        concept: 'logarithmic growth',
        prompt: 'What is the maximum number of comparisons binary search needs on a sorted array of 1,000,000 elements?',
        answer: 20,
        explanation:
          'floor(log2 1,000,000) + 1 = 19 + 1 = 20, since 2^20 = 1,048,576 exceeds a million. A linear scan would average 500,000 comparisons, and doubling the array adds exactly one comparison.',
      },
      {
        id: 'DSA-016-q2',
        type: 'debug',
        language: 'python',
        concept: 'infinite loop',
        prompt: 'This search hangs on some inputs. Which line is responsible?',
        code: `while lo < hi:
    mid = (lo + hi) // 2
    if a[mid] < t:
        lo = mid
    else:
        hi = mid`,
        options: [
          'lo = mid — integer division makes mid equal lo on a two-element interval, so the state never changes',
          'hi = mid should be hi = mid - 1',
          'The condition should be lo <= hi',
          'mid must be computed as lo + (hi - lo) // 2 to avoid overflow',
        ],
        answerIndex: 0,
        explanation:
          'Because // rounds down, mid can equal lo but never hi. So hi = mid always shrinks the interval while lo = mid may be a no-op, leaving lo and hi frozen and the loop spinning. The fix is lo = mid + 1.',
      },
      {
        id: 'DSA-016-q3',
        type: 'mcq',
        concept: 'bisect semantics',
        prompt: 'For a = [1, 3, 3, 3, 3, 7, 9], what do bisect_left(a, 3) and bisect_right(a, 3) return?',
        options: [
          '1 and 5',
          '1 and 4',
          '2 and 5',
          '0 and 5',
        ],
        answerIndex: 0,
        explanation:
          'bisect_left gives the first index where 3 could be inserted while keeping order, which is 1; bisect_right gives one past the last 3, which is 5. Their difference, 4, is the number of copies, computed in O(log n).',
      },
      {
        id: 'DSA-016-q4',
        type: 'truefalse',
        concept: 'preconditions',
        prompt: 'Binary search on an unsorted array returns the wrong answer rather than raising an error.',
        answer: true,
        explanation:
          'Each comparison discards a half based on an ordering that does not hold, so the target can sit in the discarded half. The function reports "absent" for a value that is present, silently — which is why the sortedness precondition deserves an assertion.',
      },
      {
        id: 'DSA-016-q5',
        type: 'order',
        concept: 'binary search on the answer',
        prompt: 'Order the steps for solving "find the smallest capacity that ships everything within D days".',
        items: [
          'Identify the range of candidate answers: lo = max(weight), hi = sum(weights)',
          'Write a feasibility check: how many days does capacity x need?',
          'Confirm the check is monotone — more capacity never needs more days',
          'Bisect the candidate range, moving hi = mid on success and lo = mid + 1 on failure',
          'Return lo, the smallest feasible capacity',
        ],
        explanation:
          'The bounds and the monotonicity argument are the real work; the bisection itself is mechanical. Note hi = mid rather than mid - 1, because a feasible candidate may itself be the answer.',
      },
      {
        id: 'DSA-016-q6',
        type: 'explain',
        concept: 'invariant-driven implementation',
        prompt: 'Explain how stating a loop invariant removes the guesswork from binary search\'s plus-ones and minus-ones.',
        rubric: [
          'States an invariant, such as "if the target is present its index lies in [lo, hi]", and derives the initial bounds from it',
          'Derives the loop condition from when the interval becomes empty, and the updates from what the comparison has just ruled out',
          'Connects strict shrinking to termination, and explains why lo = mid hangs while hi = mid does not',
        ],
        sampleAnswer:
          'The invariant is a promise about which positions could still hold the answer, and every other decision falls out of it. If the promise is "the target, if present, is in the closed interval [lo, hi]", then lo starts at 0 and hi at n - 1 so the promise holds initially; the loop runs while lo <= hi, because [lo, lo] still contains one candidate nobody has examined; and after comparing a[mid], the branch must exclude mid, since the comparison has just proved mid is not the answer — giving lo = mid + 1 and hi = mid - 1. Exiting means lo > hi, an empty interval, so by the invariant the target is absent and lo is exactly its insertion point. Termination is the same argument seen from the other side: because both branches exclude mid, the interval strictly shrinks every iteration and cannot repeat. That is why lo = mid is fatal — integer division rounds down, so on a two-element interval mid equals lo and the assignment changes nothing, while hi = mid always shrinks because mid is strictly less than hi. If instead I am searching for a boundary, the invariant changes to "the answer is in [lo, hi)" and a candidate satisfying the predicate stays live, so the updates become hi = mid and lo = mid + 1 with the loop running while lo < hi. Different invariant, different code, same derivation.',
      },
    ],

    flashcards: [
      { front: 'What is the loop invariant of binary search?', back: 'If the target is present, its index lies inside the current interval. Initialisation, loop condition and both updates are all derived from that one statement.' },
      { front: 'Why does lo = mid cause an infinite loop?', back: 'Integer division rounds down, so on a two-element interval mid equals lo. The assignment changes nothing and the state repeats forever. hi = mid is safe because mid is always strictly less than hi.' },
      { front: 'bisect_left versus bisect_right?', back: 'bisect_left returns the first index where the value could be inserted, so the start of an equal run; bisect_right returns one past its end. Their difference counts duplicates in O(log n).' },
      { front: 'How many comparisons for n elements?', back: 'At most floor(log2 n) + 1: 20 for a million, 30 for a billion. Doubling n adds exactly one comparison.' },
      { front: 'What does a failed binary search leave in lo?', back: 'The insertion point — the index at which the missing value would go to keep the array sorted. Returning -1 throws that information away.' },
      { front: 'When can you binary search without an array?', back: 'When the predicate is monotone over a numeric range: once "can we do it with x?" becomes true it stays true. Cost is O(log(range) * cost of one check).' },
    ],

    challenge: {
      title: 'One generic bisection, five problems',
      brief:
        'Write a single helper first_true(lo, hi, predicate) that returns the smallest integer x in [lo, hi] for which predicate(x) is true, or hi + 1 if none is. Then solve five problems by supplying only a predicate: index of a value in a sorted array; square root of n rounded down; minimum shipping capacity within D days; minimum eating speed to finish the piles in H hours; and smallest largest-sum when splitting an array into k contiguous parts.',
      acceptanceCriteria: [
        'first_true uses half-open reasoning, never evaluates the predicate outside [lo, hi], and is proved to terminate because every branch shrinks the interval',
        'Each of the five problems is solved by passing a predicate and bounds only — no second copy of the bisection loop anywhere',
        'For each problem, the monotonicity of the predicate is stated in a comment and justified in one sentence',
        'Each solution reports the number of predicate evaluations and compares it with the size of the candidate range',
        'Includes a property test against brute force on small random inputs for at least three of the five',
      ],
      starterCode: 'from typing import Callable\n\ndef first_true(lo: int, hi: int, predicate: Callable[[int], bool]) -> int:\n    """Smallest x in [lo, hi] with predicate(x) true, else hi + 1.\n    predicate must be monotone: false ... false true ... true."""\n    ...\n\ndef isqrt(n: int) -> int:\n    ...\n',
      language: 'python',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how binary search works, how to get the boundary conditions right, and when it applies to something other than an array.',
      mustCover: [
        'Each comparison discards half the remaining candidates, giving log2 n comparisons — 20 for a million elements',
        'The data must be ordered, and the loop invariant states which positions are still candidates',
        'Every branch must strictly shrink the interval, which is why lo = mid hangs and lo = mid + 1 does not',
        'A failed search leaves the insertion point behind, which is what bisect_left returns',
        'The same halving applies to any monotone predicate, which is binary search on the answer',
      ],
      bonusSignals: [
        'distinguishes bisect_left from bisect_right on duplicates',
        'mentions the overflow-safe midpoint formula',
        'gives a real example of searching the answer, such as batch size or capacity',
        'notes that a linear scan wins on small arrays for cache reasons',
      ],
      sampleExplanation:
        'Binary search is what you do with a dictionary without thinking about it. You open it in the middle, decide whether your word is before or after, and throw away half the book. Because half goes every time, a thousand pages take about ten looks and a million entries take twenty — doubling the data costs one extra look, which is why ordered data is worth the trouble of keeping ordered. Writing it correctly is entirely a matter of bookkeeping. Keep an explicit range of positions that could still hold the answer, and write down that promise before you write the code: if the value is there, it is somewhere between here and here. Then every line follows. You start with the whole array because that is when the promise is trivially true. You keep going while the range still holds a position nobody has looked at. And when you compare against the middle, you throw away the middle too, because you have just proved it is not the answer — which is also what guarantees the range gets smaller every round and the loop ends. That last point is where the classic bug lives: if a branch leaves the range the same size, the program does not crash, it hangs. There is a bonus in the failure case. When the range finally empties, the low end of it is exactly where the missing value would be inserted, so a search that "fails" has actually told you where the value belongs — and that is more useful than a bare "not found". The bigger idea is that nothing here required an array. All the method needs is a question whose answer flips from no to yes once and never flips back. Can this many packages ship in five days at this capacity? Does this batch size fit in memory? Does this commit contain the bug? Each of those is a range and a yes-or-no test, so each can be halved the same way, and thirty tests will pin down an answer anywhere in a billion.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
  {
    id: 'DSA-017',
    domain: 'DSA',
    module: 'Sorting',
    topic: 'Comparison sorts, stability and practical choice',
    title: 'Sorting Algorithms',
    slug: 'sorting-algorithms',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['DSA-001', 'DSA-015'],
    related: ['DSA-003', 'DSA-011', 'DSA-016'],
    tags: ['sorting', 'merge-sort', 'quicksort', 'timsort', 'stability', 'divide-and-conquer', 'nlogn'],

    learningObjectives: [
      'Trace bubble and insertion sort on a small array and explain why both are O(n^2) yet insertion sort is the one real libraries still use',
      'Trace merge sort through its splits and merges, and derive its O(n log n) bound from the recursion tree',
      'Explain quicksort\'s partitioning, why the last-element pivot degrades to O(n^2) on sorted input, and how randomisation or median-of-three fixes it',
      'Define stability precisely, demonstrate why it matters for multi-key sorting, and name which algorithms have it',
      'Justify the Omega(n log n) comparison lower bound, and say when a non-comparison sort such as counting or radix sort legitimately beats it',
      'Choose the right approach for a concrete situation: sorted() versus sort(), a heap for top-k, an external merge for data that does not fit in memory',
    ],

    terminology: [
      {
        term: 'Stability',
        definition:
          'A sort is stable if elements comparing equal keep their original relative order. This is what makes sorting by one key and then another produce a correct composite ordering.',
        simple: 'Ties stay in the order they started in.',
      },
      {
        term: 'In-place',
        definition:
          'Using O(1) or O(log n) extra space beyond the input array. Quicksort is in-place up to its recursion stack; merge sort as usually written needs an O(n) buffer.',
        simple: 'Rearranges the array you were given instead of building a new one.',
      },
      {
        term: 'Partition',
        definition:
          'Quicksort\'s core step: choose a pivot and rearrange the array so everything smaller precedes it and everything larger follows. The pivot is then in its final position, and the two sides are sorted independently.',
        simple: 'Split the pile into "smaller than this one" and "bigger than this one".',
      },
      {
        term: 'Run',
        definition:
          'A maximal already-sorted stretch of the input. Timsort finds runs, extends short ones with insertion sort, and merges them, which is why it is close to linear on partially ordered data.',
        simple: 'A piece that already happens to be in order.',
      },
      {
        term: 'Adaptive sort',
        definition:
          'One whose running time improves on partially sorted input. Insertion sort is O(n + inversions); Timsort inherits that and is O(n) on already-sorted data, while a naive quicksort is not adaptive at all.',
        simple: 'Gets faster when the data is already nearly tidy.',
      },
      {
        term: 'Comparison sort lower bound',
        definition:
          'Any algorithm that orders elements only by comparing pairs needs Omega(n log n) comparisons in the worst case, because a decision tree with n! leaves has height at least log2(n!).',
        simple: 'If comparing is all you can do, n log n is as good as it gets.',
      },
    ],

    simpleExplanation:
      'There are only a few genuinely different ideas for putting things in order, and each one is a strategy you have used with a deck of cards. You can repeatedly sweep along and swap any neighbours in the wrong order, which is bubble sort: simple, and hopeless past a few dozen items. You can pick up cards one at a time and slide each into its right place among the ones already in your hand, which is insertion sort: also quadratic in the worst case, but so fast on small or nearly-ordered inputs that real libraries still use it as a subroutine. You can split the pile in two, sort each half, and then merge the two sorted halves by repeatedly taking the smaller front card, which is merge sort: reliably n log n, and easy to do with piles too big to hold. Or you can pick one card, shove everything smaller to its left and everything bigger to its right, and repeat on each side, which is quicksort: usually the fastest of all, and catastrophic if you keep choosing a card that happens to be the smallest. What Python actually runs is Timsort, which notices the stretches already in order and merges those, making already-sorted data almost free. The practical skill is not implementing these; it is knowing which properties you need — stability, memory, worst-case guarantees — and which algorithm has them.',

    whyItExists:
      'Order is the precondition for cheap access: binary search, range queries, merge joins, deduplication, grouping and top-k all assume it. Sorting is the operation that manufactures order, and because it sits under so much else, the differences between algorithms — worst case versus average, stable versus not, in-place versus buffered — show up as real production behaviour rather than trivia.',

    analogy: {
      scenario:
        'Imagine a library returns trolley of two hundred books that must go back in shelf order. One assistant walks the trolley end to end swapping any adjacent pair out of order, and keeps walking until a full pass produces no swap. Another takes books one at a time and slides each into its correct place in a growing ordered stack. A third splits the trolley into two halves, hands each to a colleague, and then merges the two sorted halves by repeatedly taking whichever of the two front books comes first. A fourth picks one book, has everyone put books that shelve before it on the left and after it on the right, and repeats on each side. The third strategy finishes in predictable time no matter how the trolley started; the fourth is usually the fastest but grinds to a halt if the chosen book is always the very first one on the shelf.',
      mapping: [
        { from: 'Walking the trolley swapping neighbours', to: 'Bubble sort: O(n^2) comparisons, with an early exit when a pass makes no swap' },
        { from: 'Sliding each book into a growing ordered stack', to: 'Insertion sort: O(n + inversions), so nearly linear on nearly-sorted input' },
        { from: 'Splitting, delegating, then merging the two sorted halves', to: 'Merge sort: O(n log n) always, O(n) extra space, stable' },
        { from: 'Choosing one book and splitting around it', to: 'Quicksort: partitioning, O(n log n) expected, O(n^2) if pivots are consistently extreme' },
        { from: 'Two books by the same author in the order the trolley had them', to: 'Stability: equal keys keep their input order' },
        { from: 'Noticing a shelf-ordered run already on the trolley', to: 'Timsort\'s run detection, which makes ordered input O(n)' },
      ],
      bridge:
        'The merge step is the part worth watching closely, because it is where both the n log n bound and stability come from. Merging two sorted halves of total length n takes exactly n comparisons in the worst case, and there are log2 n levels of splitting, which multiplies out to n log n. Stability is a single character in that merge: taking from the left half when the two fronts are equal preserves input order, and taking from the right destroys it. Change the comparison from <= to < and you have silently broken every multi-key sort built on top.',
      limitations:
        'The trolley analogy has all the books in one place. Once the data does not fit in memory the cost model changes completely — sequential reads are enormously cheaper than random ones — and external merge sort wins not because of comparison counts but because it streams. The analogy also suggests every comparison costs the same, whereas comparing long strings or calling a Python key function can dominate the runtime, which is why decorating with a cheap key beats a clever algorithm.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Watch four sorts race',
        caption: 'Run them on random, sorted and reversed input, and watch quicksort collapse on the sorted case with a naive pivot.',
        widget: 'sorting-race',
        props: { algorithms: ['bubble', 'insertion', 'merge', 'quick'], size: 40 },
      },
      {
        kind: 'ascii',
        title: 'Merge sort on [38, 27, 43, 3, 9, 82, 10]',
        caption: 'Splitting costs nothing; all the work is in the merges, and every level merges n elements in total.',
        art: `split:        [38, 27, 43, 3, 9, 82, 10]
             /                          \\
      [38, 27, 43]                [3, 9, 82, 10]
       /       \\                   /          \\
   [38]   [27, 43]            [3, 9]        [82, 10]
           /    \\              /   \\          /   \\
        [27]   [43]         [3]    [9]     [82]   [10]

merge:  [27, 43]                    [3, 9]      [10, 82]
        [27, 38, 43]                   [3, 9, 10, 82]
                  [3, 9, 10, 27, 38, 43, 82]

3 levels of merging, 7 elements per level -> about n log2 n = 7 * 2.8 = 20 comparisons`,
      },
      {
        kind: 'table',
        title: 'The sorting algorithms worth knowing',
        caption: 'n is the element count. "Stable" means equal keys keep their input order.',
        columns: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Stable', 'Use it when'],
        rows: [
          ['Bubble sort', 'O(n)', 'O(n^2)', 'O(n^2)', 'O(1)', 'Yes', 'Never in production; it is a teaching device'],
          ['Insertion sort', 'O(n)', 'O(n^2)', 'O(n^2)', 'O(1)', 'Yes', 'Tiny arrays or nearly-sorted data; used inside Timsort and introsort'],
          ['Selection sort', 'O(n^2)', 'O(n^2)', 'O(n^2)', 'O(1)', 'No', 'When writes are far more expensive than reads: exactly n - 1 swaps'],
          ['Merge sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes', 'Guaranteed bounds, stability, linked lists, external sorting'],
          ['Quicksort', 'O(n log n)', 'O(n log n)', 'O(n^2)', 'O(log n)', 'No', 'In-memory arrays where average speed and low memory matter'],
          ['Heapsort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', 'No', 'Guaranteed worst case with no extra memory; the fallback in introsort'],
          ['Timsort', 'O(n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes', 'What Python\'s sorted() and list.sort() already do'],
          ['Counting / radix', 'O(n + k)', 'O(n + k)', 'O(n + k)', 'O(n + k)', 'Yes', 'Integer or fixed-width keys from a small range; beats the comparison bound'],
        ],
      },
      {
        kind: 'compare',
        title: 'Merge sort versus quicksort',
        caption: 'The two divide-and-conquer sorts split the work differently: merge sort does its work on the way up, quicksort on the way down.',
        left: {
          heading: 'Merge sort',
          points: [
            'Split trivially in half; all the work is in merging',
            'O(n log n) guaranteed, on every input',
            'Stable, and the stability is one comparison operator',
            'Needs an O(n) buffer, which is why it is not the default for in-memory arrays',
            'Wins on linked lists and on data larger than memory',
          ],
        },
        right: {
          heading: 'Quicksort',
          points: [
            'All the work is in partitioning; combining is free',
            'O(n log n) expected, O(n^2) worst case with a bad pivot',
            'Not stable, because partitioning swaps distant elements',
            'In-place apart from O(log n) stack, with excellent cache behaviour',
            'Typically the fastest in practice, and the basis of numpy\'s default sort',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Choosing a sort in practice',
        caption: 'In Python the answer is almost always the first step; the rest are the cases where it is not.',
        steps: [
          { label: 'Do you just need the data ordered in memory?', detail: 'Use sorted() or list.sort(). Timsort is stable, adaptive and implemented in C — any hand-written Python sort will be far slower.' },
          { label: 'Do you need only the k smallest or largest?', detail: 'Use heapq.nsmallest / nlargest, or heapq.heappushpop over a size-k heap: O(n log k) instead of O(n log n), and O(k) memory instead of O(n).' },
          { label: 'Do you need order by several keys?', detail: 'Use a key returning a tuple in one pass, or rely on stability and sort by the least significant key first. Do not sort twice by accident.' },
          { label: 'Are the keys small integers or fixed-width?', detail: 'Counting or radix sort is O(n + k) and beats the comparison bound, which is what numpy does for small integer dtypes and what a bucketed groupby exploits.' },
          { label: 'Does the data fit in memory?', detail: 'If not, use external merge sort: sort chunks, write them out, then k-way merge with a heap. This is what the shell sort utility, Spark and every database do.' },
          { label: 'Do you need a hard worst-case guarantee?', detail: 'Prefer merge sort or heapsort over plain quicksort; adversarial inputs against a predictable pivot are a real denial-of-service vector.' },
        ],
        branching: true,
      },
    ],

    formalDefinition:
      'A sorting algorithm permutes a sequence so that a given total order holds between consecutive elements. A comparison sort obtains all its information about the input through pairwise comparisons, and its execution corresponds to a path through a decision tree whose leaves are the n! possible permutations; since a binary tree with n! leaves has height at least log2(n!) = Theta(n log n), every comparison sort requires Omega(n log n) comparisons in the worst case. Merge sort and heapsort attain this bound in the worst case; quicksort attains it in expectation over random pivots but degrades to Theta(n^2) when partitions are consistently unbalanced. A sort is stable when elements with equal keys retain their relative input order, and in-place when it uses O(log n) or less auxiliary space. Non-comparison sorts such as counting and radix sort escape the lower bound by exploiting the structure of the keys, running in O(n + k) and O(d(n + b)) respectively.',

    math: {
      intuition:
        'Two numbers explain the whole field. The first is the merge-sort recurrence: halving gives log2 n levels, and each level does n units of merging, so the product is n log n. The second is the comparison lower bound: each comparison yields one bit, ordering n items means selecting one of n! permutations, and log2(n!) is about n log2 n - 1.44n bits, so no comparison-based algorithm can do asymptotically better. Everything else — quicksort\'s pathology, Timsort\'s adaptivity, radix sort\'s apparent violation of the bound — is a story about constants, about input structure, or about not comparing at all.',
      formulas: [
        {
          latex: 'T(n) = 2T(n/2) + \\Theta(n) \\;\\Longrightarrow\\; T(n) = \\Theta(n \\log_2 n)',
          name: 'Merge sort recurrence',
          meaning: 'Two half-sized sorts plus a linear merge. The recursion tree has log2 n levels, each doing Theta(n) work, which is where the n log n comes from.',
          category: 'complexity',
          variables: [
            { symbol: 'T(n)', meaning: 'Comparisons to sort n elements' },
            { symbol: '\\Theta(n)', meaning: 'The cost of merging two sorted halves' },
          ],
        },
        {
          latex: '\\log_2(n!) \\ge n \\log_2 n - n \\log_2 e \\approx n \\log_2 n - 1.44n',
          name: 'Comparison sort lower bound',
          meaning: 'A decision tree distinguishing n! permutations must have height at least log2(n!), so Omega(n log n) comparisons are unavoidable. For n = 8 that is at least 16 comparisons.',
          category: 'complexity',
          variables: [
            { symbol: 'n!', meaning: 'The number of possible orderings, one per leaf of the decision tree' },
            { symbol: '\\log_2', meaning: 'Bits of information per binary comparison' },
          ],
        },
        {
          latex: 'T_{\\text{worst}}(n) = \\sum_{k=1}^{n-1} k = \\frac{n(n-1)}{2}',
          name: 'Quicksort with maximally unbalanced partitions',
          meaning: 'When every pivot is the smallest or largest remaining element, each partition removes one element and scans the rest, giving quadratic comparisons — 124,750 for n = 500, against about 4,500 when balanced.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of elements' },
            { symbol: 'k', meaning: 'Size of the subarray scanned at each level' },
          ],
        },
        {
          latex: 'T_{\\text{insertion}}(n) = \\Theta(n + I), \\quad I = |\\{(i,j) : i < j,\\; a_i > a_j\\}|',
          name: 'Insertion sort is output-sensitive',
          meaning: 'Its cost is linear in the number of inversions, so a nearly-sorted array is nearly linear. This is why it is the base case of Timsort and introsort rather than a historical curiosity.',
          category: 'complexity',
          variables: [
            { symbol: 'I', meaning: 'Number of inverted pairs — a measure of how unsorted the input is' },
            { symbol: 'n', meaning: 'Number of elements' },
          ],
        },
      ],
      derivation: [
        'Sorting by comparisons alone can be modelled as a binary decision tree: each internal node is a comparison, each branch an outcome, each leaf one of the possible input orderings.',
        'To sort correctly the tree must have at least n! leaves, one for every permutation that could be the input.',
        'A binary tree with L leaves has height at least log2 L, so the height is at least log2(n!).',
        'By Stirling\'s approximation, log2(n!) = n log2 n - n log2 e + O(log n), which is Theta(n log n).',
        'Height is the worst-case number of comparisons on some input, so every comparison sort needs Omega(n log n) comparisons in the worst case.',
        'Merge sort achieves Theta(n log n) in the worst case, so the bound is tight and merge sort is asymptotically optimal among comparison sorts.',
        'Counting sort appears to break the bound at O(n + k) because it never compares elements: it uses each key directly as an array index, which is extra information the model forbids. The bound constrains comparison sorts only.',
      ],
    },

    workedExample: {
      title: 'Merge sort traced, then quicksort broken on purpose',
      setup:
        'Sort [38, 27, 43, 3, 9, 82, 10] with merge sort, tracking every split and every merge, then count comparisons against the n log n prediction. Afterwards, run quicksort with a last-element pivot on already-sorted input and watch the same divide-and-conquer idea collapse to quadratic.',
      steps: [
        { label: 'Split to depth 1', detail: 'mid = 7 // 2 = 3, so the array becomes [38, 27, 43] and [3, 9, 82, 10]. Splitting itself does no comparisons — in an array implementation it is two slices, and in a linked-list implementation a single traversal.' },
        { label: 'Split to depth 2 and 3', detail: '[38, 27, 43] becomes [38] and [27, 43], which becomes [27] and [43]. [3, 9, 82, 10] becomes [3, 9] and [82, 10], each splitting into singletons. A single element is sorted by definition: that is the base case.' },
        { label: 'First merges', detail: 'Merge [27] and [43]: compare 27 with 43, take 27, then 43 is appended with no further comparison. Result [27, 43], 1 comparison. Similarly [3] and [9] give [3, 9], and [82] and [10] give [10, 82] — note the merge, not a swap, is what put 10 first.' },
        { label: 'Merge [38] with [27, 43]', detail: 'Compare 38 and 27, take 27. Compare 38 and 43, take 38. The left half is exhausted, so 43 is appended. Result [27, 38, 43], 2 comparisons. Appending the tail of whichever side is left over costs nothing, which is why merging is at most n - 1 comparisons and not n.' },
        { label: 'Merge [3, 9] with [10, 82]', detail: 'Compare 3 and 10, take 3. Compare 9 and 10, take 9. Left exhausted, so append 10 and 82. Result [3, 9, 10, 82], 2 comparisons.' },
        { label: 'Final merge', detail: 'Merge [27, 38, 43] with [3, 9, 10, 82]: take 3, 9, 10 (three comparisons against 27), then 27, 38, 43 (three more against 82), then append 82. Result [3, 9, 10, 27, 38, 43, 82], 6 comparisons.' },
        { label: 'Count the work', detail: 'Total comparisons: 1 + 1 + 1 + 2 + 2 + 6 = 13. The prediction n log2 n = 7 * 2.807 = 19.6 is an upper bound; the tree has ceil(log2 7) = 3 levels and each level merges at most 7 elements, so 21 is the worst case and 13 is what this particular input costs.', latex: 'T(7) \\le 7 \\lceil \\log_2 7 \\rceil = 21' },
        { label: 'Where stability lives', detail: 'In the merge, the comparison is left[i] <= right[j]. On a tie the element from the left half — the one earlier in the original array — is taken first. Change <= to < and equal elements come out in reverse, which silently breaks any code that sorted by a secondary key first.' },
        { label: 'Now quicksort on sorted input', detail: 'Take [1, 2, 3, 4, 5] with the last element as pivot. Pivot 5: everything is smaller, so after partitioning 5 is at the end and the left side is [1, 2, 3, 4] — four comparisons to remove one element. Pivot 4 on that: three comparisons to remove one. Then two, then one.' },
        { label: 'Count quicksort\'s damage', detail: '4 + 3 + 2 + 1 = 10 = n(n-1)/2 comparisons, and a recursion depth of n rather than log n. Measured at n = 500: 124,750 comparisons and depth 500 with a last-element pivot on sorted input, against about 5,300 comparisons and depth 21 with a random pivot. Same algorithm, same input, one line changed.', latex: '\\frac{n(n-1)}{2} = \\frac{500 \\cdot 499}{2} = 124{,}750' },
        { label: 'Why this is a security problem, not just a speed problem', detail: 'Sorted or reverse-sorted input is the common case, not an exotic one — data arrives from a database with an ORDER BY, or is appended chronologically. A deterministic pivot also lets an attacker who controls the input force the quadratic case deliberately, which is why library implementations randomise the pivot or switch to heapsort when the recursion gets too deep.' },
        { label: 'The fixes, and what each costs', detail: 'A random pivot makes the bad case a matter of luck rather than of input, at the cost of one random number per partition. Median-of-three sampling picks the median of the first, middle and last elements, which costs three comparisons and defeats sorted input specifically. Introsort — what C++ std::sort does — counts recursion depth and switches to heapsort beyond 2 log2 n, guaranteeing O(n log n) worst case while keeping quicksort\'s speed in the common case.' },
      ],
      conclusion:
        'Merge sort cost 13 comparisons here against a worst case of n ceil(log2 n) = 21, and that bound holds on every input: log2 n levels, each merging at most n elements, with O(n) auxiliary space for the buffer and stability for free from a single <= in the merge. Quicksort has the same expected bound but a genuinely different worst case, and the worst case is triggered by ordinary data rather than by adversarial data — already-sorted input turned 500 elements into 124,750 comparisons and a recursion 500 frames deep, about 23 times the balanced cost. The practical reading is that neither is a default: Python already runs Timsort, which detects existing runs and merges them, giving O(n) on sorted input and stability guaranteed by the language. Write your own only when you are sorting something Timsort cannot see — records on disk, keys with special structure — and even then, borrow the structure rather than the code.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Insertion sort, and why it is adaptive',
        runnable: true,
        code: `def insertion_sort(a, verbose=False):
    a = a[:]                                  # do not mutate the caller's list
    shifts = 0
    for i in range(1, len(a)):
        key, j = a[i], i - 1
        while j >= 0 and a[j] > key:          # > not >= : that is the stability
            a[j + 1] = a[j]                   # shift right, do not swap
            j -= 1
            shifts += 1
        a[j + 1] = key
        if verbose:
            print(f"  after i={i}: {a}")
    return a, shifts

print(insertion_sort([5, 2, 9, 1, 6], verbose=True))
print("nearly sorted:", insertion_sort([1, 2, 3, 5, 4])[1], "shifts")
print("reversed     :", insertion_sort([5, 4, 3, 2, 1])[1], "shifts")`,
        output: `  after i=1: [2, 5, 9, 1, 6]
  after i=2: [2, 5, 9, 1, 6]
  after i=3: [1, 2, 5, 9, 6]
  after i=4: [1, 2, 5, 6, 9]
([1, 2, 5, 6, 9], 5)
nearly sorted: 1 shifts
reversed: 10 shifts`,
        explanation:
          'The shift count is exactly the number of inversions in the input, which is why insertion sort is Theta(n + I) rather than simply quadratic: one inversion costs one shift. Reversed input has all n(n-1)/2 = 10 inversions and costs 10 shifts; nearly-sorted input has one and costs one. That adaptivity, plus a tiny constant factor and no allocation, is why Timsort and introsort both fall back to insertion sort on subarrays below about 32 or 64 elements instead of recursing further. Note the strict > in the while condition: using >= would shift past equal elements and destroy stability, and it would also do pointless work.',
      },
      {
        language: 'python',
        title: 'Merge sort, with the merge tree printed',
        runnable: true,
        code: `def merge_sort(a, depth=0, verbose=False):
    if len(a) <= 1:                   # base case: one element is already sorted
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid], depth + 1, verbose)
    right = merge_sort(a[mid:], depth + 1, verbose)

    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:       # <= is what makes the sort stable
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out += left[i:]                   # append whichever side is left over
    out += right[j:]
    if verbose:
        print("  " * depth + f"merge {left} + {right} -> {out}")
    return out

print(merge_sort([38, 27, 43, 3, 9, 82, 10], verbose=True))`,
        output: `    merge [27] + [43] -> [27, 43]
  merge [38] + [27, 43] -> [27, 38, 43]
    merge [3] + [9] -> [3, 9]
    merge [82] + [10] -> [10, 82]
  merge [3, 9] + [10, 82] -> [3, 9, 10, 82]
merge [27, 38, 43] + [3, 9, 10, 82] -> [3, 9, 10, 27, 38, 43, 82]
[3, 9, 10, 27, 38, 43, 82]`,
        explanation:
          'The printed indentation is the recursion tree: three levels of merging, each handling all seven elements, which is the n log n bound made visible. Two details carry more weight than they look. The <= in the comparison is the entire stability guarantee — with < the sort still produces a correct ordering but reverses equal elements, breaking any multi-key scheme built on it. And the two trailing appends handle the leftover tail without comparisons, which is why merging two halves costs at most n - 1 comparisons rather than n. This version allocates a new list at every level, so it uses O(n log n) total allocation; a production version merges into one preallocated buffer for O(n).',
      },
      {
        language: 'python',
        title: 'Quicksort\'s pivot pathology, measured',
        runnable: true,
        code: `import random, sys

def quicksort_counted(a, pivot="last"):
    comparisons = 0
    max_depth = 0
    def qs(lo, hi, depth):
        nonlocal comparisons, max_depth
        max_depth = max(max_depth, depth)
        if lo >= hi:
            return
        if pivot == "random":
            k = random.randint(lo, hi)
            a[k], a[hi] = a[hi], a[k]        # move a random element to the end
        p = a[hi]
        i = lo
        for j in range(lo, hi):              # Lomuto partition
            comparisons += 1
            if a[j] <= p:
                a[i], a[j] = a[j], a[i]; i += 1
        a[i], a[hi] = a[hi], a[i]            # pivot lands in its final place
        qs(lo, i - 1, depth + 1)
        qs(i + 1, hi, depth + 1)
    sys.setrecursionlimit(10000)
    qs(0, len(a) - 1, 1)
    return comparisons, max_depth

random.seed(0)
n = 500
for name, data in [("random  ", random.sample(range(10000), n)),
                   ("sorted  ", list(range(n))),
                   ("reversed", list(range(n))[::-1])]:
    c, d = quicksort_counted(data[:], "last")
    cr, dr = quicksort_counted(data[:], "random")
    print(f"{name}: last-element pivot {c:>6} comparisons, depth {d:>4} | "
          f"random pivot {cr:>5} comparisons, depth {dr}")
print("n log2 n =", int(n * (n.bit_length() - 1)), " n^2/2 =", n * n // 2)`,
        output: `random  : last-element pivot   5382 comparisons, depth   20 | random pivot  5370 comparisons, depth 22
sorted  : last-element pivot 124750 comparisons, depth  500 | random pivot  5349 comparisons, depth 21
reversed: last-element pivot 124750 comparisons, depth  500 | random pivot  5022 comparisons, depth 26
n log2 n = 4000  n^2/2 = 125000`,
        explanation:
          'On random input the pivot choice is irrelevant; on sorted or reversed input the last-element pivot produces exactly n(n-1)/2 = 124,750 comparisons and a recursion 500 frames deep, which on a larger array is a stack overflow rather than merely slow code. The randomised version is indifferent to input order because the expected partition is balanced regardless of how the data arrived, which is the whole point: randomisation moves the bad case from "a common input shape" to "bad luck". Sorted input is not a corner case — it is what a database ORDER BY or an append-only log hands you — and a deterministic pivot with attacker-controlled input is a documented denial-of-service vector, which is why C++ introsort caps the depth at 2 log2 n and finishes with heapsort.',
      },
      {
        language: 'python',
        title: 'Stability in practice, and the one-pass alternative',
        runnable: true,
        code: `rows = [("carol", "eng", 3), ("alice", "eng", 5), ("dave", "sales", 3),
        ("bob", "sales", 5), ("erin", "eng", 3)]

by_name = sorted(rows, key=lambda r: r[0])
by_team = sorted(by_name, key=lambda r: r[1])   # stable: names stay ordered in teams
print([r[0] for r in by_name])
print([(r[1], r[0]) for r in by_team])

# Usually clearer: one sort with a tuple key. Negate for descending on a number.
print("one pass, two keys:",
      [r[0] for r in sorted(rows, key=lambda r: (r[1], -r[2], r[0]))])`,
        output: `['alice', 'bob', 'carol', 'dave', 'erin']
[('eng', 'alice'), ('eng', 'carol'), ('eng', 'erin'), ('sales', 'bob'), ('sales', 'dave')]
one pass, two keys: ['alice', 'carol', 'erin', 'bob', 'dave']`,
        explanation:
          'Sorting by the least significant key first and then by the most significant works only because Python guarantees Timsort is stable; in a language whose sort is not stable — C\'s qsort, or numpy\'s default quicksort — the same two-pass idiom silently produces a wrong order that looks plausible on small test data. The one-pass tuple key is preferable when you can express it: it is faster, it does not depend on a stability guarantee, and it makes the intent explicit. The negation trick handles a descending numeric component; for a descending string you must either use reverse=True on a separate stable pass or wrap the value in a class with an inverted comparison, since strings cannot be negated. In numpy, pass kind="stable" when you need this behaviour.',
      },
      {
        language: 'python',
        title: 'Timsort exploits existing order',
        runnable: true,
        code: `import random, time

random.seed(7)
n = 200_000
data_random = [random.random() for _ in range(n)]
data_sorted = sorted(data_random)
data_chunks = sorted(data_random[:n // 2]) + sorted(data_random[n // 2:])

for name, d in [("random", data_random), ("already sorted", data_sorted),
                ("two sorted runs", data_chunks)]:
    t = time.perf_counter()
    sorted(d)
    print(f"  {name:<16} {1000 * (time.perf_counter() - t):7.1f} ms")`,
        output: `  random             39.5 ms
  already sorted       2.5 ms
  two sorted runs      5.5 ms`,
        explanation:
          'The absolute milliseconds depend on the machine, but the ratios are the point and they are reproducible: already-sorted input is roughly fifteen times faster than random input, because Timsort detects one long run and does no merging at all — O(n) rather than O(n log n). Two concatenated sorted halves cost one merge pass. This is why appending new records to an already-sorted list and re-sorting is far cheaper than it sounds, why sorting a pandas DataFrame by a column that is already nearly ordered is close to free, and why kind="stable" in numpy — which is Timsort — can beat the default quicksort on real, partially-ordered data despite losing on random data.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Database query execution',
        usage:
          'ORDER BY, merge joins, GROUP BY and deduplication all sort. When the data exceeds work_mem, PostgreSQL switches from an in-memory quicksort to an external merge sort that writes sorted runs to disk and merges them with a heap — the classic algorithm, chosen for its sequential access pattern rather than its comparison count.',
      },
      {
        context: 'Top-k retrieval in vector search',
        usage:
          'Returning the ten nearest neighbours from a million candidates never sorts the million. A size-k heap keeps the best ten in O(n log k) time and O(k) memory, and FAISS, Annoy and every vector database use exactly this, sorting only the final k results for presentation.',
      },
      {
        context: 'Feature engineering and evaluation metrics',
        usage:
          'Quantile binning, rank features and rank-correlation measures sort a column; computing AUC sorts predictions by score. On a million rows this is the dominant cost of the metric, which is why implementations sort once and reuse the ordering across thresholds.',
      },
      {
        context: 'Batching by sequence length in NLP training',
        usage:
          'Sorting examples by token count before batching minimises padding waste, often cutting training time by a third. It has to be a stable sort with a shuffled tie-break — bucketed sampling — because a plain sort would otherwise correlate batch composition with the data order and bias the gradient.',
      },
    ],

    projectConnections: [
      { tool: 'list.sort / sorted', role: 'Timsort in C: stable, adaptive, and the correct default. sort() mutates in place and returns None, sorted() returns a new list — a distinction that causes a familiar TypeError when confused.' },
      { tool: 'heapq.nlargest / nsmallest', role: 'Top-k without a full sort: O(n log k) and O(k) memory. Worth reaching for whenever k is far smaller than n.' },
      { tool: 'numpy.sort / argsort', role: 'kind="quicksort" (actually introsort) by default, with "stable" for Timsort-like behaviour and "heapsort" for guaranteed worst case. argsort returns the permutation, which is how you reorder several parallel arrays consistently.' },
      { tool: 'pandas.sort_values', role: 'Sorts by one or several columns with kind= controlling the algorithm; stability matters when sorting by a secondary key or when ties must preserve the original row order.' },
      { tool: 'operator.itemgetter / attrgetter', role: 'Faster key functions than an equivalent lambda, since they run in C — measurable when the key function is called n log n times.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming a sort is stable when the language does not promise it',
        why: 'Sorting by a secondary key and then a primary one is correct only under stability. Python guarantees it; C\'s qsort, C++\'s std::sort and numpy\'s default kind do not, so the same idiom produces a plausible-looking wrong order.',
        fix: 'Use a tuple key in a single pass, which never depends on the guarantee, or explicitly request a stable algorithm — std::stable_sort, kind="stable".',
      },
      {
        mistake: 'Writing quicksort with a first- or last-element pivot',
        why: 'Sorted and reverse-sorted input are common, not exotic, and both produce n(n-1)/2 comparisons with recursion depth n — 124,750 comparisons for 500 elements, and a stack overflow at larger sizes. With attacker-controlled input it is a denial-of-service vector.',
        fix: 'Randomise the pivot or use median-of-three, and cap the recursion depth with a heapsort fallback. In practice, call the library sort.',
      },
      {
        mistake: 'Sorting an entire dataset to get the top k',
        why: 'O(n log n) time and O(n) memory when O(n log k) time and O(k) memory would do. For n = 10^8 and k = 10 the difference decides whether the job fits in memory at all.',
        fix: 'Use heapq.nlargest, a bounded heap, or numpy.argpartition, which is O(n) and gives the top k unordered before a final sort of just those k.',
      },
      {
        mistake: 'Calling an expensive key function inside the comparison',
        why: 'The key is evaluated O(n log n) times if it is computed per comparison. Python\'s key= parameter instead evaluates it exactly n times and sorts the decorated values, which is the decorate-sort-undecorate pattern built in.',
        fix: 'Always use key= rather than cmp_to_key, and precompute anything expensive — a parsed date, a lowercased string — before sorting rather than inside it.',
      },
      {
        mistake: 'Confusing sort() with sorted()',
        why: 'list.sort() sorts in place and returns None, so x = mylist.sort() silently binds None and the next line raises a TypeError somewhere unrelated.',
        fix: 'Use sorted() when you want a new list and sort() as a statement on its own line. The same distinction applies to reverse() and reversed().',
      },
      {
        mistake: 'Comparing floats or mixed types as sort keys without thinking',
        why: 'NaN compares false against everything, so a list containing NaN sorts into an order that is not sorted at all and varies with the input order. Mixed types raise TypeError in Python 3 — at sort time, on production data, not in the test suite.',
        fix: 'Filter or replace NaN first (numpy puts them last deliberately), and normalise types in the key function so every element yields the same key type.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Compare merge sort and quicksort. Which would you use and when?',
        answer:
          'Both are divide and conquer with O(n log n) expected time, but they put the work in different places. Merge sort splits trivially and does all its work merging on the way back up, which makes it O(n log n) on every input, stable, and well suited to linked lists and to data larger than memory, at the cost of an O(n) buffer. Quicksort does all its work partitioning on the way down and nothing on the way up, which makes it in-place apart from O(log n) stack and very cache-friendly, so its constant factor is usually the best of any comparison sort — but a poor pivot gives O(n^2), and it is not stable because partitioning swaps distant elements. In practice I would call the library sort, which in Python is Timsort: stable, adaptive, O(n) on already-sorted data. If I had to choose an implementation, I would pick merge sort when I need stability or a hard worst-case bound or the data is on disk, and quicksort when memory is tight and the input is in RAM — with a randomised pivot and a heapsort fallback past a depth of 2 log2 n, which is what introsort does.',
        followUp:
          'Asking why quicksort is faster in practice despite the same asymptotics tests whether they can talk about cache locality and constant factors.',
      },
      {
        level: 'intermediate',
        question: 'Why can no comparison sort beat O(n log n), and how do counting and radix sort get around it?',
        answer:
          'Model any comparison sort as a decision tree: internal nodes are comparisons, branches are the two outcomes, leaves are the permutations the algorithm can output. To be correct it needs at least n! leaves, since any of the n! input orderings must be reachable. A binary tree with n! leaves has height at least log2(n!), which by Stirling is about n log2 n - 1.44n, and the height is the worst-case number of comparisons — so Omega(n log n) is unavoidable, and merge sort meeting it means the bound is tight. Counting sort does not contradict this because it never compares elements: it uses each key directly as an index into a tally array, which is information the comparison model does not permit. That costs O(n + k) time and O(k) space for keys in a range of size k, so it is excellent for small integer ranges and useless for arbitrary ones — sorting 32-bit integers this way would need a four-billion-entry table. Radix sort applies counting sort digit by digit for O(d(n + b)) with d digits and base b, which is how numpy sorts small integer dtypes and how large-scale key sorting works in practice. Both require stability of the per-digit sort, and both need keys with exploitable structure.',
        followUp:
          'A strong answer notes that the bound is about comparisons, not about time, and that O(n) sorting is real when the keys cooperate.',
      },
      {
        level: 'ml-engineer',
        question: 'You must return the 100 nearest neighbours from a hundred million embedding scores, on one machine. How?',
        answer:
          'Not by sorting. I would stream the scores and maintain a min-heap of size 100: push the first hundred, then for each subsequent score compare against the heap root and use heappushpop when it is larger. That is O(n log k) time and O(k) memory, roughly seven comparisons per element against the twenty-seven a full sort would need, and it never materialises the full score array — which matters more than the comparison count when n is a hundred million. If the scores are already in a numpy array, np.argpartition is better still: it is O(n) by quickselect, gives the top hundred unordered, and a final sort of those hundred is free. Either way the last step is sorting only k elements. At real scale the honest answer is that you do not compute a hundred million exact scores at all — you use an approximate index such as HNSW or IVF-PQ, which visits a small candidate set and applies exactly this bounded-heap pattern internally. The detail worth stating is tie handling and determinism: with duplicate scores I would break ties on a stable identifier so that repeated queries return the same ordering, which matters when the results feed a cache or an evaluation harness.',
        followUp:
          'Mentioning argpartition, or that the heap is what every approximate nearest-neighbour library uses internally, signals hands-on experience.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Merge two sorted lists into one sorted list without using sorted(), and state the complexity. Then explain why this function is the reason merge sort is stable.',
        hint: 'Walk two indices forward, always taking the smaller front element, and handle the leftover tail without comparisons.',
        solution:
          'def merge(left, right):\n    out, i, j = [], 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:      # <= keeps equal elements in left-then-right order\n            out.append(left[i]); i += 1\n        else:\n            out.append(right[j]); j += 1\n    out += left[i:]\n    out += right[j:]\n    return out\n\nTime is O(n + m): every iteration appends exactly one element, so the loop runs at most n + m times and the tail appends are linear. Space is O(n + m) for the output. Concatenating and calling sorted() would be O((n + m) log(n + m)) and throws away the ordering you already have — although in Python, Timsort detects the two runs and merges them, so the practical gap is smaller than the asymptotics suggest.\n\nStability comes from the single comparison operator. In merge sort, left always holds elements that appeared earlier in the original array, so taking from left on a tie preserves input order; switching to < takes from right on a tie and reverses equal elements. That one character is the difference between a sort you can safely use for multi-key ordering and one you cannot.',
      },
      {
        prompt: 'Count the number of inversions in an array — pairs (i, j) with i < j and a[i] > a[j] — in O(n log n). Explain the connection to merge sort.',
        hint: 'When the merge takes an element from the right half, count how many elements remain in the left half.',
        solution:
          'def count_inversions(a):\n    def sort_count(a):\n        if len(a) <= 1:\n            return a, 0\n        mid = len(a) // 2\n        left, x = sort_count(a[:mid])\n        right, y = sort_count(a[mid:])\n        merged, i, j, cross = [], 0, 0, 0\n        while i < len(left) and j < len(right):\n            if left[i] <= right[j]:\n                merged.append(left[i]); i += 1\n            else:\n                merged.append(right[j]); j += 1\n                cross += len(left) - i     # every remaining left element is > right[j]\n        merged += left[i:]; merged += right[j:]\n        return merged, x + y + cross\n    return sort_count(a)[1]\n\ncount_inversions([5, 4, 3, 2, 1]) -> 10, the maximum n(n-1)/2 for n = 5.\n\nThe insight is that an inversion is either entirely within the left half, entirely within the right, or split across them, and the merge sees exactly the split ones. When right[j] is taken while len(left) - i elements remain on the left, every one of those is greater than right[j] and starts earlier, so each is an inversion — counted in O(1) instead of by enumeration. Total cost is the merge sort recurrence, O(n log n) time and O(n) space, against the obvious O(n^2) double loop. Inversion count is a meaningful statistic in its own right: it is the numerator of Kendall\'s tau, so this is how rank correlation between two orderings is computed at scale.',
      },
      {
        prompt: 'You must sort a file of 50 GB of records on a machine with 8 GB of RAM. Describe the algorithm and give its cost in terms of disk I/O rather than comparisons.',
        hint: 'Sort what fits, write it out, then merge many sorted streams at once.',
        solution:
          'External merge sort, in two phases. Phase one: read the file in chunks that fit comfortably in memory — say 4 GB, leaving room for buffers — sort each chunk in memory with the library sort, and write it back out as a sorted run. That gives about 13 runs and costs one full read and one full write of the data. Phase two: open all 13 runs at once and merge them with a min-heap keyed on the current head of each run, writing the merged output as a single stream. Each heappop and heappush is O(log k) for k runs, and the whole phase is one more read and one more write.\n\nThe cost that matters is I/O, not comparisons: 2 passes over 50 GB, so 200 GB of sequential transfer, whereas the comparison count is an irrelevant O(n log n) that would be identical for any correct sort. The design goal is maximising sequential access and minimising the number of passes, which is why you merge all runs at once rather than pairwise — pairwise merging would take log2(13) = 4 passes instead of 1. The practical constraints are the per-run read buffer, which must be large enough that each read is sequential, and the file-descriptor limit if the run count is in the thousands, in which case you merge in groups. This is precisely what the Unix sort utility, PostgreSQL and Spark\'s shuffle all do.',
      },
    ],

    quiz: [
      {
        id: 'DSA-017-q1',
        type: 'mcq',
        concept: 'quicksort worst case',
        prompt: 'You run quicksort with the last element as pivot on an already-sorted array of 1000 elements. What happens?',
        options: [
          'Every partition is maximally unbalanced: about 500,000 comparisons and recursion depth 1000',
          'It runs in O(n) because the array is already sorted',
          'It runs normally in O(n log n); pivot choice only affects random input',
          'It raises an error because the pivot equals the maximum',
        ],
        answerIndex: 0,
        explanation:
          'Each pivot is the largest remaining element, so partitioning removes one element and scans the rest: n(n-1)/2 = 499,500 comparisons and depth n. Measured at n = 500 it is 124,750 comparisons and depth 500, against about 5,300 with a random pivot.',
      },
      {
        id: 'DSA-017-q2',
        type: 'truefalse',
        concept: 'stability',
        prompt: 'Sorting a list by tenure and then sorting the result by team gives rows grouped by team, ordered by tenure within each team — in Python.',
        answer: true,
        explanation:
          'Python\'s sort is guaranteed stable, so the second sort preserves the relative order established by the first. The same idiom is wrong in a language whose sort is not stable, which is why a single tuple key is the more robust way to express it.',
      },
      {
        id: 'DSA-017-q3',
        type: 'match',
        concept: 'algorithm selection',
        prompt: 'Match each situation to the right approach.',
        pairs: [
          { left: '10 largest of 100 million streamed scores', right: 'Bounded min-heap: O(n log k), O(k) memory' },
          { left: '50 GB of records, 8 GB of RAM', right: 'External merge sort: sorted runs, then a k-way merge' },
          { left: 'A million records already almost in order', right: "Timsort — Python's sorted() — which detects runs and is O(n) on sorted input" },
          { left: 'Ages 0 to 120 for ten million people', right: 'Counting sort: O(n + k), beating the comparison lower bound' },
          { left: 'Hard worst-case bound with no extra memory', right: 'Heapsort: O(n log n) guaranteed, O(1) auxiliary space' },
        ],
        explanation:
          'Each case is decided by a different constraint — result size, memory, existing order, key structure, worst-case guarantee — which is why "which sort is fastest" is never the right question on its own.',
      },
      {
        id: 'DSA-017-q4',
        type: 'numeric',
        concept: 'comparison lower bound',
        prompt: 'What is the minimum number of comparisons any comparison sort needs in the worst case to sort 8 distinct elements? (log2(8!) = log2(40320) ≈ 15.3)',
        answer: 16,
        explanation:
          'The decision tree must have 8! = 40,320 leaves, so its height is at least ceil(log2 40320) = 16. No comparison-based algorithm can guarantee fewer, though a non-comparison sort such as counting sort is not bound by this at all.',
      },
      {
        id: 'DSA-017-q5',
        type: 'debug',
        language: 'python',
        concept: 'stability in the merge',
        prompt: 'This merge sort orders numbers correctly, but breaks a multi-key sort built on top of it. Which line is at fault?',
        code: `while i < len(left) and j < len(right):
    if left[i] < right[j]:
        out.append(left[i]); i += 1
    else:
        out.append(right[j]); j += 1`,
        options: [
          'The comparison must be <= : on a tie it takes from the right half, reversing equal elements',
          'The two branches should both increment i',
          'The loop condition should use "or" rather than "and"',
          'left and right must be sorted again before merging',
        ],
        answerIndex: 0,
        explanation:
          'left holds the elements that came earlier in the original array. Taking from right when the two are equal puts a later element first, which destroys stability — correct for numbers, wrong for records that were pre-sorted by a secondary key.',
      },
      {
        id: 'DSA-017-q6',
        type: 'explain',
        concept: 'choosing a sort',
        prompt: 'A colleague has written their own quicksort to sort a list of dictionaries by two keys. Explain what you would tell them.',
        rubric: [
          'Recommends the built-in sorted() with a tuple key, noting Timsort is C-implemented, stable and adaptive',
          'Explains that their quicksort is not stable, so the two-key result may be wrong, and that a fixed pivot is quadratic on sorted input',
          'Mentions that key= evaluates the key once per element rather than once per comparison',
        ],
        sampleAnswer:
          'I would ask them to delete it and write sorted(rows, key=lambda r: (r["team"], r["name"])). Three reasons. First, correctness: quicksort is not stable, because partitioning swaps elements across the array, so if they were relying on sorting by one key and then the other, their results are subtly wrong in a way that small test data will not reveal. A single tuple key sidesteps stability altogether by making the comparison total in one pass. Second, robustness: a hand-rolled quicksort almost always uses the first or last element as pivot, which is exactly quadratic on sorted or reverse-sorted input — and data arriving from a database ORDER BY or an append-only log is usually sorted. At half a million records that is the difference between milliseconds and minutes, and with input an attacker controls it is a denial-of-service vector. Third, speed: Timsort is implemented in C, is stable by guarantee, and detects existing runs so that nearly-ordered input is close to O(n), while any Python-level sort pays interpreter overhead per comparison. I would also point out that key= calls the key function exactly n times, whereas a comparison-based approach would evaluate it O(n log n) times — so even the API is doing them a favour.',
      },
    ],

    flashcards: [
      { front: 'What does it mean for a sort to be stable, and why care?', back: 'Elements with equal keys keep their input order. It is what makes sorting by a secondary key and then a primary key produce a correct composite ordering. Python\'s sort guarantees it; C qsort and numpy\'s default do not.' },
      { front: 'Merge sort: time, space, stability?', back: 'O(n log n) on every input, O(n) auxiliary space, stable. The recurrence T(n) = 2T(n/2) + O(n) gives log n levels each doing n work.' },
      { front: 'When does quicksort become O(n^2)?', back: 'When partitions are consistently unbalanced — a first- or last-element pivot on sorted or reverse-sorted input gives n(n-1)/2 comparisons and depth n. Randomising the pivot or median-of-three fixes it.' },
      { front: 'Why can no comparison sort beat n log n?', back: 'Its decision tree must have n! leaves, so its height is at least log2(n!) ≈ n log2 n - 1.44n. Counting and radix sort escape this by using keys as indices rather than comparing.' },
      { front: 'What is Timsort and why is Python\'s sort fast on real data?', back: 'A stable merge sort that detects already-ordered runs, extends short ones with insertion sort, and merges them. Already-sorted input is O(n), which is fifteen times faster than random input in practice.' },
      { front: 'How do you get the top k without sorting?', back: 'A bounded min-heap of size k, O(n log k) time and O(k) space — heapq.nlargest — or np.argpartition, which is O(n) and returns the top k unordered.' },
      { front: 'Insertion sort\'s real complexity?', back: 'Theta(n + I) where I is the number of inversions, so it is nearly linear on nearly-sorted input. That adaptivity is why Timsort and introsort use it on small subarrays.' },
    ],

    challenge: {
      title: 'Build an external sort, then beat it with the library',
      brief:
        'Generate a file of 5 million random records, one JSON object per line, larger than the memory you allow yourself. Write an external merge sort: read the file in bounded chunks, sort each in memory, write it to a temporary run file, then merge all runs with heapq.merge into a single sorted output. Measure wall time and peak memory, and compare with the naive approach of loading everything and calling sorted().',
      acceptanceCriteria: [
        'Chunk size is a parameter, and peak memory stays bounded as the input grows — demonstrated by measuring with tracemalloc or resource.getrusage',
        'Merging uses a heap-based k-way merge in a single pass, not repeated pairwise merges, and the code says why',
        'Output is verified sorted and the same multiset as the input, by comparing counts and a checksum rather than by loading both into memory',
        'Reports wall time, peak memory and the number of bytes read and written for both approaches',
        'Discusses where the time actually goes — JSON parsing, I/O, comparisons — with a measurement rather than a guess',
      ],
      starterCode: 'import heapq, json, tempfile\nfrom pathlib import Path\n\ndef sorted_runs(path: Path, key, chunk_lines: int):\n    """Yield paths of sorted temporary run files."""\n    ...\n\ndef external_sort(src: Path, dst: Path, key, chunk_lines: int = 200_000) -> None:\n    ...\n',
      language: 'python',
    },

    teachingPrompt: {
      prompt:
        'Teach someone the main sorting algorithms, what stability means, and how to decide which to use.',
      mustCover: [
        'Insertion sort is O(n^2) but adaptive and fast on small or nearly-sorted input, which is why libraries still use it',
        'Merge sort splits and merges for a guaranteed O(n log n), at the cost of O(n) space, and is stable',
        'Quicksort partitions around a pivot, is usually fastest in practice, but is O(n^2) with a bad pivot and is not stable',
        'Stability means equal keys keep their input order, which is what makes multi-key sorting work',
        'No comparison sort can beat O(n log n), and Python already runs Timsort, so writing your own is almost always wrong',
      ],
      bonusSignals: [
        'mentions that sorted input is the common case that breaks a naive quicksort pivot',
        'knows the top-k heap alternative to a full sort',
        'explains the comparison lower bound via the decision tree',
        'mentions counting or radix sort as the legitimate exception',
      ],
      sampleExplanation:
        'Every sorting algorithm is a strategy you have used with a deck of cards. Sliding each new card into place among the ones already in your hand is insertion sort — it does one unit of work per pair that was out of order, so it is wonderful on an almost-tidy hand and painful on a reversed one. Splitting the deck in two, sorting each half and then merging them by repeatedly taking whichever top card comes first is merge sort — it always takes the same predictable time, because there are about twenty rounds of halving for a million cards and each round handles every card once, and it is easy to do with piles too big to hold at once. Picking one card and pushing everything smaller to its left and bigger to its right is quicksort — usually the quickest, because it rearranges cards in place and never copies the deck, but it falls apart if the card you keep picking happens to be the smallest one left, which is exactly what happens if the deck was already sorted and you always pick the last card. The word worth knowing is stable. A stable sort leaves cards that tie in the order they were already in, which is what lets you sort by one thing and then by another and get both: sort by name, then by team, and each team is internally still in name order. An unstable sort scrambles the ties and the second sort quietly destroys the first. There is also a floor nobody can go under: if all you can do is compare pairs, you need about n log n comparisons, because each comparison answers one yes-or-no question and there are n factorial possible orderings to distinguish. The only way round it is not to compare at all, which is possible when the keys are small whole numbers you can use directly as slots. And the practical conclusion is that you should almost never write any of these. Python already runs Timsort, which spots stretches that are already in order and merges them, so sorted data comes back almost free, and it is stable and written in C. The real skill is knowing what you need — stability, bounded memory, only the top ten — and asking for that instead.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
  {
    id: 'DSA-018',
    domain: 'DSA',
    module: 'Algorithmic Patterns',
    topic: 'Turning quadratic scans into linear ones',
    title: 'Two Pointers, Sliding Window and Prefix Sums',
    slug: 'two-pointers-and-sliding-window',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['DSA-003', 'DSA-007'],
    related: ['DSA-004', 'DSA-008', 'DSA-016', 'DSA-017'],
    tags: ['two-pointers', 'sliding-window', 'prefix-sum', 'linear-time', 'amortised', 'subarray'],

    learningObjectives: [
      'Recognise the three patterns from the shape of a problem — sorted array and a pair condition, a contiguous window with a constraint, or repeated range queries — rather than by memorising solutions',
      'Explain precisely why each pattern is O(n): what information a pointer move throws away, and why throwing it away is safe',
      'Implement the converging two-pointer scan and prove its correctness by the exclusion argument',
      'Implement both fixed-size and variable-size sliding windows, and identify the invariant the window maintains',
      'Build a prefix-sum array and answer arbitrary range-sum queries in O(1), including the hash-map variant that counts subarrays with a given sum',
      'Say when each pattern does not apply — unsorted input for two pointers, negative numbers for a shrinking window, mutable data for prefix sums',
    ],

    terminology: [
      {
        term: 'Two pointers (converging)',
        definition:
          'Two indices starting at opposite ends of a sorted array, moved inwards one at a time according to a comparison. Each step eliminates an entire row or column of the implicit n-by-n pair table.',
        simple: 'One finger at each end, walking towards each other.',
      },
      {
        term: 'Fast and slow pointers',
        definition:
          'The other two-pointer family: both indices move left to right at different rates or under different conditions. Used for in-place filtering, deduplication, and cycle detection in a linked list.',
        simple: 'A reader running ahead and a writer following behind.',
      },
      {
        term: 'Sliding window',
        definition:
          'A contiguous range [start, end] over a sequence, extended at the right and contracted at the left while maintaining a constraint. Each index enters and leaves the window at most once, giving amortised O(n).',
        simple: 'A frame you push along the data, letting things in one end and out the other.',
      },
      {
        term: 'Prefix sum',
        definition:
          'An array where P[i] is the sum of the first i elements, with P[0] = 0. Any range sum is then P[j+1] - P[i], computed in constant time after O(n) preprocessing.',
        simple: 'Running totals, so any stretch is one subtraction.',
      },
      {
        term: 'Amortised analysis',
        definition:
          'Bounding the total cost of a sequence of operations rather than the worst single one. A sliding window\'s inner loop can run many times in one iteration, but across the whole scan it runs at most n times in total.',
        simple: 'Some steps are expensive, but they cannot all be, so the average is cheap.',
      },
      {
        term: 'Monotonicity',
        definition:
          'The property that makes a pointer move safe: moving one pointer changes the quantity of interest in a predictable direction, so the discarded candidates can be proven irrelevant. Lose it — for instance by allowing negative numbers in a sum-constrained window — and the pattern breaks.',
        simple: 'Moving in one direction always makes the number go one way, never both.',
      },
    ],

    simpleExplanation:
      'A great many problems about arrays have an obvious solution that checks every pair or every stretch, and that solution does roughly n squared units of work: fine for a thousand items, hopeless for a million. Three patterns turn most of them linear, and each works by the same trick — noticing that as you move along, the work you did a moment ago tells you something about the work you were about to do. If the data is sorted and you want a pair adding to a target, put a finger at each end: if the sum is too small only the left finger can help, and if it is too big only the right one can, so each step throws away a whole row of possibilities instead of one pair. If you want the best contiguous stretch satisfying some rule, keep a window and push its right edge along, pulling the left edge in whenever the rule breaks — each element enters once and leaves once, so the total work is linear even though the inner loop looks nested. And if you will ask many questions about the sum of a range, compute running totals once, after which any range is a single subtraction. None of these are tricks to memorise; they are all the same observation that recomputing from scratch is throwing away an answer you already had.',

    whyItExists:
      'The naive solution to most array questions re-derives from scratch, at every position, something that differs from the previous position by one element. These patterns exist to reuse that overlap, converting nested scans into single passes — an O(n^2) to O(n) change that decides whether a job on ten million rows finishes in a second or in a day.',

    analogy: {
      scenario:
        'Think of three jobs in a warehouse of boxes lined up by weight. First, you must find two boxes whose weights sum to exactly 100 kg: rather than trying every pair, you take the lightest and heaviest and compare — if together they are under 100 you know the lightest box is useless with anything except a heavier partner, so you move up; if over, the heaviest is useless with anything lighter, so you move down. Second, you must find the longest run of consecutive boxes that together weigh under a tonne: you walk a trolley along, adding boxes at the front and unloading from the back whenever you exceed the limit, never re-weighing anything. Third, your manager keeps asking for the total weight of boxes 40 through 90, then 12 through 58, then others: you walk the line once writing down the running total at each position, after which every question is one subtraction.',
      mapping: [
        { from: 'Lightest and heaviest box, moved inwards', to: 'Converging two pointers on a sorted array' },
        { from: '"This box is useless with any lighter partner"', to: 'The exclusion argument: one pointer move eliminates a whole row of the pair table' },
        { from: 'The trolley with boxes loaded at the front and unloaded at the back', to: 'A sliding window with an amortised O(n) bound — each box handled twice' },
        { from: 'The running total written at each position', to: 'The prefix-sum array, P[0] = 0' },
        { from: 'Answering "40 through 90" by one subtraction', to: 'Range sum as P[91] - P[40], in O(1)' },
        { from: 'Boxes being lined up by weight in the first place', to: 'The sortedness precondition that two pointers relies on' },
      ],
      bridge:
        'The exclusion argument is what makes the first job linear rather than merely clever, and it is worth stating formally: when the pair is too light, no partner for the current lightest box can work, because every remaining partner is lighter than the one just tried — so that box can be discarded entirely, taking an entire row of the n-by-n table of pairs with it. Since each move discards a row or a column, there are at most 2n moves. The same reasoning underlies the window: when the trolley is overloaded, no window starting at the current left edge and extending further right can be legal either, so the left edge can advance and never needs to come back.',
      limitations:
        'All three analogies assume the line of boxes does not change. Prefix sums in particular go stale the moment a value is updated, and rebuilding is O(n) — which is why a Fenwick or segment tree exists, trading O(1) queries for O(log n) queries and O(log n) updates. The warehouse also has only positive weights; if some boxes had negative weight, removing one from the trolley could make the total go up, and the shrinking rule that makes the window work would be wrong.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Two pointers converging on a sorted array',
        caption: 'Move the pointers by hand and watch which pairs each move eliminates from the n-by-n table.',
        widget: 'array-indexing',
        props: { mode: 'two-pointers', array: [2, 7, 11, 15, 19, 23], target: 26 },
      },
      {
        kind: 'ascii',
        title: 'Three patterns, one picture each',
        caption: 'Each arrow is an index; the whole point is that indices only ever move forwards.',
        art: `TWO POINTERS  (sorted, find a pair summing to 26)
  [ 2,  7, 11, 15, 19, 23 ]
    ^lo                ^hi   2+23=25 < 26 -> lo++
        ^lo            ^hi   7+23=30 > 26 -> hi--
        ^lo        ^hi       7+19=26  found

SLIDING WINDOW  (longest stretch with no repeated letter)
  a  b  c  a  b  c  b  b
  [-----]                 "abc"  len 3
     [-----]               "bca"  start jumped past the old 'a'
        [-----]            "cab"
                 [--]      "cb"

PREFIX SUMS  (nums = 3 4 7 2 -3 1 4 2)
  P = [0, 3, 7, 14, 16, 13, 14, 18, 20]
  sum(nums[2..5]) = P[6] - P[2] = 14 - 7 = 7      one subtraction`,
      },
      {
        kind: 'table',
        title: 'Which pattern, and what it costs',
        caption: 'n is the sequence length, q the number of queries, k the window size.',
        columns: ['Problem shape', 'Pattern', 'Naive', 'With the pattern', 'Precondition'],
        rows: [
          ['Pair in a sorted array summing to a target', 'Converging two pointers', 'O(n^2)', 'O(n)', 'Sorted input'],
          ['Pair in an unsorted array summing to a target', 'Hash map of complements', 'O(n^2)', 'O(n) time, O(n) space', 'Hashable values'],
          ['Remove duplicates or filter in place', 'Fast and slow pointers', 'O(n) extra space', 'O(1) extra space', 'Output order preserved'],
          ['Best contiguous stretch of fixed size k', 'Fixed window', 'O(nk)', 'O(n)', 'An O(1) add and remove'],
          ['Longest or shortest stretch satisfying a rule', 'Variable window', 'O(n^2)', 'O(n) amortised', 'The rule must be monotone as the window grows'],
          ['Many range-sum queries on static data', 'Prefix sums', 'O(nq)', 'O(n) build, O(1) per query', 'Data does not change'],
          ['Range queries on data that changes', 'Fenwick or segment tree', 'O(nq)', 'O(log n) query and update', 'Associative operation'],
          ['Count subarrays with sum exactly k', 'Prefix sums plus a hash map', 'O(n^2)', 'O(n)', 'None — negatives are fine'],
        ],
      },
      {
        kind: 'flow',
        title: 'The variable-size window loop',
        caption: 'Expand greedily, contract only when the invariant breaks. Every index enters and leaves once.',
        steps: [
          { label: 'Initialise', detail: 'start = 0, plus whatever state summarises the window: a running sum, a count of distinct characters, a frequency map.' },
          { label: 'Extend the right edge', detail: 'For end from 0 to n-1, add the new element to the window state. This is the only loop over the array.' },
          { label: 'Restore the invariant', detail: 'While the window violates the constraint, remove the element at start and advance start. This inner loop is what makes the analysis amortised rather than nested.' },
          { label: 'Record', detail: 'The window [start, end] is now the longest valid window ending at end. Update the best answer from it.' },
          { label: 'Argue the bound', detail: 'start only ever increases and never exceeds n, so the inner loop runs at most n times across the entire outer loop: O(n) total, despite looking like a nested loop.' },
          { label: 'Check the assumption', detail: 'The contraction rule is only valid if removing an element can never make the violation worse. With negative numbers and a sum constraint that fails, and the correct tool becomes prefix sums with a hash map.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Sliding window versus prefix sums',
        caption: 'Both answer questions about contiguous ranges; they assume different things.',
        left: {
          heading: 'Sliding window',
          points: [
            'One pass, O(1) extra space beyond the window state',
            'Finds the best window satisfying a constraint',
            'Needs monotonicity: growing the window must only ever push the constraint one way',
            'Breaks on negative numbers with a sum constraint',
          ],
        },
        right: {
          heading: 'Prefix sums',
          points: [
            'O(n) preprocessing, O(n) extra space',
            'Answers arbitrary range queries, and counts ranges with an exact property',
            'Works with negative numbers, because it never assumes a direction',
            'Goes stale on any update; use a Fenwick tree if the data changes',
          ],
        },
      },
    ],

    formalDefinition:
      'These are three linear-scan schemas for sequence problems. The converging two-pointer method maintains indices i < j into a sequence sorted by a total order and, at each step, uses a comparison between f(a_i, a_j) and a target to prove that either a_i or a_j participates in no remaining solution, discarding it; since each iteration discards one element, the scan terminates in at most n steps. The sliding-window method maintains a contiguous range [s, e] together with a summary of its contents, extending e monotonically and advancing s only while a predicate on the window is violated; because s and e each advance at most n times in total, the cost is amortised O(n) even though the inner contraction is unbounded per iteration. The prefix-sum method precomputes P[i] = sum of the first i elements with P[0] = 0, so that the sum over [i, j] equals P[j+1] - P[i] in O(1); combined with a hash map of previously seen prefix values it counts subarrays whose sum equals a target in a single pass, since a subarray ending at j has sum k exactly when P[j+1] - k has occurred as an earlier prefix.',

    math: {
      intuition:
        'All three patterns are the same accounting argument in different clothes. The naive algorithms are quadratic because they consider n^2 candidate pairs or ranges. Each pattern finds a reason that most candidates can never be answers, and the reason is always monotonicity: moving a pointer changes the quantity of interest in a known direction, so everything on one side of the current position is provably out. The cost analysis is then a counting argument on pointer movements rather than on nested loops — each index advances at most n times, and that bound does not care how the advances are distributed.',
      formulas: [
        {
          latex: 'P[0] = 0, \\quad P[i] = \\sum_{t=0}^{i-1} a_t, \\quad \\sum_{t=i}^{j} a_t = P[j+1] - P[i]',
          name: 'Prefix sums and range queries',
          meaning: 'The defining identity. The leading zero is what makes the formula work for ranges that start at index 0, without a special case.',
          category: 'complexity',
          variables: [
            { symbol: 'P[i]', meaning: 'Sum of the first i elements' },
            { symbol: 'a_t', meaning: 'The t-th element of the input' },
            { symbol: 'i, j', meaning: 'Inclusive bounds of the queried range' },
          ],
        },
        {
          latex: '\\sum_{t=i}^{j} a_t = k \\iff P[j+1] - P[i] = k \\iff P[i] = P[j+1] - k',
          name: 'Counting subarrays with a given sum',
          meaning: 'Turns a search over pairs of endpoints into a lookup: at each j, count how many earlier prefixes equal the current prefix minus k. One hash map, one pass, and negatives are handled correctly.',
          category: 'complexity',
          variables: [
            { symbol: 'k', meaning: 'The target subarray sum' },
            { symbol: 'P[i]', meaning: 'A previously seen prefix value, counted in a hash map' },
          ],
        },
        {
          latex: 'T_{\\text{window}}(n) = \\underbrace{n}_{\\text{end advances}} + \\underbrace{\\le n}_{\\text{start advances}} = O(n)',
          name: 'Amortised cost of a sliding window',
          meaning: 'The inner while loop may run many times in one outer iteration, but start never decreases and never exceeds n, so the total across the whole scan is bounded by n.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Sequence length' },
          ],
        },
        {
          latex: '\\binom{n}{2} = \\frac{n(n-1)}{2} \\;\\longrightarrow\\; \\le 2n \\text{ pointer moves}',
          name: 'What two pointers eliminates',
          meaning: 'The naive scan examines every one of the n(n-1)/2 pairs; the converging scan proves that each move rules out an entire row or column, so at most 2n moves settle the question.',
          category: 'complexity',
          variables: [
            { symbol: 'n', meaning: 'Number of elements' },
          ],
        },
      ],
      derivation: [
        'Take a sorted array a and a target t, with pointers lo = 0 and hi = n - 1.',
        'Suppose a[lo] + a[hi] < t. Every remaining partner for a[lo] is a[j] with j <= hi, and since the array is sorted, a[j] <= a[hi].',
        'So a[lo] + a[j] <= a[lo] + a[hi] < t for every remaining j: no pair involving a[lo] can reach the target.',
        'Therefore a[lo] can be discarded entirely — which removes an entire row of the pair table — and lo advances by one.',
        'The symmetric argument applies when the sum exceeds t: a[hi] is too large for every remaining partner, so hi retreats.',
        'Each iteration moves exactly one pointer, and the pointers can move at most n - 1 times in total before meeting, giving O(n) comparisons and O(1) space.',
        'Correctness follows because no discarded candidate could have been a solution, so if a solution exists the pointers are still bracketing it when they meet it.',
      ],
    },

    workedExample: {
      title: 'Three canonical problems, each worked end to end',
      setup:
        'One problem per pattern, each traced on a small concrete input. (1) Two pointers: find a pair in the sorted array [2, 7, 11, 15, 19, 23] summing to 26. (2) Sliding window: find the longest substring of "abcabcbb" with no repeated character. (3) Prefix sums: count the subarrays of [3, 4, 7, 2, -3, 1, 4, 2] that sum to exactly 7. For each, compare the work against the naive quadratic approach.',
      steps: [
        { label: '(1) Two pointers: initialise', detail: 'lo = 0 pointing at 2, hi = 5 pointing at 23. The naive alternative examines all C(6,2) = 15 pairs.' },
        { label: '(1) Step 1', detail: '2 + 23 = 25, which is below 26. Since 23 is the largest value available, 2 cannot reach 26 with anything, so the entire row for 2 — five pairs — is eliminated at once. lo advances to index 1.' },
        { label: '(1) Step 2', detail: '7 + 23 = 30, above 26. Now 23 is too large for every remaining partner, since all of them are at most 19, so its column is eliminated. hi retreats to index 4.' },
        { label: '(1) Step 3', detail: '7 + 19 = 26. Found, at indices (1, 4). Three comparisons against the naive fifteen, and O(1) extra space.', latex: '\\text{3 moves vs } \\binom{6}{2} = 15 \\text{ pairs}' },
        { label: '(1) The failure case', detail: 'Searching for 100: lo and hi converge until lo meets hi without a hit, taking at most n - 1 = 5 steps, and the function returns None. Note the loop condition is lo < hi and not lo <= hi, because an element must not pair with itself.' },
        { label: '(2) Sliding window: the state', detail: 'Keep start, the left edge, and last, a map from character to the index where it was last seen. The invariant is that the window [start, end] contains no repeated character.' },
        { label: '(2) Walking "abcabcbb", positions 0 to 2', detail: 'a, b, c are all new: window grows to "abc", length 3, best = 3. last = {a:0, b:1, c:2}.' },
        { label: '(2) Position 3, the second a', detail: 'a was last seen at index 0, which is at or after start = 0, so it is inside the window. start jumps to 0 + 1 = 1 — past the old a — and the window becomes "bca", still length 3. Jumping rather than stepping one at a time is what keeps this O(n).' },
        { label: '(2) Positions 4 to 7', detail: 'The second b at index 4 pushes start to 2, giving "cab"; the second c at index 5 pushes start to 3, giving "abc"; b at index 6 pushes start to 5, giving "cb"; the final b at index 7 pushes start to 7, giving "b". Best remains 3.' },
        { label: '(2) Count the work', detail: 'Eight iterations of the outer loop, each doing O(1) work; start moved forward a total of seven positions across the entire scan. Total O(n), against the naive O(n^2) of checking every substring, or O(n^3) if each check rescans for duplicates.', latex: 'T = n + \\text{(total start advances)} \\le 2n' },
        { label: '(3) Prefix sums: build the array', detail: 'nums = [3, 4, 7, 2, -3, 1, 4, 2], so P = [0, 3, 7, 14, 16, 13, 14, 18, 20]. Note P[5] < P[4] because of the negative element — the prefix array is not monotone, which is exactly why a sliding window cannot solve this problem.' },
        { label: '(3) One range query', detail: 'The sum of nums[2..5] is P[6] - P[2] = 14 - 7 = 7, one subtraction rather than four additions. With q queries the total is O(n + q) rather than O(nq).' },
        { label: '(3) Counting subarrays summing to 7', detail: 'A subarray ending at j sums to 7 exactly when some earlier prefix equals the current running total minus 7. Walk once with a counter map seeded {0: 1}, which represents the empty prefix and is what lets a subarray starting at index 0 be counted.' },
        { label: '(3) The single pass', detail: 'running = 3: need -4, not seen. running = 7: need 0, seen once, count = 1 (that is [3, 4]). running = 14: need 7, seen once, count = 2 (that is [7]). running = 16: need 9, no. running = 13: need 6, no. running = 14 again: need 7, seen once, count = 3 (that is [7, 2, -3, 1]). running = 18: need 11, no. running = 20: need 13, seen once, count = 4 (that is [1, 4, 2]).' },
        { label: '(3) Verify against brute force', detail: 'The four subarrays are [3,4], [7], [7,2,-3,1] and [1,4,2], which a double loop over all 36 subarrays confirms. The hash-map pass does it in O(n) time and O(n) space, and — unlike a sliding window — handles the negative element correctly.' },
      ],
      conclusion:
        'Each pattern replaced a quadratic scan with a single pass, and each did so for a different reason. Two pointers is O(n) time and O(1) space because a comparison proves a whole row or column of the pair table irrelevant — but it requires sorted input, so on unsorted data you either pay O(n log n) to sort or use a hash map of complements instead. The sliding window is O(n) amortised because start and end each advance at most n times in total, which is a counting argument rather than a loop-nesting argument — but it requires that growing the window only ever pushes the constraint one way, which negative numbers destroy. Prefix sums cost O(n) preprocessing and O(1) per query, and the hash-map variant counts exact-sum subarrays in one pass with negatives handled correctly — but the array is invalidated by any update, at which point a Fenwick tree with O(log n) queries and updates is the right structure. Knowing which precondition each pattern needs is the actual skill; the code in all three cases is about ten lines.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Converging two pointers, and the unsorted alternative',
        runnable: true,
        code: `def two_sum_sorted(a, target, verbose=False):
    lo, hi = 0, len(a) - 1
    while lo < hi:                      # < not <= : an element cannot pair with itself
        s = a[lo] + a[hi]
        if verbose:
            print(f"  lo={lo}({a[lo]}) hi={hi}({a[hi]}) sum={s}")
        if s == target:
            return lo, hi
        if s < target:
            lo += 1                     # a[lo] is too small for EVERY remaining partner
        else:
            hi -= 1                     # a[hi] is too large for EVERY remaining partner
    return None

a = [2, 7, 11, 15, 19, 23]
print("pair summing to 26:", two_sum_sorted(a, 26, verbose=True))
print("pair summing to 100:", two_sum_sorted(a, 100))

def two_sum_unsorted(a, target):
    seen = {}                           # value -> index
    for i, x in enumerate(a):
        if target - x in seen:
            return seen[target - x], i
        seen[x] = i
    return None

print("unsorted:", two_sum_unsorted([11, 2, 23, 7, 19, 15], 26))`,
        output: `  lo=0(2) hi=5(23) sum=25
  lo=1(7) hi=5(23) sum=30
  lo=1(7) hi=4(19) sum=26
pair summing to 26: (1, 4)
pair summing to 100: None
unsorted: (3, 4)`,
        explanation:
          'Three comparisons settle what a double loop would take fifteen to settle, and the reason is the exclusion argument in the comments: when the sum is short of the target, the current left value cannot reach it with any remaining partner, because every remaining partner is no larger than the one just tried. The choice between the two functions is a genuine trade-off rather than a preference. Two pointers needs sorted input but uses O(1) space and returns pairs in a predictable order, which makes it the right base for three-sum and for the closest-pair variants. The hash map works on unsorted input in O(n) but costs O(n) space, and it is the correct choice when you must not disturb the original order or when sorting would cost more than the scan.',
      },
      {
        language: 'python',
        title: 'Variable-size sliding window: longest substring without repeats',
        runnable: true,
        code: `def longest_unique(s, verbose=False):
    last = {}                      # char -> most recent index
    best, start, window = 0, 0, ""
    for i, ch in enumerate(s):
        if ch in last and last[ch] >= start:
            start = last[ch] + 1   # jump past the earlier copy, do not step
        last[ch] = i
        if i - start + 1 > best:
            best = i - start + 1
            window = s[start:i + 1]
        if verbose:
            print(f"  i={i} ch={ch} window='{s[start:i+1]}' best={best}")
    return best, window

print(longest_unique("abcabcbb", verbose=True))
print(longest_unique("pwwkew"))`,
        output: `  i=0 ch=a window='a' best=1
  i=1 ch=b window='ab' best=2
  i=2 ch=c window='abc' best=3
  i=3 ch=a window='bca' best=3
  i=4 ch=b window='cab' best=3
  i=5 ch=c window='abc' best=3
  i=6 ch=b window='cb' best=3
  i=7 ch=b window='b' best=3
(3, 'abc')
(3, 'wke')`,
        explanation:
          'The condition last[ch] >= start is doing essential work: a character may be in the map from a position already left behind, in which case it is not actually in the window and start must not move backwards. Dropping that check produces a start that jumps around and a wrong answer on inputs such as "abba". Because start only ever increases, the whole scan is O(n) with O(min(n, alphabet)) space. The "pwwkew" case is the one that catches naive solutions: the answer is "wke", a window that begins after the repeated w, and any approach that restarts from scratch at a repeat returns 2.',
      },
      {
        language: 'python',
        title: 'Fixed-size window: add the newcomer, drop the leaver',
        runnable: true,
        code: `def max_window_sum(a, k):
    s = sum(a[:k])                 # the only O(k) work in the whole function
    best, at = s, 0
    for i in range(k, len(a)):
        s += a[i] - a[i - k]       # one addition and one subtraction per step
        if s > best:
            best, at = s, i - k + 1
    return best, at

temps = [3, 8, 2, 9, 4, 1, 7, 6]
print("hottest 3-day stretch:", max_window_sum(temps, 3))

from collections import deque

def moving_average(a, k):
    out, window, s = [], deque(), 0.0
    for x in a:
        window.append(x); s += x
        if len(window) > k:
            s -= window.popleft()
        if len(window) == k:
            out.append(round(s / k, 2))
    return out

print("3-point moving average:", moving_average(temps, 3))`,
        output: `hottest 3-day stretch: (19, 1)
3-point moving average: [4.33, 6.33, 5.0, 4.67, 4.0, 4.67]`,
        explanation:
          'The fixed window is the simplest of the three patterns and the one most often written badly: recomputing sum(a[i:i+k]) inside the loop is O(nk) and is the difference between a millisecond and a minute on a large series with a wide window. Maintaining the running total incrementally costs one addition and one subtraction per position regardless of k. The deque version generalises to cases where you need the window contents and not just an aggregate — a rolling median, a rolling maximum with a monotonic deque — and it is exactly what pandas .rolling() does in compiled code. One caution for floats: repeatedly adding and subtracting accumulates rounding error over a long series, so a numerically sensitive rolling sum should periodically recompute from scratch, or use math.fsum.',
      },
      {
        language: 'python',
        title: 'Prefix sums: O(1) range queries, then counting exact-sum subarrays',
        runnable: true,
        code: `from itertools import accumulate
from collections import defaultdict

nums = [3, 4, 7, 2, -3, 1, 4, 2]
pre = [0] + list(accumulate(nums))     # the leading 0 removes every special case
print("prefix:", pre)
for i, j in [(1, 3), (0, 7), (4, 6)]:
    print(f"  sum of nums[{i}..{j}] = pre[{j+1}] - pre[{i}] = {pre[j+1]} - {pre[i]} = {pre[j+1] - pre[i]}")

def count_subarrays_with_sum(nums, k, verbose=False):
    seen = defaultdict(int)
    seen[0] = 1                        # the empty prefix: lets a subarray start at index 0
    total, running = 0, 0
    for x in nums:
        running += x
        total += seen[running - k]     # how many earlier prefixes make the gap exactly k
        if verbose and seen[running - k]:
            print(f"    running={running}: {seen[running - k]} subarray(s) end here")
        seen[running] += 1
    return total

print("subarrays summing to 7:", count_subarrays_with_sum(nums, 7, verbose=True))
print("brute force check:",
      sum(1 for i in range(len(nums)) for j in range(i, len(nums)) if sum(nums[i:j+1]) == 7))`,
        output: `prefix: [0, 3, 7, 14, 16, 13, 14, 18, 20]
  sum of nums[1..3] = pre[4] - pre[1] = 16 - 3 = 13
  sum of nums[0..7] = pre[8] - pre[0] = 20 - 0 = 20
  sum of nums[4..6] = pre[7] - pre[4] = 18 - 16 = 2
    running=7: 1 subarray(s) end here
    running=14: 1 subarray(s) end here
    running=14: 1 subarray(s) end here
    running=20: 1 subarray(s) end here
subarrays summing to 7: 4
brute force check: 4`,
        explanation:
          'Two details carry the whole idea. The leading zero in the prefix array makes the formula uniform: without it, ranges starting at index 0 need a special case, which is where off-by-one bugs breed. And the seed seen[0] = 1 in the counting version represents the empty prefix, which is what allows a qualifying subarray that starts at index 0 to be counted — omitting it silently undercounts, and the bug survives any test whose answer does not begin at the start. Note also that this problem cannot be solved with a sliding window: the array contains a negative value, so extending the window does not monotonically increase the sum and there is no valid shrinking rule. The hash-map version does not care, which is exactly why it is the right tool here, at O(n) time and O(n) space.',
      },
      {
        language: 'python',
        title: 'Fast and slow pointers: filtering in place',
        runnable: true,
        code: `def dedupe_sorted_in_place(a):
    if not a:
        return 0
    write = 1                          # slow pointer: next position to write
    for read in range(1, len(a)):      # fast pointer: scans everything
        if a[read] != a[write - 1]:
            a[write] = a[read]
            write += 1
    return write                       # a[:write] is the deduplicated prefix

a = [1, 1, 2, 3, 3, 3, 5, 8, 8]
n = dedupe_sorted_in_place(a)
print("unique prefix:", a[:n], "length", n, "| tail left as scratch:", a[n:])

def partition_by(a, predicate):
    write = 0
    for read in range(len(a)):
        if predicate(a[read]):
            a[write], a[read] = a[read], a[write]
            write += 1
    return write

b = [5, -2, 9, -7, 3, -1, 8]
k = partition_by(b, lambda x: x > 0)
print("positives first:", b, "| count:", k)`,
        output: `unique prefix: [1, 2, 3, 5, 8] length 5 | tail left as scratch: [3, 5, 8, 8]
positives first: [5, 9, 3, 8, -2, -1, -7] | count: 4`,
        explanation:
          'This is the other two-pointer family: both indices move left to right, one reading and one writing, which gives in-place filtering in O(n) time and O(1) extra space. It is the pattern behind quicksort\'s Lomuto partition, behind removing elements from a list without allocating a new one, and behind the compaction step of a garbage collector. Two things to note. The function returns a length rather than truncating, which is the convention in languages without dynamic arrays and is worth keeping because it makes the O(1)-space claim honest — the tail is left as scratch rather than freed. And partition_by is not stable: swapping moves an arbitrary earlier element into the read position, so the relative order of the failing elements is scrambled. If stability is required, write into a second array instead and accept the O(n) space.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Rolling features in time-series and finance',
        usage:
          'A 30-day moving average, a rolling standard deviation, or an exponentially weighted mean over a billion rows is a sliding window with incremental update. pandas .rolling() and numpy\'s stride tricks implement exactly this, which is why the window size barely affects the runtime — the cost is per row, not per row times window.',
      },
      {
        context: 'Token windows and chunking for language models',
        usage:
          'Splitting a document into overlapping chunks of N tokens with stride S is a fixed sliding window, and the retrieval quality depends on the overlap in the same way the window boundary does here. Attention with a local window — as in Longformer or Mistral\'s sliding-window attention — is the same idea applied to the attention mask to avoid the quadratic cost.',
      },
      {
        context: 'Integral images in computer vision',
        usage:
          'A two-dimensional prefix sum lets the sum over any rectangle be computed with four lookups, which is what made the Viola-Jones face detector real-time in 2001 and is still how box filters and average pooling over variable regions are evaluated cheaply.',
      },
      {
        context: 'Cumulative distributions and sampling',
        usage:
          'np.cumsum over a probability vector is a prefix sum, and sampling from a categorical distribution binary searches it. Nucleus (top-p) sampling in text generation finds the cutoff by scanning the cumulative sum of sorted probabilities — a prefix sum and a threshold scan in one pass.',
      },
      {
        context: 'Deduplication and merge joins in data pipelines',
        usage:
          'Deduplicating a sorted key column in place, or joining two sorted streams by advancing whichever pointer is behind, is the two-pointer pattern doing the work of a hash join at O(1) memory. Every database merge join and every sorted-run merge in Spark is this loop.',
      },
    ],

    projectConnections: [
      { tool: 'itertools.accumulate', role: 'Builds a prefix sum lazily in one line, and takes an arbitrary binary function so it also produces running maxima or products.' },
      { tool: 'numpy.cumsum', role: 'Vectorised prefix sums, including the 2D case via cumsum along both axes — the integral image. Watch for float accumulation error on long arrays and prefer float64.' },
      { tool: 'pandas.rolling / expanding', role: 'Sliding and cumulative windows over Series and DataFrames, with min_periods controlling the ramp-up at the start of the series.' },
      { tool: 'collections.deque', role: 'The right container for a window whose contents you need, and the basis of the monotonic deque trick for a rolling maximum in O(n).' },
      { tool: 'np.lib.stride_tricks.sliding_window_view', role: 'A zero-copy view of every window of a given size, which turns windowed computation into one vectorised operation — powerful and easy to misuse, since the result shares memory with the source.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using converging two pointers on an unsorted array',
        why: 'The exclusion argument depends entirely on sortedness: without it, moving lo forwards does not guarantee larger values, so a valid pair can be discarded. The result is a plausible-looking wrong answer rather than an error.',
        fix: 'Sort first at O(n log n) if index order does not matter, or use a hash map of complements in O(n) if it does — remembering that sorting destroys the original indices unless you sort pairs of (value, index).',
      },
      {
        mistake: 'Using a sliding window when the array can contain negatives',
        why: 'The shrink rule assumes that removing an element from the left makes the window sum smaller, so a violation can be repaired by contracting. With a negative element, removing it increases the sum and the invariant is unrecoverable.',
        fix: 'Use prefix sums with a hash map for exact-sum questions, which never assumes a direction. Reserve the window for non-negative values, or for constraints like distinctness that remain monotone.',
      },
      {
        mistake: 'Recomputing the window aggregate from scratch each step',
        why: 'sum(a[i:i+k]) inside the loop makes the algorithm O(nk), which defeats the entire point. It is easy to miss in review because the code looks like a single loop.',
        fix: 'Maintain the aggregate incrementally: add the entering element and subtract the leaving one. If the aggregate cannot be updated incrementally — a median, say — use a structure that can, such as two heaps or a monotonic deque.',
      },
      {
        mistake: 'Forgetting the leading zero in the prefix array, or seen[0] = 1 in the counting variant',
        why: 'Both represent the empty prefix. Without the leading zero, ranges starting at index 0 need a special case that is usually written wrong; without seen[0] = 1, every subarray that starts at index 0 goes uncounted, and the bug hides from any test whose answer starts later.',
        fix: 'Always build P with a leading 0 so that sum(i..j) = P[j+1] - P[i] holds uniformly, and always seed the counter map with {0: 1}. Test with an input whose only answer begins at index 0.',
      },
      {
        mistake: 'Letting the window start pointer move backwards',
        why: 'In the last-seen-index formulation, a character may be recorded from a position already outside the window; assigning start = last[ch] + 1 unconditionally can move start backwards, breaking the invariant and the O(n) argument at once.',
        fix: 'Guard with last[ch] >= start, or take start = max(start, last[ch] + 1). Test on "abba", which is the minimal input that exposes it.',
      },
      {
        mistake: 'Relying on prefix sums over data that is being updated',
        why: 'A single element change invalidates every prefix after it, so keeping the array correct costs O(n) per update — worse than the O(n) scan it was meant to replace.',
        fix: 'Use a Fenwick (binary indexed) tree or a segment tree, which give O(log n) range queries and O(log n) point updates. Prefix sums are for static data, or for a batch that is built once and queried many times.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'How do you recognise which of these three patterns a problem needs?',
        answer:
          'I look at three signals. First, is the answer a contiguous range? If it is, and there is a constraint that only tightens as the range grows — a sum with non-negative values, a count of distinct elements, a character frequency — then a sliding window applies, and its correctness rests on being able to repair a violation by advancing the left edge. Second, is the input sorted and the question about a pair or triple satisfying a comparison? Then converging two pointers applies, because each comparison proves one endpoint useless for every remaining partner and eliminates a whole row of the pair table. Third, is the question about sums over many ranges, or about counting ranges with an exact property? Then prefix sums apply, and the hash-map variant handles exact-sum counting in one pass including negative values. The negations matter as much as the rules: negatives kill the window, unsortedness kills two pointers and sends me to a hash map, and updates kill prefix sums and send me to a Fenwick tree. In all three cases the underlying question I am asking is whether moving forward by one position lets me reuse the work from the previous position, because that is what turns a quadratic scan linear.',
        followUp:
          'Asking them to justify the O(n) bound of a window with a nested while loop tests whether they can give the amortised argument rather than eyeballing the code.',
      },
      {
        level: 'intermediate',
        question: 'Prove that a sliding window with an inner while loop is O(n), not O(n^2).',
        answer:
          'The trap is reading the nested loop structurally rather than counting total work. The outer loop runs exactly n times, once per right endpoint. The inner while loop advances start, and start has two properties: it never decreases, and it never exceeds n. So across the entire execution — not per outer iteration — the inner loop body runs at most n times in total. Total work is therefore at most n outer steps plus n inner steps, which is O(n), with each step doing O(1) work provided the window summary supports O(1) add and remove. That is an amortised argument: a single outer iteration can trigger many contractions, so no per-iteration bound is useful, but the aggregate across all iterations is bounded. The same accounting proves the converging two-pointer scan is O(n) — each iteration moves one pointer, and the pointers have n - 1 moves between them before they meet. The place the argument fails, which is worth naming, is when the inner operation is not O(1): if repairing the window requires rescanning it, or if the summary is something like a median that costs O(log n) to maintain, then the bound becomes O(n log n) and the analysis has to be redone.',
        followUp:
          'A strong candidate points out that the same argument underlies the amortised O(1) of dynamic array append.',
      },
      {
        level: 'ml-engineer',
        question: 'You need rolling aggregates over a billion-row event log: a 30-day sum, a 30-day distinct-user count and a 30-day median, keyed by user. How would you approach each?',
        answer:
          'They are three different problems despite looking alike, and the difference is whether the aggregate can be maintained incrementally. The 30-day sum is a textbook sliding window: add the entering day, subtract the leaving day, O(1) per step, and over a billion rows I would compute it as a cumulative sum and take differences, which vectorises and is what pandas rolling does in compiled code. The distinct-user count cannot be maintained by subtraction, because removing one occurrence of a user does not mean the user left the window — I would keep a frequency map and decrement, removing the key at zero, which is O(1) amortised per step but needs memory proportional to distinct users in the window; at genuine scale I would use HyperLogLog sketches per day and merge them, accepting roughly two per cent error for constant memory. The median cannot be maintained by either, so I would use two heaps, a max-heap for the lower half and a min-heap for the upper, with lazy deletion for elements that have left the window, giving O(log k) per step — or, if approximate is acceptable, a t-digest, which merges across days and is the pragmatic answer at a billion rows. The general principle is that a window is cheap exactly when the aggregate has an inverse operation, and when it does not you either pay logarithmically or accept an approximation.',
        followUp:
          'Mentioning that sums have an inverse and distinct counts do not — the invertibility criterion — is the insight the question is testing.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Find the shortest contiguous subarray of a positive-integer array whose sum is at least a target, or 0 if none exists. Explain why the window may shrink and why that is valid here but not with negative numbers.',
        hint: 'Grow the window until it qualifies, then shrink from the left while it still qualifies.',
        solution:
          'def min_subarray_len(target, nums):\n    start, total, best = 0, 0, float("inf")\n    for end, x in enumerate(nums):\n        total += x\n        while total >= target:            # shrink while still valid\n            best = min(best, end - start + 1)\n            total -= nums[start]\n            start += 1\n    return 0 if best == float("inf") else best\n\nmin_subarray_len(7, [2, 3, 1, 2, 4, 3]) -> 2, the subarray [4, 3].\n\nThe shrink loop is valid because every element is positive, so removing one strictly decreases the sum: once the window fails the condition it will keep failing until the right edge extends again, and no shorter qualifying window starting at the current left edge can have been skipped. With a negative element that reasoning collapses — removing a negative value increases the sum, so a window that just failed might succeed again after further shrinking, and the single pass would miss it. For arrays with negatives the correct approach is prefix sums with a monotonic deque, at O(n), or a sorted structure over prefixes, at O(n log n).\n\nCost is O(n) time and O(1) space: end advances n times and start advances at most n times across the whole scan, which is the amortised argument, not a nested-loop O(n^2).',
      },
      {
        prompt: 'Build a 2D prefix sum over a matrix so that the sum of any rectangle can be computed in O(1), and derive the four-term formula.',
        hint: 'Inclusion-exclusion: the overlap of the two strips you subtract has been removed twice.',
        solution:
          'def build_2d_prefix(grid):\n    R, C = len(grid), len(grid[0])\n    P = [[0] * (C + 1) for _ in range(R + 1)]      # one extra row and column of zeros\n    for r in range(R):\n        for c in range(C):\n            P[r+1][c+1] = grid[r][c] + P[r][c+1] + P[r+1][c] - P[r][c]\n    return P\n\ndef rect_sum(P, r1, c1, r2, c2):                   # inclusive corners\n    return P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]\n\nThe build formula is inclusion-exclusion: the rectangle ending at (r, c) is the cell itself plus the rectangle above plus the rectangle to the left, minus their shared overlap, which would otherwise be counted twice. The query formula is the same idea in reverse: start from the big rectangle, subtract the strip above and the strip to the left, then add back the top-left corner that both subtractions removed. The padding row and column of zeros is what makes queries touching row 0 or column 0 need no special case.\n\nBuild is O(RC) time and space; every query is four lookups, O(1). This is the integral image that made the Viola-Jones face detector real-time, since evaluating a rectangular Haar feature at any scale and position becomes four array reads regardless of how large the rectangle is.',
      },
      {
        prompt: 'Given an array of integers that may be negative, find the length of the longest subarray summing to exactly k. Explain why a window fails and what replaces it.',
        hint: 'Store the first index at which each prefix value occurred.',
        solution:
          'def longest_subarray_sum_k(nums, k):\n    first_seen = {0: -1}          # prefix 0 occurs "before" index 0\n    running, best = 0, 0\n    for i, x in enumerate(nums):\n        running += x\n        if running - k in first_seen:\n            best = max(best, i - first_seen[running - k])\n        if running not in first_seen:\n            first_seen[running] = i    # keep the EARLIEST index, for the longest span\n    return best\n\nlongest_subarray_sum_k([1, -1, 5, -2, 3], 3) -> 4, the subarray [1, -1, 5, -2].\n\nA sliding window fails because with negatives the running sum is not monotone in the window size: extending the window can decrease the sum, so there is no rule saying when to shrink, and no single pass with two pointers can be correct. Prefix sums do not assume any direction — a subarray (i, j] sums to k exactly when P[j] - P[i] = k, so at each j the question is whether the value P[j] - k has been seen before, which is a hash lookup.\n\nThe subtlety is which index to store: for the longest subarray you keep the earliest occurrence of each prefix value and never overwrite it, since an earlier start gives a longer span. For the shortest subarray you would keep the latest instead, and for counting subarrays you keep a tally of occurrences rather than an index at all. Cost is O(n) time and O(n) space in every variant, and the sentinel {0: -1} is what allows a qualifying subarray starting at index 0 to be found.',
      },
    ],

    quiz: [
      {
        id: 'DSA-018-q1',
        type: 'mcq',
        concept: 'preconditions',
        prompt: 'Why can converging two pointers not be used to find a pair summing to a target in an unsorted array?',
        options: [
          'Moving a pointer no longer proves anything about the values it skips, so a valid pair can be discarded',
          'It would be O(n log n) rather than O(n)',
          'It would use too much memory',
          'It can be, provided the array has no duplicates',
        ],
        answerIndex: 0,
        explanation:
          'The whole method rests on the exclusion argument: "this value is too small for every remaining partner" is only true when the remaining partners are ordered. Without sortedness the algorithm still runs and still returns an answer, which is what makes the bug dangerous.',
      },
      {
        id: 'DSA-018-q2',
        type: 'numeric',
        concept: 'prefix sums',
        prompt: 'For nums = [3, 4, 7, 2, -3, 1, 4, 2], the prefix array is P = [0, 3, 7, 14, 16, 13, 14, 18, 20]. What is the sum of nums[2..5] inclusive?',
        answer: 7,
        explanation:
          'sum(nums[i..j]) = P[j+1] - P[i] = P[6] - P[2] = 14 - 7 = 7, namely 7 + 2 + (-3) + 1. One subtraction replaces four additions, and with q queries the total drops from O(nq) to O(n + q).',
      },
      {
        id: 'DSA-018-q3',
        type: 'truefalse',
        concept: 'amortised analysis',
        prompt: 'A sliding window with a while loop nested inside a for loop is O(n^2).',
        answer: false,
        explanation:
          'The inner loop only ever advances start, which never decreases and never exceeds n, so its body runs at most n times across the entire scan rather than n times per outer iteration. Total work is O(n) — an amortised bound, not a structural one.',
      },
      {
        id: 'DSA-018-q4',
        type: 'debug',
        language: 'python',
        concept: 'window start moving backwards',
        prompt: 'This longest-substring-without-repeats function returns 4 for "abba", which is wrong. What is the bug?',
        code: `last, best, start = {}, 0, 0
for i, ch in enumerate(s):
    if ch in last:
        start = last[ch] + 1
    last[ch] = i
    best = max(best, i - start + 1)`,
        options: [
          'start can move backwards: guard with last[ch] >= start, or use start = max(start, last[ch] + 1)',
          'last must be reset at each iteration',
          'best should be computed before updating last',
          'The loop should iterate in reverse',
        ],
        answerIndex: 0,
        explanation:
          'On "abba", the second a is at index 3 with last[a] = 0, so start is set back to 1 even though the window already began at 2. The invariant breaks and the reported length is too large. Taking the maximum keeps start monotone, which is also what the O(n) argument depends on.',
      },
      {
        id: 'DSA-018-q5',
        type: 'match',
        concept: 'pattern selection',
        prompt: 'Match each problem to the technique that solves it in linear time.',
        pairs: [
          { left: 'Pair summing to a target in a sorted array', right: 'Converging two pointers, O(1) space' },
          { left: 'Longest stretch with at most 2 distinct values', right: 'Variable sliding window with a frequency map' },
          { left: 'Count subarrays summing to k, with negatives', right: 'Prefix sums plus a hash map of counts' },
          { left: 'Sum of any rectangle in a static matrix', right: '2D prefix sums, four lookups per query' },
          { left: 'Range sums on data that keeps changing', right: 'Fenwick tree: O(log n) query and update' },
        ],
        explanation:
          'Each is chosen by its precondition — sortedness, monotonicity as the window grows, tolerance of negative values, or whether the data is static — rather than by the surface shape of the question.',
      },
      {
        id: 'DSA-018-q6',
        type: 'explain',
        concept: 'why these patterns are linear',
        prompt: 'Explain what these three patterns have in common, and what each one assumes about the data.',
        rubric: [
          'Identifies the shared idea: reuse the work from the previous position instead of recomputing, turning O(n^2) into O(n)',
          'Gives the specific mechanism for each — exclusion of a whole row, amortised pointer movement, one-off preprocessing',
          'States the precondition each needs and what breaks it: sortedness, monotonicity, static data',
        ],
        sampleAnswer:
          'All three notice that consecutive positions in an array overlap almost completely, so the quadratic solution is recomputing something it already knew. They differ in how they exploit it. Converging two pointers uses a comparison on a sorted array to prove that one endpoint cannot participate in any remaining solution — when the sum is too small, the left value is too small for every partner that is left, since they are all no larger than the one just tried — so a single move eliminates an entire row of the n-by-n pair table and at most 2n moves suffice. The sliding window keeps a contiguous range and a summary of its contents, extends the right edge once per element, and advances the left edge only to repair a violation; since the left edge never retreats and never passes n, the inner loop does at most n units of work in total, which makes the whole scan linear despite looking nested. Prefix sums pay O(n) once so that every range query afterwards is a subtraction, and pairing them with a hash map of previously seen prefixes counts subarrays with an exact sum in a single pass. The assumptions are what decide which one applies. Two pointers needs sorted input, so on unsorted data I would either sort or use a hash map of complements. The window needs the constraint to move in one direction as the window grows, which negative values destroy. Prefix sums need the data to be static, since one update invalidates everything downstream — and that is when a Fenwick tree, with O(log n) updates and queries, is the right answer instead.',
      },
    ],

    flashcards: [
      { front: 'Why is the converging two-pointer scan O(n)?', back: 'Each comparison proves one endpoint useless for every remaining partner, eliminating a whole row or column of the pair table. Each iteration moves one pointer, so at most 2n moves settle it.' },
      { front: 'Why is a sliding window with a nested while loop still O(n)?', back: 'Amortised analysis: start never decreases and never exceeds n, so the inner loop body runs at most n times across the whole scan, not per outer iteration.' },
      { front: 'The prefix-sum identity?', back: 'With P[0] = 0 and P[i] = sum of the first i elements, sum(a[i..j]) = P[j+1] - P[i]. The leading zero is what removes every special case.' },
      { front: 'When does a sliding window break?', back: 'When the array can contain negative values and the constraint is about a sum: removing an element can increase the sum, so a violation cannot be repaired by shrinking. Use prefix sums with a hash map instead.' },
      { front: 'How do you count subarrays with sum exactly k in one pass?', back: 'Walk the array keeping a running total and a hash map of how often each prefix value has occurred, seeded {0: 1}. At each step add the count of (running - k).' },
      { front: 'What replaces prefix sums when the data changes?', back: 'A Fenwick (binary indexed) tree or segment tree: O(log n) range query and O(log n) point update, instead of O(1) query and O(n) update.' },
      { front: 'The fixed-window update rule?', back: 'Add the entering element and subtract the leaving one — s += a[i] - a[i-k] — which is O(1) per step. Recomputing sum(a[i:i+k]) makes it O(nk).' },
    ],

    challenge: {
      title: 'A rolling-metrics engine over an event stream',
      brief:
        'Build a class that consumes timestamped events one at a time and maintains, over a trailing window of W seconds: the count, the sum and mean of a numeric field, the number of distinct user ids, and the maximum. Every update must be amortised O(1) except the maximum, which should be O(1) amortised via a monotonic deque. Then compare it against recomputing each metric from scratch over the retained events, on a million synthetic events.',
      acceptanceCriteria: [
        'Events are retained in a deque and expired from the left by timestamp, never scanned repeatedly',
        'Distinct-user count uses a frequency map with keys removed at zero, and the code explains why subtraction alone is wrong',
        'The rolling maximum uses a monotonic deque and the amortised argument is stated in a comment',
        'Correctness is verified against a brute-force recomputation on at least ten thousand events, including out-of-order arrivals handled explicitly or rejected explicitly',
        'Reports measured throughput for both implementations and the memory held at peak window occupancy',
      ],
      starterCode: 'from collections import deque, defaultdict\n\nclass RollingWindow:\n    def __init__(self, window_seconds: float):\n        self.w = window_seconds\n        self.events = deque()        # (timestamp, user_id, value)\n        ...\n\n    def add(self, ts: float, user_id: str, value: float) -> None:\n        ...\n\n    def stats(self) -> dict:\n        """count, sum, mean, distinct_users, max — all O(1)."""\n        ...\n',
      language: 'python',
    },

    teachingPrompt: {
      prompt:
        'Teach someone the two-pointer, sliding-window and prefix-sum patterns: what each one is, why each is linear, and when each does not apply.',
      mustCover: [
        'All three replace an O(n^2) scan with a single pass by reusing work from the previous position',
        'Two pointers on a sorted array: each comparison eliminates a whole row of candidate pairs',
        'Sliding window: expand right, contract left, with the O(n) bound coming from an amortised counting argument',
        'Prefix sums: O(n) preprocessing gives O(1) range queries, and with a hash map, exact-sum counting in one pass',
        'Each has a precondition — sortedness, monotonicity, static data — and the pattern fails silently when it is missing',
      ],
      bonusSignals: [
        'gives the exclusion argument explicitly rather than describing the mechanics',
        'explains the amortised bound rather than eyeballing the nested loop',
        'knows that negative numbers break the window and prefix sums do not',
        'mentions the Fenwick tree for updatable range queries or the 2D prefix sum',
      ],
      sampleExplanation:
        'These three patterns solve different problems but share one idea: the answer at each position overlaps almost entirely with the answer at the position before, so recomputing from scratch throws away work you already did. Say the data is sorted and you want two values adding to a target. Put one finger at each end and add. If the total is too small, the value under the left finger is hopeless — every partner still available is no bigger than the one you just tried — so you can discard it entirely and move right. That single move rules out a whole row of the table of possible pairs, which is why a job that looks like it needs every pair takes only about as many steps as there are items. Now say you want the best run of consecutive items satisfying some rule. Push the right edge of a window along, and whenever the rule breaks, pull the left edge in until it holds again. The nested loop looks quadratic, but the left edge only ever moves forwards and can only travel the length of the array once, so the total work is linear. That is an accounting argument, not a structural one, and it is worth getting comfortable with because the same reasoning explains why appending to a dynamic array is cheap on average. Finally, if you will be asked about the total of many different stretches, walk the data once writing down the running total at each point. Afterwards any stretch is one subtraction, and if you also remember how often each running total has occurred, you can count stretches with an exact total in the same single pass. What matters as much as the patterns is their fine print. The finger trick needs the data sorted, or it silently discards the answer. The window needs the rule to move in one direction as the window grows, which negative numbers destroy, since removing an item can make a sum go up. And running totals go stale the instant any value changes, at which point you want a structure built for updates instead.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
  {
    id: 'DSA-019',
    domain: 'DSA',
    module: 'Algorithmic Patterns',
    topic: 'Optimisation over choices',
    title: 'Greedy Algorithms and Dynamic Programming',
    slug: 'greedy-and-dynamic-programming',
    difficulty: 5,
    estimatedMinutes: 50,
    prerequisites: ['DSA-001', 'DSA-011', 'DSA-015'],
    related: ['DSA-012', 'DSA-016', 'DSA-017', 'DSA-018'],
    tags: ['greedy', 'dynamic-programming', 'memoisation', 'tabulation', 'knapsack', 'lis', 'optimal-substructure'],

    learningObjectives: [
      'State what a greedy algorithm is, and prove one correct with an exchange argument rather than trusting that it looks sensible',
      'Produce a counterexample that kills a plausible greedy rule, and recognise the warning signs that a problem is not greedy-friendly',
      'Identify the two properties a problem needs for dynamic programming — optimal substructure and overlapping subproblems — and check each one explicitly',
      'Convert an exponential recursion into a memoised one, and then into a bottom-up table, and say when each form is preferable',
      'Fill a 0/1 knapsack table by hand, reconstruct which items were chosen, and reduce the space from O(nW) to O(W)',
      'Solve longest increasing subsequence both in O(n^2) by dynamic programming and in O(n log n) by patience sorting with binary search, and explain what the second gives up',
    ],

    terminology: [
      {
        term: 'Greedy algorithm',
        definition:
          'One that builds a solution by repeatedly taking the option that looks best right now, never reconsidering. It is correct only when a local choice is provably compatible with some global optimum.',
        simple: 'Always take the best-looking next step and never look back.',
      },
      {
        term: 'Exchange argument',
        definition:
          'The standard proof technique for greedy correctness: take any optimal solution, show it can be transformed step by step into the greedy one without getting worse, and conclude the greedy solution is also optimal.',
        simple: 'Show that any better plan can be rewritten as your plan without losing anything.',
      },
      {
        term: 'Optimal substructure',
        definition:
          'The property that an optimal solution to a problem contains optimal solutions to its subproblems, so the answer can be composed from smaller answers. Both greedy algorithms and dynamic programming require it.',
        simple: 'The best answer to the big problem is built out of best answers to smaller ones.',
      },
      {
        term: 'Overlapping subproblems',
        definition:
          'The property that a naive recursion solves the same subproblem many times. It is what makes memoisation pay off, and its absence is why divide and conquer — merge sort, for instance — is not dynamic programming.',
        simple: 'The same smaller question keeps coming up again and again.',
      },
      {
        term: 'Memoisation (top-down)',
        definition:
          'Keeping the recursive formulation and caching each result by its argument tuple. It computes only the states actually reachable, at the cost of recursion depth and cache lookups.',
        simple: 'Write the obvious recursion, then remember every answer you work out.',
      },
      {
        term: 'Tabulation (bottom-up)',
        definition:
          'Filling an array of states in dependency order with loops instead of recursion. It has no stack depth limit, better cache behaviour, and permits rolling-array space reduction, but it computes every state whether needed or not.',
        simple: 'Fill in a table from the smallest cases upwards.',
      },
      {
        term: 'State',
        definition:
          'The arguments that fully determine a subproblem\'s answer. Choosing the smallest sufficient state is the central design decision in dynamic programming: it fixes both the table size and the running time.',
        simple: 'The few facts you actually need to remember about where you are.',
      },
    ],

    simpleExplanation:
      'Two strategies cover most optimisation problems, and the whole art is telling which one a problem needs. The greedy strategy takes the best-looking option at every step and never reconsiders: to make change you hand over the largest coin that fits, and with British or American coins that really does use the fewest coins. It is fast, it uses no memory, and it is sometimes completely wrong — with coins worth 1, 3 and 4, making 6 greedily gives 4 + 1 + 1, three coins, when 3 + 3 would do it in two. Nothing in the greedy method notices this, so it needs proof rather than intuition. The other strategy is dynamic programming, which is what you do when a choice now changes what is worth choosing later. You work out the best answer for every small version of the problem, write those answers down, and build the bigger answers from them. It is slower and it needs memory, but it considers every combination without ever enumerating them, so it does not miss the 3 + 3. The practical rule is that greedy needs a proof and dynamic programming needs a table, and if you cannot produce the proof in a couple of sentences you should be building the table.',

    whyItExists:
      'Optimisation problems have exponentially many candidate solutions, so enumerating them is out of the question. Greedy algorithms exist because some problems have a local rule that provably reaches a global optimum in one pass; dynamic programming exists for the far larger class where they do not, converting exponential recursion into polynomial time by solving each distinct subproblem once.',

    analogy: {
      scenario:
        'You are planning a day of sightseeing. The greedy way is to pick whichever attraction finishes earliest, go, and then repeat with whatever is still available — and remarkably, that rule really does fit the maximum number of attractions into the day, because finishing earliest leaves the most time for everything else, and that can be proved rather than merely hoped. Now change the question: each attraction has an entry fee and a satisfaction score, and you have a fixed budget. Suddenly no simple rule works. Taking the best satisfaction-per-pound first can leave you with an awkward remaining budget that fits nothing, while a slightly worse first choice would have left room for two more visits. The only reliable method is to work out, for every possible budget and every prefix of the attraction list, what the best achievable total is, building a table upwards from the trivial cases.',
      mapping: [
        { from: 'Always taking the attraction that finishes earliest', to: 'A greedy rule, provable by an exchange argument' },
        { from: '"Finishing earliest leaves the most room for the rest"', to: 'The greedy-choice property: a local choice compatible with some global optimum' },
        { from: 'Budget plus entry fees plus satisfaction scores', to: '0/1 knapsack, where greedy by density is provably not optimal' },
        { from: 'An awkward leftover budget that fits nothing', to: 'How a locally optimal choice destroys a better global one' },
        { from: 'The table of best totals for each budget and each prefix', to: 'The dynamic-programming table dp[i][c]' },
        { from: 'Reading back which attractions the best total used', to: 'Reconstructing the chosen items by walking the table backwards' },
      ],
      bridge:
        'The difference between the two questions is whether a choice now changes what is worth choosing later. Picking the earliest-finishing attraction cannot make a later attraction less attractive — it only frees time — so a single sweep suffices and no table is needed. Spending part of a fixed budget does change what remains affordable, so the value of an item genuinely depends on the choices already made, and the only way to account for that without enumerating every subset is to record the best answer for every remaining budget. That is exactly what the knapsack table is, and it is why the identical problem with fractional items becomes greedy again: being able to take half an item removes the awkward leftover entirely.',
      limitations:
        'The itinerary story suggests dynamic programming is always available as a fallback, which is not true. It needs the state space to be small enough to enumerate, and knapsack\'s O(nW) is only pseudo-polynomial — it is polynomial in the numeric value of the capacity, not in the number of bits used to write it, which is why 0/1 knapsack is NP-hard despite the tidy table. Once capacities are large real numbers, neither strategy applies and you are in the territory of approximation algorithms and integer programming solvers.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'The recursion tree of a DP problem, before and after memoisation',
        caption: 'Watch the same subproblem recur across branches, then switch caching on and see the tree collapse to a DAG.',
        widget: 'recursion-tree',
        props: { fn: 'coin-change', memo: true },
      },
      {
        kind: 'ascii',
        title: 'The 0/1 knapsack table, capacity 8',
        caption: 'Items A(w2,v3), B(w3,v4), C(w4,v5), D(w5,v6). Each row adds one item; each column is a capacity.',
        art: `capacity:  0   1   2   3   4   5   6   7   8
  (none)   0   0   0   0   0   0   0   0   0
  +A w2v3  0   0   3   3   3   3   3   3   3
  +B w3v4  0   0   3   4   4   7   7   7   7
  +C w4v5  0   0   3   4   5   7   8   9   9
  +D w5v6  0   0   3   4   5   7   8   9  10   <- answer

  dp[i][c] = max( dp[i-1][c],  v_i + dp[i-1][c - w_i] )
                   skip item i        take item i

  greedy by value density (1.5, 1.33, 1.25, 1.2) picks A then B = 7.
  the table finds B + D = 10.`,
      },
      {
        kind: 'compare',
        title: 'Greedy versus dynamic programming',
        caption: 'Both need optimal substructure. Only one of them also needs a proof that local choices are safe.',
        left: {
          heading: 'Greedy',
          points: [
            'One pass, O(n log n) at worst because of the sort',
            'O(1) extra memory; never revisits a decision',
            'Correct only with a greedy-choice property, proved by an exchange argument',
            'Fails silently when the property does not hold — no error, just a worse answer',
            'Examples: activity selection, Huffman coding, Dijkstra, fractional knapsack, Kruskal',
          ],
        },
        right: {
          heading: 'Dynamic programming',
          points: [
            'Considers every combination without enumerating them',
            'Time and space are the size of the state space, times the work per state',
            'Needs optimal substructure and overlapping subproblems',
            'Always correct if the recurrence is right; the risk is a state that is too coarse',
            'Examples: 0/1 knapsack, edit distance, LIS, Viterbi, matrix chain order',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How to attack an optimisation problem',
        caption: 'The order matters: try to kill the greedy idea before you trust it.',
        steps: [
          { label: 'Write the obvious recursion', detail: 'Express the answer for a state in terms of the answers for smaller states. This is the recurrence, and everything else is an implementation of it.' },
          { label: 'Look for a greedy rule', detail: 'Is there a single ordering — earliest finish, highest density, smallest weight — that might be optimal? Write it down as a candidate.' },
          { label: 'Try hard to break it', detail: 'Search small inputs for a counterexample before attempting a proof. Coins [1, 3, 4] with amount 6 kills greedy change-making in one line; most wrong greedy rules die on an input with fewer than six elements.' },
          { label: 'If it survives, prove it', detail: 'Use an exchange argument: take an optimal solution that disagrees with the greedy choice and show you can swap in the greedy choice without making it worse. No proof means no greedy.' },
          { label: 'Otherwise, define the state', detail: 'What is the minimum information that determines the rest of the problem? Fewer dimensions means a smaller table; a state that is too coarse gives wrong answers, one that is too fine gives an intractable table.' },
          { label: 'Memoise, then consider tabulating', detail: 'lru_cache on the recursion is the fastest route to a correct implementation. Convert to a bottom-up table when recursion depth is a risk, or when you want to reduce space with a rolling array.' },
          { label: 'Reconstruct the solution if required', detail: 'The table holds values, not choices. Either store a parent pointer per state, or walk the table backwards comparing dp[i][c] with dp[i-1][c] to see whether item i was taken.' },
        ],
        branching: true,
      },
      {
        kind: 'table',
        title: 'Classic problems and which strategy they need',
        caption: 'The pattern to notice is whether a choice now restricts what is worth choosing later.',
        columns: ['Problem', 'Strategy', 'Why', 'Cost'],
        rows: [
          ['Maximum non-overlapping meetings', 'Greedy: earliest finish first', 'Finishing earliest leaves the most room; provable by exchange', 'O(n log n)'],
          ['Fractional knapsack', 'Greedy: highest value density', 'Fractions remove the leftover-capacity problem', 'O(n log n)'],
          ['0/1 knapsack', 'Dynamic programming', 'Taking an item changes which others fit; density greedy gives 7 instead of 10', 'O(nW) time, O(W) space'],
          ['Coin change, arbitrary denominations', 'Dynamic programming', 'Greedy fails on [1, 3, 4] making 6: three coins instead of two', 'O(amount * coins)'],
          ['Coin change, canonical currency', 'Greedy', 'Real coin systems are designed so the greedy rule is optimal', 'O(coins)'],
          ['Longest increasing subsequence', 'Either', 'O(n^2) DP, or O(n log n) with patience sorting and binary search', 'O(n^2) or O(n log n)'],
          ['Edit distance between two strings', 'Dynamic programming', 'Every prefix pair is a state; the same pair recurs across paths', 'O(mn)'],
          ['Huffman codes', 'Greedy with a heap', 'Merging the two least frequent symbols is provably safe', 'O(n log n)'],
          ['Shortest path, non-negative weights', 'Greedy: Dijkstra', 'The closest unvisited vertex is final; needs non-negativity', 'O((V+E) log V)'],
        ],
      },
    ],

    formalDefinition:
      'A problem exhibits optimal substructure when an optimal solution can be decomposed into optimal solutions of subproblems, and it exhibits the greedy-choice property when some optimal solution contains the choice a fixed local rule would make first; a greedy algorithm is correct precisely when both hold, which is typically established by an exchange argument or by showing the feasible sets form a matroid. Dynamic programming applies when a problem has optimal substructure together with overlapping subproblems — a naive recursion revisits the same states — and solves each distinct state once, either top-down with memoisation or bottom-up by tabulation in an order respecting the dependency DAG. Its cost is the number of distinct states multiplied by the transition work per state, so the 0/1 knapsack recurrence dp[i][c] = max(dp[i-1][c], v_i + dp[i-1][c - w_i]) runs in Theta(nW) time and Theta(W) space with a rolling array — pseudo-polynomial, since W is exponential in the number of bits used to encode the capacity, which is why the decision problem remains NP-complete.',

    math: {
      intuition:
        'Dynamic programming is exhaustive search that never repeats itself. The recursion already considers every combination; memoising it changes the recursion tree into a directed acyclic graph over distinct states, and the running time becomes the number of nodes in that graph times the cost of each transition. That is why designing the state is the whole game: the state determines the node count. A greedy algorithm goes further and claims the graph has a single distinguished path through it — a claim that needs proof, because when it is false the algorithm still runs and still returns a plausible answer.',
      formulas: [
        {
          latex: 'dp[i][c] = \\max\\big(dp[i-1][c],\\; v_i + dp[i-1][c - w_i]\\big) \\quad \\text{if } w_i \\le c',
          name: '0/1 knapsack recurrence',
          meaning: 'Either item i is left out, in which case the value is whatever the first i-1 items achieve at capacity c, or it is taken, gaining v_i and leaving capacity c - w_i for the earlier items.',
          category: 'optimization',
          variables: [
            { symbol: 'dp[i][c]', meaning: 'Best value using the first i items with capacity c' },
            { symbol: 'w_i, v_i', meaning: 'Weight and value of item i' },
            { symbol: 'c', meaning: 'Remaining capacity, from 0 to W' },
          ],
        },
        {
          latex: 'T = |\\text{states}| \\times \\text{transitions per state}',
          name: 'The cost of a dynamic program',
          meaning: 'The single most useful formula in the topic: knapsack has nW states and O(1) transitions, giving O(nW); LIS has n states with O(n) transitions, giving O(n^2); edit distance has mn states with O(1) transitions, giving O(mn).',
          category: 'complexity',
          variables: [
            { symbol: '|\\text{states}|', meaning: 'Number of distinct argument tuples the recursion can be called with' },
            { symbol: '\\text{transitions}', meaning: 'Number of smaller states each state consults' },
          ],
        },
        {
          latex: 'L[i] = 1 + \\max\\{\\, L[j] : j < i,\\; a_j < a_i \\,\\}, \\quad \\text{LIS} = \\max_i L[i]',
          name: 'Longest increasing subsequence, O(n^2) form',
          meaning: 'L[i] is the length of the best increasing subsequence ending exactly at index i, which is what makes the subproblems independent of one another.',
          category: 'optimization',
          variables: [
            { symbol: 'L[i]', meaning: 'Best length ending at index i' },
            { symbol: 'a_j < a_i', meaning: 'The condition allowing element j to precede element i' },
          ],
        },
        {
          latex: '\\text{OPT}(S) \\supseteq \\text{greedy first choice} \\;\\Longrightarrow\\; \\text{greedy is optimal (exchange argument)}',
          name: 'The greedy-choice property',
          meaning: 'If some optimal solution can always be modified to contain the greedy choice without losing value, induction on the remaining subproblem proves the greedy algorithm optimal.',
          category: 'optimization',
          variables: [
            { symbol: '\\text{OPT}(S)', meaning: 'An optimal solution to the instance S' },
          ],
        },
      ],
      derivation: [
        'Prove the earliest-finish rule for activity selection by exchange. Let g be the activity that finishes first, and let O be any optimal set of non-overlapping activities.',
        'If g is in O, nothing to do. Otherwise let f be the activity in O that finishes earliest.',
        'By the choice of g, finish(g) <= finish(f), so replacing f with g in O cannot create an overlap with anything else in O: everything else in O starts at or after finish(f) >= finish(g).',
        'The modified set has the same size, is still feasible, and contains g — so there is an optimal solution containing the greedy choice.',
        'The remaining problem is the same problem restricted to activities starting at or after finish(g), so induction completes the proof.',
        'Now try the same argument for 0/1 knapsack with the highest-density rule and watch it fail: swapping the densest item into an optimal solution may not fit, because it may weigh more than the item it replaces.',
        'That failure is not a gap in the proof but a real counterexample. Items (w2,v3), (w3,v4), (w4,v5), (w5,v6) with capacity 8 have densities 1.5, 1.33, 1.25, 1.2; greedy takes the first two for value 7, while the optimum takes the second and fourth for value 10.',
        'The fix is to stop committing: record the best value for every remaining capacity, which is exactly dp[i][c], and let the table decide.',
      ],
    },

    workedExample: {
      title: 'Filling a 0/1 knapsack table by hand, then reading the answer back out',
      setup:
        'Four items — A (weight 2, value 3), B (weight 3, value 4), C (weight 4, value 5), D (weight 5, value 6) — and a knapsack of capacity 8. Each item may be taken at most once. Build dp with one row per item prefix and one column per capacity 0 to 8, where dp[i][c] is the best value obtainable from the first i items with capacity c. Row 0 is all zeros: no items means no value.',
      steps: [
        {
          label: 'The recurrence',
          detail: 'For each item i and capacity c there are exactly two options. Skip item i, giving dp[i-1][c]. Or take it, if it fits, giving v_i + dp[i-1][c - w_i] — its value plus the best the earlier items could do with the capacity that remains. Take the larger.',
          latex: 'dp[i][c] = \\max(dp[i-1][c],\\; v_i + dp[i-1][c-w_i])',
        },
        { label: 'Row A (w 2, v 3)', detail: 'Capacities 0 and 1 cannot fit A, so they stay 0. From capacity 2 upwards, taking A gives 3 + dp[0][c-2] = 3, which beats skipping. Row: [0, 0, 3, 3, 3, 3, 3, 3, 3].' },
        { label: 'Row B (w 3, v 4), the interesting cells', detail: 'At c = 3: skip gives dp[A][3] = 3, take gives 4 + dp[A][0] = 4. Take, so 4. At c = 5: skip gives 3, take gives 4 + dp[A][2] = 4 + 3 = 7 — both A and B fit. Row: [0, 0, 3, 4, 4, 7, 7, 7, 7].' },
        { label: 'Row C (w 4, v 5)', detail: 'At c = 6: skip gives 7, take gives 5 + dp[B][2] = 5 + 3 = 8. Take. At c = 7: skip gives 7, take gives 5 + dp[B][3] = 5 + 4 = 9. Take. At c = 8: take gives 5 + dp[B][4] = 5 + 4 = 9, equal to nothing better, so 9. Row: [0, 0, 3, 4, 5, 7, 8, 9, 9].' },
        { label: 'Row D (w 5, v 6)', detail: 'At c = 8: skip gives dp[C][8] = 9, take gives 6 + dp[C][3] = 6 + 4 = 10. Take. Row: [0, 0, 3, 4, 5, 7, 8, 9, 10]. The answer is dp[4][8] = 10.' },
        {
          label: 'Reconstruct the choice',
          detail: 'Start at dp[4][8] = 10. It differs from dp[3][8] = 9, so D was taken; subtract its weight, leaving capacity 3. dp[3][3] = 4 equals dp[2][3] = 4, so C was not taken. dp[2][3] = 4 differs from dp[1][3] = 3, so B was taken; capacity drops to 0. dp[1][0] = 0 equals dp[0][0], so A was not taken. Selection: B and D, weight 3 + 5 = 8, value 4 + 6 = 10.',
        },
        {
          label: 'Compare with the greedy rule',
          detail: 'Value densities are A 1.5, B 1.33, C 1.25, D 1.2. Greedy takes A (capacity 6 left), then B (capacity 3 left), then cannot fit C or D — total value 7. The table found 10. Greedy lost not because its rule was foolish but because taking A left a capacity of 3 that nothing valuable could use.',
        },
        {
          label: 'Why the same problem is greedy when items are divisible',
          detail: 'If fractions were allowed, greedy by density would be optimal: take all of A, all of B, then three quarters of C for 3 + 4 + 3.75 = 10.75, beating 10. The leftover capacity problem disappears because any remaining capacity can always be filled. The exchange argument that fails for 0/1 succeeds here, which is a precise statement of what indivisibility costs.',
        },
        {
          label: 'Count the work',
          detail: 'The table has (n + 1)(W + 1) = 5 * 9 = 45 cells, each filled with one comparison, so Theta(nW). Brute force would examine 2^n = 16 subsets here, but 2^50 for fifty items, while the table would need only 50 * 8 = 400 cells. The saving is exactly the overlapping subproblems being collapsed.',
          latex: '\\Theta(nW) = \\Theta(4 \\cdot 8) \\ll 2^{n}',
        },
        {
          label: 'Reduce the space',
          detail: 'Each row depends only on the row above, so one array of length W + 1 suffices — provided you iterate capacity downwards. Going upwards would let an item be used twice, because dp[c - w] would already have been updated in this same pass, which silently solves the unbounded knapsack instead. That one loop direction is the difference between the two problems.',
          latex: '\\text{for } c = W \\text{ down to } w_i: \\; dp[c] = \\max(dp[c], v_i + dp[c - w_i])',
        },
        {
          label: 'The honest caveat',
          detail: 'Theta(nW) looks polynomial but is not: W is written in log2(W) bits, so the table is exponential in the input size. With capacity 10^9 the table has a billion columns per item and the method is useless, which is why 0/1 knapsack is NP-hard and why real solvers use branch and bound or approximation.',
        },
        {
          label: 'The same machinery on a different problem',
          detail: 'For longest increasing subsequence on [10, 9, 2, 5, 3, 7, 101, 18], the state is "best length ending exactly at index i", giving L = [1, 1, 1, 2, 2, 3, 4, 4] and an answer of 4. Each of the n states consults up to n earlier ones, so O(n^2). Patience sorting gets the same 4 in O(n log n) by keeping the smallest possible tail for each length — [2], [2,5], [2,3], [2,3,7], [2,3,7,101], [2,3,7,18] — and binary searching where each new element belongs; the final tails array is not itself a valid subsequence, so that speedup gives up easy reconstruction.',
        },
      ],
      conclusion:
        'The table costs Theta(nW) = 45 cells of O(1) work and Theta(W) = 9 cells of space with the rolling-array form, against 2^n subsets for brute force, and it returns 10 where the density-greedy rule returns 7. Three transferable lessons. First, the value table alone does not tell you what to pack; reconstruction is a second backwards pass comparing dp[i][c] with dp[i-1][c], or a stored parent pointer per state. Second, the space reduction depends on a loop direction — capacity descending for 0/1, ascending for unbounded — which makes it one of the easiest correct-looking bugs to write. Third, greedy was not obviously wrong here, which is the real point: the density rule is sensible, it is optimal for the fractional variant, and it fails for the 0/1 variant only because indivisibility leaves capacity stranded. That is why a greedy algorithm needs an exchange argument before it is trusted, and why "it passed my three test cases" is not one.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Where greedy is right, and where it silently is not',
        runnable: true,
        code: `def greedy_coins(coins, amount):
    out = []
    for c in sorted(coins, reverse=True):
        while amount >= c:
            amount -= c; out.append(c)
    return out if amount == 0 else None

def dp_coins(coins, amount):
    best = [0] + [float("inf")] * amount       # best[a] = fewest coins making a
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                best[a] = min(best[a], best[a - c] + 1)
    return best[amount]

for coins, amount in [([1, 5, 10, 25], 30), ([1, 3, 4], 6), ([1, 7, 10], 15)]:
    g = greedy_coins(coins, amount)
    print(f"coins={coins} amount={amount}: greedy {g} = {len(g)} coins, "
          f"optimal = {dp_coins(coins, amount)} coins")`,
        output: `coins=[1, 5, 10, 25] amount=30: greedy [25, 5] = 2 coins, optimal = 2 coins
coins=[1, 3, 4] amount=6: greedy [4, 1, 1] = 3 coins, optimal = 2 coins
coins=[1, 7, 10] amount=15: greedy [10, 1, 1, 1, 1, 1] = 6 coins, optimal = 3 coins`,
        explanation:
          'The first line is why almost everyone believes greedy change-making works: real currencies are deliberately designed as canonical systems in which it does. The second and third lines show it failing by a factor of two on denominations that are not — [1, 3, 4] making 6 as 3 + 3, and [1, 7, 10] making 15 as 7 + 7 + 1 — and note that the greedy function does not signal any difficulty. It returns a valid set of coins that simply is not minimal, which is the characteristic failure mode: no exception, no warning, just a worse answer that passes every test whose denominations happen to be canonical. The dynamic program is five lines longer and always right, at O(amount * len(coins)) time and O(amount) space.',
      },
      {
        language: 'python',
        title: 'Activity selection: a greedy rule that is provably optimal',
        runnable: true,
        code: `meetings = [(0, 6), (1, 4), (3, 5), (5, 7), (3, 9), (5, 9),
            (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)]

def select_by(meetings, key):
    chosen = []
    for s, f in sorted(meetings, key=key):
        if all(f <= cs or s >= cf for cs, cf in chosen):   # no overlap with any chosen
            chosen.append((s, f))
    return sorted(chosen)

print("earliest finish :", select_by(meetings, lambda m: m[1]),
      len(select_by(meetings, lambda m: m[1])))
print("earliest start  :", select_by(meetings, lambda m: m[0]),
      len(select_by(meetings, lambda m: m[0])))
print("shortest first  :", select_by(meetings, lambda m: m[1] - m[0]),
      len(select_by(meetings, lambda m: m[1] - m[0])))

tricky = [(0, 10), (9, 11), (10, 20)]      # where "shortest first" dies
print("tricky, earliest finish:", select_by(tricky, lambda m: m[1]))
print("tricky, shortest first :", select_by(tricky, lambda m: m[1] - m[0]))`,
        output: `earliest finish : [(1, 4), (5, 7), (8, 11), (12, 16)] 4
earliest start  : [(0, 6), (6, 10), (12, 16)] 3
shortest first  : [(3, 5), (5, 7), (8, 11), (12, 16)] 4
tricky, earliest finish: [(0, 10), (10, 20)]
tricky, shortest first : [(9, 11)]`,
        explanation:
          'Three plausible greedy rules, and only one of them is a theorem. Earliest-finish-first is optimal by an exchange argument: if an optimal schedule does not contain the earliest-finishing meeting, swapping it in cannot create a conflict, because everything else in that schedule starts after a finish time that is no earlier. Earliest-start-first fails on the main example, taking three meetings instead of four, because one long early meeting blocks the rest of the morning. Shortest-first happens to tie on the main example, which is exactly why testing is not proving — on the three-meeting case it takes the single short meeting in the middle and blocks both of the others, one instead of two. This is the discipline the topic demands: find the counterexample before you trust the rule.',
      },
      {
        language: 'python',
        title: '0/1 knapsack: the table, the reconstruction, and the greedy comparison',
        runnable: true,
        code: `items = [("A", 2, 3), ("B", 3, 4), ("C", 4, 5), ("D", 5, 6)]   # name, weight, value
cap = 8
n = len(items)

dp = [[0] * (cap + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    name, w, v = items[i - 1]
    for c in range(cap + 1):
        dp[i][c] = dp[i - 1][c]                        # skip item i
        if w <= c:
            dp[i][c] = max(dp[i][c], v + dp[i - 1][c - w])   # or take it
for i in range(n + 1):
    print(("-" if i == 0 else items[i - 1][0]), dp[i])
print("best value:", dp[n][cap])

c, taken = cap, []
for i in range(n, 0, -1):
    if dp[i][c] != dp[i - 1][c]:                       # the value changed: item i was used
        name, w, v = items[i - 1]
        taken.append(name); c -= w
print("items taken:", sorted(taken))

def greedy_density(items, cap):
    c, val, took = cap, 0, []
    for name, w, v in sorted(items, key=lambda it: -it[2] / it[1]):
        if w <= c:
            c -= w; val += v; took.append(name)
    return val, sorted(took)
print("greedy by value density:", greedy_density(items, cap))`,
        output: `- [0, 0, 0, 0, 0, 0, 0, 0, 0]
A [0, 0, 3, 3, 3, 3, 3, 3, 3]
B [0, 0, 3, 4, 4, 7, 7, 7, 7]
C [0, 0, 3, 4, 5, 7, 8, 9, 9]
D [0, 0, 3, 4, 5, 7, 8, 9, 10]
best value: 10
items taken: ['B', 'D']
greedy by value density: (7, ['A', 'B'])`,
        explanation:
          'The reconstruction loop is the part worth studying: the table stores values, not decisions, so you recover the packing by asking at each row whether the value differs from the row above — if it does, this item must have been used, and the capacity rewinds by its weight. Comparing against greedy makes the failure concrete: the density rule takes A and B for 7 because A is the densest item, and that choice strands three units of capacity that nothing can use, while the table finds B and D filling the bag exactly for 10. Cost is Theta(nW) time and Theta(nW) space as written, reducible to Theta(W) with a single rolling array iterated downwards — but keep the full table when you need to reconstruct the answer, since the rolling version discards the history.',
      },
      {
        language: 'python',
        title: 'The same problem three ways: recursion, memoisation, tabulation',
        runnable: true,
        code: `from functools import lru_cache

grid_cost = [[1, 3, 1, 8],
             [1, 5, 1, 2],
             [4, 2, 1, 3]]           # minimum-cost path, moving only right or down

calls = 0
def naive(r, c):
    global calls
    calls += 1
    if r == 0 and c == 0: return grid_cost[0][0]
    if r < 0 or c < 0:    return float("inf")
    return grid_cost[r][c] + min(naive(r - 1, c), naive(r, c - 1))

print("naive :", naive(2, 3), "in", calls, "calls")

@lru_cache(maxsize=None)
def memo(r, c):
    if r == 0 and c == 0: return grid_cost[0][0]
    if r < 0 or c < 0:    return float("inf")
    return grid_cost[r][c] + min(memo(r - 1, c), memo(r, c - 1))

print("memo  :", memo(2, 3), memo.cache_info())

R, C = len(grid_cost), len(grid_cost[0])
dp = [[0] * C for _ in range(R)]
for r in range(R):
    for c in range(C):
        if r == 0 and c == 0:
            dp[r][c] = grid_cost[r][c]
        else:
            up   = dp[r - 1][c] if r else float("inf")
            left = dp[r][c - 1] if c else float("inf")
            dp[r][c] = grid_cost[r][c] + min(up, left)
for row in dp:
    print("   ", row)
print("table :", dp[R - 1][C - 1])`,
        output: `naive : 10 in 49 calls
memo  : 10 CacheInfo(hits=6, misses=17, maxsize=None, currsize=17)
    [1, 4, 5, 13]
    [2, 7, 6, 8]
    [6, 8, 7, 10]
table : 10`,
        explanation:
          'One recurrence, three implementations, identical answers. The naive version makes 49 calls for a 3x4 grid and would make about 2^(R+C) for a large one, because the same cell is reached down many different paths. Memoisation caches on the argument tuple and drops to one computation per distinct state — 17 misses, namely the twelve grid cells plus five out-of-range sentinels — which is the transformation from exponential to Theta(RC). Tabulation computes the same states with loops in dependency order, which removes the recursion depth limit, avoids the hashing cost and has far better cache locality, at the price of computing every state whether it is needed or not. The practical route is to write the recursion, add lru_cache to make it correct and fast, and tabulate only if depth or memory forces it.',
      },
      {
        language: 'python',
        title: 'Longest increasing subsequence: O(n^2) and O(n log n)',
        runnable: true,
        code: `import bisect

seq = [10, 9, 2, 5, 3, 7, 101, 18]

def lis_quadratic(a):
    best = [1] * len(a)
    prev = [-1] * len(a)
    for i in range(len(a)):
        for j in range(i):
            if a[j] < a[i] and best[j] + 1 > best[i]:
                best[i] = best[j] + 1
                prev[i] = j                 # parent pointer, for reconstruction
    end = max(range(len(a)), key=lambda i: best[i])
    out = []
    while end != -1:
        out.append(a[end]); end = prev[end]
    return best, max(best), out[::-1]

print("per-index best:", lis_quadratic(seq))

def lis_nlogn(a, verbose=False):
    tails = []                              # tails[k] = smallest tail of an LIS of length k+1
    for x in a:
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)                 # x extends the longest run so far
        else:
            tails[i] = x                    # x is a better (smaller) tail for that length
        if verbose:
            print(f"  saw {x:>3} -> tails {tails}")
    return len(tails)

print("length:", lis_nlogn(seq, verbose=True))`,
        output: `per-index best: ([1, 1, 1, 2, 2, 3, 4, 4], 4, [2, 5, 7, 101])
  saw  10 -> tails [10]
  saw   9 -> tails [9]
  saw   2 -> tails [2]
  saw   5 -> tails [2, 5]
  saw   3 -> tails [2, 3]
  saw   7 -> tails [2, 3, 7]
  saw 101 -> tails [2, 3, 7, 101]
  saw  18 -> tails [2, 3, 7, 18]
length: 4`,
        explanation:
          'The quadratic version defines the state as "the best subsequence ending exactly at index i", which is the choice that makes the subproblems independent — defining it as "the best using the first i elements" would not, because whether element i + 1 can be appended depends on what the previous answer ended with. It also carries parent pointers, so the actual subsequence comes back, not merely its length. The n log n version keeps, for each achievable length, the smallest possible final element, and binary searches for where the new element belongs — replacing a tail keeps future options as open as possible. The catch, and the reason to know both: the tails array is not itself a valid subsequence — here it ends as [2, 3, 7, 18] while the quadratic version reconstructs the genuine [2, 5, 7, 101] — so recovering the actual subsequence needs extra parent bookkeeping on top.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Sequence alignment in bioinformatics and diffing',
        usage:
          'Needleman-Wunsch and Smith-Waterman are edit distance with a scoring matrix: a dp table over every pair of prefixes, O(mn), with the alignment recovered by backtracking. git diff, difflib and every code-review tool run the same family of algorithm, and the O(mn) memory is exactly why aligning two long genomes needs Hirschberg\'s divide-and-conquer variant.',
      },
      {
        context: 'Viterbi decoding and dynamic time warping',
        usage:
          'The most likely hidden state sequence in an HMM is a dp over (time, state) with O(T * S^2) transitions, used in speech recognition, part-of-speech tagging and gene finding. DTW aligns two time series of different lengths with the same table shape, and both keep backpointers for exactly the reconstruction reason knapsack does.',
      },
      {
        context: 'Decoding in language models',
        usage:
          'Greedy decoding takes the highest-probability token at each step and is fast but demonstrably not the highest-probability sequence, which is the classic greedy failure. Beam search is a bounded relaxation — keep the k best prefixes rather than one — and it is neither greedy nor a full dynamic program, because the state space of distinct sequences is far too large to tabulate.',
      },
      {
        context: 'Resource allocation and scheduling',
        usage:
          'Fitting jobs onto GPUs under a memory budget, choosing which features to compute under a latency budget, and ad-slot allocation under a spend cap are knapsack problems. Production systems use the greedy density rule with an approximation guarantee, or an integer-programming solver, precisely because the exact table is pseudo-polynomial and the capacities are large.',
      },
      {
        context: 'Huffman coding and data compression',
        usage:
          'Repeatedly merging the two least frequent symbols is greedy, and provably optimal for prefix-free codes by an exchange argument. It runs in O(n log n) with a heap, and sits underneath gzip, JPEG and every tokeniser that assigns shorter identifiers to more frequent pieces.',
      },
    ],

    projectConnections: [
      { tool: 'functools.lru_cache / cache', role: 'Turns a correct recursive formulation into a memoised dynamic program with one line. Arguments must be hashable, so states are tuples rather than lists.' },
      { tool: 'heapq', role: 'The engine of greedy algorithms that repeatedly take the best remaining option: Huffman coding, Dijkstra, and scheduling by priority.' },
      { tool: 'numpy', role: 'Vectorises a dp row-by-row when the transition is elementwise, which is how knapsack and edit-distance tables are made fast without leaving Python.' },
      { tool: 'difflib / python-Levenshtein / rapidfuzz', role: 'Production edit-distance implementations; reach for them rather than writing the O(mn) table yourself unless you need a custom scoring scheme.' },
      { tool: 'OR-Tools / PuLP', role: 'When the dp table is too large — real capacities, many constraints — these solve the same optimisation as an integer program with branch and bound.' },
    ],

    commonMistakes: [
      {
        mistake: 'Trusting a greedy rule because it works on the examples you tried',
        why: 'Greedy failures are silent and often need a specific shape of input to appear: shortest-meeting-first ties with the optimum on many instances and only fails when one short meeting straddles two long ones. Tests written by the same person who invented the rule rarely contain that case.',
        fix: 'Before trusting it, brute-force all small inputs and compare against the greedy answer — a twenty-line exhaustive check over inputs of size up to six finds nearly every counterexample. If none appears, write the exchange argument.',
      },
      {
        mistake: 'Choosing a state that does not capture enough information',
        why: 'If the state omits something the future depends on, the recurrence is simply wrong — "best LIS using the first i elements" fails because whether element i + 1 can extend it depends on the last value, which the state does not record.',
        fix: 'Ask what a solver standing at this state would need to know to finish optimally. If the answer includes something the state omits, add it — and if that makes the state space explode, the problem may not be tractable by dp at all.',
      },
      {
        mistake: 'Iterating the rolling knapsack array in the wrong direction',
        why: 'Going upwards in capacity lets dp[c - w] already reflect item i from this same pass, so the item is used repeatedly. The code runs and returns a plausible, larger number — it has silently solved the unbounded knapsack instead of the 0/1 one.',
        fix: 'Iterate capacity from W down to w_i for 0/1, and upwards for unbounded. Write which problem the loop solves in a comment, and test with a single item whose weight is half the capacity.',
      },
      {
        mistake: 'Expecting the value table to tell you the solution',
        why: 'dp[n][W] is a number. Which items achieve it is not recorded anywhere, and guessing by re-scanning the items is wrong when several combinations reach the same value.',
        fix: 'Either walk the full table backwards comparing dp[i][c] with dp[i-1][c], or store a choice or parent pointer per state. Note that the O(W) rolling array cannot support reconstruction, which is a reason to keep the full table.',
      },
      {
        mistake: 'Calling Theta(nW) polynomial',
        why: 'W is a numeric value, not an input size: writing it takes log2 W bits, so the table is exponential in the length of the input. A capacity of 10^9 makes the method useless despite the tidy formula, and 0/1 knapsack remains NP-hard.',
        fix: 'Say pseudo-polynomial and mean it. If capacities or weights are large or real-valued, use an approximation scheme, branch and bound, or an integer-programming solver.',
      },
      {
        mistake: 'Reaching for dynamic programming when the subproblems do not overlap',
        why: 'Memoising a recursion whose arguments are all distinct adds hashing cost and memory for no benefit. Merge sort has optimal substructure but no overlap, which is what makes it divide and conquer rather than dp.',
        fix: 'Count the distinct argument tuples against the number of calls. If they are the same, you have divide and conquer; if the calls are exponential and the states polynomial, you have dynamic programming.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'How do you decide whether a problem is greedy or needs dynamic programming?',
        answer:
          'I ask whether committing to a choice now can make a later choice worse. If it cannot — if the local choice only ever frees resources or removes constraints — greedy is plausible and I try to prove it with an exchange argument: take any optimal solution, show the greedy choice can be swapped in without making it worse, then induct on what remains. Activity selection passes that test, because taking the earliest-finishing meeting leaves the largest possible remaining window. If committing does change the future, as in 0/1 knapsack where spending capacity can strand the remainder, greedy is suspect and I look for a counterexample first: coins [1, 3, 4] making 6 needs two coins but greedy uses three, and the knapsack density rule returns 7 where the optimum is 10. Then I set up a dp by asking what the minimum state is that determines the rest of the problem, writing the recurrence, and checking that subproblems actually recur — because if every recursive call has distinct arguments, memoising buys nothing and what I have is divide and conquer. In practice I try to break the greedy rule by brute force on small inputs before attempting either proof; a counterexample is cheaper to find than a theorem, and it settles the question either way.',
        followUp:
          'Being asked for a problem where greedy is optimal and one where it is not, with the reason rather than just the name, separates understanding from recall.',
      },
      {
        level: 'advanced',
        question: 'Explain 0/1 knapsack, its complexity, and why the complexity is not really polynomial.',
        answer:
          'The state is the pair (i, c): the best value obtainable from the first i items with capacity c. The recurrence has two branches — skip item i, giving dp[i-1][c], or take it if it fits, giving v_i + dp[i-1][c - w_i] — and the answer is the maximum. That is nW states with O(1) transitions each, so Theta(nW) time, and Theta(W) space with a single rolling array iterated downwards in capacity; the downward direction is essential, because going upwards would let the same item be taken repeatedly, which is the unbounded variant. To recover which items were packed I keep the full table and walk backwards, checking at each row whether the value differs from the row above. The reason Theta(nW) is not polynomial is that W is a magnitude, not a size: the input writes it in log2 W bits, so the table is exponential in the encoding length, and that is why the decision version is NP-complete despite the simple recurrence. It is called pseudo-polynomial, and it matters practically — a capacity of a billion makes the table impossible while n stays small. In that regime I would use the fully polynomial approximation scheme, which scales values and gives a (1 - epsilon) guarantee, or branch and bound with the fractional-knapsack density as the upper bound, which is what real solvers do.',
        followUp:
          'Mentioning the FPTAS, or that fractional knapsack is greedy and optimal while 0/1 is not, shows the candidate understands where the hardness actually comes from.',
      },
      {
        level: 'ai-engineer',
        question: 'Where do these ideas actually appear in machine-learning systems?',
        answer:
          'Dynamic programming turns up wherever the structure is a sequence and the answer is a best path. Viterbi decoding for hidden Markov models is a dp over time and state, still used in forced alignment and tagging; CTC loss for speech recognition is a forward-backward dp over alignments; dynamic time warping compares two series of different lengths with the same table; and edit distance underlies word error rate, fuzzy matching and every diff tool. All of them keep backpointers for the same reason the knapsack table does — the value alone does not tell you the alignment. Greedy shows up most visibly in decoding: taking the highest-probability token at each step is greedy and is provably not the highest-probability sequence, which is why beam search exists as a bounded middle ground that keeps k prefixes instead of one, and why neither is a true dp — the space of distinct sequences is far too large to tabulate. Elsewhere, greedy with a proof is everywhere in infrastructure: Huffman coding in tokenisers and compression, Dijkstra in routing, and heap-based selection for top-k retrieval. The recurring engineering lesson is the one from knapsack: when a budget is involved — GPU memory, latency, context tokens — the greedy density rule is usually what ships, and it should ship with an explicit statement of how far from optimal it can be.',
        followUp:
          'Explaining why beam search is not dynamic programming, since prefixes are not recombined into shared states, is the detail that shows real depth.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Compute the edit distance between "kitten" and "sitting", giving the recurrence, the complexity and the alignment that achieves it.',
        hint: 'The state is a pair of prefix lengths, and there are exactly three ways to consume a character.',
        solution:
          'def edit_distance(a, b):\n    m, n = len(a), len(b)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i      # delete every character of a\n    for j in range(n + 1): dp[0][j] = j      # insert every character of b\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            cost = 0 if a[i-1] == b[j-1] else 1\n            dp[i][j] = min(dp[i-1][j] + 1,       # delete a[i-1]\n                           dp[i][j-1] + 1,       # insert b[j-1]\n                           dp[i-1][j-1] + cost)  # substitute or match\n    return dp[m][n]\n\nedit_distance("kitten", "sitting") -> 3.\n\nThe state (i, j) is "the distance between the first i characters of a and the first j of b", and the three transitions are the three edits. Optimal substructure holds because any optimal alignment ends with one of those three operations, and the subproblems overlap heavily — dp[i-1][j-1] is consulted from three different cells — which is why the naive recursion is exponential and the table is Theta(mn) time and Theta(mn) space, reducible to Theta(min(m, n)) if only the number is needed. The alignment achieving 3 is: substitute k with s, substitute e with i, insert g. Reconstructing it requires either the full table or Hirschberg\'s algorithm, which recovers the alignment in linear space at twice the time.',
      },
      {
        prompt: 'Write the O(W)-space 0/1 knapsack, explain the loop direction, and show what goes wrong if you reverse it.',
        hint: 'Ask whether dp[c - w] refers to the previous row or the current one.',
        solution:
          'def knapsack_rolling(items, cap):\n    dp = [0] * (cap + 1)\n    for _, w, v in items:\n        for c in range(cap, w - 1, -1):      # DOWNWARDS: dp[c - w] is still last row\n            dp[c] = max(dp[c], v + dp[c - w])\n    return dp[cap]\n\nitems = [("A", 2, 3), ("B", 3, 4), ("C", 4, 5), ("D", 5, 6)]\nknapsack_rolling(items, 8) -> 10, matching the two-dimensional table.\n\nThe single array represents the previous row until it is overwritten. Iterating capacity downwards means dp[c - w] has not yet been touched in this pass, so it still holds the value for the first i - 1 items — which is what the 0/1 recurrence requires. Iterating upwards means dp[c - w] may already include item i from this same pass, so the item can be taken again and again: with the same input, the upward loop returns 12 by taking item A four times. That is not a bug in the recurrence but a different problem, the unbounded knapsack, and the ascending loop is the standard way to write it.\n\nCost is Theta(nW) time and Theta(W) space. The trade-off to state explicitly is that the rolling array discards the history, so reconstruction of which items were chosen is no longer possible — keep the full Theta(nW) table whenever the caller needs the packing rather than the number.',
      },
      {
        prompt: 'A greedy rule is proposed for scheduling: always run the job with the shortest processing time first, to minimise average completion time. Is it optimal? Prove it or break it.',
        hint: 'Try an exchange argument on two adjacent jobs in any schedule.',
        solution:
          'It is optimal, and the exchange argument is short. Take any schedule and suppose two adjacent jobs, i then j, have p_i > p_j. Let t be the time when i starts. Their contribution to the total completion time is (t + p_i) + (t + p_i + p_j). Swapping them gives (t + p_j) + (t + p_j + p_i). The difference is p_i - p_j > 0, so the swap strictly reduces the total, and every other job\'s completion time is unchanged because the pair occupies the same interval either way.\n\nSo any schedule with an out-of-order adjacent pair can be improved, which means an optimal schedule has no such pair — that is, it is sorted by processing time. Shortest-job-first is therefore optimal for minimising total, and hence average, completion time, at O(n log n) for the sort.\n\nTwo caveats worth stating in an interview. The result assumes all jobs are available at time zero and are not preemptible; with release times the problem becomes harder and the preemptive rule is shortest-remaining-processing-time. And optimality here is for average completion time, not for maximum completion time or for fairness — shortest-job-first starves long jobs, which is exactly why real schedulers use ageing rather than the pure rule.',
      },
    ],

    quiz: [
      {
        id: 'DSA-019-q1',
        type: 'mcq',
        concept: 'greedy failure',
        prompt: 'With coin denominations [1, 3, 4], how many coins does the greedy largest-first rule use to make 6, and what is the true optimum?',
        options: [
          'Greedy uses 3 coins (4 + 1 + 1); the optimum is 2 coins (3 + 3)',
          'Greedy uses 2 coins; the optimum is 2 coins',
          'Greedy fails to make 6 at all',
          'Greedy uses 6 coins; the optimum is 3',
        ],
        answerIndex: 0,
        explanation:
          'Taking 4 first strands a remainder of 2 that only single units can fill. Nothing in the greedy method detects this: it returns a valid answer that is simply not minimal, which is the characteristic silent failure.',
      },
      {
        id: 'DSA-019-q2',
        type: 'numeric',
        concept: 'knapsack table',
        prompt: 'Items A(w2,v3), B(w3,v4), C(w4,v5), D(w5,v6) with capacity 8. What is the maximum total value with each item usable at most once?',
        answer: 10,
        explanation:
          'B and D weigh 3 + 5 = 8 exactly and give 4 + 6 = 10. Greedy by value density takes A and B for 7, stranding three units of capacity — which is why this problem needs the table.',
      },
      {
        id: 'DSA-019-q3',
        type: 'multi',
        concept: 'when DP applies',
        prompt: 'Which conditions must hold for dynamic programming to be the right tool?',
        options: [
          'Optimal substructure: optimal solutions are built from optimal solutions of subproblems',
          'Overlapping subproblems: the same states recur across the recursion',
          'The state space must be small enough to enumerate',
          'The input must be sorted',
          'The problem must have no greedy solution',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Substructure and overlap are the classic pair, and tractability of the state space is the practical third. Sortedness is irrelevant, and a problem having a greedy solution does not stop dp from also solving it — usually more slowly.',
      },
      {
        id: 'DSA-019-q4',
        type: 'debug',
        language: 'python',
        concept: 'rolling array direction',
        prompt: 'This space-optimised 0/1 knapsack returns 12 instead of 10 for items A(2,3), B(3,4), C(4,5), D(5,6) at capacity 8. What is wrong?',
        code: `dp = [0] * (cap + 1)
for _, w, v in items:
    for c in range(w, cap + 1):
        dp[c] = max(dp[c], v + dp[c - w])`,
        options: [
          'The capacity loop must run downwards; going upwards lets the same item be taken repeatedly',
          'dp should be initialised to negative infinity',
          'The items must be sorted by weight first',
          'The comparison should be min rather than max',
        ],
        answerIndex: 0,
        explanation:
          'Ascending capacity means dp[c - w] may already include the current item from this same pass, so it is reused — that solves the unbounded knapsack. Descending keeps dp[c - w] at its previous-row value, which is what the 0/1 recurrence needs.',
      },
      {
        id: 'DSA-019-q5',
        type: 'truefalse',
        concept: 'pseudo-polynomial complexity',
        prompt: 'Because 0/1 knapsack has a Theta(nW) algorithm, it can be solved in polynomial time.',
        answer: false,
        explanation:
          'W is a numeric magnitude written in log2 W bits, so Theta(nW) is exponential in the input length — pseudo-polynomial. With a capacity of 10^9 the table is unusable, and the decision problem remains NP-complete.',
      },
      {
        id: 'DSA-019-q6',
        type: 'order',
        concept: 'designing a dynamic program',
        prompt: 'Put the steps of designing a dynamic program in order.',
        items: [
          'Define the state: the minimum information that determines the rest of the problem',
          'Write the recurrence relating a state to smaller states',
          'Identify the base cases',
          'Choose memoisation or tabulation, and the order to fill states in',
          'Reconstruct the solution from parent pointers or by walking the table backwards',
        ],
        explanation:
          'The state comes first because it determines both the recurrence and the cost — states times transitions. Reconstruction comes last and is a separate concern, since the table stores values rather than decisions.',
      },
      {
        id: 'DSA-019-q7',
        type: 'explain',
        concept: 'greedy proof versus counterexample',
        prompt: 'A colleague proposes a greedy rule for an optimisation problem. Explain how you would evaluate it.',
        rubric: [
          'Tries to break the rule first, by brute-forcing small inputs and comparing against the greedy answer',
          'If it survives, proves it with an exchange argument: swap the greedy choice into an optimal solution without loss, then induct',
          'Notes that greedy failures are silent, so "it passes our tests" is not evidence, and names the dp fallback when the proof fails',
        ],
        sampleAnswer:
          'I look for a counterexample before I look for a proof, because a counterexample is cheaper to find and settles the question outright. Concretely, I write an exhaustive brute force over all inputs up to about size six and compare its answer with the greedy rule on every one; most wrong greedy rules die on a tiny input, such as coins [1, 3, 4] making 6, or three meetings where the shortest sits across the other two. If the rule survives that, I attempt an exchange argument: take any optimal solution that differs from the greedy one, show that the greedy first choice can be substituted into it without reducing its value or breaking feasibility, and then induct on the remaining subproblem. That is what makes earliest-finish-first a theorem rather than a hunch — swapping in the earliest-finishing meeting cannot create a conflict, because everything else starts after a finish time that is no earlier. If I cannot produce that argument in a few sentences, I treat the rule as unproven and switch to dynamic programming, defining the state as the minimum information that determines the rest of the problem. The reason I insist on this discipline is that greedy failures are silent: the algorithm returns a valid, plausible, suboptimal answer with no error, so it will pass review and tests and then quietly cost you ten per cent of something in production for years.',
      },
    ],

    flashcards: [
      { front: 'What two properties does dynamic programming require?', back: 'Optimal substructure — optimal solutions are composed of optimal subsolutions — and overlapping subproblems, meaning the naive recursion revisits the same states. Without overlap it is divide and conquer.' },
      { front: 'How do you prove a greedy algorithm correct?', back: 'An exchange argument: show that any optimal solution can be modified to include the greedy first choice without becoming worse, then induct on the remaining subproblem.' },
      { front: 'The 0/1 knapsack recurrence?', back: 'dp[i][c] = max(dp[i-1][c], v_i + dp[i-1][c - w_i]) when w_i <= c: skip the item, or take it and spend its weight. Theta(nW) time, Theta(W) space with a rolling array.' },
      { front: 'Why is the rolling knapsack array iterated downwards?', back: 'So dp[c - w] still holds the previous row. Iterating upwards lets the same item be taken repeatedly, which solves the unbounded knapsack instead — silently, with a larger answer.' },
      { front: 'The cost formula for any dynamic program?', back: 'Number of distinct states times the transition work per state. Knapsack: nW states, O(1) each. LIS: n states, O(n) each. Edit distance: mn states, O(1) each.' },
      { front: 'Memoisation versus tabulation?', back: 'Top-down caching computes only reachable states but costs recursion depth and hashing; bottom-up tables compute everything but avoid depth limits, have better cache locality, and allow rolling-array space reduction.' },
      { front: 'Why is Theta(nW) knapsack not polynomial?', back: 'W is a magnitude written in log2 W bits, so the table is exponential in the input length — pseudo-polynomial. 0/1 knapsack is NP-hard.' },
      { front: 'A greedy rule that is provably optimal, and one that is not?', back: 'Earliest-finish-first for activity selection is optimal by exchange. Highest-value-density for 0/1 knapsack is not: it returns 7 where the optimum is 10, though it is optimal for the fractional version.' },
    ],

    challenge: {
      title: 'A counterexample hunter for greedy rules',
      brief:
        'Write a harness that takes a problem specification — a brute-force optimal solver and one or more candidate greedy rules — and searches small random inputs for a case where a greedy rule is suboptimal, reporting the smallest such input it finds. Apply it to three problems: coin change with random denominations, 0/1 knapsack with several greedy orderings, and interval scheduling with earliest-start, earliest-finish and shortest-first rules.',
      acceptanceCriteria: [
        'The brute-force solver is exhaustive and obviously correct, even though it is exponential, and is used only on inputs small enough to permit that',
        'Search proceeds from the smallest inputs upwards so the reported counterexample is minimal in size, not merely the first one found',
        'For each problem it reports the counterexample, both objective values, and the ratio — or states that no counterexample was found within the search budget',
        'Finds a counterexample for density-greedy knapsack and for shortest-first scheduling, and finds none for earliest-finish scheduling',
        'Includes a short written note on why the absence of a counterexample is evidence rather than proof, and what the exchange argument for earliest-finish looks like',
      ],
      starterCode: 'from itertools import combinations\nfrom typing import Callable, Iterator\n\ndef brute_force_knapsack(items, cap):\n    """Exhaustive over all subsets. Returns the best achievable value."""\n    ...\n\ndef find_counterexample(generate: Callable[[int], Iterator], optimal, greedy, max_size=7):\n    """Smallest generated input where greedy(x) != optimal(x)."""\n    ...\n',
      language: 'python',
    },

    teachingPrompt: {
      prompt:
        'Teach someone the difference between greedy algorithms and dynamic programming, how to tell which a problem needs, and how to know a greedy rule is actually correct.',
      mustCover: [
        'A greedy algorithm takes the locally best option and never reconsiders, which is fast but correct only when a greedy-choice property holds',
        'Greedy correctness is proved by an exchange argument, and greedy failures are silent rather than loud',
        'Dynamic programming needs optimal substructure and overlapping subproblems, and solves each distinct state once',
        'Its cost is the number of states times the transition work, so choosing the state is the central design decision',
        'Memoisation and tabulation are two implementations of the same recurrence, with different trade-offs',
      ],
      bonusSignals: [
        'gives a concrete counterexample, such as coins [1, 3, 4] making 6 or the knapsack density rule returning 7 instead of 10',
        'mentions that knapsack\'s Theta(nW) is pseudo-polynomial',
        'explains that the table stores values and reconstruction is a separate backwards pass',
        'contrasts 0/1 knapsack with fractional knapsack, where greedy is optimal',
      ],
      sampleExplanation:
        'Both of these are ways of finding the best option among astronomically many, and they differ in whether you are allowed to commit. A greedy method takes whatever looks best right now and never revisits it. Scheduling meetings by always taking the one that finishes earliest really does fit in the most meetings, and you can prove it: if some perfect schedule does not include the earliest-finishing meeting, you can swap it in, because everything else in that schedule starts after a time no earlier than the one you removed — so the swap never creates a clash and never costs you a meeting. That kind of argument, rather than a feeling that the rule is sensible, is what makes a greedy algorithm trustworthy. When no such argument exists, greedy is usually wrong, and wrong in a nasty way: it does not crash or complain, it just quietly hands back a worse answer. With coins worth 1, 3 and 4, making 6 by always taking the biggest coin gives three coins when two would do. Filling a bag by best value-per-kilogram can leave a gap that nothing fits, so a slightly worse first choice would have won. Dynamic programming is what you do when a choice now changes what is worth choosing later. Instead of committing, you work out the best answer for every smaller situation and write it down — for every remaining capacity, for every prefix of the list — and build bigger answers from smaller ones. The knapsack table does exactly that, and it finds ten where the greedy rule finds seven. The cost of this is easy to estimate: count the distinct situations you have to record, and multiply by the work each one takes. That single calculation is also the design advice, because the situations you record are your choice, and recording too little gives wrong answers while recording too much gives a table you cannot afford. Two last things people forget. The table holds numbers, not decisions, so if you want to know which items to pack you have to walk back through it afterwards. And the tidy formula for knapsack is misleading — it is proportional to the capacity itself, not to the number of digits used to write the capacity, so with a realistic capacity the table is hopeless and you are back to approximations.',
    },

    masteryRequirements: { understoodScore: 0.7, proficientScore: 0.85, practiceRequired: 2, teachRequired: true },
  },
];
