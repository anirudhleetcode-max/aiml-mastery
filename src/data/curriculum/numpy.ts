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
