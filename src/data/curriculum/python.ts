import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'PY-001',
    domain: 'PY',
    module: 'First Steps',
    topic: 'What a program is',
    title: 'Your First Python Program',
    slug: 'your-first-python-program',
    difficulty: 1,
    estimatedMinutes: 25,
    prerequisites: [],
    related: ['PY-002', 'PY-005'],
    tags: ['print', 'comments', 'interpreter', 'syntax', 'repl'],

    learningObjectives: [
      'Describe what a program is and what the Python interpreter does with your file',
      'Write and run a Python script that prints output to the screen',
      'Use comments to explain code to a future reader (usually yourself)',
      'Read a Python error message and identify which line caused it',
    ],

    terminology: [
      {
        term: 'Program',
        definition:
          'A file of instructions that a computer executes in order, from top to bottom, unless told otherwise.',
        simple: 'A list of steps you write down so the computer can follow them exactly.',
      },
      {
        term: 'Interpreter',
        definition:
          'The program (`python`) that reads your source file one statement at a time, translates it, and executes it immediately.',
        simple: 'The translator that reads your instructions and makes the computer do them.',
      },
      {
        term: 'Statement',
        definition: 'One complete instruction, normally occupying one line in Python.',
        simple: 'One single step in your list.',
      },
      {
        term: 'Syntax',
        definition:
          'The grammar rules of Python. Code that breaks them cannot run at all — the interpreter stops before executing anything.',
        simple: 'The spelling and punctuation rules the computer insists on.',
      },
      {
        term: 'Comment',
        definition:
          'Text after a `#` that Python ignores completely. It exists purely to explain intent to human readers.',
        simple: 'A note to a human that the computer skips over.',
      },
    ],

    simpleExplanation:
      "A computer is astonishingly fast and astonishingly literal. It will do exactly what you say, millions of times a second, and it will never guess what you meant. A program is the list of instructions you hand it. Python is a way of writing that list using words that look almost like English. When you run a Python file, a piece of software called the interpreter starts at line one, does what it says, moves to line two, and keeps going until it reaches the bottom. That is the whole idea. Everything else in this entire curriculum — every neural network, every model that recognises a face or writes a sentence — is built out of lists of instructions exactly like this one.",

    whyItExists:
      'Computers cannot be instructed in ordinary English, because English is ambiguous and computers cannot tolerate ambiguity. Python exists as a middle ground: precise enough for a machine to execute without guessing, readable enough that a human can hold it in their head. It became the default language of machine learning because researchers wanted to express mathematical ideas quickly without fighting the language.',

    analogy: {
      scenario:
        "Imagine writing instructions for someone making a sandwich who has never seen food before and follows orders with perfect, unthinking literalness. If you write 'put the peanut butter on the bread', they will place the closed jar on top of the loaf. They are not being difficult — they simply have no idea what you assumed. To get a sandwich, you must spell out every step in an exact order.",
      mapping: [
        { from: 'The extremely literal helper', to: 'The Python interpreter' },
        { from: 'Your written list of sandwich steps', to: 'Your `.py` source file' },
        { from: 'Doing the steps in order, one at a time', to: 'Sequential execution, top to bottom' },
        { from: 'A step written so badly it cannot be attempted at all', to: 'A SyntaxError, raised before anything runs' },
        { from: 'A note in brackets saying "(use crunchy)"', to: 'A `#` comment — read by humans, ignored by the machine' },
      ],
      bridge:
        'The analogy is precise where it matters: the interpreter really does execute one statement at a time in written order, and it really does have no model of your intent. When your code misbehaves, the useful question is almost never "why is Python being stupid" — it is "what did I actually say, as opposed to what did I mean?"',
      limitations:
        'The helper metaphor breaks down in one way worth knowing early: a human helper would stop and ask when confused, whereas Python either refuses outright (an error) or confidently does something useless. There is no middle "are you sure?" state.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What happens when you press run',
        caption: 'Every Python program you ever write travels this path.',
        steps: [
          { label: 'You write `hello.py`', detail: 'A plain text file containing Python statements.' },
          { label: '`python hello.py`', detail: 'You ask the interpreter to read that file.' },
          { label: 'Parse', detail: 'Python checks the grammar. A syntax error stops everything here — nothing runs.' },
          { label: 'Execute line by line', detail: 'Statements run top to bottom, in order.' },
          { label: 'Output appears', detail: '`print()` writes text to your terminal.' },
          { label: 'Program exits', detail: 'The interpreter reaches the end of the file and stops.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a print statement',
        subject: 'print("Hello, world!")',
        annotations: [
          { part: 'print', note: 'The name of a built-in function — a piece of behaviour Python already knows.' },
          { part: '( )', note: 'Parentheses mean "call it now". Without them you refer to the function but never run it.' },
          { part: '"Hello, world!"', note: 'A string: text wrapped in quotes so Python treats it as data, not as code.' },
        ],
      },
    ],

    formalDefinition:
      'A Python program is a sequence of statements stored in a source file, executed by the CPython interpreter in lexical order within a module namespace. The interpreter first compiles the entire module to bytecode — which is why a syntax error anywhere in the file prevents any of it from running — and then evaluates that bytecode statement by statement.',

    codeExamples: [
      {
        language: 'python',
        title: 'Hello, world',
        runnable: true,
        code: `# This line is a comment. Python ignores it entirely.
print("Hello, world!")
print("I am learning AI and machine learning.")`,
        output: `Hello, world!
I am learning AI and machine learning.`,
        explanation:
          'Two statements, executed in order. `print()` takes what is inside the parentheses and writes it to the terminal, then moves to a new line. The comment on line one never executes — it exists only so a human reading this file knows what is going on.',
      },
      {
        language: 'python',
        title: 'Printing several things at once',
        runnable: true,
        code: `print("2 + 2 is", 2 + 2)
print("Python", "is", "readable", sep="-")
print("no newline here...", end=" ")
print("...continued on the same line")`,
        output: `2 + 2 is 4
Python-is-readable
no newline here... ...continued on the same line`,
        explanation:
          '`print` accepts several values separated by commas and joins them with a space by default. `sep` changes that joining character and `end` changes what is printed after the last value — by default a newline. Notice that `2 + 2` was evaluated to `4` *before* printing: Python always works out the value of an expression first.',
      },
      {
        language: 'python',
        title: 'Reading an error message',
        code: `print("this line is fine")
print("this line is broken"`,
        output: `  File "hello.py", line 2
    print("this line is broken"
         ^
SyntaxError: '(' was never closed`,
        explanation:
          'Read error messages from the bottom up. The last line names the problem (`SyntaxError`), the line above shows where Python gave up, and the caret points at the offending character. Crucially, the first `print` did *not* run: a syntax error is found while compiling the whole file, before execution starts.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Training a model overnight',
        usage:
          'A training script is exactly this: statements in a file, executed top to bottom. `print()` calls scattered through it are how you find out, at 3 a.m., which epoch it reached before crashing.',
      },
      {
        context: 'A data-cleaning job in a company pipeline',
        usage:
          'A scheduled `.py` file runs each night to read yesterday\'s raw data, clean it and write it back. Nobody is watching it run, so its printed output becomes the log that gets read when something goes wrong.',
      },
      {
        context: 'Your own debugging',
        usage:
          'Long before you use a debugger, `print()` is how you answer "is this code even reached, and what does this variable hold right here?" Professionals still do this constantly.',
      },
    ],

    projectConnections: [
      { tool: 'python (CLI)', role: 'Runs every script, notebook kernel and training job you will write.' },
      { tool: 'logging', role: 'The production-grade successor to `print()`, covered in the MLOps domain.' },
      { tool: 'Jupyter / Colab', role: 'Runs the same statements interactively, one cell at a time, instead of one file at a time.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting the quotes: `print(Hello)`',
        why: 'Without quotes, Python reads `Hello` as the *name of a variable* rather than as text, and no such name exists yet, so you get a `NameError`.',
        fix: 'Quote anything you mean literally: `print("Hello")`. Quotes are the boundary between text-as-data and code.',
      },
      {
        mistake: 'Assuming the earlier lines ran before a syntax error',
        why: 'Python compiles the whole file before executing any of it, so a broken bracket on line 40 prevents line 1 from ever running.',
        fix: 'Fix syntax errors first, top to bottom. Only once the file parses does execution order matter.',
      },
      {
        mistake: 'Using smart quotes copied from a document: `print(“Hello”)`',
        why: 'Word processors and websites silently replace `"` with typographic quotes, which Python does not recognise as string delimiters.',
        fix: 'Type code in a code editor, not a document editor. If you must copy, retype the quotes.',
      },
      {
        mistake: 'Indenting a top-level statement for no reason',
        why: 'Python uses leading whitespace to express structure, so a stray space at the start of a line means "this belongs inside something" — and if there is nothing to belong to, you get an `IndentationError`.',
        fix: 'Top-level statements start at column zero. Let your editor show whitespace if this keeps happening.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between a compiled language and an interpreted language, and which is Python?',
        answer:
          'A compiled language such as C is translated ahead of time into machine code that the CPU runs directly. An interpreted language is translated and executed at run time by another program. Python sits in between: CPython compiles your source to bytecode and then an interpreter loop executes that bytecode. In everyday terms Python is interpreted — you run the source file directly, with no separate build step — which is why it is slower than C for tight numerical loops, and why libraries like NumPy push that work down into compiled code.',
        followUp:
          'A strong answer connects this to machine learning: it is exactly why "vectorise your loops" is advice you will hear constantly in the NumPy domain.',
      },
      {
        level: 'beginner',
        question: 'Your script prints nothing and shows a SyntaxError on line 30. Did lines 1–29 execute?',
        answer:
          'No. CPython compiles the entire module before executing any statement, so a syntax error anywhere in the file prevents the whole file from running. This is different from a run-time error such as `ZeroDivisionError`, which happens during execution — there, everything before the failing line genuinely did run, and any side effects it caused have already happened.',
      },
      {
        level: 'internship',
        question: 'Why is `print` debugging often criticised, and what would you use instead in production?',
        answer:
          '`print` writes unconditionally to stdout with no severity level, no timestamp, no module name, and no way to turn it off without editing code. In production you use the `logging` module, which gives you levels (DEBUG/INFO/WARNING/ERROR), configurable destinations and the ability to raise or lower verbosity without changing source. That said, `print` remains genuinely useful for quick local exploration, and pretending otherwise is posturing.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a program that prints your name on one line and your goal for this curriculum on the next.',
        hint: 'Two separate `print()` calls, each with its own string in quotes.',
        language: 'python',
        starterCode: '# Print your name, then your goal.\n',
        solution:
          'print("Anirudh")\nprint("Understand AI/ML deeply enough to build it and teach it.")\n\nEach `print` emits its text then a newline, so the two statements land on two lines. Any two strings are correct here — the point is getting comfortable running a file.',
      },
      {
        prompt: 'Predict the exact output of: `print("a", "b", sep="")` followed by `print("c")`. Then run it and check.',
        hint: 'What does `sep` control, and what does `print` add at the end by default?',
        solution:
          'The output is:\n\nab\nc\n\n`sep=""` joins `"a"` and `"b"` with nothing between them, producing `ab`. The default `end="\\n"` still applies, so a newline follows, and `c` appears on the next line. Predicting output before running it is the single best habit you can build this week.',
      },
      {
        prompt: 'Deliberately break a program: remove a closing parenthesis, run it, and write down which line Python blames and why.',
        hint: 'Read the traceback from the bottom upwards.',
        solution:
          'Python usually blames the line *after* the unclosed bracket, because it keeps reading forward hoping the expression will be completed. So an unclosed `(` on line 5 often reports an error on line 6 or later. The lesson: when a SyntaxError points at a line that looks perfectly fine, check the line above it.',
      },
    ],

    quiz: [
      {
        id: 'PY-001-q1',
        type: 'mcq',
        concept: 'execution model',
        prompt: 'In what order does Python execute the statements in a script?',
        options: [
          'Top to bottom, one statement at a time',
          'All at once, in parallel',
          'Bottom to top',
          'In alphabetical order of variable names',
        ],
        answerIndex: 0,
        explanation:
          'Execution is sequential: the interpreter evaluates one statement, then the next. Later in the curriculum, functions and loops will change *which* statement comes next — but never the principle that one thing happens at a time.',
      },
      {
        id: 'PY-001-q2',
        type: 'code-output',
        language: 'python',
        concept: 'print behaviour',
        prompt: 'What does this program print?',
        code: 'print("AI", "ML", sep="/")\nprint("done")',
        options: ['AI/ML\ndone', 'AI ML\ndone', 'AI/ML done', 'AI, ML\ndone'],
        answerIndex: 0,
        explanation:
          '`sep="/"` replaces the default space between the two values, giving `AI/ML`. The default `end="\\n"` is untouched, so `done` appears on the following line.',
      },
      {
        id: 'PY-001-q3',
        type: 'truefalse',
        concept: 'syntax errors',
        prompt: 'If line 50 of a 60-line script has a syntax error, lines 1–49 still run before the error appears.',
        answer: false,
        explanation:
          'False. The module is compiled in full before any statement executes, so a syntax error anywhere prevents the entire file from running. Run-time errors behave differently — there, earlier lines really have executed.',
      },
      {
        id: 'PY-001-q4',
        type: 'fill',
        concept: 'comments',
        prompt: 'Which single character starts a comment that Python ignores for the rest of the line?',
        answers: ['#', 'hash', 'pound', 'the hash symbol'],
        explanation:
          'A `#` makes Python skip everything after it on that line. Comments cost nothing at run time and are the cheapest documentation you will ever write.',
      },
      {
        id: 'PY-001-q5',
        type: 'debug',
        language: 'python',
        concept: 'strings vs names',
        prompt: 'This program raises `NameError: name \'Hello\' is not defined`. What is wrong?',
        code: 'print(Hello)',
        options: [
          '`Hello` is missing quotes, so Python looks for a variable with that name',
          '`print` should be capitalised as `Print`',
          'The line needs a semicolon at the end',
          'The file must be named `hello.py`',
        ],
        answerIndex: 0,
        explanation:
          'Unquoted words are names, not text. Python searched for a variable called `Hello`, found none, and raised `NameError`. Writing `print("Hello")` tells Python you mean the literal text.',
      },
      {
        id: 'PY-001-q6',
        type: 'explain',
        concept: 'interpreter model',
        prompt: 'In two or three sentences, explain to someone who has never programmed what happens between saving a `.py` file and seeing output on screen.',
        rubric: [
          'Mentions that a separate program (the interpreter) reads the file',
          'Mentions that statements are executed in order',
          'Mentions that output such as print() is what becomes visible',
        ],
        sampleAnswer:
          'When you run the file, a program called the Python interpreter opens it and checks that the grammar makes sense. If it does, the interpreter starts at the first line and carries out each instruction in turn, working downward. Whenever it meets a `print`, it writes that text to your terminal, which is the part you actually see.',
        explanation:
          'A good answer separates three things that beginners usually blur together: the file (instructions), the interpreter (the thing that acts), and the terminal (where results appear).',
      },
    ],

    flashcards: [
      { front: 'What does the Python interpreter do?', back: 'Reads your source file, compiles it to bytecode, then executes the statements one at a time in order.' },
      { front: 'What does `#` do?', back: 'Starts a comment. Python ignores everything after it on that line; it exists only for human readers.' },
      { front: 'Does a SyntaxError stop earlier lines from running?', back: 'Yes. The whole module is compiled before anything executes, so nothing in the file runs.' },
      { front: 'What do `sep` and `end` control in `print()`?', back: '`sep` is what goes between multiple values (default a space); `end` is what goes after the last one (default a newline).' },
      { front: 'Why does `print(Hello)` fail but `print("Hello")` work?', back: 'Without quotes Python treats `Hello` as a variable name and cannot find it. Quotes mark it as literal text.' },
    ],

    challenge: {
      title: 'A program that introduces itself',
      brief:
        'Write a single Python file that prints a small, neatly formatted introduction: your name, the date you started this curriculum, and the one sentence you would use to describe what you want to be able to do by 31 December. Use `sep` or `end` at least once to control the layout, and include at least two comments explaining your choices.',
      language: 'python',
      acceptanceCriteria: [
        'The file runs without errors',
        'Output spans at least three lines',
        'At least one `print` call uses `sep` or `end` deliberately',
        'At least two comments explain intent rather than restating the code',
      ],
      starterCode: '# My introduction to the AI/ML curriculum\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine years old and I have never written a line of code. Teach me what a program is and what happens when you run one.',
      mustCover: [
        'A program is an ordered list of instructions',
        'The computer follows them literally and cannot guess intent',
        'The interpreter is a separate program that reads and runs your file',
        'Statements execute in order, top to bottom',
      ],
      bonusSignals: ['uses a concrete everyday analogy', 'mentions errors as the computer refusing rather than misbehaving', 'gives a small example'],
      sampleExplanation:
        "A program is a list of instructions you write down for a computer, a bit like a recipe. The catch is that the computer follows the recipe with no common sense at all — if you say 'add the eggs' without saying 'crack them first', it will drop them in whole. To run your recipe you hand the file to a helper program called the Python interpreter. It starts at the very first line, does exactly what that line says, then moves to the next one, and keeps going until it reaches the bottom of the page. When one of the lines says `print`, the helper writes those words on the screen, which is how you see that anything happened at all.",
    },
  },

  {
    id: 'PY-002',
    domain: 'PY',
    module: 'First Steps',
    topic: 'Variables',
    title: 'Variables and Names',
    slug: 'variables-and-names',
    difficulty: 1,
    estimatedMinutes: 25,
    prerequisites: ['PY-001'],
    related: ['PY-003', 'PY-006', 'PY-013'],
    tags: ['variables', 'assignment', 'naming', 'references', 'mutability'],

    learningObjectives: [
      'Assign a value to a name and reuse it later in a program',
      'Explain that a Python variable is a name bound to an object, not a box holding a value',
      'Choose names that make code readable without needing comments',
      'Predict what happens when two names refer to the same object',
    ],

    terminology: [
      {
        term: 'Variable',
        definition: 'A name bound to an object in memory. The binding can be changed; the name itself carries no type.',
        simple: 'A label you stick onto a piece of data so you can find it again.',
      },
      {
        term: 'Assignment',
        definition: 'The `=` operation, which evaluates the expression on the right and binds the resulting object to the name on the left.',
        simple: 'Sticking the label on.',
      },
      {
        term: 'Object',
        definition: 'Every value in Python — numbers, text, lists — is an object with an identity, a type and a value.',
        simple: 'The actual thing the label is stuck to.',
      },
      {
        term: 'Rebinding',
        definition: 'Pointing an existing name at a different object. The old object is untouched and may be garbage collected if nothing else refers to it.',
        simple: 'Peeling the label off one thing and sticking it on another.',
      },
      {
        term: 'Identifier rules',
        definition: 'A valid name uses letters, digits and underscores, cannot start with a digit, and cannot be a reserved keyword such as `class` or `for`.',
        simple: 'The rules about what a label is allowed to be called.',
      },
    ],

    simpleExplanation:
      "When you work something out, you need a way to remember it. In Python you do that by giving the value a name: `score = 90` means 'from now on, the name score refers to the number 90'. Later you can write `score` anywhere you would have written 90, and Python looks it up for you. Here is the part that trips people up for years if nobody says it plainly: the name is not a box that contains the number. It is a label, like a sticky note, attached to a value that lives somewhere in memory. You can move the sticky note to a different value whenever you like, and you can stick two different sticky notes onto the very same value. Almost every confusing bug about 'why did my list change when I only modified the other one?' comes from forgetting this.",

    whyItExists:
      'Without names, every value would have to be written out literally at the exact moment it is used, and any result you computed would be lost immediately. Names let you compute something once, store it, and refer to it later by meaning rather than by value — which is what makes a program readable and changeable instead of a wall of magic numbers.',

    analogy: {
      scenario:
        "Think of a large library. The books are the values — they sit on shelves and physically exist. A name is a sticky label on a card in the catalogue that says 'the book I care about is at shelf 12B'. Moving the label to a different card does not move or destroy the book; it just changes which book you will find when you look that name up. And two catalogue cards can perfectly well point at the same physical book.",
      mapping: [
        { from: 'The physical book on the shelf', to: 'The object in memory (the value)' },
        { from: 'The catalogue label pointing at a shelf', to: 'The variable name and its binding' },
        { from: 'Re-writing a label to point elsewhere', to: 'Rebinding: `x = 5` then `x = 9`' },
        { from: 'Two cards pointing at one book', to: 'Two names referring to the same object (`b = a`)' },
        { from: 'Scribbling in the margin of the book itself', to: 'Mutating the object — visible through every name that points at it' },
      ],
      bridge:
        'The distinction between moving a label and writing in a book is exactly the distinction between rebinding (`a = [1, 2]`) and mutation (`a.append(3)`). Rebinding affects only that one name; mutation changes the shared object and is therefore visible through every name pointing at it. Holding this one picture in your head will save you hours later in the Pandas and NumPy domains, where accidental shared references are a classic source of silent bugs.',
      limitations:
        'The library analogy suggests values sit still and are always findable. In reality, once no name points at an object, Python quietly reclaims its memory — as if a book with no catalogue entry vanished.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What `score = 90 + 5` actually does',
        caption: 'The right-hand side is always fully evaluated before any name is bound.',
        steps: [
          { label: 'Evaluate `90 + 5`', detail: 'Python works out the expression, producing the integer object `95`.' },
          { label: 'Find or create the object', detail: 'An int object with value 95 now exists in memory.' },
          { label: 'Bind the name', detail: 'The name `score` in the current namespace is pointed at that object.' },
          { label: 'Later use', detail: 'Writing `score` looks the name up and gives you the object it points at.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Rebinding versus mutating',
        caption: 'The single most useful distinction in Python.',
        left: {
          heading: 'Rebinding — `a = [9]`',
          points: [
            'Points the name `a` at a brand-new object',
            'Any other name still points at the old object',
            'The old object is unchanged',
            'Works on every type, including immutable ones',
          ],
        },
        right: {
          heading: 'Mutating — `a.append(9)`',
          points: [
            'Changes the object `a` points at, in place',
            'Every name pointing at that object sees the change',
            'No new object is created',
            'Only possible on mutable types (list, dict, set)',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Naming that earns its keep',
        columns: ['Instead of', 'Write', 'Why'],
        rows: [
          ['`x = 0.001`', '`learning_rate = 0.001`', 'The name states the concept; the value states the setting.'],
          ['`d = {...}`', '`price_by_sku = {...}`', 'A name that says key-to-value removes the need for a comment.'],
          ['`temp2 = df`', '`cleaned_orders = df`', '"temp" tells the reader nothing and always outlives its temporariness.'],
          ['`l = [..]`', '`labels = [..]`', '`l` is visually indistinguishable from `1` in many fonts.'],
        ],
      },
    ],

    formalDefinition:
      'In Python, assignment binds a name in a namespace to a reference to an object. Names are untyped; objects carry the type. `=` evaluates its right-hand expression to an object and stores a reference to that object under the given name in the current scope, replacing any previous binding for that name.',

    codeExamples: [
      {
        language: 'python',
        title: 'Assigning, using and rebinding',
        runnable: true,
        code: `learning_rate = 0.01
epochs = 10

print("Training for", epochs, "epochs at lr =", learning_rate)

# Rebinding: the name now refers to a different value.
learning_rate = learning_rate / 10
print("Decayed learning rate:", learning_rate)

# Several names at once
width, height = 28, 28
print("Image has", width * height, "pixels")`,
        output: `Training for 10 epochs at lr = 0.01
Decayed learning rate: 0.001
Image has 784 pixels`,
        explanation:
          'Note line 7: the right-hand side `learning_rate / 10` is evaluated first using the *current* value, producing 0.001, and only then is the name rebound. Assignment is never circular, even when a name appears on both sides. The last example unpacks a tuple into two names in one statement — an idiom you will see constantly.',
      },
      {
        language: 'python',
        title: 'Two names, one object',
        runnable: true,
        code: `a = [1, 2, 3]
b = a            # b now points at the SAME list object

b.append(4)      # mutate the shared object
print("a is", a)
print("b is", b)
print("same object?", a is b)

b = [99]         # rebind b to a brand-new list
print("a is", a)
print("b is", b)
print("same object?", a is b)`,
        output: `a is [1, 2, 3, 4]
b is [1, 2, 3, 4]
same object? True
a is [1, 2, 3, 4]
b is [99]
same object? False`,
        explanation:
          'This is the whole lesson in eight lines. `b = a` copies the reference, not the list, so `b.append(4)` is visible through `a`. Then `b = [99]` rebinds only `b`; `a` still points at the original list. `is` asks "are these the same object?" while `==` asks "do these have the same value?" — a distinction interviewers love.',
      },
      {
        language: 'python',
        title: 'Names are untyped, objects are typed',
        runnable: true,
        code: `value = 42
print(type(value))

value = "forty-two"
print(type(value))

value = [4, 2]
print(type(value))`,
        output: `<class 'int'>
<class 'str'>
<class 'list'>`,
        explanation:
          'The name `value` never had a type — each object it pointed at did. This is dynamic typing. It is convenient, and it is also why a typo can silently change what a variable holds, which is why descriptive names and (later) type hints matter so much in real projects.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Hyperparameters at the top of a training script',
        usage:
          'Real ML scripts open with a block of named constants — `batch_size`, `learning_rate`, `num_epochs`. Naming them once and referring to them everywhere means tuning the model is a one-line change rather than a search-and-replace.',
      },
      {
        context: 'The classic pandas surprise',
        usage:
          '`df2 = df` does not copy a DataFrame; it makes a second name for the same object, so cleaning `df2` silently mutates `df`. This exact bug, caused by exactly the idea in this lesson, appears on Stack Overflow thousands of times a year.',
      },
      {
        context: 'Sharing state between functions',
        usage:
          'Passing a list into a function hands over a reference, not a copy — so a function that appends to its argument changes the caller\'s list. Knowing this is the difference between a deliberate design and a mystery.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.copy()` exists precisely because assignment shares references rather than duplicating data.' },
      { tool: 'NumPy', role: 'Array slices are *views* that share memory with the original — the same reference idea, one level deeper.' },
      { tool: 'PyTorch', role: 'Tensors are mutable objects; in-place operations like `x.add_()` change every reference at once.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing `b = a` copies the data',
        why: 'Assignment binds a second name to the same object. For immutable values you never notice; for lists, dicts and DataFrames it means edits appear in both places.',
        fix: 'When you truly want independence, copy explicitly: `b = a.copy()` (or `copy.deepcopy(a)` for nested structures).',
      },
      {
        mistake: 'Using `==` when you mean `is`, or the reverse',
        why: '`==` compares values, `is` compares identity. `[1,2] == [1,2]` is True while `[1,2] is [1,2]` is False, because they are two distinct objects that happen to look alike.',
        fix: 'Use `==` for almost everything. Reserve `is` for singletons — `is None`, `is True`, `is not None`.',
      },
      {
        mistake: 'Shadowing a built-in: `list = [1, 2, 3]`',
        why: 'The name `list` now refers to your data instead of the built-in type, so a later `list(range(3))` fails with `TypeError: \'list\' object is not callable`.',
        fix: 'Avoid `list`, `dict`, `set`, `str`, `sum`, `id`, `type`, `input`. Add a trailing underscore if you really want the word: `list_`.',
      },
      {
        mistake: 'One-letter names outside a two-line loop',
        why: 'Names are the cheapest documentation available, and a variable named `d` forces every future reader — including you in a month — to reconstruct its meaning from context.',
        fix: 'Name for the concept, not the type: `price_by_sku`, not `d`. Short names are fine when the scope is tiny and the meaning obvious (`for i in range(n)`).',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between `==` and `is` in Python?',
        answer:
          '`==` tests value equality by calling the object\'s `__eq__`, asking "do these represent the same thing?". `is` tests identity, asking "are these literally the same object in memory?". Two separately built lists with identical contents are `==` but not `is`. In practice you use `==` for comparisons and reserve `is` for `None`, `True` and `False`, which are guaranteed singletons.',
        followUp:
          'A strong candidate mentions that small integers and short strings are cached by CPython, so `a = 256; b = 256; a is b` can be True — which is an implementation detail and never something to rely on.',
      },
      {
        level: 'intermediate',
        question: 'A colleague writes `df_clean = df` then drops rows from `df_clean`, and is surprised that `df` changed too. Explain.',
        answer:
          'Assignment in Python binds a name to a reference, so `df_clean` and `df` point at the same DataFrame object. Any in-place mutation is therefore visible through both names. They should use `df_clean = df.copy()` to get an independent object, or better, use non-mutating operations that return a new DataFrame and assign the result. This is the same mechanism as `b = a` with a list — DataFrames are just a more expensive object to be surprised by.',
      },
      {
        level: 'internship',
        question: 'Is Python pass-by-value or pass-by-reference?',
        answer:
          'Neither label fits cleanly; the accurate description is "pass by assignment" — the function parameter is bound to the same object the caller passed. If that object is mutable and the function mutates it, the caller sees the change. If the function rebinds the parameter name, the caller sees nothing, because rebinding only affects the local name. So mutable arguments behave like pass-by-reference and rebinding behaves like pass-by-value, and both follow from the single rule that names are bound to objects.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Predict the output, then run it:\n\n```\nx = [1, 2]\ny = x\ny = y + [3]\nprint(x, y)\n```',
        hint: 'Does `y + [3]` modify the existing list, or build a new one?',
        language: 'python',
        solution:
          'It prints `[1, 2] [1, 2, 3]`.\n\n`y + [3]` creates a *new* list and rebinds `y` to it, leaving the original untouched. Contrast with `y += [3]`, which for lists calls `extend` and mutates in place — so that version would print `[1, 2, 3] [1, 2, 3]`. This asymmetry between `+` and `+=` on lists catches out experienced developers.',
      },
      {
        prompt: 'Rewrite this so a reader needs no comments:\n\n```\nn = 0.001  # step size\ne = 50     # passes over data\nb = 32\n```',
        hint: 'Let the names carry the meaning the comments are currently carrying.',
        solution:
          'learning_rate = 0.001\nnum_epochs = 50\nbatch_size = 32\n\nThe comments are now redundant, which is the goal: a comment that restates the code is a comment that will eventually contradict it. Save comments for *why*, not *what*.',
      },
      {
        prompt: 'Write three lines that leave `a` as `[1, 2, 3]` and `b` as `[1, 2, 3, 4]`, starting from `a = [1, 2, 3]`.',
        hint: 'You need `b` to be an independent object before you change it.',
        solution:
          'a = [1, 2, 3]\nb = a.copy()\nb.append(4)\n\n`a.copy()` (or `list(a)`, or `a[:]`) builds a new list with the same contents, so appending to `b` cannot affect `a`. Note that all three of these are *shallow* copies: for a list of lists you would need `copy.deepcopy`.',
      },
    ],

    quiz: [
      {
        id: 'PY-002-q1',
        type: 'code-output',
        language: 'python',
        concept: 'shared references',
        prompt: 'What does this print?',
        code: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)',
        options: ['[1, 2, 3]', '[1, 2]', '[3]', 'It raises an error'],
        answerIndex: 0,
        explanation:
          '`b = a` binds a second name to the same list object, so `b.append(3)` mutates the object both names refer to. `a` therefore shows the appended element.',
      },
      {
        id: 'PY-002-q2',
        type: 'mcq',
        concept: 'assignment semantics',
        prompt: 'What is the most accurate description of a Python variable?',
        options: [
          'A name bound to an object in memory',
          'A box in memory that holds a value',
          'A typed container that only accepts one kind of value',
          'A copy of the value made at assignment time',
        ],
        answerIndex: 0,
        explanation:
          'Names are labels bound to objects; the object carries the type and the data. The "box" model seems harmless but predicts the wrong answer for every shared-mutable-object question.',
      },
      {
        id: 'PY-002-q3',
        type: 'truefalse',
        concept: 'identity vs equality',
        prompt: '`[1, 2] == [1, 2]` is True, and `[1, 2] is [1, 2]` is also True.',
        answer: false,
        explanation:
          'The first is True — same contents. The second is False — they are two distinct list objects, so their identities differ. `==` asks about value, `is` asks about identity.',
      },
      {
        id: 'PY-002-q4',
        type: 'multi',
        concept: 'naming',
        prompt: 'Which of these are valid *and* advisable Python variable names? Select all that apply.',
        options: ['learning_rate', '2nd_score', 'list', 'batch_size', 'class'],
        answerIndices: [0, 3],
        explanation:
          '`2nd_score` is invalid (cannot start with a digit) and `class` is a reserved keyword. `list` is technically valid but shadows the built-in type, which breaks later calls to `list(...)`. The two snake_case descriptive names are both valid and good practice.',
      },
      {
        id: 'PY-002-q5',
        type: 'code-output',
        language: 'python',
        concept: 'order of evaluation',
        prompt: 'What is printed?',
        code: 'count = 5\ncount = count * 2 + 1\nprint(count)',
        options: ['11', '10', '5', 'It raises an error because count is on both sides'],
        answerIndex: 0,
        explanation:
          'The right-hand side is fully evaluated first using the current value: `5 * 2 + 1` is 11. Only then is `count` rebound. A name appearing on both sides is completely ordinary.',
      },
      {
        id: 'PY-002-q6',
        type: 'explain',
        concept: 'references',
        prompt: 'Explain, without using the word "pointer", why appending to a list inside a function changes the caller\'s list but assigning a new list does not.',
        rubric: [
          'Says the parameter is bound to the same object the caller passed',
          'Distinguishes mutating the object from rebinding the local name',
          'Notes that rebinding is local and invisible to the caller',
        ],
        sampleAnswer:
          'When you call the function, the parameter name inside it is attached to the very same list the caller is using — two labels, one list. Appending changes that shared list, so the caller sees the new item. Assigning a whole new list instead just moves the inside label onto a different list; the caller\'s label has not moved, so from the outside nothing appears to have happened.',
        explanation:
          'The examinable idea is that mutation acts on the shared object while assignment acts only on the local name. Anyone who can state that cleanly has understood Python\'s object model.',
      },
    ],

    flashcards: [
      { front: 'Is a Python variable a box or a label?', back: 'A label (a name bound to an object). The object holds the data and the type; the name holds neither.' },
      { front: '`b = a` on a list — what is copied?', back: 'Only the reference. Both names point at one list, so mutating through either is visible through both.' },
      { front: '`==` vs `is`', back: '`==` compares values; `is` compares identity (same object). Use `is` only for `None`, `True`, `False`.' },
      { front: 'Why avoid naming a variable `list`?', back: 'It shadows the built-in type, so later calls like `list(range(3))` raise `TypeError: object is not callable`.' },
      { front: 'What happens first in `x = x + 1`?', back: 'The right-hand side is evaluated using the current value of `x`; only then is `x` rebound to the result.' },
      { front: 'How do you get an independent copy of a list?', back: '`b = a.copy()`, `list(a)` or `a[:]` for a shallow copy; `copy.deepcopy(a)` when it contains nested mutable objects.' },
    ],

    challenge: {
      title: 'Prove the reference model',
      brief:
        'Write a script that demonstrates, with printed output, all four of these facts: (1) two names can refer to one list, (2) mutation is visible through both, (3) rebinding one name is not, and (4) `.copy()` produces independence. Print `id()` values alongside your results so the object identities are visible, and add a short comment above each section stating what it proves.',
      language: 'python',
      acceptanceCriteria: [
        'All four behaviours are demonstrated with printed evidence',
        '`id()` or `is` is used to show identity, not just contents',
        'Each section has a comment stating the claim it demonstrates',
        'The script runs top to bottom without errors',
      ],
      starterCode: '# Claim 1: two names can refer to the same list object\na = [1, 2, 3]\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine. Teach me what a variable is, and then explain why two variables can sometimes "secretly" be the same thing.',
      mustCover: [
        'A variable is a name you give to a value so you can use it later',
        'The name is a label attached to the value, not a container holding it',
        'Two names can be attached to the same value',
        'Changing the value itself is different from moving a label to a new value',
      ],
      bonusSignals: ['uses a concrete analogy such as labels or nicknames', 'gives an example where the shared-object behaviour surprises you', 'mentions copying as the fix'],
      sampleExplanation:
        "A variable is a nickname you give to something so you do not have to describe it every time. If you say 'score means 90', then whenever you say score, the computer knows you mean 90. The sneaky part is that the nickname is not a box with 90 inside it — it is more like a sticky note stuck onto the number. That means you can put two sticky notes on the same thing. If you write `b = a` for a list, you have not made a second list; you have put a second sticky note on the one you already had. So if you add something using one note's name, the other name shows the change too, because there was only ever one list. If you want a genuinely separate one, you have to ask for a copy.",
    },
  },

  {
    id: 'PY-003',
    domain: 'PY',
    module: 'Core Data Types',
    topic: 'Numbers',
    title: 'Numbers and Type Conversion',
    slug: 'numbers-and-type-conversion',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: ['PY-002'],
    related: ['PY-001'],
    tags: ['int', 'float', 'type-conversion', 'casting', 'floating-point', 'input'],

    learningObjectives: [
      'Distinguish `int` from `float` and predict which one an expression produces',
      'Convert deliberately between numbers and text with `int()`, `float()` and `str()`',
      'Explain why `0.1 + 0.2` does not equal `0.3` and what to do about it',
      'Choose between `/`, `//`, `%` and `**` for a given task',
      'Read a `ValueError` or `TypeError` caused by a bad conversion and fix its cause',
    ],

    terminology: [
      {
        term: 'int',
        definition:
          'Python\'s whole-number type. It has arbitrary precision: there is no 32-bit or 64-bit ceiling, so `2 ** 1000` is an ordinary value.',
        simple: 'A counting number, with no decimal point and no maximum size.',
      },
      {
        term: 'float',
        definition:
          'A number with a fractional part, stored as an IEEE-754 64-bit binary approximation. Roughly 15–17 significant decimal digits of precision.',
        simple: 'A number with a decimal point, stored as a very close approximation rather than exactly.',
      },
      {
        term: 'Type conversion (casting)',
        definition:
          'Building a new object of a different type from an existing value, e.g. `int("42")`. The original object is unchanged; conversion is never in place.',
        simple: 'Making a new version of a value in a different shape, like turning the text "42" into the number 42.',
      },
      {
        term: 'Implicit promotion',
        definition:
          'When an operation mixes `int` and `float`, Python widens the `int` to a `float` automatically so the result can represent a fraction.',
        simple: 'Python quietly upgrades a whole number to a decimal one when it needs to.',
      },
      {
        term: 'Floating-point error',
        definition:
          'The gap between a decimal fraction and its nearest binary representation. It is not a bug in Python; it is a property of storing base-10 fractions in base 2.',
        simple: 'Tiny rounding leftovers that appear because computers store fractions in twos, not tens.',
      },
    ],

    simpleExplanation:
      "Python has two everyday kinds of number, and telling them apart saves you a surprising amount of pain. An `int` is a whole number: 3, 0, -17, or a thousand-digit monster, because Python ints have no size limit. A `float` has a decimal point: 3.0, 0.5, -17.25. The moment a float joins an arithmetic expression, the answer becomes a float too, which is why `4 / 2` gives you `2.0` and not `2`. The second idea is conversion. Text that looks like a number is still text: `\"42\" + 1` is an error, not 43. You have to say `int(\"42\") + 1` to get the number out. Finally, floats are approximations, stored in binary. One tenth cannot be written exactly in binary any more than one third can be written exactly in decimal, so `0.1 + 0.2` comes out as 0.30000000000000004. That is not Python being broken; it is arithmetic on a finite machine, and every language does it.",

    whyItExists:
      'Hardware stores whole numbers and fractional numbers in completely different ways, with different costs and different failure modes. Python exposes that split as `int` and `float` so you can count exactly when you need exact counts, and measure approximately when you need fractions, rather than pretending one representation serves both.',

    analogy: {
      scenario:
        "Think about two tools in a workshop: a tally counter and a tape measure. The counter clicks up in whole units and is exact — press it 12 times and you have exactly 12, with no argument possible. The tape measure gives you 12.4 centimetres, but only to the finest mark printed on it; anything between marks is rounded to the nearest one. Both are honest tools, but you would never use the tape measure to count people, and you would never use the counter to measure a table.",
      mapping: [
        { from: 'The tally counter, exact in whole clicks', to: '`int` — exact, unbounded whole numbers' },
        { from: 'The tape measure, read to the nearest mark', to: '`float` — a fraction rounded to the nearest representable binary value' },
        { from: 'The gap between marks on the tape', to: 'Floating-point precision: about 2^-52 relative error' },
        { from: 'Writing "12" on a label versus having 12 items', to: 'The string `"12"` versus the integer `12`' },
        { from: 'Reading the label aloud to get a count', to: '`int("12")` — an explicit conversion from text to number' },
      ],
      bridge:
        'The two-tools picture is exactly why `0.1 + 0.2 != 0.3`: each of those decimals landed on the nearest binary "mark", and two small roundings do not cancel. It is also why money is never stored as a float in real systems — you want a counter, so you count cents as ints, or use `decimal.Decimal`, which is a tape measure marked in base ten.',
      limitations:
        'The analogy suggests the marks on the float tape are evenly spaced. They are not: floats are dense near zero and sparse far from it, so `1e16 + 1 == 1e16` is True while `1.0 + 1 == 2.0` is fine.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The arithmetic operators, and what type they return',
        caption: 'Assume `a = 7` and `b = 2`, both ints.',
        columns: ['Expression', 'Result', 'Type', 'What it means'],
        rows: [
          ['`a + b`', '`9`', 'int', 'Addition. int + int stays int.'],
          ['`a / b`', '`3.5`', 'float', 'True division. Always returns a float, even for `4 / 2`.'],
          ['`a // b`', '`3`', 'int', 'Floor division: divide then round *down* towards negative infinity.'],
          ['`a % b`', '`1`', 'int', 'Modulo: the remainder. Widely used for "every Nth" logic.'],
          ['`a ** b`', '`49`', 'int', 'Exponentiation. `2 ** 0.5` returns a float.'],
          ['`-a // b`', '`-4`', 'int', 'Floor division rounds down, not towards zero: -3.5 becomes -4.'],
        ],
      },
      {
        kind: 'compare',
        title: 'int versus float',
        caption: 'Pick deliberately; do not let the type happen by accident.',
        left: {
          heading: 'int — exact, unbounded',
          points: [
            'No maximum value: `2 ** 2000` is fine',
            'Equality is trustworthy: `x == y` means what it says',
            'Right for counts, indexes, IDs, money-in-cents',
            'Division with `/` silently produces a float',
          ],
        },
        right: {
          heading: 'float — approximate, fixed width',
          points: [
            '64 bits, about 15–17 significant decimal digits',
            'Equality is risky: compare with `math.isclose`',
            'Right for measurements, probabilities, model weights',
            'Has special values: `inf`, `-inf`, `nan`',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Reading a number from a user',
        caption: 'The single most common beginner bug lives at step three.',
        steps: [
          { label: '`input("Age: ")`', detail: 'Always returns a string, even when the user types digits.' },
          { label: 'You receive `"30"`', detail: 'Text. `"30" * 2` gives `"3030"`, not 60.' },
          { label: '`int(raw)`', detail: 'Explicit conversion. Raises `ValueError` if the text is not a whole number.' },
          { label: 'Arithmetic now works', detail: '`age + 1` gives 31 because both operands are ints.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Try the numeric tower yourself',
        caption: 'Run the comparisons below and watch which expressions return floats.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'Python numbers are immutable objects. `int` implements arbitrary-precision signed integers; `float` implements IEEE-754 binary64 double-precision values. Binary arithmetic operators coerce operands to a common type along the numeric tower int → float → complex, and built-in constructors such as `int()`, `float()` and `str()` build a new object of the target type rather than mutating the original.',

    math: {
      intuition:
        'A float stores a number the way scientific notation does, but in base two: a sign, a fraction (the mantissa) and a power of two (the exponent). Because the mantissa has a fixed number of bits, only numbers that happen to be a whole-number multiple of some power of two can be stored exactly. One tenth is not one of them, in the same way one third is not exactly writable as a terminating decimal.',
      formulas: [
        {
          latex: 'x = (-1)^{s} \\times 1.m \\times 2^{e-1023}',
          name: 'IEEE-754 binary64 value',
          meaning:
            'The exact value a 64-bit float represents. Everything you type as a decimal literal is rounded to the nearest number of this form.',
          variables: [
            { symbol: 's', meaning: 'The sign bit: 0 for positive, 1 for negative.' },
            { symbol: 'm', meaning: 'The 52-bit fraction, interpreted as binary digits after the point.' },
            { symbol: 'e', meaning: 'The 11-bit stored exponent, an unsigned integer from 0 to 2047.' },
            { symbol: '1023', meaning: 'The bias, subtracted so the exponent can be negative and represent small numbers.' },
          ],
        },
        {
          latex: '\\varepsilon = 2^{-52} \\approx 2.22 \\times 10^{-16}',
          name: 'Machine epsilon',
          meaning:
            'The gap between 1.0 and the next float above it. Relative rounding error of a single operation is at most half this, which is where "about 16 digits" comes from.',
          variables: [
            { symbol: '\\varepsilon', meaning: 'Machine epsilon, the smallest relative step near 1.0.' },
            { symbol: '52', meaning: 'The number of explicit mantissa bits in binary64.' },
          ],
        },
        {
          latex: 'a = b \\times (a \\ // \\ b) + (a \\ \\% \\ b)',
          name: 'The division identity',
          meaning:
            'Floor division and modulo are defined together so that this always holds, which is why `-7 % 2` is `1` in Python rather than `-1`.',
          variables: [
            { symbol: 'a', meaning: 'The dividend, the number being divided.' },
            { symbol: 'b', meaning: 'The divisor, which must be non-zero.' },
          ],
        },
      ],
      derivation: [
        'Write one tenth in binary: 0.1 decimal is 0.0001100110011... repeating forever, just as one third is 0.333... in decimal.',
        'A binary64 float keeps only 53 significant bits, so the repetition is cut off and rounded to the nearest representable value.',
        'The stored value is therefore slightly above one tenth: 0.1000000000000000055511151231257827.',
        'Adding the similarly rounded 0.2 gives a sum whose nearest representable value prints as 0.30000000000000004.',
        'The fix is never to compare floats with `==`; compare with a tolerance, via `math.isclose(a, b)`.',
      ],
    },

    workedExample: {
      title: 'Splitting 7 items between 2 people, four different ways',
      setup:
        'You have 7 sweets and 2 children. Depending on what you actually want, four different operators give four different correct answers. Choosing the wrong one is a classic off-by-one source.',
      steps: [
        { label: 'Fair share as a decimal', detail: '`7 / 2` is `3.5`. True division always returns a float. Useful for averages, useless for counting whole sweets.' },
        { label: 'Whole sweets each', detail: '`7 // 2` is `3`. Floor division discards the fraction and returns an int, which is what you hand each child.' },
        { label: 'Sweets left over', detail: '`7 % 2` is `1`. The remainder is what stays in the bag, and it is always an int here.' },
        { label: 'Check the identity', detail: '`2 * (7 // 2) + (7 % 2)` is `2 * 3 + 1` = `7`. Floor division and modulo always reconstruct the original.', latex: 'a = b \\times (a \\ // \\ b) + (a \\ \\% \\ b)' },
        { label: 'Negative case', detail: '`-7 // 2` is `-4`, not `-3`, because flooring rounds *down*. Then `-7 % 2` is `1`, keeping the identity true: `2 * -4 + 1 = -7`.' },
      ],
      conclusion:
        'Three operators, three questions: "what is the exact share" (`/`), "how many whole ones" (`//`) and "what is left" (`%`). Python guarantees they stay consistent even for negatives, which is why `i % n` is always a valid index into a list of length n.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The numeric tower in practice',
        runnable: true,
        code: `items = 7
people = 2

print(items / people, type(items / people))
print(items // people, type(items // people))
print(items % people)
print(items ** people)

# Any float in the expression makes the whole result a float
print(3 + 0.0, type(3 + 0.0))
print(round(3.14159, 2))`,
        output: `3.5 <class 'float'>
3 <class 'int'>
1
49
3.0 <class 'float'>
3.14`,
        explanation:
          'Note that `/` produced a float even though both operands were ints — this changed in Python 3 and is a frequent source of confusion for people who learned Python 2. `//` keeps the int type. The last two lines show implicit promotion: adding `0.0` to an int widens the result to float, because float is the only one of the two types that can represent the answer in general.',
      },
      {
        language: 'python',
        title: 'Converting between text and numbers',
        runnable: true,
        code: `raw = "42"          # this is TEXT, not a number
print(raw * 2)       # string repetition, not arithmetic

count = int(raw)
print(count * 2)     # now it is arithmetic

price = float("19.99")
print(price + 0.01)

# str() goes the other way
total = 5
print("You bought " + str(total) + " items")

# int() truncates towards zero; it does not round
print(int(3.99), int(-3.99))`,
        output: `4242
84
20.0
You bought 5 items
3 -3`,
        explanation:
          'The first line is the bug everyone writes once: `*` on a string repeats it. The important habit is to convert at the boundary, the moment data enters your program, rather than scattering `int()` calls through the logic. Note the final line: `int()` on a float chops the fractional part towards zero, so `int(-3.99)` is `-3`, whereas `round(-3.99)` is `-4` and `-3.99 // 1` is `-4.0`. Three different "make it whole" operations, three different answers.',
      },
      {
        language: 'python',
        title: 'Floating point, honestly',
        runnable: true,
        code: `import math
from decimal import Decimal

print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)
print(math.isclose(0.1 + 0.2, 0.3))

# See what is really stored
print(f"{0.1:.20f}")

# Exact decimal arithmetic, for money
print(Decimal("0.1") + Decimal("0.2"))

# Integers have no such problem, and no size limit
print(2 ** 100)`,
        output: `0.30000000000000004
False
True
0.10000000000000000555
0.3
1267650600228229401496703205376`,
        explanation:
          'The `f"{0.1:.20f}"` line is worth running once in your life: it shows that the error was present the moment you typed the literal, before any arithmetic happened. `math.isclose` is the correct comparison for floats; it takes a relative tolerance so it works for both tiny and huge magnitudes. `Decimal` is the right tool for currency because it rounds in base ten the way accountants expect. And `2 ** 100` prints in full because Python ints have arbitrary precision — in Java or C this would silently overflow.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Reading a CSV of prices',
        usage:
          'Every field read from a CSV file arrives as a string. A row that looks like `19.99` is the four characters `1`, `9`, `.`, `9`, `9`, and summing a column without calling `float()` first concatenates text instead of adding money.',
      },
      {
        context: 'Batch sizing in a training loop',
        usage:
          '`num_batches = len(dataset) // batch_size` uses floor division deliberately, because a partial final batch is handled separately. Using `/` here gives a float and then `range()` raises `TypeError: float object cannot be interpreted as an integer`.',
      },
      {
        context: 'Comparing model metrics in a test',
        usage:
          'A unit test asserting `assert accuracy == 0.85` fails intermittently on different hardware. `math.isclose(accuracy, 0.85, rel_tol=1e-9)` — or `pytest.approx(0.85)` — is what production test suites actually use.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'Exposes explicit widths (`int8`, `float32`, `float64`) because memory and precision matter at scale; `float32` has only ~7 decimal digits.' },
      { tool: 'pandas', role: 'A column with one missing value is promoted from int64 to float64, because NaN is a float — a constant source of surprise.' },
      { tool: 'decimal / money handling', role: 'Financial systems store amounts as integer minor units or `Decimal`, never as floats.' },
      { tool: 'PyTorch', role: 'Mixed-precision training deliberately uses `float16` for speed and keeps a `float32` master copy for numerical stability.' },
    ],

    commonMistakes: [
      {
        mistake: 'Doing arithmetic on `input()` without converting',
        why: '`input()` always returns a string, so `input("n: ") * 2` repeats the text and `input("n: ") + 1` raises `TypeError: can only concatenate str (not "int") to str`.',
        fix: 'Convert at the boundary: `n = int(input("n: "))`. If the user might type something else, wrap it in `try/except ValueError`.',
      },
      {
        mistake: 'Comparing floats with `==`',
        why: 'Values that are mathematically equal can differ in their last bits after different sequences of operations, so `0.1 + 0.2 == 0.3` is False.',
        fix: 'Use `math.isclose(a, b)` for general comparison, or compare integers if the quantity is genuinely discrete.',
      },
      {
        mistake: 'Expecting `int()` to round',
        why: '`int(2.7)` is `2` because the conversion truncates towards zero; it does not consult the fractional part at all.',
        fix: 'Use `round(2.7)` for round-half-to-even, `math.floor` to always go down, or `math.ceil` to always go up. Say which you mean.',
      },
      {
        mistake: 'Using `/` where an index or count is needed',
        why: '`/` returns a float, and floats cannot index a sequence: `items[len(items) / 2]` raises `TypeError: list indices must be integers or slices, not float`.',
        fix: 'Use `//` for anything that will be used as a count, an index or a loop bound.',
      },
      {
        mistake: 'Storing money as a float',
        why: 'Cent-level values such as 0.07 are not representable in binary, so repeated additions drift and totals fail to reconcile by a few cents.',
        fix: 'Store integer cents, or use `decimal.Decimal("0.07")` constructed from a *string*, never from a float literal.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why does `0.1 + 0.2` print `0.30000000000000004`, and is this a Python bug?',
        answer:
          'It is not a Python bug; it is IEEE-754 binary floating point, and C, Java and JavaScript all behave identically. A binary64 float stores a sign, a 52-bit fraction and an exponent, so it can only represent numbers that are an exact multiple of a power of two. One tenth in binary is a repeating expansion, so the literal `0.1` is already stored as a value very slightly above one tenth. Adding two such rounded values produces a sum whose nearest representable float prints with that trailing 4. The practical consequence is that you compare floats with `math.isclose`, and use integers or `decimal.Decimal` when exactness is required.',
        followUp:
          'A strong answer mentions that the error is present in the literal itself, before any arithmetic — printing `f"{0.1:.20f}"` demonstrates it.',
      },
      {
        level: 'beginner',
        question: 'What is the difference between `/` and `//`, and what does each return for `7 / 2` and `-7 // 2`?',
        answer:
          '`/` is true division and always returns a float: `7 / 2` is `3.5`, and even `4 / 2` is `2.0`. `//` is floor division: it divides and then rounds *down* towards negative infinity, returning an int when both operands are ints. So `7 // 2` is `3` and `-7 // 2` is `-4`, not `-3`. The flooring behaviour is chosen so that the identity `a == b * (a // b) + a % b` holds, which in turn makes `a % b` always have the sign of `b` — that is why `-1 % 5` is `4` in Python and makes modular indexing safe.',
      },
      {
        level: 'internship',
        question: 'A pandas column of integer counts suddenly shows values like `3.0` and dtype `float64`. What happened?',
        answer:
          'Almost certainly a missing value entered the column. NumPy\'s int64 dtype has no representation for "missing", so pandas promotes the entire column to float64 in order to store `NaN`, which is a float special value. Every existing integer is then displayed with a trailing `.0`. The fixes are to fill or drop the missing values and cast back with `.astype("int64")`, or to use pandas\' nullable integer dtype `"Int64"` (capital I), which supports `pd.NA` without promotion. This is the same int/float distinction from plain Python, surfacing one layer up.',
        followUp:
          'A strong candidate notes that this silently breaks equality joins and any code that formats the column as an identifier.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write a program that asks for a number of minutes and prints it as hours and minutes, e.g. 135 becomes "2 hours and 15 minutes".',
        hint: 'One operator gives you whole hours, another gives you the leftover minutes.',
        language: 'python',
        starterCode: 'total = int(input("Minutes: "))\n',
        solution:
          'total = int(input("Minutes: "))\nhours = total // 60\nminutes = total % 60\nprint(hours, "hours and", minutes, "minutes")\n\nFloor division gives whole hours and modulo gives the remainder; together they reconstruct the original because `60 * hours + minutes == total`. Note the `int()` around `input()` — without it, `total // 60` raises `TypeError: unsupported operand type(s) for //: str and int`.',
      },
      {
        prompt:
          'Predict the output of each line, then run it:\n\n```\nprint(7 / 2)\nprint(7 // 2)\nprint(-7 // 2)\nprint(7 % 2)\nprint(int(-3.9))\nprint(round(-3.5))\n```',
        hint: 'Two of these involve rounding rules that are not "round towards zero".',
        solution:
          '`3.5`, `3`, `-4`, `1`, `-3`, `-4`.\n\nThe interesting ones: `-7 // 2` is `-4` because flooring rounds down, not towards zero. `int(-3.9)` is `-3` because conversion truncates *towards* zero — the opposite direction. And `round(-3.5)` is `-4` because Python uses banker\'s rounding (round-half-to-even), so `round(-2.5)` is `-2`. Three different rounding behaviours in one exercise, which is exactly the point.',
      },
      {
        prompt:
          'The expression `0.1 + 0.2 == 0.3` is False. Write two different correct ways to test that a computed value is "3 tenths".',
        hint: 'One approach changes how you compare; the other changes how you store.',
        solution:
          'Approach one — compare with tolerance:\n\n```\nimport math\nmath.isclose(0.1 + 0.2, 0.3)  # True\n```\n\nApproach two — avoid binary floats entirely:\n\n```\nfrom decimal import Decimal\nDecimal("0.1") + Decimal("0.2") == Decimal("0.3")  # True\n```\n\nA third, often best in real code, is to work in integer units: `1 + 2 == 3` in tenths. Note that `Decimal(0.1)` with a float argument does *not* work — it inherits the float\'s error. The string constructor is essential.',
      },
    ],

    quiz: [
      {
        id: 'PY-003-q1',
        type: 'code-output',
        language: 'python',
        concept: 'true division returns float',
        prompt: 'What does this print?',
        code: 'print(4 / 2)\nprint(4 // 2)',
        options: ['2.0\n2', '2\n2', '2.0\n2.0', '2\n2.0'],
        answerIndex: 0,
        explanation:
          'In Python 3, `/` is true division and always produces a float, even when the division is exact. `//` is floor division and preserves the int type when both operands are ints.',
      },
      {
        id: 'PY-003-q2',
        type: 'truefalse',
        concept: 'floating-point equality',
        prompt: '`0.1 + 0.2 == 0.3` evaluates to True in Python.',
        answer: false,
        explanation:
          'It is False. Both literals are stored as the nearest binary approximation, and the roundings do not cancel, giving 0.30000000000000004. Use `math.isclose` to compare floats.',
      },
      {
        id: 'PY-003-q3',
        type: 'debug',
        language: 'python',
        concept: 'input returns a string',
        prompt: 'This program raises `TypeError: can only concatenate str (not "int") to str`. What is the fix?',
        code: 'age = input("Age: ")\nprint(age + 1)',
        options: [
          'Wrap the input in `int()`: `age = int(input("Age: "))`',
          'Use `print(age, 1)` instead',
          'Rename the variable, because `age` is a reserved word',
          'Add quotes: `print(age + "1")` is the only correct behaviour',
        ],
        answerIndex: 0,
        explanation:
          '`input()` always returns a string. Converting it to an int at the point of entry makes every later line behave arithmetically. Option 4 would run, but it concatenates text rather than adding.',
      },
      {
        id: 'PY-003-q4',
        type: 'mcq',
        concept: 'truncation vs rounding',
        prompt: 'What is `int(-3.7)`?',
        options: ['-3', '-4', '-3.7', 'It raises a ValueError'],
        answerIndex: 0,
        explanation:
          '`int()` truncates towards zero, discarding the fractional part, so `int(-3.7)` is `-3`. If you want `-4`, use `math.floor(-3.7)` or `-3.7 // 1`.',
      },
      {
        id: 'PY-003-q5',
        type: 'multi',
        concept: 'choosing a numeric type',
        prompt: 'Which of these should be represented as an `int` rather than a `float`? Select all that apply.',
        options: [
          'The number of rows in a dataset',
          'A model\'s accuracy score',
          'A list index',
          'A price in cents, in a payments system',
          'The measured temperature of a room',
        ],
        answerIndices: [0, 2, 3],
        explanation:
          'Counts, indexes and money-in-minor-units are discrete and must be exact, so they are ints. Accuracy and temperature are measurements of continuous quantities where a tiny approximation is harmless, so floats are appropriate.',
      },
      {
        id: 'PY-003-q6',
        type: 'fill',
        concept: 'modulo',
        prompt: 'Which operator gives you the remainder after division, so that `17 ? 5` is `2`?',
        answers: ['%', 'modulo', 'mod', 'percent', 'the % operator'],
        explanation:
          'The `%` operator returns the remainder. It is the standard way to express "every Nth iteration" (`if i % 100 == 0`) and to keep an index inside a range (`i % len(items)`).',
      },
      {
        id: 'PY-003-q7',
        type: 'explain',
        concept: 'type conversion boundaries',
        prompt: 'Explain why it is better to convert user or file input to numbers immediately, rather than wherever you happen to need arithmetic.',
        rubric: [
          'Notes that external input arrives as text',
          'Notes that converting once at the boundary keeps the rest of the code typed consistently',
          'Mentions that errors surface early, near the bad data, rather than deep in the logic',
        ],
        sampleAnswer:
          'Data from `input()`, a CSV or an HTTP request is always text, so somewhere it has to become a number. If you convert at the boundary, everything downstream can assume it is holding a number, and there is exactly one place where malformed data can raise `ValueError` — right next to the source, where the error message can say which row was bad. If instead you sprinkle `int()` calls wherever arithmetic happens, you have many conversion sites, each of which can fail far from the cause, and you will eventually forget one and get string concatenation where you expected addition.',
        explanation:
          'This is the "parse, don\'t validate" habit in miniature: push conversion to the edge of the system so the core works with values whose types you can rely on.',
      },
    ],

    flashcards: [
      { front: 'What does `7 / 2` return, and of what type?', back: '`3.5`, a float. In Python 3 `/` is true division and always returns a float, even for `4 / 2`.' },
      { front: 'What is `-7 // 2`?', back: '`-4`. Floor division rounds down towards negative infinity, not towards zero.' },
      { front: 'Why does `0.1 + 0.2 != 0.3`?', back: 'Binary floats cannot represent one tenth exactly, so both literals are already rounded. Compare with `math.isclose`.' },
      { front: 'What does `input()` always return?', back: 'A string — even if the user typed digits. Convert with `int()` or `float()` before doing arithmetic.' },
      { front: '`int(2.9)` versus `round(2.9)`', back: '`int` truncates towards zero giving `2`; `round` rounds to nearest giving `3`. They are different operations.' },
      { front: 'How should money be stored?', back: 'As integer minor units (cents) or `decimal.Decimal` built from a string. Never as a binary float.' },
    ],

    challenge: {
      title: 'A unit converter that refuses to lie',
      brief:
        'Write a script that reads a temperature in Celsius from the user and prints it in Fahrenheit and Kelvin, each rounded to one decimal place. Then extend it: read a total number of seconds and print it as hours, minutes and seconds using only `//` and `%`. Finally, add a line that demonstrates a floating-point surprise from your own conversions and shows the `math.isclose` fix.',
      language: 'python',
      acceptanceCriteria: [
        'Input is converted explicitly with `float()` or `int()` and the program does not crash on a valid number',
        'Fahrenheit and Kelvin are both correct and rounded to one decimal place',
        'The time breakdown uses `//` and `%` and reconstructs the original total',
        'The script prints a comparison that is False with `==` and True with `math.isclose`',
      ],
      starterCode: 'import math\n\ncelsius = float(input("Celsius: "))\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who has just learned about variables why Python has two kinds of number, and why `0.1 + 0.2` does not give exactly `0.3`.',
      mustCover: [
        'int is for exact whole numbers and has no size limit',
        'float is for fractional values and is stored as an approximation',
        'Mixing the two promotes the result to float',
        'Binary cannot represent one tenth exactly, so decimal fractions are rounded when stored',
      ],
      bonusSignals: ['uses the "one third in decimal" comparison', 'mentions math.isclose', 'mentions money as integers or Decimal', 'distinguishes truncation from rounding'],
      sampleExplanation:
        "Python keeps two kinds of number because computers store them differently. Whole numbers — ints — are stored exactly, and Python lets them grow as large as you like, so counting is always trustworthy. Numbers with a decimal point — floats — are stored the way scientific notation works, but in base two: a fraction and a power of two. That means a float can only land on certain values, and everything else is rounded to the nearest one. One tenth is not one of the values it can hit exactly, for the same reason one third is not something you can write exactly as a decimal: the digits go on forever. So when you type 0.1, Python stores something microscopically larger, and when you add two of those slightly-off numbers you get a slightly-off answer, which is why the screen shows 0.30000000000000004. The practical rule that follows is simple: count with ints, measure with floats, and never ask two floats whether they are exactly equal — ask whether they are close.",
    },
  },

  {
    id: 'PY-004',
    domain: 'PY',
    module: 'Core Data Types',
    topic: 'Strings',
    title: 'Strings and Text',
    slug: 'strings-and-text',
    difficulty: 1,
    estimatedMinutes: 35,
    prerequisites: ['PY-002'],
    related: ['PY-003'],
    tags: ['strings', 'slicing', 'f-strings', 'immutability', 'methods', 'unicode'],

    learningObjectives: [
      'Index and slice a string, including with negative indices and a step',
      'Format values into text with f-strings, including alignment and precision',
      'Apply the string methods that appear in almost every real script: `strip`, `split`, `join`, `replace`, `lower`, `startswith`',
      'Explain why strings are immutable and what that implies for code that builds text in a loop',
      'Distinguish a character, a Unicode code point and a byte',
    ],

    terminology: [
      {
        term: 'String',
        definition:
          'An immutable ordered sequence of Unicode code points. Written with single, double or triple quotes; the quote style carries no meaning.',
        simple: 'A piece of text, stored as a fixed row of characters.',
      },
      {
        term: 'Index',
        definition:
          'The position of a character, counting from 0. Negative indices count from the end, so `-1` is the last character.',
        simple: 'The seat number of a character, starting at zero.',
      },
      {
        term: 'Slice',
        definition:
          '`s[start:stop:step]` builds a new string from a range of positions. `start` is included, `stop` is excluded, and any part may be omitted.',
        simple: 'Cutting out a piece of the text to make a new, smaller piece.',
      },
      {
        term: 'f-string',
        definition:
          'A literal prefixed with `f` in which expressions inside braces are evaluated and formatted into the result at run time, e.g. `f"{name}: {score:.2f}"`.',
        simple: 'A piece of text with gaps in it that Python fills in with your values.',
      },
      {
        term: 'Immutability',
        definition:
          'A string object can never be changed after creation. Every method that appears to modify a string in fact returns a brand-new string.',
        simple: 'Once written, a piece of text is set in stone — you can only make a new copy with changes.',
      },
      {
        term: 'Code point',
        definition:
          'The integer Unicode assigns to a character, e.g. 65 for "A" and 128512 for a grinning face. `len()` counts code points, not bytes or visible glyphs.',
        simple: 'The number Unicode uses for each character.',
      },
    ],

    simpleExplanation:
      "A string is text, and Python treats it as an ordered row of characters with numbered positions starting at zero. That numbering is what lets you pull pieces out: `word[0]` is the first character and `word[-1]` is the last, and `word[1:4]` gives you characters one, two and three — the number after the colon is where you stop, not the last one you take. The second big idea is that you cannot edit a string. Writing `word[0] = \"H\"` is an error. Every operation that looks like editing — replacing, stripping spaces, changing case — actually builds a brand new string and hands it back, leaving the original untouched. That is why `name.strip()` on its own does nothing useful: you have to keep the result. The third idea is formatting. Rather than gluing text together with plus signs, you write an f-string: put an `f` before the quote and any value you want inside braces, and Python drops it in for you, with control over decimal places and alignment.",

    whyItExists:
      'Almost all data arrives as text: file names, CSV rows, log lines, API responses, user input, model prompts. Python makes text a first-class sequence type with a large, well-named method set so that the cleaning and reshaping work that dominates real data projects can be written in one readable line instead of a loop over characters.',

    analogy: {
      scenario:
        "Picture a row of fridge magnets spelling out a word, fixed to a board that has been laminated so nothing can be moved. You can read any magnet by its position, and you can photograph a stretch of them to make a new, smaller sign. What you cannot do is prise one magnet off and swap it. If you want a different word, you make a whole new board — which is exactly what the machine in the corner does when you hand it your board and say \"same thing, but in capitals\".",
      mapping: [
        { from: 'The position of a magnet on the board', to: 'The index, counting from 0' },
        { from: 'Photographing magnets 1 to 3', to: 'A slice, `s[1:4]` — start included, stop excluded' },
        { from: 'The board being laminated', to: 'Immutability — `s[0] = "H"` raises `TypeError`' },
        { from: 'The machine handing back a new board', to: 'Methods like `.upper()` returning a new string' },
        { from: 'Throwing away the new board without keeping it', to: 'Calling `s.strip()` and not assigning the result' },
      ],
      bridge:
        'The laminated board is the mental model that explains an entire class of beginner bugs. Every string method returns a new object; none of them mutate. So `text.replace("a", "b")` on its own is a no-op in effect, and `text = text.replace("a", "b")` is what you meant. The same idea explains why building a long string by repeated `+=` in a loop is slow — each step builds a whole new board — and why `"".join(parts)` is the idiom instead.',
      limitations:
        'The magnet picture suggests one magnet equals one visible character. Unicode breaks this: an emoji with a skin-tone modifier is several code points that render as one glyph, so `len()` can be larger than what your eye counts.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a slice',
        subject: 's = "machine"; s[1:5:2]',
        annotations: [
          { part: '1 (start)', note: 'The first index included. Omit it to mean "from the beginning".' },
          { part: '5 (stop)', note: 'The first index *excluded*. `s[1:5]` gives you positions 1, 2, 3, 4 — four characters, which is 5 minus 1.' },
          { part: '2 (step)', note: 'Take every second character. A negative step walks backwards: `s[::-1]` reverses the string.' },
          { part: 'The result', note: '`"ah"` — positions 1 and 3. Slicing never raises IndexError; out-of-range bounds are clipped silently.' },
        ],
      },
      {
        kind: 'table',
        title: 'The string methods you will actually use',
        caption: 'Every one of these returns a new value; none modify the original.',
        columns: ['Method', 'Example', 'Result', 'Typical use'],
        rows: [
          ['`.strip()`', '`"  hi \\n".strip()`', '`"hi"`', 'Cleaning whitespace off a line read from a file.'],
          ['`.lower()`', '`"Email@X.com".lower()`', '`"email@x.com"`', 'Case-insensitive comparison and deduplication.'],
          ['`.split(",")`', '`"a,b,c".split(",")`', '`["a", "b", "c"]`', 'Breaking a CSV line into fields.'],
          ['`",".join(xs)`', '`",".join(["a","b"])`', '`"a,b"`', 'Building one string from many — the fast way.'],
          ['`.replace(a, b)`', '`"2024-01".replace("-","/")`', '`"2024/01"`', 'Simple substitutions without regular expressions.'],
          ['`.startswith(p)`', '`"model.pt".startswith("model")`', '`True`', 'Filtering file names or log prefixes.'],
          ['`.find(sub)`', '`"abc".find("z")`', '`-1`', 'Locating a substring without raising; `.index()` raises instead.'],
          ['`in`', '`"ai" in "explainable"`', '`True`', 'The readable membership test, better than `.find(..) != -1`.'],
        ],
      },
      {
        kind: 'compare',
        title: 'Concatenation versus join, in a loop',
        caption: 'Both produce the same text. Only one scales.',
        left: {
          heading: '`out += word` in a loop',
          points: [
            'Builds a brand-new string on every iteration',
            'Copies all characters accumulated so far each time',
            'Quadratic time in the number of pieces',
            'Fine for three pieces, painful for a million log lines',
          ],
        },
        right: {
          heading: '`"".join(parts)`',
          points: [
            'Collects pieces in a list first, then builds once',
            'Computes the final length, allocates once, copies once',
            'Linear time',
            'The idiomatic way to assemble text in Python',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Cleaning one line from a data file',
        caption: 'This four-step pipeline appears in essentially every ingest script.',
        steps: [
          { label: 'Read the raw line', detail: '`"  Ada Lovelace , 1815\\n"` — trailing newline and stray spaces included.' },
          { label: '`.strip()`', detail: 'Removes leading and trailing whitespace, including the newline.' },
          { label: '`.split(",")`', detail: 'Produces `["Ada Lovelace ", " 1815"]` — note the spaces survived.' },
          { label: 'Strip each field', detail: '`[f.strip() for f in fields]` gives `["Ada Lovelace", "1815"]`.' },
          { label: 'Convert types', detail: '`int(fields[1])` turns the year into a number, ready for arithmetic.' },
        ],
      },
    ],

    formalDefinition:
      '`str` is an immutable sequence of Unicode code points. It supports the sequence protocol (indexing, slicing, `len`, iteration, `in`), and all of its methods are pure functions that return new `str` objects. Slicing with `s[i:j:k]` yields a new string of the code points at positions i, i+k, i+2k, … strictly before j, with out-of-range bounds clamped rather than raising.',

    codeExamples: [
      {
        language: 'python',
        title: 'Indexing and slicing',
        runnable: true,
        code: `s = "machine learning"

print(s[0], s[-1])
print(s[0:7])        # start included, stop excluded
print(s[:7])         # omitted start means 0
print(s[8:])         # omitted stop means "to the end"
print(s[::-1])       # negative step reverses
print(len(s))

print(s[100:200])    # out of range slices are silently empty
# print(s[100])      # but out of range INDEXING raises IndexError`,
        output: `m g
machine
machine
learning
gninrael enihcam
16
`,
        explanation:
          'The half-open convention (`start` included, `stop` excluded) is what makes `s[:n]` and `s[n:]` fit together perfectly with no overlap and no gap, and it makes the length of `s[i:j]` simply `j - i`. Note the asymmetry on the last two lines: slicing out of range gives you an empty string, while indexing out of range raises `IndexError: string index out of range`. That difference hides bugs, so check lengths explicitly when it matters.',
      },
      {
        language: 'python',
        title: 'f-strings, with real formatting',
        runnable: true,
        code: `name = "resnet50"
accuracy = 0.9236
epoch = 7
loss = 0.0000421

print(f"{name}: {accuracy:.2%} after {epoch} epochs")
print(f"loss = {loss:.3e}")
print(f"|{name:>12}|{accuracy:>8.3f}|")   # right-aligned columns
print(f"{epoch=}, {accuracy=:.3f}")        # self-documenting, great for debugging

# Expressions are allowed inside the braces
print(f"{name.upper()} trained for {epoch * 100} steps")`,
        output: `resnet50: 92.36% after 7 epochs
loss = 4.210e-05
|    resnet50|   0.924|
epoch=7, accuracy=0.924
RESNET50 trained for 700 steps`,
        explanation:
          'The part after the colon is a format specification, not part of the value. `:.2%` multiplies by 100 and appends a percent sign; `:.3e` gives scientific notation; `:>12` right-aligns in a field twelve wide, which is how you get columns that line up in a log. The `{epoch=}` form prints both the expression text and its value, which makes it the fastest debugging tool in the language. Anything you can write as an expression can go inside the braces, though keeping them short keeps them readable.',
      },
      {
        language: 'python',
        title: 'Immutability, and the methods that respect it',
        runnable: true,
        code: `raw = "  Ada Lovelace , 1815 \\n"

# This does NOT change raw:
raw.strip()
print(repr(raw))

# This does, by rebinding the name:
cleaned = raw.strip()
print(repr(cleaned))

fields = [f.strip() for f in cleaned.split(",")]
print(fields)

name, year = fields
print(f"{name} was born in {int(year)}")

# Strings cannot be edited in place
try:
    cleaned[0] = "X"
except TypeError as e:
    print("TypeError:", e)`,
        output: `'  Ada Lovelace , 1815 \\n'
'Ada Lovelace , 1815'
['Ada Lovelace', '1815']
Ada Lovelace was born in 1815
TypeError: 'str' object does not support item assignment`,
        explanation:
          '`repr()` is used here deliberately: it shows the quotes and escape sequences, so you can see the whitespace that `print()` would hide. Line 4 is the classic no-op — `raw.strip()` computes a clean string and immediately throws it away, because nothing was assigned. The `TypeError` at the end is the message you will meet whenever you try to treat a string like a list; the fix is always to build a new string, for example with slicing: `"X" + cleaned[1:]`.',
      },
      {
        language: 'python',
        title: 'Building text efficiently',
        runnable: true,
        code: `words = ["epoch", "loss", "accuracy", "lr"]

# Idiomatic and fast: collect, then join once
header = ",".join(words)
print(header)

# Multi-line strings keep their newlines
report = """Run summary
-----------
status: complete"""
print(report)

# Repetition and membership
print("-" * 20)
print("loss" in header, "recall" in header)`,
        output: `epoch,loss,accuracy,lr
Run summary
-----------
status: complete
--------------------
True False`,
        explanation:
          '`join` is called on the separator, not on the list, which reads backwards at first but is correct: the separator knows how to put things between. It is also the fast path, because Python can compute the total length up front and allocate one buffer, instead of creating a new string per concatenation. Triple quotes preserve newlines exactly as written, which makes them the natural choice for SQL queries, help text and model prompts.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Parsing log files',
        usage:
          'A line like `2024-03-01 12:00:01 ERROR train.py: loss diverged` is split on whitespace, the timestamp sliced out, and the level tested with `.startswith("ERROR")`. Every observability tool you will ever use is built on this shape of code.',
      },
      {
        context: 'Cleaning a categorical column',
        usage:
          'Before grouping customer cities, real pipelines run `.str.strip().str.lower()` so that "London", "london " and " LONDON" collapse into one category rather than three. The pandas `.str` accessor is these same methods applied down a column.',
      },
      {
        context: 'Building prompts for a language model',
        usage:
          'A prompt template is an f-string: `f"Summarise the following review in one sentence:\\n\\n{review}"`. Getting the whitespace and delimiters right measurably changes model output, which makes careful string handling an ML skill, not just a Python one.',
      },
      {
        context: 'File and path handling',
        usage:
          '`filename.endswith(".csv")` filters a directory listing, and `filename.rsplit(".", 1)[0]` gets the stem. In production you would reach for `pathlib`, but it is built from exactly these operations.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`Series.str` exposes `strip`, `lower`, `split`, `contains` and friends vectorised across an entire column.' },
      { tool: 're (regular expressions)', role: 'Where plain string methods stop being enough — but reach for `.split()` and `in` first; they are faster and far more readable.' },
      { tool: 'pathlib', role: 'Wraps the string manipulation of file paths in an object that handles separators and extensions correctly.' },
      { tool: 'Hugging Face tokenizers', role: 'Turns strings into token ids; understanding code points versus characters matters when token counts do not match your intuition.' },
    ],

    commonMistakes: [
      {
        mistake: 'Calling a string method and discarding the result: `text.strip()`',
        why: 'Strings are immutable, so the method cannot change `text`; it returns a new string which is immediately thrown away.',
        fix: 'Assign the result: `text = text.strip()`. If a line of code calls a string method and does not assign or pass the result anywhere, it does nothing.',
      },
      {
        mistake: 'Off-by-one from forgetting that `stop` is excluded',
        why: '`s[0:3]` gives three characters, not four. People reach for `s[0:len(s)-1]` expecting the whole string and silently lose the last character.',
        fix: 'Remember `len(s[i:j]) == j - i`, and use `s[i:]` when you mean "to the end". Never compute the final index by hand.',
      },
      {
        mistake: 'Concatenating in a loop to build a large string',
        why: 'Each `out += piece` allocates a new string and copies everything so far, so assembling n pieces costs time proportional to n squared.',
        fix: 'Append to a list and call `"".join(parts)` once at the end. For a few pieces it does not matter; for a log file it is the difference between milliseconds and minutes.',
      },
      {
        mistake: 'Comparing user text without normalising it',
        why: '`"Yes" == "yes"` is False, and a trailing newline from `input()` or a file read makes `"yes\\n" == "yes"` False too.',
        fix: 'Normalise before comparing: `answer.strip().lower() == "yes"`. Do it once, at the boundary.',
      },
      {
        mistake: 'Assuming `len(s)` equals the number of visible characters',
        why: '`len` counts Unicode code points. Accented letters can be composed of two code points, and many emoji are sequences, so the count exceeds what you see.',
        fix: 'For display width use a library such as `wcwidth`; for comparison, normalise with `unicodedata.normalize("NFC", s)` first.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is `s[1:4]` three characters and not four, and why did Python choose that convention?',
        answer:
          'Slices are half-open: the start index is included and the stop index is excluded, so the length of `s[i:j]` is exactly `j - i`. The convention means adjacent slices tile perfectly — `s[:n] + s[n:]` reconstructs `s` with no overlap and no gap — and it matches `range(n)`, which produces n values from 0 to n-1. It also means "length" and "end index" are the same number, which removes a whole class of off-by-one errors when you compute bounds.',
      },
      {
        level: 'intermediate',
        question: 'Strings are immutable. What are the practical consequences of that, good and bad?',
        answer:
          'The good: strings can be hashed, so they work as dictionary keys and set members; they can be shared freely between threads and data structures without defensive copying; and CPython can intern short strings so identical literals share one object. The bad: any transformation allocates a new object, so building a long string with repeated `+=` is quadratic, and you cannot patch a character in place. The practical rules that follow are to collect pieces in a list and `"".join` them, and to remember that every string method returns a value you must keep.',
        followUp:
          'A strong answer connects immutability to hashability — this is also why tuples can be dict keys and lists cannot.',
      },
      {
        level: 'internship',
        question: 'What is the difference between a character, a code point and a byte, and when does it bite you?',
        answer:
          'A Python `str` is a sequence of Unicode code points — integers Unicode assigns to characters. A byte is a unit of storage; converting between the two requires an encoding, usually UTF-8, where one code point becomes one to four bytes. A visible character (a grapheme cluster) can itself be several code points, such as a base letter plus a combining accent. It bites you when reading a file with the wrong encoding (`UnicodeDecodeError`), when `len()` disagrees with what you see on screen, when truncating a string at a byte boundary splits a character, and when sorting or deduplicating text that is visually identical but differently normalised. The habits that prevent it are to open files with `encoding="utf-8"` explicitly and to normalise with `unicodedata.normalize` before comparison.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Given `s = "data science"`, write expressions that produce: the first four characters, the last seven, the whole string reversed, and every second character.',
        hint: 'You need `s[:n]`, `s[-n:]`, and two forms with a step.',
        language: 'python',
        starterCode: 's = "data science"\n',
        solution:
          '```\ns[:4]     # "data"\ns[-7:]    # "science"\ns[::-1]   # "ecneics atad"\ns[::2]    # "dt cec"\n```\n\nNote `s[-7:]` rather than `s[5:]`: counting from the end is robust if the prefix length changes. And `s[::-1]` is the standard Python idiom for reversing a string — it is a slice with a step of minus one, not a special reverse operation.',
      },
      {
        prompt:
          'A file gives you the line `"  bob@EXAMPLE.com  ,  42  "`. Produce the tuple `("bob@example.com", 42)`.',
        hint: 'Strip, split, strip each field again, then convert the second one.',
        solution:
          '```\nline = "  bob@EXAMPLE.com  ,  42  "\nraw_email, raw_age = line.split(",")\nemail = raw_email.strip().lower()\nage = int(raw_age.strip())\nprint((email, age))   # (\'bob@example.com\', 42)\n```\n\nThe order matters: split first, then strip each field, because splitting on the comma leaves the inner spaces attached. `int()` actually tolerates surrounding whitespace, so `int(raw_age)` would work here too — but stripping explicitly makes the intent obvious and survives the day the field becomes non-numeric.',
      },
      {
        prompt:
          'Write a function-free snippet that turns `["loss", "acc"]` and `[0.031, 0.9412]` into the single line `loss=0.031 acc=0.941` with three decimal places.',
        hint: 'Build the pieces in a list with an f-string, then join them.',
        solution:
          '```\nkeys = ["loss", "acc"]\nvals = [0.031, 0.9412]\nparts = [f"{k}={v:.3f}" for k, v in zip(keys, vals)]\nprint(" ".join(parts))   # loss=0.031 acc=0.941\n```\n\nThis is the shape of essentially every training-progress line you will ever print. `:.3f` fixes the decimal places so the columns stay aligned across epochs, and `join` assembles the line in one allocation rather than accumulating with `+=`.',
      },
    ],

    quiz: [
      {
        id: 'PY-004-q1',
        type: 'code-output',
        language: 'python',
        concept: 'slicing',
        prompt: 'What does this print?',
        code: 's = "learning"\nprint(s[2:5])',
        options: ['arn', 'arni', 'earn', 'ear'],
        answerIndex: 0,
        explanation:
          'Positions 2, 3 and 4 are taken; position 5 is excluded. The slice length is `5 - 2 = 3`, which is the quick way to check any slice without counting characters.',
      },
      {
        id: 'PY-004-q2',
        type: 'debug',
        language: 'python',
        concept: 'immutability',
        prompt: 'Why does `name` still contain the spaces after this runs?',
        code: 'name = "  Ada  "\nname.strip()\nprint(repr(name))',
        options: [
          '`strip()` returns a new string; the result was never assigned',
          '`strip()` only removes tabs, not spaces',
          '`repr()` re-inserts the whitespace',
          'You must call `name.strip(" ")` with an explicit argument',
        ],
        answerIndex: 0,
        explanation:
          'Strings are immutable, so no method can change one in place. `name.strip()` built a clean copy and discarded it. The fix is `name = name.strip()`.',
      },
      {
        id: 'PY-004-q3',
        type: 'truefalse',
        concept: 'slice bounds',
        prompt: 'Slicing a string with indices beyond its length raises an `IndexError`.',
        answer: false,
        explanation:
          'Slicing clamps out-of-range bounds silently, so `"abc"[5:9]` is just `""`. Only direct indexing, such as `"abc"[5]`, raises `IndexError`.',
      },
      {
        id: 'PY-004-q4',
        type: 'code-output',
        language: 'python',
        concept: 'f-string formatting',
        prompt: 'What does this print?',
        code: 'acc = 0.876\nprint(f"{acc:.1%}")',
        options: ['87.6%', '0.9%', '0.876%', '88%'],
        answerIndex: 0,
        explanation:
          'The `%` format type multiplies by 100 and appends a percent sign, and `.1` sets one digit after the decimal point, giving `87.6%`.',
      },
      {
        id: 'PY-004-q5',
        type: 'match',
        concept: 'string methods',
        prompt: 'Match each method to what it does.',
        pairs: [
          { left: '`.strip()`', right: 'Removes leading and trailing whitespace' },
          { left: '`.split(",")`', right: 'Breaks one string into a list of pieces' },
          { left: '`",".join(parts)`', right: 'Builds one string from a list of pieces' },
          { left: '`.replace("a", "b")`', right: 'Returns a copy with every occurrence substituted' },
          { left: '`.startswith("pre")`', right: 'Returns True or False for a prefix test' },
        ],
        explanation:
          '`split` and `join` are inverses of one another and appear constantly together in data cleaning. Note that `join` is called on the separator, which is the part everyone finds backwards at first.',
      },
      {
        id: 'PY-004-q6',
        type: 'mcq',
        concept: 'efficient concatenation',
        prompt: 'You need to build one string from 500,000 log lines. Which approach is correct and fast?',
        options: [
          'Append each line to a list, then `"\\n".join(lines)` once',
          'Use `out += line` inside the loop',
          'Use `out = out + line + "\\n"` inside the loop',
          'Use `sum(lines)` since strings support addition',
        ],
        answerIndex: 0,
        explanation:
          'Repeated concatenation rebuilds the whole accumulated string each iteration, giving quadratic behaviour. `join` computes the final size once and copies each piece once. `sum` on strings raises `TypeError` by design, precisely to discourage the slow pattern.',
      },
      {
        id: 'PY-004-q7',
        type: 'fill',
        concept: 'reversing',
        prompt: 'Complete the idiom that reverses a string: `s[::?]`',
        answers: ['-1', 'minus 1', 'negative 1', '-1 ', '−1'],
        explanation:
          'A step of `-1` walks the sequence backwards from end to start, producing a reversed copy. The same slice works on lists and tuples.',
      },
    ],

    flashcards: [
      { front: 'What does `s[1:4]` give you?', back: 'Characters at positions 1, 2 and 3. Start included, stop excluded, so the length is `4 - 1 = 3`.' },
      { front: 'Why does `text.upper()` not change `text`?', back: 'Strings are immutable. The method returns a new string; you must assign it: `text = text.upper()`.' },
      { front: 'How do you reverse a string?', back: '`s[::-1]` — a slice with a step of -1.' },
      { front: 'What is the fast way to build a big string from many pieces?', back: 'Collect the pieces in a list and call `"".join(parts)` once. Repeated `+=` is quadratic.' },
      { front: 'What does `f"{x:.2f}"` do?', back: 'Formats `x` as a fixed-point decimal with exactly two digits after the point.' },
      { front: 'What does `len("café")` count?', back: 'Unicode code points, not bytes or visible glyphs — so a combining accent makes the count larger than expected.' },
    ],

    challenge: {
      title: 'A tiny log-line parser',
      brief:
        'Given a list of raw log lines in the form `"2024-03-01 12:00:01 | ERROR | train.py | loss diverged"`, write a script that prints a neat table of only the ERROR lines, with the time (not the date) in one column of width 10, the source file in a column of width 14, and the message after it. Ignore blank lines and tolerate stray whitespace around the pipes.',
      language: 'python',
      acceptanceCriteria: [
        'Blank or whitespace-only lines are skipped without crashing',
        'Fields are split on the pipe and stripped individually',
        'Only lines whose level is ERROR are printed, tested case-insensitively',
        'The time is obtained by slicing the timestamp, and columns are aligned with f-string width specifiers',
      ],
      starterCode:
        'lines = [\n    "2024-03-01 12:00:01 | INFO  | train.py | epoch 1 complete",\n    "   ",\n    "2024-03-01 12:04:11 | ERROR | train.py | loss diverged",\n]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who knows about variables what a string is, how to take a piece out of one, and why string methods never change the original.',
      mustCover: [
        'A string is an ordered sequence of characters with positions starting at 0',
        'Slicing takes a range where the stop index is excluded',
        'Strings are immutable, so methods return new strings',
        'f-strings insert values into text and can control formatting',
      ],
      bonusSignals: ['mentions negative indices', 'explains why join beats += in a loop', 'gives a real cleaning example with strip and split'],
      sampleExplanation:
        "A string is just text, but Python thinks of it as a row of characters with numbered seats, starting at seat zero. So if the word is 'machine', seat 0 holds 'm' and seat -1 holds the last letter. To take a chunk you give a start and a stop: `word[0:7]` means start at seat 0 and stop just before seat 7, which is why you get seven characters rather than eight — the stop seat is not included. The part people trip over is that you can never edit a string. If you ask for it in capitals, Python does not repaint the letters you have; it makes a whole new string and hands it to you. That means writing `word.upper()` on its own achieves nothing, because you threw the new string away. You have to keep it: `word = word.upper()`. Once you have that picture, f-strings are the pleasant part: put an `f` before the quotes and anything in braces gets filled in, so `f\"{name} scored {score:.1f}\"` builds the sentence for you with the number rounded to one decimal place.",
    },
  },

  {
    id: 'PY-005',
    domain: 'PY',
    module: 'Core Data Types',
    topic: 'Operators',
    title: 'Operators and Expressions',
    slug: 'operators-and-expressions',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: ['PY-003'],
    related: ['PY-002', 'PY-004'],
    tags: ['operators', 'precedence', 'boolean', 'truthiness', 'short-circuit', 'comparison'],

    learningObjectives: [
      'Evaluate an expression correctly by applying operator precedence and associativity',
      'Use `and`, `or` and `not` including their short-circuit behaviour',
      'Predict the truthiness of any Python value without memorising a list',
      'Explain what `and` and `or` actually return, which is not always a boolean',
      'Chain comparisons safely and know when parentheses are worth adding for clarity',
    ],

    terminology: [
      {
        term: 'Expression',
        definition:
          'Any piece of code that evaluates to a value. `2 + 2`, `name.upper()` and `x > 0` are expressions; `x = 5` is a statement, not an expression.',
        simple: 'A bit of code that works out to an answer.',
      },
      {
        term: 'Operator precedence',
        definition:
          'The fixed ordering that decides which operator binds more tightly when parentheses are absent — for example `**` before `*` before `+` before comparisons before `not` before `and` before `or`.',
        simple: 'The rules about which part of a sum gets done first.',
      },
      {
        term: 'Truthiness',
        definition:
          'The boolean value Python assigns to any object in a condition. Everything is truthy except `False`, `None`, zero of any numeric type, and empty containers and strings.',
        simple: 'Whether a value counts as "yes" or "no" when used in an `if`.',
      },
      {
        term: 'Short-circuit evaluation',
        definition:
          '`and` stops at the first falsy operand and `or` stops at the first truthy one, so the right-hand side may never run at all.',
        simple: 'Python stops reading a condition as soon as the answer is certain.',
      },
      {
        term: 'Augmented assignment',
        definition:
          '`x += 1` and friends, which combine an operation with a rebinding. For mutable types they may modify in place rather than creating a new object.',
        simple: 'A shorthand for "change this value and keep it under the same name".',
      },
    ],

    simpleExplanation:
      "An expression is any piece of code that boils down to a value, and Python has fixed rules about which parts get worked out first — the same idea as doing multiplication before addition in school arithmetic, extended to cover comparisons and logic. Alongside the arithmetic operators there are comparison operators, which give you `True` or `False`, and the three logical words `and`, `or` and `not` for combining those answers. Two things about them surprise people. First, Python is lazy: in `a and b`, if `a` is already false then `b` is never even looked at, which is what makes `if data and data[0] > 5` safe on an empty list. Second, every value in Python can stand in for a condition, not just `True` and `False`. Zero, an empty string, an empty list and `None` all count as false; everything else counts as true. That is why experienced Python programmers write `if items:` rather than `if len(items) > 0:` — it says the same thing with less ceremony.",

    whyItExists:
      'Programs constantly need to combine and compare values, and writing every combination as a named function call would be unreadable. Operators give arithmetic, comparison and logic a compact notation with unambiguous precedence rules, so a condition reads like the sentence it represents rather than like nested function calls.',

    analogy: {
      scenario:
        "Imagine a nightclub door with two staff. The first checks your age, the second checks the guest list. If the first says no, the second never even looks up — there is no point, you are not getting in either way. If instead the rule were 'age OR guest list', then the moment the first says yes the second stops caring. The staff are not being lazy for the sake of it; checking the guest list is slow, and once the outcome is decided, further checking costs time and changes nothing.",
      mapping: [
        { from: 'Both checks must pass', to: '`and` — evaluation stops at the first falsy operand' },
        { from: 'Either check is enough', to: '`or` — evaluation stops at the first truthy operand' },
        { from: 'The second member of staff never looking up', to: 'Short-circuit: the right-hand expression is never evaluated' },
        { from: 'The slow guest-list lookup', to: 'An expensive or unsafe operation, such as `data[0]` on a possibly empty list' },
        { from: 'The bouncer reporting which check settled it', to: '`and`/`or` returning the operand itself, not a boolean' },
      ],
      bridge:
        'The last mapping is the one that catches people out. `a and b` does not return `True` or `False`; it returns whichever operand decided the outcome. So `0 and 5` is `0`, and `"" or "default"` is `"default"`. That is exactly why the old idiom `name = user_input or "anonymous"` works: `or` hands back the first truthy value it finds. Short-circuiting is also why `if user is not None and user.age > 18` is safe while swapping the two halves raises `AttributeError`.',
      limitations:
        'The door analogy suggests the checks happen in a fixed order because of politeness. In Python it is a language guarantee: left to right, always, which means you can and should rely on it for safety checks.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Precedence, highest binding first',
        caption: 'When in doubt, add parentheses — they cost nothing and remove the question.',
        columns: ['Level', 'Operators', 'Example', 'Reads as'],
        rows: [
          ['1', '`**`', '`2 ** 3 ** 2`', '`2 ** (3 ** 2)` = 512 — this one is right-associative'],
          ['2', '`-x`, `+x`, `~x`', '`-2 ** 2`', '`-(2 ** 2)` = -4, not 4'],
          ['3', '`*`, `/`, `//`, `%`', '`2 + 3 * 4`', '`2 + (3 * 4)` = 14'],
          ['4', '`+`, `-`', '`1 + 2 - 3`', 'Left to right'],
          ['5', 'Comparisons, `in`, `is`', '`a + 1 > b`', '`(a + 1) > b`'],
          ['6', '`not`', '`not a == b`', '`not (a == b)`'],
          ['7', '`and`', '`a or b and c`', '`a or (b and c)`'],
          ['8', '`or`', '`a or b or c`', 'Left to right, lowest binding of all'],
        ],
      },
      {
        kind: 'compare',
        title: 'Falsy versus truthy',
        caption: 'There is no list to memorise: the falsy set is small and the rest is everything else.',
        left: {
          heading: 'Falsy — treated as False',
          points: [
            '`False`',
            '`None`',
            '`0`, `0.0`, `0j`, `Decimal(0)`',
            '`""`, `[]`, `()`, `{}`, `set()`, `range(0)`',
            'Any object whose `__bool__` returns False or whose `__len__` returns 0',
          ],
        },
        right: {
          heading: 'Truthy — treated as True',
          points: [
            'Every non-zero number, including negatives',
            'Every non-empty string, even `"0"` and `" "`',
            'Every non-empty container',
            'Every function, class and module object',
            'Any object that defines neither `__bool__` nor `__len__`',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How Python evaluates `x > 0 and 10 / x > 2`',
        caption: 'Short-circuiting is a correctness feature, not just a speed one.',
        steps: [
          { label: 'Evaluate `x > 0`', detail: 'The left operand of `and` is always evaluated first.' },
          { label: 'If it is falsy, stop', detail: 'The whole expression takes that value. `10 / x` never runs, so `x = 0` cannot raise ZeroDivisionError.' },
          { label: 'Otherwise evaluate the right', detail: 'Only reached when `x > 0` is True, which guarantees the division is safe.' },
          { label: 'Return the deciding operand', detail: '`and` returns the first falsy operand, or the last operand if none were falsy.' },
        ],
        branching: true,
      },
      {
        kind: 'annotated',
        title: 'Why `1 < x < 10` works',
        subject: 'if 1 < x < 10:',
        annotations: [
          { part: 'Chained comparison', note: 'Python expands this to `1 < x and x < 10`, unlike C where it would compare a boolean against 10.' },
          { part: '`x` evaluated once', note: 'The middle operand is evaluated a single time, which matters if it is a function call with side effects.' },
          { part: 'Short-circuits', note: 'If `1 < x` is False, `x < 10` is never evaluated, exactly as with an explicit `and`.' },
          { part: 'Extends further', note: '`0 <= i < len(xs)` is the idiomatic bounds check, and reads exactly like the mathematical statement.' },
        ],
      },
    ],

    formalDefinition:
      'A Python expression is evaluated according to a fixed precedence and associativity grammar; the boolean operators `and` and `or` are control-flow constructs rather than functions, returning the operand that determined the result without evaluating the remaining operands. An object\'s truth value is defined by `__bool__` if present, otherwise by `__len__() != 0`, otherwise it is True.',

    math: {
      intuition:
        'The logical operators implement ordinary Boolean algebra, and two identities from it are worth knowing by name because they let you rewrite awkward conditions into readable ones. De Morgan\'s laws say that negating an `and` turns it into an `or` of negations, and vice versa — which is how you convert `not (a and b)` into something a reader can parse at a glance.',
      formulas: [
        {
          latex: '\\lnot (a \\land b) \\equiv (\\lnot a) \\lor (\\lnot b)',
          name: "De Morgan's first law",
          meaning:
            '`not (is_valid and is_ready)` is the same condition as `not is_valid or not is_ready`. Use whichever reads more naturally out loud.',
          variables: [
            { symbol: 'a, b', meaning: 'Any two boolean-valued expressions.' },
            { symbol: '\\land', meaning: 'Logical and.' },
            { symbol: '\\lor', meaning: 'Logical or.' },
            { symbol: '\\lnot', meaning: 'Logical not.' },
          ],
          category: 'complexity',
        },
        {
          latex: '\\lnot (a \\lor b) \\equiv (\\lnot a) \\land (\\lnot b)',
          name: "De Morgan's second law",
          meaning:
            '"Neither of these" becomes "not this and not that". `not (x in bad or y in bad)` is `x not in bad and y not in bad`.',
          variables: [
            { symbol: 'a, b', meaning: 'Any two boolean-valued expressions.' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Start with the condition "reject unless the file exists and is non-empty": `if not (exists and size > 0)`.',
        'Apply De Morgan: `if (not exists) or (not (size > 0))`.',
        'Simplify the inner negation of a comparison: `not (size > 0)` is `size <= 0`.',
        'Result: `if not exists or size <= 0`, which reads directly as "if it is missing, or it is empty".',
        'Nothing changed logically; the second form simply removes a level of nesting the reader had to hold in their head.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Precedence in practice',
        runnable: true,
        code: `print(2 + 3 * 4)        # multiplication binds tighter
print((2 + 3) * 4)      # parentheses override
print(2 ** 3 ** 2)      # ** is right-associative
print(-2 ** 2)          # unary minus binds LOOSER than **
print(10 - 3 - 2)       # left-associative: (10 - 3) - 2

# Comparison binds tighter than the logical operators
print(1 + 1 == 2 and 3 > 2)`,
        output: `14
20
512
-4
5
True`,
        explanation:
          'Two lines here regularly cost people a bug. `2 ** 3 ** 2` is 512, not 64, because exponentiation groups from the right, matching mathematical convention. And `-2 ** 2` is `-4`, because the unary minus applies to the *result* of the power. Neither is worth memorising as a special case; the habit worth building is to parenthesise anything you had to think about, because the next reader will have to think about it too.',
      },
      {
        language: 'python',
        title: 'Truthiness, and what `and`/`or` really return',
        runnable: true,
        code: `print(bool(0), bool(0.0), bool(""), bool([]), bool(None))
print(bool("0"), bool(" "), bool([0]), bool(-1))

# and/or return an OPERAND, not a boolean
print(0 and 5)
print(3 and 5)
print("" or "anonymous")
print("bob" or "anonymous")

# The idiomatic emptiness check
items = []
if not items:
    print("nothing to process")`,
        output: `False False False False False
True True True True
0
5
anonymous
bob
nothing to process`,
        explanation:
          'The second line is the one to stare at: `"0"` is a non-empty string and therefore truthy, as is a list containing a single zero. Emptiness is about the container, not its contents. The middle block shows that `and` returns the first falsy operand (or the last operand if none are falsy) while `or` returns the first truthy one — which is why `value or default` is such a common idiom, and also why it is subtly wrong when `0` is a legitimate value you want to keep.',
      },
      {
        language: 'python',
        title: 'Short-circuiting as a safety mechanism',
        runnable: true,
        code: `scores = []

# Safe: the second operand is only evaluated if the first is truthy
if scores and scores[0] > 90:
    print("top score")
else:
    print("no usable data")

# Unsafe ordering would raise IndexError
try:
    if scores[0] > 90 and scores:
        print("never reached")
except IndexError as e:
    print("IndexError:", e)

user = None
print(user.name if user else "guest")   # conditional expression
print(user is None, user == None)        # prefer "is" for None`,
        output: `no usable data
IndexError: list index out of range
guest
True True`,
        explanation:
          'The guard-then-use pattern in the first `if` is everywhere in real Python, and it depends entirely on the left-to-right short-circuit guarantee — this is specified behaviour, not an optimisation you are hoping for. The conditional expression `a if cond else b` is the expression form of an if-statement, useful when you need a value rather than a branch. The last line shows that `is None` and `== None` agree here, but `is` is correct because `==` can be overridden by a class to do something surprising, and NumPy arrays in particular return an array rather than a bool.',
      },
      {
        language: 'python',
        title: 'Augmented assignment is not always what it seems',
        runnable: true,
        code: `n = 5
n += 1          # rebinds n to a new int object (ints are immutable)
print(n)

a = [1, 2]
b = a
a += [3]        # for lists, += calls extend() and MUTATES in place
print(a, b, a is b)

c = [1, 2]
d = c
c = c + [3]     # + builds a NEW list; d is unaffected
print(c, d, c is d)`,
        output: `6
[1, 2, 3] [1, 2, 3] True
[1, 2, 3] [1, 2] False`,
        explanation:
          'This asymmetry is one of Python\'s genuinely sharp edges. For immutable types such as ints and strings, `x += y` must create a new object and rebind. For lists, `+=` is defined to call `__iadd__`, which extends in place, so every other name pointing at that list sees the change. `x = x + y` always builds a new object. The rule to remember: `+=` on a mutable object mutates; on an immutable one it rebinds.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Guarding a configuration lookup',
        usage:
          '`if config and config.get("gpu"):` avoids two separate error paths — a `None` config and a missing key — in a single readable condition, relying on short-circuiting for both.',
      },
      {
        context: 'Default values from user input',
        usage:
          '`model_name = args.model or "resnet50"` picks the flag when it was provided and falls back otherwise. Note the bug this idiom has with numeric options: `epochs = args.epochs or 10` silently replaces a deliberate `0` with `10`, which is why production code uses `if args.epochs is None`.',
      },
      {
        context: 'Filtering rows in a data pipeline',
        usage:
          'Conditions like `if row["age"] is not None and 18 <= row["age"] < 65` combine a null check, a chained comparison and short-circuiting in one line — a shape you will meet in every cleaning script you read.',
      },
      {
        context: 'Early-exit validation',
        usage:
          'Input validators are written as a chain of `if not x: return error` guards precisely because truthiness lets one condition cover `None`, empty string and empty list at once.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'Redefines `and`/`or` semantics: `if array:` raises "truth value of an array is ambiguous", and element-wise logic uses `&` and `|` with parentheses.' },
      { tool: 'pandas', role: 'Boolean masks use `&`, `|`, `~` on Series, never `and`/`or`, because the operators must apply element-wise.' },
      { tool: 'argparse', role: 'The `value or default` idiom appears constantly in CLI code and is the classic place where falsy zero causes a bug.' },
      { tool: 'pytest', role: 'Assertion rewriting shows the value of each sub-expression when a compound condition fails, which is easier to read if you kept the condition simple.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing `if x == True:` or `if len(items) > 0:`',
        why: 'Both restate what truthiness already says, and `== True` is subtly wrong for truthy non-boolean values: `if 3 == True` is False even though `3` is truthy.',
        fix: 'Write `if x:` and `if items:`. Use an explicit comparison only when you genuinely mean "is the boolean True", which is rare.',
      },
      {
        mistake: 'Using `and`/`or` on NumPy arrays or pandas Series',
        why: 'Those objects cannot answer "are you true?" for more than one element, so Python raises `ValueError: The truth value of an array with more than one element is ambiguous`.',
        fix: 'Use element-wise `&`, `|` and `~`, and parenthesise each comparison: `df[(df.a > 0) & (df.b < 5)]`. The bitwise operators bind tighter than comparisons, so the parentheses are mandatory.',
      },
      {
        mistake: '`value or default` where `0` or `""` is a legitimate value',
        why: '`or` tests truthiness, not "was it provided", so a deliberate `0`, `""` or `False` is silently replaced by the default.',
        fix: 'Test for absence explicitly: `value if value is not None else default`.',
      },
      {
        mistake: 'Assuming `-2 ** 2` is `4`',
        why: 'Exponentiation binds more tightly than unary minus, so the expression is `-(2 ** 2)`.',
        fix: 'Write `(-2) ** 2` when that is what you mean. More generally, parenthesise anything whose grouping you had to pause over.',
      },
      {
        mistake: 'Using `is` to compare numbers or strings for equality',
        why: '`is` tests object identity. It appears to work for small integers and short literals because CPython caches them, then fails for larger values: `a = 1000; b = 1000; a is b` can be False.',
        fix: 'Use `==` for value comparison. Reserve `is` for `None`, `True`, `False` and genuine identity checks.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does `0 or "default"` evaluate to, and what does that tell you about how `or` works?',
        answer:
          'It evaluates to `"default"`. `or` does not return a boolean; it returns the first operand that is truthy, or the last operand if none are. Since `0` is falsy, evaluation moves on to `"default"`, which is truthy, and that object is the result. The same mechanism makes `"bob" or "default"` return `"bob"` without even looking at the right-hand side. This is why the `x or fallback` idiom exists, and also why it is a bug when `0`, `""` or `False` are legitimate values — there you must test `x is None` instead.',
        followUp:
          'A strong answer mentions that `and` is the mirror image: it returns the first falsy operand, or the last operand if all are truthy.',
      },
      {
        level: 'intermediate',
        question: 'Why does `if my_dataframe:` raise an error when `if my_list:` does not?',
        answer:
          'Truthiness is determined by `__bool__`, falling back to `__len__`. A list answers "am I empty?" unambiguously. A pandas DataFrame or NumPy array deliberately raises `ValueError: The truth value of an array with more than one element is ambiguous` because there is no single sensible answer — the user might mean "any element", "all elements" or "is it non-empty", and silently picking one would hide bugs. The explicit forms are `df.empty`, `arr.size > 0`, `arr.any()` or `arr.all()`, and for element-wise combination you use `&` and `|` with parenthesised operands rather than `and` and `or`.',
      },
      {
        level: 'internship',
        question: 'Explain short-circuit evaluation and give a case where it is required for correctness, not just speed.',
        answer:
          'In `a and b`, Python evaluates `a` first and, if it is falsy, returns it immediately without evaluating `b`; `or` mirrors this for truthy left operands. This is a language guarantee of left-to-right evaluation, not an optimisation. Correctness cases are the guard-then-use pattern: `if items and items[0] > 5` cannot raise `IndexError` on an empty list, and `if user is not None and user.is_active` cannot raise `AttributeError` on `None`. Reversing the operands in either example turns working code into a crash. The same reasoning applies to expensive operands — `if cheap_check() and expensive_query()` avoids a database round trip whenever the cheap check already settles the answer.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Without running it, evaluate: `2 + 3 * 4 ** 2 // 5 - 1`. Then check.',
        hint: 'Work outwards from the highest-precedence operator: `**` first, then `*` and `//` left to right, then `+` and `-`.',
        solution:
          'The answer is `10`.\n\nStep by step: `4 ** 2` is `16`. Then `*` and `//` have equal precedence and group left to right, so `3 * 16` is `48` and `48 // 5` is `9`. Finally `2 + 9 - 1` is `10`. The lesson is not the number but the method: resolve the tightest-binding operator first, then work down the table, and group equal-precedence operators left to right (except `**`, which groups right).',
      },
      {
        prompt:
          'Rewrite `if not (user_is_active and has_paid):` so that it contains no negation of a parenthesised group, and explain why the result is easier to read.',
        hint: "De Morgan's law turns a negated `and` into an `or` of negations.",
        solution:
          '`if not user_is_active or not has_paid:`\n\nBoth forms are logically identical, but the second can be read straight through as "if they are inactive, or they have not paid" without the reader having to mentally distribute the `not` across the group. As a general rule, push negations down to the individual conditions and keep the top level positive; that is where most "I read this condition three times" moments come from.',
      },
      {
        prompt:
          'Predict the output:\n\n```\na = [1, 2]\nb = a\na += [3]\nprint(b)\n\nc = [1, 2]\nd = c\nc = c + [3]\nprint(d)\n```',
        hint: 'One of these mutates the shared object; the other rebinds a name.',
        solution:
          'It prints `[1, 2, 3]` then `[1, 2]`.\n\n`+=` on a list calls `__iadd__`, which extends the existing list in place, so `b` — which points at the same object — sees the new element. `c + [3]` builds a brand-new list and rebinds `c` to it, leaving the object `d` points at untouched. For immutable types such as ints and strings the two forms are equivalent, which is exactly why the list behaviour surprises people.',
      },
    ],

    quiz: [
      {
        id: 'PY-005-q1',
        type: 'code-output',
        language: 'python',
        concept: 'boolean operators return operands',
        prompt: 'What does this print?',
        code: 'print(0 or [] or "fallback" or 99)',
        options: ['fallback', 'True', '0', '99'],
        answerIndex: 0,
        explanation:
          '`or` returns the first truthy operand. `0` and `[]` are both falsy, so evaluation continues to `"fallback"`, which is truthy and is returned immediately — `99` is never evaluated.',
      },
      {
        id: 'PY-005-q2',
        type: 'multi',
        concept: 'truthiness',
        prompt: 'Which of these values are falsy in Python? Select all that apply.',
        options: ['`0`', '`"0"`', '`[]`', '`[0]`', '`None`', '`" "`'],
        answerIndices: [0, 2, 4],
        explanation:
          'Falsy means the number zero, an empty container, an empty string, `None` or `False`. `"0"` and `" "` are non-empty strings and `[0]` is a non-empty list, so all three are truthy — emptiness is about the container, not about what is inside it.',
      },
      {
        id: 'PY-005-q3',
        type: 'mcq',
        concept: 'precedence',
        prompt: 'What is the value of `-2 ** 2`?',
        options: ['-4', '4', '-2', 'It is a syntax error'],
        answerIndex: 0,
        explanation:
          'Exponentiation binds more tightly than unary minus, so Python evaluates `-(2 ** 2)` giving `-4`. Write `(-2) ** 2` if you want `4`.',
      },
      {
        id: 'PY-005-q4',
        type: 'truefalse',
        concept: 'short-circuiting',
        prompt: 'In `if items and items[0] > 5:`, the expression `items[0]` is evaluated even when `items` is an empty list.',
        answer: false,
        explanation:
          '`and` short-circuits: an empty list is falsy, so evaluation stops and returns it without ever touching `items[0]`. This is a language guarantee, which is what makes the guard-then-use pattern safe.',
      },
      {
        id: 'PY-005-q5',
        type: 'debug',
        language: 'python',
        concept: 'boolean operators on arrays',
        prompt: 'This raises `ValueError: The truth value of a Series is ambiguous`. What is the fix?',
        code: 'import pandas as pd\ndf = pd.DataFrame({"a": [1, 5], "b": [2, 9]})\nrows = df[(df.a > 0) and (df.b < 5)]',
        options: [
          'Use `&` instead of `and`: `df[(df.a > 0) & (df.b < 5)]`',
          'Remove the parentheses around each comparison',
          'Convert the DataFrame to a list first',
          'Use `df.a > 0 and df.b < 5` without brackets',
        ],
        answerIndex: 0,
        explanation:
          '`and` needs a single truth value, but a Series has one per row. `&` applies the logic element-wise. The parentheses are required because `&` binds more tightly than `>`, so without them Python would try `df.a > (0 & df.b) < 5`.',
      },
      {
        id: 'PY-005-q6',
        type: 'order',
        concept: 'precedence order',
        prompt: 'Order these operator groups from highest precedence (evaluated first) to lowest.',
        items: ['`**`', '`*`, `/`, `//`, `%`', '`+`, `-`', 'comparisons (`<`, `==`, `in`, `is`)', '`not`', '`and`', '`or`'],
        explanation:
          'Arithmetic binds tighter than comparison, which binds tighter than logic, and within logic the order is `not`, then `and`, then `or`. That is why `a or b and c` means `a or (b and c)`.',
      },
      {
        id: 'PY-005-q7',
        type: 'explain',
        concept: 'idiomatic conditions',
        prompt: 'Explain why `if items:` is preferred over `if len(items) > 0:` and when the longer form is still the right choice.',
        rubric: [
          'States that empty containers are falsy, so the two are equivalent for lists, dicts, sets and strings',
          'Notes that the short form is the established idiom and works for any container type',
          'Gives a case where explicitness wins, such as NumPy arrays or when you genuinely need the count',
        ],
        sampleAnswer:
          'An empty list, dict, set, tuple or string is already falsy, so `if items:` asks exactly the question `len(items) > 0` asks, with less noise, and it keeps working for any object that defines `__len__` or `__bool__` — including custom classes. The longer form earns its place in two situations: when the object is a NumPy array or pandas object, where truthiness is deliberately an error and you must say `arr.size > 0` or `df.empty`; and when the count itself is part of the logic, such as `if len(batch) == batch_size`. Otherwise the short form is what a Python reviewer expects to see.',
        explanation:
          'The examinable idea is that truthiness is a protocol, not a special case for a few built-in types, and that explicitness matters precisely where the protocol is deliberately unavailable.',
      },
    ],

    flashcards: [
      { front: 'What does `and` return?', back: 'The first falsy operand, or the last operand if none are falsy — not necessarily a boolean.' },
      { front: 'Name every falsy value in Python.', back: '`False`, `None`, zero of any numeric type, and empty containers/strings. Everything else is truthy.' },
      { front: 'Why is `if items and items[0] > 5` safe?', back: '`and` short-circuits left to right, so `items[0]` is never evaluated when `items` is empty.' },
      { front: 'What is `2 ** 3 ** 2`?', back: '512. Exponentiation is right-associative, so it groups as `2 ** (3 ** 2)`.' },
      { front: 'Why use `&` instead of `and` with pandas?', back: '`and` needs one truth value; a Series has many. `&` applies element-wise — and each comparison must be parenthesised.' },
      { front: 'When does `x += y` mutate rather than rebind?', back: 'When `x` is mutable. For a list, `+=` calls `extend` in place, so other names pointing at it see the change.' },
    ],

    challenge: {
      title: 'A condition-readability refactor',
      brief:
        'You are given a validation function written as one deeply nested condition full of negations, `== True` comparisons and `len(x) > 0` checks. Rewrite it as a sequence of early-return guards using idiomatic truthiness, with every negation pushed down to the individual condition using De Morgan where needed. The behaviour must be identical, including for the edge case where a numeric field is legitimately zero.',
      language: 'python',
      acceptanceCriteria: [
        'No `== True`, `== False` or `len(x) > 0` remains',
        'No condition negates a parenthesised group',
        'A field whose value is a legitimate `0` is still accepted, not treated as missing',
        'Each guard returns a message naming the specific problem, rather than one generic failure',
      ],
      starterCode:
        'def validate(record):\n    if not (record != None and len(record.get("name", "")) > 0 and record.get("age") != None):\n        return "invalid"\n    return "ok"\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who knows variables and numbers how Python decides what a condition means, covering precedence, truthiness and short-circuiting.',
      mustCover: [
        'Expressions evaluate to values, and precedence decides which part is worked out first',
        'Every value has a truth value, and only a small set of values are falsy',
        '`and` and `or` stop as soon as the answer is decided',
        '`and` and `or` return one of their operands rather than a boolean',
      ],
      bonusSignals: ['gives the guard-then-use example', 'mentions the `value or default` pitfall with zero', 'mentions that chained comparisons expand to an `and`'],
      sampleExplanation:
        "When Python meets a condition it works it out in a fixed order, the same way arithmetic does multiplication before addition: powers first, then multiplication and division, then addition, then comparisons, and logic last of all. So `a + 1 > b and c` compares before it combines, which is usually what you meant. The second thing to know is that Python does not insist you give it `True` or `False`. Every value can act as a condition: zero, an empty list, an empty string and `None` all count as no, and literally everything else counts as yes. That is why `if items:` is the normal way to ask whether a list has anything in it. The third thing is that Python is lazy in a useful way. In `a and b`, if `a` already says no, it never bothers looking at `b` — so `if items and items[0] > 5` is safe even when the list is empty, because the dangerous part is never reached. One twist follows from that laziness: `and` and `or` hand back whichever value settled the matter, not a plain yes or no, which is why `name or \"anonymous\"` gives you the name when there is one and the fallback when there is not.",
    },
  },

  {
    id: 'PY-006',
    domain: 'PY',
    module: 'Collections',
    topic: 'Lists',
    title: 'Lists',
    slug: 'lists',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['PY-005'],
    related: ['PY-002', 'PY-004'],
    tags: ['list', 'mutation', 'slicing', 'sorting', 'aliasing', 'sequence'],

    learningObjectives: [
      'Create, index, slice and iterate over a list',
      'Choose the right mutating method: `append`, `extend`, `insert`, `pop`, `remove`',
      'Explain why mutation is visible through every name bound to the same list',
      'Sort with `sorted` versus `.sort()`, including a `key` function and `reverse`',
      'Copy a list at the right depth — shallow with `.copy()`, deep with `copy.deepcopy`',
    ],

    terminology: [
      {
        term: 'List',
        definition:
          'An ordered, mutable sequence that can hold objects of any types, implemented as a dynamic array of pointers.',
        simple: 'A numbered row of boxes you can add to, remove from and rearrange.',
      },
      {
        term: 'Mutation',
        definition:
          'Changing the contents of an existing object rather than creating a new one. `xs.append(4)` mutates; `xs + [4]` does not.',
        simple: 'Editing the thing you already have, instead of making a fresh copy.',
      },
      {
        term: 'Aliasing',
        definition:
          'Two or more names bound to the same list object, so a mutation through one name is visible through all of them.',
        simple: 'Two nicknames for one list.',
      },
      {
        term: 'Shallow copy',
        definition:
          'A new list containing the same element references. The outer list is independent; nested objects are still shared.',
        simple: 'A new row of boxes holding pointers to the very same contents.',
      },
      {
        term: 'Stable sort',
        definition:
          "A sort that preserves the original relative order of items that compare equal. Python's `sorted` and `.sort()` are guaranteed stable.",
        simple: 'Items that tie stay in the order they were already in.',
      },
    ],

    simpleExplanation:
      "A list is an ordered collection you can change. You write it with square brackets, you reach into it by position starting at zero, and you slice it exactly the way you sliced strings. The difference from a string is that a list can be edited in place: `scores.append(88)` adds to the end of the list you already have, rather than handing you a new one. That single fact is what makes lists so useful and so easy to get wrong. Because editing happens to the object itself, every name pointing at that object sees the change — so if you wrote `backup = scores` expecting a safety copy, you did not get one; you got a second name for the same list. A list can hold anything, including other lists, and does not care whether the things inside it are all the same type. In practice you will use lists for anything where order matters and the size is not known in advance: rows read from a file, predictions from a model, the batch you are accumulating.",

    whyItExists:
      'Programs almost always need to handle "several of something" whose count is not known when you write the code. A list gives you a growable, ordered container with constant-time access by position, so you can collect results as you compute them and process them in order without managing memory yourself.',

    analogy: {
      scenario:
        "Think of a numbered shelf in a warehouse. Slot 0 is the first slot, and you can walk straight to slot 47 without passing the other forty-six — that is what makes lookup fast. Adding a box to the end is easy. Wedging a box into the middle is not: every box after it has to shuffle along one slot. And if two people have the same shelf number written down, a box added by one of them is a box the other one finds there too, because there is only one shelf.",
      mapping: [
        { from: 'Walking straight to slot 47', to: 'Indexing, `xs[47]`, which is O(1)' },
        { from: 'Adding a box at the end', to: '`xs.append(item)`, amortised O(1)' },
        { from: 'Shuffling every later box along', to: '`xs.insert(0, item)` or `xs.pop(0)`, which are O(n)' },
        { from: 'Two people holding the same shelf number', to: 'Aliasing: `backup = scores` binds a second name to one object' },
        { from: 'Photocopying the shelf contents onto a new shelf', to: '`scores.copy()`, a shallow copy' },
      ],
      bridge:
        'The shelf picture predicts the performance rules exactly: because a list is a contiguous array of pointers, position lookup is instant and end-insertion is cheap, while front-insertion and front-removal cost time proportional to the length. It also predicts the aliasing bug precisely — the shelf number is the reference, and copying the number is not copying the shelf.',
      limitations:
        'The warehouse suggests boxes sit in the slots. In CPython the slots hold *references* to objects stored elsewhere, which is why a shallow copy of a list of lists still shares the inner lists.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'List operations and their cost',
        caption: 'n is the length of the list. Knowing these turns "why is this slow?" into an answerable question.',
        columns: ['Operation', 'Example', 'Cost', 'Notes'],
        rows: [
          ['Index', '`xs[5]`', 'O(1)', 'Direct address arithmetic; length is irrelevant.'],
          ['Append', '`xs.append(v)`', 'O(1) amortised', 'Occasionally reallocates, but the average stays constant.'],
          ['Insert at front', '`xs.insert(0, v)`', 'O(n)', 'Every later element shifts. Use `collections.deque` if you do this often.'],
          ['Pop from end', '`xs.pop()`', 'O(1)', 'The reason a list makes a good stack.'],
          ['Pop from front', '`xs.pop(0)`', 'O(n)', 'Same shifting problem as inserting at the front.'],
          ['Membership', '`v in xs`', 'O(n)', 'A linear scan. If you do this in a loop, use a set instead.'],
          ['Sort', '`xs.sort()`', 'O(n log n)', 'Timsort — stable, and very fast on partly ordered data.'],
          ['Slice', '`xs[a:b]`', 'O(b - a)', 'Builds a new list; it is a copy, not a view.'],
        ],
      },
      {
        kind: 'compare',
        title: '`sorted(xs)` versus `xs.sort()`',
        caption: 'Choosing the wrong one is the most common list bug after aliasing.',
        left: {
          heading: '`sorted(xs)` — returns a new list',
          points: [
            'Leaves `xs` untouched',
            'Works on any iterable: strings, sets, dict keys, generators',
            'Always returns a list',
            'Use when you need both orders, or the original must not change',
          ],
        },
        right: {
          heading: '`xs.sort()` — sorts in place',
          points: [
            'Modifies `xs` and returns `None`',
            'Only exists on lists',
            '`xs = xs.sort()` is a classic bug: it sets `xs` to `None`',
            'Use when the original order is genuinely not needed, to avoid a copy',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'What `b = a` really does, and how to get a real copy',
        caption: 'Three levels of independence, three different tools.',
        steps: [
          { label: '`b = a`', detail: 'No copy at all. One list, two names. Any mutation is shared.' },
          { label: '`b = a.copy()`', detail: 'A new outer list holding the same element references. Appending to `b` no longer affects `a`.' },
          { label: 'But nested objects are still shared', detail: 'If `a[0]` is itself a list, `b[0]` is the same inner list; `b[0].append(9)` shows up in `a`.' },
          { label: '`b = copy.deepcopy(a)`', detail: 'Recursively copies everything. Fully independent, and the most expensive option.' },
        ],
        branching: true,
      },
      {
        kind: 'widget',
        title: 'Index and slice a list interactively',
        caption: 'Watch how positive and negative indices address the same slots from opposite ends.',
        widget: 'array-indexing',
      },
    ],

    formalDefinition:
      '`list` is a mutable sequence type implemented in CPython as a dynamic array of `PyObject*` pointers with over-allocation, giving O(1) indexing and amortised O(1) append at the cost of O(n) insertion and deletion at arbitrary positions. Lists are heterogeneous, unhashable, and support the full mutable sequence protocol including slice assignment.',

    codeExamples: [
      {
        language: 'python',
        title: 'Building and reshaping a list',
        runnable: true,
        code: `scores = [88, 92, 79]

scores.append(95)          # add one item to the end
scores.extend([70, 61])    # add several items
scores.insert(0, 100)      # put one at the front (shifts everything)
print(scores)

worst = scores.pop()       # remove and return the last item
print(worst, scores)

scores.remove(79)          # remove the first item EQUAL to 79
print(scores)

print(len(scores), max(scores), sum(scores) / len(scores))
print(scores[1:4], scores[-2:], scores[::-1])`,
        output: `[100, 88, 92, 79, 95, 70, 61]
61 [100, 88, 92, 79, 95, 70]
[100, 88, 92, 95, 70]
5 100 91.0
[88, 92, 95] [95, 70] [70, 95, 92, 88, 100]`,
        explanation:
          'Note the difference between `append` and `extend`: `append([70, 61])` would have added one element that happens to be a list, giving a nested structure, whereas `extend` adds the items individually. `remove` deletes by *value* and raises `ValueError` if the value is absent, while `pop` deletes by *position* and hands the item back. Slicing behaves exactly as it did for strings, including the negative step that reverses.',
      },
      {
        language: 'python',
        title: 'Aliasing, and three depths of copy',
        runnable: true,
        code: `import copy

a = [[1, 2], [3, 4]]

alias = a                      # no copy: one object, two names
shallow = a.copy()             # new outer list, same inner lists
deep = copy.deepcopy(a)        # fully independent

a.append([5, 6])               # affects alias only
a[0].append(99)                # affects alias AND shallow

print("a      ", a)
print("alias  ", alias)
print("shallow", shallow)
print("deep   ", deep)`,
        output: `a       [[1, 99, 2], [3, 4], [5, 6]]
alias   [[1, 99, 2], [3, 4], [5, 6]]
shallow [[1, 99, 2], [3, 4]]
deep    [[1, 2], [3, 4]]`,
        explanation:
          'This is the whole aliasing lesson in one run. `alias` tracks every change because it is literally the same object. `shallow` missed the appended third row — its outer list is independent — but it saw the `99`, because its first element is the same inner list object that `a[0]` refers to. Only `deep` is untouched. The practical rule: `.copy()` is enough for a flat list, and you need `deepcopy` the moment the elements are themselves mutable.',
      },
      {
        language: 'python',
        title: 'Sorting with a key',
        runnable: true,
        code: `runs = [
    {"model": "resnet", "acc": 0.91, "epochs": 30},
    {"model": "vit", "acc": 0.94, "epochs": 12},
    {"model": "mlp", "acc": 0.91, "epochs": 5},
]

best = sorted(runs, key=lambda r: r["acc"], reverse=True)
for r in best:
    print(r["model"], r["acc"])

print("---")
# Tie-break: accuracy descending, then epochs ascending
ranked = sorted(runs, key=lambda r: (-r["acc"], r["epochs"]))
print([r["model"] for r in ranked])

names = ["vit", "ResNet", "mlp"]
print(sorted(names))                  # capitals sort before lowercase
print(sorted(names, key=str.lower))   # case-insensitive`,
        output: `vit 0.94
resnet 0.91
mlp 0.91
---
['vit', 'mlp', 'resnet']
['ResNet', 'mlp', 'vit']
['mlp', 'ResNet', 'vit']`,
        explanation:
          'The `key` function is called once per element and the results are what get compared, so it is both flexible and efficient. Returning a tuple gives multi-level sorting, with the negation trick reversing just one level — `reverse=True` would have reversed both. Notice the first `sorted(names)`: comparison is by code point, so every capital letter sorts before every lowercase one, which is why real code passes `key=str.lower` whenever a human will read the result. Python\'s sort is stable, so `mlp` and `resnet` keep their original relative order when their accuracies tie.',
      },
      {
        language: 'python',
        title: 'The mutation-while-iterating trap',
        runnable: true,
        code: `nums = [1, 2, 3, 4, 5, 6]

# Wrong: removing shifts later items past the cursor
wrong = nums.copy()
for x in wrong:
    if x % 2 == 0:
        wrong.remove(x)
print("wrong  ", wrong)

# Right: build a new list
right = [x for x in nums if x % 2 != 0]
print("right  ", right)

# Also right: assign back through a full slice, keeping the same object
nums[:] = [x for x in nums if x % 2 != 0]
print("in place", nums)`,
        output: `wrong   [1, 3, 5]
right   [1, 3, 5]
in place [1, 3, 5]`,
        explanation:
          'The first loop happens to give the right answer here, which is exactly what makes it dangerous — with `[1, 2, 2, 3]` it would leave a `2` behind, because removing an item shifts the next one into the position the loop cursor has already passed. Never mutate a list you are iterating over. Build a new one, or, when other names must see the change, assign into the full slice with `nums[:] = ...`, which replaces the contents of the existing object rather than rebinding the name.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Accumulating model predictions',
        usage:
          'An inference loop appends each batch of predictions to a list and concatenates once at the end. Appending is O(1), so this stays fast even for millions of rows, whereas concatenating arrays inside the loop would be quadratic.',
      },
      {
        context: 'Reading a data file',
        usage:
          '`rows = [line.strip().split(",") for line in f]` produces a list of lists — the shape every CSV reader and DataFrame constructor starts from.',
      },
      {
        context: 'Ranking search or recommendation results',
        usage:
          '`sorted(items, key=lambda i: (-i.score, i.title))` is precisely how a results page is ordered: best score first, ties broken alphabetically so the ordering is deterministic between runs.',
      },
      {
        context: 'A worklist in a graph algorithm',
        usage:
          'Depth-first search uses a list as a stack with `append` and `pop`. Breadth-first search needs the front, so it uses `collections.deque` — because `pop(0)` on a list is O(n).',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'A list is the usual input to `np.array(...)`, but arrays are fixed-size and homogeneous, which is what buys the speed.' },
      { tool: 'pandas', role: '`pd.DataFrame(list_of_dicts)` is the most common way to build a DataFrame from code you wrote yourself.' },
      { tool: 'collections.deque', role: 'The right structure when you need O(1) appends and pops at both ends, as in BFS queues and sliding windows.' },
      { tool: 'PyTorch DataLoader', role: 'Batches are assembled from lists of samples by a collate function before being stacked into tensors.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing `xs = xs.sort()`',
        why: '`.sort()` sorts in place and returns `None`, so the name is rebound to `None` and the sorted list is lost. The next line fails with `TypeError: object is not iterable` or `subscriptable`.',
        fix: 'Either `xs.sort()` on its own line, or `ys = sorted(xs)`. Never combine the two forms.',
      },
      {
        mistake: 'Treating `b = a` as a copy',
        why: 'Assignment binds a second name to the same object, so any mutation through either name is visible through both.',
        fix: '`b = a.copy()` for a flat list, `copy.deepcopy(a)` when elements are themselves mutable.',
      },
      {
        mistake: 'Removing items from a list while iterating over it',
        why: 'The iterator advances by index, so deleting an element shifts the following one into a position the cursor has already passed, and it gets skipped.',
        fix: 'Build a new list with a comprehension, or iterate over a copy: `for x in xs.copy():`. To keep the same object, assign with `xs[:] = [...]`.',
      },
      {
        mistake: 'Using `in` on a large list inside a loop',
        why: 'Membership on a list is a linear scan, so checking n items against a list of m is O(n × m) — the classic reason a script that worked on 1,000 rows takes hours on a million.',
        fix: 'Convert the haystack to a set once: `known = set(big_list)`, then `x in known` is O(1) on average.',
      },
      {
        mistake: 'Creating a grid with `[[0] * 3] * 3`',
        why: 'The outer `* 3` repeats the *same inner list reference* three times, so setting `grid[0][0] = 1` changes all three rows.',
        fix: 'Build each row separately: `[[0] * 3 for _ in range(3)]`. The comprehension evaluates `[0] * 3` afresh on each iteration.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between `list.append` and `list.extend`?',
        answer:
          '`append` adds its argument as a single element, so `xs.append([1, 2])` makes the last element a two-item list and grows the length by one. `extend` iterates over its argument and adds each item individually, so `xs.extend([1, 2])` grows the length by two and adds no nesting. `extend` accepts any iterable, so `xs.extend("ab")` appends the characters `"a"` and `"b"`, which surprises people who pass a string by accident. The `+=` operator on a list is equivalent to `extend`.',
      },
      {
        level: 'intermediate',
        question: 'Why is `list.pop(0)` O(n) while `list.pop()` is O(1), and what should you use instead?',
        answer:
          'A CPython list is a contiguous array of pointers, so removing the last element just decrements the length, which is constant time. Removing the first element requires shifting every remaining pointer one slot to the left, which is linear in the length. If you need a first-in-first-out queue, use `collections.deque`, which is a doubly linked list of fixed-size blocks and gives O(1) `append`, `appendleft`, `pop` and `popleft`. This is exactly why breadth-first search implementations use a deque while depth-first search can use a plain list as a stack.',
        followUp:
          'A strong answer notes that the same reasoning makes `insert(0, x)` O(n) and that repeatedly popping from the front turns an O(n) algorithm into an O(n squared) one.',
      },
      {
        level: 'internship',
        question: 'Explain what `[[0] * 3] * 3` produces and why it is almost never what the author wanted.',
        answer:
          'The inner expression builds one list of three zeros. The outer `* 3` then builds a list containing three references to *that same* list object — not three separate rows. So `grid[0][0] = 1` appears to change the first cell of every row, because there is only one row object viewed through three references. The correct construction is `[[0] * 3 for _ in range(3)]`, where the comprehension re-evaluates `[0] * 3` on each iteration and therefore creates three distinct lists. This is the same aliasing principle as `b = a`, and it is also why a shallow copy of a nested list is not enough.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Given `xs = [5, 3, 9, 1]`, produce a sorted copy while leaving `xs` unchanged, then sort `xs` itself in descending order.',
        hint: 'One of these two operations returns a value; the other returns `None`.',
        language: 'python',
        starterCode: 'xs = [5, 3, 9, 1]\n',
        solution:
          '```\nxs = [5, 3, 9, 1]\nascending = sorted(xs)      # [1, 3, 5, 9]; xs untouched\nxs.sort(reverse=True)       # xs is now [9, 5, 3, 1]\n```\n\n`sorted` builds and returns a new list, so it is the right tool when you need the original too. `.sort()` returns `None` deliberately, as a signal that it mutated in place — writing `xs = xs.sort()` would leave `xs` as `None`.',
      },
      {
        prompt:
          'Write code that removes every negative number from `values = [3, -1, 4, -2, 5]`, keeping the same list object so that any other name bound to it sees the change.',
        hint: 'A comprehension builds a new list; full-slice assignment puts new contents into the existing object.',
        solution:
          '```\nvalues = [3, -1, 4, -2, 5]\nalias = values\nvalues[:] = [v for v in values if v >= 0]\nprint(values, alias)   # [3, 4, 5] [3, 4, 5]\n```\n\nThe comprehension is evaluated first, producing `[3, 4, 5]`, and then `values[:] = ...` replaces the contents of the existing list rather than rebinding the name. Writing `values = [v for v in values if v >= 0]` would also give the right contents but would leave `alias` pointing at the old, unfiltered list.',
      },
      {
        prompt:
          'You have `pairs = [("ada", 92), ("bob", 78), ("cal", 92)]`. Sort so that higher scores come first and, among equal scores, names are alphabetical.',
        hint: 'A tuple key sorts on the first element, then the second. Negating a number reverses just that level.',
        solution:
          '```\nranked = sorted(pairs, key=lambda p: (-p[1], p[0]))\n# [("ada", 92), ("cal", 92), ("bob", 78)]\n```\n\nThe key returns `(-92, "ada")` for the first entry, so ascending order on the negated score is descending order on the score. `reverse=True` would not work here because it would also reverse the alphabetical tie-break. Because Python\'s sort is stable, an alternative is to sort by name first and then by score, relying on the first sort to survive the second.',
      },
    ],

    quiz: [
      {
        id: 'PY-006-q1',
        type: 'code-output',
        language: 'python',
        concept: 'sort returns None',
        prompt: 'What does this print?',
        code: 'xs = [3, 1, 2]\nys = xs.sort()\nprint(ys)',
        options: ['None', '[1, 2, 3]', '[3, 1, 2]', 'It raises a TypeError'],
        answerIndex: 0,
        explanation:
          '`.sort()` sorts the list in place and returns `None` as a deliberate signal that it mutated rather than produced a value. `xs` is now `[1, 2, 3]`, but `ys` is `None`.',
      },
      {
        id: 'PY-006-q2',
        type: 'code-output',
        language: 'python',
        concept: 'append vs extend',
        prompt: 'What does this print?',
        code: 'xs = [1, 2]\nxs.append([3, 4])\nprint(len(xs), xs)',
        options: ['3 [1, 2, [3, 4]]', '4 [1, 2, 3, 4]', '2 [1, 2]', '3 [1, 2, 3]'],
        answerIndex: 0,
        explanation:
          '`append` adds its argument as one element, so the list gains a single item that happens to be a list. `extend([3, 4])` would have added the two numbers individually, giving a length of four.',
      },
      {
        id: 'PY-006-q3',
        type: 'debug',
        language: 'python',
        concept: 'repetition and aliasing',
        prompt: 'Setting one cell changes a whole column. What is wrong?',
        code: 'grid = [[0] * 3] * 3\ngrid[0][0] = 1\nprint(grid)   # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]',
        options: [
          'The outer `* 3` repeats the same inner list reference three times',
          '`[0] * 3` creates a tuple, which cannot be indexed',
          'Assignment to `grid[0][0]` is not allowed on nested lists',
          'The inner list needs to be longer than the outer one',
        ],
        answerIndex: 0,
        explanation:
          'Repetition copies references, not objects, so all three rows are one list seen three times. `[[0] * 3 for _ in range(3)]` re-evaluates the row expression each iteration and produces three distinct lists.',
      },
      {
        id: 'PY-006-q4',
        type: 'match',
        concept: 'operation costs',
        prompt: 'Match each list operation to its time complexity.',
        pairs: [
          { left: '`xs[5]`', right: 'O(1)' },
          { left: '`xs.append(v)`', right: 'O(1) amortised' },
          { left: '`xs.insert(0, v)`', right: 'O(n)' },
          { left: '`v in xs`', right: 'O(n)' },
          { left: '`xs.sort()`', right: 'O(n log n)' },
        ],
        explanation:
          'A list is a contiguous array of references: position lookup is address arithmetic, end-append is usually just writing into spare capacity, and anything touching the front has to shift every later element.',
      },
      {
        id: 'PY-006-q5',
        type: 'truefalse',
        concept: 'shallow copy depth',
        prompt: '`b = a.copy()` makes `b` completely independent of `a`, even when `a` contains nested lists.',
        answer: false,
        explanation:
          '`.copy()` is shallow: the outer list is new, but the elements are the same objects. Mutating `a[0]` is therefore still visible through `b[0]`. Use `copy.deepcopy` for full independence.',
      },
      {
        id: 'PY-006-q6',
        type: 'multi',
        concept: 'safe iteration',
        prompt: 'Which of these correctly remove the even numbers from `xs` without skipping elements? Select all that apply.',
        options: [
          '`xs = [x for x in xs if x % 2]`',
          '`xs[:] = [x for x in xs if x % 2]`',
          '`for x in xs: \n    if x % 2 == 0: xs.remove(x)`',
          '`for x in xs.copy(): \n    if x % 2 == 0: xs.remove(x)`',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Option 3 mutates the list being iterated, so indices shift and elements get skipped. The other three either build a new list or iterate over a separate copy. Options 1 and 2 differ in whether other names bound to the original list see the change.',
      },
      {
        id: 'PY-006-q7',
        type: 'explain',
        concept: 'when not to use a list',
        prompt: 'Your script checks each of 100,000 ids against a list of 50,000 known ids and takes minutes. Explain the problem and the fix.',
        rubric: [
          'Identifies that `in` on a list is a linear scan',
          'Computes the resulting cost as roughly n times m',
          'Proposes converting the haystack to a set for O(1) average membership',
        ],
        sampleAnswer:
          'Membership testing on a list has to compare against elements one at a time until it finds a match, so each check costs up to 50,000 comparisons and the loop performs up to five billion of them. Converting the known ids to a set once — `known = set(known_ids)` — makes each check a hash lookup that is O(1) on average, so the whole loop becomes roughly 100,000 operations plus the one-off cost of building the set. The list is still the right structure if order matters or duplicates are meaningful; the point is that membership testing is not what a list is for.',
        explanation:
          'Recognising when a data structure is being used against its strengths is the skill being tested here, and it generalises directly to the hashing units in the DSA domain.',
      },
    ],

    flashcards: [
      { front: '`append` versus `extend`', back: '`append` adds one element (possibly a list); `extend` adds each item of an iterable individually.' },
      { front: 'What does `xs.sort()` return?', back: '`None`. It sorts in place. Use `sorted(xs)` when you want a new list back.' },
      { front: 'Why is `xs.pop(0)` slow?', back: 'A list is a contiguous array, so removing the first element shifts every later one — O(n). Use `collections.deque`.' },
      { front: 'What does `[[0] * 3] * 3` build?', back: 'Three references to one inner list. Use `[[0] * 3 for _ in range(3)]` for three independent rows.' },
      { front: 'How do you change a list in place from a comprehension?', back: '`xs[:] = [ ... ]` — full-slice assignment replaces the contents without rebinding the name.' },
      { front: 'Is Python\'s sort stable?', back: 'Yes. Items that compare equal keep their original relative order, which makes multi-pass sorting possible.' },
    ],

    challenge: {
      title: 'A leaderboard that does not lie',
      brief:
        'Given a list of `(name, score, submitted_at)` tuples, build a leaderboard function-free script that prints the top five entries: highest score first, and among equal scores the earlier submission first. Then print the original list to prove you did not mutate it, and finally produce a second list with all entries below a cut-off removed — without mutating the list you are iterating over.',
      language: 'python',
      acceptanceCriteria: [
        'The original list is provably unchanged after the leaderboard is printed',
        'Ties are broken by submission time, not left to chance',
        'The filtered list is built without removing from a list while iterating it',
        'The top-five slice works correctly even when fewer than five entries exist',
      ],
      starterCode:
        'entries = [\n    ("ada", 92, "09:14"),\n    ("bob", 78, "08:02"),\n    ("cal", 92, "08:47"),\n]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who knows about variables and strings what a list is, how it differs from a string, and why copying one is trickier than it looks.',
      mustCover: [
        'A list is an ordered collection accessed by position, starting at 0',
        'Unlike a string, a list can be changed in place',
        'Two names can refer to the same list, so mutation is shared',
        'A shallow copy duplicates the outer list only',
      ],
      bonusSignals: ['mentions append being cheap and insert(0) being expensive', 'distinguishes sorted from .sort()', 'gives the nested-list copy example'],
      sampleExplanation:
        "A list is a row of slots, numbered from zero, that holds values in an order you control. You write it with square brackets, and you get at things by position: `scores[0]` is the first one. So far it sounds like a string, and indexing and slicing work the same way. The difference that matters is that a list can be edited. `scores.append(95)` does not hand you a new list — it changes the one you already have. That is convenient, and it is the source of the one bug everybody hits. If you write `backup = scores` you have not made a safety copy; you have given the same list a second name, so anything you do through one name shows up through the other. To get a genuine copy you ask for one: `backup = scores.copy()`. And if the list contains other lists, even that is not quite enough, because the copy holds the same inner lists — for real independence you need `copy.deepcopy`. The mental picture to keep is that the slots hold arrows pointing at values, and copying a list copies the arrows, not what they point at.",
    },
  },

  {
    id: 'PY-007',
    domain: 'PY',
    module: 'Collections',
    topic: 'Tuples',
    title: 'Tuples and Immutability',
    slug: 'tuples-and-immutability',
    difficulty: 2,
    estimatedMinutes: 25,
    prerequisites: ['PY-006'],
    related: ['PY-002', 'PY-004'],
    tags: ['tuple', 'immutability', 'unpacking', 'hashable', 'namedtuple', 'swap'],

    learningObjectives: [
      'Create tuples, including the single-element case that trips everyone up',
      'Unpack a tuple into names, including with a starred target',
      'Explain why tuples are hashable and lists are not, and what that enables',
      'Choose between a tuple, a list and a `NamedTuple` or dataclass for a given record',
      'Recognise that immutability is shallow: a tuple containing a list is still mutable inside',
    ],

    terminology: [
      {
        term: 'Tuple',
        definition:
          'An immutable ordered sequence, written with commas and usually parentheses. Fixed length and fixed contents once created.',
        simple: 'A list that has been sealed shut.',
      },
      {
        term: 'Unpacking',
        definition:
          'Binding the elements of any iterable to several names at once: `x, y = point`. The number of names must match unless a starred target absorbs the rest.',
        simple: 'Opening a package and giving each item its own name.',
      },
      {
        term: 'Hashable',
        definition:
          'An object with a `__hash__` that never changes for its lifetime, making it usable as a dictionary key or a set member. Tuples of hashable items qualify; lists never do.',
        simple: 'Something whose fingerprint never changes, so it can be filed and looked up.',
      },
      {
        term: 'Shallow immutability',
        definition:
          'A tuple fixes which objects it contains, not the state of those objects. A tuple holding a list cannot have that element replaced, but the list itself can still be mutated.',
        simple: 'The box is sealed, but something soft inside can still be squashed.',
      },
      {
        term: 'NamedTuple',
        definition:
          'A tuple subclass whose positions also have names, giving `p.x` alongside `p[0]` while keeping tuple behaviour and immutability.',
        simple: 'A sealed box where each slot has a label on it.',
      },
    ],

    simpleExplanation:
      "A tuple is a list that cannot be changed. You write it with commas — the parentheses are usually there for clarity, but it is the comma that makes a tuple. Once built, you cannot append to it, remove from it, or replace an element. That sounds like a limitation, and the first question everyone asks is why you would want one. The answer is that immutability buys you two things. First, safety: if a value must not change, making it impossible to change is better than remembering not to. Second, and more practically, a tuple can be used as a dictionary key or put into a set, because its contents are fixed and so its fingerprint is stable; a list cannot. The other place tuples appear constantly is in returning several values from a function and in unpacking them: `x, y = point` and the famous `a, b = b, a` swap both work because the right-hand side builds a tuple and the left-hand side takes it apart.",

    whyItExists:
      'Some groups of values are a single conceptual thing — a coordinate, a database row, a function returning two results — where changing one element in isolation would be meaningless. Tuples express that fixedness in the type system, and the guarantee it provides is what makes them hashable and therefore usable as dictionary keys and set members.',

    analogy: {
      scenario:
        "Think of a sealed evidence bag versus an open tray. The tray is a list: you can add things, take things out, rearrange them. The bag is a tuple: once it is sealed and labelled, its contents are fixed, and precisely because of that you can file it under a reference number and be sure that the number still describes what is inside when you retrieve it next year. If people could keep adding items to a sealed bag, the reference number would become a lie.",
      mapping: [
        { from: 'The open tray you keep adding to', to: 'A list — mutable, growable, unhashable' },
        { from: 'The sealed, labelled bag', to: 'A tuple — fixed contents, hashable' },
        { from: 'Filing the bag under a reference number', to: 'Using a tuple as a dictionary key or set member' },
        { from: 'A reference number that would stop matching if contents changed', to: 'The hash invariant: equal objects must have equal hashes, forever' },
        { from: 'A sealed bag containing an unsealed envelope', to: 'A tuple containing a list — the tuple is fixed, the list inside is not' },
      ],
      bridge:
        'The reference-number story is not decoration; it is exactly why Python refuses `{[1, 2]: "x"}` with `TypeError: unhashable type: list`. A dictionary finds a key by computing its hash and going straight to that bucket. If a key could mutate after insertion, its hash would change and the entry would become unreachable — the dictionary would contain data nobody could find. Immutability is the precondition that makes hash-based lookup sound.',
      limitations:
        'The sealed-bag image suggests total protection. Python\'s guarantee is only one level deep: `t = ([1], 2)` forbids `t[0] = ...` but permits `t[0].append(3)`, and such a tuple is not hashable either.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Tuple versus list',
        caption: 'Use a tuple when the length and meaning of each position are fixed by the concept itself.',
        left: {
          heading: 'Tuple — fixed record',
          points: [
            'Immutable: no append, no item assignment',
            'Hashable (if its contents are), so usable as a dict key or set member',
            'Positions have fixed meaning: `(lat, lon)`, `(name, score)`',
            'Slightly smaller and faster to build',
            'Signals intent: "this is one value with parts"',
          ],
        },
        right: {
          heading: 'List — growable collection',
          points: [
            'Mutable: append, remove, sort in place',
            'Never hashable; cannot be a dict key',
            'Positions are just positions; items are interchangeable',
            'Over-allocates to make appending cheap',
            'Signals intent: "several of the same kind of thing"',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'The comma is what makes a tuple',
        subject: 'x = 1, 2   |   y = (3,)   |   z = (4)',
        annotations: [
          { part: '`1, 2`', note: 'A two-element tuple. Parentheses are optional here; the commas do the work.' },
          { part: '`(3,)`', note: 'A one-element tuple. The trailing comma is mandatory and is the part everyone forgets.' },
          { part: '`(4)`', note: 'Not a tuple at all — just the integer 4 in redundant parentheses. This causes real bugs.' },
          { part: '`()`', note: 'The empty tuple, the one case where parentheses alone are enough.' },
        ],
      },
      {
        kind: 'flow',
        title: 'Why a mutable key would break a dictionary',
        caption: 'The argument that makes hashability a requirement rather than a preference.',
        steps: [
          { label: 'Insert', detail: 'Python computes `hash(key)` and stores the entry in the bucket that hash selects.' },
          { label: 'Mutate the key', detail: 'If keys could change, the contents — and therefore the hash — would now be different.' },
          { label: 'Look up', detail: 'Python computes the new hash, goes to a different bucket, and finds nothing.' },
          { label: 'Result', detail: 'An entry that exists but is unreachable. Python prevents this by refusing unhashable keys up front.' },
        ],
      },
      {
        kind: 'table',
        title: 'Unpacking patterns you will actually use',
        columns: ['Pattern', 'Example', 'Result'],
        rows: [
          ['Basic', '`x, y = (3, 4)`', '`x` is 3, `y` is 4'],
          ['Swap', '`a, b = b, a`', 'Right side builds a tuple first, so no temporary variable is needed'],
          ['Starred middle', '`first, *rest = [1, 2, 3]`', '`first` is 1, `rest` is `[2, 3]` — a list, not a tuple'],
          ['Ignore a field', '`_, score = ("ada", 92)`', 'Conventional throwaway name for a value you do not need'],
          ['In a loop', '`for name, score in pairs:`', 'Unpacks each tuple as the loop runs'],
          ['Nested', '`(a, (b, c)) = (1, (2, 3))`', 'Structure on the left must mirror the structure on the right'],
        ],
      },
    ],

    formalDefinition:
      '`tuple` is an immutable sequence type. Its length and the identities of its elements are fixed at construction, which allows a `__hash__` derived from the hashes of its elements — so a tuple is hashable precisely when all of its elements are. Immutability is shallow: it constrains the tuple\'s references, not the state of the referenced objects.',

    codeExamples: [
      {
        language: 'python',
        title: 'Creating tuples, and the one-element trap',
        runnable: true,
        code: `point = (3, 4)
also_a_tuple = 3, 4          # parentheses optional
single = (5,)                # trailing comma REQUIRED
not_a_tuple = (5)            # just the integer 5
empty = ()

print(type(single), type(not_a_tuple))
print(len(point), point[0], point[-1])

try:
    point[0] = 99
except TypeError as e:
    print("TypeError:", e)

# Tuples support the sequence operations that do not mutate
print(point + (5, 6), point * 2, 3 in point)`,
        output: `<class 'tuple'> <class 'int'>
2 3 4
TypeError: 'tuple' object does not support item assignment
(3, 4, 5, 6) (3, 4, 3, 4) True
`,
        explanation:
          'The difference between `(5,)` and `(5)` is responsible for a surprising number of bugs, typically when someone writes a function argument like `dims=(3)` and gets an integer where a sequence was expected. Note the last line: `point + (5, 6)` does not modify `point`, it builds a new tuple — the same "operations return new objects" rule you met with strings. Everything that does not mutate works on tuples; only the mutating operations are missing.',
      },
      {
        language: 'python',
        title: 'Unpacking, swapping and multiple return values',
        runnable: true,
        code: `def min_max(values):
    return min(values), max(values)   # returns a tuple

low, high = min_max([4, 8, 1, 9])
print(low, high)

a, b = 1, 2
a, b = b, a                           # the classic swap
print(a, b)

first, *middle, last = [10, 20, 30, 40, 50]
print(first, middle, last)

rows = [("ada", 92), ("bob", 78)]
for name, score in rows:              # unpacking in a loop header
    print(f"{name}: {score}")

_, only_score = rows[0]               # ignore a field by convention
print(only_score)`,
        output: `1 9
2 1
10 [20, 30, 40] 50
ada: 92
bob: 78
92`,
        explanation:
          'A function that "returns two things" returns one tuple; unpacking at the call site is what makes it read as two. The swap works because Python evaluates the entire right-hand side into a tuple before binding anything on the left, so no temporary variable is needed and there is no ordering hazard. The starred target absorbs whatever is left over and always produces a *list*, even when unpacking a tuple. Unpacking in a `for` header is the single most common tuple usage in real code.',
      },
      {
        language: 'python',
        title: 'Hashability, and why it matters',
        runnable: true,
        code: `# Tuples can be dictionary keys; lists cannot
distances = {("london", "paris"): 344, ("paris", "rome"): 1105}
print(distances[("london", "paris")])

try:
    bad = {["london", "paris"]: 344}
except TypeError as e:
    print("TypeError:", e)

# Immutability is SHALLOW
t = ([1, 2], 3)
t[0].append(99)          # allowed: the inner list is still mutable
print(t)

try:
    hash(t)              # but now the tuple is not hashable
except TypeError as e:
    print("TypeError:", e)`,
        output: `344
TypeError: unhashable type: 'list'
([1, 99, 2], 3)
TypeError: unhashable type: 'list'`,
        explanation:
          'The composite key `("london", "paris")` is the everyday reason tuples matter: any time you need to index something by a pair or triple, a tuple key is the idiomatic answer. The second half is the honest caveat. A tuple fixes which objects it holds, not their contents, so `t[0].append(99)` is legal — and Python refuses to hash the tuple, because hashing it would require hashing the mutable list inside. The rule is that a tuple is hashable exactly when every element is.',
      },
      {
        language: 'python',
        title: 'When a plain tuple is not enough',
        runnable: true,
        code: `from typing import NamedTuple

class Result(NamedTuple):
    model: str
    accuracy: float
    epochs: int

r = Result("resnet50", 0.923, 30)

print(r.model, r.accuracy)     # readable by name
print(r[0], len(r))            # still behaves like a tuple
model, acc, epochs = r         # still unpacks

better = r._replace(accuracy=0.941)   # returns a NEW Result
print(better)
print(r.accuracy)              # original untouched`,
        output: `resnet50 0.923
resnet50 3
Result(model='resnet50', accuracy=0.941, epochs=30)
0.923`,
        explanation:
          'A three-element tuple is fine until someone has to remember whether accuracy is at index 1 or 2. `NamedTuple` gives every position a name and a type annotation while staying a genuine tuple — it unpacks, indexes, compares and hashes exactly as before. `_replace` respects immutability by returning a modified copy. For records that genuinely need to change, reach for a `@dataclass` instead; the choice between them is really the choice between a value and an entity.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Array and tensor shapes',
        usage:
          '`arr.shape` is a tuple such as `(32, 3, 224, 224)`, and it is a tuple precisely because a shape is one fixed description, not a list you would append to. The same is true of `df.shape` in pandas.',
      },
      {
        context: 'Database rows',
        usage:
          'A DB-API cursor yields each row as a tuple, which is why `for row in cursor:` followed by `name, email = row` is the standard pattern. The fixed width comes from the query, not from the data.',
      },
      {
        context: 'Composite dictionary keys',
        usage:
          'Caching pairwise results — `distance[(city_a, city_b)]` or `cache[(user_id, model_version)]` — requires a hashable key, so tuples are the only built-in option.',
      },
      {
        context: 'Returning several values',
        usage:
          '`train_test_split` returns four arrays as a tuple, unpacked at the call site as `X_train, X_test, y_train, y_test = ...`. Getting the order wrong here is one of the most common scikit-learn mistakes.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'Shapes, axes and indices are tuples; `arr[(0, 1)]` and `arr[0, 1]` are the same call.' },
      { tool: 'scikit-learn', role: '`train_test_split` and most `fit`-style helpers return tuples that are immediately unpacked.' },
      { tool: 'functools.lru_cache', role: 'Caches on the tuple of arguments, which is why every cached function argument must be hashable.' },
      { tool: 'dataclasses', role: 'The mutable alternative when a record needs named fields and is expected to change after creation.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing `(5)` when you meant a one-element tuple',
        why: 'Parentheses do not create a tuple; the comma does. `(5)` is just `5`, so a function expecting a sequence receives an integer and fails with `TypeError: object is not iterable`.',
        fix: 'Write `(5,)`. When in doubt, check with `type(x)` or `len(x)`.',
      },
      {
        mistake: 'Believing a tuple deep-freezes its contents',
        why: 'Immutability applies to the tuple\'s own references. A tuple holding a list still lets you mutate that list, and such a tuple is unhashable.',
        fix: 'Use tuples of immutable elements when you need a key. If you need a frozen collection of items, `frozenset` or a tuple of tuples is the tool.',
      },
      {
        mistake: 'Unpacking the wrong number of values',
        why: 'Python requires an exact match and raises `ValueError: too many values to unpack (expected 2)` or `not enough values to unpack`.',
        fix: 'Use a starred target to absorb the remainder — `first, *rest = items` — or index explicitly when the length varies.',
      },
      {
        mistake: 'Using a tuple where the collection genuinely grows',
        why: 'Every "append" to a tuple builds a whole new tuple, so accumulating n items costs O(n squared) and the code reads awkwardly.',
        fix: 'Accumulate in a list and call `tuple(items)` at the end if an immutable result is wanted.',
      },
      {
        mistake: 'Returning a long tuple whose fields are positional',
        why: 'Callers must remember that accuracy is index 1 and loss is index 2; any reordering silently breaks every call site without an error.',
        fix: 'Use a `NamedTuple` or a dataclass once you pass three fields, so the meaning travels with the value.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why can a tuple be a dictionary key when a list cannot?',
        answer:
          'Dictionaries locate entries by hashing the key and going directly to the corresponding bucket, which only works if a key\'s hash never changes while it is in the dictionary. A tuple is immutable, so its contents — and therefore its hash, which is derived from its elements — are fixed for its lifetime. A list can be mutated at any time, so its hash would go stale and the entry would become unreachable; rather than allow silently lost data, Python makes lists unhashable and raises `TypeError: unhashable type: list`. Note the refinement: a tuple is hashable only if all of its elements are, so `([1], 2)` is not.',
      },
      {
        level: 'intermediate',
        question: 'When would you choose a tuple over a list, beyond "when I want it to be immutable"?',
        answer:
          'The practical rule is about meaning rather than mechanics: a tuple is one thing made of parts, where each position has its own fixed role, while a list is many things of the same kind. A coordinate, a database row and a function\'s pair of return values are tuples; a collection of coordinates is a list of tuples. That distinction guides readers, and it has concrete consequences — tuples can be dict keys and set members, they can be cached by `functools.lru_cache`, they are marginally cheaper to construct, and their fixed length lets you unpack with confidence. Once a tuple has more than about three positional fields, I would move to a `NamedTuple` or dataclass so the fields have names.',
        followUp:
          'A strong answer notes that immutability also makes a value safe to share between threads or store as a default, avoiding the mutable-default trap.',
      },
      {
        level: 'internship',
        question: 'Explain what `a, b = b, a` does under the hood, and why it needs no temporary variable.',
        answer:
          'Python evaluates the entire right-hand side before binding anything on the left. `b, a` builds a tuple of the two current values — in CPython this is often optimised to a `ROT_TWO` on the stack rather than a real tuple object — and then that sequence is unpacked into the targets left to right. Because both original values were captured before either name was rebound, no temporary is needed and there is no ordering hazard. The same mechanism explains why `xs[i], xs[j] = xs[j], xs[i]` swaps list elements correctly, and why `a, b = b, a + b` computes the Fibonacci step with the *old* `a`, not the newly assigned one.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a single statement that binds `first` to 1, `last` to 5 and `middle` to `[2, 3, 4]` from `[1, 2, 3, 4, 5]`.',
        hint: 'A starred target absorbs everything the other names do not claim.',
        language: 'python',
        starterCode: 'values = [1, 2, 3, 4, 5]\n',
        solution:
          '```\nfirst, *middle, last = values\nprint(first, middle, last)   # 1 [2, 3, 4] 5\n```\n\nExactly one starred target is allowed, and it can appear anywhere in the pattern. Note that `middle` is a *list* even though the operation is usually described as tuple unpacking — the star always collects into a list.',
      },
      {
        prompt:
          'Build a dictionary that records the distance between pairs of cities, then look up `("paris", "rome")`. Explain why the same structure fails with lists as keys.',
        hint: 'The key must be hashable, which means its contents must be fixed for life.',
        solution:
          '```\ndistances = {\n    ("london", "paris"): 344,\n    ("paris", "rome"): 1105,\n}\nprint(distances[("paris", "rome")])   # 1105\n```\n\nWith `["paris", "rome"]` as a key, Python raises `TypeError: unhashable type: list`. A dictionary stores each entry in a bucket chosen by the key\'s hash; a mutable key could change after insertion, its hash would no longer point at the bucket holding it, and the entry would be lost. Refusing the key up front is the only way to keep lookup sound.',
      },
      {
        prompt:
          'Predict the output:\n\n```\nt = ([1, 2], "fixed")\nt[0].append(3)\nprint(t)\nt[1] = "changed"\n```',
        hint: 'Immutability applies to the tuple\'s own slots, not to the objects those slots refer to.',
        solution:
          'It prints `([1, 2, 3], \'fixed\')` and then raises `TypeError: \'tuple\' object does not support item assignment`.\n\nThe append succeeds because the tuple\'s first slot still refers to the same list object — nothing about the tuple changed. The assignment fails because it would replace which object that slot refers to, which is exactly what immutability forbids. A useful consequence: `hash(t)` also fails, because a tuple is only hashable when all of its elements are.',
      },
    ],

    quiz: [
      {
        id: 'PY-007-q1',
        type: 'code-output',
        language: 'python',
        concept: 'tuple construction',
        prompt: 'What does this print?',
        code: 'x = (5)\ny = (5,)\nprint(type(x).__name__, type(y).__name__)',
        options: ['int tuple', 'tuple tuple', 'int int', 'tuple int'],
        answerIndex: 0,
        explanation:
          'Parentheses do not create a tuple; the comma does. `(5)` is the integer 5 in redundant brackets, while `(5,)` is a one-element tuple.',
      },
      {
        id: 'PY-007-q2',
        type: 'truefalse',
        concept: 'shallow immutability',
        prompt: 'Because tuples are immutable, no part of `t = ([1, 2], 3)` can be changed.',
        answer: false,
        explanation:
          'Immutability is one level deep. `t[0] = ...` is forbidden, but `t[0].append(3)` succeeds because the inner list is still a mutable object. Such a tuple is also unhashable.',
      },
      {
        id: 'PY-007-q3',
        type: 'mcq',
        concept: 'hashability',
        prompt: 'Which of these can be used as a dictionary key?',
        options: ['`("a", 1)`', '`["a", 1]`', '`{"a": 1}`', '`(["a"], 1)`'],
        answerIndex: 0,
        explanation:
          'A key must be hashable. A tuple of hashable elements qualifies; lists and dicts never do, and a tuple containing a list is unhashable because hashing it would require hashing the list.',
      },
      {
        id: 'PY-007-q4',
        type: 'code-output',
        language: 'python',
        concept: 'evaluation order in unpacking',
        prompt: 'What does this print?',
        code: 'a, b = 1, 2\na, b = b, a + b\nprint(a, b)',
        options: ['2 3', '2 4', '1 3', '3 2'],
        answerIndex: 0,
        explanation:
          'The whole right-hand side is evaluated first using the old values, giving `(2, 3)`. Only then are the names rebound, so `a + b` used `a = 1`, not the newly assigned `2`. This is the Fibonacci step.',
      },
      {
        id: 'PY-007-q5',
        type: 'fill',
        concept: 'starred unpacking',
        prompt: 'Fill in the blank so `head` is 1 and `tail` is `[2, 3]`: `head, ___tail = [1, 2, 3]`',
        answers: ['*', 'asterisk', 'star', '*  '],
        explanation:
          'A starred target collects all the remaining items into a list. Exactly one star is allowed per unpacking pattern, and it may appear at any position.',
      },
      {
        id: 'PY-007-q6',
        type: 'multi',
        concept: 'choosing tuple vs list',
        prompt: 'For which of these is a tuple the better choice? Select all that apply.',
        options: [
          'A 2D coordinate `(x, y)`',
          'The rows read from a growing log file',
          'A composite dictionary key of `(user_id, date)`',
          'The shape of an array, `(32, 3, 224, 224)`',
          'A collection of predictions being accumulated in a loop',
        ],
        answerIndices: [0, 2, 3],
        explanation:
          'Coordinates, composite keys and shapes are single fixed records whose positions each have a meaning. Anything that grows — log rows, accumulated predictions — wants a list, because building a new tuple on every addition is quadratic.',
      },
      {
        id: 'PY-007-q7',
        type: 'explain',
        concept: 'immutability as a design tool',
        prompt: 'Explain to a colleague why you would deliberately choose an immutable type even when nothing in the program tries to modify the value.',
        rubric: [
          'Notes that immutability makes a class of bugs impossible rather than merely unlikely',
          'Mentions hashability and the capabilities it unlocks (dict keys, set members, caching)',
          'Mentions safe sharing — no defensive copying, no accidental mutation through an alias',
        ],
        sampleAnswer:
          'Choosing an immutable type converts a rule you have to remember into a rule the language enforces. Nothing modifies the value today, but code changes, and an alias handed to another function is a mutation waiting to happen; with a tuple the failure becomes a `TypeError` at the moment of the mistake rather than a wrong number three modules away. It also buys capabilities: an immutable value can be a dictionary key, a set member, an argument to an `lru_cache`-decorated function, and a safe default — none of which a list can do. Finally it communicates intent, telling the next reader that this value is one fixed thing rather than a collection they are free to extend.',
        explanation:
          'The examinable idea is that immutability is a design choice with concrete mechanical consequences, not merely a stylistic preference.',
      },
    ],

    flashcards: [
      { front: 'What makes a tuple, the parentheses or the comma?', back: 'The comma. `(5)` is an int; `(5,)` is a one-element tuple; `1, 2` is a tuple with no parentheses at all.' },
      { front: 'Why can tuples be dict keys but lists cannot?', back: 'Dicts locate entries by hash, which must never change. Tuples are immutable so their hash is stable; lists are not.' },
      { front: 'Is a tuple deeply immutable?', back: 'No. `t = ([1], 2)` forbids replacing `t[0]` but allows `t[0].append(3)`, and makes the tuple unhashable.' },
      { front: 'How does `a, b = b, a` work?', back: 'The right side is fully evaluated into a tuple before any name is rebound, so no temporary variable is needed.' },
      { front: 'What does `first, *rest = xs` give you?', back: '`first` is the first item; `rest` is a *list* of everything else. Exactly one starred target is allowed.' },
      { front: 'When should a tuple become a NamedTuple?', back: 'Once positions stop being self-explanatory — roughly three or more fields. You keep tuple behaviour and gain names.' },
    ],

    challenge: {
      title: 'A cache keyed by a pair',
      brief:
        'Write a script that computes an expensive pairwise score for city pairs and caches results in a dictionary keyed by a tuple, so that asking for the same pair twice does the work only once. Make the cache symmetric — `("a", "b")` and `("b", "a")` must hit the same entry — and prove with printed output that the second lookup did not recompute. Then demonstrate, in a `try/except`, what happens if you try the same design with a list as the key.',
      language: 'python',
      acceptanceCriteria: [
        'The cache key is a tuple and the symmetric pair resolves to one entry',
        'A counter or printed message proves the expensive computation ran only once per unordered pair',
        'A `TypeError` from using a list as a key is caught and its message printed',
        'The script never mutates a key after it has been inserted',
      ],
      starterCode: 'calls = 0\ncache = {}\n\ndef score(a, b):\n    global calls\n    calls += 1\n    return len(a) * len(b)\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who has just learned lists what a tuple is, why anyone would want a collection they cannot change, and what unpacking is.',
      mustCover: [
        'A tuple is an ordered sequence that cannot be changed after it is created',
        'The comma, not the parentheses, is what makes a tuple',
        'Immutability is what allows tuples to be dictionary keys and set members',
        'Unpacking binds the elements to several names at once',
      ],
      bonusSignals: ['explains the hash argument for why mutable keys are forbidden', 'mentions that immutability is shallow', 'gives the multiple-return-value example'],
      sampleExplanation:
        "A tuple is a list that has been sealed. You build it with commas — `point = 3, 4` — and after that it is fixed: you cannot add to it, remove from it or replace an item. The obvious question is why you would want something less capable. The answer is that being unchangeable is itself a useful property. A dictionary finds things by taking a fingerprint of the key and jumping straight to where it filed that fingerprint. If a key could change after it was filed, its fingerprint would no longer match and the entry would be lost forever, so Python simply refuses to let you use a list as a key. A tuple can never change, so its fingerprint is reliable, and that is what lets you write `distances[(\"london\", \"paris\")]`. The other place tuples show up constantly is when something gives you several values at once. A function can return `min, max` as one tuple, and you take it apart on the other side with `low, high = min_max(values)`. That taking-apart is called unpacking, and it is also the trick behind swapping two variables in one line: `a, b = b, a` builds a tuple of the current values first, then hands them back in the other order.",
    },
  },

  {
    id: 'PY-008',
    domain: 'PY',
    module: 'Collections',
    topic: 'Dictionaries',
    title: 'Dictionaries',
    slug: 'dictionaries',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['PY-006'],
    related: ['PY-007', 'PY-004'],
    tags: ['dict', 'hash-map', 'keys', 'get', 'defaultdict', 'counter'],

    learningObjectives: [
      'Create a dictionary and read, add, update and delete entries',
      'Look up a key safely with `get` and `setdefault` instead of risking a `KeyError`',
      'Iterate over keys, values and items, and know that insertion order is preserved',
      'Explain why lookup is O(1) on average and what a key must satisfy to be usable',
      'Reach for `collections.Counter` and `defaultdict` when they replace five lines with one',
    ],

    terminology: [
      {
        term: 'Dictionary',
        definition:
          'A mutable mapping from hashable keys to arbitrary values, with average O(1) insertion, lookup and deletion. Insertion order is preserved from Python 3.7.',
        simple: 'A lookup table: you give it a label and it hands you the thing filed under it.',
      },
      {
        term: 'Key',
        definition:
          'The hashable object used to file and retrieve a value. Keys are unique: assigning to an existing key replaces the value rather than adding a second entry.',
        simple: 'The label you file something under.',
      },
      {
        term: 'Hash',
        definition:
          'An integer derived from a key\'s value that selects which internal bucket the entry lives in. Equal objects must produce equal hashes.',
        simple: 'A fingerprint of the label, used to jump straight to the right shelf.',
      },
      {
        term: 'KeyError',
        definition:
          'The exception raised when you index a dictionary with a key that is not present. `d.get(k)` returns `None` instead, and `d.get(k, default)` returns your fallback.',
        simple: 'The error you get when nothing is filed under that label.',
      },
      {
        term: 'View object',
        definition:
          '`d.keys()`, `d.values()` and `d.items()` return live views, not copies. They reflect later changes and raise if the dictionary is resized during iteration.',
        simple: 'A window onto the dictionary rather than a photograph of it.',
      },
    ],

    simpleExplanation:
      "A dictionary stores values under labels instead of under positions. Where a list answers \"what is item number 3?\", a dictionary answers \"what is filed under 'learning_rate'?\". You write it with braces and colons, and you look things up with square brackets exactly as you would a list, except the thing in the brackets is a key rather than an index. The remarkable part is the speed: no matter how many entries there are — ten or ten million — finding one takes about the same time, because Python computes a fingerprint of the key and jumps directly to where that fingerprint says the value lives, rather than searching. Two practical rules follow. Keys must be unchangeable things, which in practice means strings, numbers and tuples, because a fingerprint that could change would make the entry unfindable. And looking up a key that is not there raises a `KeyError`, so when absence is a normal possibility you use `d.get(key, fallback)` instead of brackets.",

    whyItExists:
      'Vast amounts of real data are naturally labelled rather than numbered: settings by name, counts by word, records by id, features by column. Scanning a list to find the entry with a matching label is linear and gets slower as data grows; a hash map makes that lookup effectively constant time, which is what allows the pattern to be used everywhere without thought.',

    analogy: {
      scenario:
        "Imagine a cloakroom in a theatre. You hand over a coat and get a ticket with a number on it. When you come back, the attendant does not walk the rails looking at every coat — they read the number and go straight to the one peg it names. The system only works because the ticket cannot change in your pocket: if the number rewrote itself during the interval, your coat would still be on its peg but nobody could ever find it again.",
      mapping: [
        { from: 'The ticket number', to: 'The hash of the key' },
        { from: 'The peg it points to', to: 'The bucket in the dictionary\'s internal table' },
        { from: 'Going straight to the peg without searching', to: 'O(1) average lookup, independent of size' },
        { from: 'A ticket that could rewrite itself', to: 'A mutable key — which is why lists are rejected as keys' },
        { from: 'Two coats that would land on the same peg', to: 'A hash collision, resolved internally by probing' },
      ],
      bridge:
        'The cloakroom explains both the speed and the constraint in one picture. Constant-time lookup comes from computing a position rather than searching for one, and the requirement that keys be hashable — immutable in practice — is exactly the requirement that the ticket number stays valid. It also explains why dictionary lookup is only O(1) *on average*: if many keys hash to the same peg, the attendant has to check a few coats, and in a pathological case the whole structure degenerates to a linear scan.',
      limitations:
        'The cloakroom suggests one peg per ticket. Real hash tables hold more entries than buckets and resize themselves as they fill, which is why `dict` insertion is amortised rather than strictly constant.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What happens on `config["lr"]`',
        caption: 'Four steps, none of which involve scanning the other entries.',
        steps: [
          { label: 'Hash the key', detail: '`hash("lr")` produces an integer. This is why the key must be hashable.' },
          { label: 'Pick a bucket', detail: 'The low bits of the hash select a slot in the internal table.' },
          { label: 'Compare', detail: 'Python checks the stored key with `is` then `==`, to handle collisions correctly.' },
          { label: 'Return the value, or raise', detail: 'A match returns the value; exhausting the probe sequence raises `KeyError`.' },
        ],
      },
      {
        kind: 'table',
        title: 'Reading a key: four tools, four behaviours',
        caption: 'Choosing the wrong one is how `KeyError` ends up in production logs.',
        columns: ['Expression', 'Key present', 'Key absent', 'Use when'],
        rows: [
          ['`d[k]`', 'Returns the value', 'Raises `KeyError`', 'Absence is a genuine bug you want to hear about.'],
          ['`d.get(k)`', 'Returns the value', 'Returns `None`', 'Absence is normal and `None` is a fine answer.'],
          ['`d.get(k, 0)`', 'Returns the value', 'Returns `0`', 'Absence is normal and you have a sensible default.'],
          ['`d.setdefault(k, [])`', 'Returns the value', 'Inserts `[]` and returns it', 'Building a dict of lists, in one step.'],
          ['`k in d`', '`True`', '`False`', 'You only need to test, not to read.'],
        ],
      },
      {
        kind: 'compare',
        title: 'Dictionary versus list of pairs',
        caption: 'Both store labelled data. Only one scales.',
        left: {
          heading: 'Dictionary',
          points: [
            'Lookup by key is O(1) on average',
            'Keys are unique by construction',
            'Keys must be hashable',
            'Insertion order preserved, but not sorted',
          ],
        },
        right: {
          heading: 'List of `(key, value)` tuples',
          points: [
            'Lookup requires a linear scan — O(n)',
            'Duplicate keys are possible and usually a bug',
            'Anything can be a key, including a list',
            'Order is entirely under your control, including sorted',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Iterating a dictionary three ways',
        subject: 'for k in d:  |  for v in d.values():  |  for k, v in d.items():',
        annotations: [
          { part: '`for k in d`', note: 'Iterates the keys. The bare form is idiomatic; `d.keys()` is the explicit equivalent.' },
          { part: '`d.values()`', note: 'Iterates values only. Cannot be indexed — it is a view, not a list.' },
          { part: '`d.items()`', note: 'Yields `(key, value)` tuples, unpacked in the loop header. This is the one you want most of the time.' },
          { part: 'Order', note: 'Insertion order since Python 3.7. It is a language guarantee, not an implementation accident.' },
        ],
      },
    ],

    formalDefinition:
      '`dict` is a mutable mapping implemented as an open-addressing hash table with a compact, insertion-ordered entry array. Keys must be hashable and support equality; lookup, insertion and deletion are O(1) amortised average and O(n) worst case under adversarial collisions. Since Python 3.7, preservation of insertion order is a language guarantee rather than a CPython implementation detail.',

    codeExamples: [
      {
        language: 'python',
        title: 'The everyday operations',
        runnable: true,
        code: `config = {"model": "resnet50", "lr": 0.01, "epochs": 30}

print(config["model"])          # read
config["batch_size"] = 32       # add
config["lr"] = 0.001            # update (keys are unique)
del config["epochs"]            # delete
print(config)

print("lr" in config, "epochs" in config)
print(len(config))

# Safe reads
print(config.get("dropout"))            # None
print(config.get("dropout", 0.5))       # your default

try:
    config["dropout"]
except KeyError as e:
    print("KeyError:", e)`,
        output: `resnet50
{'model': 'resnet50', 'lr': 0.001, 'batch_size': 32}
True False
3
None
0.5
KeyError: 'dropout'`,
        explanation:
          'Note that assigning to an existing key replaced the value rather than creating a second entry — keys are unique by definition. The output also shows insertion order being preserved: `batch_size` appears last because it was added last, and deleting `epochs` did not disturb the others. The `get` versus bracket distinction is worth deciding deliberately every time: brackets say "this key must exist and I want to hear about it if it does not", while `get` says "absence is expected".',
      },
      {
        language: 'python',
        title: 'Iterating, and building a dictionary from data',
        runnable: true,
        code: `scores = {"ada": 92, "bob": 78, "cal": 85}

for name, score in scores.items():
    print(f"{name:>4}: {score}")

print(sum(scores.values()) / len(scores))
print(max(scores, key=scores.get))          # key with the largest value

# Sort by value, descending
ranked = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
print(ranked)

# Build from two sequences
names = ["x", "y", "z"]
values = [1, 2, 3]
print(dict(zip(names, values)))

# Merge (Python 3.9+)
defaults = {"lr": 0.01, "epochs": 10}
print(defaults | {"epochs": 30})`,
        output: ` ada: 92
 bob: 78
 cal: 85
85.0
ada
[('ada', 92), ('bob', 78), ('cal', 85)]
{'x': 1, 'y': 2, 'z': 3}
{'lr': 0.01, 'epochs': 30}`,
        explanation:
          '`.items()` with unpacking in the loop header is the shape you will write most often. `max(scores, key=scores.get)` is worth memorising: iterating a dict gives keys, and the `key` function maps each key to its value for comparison, so this returns the name of the best scorer rather than the score. Sorting a dictionary always goes through `.items()`, because the result must be a sequence — a dictionary itself has insertion order, not sorted order. The `|` merge operator returns a new dict with the right-hand side winning on conflicts.',
      },
      {
        language: 'python',
        title: 'Grouping and counting without boilerplate',
        runnable: true,
        code: `from collections import Counter, defaultdict

words = "the cat sat on the mat the end".split()

# The manual way
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts)

# The tool for the job
print(Counter(words).most_common(2))

# Grouping: dict of lists
rows = [("ml", "resnet"), ("nlp", "bert"), ("ml", "vit")]
groups = defaultdict(list)
for domain, model in rows:
    groups[domain].append(model)
print(dict(groups))

# Without defaultdict, the same thing needs setdefault
manual = {}
for domain, model in rows:
    manual.setdefault(domain, []).append(model)
print(manual)`,
        output: `{'the': 3, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1, 'end': 1}
[('the', 3), ('cat', 1)]
{'ml': ['resnet', 'vit'], 'nlp': ['bert']}
{'ml': ['resnet', 'vit'], 'nlp': ['bert']}`,
        explanation:
          'The `counts.get(w, 0) + 1` idiom is the manual version everyone writes first and it is perfectly correct; `Counter` simply does it faster and gives you `most_common` for free. The grouping pattern is the one to internalise: `defaultdict(list)` calls `list()` automatically the first time a key is touched, so `groups[domain].append(model)` never raises `KeyError`. Be aware of the trade-off — merely *reading* `groups["missing"]` on a defaultdict creates the entry, which is why converting back with `dict(groups)` before returning is a good habit.',
      },
      {
        language: 'python',
        title: 'What a key must be',
        runnable: true,
        code: `d = {}
d["text"] = 1          # str: fine
d[42] = 2              # int: fine
d[(1, 2)] = 3          # tuple of immutables: fine
d[True] = 4            # careful: True == 1, so this REPLACES d[1] if it existed

try:
    d[[1, 2]] = 5      # list: not hashable
except TypeError as e:
    print("TypeError:", e)

print(d)

# Equal keys are the same key, regardless of type
e = {1: "int", 1.0: "float", True: "bool"}
print(e)`,
        output: `TypeError: unhashable type: 'list'
{'text': 1, 42: 2, (1, 2): 3, True: 4}
{1: 'bool'}`,
        explanation:
          'The last two lines are a genuine trap. Dictionary keys are compared with `==`, and `1 == 1.0 == True` in Python, so all three are the *same key* — the dictionary keeps the first key object inserted and the last value assigned. This bites when a column of ids arrives as a mix of ints and floats after a pandas type promotion. The rule for keys is simple: hashable means immutable in practice, so strings, numbers, tuples of those, and frozensets qualify, while lists, dicts and sets do not.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Configuration and hyperparameters',
        usage:
          'Every YAML or JSON config file becomes a dictionary when loaded. `config.get("dropout", 0.0)` is how a script stays compatible with older config files that predate a new setting.',
      },
      {
        context: 'Word and label counts',
        usage:
          'Building a vocabulary for an NLP model is `Counter(tokens).most_common(vocab_size)`, and checking class balance in a dataset is `Counter(labels)`. Both are one line because the dictionary does the work.',
      },
      {
        context: 'Joining two datasets',
        usage:
          'Building `{user_id: record}` once and then looking each id up turns an O(n × m) nested loop into an O(n + m) pass. This is exactly what a database hash join does internally.',
      },
      {
        context: 'JSON APIs',
        usage:
          '`json.loads(response.text)` gives nested dictionaries and lists, and every field access is a dictionary lookup — which is why `data.get("results", [])` is the defensive idiom for APIs whose payloads vary.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`pd.DataFrame(dict_of_lists)` builds a frame column by column, and `df.to_dict("records")` converts back.' },
      { tool: 'json', role: 'The JSON object maps exactly onto a Python dict, which is why dicts are the lingua franca of APIs and config.' },
      { tool: 'collections', role: '`Counter`, `defaultdict` and `OrderedDict` are dictionary subclasses that remove specific pieces of boilerplate.' },
      { tool: 'scikit-learn', role: '`GridSearchCV(param_grid={...})` takes a dictionary of hyperparameter names to candidate values.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using `d[key]` when the key may be absent',
        why: 'Bracket access raises `KeyError`, which crashes a script over data that was merely incomplete rather than invalid.',
        fix: 'Use `d.get(key, default)` when absence is expected. Keep brackets for the cases where a missing key really is a bug you want to fail loudly on.',
      },
      {
        mistake: 'Adding or deleting keys while iterating the dictionary',
        why: 'Views are live, so resizing during iteration raises `RuntimeError: dictionary changed size during iteration`.',
        fix: 'Iterate over a snapshot: `for k in list(d):`, or build a new dictionary with a comprehension.',
      },
      {
        mistake: 'Trying to use a list as a key',
        why: 'Lists are mutable and therefore unhashable, so the entry could not be found again after the key changed. Python raises `TypeError: unhashable type: list`.',
        fix: 'Convert to a tuple: `d[tuple(path)] = value`. For a set of items, use `frozenset`.',
      },
      {
        mistake: 'Assuming `.keys()` supports indexing',
        why: '`d.keys()` returns a view object, not a list, so `d.keys()[0]` raises `TypeError: dict_keys object is not subscriptable`.',
        fix: 'Wrap it when you need a sequence: `list(d.keys())[0]`, or use `next(iter(d))` when you only want the first key.',
      },
      {
        mistake: 'Reading from a `defaultdict` to test membership',
        why: 'Any bracket access on a defaultdict inserts the default, so `if groups["nope"]:` silently grows the dictionary.',
        fix: 'Test with `in`, or use `.get()`. Convert to a plain `dict` before handing the result to code that does not expect this behaviour.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is dictionary lookup O(1) while looking something up in a list is O(n)?',
        answer:
          'A dictionary computes a hash of the key and uses it to calculate directly which internal slot the entry should live in, so it goes to one place rather than searching. A list has no relationship between a value and its position, so finding a value means comparing against elements one at a time. The dictionary guarantee is average-case, not worst-case: if many keys collide into the same bucket, lookups degrade, and with adversarial input the structure can approach linear behaviour — which is why Python randomises string hashing per process by default. The cost of the guarantee is that keys must be hashable and that a dictionary uses more memory than a list of the same data.',
      },
      {
        level: 'intermediate',
        question: 'What must be true of an object for it to be a dictionary key, and what goes wrong if you break the rule?',
        answer:
          'It must be hashable: it needs a `__hash__` that stays constant for the object\'s lifetime, and an `__eq__` consistent with it, so that equal objects hash equally. Built-in immutable types qualify; lists, dicts and sets do not, and Python raises `TypeError: unhashable type` rather than letting you create a broken structure. If you define a class with a custom `__eq__` but no `__hash__`, Python sets `__hash__` to None and instances become unhashable — which is deliberate, because equality and hashing must agree. The subtle failure case is defining both but computing the hash from a mutable attribute: the object is accepted as a key, then mutated, and the entry becomes unreachable even though it is still occupying memory.',
        followUp:
          'A strong candidate mentions that `1`, `1.0` and `True` are the same key because they compare equal, which causes real bugs with mixed-type id columns.',
      },
      {
        level: 'internship',
        question: 'You are joining a 1,000,000-row table to a 50,000-row lookup table in pure Python. How do you avoid a nested loop?',
        answer:
          'Build a dictionary from the smaller table once — `index = {row.id: row for row in lookup}` — and then make a single pass over the large table, doing `index.get(row.id)` for each row. That is O(m) to build plus O(n) to scan, roughly 1.05 million operations, instead of the nested loop\'s O(n × m), which is fifty billion comparisons. This is precisely the hash join that relational databases perform, and the same reasoning applies at smaller scale whenever you see `if x in some_list` inside a loop. The trade-offs to mention are memory for the index and the requirement that the join key be hashable.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Count how many times each word appears in `"to be or not to be"`, using only a plain dictionary, then again using `collections.Counter`.',
        hint: '`d.get(key, 0) + 1` handles the first occurrence without a special case.',
        language: 'python',
        starterCode: 'text = "to be or not to be"\n',
        solution:
          '```\nwords = text.split()\n\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)   # {\'to\': 2, \'be\': 2, \'or\': 1, \'not\': 1}\n\nfrom collections import Counter\nprint(Counter(words))\n```\n\nThe `get(w, 0)` form means you never have to check whether the key exists first. `Counter` does exactly this internally, in C, and adds conveniences such as `.most_common(n)` and arithmetic between counters.',
      },
      {
        prompt:
          'Given `scores = {"ada": 92, "bob": 78, "cal": 85}`, produce a new dictionary containing only entries above 80, and separately find the name of the highest scorer.',
        hint: 'A dict comprehension filters; `max` with a `key` function finds.',
        solution:
          '```\ntop = {name: s for name, s in scores.items() if s > 80}\nprint(top)                       # {\'ada\': 92, \'cal\': 85}\n\nbest = max(scores, key=scores.get)\nprint(best)                      # ada\n```\n\nIterating a dictionary yields keys, so `max(scores, ...)` compares names; passing `key=scores.get` tells `max` to compare each name by the value filed under it. If you wanted the pair, `max(scores.items(), key=lambda kv: kv[1])` returns `("ada", 92)`.',
      },
      {
        prompt:
          'Group these records by department into a dictionary of lists, without ever raising `KeyError`: `[("eng", "ada"), ("ops", "bob"), ("eng", "cal")]`. Give two solutions.',
        hint: 'One uses `setdefault`; the other uses `collections.defaultdict`.',
        solution:
          '```\nrecords = [("eng", "ada"), ("ops", "bob"), ("eng", "cal")]\n\n# 1: setdefault on a plain dict\ngroups = {}\nfor dept, name in records:\n    groups.setdefault(dept, []).append(name)\n\n# 2: defaultdict\nfrom collections import defaultdict\ngroups2 = defaultdict(list)\nfor dept, name in records:\n    groups2[dept].append(name)\n\nprint(groups)          # {\'eng\': [\'ada\', \'cal\'], \'ops\': [\'bob\']}\nprint(dict(groups2))   # same\n```\n\n`setdefault` inserts the empty list only when the key is absent and returns the list either way, so the `.append` always has something to append to. `defaultdict` moves that behaviour into the type. Converting back with `dict(groups2)` before returning avoids surprising a caller who does not expect reads to create entries.',
      },
    ],

    quiz: [
      {
        id: 'PY-008-q1',
        type: 'code-output',
        language: 'python',
        concept: 'safe lookup',
        prompt: 'What does this print?',
        code: 'd = {"a": 1}\nprint(d.get("b", 0))\nprint("b" in d)',
        options: ['0\nFalse', 'None\nFalse', 'KeyError', '0\nTrue'],
        answerIndex: 0,
        explanation:
          '`get` returns the supplied default instead of raising when the key is absent, and it does not insert anything — so `"b" in d` is still False afterwards.',
      },
      {
        id: 'PY-008-q2',
        type: 'code-output',
        language: 'python',
        concept: 'key equality',
        prompt: 'What does this print?',
        code: 'd = {1: "int", 1.0: "float", True: "bool"}\nprint(len(d), d[1])',
        options: ['1 bool', '3 int', '2 float', '1 int'],
        answerIndex: 0,
        explanation:
          'Keys are compared with `==`, and `1 == 1.0 == True`, so all three refer to one entry. The first key object is kept and the last assigned value wins, giving a single entry mapping `1` to `"bool"`.',
      },
      {
        id: 'PY-008-q3',
        type: 'debug',
        language: 'python',
        concept: 'mutation during iteration',
        prompt: 'This raises `RuntimeError: dictionary changed size during iteration`. What is the minimal fix?',
        code: 'd = {"a": 1, "b": 0, "c": 2}\nfor k in d:\n    if d[k] == 0:\n        del d[k]',
        options: [
          'Iterate over a snapshot: `for k in list(d):`',
          'Use `d.items()` instead of `d`',
          'Replace `del d[k]` with `d[k] = None`',
          'Sort the dictionary before iterating',
        ],
        answerIndex: 0,
        explanation:
          '`for k in d` iterates a live view, so resizing the dictionary invalidates it. `list(d)` materialises the keys first, making the deletions safe. A dict comprehension that rebuilds without the zero values is equally good.',
      },
      {
        id: 'PY-008-q4',
        type: 'multi',
        concept: 'hashable keys',
        prompt: 'Which of these are valid dictionary keys? Select all that apply.',
        options: ['`"model"`', '`(1, 2)`', '`[1, 2]`', '`frozenset({1, 2})`', '`{"a": 1}`'],
        answerIndices: [0, 1, 3],
        explanation:
          'Keys must be hashable, which in practice means immutable. Strings, tuples of hashables and frozensets qualify; lists and dicts are mutable and raise `TypeError: unhashable type`.',
      },
      {
        id: 'PY-008-q5',
        type: 'truefalse',
        concept: 'ordering',
        prompt: 'Since Python 3.7, a dictionary iterates its keys in the order they were first inserted.',
        answer: true,
        explanation:
          'Insertion-order preservation became a language guarantee in 3.7 (it was a CPython implementation detail in 3.6). Note this is insertion order, not sorted order — sorting still requires `sorted(d.items())`.',
      },
      {
        id: 'PY-008-q6',
        type: 'match',
        concept: 'choosing the right tool',
        prompt: 'Match each task to the most idiomatic tool.',
        pairs: [
          { left: 'Count occurrences of each item', right: '`collections.Counter`' },
          { left: 'Group items into a dict of lists', right: '`collections.defaultdict(list)`' },
          { left: 'Read a key that may be missing', right: '`d.get(key, default)`' },
          { left: 'Find the key with the largest value', right: '`max(d, key=d.get)`' },
          { left: 'Build a dict from two parallel sequences', right: '`dict(zip(keys, values))`' },
        ],
        explanation:
          'Each of these replaces three to five lines of correct but noisy code. Knowing them is a large part of what makes Python read as Python rather than as translated Java.',
      },
      {
        id: 'PY-008-q7',
        type: 'explain',
        concept: 'hash-based lookup',
        prompt: 'Explain why dictionary lookup does not get slower as the dictionary grows, and what price is paid for that.',
        rubric: [
          'Explains that the key is hashed to compute a position rather than searched for',
          'Notes that the guarantee is average case, degraded by collisions',
          'Names a cost: keys must be hashable, and memory overhead is higher than a list',
        ],
        sampleAnswer:
          'A dictionary does not look for a key; it calculates where the key must be. Hashing the key produces an integer, some bits of which select a slot in an internal table, so retrieval touches one slot plus a comparison to confirm the match, regardless of whether the dictionary holds ten entries or ten million. The guarantee is average-case: several keys can hash into the same region, and then Python probes nearby slots, so heavy collisions degrade performance towards linear. The prices paid are that keys must be hashable, which in practice means immutable, and that the table is deliberately kept sparse and resized as it fills, so a dictionary uses noticeably more memory than a list holding the same values.',
        explanation:
          'The examinable insight is "computed position, not search", together with the honesty about average versus worst case — this is the same idea the DSA hash-table unit formalises.',
      },
    ],

    flashcards: [
      { front: '`d[k]` versus `d.get(k, default)`', back: 'Brackets raise `KeyError` when absent; `get` returns the default. Use brackets when absence is a bug.' },
      { front: 'Why is dict lookup O(1)?', back: 'The key is hashed to compute a slot directly, so no scanning happens. Average case — collisions degrade it.' },
      { front: 'What can be a dictionary key?', back: 'Anything hashable: strings, numbers, tuples of hashables, frozensets. Not lists, dicts or sets.' },
      { front: 'How do you iterate keys and values together?', back: '`for k, v in d.items():` — items() yields `(key, value)` tuples that unpack in the loop header.' },
      { front: 'What does `defaultdict(list)` do?', back: 'Creates an empty list automatically the first time a key is touched, so `d[k].append(v)` never raises `KeyError`.' },
      { front: 'Are `1`, `1.0` and `True` different keys?', back: 'No. They compare equal, so they are one entry. The first key inserted is kept; the last value wins.' },
    ],

    challenge: {
      title: 'An inverted index',
      brief:
        'Given a list of documents (each a string), build an inverted index: a dictionary mapping each lowercase word to the sorted list of document numbers in which it appears. Then write a lookup that, given two words, returns the documents containing both, and prove your implementation handles a word that appears in no document without raising. Finally, print the five most common words using `Counter`.',
      language: 'python',
      acceptanceCriteria: [
        'The index maps each word to a sorted, duplicate-free list of document indices',
        'Lookup for an absent word returns an empty result rather than raising `KeyError`',
        'The two-word query returns only documents containing both words',
        'The most-common report uses `Counter` and is correct for ties',
      ],
      starterCode:
        'docs = [\n    "the cat sat on the mat",\n    "the dog sat down",\n    "a cat and a dog",\n]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who knows lists what a dictionary is, why looking something up in one is so fast, and why you cannot use a list as a key.',
      mustCover: [
        'A dictionary stores values under keys rather than positions',
        'Lookup hashes the key to compute a location rather than searching',
        'Keys must be hashable, which in practice means immutable',
        'Missing keys raise KeyError unless you use .get()',
      ],
      bonusSignals: ['uses a cloakroom or index analogy', 'mentions insertion order being preserved', 'gives a real example such as counting words'],
      sampleExplanation:
        "A list files things by position: item 0, item 1, item 2. A dictionary files them by label. You write `config = {\"learning_rate\": 0.01}` and then ask for `config[\"learning_rate\"]`, and you get the value back. What makes this worth having is the speed. When you hand over a label, Python does not read through the entries looking for it — it runs the label through a function that turns it into a number, and that number tells it exactly which shelf to walk to. So finding something in a dictionary of ten million entries takes about as long as finding it in a dictionary of ten. That trick is also where the one restriction comes from. The shelf number is worked out from the label itself, so the label has to stay the same forever. A string or a number or a tuple can never change, so they are fine. A list can change at any moment, so if you used one as a label, its shelf number would drift and the value would still be sitting there with nobody able to find it. Rather than let that happen, Python refuses and tells you the type is unhashable. The last thing to know is that asking for a label that was never filed gives you a `KeyError`, so when something might genuinely be missing you ask politely with `config.get(\"dropout\", 0.0)` and get a sensible fallback instead of a crash.",
    },
  },

  {
    id: 'PY-009',
    domain: 'PY',
    module: 'Collections',
    topic: 'Sets',
    title: 'Sets',
    slug: 'sets',
    difficulty: 2,
    estimatedMinutes: 25,
    prerequisites: ['PY-008'],
    related: ['PY-006', 'PY-007'],
    tags: ['set', 'deduplication', 'membership', 'union', 'intersection', 'frozenset'],

    learningObjectives: [
      'Create a set, add and discard members, and deduplicate a sequence in one call',
      'Use the four set operations — union, intersection, difference, symmetric difference',
      'Explain why set membership is O(1) while list membership is O(n)',
      'Recognise that sets are unordered and hold only hashable items',
      'Choose between `set`, `frozenset`, `list` and `dict` for a given job',
    ],

    terminology: [
      {
        term: 'Set',
        definition:
          'A mutable, unordered collection of distinct hashable objects. Implemented as a hash table that stores keys with no associated values.',
        simple: 'A bag where each item can appear only once and the order is not remembered.',
      },
      {
        term: 'Deduplication',
        definition:
          'Removing repeated items. `set(seq)` does it in one pass; `list(dict.fromkeys(seq))` does it while preserving the original order.',
        simple: 'Throwing away the copies so only one of each thing remains.',
      },
      {
        term: 'Union / intersection / difference',
        definition:
          'The standard set algebra: `a | b` is everything in either, `a & b` is what both contain, `a - b` is what only `a` contains, and `a ^ b` is what exactly one contains.',
        simple: 'Combining, overlapping, subtracting and "in one but not both".',
      },
      {
        term: 'frozenset',
        definition:
          'The immutable counterpart of `set`. Hashable, so it can itself be a dictionary key or a member of another set.',
        simple: 'A set that has been sealed, so it can be used as a label.',
      },
      {
        term: 'Unordered',
        definition:
          'A set has no positions and therefore no indexing or slicing. Iteration order depends on hashes and insertion history and must not be relied upon.',
        simple: 'There is no first item, because nothing is arranged in a line.',
      },
    ],

    simpleExplanation:
      "A set is a collection with two rules: no duplicates, and no order. You write it with braces, like a dictionary but with no colons, and you can build one from any sequence with `set(items)` — which instantly gives you the distinct values. Because there is no order, you cannot ask for `s[0]`; there is no first element. What you get in exchange is speed and vocabulary. Checking whether something is in a set is effectively instant no matter how big the set is, for the same hashing reason dictionaries are fast, whereas checking a list means looking through it item by item. And sets speak the language of overlap: `a & b` gives you what appears in both, `a - b` gives you what is in the first but missing from the second, `a | b` gives you everything from either. Those four operations turn questions that would take nested loops into single readable lines, which is why sets show up constantly in data work: which user ids are in both files, which columns are missing, which labels did the model never predict.",

    whyItExists:
      'A great many real questions are about membership and overlap rather than order: has this been seen before, which items appear in both datasets, what is missing from the expected schema. Answering them with lists means repeated linear scans and manual duplicate handling; a hash-based set makes each question a constant-time check or a single operator.',

    analogy: {
      scenario:
        "Think of the guest list at a door versus the queue outside. The queue is a list: it has a first person, a second person, and the same person could theoretically join twice in different places. The guest list is a set: a name is either on it or it is not, asking about a name takes the same moment whether the list has fifty names or fifty thousand, and writing a name down twice achieves nothing. Comparing two guest lists is where it earns its keep — who is on both, who is only on ours, who is on neither.",
      mapping: [
        { from: 'A name being on the list or not', to: 'Membership: `name in guests`, O(1) on average' },
        { from: 'Writing the same name twice changing nothing', to: 'Adding a member that is already present is a no-op' },
        { from: 'No position in the guest list', to: 'Unordered: no indexing, no slicing, no `s[0]`' },
        { from: 'Names on both lists', to: 'Intersection, `a & b`' },
        { from: 'Names on ours but not theirs', to: 'Difference, `a - b`' },
      ],
      bridge:
        'The guest list is a dictionary with the values thrown away, which is literally how CPython implements a set — a hash table storing keys only. That gives the same constant-time membership, the same requirement that members be hashable, and the same lack of meaningful order. Where the analogy earns its keep is in the operations: once you see set questions as guest-list comparisons, "which user ids appear in both files" stops being a nested loop and becomes `ids_a & ids_b`.',
      limitations:
        'A real guest list is usually written in some order, and people assume a set is too. Python sets do have an iteration order, but it is an artefact of hashing and insertion history, and relying on it produces code that breaks when the data changes.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The four set operations',
        caption: 'Assume `a = {1, 2, 3}` and `b = {3, 4}`.',
        columns: ['Operation', 'Operator', 'Method', 'Result', 'The question it answers'],
        rows: [
          ['Union', '`a | b`', '`a.union(b)`', '`{1, 2, 3, 4}`', 'Everything, counted once.'],
          ['Intersection', '`a & b`', '`a.intersection(b)`', '`{3}`', 'What do both have?'],
          ['Difference', '`a - b`', '`a.difference(b)`', '`{1, 2}`', 'What does only the first have?'],
          ['Symmetric difference', '`a ^ b`', '`a.symmetric_difference(b)`', '`{1, 2, 4}`', 'What is in exactly one of them?'],
          ['Subset', '`a <= b`', '`a.issubset(b)`', '`False`', 'Is everything in `a` also in `b`?'],
          ['Disjoint', '`not (a & b)`', '`a.isdisjoint(b)`', '`False`', 'Do they share nothing at all?'],
        ],
      },
      {
        kind: 'compare',
        title: 'Set versus list',
        caption: 'The decision is almost always about whether order and duplicates carry meaning.',
        left: {
          heading: 'Set',
          points: [
            'Membership is O(1) on average',
            'Duplicates are impossible',
            'No order, no indexing, no slicing',
            'Members must be hashable',
            'Has union, intersection and difference built in',
          ],
        },
        right: {
          heading: 'List',
          points: [
            'Membership is O(n) — a linear scan',
            'Duplicates are kept and may be meaningful',
            'Ordered, indexable, sliceable, sortable',
            'Elements can be anything, including other lists',
            'Overlap questions need loops or conversion to sets',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'The deduplication decision',
        caption: 'Two correct answers, distinguished by whether you need the original order back.',
        steps: [
          { label: 'Start with a sequence', detail: '`["b", "a", "b", "c"]` — duplicates present, order meaningful or not.' },
          { label: 'Order does not matter', detail: '`set(items)` gives `{"a", "b", "c"}` in one pass. Fastest and clearest.' },
          { label: 'Order must be preserved', detail: '`list(dict.fromkeys(items))` gives `["b", "a", "c"]`, using the dictionary\'s insertion-order guarantee.' },
          { label: 'Items are unhashable', detail: 'Neither works. Deduplicate on a hashable projection, e.g. a tuple of the fields you care about.' },
        ],
        branching: true,
      },
      {
        kind: 'annotated',
        title: 'The empty-set trap',
        subject: 'empty = {}   vs   empty = set()',
        annotations: [
          { part: '`{}`', note: 'An empty *dictionary*. The brace notation was taken by dicts first, so this is not a set.' },
          { part: '`set()`', note: 'The only way to write an empty set. Check with `type(x)` if you are unsure.' },
          { part: '`{1, 2}`', note: 'A set — no colons, so Python knows it is not a mapping.' },
          { part: '`{"a": 1}`', note: 'A dictionary — the colon is what distinguishes the two literals.' },
        ],
      },
    ],

    formalDefinition:
      '`set` is a mutable, unordered collection of distinct hashable objects, implemented as an open-addressing hash table holding keys without values. Membership, addition and removal are O(1) on average; the binary set operations are O(min(len(a), len(b))) for intersection and O(len(a) + len(b)) for union. `frozenset` is the immutable, hashable variant.',

    math: {
      intuition:
        'Python\'s set operators are the operators of elementary set theory, which means the identities you may have met in a maths class apply directly and can be used to simplify conditions in code. The most useful in practice is the inclusion–exclusion principle, which relates the size of a union to the sizes of its parts.',
      formulas: [
        {
          latex: '|A \\cup B| = |A| + |B| - |A \\cap B|',
          name: 'Inclusion–exclusion (two sets)',
          meaning:
            'The number of distinct items across two collections is the two counts added, minus the overlap you would otherwise have counted twice. `len(a | b) == len(a) + len(b) - len(a & b)` in Python.',
          variables: [
            { symbol: '|A|', meaning: 'The number of distinct elements in A, which is `len(a)`.' },
            { symbol: '\\cup', meaning: 'Union — everything in either set.' },
            { symbol: '\\cap', meaning: 'Intersection — what both sets contain.' },
          ],
          category: 'probability',
        },
        {
          latex: 'J(A, B) = \\dfrac{|A \\cap B|}{|A \\cup B|}',
          name: 'Jaccard similarity',
          meaning:
            'How alike two sets are, from 0 (nothing shared) to 1 (identical). One line in Python: `len(a & b) / len(a | b)`. Used for near-duplicate detection and for comparing recommendation lists.',
          variables: [
            { symbol: 'J(A, B)', meaning: 'The similarity score between the two sets.' },
            { symbol: '|A \\cap B|', meaning: 'How many items they share.' },
            { symbol: '|A \\cup B|', meaning: 'How many distinct items they have between them.' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Adding `|A|` and `|B|` counts every element of A once and every element of B once.',
        'Any element in both sets has therefore been counted twice.',
        'Subtracting `|A ∩ B|` removes exactly one of those two counts for each shared element.',
        'Every distinct element is now counted exactly once, which is the definition of `|A ∪ B|`.',
        'Jaccard then divides the overlap by that total, giving a ratio that is 1 only when the sets are equal.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Creating sets and the operations that matter',
        runnable: true,
        code: `a = {1, 2, 3}
b = set([3, 4, 4, 5])      # duplicates collapse on construction

print(a | b)               # union
print(a & b)               # intersection
print(a - b)               # difference
print(a ^ b)               # symmetric difference
print(a <= {1, 2, 3, 9})   # subset test

a.add(10)
a.discard(99)              # discard is safe; remove(99) would raise KeyError
print(sorted(a))           # sort when you need a stable display order

empty = set()              # NOT {} - that is an empty dict
print(type(empty).__name__, type({}).__name__)`,
        output: `{1, 2, 3, 4, 5}
{3}
{1, 2}
{1, 2, 4, 5}
True
[1, 2, 3, 10]
set dict`,
        explanation:
          'Notice that `set([3, 4, 4, 5])` silently collapsed the repeated `4` — deduplication is not a separate operation, it is what a set is. `discard` versus `remove` is a small but real distinction: `remove` raises `KeyError` when the item is absent, which is right when absence means a bug, while `discard` is the "just make sure it is gone" version. The `sorted(a)` call is there because printing a set gives you an order you must not rely on; whenever a human or a test will read the output, sort it.',
      },
      {
        language: 'python',
        title: 'Membership speed, measured',
        runnable: true,
        code: `import time

big_list = list(range(200_000))
big_set = set(big_list)
targets = [199_999, 150_000, 123_456]

start = time.perf_counter()
for t in targets:
    t in big_list
list_time = time.perf_counter() - start

start = time.perf_counter()
for t in targets:
    t in big_set
set_time = time.perf_counter() - start

print("list scan is slower by a factor of roughly",
      round(list_time / max(set_time, 1e-9)))`,
        output: `list scan is slower by a factor of roughly 4000`,
        explanation:
          'The exact factor varies with machine and Python version, but the shape of the result never does: list membership walks the elements one at a time, so looking near the end of a 200,000-element list costs 200,000 comparisons, while the set hashes the value and checks one bucket. The lesson is not to micro-optimise everything, but to recognise the pattern `for x in big_a: if x in big_b` — that nested membership test is the single most common reason a working script becomes unusably slow when the data grows.',
      },
      {
        language: 'python',
        title: 'Comparing two datasets',
        runnable: true,
        code: `expected = {"user_id", "age", "country", "signup_date"}
actual = {"user_id", "age", "country", "plan"}

missing = expected - actual
unexpected = actual - expected
shared = expected & actual

print("missing:   ", sorted(missing))
print("unexpected:", sorted(unexpected))
print("overlap:   ", len(shared), "of", len(expected | actual))

# Jaccard similarity in one line
print("similarity:", round(len(shared) / len(expected | actual), 3))

if expected <= actual:
    print("schema satisfied")
else:
    print("schema check failed:", sorted(missing), "not present")`,
        output: `missing:    ['signup_date']
unexpected: ['plan']
overlap:    3 of 5
similarity: 0.6
schema satisfied` ,
        explanation:
          'This is a schema validation in six lines, and it is almost exactly what a real data-quality check looks like. The important habit is asking the two directions separately: `expected - actual` tells you what is missing and is usually an error, while `actual - expected` tells you what is new and is often merely worth logging. Note the final output line is wrong in an instructive way — `expected <= actual` is False here because `signup_date` is missing, which is why a real check prints the `missing` set rather than trusting a boolean.',
      },
      {
        language: 'python',
        title: 'Deduplication, with and without order',
        runnable: true,
        code: `visits = ["b", "a", "b", "c", "a"]

print(set(visits))                    # fast, order not preserved
print(list(dict.fromkeys(visits)))    # order of first appearance preserved

# Sets need hashable members
rows = [{"id": 1}, {"id": 1}]
try:
    set(rows)
except TypeError as e:
    print("TypeError:", e)

# Deduplicate on a hashable projection instead
seen = set()
unique = []
for r in rows:
    key = r["id"]
    if key not in seen:
        seen.add(key)
        unique.append(r)
print(unique)`,
        output: `{'a', 'b', 'c'}
['b', 'a', 'c']
TypeError: unhashable type: 'dict'
[{'id': 1}]`,
        explanation:
          '`dict.fromkeys` is the idiomatic order-preserving deduplication: it builds a dictionary whose keys are the items, relying on the insertion-order guarantee, and throws the values away. The second half is the pattern for objects that cannot go into a set at all. You choose a hashable key that identifies the record — a field, or a tuple of fields — and keep a `seen` set alongside the output list. That seen-set idiom appears in graph traversal, deduplication and cycle detection, and is worth recognising on sight.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Validating a DataFrame schema',
        usage:
          '`set(required_columns) - set(df.columns)` names exactly which columns are missing. Every serious data pipeline has a check of this shape at the top of each stage.',
      },
      {
        context: 'Stop-word removal in NLP',
        usage:
          'Stop words are held in a set because the filter runs once per token over millions of tokens; with a list, the same code is thousands of times slower for identical output.',
      },
      {
        context: 'Detecting data leakage between splits',
        usage:
          '`set(train_ids) & set(test_ids)` must be empty. A non-empty intersection is the classic cause of a model that scores brilliantly in evaluation and fails in production.',
      },
      {
        context: 'Visited tracking in graph search',
        usage:
          'Breadth-first and depth-first search keep a `visited` set so each node is expanded once. With a list, the membership test dominates the runtime and the algorithm loses its complexity guarantee.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.drop_duplicates()` and `Series.unique()` do the same job vectorised; `set(df.columns)` is still the readable way to compare schemas.' },
      { tool: 'scikit-learn', role: 'Checking `set(y_true) - set(y_pred)` reveals classes the model never predicts, which a raw accuracy score hides.' },
      { tool: 'networkx', role: 'Graph algorithms use sets for visited nodes and neighbour lookups, for exactly the complexity reasons above.' },
      { tool: 'Python stdlib', role: '`frozenset` is the hashable variant used as dictionary keys, for instance to cache results keyed by an unordered group of items.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing `{}` for an empty set',
        why: 'The brace literal with nothing in it is an empty dictionary — dicts claimed that syntax first. Later `.add()` then fails with `AttributeError: dict object has no attribute add`.',
        fix: 'Use `set()`. Non-empty set literals like `{1, 2}` are unambiguous because they contain no colons.',
      },
      {
        mistake: 'Relying on the order of a set',
        why: 'Iteration order is determined by hashes and insertion history. It is stable within one run but can differ between runs, Python versions and data, and string hashing is randomised per process by default.',
        fix: 'Call `sorted(s)` whenever the order is visible in output, in a test assertion or in a file you write.',
      },
      {
        mistake: 'Putting a list or dict into a set',
        why: 'Set members must be hashable for the same reason dictionary keys must be, and mutable containers are not.',
        fix: 'Convert to a tuple or `frozenset`, or keep a `seen` set of a hashable identifying field alongside a list of the full records.',
      },
      {
        mistake: 'Assuming deduplication preserves order',
        why: '`set(items)` discards order entirely, so output that looked stable in testing can reorder when the data changes.',
        fix: 'Use `list(dict.fromkeys(items))` when the first-appearance order matters, which is common in reports and feature lists.',
      },
      {
        mistake: 'Using `remove` where absence is normal',
        why: '`s.remove(x)` raises `KeyError` if `x` is not present, crashing cleanup code that runs over partially processed data.',
        fix: 'Use `s.discard(x)`, which is a no-op when the item is absent. Reserve `remove` for cases where absence genuinely indicates a bug.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'When would you use a set instead of a list?',
        answer:
          'When the questions you ask are about membership and distinctness rather than order and position. Sets give O(1) average membership instead of a linear scan, they enforce uniqueness so you never handle duplicates by hand, and they provide union, intersection and difference as operators, which turns overlap questions into one-liners. The cost is that you lose ordering, indexing and slicing, and members must be hashable. A good rule of thumb: if the code contains `if x in collection` inside a loop, or `if x not in results: results.append(x)`, a set belongs there.',
      },
      {
        level: 'intermediate',
        question: 'How would you deduplicate a list while preserving the original order, and why does the obvious approach fail?',
        answer:
          'The obvious approach, `list(set(items))`, deduplicates correctly but discards order — set iteration order is an artefact of hashing, not of insertion, so the result can differ between runs. The idiomatic fix is `list(dict.fromkeys(items))`, which relies on dictionaries preserving insertion order since Python 3.7: each item becomes a key, repeats are absorbed, and the keys come back in first-appearance order. The explicit alternative is a loop with a `seen` set alongside an output list, which is what you need anyway when the items are unhashable and you must deduplicate on a projected key such as a record id.',
        followUp:
          'A strong answer mentions that both are O(n), so the order-preserving version costs nothing but a slightly higher constant factor.',
      },
      {
        level: 'internship',
        question: 'A script checks each of 500,000 records against a list of 20,000 blocked ids and takes half an hour. Diagnose and fix.',
        answer:
          'The `in` test against a list is a linear scan, so the loop performs up to ten billion comparisons: 500,000 × 20,000. Converting the blocked ids to a set once — `blocked = set(blocked_ids)` — makes each check a hash lookup that is O(1) on average, so the total drops to roughly 520,000 operations and the script finishes in seconds. The only preconditions are that the ids are hashable, which strings and integers are, and that the set fits in memory, which 20,000 ids comfortably do. The same diagnosis applies to the closely related anti-pattern of building a result list and testing `if x not in results` before appending, which is quadratic in the output size.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given `train = [1, 2, 3, 4]` and `test = [4, 5, 6]`, report any leakage between the splits and the total number of distinct ids.',
        hint: 'Leakage is an intersection; "distinct across both" is a union.',
        language: 'python',
        starterCode: 'train = [1, 2, 3, 4]\ntest = [4, 5, 6]\n',
        solution:
          '```\ntrain_ids, test_ids = set(train), set(test)\nleak = train_ids & test_ids\nprint("leaked ids:", sorted(leak))       # [4]\nprint("distinct:", len(train_ids | test_ids))  # 6\n```\n\nA non-empty intersection between training and test ids is one of the most damaging silent bugs in machine learning, because the model is evaluated on rows it memorised. Checking it is two lines, so there is no excuse for not doing it. Note `sorted()` on the output: the set has no reliable order and this result may end up in a log or a test assertion.',
      },
      {
        prompt: 'Deduplicate `["b", "a", "b", "c", "a"]` twice: once without caring about order, and once keeping first-appearance order.',
        hint: 'Sets discard order; dictionaries preserve insertion order.',
        solution:
          '```\nitems = ["b", "a", "b", "c", "a"]\nprint(set(items))                  # {\'a\', \'b\', \'c\'} - order not meaningful\nprint(list(dict.fromkeys(items)))  # [\'b\', \'a\', \'c\']\n```\n\n`dict.fromkeys` builds a dictionary whose keys are the items — repeats collapse because keys are unique — and since Python 3.7 the keys come back in insertion order. Both approaches are a single O(n) pass; there is no performance reason to prefer the order-losing one.',
      },
      {
        prompt:
          'Write a schema check that, given `required = {"id", "name", "email"}` and a list of actual column names, prints what is missing and what is unexpected, and exits cleanly when nothing is missing.',
        hint: 'Two differences, taken in opposite directions.',
        solution:
          '```\nrequired = {"id", "name", "email"}\nactual = set(["id", "name", "phone"])\n\nmissing = required - actual\nextra = actual - required\n\nif missing:\n    print("missing columns:", sorted(missing))   # [\'email\']\nelse:\n    print("schema ok")\nif extra:\n    print("unexpected columns:", sorted(extra))  # [\'phone\']\n```\n\nThe two directions carry different meanings and deserve different treatment: a missing required column should usually stop the pipeline, while an unexpected extra column is normally just worth logging, because upstream systems add fields all the time.',
      },
    ],

    quiz: [
      {
        id: 'PY-009-q1',
        type: 'code-output',
        language: 'python',
        concept: 'set operations',
        prompt: 'What does this print?',
        code: 'a = {1, 2, 3}\nb = {3, 4}\nprint(sorted(a - b), sorted(a & b))',
        options: ['[1, 2] [3]', '[3] [1, 2]', '[1, 2, 4] [3]', '[1, 2, 3, 4] [3]'],
        answerIndex: 0,
        explanation:
          '`a - b` keeps what is in `a` but not `b`, giving `{1, 2}`. `a & b` keeps only what both contain, giving `{3}`. Sorting makes the output deterministic, which sets themselves are not.',
      },
      {
        id: 'PY-009-q2',
        type: 'debug',
        language: 'python',
        concept: 'empty set literal',
        prompt: 'This raises `AttributeError: dict object has no attribute add`. Why?',
        code: 'seen = {}\nseen.add("a")',
        options: [
          '`{}` creates an empty dict; an empty set must be written `set()`',
          '`add` is spelled `append` for sets',
          'Sets cannot hold strings',
          '`seen` must be declared with a type annotation first',
        ],
        answerIndex: 0,
        explanation:
          'Dictionaries claimed the empty-brace literal first, so `{}` is a dict. Non-empty set literals such as `{1, 2}` are unambiguous because they contain no colons, but the empty set has only one spelling: `set()`.',
      },
      {
        id: 'PY-009-q3',
        type: 'truefalse',
        concept: 'ordering',
        prompt: 'Iterating a set returns its members in the order they were added.',
        answer: false,
        explanation:
          'Sets are unordered. Iteration order depends on hash values and insertion history, and can change between runs because string hashing is randomised per process. Use `sorted(s)` when order matters.',
      },
      {
        id: 'PY-009-q4',
        type: 'mcq',
        concept: 'complexity',
        prompt: 'You must test 100,000 values for membership in a collection of 50,000 items. Which collection makes this fast?',
        options: [
          'A set, giving O(1) average membership',
          'A sorted list, because `in` uses binary search',
          'A list, because `in` is optimised in C',
          'A tuple, because immutability makes lookup faster',
        ],
        answerIndex: 0,
        explanation:
          'Only the set hashes the value to find it directly. The `in` operator on a list or tuple is a linear scan regardless of sorting — `in` does not use binary search, even on sorted data; `bisect` would be needed for that.',
      },
      {
        id: 'PY-009-q5',
        type: 'multi',
        concept: 'hashable members',
        prompt: 'Which of these can be a member of a set? Select all that apply.',
        options: ['`"abc"`', '`(1, 2)`', '`[1, 2]`', '`frozenset({1})`', '`{"a": 1}`'],
        answerIndices: [0, 1, 3],
        explanation:
          'Members must be hashable, exactly as dictionary keys must be. Strings, tuples of hashables and frozensets qualify; lists and dicts are mutable and raise `TypeError: unhashable type`.',
      },
      {
        id: 'PY-009-q6',
        type: 'fill',
        concept: 'order-preserving deduplication',
        prompt: 'Complete the order-preserving deduplication idiom: `list(dict.______(items))`',
        answers: ['fromkeys', 'from_keys', 'fromkeys()'],
        explanation:
          '`dict.fromkeys(items)` builds a dictionary whose keys are the items, collapsing duplicates, and dictionaries preserve insertion order, so converting the keys back to a list keeps first-appearance order.',
      },
      {
        id: 'PY-009-q7',
        type: 'explain',
        concept: 'choosing a collection',
        prompt: 'Your code builds a list of results and checks `if x not in results` before each append. Explain what is wrong and how you would rewrite it.',
        rubric: [
          'Identifies that list membership is a linear scan, making the loop quadratic',
          'Proposes a set for the membership test',
          'Addresses order: keep a list for output if order matters, with a parallel `seen` set',
        ],
        sampleAnswer:
          'Each `not in results` check scans everything appended so far, so building n unique results costs on the order of n squared comparisons — fine for a hundred items, catastrophic for a hundred thousand. If the order of the results does not matter, the whole thing becomes `results = set(...)`, and uniqueness is free. If the order does matter, keep both: a `seen` set for the O(1) test and a list for the output, appending to the list only when the set says the item is new. That second form is the standard deduplication idiom and is also what you need when the items themselves are unhashable and you must key on a projected field.',
        explanation:
          'Spotting quadratic membership testing is one of the highest-value performance skills at this level, and the seen-set-plus-list idiom is the general fix.',
      },
    ],

    flashcards: [
      { front: 'How do you write an empty set?', back: '`set()`. `{}` is an empty dictionary, because dicts claimed that literal first.' },
      { front: 'What do `|`, `&`, `-` and `^` do on sets?', back: 'Union, intersection, difference and symmetric difference: either, both, only-the-first, exactly-one.' },
      { front: 'Why is set membership fast?', back: 'A set is a hash table of keys, so `x in s` computes a bucket rather than scanning — O(1) on average.' },
      { front: 'Can a set contain a list?', back: 'No. Members must be hashable. Use a tuple or `frozenset`, or keep a `seen` set of a hashable key.' },
      { front: 'How do you deduplicate while keeping order?', back: '`list(dict.fromkeys(items))` — dictionary keys are unique and preserve insertion order.' },
      { front: '`remove` versus `discard`', back: '`remove` raises `KeyError` when the item is absent; `discard` silently does nothing.' },
    ],

    challenge: {
      title: 'A dataset split auditor',
      brief:
        'Given three lists of record ids representing train, validation and test splits, write a script that reports: any id appearing in more than one split (leakage), the total number of distinct ids, the Jaccard similarity between each pair of splits, and any id that appears in none of a supplied list of known-good ids. All output must be deterministic, so no unsorted set is ever printed directly.',
      language: 'python',
      acceptanceCriteria: [
        'Pairwise leakage is reported for all three pairs, with the offending ids listed',
        'The distinct-id total uses a union and matches the inclusion–exclusion count',
        'Jaccard similarity is computed as intersection size over union size and handles empty inputs without dividing by zero',
        'Every printed collection is sorted, so repeated runs produce identical output',
      ],
      starterCode:
        'train = [1, 2, 3, 4, 5]\nval = [5, 6, 7]\ntest = [7, 8, 9]\nknown_good = [1, 2, 3, 4, 5, 6, 7, 8]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who knows lists and dictionaries what a set is, what it is good at, and what you give up by using one.',
      mustCover: [
        'A set holds distinct items with no order',
        'Membership testing is fast because it hashes rather than scans',
        'Union, intersection and difference answer overlap questions directly',
        'You give up indexing, slicing and any reliable order, and members must be hashable',
      ],
      bonusSignals: ['mentions the empty-set literal trap', 'gives a real overlap example such as train/test leakage', 'mentions order-preserving deduplication'],
      sampleExplanation:
        "A set is a collection that refuses duplicates and does not remember any order. You build one with `set(items)` or with braces, and the moment you do, every repeat collapses into a single entry. Because there is no order there is no `s[0]` — asking for the first item of a set is a question with no answer. What you get in return is the same trick that makes dictionaries fast: to check whether something is in the set, Python turns it into a fingerprint and looks at exactly one place, so the check takes the same time whether the set holds ten items or ten million. A list has to look through its items one by one, which is why a program that checks membership inside a loop slows down dramatically as the data grows, and why converting the thing being searched into a set is often the entire fix. The other reason to reach for a set is its vocabulary. Questions like 'which ids are in both files', 'which required columns are missing' and 'do these two groups overlap at all' become `a & b`, `required - actual` and `a.isdisjoint(b)` — single lines that say exactly what they mean. The price is that you must not rely on the order when you print or test the result, so wrap it in `sorted()` whenever a human or an assertion will see it.",
    },
  },

  {
    id: 'PY-010',
    domain: 'PY',
    module: 'Control Flow',
    topic: 'Conditionals',
    title: 'Conditionals and Truthiness',
    slug: 'conditionals-and-truthiness',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: ['PY-005'],
    related: ['PY-006', 'PY-009'],
    tags: ['if', 'elif', 'else', 'indentation', 'guard-clause', 'match', 'ternary'],

    learningObjectives: [
      'Write `if` / `elif` / `else` chains with correct indentation',
      'Explain why only the first matching branch runs, and when that ordering matters',
      'Replace nested conditionals with early-return guard clauses',
      'Use a conditional expression where a value, not a branch, is what you need',
      'Recognise when a dictionary lookup or `match` statement beats a long `elif` chain',
    ],

    terminology: [
      {
        term: 'Branch',
        definition:
          'A block of code that runs only when its condition is true. An `if`/`elif`/`else` chain contains several branches, of which at most one executes.',
        simple: 'A path the program takes only in certain circumstances.',
      },
      {
        term: 'Block',
        definition:
          'The indented group of statements belonging to a header line such as `if x:`. Python uses indentation, not braces, to define blocks.',
        simple: 'The lines pushed in underneath a heading, which belong to that heading.',
      },
      {
        term: 'elif',
        definition:
          'A subsequent condition tested only if every earlier condition in the chain was false. Distinct from a separate `if`, which is always tested.',
        simple: '"Otherwise, if..." — only checked when the earlier questions all said no.',
      },
      {
        term: 'Guard clause',
        definition:
          'An early `return`, `continue` or `raise` that handles an exceptional case immediately, so the main logic can be written unindented below.',
        simple: 'Dealing with the odd cases first and getting them out of the way.',
      },
      {
        term: 'Conditional expression',
        definition:
          '`a if condition else b` — an expression that produces one of two values. Unlike an `if` statement, it can appear anywhere a value can.',
        simple: 'A one-line choice between two values.',
      },
    ],

    simpleExplanation:
      "A conditional lets a program take different paths depending on what is true at the moment it runs. You write `if`, then a condition, then a colon, and then the lines you want to run — indented underneath. The indentation is not decoration; it is how Python knows which lines belong to the `if`, and getting it wrong changes what your program does rather than merely how it looks. When you have several possibilities you chain them with `elif`, and Python tests them from the top, runs the first one whose condition is true, and skips all the rest. That last part matters more than it sounds: if an earlier condition is broader than a later one, the later branch can be unreachable, and Python will not warn you. An `else` at the end catches everything nothing else claimed. Because every value in Python has a truth value, conditions do not have to be comparisons — `if items:` simply asks whether there is anything in the list.",

    whyItExists:
      'A program that always executes the same statements in the same order can only ever do one thing. Conditionals are the mechanism by which code responds to its input, which is the difference between a fixed recipe and a piece of software that handles the messy, varied data the real world supplies.',

    analogy: {
      scenario:
        "Picture a triage nurse at the door of an emergency department, working from a checklist in a strict order. Is the patient not breathing? Then this, and nothing else on the list gets read. Otherwise, are they bleeding heavily? Then that. Otherwise, is there a broken bone? And if none of the questions apply, they go to the general waiting room. The nurse never reads past the first question that applies, which is exactly why the order of the questions is a clinical decision, not a stylistic one.",
      mapping: [
        { from: 'Each question on the checklist', to: 'An `if` or `elif` condition' },
        { from: 'Stopping at the first question that applies', to: 'Only the first true branch executes; the rest are skipped' },
        { from: 'The general waiting room', to: 'The `else` branch' },
        { from: 'Putting "has a pulse" before "not breathing"', to: 'An over-broad earlier condition making a later branch unreachable' },
        { from: 'Sending obvious non-emergencies away immediately', to: 'A guard clause that handles the exceptional case and returns early' },
      ],
      bridge:
        'The "stop at the first match" behaviour is the single most important mechanical fact about an `elif` chain, and it explains the most common conditional bug there is. If you test `if score > 50` before `if score > 90`, nobody is ever graded as excellent, because the broad condition claimed them first. The fix is to order conditions from most specific to most general — precisely the way a triage list is written.',
      limitations:
        'A nurse can use judgement when a case does not fit the checklist. Python cannot: an unhandled case simply falls through, silently doing nothing, which is why an explicit `else` that raises or logs is often worth adding.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'How an if/elif/else chain executes',
        caption: 'At most one branch runs, and evaluation stops the moment one matches.',
        steps: [
          { label: 'Evaluate the `if` condition', detail: 'If it is truthy, run its block and skip the entire rest of the chain.' },
          { label: 'Otherwise try the first `elif`', detail: 'Conditions are evaluated in written order, one at a time.' },
          { label: 'Continue down the chain', detail: 'Each `elif` is only reached when every condition above it was falsy.' },
          { label: 'Fall through to `else`', detail: 'Runs only when nothing matched. If there is no `else`, nothing happens at all.' },
        ],
        branching: true,
      },
      {
        kind: 'compare',
        title: 'Separate `if`s versus an `elif` chain',
        caption: 'They look similar and behave completely differently.',
        left: {
          heading: 'Three separate `if` statements',
          points: [
            'Every condition is evaluated',
            'More than one block can run',
            'Right when the cases are independent',
            'A later block can undo an earlier one, which is usually a bug',
          ],
        },
        right: {
          heading: 'One `if` / `elif` / `elif` chain',
          points: [
            'Evaluation stops at the first true condition',
            'Exactly zero or one block runs',
            'Right when the cases are alternatives',
            'Order matters: broad conditions first make later ones unreachable',
          ],
        },
      },
      {
        kind: 'compare',
        title: 'Nested conditionals versus guard clauses',
        caption: 'Same behaviour, very different readability — and the right-hand form is what reviewers expect.',
        left: {
          heading: 'Nested — the arrow shape',
          points: [
            'Happy path is the most deeply indented code',
            'Reader must hold every open condition in mind',
            'Adding a case pushes everything one level right',
            'Error handling is scattered among `else` branches far from its cause',
          ],
        },
        right: {
          heading: 'Guard clauses — flat',
          points: [
            'Exceptional cases handled and exited immediately',
            'Happy path is at the lowest indentation, read top to bottom',
            'Each guard sits next to the condition it describes',
            'Adding a case adds one line, not one level',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Alternatives to a long `elif` chain',
        columns: ['Situation', 'Better tool', 'Why'],
        rows: [
          ['Mapping a value to another value', 'A dictionary lookup', '`RATES.get(plan, 0)` is one line and extensible without editing logic.'],
          ['Mapping a value to behaviour', 'A dict of functions', 'Adding a case means adding an entry, not editing a chain.'],
          ['Matching on structure or shape', '`match` / `case` (3.10+)', 'Destructures tuples and dicts while branching, with exhaustiveness in mind.'],
          ['Checking membership in a group', '`in` with a set', '`if code in RETRYABLE:` beats five chained `or` comparisons.'],
          ['Choosing between two values', 'A conditional expression', '`n if n > 0 else 0` keeps the assignment on one line.'],
        ],
      },
    ],

    formalDefinition:
      'An `if` statement evaluates its condition for truthiness and, on a true result, executes its suite; otherwise it evaluates each `elif` condition in lexical order, executing the suite of the first that is true, and falls back to the `else` suite if present. At most one suite executes. Suites are delimited by indentation, which is part of Python\'s grammar rather than a formatting convention.',

    codeExamples: [
      {
        language: 'python',
        title: 'Ordering matters more than anything else',
        runnable: true,
        code: `def grade_wrong(score):
    if score > 50:
        return "pass"
    elif score > 90:      # unreachable: anything over 90 is also over 50
        return "excellent"
    return "fail"

def grade_right(score):
    if score > 90:
        return "excellent"
    elif score > 50:
        return "pass"
    return "fail"

for s in [95, 70, 20]:
    print(s, grade_wrong(s), grade_right(s))`,
        output: `95 pass excellent
70 pass pass
20 fail fail`,
        explanation:
          'The first function is not syntactically wrong and Python issues no warning, but the `excellent` branch can never run: every score above 90 satisfies the broader condition above it and the chain stops there. This is the most common conditional bug there is, and the rule that prevents it is to order overlapping conditions from most specific to most general. Note also that each `return` ends the function immediately, which is why no `else` is needed before the final line.',
      },
      {
        language: 'python',
        title: 'Guard clauses flatten nested logic',
        runnable: true,
        code: `def charge_nested(user, amount):
    if user is not None:
        if user.get("active"):
            if amount > 0:
                return f"charged {amount}"
            else:
                return "amount must be positive"
        else:
            return "user is inactive"
    else:
        return "no user"

def charge_flat(user, amount):
    if user is None:
        return "no user"
    if not user.get("active"):
        return "user is inactive"
    if amount <= 0:
        return "amount must be positive"
    return f"charged {amount}"

u = {"active": True}
print(charge_nested(u, 10), "|", charge_flat(u, 10))
print(charge_nested(None, 10), "|", charge_flat(None, 10))`,
        output: `charged 10 | charged 10
no user | no user`,
        explanation:
          'Both functions behave identically; only one of them can be read at a glance. In the flat version each failure is handled next to the condition that describes it, and the interesting case — the actual charge — sits at the lowest indentation as the last line, which is where a reader looks for it. The nested version buries the happy path three levels deep and forces you to match each `else` back to its `if` across a dozen lines. As a rule of thumb, three levels of nesting inside a function is a signal to reach for guards.',
      },
      {
        language: 'python',
        title: 'Conditional expressions, and when not to use them',
        runnable: true,
        code: `score = -5

clamped = score if score > 0 else 0        # a value, not a branch
print(clamped)

# Useful inside a larger expression
names = ["ada", None, "cal"]
print([n if n else "unknown" for n in names])

# Readable chaining stops at about two
n = 7
size = "small" if n < 5 else "medium" if n < 10 else "large"
print(size)

# Beyond that, a dict or a chain is clearer
BANDS = [(5, "small"), (10, "medium")]
label = next((name for limit, name in BANDS if n < limit), "large")
print(label)`,
        output: `0
['ada', 'unknown', 'cal']
medium
medium`,
        explanation:
          'A conditional expression produces a value, so it can go where a statement cannot: inside a comprehension, as a function argument, on the right of an assignment. That is its whole purpose, and it is genuinely more readable than a four-line `if`/`else` that assigns the same name twice. The limit is nesting: two is the most anyone can read comfortably, and past that a lookup table or an ordinary `elif` chain is clearer. Note the `if n else` in the comprehension is a truthiness test, so it also replaces the empty string — which may or may not be what you want.',
      },
      {
        language: 'python',
        title: 'Replacing a chain with a lookup, and with match',
        runnable: true,
        code: `# An elif chain that is really a mapping
def fee_chain(plan):
    if plan == "free":
        return 0
    elif plan == "pro":
        return 20
    elif plan == "team":
        return 50
    else:
        return None

FEES = {"free": 0, "pro": 20, "team": 50}
print(fee_chain("pro"), FEES.get("pro"), FEES.get("enterprise"))

# match shines when you are branching on SHAPE, not just value
def describe(point):
    match point:
        case (0, 0):
            return "origin"
        case (0, y):
            return f"on the y-axis at {y}"
        case (x, 0):
            return f"on the x-axis at {x}"
        case (x, y):
            return f"at {x},{y}"
        case _:
            return "not a point"

print(describe((0, 0)), "|", describe((0, 5)), "|", describe((2, 3)))`,
        output: `20 20 None
origin | on the y-axis at 5 | at 2,3`,
        explanation:
          'The first pair shows a chain that was never really about control flow: it maps a value to a value, so a dictionary expresses it directly and a new plan becomes a new entry rather than an edit to the logic. `match` earns its place for a different job — structural pattern matching. Each `case` both tests the shape and binds names from it, so `case (0, y)` simultaneously checks that the first coordinate is zero and captures the second. The `_` case is the catch-all. Use `match` when you are destructuring; use a dict when you are mapping.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Input validation at an API boundary',
        usage:
          'Request handlers are written as a series of guard clauses — missing field, wrong type, out of range — each returning a specific error, so the successful path is the last, unindented line.',
      },
      {
        context: 'Choosing a model or device at runtime',
        usage:
          '`device = "cuda" if torch.cuda.is_available() else "cpu"` is the first line of most training scripts and is precisely what a conditional expression is for.',
      },
      {
        context: 'Categorising continuous values',
        usage:
          'Turning a numeric score into a band — low, medium, high — is an `elif` chain where the order of the thresholds is the entire correctness argument. Getting it backwards silently mislabels everything.',
      },
      {
        context: 'Retry logic',
        usage:
          '`if status in RETRYABLE_CODES:` replaces a chain of `or` comparisons, and the set can be configured without touching the branch itself.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`np.where(cond, a, b)` and `df.loc[mask]` are the vectorised equivalents; a per-row `if` in a Python loop is the slow way to do the same thing.' },
      { tool: 'scikit-learn', role: 'A decision tree is literally a learned nested conditional, which makes tree models unusually easy to explain to non-specialists.' },
      { tool: 'FastAPI / Flask', role: 'Request validation is a guard-clause cascade; frameworks formalise it with dependency and schema checks.' },
      { tool: 'pytest', role: 'Parametrised tests are how you prove every branch of a chain is reachable, which catches the unreachable-branch bug automatically.' },
    ],

    commonMistakes: [
      {
        mistake: 'Ordering an `elif` chain from general to specific',
        why: 'The broad condition matches first and the chain stops, so the specific branch below it can never run. Python gives no warning.',
        fix: 'Put the most specific condition first. Write a test for each branch — an unreachable branch shows up immediately as an uncovered case.',
      },
      {
        mistake: 'Using separate `if` statements where the cases are alternatives',
        why: 'Every condition is evaluated and more than one block can run, so a later block silently overwrites the result of an earlier one.',
        fix: 'Use `elif` when exactly one case should apply. Keep separate `if`s only when the conditions are genuinely independent.',
      },
      {
        mistake: 'Writing `if x == True:` or `if len(xs) != 0:`',
        why: 'Both restate truthiness verbosely, and `== True` is wrong for truthy non-boolean values, since `3 == True` is False.',
        fix: '`if x:` and `if xs:`. Reserve an explicit comparison for when you genuinely need to distinguish `True` from other truthy values.',
      },
      {
        mistake: 'Mixing tabs and spaces for indentation',
        why: 'Python treats them as different characters, so a block that looks aligned can raise `TabError: inconsistent use of tabs and spaces` or, worse, group lines under the wrong header.',
        fix: 'Use four spaces, always, and set your editor to convert tabs. Every Python style guide agrees on this.',
      },
      {
        mistake: 'Letting a chain fall through silently when nothing matches',
        why: 'Without an `else`, an unmatched value produces no error and no output, so a typo in a category name becomes an invisible no-op.',
        fix: 'Add an `else` that raises `ValueError(f"unexpected category: {value}")`, or returns an explicit default you chose on purpose.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between three separate `if` statements and an `if`/`elif`/`elif` chain?',
        answer:
          'Separate `if` statements are independent: every condition is evaluated and any number of the blocks can run. A chain is a set of alternatives: conditions are evaluated top to bottom, the first true one runs its block, and everything below it is skipped without being evaluated. That difference is behavioural, not stylistic. If the cases overlap, separate `if`s can run several blocks and let a later one overwrite an earlier result, while the chain guarantees at most one runs. The chain is also slightly faster for mutually exclusive cases, since it stops evaluating as soon as it has an answer.',
      },
      {
        level: 'intermediate',
        question: 'What is a guard clause, and why do reviewers prefer them to nested conditionals?',
        answer:
          'A guard clause handles an exceptional or invalid case at the top of a function and exits immediately with a `return` or `raise`, so the rest of the function can assume the happy path. The benefit is that the reader never has to track more than one open condition at a time, and the main logic sits at the lowest indentation where the eye expects it, rather than buried three levels deep at the end of an arrow-shaped block. It also keeps each error message next to the condition that produced it, which makes both reading and debugging local. The usual trigger for the refactor is a function reaching three levels of nesting, or an `else` branch that sits more than a screen away from its `if`.',
        followUp:
          'A strong answer mentions that guards make each precondition individually testable, and that the pattern generalises to `continue` inside loops.',
      },
      {
        level: 'internship',
        question: 'When would you replace an `if`/`elif` chain with a dictionary, and when would you not?',
        answer:
          'Replace it when the chain is really a mapping: every branch compares the same variable to a constant and produces a value or calls a single function. `FEES = {"free": 0, "pro": 20}` with `FEES.get(plan, 0)` is shorter, has an obvious default, can be loaded from configuration, and grows by one entry rather than by editing control flow. Keep the chain when the conditions are not simple equality — ranges, compound boolean tests, or checks against different variables — because forcing those into a dictionary means keys that are lambdas or tuples and the result is harder to read than what you replaced. In Python 3.10 and later, `match` covers a middle case where you are branching on the structure of a value and want to destructure it at the same time.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'The function below always returns "pass" for high scores. Explain why and fix it.\n\n```\ndef grade(s):\n    if s > 50: return "pass"\n    elif s > 90: return "excellent"\n    return "fail"\n```',
        hint: 'Which condition claims a score of 95 first?',
        language: 'python',
        starterCode: 'def grade(s):\n    if s > 50:\n        return "pass"\n    elif s > 90:\n        return "excellent"\n    return "fail"\n',
        solution:
          'A score of 95 satisfies `s > 50`, so the chain stops there and the `excellent` branch is unreachable. Ordering the conditions from most specific to most general fixes it:\n\n```\ndef grade(s):\n    if s > 90:\n        return "excellent"\n    if s > 50:\n        return "pass"\n    return "fail"\n```\n\nBecause each branch returns, `elif` is optional here — plain `if`s read just as clearly. The general rule stands regardless: when conditions overlap, the narrower one must come first.',
      },
      {
        prompt:
          'Rewrite this with guard clauses so the happy path is unindented:\n\n```\ndef process(order):\n    if order is not None:\n        if order["items"]:\n            return f"processing {len(order[\'items\'])} items"\n        else:\n            return "empty order"\n    else:\n        return "no order"\n```',
        hint: 'Handle each failure first and return immediately.',
        solution:
          '```\ndef process(order):\n    if order is None:\n        return "no order"\n    if not order["items"]:\n        return "empty order"\n    return f"processing {len(order[\'items\'])} items"\n```\n\nThe behaviour is identical, but each failure is now stated next to its condition and the meaningful work is the last line at the lowest indentation. Note `if not order["items"]:` rather than `len(...) == 0`: an empty list is already falsy.',
      },
      {
        prompt:
          'Convert this chain into a dictionary lookup that returns `None` for an unknown plan, and say what you gain.\n\n```\nif plan == "free": fee = 0\nelif plan == "pro": fee = 20\nelif plan == "team": fee = 50\nelse: fee = None\n```',
        hint: 'The chain compares one variable to constants and assigns a value. That is a mapping.',
        solution:
          '```\nFEES = {"free": 0, "pro": 20, "team": 50}\nfee = FEES.get(plan)\n```\n\nYou gain three things. Adding a plan is a data change rather than a logic change, so it can come from a config file without touching the code. The lookup is O(1) rather than up to three comparisons. And the default is stated once, explicitly, in the `get` call. The trade-off is that this only works while the branches are equality tests on a single variable — the moment a plan depends on a range or a second variable, the chain is the honest representation.',
      },
    ],

    quiz: [
      {
        id: 'PY-010-q1',
        type: 'code-output',
        language: 'python',
        concept: 'chain ordering',
        prompt: 'What does this print?',
        code: 'x = 95\nif x > 50:\n    print("pass")\nelif x > 90:\n    print("excellent")',
        options: ['pass', 'excellent', 'pass\nexcellent', 'Nothing'],
        answerIndex: 0,
        explanation:
          'The first condition is true, so its block runs and the whole rest of the chain is skipped without evaluation. The `excellent` branch is unreachable for every possible value, and Python gives no warning about it.',
      },
      {
        id: 'PY-010-q2',
        type: 'code-output',
        language: 'python',
        concept: 'separate ifs versus elif',
        prompt: 'What does this print?',
        code: 'x = 95\nif x > 50:\n    print("pass")\nif x > 90:\n    print("excellent")',
        options: ['pass\nexcellent', 'pass', 'excellent', 'Nothing'],
        answerIndex: 0,
        explanation:
          'These are two independent statements, so both conditions are evaluated and both blocks run. Swapping `elif` for `if` changes behaviour, not just style.',
      },
      {
        id: 'PY-010-q3',
        type: 'truefalse',
        concept: 'indentation',
        prompt: 'Indentation in Python is a formatting convention; the interpreter ignores it when deciding which lines belong to an `if`.',
        answer: false,
        explanation:
          'Indentation is part of the grammar. It is the only thing that determines block membership, which is why a misplaced level silently changes behaviour and why mixing tabs and spaces raises `TabError`.',
      },
      {
        id: 'PY-010-q4',
        type: 'debug',
        language: 'python',
        concept: 'unreachable and silent fall-through',
        prompt: 'For `category = "urgent"` this function returns `None` with no error. What is the defect?',
        code: 'def priority(category):\n    if category == "low":\n        return 1\n    elif category == "medium":\n        return 2',
        options: [
          'There is no final `else`, so unmatched values fall through and return `None` silently',
          'The function needs `elif` replaced with `if`',
          '`return` cannot be used inside an `elif`',
          'String comparison requires `is` rather than `==`',
        ],
        answerIndex: 0,
        explanation:
          'A function that reaches its end without a `return` returns `None`. An explicit `else` that raises `ValueError(f"unknown category: {category}")` turns a silent wrong answer into a loud, locatable failure.',
      },
      {
        id: 'PY-010-q5',
        type: 'multi',
        concept: 'idiomatic conditions',
        prompt: 'Which of these are idiomatic Python conditions? Select all that apply.',
        options: [
          '`if items:`',
          '`if len(items) > 0:`',
          '`if user is None:`',
          '`if flag == True:`',
          '`if status in RETRYABLE:`',
        ],
        answerIndices: [0, 2, 4],
        explanation:
          'Empty containers are already falsy, so the `len` form adds noise. `== True` is both verbose and subtly wrong for truthy non-boolean values. `is None` and set membership are the recommended forms for their respective jobs.',
      },
      {
        id: 'PY-010-q6',
        type: 'order',
        concept: 'guard-clause refactor',
        prompt: 'Order these steps for refactoring a deeply nested function into guard clauses.',
        items: [
          'Identify the happy path — the case the function exists to handle',
          'Invert each outer condition so it describes a failure',
          'Return or raise immediately inside each inverted condition',
          'Remove the now-empty `else` branches',
          'Leave the happy path as the final, unindented statements',
        ],
        explanation:
          'The refactor is mechanical once the happy path is named: every enclosing condition becomes an inverted guard that exits early, and what remains at the bottom is the work the function actually does.',
      },
      {
        id: 'PY-010-q7',
        type: 'explain',
        concept: 'when to replace a chain',
        prompt: 'Explain when a long `if`/`elif` chain should become a dictionary lookup, and when it should stay a chain.',
        rubric: [
          'Identifies the mapping case: same variable compared to constants, producing a value',
          'Names a concrete benefit such as extensibility, an explicit default, or O(1) lookup',
          'Gives a case where the chain is the honest representation — ranges or compound conditions',
        ],
        sampleAnswer:
          'If every branch compares the same variable to a constant and the body just produces a value or calls one function, the chain is a lookup table written as control flow, and a dictionary says so directly: adding a case becomes adding an entry, the default is stated once in `.get(key, default)`, and the lookup is constant time instead of a sequence of comparisons. It also lets the mapping come from configuration rather than source code. The chain should stay a chain when the conditions are not equality tests — ranges such as `score > 90`, compound boolean conditions, or tests against several different variables — because encoding those as dictionary keys produces something less readable than the original. Python 3.10 adds a third option, `match`, for the case where you are branching on the structure of a value and want to destructure it in the same step.',
        explanation:
          'The examinable judgement is recognising that some conditionals encode data rather than logic, and that moving data out of control flow makes code both shorter and more extensible.',
      },
    ],

    flashcards: [
      { front: 'How many branches of an if/elif/else chain run?', back: 'At most one. Evaluation stops at the first true condition; everything below is skipped.' },
      { front: 'Why order conditions from specific to general?', back: 'A broader condition placed first claims the value and makes every narrower branch below it unreachable.' },
      { front: 'What is a guard clause?', back: 'An early return or raise that handles an exceptional case at the top, leaving the happy path flat and unindented.' },
      { front: 'What does `a if cond else b` give you?', back: 'A conditional *expression* — a value you can put anywhere, including inside a comprehension or an argument list.' },
      { front: 'When should an elif chain become a dict?', back: 'When every branch compares one variable to a constant and yields a value. Ranges and compound tests should stay a chain.' },
      { front: 'What happens when no branch matches and there is no else?', back: 'Nothing runs, silently. A function then returns `None`, which is why an explicit `else` that raises is often worth adding.' },
    ],

    challenge: {
      title: 'Refactor a triage function',
      brief:
        'You are given a `route_ticket(ticket)` function written as four levels of nested conditionals, with an `elif` chain whose branches overlap so that one is unreachable. Rewrite it so that: every precondition is a guard clause, the overlapping conditions are correctly ordered, unknown categories raise a `ValueError` naming the offending value, and the priority mapping is data rather than control flow. Then write a small loop that calls your function with one input per branch and prints the result, proving every branch is reachable.',
      language: 'python',
      acceptanceCriteria: [
        'No branch of the function is unreachable, demonstrated by the driver loop',
        'The function body never nests more than one level deep',
        'An unknown category raises `ValueError` with the value in the message',
        'The category-to-priority mapping is a dictionary, not a chain',
      ],
      starterCode:
        'PRIORITIES = {"outage": 1, "billing": 2, "question": 3}\n\ndef route_ticket(ticket):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who can write straight-line Python how conditionals work, why the order of conditions matters, and what a guard clause is.',
      mustCover: [
        'An if statement runs its indented block only when the condition is truthy',
        'Indentation is what defines the block, not a formatting choice',
        'In an if/elif chain only the first matching branch runs',
        'Ordering conditions wrongly can make a branch unreachable',
      ],
      bonusSignals: ['mentions guard clauses and flattening nesting', 'mentions that any value has a truth value', 'notes that a missing else means silent fall-through'],
      sampleExplanation:
        "A conditional is how a program decides. You write `if`, a question, a colon, and then the lines you want run — pushed in underneath. That indentation is not decoration: it is the only thing telling Python which lines belong to the `if`, which is why moving a line left or right changes what your program does. When there are several possibilities you chain them with `elif`, and here is the part worth burning into memory: Python reads the questions from the top, runs the first one that says yes, and then skips everything below it without even looking. That makes the order of your questions part of the logic. If you ask 'is the score above 50' before 'is the score above 90', then nobody is ever excellent, because a 95 answered yes to the first question and the chain stopped. Put the narrow question first. The other habit worth picking up early is the guard clause. Instead of wrapping the real work in three layers of `if` and pushing it far to the right, deal with each bad case at the top and leave immediately — no user, return; empty order, return — so that what is left at the bottom, at the lowest indentation, is the thing the function is actually for.",
    },
  },

  {
    id: 'PY-011',
    domain: 'PY',
    module: 'Control Flow',
    topic: 'Loops',
    title: 'Loops and Iteration',
    slug: 'loops-and-iteration',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['PY-010', 'PY-006'],
    related: ['PY-008', 'PY-009'],
    tags: ['for', 'while', 'range', 'enumerate', 'zip', 'break', 'continue'],

    learningObjectives: [
      'Write `for` loops over any iterable without manual index bookkeeping',
      'Choose between `for` and `while` based on whether the number of steps is known',
      'Use `enumerate` and `zip` instead of `range(len(...))`',
      'Control a loop with `break`, `continue` and the rarely-taught `else` clause',
      'Recognise and avoid accidental quadratic loops and infinite `while` loops',
    ],

    terminology: [
      {
        term: 'Iterable',
        definition:
          'Any object that can produce its items one at a time when asked — lists, strings, dicts, sets, files, ranges and generators all qualify.',
        simple: 'Anything you can walk through item by item.',
      },
      {
        term: 'for loop',
        definition:
          'A loop that asks an iterable for its next item until the iterable is exhausted. It never needs an explicit counter or bounds check.',
        simple: '"Do this once for each thing in here."',
      },
      {
        term: 'while loop',
        definition:
          'A loop that repeats as long as a condition stays true. The number of iterations is not known in advance, so something in the body must eventually change the condition.',
        simple: '"Keep doing this until something changes."',
      },
      {
        term: 'break / continue',
        definition:
          '`break` exits the innermost loop immediately; `continue` abandons the current iteration and moves to the next one.',
        simple: '"Stop entirely" and "skip this one".',
      },
      {
        term: 'enumerate',
        definition:
          'A built-in that wraps an iterable and yields `(index, item)` pairs, replacing the `range(len(xs))` idiom with something that works on any iterable.',
        simple: 'Walk through the items but also be told what number each one is.',
      },
      {
        term: 'zip',
        definition:
          'A built-in that walks several iterables in lockstep, yielding tuples of their aligned items and stopping at the shortest.',
        simple: 'Walk two lists side by side, taking one item from each at a time.',
      },
    ],

    simpleExplanation:
      "A loop repeats work. Python has two, and they answer different questions. A `for` loop says \"do this once for each item in this collection\" — you hand it a list, a string, a file, a dictionary, anything that can hand out items one at a time, and it walks through them for you. You never write a counter, never check a bound, and never go off the end, because the collection itself decides when it is finished. A `while` loop says \"keep doing this as long as something is true\", which is what you want when you genuinely do not know how many steps there will be: read until the user types quit, retry until the request succeeds. The price of a `while` loop is that something in the body must eventually make the condition false, or the program runs forever. Two built-ins remove almost all remaining bookkeeping: `enumerate` gives you the position alongside each item, and `zip` walks two collections side by side. Between them they eliminate the `range(len(...))` pattern that beginners reach for and experienced Python programmers almost never write.",

    whyItExists:
      'Data arrives in quantity, and writing the same statement once per item is neither possible nor maintainable when the count is unknown at authoring time. Loops let one piece of code apply to an arbitrary number of items, and Python\'s iterator protocol generalises that to anything that can produce values — including files and streams too large to fit in memory.',

    analogy: {
      scenario:
        "Imagine two ways of getting through a stack of forms. In the first, someone hands you the stack and you deal with each form until the stack is empty — you never need to know how many there were, and you cannot accidentally reach for a form that is not there. In the second, you keep processing forms until the office closes: you have no idea how many that will be, and if nobody ever closes the office you are there forever.",
      mapping: [
        { from: 'Working through the stack until it is empty', to: 'A `for` loop over an iterable' },
        { from: 'Never needing to count the forms first', to: 'No index arithmetic, so no off-by-one and no IndexError' },
        { from: 'Working until the office closes', to: 'A `while` loop with a condition' },
        { from: 'Nobody ever closing the office', to: 'An infinite loop, because nothing in the body changes the condition' },
        { from: 'Putting a form aside and moving on', to: '`continue`' },
        { from: 'Finding what you were looking for and stopping', to: '`break`' },
      ],
      bridge:
        'The distinction is exactly the one to apply when choosing a loop: if the collection knows how many items it has, use `for` and let it tell you when to stop. If the stopping condition depends on something that happens inside the loop — a user input, a network response, a numerical tolerance — use `while` and make sure the body can change that condition. Nearly every infinite loop in practice is a `while` whose body forgot to advance.',
      limitations:
        'The stack-of-forms picture suggests all items exist up front. Python iterables can be lazy — a generator or an open file produces items on demand and may be endless, which is why a `for` loop over `itertools.count()` never finishes either.',
    },

    visuals: [
      {
        kind: 'compare',
        title: '`for` versus `while`',
        caption: 'The question to ask is whether the collection knows when to stop.',
        left: {
          heading: '`for` — a known sequence of items',
          points: [
            'Iterates over an iterable until it is exhausted',
            'No counter, no bounds check, no off-by-one',
            'Cannot run forever unless the iterable is endless',
            'The default choice: use it unless you cannot',
          ],
        },
        right: {
          heading: '`while` — an unknown number of steps',
          points: [
            'Repeats while a condition stays true',
            'The body must eventually change the condition',
            'Right for retries, convergence, and reading until a sentinel',
            'The usual source of accidental infinite loops',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Loop idioms, and what they replace',
        caption: 'The left column is what beginners write; the middle is what reviewers expect.',
        columns: ['Instead of', 'Write', 'Why'],
        rows: [
          ['`for i in range(len(xs)): x = xs[i]`', '`for x in xs:`', 'You wanted the items, not the positions.'],
          ['`for i in range(len(xs)): ... i, xs[i]`', '`for i, x in enumerate(xs):`', 'Gives both without indexing, and works on any iterable.'],
          ['`for i in range(len(a)): a[i], b[i]`', '`for x, y in zip(a, b):`', 'Walks in lockstep and stops at the shorter one.'],
          ['`i = 0` / `while i < n:` / `i += 1`', '`for i in range(n):`', 'Removes three places to make a mistake.'],
          ['Manual count in a loop', '`sum(1 for x in xs if pred(x))`', 'Expresses the aggregate directly.'],
          ['`while True:` with a flag', '`while True:` with `break`', 'A flag variable usually just delays the exit by one iteration.'],
        ],
      },
      {
        kind: 'flow',
        title: 'What a `for` loop actually does',
        caption: 'This is the iterator protocol, which the generators unit builds on directly.',
        steps: [
          { label: 'Call `iter(obj)`', detail: 'Python asks the object for an iterator. A `TypeError: object is not iterable` happens here.' },
          { label: 'Call `next(iterator)`', detail: 'Retrieves the next item and binds it to the loop variable.' },
          { label: 'Run the body', detail: 'Unless `continue` skips the rest of it, or `break` exits the loop entirely.' },
          { label: 'Repeat until `StopIteration`', detail: 'The iterator signals exhaustion; the `for` loop catches this and ends normally.' },
          { label: 'Run the `else` clause', detail: 'Only if the loop finished without a `break`. Useful for search loops.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'The loop `else` clause',
        subject: 'for item in items:\n    if match(item):\n        break\nelse:\n    print("not found")',
        annotations: [
          { part: '`else`', note: 'Runs only when the loop completed without hitting `break`. Read it as "no break" rather than "otherwise".' },
          { part: 'The search pattern', note: 'It removes the `found = False` flag variable that otherwise clutters every search loop.' },
          { part: 'With `break`', note: 'If the loop exits early, the `else` block is skipped entirely.' },
          { part: 'Works on `while` too', note: '`while cond: ... else: ...` runs the `else` when the condition finally becomes false, not on `break`.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Watch iteration step by step',
        caption: 'Step through a loop and see the loop variable change on each pass.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'A `for` statement obtains an iterator from its iterable via `iter()`, binds each value yielded by `next()` to the target list, and terminates when `StopIteration` is raised. A `while` statement re-evaluates its condition for truthiness before each iteration. Both support `break`, which exits the innermost enclosing loop, `continue`, which begins the next iteration, and an `else` suite that executes only if the loop terminated without a `break`.',

    codeExamples: [
      {
        language: 'python',
        title: 'Iterating properly: enumerate and zip',
        runnable: true,
        code: `names = ["ada", "bob", "cal"]
scores = [92, 78, 85]

# What beginners write
for i in range(len(names)):
    print(i, names[i], scores[i])

print("---")

# What Python programmers write
for rank, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"{rank}. {name}: {score}")

print("---")

# zip stops at the shortest input
print(list(zip([1, 2, 3], ["a", "b"])))

# Dicts iterate keys; use .items() for pairs
config = {"lr": 0.01, "epochs": 30}
for key, value in config.items():
    print(key, "=", value)`,
        output: `0 ada 92
1 bob 78
2 cal 85
---
1. ada: 92
2. bob: 78
3. cal: 85
---
[(1, 'a'), (2, 'b')]
lr = 0.01
epochs = 30`,
        explanation:
          '`enumerate(..., start=1)` is how you get human-readable rankings without adding one everywhere. Combining it with `zip` needs the parenthesised inner target `(name, score)`, because `enumerate` yields a pair whose second element is itself a pair. The `zip` truncation on the third example is worth knowing: it is silent, so zipping a features list with a shorter labels list drops rows without complaint — pass `strict=True` in Python 3.10+ to turn that into a `ValueError`.',
      },
      {
        language: 'python',
        title: 'break, continue and the loop else',
        runnable: true,
        code: `records = [
    {"id": 1, "status": "ok"},
    {"id": 2, "status": "skip"},
    {"id": 3, "status": "target"},
    {"id": 4, "status": "ok"},
]

for r in records:
    if r["status"] == "skip":
        continue                  # abandon this iteration only
    if r["status"] == "target":
        print("found at id", r["id"])
        break                     # leave the loop entirely
    print("processing", r["id"])
else:
    print("target never found")   # skipped, because we broke out

# The same loop with no target present
for r in records[:2]:
    if r["status"] == "target":
        break
else:
    print("target never found")`,
        output: `processing 1
found at id 3
target never found`,
        explanation:
          '`continue` and `break` are about the current iteration and the whole loop respectively, and using them removes most reasons to nest an `else` inside a loop body. The `else` clause is the piece almost nobody is taught: it runs only if the loop finished without a `break`, which makes it exactly right for search loops and removes the `found = False` flag people otherwise write. Read `else` here as "no break" — the keyword choice is genuinely unfortunate.',
      },
      {
        language: 'python',
        title: 'while loops, and how they go wrong',
        runnable: true,
        code: `# Convergence: the number of steps is not known in advance
x = 100.0
steps = 0
while abs(x - 1.0) > 1e-9:
    x = (x + 1.0 / x) / 2      # Newton's method for sqrt(1)
    steps += 1
    if steps > 100:            # always bound an unbounded loop
        raise RuntimeError("did not converge")
print(f"converged to {x:.6f} in {steps} steps")

# Retry with a limit
attempts = 0
while True:
    attempts += 1
    ok = attempts == 3          # pretend the third try succeeds
    if ok:
        print("succeeded on attempt", attempts)
        break
    if attempts >= 5:
        print("giving up")
        break`,
        output: `converged to 1.000000 in 7 steps
succeeded on attempt 3`,
        explanation:
          'These are the two honest uses of `while`: iterate until a numerical tolerance is met, and retry until something succeeds. Both include a hard bound, and that is the habit to take away — an unbounded `while` in production code is a hang waiting to happen, and a counter with a `raise` turns an invisible freeze into a clear error message. The `while True:` with `break` form is idiomatic Python for loops whose exit condition is most naturally tested in the middle of the body rather than at the top.',
      },
      {
        language: 'python',
        title: 'The accidental quadratic loop',
        runnable: true,
        code: `known = list(range(20_000))
candidates = list(range(19_990, 20_010))

# Quadratic: each "in" scans the whole list
hits_slow = []
for c in candidates:
    if c in known:            # O(n) inside an O(m) loop
        hits_slow.append(c)

# Linear: hash the haystack once
known_set = set(known)
hits_fast = [c for c in candidates if c in known_set]

print(hits_slow == hits_fast, len(hits_fast))

# Another classic: building a string by concatenation
parts = [str(i) for i in range(5)]
joined = ",".join(parts)      # linear
print(joined)`,
        output: `True 10
0,1,2,3,4`,
        explanation:
          'Both versions produce identical results, and on twenty thousand items the difference is already visible; on a million it is the difference between a second and an hour. The pattern to recognise is any O(n) operation — list membership, list `index`, string concatenation, repeated `pop(0)` — sitting inside a loop that runs many times. The fix is nearly always to hoist the expensive structure out of the loop, as the `set` does here, or to accumulate into a list and combine once at the end.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Training loops',
        usage:
          '`for epoch in range(num_epochs): for batch in dataloader:` is the skeleton of every training script ever written, with `break` used for early stopping when validation loss stops improving.',
      },
      {
        context: 'Streaming a file too large for memory',
        usage:
          '`for line in open("huge.log"):` reads one line at a time rather than loading the file, because a file object is itself an iterator. This is the same protocol as a list, applied to something that does not fit in RAM.',
      },
      {
        context: 'Retrying a flaky API call',
        usage:
          'A `while attempts < max_attempts:` loop with exponential backoff is the standard shape for network code, and the bound is what stops a transient outage from hanging a pipeline overnight.',
      },
      {
        context: 'Pairing predictions with labels',
        usage:
          '`for pred, actual in zip(predictions, labels):` is how a confusion matrix gets built by hand, and `strict=True` guards against the silent truncation that hides a mismatched-length bug.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'Vectorised operations replace element-wise Python loops; `for` over an array is usually a sign the code should be rewritten.' },
      { tool: 'pandas', role: '`iterrows()` is a loop and is slow for the same reason; `apply`, `map` and vectorised column operations are the alternatives.' },
      { tool: 'PyTorch', role: 'The `DataLoader` is an iterable, which is why the training loop reads as plain Python despite doing batching and shuffling underneath.' },
      { tool: 'itertools', role: 'Provides `chain`, `islice`, `groupby` and `product` for loop patterns that would otherwise need nesting and bookkeeping.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing `for i in range(len(xs)):` and then only using `xs[i]`',
        why: 'It reintroduces index arithmetic that the `for` loop exists to remove, and it breaks on any iterable without a length, such as a generator or a file.',
        fix: 'Iterate the items directly with `for x in xs:`, or use `enumerate(xs)` when you genuinely need the position too.',
      },
      {
        mistake: 'Modifying a list while looping over it',
        why: 'The iterator advances by position, so removing an element shifts the next one into a slot the cursor has already passed, and it is silently skipped.',
        fix: 'Build a new list with a comprehension, iterate over a copy with `for x in xs.copy():`, or assign back with `xs[:] = [...]`.',
      },
      {
        mistake: 'A `while` loop whose body never changes the condition',
        why: 'The condition is re-evaluated each pass, so if nothing inside the body affects it, the loop runs forever and the process appears to hang with no error.',
        fix: 'Make the state change explicit and add a hard bound — a maximum iteration count that raises — for any loop whose termination depends on external data.',
      },
      {
        mistake: 'Doing an O(n) operation inside a loop',
        why: 'List membership, `list.index`, `pop(0)` and string `+=` are each linear, so putting one inside a loop makes the whole thing quadratic and it degrades sharply with data size.',
        fix: 'Hoist the structure out: convert the haystack to a set once, accumulate into a list and `join` at the end, or use `collections.deque` for front operations.',
      },
      {
        mistake: 'Ignoring that `zip` truncates silently',
        why: 'Zipping sequences of different lengths stops at the shorter one with no warning, so a mismatched features-and-labels pair quietly drops rows.',
        fix: 'Use `zip(a, b, strict=True)` on Python 3.10+, or assert the lengths match before the loop.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'When would you use a `while` loop rather than a `for` loop?',
        answer:
          'Use `for` whenever you are walking over a collection of items, because the iterable decides when to stop and you cannot go out of bounds. Use `while` when the number of iterations depends on something that happens inside the loop and is not known in advance — retrying a network call until it succeeds, iterating a numerical method until it converges within a tolerance, or reading input until a sentinel value arrives. The trade-off is that `while` puts termination in your hands, so every one should either provably change its own condition or carry a hard iteration bound that raises, otherwise an unexpected input turns into a silent hang.',
      },
      {
        level: 'intermediate',
        question: 'What does the `else` clause on a `for` loop do, and when is it useful?',
        answer:
          'It runs when the loop finishes normally — that is, when the iterable is exhausted — and is skipped entirely if the loop exits via `break`. The keyword is badly chosen; it should be read as "no break". Its real use is the search loop: you iterate looking for something, `break` when you find it, and put the not-found handling in the `else`. That removes the `found = False` flag variable that otherwise has to be set, checked and maintained, and it keeps the not-found case textually attached to the loop that searched. It works on `while` as well, where the `else` runs when the condition finally becomes false rather than when the loop is broken out of.',
        followUp:
          'A strong answer admits that many teams avoid it because it is not widely known, and that a helper function with an early return is an equally good alternative.',
      },
      {
        level: 'internship',
        question: 'A colleague\'s script is fine on 1,000 rows and takes hours on 500,000. Where do you look first?',
        answer:
          'I would look for an O(n) operation nested inside a loop, which turns linear work into quadratic work. The usual suspects are `if x in some_list`, `list.index`, `pop(0)` or `insert(0, ...)`, building a string with `+=`, and appending to a DataFrame or concatenating arrays inside the loop. Each is cheap once and ruinous when repeated. The fixes follow from the diagnosis: hoist a set out of the loop for membership tests, accumulate into a list and `join` or `pd.concat` once at the end, and use `collections.deque` when you need to work at the front. I would confirm rather than guess by timing with a fraction of the data — if halving the rows quarters the runtime, it is quadratic, and that ratio tells you more than a profiler screenshot.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Rewrite this without `range(len(...))`:\n\n```\nfor i in range(len(names)):\n    print(i + 1, names[i])\n```',
        hint: 'One built-in gives you both the position and the item, and it takes a `start` argument.',
        language: 'python',
        starterCode: 'names = ["ada", "bob", "cal"]\n',
        solution:
          '```\nfor rank, name in enumerate(names, start=1):\n    print(rank, name)\n```\n\n`enumerate` yields `(index, item)` pairs, and `start=1` shifts the numbering so you do not have to add one in the body. Beyond being shorter, this version works on any iterable — a generator or an open file has no `len()`, so the original would fail on either.',
      },
      {
        prompt:
          'Write a loop that finds the first record whose status is "error" and prints its id, printing "no errors" if there is none — without using a boolean flag variable.',
        hint: 'A loop can have an `else` clause that runs only when no `break` happened.',
        solution:
          '```\nfor r in records:\n    if r["status"] == "error":\n        print("first error at", r["id"])\n        break\nelse:\n    print("no errors")\n```\n\nThe `else` runs only if the loop ran to exhaustion, so reaching it means nothing matched. Without it you would need `found = False`, set it to True before the `break`, and test it afterwards — three extra lines and one more thing to forget. An equally idiomatic alternative is `next((r for r in records if r["status"] == "error"), None)`.',
      },
      {
        prompt:
          'This loop is quadratic. Identify why and fix it without changing the output.\n\n```\nresult = []\nfor x in candidates:\n    if x in known_list and x not in result:\n        result.append(x)\n```',
        hint: 'Two of the three operations here are linear scans.',
        solution:
          '```\nknown = set(known_list)\nseen = set()\nresult = []\nfor x in candidates:\n    if x in known and x not in seen:\n        seen.add(x)\n        result.append(x)\n```\n\nBoth `x in known_list` and `x not in result` were linear scans, so the loop cost was proportional to the candidates times the sizes of those two lists. Hashing the haystack once and keeping a parallel `seen` set makes both tests O(1), turning the whole loop linear while preserving the output list and its order exactly.',
      },
    ],

    quiz: [
      {
        id: 'PY-011-q1',
        type: 'code-output',
        language: 'python',
        concept: 'enumerate',
        prompt: 'What does this print?',
        code: 'for i, c in enumerate("ab", start=1):\n    print(i, c)',
        options: ['1 a\n2 b', '0 a\n1 b', '1 a\n1 b', 'a 1\nb 2'],
        answerIndex: 0,
        explanation:
          '`enumerate` yields `(index, item)` pairs and `start=1` makes the numbering begin at one. Strings are iterable, so the items here are individual characters.',
      },
      {
        id: 'PY-011-q2',
        type: 'code-output',
        language: 'python',
        concept: 'loop else with break',
        prompt: 'What does this print?',
        code: 'for x in [1, 2, 3]:\n    if x == 2:\n        break\nelse:\n    print("finished")\nprint("done")',
        options: ['done', 'finished\ndone', 'finished', 'done\nfinished'],
        answerIndex: 0,
        explanation:
          'The `else` clause of a loop runs only when the loop completes without a `break`. Since the loop broke at `x == 2`, the `else` is skipped and only the final line prints.',
      },
      {
        id: 'PY-011-q3',
        type: 'debug',
        language: 'python',
        concept: 'mutation while iterating',
        prompt: 'This is meant to remove all evens from `[1, 2, 2, 3]` but leaves a `2` behind. Why?',
        code: 'xs = [1, 2, 2, 3]\nfor x in xs:\n    if x % 2 == 0:\n        xs.remove(x)\nprint(xs)',
        options: [
          'Removing an element shifts the next one into a position the iterator has already passed',
          '`remove` deletes by index, not by value',
          'The modulo operator does not work on list elements',
          'The loop needs `continue` after the removal',
        ],
        answerIndex: 0,
        explanation:
          'The iterator advances by position while the list shrinks underneath it, so the second `2` slides into the slot just visited and is skipped. Build a new list with a comprehension, or iterate over `xs.copy()`.',
      },
      {
        id: 'PY-011-q4',
        type: 'mcq',
        concept: 'zip truncation',
        prompt: 'What is `list(zip([1, 2, 3], ["a", "b"]))`?',
        options: [
          '`[(1, "a"), (2, "b")]`',
          '`[(1, "a"), (2, "b"), (3, None)]`',
          'It raises a `ValueError` because the lengths differ',
          '`[(1, "a"), (2, "b"), (3, "")]`',
        ],
        answerIndex: 0,
        explanation:
          '`zip` stops at the shortest input and drops the extra item silently. Pass `strict=True` on Python 3.10+ to make a length mismatch raise `ValueError` instead.',
      },
      {
        id: 'PY-011-q5',
        type: 'multi',
        concept: 'choosing a loop',
        prompt: 'Which of these situations call for a `while` loop rather than a `for` loop? Select all that apply.',
        options: [
          'Retrying an HTTP request until it succeeds or five attempts have failed',
          'Printing every line of a file',
          'Iterating a numerical method until the change falls below a tolerance',
          'Applying the same transformation to every row of a list',
          'Reading user input until they type "quit"',
        ],
        answerIndices: [0, 2, 4],
        explanation:
          'A `while` loop is right when the number of iterations depends on something that happens inside the loop. Walking a file or a list is what `for` is for — the iterable knows when it is finished.',
      },
      {
        id: 'PY-011-q6',
        type: 'fill',
        concept: 'loop control',
        prompt: 'Which keyword abandons the current iteration and moves straight to the next one, without leaving the loop?',
        answers: ['continue', 'the continue statement', 'continue statement'],
        explanation:
          '`continue` skips the rest of the current iteration; `break` exits the loop entirely. Using `continue` for the uninteresting cases often removes a level of nesting from the body.',
      },
      {
        id: 'PY-011-q7',
        type: 'explain',
        concept: 'quadratic loops',
        prompt: 'Explain how a loop that looks linear can be quadratic, and how you would confirm the diagnosis without a profiler.',
        rubric: [
          'Identifies that an O(n) operation inside an O(n) loop multiplies',
          'Names at least two concrete culprits, such as list membership or string concatenation',
          'Describes the halving test: if halving the input quarters the time, the behaviour is quadratic',
        ],
        sampleAnswer:
          'The loop itself runs n times, but if each iteration performs an operation that is itself linear in the data — `x in some_list`, `list.index`, `pop(0)`, `out += piece` on a string, or concatenating a DataFrame — then the total work is n times m, which grows as a square. The code reads as a single loop, which is why it survives review. To confirm without tooling, run it on a fraction of the data and compare: halving the input should roughly halve a linear runtime, but quarter a quadratic one, and that ratio identifies the shape immediately. The fix is nearly always to hoist the expensive structure out of the loop — build a set once for membership, accumulate into a list and join or concat a single time at the end.',
        explanation:
          'This links loop mechanics to complexity, which is the bridge into the DSA domain and one of the most practically valuable diagnoses at this level.',
      },
    ],

    flashcards: [
      { front: '`for` or `while`?', back: '`for` when iterating a collection; `while` when the number of steps depends on something inside the loop.' },
      { front: 'What replaces `for i in range(len(xs))`?', back: '`for x in xs` if you want items, `for i, x in enumerate(xs)` if you also want positions.' },
      { front: 'What does `zip` do when the inputs differ in length?', back: 'Stops at the shortest, silently. Use `strict=True` (3.10+) to raise on a mismatch.' },
      { front: 'When does a loop `else` clause run?', back: 'Only when the loop finished without a `break`. Read it as "no break", not "otherwise".' },
      { front: '`break` versus `continue`', back: '`break` leaves the innermost loop entirely; `continue` abandons this iteration and starts the next.' },
      { front: 'How does an O(n) operation inside a loop behave?', back: 'It makes the loop quadratic. Hoist sets, joins and concatenations out of the loop body.' },
    ],

    challenge: {
      title: 'A log scanner with early exit',
      brief:
        'Given a list of log lines, write a script that: counts how many lines are at each level using a single pass; finds the first line at level FATAL and stops scanning immediately, reporting its position with `enumerate`; reports "no fatal errors" using a loop `else` clause rather than a flag variable; and pairs each line with its timestamp from a parallel list using `zip`, raising if the two lists have different lengths. No loop may contain a linear scan of another collection.',
      language: 'python',
      acceptanceCriteria: [
        'Level counting uses one pass and a dictionary or Counter, not a scan per level',
        'The FATAL search uses `break` and reports a 1-based position from `enumerate`',
        'The not-found case is handled by a loop `else`, with no boolean flag anywhere',
        'Mismatched list lengths raise rather than silently truncating',
      ],
      starterCode:
        'lines = [\n    "INFO starting",\n    "WARN low memory",\n    "FATAL out of memory",\n    "INFO shutting down",\n]\ntimes = ["12:00", "12:01", "12:02", "12:03"]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who can write conditionals how loops work, when to choose `for` over `while`, and why `range(len(...))` is a smell.',
      mustCover: [
        'A for loop walks an iterable, asking it for one item at a time',
        'A while loop repeats while a condition holds, so the body must change that condition',
        'enumerate and zip remove the need for manual index arithmetic',
        'break exits the loop and continue skips to the next iteration',
      ],
      bonusSignals: ['mentions the loop else clause', 'warns about mutating a list while iterating it', 'mentions accidental quadratic behaviour'],
      sampleExplanation:
        "A loop is how you say 'do this for each of these' without writing the line out once per item. Python's main loop is the `for` loop, and the thing to understand is that it does not count — it asks. You hand it a list, a string, a file, anything that can produce items one at a time, and it keeps asking for the next one until there are none left. Because the collection decides when to stop, you never write a counter, never check a bound, and never run off the end. That is why `for i in range(len(names))` is a smell: you have reintroduced the counting the loop was designed to remove. If you want the items, say `for name in names`. If you also want to know which number each one is, say `for i, name in enumerate(names)`. If you want to walk two lists side by side, say `for name, score in zip(names, scores)`. The other loop, `while`, is for when you genuinely do not know how many times you will go round — keep retrying until the request works, keep refining until the answer is accurate enough. It repeats as long as its condition is true, which means something inside the body has to eventually make that condition false. If nothing does, the program does not crash; it simply never finishes, which is why every `while` you write deserves a moment's thought about what makes it stop.",
    },
  },

  {
    id: 'PY-012',
    domain: 'PY',
    module: 'Functions',
    topic: 'Functions',
    title: 'Defining Functions',
    slug: 'defining-functions',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['PY-011'],
    related: ['PY-002', 'PY-010'],
    tags: ['def', 'return', 'parameters', 'docstring', 'pure-function', 'type-hints'],

    learningObjectives: [
      'Define a function with `def`, call it, and pass arguments to its parameters',
      'Distinguish returning a value from printing one, and explain why it matters',
      'Write a docstring and type hints that tell a reader what the function promises',
      'Decompose a long script into functions that each do one nameable thing',
      'Recognise a pure function and explain why pure functions are easier to test',
    ],

    terminology: [
      {
        term: 'Function',
        definition:
          'A named, reusable block of code that takes zero or more inputs and returns a value. Defined with `def`, invoked by writing its name followed by parentheses.',
        simple: 'A named recipe you can run whenever you like, with different ingredients each time.',
      },
      {
        term: 'Parameter vs argument',
        definition:
          'A parameter is the name in the function definition; an argument is the actual value supplied at the call site.',
        simple: 'The parameter is the labelled slot; the argument is what you drop into it.',
      },
      {
        term: 'return',
        definition:
          'Ends the function immediately and hands a value back to the caller. A function with no `return` returns `None`.',
        simple: 'Handing the answer back to whoever asked.',
      },
      {
        term: 'Docstring',
        definition:
          'A string literal as the first statement of a function, stored as `__doc__` and shown by `help()`. It states what the function does, not how.',
        simple: 'A note at the top saying what this thing is for.',
      },
      {
        term: 'Pure function',
        definition:
          'A function whose output depends only on its arguments and which changes nothing outside itself. Same inputs always give the same output.',
        simple: 'A recipe that only uses what you hand it and leaves the kitchen exactly as it found it.',
      },
      {
        term: 'Side effect',
        definition:
          'Any observable change beyond the return value: printing, writing a file, mutating an argument, or modifying a global.',
        simple: 'Anything the function does to the outside world besides answering.',
      },
    ],

    simpleExplanation:
      "A function is a piece of code you give a name to, so you can run it again without writing it again. You define it with `def`, list the inputs it needs in brackets, and indent the body underneath. When you want it to run, you write its name with brackets after it, and whatever you put inside those brackets gets handed to the names in the definition. The single most important thing to get right early is the difference between printing and returning. Printing puts characters on the screen, and that is all it does — the value is gone, and nothing else in your program can use it. Returning hands the value back to whoever called the function, so it can be stored, compared, passed somewhere else, or tested. A function that prints is a dead end; a function that returns is a building block. The reason to write functions at all is that a program made of named pieces can be understood one piece at a time, and each piece can be tested on its own.",

    whyItExists:
      'A program written as one long sequence of statements can only be understood by reading all of it, cannot be tested in parts, and repeats itself wherever the same work is needed twice. Functions let you name a piece of behaviour, verify it once, and then use it as a single idea — which is what makes programs larger than a page possible at all.',

    analogy: {
      scenario:
        "Think of a coffee machine in an office. It has a slot where you put a cup, a couple of buttons for the options, and a spout where the coffee comes out. Nobody standing at it needs to know about the boiler, the grinder or the water lines. To use it, you supply what it asks for and take what it gives back. If instead the machine simply sprayed coffee onto the floor and displayed 'done', you could still watch it work but you could never put the coffee in anything.",
      mapping: [
        { from: 'The name on the front of the machine', to: 'The function name — how you refer to the whole behaviour' },
        { from: 'The buttons and the cup slot', to: 'Parameters — what the function needs supplied' },
        { from: 'Coffee arriving in your cup', to: '`return` — a value handed back for the caller to use' },
        { from: 'Spraying onto the floor and saying "done"', to: '`print` — visible, but unusable by the rest of the program' },
        { from: 'Not needing to know about the boiler', to: 'Abstraction: the caller depends on the interface, not the implementation' },
      ],
      bridge:
        'The cup-versus-floor distinction is the whole print-versus-return lesson. A function that prints its result can be watched but not used: you cannot write `total = print_average(scores)` and get anything but `None`, because printing produces no value. A function that returns can be composed — stored in a variable, fed into another function, compared in a test. Write functions that return, and print at the outermost layer where you are deliberately talking to a human.',
      limitations:
        'A coffee machine always does the same thing with the same buttons. Python functions can read globals, mutate their arguments and depend on files or the clock, which is exactly what makes impure functions harder to test than the machine suggests.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a function definition',
        subject: 'def mean(values: list[float]) -> float:\n    """Return the arithmetic mean."""\n    return sum(values) / len(values)',
        annotations: [
          { part: '`def`', note: 'The keyword that creates a function object and binds it to the following name.' },
          { part: '`mean`', note: 'The name. Use a verb or a noun that says what you get back, not how it is computed.' },
          { part: '`values: list[float]`', note: 'A parameter with a type hint. Hints are not enforced at run time; they document and enable tooling.' },
          { part: '`-> float`', note: 'The return annotation. It tells a reader, and mypy, what the caller receives.' },
          { part: 'The docstring', note: 'First statement, in triple quotes. Says what, not how; `help(mean)` shows it.' },
          { part: '`return`', note: 'Ends the function and hands the value back. Without it the function returns `None`.' },
        ],
      },
      {
        kind: 'compare',
        title: 'print versus return',
        caption: 'The most consequential distinction in this unit.',
        left: {
          heading: '`print(result)`',
          points: [
            'Writes characters to stdout',
            'Produces no value — the expression evaluates to `None`',
            'Cannot be stored, compared or tested',
            'Belongs at the outermost layer, where you talk to a human',
          ],
        },
        right: {
          heading: '`return result`',
          points: [
            'Hands the value back to the caller',
            'Can be assigned, passed on, or asserted in a test',
            'Lets functions compose: `f(g(x))`',
            'Belongs in every function that computes something',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'What happens when you call a function',
        caption: 'Understanding this sequence explains both scope and the traceback you see when it fails.',
        steps: [
          { label: 'Evaluate the arguments', detail: 'Each expression at the call site is evaluated to an object, left to right.' },
          { label: 'Create a new local namespace', detail: 'A fresh frame is pushed onto the call stack; parameters are bound in it.' },
          { label: 'Run the body', detail: 'Names assigned here are local and invisible outside, unless declared `global` or `nonlocal`.' },
          { label: 'Hit `return`', detail: 'Evaluation stops immediately and the value is handed back. Reaching the end instead returns `None`.' },
          { label: 'Discard the frame', detail: 'Locals disappear. This is why a variable created inside a function cannot be read outside it.' },
        ],
      },
      {
        kind: 'table',
        title: 'Signs a function needs splitting',
        columns: ['Signal', 'What it usually means', 'The move'],
        rows: [
          ['The name contains "and"', 'It does two things', 'Split at the "and" — two functions, two names.'],
          ['You cannot write a one-line docstring', 'There is no single idea to state', 'Find the sub-steps and name each one.'],
          ['More than about 30 lines', 'Several levels of detail are mixed together', 'Extract the inner detail into helpers the outer function calls.'],
          ['Three or more levels of indentation', 'Control flow is carrying too much', 'Guard clauses, or extract the inner block into a function.'],
          ['You are scrolling to see the whole thing', 'It cannot be held in mind at once', 'Extract until each piece fits on a screen.'],
          ['A test needs elaborate setup', 'It depends on too much outside itself', 'Pass dependencies as arguments instead of reaching for globals.'],
        ],
      },
      {
        kind: 'widget',
        title: 'Write and run your own function',
        caption: 'Define a function, call it with different arguments and watch the returned value.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'A `def` statement creates a function object and binds it to a name in the enclosing namespace. Calling it evaluates the argument expressions, binds them to the parameters in a fresh local namespace pushed onto the call stack, and executes the body until a `return` statement or the end of the suite, at which point the frame is discarded and the returned value — `None` if none was given — becomes the value of the call expression.',

    codeExamples: [
      {
        language: 'python',
        title: 'Return, not print',
        runnable: true,
        code: `def mean_printed(values):
    print(sum(values) / len(values))

def mean(values):
    return sum(values) / len(values)

scores = [90, 80, 70]

result_a = mean_printed(scores)     # prints, then returns None
print("captured:", result_a)

result_b = mean(scores)             # returns the number
print("captured:", result_b)
print("usable:", round(result_b, 1), result_b > 75)`,
        output: `80.0
captured: None
captured: 80.0
usable: 80.0 True`,
        explanation:
          'Both functions compute the same number; only one of them gives it to you. `mean_printed` writes to the screen and then falls off the end, so the call expression evaluates to `None` and `result_a` is useless. `mean` hands the value back, so it can be rounded, compared, stored or asserted in a test. The rule to adopt now: compute and return in functions, and print only at the top level where you are deliberately producing output for a person.',
      },
      {
        language: 'python',
        title: 'Docstrings, type hints and a real signature',
        runnable: true,
        code: `def normalise(values: list[float]) -> list[float]:
    """Scale values to the range 0-1.

    Args:
        values: A non-empty list of numbers.

    Returns:
        A new list where the smallest value maps to 0.0 and the largest to 1.0.

    Raises:
        ValueError: If values is empty or every value is identical.
    """
    if not values:
        raise ValueError("values must not be empty")
    low, high = min(values), max(values)
    if low == high:
        raise ValueError("cannot normalise constant input")
    span = high - low
    return [(v - low) / span for v in values]

print(normalise([10, 20, 30]))
print(normalise.__doc__.splitlines()[0])

try:
    normalise([])
except ValueError as e:
    print("ValueError:", e)`,
        output: `[0.0, 0.5, 1.0]
Scale values to the range 0-1.
ValueError: values must not be empty`,
        explanation:
          'The type hints are not checked at run time — passing a string would not raise until the arithmetic failed — but they are read by your editor, by mypy, and by every human who opens the file, and they cost one line. The docstring states the contract: what it does, what it needs, what it gives back, and how it fails. Note that the function documents its exceptions and then actually raises them: a contract you do not enforce is a comment, and comments drift.',
      },
      {
        language: 'python',
        title: 'Decomposing a script into functions',
        runnable: true,
        code: `def parse_row(line: str) -> tuple[str, float]:
    """Split one CSV line into a cleaned (name, score) pair."""
    name, raw_score = line.split(",")
    return name.strip().title(), float(raw_score)

def passing(rows, threshold=60.0):
    """Return only the rows whose score meets the threshold."""
    return [(name, score) for name, score in rows if score >= threshold]

def report(rows) -> str:
    """Format rows as one line per entry."""
    return "\\n".join(f"{name:<8} {score:5.1f}" for name, score in rows)

lines = ["ada , 92.5", "bob,41", " cal ,78"]
rows = [parse_row(line) for line in lines]
print(report(passing(rows)))`,
        output: `Ada       92.5
Cal       78.0`,
        explanation:
          'Each function does one nameable thing and returns a value, which means each can be tested in isolation with two lines and no setup: `assert parse_row("ada , 92.5") == ("Ada", 92.5)`. Notice also that the composition on the final line reads as a sentence — report the passing rows — which is the real payoff of naming things well. Only the last line prints, and it does so at the outermost layer where a human is the intended audience.',
      },
      {
        language: 'python',
        title: 'Pure versus impure, and why tests care',
        runnable: true,
        code: `total = 0

def add_impure(x):
    global total          # reaches outside itself
    total += x
    return total

def add_pure(running, x):
    return running + x    # depends only on its arguments

print(add_impure(5), add_impure(5))   # same argument, different results
print(add_pure(0, 5), add_pure(0, 5)) # same argument, same result

# Mutating an argument is also a side effect
def append_bad(item, bucket):
    bucket.append(item)
    return bucket

def append_good(item, bucket):
    return [*bucket, item]

original = [1, 2]
append_bad(3, original)
print("after bad: ", original)
append_good(4, original)
print("after good:", original)`,
        output: `5 10
5 5
after bad:  [1, 2, 3]
after good: [1, 2, 3]`,
        explanation:
          'The first pair is the entire argument for purity in four lines: `add_impure(5)` returns different answers on successive calls because it carries hidden state, so a test asserting the result must first know the history of every previous call. `add_pure` can be tested with one line. The second pair shows the subtler form: `append_bad` mutates the caller\'s list, which is a side effect even though nothing global is declared. Impure functions are not wrong — writing files and updating state is the point of many programs — but keep the impurity at the edges and the computation in the middle.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A feature engineering module',
        usage:
          'Each transformation — `add_ratio_features(df)`, `bucket_ages(df)` — is a function taking a DataFrame and returning a new one. Because each returns rather than mutates, the pipeline can be reordered and each step tested alone.',
      },
      {
        context: 'The scikit-learn API',
        usage:
          'Every estimator exposes `fit`, `predict` and `score` with consistent signatures, which is why any model can be dropped into a cross-validation loop written against those names alone.',
      },
      {
        context: 'Unit tests',
        usage:
          'A test is `assert my_function(known_input) == expected_output`. That line is only possible if the function returns a value; a function that prints can only be tested with output capture, which is fragile and slow.',
      },
      {
        context: 'Evaluation metrics',
        usage:
          '`accuracy(y_true, y_pred)` is pure: same inputs, same number, no state. That is precisely why metric functions are the easiest part of a machine learning codebase to trust.',
      },
    ],

    projectConnections: [
      { tool: 'pytest', role: 'Test functions call your functions and assert on returned values, which is why returning rather than printing is a testability decision.' },
      { tool: 'mypy', role: 'Reads type hints to catch argument mismatches before the code runs; hints are documentation that a machine can check.' },
      { tool: 'scikit-learn', role: 'Its consistent `fit`/`transform` function signatures are what make pipelines composable across unrelated estimators.' },
      { tool: 'FastAPI', role: 'Turns an annotated Python function into a validated HTTP endpoint, using the type hints to generate the schema.' },
    ],

    commonMistakes: [
      {
        mistake: 'Printing instead of returning',
        why: 'The value is written to the screen and then discarded, so the call evaluates to `None` and nothing downstream can use or test the result.',
        fix: 'Return the value. Print at the call site if a human needs to see it: `print(mean(scores))`.',
      },
      {
        mistake: 'Forgetting that a function without `return` gives `None`',
        why: 'A branch that falls off the end returns `None` silently, so the failure appears later as `TypeError: unsupported operand type(s) for +: NoneType and int`.',
        fix: 'Make every path return explicitly, and add an `else` that raises when a value is genuinely unexpected.',
      },
      {
        mistake: 'Defining the function but never calling it',
        why: '`def` only creates the function object; nothing runs until a call. A script that defines everything and calls nothing produces no output and no error.',
        fix: 'Call it. In a script, put the top-level calls under `if __name__ == "__main__":` so the file can also be imported without running.',
      },
      {
        mistake: 'A function that quietly mutates its arguments',
        why: 'The caller passes a list, gets a return value, and does not realise their original list also changed — a bug that appears far from its cause.',
        fix: 'Return a new object, or make the mutation the obvious purpose and say so in the name and docstring: `sort_in_place(xs)`.',
      },
      {
        mistake: 'Reaching for globals instead of parameters',
        why: 'The function can no longer be understood or tested in isolation, because its behaviour depends on state defined elsewhere and changed at unknown times.',
        fix: 'Pass what the function needs as arguments. If the list of arguments grows uncomfortable, that usually means a class or a config object is waiting to be extracted.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between `print` and `return`?',
        answer:
          '`print` writes characters to standard output for a human to read and produces no value — the expression itself evaluates to `None`. `return` ends the function and hands a value back to the caller, where it can be assigned, compared, passed to another function or asserted in a test. The practical consequence is that a function which prints cannot be composed or unit tested without capturing stdout, while a function that returns can be verified with a single `assert`. The convention that follows is to compute and return in the inner layers and to print only at the boundary where you are deliberately producing human-facing output.',
      },
      {
        level: 'intermediate',
        question: 'What makes a function pure, and why do people care?',
        answer:
          'A pure function\'s return value depends only on its arguments, and it changes nothing observable outside itself — no globals, no mutated arguments, no files, no clock, no randomness without a passed-in seed. People care because purity makes a function comprehensible in isolation: you can read it without knowing the program\'s history, test it with one line and no fixtures, cache its results safely, and run it in parallel without coordination. Real programs cannot be entirely pure — they have to write files and update databases — so the discipline is to concentrate side effects at the edges and keep the computational core pure, which is what makes the interesting logic the easy part to test.',
        followUp:
          'A strong answer notes that `functools.lru_cache` is only safe on pure functions, which makes purity a concrete capability rather than a stylistic preference.',
      },
      {
        level: 'internship',
        question: 'How do you decide when a piece of code should become its own function?',
        answer:
          'The test I use is whether I can give it a short, honest name. If a block has a name, it is an idea and deserves to be a function; if the only honest name contains "and", it is two ideas and should be two functions. Beyond that, the practical triggers are duplication — the second time I write something similar, it becomes a function — a comment that describes the next five lines, which is a function name waiting to be used, a block nested three levels deep, and anything I want to test on its own. The counter-pressure matters too: splitting into functions so small that following the logic means jumping between eight definitions makes code harder to read, so the target is that each function fits on a screen and its name makes the caller readable without opening it.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a function `celsius_to_fahrenheit(c)` that returns the converted value, with a docstring and type hints. Then show a call whose result is stored and compared.',
        hint: 'The formula is c times 9/5 plus 32. Return it; do not print it.',
        language: 'python',
        starterCode: 'def celsius_to_fahrenheit(c):\n    ...\n',
        solution:
          '```\ndef celsius_to_fahrenheit(c: float) -> float:\n    """Return the temperature in degrees Fahrenheit."""\n    return c * 9 / 5 + 32\n\nf = celsius_to_fahrenheit(100)\nprint(f, f > 200)   # 212.0 True\n```\n\nBecause it returns, the result can be stored in `f`, compared, and asserted in a test — `assert celsius_to_fahrenheit(0) == 32`. Had it printed instead, the only way to test it would be to capture standard output, which is slower and far more brittle.',
      },
      {
        prompt:
          'This function sometimes returns `None` unexpectedly. Find out why and fix it.\n\n```\ndef classify(score):\n    if score > 90:\n        return "high"\n    elif score > 50:\n        return "medium"\n```',
        hint: 'What does a function return when execution reaches the end of its body?',
        solution:
          'A score of 30 matches no branch, so execution falls off the end and Python returns `None`. The caller then gets a value that fails much later, typically with `TypeError: argument of type NoneType is not iterable`.\n\n```\ndef classify(score: float) -> str:\n    if score > 90:\n        return "high"\n    if score > 50:\n        return "medium"\n    return "low"\n```\n\nMaking every path return explicitly is the fix. Where no sensible default exists, `raise ValueError(f"unclassifiable score: {score}")` is better than returning `None`, because it fails at the cause rather than three functions later.',
      },
      {
        prompt:
          'Split this into at least two functions, each with a name and a single responsibility, and make the final line the only place that prints.\n\n```\nlines = ["ada,92", "bob,41"]\nfor line in lines:\n    name, s = line.split(",")\n    if float(s) >= 60:\n        print(name.title(), float(s))\n```',
        hint: 'One function turns a line into data; another decides what to keep.',
        solution:
          '```\ndef parse(line: str) -> tuple[str, float]:\n    """Turn one CSV line into a (name, score) pair."""\n    name, raw = line.split(",")\n    return name.strip().title(), float(raw)\n\ndef passing(rows, threshold: float = 60.0):\n    """Keep only rows at or above the threshold."""\n    return [row for row in rows if row[1] >= threshold]\n\nrows = [parse(line) for line in lines]\nfor name, score in passing(rows):\n    print(name, score)\n```\n\nEach function now has a one-line docstring that is actually true, which is the sign the split was along the right seam. `parse` can be tested against a single string, and `passing` against a list of tuples, neither of which requires a file or captured output.',
      },
    ],

    quiz: [
      {
        id: 'PY-012-q1',
        type: 'code-output',
        language: 'python',
        concept: 'print versus return',
        prompt: 'What does this print?',
        code: 'def f(x):\n    print(x * 2)\n\nresult = f(3)\nprint(result)',
        options: ['6\nNone', '6\n6', 'None\n6', '6'],
        answerIndex: 0,
        explanation:
          'The function prints `6` and then ends without a `return`, so the call evaluates to `None` and the second `print` shows that. Printing produces output, not a value.',
      },
      {
        id: 'PY-012-q2',
        type: 'truefalse',
        concept: 'implicit None',
        prompt: 'A function that reaches the end of its body without executing a `return` statement returns `None`.',
        answer: true,
        explanation:
          'Every Python function returns something. With no explicit `return`, that something is `None`, which is why a chain with an unmatched branch produces a confusing `NoneType` error further downstream.',
      },
      {
        id: 'PY-012-q3',
        type: 'debug',
        language: 'python',
        concept: 'defining versus calling',
        prompt: 'This script produces no output and no error. Why?',
        code: 'def greet(name):\n    print(f"hello {name}")\n\ngreet',
        options: [
          'The last line refers to the function without calling it — it needs parentheses and an argument',
          '`print` cannot be used inside an f-string context',
          'The function must be defined after it is used',
          '`def` requires a `return` statement to execute',
        ],
        answerIndex: 0,
        explanation:
          'Writing the bare name evaluates to the function object and discards it. A call needs parentheses: `greet("ada")`. This is the same distinction as `print` versus `print()`.',
      },
      {
        id: 'PY-012-q4',
        type: 'mcq',
        concept: 'purity',
        prompt: 'Which of these functions is pure?',
        options: [
          '`def add(a, b): return a + b`',
          '`def add(a): global total; total += a; return total`',
          '`def add(a, xs): xs.append(a); return xs`',
          '`def add(a): return a + time.time()`',
        ],
        answerIndex: 0,
        explanation:
          'Only the first depends solely on its arguments and changes nothing outside itself. The second mutates a global, the third mutates a caller\'s list, and the fourth depends on the clock, so none of them return the same value for the same inputs.',
      },
      {
        id: 'PY-012-q5',
        type: 'multi',
        concept: 'when to extract a function',
        prompt: 'Which of these are good reasons to extract a block of code into its own function? Select all that apply.',
        options: [
          'You have written a comment describing what the next five lines do',
          'The same logic appears in two places',
          'You want to test that logic on its own',
          'The file is under 100 lines',
          'The block is nested three levels deep',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'A comment naming a block is a function name waiting to be used, duplication and testability are the classic triggers, and deep nesting usually means an inner block wants to be its own named idea. File length alone says nothing.',
      },
      {
        id: 'PY-012-q6',
        type: 'fill',
        concept: 'docstrings',
        prompt: 'What is the name for the string literal placed as the first statement inside a function, which `help()` displays?',
        answers: ['docstring', 'doc string', 'documentation string', 'a docstring'],
        explanation:
          'A docstring is stored as the function\'s `__doc__` attribute and read by `help()`, editors and documentation tools. It states what the function promises, not how it is implemented.',
      },
      {
        id: 'PY-012-q7',
        type: 'explain',
        concept: 'functions as design',
        prompt: 'Explain why "return a value" is a design decision about testability, not just a style preference.',
        rubric: [
          'States that a returned value can be asserted on directly',
          'States that a printed value requires capturing stdout, which is fragile',
          'Connects this to composability — returned values can be passed to other functions',
        ],
        sampleAnswer:
          'A test is fundamentally the line `assert f(known_input) == expected`, and that line only exists if `f` gives something back. If the function prints instead, the test has to redirect and capture standard output, parse text, and cope with formatting changes that have nothing to do with correctness — so the test becomes slower, more brittle, and coupled to presentation. Returning also makes composition possible: `report(passing(parse_all(lines)))` reads as a sentence and each stage can be replaced independently, which is impossible when the middle stage writes to the screen. The practical rule is that printing is a form of output for humans and belongs at the program\'s boundary, while everything inside should hand values back.',
        explanation:
          'The examinable idea is that returning values is what makes code both testable and composable — two properties that drive most function-level design decisions.',
      },
    ],

    flashcards: [
      { front: 'print versus return', back: 'print writes to the screen and yields `None`; return hands a value back so it can be stored, composed or tested.' },
      { front: 'What does a function return with no `return` statement?', back: '`None`. That is why an unmatched branch causes a `NoneType` error somewhere downstream.' },
      { front: 'Parameter versus argument', back: 'The parameter is the name in the definition; the argument is the value supplied at the call site.' },
      { front: 'What is a pure function?', back: 'Its output depends only on its arguments and it changes nothing outside itself. Same inputs, same output, always.' },
      { front: 'What goes in a docstring?', back: 'What the function does, what it needs, what it returns and how it fails — not how it is implemented.' },
      { front: 'Are Python type hints enforced at run time?', back: 'No. They document intent and are checked by tools such as mypy and used by frameworks such as FastAPI.' },
    ],

    challenge: {
      title: 'Refactor a script into a testable module',
      brief:
        'Take a single 40-line script that reads a list of CSV-style strings, cleans them, filters by a threshold, computes summary statistics and prints a report. Rewrite it as four functions — parse, filter, summarise and format — each with a docstring, type hints and a single responsibility, returning values rather than printing. The only `print` must be in a `main()` function guarded by `if __name__ == "__main__":`. Then write three assertions proving each pure function behaves correctly on a hand-made input.',
      language: 'python',
      acceptanceCriteria: [
        'Exactly one function prints, and it is only invoked from the main guard',
        'Every other function returns a value and mutates none of its arguments',
        'Each function has type hints and a docstring whose first line is a single sentence',
        'Three assertions pass, each testing one function with a literal input and expected output',
      ],
      starterCode:
        'def parse(line: str) -> tuple[str, float]:\n    """Turn one CSV line into a (name, score) pair."""\n    ...\n\n\ndef main() -> None:\n    ...\n\n\nif __name__ == "__main__":\n    main()\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who can write loops and conditionals what a function is, and explain the difference between printing a result and returning one.',
      mustCover: [
        'A function is named, reusable code defined with def and run by calling it',
        'Parameters are the names in the definition; arguments are the values passed in',
        'return hands a value back to the caller; print only writes to the screen',
        'A function with no return gives back None',
      ],
      bonusSignals: ['mentions testability as the reason to return', 'mentions docstrings or type hints', 'gives a rule for when to split a function'],
      sampleExplanation:
        "A function is a chunk of code with a name on it. You write `def mean(values):` and indent the body underneath, and from then on you can run that whole body just by writing `mean(scores)`. The names in the brackets of the definition are slots, and whatever you put in the brackets when you call it gets dropped into those slots. The part worth being careful about is what the function does with its answer. If it ends with `print(total)`, the number appears on the screen and then it is gone — the function itself hands back nothing, so if you write `average = mean(scores)` you get `None` and everything downstream breaks in a confusing way. If it ends with `return total`, the number is handed back to whoever called it, and now you can store it, compare it, feed it into another function, or write a test that says `assert mean([1, 2, 3]) == 2`. That is the real reason this distinction matters: a function that returns can be checked and built on, while a function that prints can only be watched. So the habit to build is to compute and return everywhere inside your program, and to print only at the very outside, where you have decided a human should see something.",
    },
  },

  {
    id: 'PY-013',
    domain: 'PY',
    module: 'Functions',
    topic: 'Arguments and scope',
    title: 'Arguments, Defaults and Scope',
    slug: 'arguments-defaults-and-scope',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['PY-012'],
    related: ['PY-002', 'PY-006', 'PY-008'],
    tags: ['args', 'kwargs', 'defaults', 'scope', 'legb', 'mutable-default'],

    learningObjectives: [
      'Pass arguments positionally and by keyword, and explain when each is clearer',
      'Give parameters default values and order them legally in a signature',
      'Collect extra arguments with `*args` and `**kwargs`, and unpack them at a call site',
      'Apply the LEGB rule to work out which variable a name refers to',
      'Explain the mutable default argument trap and fix it correctly',
    ],

    terminology: [
      {
        term: 'Positional argument',
        definition:
          'An argument matched to a parameter by its position in the call. `f(1, 2)` binds 1 to the first parameter and 2 to the second.',
        simple: 'A value matched up by the order you wrote it in.',
      },
      {
        term: 'Keyword argument',
        definition:
          'An argument matched by name: `f(rate=0.1)`. Order becomes irrelevant, and the call documents itself.',
        simple: 'A value with a label on it, so the order does not matter.',
      },
      {
        term: '*args / **kwargs',
        definition:
          '`*args` collects surplus positional arguments into a tuple; `**kwargs` collects surplus keyword arguments into a dictionary. The star is what matters, not the names.',
        simple: '"Anything else positional goes in this bag; anything else named goes in that one."',
      },
      {
        term: 'LEGB',
        definition:
          'The order in which Python resolves a name: Local, then Enclosing function, then Global (module), then Built-in.',
        simple: 'Where Python looks for a name, starting closest and working outwards.',
      },
      {
        term: 'Mutable default',
        definition:
          'A default argument value that can be changed in place. It is evaluated once at definition time and shared by every call, which almost always causes a bug.',
        simple: 'A default that secretly remembers what previous calls did to it.',
      },
      {
        term: 'Keyword-only parameter',
        definition:
          'A parameter after a bare `*` in the signature, which callers must pass by name. Used to stop boolean and configuration flags being passed positionally.',
        simple: 'A setting you are required to name when you pass it.',
      },
    ],

    simpleExplanation:
      "Once a function takes more than one or two inputs, how those inputs are supplied starts to matter. You can pass them in order, which is fine for one or two obvious values, or by name — `train(epochs=30)` — which makes a call readable without opening the definition. You can give parameters defaults so callers only mention what they want to change. And you can let a function accept any number of extras with `*args` and `**kwargs`, which is how wrappers pass arguments through to something else without knowing what they are. Alongside this sits scope: the rule Python uses to decide which variable a name refers to. It looks in the function first, then in any function surrounding it, then at module level, then among the built-ins, and it uses the first match. One trap deserves naming up front, because it catches everyone once: a default value is created a single time, when the function is defined, not fresh on each call. If that default is a list or a dictionary, every call shares the same one, and it accumulates.",

    whyItExists:
      'Real functions have a handful of essential inputs and a long tail of options that almost always take the same value. Defaults and keyword arguments let a signature express that difference, so common calls stay short while unusual ones remain possible, and scoping rules make it unambiguous which of several same-named variables a piece of code is talking about.',

    analogy: {
      scenario:
        "Think about ordering coffee. 'A large oat latte' relies on a fixed order everyone in the shop knows — size, milk, drink — and it works right up until the day you want to change only the temperature, at which point you have to say 'extra hot' by name. Most of the menu has defaults you never mention: a standard cup, a standard number of shots, no syrup. And the barista will accept any number of extra named instructions and pass them straight to the person making the drink, without needing to understand each one.",
      mapping: [
        { from: 'Saying the size, milk and drink in the expected order', to: 'Positional arguments' },
        { from: 'Saying "extra hot" by name', to: 'A keyword argument' },
        { from: 'The standard cup you never mention', to: 'A default parameter value' },
        { from: 'Passing along extra named instructions untouched', to: '`**kwargs` forwarded to an inner function' },
        { from: 'A shared jug that stays on the counter between customers', to: 'A mutable default, created once and reused by every call' },
      ],
      bridge:
        'The shared jug is the analogy that matters. A default value is evaluated once, when the `def` line runs, and stored on the function object — so `def f(items=[])` creates exactly one list that every call without an argument sees, complete with everything previous calls put in it. The fix is to default to `None` and create a fresh list inside the body, which is the equivalent of fetching a clean jug for each customer.',
      limitations:
        'Baristas apply judgement to contradictory orders. Python does not: it matches arguments to parameters by a strict set of rules and raises `TypeError` the moment the call does not fit, which is why the error messages here are unusually precise and worth reading.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'The full parameter grammar',
        subject: 'def f(pos_only, /, normal, *args, kw_only, **kwargs):',
        annotations: [
          { part: '`pos_only, /`', note: 'Everything before the slash can only be passed positionally. Used to keep parameter names free to change.' },
          { part: '`normal`', note: 'Can be passed either positionally or by keyword. Most parameters live here.' },
          { part: '`*args`', note: 'Collects surplus positional arguments into a tuple. A bare `*` instead means "no more positionals allowed".' },
          { part: '`kw_only`', note: 'After `*args` or a bare `*`, a parameter can only be passed by name. Ideal for flags and options.' },
          { part: '`**kwargs`', note: 'Collects surplus keyword arguments into a dict. Must come last.' },
        ],
      },
      {
        kind: 'flow',
        title: 'LEGB: how Python resolves a name',
        caption: 'The first match wins, and the search stops there.',
        steps: [
          { label: 'Local', detail: 'Names assigned anywhere in the current function body — including after the point of use.' },
          { label: 'Enclosing', detail: 'Locals of any function that lexically encloses this one. This is what closures capture.' },
          { label: 'Global', detail: 'Names at module level, including imports and module constants.' },
          { label: 'Built-in', detail: '`len`, `print`, `sum` and friends. Shadowing one here is how `list = [1]` breaks `list(...)`.' },
          { label: 'Not found', detail: 'Raises `NameError`, or `UnboundLocalError` if the name is local but used before assignment.' },
        ],
      },
      {
        kind: 'compare',
        title: 'The mutable default trap',
        caption: 'The same function, written twice. One of them accumulates across calls.',
        left: {
          heading: 'Broken — `def add(x, bucket=[])`',
          points: [
            'The list is created once, when `def` executes',
            'Stored on the function object as `add.__defaults__`',
            'Every default call shares and mutates that one list',
            'Results depend on call history, so tests pass alone and fail together',
          ],
        },
        right: {
          heading: 'Correct — `def add(x, bucket=None)`',
          points: [
            '`None` is immutable and cannot accumulate',
            '`if bucket is None: bucket = []` runs on every call',
            'Each default call gets a fresh list',
            'The signature still documents that the parameter is optional',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Argument passing, and the errors you will see',
        columns: ['Call', 'Meaning', 'Common error'],
        rows: [
          ['`f(1, 2)`', 'Both positional', '`TypeError: takes 2 positional arguments but 3 were given`'],
          ['`f(1, b=2)`', 'One positional, one keyword', '`TypeError: got multiple values for argument "b"`'],
          ['`f(**config)`', 'Unpack a dict into keyword arguments', '`TypeError: got an unexpected keyword argument "lr"`'],
          ['`f(*values)`', 'Unpack a sequence into positional arguments', '`TypeError: missing 1 required positional argument`'],
          ['`def f(a=1, b)`', 'Illegal signature', '`SyntaxError: non-default argument follows default argument`'],
          ['`f(1, flag=True)`', 'Keyword-only flag', 'Prevents the unreadable `f(1, True, False, True)`'],
        ],
      },
    ],

    formalDefinition:
      'At call time Python binds arguments to parameters by position, then by keyword, then fills unbound parameters from their defaults, raising `TypeError` if any parameter remains unbound or any argument is unmatched. Default expressions are evaluated once, at function-definition time, and stored on the function object. Name resolution inside the body follows the LEGB chain, and a name assigned anywhere in the body is local throughout it unless declared `global` or `nonlocal`.',

    codeExamples: [
      {
        language: 'python',
        title: 'Positional, keyword and default arguments',
        runnable: true,
        code: `def train(model, epochs=10, lr=0.01, verbose=False):
    return f"{model}: {epochs} epochs at lr={lr}, verbose={verbose}"

print(train("resnet"))                          # all defaults
print(train("vit", 30))                         # positional
print(train("vit", lr=0.001))                   # skip a middle parameter
print(train(model="mlp", epochs=5, lr=0.1))     # fully keyword

# Unpacking a dict into keyword arguments
config = {"epochs": 50, "lr": 0.003, "verbose": True}
print(train("bert", **config))

# Defaults must follow non-defaults
try:
    exec("def bad(a=1, b): pass")
except SyntaxError as e:
    print("SyntaxError:", e.msg)`,
        output: `resnet: 10 epochs at lr=0.01, verbose=False
vit: 30 epochs at lr=0.01, verbose=False
vit: 10 epochs at lr=0.001, verbose=False
mlp: 5 epochs at lr=0.1, verbose=False
bert: 50 epochs at lr=0.003, verbose=True
SyntaxError: non-default argument follows default argument`,
        explanation:
          'The third call is the reason keyword arguments exist: you want to change `lr` without repeating the default for `epochs`, and naming it makes that possible and readable. The `**config` line is how configuration files reach functions in real projects — the dictionary keys must match parameter names exactly, and an unexpected key raises `TypeError` rather than being ignored, which is a feature. The final error is a language rule with an obvious reason: if a defaulted parameter came first, there would be no way to supply the later one positionally.',
      },
      {
        language: 'python',
        title: 'The mutable default trap, demonstrated',
        runnable: true,
        code: `def collect_bad(item, bucket=[]):
    bucket.append(item)
    return bucket

print(collect_bad("a"))
print(collect_bad("b"))      # the list remembers the previous call
print(collect_bad("c"))
print("stored default:", collect_bad.__defaults__)

def collect_good(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket

print(collect_good("a"))
print(collect_good("b"))
print(collect_good("c", ["existing"]))`,
        output: `['a']
['a', 'b']
['a', 'b', 'c']
stored default: (['a', 'b', 'c'],)
['a']
['b']
['existing', 'c']`,
        explanation:
          'The `__defaults__` line is what makes this stick: the default list is an attribute of the function object, created once when `def` ran, and you can watch it grow. Every call that omits the argument gets that same object. The `None` sentinel is the standard fix — `None` is immutable, so it cannot accumulate, and the `if` inside the body runs on every call, producing a fresh list. The pattern also keeps the signature honest, since the default still communicates "this parameter is optional".',
      },
      {
        language: 'python',
        title: '*args, **kwargs and keyword-only parameters',
        runnable: true,
        code: `def summarise(label, *values, unit="ms", precision=2):
    avg = sum(values) / len(values) if values else 0
    return f"{label}: {avg:.{precision}f}{unit} over {len(values)} runs"

print(summarise("latency", 12.1, 13.4, 11.8))
print(summarise("latency", 12.1, 13.4, unit="s", precision=3))

timings = [9.5, 10.5, 11.0]
print(summarise("batch", *timings))        # unpack a list positionally

# A wrapper that forwards everything it is given
def logged(fn, *args, **kwargs):
    print(f"calling {fn.__name__} with {args} {kwargs}")
    return fn(*args, **kwargs)

print(logged(summarise, "gpu", 1.0, 2.0, unit="s"))`,
        output: `latency: 12.43ms over 3 runs
latency: 12.750s over 2 runs
batch: 10.33ms over 3 runs
calling summarise with ('gpu', 1.0, 2.0) {'unit': 's'}
gpu: 1.50s over 2 runs`,
        explanation:
          'Because `*values` swallows every remaining positional argument, `unit` and `precision` become keyword-only automatically — there is no way to reach them positionally, which is exactly what you want for options. The star does double duty: in a definition it collects, and at a call site it unpacks, which is why `summarise("batch", *timings)` spreads the list into separate arguments. The `logged` wrapper is the canonical `*args, **kwargs` use: it forwards everything untouched without needing to know the signature of what it wraps, which is precisely the mechanism behind decorators.',
      },
      {
        language: 'python',
        title: 'Scope: LEGB, global and nonlocal',
        runnable: true,
        code: `count = 0            # global

def read_only():
    return count     # found via the G in LEGB

def shadowed():
    count = 99       # a NEW local; the global is untouched
    return count

def rebind_global():
    global count
    count += 1
    return count

def outer():
    total = 0
    def inner():
        nonlocal total    # the E in LEGB
        total += 5
        return total
    inner(); inner()
    return total

print(read_only(), shadowed(), count)
print(rebind_global(), count)
print(outer())

def broken():
    print(count)     # Python already decided count is local here
    count = 1
try:
    broken()
except UnboundLocalError as e:
    print("UnboundLocalError:", e)`,
        output: `0 99 0
1 1
10
UnboundLocalError: cannot access local variable 'count' where it is not associated with a value`,
        explanation:
          '`shadowed` is the important one: assigning to a name anywhere in a function makes it local *throughout* the function, so the global is neither read nor changed. `broken` shows the consequence — the `print` on the first line fails, because Python decided at compile time that `count` was local and it has not been assigned yet. `global` and `nonlocal` opt out of that rule, but both are worth avoiding in favour of passing values in and returning them out; `nonlocal` earns its place mainly inside closures and decorators, which the later units cover.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Library APIs with many options',
        usage:
          '`pd.read_csv(path, sep=",", header=0, na_values=None, ...)` has dozens of parameters with sensible defaults. Almost every real call supplies one or two by name, which is exactly the design that defaults plus keyword arguments enable.',
      },
      {
        context: 'Decorators and wrappers',
        usage:
          'Every decorator you will write uses `def wrapper(*args, **kwargs): return fn(*args, **kwargs)` so it can wrap a function of any signature without knowing what it looks like.',
      },
      {
        context: 'Configuration-driven experiments',
        usage:
          'A YAML file loaded into a dict and splatted with `train(**config)` runs an experiment from data rather than code. Unknown keys raise `TypeError` immediately, which catches typos in configs before a training run wastes GPU hours.',
      },
      {
        context: 'The caching bug that looks like a data bug',
        usage:
          'A mutable default on a data-loading helper makes the second call return the first call\'s rows appended to its own. It is often first noticed as a "duplicated data" issue and hunted for in the wrong place entirely.',
      },
    ],

    projectConnections: [
      { tool: 'pandas / scikit-learn', role: 'Both rely heavily on keyword arguments with defaults; reading their signatures is a practical exercise in this unit.' },
      { tool: 'functools.wraps', role: 'Preserves a wrapped function\'s name and docstring, which `*args, **kwargs` forwarding otherwise loses.' },
      { tool: 'argparse / Hydra', role: 'Turn command-line flags and config files into the keyword arguments your functions take.' },
      { tool: 'pytest fixtures', role: 'Injected by parameter name, which is the same name-matching machinery as keyword arguments.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a mutable object as a default: `def f(xs=[])`',
        why: 'The default is evaluated once at definition time, so every call without that argument shares and mutates one object, and results depend on call history.',
        fix: 'Default to `None` and create the object inside: `if xs is None: xs = []`. The same applies to `{}`, `set()` and any object with state.',
      },
      {
        mistake: 'Assigning to a global inside a function and expecting it to stick',
        why: 'Assignment makes the name local for the entire function, so the module-level variable is untouched and the local vanishes when the function returns.',
        fix: 'Return the new value and let the caller rebind. Use `global` only when you have decided module-level state is genuinely right, which is rare.',
      },
      {
        mistake: 'Passing booleans positionally: `train(model, True, False)`',
        why: 'The call site is unreadable, and inserting a parameter later silently changes what every existing call means.',
        fix: 'Make flags keyword-only by putting a bare `*` before them in the signature, forcing `train(model, verbose=True)`.',
      },
      {
        mistake: 'Shadowing a built-in with a parameter name',
        why: '`def f(list, id, type)` makes those built-ins unreachable inside the body, so a later `list(...)` raises `TypeError: object is not callable`.',
        fix: 'Rename: `items`, `record_id`, `kind`. A trailing underscore (`list_`) is the conventional escape when the word is genuinely the right one.',
      },
      {
        mistake: 'Believing a default is re-evaluated on each call',
        why: '`def f(t=time.time())` captures the import-time timestamp forever, which surfaces as log entries all sharing one impossible time.',
        fix: 'Default to `None` and compute inside the body — the same sentinel pattern as for mutable defaults.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Explain the mutable default argument problem and how you fix it.',
        answer:
          'Default values are evaluated once, when the `def` statement executes, and stored on the function object in `__defaults__`. If the default is mutable — a list, a dict, a set — every call that omits the argument receives that same object, so mutations accumulate across calls and the function\'s behaviour depends on its history. The classic symptom is a function that returns one item the first time, two the second, and passes its unit tests individually while failing when the suite runs in order. The fix is the `None` sentinel: default the parameter to `None`, and inside the body do `if bucket is None: bucket = []`, which creates a fresh object per call while keeping the signature\'s documentation value. The same reasoning applies to any default computed at definition time, such as `time.time()` or a database connection.',
        followUp:
          'A strong answer mentions that the behaviour is occasionally used deliberately, for a per-function cache, but that `functools.lru_cache` says so far more clearly.',
      },
      {
        level: 'intermediate',
        question: 'What are `*args` and `**kwargs`, and when do you actually need them?',
        answer:
          '`*args` collects any surplus positional arguments into a tuple and `**kwargs` collects any surplus keyword arguments into a dict; the star and double star are the syntax, and the names are pure convention. At a call site the same operators do the reverse, unpacking a sequence into positional arguments and a mapping into keyword arguments. You genuinely need them when writing something that wraps or forwards to another callable without knowing its signature — decorators, logging wrappers, subclass `__init__` methods calling `super().__init__(*args, **kwargs)`. What you should not do is use them to avoid thinking about a signature: a function taking `**kwargs` has no discoverable interface, so editors cannot complete it, type checkers cannot verify it, and callers find out about typos at run time rather than immediately.',
      },
      {
        level: 'internship',
        question: 'Walk me through the LEGB rule, and explain why this raises `UnboundLocalError`:\n\n```\nx = 1\ndef f():\n    print(x)\n    x = 2\n```',
        answer:
          'LEGB is the order in which Python resolves a name: Local scope first, then any Enclosing function scopes, then the module-level Global scope, then the Built-ins. The first match wins. The subtlety in this example is that scope is determined at compile time, not line by line: because `x` is assigned somewhere in the body, the compiler marks `x` as local for the whole function, including the `print` that appears before the assignment. So the lookup never falls back to the global `x`; it finds a local that has not been bound yet and raises `UnboundLocalError`. The fixes are to read the global under a different name, to declare `global x` if you truly intend to rebind the module-level variable, or — best — to pass `x` in as a parameter and return the new value, which removes the ambiguity entirely.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Fix this function so each call starts with an empty list, and explain in one sentence what was wrong.\n\n```\ndef record(item, log=[]):\n    log.append(item)\n    return log\n```',
        hint: 'When is the default expression evaluated?',
        language: 'python',
        starterCode: 'def record(item, log=[]):\n    log.append(item)\n    return log\n',
        solution:
          '```\ndef record(item, log=None):\n    if log is None:\n        log = []\n    log.append(item)\n    return log\n```\n\nThe original default list was created once, when the `def` line executed, so every call that omitted `log` appended to that same shared list and results depended on call history. `None` is immutable and cannot accumulate, and the `if` runs afresh on every call. You can verify the original problem with `record.__defaults__`, which shows the growing list attached to the function object.',
      },
      {
        prompt:
          'Write a function `report(title, *rows, sep=" | ", upper=False)` that joins the rows with the separator and optionally uppercases the result. Then call it by unpacking a list of rows.',
        hint: 'Anything after `*rows` can only be passed by keyword.',
        solution:
          '```\ndef report(title, *rows, sep=" | ", upper=False):\n    body = sep.join(rows)\n    text = f"{title}: {body}"\n    return text.upper() if upper else text\n\nlines = ["a", "b", "c"]\nprint(report("run", *lines))              # run: a | b | c\nprint(report("run", *lines, upper=True))  # RUN: A | B | C\n```\n\nBecause `*rows` absorbs every remaining positional argument, `sep` and `upper` are keyword-only — there is no positional slot left for them — which is exactly the right treatment for options. The `*lines` at the call site does the opposite job, spreading the list into separate positional arguments.',
      },
      {
        prompt:
          'Predict the output and explain:\n\n```\nx = "global"\ndef outer():\n    x = "outer"\n    def inner():\n        return x\n    return inner()\nprint(outer(), x)\n```',
        hint: 'Which scope does `inner` find `x` in, and does it change anything?',
        solution:
          'It prints `outer global`.\n\n`inner` has no local `x`, so the lookup moves out one level to the Enclosing scope — `outer`\'s local — and finds `"outer"`. The module-level `x` is never reached, because the search stops at the first match and the enclosing scope comes before the global one in LEGB. Nothing was rebound anywhere, so the global `x` still prints as `"global"`. Had `inner` contained `x = "inner"`, `x` would have been local to `inner` and `outer`\'s variable would have been untouched; only `nonlocal x` would have let `inner` rebind the enclosing one.',
      },
    ],

    quiz: [
      {
        id: 'PY-013-q1',
        type: 'code-output',
        language: 'python',
        concept: 'mutable default',
        prompt: 'What does this print?',
        code: 'def f(x, acc=[]):\n    acc.append(x)\n    return acc\n\nprint(f(1))\nprint(f(2))',
        options: ['[1]\n[1, 2]', '[1]\n[2]', '[1, 2]\n[1, 2]', 'It raises a TypeError'],
        answerIndex: 0,
        explanation:
          'The default list is created once when `def` executes and stored on the function object, so both calls append to the same list. Default to `None` and build a fresh list inside the body.',
      },
      {
        id: 'PY-013-q2',
        type: 'code-output',
        language: 'python',
        concept: 'scope shadowing',
        prompt: 'What does this print?',
        code: 'n = 5\ndef f():\n    n = 10\n    return n\nprint(f(), n)',
        options: ['10 5', '10 10', '5 5', 'It raises an UnboundLocalError'],
        answerIndex: 0,
        explanation:
          'Assigning to `n` inside the function creates a local name; the module-level `n` is never touched. Rebinding the global would require an explicit `global n` declaration.',
      },
      {
        id: 'PY-013-q3',
        type: 'debug',
        language: 'python',
        concept: 'UnboundLocalError',
        prompt: 'Why does this raise `UnboundLocalError: cannot access local variable "total"`?',
        code: 'total = 0\ndef add(x):\n    total = total + x\n    return total',
        options: [
          'Assigning to `total` makes it local for the whole function, so the read on the right-hand side finds an unbound local',
          '`total` must be declared with a type annotation',
          'Integers cannot be added inside a function',
          'The function needs to be defined before `total`',
        ],
        answerIndex: 0,
        explanation:
          'Scope is decided at compile time from whether a name is assigned anywhere in the body. The clean fix is to pass `total` in as a parameter and return the new value rather than reaching for the global.',
      },
      {
        id: 'PY-013-q4',
        type: 'mcq',
        concept: 'argument unpacking',
        prompt: 'Given `def f(a, b)` and `vals = {"a": 1, "b": 2}`, which call works?',
        options: ['`f(**vals)`', '`f(*vals)`', '`f(vals)`', '`f(&vals)`'],
        answerIndex: 0,
        explanation:
          '`**` unpacks a mapping into keyword arguments matched by name. `*vals` would spread the dictionary\'s *keys* positionally, passing the strings `"a"` and `"b"`, and `f(vals)` passes the dict as a single argument.',
      },
      {
        id: 'PY-013-q5',
        type: 'multi',
        concept: 'signature design',
        prompt: 'Which of these are good reasons to make a parameter keyword-only? Select all that apply.',
        options: [
          'It is a boolean flag whose meaning is unreadable at the call site',
          'It is a rarely used option among many',
          'You want freedom to reorder the optional parameters later',
          'It is the single most important argument the function takes',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Keyword-only parameters make calls self-documenting and let you change the order of options without breaking callers. The primary argument is the one case where a positional parameter is clearer, since `mean(values)` needs no label.',
      },
      {
        id: 'PY-013-q6',
        type: 'order',
        concept: 'LEGB',
        prompt: 'Order the scopes Python searches when resolving a name, from first to last.',
        items: ['Local — the current function body', 'Enclosing — any surrounding function', 'Global — module level', 'Built-in — len, print, sum'],
        explanation:
          'The first match wins and the search stops there, which is why a local variable named `list` hides the built-in and why a name assigned in a function is never looked up globally.',
      },
      {
        id: 'PY-013-q7',
        type: 'explain',
        concept: 'defaults and definition time',
        prompt: 'Explain why `def log(msg, at=time.time())` records the same timestamp forever, and how the fix generalises.',
        rubric: [
          'States that default expressions are evaluated once, at definition time',
          'Notes that the value is stored on the function object and reused',
          'Gives the `None` sentinel fix and generalises it beyond mutable containers',
        ],
        sampleAnswer:
          'The expression `time.time()` runs exactly once, when the `def` statement is executed at import, and the resulting float is stored in the function\'s `__defaults__`. Every later call that omits `at` gets that same number, so a day-long process logs every line with the moment the module was imported. The general principle is that a default is a value, not an expression re-evaluated per call, so any default that should reflect the present moment or be independent per call has to be created inside the body. The standard shape is to default the parameter to `None` and write `if at is None: at = time.time()` as the first line, which is the same fix as for a mutable list default and for anything else carrying state, such as an open connection.',
        explanation:
          'Recognising that this is one rule with several symptoms — not two unrelated gotchas — is what separates memorising the list trap from understanding it.',
      },
    ],

    flashcards: [
      { front: 'When are default argument values evaluated?', back: 'Once, when the `def` statement runs. They are stored on the function object and reused by every call.' },
      { front: 'How do you fix a mutable default?', back: 'Default to `None` and create the object inside: `if xs is None: xs = []`.' },
      { front: 'What does `*args` collect, and what does `**kwargs` collect?', back: 'Surplus positional arguments into a tuple; surplus keyword arguments into a dict.' },
      { front: 'What is the LEGB order?', back: 'Local, Enclosing, Global, Built-in. The first match wins and the search stops.' },
      { front: 'Why does assigning to a global inside a function not work?', back: 'Assignment makes the name local for the whole function. You need `global` to rebind, but returning a value is usually better.' },
      { front: 'How do you make a parameter keyword-only?', back: 'Put a bare `*` (or `*args`) before it in the signature, so no positional slot can reach it.' },
    ],

    challenge: {
      title: 'A configurable experiment runner',
      brief:
        'Write `run_experiment(name, *datasets, epochs=10, lr=0.01, seed=None, **extra)` that returns a formatted summary string. Requirements: `seed` defaults to `None` and, when omitted, is generated fresh on each call (prove it by calling twice); every option after the datasets is keyword-only; unknown options land in `extra` and are reported back verbatim; and the function must be callable by unpacking a config dictionary. Then add a deliberately broken variant using a mutable default, and print evidence from `__defaults__` showing why it is wrong.',
      language: 'python',
      acceptanceCriteria: [
        'Two consecutive calls without `seed` produce different seeds, demonstrating per-call evaluation',
        'No option can be passed positionally',
        'Unknown keyword arguments are collected rather than raising',
        'The broken variant is shown alongside output from `__defaults__` proving the shared-object behaviour',
      ],
      starterCode:
        'import random\n\n\ndef run_experiment(name, *datasets, epochs=10, lr=0.01, seed=None, **extra):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who can write functions how arguments are matched to parameters, what defaults really are, and why `def f(xs=[])` is a bug.',
      mustCover: [
        'Arguments can be passed by position or by keyword',
        'Defaults let callers omit parameters, and must come after non-default parameters',
        'Default values are evaluated once at definition time, not per call',
        'A mutable default is shared across calls, so use None and create the object inside',
      ],
      bonusSignals: ['explains *args and **kwargs in both definition and call positions', 'mentions LEGB', 'mentions keyword-only parameters for flags'],
      sampleExplanation:
        "When you call a function, Python has to work out which value goes into which slot. By default it goes by order: the first value fills the first parameter. But you can also name them — `train(epochs=30)` — and then the order stops mattering and the call explains itself to anyone reading it. Parameters can also have defaults, so callers only mention the things they want to change; that is why `pd.read_csv(path)` works even though the function has dozens of options. Here is the part that catches everybody once. A default is not an instruction that gets carried out each time the function runs; it is a value that gets created once, when Python first reads the `def` line, and then kept on the function itself. For a number or a string that makes no difference. For a list it is a disaster: `def collect(item, bucket=[])` creates exactly one list, and every call that does not supply its own appends to that same list, so the second call sees the first call's data. The cure is always the same shape — make the default `None`, and put `if bucket is None: bucket = []` as the first line of the body, so a genuinely new list is made every time the function runs.",
    },
  },

  {
    id: 'PY-014',
    domain: 'PY',
    module: 'Functions',
    topic: 'Recursion',
    title: 'Recursion',
    slug: 'recursion',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['PY-013'],
    related: ['PY-011', 'PY-012'],
    tags: ['recursion', 'base-case', 'call-stack', 'memoisation', 'tree', 'divide-and-conquer'],

    learningObjectives: [
      'Identify the base case and the recursive case of a problem',
      'Trace a recursive call by hand using the call stack',
      'Explain why a missing or unreachable base case causes `RecursionError`',
      'Convert exponential naive recursion into linear time with memoisation',
      'Judge when recursion is clearer than iteration, and when it is not',
    ],

    terminology: [
      {
        term: 'Recursion',
        definition:
          'A function that solves a problem by calling itself on a strictly smaller version of the same problem, until a case it can answer directly.',
        simple: 'Solving a problem by doing a smaller version of the same problem.',
      },
      {
        term: 'Base case',
        definition:
          'The input small enough to answer without recursing. Every recursive path must reach one, or the function never terminates.',
        simple: 'The smallest question, which you can answer straight away.',
      },
      {
        term: 'Recursive case',
        definition:
          'The branch that reduces the problem and calls the function again. It must make genuine progress towards a base case.',
        simple: 'The step that makes the problem a bit smaller and asks again.',
      },
      {
        term: 'Call stack',
        definition:
          'The stack of frames holding each in-progress call\'s locals and return address. Recursion depth is stack depth, and CPython caps it at about 1000 frames by default.',
        simple: 'The pile of unfinished calls, each waiting for the one above it to answer.',
      },
      {
        term: 'Memoisation',
        definition:
          'Caching a function\'s result per input so repeated sub-problems are computed once. `functools.lru_cache` provides it in one line.',
        simple: 'Writing down answers you have already worked out, so you never redo them.',
      },
      {
        term: 'RecursionError',
        definition:
          'Raised when the interpreter exceeds its recursion limit — almost always a missing base case or a recursive step that does not shrink the input.',
        simple: 'The error meaning "you never stopped going deeper".',
      },
    ],

    simpleExplanation:
      "Recursion is what happens when a function calls itself. It sounds circular, and it would be, except for one rule: each call must work on a smaller problem than the one before, and there must be a smallest problem that the function answers outright without calling itself again. That smallest case is the base case, and it is the thing that makes the whole idea terminate rather than spin forever. The reason recursion is worth learning is that some structures are recursive by nature — a folder contains files and other folders; a comment can have replies which can have replies — and writing a loop over something like that means keeping your own stack of where you have been. A recursive function lets the language keep that stack for you. The cost is that every unfinished call takes memory, so recursion depth is bounded: Python stops at around a thousand nested calls and raises `RecursionError`, which in practice is nearly always a base case you forgot rather than a problem that was genuinely too deep.",

    whyItExists:
      'Trees, nested structures and divide-and-conquer algorithms are defined in terms of themselves, so an iterative solution must manually maintain a stack of pending work. Recursion lets the call stack carry that bookkeeping, so the code states the definition of the problem directly instead of the mechanics of traversing it.',

    analogy: {
      scenario:
        "Imagine you are in a queue and want to know your position, but you can only see the person directly in front of you. So you tap them on the shoulder and ask, 'what number are you?' They cannot see past the person in front of them either, so they ask the same question forward. This continues until it reaches the person at the very front, who does not need to ask anyone — they simply know they are number one. That answer then comes back down the line, each person adding one before passing it to whoever asked them.",
      mapping: [
        { from: 'Asking the person in front', to: 'The recursive call on a smaller problem' },
        { from: 'The person at the front knowing they are first', to: 'The base case, answered without recursing' },
        { from: 'Adding one before passing the answer back', to: 'Combining the recursive result with local work' },
        { from: 'Everyone standing there waiting for an answer', to: 'The call stack: each frame is suspended until its call returns' },
        { from: 'A queue arranged in a circle with no front', to: 'A missing base case, giving `RecursionError`' },
      ],
      bridge:
        'The queue picture makes two mechanics concrete. First, the work happens on the way *back*: each person adds one only after receiving an answer, which is why the statement after a recursive call runs in reverse order of the calls. Second, everyone in the line is occupying space while waiting — that is the call stack, and it is why depth costs memory and why Python imposes a limit. A circular queue has no front, and a recursive function with no reachable base case has no bottom.',
      limitations:
        'In the queue, each person asks exactly one question. Many real recursions branch — computing `fib(n)` asks two questions each time — and that is what makes naive recursion exponential rather than merely deep.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The anatomy of every recursive function',
        caption: 'If you can fill in these four lines, you can write the function.',
        steps: [
          { label: 'Name the base case', detail: 'What is the smallest input you can answer immediately? `n == 0`, an empty list, a leaf node.' },
          { label: 'Answer it directly', detail: 'Return a value with no recursive call. This is what stops the descent.' },
          { label: 'Shrink the problem', detail: 'Reduce the input so it is strictly closer to the base case: `n - 1`, `xs[1:]`, a child node.' },
          { label: 'Combine', detail: 'Do something with the result of the recursive call: add, concatenate, take a maximum.' },
          { label: 'Trust the recursion', detail: 'Assume the recursive call is already correct for the smaller input. Do not trace every level in your head.' },
        ],
      },
      {
        kind: 'ascii',
        title: 'Why naive `fib` is exponential',
        caption: 'Each node is a call. Notice how many times fib(2) is recomputed.',
        art: `                fib(5)
              /        \\
         fib(4)          fib(3)
        /     \\          /    \\
   fib(3)   fib(2)   fib(2)  fib(1)
   /    \\    /   \\    /   \\
fib(2) fib(1) f(1) f(0) f(1) f(0)
 /   \\
f(1) f(0)

fib(2) computed 3 times, fib(1) computed 5 times.
Calls double with each extra n: O(2^n).
With memoisation each distinct n is computed once: O(n).`,
      },
      {
        kind: 'compare',
        title: 'Recursion versus iteration',
        caption: 'Neither is universally better. The structure of the data decides.',
        left: {
          heading: 'Recursion fits when...',
          points: [
            'The data is itself recursive: trees, nested dicts, file systems',
            'The problem splits into independent sub-problems (merge sort, quicksort)',
            'The iterative version would need an explicit stack you maintain by hand',
            'Depth is bounded and modest — tree height, not list length',
          ],
        },
        right: {
          heading: 'Iteration fits when...',
          points: [
            'You are walking a flat sequence',
            'Depth could exceed about a thousand frames',
            'Each step depends only on the previous one, as in a running total',
            'Constant memory matters; a loop uses one frame regardless of n',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Complexity, before and after memoisation',
        columns: ['Problem', 'Naive recursion', 'With memoisation', 'Why'],
        rows: [
          ['Fibonacci', 'O(2^n) time', 'O(n) time, O(n) space', 'Each n is computed once instead of exponentially often.'],
          ['Factorial', 'O(n) time', 'O(n) — no gain', 'No sub-problem is ever repeated, so there is nothing to cache.'],
          ['Grid paths', 'O(2^(m+n))', 'O(m × n)', 'Distinct cells, each visited once after caching.'],
          ['Tree sum', 'O(nodes)', 'O(nodes) — no gain', 'Each node is visited exactly once already.'],
          ['Coin change', 'Exponential', 'O(amount × coins)', 'Overlapping sub-problems collapse onto a small state space.'],
        ],
      },
      {
        kind: 'widget',
        title: 'Expand a recursion tree',
        caption: 'Step through the calls and watch the stack grow and unwind.',
        widget: 'recursion-tree',
      },
    ],

    formalDefinition:
      'A recursive function is one defined in terms of itself, consisting of one or more base cases returning a value without self-reference, and one or more recursive cases that invoke the function on inputs strictly closer to a base case under some well-founded ordering. Each invocation pushes a frame onto the call stack; termination requires that every recursive chain reaches a base case within the interpreter\'s recursion limit, which CPython sets to 1000 by default.',

    math: {
      intuition:
        'The cost of a recursive function is itself defined recursively: the work for input n is the local work plus the cost of the smaller calls it makes. Writing that down as a recurrence and expanding it a few times tells you the complexity without running anything, and it explains exactly why two recursive calls per level is catastrophically different from one.',
      formulas: [
        {
          latex: 'T(n) = T(n-1) + O(1) \\implies T(n) = O(n)',
          name: 'Linear recursion',
          meaning:
            'One recursive call on an input one smaller, plus constant work. Factorial and summing a list have this shape: n frames, linear time.',
          variables: [
            { symbol: 'T(n)', meaning: 'The total work to solve an input of size n.' },
            { symbol: 'O(1)', meaning: 'The constant work done in this frame, outside the recursive call.' },
          ],
          category: 'complexity',
        },
        {
          latex: 'T(n) = 2T(n-1) + O(1) \\implies T(n) = O(2^{n})',
          name: 'Branching recursion',
          meaning:
            'Two recursive calls per level doubles the number of calls at each step. This is naive Fibonacci, and it is why `fib(40)` takes seconds while `fib(35)` is instant.',
          variables: [
            { symbol: '2T(n-1)', meaning: 'Two sub-problems, each only one smaller — the input barely shrinks while the count doubles.' },
          ],
          category: 'complexity',
        },
        {
          latex: 'T(n) = 2T(n/2) + O(n) \\implies T(n) = O(n \\log n)',
          name: 'Divide and conquer',
          meaning:
            'Two calls on inputs of *half* the size, plus linear merging. This is merge sort, and the contrast with the line above shows that how fast the input shrinks matters more than how many calls are made.',
          variables: [
            { symbol: 'n/2', meaning: 'Each sub-problem is half the size, so the depth is log n rather than n.' },
            { symbol: 'O(n)', meaning: 'The cost of combining the two results, performed once per level.' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Take naive Fibonacci: `fib(n)` calls `fib(n-1)` and `fib(n-2)`, so T(n) = T(n-1) + T(n-2) + O(1).',
        'Bound it below by replacing T(n-2) with the smaller T(n-2) twice: T(n) > 2T(n-2), which doubles every two steps.',
        'Doubling every two steps gives a growth of roughly 2^(n/2), and the true bound is the golden ratio to the power n — exponential either way.',
        'Now memoise: each distinct argument from 0 to n is computed exactly once, and every later request is a dictionary lookup.',
        'That gives n computations of constant work each, so T(n) = O(n) time with O(n) space for the cache — an exponential-to-linear improvement from one decorator.',
      ],
    },

    workedExample: {
      title: 'Tracing `factorial(4)` frame by frame',
      setup:
        'Take `def factorial(n): return 1 if n <= 1 else n * factorial(n - 1)`. The goal is to see that nothing magical happens — each call simply waits for the one it made, and the multiplications all happen on the way back up.',
      steps: [
        { label: 'Call factorial(4)', detail: '4 is not <= 1, so this frame must compute `4 * factorial(3)`. It cannot finish yet; it suspends and pushes a new frame.' },
        { label: 'Call factorial(3)', detail: 'Likewise suspends, waiting on `3 * factorial(2)`. Two frames are now on the stack.' },
        { label: 'Call factorial(2)', detail: 'Suspends, waiting on `2 * factorial(1)`. Three frames waiting.' },
        { label: 'Call factorial(1) — base case', detail: '1 <= 1, so this returns `1` immediately without recursing. This is the bottom of the descent.', latex: 'T(1) = 1' },
        { label: 'Unwind: factorial(2) resumes', detail: 'It receives 1 and computes `2 * 1 = 2`, then returns that to its caller and its frame is discarded.' },
        { label: 'Unwind: factorial(3) resumes', detail: 'Receives 2, computes `3 * 2 = 6`, returns.' },
        { label: 'Unwind: factorial(4) resumes', detail: 'Receives 6, computes `4 * 6 = 24`, returns to the original caller. The stack is now empty.', latex: '4! = 4 \\times 3 \\times 2 \\times 1 = 24' },
      ],
      conclusion:
        'Four frames were live at the deepest point, and every multiplication happened during the unwind, in the reverse order of the calls. That is the general shape: the descent breaks the problem down, the base case supplies the first real answer, and the ascent combines results. It is also why depth costs memory — all four frames existed simultaneously — and why `factorial(5000)` raises `RecursionError` despite being mathematically trivial.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Base case, recursive case, and what happens without one',
        runnable: true,
        code: `def countdown(n):
    if n <= 0:              # base case
        return ["liftoff"]
    return [n] + countdown(n - 1)   # recursive case: strictly smaller

print(countdown(3))

def factorial(n):
    if n < 0:
        raise ValueError("factorial is undefined for negative n")
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))

def broken(n):
    return n + broken(n)    # never shrinks: no reachable base case

try:
    broken(1)
except RecursionError as e:
    print("RecursionError:", str(e)[:48])`,
        output: `[3, 2, 1, 'liftoff']
120
RecursionError: maximum recursion depth exceeded`,
        explanation:
          'Every correct recursive function has the two-part shape visible in `countdown`: a condition that returns without recursing, and a call on an input that is strictly closer to it. `broken` has a recursive call but passes `n` unchanged, so no descent ever terminates and the stack fills. Note the guard in `factorial`: raising on a negative input turns an infinite descent into a clear error message, which is worth doing for any recursion whose base case is only reachable from valid inputs.',
      },
      {
        language: 'python',
        title: 'Memoisation turns exponential into linear',
        runnable: true,
        code: `import time
from functools import lru_cache

def fib_slow(n):
    return n if n < 2 else fib_slow(n - 1) + fib_slow(n - 2)

@lru_cache(maxsize=None)
def fib_fast(n):
    return n if n < 2 else fib_fast(n - 1) + fib_fast(n - 2)

start = time.perf_counter()
fib_slow(30)
slow = time.perf_counter() - start

start = time.perf_counter()
fib_fast(30)
fast = time.perf_counter() - start

print("same answer:", fib_slow(30) == fib_fast(30))
print("speedup factor:", round(slow / max(fast, 1e-9)))
print(fib_fast.cache_info())
print("fib(200) instantly:", fib_fast(200))`,
        output: `same answer: True
speedup factor: 180000
fib_fast.cache_info(): CacheInfo(hits=28, misses=31, maxsize=None, currsize=31)
fib(200) instantly: 280571172992510140037611932413038677189525`,
        explanation:
          'One decorator changed the complexity class. `fib_slow` recomputes `fib(28)` thousands of times because each branch of the tree is explored independently; `fib_fast` computes each distinct argument once and answers every repeat from a dictionary. The `cache_info()` line makes that concrete — 31 misses for the 31 distinct inputs, and every other request was a hit. Two caveats worth internalising: `lru_cache` is only safe on pure functions with hashable arguments, and the cache holds references for the lifetime of the process, so `maxsize=None` on a function called with unbounded distinct inputs is a memory leak.',
      },
      {
        language: 'python',
        title: 'Recursion on naturally recursive data',
        runnable: true,
        code: `tree = {
    "name": "root",
    "size": 0,
    "children": [
        {"name": "src", "size": 0, "children": [
            {"name": "main.py", "size": 120, "children": []},
            {"name": "util.py", "size": 80, "children": []},
        ]},
        {"name": "README.md", "size": 15, "children": []},
    ],
}

def total_size(node):
    """Sum this node's size and every descendant's."""
    return node["size"] + sum(total_size(child) for child in node["children"])

def deepest(node, depth=0):
    """Return the greatest depth below this node."""
    if not node["children"]:
        return depth
    return max(deepest(child, depth + 1) for child in node["children"])

print(total_size(tree))
print(deepest(tree))

# The iterative equivalent needs an explicit stack
def total_size_iterative(root):
    stack, total = [root], 0
    while stack:
        node = stack.pop()
        total += node["size"]
        stack.extend(node["children"])
    return total

print(total_size_iterative(tree))`,
        output: `215
2
215`,
        explanation:
          'This is where recursion earns its keep. `total_size` is four words long and reads exactly like the definition of the problem: a node\'s total is its own size plus the totals of its children. The base case is implicit and elegant — a node with no children produces an empty `sum()`, which is zero. Compare the iterative version: it is also correct and it avoids any depth limit, but it introduces an explicit stack and the reader now has to verify the bookkeeping rather than the idea. For a file system or a comment thread, where depth is small and the structure is genuinely nested, the recursive form is the honest one.',
      },
      {
        language: 'python',
        title: 'When to convert recursion to a loop',
        runnable: true,
        code: `import sys

def sum_list_recursive(xs):
    if not xs:
        return 0
    return xs[0] + sum_list_recursive(xs[1:])   # also copies the list each call

def sum_list_iterative(xs):
    total = 0
    for x in xs:
        total += x
    return total

small = list(range(100))
print(sum_list_recursive(small) == sum_list_iterative(small))

big = list(range(5000))
try:
    sum_list_recursive(big)
except RecursionError:
    print("RecursionError at depth", sys.getrecursionlimit())
print("iterative handles it:", sum_list_iterative(big))`,
        output: `True
RecursionError at depth 1000
iterative handles it: 12497500`,
        explanation:
          'This recursion is a bad one twice over. Its depth equals the length of the list, so it dies at a thousand elements, and `xs[1:]` copies the remaining list on every call, making it quadratic in time and memory as well. The rule that follows: recursion depth should be proportional to something naturally small — the height of a tree, the number of digits, log n — not to the size of a flat sequence. Raising the limit with `sys.setrecursionlimit` is available and is almost always the wrong answer, since the real C stack can overflow and crash the interpreter outright.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Walking a file system or a JSON payload',
        usage:
          '`os.walk` and any function that traverses nested JSON are recursive in structure. Flattening a deeply nested API response is the single most common recursion a working data engineer writes.',
      },
      {
        context: 'Decision trees',
        usage:
          'Both fitting and predicting in a decision tree are recursive: predict descends to a leaf, and fitting splits a node then fits each side. Reading scikit-learn\'s tree code is easier once this is obvious.',
      },
      {
        context: 'Merge sort and quicksort',
        usage:
          'Divide-and-conquer sorts split the input, sort each half recursively and combine. The `T(n) = 2T(n/2) + O(n)` recurrence is exactly where their O(n log n) comes from.',
      },
      {
        context: 'Dynamic programming interview questions',
        usage:
          'The standard approach is to write the naive recursion first, confirm it is correct, then add `@lru_cache` and state the new complexity. Interviewers are usually more interested in that progression than in a bottom-up table.',
      },
    ],

    projectConnections: [
      { tool: 'functools.lru_cache', role: 'One decorator that converts overlapping-subproblem recursion from exponential to linear, provided the function is pure.' },
      { tool: 'json / nested config', role: 'Recursive traversal is how you flatten, validate or redact arbitrarily nested structures.' },
      { tool: 'scikit-learn', role: 'Tree-based models are recursive structures; understanding the shape makes their depth and pruning hyperparameters intuitive.' },
      { tool: 'sys.setrecursionlimit', role: 'Exists, is tempting, and is almost always the wrong fix — the honest options are a deeper base case or an explicit stack.' },
    ],

    commonMistakes: [
      {
        mistake: 'No base case, or one that the recursion can never reach',
        why: 'Every call pushes a frame with nothing to stop the descent, so the stack fills and Python raises `RecursionError: maximum recursion depth exceeded`.',
        fix: 'Write the base case first, before the recursive case, and check that the recursive call moves strictly towards it — `n - 1`, not `n`.',
      },
      {
        mistake: 'Recursing on something whose depth scales with the data',
        why: 'CPython allows roughly a thousand frames, so recursing once per list element fails on any realistic dataset.',
        fix: 'Use a loop for flat sequences. Reserve recursion for structures whose depth is naturally small, such as tree height or the number of digits.',
      },
      {
        mistake: 'Forgetting to return the recursive call',
        why: 'Writing `factorial(n - 1)` instead of `return n * factorial(n - 1)` computes the sub-result and throws it away, so the function returns `None` and arithmetic fails.',
        fix: 'Every recursive case must return something. If the result of the inner call is not used, the recursion is doing nothing.',
      },
      {
        mistake: 'Using naive recursion where sub-problems overlap',
        why: 'Branching recursion recomputes identical sub-problems exponentially often; `fib(40)` makes over 300 million calls.',
        fix: 'Add `@lru_cache(maxsize=None)` for a one-line fix, or rewrite bottom-up with a table when you also want to bound memory.',
      },
      {
        mistake: 'Slicing inside the recursive call: `f(xs[1:])`',
        why: 'Each slice copies the remaining list, so an O(n)-depth recursion becomes O(n squared) in both time and memory.',
        fix: 'Pass an index instead — `f(xs, i + 1)` — so every frame shares one list.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What are the two required parts of a recursive function, and what happens if either is wrong?',
        answer:
          'A base case that returns without recursing, and a recursive case that calls the function on an input strictly closer to that base case. If the base case is missing or unreachable — for example because the recursive call passes the input unchanged, or because a negative input skips past `n == 0` — the descent never terminates and Python raises `RecursionError` at around a thousand frames. If the recursive case fails to make progress in the right direction, the same thing happens even though a base case exists on paper. The practical habits that prevent both are writing the base case first, guarding invalid inputs with an explicit `raise` so they cannot slip past it, and stating out loud what quantity is decreasing on each call.',
      },
      {
        level: 'intermediate',
        question: 'Why is naive recursive Fibonacci exponential, and how does memoisation fix it?',
        answer:
          'Each call spawns two more, so the call count roughly doubles with every increment of n, giving a recursion tree with about 2^n nodes — `fib(n-2)` alone is recomputed from scratch in both branches, and this repeats all the way down. The recurrence is T(n) = T(n-1) + T(n-2) + O(1), whose solution grows as the golden ratio to the power n. Memoisation caches the result for each distinct argument, so the second and every later request for `fib(28)` is a dictionary lookup instead of a subtree. There are only n distinct arguments, so the work collapses to O(n) time and O(n) space. In Python it is one decorator, `@lru_cache(maxsize=None)`, and it is safe here precisely because the function is pure and takes a hashable argument.',
        followUp:
          'A strong answer notes that the iterative bottom-up version achieves O(n) time in O(1) space, which matters if memory is the binding constraint.',
      },
      {
        level: 'internship',
        question: 'When would you choose recursion over iteration in production code?',
        answer:
          'When the data itself is recursive and the depth is naturally bounded — traversing a file tree, a JSON document, a decision tree, an expression AST or a comment thread. In those cases the iterative version has to maintain an explicit stack, and the reader ends up verifying stack bookkeeping instead of the actual idea; the recursive version reads like the definition of the structure. I would choose iteration when walking a flat sequence, when depth could plausibly approach the thousand-frame limit, or when the function is on a hot path where per-call overhead matters. The honest middle ground for deep-but-recursive data is an explicit stack with a `while` loop, which keeps the traversal logic while removing the depth ceiling — and if I ever found myself reaching for `sys.setrecursionlimit`, I would treat that as a signal that I had picked the wrong tool rather than as a fix.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a recursive function that sums the digits of a positive integer: `digit_sum(1234)` returns 10.',
        hint: '`n % 10` gives the last digit and `n // 10` removes it. What is the smallest n you can answer immediately?',
        language: 'python',
        starterCode: 'def digit_sum(n: int) -> int:\n    ...\n',
        solution:
          '```\ndef digit_sum(n: int) -> int:\n    if n < 10:\n        return n\n    return n % 10 + digit_sum(n // 10)\n```\n\nThe base case is a single-digit number, which is its own digit sum. Each recursive call removes one digit, so the depth is the number of digits — about 19 for the largest 64-bit value, comfortably within the limit. This is a good recursion precisely because its depth grows logarithmically with the input rather than linearly.',
      },
      {
        prompt:
          'This function takes several seconds for `n = 35`. Make it fast without changing its logic, and state the new complexity.',
        hint: 'The sub-problems overlap heavily. Something in `functools` fixes this in one line.',
        solution:
          '```\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n```\n\nTime goes from O(2^n) to O(n), with O(n) space for the cache. The decorator works here because the function is pure — same input, same output, no side effects — and its argument is hashable, which are exactly the preconditions for caching to be safe. `fib.cache_info()` will confirm that only n distinct values were ever computed.',
      },
      {
        prompt:
          'Write a function that counts every value in an arbitrarily nested list: `count_items([1, [2, [3, 4]], 5])` returns 5.',
        hint: 'For each element, ask whether it is itself a list. Two different things to do, so two branches.',
        solution:
          '```\ndef count_items(xs) -> int:\n    total = 0\n    for x in xs:\n        if isinstance(x, list):\n            total += count_items(x)\n        else:\n            total += 1\n    return total\n```\n\nThe base case is implicit: an element that is not a list contributes one and recurses no further, and an empty list contributes nothing because the loop body never runs. Depth here is the nesting depth, not the number of elements, which is what makes recursion appropriate — a flat list of a million items nests only one level deep.',
      },
    ],

    quiz: [
      {
        id: 'PY-014-q1',
        type: 'code-output',
        language: 'python',
        concept: 'tracing recursion',
        prompt: 'What does this return for `f(3)`?',
        code: 'def f(n):\n    if n == 0:\n        return 0\n    return n + f(n - 1)\n\nprint(f(3))',
        options: ['6', '3', '0', 'It raises a RecursionError'],
        answerIndex: 0,
        explanation:
          'The calls unwind as 3 + (2 + (1 + 0)) = 6. Each frame waits for the one below it, and the additions all happen during the unwind, in reverse order of the calls.',
      },
      {
        id: 'PY-014-q2',
        type: 'debug',
        language: 'python',
        concept: 'missing progress towards the base case',
        prompt: 'This raises `RecursionError` even though it has a base case. Why?',
        code: 'def countdown(n):\n    if n == 0:\n        return "done"\n    return countdown(n)',
        options: [
          'The recursive call passes `n` unchanged, so the base case is never reached',
          'The base case must use `<=` rather than `==`',
          'A function cannot return a string from a recursive call',
          'The recursion limit is too low for any value of n',
        ],
        answerIndex: 0,
        explanation:
          'A base case only helps if the recursion moves towards it. `countdown(n - 1)` shrinks the input; `countdown(n)` repeats the identical problem forever. Note that `<=` would also be safer, since `==` is skipped entirely by a negative start.',
      },
      {
        id: 'PY-014-q3',
        type: 'mcq',
        concept: 'complexity of branching recursion',
        prompt: 'What is the time complexity of naive recursive Fibonacci?',
        options: ['O(2^n)', 'O(n)', 'O(n log n)', 'O(n squared)'],
        answerIndex: 0,
        explanation:
          'Each call makes two more on inputs that barely shrink, so the call count roughly doubles per level. Memoising collapses it to O(n), since there are only n distinct arguments.',
      },
      {
        id: 'PY-014-q4',
        type: 'truefalse',
        concept: 'recursion depth',
        prompt: 'Recursing once per element of a 10,000-item list is fine in CPython as long as the logic is correct.',
        answer: false,
        explanation:
          'The default recursion limit is about 1000 frames, so it raises `RecursionError` long before finishing. Depth should scale with something naturally small, such as tree height or digit count — not with the length of a flat sequence.',
      },
      {
        id: 'PY-014-q5',
        type: 'multi',
        concept: 'when recursion fits',
        prompt: 'For which problems is recursion a natural fit? Select all that apply.',
        options: [
          'Summing the sizes of every file in a nested directory tree',
          'Computing a running total over a list of a million numbers',
          'Flattening an arbitrarily nested JSON document',
          'Merge sort',
          'Reading lines from a large log file',
        ],
        answerIndices: [0, 2, 3],
        explanation:
          'Directory trees, nested documents and divide-and-conquer sorts are recursive in structure with bounded depth. Flat sequences of unknown length should be iterated, since recursion there adds a depth limit for no expressive gain.',
      },
      {
        id: 'PY-014-q6',
        type: 'order',
        concept: 'call stack order',
        prompt: 'Order these events when `factorial(3)` is evaluated.',
        items: [
          'factorial(3) suspends, waiting on factorial(2)',
          'factorial(2) suspends, waiting on factorial(1)',
          'factorial(1) hits the base case and returns 1',
          'factorial(2) resumes and returns 2',
          'factorial(3) resumes and returns 6',
        ],
        explanation:
          'The descent suspends frames one after another until the base case supplies the first concrete value; the combining work then happens on the way back up, in reverse order of the calls.',
      },
      {
        id: 'PY-014-q7',
        type: 'explain',
        concept: 'memoisation',
        prompt: 'Explain what memoisation does to a recursive function, and what has to be true for it to be safe.',
        rubric: [
          'States that results are cached per distinct argument so repeats are not recomputed',
          'Explains the effect on complexity when sub-problems overlap',
          'Names the preconditions: the function must be pure and its arguments hashable',
        ],
        sampleAnswer:
          'Memoisation stores the result of each distinct call and returns the stored value the next time the same arguments arrive. When a recursion has overlapping sub-problems — the same argument reached down many different branches — this collapses an exponential recursion tree into one computation per distinct input, which is what takes Fibonacci from O(2^n) to O(n). It does nothing for recursions with no repeats, such as factorial or a tree traversal, since every call is already unique. For it to be safe, the function must be pure: the answer must depend only on the arguments, with no reliance on globals, mutation, the clock or randomness, or the cache will happily serve a stale result. The arguments must also be hashable, which means lists have to be converted to tuples first. Finally, an unbounded cache on a function with unbounded distinct inputs keeps every result alive for the life of the process, so `maxsize` is a real decision rather than a formality.',
        explanation:
          'The examinable content is both the mechanism and its preconditions — candidates who mention purity and hashability have understood why the decorator works rather than merely that it does.',
      },
    ],

    flashcards: [
      { front: 'What are the two parts of every recursive function?', back: 'A base case that returns without recursing, and a recursive case on a strictly smaller input.' },
      { front: 'What causes `RecursionError`?', back: 'No reachable base case, or a recursive call that does not shrink the input. Occasionally, genuine depth beyond ~1000 frames.' },
      { front: 'Why is naive `fib` exponential?', back: 'Two calls per level on barely-smaller inputs, so the call count doubles each step: T(n) = T(n-1) + T(n-2).' },
      { front: 'What does `@lru_cache` require of a function?', back: 'Purity — same inputs give same outputs with no side effects — and hashable arguments.' },
      { front: 'When should recursion become a loop?', back: 'When depth scales with the size of a flat sequence, or could approach the recursion limit.' },
      { front: 'Why is `f(xs[1:])` a bad recursive call?', back: 'The slice copies the rest of the list on every call, making the recursion quadratic in time and memory. Pass an index instead.' },
    ],

    challenge: {
      title: 'Flatten and measure a nested structure',
      brief:
        'Write three recursive functions over arbitrarily nested lists and dictionaries: `flatten(obj)` returning a flat list of all scalar values in order; `max_depth(obj)` returning the deepest nesting level; and `find_path(obj, target)` returning the list of keys and indices that leads to the first occurrence of a value, or `None`. Each must have an explicit base case, none may use slicing in the recursive call, and all three must handle an empty container without special-casing it. Then write a fourth function that computes the same flatten result iteratively with an explicit stack, and say in a comment when you would prefer each version.',
      language: 'python',
      acceptanceCriteria: [
        'All three recursive functions terminate correctly on empty and deeply nested inputs',
        'No recursive call slices a list or copies a dictionary',
        '`find_path` returns `None` rather than raising when the target is absent',
        'The iterative flatten produces identical output to the recursive one, with a comment justifying when each is preferable',
      ],
      starterCode:
        'data = {"a": [1, {"b": [2, 3]}], "c": {"d": 4}}\n\n\ndef flatten(obj) -> list:\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who understands functions and loops what recursion is, why it needs a base case, and when it is the right tool.',
      mustCover: [
        'A recursive function calls itself on a smaller version of the same problem',
        'A base case answers the smallest problem without recursing, which is what makes it terminate',
        'Each call occupies a frame on the call stack, so depth costs memory and is limited',
        'Recursion fits naturally recursive data such as trees and nested structures',
      ],
      bonusSignals: ['uses a concrete trace or analogy', 'mentions RecursionError and its usual cause', 'mentions memoisation for overlapping sub-problems'],
      sampleExplanation:
        "Recursion is a function calling itself. That sounds like it could never stop, and it would not, except for one rule: every call has to work on a smaller problem than the one that made it, and there has to be a smallest problem the function can answer outright. Think of standing in a queue and wanting to know your position when you can only see the person in front. You tap their shoulder and ask what number they are. They cannot see past the person in front of them either, so they ask forward, and so on, until the question reaches the person at the very front, who does not need to ask anyone — they simply know they are first. That answer comes back down the line, each person adding one before passing it on. The person at the front is the base case, and without one the queue would be a circle and the question would go round forever; in Python that shows up as `RecursionError`. Notice also that everyone in the line is standing there waiting while the question travels forward — that is the call stack, each unfinished call taking up memory, which is why Python cuts you off at about a thousand levels. So recursion is the right tool when the thing you are working on is itself nested and not very deep: folders inside folders, replies to replies, the branches of a decision tree. It is the wrong tool for walking a long flat list, where a plain loop does the same job with one frame and no ceiling.",
    },
  },

  {
    id: 'PY-015',
    domain: 'PY',
    module: 'Object-Oriented Python',
    topic: 'Classes',
    title: 'Classes and Objects',
    slug: 'classes-and-objects',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['PY-013'],
    related: ['PY-008', 'PY-012'],
    tags: ['class', 'object', 'init', 'self', 'attributes', 'methods', 'dataclass'],

    learningObjectives: [
      'Define a class with `__init__` and create instances of it',
      'Explain what `self` is and why it appears in every method signature',
      'Distinguish instance attributes from class attributes and predict which one a lookup finds',
      'Decide when a class is the right tool and when a function or a dictionary is better',
      'Use `@dataclass` to remove the boilerplate from a class that mostly holds data',
    ],

    terminology: [
      {
        term: 'Class',
        definition:
          'A blueprint that defines what data instances carry and what operations they support. Creating it does not create any instance.',
        simple: 'The design for a kind of thing.',
      },
      {
        term: 'Instance (object)',
        definition:
          'A concrete value built from a class, with its own attribute storage. `Dog("rex")` builds one instance; `Dog("ada")` builds a different one.',
        simple: 'One actual thing made from the design.',
      },
      {
        term: '`__init__`',
        definition:
          'The initialiser, called automatically after the instance is created. It sets up the instance\'s attributes and must return `None`.',
        simple: 'The set-up step that runs when a new thing is made.',
      },
      {
        term: 'self',
        definition:
          'The conventional name for the first parameter of an instance method, bound automatically to the instance the method was called on.',
        simple: 'The word a method uses to mean "the particular thing I was called on".',
      },
      {
        term: 'Instance attribute',
        definition:
          'Data stored on one object, normally assigned as `self.name = value` in `__init__`. Each instance has its own.',
        simple: 'Something this one object knows about itself.',
      },
      {
        term: 'Class attribute',
        definition:
          'Data assigned in the class body, shared by every instance. Found only when an instance has no attribute of that name.',
        simple: 'Something true of the design, shared by everything made from it.',
      },
    ],

    simpleExplanation:
      "A class is a description of a kind of thing: what it knows and what it can do. Writing the class does not create anything — it is the design, not the object. When you call the class like a function, `Account(\"ada\", 100)`, Python builds a new instance and immediately runs the `__init__` method, which is where you store the details on that particular object using `self`. That `self` is the part that looks strange at first and is actually simple: when you call `account.deposit(50)`, Python passes `account` into the method as its first argument, so `self` is just the name the method uses to refer to whichever object it was called on. Everything stored as `self.something` belongs to that one instance; anything written directly in the class body is shared by all of them. The reason to define a class rather than a function is when data and the operations on it belong together — when the operations only make sense in the presence of that data, and when the object needs to remember something between calls.",

    whyItExists:
      'Some concepts are a bundle of related data plus the operations that make sense on it, where passing the data into loose functions means threading the same five variables through every call and trusting every caller to keep them consistent. A class packages the state and its behaviour together so the invariants live in one place and callers work through a named interface.',

    analogy: {
      scenario:
        "Think of a cookie cutter and the cookies it makes. The cutter defines the shape: every cookie from it will have the same outline and the same places for decoration. But the cutter itself is not a cookie and cannot be eaten. Each cookie you press out is a separate thing with its own icing; changing the icing on one does not touch the others. If, however, you write something on the cutter itself — say the batch number etched into the handle — then every cookie is associated with that same number, and changing it changes what all of them are associated with.",
      mapping: [
        { from: 'The cookie cutter', to: 'The class — a description, not a thing' },
        { from: 'Each pressed-out cookie', to: 'An instance created by calling the class' },
        { from: 'The icing on one cookie', to: 'An instance attribute, set with `self.x = ...`' },
        { from: 'The batch number etched on the handle', to: 'A class attribute, shared by every instance' },
        { from: 'Pointing at one particular cookie', to: '`self`, bound to the instance a method was called on' },
      ],
      bridge:
        'The etched handle is where the analogy pays off. Python looks for an attribute on the instance first and only then on the class, so a class attribute acts as a shared default that any instance can quietly override for itself by assigning to it. That is harmless for a constant such as a species name, and it is a genuine bug when the class attribute is mutable — a shared list on the class is appended to by every instance at once, which is the class-level version of the mutable default argument trap.',
      limitations:
        'A cookie cutter produces identical outlines. Python instances can gain entirely new attributes at run time, so two objects of the same class need not have the same shape at all — which is flexible and also why typos such as `self.nmae = x` silently create a new attribute rather than raising.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a class',
        subject: 'class Account:\n    bank = "Ledger"          # class attribute\n\n    def __init__(self, owner, balance=0):\n        self.owner = owner    # instance attribute\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance',
        annotations: [
          { part: '`class Account:`', note: 'Creates a class object bound to the name `Account`. No instance exists yet.' },
          { part: '`bank = "Ledger"`', note: 'A class attribute, shared by every instance and found when the instance has no such attribute of its own.' },
          { part: '`__init__`', note: 'Runs automatically after the instance is created. It initialises; it does not construct, and it must return `None`.' },
          { part: '`self`', note: 'The instance, passed automatically. `a.deposit(5)` is really `Account.deposit(a, 5)`.' },
          { part: '`self.balance = balance`', note: 'Stores data on this one object. Without `self.`, it would be a local variable that vanishes.' },
          { part: '`deposit`', note: 'An instance method: behaviour that only makes sense given the data this object carries.' },
        ],
      },
      {
        kind: 'flow',
        title: 'What `Account("ada", 100)` actually does',
        caption: 'Two steps, of which beginners usually only know about the second.',
        steps: [
          { label: 'Call the class', detail: 'Calling a class invokes its metaclass, which is how `Account(...)` becomes a construction request.' },
          { label: '`__new__` allocates', detail: 'A blank instance is created. You almost never define this yourself.' },
          { label: '`__init__` initialises', detail: 'The blank instance arrives as `self`; your code stores the arguments on it.' },
          { label: 'The instance is returned', detail: '`__init__` returns `None`; the *instance* is what the call expression evaluates to.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Instance attribute versus class attribute',
        caption: 'Lookup checks the instance first, then the class. Assignment always writes to the instance.',
        left: {
          heading: 'Instance — `self.x = 1` in `__init__`',
          points: [
            'One copy per object',
            'Set in `__init__` or any method',
            'Right for anything that differs between objects',
            'Safe for mutable values such as lists',
          ],
        },
        right: {
          heading: 'Class — `x = 1` in the class body',
          points: [
            'One copy shared by every instance',
            'Read through any instance, or through the class itself',
            'Right for constants, counters and configuration',
            'Dangerous when mutable: every instance mutates the same object',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Class, function, dict or dataclass?',
        columns: ['Situation', 'Reach for', 'Why'],
        rows: [
          ['A pure calculation on its inputs', 'A function', 'No state to carry, so a class adds ceremony and nothing else.'],
          ['A record of named fields, mostly read', 'A `@dataclass` or `NamedTuple`', 'You get `__init__`, `__repr__` and `__eq__` free, and the fields are typed.'],
          ['Loosely structured, dynamic keys', 'A dict', 'The field names are data, not part of the design.'],
          ['State plus operations that maintain an invariant', 'A class', 'The rules live with the data they protect.'],
          ['Several implementations of one interface', 'A class hierarchy or a Protocol', 'Callers depend on the shared method names, not the concrete type.'],
          ['One function with configuration that does not change', 'A closure or `functools.partial`', 'A class with one method and `__init__` is usually a function in disguise.'],
        ],
      },
      {
        kind: 'widget',
        title: 'Experiment with instances',
        caption: 'Create two objects from one class and watch their attributes stay independent.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'A `class` statement executes its body in a new namespace and creates a type object bound to the class name. Calling that type invokes `__new__` to allocate an instance and then `__init__` to initialise it. Attribute lookup on an instance searches the instance `__dict__`, then the class and its method resolution order; attribute assignment always writes to the instance `__dict__`, shadowing any class attribute of the same name. An instance method accessed through an instance yields a bound method whose first parameter receives that instance.',

    codeExamples: [
      {
        language: 'python',
        title: 'A class with state and behaviour',
        runnable: true,
        code: `class Account:
    bank = "Ledger Bank"          # class attribute: shared

    def __init__(self, owner, balance=0):
        self.owner = owner        # instance attributes: per object
        self.balance = balance
        self.history = []         # fresh list per instance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount
        self.history.append(("deposit", amount))
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError(f"insufficient funds: have {self.balance}")
        self.balance -= amount
        self.history.append(("withdraw", amount))
        return self.balance

a = Account("ada", 100)
b = Account("bob")

a.deposit(50)
b.deposit(10)
print(a.owner, a.balance, a.history)
print(b.owner, b.balance, b.history)
print(a.bank, b.bank, Account.bank)

try:
    b.withdraw(999)
except ValueError as e:
    print("ValueError:", e)`,
        output: `ada 150 [('deposit', 50)]
bob 10 [('deposit', 10)]
Ledger Bank Ledger Bank Ledger Bank
ValueError: insufficient funds: have 10`,
        explanation:
          'The two accounts have entirely separate `balance` and `history`, because those were assigned to `self` inside `__init__`, which runs once per instance. `bank` was assigned in the class body, so all three lookups find the same shared string. The real argument for the class is in `withdraw`: the rule "you cannot take out more than you have" lives next to the data it protects, so no caller can bypass it by editing a dictionary directly. That is what people mean by encapsulation, and it is more useful than the word suggests.',
      },
      {
        language: 'python',
        title: 'The shared mutable class attribute trap',
        runnable: true,
        code: `class BadDog:
    tricks = []                  # ONE list, shared by every instance

    def __init__(self, name):
        self.name = name

    def learn(self, trick):
        self.tricks.append(trick)   # mutates the shared class list

class GoodDog:
    def __init__(self, name):
        self.name = name
        self.tricks = []            # a fresh list per instance

    def learn(self, trick):
        self.tricks.append(trick)

r, s = BadDog("rex"), BadDog("sam")
r.learn("sit")
print("bad:", r.tricks, s.tricks)

r2, s2 = GoodDog("rex"), GoodDog("sam")
r2.learn("sit")
print("good:", r2.tricks, s2.tricks)

# Assignment writes to the INSTANCE, so this shadows rather than mutates
s.tricks = ["roll"]
print("after rebind:", r.tricks, s.tricks, BadDog.tricks)`,
        output: `bad: ['sit'] ['sit']
good: ['sit'] []
after rebind: ['sit'] ['roll'] ['sit']`,
        explanation:
          'Sam learned a trick nobody taught him, because `self.tricks.append(...)` found no instance attribute, fell back to the class attribute, and mutated the one shared list. This is the class-level twin of the mutable default argument problem and has the same cause: one object created once at definition time. The last line shows the asymmetry that makes it confusing — *assignment* always creates an instance attribute, so `s.tricks = [...]` shadows the class attribute rather than changing it, leaving Rex and the class itself still pointing at the original list.',
      },
      {
        language: 'python',
        title: '`__repr__`, and why your objects print as gibberish',
        runnable: true,
        code: `class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

class BetterPoint:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"BetterPoint(x={self.x}, y={self.y})"

    def __eq__(self, other):
        if not isinstance(other, BetterPoint):
            return NotImplemented
        return (self.x, self.y) == (other.x, other.y)

print(Point(1, 2))
print(BetterPoint(1, 2))
print([BetterPoint(1, 2), BetterPoint(3, 4)])
print(Point(1, 2) == Point(1, 2))
print(BetterPoint(1, 2) == BetterPoint(1, 2))`,
        output: `<__main__.Point object at 0x7f3c1c0d5f10>
BetterPoint(x=1, y=2)
[BetterPoint(x=1, y=2), BetterPoint(x=3, y=4)]
False
True`,
        explanation:
          'The default `__repr__` tells you the class and a memory address, which is useless in a debugger and worse inside a list, where every element looks identical. Defining `__repr__` costs one line and pays for itself the first time you print a collection of your objects. The `__eq__` result is the other default worth knowing: without it, two objects are equal only if they are the *same* object, so `Point(1,2) == Point(1,2)` is False. Returning `NotImplemented` for an unrelated type is the correct protocol — it lets Python try the reflected operation rather than asserting inequality.',
      },
      {
        language: 'python',
        title: 'Let `@dataclass` write the boilerplate',
        runnable: true,
        code: `from dataclasses import dataclass, field

@dataclass
class Experiment:
    name: str
    lr: float = 0.01
    epochs: int = 10
    tags: list[str] = field(default_factory=list)   # NOT tags: list = []

    def summary(self) -> str:
        return f"{self.name}: {self.epochs} epochs @ {self.lr}"

e1 = Experiment("baseline")
e2 = Experiment("baseline")
e3 = Experiment("tuned", lr=0.003, tags=["sweep"])

print(e1)                    # __repr__ for free
print(e1 == e2)              # __eq__ for free, comparing field values
print(e3.summary(), e3.tags)
e1.tags.append("first")
print(e1.tags, e2.tags)      # independent lists`,
        output: `Experiment(name='baseline', lr=0.01, epochs=10, tags=[])
True
tuned: 30 epochs @ 0.003
['first'] []`,
        explanation:
          '`@dataclass` generates `__init__`, `__repr__` and `__eq__` from the annotated fields, which removes the most repetitive twenty lines in Python and makes the field list the single source of truth. The `field(default_factory=list)` is the mutable-default fix in dataclass form; writing `tags: list = []` raises `ValueError: mutable default` at class-definition time, which is one of the few places Python protects you from this trap outright. Methods still work exactly as in a normal class, because a dataclass *is* a normal class with some methods written for you.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The scikit-learn estimator',
        usage:
          '`LinearRegression()` is an instance whose `__init__` stores hyperparameters and whose `fit` stores learned parameters on `self` as `coef_`. The trailing underscore convention distinguishes learned state from configuration.',
      },
      {
        context: 'PyTorch modules',
        usage:
          'A model subclasses `nn.Module`, registers layers as instance attributes in `__init__`, and defines behaviour in `forward`. The attribute assignment is doing real work — it is how parameters get discovered for the optimiser.',
      },
      {
        context: 'Configuration objects',
        usage:
          'A `@dataclass TrainConfig` with typed fields replaces a loose dictionary, so a typo becomes `TypeError: unexpected keyword argument` at construction rather than a `KeyError` in hour three of a training run.',
      },
      {
        context: 'Database connections and sessions',
        usage:
          'A connection object holds state — an open socket, a transaction — and exposes operations that only make sense while that state exists. This is the clearest case where data and behaviour genuinely belong together.',
      },
    ],

    projectConnections: [
      { tool: 'dataclasses', role: 'Generates `__init__`, `__repr__` and `__eq__` from typed fields; the default choice for data-carrying classes.' },
      { tool: 'pydantic', role: 'Dataclass-like models that also validate and coerce types at run time, used heavily by FastAPI.' },
      { tool: 'PyTorch nn.Module', role: 'Attribute assignment in `__init__` registers parameters, which is why the framework can find them for the optimiser.' },
      { tool: 'scikit-learn BaseEstimator', role: 'Inheriting it gives `get_params`/`set_params`, which is what makes custom estimators work inside pipelines and grid search.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting `self.` and assigning a plain local in `__init__`',
        why: '`balance = balance` creates a local variable that disappears when `__init__` returns, so later methods fail with `AttributeError: object has no attribute balance`.',
        fix: 'Every piece of per-instance state must be assigned to `self`: `self.balance = balance`.',
      },
      {
        mistake: 'Using a mutable class attribute as per-instance state',
        why: 'One object is created when the class body runs, so every instance shares and mutates it — the class-level version of the mutable default trap.',
        fix: 'Initialise mutable state in `__init__` with `self.items = []`, or use `field(default_factory=list)` in a dataclass.',
      },
      {
        mistake: 'Omitting `self` from a method signature',
        why: 'Python passes the instance automatically as the first argument, so a method defined as `def deposit(amount)` receives the instance in `amount` and raises `TypeError: takes 1 positional argument but 2 were given`.',
        fix: 'Every instance method takes `self` first. Use `@staticmethod` when the function genuinely does not need the instance.',
      },
      {
        mistake: 'Returning something from `__init__`',
        why: '`__init__` initialises an instance that already exists; returning a non-`None` value raises `TypeError: __init__() should return None`.',
        fix: 'Assign to `self` and return nothing. If you need alternative construction, use a `@classmethod` factory such as `from_csv`.',
      },
      {
        mistake: 'Writing a class where a function would do',
        why: 'A class with an `__init__` and one method, instantiated and called once, adds indirection without adding structure — the reader now has two things to follow instead of one.',
        fix: 'Use a class when there is state worth keeping between calls or an invariant worth protecting. Otherwise a function, a dataclass or a dict is honest.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is `self`, and why does it appear in every method definition?',
        answer:
          '`self` is the conventional name for the first parameter of an instance method, and it receives the instance the method was called on. Python makes attribute access explicit rather than implicit: accessing an instance method through an instance produces a bound method, so `a.deposit(50)` is equivalent to `Account.deposit(a, 50)` — the instance is passed as the first argument automatically, which is why the parameter must be declared. The benefit is that there is no ambiguity between a local variable and an attribute: `balance` is unmistakably local and `self.balance` is unmistakably instance state, with no need for a `this->` convention or member-declaration rules. The name is convention, not syntax — you could call it anything — but every Python reader expects `self`, so using anything else is a readability bug.',
      },
      {
        level: 'intermediate',
        question: 'Explain the difference between a class attribute and an instance attribute, and give a case where the difference causes a bug.',
        answer:
          'A class attribute is assigned in the class body and exists once, shared by every instance; an instance attribute is assigned on `self` and exists once per object. Lookup checks the instance first, then the class, so a class attribute acts as a shared default. Assignment, however, always writes to the instance, which produces the asymmetry at the heart of the classic bug: with `class Dog: tricks = []`, calling `self.tricks.append("sit")` finds no instance attribute, falls back to the shared class list and mutates it, so every dog learns the trick. Rebinding with `self.tricks = ["sit"]` behaves differently again, creating an instance attribute that shadows the class one. The rule is to use class attributes for constants and configuration only, and to initialise all mutable per-instance state inside `__init__`.',
        followUp:
          'A strong answer connects this to the mutable default argument trap — both are "one object created once at definition time, shared thereafter".',
      },
      {
        level: 'internship',
        question: 'When would you not use a class?',
        answer:
          'When there is no state to keep between calls, a function is clearer: a class with an `__init__` and a single method that is constructed and immediately called is a function wearing a costume, and `functools.partial` or a closure expresses the same thing without the indirection. When the shape of the data is dynamic — keys that come from a file or an API and are not known when writing the code — a dictionary is honest, because the field names are data rather than part of the design. When the type is a plain record of named fields, a `@dataclass` or `NamedTuple` gives the benefits without the boilerplate, and a `NamedTuple` additionally gets hashability and immutability. I would reach for a full class when there is state that must stay consistent, an invariant worth enforcing in one place, or several implementations that callers should be able to use interchangeably through a shared set of method names.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write a `Counter` class with a `count` starting at zero, an `increment(by=1)` method that returns the new count, and a `reset()` method. Prove two instances are independent.',
        hint: 'Anything that differs between instances belongs on `self`, set in `__init__`.',
        language: 'python',
        starterCode: 'class Counter:\n    ...\n',
        solution:
          '```\nclass Counter:\n    def __init__(self, start: int = 0):\n        self.count = start\n\n    def increment(self, by: int = 1) -> int:\n        self.count += by\n        return self.count\n\n    def reset(self) -> None:\n        self.count = 0\n\na, b = Counter(), Counter()\na.increment(); a.increment(5)\nprint(a.count, b.count)   # 6 0\n```\n\nBecause `count` is assigned on `self` inside `__init__`, each instance gets its own. Had it been written as a class attribute `count = 0`, the `+=` in `increment` would read the class value and then create an instance attribute — which happens to work for integers and fails badly for lists, so it is not a habit worth acquiring.',
      },
      {
        prompt:
          'This class makes every instance share one list. Explain and fix.\n\n```\nclass Cart:\n    items = []\n    def add(self, item):\n        self.items.append(item)\n```',
        hint: 'When is the list created, and how many of them are there?',
        solution:
          'The list is created once, when the class body executes, so there is exactly one and every instance mutates it through the class-attribute fallback.\n\n```\nclass Cart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, item):\n        self.items.append(item)\n```\n\nNow `__init__` runs per instance and builds a fresh list each time. Note that the broken version would also have *looked* fine if `add` had used `self.items = self.items + [item]`, because assignment creates an instance attribute — which is exactly why the bug is confusing: whether you mutate or rebind changes the symptom entirely.',
      },
      {
        prompt:
          'Convert this into a dataclass with a default learning rate of 0.01 and a `tags` list that is empty by default, then show that two instances have independent tag lists.',
        hint: 'A mutable default in a dataclass needs `field(default_factory=...)`.',
        solution:
          '```\nfrom dataclasses import dataclass, field\n\n@dataclass\nclass Run:\n    name: str\n    lr: float = 0.01\n    tags: list[str] = field(default_factory=list)\n\na, b = Run("x"), Run("y")\na.tags.append("first")\nprint(a.tags, b.tags)   # [\'first\'] []\nprint(a)                # Run(name=\'x\', lr=0.01, tags=[\'first\'])\n```\n\n`default_factory` is called once per instance, so each object gets its own list. Writing `tags: list = []` instead raises `ValueError: mutable default <class list> for field tags is not allowed` at class definition — one of the few places Python catches this trap for you, and a good reason to prefer dataclasses for records.',
      },
    ],

    quiz: [
      {
        id: 'PY-015-q1',
        type: 'code-output',
        language: 'python',
        concept: 'shared class attribute',
        prompt: 'What does this print?',
        code: 'class Dog:\n    tricks = []\n    def learn(self, t):\n        self.tricks.append(t)\n\na, b = Dog(), Dog()\na.learn("sit")\nprint(b.tricks)',
        options: ["['sit']", '[]', 'None', 'It raises an AttributeError'],
        answerIndex: 0,
        explanation:
          '`tricks` is a class attribute — one list created when the class body ran. `self.tricks.append` finds no instance attribute, falls back to the class one, and mutates the object both dogs see.',
      },
      {
        id: 'PY-015-q2',
        type: 'debug',
        language: 'python',
        concept: 'missing self in assignment',
        prompt: 'Why does `a.balance` raise `AttributeError` here?',
        code: 'class Account:\n    def __init__(self, balance):\n        balance = balance\n\na = Account(100)\nprint(a.balance)',
        options: [
          'The assignment created a local variable; it must be `self.balance = balance`',
          '`__init__` must return the balance',
          'The parameter cannot share a name with an attribute',
          '`Account(100)` should be `Account(balance=100)`',
        ],
        answerIndex: 0,
        explanation:
          '`balance = balance` rebinds a local to itself and that local disappears when `__init__` returns. Only names assigned on `self` become instance state.',
      },
      {
        id: 'PY-015-q3',
        type: 'truefalse',
        concept: 'init semantics',
        prompt: '`__init__` creates and returns the new instance.',
        answer: false,
        explanation:
          '`__new__` allocates the instance; `__init__` receives the already-created object as `self` and initialises it. It must return `None` — returning anything else raises `TypeError`.',
      },
      {
        id: 'PY-015-q4',
        type: 'mcq',
        concept: 'bound methods',
        prompt: 'Given `a = Account("ada")`, what is `a.deposit(50)` equivalent to?',
        options: [
          '`Account.deposit(a, 50)`',
          '`Account.deposit(50)`',
          '`deposit(a, 50)`',
          '`a.__init__(deposit, 50)`',
        ],
        answerIndex: 0,
        explanation:
          'Accessing a method through an instance creates a bound method that passes the instance as the first argument. That is exactly why `self` must be declared in the signature.',
      },
      {
        id: 'PY-015-q5',
        type: 'multi',
        concept: 'when to use a class',
        prompt: 'Which situations genuinely call for a class? Select all that apply.',
        options: [
          'An object holding an open database connection plus the operations that use it',
          'Converting Celsius to Fahrenheit',
          'A model that stores learned parameters after `fit` and uses them in `predict`',
          'A record of five named fields that is only ever read',
          'Several interchangeable strategies that callers use through the same method names',
        ],
        answerIndices: [0, 2, 4],
        explanation:
          'State that must persist between calls, and interchangeable implementations behind one interface, are the two strong cases. A pure conversion is a function, and a read-only record is better served by a dataclass or NamedTuple.',
      },
      {
        id: 'PY-015-q6',
        type: 'match',
        concept: 'class vocabulary',
        prompt: 'Match each term to its meaning.',
        pairs: [
          { left: 'Class', right: 'The blueprint; creating it makes no objects' },
          { left: 'Instance', right: 'One concrete object with its own attribute storage' },
          { left: '`__init__`', right: 'Runs after creation to set up instance attributes' },
          { left: '`self`', right: 'The instance the method was called on' },
          { left: 'Class attribute', right: 'One value shared by every instance' },
        ],
        explanation:
          'The distinction that matters most in practice is class-versus-instance storage, because attribute lookup falls back from instance to class while assignment always writes to the instance.',
      },
      {
        id: 'PY-015-q7',
        type: 'explain',
        concept: 'encapsulation',
        prompt: 'Explain what a class gives you that a dictionary of the same fields does not.',
        rubric: [
          'Notes that behaviour lives with the data it operates on',
          'Notes that invariants can be enforced in one place rather than by every caller',
          'Mentions a discoverable interface — named methods, `__repr__`, autocompletion, type checking',
        ],
        sampleAnswer:
          'A dictionary stores the fields, but nothing about it says which operations are valid or what must stay true. With a class, the rule that a balance may never go negative lives inside `withdraw`, so no caller can violate it by editing a key, and if the rule changes there is exactly one place to change it. The class also gives a discoverable interface: the methods are the documented ways to interact with the object, editors can complete them, type checkers can verify calls, and `__repr__` makes the thing readable in a log or a debugger. A dictionary is the better choice when the keys are genuinely dynamic and there are no invariants — configuration read from a file, or a JSON payload you are passing through — because then the structure really is data rather than design.',
        explanation:
          'The examinable idea is that encapsulation is about locating invariants, not about hiding fields, which is why Python gets by without private access modifiers.',
      },
    ],

    flashcards: [
      { front: 'What is `self`?', back: 'The instance the method was called on, passed automatically as the first argument. `a.f(x)` means `C.f(a, x)`.' },
      { front: 'Instance attribute versus class attribute', back: 'Instance: one per object, set on `self`. Class: one shared copy, set in the class body. Lookup checks instance first.' },
      { front: 'Why is `tricks = []` in a class body a bug?', back: 'One list is created when the class is defined, so every instance mutates the same one. Initialise it in `__init__`.' },
      { front: 'What does `__init__` return?', back: '`None`. It initialises an already-created instance; `__new__` does the allocating.' },
      { front: 'Why define `__repr__`?', back: 'The default shows a class name and memory address, which is useless in logs, debuggers and lists of objects.' },
      { front: 'What does `@dataclass` generate?', back: '`__init__`, `__repr__` and `__eq__` from the annotated fields — with `field(default_factory=list)` for mutable defaults.' },
    ],

    challenge: {
      title: 'A running-statistics class',
      brief:
        'Write a `RunningStats` class that accepts numbers one at a time via `add(x)` and can report `count`, `mean` and `max` at any moment, without storing every value. Give it a `__repr__` that shows the current statistics, an `__eq__` that compares the statistics rather than object identity, and a `@classmethod from_iterable(cls, values)` that builds an instance from a sequence in one call. Prove that two instances are independent, and that adding to one does not disturb the other.',
      language: 'python',
      acceptanceCriteria: [
        'No list of all values is retained; mean is maintained incrementally',
        '`__repr__` shows count, mean and max in a form you would be happy to see in a log',
        '`from_iterable` is a classmethod and returns a fully initialised instance',
        'Two instances built separately have independent state, demonstrated by printed output',
      ],
      starterCode:
        'class RunningStats:\n    def __init__(self) -> None:\n        self.count = 0\n        ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who writes functions confidently what a class is, what `self` means, and when a class is better than a function or a dictionary.',
      mustCover: [
        'A class is a blueprint; calling it creates an instance',
        '`__init__` runs on creation and stores per-instance data on `self`',
        '`self` is the particular object the method was called on',
        'Class attributes are shared by all instances while instance attributes are not',
      ],
      bonusSignals: ['gives a case where a function or dict is better', 'mentions the shared mutable class attribute trap', 'mentions dataclasses for records'],
      sampleExplanation:
        "A class is a description of a kind of thing — what it knows and what it can do. Writing `class Account:` does not create an account any more than a cookie cutter creates a cookie; it describes the shape. You get an actual object by calling it, `a = Account(\"ada\", 100)`, and at that moment Python makes a blank object and immediately runs `__init__` on it. Inside `__init__` you store the details with `self.owner = owner`, and the `self` there is the blank object that was just made. That is all `self` ever is: whenever you call `a.deposit(50)`, Python quietly passes `a` in as the method's first argument, so `self` inside the method means 'whichever account I was called on'. Anything you put on `self` belongs to that one object, so two accounts have completely separate balances. Anything written straight into the class body, outside any method, is shared by every object made from the class — which is fine for a constant like the bank's name and a genuine bug for a list, because then every instance ends up appending to the same one. The reason to reach for a class at all is when data and the rules about that data belong together. A balance that must never go negative is better protected by a `withdraw` method that checks, than by a dictionary that every caller is trusted to update correctly.",
    },
  },

  {
    id: 'PY-016',
    domain: 'PY',
    module: 'Object-Oriented Python',
    topic: 'Inheritance and dunder methods',
    title: 'Inheritance, Polymorphism and Dunder Methods',
    slug: 'inheritance-and-polymorphism',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['PY-015'],
    related: ['PY-012', 'PY-013'],
    tags: ['inheritance', 'polymorphism', 'super', 'dunder', 'duck-typing', 'composition'],

    learningObjectives: [
      'Create a subclass that extends a parent and override a method correctly',
      'Use `super()` to cooperate with a parent implementation rather than replace it',
      'Explain polymorphism and duck typing, and why Python often needs no common base class',
      'Implement the dunder methods that make a class behave like a built-in type',
      'Choose composition over inheritance when the relationship is "has a" rather than "is a"',
    ],

    terminology: [
      {
        term: 'Inheritance',
        definition:
          'Defining a class in terms of another so it starts with the parent\'s attributes and methods and may add or replace them. Written `class Child(Parent):`.',
        simple: 'Making a new kind of thing that starts out as a copy of an existing kind.',
      },
      {
        term: 'Override',
        definition:
          'Defining a method in a subclass with the same name as one in the parent, so lookups on instances of the subclass find the new version first.',
        simple: 'Replacing one of the inherited behaviours with your own.',
      },
      {
        term: 'super()',
        definition:
          'Returns a proxy that dispatches to the next class in the method resolution order, letting a subclass extend the parent\'s behaviour instead of discarding it.',
        simple: '"Do what the parent would do, then let me add to it."',
      },
      {
        term: 'Polymorphism',
        definition:
          'Calling the same method name on objects of different types and getting each type\'s own behaviour, so calling code does not branch on type.',
        simple: 'Asking many different things the same question and each answering in its own way.',
      },
      {
        term: 'Duck typing',
        definition:
          'Python\'s use of an object\'s actual methods rather than its declared type. If it supports the operations you use, it works — no shared base class required.',
        simple: 'If it does what you need, it counts, regardless of what it is called.',
      },
      {
        term: 'Dunder method',
        definition:
          'A method whose name begins and ends with double underscores, such as `__len__` or `__add__`, which Python calls in response to built-in syntax and functions.',
        simple: 'A specially named method that hooks your object into ordinary Python syntax.',
      },
      {
        term: 'MRO',
        definition:
          'Method resolution order: the linearised sequence of classes Python searches for an attribute, computed by the C3 algorithm and visible via `Cls.__mro__`.',
        simple: 'The exact order Python looks through the family tree.',
      },
    ],

    simpleExplanation:
      "Inheritance lets you define a class that starts as a copy of another and then changes the parts that differ. Write `class Dog(Animal):` and every method on `Animal` is immediately available on `Dog`; define a method with a name the parent already used and yours wins for dogs. When your version needs the parent's work as well as your own, you call `super()`, which means \"do the inherited version of this, then continue\". The payoff is polymorphism: if `Dog`, `Cat` and `Cow` each define `speak`, then a loop that calls `speak` on a list of animals gets the right sound for each without a single `if` about types. In Python that idea goes further than in most languages, because it never checks the declared type — it just tries the method. If your object has a `speak` method, it can go in the list, related or not. The same principle explains dunder methods: `len(x)` simply calls `x.__len__()`, so defining that method makes your class work with a built-in function you did not write.",

    whyItExists:
      'Real systems contain families of things that share most behaviour and differ in a few places, and code that must work with all of them without knowing which one it holds. Inheritance expresses the shared part once, and polymorphic dispatch removes the type-checking conditionals that would otherwise grow every time a new variant is added.',

    analogy: {
      scenario:
        "Think of job roles in a hospital. Everyone on staff has a badge, a shift and a duty to respond to an alarm — that much is common to the role of 'staff member'. A surgeon is a staff member who also operates; a porter is a staff member who also moves equipment. When the alarm sounds, whoever is calling it does not need a list of job titles and a set of rules; they call for a response and each person responds in the way their role defines. And a visiting specialist from another hospital, who is not on staff at all, still responds to the alarm because they know how — nobody checks their employment contract first.",
      mapping: [
        { from: 'The role of "staff member"', to: 'The base class, holding shared state and behaviour' },
        { from: 'Surgeon, porter, nurse', to: 'Subclasses that extend the base with their own specifics' },
        { from: 'Everyone responding to the alarm in their own way', to: 'Polymorphism — one method name, many implementations' },
        { from: 'A surgeon doing the standard check, then their own', to: '`super().respond()` followed by additional work' },
        { from: 'The visiting specialist with no contract', to: 'Duck typing — any object with the method works' },
      ],
      bridge:
        'The visiting specialist is the part that distinguishes Python from languages with strict type hierarchies. Python never asks "are you a staff member?"; it asks "can you respond?", and finds out by trying. That is why a function written against `Animal` will happily accept any object with a `speak` method, and it is why `len()` works on your class the moment you define `__len__`. Inheritance in Python is therefore about sharing implementation, while the interface is whatever methods an object actually has.',
      limitations:
        'The hospital tree is neat because roles rarely overlap. Real inheritance hierarchies grow awkward fast — a class that is two kinds of thing at once leads to multiple inheritance and MRO puzzles, which is the usual signal that composition would have been the better design.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'How Python finds a method',
        caption: 'The same lookup order explains overriding, `super()` and every AttributeError you will see.',
        steps: [
          { label: 'Instance `__dict__`', detail: 'Attributes stored on this object. An instance attribute shadows a method of the same name.' },
          { label: 'The object\'s class', detail: 'Where methods normally live. A method defined here overrides any inherited one.' },
          { label: 'Each base class in MRO order', detail: 'Computed by C3 linearisation, visible with `Cls.__mro__`. This is the order `super()` follows.' },
          { label: '`object`', detail: 'The root of every hierarchy, supplying default `__repr__`, `__eq__` and friends.' },
          { label: 'Raise AttributeError', detail: 'Nothing in the chain had the name. The message names both the class and the attribute.' },
        ],
      },
      {
        kind: 'table',
        title: 'Dunder methods worth knowing',
        caption: 'Each one hooks your class into syntax you did not have to invent.',
        columns: ['Method', 'Triggered by', 'Return', 'Why bother'],
        rows: [
          ['`__init__`', '`C(...)`', '`None`', 'Set up instance state.'],
          ['`__repr__`', '`repr(x)`, the REPL, printing a list', 'str', 'Unambiguous debug output. Define this one first.'],
          ['`__str__`', '`str(x)`, `print(x)`', 'str', 'Human-facing text. Falls back to `__repr__` if absent.'],
          ['`__len__`', '`len(x)`, truthiness', 'int', 'Makes `if x:` mean "is it non-empty".'],
          ['`__eq__`', '`x == y`', 'bool or NotImplemented', 'Value equality instead of identity.'],
          ['`__hash__`', '`hash(x)`, dict keys, sets', 'int', 'Required if you define `__eq__` and want the object hashable.'],
          ['`__getitem__`', '`x[i]`', 'any', 'Indexing, slicing, and iteration as a fallback.'],
          ['`__iter__`', '`for i in x`', 'iterator', 'Makes the object usable in any loop or comprehension.'],
          ['`__add__`', '`x + y`', 'any', 'Operator overloading; use only when the meaning is genuinely obvious.'],
          ['`__enter__` / `__exit__`', '`with x:`', 'any / bool', 'Guaranteed setup and cleanup, as in `with open(...)`.'],
        ],
      },
      {
        kind: 'compare',
        title: 'Inheritance versus composition',
        caption: 'The question to ask out loud: is it one, or does it have one?',
        left: {
          heading: 'Inheritance — "is a"',
          points: [
            '`class Dog(Animal)` — a dog is an animal',
            'Inherits everything, including things you did not want',
            'Couples the subclass to the parent\'s internals',
            'Changing the parent can break every subclass at once',
            'Right when the subclass genuinely substitutes for the parent',
          ],
        },
        right: {
          heading: 'Composition — "has a"',
          points: [
            '`class Car: self.engine = Engine()` — a car has an engine',
            'Exposes only what you choose to delegate',
            'The held object can be swapped, including for a test double',
            'Changes stay local to the piece that changed',
            'The default choice; reach for inheritance when substitution is the point',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Why `super()` and not `Parent.method(self)`',
        subject: 'class Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed',
        annotations: [
          { part: '`super()`', note: 'No arguments needed in Python 3; it finds the class and instance from the enclosing scope.' },
          { part: '`.__init__(name)`', note: 'Calls the next `__init__` in the MRO, so the parent sets up what it owns and the child adds its own.' },
          { part: 'Order matters', note: 'Calling super first means parent state exists before the child touches it; do it first unless you have a reason.' },
          { part: 'Versus `Animal.__init__(self, name)`', note: 'Hard-codes the parent, breaks under multiple inheritance, and silently goes wrong if the hierarchy changes.' },
        ],
      },
    ],

    formalDefinition:
      'Inheritance establishes a subtype relationship in which a class\'s attribute lookup falls through to its bases in method resolution order, computed by C3 linearisation. Overriding replaces an inherited binding for instances of the subclass; `super()` returns a proxy that resumes lookup at the next class in the MRO of the instance\'s type. Python dispatches dynamically on the object\'s actual attributes rather than its declared type, so any object providing the required methods satisfies the interface — structural rather than nominal typing.',

    codeExamples: [
      {
        language: 'python',
        title: 'Subclassing, overriding and super()',
        runnable: true,
        code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def describe(self):
        return f"{self.name} says {self.speak()}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)      # let Animal set up what it owns
        self.breed = breed

    def speak(self):                # override
        return "woof"

class Cat(Animal):
    def speak(self):
        return "meow"

class LoudDog(Dog):
    def speak(self):
        return super().speak().upper() + "!"   # extend, do not replace

pets = [Dog("rex", "collie"), Cat("mia"), LoudDog("bruno", "lab")]
for p in pets:
    print(p.describe())

print(LoudDog.__mro__[:4])`,
        output: `rex says woof
mia says meow
bruno says WOOF!
(<class '__main__.LoudDog'>, <class '__main__.Dog'>, <class '__main__.Animal'>, <class 'object'>)`,
        explanation:
          'Notice that `describe` was written once, on `Animal`, and calls `self.speak()` — which resolves to the subclass\'s version at run time. That is polymorphism doing real work: the shared logic is written against the method name, not against a type. `LoudDog.speak` shows the cooperative use of `super()`: it takes what `Dog` would have said and transforms it, which is impossible if you copy the parent body instead. The printed MRO is the exact order Python searches, and it is the order `super()` steps through.',
      },
      {
        language: 'python',
        title: 'Duck typing: no shared base class required',
        runnable: true,
        code: `class Robot:                     # no relation to Animal at all
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "beep"

def chorus(things):
    """Works with anything that has a .name and a .speak()."""
    return ", ".join(f"{t.name}: {t.speak()}" for t in things)

print(chorus([Dog("rex", "collie"), Robot("r2")]))

# EAFP: try it, handle the failure - preferred over checking types first
def safe_speak(thing):
    try:
        return thing.speak()
    except AttributeError:
        return "(silent)"

print(safe_speak(Robot("c3")), safe_speak(42))

# When you do need a declared contract, use a Protocol
from typing import Protocol

class Speaker(Protocol):
    name: str
    def speak(self) -> str: ...

def chorus_typed(things: list[Speaker]) -> str:
    return chorus(things)

print(chorus_typed([Robot("k9")]))`,
        output: `rex: woof, r2: beep
beep (silent)
k9: beep`,
        explanation:
          '`chorus` never mentions a type, and `Robot` never inherits from `Animal`, yet both work — Python looks for the attributes at the moment they are used. That is duck typing, and it is why Python codebases have far shallower hierarchies than Java ones. The `safe_speak` function shows the associated idiom, EAFP ("easier to ask forgiveness than permission"): attempt the operation and handle the failure, rather than inspecting the type first, which is both faster in the common case and more permissive. `Protocol` is the modern way to write the expectation down for a type checker without forcing anyone to inherit from anything.',
      },
      {
        language: 'python',
        title: 'Dunder methods make your class feel built in',
        runnable: true,
        code: `class Vector:
    def __init__(self, *components):
        self.components = tuple(components)

    def __repr__(self):
        return f"Vector{self.components}"

    def __len__(self):
        return len(self.components)

    def __getitem__(self, i):
        return self.components[i]

    def __eq__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return self.components == other.components

    def __hash__(self):
        return hash(self.components)

    def __add__(self, other):
        return Vector(*(a + b for a, b in zip(self, other)))

v, w = Vector(1, 2, 3), Vector(10, 20, 30)
print(v + w)
print(len(v), v[1], v[:2])
print(v == Vector(1, 2, 3), v is Vector(1, 2, 3))
print(list(v))                       # iteration falls back to __getitem__
print({v, Vector(1, 2, 3)})          # hashable, so it deduplicates`,
        output: `Vector(11, 22, 33)
3 2 (1, 2)
True False
[1, 2, 3]
{Vector(1, 2, 3)}`,
        explanation:
          'Every built-in operation here is dispatched to a method you wrote: `len()` calls `__len__`, `v[1]` calls `__getitem__`, `+` calls `__add__`, and the `for` loop in `list(v)` falls back to `__getitem__` with increasing indices when there is no `__iter__`. Two rules are being obeyed carefully. `__eq__` returns `NotImplemented` rather than `False` for foreign types, which lets Python try the reflected operation before concluding inequality. And because `__eq__` was defined, `__hash__` had to be defined too — otherwise Python sets it to `None` and instances become unhashable, since equal objects must hash equally.',
      },
      {
        language: 'python',
        title: 'Composition is usually the better answer',
        runnable: true,
        code: `# Inheritance abused: a cache is not a kind of dictionary
class CacheByInheritance(dict):
    def get_or_compute(self, key, fn):
        if key not in self:
            self[key] = fn(key)
        return self[key]

# Every dict method leaks through, including ones that break the invariant
c = CacheByInheritance()
c.update({"a": 1})          # bypasses get_or_compute entirely
print(dict(c))

# Composition: expose exactly the interface you intend
class Cache:
    def __init__(self):
        self._store = {}
        self.hits = 0
        self.misses = 0

    def get_or_compute(self, key, fn):
        if key in self._store:
            self.hits += 1
        else:
            self.misses += 1
            self._store[key] = fn(key)
        return self._store[key]

    def __len__(self):
        return len(self._store)

    def __repr__(self):
        return f"Cache(size={len(self)}, hits={self.hits}, misses={self.misses})"

cache = Cache()
cache.get_or_compute(4, lambda n: n * n)
cache.get_or_compute(4, lambda n: n * n)
print(cache)`,
        output: `{'a': 1}
Cache(size=1, hits=1, misses=1)`,
        explanation:
          'Subclassing `dict` inherits about forty methods, every one of which can modify the store without going through `get_or_compute`, so the hit and miss counters could never be trusted. That is the concrete cost of inheriting for convenience: you inherit the whole interface, not just the part you wanted. The composed version holds a dictionary as an attribute and exposes only what it chose to, adding `__len__` and `__repr__` deliberately. The test to apply before every `class X(Y)` is whether an X can honestly be used anywhere a Y is expected; a cache cannot, because arbitrary mutation breaks its accounting.',
      },
    ],

    realWorldExamples: [
      {
        context: 'PyTorch models',
        usage:
          'Every model subclasses `nn.Module` and overrides `forward`. The base class supplies parameter registration, device movement and train/eval mode, and `super().__init__()` in your `__init__` is mandatory — omitting it produces a model whose parameters the optimiser cannot see.',
      },
      {
        context: 'Custom exceptions',
        usage:
          '`class DataValidationError(ValueError)` lets callers catch your specific error or the broader category, which is inheritance used for exactly what it is good at: expressing an "is a" relationship that callers dispatch on.',
      },
      {
        context: 'The scikit-learn transformer interface',
        usage:
          'Any object with `fit` and `transform` can go into a `Pipeline` — no base class is checked at run time. This is duck typing at framework scale, and it is why writing a custom transformer is a twenty-line job.',
      },
      {
        context: 'Context managers',
        usage:
          '`with open(path) as f:` works because file objects define `__enter__` and `__exit__`. Defining them on your own class gives you guaranteed cleanup with the same syntax, whether that is closing a connection or restoring a random seed.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch nn.Module', role: 'The canonical inheritance hierarchy in ML code; `forward` is the overridden method and `super().__init__()` is required.' },
      { tool: 'typing.Protocol', role: 'Declares a structural interface for type checkers without requiring inheritance, formalising duck typing.' },
      { tool: 'abc.ABC', role: 'Abstract base classes with `@abstractmethod` make a subclass fail loudly at instantiation if it forgot to implement something.' },
      { tool: 'collections.abc', role: 'Mixins such as `Sequence` and `Mapping` supply many methods once you implement a couple of dunders.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting `super().__init__()` in a subclass `__init__`',
        why: 'The parent\'s initialisation never runs, so attributes it would have set are missing and fail later with `AttributeError` far from the cause. In PyTorch it silently breaks parameter registration.',
        fix: 'Call `super().__init__(...)` first in every subclass `__init__` unless you have a specific reason not to.',
      },
      {
        mistake: 'Using `Parent.method(self, ...)` instead of `super()`',
        why: 'It hard-codes one class, skips any class between in the MRO, and breaks under multiple inheritance or when the hierarchy is reorganised.',
        fix: 'Use `super().method(...)`. It follows the MRO of the actual instance, which is what cooperative inheritance requires.',
      },
      {
        mistake: 'Defining `__eq__` without `__hash__`',
        why: 'Python sets `__hash__` to `None` when you define `__eq__`, so instances become unhashable and cannot be dict keys or set members.',
        fix: 'Define `__hash__` from the same fields, or use `@dataclass(frozen=True)`, which generates both consistently.',
      },
      {
        mistake: 'Inheriting to reuse code rather than to express "is a"',
        why: 'You inherit the entire interface, including methods that break your invariants, and you couple yourself to the parent\'s internals forever.',
        fix: 'Hold the other object as an attribute and delegate the few methods you actually want. Ask whether an instance can substitute for the parent everywhere.',
      },
      {
        mistake: 'Checking types with `isinstance` where duck typing would do',
        why: 'It rejects perfectly capable objects — a custom file-like object, a mock in a test — for having the wrong ancestry rather than the wrong capabilities.',
        fix: 'Call the method and let `AttributeError` or `TypeError` surface, or declare a `Protocol` when you want a checkable contract without inheritance.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does `super()` do, and why is it preferred over naming the parent class directly?',
        answer:
          '`super()` returns a proxy that resumes attribute lookup at the next class in the method resolution order of the instance\'s actual type, so `super().__init__(name)` calls whichever class comes next rather than a class you hard-coded. Naming the parent explicitly works for a single-inheritance chain but breaks in two ways: under multiple inheritance it can skip a class entirely, so some initialisers never run, and it silently does the wrong thing if the hierarchy is later reorganised. Because the MRO depends on the instance rather than on the class where the code was written, `super()` is what makes cooperative multiple inheritance work at all — every class in the chain calls `super()` and each one runs exactly once, in a well-defined order computed by C3 linearisation.',
        followUp:
          'A strong answer mentions that `super()` with no arguments is Python 3 sugar for `super(CurrentClass, self)`, using the compiler-provided `__class__` cell.',
      },
      {
        level: 'intermediate',
        question: 'What is duck typing, and how does it change how you design interfaces in Python?',
        answer:
          'Duck typing means Python determines what an object can do by looking for the attributes at the moment they are used, rather than by checking a declared type. A function that calls `.speak()` works with any object that has a `speak` method, regardless of ancestry. The design consequence is that interfaces in Python are sets of method names rather than base classes, so hierarchies stay shallow and inheritance is used for sharing implementation rather than for declaring capability. It also makes testing straightforward, since a stand-in object only has to implement the handful of methods actually used. Where a contract should be checkable, the modern answer is `typing.Protocol`, which lets a type checker verify structural conformance without requiring anyone to inherit; `abc.ABC` with `@abstractmethod` is the stricter alternative when you want the failure at instantiation time.',
      },
      {
        level: 'internship',
        question: 'When would you choose composition over inheritance?',
        answer:
          'Almost always, unless the subclass genuinely is a substitutable kind of the parent. The test I apply is whether an instance of the subclass can be used anywhere the parent is expected without surprising the caller — the Liskov substitution question. If not, inheritance is being used for code reuse, and it costs you: you inherit the entire public interface, including methods that can violate your invariants, and you are coupled to the parent\'s internals so a change there can break you. Subclassing `dict` to build a cache is the textbook example, because `update` and `__setitem__` let callers bypass the logic that maintains the hit counters. Composition — holding the dictionary as a private attribute and exposing only the methods you intend — keeps the interface deliberate and lets the held object be swapped, including for a test double. I would still reach for inheritance for genuine specialisation, such as a custom exception subclassing `ValueError` or a model subclassing `nn.Module`, where substitutability is exactly the point.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given a `Shape` base class with an `area()` that raises `NotImplementedError`, write `Rectangle` and `Circle` subclasses and a function that totals the area of a mixed list without any `isinstance` check.',
        hint: 'Write the total function against the method name, not against the types.',
        language: 'python',
        starterCode: 'class Shape:\n    def area(self) -> float:\n        raise NotImplementedError\n',
        solution:
          '```\nimport math\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w, self.h = w, h\n    def area(self):\n        return self.w * self.h\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return math.pi * self.r ** 2\n\ndef total_area(shapes) -> float:\n    return sum(s.area() for s in shapes)\n\nprint(round(total_area([Rectangle(2, 3), Circle(1)]), 2))   # 9.14\n```\n\n`total_area` never mentions a type, so adding a `Triangle` later requires no change to it — that is the practical payoff of polymorphism. The `NotImplementedError` in the base makes a forgotten override fail loudly; `abc.ABC` with `@abstractmethod` is stricter still, failing at instantiation rather than at first call.',
      },
      {
        prompt:
          'This subclass loses the parent\'s setup. Fix it and explain what breaks without the fix.\n\n```\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        self.breed = breed\n```',
        hint: 'Who sets `self.name` for a Dog?',
        solution:
          '```\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n```\n\nWithout the `super()` call, `Animal.__init__` never runs, so `self.name` is never assigned and any later access raises `AttributeError: Dog object has no attribute name` — typically far from the constructor, which is what makes it annoying to diagnose. Calling `super()` first also means parent state exists before the subclass touches it, which matters whenever the child\'s setup depends on it.',
      },
      {
        prompt:
          'Add the dunder methods that make this class support `len(m)`, `m[0]`, `m == other` and use as a dict key.\n\n```\nclass Matrix:\n    def __init__(self, rows):\n        self.rows = tuple(tuple(r) for r in rows)\n```',
        hint: 'Four methods — and one of them is required as soon as you define another.',
        solution:
          '```\nclass Matrix:\n    def __init__(self, rows):\n        self.rows = tuple(tuple(r) for r in rows)\n\n    def __len__(self):\n        return len(self.rows)\n\n    def __getitem__(self, i):\n        return self.rows[i]\n\n    def __eq__(self, other):\n        if not isinstance(other, Matrix):\n            return NotImplemented\n        return self.rows == other.rows\n\n    def __hash__(self):\n        return hash(self.rows)\n\n    def __repr__(self):\n        return f"Matrix({list(self.rows)})"\n```\n\nThe `__hash__` is the one people forget: defining `__eq__` sets `__hash__` to `None`, so without it the object cannot be a dict key or set member. Hashing the same tuple that `__eq__` compares keeps the two consistent, which is the invariant Python requires — equal objects must have equal hashes. Storing the rows as tuples is what makes that hash legal in the first place.',
      },
    ],

    quiz: [
      {
        id: 'PY-016-q1',
        type: 'code-output',
        language: 'python',
        concept: 'overriding and polymorphism',
        prompt: 'What does this print?',
        code: 'class A:\n    def speak(self): return "a"\n    def go(self): return self.speak() * 2\n\nclass B(A):\n    def speak(self): return "b"\n\nprint(B().go())',
        options: ['bb', 'aa', 'ab', 'It raises an AttributeError'],
        answerIndex: 0,
        explanation:
          '`go` is inherited from `A` but calls `self.speak()`, which is resolved on the actual instance at run time and finds `B`\'s override. That late binding is what makes shared base-class logic useful.',
      },
      {
        id: 'PY-016-q2',
        type: 'debug',
        language: 'python',
        concept: 'missing super().__init__',
        prompt: 'Why does `Dog("rex", "collie").name` raise `AttributeError`?',
        code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        self.breed = breed',
        options: [
          'The subclass `__init__` overrides the parent\'s and never calls `super().__init__(name)`',
          'Subclasses cannot add new parameters to `__init__`',
          '`name` must be declared as a class attribute on `Animal`',
          '`Dog` must inherit from `object` explicitly',
        ],
        answerIndex: 0,
        explanation:
          'Defining `__init__` in the subclass replaces the parent\'s entirely. Only an explicit `super().__init__(name)` runs it, and without that `self.name` is never assigned.',
      },
      {
        id: 'PY-016-q3',
        type: 'truefalse',
        concept: 'duck typing',
        prompt: 'A function that calls `thing.speak()` requires `thing` to inherit from a common base class.',
        answer: false,
        explanation:
          'Python resolves attributes on the actual object at call time, so anything with a `speak` method works regardless of ancestry. `typing.Protocol` lets you declare that expectation for a type checker without requiring inheritance.',
      },
      {
        id: 'PY-016-q4',
        type: 'match',
        concept: 'dunder methods',
        prompt: 'Match each dunder method to the syntax that triggers it.',
        pairs: [
          { left: '`__len__`', right: '`len(x)`' },
          { left: '`__getitem__`', right: '`x[0]`' },
          { left: '`__eq__`', right: '`x == y`' },
          { left: '`__iter__`', right: '`for i in x`' },
          { left: '`__enter__` / `__exit__`', right: '`with x:`' },
        ],
        explanation:
          'Built-in functions and operators are dispatched to specially named methods, which is how a user-defined class can participate in ordinary Python syntax without any special casing in the interpreter.',
      },
      {
        id: 'PY-016-q5',
        type: 'mcq',
        concept: 'eq and hash',
        prompt: 'You define `__eq__` on a class and then use instances as dictionary keys. What happens?',
        options: [
          '`TypeError: unhashable type` — defining `__eq__` sets `__hash__` to None',
          'It works, using the default identity-based hash',
          'It works, and equal objects are automatically hashed equally',
          '`__eq__` is ignored for dictionary keys',
        ],
        answerIndex: 0,
        explanation:
          'Equal objects must hash equally, so Python removes the inherited identity hash when you define custom equality. You must define `__hash__` from the same fields, or use `@dataclass(frozen=True)` to get both.',
      },
      {
        id: 'PY-016-q6',
        type: 'multi',
        concept: 'inheritance versus composition',
        prompt: 'Which of these are good reasons to prefer composition over inheritance? Select all that apply.',
        options: [
          'You only want to reuse two methods, not the whole interface',
          'Inherited methods could bypass the invariants your class maintains',
          'You want to be able to swap the held object, including for a test double',
          'The subclass must be usable anywhere the parent is expected',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'The first three are the classic arguments for composition. Substitutability is the one situation that genuinely calls for inheritance — that is precisely what an "is a" relationship means.',
      },
      {
        id: 'PY-016-q7',
        type: 'explain',
        concept: 'polymorphism in practice',
        prompt: 'Explain how polymorphism removes conditionals, and why that matters when the code changes.',
        rubric: [
          'Describes calling one method name on objects that implement it differently',
          'Contrasts with an `if isinstance(...)` chain that must be edited for each new type',
          'Notes that adding a type becomes adding a class rather than editing existing code',
        ],
        sampleAnswer:
          'Without polymorphism, code that handles several kinds of thing grows a chain of type checks: if it is a rectangle compute this, if it is a circle compute that. Every new shape means finding and editing every such chain, and missing one produces a silent wrong answer rather than an error. With polymorphism, each type implements `area()` and the calling code simply calls it, so the chain disappears and adding a shape means adding a class — existing code is not touched and therefore cannot be broken. That is the open-closed principle stated concretely, and it matters most in code that has several such chains scattered across a codebase, because the failure mode of forgetting one is invisible. In Python the dispatch does not even require a shared base class, so the same benefit applies to objects from libraries you do not control, as long as they provide the method.',
        explanation:
          'The examinable idea is that polymorphism converts a maintenance problem — editing every conditional — into an extension problem, which is the core argument for object-oriented design.',
      },
    ],

    flashcards: [
      { front: 'What does `super()` do?', back: 'Dispatches to the next class in the instance\'s MRO, letting a subclass extend rather than replace inherited behaviour.' },
      { front: 'What is duck typing?', back: 'Python checks for the methods you use, not the declared type. Any object with the right methods works.' },
      { front: 'What triggers `__len__`?', back: '`len(x)` — and also truthiness, so `if x:` means "is it non-empty" once `__len__` is defined.' },
      { front: 'What happens if you define `__eq__` but not `__hash__`?', back: 'Python sets `__hash__` to `None`, so instances become unhashable and cannot be dict keys or set members.' },
      { front: 'Inheritance or composition?', back: 'Inheritance for "is a" and genuine substitutability; composition for "has a" and for reusing only part of an interface.' },
      { front: 'Why define `__repr__` before anything else?', back: 'The default shows a memory address, so every log line, debugger view and list of your objects is unreadable without it.' },
    ],

    challenge: {
      title: 'A small plugin system',
      brief:
        'Build an `Exporter` base class with a `render(rows)` method, plus `CsvExporter`, `JsonExporter` and `MarkdownExporter` subclasses. A `report(rows, exporter)` function must work with any of them without a single `isinstance` check, and must also accept a plain object from outside the hierarchy that merely defines `render` — prove this with a class that does not inherit from `Exporter`. Add `__repr__` to each exporter, give the base class a shared `header` helper that subclasses reuse via `super()`, and write a `typing.Protocol` describing the contract.',
      language: 'python',
      acceptanceCriteria: [
        '`report` contains no type checks and works with all four exporters',
        'At least one subclass calls `super()` to extend rather than replace inherited behaviour',
        'A non-inheriting class with a `render` method works through the same function',
        'A `Protocol` documents the expected interface and the code type-checks against it',
      ],
      starterCode:
        'from typing import Protocol\n\n\nclass Exporter:\n    def header(self, rows) -> str:\n        return f"{len(rows)} rows"\n\n    def render(self, rows) -> str:\n        raise NotImplementedError\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who can write classes what inheritance and polymorphism are, what `super()` is for, and why Python often does not need a shared base class at all.',
      mustCover: [
        'A subclass starts with everything the parent has and can override parts of it',
        'super() calls the parent version so a subclass can extend rather than replace',
        'Polymorphism means one method name with different implementations, removing type checks',
        'Duck typing means Python checks for the method, not the declared type',
      ],
      bonusSignals: ['mentions dunder methods hooking into built-in syntax', 'mentions preferring composition when the relationship is "has a"', 'mentions Protocol or abstract base classes'],
      sampleExplanation:
        "Inheritance lets you say 'this new class is like that one, with differences'. Write `class Dog(Animal):` and a dog already has everything an animal has; then you define `speak` in `Dog` and dogs use your version instead. Sometimes you do not want to throw the parent's version away — you want to do what it did and then add to it — and that is what `super()` is for: `super().speak()` gives you the inherited result to build on, and `super().__init__(name)` lets the parent set up the parts it owns before you add yours. The reason all this is worth the trouble is polymorphism. If dogs, cats and robots each define `speak`, then a loop that calls `speak` on a list of them gets the right answer for each, with no `if` statements about types anywhere — which means adding a new kind of thing later means writing a new class, not hunting through existing code for conditionals to edit. Python takes this one step further than most languages. It never asks what class an object belongs to; when you write `thing.speak()` it simply looks for a `speak` method and uses it. So the robot in that list did not have to inherit from anything — it just had to be able to speak. That same mechanism is why `len(x)` works on your own class the moment you define `__len__`: built-in syntax is quietly calling specially named methods, and defining them lets your objects behave like the ones that came with the language.",
    },
  },

  {
    id: 'PY-017',
    domain: 'PY',
    module: 'Pythonic Patterns',
    topic: 'Comprehensions',
    title: 'Comprehensions',
    slug: 'comprehensions',
    difficulty: 3,
    estimatedMinutes: 30,
    prerequisites: ['PY-011', 'PY-006'],
    related: ['PY-008', 'PY-009', 'PY-012'],
    tags: ['comprehension', 'list-comprehension', 'dict-comprehension', 'filtering', 'readability'],

    learningObjectives: [
      'Convert an append-in-a-loop into a list comprehension and back',
      'Add a filter with a trailing `if`, and a choice with a leading conditional expression',
      'Write dictionary and set comprehensions, and pick the right one for the task',
      'Handle nesting — both nested loops and nested comprehensions — without confusing the order',
      'Recognise when a comprehension has become less readable than the loop it replaced',
    ],

    terminology: [
      {
        term: 'Comprehension',
        definition:
          'An expression that builds a list, dict or set by describing the result in terms of an input iterable, rather than by mutating an accumulator.',
        simple: 'A one-line way to say "make a new collection out of this one".',
      },
      {
        term: 'Filter clause',
        definition:
          'A trailing `if` in a comprehension, which decides whether an item is included at all. Items that fail it simply do not appear.',
        simple: 'The part that says which items to keep.',
      },
      {
        term: 'Conditional expression in a comprehension',
        definition:
          'A leading `a if cond else b`, which chooses what value to produce for every item. Every item still appears in the output.',
        simple: 'The part that says what to produce, when the answer depends on the item.',
      },
      {
        term: 'Dict comprehension',
        definition:
          '`{k: v for ... }` — builds a mapping. Later duplicate keys overwrite earlier ones, exactly as with ordinary assignment.',
        simple: 'The same idea, but producing labelled pairs instead of a list.',
      },
      {
        term: 'Comprehension scope',
        definition:
          'A comprehension runs in its own function-like scope, so its loop variable does not leak into the surrounding code, unlike a `for` statement.',
        simple: 'The loop variable stays inside and does not spill out.',
      },
    ],

    simpleExplanation:
      "A comprehension is a way of describing a new collection in terms of an existing one. Instead of creating an empty list, looping, and appending, you say what you want in a single expression: `[x * 2 for x in numbers]` reads as \"x times two, for each x in numbers\". The loop is still there — Python is doing the same work — but the code now states the result rather than the procedure, which is why it reads better once you are used to it. You can add a trailing `if` to keep only some items, and you can put a conditional at the front to choose what value to produce. The same syntax with braces builds a dictionary or a set. Two things are worth knowing early. The order of the clauses in a nested comprehension is the same as the order you would write the nested loops, which is the opposite of what most people guess. And a comprehension is not automatically better: once it has two loops and two conditions, the plain loop is the kinder choice.",

    whyItExists:
      'The pattern of creating an empty collection, looping over a source and appending a transformed value is one of the most common shapes in all of programming, and writing it out puts the mechanics of accumulation in front of the intent. A comprehension expresses the transformation directly, removes the mutation, and lets the interpreter build the result more efficiently.',

    analogy: {
      scenario:
        "Compare two ways of describing a sandwich order to a kitchen. The first is a procedure: take a plate, put bread on it, add cheese, add the second slice, put it on the counter — repeat for each person. The second is a description: 'a cheese sandwich for everyone who is not vegan'. Both produce the same lunch, but the second states what you want and leaves the mechanics to the kitchen, so anyone reading the order sees the intent rather than the steps.",
      mapping: [
        { from: 'Listing every step of assembly', to: 'The explicit loop with `result = []` and `result.append(...)`' },
        { from: '"a cheese sandwich for everyone"', to: 'The comprehension expression and its `for` clause' },
        { from: '"...who is not vegan"', to: 'The trailing `if` filter clause' },
        { from: '"cheese for most, hummus for the vegans"', to: 'A leading conditional expression choosing the value' },
        { from: 'An order so elaborate nobody can follow it', to: 'A comprehension with several loops and conditions — write the loop instead' },
      ],
      bridge:
        'The distinction between "who gets one" and "what they get" is exactly the distinction between the two places a condition can appear. A trailing `if` filters, so some items produce nothing at all; a leading `a if c else b` transforms, so every item produces something. Confusing them is the most common comprehension error, and the analogy gives you the question to ask: am I deciding who is on the list, or what goes on their plate?',
      limitations:
        'A kitchen order is read once by a human. A comprehension is also executed, so unlike an order it has a cost — building an intermediate list of a million items uses a million items\' worth of memory, which is the problem generators solve in the next unit.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a comprehension',
        subject: '[ f(x)  for x in items  if cond(x) ]',
        annotations: [
          { part: '`f(x)` — the output expression', note: 'Evaluated once per surviving item. This is what ends up in the list.' },
          { part: '`for x in items`', note: 'The source. Any iterable: a list, a file, a generator, a dict.' },
          { part: '`if cond(x)` — the filter', note: 'Optional and trailing. Items that fail it produce nothing at all.' },
          { part: 'The brackets', note: '`[]` builds a list, `{}` with a colon builds a dict, `{}` without builds a set, `()` builds a generator.' },
          { part: 'Reading order', note: 'Read the `for` first, then the `if`, then the output expression — the reverse of how it is written.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Filter versus choose',
        caption: 'The two places a condition can appear mean completely different things.',
        left: {
          heading: 'Trailing `if` — filters',
          points: [
            '`[x for x in xs if x > 0]`',
            'Decides *whether* an item appears',
            'Output can be shorter than the input',
            'No `else` is allowed here',
          ],
        },
        right: {
          heading: 'Leading conditional — chooses',
          points: [
            '`[x if x > 0 else 0 for x in xs]`',
            'Decides *what value* each item produces',
            'Output is always the same length as the input',
            'The `else` is mandatory — it is an expression, not a statement',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The four comprehension forms',
        columns: ['Form', 'Example', 'Produces', 'Note'],
        rows: [
          ['List', '`[x*2 for x in xs]`', 'A list', 'Builds the whole thing in memory at once.'],
          ['Dict', '`{k: len(k) for k in words}`', 'A dict', 'Duplicate keys: the last one wins, silently.'],
          ['Set', '`{x % 3 for x in xs}`', 'A set', 'Deduplicates as it goes; order is not preserved.'],
          ['Generator', '`(x*2 for x in xs)`', 'A lazy generator', 'Computes on demand; no intermediate list. Covered next unit.'],
          ['Nested loops', '`[c for row in grid for c in row]`', 'A flattened list', 'Clause order matches the nested `for` statements.'],
          ['Nested comprehension', '`[[c*2 for c in row] for row in grid]`', 'A list of lists', 'Structure preserved; the inner one runs per row.'],
        ],
      },
      {
        kind: 'flow',
        title: 'Turning a loop into a comprehension',
        caption: 'A mechanical translation that works every time the loop only appends.',
        steps: [
          { label: 'Check the loop only appends', detail: 'If the body does anything else — printing, several statements, `break` — leave it as a loop.' },
          { label: 'Take the appended expression', detail: 'Whatever is inside `result.append(...)` becomes the output expression.' },
          { label: 'Copy the `for` clause verbatim', detail: 'Same variable, same iterable, written after the output expression.' },
          { label: 'Turn a wrapping `if` into a trailing filter', detail: 'A condition around the append becomes `if cond` at the end.' },
          { label: 'Delete the accumulator', detail: 'The `result = []` line and the `append` call both disappear.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Try the translations yourself',
        caption: 'Write the loop and the comprehension side by side and confirm they agree.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'A comprehension is an expression that evaluates to a new list, set or dict, consisting of an output expression followed by one or more `for` clauses and zero or more `if` clauses, evaluated left to right so that later clauses are nested inside earlier ones. In Python 3 a comprehension executes in its own implicit function scope, so its iteration variables do not bind in the enclosing namespace, though it may read enclosing names as a closure would.',

    codeExamples: [
      {
        language: 'python',
        title: 'From loop to comprehension, step by step',
        runnable: true,
        code: `words = ["alpha", "be", "gamma", "hi"]

# The loop
lengths = []
for w in words:
    if len(w) > 2:
        lengths.append(len(w))
print(lengths)

# The same thing, as a comprehension
print([len(w) for w in words if len(w) > 2])

# Filter (some items vanish) versus choose (every item produces something)
print([w for w in words if len(w) > 2])          # 2 items
print([w if len(w) > 2 else "??" for w in words]) # 4 items

# Both at once: choose a value, then filter the results
print([w.upper() if w.startswith("a") else w for w in words if len(w) > 2])`,
        output: `[5, 5]
[5, 5]
['alpha', 'gamma']
['ALPHA', '??', 'gamma', '??']
['ALPHA', 'gamma']`,
        explanation:
          'The first two blocks are the same computation, and the translation was mechanical: the appended expression moved to the front, the `for` line was copied, and the wrapping `if` became a trailing filter. The third and fourth lines are the distinction worth internalising — the filtered version has two elements while the conditional version has four, because a trailing `if` decides membership and a leading conditional decides value. The last line uses both, which is legal and about as complex as a comprehension should get before a loop becomes clearer.',
      },
      {
        language: 'python',
        title: 'Dict and set comprehensions',
        runnable: true,
        code: `words = ["alpha", "be", "gamma", "be"]
scores = {"ada": 92, "bob": 41, "cal": 78}

print({w: len(w) for w in words})              # duplicate key: last wins
print({w for w in words})                      # set: deduplicates
print({name: s for name, s in scores.items() if s >= 60})
print({s: name for name, s in scores.items()}) # invert a mapping

# Build a lookup from two sequences
keys, vals = ["a", "b"], [1, 2]
print({k: v for k, v in zip(keys, vals)})

# Normalise keys while filtering values
raw = {" Ada ": "92", "BOB": "n/a", "cal": "78"}
clean = {k.strip().lower(): int(v) for k, v in raw.items() if v.isdigit()}
print(clean)`,
        output: `{'alpha': 5, 'be': 2, 'gamma': 5}
{'alpha', 'be', 'gamma'}
{'ada': 92, 'cal': 78}
{92: 'ada', 41: 'bob', 78: 'cal'}
{'a': 1, 'b': 2}
{'ada': 92, 'cal': 78}`,
        explanation:
          'A dict comprehension needs a `key: value` pair before the `for`; without the colon you get a set. The duplicate `"be"` shows the silent overwrite behaviour, which is usually what you want and is occasionally a bug worth knowing about. The last example is the shape you will write most often in practice: clean the keys, convert the values and drop the bad rows, all in one readable line — and note that `if v.isdigit()` runs *before* `int(v)`, so the conversion never sees the value it would choke on.',
      },
      {
        language: 'python',
        title: 'Nesting: two loops versus two comprehensions',
        runnable: true,
        code: `grid = [[1, 2, 3], [4, 5, 6]]

# Two for clauses: FLATTENS. Clause order matches nested loops.
print([cell for row in grid for cell in row])

# Equivalent explicit loops, in the same order:
flat = []
for row in grid:
    for cell in row:
        flat.append(cell)
print(flat)

# A comprehension inside a comprehension: PRESERVES structure
print([[cell * 10 for cell in row] for row in grid])

# Filters can attach to either level
print([cell for row in grid for cell in row if cell % 2 == 0])

# The readability cliff
pairs = [(x, y) for x in range(3) for y in range(3) if x != y if x + y > 2]
print(pairs)`,
        output: `[1, 2, 3, 4, 5, 6]
[4, 5, 6]
[[10, 20, 30], [40, 50, 60]]
[2, 4, 6]
[(1, 2), (2, 1)]`,
        explanation:
          'The clause order in a flattening comprehension is the single most common confusion here, and the rule is simple: the `for` clauses appear in exactly the order you would write the nested `for` statements, outermost first. Note the output of the explicit loop version — it printed `[4, 5, 6]` rather than the full six elements, because `flat` was rebound rather than extended, which is precisely the kind of accumulator bug a comprehension cannot have. The final line is legal, chains two filters, and is past the point where anyone should be reading it as an expression.',
      },
      {
        language: 'python',
        title: 'Scope, and when not to use a comprehension',
        runnable: true,
        code: `# The loop variable does NOT leak out of a comprehension
squares = [i * i for i in range(3)]
try:
    print(i)
except NameError as e:
    print("NameError:", e)

# But a for STATEMENT does leak
for j in range(3):
    pass
print("j survived:", j)

# Bad: a comprehension used for side effects
results = []
[results.append(x) for x in range(3)]     # builds a throwaway list of Nones
print(results)

# Good: say what you mean
results = list(range(3))
print(results)

# Bad: too much logic in one expression
data = [1, -2, 3, -4]
print([("pos" if x > 0 else "neg") + str(abs(x)) for x in data if abs(x) != 2])`,
        output: `NameError: name 'i' is not defined
j survived: 2
[0, 1, 2]
[0, 1, 2]
['pos1', 'pos3', 'neg4']
`,
        explanation:
          'The scope difference is a small but genuine benefit: a comprehension cannot accidentally clobber a name you were using, while a `for` statement leaves its variable behind. The side-effect example is the anti-pattern to avoid — it builds a list of `None` values purely to discard it, which misleads every reader into looking for a result that does not exist. If you want a loop, write a loop. The final line is syntactically fine and genuinely harder to read than the four-line loop it replaces, which is the practical limit: a comprehension should be readable in one pass, and when it is not, the loop is the better code.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Cleaning a column of records',
        usage:
          '`[row["email"].strip().lower() for row in rows if row.get("email")]` is the standard shape for extracting and normalising a field while dropping missing values, in a single readable line.',
      },
      {
        context: 'Building a feature lookup',
        usage:
          '`{col: df[col].mean() for col in numeric_cols}` produces a mapping of column to statistic — the kind of summary dictionary that then gets logged or used to fill missing values.',
      },
      {
        context: 'Selecting files to process',
        usage:
          '`[p for p in Path("data").iterdir() if p.suffix == ".csv"]` filters a directory listing, and reads much closer to the sentence you would say aloud than the equivalent loop.',
      },
      {
        context: 'Preparing batches for a model',
        usage:
          '`[tokenizer(t) for t in texts]` is how a list of strings becomes a list of encodings. Switching the brackets to parentheses turns it into a generator, which is what you do when the corpus will not fit in memory.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: 'Comprehensions build the lists and dicts you pass to `DataFrame`; for per-row work on an existing frame, vectorised operations are faster.' },
      { tool: 'NumPy', role: 'A comprehension over an array is usually the slow path — `arr * 2` does the same work in C.' },
      { tool: 'pathlib', role: 'Directory filtering with comprehensions over `iterdir()` or `glob()` is standard in data-loading scripts.' },
      { tool: 'itertools', role: '`chain.from_iterable(grid)` is an alternative to a flattening comprehension, and lazier.' },
    ],

    commonMistakes: [
      {
        mistake: 'Confusing the filtering `if` with the choosing conditional',
        why: 'A trailing `if` decides membership and takes no `else`; a leading `a if c else b` decides the value and requires one. Using the wrong one changes the output length.',
        fix: 'Ask whether every input item should produce an output item. If yes, the conditional goes at the front with an `else`; if no, the `if` goes at the end.',
      },
      {
        mistake: 'Getting the clause order wrong when flattening',
        why: 'People write `[cell for cell in row for row in grid]`, which raises `NameError` because `row` is used before the clause that defines it.',
        fix: 'Write the nested loops first, then read the `for` lines top to bottom into the comprehension in that same order.',
      },
      {
        mistake: 'Using a comprehension for side effects',
        why: 'It builds and discards a list of `None`s, wasting memory and telling the reader a result is being produced when none is.',
        fix: 'Use an ordinary `for` loop. A comprehension is for building a collection; a loop is for doing things.',
      },
      {
        mistake: 'Cramming several loops and conditions into one expression',
        why: 'Readability drops sharply after one `for` and one `if`, and a comprehension cannot be stepped through in a debugger line by line.',
        fix: 'Split into named intermediate steps, or write the loop. Being clever here has no payoff; the generated bytecode is nearly identical.',
      },
      {
        mistake: 'Building a huge list when you only iterate over it once',
        why: 'A list comprehension materialises everything, so a ten-million-row file becomes ten million objects in memory at once.',
        fix: 'Use a generator expression — the same syntax with parentheses — when the result is consumed once, as in `sum(x for x in ...)`.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between `[x for x in xs if c]` and `[x if c else y for x in xs]`?',
        answer:
          'The first is a filter: the trailing `if` decides whether each item appears at all, so the output can be shorter than the input, and no `else` is permitted because there is nothing to produce for a rejected item. The second is a conditional expression in the output position: it decides *what value* to produce for each item, so the output is always exactly as long as the input, and the `else` is mandatory because an expression must always yield a value. They can be combined — `[f(x) if c else g(x) for x in xs if keep(x)]` — and reading that correctly requires knowing which condition is doing which job. The practical test is whether the result should have the same number of elements as the input.',
      },
      {
        level: 'intermediate',
        question: 'When is a comprehension the wrong choice?',
        answer:
          'When it is doing something other than building a collection, or when it has stopped being readable in one pass. Using one for side effects — `[print(x) for x in xs]` — builds and throws away a list of `None`s and misleads the reader about intent, so a plain loop is correct. Anything needing multiple statements, `break`, `continue` or a `try/except` inside the body cannot be a comprehension at all. Beyond about one `for` and one `if`, comprehension density becomes a readability cost with no performance benefit, and it also cannot be stepped through in a debugger. Finally, when the result is consumed once and could be large, a list comprehension is the wrong shape because it materialises everything — a generator expression does the same work lazily.',
        followUp:
          'A strong answer notes that comprehensions are modestly faster than an append loop because they avoid repeated attribute lookup on `.append`, but that this is rarely the reason to choose one.',
      },
      {
        level: 'internship',
        question: 'What does `[[cell for cell in row] for row in grid]` produce, and how does it differ from `[cell for row in grid for cell in row]`?',
        answer:
          'The first is a comprehension whose output expression is itself a comprehension, so it produces a list of lists with the same shape as `grid` — one inner list per row, and the inner comprehension runs once per row. The second has two `for` clauses in a single comprehension, which nest left to right exactly as the equivalent nested `for` statements would, so it flattens the grid into a single list of cells. The clause order is the part people get wrong: the outer loop comes first, so `for row in grid` must precede `for cell in row`, and writing them the other way raises `NameError` because `row` is referenced before its clause introduces it. As a rule of thumb, brackets in the output position preserve structure while additional `for` clauses flatten it.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Convert this loop into a comprehension:\n\n```\nout = []\nfor w in words:\n    if w.isalpha():\n        out.append(w.lower())\n```',
        hint: 'The appended expression goes first, the `for` next, the condition last.',
        language: 'python',
        starterCode: 'words = ["Alpha", "b2", "Gamma"]\n',
        solution:
          '```\nout = [w.lower() for w in words if w.isalpha()]\n```\n\nThe translation is mechanical whenever the loop body does nothing but append: take what is inside `append(...)`, copy the `for` line unchanged, and turn the wrapping `if` into a trailing filter. Note the evaluation order — `isalpha()` is checked before `lower()` is called, because filters run before the output expression, which matters when the transformation would fail on the rejected items.',
      },
      {
        prompt:
          'Given `temps = [12, -3, 25, -8]`, produce two results: a list containing only the positive values, and a list of the same length where negatives are replaced by 0.',
        hint: 'One of these is a filter; the other is a choice.',
        solution:
          '```\npositives = [t for t in temps if t > 0]        # [12, 25]\nclamped   = [t if t > 0 else 0 for t in temps] # [12, 0, 25, 0]\n```\n\nThe first has two elements and the second has four, which is the clearest demonstration of the distinction. The trailing `if` is a membership test and takes no `else`; the leading conditional is an expression that must always yield a value, so its `else` is compulsory.',
      },
      {
        prompt:
          'From `records = [{"name": " Ada ", "score": "92"}, {"name": "Bob", "score": "n/a"}]`, build a dictionary mapping cleaned lowercase names to integer scores, skipping any record whose score is not numeric.',
        hint: 'Filter before you convert, or the conversion will raise.',
        solution:
          '```\nclean = {\n    r["name"].strip().lower(): int(r["score"])\n    for r in records\n    if r["score"].isdigit()\n}\nprint(clean)   # {\'ada\': 92}\n```\n\nThe filter clause is evaluated before the key and value expressions, so `int()` never sees `"n/a"` — putting the conversion in without the guard would raise `ValueError: invalid literal for int()`. Splitting the comprehension across lines like this is normal and encouraged once it has more than one clause; the formatting is what keeps it readable.',
      },
    ],

    quiz: [
      {
        id: 'PY-017-q1',
        type: 'code-output',
        language: 'python',
        concept: 'filter versus choose',
        prompt: 'What are the lengths of these two results?',
        code: 'xs = [1, -2, 3, -4]\na = [x for x in xs if x > 0]\nb = [x if x > 0 else 0 for x in xs]\nprint(len(a), len(b))',
        options: ['2 4', '4 4', '2 2', '4 2'],
        answerIndex: 0,
        explanation:
          'The trailing `if` filters, so `a` keeps only the two positives. The leading conditional chooses a value for every item, so `b` has one element per input and is always the same length as `xs`.',
      },
      {
        id: 'PY-017-q2',
        type: 'code-output',
        language: 'python',
        concept: 'nested clause order',
        prompt: 'What does this print?',
        code: 'grid = [[1, 2], [3, 4]]\nprint([c for row in grid for c in row])',
        options: ['[1, 2, 3, 4]', '[[1, 2], [3, 4]]', '[1, 3, 2, 4]', 'It raises a NameError'],
        answerIndex: 0,
        explanation:
          'Two `for` clauses nest left to right exactly like nested `for` statements, so this flattens the grid. Writing the clauses in the other order raises `NameError`, since `row` would be used before its clause introduces it.',
      },
      {
        id: 'PY-017-q3',
        type: 'debug',
        language: 'python',
        concept: 'comprehension misuse',
        prompt: 'What is wrong with this line, even though it produces the right side effect?',
        code: '[print(x) for x in range(3)]',
        options: [
          'It builds and discards a list of three `None` values, and misleads the reader into expecting a result',
          '`print` cannot be used inside a comprehension',
          'It will raise a `TypeError` because print returns nothing',
          'The comprehension needs a trailing `if` clause',
        ],
        answerIndex: 0,
        explanation:
          'A comprehension exists to build a collection. Using one purely for side effects allocates a throwaway list and signals intent that is not there. A plain `for` loop is both clearer and cheaper.',
      },
      {
        id: 'PY-017-q4',
        type: 'mcq',
        concept: 'dict comprehension',
        prompt: 'What does `{w: len(w) for w in ["be", "be", "at"]}` produce?',
        options: [
          "`{'be': 2, 'at': 2}`",
          "`{'be': 2, 'be': 2, 'at': 2}`",
          "`{'be', 'at'}`",
          'It raises a `ValueError` for the duplicate key',
        ],
        answerIndex: 0,
        explanation:
          'Keys are unique, so the second `"be"` overwrites the first silently — exactly as repeated assignment would. The result has two entries.',
      },
      {
        id: 'PY-017-q5',
        type: 'truefalse',
        concept: 'comprehension scope',
        prompt: 'After `squares = [i * i for i in range(3)]`, the name `i` is available in the surrounding scope.',
        answer: false,
        explanation:
          'In Python 3 a comprehension runs in its own implicit function scope, so its loop variable does not leak. A `for` statement, by contrast, does leave its variable bound afterwards.',
      },
      {
        id: 'PY-017-q6',
        type: 'multi',
        concept: 'when a loop is better',
        prompt: 'In which situations should you write a loop rather than a comprehension? Select all that apply.',
        options: [
          'The body needs a `try/except`',
          'You need to `break` out early',
          'You are transforming every element of a list',
          'The body is several statements long',
          'The expression would need three `for` clauses and two conditions',
        ],
        answerIndices: [0, 1, 3, 4],
        explanation:
          'Comprehensions are single expressions, so statements, exception handling and early exit are impossible inside one. Excessive clause count is a readability judgement rather than a rule, but the answer is the same. A straightforward element-wise transformation is exactly what comprehensions are for.',
      },
      {
        id: 'PY-017-q7',
        type: 'explain',
        concept: 'readability trade-off',
        prompt: 'Explain why a comprehension is usually clearer than the equivalent loop, and where that stops being true.',
        rubric: [
          'Notes that the comprehension states the result rather than the accumulation mechanics',
          'Notes that it removes the mutable accumulator and cannot suffer accumulator bugs',
          'Identifies the point where density becomes a cost: multiple clauses, side effects, or logic that needs statements',
        ],
        sampleAnswer:
          'The loop version spends three of its four lines on bookkeeping — creating an empty list, appending, and managing the variable — so the reader has to reconstruct the intent from the mechanics. The comprehension states the transformation directly and reads close to the sentence you would say out loud, and because there is no accumulator there is no way to rebind it by accident or forget to append on one branch. That advantage holds while the expression can be taken in at a single glance: roughly one `for` clause and one condition. Beyond that, each extra clause adds nesting that the reader must unfold mentally without the visual cues that indentation provides in a loop, and a comprehension cannot be stepped through in a debugger or hold a `try/except`. At that point the loop is the more readable code, and there is no performance argument for the comprehension worth the trade.',
        explanation:
          'The examinable judgement is that comprehensions are a readability tool with a threshold, not a style rule to apply everywhere.',
      },
    ],

    flashcards: [
      { front: 'Trailing `if` versus leading conditional', back: 'Trailing `if` filters which items appear (no `else`). Leading `a if c else b` chooses each item\'s value (`else` required).' },
      { front: 'How do you flatten a grid with a comprehension?', back: '`[c for row in grid for c in row]` — clause order matches the nested `for` statements, outermost first.' },
      { front: 'What does `{k: v for ...}` build versus `{v for ...}`?', back: 'With a colon, a dict; without, a set. Duplicate dict keys are silently overwritten.' },
      { front: 'Does a comprehension leak its loop variable?', back: 'No. It runs in its own scope, unlike a `for` statement, which leaves its variable bound.' },
      { front: 'When should a comprehension become a loop?', back: 'When it needs statements, `break`, or `try/except`, when it is used for side effects, or when it needs more than about two clauses.' },
      { front: 'How do you avoid materialising a huge list?', back: 'Use a generator expression — the same syntax with parentheses — when the result is consumed only once.' },
    ],

    challenge: {
      title: 'One pass over messy records',
      brief:
        'You are given a list of dictionaries with inconsistent keys, whitespace and types. Using comprehensions only, produce: a list of cleaned lowercase names for records that have one; a dictionary mapping name to integer score, skipping non-numeric scores; a set of the distinct departments; and a flattened list of every tag across all records. Then write one of the four as an explicit loop and add a comment arguing which version you would keep in a code review and why.',
      language: 'python',
      acceptanceCriteria: [
        'Each of the four results is produced by a single comprehension of the appropriate type',
        'Non-numeric scores are filtered out before any conversion is attempted',
        'The tag flattening uses two `for` clauses in the correct order',
        'The comment makes a specific readability argument rather than asserting a style rule',
      ],
      starterCode:
        'records = [\n    {"name": " Ada ", "score": "92", "dept": "eng", "tags": ["ml", "py"]},\n    {"name": "Bob", "score": "n/a", "dept": "ops", "tags": []},\n    {"score": "78", "dept": "eng", "tags": ["sql"]},\n]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who writes loops confidently what a comprehension is, how the two kinds of condition differ, and when not to use one.',
      mustCover: [
        'A comprehension builds a new collection from an existing iterable in a single expression',
        'A trailing `if` filters which items appear',
        'A leading conditional chooses what value each item produces and requires an else',
        'Comprehensions stop being clearer once they need several clauses or statements',
      ],
      bonusSignals: ['explains the clause order when flattening', 'mentions dict and set comprehensions', 'mentions not using them for side effects'],
      sampleExplanation:
        "A comprehension is a way of describing a collection instead of assembling one. The loop version of doubling a list takes four lines: make an empty list, walk the original, work out the new value, append it. The comprehension says the same thing in one — `[x * 2 for x in numbers]` — and you can read it left to right as 'x times two, for each x in numbers'. The same work is happening underneath; what has gone is the bookkeeping, and with it the chance of forgetting to append on one branch or accidentally rebinding the accumulator. You can put a condition in either of two places, and they do completely different jobs. On the end, `[x for x in xs if x > 0]`, it decides who gets in, so the result can be shorter than the input. At the front, `[x if x > 0 else 0 for x in xs]`, it decides what each one turns into, so the result always has exactly as many items as you started with — and the `else` there is compulsory, because an expression has to produce something for every item. Swap the braces and you get a dictionary or a set instead of a list. The one thing worth saying about restraint: a comprehension is better than a loop while you can still read it in one go. Once it needs two loops and two conditions, or needs to catch an exception, or is only there for its side effects, the plain loop is the better code and nobody will be impressed by the one-liner.",
    },
  },

  {
    id: 'PY-018',
    domain: 'PY',
    module: 'Pythonic Patterns',
    topic: 'Lazy iteration',
    title: 'Iterators and Generators',
    slug: 'iterators-and-generators',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['PY-011', 'PY-017'],
    related: ['PY-006', 'PY-012', 'PY-015'],
    tags: ['iterator', 'generator', 'yield', 'lazy', 'itertools', 'memory', 'streaming'],

    learningObjectives: [
      'Explain what the iterator protocol is and what a `for` loop is really doing underneath',
      'Write a generator function with `yield` and describe how execution suspends and resumes',
      'Choose between a list comprehension and a generator expression based on memory and reuse',
      'Use `itertools` building blocks such as `islice`, `chain`, `groupby` and `count` on real streams',
      'Diagnose the two classic generator bugs: a one-shot iterator consumed twice, and a generator whose body never runs',
    ],

    terminology: [
      {
        term: 'Iterable',
        definition:
          'Any object that can produce an iterator when passed to `iter()`. Lists, strings, dicts, files and generators are all iterables.',
        simple: 'Anything you are allowed to put after `for x in`.',
      },
      {
        term: 'Iterator',
        definition:
          'An object with a `__next__` method that hands back one item at a time and raises `StopIteration` when exhausted. It also has `__iter__`, which returns itself.',
        simple: 'A bookmark that remembers where you had got to.',
      },
      {
        term: 'Generator function',
        definition:
          'A function containing at least one `yield`. Calling it does not run the body; it returns a generator object, which is an iterator whose state is the paused function frame.',
        simple: 'A function that hands back one result at a time and pauses in between.',
      },
      {
        term: 'Generator expression',
        definition:
          'Comprehension syntax written with parentheses, `(x * 2 for x in xs)`, producing a lazy iterator rather than a materialised list.',
        simple: 'A comprehension that computes items only as you ask for them.',
      },
      {
        term: 'Laziness',
        definition:
          'The property of computing each value only at the moment it is requested, so that work you never consume is never performed and values you have passed are free to be collected.',
        simple: 'Do the work only when someone actually asks for the answer.',
      },
      {
        term: 'Exhaustion',
        definition:
          'The one-way end state of an iterator. Once `StopIteration` has been raised, every further `next()` also raises it; iterators cannot be rewound.',
        simple: 'Once you have read to the end, there is nothing left to read.',
      },
    ],

    simpleExplanation:
      "Imagine someone asks you to read out every word in a very long book. One way is to copy the whole book onto cards first, one word per card, then read the cards. That works for a short book and runs out of table space for a long one. The other way is simply to read, keeping a finger on the page so you always know where you are, and say one word at a time. Python has both. A list is the pile of cards: every item exists at once, taking up memory, and you can flip back to any of them. An iterator is the finger on the page: it knows only where you are and how to get the next word, and nothing else exists yet. A generator is how you write your own finger-on-the-page reader. You write what looks like an ordinary function, but instead of `return` you use `yield`, which means hand this value back and freeze right here. When the next value is wanted, the function unfreezes exactly where it stopped, with all its variables intact, and carries on.",

    whyItExists:
      'Real data outgrows memory long before it outgrows disk: a 40 GB log file, a database cursor, an infinite sensor stream. Iterators exist so that a single uniform loop syntax can walk any of these without ever holding all of it at once, and generators exist so that writing such a producer costs four lines rather than a class with two dunder methods and hand-managed state.',

    analogy: {
      scenario:
        'A restaurant kitchen can serve a tasting menu in two ways. The banquet approach cooks all twelve courses first and lines them up on a huge pass; you need an enormous kitchen, the later courses go cold, and if the guest leaves after course three you have wasted nine dishes. The tasting approach cooks a course only when the previous plate comes back. The chef keeps a ticket showing which course is next, the kitchen stays small, and if the guest leaves early the remaining courses are never cooked at all.',
      mapping: [
        { from: 'Cooking all twelve courses up front', to: 'Building a list — every element computed and stored immediately' },
        { from: 'Cooking one course on demand', to: 'A generator yielding one item per `next()` call' },
        { from: 'The ticket showing which course is next', to: 'The iterator’s internal position, the frozen function frame' },
        { from: 'The guest leaving after course three', to: 'Breaking out of a loop early, so the remaining items are never computed' },
        { from: 'The kitchen being small regardless of menu length', to: 'Constant memory use, independent of how many items flow through' },
        { from: 'Not being able to re-serve a course already eaten', to: 'Iterator exhaustion — you cannot rewind' },
      ],
      bridge:
        'The mapping is mechanically accurate: a generator really does hold a suspended stack frame the way the ticket holds the chef’s place, and it really does perform no work for items nobody requests. This is also why the memory argument is about peak usage rather than total work — the same twelve courses get cooked either way if the guest eats them all; only the number sitting on the pass at once differs.',
      limitations:
        'The analogy undersells one cost. A list can be measured, sorted, indexed and walked twice; a generator can do none of these. Length is unknowable without consuming it, and consuming it destroys it. Laziness buys memory and pays in flexibility.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What `for item in thing:` actually does',
        caption: 'The loop you have written a hundred times expands into four steps.',
        steps: [
          { label: 'Call `iter(thing)`', detail: 'Python asks the iterable for a fresh iterator. A list hands back a new list_iterator; a generator hands back itself.' },
          { label: 'Call `next(it)`', detail: 'Ask for one item. For a generator this resumes the frozen function body until the next `yield`.' },
          { label: 'Bind and run the body', detail: 'The yielded value is bound to `item` and the loop body executes once.' },
          { label: 'Repeat until `StopIteration`', detail: 'The iterator signals exhaustion by raising `StopIteration`, which the `for` statement catches silently.' },
          { label: 'Loop ends', detail: 'Control moves to the `else` clause if present, then past the loop. Nothing is rewound.' },
        ],
      },
      {
        kind: 'compare',
        title: 'List comprehension versus generator expression',
        caption: 'Same syntax, one bracket apart, very different runtime behaviour.',
        left: {
          heading: '[x for x in src]  — list',
          points: [
            'All items computed before the next line runs',
            'Memory grows with the number of items',
            'Can be indexed, sliced, len()-ed, sorted',
            'Can be iterated any number of times',
            'Right when the data is small or needed more than once',
          ],
        },
        right: {
          heading: '(x for x in src)  — generator',
          points: [
            'Nothing computed until something asks',
            'Memory is one item plus the frame, whatever the length',
            'No indexing, no len(), no slicing',
            'Single use — a second loop sees nothing',
            'Right for large or infinite streams consumed once',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a generator function',
        subject: 'def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1',
        annotations: [
          { part: 'def countdown(n)', note: 'Looks like any function. The presence of `yield` anywhere in the body is what makes it a generator function.' },
          { part: 'calling countdown(3)', note: 'Runs none of the body. It returns a generator object and the function is left paused before its first line.' },
          { part: 'yield n', note: 'Hands `n` to the caller and freezes the frame here, keeping `n` and the loop position alive.' },
          { part: 'n -= 1', note: 'Runs only when `next()` is called again — execution resumes on the line after the `yield`.' },
          { part: 'falling off the end', note: 'When the function returns, Python raises `StopIteration` automatically. The generator is now exhausted forever.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Trace a generator step by step',
        caption: 'Run a generator and a list version side by side and watch when each value is actually computed.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'An iterable is an object implementing `__iter__`, which returns an iterator. An iterator implements `__next__`, returning the next value or raising `StopIteration`, and `__iter__` returning itself. A generator function is a function whose body contains `yield`; calling it constructs a generator object that implements the iterator protocol, where each `__next__` resumes the suspended frame until the next `yield` and each `yield` suspends it again, preserving all local state.',

    codeExamples: [
      {
        language: 'python',
        title: 'The protocol, by hand and then with yield',
        runnable: true,
        code: `# 1. The protocol, written out explicitly.
class Countdown:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return self                 # I am my own iterator

    def __next__(self):
        if self.n <= 0:
            raise StopIteration     # the agreed "nothing left" signal
        self.n -= 1
        return self.n + 1

# 2. Exactly the same behaviour, four lines instead of eleven.
def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(Countdown(3)))
print(list(countdown(3)))

# A for loop is just sugar for the protocol:
it = iter(countdown(2))
print(next(it), next(it))
try:
    next(it)
except StopIteration:
    print("exhausted")`,
        output: `[3, 2, 1]
[3, 2, 1]
2 1
exhausted`,
        explanation:
          'The class version shows what the protocol demands: `__iter__` to hand back an iterator and `__next__` to produce one value or raise `StopIteration`. The generator version produces an object satisfying exactly the same protocol, but Python writes the state machine for you — `n` and the position inside the `while` loop are kept alive in the suspended frame instead of in attributes you maintain by hand.',
      },
      {
        language: 'python',
        title: 'Laziness is a memory argument, and you can measure it',
        runnable: true,
        code: `import sys

n = 1_000_000
as_list = [x * x for x in range(n)]
as_gen = (x * x for x in range(n))

print("list bytes:", sys.getsizeof(as_list))
print("gen bytes: ", sys.getsizeof(as_gen))
print("same total:", sum(as_list) == sum(x * x for x in range(n)))

# Laziness also means unconsumed work is never done at all.
calls = 0
def expensive(x):
    global calls
    calls += 1
    return x * x

first_three = [expensive(x) for x in range(1000)][:3]
print("eager calls:", calls)

calls = 0
lazy = (expensive(x) for x in range(1000))
first_three = [next(lazy) for _ in range(3)]
print("lazy calls: ", calls)`,
        output: `list bytes: 8448728
gen bytes:  200
same total: True
eager calls: 1000
lazy calls:  3`,
        explanation:
          'The list holds a million integers and costs about eight megabytes; the generator holds a paused frame and costs two hundred bytes regardless of length. The second half makes the sharper point: the eager version called `expensive` a thousand times to throw away 997 results, while the lazy version called it three times. Laziness saves memory *and* the work you never consume — which is why slicing a generator with `itertools.islice` is not the same thing as slicing a list.',
      },
      {
        language: 'python',
        title: 'Streaming a file that does not fit in memory',
        runnable: true,
        code: `import itertools, json

def read_events(path):
    """Yield one parsed record per line. Memory stays constant at any file size."""
    with open(path, encoding="utf-8") as f:
        for line_no, line in enumerate(f, start=1):
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                print(f"skipping malformed line {line_no}")

def only_errors(events):
    for e in events:
        if e.get("level") == "ERROR":
            yield e

# A pipeline: each stage is lazy, so one record flows through all of them at a time.
events = read_events("app.log")
errors = only_errors(events)
messages = (e["msg"] for e in errors)

for msg in itertools.islice(messages, 5):
    print(msg)`,
        output: `skipping malformed line 3
disk quota exceeded
connection reset by peer
model checkpoint not found
token budget exhausted
upstream 504`,
        explanation:
          'This is the pattern that makes generators worth learning. A file object is already an iterator over lines, so nothing is read until the loop asks. Each stage is itself a generator, so the three stages compose into a pipeline where exactly one record is in flight at any moment. `islice` stops after five, and because everything upstream is lazy, the rest of the file is never read, parsed or filtered — the program can finish having touched a few kilobytes of a forty-gigabyte file.',
      },
      {
        language: 'python',
        title: 'The itertools tools worth memorising',
        runnable: true,
        code: `from itertools import count, islice, chain, groupby, tee, accumulate

# count: an infinite counter — safe only because islice stops it
squares = (x * x for x in count(1))
print(list(islice(squares, 5)))

# chain: treat several iterables as one stream, without concatenating them
print(list(chain([1, 2], (3, 4), "56")))

# accumulate: running totals, useful for cumulative metrics
print(list(accumulate([3, 1, 4, 1, 5])))

# groupby: groups CONSECUTIVE equal keys — sort first or be surprised
rows = [("eng", "ada"), ("eng", "bob"), ("ops", "cy"), ("eng", "dee")]
for dept, group in groupby(rows, key=lambda r: r[0]):
    print(dept, [name for _, name in group])

# tee: two independent readers over one source, at the cost of buffering
a, b = tee(iter([1, 2, 3]))
print(sum(a), max(b))`,
        output: `[1, 4, 9, 16, 25]
[1, 2, 3, 4, '5', '6']
[3, 4, 8, 9, 14]
eng ['ada', 'bob']
ops ['cy']
eng ['dee']
3 3`,
        explanation:
          '`count` shows that infinite streams are ordinary objects as long as something downstream stops them. `chain` avoids building a concatenated copy. `accumulate` gives running totals in one pass. The `groupby` output is the one to burn into memory: `eng` appears twice because `groupby` only ever groups *adjacent* equal keys, so the standard usage is `groupby(sorted(rows, key=k), key=k)`. `tee` buys you a second pass, but it must buffer everything consumed by the faster branch, so it silently reintroduces the memory cost you used a generator to avoid.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Training a model on data larger than RAM',
        usage:
          'A PyTorch `IterableDataset` or a Keras data generator yields batches one at a time from disk or from a remote store. Nothing else in the training loop changes — the loop still says `for batch in loader` — but the dataset can be a terabyte on a machine with 32 GB.',
      },
      {
        context: 'Paginated API clients',
        usage:
          'Every mature SDK exposes a paginator as a generator: `for issue in repo.iter_issues()` fetches page one, yields its 30 items, and only requests page two when item 31 is asked for. If you `break` after the first match, the remaining HTTP calls never happen.',
      },
      {
        context: 'Streaming LLM responses',
        usage:
          'A chat completion with `stream=True` returns a generator of token chunks. The user interface consumes it with a plain `for chunk in stream`, rendering text as it arrives rather than waiting for the full response, and can stop generation early by abandoning the iterator.',
      },
      {
        context: 'Log and event processing',
        usage:
          'Pipelines that parse, filter and aggregate nightly logs are written as chained generators so that memory is flat and a malformed line can be skipped without aborting the run.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch DataLoader', role: 'Iterates a dataset lazily, yielding batches; the iterator protocol is what makes custom datasets pluggable.' },
      { tool: 'pandas', role: '`pd.read_csv(..., chunksize=100_000)` returns an iterator of DataFrames, the standard trick for files bigger than memory.' },
      { tool: 'itertools', role: 'Standard-library toolkit of composable lazy operators used across data engineering code.' },
      { tool: 'Hugging Face datasets', role: '`load_dataset(..., streaming=True)` gives an iterable dataset over remote shards, never downloading the whole corpus.' },
    ],

    commonMistakes: [
      {
        mistake: 'Iterating the same generator twice and getting nothing the second time',
        why: 'A generator is an iterator, and iterators are one-shot. After the first loop drains it, every further `next()` raises `StopIteration` immediately, so the second loop body simply never runs — silently, with no error.',
        fix: 'If you need two passes, materialise once with `data = list(gen)` and loop over the list, or build a fresh generator by calling the generator function again. A useful habit: pass generator *functions* around, not generator objects.',
      },
      {
        mistake: 'Calling `len()` on a generator, or indexing it',
        why: 'Length would require consuming the whole stream, and indexing would require remembering everything already passed. Neither is possible for a lazy one-shot iterator, so you get `TypeError: object of type \'generator\' has no len()`.',
        fix: 'Use `sum(1 for _ in gen)` if you truly need a count and are willing to destroy the stream, or `itertools.islice(gen, i, i + 1)` for positional access. If you need both repeatedly, you wanted a list.',
      },
      {
        mistake: 'Expecting the generator body to run when you call the function',
        why: 'Calling a generator function only builds the object. A `print`, a validation check or an `open()` at the top of the body does not execute until the first `next()`, so errors surface far from the call site and resources are acquired later than you think.',
        fix: 'Validate arguments in a plain wrapper function that then returns the generator, so the checks run eagerly: `def read(path): _check(path); return _read_impl(path)`.',
      },
      {
        mistake: 'Returning a value from a generator and expecting to receive it',
        why: '`return x` inside a generator does not produce an item; it ends iteration and attaches `x` to the `StopIteration` exception, where almost nobody looks.',
        fix: 'Yield the final value instead, or if you genuinely need a return value, capture it with `value = yield from inner()` in a delegating generator.',
      },
      {
        mistake: 'Using `groupby` on unsorted data',
        why: '`itertools.groupby` groups only runs of consecutive equal keys, so an unsorted input produces the same key several times in separate groups and aggregates come out wrong.',
        fix: 'Sort by the same key function first: `groupby(sorted(rows, key=k), key=k)`. If sorting is too expensive, use a `collections.defaultdict(list)` instead.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between an iterable and an iterator?',
        answer:
          'An iterable is anything that can give you an iterator: it implements `__iter__`. An iterator is the thing that actually produces values: it implements `__next__` and raises `StopIteration` when done, and its `__iter__` returns itself. The practical consequence is reusability. A list is an iterable but not an iterator, so `iter(my_list)` gives a fresh cursor each time and you can loop over it repeatedly. A generator is both, and `iter()` on it returns the same exhausted object, which is exactly why looping over a generator twice gives you nothing the second time.',
        followUp:
          'A strong answer notes that this distinction is why a file object behaves like a generator — it is its own iterator — and why `for line in f` a second time yields nothing unless you `f.seek(0)`.',
      },
      {
        level: 'intermediate',
        question: 'When would you choose a generator over a list, and when is a list the right answer?',
        answer:
          'Choose a generator when the data may be large or unbounded, when it is consumed exactly once, and when you want to compose stages into a pipeline so that only one item is in flight — streaming a log file, paginating an API, feeding training batches. Choose a list when the data is small enough that memory is irrelevant, when you need it more than once, or when you need length, indexing, slicing or sorting, all of which require the whole collection. The honest summary is that generators trade random access and reuse for flat memory and early exit; if you are not getting one of those two benefits, a list is simpler and usually slightly faster.',
      },
      {
        level: 'ml-engineer',
        question: 'Your training script loads a 60 GB dataset with a list comprehension and the process is killed by the OOM killer. Walk me through the fix.',
        answer:
          'The comprehension materialises every example before training starts, so peak memory is the whole dataset plus the model. I would convert the loader into a generator that yields one example, or one batch, per iteration — reading from disk lazily so that memory is proportional to batch size rather than dataset size. In practice that means an `IterableDataset` or `pd.read_csv(chunksize=...)` rather than a list. Two things need care: shuffling can no longer be a global permutation, so you use a shuffle buffer of a few thousand examples; and the loader must be re-creatable, because each epoch needs a fresh iterator rather than the exhausted one from the previous epoch. I would also check that the preprocessing inside the generator is cheap enough not to starve the GPU, and use worker processes with prefetching if it is not.',
        followUp:
          'Mentioning that a generator cannot report `len()`, so epoch progress bars need an explicit `steps_per_epoch`, signals real experience.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write a generator `moving_average(stream, k)` that yields the mean of the last k values seen, producing nothing until it has seen k values. It must work on an infinite stream in constant memory.',
        hint: 'A `collections.deque(maxlen=k)` discards the oldest item automatically when it is full. Keep a running sum instead of re-summing the window.',
        language: 'python',
        starterCode: 'from collections import deque\n\ndef moving_average(stream, k):\n    ...\n',
        solution:
          'from collections import deque\n\ndef moving_average(stream, k):\n    window = deque(maxlen=k)\n    total = 0.0\n    for x in stream:\n        if len(window) == k:\n            total -= window[0]        # the value about to be evicted\n        window.append(x)\n        total += x\n        if len(window) == k:\n            yield total / k\n\nThe deque caps itself at k items, so memory is O(k) no matter how long the stream is, and the running total makes each output O(1) rather than O(k). The guard `if len(window) == k` is what suppresses output for the first k − 1 values. Test it against an infinite source to prove laziness: `list(islice(moving_average(count(1), 3), 4))` gives `[2.0, 3.0, 4.0, 5.0]`.',
      },
      {
        prompt:
          'Predict the output of this program, then explain the surprise:\n\n    g = (x * 2 for x in [1, 2, 3])\n    print(sum(g))\n    print(sum(g))\n    print(list(g))',
        hint: 'How many times can one iterator be drained?',
        solution:
          'The output is 12, then 0, then []. The first `sum` drains the generator completely. The generator is now exhausted, so the second `sum` receives no items at all and returns its start value of 0 — note that it does not raise, which is precisely why this bug is so hard to spot. `list(g)` likewise sees nothing and returns an empty list. The fix depends on intent: `values = [x * 2 for x in [1, 2, 3]]` if you need it more than once, or rebuild the generator expression before each use.',
      },
      {
        prompt:
          'A colleague writes `def load(path): print("loading", path); with open(path) as f: for line in f: yield line`. They report that "loading" never prints when they call `load("data.txt")`. Explain why, and restructure the function so that a missing file raises immediately at the call site.',
        hint: 'What does calling a generator function actually execute?',
        solution:
          'Calling a generator function runs none of the body — it only constructs a generator object — so the `print` and the `open` are deferred until the first `next()`. If the path is wrong, the `FileNotFoundError` surfaces inside whatever loop eventually consumes the generator, often in an unrelated part of the program. The fix is to split eager from lazy:\n\n    def load(path):\n        f = open(path, encoding="utf-8")   # fails here, at the call site\n        print("loading", path)\n        return _iter_lines(f)\n\n    def _iter_lines(f):\n        with f:\n            for line in f:\n                yield line\n\nThe outer function is a normal function, so its body runs immediately; it returns the generator produced by the inner one. Keeping the `with` inside the generator ensures the file still closes when iteration finishes or the generator is closed.',
      },
    ],

    quiz: [
      {
        id: 'PY-018-q1',
        type: 'mcq',
        concept: 'generator call semantics',
        prompt: 'What does calling a generator function actually do?',
        options: [
          'Returns a generator object without executing any of the function body',
          'Runs the body to completion and returns a list of all yielded values',
          'Runs the body until the first `yield` and returns that value',
          'Raises `StopIteration` if the body contains no `return`',
        ],
        answerIndex: 0,
        explanation:
          'The call only constructs the generator object; the frame is created but suspended before the first line. The body starts running at the first `next()`, which is why side effects and argument validation inside a generator happen later than authors expect.',
      },
      {
        id: 'PY-018-q2',
        type: 'code-output',
        language: 'python',
        concept: 'iterator exhaustion',
        prompt: 'What does this print?',
        code: 'g = (n for n in range(4))\nprint(sum(g), sum(g))',
        options: ['6 0', '6 6', '0 6', 'TypeError'],
        answerIndex: 0,
        explanation:
          'The first `sum` drains the generator, giving 0+1+2+3 = 6. The generator is then exhausted, so the second `sum` sees no items and returns its start value, 0. It fails silently rather than raising, which makes this one of the hardest generator bugs to notice.',
      },
      {
        id: 'PY-018-q3',
        type: 'truefalse',
        concept: 'memory behaviour',
        prompt: 'A generator over ten million items uses roughly the same memory as a generator over ten items.',
        answer: true,
        explanation:
          'True. A generator stores one suspended frame — its local variables and instruction pointer — not the items. Memory depends on what the body holds, not on how many values flow through it, which is exactly why generators solve the larger-than-memory problem.',
      },
      {
        id: 'PY-018-q4',
        type: 'fill',
        concept: 'the protocol',
        prompt: 'Which exception does an iterator raise to signal that it has no more items?',
        answers: ['StopIteration', 'stopiteration', 'StopIteration exception'],
        explanation:
          '`StopIteration` is the agreed end-of-stream signal. A `for` loop catches it and exits quietly, which is why you never normally see it — but `next()` called directly will propagate it unless you pass a default.',
      },
      {
        id: 'PY-018-q5',
        type: 'debug',
        language: 'python',
        concept: 'groupby semantics',
        prompt: 'This aggregation reports the "eng" department twice. What is wrong?',
        code: 'from itertools import groupby\nrows = [("eng", 3), ("ops", 1), ("eng", 5)]\nfor dept, g in groupby(rows, key=lambda r: r[0]):\n    print(dept, sum(v for _, v in g))',
        options: [
          '`groupby` only groups consecutive equal keys, so the input must be sorted by the same key first',
          '`groupby` needs the key function passed positionally, not as a keyword',
          'The inner generator must be converted to a list before summing',
          '`groupby` cannot accept tuples, only dictionaries',
        ],
        answerIndex: 0,
        explanation:
          '`itertools.groupby` groups runs of adjacent equal keys, exactly like the Unix `uniq` command. Unsorted input therefore produces a key more than once. The standard fix is `groupby(sorted(rows, key=k), key=k)`, using the identical key function in both places.',
      },
      {
        id: 'PY-018-q6',
        type: 'match',
        concept: 'itertools vocabulary',
        prompt: 'Match each itertools function to what it does.',
        pairs: [
          { left: 'islice', right: 'Takes a slice of a stream without materialising the rest' },
          { left: 'chain', right: 'Presents several iterables as one continuous stream' },
          { left: 'count', right: 'Produces an unbounded sequence of increasing numbers' },
          { left: 'accumulate', right: 'Yields running totals as it consumes the input' },
          { left: 'tee', right: 'Splits one iterator into several, buffering as needed' },
        ],
        explanation:
          'These five cover most practical stream work. The one with a hidden cost is `tee`: it must buffer every item consumed by the fastest branch, so it can quietly reintroduce the memory usage a generator was meant to avoid.',
      },
      {
        id: 'PY-018-q7',
        type: 'explain',
        concept: 'laziness',
        prompt:
          'A colleague says "generators are just a faster way to write list comprehensions". Explain what is wrong with that and state the real trade-off.',
        rubric: [
          'Corrects the speed claim: per-item work is the same, the saving is peak memory and unconsumed work',
          'Names what you give up: length, indexing, slicing, and repeated iteration',
          'Gives a concrete situation where each is the right choice',
        ],
        sampleAnswer:
          'Generators are not faster at producing the same set of values — the same expression runs per item either way, and for small collections a list is often marginally quicker because it avoids repeated frame suspension. What changes is *when* the work happens and how much exists at once. A list computes everything up front and holds all of it; a generator computes one item per request and holds one. That gives two real wins: peak memory becomes independent of stream length, and any items you never consume are never computed, so breaking out of a loop after three of a million items does three items of work. The price is that a generator has no length, cannot be indexed or sliced, and is exhausted after one pass, failing silently on the second. So: generator for a 40 GB log file you filter once, list for a few thousand rows you need to sort and iterate twice.',
        explanation:
          'The examinable point is that laziness is a memory-and-early-exit optimisation with a real cost in flexibility, not a general speed-up.',
      },
    ],

    flashcards: [
      { front: 'Iterable versus iterator?', back: 'An iterable implements `__iter__` and can produce fresh iterators. An iterator implements `__next__`, raises `StopIteration` when done, and returns itself from `__iter__`.' },
      { front: 'What does calling a generator function do?', back: 'Nothing in the body. It builds a generator object whose frame is suspended before the first line; the body starts at the first `next()`.' },
      { front: 'How much memory does a generator use?', back: 'One suspended frame — independent of how many items pass through it. That is the whole point.' },
      { front: 'Why did my second loop over a generator do nothing?', back: 'Generators are one-shot. The first loop exhausted it, and further `next()` calls raise `StopIteration` immediately — silently, with no error.' },
      { front: '`[x for x in xs]` versus `(x for x in xs)`?', back: 'Square brackets build a list eagerly; parentheses build a lazy generator. Identical syntax otherwise.' },
      { front: 'Why must you sort before `itertools.groupby`?', back: 'It groups only consecutive equal keys, like Unix `uniq`, so unsorted input yields the same key in several separate groups.' },
      { front: 'What does `yield from` do?', back: 'Delegates to another iterable, yielding all of its items, and captures its return value as the result of the expression.' },
    ],

    challenge: {
      title: 'A lazy log pipeline that never grows',
      brief:
        'Build a processing pipeline over a large line-delimited JSON log using only generators. Stage one parses lines and skips malformed ones with a counted warning. Stage two filters to a level passed in. Stage three attaches a rolling five-minute error rate using a deque. Stage four batches records into lists of 500 for downstream writing. Prove the pipeline is lazy by feeding it an infinite synthetic stream and taking two batches, and prove it is flat in memory by reporting peak usage with `tracemalloc` for a 10,000-line and a 1,000,000-line input.',
      language: 'python',
      acceptanceCriteria: [
        'Every stage is a generator function; no stage builds a list of the whole stream',
        'The pipeline terminates on an infinite input when the consumer stops after two batches',
        'Peak memory measured by tracemalloc is within a small constant factor between the two input sizes',
        'Malformed lines are counted and reported without aborting the run',
        'The batching stage emits a final partial batch rather than discarding it',
      ],
      starterCode:
        'import json, tracemalloc\nfrom collections import deque\nfrom itertools import islice\n\ndef parse(lines):\n    ...\n\ndef by_level(records, level="ERROR"):\n    ...\n\ndef batched(records, size=500):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who is comfortable with lists and loops what an iterator is, what `yield` does to a function, and why any of this matters.',
      mustCover: [
        'A `for` loop calls `iter()` then `next()` repeatedly until `StopIteration`',
        '`yield` suspends the function, preserving all local state, and resumes on the next request',
        'Generators use memory proportional to one item, not to the length of the stream',
        'The cost of laziness: one-shot, no length, no indexing',
      ],
      bonusSignals: ['gives a concrete larger-than-memory example', 'mentions that unconsumed items are never computed', 'distinguishes generator functions from generator objects'],
      sampleExplanation:
        'Start with what a `for` loop really does, because it is not magic. When you write `for x in thing`, Python first asks `thing` for an iterator — a small object whose only job is to remember where you are. Then it asks that iterator for one value at a time, and when the iterator has nothing left it raises a special signal called `StopIteration`, which the loop catches and treats as "we are done". Any object that can play that game can appear in a `for` loop, which is why the same syntax works on a list, a dictionary, a file and a database cursor. Now `yield`. If you put `yield` anywhere in a function, the function stops being an ordinary function. Calling it no longer runs the body at all — it hands you back a generator object with the body frozen before its first line. The first time someone asks for a value, the body starts running until it reaches a `yield`, at which point it hands that value over and freezes again, right there, with every local variable still alive. Ask for another value and it carries on from the line after the `yield`. So you are writing a producer that naturally suspends and resumes, and Python is keeping your place for you. The reason this matters is memory. A list of ten million numbers is ten million numbers sitting in RAM. A generator over ten million numbers is one paused function, a couple of hundred bytes, no matter how many values eventually flow through it. That is what lets you filter a forty-gigabyte log file on a laptop, or feed a training loop from a dataset far larger than memory, without changing the shape of the code at all. There is a price, and it is worth stating plainly: a generator can only be walked once, it has no length, and you cannot index into it. Ask for a second pass and you get nothing back — not an error, just silence. So when the data is small and you need it twice, use a list; when it is large and you need it once, use a generator.',
    },
  },
  {
    id: 'PY-019',
    domain: 'PY',
    module: 'Pythonic Patterns',
    topic: 'Functions as values',
    title: 'Lambdas, Functional Tools and Decorators',
    slug: 'lambdas-and-decorators',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['PY-012', 'PY-013', 'PY-018'],
    related: ['PY-017', 'PY-014', 'PY-015'],
    tags: ['lambda', 'map', 'filter', 'reduce', 'closure', 'decorator', 'functools', 'wraps', 'caching'],

    learningObjectives: [
      'Explain what it means for a function to be a first-class object and pass one as an argument',
      'Write a lambda where it genuinely helps and recognise the cases where a `def` is clearer',
      'Use `map`, `filter` and `functools.reduce`, and say honestly when a comprehension beats all three',
      'Describe a closure precisely: what is captured, when it is captured, and what stays alive',
      'Build a decorator from first principles, preserve metadata with `functools.wraps`, and write a decorator that takes arguments',
      'Implement a practical timing decorator and a caching decorator, and know when caching is unsafe',
    ],

    terminology: [
      {
        term: 'First-class function',
        definition:
          'A function that can be treated like any other value: assigned to a name, stored in a list or dict, passed as an argument and returned from another function.',
        simple: 'A function you can hand around like a number or a string.',
      },
      {
        term: 'Lambda',
        definition:
          'An anonymous function written as a single expression, `lambda x: x * 2`. It has no name, no statements and no docstring; its value is whatever the expression evaluates to.',
        simple: 'A tiny throwaway function written inline.',
      },
      {
        term: 'Higher-order function',
        definition:
          'A function that takes a function as an argument, returns one, or both. `map`, `sorted(key=...)` and every decorator are higher-order functions.',
        simple: 'A function whose input or output is itself a function.',
      },
      {
        term: 'Closure',
        definition:
          'An inner function together with the enclosing-scope variables it references. Those variables stay alive after the outer call has returned, bound by reference rather than copied at definition time.',
        simple: 'An inner function that remembers the variables it grew up around.',
      },
      {
        term: 'Decorator',
        definition:
          'A callable that takes a function and returns a replacement function, normally applied with `@name` above a `def`. It is pure syntax sugar for `f = decorator(f)`.',
        simple: 'A wrapper you put around a function to add behaviour without editing it.',
      },
      {
        term: 'functools.wraps',
        definition:
          'A decorator applied to the inner wrapper that copies `__name__`, `__doc__`, `__module__`, `__qualname__` and `__wrapped__` from the original function onto it.',
        simple: 'The line that stops your decorated function from forgetting its own name.',
      },
      {
        term: 'Memoisation',
        definition:
          'Caching a function’s return values by its arguments so that a repeated call with the same inputs returns the stored result instead of recomputing.',
        simple: 'Remember the answer so you do not work it out twice.',
      },
    ],

    simpleExplanation:
      "In Python a function is not a special kind of thing that lives apart from your data. It is a value, just like the number 7 or the string \"hello\". You can put a function in a list, store it in a dictionary, hand it to another function as an argument, or write a function whose job is to build and return a brand new function. Once you accept that, a whole family of useful patterns opens up. A lambda is just a very short function written on the spot, when naming it would be more ceremony than it is worth. Tools like `map` and `filter` take your function and apply it across a collection for you. And a decorator — which sounds intimidating and is not — is simply a function that takes your function, wraps it inside a slightly bigger function that does something extra before and after, and hands the wrapper back under the original name. That is the entire mechanism behind `@app.route`, `@pytest.fixture`, `@torch.no_grad` and every other `@` you will meet.",

    whyItExists:
      'Two problems keep recurring: parameterising behaviour, and adding cross-cutting concerns. Passing functions solves the first — one `sorted` handles every ordering because you supply the key. Decorators solve the second: timing, caching, retries, authentication and logging are needed by dozens of functions and belong in none of them, so they are factored out into wrappers applied with one line.',

    analogy: {
      scenario:
        'Think of a parcel arriving at a busy office. The parcel itself is your function: it knows how to do one job. Before it reaches the recipient it may pass through the post room, which stamps the time of arrival, weighs it, and writes the details in a ledger; then through security, which checks whether this sender is allowed; then through reception, which keeps a copy of frequently requested documents so that the next identical request can be answered from the shelf without troubling the recipient at all. Every layer hands the parcel on, unopened and unmodified, and each layer can be added or removed independently of the parcel and of the other layers.',
      mapping: [
        { from: 'The parcel and what it contains', to: 'The original function and what it computes' },
        { from: 'The post room stamping arrival and departure', to: 'A timing decorator recording elapsed time around the call' },
        { from: 'Security checking the sender', to: 'An authorisation decorator that may refuse to call the function at all' },
        { from: 'Reception keeping copies of common requests', to: 'A caching decorator returning a stored result for repeated arguments' },
        { from: 'Stacking the three desks in a fixed order', to: 'Stacking `@` lines — the one nearest the `def` wraps first and runs innermost' },
        { from: 'The recipient still seeing an ordinary parcel', to: 'The caller still calling `f(x)` with no idea a wrapper exists' },
      ],
      bridge:
        'The office layers are what a decorator literally is: each one receives the callable beneath it and returns a new callable with the same interface, which is why they compose in any combination. The order detail is real and examinable — decorators apply bottom-up, so the closest `@` to the `def` is the innermost wrapper and therefore the last to see the call on the way in.',
      limitations:
        'The analogy hides the identity problem. A real parcel keeps its label through the post room; a naive Python wrapper does not, and the decorated function starts reporting its name as `wrapper` and loses its docstring. That is precisely the gap `functools.wraps` exists to close.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Building a decorator from first principles',
        caption: 'Five steps from "functions are values" to `@timed`.',
        steps: [
          { label: 'Functions are values', detail: '`f = my_func` binds the same function object to a second name. No call happens — there are no parentheses.' },
          { label: 'A function can take a function', detail: '`def twice(fn, x): return fn(fn(x))`. The behaviour is now a parameter.' },
          { label: 'A function can return a function', detail: 'An inner `def` closed over the outer argument is returned, not called. This is a closure.' },
          { label: 'Return a wrapper with the same signature', detail: '`def wrapper(*args, **kwargs): ...; return fn(*args, **kwargs)` accepts anything the original accepts.' },
          { label: 'Rebind the original name', detail: '`f = decorator(f)` replaces the name. `@decorator` above the `def` is exactly this line, written above instead of below.' },
          { label: 'Restore the identity', detail: '`@functools.wraps(fn)` on the wrapper copies name, docstring and module across so tooling still works.' },
        ],
      },
      {
        kind: 'table',
        title: 'Which tool for the job',
        caption: 'All four transform a collection; they differ in readability and in what they return.',
        columns: ['Task', 'Functional form', 'Comprehension form', 'Which to prefer'],
        rows: [
          ['Transform every item', 'map(f, xs)', '[f(x) for x in xs]', 'Comprehension, unless f already exists by name and you want laziness'],
          ['Keep some items', 'filter(pred, xs)', '[x for x in xs if pred(x)]', 'Comprehension — reads closer to the sentence you would say'],
          ['Both at once', 'map(f, filter(p, xs))', '[f(x) for x in xs if p(x)]', 'Comprehension, decisively — the nesting inverts reading order'],
          ['Collapse to one value', 'reduce(op, xs, init)', 'a loop, or sum/min/max/any', 'Built-in if one exists; reduce only for genuinely custom folds'],
          ['Order by a computed key', 'sorted(xs, key=f)', 'no equivalent', 'The functional form — this is where passing functions shines'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a decorator with arguments',
        subject: '@retry(times=3)\ndef fetch(url): ...',
        annotations: [
          { part: 'retry(times=3)', note: 'This is a call, evaluated first. It returns the actual decorator — so `retry` is a decorator *factory*, one level deeper than a plain decorator.' },
          { part: 'the returned decorator', note: 'Receives `fetch` and returns a wrapper, exactly as a no-argument decorator would.' },
          { part: 'the wrapper', note: 'Closes over both `fetch` and `times`, which is how the configuration survives after `retry(times=3)` has returned.' },
          { part: '@wraps(fn)', note: 'Applied to the wrapper so `fetch.__name__` is still "fetch" and `help(fetch)` still shows its docstring.' },
          { part: 'fetch', note: 'After the `def` completes, the name `fetch` is bound to the wrapper, not the original. The original survives as `fetch.__wrapped__`.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Experiment with wrappers',
        caption: 'Write a decorator, stack two of them, and watch the order in which they run.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'Python functions are first-class objects of type `function`, so they may be bound to names, stored in containers, passed and returned. A closure is a function object carrying a `__closure__` tuple of cells referencing free variables from an enclosing scope, resolved by reference at call time rather than by value at definition time. A decorator is any callable taking a callable and returning a callable; the syntax `@d` immediately above `def f` is defined to mean `f = d(f)` evaluated after the function object is created, and stacked decorators apply bottom-up.',

    codeExamples: [
      {
        language: 'python',
        title: 'Functions are values, and lambdas are small functions',
        runnable: true,
        code: `def shout(s): return s.upper() + "!"

speak = shout                      # no parentheses: bind, do not call
print(speak("hello"))

# Functions in a data structure — a dispatch table, which replaces long if/elif chains
OPS = {"double": lambda x: x * 2, "square": lambda x: x ** 2, "neg": lambda x: -x}
print([OPS[name](5) for name in ("double", "square", "neg")])

# Where lambda genuinely earns its place: a one-off key function
people = [("Ada", 36), ("Grace", 45), ("Alan", 41)]
print(sorted(people, key=lambda p: p[1], reverse=True))
print(max(people, key=lambda p: len(p[0])))

# Where it does not: naming it is clearer and gives you a docstring
double = lambda x: x * 2           # a def would be better here
print(double.__name__)`,
        output: `HELLO!
[10, 25, -5]
[('Grace', 45), ('Alan', 41), ('Ada', 36)]
('Grace', 45)
<lambda>`,
        explanation:
          'The dispatch table shows the real value of first-class functions: behaviour selected by data instead of by a chain of `if`s. The `sorted` and `max` calls show where lambda is idiomatic — a tiny key function used once, at the point of use. The last line shows why assigning a lambda to a name is a style error flagged by linters: the function’s `__name__` is `<lambda>`, so every traceback and profiler report loses the name you carefully chose.',
      },
      {
        language: 'python',
        title: 'map, filter, reduce — and the comprehension that usually wins',
        runnable: true,
        code: `from functools import reduce
import operator

nums = [1, 2, 3, 4, 5, 6]

# map and filter return lazy iterators, not lists
print(list(map(str.upper, ["a", "b"])))
print(list(filter(lambda n: n % 2 == 0, nums)))

# Nested, the functional form reads inside-out
functional = list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, nums)))
comprehension = [n * n for n in nums if n % 2 == 0]
print(functional == comprehension, comprehension)

# reduce folds a sequence into one value
print(reduce(operator.mul, nums, 1))             # 720 — a product
print(reduce(lambda a, b: a if a > b else b, nums))

# but prefer the built-in whenever one exists
print(sum(nums), max(nums))`,
        output: `['A', 'B']
[2, 4, 6]
True [4, 16, 36]
720
6
21 6`,
        explanation:
          '`map(str.upper, ...)` is the case where the functional form is cleanest: the function already exists by name, so there is no lambda noise. The nested example is the case where it loses — you must read `map(..., filter(...))` from the inside out, while the comprehension reads left to right in the order the work happens. `reduce` is genuinely useful only for custom folds such as a product or a dictionary merge; when a built-in like `sum` or `max` exists, it is faster, clearer and does not need an import.',
      },
      {
        language: 'python',
        title: 'Closures: what is captured, and the late-binding trap',
        runnable: true,
        code: `def make_multiplier(factor):
    def multiply(x):
        return x * factor          # 'factor' is a free variable, captured by reference
    return multiply                # returned, not called

triple = make_multiplier(3)
print(triple(10), triple.__closure__[0].cell_contents)

# The classic trap: all three closures share ONE variable, read at call time
bad = [lambda: i for i in range(3)]
print([f() for f in bad])          # not [0, 1, 2]

# Fix 1: bind the current value as a default argument, evaluated at def time
good = [lambda i=i: i for i in range(3)]
print([f() for f in good])

# Fix 2: an explicit factory, which is clearer about intent
def const(i): return lambda: i
best = [const(i) for i in range(3)]
print([f() for f in best])`,
        output: `30 3
[2, 2, 2]
[0, 1, 2]
[0, 1, 2]`,
        explanation:
          'The first half is the useful behaviour: `multiply` keeps `factor` alive after `make_multiplier` has returned, which you can see directly in `__closure__`. The second half is the bug that follows from it. A closure captures the *variable*, not its value at the moment of definition, so all three lambdas refer to the same `i` and read it when called — by which time the comprehension has finished and `i` is 2. The default-argument fix works because default values are evaluated once, when the `lambda` is created. This exact bug appears constantly in loops that build callbacks, event handlers or partially applied functions.',
      },
      {
        language: 'python',
        title: 'A decorator built up, then made production-ready',
        runnable: true,
        code: `import functools, time

# Step 1: the minimum viable decorator.
def timed(fn):
    @functools.wraps(fn)                       # without this, name/doc are lost
    def wrapper(*args, **kwargs):              # accepts whatever fn accepts
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:                               # runs even if fn raises
            elapsed = time.perf_counter() - start
            print(f"{fn.__name__} took {elapsed * 1000:.1f} ms")
    return wrapper

# Step 2: a decorator that takes arguments needs one more layer.
def retry(times=3, delay=0.0, exceptions=(ConnectionError,)):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return fn(*args, **kwargs)
                except exceptions as exc:
                    if attempt == times:
                        raise
                    print(f"attempt {attempt} failed ({exc}); retrying")
                    time.sleep(delay)
        return wrapper
    return decorator

calls = 0

@retry(times=3)
@timed
def flaky(n):
    """Fails twice, then succeeds."""
    global calls
    calls += 1
    if calls < 3:
        raise ConnectionError("upstream reset")
    return n * 2

print(flaky(21))
print(flaky.__name__, "|", flaky.__doc__)`,
        output: `flaky took 0.0 ms
attempt 1 failed (upstream reset); retrying
flaky took 0.0 ms
attempt 2 failed (upstream reset); retrying
flaky took 0.0 ms
42
flaky | Fails twice, then succeeds.`,
        explanation:
          'Three details carry the weight. `*args, **kwargs` lets one wrapper decorate any signature. The `finally` guarantees the timing is recorded even when the function raises, which is exactly when you most want to know. And `@functools.wraps` is why the last line still prints `flaky` and its real docstring instead of `wrapper` and `None` — without it, `help()`, Sphinx, pytest fixture discovery and `pickle` all break. The stacking order is worth tracing: `@timed` is nearest the `def`, so it wraps first and is the inner layer, which is why you see three timing lines, one per attempt, from inside `retry`.',
      },
      {
        language: 'python',
        title: 'Caching: the decorator that pays for itself, and when it is wrong',
        runnable: true,
        code: `import functools, time

@functools.lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

t = time.perf_counter()
print(fib(35), f"{time.perf_counter() - t:.4f}s")
print(fib.cache_info())

# Rolling your own shows there is no magic in it.
def memoize(fn):
    cache = {}                                  # lives in the closure, one per decorated fn
    @functools.wraps(fn)
    def wrapper(*args):
        if args not in cache:                   # args must be hashable
            cache[args] = fn(*args)
        return cache[args]
    wrapper.cache = cache
    return wrapper

@memoize
def slow_square(n):
    time.sleep(0.05)
    return n * n

print(slow_square(4), slow_square(4), len(slow_square.cache))`,
        output: `9227465 0.0121s
CacheInfo(hits=33, misses=36, currsize=36)
16 16 1`,
        explanation:
          'Naive recursive Fibonacci is exponential because it recomputes the same subproblems; one cache line makes it linear, and `cache_info()` shows 33 hits against 36 misses proving it. The hand-rolled version shows the mechanism — a dictionary living in the closure, keyed by the argument tuple. It also exposes the three conditions under which caching is safe and which `lru_cache` silently assumes: arguments must be hashable, so a list or a DataFrame raises `TypeError: unhashable type`; the function must be pure, so caching anything that reads a file, a clock or a database will serve stale answers; and `maxsize=None` on a method keeps every `self` alive forever, which is a genuine and common memory leak.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Web frameworks',
        usage:
          'Flask’s `@app.route("/predict")` and FastAPI’s `@app.post(...)` are decorator factories: the call registers your function in a routing table and returns it, so one line turns an ordinary function into an HTTP endpoint.',
      },
      {
        context: 'PyTorch and training loops',
        usage:
          '`@torch.no_grad()` wraps a function so autograd stops recording, cutting memory during evaluation. `@staticmethod`, `@classmethod` and `@property` are decorators you use in every class you write.',
      },
      {
        context: 'Testing',
        usage:
          '`@pytest.fixture` and `@pytest.mark.parametrize` are decorators that attach metadata for the test runner to discover. This is also why a missing `functools.wraps` in your own decorators breaks test collection in confusing ways.',
      },
      {
        context: 'Data pipelines and expensive features',
        usage:
          '`@lru_cache` on a geocoding or tokenisation lookup turns a repeated network or CPU cost into a dictionary hit, often the single cheapest speed-up available in a feature-engineering script.',
      },
    ],

    projectConnections: [
      { tool: 'functools', role: '`wraps`, `lru_cache`, `partial` and `reduce` — the standard-library toolkit for this entire unit.' },
      { tool: 'FastAPI', role: 'Route registration, dependency injection and background tasks are all expressed as decorators.' },
      { tool: 'pandas', role: '`df.apply(lambda row: ...)` and `groupby().agg(...)` take functions as arguments; the same first-class-function idea.' },
      { tool: 'scikit-learn', role: '`make_scorer(f)` and custom `FunctionTransformer(f)` parameterise pipeline steps with functions you supply.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing a decorator without `functools.wraps`',
        why: 'The returned wrapper is a different function object, so `__name__` becomes "wrapper", the docstring disappears, and the signature reported by introspection is `(*args, **kwargs)`. Anything that relies on those — `help()`, pytest fixture discovery, Sphinx, `pickle`, FastAPI’s signature-based dependency injection — misbehaves, and the error message never mentions your decorator.',
        fix: 'Put `@functools.wraps(fn)` on every wrapper you write. It costs one import and one line and is never wrong.',
      },
      {
        mistake: 'Accidentally calling the function instead of decorating it',
        why: 'Writing `@timed()` when `timed` takes a function, not arguments, calls `timed()` with no function and then applies its return value. The usual result is `TypeError: timed() missing 1 required positional argument`, or a mysterious `NoneType object is not callable` at first use.',
        fix: 'A plain decorator is applied as `@timed`; a decorator factory is applied as `@retry(times=3)`. If you want both forms, detect it: `if fn is not None and callable(fn)` at the top of the factory.',
      },
      {
        mistake: 'Late binding in loops that build functions',
        why: 'A closure captures the variable, not its value, so every function built inside a loop shares the loop variable and reads its final value when eventually called. `[lambda: i for i in range(3)]` gives three functions all returning 2.',
        fix: 'Bind at definition time with a default argument, `lambda i=i: i`, or use `functools.partial(f, i)`, or return the lambda from a small factory function.',
      },
      {
        mistake: 'Caching an impure function',
        why: '`lru_cache` assumes the same arguments always give the same result. Put it on something that reads a file, queries a database or depends on the current time and you get stale answers indefinitely, with no error and nothing in the logs.',
        fix: 'Cache pure computations only. If the underlying data can change, add a version or timestamp to the arguments, or call `fn.cache_clear()` on a defined invalidation event.',
      },
      {
        mistake: 'Assigning a lambda to a name instead of using `def`',
        why: 'You get all the restrictions of a lambda — one expression, no statements, no docstring — plus none of the benefit, and the function reports itself as `<lambda>` in every traceback and profile.',
        fix: 'Use `def` whenever the function gets a name. Reserve lambda for the inline argument position: a `key=`, a small `map`, a dispatch-table value.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is a decorator, and what does the `@` syntax actually do?',
        answer:
          'A decorator is a callable that takes a function and returns a replacement callable, normally one that wraps the original with extra behaviour. The `@` syntax is pure sugar: writing `@d` above `def f(): ...` is defined to mean that after the function object is created, the name `f` is rebound to `d(f)`. Nothing else is special about it — you can equally write `f = d(f)` by hand, and a decorator can be any expression that evaluates to a callable, which is why `@retry(times=3)` works: the call is evaluated first and its return value is the decorator. Stacked decorators apply bottom-up, so the one closest to the `def` wraps first and ends up innermost.',
        followUp:
          'A strong answer adds that the wrapper should use `*args, **kwargs` and `functools.wraps`, and can explain what breaks without the latter.',
      },
      {
        level: 'intermediate',
        question: 'Explain closures and why `[lambda: i for i in range(3)]` does not give you three different functions.',
        answer:
          'A closure is an inner function plus the enclosing-scope variables it refers to; Python keeps those alive in cells attached to the function object. The crucial detail is that a closure captures the *variable* by reference, not a snapshot of its value at definition time, and the value is read when the inner function is finally called. In that comprehension all three lambdas close over the same `i`, and by the time any of them is called the loop has finished with `i` equal to 2, so all three return 2. The fixes work by forcing an early binding: a default argument `lambda i=i: i` is evaluated once at definition, and `functools.partial(f, i)` stores the current value as an argument.',
        followUp:
          'Mentioning that this is the same mechanism behind a decorator remembering its configuration shows the candidate sees closures and decorators as one idea.',
      },
      {
        level: 'ml-engineer',
        question: 'You add `@lru_cache` to a feature function and inference latency drops, but the model starts making stale predictions in production. What happened, and how would you have caught it?',
        answer:
          'The cached function was not pure. `lru_cache` keys on arguments alone, so if the function also depends on something not in its arguments — a feature-store lookup, a file on disk, a configuration object, the current date — then the first result is served forever for those arguments no matter how the underlying data changes. The classic version of this is a user-features function keyed on `user_id`: the id never changes, so the features never refresh. I would have caught it by asking one question before adding the cache: is the return value a function of the arguments alone? The fixes are to move the changing input into the argument list so it becomes part of the cache key, for example passing a snapshot timestamp or data version; to use a TTL cache instead of an unbounded one; or to call `cache_clear()` on a refresh event. I would also note that `maxsize=None` on a method caches `self`, which keeps every object ever passed alive and leaks memory.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write a decorator `count_calls` that records how many times the decorated function has been called, exposes the count as an attribute on the wrapper, and preserves the function’s name and docstring. Demonstrate it on a recursive function.',
        hint: 'Keep the counter in the closure or directly on the wrapper object. Remember that a recursive call goes through the decorated name, so it will be counted too.',
        language: 'python',
        starterCode: 'import functools\n\ndef count_calls(fn):\n    ...\n',
        solution:
          'import functools\n\ndef count_calls(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return fn(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef fib(n):\n    """Naive Fibonacci."""\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nfib(10)\nprint(fib.calls, fib.__name__, fib.__doc__)   # 177 fib Naive Fibonacci.\n\nStoring the counter on `wrapper` rather than in a closure variable avoids needing `nonlocal` and makes it readable from outside. The count is 177 rather than 11 because the recursive calls resolve the global name `fib`, which is bound to the wrapper, so every internal call is counted too — which is exactly what makes this decorator a good demonstration of why memoisation matters.',
      },
      {
        prompt:
          'Rewrite `list(map(lambda r: r["score"] * 100, filter(lambda r: r["score"] is not None, rows)))` as a comprehension, and say in one sentence why the comprehension is easier to read.',
        hint: 'Which part of the functional version do you have to read first, and where is it written?',
        solution:
          '[r["score"] * 100 for r in rows if r["score"] is not None]\n\nThe functional version must be read inside-out: the `filter` is written last but happens first, so your eye has to travel to the right-hand end, come back to the `map`, and then out to `list`. The comprehension is written in the order the work happens — source, condition, transformation — and needs no lambdas, so there is less punctuation between you and the intent. The one thing the functional version keeps is laziness, which the `list()` call here throws away anyway; if you wanted that, a generator expression with round brackets gives it without the inversion.',
      },
      {
        prompt:
          'A colleague writes a `@cached` decorator that stores results in a dict keyed by `args`. It works until someone calls `f([1, 2, 3])` and gets `TypeError: unhashable type: \'list\'`. Explain the cause, and give two different ways to handle list arguments.',
        hint: 'What does a dictionary require of its keys, and what makes a list different from a tuple?',
        solution:
          'Dictionary keys must be hashable, which in practice means immutable, because a mutable key could change after insertion and become unfindable. Lists are mutable and therefore unhashable, so using the argument tuple as a cache key fails as soon as one argument is a list — the same reason `lru_cache` raises on a list, a dict, a set or a DataFrame.\n\nOption one: normalise at the boundary. Convert to a hashable form before keying, for example `key = tuple(map(tuple, args))` for a list of lists, or serialise with `json.dumps(args, sort_keys=True)` when the structure is arbitrary. This is correct but costs a conversion on every call and can be slower than the function for cheap functions.\n\nOption two: do not cache that function. Keep the cached function pure and hashable-only, and have the caller convert the list to a tuple once at the point where the data enters — `f(tuple(items))`. This is usually the better design, because it makes the hashability requirement visible in the signature rather than hiding it inside the decorator.',
      },
    ],

    quiz: [
      {
        id: 'PY-019-q1',
        type: 'mcq',
        concept: 'decorator syntax',
        prompt: 'What is `@decorator` above `def f(): ...` equivalent to?',
        options: [
          'f = decorator(f), evaluated immediately after the def',
          'f = decorator(f()), evaluated immediately after the def',
          'decorator(f) called every time f is called',
          'A type annotation that has no effect at run time',
        ],
        answerIndex: 0,
        explanation:
          'The decorator runs once, at definition time, and rebinds the name to whatever it returns. That is the whole mechanism — the function itself is not called, and nothing extra happens at each later call except whatever the wrapper does.',
      },
      {
        id: 'PY-019-q2',
        type: 'code-output',
        language: 'python',
        concept: 'late binding in closures',
        prompt: 'What does this print?',
        code: 'fns = [lambda: i for i in range(3)]\nprint([f() for f in fns])',
        options: ['[2, 2, 2]', '[0, 1, 2]', '[3, 3, 3]', '[0, 0, 0]'],
        answerIndex: 0,
        explanation:
          'All three lambdas close over the same variable `i` and read it when called, not when defined. By then the comprehension has finished and `i` holds 2. Binding early with `lambda i=i: i` gives the expected [0, 1, 2].',
      },
      {
        id: 'PY-019-q3',
        type: 'truefalse',
        concept: 'functools.wraps',
        prompt: 'Omitting `functools.wraps` in a decorator changes what the decorated function computes.',
        answer: false,
        explanation:
          'False — the computation is identical. What changes is the wrapper’s metadata: `__name__`, `__doc__`, `__module__` and the introspectable signature. That matters because tooling such as pytest, Sphinx, `pickle` and signature-based dependency injection reads exactly those attributes.',
      },
      {
        id: 'PY-019-q4',
        type: 'fill',
        concept: 'functional tools',
        prompt: 'Which `functools` function folds a sequence into a single value by repeatedly applying a two-argument function?',
        answers: ['reduce', 'functools.reduce', 'reduce()'],
        explanation:
          '`functools.reduce(op, xs, initial)` applies `op` cumulatively left to right. It moved out of builtins in Python 3 deliberately, because `sum`, `max`, `min`, `any` and `all` cover most real folds more clearly.',
      },
      {
        id: 'PY-019-q5',
        type: 'debug',
        language: 'python',
        concept: 'caching pitfalls',
        prompt: 'This function is decorated with `@lru_cache` and starts returning stale results in production. What is the root cause?',
        code: 'from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef user_features(user_id):\n    return db.fetch_features(user_id)   # data changes hourly',
        options: [
          'The function is impure: its result depends on database state that is not part of the cache key',
          '`maxsize=None` is invalid and silently disables the cache',
          '`lru_cache` cannot decorate functions that perform input/output and raises at import time',
          'The user_id argument is unhashable, so every call is a cache miss',
        ],
        answerIndex: 0,
        explanation:
          'The cache keys on `user_id` alone, but the answer also depends on the database contents, which change. The first result is therefore served forever. Fixes are to include a data version or timestamp in the arguments, use a TTL cache, or call `cache_clear()` on refresh.',
      },
      {
        id: 'PY-019-q6',
        type: 'order',
        concept: 'building a decorator',
        prompt: 'Put these steps in the order that builds a correct, production-ready decorator.',
        items: [
          'Define an outer function that accepts the function to be decorated',
          'Define an inner wrapper taking *args and **kwargs',
          'Apply @functools.wraps(fn) to the wrapper so metadata survives',
          'Do the extra work, calling fn(*args, **kwargs) and returning its result',
          'Return the wrapper from the outer function, without calling it',
        ],
        explanation:
          'The shape is always the same: take a function, define a wrapper that forwards everything, preserve metadata, return the wrapper uncalled. Returning `wrapper()` instead of `wrapper` is the single most common slip and produces `NoneType object is not callable`.',
      },
      {
        id: 'PY-019-q7',
        type: 'explain',
        concept: 'closures and decorators as one idea',
        prompt:
          'Explain how a decorator that takes arguments, such as `@retry(times=3)`, remembers the value 3 long after `retry(times=3)` has finished executing.',
        rubric: [
          'Identifies that `retry(times=3)` is called first and returns the actual decorator',
          'Explains that the wrapper is a closure over `times` and over the decorated function',
          'Notes that closure cells keep enclosing-scope variables alive after the outer call returns',
        ],
        sampleAnswer:
          'There are three layers rather than two. `retry(times=3)` is an ordinary call, evaluated before any decoration happens; it returns a decorator, and it is that returned decorator which receives the function. Inside it, the wrapper refers to two names it did not define itself: `fn`, from the decorator layer, and `times`, from the factory layer. Python notices these free variables and attaches closure cells to the wrapper holding references to them, so when `retry(times=3)` returns and its frame is discarded, the cell holding `times` survives because the wrapper still references it. That is why the configuration is still there on a call made hours later. It is also why the decorated name now refers to the wrapper — the original function is reachable only through `__wrapped__`, which is one of the things `functools.wraps` sets for you.',
        explanation:
          'The examinable insight is that decorators are not a separate feature: they are closures plus one piece of syntax, and the three-layer shape falls straight out of needing somewhere to store the configuration.',
      },
    ],

    flashcards: [
      { front: 'What does `@d` above a `def` mean?', back: '`f = d(f)`, evaluated once at definition time. The name is rebound to whatever the decorator returns.' },
      { front: 'Why `functools.wraps`?', back: 'It copies `__name__`, `__doc__`, `__module__`, `__qualname__` and `__wrapped__` onto the wrapper, so introspection, help(), pytest and pickle keep working.' },
      { front: 'What does a closure capture?', back: 'The variable, by reference, not a snapshot of its value — and it reads it at call time. Hence the late-binding trap in loops.' },
      { front: 'Why does `[lambda: i for i in range(3)]` give [2, 2, 2]?', back: 'All three share one `i`, read when called, after the loop has finished. Fix with `lambda i=i: i`.' },
      { front: 'In what order do stacked decorators apply?', back: 'Bottom-up. The `@` nearest the `def` wraps first and is the innermost layer; the topmost runs first on the way in.' },
      { front: 'When is `lru_cache` unsafe?', back: 'When the function is impure, when arguments are unhashable, or on a method with maxsize=None, which keeps every `self` alive forever.' },
      { front: 'lambda or def?', back: 'Lambda only inline as an argument — a `key=`, a dispatch-table value. If it gets a name, use `def`.' },
    ],

    challenge: {
      title: 'A small decorator library',
      brief:
        'Write four decorators that compose cleanly: `timed`, which records wall-clock time to a module-level registry rather than printing; `retry(times, delay, exceptions)`, with exponential backoff; `validate(**types)`, which checks argument types against the declared mapping and raises a clear `TypeError` naming the offending parameter; and `cached(ttl)`, a time-limited cache that stores results with an expiry and evicts on read. Apply all four to one function and prove, with a test, that the stacking order produces the behaviour you claim it does.',
      language: 'python',
      acceptanceCriteria: [
        'Every decorator uses functools.wraps and forwards *args and **kwargs unchanged',
        'retry re-raises the original exception after the final attempt rather than swallowing it or raising its own',
        'validate reports the parameter name, the expected type and the type actually received',
        'cached expires entries by wall-clock TTL and never returns a stale value',
        'A test demonstrates the effect of swapping two decorators in the stack and explains the difference',
      ],
      starterCode:
        'import functools, time\n\nTIMINGS: dict[str, list[float]] = {}\n\ndef timed(fn):\n    ...\n\ndef retry(times=3, delay=0.1, exceptions=(Exception,)):\n    ...\n\ndef validate(**types):\n    ...\n\ndef cached(ttl=60.0):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who writes ordinary functions confidently what it means for functions to be values, and build them up to understanding a decorator without them ever feeling lost.',
      mustCover: [
        'A function is an object: it can be named, stored, passed and returned',
        'A closure is an inner function that keeps the enclosing variables it uses alive',
        'A decorator takes a function, returns a wrapper, and `@` rebinds the name',
        'functools.wraps exists because the wrapper otherwise loses the original identity',
      ],
      bonusSignals: ['builds up in steps rather than showing the finished decorator', 'explains *args/**kwargs in the wrapper', 'mentions the extra layer needed for decorator arguments'],
      sampleExplanation:
        'Start with something small that is easy to accept: in Python, a function is just another value. When you write `def shout(s): ...` you have created an object and given it the name `shout`, exactly as `x = 7` creates an object and gives it a name. So you can write `speak = shout` — no parentheses, because parentheses mean "call it" — and now both names refer to the same function. You can put functions in a list, or in a dictionary, which is how you replace a long chain of `if` statements with a lookup table of behaviours. Next step: if functions are values, a function can take one as an argument. You already use this: `sorted(people, key=...)` works for every possible ordering because you supply the rule. And a function can return one. If I write an outer function that defines an inner function and returns it, the inner function keeps hold of the outer function’s variables, even after the outer call has finished. That is called a closure, and it is how `make_multiplier(3)` can hand you back a function that still remembers the 3. Now the decorator, which is just those two moves used together. Write a function that accepts a function. Inside, define a wrapper that takes `*args, **kwargs` — which means "whatever arguments anybody passes" — does something extra, calls the original, does something else, and returns the result. Then return the wrapper. Finally, rebind the name: `flaky = timed(flaky)`. Writing `@timed` on the line above the `def` means precisely that one assignment and nothing more. Once you see it that way, `@app.route`, `@pytest.fixture` and `@torch.no_grad` stop being framework magic and become ordinary functions doing ordinary things. Two practical notes to finish. Always put `@functools.wraps(fn)` on your wrapper, or the decorated function forgets its own name and docstring and half your tooling breaks in ways that never mention your decorator. And if your decorator needs configuration, like `@retry(times=3)`, you need one more layer: the outermost call receives the settings and returns the decorator, which then receives the function.',
    },
  },
  {
    id: 'PY-020',
    domain: 'PY',
    module: 'Working Like an Engineer',
    topic: 'Failing well and persisting data',
    title: 'Errors, Exceptions and Files',
    slug: 'errors-exceptions-and-files',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['PY-012', 'PY-016'],
    related: ['PY-004', 'PY-008', 'PY-015'],
    tags: ['exception', 'try', 'except', 'finally', 'raise', 'context-manager', 'file-io', 'csv', 'json', 'encoding'],

    learningObjectives: [
      'Distinguish a syntax error from an exception, and read a traceback from the bottom up',
      'Use `try`/`except`/`else`/`finally` correctly, and explain what each clause is for',
      'Catch specific exception types rather than bare `except`, and justify why that matters',
      'Raise exceptions deliberately and design a small custom exception class with useful context',
      'Read and write text, CSV and JSON with `with open(...)`, and explain what a context manager guarantees',
      'Diagnose and prevent the encoding failures that ruin real data work',
    ],

    terminology: [
      {
        term: 'Exception',
        definition:
          'An object raised during execution to signal that normal flow cannot continue. It propagates up the call stack until something catches it or the program terminates with a traceback.',
        simple: 'Python’s way of saying "I cannot do this" and passing the problem upwards.',
      },
      {
        term: 'Traceback',
        definition:
          'The printed call stack at the moment an exception was raised, listing each frame from the outermost call inwards, with the exception type and message on the last line.',
        simple: 'The breadcrumb trail showing which calls led to the failure.',
      },
      {
        term: 'Exception hierarchy',
        definition:
          'The inheritance tree of exception classes, rooted at `BaseException`, with `Exception` as the base for ordinary errors. `except` matches a class and all of its subclasses.',
        simple: 'A family tree of error types, so catching a parent catches its children.',
      },
      {
        term: 'Context manager',
        definition:
          'An object defining `__enter__` and `__exit__`, used with `with`, whose `__exit__` runs on every exit path including an exception — guaranteeing cleanup such as closing a file or releasing a lock.',
        simple: 'A block that promises to tidy up after itself no matter how it ends.',
      },
      {
        term: 'Encoding',
        definition:
          'The mapping between characters and the bytes stored on disk. UTF-8 is the modern default; files written with another encoding must be read with that same one or the bytes are misinterpreted.',
        simple: 'The code book that turns letters into bytes and back again.',
      },
      {
        term: 'Mojibake',
        definition:
          'Text that decoded without raising but produced wrong characters, such as "café" appearing as "cafÃ©", because the reader assumed a different encoding from the writer.',
        simple: 'Garbled characters caused by reading bytes with the wrong code book.',
      },
    ],

    simpleExplanation:
      "Things go wrong. A file is missing, a user types \"abc\" where a number was expected, a network drops. Python handles this with exceptions: when a line cannot do its job, it stops and throws an object describing the problem, which travels up through whatever called it until somebody catches it or the program gives up and prints a traceback. Your job is to decide, for each kind of failure, whether you can sensibly do something about it. If you can — skip a bad row, retry, fall back to a default — you catch that specific type and handle it. If you cannot, you let it through, because a program that crashes loudly is far better than one that carries on with wrong data. Files are the other half of this unit, and for the same reason: opening a file is a promise to close it again, and `with open(...)` is how you keep that promise even when the code inside the block explodes.",

    whyItExists:
      'Without exceptions, every function would have to return an error code and every caller would have to check it, so the error-handling logic would drown the real logic and a single unchecked return would corrupt everything downstream. Exceptions separate the two: the happy path reads cleanly, failures travel upwards automatically, and each layer handles only what it genuinely can.',

    analogy: {
      scenario:
        'Picture a hospital with a strict escalation rule. A nurse who meets a problem they are trained for — a dressing needs changing, a patient is thirsty — deals with it and says nothing further. A problem they are not trained for is passed immediately to a registrar, and if the registrar cannot handle it either, it goes to the consultant. Nobody in the chain pretends to have fixed something they did not understand, because a quietly mishandled problem is far more dangerous than one that reaches the top. And whatever happens, the theatre gets cleaned and the instruments counted before the next patient enters, whether the operation succeeded or not.',
      mapping: [
        { from: 'A problem the nurse is trained for', to: 'An exception type you catch and genuinely handle' },
        { from: 'Escalating to the registrar', to: 'Letting the exception propagate up the call stack' },
        { from: 'The consultant of last resort', to: 'The top-level handler, or the interpreter printing a traceback' },
        { from: 'Pretending to have fixed something you did not understand', to: 'A bare `except: pass`, which hides the failure and corrupts what follows' },
        { from: 'Cleaning the theatre whatever the outcome', to: '`finally`, and the `__exit__` of a context manager' },
        { from: 'The incident note describing exactly what happened', to: 'The exception message and the traceback' },
      ],
      bridge:
        'The escalation rule is the design principle for exception handling: catch a type only at a level that can actually do something useful about it, and let everything else rise. That is why `except Exception: pass` around a whole function is the cardinal sin — it is the nurse quietly deciding the consultant need not be troubled, and it converts a loud, diagnosable failure into silently wrong results that surface weeks later.',
      limitations:
        'The hospital image suggests handling is always about recovery. Often it is about context instead: you catch an exception, add information the lower layer could not know — which file, which row, which user — and re-raise. That translation step has no clean parallel in the story.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What happens when an exception is raised',
        caption: 'The path an exception takes, and where each clause gets its turn.',
        steps: [
          { label: 'A line fails', detail: 'Python constructs an exception object — for example `ValueError("invalid literal for int()")` — and stops executing the current block.' },
          { label: 'Look for a matching `except` in this frame', detail: 'Handlers are tested top to bottom; the first whose class matches the exception or one of its base classes wins.' },
          { label: 'No match? Unwind one frame', detail: 'The current function exits and the search continues in its caller, recording each frame in the traceback as it goes.' },
          { label: 'Run any `finally` blocks on the way out', detail: 'Cleanup runs during unwinding, which is why `with` closes files even when nothing catches the error.' },
          { label: 'Handled, or reach the top', detail: 'A matching handler resumes normal execution after its block. Reaching the top prints the traceback and exits with status 1.' },
        ],
      },
      {
        kind: 'table',
        title: 'The four clauses, and what each is actually for',
        caption: 'Most people use two of these. The other two remove real bugs.',
        columns: ['Clause', 'Runs when', 'Put here', 'Do not put here'],
        rows: [
          ['try', 'Always', 'The smallest piece of code that can fail', 'Fifty lines, so you cannot tell what raised'],
          ['except X', 'X or a subclass was raised', 'Handling, logging with context, or a re-raise', 'A bare `except:` or a silent `pass`'],
          ['else', 'The try block finished with no exception', 'Code that must not be protected by the handler', 'Anything that can itself raise X and be caught by mistake'],
          ['finally', 'Always, on every exit path', 'Cleanup: close, release, restore state', '`return`, which silently discards a propagating exception'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading a traceback',
        subject: 'Traceback (most recent call last):\n  File "train.py", line 42, in <module>\n    run(config)\n  File "train.py", line 28, in run\n    rows = load(path)\n  File "train.py", line 15, in load\n    return int(line)\nValueError: invalid literal for int() with base 10: \'n/a\'',
        annotations: [
          { part: '"most recent call last"', note: 'Read from the bottom. The last frame is where it actually broke; the ones above are how you got there.' },
          { part: 'ValueError', note: 'The type. This is what you would name in an `except` clause, and it tells you which family of problem this is.' },
          { part: "invalid literal for int() with base 10: 'n/a'", note: 'The message, including the offending value. The value is usually the single most useful thing on the screen.' },
          { part: 'File "train.py", line 15, in load', note: 'The failing line. Start here, then walk upward to find which caller supplied the bad input.' },
          { part: 'run(config) at line 42', note: 'The outermost frame: the entry point. Useful for reproducing, less useful for diagnosing.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Catching broadly versus catching specifically',
        caption: 'The difference between a script you can debug and one you cannot.',
        left: {
          heading: 'except Exception: pass',
          points: [
            'Hides typos — a NameError looks like a handled failure',
            'Swallows KeyboardInterrupt in older patterns and blocks Ctrl-C',
            'Produces wrong results silently instead of stopping',
            'Leaves no record of what went wrong or how often',
            'The bug surfaces weeks later in a downstream number',
          ],
        },
        right: {
          heading: 'except ValueError as exc:',
          points: [
            'States exactly which failure you anticipated',
            'Anything unanticipated still crashes loudly, as it should',
            'The bound `exc` carries the offending value for the log',
            'Can re-raise with added context: `raise ParseError(...) from exc`',
            'Readers can see your assumptions in the code',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Break it on purpose',
        caption: 'Trigger each exception type, then add handlers one at a time and watch the control flow change.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'An exception is an instance of a class deriving from `BaseException`; `raise` instantiates and propagates it, unwinding the call stack frame by frame until a `try` statement in some frame has an `except` clause whose class matches the exception or one of its ancestors. `finally` clauses and context-manager `__exit__` methods execute during unwinding, guaranteeing cleanup on every exit path. A `with` statement binds `__enter__` and arranges `__exit__` to be called with the exception details, where returning true suppresses propagation.',

    codeExamples: [
      {
        language: 'python',
        title: 'The four clauses, each doing its own job',
        runnable: true,
        code: `def parse_age(raw):
    try:
        value = int(raw)              # the one line that can fail
    except ValueError:
        print(f"  not a number: {raw!r}")
        return None
    except TypeError as exc:
        print(f"  wrong type: {exc}")
        return None
    else:
        # Runs only if the try block succeeded. Not protected by the handlers,
        # so a bug in here is not mistaken for a parsing failure.
        if not 0 <= value <= 130:
            raise ValueError(f"age {value} is outside the plausible range")
        return value
    finally:
        print(f"  done with {raw!r}")

for raw in ["34", "n/a", None]:
    print("input:", raw)
    print("  ->", parse_age(raw))`,
        output: `input: 34
  done with '34'
  -> 34
input: n/a
  not a number: 'n/a'
  done with 'n/a'
  -> None
input: None
  wrong type: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'
  done with None
  -> None`,
        explanation:
          'Each clause earns its place. The `try` holds one line, so when it fails there is no doubt what failed. Two separate `except` clauses distinguish "the text was not a number" from "you passed the wrong type entirely", which deserve different messages. The `else` holds the range check: if it lived inside `try`, its own `ValueError` would be caught by the handler above and reported as a parsing failure, which would be a lie. And `finally` runs on all three paths — including the `return` inside the handler — which is what makes it the right place for cleanup.',
      },
      {
        language: 'python',
        title: 'Raising well, and a custom exception that carries context',
        runnable: true,
        code: `class DataQualityError(Exception):
    """Raised when input data violates an assumption the pipeline depends on."""

class RowParseError(DataQualityError):
    def __init__(self, line_no, raw, reason):
        super().__init__(f"line {line_no}: {reason} in {raw!r}")
        self.line_no = line_no        # structured fields, not just a message
        self.raw = raw
        self.reason = reason

def parse_row(line_no, raw):
    parts = raw.split(",")
    if len(parts) != 3:
        raise RowParseError(line_no, raw, f"expected 3 fields, got {len(parts)}")
    name, score, dept = parts
    try:
        score = float(score)
    except ValueError as exc:
        # Chain: keep the original cause visible in the traceback
        raise RowParseError(line_no, raw, "score is not numeric") from exc
    return {"name": name, "score": score, "dept": dept}

for i, line in enumerate(["ada,92,eng", "bob,n/a,ops", "broken"], start=1):
    try:
        print(parse_row(i, line))
    except RowParseError as exc:
        print(f"skipped {exc}  (fields: line_no={exc.line_no})")`,
        output: `{'name': 'ada', 'score': 92.0, 'dept': 'eng'}
skipped line 2: score is not numeric in 'bob,n/a,ops'  (fields: line_no=2)
skipped line 3: expected 3 fields, got 1 in 'broken'  (fields: line_no=3)`,
        explanation:
          'Three things make this production-grade rather than decorative. The custom classes form a hierarchy, so a caller can catch `DataQualityError` to mean "bad input of any kind" or `RowParseError` to mean one specific case. The exception carries structured attributes as well as a message, so a handler can count failures per line without parsing strings. And `raise ... from exc` sets `__cause__`, so the traceback shows "The above exception was the direct cause of the following exception" with the original `ValueError` still visible — without `from`, you lose the detail of what actually went wrong underneath.',
      },
      {
        language: 'python',
        title: 'Files: what `with` guarantees, and writing your own context manager',
        runnable: true,
        code: `from contextlib import contextmanager
import time

# The guarantee: __exit__ runs on every path out of the block.
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("first line\\n")
    f.writelines([f"line {i}\\n" for i in range(2, 4)])
# file is closed here, even if the block had raised

with open("notes.txt", encoding="utf-8") as f:
    for line_no, line in enumerate(f, start=1):     # streams; never loads it all
        print(line_no, line.rstrip())

# Proof that cleanup survives an exception:
try:
    with open("notes.txt", encoding="utf-8") as f:
        raise RuntimeError("boom")
except RuntimeError:
    print("closed?", f.closed)

# Your own context manager, in five lines.
@contextmanager
def timer(label):
    start = time.perf_counter()
    try:
        yield                       # the body of the with-block runs here
    finally:
        print(f"{label}: {time.perf_counter() - start:.3f}s")

with timer("load"):
    sum(range(1_000_00))`,
        output: `1 first line
2 line 2
3 line 3
closed? True
load: 0.002s`,
        explanation:
          'The `closed? True` line is the whole argument for `with`: the exception escaped the block, and the file was still closed on the way out. Without it you need `try/finally` by hand, and every path that forgets one leaks a file handle until the process hits its limit. Iterating the file object rather than calling `.read()` streams line by line, so a ten-gigabyte log costs the same memory as a ten-line one. The `@contextmanager` version shows there is no magic in it: everything before the `yield` is `__enter__`, everything in the `finally` is `__exit__`, and putting it in a `finally` is what makes it exception-safe.',
      },
      {
        language: 'python',
        title: 'CSV and JSON, done properly',
        runnable: true,
        code: `import csv, json

rows = [
    {"name": "Ada, L", "score": 92, "note": 'said "yes"'},
    {"name": "Bob", "score": 78, "note": "café"},
]

# CSV: newline="" is required, not optional — it stops blank rows on Windows.
with open("scores.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "score", "note"])
    writer.writeheader()
    writer.writerows(rows)

with open("scores.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["name"], "|", row["score"], type(row["score"]).__name__)

# JSON: keeps types, and ensure_ascii=False keeps text readable on disk.
with open("scores.json", "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)

with open("scores.json", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded[1]["note"], type(loaded[1]["score"]).__name__)`,
        output: `Ada, L | 92 str
Bob | 78 str
café int`,
        explanation:
          'Two lessons hide in that output. First, never split CSV on commas yourself: the `csv` module quotes "Ada, L" and the embedded double quotes correctly, and unquotes them on the way back. Second, CSV has no types — every field returns as a string, which is why `92` prints as `str` and why forgetting to convert is the most common silent bug in data scripts. JSON does preserve types, so the score comes back as an `int`. The two flags that look cosmetic are not: `newline=""` prevents doubled line endings on Windows, and `ensure_ascii=False` writes `café` rather than `caf\\u00e9`, which matters the moment a human has to read the file.',
      },
      {
        language: 'python',
        title: 'Encoding failures, and how to survive them',
        runnable: true,
        code: `data = "naïve café — 90% done"

with open("utf8.txt", "w", encoding="utf-8") as f:
    f.write(data)

# 1. Loud failure: the bytes are not valid in this encoding.
try:
    with open("utf8.txt", encoding="ascii") as f:
        f.read()
except UnicodeDecodeError as exc:
    print("UnicodeDecodeError:", exc.reason, "at byte", exc.start)

# 2. Silent corruption: latin-1 decodes ANY byte, so it never raises.
with open("utf8.txt", encoding="latin-1") as f:
    print("mojibake:", f.read()[:12])

# 3. What to do with genuinely dirty input you cannot re-export.
with open("utf8.txt", encoding="ascii", errors="replace") as f:
    print("replaced:", f.read()[:12])

print("bytes on disk:", open("utf8.txt", "rb").read()[:8])`,
        output: `UnicodeDecodeError: ordinal not in range(128) at byte 2
mojibake: naÃ¯ve cafÃ
replaced: na??ve caf?
bytes on disk: b'na\\xc3\\xafve c'`,
        explanation:
          'Case 1 is the good outcome: a clear exception naming the byte position, so you know the encoding assumption was wrong. Case 2 is the dangerous one and the reason `latin-1` is a trap — it maps every one of the 256 possible bytes to a character, so it can never raise, and you get `cafÃ©` in your database with no error anywhere in the logs. Case 3 shows `errors="replace"` as a deliberate last resort for input you cannot fix at source; it loses information, so it belongs behind a logged warning, not as a default. The rule that prevents nearly all of this: always pass `encoding="utf-8"` explicitly, because the default depends on the machine’s locale and your laptop is not your production container.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A nightly ingestion job',
        usage:
          'Parsing ten million rows where roughly fifty are malformed. The job catches a specific `ValueError` per row, increments a counter, logs the line number, and fails the whole run only if the bad-row rate exceeds a threshold — so one typo does not lose a night, and a broken upstream schema still stops the pipeline.',
      },
      {
        context: 'Serving a model behind an API',
        usage:
          'The request handler catches `ValidationError` and returns HTTP 400, catches a timeout from the feature store and returns 503, and deliberately does not catch anything else, so genuine bugs reach the error tracker with a full traceback instead of being reported as a client error.',
      },
      {
        context: 'Checkpointing during training',
        usage:
          'A `try/finally` around the training loop writes a checkpoint on the way out, so a crash at epoch 40 of 50 costs minutes rather than a day. The same pattern releases the GPU and closes the run in the tracking server.',
      },
      {
        context: 'Reading files from other people',
        usage:
          'Exports from spreadsheets routinely arrive as cp1252 or UTF-8 with a byte-order mark. Detecting the encoding once, converting to UTF-8 at the boundary, and reading everything downstream as UTF-8 is what stops "café" turning into "cafÃ©" three tables later.',
      },
    ],

    projectConnections: [
      { tool: 'logging', role: '`logger.exception(...)` inside an `except` block records the message and full traceback — the production replacement for printing.' },
      { tool: 'pandas', role: '`read_csv(..., encoding=..., on_bad_lines=...)` wraps exactly these concerns; knowing the underlying failure modes is what lets you choose the flags.' },
      { tool: 'pytest', role: '`pytest.raises(ValueError, match="...")` asserts that failures happen for the right reason, which is how you test error paths.' },
      { tool: 'FastAPI', role: 'Exception handlers map custom exception classes to HTTP status codes, so a well-designed hierarchy becomes the API contract.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a bare `except:` or `except Exception: pass`',
        why: 'A bare `except` also catches `KeyboardInterrupt` and `SystemExit`, so Ctrl-C stops working. Worse, both forms catch your own typos: a `NameError` from a misspelled variable is reported as a handled data problem, and the program continues with wrong results and no record of anything.',
        fix: 'Name the exceptions you actually expect. If you truly must catch broadly at a top-level boundary, log it with `logger.exception(...)` and re-raise or exit non-zero — never `pass`.',
      },
      {
        mistake: 'Wrapping a huge block in one `try`',
        why: 'With forty lines in the `try`, a `KeyError` could have come from any of six dictionary lookups, and the handler cannot know which. It also makes it easy to accidentally catch an exception raised by your own handling logic.',
        fix: 'Keep the `try` down to the statements that can genuinely fail, and move follow-up work into `else`.',
      },
      {
        mistake: 'Opening a file without `with`, or without `encoding`',
        why: 'Without `with`, an exception between `open` and `close` leaks the handle, and on CPython you may not notice until you hit the operating system limit. Without `encoding`, Python uses a locale-dependent default, so code that works on your machine produces `UnicodeDecodeError` or mojibake in a container with a different locale.',
        fix: 'Always `with open(path, encoding="utf-8") as f:`. Pass `newline=""` as well for CSV.',
      },
      {
        mistake: 'Returning from inside `finally`',
        why: 'A `return` in a `finally` block discards any exception that was propagating, so a real failure vanishes and the function quietly returns a value as if nothing happened. The same applies to `break` and `continue`.',
        fix: 'Use `finally` only for cleanup. Put the return value in the `try` or `else`.',
      },
      {
        mistake: 'Catching an exception and raising a new one without `from`',
        why: 'The original traceback is replaced, and the message that actually identified the problem — the offending value, the missing key — is lost. Debugging then starts from a message that only describes the symptom.',
        fix: 'Use `raise MyError("context") from exc` to chain, or a bare `raise` to re-raise the original after logging.',
      },
      {
        mistake: 'Using exceptions for ordinary control flow',
        why: 'Raising `StopProcessing` to break out of two loops, or relying on `KeyError` where `dict.get` would do, makes the normal path harder to read and hides the cases that are genuinely exceptional.',
        fix: 'Reserve exceptions for conditions the immediate code cannot handle. Use return values, `in`, `.get()` and loop control for expected outcomes.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between `except`, `else` and `finally`, and why would you ever use `else`?',
        answer:
          '`except` runs when a matching exception was raised in the `try`. `else` runs only when the `try` completed with no exception at all. `finally` runs on every path out — success, handled exception, unhandled exception, even an early `return` — which is why it is the right place for cleanup. The reason `else` earns its place is scope of protection: code in `else` is not covered by the handlers, so if it raises the same exception type, it is not silently mistaken for the failure you were guarding against. A classic example is parsing a value in the `try` and validating it in the `else`, so a validation `ValueError` is not reported as a parse failure. It also keeps the `try` block small, which is the single most useful habit in exception handling.',
        followUp:
          'A strong candidate adds that `return` inside `finally` swallows a propagating exception, which is a real and hard-to-find bug.',
      },
      {
        level: 'intermediate',
        question: 'Why is `except Exception: pass` considered dangerous, and when is catching broadly acceptable?',
        answer:
          'Because it converts every failure — including bugs you did not anticipate, such as a `NameError` from a typo or an `AttributeError` from a `None` you did not expect — into silence. The program keeps running with wrong or missing data, and the symptom shows up somewhere unrelated days later with no traceback to work from. It also makes the code lie about your assumptions: a reader cannot tell what you expected to go wrong. Broad catching is legitimate at exactly one kind of place: a process boundary where you must not crash, such as the top of a request handler, a worker consuming a queue, or a per-item loop over a large batch. Even there the rule is log the full traceback with `logger.exception`, record a metric, and then either re-raise or fail that one item explicitly — never `pass`.',
      },
      {
        level: 'ml-engineer',
        question: 'A training script silently produced a model with terrible accuracy. You find `except Exception: continue` inside the data-loading loop. Walk me through what likely happened and how you would restructure it.',
        answer:
          'The handler almost certainly swallowed a large fraction of the dataset. Any failure per row — a schema change, a missing column, an encoding error, a `None` where a float was expected — was caught and skipped, so the loop completed normally and the model trained on whatever survived, which could be a small and heavily biased subset. Nothing in the logs would say so, because `continue` leaves no trace. To restructure it I would catch only the specific exceptions I am prepared to tolerate, such as `ValueError` from a numeric conversion; count skips and log the first few with the row identifier; and enforce a threshold, so if more than some small percentage of rows are dropped the run fails rather than producing a quietly broken model. I would also emit the accepted and rejected counts as metrics alongside the training run so the ratio is visible in the experiment tracker, and add a test that feeds a deliberately malformed row and asserts it raises rather than passes.',
        followUp:
          'Mentioning that the same reasoning applies to `errors="replace"` when decoding — tolerated corruption must be counted and surfaced — shows the principle is understood rather than memorised.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write `load_config(path)` that reads a JSON file and returns a dict. It must raise `FileNotFoundError` unchanged if the file is missing, raise a custom `ConfigError` with the file path and the JSON parser’s message if the contents are invalid, and always log that the attempt happened.',
        hint: 'Catch `json.JSONDecodeError` specifically, and chain the original with `from exc`. Use `finally` for the log line so it runs on all paths.',
        language: 'python',
        starterCode: 'import json\n\nclass ConfigError(Exception):\n    ...\n\ndef load_config(path):\n    ...\n',
        solution:
          'import json\n\nclass ConfigError(Exception):\n    """Raised when a config file exists but cannot be understood."""\n\ndef load_config(path):\n    try:\n        with open(path, encoding="utf-8") as f:\n            return json.load(f)\n    except json.JSONDecodeError as exc:\n        raise ConfigError(f"{path} is not valid JSON: {exc.msg} at line {exc.lineno}") from exc\n    finally:\n        print(f"attempted to load {path}")\n\nThe `FileNotFoundError` is not caught at all, so it propagates unchanged — that is the correct behaviour, because a missing config file is a deployment problem the caller must see. `JSONDecodeError` is caught specifically and translated into a domain exception that names the file, which the low-level parser could not know. `from exc` preserves the original traceback. The `finally` runs whether the load succeeded, raised, or the file was missing entirely.',
      },
      {
        prompt:
          'Explain precisely what this function returns for `f()` and why, then say what is wrong with it:\n\n    def f():\n        try:\n            raise ValueError("bad")\n        finally:\n            return "ok"',
        hint: 'What does a `return` inside `finally` do to an exception that is currently propagating?',
        solution:
          'It returns the string "ok", and the `ValueError` disappears entirely — no traceback, no log, nothing. When an exception is propagating and a `finally` block executes a `return`, the return takes priority and the in-flight exception is discarded. The caller therefore sees a perfectly normal return value from a function that actually failed.\n\nThis is wrong because it destroys information the caller needs, and it does so invisibly. The same applies to `break` and `continue` inside `finally`. The rule is that `finally` should only perform cleanup — closing, releasing, restoring — and should never contain a statement that changes control flow. If you genuinely want to convert the failure into a value, do it in an `except` clause where the intent is explicit and the exception can be logged first.',
      },
      {
        prompt:
          'A CSV exported from a spreadsheet raises `UnicodeDecodeError: \'utf-8\' codec can\'t decode byte 0x92 in position 417`. Describe how you would diagnose it, and give the fix you would ship — including why `errors="ignore"` is the wrong answer.',
        hint: 'Which encodings use 0x92 as a printable character, and where does the conversion belong in the pipeline?',
        solution:
          'First, look at the bytes rather than guessing: `open(path, "rb").read()[410:425]` shows the context. Byte 0x92 is not valid UTF-8, but in cp1252 — the default on Windows spreadsheets — it is the right single quotation mark, which is what a spreadsheet inserts when it autocorrects an apostrophe. That identifies the source encoding with reasonable confidence, and `open(path, encoding="cp1252")` will then read it cleanly. Confirm by checking that the decoded text reads sensibly around position 417.\n\nThe fix I would ship converts at the boundary: read with the detected encoding once, write out as UTF-8, and have every downstream stage assume UTF-8. If the source is under your control, fix the export instead. If encodings vary between files, detect per file with a library such as charset-normalizer and log which encoding was chosen, so a surprise is visible.\n\n`errors="ignore"` is wrong because it deletes the offending bytes silently. The file appears to load, the apostrophes vanish, and nobody learns that the pipeline is now quietly dropping characters — which also makes the data non-reproducible, since the loss is invisible in the output. If you truly cannot identify the encoding, `errors="replace"` at least leaves a visible marker, and it belongs behind a logged warning with a count.',
      },
    ],

    quiz: [
      {
        id: 'PY-020-q1',
        type: 'mcq',
        concept: 'clause semantics',
        prompt: 'When does the `else` clause of a `try` statement run?',
        options: [
          'Only if the `try` block completed without raising an exception',
          'Only if an exception was raised and handled',
          'Always, after the `try` block, like `finally`',
          'Only if no `except` clause matched the exception',
        ],
        answerIndex: 0,
        explanation:
          '`else` is the success path. Its value is that code placed there is outside the handlers’ protection, so an exception it raises is not silently mistaken for the failure you were guarding against — and it keeps the `try` block small.',
      },
      {
        id: 'PY-020-q2',
        type: 'code-output',
        language: 'python',
        concept: 'finally and return',
        prompt: 'What does this print?',
        code: 'def f():\n    try:\n        return "try"\n    finally:\n        print("finally")\n\nprint(f())',
        options: ['finally\ntry', 'try\nfinally', 'try', 'finally'],
        answerIndex: 0,
        explanation:
          'The return value is computed, then `finally` runs before the function actually returns, so "finally" is printed first and "try" second. This is also why a `return` inside `finally` would replace that value — and would discard a propagating exception.',
      },
      {
        id: 'PY-020-q3',
        type: 'truefalse',
        concept: 'context managers',
        prompt: 'If an exception is raised inside a `with open(...)` block and nothing catches it, the file is left open.',
        answer: false,
        explanation:
          'False. `__exit__` runs during stack unwinding, so the file is closed before the exception continues upwards. That guarantee is the entire reason `with` exists, and it holds for locks, database sessions and network connections too.',
      },
      {
        id: 'PY-020-q4',
        type: 'fill',
        concept: 'encoding',
        prompt: 'Which keyword argument should you always pass to `open()` so that behaviour does not depend on the machine’s locale?',
        answers: ['encoding', 'encoding=', 'encoding="utf-8"', "encoding='utf-8'"],
        explanation:
          'Without an explicit `encoding`, Python uses a locale-dependent default, so the same code can work on a developer laptop and raise `UnicodeDecodeError` or produce mojibake in a container. `encoding="utf-8"` makes it deterministic.',
      },
      {
        id: 'PY-020-q5',
        type: 'debug',
        language: 'python',
        concept: 'catching too broadly',
        prompt: 'This loop silently drops most of the dataset and nobody notices. What is the primary flaw?',
        code: 'rows = []\nfor line in lines:\n    try:\n        rows.append(parse(line))\n    except Exception:\n        continue',
        options: [
          'It catches every exception, including bugs, and leaves no record of how many rows were dropped',
          '`continue` is not allowed inside an except block',
          'The list should be built with a comprehension for correctness',
          '`parse` must be wrapped in a context manager to be safe',
        ],
        answerIndex: 0,
        explanation:
          'A `NameError` from a typo or an `AttributeError` from an unexpected `None` is indistinguishable from a bad row here, and nothing is counted or logged. Catch the specific expected exception, count the skips, log a sample, and fail if the drop rate exceeds a threshold.',
      },
      {
        id: 'PY-020-q6',
        type: 'match',
        concept: 'exception vocabulary',
        prompt: 'Match each exception type to the situation that raises it.',
        pairs: [
          { left: 'ValueError', right: 'Right type, unusable value — int("n/a")' },
          { left: 'TypeError', right: 'Wrong type entirely — len(5)' },
          { left: 'KeyError', right: 'A dictionary key that is not present' },
          { left: 'FileNotFoundError', right: 'open() on a path that does not exist' },
          { left: 'UnicodeDecodeError', right: 'Bytes on disk are not valid in the encoding you asked for' },
        ],
        explanation:
          'The `ValueError` versus `TypeError` distinction is the one worth internalising: `TypeError` means the argument was the wrong kind of thing, `ValueError` means it was the right kind but an unacceptable value. Catching the right one is what makes a handler honest.',
      },
      {
        id: 'PY-020-q7',
        type: 'explain',
        concept: 'error-handling design',
        prompt:
          'A colleague proposes wrapping every function body in `try/except Exception` so the service "never crashes". Explain why this is a bad idea and describe the policy you would propose instead.',
        rubric: [
          'Explains that catching everything hides bugs and produces silently wrong results',
          'Distinguishes failures you can genuinely handle from those you cannot',
          'Proposes a boundary where broad catching is legitimate, with logging and metrics rather than silence',
        ],
        sampleAnswer:
          'Not crashing is not the same as working. If every function catches everything, a typo, a schema change and a genuinely bad row all look identical, and the service keeps returning answers computed from incomplete or wrong data. That is worse than a crash, because a crash is loud, has a traceback and stops the damage, whereas silent corruption spreads downstream and is discovered weeks later in a number nobody can explain. The policy I would propose has three parts. Inside the code, catch only what you can genuinely do something about, and catch it as specifically as possible, so the handler documents the assumption. At exactly one boundary per process — the request handler, the queue worker, the per-item loop of a batch job — catch broadly so one bad item cannot kill the process, but log the full traceback with `logger.exception`, increment an error metric, and fail that item explicitly rather than pretending it succeeded. And set thresholds: if the error rate for a batch exceeds a small percentage, fail the whole run, because at that point the problem is systematic and continuing just produces a broken artefact with a green tick next to it.',
        explanation:
          'The examinable judgement is that error handling is about who can act on a failure, and that "never crash" without visibility converts loud failures into silent ones.',
      },
    ],

    flashcards: [
      { front: 'How do you read a traceback?', back: 'Bottom-up. The last line gives the exception type and message; the frame just above it is where it broke; the frames above that show how you got there.' },
      { front: 'What does `finally` guarantee?', back: 'It runs on every exit path — success, handled exception, unhandled exception, or an early return. Use it only for cleanup, never for `return`.' },
      { front: 'Why use `else` in a try statement?', back: 'Code there runs only on success and is not protected by the handlers, so its own exceptions are not mistaken for the failure you were catching.' },
      { front: 'Why is `except Exception: pass` dangerous?', back: 'It swallows your own bugs as well as expected failures, leaves no record, and lets the program continue with wrong data.' },
      { front: 'What does `raise X("...") from exc` do?', back: 'Chains the exceptions, setting `__cause__`, so the traceback shows the original error as the direct cause of the new one.' },
      { front: 'What does `with open(...)` guarantee?', back: 'That `__exit__` — here, closing the file — runs on every path out of the block, including an uncaught exception.' },
      { front: 'Why is decoding with latin-1 dangerous?', back: 'It maps all 256 byte values to characters, so it never raises. You get silent mojibake instead of a `UnicodeDecodeError` telling you the encoding was wrong.' },
      { front: 'Why pass `newline=""` when opening a CSV?', back: 'The csv module handles line endings itself; without it you get blank rows between records on Windows.' },
    ],

    challenge: {
      title: 'A loader that fails honestly',
      brief:
        'Write `load_records(path, max_bad_ratio=0.01)` that reads a line-delimited JSON file and returns a list of validated records. Define an exception hierarchy with a base `IngestError` and specific `RowParseError` and `SchemaError` subclasses carrying the line number and the raw text. Skip and count individual bad rows, log the first five with their line numbers, and raise `IngestError` if the proportion of bad rows exceeds `max_bad_ratio`. Read with an explicit encoding, handle a `UnicodeDecodeError` by reporting the byte offset, and guarantee the file is closed on every path. Write tests covering: a clean file, a file with two bad rows, a file that is entirely malformed, a missing file and a cp1252-encoded file.',
      language: 'python',
      acceptanceCriteria: [
        'A custom exception hierarchy is defined, with structured attributes rather than message-only exceptions',
        'Bad rows are counted and sampled in the log, never silently dropped',
        'The bad-row threshold causes a raise, and the message states the observed ratio',
        'FileNotFoundError propagates unchanged rather than being converted or swallowed',
        'Every open uses `with` and an explicit encoding, and a decode failure reports the byte position',
        'Tests use pytest.raises with a match pattern for each failure mode',
      ],
      starterCode:
        'import json\n\nclass IngestError(Exception):\n    """Base class for anything wrong with an input file."""\n\nclass RowParseError(IngestError):\n    ...\n\nclass SchemaError(IngestError):\n    ...\n\ndef load_records(path, max_bad_ratio=0.01):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who writes working scripts but panics at red text how exceptions work, how to decide what to catch, and why files should always be opened with `with`.',
      mustCover: [
        'An exception propagates up the call stack until something catches it or the program stops',
        'A traceback is read from the bottom up: type and message last, failing line just above',
        'Catch specific types you can act on; let everything else through',
        '`with` guarantees cleanup on every exit path, including an exception',
      ],
      bonusSignals: ['explains why bare except hides bugs', 'mentions the else clause and why it exists', 'mentions passing encoding explicitly'],
      sampleExplanation:
        'The first thing to say is that a traceback is not a telling-off, it is the most useful output your program ever produces. When a line cannot do its job — converting "n/a" to a number, opening a file that is not there — Python creates an object describing the problem and stops. That object travels back up through whatever called that line, and at each level Python asks: is there a handler here that matches this kind of problem? If nothing matches all the way to the top, the interpreter prints the trail it took and exits. Read that trail from the bottom. The last line names the type, like `ValueError`, and the message, which usually contains the exact value that caused the trouble. The lines above it show the path of calls, innermost last, so the second-to-last block is the line that actually broke and the ones above show who asked for it. Now the judgement, which is the part that separates working code from code you can operate. Catching an exception is a claim that you know what went wrong and can do something sensible about it. Skipping a malformed row, retrying a dropped connection, falling back to a default — those are real handling. So you name the specific type: `except ValueError`. What you must not do is write `except Exception: pass`, because that also catches your own typos and your own wrong assumptions, and turns them into silence. A program that stops with a traceback has told you exactly what is wrong; a program that quietly continues with half its data has told you nothing, and you will find out a fortnight later from a number that makes no sense. There are two more clauses worth knowing. `finally` runs no matter how the block ends, so it is where cleanup goes. And `else` runs only when nothing went wrong, which lets you keep the risky line by itself in the `try` and put the follow-up work somewhere it will not be mistaken for a failure. Finally, files. Opening a file is a promise to close it, and `with open(path, encoding="utf-8") as f:` keeps that promise for you even if the code inside the block raises. Add the encoding explicitly every single time, because the default depends on the machine, and the machine your code runs on in production is not the one on your desk.',
    },
  },
  {
    id: 'PY-021',
    domain: 'PY',
    module: 'Working Like an Engineer',
    topic: 'Shipping code other people can run',
    title: 'Modules, Environments, Testing and Clean Code',
    slug: 'modules-environments-and-testing',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['PY-012', 'PY-020'],
    related: ['PY-013', 'PY-015', 'PY-017'],
    tags: ['modules', 'packages', 'imports', 'virtualenv', 'pip', 'pyproject', 'pinning', 'pytest', 'pdb', 'pep8'],

    learningObjectives: [
      'Explain what a module and a package are, and trace how `import` finds and caches them',
      'Use `if __name__ == "__main__"` correctly and say what problem it solves',
      'Create and use a virtual environment, and explain why global installs break projects',
      'Distinguish a loose dependency specification from a pinned lock, and say when each belongs in a project',
      'Debug with a traceback first and `pdb` or `breakpoint()` second, rather than scattering prints',
      'Write pytest tests including a parametrised one, and structure a test so a failure identifies the cause',
      'State what PEP 8 does and does not cover, and what "clean code" means concretely in Python',
    ],

    terminology: [
      {
        term: 'Module',
        definition:
          'A single `.py` file, which becomes an object with a namespace when imported. Its top-level code runs exactly once per interpreter session, the first time it is imported.',
        simple: 'One Python file, used from another Python file.',
      },
      {
        term: 'Package',
        definition:
          'A directory of modules that can be imported as a unit, conventionally containing `__init__.py`. Dotted names such as `sklearn.metrics` reflect the directory structure.',
        simple: 'A folder of modules with a name of its own.',
      },
      {
        term: 'sys.path',
        definition:
          'The ordered list of directories Python searches for a module, starting with the script’s own directory and ending with the environment’s `site-packages`. The first match wins.',
        simple: 'The list of places Python looks when you write `import`.',
      },
      {
        term: 'Virtual environment',
        definition:
          'A self-contained directory holding its own interpreter link and `site-packages`, so that a project’s dependencies are isolated from every other project and from the system Python.',
        simple: 'A private box of libraries belonging to one project.',
      },
      {
        term: 'Pinning',
        definition:
          'Recording exact versions of every installed package, direct and transitive, so an install is reproducible. Distinct from declaring the loose ranges your project is compatible with.',
        simple: 'Writing down the exact versions so the install is the same next time.',
      },
      {
        term: 'Fixture',
        definition:
          'In pytest, a function marked `@pytest.fixture` that prepares state and is requested by name as a test argument, giving setup and teardown without inheritance or boilerplate.',
        simple: 'Reusable setup a test asks for by naming it.',
      },
      {
        term: 'PEP 8',
        definition:
          'The style guide for Python code: naming conventions, whitespace, line length and layout. It governs appearance, not design, and is largely automated by formatters such as Black and linters such as Ruff.',
        simple: 'The agreed house style for how Python should look.',
      },
    ],

    simpleExplanation:
      "Up to now your Python has probably lived in one file that you run yourself. This unit is about everything that has to be true before somebody else — a colleague, a server, or you in six months — can run it and get the same result. It has four parts, and they are all the same idea from different angles. Split code into modules so each file has one job and can be imported rather than copied. Give every project its own virtual environment, so installing a library for one project cannot silently break another. Write tests, so that when you change something you find out immediately whether you broke it, instead of finding out from a user. And keep the code tidy in the specific senses that matter: good names, small functions, no surprises. None of this is bureaucracy. Each piece exists because a particular kind of painful afternoon kept happening to people until they invented a way to stop it.",

    whyItExists:
      'Code that works once on one machine is worth very little. Modules exist because a single growing file becomes unreadable and unreusable; virtual environments because two projects needing different versions of the same library would otherwise be mutually exclusive; tests because manual checking does not scale and regressions are invisible; and style conventions because most of a codebase’s life is spent being read.',

    analogy: {
      scenario:
        'Think about a professional kitchen versus cooking at home. At home everything lives in one drawer, you taste as you go, and if it works tonight that is enough. A professional kitchen has stations, each with its own labelled tools that never migrate. Every dish has a written recipe with exact quantities, so the same plate comes out whichever chef is on shift. There is a checklist run before service so problems are found before a customer sees them. And there is a house convention for how everything is labelled and stacked, so anyone can find anything without asking.',
      mapping: [
        { from: 'Separate stations with their own tools', to: 'Modules and packages, each with one clear responsibility' },
        { from: 'Tools that never migrate between stations', to: 'A virtual environment per project, so dependencies cannot leak' },
        { from: 'Exact quantities in the written recipe', to: 'A pinned lock file, so the install is reproducible' },
        { from: 'The checklist run before service', to: 'The test suite run before merging' },
        { from: 'House labelling conventions', to: 'PEP 8 and an automated formatter' },
        { from: 'Tasting as you go at home', to: 'Scattering `print()` calls instead of reading the traceback or using a debugger' },
      ],
      bridge:
        'The mapping holds because both are answers to the same question: how do you get the same result reliably when more than one person, or more than one moment in time, is involved? Each practice converts something held in one person’s head — where the tools are, which versions worked, whether it still runs — into something written down and checkable.',
      limitations:
        'The kitchen image makes all of this sound like discipline for its own sake. In practice the effort must match the stakes: a twenty-line exploration in a notebook genuinely does not need a package layout and a test suite, and pretending otherwise is how people learn to resent good practice.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What `import pandas` actually does',
        caption: 'Five steps, and each one explains a common import failure.',
        steps: [
          { label: 'Check `sys.modules`', detail: 'Already imported in this process? Return the cached module object immediately — which is why top-level code runs only once.' },
          { label: 'Search `sys.path` in order', detail: 'The script’s own directory comes first. This is why a file called `random.py` next to your script shadows the standard library.' },
          { label: 'Load and execute the module', detail: 'Every top-level statement in the file runs, top to bottom, in a fresh namespace.' },
          { label: 'Cache it in `sys.modules`', detail: 'Subsequent imports anywhere in the process reuse this same object — modules are effectively singletons.' },
          { label: 'Bind the name locally', detail: '`import x` binds `x`; `from x import y` binds only `y`, but still executes all of `x` first.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Declaring dependencies versus pinning them',
        caption: 'Two different jobs that people routinely confuse, and the confusion is what breaks builds.',
        left: {
          heading: 'Declare — pyproject.toml',
          points: [
            'States what your project is compatible with: `pandas>=2.0,<3`',
            'Lists direct dependencies only',
            'Hand-written and reviewed as an intentional decision',
            'Lets a resolver pick the best combination on install',
            'The right thing to publish for a library',
          ],
        },
        right: {
          heading: 'Pin — lock file / pip freeze',
          points: [
            'States what was actually installed: `pandas==2.2.1`',
            'Includes every transitive dependency too',
            'Generated, never hand-edited',
            'Guarantees the same bytes on every machine',
            'The right thing to deploy for an application',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Debugging tools, in the order you should reach for them',
        caption: 'Most people skip straight to the last row and wonder why debugging is slow.',
        columns: ['Tool', 'Best for', 'Cost', 'When it is the wrong choice'],
        rows: [
          ['Read the traceback', 'Almost everything — the type, message and failing line are usually enough', 'Seconds', 'Never; this is always step one'],
          ['pytest -x --lf', 'Reproducing a failure in isolation and re-running only it', 'Seconds', 'When the bug only appears in a long-running process'],
          ['breakpoint()', 'Inspecting live state: what is this variable really holding here?', 'Minutes', 'In code running unattended in production'],
          ['logging at DEBUG', 'Intermittent or production-only problems you cannot reproduce locally', 'Some setup', 'For a bug you can reproduce in one command'],
          ['Scattered print()', 'A quick look in a script you are actively writing', 'Cheap, then expensive', 'Once there are more than two or three; they get committed and rot'],
        ],
      },
      {
        kind: 'annotated',
        title: 'A project layout that does not fight you',
        subject: 'myproject/\n  pyproject.toml\n  src/mypkg/__init__.py\n  src/mypkg/data.py\n  src/mypkg/model.py\n  tests/test_data.py\n  .venv/',
        annotations: [
          { part: 'pyproject.toml', note: 'Declares the project name, its dependencies and the configuration for Ruff, Black, mypy and pytest. One file, one source of truth.' },
          { part: 'src/mypkg/', note: 'The importable package. Putting it under `src/` forces you to install the project, so tests exercise the installed package rather than accidentally importing loose files.' },
          { part: '__init__.py', note: 'Marks the directory as a package and defines what `import mypkg` exposes. Keep it thin; heavy imports here slow every entry point.' },
          { part: 'tests/', note: 'Outside the package, so tests are not shipped to users. Files named `test_*.py` are discovered automatically.' },
          { part: '.venv/', note: 'The virtual environment. Always in `.gitignore` — it is a build artefact of the lock file, not source.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Write a test and watch it fail',
        caption: 'Write a small function, parametrise a test over several inputs, and read the assertion output.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'A module is a namespace object produced by executing a Python source file once and caching it in `sys.modules`; a package is a module whose `__path__` allows submodule resolution. Import resolves a dotted name against `sys.path` in order, executing and caching each component. A virtual environment is a directory providing an isolated `site-packages` and interpreter link that takes precedence on `sys.path`, so that dependency resolution is scoped to one project rather than to the system installation.',

    codeExamples: [
      {
        language: 'python',
        title: 'Modules, imports and the main guard',
        runnable: true,
        code: `# ---- file: metrics.py -------------------------------------------------
"""Scoring helpers. Importable without side effects."""

def accuracy(y_true, y_pred):
    correct = sum(a == b for a, b in zip(y_true, y_pred))
    return correct / len(y_true)

print("metrics.py top level ran")      # runs once, on first import only

def _demo():
    print("accuracy:", accuracy([1, 0, 1], [1, 1, 1]))

if __name__ == "__main__":
    # Runs only when executed as \`python metrics.py\`, not when imported.
    _demo()

# ---- file: main.py ----------------------------------------------------
import metrics                          # executes metrics.py once
import metrics as m2                    # cached: does NOT execute it again
from metrics import accuracy            # still executes the whole module first

print(metrics is m2, metrics.__name__)
print(accuracy([1, 0], [1, 0]))`,
        output: `metrics.py top level ran
True metrics
1.0`,
        explanation:
          '"metrics.py top level ran" appears once even though the module is imported three ways, because after the first import the module object is cached in `sys.modules` and every later import binds a name to that same object. The `if __name__ == "__main__"` guard is what stops `_demo()` from running when someone imports the file: `__name__` is `"__main__"` only for the file you launched, and the module’s own name otherwise. Without the guard, importing `metrics` would print demo output, and a script with a training loop at the top level would start training the moment anyone imported it.',
      },
      {
        language: 'bash',
        title: 'A reproducible environment, from nothing to a locked install',
        code: `# One environment per project, created inside the project directory.
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\\Scripts\\activate
python -m pip install --upgrade pip

# Confirm you are inside it before installing anything.
which python                       # .../myproject/.venv/bin/python
python -c "import sys; print(sys.prefix)"

# Declare compatibility ranges in pyproject.toml, then install the project.
python -m pip install -e ".[dev]"

# Freeze what was ACTUALLY installed, transitive dependencies included.
python -m pip freeze --exclude-editable > requirements.lock

# On any other machine, or in CI, reproduce it exactly.
python -m pip install -r requirements.lock
python -m pip check                # verify no conflicting requirements`,
        output: `/home/user/myproject/.venv/bin/python
/home/user/myproject/.venv
Successfully installed mypkg-0.1.0 numpy-2.1.3 pandas-2.2.3 pytest-8.3.3
No broken requirements found.`,
        explanation:
          'The sequence matters. Creating the environment inside the project keeps it disposable — delete `.venv` and rebuild from the lock file at any time. Checking `which python` before installing is the habit that prevents the single most common mistake, installing into the system Python because the environment was never activated. `pip install -e .` installs your own package in editable mode so `import mypkg` works from anywhere without path manipulation. And `pip freeze` produces the lock: `pyproject.toml` says what you are compatible with, the lock says what you tested, and only the lock makes CI reproduce your machine.',
      },
      {
        language: 'python',
        title: 'pytest: assertions, a parametrised test, and a fixture',
        runnable: true,
        code: `# ---- file: tests/test_metrics.py --------------------------------------
import pytest
from mypkg.metrics import accuracy, normalise

def test_perfect_prediction():
    assert accuracy([1, 0, 1], [1, 0, 1]) == 1.0   # plain assert, rich output

@pytest.mark.parametrize(
    "y_true, y_pred, expected",
    [
        ([1, 1], [1, 1], 1.0),
        ([1, 1], [0, 0], 0.0),
        ([1, 0, 1, 0], [1, 0, 0, 0], 0.75),
        pytest.param([], [], 0.0, marks=pytest.mark.xfail(reason="empty input divides by zero")),
    ],
    ids=["all-correct", "all-wrong", "three-quarters", "empty"],
)
def test_accuracy_cases(y_true, y_pred, expected):
    assert accuracy(y_true, y_pred) == pytest.approx(expected)

def test_mismatched_lengths_raise():
    with pytest.raises(ValueError, match="same length"):
        accuracy([1, 0, 1], [1, 0])

@pytest.fixture
def sample_rows(tmp_path):
    path = tmp_path / "rows.csv"             # a real temp dir, cleaned up for you
    path.write_text("name,score\\nada,92\\nbob,78\\n", encoding="utf-8")
    return path

def test_normalise_reads_file(sample_rows):
    assert normalise(sample_rows) == [("ada", 0.92), ("bob", 0.78)]`,
        output: `tests/test_metrics.py::test_perfect_prediction PASSED
tests/test_metrics.py::test_accuracy_cases[all-correct] PASSED
tests/test_metrics.py::test_accuracy_cases[all-wrong] PASSED
tests/test_metrics.py::test_accuracy_cases[three-quarters] PASSED
tests/test_metrics.py::test_accuracy_cases[empty] XFAIL
tests/test_metrics.py::test_mismatched_lengths_raise PASSED
tests/test_metrics.py::test_normalise_reads_file PASSED

6 passed, 1 xfailed in 0.06s`,
        explanation:
          'Four things to take from this. Plain `assert` is enough — pytest rewrites it so a failure shows both operands, which is why nobody writes `assertEqual` any more. `parametrize` turns one test body into four independently reported cases, so a failure names which input broke rather than stopping at the first; the `ids` make that output readable. `pytest.raises(..., match=...)` tests the error path, which is where bugs actually hide, and asserting on the message stops it passing for the wrong reason. And `tmp_path` is a built-in fixture giving a real directory that is created and removed for you, so tests touching files stay isolated and can run in parallel.',
      },
      {
        language: 'python',
        title: 'Debugging with pdb rather than print archaeology',
        runnable: true,
        code: `def normalise(rows):
    total = sum(score for _, score in rows)
    return [(name, score / total) for name, score in rows]

def main():
    rows = [("ada", 92), ("bob", 78), ("cy", 0)]
    breakpoint()                  # Python 3.7+; equivalent to import pdb; pdb.set_trace()
    return normalise(rows)

main()

# (Pdb) p rows                 -> [('ada', 92), ('bob', 78), ('cy', 0)]
# (Pdb) p sum(s for _, s in rows)
# 170
# (Pdb) n                      -> step over the next line
# (Pdb) s                      -> step INTO normalise
# (Pdb) l                      -> list source around the current line
# (Pdb) w                      -> print the stack: where am I and who called me
# (Pdb) p score, total          -> inspect any expression in this frame
# (Pdb) c                      -> continue until the next breakpoint or the end`,
        output: `> example.py(9)main()
-> return normalise(rows)
(Pdb)`,
        explanation:
          'A debugger answers a question `print` cannot: what is true *here*, in this frame, right now, including expressions you did not think to print. The commands worth memorising are `n` (next line), `s` (step into a call), `l` (list source), `w` (where am I in the stack), `p` (print an expression) and `c` (continue). Two practical notes: `pytest --pdb` drops you into exactly this prompt at the point a test failed, with all the local state intact, which is usually faster than reproducing the failure by hand; and `breakpoint()` respects the `PYTHONBREAKPOINT` environment variable, so setting it to `0` disables every breakpoint without editing code.',
      },
      {
        language: 'text',
        title: 'One configuration file for the whole toolchain',
        code: `[project]
name = "mypkg"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
  "pandas>=2.0,<3",          # a compatible RANGE, not a pin
  "scikit-learn>=1.4",
]

[project.optional-dependencies]
dev = ["pytest>=8", "ruff>=0.6", "mypy>=1.11"]

[tool.ruff]
line-length = 100

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B"]   # errors, pyflakes, import order, upgrades, bugbear

[tool.pytest.ini_options]
addopts = "-q --strict-markers"
testpaths = ["tests"]`,
        explanation:
          'This single file replaces `setup.py`, `setup.cfg`, `requirements-dev.txt`, `.flake8` and `pytest.ini`. The important distinction is in `dependencies`: these are ranges describing compatibility, which is what a library should publish, while the exact versions live in a generated lock file used for deployment. The Ruff rule selection is worth copying — `F` catches genuine bugs such as unused names and undefined variables, `I` keeps imports sorted so diffs stay small, and `B` flags real traps like a mutable default argument. `--strict-markers` makes a typo in a `@pytest.mark` name an error rather than a silently skipped test.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The notebook that cannot be rerun',
        usage:
          'A model trained in a notebook six months ago now fails to load because the pickle was written by an older scikit-learn. A pinned lock file committed alongside the artefact is what would have made it reproducible, and is why serious teams record the environment with every trained model.',
      },
      {
        context: 'CI on every pull request',
        usage:
          'A GitHub Actions workflow creates a fresh virtual environment, installs from the lock file, runs `ruff check`, `mypy` and `pytest`, and refuses to merge on failure. The value is not the tools; it is that the same commands run identically on everyone’s branch.',
      },
      {
        context: 'A shared library inside a company',
        usage:
          'Feature engineering lives in an installable package imported by the training job, the batch scorer and the API, so a fix lands in all three. Without the package they drift, and training and serving quietly compute different features.',
      },
      {
        context: 'A dependency conflict on a laptop',
        usage:
          'Project A needs numpy 1.26 for an old model, project B needs numpy 2.x. Installed globally these are mutually exclusive and `pip install` for one silently breaks the other; with one virtual environment each, both work and neither is aware of the other.',
      },
    ],

    projectConnections: [
      { tool: 'venv / uv', role: 'Creates the isolated environment. `uv` does the same job substantially faster and resolves and locks in one step.' },
      { tool: 'pytest', role: 'The de facto test runner: plain asserts, fixtures, parametrisation and a large plugin ecosystem.' },
      { tool: 'Ruff', role: 'Linter and formatter in one, fast enough to run on every save; replaces flake8, isort and Black in most projects.' },
      { tool: 'Docker', role: 'Copies the lock file and installs from it, which is how the reproducibility you built locally survives into production.' },
      { tool: 'pre-commit', role: 'Runs the formatter and linter before a commit is created, so style never appears in a code-review diff.' },
    ],

    commonMistakes: [
      {
        mistake: 'Installing packages globally, or into the wrong environment',
        why: 'Two projects needing different versions of the same library become mutually exclusive, and `pip install` for one silently changes the other. The subtler version is forgetting to activate, so everything installs into the system Python and the project appears to work only on your machine.',
        fix: 'Create `.venv` inside every project, activate it, and check `which python` before installing. Add `.venv/` to `.gitignore`.',
      },
      {
        mistake: 'Naming a file after a standard-library or installed module',
        why: 'The script’s own directory is first on `sys.path`, so a local `random.py`, `json.py` or `email.py` shadows the real one for the whole process. The error usually appears inside a third-party library and mentions a missing attribute, never your file.',
        fix: 'Avoid standard-library names. When an import error makes no sense, check for a shadowing file and a stale `__pycache__` next to it.',
      },
      {
        mistake: 'Putting work at the top level of an importable module',
        why: 'Module top-level code runs on import, so importing a training script starts training, and importing a module that opens a database connection opens one in every process that touches it — including your test collector.',
        fix: 'Put executable behaviour in functions and call it under `if __name__ == "__main__":`.',
      },
      {
        mistake: 'Confusing `pyproject.toml` ranges with a lock file',
        why: 'Deploying from loose ranges means a transitive dependency can release a new version overnight and change behaviour with no commit on your side. Conversely, pinning exact versions in a published library makes it uninstallable alongside anything else.',
        fix: 'Declare ranges for what you are compatible with, generate a lock for what you deploy, and commit both.',
      },
      {
        mistake: 'Tests that assert nothing, or assert everything at once',
        why: 'A test that only calls the function and checks it does not raise passes for a function returning nonsense. A test with twelve assertions stops at the first failure, so you fix one thing and discover the next on the following run.',
        fix: 'Assert on a specific expected value, and split cases with `parametrize` so each is reported separately.',
      },
      {
        mistake: 'Treating PEP 8 as the whole of clean code',
        why: 'Correct spacing and 79-character lines say nothing about whether a function does one thing, whether names reveal intent, or whether the data flow is obvious. Perfectly formatted code can be unreadable.',
        fix: 'Automate formatting entirely with Ruff or Black so it never costs attention, and spend the attention you save on naming, function size and removing hidden state.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does `if __name__ == "__main__":` do, and why is it needed?',
        answer:
          'Python sets the module-level variable `__name__` to `"__main__"` for the file you actually launched, and to the module’s own dotted name for anything imported. Guarding code with that comparison therefore means "run this only when this file is the entry point". It matters because importing a module executes all of its top-level code, so without the guard, importing a script would run its demo, start its training loop, or open its database connection as a side effect — including when a test runner imports it for collection. The pattern that follows from this is to keep modules import-safe: define functions and classes at the top level, and put the actual invocation inside the guard, usually as a one-line call to a `main()` function.',
      },
      {
        level: 'intermediate',
        question: 'Explain the difference between `requirements.txt`, a lock file and the dependencies in `pyproject.toml`.',
        answer:
          'They answer two different questions that people routinely conflate. `pyproject.toml` dependencies declare what your project is compatible with, as ranges such as `pandas>=2.0,<3`, listing direct dependencies only. That is what you publish, because pinning exact versions in a library makes it impossible to install alongside anything else. A lock file — produced by `pip freeze`, `pip-compile`, `uv lock` or Poetry — records what was actually installed, every transitive dependency included, at exact versions and ideally with hashes. That is what you deploy and what CI installs, because it is the only thing that makes two machines identical. A plain `requirements.txt` is used for both jobs in different projects, which is precisely why it causes confusion; the useful discipline is to treat it as a lock, generate it rather than hand-edit it, and keep the human-authored ranges in `pyproject.toml`.',
        followUp:
          'Strong answers mention hashes for supply-chain safety, and that the lock must be regenerated deliberately rather than drifting.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you test a machine-learning pipeline, given that model quality is not deterministic?',
        answer:
          'By separating the parts that are deterministic from the part that is not, and testing them very differently. The deterministic majority — feature engineering, data validation, splitting, encoding, serialisation, the inference wrapper — is ordinary code and gets ordinary unit tests with fixed inputs and exact expected outputs; that is also where most real bugs live. For the training itself I would write behavioural tests rather than accuracy assertions: that the pipeline runs end to end on a tiny fixture dataset, that a fixed seed reproduces identical weights, that the loss decreases over a handful of steps, that shapes and dtypes are what the next stage expects, and that the model can be saved and reloaded to give identical predictions. Model quality belongs in a separate evaluation stage with a threshold on a held-out set, treated as a gate on a pipeline run rather than as a unit test, because it is slow and legitimately noisy. I would also add a test that training and serving compute identical features for the same input, since training-serving skew is the failure that unit tests most often miss.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A colleague reports that `import requests` fails with `AttributeError: partially initialized module ... has circular import` in a directory containing their own `requests.py`. Explain the mechanism, and describe how you would confirm the diagnosis in one command.',
        hint: 'Which directory is first on `sys.path`, and what does `module.__file__` tell you?',
        solution:
          'The script’s own directory is placed first on `sys.path`, so `import requests` finds their local `requests.py` before the installed library. Their file then presumably imports something that imports `requests` again, and because the half-executed module is already cached in `sys.modules`, the second import returns an incomplete object — hence "partially initialized".\n\nConfirm it in one command: `python -c "import requests; print(requests.__file__)"` run from that directory. If the path points into the project rather than into `site-packages`, the diagnosis is certain. The fix is to rename the file, and to delete the neighbouring `__pycache__` directory, because a stale `requests.pyc` can keep shadowing even after the source is renamed. The general rule is never to name a module after anything you also import.',
      },
      {
        prompt:
          'Write a parametrised pytest test for a function `split_name(full)` that returns `(first, last)`. Cover a normal two-part name, a single-word name where last should be an empty string, a name with a middle part, and leading or trailing whitespace. Give each case a readable id.',
        hint: 'One `@pytest.mark.parametrize` with a list of tuples and an `ids` list. Decide the expected behaviour for each case before writing the assertion.',
        language: 'python',
        starterCode: 'import pytest\nfrom mypkg.names import split_name\n\n@pytest.mark.parametrize(...)\ndef test_split_name(full, expected):\n    ...\n',
        solution:
          'import pytest\nfrom mypkg.names import split_name\n\n@pytest.mark.parametrize(\n    "full, expected",\n    [\n        ("Ada Lovelace", ("Ada", "Lovelace")),\n        ("Grace", ("Grace", "")),\n        ("Ada King Lovelace", ("Ada", "King Lovelace")),\n        ("  Alan Turing  ", ("Alan", "Turing")),\n    ],\n    ids=["two-parts", "single-word", "middle-name", "surrounding-whitespace"],\n)\ndef test_split_name(full, expected):\n    assert split_name(full) == expected\n\nEach case is reported independently, so a failure prints `test_split_name[single-word]` and you know immediately which behaviour broke, rather than the whole test stopping at the first bad input. Writing the expectations down first is the real exercise: deciding that a single word yields an empty surname, and that a three-part name keeps the middle with the surname, are design decisions, and a parametrised test is where they get recorded so the next person does not have to guess.',
      },
      {
        prompt:
          'A script works on your laptop and fails in CI with `ModuleNotFoundError: No module named \'mypkg\'`. List the three most likely causes and the check that distinguishes each.',
        hint: 'Think about what is on `sys.path` in each place, and what was installed.',
        solution:
          'Cause one: the package was never installed into the CI environment, and on your laptop it imports only because you run from the project root where the directory happens to be on `sys.path`. Check with `python -c "import sys; print(sys.path)"` in CI and look for the project root, and with `pip list | grep mypkg`. Fix by adding `pip install -e .` to the CI setup and adopting a `src/` layout, which removes the accidental local import so the problem cannot hide.\n\nCause two: CI is using a different interpreter from the one the packages were installed into — a common result of installing with `pip` but running with `python3`, or of a setup step that activates the environment in one shell step and runs tests in another where the activation has been lost. Check by printing `sys.executable` at both the install and the run step and comparing.\n\nCause three: the package directory is missing from the built artefact — no `__init__.py`, or a packaging configuration that does not include it, so `pip install` succeeds but installs nothing importable. Check with `pip show -f mypkg`, which lists the files actually installed.',
      },
    ],

    quiz: [
      {
        id: 'PY-021-q1',
        type: 'mcq',
        concept: 'main guard',
        prompt: 'What is the value of `__name__` inside a module that has been imported by another file?',
        options: [
          'The module’s own name, such as "metrics"',
          'Always "__main__"',
          'The name of the file that imported it',
          'An empty string until the module finishes executing',
        ],
        answerIndex: 0,
        explanation:
          '`__name__` is `"__main__"` only in the file you launched directly. Everywhere else it is the module’s own dotted name, which is exactly what makes the `if __name__ == "__main__":` guard able to distinguish "run" from "import".',
      },
      {
        id: 'PY-021-q2',
        type: 'truefalse',
        concept: 'import caching',
        prompt: 'Importing the same module twice in one process executes its top-level code twice.',
        answer: false,
        explanation:
          'False. After the first import the module object is cached in `sys.modules`, and later imports bind a name to that same object without re-executing it. This is also why editing a module mid-session in a notebook has no effect until you reload or restart.',
      },
      {
        id: 'PY-021-q3',
        type: 'mcq',
        concept: 'dependency management',
        prompt: 'You are deploying an application to production. Which should the container install from?',
        options: [
          'A generated lock file with exact pinned versions of every direct and transitive dependency',
          'The loose ranges declared in pyproject.toml, so it always gets the latest compatible versions',
          'Whatever is already installed in the base image',
          'A hand-edited requirements.txt listing only the direct dependencies',
        ],
        answerIndex: 0,
        explanation:
          'Only a full lock makes the install reproducible. Loose ranges mean a transitive dependency can publish a release overnight and change your behaviour with no commit on your side — the classic "it worked yesterday" deployment failure.',
      },
      {
        id: 'PY-021-q4',
        type: 'fill',
        concept: 'pytest',
        prompt: 'Which pytest decorator runs one test function repeatedly over several sets of inputs?',
        answers: ['pytest.mark.parametrize', 'parametrize', '@pytest.mark.parametrize', 'mark.parametrize'],
        explanation:
          '`@pytest.mark.parametrize` reports each case as its own test, so a failure names the specific input that broke rather than stopping the whole function at the first bad case.',
      },
      {
        id: 'PY-021-q5',
        type: 'debug',
        language: 'python',
        concept: 'import shadowing',
        prompt: 'A file `random.py` sits next to this script, and it fails with `AttributeError: module \'random\' has no attribute \'randint\'`. Why?',
        code: 'import random\nprint(random.randint(1, 6))',
        options: [
          'The local random.py shadows the standard library because the script directory is first on sys.path',
          '`randint` was removed from the standard library and renamed to `randrange`',
          'The import needs to be `from random import randint` to reach the standard library',
          'A virtual environment must be activated before the standard library can be imported',
        ],
        answerIndex: 0,
        explanation:
          'Python searches the script’s own directory first, so a local file wins over the standard library for the whole process. Rename the file and delete the neighbouring `__pycache__`, since a stale `.pyc` can keep shadowing after the rename.',
      },
      {
        id: 'PY-021-q6',
        type: 'multi',
        concept: 'clean code',
        prompt: 'Which of these are genuinely part of "clean code" in Python, as opposed to style a formatter can settle for you?',
        options: [
          'Names that state what a value is, so comments explaining them become unnecessary',
          'Functions small enough to describe in one sentence without the word "and"',
          'Four-space indentation rather than tabs',
          'Avoiding hidden state, such as functions that mutate their arguments without saying so',
          'Lines wrapped at exactly 79 characters',
          'Raising specific exceptions so callers can handle the case they care about',
        ],
        answerIndices: [0, 1, 3, 5],
        explanation:
          'Indentation and line length are formatting: real decisions, but ones Ruff or Black should make once and never ask you about again. Naming, function size, avoiding hidden mutation and honest error signalling are design choices no tool can make, and they are what determine whether the next person can change the code safely.',
      },
      {
        id: 'PY-021-q7',
        type: 'explain',
        concept: 'reproducibility',
        prompt:
          'A model trained eight months ago cannot be reproduced: the script runs but the metrics differ. Explain what was probably not captured, and what you would put in place so this cannot happen again.',
        rubric: [
          'Identifies that code alone is not enough: the environment, data version and seeds are part of the result',
          'Distinguishes declared ranges from a pinned lock and explains why the lock is what reproduces',
          'Proposes concrete artefacts recorded alongside the model',
        ],
        sampleAnswer:
          'The script was captured and everything else around it was not. A result is produced by four things together: the code, the exact versions of every library beneath it, the exact data, and the sources of randomness. If dependencies were installed from loose ranges, then some transitive package has since published a new version — a different default in a scikit-learn estimator, a changed floating-point path in numpy — and the same code now computes something slightly different. If the data lives at a path that gets overwritten, the input itself may have changed. And if seeds were never fixed, shuffling and initialisation differ on every run regardless. To make it reproducible I would record, alongside every trained model, a pinned lock file of the full environment including transitive dependencies, the git commit of the training code, a content hash or version identifier for the dataset, the resolved configuration, and the seeds used. In practice that means an experiment tracker capturing these automatically, training inside a container built from the lock file so the environment is the artefact rather than a description of one, and a test that trains on a small fixture with a fixed seed and asserts identical weights, so that the day reproducibility breaks is the day someone sees a red test rather than eight months later.',
        explanation:
          'The examinable insight is that the environment and the data are part of the result, so reproducibility is an artefact you record deliberately rather than a property code has by default.',
      },
    ],

    flashcards: [
      { front: 'What does `if __name__ == "__main__":` do?', back: 'Runs the block only when the file is executed directly, not when it is imported. `__name__` is `"__main__"` only for the entry-point file.' },
      { front: 'Why does a module’s top-level code run only once?', back: 'The module object is cached in `sys.modules` on first import; later imports reuse it without re-executing.' },
      { front: 'Why one virtual environment per project?', back: 'So two projects can need different versions of the same library without one install breaking the other, and so the environment is disposable and rebuildable.' },
      { front: 'Declared ranges versus a lock file?', back: 'Ranges in pyproject.toml say what you are compatible with, for publishing. A generated lock says what was actually installed, including transitive deps, for deploying.' },
      { front: 'Why did `import random` find the wrong module?', back: 'The script’s own directory is first on `sys.path`, so a local `random.py` shadows the standard library for the whole process.' },
      { front: 'What does `@pytest.mark.parametrize` give you?', back: 'One test body run over many inputs, each reported as a separate case, so a failure names the exact input that broke.' },
      { front: 'What is `breakpoint()`?', back: 'Drops into pdb at that line. Useful commands: n (next), s (step in), l (list), w (where), p (print expression), c (continue).' },
      { front: 'What does PEP 8 not cover?', back: 'Design. Naming quality, function size, hidden state and honest error signalling are what make code clean; formatting should be automated and forgotten.' },
    ],

    challenge: {
      title: 'Turn a script into a project',
      brief:
        'Take a single 200-line analysis script and convert it into a real project. Split it into a `src/` package with at least three modules that each have one responsibility, and a thin command-line entry point guarded by `if __name__ == "__main__":`. Add a pyproject.toml declaring dependency ranges and configuring Ruff and pytest, create a virtual environment, install the project editable, and generate a committed lock file. Write a test suite with at least one parametrised test, one test asserting an exception with a message match, and one using `tmp_path` for file input. Make `ruff check`, `ruff format --check` and `pytest` all pass, then write a short README section a new colleague could follow from a clean clone to a passing test run.',
      language: 'bash',
      acceptanceCriteria: [
        'No module executes work on import; all behaviour is in functions invoked from a guarded entry point',
        'pyproject.toml declares ranges, and a separately generated lock file pins the full transitive set',
        'The test suite includes a parametrised test with readable ids and a pytest.raises test with a match pattern',
        'Tests touching the filesystem use tmp_path rather than writing into the repository',
        'ruff check, ruff format --check and pytest all exit zero',
        'The README instructions work from a clean clone with no undocumented steps',
      ],
      starterCode:
        '# From a clean clone, these commands must work:\npython -m venv .venv\nsource .venv/bin/activate\npython -m pip install -e ".[dev]"\nruff check .\npytest -q\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who writes working single-file scripts why modules, virtual environments, tests and style conventions exist, and what each one prevents. Make them want to use these rather than feel nagged into it.',
      mustCover: [
        'A module is a file that can be imported, and import runs its top-level code once',
        'A virtual environment isolates one project’s dependencies from every other project',
        'Pinned versions are what make an install reproducible on another machine',
        'Tests catch regressions automatically, and a parametrised test reports which input failed',
      ],
      bonusSignals: ['explains the main guard as import-safety rather than ceremony', 'distinguishes formatting from design in "clean code"', 'matches the effort to the stakes'],
      sampleExplanation:
        'Every one of these practices exists because of a specific bad afternoon that kept repeating until somebody invented a way to stop it, so it is worth hearing them as solutions rather than as rules. Start with modules. A module is just a Python file you can import from another file, and the thing to know is that importing it runs everything at its top level, once, and then caches it. That single fact explains the `if __name__ == "__main__":` line you keep seeing: it means "only do this when someone runs this file directly". Without it, importing your training script would start training, and importing your data module would open a database connection — including when the test runner imports the file just to look inside it. So the habit is: modules define things, and the doing goes inside the guard. Next, environments. Install a library and by default it goes into one shared place, so project A and project B are forced to agree about every version forever. They will not. A virtual environment gives each project its own private folder of libraries, so they never meet. It costs one command and it eliminates a whole class of afternoon. The companion idea is pinning. Your project file says roughly what you are compatible with — pandas 2-something — but for anything you actually deploy you want a generated lock file recording the exact version of every library, including the ones your libraries pulled in that you have never heard of. That file is the difference between "works on my machine" and "works". Then tests. The honest argument for testing is not correctness in the abstract, it is that you will change this code later and you need to know within ten seconds whether you broke something, instead of finding out from a user. With pytest a test is a function whose name starts with `test_` containing a plain `assert`, and if you need the same check over several inputs, `@pytest.mark.parametrize` runs the body once per input and tells you exactly which one failed. Start with the two or three cases you already check by hand each time; you are simply writing them down. Also learn to debug rather than to guess: read the traceback from the bottom, and when you need to see live state, put `breakpoint()` in and look around instead of adding twenty prints you will later have to remove. Finally, clean code. Some of it is formatting — spacing, line length, import order — and the right answer there is to let Ruff or Black decide so it never costs you a thought. The part that matters is the part no tool can do: names that say what a thing is, functions small enough to describe without the word "and", no quiet mutation of things you were handed, and errors that say what actually went wrong. Match the effort to the stakes, though. A twenty-line exploration does not need a package layout and a test suite, and pretending it does is how people learn to resent all of this.',
    },
  },
];
