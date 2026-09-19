import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'NP-001',
    domain: 'NP',
    module: 'The ndarray',
    topic: 'Why arrays exist',
    title: "The ndarray: NumPy's Core Object",
    slug: 'the-ndarray',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: [],
    related: [],
    tags: ['ndarray', 'numpy', 'memory', 'dtype', 'vectorisation', 'performance'],

    learningObjectives: [
      'Explain how an ndarray stores data differently from a Python list, and why that difference exists',
      'Describe the three consequences of contiguous typed memory: speed, fixed dtype, and fixed size',
      'Create an array from a Python list and inspect its type, dtype and shape',
      'Measure and explain a real speed-up when a Python loop is replaced by an array expression',
    ],

    terminology: [
      {
        term: 'ndarray',
        definition:
          "NumPy's N-dimensional array: a fixed-size block of same-typed values stored contiguously in memory, plus a small header describing shape, dtype and strides.",
        simple: 'A long row of identical-sized boxes in memory, with a label saying how to read them as rows and columns.',
      },
      {
        term: 'dtype',
        definition:
          'The single data type shared by every element of an array, such as `int64`, `float64` or `bool`. It fixes how many bytes each element occupies and how those bytes are interpreted.',
        simple: 'What kind of thing is in every box, and how big each box is.',
      },
      {
        term: 'Contiguous memory',
        definition:
          'The elements occupy one unbroken run of bytes, so element k lives at a computable offset from element 0 — no pointer chasing required.',
        simple: 'All the boxes sit next to each other, so the computer can walk straight along them.',
      },
      {
        term: 'Vectorisation',
        definition:
          'Expressing an operation over a whole array at once, so the loop runs inside compiled C rather than in the Python interpreter.',
        simple: 'Telling NumPy "double everything" instead of doubling each item yourself.',
      },
      {
        term: 'Homogeneous',
        definition:
          'Every element of an ndarray has the same type. Mixing types forces NumPy to pick one common type for all of them, or fall back to a slow object array.',
        simple: 'Everything in the array has to be the same kind of thing.',
      },
    ],

    simpleExplanation:
      "A Python list is flexible in a way that costs you dearly. It can hold a number, a word and another list all at once, so Python cannot store the actual values side by side — it stores a row of addresses, and each address points off to a separate object somewhere else in memory. Every time you add one to a number in that list, Python must follow the address, look up what type of thing it found, decide what addition means for that type, build a brand-new object for the answer, and store its address back. A NumPy array refuses all that flexibility on purpose. You promise up front that every element is, say, a 64-bit float, so NumPy can lay the raw bytes down in one unbroken run and know exactly where element 10,000 begins without looking. Once the data is arranged like that, adding one to a million numbers becomes a tight loop in compiled C, with no type checks and no new objects. That single trade — give up mixed types, gain contiguous typed memory — is the whole reason NumPy exists, and it is why arrays are typically tens to hundreds of times faster than lists for numerical work.",

    whyItExists:
      'Python lists are lists of pointers to boxed objects, so numerical loops pay for pointer indirection, per-element type dispatch and object allocation on every single operation. That makes pure-Python numerics one to three orders of magnitude too slow for real data. NumPy exists to give Python one data structure with the memory layout that numerical hardware actually wants — typed, contiguous, fixed-size — and to push the loops down into compiled code.',

    analogy: {
      scenario:
        'Picture two ways of running a cloakroom. The first gives every guest a numbered ticket, and each ticket is a note telling a runner which of a hundred scattered rooms the coat ended up in. To fetch fifty coats, the runner makes fifty separate journeys and has to read each note first. The second cloakroom has one long rail of identical hangers, every coat the same size, packed in order. To fetch coats forty to ninety the attendant simply walks the rail, because coat number k is always exactly k hanger-widths from the start.',
      mapping: [
        { from: 'Tickets pointing at scattered rooms', to: 'A Python list: an array of pointers to objects spread across the heap' },
        { from: 'Reading each note before fetching', to: 'Per-element type checking by the interpreter' },
        { from: 'The single rail of identical hangers', to: "An ndarray's contiguous block of same-dtype bytes" },
        { from: 'Coat k is k hanger-widths along', to: 'Element k lives at `base_address + k * itemsize`, computed not searched' },
        { from: 'Refusing to hang a bicycle on the coat rail', to: 'The homogeneity rule — one dtype for the whole array' },
      ],
      bridge:
        'The rail is fast for exactly the reason the array is fast: uniform size means position can be calculated instead of looked up, and adjacency means the hardware fetches neighbours for free into cache. The refusal is the price. A list will happily hold a string next to a float; an array will not, and when you force it, NumPy either widens every element to a common type or degrades to a `dtype=object` array that is as slow as a list with extra steps.',
      limitations:
        'The cloakroom picture suggests arrays are simply lists that are fussier. The deeper point is that an ndarray is really two things: a flat buffer of bytes and a separate small description of how to read it. That separation is what makes reshaping and slicing nearly free, which the analogy cannot show.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'Two ways to store [1, 2, 3, 4]',
        caption: 'The list stores addresses; the array stores the numbers themselves.',
        art: `PYTHON LIST                          NUMPY ARRAY (dtype=int64)

  list object                          ndarray header
  +--------+                           +-------------------------+
  | ptr[0] |---> PyObject(int 1)       | shape=(4,) dtype=int64  |
  | ptr[1] |---> PyObject(int 2)       | strides=(8,)            |
  | ptr[2] |---> PyObject(int 3)       +-----------+-------------+
  | ptr[3] |---> PyObject(int 4)                   |
  +--------+                                       v
                                       data buffer (32 bytes, one run)
  4 pointers + 4 heap objects,         +----+----+----+----+
  each ~28 bytes, scattered            |  1 |  2 |  3 |  4 |
                                       +----+----+----+----+
                                       byte  0    8   16   24`,
      },
      {
        kind: 'compare',
        title: 'Python list versus NumPy ndarray',
        caption: 'Every row is a direct consequence of the memory layout above.',
        left: {
          heading: 'list',
          points: [
            'Heterogeneous: any object, any mix of types',
            'Stores pointers; values scattered on the heap',
            'Grows and shrinks (`append`, `pop`) cheaply',
            '`[1, 2, 3] * 2` repeats the list',
            'Arithmetic needs an explicit Python loop',
            'About 10-100x slower for numerical work',
          ],
        },
        right: {
          heading: 'ndarray',
          points: [
            'Homogeneous: one dtype for every element',
            'Stores raw values in one contiguous buffer',
            'Fixed size; growing means allocating a new array',
            '`np.array([1, 2, 3]) * 2` doubles each element',
            'Arithmetic is written once and applied to all',
            'Loops run in compiled C, often using SIMD',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Explore an array in memory',
        caption: 'Watch how the flat buffer and the shape description are two separate things.',
        widget: 'ndarray-explorer',
      },
      {
        kind: 'table',
        title: 'What one million additions actually costs',
        caption: 'Indicative timings on a laptop; your numbers will differ but the ratios will not.',
        columns: ['Approach', 'Code', 'Time', 'Where the loop runs'],
        rows: [
          ['Python loop', '`for x in lst: out.append(x + 1)`', '~85 ms', 'CPython bytecode interpreter'],
          ['List comprehension', '`[x + 1 for x in lst]`', '~48 ms', 'Still the interpreter, less overhead'],
          ['NumPy vectorised', '`arr + 1`', '~1.2 ms', 'Compiled C loop over one buffer'],
        ],
      },
    ],

    formalDefinition:
      'A NumPy ndarray is an object consisting of a single contiguous (or strided) buffer of fixed-size elements of one dtype, together with metadata — shape, strides, dtype and a pointer to the data — that maps an N-dimensional index tuple onto a byte offset in that buffer. Element access is address arithmetic, not a search, and element-wise operations are implemented as compiled loops over the buffer.',

    math: {
      intuition:
        'Nothing about an array is magic: the position of an element is computed with multiplication and addition. Because each element occupies the same number of bytes, NumPy can jump straight to any element rather than walking there.',
      formulas: [
        {
          latex: '\\text{addr}(i) = \\text{base} + i \\cdot s',
          name: 'Element address in a 1-D array',
          meaning: 'The byte address of element i is the start of the buffer plus i times the stride.',
          variables: [
            { symbol: '\\text{base}', meaning: 'Byte address of the first element of the buffer' },
            { symbol: 'i', meaning: 'Index of the element you want, counting from 0' },
            { symbol: 's', meaning: 'Stride in bytes between consecutive elements (equal to itemsize for a contiguous array)' },
          ],
        },
        {
          latex: 'T_{\\text{list}} \\approx n \\cdot (c_{\\text{deref}} + c_{\\text{dispatch}} + c_{\\text{alloc}}) \\quad\\text{vs}\\quad T_{\\text{array}} \\approx n \\cdot c_{\\text{flop}}',
          name: 'Where the time goes',
          meaning: 'Both approaches are linear in n, but the constant hidden in a Python loop contains several expensive steps per element that the array version does not pay at all.',
          variables: [
            { symbol: 'n', meaning: 'Number of elements processed' },
            { symbol: 'c_{\\text{deref}}', meaning: 'Cost of following a pointer to a boxed object' },
            { symbol: 'c_{\\text{dispatch}}', meaning: 'Cost of deciding, at run time, what the operation means for that type' },
            { symbol: 'c_{\\text{alloc}}', meaning: 'Cost of allocating a new Python object for each result' },
            { symbol: 'c_{\\text{flop}}', meaning: 'Cost of one machine arithmetic instruction, often amortised further by SIMD' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Both a Python loop and a NumPy expression touch every one of the n elements, so both are O(n). Complexity class is not the difference.',
        'In the Python loop each element costs a pointer dereference, a type lookup, a dispatch to the correct `__add__`, and an allocation for the result object.',
        'In the NumPy expression those four costs are paid once for the whole array, during dispatch to the compiled ufunc, and then amortised over all n elements.',
        'What remains inside the C loop is arithmetic on values already in registers, over memory the CPU can prefetch because it is contiguous.',
        'The result is a constant-factor win of roughly 10x to 100x, which is exactly the range that decides whether a data pipeline finishes in seconds or in an hour.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Your first array, and what it knows about itself',
        runnable: true,
        code: `import numpy as np

scores = np.array([91, 78, 64, 88])

print(scores)
print(type(scores))
print("dtype    :", scores.dtype)
print("shape    :", scores.shape)
print("itemsize :", scores.itemsize, "bytes per element")
print("nbytes   :", scores.nbytes, "bytes in total")`,
        output: `[91 78 64 88]
<class 'numpy.ndarray'>
dtype    : int64
shape    : (4,)
itemsize : 8 bytes per element
nbytes   : 32 bytes in total`,
        explanation:
          'Three things are worth noticing. The printed array has no commas, which is how you can tell an ndarray from a list at a glance. NumPy chose `int64` for you by inspecting the values — you did not ask for a type, but the array must have exactly one. And `nbytes` is simply `size * itemsize`: four elements of eight bytes each, in one unbroken 32-byte run.',
      },
      {
        language: 'python',
        title: 'The same operator means different things',
        runnable: true,
        code: `import numpy as np

lst = [1, 2, 3]
arr = np.array([1, 2, 3])

print("list  * 2 ->", lst * 2)
print("array * 2 ->", arr * 2)

print("list  + list  ->", lst + [10, 20, 30])
print("array + array ->", arr + np.array([10, 20, 30]))

# A list needs an explicit loop to do element-wise maths:
print("loop          ->", [x * 2 for x in lst])`,
        output: `list  * 2 -> [1, 2, 3, 1, 2, 3]
array * 2 -> [2 4 6]
list  + list  -> [1, 2, 3, 10, 20, 30]
array + array -> [11 22 33]
loop          -> [2, 4, 6]`,
        explanation:
          'For a list, `*` means repeat and `+` means concatenate, because a list is a generic container with no notion of arithmetic. For an array, `*` and `+` mean element-wise multiply and add, because an array is a mathematical object whose elements are all numbers of the same type. This is the first place beginners get bitten: the code looks identical and the behaviour is completely different.',
      },
      {
        language: 'python',
        title: 'Measuring the speed-up honestly',
        runnable: true,
        code: `import numpy as np
import time

n = 5_000_000
lst = list(range(n))
arr = np.arange(n)

t0 = time.perf_counter()
squares_list = [x * x for x in lst]
t1 = time.perf_counter()

t2 = time.perf_counter()
squares_arr = arr * arr
t3 = time.perf_counter()

print(f"list comprehension : {(t1 - t0) * 1000:7.1f} ms")
print(f"numpy vectorised   : {(t3 - t2) * 1000:7.1f} ms")
print(f"speed-up           : {(t1 - t0) / (t3 - t2):7.1f}x")
print("same answer?", squares_list[:5] == list(squares_arr[:5]))`,
        output: `list comprehension :   372.4 ms
numpy vectorised   :     8.9 ms
speed-up           :    41.8x
same answer? True`,
        explanation:
          'The list comprehension is already the fast way to do this in pure Python, and NumPy still beats it by a large factor. The saving is not algorithmic — both do n multiplications — it is the per-element interpreter overhead that disappears. Always measure with `time.perf_counter` or `timeit` rather than trusting intuition, and always check the answers match before celebrating a speed-up.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Loading an image for a vision model',
        usage:
          'A 1920x1080 colour photograph is 6.2 million numbers. As a nested Python list that is millions of separate int objects and roughly 200 MB; as a `uint8` ndarray it is one contiguous 6.2 MB buffer that a GPU can be handed directly.',
      },
      {
        context: 'Every library you will use downstream',
        usage:
          'pandas stores each column as an ndarray, scikit-learn expects `X` as a 2-D float array, matplotlib plots arrays, and PyTorch tensors deliberately copy the ndarray design. Learning this object once pays off in five more domains.',
      },
      {
        context: 'Feature scaling on a training set',
        usage:
          'Standardising a 1M-row by 50-column matrix with `(X - X.mean(0)) / X.std(0)` takes a fraction of a second. The equivalent nested Python loop takes minutes and is written across ten error-prone lines.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.values` and `Series.to_numpy()` expose the ndarray each column is built on.' },
      { tool: 'scikit-learn', role: 'Every `fit(X, y)` call converts its inputs to 2-D and 1-D float ndarrays before doing anything else.' },
      { tool: 'PyTorch', role: '`torch.from_numpy(arr)` wraps the same buffer with zero copying, which is why NumPy fluency transfers directly to tensors.' },
      { tool: 'Pillow / OpenCV', role: 'Images are returned as `uint8` ndarrays of shape `(height, width, channels)`.' },
    ],

    commonMistakes: [
      {
        mistake: 'Building an array by repeatedly calling `np.append` in a loop',
        why: 'An ndarray has a fixed size, so `np.append` allocates a whole new buffer and copies everything every time. A loop of n appends is O(n squared) and is frequently slower than the Python loop it replaced.',
        fix: 'Collect into a Python list and convert once with `np.array(rows)`, or preallocate with `np.empty(n)` and assign into slots, or build the result vectorised in the first place.',
      },
      {
        mistake: 'Expecting `arr1 + arr2` to concatenate, as `list1 + list2` does',
        why: 'Operators on arrays are element-wise mathematics, not container operations. If the shapes do not match you get `ValueError: operands could not be broadcast together with shapes (3,) (4,)` rather than a longer array.',
        fix: 'Use `np.concatenate([a, b])` to join arrays end to end. Reserve `+` for arithmetic.',
      },
      {
        mistake: 'Mixing strings and numbers in `np.array([1, 2, "three"])`',
        why: 'The array must have one dtype, so NumPy silently widens everything to `<U21` strings. Arithmetic then fails with `UFuncTypeError`, often far from the line that caused it.',
        fix: 'Keep numeric data numeric. Check `arr.dtype` immediately after construction — if it says `<U...` or `object`, something non-numeric leaked in.',
      },
      {
        mistake: 'Assuming NumPy is faster for everything, including tiny arrays',
        why: 'Each NumPy call has a fixed overhead of a few microseconds for dispatch and allocation. On three elements, that overhead dominates and a plain Python expression wins.',
        fix: 'Vectorise where n is large, which is nearly always the case with real data. Do not rewrite three-element arithmetic into array calls for speed.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is a NumPy array faster than a Python list for numerical work, given both are O(n)?',
        answer:
          'The complexity is the same; the constant factor is not. A list is an array of pointers to boxed Python objects, so every operation costs a pointer dereference, a run-time type check, a dynamic dispatch and an allocation for the result. An ndarray stores raw values of one dtype contiguously, so NumPy pays those costs once per call rather than once per element and then runs a compiled C loop over memory that the CPU can prefetch and often vectorise with SIMD instructions. The typical result is a 10x to 100x speed-up.',
        followUp:
          'A strong answer also mentions cache locality: contiguous data means a cache line fetch brings in several useful neighbours, which scattered heap objects never do.',
      },
      {
        level: 'intermediate',
        question: 'What are you giving up by choosing an ndarray over a list, and when would you still choose the list?',
        answer:
          'You give up heterogeneity and cheap resizing. An array holds exactly one dtype, so mixed records do not fit, and it has a fixed size, so appending means reallocating and copying the whole buffer. A list is the better choice when you are accumulating an unknown number of items, when the elements are genuinely different types or arbitrary Python objects, or when the collection is small enough that per-call NumPy overhead dominates. A common professional pattern is to accumulate into a list and convert to an array once at the end.',
      },
      {
        level: 'ml-engineer',
        question: 'A colleague reports that switching to NumPy made their code slower. What would you look for?',
        answer:
          'Three usual causes. First, growing arrays inside a loop with `np.append` or `np.concatenate`, which is quadratic copying. Second, looping over the array in Python and indexing element by element, which keeps all the interpreter overhead and adds scalar-to-array boxing on top. Third, an accidental `dtype=object` array, which stores pointers exactly like a list but routes every operation through slower generic machinery. I would check `arr.dtype`, look for Python-level `for` loops over array elements, and profile with `timeit` on a representative size rather than a toy one.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Create an array of the five numbers 2, 4, 6, 8, 10 and print its dtype, shape, itemsize and nbytes. Then verify by hand that nbytes equals size times itemsize.',
        hint: 'Every one of those is an attribute on the array, accessed without parentheses.',
        language: 'python',
        starterCode: 'import numpy as np\n\nevens = np.array([2, 4, 6, 8, 10])\n',
        solution:
          "import numpy as np\n\nevens = np.array([2, 4, 6, 8, 10])\nprint(evens.dtype, evens.shape, evens.itemsize, evens.nbytes)\n# int64 (5,) 8 40\n\nFive elements at eight bytes each is forty bytes, exactly as reported. Note that `shape` is the tuple `(5,)` and not `5` — the trailing comma is how Python writes a one-element tuple, and it is the array telling you it has exactly one dimension.",
      },
      {
        prompt: 'Predict what `np.array([1, 2, 3]) * 3` prints, and what `[1, 2, 3] * 3` prints. Explain why they differ.',
        hint: 'Ask what `*` means for a generic container versus for a mathematical object.',
        solution:
          'The array prints `[3 6 9]`; the list prints `[1, 2, 3, 1, 2, 3, 1, 2, 3]`.\n\nFor a list, `*` is defined as repetition because a list knows nothing about the meaning of its contents. For an ndarray, `*` is defined as element-wise multiplication because every element is guaranteed to be a number of one known dtype. The same source line therefore does two unrelated things depending on the object, which is worth remembering when reading unfamiliar code.',
      },
      {
        prompt: 'Time summing the integers 0 to 2,000,000 with a Python `for` loop, with the built-in `sum`, and with `arr.sum()`. Report the ratios.',
        hint: 'Use `time.perf_counter()` around each approach, and build the data once beforehand so you are not timing construction.',
        language: 'python',
        solution:
          "import numpy as np, time\n\nn = 2_000_000\nlst = list(range(n))\narr = np.arange(n)\n\ndef timed(fn):\n    t = time.perf_counter()\n    out = fn()\n    return out, (time.perf_counter() - t) * 1000\n\nprint(timed(lambda: sum(x for x in lst))[1])   # ~120 ms\nprint(timed(lambda: sum(lst))[1])              # ~18 ms\nprint(timed(lambda: arr.sum())[1])             # ~1.5 ms\n\nThe explicit generator loop is slowest because it pays interpreter overhead per element. Built-in `sum` is faster because its loop is in C, but it still unboxes a Python int per element. `arr.sum()` never leaves the typed buffer, so it wins by another order of magnitude.",
      },
    ],

    quiz: [
      {
        id: 'NP-001-q1',
        type: 'mcq',
        concept: 'memory layout',
        prompt: 'What is the fundamental difference between how a Python list and a NumPy array store four integers?',
        options: [
          'The array stores the values contiguously; the list stores pointers to separate objects',
          'The array stores the values in sorted order; the list does not',
          'The array stores the values on disk; the list stores them in memory',
          'There is no difference in storage, only in the available methods',
        ],
        answerIndex: 0,
        explanation:
          'The list is a vector of pointers to boxed PyObjects scattered on the heap. The array is one unbroken run of raw values of a single dtype. Every performance difference follows from this one fact.',
      },
      {
        id: 'NP-001-q2',
        type: 'code-output',
        language: 'python',
        concept: 'operator semantics',
        prompt: 'What does this print?',
        code: 'import numpy as np\nprint(np.array([1, 2, 3]) * 2)\nprint([1, 2, 3] * 2)',
        options: [
          '[2 4 6]\n[1, 2, 3, 1, 2, 3]',
          '[2 4 6]\n[2, 4, 6]',
          '[1, 2, 3, 1, 2, 3]\n[1, 2, 3, 1, 2, 3]',
          '[2 4 6]\n[1, 2, 3]',
        ],
        answerIndex: 0,
        explanation:
          'On an array `*` is element-wise arithmetic, giving `[2 4 6]` printed without commas. On a list `*` is repetition, giving a six-element list. Same operator, unrelated meanings.',
      },
      {
        id: 'NP-001-q3',
        type: 'truefalse',
        concept: 'homogeneity',
        prompt: 'A single ndarray can hold integers, floats and strings at the same time, each keeping its own type.',
        answer: false,
        explanation:
          'An ndarray has exactly one dtype. Mixing types makes NumPy widen everything to a common type — usually strings or `object` — rather than preserving each element type individually.',
      },
      {
        id: 'NP-001-q4',
        type: 'code-output',
        language: 'python',
        concept: 'dtype coercion',
        prompt: 'What is printed?',
        code: 'import numpy as np\na = np.array([1, 2, 3.5])\nprint(a.dtype, a)',
        options: [
          'float64 [1.  2.  3.5]',
          'int64 [1 2 3]',
          'object [1 2 3.5]',
          'It raises a TypeError because the types differ',
        ],
        answerIndex: 0,
        explanation:
          'NumPy finds the narrowest type that holds every value. An int and a float together promote to `float64`, so the two integers are stored as 1.0 and 2.0.',
      },
      {
        id: 'NP-001-q5',
        type: 'multi',
        concept: 'why arrays are fast',
        prompt: 'Which of these genuinely contribute to NumPy being faster than a Python loop? Select all that apply.',
        options: [
          'The per-element loop runs in compiled C instead of the interpreter',
          'No new Python object is allocated per element',
          'Contiguous memory gives good cache locality and allows SIMD',
          'NumPy uses a better algorithm with lower time complexity',
          'NumPy automatically runs every operation on the GPU',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'The win is entirely in the constant factor: compiled loops, no per-element boxing, and hardware-friendly memory. The complexity class is unchanged, and stock NumPy is a CPU library.',
      },
      {
        id: 'NP-001-q6',
        type: 'explain',
        concept: 'the core trade-off',
        prompt: 'In three or four sentences, explain the trade-off an ndarray makes and why that trade-off pays off for machine learning.',
        rubric: [
          'States that flexibility (mixed types, cheap resizing) is given up',
          'States that contiguous typed memory is gained',
          'Connects that layout to compiled loops and to real speed',
        ],
        sampleAnswer:
          'An ndarray insists that every element has the same type and that the array has a fixed size. In exchange it can store the raw values in one unbroken block of memory, so the address of any element can be computed rather than looked up. That lets NumPy run the actual arithmetic in a compiled C loop over data the CPU can prefetch, instead of a Python loop that dereferences and type-checks each element. Machine learning is almost entirely arithmetic over large homogeneous numeric collections, so the flexibility being sacrificed was never needed and the speed being bought is decisive.',
        explanation:
          'A good answer frames it as a deliberate exchange rather than as "NumPy is just better", and names the mechanism that turns layout into speed.',
      },
    ],

    flashcards: [
      { front: 'What is an ndarray in one sentence?', back: 'A fixed-size, contiguous block of same-dtype values, plus metadata (shape, strides, dtype) describing how to read that block as N dimensions.' },
      { front: 'Why is a Python list slow for numerics?', back: 'It stores pointers to boxed objects, so every operation costs a dereference, a type check, a dispatch and an allocation, per element.' },
      { front: '`arr + arr` versus `lst + lst`', back: 'Arrays add element-wise; lists concatenate. Use `np.concatenate` when you want to join arrays.' },
      { front: 'What does `np.array([1, 2, "three"]).dtype` give?', back: "A string dtype such as `<U21` — one dtype must cover all elements, so the numbers become text and arithmetic then fails." },
      { front: 'Why is `np.append` in a loop a bad idea?', back: 'Arrays are fixed size, so each append copies the whole buffer, making the loop O(n squared). Build a list and convert once instead.' },
      { front: 'Typical NumPy speed-up over a Python loop', back: 'Roughly 10x to 100x — a constant-factor win from compiled loops and cache-friendly layout, not a better algorithm.' },
    ],

    challenge: {
      title: 'Benchmark the boundary',
      brief:
        'Find the array size at which NumPy stops losing and starts winning. Write a script that, for sizes 10, 100, 1000, 10_000, 100_000 and 1_000_000, times computing the element-wise square with a list comprehension and with a NumPy expression, and prints a small table of both timings plus the ratio. Repeat each measurement several times and take the best, since a single run is dominated by noise. Then write one comment stating the crossover size you observed and why a crossover exists at all.',
      language: 'python',
      acceptanceCriteria: [
        'Both approaches are timed at every listed size on the same data',
        'Each timing is the best of at least five repetitions',
        'A readable table of size, list time, array time and ratio is printed',
        'A comment names the observed crossover size and attributes it to fixed per-call overhead',
      ],
      starterCode: 'import numpy as np\nimport time\n\nsizes = [10, 100, 1_000, 10_000, 100_000, 1_000_000]\n',
    },

    teachingPrompt: {
      prompt:
        'A friend who knows Python lists asks why they should bother learning NumPy at all. Explain what an ndarray is and why it is faster, without hand-waving.',
      mustCover: [
        'A list holds pointers to separate objects; an array holds raw values side by side',
        'An array requires one dtype and a fixed size — that is the price paid',
        'Contiguous typed memory lets the loop run in compiled C with no per-element boxing',
        'The gain is a large constant factor, not a change in time complexity',
      ],
      bonusSignals: ['mentions cache locality or SIMD', 'mentions dtype=object as the slow trap', 'gives a measured number rather than a vague claim'],
      sampleExplanation:
        'A Python list is a row of addresses. The numbers themselves live wherever Python happened to put them, so adding one to every element means following each address, checking what kind of object is there, working out what plus means for it, and building a new object for the answer. A NumPy array makes you promise that every element is the same type, and in return it stores the actual numbers in one unbroken strip of memory. Now element ten thousand is simply eighty thousand bytes from the start, and adding one to everything is a tight loop in compiled C with no type checks and no allocations. The algorithm has not changed — both touch every element once — but the cost per element collapses, which in practice means something like fifty times faster. That is worth learning for the price of giving up mixed types in a collection that was never going to hold mixed types anyway.',
    },
  },

  {
    id: 'NP-002',
    domain: 'NP',
    module: 'The ndarray',
    topic: 'Shape and dtype',
    title: 'Shape, Dimensions and dtype',
    slug: 'shape-dimensions-and-dtype',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['NP-001'],
    related: [],
    tags: ['shape', 'ndim', 'size', 'dtype', 'itemsize', 'axis', 'overflow'],

    learningObjectives: [
      'Read an array literal and state its shape, ndim and size before running any code',
      'Explain what each position in a shape tuple means, and what a 3-D array physically represents',
      'Choose a dtype deliberately and predict the memory cost with size times itemsize',
      'Diagnose the two classic dtype failures: integer overflow and unwanted integer truncation',
    ],

    terminology: [
      {
        term: 'shape',
        definition:
          'A tuple giving the length of the array along each axis, outermost first. `(2, 3, 4)` means two blocks of three rows of four columns.',
        simple: 'How many things there are in each direction.',
      },
      {
        term: 'ndim',
        definition:
          'The number of axes, equal to `len(shape)`. It is the number of index values you must supply to reach a single element.',
        simple: 'How many numbers you need to point at one value.',
      },
      {
        term: 'size',
        definition: 'The total number of elements, equal to the product of the shape tuple. Independent of how the array is arranged.',
        simple: 'How many values there are altogether.',
      },
      {
        term: 'axis',
        definition:
          'One named direction through the array, numbered from 0 outermost. For a 2-D array, axis 0 runs down the rows and axis 1 runs across the columns.',
        simple: 'A direction you can travel in the array — down, across, or deeper.',
      },
      {
        term: 'itemsize',
        definition: 'The number of bytes one element occupies, determined entirely by the dtype: 8 for `float64`, 4 for `int32`, 1 for `uint8` and `bool`.',
        simple: 'How big each single box is.',
      },
    ],

    simpleExplanation:
      "Every array carries a small label describing its geometry, and reading that label fluently is most of what it means to be good at NumPy. The label is the shape: a tuple of numbers, one per direction. `(5,)` is a plain run of five values. `(3, 4)` is three rows of four columns — read it outside in, so the first number is how many rows and the last number is how long each row is. `(2, 3, 4)` is two of those tables stacked behind each other, like two pages of a notebook, each page three rows by four columns. That is what three-dimensional actually means: not something mystical, just a box of pages. The number of entries in the tuple is `ndim`, and multiplying the entries gives `size`, the total count of values. Alongside the shape sits the dtype, which says what one value is and therefore how many bytes it takes. Shape tells you how the data is arranged; dtype tells you what it is made of; between them they determine everything about how the array behaves and how much memory it costs.",

    whyItExists:
      'Real data is rarely a flat line of numbers: a dataset is rows by features, a greyscale image is height by width, a batch of colour images is batch by height by width by channels. The shape tuple exists to record that structure separately from the flat buffer, so the same bytes can be viewed as different geometries for free, and so a library can refuse an operation whose shapes cannot sensibly meet.',

    analogy: {
      scenario:
        "Think of a large office building. To find one person you need three facts in a fixed order: which floor, which row of desks on that floor, which desk in that row. Say '3, 2, 7' and everyone knows exactly which desk you mean, because the order of the numbers is agreed in advance. The building's own description — six floors, four rows per floor, ten desks per row — never changes as people move around, and multiplying those three numbers tells you how many desks exist in total.",
      mapping: [
        { from: 'Floor, then row, then desk', to: 'The axes of a 3-D array, outermost (axis 0) first' },
        { from: 'The agreed order of the three numbers', to: 'Index order: `arr[floor, row, desk]` is `arr[i, j, k]`' },
        { from: '"six floors, four rows, ten desks"', to: 'The shape tuple `(6, 4, 10)`' },
        { from: 'Three facts needed to reach one person', to: '`ndim == 3`' },
        { from: '6 x 4 x 10 = 240 desks in the building', to: '`size == 240`, the product of the shape' },
        { from: 'Whether each desk holds a person or a filing cabinet', to: 'The dtype — what kind of value sits in every slot' },
      ],
      bridge:
        'The building makes the two independent ideas concrete: geometry (how many of each thing, in which order) is entirely separate from contents (what sits in each slot). NumPy keeps them separate too, which is why `arr.reshape(...)` can rearrange the geometry without touching a single byte of data, and why `arr.astype(...)` changes the contents type while leaving the geometry alone.',
      limitations:
        'Buildings stop at three dimensions and our intuition stops with them. A 4-D array of shape `(32, 3, 224, 224)` — a batch of 32 colour images — is entirely ordinary in deep learning, and the only way to handle it is to stop visualising and start reading the shape tuple positionally.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'What 1-D, 2-D and 3-D actually look like',
        caption: 'Read a shape tuple from the outside in: the last number is always the innermost run.',
        art: `shape (4,)            ndim 1   size 4
  [ 10  20  30  40 ]


shape (3, 4)          ndim 2   size 12
        axis 1 ->
  a  [ 10  20  30  40 ]
  x  [ 50  60  70  80 ]
  i  [ 90 100 110 120 ]
  s
  0


shape (2, 3, 4)       ndim 3   size 24

  block 0 (axis 0 index 0)      block 1 (axis 0 index 1)
  [ 10  20  30  40 ]            [  1   2   3   4 ]
  [ 50  60  70  80 ]            [  5   6   7   8 ]
  [ 90 100 110 120 ]            [  9  10  11  12 ]

  arr[1, 2, 0] == 9   ->  block 1, row 2, column 0`,
      },
      {
        kind: 'table',
        title: 'Reading shapes that occur in real work',
        caption: 'Being able to say what each position means is the skill this unit is really teaching.',
        columns: ['Shape', 'ndim', 'size', 'What it usually is'],
        rows: [
          ['`(1000,)`', '1', '1000', 'One feature, or a target vector y, for 1000 samples'],
          ['`(1000, 20)`', '2', '20000', 'A design matrix X: 1000 samples, 20 features'],
          ['`(28, 28)`', '2', '784', 'One greyscale MNIST image, height by width'],
          ['`(60000, 28, 28)`', '3', '47040000', 'The whole MNIST training set of greyscale images'],
          ['`(32, 224, 224, 3)`', '4', '4816896', 'A batch of 32 RGB photographs, channels last'],
        ],
      },
      {
        kind: 'widget',
        title: 'Change the shape, watch the geometry',
        caption: 'Set a shape and see which index tuple reaches which element of the flat buffer.',
        widget: 'ndarray-explorer',
      },
      {
        kind: 'table',
        title: 'The dtypes worth knowing',
        caption: 'Memory cost is exactly `size * itemsize`, so dtype choice is a real engineering decision at scale.',
        columns: ['dtype', 'itemsize', 'Range or precision', 'Typical use'],
        rows: [
          ['`bool`', '1 byte', 'True / False', 'Masks produced by comparisons'],
          ['`uint8`', '1 byte', '0 to 255', 'Raw image pixels'],
          ['`int32`', '4 bytes', 'about -2.1e9 to 2.1e9', 'Counts, indices in memory-tight code'],
          ['`int64`', '8 bytes', 'about -9.2e18 to 9.2e18', 'Default integer on Linux and macOS'],
          ['`float32`', '4 bytes', 'about 7 decimal digits', 'Deep learning weights and activations'],
          ['`float64`', '8 bytes', 'about 16 decimal digits', 'Default float; scientific computation'],
        ],
      },
    ],

    formalDefinition:
      'An ndarray of shape `(d0, d1, ..., d(n-1))` has `ndim = n` axes and `size = d0 * d1 * ... * d(n-1)` elements, each of `itemsize` bytes as fixed by its dtype, so the data buffer occupies `nbytes = size * itemsize`. A valid index is an n-tuple `(i0, ..., i(n-1))` with `0 <= ik < dk`, and in C order the element it names lies at flat offset `i0*(d1*...*d(n-1)) + i1*(d2*...*d(n-1)) + ... + i(n-1)`.',

    math: {
      intuition:
        'Two formulas carry almost all of the practical weight here. One says how many elements you have, and therefore how much memory; the other says how an N-dimensional index collapses into a single position in the flat buffer, which is why reshaping is free.',
      formulas: [
        {
          latex: '\\text{size} = \\prod_{k=0}^{n-1} d_k \\qquad \\text{nbytes} = \\text{size} \\times \\text{itemsize}',
          name: 'Element count and memory footprint',
          meaning: 'Multiply the shape entries to get the number of elements; multiply by the bytes per element to get the memory used.',
          variables: [
            { symbol: 'n', meaning: 'Number of axes, i.e. `ndim`' },
            { symbol: 'd_k', meaning: 'Length of the array along axis k' },
            { symbol: '\\text{itemsize}', meaning: 'Bytes per element, fixed by the dtype (8 for float64, 1 for uint8)' },
          ],
        },
        {
          latex: '\\text{offset}(i_0, \\ldots, i_{n-1}) = \\sum_{k=0}^{n-1} i_k \\prod_{j=k+1}^{n-1} d_j',
          name: 'C-order (row-major) flat offset',
          meaning: 'The position of an element in the one-dimensional buffer, given its multi-dimensional index. The last axis varies fastest.',
          variables: [
            { symbol: 'i_k', meaning: 'Index along axis k' },
            { symbol: 'd_j', meaning: 'Length of axis j' },
            { symbol: '\\prod_{j=k+1}^{n-1} d_j', meaning: 'How many elements you skip by advancing one step along axis k' },
          ],
        },
      ],
      derivation: [
        'Take shape (2, 3, 4), so d0 = 2, d1 = 3, d2 = 4 and size = 24.',
        'Advancing one step along the last axis moves one element, since nothing is nested inside it.',
        'Advancing one step along axis 1 skips a whole run of d2 = 4 elements.',
        'Advancing one step along axis 0 skips a whole block of d1 * d2 = 12 elements.',
        'So offset(1, 2, 0) = 1*12 + 2*4 + 0*1 = 20: element 20 of the 24 in the flat buffer.',
        'Multiplying each of those strides by itemsize gives the `strides` attribute in bytes — for a contiguous float64 array of this shape, (96, 32, 8).',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Reading the geometry of an array',
        runnable: true,
        code: `import numpy as np

a = np.array([10, 20, 30, 40])
b = np.array([[10, 20, 30, 40],
              [50, 60, 70, 80],
              [90, 100, 110, 120]])
c = np.arange(24).reshape(2, 3, 4)

for name, arr in [("a", a), ("b", b), ("c", c)]:
    print(f"{name}: shape={arr.shape} ndim={arr.ndim} size={arr.size} "
          f"dtype={arr.dtype} nbytes={arr.nbytes}")

print("c[1, 2, 0] =", c[1, 2, 0])
print("strides    =", c.strides)`,
        output: `a: shape=(4,) ndim=1 size=4 dtype=int64 nbytes=32
b: shape=(3, 4) ndim=2 size=12 dtype=int64 nbytes=96
c: shape=(2, 3, 4) ndim=3 size=24 dtype=int64 nbytes=192
c[1, 2, 0] = 20
strides    = (96, 32, 8)
`,
        explanation:
          'Confirm each number against the formulas rather than accepting them. `b` has 3 x 4 = 12 elements of 8 bytes, hence 96 bytes. `c[1, 2, 0]` is flat offset 1*12 + 2*4 + 0 = 20, and since `arange` filled the buffer with 0..23 the value stored there is 20. The strides `(96, 32, 8)` say: stepping one block costs 96 bytes, one row costs 32, one column costs 8.',
      },
      {
        language: 'python',
        title: 'Choosing a dtype on purpose',
        runnable: true,
        code: `import numpy as np

pixels = np.zeros((1080, 1920, 3), dtype=np.uint8)
weights = np.zeros((1080, 1920, 3), dtype=np.float64)

print("uint8  :", pixels.nbytes / 1e6, "MB")
print("float64:", weights.nbytes / 1e6, "MB")

counts = np.array([1, 2, 3], dtype=np.int32)
print(counts.dtype, counts.itemsize)

as_float = counts.astype(np.float32)
print(as_float.dtype, as_float, as_float.itemsize)

# astype always copies; the original is untouched
as_float[0] = 99.0
print("original still:", counts)`,
        output: `uint8  : 6.2208 MB
float64: 49.7664 MB
int32 4
float32 [1. 2. 3.] 4
original still: [1 2 3]`,
        explanation:
          'The same geometry costs eight times more memory in `float64` than in `uint8`, which is why image pipelines keep pixels as `uint8` until the moment they must be scaled. `astype` returns a new array with a new buffer — it never converts in place — so mutating the result cannot affect the original. That copy is also why repeated casting inside a loop is a quiet performance problem.',
      },
      {
        language: 'python',
        title: 'The two dtype traps: truncation and overflow',
        runnable: true,
        code: `import numpy as np

# Trap 1: an integer array stays integer, so division truncates on assignment
counts = np.array([7, 8, 9])
counts_copy = counts.copy()
counts_copy[0] = 7 / 2          # 3.5 stored into an int64 slot
print("truncated:", counts_copy)
print("true division keeps floats:", counts / 2, (counts / 2).dtype)

# Trap 2: fixed-width integers wrap around silently
small = np.array([250, 251, 252], dtype=np.uint8)
print("before:", small)
print("after +10:", small + 10)

big = np.array([2**62], dtype=np.int64)
print("int64 doubled:", big * 4)`,
        output: `truncated: [3 8 9]
true division keeps floats: [3.5 4.  4.5] float64
before: [250 251 252]
after +10: [4 5 6]
int64 doubled: [0]
`,
        explanation:
          'Assigning 3.5 into an `int64` array silently truncates to 3, because the buffer physically cannot hold a float. Adding 10 to `uint8` values near 255 wraps around modulo 256, giving 4, 5 and 6 with no warning in recent NumPy versions other than at most a RuntimeWarning. These are not bugs; they are the cost of fixed-width typed memory, and they are why checking `arr.dtype` is a habit worth forming.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Debugging a scikit-learn error',
        usage:
          '`ValueError: Expected 2D array, got 1D array instead` is a shape message. The fix is `X.reshape(-1, 1)` to turn shape `(n,)` into `(n, 1)`, and being able to read the shape tells you that instantly instead of after twenty minutes of guessing.',
      },
      {
        context: 'Fitting a model into GPU memory',
        usage:
          'Deep learning runs in `float32`, and mixed precision pushes activations to `float16`, precisely because `nbytes = size * itemsize`. Halving itemsize halves the memory and often doubles the batch size you can afford.',
      },
      {
        context: 'Image pipelines',
        usage:
          'OpenCV hands you `(height, width, 3)` `uint8`. PyTorch wants `(3, height, width)` `float32` scaled to 0-1. Almost every image bug in practice is a shape order or a dtype scaling mismatch between those two conventions.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: 'Enforces `X` of shape `(n_samples, n_features)` and `y` of shape `(n_samples,)`; nearly all of its input errors are shape errors.' },
      { tool: 'PyTorch', role: '`tensor.shape` and `tensor.dtype` are the same concepts; `float32` is the default because of the memory formula in this unit.' },
      { tool: 'pandas', role: '`df.dtypes` shows the per-column NumPy dtype, and an unexpected `object` column is usually numeric data with a stray string in it.' },
    ],

    commonMistakes: [
      {
        mistake: 'Confusing shape `(n,)` with shape `(n, 1)`',
        why: 'The first is 1-D with one axis; the second is 2-D with n rows and one column. They print similarly in some contexts but broadcast completely differently, and libraries that demand 2-D input reject the first.',
        fix: 'Print `arr.shape` and count the entries in the tuple. Convert deliberately with `arr.reshape(-1, 1)` or `arr[:, np.newaxis]` when a column vector is required.',
      },
      {
        mistake: 'Reading `(3, 4)` as "three columns and four rows"',
        why: 'Shape tuples are outermost first, so `(3, 4)` is three rows of four columns. Reversing it makes every subsequent index and every axis argument wrong.',
        fix: 'Say the shape aloud as "3 of, each containing 4". The last number is always the length of the innermost run.',
      },
      {
        mistake: 'Assuming integer arrays will hold a fractional result',
        why: 'An `int64` buffer has no space for a fraction, so `arr[0] = 7 / 2` stores 3. The division itself was fine; the assignment truncated.',
        fix: 'Create the array as float when it will hold fractions, or cast once with `arr = arr.astype(float)` before assigning into it.',
      },
      {
        mistake: 'Using a narrow dtype for values that grow',
        why: 'Fixed-width integers wrap around silently: `np.uint8(250) + 10` gives 4, and a cumulative sum in `int32` can overflow on a large dataset without raising anything.',
        fix: 'Keep counters in `int64`, keep accumulations in `float64`, and reserve `uint8` for data that is genuinely bounded, such as pixel values.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'An array has shape `(2, 3, 4)`. How many elements does it have, what does each number mean, and what does `arr[1, 2, 3]` refer to?',
        answer:
          'It has 2 * 3 * 4 = 24 elements. Reading outside in, there are two blocks along axis 0, each block has three rows along axis 1, and each row has four values along axis 2. `arr[1, 2, 3]` is the last value of the last row of the second block — the final element in C order, at flat offset 1*12 + 2*4 + 3 = 23. Supplying fewer indices than ndim returns a subarray rather than a scalar: `arr[1]` gives the whole second block, of shape `(3, 4)`.',
        followUp:
          'A strong answer volunteers that `arr[1]` is a view sharing memory with the original, not a copy.',
      },
      {
        level: 'intermediate',
        question: 'Why does deep learning default to `float32` rather than `float64`?',
        answer:
          'Memory is `size * itemsize`, so `float32` halves the footprint of every weight, activation and gradient compared with `float64`, which directly doubles the batch size or model size that fits in GPU memory. Bandwidth matters as much as capacity: moving half the bytes makes memory-bound kernels roughly twice as fast, and GPU hardware provides far more `float32` throughput than `float64`. The roughly seven significant decimal digits of `float32` are ample because training is a noisy stochastic process whose gradients are themselves approximate. Where precision genuinely matters, such as loss accumulation or batch-norm statistics, frameworks selectively accumulate in higher precision.',
      },
      {
        level: 'ml-engineer',
        question: 'A pipeline that worked in testing produces negative counts in production. The counter column is `int32`. What happened and how would you prevent it?',
        answer:
          'Almost certainly integer overflow. `int32` tops out near 2.1 billion, and a cumulative sum or a product over a larger production dataset wraps around into negative values without raising an exception, because fixed-width integer arithmetic in NumPy is modular by design. I would reproduce it by checking `arr.dtype` and the running maximum, then fix it by accumulating in `int64` or `float64` — `arr.sum(dtype=np.int64)` sets the accumulator dtype without changing the stored data. Longer term I would add an assertion that results are non-negative, since silent wraparound is exactly the class of bug that unit tests on small data never catch.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Without running anything, state the shape, ndim and size of `np.array([[[1, 2], [3, 4], [5, 6]]])`. Then check.',
        hint: 'Count the opening brackets to get ndim, then work outside in.',
        solution:
          'Shape `(1, 3, 2)`, ndim 3, size 6.\n\nThere are three levels of brackets, so three axes. The outermost bracket contains one item, so d0 = 1. That item contains three pairs, so d1 = 3. Each pair contains two numbers, so d2 = 2. The product is 6, which matches the six numbers you can count. A leading axis of length 1 is extremely common — it is what a "batch of one" looks like.',
      },
      {
        prompt: 'A batch of 64 RGB images, each 224 by 224, is stored as `float32`. How much memory does the array occupy, in megabytes?',
        hint: 'Use nbytes = size * itemsize, and remember size is the product of the shape.',
        solution:
          'Shape `(64, 224, 224, 3)`, so size = 64 * 224 * 224 * 3 = 9,633,792 elements. At 4 bytes each that is 38,535,168 bytes, about 38.5 MB.\n\nIn `float64` it would be about 77 MB, and as raw `uint8` about 9.6 MB. This arithmetic is exactly how you decide, before launching a job, whether a batch size will fit in memory.',
      },
      {
        prompt: 'Explain why `np.array([200, 100], dtype=np.uint8) + np.array([100, 200], dtype=np.uint8)` gives `[44 44]`.',
        hint: 'What is the largest value a uint8 can hold, and what does arithmetic do when the result exceeds it?',
        language: 'python',
        solution:
          'Both sums are 300, which does not fit in an unsigned 8-bit slot whose maximum is 255. Fixed-width integer arithmetic wraps modulo 256, and 300 - 256 = 44, so both elements come out as 44.\n\nThe result dtype stays `uint8` because both operands are `uint8`; NumPy does not promote to a wider type to make room. The fix is to cast before adding: `a.astype(np.int16) + b.astype(np.int16)` gives `[300 300]`.',
      },
    ],

    quiz: [
      {
        id: 'NP-002-q1',
        type: 'mcq',
        concept: 'reading shapes',
        prompt: 'An array has shape `(5, 2)`. What is it?',
        options: [
          'Five rows, each of two values',
          'Two rows, each of five values',
          'A 1-D array of ten values',
          'Five separate 2-D arrays',
        ],
        answerIndex: 0,
        explanation:
          'Shape tuples run outermost first, so the leading 5 is the number of rows along axis 0 and the trailing 2 is the length of each row along axis 1.',
      },
      {
        id: 'NP-002-q2',
        type: 'numeric',
        concept: 'size from shape',
        prompt: 'How many elements does an array of shape `(2, 3, 4, 5)` contain?',
        answer: 120,
        explanation:
          'Size is the product of the shape entries: 2 * 3 * 4 * 5 = 120. The arrangement into four axes does not change how many values there are in the flat buffer.',
      },
      {
        id: 'NP-002-q3',
        type: 'code-output',
        language: 'python',
        concept: 'integer truncation',
        prompt: 'What does this print?',
        code: 'import numpy as np\na = np.array([5, 6, 7])\na[0] = 9 / 2\nprint(a)',
        options: ['[4 6 7]', '[4.5 6.  7. ]', '[5 6 7]', 'It raises a TypeError'],
        answerIndex: 0,
        explanation:
          'The array dtype is `int64`, so assigning 4.5 into it truncates toward zero and stores 4. The division worked correctly; the storage could not keep the fraction.',
      },
      {
        id: 'NP-002-q4',
        type: 'match',
        concept: 'shape vocabulary',
        prompt: 'Match each attribute to what it reports for an array of shape `(3, 4)` with dtype float64.',
        pairs: [
          { left: '`shape`', right: '`(3, 4)`' },
          { left: '`ndim`', right: '`2`' },
          { left: '`size`', right: '`12`' },
          { left: '`itemsize`', right: '`8`' },
          { left: '`nbytes`', right: '`96`' },
        ],
        explanation:
          'Two axes of lengths 3 and 4 give 12 elements; each float64 element is 8 bytes, so the buffer is 96 bytes. Every one of these follows from shape and dtype alone.',
      },
      {
        id: 'NP-002-q5',
        type: 'truefalse',
        concept: 'homogeneous dtype',
        prompt: 'Changing an array from `float64` to `float32` with `astype` modifies the original array in place.',
        answer: false,
        explanation:
          '`astype` allocates a new buffer and returns a new array; the original is untouched. Element size is fixed at creation, so converting in place is impossible.',
      },
      {
        id: 'NP-002-q6',
        type: 'fill',
        concept: 'column vectors',
        prompt: 'Which attribute would you print to tell a 1-D array of shape (n,) apart from a 2-D column of shape (n, 1)?',
        answers: ['shape', '.shape', 'arr.shape', 'ndim', '.ndim'],
        explanation:
          'Printing `arr.shape` (or `arr.ndim`) is the only reliable check. Repr output can look similar, but the shape tuple length is unambiguous and determines how the array broadcasts.',
      },
    ],

    flashcards: [
      { front: 'What does shape `(2, 3, 4)` describe?', back: 'Two blocks, each of three rows, each row four values. ndim 3, size 24. Read outside in; the last number is the innermost run.' },
      { front: 'How do you compute nbytes?', back: '`nbytes = size * itemsize`, where size is the product of the shape and itemsize comes from the dtype (8 for float64, 1 for uint8).' },
      { front: '`(n,)` versus `(n, 1)`', back: '`(n,)` is 1-D with one axis; `(n, 1)` is a 2-D column with n rows and one column. They broadcast differently and scikit-learn only accepts the 2-D form for X.' },
      { front: 'Why does `a[0] = 7 / 2` store 3 in an int array?', back: 'The dtype is fixed at creation and an integer buffer cannot hold a fraction, so the value is truncated on assignment.' },
      { front: 'What happens when uint8 arithmetic exceeds 255?', back: 'It wraps modulo 256 silently: 250 + 10 becomes 4. Cast to a wider dtype before arithmetic that may overflow.' },
      { front: 'What does `ndim` actually count?', back: 'The number of axes, which is the number of indices needed to reach a single scalar element — the same as `len(arr.shape)`.' },
    ],

    challenge: {
      title: 'A shape-and-dtype report card',
      brief:
        'Write a function `describe(arr)` that prints a one-line report for any array: its shape, ndim, size, dtype, itemsize and nbytes in kilobytes, plus a plain-English reading of the shape such as "3 blocks of 4 rows of 5 columns". Handle 1-D, 2-D, 3-D and 4-D inputs. Then call it on a 1-D vector, a design matrix, a greyscale image stack and a batch of RGB images, and confirm every nbytes figure by hand.',
      language: 'python',
      acceptanceCriteria: [
        'Works for arrays of 1 to 4 dimensions without special-casing each one',
        'Prints all six attributes plus a readable description of the geometry',
        'Is demonstrated on at least four arrays with different shapes and dtypes',
        'Includes a comment verifying one nbytes value against size times itemsize',
      ],
      starterCode: 'import numpy as np\n\ndef describe(arr):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Someone tells you they cannot picture a three-dimensional array. Explain what shape, ndim and size mean, and make 3-D concrete for them.',
      mustCover: [
        'Shape is a tuple of lengths, read outermost axis first',
        'ndim is how many indices are needed to reach one element',
        'size is the product of the shape entries, and nbytes is size times itemsize',
        'A 3-D array is a stack of 2-D tables, indexed block then row then column',
      ],
      bonusSignals: ['gives a real example such as a batch of images', 'mentions that the last axis varies fastest in memory', 'notes that dtype is independent of shape'],
      sampleExplanation:
        'The shape is just a tuple of counts, read from the outside in. `(3, 4)` means three rows, each holding four values — the last number is always the length of the innermost run. Add a number in front and you are stacking: `(2, 3, 4)` means two of those three-by-four tables, one behind the other, like two pages of a notebook. That is all three-dimensional means. `ndim` is how many numbers you must supply to land on a single value, which is the same as the length of the shape tuple, and `size` is the shape entries multiplied together, which is how many values exist altogether. Shape says nothing about what the values are; the dtype does that, and it fixes how many bytes each one takes. Multiply size by that itemsize and you know exactly how much memory the array costs, which is how people decide before running a job whether a batch of images will fit.',
    },
  },

  {
    id: 'NP-003',
    domain: 'NP',
    module: 'The ndarray',
    topic: 'Array construction',
    title: 'Creating Arrays and Random Data',
    slug: 'creating-arrays-and-random-data',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['NP-002'],
    related: ['NP-001'],
    tags: ['zeros', 'ones', 'arange', 'linspace', 'eye', 'default_rng', 'seed', 'reproducibility'],

    learningObjectives: [
      'Choose the right constructor for a task: `array`, `zeros`, `ones`, `full`, `arange`, `linspace` or `eye`',
      'Explain why `linspace` is safer than `arange` for floating-point ranges',
      'Generate random data with the modern `np.random.default_rng` Generator API',
      'Make a random experiment reproducible with a seed, and explain what a seed does and does not guarantee',
    ],

    terminology: [
      {
        term: 'Constructor',
        definition:
          'A NumPy function that allocates a new array and fills it according to a rule, such as `np.zeros(shape)` or `np.arange(start, stop, step)`.',
        simple: 'A ready-made way of making an array without typing every number.',
      },
      {
        term: 'Generator',
        definition:
          'The modern random-number object returned by `np.random.default_rng()`. It owns its own bit stream, so two Generators never interfere with each other.',
        simple: 'Your own private dice, separate from everyone else in the program.',
      },
      {
        term: 'Seed',
        definition:
          'The integer that initialises a Generator. The same seed with the same NumPy version produces the same sequence of numbers every time.',
        simple: 'The starting position of the dice, so you can roll the exact same rolls again.',
      },
      {
        term: 'Half-open interval',
        definition:
          '`arange(a, b)` and `rng.integers(a, b)` include the start and exclude the stop, matching Python `range`. `linspace(a, b)` includes both ends by default.',
        simple: 'Start counted in, stop left out — except for linspace, which keeps both ends.',
      },
      {
        term: 'Uninitialised memory',
        definition:
          '`np.empty` allocates a buffer without writing to it, so it contains whatever bytes were there before. It is fast, and it is only safe if you overwrite every element.',
        simple: 'A blank array that is actually full of rubbish until you fill it.',
      },
    ],

    simpleExplanation:
      "Typing numbers out by hand only works for tiny examples. Real arrays have thousands or millions of entries, so NumPy gives you constructors: say what shape you want and what should be in it, and the array appears. `np.zeros((3, 4))` gives a three-by-four grid of zeros, ready to be filled in. `np.ones`, `np.full` and `np.eye` are the same idea with a different filling. When you want a sequence, there are two tools and they answer different questions. `np.arange(0, 10, 2)` means start at 0, step by 2, stop before 10 — you control the step and the count falls out. `np.linspace(0, 1, 5)` means give me exactly five values evenly spread from 0 to 1 inclusive — you control the count and the step falls out. Finally, a great deal of machine learning needs random numbers: initial weights, train-test splits, simulations. Modern NumPy asks you to make your own generator with `rng = np.random.default_rng(42)`, and that number 42 is a seed, which makes the randomness repeatable so your results can be checked by someone else.",

    whyItExists:
      'Data has to come from somewhere before you can operate on it, and typing literals does not scale past a handful of values. Constructors let you state the shape and the fill rule instead of the contents. The Generator API exists because the older global `np.random.seed` shared one hidden stream across the entire process, so any library that drew a number silently changed everybody else results and made experiments impossible to reproduce.',

    analogy: {
      scenario:
        'Think of setting up a room full of chairs for an event. You do not carry chairs in one at a time describing each one; you say "forty rows of twenty, all identical, all empty" and the crew sets them out. If you want the rows marked at regular intervals you have two ways to ask: "put a marker every three metres until you run out of hall", or "put exactly eight markers, evenly spaced, from the front wall to the back wall". Both give a line of markers, but only the second guarantees how many there are and that one lands exactly on the back wall.',
      mapping: [
        { from: '"Forty rows of twenty, all empty"', to: '`np.zeros((40, 20))` — shape plus a fill rule' },
        { from: '"A marker every three metres"', to: '`np.arange(start, stop, step)` — you fix the step' },
        { from: '"Exactly eight markers, front wall to back wall"', to: '`np.linspace(start, stop, num)` — you fix the count and include both ends' },
        { from: 'The marker that ends up just short of the back wall', to: 'The excluded endpoint of `arange`, and its floating-point rounding surprises' },
        { from: 'Rolling your own dice rather than sharing the house dice', to: '`rng = np.random.default_rng(42)` instead of the global `np.random.*` functions' },
      ],
      bridge:
        'The two ways of asking for markers map exactly onto the real decision you make every time you need a sequence: is the spacing the thing you care about, or is the number of points the thing you care about? Plotting a function over an interval is almost always the second, which is why `linspace` dominates in plotting code and `arange` dominates in index generation. The private dice matter for the same reason a shared hall diary would: if anyone else can advance the stream, your run is no longer repeatable.',
      limitations:
        'The chairs analogy suggests an empty array is genuinely empty. `np.zeros` really does write zeros, but `np.empty` does not write anything at all — it hands you whatever bytes happened to be in that memory, which is why it is fast and why it must be fully overwritten.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The constructor you want, by intent',
        caption: 'Most real code uses five of these; the rest are worth recognising.',
        columns: ['Call', 'Result', 'Use it when'],
        rows: [
          ['`np.array([1, 2, 3])`', '`[1 2 3]`', 'You already have the values in a list'],
          ['`np.zeros((2, 3))`', '2x3 of `0.0`', 'You need an accumulator to fill in'],
          ['`np.ones((2, 3))`', '2x3 of `1.0`', 'You need a multiplicative identity or a bias column'],
          ['`np.full((2, 3), -1)`', '2x3 of `-1`', 'You need a sentinel value that is not 0 or 1'],
          ['`np.arange(0, 10, 2)`', '`[0 2 4 6 8]`', 'You know the step; endpoint excluded'],
          ['`np.linspace(0, 1, 5)`', '`[0. 0.25 0.5 0.75 1. ]`', 'You know how many points; endpoint included'],
          ['`np.eye(3)`', '3x3 identity matrix', 'You need I for linear algebra'],
          ['`np.zeros_like(x)`', 'Zeros with `x` shape and dtype', 'You want to match an existing array exactly'],
          ['`np.empty((2, 3))`', 'Uninitialised memory', 'You will overwrite every element immediately'],
        ],
      },
      {
        kind: 'compare',
        title: 'arange versus linspace',
        caption: 'Choosing wrongly here is the most common floating-point bug in beginner NumPy code.',
        left: {
          heading: '`np.arange(start, stop, step)`',
          points: [
            'You specify the step; the count is derived',
            'Stop is excluded, like Python `range`',
            'Exact and idiomatic for integers',
            'With float steps the count can be off by one',
            '`np.arange(0, 1, 0.1)` may end at 0.9999999999999999',
            'Natural choice for generating indices',
          ],
        },
        right: {
          heading: '`np.linspace(start, stop, num)`',
          points: [
            'You specify the count; the step is derived',
            'Both endpoints included by default',
            'Always returns exactly `num` values',
            'Endpoint is exact, no accumulation of rounding',
            '`np.linspace(0, 1, 11)` ends precisely at 1.0',
            'Natural choice for plotting and grids',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Making a random experiment reproducible',
        caption: 'Every published result you trust was produced by something shaped like this.',
        steps: [
          { label: 'Create a Generator with a seed', detail: '`rng = np.random.default_rng(42)` fixes the starting state of the bit stream.' },
          { label: 'Draw from that Generator only', detail: '`rng.normal(...)`, `rng.integers(...)`, `rng.choice(...)` — never the global `np.random.*`.' },
          { label: 'Pass `rng` to anything that needs randomness', detail: 'A function that draws numbers should take the generator as an argument rather than making its own.' },
          { label: 'Record the seed with the results', detail: 'The seed belongs in your config and your log, not only in the source file.' },
          { label: 'Re-run and compare', detail: 'Same seed and same NumPy version reproduce the identical array, which is what makes a result checkable.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Build arrays and watch their shape',
        caption: 'Try each constructor and confirm the shape before reading it off.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      '`np.zeros`, `np.ones`, `np.full` and `np.empty` allocate a new buffer of a given shape and dtype and fill it with a constant (or leave it uninitialised). `np.arange(start, stop, step)` returns values `start + k*step` for integer k while the value is below `stop`, so the count is `ceil((stop - start) / step)`. `np.linspace(start, stop, num)` returns exactly `num` values with spacing `(stop - start) / (num - 1)` when `endpoint=True`. `np.random.default_rng(seed)` returns a `Generator` wrapping a PCG64 bit generator whose state is determined entirely by the seed.',

    math: {
      intuition:
        'The difference between the two sequence constructors is one line of arithmetic: one of them derives the count from the step, and the other derives the step from the count. Knowing which is derived tells you which one can surprise you.',
      formulas: [
        {
          latex: 'n_{\\text{arange}} = \\left\\lceil \\frac{\\text{stop} - \\text{start}}{\\text{step}} \\right\\rceil',
          name: 'How many values arange returns',
          meaning: 'The count is computed from the step, so a floating-point step that does not divide the interval exactly can produce one value more or fewer than you expect.',
          variables: [
            { symbol: '\\text{start}', meaning: 'First value, always included' },
            { symbol: '\\text{stop}', meaning: 'Exclusive upper bound' },
            { symbol: '\\text{step}', meaning: 'Spacing you chose' },
          ],
        },
        {
          latex: '\\Delta = \\frac{\\text{stop} - \\text{start}}{\\text{num} - 1}, \\qquad x_k = \\text{start} + k\\,\\Delta,\; k = 0 \\ldots \\text{num}-1',
          name: 'linspace spacing',
          meaning: 'The spacing is derived from the count, so you always get exactly num points and the last one is exactly stop.',
          variables: [
            { symbol: '\\Delta', meaning: 'Spacing between consecutive values' },
            { symbol: '\\text{num}', meaning: 'Number of points you asked for' },
            { symbol: 'k', meaning: 'Index of the point, from 0 to num-1' },
          ],
        },
      ],
      derivation: [
        'For `linspace(0, 1, 5)`: num - 1 = 4 intervals span the distance 1, so the spacing is 0.25.',
        'The points are 0, 0.25, 0.5, 0.75, 1.0 — five values, both endpoints present, no rounding drift because each is computed as start + k*delta rather than by repeated addition.',
        'For `arange(0, 1, 0.25)`: the count is ceil((1 - 0) / 0.25) = 4, giving 0, 0.25, 0.5, 0.75 — the endpoint is excluded.',
        'Now try `arange(0, 1, 0.1)`. In binary, 0.1 is slightly less than one tenth, so ten accumulated steps land just below 1.0 and the count formula can yield 10 or 11 depending on rounding.',
        'That is the whole argument for preferring linspace whenever the endpoint or the exact number of points matters.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The constructors you will actually use',
        runnable: true,
        code: `import numpy as np

print(np.zeros((2, 3)))
print(np.ones(4, dtype=np.int32))
print(np.full((2, 2), 7))
print(np.eye(3))
print(np.arange(0, 10, 2))
print(np.linspace(0, 1, 5))

template = np.array([[1, 2], [3, 4]])
print(np.zeros_like(template), np.zeros_like(template).dtype)`,
        output: `[[0. 0. 0.]
 [0. 0. 0.]]
[1 1 1 1]
[[7 7]
 [7 7]]
[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]
[0 2 4 6 8]
[0.   0.25 0.5  0.75 1.  ]
[[0 0]
 [0 0]] int64`,
        explanation:
          'Three details repay attention. `np.zeros` defaults to `float64`, which is why the output shows `0.` and not `0` — pass `dtype=int` when you want integers. The shape argument is a tuple for multi-dimensional arrays and may be a bare integer for 1-D. And `zeros_like` copies both the shape and the dtype of its template, which is why it produced `int64` zeros here rather than floats.',
      },
      {
        language: 'python',
        title: 'Why linspace is the safer sequence',
        runnable: true,
        code: `import numpy as np

a = np.arange(0, 1, 0.1)
b = np.linspace(0, 1, 11)

print("arange  length:", len(a), "last:", repr(a[-1]))
print("linspace length:", len(b), "last:", repr(b[-1]))
print("arange includes 1.0? ", 1.0 in a)
print("linspace includes 1.0?", 1.0 in b)

# Integers are exact, so arange is perfectly safe there
print(np.arange(5), np.arange(2, 12, 3))`,
        output: `arange  length: 10 last: np.float64(0.9000000000000001)
linspace length: 11 last: np.float64(1.0)
arange includes 1.0?  False
linspace includes 1.0? True
[0 1 2 3 4] [ 2  5  8 11]`,
        explanation:
          'The final `arange` value is 0.9000000000000001 rather than 0.9 because 0.1 has no exact binary representation and the error accumulates across steps. `linspace` computes each point as `start + k*delta` from the endpoints instead, so the last value is exactly 1.0. Use `arange` for integer indices, where it is exact and idiomatic, and `linspace` whenever the values are real numbers you intend to plot or evaluate a function on.',
      },
      {
        language: 'python',
        title: 'Random data the modern way',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(42)

print("uniform [0,1):", rng.random(3))
print("integers 0-9 :", rng.integers(0, 10, size=5))
print("normal mu=170 sd=10:", rng.normal(170, 10, size=4).round(1))
print("pick 3 labels:", rng.choice(["cat", "dog", "fox"], size=3))

# Reproducibility: same seed, same stream
a = np.random.default_rng(7).normal(size=3)
b = np.random.default_rng(7).normal(size=3)
print("identical?", np.array_equal(a, b))

# A different seed gives a different draw
c = np.random.default_rng(8).normal(size=3)
print("same as a?", np.array_equal(a, c))`,
        output: `uniform [0,1): [0.77395605 0.43887844 0.85859792]
integers 0-9 : [4 9 7 1 5]
normal mu=170 sd=10: [168.1 176.3 163.2 181.4]
pick 3 labels: ['dog' 'fox' 'dog']
identical? True
same as a? False`,
        explanation:
          'The four draw methods cover most needs: `random` for uniform floats in [0, 1), `integers` for a half-open integer range, `normal` for Gaussian noise with a chosen mean and standard deviation, and `choice` for sampling from a set of options. Every draw advances the generator state, so the numbers differ from line to line even though the generator was seeded once. Two generators built with the same seed produce identical streams, which is the entire mechanism behind reproducible experiments.',
      },
      {
        language: 'python',
        title: 'A small synthetic dataset, end to end',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)
n = 200

hours = rng.uniform(0, 10, size=n)              # feature
noise = rng.normal(0, 3, size=n)                # measurement error
score = 40 + 5.5 * hours + noise                # true relationship + noise

X = hours.reshape(-1, 1)                        # scikit-learn wants 2-D
y = score

print("X:", X.shape, X.dtype)
print("y:", y.shape, y.dtype)
print("first three rows:", X[:3].ravel().round(2), y[:3].round(2))`,
        output: `X: (200, 1) float64
y: (200,) float64
first three rows: [6.37 2.7  0.41] [77.49 52.96 41.94]`,
        explanation:
          'This is the standard recipe for a synthetic dataset: draw a feature, draw noise separately, and build the target from a relationship you chose so you know the right answer in advance. Note `reshape(-1, 1)` turning the `(200,)` vector into a `(200, 1)` design matrix, which is the shape every scikit-learn estimator demands, and note that the whole thing is reproducible because one seeded generator produced both draws.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Initialising neural network weights',
        usage:
          'Every layer starts life as a random array, typically `rng.normal(0, scale, size=(fan_in, fan_out))` with a scale chosen by the He or Glorot rule. Seeding it is what lets two people compare architectures rather than compare luck.',
      },
      {
        context: 'Plotting a function',
        usage:
          '`x = np.linspace(-5, 5, 400)` then `y = 1 / (1 + np.exp(-x))` is the idiomatic way to draw a sigmoid. `linspace` is used because you care about having enough points to look smooth and about reaching both ends exactly.',
      },
      {
        context: 'Train-test splits and cross-validation',
        usage:
          'scikit-learn exposes `random_state` on every splitter for the same reason NumPy exposes seeds: a model comparison is meaningless if the two models were scored on different random splits.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`random_state=` accepts an int or a Generator, and passing one makes an entire pipeline reproducible.' },
      { tool: 'matplotlib', role: 'Nearly every plotting example begins with `np.linspace` to build the x-axis.' },
      { tool: 'PyTorch', role: '`torch.manual_seed` plays the role of the seed here; the reasoning about reproducibility transfers directly.' },
    ],

    commonMistakes: [
      {
        mistake: 'Calling `np.zeros(2, 3)` instead of `np.zeros((2, 3))`',
        why: 'The first positional argument is the whole shape, and the second is the dtype, so NumPy reads the `3` as a dtype and raises `TypeError: Cannot interpret 3 as a data type`.',
        fix: 'Pass the shape as one tuple: `np.zeros((2, 3))`. Only 1-D shapes may be written as a bare integer.',
      },
      {
        mistake: 'Using `np.arange` with a float step and expecting an exact count or endpoint',
        why: 'Binary floating point cannot represent 0.1 exactly, so the derived count can be off by one and the final value can sit just short of, or just past, the intended stop.',
        fix: 'Use `np.linspace(start, stop, num)` when the endpoint or the number of points matters. Keep `arange` for integers.',
      },
      {
        mistake: 'Using the global `np.random.seed(42)` and the legacy `np.random.rand` family',
        why: 'The legacy functions share one hidden global stream, so any library call that draws a number shifts everything downstream, and separate parts of a program cannot be seeded independently.',
        fix: 'Create an explicit generator with `rng = np.random.default_rng(42)` and pass it wherever randomness is needed. The legacy API still works but is no longer recommended for new code.',
      },
      {
        mistake: 'Treating `np.empty` as a fast `np.zeros`',
        why: '`np.empty` never writes to the memory it allocates, so it contains arbitrary leftover bytes. Code that reads an element before assigning it produces values that change between runs and look like a subtle numerical bug.',
        fix: 'Use `np.zeros` unless you can guarantee every element is written before it is read; the speed difference only matters for very large buffers.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'When would you use `np.arange` and when `np.linspace`?',
        answer:
          'They differ in what you specify and what is derived. `arange(start, stop, step)` lets you fix the spacing and derives the number of points, excluding the endpoint exactly like Python `range` — perfect for integer sequences and index generation. `linspace(start, stop, num)` lets you fix the number of points and derives the spacing, including the endpoint by default — perfect for sampling a continuous interval, as when plotting a function. The practical rule is that any float range where you care about the count or about landing on the endpoint should use `linspace`, because accumulated binary rounding makes `arange` unreliable there.',
        followUp:
          'A strong candidate gives the concrete failure: `np.arange(0, 1, 0.1)` ends at 0.9000000000000001 and never contains 1.0.',
      },
      {
        level: 'intermediate',
        question: 'Why does modern NumPy recommend `np.random.default_rng()` over `np.random.seed()`?',
        answer:
          'The legacy functions all draw from a single hidden global state, so randomness is an invisible shared resource. If a library you call draws a number, every subsequent draw in your own code shifts, which silently breaks reproducibility, and two components cannot be seeded independently. `default_rng` returns a Generator object that owns its own PCG64 bit stream, so you can create one per experiment, pass it explicitly to functions that need it, and know that nothing outside your call chain can perturb it. The Generator also offers better statistical quality and faster algorithms, and its API is cleaner — `integers` with a half-open range instead of the inconsistent `randint` and `random_integers` pair.',
      },
      {
        level: 'ml-engineer',
        question: 'A colleague sets one seed at the top of a training script and says the run is reproducible. What would you check?',
        answer:
          'Seeding NumPy alone is rarely enough. I would check whether the framework has its own generator to seed — `torch.manual_seed`, plus CUDA seeds — whether the Python built-in `random` module is used anywhere, and whether data loading uses multiple worker processes, each of which needs a derived seed. Then I would look for genuine nondeterminism outside the seeds: GPU kernels that reduce in nondeterministic order, `set` or `dict` iteration affecting order, and parallel reductions in threaded BLAS. Finally, reproducibility is only claimed within a fixed environment: the same seed can legitimately give different results across NumPy or driver versions, so the environment should be pinned and recorded alongside the seed.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Produce an array of the eleven values 0.0, 0.1, ..., 1.0 in a way that is exact, and explain why the obvious `arange` version is not.',
        hint: 'Which of the two sequence constructors guarantees both the count and the endpoint?',
        language: 'python',
        starterCode: 'import numpy as np\n',
        solution:
          'import numpy as np\nx = np.linspace(0, 1, 11)\nprint(x, len(x), x[-1] == 1.0)   # 11 values, ends exactly at 1.0\n\n`np.arange(0, 1.1, 0.1)` looks equivalent but is fragile: the count is derived as ceil(1.1 / 0.1), and because 0.1 and 1.1 are inexact in binary that can round to 11 or 12 values. `linspace` computes each point from the endpoints rather than by repeated addition, so the count is exactly what you asked for and the last value is exactly the stop.',
      },
      {
        prompt: 'Create a 4x4 array whose diagonal is 5 and whose off-diagonal entries are 0, without typing out sixteen numbers.',
        hint: 'The identity matrix is already the right pattern; you only need to scale it.',
        solution:
          'import numpy as np\nm = 5 * np.eye(4)\nprint(m)\n# [[5. 0. 0. 0.]\n#  [0. 5. 0. 0.]\n#  [0. 0. 5. 0.]\n#  [0. 0. 0. 5.]]\n\n`np.eye(4)` builds the identity and multiplying by a scalar scales every element, which leaves the zeros as zeros. `np.diag([5, 5, 5, 5])` is an equally good answer and generalises to a diagonal that is not constant.',
      },
      {
        prompt: 'Write code that draws 1000 heights from a normal distribution with mean 170 and standard deviation 8, reproducibly, and prints the sample mean and standard deviation. Explain why they are not exactly 170 and 8.',
        hint: 'Seed a Generator, then use its `normal` method with `loc` and `scale`.',
        language: 'python',
        solution:
          'import numpy as np\nrng = np.random.default_rng(123)\nheights = rng.normal(170, 8, size=1000)\nprint(heights.mean().round(3), heights.std().round(3))   # e.g. 170.186 7.914\n\nThe sample statistics differ from the population parameters because 1000 draws are a finite sample: the standard error of the mean is 8 / sqrt(1000), about 0.25, so a sample mean within a few tenths of 170 is exactly what theory predicts. Re-running with the same seed gives the identical numbers; changing the seed moves them by roughly that standard error.',
      },
    ],

    quiz: [
      {
        id: 'NP-003-q1',
        type: 'code-output',
        language: 'python',
        concept: 'linspace semantics',
        prompt: 'What does `np.linspace(0, 10, 5)` produce?',
        code: 'import numpy as np\nprint(np.linspace(0, 10, 5))',
        options: ['[ 0.   2.5  5.   7.5 10. ]', '[0 1 2 3 4]', '[ 0  2  4  6  8 10]', '[ 0.  2.  4.  6.  8.]'],
        answerIndex: 0,
        explanation:
          'Five points from 0 to 10 inclusive means four intervals, so the spacing is 10/4 = 2.5 and the last value is exactly 10.0. `linspace` includes the endpoint by default.',
      },
      {
        id: 'NP-003-q2',
        type: 'numeric',
        concept: 'arange count',
        prompt: 'How many elements does `np.arange(3, 20, 4)` contain?',
        answer: 5,
        explanation:
          'The values are 3, 7, 11, 15, 19 — the next would be 23, which is not below the exclusive stop of 20. The count is ceil((20 - 3) / 4) = ceil(4.25) = 5.',
      },
      {
        id: 'NP-003-q3',
        type: 'mcq',
        concept: 'reproducible randomness',
        prompt: 'Why is `rng = np.random.default_rng(42)` preferred over `np.random.seed(42)`?',
        options: [
          'The Generator owns its own stream, so other code cannot perturb your draws',
          'The Generator produces numbers that are more random in a statistical sense than any seeded stream can be',
          'The Generator does not need a seed to be reproducible',
          'The legacy functions have been removed from NumPy',
        ],
        answerIndex: 0,
        explanation:
          'The key benefit is isolation: a per-object stream means library calls cannot shift your sequence, and different components can be seeded independently. The legacy API still exists but is discouraged for new code.',
      },
      {
        id: 'NP-003-q4',
        type: 'debug',
        language: 'python',
        concept: 'shape arguments',
        prompt: 'This raises `TypeError: Cannot interpret 3 as a data type`. What is wrong?',
        code: 'import numpy as np\ngrid = np.zeros(2, 3)',
        options: [
          'The shape must be a single tuple: `np.zeros((2, 3))`',
          '`np.zeros` only makes 1-D arrays; use `np.zeros_2d`',
          'The dtype must be given as a string, not an integer',
          'The arguments are in the wrong order; it should be `np.zeros(3, 2)`',
        ],
        answerIndex: 0,
        explanation:
          "`np.zeros` takes the whole shape as its first argument and a dtype as its second, so the 3 was read as a dtype. Wrapping the dimensions in a tuple fixes it.",
      },
      {
        id: 'NP-003-q5',
        type: 'truefalse',
        concept: 'empty versus zeros',
        prompt: '`np.empty((3, 3))` returns an array of zeros, just faster than `np.zeros((3, 3))`.',
        answer: false,
        explanation:
          '`np.empty` allocates memory without writing to it, so it contains arbitrary leftover bytes. It may happen to look like zeros, which makes the bug it causes especially hard to spot.',
      },
      {
        id: 'NP-003-q6',
        type: 'match',
        concept: 'choosing a constructor',
        prompt: 'Match each task to the most appropriate constructor.',
        pairs: [
          { left: '400 x-values for a smooth plot from -5 to 5', right: '`np.linspace(-5, 5, 400)`' },
          { left: 'The identity matrix for a linear algebra step', right: '`np.eye(n)`' },
          { left: 'An accumulator to be filled in a loop', right: '`np.zeros(shape)`' },
          { left: 'Row indices 0 to n-1', right: '`np.arange(n)`' },
          { left: 'A grid pre-filled with the sentinel -999', right: '`np.full(shape, -999)`' },
        ],
        explanation:
          'The pattern is: fixed count over a real interval calls for linspace, integer sequences call for arange, and constant fills call for zeros, ones, full or eye depending on the constant.',
      },
    ],

    flashcards: [
      { front: '`arange` versus `linspace`', back: '`arange` fixes the step and excludes the stop; `linspace` fixes the count and includes it. Use arange for integers, linspace for real intervals.' },
      { front: 'How do you make randomness reproducible in modern NumPy?', back: '`rng = np.random.default_rng(seed)` and draw only from that Generator, passing it to any function that needs randomness.' },
      { front: 'What is wrong with `np.zeros(2, 3)`?', back: 'The second argument is the dtype, not a dimension. Pass the shape as one tuple: `np.zeros((2, 3))`.' },
      { front: 'What dtype does `np.zeros((2, 2))` produce?', back: '`float64`. Pass `dtype=int` (or any dtype) explicitly if you need something else.' },
      { front: 'Why avoid `np.empty` unless you overwrite everything?', back: 'It returns uninitialised memory containing arbitrary bytes, so reading before writing gives values that change between runs.' },
      { front: 'What does `np.zeros_like(x)` copy from x?', back: 'Both the shape and the dtype, which is why it is safer than retyping the shape by hand.' },
    ],

    challenge: {
      title: 'A reproducible synthetic dataset generator',
      brief:
        'Write `make_dataset(n_samples, n_features, noise, seed)` that returns `X` of shape `(n_samples, n_features)` and `y` of shape `(n_samples,)`, where `y` is a linear function of `X` with known coefficients plus Gaussian noise. Everything random must come from a single seeded Generator created inside the function. Demonstrate that calling it twice with the same seed gives identical arrays, and that changing only the seed changes the data but not the shapes. Print the true coefficients so a later unit can check whether a model recovers them.',
      language: 'python',
      acceptanceCriteria: [
        'A single `np.random.default_rng(seed)` supplies every random value in the function',
        'Shapes are exactly `(n_samples, n_features)` and `(n_samples,)`',
        '`np.array_equal` confirms two same-seed calls are identical',
        'The true coefficients used to build y are returned or printed',
      ],
      starterCode: 'import numpy as np\n\ndef make_dataset(n_samples=200, n_features=3, noise=1.0, seed=0):\n    rng = np.random.default_rng(seed)\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone new to NumPy how to create arrays without typing values, and why they should care about seeding random numbers.',
      mustCover: [
        'Constructors take a shape and a fill rule instead of literal values',
        'arange fixes the step and excludes the stop; linspace fixes the count and includes it',
        'Random data comes from a Generator created by `np.random.default_rng`',
        'A seed makes the stream repeatable, which is what makes an experiment checkable',
      ],
      bonusSignals: ['gives the 0.1 floating-point failure as concrete evidence', 'mentions passing the generator rather than reseeding globally', 'notes that zeros defaults to float64'],
      sampleExplanation:
        'Instead of typing numbers, you describe the array you want. `np.zeros((3, 4))` says three rows of four, all zero; `np.ones`, `np.full` and `np.eye` are the same move with a different filling. For sequences there are two tools that answer different questions. `np.arange(0, 10, 2)` fixes the step and stops before 10, which is ideal for integer indices. `np.linspace(0, 1, 5)` fixes the number of points and includes both ends, which is what you want when sampling a real interval — and it avoids the trap that `np.arange(0, 1, 0.1)` ends at 0.9000000000000001 because a tenth is not exact in binary. For random data, make your own generator with `rng = np.random.default_rng(42)` and draw from it. The 42 is a seed: it fixes where the stream starts, so you and anyone reading your work get the identical numbers. Without that, a result cannot be checked, only admired.',
    },
  },

  {
    id: 'NP-004',
    domain: 'NP',
    module: 'Selecting Data',
    topic: 'Indexing and views',
    title: 'Indexing and Slicing',
    slug: 'numpy-indexing-and-slicing',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['NP-002'],
    related: ['NP-003'],
    tags: ['indexing', 'slicing', 'views', 'copy', 'ellipsis', 'axis'],

    learningObjectives: [
      'Index and slice multi-dimensional arrays with a single bracket and comma-separated per-axis selectors',
      'Predict the shape of any slice before running it, including when an axis disappears',
      'Explain why a basic slice is a view that shares memory, and demonstrate the consequence',
      'Decide when to take an explicit `.copy()` and recognise the bugs caused by not doing so',
    ],

    terminology: [
      {
        term: 'Basic indexing',
        definition:
          'Selection using integers, slices, `np.newaxis` and `Ellipsis`. It always returns a view into the original buffer, never a copy.',
        simple: 'Selecting with numbers and colons — you get a window onto the same data.',
      },
      {
        term: 'View',
        definition:
          'An array object with its own shape, strides and offset that points at another array data buffer. Writing through a view changes the original.',
        simple: 'A different way of looking at the same numbers, not a second set of numbers.',
      },
      {
        term: 'Slice',
        definition:
          '`start:stop:step` along one axis. Start is included, stop is excluded, and any of the three may be omitted to mean beginning, end or step of 1.',
        simple: 'A range of positions along one direction.',
      },
      {
        term: 'Axis collapse',
        definition:
          'Indexing an axis with a plain integer removes that axis from the result; slicing it with `a:b` keeps the axis even if the slice has length 1.',
        simple: 'A number eats the direction; a colon keeps it.',
      },
      {
        term: 'Ellipsis',
        definition:
          '`...` stands for as many full slices as are needed to account for the remaining axes, so `arr[..., 0]` takes index 0 of the last axis whatever the ndim.',
        simple: 'Shorthand for "all the other directions, in full".',
      },
    ],

    simpleExplanation:
      "Selecting from an array looks like selecting from a list, but with one bracket for the whole job. For a 2-D array you write `arr[row, col]`, and each position before the comma describes what you want along that axis. You can put a single number there, which picks one position and makes that axis vanish from the answer. Or you can put a slice like `1:4`, which keeps a range and keeps the axis, even if the range holds only one item. So `arr[2]` gives a row, shape `(4,)`, while `arr[2:3]` gives a one-row table, shape `(1, 4)`, from the same data. Now the part that catches almost everyone: when you slice a NumPy array you do not get a copy. You get a view, which is a second array object looking at exactly the same bytes in memory. Change a value through the view and the original changes too, because there was only ever one set of numbers. This is deliberate. Slicing a million-row array is free precisely because nothing is copied. But it means that whenever you intend to modify a piece without disturbing the whole, you must ask for a copy on purpose.",

    whyItExists:
      'Data science constantly needs a subset of a large array: one column, one batch, one region of an image. Copying on every selection would make that unaffordable both in time and in memory, so NumPy separates the data buffer from the description of how to read it and lets many arrays share one buffer. Views make selection free; the cost is that aliasing is real and must be understood rather than discovered.',

    analogy: {
      scenario:
        'Imagine a long spreadsheet printed on a single continuous roll of paper, and a cardboard mask with a rectangular hole cut in it. Laying the mask over the roll shows you just the region you care about — rows 10 to 20, columns 3 to 5. Cutting a new hole is instant, no matter how long the roll is, because you are not reprinting anything. But if you write a correction inside the hole, you are writing on the original roll. Anyone else with a mask over that region sees your correction, and so does anyone reading the whole roll.',
      mapping: [
        { from: 'The continuous printed roll', to: 'The single contiguous data buffer' },
        { from: 'A cardboard mask with a hole', to: 'A view: shape, strides and an offset into that buffer' },
        { from: 'Cutting a new hole is instant', to: 'Slicing is O(1) and copies no data, whatever the array size' },
        { from: 'Writing inside the hole marks the roll', to: 'Assigning through a view mutates the original array' },
        { from: 'Photocopying the visible region first', to: '`arr[1:4].copy()` — a new buffer that can be edited safely' },
      ],
      bridge:
        'The mask is exactly what a view is: metadata describing which part of an existing buffer to read, with no data of its own. That is why `big[::2]` on a gigabyte array is instant and costs about a hundred bytes, and equally why `sub = big[0:10]; sub[:] = 0` silently zeroes the first ten rows of `big`. Both facts are the same fact.',
      limitations:
        'The mask picture suggests a view must be a contiguous rectangle. Strides are more general than that: `arr[::2]` views every second element, and a transpose is a view that reads the same buffer in a different order entirely, with no hole to point at.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'One array, four selections',
        caption: 'Watch which axes survive. An integer removes an axis; a slice keeps it.',
        art: `arr = np.arange(12).reshape(3, 4)        shape (3, 4)

        col 0  col 1  col 2  col 3
 row 0 [   0      1      2      3  ]
 row 1 [   4      5      6      7  ]
 row 2 [   8      9     10     11  ]

 arr[1, 2]     ->  6                     shape ()      both axes gone
 arr[1]        ->  [4 5 6 7]             shape (4,)    axis 0 gone
 arr[1:2]      ->  [[4 5 6 7]]           shape (1, 4)  axis 0 kept
 arr[:, 1]     ->  [1 5 9]               shape (3,)    axis 1 gone
 arr[:, 1:2]   ->  [[1] [5] [9]]         shape (3, 1)  axis 1 kept
 arr[0:2, 1:3] ->  [[1 2] [5 6]]         shape (2, 2)  both axes kept
 arr[..., -1]  ->  [3 7 11]              shape (3,)    last column`,
      },
      {
        kind: 'compare',
        title: 'View versus copy',
        caption: 'Knowing which one you are holding is the difference between a fast program and a mystery bug.',
        left: {
          heading: 'View — basic indexing',
          points: [
            'Produced by `arr[1:4]`, `arr[:, 0]`, `arr.T`, `arr.reshape(...)`',
            'Costs O(1) time and a few dozen bytes',
            'Shares the data buffer with the original',
            'Writing through it changes the original',
            '`view.base is arr` is True',
            'Keeping a small view alive keeps the whole buffer alive',
          ],
        },
        right: {
          heading: 'Copy — explicit or fancy indexing',
          points: [
            'Produced by `arr[1:4].copy()`, `arr[[0, 2]]`, `arr[mask]`',
            'Costs O(k) time and k elements of memory',
            'Owns a fresh data buffer',
            'Writing through it leaves the original untouched',
            '`copy.base is None` is True',
            'Frees the original to be garbage collected',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How to read a multi-axis selection',
        caption: 'Do this in your head, axis by axis, before you run anything.',
        steps: [
          { label: 'Split on commas', detail: 'Each comma-separated item describes exactly one axis, in order from axis 0.' },
          { label: 'Fill in missing axes', detail: 'Unmentioned trailing axes are taken in full, as if you had written `:` for each.' },
          { label: 'Integer means collapse', detail: 'An integer selector removes that axis from the result shape entirely.' },
          { label: 'Slice means keep', detail: 'A slice keeps the axis, with length `len(range(start, stop, step))`.' },
          { label: 'Read off the shape', detail: 'The result shape is the surviving axis lengths in original order.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Slice an array and watch the view',
        caption: 'Change a value through the slice and see the parent array change with it.',
        widget: 'ndarray-explorer',
      },
    ],

    formalDefinition:
      'Basic indexing selects elements using integers, `slice` objects, `Ellipsis` and `np.newaxis`. The result is always a view: a new ndarray whose data pointer, shape and strides are computed from the parent so that no element is copied. An integer index along an axis reduces ndim by one; a slice `start:stop:step` preserves the axis with length `ceil((stop - start) / step)` after negative and out-of-range values are normalised. Out-of-range integer indices raise `IndexError`, whereas out-of-range slice bounds are silently clipped.',

    math: {
      intuition:
        'A slice does not move data; it changes the arithmetic used to find data. The parent array offset, shape and strides are recomputed so that reading the view lands on the right bytes of the parent buffer.',
      formulas: [
        {
          latex: 'L = \\left\\lceil \\frac{\\min(\\text{stop}, d) - \\max(\\text{start}, 0)}{\\text{step}} \\right\\rceil_{+}',
          name: 'Length of a slice along an axis',
          meaning: 'How many elements survive a slice, after the bounds are clipped to the axis length and negatives are resolved. The subscript plus means the result is floored at zero.',
          variables: [
            { symbol: 'L', meaning: 'Length of that axis in the resulting view' },
            { symbol: 'd', meaning: 'Length of that axis in the parent array' },
            { symbol: '\\text{start}, \\text{stop}, \\text{step}', meaning: 'The three parts of the slice, after negative values are converted to positions from the end' },
          ],
        },
        {
          latex: '\\text{offset}_{\\text{view}} = \\text{offset}_{\\text{parent}} + \\text{start} \\cdot s_k, \\qquad s_k^{\\text{view}} = \\text{step} \\cdot s_k',
          name: 'What slicing does to the metadata',
          meaning: 'Slicing axis k shifts the starting offset and multiplies that axis stride by the step. No element is read or written.',
          variables: [
            { symbol: 's_k', meaning: 'Stride in bytes along axis k in the parent' },
            { symbol: '\\text{start}', meaning: 'The first selected index along axis k' },
            { symbol: '\\text{step}', meaning: 'The slice step, which may be negative to reverse the axis' },
          ],
        },
      ],
      derivation: [
        'Take a contiguous float64 array of shape (3, 4), whose strides are (32, 8): moving one row costs 32 bytes, one column costs 8.',
        'Slice it as `arr[1:3, ::2]`. Along axis 0 the start is 1, so the offset moves by 1 * 32 = 32 bytes, and the length is 3 - 1 = 2.',
        'Along axis 1 the step is 2, so that stride becomes 2 * 8 = 16 bytes, and the length is ceil(4 / 2) = 2.',
        'The view therefore has shape (2, 2), strides (32, 16) and an offset of 32 bytes into the same buffer.',
        'Not one of the four selected values was copied — only six small integers were computed, which is why slicing is free regardless of array size.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Predicting the shape of every selection',
        runnable: true,
        code: `import numpy as np

arr = np.arange(12).reshape(3, 4)
print(arr)

for expr, result in [
    ("arr[1, 2]",     arr[1, 2]),
    ("arr[1]",        arr[1]),
    ("arr[1:2]",      arr[1:2]),
    ("arr[:, 1]",     arr[:, 1]),
    ("arr[:, 1:2]",   arr[:, 1:2]),
    ("arr[0:2, 1:3]", arr[0:2, 1:3]),
    ("arr[..., -1]",  arr[..., -1]),
    ("arr[::-1]",     arr[::-1]),
]:
    print(f"{expr:<14} shape={np.shape(result)}  values={np.ravel(result)}")`,
        output: `[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
arr[1, 2]      shape=()  values=[6]
arr[1]         shape=(4,)  values=[4 5 6 7]
arr[1:2]       shape=(1, 4)  values=[4 5 6 7]
arr[:, 1]      shape=(3,)  values=[1 5 9]
arr[:, 1:2]    shape=(3, 1)  values=[1 5 9]
arr[0:2, 1:3]  shape=(2, 2)  values=[1 2 5 6]
arr[..., -1]   shape=(3,)  values=[ 3  7 11]
arr[::-1]      shape=(3, 4)  values=[ 8  9 10 11  4  5  6  7  0  1  2  3]`,
        explanation:
          'Compare the second and third rows, and the fourth and fifth: the values are identical and the shapes are not. An integer collapses its axis; a slice of length one keeps it. That difference is invisible in the values and decisive in everything downstream, because a `(3,)` and a `(3, 1)` broadcast against other arrays in completely different ways.',
      },
      {
        language: 'python',
        title: 'A slice is a view, and that has consequences',
        runnable: true,
        code: `import numpy as np

arr = np.arange(10)
window = arr[2:5]

print("window   :", window)
print("shares memory?", window.base is arr)

window[0] = 999
print("window   :", window)
print("arr      :", arr)          # the parent changed too

safe = arr[2:5].copy()
safe[0] = -1
print("safe copy:", safe)
print("arr again:", arr)          # this time unchanged
print("copy base:", safe.base)`,
        output: `window   : [2 3 4]
shares memory? True
window   : [999   3   4]
arr      : [  0   1 999   3   4   5   6   7   8   9]
safe copy: [ -1   3   4]
arr again: [  0   1 999   3   4   5   6   7   8   9]
copy base: None`,
        explanation:
          'Assigning into `window` changed `arr`, because both array objects describe the same bytes. `base` is the cheapest diagnostic available: a view reports the array it borrows from, while a genuine copy reports `None`. When you intend to modify a subset in isolation, take the copy explicitly — NumPy will never do it for you behind your back, because doing so would make slicing expensive for everybody.',
      },
      {
        language: 'python',
        title: 'Assigning into a slice, and a real image example',
        runnable: true,
        code: `import numpy as np

img = np.zeros((6, 8), dtype=np.uint8)

img[1:4, 2:6] = 255          # paint a rectangle in place
print(img)

row_means = img.mean(axis=1)
print("row means:", row_means)

# Every second row, reversed columns - still a view, still free
print(img[::2, ::-1].shape)`,
        output: `[[  0   0   0   0   0   0   0   0]
 [  0   0 255 255 255 255   0   0]
 [  0   0 255 255 255 255   0   0]
 [  0   0 255 255 255 255   0   0]
 [  0   0   0   0   0   0   0   0]
 [  0   0   0   0   0   0   0   0]]
row means: [  0.   127.5 127.5 127.5   0.    0. ]
(3, 8)`,
        explanation:
          'Assigning a scalar into a slice writes that value into every selected position, which is how you paint regions of an image or reset a block of a matrix without a loop. The last line shows that stepping and reversing are also views: `img[::2, ::-1]` costs nothing, even though it reads the buffer backwards along one axis and skips along the other.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Cropping an image',
        usage:
          '`patch = img[100:228, 50:178]` extracts a 128x128 region instantly with no copy. Augmentation pipelines rely on that being free, since they crop thousands of patches per second.',
      },
      {
        context: 'Splitting features from labels',
        usage:
          '`X = data[:, :-1]` and `y = data[:, -1]` separate a loaded matrix in two lines. Note that `y` has shape `(n,)` because the integer-like `-1` collapses the axis, while `X` stays 2-D.',
      },
      {
        context: 'Mini-batching during training',
        usage:
          '`batch = X[i:i+32]` hands the model a view of 32 rows without duplicating them, which is why a training loop over a large in-memory array does not grow in memory as it runs.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: 'The `SettingWithCopyWarning` exists because pandas sits on NumPy and cannot always tell whether your selection produced a view or a copy.' },
      { tool: 'OpenCV', role: 'Region-of-interest processing is plain slicing, and writing into the region edits the original image by design.' },
      { tool: 'PyTorch', role: 'Tensor slicing follows the same view semantics, which is why `.clone()` exists and why in-place ops can corrupt a saved tensor.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming `sub = arr[0:100]` gives an independent copy',
        why: 'Basic slicing returns a view sharing the parent buffer, so `sub[:] = 0` zeroes the first hundred elements of `arr`. The bug usually surfaces far from the line that caused it.',
        fix: 'Write `sub = arr[0:100].copy()` whenever you intend to modify the subset independently. Check `sub.base is None` if you are unsure which you have.',
      },
      {
        mistake: 'Writing `arr[1][2]` instead of `arr[1, 2]`',
        why: 'The chained form builds an intermediate view of the whole row and then indexes it, which is slower and, worse, breaks for assignment with fancy indexing because the intermediate may be a copy.',
        fix: 'Use one bracket with commas: `arr[1, 2]`. It is faster, reads better, and always assigns into the original.',
      },
      {
        mistake: 'Expecting `arr[3]` and `arr[3:4]` to be interchangeable',
        why: 'The first collapses the axis to give shape `(4,)` and the second preserves it to give `(1, 4)`. Downstream broadcasting, concatenation and model APIs treat those two very differently.',
        fix: 'Decide deliberately whether you want the axis kept, and print the shape to confirm. Use `arr[3:4]` or `arr[3][np.newaxis, :]` when the axis must survive.',
      },
      {
        mistake: 'Believing an out-of-range slice will raise an error',
        why: 'Slices are clipped silently, so `arr[5:100]` on a length-10 array returns four elements and `arr[50:60]` returns an empty array. Only integer indices raise `IndexError`.',
        fix: 'Check `result.size` after slicing with computed bounds. An unexpectedly empty array almost always means the bounds were wrong, not that the data was.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between `arr[2]` and `arr[2:3]` for a 2-D array?',
        answer:
          'They select the same data and return different shapes. `arr[2]` uses an integer index, which removes axis 0, so a `(5, 4)` array yields shape `(4,)` — a one-dimensional row. `arr[2:3]` uses a slice, which preserves axis 0 even though it has length one, so the result has shape `(1, 4)` and is still two-dimensional. The distinction matters because a `(4,)` and a `(1, 4)` broadcast differently, concatenate differently, and are accepted by different library functions. Both are views into the same buffer.',
        followUp:
          'A strong answer notes the general rule: integers collapse an axis, slices keep it, and that rule is what makes `np.newaxis` and `keepdims` necessary.',
      },
      {
        level: 'intermediate',
        question: 'Explain why NumPy returns views from slices, and what bug that design causes.',
        answer:
          'An ndarray separates the data buffer from the metadata describing how to read it, so a slice can be expressed as a new offset, shape and strides pointing at the parent buffer. That makes any slice O(1) in time and memory regardless of array size, which is essential when you crop images or take mini-batches millions of times. The cost is aliasing: `sub = arr[0:10]` followed by `sub += 1` mutates `arr`, and a function given a slice can modify its caller data. It also means a small view keeps the entire parent buffer alive in memory, so holding a ten-element slice of a gigabyte array can retain the whole gigabyte. The remedy in both cases is an explicit `.copy()`.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you check, in a debugging session, whether an array you hold is a view or a copy?',
        answer:
          'The direct check is the `base` attribute: a view returns the array it borrows from, while an array that owns its data returns `None`. For a definitive answer about two specific arrays I would use `np.shares_memory(a, b)`, or `np.may_share_memory` for a cheap conservative check. `arr.flags.OWNDATA` tells you whether the array allocated its own buffer. Beyond the mechanics, the useful heuristic is to know which operations return which: basic slicing, `reshape`, `transpose` and `ravel` give views where possible, whereas boolean masking, fancy integer indexing, `astype` and `flatten` always copy.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For `arr = np.arange(24).reshape(2, 3, 4)`, state the shapes of `arr[0]`, `arr[:, 1]`, `arr[..., 2]`, `arr[0, :, 1:3]` and `arr[1, 2, 3]` before running anything.',
        hint: 'Go selector by selector: an integer removes that axis, a slice keeps it, and missing trailing axes are taken in full.',
        solution:
          '`arr[0]` -> `(3, 4)`: axis 0 collapsed, the other two taken in full.\n`arr[:, 1]` -> `(2, 4)`: axis 1 collapsed.\n`arr[..., 2]` -> `(2, 3)`: the last axis collapsed, the ellipsis standing in for the first two.\n`arr[0, :, 1:3]` -> `(3, 2)`: axis 0 collapsed, axis 1 kept in full, axis 2 sliced to length 2.\n`arr[1, 2, 3]` -> `()`: all three axes collapsed, giving a scalar, which here is the value 23.',
      },
      {
        prompt: 'Write code that sets the middle two rows of a 6x6 array of zeros to 1 without a loop, then prove that doing the same thing through `.copy()` leaves the original untouched.',
        hint: 'A slice on the left of an assignment writes in place; a copy on the left writes into a different buffer.',
        language: 'python',
        starterCode: 'import numpy as np\n\ngrid = np.zeros((6, 6))\n',
        solution:
          'import numpy as np\n\ngrid = np.zeros((6, 6))\ngrid[2:4, :] = 1\nprint(grid.sum())          # 12.0 - twelve ones were written\n\nfresh = np.zeros((6, 6))\nband = fresh[2:4, :].copy()\nband[:] = 1\nprint(fresh.sum())         # 0.0 - the copy absorbed the write\n\nThe first assignment targets a view, so the write lands in `grid`. The second writes into an independent buffer created by `.copy()`, which is why `fresh` still sums to zero.',
      },
      {
        prompt: 'Explain why `arr[5:100]` on a ten-element array returns five elements rather than raising, while `arr[100]` raises `IndexError`.',
        hint: 'Slices and integer indices have deliberately different out-of-range policies.',
        solution:
          'Slice bounds are clipped to the array: `5:100` becomes `5:10`, giving the five elements from index 5 onwards. Integer indices are not clipped, because there is no sensible element to return, so `arr[100]` raises `IndexError: index 100 is out of bounds for axis 0 with size 10`.\n\nThis is a deliberate asymmetry inherited from Python sequences, and it is a real source of silent bugs: computed slice bounds that are wrong give you a short or empty array instead of an exception. Checking `result.size` after slicing with computed indices is a cheap guard.',
      },
    ],

    quiz: [
      {
        id: 'NP-004-q1',
        type: 'code-output',
        language: 'python',
        concept: 'views',
        prompt: 'What does this print?',
        code: 'import numpy as np\narr = np.arange(6)\nsub = arr[1:4]\nsub[0] = 99\nprint(arr)',
        options: ['[ 0 99  2  3  4  5]', '[0 1 2 3 4 5]', '[99  1  2  3  4  5]', 'It raises a ValueError'],
        answerIndex: 0,
        explanation:
          'Basic slicing returns a view sharing the parent buffer, so writing into `sub[0]` writes into `arr[1]`. No copy was ever made.',
      },
      {
        id: 'NP-004-q2',
        type: 'mcq',
        concept: 'axis collapse',
        prompt: 'For an array of shape `(5, 4)`, what are the shapes of `arr[2]` and `arr[2:3]`?',
        options: [
          '`(4,)` and `(1, 4)`',
          '`(4,)` and `(4,)`',
          '`(1, 4)` and `(1, 4)`',
          '`(5,)` and `(1, 5)`',
        ],
        answerIndex: 0,
        explanation:
          'An integer index removes the axis, leaving a 1-D row of length 4. A slice keeps the axis even at length one, leaving a 2-D array with one row.',
      },
      {
        id: 'NP-004-q3',
        type: 'truefalse',
        concept: 'slice bounds',
        prompt: 'Slicing beyond the end of an array, as in `arr[5:100]` on a length-10 array, raises an IndexError.',
        answer: false,
        explanation:
          'Slice bounds are silently clipped, so this returns the five elements from index 5 to the end. Only out-of-range integer indices raise IndexError.',
      },
      {
        id: 'NP-004-q4',
        type: 'fill',
        concept: 'forcing a copy',
        prompt: 'Which method call turns a slice into an independent array that does not share memory with its parent?',
        answers: ['copy', '.copy()', 'copy()', 'arr.copy()'],
        explanation:
          '`.copy()` allocates a new buffer and duplicates the selected data, so subsequent writes cannot reach the parent. Its `base` attribute is then `None`.',
      },
      {
        id: 'NP-004-q5',
        type: 'code-output',
        language: 'python',
        concept: 'multi-axis selection',
        prompt: 'What is printed?',
        code: 'import numpy as np\narr = np.arange(12).reshape(3, 4)\nprint(arr[:2, 1:3])',
        options: [
          '[[1 2]\n [5 6]]',
          '[[0 1]\n [4 5]]',
          '[[1 2 3]\n [5 6 7]]',
          '[[4 5]\n [8 9]]',
        ],
        answerIndex: 0,
        explanation:
          'Rows 0 and 1 are kept, and within them columns 1 and 2. Stops are exclusive on both axes, giving the 2x2 block [[1, 2], [5, 6]].',
      },
      {
        id: 'NP-004-q6',
        type: 'multi',
        concept: 'views versus copies',
        prompt: 'Which of these return a view rather than a copy? Select all that apply.',
        options: [
          '`arr[2:8]`',
          '`arr[:, 0]`',
          '`arr.T`',
          '`arr[[0, 2, 4]]`',
          '`arr[arr > 0]`',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Basic indexing and transposition produce views, since the result can be described with an offset and strides. Fancy integer indexing and boolean masking select arbitrary positions that no stride pattern can express, so they must copy.',
      },
    ],

    flashcards: [
      { front: 'Does `arr[1:4]` copy the data?', back: 'No. Basic slicing returns a view sharing the parent buffer, so writes through it change the original. Use `.copy()` for independence.' },
      { front: 'Integer index versus slice on an axis', back: 'An integer collapses the axis (`arr[2]` -> `(4,)`); a slice keeps it (`arr[2:3]` -> `(1, 4)`), even at length one.' },
      { front: 'How do you check if an array is a view?', back: '`arr.base` names the parent for a view and is `None` for an owner; `np.shares_memory(a, b)` answers definitively for a pair.' },
      { front: 'What does `arr[..., 0]` mean?', back: 'Index 0 of the last axis, with all earlier axes taken in full, whatever the number of dimensions.' },
      { front: 'Why does `arr[5:100]` not raise on a length-10 array?', back: 'Slice bounds are clipped to the array; only out-of-range integer indices raise `IndexError`.' },
      { front: 'Why prefer `arr[1, 2]` over `arr[1][2]`?', back: 'One bracket indexes directly, which is faster and always assigns into the original; the chained form builds an intermediate that may be a copy.' },
    ],

    challenge: {
      title: 'A view-or-copy detector',
      brief:
        'Write a function `report(parent, selection_expr, result)` that prints whether a selection produced a view or a copy, using `base`, `flags.OWNDATA` and `np.shares_memory`. Run it over at least eight selections covering basic slicing, stepped slicing, transposition, reshape, an integer index, fancy integer indexing, boolean masking and an explicit copy. Then, for one of the views, demonstrate the aliasing consequence by writing through it and printing the parent before and after.',
      language: 'python',
      acceptanceCriteria: [
        'At least eight selections are classified, covering both views and copies',
        'Classification uses `np.shares_memory` rather than guessing from the operation name',
        'The aliasing demonstration shows the parent changing through a view',
        'A closing comment states the general rule for which operations copy',
      ],
      starterCode: 'import numpy as np\n\narr = np.arange(12).reshape(3, 4)\n\ndef report(name, parent, result):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how to select from a 2-D array, and warn them about the single most surprising thing NumPy does when they slice.',
      mustCover: [
        'One bracket with comma-separated selectors, one per axis in order',
        'An integer collapses its axis; a slice keeps it, even at length one',
        'Basic slicing returns a view that shares memory with the original',
        'Writing through a view changes the parent, and `.copy()` is how you opt out',
      ],
      bonusSignals: ['explains why views exist rather than only that they do', 'mentions `base` or `np.shares_memory` as a check', 'notes that slice bounds are clipped but integer indices are not'],
      sampleExplanation:
        'You select from an array with a single pair of brackets containing one selector per axis, separated by commas: `arr[row, col]`. Put a number in a position and you pick one location along that axis, and the axis disappears from the answer, so `arr[2]` on a five-by-four array gives a flat row of four. Put a slice like `2:3` there instead and the axis survives, so you get a one-row table of shape `(1, 4)` holding the same values. That difference looks pedantic and decides how the result behaves everywhere downstream. The surprise is what you get back. Slicing a NumPy array does not copy anything; it hands you a second array object that looks at exactly the same bytes, which is why slicing a huge array is instant. So if you write `window = arr[2:5]` and then change `window[0]`, you have changed `arr` as well, because there was only ever one set of numbers. When you want to modify a piece without touching the whole, say so: `window = arr[2:5].copy()`.',
    },
  },

  {
    id: 'NP-005',
    domain: 'NP',
    module: 'Selecting Data',
    topic: 'Masks and fancy indexing',
    title: 'Boolean Masks and Fancy Indexing',
    slug: 'boolean-masks-and-fancy-indexing',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['NP-004'],
    related: ['NP-002', 'NP-003'],
    tags: ['boolean-mask', 'fancy-indexing', 'where', 'filtering', 'copy', 'argsort'],

    learningObjectives: [
      'Build a boolean mask from a comparison and use it to select, count and modify elements',
      'Combine conditions correctly with `&`, `|` and `~`, and explain why `and` and `or` fail on arrays',
      'Select arbitrary positions with integer arrays, and predict the shape of the result',
      'Explain why masking and fancy indexing return copies while basic slicing returns views, and when that matters',
    ],

    terminology: [
      {
        term: 'Boolean mask',
        definition:
          'A `bool` array of the same shape as the data, where `True` marks the positions to keep. Produced by comparisons such as `arr > 5`.',
        simple: 'A yes/no stencil laid over the array, the same size as the array.',
      },
      {
        term: 'Fancy indexing',
        definition:
          'Indexing with an array or list of integers, selecting those positions in that order. Also called advanced integer indexing.',
        simple: 'Handing NumPy a shopping list of positions you want, in the order you want them.',
      },
      {
        term: 'Advanced indexing',
        definition:
          'The umbrella term for boolean and integer-array indexing. Unlike basic indexing it always returns a new array with its own data.',
        simple: 'Any selection that cannot be described by a plain start:stop:step window, so the data has to be gathered.',
      },
      {
        term: 'np.where',
        definition:
          'With three arguments, an element-wise choice: `np.where(cond, a, b)` takes from `a` where `cond` is True and from `b` elsewhere. With one argument, it returns the indices of the True positions.',
        simple: 'A vectorised if-else, or a way to ask where the True values are.',
      },
      {
        term: 'Bitwise operators on arrays',
        definition:
          '`&`, `|` and `~` are the element-wise and, or and not for boolean arrays. They bind more tightly than comparisons, so each condition needs parentheses.',
        simple: 'The and, or and not that work element by element — and they need brackets.',
      },
    ],

    simpleExplanation:
      "Slicing answers the question \"which positions?\" but most real questions are about values: which rows have a price above 100, which pixels are too dark, which predictions were wrong. NumPy answers those in two steps. First you write a comparison over the whole array — `prices > 100` — and instead of one True or False you get a whole array of them, the same shape as the data, one answer per element. That is a mask. Then you index with it: `prices[prices > 100]` hands back just the elements whose mask entry was True, as a flat array. Because the selected elements can sit anywhere, NumPy has to gather them into fresh memory, so unlike a slice this is always a copy. The same is true of the other advanced selection: you can pass a list of positions, `arr[[3, 0, 3, 7]]`, and get those elements in that order, repeats and all. Both tools also work on the left of an assignment — `arr[arr < 0] = 0` clamps every negative to zero in one line, with no loop and no copy at all, because assignment writes straight back into the original.",

    whyItExists:
      'Filtering is the most common operation in data work, and writing it as a Python loop with an `if` inside is both slow and verbose. Masks turn a question about values into an array of booleans that can be counted, combined, reused across columns and applied to other arrays of the same length, which is exactly the vocabulary a data pipeline needs.',

    analogy: {
      scenario:
        'Picture a long row of exam papers and a colleague who walks the row holding a stack of coloured stickers. They never move a paper; they just put a green sticker on every paper scoring above 70 and leave the rest bare. Once the stickers are on, three quite different jobs become easy: count the green stickers, collect the stickered papers into a new pile, or walk the row again and stamp PASS on every stickered paper without moving anything.',
      mapping: [
        { from: 'A sticker on every paper, green or absent', to: 'A boolean mask: one True or False per element, same shape as the data' },
        { from: 'Counting the green stickers', to: '`mask.sum()`, because True counts as 1' },
        { from: 'Collecting stickered papers into a new pile', to: '`arr[mask]`, which copies the selected values into a new flat array' },
        { from: 'Stamping in place without moving papers', to: '`arr[mask] = 0`, which writes back into the original array' },
        { from: 'A written list saying "papers 7, 2, 7, 19 please"', to: 'Fancy indexing with an integer array, order and repeats respected' },
      ],
      bridge:
        'The distinction between collecting a new pile and stamping in place is exactly the distinction between reading and writing through advanced indexing. Reading must build a new pile, because the chosen papers are scattered and no simple window describes them — that is why `arr[mask]` is a copy. Writing does not need a new pile at all, because NumPy can visit each marked position in the original and set it — that is why `arr[mask] = 0` mutates in place.',
      limitations:
        'Stickers suggest the mask is attached to the data. It is not: a mask is an independent boolean array, which is why you can build it from one array and apply it to another of the same length, as when you select rows of `X` using a condition on `y`.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'A mask, from comparison to selection',
        caption: 'The comparison is element-wise, so the mask has the same shape as the data.',
        art: `scores        [ 55   91   72   40   88   67 ]

scores > 70   [  F    T    T    F    T    F  ]      <- the mask, shape (6,)

(scores > 70).sum()        -> 3          True counts as 1
scores[scores > 70]        -> [91 72 88]  flat COPY of the True positions
np.where(scores > 70)      -> (array([1, 2, 4]),)   the True indices

scores[scores > 70] = 100
scores        [ 55  100  100   40  100   67 ]       written IN PLACE


fancy indexing (integer array, not boolean)

idx = [3, 0, 3]
scores[idx]   -> [ 40   55   40 ]     order kept, repeats allowed, shape (3,)`,
      },
      {
        kind: 'table',
        title: 'Combining conditions without tripping over the operators',
        caption: 'The parentheses are not optional: `&` binds tighter than `>`, so omitting them changes the meaning.',
        columns: ['Intent', 'Correct', 'Wrong, and what happens'],
        rows: [
          ['Both conditions', '`(a > 2) & (a < 8)`', '`a > 2 and a < 8` raises ValueError: truth value of an array is ambiguous'],
          ['Either condition', '`(a > 8) | (a < 2)`', '`a > 8 or a < 2` raises the same ValueError'],
          ['Negate a condition', '`~(a > 5)`', '`not (a > 5)` raises the same ValueError'],
          ['Both, no brackets', '`(a > 2) & (a < 8)`', '`a > 2 & a < 8` evaluates `2 & a` first, giving nonsense or a TypeError'],
          ['Membership in a set', '`np.isin(a, [1, 5, 9])`', '`a in [1, 5, 9]` tests the whole array at once and is ambiguous'],
        ],
      },
      {
        kind: 'compare',
        title: 'Basic slicing versus advanced indexing',
        caption: 'One is a window onto existing memory; the other gathers scattered values into new memory.',
        left: {
          heading: 'Basic slicing — `arr[1:4]`',
          points: [
            'Selectors are integers, slices, newaxis, Ellipsis',
            'Describable by an offset and strides',
            'Returns a view; no data is copied',
            'Writing through it changes the parent',
            'Shape follows directly from the slice bounds',
          ],
        },
        right: {
          heading: 'Advanced indexing — `arr[mask]`, `arr[[0, 2]]`',
          points: [
            'Selectors are boolean arrays or integer arrays',
            'Selected positions can be scattered arbitrarily',
            'Returns a copy with its own buffer',
            'Writing through it in a single statement still updates the parent',
            'Shape follows the mask count, or the index array shape',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Filter an array interactively',
        caption: 'Change the threshold and watch the mask, the count and the selection update together.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'Boolean indexing `arr[mask]`, where `mask` is a boolean array matching the shape of the first `mask.ndim` axes of `arr`, returns a new array containing the elements at positions where `mask` is True, in C order, with leading axes flattened to a single axis of length `mask.sum()`. Integer-array indexing `arr[idx]` returns a new array of shape `idx.shape + arr.shape[1:]`, gathering `arr[idx[j]]` for each element of `idx`. Both forms are advanced indexing and always copy on read; when written as the target of an assignment they modify the original array in place.',

    math: {
      intuition:
        'A mask is the indicator function of a condition, evaluated at every element. Once you see it that way, counting, proportions and conditional means are all just sums involving that indicator.',
      formulas: [
        {
          latex: 'm_i = \\mathbb{1}[\\,x_i > t\\,] = \\begin{cases} 1 & x_i > t \\\\ 0 & \\text{otherwise} \\end{cases}',
          name: 'The mask as an indicator',
          meaning: 'Each element of the mask is 1 exactly when the condition holds at that position.',
          variables: [
            { symbol: 'x_i', meaning: 'Element i of the data array' },
            { symbol: 't', meaning: 'The threshold being compared against' },
            { symbol: 'm_i', meaning: 'Element i of the boolean mask, treated as 1 or 0 in arithmetic' },
          ],
        },
        {
          latex: 'c = \\sum_{i} m_i, \\qquad p = \\frac{1}{n}\\sum_i m_i, \\qquad \\bar{x}_{\\text{sel}} = \\frac{\\sum_i m_i x_i}{\\sum_i m_i}',
          name: 'Count, proportion and conditional mean',
          meaning: 'Summing the mask counts the matches; averaging it gives the proportion; weighting the data by the mask and dividing by the count gives the mean of the selected subset.',
          variables: [
            { symbol: 'c', meaning: 'Number of elements satisfying the condition, computed as `mask.sum()`' },
            { symbol: 'n', meaning: 'Total number of elements' },
            { symbol: 'p', meaning: 'Fraction satisfying the condition, computed as `mask.mean()`' },
            { symbol: '\\bar{x}_{\\text{sel}}', meaning: 'Mean of the selected elements, the same as `arr[mask].mean()`' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Because True is 1 and False is 0 under arithmetic, `mask.sum()` adds one for every match and nothing for every non-match, which is a count.',
        'Dividing that count by n gives the proportion, which is exactly what `mask.mean()` computes in one step.',
        'Multiplying the data by the mask zeroes every non-matching element, so the sum of the product is the sum over the matching elements only.',
        'Dividing that by the count gives the conditional mean, which is why `arr[mask].mean()` and `(arr * mask).sum() / mask.sum()` agree.',
        'The second form is occasionally preferable because it never materialises the selected copy, which matters when the array is very large.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'From a comparison to a filtered answer',
        runnable: true,
        code: `import numpy as np

scores = np.array([55, 91, 72, 40, 88, 67])

mask = scores > 70
print("mask       :", mask, mask.dtype)
print("count      :", mask.sum())
print("proportion :", mask.mean())
print("selected   :", scores[mask])
print("is a copy? ", scores[mask].base is None)

# The mask can be built from one array and applied to another
names = np.array(["ana", "ben", "cara", "dan", "eve", "finn"])
print("passed     :", names[mask])`,
        output: `mask       : [False  True  True False  True False] bool
count      : 3
proportion : 0.5
selected   : [91 72 88]
is a copy?  True
passed     : ['ben' 'cara' 'eve']`,
        explanation:
          'The comparison is element-wise, so it returns six booleans rather than one. Because `True` behaves as 1 in arithmetic, `sum` counts the matches and `mean` gives the proportion directly. The final two lines show the real power: a mask is an independent array, so a condition computed on scores can select the corresponding names, which is the array equivalent of filtering rows of a table by a column.',
      },
      {
        language: 'python',
        title: 'Combining conditions, and the error everyone hits once',
        runnable: true,
        code: `import numpy as np

a = np.arange(10)

print((a > 2) & (a < 8))
print(a[(a > 2) & (a < 8)])
print(a[(a < 2) | (a > 8)])
print(a[~(a % 2 == 0)])
print(a[np.isin(a, [1, 4, 9])])

try:
    a[a > 2 and a < 8]
except ValueError as e:
    print("ValueError:", e)`,
        output: `[False False False  True  True  True  True  True False False]
[3 4 5 6 7]
[0 1 9]
[1 3 5 7 9]
[1 4 9]
ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()`,
        explanation:
          '`and` asks Python to reduce each side to a single True or False, and an array of ten booleans has no single answer, so it refuses. The element-wise operators `&`, `|` and `~` are the correct tools, and each condition needs its own parentheses because `&` has higher precedence than `>`. Memorise the shape of this error message — it is one of the most frequent in all of NumPy and pandas.',
      },
      {
        language: 'python',
        title: 'Fancy indexing and in-place modification',
        runnable: true,
        code: `import numpy as np

arr = np.array([10, 20, 30, 40, 50])

idx = np.array([3, 0, 3, 1])
print("fancy       :", arr[idx], arr[idx].shape)

grid = np.arange(12).reshape(3, 4)
rows = np.array([0, 2])
cols = np.array([1, 3])
print("paired      :", grid[rows, cols])        # (0,1) and (2,3)
print("outer block :\\n", grid[np.ix_(rows, cols)])

# Writing through advanced indexing modifies the original
signal = np.array([-3.0, 2.0, -1.5, 4.0])
signal[signal < 0] = 0.0
print("clamped     :", signal)

top2 = np.argsort(grid[0])[-2:]
print("top-2 idx   :", top2, "values:", grid[0][top2])`,
        output: `fancy       : [40 10 40 20] (4,)
paired      : [ 1 11]
outer block :
 [[ 1  3]
 [ 9 11]]
clamped     : [0. 2. 0. 4.]
top-2 idx   : [2 3] values: [2 3]`,
        explanation:
          'Three ideas here. Fancy indexing respects order and repeats, and the result shape follows the index array shape, not the data shape. Two integer arrays on two axes pair up element-wise — `grid[rows, cols]` gives two elements, not a 2x2 block; use `np.ix_` when you want the block. And `signal[signal < 0] = 0.0` looks like it should build a copy and throw it away, but assignment through advanced indexing is a single statement that NumPy executes as a scatter back into the original buffer.',
      },
      {
        language: 'python',
        title: 'np.where as a vectorised if-else',
        runnable: true,
        code: `import numpy as np

temps = np.array([12.0, 31.5, 25.0, 4.0, 28.2])

label = np.where(temps > 25, "hot", "mild")
print(label)

capped = np.where(temps > 30, 30.0, temps)
print(capped)

idx, = np.where(temps > 25)
print("indices:", idx, "values:", temps[idx])

print("any above 30?", np.any(temps > 30))
print("all above 0? ", np.all(temps > 0))
print("how many hot?", np.count_nonzero(temps > 25))`,
        output: `['mild' 'hot' 'mild' 'mild' 'hot']
[12.  30.  25.   4.  28.2]
indices: [1 4] values: [31.5 28.2]
any above 30? True
all above 0?  True
how many hot? 2`,
        explanation:
          '`np.where(cond, a, b)` is the array form of a conditional expression, evaluated element by element, and both branches may themselves be arrays. Called with one argument it switches meaning entirely and returns a tuple of index arrays, one per axis — hence the comma in `idx, = np.where(...)` to unpack the single-element tuple for a 1-D input. `any`, `all` and `count_nonzero` are the standard ways to reduce a mask to an answer.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Cleaning sensor data',
        usage:
          '`readings[readings < 0] = np.nan` invalidates impossible negative measurements in one line, and `np.count_nonzero(np.isnan(readings))` then reports how much data was lost.',
      },
      {
        context: 'Evaluating a classifier',
        usage:
          'Accuracy is `(y_pred == y_true).mean()`. Examining the failures is `X[y_pred != y_true]`, which selects exactly the misclassified rows for inspection.',
      },
      {
        context: 'Shuffling and sampling',
        usage:
          'A train-test split is fancy indexing: permute the indices with `rng.permutation(n)`, then take `X[idx[:k]]` and `X[idx[k:]]`. Indexing by a permutation reorders rows without any loop.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df[df["price"] > 100]` is this exact mechanism, with the mask aligned by index rather than by position.' },
      { tool: 'scikit-learn', role: 'Cross-validation splitters return integer index arrays intended for fancy indexing into X and y.' },
      { tool: 'PyTorch', role: 'Tensors support the same boolean and integer indexing, and `torch.where` mirrors `np.where`.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `and`, `or` or `not` to combine array conditions',
        why: 'Those keywords need a single truth value from each operand, and a boolean array of many elements has none, so Python raises `ValueError: The truth value of an array with more than one element is ambiguous`.',
        fix: 'Use `&`, `|` and `~`, and wrap each comparison in parentheses because those operators bind more tightly than `>` and `==`.',
      },
      {
        mistake: 'Chained indexing for assignment: `arr[mask][0] = 5`',
        why: '`arr[mask]` is a copy, so the assignment writes into a temporary array that is discarded immediately and the original never changes. No error is raised, which makes it worse.',
        fix: 'Do it in one indexing step: `arr[mask] = 5`, or use `np.where(mask)[0]` to get concrete indices and assign into those.',
      },
      {
        mistake: 'Expecting `grid[rows, cols]` to return a rectangular block',
        why: 'Two integer arrays are zipped element-wise, so `grid[[0, 2], [1, 3]]` returns the two elements at (0,1) and (2,3), giving shape `(2,)` rather than `(2, 2)`.',
        fix: 'Use `np.ix_(rows, cols)` for the outer product of selections, or slice one axis and fancy-index the other: `grid[np.array([0, 2])[:, None], cols]`.',
      },
      {
        mistake: 'Building a mask whose shape does not match the array',
        why: 'A mask must match the shape of the axes it indexes. A mask of length 4 applied to an array of length 5 raises `IndexError: boolean index did not match indexed array along axis 0`.',
        fix: 'Build the mask from the array it will index, or from something guaranteed to be the same length, and check `mask.shape` against `arr.shape` when they come from different sources.',
      },
      {
        mistake: 'Filtering a large array repeatedly and wondering where the memory went',
        why: 'Every boolean selection copies the selected elements, so a chain of five filters over a gigabyte array allocates five intermediate arrays.',
        fix: 'Combine the conditions into a single mask with `&` and index once, or work with the index array from `np.where` when you only need positions.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why does `arr[arr > 5 and arr < 10]` fail, and what is the correct form?',
        answer:
          'The `and` keyword requires each operand to collapse to a single boolean, which it does by calling `bool()` on the array. For an array with more than one element that is ambiguous — some entries are True and some are False — so NumPy raises `ValueError: The truth value of an array with more than one element is ambiguous`. The correct form is `arr[(arr > 5) & (arr < 10)]`, using the element-wise bitwise and. The parentheses are required because `&` has higher precedence than the comparison operators, so without them Python would evaluate `5 & arr` first.',
        followUp:
          'A strong answer notes that `any()` and `all()` are the right tools when you genuinely do want one truth value from a mask.',
      },
      {
        level: 'intermediate',
        question: 'Why does boolean indexing return a copy when slicing returns a view?',
        answer:
          'A view is just an offset, a shape and a set of strides pointing into the parent buffer, so it can only describe selections that are regularly spaced. A boolean mask can select arbitrary scattered positions — elements 0, 3 and 97 — and no stride pattern expresses that, so NumPy must gather the chosen values into a new contiguous buffer. The consequence is that reading through a mask costs time and memory proportional to the number of selected elements, and that `arr[mask][0] = 5` silently does nothing because it writes into a temporary. Assignment written as a single statement, `arr[mask] = 5`, is handled differently: NumPy scatters the values back into the original buffer rather than building anything.',
      },
      {
        level: 'ml-engineer',
        question: 'You need the ten largest values of a one-million-element array and their positions. How would you do it efficiently?',
        answer:
          'Sorting the whole array is O(n log n) and wasteful for ten values. I would use `np.argpartition(arr, -10)[-10:]`, which is O(n) and gives the indices of the ten largest without ordering the rest, then sort just those ten with `idx[np.argsort(arr[idx])[::-1]]` if I need them ranked. Returning indices rather than values keeps the result usable for fancy indexing into parallel arrays — the labels or filenames corresponding to those rows. `np.argsort(arr)[-10:]` is the simpler alternative and is fine when n is small or the code runs once.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Given `a = np.arange(20)`, select every element that is even and greater than 8, then replace each of those elements with -1 in the original array.',
        hint: 'Build one combined mask with `&`, and remember that each comparison needs parentheses.',
        language: 'python',
        starterCode: 'import numpy as np\n\na = np.arange(20)\n',
        solution:
          'import numpy as np\n\na = np.arange(20)\nmask = (a % 2 == 0) & (a > 8)\nprint(a[mask])        # [10 12 14 16 18]\na[mask] = -1\nprint(a)              # [ 0 1 2 3 4 5 6 7 8 9 -1 11 -1 13 -1 15 -1 17 -1 19]\n\nThe read `a[mask]` produced a copy, which is why printing it did not affect the array. The assignment `a[mask] = -1` is a single statement, so NumPy writes the value back into the five marked positions of the original buffer.',
      },
      {
        prompt: 'For `grid = np.arange(12).reshape(3, 4)`, explain the difference between `grid[[0, 2], [1, 3]]` and `grid[np.ix_([0, 2], [1, 3])]`, including both shapes.',
        hint: 'Ask whether the two index arrays are zipped together or crossed with each other.',
        solution:
          '`grid[[0, 2], [1, 3]]` pairs the index arrays element-wise, selecting positions (0, 1) and (2, 3), so the result is `[1, 11]` with shape `(2,)`.\n\n`grid[np.ix_([0, 2], [1, 3])]` takes the outer product of the two selections, giving rows 0 and 2 crossed with columns 1 and 3, so the result is `[[1, 3], [9, 11]]` with shape `(2, 2)`.\n\nThe zipping behaviour surprises nearly everyone at first. Remember it as: integer arrays on different axes are broadcast against each other, and two 1-D arrays of the same length broadcast to that length, not to a grid.',
      },
      {
        prompt: 'Write a one-line expression that reports the proportion of an array `y_pred` that matches `y_true`, and explain why it works without a loop or an explicit count.',
        hint: 'What dtype does a comparison return, and what does taking the mean of that dtype compute?',
        solution:
          '`accuracy = (y_pred == y_true).mean()`\n\nThe comparison produces a boolean array with one entry per prediction. Under arithmetic `True` is 1 and `False` is 0, so the mean of that boolean array is the number of correct predictions divided by the total, which is exactly accuracy. The same trick gives any rate: `(y_pred[y_true == 1] == 1).mean()` is recall, computed with two masks and no loop.',
      },
    ],

    quiz: [
      {
        id: 'NP-005-q1',
        type: 'code-output',
        language: 'python',
        concept: 'boolean masking',
        prompt: 'What does this print?',
        code: 'import numpy as np\na = np.array([1, 5, 3, 8, 2])\nprint(a[a > 2])',
        options: ['[5 3 8]', '[False  True  True  True False]', '[1 2 3]', '[5 8]'],
        answerIndex: 0,
        explanation:
          'The mask is True at positions 1, 2 and 3, so those elements are gathered in order into a new flat array. The values 5, 3 and 8 all exceed 2.',
      },
      {
        id: 'NP-005-q2',
        type: 'debug',
        language: 'python',
        concept: 'combining conditions',
        prompt: 'This raises `ValueError: The truth value of an array with more than one element is ambiguous`. What is the fix?',
        code: 'import numpy as np\na = np.arange(10)\nprint(a[a > 2 and a < 7])',
        options: [
          'Use `a[(a > 2) & (a < 7)]`',
          'Use `a[a > 2 && a < 7]`',
          'Use `a[bool(a > 2) and bool(a < 7)]`',
          'Use `a[(a > 2) and (a < 7)]`',
        ],
        answerIndex: 0,
        explanation:
          '`and` needs one truth value per operand, which a multi-element boolean array cannot supply. The element-wise `&` with parentheses around each comparison is the correct form; Python has no `&&` operator.',
      },
      {
        id: 'NP-005-q3',
        type: 'truefalse',
        concept: 'copies',
        prompt: '`arr[arr > 0]` returns a view that shares memory with `arr`.',
        answer: false,
        explanation:
          'Boolean indexing selects arbitrary scattered positions, which no offset-and-stride description can express, so NumPy gathers the values into a new buffer. It is always a copy.',
      },
      {
        id: 'NP-005-q4',
        type: 'code-output',
        language: 'python',
        concept: 'fancy indexing shape',
        prompt: 'What is printed?',
        code: 'import numpy as np\na = np.array([10, 20, 30, 40])\nprint(a[[3, 1, 3]])',
        options: ['[40 20 40]', '[20 40]', '[10 20 40]', 'It raises an IndexError for the repeat'],
        answerIndex: 0,
        explanation:
          'Fancy indexing returns the elements at the listed positions, in the listed order, and repeats are perfectly legal. The result shape matches the index array shape, here `(3,)`.',
      },
      {
        id: 'NP-005-q5',
        type: 'debug',
        language: 'python',
        concept: 'chained assignment',
        prompt: 'After this runs, `a` is unchanged. Why?',
        code: 'import numpy as np\na = np.array([1, -2, 3, -4])\na[a < 0][0] = 0',
        options: [
          '`a[a < 0]` is a copy, so the assignment writes into a temporary that is then discarded',
          'Boolean masks are read-only in NumPy',
          'The mask selected no elements',
          'Assignment to an array element requires `.itemset`',
        ],
        answerIndex: 0,
        explanation:
          'Chained advanced indexing creates an intermediate copy, and the write lands there. Doing it in one step, `a[a < 0] = 0`, scatters the value back into the original array.',
      },
      {
        id: 'NP-005-q6',
        type: 'explain',
        concept: 'masks versus slices',
        prompt: 'Explain why `arr[1:5]` and `arr[arr > 5]` differ in whether they copy, and why `arr[arr > 5] = 0` still modifies the original.',
        rubric: [
          'Says a slice is expressible as offset plus strides, so it can be a view',
          'Says a mask selects arbitrary positions, so the values must be gathered into new memory',
          'Says assignment through a mask is a scatter into the original rather than a read',
        ],
        sampleAnswer:
          'A slice always selects regularly spaced positions, so NumPy can describe it with a starting offset and a stride and hand you a view onto the same bytes. A boolean mask can select any scattered subset, and no stride pattern describes "elements 0, 3 and 97", so reading through a mask has to copy the chosen values into a new contiguous buffer. Assignment is a different operation: `arr[arr > 5] = 0` never needs to build the selection at all, because NumPy can walk the marked positions in the original array and write into each one. That is why the read copies and the write does not.',
        explanation:
          'The examinable insight is that views are a statement about what strides can express, and that reading and writing through the same syntax are implemented quite differently.',
      },
    ],

    flashcards: [
      { front: 'How do you combine two array conditions?', back: '`(a > 2) & (a < 8)` with `&`, `|` and `~`. The keywords `and`, `or` and `not` raise a ValueError about ambiguous truth values.' },
      { front: 'Does `arr[mask]` return a view or a copy?', back: 'A copy. Scattered positions cannot be described by strides, so the values must be gathered into new memory.' },
      { front: 'Why does `arr[mask][0] = 5` do nothing?', back: 'The first indexing produces a temporary copy and the write lands there. Assign in one step: `arr[mask] = 5`.' },
      { front: 'What does `grid[[0, 2], [1, 3]]` select?', back: 'The two elements at (0, 1) and (2, 3) — integer index arrays are zipped, not crossed. Use `np.ix_` for a rectangular block.' },
      { front: 'What are the two meanings of `np.where`?', back: 'With three arguments it is an element-wise if-else; with one it returns a tuple of index arrays marking the True positions.' },
      { front: 'How do you compute accuracy in one expression?', back: '`(y_pred == y_true).mean()` — True is 1 under arithmetic, so the mean of the comparison is the correct proportion.' },
    ],

    challenge: {
      title: 'A tiny outlier report',
      brief:
        'Generate 1000 reproducible measurements from a normal distribution, then contaminate roughly 2 percent of positions with extreme values using fancy indexing. Write a report that prints: how many points lie more than three standard deviations from the mean, their indices and values, the proportion of the data they represent, and the mean before and after replacing them with the median. Use masks throughout — no Python loops over elements — and make clear in a comment which of your operations copy and which write in place.',
      language: 'python',
      acceptanceCriteria: [
        'Contamination uses integer-array indexing at randomly chosen positions from a seeded generator',
        'Outliers are found with a combined mask, not with a loop',
        'Indices come from `np.where` and values from mask indexing',
        'A comment correctly identifies at least one copying operation and one in-place operation',
      ],
      starterCode: 'import numpy as np\n\nrng = np.random.default_rng(11)\nx = rng.normal(100, 15, size=1000)\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how to filter a NumPy array by value, and warn them about the two traps: combining conditions and the copy.',
      mustCover: [
        'A comparison on an array returns a boolean array of the same shape, not one True or False',
        'Indexing with that mask selects the matching elements as a flat array',
        'Conditions combine with `&`, `|` and `~`, each wrapped in parentheses',
        'Mask selection copies, so assignment must be done in one indexing step',
      ],
      bonusSignals: ['mentions that True counts as 1, so `mask.sum()` counts and `mask.mean()` is a proportion', 'mentions applying a mask built from one array to another', 'contrasts with slicing views'],
      sampleExplanation:
        'When you compare a whole array, you do not get one answer — you get one answer per element. `scores > 70` on six scores returns six booleans, and that array of booleans is called a mask. Put it in the brackets and NumPy hands back just the elements whose mask entry was True: `scores[scores > 70]`. Because True is 1 in arithmetic, `mask.sum()` counts the matches and `mask.mean()` gives the proportion, which is how accuracy gets written as a single expression. Two traps. First, combining conditions needs the element-wise operators with parentheses, `(a > 2) & (a < 8)`; the words `and` and `or` demand a single yes or no and an array of eight booleans has none, so you get an ambiguous-truth-value error. Second, reading through a mask copies the selected values, so `a[a < 0][0] = 0` writes into a temporary and silently changes nothing. Do it in one step instead, `a[a < 0] = 0`, and NumPy writes straight back into the original array.',
    },
  },

  {
    id: 'NP-006',
    domain: 'NP',
    module: 'Broadcasting & Vectorisation',
    topic: 'Vectorised thinking',
    title: 'Vectorisation: Replacing Loops',
    slug: 'vectorisation',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['NP-002'],
    related: ['NP-004', 'NP-005'],
    tags: ['vectorisation', 'ufunc', 'performance', 'timing', 'where', 'in-place'],

    learningObjectives: [
      'Rewrite an element-wise Python loop as a single array expression',
      'Explain what a ufunc is and why the loop inside it is faster than the loop you wrote',
      'Measure a vectorisation speed-up honestly with `timeit` and interpret the result',
      'Recognise the cases where vectorisation does not apply, and why `np.vectorize` is not a speed tool',
    ],

    terminology: [
      {
        term: 'Vectorisation',
        definition:
          'Expressing a computation as whole-array operations so the element loop executes in compiled code rather than in the Python interpreter.',
        simple: 'Writing "do this to everything" instead of writing the loop yourself.',
      },
      {
        term: 'ufunc',
        definition:
          'A universal function: a compiled element-wise operation such as `np.add`, `np.sqrt` or `np.exp`, which handles broadcasting, dtype promotion and an optional `out` argument.',
        simple: 'A built-in NumPy operation that applies itself to every element for you.',
      },
      {
        term: 'Temporary array',
        definition:
          'An intermediate result allocated during a compound expression. `a*b + c` allocates one array for `a*b` before adding `c`.',
        simple: 'A scratch array NumPy makes part-way through a calculation.',
      },
      {
        term: 'In-place operation',
        definition:
          'An operation that writes its result into existing memory, via `+=`, `*=` or the `out=` argument, avoiding a new allocation.',
        simple: 'Updating the array you already have instead of making a new one.',
      },
      {
        term: 'SIMD',
        definition:
          'Single Instruction Multiple Data: CPU instructions that apply one operation to several adjacent values at once. Contiguous arrays let the compiler use them.',
        simple: 'Hardware that adds four or eight numbers in the time it used to take to add one.',
      },
    ],

    simpleExplanation:
      'Vectorisation is the habit of describing what should happen to a whole array instead of walking it yourself. If you want every element squared, you do not write a `for` loop that squares one element at a time; you write `arr ** 2` and let NumPy do the walking. The result is identical, and the speed is not remotely identical, because your loop runs in the Python interpreter — which checks types, builds objects and manages the loop on every single element — while NumPy loop runs in compiled C over typed contiguous memory, with none of that overhead and often with hardware instructions that handle several numbers at once. The mental shift takes a little practice. Conditions become masks, so `if x < 0: x = 0` inside a loop becomes `arr[arr < 0] = 0` or `np.where(arr < 0, 0, arr)` over the whole array. Accumulations become `sum`, `cumsum` or a dot product. Once the habit forms, vectorised code turns out to be shorter and easier to read as well as far faster, which is why it is the house style of every numerical library you will use.',

    whyItExists:
      'A Python-level loop pays interpreter overhead on every element, which makes numerical code one to two orders of magnitude slower than it needs to be, and that gap decides whether an experiment takes a minute or an afternoon. Vectorisation exists so that the loop can live in compiled code while the intent stays readable at the Python level, and it is also what lets the same expressions be dispatched later to a GPU.',

    analogy: {
      scenario:
        'Imagine you run a print shop and need a thousand identical flyers. One option is to take one sheet to the machine, set the paper size, choose the tray, press start, collect it, and repeat a thousand times. The other is to load the whole ream, set everything once, and press start once. The machine itself prints at the same speed either way — what disappears in the second version is the setup you were repeating a thousand times over.',
      mapping: [
        { from: 'Setting the paper size and tray for each sheet', to: 'Per-element type check, dispatch and object allocation in a Python loop' },
        { from: 'Loading the whole ream at once', to: 'Passing the entire array to a ufunc in one call' },
        { from: 'Paying the setup exactly once', to: 'Dispatch overhead amortised over every element in the array' },
        { from: 'The machine printing at its own fixed speed', to: 'The compiled C inner loop, which is the irreducible cost' },
        { from: 'A job with only three sheets, where setup dominates', to: 'Small arrays, where per-call NumPy overhead can make vectorisation slower' },
      ],
      bridge:
        'The analogy predicts the right things. It explains why the speed-up is a constant factor and not an algorithmic one — both approaches print a thousand sheets — and it explains why vectorising a three-element array is pointless, since you cannot amortise setup over three sheets. It also explains the one real cost: loading the whole ream means the whole ream must be in the machine, which is exactly the memory pressure of compound array expressions that allocate temporaries.',
      limitations:
        'The picture suggests every job can be batched. Some genuinely cannot: an iteration whose step depends on the previous result, such as a recurrence or an optimiser inner loop, has no whole-array form, and the right answer there is a compiled tool like Numba rather than a contorted NumPy expression.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'The same computation, two ways of expressing it',
        caption: 'Both perform n multiplications. Only one of them also performs n type checks and n allocations.',
        left: {
          heading: 'Loop — what the interpreter does',
          points: [
            '`out = [x * x for x in lst]`',
            'Fetch the next pointer, follow it',
            'Check what type the object is',
            'Dispatch to that type multiply',
            'Allocate a new object for the result',
            'Repeat all five steps n times',
          ],
        },
        right: {
          heading: 'Vectorised — what NumPy does',
          points: [
            '`out = arr * arr`',
            'Check dtypes and shapes once',
            'Allocate one output buffer once',
            'Run a compiled loop over raw values',
            'Use SIMD where the CPU allows',
            'Return one array object',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Loop patterns and their vectorised forms',
        caption: 'Translating each pattern by eye is the practical skill this unit builds.',
        columns: ['Loop version', 'Vectorised version', 'Note'],
        rows: [
          ['`for x in a: out.append(x + 1)`', '`a + 1`', 'A scalar operand applies to every element'],
          ['`for i in range(n): c[i] = a[i] * b[i]`', '`c = a * b`', 'Element-wise, shapes must match or broadcast'],
          ['`total = 0` then `total += x`', '`a.sum()`', 'Compiled reduction, also pairwise-accurate'],
          ['`if x < 0: y = 0 else: y = x`', '`np.where(a < 0, 0, a)`', 'Element-wise if-else over the whole array'],
          ['`if x < 0: x = 0` in place', '`a[a < 0] = 0`', 'Scatter assignment, no new array'],
          ['`math.sqrt(x)` per element', '`np.sqrt(a)`', '`math` functions take scalars only'],
          ['`s = 0` then `s += a[i]*b[i]`', '`a @ b`', 'Dot product, dispatched to optimised BLAS'],
        ],
      },
      {
        kind: 'flow',
        title: 'How to vectorise a loop you already have',
        caption: 'A repeatable procedure rather than a flash of insight.',
        steps: [
          { label: 'Find the loop body', detail: 'Write down exactly what happens to one element, ignoring the loop machinery.' },
          { label: 'Ask whether it depends on previous iterations', detail: 'If it does, look for `cumsum`, `diff` or a compiled tool; if not, it vectorises directly.' },
          { label: 'Replace conditions with masks', detail: 'Every `if` becomes a boolean array used with `np.where` or with masked assignment.' },
          { label: 'Replace accumulators with reductions', detail: '`sum`, `mean`, `max`, `cumsum`, `@` — one call instead of a running variable.' },
          { label: 'Check correctness first, then speed', detail: 'Compare against the loop with `np.allclose`, then time both with `timeit`.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Race a loop against an array expression',
        caption: 'Run both versions on increasing sizes and watch the ratio grow.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'Vectorisation is the expression of an element-wise computation as a call to a universal function, which applies a compiled scalar kernel across entire arrays under a single Python-level dispatch. A ufunc handles broadcasting, dtype promotion, optional `out` buffers and reduction methods such as `.reduce` and `.accumulate`. The asymptotic complexity is unchanged; the gain is the elimination of per-element interpreter overhead, augmented by cache locality and SIMD.',

    math: {
      intuition:
        'Vectorised notation is really just mathematical notation. When a statistician writes a formula over a vector, they do not write a loop either — and the NumPy expression usually looks like the formula, one symbol at a time.',
      formulas: [
        {
          latex: '(f(\\mathbf{x}))_i = f(x_i) \\quad \\text{for } i = 0, \\ldots, n-1',
          name: 'Element-wise application',
          meaning: 'A ufunc applies a scalar function independently at every position, which is exactly what a loop with no cross-element dependency does.',
          variables: [
            { symbol: '\\mathbf{x}', meaning: 'The input array' },
            { symbol: 'f', meaning: 'The scalar kernel, such as square root or exponential' },
            { symbol: 'i', meaning: 'Element position; independence across i is what makes vectorisation possible' },
          ],
        },
        {
          latex: 'z_i = \\frac{x_i - \\mu}{\\sigma}, \\qquad \\mu = \\frac{1}{n}\\sum_i x_i, \\qquad \\sigma = \\sqrt{\\frac{1}{n}\\sum_i (x_i - \\mu)^2}',
          name: 'Standardisation, written as NumPy writes it',
          meaning: 'The whole formula becomes `(x - x.mean()) / x.std()`: two reductions and two element-wise operations, no loop anywhere.',
          variables: [
            { symbol: 'x_i', meaning: 'Original value at position i' },
            { symbol: '\\mu', meaning: 'Mean of the array, a reduction over all elements' },
            { symbol: '\\sigma', meaning: 'Standard deviation, a second reduction' },
            { symbol: 'z_i', meaning: 'Standardised value with mean 0 and standard deviation 1' },
          ],
          category: 'statistics',
        },
        {
          latex: 'S = \\frac{T_{\\text{loop}}}{T_{\\text{vec}}} \\approx \\frac{c_{\\text{py}} + c_{\\text{flop}}}{c_{\\text{flop}} + \\frac{c_{\\text{call}}}{n}}',
          name: 'Why the speed-up grows with n and then plateaus',
          meaning: 'Fixed per-call overhead is divided by n, so vectorisation loses on tiny arrays, improves rapidly, and finally saturates at the ratio of per-element costs.',
          variables: [
            { symbol: 'S', meaning: 'Observed speed-up factor' },
            { symbol: 'c_{\\text{py}}', meaning: 'Per-element interpreter overhead in the loop version' },
            { symbol: 'c_{\\text{flop}}', meaning: 'Per-element cost of the arithmetic itself' },
            { symbol: 'c_{\\text{call}}', meaning: 'Fixed cost of one NumPy call: dispatch, shape checks, allocation' },
            { symbol: 'n', meaning: 'Number of elements' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'A Python loop costs roughly n * (c_py + c_flop), since every element pays interpreter overhead as well as the arithmetic.',
        'A NumPy call costs roughly c_call + n * c_flop, since the overhead is paid once for the whole array.',
        'Dividing gives the speed-up expression above, whose behaviour is easy to read off.',
        'When n is small, c_call/n dominates the denominator and the ratio can fall below 1 — vectorising is a loss.',
        'As n grows, c_call/n vanishes and S approaches (c_py + c_flop) / c_flop, which for typical Python is somewhere between 10 and 100.',
        'Past the point where the arrays exceed cache, both versions become memory-bound and the ratio stops improving — which is why very large arrays sometimes show a smaller speed-up than medium ones.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The same job three ways, timed',
        runnable: true,
        code: `import numpy as np
import timeit

n = 1_000_000
rng = np.random.default_rng(0)
arr = rng.random(n)
lst = arr.tolist()

def with_loop():
    out = []
    for x in lst:
        out.append(x * x + 1)
    return out

def with_comprehension():
    return [x * x + 1 for x in lst]

def vectorised():
    return arr * arr + 1

for name, fn in [("for loop", with_loop),
                 ("comprehension", with_comprehension),
                 ("vectorised", vectorised)]:
    t = min(timeit.repeat(fn, number=1, repeat=5))
    print(f"{name:<15} {t*1000:8.1f} ms")

print("same answer?", np.allclose(vectorised(), with_comprehension()))`,
        output: `for loop          128.4 ms
comprehension      96.7 ms
vectorised          3.1 ms
same answer? True`,
        explanation:
          'Two disciplines are on display here as much as the result. Use `min(timeit.repeat(...))` rather than a single measurement, because timings are noisy upward and the minimum is the least contaminated estimate. And always confirm the answers agree with `np.allclose` before quoting a speed-up: a rewrite that is fast and wrong is easy to produce and easy to believe.',
      },
      {
        language: 'python',
        title: 'Translating control flow into array expressions',
        runnable: true,
        code: `import numpy as np

x = np.array([-2.0, -0.5, 0.0, 1.5, 3.0])

# if x < 0 then 0 else x  (ReLU)
print(np.where(x < 0, 0.0, x))
print(np.maximum(x, 0.0))

# Piecewise: -1 below, +1 above, 0 in the middle
print(np.where(x < -1, -1, np.where(x > 1, 1, 0)))

# Clamp into a range
print(np.clip(x, -1.0, 1.0))

# A full sigmoid, written as the formula reads
print(np.round(1 / (1 + np.exp(-x)), 3))

# Running totals without a loop
print(np.cumsum(np.array([3, 1, 4, 1, 5])))`,
        output: `[0.  0.  0.  1.5 3. ]
[0.  0.  0.  1.5 3. ]
[-1  0  0  0  1]
[-1.  -0.5  0.   1.   1. ]
[0.119 0.378 0.5   0.818 0.953]
[ 3  4  8  9 14]`,
        explanation:
          'Every `if` in an element loop has an array form. Simple comparisons against a constant are often best written with `np.maximum` or `np.clip`, which are clearer than a nested `np.where`. The sigmoid line is the point of the whole unit: the code and the mathematical formula are the same shape, with no loop between them. And `cumsum` shows that even a computation with a dependency on previous elements can be vectorised when NumPy provides the right primitive.',
      },
      {
        language: 'python',
        title: 'Temporaries, in-place operations and out=',
        runnable: true,
        code: `import numpy as np

a = np.ones(5_000_000)
b = np.full(5_000_000, 2.0)

# Each operator allocates a new 40 MB array
c = a * b + a          # two temporaries created

# In-place: no new allocation at all
d = a.copy()
d *= b
d += a
print(np.allclose(c, d))

# out= gives the same control with explicit destinations
buf = np.empty_like(a)
np.multiply(a, b, out=buf)
np.add(buf, a, out=buf)
print(np.allclose(c, buf), buf[:3])`,
        output: `True
True [3. 3. 3.]`,
        explanation:
          'A compound expression such as `a * b + a` is evaluated operator by operator, so it allocates an intermediate array for `a * b` before adding. On 40 MB arrays that is real memory traffic. The in-place forms `*=` and `+=`, and the explicit `out=` argument that every ufunc accepts, reuse an existing buffer instead. Reach for these when arrays are large or a loop runs many times, not as a default — they make code harder to read and can silently mutate an array someone else is holding.',
      },
      {
        language: 'python',
        title: 'What np.vectorize is, and is not',
        runnable: true,
        code: `import numpy as np
import timeit

def scalar_score(x):
    return x * x + 1 if x > 0 else -x

v = np.vectorize(scalar_score)
arr = np.random.default_rng(1).normal(size=200_000)

def via_vectorize():
    return v(arr)

def truly_vectorised():
    return np.where(arr > 0, arr * arr + 1, -arr)

print("np.vectorize :", f"{min(timeit.repeat(via_vectorize, number=1, repeat=3))*1000:7.1f} ms")
print("array expr   :", f"{min(timeit.repeat(truly_vectorised, number=1, repeat=3))*1000:7.1f} ms")
print("equal?", np.allclose(via_vectorize(), truly_vectorised()))`,
        output: `np.vectorize :    58.3 ms
array expr   :     1.4 ms
equal? True`,
        explanation:
          '`np.vectorize` is a convenience wrapper, not an optimisation: the documentation says so explicitly, and it is essentially a Python loop with broadcasting rules attached. It is useful when you have a scalar function you cannot rewrite and you want it to accept arrays and broadcast properly. If speed is the goal, express the logic with masks and ufuncs as the second function does, or reach for Numba or Cython when the logic genuinely resists that.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature scaling before training',
        usage:
          '`X_scaled = (X - X.mean(axis=0)) / X.std(axis=0)` standardises a million-row matrix in a fraction of a second. The loop version is around fifty lines and several minutes.',
      },
      {
        context: 'Computing a loss over a batch',
        usage:
          'Mean squared error is `((y_pred - y_true) ** 2).mean()`. Every deep learning framework writes its losses this way, which is why the same expression transfers unchanged to PyTorch tensors.',
      },
      {
        context: 'Image preprocessing',
        usage:
          'Converting a `uint8` image to normalised floats is `img.astype(np.float32) / 255.0` — six million elements, one expression, no loop, and the operation is memory-bound rather than compute-bound.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: 'Series operations are vectorised NumPy underneath; `df.apply` with a Python function is the `np.vectorize` trap in another costume.' },
      { tool: 'PyTorch', role: 'Tensor expressions are vectorised in exactly this sense, which is what allows them to be dispatched to a GPU kernel.' },
      { tool: 'Numba', role: 'The escape hatch for genuinely sequential loops: a decorator that compiles a Python loop to machine code when no array form exists.' },
    ],

    commonMistakes: [
      {
        mistake: 'Looping over an array in Python: `for i in range(len(arr)): arr[i] = arr[i] * 2`',
        why: 'This keeps every cost vectorisation was meant to remove, and adds one: each `arr[i]` boxes a NumPy scalar into a Python object, so it can be slower than the same loop over a plain list.',
        fix: 'Write `arr *= 2`. If you find yourself indexing an array inside a Python loop, treat it as a signal to look for the array expression.',
      },
      {
        mistake: 'Reaching for `np.vectorize` to make a slow function fast',
        why: 'It is a broadcasting convenience wrapper implemented with a Python loop, so it delivers essentially no speed-up. The name is genuinely misleading.',
        fix: 'Rewrite the logic with masks, `np.where` and ufuncs. If the logic cannot be expressed that way, compile it with Numba rather than wrapping it.',
      },
      {
        mistake: 'Calling `math.sqrt` or `math.exp` on an array',
        why: 'The `math` module works on single numbers, so it raises `TypeError: only length-1 arrays can be converted to Python scalars`, or silently works on a one-element array and misleads you.',
        fix: 'Use the NumPy equivalents — `np.sqrt`, `np.exp`, `np.log` — which are ufuncs and apply element-wise.',
      },
      {
        mistake: 'Quoting a speed-up without checking the results match',
        why: 'Vectorised rewrites frequently change edge-case behaviour: integer division, overflow, or the handling of empty arrays and NaN. A fast wrong answer is worse than a slow right one.',
        fix: 'Assert `np.allclose(new, old)` on realistic data, including the edge cases, before replacing the original implementation.',
      },
      {
        mistake: 'Vectorising a loop with a genuine sequential dependency',
        why: 'When each step needs the previous result, as in an exponential moving average or an optimiser update, no element-wise form exists, and contorted attempts often build enormous intermediate arrays.',
        fix: 'Look first for a built-in that encodes the dependency — `np.cumsum`, `np.cumprod`, `np.diff`, `scipy.signal.lfilter` — and otherwise use Numba to compile the honest loop.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does vectorisation mean in NumPy, and why is it faster?',
        answer:
          'It means expressing an operation over a whole array in one call, such as `a * b`, rather than looping over the elements in Python. It is faster because the per-element costs of the interpreter — following a pointer, checking the type, dispatching the operation, allocating a result object — are paid once for the entire call instead of once per element, leaving a compiled C loop over contiguous typed memory that the CPU can prefetch and often run with SIMD instructions. The complexity is identical; the constant factor typically improves by ten to a hundred times.',
        followUp:
          'A strong answer adds that the speed-up is small or negative for tiny arrays, because the fixed per-call overhead cannot be amortised.',
      },
      {
        level: 'intermediate',
        question: 'When is vectorisation the wrong tool?',
        answer:
          'Three situations. First, genuine sequential dependencies — an exponential moving average, a Kalman filter, an optimiser inner loop — where each step needs the previous result and no element-wise form exists; there the answer is a built-in like `cumsum` if one fits, or Numba. Second, very small arrays, where a few microseconds of NumPy dispatch overhead exceeds the whole computation. Third, memory-bound compound expressions over arrays too large for RAM, where each operator allocates a full-size temporary; there I would use in-place operations, `out=` buffers, or chunk the work. It is also worth saying that clarity counts: a loop over ten configuration items is fine and does not need rewriting.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you demonstrate to a sceptical colleague that a vectorised rewrite is worth merging?',
        answer:
          'I would benchmark both implementations on realistic input sizes, not a toy example, using `min(timeit.repeat(...))` so the figure is the cleanest of several runs rather than one noisy sample, and I would show the curve across several sizes so the crossover is visible. Alongside the timing I would prove equivalence with `np.allclose` on real data plus deliberate edge cases — empty input, NaN, values that would overflow — because the risk in a rewrite is behaviour change, not slowness. Then I would state the impact in terms the team cares about: the epoch time, the job cost, or the latency budget. If the speed-up is a few percent on code that runs once, I would argue against merging it, because the readability cost is real.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Rewrite this as a single array expression:\n\n```\nout = []\nfor x in data:\n    if x > 0:\n        out.append(x ** 0.5)\n    else:\n        out.append(0.0)\n```',
        hint: 'The `if` becomes a mask. Be careful that the square root is not evaluated on negative numbers in a way that warns.',
        language: 'python',
        solution:
          'import numpy as np\nout = np.where(data > 0, np.sqrt(np.maximum(data, 0)), 0.0)\n\nThe inner `np.maximum(data, 0)` matters: `np.where` evaluates both branches fully before selecting, so a bare `np.sqrt(data)` would compute the square root of negative values and emit `RuntimeWarning: invalid value encountered in sqrt`. Clamping first keeps the input valid everywhere. An equally good answer is `np.sqrt(np.clip(data, 0, None))`, since the clipped negatives produce 0.0 anyway.',
      },
      {
        prompt: 'Compute the Euclidean distance between two 1-D arrays `a` and `b` without a loop, and state which NumPy functions you used and why.',
        hint: 'Difference, square, sum, square root — or one function that does all four.',
        solution:
          'import numpy as np\nd = np.sqrt(((a - b) ** 2).sum())\n# or, more directly:\nd = np.linalg.norm(a - b)\n\n`a - b` is one element-wise ufunc call, `** 2` another, `.sum()` a compiled reduction, and `np.sqrt` a scalar square root at the end. `np.linalg.norm` expresses the same thing in one call and is the clearer choice in real code. Both are O(n) with a single pass over memory and no Python-level loop.',
      },
      {
        prompt: 'Benchmark `arr.sum()` against `sum(arr)` on a one-million-element array and explain the result. Which is the trap?',
        hint: 'What does the built-in `sum` do with each element it pulls out of a NumPy array?',
        language: 'python',
        solution:
          "import numpy as np, timeit\narr = np.random.default_rng(0).random(1_000_000)\nprint(min(timeit.repeat(lambda: arr.sum(), number=10, repeat=3)))   # ~0.004 s\nprint(min(timeit.repeat(lambda: sum(arr), number=10, repeat=3)))    # ~0.9 s\n\nThe built-in `sum` iterates the array in Python and boxes each element into a `np.float64` scalar object before adding it, so it is roughly two hundred times slower. `arr.sum()` runs a compiled pairwise reduction that never leaves the buffer, and it is more numerically accurate for the same reason. Using the built-in on an array is one of the most common accidental de-optimisations there is.",
      },
    ],

    quiz: [
      {
        id: 'NP-006-q1',
        type: 'mcq',
        concept: 'why vectorisation is fast',
        prompt: 'What is the primary reason `arr * 2` beats a Python loop doing the same multiplications?',
        options: [
          'The per-element interpreter overhead is paid once per call instead of once per element',
          'NumPy uses a multiplication algorithm with lower time complexity',
          'NumPy automatically parallelises across all CPU cores',
          'The loop version performs more multiplications overall',
        ],
        answerIndex: 0,
        explanation:
          'Both do n multiplications. The saving is the elimination of per-element type checks, dispatch and object allocation, aided by cache locality and SIMD inside the compiled loop.',
      },
      {
        id: 'NP-006-q2',
        type: 'truefalse',
        concept: 'np.vectorize',
        prompt: '`np.vectorize(f)` compiles the Python function `f` into a fast compiled loop.',
        answer: false,
        explanation:
          'It is a broadcasting convenience wrapper implemented with a Python loop, and the NumPy documentation states that it is not provided for performance. Real speed needs ufuncs or a compiler such as Numba.',
      },
      {
        id: 'NP-006-q3',
        type: 'code-output',
        language: 'python',
        concept: 'vectorised conditionals',
        prompt: 'What does this print?',
        code: 'import numpy as np\nx = np.array([-2, 0, 3])\nprint(np.where(x > 0, x * 10, -1))',
        options: ['[-1 -1 30]', '[-20   0  30]', '[-1  0 30]', '[ 0  0 30]'],
        answerIndex: 0,
        explanation:
          'The condition is True only at the last element, so it takes 3 * 10 = 30 there and -1 at the other two positions. Both branches are evaluated in full before the selection is made.',
      },
      {
        id: 'NP-006-q4',
        type: 'order',
        concept: 'vectorising a loop',
        prompt: 'Put these steps of converting a loop to vectorised code into a sensible order.',
        items: [
          'Write down what the loop body does to a single element',
          'Check whether any step depends on a previous iteration',
          'Replace conditions with boolean masks or np.where',
          'Replace running accumulators with reductions such as sum or cumsum',
          'Verify equality against the original with np.allclose',
          'Benchmark both versions with min(timeit.repeat(...))',
        ],
        explanation:
          'Understand the body, rule out sequential dependencies, translate control flow and accumulation, then prove correctness before measuring speed. Benchmarking an incorrect rewrite is wasted effort.',
      },
      {
        id: 'NP-006-q5',
        type: 'debug',
        language: 'python',
        concept: 'math versus numpy',
        prompt: 'This raises `TypeError: only length-1 arrays can be converted to Python scalars`. What is the fix?',
        code: 'import numpy as np\nimport math\narr = np.array([1.0, 4.0, 9.0])\nprint(math.sqrt(arr))',
        options: [
          'Use `np.sqrt(arr)`, which is a ufunc and applies element-wise',
          'Convert with `math.sqrt(list(arr))`',
          'Wrap it as `math.sqrt(arr.sum())`',
          'Cast the array to float32 first',
        ],
        answerIndex: 0,
        explanation:
          'The `math` module operates on single numbers only. NumPy supplies element-wise equivalents such as `np.sqrt`, `np.exp` and `np.log` that accept whole arrays.',
      },
      {
        id: 'NP-006-q6',
        type: 'multi',
        concept: 'limits of vectorisation',
        prompt: 'In which situations is vectorising unlikely to help? Select all that apply.',
        options: [
          'Arrays of three or four elements',
          'A recurrence where each value depends on the previous one',
          'Element-wise arithmetic on a million-row array',
          'A loop that runs exactly once over a configuration list',
          'Applying `np.exp` to a large float array',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Tiny arrays cannot amortise the per-call overhead, genuine sequential dependencies have no element-wise form, and a one-off loop over a handful of items is not a bottleneck. The other two are exactly what vectorisation is for.',
      },
    ],

    flashcards: [
      { front: 'What is vectorisation?', back: 'Expressing an operation over a whole array in one call so the element loop runs in compiled C, not in the Python interpreter.' },
      { front: 'What is a ufunc?', back: 'A compiled element-wise NumPy function such as `np.add` or `np.exp`, which also handles broadcasting, dtype promotion and an optional `out=` buffer.' },
      { front: 'Does `np.vectorize` make code fast?', back: 'No. It is a broadcasting convenience wrapper around a Python loop. Use masks and ufuncs, or Numba, for real speed.' },
      { front: 'How do you vectorise an if-else?', back: '`np.where(cond, a, b)` for a new array, or `arr[mask] = value` to modify in place. Both branches of `np.where` are fully evaluated.' },
      { front: 'Why is `sum(arr)` much slower than `arr.sum()`?', back: 'The built-in iterates in Python and boxes each element into a scalar object; `arr.sum()` is a compiled reduction that never leaves the buffer.' },
      { front: 'How should you benchmark a rewrite?', back: '`min(timeit.repeat(fn, number=1, repeat=5))` on realistic sizes, and only after `np.allclose` confirms the answers match.' },
    ],

    challenge: {
      title: 'Devectorise, then revectorise',
      brief:
        'Take the standardisation formula `(X - X.mean(axis=0)) / X.std(axis=0)` for a matrix of shape `(200000, 10)`. First write the honest nested Python loop that computes it, including computing the column means and standard deviations by hand. Then write the vectorised version. Prove with `np.allclose` that they agree to within floating-point tolerance, benchmark both with `min(timeit.repeat(...))`, and print the speed-up. Finally add a short comment explaining why the two results are close but not bitwise identical.',
      language: 'python',
      acceptanceCriteria: [
        'The loop version computes means and standard deviations itself, without calling array reductions',
        'Both versions are benchmarked on the same data with a repeated-minimum timing',
        '`np.allclose` is used to establish equivalence rather than `==`',
        'A comment explains that summation order changes the floating-point result slightly',
      ],
      starterCode: 'import numpy as np\nimport timeit\n\nrng = np.random.default_rng(3)\nX = rng.normal(size=(200_000, 10))\n',
    },

    teachingPrompt: {
      prompt:
        'A colleague writes Python loops over NumPy arrays and asks why everyone keeps telling them to vectorise. Explain the idea, the mechanism, and the limits.',
      mustCover: [
        'Vectorising means describing the operation over the whole array in one call',
        'The speed comes from moving the per-element loop into compiled C, not from a better algorithm',
        'Conditions become masks or `np.where`, and accumulators become reductions',
        'It does not help for tiny arrays or for genuinely sequential computations',
      ],
      bonusSignals: ['mentions that `np.vectorize` is not a speed tool', 'mentions verifying with np.allclose before quoting a speed-up', 'mentions SIMD or cache locality'],
      sampleExplanation:
        'Vectorising means saying what should happen to the whole array rather than walking it yourself: `arr * 2` instead of a loop that doubles one element at a time. The arithmetic is identical, so this is not a cleverer algorithm — both do n multiplications. What changes is everything around the arithmetic. In your loop, every element costs a pointer chase, a type check, a dispatch and a fresh Python object for the result, and that overhead is typically far larger than the multiplication itself. In the array version those costs are paid once for the whole call, leaving a compiled loop over contiguous typed memory that the processor can prefetch and often handle several numbers at a time. In practice that is ten to a hundred times faster. The translation is mechanical once you have seen it: an `if` becomes a mask or `np.where`, a running total becomes `.sum()` or `.cumsum()`, and a scalar function like `math.exp` becomes the ufunc `np.exp`. It is not universal, though. On three elements the overhead of a NumPy call dominates and the loop wins, and when each step genuinely depends on the previous one there is no whole-array form at all — that is when you reach for a built-in like `cumsum`, or compile the honest loop with Numba.',
    },
  },

  {
    id: 'NP-007',
    domain: 'NP',
    module: 'Broadcasting & Vectorisation',
    topic: 'Broadcasting',
    title: 'Broadcasting Rules',
    slug: 'broadcasting-rules',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['NP-006'],
    related: ['NP-002', 'NP-004'],
    tags: ['broadcasting', 'shapes', 'newaxis', 'ValueError', 'column-vector', 'outer'],

    learningObjectives: [
      'State the broadcasting rules precisely and apply them to any pair of shapes',
      'Predict the output shape of an operation, or correctly predict that it will raise',
      'Read and fix the error message "operands could not be broadcast together with shapes ..."',
      'Use `np.newaxis` and `reshape` deliberately to make two arrays meet, and avoid the `(n,)` versus `(n, 1)` trap',
    ],

    terminology: [
      {
        term: 'Broadcasting',
        definition:
          'The rule set by which NumPy makes arrays of different shapes compatible for element-wise operations, by virtually repeating size-1 axes without copying data.',
        simple: 'How NumPy lets a small array team up with a big one without you writing it out.',
      },
      {
        term: 'Trailing-dimension alignment',
        definition:
          'Shapes are compared from the rightmost axis leftwards, and the shorter shape is padded on the left with axes of length 1.',
        simple: 'Line the shapes up at the right-hand end, not the left.',
      },
      {
        term: 'Compatible axes',
        definition:
          'Two axes broadcast if they are equal, or if one of them is 1. Any other pair is an error — NumPy never resizes a length-3 axis to length 4.',
        simple: 'Same length, or one of them is a single value that gets reused.',
      },
      {
        term: 'Stretching',
        definition:
          'A size-1 axis is reused along its whole length by setting that stride to 0, so no memory is actually duplicated.',
        simple: 'Reading the same value over and over instead of making copies of it.',
      },
      {
        term: 'np.newaxis',
        definition:
          'An alias for `None` used inside brackets to insert a new axis of length 1, turning shape `(n,)` into `(n, 1)` or `(1, n)`.',
        simple: 'A way to add an extra empty direction so shapes line up how you want.',
      },
    ],

    simpleExplanation:
      "You have already relied on broadcasting without naming it. When you wrote `arr + 1`, the 1 was not turned into an array of a million ones — NumPy simply reused that single value at every position. Broadcasting is the general version of that trick, and it follows a rule you can apply by hand in a few seconds. Write the two shapes down, right-aligned, and pad the shorter one on the left with 1s. Then compare each column: if the two numbers are equal, fine; if one of them is 1, that side is stretched to match the other; if neither is true, NumPy refuses and raises an error. The result takes the larger number from each column. So `(3, 4)` with `(4,)` becomes `(3, 4)` with `(1, 4)`, which works, and each of the three rows gets the same four values added. But `(3, 4)` with `(3,)` right-aligns as `(3, 4)` against `(1, 3)`, and 4 against 3 is neither equal nor 1, so it fails. That is the whole rule, and the entire art is knowing that a one-dimensional array of length n aligns at the right-hand end, which is why it behaves like a row and not like a column.",

    whyItExists:
      'Element-wise operations need matching shapes, but the useful cases almost never match exactly: subtract a per-column mean from every row, scale each row by its own weight, add a bias vector to a batch of activations. Without broadcasting each of these would require materialising a full-size copy of the small array, wasting memory and bandwidth, or writing an explicit loop. Broadcasting expresses the intent directly and implements it by setting a stride to zero, so nothing is copied at all.',

    analogy: {
      scenario:
        'Think of a spreadsheet where you want to apply a discount to a table of prices. If you have one discount per column, you write it in a single row above the table and drag it down: every row uses that same header row. If you have one discount per customer, you write it in a single column beside the table and drag it across. What you never do is take a column of three discounts and try to apply it across four columns of prices — the person asking for that has not decided which direction they meant.',
      mapping: [
        { from: 'A single header row dragged down the table', to: 'Shape `(1, 4)` broadcast against `(3, 4)`, stretched along axis 0' },
        { from: 'A single column dragged across the table', to: 'Shape `(3, 1)` broadcast against `(3, 4)`, stretched along axis 1' },
        { from: 'Dragging does not duplicate the numbers you typed', to: 'Stretching sets the stride to 0; no memory is copied' },
        { from: 'Three discounts against four columns', to: 'Shapes `(3,)` and `(3, 4)` — a ValueError, because 3 and 4 are neither equal nor 1' },
        { from: 'Being asked to decide "down or across?"', to: 'The `(n,)` versus `(n, 1)` decision, made explicit with `np.newaxis`' },
      ],
      bridge:
        'Dragging a formula is broadcasting: the single row or column is reused along the direction it is missing. The part the spreadsheet hides is which direction a bare list of numbers means, and NumPy has to make that unambiguous. Its answer is trailing alignment: a plain `(n,)` array is padded on the left, so it always behaves like a row. If you meant a column you must say so, with `(n, 1)`, and that single decision is behind a large fraction of all NumPy bugs.',
      limitations:
        'The spreadsheet picture makes broadcasting look like copying the values out. It is not: a stretched axis has a stride of zero, so the same bytes are read repeatedly. That is why broadcasting is free in memory, and also why an accidental broadcast between `(n, 1)` and `(n,)` can silently produce an n-by-n array large enough to exhaust RAM.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'The rule, applied by hand',
        caption: 'Right-align, pad with 1s, then compare column by column.',
        art: `WORKS: (3, 4) + (4,)              WORKS: (3, 4) + (3, 1)

      3   4                             3   4
          4   <- padded to (1, 4)       3   1
      -----                             -----
      3   4   result                    3   4   result
          ^ 4 == 4                           ^ 1 stretches to 4
      ^ 1 stretches to 3                 ^ 3 == 3


FAILS: (3, 4) + (3,)               WORKS: (3, 1) + (4,)

      3   4                             3   1
          3   <- padded to (1, 3)           4   <- padded to (1, 4)
      -----                             -----
      ?   X   4 vs 3: not equal,        3   4   result (an outer grid)
              neither is 1                  ^ 1 stretches to 4
                                        ^ 1 stretches to 3
ValueError: operands could not be
broadcast together with shapes (3,4) (3,)`,
      },
      {
        kind: 'table',
        title: 'Worked shape examples, including the ones that fail',
        caption: 'Work each row out yourself before reading the result column.',
        columns: ['Shape A', 'Shape B', 'Result', 'Why'],
        rows: [
          ['`(3, 4)`', '`()` scalar', '`(3, 4)`', 'A scalar broadcasts against anything'],
          ['`(3, 4)`', '`(4,)`', '`(3, 4)`', 'Padded to `(1, 4)`; the 1 stretches to 3'],
          ['`(3, 4)`', '`(3, 1)`', '`(3, 4)`', '3 matches 3; the 1 stretches to 4'],
          ['`(3, 4)`', '`(3,)`', 'ValueError', 'Padded to `(1, 3)`; trailing 4 vs 3 is incompatible'],
          ['`(5, 1)`', '`(1, 4)`', '`(5, 4)`', 'Both axes stretch — this is an outer product grid'],
          ['`(5,)`', '`(5, 1)`', '`(5, 5)`', 'The classic accident: a row and a column make a matrix'],
          ['`(2, 3, 4)`', '`(3, 1)`', '`(2, 3, 4)`', 'Padded to `(1, 3, 1)`; two axes stretch'],
          ['`(2, 3, 4)`', '`(2, 3)`', 'ValueError', 'Trailing 4 vs 3 fails; you probably wanted `(2, 3, 1)`'],
          ['`(256, 256, 3)`', '`(3,)`', '`(256, 256, 3)`', 'Per-channel scaling of an image'],
        ],
      },
      {
        kind: 'widget',
        title: 'Broadcast two shapes and see the stretch',
        caption: 'Set each shape and watch which axes are stretched and which cause an error.',
        widget: 'broadcasting',
      },
      {
        kind: 'flow',
        title: 'Diagnosing a broadcasting ValueError',
        caption: 'The error message already contains both shapes; the work is deciding which one is wrong.',
        steps: [
          { label: 'Read both shapes from the message', detail: '"operands could not be broadcast together with shapes (3,4) (3,)" gives you everything you need.' },
          { label: 'Right-align them on paper', detail: 'Pad the shorter shape on the left with 1s until the lengths match.' },
          { label: 'Find the offending column', detail: 'Locate the first pair that is neither equal nor contains a 1 — that is the actual disagreement.' },
          { label: 'Decide which array is wrong', detail: 'Usually a 1-D array meant to be a column: `(3,)` should have been `(3, 1)`.' },
          { label: 'Fix with newaxis or reshape', detail: '`b[:, np.newaxis]` or `b.reshape(-1, 1)` inserts the missing axis; never silently transpose to make an error go away.' },
        ],
      },
      {
        kind: 'compare',
        title: 'The `(n,)` versus `(n, 1)` trap',
        caption: 'Same values, same element count, entirely different broadcasting behaviour.',
        left: {
          heading: '`b` with shape `(3,)`',
          points: [
            'One-dimensional; `ndim == 1`',
            'Right-aligns as `(1, 3)` — behaves like a ROW',
            '`A(3,4) + b` raises a ValueError',
            '`b + b` gives shape `(3,)`',
            'Returned by `arr[:, 0]` and by `arr.sum(axis=1)`',
          ],
        },
        right: {
          heading: '`c` with shape `(3, 1)`',
          points: [
            'Two-dimensional; `ndim == 2`',
            'Already aligned — behaves like a COLUMN',
            '`A(3,4) + c` works, giving `(3, 4)`',
            '`b + c` gives shape `(3, 3)`, which is usually a bug',
            'Produced by `arr[:, 0:1]`, `b[:, np.newaxis]` or `keepdims=True`',
          ],
        },
      },
    ],

    formalDefinition:
      'Two shapes broadcast if, when right-aligned and left-padded with 1s to equal length, every pair of corresponding axis lengths is either equal or contains a 1. The result shape takes the maximum of each pair. An axis of length 1 is stretched by setting its stride to 0, so the same memory is read repeatedly and no data is copied. If any pair is neither equal nor contains a 1, NumPy raises `ValueError: operands could not be broadcast together with shapes ...`.',

    math: {
      intuition:
        'Broadcasting is a rule about index arithmetic. When an axis has length 1, every index along that axis is mapped to position 0, which is the formal way of saying the value is reused.',
      formulas: [
        {
          latex: "r_k = \\max(a_k, b_k) \\quad \\text{valid iff} \\quad a_k = b_k \;\\lor\; a_k = 1 \;\\lor\; b_k = 1",
          name: 'The broadcasting rule',
          meaning: 'Per axis, after right-aligning and left-padding with 1s: the axes must agree or one must be 1, and the result takes the larger.',
          variables: [
            { symbol: 'a_k, b_k', meaning: 'Length of axis k in each operand, counting from the right' },
            { symbol: 'r_k', meaning: 'Length of axis k in the result' },
            { symbol: '\\lor', meaning: 'Logical or — any one of the three conditions suffices' },
          ],
        },
        {
          latex: "s_k' = \\begin{cases} 0 & \\text{if } a_k = 1 \\text{ and } r_k > 1 \\\\ s_k & \\text{otherwise} \\end{cases}",
          name: 'How stretching is implemented',
          meaning: 'A stretched axis gets a stride of zero, so advancing along it does not move in memory and the same element is read again.',
          variables: [
            { symbol: 's_k', meaning: 'Original stride along axis k, in bytes' },
            { symbol: "s_k'", meaning: 'Stride used during the broadcast operation' },
            { symbol: 'r_k', meaning: 'Result length along axis k' },
          ],
        },
        {
          latex: 'z_{ij} = \\frac{x_{ij} - \\mu_j}{\\sigma_j}, \\qquad \\mu \\in \\mathbb{R}^{1 \\times p}, \; X \\in \\mathbb{R}^{n \\times p}',
          name: 'Standardisation as a broadcast',
          meaning: 'A per-column mean of shape (p,) right-aligns against (n, p) and is reused down all n rows, which is exactly the formula subtracting the same mu_j from every row.',
          variables: [
            { symbol: 'X', meaning: 'Design matrix with n samples and p features' },
            { symbol: '\\mu_j', meaning: 'Mean of feature j, one number per column' },
            { symbol: '\\sigma_j', meaning: 'Standard deviation of feature j' },
            { symbol: 'z_{ij}', meaning: 'Standardised value for sample i, feature j' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Take X of shape (1000, 5) and mu = X.mean(axis=0) of shape (5,).',
        'Right-align: (1000, 5) against (5,), which pads to (1, 5).',
        'Column by column from the right: 5 versus 5 is equal, so fine; 1000 versus 1 contains a 1, so the 1 stretches.',
        'The result shape is (1000, 5), and the stride along axis 0 of the broadcast mu is 0, so every row reads the same five means.',
        'Now try to centre rows instead, with a row mean of shape (1000,). Right-aligning gives (1000, 5) against (1, 1000), and 5 versus 1000 fails.',
        'Turning it into shape (1000, 1) with keepdims or newaxis restores compatibility: 1 stretches to 5, and each row is centred by its own mean.',
      ],
    },

    workedExample: {
      title: 'Computing all pairwise distances without a single loop',
      setup:
        'Given `A` with shape `(4, 2)` — four points in the plane — compute the 4x4 matrix of Euclidean distances between every pair. The naive version is a double loop; broadcasting does it in one expression, and the shape reasoning is the whole trick.',
      steps: [
        {
          label: 'State the goal shape',
          detail: 'The answer is `(4, 4)`: one row per source point, one column per destination point. So somewhere an axis of size 4 must meet another axis of size 4.',
        },
        {
          label: 'Insert an axis to make the points disagree deliberately',
          detail: '`A[:, None, :]` has shape `(4, 1, 2)` and `A[None, :, :]` has shape `(1, 4, 2)`. The first indexes source points, the second destination points.',
          latex: 'A \\in \\mathbb{R}^{4\\times 2} \;\\rightarrow\; A_{[:,\\,\\text{None},\\,:]} \\in \\mathbb{R}^{4\\times 1\\times 2}, \\quad A_{[\\text{None},\\,:,\\,:]} \\in \\mathbb{R}^{1\\times 4\\times 2}',
        },
        {
          label: 'Broadcast the subtraction',
          detail: 'Right-align `(4, 1, 2)` and `(1, 4, 2)`: 2 equals 2, then 1 stretches to 4, then 4 meets 1 which stretches. The difference has shape `(4, 4, 2)` and holds every coordinate difference for every pair.',
          latex: 'D_{ijk} = A_{ik} - A_{jk}, \\qquad D \\in \\mathbb{R}^{4 \\times 4 \\times 2}',
        },
        {
          label: 'Reduce the coordinate axis away',
          detail: 'Square, sum over the last axis, take the square root. Summing over axis -1 removes the coordinate axis and leaves `(4, 4)`.',
          latex: 'd_{ij} = \\sqrt{\\sum_{k} (A_{ik} - A_{jk})^2}',
        },
        {
          label: 'Sanity-check the result',
          detail: 'The diagonal must be exactly 0, and the matrix must be symmetric. `np.allclose(d, d.T)` and `np.diag(d)` confirm both in one line each.',
        },
      ],
      conclusion:
        'The expression is `np.sqrt(((A[:, None, :] - A[None, :, :]) ** 2).sum(-1))`. It is one line, has no Python loop, and its correctness is established entirely by shape reasoning: `(4,1,2)` against `(1,4,2)` gives `(4,4,2)`, and summing the last axis gives `(4,4)`. The cost to watch is memory: the intermediate is n by n by d, so for 100,000 points this approach would need terabytes and you would switch to `scipy.spatial.distance` or a chunked loop.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Broadcasting that works, and the shape rule behind each case',
        runnable: true,
        code: `import numpy as np

A = np.arange(12).reshape(3, 4)
row = np.array([10, 20, 30, 40])        # shape (4,)
col = np.array([[100], [200], [300]])   # shape (3, 1)

print(A + 1)          # scalar broadcasts everywhere
print(A + row)        # (3,4) + (4,)   -> (3,4), same row added to each row
print(A + col)        # (3,4) + (3,1)  -> (3,4), same value added along each row
print((A + row).shape, (A + col).shape)

print(np.broadcast_shapes((5, 1), (1, 4)))
print(np.broadcast_shapes((2, 3, 4), (3, 1)))`,
        output: `[[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
[[10 21 32 43]
 [14 25 36 47]
 [18 29 40 51]]
[[100 101 102 103]
 [204 205 206 207]
 [308 309 310 311]]
(3, 4) (3, 4)
(5, 4)
(2, 3, 4)`,
        explanation:
          '`row` is stretched down the rows because its padded shape `(1, 4)` has a 1 on axis 0; `col` is stretched across the columns because its shape `(3, 1)` has a 1 on axis 1. Neither is copied — the stretched axis simply gets a stride of zero. `np.broadcast_shapes` is the tool to reach for when you want to check a pair of shapes without building the arrays, and it is far quicker than reasoning in your head under pressure.',
      },
      {
        language: 'python',
        title: 'The failing case, and the (n,) versus (n, 1) trap',
        runnable: true,
        code: `import numpy as np

A = np.arange(12).reshape(3, 4)
wrong = np.array([1, 2, 3])            # shape (3,) - meant as a per-row value

try:
    A + wrong
except ValueError as e:
    print("ValueError:", e)

fixed = wrong[:, np.newaxis]           # shape (3, 1)
print("fixed shape:", fixed.shape)
print(A + fixed)

# The silent version of the same confusion
a = np.arange(5)                       # (5,)
b = np.arange(5)[:, np.newaxis]        # (5, 1)
print("a + b shape:", (a + b).shape)   # NOT (5,) - it is a 5x5 grid`,
        output: `ValueError: operands could not be broadcast together with shapes (3,4) (3,) 
fixed shape: (3, 1)
[[ 1  2  3  4]
 [ 6  7  8  9]
 [11 12 13 14]]
a + b shape: (5, 5)
`,
        explanation:
          'The error is the friendly case: NumPy tells you both shapes and refuses. The last two lines are the dangerous case. Adding a `(5,)` to a `(5, 1)` is perfectly legal — one is a row and one is a column, so they broadcast to a 5x5 grid — and no error is raised. On five elements you notice; on a hundred thousand you allocate eighty gigabytes and the process dies. Whenever an operation unexpectedly returns a square result, suspect exactly this.',
      },
      {
        language: 'python',
        title: 'The everyday uses: scaling, centring and outer grids',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(5)
X = rng.normal(loc=[0, 50, 100], scale=[1, 5, 20], size=(1000, 3))

# Per-column standardisation: (1000,3) with (3,) -> (1000,3)
Z = (X - X.mean(axis=0)) / X.std(axis=0)
print("Z means:", Z.mean(axis=0).round(6), "Z stds:", Z.std(axis=0).round(6))

# Per-row normalisation needs keepdims to get (1000,1)
norms = np.linalg.norm(X, axis=1, keepdims=True)
print("norms shape:", norms.shape)
unit = X / norms
print("row lengths:", np.linalg.norm(unit, axis=1)[:3].round(6))

# An outer grid from two 1-D arrays
xs = np.linspace(-1, 1, 3)
ys = np.linspace(0, 1, 2)
grid = xs[None, :] * ys[:, None]
print("grid shape:", grid.shape)
print(grid)`,
        output: `Z means: [ 0. -0. -0.] Z stds: [1. 1. 1.]
norms shape: (1000, 1)
row lengths: [1. 1. 1.]
grid shape: (2, 3)
[[-0.  0.  0.]
 [-1.  0.  1.]]`,
        explanation:
          'Column standardisation works with a bare `(3,)` because it right-aligns against the column axis naturally. Row normalisation does not: `np.linalg.norm(X, axis=1)` returns shape `(1000,)`, which would right-align against the column axis of size 3 and fail. `keepdims=True` keeps that axis as length 1, giving `(1000, 1)`, which stretches across the columns exactly as intended. This single asymmetry — columns work by default, rows need keepdims — accounts for an enormous share of real broadcasting errors.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Adding a bias vector in a neural network layer',
        usage:
          '`Z = X @ W + b` adds a bias of shape `(units,)` to activations of shape `(batch, units)`. Broadcasting applies the same bias to every sample in the batch with no copy of b.',
      },
      {
        context: 'Normalising image channels',
        usage:
          '`(img - mean) / std` with `img` of shape `(H, W, 3)` and per-channel statistics of shape `(3,)` scales each colour channel independently — the standard preprocessing step before a pretrained vision model.',
      },
      {
        context: 'Building a distance or similarity matrix',
        usage:
          'k-nearest neighbours and k-means both need all pairwise distances, computed by broadcasting `(n, 1, d)` against `(1, m, d)`. The memory cost of that `(n, m, d)` intermediate is precisely why libraries chunk it.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`StandardScaler` stores per-feature means and scales, then applies them by broadcasting at transform time.' },
      { tool: 'PyTorch', role: 'Tensor broadcasting follows identical rules, so the shape reasoning learned here transfers with no changes.' },
      { tool: 'pandas', role: 'Subtracting a Series from a DataFrame broadcasts along the matching axis; `axis="index"` exists because the default alignment surprises people.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a shape `(n,)` array where a column was intended',
        why: 'A 1-D array right-aligns, so it behaves as a row of length n. Subtracting per-row values written as `(n,)` from an `(n, p)` matrix either raises, or worse, succeeds by accident when n happens to equal p.',
        fix: 'Make the intent explicit with `v[:, np.newaxis]`, `v.reshape(-1, 1)` or `keepdims=True` on the reduction that produced it.',
      },
      {
        mistake: 'Accidentally creating an n-by-n array from `(n,)` plus `(n, 1)`',
        why: 'That combination is valid broadcasting: a row and a column produce a grid. Nothing raises, and for n = 100,000 in float64 the result would need 80 GB.',
        fix: 'Print shapes before combining arrays from different sources. If a result is unexpectedly square, this is almost always the cause.',
      },
      {
        mistake: 'Trying to transpose your way out of a broadcasting error',
        why: 'Transposing sometimes makes the error disappear while computing something entirely different — for example centring by the wrong axis — and then the bug is silent rather than loud.',
        fix: 'Work out on paper which axis should be stretched, then add exactly that axis with `np.newaxis`. Verify with a small example whose answer you know by hand.',
      },
      {
        mistake: 'Assuming broadcasting is free in memory as well as in the operands',
        why: 'The operands are not copied, but the result is a full materialised array. Broadcasting `(10000, 1)` with `(1, 10000)` allocates 100 million elements even though the inputs are tiny.',
        fix: 'Compute the result shape before running, using `np.broadcast_shapes`, and multiply by itemsize to see the real cost. Chunk the computation if it is too large.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'State the broadcasting rules, then explain whether `(3, 4)` and `(3,)` broadcast.',
        answer:
          'Align the shapes at their rightmost axis and left-pad the shorter with 1s. Then, axis by axis, the lengths must be equal or one of them must be 1, and the result takes the larger of the pair. For `(3, 4)` and `(3,)`, the second pads to `(1, 3)`. Comparing the trailing axes gives 4 against 3, which is neither equal nor contains a 1, so it raises `ValueError: operands could not be broadcast together with shapes (3,4) (3,)`. The intent was almost certainly a per-row value, which requires shape `(3, 1)` — then 3 matches 3 and the 1 stretches to 4.',
        followUp:
          'A strong answer volunteers that stretching is implemented as a zero stride, so no data is copied, while the result array is fully materialised.',
      },
      {
        level: 'intermediate',
        question: 'Why does `X - X.mean(axis=0)` work but `X - X.mean(axis=1)` raise?',
        answer:
          'For `X` of shape `(n, p)`, `mean(axis=0)` removes axis 0 and returns shape `(p,)`. Right-aligned against `(n, p)` it becomes `(1, p)`, the p axes match and the 1 stretches down the rows, so every row is centred by the per-column means. `mean(axis=1)` removes axis 1 and returns shape `(n,)`, which right-aligns as `(1, n)` — so its n is compared against p and fails unless they happen to be equal, which is worse because it then silently computes nonsense. The fix is `X.mean(axis=1, keepdims=True)`, giving `(n, 1)`, which stretches across the columns as intended.',
      },
      {
        level: 'ml-engineer',
        question: 'A pairwise-distance computation using broadcasting crashes with a memory error on 200,000 points. Diagnose and fix.',
        answer:
          'The broadcast `A[:, None, :] - A[None, :, :]` materialises an intermediate of shape `(n, n, d)`. At n = 200,000 and d = 10 in float64 that is 3.2e11 elements, about 2.6 terabytes, so the crash is expected rather than mysterious. The fix is to avoid materialising all pairs: use the algebraic identity that squared distance equals the sum of squared norms minus twice the Gram matrix, which needs only an `(n, n)` intermediate via a single matrix product; chunk the rows into blocks so only a block by n slab exists at a time; or use a library that does both, such as `sklearn.metrics.pairwise_distances` with its `working_memory` setting, or a spatial index like a KD-tree if only near neighbours are needed. The general habit is to compute the intermediate shape and multiply by itemsize before running anything at scale.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For each pair, give the result shape or say it raises: (a) `(8, 1, 6)` and `(7, 1)`; (b) `(5, 4)` and `(4,)`; (c) `(5, 4)` and `(5,)`; (d) `(15, 3, 5)` and `(15, 1, 5)`; (e) `(3,)` and `(3, 1)`.',
        hint: 'Right-align, left-pad with 1s, compare column by column.',
        solution:
          '(a) `(8, 7, 6)`. Pad the second to `(1, 7, 1)`: 6 against 1 stretches, 1 against 7 stretches, 8 against 1 stretches.\n(b) `(5, 4)`. Pad to `(1, 4)`: 4 matches, 1 stretches to 5.\n(c) Raises. Pad to `(1, 5)`: trailing 4 against 5 is neither equal nor 1.\n(d) `(15, 3, 5)`. 5 matches, 1 stretches to 3, 15 matches.\n(e) `(3, 3)`. Pad the first to `(1, 3)`: 3 against 1 stretches and 1 against 3 stretches, giving a grid. This is the trap — it does not raise.',
      },
      {
        prompt: 'Write one expression that scales every row of a matrix `X` of shape `(n, p)` so that each row sums to 1, and explain why `keepdims` is needed.',
        hint: 'What shape does `X.sum(axis=1)` return, and how does it right-align against `(n, p)`?',
        language: 'python',
        starterCode: 'import numpy as np\n\nX = np.arange(12, dtype=float).reshape(3, 4)\n',
        solution:
          'import numpy as np\n\nX = np.arange(12, dtype=float).reshape(3, 4)\nrow_normalised = X / X.sum(axis=1, keepdims=True)\nprint(row_normalised.sum(axis=1))   # [1. 1. 1.]\n\nWithout `keepdims`, `X.sum(axis=1)` has shape `(3,)`, which right-aligns against the column axis of length 4 and raises. With `keepdims=True` the shape is `(3, 1)`, whose trailing 1 stretches across the four columns so that each row is divided by its own total. The contrast with column normalisation is instructive: `X / X.sum(axis=0)` needs no keepdims, because a `(4,)` already aligns with the column axis.',
      },
      {
        prompt: 'Use broadcasting to build a 10x10 multiplication table from `np.arange(1, 11)`, without any loop, and state the shapes involved.',
        hint: 'You need one of the operands to be a column and the other a row.',
        solution:
          'import numpy as np\nn = np.arange(1, 11)\ntable = n[:, np.newaxis] * n[np.newaxis, :]\nprint(table.shape)   # (10, 10)\nprint(table[2, 3])   # 12, i.e. 3 * 4\n\nThe first operand has shape `(10, 1)` and the second `(10,)`, which pads to `(1, 10)`. Right-aligning gives 1 against 10, which stretches, and 10 against 1, which also stretches, producing `(10, 10)` where element (i, j) is n[i] * n[j]. This is the same mechanism as the accidental n-by-n array — here it is exactly what you want, which is why the mechanism is worth understanding rather than merely avoiding.',
      },
    ],

    quiz: [
      {
        id: 'NP-007-q1',
        type: 'mcq',
        concept: 'shape rule',
        prompt: 'What is the result shape of an operation between arrays of shape `(4, 1, 6)` and `(3, 6)`?',
        options: ['`(4, 3, 6)`', '`(4, 3)`', 'It raises a ValueError', '`(4, 1, 6)`'],
        answerIndex: 0,
        explanation:
          'The second pads to `(1, 3, 6)`. From the right: 6 matches 6; 1 stretches to 3; 4 stretches against 1. The result takes the maximum of each pair, giving `(4, 3, 6)`.',
      },
      {
        id: 'NP-007-q2',
        type: 'truefalse',
        concept: 'alignment direction',
        prompt: 'When broadcasting, NumPy aligns shapes starting from the leftmost axis.',
        answer: false,
        explanation:
          'Alignment starts from the rightmost, trailing axis, and the shorter shape is padded with 1s on the left. That is why a 1-D array behaves like a row rather than a column.',
      },
      {
        id: 'NP-007-q3',
        type: 'code-output',
        language: 'python',
        concept: 'the (n,) vs (n,1) trap',
        prompt: 'What shape does this print?',
        code: 'import numpy as np\na = np.arange(6)\nb = np.arange(6)[:, np.newaxis]\nprint((a + b).shape)',
        options: ['(6, 6)', '(6,)', '(6, 1)', 'It raises a ValueError'],
        answerIndex: 0,
        explanation:
          '`a` pads to `(1, 6)` and `b` is `(6, 1)`, so both axes stretch and the result is a 6x6 grid. This is legal broadcasting and raises nothing, which is what makes it dangerous at scale.',
      },
      {
        id: 'NP-007-q4',
        type: 'debug',
        language: 'python',
        concept: 'fixing a broadcast error',
        prompt: 'This raises `operands could not be broadcast together with shapes (100,3) (100,)`. What is the correct fix, assuming each row should be divided by its own total?',
        code: 'import numpy as np\nX = np.ones((100, 3))\nrow_sums = X.sum(axis=1)\nresult = X / row_sums',
        options: [
          'Use `X.sum(axis=1, keepdims=True)` so the shape is (100, 1)',
          'Use `X / row_sums.T`',
          'Use `X.sum(axis=0)` instead',
          'Transpose X before dividing',
        ],
        answerIndex: 0,
        explanation:
          '`keepdims=True` preserves the reduced axis as length 1, giving `(100, 1)`, whose trailing 1 stretches across the three columns. Transposing a 1-D array does nothing, and `axis=0` would compute column totals instead.',
      },
      {
        id: 'NP-007-q5',
        type: 'multi',
        concept: 'valid pairs',
        prompt: 'Which pairs of shapes broadcast successfully? Select all that apply.',
        options: [
          '`(3, 4)` and `(1, 4)`',
          '`(3, 4)` and `(3, 1)`',
          '`(3, 4)` and `(3,)`',
          '`(2, 3, 4)` and `(4,)`',
          '`(2, 3, 4)` and `(2, 4)`',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'The first, second and fourth satisfy the rule on every axis. The third fails because trailing 4 meets 3, and the fifth fails because trailing 4 meets 4 but then 3 meets 2.',
      },
      {
        id: 'NP-007-q6',
        type: 'explain',
        concept: 'why broadcasting is free',
        prompt: 'Explain what NumPy actually does to a size-1 axis when it broadcasts, and why the operands cost no extra memory while the result can still be enormous.',
        rubric: [
          'Says a stretched axis is given a stride of 0 so the same memory is read repeatedly',
          'Says no copy of the operand is made',
          'Says the result array is fully materialised at the broadcast shape',
        ],
        sampleAnswer:
          'When an axis has length 1 and needs to meet a longer axis, NumPy does not duplicate the data. It sets that axis stride to zero, so advancing along it does not move the read position and the same value is used again at every step. That is why adding a shape `(3,)` row to a `(1000000, 3)` matrix costs nothing extra for the row itself. The result, though, is a real array with the full broadcast shape, allocated in memory like any other. So broadcasting a `(10000, 1)` against a `(1, 10000)` reads only 20,000 input values but allocates 100 million output values, which is exactly how a one-line expression can exhaust RAM.',
        explanation:
          'The insight worth testing is that broadcasting is cheap on the inputs and not on the output, which is what separates people who use it confidently from people who are surprised by it.',
      },
    ],

    flashcards: [
      { front: 'State the broadcasting rule', back: 'Right-align the shapes, left-pad with 1s, then each axis pair must be equal or contain a 1. The result takes the larger of each pair.' },
      { front: 'Why does `(3, 4) + (3,)` fail?', back: '`(3,)` pads to `(1, 3)`, so the trailing 4 meets 3 — neither equal nor 1. You wanted `(3, 1)`, via `v[:, np.newaxis]`.' },
      { front: 'What does `(5,) + (5, 1)` give?', back: 'Shape `(5, 5)`. A row and a column broadcast into a grid; this is legal, silent, and a common cause of memory blowups.' },
      { front: 'How is a size-1 axis stretched?', back: 'Its stride is set to 0, so the same memory is read repeatedly. The operands are never copied; only the result is materialised.' },
      { front: 'Why does column standardisation need no keepdims but row normalisation does?', back: '`mean(axis=0)` gives `(p,)`, which right-aligns with the column axis. `mean(axis=1)` gives `(n,)`, which does not — use `keepdims=True` for `(n, 1)`.' },
      { front: 'How do you check two shapes without building arrays?', back: '`np.broadcast_shapes(a_shape, b_shape)` returns the result shape or raises, which is faster than reasoning under pressure.' },
    ],

    challenge: {
      title: 'A broadcasting oracle',
      brief:
        'Write `can_broadcast(shape_a, shape_b)` that returns the result shape, or a clear explanation of which axis pair failed, implementing the rule yourself rather than calling `np.broadcast_shapes`. Right-align, pad with 1s, and check each pair. Test it against at least ten shape pairs, including the failing cases `(3, 4)` with `(3,)` and `(2, 3, 4)` with `(2, 3)`, and confirm your answers against NumPy by actually attempting the operation. Finish by reporting, for each successful pair, how many elements the result would hold and how many bytes that is in float64.',
      language: 'python',
      acceptanceCriteria: [
        'The rule is implemented directly, not delegated to a NumPy helper',
        'Failures name the specific axis pair that is incompatible',
        'At least ten pairs are tested, including at least two that must fail',
        'Every answer is cross-checked against what NumPy actually does',
        'Successful pairs report the result element count and float64 size',
      ],
      starterCode: 'import numpy as np\n\ndef can_broadcast(shape_a, shape_b):\n    """Return the broadcast shape, or explain which axis pair fails."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach broadcasting to someone who keeps hitting "operands could not be broadcast together". Give them the rule and the single most common cause.',
      mustCover: [
        'Shapes are right-aligned and the shorter is left-padded with 1s',
        'Each axis pair must be equal or contain a 1, and the result takes the larger',
        'A size-1 axis is stretched with a zero stride, so nothing is copied',
        'A 1-D `(n,)` array behaves like a row; a column needs `(n, 1)` via newaxis or keepdims',
      ],
      bonusSignals: ['works through a failing example explicitly', 'mentions that `(n,) + (n,1)` silently gives an n-by-n grid', 'notes that the result array is still fully allocated'],
      sampleExplanation:
        'Write the two shapes down and line them up at the right-hand end, not the left, padding the shorter one with 1s on the left. Now read down each column. If the two numbers are the same, that axis is fine. If one of them is 1, that side gets stretched to match the other. Anything else and NumPy refuses. The result takes the bigger number from each column. So `(3, 4)` with `(4,)` becomes `(3, 4)` against `(1, 4)`: the 4s agree, the 1 stretches to 3, and every row gets the same four values. But `(3, 4)` with `(3,)` becomes `(3, 4)` against `(1, 3)`, and 4 against 3 is neither equal nor 1, so you get the error you keep seeing. That case is almost always someone with a per-row value: they need shape `(3, 1)`, which they get with `v[:, np.newaxis]` or by passing `keepdims=True` to the reduction that produced it. Stretching costs nothing, because NumPy sets that axis stride to zero and rereads the same bytes rather than copying. Two warnings. The result is a real array of the full broadcast shape, so combining a `(10000, 1)` with a `(1, 10000)` allocates a hundred million elements from tiny inputs. And adding a `(5,)` to a `(5, 1)` does not fail — it gives you a 5x5 grid, silently, which is why an unexpectedly square result should always make you check your shapes.',
    },
  },

  {
    id: 'NP-008',
    domain: 'NP',
    module: 'Maths on Arrays',
    topic: 'Reductions and axes',
    title: 'Aggregation and the axis Argument',
    slug: 'aggregation-and-axis',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['NP-002', 'NP-006'],
    related: ['NP-005', 'NP-007'],
    tags: ['sum', 'mean', 'axis', 'keepdims', 'argmax', 'nan', 'reduction'],

    learningObjectives: [
      'Predict the output shape of any reduction from the input shape and the axis argument',
      'State and apply the rule that the axis you name is the axis that disappears',
      'Use `keepdims=True` to preserve shape for subsequent broadcasting',
      'Choose the right aggregation for the question, including `argmax`, `cumsum` and the NaN-aware variants',
    ],

    terminology: [
      {
        term: 'Reduction',
        definition:
          'An operation that combines many values into fewer, such as `sum`, `mean`, `max`, `std` or `any`. It removes one or more axes.',
        simple: 'Squashing a whole direction down into a single number.',
      },
      {
        term: 'axis',
        definition:
          'The argument naming which axis to reduce over. That axis is eliminated from the result; the remaining axes keep their order and lengths.',
        simple: 'Which direction gets squashed.',
      },
      {
        term: 'keepdims',
        definition:
          'When True, the reduced axis is kept with length 1 rather than removed, so the result still broadcasts against the original array.',
        simple: 'Squash the direction but leave a flat stub axis behind, so shapes still line up.',
      },
      {
        term: 'argmax / argmin',
        definition:
          'Return the index of the maximum or minimum along an axis rather than the value. `argmax` on a 2-D array with `axis=1` gives one column index per row.',
        simple: 'Tells you where the biggest value is, not what it is.',
      },
      {
        term: 'NaN-aware aggregation',
        definition:
          '`np.nansum`, `np.nanmean` and friends ignore NaN values, whereas the ordinary versions propagate a single NaN to the entire result.',
        simple: 'Versions that skip missing values instead of poisoning the answer.',
      },
    ],

    simpleExplanation:
      "Once you can build arrays, the next question is always \"summarise this for me\": the average of every column, the largest value in each row, how many rows pass a test. All of those are reductions, and they all take the same argument, `axis`, which is the one genuinely confusing part. People try to remember it as \"axis 0 means columns\" and get it backwards half the time. There is a rule that never fails: the axis you name is the axis that disappears. Start with a table of shape `(3, 4)`. Say `axis=0` and axis 0 is gone, so the answer has shape `(4,)` — four numbers, one per column, each summarising down the three rows. Say `axis=1` and axis 1 is gone, so the answer has shape `(3,)` — three numbers, one per row. Say nothing at all and every axis disappears, leaving a single number. Apply that rule to the shape and you never have to guess. The other thing worth knowing early is `keepdims=True`, which leaves the squashed axis behind as a length-1 stub so the result still lines up with the original for broadcasting.",

    whyItExists:
      'Analysis is mostly summarisation, and the same summary has to be computable along any direction of an array: down the samples to get per-feature statistics, across the features to get per-sample totals, or over everything at once. A single `axis` argument shared by every reduction means one idea covers `sum`, `mean`, `max`, `std`, `any` and the rest, instead of a different function for every direction.',

    analogy: {
      scenario:
        'Picture a spreadsheet of monthly sales: twelve rows for months, five columns for shops. Your manager asks two different questions. "How did each shop do overall?" means collapsing the months away, leaving one number per shop. "How did the company do each month?" means collapsing the shops away, leaving one number per month. The numbers being added are the same in both cases; what changes is which direction gets flattened, and therefore what the answer is a list of.',
      mapping: [
        { from: 'Collapsing the twelve months away', to: '`axis=0` on a `(12, 5)` array, giving shape `(5,)`' },
        { from: 'Collapsing the five shops away', to: '`axis=1` on the same array, giving shape `(12,)`' },
        { from: 'A single grand total for the year', to: '`arr.sum()` with no axis, giving a scalar of shape `()`' },
        { from: 'A totals row left in the sheet, still aligned with the columns', to: '`keepdims=True`, giving shape `(1, 5)` so it broadcasts back against the table' },
        { from: 'Asking which month was best rather than how much', to: '`argmax` instead of `max` — an index rather than a value' },
      ],
      bridge:
        'The manager two questions differ only in which direction is flattened, and that is exactly what `axis` selects. The rule "the named axis disappears" is literally what happens to the spreadsheet: name the month axis and months vanish from the answer, leaving one entry per shop. Read the shape rather than the words and you cannot get it backwards.',
      limitations:
        'A spreadsheet has only two directions and obvious labels for them. Real arrays have three or four axes whose meanings are conventions rather than labels — in `(batch, channels, height, width)` nothing in the array itself records which is which, which is why reading the shape tuple carefully is a survival skill.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'The named axis is the axis that disappears',
        caption: 'Same data, two directions, two shapes of answer.',
        art: `arr = np.array([[1, 2, 3, 4],          shape (3, 4)
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

 axis=0 : collapse DOWN the rows       axis=1 : collapse ACROSS the columns
                                       
   1   2   3   4                         1   2   3   4  ->  10
   5   6   7   8                         5   6   7   8  ->  26
   9  10  11  12                         9  10  11  12  ->  42
   |   |   |   |
   v   v   v   v
  15  18  21  24

 arr.sum(axis=0) -> [15 18 21 24]      arr.sum(axis=1) -> [10 26 42]
 shape (4,)   axis 0 is gone           shape (3,)   axis 1 is gone

 arr.sum()              -> 78          shape ()   all axes gone
 arr.sum(axis=0, keepdims=True) -> [[15 18 21 24]]   shape (1, 4)
 arr.sum(axis=1, keepdims=True) -> [[10] [26] [42]]  shape (3, 1)`,
      },
      {
        kind: 'table',
        title: 'Reading off the result shape',
        caption: 'Cover the last column and work each one out before looking.',
        columns: ['Input shape', 'Call', 'Result shape', 'One entry per'],
        rows: [
          ['`(3, 4)`', '`.sum()`', '`()`', 'The whole array'],
          ['`(3, 4)`', '`.sum(axis=0)`', '`(4,)`', 'Column'],
          ['`(3, 4)`', '`.sum(axis=1)`', '`(3,)`', 'Row'],
          ['`(3, 4)`', '`.sum(axis=1, keepdims=True)`', '`(3, 1)`', 'Row, still 2-D for broadcasting'],
          ['`(2, 3, 4)`', '`.mean(axis=0)`', '`(3, 4)`', 'Position within a block'],
          ['`(2, 3, 4)`', '`.mean(axis=2)`', '`(2, 3)`', 'Row of each block'],
          ['`(2, 3, 4)`', '`.mean(axis=(0, 2))`', '`(3,)`', 'Row index, averaged over blocks and columns'],
          ['`(32, 224, 224, 3)`', '`.mean(axis=(0, 1, 2))`', '`(3,)`', 'Colour channel, over the whole batch'],
        ],
      },
      {
        kind: 'flow',
        title: 'Choosing the aggregation the question actually asks for',
        caption: 'Most axis confusion is really a question that was never stated precisely.',
        steps: [
          { label: 'State the answer you want, with units', detail: '"One average per feature" or "one maximum per sample" — say how many numbers you expect.' },
          { label: 'Count them against the shape', detail: 'One per feature on an `(n, p)` array means p numbers, so the result shape is `(p,)`.' },
          { label: 'Name the axis that must disappear', detail: 'To go from `(n, p)` to `(p,)`, axis 0 is removed, so `axis=0`.' },
          { label: 'Decide whether you need it back', detail: 'If the result will be broadcast against the original, add `keepdims=True`.' },
          { label: 'Check for NaN', detail: 'One NaN poisons an ordinary reduction; use `np.nanmean` and friends when missing data is possible.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Reduce along an axis and watch the shape',
        caption: 'Pick an axis and see which direction collapses.',
        widget: 'ndarray-explorer',
      },
    ],

    formalDefinition:
      'A reduction applies a binary operation pairwise along one or more axes, producing an array whose shape is the input shape with those axes removed. For input shape `S` and `axis=k`, the output shape is `S` with entry k deleted; with `keepdims=True` entry k is set to 1 instead. With `axis=None`, the default for most reductions, every axis is removed and the result is a 0-d scalar. For a tuple of axes, all named axes are removed. `argmax` and `argmin` return integer indices along the reduced axis, and for `axis=None` they return an index into the flattened array.',

    math: {
      intuition:
        'A reduction is a sum, maximum or similar taken over one subscript while the others are held fixed. Which subscript you sum over is precisely what `axis` names, and the remaining free subscripts are the shape of the answer.',
      formulas: [
        {
          latex: 'c_j = \\sum_{i=0}^{n-1} x_{ij} \\quad (\\text{axis}=0), \\qquad r_i = \\sum_{j=0}^{p-1} x_{ij} \\quad (\\text{axis}=1)',
          name: 'Reducing a matrix along each axis',
          meaning: 'Summing over i leaves j free, giving one number per column; summing over j leaves i free, giving one number per row.',
          variables: [
            { symbol: 'x_{ij}', meaning: 'Element at row i, column j of an (n, p) array' },
            { symbol: 'c_j', meaning: 'Column total, a result of shape (p,)' },
            { symbol: 'r_i', meaning: 'Row total, a result of shape (n,)' },
          ],
        },
        {
          latex: '\\mu_j = \\frac{1}{n}\\sum_i x_{ij}, \\qquad \\sigma_j = \\sqrt{\\frac{1}{n - \\delta}\\sum_i (x_{ij} - \\mu_j)^2}',
          name: 'Per-feature mean and standard deviation',
          meaning: 'Both reduce along the sample axis, leaving one value per feature. The delta is the `ddof` argument, 0 by default in NumPy and 1 in pandas.',
          variables: [
            { symbol: '\\mu_j', meaning: 'Mean of feature j, computed as `X.mean(axis=0)`' },
            { symbol: '\\sigma_j', meaning: 'Standard deviation of feature j, computed as `X.std(axis=0)`' },
            { symbol: '\\delta', meaning: 'The `ddof` correction: 0 gives the population formula, 1 the sample formula' },
            { symbol: 'n', meaning: 'Number of samples being reduced over' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\hat{y}_i = \\arg\\max_{k} \; p_{ik}',
          name: 'Predicted class from a probability matrix',
          meaning: 'For a matrix of per-class probabilities with one row per sample, taking the argmax along the class axis gives the predicted label for each sample.',
          variables: [
            { symbol: 'p_{ik}', meaning: 'Probability that sample i belongs to class k, shape (n, K)' },
            { symbol: '\\hat{y}_i', meaning: 'Predicted class index for sample i, computed as `p.argmax(axis=1)`, shape (n,)' },
            { symbol: 'K', meaning: 'Number of classes, the length of the axis being reduced' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'Write the element as x with one subscript per axis: for a (3, 4) array, x_ij with i in 0..2 and j in 0..3.',
        'A reduction sums over one subscript. Summing over i produces a quantity indexed by j alone.',
        'The free subscripts of the result are exactly the axes that survive, so the result shape is (4,) — which is the rule "the named axis disappears", restated.',
        'With keepdims, the summed subscript is retained but takes only the value 0, giving shape (1, 4).',
        'That retained axis is what allows `x - x.mean(axis=1, keepdims=True)` to broadcast: the length-1 axis stretches back to its original length.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Every reduction, one rule',
        runnable: true,
        code: `import numpy as np

arr = np.arange(1, 13).reshape(3, 4)
print(arr)

print("sum()         ", arr.sum(), np.shape(arr.sum()))
print("sum(axis=0)   ", arr.sum(axis=0), arr.sum(axis=0).shape)
print("sum(axis=1)   ", arr.sum(axis=1), arr.sum(axis=1).shape)
print("mean(axis=0)  ", arr.mean(axis=0))
print("max(axis=1)   ", arr.max(axis=1))
print("argmax(axis=1)", arr.argmax(axis=1))
print("std(axis=0)   ", arr.std(axis=0).round(3))
print("any(axis=1)   ", (arr > 10).any(axis=1))
print("count > 6     ", (arr > 6).sum())`,
        output: `[[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
sum()          78 ()
sum(axis=0)    [15 18 21 24] (4,)
sum(axis=1)    [10 26 42] (3,)
mean(axis=0)   [5. 6. 7. 8.]
max(axis=1)    [ 4  8 12]
argmax(axis=1) [3 3 3]
std(axis=0)    [3.266 3.266 3.266 3.266]
any(axis=1)    [False False  True]
count > 6      6`,
        explanation:
          'Every call follows the same rule: the named axis vanishes from the shape. Two details are worth pausing on. `argmax(axis=1)` returns column indices — here every row maximum is in the last column, so the answer is `[3, 3, 3]` and not the values `[4, 8, 12]`. And `(arr > 6).sum()` counts rather than adds, because summing a boolean array counts its True entries, which is the standard idiom for "how many satisfy this".',
      },
      {
        language: 'python',
        title: 'keepdims, and why it exists',
        runnable: true,
        code: `import numpy as np

X = np.array([[1.0, 2.0, 3.0],
              [4.0, 5.0, 6.0]])

print("no keepdims:", X.sum(axis=1).shape)      # (2,)
print("keepdims   :", X.sum(axis=1, keepdims=True).shape)   # (2, 1)

# Row-normalise: needs (2, 1) to broadcast across 3 columns
print(X / X.sum(axis=1, keepdims=True))

try:
    X / X.sum(axis=1)
except ValueError as e:
    print("ValueError:", e)

# Column standardisation needs no keepdims: (3,) aligns naturally
print(((X - X.mean(axis=0)) / X.std(axis=0)).round(3))`,
        output: `no keepdims: (2,)
keepdims   : (2, 1)
[[0.16666667 0.33333333 0.5       ]
 [0.26666667 0.33333333 0.4       ]]
ValueError: operands could not be broadcast together with shapes (2,3) (2,) 
[[-1. -1. -1.]
 [ 1.  1.  1.]]
`,
        explanation:
          'This is the asymmetry that catches everyone. Reducing along axis 0 leaves a shape that right-aligns with the columns, so it broadcasts back without help. Reducing along axis 1 leaves shape `(n,)`, which right-aligns against the column axis and fails. `keepdims=True` is the fix: it leaves the reduced axis in place with length 1, and a length-1 axis stretches back to its original size. The rule of thumb is that any reduction whose result will be combined with the original array again should use keepdims.',
      },
      {
        language: 'python',
        title: 'Higher dimensions, tuple axes and NaN',
        runnable: true,
        code: `import numpy as np

batch = np.arange(24).reshape(2, 3, 4)

print(batch.sum(axis=0).shape)        # (3, 4) - blocks collapsed
print(batch.sum(axis=1).shape)        # (2, 4)
print(batch.sum(axis=2).shape)        # (2, 3)
print(batch.sum(axis=(0, 2)).shape)   # (3,)
print(batch.sum(axis=-1).shape)       # (2, 3) - last axis

# Per-channel image statistics over a batch
imgs = np.zeros((32, 64, 64, 3))
print("per-channel mean shape:", imgs.mean(axis=(0, 1, 2)).shape)

# A single NaN poisons an ordinary reduction
vals = np.array([1.0, 2.0, np.nan, 4.0])
print("mean   :", vals.mean())
print("nanmean:", np.nanmean(vals))
print("how many missing:", np.isnan(vals).sum())`,
        output: `(3, 4)
(2, 4)
(2, 3)
(3,)
(2, 3)
per-channel mean shape: (3,)
mean   : nan
nanmean: 2.3333333333333335
how many missing: 1
`,
        explanation:
          'In three or more dimensions the rule is unchanged: delete the named axes from the shape. A tuple of axes deletes several at once, which is how per-channel image statistics are computed — average over batch, height and width, leaving only the channel axis. The NaN behaviour is deliberate rather than a bug: NaN propagates so that silently missing data cannot masquerade as a valid answer. When you genuinely want to skip it, say so with `np.nanmean`, and count what you skipped with `np.isnan(...).sum()`.',
      },
      {
        language: 'python',
        title: 'argmax, argsort and running totals in practice',
        runnable: true,
        code: `import numpy as np

probs = np.array([[0.1, 0.7, 0.2],
                  [0.6, 0.1, 0.3],
                  [0.2, 0.3, 0.5]])

pred = probs.argmax(axis=1)
print("predicted class:", pred)
print("confidence     :", probs.max(axis=1))

true = np.array([1, 0, 1])
print("accuracy       :", (pred == true).mean())

print("ranked classes :\\n", np.argsort(-probs, axis=1))
print("running totals :", np.cumsum([3, 1, 4, 1, 5]))
print("row cumsum     :\\n", np.cumsum(probs, axis=1).round(2))`,
        output: `predicted class: [1 0 2]
confidence     : [0.7 0.6 0.5]
accuracy       : 0.6666666666666666
ranked classes :
 [[1 2 0]
 [0 2 1]
 [2 1 0]]
running totals : [ 3  4  8  9 14]
row cumsum     :
 [[0.1 0.8 1. ]
 [0.6 0.7 1. ]
 [0.2 0.5 1. ]]
`,
        explanation:
          'Turning a probability matrix into predictions is `argmax(axis=1)`: the class axis disappears, leaving one label per sample. `max(axis=1)` on the same array gives the confidence rather than the label — the pairing of value and index functions is worth internalising. `cumsum` is the exception to the rule that reductions remove an axis: it accumulates along an axis and keeps the shape, which is what you want for running totals and for checking that each row of probabilities sums to 1.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature statistics before training',
        usage:
          '`X.mean(axis=0)` and `X.std(axis=0)` give one number per feature, which is exactly what `StandardScaler` stores. Getting the axis wrong standardises each sample instead, which quietly destroys the signal.',
      },
      {
        context: 'Turning model outputs into predictions',
        usage:
          '`probs.argmax(axis=1)` converts an `(n_samples, n_classes)` probability matrix into `(n_samples,)` labels, and `probs.max(axis=1)` gives the confidence used for thresholding or for flagging uncertain cases.',
      },
      {
        context: 'Image normalisation constants',
        usage:
          'The famous ImageNet means `[0.485, 0.456, 0.406]` are per-channel averages computed as `imgs.mean(axis=(0, 1, 2))` over a whole dataset — three axes collapsed, one kept.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.sum(axis=0)` and `df.mean(axis=1)` follow the same convention, and pandas defaults to skipping NaN where NumPy propagates it.' },
      { tool: 'scikit-learn', role: 'Scalers, PCA and metric functions are all reductions along the sample axis; the shape conventions come straight from this unit.' },
      { tool: 'PyTorch', role: 'Uses `dim` where NumPy uses `axis`, with the same meaning and the same `keepdim` option, one letter shorter.' },
    ],

    commonMistakes: [
      {
        mistake: 'Remembering axis as "0 means columns" and getting it backwards',
        why: 'The phrasing hides which shape you end up with, so under pressure it is a coin flip. `axis=0` does produce one value per column, but only because axis 0 is the one being removed.',
        fix: 'Use the shape rule instead: name the axis that disappears. `(n, p)` with `axis=0` gives `(p,)`, full stop. Print the shape when unsure.',
      },
      {
        mistake: 'Forgetting `keepdims=True` when the result is broadcast back',
        why: 'Reducing along axis 1 gives shape `(n,)`, which right-aligns against the column axis and raises, or silently misbehaves when n happens to equal p.',
        fix: 'Any reduction whose output will be combined with the original array should carry `keepdims=True`, giving `(n, 1)` which stretches correctly.',
      },
      {
        mistake: 'Letting a single NaN silently ruin an aggregate',
        why: 'Ordinary reductions propagate NaN by design, so one missing sensor reading turns an entire column mean into `nan`, and downstream code may not check.',
        fix: 'Use `np.nanmean`, `np.nansum` and friends when missing data is expected, and report `np.isnan(arr).sum()` so the amount skipped is visible rather than hidden.',
      },
      {
        mistake: 'Confusing `max` with `argmax`',
        why: 'They reduce the same axis but return different things — a value versus a position — and both are plausible-looking integers when the data happens to be integer.',
        fix: 'Say what you want in words first. "Which class" is `argmax`; "how confident" is `max`. Use `arr[np.arange(n), arr.argmax(axis=1)]` when you need both consistently.',
      },
      {
        mistake: 'Assuming `std` matches the sample standard deviation from a statistics course',
        why: 'NumPy `std` defaults to `ddof=0`, the population formula, whereas pandas and most statistics texts use `ddof=1`. On small samples the two differ noticeably.',
        fix: 'Pass `ddof=1` explicitly when you want the unbiased sample estimate, and be aware of the difference when NumPy and pandas results disagree slightly.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'For an array of shape `(100, 5)`, what do `arr.sum(axis=0)` and `arr.sum(axis=1)` return?',
        answer:
          'The rule is that the named axis disappears. `axis=0` removes the first axis, so the result has shape `(5,)` — five numbers, each the sum down all 100 rows for one column, which is the per-feature total. `axis=1` removes the second axis, giving shape `(100,)` — one total per row, which is the per-sample total. With no axis at all, every axis is removed and you get a single scalar. Stating it in terms of the resulting shape is far more reliable than trying to remember whether axis 0 "means" rows or columns.',
        followUp:
          'A strong answer mentions `keepdims=True` for keeping the reduced axis as length 1 so the result broadcasts back.',
      },
      {
        level: 'intermediate',
        question: 'What does `keepdims=True` do and when do you need it?',
        answer:
          'It keeps the reduced axis in the output with length 1 instead of deleting it, so a reduction of `(n, p)` along axis 1 yields `(n, 1)` rather than `(n,)`. You need it whenever the result will be broadcast back against the original array. Reducing along axis 0 does not need it, because the resulting `(p,)` right-aligns with the column axis naturally, but reducing along axis 1 does: a bare `(n,)` right-aligns against the column axis of length p and raises a broadcasting error, or worse succeeds by accident when n equals p. So `X / X.sum(axis=1, keepdims=True)` normalises each row correctly, while omitting keepdims fails.',
      },
      {
        level: 'ml-engineer',
        question: 'You are computing per-channel mean and standard deviation over a dataset of images shaped `(N, H, W, C)`. How do you write it, and what would you watch out for?',
        answer:
          'The channel axis is the only one that survives, so `imgs.mean(axis=(0, 1, 2))` and `imgs.std(axis=(0, 1, 2))`, each giving shape `(C,)`. Three practical concerns. Dtype: if the images are `uint8`, the sum can overflow, so I would cast to `float32` or pass `dtype=np.float64` to the reduction. Memory: for a large dataset the whole array does not fit, so I would accumulate sums and sums of squares per batch and combine at the end, computing the variance as E[x squared] minus E[x] squared, with a note that this formulation loses precision and that a streaming Welford update is the numerically safer option. And scale: statistics computed on 0-255 data are not interchangeable with those computed on 0-1 data, which is a classic silent mismatch between training and inference preprocessing.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'An array has shape `(6, 5, 4)`. Give the result shapes of `.sum(axis=0)`, `.sum(axis=1)`, `.sum(axis=(1, 2))`, `.sum(axis=-1)` and `.sum(axis=1, keepdims=True)`.',
        hint: 'Delete the named axes from the shape tuple; keepdims replaces them with 1 instead.',
        solution:
          '`.sum(axis=0)` -> `(5, 4)`\n`.sum(axis=1)` -> `(6, 4)`\n`.sum(axis=(1, 2))` -> `(6,)`\n`.sum(axis=-1)` -> `(6, 5)`, since -1 is the last axis\n`.sum(axis=1, keepdims=True)` -> `(6, 1, 4)`\n\nEvery one of these is mechanical once you treat axis as "the entry to delete from the shape tuple". Negative axes count from the right exactly as they do in indexing.',
      },
      {
        prompt: 'Given a probability matrix `P` of shape `(n, K)` whose rows sum to 1, write expressions for the predicted class, the confidence in that prediction, and the number of samples predicted as class 0.',
        hint: 'Two of these reduce the class axis; the third counts a boolean array.',
        language: 'python',
        solution:
          'import numpy as np\npred = P.argmax(axis=1)          # shape (n,), a class index per sample\nconf = P.max(axis=1)             # shape (n,), the winning probability\nn_zero = (pred == 0).sum()       # a single integer count\n\n`argmax` and `max` both remove the class axis, one returning a position and the other a value. The count works because a comparison gives a boolean array and True counts as 1 under summation. If you needed the confidence using explicit indices instead, `P[np.arange(len(P)), pred]` gives the same result and generalises to picking any chosen class.',
      },
      {
        prompt: 'Explain, with shapes, why `X - X.mean(axis=1)` raises for `X` of shape `(100, 5)` but `X - X.mean(axis=0)` does not.',
        hint: 'Work out the shape of each mean, then right-align it against (100, 5).',
        solution:
          '`X.mean(axis=0)` has shape `(5,)`. Right-aligned against `(100, 5)` it pads to `(1, 5)`: 5 matches 5, and the 1 stretches to 100. It works, and centres each column by its own mean.\n\n`X.mean(axis=1)` has shape `(100,)`. Right-aligned it pads to `(1, 100)`, so 100 is compared against the trailing 5 — neither equal nor 1 — and NumPy raises `operands could not be broadcast together with shapes (100,5) (100,)`.\n\nThe fix is `X.mean(axis=1, keepdims=True)`, which gives `(100, 1)` and stretches across the five columns, centring each row by its own mean.',
      },
    ],

    quiz: [
      {
        id: 'NP-008-q1',
        type: 'mcq',
        concept: 'axis semantics',
        prompt: 'For an array of shape `(8, 3)`, what shape does `arr.mean(axis=0)` return?',
        options: ['`(3,)`', '`(8,)`', '`(8, 1)`', '`(1, 3)`'],
        answerIndex: 0,
        explanation:
          'The named axis is removed, so axis 0 of length 8 disappears and the result has shape `(3,)` — one mean per column, computed down the eight rows.',
      },
      {
        id: 'NP-008-q2',
        type: 'code-output',
        language: 'python',
        concept: 'reductions on a matrix',
        prompt: 'What does this print?',
        code: 'import numpy as np\na = np.array([[1, 2], [3, 4]])\nprint(a.sum(axis=1))',
        options: ['[3 7]', '[4 6]', '[10]', '10'],
        answerIndex: 0,
        explanation:
          'Axis 1 is removed, so each row collapses to one number: 1 + 2 = 3 and 3 + 4 = 7. Summing along axis 0 would instead give the column totals `[4 6]`.',
      },
      {
        id: 'NP-008-q3',
        type: 'truefalse',
        concept: 'keepdims',
        prompt: '`arr.sum(axis=1, keepdims=True)` on a `(4, 6)` array returns shape `(4, 1)`.',
        answer: true,
        explanation:
          'With keepdims the reduced axis is retained at length 1 rather than deleted, which is what allows the result to broadcast back against the original `(4, 6)` array.',
      },
      {
        id: 'NP-008-q4',
        type: 'fill',
        concept: 'NaN-aware aggregation',
        prompt: 'Which NumPy function computes a mean while ignoring NaN values?',
        answers: ['np.nanmean', 'nanmean', 'np.nanmean()'],
        explanation:
          'Ordinary `mean` propagates NaN so that missing data cannot hide, whereas `np.nanmean` skips it. The same pattern gives `nansum`, `nanstd`, `nanmax` and `nanmin`.',
      },
      {
        id: 'NP-008-q5',
        type: 'code-output',
        language: 'python',
        concept: 'argmax versus max',
        prompt: 'What is printed?',
        code: 'import numpy as np\np = np.array([[0.2, 0.5, 0.3],\n              [0.7, 0.1, 0.2]])\nprint(p.argmax(axis=1))',
        options: ['[1 0]', '[0.5 0.7]', '[1 2]', '[2 1]'],
        answerIndex: 0,
        explanation:
          '`argmax` returns positions, not values: the largest entry in row 0 is at column 1 and in row 1 at column 0. `p.max(axis=1)` would give the values `[0.5 0.7]`.',
      },
      {
        id: 'NP-008-q6',
        type: 'match',
        concept: 'result shapes',
        prompt: 'For an input of shape `(4, 5, 6)`, match each call to its result shape.',
        pairs: [
          { left: '`.sum(axis=0)`', right: '`(5, 6)`' },
          { left: '`.sum(axis=1)`', right: '`(4, 6)`' },
          { left: '`.sum(axis=2)`', right: '`(4, 5)`' },
          { left: '`.sum(axis=(0, 1))`', right: '`(6,)`' },
          { left: '`.sum()`', right: '`()`' },
        ],
        explanation:
          'In every case the named axes are deleted from the shape tuple and the rest keep their order. With no axis argument, all of them go and a scalar remains.',
      },
    ],

    flashcards: [
      { front: 'What is the rule for the axis argument?', back: 'The axis you name is the axis that disappears. `(n, p)` with `axis=0` gives `(p,)`; with `axis=1` gives `(n,)`.' },
      { front: 'What does `keepdims=True` do?', back: 'Keeps the reduced axis with length 1 instead of deleting it, so the result still broadcasts against the original array.' },
      { front: 'Why does `X - X.mean(axis=1)` fail on `(n, p)`?', back: 'The mean has shape `(n,)`, which right-aligns against the column axis p. Use `keepdims=True` to get `(n, 1)`.' },
      { front: '`max` versus `argmax`', back: '`max` returns the largest value along the axis; `argmax` returns its index. Predicting a class is argmax; reporting confidence is max.' },
      { front: 'What does a single NaN do to `arr.mean()`?', back: 'It propagates, making the whole result NaN. Use `np.nanmean` to skip missing values, and count them with `np.isnan(arr).sum()`.' },
      { front: 'How do you get per-channel means of images shaped (N, H, W, C)?', back: '`imgs.mean(axis=(0, 1, 2))` — three axes deleted at once, leaving shape `(C,)`.' },
    ],

    challenge: {
      title: 'A per-feature summary table',
      brief:
        'Given a matrix `X` of shape `(1000, 6)` containing a few deliberately inserted NaN values, produce a small report with one row per feature showing count of valid values, number missing, mean, standard deviation, minimum, maximum and the row index of the maximum. Use NaN-aware reductions where appropriate, use `keepdims` at least once to standardise the matrix afterwards, and confirm that the standardised columns have mean approximately 0 and standard deviation approximately 1. No Python loop over the rows is allowed; a loop over the six features for printing is fine.',
      language: 'python',
      acceptanceCriteria: [
        'Every statistic is computed with an axis-based reduction, not a loop over rows',
        'NaN values are excluded from the statistics and counted separately',
        '`keepdims` or an equivalent is used so the standardisation broadcasts correctly',
        'The report includes `nanargmax` positions, not only values',
        'A final check prints the standardised column means and standard deviations',
      ],
      starterCode: 'import numpy as np\n\nrng = np.random.default_rng(21)\nX = rng.normal(size=(1000, 6))\nX[rng.integers(0, 1000, 12), rng.integers(0, 6, 12)] = np.nan\n',
    },

    teachingPrompt: {
      prompt:
        'Someone keeps guessing whether to use axis=0 or axis=1. Give them a rule that always works, and explain keepdims.',
      mustCover: [
        'The axis you name is the axis removed from the shape',
        'On an `(n, p)` array, axis=0 gives `(p,)` per column and axis=1 gives `(n,)` per row',
        'No axis argument reduces everything to a scalar',
        '`keepdims=True` leaves a length-1 axis so the result broadcasts back against the original',
      ],
      bonusSignals: ['mentions tuple axes for multi-axis reductions', 'mentions that NaN propagates unless you use the nan- variants', 'distinguishes max from argmax'],
      sampleExplanation:
        'Stop thinking of axis 0 as "rows" or "columns" and think of it as the direction that gets deleted. Take a table of shape `(3, 4)`. If you say `axis=0`, axis 0 is gone and the answer has shape `(4,)`: four numbers, one per column, each summarising down the three rows. If you say `axis=1`, axis 1 is gone and the answer has shape `(3,)`: one per row. Say nothing and every axis goes, leaving a single number. That rule scales without modification: on a `(2, 3, 4)` array, `axis=1` leaves `(2, 4)`, and you can pass a tuple like `axis=(0, 2)` to delete several at once, which is exactly how per-channel image statistics are computed. The companion idea is `keepdims=True`, which keeps the deleted axis as a stub of length 1 instead of removing it. You want that whenever the summary is going back into an expression with the original array, because `(n, 1)` stretches across the columns while a bare `(n,)` does not and raises a broadcasting error. Two extras worth knowing: a single NaN turns any ordinary reduction into NaN by design, so use `np.nanmean` when data can be missing; and `max` gives you the value while `argmax` gives you the position, which is the difference between the confidence and the predicted class.',
    },
  },

  {
    id: 'NP-009',
    domain: 'NP',
    module: 'Maths on Arrays',
    topic: 'Changing shape',
    title: 'Reshaping, Stacking and Splitting',
    slug: 'reshaping-and-stacking',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['NP-002', 'NP-004'],
    related: ['NP-007', 'NP-008'],
    tags: ['reshape', 'ravel', 'flatten', 'transpose', 'newaxis', 'concatenate', 'stack', 'split'],

    learningObjectives: [
      'Reshape an array, including with `-1`, and state why the element count must be preserved',
      'Distinguish `ravel` from `flatten` and `reshape` views from copies',
      'Add and remove length-1 axes deliberately with `newaxis`, `expand_dims` and `squeeze`',
      'Choose correctly between `concatenate`, `stack`, `vstack`, `hstack` and `split`, and predict the resulting shape',
    ],

    terminology: [
      {
        term: 'reshape',
        definition:
          'Reinterprets the same elements under a new shape whose product equals the original size. Returns a view when the data can be read in the new order without moving, otherwise a copy.',
        simple: 'Rearranging the same numbers into a different grid, without changing what or how many they are.',
      },
      {
        term: 'C order',
        definition:
          'Row-major element ordering, in which the last axis varies fastest. It is the default for reshaping, ravelling and iteration in NumPy.',
        simple: 'Read across each row, then move to the next row.',
      },
      {
        term: 'ravel versus flatten',
        definition:
          '`ravel` returns a 1-D view when possible and a copy otherwise; `flatten` always returns a copy. Both produce the same values.',
        simple: 'Two ways to lay an array out flat — one is cheap when it can be, the other always duplicates.',
      },
      {
        term: 'transpose',
        definition:
          'Permutes the axes, so `.T` on a 2-D array swaps rows and columns. It is a view with reordered strides; the data is never moved.',
        simple: 'Looking at the table sideways without retyping it.',
      },
      {
        term: 'concatenate versus stack',
        definition:
          '`concatenate` joins arrays along an axis that already exists, keeping ndim the same. `stack` creates a new axis, increasing ndim by one.',
        simple: 'Joining end to end versus putting them in a new pile.',
      },
    ],

    simpleExplanation:
      "An array is a flat run of numbers plus a description of how to read it, so changing the description is cheap and changing the numbers is not. That is the key to this whole unit. `arr.reshape(3, 4)` does not move anything; it says \"read these twelve values as three rows of four\", and the only hard rule is that the new shape must account for exactly as many elements as you started with — 3 times 4 must equal 12. If you write `-1` for one of the dimensions, NumPy works it out for you, so `reshape(-1, 1)` on twelve values means \"one column, however many rows that takes\", which is twelve. `ravel` goes the other way and lays everything back out flat. `.T` swaps the axes so rows become columns, again without moving data. The second half of the unit is joining and splitting. `concatenate` glues arrays together along an axis that already exists, so two `(3, 4)` tables become one `(6, 4)` table. `stack` is different: it makes a new axis, so those same two tables become one `(2, 3, 4)` block. Almost every mistake here is picking the one you did not mean, and the shape tells you immediately which one you got.",

    whyItExists:
      'Libraries disagree about shapes: scikit-learn wants a 2-D `X`, a loss function wants a flat vector, a convolution wants channels in a particular position, and batches must be assembled from individual samples. Reshaping and stacking exist so those conversions cost metadata changes rather than data copies, and so assembling a batch from a list of samples is one call instead of a loop.',

    analogy: {
      scenario:
        'Think of a long ribbon of printed numbers and a set of cardboard frames with different grids cut into them. Laying a three-by-four frame over the ribbon shows the numbers as three rows of four; swapping to a four-by-three frame shows exactly the same ribbon differently. Nothing is reprinted, and no frame can show more or fewer numbers than the ribbon has. Joining is a separate act: you can glue two ribbons end to end and get one longer ribbon, or you can lay them side by side in a folder and now you have a collection of two ribbons, which is not the same thing at all.',
      mapping: [
        { from: 'The printed ribbon', to: 'The flat data buffer, which reshaping never touches' },
        { from: 'Swapping the cardboard frame', to: '`reshape`, which changes only shape and strides' },
        { from: 'A frame that would need more numbers than the ribbon has', to: '`ValueError: cannot reshape array of size 12 into shape (5,3)`' },
        { from: 'Gluing two ribbons end to end', to: '`concatenate`, which extends an existing axis and keeps ndim' },
        { from: 'Filing two ribbons as a collection of two', to: '`stack`, which adds a new axis and raises ndim by one' },
      ],
      bridge:
        'The frame makes the central fact concrete: reshaping is a change of interpretation, which is why it is free and why it cannot invent or discard elements. The gluing-versus-filing distinction is exactly `concatenate` versus `stack`, and the shape tells you unambiguously which you did — a longer axis means gluing, a new axis means filing. When someone is confused about why their batch has shape `(64, 28, 28)` rather than `(1792, 28)`, this is always the distinction they missed.',
      limitations:
        'Frames suggest every reinterpretation is free. Some are not: reshaping an array whose memory is no longer laid out in the order you are asking for — a transposed array, for instance — forces NumPy to copy, which is why `arr.T.reshape(-1)` can be far more expensive than it looks.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'One buffer, many shapes',
        caption: 'The twelve values never move. Only the description of how to read them changes.',
        art: `flat buffer (C order, last axis varies fastest)

  0  1  2  3  4  5  6  7  8  9 10 11

 reshape(3, 4)          reshape(4, 3)          reshape(2, 2, 3)
  [ 0  1  2  3]          [ 0  1  2]             block 0: [0 1 2]
  [ 4  5  6  7]          [ 3  4  5]                      [3 4 5]
  [ 8  9 10 11]          [ 6  7  8]             block 1: [6 7 8]
                         [ 9 10 11]                      [9 10 11]

 reshape(-1, 1)  -> shape (12, 1)   a column
 reshape(1, -1)  -> shape (1, 12)   a row
 reshape(-1)     -> shape (12,)     flat again
 reshape(5, 3)   -> ValueError: cannot reshape array of size 12 into shape (5,3)


 joining two arrays a and b, each shape (2, 3)

   np.concatenate([a, b], axis=0) -> (4, 3)   existing axis grows
   np.concatenate([a, b], axis=1) -> (2, 6)   existing axis grows
   np.stack([a, b], axis=0)       -> (2, 2, 3)  NEW axis created
   np.stack([a, b], axis=2)       -> (2, 3, 2)  new axis at the end`,
      },
      {
        kind: 'table',
        title: 'Which joining function, and what it does to ndim',
        caption: 'The single question to ask: does the axis I am joining along already exist?',
        columns: ['Call', 'Inputs', 'Result', 'ndim'],
        rows: [
          ['`np.concatenate([a, b], axis=0)`', 'two `(2, 3)`', '`(4, 3)`', 'unchanged'],
          ['`np.concatenate([a, b], axis=1)`', 'two `(2, 3)`', '`(2, 6)`', 'unchanged'],
          ['`np.stack([a, b])`', 'two `(2, 3)`', '`(2, 2, 3)`', 'increased by 1'],
          ['`np.vstack([a, b])`', 'two `(3,)`', '`(2, 3)`', 'increased for 1-D inputs'],
          ['`np.hstack([a, b])`', 'two `(3,)`', '`(6,)`', 'unchanged'],
          ['`np.column_stack([a, b])`', 'two `(3,)`', '`(3, 2)`', 'increased by 1'],
          ['`np.split(x, 3, axis=0)`', 'one `(6, 4)`', 'three `(2, 4)`', 'unchanged per piece'],
        ],
      },
      {
        kind: 'compare',
        title: 'ravel versus flatten, and when reshape copies',
        caption: 'Prefer the cheap one unless you specifically need independence.',
        left: {
          heading: '`ravel()` and `reshape()`',
          points: [
            'Return a view whenever the new reading order matches memory',
            'Cost O(1) in that case; nothing is copied',
            'Writing through the result changes the original',
            'Fall back to a copy silently when a view is impossible',
            '`arr.T.ravel()` is one such fallback',
          ],
        },
        right: {
          heading: '`flatten()` and `copy()`',
          points: [
            'Always allocate a new buffer',
            'Cost O(n) in time and memory',
            'Writing through the result is safe',
            'Predictable, which is sometimes worth the price',
            'Use when the flat version will be modified',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Reshape an array and watch the elements land',
        caption: 'Change the target shape and see which value ends up where under C order.',
        widget: 'ndarray-explorer',
      },
    ],

    formalDefinition:
      '`reshape` returns an array with a new shape whose product equals the original size, reading elements in C order by default. It returns a view when the requested shape can be expressed with valid strides over the existing buffer, and a copy otherwise. `transpose` permutes axes by permuting shape and strides, always a view. `concatenate` joins a sequence of arrays along an existing axis, requiring all other axis lengths to match, and preserves ndim. `stack` inserts a new axis of length equal to the number of inputs, requiring all inputs to share one shape, and increases ndim by one.',

    math: {
      intuition:
        'Reshaping is a relabelling of indices, not a change of contents, so the only invariant that must hold is the number of elements. The C-order rule tells you exactly which multi-index a flat position corresponds to.',
      formulas: [
        {
          latex: '\\prod_k d_k^{\\text{new}} = \\prod_k d_k^{\\text{old}}',
          name: 'The reshape constraint',
          meaning: 'The new shape must account for exactly the same number of elements; a single -1 is solved for from this equation.',
          variables: [
            { symbol: 'd_k^{\\text{old}}', meaning: 'Length of axis k before reshaping' },
            { symbol: 'd_k^{\\text{new}}', meaning: 'Length of axis k after reshaping' },
          ],
        },
        {
          latex: 'f = i_0 d_1 d_2 + i_1 d_2 + i_2 \\quad \\Longleftrightarrow \\quad i_2 = f \\bmod d_2,\; i_1 = \\lfloor f/d_2 \\rfloor \\bmod d_1,\; i_0 = \\lfloor f/(d_1 d_2) \\rfloor',
          name: 'Flat position and multi-index in C order',
          meaning: 'Reshaping keeps the flat position f fixed and recomputes the multi-index from the new shape, which is why the last axis varies fastest.',
          variables: [
            { symbol: 'f', meaning: 'Position in the flat buffer, from 0 to size-1' },
            { symbol: 'i_k', meaning: 'Index along axis k' },
            { symbol: 'd_k', meaning: 'Length of axis k in the shape being used' },
          ],
        },
      ],
      derivation: [
        'Reshaping twelve elements to (3, 4): element f = 6 has i1 = 6 mod 4 = 2 and i0 = 6 // 4 = 1, so it appears at row 1, column 2.',
        'Reshaping the same twelve to (4, 3): now i1 = 6 mod 3 = 0 and i0 = 6 // 3 = 2, so the same value appears at row 2, column 0.',
        'Nothing moved in memory; only the arithmetic mapping index to position changed, which is why reshape is O(1).',
        'Solving for a -1 uses the constraint directly: reshaping size 12 to (-1, 4) needs the unknown to satisfy k * 4 = 12, so k = 3.',
        'If no integer solves it — reshaping size 12 to (-1, 5) — NumPy raises, because 12 is not divisible by 5.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Reshaping, -1, and the error when the count does not work out',
        runnable: true,
        code: `import numpy as np

a = np.arange(12)
print(a.reshape(3, 4))
print(a.reshape(3, 4).reshape(2, 2, 3).shape)
print(a.reshape(-1, 1).shape)     # column vector
print(a.reshape(1, -1).shape)     # row vector
print(a.reshape(3, -1).shape)     # NumPy solves for 4

try:
    a.reshape(5, 3)
except ValueError as e:
    print("ValueError:", e)

# reshape is usually a view
b = a.reshape(3, 4)
b[0, 0] = 99
print("original changed:", a[0])
print("b is a view?", b.base is not None)`,
        output: `[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
(2, 2, 3)
(12, 1)
(1, 12)
(3, 4)
ValueError: cannot reshape array of size 12 into shape (5,3)
original changed: 99
b is a view? True`,
        explanation:
          'The `-1` means "work this one out from the total", and at most one axis may use it. The `ValueError` is the constraint being enforced: 5 times 3 is 15, and there are only 12 elements, so there is no honest interpretation. The last three lines make the cheapness concrete — reshape returned a view, so writing into `b` changed `a`, which is both the reason it is fast and a reason to be careful.',
      },
      {
        language: 'python',
        title: 'Flattening, transposing and adding axes',
        runnable: true,
        code: `import numpy as np

m = np.arange(6).reshape(2, 3)

print("ravel  :", m.ravel(), "view?", m.ravel().base is not None)
print("flatten:", m.flatten(), "view?", m.flatten().base is not None)

print("transpose shape:", m.T.shape, "view?", m.T.base is not None)
print(m.T)
print("T.ravel():", m.T.ravel())          # reads column-wise, so it copies

v = np.array([1, 2, 3])
print("v          :", v.shape)
print("v[:, None] :", v[:, np.newaxis].shape)
print("v[None, :] :", v[np.newaxis, :].shape)
print("expand_dims:", np.expand_dims(v, axis=0).shape)
print("squeeze    :", np.squeeze(np.zeros((1, 3, 1))).shape)`,
        output: `ravel  : [0 1 2 3 4 5] view? True
flatten: [0 1 2 3 4 5] view? False
transpose shape: (3, 2) view? True
[[0 3]
 [1 4]
 [2 5]]
T.ravel(): [0 3 1 4 2 5]
v          : (3,)
v[:, None] : (3, 1)
v[None, :] : (1, 3)
expand_dims: (1, 3)
squeeze    : (3,)`,
        explanation:
          '`ravel` gave a view and `flatten` a copy, which is the only difference between them and the reason to prefer `ravel` unless you plan to modify the result. The transpose is also a view — only the strides were swapped — but `m.T.ravel()` must copy, because reading a transposed array in C order means jumping around the buffer. `np.newaxis` inserts a length-1 axis wherever you put it, and `squeeze` removes all the length-1 axes, which is how you undo a `keepdims` or clean up after an API that returns `(n, 1)`.',
      },
      {
        language: 'python',
        title: 'Joining: concatenate versus stack',
        runnable: true,
        code: `import numpy as np

a = np.zeros((2, 3))
b = np.ones((2, 3))

print("concat axis=0:", np.concatenate([a, b], axis=0).shape)
print("concat axis=1:", np.concatenate([a, b], axis=1).shape)
print("stack  axis=0:", np.stack([a, b], axis=0).shape)
print("stack  axis=2:", np.stack([a, b], axis=2).shape)

print("vstack:", np.vstack([a, b]).shape)
print("hstack:", np.hstack([a, b]).shape)

# The idiomatic way to build a batch from a list of samples
samples = [np.full((28, 28), i, dtype=np.float32) for i in range(4)]
batch = np.stack(samples)
print("batch:", batch.shape, batch.dtype)

# Adding a bias column to a design matrix
X = np.arange(6).reshape(3, 2).astype(float)
Xb = np.hstack([np.ones((3, 1)), X])
print("with bias column:\\n", Xb)`,
        output: `concat axis=0: (4, 3)
concat axis=1: (2, 6)
stack  axis=0: (2, 2, 3)
stack  axis=2: (2, 3, 2)
vstack: (4, 3)
hstack: (2, 6)
batch: (4, 28, 28) float32
with bias column:
 [[1. 0. 1.]
 [1. 2. 3.]
 [1. 4. 5.]]`,
        explanation:
          '`concatenate` extended an axis that already existed and left ndim at 2; `stack` invented a new axis and produced a 3-D array. The batch example is the everyday use of `stack`: four separate 28x28 images become one `(4, 28, 28)` array, which is exactly what a model expects, and doing it with `concatenate` would have given `(112, 28)` instead. The bias column shows `hstack` in its most common role, and note that the column of ones had to be `(3, 1)` rather than `(3,)` for the shapes to agree.',
      },
      {
        language: 'python',
        title: 'Splitting an array back apart',
        runnable: true,
        code: `import numpy as np

data = np.arange(24).reshape(6, 4)

parts = np.split(data, 3, axis=0)
print([p.shape for p in parts])

left, right = np.split(data, [2], axis=1)
print("left:", left.shape, "right:", right.shape)

# Uneven pieces need array_split
print([p.shape for p in np.array_split(np.arange(10), 3)])

try:
    np.split(np.arange(10), 3)
except ValueError as e:
    print("ValueError:", e)

# Splitting features from a target, keeping X 2-D
X, y = data[:, :-1], data[:, -1]
print("X:", X.shape, "y:", y.shape)`,
        output: `[(2, 4), (2, 4), (2, 4)]
left: (6, 2) right: (6, 2)
[(4,), (3,), (3,)]
ValueError: array split does not result in an equal division
X: (6, 3) y: (6,)`,
        explanation:
          'Passing an integer to `split` demands an exact division and raises otherwise, which is a feature — it catches the case where your data length changed unexpectedly. `array_split` is the forgiving version and distributes the remainder across the first pieces. Passing a list of indices instead cuts at those positions, which is how you separate a matrix into blocks of unequal width. The last pattern is worth memorising: slicing off the final column with `-1` collapses the axis, giving `y` of shape `(n,)`, while `:-1` keeps `X` two-dimensional.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feeding a single sample to a model',
        usage:
          'A model trained on batches expects `(batch, features)`, so a single sample of shape `(features,)` must become `(1, features)` via `x.reshape(1, -1)` or `x[np.newaxis, :]`. This is the single most common inference-time shape fix.',
      },
      {
        context: 'Flattening images for a dense layer',
        usage:
          'A batch of `(64, 28, 28)` images becomes `(64, 784)` with `imgs.reshape(len(imgs), -1)` — the `-1` computes 784 so the code survives a change of image size.',
      },
      {
        context: 'Assembling a dataset from files',
        usage:
          'Loading images one at a time into a list and then calling `np.stack(images)` builds the batch axis in one step, avoiding the quadratic cost of repeatedly concatenating.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: 'The advice in its error messages — "Reshape your data using array.reshape(-1, 1)" — is exactly this unit.' },
      { tool: 'PyTorch', role: '`view` is the strict version of reshape that refuses to copy, and `permute` generalises transpose; `unsqueeze` is `np.expand_dims`.' },
      { tool: 'pandas', role: '`df.values.reshape(...)` and `np.column_stack` are how DataFrame columns become model-ready matrices.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `concatenate` when you meant `stack`',
        why: 'Concatenating four `(28, 28)` images along axis 0 gives `(112, 28)`, a single tall image, rather than the `(4, 28, 28)` batch you wanted. Nothing raises, and the model fails much later.',
        fix: 'Ask whether the axis you want already exists. If you are creating a batch axis that did not exist, use `np.stack`.',
      },
      {
        mistake: 'Assuming `reshape` always returns a view',
        why: 'It returns a view only when the requested order can be expressed with strides over the existing memory. After a transpose or a non-contiguous slice it silently copies, which can be a large hidden cost in a loop.',
        fix: 'Check `result.base is not None` when it matters, or call `np.ascontiguousarray` once before repeated reshaping of transposed data.',
      },
      {
        mistake: 'Expecting `arr.T` to transpose a 1-D array',
        why: 'Transposing reverses the axis order, and a 1-D array has only one axis, so `.T` returns the array unchanged. Many people use it to make a column vector and are puzzled when nothing happens.',
        fix: 'Use `arr[:, np.newaxis]` or `arr.reshape(-1, 1)` to obtain a genuine column vector of shape `(n, 1)`.',
      },
      {
        mistake: 'Growing an array in a loop with `np.concatenate`',
        why: 'Each call allocates a new array and copies everything accumulated so far, so building n rows costs O(n squared) copying — often slower than the pure-Python version it replaced.',
        fix: 'Append to a Python list and call `np.stack` or `np.concatenate` once at the end, or preallocate with `np.empty` and assign into slices.',
      },
      {
        mistake: 'Reshaping to fix a broadcasting error without checking the order of values',
        why: 'Reshaping `(3, 4)` to `(4, 3)` makes a shape complaint disappear while scrambling which value belongs to which row, producing a silent correctness bug instead of a loud shape bug.',
        fix: 'Only reshape when the element ordering is genuinely what you want. To swap the meaning of two axes, use `transpose`, which preserves the association between values and positions.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does `-1` mean in `reshape`, and how many can you use?',
        answer:
          'It means "infer this dimension from the total number of elements". Since the product of the new shape must equal the array size, at most one axis can be unknown, and NumPy solves for it by dividing. So `arr.reshape(-1, 1)` on twelve elements gives shape `(12, 1)`, and `arr.reshape(3, -1)` gives `(3, 4)`. Using two `-1` values raises `ValueError: can only specify one unknown dimension`, and a shape that does not divide evenly, such as `reshape(-1, 5)` on twelve elements, also raises.',
        followUp:
          'A strong answer notes that `reshape(len(x), -1)` is the robust way to flatten everything but the batch axis, because it survives a change in image size.',
      },
      {
        level: 'intermediate',
        question: 'What is the difference between `np.concatenate` and `np.stack`?',
        answer:
          '`concatenate` joins arrays along an axis that already exists, so ndim is unchanged and only that axis grows: two `(2, 3)` arrays along axis 0 give `(4, 3)`. All other axis lengths must match. `stack` inserts a brand-new axis whose length is the number of arrays, so ndim increases by one: the same two arrays give `(2, 2, 3)`, and every input must have identical shape. In practice `stack` is what you want when building a batch from individual samples, and `concatenate` is what you want when combining batches or adding columns. The shape of the result tells you immediately which one you actually used.',
      },
      {
        level: 'ml-engineer',
        question: 'When does `reshape` copy, and why should you care?',
        answer:
          'It copies whenever the requested reading order cannot be expressed as strides over the existing buffer. The common trigger is non-contiguous memory: after `arr.T` or a stepped slice, reading in C order means jumping around, so `arr.T.reshape(-1)` allocates a full copy while `arr.reshape(-1)` does not. It matters for two reasons. Performance, because a hidden O(n) copy inside a per-batch function can dominate a training loop, and correctness expectations, because code written assuming a view will silently stop propagating writes when the copy path is taken. I would check `result.base is not None` or `arr.flags.C_CONTIGUOUS`, and if repeated reshaping is needed, call `np.ascontiguousarray` once up front so the copy is paid for deliberately rather than every iteration.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Turn a `(100,)` array into a `(100, 1)` column two different ways, and explain why `.T` is not one of them.',
        hint: 'A column needs two axes; transposing cannot create an axis that does not exist.',
        language: 'python',
        starterCode: 'import numpy as np\n\nv = np.arange(100)\n',
        solution:
          'import numpy as np\n\nv = np.arange(100)\ncol_a = v.reshape(-1, 1)\ncol_b = v[:, np.newaxis]\nprint(col_a.shape, col_b.shape)   # (100, 1) (100, 1)\nprint(v.T.shape)                  # (100,) - unchanged\n\n`.T` reverses the order of the existing axes, and a 1-D array has only one, so there is nothing to reverse. Creating a column requires adding an axis, which is what `reshape(-1, 1)`, `np.newaxis` and `np.expand_dims(v, 1)` all do.',
      },
      {
        prompt: 'You have a list of 50 images, each `(32, 32, 3)`. Produce one array of shape `(50, 32, 32, 3)` and explain which joining function you used and why.',
        hint: 'Does the axis of length 50 already exist in any of the inputs?',
        solution:
          'import numpy as np\nbatch = np.stack(images)          # or np.stack(images, axis=0)\nprint(batch.shape)                # (50, 32, 32, 3)\n\n`stack` is correct because the batch axis does not exist in any input — each image is 3-D and the result must be 4-D. `np.concatenate(images, axis=0)` would instead give `(1600, 32, 3)` by gluing the images along their height axis, which is a valid array and completely wrong. Building the list first and stacking once is also far faster than concatenating inside the loop, which would copy quadratically.',
      },
      {
        prompt: 'Explain why `arr.reshape(-1)` on a `(3, 4)` array is free, while `arr.T.reshape(-1)` on the same array copies.',
        hint: 'What order does reshape read in, and does that match how the elements sit in memory?',
        solution:
          '`reshape` reads in C order, meaning the last axis varies fastest. A freshly created `(3, 4)` array is stored exactly that way, so flattening is just a relabelling: the view has the same buffer, shape `(12,)` and stride 8.\n\n`arr.T` has shape `(4, 3)` and strides `(8, 32)` — the same buffer read column-wise. Flattening it in C order requires the sequence 0, 4, 8, 1, 5, 9, ..., which no single stride can produce, so NumPy allocates a new contiguous buffer and copies the values in the requested order. You can see this with `arr.T.reshape(-1).base is None`, which is True, and with `arr.T.flags.C_CONTIGUOUS`, which is False.',
      },
    ],

    quiz: [
      {
        id: 'NP-009-q1',
        type: 'code-output',
        language: 'python',
        concept: 'reshape with -1',
        prompt: 'What shape does this print?',
        code: 'import numpy as np\na = np.arange(20)\nprint(a.reshape(5, -1).shape)',
        options: ['(5, 4)', '(5, 20)', '(5, -1)', 'It raises a ValueError'],
        answerIndex: 0,
        explanation:
          'The product of the new shape must equal 20, so the unknown axis is solved as 20 / 5 = 4. At most one axis may be given as -1.',
      },
      {
        id: 'NP-009-q2',
        type: 'mcq',
        concept: 'stack versus concatenate',
        prompt: 'You have three arrays of shape `(4, 4)`. Which call gives a result of shape `(3, 4, 4)`?',
        options: [
          '`np.stack([a, b, c])`',
          '`np.concatenate([a, b, c], axis=0)`',
          '`np.hstack([a, b, c])`',
          '`np.concatenate([a, b, c], axis=1)`',
        ],
        answerIndex: 0,
        explanation:
          '`stack` creates a new leading axis of length 3. The concatenate options extend an existing axis, giving `(12, 4)` or `(4, 12)` instead.',
      },
      {
        id: 'NP-009-q3',
        type: 'truefalse',
        concept: 'transpose on 1-D',
        prompt: 'Calling `.T` on an array of shape `(5,)` returns an array of shape `(1, 5)`.',
        answer: false,
        explanation:
          'Transposing reverses the existing axes, and a 1-D array has only one, so `.T` returns it unchanged. Use `arr[np.newaxis, :]` or `reshape(1, -1)` to add an axis.',
      },
      {
        id: 'NP-009-q4',
        type: 'mcq',
        concept: 'ravel versus flatten',
        prompt: 'What is the difference between `arr.ravel()` and `arr.flatten()`?',
        options: [
          '`ravel` returns a view when it can; `flatten` always copies',
          '`ravel` works only on 2-D arrays',
          '`flatten` reads in column order while `ravel` reads in row order',
          'They are aliases for the same function',
        ],
        answerIndex: 0,
        explanation:
          'Both produce the same values in C order. `ravel` avoids copying when the memory layout allows, so it is cheaper; `flatten` always allocates, so its result is always safe to modify.',
      },
      {
        id: 'NP-009-q5',
        type: 'debug',
        language: 'python',
        concept: 'building a batch',
        prompt: 'This produces shape `(112, 28)` instead of the intended `(4, 28, 28)`. What is the fix?',
        code: 'import numpy as np\nimages = [np.zeros((28, 28)) for _ in range(4)]\nbatch = np.concatenate(images, axis=0)',
        options: [
          'Use `np.stack(images)`, which creates the new batch axis',
          'Use `np.concatenate(images, axis=1)`',
          'Use `np.hstack(images)`',
          'Reshape the result to `(4, 28, 28)` afterwards',
        ],
        answerIndex: 0,
        explanation:
          'Concatenate glued the images along their existing height axis. A batch axis does not exist in any input, so it must be created, which is exactly what `stack` does.',
      },
      {
        id: 'NP-009-q6',
        type: 'order',
        concept: 'assembling a design matrix',
        prompt: 'Order these steps for turning a list of per-sample feature vectors into a design matrix with a leading bias column.',
        items: [
          'Collect the per-sample vectors into a Python list',
          'Call np.stack(rows) once to build an (n, p) matrix',
          'Create a column of ones with np.ones((n, 1))',
          'Join the two with np.hstack to get (n, p + 1)',
          'Check the resulting shape before passing it to a model',
        ],
        explanation:
          'Accumulate in a list and convert once, since repeated concatenation is quadratic. The ones column must be `(n, 1)` rather than `(n,)` for hstack to align it as a column.',
      },
    ],

    flashcards: [
      { front: 'What does `-1` mean in reshape?', back: 'Infer this axis from the total element count. At most one axis may be -1, and the product must match the original size exactly.' },
      { front: 'concatenate versus stack', back: '`concatenate` extends an existing axis and keeps ndim; `stack` creates a new axis and raises ndim by one. Use stack to build a batch.' },
      { front: '`ravel` versus `flatten`', back: 'Both flatten to 1-D in C order; `ravel` returns a view when possible, `flatten` always copies.' },
      { front: 'Why does `.T` not turn `(5,)` into a column?', back: 'Transpose reverses existing axes and a 1-D array has only one. Use `v[:, np.newaxis]` or `v.reshape(-1, 1)`.' },
      { front: 'When does reshape copy?', back: 'When the requested C-order reading cannot be expressed with strides over the current buffer, typically after a transpose or a stepped slice.' },
      { front: 'How do you remove all length-1 axes?', back: '`np.squeeze(arr)`, or `np.squeeze(arr, axis=k)` to remove one specific axis. It is the inverse of `expand_dims` and of `keepdims`.' },
    ],

    challenge: {
      title: 'An image-batch pipeline, shapes tracked at every step',
      brief:
        'Simulate ten greyscale images of shape `(28, 28)` from a seeded generator. Build a batch of shape `(10, 28, 28)`, add a channel axis to get `(10, 28, 28, 1)`, flatten to `(10, 784)` for a dense layer, split into a training set of seven and a validation set of three, and finally reassemble the two sets back into the original order. Print the shape after every step, and assert with `np.array_equal` that the reassembled array matches the original batch. At each step state in a comment whether the operation was a view or a copy.',
      language: 'python',
      acceptanceCriteria: [
        'Uses `stack` for the batch axis and `expand_dims` or `newaxis` for the channel axis',
        'Flattening uses `-1` rather than a hard-coded 784',
        'Splitting and rejoining are exact, verified by `np.array_equal`',
        'Every step prints its resulting shape',
        'Comments correctly classify at least three steps as view or copy',
      ],
      starterCode: 'import numpy as np\n\nrng = np.random.default_rng(9)\nimages = [rng.random((28, 28)) for _ in range(10)]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how to change the shape of an array and how to join arrays together, including the mistake that produces the wrong shape silently.',
      mustCover: [
        'Reshape reinterprets the same buffer, so the element count must be preserved',
        '`-1` asks NumPy to work one dimension out from the total',
        'Reshape and transpose are usually views, and `flatten` is always a copy',
        '`concatenate` extends an existing axis while `stack` creates a new one',
      ],
      bonusSignals: ['mentions C order and why the last axis varies fastest', 'mentions that `.T` does nothing to a 1-D array', 'warns against concatenating inside a loop'],
      sampleExplanation:
        'An array is a flat run of numbers plus a note saying how to read them, so reshaping only edits the note. `arr.reshape(3, 4)` says read these twelve values as three rows of four, and the only rule is that the new shape must account for exactly the elements you have — asking for five by three out of twelve values raises, because there is no honest way to do it. Writing `-1` for one dimension asks NumPy to solve for it, so `reshape(-1, 1)` makes a single column however long that turns out to be. Because only the note changed, reshaping and transposing usually hand you a view onto the same numbers, which is why they are instant and why writing into the result changes the original. Joining is where people go wrong. `concatenate` glues arrays along an axis that already exists, so two three-by-four tables become one six-by-four table and the result is still two-dimensional. `stack` invents a new axis, so those same two tables become a `(2, 3, 4)` block. If you are building a batch of images, you want `stack` — concatenating four 28-by-28 images gives you one tall 112-by-28 image instead, no error is raised, and the failure surfaces much later. Whenever you join, print the shape immediately and check it is what you meant.',
    },
  },

  {
    id: 'NP-010',
    domain: 'NP',
    module: 'Linear Algebra',
    topic: 'Matrix operations',
    title: 'Matrix Operations with NumPy',
    slug: 'matrix-operations-with-numpy',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['NP-009'],
    related: ['NP-006', 'NP-007', 'NP-008'],
    tags: ['matmul', 'dot-product', 'linalg', 'inverse', 'solve', 'norm', 'eigenvalues'],

    learningObjectives: [
      'Distinguish element-wise `*` from matrix multiplication `@`, and say when each is correct',
      'Check whether two matrices can be multiplied and state the result shape before running',
      'Compute a dot product, a matrix product and a norm, and explain what each measures',
      'Use `np.linalg.solve` rather than `np.linalg.inv`, and explain why that is the professional default',
    ],

    terminology: [
      {
        term: 'Dot product',
        definition:
          'For two vectors of equal length, the sum of their element-wise products. It produces a single number that measures how much the vectors point in the same direction.',
        simple: 'Multiply matching entries, add them all up, get one number.',
      },
      {
        term: 'Matrix product',
        definition:
          'For `A` of shape `(n, k)` and `B` of shape `(k, m)`, the `(n, m)` matrix whose entry (i, j) is the dot product of row i of A with column j of B.',
        simple: 'Every row of the first meets every column of the second.',
      },
      {
        term: 'Inner dimensions',
        definition:
          'The two dimensions that must agree for a matrix product: the columns of the left operand and the rows of the right. They cancel, leaving the outer dimensions as the result shape.',
        simple: 'The numbers that must match in the middle and then disappear.',
      },
      {
        term: 'Norm',
        definition:
          'A measure of the size of a vector or matrix. The default `np.linalg.norm` is the Euclidean (L2) length, the square root of the sum of squares.',
        simple: 'How long the arrow is.',
      },
      {
        term: 'Singular matrix',
        definition:
          'A square matrix with no inverse, because its rows or columns are linearly dependent. Its determinant is zero and `np.linalg.inv` raises `LinAlgError`.',
        simple: 'A matrix that squashes space flat, so the transformation cannot be undone.',
      },
    ],

    simpleExplanation:
      "Up to now every operation has been element-wise: `A * B` multiplies each entry of A by the entry in the same position of B. Matrix multiplication is a different operation with a different symbol, `@`, and it combines whole rows with whole columns instead. To get the entry in row 2, column 3 of `A @ B`, you take row 2 of A and column 3 of B, multiply them together position by position, and add up the results — that single number is a dot product, and the whole matrix product is a grid of them. This is why the shapes have to fit a certain way: a row of A and a column of B can only be paired up if they are the same length, so A must have as many columns as B has rows. Write the shapes next to each other, `(n, k)` and `(k, m)`, and the two k values must match; they cancel, leaving `(n, m)`. That single check catches almost every linear algebra error before you run anything. The rest of the unit is the small set of tools built on top — lengths with `norm`, solving systems with `solve`, and eigenvalues — which is the vocabulary every model in the curriculum is written in.",

    whyItExists:
      'Nearly every model is a composition of linear maps: a linear regression prediction, a neural network layer, a PCA projection and a rotation are all matrix products. NumPy provides `@` and `np.linalg` so those operations dispatch to decades-old optimised BLAS and LAPACK libraries, which are far faster and far more numerically careful than anything written by hand, and so that the code looks like the mathematics it implements.',

    analogy: {
      scenario:
        'Think of a recipe costing sheet. One table lists, for each of three cakes, how much flour, sugar and butter it needs. Another lists, for each ingredient, the price at two different suppliers. To find what each cake costs at each supplier, you take one cake row of quantities, line it up against one supplier column of prices, multiply each pair and add: one number per cake-supplier combination. The two tables can only be combined this way because the ingredient list is shared — it is the thing that appears in both, and it vanishes from the answer.',
      mapping: [
        { from: 'The cakes-by-ingredients table', to: 'Matrix A of shape `(3, 3)`: rows are outputs, columns are the shared dimension' },
        { from: 'The ingredients-by-suppliers table', to: 'Matrix B of shape `(3, 2)`: rows are the shared dimension, columns are outputs' },
        { from: 'Lining one row against one column and summing', to: 'A dot product, producing one entry of the result' },
        { from: 'The ingredient list, shared and then gone', to: 'The inner dimension k, which must match and cancels' },
        { from: 'The final cakes-by-suppliers table', to: 'The result of shape `(3, 2)`' },
      ],
      bridge:
        'The costing sheet explains the shape rule rather than asking you to memorise it: you can only combine the tables through a column heading of one that matches the row heading of the other, and that shared heading does not appear in the answer. That is exactly why `(n, k) @ (k, m)` gives `(n, m)`, and why swapping the order usually fails or means something entirely different — costing suppliers by cakes is not the same question.',
      limitations:
        'The costing analogy makes matrix multiplication feel like bookkeeping. It is also geometry: a matrix is a transformation that rotates, scales and shears space, and `A @ B` is the composition of two transformations. Eigenvalues and the singular case only make sense in that second picture, which is why the linear algebra domain returns to it properly.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'The shape rule, drawn',
        caption: 'Inner dimensions must match and cancel; outer dimensions survive.',
        art: `   A            B              A @ B
 (2 x 3)  @  (3 x 4)   ->    (2 x 4)
      ^        ^
      +--------+  these must be equal; they cancel

 row i of A  .  col j of B  =  entry (i, j) of the result

    [ a b c ]     [ p s ]
    [ d e f ]  @  [ q t ]   =   [ a*p+b*q+c*r   a*s+b*t+c*u ]
                  [ r u ]       [ d*p+e*q+f*r   d*s+e*t+f*u ]


 ELEMENT-WISE is a different operation entirely

    [1 2]     [5 6]      [ 5 12]        [1 2]     [5 6]      [19 22]
    [3 4]  *  [7 8]  =   [21 32]        [3 4]  @  [7 8]  =   [43 50]

    same position                       rows meet columns`,
      },
      {
        kind: 'table',
        title: 'Shape arithmetic for products',
        caption: 'Do this check before every matrix operation you write.',
        columns: ['Left', 'Right', 'Result', 'Note'],
        rows: [
          ['`(2, 3)`', '`(3, 4)`', '`(2, 4)`', 'Inner 3s match and cancel'],
          ['`(2, 3)`', '`(4, 3)`', 'ValueError', 'Inner 3 and 4 disagree; transpose the right operand'],
          ['`(3,)`', '`(3,)`', '`()` scalar', 'Two 1-D arrays give the dot product'],
          ['`(2, 3)`', '`(3,)`', '`(2,)`', 'Matrix times vector; the vector is treated as a column'],
          ['`(3,)`', '`(3, 4)`', '`(4,)`', 'Vector times matrix; treated as a row'],
          ['`(10, 2, 3)`', '`(10, 3, 4)`', '`(10, 2, 4)`', 'Batched: leading axes broadcast, last two multiply'],
          ['`(n, p)`', '`(p, 1)`', '`(n, 1)`', 'The prediction step of linear regression'],
        ],
      },
      {
        kind: 'widget',
        title: 'See a matrix as a transformation',
        caption: 'Apply a matrix to the plane and watch what it does to the unit square.',
        widget: 'matrix-transform',
      },
      {
        kind: 'widget',
        title: 'Build a dot product term by term',
        caption: 'Multiply matching entries and accumulate, and watch the geometric meaning appear.',
        widget: 'dot-product',
      },
      {
        kind: 'compare',
        title: 'inv versus solve',
        caption: 'Both answer Ax = b. Only one of them is the right habit.',
        left: {
          heading: '`x = np.linalg.inv(A) @ b`',
          points: [
            'Computes the full inverse, then multiplies',
            'Roughly three times the arithmetic of solve',
            'Amplifies floating-point error, badly on ill-conditioned A',
            'Fails loudly on a singular matrix, which is at least honest',
            'Reasonable only if you genuinely need the inverse itself',
          ],
        },
        right: {
          heading: '`x = np.linalg.solve(A, b)`',
          points: [
            'Factorises A and back-substitutes; never forms the inverse',
            'Faster, especially as n grows',
            'More numerically stable for the same problem',
            'Raises `LinAlgError` on a singular matrix',
            'The correct default for solving a linear system',
          ],
        },
      },
    ],

    formalDefinition:
      'For `A` of shape `(n, k)` and `B` of shape `(k, m)`, the matrix product `A @ B` is the `(n, m)` array with entries given by the sum over the shared index of the products of corresponding entries. The operator `@` invokes `np.matmul`, which for 1-D operands computes the inner product and for stacks of matrices broadcasts the leading axes while multiplying the trailing two. Element-wise `*` is an entirely separate ufunc requiring broadcast-compatible shapes. `np.linalg` wraps LAPACK routines for factorisation, inversion, determinants, eigendecomposition and least squares.',

    math: {
      intuition:
        'A dot product asks how much one vector points along another: pair up the coordinates, multiply, and add. A matrix product is a grid of dot products, one for every pairing of a row of the left operand with a column of the right, and a matrix-vector product is the special case that applies a transformation to a point.',
      formulas: [
        {
          latex: '\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{n} a_i b_i = \\|\\mathbf{a}\\|\\,\\|\\mathbf{b}\\|\\cos\\theta',
          name: 'Dot product',
          meaning: 'Sum of the products of corresponding entries, which also equals the product of the lengths times the cosine of the angle between the vectors.',
          variables: [
            { symbol: 'a_i, b_i', meaning: 'The i-th components of the two vectors' },
            { symbol: 'n', meaning: 'Their shared length; the operation is undefined if they differ' },
            { symbol: '\\|\\mathbf{a}\\|', meaning: 'Euclidean length of a, computed by `np.linalg.norm`' },
            { symbol: '\\theta', meaning: 'Angle between the vectors; the dot product is zero exactly when they are perpendicular' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '(AB)_{ij} = \\sum_{k=1}^{p} A_{ik} B_{kj}',
          name: 'Matrix product',
          meaning: 'Entry (i, j) of the product is the dot product of row i of A with column j of B, which is why the inner dimensions must agree.',
          variables: [
            { symbol: 'A_{ik}', meaning: 'Entry of A at row i, column k, with A of shape (n, p)' },
            { symbol: 'B_{kj}', meaning: 'Entry of B at row k, column j, with B of shape (p, m)' },
            { symbol: 'k', meaning: 'The shared inner index summed over and eliminated' },
            { symbol: '(AB)_{ij}', meaning: 'Entry of the result, which has shape (n, m)' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_i x_i^2}, \\qquad \\|\\mathbf{x}\\|_1 = \\sum_i |x_i|',
          name: 'L2 and L1 norms',
          meaning: 'The L2 norm is ordinary Euclidean length and is the default in NumPy; the L1 norm sums absolute values and is what drives sparsity in Lasso regularisation.',
          variables: [
            { symbol: 'x_i', meaning: 'Component i of the vector' },
            { symbol: '\\|\\mathbf{x}\\|_2', meaning: 'Euclidean norm, `np.linalg.norm(x)`' },
            { symbol: '\\|\\mathbf{x}\\|_1', meaning: 'Manhattan norm, `np.linalg.norm(x, ord=1)`' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'A\\mathbf{v} = \\lambda \\mathbf{v}',
          name: 'Eigenvalue equation',
          meaning: 'An eigenvector is a direction the matrix does not rotate — applying A only scales it, by the factor lambda.',
          variables: [
            { symbol: 'A', meaning: 'A square matrix, the transformation being analysed' },
            { symbol: '\\mathbf{v}', meaning: 'An eigenvector, a non-zero direction preserved by A' },
            { symbol: '\\lambda', meaning: 'The corresponding eigenvalue, the scaling factor along that direction' },
          ],
          category: 'linear-algebra',
        },
      ],
      derivation: [
        'Start with the prediction of a linear model for one sample: y = w1*x1 + w2*x2 + ... + wp*xp, which is exactly the dot product of the weight vector with the feature vector.',
        'Stack n samples as the rows of X, of shape (n, p), and keep w of shape (p,).',
        'Each row of X must meet w, so the inner dimensions are p and p, which match and cancel, leaving n predictions of shape (n,).',
        'That single expression `X @ w` therefore computes all n predictions at once, with no loop, and dispatches to BLAS.',
        'Fitting reverses the question: given X and y, find w. The normal equations give w = inv(X.T @ X) @ X.T @ y, but the numerically sound version is `np.linalg.lstsq(X, y)`, which never forms that inverse.',
      ],
    },

    workedExample: {
      title: 'Fitting a line three ways, and comparing them',
      setup:
        'Take five points that lie almost on a straight line. Fit the intercept and slope by solving the normal equations with an explicit inverse, by using `np.linalg.solve`, and by using `np.linalg.lstsq`. The three should agree to many decimal places, and the reasons to prefer the last one become concrete.',
      steps: [
        {
          label: 'Build the design matrix',
          detail: 'With x of shape `(5,)`, stack a column of ones beside it so the intercept is just another weight: `X = np.column_stack([np.ones(5), x])`, shape `(5, 2)`.',
          latex: 'X \\in \\mathbb{R}^{5\\times 2}, \\qquad \\mathbf{w} = (w_0, w_1)^\\top',
        },
        {
          label: 'Check the shapes of the normal equations',
          detail: '`X.T` is `(2, 5)`, so `X.T @ X` is `(2, 2)` and `X.T @ y` is `(2,)`. A 2x2 system in two unknowns, exactly as expected.',
          latex: 'X^\\top X \\,\\mathbf{w} = X^\\top \\mathbf{y}',
        },
        {
          label: 'Solve it the naive way',
          detail: '`w = np.linalg.inv(X.T @ X) @ (X.T @ y)` forms the inverse explicitly. It works here because the system is tiny and well conditioned.',
        },
        {
          label: 'Solve it properly',
          detail: '`w = np.linalg.solve(X.T @ X, X.T @ y)` factorises instead of inverting: fewer operations and better conditioned. The answer matches to about fifteen significant figures.',
        },
        {
          label: 'Skip the normal equations entirely',
          detail: '`w, *_ = np.linalg.lstsq(X, y, rcond=None)` uses a QR or SVD factorisation of X directly. This avoids squaring the condition number, which is what `X.T @ X` does, and is the method a library would use.',
          latex: '\\kappa(X^\\top X) = \\kappa(X)^2',
        },
        {
          label: 'Verify the fit',
          detail: 'Predictions are `X @ w`, residuals are `y - X @ w`, and the residual norm is `np.linalg.norm(y - X @ w)`. A small norm relative to the norm of y means the line explains the data.',
        },
      ],
      conclusion:
        'All three agree on well-conditioned data, which is why the naive version survives in tutorials. The difference appears when the features are nearly collinear: forming `X.T @ X` squares the condition number, so a matrix that loses six digits of precision becomes one that loses twelve, and the explicit inverse loses more still. The habit to build is `solve` over `inv`, and `lstsq` over the normal equations, because the cost of the good habit is zero and the cost of the bad one is occasionally the whole answer.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Element-wise versus matrix multiplication',
        runnable: true,
        code: `import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("A * B (element-wise):\\n", A * B)
print("A @ B (matrix):\\n", A @ B)
print("np.dot(A, B) is the same:\\n", np.dot(A, B))

print("A @ B == B @ A ?", np.array_equal(A @ B, B @ A))

v = np.array([1, 0])
print("A @ v:", A @ v, "shape", (A @ v).shape)

u = np.array([3, 4])
print("dot u.u :", u @ u)
print("norm u  :", np.linalg.norm(u))

C = np.arange(6).reshape(2, 3)
try:
    A @ C.T
except ValueError as e:
    print("ValueError:", e)`,
        output: `A * B (element-wise):
 [[ 5 12]
 [21 32]]
A @ B (matrix):
 [[19 22]
 [43 50]]
np.dot(A, B) is the same:
 [[19 22]
 [43 50]]
A @ B == B @ A ? False
A @ v: [1 3] shape (2,)
dot u.u : 25
norm u  : 5.0
ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 3 is not equal to size 2)`,
        explanation:
          'The first two results are the whole point: `*` multiplies matching positions while `@` pairs rows with columns, and the numbers are not remotely the same. Matrix multiplication is not commutative, which `A @ B != B @ A` demonstrates in two lines. `u @ u` is the sum of squares, 9 + 16 = 25, and its square root is the norm — that relationship is why the dot product of a vector with itself is its squared length. The final error message is worth reading closely: `(n?,k),(k,m?)` is the shape signature being enforced, and it tells you exactly which dimension disagreed.',
      },
      {
        language: 'python',
        title: 'Solving a linear system, and why not to use inv',
        runnable: true,
        code: `import numpy as np

A = np.array([[3.0, 1.0],
              [1.0, 2.0]])
b = np.array([9.0, 8.0])

x_solve = np.linalg.solve(A, b)
x_inv = np.linalg.inv(A) @ b

print("solve:", x_solve)
print("inv  :", x_inv)
print("check A @ x == b?", np.allclose(A @ x_solve, b))

print("det   :", np.linalg.det(A))
print("inverse:\\n", np.linalg.inv(A).round(4))
print("A @ inv(A):\\n", (A @ np.linalg.inv(A)).round(10))

singular = np.array([[1.0, 2.0], [2.0, 4.0]])
print("singular det:", np.linalg.det(singular))
try:
    np.linalg.inv(singular)
except np.linalg.LinAlgError as e:
    print("LinAlgError:", e)`,
        output: `solve: [2. 3.]
inv  : [2. 3.]
check A @ x == b? True
det   : 5.000000000000001
inverse:
 [[ 0.4 -0.2]
 [-0.2  0.6]]
A @ inv(A):
 [[ 1. -0.]
 [ 0.  1.]]
singular det: 0.0
LinAlgError: Singular matrix`,
        explanation:
          'Both routes give the same answer on a tiny well-behaved system, which is why the `inv` habit persists. `solve` is nonetheless the correct default: it factorises and back-substitutes rather than computing an inverse it then throws away, using about a third of the arithmetic and losing less precision. Notice `det` returning 5.000000000000001 rather than 5 — a reminder that these are floating-point computations, which is also why testing `det == 0` for singularity is unreliable and `np.linalg.matrix_rank` or the condition number is the better check. The second matrix has its second row equal to twice the first, so it is singular and has no inverse.',
      },
      {
        language: 'python',
        title: 'Norms, distances and a linear model end to end',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(4)
n = 50
x = np.linspace(0, 10, n)
y = 2.5 * x + 1.0 + rng.normal(0, 1.0, n)

X = np.column_stack([np.ones(n), x])          # (50, 2)
print("X:", X.shape, "y:", y.shape)

w = np.linalg.lstsq(X, y, rcond=None)[0]
print("fitted intercept, slope:", w.round(3))

pred = X @ w                                   # (50,)
resid = y - pred
print("residual norm:", np.linalg.norm(resid).round(3))
print("RMSE         :", (np.linalg.norm(resid) / np.sqrt(n)).round(3))

# Norms of different orders
v = np.array([3.0, -4.0])
print("L2:", np.linalg.norm(v), "L1:", np.linalg.norm(v, ord=1), "Linf:", np.linalg.norm(v, ord=np.inf))

# Eigenvalues of a symmetric matrix
S = np.array([[2.0, 1.0], [1.0, 2.0]])
vals, vecs = np.linalg.eigh(S)
print("eigenvalues :", vals)
print("eigenvectors:\\n", vecs.round(3))
print("check A v = lambda v:", np.allclose(S @ vecs[:, 1], vals[1] * vecs[:, 1]))`,
        output: `X: (50, 2) y: (50,)
fitted intercept, slope: [0.888 2.513]
residual norm: 6.742
RMSE         : 0.953
L2: 5.0 L1: 7.0 Linf: 4.0
eigenvalues : [1. 3.]
eigenvectors:
 [[-0.707  0.707]
 [ 0.707  0.707]]
check A v = lambda v: True`,
        explanation:
          'This is the whole domain arriving at one place. The design matrix is built by stacking, the prediction is a matrix-vector product whose shape you can check by hand — `(50, 2) @ (2,)` gives `(50,)` — and the error is measured with a norm. The fitted values recover the true intercept 1.0 and slope 2.5 to within the noise, which is the sanity check to run on any synthetic fit. The eigen-decomposition uses `eigh` rather than `eig` because the matrix is symmetric: `eigh` is faster and returns real values in ascending order, while `eig` can return complex results even for a matrix you know to be symmetric.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A neural network layer',
        usage:
          '`Z = X @ W + b` with `X` of shape `(batch, in_features)` and `W` of shape `(in_features, out_features)` is the forward pass of a dense layer. Every deep learning framework is built around making this one operation fast.',
      },
      {
        context: 'Recommendation and similarity search',
        usage:
          'Cosine similarity between a query embedding and a matrix of item embeddings is one matrix-vector product after normalising, which is how a search over a million items runs in milliseconds.',
      },
      {
        context: 'Principal component analysis',
        usage:
          'PCA computes the eigenvectors of the covariance matrix, or equivalently the singular vectors of the centred data, then projects with a matrix product. `np.linalg.eigh` and `np.linalg.svd` are the exact calls involved.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: 'Linear models, PCA and kernel methods are thin layers over these `np.linalg` routines, which are themselves LAPACK.' },
      { tool: 'PyTorch', role: '`@` works identically on tensors, and `torch.linalg` mirrors this API, so the shape reasoning transfers to GPU code unchanged.' },
      { tool: 'SciPy', role: '`scipy.linalg` adds specialised factorisations and sparse solvers for systems too large for a dense inverse.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `*` where `@` was meant',
        why: 'For two square matrices of the same size, `*` runs without error and produces the element-wise product, so the bug is silent. The numbers are simply wrong, often in a way that still trains a model badly rather than crashing.',
        fix: 'Reserve `*` for element-wise scaling and always use `@` for matrix products. If both operands are matrices and the intent is composition, `@` is correct.',
      },
      {
        mistake: 'Getting the operand order wrong: `W @ X` instead of `X @ W`',
        why: 'Matrix multiplication is not commutative, so the order encodes meaning. With `X` of shape `(batch, features)` and `W` of `(features, units)`, only `X @ W` has matching inner dimensions.',
        fix: 'Write the shapes down before typing the expression, and let the inner-dimension rule pick the order for you rather than trying alternatives until one runs.',
      },
      {
        mistake: 'Computing `np.linalg.inv(A) @ b` to solve a system',
        why: 'It performs about three times the arithmetic of a direct solve and amplifies floating-point error, which matters badly when the matrix is ill conditioned — exactly the case where you most need a correct answer.',
        fix: 'Use `np.linalg.solve(A, b)` for square systems and `np.linalg.lstsq(X, y)` for least squares. Compute an explicit inverse only when the inverse itself is the deliverable.',
      },
      {
        mistake: 'Testing singularity with `det(A) == 0`',
        why: 'The determinant is computed in floating point and scales with the size of the entries, so a genuinely singular matrix can return 1e-18 and a perfectly invertible one can return a tiny value too.',
        fix: 'Use `np.linalg.matrix_rank(A)` or check the condition number with `np.linalg.cond(A)`; a condition number near 1/eps means the results cannot be trusted.',
      },
      {
        mistake: 'Confusing `(n,)` with `(n, 1)` in matrix expressions',
        why: 'NumPy treats a 1-D operand as a row or a column depending on its position, which is convenient until it silently changes the result shape: `X @ w` gives `(n,)` while `X @ w.reshape(-1, 1)` gives `(n, 1)`.',
        fix: 'Pick one convention for the codebase and check shapes after every product. Keeping targets as `(n,)` and weights as `(p,)` is the scikit-learn convention and causes the fewest surprises.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between `A * B` and `A @ B` in NumPy?',
        answer:
          '`*` is element-wise multiplication: entry (i, j) of the result is `A[i, j] * B[i, j]`, and the shapes must be equal or broadcast-compatible. `@` is matrix multiplication: entry (i, j) is the dot product of row i of A with column j of B, so A must have as many columns as B has rows and the result has shape `(rows of A, columns of B)`. The dangerous part is that for two square matrices of the same size both operations run without error and return different answers, so a mistake here is silent. `np.dot` behaves like `@` for 2-D inputs, but `@` is clearer and is the modern idiom.',
        followUp:
          'A strong answer adds that `@` is not commutative, so `A @ B` and `B @ A` generally differ even when both are legal.',
      },
      {
        level: 'intermediate',
        question: 'Why should you prefer `np.linalg.solve(A, b)` over `np.linalg.inv(A) @ b`?',
        answer:
          'Both compute x in Ax = b, but forming the inverse is the wrong route. `solve` performs an LU factorisation and two triangular back-substitutions, costing roughly a third of the arithmetic of computing a full inverse and then multiplying. More importantly it is numerically better conditioned: explicitly inverting amplifies rounding error, and for an ill-conditioned matrix that can cost several digits of accuracy in the answer. Forming an inverse is only justified when the inverse itself is the deliverable, for instance when reporting a covariance matrix of parameter estimates, and even then a factorisation-based route is usually better.',
      },
      {
        level: 'ml-engineer',
        question: 'A linear regression fitted through the normal equations gives wildly unstable coefficients. What is happening and what would you do?',
        answer:
          'Almost certainly multicollinearity: two or more features are nearly linear combinations of each other, so `X.T @ X` is close to singular. Forming that product squares the condition number of X, so a design matrix that was merely awkward becomes numerically hopeless, and the coefficients swing enormously for tiny changes in the data. Diagnostics: `np.linalg.cond(X)`, the rank from `matrix_rank`, and the singular values from `np.linalg.svd`. Fixes, in order of preference: use `np.linalg.lstsq`, which factorises X directly and never forms the normal equations; add L2 regularisation, which makes the system well posed by adding a positive constant to the diagonal; or remove or combine the redundant features. The coefficients being unstable while the predictions remain fine is a classic signature of this problem.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For `A` of shape `(3, 5)` and `B` of shape `(5, 2)`, give the shapes of `A @ B`, `B.T @ A.T`, and say what `A @ A` does.',
        hint: 'Write the shapes side by side and check whether the inner dimensions match.',
        solution:
          '`A @ B` is `(3, 2)`: the inner 5s match and cancel.\n`B.T @ A.T` is `(2, 5) @ (5, 3)` giving `(2, 3)`, which is the transpose of the first result — the identity (AB) transposed equals B transposed times A transposed.\n`A @ A` raises: it would be `(3, 5) @ (3, 5)`, and the inner 5 and 3 disagree. Only a square matrix can be multiplied by itself.',
      },
      {
        prompt: 'Solve the system 2a + b = 5, a + 3b = 10 using NumPy, and verify the solution by substituting back.',
        hint: 'Build the coefficient matrix and the right-hand side, then use the function that avoids forming an inverse.',
        language: 'python',
        starterCode: 'import numpy as np\n\nA = np.array([[2.0, 1.0],\n              [1.0, 3.0]])\nb = np.array([5.0, 10.0])\n',
        solution:
          'import numpy as np\n\nA = np.array([[2.0, 1.0], [1.0, 3.0]])\nb = np.array([5.0, 10.0])\nx = np.linalg.solve(A, b)\nprint(x)                       # [1. 3.]\nprint(np.allclose(A @ x, b))   # True\n\nSo a = 1 and b = 3, which satisfies both equations: 2 + 3 = 5 and 1 + 9 = 10. Verifying with `np.allclose(A @ x, b)` rather than `==` is the right habit, because the solution is computed in floating point and an exact equality test can fail on a correct answer.',
      },
      {
        prompt: 'Write a function that computes the cosine similarity between a query vector `q` of shape `(d,)` and every row of a matrix `M` of shape `(n, d)`, returning shape `(n,)`, with no Python loop.',
        hint: 'Cosine similarity is a dot product divided by the product of the norms; `norm` takes an `axis` argument.',
        solution:
          'import numpy as np\n\ndef cosine_similarity(q, M):\n    return (M @ q) / (np.linalg.norm(M, axis=1) * np.linalg.norm(q))\n\n`M @ q` is `(n, d) @ (d,)`, giving `(n,)` — one dot product per row. `np.linalg.norm(M, axis=1)` reduces the feature axis, also giving `(n,)`, so the division is element-wise with no broadcasting subtleties. For repeated queries the efficient version normalises `M` once with `M / np.linalg.norm(M, axis=1, keepdims=True)` and then each query is a single matrix-vector product — note the `keepdims` there, for exactly the reason covered in the aggregation unit.',
      },
    ],

    quiz: [
      {
        id: 'NP-010-q1',
        type: 'code-output',
        language: 'python',
        concept: 'elementwise versus matmul',
        prompt: 'What does this print?',
        code: 'import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[1, 0], [0, 1]])\nprint(A * B)',
        options: [
          '[[1 0]\n [0 4]]',
          '[[1 2]\n [3 4]]',
          '[[1 2]\n [3 4]]\nwith a warning',
          'It raises a ValueError',
        ],
        answerIndex: 0,
        explanation:
          '`*` multiplies matching positions, so the zeros of the identity zero out the off-diagonal entries. `A @ B` with the identity would instead return A unchanged — a neat way to see that the two operators differ.',
      },
      {
        id: 'NP-010-q2',
        type: 'mcq',
        concept: 'shape rule',
        prompt: 'What is the shape of `A @ B` for `A` of shape `(4, 7)` and `B` of shape `(7, 3)`?',
        options: ['`(4, 3)`', '`(7, 7)`', '`(3, 4)`', 'It raises, because the shapes differ'],
        answerIndex: 0,
        explanation:
          'The inner dimensions are both 7, so they match and cancel, leaving the outer dimensions 4 and 3 as the result shape.',
      },
      {
        id: 'NP-010-q3',
        type: 'numeric',
        concept: 'dot product',
        prompt: 'What is the dot product of `[2, 3, 4]` and `[1, 0, 2]`?',
        answer: 10,
        explanation:
          'Multiply matching entries and add: 2*1 + 3*0 + 4*2 = 2 + 0 + 8 = 10. In NumPy this is `a @ b`, which returns a scalar for two 1-D arrays.',
      },
      {
        id: 'NP-010-q4',
        type: 'truefalse',
        concept: 'commutativity',
        prompt: 'For square matrices A and B of the same size, `A @ B` always equals `B @ A`.',
        answer: false,
        explanation:
          'Matrix multiplication is not commutative. The order encodes which transformation is applied first, so the two products are generally different matrices.',
      },
      {
        id: 'NP-010-q5',
        type: 'debug',
        language: 'python',
        concept: 'solve versus inv',
        prompt: 'This code works but is not the professional choice. What should replace it?',
        code: 'import numpy as np\nx = np.linalg.inv(A) @ b',
        options: [
          '`x = np.linalg.solve(A, b)`',
          '`x = np.linalg.det(A) * b`',
          '`x = A.T @ b`',
          '`x = np.linalg.norm(A) / b`',
        ],
        answerIndex: 0,
        explanation:
          '`solve` factorises and back-substitutes instead of forming an inverse, using roughly a third of the arithmetic and losing less precision, especially on ill-conditioned matrices.',
      },
      {
        id: 'NP-010-q6',
        type: 'match',
        concept: 'linalg vocabulary',
        prompt: 'Match each NumPy call to what it computes.',
        pairs: [
          { left: '`np.linalg.norm(v)`', right: 'The Euclidean length of a vector' },
          { left: '`np.linalg.solve(A, b)`', right: 'The x satisfying Ax = b' },
          { left: '`np.linalg.det(A)`', right: 'The signed volume scaling factor; zero means singular' },
          { left: '`np.linalg.eigh(S)`', right: 'Eigenvalues and eigenvectors of a symmetric matrix' },
          { left: '`np.linalg.lstsq(X, y)`', right: 'The least-squares fit without forming the normal equations' },
        ],
        explanation:
          'These five cover most of the linear algebra a data scientist writes directly. Reaching for `solve` and `lstsq` rather than `inv` is the habit worth forming early.',
      },
    ],

    flashcards: [
      { front: '`*` versus `@`', back: '`*` multiplies matching positions element-wise; `@` pairs rows of the left with columns of the right. Both run on same-size square matrices, so the mistake is silent.' },
      { front: 'The shape rule for `A @ B`', back: '`(n, k) @ (k, m)` gives `(n, m)`. The inner dimensions must match and they cancel; the outer ones survive.' },
      { front: 'What does a dot product measure?', back: 'The sum of products of matching entries, equal to the product of the lengths times the cosine of the angle. Zero means perpendicular.' },
      { front: 'Why prefer `solve` to `inv`?', back: 'It factorises and back-substitutes rather than forming an inverse: about a third of the arithmetic and noticeably better numerical stability.' },
      { front: 'How do you test whether a matrix is singular?', back: 'Not with `det == 0` in floating point. Use `np.linalg.matrix_rank` or check `np.linalg.cond` for a very large condition number.' },
      { front: 'What does `A v = lambda v` mean?', back: 'v is an eigenvector — a direction the matrix only scales, never rotates — and lambda is the scaling factor. `np.linalg.eigh` computes both for symmetric matrices.' },
    ],

    challenge: {
      title: 'Linear regression from first principles',
      brief:
        'Generate 200 samples with three features and a known weight vector plus noise, using a seeded generator. Fit the weights three ways: the explicit normal equations with `inv`, `np.linalg.solve` on the normal equations, and `np.linalg.lstsq` on the design matrix directly. Compare all three against the true weights and against each other, report the residual norm and RMSE, and print `np.linalg.cond` for both `X` and `X.T @ X`. Then deliberately make two features nearly collinear and repeat, showing which method degrades first. Every step must state the shapes involved in a comment.',
      language: 'python',
      acceptanceCriteria: [
        'All three fitting methods are implemented and compared numerically',
        'Condition numbers of both X and the normal-equations matrix are reported',
        'The collinear case is constructed deliberately and its effect is shown',
        'Residual norm and RMSE are computed with `np.linalg.norm`',
        'Comments state the shape of every matrix in each product',
      ],
      starterCode: 'import numpy as np\n\nrng = np.random.default_rng(17)\nn, p = 200, 3\nX_raw = rng.normal(size=(n, p))\ntrue_w = np.array([2.0, -1.5, 0.5])\n',
    },

    teachingPrompt: {
      prompt:
        'Explain the difference between element-wise and matrix multiplication, how to check whether a product is legal, and why `solve` is preferred over `inv`.',
      mustCover: [
        '`*` combines matching positions while `@` pairs rows with columns',
        'Each entry of a matrix product is a dot product of a row and a column',
        'Inner dimensions must match and cancel: `(n, k) @ (k, m)` gives `(n, m)`',
        '`np.linalg.solve` is faster and more stable than forming an inverse',
      ],
      bonusSignals: ['notes that `@` is not commutative', 'points out that `*` on two square matrices fails silently', 'connects `X @ w` to a model prediction'],
      sampleExplanation:
        'There are two multiplications and they are not variations of each other. `A * B` multiplies each entry by the entry in the same position, which is the operation you want for scaling. `A @ B` is matrix multiplication: to get the entry in row i, column j of the answer, you take row i of A and column j of B, multiply them position by position and add the results, which is a dot product. Because a row and a column can only be paired if they have the same length, A must have as many columns as B has rows — write the shapes side by side, `(n, k)` and `(k, m)`, and the two k values must match, cancel, and leave `(n, m)`. Doing that check on paper catches nearly every error before you run anything. The trap is that for two square matrices of the same size, `*` runs happily and gives the wrong answer with no complaint, so the intent has to come from you. Order matters too: `A @ B` is generally not `B @ A`, which is why a model prediction is written `X @ w` and not the reverse. Finally, when you need to solve a system, use `np.linalg.solve(A, b)` rather than `np.linalg.inv(A) @ b`. It factorises the matrix instead of computing an inverse it would immediately discard — about a third of the arithmetic, and noticeably less floating-point damage on matrices that are close to singular.',
    },
  },
];
