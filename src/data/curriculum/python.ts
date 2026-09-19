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
];
