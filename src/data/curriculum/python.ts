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
];
