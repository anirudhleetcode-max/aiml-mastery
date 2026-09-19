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
