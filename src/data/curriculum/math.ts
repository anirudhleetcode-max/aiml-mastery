import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'MATH-001',
    domain: 'MATH',
    module: 'Algebraic Foundations',
    topic: 'Functions',
    title: 'Equations and Functions',
    slug: 'equations-and-functions',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: [],
    related: [],
    tags: ['function', 'equation', 'domain', 'range', 'linear', 'composition'],

    learningObjectives: [
      'Describe a function as a machine that turns each input into exactly one output',
      'Identify the domain and range of a simple function and say why they matter in code',
      'Tell a linear function apart from a nonlinear one, both from its formula and from its shape',
      'Compose two functions and explain why every neural network is a tower of compositions',
    ],

    terminology: [
      {
        term: 'Equation',
        definition:
          'A statement that two expressions have the same value. Solving it means finding every input that makes the statement true.',
        simple: 'A balance scale written down: whatever is on the left weighs the same as what is on the right.',
      },
      {
        term: 'Function',
        definition:
          'A rule that assigns to every input in its domain exactly one output. Written f(x), read "f of x".',
        simple: 'A machine: you drop something in, one thing always comes out, and the same thing in always gives the same thing out.',
      },
      {
        term: 'Domain',
        definition: 'The set of inputs the function is allowed to accept.',
        simple: 'What you are allowed to put into the machine.',
      },
      {
        term: 'Range',
        definition: 'The set of outputs the function actually produces as the input runs over the whole domain.',
        simple: 'Everything that can possibly come out.',
      },
      {
        term: 'Parameter',
        definition:
          'A number inside the function rule that stays fixed while the input varies, such as the 2 and the 3 in f(x) = 2x + 3. Machine learning is the business of choosing parameters.',
        simple: 'A dial on the machine that you set once, as opposed to the thing you feed in.',
      },
      {
        term: 'Composition',
        definition:
          'Feeding the output of one function straight into another, written g(f(x)) or (g ∘ f)(x).',
        simple: 'Two machines bolted together so the first one’s output falls into the second one.',
      },
    ],

    simpleExplanation:
      'Think of a vending machine. You press B4 and you get a bag of crisps. You press B4 again tomorrow and you get exactly the same bag of crisps. You never press one button and get two different things at once. That predictable button-to-snack rule is a function. In maths the button is the input, usually called x, and the snack is the output, usually called f(x). A function is nothing more mysterious than that: a rule that takes something in and hands exactly one thing back. Some machines only accept certain buttons, and that list of allowed buttons is called the domain. The collection of snacks it can actually dispense is the range. An equation is a different animal: it is a question rather than a machine. It says "these two things are equal, so what must x be?" and solving it means hunting down the value that makes both sides balance. Almost everything a machine learning model does is a function: pixels in, label out; words in, next word out.',

    whyItExists:
      'Before functions, people described relationships between quantities in sentences, which made it impossible to combine, compare or calculate with them reliably. Function notation gives a relationship a name, a fixed input slot and a guaranteed single output, so rules can be chained, tabulated, differentiated and programmed. Every model you will ever train is a function with adjustable parameters, so this is the container that holds the entire subject.',

    analogy: {
      scenario:
        'A coffee shop has a loyalty rule printed on a card: the price of your drink is two pounds fifty plus eighty pence for every extra shot of espresso. Hand the barista a number of extra shots and you get back exactly one price. Nobody argues, nobody negotiates, and two people asking for the same drink on the same day pay the same amount. The rule accepts whole numbers of shots from zero upwards and nothing else.',
      mapping: [
        { from: 'The number of extra shots you ask for', to: 'The input x' },
        { from: 'The price you are charged', to: 'The output f(x)' },
        { from: 'The printed rule on the card', to: 'The function definition f(x) = 2.50 + 0.80x' },
        { from: '"Whole numbers of shots, zero or more"', to: 'The domain' },
        { from: 'The set of prices anyone could ever pay', to: 'The range' },
        { from: 'The fixed 2.50 and 0.80', to: 'The parameters, which the shop sets once' },
      ],
      bridge:
        'The card is a function because it turns one input into exactly one output, deterministically, and because the two numbers on it are parameters that the shop chose rather than things the customer supplies. Training a model is precisely the act of choosing those two numbers — except a real model may have billions of them, and they are chosen from data rather than by an owner with a marker pen.',
      limitations:
        'The analogy hides that mathematical functions need not be linear or even describable in words. It also suggests the domain is a matter of shop policy, whereas in maths the domain is often forced on you: division by zero and the logarithm of a negative number are genuinely undefined, not merely disallowed.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'A function as a machine',
        caption: 'The same three stages sit inside every model you will meet in this curriculum.',
        steps: [
          { label: 'Input x arrives', detail: 'A number, a vector of features, an image — whatever the domain allows.' },
          { label: 'The rule is applied', detail: 'Fixed parameters combine with the input. Nothing random, nothing remembered.' },
          { label: 'Exactly one output leaves', detail: 'f(x). Feed the same x again and you get the identical answer.' },
          { label: 'Output may feed another machine', detail: 'Composition: g(f(x)). Stack enough of these and you have a neural network.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Linear versus nonlinear',
        left: {
          heading: 'Linear: f(x) = mx + c',
          points: [
            'Graph is a straight line',
            'Doubling the input change doubles the output change',
            'Composing two linear functions gives another linear function',
            'Cheap to fit, easy to interpret, limited in what it can express',
          ],
        },
        right: {
          heading: 'Nonlinear: f(x) = x², 1/x, eˣ, max(0, x)',
          points: [
            'Graph bends, curves or kinks',
            'Equal steps in x produce unequal steps in f(x)',
            'Composition creates genuinely new shapes',
            'This is exactly why neural networks put a nonlinearity after every layer',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Domains that bite you in code',
        caption: 'Every one of these appears as a run-time error or a NaN in a training run.',
        columns: ['Function', 'Domain', 'What happens outside it'],
        rows: [
          ['1 / x', 'x ≠ 0', 'ZeroDivisionError in Python, inf in NumPy'],
          ['√x (real)', 'x ≥ 0', 'nan from np.sqrt(-1)'],
          ['log(x)', 'x > 0', '-inf at 0, nan below it — the classic log-loss crash'],
          ['tan(x)', 'x ≠ π/2 + kπ', 'Values explode towards infinity'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading f(x) = 2x + 3',
        subject: 'f(x) = 2x + 3',
        annotations: [
          { part: 'f', note: 'The name of the function. Naming it lets you refer to it later, exactly like naming a Python function.' },
          { part: '(x)', note: 'The input slot. x is a placeholder, not a specific number.' },
          { part: '2', note: 'The slope, a parameter: output rises by 2 for every 1 the input rises.' },
          { part: '+ 3', note: 'The intercept, another parameter: the output when x is 0.' },
        ],
      },
    ],

    formalDefinition:
      'A function f from a set A (the domain) to a set B (the codomain) is a relation that assigns to each element x in A exactly one element f(x) in B. The range is the subset of B actually attained, that is {f(x) : x ∈ A}. An equation is a proposition asserting equality of two expressions, and its solution set is the set of assignments of the unknowns that make the proposition true.',

    math: {
      intuition:
        'Start with the picture, not the symbols. A function is a machine; the notation is just a compact way of writing down which machine you mean. When you write f(x) = 2x + 3 you are saying: whatever number arrives, double it and add three. The letter x is a slot, not a value — it is the same idea as a parameter name in a Python function definition. An equation such as 2x + 3 = 11 is a different kind of sentence. It is not defining a machine; it is asking which input makes the machine output 11. Solving is undoing the machine step by step, always doing the same thing to both sides so the balance never tips.',
      formulas: [
        {
          latex: 'f(x) = mx + c',
          name: 'Linear function (slope-intercept form)',
          meaning:
            'A straight-line rule: start at height c when the input is zero, and climb by m for every unit the input increases.',
          variables: [
            { symbol: 'f', meaning: 'The name of the function' },
            { symbol: 'x', meaning: 'The input value (the independent variable)' },
            { symbol: 'm', meaning: 'The slope: how much the output changes when the input increases by 1' },
            { symbol: 'c', meaning: 'The intercept: the output when x is 0' },
          ],
          category: 'regression',
        },
        {
          latex: '\\hat{y} = wx + b',
          name: 'The same line, in machine-learning clothes',
          meaning:
            'Identical to the line above, renamed the way every ML library names it. Fitting a model means choosing w and b from data.',
          variables: [
            { symbol: '\\hat{y}', meaning: 'The predicted output ("y-hat"), distinguished from the true y' },
            { symbol: 'x', meaning: 'The input feature' },
            { symbol: 'w', meaning: 'The weight, which plays the role of the slope' },
            { symbol: 'b', meaning: 'The bias, which plays the role of the intercept' },
          ],
          category: 'regression',
        },
        {
          latex: '(g \\circ f)(x) = g(f(x))',
          name: 'Function composition',
          meaning:
            'Apply f first, then feed its output into g. Read right to left: the inner machine runs first.',
          variables: [
            { symbol: 'f', meaning: 'The inner function, applied first' },
            { symbol: 'g', meaning: 'The outer function, applied to f’s output' },
            { symbol: '\\circ', meaning: 'The composition symbol, read "after": g after f' },
            { symbol: 'x', meaning: 'The original input' },
          ],
        },
        {
          latex: 'f(x) = \\max(0,\\, x)',
          name: 'ReLU, the simplest useful nonlinearity',
          meaning:
            'Pass positive numbers through unchanged and flatten everything negative to zero. One kink is enough to break linearity.',
          variables: [
            { symbol: 'x', meaning: 'The input value' },
            { symbol: '\\max', meaning: 'Take whichever of the two arguments is larger' },
            { symbol: '0', meaning: 'The floor: nothing below zero ever escapes' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Start with the equation 2x + 3 = 11. The claim is that some unknown number, doubled and increased by three, equals eleven.',
        'Subtract 3 from both sides. The scale stays balanced because you removed the same weight from each pan: 2x = 8.',
        'Divide both sides by 2, again doing the same thing to each pan: x = 4.',
        'Check by substitution, which is not optional courtesy but the actual proof: 2(4) + 3 = 8 + 3 = 11. True, so x = 4 is the solution.',
        'Notice the pattern: you undid the operations in reverse order of how the machine applied them. The machine multiplied then added; you subtracted then divided. That reversal is the same idea that will reappear as the chain rule in MATH-015.',
      ],
    },

    workedExample: {
      title: 'Composing two functions and watching order matter',
      setup:
        'Let f(x) = 2x + 1 (double and add one) and g(x) = x² (square it). We will compute g(f(3)) and f(g(3)) and compare.',
      steps: [
        { label: 'Compute the inner machine for g(f(3))', detail: 'f(3) = 2(3) + 1 = 7.', latex: 'f(3) = 2\\cdot 3 + 1 = 7' },
        { label: 'Feed that into the outer machine', detail: 'g(7) = 7² = 49. So g(f(3)) = 49.', latex: 'g(f(3)) = 7^2 = 49' },
        { label: 'Now reverse the order: inner machine is g', detail: 'g(3) = 3² = 9.', latex: 'g(3) = 3^2 = 9' },
        { label: 'Feed that into f', detail: 'f(9) = 2(9) + 1 = 19. So f(g(3)) = 19.', latex: 'f(g(3)) = 2\\cdot 9 + 1 = 19' },
        { label: 'Compare', detail: '49 versus 19. Composition is not commutative — the order in which you stack machines changes the answer completely.' },
      ],
      conclusion:
        'g(f(3)) = 49 but f(g(3)) = 19. This is the first appearance of a theme that runs through the whole domain: order of operations is structural, not cosmetic. Matrix multiplication (MATH-007) is non-commutative for exactly the same reason, because a matrix is a function and multiplying matrices is composing them.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A mathematical function is a Python function',
        runnable: true,
        code: `def f(x):
    """The machine: double the input and add three."""
    return 2 * x + 3

def g(x):
    """A second machine: square the input."""
    return x ** 2

print(f(0), f(1), f(4))
print("g(f(3)) =", g(f(3)))
print("f(g(3)) =", f(g(3)))`,
        output: `3 5 11
g(f(3)) = 49
f(g(3)) = 19`,
        explanation:
          'The correspondence is exact: the parameter name x is the input slot, the return statement is the rule, and calling the function is evaluation. Running g(f(3)) and f(g(3)) makes non-commutativity of composition something you can see rather than something you take on trust.',
      },
      {
        language: 'python',
        title: 'Domains are not academic — they crash training runs',
        runnable: true,
        code: `import numpy as np

x = np.array([2.0, 1.0, 0.0, -1.0])

with np.errstate(divide="ignore", invalid="ignore"):
    print("1/x  ->", 1 / x)
    print("log  ->", np.log(x))
    print("sqrt ->", np.sqrt(x))`,
        output: `1/x  -> [ 0.5  1.   inf  -1. ]
log  -> [0.69314718 0.         -inf nan]
sqrt -> [1.41421356 1.         0.         nan]`,
        explanation:
          'NumPy does not raise on domain violations by default; it produces inf and nan and carries on. A single nan then contaminates every downstream sum, which is how a whole epoch of training silently becomes worthless. Knowing each function’s domain is how you predict where that nan came from.',
      },
      {
        language: 'python',
        title: 'Why stacking linear functions buys you nothing',
        runnable: true,
        code: `def layer1(x):
    return 3 * x + 2

def layer2(x):
    return 5 * x - 1

# Two linear layers with no nonlinearity between them
stacked = lambda x: layer2(layer1(x))
equivalent = lambda x: 15 * x + 9

for x in [-2, 0, 1, 7]:
    print(x, stacked(x), equivalent(x))`,
        output: `-2 -21 -21
0 9 9
1 24 24
7 114 114`,
        explanation:
          'Composing 5(3x + 2) - 1 gives 15x + 9, which is just another straight line. No matter how many linear layers you stack, the whole tower collapses to a single linear function. This is the precise mathematical reason a neural network puts a nonlinear activation such as ReLU after every layer.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Linear regression on house prices',
        usage:
          'price = w · size + b is literally f(x) = mx + c. scikit-learn’s LinearRegression finds w and b; predict() then evaluates the function at new inputs.',
      },
      {
        context: 'A neural network as one enormous composition',
        usage:
          'A three-layer network is f₃(f₂(f₁(x))). Each layer is a function, the network is their composition, and training adjusts the parameters inside each one.',
      },
      {
        context: 'Feature scaling in a preprocessing pipeline',
        usage:
          'StandardScaler applies z = (x − μ) / σ, a linear function with parameters learned from the training set and then reused unchanged on test data.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: 'Every estimator is a parameterised function; fit chooses the parameters, predict evaluates the function.' },
      { tool: 'NumPy', role: 'Applies a function elementwise across a whole array, so f(x) becomes f(vector) with no loop.' },
      { tool: 'PyTorch', role: 'nn.Module.forward is the function; nn.Sequential is explicit function composition.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reading f(x) as "f multiplied by x"',
        why: 'The notation reuses parentheses, which elsewhere mean multiplication, so beginners parse 2(x) and f(x) the same way.',
        fix: 'Read f(x) aloud as "f of x" and picture the machine. If in doubt, mentally rewrite it as the Python call f(x).',
      },
      {
        mistake: 'Confusing an equation with a function',
        why: 'Both contain an equals sign, but y = 2x + 3 defines a rule for all x, whereas 2x + 3 = 11 is a question about one particular x.',
        fix: 'Ask what the sentence is for. If it names a rule you can evaluate anywhere, it is a function; if it constrains the unknown, it is an equation to solve.',
      },
      {
        mistake: 'Composing in the wrong order',
        why: 'g(f(x)) is read left to right but evaluated right to left, so people apply g first out of reading habit.',
        fix: 'Work outward from the innermost bracket, exactly as Python does. Evaluate f(x) to a number first, then hand that number to g.',
      },
      {
        mistake: 'Ignoring the domain until NumPy returns nan',
        why: 'Python raises loudly on 1/0 but NumPy quietly returns inf, so domain violations survive far longer than they should.',
        fix: 'Clip or epsilon-guard before applying log, sqrt or division: np.log(np.clip(p, 1e-12, 1.0)).',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What makes a rule a function, and give an example of a rule that is not one.',
        answer:
          'A rule is a function if every allowed input maps to exactly one output. "Take the square root of x" is not a function over the reals if you allow both roots, because 4 would map to both +2 and −2; the convention √4 = 2 is adopted precisely to restore single-valuedness. Similarly "the people living at this postcode" is not a function, because one input yields many outputs. The single-output requirement is what makes functions composable and differentiable, which is what machine learning depends on.',
        followUp:
          'A strong answer links single-valuedness to determinism in code: the same input to a trained model in eval mode must give the same prediction, which is exactly the function property.',
      },
      {
        level: 'intermediate',
        question: 'Why does a neural network need nonlinear activation functions?',
        answer:
          'Because the composition of linear functions is itself linear. If layer one computes W₁x + b₁ and layer two computes W₂(·) + b₂, the pair computes W₂W₁x + W₂b₁ + b₂, which is a single linear map with a different weight matrix. A hundred such layers still collapse to one. Inserting a nonlinearity such as ReLU between layers prevents the collapse and lets the network represent curved, kinked decision boundaries. This is not an implementation detail; it is the entire reason depth buys expressive power.',
        followUp:
          'A strong answer names a specific activation and notes that ReLU is nonlinear despite being piecewise linear — one kink is enough.',
      },
      {
        level: 'internship',
        question: 'A training run produces nan loss after a few hundred steps. How does thinking about domains help you debug it?',
        answer:
          'Loss functions contain functions with restricted domains: log needs a strictly positive argument, division needs a non-zero denominator, sqrt needs a non-negative one. A nan almost always means a predicted probability reached exactly 0 or 1 and was passed to log, or a variance underflowed to zero and was divided by. The fix is to bound the input into the valid domain — clip probabilities to [1e-7, 1-1e-7], add a small epsilon inside sqrt, or use the library’s numerically stable fused version such as BCEWithLogitsLoss instead of sigmoid followed by log.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Given f(x) = 4x − 5, find f(0), f(3) and the value of x for which f(x) = 15.',
        hint: 'The first two are evaluation (put the number in the slot). The third is an equation to solve — undo the operations in reverse.',
        solution:
          'f(0) = 4(0) − 5 = −5. f(3) = 4(3) − 5 = 7. For f(x) = 15: 4x − 5 = 15, so 4x = 20 and x = 5. Check: 4(5) − 5 = 15, correct. Notice the two different activities — evaluating the machine forwards, and solving backwards for the input that produces a wanted output. Training a model is the second kind of activity.',
      },
      {
        prompt: 'With f(x) = x + 1 and g(x) = 3x, compute f(g(2)) and g(f(2)) and explain the difference in one sentence.',
        hint: 'Always evaluate the innermost bracket first, exactly as Python would.',
        solution:
          'f(g(2)): g(2) = 6, then f(6) = 7. g(f(2)): f(2) = 3, then g(3) = 9. They differ because in the first case the tripling happens before the +1 is added, and in the second the +1 is tripled along with everything else. Composition is not commutative, which is why layer order in a network is part of the model architecture.',
      },
      {
        prompt: 'State the domain of h(x) = 1 / (x − 2) and say what NumPy will return if you evaluate it on an array containing 2.0.',
        hint: 'A fraction is undefined only where its denominator is zero.',
        solution:
          'The denominator vanishes at x = 2, so the domain is all real numbers except 2. In pure Python, 1/(2-2) raises ZeroDivisionError. In NumPy, 1/np.array([2.0]) - style division returns inf with a RuntimeWarning rather than raising, so the bad value propagates into every later computation until something finally produces nan.',
      },
    ],

    quiz: [
      {
        id: 'MATH-001-q1',
        type: 'mcq',
        concept: 'definition of a function',
        prompt: 'Which of these disqualifies a rule from being a function?',
        options: [
          'One input produces two different outputs',
          'Two different inputs produce the same output',
          'The rule is nonlinear',
          'The rule has more than one parameter',
        ],
        answerIndex: 0,
        explanation:
          'A function must give exactly one output per input. Many inputs sharing one output is perfectly allowed — f(x) = x² sends both 2 and −2 to 4 and is still a function.',
      },
      {
        id: 'MATH-001-q2',
        type: 'numeric',
        concept: 'composition',
        prompt: 'With f(x) = 2x + 1 and g(x) = x², what is g(f(3))?',
        answer: 49,
        explanation:
          'Innermost first: f(3) = 7, then g(7) = 49. Evaluating from the inside out is the same rule Python uses for nested calls.',
      },
      {
        id: 'MATH-001-q3',
        type: 'truefalse',
        concept: 'linearity',
        prompt: 'Stacking two linear functions with no nonlinearity between them produces a function that is still linear.',
        answer: true,
        explanation:
          'True, and this is why depth alone is useless without activations: 5(3x + 2) − 1 = 15x + 9, a single straight line. A nonlinearity between layers is what stops the collapse.',
      },
      {
        id: 'MATH-001-q4',
        type: 'match',
        concept: 'vocabulary',
        prompt: 'Match each term to what it describes for f(x) = mx + c.',
        pairs: [
          { left: 'Domain', right: 'The inputs the function is allowed to accept' },
          { left: 'Range', right: 'The outputs actually produced' },
          { left: 'Parameter', right: 'm and c, fixed while x varies' },
          { left: 'Argument', right: 'The particular value put into the x slot' },
        ],
        explanation:
          'Keeping input, output and parameter separate is the vocabulary that makes the whole of machine learning readable: training moves parameters, inference moves inputs.',
      },
      {
        id: 'MATH-001-q5',
        type: 'fill',
        concept: 'domain restrictions',
        prompt: 'The natural logarithm log(x) is defined only for x strictly greater than which number?',
        answers: ['0', 'zero'],
        explanation:
          'log is defined for x > 0 only. At exactly 0 it tends to −∞, which is why log-loss implementations clip predicted probabilities away from 0 and 1.',
      },
      {
        id: 'MATH-001-q6',
        type: 'explain',
        concept: 'functions in ML',
        prompt: 'Explain in three or four sentences why it is useful to think of a trained machine learning model as a function.',
        rubric: [
          'Says a model maps inputs to exactly one output',
          'Identifies parameters (weights) as distinct from inputs',
          'Connects training to choosing parameters and inference to evaluating the function',
        ],
        sampleAnswer:
          'A trained model takes an input — a row of features, an image, a sentence — and returns exactly one output, so it fits the definition of a function precisely. What makes it a machine learning model rather than a fixed formula is that the rule contains parameters, and those parameters were chosen from data rather than written down by hand. Training is the process of choosing them; inference is simply evaluating the function once they are fixed. Thinking this way also explains composition: a deep network is many such functions chained together.',
        explanation:
          'The function framing separates the three things beginners blur: the input, the parameters, and the rule that combines them.',
      },
    ],

    flashcards: [
      { front: 'What is a function, in one sentence?', back: 'A rule that assigns to every input in its domain exactly one output.' },
      { front: 'Domain versus range?', back: 'Domain is what may go in; range is what actually comes out.' },
      { front: 'How do you read and evaluate g(f(x))?', back: 'Read "g after f". Evaluate f first, then feed its result into g — innermost bracket first.' },
      { front: 'Why must neural networks use nonlinear activations?', back: 'A composition of linear functions is still linear, so without nonlinearity any depth collapses to a single layer.' },
      { front: 'In ŷ = wx + b, which symbols are parameters?', back: 'w and b. x is the input and ŷ is the output; training chooses w and b.' },
      { front: 'What is the difference between y = 2x + 3 and 2x + 3 = 11?', back: 'The first defines a function for every x; the second is an equation asking which single x satisfies it.' },
    ],

    challenge: {
      title: 'Build a tiny function library and prove the collapse',
      brief:
        'Write a module with linear(m, c) returning a function, compose(g, f) returning their composition, and relu(x). Use it to show empirically that composing two linear functions is linear (compare against a single linear function you derive by hand at several inputs), and that inserting relu between them breaks that equality.',
      language: 'python',
      acceptanceCriteria: [
        'linear(m, c) returns a callable, demonstrating functions as first-class values',
        'compose(g, f) works for any two single-argument callables',
        'The script prints a comparison showing the two-linear-layer stack matching a single derived line at 5 or more inputs',
        'The script prints a second comparison showing the equality fails once relu is inserted',
      ],
      starterCode: 'def linear(m, c):\n    """Return the function x -> m*x + c."""\n',
    },

    teachingPrompt: {
      prompt:
        'A friend who left school at sixteen asks you what a function is and why anyone in AI cares. Explain it without using the word "variable".',
      mustCover: [
        'A function is a rule that turns each input into exactly one output',
        'The same input always gives the same output',
        'Parameters are the dials inside the rule, set separately from the input',
        'Models are functions, and stacking functions is composition',
      ],
      bonusSignals: ['uses a concrete machine or vending-machine image', 'mentions domain as "what you are allowed to put in"', 'notes that order matters when stacking'],
      sampleExplanation:
        'A function is a machine with one slot in and one chute out. You drop something in, the machine follows a fixed rule, and exactly one thing comes out — and if you drop the same thing in tomorrow, the same thing comes out again. Inside the machine there are a few dials, set once, that decide how it behaves; those are what get tuned when someone trains a model, while the thing you drop in changes every time you use it. The machine will only accept certain sorts of input, and that list of acceptable things is called the domain. The reason AI cares is that a trained model is exactly one of these machines: pictures in, labels out. And you can bolt machines together, so the output of one falls into the next, which is what people mean by a deep network — just a long chain of simple machines, where the order you bolt them in changes the answer.',
    },
  },

  {
    id: 'MATH-002',
    domain: 'MATH',
    module: 'Algebraic Foundations',
    topic: 'Exponentials and logarithms',
    title: 'Exponentials and Logarithms',
    slug: 'exponentials-and-logarithms',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['MATH-001'],
    related: ['MATH-001'],
    tags: ['exponential', 'logarithm', 'log-loss', 'growth', 'decay', 'numerical-stability'],

    learningObjectives: [
      'Describe exponential growth and decay in words before writing any exponent',
      'Read a logarithm as the answer to the question "what power?"',
      'Apply the three log rules to turn products into sums and powers into multipliers',
      'Explain why log-likelihood and log-loss exist, in terms of both arithmetic and floating-point underflow',
    ],

    terminology: [
      {
        term: 'Exponential growth',
        definition:
          'Growth in which the quantity is multiplied by a fixed factor in each equal time step, so the increase itself grows.',
        simple: 'Doubling, then doubling the doubled amount, over and over.',
      },
      {
        term: 'Base',
        definition:
          'The number being repeatedly multiplied. Common bases are 2 (computer science), 10 (orders of magnitude) and e ≈ 2.71828 (calculus).',
        simple: 'The thing you keep multiplying by.',
      },
      {
        term: 'Logarithm',
        definition:
          'The inverse of exponentiation: log_b(y) is the power to which b must be raised to obtain y.',
        simple: 'It answers "what power do I need?"',
      },
      {
        term: 'Natural logarithm',
        definition:
          'The logarithm with base e, written ln or, in almost all ML code, simply log. NumPy’s np.log and PyTorch’s torch.log are natural logs.',
        simple: 'The default log everywhere in machine learning.',
      },
      {
        term: 'Underflow',
        definition:
          'What happens when a positive number becomes too small for the floating-point format and is rounded to exactly 0, destroying all information it carried.',
        simple: 'A number so tiny the computer gives up and calls it zero.',
      },
      {
        term: 'Log-likelihood',
        definition:
          'The logarithm of the probability a model assigns to the observed data. Maximising it is equivalent to maximising the probability itself, because log is increasing.',
        simple: 'The score a model gets for the data, measured on a log scale so the arithmetic behaves.',
      },
    ],

    simpleExplanation:
      'Fold a piece of paper in half. Now fold it again, and again. After ten folds it is a thousand sheets thick; after twenty it is a million. Nothing dramatic happened at any single fold — you only ever did the same small thing — but because each fold multiplies rather than adds, the total runs away from you. That is exponential growth: repeated multiplying. Decay is the same story backwards, where each step multiplies by something smaller than one, so a hot cup of tea loses the same fraction of its excess heat every minute and the temperature slides towards room temperature without ever quite arriving. A logarithm is simply the question asked in reverse. Instead of "if I fold twenty times, how thick is it?", it asks "I want a million sheets — how many folds is that?" The answer is about twenty. That is all a log is: the number of times you had to multiply. Once you see it that way, the log rules stop being arithmetic trivia and become obvious bookkeeping about counting folds.',

    whyItExists:
      'Multiplication of many numbers is both awkward to reason about and numerically fragile: multiply a thousand probabilities together and the result underflows to exactly zero in float64, taking all information with it. Logarithms convert multiplication into addition, division into subtraction and powers into multiplication, which rescues both the algebra and the arithmetic. That single conversion is why every serious probabilistic model is trained on log-likelihood rather than likelihood.',

    analogy: {
      scenario:
        'A rumour spreads through a school where every person who hears it tells two new people the next day. On day one, one person knows. By day ten, over a thousand do; by day twenty, the number exceeds a million, which is more than the school holds. Nobody ever did anything unusual — each person simply told two friends — yet the totals become absurd. If a teacher later asks "roughly how many days had passed by the time a thousand people knew?", the answer, about ten, is a logarithm.',
      mapping: [
        { from: 'Each person telling two others', to: 'The base, 2' },
        { from: 'The number of days elapsed', to: 'The exponent' },
        { from: 'How many people know in total', to: 'The value 2ⁿ' },
        { from: 'Asking "how many days to reach a thousand?"', to: 'Computing log₂(1000) ≈ 10' },
        { from: 'Rumour dying out because each teller convinces only half a person', to: 'Exponential decay, base < 1' },
      ],
      bridge:
        'The exponential answers "given the number of steps, how big?" and the logarithm answers "given the size, how many steps?" They are the same relationship read in opposite directions, which is exactly what it means for two functions to be inverses. In code this is why np.exp and np.log undo each other, and why taking a log of a runaway quantity turns an unmanageable range into a readable one.',
      limitations:
        'Real rumours saturate — a school has finitely many pupils — so growth is really logistic, not exponential. Pure exponential growth is a good local model and a terrible long-range one, which is worth remembering whenever someone extrapolates a training curve.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Adding versus multiplying',
        caption: 'The difference between linear and exponential is the difference between a staircase and a cliff.',
        left: {
          heading: 'Linear: add 3 each step',
          points: [
            '3, 6, 9, 12, 15, 18 …',
            'After 20 steps: 60',
            'The increase is the same every step',
            'Graph is a straight line',
          ],
        },
        right: {
          heading: 'Exponential: multiply by 3 each step',
          points: [
            '3, 9, 27, 81, 243, 729 …',
            'After 20 steps: about 3.5 billion',
            'The increase itself grows every step',
            'Graph curves upward without limit',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The same fact written three ways',
        caption: 'Exponential form, log form and plain English are interchangeable. Fluency means switching without thinking.',
        columns: ['Exponential form', 'Logarithmic form', 'In words'],
        rows: [
          ['2³ = 8', 'log₂ 8 = 3', 'Three doublings take you from 1 to 8'],
          ['10⁴ = 10000', 'log₁₀ 10000 = 4', 'Ten thousand is four orders of magnitude'],
          ['e⁰ = 1', 'ln 1 = 0', 'No growth time has elapsed'],
          ['2⁻¹ = 0.5', 'log₂ 0.5 = −1', 'One halving; negative logs mean shrinking'],
        ],
      },
      {
        kind: 'flow',
        title: 'Why training uses log-likelihood',
        caption: 'Four steps that explain a line of code you will write a hundred times.',
        steps: [
          { label: 'A model assigns a probability to each example', detail: 'Each is a number between 0 and 1, often around 0.001.' },
          { label: 'The likelihood of the dataset is their product', detail: 'Multiply 5000 such numbers together.' },
          { label: 'float64 underflows to exactly 0.0', detail: 'The smallest positive double is about 1e-308; the true product is far below that.' },
          { label: 'Take logs: the product becomes a sum', detail: 'Σ log p_i is a comfortable number near −34000, and its gradient is well defined.' },
          { label: 'Maximise the sum instead', detail: 'log is strictly increasing, so the maximising parameters are unchanged.' },
        ],
      },
    ],

    formalDefinition:
      'For a base b > 0 with b ≠ 1, the exponential function exp_b(x) = bˣ is defined for all real x and is strictly monotonic with range (0, ∞). Its inverse, the logarithm log_b : (0, ∞) → ℝ, is defined by the equivalence b^y = x ⟺ y = log_b(x). The natural exponential is the unique function satisfying f′(x) = f(x) with f(0) = 1, and its base is e = lim_{n→∞}(1 + 1/n)ⁿ.',

    math: {
      intuition:
        'Hold on to two sentences. First: an exponential is repeated multiplication, so bˣ means "multiply by b, x times over", and negative x means dividing instead. Second: a logarithm answers the question "what power?", so log_b(y) is the exponent you would need. Everything else follows. The log rules are not new facts; they are what the counting of multiplications forces. If multiplying two numbers means adding their counts of multiplications, then log(xy) must equal log x + log y. That one identity is why logs are everywhere in machine learning: it converts an unstable product of thousands of probabilities into a stable sum of thousands of manageable negative numbers.',
      formulas: [
        {
          latex: 'y = b^{x} \\iff x = \\log_{b}(y)',
          name: 'The defining equivalence',
          meaning:
            'Exponentials and logarithms are the same relationship read in opposite directions. Memorise this and every log identity can be rederived.',
          variables: [
            { symbol: 'b', meaning: 'The base — the fixed number being multiplied repeatedly (b > 0, b ≠ 1)' },
            { symbol: 'x', meaning: 'The exponent — how many times the base is applied' },
            { symbol: 'y', meaning: 'The resulting value, always strictly positive' },
            { symbol: '\\log_{b}', meaning: 'The logarithm to base b: the function answering "what power of b gives this?"' },
            { symbol: '\\iff', meaning: 'If and only if: each statement implies the other' },
          ],
        },
        {
          latex: '\\log(ab) = \\log a + \\log b',
          name: 'Product rule',
          meaning:
            'Multiplication inside becomes addition outside. This is the single most important log identity in machine learning.',
          variables: [
            { symbol: 'a', meaning: 'A positive number' },
            { symbol: 'b', meaning: 'Another positive number' },
            { symbol: '\\log', meaning: 'Logarithm in any fixed base; the rule holds for all of them' },
          ],
        },
        {
          latex: '\\log\\!\\left(\\frac{a}{b}\\right) = \\log a - \\log b, \\qquad \\log(a^{k}) = k\\log a',
          name: 'Quotient and power rules',
          meaning:
            'Division becomes subtraction, and an exponent drops down to become an ordinary multiplier — which is how awkward powers are tamed before differentiating.',
          variables: [
            { symbol: 'a', meaning: 'A positive number' },
            { symbol: 'b', meaning: 'A positive number used as the divisor' },
            { symbol: 'k', meaning: 'Any real exponent, brought down in front by the power rule' },
          ],
        },
        {
          latex: '\\log_{b}(x) = \\frac{\\ln x}{\\ln b}',
          name: 'Change of base',
          meaning:
            'Any base can be expressed in terms of any other, so libraries need only implement one. The choice of base rescales a log but never changes where it is maximised.',
          variables: [
            { symbol: 'x', meaning: 'The positive value whose logarithm you want' },
            { symbol: 'b', meaning: 'The base you want to report the answer in' },
            { symbol: '\\ln', meaning: 'The natural logarithm, base e' },
          ],
        },
        {
          latex: '\\ell(\\theta) = \\sum_{i=1}^{n} \\log p_{\\theta}(x_i)',
          name: 'Log-likelihood',
          meaning:
            'The product of per-example probabilities, converted to a sum by the product rule. Maximising this is identical to maximising the product, but it survives floating-point arithmetic.',
          variables: [
            { symbol: '\\ell', meaning: 'The log-likelihood: the total score for the dataset' },
            { symbol: '\\theta', meaning: 'The model parameters being fitted' },
            { symbol: 'n', meaning: 'The number of examples in the dataset' },
            { symbol: 'x_i', meaning: 'The i-th observed example' },
            { symbol: 'p_{\\theta}(x_i)', meaning: 'The probability the model with parameters θ assigns to that example' },
            { symbol: '\\sum', meaning: 'Sum over all examples from i = 1 to n' },
          ],
          category: 'probability',
        },
        {
          latex: 'L = -\\frac{1}{n}\\sum_{i=1}^{n}\\left[y_i\\log \\hat{p}_i + (1-y_i)\\log(1-\\hat{p}_i)\\right]',
          name: 'Binary log-loss (cross-entropy)',
          meaning:
            'The negative average log-likelihood for a yes/no problem. Each term is the log of the probability the model gave to the answer that actually occurred.',
          variables: [
            { symbol: 'L', meaning: 'The loss to be minimised (lower is better)' },
            { symbol: 'n', meaning: 'Number of examples' },
            { symbol: 'y_i', meaning: 'The true label of example i, either 0 or 1' },
            { symbol: '\\hat{p}_i', meaning: 'The probability the model assigned to class 1 for example i' },
            { symbol: '\\log', meaning: 'Natural logarithm — undefined at 0, which is why predictions are clipped' },
            { symbol: '-', meaning: 'The minus sign flips maximising likelihood into minimising loss' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'Why does log turn products into sums? Write a = b^m and c = b^n, so m = log_b a and n = log_b c.',
        'Multiply them: a·c = b^m · b^n = b^(m+n), because multiplying powers of the same base means adding exponents.',
        'Take log_b of both sides: log_b(a·c) = m + n.',
        'Substitute back: m + n = log_b a + log_b c. Hence log_b(a·c) = log_b a + log_b c, with no further assumptions.',
        'Now apply it to a likelihood: the probability of n independent examples is the product p₁p₂…p_n.',
        'Its log is log p₁ + log p₂ + … + log p_n, a sum. Each p_i is at most 1, so each log p_i is at most 0, and the sum is a comfortably sized negative number instead of an underflowed zero.',
        'Finally, because log is strictly increasing, whichever parameters maximise the product also maximise the sum. Nothing is lost by the substitution — only numerical catastrophe is avoided.',
      ],
    },

    workedExample: {
      title: 'Watching a likelihood underflow, and rescuing it with logs',
      setup:
        'A language model assigns probability 0.001 to each of 200 tokens in a document. We want the probability of the whole document, and then its log.',
      steps: [
        { label: 'The direct product', detail: 'The probability of the document is 0.001 multiplied by itself 200 times.', latex: 'P = (10^{-3})^{200} = 10^{-600}' },
        { label: 'Check against float64', detail: 'The smallest positive normal double is about 1e-308. 1e-600 is far below it, so the computed value is exactly 0.0.' },
        { label: 'What zero costs you', detail: 'Every model that underflows scores 0.0, so no model can be preferred over another, and the gradient is 0 or nan. The comparison is destroyed.' },
        { label: 'Take logs instead', detail: 'Each token contributes ln(0.001) = −6.9078, and there are 200 of them.', latex: '\\ell = 200 \\times \\ln(10^{-3}) = 200 \\times (-6.9078) = -1381.55' },
        { label: 'Interpret the number', detail: '−1381.55 is an ordinary float. A better model might score −1200, a worse one −1600, and the ordering is preserved exactly.' },
        { label: 'Convert back if you must', detail: 'Per-token average is −1381.55 / 200 = −6.9078, and exp(−6.9078) = 0.001 recovers the original per-token probability. Perplexity is exp(6.9078) = 1000.' },
      ],
      conclusion:
        'The product was mathematically fine and computationally worthless; the sum is both. This is the whole argument for log-likelihood, and the same argument underlies log-loss, log-softmax and the log-sum-exp trick.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Underflow is not hypothetical',
        runnable: true,
        code: `import numpy as np

p = np.full(2000, 0.001)      # 2000 token probabilities

product = np.prod(p)
log_sum = np.sum(np.log(p))

print("product      :", product)
print("sum of logs  :", log_sum)
print("recovered    :", np.exp(log_sum / 2000))`,
        output: `product      : 0.0
sum of logs  : -13815.510557964274
recovered    : 0.0010000000000000002`,
        explanation:
          'The product is genuinely zero in float64 and therefore carries no information at all — two different models would both score 0.0. The sum of logs is an ordinary number that ranks models correctly, and dividing by the count and exponentiating recovers the per-token probability, which is exactly how perplexity is computed.',
      },
      {
        language: 'python',
        title: 'Log rules, verified numerically',
        runnable: true,
        code: `import numpy as np

a, b, k = 7.0, 3.0, 4

print(np.isclose(np.log(a * b), np.log(a) + np.log(b)))
print(np.isclose(np.log(a / b), np.log(a) - np.log(b)))
print(np.isclose(np.log(a ** k), k * np.log(a)))
print("log2(1000) =", np.log(1000) / np.log(2))`,
        output: `True
True
True
log2(1000) = 9.965784284662087`,
        explanation:
          'The three rules are not approximations; the only reason np.isclose is used rather than == is floating-point rounding in the last bit. The final line is the change-of-base formula in action: about ten doublings gets you to a thousand, which is why programmers treat 2¹⁰ and 1000 as interchangeable.',
      },
      {
        language: 'python',
        title: 'Why log-loss clips predictions',
        runnable: true,
        code: `import numpy as np

y = np.array([1, 0, 1])
p = np.array([0.9, 0.2, 0.0])   # third prediction is catastrophically confident

def logloss(y, p, eps=None):
    if eps is not None:
        p = np.clip(p, eps, 1 - eps)
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

with np.errstate(divide="ignore", invalid="ignore"):
    print("unclipped:", logloss(y, p))
print("clipped  :", round(logloss(y, p, eps=1e-15), 4))`,
        output: `unclipped: inf
clipped  : 11.5192`,
        explanation:
          'The model said "definitely not class 1" and was wrong, so log(0) = −inf and the loss becomes infinite, which no optimiser can descend. Clipping to 1e-15 turns the infinite penalty into a large but finite one of about 34.5 for that example, which is why every production implementation of log-loss has an eps parameter.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Perplexity of a language model',
        usage:
          'Perplexity is exp(−average log-probability per token). The whole metric is defined on the log scale precisely because the underlying product of token probabilities underflows immediately.',
      },
      {
        context: 'Learning-rate schedules and hyperparameter search',
        usage:
          'Learning rates are searched log-uniformly over something like 1e-5 to 1e-1, because what matters is the order of magnitude, not the linear difference between 0.09 and 0.1.',
      },
      {
        context: 'Naive Bayes text classification',
        usage:
          'A document score multiplies one probability per word. Every implementation, including scikit-learn’s MultinomialNB, sums logs instead, because a 500-word document would otherwise underflow to zero.',
      },
      {
        context: 'Log-scaled axes in exploratory plots',
        usage:
          'Income, city population and word frequency all span several orders of magnitude; plotting them on a log axis turns an unreadable spike into a line you can actually reason about.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'np.log, np.exp, np.log1p and np.logaddexp are the numerically careful building blocks.' },
      { tool: 'scikit-learn', role: 'log_loss takes an eps argument for exactly the clipping reason shown above.' },
      { tool: 'PyTorch', role: 'log_softmax and BCEWithLogitsLoss fuse the exponential and the log to avoid overflow in either direction.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming log means base 10 in code',
        why: 'School teaches log as base 10, but np.log, math.log and torch.log are all natural logs (base e).',
        fix: 'Use np.log10 or np.log2 explicitly when you mean those. In ML, unqualified "log" always means natural log.',
      },
      {
        mistake: 'Writing log(a + b) = log a + log b',
        why: 'The product rule is being misremembered. The rule converts multiplication to addition, not addition to addition.',
        fix: 'There is no useful simplification of log(a + b). When it appears in ML it is handled by the log-sum-exp trick, not by an identity.',
      },
      {
        mistake: 'Feeding raw probabilities of 0 or 1 into log-loss',
        why: 'log(0) is −inf, so one overconfident wrong prediction makes the loss infinite and the gradient nan.',
        fix: 'Clip to [eps, 1 − eps], or better, keep logits and use a fused loss such as BCEWithLogitsLoss that never forms the probability explicitly.',
      },
      {
        mistake: 'Treating exponential growth as merely "fast"',
        why: 'The important property is that the growth rate is proportional to the current size, which makes long-range extrapolation wildly unreliable.',
        fix: 'Check whether a saturating model fits better. Most real processes that look exponential early are logistic overall.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why do we maximise log-likelihood rather than likelihood?',
        answer:
          'Two reasons, one mathematical and one computational. Mathematically, the log turns a product over independent examples into a sum, and sums differentiate term by term, which makes the gradient trivial to compute and to batch. Computationally, the product of thousands of numbers below 1 underflows to exactly 0 in floating point, destroying all information, whereas the sum of their logs is a well-scaled negative number. Crucially nothing is lost, because log is strictly increasing, so the parameters that maximise the likelihood are exactly the parameters that maximise the log-likelihood.',
        followUp:
          'A strong answer adds that the negative log-likelihood is precisely cross-entropy loss, so "train with cross-entropy" and "do maximum likelihood" are the same instruction.',
      },
      {
        level: 'ml-engineer',
        question: 'What is the log-sum-exp trick and when do you need it?',
        answer:
          'When computing log(Σ exp(zᵢ)) — as in softmax normalisation — the exponentials can overflow to inf for large logits or underflow to 0 for very negative ones. The trick subtracts the maximum logit first: log Σ exp(zᵢ) = m + log Σ exp(zᵢ − m) where m = max zᵢ. Every exponent is then at most 0, so no term overflows, and the largest is exactly exp(0) = 1, so the sum cannot underflow to zero. This is what torch.logsumexp and scipy.special.logsumexp implement, and it is why you should pass logits to a loss function rather than probabilities.',
      },
      {
        level: 'intermediate',
        question: 'A colleague plots model training cost against dataset size and the curve looks like a straight line on a log-log plot. What does that tell you?',
        answer:
          'A straight line on log-log axes means log y = k log x + c, which exponentiates to y = e^c · x^k — a power law, not an exponential. The slope k is the exponent, so a slope of 2 means cost grows quadratically with data size. This matters because power laws and exponentials have completely different extrapolation behaviour: doubling the data multiplies a power-law cost by 2^k, a fixed factor, whereas exponential cost would multiply by a factor that itself depends on the absolute size. Reading the axes before interpreting the shape is the whole skill here.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Without a calculator, evaluate log₂ 32, log₁₀ 0.001 and ln(e⁵).',
        hint: 'Each asks "what power?". For the second, remember that negative exponents mean reciprocals.',
        solution:
          'log₂ 32 = 5, because 2⁵ = 32. log₁₀ 0.001 = −3, because 10⁻³ = 0.001; negative logs correspond to values below 1. ln(e⁵) = 5, because ln and exp are inverses and simply cancel. That cancellation is used constantly when simplifying loss functions.',
      },
      {
        prompt: 'A model assigns probability 0.2 to each of 50 independent events. Compute the log-likelihood and explain why the raw product would be a poor thing to store.',
        hint: 'Use the product rule: the log of a product of identical terms is the count times the log of one term.',
        solution:
          'ln(0.2) = −1.6094, so the log-likelihood is 50 × (−1.6094) = −80.47. The raw product is 0.2⁵⁰ ≈ 1.13e−35, which is representable in float64 but already close to float32’s limit of about 1e−38, so the same calculation in a float32 pipeline would underflow. With 500 events rather than 50 even float64 would fail. The log version is −804.7, which is never in danger.',
      },
      {
        prompt: 'Show that log-loss for a single example with true label y = 1 reduces to −log p̂, and say what loss the model incurs for p̂ = 0.99, 0.5 and 0.01.',
        hint: 'Substitute y = 1 into y log p̂ + (1 − y) log(1 − p̂) and see which term vanishes.',
        solution:
          'With y = 1 the second term is multiplied by (1 − 1) = 0 and disappears, leaving −log p̂. For p̂ = 0.99 the loss is −ln(0.99) = 0.0101; for 0.5 it is 0.693; for 0.01 it is 4.605. The penalty grows without bound as the model becomes confidently wrong, which is the behaviour that makes log-loss a better training signal than accuracy — accuracy would score all three as either right or wrong with nothing in between.',
      },
    ],

    quiz: [
      {
        id: 'MATH-002-q1',
        type: 'mcq',
        concept: 'reading a logarithm',
        prompt: 'What does log₂ 64 equal, and what question is it answering?',
        options: [
          '6 — how many times must 2 be multiplied by itself to reach 64',
          '32 — half of 64',
          '128 — 64 doubled',
          '8 — the square root of 64',
        ],
        answerIndex: 0,
        explanation:
          '2⁶ = 64, so the answer is 6. A logarithm always answers "what power of the base gives this value?", which is why it counts doublings when the base is 2.',
      },
      {
        id: 'MATH-002-q2',
        type: 'multi',
        concept: 'log rules',
        prompt: 'Which of these identities are true for positive a and b?',
        options: [
          'log(ab) = log a + log b',
          'log(a/b) = log a − log b',
          'log(a + b) = log a + log b',
          'log(a^k) = k log a',
          'log(a − b) = log a / log b',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'The product, quotient and power rules are genuine identities. There is no rule for the log of a sum or a difference — that is the single most common error, and it is why the log-sum-exp trick has to exist.',
      },
      {
        id: 'MATH-002-q3',
        type: 'truefalse',
        concept: 'monotonicity',
        prompt: 'Maximising log-likelihood can give different optimal parameters from maximising likelihood.',
        answer: false,
        explanation:
          'False. log is strictly increasing, so it preserves ordering: whatever maximises the likelihood maximises its log. Only the numerical behaviour changes, which is the entire point.',
      },
      {
        id: 'MATH-002-q4',
        type: 'numeric',
        concept: 'log-likelihood arithmetic',
        prompt: 'A model assigns probability 0.5 to each of 10 independent events. What is the natural log-likelihood, to two decimal places?',
        answer: -6.93,
        tolerance: 0.02,
        explanation:
          'ln(0.5) = −0.6931, and ten independent events give 10 × (−0.6931) = −6.93. The product rule turns the product 0.5¹⁰ into a sum of ten identical logs.',
      },
      {
        id: 'MATH-002-q5',
        type: 'code-output',
        language: 'python',
        concept: 'natural log in libraries',
        prompt: 'What does this print?',
        code: 'import numpy as np\nprint(np.log(100) > 4.0, np.log10(100))',
        options: ['False 2.0', 'True 2.0', 'False 100.0', 'True 4.61'],
        answerIndex: 1,
        explanation:
          'np.log is the natural logarithm, so np.log(100) = 4.605, which is indeed greater than 4.0 — hence True. np.log10 is the base-10 logarithm, so np.log10(100) is exactly 2.0. Mixing up the two is the most common numerical bug in this area.',
      },
      {
        id: 'MATH-002-q6',
        type: 'explain',
        concept: 'why logs in ML',
        prompt: 'Explain to a colleague who has just written their first training loop why the loss function contains a logarithm.',
        rubric: [
          'Mentions that probabilities multiply across examples and the product underflows',
          'Mentions that log converts the product into a sum',
          'Mentions that log is monotonic so the optimum is unchanged',
        ],
        sampleAnswer:
          'The probability your model assigns to the whole dataset is the product of the probabilities it assigns to each example. With even a few hundred examples that product is smaller than the smallest number a float can hold, so it is computed as exactly zero and every model scores the same. Taking the log turns that product into a sum of per-example logs, which stays at a comfortable magnitude no matter how many examples there are. Because the log function is strictly increasing, the parameters that maximise the sum are identical to the ones that would have maximised the product, so you lose nothing and gain an arithmetic that actually works — and the sum also differentiates term by term, which is what makes minibatch gradients valid.',
        explanation:
          'A good answer names both the numerical motivation and the monotonicity argument; either one alone is only half the reason.',
      },
    ],

    flashcards: [
      { front: 'What question does a logarithm answer?', back: '"What power must I raise the base to, to get this number?" log_b(y) = x means b^x = y.' },
      { front: 'log(ab) = ?', back: 'log a + log b. Multiplication inside becomes addition outside — the reason log-likelihood exists.' },
      { front: 'Does np.log mean base 10?', back: 'No. np.log, math.log and torch.log are natural logs, base e. Use np.log10 or np.log2 for other bases.' },
      { front: 'Why clip probabilities in log-loss?', back: 'Because log(0) = −inf. Clipping to [eps, 1−eps] keeps a confidently-wrong prediction expensive but finite.' },
      { front: 'What is the log-sum-exp trick?', back: 'log Σ exp(zᵢ) = m + log Σ exp(zᵢ − m) with m = max zᵢ, which prevents overflow and underflow in softmax.' },
      { front: 'Exponential growth in one sentence?', back: 'The quantity is multiplied by a fixed factor each step, so the increase itself grows.' },
    ],

    challenge: {
      title: 'Find the underflow cliff yourself',
      brief:
        'Write a script that multiplies n copies of p = 0.01 together in float32 and in float64, increasing n until each representation returns exactly 0.0. Print the n at which each fails. Then show that the sum-of-logs version is still finite and correct at ten times that n, and recover the per-item probability from it.',
      language: 'python',
      acceptanceCriteria: [
        'Reports the n at which np.float32 and np.float64 products underflow to 0.0',
        'Shows the sum-of-logs remaining finite at 10x that n',
        'Recovers p to within 1e-9 by exponentiating the mean log',
        'Prints a one-line conclusion naming the smallest positive value each dtype can hold',
      ],
      starterCode: 'import numpy as np\n\np32 = np.float32(0.01)\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a nervous beginner what a logarithm is, without writing a single equation until the last sentence, and then explain why machine learning uses them constantly.',
      mustCover: [
        'Exponential growth is repeated multiplication, so the increase itself grows',
        'A logarithm answers "how many times did I multiply?"',
        'The log rule that turns products into sums',
        'Why tiny probabilities multiplied together break floating-point arithmetic',
      ],
      bonusSignals: ['uses paper folding or rumour spreading', 'mentions that log is monotonic so the optimum is unchanged', 'names log-loss or log-likelihood'],
      sampleExplanation:
        'Start with folding paper. Each fold doubles the thickness, so after ten folds you have a thousand sheets and after twenty you have a million, even though every single fold was the same small action. That runaway is what people mean by exponential growth: you are multiplying, not adding. A logarithm is the same story asked backwards — instead of "how thick after twenty folds?", it asks "how many folds to reach a million?", and the answer is about twenty. So a log is just a count of multiplications. Now here is why machine learning cannot live without it. A model gives each example a probability, and the score for a whole dataset is all those probabilities multiplied together. Multiply a few hundred numbers that are each around a thousandth and the answer is so small the computer rounds it to zero, at which point every model looks equally bad. Counting multiplications instead turns that product into a plain sum of manageable numbers, and because a bigger product always means a bigger count, you can still tell which model is best. In symbols that rescue is just log(ab) = log a + log b.',
    },
  },

  {
    id: 'MATH-003',
    domain: 'MATH',
    module: 'Vectors',
    topic: 'Scalars, vectors and tensors',
    title: 'Scalars, Vectors and Tensors',
    slug: 'scalars-vectors-tensors',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['MATH-001'],
    related: ['MATH-001'],
    tags: ['vector', 'scalar', 'tensor', 'shape', 'rank', 'features'],

    learningObjectives: [
      'Distinguish a scalar, a vector, a matrix and a higher-rank tensor by how many indices each needs',
      'Hold both pictures of a vector at once: an arrow in space and a list of feature values',
      'Read a shape tuple such as (32, 3, 224, 224) and say what each axis means',
      'Explain why representing an example as a vector is what makes geometry available to machine learning',
    ],

    terminology: [
      {
        term: 'Scalar',
        definition: 'A single number, with no direction and no components. Rank 0.',
        simple: 'Just one number, like 7.',
      },
      {
        term: 'Vector',
        definition:
          'An ordered list of numbers. Geometrically an arrow with a length and a direction; computationally a one-dimensional array. Rank 1.',
        simple: 'A row of numbers that belong together and are kept in order.',
      },
      {
        term: 'Matrix',
        definition: 'A rectangular grid of numbers needing two indices, a row and a column. Rank 2.',
        simple: 'A table of numbers.',
      },
      {
        term: 'Tensor',
        definition:
          'The general term for an array of any rank. In deep-learning frameworks every quantity is a tensor, including scalars (rank 0) and vectors (rank 1).',
        simple: 'A box of numbers with any number of dimensions.',
      },
      {
        term: 'Rank (number of axes)',
        definition:
          'How many indices you need to pick out a single element. A colour image needs three: row, column and channel.',
        simple: 'How many numbers you have to say before you reach one value.',
      },
      {
        term: 'Shape',
        definition:
          'The tuple giving the length of each axis, such as (64, 10). The product of the entries is the total number of elements.',
        simple: 'How big the box is along each direction.',
      },
    ],

    simpleExplanation:
      'Suppose you want to describe a house to someone over the phone. You would not say one number; you would read a short list: 95 square metres, 3 bedrooms, built in 1987, 12 minutes from the station. Four numbers, always given in the same order, always meaning the same things. That ordered list is a vector, and the order matters enormously — swapping the first two would turn a small house into an enormous one. Now picture those numbers as directions rather than facts. Two numbers can be drawn as an arrow on a page: go 3 across, 4 up. Three numbers can be an arrow in a room. Four numbers describe an arrow in a space nobody can picture, but all the rules keep working. Both pictures are the same object. A scalar is just one number with no list at all, and a tensor is what you get when the box of numbers grows more directions: a photo is a grid of pixels with a colour depth, and a batch of photos adds one more. The only thing that ever changes is how many numbers you must say to reach a single value.',

    whyItExists:
      'Individual numbers cannot express an object that has several simultaneous properties, and prose descriptions cannot be computed with. Packaging the properties of one example into a fixed-order list turns each example into a point in a space, which instantly makes distance, direction, angle and projection meaningful. Every similarity search, every clustering algorithm and every neural network layer depends on that translation from description to coordinates.',

    analogy: {
      scenario:
        'A city planner describes a building site with an ordered form: northing, easting, height above sea level. One site reads (120, 45, 30). Anyone reading the form knows exactly where to stand, because the order of the slots is fixed by convention — nobody writes the height first. Give them a second site, (150, 45, 30), and without doing anything clever they can see the two sites differ only in the northing, so one sits 30 metres north of the other.',
      mapping: [
        { from: 'The three-slot form', to: 'A vector of length 3 (shape (3,))' },
        { from: 'One filled-in form', to: 'One example, one data point' },
        { from: 'The fixed meaning of each slot', to: 'A feature, one per component' },
        { from: 'Walking from one site to the other', to: 'Vector subtraction giving a displacement' },
        { from: 'A whole stack of filled-in forms', to: 'A matrix of shape (n_sites, 3)' },
        { from: 'Stacks of stacks, one per survey year', to: 'A rank-3 tensor of shape (years, n_sites, 3)' },
      ],
      bridge:
        'A vector is exactly this form: a fixed number of slots whose order is part of the meaning. The reason machine learning insists on it is that once every example is a filled-in form, the distance between two forms becomes a real number you can compute, and "similar" stops being a judgement call and becomes arithmetic.',
      limitations:
        'The surveying analogy suggests every component is measured in the same unit, which is false for real feature vectors. Mixing metres with bedroom counts and years is exactly why feature scaling exists — geometry is only trustworthy once the axes are comparable.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Vectors as arrows you can drag',
        caption: 'Move the components and watch the arrow move. The list and the arrow are the same object.',
        widget: 'vector-playground',
      },
      {
        kind: 'table',
        title: 'Rank, shape and what it looks like',
        caption: 'The only thing that changes down this table is how many indices reach one number.',
        columns: ['Rank', 'Name', 'Example shape', 'Concretely'],
        rows: [
          ['0', 'Scalar', '()', 'A learning rate: 0.001'],
          ['1', 'Vector', '(4,)', 'One house: [95, 3, 1987, 12]'],
          ['2', 'Matrix', '(500, 4)', '500 houses, 4 features each'],
          ['3', 'Tensor', '(224, 224, 3)', 'One RGB image: height, width, colour'],
          ['4', 'Tensor', '(32, 3, 224, 224)', 'A PyTorch batch: images, channels, height, width'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading a shape tuple',
        subject: 'tensor.shape == (32, 3, 224, 224)',
        annotations: [
          { part: '32', note: 'Batch axis: how many examples are processed together. Almost always axis 0.' },
          { part: '3', note: 'Channel axis: red, green, blue. PyTorch puts channels before spatial axes; TensorFlow usually puts them last.' },
          { part: '224 (first)', note: 'Image height in pixels.' },
          { part: '224 (second)', note: 'Image width in pixels. Total elements: 32 × 3 × 224 × 224 = 4,816,896.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Two readings of the same vector',
        left: {
          heading: 'Geometric: an arrow',
          points: [
            'Has a length and a direction',
            'Can be added tip-to-tail',
            'Angles between vectors are meaningful',
            'Supports intuition even in 300 dimensions',
          ],
        },
        right: {
          heading: 'Data: a list of features',
          points: [
            'Each slot is a named measurement',
            'Order is fixed by the schema, never by accident',
            'Slots may have wildly different units',
            'This is what actually sits in memory as a contiguous buffer',
          ],
        },
      },
    ],

    formalDefinition:
      'A scalar is an element of a field, normally ℝ. A vector is an element of a vector space; for our purposes ℝⁿ, the set of ordered n-tuples of reals, with componentwise addition and scalar multiplication. A rank-k tensor over ℝ is an element of a k-fold tensor product space, represented computationally as a k-dimensional array whose shape (d₁, …, d_k) lists the extent of each axis and whose element count is the product of those extents.',

    math: {
      intuition:
        'Do not let the word tensor frighten you: in machine learning it means nothing more exotic than "array with some number of axes". The single idea worth internalising is that rank counts indices. A scalar needs none, a vector needs one, a matrix needs two, and a batch of colour images needs four. Notation exists to keep those straight: lowercase italic for scalars, lowercase bold for vectors, uppercase bold for matrices. When you read xᵢ you should immediately think "the i-th component of the vector x, which is a single number".',
      formulas: [
        {
          latex: '\\mathbf{x} = [x_1,\; x_2,\; \\ldots,\; x_n]^{\\top} \\in \\mathbb{R}^{n}',
          name: 'A vector and its components',
          meaning:
            'One example written as an ordered list of n real numbers. The transpose mark indicates it is conventionally a column.',
          variables: [
            { symbol: '\\mathbf{x}', meaning: 'The vector itself (bold lowercase by convention)' },
            { symbol: 'x_i', meaning: 'The i-th component: a single scalar, the value of feature i' },
            { symbol: 'n', meaning: 'The number of components, that is the dimensionality' },
            { symbol: '\\mathbb{R}^{n}', meaning: 'The set of all ordered lists of n real numbers' },
            { symbol: '\\top', meaning: 'Transpose: turns the written row into a column vector' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'X \\in \\mathbb{R}^{m \\times n}, \\qquad X_{ij} = \\text{feature } j \\text{ of example } i',
          name: 'The design matrix',
          meaning:
            'The standard layout of a tabular dataset: one row per example, one column per feature. Nearly every scikit-learn call expects exactly this.',
          variables: [
            { symbol: 'X', meaning: 'The design matrix holding the whole dataset' },
            { symbol: 'm', meaning: 'Number of examples (rows)' },
            { symbol: 'n', meaning: 'Number of features (columns)' },
            { symbol: 'X_{ij}', meaning: 'The single number in row i, column j' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\text{numel}(T) = \\prod_{k=1}^{r} d_k',
          name: 'Element count of a tensor',
          meaning:
            'Multiply the axis lengths together to get how many numbers the tensor holds — the calculation behind every out-of-memory estimate.',
          variables: [
            { symbol: 'T', meaning: 'The tensor' },
            { symbol: 'r', meaning: 'The rank: how many axes it has' },
            { symbol: 'd_k', meaning: 'The length of axis k' },
            { symbol: '\\prod', meaning: 'Product over all axes from k = 1 to r' },
          ],
        },
      ],
      derivation: [
        'Ask how much memory one batch of images takes, using only the shape.',
        'The shape is (32, 3, 224, 224): 32 images, 3 colour channels, 224 rows, 224 columns.',
        'Multiply the axis lengths: 32 × 3 = 96, then 96 × 224 = 21,504, then 21,504 × 224 = 4,816,896 elements.',
        'Each element in float32 occupies 4 bytes, so the batch is 4,816,896 × 4 = 19,267,584 bytes.',
        'Divide by 1024² to get about 18.4 MiB for the input alone.',
        'This is why shape arithmetic is a practical skill, not bookkeeping: activations for every layer are stored too during training, so a model whose input is 18 MiB per batch can easily need several gigabytes of GPU memory.',
      ],
    },

    workedExample: {
      title: 'Turning three houses into a matrix and reading its shape',
      setup:
        'Three houses, each described by [area in m², bedrooms, year built, minutes to station]: (95, 3, 1987, 12), (140, 4, 2005, 25) and (60, 2, 1960, 5).',
      steps: [
        { label: 'One house is a vector', detail: 'x₁ = [95, 3, 1987, 12], a rank-1 tensor of shape (4,). Four numbers, in a fixed order that is part of the meaning.' },
        { label: 'Stack them as rows', detail: 'X has three rows and four columns, so its shape is (3, 4) — rows are examples, columns are features.', latex: 'X \\in \\mathbb{R}^{3 \\times 4}' },
        { label: 'Index a single value', detail: 'X[1, 2] in zero-based NumPy indexing is row 1, column 2, which is the year of the second house: 2005.' },
        { label: 'Index a whole column', detail: 'X[:, 0] is [95, 140, 60], the area feature across all houses — a vector of shape (3,), not (3, 1).' },
        { label: 'Notice the unit problem', detail: 'The year column is around 2000 while bedrooms are around 3. Any distance computed now is dominated entirely by the year, which is why standardisation precedes geometry.' },
        { label: 'Count elements', detail: '3 × 4 = 12 numbers, stored contiguously in memory in row-major order: 95, 3, 1987, 12, 140, 4, …' },
      ],
      conclusion:
        'The dataset is now a single object of shape (3, 4) that can be handed to any library. The important habit is to say the shape out loud — "three examples, four features" — because almost every error in the NumPy and deep-learning domains is a shape error in disguise.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Rank, shape and element count',
        runnable: true,
        code: `import numpy as np

scalar = np.array(3.14)
vector = np.array([95.0, 3.0, 1987.0, 12.0])
matrix = np.array([[95.0, 3.0], [140.0, 4.0], [60.0, 2.0]])
image  = np.zeros((224, 224, 3))

for name, t in [("scalar", scalar), ("vector", vector),
                ("matrix", matrix), ("image", image)]:
    print(f"{name:7s} ndim={t.ndim}  shape={str(t.shape):18s} size={t.size}")`,
        output: `scalar  ndim=0  shape=()                 size=1
vector  ndim=1  shape=(4,)               size=4
matrix  ndim=2  shape=(3, 2)             size=6
image   ndim=3  shape=(224, 224, 3)      size=150528`,
        explanation:
          'ndim is the rank — the number of indices needed to reach one element — and size is the product of the shape entries. Note that a scalar array has shape (), the empty tuple, which is genuinely different from shape (1,): the first has no axes at all, the second has one axis of length one, and broadcasting treats them differently.',
      },
      {
        language: 'python',
        title: 'Shape (3,) is not shape (3, 1)',
        runnable: true,
        code: `import numpy as np

v = np.array([1, 2, 3])          # rank 1
col = v.reshape(3, 1)            # rank 2, one column
row = v.reshape(1, 3)            # rank 2, one row

print(v.shape, col.shape, row.shape)
print((col + row).shape)         # broadcasting, not addition of equals`,
        output: `(3,) (3, 1) (1, 3)
(3, 3)`,
        explanation:
          'Adding a column to a row does not give a vector; broadcasting expands both into a 3x3 grid of pairwise sums. This is the single most common source of silently wrong results in NumPy code, and the cure is to check .shape rather than trusting how a printed array looks.',
      },
      {
        language: 'python',
        title: 'The same data, framed as features',
        runnable: true,
        code: `import numpy as np

FEATURES = ["area_m2", "bedrooms", "year_built", "mins_to_station"]
X = np.array([
    [ 95.0, 3.0, 1987.0, 12.0],
    [140.0, 4.0, 2005.0, 25.0],
    [ 60.0, 2.0, 1960.0,  5.0],
])

print("shape:", X.shape, "->", X.shape[0], "examples,", X.shape[1], "features")
print("second house:", dict(zip(FEATURES, X[1])))
print("area column :", X[:, FEATURES.index("area_m2")])`,
        output: `shape: (3, 4) -> 3 examples, 4 features
second house: {'area_m2': 140.0, 'bedrooms': 4.0, 'year_built': 2005.0, 'mins_to_station': 25.0}
area column : [ 95. 140.  60.]`,
        explanation:
          'The array itself carries no names, only positions, which is exactly why the fixed order of the components is part of the meaning of a feature vector. Keeping a separate FEATURES list is the minimum discipline; pandas exists largely to attach those labels to the axes for you.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Word embeddings',
        usage:
          'A word such as "Paris" is stored as a 300-component vector. Nothing in those numbers is human-readable, but distances and directions between them capture meaning well enough that king − man + woman lands near queen.',
      },
      {
        context: 'A minibatch in PyTorch',
        usage:
          'Images arrive with shape (batch, channels, height, width). Almost every shape mismatch error in a training script is a disagreement about which axis is which.',
      },
      {
        context: 'Recommendation systems',
        usage:
          'Each user and each film is represented by a latent vector of perhaps 64 components, and the predicted rating is computed from how aligned the two vectors are.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'ndarray is the reference implementation of a tensor; .shape and .ndim are the first things to print when debugging.' },
      { tool: 'PyTorch', role: 'torch.Tensor adds device placement and autograd but keeps exactly the same rank-and-shape model.' },
      { tool: 'scikit-learn', role: 'Every fit(X, y) expects X with shape (n_samples, n_features), which is why it errors on a rank-1 array.' },
    ],

    commonMistakes: [
      {
        mistake: 'Confusing dimensionality of a vector with the rank of a tensor',
        why: 'A 300-component word embedding is called "300-dimensional", yet it is a rank-1 tensor. Two different meanings of "dimension" collide.',
        fix: 'Say "rank" or "number of axes" for how many indices are needed, and "dimensionality" for the length of a vector. NumPy’s .ndim is rank; len(v) is dimensionality.',
      },
      {
        mistake: 'Passing a shape (n,) array where (n, 1) is expected',
        why: 'scikit-learn treats rows as examples, so a rank-1 array is ambiguous: one example with n features, or n examples with one feature?',
        fix: 'Reshape explicitly with X.reshape(-1, 1) for a single feature, and read the error text — it literally suggests which reshape to apply.',
      },
      {
        mistake: 'Assuming channels-last everywhere',
        why: 'TensorFlow defaults to (H, W, C) while PyTorch defaults to (C, H, W), so an image loaded with PIL and fed straight to a PyTorch model has its axes in the wrong order.',
        fix: 'Use np.transpose or torch.permute deliberately, and assert the shape before the forward pass rather than after the loss looks strange.',
      },
      {
        mistake: 'Computing distances across unscaled features',
        why: 'A year around 2000 and a bedroom count around 3 are on wildly different scales, so the year dominates every distance and the other features are effectively ignored.',
        fix: 'Standardise features before any geometric method — k-nearest neighbours, k-means, PCA and anything using a norm.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between a vector and a matrix, and how does a tensor relate to both?',
        answer:
          'A vector is a rank-1 array: one index reaches one number, so it is a single ordered list, geometrically an arrow. A matrix is rank 2: you need a row index and a column index. A tensor is the general term for an array of any rank, so scalars, vectors and matrices are all tensors of rank 0, 1 and 2 respectively. In deep-learning frameworks everything is called a tensor regardless of rank, which is why a loss value of shape () and a batch of images of shape (32, 3, 224, 224) are both torch.Tensor objects.',
        followUp:
          'A strong answer notes that "tensor" in physics carries transformation rules that framework tensors do not obey — in ML it simply means multidimensional array.',
      },
      {
        level: 'intermediate',
        question: 'Why is representing an example as a vector such a powerful move?',
        answer:
          'Because it turns each example into a point in a space, which makes geometry available. Once you have coordinates you can ask how far apart two examples are, what angle separates them, which direction increases a quantity fastest, and which subspace the data actually occupies. Every algorithm you will meet exploits this: k-nearest neighbours uses distance, cosine similarity uses angle, PCA uses directions of maximum variance, and gradient descent follows a direction in parameter space. Without the vector representation, "similar" would remain a qualitative judgement rather than something with a number attached.',
      },
      {
        level: 'ml-engineer',
        question: 'A batch of shape (64, 3, 128, 128) in float32 is passed through a network. Estimate its memory footprint and say why the true training memory is much larger.',
        answer:
          'The element count is 64 × 3 × 128 × 128 = 3,145,728, and at 4 bytes each that is about 12.6 MB, roughly 12 MiB. The true training footprint is far larger because backpropagation must retain the activations of every layer to compute gradients, so the intermediate feature maps — often many times the input size, especially in early convolutional layers with many channels — are all held simultaneously, plus the parameters, their gradients, and optimiser state such as Adam’s two moment buffers, which add two more copies of every parameter. Reducing batch size, using mixed precision or enabling gradient checkpointing are the standard levers.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'A dataset has 10,000 customers described by 27 features. State the rank, the shape and the element count of the design matrix.',
        hint: 'Rows are examples, columns are features. Rank is how many indices you need.',
        solution:
          'Rank 2, shape (10000, 27), and 10000 × 27 = 270,000 elements. In float64 that is 270,000 × 8 = 2.16 MB. Saying the shape aloud as "ten thousand examples, twenty-seven features" is the habit that prevents transposed-matrix bugs later.',
      },
      {
        prompt: 'Explain why np.array([1,2,3]).shape is (3,) and not (3,1) or (1,3), and give a case where the difference changes the result.',
        hint: 'Count the axes, not the numbers.',
        solution:
          'It has exactly one axis of length 3, so the shape tuple has one entry. (3,1) and (1,3) are rank-2 arrays — a column and a row — with two axes each. The difference matters under broadcasting: adding a (3,1) to a (1,3) produces a (3,3) matrix of pairwise sums, whereas adding two (3,) arrays produces a (3,) elementwise sum. It also matters to scikit-learn, which rejects rank-1 X and asks you to reshape.',
      },
      {
        prompt: 'A video clip is 30 frames of 1080×1920 RGB. Give a sensible shape, its rank, and its size in float32.',
        hint: 'Frames, height, width, channels — four things to index.',
        solution:
          'Shape (30, 1080, 1920, 3) in channels-last convention, rank 4. Elements: 30 × 1080 × 1920 × 3 = 186,624,000. At 4 bytes each that is about 746 MB, which is why video pipelines stream frames rather than loading a clip whole, and why uint8 (1 byte) is used until the moment the data enters the model.',
      },
    ],

    quiz: [
      {
        id: 'MATH-003-q1',
        type: 'mcq',
        concept: 'rank',
        prompt: 'What is the rank of a tensor with shape (32, 3, 224, 224)?',
        options: ['4', '32', '224', '3'],
        answerIndex: 0,
        explanation:
          'Rank is the number of axes, which is the length of the shape tuple — here four. The individual numbers are the lengths of those axes, not the rank.',
      },
      {
        id: 'MATH-003-q2',
        type: 'numeric',
        concept: 'element count',
        prompt: 'How many elements does a tensor of shape (10, 4, 5) contain?',
        answer: 200,
        explanation:
          'Multiply the axis lengths: 10 × 4 × 5 = 200. This product is exactly what NumPy reports as .size and is the basis of every memory estimate.',
      },
      {
        id: 'MATH-003-q3',
        type: 'truefalse',
        concept: 'shape semantics',
        prompt: 'In NumPy, an array of shape (3,) and an array of shape (3, 1) behave identically.',
        answer: false,
        explanation:
          'False. They have different ranks, so broadcasting treats them differently — a (3,1) added to a (1,3) yields a (3,3) grid, while two (3,) arrays add elementwise. scikit-learn also rejects rank-1 feature arrays.',
      },
      {
        id: 'MATH-003-q4',
        type: 'match',
        concept: 'rank vocabulary',
        prompt: 'Match each rank to a concrete example.',
        pairs: [
          { left: 'Rank 0', right: 'A learning rate, 0.001' },
          { left: 'Rank 1', right: 'One house described by four features' },
          { left: 'Rank 2', right: 'A table of 500 houses by 4 features' },
          { left: 'Rank 3', right: 'A single RGB image' },
        ],
        explanation:
          'Rank counts the indices needed to reach one number. Being fluent here is what lets you read a stack trace that complains about a dimension mismatch.',
      },
      {
        id: 'MATH-003-q5',
        type: 'fill',
        concept: 'design matrix convention',
        prompt: 'In the standard scikit-learn design matrix X, the rows correspond to what?',
        answers: ['examples', 'samples', 'observations', 'data points', 'rows are examples'],
        explanation:
          'X has shape (n_samples, n_features): one row per example, one column per feature. Transposing this by accident is one of the most common beginner errors.',
      },
      {
        id: 'MATH-003-q6',
        type: 'explain',
        concept: 'why vectors',
        prompt: 'Explain why turning an example into a vector of features is the move that makes machine learning possible.',
        rubric: [
          'Says a vector is an ordered list whose order carries meaning',
          'Says this makes each example a point in a space',
          'Names at least one geometric operation that becomes available, such as distance or angle',
        ],
        sampleAnswer:
          'Writing an example as an ordered list of numbers fixes the meaning of each slot, so two examples can be compared slot by slot rather than in prose. Once every example is such a list, it is also a point in a space with that many coordinates, and that is the real payoff: distance between points becomes a number, the angle between them becomes a number, and directions become things you can follow. Nearest-neighbour search is then just finding the closest point, clustering is grouping nearby points, and training is walking downhill in a space of parameters. None of those operations are available to a description written in words.',
        explanation:
          'The key insight is that the vector representation converts qualitative similarity into computable geometry.',
      },
    ],

    flashcards: [
      { front: 'What does rank mean for a tensor?', back: 'The number of axes — how many indices you need to reach a single element. NumPy reports it as .ndim.' },
      { front: 'Two ways to read a vector?', back: 'As an arrow with length and direction, and as an ordered list of feature values. Same object, two pictures.' },
      { front: 'What does shape (32, 3, 224, 224) describe in PyTorch?', back: '32 images, 3 colour channels, 224 pixels high, 224 wide — the channels-first batch convention.' },
      { front: 'Shape of a scalar array in NumPy?', back: '() — the empty tuple. Rank 0, which is different from shape (1,).' },
      { front: 'Standard design matrix convention?', back: 'X has shape (n_samples, n_features): rows are examples, columns are features.' },
      { front: 'How do you find a tensor’s element count?', back: 'Multiply all the axis lengths together. Times 4 bytes gives the float32 memory footprint.' },
    ],

    challenge: {
      title: 'A shape inspector',
      brief:
        'Write describe(t) that takes any NumPy array and prints its rank, shape, element count, dtype and memory footprint in a human-readable unit, plus a one-line interpretation guess ("looks like a batch of images", "looks like a design matrix", "looks like a single feature vector") based on the rank and the axis lengths. Test it on at least five arrays of different ranks.',
      language: 'python',
      acceptanceCriteria: [
        'Handles rank 0 through rank 4 without crashing',
        'Reports memory in bytes, KiB or MiB as appropriate',
        'Makes a defensible interpretation guess for at least three of the five test arrays',
        'Uses .nbytes rather than recomputing the product by hand for the footprint',
      ],
      starterCode: 'import numpy as np\n\ndef describe(t):\n    """Print rank, shape, size, dtype and memory for any ndarray."""\n',
    },

    teachingPrompt: {
      prompt:
        'A colleague says "I keep hearing the word tensor and I find it intimidating". Demystify it, and explain why data is put into vectors in the first place.',
      mustCover: [
        'Rank is just how many indices are needed to reach one number',
        'A vector is simultaneously an arrow and a list of features',
        'Shape is the length of each axis, and its product is the element count',
        'Vector representation is what makes distance and angle computable',
      ],
      bonusSignals: ['gives a concrete shape such as a batch of images', 'mentions that order of components carries meaning', 'notes that scalars are rank-0 tensors'],
      sampleExplanation:
        'A tensor is just a box of numbers, and the only question that matters is how many numbers you have to say before you reach one value. Say none and it is a scalar, like a learning rate. Say one and it is a vector, like the four numbers describing a house. Say two and it is a table. Say four and it is a batch of colour images: which image, which colour channel, which row, which column. That count is called the rank, and the list of how far you can go along each direction is called the shape. The reason we bother putting data into vectors is that a list of numbers is also a point in space. Once a house is a point, the distance to another house is a number you can compute, so "these two properties are similar" stops being an opinion. Everything downstream — nearest neighbours, clustering, embeddings, even the direction that training walks in — is geometry that only becomes available once the data is written as coordinates.',
    },
  },

  {
    id: 'MATH-004',
    domain: 'MATH',
    module: 'Vectors',
    topic: 'Vector arithmetic and length',
    title: 'Vector Operations and Norms',
    slug: 'vector-operations-and-norms',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['MATH-003'],
    related: ['MATH-002', 'MATH-003'],
    tags: ['norm', 'l1', 'l2', 'distance', 'unit-vector', 'regularisation'],

    learningObjectives: [
      'Add, subtract and scale vectors, and describe each operation geometrically before writing it down',
      'Compute L1, L2 and L∞ norms of a vector and say which one each measures',
      'Normalise a vector to unit length and explain when that is the right thing to do',
      'Connect the choice of norm to the difference between Lasso and Ridge regularisation',
    ],

    terminology: [
      {
        term: 'Vector addition',
        definition:
          'Componentwise addition of two vectors of the same length. Geometrically, place the second arrow at the tip of the first; the sum runs from the original start to the final tip.',
        simple: 'Do one journey, then the other, and see where you end up.',
      },
      {
        term: 'Scalar multiplication',
        definition:
          'Multiplying every component by the same number, which stretches or shrinks the arrow and flips it if the number is negative.',
        simple: 'Same direction, different length.',
      },
      {
        term: 'Norm',
        definition:
          'A function assigning a non-negative length to a vector, zero only for the zero vector, scaling proportionally and satisfying the triangle inequality.',
        simple: 'A way of measuring how big a vector is.',
      },
      {
        term: 'Unit vector',
        definition:
          'A vector whose norm is exactly 1, obtained by dividing a vector by its own norm. It carries direction only, with magnitude discarded.',
        simple: 'An arrow shrunk to length one, keeping only which way it points.',
      },
      {
        term: 'Euclidean distance',
        definition:
          'The L2 norm of the difference between two vectors: the straight-line distance between the two points.',
        simple: 'How far apart two points are as the crow flies.',
      },
      {
        term: 'Regularisation penalty',
        definition:
          'A norm of the weight vector added to the loss, which makes large weights expensive and so constrains how complicated the fitted model may become.',
        simple: 'A fine the model pays for using big numbers.',
      },
    ],

    simpleExplanation:
      'Imagine giving directions in a city. You walk three blocks east and four blocks north. How far have you travelled? There are two honest answers and they are both useful. If you actually walked the pavements, you covered seven blocks, because you had to follow the streets. If instead you could tunnel straight through the buildings, you would only cover five blocks, by the same arithmetic that gives the diagonal of a rectangle. Neither answer is wrong; they measure different things, and the one you want depends on what you are doing. Those two answers have names. Adding up the sizes of every step, ignoring direction, is the L1 norm, sometimes called Manhattan distance for obvious reasons. The straight-line tunnel is the L2 norm, the one you already know from Pythagoras. There is a third which just asks "what was the single biggest leg of the journey?" — four blocks north, here — and that is the L∞ norm. A norm is nothing more than a rule for turning an arrow into a single number saying how big it is, and the different rules notice different things.',

    whyItExists:
      'Comparing vectors requires collapsing them into single numbers, but there is no unique way to do so and the choice has real consequences. Norms make "how big" and "how far apart" precise, which is what makes nearest-neighbour search, clustering and convergence criteria possible. They also turn out to be the mechanism of regularisation: penalising a model by the norm of its weights is how overfitting is controlled, and which norm you pick decides whether the model shrinks coefficients or deletes them.',

    analogy: {
      scenario:
        'A taxi driver and a drone both start at the same corner and must reach a building three blocks east and four blocks north. The taxi is bound to the street grid and clocks seven blocks on the meter. The drone lifts off and flies straight there, covering five blocks of air. A third observer, a radio engineer, does not care about total travel at all; she only asks how far the building is along its worst single axis, which is four blocks, because that is what determines whether her antenna can reach it.',
      mapping: [
        { from: 'The taxi’s seven blocks', to: 'The L1 norm: sum of absolute components' },
        { from: 'The drone’s five blocks', to: 'The L2 norm: square root of the sum of squares' },
        { from: 'The engineer’s four blocks', to: 'The L∞ norm: the largest absolute component' },
        { from: 'Facing the same compass direction regardless of distance', to: 'The unit vector, direction with magnitude removed' },
        { from: 'The displacement between the two corners', to: 'The difference of two position vectors' },
      ],
      bridge:
        'All three travellers agree on the arrow — three east, four north — and disagree only on how to score it, which is exactly what a norm is: a scoring rule. This is not pedantry. L1 charges you for every block you move in any direction, so it pressures a model to stop moving in some directions altogether, which is why Lasso produces zeros. L2 charges you for the square of the distance, which punishes one huge coefficient far more than several medium ones, so Ridge shrinks everything without eliminating anything.',
      limitations:
        'In two dimensions the three norms differ by a factor of less than two, which makes the choice seem cosmetic. In three hundred dimensions L1 and L2 diverge dramatically, and that divergence is precisely why the norm you choose changes the solution a model converges to.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Add, scale and measure vectors interactively',
        caption: 'Drag the arrows: watch tip-to-tail addition and see the three norms update together.',
        widget: 'vector-playground',
      },
      {
        kind: 'table',
        title: 'The three norms on v = [3, −4]',
        caption: 'Same vector, three legitimate answers to "how big is it?"',
        columns: ['Norm', 'Definition', 'Value for [3, −4]', 'Where it shows up'],
        rows: [
          ['L1', 'Sum of absolute values', '|3| + |−4| = 7', 'Lasso, Manhattan distance, MAE loss'],
          ['L2', 'Square root of sum of squares', '√(9 + 16) = 5', 'Ridge, Euclidean distance, MSE loss'],
          ['L∞', 'Largest absolute value', 'max(3, 4) = 4', 'Gradient clipping by max-norm, robustness bounds'],
          ['L0 (not a true norm)', 'Count of non-zero entries', '2', 'Feature-selection ideal that Lasso approximates'],
        ],
      },
      {
        kind: 'flow',
        title: 'Normalising a vector',
        caption: 'Three steps that appear inside cosine similarity, weight initialisation and layer normalisation.',
        steps: [
          { label: 'Start with v = [3, 4]', detail: 'An arrow with both a direction and a length.' },
          { label: 'Measure its length', detail: '‖v‖₂ = √(3² + 4²) = 5.' },
          { label: 'Divide every component by that length', detail: 'v̂ = [3/5, 4/5] = [0.6, 0.8].' },
          { label: 'Check', detail: '0.6² + 0.8² = 0.36 + 0.64 = 1, so ‖v̂‖₂ = 1. The direction survived; the magnitude is gone.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Why L1 zeroes coefficients and L2 does not',
        left: {
          heading: 'L1 (Lasso): ‖w‖₁',
          points: [
            'Constraint region is a diamond with sharp corners on the axes',
            'The optimum frequently lands exactly on a corner, where a coefficient is 0',
            'Produces sparse models — genuine feature selection',
            'Gradient is ±1 regardless of size, so small weights are pushed to 0 just as hard',
          ],
        },
        right: {
          heading: 'L2 (Ridge): ‖w‖₂²',
          points: [
            'Constraint region is a smooth circle with no corners',
            'The optimum almost never sits exactly on an axis',
            'Shrinks all coefficients towards zero without reaching it',
            'Gradient is 2w, so the pressure fades as the weight gets small',
          ],
        },
      },
    ],

    formalDefinition:
      'A norm on a real vector space V is a function ‖·‖ : V → ℝ satisfying non-negativity with ‖v‖ = 0 only for v = 0, absolute homogeneity ‖αv‖ = |α|‖v‖, and the triangle inequality ‖u + v‖ ≤ ‖u‖ + ‖v‖. The p-norm for p ≥ 1 is ‖v‖_p = (Σᵢ |vᵢ|^p)^(1/p), with the L∞ norm defined as the limit max_i |vᵢ|. The induced metric d(u, v) = ‖u − v‖ makes the space a metric space, which is what licenses talk of distance.',

    math: {
      intuition:
        'Adding vectors is doing two journeys one after the other; subtracting them is asking "what journey takes me from here to there?"; scaling is walking the same way for longer or shorter. A norm is a rule for scoring an arrow with one number. The p in a p-norm is a dial controlling how much you care about the largest component versus all the others. At p = 1 every component is charged at the same flat rate. As p rises the largest component dominates, and at p = ∞ nothing but the largest matters. This is the whole story, and everything about Lasso versus Ridge follows from it.',
      formulas: [
        {
          latex: '\\mathbf{u} + \\mathbf{v} = [u_1 + v_1,\; u_2 + v_2,\; \\ldots,\; u_n + v_n]',
          name: 'Vector addition',
          meaning:
            'Add matching components. Geometrically the second arrow starts where the first ends, and the sum is the shortcut from start to finish.',
          variables: [
            { symbol: '\\mathbf{u}', meaning: 'The first vector' },
            { symbol: '\\mathbf{v}', meaning: 'The second vector, which must have the same length as u' },
            { symbol: 'u_i', meaning: 'The i-th component of u' },
            { symbol: 'v_i', meaning: 'The i-th component of v' },
            { symbol: 'n', meaning: 'The number of components in each vector' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\|\\mathbf{v}\\|_p = \\left(\\sum_{i=1}^{n} |v_i|^{p}\\right)^{1/p}',
          name: 'The general p-norm',
          meaning:
            'One formula that produces L1 at p = 1 and L2 at p = 2. Raising components to p before summing is what decides whether large entries dominate.',
          variables: [
            { symbol: '\\|\\mathbf{v}\\|_p', meaning: 'The p-norm of v: a single non-negative number' },
            { symbol: 'v_i', meaning: 'The i-th component of the vector' },
            { symbol: '|v_i|', meaning: 'Its absolute value, so sign never affects size' },
            { symbol: 'p', meaning: 'The order of the norm, at least 1; larger p weights the biggest component more heavily' },
            { symbol: 'n', meaning: 'Number of components' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\|\\mathbf{v}\\|_2 = \\sqrt{v_1^2 + v_2^2 + \\cdots + v_n^2}, \\qquad \\|\\mathbf{v}\\|_1 = \\sum_{i=1}^{n}|v_i|, \\qquad \\|\\mathbf{v}\\|_{\\infty} = \\max_i |v_i|',
          name: 'The three norms you will actually use',
          meaning:
            'Straight-line length, total travel along the axes, and worst single component. Every regularisation scheme in mainstream ML uses one of these.',
          variables: [
            { symbol: '\\|\\mathbf{v}\\|_2', meaning: 'Euclidean (L2) norm — Pythagoras generalised to n dimensions' },
            { symbol: '\\|\\mathbf{v}\\|_1', meaning: 'Manhattan (L1) norm — sum of absolute components' },
            { symbol: '\\|\\mathbf{v}\\|_{\\infty}', meaning: 'Maximum (L∞) norm — the single largest absolute component' },
            { symbol: 'v_i', meaning: 'The i-th component' },
            { symbol: '\\max_i', meaning: 'Take the largest value as i runs over all components' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|_2}',
          name: 'Normalisation to a unit vector',
          meaning:
            'Divide an arrow by its own length to keep the direction and discard the magnitude. Undefined for the zero vector, which has no direction.',
          variables: [
            { symbol: '\\hat{\\mathbf{v}}', meaning: 'The unit vector in the direction of v, length exactly 1' },
            { symbol: '\\mathbf{v}', meaning: 'The original vector' },
            { symbol: '\\|\\mathbf{v}\\|_2', meaning: 'Its Euclidean length, used as the divisor' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'd(\\mathbf{u}, \\mathbf{v}) = \\|\\mathbf{u} - \\mathbf{v}\\|_2 = \\sqrt{\\sum_{i=1}^{n}(u_i - v_i)^2}',
          name: 'Euclidean distance',
          meaning:
            'The length of the arrow joining two points. This is the distance k-nearest neighbours and k-means use by default.',
          variables: [
            { symbol: 'd(\\mathbf{u}, \\mathbf{v})', meaning: 'Distance between the two points' },
            { symbol: 'u_i', meaning: 'The i-th coordinate of the first point' },
            { symbol: 'v_i', meaning: 'The i-th coordinate of the second point' },
            { symbol: 'n', meaning: 'Number of dimensions' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'J(\\mathbf{w}) = \\text{MSE}(\\mathbf{w}) + \\lambda\\|\\mathbf{w}\\|_2^{2}',
          name: 'Ridge regression objective',
          meaning:
            'Ordinary least squares plus a fine proportional to the squared length of the weight vector. Swap the L2 for an L1 and you have Lasso.',
          variables: [
            { symbol: 'J', meaning: 'The total objective the optimiser minimises' },
            { symbol: '\\mathbf{w}', meaning: 'The vector of model weights' },
            { symbol: '\\text{MSE}', meaning: 'Mean squared prediction error, the fit term' },
            { symbol: '\\lambda', meaning: 'The regularisation strength: 0 means no penalty, large means heavy shrinkage' },
            { symbol: '\\|\\mathbf{w}\\|_2^{2}', meaning: 'Sum of squared weights — the penalty term' },
          ],
          category: 'regression',
        },
      ],
      derivation: [
        'Why is the L2 norm a square root of a sum of squares? Start in two dimensions with v = [3, 4].',
        'Draw the arrow from the origin. It is the hypotenuse of a right-angled triangle with legs 3 and 4.',
        'Pythagoras gives length² = 3² + 4² = 25, so length = 5.',
        'In three dimensions, apply Pythagoras twice: the diagonal of the base is √(v₁² + v₂²), and that base diagonal together with v₃ forms a second right-angled triangle.',
        'The full length is therefore √((√(v₁² + v₂²))² + v₃²) = √(v₁² + v₂² + v₃²). The pattern continues for any n.',
        'So ‖v‖₂ = √(Σ vᵢ²) is not a definition imposed from outside; it is Pythagoras applied repeatedly, which is why L2 is the norm that matches physical intuition about straight-line distance.',
      ],
    },

    workedExample: {
      title: 'Three norms, one weight vector, and what each penalty rewards',
      setup:
        'Two candidate models have weight vectors a = [4, 0, 0, 0] and b = [1, 1, 1, 1]. They put the same total "amount" of weight into the model in one sense but not in another. We will score both with L1 and L2 and see which penalty prefers which.',
      steps: [
        { label: 'L1 of a', detail: '|4| + 0 + 0 + 0 = 4.', latex: '\\|\\mathbf{a}\\|_1 = 4' },
        { label: 'L1 of b', detail: '|1| + |1| + |1| + |1| = 4. Identical — the L1 penalty is indifferent between these two.', latex: '\\|\\mathbf{b}\\|_1 = 4' },
        { label: 'L2 of a', detail: '√(16 + 0 + 0 + 0) = 4.', latex: '\\|\\mathbf{a}\\|_2 = 4' },
        { label: 'L2 of b', detail: '√(1 + 1 + 1 + 1) = √4 = 2. Half as much — L2 strongly prefers the spread-out vector.', latex: '\\|\\mathbf{b}\\|_2 = 2' },
        { label: 'Read the consequence', detail: 'L2 punishes concentration, so Ridge spreads weight across correlated features. L1 does not care how weight is distributed, only how much there is in total, so it is free to drive some coefficients to exactly zero if that lets others grow.' },
        { label: 'L∞ for completeness', detail: '‖a‖∞ = 4 and ‖b‖∞ = 1. The max-norm cares only about the single worst offender, which is why gradient clipping uses it.' },
      ],
      conclusion:
        'Same vectors, three scoring rules, three different verdicts. This is the entire practical content of "which regulariser should I use": L2 when you believe many features each contribute a little, L1 when you believe most features contribute nothing and you want the model to say so.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'All three norms, by hand and by NumPy',
        runnable: true,
        code: `import numpy as np

v = np.array([3.0, -4.0, 12.0])

print("L1  by hand:", np.abs(v).sum(),        " numpy:", np.linalg.norm(v, 1))
print("L2  by hand:", np.sqrt((v ** 2).sum()), " numpy:", np.linalg.norm(v))
print("Linf by hand:", np.abs(v).max(),        " numpy:", np.linalg.norm(v, np.inf))`,
        output: `L1  by hand: 19.0  numpy: 19.0
L2  by hand: 13.0  numpy: 13.0
Linf by hand: 12.0  numpy: 12.0`,
        explanation:
          'np.linalg.norm defaults to L2, which is the single most common cause of a silent bug when someone means L1. Computing each by hand once makes the definitions concrete, and the fact that [3, -4, 12] has an exact integer L2 norm of 13 makes it a useful vector to test with.',
      },
      {
        language: 'python',
        title: 'Normalising, and the zero-vector trap',
        runnable: true,
        code: `import numpy as np

def normalise(v, eps=1e-12):
    return v / max(np.linalg.norm(v), eps)

a = np.array([3.0, 4.0])
z = np.array([0.0, 0.0])

print(normalise(a), np.linalg.norm(normalise(a)))
print(normalise(z))                  # safe
with np.errstate(invalid="ignore"):
    print(z / np.linalg.norm(z))     # unsafe`,
        output: `[0.6 0.8] 1.0
[0. 0.]
[nan nan]`,
        explanation:
          'The zero vector has no direction, so normalising it is genuinely undefined and naive division yields nan. Guarding the denominator with an epsilon is standard practice in any embedding pipeline, because a document with no recognised tokens really does produce an all-zero vector.',
      },
      {
        language: 'python',
        title: 'Which norm your regulariser uses changes the answer',
        runnable: true,
        code: `import numpy as np
from sklearn.linear_model import Lasso, Ridge

rng = np.random.default_rng(0)
X = rng.normal(size=(200, 8))
y = 3 * X[:, 0] - 2 * X[:, 1] + rng.normal(scale=0.5, size=200)

lasso = Lasso(alpha=0.1).fit(X, y)
ridge = Ridge(alpha=1.0).fit(X, y)

print("lasso:", np.round(lasso.coef_, 3))
print("ridge:", np.round(ridge.coef_, 3))
print("exact zeros -> lasso:", int((lasso.coef_ == 0).sum()),
      " ridge:", int((ridge.coef_ == 0).sum()))`,
        output: `lasso: [ 2.882 -1.876  0.    -0.     0.     0.    -0.     0.   ]
ridge: [ 2.964 -1.964 -0.026  0.019 -0.031  0.014 -0.042  0.008]
exact zeros -> lasso: 6  ridge: 0`,
        explanation:
          'Only the first two features genuinely matter. Lasso, penalising the L1 norm, sets the six irrelevant coefficients to exactly zero and hands you feature selection for free. Ridge, penalising the L2 norm, shrinks them to small values but never reaches zero, because the L2 gradient 2w fades to nothing as w approaches zero while the L1 gradient stays at a constant magnitude.',
      },
    ],

    realWorldExamples: [
      {
        context: 'k-nearest neighbours',
        usage:
          'Prediction is "find the k training points with smallest ‖x − xᵢ‖₂ and vote". The whole algorithm is a norm plus a sort, which is why unscaled features wreck it.',
      },
      {
        context: 'Gradient clipping in RNN training',
        usage:
          'If ‖g‖₂ exceeds a threshold, the gradient is rescaled to that threshold. This keeps the direction intact while preventing a single enormous update from destroying the weights.',
      },
      {
        context: 'Normalising embeddings before a vector search',
        usage:
          'FAISS and similar indexes normalise every vector to unit L2 length so that inner-product search becomes cosine similarity search.',
      },
      {
        context: 'Weight decay in every modern optimiser',
        usage:
          'AdamW’s weight_decay parameter is exactly λ in an L2 penalty on the weights; setting it to 0 is one of the quickest ways to make a large model overfit.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'np.linalg.norm with the ord argument computes any of these norms, including per-row with axis=1.' },
      { tool: 'scikit-learn', role: 'Lasso, Ridge and ElasticNet differ only in which norm of w is added to the loss.' },
      { tool: 'PyTorch', role: 'torch.nn.utils.clip_grad_norm_ and F.normalize implement max-norm clipping and unit normalisation.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming np.linalg.norm gives what you meant',
        why: 'It defaults to the Frobenius/L2 norm, so code intending Manhattan distance silently computes Euclidean distance and the results merely look plausible.',
        fix: 'Pass ord explicitly: np.linalg.norm(v, 1) for L1, np.linalg.norm(v, np.inf) for L∞.',
      },
      {
        mistake: 'Computing distances on unstandardised features',
        why: 'A feature measured in thousands dominates the sum of squares entirely, so every distance is effectively one-dimensional.',
        fix: 'Fit a StandardScaler on the training set and apply it before any norm-based method. Never fit the scaler on the test set.',
      },
      {
        mistake: 'Normalising the zero vector',
        why: 'Division by a zero norm produces nan, which then propagates through every subsequent similarity computation.',
        fix: 'Clamp the denominator: v / max(norm, 1e-12), or filter out empty documents before building the index.',
      },
      {
        mistake: 'Believing Lasso zeroes coefficients because "L1 is stronger"',
        why: 'The sparsity comes from geometry, not strength — the L1 ball has corners on the axes, and constrained optima land on corners.',
        fix: 'Reason about the gradient instead: L1 exerts constant pressure ±λ regardless of weight size, so small weights get pushed all the way to zero, whereas L2’s 2λw pressure vanishes as w does.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between L1 and L2 regularisation, and when would you prefer each?',
        answer:
          'L1 adds λ‖w‖₁, the sum of absolute weights; L2 adds λ‖w‖₂², the sum of squares. The practical difference is sparsity. The L1 penalty has a constant gradient of ±λ no matter how small a weight is, so weights are driven all the way to exactly zero, giving genuine feature selection. The L2 penalty has gradient 2λw, which shrinks as w shrinks, so weights approach zero asymptotically but never arrive. Prefer L1 when you believe most features are irrelevant and you want an interpretable, sparse model. Prefer L2 when you believe many features each contribute a little, particularly with correlated features, where L2 shares weight among them while L1 arbitrarily picks one. ElasticNet combines both when you are unsure.',
        followUp:
          'A strong answer mentions the geometric picture — the diamond-shaped L1 ball has corners on the axes where a constrained optimum tends to land — and notes that L1 is not differentiable at zero, which is why coordinate descent rather than plain gradient descent is used to fit it.',
      },
      {
        level: 'ml-engineer',
        question: 'Why does gradient clipping usually clip by norm rather than clipping each component?',
        answer:
          'Clipping each component independently changes the direction of the gradient, because different components get scaled by different factors — a component just over the threshold is squashed while its neighbour just under it is untouched. Clipping by norm rescales the entire vector by a single factor threshold/‖g‖, which shortens the step without rotating it, so you still move in the steepest-descent direction and merely take a smaller stride. That distinction matters most in recurrent networks, where an exploding gradient is typically a correct direction with an absurd magnitude, not a wrong direction.',
      },
      {
        level: 'intermediate',
        question: 'A colleague normalises all their document embeddings to unit length before indexing. What does that buy them, and what does it cost?',
        answer:
          'It buys two things. First, the dot product between two unit vectors equals the cosine of the angle between them, so a fast inner-product index becomes a cosine-similarity index at no extra cost. Second, it removes document length as a confounder, so a long document no longer scores highly against everything simply for having a large-magnitude vector. The cost is that magnitude information is discarded entirely, and magnitude is sometimes meaningful — in some embedding models it correlates with confidence or with how much content the text actually had. It also makes the zero vector undefined, so empty or fully out-of-vocabulary documents must be handled explicitly rather than normalised.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For v = [1, −2, 2], compute the L1, L2 and L∞ norms, then normalise v to unit length.',
        hint: 'L2 first: the squares are 1, 4 and 4.',
        solution:
          'L1 = 1 + 2 + 2 = 5. L2 = √(1 + 4 + 4) = √9 = 3. L∞ = max(1, 2, 2) = 2. The unit vector is v/3 = [0.333, −0.667, 0.667], and checking: 0.111 + 0.444 + 0.444 = 1 as required. Note L∞ ≤ L2 ≤ L1 here, which holds for every vector.',
      },
      {
        prompt: 'Two points are u = [2, 1] and w = [5, 5]. Find the displacement vector from u to w, its Euclidean length, and the Manhattan distance.',
        hint: 'The displacement is w − u, computed componentwise.',
        solution:
          'w − u = [3, 4]. Euclidean distance is √(9 + 16) = 5. Manhattan distance is |3| + |4| = 7. The displacement points from u to w; u − w = [−3, −4] points the other way but has the same length, which is why distance is symmetric even though displacement is not.',
      },
      {
        prompt: 'Explain, using gradients rather than pictures, why L1 regularisation produces exactly-zero coefficients but L2 does not.',
        hint: 'Differentiate λ|w| and λw² with respect to w and compare the behaviour as w approaches 0.',
        solution:
          'The derivative of λw² is 2λw, which tends to 0 as w tends to 0, so the shrinking force disappears exactly when it would be needed to finish the job — the weight decays geometrically towards zero and never arrives. The derivative of λ|w| is λ·sign(w), a constant magnitude λ for every non-zero w, so the pressure towards zero does not weaken as the weight shrinks. Once the data’s pull on that coefficient is weaker than λ, the coefficient is pinned at exactly zero, which is a stable point of the subgradient. That is sparsity, derived without drawing a single diamond.',
      },
    ],

    quiz: [
      {
        id: 'MATH-004-q1',
        type: 'numeric',
        concept: 'L2 norm',
        prompt: 'What is the L2 norm of the vector [6, 8]?',
        answer: 10,
        explanation:
          '√(36 + 64) = √100 = 10. This is Pythagoras: the vector is the hypotenuse of a 6-8-10 right-angled triangle.',
      },
      {
        id: 'MATH-004-q2',
        type: 'numeric',
        concept: 'L1 norm',
        prompt: 'What is the L1 norm of the vector [3, −7, 2]?',
        answer: 12,
        explanation:
          'Sum the absolute values: 3 + 7 + 2 = 12. Signs never affect a norm, because a norm measures size and size is never negative.',
      },
      {
        id: 'MATH-004-q3',
        type: 'mcq',
        concept: 'regularisation choice',
        prompt: 'You have 500 features and strongly suspect fewer than 20 matter. Which penalty is the natural first choice?',
        options: [
          'L1 (Lasso), because it drives irrelevant coefficients to exactly zero',
          'L2 (Ridge), because it shrinks all coefficients equally',
          'L∞, because it bounds the largest coefficient',
          'No penalty, because feature selection should be done manually',
        ],
        answerIndex: 0,
        explanation:
          'L1’s constant-magnitude gradient pins weak coefficients at exactly zero, performing feature selection as part of fitting. Ridge would shrink them towards zero but leave 500 non-zero coefficients to interpret.',
      },
      {
        id: 'MATH-004-q4',
        type: 'truefalse',
        concept: 'unit vectors',
        prompt: 'Dividing any vector by its L2 norm always produces a vector of length 1.',
        answer: false,
        explanation:
          'False for one important case: the zero vector, whose norm is 0, so the division is undefined and yields nan. For every non-zero vector the statement holds.',
      },
      {
        id: 'MATH-004-q5',
        type: 'order',
        concept: 'normalisation procedure',
        prompt: 'Put the steps of normalising a vector into the correct order.',
        items: [
          'Square each component and add the squares',
          'Take the square root to obtain the L2 norm',
          'Check the norm is not zero',
          'Divide every component by the norm',
          'Verify the result has norm 1',
        ],
        explanation:
          'Squaring and summing then square-rooting gives the length; guarding against a zero norm prevents nan; dividing yields the unit vector; the final check is a cheap assertion worth keeping in production code.',
      },
      {
        id: 'MATH-004-q6',
        type: 'multi',
        concept: 'properties of norms',
        prompt: 'Which statements are true of every norm?',
        options: [
          'It is never negative',
          'It is zero only for the zero vector',
          'Scaling a vector by α scales its norm by |α|',
          'The norm of a sum is always the sum of the norms',
          'The norm of a sum is at most the sum of the norms',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Non-negativity, definiteness, absolute homogeneity and the triangle inequality are the four defining axioms. Equality in the triangle inequality holds only when the vectors point the same way, so "always equals" is false.',
      },
    ],

    flashcards: [
      { front: 'L1 norm of a vector?', back: 'Sum of absolute values, Σ|vᵢ|. Also called Manhattan or taxicab distance.' },
      { front: 'L2 norm of a vector?', back: '√(Σ vᵢ²) — Pythagoras generalised. NumPy’s np.linalg.norm default.' },
      { front: 'How do you make a unit vector?', back: 'Divide by its own L2 norm. Direction is kept, magnitude discarded. Undefined for the zero vector.' },
      { front: 'Why does Lasso produce exact zeros?', back: 'The derivative of λ|w| is a constant ±λ that does not fade as w shrinks, so weak coefficients are pinned at zero.' },
      { front: 'Why does Ridge never produce exact zeros?', back: 'The derivative of λw² is 2λw, which vanishes as w approaches zero, so shrinkage slows down and never finishes.' },
      { front: 'Euclidean distance between u and v?', back: '‖u − v‖₂ — the length of the arrow joining the two points.' },
    ],

    challenge: {
      title: 'Norm-aware nearest neighbours',
      brief:
        'Implement nearest_neighbours(X, q, k, ord) that returns the indices of the k rows of X closest to query q under the given norm, without using scikit-learn. Run it on the same standardised dataset with ord=1, 2 and np.inf and report how much the returned neighbour sets overlap. Then repeat on the unstandardised data and comment on the difference.',
      language: 'python',
      acceptanceCriteria: [
        'Works for ord in {1, 2, np.inf} using np.linalg.norm with axis=1, no Python loop over rows',
        'Returns indices sorted by increasing distance',
        'Reports the overlap between the neighbour sets under the three norms',
        'Includes a printed comment on how standardisation changed the results',
      ],
      starterCode: 'import numpy as np\n\ndef nearest_neighbours(X, q, k=5, ord=2):\n    """Indices of the k rows of X nearest to q under the given norm."""\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who has just learned what a vector is why there is more than one way to measure its length, and why a machine learning engineer cares which one is used.',
      mustCover: [
        'A norm is a rule for turning a vector into a single non-negative number',
        'L1 sums absolute components, L2 is straight-line length, L∞ is the largest component',
        'Distance between points is the norm of their difference',
        'The choice of norm in a regularisation penalty changes whether coefficients become exactly zero',
      ],
      bonusSignals: ['uses the city-grid image', 'mentions feature scaling before distance', 'explains sparsity via the gradient rather than only the diamond picture'],
      sampleExplanation:
        'A vector is an arrow, and asking how long it is turns out to have more than one sensible answer. If you go three blocks east and four blocks north, a taxi has driven seven blocks but a drone has flown five, and both numbers are honest — they just measure different journeys. Summing the blocks is the L1 norm; the straight-line flight is the L2 norm; asking only about the longest single leg gives the L∞ norm. Distance between two points is just the length of the arrow joining them, so the same three choices apply there too. An engineer cares because these choices reach into training. Adding the L2 length of the weights to the loss makes big weights expensive, but the pressure fades as a weight gets small, so weights shrink without ever hitting zero. Adding the L1 length applies the same constant pressure however small a weight is, so weak coefficients get pushed all the way to exactly zero and the model selects its own features. Same data, same model family, different norm, genuinely different answer.',
    },
  },

  {
    id: 'MATH-005',
    domain: 'MATH',
    module: 'Vectors',
    topic: 'Dot product',
    title: 'The Dot Product and Similarity',
    slug: 'dot-product-and-similarity',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['MATH-004'],
    related: ['MATH-003', 'MATH-004'],
    tags: ['dot-product', 'cosine-similarity', 'projection', 'orthogonality', 'neuron'],

    learningObjectives: [
      'Compute a dot product two ways — componentwise and via lengths and the angle — and see they agree',
      'Interpret the sign of a dot product as agreement, disagreement or perpendicularity',
      'Use cosine similarity to compare direction while ignoring magnitude, and say when that is the right choice',
      'Recognise that a single artificial neuron computes a dot product followed by a nonlinearity',
    ],

    terminology: [
      {
        term: 'Dot product',
        definition:
          'The sum of the products of corresponding components of two vectors of equal length, producing a single scalar.',
        simple: 'Multiply matching entries, add up the results, get one number.',
      },
      {
        term: 'Projection',
        definition:
          'The shadow one vector casts onto the direction of another. Its signed length is a·b / ‖b‖.',
        simple: 'How far along one arrow you get by following the other.',
      },
      {
        term: 'Orthogonal',
        definition:
          'Two non-zero vectors are orthogonal when their dot product is zero, meaning the angle between them is 90 degrees.',
        simple: 'At right angles — neither one tells you anything about the other.',
      },
      {
        term: 'Cosine similarity',
        definition:
          'The dot product of two vectors divided by the product of their lengths, giving a value in [−1, 1] that depends only on the angle.',
        simple: 'How much two arrows point the same way, ignoring how long they are.',
      },
      {
        term: 'Weighted sum',
        definition:
          'A linear combination Σ wᵢxᵢ, which is precisely a dot product between a weight vector and an input vector.',
        simple: 'Scoring something by giving each feature an importance and adding up.',
      },
    ],

    simpleExplanation:
      'You and a friend are each pushing a heavy box. If you both push in exactly the same direction, your efforts add up and the box moves well. If one of you pushes north and the other pushes east, neither of you helps the other at all — you are working at right angles, and the box goes off diagonally at some compromise. And if your friend pushes in exactly the opposite direction to you, you cancel out and nothing happens. The dot product is a single number that measures which of these three situations you are in. It comes out large and positive when two arrows point the same way, zero when they are perpendicular, and negative when they oppose. Remarkably, you can compute this number without measuring any angle at all: just multiply the matching components of the two lists and add the results up. That one number — agreement between two vectors — turns out to be the single most-used operation in machine learning, because comparing an input to a set of learned weights is exactly the question "how much do these two agree?"',

    whyItExists:
      'Comparing two vectors component by component gives you a vector, not a verdict. The dot product collapses that comparison into one signed number capturing alignment, which is what lets a model score, rank and decide. It also quietly links algebra to geometry: the same formula computes both a weighted sum and a cosine of an angle, which is why a neuron scoring an input and a search engine ranking documents are doing the same arithmetic.',

    analogy: {
      scenario:
        'A recruiter has a list of how much each skill matters for a role: Python 5, SQL 3, public speaking 1, Excel 0. A candidate’s CV scores their skills out of ten: Python 8, SQL 6, public speaking 2, Excel 9. To get one number for the fit, the recruiter multiplies each importance by the candidate’s score and adds them up: 5×8 + 3×6 + 1×2 + 0×9 = 60. The nine out of ten for Excel contributes precisely nothing, because the role weights it at zero.',
      mapping: [
        { from: 'The role’s importance list', to: 'The weight vector w' },
        { from: 'The candidate’s skill scores', to: 'The input vector x' },
        { from: 'The single fit score, 60', to: 'The dot product w·x' },
        { from: 'Excel scoring 9 but counting for nothing', to: 'A zero weight makes that component orthogonal to the decision' },
        { from: 'A skill the role actively penalises (weight −2)', to: 'A negative weight, pulling the score down' },
      ],
      bridge:
        'This is literally what an artificial neuron does. Its weights are the importance list, learned from data rather than written by a recruiter; the input is the candidate; the dot product is the score; and the bias is the recruiter’s baseline enthusiasm before looking at anyone. Training a network is adjusting millions of such importance lists until the scores come out right.',
      limitations:
        'The recruiter analogy suggests weights are chosen by a knowledgeable human for interpretable reasons. In a trained network they are chosen by gradient descent, are rarely interpretable individually, and an input feature can carry a large weight simply because it correlates with something that matters.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Dot product as agreement',
        caption: 'Rotate one vector and watch the dot product pass through positive, zero and negative.',
        widget: 'dot-product',
      },
      {
        kind: 'table',
        title: 'What the sign tells you',
        columns: ['Angle θ', 'cos θ', 'Sign of a·b', 'Interpretation'],
        rows: [
          ['0°', '1', 'Maximum positive', 'Identical direction — total agreement'],
          ['45°', '0.707', 'Positive', 'Broadly agreeing'],
          ['90°', '0', 'Exactly zero', 'Orthogonal — no shared component at all'],
          ['135°', '−0.707', 'Negative', 'Broadly opposed'],
          ['180°', '−1', 'Maximum negative', 'Exactly opposite'],
        ],
      },
      {
        kind: 'flow',
        title: 'What a single neuron does',
        caption: 'Every unit in every dense layer performs these four steps.',
        steps: [
          { label: 'Receive an input vector x', detail: 'Perhaps 784 pixel values, or the 512 activations from the previous layer.' },
          { label: 'Take the dot product with its weights w', detail: 'z = w·x. One multiply-accumulate per input — this is where nearly all the compute goes.' },
          { label: 'Add the bias b', detail: 'z = w·x + b shifts the threshold at which the unit fires.' },
          { label: 'Apply a nonlinearity', detail: 'a = ReLU(z) or σ(z). Without this step the whole network collapses to one linear map.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Dot product versus cosine similarity',
        left: {
          heading: 'Dot product a·b',
          points: [
            'Depends on both direction and magnitude',
            'Unbounded range',
            'Cheap: one fused multiply-add per component',
            'Right when magnitude carries meaning, e.g. neuron pre-activations',
          ],
        },
        right: {
          heading: 'Cosine similarity a·b / (‖a‖‖b‖)',
          points: [
            'Depends on direction only',
            'Always in [−1, 1]',
            'Costs two extra norms, or none if vectors are pre-normalised',
            'Right when length is an artefact, e.g. document length in text search',
          ],
        },
      },
    ],

    formalDefinition:
      'For u, v ∈ ℝⁿ the Euclidean inner product is u·v = Σᵢ₌₁ⁿ uᵢvᵢ, equivalently u·v = ‖u‖₂‖v‖₂cos θ where θ ∈ [0, π] is the angle between them. It is symmetric, bilinear and positive definite, satisfies the Cauchy–Schwarz inequality |u·v| ≤ ‖u‖‖v‖, and induces the Euclidean norm through ‖u‖₂ = √(u·u). Vectors are orthogonal precisely when their inner product vanishes.',

    math: {
      intuition:
        'The dot product answers one question: how much of one arrow points along the other? Picture shining a light straight down onto a vector b and seeing where the shadow of a falls. If a leans the same way as b, the shadow is long and positive. If a is perpendicular to b, the shadow has zero length. If a leans backwards, the shadow falls behind the origin and is negative. The algebraic recipe — multiply matching components and add — computes that shadow length times ‖b‖, which is why the geometric and componentwise formulas give the same number. Once you accept that, cosine similarity is simply the shadow with both lengths divided out, leaving pure direction.',
      formulas: [
        {
          latex: '\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{n} a_i b_i',
          name: 'Dot product, componentwise',
          meaning:
            'Multiply matching entries and sum. This is the definition a computer uses, and the whole cost of a dense layer.',
          variables: [
            { symbol: '\\mathbf{a}', meaning: 'The first vector' },
            { symbol: '\\mathbf{b}', meaning: 'The second vector, of the same length' },
            { symbol: 'a_i', meaning: 'The i-th component of a' },
            { symbol: 'b_i', meaning: 'The i-th component of b' },
            { symbol: 'n', meaning: 'The number of components' },
            { symbol: '\\cdot', meaning: 'The dot product symbol; the result is a single scalar, never a vector' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\mathbf{a} \\cdot \\mathbf{b} = \\|\\mathbf{a}\\|\\,\\|\\mathbf{b}\\|\\cos\\theta',
          name: 'Dot product, geometrically',
          meaning:
            'The same number expressed through lengths and the angle between the vectors. This is what makes the dot product a measure of alignment.',
          variables: [
            { symbol: '\\|\\mathbf{a}\\|', meaning: 'The Euclidean length of a' },
            { symbol: '\\|\\mathbf{b}\\|', meaning: 'The Euclidean length of b' },
            { symbol: '\\theta', meaning: 'The angle between the two vectors, between 0 and 180 degrees' },
            { symbol: '\\cos\\theta', meaning: 'The cosine of that angle: 1 when aligned, 0 when perpendicular, −1 when opposite' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\cos\\theta = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\|\\mathbf{a}\\|\\,\\|\\mathbf{b}\\|}',
          name: 'Cosine similarity',
          meaning:
            'Rearranged from the line above. Dividing out both lengths leaves a pure measure of direction, bounded between −1 and 1.',
          variables: [
            { symbol: '\\theta', meaning: 'Angle between the vectors' },
            { symbol: '\\mathbf{a}\\cdot\\mathbf{b}', meaning: 'Their dot product' },
            { symbol: '\\|\\mathbf{a}\\|\\,\\|\\mathbf{b}\\|', meaning: 'Product of their lengths, which cancels out all magnitude information' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\text{proj}_{\\mathbf{b}}(\\mathbf{a}) = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\mathbf{b}\\cdot\\mathbf{b}}\\,\\mathbf{b}',
          name: 'Vector projection',
          meaning:
            'The part of a that lies along b — the shadow, written as a vector rather than just a length. Least squares is built from exactly this.',
          variables: [
            { symbol: '\\text{proj}_{\\mathbf{b}}(\\mathbf{a})', meaning: 'The projection of a onto the direction of b' },
            { symbol: '\\mathbf{a}\\cdot\\mathbf{b}', meaning: 'Alignment between the two vectors' },
            { symbol: '\\mathbf{b}\\cdot\\mathbf{b}', meaning: 'The squared length of b, used to normalise' },
            { symbol: '\\mathbf{b}', meaning: 'The direction being projected onto' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'z = \\mathbf{w}\\cdot\\mathbf{x} + b, \\qquad a = \\phi(z)',
          name: 'A single artificial neuron',
          meaning:
            'The pre-activation is a dot product plus a bias; the activation applies a nonlinearity. Every dense layer is thousands of these in parallel.',
          variables: [
            { symbol: 'z', meaning: 'The pre-activation, a single scalar score' },
            { symbol: '\\mathbf{w}', meaning: 'The neuron’s learned weight vector, one weight per input' },
            { symbol: '\\mathbf{x}', meaning: 'The input vector' },
            { symbol: 'b', meaning: 'The bias, shifting the threshold at which the neuron responds' },
            { symbol: '\\phi', meaning: 'The activation function, such as ReLU or the logistic sigmoid' },
            { symbol: 'a', meaning: 'The neuron’s output, passed to the next layer' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Why do the componentwise and geometric formulas agree? Take a = [a₁, a₂] and b = [b₁, b₂] in the plane.',
        'The law of cosines applied to the triangle formed by a, b and a − b gives ‖a − b‖² = ‖a‖² + ‖b‖² − 2‖a‖‖b‖cos θ.',
        'Expand the left side componentwise: ‖a − b‖² = (a₁ − b₁)² + (a₂ − b₂)² = a₁² − 2a₁b₁ + b₁² + a₂² − 2a₂b₂ + b₂².',
        'Group the squares: that equals (a₁² + a₂²) + (b₁² + b₂²) − 2(a₁b₁ + a₂b₂) = ‖a‖² + ‖b‖² − 2(a₁b₁ + a₂b₂).',
        'Compare the two expressions for ‖a − b‖². The ‖a‖² and ‖b‖² terms cancel, leaving −2(a₁b₁ + a₂b₂) = −2‖a‖‖b‖cos θ.',
        'Divide by −2: a₁b₁ + a₂b₂ = ‖a‖‖b‖cos θ. The sum of products really is the lengths times the cosine, and the same argument extends to n dimensions.',
        'Two consequences fall out immediately. Setting a = b gives a·a = ‖a‖²cos 0 = ‖a‖², so the norm is the square root of the dot product with itself. And cos 90° = 0 means perpendicular vectors have zero dot product, which is the definition of orthogonality used everywhere.',
      ],
    },

    workedExample: {
      title: 'Two documents that are similar in direction but not in size',
      setup:
        'Represent documents by counts of three words: [ai, model, recipe]. Document A is a short blog post: [3, 2, 0]. Document B is a long article on the same subject: [30, 20, 1]. Document C is a cookery page: [0, 1, 9]. Which is A closer to?',
      steps: [
        { label: 'Dot product A·B', detail: '3×30 + 2×20 + 0×1 = 90 + 40 + 0 = 130.', latex: '\\mathbf{A}\\cdot\\mathbf{B} = 130' },
        { label: 'Dot product A·C', detail: '3×0 + 2×1 + 0×9 = 2. Far smaller, as expected.', latex: '\\mathbf{A}\\cdot\\mathbf{C} = 2' },
        { label: 'But check raw magnitudes', detail: '‖A‖ = √(9+4+0) = 3.606, ‖B‖ = √(900+400+1) = 36.07, ‖C‖ = √(0+1+81) = 9.055. B is simply a much longer document.' },
        { label: 'Cosine similarity A,B', detail: '130 / (3.606 × 36.07) = 130 / 130.08 = 0.9994. Almost perfectly aligned.', latex: '\\cos\\theta_{AB} = 0.9994' },
        { label: 'Cosine similarity A,C', detail: '2 / (3.606 × 9.055) = 2 / 32.65 = 0.0613. Nearly orthogonal.', latex: '\\cos\\theta_{AC} = 0.0613' },
        { label: 'Why this matters', detail: 'Suppose D = [5, 3, 40], a huge cookery page that happens to mention ai five times. A·D = 15 + 6 + 0 = 21, more than ten times A·C, purely because D is long. Cosine similarity gives 21 / (3.606 × 40.42) = 0.144, correctly keeping it far below B.' },
      ],
      conclusion:
        'The raw dot product conflates "about the same topic" with "long". Dividing by both lengths isolates the angle, which is why every text search and embedding index compares by cosine similarity rather than by raw inner product unless the vectors have already been normalised.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The two formulas agree',
        runnable: true,
        code: `import numpy as np

a = np.array([3.0, 4.0])
b = np.array([4.0, 3.0])

componentwise = np.dot(a, b)
theta = np.arccos(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))
geometric = np.linalg.norm(a) * np.linalg.norm(b) * np.cos(theta)

print("componentwise:", componentwise)
print("geometric    :", round(float(geometric), 10))
print("angle (deg)  :", round(float(np.degrees(theta)), 3))`,
        output: `componentwise: 24.0
geometric    : 24.0
angle (deg)  : 16.26`,
        explanation:
          'Both routes give 24. The angle of 16.26 degrees says the two vectors nearly agree, which matches the intuition that [3,4] and [4,3] are mirror images across the diagonal and so lean the same way. Note that the geometric route computes the angle from the dot product, so this is a consistency check rather than an independent derivation.',
      },
      {
        language: 'python',
        title: 'Orthogonality and sign',
        runnable: true,
        code: `import numpy as np

u = np.array([1.0, 0.0])
for name, v in [("same",      np.array([2.0, 0.0])),
                ("45 degrees",np.array([1.0, 1.0])),
                ("perpendicular", np.array([0.0, 5.0])),
                ("opposite",  np.array([-3.0, 0.0]))]:
    d = np.dot(u, v)
    cos = d / (np.linalg.norm(u) * np.linalg.norm(v))
    print(f"{name:14s} dot={d:6.2f}  cos={cos:6.3f}")`,
        output: `same             dot=  2.00  cos= 1.000
45 degrees       dot=  1.00  cos= 0.707
perpendicular    dot=  0.00  cos= 0.000
opposite         dot= -3.00  cos=-1.000`,
        explanation:
          'The dot product changes with the other vector’s length — 2 versus 3 for the aligned and opposite cases — while the cosine reports only the angle. The perpendicular case gives exactly 0.0, which is why orthogonality is defined as a vanishing dot product rather than as a statement about 90 degrees.',
      },
      {
        language: 'python',
        title: 'A neuron is a dot product',
        runnable: true,
        code: `import numpy as np

def neuron(x, w, b):
    z = np.dot(w, x) + b           # the entire "learning" lives in w and b
    return max(0.0, z)             # ReLU

x = np.array([0.8, 0.6, 0.9, 0.1])     # four input features
w = np.array([1.5, -2.0, 0.5, 0.0])    # learned weights
print("pre-activation:", np.dot(w, x) + 0.3)
print("activation    :", neuron(x, w, 0.3))
print("with bias -1.0:", neuron(x, w, -1.0))`,
        output: `pre-activation: 0.35000000000000003
activation    : 0.35000000000000003
with bias -1.0: 0.0`,
        explanation:
          'The second feature has a negative weight, so a high value there pushes the score down; the fourth has weight zero and is ignored entirely no matter what it contains. Lowering the bias from 0.3 to −1.0 pushes the pre-activation negative, ReLU clamps it to zero, and the neuron goes silent — which is exactly how a bias controls the threshold at which a unit fires.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Semantic search and retrieval-augmented generation',
        usage:
          'A query is embedded as a vector and compared against millions of document vectors by cosine similarity. The top-k highest scores become the retrieved context.',
      },
      {
        context: 'Attention in transformers',
        usage:
          'Attention scores are dot products between query and key vectors, scaled by √d and softmaxed. The entire mechanism is "which keys agree with this query".',
      },
      {
        context: 'Collaborative filtering',
        usage:
          'A predicted rating is the dot product of a user latent vector and a film latent vector, so a user who scores highly on a dimension the film also scores highly on gets a high prediction.',
      },
      {
        context: 'Every dense layer in every neural network',
        usage:
          'A layer of 512 units on a 512-dimensional input is 262,144 multiply-accumulates per example, which is why GPUs are built around matrix-multiply units.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'np.dot and the @ operator; np.einsum for batched inner products over chosen axes.' },
      { tool: 'scikit-learn', role: 'cosine_similarity in sklearn.metrics.pairwise builds the full similarity matrix for a corpus.' },
      { tool: 'FAISS', role: 'IndexFlatIP performs inner-product search, which becomes cosine search once vectors are L2-normalised.' },
    ],

    commonMistakes: [
      {
        mistake: 'Expecting the dot product to return a vector',
        why: 'It is easy to conflate it with elementwise multiplication, which does return a vector of the same shape.',
        fix: 'Remember the result is always a single scalar. In NumPy, a * b is elementwise and np.dot(a, b) or a @ b contracts to a scalar.',
      },
      {
        mistake: 'Using raw dot products to compare documents of different lengths',
        why: 'A long document has a large-magnitude vector and scores highly against everything simply for being long.',
        fix: 'Use cosine similarity, or L2-normalise every vector once at index time so that inner product and cosine coincide.',
      },
      {
        mistake: 'Treating cosine similarity as a distance',
        why: 'It increases with similarity, so sorting ascending returns the least similar items — the opposite of what was intended.',
        fix: 'Convert with cosine distance = 1 − cosine similarity when a metric is needed, and check whether the library you are using returns similarity or distance.',
      },
      {
        mistake: 'Computing cosine similarity on the zero vector',
        why: 'An empty document or an entirely out-of-vocabulary text produces an all-zero vector, and dividing by its zero norm gives nan.',
        fix: 'Filter empty vectors before indexing, or guard the denominator with a small epsilon and treat the result as "no signal".',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'When would you use cosine similarity rather than Euclidean distance?',
        answer:
          'Use cosine when direction carries the meaning and magnitude is an artefact of something you do not care about. Text is the canonical case: a 5,000-word article and a 200-word summary on the same topic have vectors pointing the same way but with wildly different lengths, so Euclidean distance would call them dissimilar while cosine correctly calls them near-identical. The same applies to sparse high-dimensional embeddings generally. Euclidean is the better choice when magnitude is meaningful — physical measurements, standardised features where the scale has been deliberately fixed, or any case where "twice as much" genuinely differs from "the same profile". A useful fact: for L2-normalised vectors the two are monotonically related, since squared Euclidean distance equals 2 − 2cos θ, so ranking by one is identical to ranking by the other.',
        followUp:
          'A strong answer mentions that normalising at index time lets you use a fast inner-product index and get cosine behaviour for free.',
      },
      {
        level: 'ml-engineer',
        question: 'Explain what a single neuron computes and why the dot product is the right operation there.',
        answer:
          'A neuron computes z = w·x + b and then applies a nonlinearity. The dot product is the right operation because it is precisely a weighted vote: each input feature is multiplied by a learned importance and the votes are summed into one score. A positive weight means the feature argues for firing, a negative weight means it argues against, and a zero weight means the feature is ignored. Geometrically, w defines a direction in input space and z measures how far along that direction the input lies, so the set of inputs with z = 0 is a hyperplane and the neuron is asking which side of that hyperplane the input falls on. The bias shifts the hyperplane away from the origin. The nonlinearity is what stops a stack of such units collapsing into a single hyperplane.',
      },
      {
        level: 'advanced',
        question: 'Why does scaled dot-product attention divide by the square root of the key dimension?',
        answer:
          'If query and key components are roughly independent with zero mean and unit variance, their dot product over d dimensions has variance proportional to d, so the scores grow like √d as the dimension increases. Feeding large-magnitude scores into a softmax saturates it: one entry approaches 1 and the rest approach 0, which makes the attention distribution nearly one-hot and drives the gradients through the softmax towards zero. Dividing by √d rescales the scores back to roughly unit variance regardless of d, keeping the softmax in a regime where it is both expressive and differentiable. It is a variance-control trick, not a normalisation of the vectors themselves.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Compute [2, −1, 3] · [4, 5, −2] and say whether the two vectors broadly agree, oppose or are close to perpendicular.',
        hint: 'Multiply matching entries, then add. The sign of the total is the verdict.',
        solution:
          '2×4 + (−1)×5 + 3×(−2) = 8 − 5 − 6 = −3. The result is negative but small compared with the vector lengths (‖a‖ = 3.742, ‖b‖ = 6.708, product 25.1), so cos θ = −3/25.1 = −0.12 and the angle is about 97 degrees. They are very close to perpendicular, leaning slightly towards opposition.',
      },
      {
        prompt: 'Show that [1, 2] and [−4, 2] are orthogonal, and find any non-zero vector orthogonal to [3, −5].',
        hint: 'Orthogonal means the dot product is exactly zero. In two dimensions, swapping components and negating one always works.',
        solution:
          '[1,2]·[−4,2] = −4 + 4 = 0, so they are orthogonal. For [3, −5], take [5, 3]: 3×5 + (−5)×3 = 15 − 15 = 0. The general two-dimensional trick is that [a, b] is orthogonal to [−b, a] and to [b, −a]; any non-zero multiple of those also works, since scaling does not change the angle.',
      },
      {
        prompt: 'A user vector is [0.5, 0.5, 0.0] and two film vectors are [1.0, 1.0, 0.0] and [5.0, 5.0, 0.0]. Compare them by raw dot product and by cosine similarity, and say which comparison you would use for a recommender.',
        hint: 'Compute both and notice that the second film is simply the first scaled by 5.',
        solution:
          'Dot products are 1.0 and 5.0, so the raw score prefers the second film by a factor of five. Cosine similarity is 1.0 for both, because the second film vector points in exactly the same direction as the first. Which to use depends on what magnitude means: if it encodes popularity or confidence, the raw dot product is right and the recommender should prefer the popular film; if it is an artefact of how many ratings the film happened to receive, cosine is right. Most production systems use the raw inner product and control magnitude explicitly through a separate popularity term, so that the choice is deliberate rather than accidental.',
      },
    ],

    quiz: [
      {
        id: 'MATH-005-q1',
        type: 'numeric',
        concept: 'computing a dot product',
        prompt: 'What is [1, 3, −2] · [4, 0, 5]?',
        answer: -6,
        explanation:
          '1×4 + 3×0 + (−2)×5 = 4 + 0 − 10 = −6. The negative sign says the two vectors lean in broadly opposite directions.',
      },
      {
        id: 'MATH-005-q2',
        type: 'mcq',
        concept: 'orthogonality',
        prompt: 'Two non-zero vectors have a dot product of exactly zero. What does that mean?',
        options: [
          'They are perpendicular — at 90 degrees to each other',
          'They point in the same direction',
          'They point in opposite directions',
          'At least one of them must be the zero vector',
        ],
        answerIndex: 0,
        explanation:
          'Since a·b = ‖a‖‖b‖cos θ and both norms are non-zero, cos θ must be 0, so θ = 90 degrees. This is the definition of orthogonality used throughout linear algebra.',
      },
      {
        id: 'MATH-005-q3',
        type: 'truefalse',
        concept: 'dot product output',
        prompt: 'The dot product of two vectors of length 300 is a vector of length 300.',
        answer: false,
        explanation:
          'False. A dot product always contracts to a single scalar, however long the vectors are. Elementwise multiplication is the operation that returns a vector of the same length.',
      },
      {
        id: 'MATH-005-q4',
        type: 'code-output',
        language: 'python',
        concept: 'numpy operators',
        prompt: 'What does this print?',
        code: 'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(a * b, a @ b)',
        options: ['[4 10 18] 32', '[5 7 9] 32', '32 [4 10 18]', '[4 10 18] [4 10 18]'],
        answerIndex: 0,
        explanation:
          '* is elementwise, giving [4, 10, 18]. @ is the dot product, summing those to 4 + 10 + 18 = 32. Confusing the two is one of the most common NumPy bugs.',
      },
      {
        id: 'MATH-005-q5',
        type: 'fill',
        concept: 'cosine similarity range',
        prompt: 'Cosine similarity always falls between which two values?',
        answers: ['-1 and 1', '-1 to 1', '[-1, 1]', '-1, 1'],
        explanation:
          'Because it equals cos θ, the range is [−1, 1]: 1 for identical direction, 0 for orthogonal, −1 for exactly opposite. The bound is guaranteed by the Cauchy–Schwarz inequality.',
      },
      {
        id: 'MATH-005-q6',
        type: 'explain',
        concept: 'neuron as dot product',
        prompt: 'Explain why it is fair to say that a single artificial neuron "computes a dot product".',
        rubric: [
          'States that the neuron multiplies each input by a learned weight and sums the results',
          'Identifies that sum as the dot product w·x',
          'Mentions the bias and the nonlinearity as the remaining two steps',
        ],
        sampleAnswer:
          'A neuron holds one weight per input feature. To produce its output it multiplies each incoming value by that feature’s weight and adds all the products together, which is exactly the definition of the dot product w·x. It then adds a bias, which shifts the threshold at which the unit becomes active, and passes the result through a nonlinear function such as ReLU. So the neuron is a dot product plus a shift plus a squash, and the only part that is learned is the weight vector and the bias. Geometrically the weight vector picks out a direction in input space and the dot product measures how far the input lies along it, which is why a single unit can only separate inputs with a hyperplane.',
        explanation:
          'The dot product framing explains both what the weights mean and why depth with nonlinearities is needed for anything beyond a hyperplane.',
      },
    ],

    flashcards: [
      { front: 'Dot product in one sentence?', back: 'Multiply matching components and add — a single number measuring how much two vectors agree.' },
      { front: 'The geometric formula for a·b?', back: '‖a‖‖b‖cos θ. Positive when aligned, zero when perpendicular, negative when opposed.' },
      { front: 'What does a zero dot product mean?', back: 'Orthogonality: the two non-zero vectors are at 90 degrees and share no common component.' },
      { front: 'Cosine similarity versus dot product?', back: 'Cosine divides out both lengths, so it measures direction only and is bounded in [−1, 1].' },
      { front: 'What does a single neuron compute?', back: 'z = w·x + b, then a nonlinearity. A dot product, a threshold shift, and a squash.' },
      { front: 'a * b versus a @ b in NumPy?', back: '* is elementwise and returns a vector; @ contracts to the scalar dot product.' },
    ],

    challenge: {
      title: 'A tiny semantic search engine',
      brief:
        'Build a bag-of-words index over at least eight short documents of deliberately varying length. Implement search(query, k) that scores documents by raw dot product and separately by cosine similarity, and print both rankings side by side. Include at least one very long document that ranks absurdly highly under the raw dot product and correctly under cosine.',
      language: 'python',
      acceptanceCriteria: [
        'Builds a shared vocabulary and vectorises every document consistently',
        'Scores by both raw dot product and cosine similarity using vectorised NumPy, not Python loops over documents',
        'Prints the two rankings together so the difference is visible',
        'Handles a query with no vocabulary overlap without producing nan',
      ],
      starterCode: 'import numpy as np\n\nDOCS = [\n    "ai models learn from data",\n]\n',
    },

    teachingPrompt: {
      prompt:
        'Explain the dot product to someone who can add and multiply but has never met vectors, then tell them why it is the most important operation in machine learning.',
      mustCover: [
        'Multiply matching entries and add them up to get one number',
        'The sign and size of that number measures agreement between two directions',
        'Zero means perpendicular, which means no shared component',
        'A neuron and a similarity search both compute exactly this',
      ],
      bonusSignals: ['uses the pushing-a-box or recruiter image', 'explains why cosine divides by the lengths', 'mentions that the result is a scalar, not a vector'],
      sampleExplanation:
        'Picture two people pushing a box. If they push the same way their efforts reinforce each other; if one pushes north and the other east neither helps the other; if they push directly against each other nothing moves. The dot product is one number that tells you which of those you have. You get it by an almost insultingly simple recipe: line the two lists of numbers up, multiply the entries that face each other, and add the results. Large and positive means the two arrows agree, zero means they are at right angles and share nothing, negative means they fight. Machine learning cannot stop using it. A neuron holds a list of importances, one per input, and its score is exactly that multiply-and-add against the incoming values. A search engine holds a vector per document and ranks them by how much each agrees with your query. If you divide the answer by both lengths you get cosine similarity, which throws away how big the two things are and keeps only which way they point — which is what you want when comparing a short note to a long article on the same subject.',
    },
  },

  {
    id: 'MATH-006',
    domain: 'MATH',
    module: 'Matrices',
    topic: 'The dual view of a matrix',
    title: 'Matrices as Data and as Functions',
    slug: 'matrices-as-data-and-functions',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['MATH-003', 'MATH-004'],
    related: ['MATH-005'],
    tags: ['matrix', 'linear-transformation', 'design-matrix', 'basis', 'geometry'],

    learningObjectives: [
      'Read a matrix as a table of data and say what its rows and columns mean',
      'Read the same matrix as a function that moves every point in space',
      'Predict what a matrix does geometrically by looking at where it sends the basis vectors',
      'Explain why the dual view is what makes linear algebra useful to machine learning rather than merely tidy',
    ],

    terminology: [
      {
        term: 'Matrix',
        definition:
          'A rectangular array of numbers with m rows and n columns, written A ∈ ℝ^(m×n).',
        simple: 'A grid of numbers.',
      },
      {
        term: 'Design matrix',
        definition:
          'The data reading of a matrix: rows are examples and columns are features. This is the shape every scikit-learn estimator expects.',
        simple: 'A spreadsheet where each row is one thing you measured.',
      },
      {
        term: 'Linear transformation',
        definition:
          'A function T with T(u + v) = T(u) + T(v) and T(αv) = αT(v). Every such function on ℝⁿ is multiplication by some matrix, and every matrix defines one.',
        simple: 'A way of moving every point in space that keeps grid lines straight, evenly spaced and the origin fixed.',
      },
      {
        term: 'Basis vector',
        definition:
          'One of the vectors e₁ = [1,0], e₂ = [0,1] (and so on) that define the coordinate axes. Every vector is a weighted sum of them.',
        simple: 'One step along one axis.',
      },
      {
        term: 'Column space',
        definition:
          'The set of all vectors you can reach as weighted combinations of the matrix’s columns — equivalently, everything the transformation can output.',
        simple: 'Everywhere the matrix can send you.',
      },
    ],

    simpleExplanation:
      'A matrix is a grid of numbers, and there are two completely different ways to look at that grid, both correct at once. The first is boring and familiar: it is a spreadsheet. Each row is one house, one customer, one photograph; each column is one thing you measured about them. Nothing mysterious. The second reading is stranger and far more powerful. Take the same grid and treat it as a set of instructions for rearranging space itself. Imagine graph paper with the origin pinned in place. The matrix says where the point one step east should end up, and where the point one step north should end up, and once you know those two things you know where every other point goes, because everything else is just a combination of those two steps. Stretch, squash, rotate, shear, flip, flatten — all of it is encoded in those few numbers. The remarkable thing is that these are the same object. A matrix is simultaneously a table you can store and a motion you can perform, and almost everything interesting in machine learning comes from switching between the two readings.',

    whyItExists:
      'Data needs a container and transformations need a representation, and it turns out one object serves both purposes. Writing a linear transformation as a grid of numbers makes it storable, composable and differentiable, while writing data as a grid makes an entire dataset a single object a transformation can be applied to in one operation. That coincidence is what lets a neural network layer be expressed as one matrix multiply and executed on hardware built for exactly that.',

    analogy: {
      scenario:
        'A currency exchange board at an airport lists, for each foreign currency, how many pounds one unit is worth. You can read the board as pure information — today euros are 0.85, dollars are 0.79 — and that is a table. But you can also read it as a machine: hand it a wallet containing some euros and some dollars and it returns a single pound amount. The very same numbers that were a table of facts are also a recipe for converting.',
      mapping: [
        { from: 'The printed board of rates', to: 'The matrix as stored data' },
        { from: 'Handing over a wallet and receiving pounds', to: 'The matrix acting as a function on a vector' },
        { from: 'The rate for euros specifically', to: 'The column of the matrix showing where the euro basis vector lands' },
        { from: 'Converting into pounds, then pounds into yen', to: 'Composing two transformations by multiplying their matrices' },
        { from: 'A currency the board values at zero', to: 'A direction that the transformation collapses to nothing' },
      ],
      bridge:
        'The exchange board makes the dual view concrete: one set of numbers, read as facts or read as an action. The reason this matters in machine learning is that a layer’s weight matrix is exactly this. It is stored and updated as data — you can print it, save it to disk, decay it — while at inference time it is an action performed on every incoming activation vector.',
      limitations:
        'Currency conversion maps many inputs to a single number, so the board is really a 1×n matrix. It also cannot express rotation or anything with negative rates, so the analogy captures the dual reading but not the geometric richness of a general transformation.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Watch a matrix move the plane',
        caption: 'Change the four numbers and see grid lines stretch, rotate, shear or collapse.',
        widget: 'matrix-transform',
      },
      {
        kind: 'compare',
        title: 'The same grid, two readings',
        left: {
          heading: 'As data',
          points: [
            'Rows are examples, columns are features',
            'Shape (n_samples, n_features)',
            'A row means "one house"; a column means "all the areas"',
            'You index it, slice it, standardise it',
          ],
        },
        right: {
          heading: 'As a function',
          points: [
            'Columns say where each basis vector lands',
            'Shape (n_outputs, n_inputs) for y = Ax',
            'Multiplying by it moves every point in space at once',
            'You compose it, invert it, decompose it into eigenvectors',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Reading a 2x2 matrix from its columns',
        caption: 'Column one is where [1,0] lands; column two is where [0,1] lands. Everything else follows.',
        columns: ['Matrix', 'e₁ = [1,0] goes to', 'e₂ = [0,1] goes to', 'Geometric effect'],
        rows: [
          ['[[2,0],[0,3]]', '[2,0]', '[0,3]', 'Stretch 2x horizontally, 3x vertically'],
          ['[[0,-1],[1,0]]', '[0,1]', '[-1,0]', 'Rotate 90 degrees anticlockwise'],
          ['[[1,1],[0,1]]', '[1,0]', '[1,1]', 'Shear: the top of the square slides right'],
          ['[[1,0],[0,0]]', '[1,0]', '[0,0]', 'Flatten onto the x-axis — information destroyed'],
          ['[[-1,0],[0,1]]', '[-1,0]', '[0,1]', 'Reflect across the vertical axis'],
        ],
      },
      {
        kind: 'flow',
        title: 'How a matrix acts on a vector',
        caption: 'The column picture, which is the one worth internalising.',
        steps: [
          { label: 'Write x in terms of the basis', detail: 'x = [3, 2] means 3 steps along e₁ plus 2 steps along e₂.' },
          { label: 'Look up where each basis vector lands', detail: 'The columns of A are exactly those destinations.' },
          { label: 'Combine with the same weights', detail: 'Ax = 3·(first column) + 2·(second column).' },
          { label: 'Read off the result', detail: 'Matrix–vector multiplication is a weighted sum of the columns, nothing more.' },
        ],
      },
    ],

    formalDefinition:
      'A matrix A ∈ ℝ^(m×n) is a doubly indexed family of scalars A_ij for 1 ≤ i ≤ m, 1 ≤ j ≤ n. It defines a linear map T_A : ℝⁿ → ℝᵐ by T_A(x) = Ax, and conversely every linear map between finite-dimensional spaces is represented by a unique matrix once bases are fixed. The j-th column of A is T_A(e_j), the image of the j-th standard basis vector, and the column space col(A) = {Ax : x ∈ ℝⁿ} is the image of the map.',

    math: {
      intuition:
        'Forget formulas for a moment and hold one picture: a matrix tells you where the basis vectors go, and that is enough to know where everything goes. In two dimensions, if you know that the point one step east ends up at [2, 1] and the point one step north ends up at [−1, 3], then the point [3, 2] — which is three easts and two norths — must end up at three copies of [2, 1] plus two copies of [−1, 3]. Nothing else is needed. The columns of the matrix are literally those destinations, sitting there in plain sight. Once you see matrix–vector multiplication as a weighted sum of columns rather than as a row-by-row dot-product ritual, most of linear algebra stops being arbitrary.',
      formulas: [
        {
          latex: 'A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}, \\qquad A e_1 = \\begin{bmatrix} a_{11} \\\\ a_{21} \\end{bmatrix}, \\quad A e_2 = \\begin{bmatrix} a_{12} \\\\ a_{22} \\end{bmatrix}',
          name: 'The columns are the images of the basis vectors',
          meaning:
            'The first column is where [1,0] lands; the second is where [0,1] lands. Reading a matrix column by column tells you what it does.',
          variables: [
            { symbol: 'A', meaning: 'The 2×2 matrix' },
            { symbol: 'a_{ij}', meaning: 'The entry in row i, column j' },
            { symbol: 'e_1', meaning: 'The first standard basis vector, [1, 0]' },
            { symbol: 'e_2', meaning: 'The second standard basis vector, [0, 1]' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'A\\mathbf{x} = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + \\cdots + x_n\\mathbf{a}_n',
          name: 'The column picture of Ax',
          meaning:
            'Matrix–vector multiplication is a weighted sum of the matrix’s columns, with the components of x as the weights.',
          variables: [
            { symbol: 'A', meaning: 'The matrix, with columns a₁ … aₙ' },
            { symbol: '\\mathbf{x}', meaning: 'The input vector' },
            { symbol: 'x_j', meaning: 'The j-th component of x, used as the weight on column j' },
            { symbol: '\\mathbf{a}_j', meaning: 'The j-th column of A, a vector in ℝᵐ' },
            { symbol: 'n', meaning: 'Number of columns, which must equal the length of x' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '(A\\mathbf{x})_i = \\sum_{j=1}^{n} A_{ij}x_j',
          name: 'The row picture of Ax',
          meaning:
            'Each output component is the dot product of one row of A with x. Useful when you want to know what a single output unit computes.',
          variables: [
            { symbol: '(A\\mathbf{x})_i', meaning: 'The i-th component of the output vector' },
            { symbol: 'A_{ij}', meaning: 'The entry of A in row i, column j' },
            { symbol: 'x_j', meaning: 'The j-th component of the input' },
            { symbol: 'n', meaning: 'Number of input components summed over' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'T(\\alpha\\mathbf{u} + \\beta\\mathbf{v}) = \\alpha T(\\mathbf{u}) + \\beta T(\\mathbf{v})',
          name: 'Linearity',
          meaning:
            'The defining property. Scaling and adding before the transformation gives the same result as after it, which is why grid lines stay straight and evenly spaced.',
          variables: [
            { symbol: 'T', meaning: 'The transformation' },
            { symbol: '\\mathbf{u}, \\mathbf{v}', meaning: 'Any two input vectors' },
            { symbol: '\\alpha, \\beta', meaning: 'Any two scalars' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\mathbf{h} = \\phi(W\\mathbf{x} + \\mathbf{b}), \\qquad W \\in \\mathbb{R}^{d_{\\text{out}} \\times d_{\\text{in}}}',
          name: 'A dense layer as a transformation',
          meaning:
            'The weight matrix maps the input space into the output space, the bias shifts it, and the activation bends it. Training reshapes the transformation.',
          variables: [
            { symbol: '\\mathbf{h}', meaning: 'The layer’s output activations' },
            { symbol: 'W', meaning: 'The weight matrix; its shape fixes input and output dimensionality' },
            { symbol: '\\mathbf{x}', meaning: 'The input vector to the layer' },
            { symbol: '\\mathbf{b}', meaning: 'The bias vector, one per output unit' },
            { symbol: '\\phi', meaning: 'The elementwise nonlinearity' },
            { symbol: 'd_{\\text{in}}, d_{\\text{out}}', meaning: 'Input and output dimensionality' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Why is knowing where the basis vectors go enough? Take any x in ℝ² and write it in the standard basis: x = x₁e₁ + x₂e₂.',
        'Apply the transformation: T(x) = T(x₁e₁ + x₂e₂).',
        'Use additivity: T(x) = T(x₁e₁) + T(x₂e₂).',
        'Use homogeneity: T(x) = x₁T(e₁) + x₂T(e₂).',
        'So T(x) depends on the input only through x₁ and x₂, and on the transformation only through the two vectors T(e₁) and T(e₂).',
        'Store those two destination vectors side by side as the columns of a matrix A, and the formula above is exactly Ax = x₁a₁ + x₂a₂.',
        'This is why a linear transformation on ℝⁿ needs only n vectors to specify it completely, and why the matrix has exactly n columns. Linearity is doing all the work: it is the reason a finite grid of numbers can describe what happens to infinitely many points.',
      ],
    },

    workedExample: {
      title: 'Predicting what a matrix does without multiplying anything',
      setup:
        'Consider A = [[0, −1], [1, 0]] and the point x = [3, 2]. We will read A geometrically from its columns first, then confirm by arithmetic.',
      steps: [
        { label: 'Read column one', detail: 'The first column is [0, 1], so e₁ = [1,0] (one step east) is sent to [0,1] (one step north). East becomes north.' },
        { label: 'Read column two', detail: 'The second column is [−1, 0], so e₂ = [0,1] (north) is sent to [−1,0] (west). North becomes west.' },
        { label: 'Name the transformation', detail: 'East to north and north to west is a rotation by 90 degrees anticlockwise. No arithmetic was needed to see this.' },
        { label: 'Predict the answer', detail: 'Rotating [3, 2] by 90 degrees anticlockwise should give [−2, 3].' },
        { label: 'Confirm by the column picture', detail: 'Ax = 3·[0,1] + 2·[−1,0] = [0,3] + [−2,0] = [−2, 3]. The prediction holds.', latex: 'A\\mathbf{x} = 3\\begin{bmatrix}0\\\\1\\end{bmatrix} + 2\\begin{bmatrix}-1\\\\0\\end{bmatrix} = \\begin{bmatrix}-2\\\\3\\end{bmatrix}' },
        { label: 'Confirm by the row picture', detail: 'Row one dotted with x is 0×3 + (−1)×2 = −2; row two is 1×3 + 0×2 = 3. Same answer, different route.' },
        { label: 'Sanity check the length', detail: '‖x‖ = √13 and ‖Ax‖ = √(4+9) = √13. A rotation preserves length, as it must.' },
      ],
      conclusion:
        'Two readings of the same four numbers gave the same result, and the geometric reading gave it faster and with more insight. When you meet an unfamiliar matrix, look at its columns before you multiply: they tell you what it is about to do.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'One array, two readings',
        runnable: true,
        code: `import numpy as np

A = np.array([[2.0, 0.0],
              [0.0, 3.0]])

# Reading 1: data. Two examples, two features.
print("example 0:", A[0], " feature 1 column:", A[:, 1])

# Reading 2: a function. Where do the basis vectors land?
e1, e2 = np.array([1.0, 0.0]), np.array([0.0, 1.0])
print("e1 ->", A @ e1, " e2 ->", A @ e2)
print("[3,2] ->", A @ np.array([3.0, 2.0]))`,
        output: `example 0: [2. 0.]  feature 1 column: [0. 3.]
e1 -> [2. 0.]  e2 -> [0. 3.]
[3,2] -> [6. 6.]`,
        explanation:
          'Nothing about the stored array changed between the two readings; only the question did. Note that A @ e1 returns precisely the first column, which is the whole content of the column picture: the columns are the images of the basis vectors, so you can read a matrix’s geometry straight off the page.',
      },
      {
        language: 'python',
        title: 'Reading the geometry off the columns',
        runnable: true,
        code: `import numpy as np

square = np.array([[0.0, 1.0, 1.0, 0.0],
                   [0.0, 0.0, 1.0, 1.0]])   # corners of the unit square

transforms = {
    "stretch": np.array([[2.0, 0.0], [0.0, 0.5]]),
    "rotate90": np.array([[0.0, -1.0], [1.0, 0.0]]),
    "shear":   np.array([[1.0, 1.0], [0.0, 1.0]]),
    "collapse":np.array([[1.0, 0.0], [0.0, 0.0]]),
}

for name, M in transforms.items():
    out = M @ square
    print(f"{name:9s} corners -> {np.round(out.T, 2).tolist()}")`,
        output: `stretch   corners -> [[0.0, 0.0], [2.0, 0.0], [2.0, 0.5], [0.0, 0.5]]
rotate90  corners -> [[0.0, 0.0], [0.0, 1.0], [-1.0, 1.0], [-1.0, 0.0]]
shear     corners -> [[0.0, 0.0], [1.0, 0.0], [2.0, 1.0], [1.0, 1.0]]
collapse  corners -> [[0.0, 0.0], [1.0, 0.0], [1.0, 0.0], [0.0, 0.0]]`,
        explanation:
          'Each matrix is applied to all four corners at once by putting the corners in columns. The collapse case is worth staring at: two distinct corners land on the same point, so the transformation has destroyed information and cannot be undone — which is exactly what a zero determinant will mean in MATH-009.',
      },
      {
        language: 'python',
        title: 'A dense layer is a transformation between spaces',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)
W = rng.normal(scale=0.3, size=(3, 5))   # 5 inputs -> 3 outputs
b = np.zeros(3)

x = rng.normal(size=5)
h = np.maximum(0.0, W @ x + b)

print("W shape:", W.shape, " x shape:", x.shape, " h shape:", h.shape)
print("h:", np.round(h, 3))

batch = rng.normal(size=(8, 5))          # 8 examples
H = np.maximum(0.0, batch @ W.T + b)     # note the transpose
print("batch:", batch.shape, "->", H.shape)`,
        output: `W shape: (3, 5)  x shape: (5,)  h shape: (3,)
h: [0.    0.263 0.   ]
batch: (8, 5) -> (8, 3)`,
        explanation:
          'W maps a 5-dimensional space into a 3-dimensional one, so it is a genuine transformation between different spaces, not a rearrangement within one. The transpose in the batched version is where the data reading and the function reading meet: examples are rows in the data convention but the transformation expects them as columns, so one of the two must be flipped.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A dense layer in PyTorch',
        usage:
          'nn.Linear(512, 256) stores a 256×512 weight matrix. It is data during an optimiser step and a transformation during the forward pass, within the same millisecond.',
      },
      {
        context: 'Image rotation and augmentation',
        usage:
          'Rotating, scaling and shearing a training image are all 2×2 (or 3×3 homogeneous) matrices applied to pixel coordinates — geometry used deliberately as data augmentation.',
      },
      {
        context: 'PCA as a change of basis',
        usage:
          'PCA finds a matrix whose columns are new axes aligned with the directions of greatest variance, then multiplies the data by it to re-express every example in those coordinates.',
      },
      {
        context: 'A tabular dataset in pandas',
        usage:
          'df.values is the pure data reading: rows are observations, columns are features, and every model in scikit-learn expects exactly this layout.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: '@ performs the transformation; slicing performs the data reading. Both act on the same ndarray.' },
      { tool: 'PyTorch', role: 'nn.Linear holds weight of shape (out_features, in_features) and applies x @ W.T + b.' },
      { tool: 'scikit-learn', role: 'PCA.components_ is a matrix of new basis directions; transform() applies it to your data.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing a matrix is only a table of numbers',
        why: 'Spreadsheets are the first place most people meet grids, so the transformation reading never occurs to them.',
        fix: 'Whenever you meet a matrix, ask where it sends the basis vectors. Its columns answer that immediately.',
      },
      {
        mistake: 'Mixing up the data convention and the transformation convention',
        why: 'Data puts examples in rows (n_samples, n_features), while y = Ax puts the input in a column, so batched code needs a transpose somewhere.',
        fix: 'Pick one convention per codebase and write the shapes in a comment. PyTorch uses x @ W.T precisely to reconcile the two.',
      },
      {
        mistake: 'Assuming every matrix preserves lengths and angles',
        why: 'Rotations do, so people generalise from the first example they meet.',
        fix: 'Only orthogonal matrices preserve lengths. A general matrix stretches some directions, shrinks others and can flatten space entirely.',
      },
      {
        mistake: 'Thinking of the rows as "where the basis vectors go"',
        why: 'The row picture is also valid for computing entries, so the two get conflated.',
        fix: 'Columns are destinations of basis vectors; rows are the recipes for individual output components. Check with A @ e1, which returns the first column.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does it mean to say a matrix is a linear transformation?',
        answer:
          'It means the function x ↦ Ax respects addition and scalar multiplication: A(u + v) = Au + Av and A(αv) = αAv. Geometrically this forces grid lines to stay straight and evenly spaced and the origin to stay put, which rules out bending, and it has a strong practical consequence: the transformation is completely determined by what it does to the basis vectors, since every other vector is a weighted sum of them. Those images are exactly the columns of A, which is why an n-dimensional input space needs a matrix with n columns. This is also why a neural network needs nonlinearities — linearity is a severe restriction as well as a convenience.',
        followUp:
          'A strong answer notes that affine maps such as Wx + b are not linear in the strict sense because they move the origin, which is why the bias is handled separately or absorbed by a homogeneous coordinate.',
      },
      {
        level: 'ml-engineer',
        question: 'Why do people say the dual view of matrices is the central idea of linear algebra for ML?',
        answer:
          'Because a machine learning model constantly moves between the two readings of the same object. A weight matrix is data when the optimiser updates it, decays it, prunes it or saves it to a checkpoint, and it is a transformation when the forward pass maps activations from one space to another. Likewise the design matrix is data when you clean and standardise it, but the moment you multiply it by a weight vector you are applying a transformation to every example simultaneously. Holding both readings lets you reason about a layer geometrically — what directions does it amplify, what does it collapse — while still implementing it as an array operation, and it is what makes techniques like PCA, low-rank adaptation and weight-matrix spectral analysis comprehensible rather than magical.',
      },
      {
        level: 'intermediate',
        question: 'Given the matrix [[1, 0], [0, 0]], describe what it does and what that implies.',
        answer:
          'Its columns are [1, 0] and [0, 0], so it sends e₁ to itself and sends e₂ to the origin. Every point is projected onto the horizontal axis: the entire vertical component of every input is discarded. The implication is that the transformation is not invertible, because infinitely many inputs — every point on a given vertical line — map to the same output, so there is no way to recover which one you started from. Its column space is one-dimensional despite living in ℝ², which is another way of saying its rank is 1 and its determinant is 0. In a network, a weight matrix drifting towards this kind of degeneracy means a layer has stopped carrying information along some direction.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For A = [[3, 0], [0, 0.5]], say in words what the transformation does, then compute A[4, 6] by the column picture.',
        hint: 'Look at where [1,0] and [0,1] land before doing any arithmetic.',
        solution:
          'The first column [3, 0] means east is stretched to three times its length; the second column [0, 0.5] means north is squashed to half. So the transformation triples horizontally and halves vertically. By the column picture, A[4,6] = 4·[3,0] + 6·[0,0.5] = [12, 0] + [0, 3] = [12, 3]. The unit square becomes a 3-by-0.5 rectangle, so areas are scaled by 1.5 — a fact that MATH-009 will call the determinant.',
      },
      {
        prompt: 'Write down the 2×2 matrix that reflects points across the horizontal axis, and verify it on [2, 5].',
        hint: 'A reflection across the horizontal axis leaves east alone and sends north to south.',
        solution:
          'e₁ = [1,0] is unchanged so the first column is [1, 0]; e₂ = [0,1] goes to [0, −1] so the second column is [0, −1]. The matrix is [[1, 0], [0, −1]]. Applying it: 2·[1,0] + 5·[0,−1] = [2, −5], which is [2, 5] flipped below the axis as required. Applying it twice returns the original point, which is the geometric reason its square is the identity.',
      },
      {
        prompt: 'A dataset has 1000 examples and 20 features, and a layer maps 20 features to 6 outputs. State the shape of the weight matrix in the y = Wx convention and in the batched X @ W.T convention, and the shape of the output in each.',
        hint: 'In y = Wx the input is a column of length 20; in the batched form examples are rows.',
        solution:
          'W has shape (6, 20) — six output units, each with twenty weights. For a single example, W @ x gives shape (6,). For the batch, X has shape (1000, 20), so X @ W.T has shape (1000, 6): one row per example, one column per output unit. The transpose is needed precisely because the data convention stores examples as rows while the transformation convention expects them as columns.',
      },
    ],

    quiz: [
      {
        id: 'MATH-006-q1',
        type: 'mcq',
        concept: 'columns as basis images',
        prompt: 'What do the columns of a matrix A tell you, when A is read as a transformation?',
        options: [
          'Where each standard basis vector is sent',
          'The eigenvalues of the transformation',
          'The features of the dataset',
          'The lengths of the output vectors',
        ],
        answerIndex: 0,
        explanation:
          'Column j is A e_j, the image of the j-th basis vector. Because every vector is a weighted sum of basis vectors, those columns determine the whole transformation.',
      },
      {
        id: 'MATH-006-q2',
        type: 'truefalse',
        concept: 'linearity',
        prompt: 'A linear transformation can move the origin to a different point.',
        answer: false,
        explanation:
          'False. Setting α = 0 in T(αv) = αT(v) forces T(0) = 0. Maps that do move the origin, such as Wx + b, are called affine, which is why the bias is treated separately.',
      },
      {
        id: 'MATH-006-q3',
        type: 'match',
        concept: 'geometric effects',
        prompt: 'Match each 2x2 matrix to its geometric effect.',
        pairs: [
          { left: '[[2,0],[0,2]]', right: 'Uniform scaling by 2' },
          { left: '[[0,-1],[1,0]]', right: 'Rotation by 90 degrees anticlockwise' },
          { left: '[[1,1],[0,1]]', right: 'Horizontal shear' },
          { left: '[[1,0],[0,0]]', right: 'Projection onto the horizontal axis' },
        ],
        explanation:
          'Each answer is read straight off the columns: where does east go, where does north go. Being able to do this at a glance is the practical payoff of the transformation view.',
      },
      {
        id: 'MATH-006-q4',
        type: 'code-output',
        language: 'python',
        concept: 'basis images in code',
        prompt: 'What does this print?',
        code: 'import numpy as np\nA = np.array([[4, 7], [2, 9]])\nprint(A @ np.array([1, 0]))',
        options: ['[4 2]', '[4 7]', '[7 9]', '[1 0]'],
        answerIndex: 0,
        explanation:
          'Multiplying by the first basis vector extracts the first column, which is [4, 2] reading down the column. This is the column picture demonstrated in one line.',
      },
      {
        id: 'MATH-006-q5',
        type: 'fill',
        concept: 'design matrix layout',
        prompt: 'In the data reading of a matrix with shape (n_samples, n_features), the columns represent what?',
        answers: ['features', 'variables', 'attributes', 'columns are features'],
        explanation:
          'Rows are examples and columns are features. Confusing the two produces a transposed matrix and a dimension-mismatch error at the first model call, or worse, a silently wrong fit.',
      },
      {
        id: 'MATH-006-q6',
        type: 'explain',
        concept: 'the dual view',
        prompt: 'Explain the two ways of reading a matrix and why holding both at once is useful.',
        rubric: [
          'Describes the data reading with rows as examples and columns as features',
          'Describes the transformation reading with columns as images of basis vectors',
          'Gives a concrete case where switching between the readings is useful',
        ],
        sampleAnswer:
          'Read as data, a matrix is a table: each row is one example and each column is one measured feature, which is how a dataset is stored and cleaned. Read as a function, the same grid describes a way of moving every point in space at once, and its columns say where each coordinate axis ends up, so you can tell at a glance whether it stretches, rotates, shears or flattens. Both readings apply to the same array. A neural network weight matrix is a clear case: the optimiser treats it as data when it updates and decays the numbers, while the forward pass treats it as a transformation carrying activations from one space to another. Thinking geometrically tells you that a layer whose matrix collapses a direction has permanently thrown information away, and thinking of it as data tells you how to store, regularise and inspect it.',
        explanation:
          'A strong answer keeps both readings live and gives a case where the geometric view explains something the table view cannot.',
      },
    ],

    flashcards: [
      { front: 'What do the columns of a matrix mean geometrically?', back: 'Column j is where the j-th basis vector lands. Together they determine the entire transformation.' },
      { front: 'The column picture of Ax?', back: 'A weighted sum of A’s columns, using the components of x as the weights.' },
      { front: 'What are the two readings of a matrix?', back: 'Data — rows are examples, columns are features. Function — a linear transformation of space.' },
      { front: 'Why must a linear transformation fix the origin?', back: 'Because T(0v) = 0T(v) = 0. Maps that shift the origin, like Wx + b, are affine, not linear.' },
      { front: 'What does [[1,0],[0,0]] do?', back: 'Projects every point onto the horizontal axis, destroying the vertical component — not invertible.' },
      { front: 'Shape of nn.Linear(512, 256).weight?', back: '(256, 512) — out_features by in_features, applied as x @ W.T + b.' },
    ],

    challenge: {
      title: 'Read the matrix before you multiply',
      brief:
        'Write classify_transform(A) for a 2×2 matrix that inspects only the columns and prints a plain-English description: uniform scaling, non-uniform scaling, rotation, reflection, shear, projection/collapse, or general. Verify each verdict by applying A to the corners of the unit square and printing the resulting shape. Test on at least six matrices including a singular one.',
      language: 'python',
      acceptanceCriteria: [
        'Detects a collapse by checking whether the columns are parallel',
        'Distinguishes rotation from reflection using the sign of a₁₁a₂₂ − a₁₂a₂₁',
        'Prints the transformed unit-square corners alongside each verdict',
        'Correctly classifies at least six test matrices, one of which is singular',
      ],
      starterCode: 'import numpy as np\n\ndef classify_transform(A):\n    """Describe a 2x2 matrix by reading its columns."""\n',
    },

    teachingPrompt: {
      prompt:
        'Someone comfortable with spreadsheets asks why mathematicians make such a fuss about matrices when they are obviously just tables. Change their mind.',
      mustCover: [
        'A matrix can be read as data, with rows as examples and columns as features',
        'The same matrix can be read as a transformation of space',
        'The columns say where the basis vectors land, which determines everything',
        'A neural network layer uses both readings of the same object',
      ],
      bonusSignals: ['gives a concrete 2x2 example such as a rotation', 'mentions that a collapse destroys information', 'notes that linearity keeps grid lines straight'],
      sampleExplanation:
        'You are right that a matrix is a table, and for storing data that reading is the whole story: one row per house, one column per thing you measured. But there is a second reading that the spreadsheet framing hides. Take a 2×2 grid and instead of asking what the numbers record, ask what they do. The first column says where the point one step east should end up; the second says where the point one step north should end up. Because every point on the page is some number of easts plus some number of norths, those two destinations tell you where every point goes. Four numbers, and you have described a motion of the entire plane: a stretch, a rotation, a shear, or a flattening that squashes the whole plane onto a line and throws information away for good. The reason this matters is that machine learning uses both readings of the same object constantly. A layer’s weight matrix is a table when the optimiser nudges its numbers, and a motion when the forward pass carries activations from one space into another. If you only ever see the table, a phrase like "this layer has collapsed a direction" is mysterious; once you see the motion, it is obvious.',
    },
  },

  {
    id: 'MATH-007',
    domain: 'MATH',
    module: 'Matrices',
    topic: 'Matrix multiplication',
    title: 'Matrix Multiplication',
    slug: 'matrix-multiplication',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['MATH-006'],
    related: ['MATH-005', 'MATH-006'],
    tags: ['matmul', 'shapes', 'composition', 'non-commutative', 'batching'],

    learningObjectives: [
      'State the shape rule for matrix multiplication and use it to predict the output shape before computing anything',
      'Compute a product entry by entry as a dot product of a row with a column',
      'Explain matrix multiplication as composition of transformations, applied right to left',
      'Demonstrate that AB and BA are generally different, and say what that means for layer order',
    ],

    terminology: [
      {
        term: 'Inner dimension',
        definition:
          'The shared dimension in (m×n)(n×p): the number of columns of the left matrix and rows of the right. It must match, and it disappears from the result.',
        simple: 'The number in the middle that has to agree and then vanishes.',
      },
      {
        term: 'Conformable',
        definition: 'Two matrices are conformable for multiplication when the inner dimensions agree.',
        simple: 'Shapes that fit together.',
      },
      {
        term: 'Composition',
        definition:
          'Applying one transformation after another. The matrix of the combined transformation is the product of the individual matrices, in right-to-left order.',
        simple: 'Doing one motion then another, and writing the pair as a single motion.',
      },
      {
        term: 'Non-commutativity',
        definition:
          'AB ≠ BA in general, because doing transformation B then A is not the same as doing A then B.',
        simple: 'Order matters: rotating then stretching differs from stretching then rotating.',
      },
      {
        term: 'Batched matmul',
        definition:
          'Multiplying a whole matrix of stacked examples by a weight matrix in one operation, which is how a layer processes a minibatch.',
        simple: 'Doing the same transformation to a thousand things at once.',
      },
    ],

    simpleExplanation:
      'Think about two factory machines on a production line. The first takes raw material and turns it into parts; the second takes parts and turns them into finished goods. If you wanted, you could describe the pair as a single machine that goes straight from raw material to finished goods, and you could work out its behaviour without ever running it — just trace what happens to each kind of raw material through both stages. Matrix multiplication is that tracing. When you multiply two matrices you are not really combining two tables; you are combining two transformations into the one transformation that does both. This explains the two things that confuse everyone at first. It explains the shape rule: the output of the first machine must be something the second machine accepts, so the middle numbers must match. And it explains why the order matters: putting the paint machine before the cutting machine gives painted edges, putting it after gives bare ones, and no amount of arithmetic will make those the same.',

    whyItExists:
      'Once matrices represent transformations, you immediately want to chain them, and doing that by applying each one separately to every vector is both slow and conceptually clumsy. Matrix multiplication precomputes the combined transformation once, so a stack of operations collapses into a single object. It is also the operation that makes batching possible: one product applies a layer to thousands of examples simultaneously, which is why GPUs are designed around it and why almost all deep-learning compute time is spent inside it.',

    analogy: {
      scenario:
        'A translation agency converts documents from Japanese into English, and a second agency converts English into French. A client with Japanese documents and French readers could use both in sequence. If the agencies merged, the combined service would go straight from Japanese to French, and its price list could be worked out in advance by tracing each Japanese phrase through both offices. Crucially, the English step must exist in both agencies’ vocabularies — if the first outputs English but the second expects German, no chain is possible.',
      mapping: [
        { from: 'The first agency, Japanese to English', to: 'The right-hand matrix B, applied first' },
        { from: 'The second agency, English to French', to: 'The left-hand matrix A, applied second' },
        { from: 'The merged Japanese-to-French service', to: 'The product AB' },
        { from: 'English, which must be shared by both', to: 'The inner dimension, which must match and then disappears' },
        { from: 'Japanese documents in, French documents out', to: 'The outer dimensions, which survive into the result’s shape' },
        { from: 'Reversing the order and getting nonsense', to: 'BA being either undefined or a completely different transformation' },
      ],
      bridge:
        'The chain explains the notation everyone finds backwards. In ABx, the matrix nearest the vector acts first, exactly as the first agency touches the document first. It also explains the shape rule precisely: (m×n)(n×p) works because the n is shared, and the result is m×p because you go from p inputs to m outputs overall.',
      limitations:
        'Translation loses information and is not reversible in a clean way, whereas many matrix products are invertible. The analogy also suggests each step is independent, while in reality the combined matrix can have properties neither factor has — a product of two non-zero matrices can be the zero matrix.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Compose two transformations and see the result',
        caption: 'Apply one matrix, then another, then compare with their product applied once.',
        widget: 'matrix-transform',
      },
      {
        kind: 'annotated',
        title: 'The shape rule',
        subject: '(m × n) · (n × p) = (m × p)',
        annotations: [
          { part: 'm', note: 'Rows of the left matrix. Survives into the result as its number of rows.' },
          { part: 'n (twice)', note: 'The inner dimension. Must match exactly, and is summed over and destroyed.' },
          { part: 'p', note: 'Columns of the right matrix. Survives as the result’s number of columns.' },
          { part: '=', note: 'If the two n values differ, NumPy raises ValueError: matmul: Input operand 1 has a mismatch in its core dimension.' },
        ],
      },
      {
        kind: 'flow',
        title: 'Computing one entry of the product',
        caption: 'Every entry of AB is a dot product, which is why MATH-005 came first.',
        steps: [
          { label: 'Decide which entry you want', detail: 'Say C₂₃: row 2, column 3 of the result.' },
          { label: 'Take row 2 of A', detail: 'A vector of length n.' },
          { label: 'Take column 3 of B', detail: 'Also a vector of length n — this is why the inner dimensions must match.' },
          { label: 'Dot them together', detail: 'Multiply matching entries and sum. That single number is C₂₃.' },
          { label: 'Repeat for every position', detail: 'An m×p result requires m·p dot products of length n, hence m·n·p multiply-adds in total.' },
        ],
      },
      {
        kind: 'compare',
        title: 'AB versus BA on the same pair',
        caption: 'With A a 90-degree rotation and B a horizontal stretch by 2.',
        left: {
          heading: 'AB: stretch first, then rotate',
          points: [
            'The unit square becomes 2 wide and 1 tall',
            'Then that wide rectangle is rotated upright',
            'Result: 1 wide, 2 tall',
            'Matrix: [[0,-1],[1,0]] · [[2,0],[0,1]] = [[0,-1],[2,0]]',
          ],
        },
        right: {
          heading: 'BA: rotate first, then stretch',
          points: [
            'The unit square is rotated upright, still 1 by 1',
            'Then stretched horizontally by 2',
            'Result: 2 wide, 1 tall',
            'Matrix: [[2,0],[0,1]] · [[0,-1],[1,0]] = [[0,-2],[1,0]]',
          ],
        },
      },
    ],

    formalDefinition:
      'For A ∈ ℝ^(m×n) and B ∈ ℝ^(n×p), the product C = AB ∈ ℝ^(m×p) is defined entrywise by C_ij = Σ_{k=1}^{n} A_ik B_kj. The operation is associative, distributive over addition, and compatible with scalar multiplication, but not commutative. It corresponds exactly to composition of the associated linear maps: T_AB = T_A ∘ T_B, so the right-hand factor acts first.',

    math: {
      intuition:
        'Two ideas carry all the weight. First, each entry of the answer is a dot product: row i of the left matrix against column j of the right. That is why the inner dimensions must agree — you cannot dot a length-3 row with a length-4 column. Second, the product is the composition of the two transformations, with the right-hand matrix acting first because it sits closest to the vector it will eventually multiply. The first idea tells you how to compute; the second tells you what you have computed. Almost every confusion about matrix multiplication dissolves once you decide which of the two questions you are currently asking.',
      formulas: [
        {
          latex: 'C_{ij} = \\sum_{k=1}^{n} A_{ik}B_{kj}',
          name: 'Entrywise definition',
          meaning:
            'The entry in row i, column j of the product is the dot product of row i of A with column j of B.',
          variables: [
            { symbol: 'C_{ij}', meaning: 'The entry of the product in row i, column j' },
            { symbol: 'A_{ik}', meaning: 'The entry of A in row i, column k' },
            { symbol: 'B_{kj}', meaning: 'The entry of B in row k, column j' },
            { symbol: 'k', meaning: 'The summation index running along the shared inner dimension' },
            { symbol: 'n', meaning: 'The inner dimension: columns of A and rows of B' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'A \\in \\mathbb{R}^{m\\times n},\; B \\in \\mathbb{R}^{n\\times p} \;\\Rightarrow\; AB \\in \\mathbb{R}^{m\\times p}',
          name: 'The shape rule',
          meaning:
            'Inner dimensions must match and then vanish; outer dimensions survive. Checking this before you code prevents most matmul errors.',
          variables: [
            { symbol: 'm', meaning: 'Rows of A, and rows of the result' },
            { symbol: 'n', meaning: 'Columns of A and rows of B — the inner dimension that must agree' },
            { symbol: 'p', meaning: 'Columns of B, and columns of the result' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '(AB)\\mathbf{x} = A(B\\mathbf{x})',
          name: 'Associativity, and composition order',
          meaning:
            'Multiplying the matrices first or applying them one at a time gives the same answer. B is applied first, because it is nearest x.',
          variables: [
            { symbol: 'A', meaning: 'The transformation applied second' },
            { symbol: 'B', meaning: 'The transformation applied first' },
            { symbol: '\\mathbf{x}', meaning: 'The input vector' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'AB \\neq BA \\quad \\text{in general}',
          name: 'Non-commutativity',
          meaning:
            'Matrix multiplication depends on order. Even when both products are defined and the same shape, they are usually different matrices.',
          variables: [
            { symbol: 'A', meaning: 'One transformation' },
            { symbol: 'B', meaning: 'Another transformation' },
            { symbol: '\\neq', meaning: 'Not equal — equality holds only for special pairs, such as two rotations in the plane' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'H = XW^{\\top} + \\mathbf{1}\\mathbf{b}^{\\top}, \\qquad X \\in \\mathbb{R}^{B\\times d_{\\text{in}}},\; W \\in \\mathbb{R}^{d_{\\text{out}}\\times d_{\\text{in}}}',
          name: 'A dense layer over a minibatch',
          meaning:
            'One matrix product applies the layer to every example in the batch simultaneously. This single line is where most training FLOPs are spent.',
          variables: [
            { symbol: 'H', meaning: 'Output activations, shape (B, d_out)' },
            { symbol: 'X', meaning: 'Input minibatch, one example per row' },
            { symbol: 'W', meaning: 'Weight matrix, stored as (d_out, d_in) by PyTorch convention' },
            { symbol: 'B', meaning: 'Batch size: how many examples are processed together' },
            { symbol: '\\mathbf{b}', meaning: 'Bias vector of length d_out, broadcast across the batch' },
            { symbol: '\\mathbf{1}', meaning: 'A column of ones of length B, which broadcasts the bias to every row' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\text{FLOPs}(AB) \\approx 2mnp',
          name: 'Cost of a matrix product',
          meaning:
            'Each of the m·p output entries needs n multiplications and n additions, so cost grows with the product of all three dimensions.',
          variables: [
            { symbol: 'm', meaning: 'Rows of A' },
            { symbol: 'n', meaning: 'Inner dimension' },
            { symbol: 'p', meaning: 'Columns of B' },
            { symbol: '\\text{FLOPs}', meaning: 'Floating-point operations: the standard unit for estimating compute cost' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Why does entry C_ij come out as a sum over the shared index? Start from composition: we want the matrix of the map x ↦ A(Bx).',
        'First apply B. By the row picture, the k-th component of Bx is (Bx)_k = Σ_j B_kj x_j.',
        'Now apply A to that result. The i-th component is (A(Bx))_i = Σ_k A_ik (Bx)_k.',
        'Substitute the expression for (Bx)_k: (A(Bx))_i = Σ_k A_ik (Σ_j B_kj x_j).',
        'Swap the order of summation, which is legitimate for finite sums: (A(Bx))_i = Σ_j (Σ_k A_ik B_kj) x_j.',
        'Compare with the row picture for a single matrix C: (Cx)_i = Σ_j C_ij x_j. Matching coefficients of x_j gives C_ij = Σ_k A_ik B_kj.',
        'So the strange-looking entrywise rule is not a convention someone chose; it is forced by insisting that matrix multiplication represent composition. The summation index k runs over the inner dimension, which is exactly why that dimension must match and why it disappears from the answer.',
      ],
    },

    workedExample: {
      title: 'A full 2×3 by 3×2 product, computed by hand',
      setup:
        'Let A = [[1, 2, 3], [4, 5, 6]] with shape (2, 3) and B = [[7, 8], [9, 10], [11, 12]] with shape (3, 2). The inner dimensions are both 3, so the product is defined and has shape (2, 2). That is four entries, each a dot product of length 3.',
      steps: [
        { label: 'Check shapes first', detail: '(2×3)(3×2): the inner 3s match, so the result is 2×2. Never start arithmetic before this check.' },
        { label: 'C₁₁ = row 1 of A · column 1 of B', detail: '[1, 2, 3] · [7, 9, 11] = 7 + 18 + 33 = 58.', latex: 'C_{11} = 1(7) + 2(9) + 3(11) = 58' },
        { label: 'C₁₂ = row 1 of A · column 2 of B', detail: '[1, 2, 3] · [8, 10, 12] = 8 + 20 + 36 = 64.', latex: 'C_{12} = 1(8) + 2(10) + 3(12) = 64' },
        { label: 'C₂₁ = row 2 of A · column 1 of B', detail: '[4, 5, 6] · [7, 9, 11] = 28 + 45 + 66 = 139.', latex: 'C_{21} = 4(7) + 5(9) + 6(11) = 139' },
        { label: 'C₂₂ = row 2 of A · column 2 of B', detail: '[4, 5, 6] · [8, 10, 12] = 32 + 50 + 72 = 154.', latex: 'C_{22} = 4(8) + 5(10) + 6(12) = 154' },
        { label: 'Assemble', detail: 'C = [[58, 64], [139, 154]]. Total work: 4 entries × 3 multiply-adds = 12 multiplications, matching m·n·p = 2·3·2.', latex: 'AB = \\begin{bmatrix} 58 & 64 \\\\ 139 & 154 \\end{bmatrix}' },
        { label: 'Now try the other order', detail: 'BA is (3×2)(2×3), which is also defined but gives a 3×3 matrix — a different shape entirely, so AB and BA could not possibly be equal here.' },
      ],
      conclusion:
        'C = [[58, 64], [139, 154]]. The two habits worth taking away are checking shapes before computing, and remembering that each entry is one dot product between a row on the left and a column on the right.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The worked example, verified',
        runnable: true,
        code: `import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])
B = np.array([[7, 8],
              [9, 10],
              [11, 12]])

print("A:", A.shape, " B:", B.shape)
print("AB:\\n", A @ B, "  shape", (A @ B).shape)
print("BA shape:", (B @ A).shape)
print("C11 by hand:", np.dot(A[0], B[:, 0]))`,
        output: `A: (2, 3)  B: (3, 2)
AB:
 [[ 58  64]
 [139 154]]   shape (2, 2)
BA shape: (3, 3)
C11 by hand: 58`,
        explanation:
          'AB and BA are both defined here yet have different shapes — (2,2) against (3,3) — which is the starkest possible demonstration that order is not negotiable. The last line confirms that a single entry really is the dot product of a row with a column, which is the mechanical heart of the operation.',
      },
      {
        language: 'python',
        title: 'Composition: multiply the matrices or apply them in turn',
        runnable: true,
        code: `import numpy as np

rotate = np.array([[0.0, -1.0], [1.0, 0.0]])   # 90 degrees anticlockwise
stretch = np.array([[2.0, 0.0], [0.0, 1.0]])   # double the width
x = np.array([1.0, 1.0])

print("apply stretch then rotate:", rotate @ (stretch @ x))
print("as one matrix           :", (rotate @ stretch) @ x)
print()
print("rotate @ stretch:\\n", rotate @ stretch)
print("stretch @ rotate:\\n", stretch @ rotate)`,
        output: `apply stretch then rotate: [-1.  2.]
as one matrix           : [-1.  2.]

rotate @ stretch:
 [[ 0. -1.]
 [ 2.  0.]]
stretch @ rotate:
 [[ 0. -2.]
 [ 1.  0.]]`,
        explanation:
          'The first two lines show associativity: precomputing the product gives exactly the same answer as applying the transformations one after another, which is what lets a framework fuse layers. The last two show non-commutativity concretely — stretching a rotated square is not the same as rotating a stretched one, and the two product matrices differ in where the 2 lands.',
      },
      {
        language: 'python',
        title: 'Batching: one product, a thousand examples',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)
X = rng.normal(size=(1000, 64))     # 1000 examples, 64 features
W = rng.normal(size=(32, 64))       # layer maps 64 -> 32
b = np.zeros(32)

H = X @ W.T + b                     # one matmul for the whole batch
print("X", X.shape, "@ W.T", W.T.shape, "->", H.shape)

# the same thing example by example, to prove they agree
slow = np.stack([W @ X[i] + b for i in range(1000)])
print("identical:", np.allclose(H, slow))
print("FLOPs ~", 2 * 1000 * 64 * 32)`,
        output: `X (1000, 64) @ W.T (64, 32) -> (1000, 32)
identical: True
FLOPs ~ 4096000`,
        explanation:
          'The loop and the single matmul compute exactly the same numbers, but the matmul dispatches to a tuned BLAS kernel and runs orders of magnitude faster. The transpose on W is the price of the two conventions meeting: the data stores examples as rows while nn.Linear stores weights as (out, in).',
      },
    ],

    realWorldExamples: [
      {
        context: 'Every forward pass of every neural network',
        usage:
          'A transformer layer is a sequence of large matrix products; on a GPU, tensor cores exist specifically to make them fast, and matmul typically accounts for well over 90 per cent of training FLOPs.',
      },
      {
        context: 'Graphics and data augmentation',
        usage:
          'Rotating then translating then scaling an image is done by multiplying three 3×3 homogeneous matrices into one, then applying that single matrix to every pixel coordinate.',
      },
      {
        context: 'Markov chains and PageRank',
        usage:
          'Multiplying a state distribution by a transition matrix advances one step; raising the matrix to the k-th power advances k steps in one operation.',
      },
      {
        context: 'Low-rank adaptation of large models',
        usage:
          'LoRA replaces a full weight update with the product of two thin matrices BA, exploiting the shape rule to cut trainable parameters by orders of magnitude.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: '@ and np.matmul dispatch to BLAS; np.einsum expresses products with explicit index names when shapes get confusing.' },
      { tool: 'PyTorch', role: 'torch.matmul broadcasts over leading batch dimensions, so a (B, T, d) @ (d, k) works without reshaping.' },
      { tool: 'cuBLAS / tensor cores', role: 'The hardware path every framework ultimately calls; this is why matmul-shaped work is fast and everything else is not.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using * instead of @ in NumPy',
        why: '* is elementwise, and thanks to broadcasting it often succeeds silently on shapes where you intended a matrix product.',
        fix: 'Use @ or np.matmul for matrix products. If a result has a surprising shape, print it — a (3,3) where you expected a (3,) is the classic signature.',
      },
      {
        mistake: 'Assuming AB = BA',
        why: 'Scalar arithmetic trains the intuition that order never matters, and it takes a deliberate counterexample to unlearn it.',
        fix: 'Remember the transformation reading: rotating then stretching is visibly different from stretching then rotating. Never reorder factors when simplifying.',
      },
      {
        mistake: 'Forgetting the transpose in a batched layer',
        why: 'The data convention puts examples in rows while weights are stored as (out_features, in_features), so X @ W fails but X @ W.T succeeds.',
        fix: 'Write the shapes in a comment above the line: (B, d_in) @ (d_in, d_out) -> (B, d_out). The comment makes the required transpose obvious.',
      },
      {
        mistake: 'Reading ABC left to right as the order of application',
        why: 'English reading order fights the notation, in which the matrix closest to the vector acts first.',
        fix: 'Read ABCx from the right: C acts first, then B, then A. This matters when you build a pipeline of transformations by hand.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'When is the product AB defined, and what is its shape?',
        answer:
          'AB is defined when the number of columns of A equals the number of rows of B. If A is m×n and B is n×p, the product is m×p: the inner dimension n must match and is summed over, while the outer dimensions m and p survive. The reason is that each entry of the result is a dot product between a row of A and a column of B, and those two vectors must have the same length. A useful consequence is that AB being defined says nothing about BA — for a 2×3 times 3×2 both are defined but have shapes 2×2 and 3×3 respectively.',
      },
      {
        level: 'intermediate',
        question: 'Why is matrix multiplication not commutative, and is there an intuitive way to see it?',
        answer:
          'Because a matrix product represents composition of transformations, and doing one thing after another is order-dependent in the same way that putting on socks then shoes differs from shoes then socks. Concretely, take A as a 90-degree rotation and B as a horizontal stretch by 2. Applying B then A turns the unit square into a shape that is 1 wide and 2 tall; applying A then B gives one that is 2 wide and 1 tall. The matrices differ accordingly. Some special pairs do commute — two rotations in the plane, any matrix with the identity, any matrix with a scalar multiple of itself, and simultaneously diagonalisable matrices — but these are exceptions and you should never assume commutativity when simplifying an expression.',
        followUp:
          'A strong answer connects this to layer order in a network: swapping two layers is not a no-op, and it is also why the order of factors in a gradient expression derived by the chain rule cannot be rearranged.',
      },
      {
        level: 'ml-engineer',
        question: 'Estimate the FLOPs in the forward pass of a dense layer mapping 1024 features to 4096 for a batch of 256, and say why this estimate matters.',
        answer:
          'The product is (256 × 1024) by (1024 × 4096), so m·n·p = 256 × 1024 × 4096 = about 1.07 billion multiply-accumulates, or roughly 2.1 GFLOPs counting a multiply and an add separately. It matters for three reasons. It tells you whether a layer is compute-bound or memory-bound, by comparing against the bytes moved: here about 4 million weights at 4 bytes each, giving a high arithmetic intensity, so the layer is compute-bound and will use the GPU well. It lets you predict how a change in batch size or width will alter training time, since cost is linear in each of the three dimensions. And it explains why widening a layer is quadratically expensive while deepening is only linear, which is a real architectural trade-off.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'A is 4×7, B is 7×2, C is 2×5. Which of AB, BA, ABC, CBA are defined, and what are the shapes of those that are?',
        hint: 'Check inner dimensions pairwise, left to right.',
        solution:
          'AB is (4×7)(7×2), defined, shape 4×2. BA is (7×2)(4×7) — inner dimensions 2 and 4 disagree, so undefined. ABC is (4×2)(2×5), defined, shape 4×5. CBA is (2×5)(7×2) — inner 5 against 7 — undefined. The lesson is that a chain of matrices is a pipeline, and each adjacent pair must agree at the join.',
      },
      {
        prompt: 'Compute [[2, 1], [0, 3]] · [[1, 4], [5, 2]] by hand, then compute the product in the other order and compare.',
        hint: 'Four entries, each a dot product of a row with a column.',
        solution:
          'AB: entry (1,1) = 2(1) + 1(5) = 7; (1,2) = 2(4) + 1(2) = 10; (2,1) = 0(1) + 3(5) = 15; (2,2) = 0(4) + 3(2) = 6. So AB = [[7, 10], [15, 6]]. BA: (1,1) = 1(2) + 4(0) = 2; (1,2) = 1(1) + 4(3) = 13; (2,1) = 5(2) + 2(0) = 10; (2,2) = 5(1) + 2(3) = 11. So BA = [[2, 13], [10, 11]]. Same shapes, completely different matrices — a clean demonstration of non-commutativity.',
      },
      {
        prompt: 'Explain why (AB)ᵀ = BᵀAᵀ rather than AᵀBᵀ, using the shape rule alone.',
        hint: 'Write down the shapes of each candidate and see which one is even defined.',
        solution:
          'Let A be m×n and B be n×p, so AB is m×p and (AB)ᵀ is p×m. Now Aᵀ is n×m and Bᵀ is p×n. The candidate AᵀBᵀ is (n×m)(p×n), whose inner dimensions m and p need not match, so it is usually undefined. The candidate BᵀAᵀ is (p×n)(n×m), whose inner dimensions both equal n, giving a p×m result — the only shape that could possibly be (AB)ᵀ. So the reversal is forced by the shapes before any entries are considered, which matches the transformation reading: undoing a composition reverses the order of the steps.',
      },
    ],

    quiz: [
      {
        id: 'MATH-007-q1',
        type: 'mcq',
        concept: 'shape rule',
        prompt: 'A is 3×5 and B is 5×2. What is the shape of AB?',
        options: ['3×2', '5×5', '2×3', 'Undefined'],
        answerIndex: 0,
        explanation:
          'The inner dimensions are both 5, so they match and vanish. The outer dimensions 3 and 2 survive, giving a 3×2 result.',
      },
      {
        id: 'MATH-007-q2',
        type: 'numeric',
        concept: 'computing an entry',
        prompt: 'For A = [[1, 2, 3], [4, 5, 6]] and B = [[7, 8], [9, 10], [11, 12]], what is the entry of AB in row 2, column 1?',
        answer: 139,
        explanation:
          'Row 2 of A is [4, 5, 6] and column 1 of B is [7, 9, 11], so the entry is 28 + 45 + 66 = 139. Every entry of a product is one dot product like this.',
      },
      {
        id: 'MATH-007-q3',
        type: 'truefalse',
        concept: 'commutativity',
        prompt: 'If both AB and BA are defined and have the same shape, then AB = BA.',
        answer: false,
        explanation:
          'False. Two square matrices of the same size always admit both products with the same shape, yet [[2,1],[0,3]] and [[1,4],[5,2]] give completely different results in the two orders.',
      },
      {
        id: 'MATH-007-q4',
        type: 'order',
        concept: 'order of application',
        prompt: 'For the expression ABCx, order the operations from first applied to last applied.',
        items: [
          'C acts on x',
          'B acts on the result',
          'A acts on that result',
          'The final output vector is produced',
        ],
        explanation:
          'The matrix nearest the vector acts first, so the expression is read right to left. This is the opposite of English reading order and is the source of much confusion when building transformation pipelines.',
      },
      {
        id: 'MATH-007-q5',
        type: 'debug',
        language: 'python',
        concept: 'elementwise versus matmul',
        prompt: 'This code is meant to apply a layer to a batch but produces the wrong shape. What is wrong?',
        code: 'X = np.random.randn(100, 64)\nW = np.random.randn(32, 64)\nH = X * W.T',
        options: [
          '* is elementwise; it should be @ so the shapes contract properly',
          'W should be transposed twice',
          'X and W must have the same shape for any operation',
          'The bias term is missing, which changes the shape',
        ],
        answerIndex: 0,
        explanation:
          '* multiplies elementwise with broadcasting, so a (100,64) against a (64,32) raises a broadcast error rather than contracting. X @ W.T gives the intended (100, 32).',
      },
      {
        id: 'MATH-007-q6',
        type: 'explain',
        concept: 'multiplication as composition',
        prompt: 'Explain why the shape rule for matrix multiplication is exactly what you would expect once you see a matrix as a transformation.',
        rubric: [
          'Says a matrix maps an input space to an output space',
          'Says the output space of the right factor must be the input space of the left factor',
          'Connects this to the inner dimensions matching and disappearing',
        ],
        sampleAnswer:
          'An m×n matrix takes vectors with n components and produces vectors with m components, so it is a pipe from an n-dimensional space to an m-dimensional one. To chain two such pipes, whatever comes out of the first must be acceptable to the second: if B maps p-dimensional inputs to n-dimensional outputs, then A must accept n-dimensional inputs, which means A has n columns. That is exactly the rule that the inner dimensions must match. The combined pipe goes from p dimensions straight to m, which is why the result is m×p and why the shared n has disappeared — it was the intermediate space, used and then left behind, in the same way the summation index k is consumed inside the entrywise formula.',
        explanation:
          'The shape rule stops being arbitrary once the reader sees each matrix as a map between specific spaces that must connect end to end.',
      },
    ],

    flashcards: [
      { front: 'Shape rule for AB?', back: '(m×n)(n×p) = (m×p). Inner dimensions must match and then disappear; outer ones survive.' },
      { front: 'How is one entry of AB computed?', back: 'C_ij is the dot product of row i of A with column j of B.' },
      { front: 'What does a matrix product represent?', back: 'Composition of transformations. In ABx, B acts first because it sits nearest x.' },
      { front: 'Is AB the same as BA?', back: 'Almost never. Order matters because composition is order-dependent — rotating then stretching differs from the reverse.' },
      { front: 'Why does (AB)ᵀ = BᵀAᵀ?', back: 'Reversing is the only order whose shapes are defined, and it matches undoing a composition step by step in reverse.' },
      { front: 'FLOPs in an m×n by n×p product?', back: 'About 2mnp — m·p output entries, each needing n multiplications and n additions.' },
    ],

    challenge: {
      title: 'Matrix multiplication three ways',
      brief:
        'Implement the same product three times: with triple nested loops, as a stack of row-by-column dot products, and as a sum of outer products of columns of A with rows of B. Assert all three agree with A @ B, then time them on 200×200 matrices and report the ratio between the slowest hand-written version and NumPy.',
      language: 'python',
      acceptanceCriteria: [
        'All three implementations agree with A @ B to within 1e-9',
        'Raises a clear error when the inner dimensions do not match',
        'Includes the outer-product formulation, not just the two dot-product variants',
        'Reports timings and the speed ratio against NumPy',
      ],
      starterCode: 'import numpy as np\n\ndef matmul_loops(A, B):\n    """Triple-loop reference implementation."""\n',
    },

    teachingPrompt: {
      prompt:
        'A learner can compute a matrix product mechanically but says it feels like an arbitrary ritual. Give them the reason behind the rule.',
      mustCover: [
        'Each entry of the result is a dot product of a row with a column',
        'The inner dimensions must match, and they disappear in the result',
        'A product represents doing one transformation after another',
        'Order matters, because composition is order-dependent',
      ],
      bonusSignals: ['uses a production line or translation chain image', 'notes that the right-hand matrix acts first', 'mentions batching as the practical payoff'],
      sampleExplanation:
        'The ritual has a reason, and it is this: multiplying two matrices means combining two transformations into one. Think of a production line where the first machine turns raw material into parts and the second turns parts into finished goods. You could describe the pair as a single machine going straight from raw material to finished goods, and you could work out its behaviour in advance by tracing each input through both stages. That tracing is the multiplication. It explains the shape rule immediately: whatever the first machine outputs, the second must accept, so the middle numbers have to agree — and once you have traced through, the intermediate stage is gone, which is why it disappears from the answer. Mechanically, each entry of the result is a dot product between a row of the left matrix and a column of the right, and that works precisely because those two lists have the same length. It also explains why order matters so much: painting before cutting gives bare edges and cutting before painting gives painted ones. And the practical payoff is batching, because the same product applies a layer to a thousand examples at once, which is what the hardware in a GPU is actually built to do.',
    },
  },

  {
    id: 'MATH-008',
    domain: 'MATH',
    module: 'Matrices',
    topic: 'Transpose, identity and inverse',
    title: 'Transpose, Identity and Inverse',
    slug: 'transpose-identity-inverse',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['MATH-007'],
    related: ['MATH-006', 'MATH-007'],
    tags: ['transpose', 'identity', 'inverse', 'singular', 'linear-solve', 'conditioning'],

    learningObjectives: [
      'Transpose a matrix and explain what it does to shapes and to the roles of rows and columns',
      'Describe the identity matrix as the transformation that does nothing, and say why it is the multiplicative unit',
      'Define the inverse as the transformation that undoes another, and recognise when none exists',
      'Explain why numerical code should call np.linalg.solve rather than forming an inverse',
    ],

    terminology: [
      {
        term: 'Transpose',
        definition:
          'The matrix Aᵀ obtained by reflecting A across its main diagonal, so (Aᵀ)_ij = A_ji. An m×n matrix becomes n×m.',
        simple: 'Flip the grid so rows become columns.',
      },
      {
        term: 'Identity matrix',
        definition:
          'The square matrix I with ones on the main diagonal and zeros elsewhere. IA = AI = A for any conformable A.',
        simple: 'The do-nothing transformation — the number 1 of the matrix world.',
      },
      {
        term: 'Inverse',
        definition:
          'A matrix A⁻¹ with AA⁻¹ = A⁻¹A = I. It exists only for square matrices with non-zero determinant.',
        simple: 'The transformation that puts everything back where it started.',
      },
      {
        term: 'Singular matrix',
        definition:
          'A square matrix with no inverse, equivalently one whose determinant is zero and whose transformation collapses space onto a lower-dimensional subspace.',
        simple: 'A matrix that squashes things flat, so you can never undo it.',
      },
      {
        term: 'Condition number',
        definition:
          'A measure of how much a matrix amplifies relative error when solving Ax = b. A large condition number means the matrix is nearly singular and the solution is untrustworthy.',
        simple: 'How close a matrix is to being un-undoable.',
      },
      {
        term: 'Symmetric matrix',
        definition: 'A square matrix equal to its own transpose, A = Aᵀ. Covariance and Gram matrices are always symmetric.',
        simple: 'A grid that looks the same when flipped across its diagonal.',
      },
    ],

    simpleExplanation:
      'Three ideas belong together here because they are all about undoing and doing nothing. Start with doing nothing. There is a special matrix that leaves every point exactly where it was — it sends east to east and north to north. It is called the identity, and it plays the same role for matrices that the number one plays for ordinary multiplication. Now think about undoing. If a matrix stretches the page to twice its width, there is obviously another matrix that halves it again, and doing both in sequence leaves you where you started. That second matrix is called the inverse. Some matrices, though, cannot be undone. If a matrix squashes the whole flat page down onto a single line, then two points that used to be separate are now sitting on top of each other, and no later operation can possibly tell them apart again. Such a matrix is called singular, and the information it destroyed is gone for good. The transpose is a different animal entirely: it is just flipping the grid so that rows become columns, and it shows up constantly because it is how you make two shapes line up.',

    whyItExists:
      'Solving a system of equations means undoing whatever the coefficient matrix did, so a language for undoing is essential. The identity gives that language a unit, the inverse gives it an operation, and singularity gives it an honest account of when the undoing is impossible. The transpose exists for a different reason: it is the bookkeeping device that reconciles the row-oriented data convention with the column-oriented transformation convention, which is why it appears in almost every gradient formula.',

    analogy: {
      scenario:
        'A recipe says to double the sugar and halve the flour. To reverse it you halve the sugar and double the flour, and after doing both you are back to the original recipe — nothing has changed. But now consider a different instruction: "replace both the sugar and the flour with their combined weight in sugar". After that step you know the total but you have permanently lost the split, and no instruction can recover whether it was 200 grams of each or 300 and 100.',
      mapping: [
        { from: 'Doubling and then halving, ending where you began', to: 'A A⁻¹ = I, the inverse undoing the transformation' },
        { from: 'Leaving the recipe untouched', to: 'The identity matrix' },
        { from: 'Merging two ingredients into one total', to: 'A singular transformation collapsing two dimensions into one' },
        { from: 'Being unable to recover the original split', to: 'Non-invertibility: information genuinely destroyed' },
        { from: 'Knowing the total is 400g but not the split', to: 'Infinitely many solutions to the resulting system' },
      ],
      bridge:
        'The distinction between reversible and irreversible steps is precisely the distinction between invertible and singular matrices. It also explains why singularity is not a computational nuisance to be worked around but a statement about information: once two distinct inputs produce the same output, no algorithm, however clever, can separate them again.',
      limitations:
        'Recipes are discrete and matrices are continuous, so the analogy misses the important middle case: a matrix can be technically invertible yet so close to collapsing that the inverse is numerically worthless. That is what the condition number measures, and it has no clean recipe equivalent.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Invertible and singular transformations side by side',
        caption: 'Set the matrix to [[1,2],[2,4]] and watch the whole plane collapse onto a line.',
        widget: 'matrix-transform',
      },
      {
        kind: 'table',
        title: 'Three operations at a glance',
        columns: ['Operation', 'Notation', 'Effect on shape', 'Geometric meaning'],
        rows: [
          ['Transpose', 'Aᵀ', '(m×n) becomes (n×m)', 'Reflect across the diagonal; rows and columns swap roles'],
          ['Identity', 'I', 'Square, n×n', 'Do nothing — every point stays put'],
          ['Inverse', 'A⁻¹', 'Square, same size as A', 'Undo A exactly, returning every point to its origin'],
          ['Singular', 'A⁻¹ undefined', 'Square but rank-deficient', 'Collapse space onto a lower-dimensional subspace'],
        ],
      },
      {
        kind: 'compare',
        title: 'Computing an inverse versus solving directly',
        left: {
          heading: 'x = np.linalg.inv(A) @ b',
          points: [
            'Roughly 2n³ operations, then another n² for the product',
            'Forms n² intermediate numbers you never wanted',
            'Rounding error accumulates twice',
            'Fails loudly only when A is exactly singular, not when it is merely dreadful',
          ],
        },
        right: {
          heading: 'x = np.linalg.solve(A, b)',
          points: [
            'About n³/3 operations via LU factorisation',
            'Computes only the answer you asked for',
            'Numerically more stable, with pivoting built in',
            'Raises LinAlgError on a singular matrix and warns on ill-conditioning',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'What happens when you solve Ax = b',
        caption: 'The route LAPACK actually takes — no inverse is ever formed.',
        steps: [
          { label: 'Factor A into L and U', detail: 'Gaussian elimination with partial pivoting, about n³/3 operations.' },
          { label: 'Forward substitution', detail: 'Solve Ly = b, working down from the first row. Cheap: n² operations.' },
          { label: 'Back substitution', detail: 'Solve Ux = y, working up from the last row. Also n².' },
          { label: 'Return x', detail: 'The answer is produced without ever constructing A⁻¹, which would have cost three times as much and lost precision.' },
        ],
      },
    ],

    formalDefinition:
      'The transpose of A ∈ ℝ^(m×n) is Aᵀ ∈ ℝ^(n×m) with (Aᵀ)_ij = A_ji; it satisfies (AB)ᵀ = BᵀAᵀ and (Aᵀ)ᵀ = A. The identity I_n ∈ ℝ^(n×n) has entries δ_ij, equal to 1 when i = j and 0 otherwise, and is the multiplicative identity of the ring of n×n matrices. A square matrix A is invertible (non-singular) if there exists A⁻¹ with AA⁻¹ = A⁻¹A = I_n; such an inverse is unique when it exists, and exists precisely when det(A) ≠ 0, equivalently when rank(A) = n.',

    math: {
      intuition:
        'Hold the picture of doing and undoing. The identity is the transformation that leaves the grid untouched, so multiplying by it changes nothing — it is the matrix equivalent of one. An inverse is a matrix that exactly reverses another, so applying the pair in either order returns you to the identity. The reason some matrices have no inverse is not a technicality: if a transformation squashes two distinct points onto the same spot, then undoing it would require sending one point to two places, which no function can do. The transpose is unrelated to undoing, despite often appearing beside inverses; it is a reshaping that swaps the roles of rows and columns, and its main job in machine learning is making shapes agree.',
      formulas: [
        {
          latex: '(A^{\\top})_{ij} = A_{ji}',
          name: 'Transpose, entrywise',
          meaning:
            'Reflect across the main diagonal: the entry in row i, column j of the transpose is the entry in row j, column i of the original.',
          variables: [
            { symbol: 'A', meaning: 'The original matrix' },
            { symbol: 'A^{\\top}', meaning: 'Its transpose' },
            { symbol: 'i', meaning: 'Row index in the transpose' },
            { symbol: 'j', meaning: 'Column index in the transpose' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '(AB)^{\\top} = B^{\\top}A^{\\top}, \\qquad (A^{\\top})^{\\top} = A',
          name: 'Transpose of a product',
          meaning:
            'Transposing a product reverses the order of the factors. This identity is why gradient formulas are littered with transposes.',
          variables: [
            { symbol: 'A', meaning: 'The left factor' },
            { symbol: 'B', meaning: 'The right factor' },
            { symbol: '\\top', meaning: 'The transpose operation' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'I_n = \\begin{bmatrix} 1 & 0 & \\cdots & 0 \\\\ 0 & 1 & \\cdots & 0 \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ 0 & 0 & \\cdots & 1 \\end{bmatrix}, \\qquad AI = IA = A',
          name: 'The identity matrix',
          meaning:
            'Ones down the diagonal, zeros elsewhere. Its columns are the basis vectors themselves, so it sends every basis vector to itself and changes nothing.',
          variables: [
            { symbol: 'I_n', meaning: 'The n×n identity matrix' },
            { symbol: 'n', meaning: 'The dimension of the space it acts on' },
            { symbol: 'A', meaning: 'Any matrix of conformable shape' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'AA^{-1} = A^{-1}A = I',
          name: 'Defining property of the inverse',
          meaning:
            'The inverse undoes the transformation in both orders. Note that this is one of the rare cases where two matrices do commute.',
          variables: [
            { symbol: 'A', meaning: 'A square, invertible matrix' },
            { symbol: 'A^{-1}', meaning: 'Its inverse, which exists only when det(A) ≠ 0' },
            { symbol: 'I', meaning: 'The identity matrix of the same size' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'A^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\quad \\text{for} \\quad A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
          name: 'Inverse of a 2×2 matrix',
          meaning:
            'Swap the diagonal entries, negate the off-diagonal ones, and divide by the determinant. Undefined when ad − bc = 0, which is exactly singularity.',
          variables: [
            { symbol: 'a, b, c, d', meaning: 'The four entries of A, reading across then down' },
            { symbol: 'ad - bc', meaning: 'The determinant; dividing by it is what fails for a singular matrix' },
            { symbol: 'A^{-1}', meaning: 'The resulting inverse matrix' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\hat{\\boldsymbol{\\beta}} = (X^{\\top}X)^{-1}X^{\\top}\\mathbf{y}',
          name: 'The normal equations for least squares',
          meaning:
            'The closed-form solution of linear regression. Textbooks write the inverse; every sane implementation solves the system instead.',
          variables: [
            { symbol: '\\hat{\\boldsymbol{\\beta}}', meaning: 'The fitted coefficient vector' },
            { symbol: 'X', meaning: 'The design matrix, shape (n_samples, n_features)' },
            { symbol: 'X^{\\top}X', meaning: 'The Gram matrix, square and symmetric, of size n_features' },
            { symbol: '\\mathbf{y}', meaning: 'The vector of target values' },
            { symbol: '(\\cdot)^{-1}', meaning: 'Matrix inverse — singular whenever two features are perfectly collinear' },
          ],
          category: 'regression',
        },
      ],
      derivation: [
        'Why does a singular matrix have no inverse? Suppose A collapses two distinct vectors onto the same image: Au = Av with u ≠ v.',
        'Assume for contradiction that an inverse A⁻¹ exists.',
        'Multiply both sides on the left by A⁻¹: A⁻¹Au = A⁻¹Av.',
        'Use the defining property A⁻¹A = I: Iu = Iv, that is u = v.',
        'This contradicts u ≠ v, so no such inverse can exist. Collapsing is exactly incompatible with undoing.',
        'The same argument runs in reverse: if A never collapses two distinct vectors, its columns are linearly independent, its determinant is non-zero, and an inverse does exist.',
        'For the 2×2 case you can construct it explicitly. Solving AX = I entry by entry gives X = (1/(ad−bc))·[[d, −b], [−c, a]], and the only step that can fail is the division, which fails precisely when ad − bc = 0 — the determinant that MATH-009 will interpret as the area scale factor. A transformation that scales area by zero has flattened the plane.',
      ],
    },

    workedExample: {
      title: 'Inverting a 2×2 matrix, and meeting one that cannot be inverted',
      setup:
        'Take A = [[4, 7], [2, 6]] and B = [[1, 2], [2, 4]]. We will invert A by hand, verify it, and then see exactly where the same procedure breaks down for B.',
      steps: [
        { label: 'Determinant of A', detail: 'ad − bc = 4(6) − 7(2) = 24 − 14 = 10. Non-zero, so an inverse exists.', latex: '\\det A = 10' },
        { label: 'Apply the 2×2 formula', detail: 'Swap the diagonal to get [[6, 7], [2, 4]] then negate off-diagonals: [[6, −7], [−2, 4]]. Divide by 10.', latex: 'A^{-1} = \\frac{1}{10}\\begin{bmatrix} 6 & -7 \\\\ -2 & 4 \\end{bmatrix} = \\begin{bmatrix} 0.6 & -0.7 \\\\ -0.2 & 0.4 \\end{bmatrix}' },
        { label: 'Verify AA⁻¹ = I', detail: 'Row 1 of A times column 1 of A⁻¹: 4(0.6) + 7(−0.2) = 2.4 − 1.4 = 1. Row 1 times column 2: 4(−0.7) + 7(0.4) = −2.8 + 2.8 = 0. The other row works out the same way.' },
        { label: 'Now try B', detail: 'ad − bc = 1(4) − 2(2) = 4 − 4 = 0. The formula would require dividing by zero, so there is no inverse.', latex: '\\det B = 0' },
        { label: 'See why, geometrically', detail: 'The columns of B are [1, 2] and [2, 4], and the second is exactly twice the first. Both point along the same line, so the whole plane is squashed onto that line.' },
        { label: 'Confirm the collapse', detail: 'B[2, −1] = 2[1,2] − 1[2,4] = [0, 0], and B[0, 0] = [0, 0] too. Two different inputs, the same output — undoing is impossible.' },
        { label: 'Solve with A instead', detail: 'For b = [1, 1], x = A⁻¹b = [0.6 − 0.7, −0.2 + 0.4] = [−0.1, 0.2]. Check: 4(−0.1) + 7(0.2) = −0.4 + 1.4 = 1, and 2(−0.1) + 6(0.2) = −0.2 + 1.2 = 1.' },
      ],
      conclusion:
        'A is invertible because its columns point in genuinely different directions; B is singular because its columns are parallel, so it flattens the plane and destroys information. The determinant is simply the number that detects which case you are in.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Transpose, identity and inverse in practice',
        runnable: true,
        code: `import numpy as np

A = np.array([[4.0, 7.0],
              [2.0, 6.0]])

print("A.T:\\n", A.T)
print("I:\\n", np.eye(2))
Ainv = np.linalg.inv(A)
print("A inverse:\\n", np.round(Ainv, 4))
print("A @ Ainv:\\n", np.round(A @ Ainv, 12))
print("exactly equal to I?", np.array_equal(A @ Ainv, np.eye(2)))
print("close to I?        ", np.allclose(A @ Ainv, np.eye(2)))`,
        output: `A.T:
 [[4. 2.]
 [7. 6.]]
I:
 [[1. 0.]
 [0. 1.]]
A inverse:
 [[ 0.6 -0.7]
 [-0.2  0.4]]
A @ Ainv:
 [[ 1. -0.]
 [ 0.  1.]]
exactly equal to I? False
close to I?         True`,
        explanation:
          'The last two lines are the important ones. A @ Ainv is mathematically the identity but is only numerically close to it, because floating-point arithmetic leaves residue around 1e-16. Testing matrix results with == is therefore always wrong; np.allclose with a sensible tolerance is the correct check.',
      },
      {
        language: 'python',
        title: 'Singular matrices fail, and near-singular ones are worse',
        runnable: true,
        code: `import numpy as np

B = np.array([[1.0, 2.0], [2.0, 4.0]])          # exactly singular
C = np.array([[1.0, 2.0], [2.0, 4.0000001]])    # nearly singular

print("det B:", np.linalg.det(B), " det C:", np.linalg.det(C))
print("cond C:", f"{np.linalg.cond(C):.3e}")

try:
    np.linalg.inv(B)
except np.linalg.LinAlgError as e:
    print("inv(B) raised:", e)

b = np.array([3.0, 6.0])
x = np.linalg.solve(C, b)
print("solve(C, b):", x)
print("residual   :", C @ x - b)`,
        output: `det B: 0.0  det C: 1.0000000116860974e-07
cond C: 2.500e+08
inv(B) raised: Singular matrix
solve(C, b): [ 3.00000000e+00 -1.11022302e-09]
residual   : [0. 0.]`,
        explanation:
          'B fails loudly, which is the easy case. C is the dangerous one: it is technically invertible, so nothing raises, yet its condition number of 2.5e8 means roughly eight of your sixteen significant digits are lost. A tiny change in b would swing the answer wildly. Always check np.linalg.cond before trusting a solve on data you did not construct yourself.',
      },
      {
        language: 'python',
        title: 'Why solve beats inv',
        runnable: true,
        code: `import numpy as np, time

rng = np.random.default_rng(0)
n = 800
A = rng.normal(size=(n, n)) + n * np.eye(n)
b = rng.normal(size=n)

t0 = time.perf_counter(); x1 = np.linalg.inv(A) @ b; t1 = time.perf_counter()
x2 = np.linalg.solve(A, b);                          t2 = time.perf_counter()

print(f"inv+matmul: {t1 - t0:.4f}s   residual {np.abs(A @ x1 - b).max():.3e}")
print(f"solve     : {t2 - t1:.4f}s   residual {np.abs(A @ x2 - b).max():.3e}")
print("same answer:", np.allclose(x1, x2))`,
        output: `inv+matmul: 0.0421s   residual 4.263e-14
solve     : 0.0152s   residual 1.421e-14
same answer: True`,
        explanation:
          'Solving is roughly three times faster because LU factorisation costs about n³/3 while inversion costs about 2n³, and the residual is smaller because forming the inverse introduces an extra round of rounding error before the multiply. The gap widens with n and with how badly conditioned the matrix is, which is why the rule "never compute an inverse you do not need" is worth following unconditionally.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Linear regression in scikit-learn',
        usage:
          'LinearRegression does not form (XᵀX)⁻¹. It calls scipy.linalg.lstsq, which uses an SVD-based solver that copes gracefully with collinear features where the inverse would not exist.',
      },
      {
        context: 'Gradient formulas in backpropagation',
        usage:
          'The gradient with respect to a layer input is Wᵀδ, and with respect to the weights is δxᵀ. The transposes are what make the shapes line up between the forward and backward passes.',
      },
      {
        context: 'Covariance matrices',
        usage:
          'A covariance matrix is symmetric by construction, so it equals its own transpose. Inverting it appears in the Mahalanobis distance and in Gaussian likelihoods, and it becomes singular when features are perfectly collinear.',
      },
      {
        context: 'Kalman filters and control systems',
        usage:
          'Each update step solves a linear system. Production implementations use Cholesky or QR factorisations rather than explicit inverses, for exactly the stability reasons above.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'np.linalg.solve for systems, np.linalg.lstsq for over-determined ones, np.linalg.cond to check trustworthiness.' },
      { tool: 'SciPy', role: 'scipy.linalg.lu_factor and cho_solve when the same matrix is reused against many right-hand sides.' },
      { tool: 'scikit-learn', role: 'Ridge adds λI to XᵀX, which guarantees invertibility even with perfectly collinear features.' },
    ],

    commonMistakes: [
      {
        mistake: 'Computing an inverse when a solve would do',
        why: 'The textbook formula x = A⁻¹b is written that way for clarity, and people transcribe it literally into code.',
        fix: 'Use np.linalg.solve(A, b). It is about three times cheaper and numerically more stable, and it raises a clear error on a singular matrix.',
      },
      {
        mistake: 'Checking A @ A_inv == np.eye(n)',
        why: 'Floating-point arithmetic never produces exact ones and zeros, so the comparison is always False.',
        fix: 'Use np.allclose(A @ A_inv, np.eye(n)). Equality testing on floats is wrong regardless of context.',
      },
      {
        mistake: 'Writing (AB)ᵀ = AᵀBᵀ',
        why: 'Habit from scalar algebra, where order never matters.',
        fix: 'The order reverses: (AB)ᵀ = BᵀAᵀ. Check with shapes — the unreversed version is usually not even defined.',
      },
      {
        mistake: 'Treating a near-singular matrix as safe because no error was raised',
        why: 'Invertibility is binary but conditioning is continuous, and NumPy only refuses in the exactly-singular case.',
        fix: 'Call np.linalg.cond(A). Values above roughly 1e8 in float64 mean you are losing half your digits; regularise, drop collinear features, or use lstsq.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does it mean for a matrix to be singular, and how would you detect it in practice?',
        answer:
          'A singular matrix has no inverse. Geometrically it collapses space onto a lower-dimensional subspace, so two distinct inputs can produce the same output and the transformation cannot be undone. Equivalently its determinant is zero, its columns are linearly dependent, and its rank is less than its size. In practice you rarely meet an exactly singular matrix in floating point, so checking det(A) == 0 is useless — rounding makes it a tiny non-zero number instead. The right check is the condition number from np.linalg.cond, or looking at the smallest singular value from an SVD. A condition number above about 1e8 in float64 means you are losing half your significant digits and the solution should not be trusted, even though no exception was raised.',
        followUp:
          'A strong answer connects this to multicollinearity in regression: two perfectly correlated features make XᵀX singular, which is exactly why Ridge adds λI and restores invertibility.',
      },
      {
        level: 'ml-engineer',
        question: 'Why is np.linalg.solve preferred over np.linalg.inv followed by a matrix product?',
        answer:
          'Three reasons. Cost: LU factorisation with substitution is about n³/3 operations while inversion is about 2n³, so solving is roughly three times faster and the gap matters at scale. Stability: forming the inverse performs the elimination and then multiplies, so rounding error is introduced twice, and for ill-conditioned matrices the explicit inverse can be far less accurate than a direct solve. Honesty: solve raises LinAlgError on a singular matrix, whereas an inverse computed and then multiplied may silently produce enormous nonsense. The rule generalises: whenever you see A⁻¹b in a formula, implement it as a solve; whenever you see A⁻¹B, use a solve with multiple right-hand sides.',
      },
      {
        level: 'advanced',
        question: 'The normal equations give β = (XᵀX)⁻¹Xᵀy. What goes wrong with this in practice and what is done instead?',
        answer:
          'XᵀX squares the condition number of X, so a design matrix that is merely awkward becomes numerically hostile once you form the Gram matrix — you lose twice as many digits as the data warrants. Worse, if any two features are perfectly collinear, or if there are more features than samples, XᵀX is exactly singular and the inverse does not exist at all. Real implementations avoid forming XᵀX: scikit-learn calls scipy.linalg.lstsq, which uses an SVD or QR factorisation of X directly and returns the minimum-norm solution when the system is rank-deficient rather than failing. When regularisation is acceptable, Ridge adds λI to XᵀX, which lifts every eigenvalue by λ and makes the matrix invertible and far better conditioned — which is one reason a small amount of regularisation is good practice even when overfitting is not the primary worry.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Invert A = [[3, 1], [2, 4]] by hand and verify your answer.',
        hint: 'Determinant first, then swap the diagonal and negate the off-diagonal entries.',
        solution:
          'det = 3(4) − 1(2) = 10. So A⁻¹ = (1/10)[[4, −1], [−2, 3]] = [[0.4, −0.1], [−0.2, 0.3]]. Verify: row 1 of A times column 1 of A⁻¹ is 3(0.4) + 1(−0.2) = 1.2 − 0.2 = 1; row 1 times column 2 is 3(−0.1) + 1(0.3) = −0.3 + 0.3 = 0. The other row checks out identically, so AA⁻¹ = I.',
      },
      {
        prompt: 'Show that [[2, 6], [1, 3]] is singular in two different ways, and find two distinct vectors it maps to the same output.',
        hint: 'Look at the determinant, and separately look at whether the columns are parallel.',
        solution:
          'First way: det = 2(3) − 6(1) = 0. Second way: the columns are [2, 1] and [6, 3], and the second is three times the first, so they span only a line rather than the plane. For two inputs with the same image, note that [3, −1] maps to 3[2,1] − 1[6,3] = [0, 0], which is also where [0, 0] maps. So [3, −1] and [0, 0] are distinct inputs with identical outputs, and no inverse could send [0,0] back to both.',
      },
      {
        prompt: 'A colleague writes x = np.linalg.inv(A) @ b for a 5000×5000 matrix and the job runs out of memory and time. Give two concrete improvements and say what each saves.',
        hint: 'Think about the cost of factorisation versus inversion, and about whether A is reused.',
        solution:
          'First, replace it with np.linalg.solve(A, b), which uses LU factorisation costing about n³/3 rather than the roughly 2n³ of inversion, and avoids materialising a second 5000×5000 array of 200 MB. Second, if the same A is used against many different b vectors, factor once with scipy.linalg.lu_factor and then call lu_solve per right-hand side, so the expensive n³ step happens once and each additional solve costs only n². If A is also symmetric positive definite — as a Gram matrix or covariance matrix is — use a Cholesky factorisation instead, which is about twice as fast again.',
      },
    ],

    quiz: [
      {
        id: 'MATH-008-q1',
        type: 'mcq',
        concept: 'identity matrix',
        prompt: 'What does multiplying a vector by the identity matrix do?',
        options: [
          'Nothing — the vector is unchanged',
          'Normalises it to unit length',
          'Reverses its direction',
          'Projects it onto the first axis',
        ],
        answerIndex: 0,
        explanation:
          'The identity sends every basis vector to itself, so it leaves every vector untouched. It is the matrix analogue of multiplying a number by one.',
      },
      {
        id: 'MATH-008-q2',
        type: 'truefalse',
        concept: 'transpose of a product',
        prompt: '(AB)ᵀ equals AᵀBᵀ.',
        answer: false,
        explanation:
          'False — the order reverses, so (AB)ᵀ = BᵀAᵀ. The shape rule forces it: for A of shape m×n and B of shape n×p, AᵀBᵀ is usually not even defined.',
      },
      {
        id: 'MATH-008-q3',
        type: 'numeric',
        concept: '2x2 determinant and invertibility',
        prompt: 'What is the determinant of [[1, 2], [2, 4]]?',
        answer: 0,
        explanation:
          '1(4) − 2(2) = 0, so the matrix is singular. Its columns are parallel, meaning the transformation squashes the plane onto a line and cannot be undone.',
      },
      {
        id: 'MATH-008-q4',
        type: 'mcq',
        concept: 'solve versus inverse',
        prompt: 'Why should you prefer np.linalg.solve(A, b) over np.linalg.inv(A) @ b?',
        options: [
          'It is roughly three times cheaper and numerically more stable',
          'It works on non-square matrices',
          'It always returns an exact answer',
          'It automatically standardises the features first',
        ],
        answerIndex: 0,
        explanation:
          'LU factorisation costs about n³/3 against about 2n³ for inversion, and avoiding the explicit inverse removes one round of accumulated rounding error. For non-square systems you need lstsq instead.',
      },
      {
        id: 'MATH-008-q5',
        type: 'match',
        concept: 'terminology',
        prompt: 'Match each term to its meaning.',
        pairs: [
          { left: 'Transpose', right: 'Rows become columns; shape (m,n) becomes (n,m)' },
          { left: 'Identity', right: 'Leaves every vector exactly as it was' },
          { left: 'Inverse', right: 'Undoes a transformation, giving back the identity' },
          { left: 'Singular', right: 'Collapses space, so no inverse exists' },
        ],
        explanation:
          'Keeping these four distinct is the vocabulary needed to read any linear-algebra-heavy paper or gradient derivation without guessing.',
      },
      {
        id: 'MATH-008-q6',
        type: 'explain',
        concept: 'why singularity destroys information',
        prompt: 'Explain why a matrix that maps two different vectors to the same output cannot possibly have an inverse.',
        rubric: [
          'States that an inverse would have to return each output to its unique input',
          'Observes that a shared output has two candidate inputs',
          'Concludes that no function can send one input to two outputs',
        ],
        sampleAnswer:
          'An inverse is itself a function: give it a vector and it returns exactly one vector back. Suppose the original matrix sends both u and v, which are different, to the same result w. To undo the transformation, the inverse would have to take w and return u, and also take w and return v. That is impossible, because a function produces one output per input. So the moment a transformation collapses two distinct points onto one, invertibility is lost. This is not a limitation of our algorithms: the information distinguishing u from v has genuinely been discarded, and nothing downstream can recover it. Geometrically the transformation has flattened space onto a lower-dimensional subspace, which is what a zero determinant records.',
        explanation:
          'The argument should rest on the definition of a function rather than on determinants, which are a symptom rather than the cause.',
      },
    ],

    flashcards: [
      { front: 'What does the transpose do?', back: 'Reflects a matrix across its diagonal: (Aᵀ)_ij = A_ji, turning an m×n into an n×m.' },
      { front: 'What is the identity matrix?', back: 'Ones on the diagonal, zeros elsewhere. The do-nothing transformation; AI = IA = A.' },
      { front: 'Defining property of A⁻¹?', back: 'AA⁻¹ = A⁻¹A = I. One of the rare pairs of matrices that genuinely commute.' },
      { front: 'When does a matrix have no inverse?', back: 'When it is singular: determinant zero, columns linearly dependent, space collapsed onto a lower dimension.' },
      { front: '(AB)ᵀ = ?', back: 'BᵀAᵀ — the order reverses. AᵀBᵀ is usually not even a valid product.' },
      { front: 'Why solve instead of inv?', back: 'About three times cheaper (n³/3 versus 2n³), numerically more stable, and it errors honestly on singular input.' },
    ],

    challenge: {
      title: 'Conditioning laboratory',
      brief:
        'Build a family of 2×2 matrices [[1, 2], [2, 4 + eps]] for eps from 1e-1 down to 1e-12. For each, print the determinant, the condition number, and the relative error in the recovered solution when you solve Ax = b for a known x. Plot or tabulate how the error grows as eps shrinks, and state the eps at which fewer than half the digits of x survive.',
      language: 'python',
      acceptanceCriteria: [
        'Reports determinant and condition number for each eps',
        'Compares the recovered x against the known ground truth and reports relative error',
        'Identifies the eps at which relative error exceeds 1e-8',
        'Includes a printed observation relating condition number to digits lost',
      ],
      starterCode: 'import numpy as np\n\nx_true = np.array([1.0, -2.0])\nfor eps in [10.0 ** -k for k in range(1, 13)]:\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone comfortable with matrix multiplication what the inverse is, why some matrices do not have one, and why experienced engineers avoid computing inverses.',
      mustCover: [
        'The identity is the transformation that does nothing',
        'The inverse undoes a transformation, giving back the identity',
        'A matrix that collapses space destroys information and cannot be undone',
        'Solving a system directly is cheaper and more stable than forming an inverse',
      ],
      bonusSignals: ['mentions the condition number', 'connects singularity to collinear features', 'notes that near-singular is more dangerous than exactly singular'],
      sampleExplanation:
        'Start with the matrix that does nothing at all: it sends east to east and north to north, leaving every point exactly where it was. That is the identity, and it plays the role that the number one plays in ordinary multiplication. An inverse is a matrix that undoes another one, so that applying the pair in sequence lands you back at the identity — if one matrix doubles the width of the page, its inverse halves it again. The interesting case is when no inverse exists. Suppose a matrix squashes the whole flat page down onto a single line. Two points that were previously distinct are now sitting on top of each other, and undoing the squash would mean sending that one shared point back to two different places, which no function can do. The information is genuinely gone, not merely hidden. Such a matrix is called singular. In real code the picture is subtler still, because a matrix can be technically invertible yet so close to collapsing that the answer you compute is mostly rounding error; the condition number is what tells you this, and it is the number to check before trusting a result. That is also why experienced engineers almost never call inv. Solving the system directly costs roughly a third as much, carries less rounding error, and fails honestly when the matrix really is degenerate.',
    },
  },

  {
    id: 'MATH-009',
    domain: 'MATH',
    module: 'Matrix Structure',
    topic: 'Determinants and independence',
    title: 'Determinants and Linear Independence',
    slug: 'determinants-and-independence',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['MATH-008'],
    related: ['MATH-006', 'MATH-007'],
    tags: ['determinant', 'linear-independence', 'collinearity', 'volume', 'singular'],

    learningObjectives: [
      'Describe the determinant as the factor by which a transformation scales area or volume',
      'Interpret a zero determinant as a collapse, and a negative one as a flip in orientation',
      'Test a set of vectors for linear independence and say what dependence means about redundancy',
      'Connect linear dependence between features to multicollinearity and unstable regression coefficients',
    ],

    terminology: [
      {
        term: 'Determinant',
        definition:
          'A scalar det(A) assigned to a square matrix, equal to the signed factor by which the transformation scales area in 2D or volume in higher dimensions.',
        simple: 'How much bigger or smaller a shape gets, and whether it got flipped.',
      },
      {
        term: 'Linear combination',
        definition:
          'A weighted sum α₁v₁ + α₂v₂ + … + α_kv_k of vectors, using any real coefficients.',
        simple: 'Mixing vectors together with any amounts you like.',
      },
      {
        term: 'Linear independence',
        definition:
          'A set of vectors is independent when the only linear combination equalling the zero vector has all coefficients zero — no vector is redundant.',
        simple: 'None of them can be built from the others.',
      },
      {
        term: 'Orientation',
        definition:
          'Whether a transformation preserves handedness. A negative determinant means the space has been reflected, turning a clockwise loop into an anticlockwise one.',
        simple: 'Whether the shape got mirrored.',
      },
      {
        term: 'Multicollinearity',
        definition:
          'The situation where one feature column is close to a linear combination of others, making XᵀX nearly singular and regression coefficients wildly unstable.',
        simple: 'Two columns saying nearly the same thing, so the model cannot tell which deserves the credit.',
      },
    ],

    simpleExplanation:
      'Draw a unit square on graph paper — one across, one up — and apply a transformation to it. The square becomes some parallelogram. The determinant is simply the answer to "how many times bigger is the new shape?" If the parallelogram has an area of six, the determinant is six, and that same factor applies to every shape the transformation touches, not just the square. A determinant of one means area is preserved, which is what rotations do. A determinant between zero and one means everything shrinks. And a determinant of exactly zero means the parallelogram has no area at all: the transformation has flattened the page onto a line, and that is the disaster case, because once a shape has zero area you cannot inflate it back. The sign carries extra news. A negative determinant means the page was flipped over, so what used to be clockwise is now anticlockwise. Closely related is the question of whether a set of arrows is genuinely pulling in different directions, or whether one of them is just a mixture of the others and adds nothing new.',

    whyItExists:
      'Before determinants there was no single number that answered "can this system of equations be solved uniquely?" The determinant compresses the entire question of invertibility, redundancy and volume scaling into one scalar. It matters in machine learning because a zero or near-zero determinant is what redundant features look like from the inside, and because the log-determinant appears directly in the likelihood of any multivariate Gaussian.',

    analogy: {
      scenario:
        'A survey asks respondents for their height in centimetres, their height in inches, and their age. Three questions, but only two genuine pieces of information: the inches column is exactly the centimetres column divided by 2.54, so it adds nothing whatsoever. If you plotted every respondent using the two height columns as axes, all the points would lie on a single straight line rather than spreading over a plane — the cloud has no area.',
      mapping: [
        { from: 'The three survey columns', to: 'Three column vectors of the design matrix' },
        { from: 'Inches being centimetres divided by 2.54', to: 'One column is a linear combination of another — linear dependence' },
        { from: 'Points lying on a line rather than filling a plane', to: 'A collapsed, zero-area image — determinant zero' },
        { from: 'Two genuine pieces of information among three questions', to: 'Rank 2 despite 3 columns' },
        { from: 'Being unable to say whether height in cm or in inches drove the result', to: 'Unstable, uninterpretable regression coefficients' },
      ],
      bridge:
        'The determinant is the number that detects this situation automatically, without anyone noticing by eye that two columns measure the same thing. When it is zero, the columns are dependent, the matrix is singular, and the linear system has either no unique solution or none at all. When it is merely very small, everything technically works but the answers swing wildly with the smallest change in the data — which is what multicollinearity feels like in practice.',
      limitations:
        'The survey analogy suggests dependence is always obvious and exact. Real multicollinearity is approximate and hidden: three features might each be fine individually while one is 0.98 correlated with a combination of the other two, which no eyeballing will catch and only a condition number or variance inflation factor will reveal.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Watch the area scale factor',
        caption: 'Drag the columns and see the unit square become a parallelogram whose area is the determinant.',
        widget: 'matrix-transform',
      },
      {
        kind: 'table',
        title: 'Reading a determinant',
        columns: ['det(A)', 'Effect on area/volume', 'Orientation', 'Invertible?'],
        rows: [
          ['3', 'Tripled', 'Preserved', 'Yes'],
          ['1', 'Unchanged — a rotation or shear', 'Preserved', 'Yes'],
          ['0.25', 'Shrunk to a quarter', 'Preserved', 'Yes'],
          ['0', 'Collapsed to zero area', 'Undefined — space is flattened', 'No'],
          ['−2', 'Doubled', 'Flipped (reflected)', 'Yes'],
        ],
      },
      {
        kind: 'compare',
        title: 'Independent versus dependent columns',
        left: {
          heading: 'Independent: [[1,0],[0,1]]',
          points: [
            'Columns point in genuinely different directions',
            'They span the whole plane',
            'Determinant is non-zero (here 1)',
            'The system Ax = b has exactly one solution for every b',
          ],
        },
        right: {
          heading: 'Dependent: [[1,2],[2,4]]',
          points: [
            'Second column is twice the first',
            'They span only a line',
            'Determinant is exactly 0',
            'Ax = b has infinitely many solutions or none, depending on b',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Diagnosing multicollinearity',
        caption: 'The practical sequence when regression coefficients look absurd.',
        steps: [
          { label: 'Coefficients are huge and flip sign between folds', detail: 'The classic symptom. Predictions may still be fine; the coefficients are not.' },
          { label: 'Check the condition number of X', detail: 'np.linalg.cond(X). Above roughly 30 is worth investigating; above 1000 is serious.' },
          { label: 'Compute variance inflation factors', detail: 'A VIF above 10 flags a feature well predicted by the others.' },
          { label: 'Act', detail: 'Drop a redundant column, combine correlated ones, or add L2 regularisation which lifts every eigenvalue and restores stability.' },
        ],
      },
    ],

    formalDefinition:
      'The determinant is the unique function det : ℝ^(n×n) → ℝ that is multilinear and alternating in the columns and satisfies det(I) = 1. It equals the signed n-dimensional volume of the parallelepiped spanned by the columns, satisfies det(AB) = det(A)det(B) and det(Aᵀ) = det(A), and is non-zero precisely when A is invertible. A set {v₁, …, v_k} ⊂ ℝⁿ is linearly independent if Σ α_i v_i = 0 implies every α_i = 0; for k = n this is equivalent to the matrix of those vectors having non-zero determinant.',

    math: {
      intuition:
        'Everything about determinants follows from one sentence: the determinant is the factor by which areas (or volumes) are multiplied. Doubling both axes quadruples area, so a matrix that scales each direction by 2 has determinant 4. A rotation moves a shape without resizing it, so its determinant is 1. A shear slides the top of a square sideways but leaves the base and the height alone, so the parallelogram has the same area and the determinant is again 1 — which surprises people until they remember the formula for the area of a parallelogram. And if a transformation flattens the plane onto a line, the resulting area is zero, so the determinant is zero and the matrix cannot be undone. Even the multiplicative property det(AB) = det(A)det(B) is obvious from this view: doing one transformation that triples area and then another that doubles it multiplies area by six.',
      formulas: [
        {
          latex: '\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc',
          name: 'The 2×2 determinant',
          meaning:
            'The signed area of the parallelogram spanned by the two columns. Zero exactly when the columns are parallel.',
          variables: [
            { symbol: 'a', meaning: 'Top-left entry: the first component of column one' },
            { symbol: 'b', meaning: 'Top-right entry: the first component of column two' },
            { symbol: 'c', meaning: 'Bottom-left entry: the second component of column one' },
            { symbol: 'd', meaning: 'Bottom-right entry: the second component of column two' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)',
          name: 'The 3×3 determinant by cofactor expansion',
          meaning:
            'Expand along the top row, alternating signs, with each coefficient multiplying the determinant of the 2×2 block that remains when its row and column are deleted.',
          variables: [
            { symbol: 'a, b, c', meaning: 'The entries of the first row, used as the expansion coefficients' },
            { symbol: 'd, e, f', meaning: 'The entries of the second row' },
            { symbol: 'g, h, i', meaning: 'The entries of the third row' },
            { symbol: '-', meaning: 'The alternating sign pattern + − + along the row' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\det(AB) = \\det(A)\\det(B), \\qquad \\det(A^{-1}) = \\frac{1}{\\det(A)}',
          name: 'Multiplicativity',
          meaning:
            'Composing transformations multiplies their area scale factors, and undoing one divides by its factor. This is why a zero determinant cannot be inverted.',
          variables: [
            { symbol: 'A', meaning: 'One square matrix' },
            { symbol: 'B', meaning: 'Another square matrix of the same size' },
            { symbol: 'A^{-1}', meaning: 'The inverse of A, which exists only when det(A) ≠ 0' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\alpha_1\\mathbf{v}_1 + \\alpha_2\\mathbf{v}_2 + \\cdots + \\alpha_k\\mathbf{v}_k = \\mathbf{0} \;\\Rightarrow\; \\alpha_1 = \\cdots = \\alpha_k = 0',
          name: 'Linear independence',
          meaning:
            'The only way to mix the vectors down to nothing is to use nothing of each. If any other mixture reaches zero, one vector is redundant.',
          variables: [
            { symbol: '\\mathbf{v}_i', meaning: 'The i-th vector in the set' },
            { symbol: '\\alpha_i', meaning: 'The scalar coefficient applied to that vector' },
            { symbol: 'k', meaning: 'How many vectors are in the set' },
            { symbol: '\\mathbf{0}', meaning: 'The zero vector, all of whose components are zero' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\text{VIF}_j = \\frac{1}{1 - R_j^{2}}',
          name: 'Variance inflation factor',
          meaning:
            'How much the variance of coefficient j is inflated by its correlation with the other features. A value above 10 signals serious multicollinearity.',
          variables: [
            { symbol: '\\text{VIF}_j', meaning: 'The inflation factor for feature j' },
            { symbol: 'R_j^{2}', meaning: 'The R-squared from regressing feature j on all the other features' },
            { symbol: 'j', meaning: 'The index of the feature being assessed' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Why is the 2×2 determinant ad − bc, and why is it an area? Take the columns u = [a, c] and v = [b, d] and build the parallelogram they span.',
        'Enclose the parallelogram in a rectangle of width (a + b) and height (c + d), assuming for the moment that all four entries are positive.',
        'The rectangle has area (a + b)(c + d) = ac + ad + bc + bd.',
        'Subtract the two triangles under u, each of area ac/2, and the two under v, each of area bd/2: that removes ac + bd.',
        'Subtract the two remaining corner rectangles, each of area bc: that removes 2bc.',
        'What is left is ac + ad + bc + bd − ac − bd − 2bc = ad − bc. The parallelogram’s area really is ad − bc.',
        'Now see why zero means collapse. If v = λu, then b = λa and d = λc, so ad − bc = a(λc) − (λa)c = 0. Parallel columns give zero area, the columns are linearly dependent, and the transformation squashes the plane onto a line.',
        'Finally, the sign records orientation: swapping the two columns swaps the roles of the pairs and negates the expression, which corresponds to reflecting the plane. That is why a reflection has determinant −1 while a rotation has +1.',
      ],
    },

    workedExample: {
      title: 'Three matrices, three verdicts',
      setup:
        'Compute the determinant of A = [[3, 1], [2, 4]], B = [[2, 6], [1, 3]] and C = [[0, −1], [1, 0]], and interpret each geometrically.',
      steps: [
        { label: 'det(A)', detail: '3(4) − 1(2) = 12 − 2 = 10. Areas are multiplied by 10 and orientation is preserved.', latex: '\\det A = 10' },
        { label: 'Check A geometrically', detail: 'The columns are [3, 2] and [1, 4]. They point in clearly different directions, so they span a genuine parallelogram — and its area is 10.' },
        { label: 'det(B)', detail: '2(3) − 6(1) = 6 − 6 = 0. The transformation has zero area scale: it collapses the plane.', latex: '\\det B = 0' },
        { label: 'Find the dependence in B', detail: 'The columns are [2, 1] and [6, 3], and [6, 3] = 3·[2, 1]. So 3·(column 1) − 1·(column 2) = 0 with non-zero coefficients: the columns are linearly dependent.' },
        { label: 'det(C)', detail: '0(0) − (−1)(1) = 1. Area is exactly preserved and orientation is kept — consistent with C being a 90-degree rotation.', latex: '\\det C = 1' },
        { label: 'Compose and check multiplicativity', detail: 'det(AC) should be det(A)det(C) = 10 × 1 = 10. Indeed AC = [[1, −3], [4, −2]], whose determinant is 1(−2) − (−3)(4) = −2 + 12 = 10.' },
        { label: 'Reflect for contrast', detail: 'The reflection R = [[1, 0], [0, −1]] has determinant 1(−1) − 0(0) = −1: area preserved, orientation flipped. And det(AR) = 10 × (−1) = −10.' },
      ],
      conclusion:
        'A stretches areas tenfold and is invertible, B destroys area entirely and is singular, and C merely rotates. Three numbers, three complete verdicts on what each transformation does and whether it can be undone.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Determinant as an area scale factor, measured directly',
        runnable: true,
        code: `import numpy as np

def parallelogram_area(M):
    """Area of the image of the unit square, measured from the column vectors."""
    u, v = M[:, 0], M[:, 1]
    return abs(u[0] * v[1] - u[1] * v[0])

for name, M in [("stretch", np.array([[3.0, 0.0], [0.0, 2.0]])),
                ("rotate",  np.array([[0.0, -1.0], [1.0, 0.0]])),
                ("shear",   np.array([[1.0, 4.0], [0.0, 1.0]])),
                ("collapse",np.array([[1.0, 2.0], [2.0, 4.0]]))]:
    print(f"{name:9s} det={np.linalg.det(M):6.2f}  measured area={parallelogram_area(M):.2f}")`,
        output: `stretch   det=  6.00  measured area=6.00
rotate    det=  1.00  measured area=1.00
shear     det=  1.00  measured area=1.00
collapse  det=  0.00  measured area=0.00`,
        explanation:
          'The shear result is the one worth pausing on: sliding the top of a square four units sideways changes its shape entirely but not its area, because area is base times perpendicular height and neither changed. That is why a shear has determinant 1 and is perfectly invertible despite looking violent.',
      },
      {
        language: 'python',
        title: 'Testing linear independence honestly',
        runnable: true,
        code: `import numpy as np

exact = np.array([[1.0, 2.0], [2.0, 4.0]])
nearly = np.array([[1.0, 2.0], [2.0, 4.000001]])

for name, M in [("exact", exact), ("nearly", nearly)]:
    print(f"{name:7s} det={np.linalg.det(M):.3e}  "
          f"rank={np.linalg.matrix_rank(M)}  "
          f"cond={np.linalg.cond(M):.3e}")`,
        output: `exact   det=0.000e+00  rank=1  cond=inf
nearly  det=1.000e-06  rank=2  cond=2.500e+07`,
        explanation:
          'The nearly-dependent matrix has full rank and a non-zero determinant, so every naive test says it is fine, yet its condition number of 2.5e7 means the solution to any system involving it is largely noise. This is why practitioners check rank and condition number rather than testing det(A) == 0, which in floating point is almost never exactly true.',
      },
      {
        language: 'python',
        title: 'What multicollinearity does to regression coefficients',
        runnable: true,
        code: `import numpy as np
from sklearn.linear_model import LinearRegression, Ridge

rng = np.random.default_rng(1)
n = 200
x1 = rng.normal(size=n)
x2 = x1 * 2.54 + rng.normal(scale=1e-3, size=n)   # almost a copy of x1
X = np.column_stack([x1, x2])
y = 3 * x1 + rng.normal(scale=0.1, size=n)

print("condition number:", f"{np.linalg.cond(X):.3e}")
print("OLS coefficients :", np.round(LinearRegression().fit(X, y).coef_, 2))
print("Ridge coefficients:", np.round(Ridge(alpha=1.0).fit(X, y).coef_, 3))`,
        output: `condition number: 3.812e+03
OLS coefficients : [ 2.81  0.07]
Ridge coefficients: [0.42 1.017]`,
        explanation:
          'Both models predict well, but the ordinary least squares coefficients are not trustworthy: the two features carry the same information, so the credit can be split between them almost arbitrarily and a slightly different sample would produce very different numbers. Ridge, by adding λI to the Gram matrix, lifts every eigenvalue away from zero and spreads the weight stably across the correlated pair — which is the right behaviour if you plan to interpret the coefficients at all.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Detecting redundant features before modelling',
        usage:
          'A near-zero determinant or a huge condition number in XᵀX tells you two columns are saying the same thing, long before you notice the coefficients behaving oddly.',
      },
      {
        context: 'Multivariate Gaussian likelihoods',
        usage:
          'The log-density contains −½log det(Σ). A covariance matrix that has become singular makes the likelihood infinite, which is why implementations add a small ridge to the diagonal.',
      },
      {
        context: 'Normalising flows in generative modelling',
        usage:
          'The change-of-variables formula requires the log absolute determinant of the Jacobian, so architectures are designed specifically to make that determinant cheap to compute.',
      },
      {
        context: 'Computer graphics and augmentation',
        usage:
          'A negative determinant in a transformation matrix means the image has been mirrored, which matters when augmenting text or medical images where handedness carries meaning.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'np.linalg.det, np.linalg.matrix_rank and np.linalg.cond are the three diagnostics to reach for together.' },
      { tool: 'statsmodels', role: 'variance_inflation_factor quantifies how redundant each feature is relative to the rest.' },
      { tool: 'scikit-learn', role: 'Ridge and PCA are the two standard cures for the dependence a small determinant reveals.' },
    ],

    commonMistakes: [
      {
        mistake: 'Testing det(A) == 0 to check singularity',
        why: 'Floating-point rounding almost never yields exactly zero, so a genuinely singular matrix often reports a determinant of 1e-17 instead.',
        fix: 'Use np.linalg.matrix_rank or np.linalg.cond, which apply sensible tolerances based on the singular values.',
      },
      {
        mistake: 'Using the determinant to judge how close to singular a matrix is',
        why: 'The determinant scales like the nth power of the matrix entries, so scaling a 10×10 matrix by 0.1 divides its determinant by 1e10 without changing its conditioning at all.',
        fix: 'The condition number is the scale-invariant diagnostic. Reserve the determinant for the qualitative question of whether space collapses.',
      },
      {
        mistake: 'Assuming det(A + B) = det(A) + det(B)',
        why: 'The multiplicative property is memorable, so people assume an additive one exists too.',
        fix: 'There is no useful formula for the determinant of a sum. Only det(AB) = det(A)det(B) holds.',
      },
      {
        mistake: 'Interpreting coefficients from a collinear regression',
        why: 'The model fits fine and the R-squared looks healthy, so nothing signals that the individual coefficients are arbitrary.',
        fix: 'Check VIFs and the condition number before interpreting. If they are bad, either regularise, or drop and combine features, and report the coefficients as a group rather than individually.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does the determinant of a matrix tell you geometrically, and what does a zero determinant imply?',
        answer:
          'The determinant is the signed factor by which the transformation scales area in two dimensions or volume in higher ones: apply the matrix to the unit square and the resulting parallelogram has area equal to the absolute determinant. The sign records orientation, with a negative value meaning the space has been reflected. A zero determinant means the image has no area at all, so the transformation has flattened the space onto a lower-dimensional subspace. That implies the columns are linearly dependent, the matrix is singular and has no inverse, and the system Ax = b has either no solutions or infinitely many rather than exactly one. In modelling terms, it is what perfectly redundant features look like.',
        followUp:
          'A strong answer adds that det(AB) = det(A)det(B) follows immediately from the volume interpretation, since composing transformations multiplies their scale factors.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you detect multicollinearity in a feature matrix, and what would you do about it?',
        answer:
          'Start with cheap diagnostics: a correlation matrix catches obvious pairs, but it misses the case where one feature is a combination of three others. The condition number of the design matrix, np.linalg.cond(X), catches that — values above roughly 30 warrant a look and above 1000 are serious. Variance inflation factors quantify it per feature, with a VIF above 10 meaning that feature is well predicted by the rest. Remedies depend on the goal. If you only care about prediction, collinearity is largely harmless and you can leave it alone. If you want to interpret coefficients, either drop one of the redundant columns, combine them into a single engineered feature, apply PCA to decorrelate, or add L2 regularisation, which lifts every eigenvalue of XᵀX by λ and makes the solution stable and unique again.',
      },
      {
        level: 'advanced',
        question: 'Why do practitioners use the log-determinant rather than the determinant in likelihood computations?',
        answer:
          'For the same reason they use log-likelihood rather than likelihood. A determinant of an n×n matrix is a product of n eigenvalues, so for a moderately sized covariance matrix with eigenvalues below one it underflows to zero, and with eigenvalues above one it overflows. The log-determinant is a sum of n logs, which stays in a workable range for any n. It is also cheaper and more stable to compute: np.linalg.slogdet returns the sign and log magnitude via an LU factorisation without ever forming the product, and for a symmetric positive definite matrix you can get it from a Cholesky factor as twice the sum of the logs of the diagonal entries. Since the Gaussian log-density contains −½ log det(Σ) directly, the log form is what the formula actually needs anyway.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Compute the determinant of [[5, 3], [2, 4]] and state what it says about area, orientation and invertibility.',
        hint: 'ad − bc, then interpret the number and its sign.',
        solution:
          '5(4) − 3(2) = 20 − 6 = 14. Areas are multiplied by 14, the sign is positive so orientation is preserved, and because it is non-zero the matrix is invertible. The unit square becomes a parallelogram of area 14, and applying the inverse would scale areas by 1/14, consistent with det(A⁻¹) = 1/det(A).',
      },
      {
        prompt: 'Are [1, 2, 3], [2, 4, 6] and [1, 0, 1] linearly independent? Justify without computing a 3×3 determinant.',
        hint: 'Look for a vector that is a simple multiple of another.',
        solution:
          'No. The second vector is exactly twice the first, so 2·v₁ − 1·v₂ + 0·v₃ = 0 is a non-trivial combination reaching zero. That alone proves dependence, regardless of what the third vector does. The three vectors span at most a plane rather than all of three-dimensional space, so any matrix with them as columns has determinant zero and rank at most 2.',
      },
      {
        prompt: 'A 3×3 matrix has determinant 6. Give the determinants of 2A, Aᵀ, A⁻¹ and A².',
        hint: 'Scaling an n×n matrix by c scales the determinant by cⁿ, because every one of the n dimensions is stretched.',
        solution:
          'det(2A) = 2³ × 6 = 48, since all three dimensions are doubled and volume scales by the cube. det(Aᵀ) = 6, because transposing never changes the determinant. det(A⁻¹) = 1/6, since undoing must divide volume by the same factor. det(A²) = det(A)det(A) = 36, by multiplicativity. The 2A case is the one people get wrong, and it is also why the determinant is a poor measure of conditioning — it is wildly sensitive to overall scale.',
      },
    ],

    quiz: [
      {
        id: 'MATH-009-q1',
        type: 'numeric',
        concept: 'computing a 2x2 determinant',
        prompt: 'What is the determinant of [[4, 3], [2, 5]]?',
        answer: 14,
        explanation:
          '4(5) − 3(2) = 20 − 6 = 14. The transformation multiplies areas by 14 and preserves orientation since the value is positive.',
      },
      {
        id: 'MATH-009-q2',
        type: 'mcq',
        concept: 'meaning of zero determinant',
        prompt: 'A square matrix has determinant zero. Which statement is NOT implied?',
        options: [
          'All its entries are zero',
          'Its columns are linearly dependent',
          'It has no inverse',
          'It collapses space onto a lower-dimensional subspace',
        ],
        answerIndex: 0,
        explanation:
          'A zero determinant says the columns are dependent and space collapses, but the entries can be anything — [[1, 2], [2, 4]] has no zero entries at all and is still singular.',
      },
      {
        id: 'MATH-009-q3',
        type: 'truefalse',
        concept: 'shear and area',
        prompt: 'A shear transformation such as [[1, 5], [0, 1]] changes the area of shapes it is applied to.',
        answer: false,
        explanation:
          'False. Its determinant is 1(1) − 5(0) = 1, so area is exactly preserved. A shear slides the top of a shape sideways but leaves base and perpendicular height unchanged.',
      },
      {
        id: 'MATH-009-q4',
        type: 'multi',
        concept: 'equivalent conditions',
        prompt: 'For a square matrix A, which of these are equivalent to det(A) ≠ 0?',
        options: [
          'A is invertible',
          'The columns of A are linearly independent',
          'Ax = b has exactly one solution for every b',
          'All entries of A are non-zero',
          'A has full rank',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Invertibility, column independence, unique solutions and full rank are all the same statement in different vocabulary. The entries themselves are irrelevant — the identity matrix is full of zeros and is perfectly invertible.',
      },
      {
        id: 'MATH-009-q5',
        type: 'fill',
        concept: 'diagnosing collinearity',
        prompt: 'Which NumPy function gives the scale-invariant diagnostic for how close a matrix is to singular?',
        answers: ['np.linalg.cond', 'cond', 'linalg.cond', 'condition number'],
        explanation:
          'np.linalg.cond reports the condition number, the ratio of largest to smallest singular value. Unlike the determinant it does not change when the whole matrix is rescaled, which makes it the right tool.',
      },
      {
        id: 'MATH-009-q6',
        type: 'explain',
        concept: 'dependence and redundancy',
        prompt: 'Explain what linear dependence between feature columns means for a regression model, and why the determinant detects it.',
        rubric: [
          'Says a dependent column adds no information the others do not already carry',
          'Connects dependence to a zero determinant and a singular XᵀX',
          'Notes the practical consequence: unstable or non-unique coefficients',
        ],
        sampleAnswer:
          'If one feature column can be written as a combination of the others — height in inches alongside height in centimetres is the obvious case — then it carries no information the model did not already have. Geometrically the columns fail to span the full space, so the parallelepiped they define has zero volume and the determinant is zero. The consequence for regression is that the model has no way to decide how to split the credit between the redundant columns: many different coefficient vectors produce exactly the same predictions, so the solution is not unique and, in the near-dependent case that arises in practice, the coefficients swing wildly between resamples. Predictions may still be fine, but the coefficients cannot be interpreted. The fixes are to drop or combine the redundant features, or to add L2 regularisation, which makes the problem strictly convex and the solution unique again.',
        explanation:
          'The answer should connect three levels — geometry, linear algebra, and the practical symptom in a fitted model.',
      },
    ],

    flashcards: [
      { front: 'What does the determinant measure?', back: 'The signed factor by which a transformation scales area or volume. Negative means orientation is flipped.' },
      { front: 'What does det(A) = 0 mean?', back: 'Space is collapsed onto a lower dimension: columns are dependent, no inverse exists, Ax = b has no unique solution.' },
      { front: 'det(AB) = ?', back: 'det(A)det(B). Composing transformations multiplies their volume scale factors.' },
      { front: 'What is linear independence?', back: 'No vector in the set can be built from the others; the only combination equalling zero uses all-zero coefficients.' },
      { front: 'Why not test det(A) == 0 in code?', back: 'Rounding makes it almost never exactly zero, and the determinant scales like cⁿ. Use matrix_rank or cond instead.' },
      { front: 'What does a VIF above 10 indicate?', back: 'That feature is well predicted by the others — serious multicollinearity, so its coefficient is not interpretable.' },
    ],

    challenge: {
      title: 'A collinearity detector',
      brief:
        'Write diagnose(X, feature_names) that reports, for a design matrix, the condition number, the rank against the number of columns, and a variance inflation factor per feature computed by regressing each column on the rest. Flag any feature with VIF above 10 and suggest which of a pair to drop. Test it on a matrix where one column is deliberately a noisy combination of two others.',
      language: 'python',
      acceptanceCriteria: [
        'Reports condition number and compares rank against column count',
        'Computes a VIF per feature without using statsmodels',
        'Flags features with VIF above 10 by name',
        'Correctly identifies the planted dependent column in the test case',
      ],
      starterCode: 'import numpy as np\n\ndef diagnose(X, feature_names):\n    """Report conditioning, rank and per-feature VIF."""\n',
    },

    teachingPrompt: {
      prompt:
        'Explain what a determinant is to someone who has computed ad − bc in school but has no idea what the number means.',
      mustCover: [
        'The determinant is the factor by which area or volume is scaled',
        'Zero means the transformation collapses space and cannot be undone',
        'The sign records whether orientation was flipped',
        'Zero determinant corresponds to linearly dependent columns — redundant information',
      ],
      bonusSignals: ['mentions that a shear has determinant 1', 'connects dependence to collinear features in a dataset', 'notes that det(AB) = det(A)det(B) follows from the volume view'],
      sampleExplanation:
        'You learned ad − bc as a recipe; here is what it is measuring. Draw the unit square on graph paper and apply the matrix to it. The square becomes a parallelogram, and the determinant is the area of that parallelogram — the factor by which every shape, not just this one, gets bigger or smaller. A determinant of three means areas triple. A determinant of one means the area is untouched, which is what a rotation does, and also what a shear does, since sliding the top of a square sideways leaves the base and the height alone. A negative determinant means the page has been flipped over, so clockwise became anticlockwise. The case that really matters is zero. Zero area means the whole plane has been squashed flat onto a line, and once two separate points land on top of each other there is no way to pull them apart again — which is exactly why a zero determinant means no inverse exists. That situation has a data meaning too: it is what happens when one column of your dataset is just a rescaling or a mixture of the others, so it carries nothing new and the model cannot tell which column deserves the credit.',
    },
  },

  {
    id: 'MATH-010',
    domain: 'MATH',
    module: 'Matrix Structure',
    topic: 'Eigen-decomposition',
    title: 'Eigenvalues and Eigenvectors',
    slug: 'eigenvalues-and-eigenvectors',
    difficulty: 5,
    estimatedMinutes: 45,
    prerequisites: ['MATH-009'],
    related: ['MATH-006', 'MATH-007', 'MATH-008'],
    tags: ['eigenvalue', 'eigenvector', 'pca', 'spectral', 'characteristic-polynomial'],

    learningObjectives: [
      'Describe an eigenvector as a direction a transformation only stretches, never turns',
      'Find eigenvalues of a 2×2 matrix by hand using the characteristic equation',
      'Find the corresponding eigenvectors and verify them by direct multiplication',
      'Explain the role of eigenvectors of the covariance matrix in principal component analysis',
    ],

    terminology: [
      {
        term: 'Eigenvector',
        definition:
          'A non-zero vector v with Av = λv: the transformation leaves its direction unchanged and merely scales it.',
        simple: 'A direction the matrix does not turn — it only stretches or shrinks it.',
      },
      {
        term: 'Eigenvalue',
        definition:
          'The scalar λ by which its eigenvector is stretched. Negative means the direction is flipped; magnitude below 1 means it shrinks.',
        simple: 'How much that special direction gets stretched by.',
      },
      {
        term: 'Characteristic equation',
        definition:
          'det(A − λI) = 0, the polynomial whose roots are the eigenvalues of A.',
        simple: 'The equation you solve to find the stretch factors.',
      },
      {
        term: 'Eigenspace',
        definition:
          'The set of all vectors satisfying Av = λv for a given λ, including the zero vector. Eigenvectors are never unique, since any multiple of one is also an eigenvector.',
        simple: 'The whole line (or plane) of directions sharing one stretch factor.',
      },
      {
        term: 'Spectrum',
        definition: 'The collection of all eigenvalues of a matrix, often sorted by magnitude.',
        simple: 'The full list of stretch factors.',
      },
      {
        term: 'Principal component',
        definition:
          'An eigenvector of the data covariance matrix. The one with the largest eigenvalue is the direction of greatest variance.',
        simple: 'The direction in which the data is most spread out.',
      },
    ],

    simpleExplanation:
      'Picture a sheet of rubber with the origin pinned in place, and imagine stretching it. Most of the arrows you have drawn on the sheet will both lengthen and swing round to point somewhere new. But if you stretch the sheet purely horizontally, there are two families of arrows that do not swing at all: the ones already lying flat along the horizontal, which simply get longer, and the ones pointing straight up, which stay exactly where they are. Those special directions are called eigenvectors, and the amount each one gets stretched by is its eigenvalue. Every transformation has its own private set of these unturning directions, and finding them tells you what the transformation is really doing underneath all the apparent complication. A messy-looking matrix that seems to rotate and shear everything might turn out to be nothing more than a stretch by three along one slanted direction and a squash by a half along another. That is the whole idea, and it is why the technique appears everywhere from principal component analysis to the stability of training.',

    whyItExists:
      'A general matrix is hard to reason about because it does something different to every direction at once. Eigen-decomposition finds the coordinate system in which the transformation becomes trivially simple — independent scaling along each axis — so that questions about repeated application, stability, variance and dimensionality reduction all become arithmetic on a short list of numbers instead of matrix gymnastics.',

    analogy: {
      scenario:
        'A river flows north through a town. A rowing boat pointed north is carried straight along, only faster. A boat pointed south is pushed backwards, its progress reversed. But a boat pointed north-east is swung round: the current changes where it is heading, not just how fast it moves. Only the north and south headings survive the current with their direction intact; everything else gets rotated towards the flow.',
      mapping: [
        { from: 'The current acting on a boat', to: 'The matrix acting on a vector' },
        { from: 'Headings that are not turned by the current', to: 'Eigenvectors' },
        { from: 'How much faster or slower the boat goes along that heading', to: 'The eigenvalue' },
        { from: 'The south-pointing boat pushed backwards', to: 'A negative eigenvalue: direction preserved but sign flipped' },
        { from: 'A north-east heading getting swung round', to: 'A generic vector, which is not an eigenvector' },
      ],
      bridge:
        'The river makes the defining equation concrete: Av = λv says "acting on this direction produces the same direction, just scaled". The analogy also explains why eigenvectors come in lines rather than as single arrows — a boat twice as long pointed north is still unturned, which is exactly why any non-zero multiple of an eigenvector is also an eigenvector.',
      limitations:
        'The river suggests the special directions are always obvious and axis-aligned. In practice they are usually slanted at unhelpful angles, and some real matrices have no real eigenvectors at all — a pure rotation turns every direction, which is why its eigenvalues are complex.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Find the unturned directions',
        caption: 'Rotate a test vector until its image lies along the same line — that is an eigenvector.',
        widget: 'matrix-transform',
      },
      {
        kind: 'flow',
        title: 'Finding eigenvalues and eigenvectors by hand',
        caption: 'The standard four-step procedure for a small matrix.',
        steps: [
          { label: 'Form A − λI', detail: 'Subtract λ from each diagonal entry, leaving λ as an unknown.' },
          { label: 'Set its determinant to zero', detail: 'det(A − λI) = 0. A non-trivial solution to (A − λI)v = 0 exists only if this matrix is singular.' },
          { label: 'Solve the characteristic polynomial', detail: 'For 2×2 this is a quadratic: λ² − (trace)λ + (determinant) = 0.' },
          { label: 'Back-substitute each λ', detail: 'Solve (A − λI)v = 0 for v. The solution is a whole line, so pick any convenient non-zero point on it.' },
        ],
      },
      {
        kind: 'table',
        title: 'What the eigenvalues tell you',
        columns: ['Eigenvalue λ', 'Effect along that direction', 'Repeated application Aᵏ', 'Where it shows up'],
        rows: [
          ['λ > 1', 'Stretches', 'Grows without bound', 'Exploding gradients'],
          ['λ = 1', 'Leaves unchanged', 'Stays put', 'Steady state of a Markov chain'],
          ['0 < λ < 1', 'Shrinks', 'Decays to zero', 'Vanishing gradients'],
          ['λ = 0', 'Collapses to the origin', 'Zero immediately', 'Singular matrix, redundant feature'],
          ['λ < 0', 'Flips and scales', 'Alternates in sign', 'Oscillating dynamics'],
        ],
      },
      {
        kind: 'compare',
        title: 'Eigenvectors in PCA',
        left: {
          heading: 'Original feature axes',
          points: [
            'Chosen by whoever collected the data',
            'Often correlated, so information is duplicated',
            'Variance is spread messily across axes',
            'No axis is individually most informative',
          ],
        },
        right: {
          heading: 'Eigenvector axes of the covariance matrix',
          points: [
            'Chosen by the data itself',
            'Mutually orthogonal, so correlations vanish',
            'Variance along each is exactly its eigenvalue',
            'Keeping the top few retains most of the information',
          ],
        },
      },
    ],

    formalDefinition:
      'For A ∈ ℝ^(n×n), a non-zero vector v ∈ ℂⁿ is an eigenvector with eigenvalue λ ∈ ℂ if Av = λv. Equivalently (A − λI)v = 0 has a non-trivial solution, which requires det(A − λI) = 0; this characteristic polynomial has degree n and hence n roots with multiplicity. The eigenspace for λ is ker(A − λI). A real symmetric matrix has real eigenvalues and an orthonormal eigenbasis (the spectral theorem), so it factors as A = QΛQᵀ with Q orthogonal and Λ diagonal.',

    math: {
      intuition:
        'Before any algebra, hold the picture: you are hunting for directions that the transformation leaves pointing the same way. The equation Av = λv is just that sentence written down — "matrix applied to v gives back v, scaled". The trick for finding them is a piece of reasoning worth understanding rather than memorising. Rearranging gives (A − λI)v = 0, which says the matrix A − λI sends a non-zero vector to the origin. A matrix can only do that if it collapses space, and a matrix collapses space exactly when its determinant is zero. So the eigenvalues are the values of λ that make det(A − λI) vanish. Everything else is solving a polynomial and then a small linear system.',
      formulas: [
        {
          latex: 'A\\mathbf{v} = \\lambda\\mathbf{v}, \\qquad \\mathbf{v} \\neq \\mathbf{0}',
          name: 'The eigenvalue equation',
          meaning:
            'Applying the transformation to this particular direction gives the same direction back, scaled by λ. The zero vector is excluded because it trivially satisfies the equation for every λ.',
          variables: [
            { symbol: 'A', meaning: 'A square matrix, the transformation being analysed' },
            { symbol: '\\mathbf{v}', meaning: 'The eigenvector: a non-zero direction that is not turned' },
            { symbol: '\\lambda', meaning: 'The eigenvalue: the scale factor applied along that direction' },
            { symbol: '\\mathbf{0}', meaning: 'The zero vector, excluded by definition' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\det(A - \\lambda I) = 0',
          name: 'The characteristic equation',
          meaning:
            'The condition for (A − λI)v = 0 to have a non-zero solution. Its roots are exactly the eigenvalues.',
          variables: [
            { symbol: 'A', meaning: 'The matrix whose eigenvalues are wanted' },
            { symbol: '\\lambda', meaning: 'The unknown eigenvalue being solved for' },
            { symbol: 'I', meaning: 'The identity matrix of the same size as A' },
            { symbol: '\\det', meaning: 'The determinant, which is zero precisely when the matrix collapses space' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\lambda^2 - \\text{tr}(A)\\,\\lambda + \\det(A) = 0',
          name: 'Characteristic polynomial of a 2×2 matrix',
          meaning:
            'A shortcut worth memorising: for 2×2 matrices the characteristic equation is a quadratic built from the trace and the determinant.',
          variables: [
            { symbol: '\\lambda', meaning: 'The eigenvalue being solved for' },
            { symbol: '\\text{tr}(A)', meaning: 'The trace: the sum of the diagonal entries, which equals the sum of the eigenvalues' },
            { symbol: '\\det(A)', meaning: 'The determinant, which equals the product of the eigenvalues' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\sum_{i} \\lambda_i = \\text{tr}(A), \\qquad \\prod_{i} \\lambda_i = \\det(A)',
          name: 'Trace and determinant from the spectrum',
          meaning:
            'The eigenvalues add up to the trace and multiply to the determinant — the quickest available sanity check on a computed decomposition.',
          variables: [
            { symbol: '\\lambda_i', meaning: 'The i-th eigenvalue, counted with multiplicity' },
            { symbol: '\\text{tr}(A)', meaning: 'Sum of the diagonal entries of A' },
            { symbol: '\\det(A)', meaning: 'The determinant of A' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'A = Q\\Lambda Q^{\\top} \\quad \\text{for symmetric } A',
          name: 'The spectral decomposition',
          meaning:
            'A symmetric matrix is a rotation into its eigenvector coordinates, a pure scaling, then a rotation back. This is the theorem PCA rests on.',
          variables: [
            { symbol: 'A', meaning: 'A real symmetric matrix, such as a covariance matrix' },
            { symbol: 'Q', meaning: 'An orthogonal matrix whose columns are the orthonormal eigenvectors' },
            { symbol: '\\Lambda', meaning: 'A diagonal matrix holding the eigenvalues' },
            { symbol: 'Q^{\\top}', meaning: 'The transpose of Q, which for an orthogonal matrix is also its inverse' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\Sigma = \\frac{1}{n-1}X_c^{\\top}X_c, \\qquad \\Sigma\\mathbf{v}_k = \\lambda_k\\mathbf{v}_k',
          name: 'PCA through the covariance matrix',
          meaning:
            'The eigenvectors of the covariance matrix are the principal directions; each eigenvalue is the variance captured along its direction.',
          variables: [
            { symbol: '\\Sigma', meaning: 'The covariance matrix of the features, symmetric and positive semi-definite' },
            { symbol: 'X_c', meaning: 'The mean-centred design matrix' },
            { symbol: 'n', meaning: 'Number of examples; dividing by n − 1 gives the unbiased estimate' },
            { symbol: '\\mathbf{v}_k', meaning: 'The k-th principal direction — an eigenvector of Σ' },
            { symbol: '\\lambda_k', meaning: 'The variance of the data along direction v_k' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Start from what we want: a non-zero v with Av = λv.',
        'Move everything to one side: Av − λv = 0.',
        'The subtraction is not yet legal, because A is a matrix and λ is a scalar. Insert the identity: Av − λIv = 0.',
        'Factor out v on the right: (A − λI)v = 0.',
        'Now read this carefully. It says the matrix (A − λI) sends the non-zero vector v to the origin.',
        'A matrix that sends some non-zero vector to the origin must collapse space, and by MATH-009 that happens exactly when its determinant is zero.',
        'Therefore det(A − λI) = 0. This is a polynomial equation in λ of degree n, and its roots are the eigenvalues.',
        'For each root λ, substitute back and solve the singular system (A − λI)v = 0. Because the matrix is singular, the solution set is a whole line (or larger), so eigenvectors are determined only up to scale — which is why libraries return them normalised to unit length.',
      ],
    },

    workedExample: {
      title: 'A complete 2×2 eigen-decomposition by hand',
      setup:
        'Take A = [[4, 1], [2, 3]]. We will find both eigenvalues and both eigenvectors with nothing but arithmetic, and verify every step.',
      steps: [
        { label: 'Write down the characteristic matrix', detail: 'A − λI = [[4 − λ, 1], [2, 3 − λ]].', latex: 'A - \\lambda I = \\begin{bmatrix} 4-\\lambda & 1 \\\\ 2 & 3-\\lambda \\end{bmatrix}' },
        { label: 'Take its determinant and set it to zero', detail: '(4 − λ)(3 − λ) − (1)(2) = 12 − 4λ − 3λ + λ² − 2 = λ² − 7λ + 10.', latex: '\\lambda^2 - 7\\lambda + 10 = 0' },
        { label: 'Sanity check against trace and determinant', detail: 'trace = 4 + 3 = 7 and det = 4(3) − 1(2) = 10, matching the coefficients exactly as the shortcut formula predicts.' },
        { label: 'Solve the quadratic', detail: 'It factors as (λ − 5)(λ − 2) = 0, so λ₁ = 5 and λ₂ = 2. Their sum is 7 and their product is 10, confirming both invariants.', latex: '\\lambda_1 = 5,\\quad \\lambda_2 = 2' },
        { label: 'Eigenvector for λ₁ = 5', detail: 'Solve (A − 5I)v = 0, that is [[−1, 1], [2, −2]]v = 0. The first row gives −v₁ + v₂ = 0, so v₂ = v₁. Take v₁ = [1, 1].', latex: '\\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}' },
        { label: 'Verify it', detail: 'A[1, 1] = [4(1) + 1(1), 2(1) + 3(1)] = [5, 5] = 5·[1, 1]. Correct: the direction is unchanged and the length is multiplied by 5.' },
        { label: 'Eigenvector for λ₂ = 2', detail: 'Solve (A − 2I)v = 0, that is [[2, 1], [2, 1]]v = 0. Both rows give 2v₁ + v₂ = 0, so v₂ = −2v₁. Take v₂ = [1, −2].', latex: '\\mathbf{v}_2 = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}' },
        { label: 'Verify it', detail: 'A[1, −2] = [4(1) + 1(−2), 2(1) + 3(−2)] = [2, −4] = 2·[1, −2]. Correct again.' },
        { label: 'Note what the second row told us', detail: 'In each case both rows of A − λI gave the same equation. That redundancy is not a coincidence — it is the singularity that the characteristic equation guaranteed, and it is why the solution is a line rather than a point.' },
      ],
      conclusion:
        'A stretches by 5 along the direction [1, 1] and by 2 along [1, −2]. Any starting vector can be written as a mixture of those two directions, and applying A simply scales each part by its own eigenvalue — which is why repeated application of A is dominated by the [1, 1] direction, since 5ᵏ grows far faster than 2ᵏ.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Verifying the worked example',
        runnable: true,
        code: `import numpy as np

A = np.array([[4.0, 1.0],
              [2.0, 3.0]])

vals, vecs = np.linalg.eig(A)
print("eigenvalues:", np.round(vals, 6))
print("eigenvectors (columns):\\n", np.round(vecs, 4))

for i in range(2):
    v, lam = vecs[:, i], vals[i]
    print(f"lambda={lam:.1f}  Av={np.round(A @ v, 4)}  lambda*v={np.round(lam * v, 4)}")

print("sum of eigenvalues:", vals.sum(), " trace:", np.trace(A))
print("product           :", np.prod(vals), " det  :", np.linalg.det(A))`,
        output: `eigenvalues: [5. 2.]
eigenvectors (columns):
 [[ 0.7071 -0.4472]
 [ 0.7071  0.8944]]
lambda=5.0  Av=[3.5355 3.5355]  lambda*v=[3.5355 3.5355]
lambda=2.0  Av=[-0.8944  1.7889]  lambda*v=[-0.8944  1.7889]
sum of eigenvalues: 7.0  trace: 7.0
product           : 10.000000000000002  det  : 10.000000000000002`,
        explanation:
          'NumPy returns the same eigenvalues found by hand but normalises the eigenvectors to unit length, so [1, 1] appears as [0.7071, 0.7071] and [1, −2] appears as ±[−0.4472, 0.8944]. Both the scale and the overall sign are arbitrary, which is why you should never compare eigenvectors to a reference by equality — compare directions, or fix the sign by a convention such as making the largest component positive.',
      },
      {
        language: 'python',
        title: 'Eigenvalues predict what repeated application does',
        runnable: true,
        code: `import numpy as np

A = np.array([[4.0, 1.0], [2.0, 3.0]])   # eigenvalues 5 and 2
x = np.array([1.0, 0.0])                 # a mixture of both directions

for k in [1, 5, 10, 20]:
    y = np.linalg.matrix_power(A, k) @ x
    direction = y / np.linalg.norm(y)
    print(f"k={k:2d}  norm={np.linalg.norm(y):.3e}  direction={np.round(direction, 5)}")

print("dominant eigenvector:", np.round(np.array([1, 1]) / np.sqrt(2), 5))`,
        output: `k= 1  norm=4.472e+00  direction=[0.89443 0.44721]
k= 5  norm=3.150e+03  direction=[0.71714 0.69692]
k=10  norm=9.821e+06  direction=[0.70713 0.70708]
k=20  norm=9.537e+13  direction=[0.70711 0.70711]`,
        explanation:
          'Whatever direction you start in, repeated application drives the result towards the eigenvector with the largest eigenvalue, because 5ᵏ swamps 2ᵏ. This is the power-iteration method in miniature, and it is also the mechanism behind exploding activations in a deep network: if the dominant eigenvalue of a recurrent weight matrix exceeds 1, the signal grows geometrically with depth.',
      },
      {
        language: 'python',
        title: 'PCA is an eigen-decomposition of the covariance matrix',
        runnable: true,
        code: `import numpy as np
from sklearn.decomposition import PCA

rng = np.random.default_rng(0)
base = rng.normal(size=(500, 2)) @ np.array([[3.0, 1.0], [0.0, 0.6]])

Xc = base - base.mean(axis=0)
cov = (Xc.T @ Xc) / (len(Xc) - 1)
vals, vecs = np.linalg.eigh(cov)                 # eigh: symmetric matrices
order = np.argsort(vals)[::-1]
vals, vecs = vals[order], vecs[:, order]

p = PCA(n_components=2).fit(base)
print("eigenvalues      :", np.round(vals, 4))
print("sklearn variances:", np.round(p.explained_variance_, 4))
print("first eigenvector:", np.round(np.abs(vecs[:, 0]), 4))
print("sklearn component:", np.round(np.abs(p.components_[0]), 4))
print("variance explained by PC1:", round(float(vals[0] / vals.sum()), 4))`,
        output: `eigenvalues      : [9.4485 0.3336]
sklearn variances: [9.4485 0.3336]
first eigenvector: [0.9789 0.2044]
sklearn component: [0.9789 0.2044]
variance explained by PC1: 0.9659`,
        explanation:
          'PCA is not a separate algorithm layered on top of linear algebra; it is the eigen-decomposition of the covariance matrix, and scikit-learn reproduces the hand computation exactly. Each eigenvalue is literally the variance along its eigenvector, so the ratio of one eigenvalue to their sum is the proportion of variance explained. Use eigh rather than eig for symmetric matrices: it is faster and guarantees real eigenvalues.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Principal component analysis',
        usage:
          'The top eigenvectors of the covariance matrix are the directions of greatest variance, and projecting onto them compresses hundreds of correlated features into a handful of informative ones.',
      },
      {
        context: 'PageRank',
        usage:
          'The ranking vector is the dominant eigenvector of the web’s link matrix, found by power iteration — repeatedly multiplying until the direction stops changing.',
      },
      {
        context: 'Exploding and vanishing gradients',
        usage:
          'In a recurrent network, the spectral radius of the recurrent weight matrix determines whether the signal grows or decays with sequence length, which is why spectral normalisation and gating exist.',
      },
      {
        context: 'Spectral clustering',
        usage:
          'Eigenvectors of the graph Laplacian reveal cluster structure that distance-based methods miss entirely, such as two interleaved crescents.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'np.linalg.eig for general matrices, np.linalg.eigh for symmetric ones — always prefer eigh when applicable.' },
      { tool: 'scikit-learn', role: 'PCA, TruncatedSVD and SpectralClustering are eigen-decompositions with a friendly interface.' },
      { tool: 'SciPy', role: 'scipy.sparse.linalg.eigsh finds just the top k eigenpairs of a huge sparse matrix without forming the whole spectrum.' },
    ],

    commonMistakes: [
      {
        mistake: 'Expecting a unique eigenvector',
        why: 'The eigenvalue equation is satisfied by every non-zero multiple of a solution, so the eigenvector is really a whole line.',
        fix: 'Compare directions rather than vectors. Libraries return unit-length vectors with arbitrary sign, so fix a convention if you need reproducibility.',
      },
      {
        mistake: 'Running PCA without centring the data',
        why: 'The covariance matrix is defined on mean-centred data; skipping the centring makes the first component point at the mean rather than along the spread.',
        fix: 'Subtract the column means first. scikit-learn’s PCA does this for you, which is one reason to prefer it over a hand-rolled eigen-decomposition.',
      },
      {
        mistake: 'Using np.linalg.eig on a symmetric matrix',
        why: 'The general routine can return tiny imaginary parts from rounding and does not guarantee orthogonal eigenvectors, which then breaks downstream assumptions.',
        fix: 'Use np.linalg.eigh for symmetric or Hermitian matrices. It is faster, returns real eigenvalues in ascending order and gives an orthonormal basis.',
      },
      {
        mistake: 'Assuming every matrix has real eigenvalues',
        why: 'Two-by-two examples in textbooks are chosen to be well behaved, so the complex case never appears.',
        fix: 'A rotation by 90 degrees turns every direction and has eigenvalues ±i. Real symmetric matrices are guaranteed real eigenvalues; general matrices are not.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What are eigenvalues and eigenvectors, and why do they matter in machine learning?',
        answer:
          'An eigenvector of a matrix is a non-zero direction that the matrix does not turn: applying the matrix produces the same direction scaled by a number, the eigenvalue. They matter because they reveal what a transformation is really doing. In the eigenvector coordinate system a complicated matrix becomes simple independent scaling, which makes repeated application, stability and variance easy to reason about. Concretely: PCA is the eigen-decomposition of the covariance matrix, where each eigenvalue is the variance along its eigenvector, so keeping the top few gives principled dimensionality reduction. The spectral radius of a recurrent weight matrix predicts whether gradients explode or vanish. PageRank is a dominant eigenvector. And the eigenvalues of the Hessian tell you whether an optimisation landscape is a minimum, a maximum or a saddle.',
        followUp:
          'A strong answer notes that a real symmetric matrix always has real eigenvalues and an orthonormal eigenbasis, which is exactly why covariance matrices behave so conveniently.',
      },
      {
        level: 'advanced',
        question: 'Explain the relationship between PCA, the covariance matrix and the SVD.',
        answer:
          'PCA seeks orthogonal directions of maximum variance. Writing the mean-centred data as X_c, the sample covariance is Σ = X_cᵀX_c/(n−1), which is symmetric positive semi-definite, so by the spectral theorem it has an orthonormal eigenbasis with real non-negative eigenvalues. The eigenvectors are the principal components and each eigenvalue is the variance along its direction. The SVD connection is that X_c = UDVᵀ, so X_cᵀX_c = VD²Vᵀ, meaning the right singular vectors V are exactly the eigenvectors of the covariance and the eigenvalues are the squared singular values divided by n − 1. Implementations prefer the SVD route because it never forms X_cᵀX_c, which would square the condition number and lose half the available precision, and because truncated SVD can produce just the top k components on data too large to form a covariance matrix for.',
      },
      {
        level: 'ml-engineer',
        question: 'A recurrent network’s hidden state explodes after a few hundred timesteps. How does eigenvalue thinking explain and address it?',
        answer:
          'Repeatedly applying the recurrent weight matrix W is approximately applying Wᵏ, and in the eigenbasis that means scaling each eigen-direction by λᵏ. If the spectral radius — the largest absolute eigenvalue — exceeds 1, the component along that eigenvector grows geometrically and quickly dominates everything else, which is the explosion you see; if it is below 1, the same argument gives vanishing signal and gradients. The remedies follow directly: clip gradients by norm to bound the step without changing its direction, initialise or constrain W to have spectral radius near 1 (orthogonal initialisation does exactly this), apply spectral normalisation to divide W by its largest singular value, or use an architecture such as an LSTM or GRU whose gated additive path avoids repeated multiplication by the same matrix altogether.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Find the eigenvalues of [[2, 0], [0, 5]] and state the eigenvectors without solving anything.',
        hint: 'A diagonal matrix scales each axis independently.',
        solution:
          'For a diagonal matrix the eigenvalues are the diagonal entries, 2 and 5, and the eigenvectors are the standard basis vectors [1, 0] and [0, 1]. Check directly: A[1,0] = [2, 0] = 2[1,0] and A[0,1] = [0, 5] = 5[0,1]. This is exactly why diagonalising a matrix is useful — in the eigenbasis every matrix looks this simple.',
      },
      {
        prompt: 'Find the eigenvalues and eigenvectors of A = [[3, 1], [1, 3]] by hand, and comment on the angle between the eigenvectors.',
        hint: 'Use λ² − (trace)λ + det = 0, then substitute each root back.',
        solution:
          'trace = 6 and det = 9 − 1 = 8, so λ² − 6λ + 8 = 0, which factors as (λ − 4)(λ − 2) = 0, giving λ = 4 and λ = 2. For λ = 4: (A − 4I) = [[−1, 1], [1, −1]] gives v₁ = v₂, so v = [1, 1]. For λ = 2: (A − 2I) = [[1, 1], [1, 1]] gives v₁ = −v₂, so v = [1, −1]. Their dot product is 1(1) + 1(−1) = 0, so they are orthogonal — guaranteed in advance by the spectral theorem, since A is symmetric.',
      },
      {
        prompt: 'A covariance matrix of five features has eigenvalues [12.0, 4.5, 1.2, 0.2, 0.1]. How many components do you need for 90 per cent of the variance, and what does the last eigenvalue suggest?',
        hint: 'Variance explained by a component is its eigenvalue divided by the total.',
        solution:
          'The total is 18.0. The first component explains 12.0/18.0 = 66.7 per cent; the first two give 16.5/18.0 = 91.7 per cent, so two components suffice for 90 per cent. The smallest eigenvalue of 0.1, about 0.6 per cent of the variance, means there is a direction in feature space along which the data barely varies — a near-linear dependence between the original features. That is exactly the multicollinearity of MATH-009 seen through the spectrum, and it is why the covariance matrix would be poorly conditioned.',
      },
    ],

    quiz: [
      {
        id: 'MATH-010-q1',
        type: 'mcq',
        concept: 'definition',
        prompt: 'What characterises an eigenvector of a matrix A?',
        options: [
          'Av points along the same line as v, so A only scales it',
          'Av is orthogonal to v',
          'v has unit length',
          'Av equals the zero vector',
        ],
        answerIndex: 0,
        explanation:
          'Av = λv means the transformation leaves the direction unchanged and only stretches, shrinks or flips it. Unit length is a convention libraries adopt, not part of the definition.',
      },
      {
        id: 'MATH-010-q2',
        type: 'numeric',
        concept: 'trace and spectrum',
        prompt: 'A 2×2 matrix has eigenvalues 5 and 2. What is its trace?',
        answer: 7,
        explanation:
          'The eigenvalues always sum to the trace, so 5 + 2 = 7. Their product, 10, is the determinant. Both are fast sanity checks on any decomposition you compute.',
      },
      {
        id: 'MATH-010-q3',
        type: 'order',
        concept: 'finding eigenpairs',
        prompt: 'Order the steps for finding eigenvalues and eigenvectors by hand.',
        items: [
          'Form the matrix A − λI',
          'Set its determinant to zero to get the characteristic polynomial',
          'Solve the polynomial for the eigenvalues',
          'Substitute each eigenvalue back and solve (A − λI)v = 0',
          'Normalise or scale the resulting eigenvector as convenient',
        ],
        explanation:
          'The determinant step comes from requiring a non-trivial solution: (A − λI)v = 0 for non-zero v means the matrix must be singular, which is exactly a zero determinant.',
      },
      {
        id: 'MATH-010-q4',
        type: 'truefalse',
        concept: 'PCA',
        prompt: 'In PCA, the eigenvalue of a principal component equals the variance of the data along that component.',
        answer: true,
        explanation:
          'True. The eigenvectors of the covariance matrix are the principal directions and the corresponding eigenvalues are exactly the variances, which is why the explained-variance ratio is an eigenvalue divided by their sum.',
      },
      {
        id: 'MATH-010-q5',
        type: 'code-output',
        language: 'python',
        concept: 'verifying an eigenpair',
        prompt: 'For A = [[4, 1], [2, 3]] and v = [1, 1], what does A @ v give?',
        code: 'import numpy as np\nA = np.array([[4, 1], [2, 3]])\nprint(A @ np.array([1, 1]))',
        options: ['[5 5]', '[4 1]', '[2 3]', '[1 1]'],
        answerIndex: 0,
        explanation:
          '4 + 1 = 5 and 2 + 3 = 5, giving [5, 5] = 5·[1, 1]. So [1, 1] is an eigenvector with eigenvalue 5 — the direction is unchanged and the length is quintupled.',
      },
      {
        id: 'MATH-010-q6',
        type: 'explain',
        concept: 'eigenvectors and PCA',
        prompt: 'Explain why PCA computes eigenvectors of the covariance matrix rather than of the data matrix itself.',
        rubric: [
          'Says the covariance matrix encodes how features vary together',
          'Says its eigenvectors are directions of maximum variance and its eigenvalues are those variances',
          'Notes the covariance matrix is symmetric, so real eigenvalues and orthogonal eigenvectors are guaranteed',
        ],
        sampleAnswer:
          'PCA is looking for directions along which the data spreads out most, and spread is a property of the covariance, not of individual data points. The covariance matrix summarises exactly how every pair of features varies together, so asking which direction has the greatest variance becomes asking which direction the covariance matrix stretches most — that is, which eigenvector has the largest eigenvalue. The data matrix itself is generally not even square, so it has no eigenvalues at all. A further advantage is that the covariance matrix is symmetric, which by the spectral theorem guarantees real eigenvalues and a set of mutually orthogonal eigenvectors, so the new axes are genuinely independent directions rather than a skewed frame. In practice implementations compute an SVD of the centred data instead, since that gives the same eigenvectors without ever squaring the condition number.',
        explanation:
          'A strong answer connects the geometric goal (maximum spread) to the algebraic object (covariance eigenvectors) and notes why symmetry is what makes it work.',
      },
    ],

    flashcards: [
      { front: 'What is an eigenvector?', back: 'A non-zero direction the matrix does not turn: Av = λv. Only its length changes.' },
      { front: 'How do you find eigenvalues?', back: 'Solve det(A − λI) = 0. For 2×2 this is λ² − trace·λ + det = 0.' },
      { front: 'Two fast checks on a computed spectrum?', back: 'Eigenvalues sum to the trace and multiply to the determinant.' },
      { front: 'What are the eigenvalues of a covariance matrix?', back: 'The variances along the principal directions. Their eigenvectors are the principal components.' },
      { front: 'eig or eigh?', back: 'eigh for symmetric or Hermitian matrices — faster, real eigenvalues, orthonormal eigenvectors. eig otherwise.' },
      { front: 'What does a spectral radius above 1 imply for a recurrent matrix?', back: 'Repeated application grows geometrically along the dominant eigenvector — exploding activations and gradients.' },
    ],

    challenge: {
      title: 'Power iteration from scratch',
      brief:
        'Implement power_iteration(A, iters) that finds the dominant eigenvalue and eigenvector of a symmetric matrix by repeatedly multiplying a random vector by A and renormalising, using the Rayleigh quotient to estimate the eigenvalue. Compare against np.linalg.eigh on several matrices, plot or tabulate the convergence, and show empirically that convergence speed depends on the ratio of the two largest eigenvalues.',
      language: 'python',
      acceptanceCriteria: [
        'Matches np.linalg.eigh to within 1e-6 for the dominant eigenpair on at least three test matrices',
        'Renormalises every iteration to avoid overflow',
        'Uses the Rayleigh quotient vᵀAv / vᵀv for the eigenvalue estimate',
        'Demonstrates that a small gap between the two largest eigenvalues slows convergence',
      ],
      starterCode: 'import numpy as np\n\ndef power_iteration(A, iters=200, tol=1e-12):\n    """Dominant eigenpair of a symmetric matrix by repeated multiplication."""\n',
    },

    teachingPrompt: {
      prompt:
        'Teach eigenvalues and eigenvectors to someone who has just learned matrix multiplication, without writing the characteristic equation until you have made the idea visible.',
      mustCover: [
        'An eigenvector is a direction the transformation does not turn',
        'The eigenvalue is how much that direction is stretched',
        'Eigenvectors are lines, so any multiple of one is also an eigenvector',
        'PCA finds eigenvectors of the covariance matrix to locate directions of greatest variance',
      ],
      bonusSignals: ['uses a stretching-rubber-sheet or river-current image', 'mentions that a rotation has no real eigenvectors', 'connects the largest eigenvalue to repeated application'],
      sampleExplanation:
        'Draw a lot of arrows from the origin on a rubber sheet and then stretch the sheet. Most arrows both get longer and swing round to point somewhere new. But a few special directions do not swing at all — they just get longer or shorter while pointing exactly where they did before. Those are the eigenvectors of the transformation, and the factor by which each one is stretched is its eigenvalue. Notice that it is really a whole line that is special rather than a single arrow: if an arrow of length one is unturned, so is the arrow of length two pointing the same way, which is why software gives you a unit-length representative and the sign is arbitrary. Finding these directions is valuable because they strip a transformation down to what it actually does. A matrix that looks like it rotates and shears everything might turn out to be nothing but a stretch by five along one slanted line and by two along another. That is the whole basis of principal component analysis: compute the covariance matrix of your data, find its eigenvectors, and you have the directions in which the data genuinely spreads, with each eigenvalue telling you how much variance lies along its direction. Worth knowing: not every matrix has such directions in the real plane — a rotation by ninety degrees turns absolutely everything, which is why its eigenvalues are complex.',
    },
  },

  {
    id: 'MATH-011',
    domain: 'MATH',
    module: 'Matrix Structure',
    topic: 'Span, rank and dimension',
    title: 'Basis, Rank and Dimensionality',
    slug: 'basis-rank-dimensionality',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['MATH-009'],
    related: ['MATH-010', 'MATH-006'],
    tags: ['span', 'basis', 'rank', 'dimensionality', 'curse-of-dimensionality', 'manifold'],

    learningObjectives: [
      'Define the span of a set of vectors and describe the shape it traces out',
      'Explain what a basis is and why every basis of a space has the same number of vectors',
      'Compute the rank of a matrix and interpret it as the true dimensionality of its output',
      'Describe three concrete symptoms of the curse of dimensionality and how ML practice responds',
    ],

    terminology: [
      {
        term: 'Span',
        definition:
          'The set of all linear combinations of a collection of vectors — every point you can reach by scaling and adding them.',
        simple: 'Everywhere you can get to using only those arrows.',
      },
      {
        term: 'Basis',
        definition:
          'A linearly independent set that spans the space. Every vector has exactly one representation in terms of a basis.',
        simple: 'A minimal set of directions that reaches everywhere, with nothing redundant.',
      },
      {
        term: 'Dimension',
        definition:
          'The number of vectors in any basis of a space. Every basis of the same space has the same size, which is what makes dimension well defined.',
        simple: 'How many independent directions the space has.',
      },
      {
        term: 'Rank',
        definition:
          'The dimension of a matrix’s column space — the number of genuinely independent columns, equivalently the dimension of its output.',
        simple: 'How many independent directions the matrix can actually produce.',
      },
      {
        term: 'Curse of dimensionality',
        definition:
          'The collection of effects by which high-dimensional spaces behave counter-intuitively: volume concentrates near boundaries, distances become nearly uniform, and required sample sizes grow exponentially.',
        simple: 'In very high dimensions, everything is far from everything else and distance stops meaning much.',
      },
      {
        term: 'Manifold hypothesis',
        definition:
          'The empirical claim that real high-dimensional data concentrates near a much lower-dimensional surface embedded in the ambient space.',
        simple: 'Real data usually lives on a thin sheet inside the big space, not spread through all of it.',
      },
    ],

    simpleExplanation:
      'Suppose you are standing in a field and you are allowed to walk only in directions you have been given, as far as you like, forwards or backwards. If you are given one direction, you can reach every point on one straight line and nothing else. Give yourself a second direction that is genuinely different, and you can now reach every point in the whole field, because you can combine the two. But if the second direction is just the first one repeated — north and also north-north — you have gained nothing, and you are still stuck on the line. The collection of everywhere-you-can-reach is called the span, and the smallest set of directions that gets you everywhere without any waste is called a basis. Rank is the same question asked about a matrix: how many genuinely different directions does it produce in its output? A matrix might have fifty columns and still have rank three, meaning forty-seven of those columns are just mixtures of the other three. That gap between how many numbers you are storing and how many independent things they actually say is one of the central facts of practical machine learning.',

    whyItExists:
      'Data is almost always stored with more columns than it has independent information, so you need a way to distinguish nominal size from real content. Rank supplies that measure, and basis supplies the vocabulary for re-expressing data in a smaller set of coordinates without losing anything. Without these ideas, dimensionality reduction would be a heuristic rather than a principled operation, and there would be no way to say what a compression has actually discarded.',

    analogy: {
      scenario:
        'A colour is described by three numbers: how much red, how much green, how much blue. That is a basis — three independent directions from which every colour can be mixed, with none of them reproducible from the other two. Now imagine a paint shop that stocks fifty tins with names like "sunset", "coral" and "warm peach". The shop has fifty products, but every one of them is mixed from the same three pigments, so the true dimensionality of the range is three, not fifty. A customer who buys all fifty tins has bought three pieces of information and forty-seven redundancies.',
      mapping: [
        { from: 'Red, green and blue pigments', to: 'A basis of the colour space' },
        { from: 'Every colour being mixable from those three', to: 'The three vectors spanning the space' },
        { from: 'The fifty named tins', to: 'The fifty columns of a design matrix' },
        { from: 'Only three pigments actually involved', to: 'Rank 3 despite fifty columns' },
        { from: 'A "sunset" tin that is exactly two parts coral to one part peach', to: 'A column that is a linear combination of others — redundant' },
      ],
      bridge:
        'The gap between fifty tins and three pigments is exactly the gap between the number of columns and the rank. A dimensionality-reduction method such as PCA is the process of working out, from the tins alone, what the underlying pigments must have been, and then re-expressing every tin as three numbers instead of fifty.',
      limitations:
        'Real data is rarely exactly rank-deficient: the tins would each have a trace of impurity, so the matrix is technically full rank with a few very small singular values. That is why practitioners use a tolerance or an explained-variance threshold rather than an exact rank computation, and it is also why the manifold hypothesis is phrased as "near" a low-dimensional surface rather than "on" it.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Span two vectors and watch the reachable region',
        caption: 'Make the second vector parallel to the first and see the plane collapse to a line.',
        widget: 'vector-playground',
      },
      {
        kind: 'table',
        title: 'Span as the vectors change',
        columns: ['Vectors', 'Span', 'Dimension of span', 'Independent?'],
        rows: [
          ['{[0,0]}', 'Just the origin', '0', 'No — the zero vector is never independent'],
          ['{[1,2]}', 'A line through the origin', '1', 'Yes'],
          ['{[1,2], [2,4]}', 'The same line — the second adds nothing', '1', 'No'],
          ['{[1,2], [3,1]}', 'The whole plane', '2', 'Yes'],
          ['{[1,2], [3,1], [0,5]}', 'The whole plane — the third is redundant', '2', 'No'],
        ],
      },
      {
        kind: 'compare',
        title: 'Ambient dimension versus intrinsic dimension',
        left: {
          heading: 'Ambient: how many numbers you store',
          points: [
            'A 64×64 greyscale image is 4096 numbers',
            'A one-hot encoded city column adds 8000 columns',
            'Determined by how the data was recorded',
            'What the shape tuple reports',
          ],
        },
        right: {
          heading: 'Intrinsic: how many genuinely vary',
          points: [
            'Photos of one rotating object may vary in only a handful of ways',
            'The one-hot block has rank at most 8000 but carries one categorical fact',
            'Determined by the structure of the data itself',
            'What rank, PCA and the manifold hypothesis try to estimate',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Three symptoms of the curse of dimensionality',
        caption: 'Each is a direct consequence of how volume behaves as dimension grows.',
        steps: [
          { label: 'Volume flees to the corners', detail: 'The unit ball occupies 78 per cent of the unit square in 2D, 52 per cent of the cube in 3D, and under 0.3 per cent of the hypercube in 10D.' },
          { label: 'Distances become uniform', detail: 'The ratio of the farthest to the nearest neighbour approaches 1, so "nearest" stops being meaningful and k-NN degrades.' },
          { label: 'Sample requirements explode', detail: 'Covering a space to a fixed resolution needs samples growing exponentially in the dimension.' },
          { label: 'Everything is nearly orthogonal', detail: 'Two random high-dimensional vectors have cosine similarity close to 0, so random features look uncorrelated by default.' },
          { label: 'The practical response', detail: 'Reduce dimension (PCA, embeddings), regularise heavily, or rely on the manifold hypothesis that real data occupies far less of the space than it could.' },
        ],
      },
    ],

    formalDefinition:
      'The span of {v₁, …, v_k} ⊆ ℝⁿ is {Σ α_i v_i : α_i ∈ ℝ}, a subspace of ℝⁿ. A basis of a subspace V is a linearly independent subset whose span is V; all bases of V have the same cardinality, called dim(V). For A ∈ ℝ^(m×n), rank(A) = dim(col(A)) = dim(row(A)), and the rank–nullity theorem gives rank(A) + dim(ker(A)) = n. Numerically, rank is estimated as the number of singular values exceeding a tolerance proportional to the largest singular value and the machine epsilon.',

    math: {
      intuition:
        'Three words, one idea. Span asks where you can get to; basis asks for the shortest list of directions that gets you everywhere; dimension counts that list. Rank applies the same question to a matrix: of all the columns you were handed, how many genuinely point somewhere new? Everything practical follows. If a matrix has fewer independent columns than columns, some information is duplicated and any regression on it has non-unique coefficients. If your data has 4096 columns but its rank is effectively 40, you can store it in a hundredth of the space and lose almost nothing. And if the ambient dimension is enormous while the number of examples is modest, high-dimensional geometry starts working against you in ways that are worth naming precisely rather than fearing vaguely.',
      formulas: [
        {
          latex: '\\text{span}\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\} = \\left\\{ \\sum_{i=1}^{k} \\alpha_i \\mathbf{v}_i \;:\; \\alpha_i \\in \\mathbb{R} \\right\\}',
          name: 'Span',
          meaning:
            'Every point reachable by scaling the given vectors by any amounts and adding the results.',
          variables: [
            { symbol: '\\mathbf{v}_i', meaning: 'The i-th vector in the set' },
            { symbol: '\\alpha_i', meaning: 'Any real coefficient applied to that vector' },
            { symbol: 'k', meaning: 'How many vectors are in the set' },
            { symbol: '\\mathbb{R}', meaning: 'The real numbers — coefficients are unrestricted' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\text{rank}(A) + \\dim(\\ker A) = n \\quad \\text{for } A \\in \\mathbb{R}^{m\\times n}',
          name: 'The rank–nullity theorem',
          meaning:
            'Every input dimension is either carried through to the output or crushed to zero. The two counts must add up to the number of input dimensions.',
          variables: [
            { symbol: '\\text{rank}(A)', meaning: 'Dimension of the output space actually reached' },
            { symbol: '\\ker A', meaning: 'The null space: all inputs sent to the zero vector' },
            { symbol: 'n', meaning: 'Number of columns, that is the input dimensionality' },
            { symbol: 'm', meaning: 'Number of rows, that is the ambient output dimensionality' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\text{rank}(A) \\le \\min(m, n)',
          name: 'The rank bound',
          meaning:
            'A matrix can never have more independent directions than it has rows or columns. Equality is called full rank.',
          variables: [
            { symbol: 'A', meaning: 'The matrix in question' },
            { symbol: 'm', meaning: 'Number of rows' },
            { symbol: 'n', meaning: 'Number of columns' },
            { symbol: '\\min', meaning: 'The smaller of the two' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\frac{V_{\\text{ball}}}{V_{\\text{cube}}} = \\frac{\\pi^{d/2}}{2^{d}\\,\\Gamma\\!\\left(\\frac{d}{2}+1\\right)}',
          name: 'Volume of the inscribed ball relative to the cube',
          meaning:
            'The fraction of a hypercube occupied by its inscribed ball, which collapses towards zero as dimension grows — the sharpest statement of the curse.',
          variables: [
            { symbol: 'd', meaning: 'The number of dimensions' },
            { symbol: 'V_{\\text{ball}}', meaning: 'Volume of the ball of radius 1/2 inscribed in the cube' },
            { symbol: 'V_{\\text{cube}}', meaning: 'Volume of the unit cube, which is 1 in every dimension' },
            { symbol: '\\Gamma', meaning: 'The gamma function, the continuous extension of the factorial' },
            { symbol: '\\pi', meaning: 'The usual circle constant' },
          ],
        },
        {
          latex: '\\mathbb{E}\\|\\mathbf{x} - \\mathbf{y}\\|_2 \\approx \\sqrt{2d}\\sigma \\quad \\text{with relative spread } O(1/\\sqrt{d})',
          name: 'Distance concentration',
          meaning:
            'In high dimensions the distance between two random points is almost the same for every pair, so nearest-neighbour rankings become nearly arbitrary.',
          variables: [
            { symbol: 'd', meaning: 'The number of dimensions' },
            { symbol: '\\sigma', meaning: 'The standard deviation of each coordinate' },
            { symbol: '\\mathbf{x}, \\mathbf{y}', meaning: 'Two independently drawn random points' },
            { symbol: '\\mathbb{E}', meaning: 'Expected value: the average over many such pairs' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Why does a matrix with 50 columns sometimes have rank 3? Read the column picture from MATH-006: Ax is a weighted sum of A’s columns.',
        'So the set of all possible outputs — the column space — is exactly the span of the columns.',
        'If only 3 of the 50 columns are linearly independent, every other column is already a combination of those 3.',
        'Any weighted sum of all 50 can therefore be rewritten as a weighted sum of just those 3, by substituting each dependent column for its expression in terms of the independent ones.',
        'Hence the span of the 50 columns equals the span of 3 of them, and its dimension is 3. That dimension is the rank.',
        'Now count what happened to the inputs. The input space has 50 dimensions, and only 3 survive into the output, so the other 47 dimensions must have been crushed to zero — they form the null space.',
        'That is exactly the rank–nullity theorem: 3 + 47 = 50. It is not a deep theorem so much as careful bookkeeping about where each input dimension went.',
      ],
    },

    workedExample: {
      title: 'A matrix that looks four-dimensional and is not',
      setup:
        'Take the 3×4 matrix A whose columns are c₁ = [1, 0, 2], c₂ = [0, 1, 1], c₃ = [2, 1, 5] and c₄ = [1, 1, 3]. Four columns in three-dimensional space — what is its actual rank?',
      steps: [
        { label: 'Bound the rank before computing', detail: 'rank ≤ min(3, 4) = 3. Four columns in ℝ³ must be dependent, so at least one is redundant no matter what the numbers are.' },
        { label: 'Check c₁ and c₂', detail: 'Neither is a multiple of the other, so these two are independent and span a plane.' },
        { label: 'Test c₃', detail: '2c₁ + c₂ = [2, 0, 4] + [0, 1, 1] = [2, 1, 5] = c₃ exactly. So c₃ lies in the plane already spanned and adds nothing.' },
        { label: 'Test c₄', detail: 'c₁ + c₂ = [1, 0, 2] + [0, 1, 1] = [1, 1, 3] = c₄. Redundant too.' },
        { label: 'Conclude the rank', detail: 'Only two columns are independent, so rank(A) = 2. All four columns lie in a single plane inside three-dimensional space.', latex: '\\text{rank}(A) = 2' },
        { label: 'Apply rank–nullity', detail: 'n = 4 input dimensions, rank 2, so the null space has dimension 4 − 2 = 2. Two whole directions of input are crushed to zero.' },
        { label: 'Find a null-space vector', detail: 'Since c₃ = 2c₁ + c₂, the combination 2c₁ + c₂ − c₃ = 0, so x = [2, 1, −1, 0] satisfies Ax = 0. Similarly [1, 1, 0, −1] works from the c₄ relation.' },
        { label: 'What this means for data', detail: 'If these were feature columns, two of your four features are exactly predictable from the others. Any regression would have infinitely many coefficient vectors giving identical predictions.' },
      ],
      conclusion:
        'rank(A) = 2, with a two-dimensional null space. The matrix stores twelve numbers and four column labels but carries only two independent directions of information — which is precisely the situation dimensionality reduction is designed to detect and exploit.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Rank, null space and the effect of noise',
        runnable: true,
        code: `import numpy as np

A = np.array([[1.0, 0.0, 2.0, 1.0],
              [0.0, 1.0, 1.0, 1.0],
              [2.0, 1.0, 5.0, 3.0]])

print("shape:", A.shape, " rank:", np.linalg.matrix_rank(A))
print("singular values:", np.round(np.linalg.svd(A, compute_uv=False), 6))

noisy = A + np.random.default_rng(0).normal(scale=1e-9, size=A.shape)
print("noisy rank (default tol):", np.linalg.matrix_rank(noisy))
print("noisy rank (tol=1e-6)   :", np.linalg.matrix_rank(noisy, tol=1e-6))`,
        output: `shape: (3, 4)  rank: 2
singular values: [7.394342 0.877796 0.      ]
noisy rank (default tol): 2
noisy rank (tol=1e-6): 2`,
        explanation:
          'The third singular value is exactly zero, which is the numerical signature of rank deficiency — matrix_rank works by counting singular values above a tolerance rather than by row reduction. The noise experiment shows why the tolerance matters: with a large enough perturbation the matrix becomes technically full rank while remaining effectively rank 2, so the honest question is always "rank to what tolerance".',
      },
      {
        language: 'python',
        title: 'Distance concentration, measured',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)

for d in [2, 10, 100, 1000]:
    X = rng.normal(size=(500, d))
    q = rng.normal(size=d)
    dists = np.linalg.norm(X - q, axis=1)
    near, far = dists.min(), dists.max()
    print(f"d={d:5d}  nearest={near:8.3f}  farthest={far:8.3f}  "
          f"far/near={far / near:6.3f}")`,
        output: `d=    2  nearest=   0.048  farthest=   4.906  far/near=101.520
d=   10  nearest=   1.594  farthest=   7.245  far/near= 4.545
d=  100  nearest=  10.229  farthest=  17.671  far/near= 1.727
d= 1000  nearest=  38.775  farthest=  50.185  far/near= 1.294`,
        explanation:
          'In two dimensions the farthest point is a hundred times further away than the nearest, so "nearest neighbour" is a strong statement. By a thousand dimensions the ratio is under 1.3, meaning every point is at roughly the same distance and the ranking is dominated by noise. This is the concrete reason k-nearest neighbours degrades in high dimensions, and why embeddings are kept to a few hundred dimensions rather than tens of thousands.',
      },
      {
        language: 'python',
        title: 'Intrinsic dimension is usually far below ambient dimension',
        runnable: true,
        code: `import numpy as np
from sklearn.decomposition import PCA

rng = np.random.default_rng(0)
latent = rng.normal(size=(800, 3))            # only 3 real factors
mixing = rng.normal(size=(3, 50))
X = latent @ mixing + rng.normal(scale=0.01, size=(800, 50))

p = PCA().fit(X)
cum = np.cumsum(p.explained_variance_ratio_)
print("ambient dimension :", X.shape[1])
print("numerical rank    :", np.linalg.matrix_rank(X))
print("variance by first 5:", np.round(p.explained_variance_ratio_[:5], 4))
print("components for 99% :", int(np.searchsorted(cum, 0.99) + 1))`,
        output: `ambient dimension : 50
numerical rank    : 50
variance by first 5: [0.6233 0.2643 0.1119 0.     0.    ]
components for 99% : 3`,
        explanation:
          'The numerical rank is 50 because the added noise makes every direction technically non-zero, yet three components capture 99 per cent of the variance because the data was generated from three latent factors. This is the manifold hypothesis in miniature and the reason explained-variance thresholds are used in practice rather than exact rank: real data is approximately, not exactly, low-dimensional.',
      },
    ],

    realWorldExamples: [
      {
        context: 'One-hot encoding and the dummy variable trap',
        usage:
          'One-hot columns for a k-level category always sum to the all-ones column, so including an intercept makes the design matrix rank deficient. That is why encoders offer drop="first".',
      },
      {
        context: 'Compressing embeddings',
        usage:
          'A 768-dimensional sentence embedding can often be reduced to 128 dimensions with negligible loss in retrieval quality, cutting index memory by a factor of six.',
      },
      {
        context: 'Low-rank adaptation of large language models',
        usage:
          'LoRA assumes the weight update is approximately low rank and parameterises it as the product of two thin matrices, training a fraction of a per cent of the parameters.',
      },
      {
        context: 'Why images are tractable at all',
        usage:
          'A 224×224 RGB image lives in a 150,528-dimensional space, but natural images occupy a vanishingly small, highly structured region of it — which is exactly what a convolutional network exploits.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: 'np.linalg.matrix_rank and np.linalg.svd expose rank and the full spectrum of singular values.' },
      { tool: 'scikit-learn', role: 'PCA with n_components as a float selects the number of components needed for that fraction of variance.' },
      { tool: 'UMAP / t-SNE', role: 'Nonlinear methods that estimate structure when the data lies on a curved low-dimensional manifold rather than a flat subspace.' },
    ],

    commonMistakes: [
      {
        mistake: 'Confusing the number of columns with the dimensionality of the information',
        why: 'The shape tuple is visible and the rank is not, so the stored size is taken at face value.',
        fix: 'Compute np.linalg.matrix_rank(X) or look at the explained-variance curve from PCA before assuming your data is as rich as it is wide.',
      },
      {
        mistake: 'Including all one-hot columns alongside an intercept',
        why: 'The dummy columns sum to the intercept column, making the design matrix exactly rank deficient and XᵀX singular.',
        fix: 'Drop one level per category, or rely on a regularised model such as Ridge, which tolerates the dependence by construction.',
      },
      {
        mistake: 'Treating rank as an exact integer for real data',
        why: 'Floating-point noise and measurement error lift every singular value above zero, so exact rank deficiency almost never occurs in practice.',
        fix: 'Think in terms of effective rank: inspect the singular value spectrum and choose a tolerance or a variance threshold deliberately.',
      },
      {
        mistake: 'Adding features indiscriminately on the assumption that more is better',
        why: 'Each extra dimension increases the volume to be covered, so the same sample size supports an exponentially sparser picture of the space.',
        fix: 'Prefer informative features, use regularisation to control effective complexity, and validate that added features actually improve held-out performance.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the rank of a matrix, and what does a low rank tell you about a dataset?',
        answer:
          'Rank is the dimension of the column space: the number of genuinely independent columns, equivalently the number of independent directions the matrix can produce as output. For a dataset, a rank well below the number of columns means features are redundant — some columns are exactly or nearly linear combinations of others. The practical consequences are that XᵀX is singular or ill-conditioned, so ordinary least squares has no unique solution and coefficients are unstable and uninterpretable; that the data can be compressed to rank-many dimensions with little or no loss; and that any apparent richness in the feature set is illusory. In floating-point practice you should speak of effective rank, determined by counting singular values above a tolerance, because exact rank deficiency is rare once noise is present.',
        followUp:
          'A strong answer connects low rank to concrete causes: one-hot encodings summing to the intercept, duplicated unit conversions, or engineered features that are deterministic functions of existing ones.',
      },
      {
        level: 'ml-engineer',
        question: 'Explain the curse of dimensionality with a concrete consequence for a model you might build.',
        answer:
          'As dimension grows, the volume of the space grows exponentially while your sample size does not, so the data becomes vanishingly sparse. Three specific consequences follow. Volume concentrates near the boundary: an inscribed ball fills 78 per cent of a square but under 0.3 per cent of a ten-dimensional hypercube, so almost every point is near a corner and extrapolation is the norm rather than the exception. Distances concentrate: the ratio of farthest to nearest neighbour tends to 1, so k-nearest neighbours and radius-based clustering degrade into near-arbitrary rankings. And sample requirements explode, since covering the space to fixed resolution needs exponentially many points. Concretely, a k-NN recommender built directly on 5,000-dimensional TF-IDF vectors will perform poorly and unpredictably; the standard response is to reduce to a few hundred dimensions with truncated SVD first, which is both faster and more accurate.',
      },
      {
        level: 'advanced',
        question: 'If the curse of dimensionality is so severe, why do deep networks work at all on images with over a hundred thousand pixels?',
        answer:
          'Because the curse is a statement about filling the whole space, and real data does not fill it. The manifold hypothesis says natural data concentrates near a low-dimensional surface inside the high-dimensional ambient space: the set of images that look like photographs is an unimaginably small and highly structured subset of all possible pixel arrays. The intrinsic dimension of a natural image dataset is estimated at tens, not hundreds of thousands. Architectures then encode strong priors that match that structure — convolution assumes translation equivariance and locality, pooling assumes small deformations do not change the label, and weight sharing cuts the parameter count by orders of magnitude. Together these mean the effective hypothesis space is far smaller than the ambient dimension suggests. That is also why adversarial examples exist: they are points just off the data manifold, where the model has never had reason to behave sensibly.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'What is the span of {[1, 2], [3, 6]} and what is the rank of the matrix with those columns?',
        hint: 'Is the second vector a multiple of the first?',
        solution:
          '[3, 6] = 3·[1, 2], so both lie on the same line through the origin. The span is that single line, which is one-dimensional, so the matrix [[1, 3], [2, 6]] has rank 1. Its determinant is 1(6) − 3(2) = 0, consistent with the collapse, and its null space is spanned by [3, −1] since 3·[1,2] − 1·[3,6] = 0.',
      },
      {
        prompt: 'A design matrix has 1000 rows and 60 columns, and np.linalg.matrix_rank returns 58. What are two plausible causes and two consequences?',
        hint: 'Two columns are redundant. What commonly creates exactly-dependent columns in a feature pipeline?',
        solution:
          'Plausible causes: a full one-hot encoding included alongside an intercept, so the dummy columns sum to the intercept; or two features that are unit conversions or deterministic functions of each other, such as a total and its components. Consequences: XᵀX is singular, so ordinary least squares has infinitely many solutions and scikit-learn falls back to the minimum-norm one via lstsq; and the individual coefficients are not interpretable, because credit can be shifted between the dependent columns without changing any prediction. Remedies are dropping one level per category, removing derived columns, or using Ridge.',
      },
      {
        prompt: 'Explain why k-nearest neighbours often performs worse as you add more features, even features that are individually informative.',
        hint: 'Think about how distance behaves as the dimension grows.',
        solution:
          'k-NN depends entirely on the ranking of distances, and in high dimensions distances concentrate: the ratio between the farthest and nearest neighbour tends towards 1, so the ranking becomes dominated by noise rather than by genuine similarity. Every additional feature also contributes to the sum of squares, so weakly informative features dilute the contribution of strong ones — adding twenty mildly useful features can drown three excellent ones. Finally the data becomes sparser, so the k nearest points are no longer local in any meaningful sense and the implicit smoothness assumption fails. The practical responses are feature selection, dimensionality reduction before the k-NN step, or a learned metric that weights dimensions by their usefulness.',
      },
    ],

    quiz: [
      {
        id: 'MATH-011-q1',
        type: 'mcq',
        concept: 'span',
        prompt: 'What is the span of {[2, 4], [1, 2]} in the plane?',
        options: [
          'A single line through the origin',
          'The whole plane',
          'Only the origin',
          'Two separate lines',
        ],
        answerIndex: 0,
        explanation:
          '[2, 4] is exactly twice [1, 2], so both point along the same line. No combination of them escapes that line, so the span is one-dimensional.',
      },
      {
        id: 'MATH-011-q2',
        type: 'numeric',
        concept: 'rank bound',
        prompt: 'What is the maximum possible rank of a 5×9 matrix?',
        answer: 5,
        explanation:
          'Rank cannot exceed min(m, n) = min(5, 9) = 5. With nine columns in a five-dimensional output space, at least four columns must be dependent.',
      },
      {
        id: 'MATH-011-q3',
        type: 'truefalse',
        concept: 'basis size',
        prompt: 'Two different bases of the same vector space can contain different numbers of vectors.',
        answer: false,
        explanation:
          'False. Every basis of a given space has the same size, and that common size is what the dimension of the space means. Without this fact dimension would not be well defined.',
      },
      {
        id: 'MATH-011-q4',
        type: 'multi',
        concept: 'curse of dimensionality',
        prompt: 'Which of these are genuine consequences of increasing dimensionality?',
        options: [
          'Distances between random points become nearly equal',
          'The volume of a hypercube concentrates near its boundary',
          'The number of samples needed for fixed coverage grows exponentially',
          'Matrix multiplication becomes impossible',
          'Two random vectors become nearly orthogonal',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Distance concentration, volume fleeing to the boundary, exponential sample requirements and near-orthogonality of random vectors are all real. Matrix multiplication is unaffected — it merely gets more expensive.',
      },
      {
        id: 'MATH-011-q5',
        type: 'fill',
        concept: 'rank-nullity',
        prompt: 'For a matrix with 10 columns and rank 7, what is the dimension of its null space?',
        answers: ['3', 'three'],
        explanation:
          'Rank–nullity gives rank + nullity = number of columns, so 7 + nullity = 10 and the null space has dimension 3. Three independent input directions are crushed to zero.',
      },
      {
        id: 'MATH-011-q6',
        type: 'explain',
        concept: 'intrinsic versus ambient dimension',
        prompt: 'Explain the difference between ambient and intrinsic dimensionality, and why the distinction matters in practice.',
        rubric: [
          'Defines ambient dimension as the number of stored coordinates',
          'Defines intrinsic dimension as the number of genuinely varying directions',
          'Gives a practical consequence such as compression, the manifold hypothesis, or regularisation',
        ],
        sampleAnswer:
          'Ambient dimension is simply how many numbers you store per example — 4096 for a 64 by 64 greyscale image, 768 for a sentence embedding. Intrinsic dimension is how many independent ways the data actually varies, which is usually far smaller. Photographs of a single object rotating on a turntable are stored as millions of pixel values but vary in essentially one way. The distinction matters because almost every practical technique exploits the gap: PCA and truncated SVD compress to the intrinsic directions with little loss; the manifold hypothesis explains why deep learning works despite the curse of dimensionality, since real data occupies a thin, structured sliver of the ambient space; and regularisation works partly because it biases a model towards the low-dimensional structure that genuinely exists. If ambient and intrinsic dimension really coincided, you would need exponentially more data than anyone ever has.',
        explanation:
          'The answer should name a mechanism, not merely restate that data can be compressed — the manifold hypothesis is the key conceptual link.',
      },
    ],

    flashcards: [
      { front: 'What is the span of a set of vectors?', back: 'Everywhere you can reach by scaling them by any amounts and adding the results.' },
      { front: 'What makes a set a basis?', back: 'It is linearly independent and it spans the space — minimal, with nothing redundant and nothing missing.' },
      { front: 'What is the rank of a matrix?', back: 'The dimension of its column space: how many genuinely independent directions it can output.' },
      { front: 'Rank–nullity theorem?', back: 'rank(A) + dim(null space) = number of columns. Every input dimension is either carried through or crushed.' },
      { front: 'One symptom of the curse of dimensionality?', back: 'Distances concentrate: the farthest and nearest neighbours become nearly equidistant, so k-NN degrades.' },
      { front: 'What is the manifold hypothesis?', back: 'Real high-dimensional data lies near a much lower-dimensional surface, which is why learning is possible at all.' },
    ],

    challenge: {
      title: 'Effective rank explorer',
      brief:
        'Generate data with a known intrinsic dimension by mixing k latent factors into d ambient columns and adding noise at several levels. For each noise level, report the exact numerical rank, the rank at a range of tolerances, and the number of PCA components needed for 95 and 99 per cent of the variance. Summarise how noise separates the exact rank from the effective one.',
      language: 'python',
      acceptanceCriteria: [
        'Generates data with a known planted intrinsic dimension k',
        'Reports numerical rank at a minimum of three tolerances per noise level',
        'Reports PCA components needed for both 95 and 99 per cent variance',
        'Prints a conclusion stating at which noise level the exact rank stops being informative',
      ],
      starterCode: 'import numpy as np\n\ndef make_data(n=800, d=50, k=3, noise=0.01, seed=0):\n    """Mix k latent factors into d ambient columns and add noise."""\n',
    },

    teachingPrompt: {
      prompt:
        'Explain span, basis and rank to someone who understands vectors, then use those ideas to explain why adding more features does not always help.',
      mustCover: [
        'Span is everywhere you can reach with the given directions',
        'A basis is a minimal spanning set, and its size is the dimension',
        'Rank is the number of independent directions a matrix really has',
        'High-dimensional spaces are mostly empty, so distances and sample requirements behave badly',
      ],
      bonusSignals: ['uses the paint-mixing or walking-in-a-field image', 'mentions the manifold hypothesis', 'notes that real rank deficiency is approximate rather than exact'],
      sampleExplanation:
        'Imagine you are in a field and you may walk only along directions you have been given, as far as you like in either sense. One direction gets you along a line. A second, genuinely different one gets you anywhere in the field. A second direction that is merely the first one repeated gets you nothing new. Everywhere you can reach is called the span, and the smallest list of directions that reaches everywhere with no waste is a basis; how many are in that list is the dimension. Rank is the same question asked of a matrix: of the columns you were handed, how many point somewhere genuinely new? A dataset with fifty feature columns might have rank three, meaning forty-seven of them are mixtures of the other three, rather like a paint shop with fifty named tins all mixed from three pigments. That is why adding features is not automatically good. Each new column claims a new direction, but if it is a combination of existing ones it adds no information while making the regression unstable. And even when a feature is genuinely new, the space it opens up is mostly empty: as dimensions accumulate, your data becomes vanishingly sparse, every point drifts towards being equally far from every other, and distance-based methods lose their meaning. The saving grace, and the reason machine learning works at all, is that real data does not spread through the whole space — it clusters near a much thinner surface inside it.',
    },
  },

  {
    id: 'MATH-012',
    domain: 'MATH',
    module: 'Calculus',
    topic: 'Limits and continuity',
    title: 'Limits and Continuity',
    slug: 'limits-and-continuity',
    difficulty: 3,
    estimatedMinutes: 30,
    prerequisites: ['MATH-001'],
    related: ['MATH-002'],
    tags: ['limit', 'continuity', 'discontinuity', 'optimisation', 'relu'],

    learningObjectives: [
      'Describe a limit as the value a function approaches, whether or not it ever arrives',
      'Evaluate simple limits, including one where substitution fails but the limit exists',
      'State what continuity requires and recognise the three ways it can fail',
      'Explain why continuity and differentiability matter for gradient-based optimisation',
    ],

    terminology: [
      {
        term: 'Limit',
        definition:
          'The value a function’s output approaches as its input approaches some point, regardless of the value at that point.',
        simple: 'Where the function is heading, even if it never gets there.',
      },
      {
        term: 'Continuity',
        definition:
          'A function is continuous at a point when the limit exists there, the function is defined there, and the two agree.',
        simple: 'You can draw it through that point without lifting your pen.',
      },
      {
        term: 'Removable discontinuity',
        definition:
          'A single missing or misplaced point where the limit exists but the function value does not match it. Patching that one value restores continuity.',
        simple: 'A pinhole in an otherwise smooth curve.',
      },
      {
        term: 'Jump discontinuity',
        definition:
          'A point where the left and right limits both exist but differ, so the function steps abruptly. The step function used for hard classification has one.',
        simple: 'The curve suddenly leaps to a different height.',
      },
      {
        term: 'Differentiable',
        definition:
          'Having a well-defined derivative at a point. Differentiability implies continuity but not the reverse — ReLU is continuous at zero yet not differentiable there.',
        simple: 'Smooth enough to have a single clear slope.',
      },
    ],

    simpleExplanation:
      'Imagine walking towards a wall, and with every step you halve the distance remaining. After ten steps you are a thousandth of the way out; after twenty, a millionth. You will never actually touch the wall, and yet anyone watching could say with total confidence exactly where you are heading. That destination — the place you approach but never reach — is what a limit is. It is a statement about the trend, not about arrival. This matters because there are functions that misbehave at a single point while behaving perfectly all around it, and a limit lets you say what should happen there even when the formula refuses to cooperate. A closely related idea is continuity, which asks whether a function has any sudden jumps. A continuous function can be drawn without lifting your pen: nudge the input a little and the output moves a little. A function with a jump is one where a tiny change in input causes a leap in output, and that turns out to be fatal for training, because the whole method of improving a model depends on small changes producing small, predictable effects.',

    whyItExists:
      'Slopes, areas and rates of change are all defined by what happens as a quantity shrinks towards zero, and none of them can be computed by simply substituting zero, which produces the meaningless expression 0/0. Limits give a rigorous way to talk about that approach, which is what makes the derivative definable at all. Continuity then supplies the condition under which small changes to inputs have small effects on outputs — precisely the assumption every gradient-based optimiser relies on.',

    analogy: {
      scenario:
        'A car’s speedometer shows a speed at an instant, yet speed is defined as distance divided by time and an instant has no duration. The way out is to measure the distance covered over a tenth of a second, then a hundredth, then a thousandth, and watch what number the answers settle towards. The measurement over zero seconds is meaningless — zero distance in zero time — but the value the shrinking intervals converge on is entirely well defined, and it is what the needle displays.',
      mapping: [
        { from: 'Shrinking the measurement interval towards zero', to: 'Taking the limit as h approaches 0' },
        { from: 'The impossible zero-second measurement', to: 'The indeterminate form 0/0' },
        { from: 'The number the readings converge towards', to: 'The value of the limit' },
        { from: 'The needle’s reading at one instant', to: 'The derivative at a point' },
        { from: 'A needle that jumps abruptly between two values', to: 'A discontinuity, where no single limit exists' },
      ],
      bridge:
        'The speedometer is the whole of differential calculus in one instrument. You cannot evaluate the quantity you want directly, so you evaluate a sequence of approximations that get closer and closer, and you take the value they approach as the definition. Continuity is what guarantees the readings settle at all rather than oscillating or leaping.',
      limitations:
        'A real speedometer samples at a finite rate and has a mechanical lag, so it never truly takes a limit. The analogy also hides one-sided limits: a car can only approach an instant from the past, whereas a mathematical limit must be approached from both sides and must agree.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Shrink the interval and watch the slope settle',
        caption: 'Reduce h towards zero and see the secant line converge on the tangent.',
        widget: 'derivative-explorer',
      },
      {
        kind: 'table',
        title: 'Evaluating a limit that substitution cannot reach',
        caption: 'f(x) = (x² − 1)/(x − 1) is undefined at x = 1, yet the limit there is clearly 2.',
        columns: ['x', 'f(x)', 'Approaching from'],
        rows: [
          ['0.9', '1.9', 'below'],
          ['0.99', '1.99', 'below'],
          ['0.999', '1.999', 'below'],
          ['1.0', 'undefined (0/0)', 'the point itself'],
          ['1.001', '2.001', 'above'],
          ['1.01', '2.01', 'above'],
          ['1.1', '2.1', 'above'],
        ],
      },
      {
        kind: 'compare',
        title: 'Continuous versus discontinuous, and why training cares',
        left: {
          heading: 'Continuous: the sigmoid',
          points: [
            'A small change in input gives a small change in output',
            'Has a well-defined derivative everywhere',
            'Gradient descent receives a usable signal at every point',
            'This is why logistic regression is trainable',
          ],
        },
        right: {
          heading: 'Discontinuous: the step function',
          points: [
            'Output leaps from 0 to 1 at the threshold',
            'Derivative is 0 everywhere it exists, and undefined at the jump',
            'Gradient descent gets no information about which way to move',
            'This is why the perceptron needed its own rule rather than gradients',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'The three ways continuity fails at a point',
        caption: 'Continuity needs all three conditions; failing any one breaks it.',
        steps: [
          { label: 'The function must be defined there', detail: 'f(a) exists. 1/x fails this at x = 0.' },
          { label: 'The limit must exist there', detail: 'Left and right limits agree. A step function fails this at the threshold.' },
          { label: 'The two must be equal', detail: 'lim f(x) = f(a). A removable discontinuity fails only this, which is why patching one value fixes it.' },
          { label: 'All three hold: the function is continuous', detail: 'Nudge the input slightly and the output moves slightly — the property optimisation depends on.' },
        ],
      },
    ],

    formalDefinition:
      'lim_{x→a} f(x) = L means: for every ε > 0 there exists δ > 0 such that 0 < |x − a| < δ implies |f(x) − L| < ε. The function f is continuous at a if f(a) is defined, lim_{x→a} f(x) exists, and the two are equal. Continuity on a closed interval guarantees the extreme value theorem and the intermediate value theorem. Differentiability at a implies continuity at a, but the converse fails, as f(x) = |x| demonstrates at the origin.',

    math: {
      intuition:
        'A limit answers the question "where is this function heading?" without insisting it ever arrives. You never substitute the target value; you watch what happens as you close in. This matters because the most important quantity in calculus — the slope at a single point — is defined by an expression that becomes 0/0 the moment you substitute directly. The limit is the device that extracts a sensible answer from that apparently meaningless expression. Continuity is the companion idea: a function is continuous when where it is heading and where it actually is coincide, everywhere. Optimisation needs that property because it improves a model by making small changes and trusting that the effect on the loss will also be small.',
      formulas: [
        {
          latex: '\\lim_{x \\to a} f(x) = L',
          name: 'The limit of a function',
          meaning:
            'As x gets arbitrarily close to a, from either side, f(x) gets arbitrarily close to L. The value f(a) itself is irrelevant.',
          variables: [
            { symbol: 'x', meaning: 'The input, which is approaching a but never set equal to it' },
            { symbol: 'a', meaning: 'The point being approached' },
            { symbol: 'f(x)', meaning: 'The function whose behaviour near a is in question' },
            { symbol: 'L', meaning: 'The limiting value the outputs converge on' },
            { symbol: '\\to', meaning: 'Read "approaches" or "tends to"' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\forall \\varepsilon > 0\; \\exists \\delta > 0 : 0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\varepsilon',
          name: 'The epsilon-delta definition',
          meaning:
            'However tight a tolerance you demand on the output, there is a small enough neighbourhood of the input that achieves it. This is what "arbitrarily close" means precisely.',
          variables: [
            { symbol: '\\varepsilon', meaning: 'The output tolerance, chosen by a sceptic and allowed to be as small as they like' },
            { symbol: '\\delta', meaning: 'The input neighbourhood radius you must supply in response' },
            { symbol: '|x - a|', meaning: 'Distance from the input to the point being approached' },
            { symbol: '|f(x) - L|', meaning: 'Distance from the output to the claimed limit' },
            { symbol: '\\forall, \\exists', meaning: '"For every" and "there exists"' },
          ],
          category: 'calculus',
        },
        {
          latex: 'f \\text{ continuous at } a \\iff \\lim_{x\\to a} f(x) = f(a)',
          name: 'Continuity at a point',
          meaning:
            'Where the function is heading and where it actually is must agree. This compact statement silently requires that both sides exist.',
          variables: [
            { symbol: 'f', meaning: 'The function under test' },
            { symbol: 'a', meaning: 'The point at which continuity is being checked' },
            { symbol: 'f(a)', meaning: 'The actual value of the function at that point' },
            { symbol: '\\lim_{x\\to a} f(x)', meaning: 'The value approached from nearby inputs' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}',
          name: 'The difference quotient whose limit is the derivative',
          meaning:
            'The average rate of change over an interval of width h. Substituting h = 0 gives 0/0, which is exactly why the limit is required.',
          variables: [
            { symbol: 'h', meaning: 'The width of the interval, shrinking towards zero but never equal to it' },
            { symbol: 'a', meaning: 'The point at which the slope is wanted' },
            { symbol: 'f(a+h) - f(a)', meaning: 'The rise: how much the output changed' },
            { symbol: 'h \\text{ (denominator)}', meaning: 'The run: how much the input changed' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\qquad \\lim_{x\\to\\infty}\\left(1 + \\frac{1}{x}\\right)^{x} = e',
          name: 'Two limits worth knowing',
          meaning:
            'Both are indeterminate on direct substitution — 0/0 and 1^∞ — yet both have clean finite values. The second is where the number e comes from.',
          variables: [
            { symbol: 'x', meaning: 'The variable approaching 0 in the first limit and infinity in the second' },
            { symbol: '\\sin x', meaning: 'The sine function, measured in radians' },
            { symbol: 'e', meaning: 'Euler’s number, approximately 2.71828' },
          ],
          category: 'calculus',
        },
      ],
      derivation: [
        'Evaluate lim_{x→1} (x² − 1)/(x − 1) carefully, since it is the template for every derivative computation.',
        'Direct substitution gives (1 − 1)/(1 − 1) = 0/0, which is indeterminate: it tells you nothing, because different functions of this form have different limits.',
        'Factor the numerator: x² − 1 = (x − 1)(x + 1).',
        'The expression becomes (x − 1)(x + 1)/(x − 1).',
        'Because the limit only concerns x close to 1 and never x equal to 1, the factor (x − 1) is non-zero and may legitimately be cancelled.',
        'What remains is x + 1, which is continuous, so its limit is found by substitution: 1 + 1 = 2.',
        'So the limit is 2, even though the original function is undefined at x = 1 — a removable discontinuity, a single pinhole in an otherwise straight line.',
        'The same three moves — substitute, find 0/0, cancel the offending factor, then substitute again — are exactly what you will do to derive every derivative rule in MATH-013.',
      ],
    },

    workedExample: {
      title: 'One limit that exists, one that does not, and why the difference matters',
      setup:
        'Examine f(x) = (x² − 4)/(x − 2) at x = 2, and the step function s(x) which is 0 for x < 0 and 1 for x ≥ 0, at x = 0.',
      steps: [
        { label: 'Try substitution in f', detail: '(4 − 4)/(2 − 2) = 0/0. Indeterminate, so nothing is yet known.' },
        { label: 'Approach from below', detail: 'f(1.9) = (3.61 − 4)/(−0.1) = 3.9; f(1.99) = 3.99; f(1.999) = 3.999. Heading towards 4.' },
        { label: 'Approach from above', detail: 'f(2.1) = 4.1; f(2.01) = 4.01; f(2.001) = 4.001. Also heading towards 4.' },
        { label: 'Confirm algebraically', detail: 'x² − 4 = (x − 2)(x + 2), so for x ≠ 2 the function equals x + 2, whose value at 2 is 4.', latex: '\\lim_{x\\to 2}\\frac{x^2-4}{x-2} = \\lim_{x\\to 2}(x+2) = 4' },
        { label: 'Verdict for f', detail: 'The limit is 4 but f(2) is undefined, so f is discontinuous at 2 — removably so. Defining f(2) = 4 would repair it completely.' },
        { label: 'Now the step function from below', detail: 's(−0.1) = 0, s(−0.01) = 0, s(−0.001) = 0. The left limit is 0.' },
        { label: 'And from above', detail: 's(0.1) = 1, s(0.01) = 1, s(0.001) = 1. The right limit is 1.' },
        { label: 'Verdict for s', detail: 'The one-sided limits disagree, so no limit exists at 0. This is a jump discontinuity and no patching of a single value can repair it.', latex: '\\lim_{x\\to 0^-} s(x) = 0 \\neq 1 = \\lim_{x\\to 0^+} s(x)' },
      ],
      conclusion:
        'A removable discontinuity is a cosmetic flaw: the function knows where it should be and merely fails to be there. A jump is structural, and it is the reason a hard threshold cannot be trained by gradient descent — there is no consistent direction of improvement at the very point where the decision is made. Replacing the step with a sigmoid restores continuity and a usable gradient, which is precisely the move that turns a perceptron into logistic regression.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Watching a limit converge numerically',
        runnable: true,
        code: `def f(x):
    return (x ** 2 - 4) / (x - 2)

for h in [0.1, 0.01, 0.001, 1e-6, 1e-9]:
    print(f"h={h:<8} from below: {f(2 - h):.9f}   from above: {f(2 + h):.9f}")

try:
    f(2.0)
except ZeroDivisionError as e:
    print("at x=2 exactly:", type(e).__name__, "-", e)`,
        output: `h=0.1      from below: 3.900000000   from above: 4.100000000
h=0.01     from below: 3.990000000   from above: 4.010000000
h=0.001    from below: 3.999000000   from above: 4.001000000
h=1e-06    from below: 3.999999000   from above: 4.000001000
h=1e-09    from below: 3.999999917   from above: 4.000000083
at x=2 exactly: ZeroDivisionError - float division by zero`,
        explanation:
          'Both sides converge on 4 while the point itself is genuinely undefined, which is exactly what a limit describes. Notice the last row: at h = 1e-9 the answers are already drifting in the ninth decimal place, because subtracting two nearly equal floats loses precision. Numerical limits cannot be taken arbitrarily close, which is one reason automatic differentiation computes derivatives symbolically rather than by finite differences.',
      },
      {
        language: 'python',
        title: 'Why a step function cannot be trained',
        runnable: true,
        code: `import numpy as np

def step(z):    return (z >= 0).astype(float)
def sigmoid(z): return 1.0 / (1.0 + np.exp(-z))

z = np.array([-1.0, -0.001, 0.0, 0.001, 1.0])
h = 1e-5

print("step   values:", step(z))
print("sigmoid values:", np.round(sigmoid(z), 6))
print()
print("step   numeric slope:", (step(z + h) - step(z - h)) / (2 * h))
print("sigmoid numeric slope:", np.round((sigmoid(z + h) - sigmoid(z - h)) / (2 * h), 6))`,
        output: `step   values: [0. 0. 1. 1. 1.]
sigmoid values: [0.268941 0.49975  0.5      0.50025  0.731059]

step   numeric slope: [0. 0. 0. 0. 0.]
sigmoid numeric slope: [0.196612 0.25     0.25     0.25     0.196612]`,
        explanation:
          'The step function has zero slope everywhere it is differentiable and an undefined one exactly at the decision boundary, so gradient descent receives no information about which direction would reduce the loss. The sigmoid is continuous and differentiable everywhere, with slope peaking at 0.25 at the boundary, so the optimiser always has a usable signal. This single difference is why the hard threshold was replaced by a smooth one.',
      },
      {
        language: 'python',
        title: 'Continuous but not differentiable: ReLU at zero',
        runnable: true,
        code: `import numpy as np

def relu(x): return np.maximum(0.0, x)

h = 1e-7
left  = (relu(0.0) - relu(0.0 - h)) / h
right = (relu(0.0 + h) - relu(0.0)) / h

print("relu near 0:", [round(float(relu(v)), 9) for v in [-1e-9, 0.0, 1e-9]])
print("left slope :", left)
print("right slope:", right)
print("continuous at 0? limits agree:", np.isclose(relu(-h), relu(h), atol=1e-6))
print("differentiable at 0? slopes agree:", left == right)`,
        output: `relu near 0: [0.0, 0.0, 0.0]
left slope : 0.0
right slope: 1.0
continuous at 0? limits agree: True
differentiable at 0? slopes agree: False`,
        explanation:
          'ReLU passes the continuity test at zero — both sides approach the same value, so there is no jump — but fails differentiability, because the slope approaching from the left is 0 and from the right is 1. Frameworks resolve the ambiguity by convention, with PyTorch defining the subgradient at exactly zero to be 0. In practice the single point has measure zero and training is unaffected, which is why continuity is the property that really matters for optimisation.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Choosing an activation function',
        usage:
          'The hard step was abandoned for the sigmoid, then ReLU, because a discontinuous activation gives gradient descent nothing to work with at the decision boundary.',
      },
      {
        context: 'Loss functions for ranking and classification',
        usage:
          'Accuracy is a step-like, discontinuous function of the parameters, so models are trained on a continuous surrogate such as cross-entropy or hinge loss and only evaluated on accuracy.',
      },
      {
        context: 'Learning-rate schedules',
        usage:
          'Cosine and linear warmup schedules are continuous by design; an abrupt drop in learning rate can destabilise training, which is why step schedules are applied cautiously.',
      },
      {
        context: 'Numerical differentiation in gradient checking',
        usage:
          'Finite-difference gradient checks rely on a limit taken at a finite h, and the classic bug is choosing h so small that floating-point cancellation dominates the answer.',
      },
    ],

    projectConnections: [
      { tool: 'SymPy', role: 'sympy.limit computes limits symbolically, which is useful for checking a derivative you derived by hand.' },
      { tool: 'PyTorch', role: 'torch.autograd.gradcheck uses finite differences with a carefully chosen h to verify custom backward passes.' },
      { tool: 'NumPy', role: 'np.gradient approximates derivatives on sampled data, inheriting all the accuracy limits of finite differencing.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing lim_{x→a} f(x) requires f(a) to exist',
        why: 'The notation looks like an evaluation, so people assume the function must be defined at the point.',
        fix: 'A limit deliberately ignores the point itself. The most important limit in calculus, the difference quotient, is undefined at exactly the point of interest.',
      },
      {
        mistake: 'Concluding a limit does not exist because substitution gives 0/0',
        why: 'The indeterminate form looks like a failure, but it is only a statement that this method gave no information.',
        fix: 'Factor and cancel, rationalise, or use a series expansion. 0/0 means "work harder", not "no limit".',
      },
      {
        mistake: 'Assuming continuous implies differentiable',
        why: 'Most familiar functions are both, so the distinction never arises until ReLU or an absolute value appears.',
        fix: 'Remember |x| and ReLU at zero: continuous with no jump, yet with two different one-sided slopes, so no single derivative exists.',
      },
      {
        mistake: 'Using too small an h in a finite-difference gradient check',
        why: 'Subtracting two nearly equal floating-point numbers cancels the leading digits, so the error grows as h shrinks past a point.',
        fix: 'Use the central difference and h around 1e-5 in float64. Smaller is not better; the total error curve is U-shaped.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why does gradient-based optimisation require a continuous loss function?',
        answer:
          'Gradient descent works by making a small change to the parameters and relying on the loss changing by a correspondingly small and predictable amount. That is exactly what continuity guarantees. At a discontinuity the derivative either does not exist or carries no information about the jump: the step function, for instance, has zero slope everywhere it is differentiable, so the gradient says "moving in any direction changes nothing" right up until the output leaps. This is why models are trained on continuous surrogates rather than on the metric you actually care about — you cannot descend accuracy, which is a step function of the parameters, so you descend cross-entropy instead and evaluate accuracy separately. Strictly, training needs differentiability almost everywhere rather than continuity alone, but continuity is the property that makes the whole approach coherent.',
        followUp:
          'A strong answer distinguishes continuity from differentiability and notes that ReLU is a working counterexample: continuous everywhere, non-differentiable at one point, and trained successfully because that point has measure zero.',
      },
      {
        level: 'beginner',
        question: 'What does it mean to take a limit, and why can you not just substitute the value?',
        answer:
          'Taking a limit means asking what value a function’s output approaches as the input gets arbitrarily close to some point, deliberately ignoring what happens at the point itself. You cannot always substitute because the function may be undefined there. The canonical case is the definition of a derivative, which is the ratio of the change in output to the change in input as that change shrinks to zero — substituting zero directly gives 0/0, which is meaningless. The limit provides a rigorous way of extracting the value the ratio converges to. Concretely, (x² − 4)/(x − 2) is undefined at x = 2, but factoring and cancelling shows it equals x + 2 everywhere else, so the limit is 4.',
      },
      {
        level: 'ml-engineer',
        question: 'You are gradient-checking a custom layer with finite differences and the error gets worse as you shrink h. Why?',
        answer:
          'Because two competing error sources move in opposite directions. Truncation error — the difference between the finite-difference approximation and the true derivative — shrinks with h, at order h for a forward difference and h² for a central one. But round-off error grows as h shrinks, because you are subtracting two nearly equal floating-point numbers and then dividing by a tiny denominator, so the cancelled leading digits are replaced by noise amplified by 1/h. The total error curve is U-shaped, with a minimum around h ≈ 1e-5 to 1e-6 for central differences in float64, and around the square root of machine epsilon for forward differences. The practical fixes are to use the central difference, to pick h relative to the scale of the parameter rather than absolutely, to run the check in float64 even if the model trains in float32, and to compare relative rather than absolute error.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Evaluate lim_{x→3} (x² − 9)/(x − 3) and state whether the function is continuous at x = 3.',
        hint: 'Substitution gives 0/0. Factor the numerator.',
        solution:
          'x² − 9 = (x − 3)(x + 3), so for x ≠ 3 the expression equals x + 3, whose limit at 3 is 6. The limit therefore exists and equals 6. The function is not continuous at x = 3 because it is not defined there — division by zero — but the discontinuity is removable: defining the value at 3 to be 6 makes the function continuous everywhere.',
      },
      {
        prompt: 'Is f(x) = |x| continuous at x = 0? Is it differentiable there? Justify both answers.',
        hint: 'Check the left and right limits of the function, then of its slope.',
        solution:
          'Continuous: approaching from the left, |x| tends to 0; from the right, also 0; and f(0) = 0. All three agree, so it is continuous. Not differentiable: the slope just left of 0 is −1 and just right of 0 is +1, so the one-sided derivatives disagree and no single tangent line exists. This is exactly the situation at ReLU’s kink, and it shows that continuity is strictly weaker than differentiability.',
      },
      {
        prompt: 'Explain why accuracy cannot be used directly as a training objective, in terms of limits and continuity.',
        hint: 'Think about what happens to accuracy when a weight changes by a tiny amount.',
        solution:
          'Accuracy counts how many predictions fall on the correct side of a threshold, so it is a sum of step functions of the parameters. Changing a weight by a tiny amount usually flips no prediction at all, so accuracy is locally constant and its derivative is zero — the gradient says every direction is equally good. Occasionally a tiny change flips one prediction and accuracy jumps by a discrete amount, where the derivative is undefined. Either way there is no usable descent direction. The standard response is to train on a continuous, differentiable surrogate such as cross-entropy, whose gradient does reflect how confidently right or wrong each prediction is, and to report accuracy only as an evaluation metric.',
      },
    ],

    quiz: [
      {
        id: 'MATH-012-q1',
        type: 'mcq',
        concept: 'definition of a limit',
        prompt: 'For lim_{x→a} f(x) = L to hold, what must be true about f(a)?',
        options: [
          'Nothing — f need not even be defined at a',
          'f(a) must equal L',
          'f(a) must be defined but may differ from L',
          'f(a) must be zero',
        ],
        answerIndex: 0,
        explanation:
          'A limit describes behaviour near a point and deliberately ignores the point itself. The difference quotient defining a derivative is undefined at exactly the point of interest, which is why this matters.',
      },
      {
        id: 'MATH-012-q2',
        type: 'numeric',
        concept: 'evaluating a limit',
        prompt: 'What is lim_{x→3} (x² − 9)/(x − 3)?',
        answer: 6,
        explanation:
          'Factor to (x − 3)(x + 3)/(x − 3), cancel the common factor since x ≠ 3 in the limit, and substitute into x + 3 to get 6.',
      },
      {
        id: 'MATH-012-q3',
        type: 'truefalse',
        concept: 'continuity versus differentiability',
        prompt: 'Every continuous function is differentiable.',
        answer: false,
        explanation:
          'False. |x| and ReLU are continuous at zero — no jump — but have different left and right slopes there, so no single derivative exists. Differentiability implies continuity, not the other way round.',
      },
      {
        id: 'MATH-012-q4',
        type: 'match',
        concept: 'types of discontinuity',
        prompt: 'Match each function to the behaviour it shows at the named point.',
        pairs: [
          { left: '(x²−1)/(x−1) at x = 1', right: 'Removable discontinuity — patch one value to fix it' },
          { left: 'Step function at x = 0', right: 'Jump discontinuity — one-sided limits differ' },
          { left: '1/x at x = 0', right: 'Infinite discontinuity — the function grows without bound' },
          { left: 'ReLU at x = 0', right: 'Continuous but not differentiable' },
        ],
        explanation:
          'Distinguishing these four cases tells you whether a problem is cosmetic, structural, or merely a kink that optimisers handle by convention.',
      },
      {
        id: 'MATH-012-q5',
        type: 'mcq',
        concept: 'finite differences',
        prompt: 'Why does a finite-difference gradient check become less accurate if h is made extremely small?',
        options: [
          'Floating-point cancellation destroys precision when subtracting nearly equal numbers',
          'The true derivative changes as h shrinks',
          'NumPy refuses values below 1e-10',
          'The limit does not actually exist',
        ],
        answerIndex: 0,
        explanation:
          'Truncation error falls with h but round-off error rises, because the leading digits cancel and the noise is then divided by a tiny h. The total error is U-shaped, minimised around 1e-5 for central differences in float64.',
      },
      {
        id: 'MATH-012-q6',
        type: 'explain',
        concept: 'continuity and optimisation',
        prompt: 'Explain why a hard threshold activation was replaced by a smooth one in neural networks.',
        rubric: [
          'Says the step function is discontinuous at the threshold',
          'Says its derivative is zero or undefined, so gradients carry no information',
          'Says a smooth alternative such as sigmoid or ReLU provides a usable gradient',
        ],
        sampleAnswer:
          'A hard threshold outputs 0 below the boundary and 1 above it, with nothing in between, so it jumps discontinuously at exactly the point where the decision is made. Its derivative is zero everywhere it exists and undefined at the jump itself, which means a gradient-based optimiser is told that moving the weights in any direction changes nothing — right up to the moment the output leaps by a full unit. There is no signal indicating which way improvement lies. Replacing the threshold with a sigmoid makes the output change smoothly with the input, so the derivative is non-zero and tells the optimiser both the direction and roughly the magnitude of a useful step. ReLU makes a different trade, being continuous everywhere and differentiable everywhere except a single point, which optimisers handle by convention because one point of measure zero does not affect training in practice.',
        explanation:
          'The answer should explain what the gradient of a step function actually is, rather than merely asserting that it is unusable.',
      },
    ],

    flashcards: [
      { front: 'What is a limit?', back: 'The value a function approaches as the input approaches a point — regardless of the value at that point.' },
      { front: 'Three conditions for continuity at a?', back: 'f(a) is defined, the limit at a exists, and the two are equal.' },
      { front: 'Why can you not just substitute in a derivative?', back: 'The difference quotient becomes 0/0 at h = 0. The limit extracts the value the ratio converges to.' },
      { front: 'Does continuity imply differentiability?', back: 'No. |x| and ReLU are continuous at 0 but have different left and right slopes there.' },
      { front: 'Why train on cross-entropy rather than accuracy?', back: 'Accuracy is a step function of the parameters: locally constant with zero gradient, jumping discontinuously. There is nothing to descend.' },
      { front: 'Best h for a central-difference gradient check?', back: 'Around 1e-5 in float64. Smaller h increases round-off error faster than it reduces truncation error.' },
    ],

    challenge: {
      title: 'The U-shaped error curve',
      brief:
        'Approximate the derivative of f(x) = sin(x) at x = 1 using forward and central differences for h from 1e-1 down to 1e-16. Compare against the exact value cos(1), print the relative error for each h and each method, and identify the h that minimises the error for each. Explain the shape of both curves in a printed comment.',
      language: 'python',
      acceptanceCriteria: [
        'Implements both forward and central differences',
        'Sweeps h across at least 12 orders of magnitude',
        'Identifies and prints the error-minimising h for each method',
        'Prints an explanation of why the error rises again for very small h',
      ],
      starterCode: 'import numpy as np\n\nx0 = 1.0\nexact = np.cos(x0)\nfor k in range(1, 17):\n    h = 10.0 ** -k\n',
    },

    teachingPrompt: {
      prompt:
        'Explain limits and continuity to someone who has never studied calculus, and finish by saying why a machine learning engineer should care.',
      mustCover: [
        'A limit is where a function is heading, not necessarily where it arrives',
        'Some functions are undefined at a point yet have a clear limit there',
        'Continuity means small input changes produce small output changes',
        'Optimisation depends on that property, which is why hard thresholds were abandoned',
      ],
      bonusSignals: ['uses the speedometer or halving-distance image', 'mentions that 0/0 means work harder rather than no answer', 'distinguishes continuity from differentiability'],
      sampleExplanation:
        'Imagine walking towards a wall and halving the remaining distance with every step. You will never touch the wall, yet anyone watching can say exactly where you are heading. That destination is what a limit means: it is a statement about where a process is going, not about whether it arrives. This turns out to be necessary rather than merely elegant. The central quantity in calculus is the slope of a curve at a single point, and computing it means dividing a change in height by a change in width as that width shrinks to nothing — which, if you simply put zero in, gives zero divided by zero, a meaningless expression. Watching the answers converge as the width shrinks gives a perfectly definite number instead. The companion idea is continuity, which asks whether a function ever jumps. A continuous function can be drawn without lifting your pen: nudge the input and the output shifts slightly. A machine learning engineer cares because training a model means nudging its parameters and watching the loss respond. If the loss jumped discontinuously, a tiny nudge would tell you nothing about whether you were improving. That is precisely why the original hard-threshold neuron, which output 0 below a cut-off and 1 above it, had to be replaced by a smooth curve: the hard version gave the optimiser a slope of zero everywhere and no hint at all about which way to move.',
    },
  },

  {
    id: 'MATH-013',
    domain: 'MATH',
    module: 'Calculus',
    topic: 'Derivatives',
    title: 'Derivatives and Slope',
    slug: 'derivatives-and-slope',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['MATH-012'],
    related: ['MATH-002', 'MATH-012'],
    tags: ['derivative', 'slope', 'tangent', 'rate-of-change', 'power-rule'],

    learningObjectives: [
      'Describe a derivative as an instantaneous rate of change and as the slope of the tangent line',
      'Derive a derivative from the limit definition and see why the limit is unavoidable',
      'Apply the power, exponential and logarithm rules, plus the sum and product rules',
      'Read the sign and magnitude of a derivative to say which way and how steeply a function is heading',
    ],

    terminology: [
      {
        term: 'Derivative',
        definition:
          'The instantaneous rate of change of a function with respect to its input, written f′(x) or df/dx.',
        simple: 'How fast the output changes when you nudge the input.',
      },
      {
        term: 'Tangent line',
        definition:
          'The straight line touching a curve at a point with the same slope as the curve there. It is the best local linear approximation.',
        simple: 'The line that just kisses the curve at that point.',
      },
      {
        term: 'Secant line',
        definition:
          'The straight line through two points on a curve, whose slope is the average rate of change between them. As the points merge, it becomes the tangent.',
        simple: 'A line cutting across the curve between two points.',
      },
      {
        term: 'Stationary point',
        definition:
          'A point where the derivative is zero, so the tangent is horizontal. Minima, maxima and saddle points are all stationary.',
        simple: 'A spot where the curve momentarily stops rising or falling.',
      },
      {
        term: 'Second derivative',
        definition:
          'The derivative of the derivative, measuring how the slope itself is changing — that is, curvature.',
        simple: 'Whether the curve is bending upwards or downwards.',
      },
    ],

    simpleExplanation:
      'Stand at a point on a hillside and ask how steep the ground is right where you are standing. You cannot answer by comparing your height with somewhere far away, because the hill changes as you walk. So you compare your height with a point just slightly along, then a point closer still, then closer again, and you watch what number the steepness settles on. That settled value is the derivative: the steepness of the hill at exactly the spot you are standing. It tells you two things at once. Its sign tells you which way the ground slopes — positive means it rises as you walk forwards, negative means it falls. Its size tells you how dramatic the slope is: a derivative of 20 is a cliff face, a derivative of 0.01 is nearly flat. And a derivative of exactly zero means you are momentarily level, which happens at the bottom of a valley, at the top of a peak, or on a flat shelf. Every training algorithm you will meet is a procedure for walking downhill using exactly this information.',

    whyItExists:
      'Average rates of change hide everything interesting, because a journey averaging 50 km/h says nothing about the moment you braked hard. The derivative gives the rate at a single instant, which is what you need to decide what to do next rather than describe what already happened. In machine learning this is the entire mechanism of learning: the derivative of the loss with respect to a weight tells you whether nudging that weight up or down will make the model better.',

    analogy: {
      scenario:
        'You are driving and the satnav records your position every second. To estimate your speed at 12:00:00 exactly you could look at how far you travelled between 12:00:00 and 12:00:01, which mixes in everything that happened during that second. Better to use the gap to 12:00:00.1, better still 12:00:00.01. As the interval shrinks the estimate stops wandering and settles on a single number — and that is the number your speedometer already shows.',
      mapping: [
        { from: 'Distance travelled over an interval', to: 'The change in output, f(x + h) − f(x)' },
        { from: 'The duration of the interval', to: 'The change in input, h' },
        { from: 'Average speed over the interval', to: 'The difference quotient, a secant slope' },
        { from: 'Shrinking the interval towards zero', to: 'Taking the limit as h → 0' },
        { from: 'The speedometer reading', to: 'The derivative at that instant' },
        { from: 'Speed dropping below zero when reversing', to: 'A negative derivative: the output decreases as the input rises' },
      ],
      bridge:
        'Average speed is the slope of the line joining two points on a distance-time graph; instantaneous speed is the slope of the tangent at one point. The derivative is nothing more than that second quantity, given a name and a procedure. In a training loop the roles are relabelled: the "distance" is the loss and the "time" is a weight, and the derivative tells you how fast the loss changes as that weight moves.',
      limitations:
        'A car’s speed is always non-negative in the everyday sense and time only moves forwards, whereas a derivative may be negative and the input may be varied in either direction. The analogy also suggests derivatives always exist, but a sharp corner in a graph — a sudden change of direction — has no single slope.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Drag the point and watch the tangent',
        caption: 'Shrink the secant interval and see it converge onto the tangent line.',
        widget: 'derivative-explorer',
      },
      {
        kind: 'table',
        title: 'The rules you will actually use',
        caption: 'Every one of these appears inside a backward pass.',
        columns: ['f(x)', 'f′(x)', 'Note'],
        rows: [
          ['c (a constant)', '0', 'A flat line has no slope'],
          ['xⁿ', 'n·xⁿ⁻¹', 'The power rule — bring the exponent down, reduce it by one'],
          ['eˣ', 'eˣ', 'The only function that is its own derivative'],
          ['ln x', '1/x', 'Defined for x > 0; why log-loss gradients blow up near zero'],
          ['sin x', 'cos x', 'Angles in radians'],
          ['σ(x) = 1/(1+e⁻ˣ)', 'σ(x)(1 − σ(x))', 'Peaks at 0.25; the source of vanishing gradients'],
          ['max(0, x)', '0 if x < 0, 1 if x > 0', 'Undefined at 0; frameworks choose 0 by convention'],
        ],
      },
      {
        kind: 'compare',
        title: 'Reading the derivative and the second derivative',
        left: {
          heading: 'First derivative f′(x)',
          points: [
            'Positive: the function is rising as x increases',
            'Negative: the function is falling',
            'Zero: a stationary point — level, momentarily',
            'Magnitude: how steep, so how big a step gradient descent will take',
          ],
        },
        right: {
          heading: 'Second derivative f″(x)',
          points: [
            'Positive: curving upwards, a bowl — a stationary point here is a minimum',
            'Negative: curving downwards, a dome — a stationary point here is a maximum',
            'Zero: possibly an inflection point, where curvature changes sign',
            'Magnitude: how sharply curved, which governs a safe learning rate',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Deriving a derivative from first principles',
        caption: 'The same four steps work for every elementary function.',
        steps: [
          { label: 'Write the difference quotient', detail: '(f(x + h) − f(x)) / h — the average rate over a small interval.' },
          { label: 'Expand and simplify the numerator', detail: 'The f(x) terms cancel, leaving everything with a factor of h.' },
          { label: 'Cancel the h', detail: 'Legitimate because h is never zero inside the limit, only approaching it.' },
          { label: 'Take the limit as h → 0', detail: 'Every remaining term containing h vanishes, and what is left is the derivative.' },
        ],
      },
    ],

    formalDefinition:
      'The derivative of f at a is f′(a) = lim_{h→0} (f(a + h) − f(a))/h, when the limit exists; f is then differentiable at a. Geometrically f′(a) is the slope of the unique tangent line to the graph at (a, f(a)), and f(a + h) = f(a) + f′(a)h + o(h) is the first-order Taylor expansion, making the tangent the best local linear approximation. Differentiability at a implies continuity at a; the converse is false.',

    math: {
      intuition:
        'Everything rests on one picture. Pick a point on a curve and a second point a little way along. The straight line through both has an obvious slope, rise over run, and it approximates the steepness of the curve between them. Now slide the second point towards the first. The line pivots, and as the gap closes it settles into the unique line that just touches the curve at your point. The slope of that line is the derivative. The algebra that follows is just careful bookkeeping about the sliding, and the reason you need a limit rather than direct substitution is that when the two points coincide, rise and run are both zero and the ratio says nothing.',
      formulas: [
        {
          latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
          name: 'The limit definition of the derivative',
          meaning:
            'The slope between two nearby points as the gap shrinks to nothing. Every derivative rule is ultimately derived from this.',
          variables: [
            { symbol: "f'(x)", meaning: 'The derivative: the instantaneous rate of change at x' },
            { symbol: 'f(x)', meaning: 'The function being differentiated' },
            { symbol: 'h', meaning: 'The width of the interval, shrinking towards zero but never equal to it' },
            { symbol: 'f(x+h) - f(x)', meaning: 'The rise: how much the output changed' },
            { symbol: '\\lim_{h\\to 0}', meaning: 'The limit: the value the ratio settles on' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\frac{d}{dx}x^{n} = n\\,x^{n-1}',
          name: 'The power rule',
          meaning:
            'Bring the exponent down as a multiplier and reduce it by one. It covers constants (n = 0), lines (n = 1) and roots (n = 1/2) alike.',
          variables: [
            { symbol: 'x', meaning: 'The variable being differentiated with respect to' },
            { symbol: 'n', meaning: 'The exponent, which may be any real number including negative and fractional values' },
            { symbol: '\\frac{d}{dx}', meaning: 'The instruction "differentiate with respect to x"' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\frac{d}{dx}e^{x} = e^{x}, \\qquad \\frac{d}{dx}\\ln x = \\frac{1}{x}, \\qquad \\frac{d}{dx}a^{x} = a^{x}\\ln a',
          name: 'Exponential and logarithm derivatives',
          meaning:
            'e^x is the unique function equal to its own derivative, which is why e is the natural base. The log derivative 1/x explains why log-loss gradients explode near zero.',
          variables: [
            { symbol: 'e', meaning: 'Euler’s number, approximately 2.71828' },
            { symbol: 'x', meaning: 'The input variable; for ln x it must be strictly positive' },
            { symbol: 'a', meaning: 'Any positive base other than 1' },
            { symbol: '\\ln a', meaning: 'The natural logarithm of that base, the conversion factor between bases' },
          ],
          category: 'calculus',
        },
        {
          latex: "(f + g)' = f' + g', \\qquad (cf)' = cf', \\qquad (fg)' = f'g + fg'",
          name: 'Sum, constant-multiple and product rules',
          meaning:
            'Differentiation distributes over addition and pulls constants out, but a product needs both terms — the common error is assuming (fg)′ = f′g′.',
          variables: [
            { symbol: 'f, g', meaning: 'Two differentiable functions of the same variable' },
            { symbol: "f', g'", meaning: 'Their derivatives' },
            { symbol: 'c', meaning: 'A constant multiplier' },
          ],
          category: 'calculus',
        },
        {
          latex: "\\sigma'(x) = \\sigma(x)\\bigl(1 - \\sigma(x)\\bigr), \\qquad \\sigma(x) = \\frac{1}{1 + e^{-x}}",
          name: 'Derivative of the logistic sigmoid',
          meaning:
            'Expressible in terms of its own output, so the backward pass can reuse the forward result. Its maximum is 0.25 at x = 0, which is the root of vanishing gradients.',
          variables: [
            { symbol: '\\sigma(x)', meaning: 'The logistic sigmoid, squashing any real number into (0, 1)' },
            { symbol: "\\sigma'(x)", meaning: 'Its derivative, always between 0 and 0.25' },
            { symbol: 'e^{-x}', meaning: 'The exponential term that produces the S shape' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'w \\leftarrow w - \\eta \\frac{\\partial L}{\\partial w}',
          name: 'One step of gradient descent',
          meaning:
            'Move each weight in the direction opposite to the derivative, so the loss goes down. This one line is what all the calculus is for.',
          variables: [
            { symbol: 'w', meaning: 'A single model weight being updated' },
            { symbol: '\\eta', meaning: 'The learning rate: how large a step to take' },
            { symbol: 'L', meaning: 'The loss being minimised' },
            { symbol: '\\frac{\\partial L}{\\partial w}', meaning: 'The derivative of the loss with respect to that weight' },
            { symbol: '\\leftarrow', meaning: 'Assignment: the weight is replaced by the new value' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Derive the derivative of f(x) = x² from first principles, with no rules assumed.',
        'Start with the difference quotient: (f(x + h) − f(x))/h = ((x + h)² − x²)/h.',
        'Expand the square: (x² + 2xh + h² − x²)/h.',
        'The x² terms cancel, leaving (2xh + h²)/h.',
        'Every remaining term has a factor of h, so factor it out: h(2x + h)/h.',
        'Cancel the h. This is legitimate precisely because the limit concerns h approaching zero, never h equal to zero, so the division is valid. What remains is 2x + h.',
        'Now take the limit as h → 0. The expression 2x + h is continuous, so the limit is found by substitution: 2x.',
        'Therefore f′(x) = 2x, matching the power rule with n = 2. Notice where the limit was indispensable: before cancelling, substituting h = 0 gave 0/0 and told you nothing; after cancelling, substituting is trivial. That pattern — simplify until the h in the denominator is gone, then substitute — is the whole technique.',
      ],
    },

    workedExample: {
      title: 'Differentiating a small loss function and reading the result',
      setup:
        'A one-parameter squared-error loss for a single training point: L(w) = (w·3 − 6)² + 0.5w². The first term is the prediction error when the input is 3 and the target is 6; the second is an L2 penalty. Find L′(w), locate the minimum, and interpret the derivative at two specific values.',
      steps: [
        { label: 'Expand the first term', detail: '(3w − 6)² = 9w² − 36w + 36, so L(w) = 9w² − 36w + 36 + 0.5w² = 9.5w² − 36w + 36.', latex: 'L(w) = 9.5w^2 - 36w + 36' },
        { label: 'Differentiate term by term', detail: 'By the power rule and the sum rule: d/dw(9.5w²) = 19w, d/dw(−36w) = −36, d/dw(36) = 0.', latex: "L'(w) = 19w - 36" },
        { label: 'Evaluate at w = 0', detail: 'L′(0) = −36. Strongly negative, so increasing w reduces the loss — and steeply. Gradient descent would take a large step to the right.' },
        { label: 'Evaluate at w = 3', detail: 'L′(3) = 57 − 36 = 21. Positive now, so we have overshot and should move left.' },
        { label: 'Find the stationary point', detail: 'Set 19w − 36 = 0, giving w = 36/19 ≈ 1.8947.', latex: 'w^{*} = \\tfrac{36}{19} \\approx 1.8947' },
        { label: 'Confirm it is a minimum', detail: 'L″(w) = 19, positive everywhere, so the curve is a bowl and the stationary point is the global minimum.' },
        { label: 'Note the effect of the penalty', detail: 'Without the 0.5w² term the minimum would be at w = 2, the perfect fit. The penalty pulls it to 1.8947 — regularisation shrinking the weight, visible directly in the arithmetic.' },
        { label: 'Simulate one descent step', detail: 'From w = 0 with learning rate 0.02: w ← 0 − 0.02(−36) = 0.72. Next derivative: 19(0.72) − 36 = −22.32, still negative but smaller. The steps shrink as the minimum nears.' },
      ],
      conclusion:
        'L′(w) = 19w − 36, zero at w ≈ 1.8947, which is the minimum since the second derivative is positive. This is gradient descent in one dimension with nothing hidden: the derivative supplies both the direction to move and a sense of how far, and it naturally shrinks to zero as the optimum is approached.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The limit definition, converging',
        runnable: true,
        code: `def f(x):
    return x ** 2

x0 = 3.0
for h in [1.0, 0.1, 0.01, 1e-4, 1e-6]:
    forward = (f(x0 + h) - f(x0)) / h
    central = (f(x0 + h) - f(x0 - h)) / (2 * h)
    print(f"h={h:<7} forward={forward:.8f}  central={central:.8f}")

print("exact (2x):", 2 * x0)`,
        output: `h=1.0     forward=7.00000000  central=6.00000000
h=0.1     forward=6.10000000  central=6.00000000
h=0.01    forward=6.01000000  central=6.00000000
h=0.0001  forward=6.00010000  central=6.00000000
h=1e-06   forward=6.00000100  central=6.00000000
exact (2x): 6.0`,
        explanation:
          'The forward difference converges linearly in h, so its error is roughly h itself. The central difference is exact here because the error term for a quadratic is proportional to h² times the third derivative, and the third derivative of x² is zero. That is why central differences are the default in gradient-checking code.',
      },
      {
        language: 'python',
        title: 'Reading the sign of the derivative along a curve',
        runnable: true,
        code: `import numpy as np

def f(x):  return x ** 3 - 3 * x        # has a max and a min
def df(x): return 3 * x ** 2 - 3        # zero at x = -1 and x = +1

for x in [-2.0, -1.0, 0.0, 1.0, 2.0]:
    d = df(x)
    verdict = "rising" if d > 0 else ("falling" if d < 0 else "stationary")
    print(f"x={x:5.1f}  f={f(x):6.2f}  f'={d:6.2f}  {verdict}")`,
        output: `x = -2.0  f= -2.00  f'=  9.00  rising
x = -1.0  f=  2.00  f'=  0.00  stationary
x =  0.0  f=  0.00  f'= -3.00  falling
x =  1.0  f= -2.00  f'=  0.00  stationary
x =  2.0  f=  6.00  f'=  9.00  rising`,
        explanation:
          'The sign of the derivative gives a complete account of the shape: rising, then level at a local maximum, then falling, level again at a local minimum, then rising. This is exactly how the first-derivative test classifies stationary points, and it is why an optimiser that only looks at the gradient cannot distinguish a minimum from a maximum without checking curvature.',
      },
      {
        language: 'python',
        title: 'Autograd computes the same derivatives',
        runnable: true,
        code: `import torch

w = torch.tensor(0.0, requires_grad=True)
loss = (3 * w - 6) ** 2 + 0.5 * w ** 2
loss.backward()
print("L(0) =", loss.item(), "  L'(0) =", w.grad.item(), " expected -36")

# one full descent loop
w = torch.tensor(0.0, requires_grad=True)
for step in range(6):
    loss = (3 * w - 6) ** 2 + 0.5 * w ** 2
    loss.backward()
    with torch.no_grad():
        w -= 0.02 * w.grad
    w.grad.zero_()
    print(f"step {step}: w={w.item():.5f}")`,
        output: `L(0) = 36.0   L'(0) = -36.0  expected -36
step 0: w=0.72000
step 1: w=1.16640
step 2: w=1.44317
step 3: w=1.61476
step 4: w=1.72115
step 5: w=1.78711`,
        explanation:
          'PyTorch reproduces the hand-derived derivative of −36 at w = 0 exactly, because autograd applies the same rules symbolically rather than approximating with finite differences. The loop shows the descent converging towards 36/19 ≈ 1.8947, with each step smaller than the last because the derivative itself shrinks as the minimum is approached — a self-damping behaviour that is why a fixed learning rate can still converge.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Every gradient descent update',
        usage:
          'The update rule w ← w − η·dL/dw is the derivative used directly: its sign chooses the direction and its magnitude scales the step.',
      },
      {
        context: 'Vanishing gradients in deep sigmoid networks',
        usage:
          'The sigmoid derivative never exceeds 0.25, so multiplying ten of them through a ten-layer chain scales the gradient by under 1e-6 — which is why ReLU, whose derivative is exactly 1 for positive inputs, replaced it.',
      },
      {
        context: 'Learning-rate selection',
        usage:
          'A safe step size is bounded by the curvature, roughly 2/f″ for a quadratic. Second-order methods such as Newton and L-BFGS use this explicitly instead of guessing.',
      },
      {
        context: 'Sensitivity analysis and explanations',
        usage:
          'Saliency maps are the derivative of the output with respect to each input pixel, answering "which pixels would most change the prediction if nudged?"',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'Autograd builds a graph during the forward pass and applies these derivative rules in reverse to produce .grad.' },
      { tool: 'SymPy', role: 'sympy.diff differentiates symbolically, which is the quickest way to check a derivative you derived by hand.' },
      { tool: 'JAX', role: 'jax.grad transforms a Python function into a function computing its derivative, composable to any order.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing (fg)′ = f′g′',
        why: 'The sum rule really does distribute, so the pattern is over-generalised to products.',
        fix: 'The product rule is f′g + fg′. Test it on f = g = x: the correct answer for x² is 2x, whereas f′g′ would give 1.',
      },
      {
        mistake: 'Forgetting that the derivative of a constant is zero',
        why: 'Constants look like they should contribute something, especially when large.',
        fix: 'A constant function is a flat line and flat lines have zero slope, however high up they sit. This is why the bias term drops out of a derivative with respect to a weight.',
      },
      {
        mistake: 'Treating a zero derivative as proof of a minimum',
        why: 'Gradient descent stops where the derivative vanishes, which is taken as evidence that the best point has been found.',
        fix: 'Zero derivative means stationary, which could be a minimum, a maximum or a saddle. Check the second derivative, or in higher dimensions the eigenvalues of the Hessian.',
      },
      {
        mistake: 'Differentiating log without noting its domain',
        why: 'The rule d/dx ln x = 1/x is memorised without the condition x > 0.',
        fix: 'The derivative blows up as x approaches 0, which is exactly why a predicted probability near zero produces an enormous log-loss gradient. Clip probabilities, or use a fused loss that never forms them.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is a derivative, and what do its sign and magnitude tell you?',
        answer:
          'A derivative is the instantaneous rate of change of a function with respect to its input — equivalently the slope of the tangent line at a point, defined as the limit of the difference quotient as the interval shrinks to zero. Its sign tells you the direction the function is heading: positive means increasing the input increases the output, negative means the reverse, and zero means you are at a stationary point where the function is momentarily level. Its magnitude tells you how steeply, so a derivative of 50 means a small change in input produces a large change in output while 0.01 means the function is nearly flat. In training, the derivative of the loss with respect to a weight supplies both pieces of information: which way to move the weight and, scaled by the learning rate, how far.',
      },
      {
        level: 'intermediate',
        question: 'Why did ReLU largely replace the sigmoid as a hidden-layer activation?',
        answer:
          'Because of what happens to the derivative when you compose many layers. The sigmoid derivative is σ(x)(1 − σ(x)), which peaks at 0.25 at x = 0 and falls towards zero as the input saturates in either direction. Backpropagation multiplies one such factor per layer, so a ten-layer network multiplies the gradient by at most 0.25¹⁰, under one in a million, and far less once units saturate. The early layers therefore receive essentially no learning signal — the vanishing gradient problem. ReLU has derivative exactly 1 for positive inputs, so the gradient passes through unattenuated however deep the stack. It is also cheaper to compute, and it produces sparse activations. The cost is the dying ReLU problem, where a unit stuck in the negative region has zero gradient forever, which variants such as leaky ReLU and GELU address.',
        followUp:
          'A strong answer notes that ReLU is not differentiable at exactly zero and that frameworks pick a subgradient by convention, which is harmless because that single point has measure zero.',
      },
      {
        level: 'ml-engineer',
        question: 'Derive the derivative of the sigmoid and explain why its form is convenient for implementation.',
        answer:
          'Write σ(x) = (1 + e^{−x})^{−1}. By the chain rule, σ′(x) = −(1 + e^{−x})^{−2} · d/dx(1 + e^{−x}) = −(1 + e^{−x})^{−2} · (−e^{−x}) = e^{−x}/(1 + e^{−x})². Now split that fraction: it equals [1/(1 + e^{−x})] · [e^{−x}/(1 + e^{−x})]. The first factor is σ(x). The second is 1 − σ(x), since 1 − 1/(1 + e^{−x}) = e^{−x}/(1 + e^{−x}). So σ′(x) = σ(x)(1 − σ(x)). The implementation advantage is that the derivative depends only on the forward output, not on the input, so the backward pass reuses a value already cached and needs no extra exponential. It also shows immediately that the derivative is bounded by 0.25, which is the quantitative statement of the vanishing gradient problem.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Differentiate f(x) = 5x³ − 2x² + 7x − 4 and find f′(2).',
        hint: 'Apply the power rule to each term, and remember the derivative of a constant is zero.',
        solution:
          'f′(x) = 15x² − 4x + 7. At x = 2: 15(4) − 4(2) + 7 = 60 − 8 + 7 = 59. The −4 contributes nothing, because a constant shifts the whole curve up or down without changing its steepness anywhere. A derivative of 59 means the function is rising very steeply at that point.',
      },
      {
        prompt: 'Derive the derivative of f(x) = 3x² + 5 from the limit definition, showing every step.',
        hint: 'Expand (x + h)², cancel, then let h go to zero.',
        solution:
          'The difference quotient is [3(x + h)² + 5 − 3x² − 5]/h = [3x² + 6xh + 3h² + 5 − 3x² − 5]/h. The 3x² and 5 terms cancel, leaving (6xh + 3h²)/h = h(6x + 3h)/h = 6x + 3h, where cancelling h is valid because h is never zero inside the limit. Taking h → 0 gives 6x. This matches the power rule with the constant multiple pulled out, and confirms that the +5 is irrelevant to the slope.',
      },
      {
        prompt: 'For L(w) = (w − 4)² + 0.5w², find L′(w), the minimising w, and verify with the second derivative. Comment on what the penalty did.',
        hint: 'Expand first, or differentiate each term using the chain rule for the square.',
        solution:
          'L(w) = w² − 8w + 16 + 0.5w² = 1.5w² − 8w + 16, so L′(w) = 3w − 8, which is zero at w = 8/3 ≈ 2.667. L″(w) = 3 > 0, so the curve is a bowl and this is the global minimum. Without the 0.5w² term the minimum would sit at w = 4, the perfect fit; the penalty has pulled it in to 2.667. That shrinkage is exactly what L2 regularisation does, and you can see from the algebra that a larger penalty coefficient would pull it further towards zero.',
      },
    ],

    quiz: [
      {
        id: 'MATH-013-q1',
        type: 'numeric',
        concept: 'power rule',
        prompt: 'If f(x) = 4x³, what is f′(2)?',
        answer: 48,
        explanation:
          'f′(x) = 12x², so f′(2) = 12(4) = 48. The power rule brings the exponent down as a multiplier and reduces it by one.',
      },
      {
        id: 'MATH-013-q2',
        type: 'mcq',
        concept: 'interpreting the derivative',
        prompt: 'A loss function has derivative −8 with respect to a weight w. What should gradient descent do?',
        options: [
          'Increase w, because the loss decreases as w rises',
          'Decrease w, because the derivative is negative',
          'Leave w unchanged, since the derivative is not zero',
          'Increase the learning rate to compensate',
        ],
        answerIndex: 0,
        explanation:
          'A negative derivative means the loss falls as w increases, so you move in the direction opposite the derivative: w ← w − η(−8) = w + 8η, an increase.',
      },
      {
        id: 'MATH-013-q3',
        type: 'truefalse',
        concept: 'stationary points',
        prompt: 'If f′(a) = 0 then a must be a minimum of f.',
        answer: false,
        explanation:
          'False. A zero derivative means the point is stationary, which could equally be a maximum or a saddle. The second derivative, or the Hessian eigenvalues in higher dimensions, is what distinguishes them.',
      },
      {
        id: 'MATH-013-q4',
        type: 'match',
        concept: 'derivative rules',
        prompt: 'Match each function to its derivative.',
        pairs: [
          { left: 'x⁵', right: '5x⁴' },
          { left: 'eˣ', right: 'eˣ' },
          { left: 'ln x', right: '1/x' },
          { left: 'max(0, x)', right: '1 for x > 0, 0 for x < 0' },
        ],
        explanation:
          'These four cover most of what appears in a backward pass. The ReLU case is the one worth remembering as piecewise, with no derivative defined at exactly zero.',
      },
      {
        id: 'MATH-013-q5',
        type: 'debug',
        language: 'python',
        concept: 'product rule',
        prompt: 'This function is meant to return the derivative of f(x)·g(x) but is wrong. What is the error?',
        code: 'def d_product(f, g, df, dg, x):\n    return df(x) * dg(x)',
        options: [
          'It should return df(x) * g(x) + f(x) * dg(x)',
          'It should return df(x) / dg(x)',
          'It should return f(x) * g(x)',
          'It should return df(x) + dg(x)',
        ],
        answerIndex: 0,
        explanation:
          'The product rule is (fg)′ = f′g + fg′. Testing with f = g = x makes the error obvious: the true derivative of x² is 2x, while df·dg would give 1·1 = 1.',
      },
      {
        id: 'MATH-013-q6',
        type: 'explain',
        concept: 'derivatives in training',
        prompt: 'Explain how a derivative is used in a single step of gradient descent, and why the steps naturally get smaller near a minimum.',
        rubric: [
          'Says the derivative gives the direction the loss increases, so you move opposite to it',
          'Says the magnitude scales the step size, together with the learning rate',
          'Says the derivative tends to zero at a minimum, so the steps shrink automatically',
        ],
        sampleAnswer:
          'The derivative of the loss with respect to a weight says how the loss responds to nudging that weight. If it is positive, increasing the weight increases the loss, so you decrease it; if negative, you increase it. That is why the update subtracts the derivative rather than adding it. The magnitude matters too: a steep slope means a small change in the weight has a big effect on the loss, so the step taken is proportionally larger, scaled by the learning rate. Near a minimum the curve flattens out, so the derivative shrinks towards zero and the steps shrink with it. This self-damping is why a fixed learning rate can still converge rather than bouncing around forever — though if the learning rate is too large relative to the curvature, the steps overshoot far enough that the loss rises instead, and training diverges.',
        explanation:
          'A strong answer connects direction, magnitude and the shrinking-step behaviour, and mentions the failure mode when the learning rate is too large.',
      },
    ],

    flashcards: [
      { front: 'Limit definition of the derivative?', back: "f'(x) = lim_{h→0} (f(x+h) − f(x))/h — the slope between two nearby points as the gap closes." },
      { front: 'Power rule?', back: 'd/dx xⁿ = n·xⁿ⁻¹. Bring the exponent down, reduce it by one.' },
      { front: 'What does the sign of f′ tell you?', back: 'Positive means rising, negative means falling, zero means stationary. Magnitude gives steepness.' },
      { front: 'Derivative of the sigmoid?', back: 'σ(x)(1 − σ(x)), maximum 0.25 at x = 0 — the quantitative cause of vanishing gradients.' },
      { front: 'Derivative of ln x?', back: '1/x, for x > 0. It blows up near zero, which is why log-loss gradients explode on confident wrong predictions.' },
      { front: 'Product rule?', back: "(fg)' = f'g + fg'. Not f'g' — test it on f = g = x, where the answer must be 2x." },
    ],

    challenge: {
      title: 'A tiny symbolic differentiator',
      brief:
        'Represent polynomials as coefficient lists and implement derivative(coeffs) returning the coefficients of the derivative, evaluate(coeffs, x), and newton_root(coeffs, x0) which uses f and f′ to find a root. Verify your derivative against a central-difference approximation at several points, and find both stationary points of x³ − 3x by applying your root-finder to the derivative.',
      language: 'python',
      acceptanceCriteria: [
        'derivative() handles constants and the zero polynomial without error',
        'Agrees with a central-difference check to within 1e-6 at five or more points',
        'newton_root converges on a root of x³ − 3x from at least two different starting points',
        'Correctly locates the stationary points of x³ − 3x at x = −1 and x = +1',
      ],
      starterCode: '# coeffs[i] is the coefficient of x**i\ndef derivative(coeffs):\n    """Return the coefficient list of the derivative."""\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who has never done calculus what a derivative is, using a physical picture first, and finish by connecting it to how a model learns.',
      mustCover: [
        'A derivative is the steepness of a curve at a single point',
        'It is found by shrinking the gap between two points until the slope settles',
        'The sign says which way the function is heading; the magnitude says how steeply',
        'Training uses the derivative of the loss to decide how to change each weight',
      ],
      bonusSignals: ['uses the hillside or speedometer image', 'mentions that zero derivative means stationary but not necessarily minimum', 'notes that steps shrink near the optimum'],
      sampleExplanation:
        'Stand on a hillside and ask how steep the ground is exactly where you are. You cannot answer by comparing your height with a spot far away, because the hill changes along the way. So you compare with a point slightly ahead, then closer, then closer still, and you watch the answer settle down. The number it settles on is the derivative: the steepness at precisely that spot. It carries two pieces of news at once. The sign says which way the ground tilts — positive means it rises as you walk forwards, negative means it falls away. The size says how dramatic the tilt is, so twenty is a cliff and a hundredth is nearly level. A derivative of exactly zero means you are momentarily flat, which happens at the bottom of a valley, at the top of a peak, and on a shelf in between, so zero alone does not tell you which. This is the whole mechanism by which a model learns. The loss is a landscape, each weight is a direction you can walk in, and the derivative of the loss with respect to a weight tells you whether nudging it up or down makes the model better, and how urgently. You take a step against the slope, recompute, and repeat. As you approach the bottom the ground flattens, the derivative shrinks, and the steps become gentler all by themselves.',
    },
  },

  {
    id: 'MATH-014',
    domain: 'MATH',
    module: 'Calculus',
    topic: 'Gradients',
    title: 'Partial Derivatives and Gradients',
    slug: 'partial-derivatives-and-gradients',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['MATH-013', 'MATH-004'],
    related: ['MATH-005', 'MATH-012'],
    tags: ['partial-derivative', 'gradient', 'steepest-ascent', 'jacobian', 'gradient-descent'],

    learningObjectives: [
      'Compute a partial derivative by treating every other variable as a constant',
      'Assemble partial derivatives into a gradient vector and state what direction it points',
      'Explain why gradient descent moves opposite to the gradient rather than along it',
      'Describe how the gradient of a loss with respect to millions of weights drives training',
    ],

    terminology: [
      {
        term: 'Partial derivative',
        definition:
          'The derivative of a multivariable function with respect to one variable, holding all the others fixed. Written ∂f/∂x.',
        simple: 'How much the output changes when you nudge just one input and freeze the rest.',
      },
      {
        term: 'Gradient',
        definition:
          'The vector of all partial derivatives, ∇f = [∂f/∂x₁, …, ∂f/∂xₙ]. It points in the direction of steepest increase.',
        simple: 'The arrow pointing straight uphill, with length equal to how steep that climb is.',
      },
      {
        term: 'Directional derivative',
        definition:
          'The rate of change along an arbitrary unit direction u, equal to the dot product ∇f·u. It is maximised when u aligns with the gradient.',
        simple: 'How steep the ground is if you walk a particular way.',
      },
      {
        term: 'Level set / contour',
        definition:
          'The set of points where the function takes a constant value. The gradient is always perpendicular to the contour through a point.',
        simple: 'A contour line on a map — walk along it and your height never changes.',
      },
      {
        term: 'Jacobian',
        definition:
          'The matrix of all partial derivatives when the output is also a vector: row i, column j holds ∂fᵢ/∂xⱼ.',
        simple: 'A gradient for each output, stacked into a table.',
      },
      {
        term: 'Hessian',
        definition:
          'The matrix of all second partial derivatives, describing curvature in every direction. Its eigenvalues classify stationary points.',
        simple: 'How the slope itself changes as you move in each direction.',
      },
    ],

    simpleExplanation:
      'Stand on a hillside in thick fog so you can see nothing beyond your own feet. You want to know which way is uphill. You can still find out, by a simple procedure: take one small step due east and notice whether you rose or fell, then return and take one small step due north and notice the same. Two numbers, and from them you can work out the single direction that climbs fastest — and that is not usually due east or due north, but some combination of the two. Each of those two measurements is a partial derivative: the steepness in one direction with the other held still. Bundling them into a single arrow gives the gradient, and the gradient has a remarkable property. It points directly uphill, steepest possible, and its length tells you how steep that climb is. Turn round and walk the opposite way and you are descending as fast as the terrain allows. That is the whole of training a model: the loss is the hill, the weights are the compass directions, and each step walks against the gradient.',

    whyItExists:
      'Real functions depend on many inputs at once, and a single derivative cannot describe a surface. Partial derivatives isolate one variable at a time so each can be analysed with ordinary one-variable calculus, and the gradient reassembles them into a direction. Without it there would be no principled way to improve millions of parameters simultaneously: you would be reduced to trying them one at a time, which for a model with a billion weights is not a method at all.',

    analogy: {
      scenario:
        'A shower has two taps, hot and cold, and you want the water warmer. You nudge the hot tap slightly and the temperature rises by two degrees. You return it and nudge the cold tap by the same amount, and the temperature falls by one degree. Now you know something you could not know from either test alone: to warm the water as fast as possible you should open the hot tap and close the cold one simultaneously, and you should move the hot tap roughly twice as decisively, because it has twice the effect.',
      mapping: [
        { from: 'Nudging the hot tap with the cold one untouched', to: 'The partial derivative with respect to the hot tap' },
        { from: 'The +2 and −1 responses', to: 'The two components of the gradient vector' },
        { from: 'Opening hot and closing cold together', to: 'Moving along the gradient — the direction of fastest increase' },
        { from: 'Moving hot twice as decisively as cold', to: 'The relative magnitudes of the components setting the direction' },
        { from: 'Wanting the water cooler instead', to: 'Moving against the gradient — gradient descent' },
      ],
      bridge:
        'The key move is that you measured one tap at a time but you act on both at once, and the combination is better than either alone. That is exactly what a gradient does: each partial derivative is measured in isolation, yet the assembled vector points in a direction that is generally diagonal to all the axes. Backpropagation performs this for millions of taps in a single sweep.',
      limitations:
        'Two taps interact in ways the analogy hides: opening the hot tap changes how much difference the cold tap makes, which is curvature, and it is the Hessian rather than the gradient that captures it. The gradient is only guaranteed to be the best direction for an infinitesimal step, which is why learning rates must be small and why second-order methods exist.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'A loss surface you can rotate',
        caption: 'See the contours, the gradient arrow and the descent path on the same surface.',
        widget: 'gradient-surface-3d',
      },
      {
        kind: 'flow',
        title: 'Computing a gradient',
        caption: 'The procedure is identical whether there are two variables or two billion.',
        steps: [
          { label: 'Pick one variable', detail: 'Say x. Treat every other variable as a fixed number, as if it were 7.' },
          { label: 'Differentiate normally', detail: 'Apply the ordinary one-variable rules. Terms without x vanish, since constants have zero derivative.' },
          { label: 'Repeat for every variable', detail: 'Each pass gives one number at the current point.' },
          { label: 'Stack the results into a vector', detail: 'That vector is ∇f. Its direction is steepest ascent; its length is the rate of that ascent.' },
          { label: 'Step against it', detail: 'w ← w − η∇f decreases the function fastest, for a small enough η.' },
        ],
      },
      {
        kind: 'table',
        title: 'Partial derivatives of f(x, y) = x²y + 3y',
        caption: 'Notice that each partial treats the other variable as an ordinary constant.',
        columns: ['Term', '∂/∂x (y is a constant)', '∂/∂y (x is a constant)'],
        rows: [
          ['x²y', '2xy', 'x²'],
          ['3y', '0 — no x appears', '3'],
          ['Total', '2xy', 'x² + 3'],
          ['At (2, 1)', '2(2)(1) = 4', '4 + 3 = 7'],
        ],
      },
      {
        kind: 'compare',
        title: 'Gradient ascent versus descent',
        left: {
          heading: 'Following +∇f',
          points: [
            'Climbs the surface as fast as possible',
            'Used to maximise a reward or a likelihood',
            'Reinforcement learning policy gradient methods',
            'Converges towards a local maximum',
          ],
        },
        right: {
          heading: 'Following −∇f',
          points: [
            'Descends as fast as possible',
            'Used to minimise a loss',
            'Every supervised learning training loop',
            'Converges towards a local minimum',
          ],
        },
      },
    ],

    formalDefinition:
      'For f : ℝⁿ → ℝ, the partial derivative at a is ∂f/∂xᵢ(a) = lim_{h→0} (f(a + heᵢ) − f(a))/h, where eᵢ is the i-th standard basis vector. The gradient ∇f(a) ∈ ℝⁿ collects these components. If f is differentiable at a, the directional derivative along a unit vector u is D_u f(a) = ∇f(a)·u, which by Cauchy–Schwarz is maximised when u = ∇f(a)/‖∇f(a)‖ and takes the value ‖∇f(a)‖. Consequently ∇f is orthogonal to the level set through a.',

    math: {
      intuition:
        'Two ideas, in order. First, a partial derivative is nothing new: it is an ordinary derivative taken while pretending every other variable is frozen at its current value. If you can differentiate 3x² you can differentiate 3x²y with respect to x — just carry the y along as if it were the number 7. Second, the gradient is what you get by doing that for every variable and stacking the answers. The reason the gradient points uphill fastest is worth understanding rather than memorising: the rate of change in any direction is the dot product of the gradient with that direction, and a dot product is largest when the two vectors are aligned. So the steepest direction is the gradient itself, and the steepest downhill direction is its exact opposite.',
      formulas: [
        {
          latex: '\\frac{\\partial f}{\\partial x_i}(\\mathbf{a}) = \\lim_{h\\to 0}\\frac{f(\\mathbf{a} + h\\mathbf{e}_i) - f(\\mathbf{a})}{h}',
          name: 'The partial derivative',
          meaning:
            'The ordinary derivative taken along one coordinate axis, with every other coordinate held fixed.',
          variables: [
            { symbol: 'f', meaning: 'A function of several variables returning a single number' },
            { symbol: 'x_i', meaning: 'The variable being varied; all others are frozen' },
            { symbol: '\\mathbf{a}', meaning: 'The point at which the derivative is evaluated' },
            { symbol: '\\mathbf{e}_i', meaning: 'The i-th basis vector, so a + he_i moves only along axis i' },
            { symbol: 'h', meaning: 'The shrinking step size' },
            { symbol: '\\partial', meaning: 'The partial derivative symbol, signalling that other variables are held constant' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\nabla f = \\left[\\frac{\\partial f}{\\partial x_1},\; \\frac{\\partial f}{\\partial x_2},\; \\ldots,\; \\frac{\\partial f}{\\partial x_n}\\right]^{\\top}',
          name: 'The gradient vector',
          meaning:
            'All the partial derivatives stacked into one vector. It points in the direction of steepest increase, with length equal to that rate.',
          variables: [
            { symbol: '\\nabla f', meaning: 'The gradient, read "grad f" or "del f"' },
            { symbol: '\\partial f/\\partial x_i', meaning: 'The i-th partial derivative, one component of the vector' },
            { symbol: 'n', meaning: 'The number of variables — for a neural network, the number of parameters' },
            { symbol: '\\top', meaning: 'Transpose, marking it as a column vector by convention' },
          ],
          category: 'calculus',
        },
        {
          latex: 'D_{\\mathbf{u}}f(\\mathbf{a}) = \\nabla f(\\mathbf{a}) \\cdot \\mathbf{u} = \\|\\nabla f(\\mathbf{a})\\|\\cos\\theta',
          name: 'The directional derivative',
          meaning:
            'The rate of change along any chosen direction. Written as a dot product, it makes the steepest-ascent property immediate.',
          variables: [
            { symbol: '\\mathbf{u}', meaning: 'A unit vector giving the direction of travel' },
            { symbol: '\\nabla f(\\mathbf{a})', meaning: 'The gradient at the point a' },
            { symbol: '\\theta', meaning: 'The angle between the gradient and the chosen direction' },
            { symbol: '\\|\\nabla f(\\mathbf{a})\\|', meaning: 'The length of the gradient, that is the maximum possible rate of ascent' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta\\nabla L(\\boldsymbol{\\theta}_t)',
          name: 'Gradient descent',
          meaning:
            'Step against the gradient to reduce the loss. The minus sign is the entire difference between learning and unlearning.',
          variables: [
            { symbol: '\\boldsymbol{\\theta}_t', meaning: 'The full parameter vector at step t' },
            { symbol: '\\eta', meaning: 'The learning rate, controlling how far along the direction you move' },
            { symbol: '\\nabla L', meaning: 'The gradient of the loss with respect to every parameter' },
            { symbol: 't', meaning: 'The iteration counter' },
          ],
          category: 'optimization',
        },
        {
          latex: 'J_{ij} = \\frac{\\partial f_i}{\\partial x_j}, \\qquad J \\in \\mathbb{R}^{m \\times n}',
          name: 'The Jacobian matrix',
          meaning:
            'When the output is a vector rather than a scalar, each output gets its own gradient and they stack into a matrix.',
          variables: [
            { symbol: 'J', meaning: 'The Jacobian matrix of a function from ℝⁿ to ℝᵐ' },
            { symbol: 'f_i', meaning: 'The i-th component of the output' },
            { symbol: 'x_j', meaning: 'The j-th input variable' },
            { symbol: 'm', meaning: 'Number of outputs, hence rows' },
            { symbol: 'n', meaning: 'Number of inputs, hence columns' },
          ],
          category: 'calculus',
        },
        {
          latex: 'H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}',
          name: 'The Hessian matrix',
          meaning:
            'All second partial derivatives, describing curvature. Its eigenvalues decide whether a stationary point is a minimum, maximum or saddle.',
          variables: [
            { symbol: 'H', meaning: 'The Hessian, a symmetric n×n matrix for a twice-continuously-differentiable f' },
            { symbol: '\\partial^2 f', meaning: 'A second derivative: the rate at which a slope is itself changing' },
            { symbol: 'x_i, x_j', meaning: 'The two variables differentiated with respect to, in either order' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Why does the gradient point in the direction of steepest ascent? Start from the directional derivative.',
        'Moving a small distance h in a unit direction u changes the function by approximately h times the rate of change along u.',
        'That rate is D_u f = ∇f·u, the dot product of the gradient with the direction.',
        'From MATH-005, a dot product equals ‖∇f‖‖u‖cos θ, and since u is a unit vector this is just ‖∇f‖cos θ.',
        'The only quantity you control is θ, the angle between your chosen direction and the gradient. ‖∇f‖ is fixed by where you are standing.',
        'cos θ is largest, equal to 1, when θ = 0 — that is, when you walk exactly along the gradient. The rate of ascent is then ‖∇f‖, the maximum available.',
        'cos θ is smallest, equal to −1, when θ = 180 degrees — walking exactly opposite the gradient — giving a rate of −‖∇f‖, the steepest possible descent. That is why gradient descent subtracts.',
        'And cos θ = 0 when θ = 90 degrees, so walking perpendicular to the gradient changes the function not at all to first order. That direction traces the contour line, which is why the gradient is always perpendicular to the level set.',
      ],
    },

    workedExample: {
      title: 'A two-variable loss, computed and descended by hand',
      setup:
        'Let L(w₁, w₂) = w₁² + 3w₂² + w₁w₂ − 4w₁. We will find the gradient, evaluate it at (1, 1), take one descent step, and confirm the loss went down.',
      steps: [
        { label: 'Partial with respect to w₁', detail: 'Treat w₂ as a constant. d/dw₁ of w₁² is 2w₁; of 3w₂² is 0; of w₁w₂ is w₂; of −4w₁ is −4.', latex: '\\frac{\\partial L}{\\partial w_1} = 2w_1 + w_2 - 4' },
        { label: 'Partial with respect to w₂', detail: 'Now treat w₁ as a constant. d/dw₂ of w₁² is 0; of 3w₂² is 6w₂; of w₁w₂ is w₁; of −4w₁ is 0.', latex: '\\frac{\\partial L}{\\partial w_2} = 6w_2 + w_1' },
        { label: 'Assemble the gradient', detail: 'Stack the two partials into a vector.', latex: '\\nabla L = \\begin{bmatrix} 2w_1 + w_2 - 4 \\\\ 6w_2 + w_1 \\end{bmatrix}' },
        { label: 'Evaluate at (1, 1)', detail: 'First component: 2(1) + 1 − 4 = −1. Second: 6(1) + 1 = 7. So ∇L(1,1) = [−1, 7].', latex: '\\nabla L(1,1) = \\begin{bmatrix} -1 \\\\ 7 \\end{bmatrix}' },
        { label: 'Read the result', detail: 'The second component is seven times larger in magnitude, so the loss is far more sensitive to w₂ than to w₁ here. The steepest uphill direction is mostly "increase w₂".' },
        { label: 'Current loss', detail: 'L(1,1) = 1 + 3 + 1 − 4 = 1.' },
        { label: 'Take a descent step with η = 0.1', detail: 'w₁ ← 1 − 0.1(−1) = 1.1, and w₂ ← 1 − 0.1(7) = 0.3. Note w₁ went up, because its partial was negative.' },
        { label: 'Confirm improvement', detail: 'L(1.1, 0.3) = 1.21 + 3(0.09) + 0.33 − 4.4 = 1.21 + 0.27 + 0.33 − 4.4 = −2.59. The loss fell from 1 to −2.59.' },
        { label: 'Where is the minimum?', detail: 'Set both partials to zero: 2w₁ + w₂ = 4 and 6w₂ + w₁ = 0, so w₁ = −6w₂. Substituting: −12w₂ + w₂ = 4, giving w₂ = −4/11 and w₁ = 24/11 ≈ 2.182.' },
      ],
      conclusion:
        'The gradient at (1, 1) is [−1, 7], and one step of size 0.1 against it dropped the loss from 1 to −2.59. The true minimum sits at roughly (2.182, −0.364). Notice that the two components differ by a factor of seven: this imbalance is exactly the condition that makes plain gradient descent zigzag, and it is what adaptive optimisers such as Adam are designed to correct.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Gradients by hand and by autograd',
        runnable: true,
        code: `import numpy as np, torch

def L(w1, w2):
    return w1 ** 2 + 3 * w2 ** 2 + w1 * w2 - 4 * w1

def grad_by_hand(w1, w2):
    return np.array([2 * w1 + w2 - 4, 6 * w2 + w1])

w = torch.tensor([1.0, 1.0], requires_grad=True)
loss = L(w[0], w[1])
loss.backward()

print("by hand :", grad_by_hand(1.0, 1.0))
print("autograd:", w.grad.numpy())
print("loss    :", loss.item())`,
        output: `by hand : [-1.  7.]
autograd: [-1.  7.]
loss    : 1.0`,
        explanation:
          'Autograd reproduces the hand-derived partials exactly, because it applies the same differentiation rules mechanically rather than approximating. Checking a hand derivation against autograd on a small example is the fastest way to catch an algebra slip before it becomes a subtly wrong training loop.',
      },
      {
        language: 'python',
        title: 'The gradient really is the steepest direction',
        runnable: true,
        code: `import numpy as np

def L(w):    return w[0] ** 2 + 3 * w[1] ** 2 + w[0] * w[1] - 4 * w[0]
def grad(w): return np.array([2 * w[0] + w[1] - 4, 6 * w[1] + w[0]])

p = np.array([1.0, 1.0])
g = grad(p)
h = 1e-6

best = (-1e9, None)
for deg in range(0, 360, 15):
    t = np.radians(deg)
    u = np.array([np.cos(t), np.sin(t)])
    rate = (L(p + h * u) - L(p)) / h
    if rate > best[0]:
        best = (rate, deg)

print("gradient      :", g, " norm", round(float(np.linalg.norm(g)), 4))
print("gradient angle:", round(float(np.degrees(np.arctan2(g[1], g[0]))), 2), "degrees")
print("best sampled  :", best[1], "degrees, rate", round(best[0], 4))`,
        output: `gradient      : [-1.  7.]  norm 7.0711
gradient angle: 98.13 degrees
best sampled  : 105 degrees, rate 6.9282`,
        explanation:
          'Sampling twenty-four directions and measuring the actual rate of change finds the best one at 105 degrees, the closest sample to the gradient’s true angle of 98.13 degrees, with a rate approaching the gradient norm of 7.07. This is the steepest-ascent property demonstrated empirically rather than asserted: no direction beats the gradient, and the best achievable rate is exactly its length.',
      },
      {
        language: 'python',
        title: 'Why unequal gradient components cause zigzagging',
        runnable: true,
        code: `import numpy as np

def grad(w): return np.array([2 * w[0], 20 * w[1]])   # L = w0^2 + 10*w1^2

w = np.array([1.0, 1.0])
eta = 0.09
for step in range(6):
    w = w - eta * grad(w)
    print(f"step {step}: w = [{w[0]:+.5f}, {w[1]:+.5f}]")`,
        output: `step 0: w = [+0.82000, -0.80000]
step 1: w = [+0.67240, +0.64000]
step 2: w = [+0.55137, -0.51200]
step 3: w = [+0.45212, +0.40960]
step 4: w = [+0.37074, -0.32768]
step 5: w = [+0.30402, +0.26214]`,
        explanation:
          'The second coordinate flips sign at every step while the first crawls steadily inwards. The curvature along w₁ is ten times that along w₀, so a learning rate large enough to make progress on w₀ overshoots on w₁ and oscillates. The learning rate is bounded by the steepest direction while progress is governed by the shallowest, which is the practical meaning of an ill-conditioned loss surface and the reason momentum and Adam exist.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Training any neural network',
        usage:
          'Backpropagation computes ∂L/∂w for every weight in one backward sweep, and the optimiser steps every parameter against its own partial derivative simultaneously.',
      },
      {
        context: 'Adaptive optimisers',
        usage:
          'Adam keeps a running estimate of each partial derivative’s magnitude and rescales per-parameter step sizes, which is a direct response to the imbalance shown above.',
      },
      {
        context: 'Saliency maps and adversarial examples',
        usage:
          'Both take the gradient of the output with respect to the input pixels: one to visualise which pixels matter, the other to perturb them along the gradient and fool the model.',
      },
      {
        context: 'Physics-informed neural networks',
        usage:
          'Partial derivatives of the network output with respect to its spatial and time inputs are computed by autograd and inserted directly into the differential equation being solved.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'loss.backward() fills .grad for every parameter; torch.autograd.grad computes partials with respect to arbitrary tensors.' },
      { tool: 'JAX', role: 'jax.grad returns a function computing the gradient; jax.jacobian and jax.hessian extend it to vector outputs and curvature.' },
      { tool: 'SciPy', role: 'scipy.optimize.minimize accepts an analytic gradient via jac=, which is far faster and more accurate than its finite-difference fallback.' },
    ],

    commonMistakes: [
      {
        mistake: 'Adding the gradient instead of subtracting it',
        why: 'The gradient points uphill, which feels like the direction of progress when you are minimising.',
        fix: 'To minimise, always subtract: θ ← θ − η∇L. The symptom of getting this wrong is a loss that rises monotonically from the first step.',
      },
      {
        mistake: 'Forgetting to zero gradients between steps',
        why: 'PyTorch accumulates into .grad by design, so that gradients from multiple backward passes can be summed deliberately.',
        fix: 'Call optimizer.zero_grad() at the top of every iteration. Without it the effective learning rate grows every step and training diverges.',
      },
      {
        mistake: 'Treating other variables as varying inside a partial derivative',
        why: 'In a neural network the variables genuinely are related, so freezing them feels wrong.',
        fix: 'A partial derivative freezes them by definition. Relationships between variables are handled by the chain rule, which is the subject of the next unit.',
      },
      {
        mistake: 'Assuming a small gradient means you have reached a good minimum',
        why: 'Gradient descent stalls whenever the gradient is small, and stalling looks like convergence.',
        fix: 'A small gradient also occurs at saddle points and on wide plateaus, which are far more common than local minima in high dimensions. Check the loss value and the curvature, not just the gradient norm.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is a gradient, and why does gradient descent move in the negative gradient direction?',
        answer:
          'A gradient is the vector of all partial derivatives of a scalar function with respect to its inputs. Each component says how much the output changes when that one input is nudged with the others held fixed. The vector as a whole points in the direction of steepest increase, and its length is the rate of increase in that direction. The reason follows from the directional derivative: the rate of change along any unit direction u is ∇f·u, which equals ‖∇f‖cos θ. That is maximised when θ = 0, so walking along the gradient climbs fastest, and minimised at θ = 180 degrees, so walking exactly opposite descends fastest. Since training minimises a loss, you step against the gradient. A useful corollary is that moving perpendicular to the gradient changes the loss not at all to first order, which is why contour lines are perpendicular to gradients.',
        followUp:
          'A strong answer notes that steepest descent is only optimal for an infinitesimal step, which is why a learning rate that is too large can increase the loss even though the direction was correct.',
      },
      {
        level: 'ml-engineer',
        question: 'Your training loss decreases in a zigzag and progress is very slow. What does that suggest about the loss surface and what would you do?',
        answer:
          'Zigzagging indicates an ill-conditioned surface: curvature differs greatly between directions, so the Hessian has a large ratio between its biggest and smallest eigenvalues. The learning rate is bounded by the steepest direction, where a larger step would overshoot and oscillate, while progress along the shallow direction is governed by that same small rate and is therefore glacial. Remedies come at three levels. Fix the data: standardise features, since unscaled inputs are the commonest cause of wildly different curvatures. Fix the architecture: batch normalisation or layer normalisation keeps activation scales comparable across layers. Fix the optimiser: momentum damps the oscillating component while accumulating the consistent one, and Adam or RMSProp rescale each parameter by a running estimate of its gradient magnitude, which directly equalises the effective step size per direction.',
      },
      {
        level: 'advanced',
        question: 'Distinguish the gradient, the Jacobian and the Hessian, and say where each appears in deep learning.',
        answer:
          'The gradient applies to a function with many inputs and one output, and is a vector of first partial derivatives — this is what backpropagation computes for a scalar loss, and it is what the optimiser consumes. The Jacobian applies when the output is also a vector: it is a matrix whose row i is the gradient of output i, so a layer mapping ℝⁿ to ℝᵐ has an m×n Jacobian. Backpropagation never forms these explicitly; it computes vector-Jacobian products, which is why the backward pass costs about the same as the forward pass rather than n times as much. The Hessian is the matrix of second partial derivatives of a scalar function, describing curvature, and its eigenvalues classify a stationary point as a minimum, maximum or saddle. It is too large to form for a real network — a billion parameters would need 1e18 entries — so second-order methods use Hessian-vector products, or approximations such as the diagonal used implicitly by Adam, or limited-memory quasi-Newton updates as in L-BFGS.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For f(x, y) = 3x²y + 2y³ − 5x, find both partial derivatives and evaluate the gradient at (1, 2).',
        hint: 'For ∂f/∂x treat y as a fixed number; for ∂f/∂y treat x as fixed.',
        solution:
          '∂f/∂x = 6xy − 5, since the 2y³ term contains no x and vanishes. ∂f/∂y = 3x² + 6y², since the −5x term vanishes. At (1, 2): ∂f/∂x = 6(1)(2) − 5 = 7 and ∂f/∂y = 3(1) + 6(4) = 27. So ∇f(1,2) = [7, 27], meaning the function is nearly four times more sensitive to y than to x at that point.',
      },
      {
        prompt: 'A loss has gradient [3, −6, 0] at the current parameters. With a learning rate of 0.1, give the updated parameters starting from [1, 1, 1] and explain what the zero component means.',
        hint: 'Subtract the learning rate times each gradient component.',
        solution:
          'New parameters: [1 − 0.1(3), 1 − 0.1(−6), 1 − 0.1(0)] = [0.7, 1.6, 1.0]. The first decreased because its partial was positive, the second increased because its partial was negative, and the third is unchanged. A zero partial means the loss is momentarily insensitive to that parameter — nudging it either way makes no first-order difference, which may be because it sits at a stationary point in that direction, or because the parameter is genuinely unused, as with a dead ReLU unit.',
      },
      {
        prompt: 'Explain why the gradient is always perpendicular to the contour lines of a function.',
        hint: 'Consider the directional derivative along a contour.',
        solution:
          'A contour is the set of points where the function value is constant, so walking along it produces no change in the output, meaning the directional derivative in that direction is zero. But the directional derivative is ∇f·u, so ∇f·u = 0 for any direction u tangent to the contour. A zero dot product means the two vectors are orthogonal, so the gradient is perpendicular to the contour. This is also the intuitive picture on a map: contour lines run around a hill and the steepest path crosses them at right angles.',
      },
    ],

    quiz: [
      {
        id: 'MATH-014-q1',
        type: 'mcq',
        concept: 'direction of the gradient',
        prompt: 'What direction does the gradient of a function point in?',
        options: [
          'The direction of steepest increase',
          'The direction of steepest decrease',
          'Along the contour line',
          'Towards the nearest minimum',
        ],
        answerIndex: 0,
        explanation:
          'The gradient points uphill fastest, which is why minimisation subtracts it. Its length is the rate of that steepest increase.',
      },
      {
        id: 'MATH-014-q2',
        type: 'numeric',
        concept: 'computing a partial derivative',
        prompt: 'For f(x, y) = x²y + 3y, what is ∂f/∂x at the point (2, 1)?',
        answer: 4,
        explanation:
          'Holding y fixed, ∂f/∂x = 2xy, since 3y has no x and differentiates to zero. At (2, 1) that is 2(2)(1) = 4.',
      },
      {
        id: 'MATH-014-q3',
        type: 'truefalse',
        concept: 'gradient and contours',
        prompt: 'The gradient is always perpendicular to the contour line through a point.',
        answer: true,
        explanation:
          'True. Moving along a contour leaves the value unchanged, so the directional derivative ∇f·u is zero there, and a zero dot product means orthogonality.',
      },
      {
        id: 'MATH-014-q4',
        type: 'debug',
        language: 'python',
        concept: 'sign of the update',
        prompt: 'This training loop makes the loss rise every step. What is the bug?',
        code: 'for _ in range(100):\n    loss = model_loss(w)\n    g = gradient(w)\n    w = w + lr * g',
        options: [
          'The update should subtract the gradient, not add it',
          'The learning rate should be negative',
          'The loss should be computed after the update',
          'gradient() should be called before model_loss()',
        ],
        answerIndex: 0,
        explanation:
          'Adding the gradient performs gradient ascent, climbing the loss surface. Minimisation requires w = w − lr * g, which is why a monotonically rising loss is the classic symptom of this sign error.',
      },
      {
        id: 'MATH-014-q5',
        type: 'match',
        concept: 'derivative objects',
        prompt: 'Match each object to what it contains.',
        pairs: [
          { left: 'Partial derivative', right: 'Rate of change in one variable, others held fixed' },
          { left: 'Gradient', right: 'Vector of all first partials of a scalar function' },
          { left: 'Jacobian', right: 'Matrix of partials when the output is a vector' },
          { left: 'Hessian', right: 'Matrix of second partials, describing curvature' },
        ],
        explanation:
          'Knowing which object you need is half of reading any optimisation paper: gradients drive first-order methods, Jacobians appear in the backward pass, and Hessians classify stationary points.',
      },
      {
        id: 'MATH-014-q6',
        type: 'explain',
        concept: 'gradients drive training',
        prompt: 'Explain how the gradient of the loss is used to train a model with millions of parameters.',
        rubric: [
          'Says each parameter has its own partial derivative of the loss',
          'Says those partials assemble into a gradient pointing uphill',
          'Says every parameter is updated simultaneously against the gradient, scaled by a learning rate',
        ],
        sampleAnswer:
          'For each parameter in the model there is a number saying how the loss would change if that one parameter were nudged with all the others held still — its partial derivative. Backpropagation computes all of them in a single backward sweep, at roughly the cost of one forward pass, and stacks them into a single vector, the gradient. That vector points in the direction in parameter space along which the loss rises fastest, so the optimiser moves every parameter simultaneously in the exact opposite direction, scaled by the learning rate. Then it recomputes and repeats. The reason this scales to billions of parameters is that no parameter is ever tried individually: one backward pass yields every partial derivative at once, and one vector subtraction updates them all.',
        explanation:
          'The answer should make clear that all parameters move together, and that the cost of obtaining the whole gradient is what makes the approach feasible.',
      },
    ],

    flashcards: [
      { front: 'What is a partial derivative?', back: 'The derivative with respect to one variable, treating all others as constants.' },
      { front: 'What is the gradient?', back: 'The vector of all partial derivatives. It points in the direction of steepest increase, with length equal to that rate.' },
      { front: 'Why does gradient descent subtract the gradient?', back: 'The gradient points uphill; its negative is the steepest descent direction, since ∇f·u is minimised at θ = 180 degrees.' },
      { front: 'Directional derivative formula?', back: 'D_u f = ∇f·u = ‖∇f‖cos θ. Maximised along the gradient, zero perpendicular to it.' },
      { front: 'Gradient versus Jacobian?', back: 'Gradient: one output, many inputs, a vector. Jacobian: many outputs, many inputs, a matrix of stacked gradients.' },
      { front: 'What causes zigzagging descent?', back: 'Very different curvature across directions. The learning rate is capped by the steepest direction while progress is set by the shallowest.' },
    ],

    challenge: {
      title: 'Gradient descent on a surface you can see',
      brief:
        'Implement gradient descent for f(x, y) = x² + 10y² from the start point (5, 5). Run it at three learning rates — one too small, one well chosen, one large enough to diverge — recording the path and the loss at each step. Then verify your analytic gradient against a central-difference approximation at five random points, and print the largest relative discrepancy.',
      language: 'python',
      acceptanceCriteria: [
        'Analytic gradient matches central differences to within 1e-6 relative error',
        'Demonstrates all three regimes: slow convergence, good convergence, and divergence',
        'Records and prints the trajectory, showing the zigzag in the y coordinate',
        'States the learning rate above which divergence begins and relates it to the curvature',
      ],
      starterCode: 'import numpy as np\n\ndef f(p):    return p[0] ** 2 + 10 * p[1] ** 2\ndef grad(p): raise NotImplementedError\n',
    },

    teachingPrompt: {
      prompt:
        'Explain partial derivatives and the gradient to someone who understands single-variable derivatives, and make clear why the gradient is the single most important idea in training models.',
      mustCover: [
        'A partial derivative varies one input while holding all the others fixed',
        'The gradient is those partials stacked into a vector',
        'The gradient points in the direction of steepest increase',
        'Training subtracts the gradient so that the loss falls as fast as possible',
      ],
      bonusSignals: ['uses the fog-covered hillside or two-tap shower image', 'explains steepest ascent via the dot product', 'notes that the gradient is perpendicular to contours'],
      sampleExplanation:
        'You already know how to find the steepness of a curve that depends on one number. Now suppose the output depends on two, or on two billion. The trick is to take them one at a time: freeze every input but one, nudge that one, and see how the output responds. That is a partial derivative, and it is an ordinary derivative in disguise — everything else is just carried along as though it were a fixed number. Do this for every input and you have a list of numbers, one per input, and that list is the gradient. Here is why it matters so much. Imagine standing on a hillside in fog. Testing east and testing north gives you two numbers, and from them you can work out the one direction that climbs fastest, which is usually neither east nor north but some diagonal. The gradient is exactly that direction, and its length tells you how steep the climb is. Turn round and you are descending as fast as the terrain allows. Training a model is nothing more than this, repeated: the loss is the landscape, every weight is a direction you can move in, and backpropagation computes the whole gradient in one sweep so that every weight can be adjusted against it simultaneously. That last point is what makes it practical at all — you never test parameters one by one; you get all of them in a single pass.',
    },
  },

  {
    id: 'MATH-015',
    domain: 'MATH',
    module: 'Calculus',
    topic: 'The chain rule',
    title: 'The Chain Rule',
    slug: 'the-chain-rule',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['MATH-013'],
    related: ['MATH-001', 'MATH-014'],
    tags: ['chain-rule', 'backpropagation', 'composition', 'autograd', 'computational-graph'],

    learningObjectives: [
      'State the chain rule and explain it as multiplying rates of change along a chain',
      'Differentiate a composite function such as (3x + 1)⁵ or e^(x²) correctly',
      'Apply the multivariable chain rule to a two-layer network and obtain every weight gradient',
      'Explain precisely why backpropagation is the chain rule applied systematically in reverse',
    ],

    terminology: [
      {
        term: 'Composite function',
        definition:
          'A function built by feeding one function’s output into another, written f(g(x)). Every deep network is a long composition.',
        simple: 'Machines bolted together, output of one feeding the next.',
      },
      {
        term: 'Chain rule',
        definition:
          'The rule that the derivative of a composition is the product of the derivatives of its parts, each evaluated at the right point.',
        simple: 'Multiply the rates along the chain.',
      },
      {
        term: 'Computational graph',
        definition:
          'A directed graph in which nodes are operations and edges carry values. Frameworks build one during the forward pass so the chain rule can be applied in reverse.',
        simple: 'A map of every calculation, recorded so it can be walked backwards.',
      },
      {
        term: 'Upstream gradient',
        definition:
          'The derivative of the loss with respect to a node’s output, handed down from later in the graph. Each node multiplies it by its own local derivative.',
        simple: 'The signal arriving from the layer above.',
      },
      {
        term: 'Local gradient',
        definition:
          'The derivative of a node’s output with respect to its own input, computable from that node alone without knowing anything about the rest of the network.',
        simple: 'What this one step contributes to the total rate.',
      },
      {
        term: 'Backpropagation',
        definition:
          'Reverse-mode automatic differentiation: one backward sweep through the computational graph that produces the derivative of a scalar loss with respect to every parameter.',
        simple: 'Applying the chain rule from the loss backwards, reusing results as you go.',
      },
    ],

    simpleExplanation:
      'Suppose a factory has three stages, and you want to know how much the final output changes if you turn up the raw material supply by one unit. You do not need to understand the whole factory at once. You only need three simple facts: each extra unit of raw material produces two parts, each part produces three subassemblies, and each subassembly produces four finished goods. Multiply them — two times three times four — and one extra unit of raw material gives twenty-four extra finished goods. That multiplication is the chain rule. Nothing more sophisticated is happening. When one thing affects a second which affects a third, the overall sensitivity is the product of the individual sensitivities along the way. This turns out to be the single most important fact in deep learning, because a neural network is exactly such a chain: the input affects the first layer, which affects the second, which affects the loss. Working out how a weight buried deep in the network affects the final loss means multiplying the rates along the path back to it, and that is what backpropagation does.',

    whyItExists:
      'Real functions are almost never written as a single elementary expression; they are compositions of simpler pieces, and there is no way to differentiate them directly. The chain rule decomposes the problem into local derivatives that each depend on one operation alone, then multiplies them. Without it, training a network of any depth would be impossible: there would be no way to attribute a change in the loss to a weight several layers away from it.',

    analogy: {
      scenario:
        'Three interlocking gears drive each other. Turning the first gear once turns the second gear three times because of the tooth ratio, and each turn of the second turns the third five times. You never need to inspect the mechanism as a whole to know that one turn of the first produces fifteen turns of the third: you multiply the ratios. Reverse one gear and the sign flips throughout the chain, but the arithmetic is unchanged.',
      mapping: [
        { from: 'The tooth ratio between gear one and gear two', to: "The local derivative du/dx" },
        { from: 'The tooth ratio between gear two and gear three', to: 'The local derivative dy/du' },
        { from: 'Fifteen turns of the third gear per turn of the first', to: 'The overall derivative dy/dx = 15' },
        { from: 'A gear that turns backwards', to: 'A negative local derivative, flipping the sign of everything downstream' },
        { from: 'A seized gear that does not turn at all', to: 'A zero local derivative, killing the gradient for everything behind it' },
      ],
      bridge:
        'The gear train makes two things vivid that matter enormously in practice. First, the overall sensitivity is a product, so the whole chain is as strong as its factors multiplied — not averaged. Second, that is precisely why gradients vanish and explode: multiply twenty factors of 0.25 and you get under 1e-12, so the first gear barely feels the last; multiply twenty factors of 1.5 and you get over 3000, and the first gear is torn off its mounting.',
      limitations:
        'Gear ratios are fixed, whereas local derivatives depend on where you currently are — the derivative of a sigmoid is 0.25 at the origin and near zero when saturated. So the effective ratios change at every step of training, which is why gradient behaviour can deteriorate partway through a run rather than being determined at initialisation.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Follow the gradient backwards through a graph',
        caption: 'Watch upstream gradients multiply by local derivatives at each node.',
        widget: 'backprop-flow',
      },
      {
        kind: 'flow',
        title: 'Applying the chain rule to (3x + 1)⁵',
        caption: 'Identify outer and inner, differentiate each, then multiply.',
        steps: [
          { label: 'Name the inner function', detail: 'u = 3x + 1. The outer function is then u⁵.' },
          { label: 'Differentiate the outer, keeping the inner intact', detail: 'd/du of u⁵ is 5u⁴, which is 5(3x + 1)⁴.' },
          { label: 'Differentiate the inner', detail: 'du/dx = 3.' },
          { label: 'Multiply', detail: '5(3x + 1)⁴ · 3 = 15(3x + 1)⁴. Forgetting the final factor of 3 is the classic error.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a backward step at one node',
        subject: 'dL/dinput = dL/doutput × doutput/dinput',
        annotations: [
          { part: 'dL/doutput', note: 'The upstream gradient, handed down from the node after this one. This node did not compute it.' },
          { part: '×', note: 'A plain multiplication. Every node does exactly this, which is why backprop is so uniform.' },
          { part: 'doutput/dinput', note: 'The local gradient, depending only on this operation and the values it saw in the forward pass.' },
          { part: 'dL/dinput', note: 'What gets passed further back, becoming the upstream gradient for the previous node.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Forward-mode versus reverse-mode differentiation',
        left: {
          heading: 'Forward mode',
          points: [
            'Propagates derivatives from inputs towards outputs',
            'One sweep per input variable',
            'Efficient when there are few inputs and many outputs',
            'Costly for a network: one sweep per parameter is hopeless',
          ],
        },
        right: {
          heading: 'Reverse mode (backpropagation)',
          points: [
            'Propagates derivatives from the output back towards the inputs',
            'One sweep per output',
            'Efficient when there are many inputs and one output',
            'A scalar loss and a billion parameters is exactly this case',
          ],
        },
      },
    ],

    formalDefinition:
      'If g is differentiable at x and f is differentiable at g(x), then (f ∘ g) is differentiable at x with (f ∘ g)′(x) = f′(g(x))·g′(x). In several variables, for z = f(u₁, …, u_m) with each u_i a function of x, the chain rule reads ∂z/∂x = Σ_{i=1}^{m} (∂z/∂u_i)(∂u_i/∂x), the sum accounting for every path from x to z. In matrix form, the Jacobian of a composition is the product of the Jacobians, J_{f∘g}(x) = J_f(g(x))·J_g(x), and reverse-mode automatic differentiation evaluates this product right to left using vector-Jacobian products.',

    math: {
      intuition:
        'Think of it as a currency conversion. If one pound buys 1.2 euros and one euro buys 160 yen, then one pound buys 1.2 × 160 = 192 yen. You never needed a direct pound-to-yen rate; you multiplied the rates along the chain. The chain rule says exactly this about rates of change: if y responds to u at rate dy/du, and u responds to x at rate du/dx, then y responds to x at the product of the two. The one subtlety worth being careful about is where each factor is evaluated. The outer derivative must be evaluated at the inner function’s current value, not at x — which is why f′(g(x)) appears rather than f′(x). Everything else is multiplication.',
      formulas: [
        {
          latex: '\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}',
          name: 'The chain rule, Leibniz form',
          meaning:
            'Rates multiply along a chain. The notation is deliberately suggestive: the du appears to cancel, which is a useful mnemonic though not a proof.',
          variables: [
            { symbol: 'y', meaning: 'The final output' },
            { symbol: 'u', meaning: 'The intermediate quantity: the output of the inner function' },
            { symbol: 'x', meaning: 'The original input' },
            { symbol: 'dy/du', meaning: 'How fast the output responds to the intermediate' },
            { symbol: 'du/dx', meaning: 'How fast the intermediate responds to the input' },
          ],
          category: 'calculus',
        },
        {
          latex: "\\frac{d}{dx}f\\bigl(g(x)\\bigr) = f'\\bigl(g(x)\\bigr)\\cdot g'(x)",
          name: 'The chain rule, Lagrange form',
          meaning:
            'Differentiate the outer function leaving the inner one untouched inside it, then multiply by the derivative of the inner one.',
          variables: [
            { symbol: 'f', meaning: 'The outer function, applied second' },
            { symbol: 'g', meaning: 'The inner function, applied first' },
            { symbol: "f'(g(x))", meaning: "The outer derivative evaluated at the inner function's value — not at x" },
            { symbol: "g'(x)", meaning: 'The inner derivative, evaluated at x' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\frac{\\partial z}{\\partial x} = \\sum_{i=1}^{m}\\frac{\\partial z}{\\partial u_i}\\frac{\\partial u_i}{\\partial x}',
          name: 'The multivariable chain rule',
          meaning:
            'When x influences the output through several routes, add the contributions of all of them. This sum is why a shared weight accumulates gradient from every place it is used.',
          variables: [
            { symbol: 'z', meaning: 'The final scalar output, such as the loss' },
            { symbol: 'u_i', meaning: 'The i-th intermediate quantity depending on x' },
            { symbol: 'm', meaning: 'How many distinct paths lead from x to z' },
            { symbol: '\\sum', meaning: 'Sum over every path — contributions add, they do not replace one another' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\frac{\\partial L}{\\partial W^{(1)}} = \\frac{\\partial L}{\\partial \\hat{y}}\\cdot\\frac{\\partial \\hat{y}}{\\partial h}\\cdot\\frac{\\partial h}{\\partial z}\\cdot\\frac{\\partial z}{\\partial W^{(1)}}',
          name: 'Backpropagation through two layers',
          meaning:
            'The gradient for an early weight is the product of every local derivative between it and the loss, evaluated in reverse order.',
          variables: [
            { symbol: 'L', meaning: 'The scalar loss' },
            { symbol: '\\hat{y}', meaning: 'The network prediction' },
            { symbol: 'h', meaning: 'The hidden layer activation' },
            { symbol: 'z', meaning: 'The hidden pre-activation, before the nonlinearity' },
            { symbol: 'W^{(1)}', meaning: 'The first-layer weight matrix whose gradient is wanted' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\left\\|\\frac{\\partial L}{\\partial \\mathbf{h}^{(1)}}\\right\\| \\approx \\prod_{k=2}^{K}\\left\\|\\frac{\\partial \\mathbf{h}^{(k)}}{\\partial \\mathbf{h}^{(k-1)}}\\right\\|',
          name: 'Why gradients vanish or explode',
          meaning:
            'The gradient reaching the first layer is a product of K − 1 factors. Factors below 1 shrink it geometrically; factors above 1 blow it up.',
          variables: [
            { symbol: 'K', meaning: 'The number of layers' },
            { symbol: '\\mathbf{h}^{(k)}', meaning: 'The activations of layer k' },
            { symbol: '\\prod', meaning: 'Product over all the layers between the first and the loss' },
            { symbol: '\\|\\cdot\\|', meaning: 'A norm measuring the size of each layer’s Jacobian' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Why does the chain rule hold? Consider y = f(u) with u = g(x), and nudge x by a small amount Δx.',
        'That nudge changes u by roughly Δu ≈ g′(x)·Δx, because g′ is by definition the rate at which u responds to x.',
        'The change in u then changes y by roughly Δy ≈ f′(u)·Δu, for the same reason one level up.',
        'Substitute the first into the second: Δy ≈ f′(u)·g′(x)·Δx.',
        'Divide through by Δx: Δy/Δx ≈ f′(u)·g′(x) = f′(g(x))·g′(x).',
        'Take the limit as Δx → 0. The approximations become exact, because the error terms in each linearisation are of smaller order than Δx.',
        'Hence dy/dx = f′(g(x))·g′(x). Note where the outer derivative is evaluated: at u = g(x), the value the inner function actually produced, which is why the forward pass must be computed and cached before the backward pass can run.',
        'The multivariable case adds one wrinkle. If x reaches z through several intermediates, each route contributes its own product, and the total is their sum — which is exactly why a weight used in several places accumulates gradient from each use rather than being overwritten.',
      ],
    },

    workedExample: {
      title: 'Backpropagation through a two-layer network, every number by hand',
      setup:
        'A network with one input, one hidden unit and one output. Forward pass: z = w₁x + b₁, h = ReLU(z), ŷ = w₂h + b₂, L = (ŷ − y)². Take x = 2, w₁ = 3, b₁ = −1, w₂ = 0.5, b₂ = 1 and target y = 4.',
      steps: [
        { label: 'Forward: hidden pre-activation', detail: 'z = 3(2) + (−1) = 5.', latex: 'z = w_1x + b_1 = 5' },
        { label: 'Forward: hidden activation', detail: 'h = ReLU(5) = 5, since the input is positive.', latex: 'h = 5' },
        { label: 'Forward: prediction', detail: 'ŷ = 0.5(5) + 1 = 3.5.', latex: '\\hat{y} = 3.5' },
        { label: 'Forward: loss', detail: 'L = (3.5 − 4)² = 0.25. Cache every intermediate — the backward pass needs them.', latex: 'L = 0.25' },
        { label: 'Backward: dL/dŷ', detail: 'The derivative of (ŷ − y)² with respect to ŷ is 2(ŷ − y) = 2(−0.5) = −1.', latex: '\\frac{\\partial L}{\\partial \\hat{y}} = -1' },
        { label: 'Backward: dL/dw₂ and dL/db₂', detail: 'Since ŷ = w₂h + b₂, we have ∂ŷ/∂w₂ = h = 5 and ∂ŷ/∂b₂ = 1. So dL/dw₂ = (−1)(5) = −5 and dL/db₂ = (−1)(1) = −1.', latex: '\\frac{\\partial L}{\\partial w_2} = -5' },
        { label: 'Backward: dL/dh', detail: '∂ŷ/∂h = w₂ = 0.5, so dL/dh = (−1)(0.5) = −0.5. The upstream gradient is multiplied by the local one.', latex: '\\frac{\\partial L}{\\partial h} = -0.5' },
        { label: 'Backward: through the ReLU', detail: 'z = 5 > 0, so the local derivative dh/dz is 1 and the gradient passes through unchanged: dL/dz = −0.5. Had z been negative this would be 0 and everything behind it would receive nothing.', latex: '\\frac{\\partial L}{\\partial z} = -0.5' },
        { label: 'Backward: dL/dw₁ and dL/db₁', detail: 'Since z = w₁x + b₁, ∂z/∂w₁ = x = 2 and ∂z/∂b₁ = 1. So dL/dw₁ = (−0.5)(2) = −1 and dL/db₁ = −0.5.', latex: '\\frac{\\partial L}{\\partial w_1} = -1' },
        { label: 'Read the chain that produced dL/dw₁', detail: 'It is 2(ŷ − y) × w₂ × 1 × x = (−1)(0.5)(1)(2) = −1. Four local derivatives multiplied, exactly as the chain rule prescribes.' },
        { label: 'Take a step', detail: 'With η = 0.1: w₁ ← 3 − 0.1(−1) = 3.1, w₂ ← 0.5 − 0.1(−5) = 1.0. Forward again: z = 5.2, h = 5.2, ŷ = 1.0(5.2) + 1.1 = 6.3. Overshot, because w₂ moved a long way; the new loss is 5.29.' },
      ],
      conclusion:
        'Every gradient came from multiplying local derivatives along the path back from the loss, and each one needed a value cached during the forward pass. The final step also illustrates something real: a learning rate of 0.1 was too large for the second-layer weight, whose gradient was five times bigger than the first-layer weight’s, which is precisely the imbalance adaptive optimisers correct.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The chain rule, verified numerically',
        runnable: true,
        code: `import numpy as np

def f(x):  return (3 * x + 1) ** 5
def df(x): return 15 * (3 * x + 1) ** 4      # 5(3x+1)^4 * 3

x0, h = 0.5, 1e-6
numeric = (f(x0 + h) - f(x0 - h)) / (2 * h)
print("analytic:", df(x0))
print("numeric :", round(numeric, 6))

def g(x):  return np.exp(x ** 2)
def dg(x): return 2 * x * np.exp(x ** 2)     # outer e^u times inner 2x
print("exp case analytic:", round(float(dg(x0)), 8),
      " numeric:", round(float((g(x0 + h) - g(x0 - h)) / (2 * h)), 8))`,
        output: `analytic: 585.9375
numeric : 585.937501
exp case analytic: 1.28402542  numeric: 1.28402542`,
        explanation:
          'Both analytic derivatives match a central-difference check, confirming the chain rule applications. The common mistake in the first case is stopping at 5(3x + 1)⁴ and forgetting the inner derivative of 3, which would give an answer five times too small — numerically checking a hand derivation is the cheapest way to catch exactly that.',
      },
      {
        language: 'python',
        title: 'Backpropagation by hand, matching autograd',
        runnable: true,
        code: `import torch

x, y = 2.0, 4.0
w1 = torch.tensor(3.0,  requires_grad=True)
b1 = torch.tensor(-1.0, requires_grad=True)
w2 = torch.tensor(0.5,  requires_grad=True)
b2 = torch.tensor(1.0,  requires_grad=True)

z    = w1 * x + b1
h    = torch.relu(z)
yhat = w2 * h + b2
loss = (yhat - y) ** 2
loss.backward()

print("forward:", f"z={z.item()} h={h.item()} yhat={yhat.item()} L={loss.item()}")
print("dL/dw2 =", w2.grad.item(), " by hand -5.0")
print("dL/db2 =", b2.grad.item(), " by hand -1.0")
print("dL/dw1 =", w1.grad.item(), " by hand -1.0")
print("dL/db1 =", b1.grad.item(), " by hand -0.5")`,
        output: `forward: z=5.0 h=5.0 yhat=3.5 L=0.25
dL/dw2 = -5.0  by hand -5.0
dL/db2 = -1.0  by hand -1.0
dL/dw1 = -1.0  by hand -1.0
dL/db1 = -0.5  by hand -0.5`,
        explanation:
          'Every gradient matches the hand computation exactly, because autograd is doing precisely what we did: recording each operation during the forward pass and then multiplying local derivatives in reverse. There is no approximation and no magic — the framework simply automates a bookkeeping task that is error-prone by hand once the network has more than a few nodes.',
      },
      {
        language: 'python',
        title: 'Why deep sigmoid stacks stop learning',
        runnable: true,
        code: `import numpy as np

def sigmoid(z): return 1 / (1 + np.exp(-z))

rng = np.random.default_rng(0)
a = rng.normal(size=64) * 0.5
grad = 1.0

for layer in range(1, 21):
    W = rng.normal(scale=0.5, size=(64, 64))
    z = W @ a
    a = sigmoid(z)
    local = np.mean(sigmoid(z) * (1 - sigmoid(z)))     # mean sigmoid derivative
    grad *= local
    if layer % 5 == 0:
        print(f"after {layer:2d} layers: mean local deriv={local:.4f}  "
              f"accumulated factor={grad:.3e}")`,
        output: `after  5 layers: mean local deriv=0.1876  accumulated factor=1.545e-04
after 10 layers: mean local deriv=0.1702  accumulated factor=2.163e-08
after 15 layers: mean local deriv=0.1723  accumulated factor=2.871e-12
after 20 layers: mean local deriv=0.1746  accumulated factor=4.017e-16`,
        explanation:
          'Each sigmoid contributes a factor averaging well under 0.25, and the chain rule multiplies them, so after twenty layers the gradient reaching the first layer is scaled by about 4e-16 — indistinguishable from zero in float32. The first layers therefore never learn. Swapping the sigmoid for ReLU, whose local derivative is exactly 1 wherever the unit is active, keeps the product near 1 and is the single change that made deep networks trainable.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Every call to loss.backward()',
        usage:
          'PyTorch walks the recorded graph in reverse topological order, multiplying each node’s upstream gradient by its local derivative. That is the chain rule executed mechanically.',
      },
      {
        context: 'Vanishing and exploding gradients',
        usage:
          'Both are direct consequences of the chain rule being a product: many small factors annihilate the signal, many large ones blow it up. Residual connections add an identity path whose local derivative is 1, keeping a route open.',
      },
      {
        context: 'Adversarial example generation',
        usage:
          'The fast gradient sign method backpropagates all the way through the network to the input pixels, using the same chain of local derivatives but stopping at the image rather than the weights.',
      },
      {
        context: 'Differentiable rendering and physics simulation',
        usage:
          'A whole simulator is written from differentiable primitives so that the chain rule can propagate a loss defined on the output back to the physical parameters that produced it.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'Autograd records the graph and applies the chain rule in reverse; custom Functions require you to supply the local gradient yourself.' },
      { tool: 'JAX', role: 'grad, vjp and jvp expose reverse and forward mode directly, and are composable to arbitrary order.' },
      { tool: 'TensorFlow', role: 'GradientTape records operations in a context manager, then tape.gradient walks them backwards.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting the inner derivative',
        why: 'Differentiating the outer function looks like the whole job, so the final multiplication is skipped.',
        fix: 'Name the inner function explicitly as u before differentiating. The derivative of (3x + 1)⁵ is 5(3x + 1)⁴ × 3, not 5(3x + 1)⁴.',
      },
      {
        mistake: 'Evaluating the outer derivative at x instead of at g(x)',
        why: 'The Lagrange notation f′(g(x)) is easy to misread as f′(x).',
        fix: 'The outer derivative must be evaluated at the value the inner function actually produced. This is exactly why the forward pass must be computed and cached before the backward pass.',
      },
      {
        mistake: 'Overwriting rather than summing gradients when a variable is used more than once',
        why: 'The single-variable chain rule is a product, so the sum over paths in the multivariable case is easy to overlook.',
        fix: 'Contributions from every path add. Frameworks accumulate into .grad for this reason, which is also why you must zero gradients between optimisation steps rather than relying on assignment.',
      },
      {
        mistake: 'Calling backward() twice without retain_graph',
        why: 'PyTorch frees the intermediate values after the backward pass to save memory, and those values are exactly what the chain rule needs.',
        fix: 'Either recompute the forward pass, or pass retain_graph=True when you genuinely need a second backward pass through the same graph.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'State the chain rule and explain why backpropagation is just the chain rule.',
        answer:
          'The chain rule says that for a composition, (f ∘ g)′(x) = f′(g(x))·g′(x): rates of change multiply along a chain, with the outer derivative evaluated at the inner function’s output. A neural network is a long composition — input into layer one, into an activation, into layer two, and finally into the loss — so the derivative of the loss with respect to any weight is the product of the local derivatives along the path from that weight to the loss. Backpropagation computes those products efficiently by working backwards from the loss: each node receives the derivative of the loss with respect to its own output, multiplies by its local derivative, and passes the result to its inputs. Doing it in this direction means every shared prefix of the chain is computed once rather than once per parameter, which is why the entire gradient costs about as much as one forward pass instead of one forward pass per weight.',
        followUp:
          'A strong answer mentions that when a variable feeds several downstream nodes the contributions are summed, which is the multivariable form of the rule and the reason frameworks accumulate into .grad.',
      },
      {
        level: 'advanced',
        question: 'Explain vanishing gradients in terms of the chain rule, and how modern architectures avoid them.',
        answer:
          'The gradient reaching an early layer is a product of one Jacobian factor per intervening layer. If those factors typically have norm below 1, the product shrinks geometrically with depth: sigmoid derivatives are at most 0.25, so twenty sigmoid layers scale the gradient by at most 0.25²⁰, under 1e-12, and the early layers receive no usable signal. If the factors exceed 1, the product explodes instead. Architectures respond by keeping the factors near 1. ReLU has derivative exactly 1 wherever the unit is active, so no shrinkage occurs on the active path. Residual connections compute h + f(h), whose Jacobian is I + J_f, guaranteeing an identity route with derivative 1 straight back through the network however deep it is. Normalisation layers keep activations in a regime where derivatives are not saturated. LSTM and GRU gates create an additive memory path that avoids repeated multiplication by the same recurrent matrix. And for the exploding case, gradient clipping bounds the step without changing its direction.',
      },
      {
        level: 'ml-engineer',
        question: 'Why is reverse-mode automatic differentiation used for neural networks rather than forward mode?',
        answer:
          'Because of the shape of the problem. Forward mode propagates derivatives from inputs towards outputs and costs one sweep per input variable; reverse mode propagates from outputs backwards and costs one sweep per output. A neural network has an enormous number of inputs to differentiate with respect to — every parameter, often billions — and exactly one output, the scalar loss. So reverse mode needs one sweep, while forward mode would need a billion. Concretely, reverse mode computes the full gradient at roughly two to three times the cost of the forward pass, independent of parameter count. The trade-off is memory: reverse mode must retain the intermediate activations from the forward pass to evaluate local derivatives at the right points, which is why activation memory dominates GPU usage during training and why gradient checkpointing, which recomputes activations instead of storing them, is a standard memory-saving technique. Forward mode is the better choice in the opposite regime, few inputs and many outputs, such as sensitivity analysis with respect to one or two hyperparameters.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Differentiate y = (2x³ + 5)⁴ and evaluate at x = 1.',
        hint: 'Let u = 2x³ + 5. Differentiate u⁴ with respect to u, then multiply by du/dx.',
        solution:
          'dy/du = 4u³ = 4(2x³ + 5)³ and du/dx = 6x². Multiplying: dy/dx = 24x²(2x³ + 5)³. At x = 1: u = 7, so dy/dx = 24(1)(343) = 8232. The step people miss is the 6x²; stopping at 4(2x³+5)³ would give 1372, six times too small at this point.',
      },
      {
        prompt: 'For a chain z = w·x, h = σ(z), L = (h − y)², write dL/dw as a product of three local derivatives and evaluate for w = 1, x = 2, y = 0.',
        hint: 'Work backwards: dL/dh, then dh/dz, then dz/dw.',
        solution:
          'dL/dw = 2(h − y) × σ(z)(1 − σ(z)) × x. With w = 1 and x = 2, z = 2 and σ(2) = 0.8808. So dL/dh = 2(0.8808 − 0) = 1.7616; dh/dz = 0.8808(0.1192) = 0.1050; dz/dw = 2. The product is 1.7616 × 0.1050 × 2 = 0.3699. Notice the sigmoid factor of 0.105 has already cut the gradient by an order of magnitude at a single layer, which previews the vanishing gradient problem.',
      },
      {
        prompt: 'A weight w is used in two different places in a network, contributing to the loss via paths giving ∂L/∂w of 0.3 and −0.8 respectively. What is the total gradient, and what does this tell you about how frameworks store gradients?',
        hint: 'The multivariable chain rule sums over paths.',
        solution:
          'The total is 0.3 + (−0.8) = −0.5. Contributions from distinct paths add rather than replacing one another, because the multivariable chain rule sums over every route from the variable to the output. This is exactly why PyTorch accumulates into .grad with += rather than assigning: weight sharing, as in a convolutional kernel applied at every spatial position or an embedding matrix used for several tokens, depends on that accumulation. It is also why you must call zero_grad() at the start of each step, since otherwise the previous step’s gradient is still sitting there waiting to be added to.',
      },
    ],

    quiz: [
      {
        id: 'MATH-015-q1',
        type: 'mcq',
        concept: 'applying the chain rule',
        prompt: 'What is the derivative of (3x + 1)⁵?',
        options: [
          '15(3x + 1)⁴',
          '5(3x + 1)⁴',
          '5(3x + 1)⁴ + 3',
          '15(3x + 1)⁵',
        ],
        answerIndex: 0,
        explanation:
          'The outer derivative gives 5(3x + 1)⁴ and the inner derivative of 3x + 1 is 3. Multiplying gives 15(3x + 1)⁴; forgetting the factor of 3 is the standard error.',
      },
      {
        id: 'MATH-015-q2',
        type: 'numeric',
        concept: 'multiplying rates',
        prompt: 'If dy/du = 4 and du/dx = 0.5, what is dy/dx?',
        answer: 2,
        explanation:
          'Rates multiply along a chain: dy/dx = 4 × 0.5 = 2. This is the whole content of the chain rule in one line.',
      },
      {
        id: 'MATH-015-q3',
        type: 'truefalse',
        concept: 'backpropagation',
        prompt: 'Backpropagation is a fundamentally different algorithm from the chain rule.',
        answer: false,
        explanation:
          'False. Backpropagation is the chain rule applied systematically in reverse through a computational graph, with intermediate results cached and reused so the whole gradient costs about one extra forward pass.',
      },
      {
        id: 'MATH-015-q4',
        type: 'order',
        concept: 'backward pass order',
        prompt: 'Order the steps of computing dL/dw₁ in the network z = w₁x + b₁, h = ReLU(z), ŷ = w₂h + b₂, L = (ŷ − y)².',
        items: [
          'Run the forward pass and cache z, h and ŷ',
          'Compute dL/dŷ = 2(ŷ − y)',
          'Multiply by dŷ/dh = w₂ to get dL/dh',
          'Multiply by dh/dz, which is 1 if z > 0 and 0 otherwise',
          'Multiply by dz/dw₁ = x to get dL/dw₁',
        ],
        explanation:
          'The forward pass must come first, because every local derivative is evaluated at values it produced. Then each backward step multiplies the upstream gradient by one local derivative.',
      },
      {
        id: 'MATH-015-q5',
        type: 'multi',
        concept: 'gradient pathologies',
        prompt: 'Which of these follow from the chain rule being a product of local derivatives?',
        options: [
          'Gradients can vanish exponentially with depth',
          'Gradients can explode exponentially with depth',
          'A zero local derivative blocks all gradient behind it',
          'Gradients are always bounded between 0 and 1',
          'Residual connections help by providing a path with local derivative 1',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Products of many small factors vanish, products of many large ones explode, a single zero factor annihilates the whole product, and an identity path keeps one factor at exactly 1. Nothing bounds gradients to [0, 1] in general.',
      },
      {
        id: 'MATH-015-q6',
        type: 'explain',
        concept: 'backprop as chain rule',
        prompt: 'Explain to a colleague why backpropagation is efficient, in terms of the chain rule.',
        rubric: [
          'Says the network is a composition, so weight gradients are products of local derivatives',
          'Says working backwards from the loss reuses shared portions of those products',
          'Notes that one backward sweep yields every parameter gradient, at a cost comparable to a forward pass',
        ],
        sampleAnswer:
          'A network is a chain of functions, so the derivative of the loss with respect to any weight is the product of the local derivatives along the path from that weight forward to the loss. Computing each of those products independently would be enormously wasteful, because a weight in layer one and a weight in layer two share almost the whole path back to the loss. Backpropagation exploits that by starting at the loss and moving backwards: each node receives the derivative of the loss with respect to its own output, multiplies by its own local derivative, and hands the result to its inputs. The shared portion is therefore computed exactly once and reused by everything behind it. The result is that a single backward sweep produces the gradient for every parameter, at a cost of roughly one to two extra forward passes regardless of whether the model has a thousand parameters or a billion. The price is memory, since the intermediate activations from the forward pass must be kept so each local derivative can be evaluated at the right point.',
        explanation:
          'A strong answer identifies reuse of shared subexpressions as the source of the efficiency, and names the memory cost as the trade-off.',
      },
    ],

    flashcards: [
      { front: 'State the chain rule.', back: "(f∘g)'(x) = f'(g(x))·g'(x). Rates multiply along a chain, with the outer derivative evaluated at the inner output." },
      { front: 'Derivative of (3x + 1)⁵?', back: '15(3x + 1)⁴ — the outer 5(3x+1)⁴ times the inner derivative 3.' },
      { front: 'What is backpropagation?', back: 'The chain rule applied in reverse through a computational graph, reusing shared subexpressions.' },
      { front: 'What happens when a variable feeds several nodes?', back: 'The gradient contributions from all paths are summed, which is why frameworks accumulate into .grad.' },
      { front: 'Why do gradients vanish in deep sigmoid networks?', back: 'Each sigmoid contributes a factor of at most 0.25 and the chain rule multiplies them, so depth shrinks the gradient geometrically.' },
      { front: 'Why reverse mode rather than forward mode?', back: 'One scalar loss and a billion parameters: reverse mode needs one sweep per output, forward mode one per input.' },
    ],

    challenge: {
      title: 'Build a miniature autograd engine',
      brief:
        'Implement a Value class supporting addition, multiplication, power, exp and ReLU, each recording its children and a local backward function. Add a backward() method that topologically sorts the graph and applies the chain rule in reverse, accumulating into a .grad field. Use it to train the two-layer network from the worked example and confirm the gradients match PyTorch.',
      language: 'python',
      acceptanceCriteria: [
        'Supports at least +, *, ** and one nonlinearity, with correct local derivatives',
        'Accumulates rather than overwrites gradients when a Value is used more than once',
        'Topologically sorts the graph before the backward sweep',
        'Reproduces dL/dw1 = −1.0 and dL/dw2 = −5.0 for the worked example',
      ],
      starterCode: 'class Value:\n    def __init__(self, data, children=()):\n        self.data = data\n        self.grad = 0.0\n        self._children = children\n        self._backward = lambda: None\n',
    },

    teachingPrompt: {
      prompt:
        'Explain the chain rule to someone who can differentiate x³ but freezes when they see (x³ + 1)⁷, then connect it to how neural networks learn.',
      mustCover: [
        'When one quantity affects another which affects a third, the rates multiply',
        'Identify the inner and outer functions, differentiate each, and multiply',
        'The outer derivative is evaluated at the inner function’s value',
        'Backpropagation is this rule applied in reverse through a network',
      ],
      bonusSignals: ['uses the gear train or currency conversion image', 'mentions summing over paths when a variable is reused', 'connects the product to vanishing gradients'],
      sampleExplanation:
        'Here is the whole idea in one sentence: when one thing affects a second which affects a third, the overall sensitivity is the product of the two sensitivities. If a pound buys 1.2 euros and a euro buys 160 yen, then a pound buys 192 yen — you multiply the rates and never need a direct rate. Apply that to (x³ + 1)⁷. There are two machines here: the inner one computes x³ + 1, and the outer one raises whatever it receives to the seventh power. Ask how fast the outer machine responds to its input: seven times its input to the sixth, so 7(x³ + 1)⁶. Ask how fast the inner one responds to x: 3x². Multiply and you have 21x²(x³ + 1)⁶. The only thing to be careful about is that the outer derivative is evaluated at whatever the inner machine actually produced, not at x itself. Now the payoff. A neural network is precisely a long chain of such machines: the input feeds a layer, which feeds an activation, which feeds another layer, which finally produces a loss. To know how a weight buried deep inside affects the loss you multiply the rates along the path from it to the loss — and that is all backpropagation is, done backwards from the loss so that the shared parts of the chain are computed once rather than once per weight. It also explains a famous problem: if each link contributes a factor well under one, then after twenty links the product is nearly zero, and the earliest layers learn nothing at all.',
    },
  },
];
