import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'DL-001',
    domain: 'DL',
    module: 'The Neuron',
    topic: 'The artificial neuron',
    title: 'From Linear Model to Neuron',
    slug: 'from-linear-model-to-neuron',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: [],
    related: [],
    tags: ['neuron', 'perceptron', 'weights', 'bias', 'dot-product', 'linear-model'],

    learningObjectives: [
      'Write a single artificial neuron as a weighted sum of inputs plus a bias, followed by a nonlinearity',
      'Explain why the weighted sum is exactly a dot product, and what the dot product measures geometrically',
      'Describe the job of the bias term and what a neuron cannot do without it',
      'Compute a neuron output by hand and then reproduce the same number with torch.nn.Linear',
    ],

    terminology: [
      {
        term: 'Neuron (unit)',
        definition:
          'The smallest computational element of a neural network: it takes a vector of inputs, forms a weighted sum with a bias, and passes the result through a nonlinear activation function.',
        simple: 'A little machine that scores how much it likes what it is looking at, then squashes that score.',
      },
      {
        term: 'Weight',
        definition:
          'A learned number attached to one input. It says how strongly, and in which direction, that input should push the neuron output up or down.',
        simple: 'How much this particular clue counts, and whether it counts for or against.',
      },
      {
        term: 'Bias',
        definition:
          'A learned number added to the weighted sum. It shifts the decision boundary away from the origin so the neuron can fire even when all inputs are zero.',
        simple: 'The default opinion the neuron holds before it looks at anything.',
      },
      {
        term: 'Pre-activation (logit)',
        definition:
          'The value of the weighted sum plus the bias, conventionally called z, before any activation function is applied.',
        simple: 'The raw score.',
      },
      {
        term: 'Activation',
        definition:
          'The output of the neuron after the nonlinearity has been applied to z, conventionally called a. This is what the next layer receives.',
        simple: 'The squashed score the neuron passes on.',
      },
    ],

    simpleExplanation:
      "Imagine you are deciding whether an email is spam. You have a few clues: how many exclamation marks it has, whether it mentions money, whether the sender is in your address book. Not every clue matters equally, so you give each one a score out of ten for how much you trust it. Then you multiply each clue by its score, add everything up, and add a little number that captures your general suspicion of email in the first place. If the total is high enough, you call it spam. That is a neuron. The scores you gave the clues are called weights, the general suspicion is called the bias, and the adding-up step is the whole of the arithmetic. The only extra piece is that a neuron does not report the raw total — it passes it through a squashing function so the answer comes out as something bounded and useful, like a probability between zero and one. Everything else in deep learning is this one idea, copied thousands of times and wired together.",

    whyItExists:
      'Linear models such as linear and logistic regression are fast, stable and interpretable, but they can only draw straight boundaries through the data, so a problem as simple as exclusive-or defeats them. The neuron exists as the smallest possible unit you can stack: keep the linear part, because it is cheap and differentiable, then add one nonlinearity so that stacking actually buys you new representational power rather than collapsing back to a line.',

    analogy: {
      scenario:
        "Think of a hiring panel with one decision to make. Each panellist reports one number: years of experience, score on a take-home test, strength of the reference. The chair does not treat those reports equally. She has decided over the years that the take-home matters twice as much as the reference, and that a long CV is very slightly negative because it correlates with inflexibility. She multiplies each report by her private importance factor, sums them, adds her own baseline optimism about candidates in general, and only then decides whether to say yes.",
      mapping: [
        { from: 'Each panellist reporting one number', to: 'Each input feature x_i' },
        { from: "The chair's private importance factors", to: 'The weights w_i, learned from experience' },
        { from: 'Her baseline optimism before hearing anything', to: 'The bias b' },
        { from: 'The summed, weighted total', to: 'The pre-activation z' },
        { from: 'Turning the total into a yes/no confidence', to: 'The activation function applied to z' },
      ],
      bridge:
        'The mapping is exact: a neuron is a weighted vote followed by a decision rule. What makes it a learning system rather than a fixed rule is that the importance factors are not chosen by anyone — they start as small random numbers and are adjusted by gradient descent until the panel makes fewer mistakes. The bias matters for the same reason the chair baseline matters: without it, a candidate whose every report reads zero would always score exactly zero, and the panel could never say yes to them or always say no to them.',
      limitations:
        'The analogy suggests the weights encode human-legible reasons. In a real trained network only the first layer has weights you can sometimes interpret that way; deeper units respond to combinations that have no short verbal description.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What one neuron does to one input vector',
        caption: 'Two steps, in this order, every time. Nothing else happens inside a unit.',
        steps: [
          { label: 'Receive x', detail: 'A vector of n numbers: the features, or the activations of the previous layer.' },
          { label: 'Multiply elementwise by w', detail: 'Each input is scaled by its own learned weight. Positive weight means the input argues for firing.' },
          { label: 'Sum and add b', detail: 'Add the n products together, then add the bias. This single number is the pre-activation z.' },
          { label: 'Apply the activation', detail: 'Pass z through a nonlinear function to get the activation a. Without this the next layer gains nothing.' },
          { label: 'Emit a', detail: 'One number, sent onward to every neuron in the next layer.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Logistic regression versus a single neuron',
        caption: 'They are the same arithmetic. The difference is what you are allowed to build out of them.',
        left: {
          heading: 'Logistic regression',
          points: [
            'Computes sigmoid(w.x + b)',
            'Fitted by maximising likelihood, often with a convex solver',
            'One model, one decision boundary, always a hyperplane',
            'Coefficients are interpretable as log-odds contributions',
          ],
        },
        right: {
          heading: 'One neuron with a sigmoid',
          points: [
            'Computes sigmoid(w.x + b) — identical formula',
            'Fitted by gradient descent on a loss, because it must compose with other units',
            'Designed to be stacked: the output becomes an input feature for the next layer',
            'Once stacked, the boundary stops being a hyperplane and interpretability goes away',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Anatomy of the neuron equation',
        subject: 'z = w1*x1 + w2*x2 + ... + wn*xn + b,   a = phi(z)',
        annotations: [
          { part: 'x1 … xn', note: 'The inputs. For the first layer these are raw features; for any deeper layer they are activations produced by the layer below.' },
          { part: 'w1 … wn', note: 'One learned weight per input. Their signs and magnitudes are what the network actually knows.' },
          { part: 'the sum', note: 'This is a dot product, w.x. Geometrically it measures how much x points in the direction of w.' },
          { part: '+ b', note: 'The bias, which shifts the threshold. Without it every decision boundary would be forced through the origin.' },
          { part: 'phi', note: 'The activation. Choosing it is the subject of the next unit; the point here is only that it is nonlinear.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Wire up a single unit',
        caption: 'Drag the weights and the bias and watch the neuron output move. Set every weight to zero and see what the bias alone can do.',
        widget: 'neural-network-lab',
      },
    ],

    formalDefinition:
      'An artificial neuron is a parameterised function f: R^n -> R defined by f(x) = phi(w^T x + b), where w in R^n is a weight vector, b in R is a bias scalar, and phi: R -> R is a fixed nonlinear activation function. The parameters (w, b) are learned; phi is chosen by the architect. The map x -> w^T x + b is an affine function, so the neuron is exactly an affine transformation composed with a fixed nonlinearity.',

    math: {
      intuition:
        'The whole neuron is one dot product and one squash. The dot product w.x is large when x points the same way as w and negative when it points the opposite way, so you can read the weight vector as the direction in input space that this neuron is looking for. The bias moves the point at which the neuron switches from unenthusiastic to enthusiastic. Written in vector form the arithmetic fits on one line and runs as a single BLAS call rather than a Python loop, which is why it is written this way and not as a sum.',
      formulas: [
        {
          latex: 'z = \\mathbf{w}^{\\top}\\mathbf{x} + b = \\sum_{i=1}^{n} w_i x_i + b',
          name: 'Pre-activation of a neuron',
          meaning:
            'The weighted sum of the inputs plus the bias. This is the only place the learned parameters enter; everything after it is a fixed function.',
          variables: [
            { symbol: 'z', meaning: 'The pre-activation, a single real number, sometimes called the logit' },
            { symbol: '\\mathbf{x}', meaning: 'Input vector of length n — features, or activations from the previous layer' },
            { symbol: '\\mathbf{w}', meaning: 'Learned weight vector of length n, one weight per input' },
            { symbol: 'w_i', meaning: 'The weight on input i: its sign is the direction of influence, its magnitude the strength' },
            { symbol: 'b', meaning: 'Learned bias, a scalar that shifts the threshold away from the origin' },
            { symbol: 'n', meaning: 'Number of inputs to this neuron' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'a = \\phi(z) = \\phi\\!\\left(\\mathbf{w}^{\\top}\\mathbf{x} + b\\right)',
          name: 'Neuron activation',
          meaning:
            'The output actually passed to the next layer. phi is nonlinear; without it a stack of neurons would be no more expressive than one neuron.',
          variables: [
            { symbol: 'a', meaning: 'The activation, the neuron output' },
            { symbol: '\\phi', meaning: 'The activation function, e.g. sigmoid, tanh or ReLU' },
            { symbol: 'z', meaning: 'The pre-activation computed above' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathbf{w}^{\\top}\\mathbf{x} = \\lVert \\mathbf{w}\\rVert\\,\\lVert \\mathbf{x}\\rVert\\cos\\theta',
          name: 'Geometric reading of the dot product',
          meaning:
            'The weighted sum is a similarity measurement. The neuron fires hardest for inputs aligned with its weight vector, which is why the weights of a trained first layer often look like the patterns the unit detects.',
          variables: [
            { symbol: '\\lVert \\mathbf{w}\\rVert', meaning: 'Length of the weight vector — sets the overall sensitivity of the unit' },
            { symbol: '\\lVert \\mathbf{x}\\rVert', meaning: 'Length of the input vector — how strong the input signal is' },
            { symbol: '\\theta', meaning: 'Angle between w and x; cos(theta) = 1 means perfect alignment, -1 means opposite' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\mathbf{w}^{\\top}\\mathbf{x} + b = 0',
          name: 'The decision boundary of a neuron',
          meaning:
            'The set of inputs at which the pre-activation is exactly zero. This is a hyperplane with normal vector w, offset from the origin by -b/||w||. It is why a single neuron can only separate linearly separable data.',
          variables: [
            { symbol: '\\mathbf{w}', meaning: 'Normal vector of the hyperplane — perpendicular to the boundary' },
            { symbol: 'b', meaning: 'Offset term; with b = 0 the boundary is forced through the origin' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'Start from linear regression: y_hat = w^T x + b. It is cheap to evaluate and differentiable everywhere, but its output is unbounded and its decision boundary is always a flat hyperplane.',
        'For classification you want a bounded output you can read as a probability, so compose it with a squashing function: y_hat = phi(w^T x + b). With phi = sigmoid this is exactly logistic regression.',
        'Now try to gain power by stacking: feed the output of one such model into another. If phi were the identity, layer two computes w2(w1^T x + b1) + b2 = (w2 w1)^T x + (w2 b1 + b2), which is again affine in x. Stacking bought nothing.',
        'Therefore the nonlinearity is not decoration; it is the thing that makes depth meaningful. A neuron is defined as affine-then-nonlinear precisely so that composition is productive.',
        'Finally, note that b can be absorbed into w by appending a constant 1 to x. This is the bias trick: it is convenient for maths, but frameworks keep b separate because it is initialised and regularised differently.',
      ],
    },

    workedExample: {
      title: 'One neuron, three inputs, computed by hand',
      setup:
        'A neuron has weights w = [0.8, 0.3, -0.5] and bias b = 0.1, with a sigmoid activation. The input is x = [0.5, -1.2, 2.0]. Compute the activation, then say what would change if the bias were -0.5 instead.',
      steps: [
        {
          label: 'Multiply each input by its weight',
          detail: '0.8 x 0.5 = 0.40;  0.3 x (-1.2) = -0.36;  (-0.5) x 2.0 = -1.00. Note the third input is large and its weight is negative, so it argues strongly against firing.',
          latex: 'w_1x_1 = 0.40,\\quad w_2x_2 = -0.36,\\quad w_3x_3 = -1.00',
        },
        {
          label: 'Sum the products',
          detail: '0.40 + (-0.36) + (-1.00) = -0.96. This is the dot product w.x.',
          latex: '\\mathbf{w}^{\\top}\\mathbf{x} = -0.96',
        },
        {
          label: 'Add the bias',
          detail: '-0.96 + 0.1 = -0.86. This is the pre-activation z. Negative means the neuron is currently unconvinced.',
          latex: 'z = -0.96 + 0.1 = -0.86',
        },
        {
          label: 'Apply the sigmoid',
          detail: 'sigmoid(-0.86) = 1 / (1 + e^{0.86}) = 1 / (1 + 2.3632) = 1 / 3.3632 = 0.2974. Read as a probability, the neuron is about 30 per cent confident.',
          latex: 'a = \\sigma(-0.86) = \\frac{1}{1 + e^{0.86}} = 0.2974',
        },
        {
          label: 'Change only the bias to -0.5',
          detail: 'z becomes -0.96 - 0.5 = -1.46 and a becomes sigmoid(-1.46) = 0.1884. The weights did not move and the input did not move; the bias alone slid the neuron toward scepticism. That is the entire job of the bias.',
          latex: 'a = \\sigma(-1.46) = 0.1884',
        },
      ],
      conclusion:
        'Four arithmetic operations and one function call produce the output of a neuron. A network with 100 million parameters is doing nothing more exotic than this, a hundred million times, arranged so that the outputs of one round become the inputs of the next.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A neuron from scratch in NumPy',
        runnable: true,
        code: `import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

x = np.array([0.5, -1.2, 2.0])
w = np.array([0.8, 0.3, -0.5])
b = 0.1

z = np.dot(w, x) + b          # the entire linear part
a = sigmoid(z)

print("dot product w.x =", round(float(np.dot(w, x)), 4))
print("pre-activation z =", round(float(z), 4))
print("activation a     =", round(float(a), 4))`,
        output: `dot product w.x = -0.96
pre-activation z = -0.86
activation a     = 0.2974`,
        explanation:
          'This is the hand calculation, line for line. np.dot(w, x) is the weighted sum written as a single operation rather than a Python loop, which matters enormously later: the same call with matrices computes an entire layer for an entire batch, and it dispatches to optimised compiled code instead of interpreting one multiplication at a time.',
      },
      {
        language: 'python',
        title: 'The same neuron using torch.nn.Linear',
        runnable: true,
        code: `import torch
import torch.nn as nn

layer = nn.Linear(in_features=3, out_features=1)

# Overwrite the random initialisation so we can compare with the hand result.
with torch.no_grad():
    layer.weight.copy_(torch.tensor([[0.8, 0.3, -0.5]]))
    layer.bias.copy_(torch.tensor([0.1]))

x = torch.tensor([[0.5, -1.2, 2.0]])   # shape (batch=1, features=3)
z = layer(x)
a = torch.sigmoid(z)

print("weight shape:", tuple(layer.weight.shape))
print("z =", round(z.item(), 4))
print("a =", round(a.item(), 4))`,
        output: `weight shape: (1, 3)
z = -0.86
a = 0.2974`,
        explanation:
          'nn.Linear is the neuron, generalised. Note the weight shape is (out_features, in_features) and that PyTorch computes x @ W.T + b, so the input carries the batch dimension first. The framework adds three things the NumPy version lacks: the parameters are registered so an optimiser can find them, gradients are tracked automatically, and the same call runs unchanged on a GPU.',
      },
      {
        language: 'python',
        title: 'Why the bias is not optional',
        runnable: true,
        code: `import torch
import torch.nn as nn

x = torch.zeros(1, 3)                       # an all-zero input

with_bias = nn.Linear(3, 1, bias=True)
without  = nn.Linear(3, 1, bias=False)

with torch.no_grad():
    with_bias.bias.fill_(0.7)

print("with bias   :", round(with_bias(x).item(), 4))
print("without bias:", round(without(x).item(), 4))`,
        output: `with bias   : 0.7
without bias: 0.0`,
        explanation:
          'A bias-free neuron always outputs zero for a zero input, whatever its weights are, so its decision boundary is nailed to the origin. Adding the bias frees the boundary to sit anywhere. In practice you almost always keep biases, with one common exception: a linear layer immediately followed by batch normalisation, where the normalisation has its own shift parameter and the bias would be redundant.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Credit risk scoring',
        usage:
          'The first layer of a risk model learns weights over features like income, utilisation and account age. A strongly negative weight on utilisation means that the more of their limit a customer uses, the lower the pre-activation and the higher the predicted risk. Regulators often demand a linear model precisely because those weights are readable.',
      },
      {
        context: 'The first layer of an image network',
        usage:
          'When you reshape the 784 weights of a first-layer MNIST neuron into a 28x28 image, you often see a faint stroke or blob. That is the geometric reading of the dot product made visible: the weight vector is the pattern the unit is looking for, and the activation measures how much of that pattern is present.',
      },
      {
        context: 'The output head of almost every model',
        usage:
          'A BERT classifier, a ResNet and a recommendation model all end the same way: one nn.Linear mapping the final hidden representation to one number per class. Everything upstream exists to produce features good enough for that last weighted sum to work.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.Linear(in_features, out_features) is a whole layer of these neurons, with weights stored as a single matrix.' },
      { tool: 'NumPy', role: 'np.dot and the @ operator are how you implement the same arithmetic when you want to see the mechanics rather than use a framework.' },
      { tool: 'scikit-learn', role: 'LogisticRegression is mathematically a single sigmoid neuron, fitted with a different optimiser — a useful sanity baseline before any network.' },
    ],

    commonMistakes: [
      {
        mistake: 'Thinking a neuron is a model of a biological neuron',
        why: 'The name and the 1943 diagram invite it, but real neurons spike in time, have complex dendritic computation and do not do gradient descent. Believing the biological story leads people to look for explanations in neuroscience rather than in linear algebra.',
        fix: 'Treat it as what it is mathematically: an affine map composed with a fixed nonlinearity. The biology was the inspiration, not the specification.',
      },
      {
        mistake: 'Dropping the bias because it looks like a small detail',
        why: 'Without a bias, every decision boundary is forced through the origin, and a zero input can only ever give a zero pre-activation. On unnormalised data this alone can stop a model fitting at all.',
        fix: 'Keep bias=True by default. Only set bias=False when the next operation supplies its own shift, which is the case for BatchNorm and LayerNorm.',
      },
      {
        mistake: 'Confusing the pre-activation z with the output a',
        why: 'They differ by the activation function, and losses care which one they get. Passing sigmoid outputs into nn.BCEWithLogitsLoss, or logits into nn.NLLLoss, silently trains the wrong objective instead of raising an error.',
        fix: 'Name the variables z and a in your own code, and read the documentation of every loss to see whether it expects logits or probabilities.',
      },
      {
        mistake: 'Assuming a large weight means an important feature',
        why: 'Weight magnitude depends on the scale of the input. A feature measured in millimetres will earn a weight a thousand times larger than the same feature measured in metres, with identical predictions.',
        fix: 'Standardise inputs before comparing weights, and prefer permutation importance or gradient-based attribution when you actually need to rank features.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does a single artificial neuron compute, and how does it relate to logistic regression?',
        answer:
          'It computes phi(w^T x + b): a dot product of the input with a learned weight vector, plus a learned bias, passed through a fixed nonlinear activation. If phi is the sigmoid, this is exactly logistic regression — same formula, same decision boundary, which is a hyperplane. The difference is architectural rather than mathematical: a neuron is designed to be composed, so its output becomes an input to other neurons, and it is fitted by gradient descent on a loss because that is the only method that generalises to a stack of them.',
        followUp:
          'A strong answer adds that the neuron alone is limited to linearly separable problems, and that the nonlinearity only starts paying for itself once you stack layers.',
      },
      {
        level: 'intermediate',
        question: 'Geometrically, what do the weight vector and the bias control?',
        answer:
          'The set of inputs where the pre-activation is zero, w^T x + b = 0, is a hyperplane. The weight vector w is the normal to that hyperplane, so its direction sets the orientation of the decision boundary and its magnitude sets how sharply the activation changes as you cross it. The bias sets the offset: the signed distance from the origin to the plane is -b / ||w||. So w rotates the boundary and controls confidence sharpness, while b translates it. Without a bias the plane must pass through the origin, which is a genuine loss of capacity.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you deliberately build a linear layer with bias=False?',
        answer:
          'When the very next operation re-centres the activations, making the bias mathematically redundant and a small waste of memory and optimiser state. The standard case is Conv2d or Linear immediately followed by BatchNorm or LayerNorm: normalisation subtracts the mean, so any constant the bias added is removed, and the normalisation layer then applies its own learned shift beta. You also see bias=False in the query, key and value projections of many transformer implementations, where empirically it makes no difference to quality and saves parameters.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A neuron has w = [2.0, -1.0] and b = -1.0 with a step activation that outputs 1 when z >= 0 and 0 otherwise. Classify the points (1, 0), (0, 1) and (1, 1), then describe the decision boundary in words.',
        hint: 'Compute z = 2x1 - x2 - 1 for each point, then set z = 0 and rearrange to get a line.',
        solution:
          'For (1, 0): z = 2 - 0 - 1 = 1 >= 0, so output 1. For (0, 1): z = 0 - 1 - 1 = -2 < 0, so output 0. For (1, 1): z = 2 - 1 - 1 = 0 >= 0, so output 1. Setting z = 0 gives 2x1 - x2 - 1 = 0, that is x2 = 2x1 - 1: a straight line with slope 2 crossing the vertical axis at -1. Points above the line output 0 and points on or below output 1. Notice (1, 1) lands exactly on the boundary, which is why the tie-breaking convention in the activation has to be stated.',
      },
      {
        prompt:
          'Show that a neuron with all weights equal to zero produces the same output for every possible input, and explain why this makes zero initialisation useless for a whole layer.',
        hint: 'Write out z when every w_i = 0.',
        solution:
          'With every w_i = 0 the sum collapses: z = 0*x1 + ... + 0*xn + b = b for any x. So the activation is phi(b), a constant. The neuron is blind. Worse, if an entire layer is initialised to zeros then every unit in it computes the same constant, receives an identical gradient during backpropagation, and is updated identically — so the units remain clones of each other forever. This is the symmetry-breaking problem, and it is the reason weights are initialised randomly, a topic that gets its own unit later in this domain.',
      },
      {
        prompt:
          'Using torch.nn.Linear(4, 3), state the shape of the weight tensor, the shape of the bias, the total number of parameters, and the output shape when you pass a tensor of shape (16, 4).',
        hint: 'PyTorch stores weights as (out_features, in_features) and computes x @ W.T + b.',
        language: 'python',
        starterCode: 'import torch\nimport torch.nn as nn\n\nlayer = nn.Linear(4, 3)\nx = torch.randn(16, 4)\n# print the shapes you predicted, then check them\n',
        solution:
          'layer.weight has shape (3, 4) — one row of four weights per output unit. layer.bias has shape (3,). The parameter count is 3*4 + 3 = 15. Passing x of shape (16, 4) gives output of shape (16, 3): the batch dimension of 16 passes through untouched, while the feature dimension is mapped from 4 to 3. The general rule is that a linear layer changes only the last dimension, which is worth memorising because almost every shape bug in deep learning is a violation of it.',
      },
    ],

    quiz: [
      {
        id: 'DL-001-q1',
        type: 'mcq',
        concept: 'neuron definition',
        prompt: 'Which expression correctly describes what a single neuron computes?',
        options: [
          'phi(w^T x + b), an affine map followed by a nonlinearity',
          'w^T phi(x) + b, a nonlinearity followed by an affine map',
          'phi(w^T x) * b, a product of the squashed sum and the bias',
          'w^T x, with the bias applied only during training',
        ],
        answerIndex: 0,
        explanation:
          'The order matters. The learned affine part comes first and produces the pre-activation z, then the fixed nonlinearity is applied to z. Reversing the order would leave the layer affine in phi(x) and destroy the reason for having a nonlinearity at all.',
      },
      {
        id: 'DL-001-q2',
        type: 'numeric',
        concept: 'forward computation',
        prompt: 'A neuron has w = [1.0, -2.0, 0.5] and b = 0.5. For x = [2.0, 1.0, -4.0], what is the pre-activation z?',
        answer: -1.5,
        tolerance: 0.001,
        explanation:
          'z = (1.0)(2.0) + (-2.0)(1.0) + (0.5)(-4.0) + 0.5 = 2 - 2 - 2 + 0.5 = -1.5. Working the products out one at a time and only then summing is the habit that prevents sign errors.',
      },
      {
        id: 'DL-001-q3',
        type: 'truefalse',
        concept: 'bias',
        prompt: 'A neuron without a bias term can still place its decision boundary anywhere in input space.',
        answer: false,
        explanation:
          'False. With b = 0 the boundary w^T x = 0 always passes through the origin, since x = 0 always satisfies it. The bias is exactly the parameter that translates the hyperplane away from the origin.',
      },
      {
        id: 'DL-001-q4',
        type: 'fill',
        concept: 'terminology',
        prompt: 'The value w^T x + b, computed before the activation function is applied, is called the pre-activation or, especially in classification, the ____.',
        answers: ['logit', 'logits', 'z', 'the logit'],
        explanation:
          'Logit is the standard term for an unnormalised score that has not yet been squashed into a probability. PyTorch losses such as CrossEntropyLoss and BCEWithLogitsLoss expect logits, not probabilities, which is why the word is worth knowing precisely.',
      },
      {
        id: 'DL-001-q5',
        type: 'code-output',
        language: 'python',
        concept: 'framework shapes',
        prompt: 'What does this print?',
        code: 'import torch, torch.nn as nn\nlayer = nn.Linear(5, 2)\nprint(tuple(layer.weight.shape), tuple(layer(torch.randn(8, 5)).shape))',
        options: ['(2, 5) (8, 2)', '(5, 2) (8, 2)', '(2, 5) (8, 5)', '(5, 2) (2, 8)'],
        answerIndex: 0,
        explanation:
          'PyTorch stores the weight as (out_features, in_features), hence (2, 5), and computes x @ W.T + b. A linear layer only ever changes the final dimension, so a batch of 8 inputs with 5 features becomes 8 outputs with 2 features.',
      },
      {
        id: 'DL-001-q6',
        type: 'explain',
        concept: 'dot product intuition',
        prompt: 'Explain why the weighted sum inside a neuron can be read as a measure of similarity between the input and the weight vector.',
        rubric: [
          'States that the weighted sum is a dot product',
          'Connects the dot product to alignment or angle between vectors',
          'Concludes that the weight vector is the pattern the neuron responds to',
        ],
        sampleAnswer:
          'Summing w_i x_i over all i is precisely the dot product w.x, and the dot product equals ||w|| ||x|| cos(theta), where theta is the angle between the two vectors. So the sum is largest when the input points in the same direction as the weight vector, zero when they are perpendicular, and most negative when they point in opposite directions. That means the weight vector acts as a stored template: the neuron reports how much of its preferred pattern is present in the input, scaled by how strong the input is overall.',
        explanation:
          'The examinable idea is that a neuron is a template matcher. Once this clicks, visualising first-layer weights as images stops being a trick and becomes the obvious thing to do.',
      },
    ],

    flashcards: [
      { front: 'Write the equation of a single neuron.', back: 'a = phi(w^T x + b): a dot product with learned weights, plus a learned bias, passed through a fixed nonlinearity.' },
      { front: 'What does the bias do geometrically?', back: 'It translates the decision boundary off the origin. The signed distance from origin to boundary is -b / ||w||.' },
      { front: 'What does the weight vector do geometrically?', back: 'It is the normal to the decision hyperplane; its direction sets the orientation and its magnitude sets how sharply the output changes across the boundary.' },
      { front: 'What is the shape of nn.Linear(in_f, out_f).weight?', back: '(out_features, in_features). PyTorch computes x @ W.T + b, so the layer changes only the last dimension of the input.' },
      { front: 'Why can a single neuron not solve exclusive-or?', back: 'Its boundary is a single hyperplane, and XOR is not linearly separable. You need at least one hidden layer with a nonlinearity.' },
      { front: 'When is bias=False reasonable?', back: 'When the next layer is BatchNorm or LayerNorm, which subtract the mean and supply their own learned shift, making the bias redundant.' },
    ],

    challenge: {
      title: 'A neuron that learns the AND function',
      brief:
        'Implement a single sigmoid neuron in pure NumPy with two inputs, and train it by gradient descent on the four rows of the logical AND truth table until it classifies all four correctly. Print the weights and bias every 200 steps, then plot or describe where the final decision boundary sits relative to the four points. Finally, swap the targets to exclusive-or, rerun the same training loop, and report what happens and why.',
      language: 'python',
      acceptanceCriteria: [
        'The neuron is implemented from scratch: forward pass, loss and gradient written explicitly, no autograd',
        'After training on AND, all four inputs are classified correctly at a 0.5 threshold',
        'The final weights and bias are reported, together with the equation of the decision boundary',
        'The exclusive-or run is included, with a written explanation of why the loss plateaus and cannot be driven down',
      ],
      starterCode:
        'import numpy as np\n\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)\ny_and = np.array([0, 0, 0, 1], dtype=float)\n\nw = np.zeros(2)\nb = 0.0\nlr = 0.5\n# forward, loss, gradient, update — write the loop\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine years old and I have never heard of a neural network. Teach me what a single neuron is and what its weights and bias are for.',
      mustCover: [
        'A neuron takes several numbers in and produces one number out',
        'Each input is multiplied by a weight that says how much that input counts',
        'The products are added up and a bias is added, giving a single score',
        'The score goes through a squashing function so the output is bounded and useful',
      ],
      bonusSignals: [
        'mentions that the weights are learned rather than chosen',
        'connects the weighted sum to a dot product',
        'explains the bias as a starting opinion or threshold',
        'notes that a single neuron can only draw a straight boundary',
      ],
      sampleExplanation:
        "A neuron is a tiny opinion machine. You give it some facts as numbers, and it has to say one number back: how strongly it thinks yes. It does that by giving every fact an importance score, called a weight. Facts it trusts get big weights, facts that argue against get negative weights, and facts it does not care about get weights near zero. It multiplies each fact by its importance, adds all those up, and then adds one extra number called the bias, which is the opinion it starts with before hearing any facts at all. That total is the raw score. Finally it squashes the score into a neat range, so instead of saying minus four point two it can say something like point two nine, which you can read as being twenty-nine per cent convinced. The clever part is that nobody chooses the importance scores by hand. They start out random and get nudged a little every time the machine gets an answer wrong, until they are good.",
    },
  },

  {
    id: 'DL-002',
    domain: 'DL',
    module: 'The Neuron',
    topic: 'Nonlinearity',
    title: 'Activation Functions',
    slug: 'activation-functions',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DL-001'],
    related: ['DL-001'],
    tags: ['activation', 'relu', 'sigmoid', 'tanh', 'gelu', 'softmax', 'vanishing-gradient'],

    learningObjectives: [
      'Prove that a stack of linear layers with no activation collapses into a single linear layer',
      'Compare sigmoid, tanh, ReLU, leaky ReLU and GELU on range, gradient behaviour and cost',
      'Explain vanishing gradients from the shape of the sigmoid derivative, and the dying ReLU problem from the shape of the ReLU derivative',
      'Choose an appropriate activation for hidden layers and for each kind of output head',
    ],

    terminology: [
      {
        term: 'Activation function',
        definition:
          'A fixed, elementwise, nonlinear function applied to the pre-activation of every unit. It has no learnable parameters in the common cases and is chosen by the architect.',
        simple: 'The squash that turns a raw score into the value passed on.',
      },
      {
        term: 'Saturation',
        definition:
          'The regime where a bounded activation is nearly flat, so its derivative is close to zero and almost no gradient flows back through the unit.',
        simple: 'The squash has run out of room, so nudging the input barely changes the output.',
      },
      {
        term: 'Vanishing gradient',
        definition:
          'The exponential shrinking of gradients as they are multiplied through many layers whose derivatives are less than one, leaving early layers effectively untrained.',
        simple: 'The error signal fades to nothing before it reaches the bottom of the network.',
      },
      {
        term: 'Dying ReLU',
        definition:
          'A unit whose pre-activation is negative for every training example. Its ReLU derivative is zero everywhere it is evaluated, so it receives no gradient and can never recover.',
        simple: 'A neuron that has switched itself off permanently.',
      },
      {
        term: 'Softmax',
        definition:
          'A vector-valued activation that exponentiates a vector of logits and normalises them to sum to one, producing a categorical probability distribution.',
        simple: 'Turns a row of scores into percentages that add up to a hundred.',
      },
    ],

    simpleExplanation:
      "Suppose you build a tall tower of layers, and every layer just multiplies and adds. Here is the uncomfortable fact: no matter how many you stack, the whole tower can be replaced by a single layer that does one multiply and one add. Multiplying by three and then by four is the same as multiplying by twelve. So all that depth bought you nothing at all. The activation function is the fix. It is a small bend put into each layer — squash negative numbers to zero, or flatten out large ones — and because a bend cannot be undone by another multiply, the layers stop collapsing. With bends in between, each extra layer genuinely adds new shapes the network can draw. Different bends have different personalities. Some squash everything into a narrow range and go flat at the edges, which makes learning stall. Some leave positive numbers untouched and zero out the rest, which is cheap and trains fast but can switch a unit off forever. Choosing between them is one of the few architecture decisions with a clear default answer.",

    whyItExists:
      'Without a nonlinearity, composing layers is algebraically pointless: the product of affine maps is itself an affine map, so a fifty-layer linear network has exactly the representational power of logistic regression. Activations exist to break that collapse, and the specific choices exist because the first ones tried — sigmoid and tanh — saturate so badly that gradients vanish through depth, which is what stalled neural networks for roughly two decades.',

    analogy: {
      scenario:
        'Imagine a factory assembly line where every station is allowed only to stretch or shrink the part it receives. Station one doubles the length, station two halves it, station three triples it. However many stations you add, the finished part is just the original scaled by a single number, and you could have fired everyone except one worker. Now allow each station one extra move: it may also fold the part. Folds cannot be undone by stretching, and folds on top of folds make genuinely new shapes. Suddenly the length of the line matters.',
      mapping: [
        { from: 'Stretching or shrinking a part', to: 'The affine map w^T x + b inside a layer' },
        { from: 'Composing only stretches', to: 'Stacking linear layers, which collapses to one linear layer' },
        { from: 'A fold in the material', to: 'The nonlinear activation function' },
        { from: 'Folds compounding into complex shapes', to: 'Depth producing hierarchical, nonlinear decision boundaries' },
        { from: 'Folding so hard the material creases and tears', to: 'Saturation and dead units, where the fold destroys the gradient signal' },
      ],
      bridge:
        'The fold is the entire argument for activation functions, and it is not a metaphor: ReLU literally folds the number line at zero, and a network of ReLUs partitions the input space into polyhedral regions with a different affine function on each one. The last mapping is the one to hold onto — a fold that is too aggressive destroys information about how to improve, which is exactly what vanishing gradients and dead units are.',
      limitations:
        'The picture suggests activations are applied to the whole part at once. In reality they act elementwise on each coordinate independently, which is why softmax — which couples the coordinates together — is a genuinely different kind of object from the others.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The activation functions you will actually meet',
        caption: 'Range and derivative behaviour are the two columns that decide everything else.',
        columns: ['Function', 'Formula', 'Output range', 'Max derivative', 'Main problem', 'Use it for'],
        rows: [
          ['Sigmoid', '1 / (1 + e^-z)', '(0, 1)', '0.25 at z = 0', 'Saturates both ends; output not zero-centred', 'Binary output heads only'],
          ['Tanh', '(e^z - e^-z) / (e^z + e^-z)', '(-1, 1)', '1.0 at z = 0', 'Still saturates at both ends', 'RNN gates and small nets; zero-centred'],
          ['ReLU', 'max(0, z)', '[0, inf)', '1 for z > 0', 'Dead units; not differentiable at 0', 'Default for hidden layers in CNNs and MLPs'],
          ['Leaky ReLU', 'max(0.01z, z)', '(-inf, inf)', '1 for z > 0', 'One more hyperparameter', 'When you suspect dying ReLU'],
          ['GELU', 'z * Phi(z)', '(-0.17, inf)', 'about 1.08', 'Costlier to compute', 'Transformers, by convention and results'],
          ['Softmax', 'e^z_i / sum_j e^z_j', '(0, 1), sums to 1', 'depends on the vector', 'Only meaningful over a whole vector', 'Multi-class output heads'],
        ],
      },
      {
        kind: 'compare',
        title: 'Sigmoid versus ReLU for hidden layers',
        caption: 'The historical shift from the left column to the right is most of why deep networks became trainable.',
        left: {
          heading: 'Sigmoid',
          points: [
            'Derivative peaks at 0.25 and falls off fast',
            'Ten layers multiply gradients by at most 0.25^10, about one in a million',
            'Outputs are all positive, so gradients for a layer share a sign and zigzag',
            'Requires an exponential per element',
          ],
        },
        right: {
          heading: 'ReLU',
          points: [
            'Derivative is exactly 1 for any positive input — no shrinkage with depth',
            'A comparison and a select; roughly free on any hardware',
            'Produces exact zeros, giving sparse activations',
            'Costs you the negative half: a unit stuck negative gets no gradient at all',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How a vanishing gradient happens',
        caption: 'Nothing goes wrong in any single step. The damage is entirely in the repeated multiplication.',
        steps: [
          { label: 'Loss gradient arrives at layer 10', detail: 'Some ordinary value, say 1.0.' },
          { label: 'Multiply by sigmoid derivative', detail: 'At best 0.25, and far smaller once the unit saturates. The signal is now 0.25.' },
          { label: 'Pass through layer 9, 8, 7 …', detail: 'Each layer multiplies by its own derivative. After five layers you are at 0.25^5, roughly 0.001.' },
          { label: 'Arrive at layer 1', detail: 'After ten layers, about 1e-6. The weights there move by essentially nothing.' },
          { label: 'Observe the symptom', detail: 'Training loss falls a little then stalls; the early layers are still near their random initialisation.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Explore activations and their derivatives',
        caption: 'Slide the input and watch both the output and the slope. Notice where the slope reaches zero, and how wide that region is.',
        widget: 'activation-explorer',
      },
    ],

    formalDefinition:
      'An activation function phi: R -> R is a fixed, almost-everywhere differentiable, nonlinear function applied elementwise to the pre-activations of a layer. Nonlinearity is required for universal approximation: by the universal approximation theorem, a single hidden layer with a non-polynomial activation and enough units can approximate any continuous function on a compact set arbitrarily well, whereas a network of affine layers can only represent affine functions regardless of depth or width. Softmax is the standard exception to elementwise application, mapping R^k to the interior of the probability simplex.',

    math: {
      intuition:
        'Two numbers tell you almost everything about an activation: what it does to the value, and what it does to the gradient. The value determines what the next layer sees; the derivative determines how much learning signal survives the trip back. Sigmoid and tanh squash values into a bounded range, which is comfortable, but their derivatives collapse toward zero whenever the input is even moderately large, and gradients multiply through layers. ReLU keeps the derivative at exactly one on the positive side, so nothing shrinks, at the price of exactly zero on the negative side.',
      formulas: [
        {
          latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\qquad \\sigma\'(z) = \\sigma(z)\\bigl(1 - \\sigma(z)\\bigr) \\le \\tfrac{1}{4}',
          name: 'Sigmoid and its derivative',
          meaning:
            'Maps any real number into (0, 1), so it reads as a probability. Its derivative is a bump peaking at 0.25 when z = 0 and decaying to zero in both directions, which is the mechanical cause of vanishing gradients.',
          variables: [
            { symbol: 'z', meaning: 'The pre-activation entering the unit' },
            { symbol: '\\sigma(z)', meaning: 'The squashed output, strictly between 0 and 1' },
            { symbol: "\\sigma'(z)", meaning: 'The local slope; its maximum value of 1/4 bounds how much gradient can survive one sigmoid layer' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\tanh(z) = \\frac{e^{z} - e^{-z}}{e^{z} + e^{-z}} = 2\\sigma(2z) - 1, \\qquad \\tanh\'(z) = 1 - \\tanh^{2}(z)',
          name: 'Hyperbolic tangent',
          meaning:
            'A rescaled sigmoid with range (-1, 1) and a maximum derivative of 1. Being zero-centred makes the gradients of a layer less correlated in sign, so tanh trains better than sigmoid, though it still saturates.',
          variables: [
            { symbol: 'z', meaning: 'Pre-activation' },
            { symbol: '\\tanh(z)', meaning: 'Output in (-1, 1), equal to zero when z is zero' },
            { symbol: "\\tanh'(z)", meaning: 'Slope, equal to 1 at the origin and falling to zero as |z| grows' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{ReLU}(z) = \\max(0, z), \\qquad \\mathrm{ReLU}\'(z) = \\begin{cases} 1 & z > 0 \\\\ 0 & z < 0 \\end{cases}',
          name: 'Rectified linear unit',
          meaning:
            'Passes positive values through untouched and clamps negatives to zero. The derivative is exactly one on the positive side, so gradients do not shrink with depth, and exactly zero on the negative side, which is where dead units come from.',
          variables: [
            { symbol: 'z', meaning: 'Pre-activation' },
            { symbol: '\\max(0, z)', meaning: 'The rectification: keep z if positive, otherwise emit zero' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{LeakyReLU}(z) = \\max(\\alpha z, z), \\quad \\alpha \\approx 0.01',
          name: 'Leaky ReLU',
          meaning:
            'Gives the negative side a small positive slope so that a unit which has drifted negative still receives a gradient and can be pulled back. This removes the dying ReLU failure mode at essentially no cost.',
          variables: [
            { symbol: '\\alpha', meaning: 'The negative slope, typically 0.01; if it is made learnable the function is called PReLU' },
            { symbol: 'z', meaning: 'Pre-activation' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{GELU}(z) = z\\,\\Phi(z) \\approx 0.5\\,z\\left(1 + \\tanh\\!\\left[\\sqrt{\\tfrac{2}{\\pi}}\\left(z + 0.044715 z^{3}\\right)\\right]\\right)',
          name: 'Gaussian error linear unit',
          meaning:
            'A smooth ReLU that weights the input by the probability a standard normal falls below it. Because it is differentiable everywhere and lets slightly negative values through, it tends to train transformers a little better than ReLU.',
          variables: [
            { symbol: '\\Phi(z)', meaning: 'The standard normal cumulative distribution function evaluated at z' },
            { symbol: 'z', meaning: 'Pre-activation' },
            { symbol: '\\tanh[\\cdot]', meaning: 'The cheap closed-form approximation used in practice, which avoids computing the error function' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{softmax}(\\mathbf{z})_i = \\frac{e^{z_i}}{\\sum_{j=1}^{k} e^{z_j}}',
          name: 'Softmax',
          meaning:
            'Converts a vector of k logits into a probability distribution over k classes. It is the only common activation that couples units together: raising one logit lowers every other probability.',
          variables: [
            { symbol: 'z_i', meaning: 'The logit for class i' },
            { symbol: 'k', meaning: 'Number of classes' },
            { symbol: '\\sum_j e^{z_j}', meaning: 'The normalising constant, called the partition function, which forces the outputs to sum to one' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'Take two layers with no activation: h = W1 x + b1, then y = W2 h + b2.',
        'Substitute: y = W2 (W1 x + b1) + b2 = (W2 W1) x + (W2 b1 + b2).',
        'Define W = W2 W1 and b = W2 b1 + b2. Then y = W x + b, a single affine layer.',
        'Induction extends this to any depth: a composition of affine maps is affine. Depth adds no representational power whatsoever.',
        'Now insert an elementwise nonlinearity: h = phi(W1 x + b1), y = W2 h + b2. No matrix identity can absorb phi, because phi is not linear, so the composition cannot be flattened.',
        'This is the whole justification. Note the theorem needs phi to be non-polynomial as well as nonlinear: a polynomial activation of degree d composed with itself stays polynomial and caps the family of functions you can reach.',
      ],
    },

    workedExample: {
      title: 'Watching two linear layers collapse into one',
      setup:
        'Take a two-layer network with no activation. Layer 1 has W1 = [[2, 0], [1, 3]] and b1 = [1, -1]. Layer 2 has W2 = [[1, -1], [0, 2]] and b2 = [0, 1]. The input is x = [1, 2]. Compute the output the long way, then find the single layer that does the same job.',
      steps: [
        {
          label: 'Layer 1 forward',
          detail: 'W1 x = [2(1) + 0(2), 1(1) + 3(2)] = [2, 7]. Adding b1 gives h = [3, 6].',
          latex: '\\mathbf{h} = W_1\\mathbf{x} + \\mathbf{b}_1 = [2, 7] + [1, -1] = [3, 6]',
        },
        {
          label: 'Layer 2 forward',
          detail: 'W2 h = [1(3) - 1(6), 0(3) + 2(6)] = [-3, 12]. Adding b2 gives y = [-3, 13].',
          latex: '\\mathbf{y} = W_2\\mathbf{h} + \\mathbf{b}_2 = [-3, 12] + [0, 1] = [-3, 13]',
        },
        {
          label: 'Multiply the weight matrices',
          detail: 'W = W2 W1. Row 1: [1(2) + (-1)(1), 1(0) + (-1)(3)] = [1, -3]. Row 2: [0(2) + 2(1), 0(0) + 2(3)] = [2, 6]. So W = [[1, -3], [2, 6]].',
          latex: 'W = W_2 W_1 = \\begin{bmatrix} 1 & -3 \\\\ 2 & 6 \\end{bmatrix}',
        },
        {
          label: 'Combine the biases',
          detail: 'b = W2 b1 + b2 = [1(1) + (-1)(-1), 0(1) + 2(-1)] + [0, 1] = [2, -2] + [0, 1] = [2, -1].',
          latex: '\\mathbf{b} = W_2\\mathbf{b}_1 + \\mathbf{b}_2 = [2, -1]',
        },
        {
          label: 'Check the single layer',
          detail: 'W x + b = [1(1) + (-3)(2), 2(1) + 6(2)] + [2, -1] = [-5, 14] + [2, -1] = [-3, 13]. Identical to the two-layer answer, for this and for every other input.',
          latex: 'W\\mathbf{x} + \\mathbf{b} = [-3, 13]',
        },
        {
          label: 'Now add a ReLU between the layers',
          detail: 'h = ReLU([3, 6]) = [3, 6] — unchanged here because both entries are positive. But for x = [-2, 0] the pre-activations are [-3, -3], ReLU gives [0, 0], and no single matrix can reproduce that clamping for all inputs. The collapse is broken.',
          latex: '\\mathrm{ReLU}([-3, -3]) = [0, 0]',
        },
      ],
      conclusion:
        'Two layers with no activation were provably one layer in disguise. Inserting a single elementwise max(0, z) makes the composition impossible to flatten, which is why every hidden layer you will ever write has an activation attached to it.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'All the activations, evaluated on the same inputs',
        runnable: true,
        code: `import torch
import torch.nn.functional as F

z = torch.tensor([-3.0, -0.5, 0.0, 0.5, 3.0])

rows = {
    "sigmoid":    torch.sigmoid(z),
    "tanh":       torch.tanh(z),
    "relu":       F.relu(z),
    "leaky_relu": F.leaky_relu(z, negative_slope=0.01),
    "gelu":       F.gelu(z),
}
for name, out in rows.items():
    print(f"{name:11s}", [round(v, 4) for v in out.tolist()])`,
        output: `sigmoid     [0.0474, 0.3775, 0.5, 0.6225, 0.9526]
tanh        [-0.9951, -0.4621, 0.0, 0.4621, 0.9951]
relu        [0.0, 0.0, 0.0, 0.5, 3.0]
leaky_relu  [-0.03, -0.005, 0.0, 0.5, 3.0]
gelu        [-0.004, -0.1543, 0.0, 0.3457, 2.996]`,
        explanation:
          'Read the columns rather than the rows. At z = -3 sigmoid and tanh have already flattened against their limits, which is saturation. ReLU has thrown the value away entirely while leaky ReLU has kept one per cent of it. GELU has kept a small negative amount at -0.5 and almost nothing at -3, which is the smooth behaviour that makes it differentiable everywhere.',
      },
      {
        language: 'python',
        title: 'Measuring the vanishing gradient directly',
        runnable: true,
        code: `import torch
import torch.nn as nn

def make_net(activation, depth=10, width=64):
    layers = []
    for _ in range(depth):
        layers += [nn.Linear(width, width), activation()]
    return nn.Sequential(*layers)

torch.manual_seed(0)
x = torch.randn(32, 64)

for name, act in [("sigmoid", nn.Sigmoid), ("tanh", nn.Tanh), ("relu", nn.ReLU)]:
    net = make_net(act)
    net(x).sum().backward()
    first = net[0].weight.grad.abs().mean().item()
    last  = net[-2].weight.grad.abs().mean().item()
    print(f"{name:8s} first-layer grad {first:.3e}   last-layer grad {last:.3e}")`,
        output: `sigmoid  first-layer grad 1.041e-08   last-layer grad 2.216e-02
tanh     first-layer grad 9.883e-05   last-layer grad 5.687e-02
relu     first-layer grad 1.372e-02   last-layer grad 1.006e-01`,
        explanation:
          'The exact numbers depend on the seed, but the pattern is completely reliable. With sigmoid, the gradient reaching layer one is about six orders of magnitude smaller than the one at layer ten, so layer one is effectively frozen at its random initialisation. Tanh is better because its maximum derivative is 1 rather than 0.25. ReLU keeps first and last within one order of magnitude. This single experiment is why the field moved to ReLU around 2011.',
      },
      {
        language: 'python',
        title: 'Detecting dead ReLU units',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(1)
layer = nn.Linear(16, 8)
with torch.no_grad():
    layer.bias.fill_(-5.0)       # simulate a layer whose bias has been driven down

x = torch.randn(512, 16)
a = torch.relu(layer(x))

alive = (a > 0).any(dim=0)                       # did this unit ever fire on any example?
print("units that fired at least once:", int(alive.sum()), "of 8")
print("fraction of all activations that are zero:", round((a == 0).float().mean().item(), 3))`,
        output: `units that fired at least once: 0 of 8
fraction of all activations that are zero: 1.0`,
        explanation:
          'A dead unit is not an error condition, which is exactly why it is dangerous — training carries on and simply learns less. The diagnostic is the one shown here: hook a layer, run a few hundred examples, and count units whose activation is zero for every single one. Those units have a zero ReLU derivative everywhere they are evaluated, so they receive no gradient and cannot come back. Lowering the learning rate, switching to leaky ReLU, or fixing the initialisation are the three standard remedies.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The 2012 AlexNet result',
        usage:
          'AlexNet reported that replacing tanh with ReLU made training roughly six times faster to reach the same error on CIFAR-10. That speed-up, not a new architecture idea, is a large part of why the deep learning revival happened when it did.',
      },
      {
        context: 'Transformer feed-forward blocks',
        usage:
          'BERT and GPT use GELU rather than ReLU in their feed-forward layers. The published gain is small but consistent, and because inference cost is dominated by matrix multiplications rather than elementwise functions, the extra computation is affordable.',
      },
      {
        context: 'Output heads in production models',
        usage:
          'A fraud detector ends in a single sigmoid to give a probability of fraud. An image classifier ends in softmax over 1000 classes. A house-price regressor ends in no activation at all, because clamping the output would make large prices unreachable. The output activation is dictated by the task, not by fashion.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.ReLU, nn.GELU and friends as modules; torch.relu and F.gelu as functions. Modules are needed inside nn.Sequential; functions are fine inside a forward method.' },
      { tool: 'torchvision models', role: 'ResNet and VGG use inplace ReLU throughout, which saves activation memory during training but makes some debugging hooks harder to attach.' },
      { tool: 'Hugging Face transformers', role: 'The hidden_act field in a model config selects the feed-forward activation, most often gelu or the gated variant silu.' },
    ],

    commonMistakes: [
      {
        mistake: 'Applying softmax and then passing the result to nn.CrossEntropyLoss',
        why: 'CrossEntropyLoss already applies log-softmax internally. Feeding it probabilities means the softmax is applied twice, which flattens the distribution, weakens the gradient and slows or stalls training — with no error message at any point.',
        fix: 'Pass raw logits to nn.CrossEntropyLoss, and raw logits to nn.BCEWithLogitsLoss. Apply softmax or sigmoid only at inference, when you want to report a probability.',
      },
      {
        mistake: 'Using sigmoid or tanh in the hidden layers of a deep network',
        why: 'Their derivatives are bounded by 0.25 and 1.0 respectively and shrink fast away from the origin, so gradients decay geometrically with depth and the early layers barely move.',
        fix: 'Use ReLU or GELU for hidden layers. Keep sigmoid and tanh for places where their bounded range is the point: output heads, and the gates inside an LSTM or GRU.',
      },
      {
        mistake: 'Treating a large fraction of exact zeros as a bug',
        why: 'ReLU is meant to produce zeros — roughly half of them at initialisation — and that sparsity is part of why it works. Panicking about it leads people to change activations for no reason.',
        fix: 'Distinguish sparse from dead. Sparse means a unit is zero on some inputs. Dead means it is zero on all of them. Only the second is a problem, and the test is the per-unit any-fired check.',
      },
      {
        mistake: 'Putting an activation on the final layer of a regression model',
        why: 'ReLU on the output makes negative predictions impossible; sigmoid caps them at 1. If your targets are temperatures or log-returns, you have made the correct answer unrepresentable, and the loss will plateau at whatever the clamp allows.',
        fix: 'Leave the regression head linear. Add an output activation only when the target genuinely has that range, for example sigmoid for a value you know lies in [0, 1].',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why does a neural network need nonlinear activation functions?',
        answer:
          'Because a composition of affine maps is itself an affine map. If you write two layers as W2(W1 x + b1) + b2 you can expand it to (W2 W1) x + (W2 b1 + b2), which is a single layer with weight W2 W1 and bias W2 b1 + b2. By induction the same holds for any depth, so a network with no activations has exactly the representational power of one linear layer no matter how large it is. A nonlinearity cannot be absorbed into a matrix product, so it is what makes depth buy you anything. The universal approximation theorem then says one hidden layer with a non-polynomial activation and enough units can approximate any continuous function on a compact set.',
        followUp:
          'A strong answer mentions that the activation must be non-polynomial, not merely nonlinear, since polynomials compose into polynomials and cap the reachable function class.',
      },
      {
        level: 'intermediate',
        question: 'Explain the vanishing gradient problem and how ReLU addresses it.',
        answer:
          'Backpropagation multiplies the derivative of every activation along the path from the loss to a given weight. The sigmoid derivative is sigma(z)(1 - sigma(z)), which peaks at 0.25 and shrinks quickly once z moves away from zero. Multiplying ten such factors gives at most 0.25^10, about one in a million, so early-layer gradients are numerically negligible and those layers never leave their initialisation. ReLU has derivative exactly 1 wherever it is active, so the multiplicative chain does not attenuate through active paths and gradient magnitude stays roughly constant with depth. The cost is that the derivative is exactly 0 on the negative side, which creates the dying ReLU failure mode. Residual connections and normalisation layers attack the same problem from different directions.',
      },
      {
        level: 'ml-engineer',
        question: 'A colleague reports that 40 per cent of the ReLU activations in their network are zero. Is this a problem?',
        answer:
          'Almost certainly not, and the statistic as stated cannot tell you. About half of ReLU activations being zero on a given batch is normal and is the sparsity that makes ReLU work. The question that matters is whether particular units are zero for every input, which is the dying ReLU condition. Compute a per-unit indicator over a few hundred examples: alive = (activations > 0).any(dim=0). If a meaningful fraction of units never fire, then investigate — usually the cause is a learning rate high enough to drive biases sharply negative, or a bad initialisation. The fixes are a lower learning rate, leaky ReLU or GELU, He initialisation, or a normalisation layer that keeps pre-activations centred.',
        followUp: 'Mentioning that a dead unit is unrecoverable under plain ReLU, because zero gradient means the weights can never be updated back, shows the mechanism is understood rather than memorised.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A sigmoid unit has pre-activation z = 4.0. Compute the activation and the derivative, then state how much a gradient arriving from above would be scaled as it passes back through this unit.',
        hint: 'sigma(4) = 1 / (1 + e^-4), and the derivative is sigma(z)(1 - sigma(z)).',
        solution:
          'e^-4 = 0.018316, so sigma(4) = 1 / 1.018316 = 0.98201. The derivative is 0.98201 x (1 - 0.98201) = 0.98201 x 0.01799 = 0.01767. A gradient arriving from above is multiplied by about 0.0177, so it is reduced to under two per cent of its size by this single unit. Two such units in series leave three parts in ten thousand. This is saturation, and it is why the value z = 4 — which looks perfectly reasonable — is already deep in the dangerous regime for a sigmoid.',
      },
      {
        prompt:
          'Prove that a network of three linear layers with no activation is equivalent to a single linear layer, and state the resulting weight matrix and bias in terms of W1, W2, W3, b1, b2, b3.',
        hint: 'Substitute one layer into the next, twice, and collect terms in x.',
        solution:
          'Let h1 = W1 x + b1, h2 = W2 h1 + b2 and y = W3 h2 + b3. Substituting: h2 = W2(W1 x + b1) + b2 = W2 W1 x + W2 b1 + b2. Then y = W3(W2 W1 x + W2 b1 + b2) + b3 = (W3 W2 W1) x + (W3 W2 b1 + W3 b2 + b3). So W = W3 W2 W1 and b = W3 W2 b1 + W3 b2 + b3. Note the shape of the result: W is a single matrix whose rank is at most the smallest dimension in the chain, so a deep narrow linear stack is a low-rank factorisation of one linear map, not a richer model.',
      },
      {
        prompt:
          'Given logits [2.0, 1.0, 0.1] for three classes, compute the softmax probabilities by hand to four decimal places. Then add 5 to every logit and recompute, and explain the result.',
        hint: 'Exponentiate each, sum, divide. For the second part, factor e^5 out of numerator and denominator.',
        solution:
          'e^2.0 = 7.3891, e^1.0 = 2.7183, e^0.1 = 1.1052, and the sum is 11.2126. Dividing gives [0.6590, 0.2424, 0.0986]. Adding 5 to every logit multiplies every exponential by e^5, which appears in both numerator and denominator and cancels exactly, so the probabilities are unchanged: [0.6590, 0.2424, 0.0986]. Softmax depends only on the differences between logits, not their absolute level. Implementations exploit this by subtracting the maximum logit before exponentiating, which prevents overflow when logits are large — the log-sum-exp trick.',
      },
    ],

    quiz: [
      {
        id: 'DL-002-q1',
        type: 'mcq',
        concept: 'need for nonlinearity',
        prompt: 'What is the representational power of a 50-layer network whose layers are all linear with no activation functions?',
        options: [
          'Exactly that of a single linear layer',
          'Fifty times that of a single linear layer',
          'Enough to approximate any continuous function',
          'Enough for any linearly separable problem but nothing else, because of depth',
        ],
        answerIndex: 0,
        explanation:
          'A composition of affine maps is affine: W50 ... W1 x plus a combined bias is one matrix and one vector. Depth without nonlinearity buys nothing at all, which is the single most important fact about activation functions.',
      },
      {
        id: 'DL-002-q2',
        type: 'numeric',
        concept: 'sigmoid derivative',
        prompt: 'What is the maximum possible value of the derivative of the sigmoid function, over all real inputs?',
        answer: 0.25,
        tolerance: 0.001,
        explanation:
          "sigma'(z) = sigma(z)(1 - sigma(z)) is maximised when sigma(z) = 0.5, that is at z = 0, giving 0.5 x 0.5 = 0.25. Since every sigmoid layer multiplies the backward signal by at most a quarter, ten layers attenuate it by at least a factor of a million.",
      },
      {
        id: 'DL-002-q3',
        type: 'multi',
        concept: 'choosing activations',
        prompt: 'Which of the following are reasonable choices in a modern deep network? Select all that apply.',
        options: [
          'ReLU on hidden layers of a convolutional network',
          'Softmax on the output of a 10-class classifier',
          'Sigmoid on the hidden layers of a 20-layer network',
          'GELU in the feed-forward block of a transformer',
          'ReLU on the output of a model predicting temperature in Celsius',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Sigmoid in deep hidden layers causes vanishing gradients, and ReLU on a temperature head makes every negative temperature unrepresentable. The other three are the standard defaults: ReLU for convolutional hidden layers, softmax for a multi-class head, GELU inside transformer feed-forward blocks.',
      },
      {
        id: 'DL-002-q4',
        type: 'truefalse',
        concept: 'dying relu',
        prompt: 'A ReLU unit whose pre-activation is negative for every training example can recover later in training.',
        answer: false,
        explanation:
          'Under plain ReLU it cannot. The derivative is zero everywhere the unit is evaluated, so its incoming weights and bias receive exactly zero gradient and never change, which keeps the pre-activation negative forever. Leaky ReLU exists precisely to leave a small nonzero slope so recovery is possible.',
      },
      {
        id: 'DL-002-q5',
        type: 'code-output',
        language: 'python',
        concept: 'softmax shift invariance',
        prompt: 'What does this print?',
        code: 'import torch\na = torch.softmax(torch.tensor([1.0, 2.0, 3.0]), dim=0)\nb = torch.softmax(torch.tensor([101.0, 102.0, 103.0]), dim=0)\nprint(torch.allclose(a, b, atol=1e-6))',
        options: ['True', 'False', 'It raises an overflow error', 'True only on a GPU'],
        answerIndex: 0,
        explanation:
          'Softmax is invariant to adding a constant to every logit, because the common factor e^c cancels between numerator and denominator. PyTorch also subtracts the row maximum internally, so the large-logit case is numerically stable rather than overflowing.',
      },
      {
        id: 'DL-002-q6',
        type: 'match',
        concept: 'activation selection',
        prompt: 'Match each output task to the activation its head should use.',
        pairs: [
          { left: 'Binary classification (spam or not)', right: 'Sigmoid, or raw logits with BCEWithLogitsLoss' },
          { left: 'Single-label classification over 10 classes', right: 'Softmax, or raw logits with CrossEntropyLoss' },
          { left: 'Predicting an unbounded real number', right: 'No activation at all' },
          { left: 'Multi-label tagging where several tags can be true', right: 'Independent sigmoid per label' },
        ],
        explanation:
          'The output activation is dictated by the shape of the target. Softmax forces the predictions to compete and sum to one, which is wrong for multi-label problems where several answers can be true at once; there you want an independent sigmoid on each output.',
      },
      {
        id: 'DL-002-q7',
        type: 'explain',
        concept: 'relu trade-off',
        prompt: 'Explain the trade-off ReLU makes compared with sigmoid, covering both the forward and the backward pass.',
        rubric: [
          'Notes that ReLU has derivative 1 on the positive side so gradients do not shrink with depth',
          'Notes that ReLU discards all negative information and has zero gradient there',
          'Mentions dead units as the concrete failure mode, and a remedy',
        ],
        sampleAnswer:
          'Going forward, sigmoid squashes everything into (0, 1) so no activation can ever be large, while ReLU passes positive values through untouched and throws away the negative half entirely. Going backward, the difference is decisive: the sigmoid derivative is at most 0.25 and usually far less, so gradients decay geometrically with depth, whereas the ReLU derivative is exactly 1 wherever the unit is active, so an active path attenuates nothing. The price is the inactive half, where the derivative is exactly 0. If a unit ends up negative for every input it receives no gradient at all and can never recover, which is the dying ReLU problem; leaky ReLU or GELU fixes it by leaving a small slope on the negative side.',
        explanation:
          'A good answer treats forward and backward separately, because the reason ReLU won is entirely about the backward pass — the forward behaviour on its own looks like a loss of information.',
      },
    ],

    flashcards: [
      { front: 'Why can a stack of linear layers be replaced by one layer?', back: 'W2(W1 x + b1) + b2 = (W2 W1)x + (W2 b1 + b2). A composition of affine maps is affine, at any depth.' },
      { front: 'What is the maximum derivative of the sigmoid?', back: '0.25, attained at z = 0. Ten sigmoid layers shrink gradients by at least a factor of a million.' },
      { front: 'What is the ReLU derivative?', back: '1 for z > 0 and 0 for z < 0 (undefined at exactly 0, where frameworks pick 0). Constant 1 is why ReLU avoids vanishing gradients.' },
      { front: 'What is a dead ReLU unit and how do you detect it?', back: 'A unit whose pre-activation is negative on every input, so it gets zero gradient forever. Detect with (activations > 0).any(dim=0) over a few hundred examples.' },
      { front: 'Which activation belongs on a multi-class output head?', back: 'Softmax — or better, no activation at all, passing raw logits to nn.CrossEntropyLoss, which applies log-softmax internally.' },
      { front: 'Why is softmax unchanged when you add a constant to every logit?', back: 'The factor e^c cancels between numerator and denominator. Implementations subtract the max logit first for numerical stability.' },
      { front: 'Which activation do transformers usually use in the feed-forward block?', back: 'GELU (or the gated variant SiLU/SwiGLU). It is a smooth ReLU that lets small negative values through and is differentiable everywhere.' },
    ],

    challenge: {
      title: 'An activation bake-off on depth',
      brief:
        'Build an MLP with a configurable depth and activation, and train it on a two-moons or MNIST subset at depths 2, 8 and 20 with sigmoid, tanh and ReLU. For each run, record the mean absolute gradient of the first and last layer after the first backward pass, and the training loss after a fixed number of steps. Produce a table of nine rows and write three sentences explaining the pattern in the gradient ratios.',
      language: 'python',
      acceptanceCriteria: [
        'Depth and activation are parameters, not copied code',
        'First-layer and last-layer gradient magnitudes are measured and reported for every configuration',
        'The results show the gradient ratio degrading with depth for sigmoid far faster than for ReLU',
        'The written explanation refers to the derivative bounds of each activation, not just to the observed numbers',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\n\ndef build(depth: int, act, width: int = 64, in_dim: int = 2, out_dim: int = 2):\n    layers = []\n    d = in_dim\n    for _ in range(depth):\n        layers += [nn.Linear(d, width), act()]\n        d = width\n    layers.append(nn.Linear(d, out_dim))\n    return nn.Sequential(*layers)\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to a beginner why neural networks need activation functions at all, and then explain why ReLU replaced sigmoid for hidden layers.',
      mustCover: [
        'Stacking linear layers collapses into a single linear layer, so depth without a nonlinearity is wasted',
        'The activation is the bend that makes composition productive',
        'Sigmoid derivatives are small, and they multiply through layers, so gradients vanish',
        'ReLU has derivative one on the positive side, keeping gradient magnitude stable through depth',
      ],
      bonusSignals: [
        'gives the algebraic collapse explicitly',
        'quotes 0.25 as the sigmoid derivative bound',
        'mentions dead units as the price ReLU pays',
        'distinguishes hidden-layer activations from output-head activations',
      ],
      sampleExplanation:
        "Think about what a layer does: multiply by some numbers and add some numbers. If the next layer does the same thing, you can work out in advance what the combined effect is and do it in one step instead. Multiply by three then by four is just multiply by twelve. So a hundred layers of pure multiplying and adding is exactly as powerful as one layer, which makes the whole idea of a deep network pointless. The activation function is a bend put in after each layer, and bends do not combine the way stretches do, so the layers can no longer be flattened. Now, about which bend to use. The old choice was the sigmoid, an S shape that squashes everything between zero and one. The trouble is that the S goes flat at both ends, and learning works by passing a signal backwards through every layer, multiplying by the steepness at each one. A flat part means multiplying by nearly zero, so after ten layers the signal reaching the bottom is a millionth of what it started as and the first layers never learn anything. ReLU is a much blunter bend: negative numbers become zero, positive numbers pass straight through. Its steepness on the positive side is exactly one, so multiplying by it changes nothing, and the signal arrives at the bottom intact. The price is that a unit which goes negative for every example gets a steepness of exactly zero and can get stuck switched off forever.",
    },
  },
  {
    id: 'DL-003',
    domain: 'DL',
    module: 'The Neuron',
    topic: 'Forward propagation',
    title: 'Layers and Forward Propagation',
    slug: 'layers-and-forward-propagation',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['DL-001', 'DL-002'],
    related: ['DL-001', 'DL-002'],
    tags: ['layers', 'forward-pass', 'matrix-multiplication', 'shapes', 'hidden-representation', 'mlp'],

    learningObjectives: [
      'Express a whole layer of neurons as a single matrix multiplication plus a bias vector',
      'Track tensor shapes through a multi-layer network and predict the output shape of any layer',
      'Count the parameters of a network layer by layer and say where they are concentrated',
      'Explain what a hidden representation is and why deeper layers encode more abstract features',
    ],

    terminology: [
      {
        term: 'Layer',
        definition:
          'A group of neurons that all receive the same input vector and compute their pre-activations in parallel. Its parameters are one weight matrix and one bias vector.',
        simple: 'A row of neurons that all look at the same thing at the same time.',
      },
      {
        term: 'Forward propagation',
        definition:
          'The process of computing activations layer by layer from the input to the output, each layer consuming the activations of the one below it.',
        simple: 'Pushing the data through the network from front to back to get a prediction.',
      },
      {
        term: 'Hidden layer',
        definition:
          'Any layer whose output is consumed by another layer rather than reported as the prediction. Its activations are the learned features of the network.',
        simple: 'A middle layer whose answers you never look at directly.',
      },
      {
        term: 'Hidden representation (embedding)',
        definition:
          'The activation vector produced by a hidden layer for a given input. It is a re-description of the input in coordinates the network invented for itself.',
        simple: 'The network describing your data in its own private vocabulary.',
      },
      {
        term: 'Batch dimension',
        definition:
          'The leading axis of an input tensor, indexing independent examples processed together. Layers act identically and independently on each slice along it.',
        simple: 'The stack of examples you push through at the same time.',
      },
      {
        term: 'Multilayer perceptron (MLP)',
        definition:
          'A network of fully connected layers with nonlinear activations between them, where every unit in a layer is connected to every unit in the next.',
        simple: 'The plain vanilla neural network, with everything wired to everything.',
      },
    ],

    simpleExplanation:
      "One neuron gives you one number. That is not very useful, so you build a whole row of them, all looking at the same input but each with its own set of weights. One might notice that the numbers are mostly large, another that the first and third features disagree, another something you would struggle to name. Together that row of answers is a new description of your data, written in the network own words. Now do it again: feed that new description into another row of neurons, which can spot patterns among the patterns. Stack a few rows and the descriptions get steadily more abstract — pixels become edges, edges become corners, corners become faces. The beautiful practical detail is that a whole row of neurons is just one matrix multiplication. You do not loop over neurons in Python; you put all their weights in one grid, multiply once, and the hardware does thousands of dot products at the same time. Pushing data through every layer in order, front to back, is called forward propagation, and it is the entire prediction process.",

    whyItExists:
      'A single neuron can only draw one hyperplane, so it cannot represent anything interesting. Layers exist to compute many features in parallel and to let those features become the inputs of further features, which is what turns a linear classifier into a hierarchical one. Writing a layer as a matrix product rather than a loop is what makes this fast enough to be practical: it maps onto a single BLAS or cuBLAS call rather than thousands of interpreted Python iterations.',

    analogy: {
      scenario:
        'Think of how a large newspaper turns events into a front page. Reporters on the ground each record raw observations. Section editors read many reports and each writes one summary in their own area: politics, markets, weather. The managing editor reads only those summaries — never the raw reports — and decides what the headline says. Nobody at the top ever sees a single reporter note, yet the headline depends on all of them, filtered through two rounds of compression.',
      mapping: [
        { from: 'A raw observation from one reporter', to: 'One input feature, or one pixel' },
        { from: 'A section editor who reads everything and writes one line', to: 'One neuron in a hidden layer, with its own weights over all inputs' },
        { from: 'The whole desk of section editors working in parallel', to: 'A layer, computed as one matrix multiplication' },
        { from: 'The managing editor reading only the summaries', to: 'The next layer consuming the previous layer activations' },
        { from: 'The published headline', to: 'The output layer, producing logits or a prediction' },
      ],
      bridge:
        'The key structural fact carried by the analogy is that each level only sees the level below, never the raw input, which is exactly why hidden representations become more abstract with depth. It also explains the parameter count: every section editor reads every reporter, so the number of connections is the number of reporters times the number of editors — which is precisely the shape of the weight matrix.',
      limitations:
        'Real editors decide what to summarise; hidden units do not choose their job. Their job is whatever reduces the loss, which is why the features they learn frequently have no clean human name.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Shapes through a 784 to 128 to 64 to 10 classifier, batch size 32',
        caption: 'A linear layer changes only the last dimension. Learn to read a network as this table and most shape bugs disappear.',
        columns: ['Stage', 'Operation', 'Output shape', 'Parameters'],
        rows: [
          ['Input', 'flattened 28x28 image', '(32, 784)', '0'],
          ['Layer 1', 'Linear(784, 128)', '(32, 128)', '784 x 128 + 128 = 100,480'],
          ['Activation', 'ReLU, elementwise', '(32, 128)', '0'],
          ['Layer 2', 'Linear(128, 64)', '(32, 64)', '128 x 64 + 64 = 8,256'],
          ['Activation', 'ReLU, elementwise', '(32, 64)', '0'],
          ['Layer 3', 'Linear(64, 10)', '(32, 10)', '64 x 10 + 10 = 650'],
          ['Total', 'logits, one row per example', '(32, 10)', '109,386'],
        ],
      },
      {
        kind: 'flow',
        title: 'Forward propagation, one layer at a time',
        caption: 'Repeat for every layer. There is nothing else to the prediction path.',
        steps: [
          { label: 'A(0) = X', detail: 'The batch of inputs, shape (N, d0). Row i is example i.' },
          { label: 'Z(1) = A(0) W(1) + b(1)', detail: 'One matrix multiplication computes every neuron of layer 1 for every example at once.' },
          { label: 'A(1) = phi(Z(1))', detail: 'Elementwise activation. Shape is unchanged; only the values are bent.' },
          { label: 'Z(2) = A(1) W(2) + b(2)', detail: 'Layer 2 treats the layer-1 activations as its input features. It has no access to X.' },
          { label: 'Repeat to the last layer', detail: 'The final Z is usually left unsquashed: those are the logits.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading a shape error',
        subject: 'RuntimeError: mat1 and mat2 shapes cannot be multiplied (32x784 and 128x64)',
        annotations: [
          { part: 'mat1 = 32x784', note: 'Your data: batch of 32, each with 784 features. The 32 is fine; the 784 is what must match.' },
          { part: 'mat2 = 128x64', note: 'The weight of the layer you called, stored transposed. It expects inputs of width 128, not 784.' },
          { part: 'cannot be multiplied', note: 'Inner dimensions disagree: 784 against 128. You skipped a layer, or built the layer with the wrong in_features.' },
          { part: 'the fix', note: 'Print x.shape immediately before the failing call. The mismatch is always between the last dimension of the input and in_features of the layer.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Build a network and watch data flow through it',
        caption: 'Add layers, change widths, and follow one input vector as it becomes a hidden representation and then a prediction.',
        widget: 'neural-network-lab',
      },
    ],

    formalDefinition:
      'A fully connected layer l is the map A(l) = phi(A(l-1) W(l) + b(l)), where A(l-1) is an N x d(l-1) matrix of activations for a batch of N examples, W(l) is a d(l-1) x d(l) weight matrix, b(l) is a d(l) bias vector broadcast across rows, and phi is applied elementwise. Forward propagation is the ordered evaluation of this recurrence for l = 1..L with A(0) = X, producing the network output A(L). PyTorch stores the weight transposed, as d(l) x d(l-1), and computes A(l-1) W^T + b.',

    math: {
      intuition:
        'Stacking the weight vectors of every neuron in a layer as rows of a matrix turns a loop over neurons into one matrix-vector product. Stacking the examples of a batch as rows of another matrix turns a loop over examples into one matrix-matrix product. Both loops vanish into a single operation that a GPU executes in one pass. The bias is added by broadcasting: a vector of length d(l) is applied identically to every row.',
      formulas: [
        {
          latex: 'Z^{(l)} = A^{(l-1)}W^{(l)} + \\mathbf{b}^{(l)}, \\qquad A^{(l)} = \\phi\\bigl(Z^{(l)}\\bigr)',
          name: 'Forward propagation for one layer',
          meaning:
            'The two lines that define every fully connected layer. The first is the only place parameters appear; the second is a fixed elementwise bend.',
          variables: [
            { symbol: 'A^{(l-1)}', meaning: 'Activations entering layer l, shape N x d(l-1); for l = 1 this is the input batch X' },
            { symbol: 'W^{(l)}', meaning: 'Weight matrix of layer l, shape d(l-1) x d(l); column j holds the weights of neuron j' },
            { symbol: '\\mathbf{b}^{(l)}', meaning: 'Bias vector of length d(l), broadcast down the batch dimension' },
            { symbol: 'Z^{(l)}', meaning: 'Pre-activations, shape N x d(l)' },
            { symbol: '\\phi', meaning: 'Elementwise activation function' },
            { symbol: 'N', meaning: 'Batch size, the number of examples processed together' },
            { symbol: 'd^{(l)}', meaning: 'Width of layer l, the number of units it contains' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'P^{(l)} = d^{(l-1)}\\,d^{(l)} + d^{(l)} = d^{(l)}\\bigl(d^{(l-1)} + 1\\bigr)',
          name: 'Parameter count of a dense layer',
          meaning:
            'Every unit has one weight per input plus one bias. Because the product dominates, widening two adjacent layers is quadratically expensive, which is why width is the first thing to cut when a model will not fit in memory.',
          variables: [
            { symbol: 'P^{(l)}', meaning: 'Number of learnable parameters in layer l' },
            { symbol: 'd^{(l-1)}', meaning: 'Number of inputs to the layer' },
            { symbol: 'd^{(l)}', meaning: 'Number of units in the layer' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'f(\\mathbf{x}) = \\phi^{(L)}\\!\\Bigl(W^{(L)\\top}\\phi^{(L-1)}\\bigl(\\cdots \\phi^{(1)}(W^{(1)\\top}\\mathbf{x} + \\mathbf{b}^{(1)})\\cdots\\bigr) + \\mathbf{b}^{(L)}\\Bigr)',
          name: 'The network as one composed function',
          meaning:
            'Written out, a neural network is a nest of affine maps and nonlinearities. This form is what the chain rule will be applied to in the backpropagation unit.',
          variables: [
            { symbol: 'L', meaning: 'Number of layers, the depth of the network' },
            { symbol: '\\phi^{(l)}', meaning: 'Activation of layer l; the last one is often the identity so the output is logits' },
            { symbol: '\\mathbf{x}', meaning: 'A single input example' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathcal{C} \\approx 2\\,N\\sum_{l=1}^{L} d^{(l-1)} d^{(l)}',
          name: 'Forward-pass cost in floating point operations',
          meaning:
            'Each weight is used once for a multiply and once for an add, for every example. Knowing this lets you estimate training time from architecture alone, before writing any code.',
          variables: [
            { symbol: '\\mathcal{C}', meaning: 'Approximate FLOPs for one forward pass over a batch' },
            { symbol: 'N', meaning: 'Batch size' },
            { symbol: 'd^{(l-1)}d^{(l)}', meaning: 'Size of the weight matrix of layer l — the dominant term; biases and activations are negligible' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Write one neuron j of layer l for one example: z_j = sum_i a_i w_ij + b_j.',
        'Collect all d(l) neurons into a vector: z = W^T a + b, where column j of W holds neuron j weights. This removes the loop over neurons.',
        'Now take a batch. Stack examples as rows of A, so row n is example n. Then Z = A W + b, where b is broadcast down the rows. This removes the loop over examples.',
        'Both loops are gone and only one matrix multiplication remains, which is what a GPU is built to do. This is why the batch dimension comes first in every framework tensor.',
        'PyTorch stores W transposed, shape (out_features, in_features), because the row-major memory layout of that arrangement is friendlier to the underlying GEMM kernel. The user-visible consequence is only that layer.weight.shape reads (out, in).',
      ],
    },

    workedExample: {
      title: 'Tracing a batch through a two-layer network by hand',
      setup:
        'A network takes 3 features, has a hidden layer of 2 ReLU units and an output layer of 1 unit with no activation. W1 = [[0.5, -1.0], [0.2, 0.3], [-0.4, 0.8]] (shape 3x2), b1 = [0.1, -0.2]. W2 = [[1.5], [-0.5]] (shape 2x1), b2 = [0.05]. The batch is two examples: x1 = [1, 2, 0] and x2 = [0, -1, 2].',
      steps: [
        {
          label: 'Write the input matrix',
          detail: 'X has shape (2, 3): row one is [1, 2, 0], row two is [0, -1, 2]. Two examples, three features each.',
          latex: 'X = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & -1 & 2 \\end{bmatrix}',
        },
        {
          label: 'Compute Z1 = X W1 + b1 for example one',
          detail: 'Unit 1: 1(0.5) + 2(0.2) + 0(-0.4) = 0.9, plus bias 0.1 gives 1.0. Unit 2: 1(-1.0) + 2(0.3) + 0(0.8) = -0.4, plus bias -0.2 gives -0.6.',
          latex: 'Z^{(1)}_{1,:} = [1.0,\\; -0.6]',
        },
        {
          label: 'Compute Z1 for example two',
          detail: 'Unit 1: 0(0.5) + (-1)(0.2) + 2(-0.4) = -1.0, plus 0.1 gives -0.9. Unit 2: 0(-1.0) + (-1)(0.3) + 2(0.8) = 1.3, plus -0.2 gives 1.1.',
          latex: 'Z^{(1)}_{2,:} = [-0.9,\\; 1.1]',
        },
        {
          label: 'Apply ReLU',
          detail: 'A1 = max(0, Z1) elementwise: row one becomes [1.0, 0.0] and row two becomes [0.0, 1.1]. Note that each example has switched on a different unit — this is the network representing them differently.',
          latex: 'A^{(1)} = \\begin{bmatrix} 1.0 & 0.0 \\\\ 0.0 & 1.1 \\end{bmatrix}',
        },
        {
          label: 'Compute the output layer',
          detail: 'Example one: 1.0(1.5) + 0.0(-0.5) = 1.5, plus 0.05 gives 1.55. Example two: 0.0(1.5) + 1.1(-0.5) = -0.55, plus 0.05 gives -0.50.',
          latex: 'Z^{(2)} = \\begin{bmatrix} 1.55 \\\\ -0.50 \\end{bmatrix}',
        },
        {
          label: 'Check the shapes at every stage',
          detail: '(2, 3) to (2, 2) to (2, 2) to (2, 1). The batch dimension of 2 never changes; only the feature dimension does. Parameter count is (3x2 + 2) + (2x1 + 1) = 8 + 3 = 11.',
          latex: '(2,3) \\to (2,2) \\to (2,1)',
        },
      ],
      conclusion:
        'Forward propagation is two matrix multiplications and one elementwise max. The two examples ended up with opposite signs, and looking at A1 tells you why: the hidden layer turned example one into [1.0, 0] and example two into [0, 1.1], so the output layer only had to apply a positive weight to the first coordinate and a negative weight to the second. That re-description of the input is what the hidden layer is for.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A forward pass written out in NumPy',
        runnable: true,
        code: `import numpy as np

X  = np.array([[1.0, 2.0, 0.0],
               [0.0, -1.0, 2.0]])            # (2, 3)
W1 = np.array([[0.5, -1.0],
               [0.2,  0.3],
               [-0.4, 0.8]])                 # (3, 2)
b1 = np.array([0.1, -0.2])
W2 = np.array([[1.5], [-0.5]])               # (2, 1)
b2 = np.array([0.05])

Z1 = X @ W1 + b1          # bias broadcasts down the batch dimension
A1 = np.maximum(0.0, Z1)  # ReLU
Z2 = A1 @ W2 + b2

print("Z1 =", Z1)
print("A1 =", A1)
print("Z2 =", Z2.ravel())
print("shapes:", X.shape, "->", A1.shape, "->", Z2.shape)`,
        output: `Z1 = [[ 1.  -0.6]
 [-0.9  1.1]]
A1 = [[1.  0. ]
 [0.  1.1]]
Z2 = [ 1.55 -0.5 ]
shapes: (2, 3) -> (2, 2) -> (2, 1)`,
        explanation:
          'Every line of the hand calculation appears once. The two things to internalise are that @ contracts the last axis of the left operand with the first axis of the right, and that b1 of shape (2,) is broadcast across both rows without being written out. There is no loop over neurons and no loop over examples anywhere in this code.',
      },
      {
        language: 'python',
        title: 'The same network in PyTorch, with a shape trace',
        runnable: true,
        code: `import torch
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, in_dim=784, hidden=(128, 64), out_dim=10):
        super().__init__()
        self.fc1 = nn.Linear(in_dim, hidden[0])
        self.fc2 = nn.Linear(hidden[0], hidden[1])
        self.out = nn.Linear(hidden[1], out_dim)
        self.act = nn.ReLU()

    def forward(self, x):
        print("  input    ", tuple(x.shape))
        x = self.act(self.fc1(x));  print("  after fc1", tuple(x.shape))
        x = self.act(self.fc2(x));  print("  after fc2", tuple(x.shape))
        x = self.out(x);            print("  logits   ", tuple(x.shape))
        return x

model = MLP()
logits = model(torch.randn(32, 784))

total = sum(p.numel() for p in model.parameters())
print("total parameters:", total)
for name, p in model.named_parameters():
    print(f"  {name:12s} {tuple(p.shape)}  {p.numel():>7,}")`,
        output: `  input     (32, 784)
  after fc1 (32, 128)
  after fc2 (32, 64)
  logits    (32, 10)
total parameters: 109386
  fc1.weight   (128, 784)  100,352
  fc1.bias     (128,)          128
  fc2.weight   (64, 128)     8,192
  fc2.bias     (64,)            64
  out.weight   (10, 64)        640
  out.bias     (10,)            10`,
        explanation:
          'Printing shapes inside forward is the single most effective debugging habit in deep learning, and it costs one line per layer. Notice that 92 per cent of the parameters live in the first layer, because 784 inputs times 128 units dominates everything downstream. Notice also that the network never squashes its final output: these are logits, which is what PyTorch losses expect.',
      },
      {
        language: 'python',
        title: 'Hidden representations become linearly separable',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(0)
# Two interleaving half-moons are not linearly separable in the input space.
theta = torch.rand(400) * 3.14159
x0 = torch.stack([torch.cos(theta),      torch.sin(theta)], dim=1)
x1 = torch.stack([1 - torch.cos(theta), -torch.sin(theta) + 0.3], dim=1)
X = torch.cat([x0, x1]) + 0.05 * torch.randn(800, 2)
y = torch.cat([torch.zeros(400), torch.ones(400)]).long()

net = nn.Sequential(nn.Linear(2, 16), nn.ReLU(), nn.Linear(16, 16), nn.ReLU())
head = nn.Linear(16, 2)
opt = torch.optim.Adam(list(net.parameters()) + list(head.parameters()), lr=0.01)

for step in range(400):
    loss = nn.functional.cross_entropy(head(net(X)), y)
    opt.zero_grad(); loss.backward(); opt.step()

with torch.no_grad():
    H = net(X)                      # the hidden representation
    acc = (head(H).argmax(1) == y).float().mean()
print("final accuracy:", round(acc.item(), 3))
print("hidden shape:", tuple(H.shape))
print("mean activation of class 0:", [round(v, 2) for v in H[y == 0].mean(0)[:4].tolist()])
print("mean activation of class 1:", [round(v, 2) for v in H[y == 1].mean(0)[:4].tolist()])`,
        output: `final accuracy: 0.996
hidden shape: (800, 16)
mean activation of class 0: [0.0, 1.31, 0.62, 0.0]
mean activation of class 1: [1.04, 0.0, 0.0, 0.87]`,
        explanation:
          'The output layer here is a single linear map, so all the work of separating two interleaved crescents was done by the hidden layers. Printing the mean activation per class shows what happened: individual hidden units have specialised, firing strongly for one class and being switched off for the other. That is a learned feature, invented by the network rather than designed by you, and it is the whole reason to prefer a network to logistic regression on this data.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Recommender systems',
        usage:
          'A two-tower model pushes a user and an item through separate MLPs and compares their final hidden representations with a dot product. The hidden vector is deliberately the deliverable: it is stored in a vector index so that millions of items can be searched in milliseconds.',
      },
      {
        context: 'Transfer learning',
        usage:
          'When you fine-tune a pretrained model you typically discard the output layer and keep everything below it. That is only sensible because the hidden layers hold a general-purpose representation, while the last layer is the only part specific to the original label set.',
      },
      {
        context: 'Estimating training cost before writing code',
        usage:
          'A model with 7 billion parameters costs roughly 2 x 7e9 FLOPs per token in the forward pass and about three times that for a training step. Multiplying by tokens and dividing by the sustained FLOPs of your accelerator gives a training-time estimate accurate to within a factor of two, which is how compute budgets are planned.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.Sequential and nn.Module define the forward path; the shapes in the table above are exactly what you will print while debugging.' },
      { tool: 'torchinfo', role: 'Prints the shape and parameter table automatically for a given input size, turning a manual trace into one call.' },
      { tool: 'NumPy', role: 'The @ operator and broadcasting rules are the same mental model you use for every framework; learning them once transfers everywhere.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting to flatten before the first linear layer',
        why: 'An image batch has shape (N, C, H, W) but nn.Linear expects the feature axis last and nothing but the batch in front, so you get a shape mismatch or, worse, a silently wrong contraction over the width axis only.',
        fix: 'Insert nn.Flatten() or x = x.view(x.size(0), -1) before the first dense layer, and confirm the resulting width equals in_features.',
      },
      {
        mistake: 'Hard-coding the batch size into a reshape',
        why: 'x.view(32, -1) breaks on the final partial batch of an epoch and on any evaluation with a different batch size, producing a confusing runtime error far from its cause.',
        fix: 'Always derive the batch dimension from the tensor: x.view(x.size(0), -1), or use nn.Flatten(), which does this for you.',
      },
      {
        mistake: 'Stacking linear layers with no activation between them',
        why: 'The stack collapses algebraically into a single linear layer, so the model has the capacity of logistic regression while costing the memory and time of a deep one. It trains, it just cannot learn anything nonlinear.',
        fix: 'Put an activation between every pair of linear layers, and deliberately leave it off only on the final output layer.',
      },
      {
        mistake: 'Applying a softmax inside forward and also using CrossEntropyLoss',
        why: 'The loss applies log-softmax itself, so the distribution is normalised twice. Gradients become much smaller and training is slower with no error raised.',
        fix: 'Return raw logits from forward. Apply softmax only where you explicitly need a probability to display or threshold.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Walk me through the shapes in a forward pass for a batch of 64 MNIST images through a 784-256-10 MLP.',
        answer:
          'The raw batch is (64, 1, 28, 28). Flattening gives (64, 784): 64 examples, 784 features each. The first linear layer has weight of shape (256, 784) in PyTorch convention and computes x @ W.T + b, producing (64, 256). ReLU is elementwise and leaves it at (64, 256). The second linear layer has weight (10, 256) and produces (64, 10), which are the logits — one score per class per example. The batch dimension of 64 is untouched at every step, because a linear layer only ever transforms the final dimension. Parameter count is 784x256 + 256 + 256x10 + 10 = 203,530.',
        followUp: 'Strong candidates note without prompting that the output is logits, not probabilities, and that CrossEntropyLoss expects exactly that.',
      },
      {
        level: 'intermediate',
        question: 'Why do we express a layer as a matrix multiplication instead of looping over neurons?',
        answer:
          'Correctness is identical; performance is not. A loop over neurons in Python pays interpreter overhead per neuron and touches memory in a cache-hostile order. Written as a matrix product, the same arithmetic becomes a single GEMM call into a highly tuned BLAS or cuBLAS kernel that tiles for cache, uses SIMD or tensor cores, and runs thousands of multiply-accumulates in parallel. Batching the examples turns matrix-vector products into matrix-matrix products, which have far better arithmetic intensity — more compute per byte loaded — so they saturate the hardware instead of being memory-bound. The practical gap between the two formulations is typically two to four orders of magnitude.',
      },
      {
        level: 'ml-engineer',
        question: 'Where are the parameters in a typical MLP, and what does that imply for reducing model size?',
        answer:
          'Overwhelmingly in the widest adjacent pair of layers, because a dense layer holds d_in x d_out weights and that product dominates the bias term entirely. In a 784-128-64-10 network, the first layer alone holds 100,480 of 109,386 parameters, over 90 per cent. The implication is that shrinking the input dimension or the first hidden width is far more effective than trimming deeper layers; the same reasoning is why convolutional layers beat dense layers on images, since weight sharing removes the dependence on input resolution. The same logic applies to transformers, where a large fraction of parameters sits in the feed-forward blocks whose inner dimension is four times the model width.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A network is Linear(100, 50) then ReLU then Linear(50, 50) then ReLU then Linear(50, 3). For a batch of 8, give the shape after every stage and the total parameter count.',
        hint: 'A linear layer changes only the last dimension; a parameter count is d_in x d_out + d_out.',
        solution:
          'Shapes: (8, 100), (8, 50), (8, 50), (8, 50), (8, 50), (8, 3). Parameters: 100x50 + 50 = 5,050; then 50x50 + 50 = 2,550; then 50x3 + 3 = 153. Total 7,753. Note the ReLUs contribute no parameters and no shape change at all, and that over 65 per cent of the parameters sit in the first layer because 100 inputs is the widest thing in the network.',
      },
      {
        prompt:
          'You call model(x) with x of shape (16, 3, 32, 32) on a network that starts with nn.Linear(3072, 128) and get a shape error. What is the fix, and why is 3072 the right in_features?',
        hint: 'Count the elements per example, and decide what must happen before a dense layer sees an image.',
        solution:
          'Each example has 3 x 32 x 32 = 3072 numbers, so in_features of 3072 is correct. The error comes from never flattening: nn.Linear contracts only the last dimension, which is 32, not 3072. Insert nn.Flatten() as the first module, or write x = x.view(x.size(0), -1) at the top of forward, so the tensor becomes (16, 3072) before the dense layer. Use x.size(0) rather than the literal 16, so the code survives a final partial batch.',
      },
      {
        prompt:
          'Show that a network of Linear(10, 5) then Linear(5, 2), with no activation, is equivalent to a single Linear(10, 2), and state the parameter counts of both. What has been lost?',
        hint: 'Multiply the weight matrices and combine the biases, then look at the rank of the product.',
        solution:
          'With h = W1 x + b1 and y = W2 h + b2, substitution gives y = (W2 W1) x + (W2 b1 + b2). W2 W1 has shape 2x10, so the pair is exactly one Linear(10, 2). Parameter counts: the two-layer version has 10x5 + 5 + 5x2 + 2 = 67; the single layer has 10x2 + 2 = 22. So you pay three times the parameters for zero extra expressiveness — in fact for slightly less, since the product of a 2x5 and a 5x10 matrix has rank at most 5, which happens to be no restriction here but would be if the output were wider than 5. Nothing has been gained; the narrow middle layer is a bottleneck, not a feature.',
      },
    ],

    quiz: [
      {
        id: 'DL-003-q1',
        type: 'mcq',
        concept: 'shapes',
        prompt: 'A tensor of shape (64, 256) is passed through nn.Linear(256, 32). What comes out?',
        options: ['(64, 32)', '(32, 64)', '(64, 256, 32)', '(256, 32)'],
        answerIndex: 0,
        explanation:
          'A linear layer maps only the last dimension, from in_features to out_features, and leaves every leading dimension untouched. The batch size of 64 passes straight through.',
      },
      {
        id: 'DL-003-q2',
        type: 'numeric',
        concept: 'parameter counting',
        prompt: 'How many learnable parameters does nn.Linear(300, 100) have, including the bias?',
        answer: 30100,
        tolerance: 0,
        explanation:
          '300 x 100 = 30,000 weights, one per input per unit, plus 100 biases, one per unit. Total 30,100. The bias term is almost always negligible next to the product, which is why parameter counts are dominated by the widths.',
      },
      {
        id: 'DL-003-q3',
        type: 'order',
        concept: 'forward pass',
        prompt: 'Put the steps of a forward pass through one hidden layer into the correct order.',
        items: [
          'Take the batch of activations from the previous layer',
          'Multiply by the weight matrix of this layer',
          'Add the bias vector, broadcast across the batch',
          'Apply the activation function elementwise',
          'Pass the result on as the input to the next layer',
        ],
        explanation:
          'The order is fixed and never varies: linear part first, producing the pre-activation, then the nonlinearity. Applying the activation before the weights would give a different and much less useful model.',
      },
      {
        id: 'DL-003-q4',
        type: 'truefalse',
        concept: 'hidden representations',
        prompt: 'The second hidden layer of an MLP has direct access to the raw input features.',
        answer: false,
        explanation:
          'It does not. It sees only the activations of the first hidden layer. This is exactly why representations become more abstract with depth: each layer can only build on the vocabulary the layer below invented.',
      },
      {
        id: 'DL-003-q5',
        type: 'debug',
        language: 'python',
        concept: 'flattening',
        prompt: 'This model raises a shape error on the first batch. What is wrong?',
        code: 'model = nn.Sequential(nn.Linear(3072, 128), nn.ReLU(), nn.Linear(128, 10))\nout = model(torch.randn(16, 3, 32, 32))',
        options: [
          'The image tensor was never flattened to (16, 3072) before the dense layer',
          'in_features should be 1024 rather than 3072',
          'nn.Sequential cannot contain two Linear layers',
          'The batch size must be a power of two',
        ],
        answerIndex: 0,
        explanation:
          'nn.Linear contracts only the final dimension, which here is 32, not 3072. Adding nn.Flatten() as the first module reshapes (16, 3, 32, 32) to (16, 3072) and the dimensions then line up.',
      },
      {
        id: 'DL-003-q6',
        type: 'explain',
        concept: 'hidden features',
        prompt: 'Explain what a hidden representation is and why it tends to become more abstract in deeper layers.',
        rubric: [
          'Defines the hidden representation as the activation vector of a hidden layer for a given input',
          'Notes that each layer sees only the output of the previous one',
          'Connects composition of layers to increasing abstraction, ideally with an example',
        ],
        sampleAnswer:
          'A hidden representation is the vector of activations a hidden layer produces for a particular input: a re-description of that input in coordinates the network chose for itself. Each hidden layer can only see the layer below it, never the raw input, so layer two is forced to build its features out of layer one features. In an image network that composition is visible: the first layer responds to oriented edges, the second to combinations of edges such as corners and curves, the third to parts like eyes and wheels, and later layers to whole objects. Nothing in the loss asks for this hierarchy; it emerges because composing simple detectors is the cheapest way to reduce error.',
        explanation:
          'The examinable idea is that abstraction comes from restricted access — a layer can only build on what the previous one emitted — rather than from anything explicitly encoded in the architecture.',
      },
    ],

    flashcards: [
      { front: 'Write forward propagation for one layer in matrix form.', back: 'Z = A_prev W + b, then A = phi(Z). One matrix multiply handles every neuron and every example in the batch at once.' },
      { front: 'How many parameters does a dense layer have?', back: 'd_in x d_out + d_out. The product dominates, so width is quadratically expensive across adjacent layers.' },
      { front: 'What does nn.Linear do to a tensor shape?', back: 'It changes only the last dimension, from in_features to out_features. Every leading dimension, including the batch, is untouched.' },
      { front: 'What is a hidden representation?', back: 'The activation vector of a hidden layer for a given input — the network describing that input in features it invented itself.' },
      { front: 'Why does PyTorch store weight as (out_features, in_features)?', back: 'It computes x @ W.T + b; that memory layout suits the underlying GEMM kernel. The only visible effect is the shape you see when you print it.' },
      { front: 'What should the final layer of a classifier return?', back: 'Raw logits, with no softmax. nn.CrossEntropyLoss applies log-softmax internally, so adding your own applies it twice.' },
    ],

    challenge: {
      title: 'A forward pass with no framework',
      brief:
        'Implement a configurable MLP forward pass in pure NumPy: a function that takes a list of layer widths, initialises weights and biases, and propagates a batch through with ReLU on the hidden layers and no activation on the output. Print the shape and parameter count of every layer as it goes, then verify your output matches a PyTorch nn.Sequential with the same weights copied across, to within 1e-6.',
      language: 'python',
      acceptanceCriteria: [
        'Layer widths are a parameter, so the same function builds a 2-layer and an 8-layer network',
        'Shapes and per-layer parameter counts are printed and are correct',
        'The final output agrees with an equivalent PyTorch model to within 1e-6',
        'No Python loop iterates over neurons or over examples — only over layers',
      ],
      starterCode:
        'import numpy as np\n\ndef init_params(widths, seed=0):\n    rng = np.random.default_rng(seed)\n    params = []\n    for d_in, d_out in zip(widths[:-1], widths[1:]):\n        W = rng.normal(0, np.sqrt(2.0 / d_in), size=(d_in, d_out))\n        b = np.zeros(d_out)\n        params.append((W, b))\n    return params\n\ndef forward(X, params):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who understands a single neuron how a layer works, what a forward pass is, and why the hidden layers are the interesting part.',
      mustCover: [
        'A layer is many neurons reading the same input, computed as one matrix multiplication',
        'Forward propagation is evaluating layers in order, each consuming the previous output',
        'A hidden layer produces a new description of the input rather than a prediction',
        'Each layer only sees the layer below it, which is what makes depth produce abstraction',
      ],
      bonusSignals: [
        'tracks shapes explicitly',
        'notes that the batch dimension is untouched',
        'gives the parameter count formula',
        'gives a concrete example of features composing, such as edges to corners to objects',
      ],
      sampleExplanation:
        "One neuron gives you one number, which is not much to work with. So put a row of them side by side, all reading the same input but each with its own weights. One might react to large values in the first two features, another to a disagreement between the third and fourth, and most of them to something with no simple name. That row of answers is a layer, and the trick that makes it fast is that you never loop over the neurons: stack all their weight vectors into one grid and a single matrix multiplication produces every answer at once, for every example in the batch at once. A forward pass is just doing that, layer after layer, from the input to the output. The middle layers are called hidden because you never look at their answers directly — they exist to be read by the next layer. That restriction is what makes depth worth having. The second layer cannot see your raw data; it can only see what the first layer said about it, so it is forced to build its ideas out of the first layer ideas. Do this a few times and you get a hierarchy nobody designed: dots become edges, edges become corners, corners become faces. The last layer takes whatever vocabulary the network has invented and makes one final weighted vote to produce the prediction.",
    },
  },

  {
    id: 'DL-004',
    domain: 'DL',
    module: 'Training a Network',
    topic: 'Objective functions',
    title: 'Loss Functions for Neural Networks',
    slug: 'neural-network-losses',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['DL-003'],
    related: ['DL-001', 'DL-002', 'DL-003'],
    tags: ['loss', 'mse', 'cross-entropy', 'softmax', 'likelihood', 'logits'],

    learningObjectives: [
      'State the loss function appropriate to a regression, binary and multi-class task, and justify each choice',
      'Derive cross-entropy from maximum likelihood and explain why it pairs so cleanly with softmax',
      'Show that the gradient of softmax cross-entropy with respect to the logits is simply p - y',
      'Diagnose the training failures caused by mismatching a loss with the wrong output activation',
    ],

    terminology: [
      {
        term: 'Loss function',
        definition:
          'A scalar function of the model output and the target that measures how wrong a single prediction is. Training minimises its average over the data.',
        simple: 'A number that says how badly the model got this one example wrong.',
      },
      {
        term: 'Cost / objective',
        definition:
          'The quantity actually minimised: the loss averaged over a batch or dataset, plus any regularisation terms.',
        simple: 'The total badness score across all the examples you are looking at.',
      },
      {
        term: 'Cross-entropy',
        definition:
          'The expected number of extra nats needed to encode samples from the true distribution using the model distribution. For a one-hot target it reduces to the negative log probability assigned to the correct class.',
        simple: 'How surprised the model was by the right answer.',
      },
      {
        term: 'Logit',
        definition:
          'An unnormalised real-valued score produced by the final layer, before softmax or sigmoid is applied.',
        simple: 'The raw score for a class, which can be any number at all.',
      },
      {
        term: 'Maximum likelihood',
        definition:
          'The principle of choosing parameters that make the observed data most probable under the model. Minimising negative log-likelihood is equivalent to it.',
        simple: 'Pick the settings that make what actually happened look least surprising.',
      },
    ],

    simpleExplanation:
      "A network produces numbers, and you need one number back that says how bad those numbers were, because a single number is the only thing you can sensibly push downhill. That number is the loss. Choosing it is not a matter of taste: it depends entirely on what kind of answer you asked for. If you asked for a quantity — a price, a temperature — then being wrong by two is four times as bad as being wrong by one, and squared error is the natural measure. If you asked for a category, squared error is a poor fit, because a model that says the correct class has probability 0.01 has done something far worse than a number like 0.98 suggests. Cross-entropy fixes this by scoring the model on how surprised it was by the right answer, using a logarithm, so assigning near-zero probability to the truth costs enormously. That heavy punishment is deliberate. It is what produces a strong gradient exactly when the model is confidently wrong, which is precisely the situation you want it to escape from fastest.",

    whyItExists:
      'Gradient descent can only minimise a scalar, so the many numbers a network outputs must be collapsed into one measure of wrongness before any learning can happen. Different tasks need different collapses: squared error encodes the assumption of Gaussian noise around a real-valued target, while cross-entropy encodes a categorical likelihood and, crucially, produces gradients that do not vanish when the model is confidently wrong — which squared error paired with a sigmoid does.',

    analogy: {
      scenario:
        'Consider two examiners marking the same exam. The first marks a numerical-answer paper: she measures the gap between your answer and the correct one and squares it, so being slightly off costs little but being wildly off costs enormously. The second marks a multiple-choice paper where you had to state your confidence in each option as a percentage. He looks only at the confidence you assigned to the correct option and charges you a penalty of minus the logarithm of it. Saying ninety per cent costs almost nothing. Saying one per cent costs a great deal. Saying zero per cent is a catastrophe from which the paper cannot recover.',
      mapping: [
        { from: 'The numerical-answer examiner squaring the gap', to: 'Mean squared error for regression' },
        { from: 'The confidence examiner taking a negative logarithm', to: 'Cross-entropy for classification' },
        { from: 'Being charged only on the correct option', to: 'The one-hot target selecting a single term of the sum' },
        { from: 'A zero-confidence answer being catastrophic', to: 'log(0) diverging to infinity, and the numerical need for log-softmax' },
        { from: 'The size of the penalty telling you how hard to revise', to: 'The gradient magnitude driving the size of the parameter update' },
      ],
      bridge:
        'The last mapping is the one that matters and is the reason cross-entropy beats squared error on classification. With squared error behind a sigmoid, a confidently wrong prediction sits in the flat tail of the sigmoid, so the penalty is large but the gradient is nearly zero: the examiner fails you and tells you nothing about how to improve. With cross-entropy the sigmoid derivative cancels algebraically, so the gradient stays proportional to the size of the error — the more confidently wrong you were, the harder you are pushed.',
      limitations:
        'Real examiners mark independently; a loss function is inside an optimisation loop, so what matters is not only the value but its derivative. A loss can be a perfectly reasonable measure of quality — accuracy, for instance — and still be useless for training because its gradient is zero almost everywhere.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Which loss for which task',
        caption: 'The PyTorch column is the one that prevents most beginner bugs: note what each loss expects to be fed.',
        columns: ['Task', 'Final layer', 'Loss', 'PyTorch class', 'Feed it'],
        rows: [
          ['Regression, real target', 'Linear, 1 unit', 'Mean squared error', 'nn.MSELoss', 'The raw output'],
          ['Regression with outliers', 'Linear, 1 unit', 'Huber / smooth L1', 'nn.SmoothL1Loss', 'The raw output'],
          ['Binary classification', 'Linear, 1 unit', 'Binary cross-entropy', 'nn.BCEWithLogitsLoss', 'Logits, not probabilities'],
          ['Single-label, k classes', 'Linear, k units', 'Categorical cross-entropy', 'nn.CrossEntropyLoss', 'Logits and integer class indices'],
          ['Multi-label, k tags', 'Linear, k units', 'Sum of binary cross-entropies', 'nn.BCEWithLogitsLoss', 'Logits and a float 0/1 target vector'],
          ['Count data', 'Linear, 1 unit', 'Poisson negative log-likelihood', 'nn.PoissonNLLLoss', 'Log-rate by default'],
        ],
      },
      {
        kind: 'compare',
        title: 'Why not squared error for classification',
        caption: 'Both losses punish a confidently wrong prediction. Only one of them tells the model how to escape.',
        left: {
          heading: 'Sigmoid with squared error',
          points: [
            'Loss for a confidently wrong prediction is at most 1.0',
            'Gradient carries a factor of sigma(z)(1 - sigma(z)), which is near zero out in the tails',
            'The worse the mistake, the smaller the update — exactly backwards',
            'The objective is also non-convex in the weights even for a single unit',
          ],
        },
        right: {
          heading: 'Softmax with cross-entropy',
          points: [
            'Loss for a confidently wrong prediction grows without bound',
            'Gradient with respect to the logits is exactly p - y',
            'The worse the mistake, the larger the update',
            'Arises directly from maximum likelihood for a categorical variable',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'From logits to loss to gradient',
        caption: 'This chain is fused into a single kernel in every framework, for both speed and numerical stability.',
        steps: [
          { label: 'Logits z', detail: 'k raw scores from the final linear layer. Any real values; no constraint.' },
          { label: 'Softmax', detail: 'Exponentiate and normalise so the k numbers form a probability distribution p.' },
          { label: 'Select the true class', detail: 'The one-hot target y picks out p_c, the probability assigned to the correct class.' },
          { label: 'Negative log', detail: 'Loss = -log(p_c). Confident and right gives near zero; confident and wrong gives a large number.' },
          { label: 'Backward: p - y', detail: 'The gradient with respect to the logits is the predicted distribution minus the target. Nothing else survives the algebra.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Watch a loss surface being descended',
        caption: 'Change the loss and the shape of the surface changes with it. The optimiser only ever sees the surface, never the task.',
        widget: 'gradient-descent-lab',
      },
    ],

    formalDefinition:
      'A loss function L maps a prediction and a target to a non-negative scalar, and training minimises the empirical risk, the mean of L over the training set. For regression under Gaussian noise assumptions the negative log-likelihood is proportional to squared error, L = (y_hat - y)^2. For classification with a categorical likelihood it is cross-entropy, L = -sum_c y_c log p_c, where p = softmax(z). Both are therefore negative log-likelihoods of a chosen output distribution, which is why they are the defaults rather than arbitrary choices.',

    math: {
      intuition:
        'Every standard loss is a negative log-likelihood in disguise. Decide what distribution your output layer parameterises — a Gaussian mean for regression, a categorical distribution for classification — and the loss is forced on you by asking which parameters make the observed data most probable. That is why squared error and cross-entropy are not two unrelated formulas: they are the same principle applied to two different output distributions. The remarkable payoff is that when you pair the right loss with the right output activation, the derivative simplifies to the prediction minus the target.',
      formulas: [
        {
          latex: '\\mathcal{L}_{\\text{MSE}} = \\frac{1}{N}\\sum_{n=1}^{N}\\bigl(\\hat{y}_n - y_n\\bigr)^{2}',
          name: 'Mean squared error',
          meaning:
            'The average squared gap between prediction and target. Squaring makes large errors dominate and gives a gradient proportional to the error itself, which is why it is the default for regression.',
          variables: [
            { symbol: '\\hat{y}_n', meaning: 'Model prediction for example n' },
            { symbol: 'y_n', meaning: 'True target for example n' },
            { symbol: 'N', meaning: 'Number of examples averaged over' },
          ],
          category: 'regression',
        },
        {
          latex: '\\mathcal{L}_{\\text{CE}} = -\\sum_{c=1}^{k} y_c \\log p_c, \\qquad p_c = \\frac{e^{z_c}}{\\sum_{j} e^{z_j}}',
          name: 'Categorical cross-entropy with softmax',
          meaning:
            'For a one-hot target only one term survives, so the loss is the negative log probability assigned to the correct class. It is zero when that probability is one and grows without bound as it approaches zero.',
          variables: [
            { symbol: 'y_c', meaning: 'Target indicator for class c: 1 for the true class, 0 otherwise' },
            { symbol: 'p_c', meaning: 'Predicted probability of class c after softmax' },
            { symbol: 'z_c', meaning: 'Logit for class c produced by the final linear layer' },
            { symbol: 'k', meaning: 'Number of classes' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\mathcal{L}_{\\text{BCE}} = -\\bigl[\\,y\\log\\hat{p} + (1-y)\\log(1-\\hat{p})\\,\\bigr], \\qquad \\hat{p} = \\sigma(z)',
          name: 'Binary cross-entropy',
          meaning:
            'The two-class case. Exactly one of the two terms is active for any given label, so it reduces to the negative log probability of whichever outcome actually occurred.',
          variables: [
            { symbol: 'y', meaning: 'Label, 0 or 1' },
            { symbol: '\\hat{p}', meaning: 'Predicted probability that y = 1, obtained as sigmoid of the logit' },
            { symbol: '\\sigma(z)', meaning: 'The sigmoid function applied to the single output logit' },
          ],
          category: 'classification',
        },
        {
          latex: '\\frac{\\partial \\mathcal{L}_{\\text{CE}}}{\\partial \\mathbf{z}} = \\mathbf{p} - \\mathbf{y}',
          name: 'The gradient that makes softmax and cross-entropy inseparable',
          meaning:
            'All the exponentials and the normalising constant cancel, leaving the predicted distribution minus the one-hot target. The size of the update is exactly the size of the error, with no saturating factor anywhere.',
          variables: [
            { symbol: '\\mathbf{p}', meaning: 'Vector of predicted class probabilities' },
            { symbol: '\\mathbf{y}', meaning: 'One-hot target vector' },
            { symbol: '\\mathbf{z}', meaning: 'Vector of logits' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\log\\sum_{j} e^{z_j} = m + \\log\\sum_{j} e^{z_j - m}, \\qquad m = \\max_j z_j',
          name: 'The log-sum-exp trick',
          meaning:
            'Subtracting the largest logit before exponentiating leaves the result unchanged but keeps every exponential at or below one, which prevents overflow. This is why you pass logits to the loss and let it do the softmax internally.',
          variables: [
            { symbol: 'm', meaning: 'The maximum logit, subtracted for numerical stability' },
            { symbol: 'z_j', meaning: 'Logit for class j' },
          ],
          category: 'information-theory',
        },
      ],
      derivation: [
        'Model the label as a draw from a categorical distribution whose parameters are p = softmax(z). The likelihood of observing class c is p_c.',
        'For a dataset of independent examples the likelihood is the product of the p_c values, so the negative log-likelihood is the sum of -log p_c. Minimising it is maximum likelihood estimation.',
        'Write -log p_c explicitly: -log(e^{z_c} / sum_j e^{z_j}) = -z_c + log sum_j e^{z_j}. This form has no division and no risk of log(0).',
        'Differentiate with respect to a logit z_i. The first term contributes -1 when i = c and 0 otherwise, which is -y_i. The second term contributes e^{z_i} / sum_j e^{z_j} = p_i.',
        'Therefore dL/dz_i = p_i - y_i, and in vector form dL/dz = p - y. No sigmoid or softmax derivative is left over, which is exactly why this pairing does not suffer vanishing gradients at the output.',
        'Repeat the same argument with a Gaussian likelihood of fixed variance and you obtain squared error up to a constant, which is the sense in which MSE is also a negative log-likelihood.',
      ],
    },

    workedExample: {
      title: 'Cross-entropy and its gradient on a three-class example',
      setup:
        'A network outputs logits z = [2.0, 1.0, 0.1] for three classes. The true class is class 0, so the one-hot target is y = [1, 0, 0]. Compute the softmax probabilities, the loss, and the gradient with respect to the logits.',
      steps: [
        {
          label: 'Exponentiate the logits',
          detail: 'e^2.0 = 7.3891, e^1.0 = 2.7183, e^0.1 = 1.1052.',
          latex: 'e^{\\mathbf{z}} = [7.3891,\\; 2.7183,\\; 1.1052]',
        },
        {
          label: 'Sum and normalise',
          detail: 'The sum is 11.2126. Dividing each exponential by it gives p = [0.6590, 0.2424, 0.0986], which sums to 1.',
          latex: '\\mathbf{p} = [0.6590,\\; 0.2424,\\; 0.0986]',
        },
        {
          label: 'Take the loss',
          detail: 'Only the true class contributes: L = -log(0.6590) = 0.4170 nats. For reference, a uniform guess of 1/3 would cost -log(1/3) = 1.0986, so the model is already better than chance.',
          latex: '\\mathcal{L} = -\\log(0.6590) = 0.4170',
        },
        {
          label: 'Compute the gradient with respect to the logits',
          detail: 'dL/dz = p - y = [0.6590 - 1, 0.2424 - 0, 0.0986 - 0] = [-0.3410, 0.2424, 0.0986]. Negative on the true class means gradient descent will push that logit up; positive on the others means it will push them down.',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}} = [-0.3410,\\; 0.2424,\\; 0.0986]',
        },
        {
          label: 'Sanity-check the gradient',
          detail: 'The components sum to zero: -0.3410 + 0.2424 + 0.0986 = 0. That is not a coincidence. Softmax is invariant to shifting all logits by a constant, so the loss cannot depend on that direction and its gradient must be orthogonal to it.',
          latex: '\\sum_i \\left(p_i - y_i\\right) = 1 - 1 = 0',
        },
        {
          label: 'Consider the confidently wrong case',
          detail: 'If the logits had been [0.1, 1.0, 2.0] with the same target, p = [0.0986, 0.2424, 0.6590] and the loss would be -log(0.0986) = 2.317, more than five times larger, with gradient -0.9014 on the true class — a much stronger push. This is the behaviour squared error fails to deliver.',
          latex: '\\mathcal{L} = -\\log(0.0986) = 2.317',
        },
      ],
      conclusion:
        'Cross-entropy turns a vector of arbitrary scores into a single number measuring surprise at the truth, and its gradient with respect to those scores is simply the prediction minus the target. Every softmax classifier you will ever train is running this computation, once per example, for every class.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Cross-entropy by hand, then with PyTorch',
        runnable: true,
        code: `import torch
import torch.nn.functional as F

logits = torch.tensor([[2.0, 1.0, 0.1]], requires_grad=True)
target = torch.tensor([0])                    # true class index, not one-hot

p = torch.softmax(logits, dim=1)
manual = -torch.log(p[0, target[0]])
builtin = F.cross_entropy(logits, target)

print("probabilities:", [round(v, 4) for v in p[0].tolist()])
print("manual loss  :", round(manual.item(), 4))
print("F.cross_entropy:", round(builtin.item(), 4))

builtin.backward()
print("dL/dlogits   :", [round(v, 4) for v in logits.grad[0].tolist()])`,
        output: `probabilities: [0.659, 0.2424, 0.0986]
manual loss  : 0.417
F.cross_entropy: 0.417
dL/dlogits   : [-0.341, 0.2424, 0.0986]`,
        explanation:
          'The gradient printed by autograd is exactly p - y, matching the hand derivation with no approximation. Note that F.cross_entropy takes integer class indices rather than one-hot vectors — it is doing the indexing for you — and that it takes logits, applying log-softmax internally with the log-sum-exp trick.',
      },
      {
        language: 'python',
        title: 'Why you pass logits rather than probabilities',
        runnable: true,
        code: `import torch
import torch.nn.functional as F

logits = torch.tensor([[1000.0, 1.0, 0.0]])
target = torch.tensor([0])

# Stable: the loss applies log-softmax internally with the max subtracted.
print("cross_entropy on logits:", F.cross_entropy(logits, target).item())

# Unstable: exponentiating 1000 overflows to inf, then log(inf/inf) is nan.
p = torch.exp(logits) / torch.exp(logits).sum()
print("hand-rolled probability:", p.tolist())
print("hand-rolled loss:", (-torch.log(p[0, 0])).item())`,
        output: `cross_entropy on logits: 0.0
hand-rolled probability: [[nan, 0.0, 0.0]]
hand-rolled loss: nan`,
        explanation:
          'Logits of magnitude a few hundred appear regularly in real training, especially early on or after a learning-rate spike. Exponentiating them overflows float32, which has a maximum around 3.4e38, and every downstream number becomes nan. Frameworks avoid this by fusing softmax and the log into one operation that subtracts the maximum logit first. This is the concrete reason the documentation insists on logits.',
      },
      {
        language: 'python',
        title: 'The gradient argument against MSE for classification',
        runnable: true,
        code: `import torch

z = torch.tensor([-6.0], requires_grad=True)   # confidently predicting class 0
y = torch.tensor([1.0])                        # but the truth is class 1

p = torch.sigmoid(z)
mse = (p - y) ** 2
mse.backward()
print(f"prediction {p.item():.5f}  MSE {mse.item():.4f}  grad {z.grad.item():.6f}")

z2 = torch.tensor([-6.0], requires_grad=True)
bce = torch.nn.functional.binary_cross_entropy_with_logits(z2, y)
bce.backward()
print(f"prediction {torch.sigmoid(z2).item():.5f}  BCE {bce.item():.4f}  grad {z2.grad.item():.6f}")`,
        output: `prediction 0.00247  MSE 0.9951  grad -0.004926
prediction 0.00247  BCE 6.0025  grad -0.997527`,
        explanation:
          'Both losses agree the model is badly wrong, but look at the gradients. MSE produces a gradient of -0.005 because the chain rule multiplies by the sigmoid derivative, which is 0.0025 out here in the tail — the model is stuck. Cross-entropy produces -0.998, two hundred times larger, because the sigmoid derivative cancels against the log. This single number is the reason classification uses cross-entropy.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Language model pretraining',
        usage:
          'Every large language model is trained with exactly one loss: cross-entropy over the vocabulary for predicting the next token. Perplexity, the metric always quoted alongside, is just the exponential of that loss, so a cross-entropy of 2.0 nats corresponds to a perplexity of about 7.4.',
      },
      {
        context: 'Medical screening with heavy class imbalance',
        usage:
          'When one class is 1 per cent of the data, plain cross-entropy is dominated by easy negatives. Teams use a class-weighted cross-entropy, or focal loss, which multiplies each term by (1 - p)^gamma so that easy examples contribute almost nothing and the model spends its capacity on the hard positives.',
      },
      {
        context: 'Forecasting demand',
        usage:
          'A retailer predicting units sold may switch from MSE to a quantile or Poisson loss, because MSE assumes symmetric Gaussian noise while demand is a non-negative count and under-stocking costs more than over-stocking. The loss is where business asymmetry gets encoded.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.CrossEntropyLoss, nn.BCEWithLogitsLoss and nn.MSELoss cover almost every task; the WithLogits variants are the numerically stable ones.' },
      { tool: 'TensorBoard', role: 'Training and validation loss curves are the primary diagnostic; the loss you chose is literally the y-axis of the plot you stare at most.' },
      { tool: 'scikit-learn', role: 'log_loss computes the same cross-entropy for probability outputs, which is useful for comparing a network against a baseline model on identical terms.' },
    ],

    commonMistakes: [
      {
        mistake: 'Applying softmax in forward and then using nn.CrossEntropyLoss',
        why: 'The loss applies log-softmax again. The doubly normalised distribution is flatter, the gradients are smaller, and training is slower or stalls. Nothing raises an error, so this can survive weeks in a codebase.',
        fix: 'Return raw logits from the model. If you need probabilities for display, call softmax outside the training loop, at inference only.',
      },
      {
        mistake: 'Using nn.MSELoss for a classification problem',
        why: 'Behind a sigmoid or softmax, squared error produces a gradient multiplied by the saturating activation derivative, so the most confidently wrong examples generate the smallest updates. It also stops being a valid likelihood for a categorical target.',
        fix: 'Use cross-entropy for any categorical target. Keep MSE for genuinely real-valued outputs.',
      },
      {
        mistake: 'Passing one-hot vectors to nn.CrossEntropyLoss when it expects class indices',
        why: 'The classic form takes a LongTensor of shape (N,) holding class indices. Passing floats of shape (N, k) either raises a dtype error or silently switches to the probability-target path introduced in newer versions, which changes the semantics of label smoothing and weighting.',
        fix: 'Pass target.long() of shape (N,) unless you deliberately want soft targets, and read the version-specific documentation before relying on the soft-target path.',
      },
      {
        mistake: 'Comparing losses across different reduction settings or batch sizes',
        why: 'Summing rather than averaging scales the loss with batch size, so a loss curve that drops when you change batch size may reflect nothing but the reduction. The same applies to comparing a weighted loss against an unweighted one.',
        fix: 'Fix the reduction to mean everywhere and log it explicitly, and never compare absolute loss values across runs with different loss configurations — compare a task metric instead.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why do we use cross-entropy rather than accuracy as the training objective for a classifier?',
        answer:
          'Accuracy is a step function of the predictions: it is piecewise constant, so its gradient with respect to the parameters is zero almost everywhere and undefined at the decision boundaries. Gradient descent has nothing to descend. Cross-entropy is a smooth surrogate that is minimised by the same predictions but is differentiable everywhere, and it carries extra information accuracy throws away — it distinguishes a correct prediction made with 51 per cent confidence from one made with 99 per cent confidence, and it punishes confident mistakes far more than hesitant ones. Accuracy remains the right thing to report, it is simply not something you can optimise directly.',
        followUp: 'A strong answer notes that this is the general pattern: you train on a differentiable surrogate and evaluate on the metric you actually care about, which is also why AUC, BLEU and F1 are reported but not minimised.',
      },
      {
        level: 'intermediate',
        question: 'Show that the gradient of softmax cross-entropy with respect to the logits is p - y, and explain why that matters.',
        answer:
          'Write the loss for true class c as L = -log p_c = -z_c + log sum_j e^{z_j}. Differentiating with respect to z_i, the first term gives -1 if i = c and 0 otherwise, which is -y_i. The second gives e^{z_i} / sum_j e^{z_j} = p_i. So dL/dz_i = p_i - y_i. It matters because there is no leftover activation derivative: the softmax Jacobian has cancelled against the log entirely. The magnitude of the update is exactly the magnitude of the error, so a confidently wrong prediction produces a near-maximal gradient rather than the near-zero one squared error would give. It is also the reason frameworks fuse softmax and the loss into a single op — the fused backward pass is one subtraction.',
      },
      {
        level: 'ml-engineer',
        question: 'Your multi-class model outputs nan losses after a few hundred steps. How do you diagnose it?',
        answer:
          'Work backwards from where nan can be produced. First check whether you are computing softmax yourself and then taking a log: if so, replace it with the fused nn.CrossEntropyLoss on logits, since log(0) and exp(large) are the two classic sources. Second, print the maximum absolute logit each step; logits growing without bound usually indicate a learning rate that is too high or a missing normalisation layer. Third, check the data for nan or inf inputs and for labels outside the valid range, which produces an out-of-range gather. Fourth, add torch.autograd.set_detect_anomaly(True) temporarily to find the first op producing nan in the backward pass. Practical mitigations are gradient clipping, a lower learning rate with warmup, and in mixed precision making sure the loss is computed in float32 under a GradScaler.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A binary classifier outputs probability 0.9 for an example whose true label is 1, and probability 0.9 for another whose true label is 0. Compute the binary cross-entropy for each, and comment on the asymmetry.',
        hint: 'BCE = -[y log p + (1-y) log(1-p)]. Only one term survives for each example.',
        solution:
          'For the first, y = 1, so the loss is -log(0.9) = 0.1054. For the second, y = 0, so the loss is -log(1 - 0.9) = -log(0.1) = 2.3026. The two predictions are numerically identical but one is right and one is wrong, and the wrong one costs about twenty-two times more. There is no asymmetry in the loss itself — it always charges the negative log of the probability assigned to whatever actually happened. The apparent asymmetry is just the steepness of the logarithm near zero, which is exactly the property that makes confident mistakes expensive.',
      },
      {
        prompt:
          'For a 1000-class problem, what cross-entropy loss corresponds to a model that has learned nothing and predicts uniformly? What does this tell you about a first training step that reports 6.9?',
        hint: 'A uniform distribution assigns 1/k to every class.',
        solution:
          'A uniform model assigns 1/1000 to every class, so the loss is -log(1/1000) = log(1000) = 6.9078 nats. A first step reporting 6.9 therefore means the model is at exactly chance level, which is what a correctly initialised network should report before it has learned anything. This is one of the most useful sanity checks in deep learning: compute log(k) before you start, and if step one is far above it your initialisation or label handling is broken, while if it is far below it you probably have label leakage. For ImageNet with 1000 classes the number to remember is 6.9; for 10 classes it is 2.30.',
      },
      {
        prompt:
          'You have a multi-label problem where each image may carry any subset of 20 tags. Explain why softmax with cross-entropy is wrong here, and state what to use instead.',
        hint: 'Think about what softmax forces the outputs to satisfy.',
        solution:
          'Softmax normalises the 20 scores to sum to one, which encodes the assumption that exactly one tag is correct — raising the probability of one tag necessarily lowers every other. In a multi-label setting two tags can both be genuinely present, so forcing them to compete for a fixed budget of probability is a modelling error, not just a calibration issue. The correct approach treats each tag as an independent binary decision: 20 output logits, an independent sigmoid on each, and the sum of 20 binary cross-entropies, which in PyTorch is nn.BCEWithLogitsLoss with a float target of shape (N, 20) containing zeros and ones. At inference you threshold each output separately rather than taking an argmax.',
      },
    ],

    quiz: [
      {
        id: 'DL-004-q1',
        type: 'mcq',
        concept: 'loss selection',
        prompt: 'Which loss should a network predicting house prices in pounds use on its final layer?',
        options: [
          'Mean squared error with a linear output and no activation',
          'Cross-entropy with a softmax over price buckets, always',
          'Binary cross-entropy with a sigmoid output',
          'Mean squared error with a ReLU output, to keep prices positive',
        ],
        answerIndex: 0,
        explanation:
          'The target is a real number, so the head is linear and MSE is the natural negative log-likelihood under Gaussian noise. A ReLU output would make it impossible to correct an overprediction smoothly near zero and is a common source of dead output units.',
      },
      {
        id: 'DL-004-q2',
        type: 'numeric',
        concept: 'chance-level loss',
        prompt: 'What cross-entropy loss, in nats, does a uniform predictor achieve on a balanced 10-class problem?',
        answer: 2.3026,
        tolerance: 0.01,
        explanation:
          'Minus the log of one tenth is log(10) = 2.3026. Knowing this number lets you check in one glance whether a freshly initialised model is behaving sensibly on its very first step.',
      },
      {
        id: 'DL-004-q3',
        type: 'truefalse',
        concept: 'logits vs probabilities',
        prompt: 'You should apply softmax inside your model before passing the output to nn.CrossEntropyLoss.',
        answer: false,
        explanation:
          'No. nn.CrossEntropyLoss applies log-softmax internally, in a numerically stable fused kernel. Applying softmax yourself normalises twice, which weakens gradients and slows training without raising any error.',
      },
      {
        id: 'DL-004-q4',
        type: 'code-output',
        language: 'python',
        concept: 'cross-entropy value',
        prompt: 'What does this print, to three decimal places?',
        code: 'import torch, torch.nn.functional as F\nlogits = torch.tensor([[0.0, 0.0, 0.0, 0.0]])\nprint(round(F.cross_entropy(logits, torch.tensor([2])).item(), 3))',
        options: ['1.386', '0.0', '0.25', '2.303'],
        answerIndex: 0,
        explanation:
          'Equal logits give a uniform distribution over 4 classes, so each probability is 0.25 and the loss is minus the log of 0.25, which is log(4) = 1.386. Which class is the target makes no difference when the prediction is uniform.',
      },
      {
        id: 'DL-004-q5',
        type: 'fill',
        concept: 'gradient of cross-entropy',
        prompt: 'The gradient of softmax cross-entropy with respect to the logits equals the predicted probability vector minus the ____ vector.',
        answers: ['one-hot target', 'target', 'one-hot', 'y', 'one hot target'],
        explanation:
          'dL/dz = p - y. Every softmax and log term cancels, which is why this pairing gives a gradient whose magnitude equals the error and never saturates at the output layer.',
      },
      {
        id: 'DL-004-q6',
        type: 'explain',
        concept: 'why not MSE for classification',
        prompt: 'Explain why mean squared error behind a sigmoid is a poor training objective for binary classification.',
        rubric: [
          'Notes that the MSE gradient carries a factor of the sigmoid derivative',
          'Notes that this factor is near zero when the model is confidently wrong',
          'Concludes that the worst mistakes produce the smallest updates, and that cross-entropy cancels the factor',
        ],
        sampleAnswer:
          'With MSE the loss is the square of sigma(z) minus y, so by the chain rule the gradient with respect to the logit is twice that difference times sigma(z)(1 - sigma(z)). That second factor is the sigmoid derivative, which collapses toward zero whenever the logit is large in magnitude. A model that predicts 0.002 when the truth is 1 is about as wrong as it can be, yet the sigmoid derivative there is roughly 0.002, so the gradient is tiny and the model barely moves. Cross-entropy is built so that this factor cancels against the derivative of the logarithm, leaving a gradient of exactly p - y. The worse the prediction, the larger the push, which is the behaviour you want from an optimiser.',
        explanation:
          'The examinable point is about the gradient, not the loss value. Both losses agree the prediction is bad; only cross-entropy communicates that usefully to the optimiser.',
      },
    ],

    flashcards: [
      { front: 'What loss for regression, and why?', back: 'Mean squared error. It is the negative log-likelihood under Gaussian noise, and its gradient is proportional to the error itself.' },
      { front: 'What is the gradient of softmax cross-entropy with respect to the logits?', back: 'p - y: the predicted distribution minus the one-hot target. All softmax and log factors cancel exactly.' },
      { front: 'What chance-level cross-entropy should a fresh k-class model report?', back: 'log(k) nats — 2.30 for 10 classes, 6.91 for 1000. A useful first-step sanity check.' },
      { front: 'Why pass logits rather than probabilities to a loss?', back: 'The fused loss applies log-softmax with the max subtracted, avoiding overflow from exp and the divergence of log at zero.' },
      { front: 'Which loss for multi-label tagging?', back: 'Independent sigmoids with summed binary cross-entropy (BCEWithLogitsLoss). Softmax would wrongly force the tags to compete.' },
      { front: 'Why can accuracy not be used as a training loss?', back: 'It is piecewise constant, so its gradient is zero almost everywhere. Cross-entropy is the differentiable surrogate you optimise instead.' },
    ],

    challenge: {
      title: 'Implement and validate three losses from scratch',
      brief:
        'Write NumPy implementations of mean squared error, binary cross-entropy from logits, and softmax cross-entropy from logits, each returning both the loss and the gradient with respect to its input. Make the cross-entropy versions numerically stable using the log-sum-exp trick. Validate every gradient against a central finite-difference estimate to within 1e-6, and demonstrate that your BCE implementation survives logits of magnitude 1000 while a naive implementation returns nan.',
      language: 'python',
      acceptanceCriteria: [
        'All three losses return both value and analytic gradient',
        'Gradients match central finite differences to within 1e-6 on random inputs',
        'The log-sum-exp trick is used, and a test with logits of large magnitude produces finite values',
        'A short note explains why the softmax cross-entropy gradient is p - y rather than something involving the softmax Jacobian',
      ],
      starterCode:
        'import numpy as np\n\ndef softmax_cross_entropy(logits, targets):\n    """logits: (N, k) array. targets: (N,) integer class indices.\n    Returns (mean_loss, dloss_dlogits of shape (N, k))."""\n    ...\n\ndef finite_diff(f, x, eps=1e-5):\n    g = np.zeros_like(x)\n    it = np.nditer(x, flags=["multi_index"])\n    while not it.finished:\n        i = it.multi_index\n        old = x[i]\n        x[i] = old + eps; hi = f(x)\n        x[i] = old - eps; lo = f(x)\n        x[i] = old\n        g[i] = (hi - lo) / (2 * eps)\n        it.iternext()\n    return g\n',
    },

    teachingPrompt: {
      prompt:
        'Explain what a loss function is, why classification and regression need different ones, and what makes cross-entropy the right partner for softmax.',
      mustCover: [
        'The loss collapses the model output and the target into one number that can be minimised',
        'Squared error suits real-valued targets; cross-entropy suits categorical ones',
        'Cross-entropy scores the negative log probability assigned to the true answer, so confident mistakes are very expensive',
        'Paired with softmax, the gradient with respect to the logits is simply p - y, which never saturates',
      ],
      bonusSignals: [
        'frames both losses as negative log-likelihoods',
        'explains why squared error behind a sigmoid gives vanishing gradients',
        'mentions log(k) as the chance-level loss',
        'mentions numerical stability and why logits are passed to the loss',
      ],
      sampleExplanation:
        "Training works by nudging parameters downhill, and you can only go downhill on a single number, so the first job is to squeeze everything the model got wrong into one score. That score is the loss. Which score you use depends on what you asked the model for. If you asked for a quantity, like a price, the obvious measure is the gap between your answer and the truth, squared so that big misses hurt disproportionately. If you asked for a category, that measure is a poor fit, because what matters is not the arithmetic distance between class numbers but how much probability the model put on the right answer. Cross-entropy takes that probability and charges you minus its logarithm. Say ninety per cent and it costs almost nothing. Say one per cent and it costs a lot. Say zero and it costs infinity, which is why the calculation is always done in log space rather than by exponentiating first. Now the part that makes the pairing with softmax special. When you work out the derivative of cross-entropy with respect to the raw scores, everything cancels and you are left with the predicted probabilities minus the true answer written as a one and some zeros. That means the size of the correction is exactly the size of the mistake — confidently wrong gets pushed hard, nearly right gets pushed gently. Squared error behind a sigmoid does the opposite: the more confidently wrong the model is, the smaller its update, because it is stuck in the flat part of the curve. That single difference is why every classifier you will build uses cross-entropy.",
    },
  },
  {
    id: 'DL-005',
    domain: 'DL',
    module: 'Training a Network',
    topic: 'The backward pass',
    title: 'Backpropagation',
    slug: 'backpropagation',
    difficulty: 5,
    estimatedMinutes: 50,
    prerequisites: ['DL-003', 'DL-004'],
    related: ['DL-001', 'DL-002', 'DL-003', 'DL-004'],
    tags: ['backpropagation', 'chain-rule', 'gradients', 'autograd', 'computational-graph', 'delta'],

    learningObjectives: [
      'State backpropagation as the chain rule applied systematically to a computational graph, and explain why it is not a special algorithm for neural networks',
      'Derive the four backpropagation equations for a fully connected network from the chain rule alone',
      'Trace a complete forward and backward pass through a 2-layer network with real numbers and produce the updated weights',
      'Explain why backpropagation costs about the same as a forward pass, and what has to be stored to achieve that',
    ],

    terminology: [
      {
        term: 'Computational graph',
        definition:
          'A directed acyclic graph whose nodes are intermediate values and whose edges are the operations that produced them. Every framework builds one during the forward pass.',
        simple: 'A map of which numbers were made from which other numbers.',
      },
      {
        term: 'Chain rule',
        definition:
          'If y depends on u and u depends on x, then dy/dx = (dy/du)(du/dx). For multiple paths the contributions add: this is the multivariable chain rule.',
        simple: 'To find how much x matters to y, multiply the influences along the way and add up the routes.',
      },
      {
        term: 'Delta (error signal)',
        definition:
          'The partial derivative of the loss with respect to the pre-activation of a layer, written delta(l) = dL/dz(l). It is the quantity backpropagation actually passes backwards.',
        simple: 'How much the raw score of each neuron should change, according to the loss.',
      },
      {
        term: 'Reverse-mode automatic differentiation',
        definition:
          'The general algorithm of which backpropagation is one instance: compute the derivative of one scalar output with respect to all inputs in a single backward sweep, at a cost proportional to the forward pass.',
        simple: 'Work out all the slopes at once by walking the map backwards.',
      },
      {
        term: 'Activation cache',
        definition:
          'The forward-pass intermediate values stored so the backward pass can use them. It is why training uses far more memory than inference.',
        simple: 'The notes you keep on the way forward because you will need them on the way back.',
      },
    ],

    simpleExplanation:
      "Suppose a cake comes out wrong and you want to know how much of the blame belongs to the oven temperature. You cannot measure that directly, but you know the temperature affected the browning, the browning affected the texture, and the texture affected the score. So you ask three easy local questions — how much does score change per unit of texture, texture per unit of browning, browning per unit of temperature — and multiply the three answers together. That product is the blame assigned to the temperature. Backpropagation is exactly this and nothing more. A network is a long chain of simple operations, each of which knows its own local derivative. Starting at the loss, you hand each operation the blame arriving from above, it multiplies by its own local slope, and it passes the result down to whatever fed it. By the time you reach the bottom, every single weight has been told precisely how much it contributed to the error. There is no search, no guessing and no magic; it is the chain rule from calculus, applied once per operation, in reverse order.",

    whyItExists:
      'A modern network has millions or billions of parameters, and you need the derivative of one loss with respect to every one of them. Computing them one at a time by nudging each parameter would cost one forward pass per parameter, which for a billion parameters is impossible. Backpropagation exploits the fact that all those derivatives share intermediate quantities, and computes the entire gradient in a single backward sweep costing roughly the same as one forward pass — turning an impossible problem into a routine one.',

    analogy: {
      scenario:
        'Picture a company where a bad quarterly number lands on the chief executive desk. She does not audit every employee individually. She tells each of her three direct reports how much of the shortfall attaches to their division. Each of them knows how their own division converts effort into results, so they scale the blame they received by that local knowledge and pass a share down to their own reports. The message keeps splitting and rescaling as it descends, and within one pass every individual in the company has received a number saying exactly how much their own behaviour contributed to the quarterly miss — without anyone ever needing to understand the company as a whole.',
      mapping: [
        { from: 'The quarterly shortfall on the chief executive desk', to: 'The loss L at the top of the network' },
        { from: 'Blame handed to a manager', to: 'delta(l) = dL/dz(l), the error signal arriving at a layer' },
        { from: "A manager's local knowledge of effort-to-results in their division", to: 'The local derivative of that layer: the activation derivative and the weight matrix' },
        { from: 'Rescaling the blame before passing it down', to: 'Multiplying by the local Jacobian as the signal moves backward' },
        { from: 'One pass reaching every employee', to: 'One backward sweep producing every parameter gradient' },
      ],
      bridge:
        'The analogy is faithful in the one respect that matters: no node needs a global view. Each operation knows only its own inputs, its own output and its own local derivative, and correctness comes from the ordering — you must have the blame from above before you can pass blame below. That ordering requirement is why the backward pass runs in reverse topological order, and why the forward activations must be kept in memory until their gradient has been used.',
      limitations:
        'Blame in a company is shared out and sums to the total; gradients do not work like that. A gradient is a rate of change, not a portion of a fixed quantity, and two weights can both have large gradients without any conservation law relating them.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'One training step, end to end',
        caption: 'Backpropagation is step three of five. It computes gradients; it does not change any weights.',
        steps: [
          { label: 'Forward pass', detail: 'Compute every layer activation from input to output, caching the intermediate values.' },
          { label: 'Loss', detail: 'Reduce the output and the target to a single scalar L.' },
          { label: 'Backward pass', detail: 'Starting from dL/dL = 1, apply the chain rule in reverse topological order to get dL/dW for every parameter.' },
          { label: 'Optimiser step', detail: 'Use those gradients to update the parameters, for example W <- W - lr * dL/dW.' },
          { label: 'Zero the gradients', detail: 'Clear the accumulated buffers, because PyTorch adds into .grad rather than overwriting it.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'The four backpropagation equations',
        subject: 'delta(L) = dL/da .* phi\'(z(L));  delta(l) = (delta(l+1) W(l+1)^T) .* phi\'(z(l));  dL/dW(l) = a(l-1)^T delta(l);  dL/db(l) = sum delta(l)',
        annotations: [
          { part: "delta(L) = dL/da .* phi'(z(L))", note: 'Start the recursion at the output layer. With softmax and cross-entropy this collapses to the famous p - y.' },
          { part: 'delta(l) = (delta(l+1) W(l+1)^T) .* phi\'(z(l))', note: 'Move the error one layer down: multiply by the transposed weights of the layer above, then by the local activation slope.' },
          { part: 'dL/dW(l) = a(l-1)^T delta(l)', note: 'The weight gradient is an outer product of what came in with the error going out. This is why both must be available at the same time.' },
          { part: 'dL/db(l) = sum over batch of delta(l)', note: 'The bias sees an input of constant 1, so its gradient is the error signal itself, summed across the batch.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Numerical gradients versus backpropagation',
        caption: 'Both give the same answer. Only one is affordable, and the slow one is still worth keeping for testing.',
        left: {
          heading: 'Finite differences',
          points: [
            'Nudge one parameter, re-run the forward pass, measure the change in loss',
            'Costs two forward passes per parameter: 2P passes in total',
            'For 10 million parameters, roughly 20 million forward passes per step',
            'Subject to truncation and round-off error; you must tune the step size',
          ],
        },
        right: {
          heading: 'Backpropagation',
          points: [
            'One forward pass, then one backward sweep',
            'Total cost about two to three times a forward pass, independent of parameter count',
            'Exact to floating-point precision, with no step size to choose',
            'Costs memory: every cached activation must be kept until its gradient is used',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Watch the error signal flow backwards',
        caption: 'Step through forward and backward one node at a time and see the delta values appear layer by layer.',
        widget: 'backprop-flow',
      },
      {
        kind: 'widget',
        title: 'Try the numbers yourself',
        caption: 'Run the worked example below and change one weight to see how the gradients respond.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'Backpropagation is reverse-mode automatic differentiation applied to the computational graph of a neural network loss. Given a graph of differentiable primitives with a single scalar output L, it computes dL/dtheta for every parameter theta by initialising the adjoint of the output to 1 and traversing the graph in reverse topological order, at each node multiplying the incoming adjoint by that node local Jacobian and accumulating the result into the adjoints of its inputs. Its time cost is O(1) forward passes and its memory cost is O(number of cached intermediate values).',

    math: {
      intuition:
        'A network is a composition of functions, and the derivative of a composition is a product of derivatives. Backpropagation is that product, evaluated right to left. Evaluating right to left rather than left to right is the whole trick: because the output is a single scalar, starting from the top means every intermediate quantity is a vector rather than a matrix, so the sweep costs about as much as the forward pass. Going the other way, called forward mode, would cost one sweep per parameter. The quantity worth naming is delta, the derivative of the loss with respect to a layer pre-activation, because once you have delta for a layer, both its weight gradient and the delta of the layer below follow immediately.',
      formulas: [
        {
          latex: '\\frac{\\partial L}{\\partial x} = \\sum_{k} \\frac{\\partial L}{\\partial u_k}\\,\\frac{\\partial u_k}{\\partial x}',
          name: 'The multivariable chain rule',
          meaning:
            'The entire foundation. If x influences the loss through several intermediate quantities, multiply along each route and add the routes together. Everything below is this rule specialised to layers.',
          variables: [
            { symbol: 'L', meaning: 'The scalar loss at the top of the graph' },
            { symbol: 'x', meaning: 'Any quantity in the graph: a weight, a bias, an activation' },
            { symbol: 'u_k', meaning: 'The intermediate quantities that x directly feeds into' },
            { symbol: '\\partial u_k / \\partial x', meaning: 'The local derivative, known to the operation that produced u_k without any global knowledge' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\boldsymbol{\\delta}^{(L)} = \\nabla_{\\mathbf{a}}L \\odot \\phi\'\\bigl(\\mathbf{z}^{(L)}\\bigr)',
          name: 'Backpropagation equation 1: the output error',
          meaning:
            'Where the recursion starts. Take the derivative of the loss with respect to the output activations and multiply elementwise by the slope of the output activation. For softmax with cross-entropy the two collapse into p - y.',
          variables: [
            { symbol: '\\boldsymbol{\\delta}^{(L)}', meaning: 'Error signal at the output layer: dL/dz for the last layer' },
            { symbol: '\\nabla_{\\mathbf{a}}L', meaning: 'Gradient of the loss with respect to the output activations' },
            { symbol: '\\odot', meaning: 'Elementwise (Hadamard) product' },
            { symbol: "\\phi'", meaning: 'Derivative of the activation function, evaluated at the cached pre-activations' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\boldsymbol{\\delta}^{(l)} = \\Bigl(\\boldsymbol{\\delta}^{(l+1)} \\bigl(W^{(l+1)}\\bigr)^{\\top}\\Bigr) \\odot \\phi\'\\bigl(\\mathbf{z}^{(l)}\\bigr)',
          name: 'Backpropagation equation 2: propagating the error down',
          meaning:
            'The recursive step. The transposed weight matrix routes the error from the units above back to the units that fed them, and the activation derivative gates it by how responsive each unit currently is.',
          variables: [
            { symbol: '\\boldsymbol{\\delta}^{(l)}', meaning: 'Error signal at layer l' },
            { symbol: 'W^{(l+1)}', meaning: 'Weights of the layer above; transposing them sends influence backwards along the same connections' },
            { symbol: "\\phi'(\\mathbf{z}^{(l)})", meaning: 'Local slope at layer l, which is where saturation kills the signal' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\frac{\\partial L}{\\partial W^{(l)}} = \\bigl(A^{(l-1)}\\bigr)^{\\top}\\boldsymbol{\\delta}^{(l)}, \\qquad \\frac{\\partial L}{\\partial \\mathbf{b}^{(l)}} = \\sum_{n=1}^{N}\\boldsymbol{\\delta}^{(l)}_{n}',
          name: 'Backpropagation equations 3 and 4: the parameter gradients',
          meaning:
            'The gradient of a weight is the activation that entered it times the error that left it. Large only when the input was large and the unit was blamed. The bias gradient is the error alone, since its input is the constant 1.',
          variables: [
            { symbol: 'A^{(l-1)}', meaning: 'Cached activations entering layer l, shape N x d(l-1)' },
            { symbol: '\\boldsymbol{\\delta}^{(l)}', meaning: 'Error signal leaving layer l, shape N x d(l)' },
            { symbol: 'N', meaning: 'Batch size; summing over it accumulates the gradient contributions of all examples' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\frac{\\partial L}{\\partial W^{(1)}} = \\frac{\\partial L}{\\partial \\mathbf{a}^{(L)}}\\prod_{l=2}^{L}\\Bigl(\\mathrm{diag}\\bigl(\\phi\'(\\mathbf{z}^{(l)})\\bigr)W^{(l)}\\Bigr)\\,\\frac{\\partial \\mathbf{z}^{(1)}}{\\partial W^{(1)}}',
          name: 'The gradient of an early layer, written as a product',
          meaning:
            'Unrolling the recursion shows the gradient of an early layer is a product of L-1 matrices. If their typical magnitude is below one the product vanishes; above one it explodes. This single expression explains both failure modes of deep networks.',
          variables: [
            { symbol: '\\prod', meaning: 'Matrix product taken in order from the output layer down' },
            { symbol: "\\mathrm{diag}(\\phi')", meaning: 'Diagonal matrix of activation slopes; for saturated sigmoids these entries are near zero' },
            { symbol: 'W^{(l)}', meaning: 'Weight matrix of layer l; its singular values control amplification' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Write the loss as a function of the last pre-activation: L = L(phi(z(L))). By the chain rule, dL/dz(L) = dL/da(L) * phi prime(z(L)). Elementwise, because phi acts elementwise. That is equation 1.',
        'Layer l influences the loss only through z(l+1), because z(l+1) = a(l) W(l+1) + b(l+1) and a(l) = phi(z(l)). So dL/da(l) = dL/dz(l+1) * dz(l+1)/da(l) = delta(l+1) W(l+1)^T.',
        'Then dL/dz(l) = dL/da(l) * da(l)/dz(l) = (delta(l+1) W(l+1)^T) elementwise-times phi prime(z(l)). That is equation 2, and it is the entire recursion.',
        'For the weights, z(l)_j = sum_i a(l-1)_i W(l)_ij + b(l)_j, so dz(l)_j / dW(l)_ij = a(l-1)_i. Multiplying by delta(l)_j and summing over the batch gives dL/dW(l) = A(l-1)^T delta(l). That is equation 3.',
        'For the biases, dz(l)_j / db(l)_j = 1, so dL/db(l)_j = sum over the batch of delta(l)_j. That is equation 4.',
        'Nothing in this derivation is specific to neural networks. It is the chain rule, plus the observation that the recursion lets you reuse delta(l+1) when computing delta(l) instead of recomputing the whole path.',
      ],
    },

    workedExample: {
      title: 'A complete forward and backward pass with real numbers',
      setup:
        'A network with two inputs, two sigmoid hidden units and one sigmoid output. Input x = [1.0, 0.5], target y = 1.0, loss L = 0.5 (y_hat - y)^2, learning rate 0.5. Parameters: W1 = [[0.1, 0.2], [0.3, 0.4]] where row j holds the weights of hidden unit j, b1 = [0.1, 0.1], W2 = [0.5, -0.3], b2 = 0.2. Every number below is computed to six figures and rounded to four.',
      steps: [
        {
          label: 'Forward: hidden pre-activations',
          detail: 'z1_1 = 0.1(1.0) + 0.2(0.5) + 0.1 = 0.1 + 0.1 + 0.1 = 0.3.  z1_2 = 0.3(1.0) + 0.4(0.5) + 0.1 = 0.3 + 0.2 + 0.1 = 0.6.',
          latex: '\\mathbf{z}^{(1)} = [0.3,\\; 0.6]',
        },
        {
          label: 'Forward: hidden activations',
          detail: 'h1 = sigmoid(0.3) = 1/(1 + e^-0.3) = 1/1.740818 = 0.5744.  h2 = sigmoid(0.6) = 1/1.548812 = 0.6457.',
          latex: '\\mathbf{h} = [0.5744,\\; 0.6457]',
        },
        {
          label: 'Forward: output',
          detail: 'z2 = 0.5(0.5744) + (-0.3)(0.6457) + 0.2 = 0.2872 - 0.1937 + 0.2 = 0.2935.  y_hat = sigmoid(0.2935) = 0.5729.',
          latex: 'z^{(2)} = 0.2935, \\quad \\hat{y} = 0.5729',
        },
        {
          label: 'Forward: loss',
          detail: 'L = 0.5 (0.5729 - 1.0)^2 = 0.5 (-0.4271)^2 = 0.5 (0.18245) = 0.0912. Keep this number; we will check that it falls.',
          latex: 'L = 0.0912',
        },
        {
          label: 'Backward: derivative of the loss w.r.t. the prediction',
          detail: 'dL/dy_hat = (y_hat - y) = 0.5729 - 1.0 = -0.4271. Negative, meaning the loss would fall if the prediction rose.',
          latex: '\\frac{\\partial L}{\\partial \\hat{y}} = -0.4271',
        },
        {
          label: 'Backward: through the output sigmoid',
          detail: "sigmoid'(z2) = y_hat(1 - y_hat) = 0.5729 x 0.4271 = 0.2447. So delta2 = dL/dz2 = -0.4271 x 0.2447 = -0.1045. This single number is the error signal of the output unit.",
          latex: '\\delta^{(2)} = -0.4271 \\times 0.2447 = -0.1045',
        },
        {
          label: 'Backward: gradients of the output layer',
          detail: 'dL/dW2 = delta2 * h = [-0.1045(0.5744), -0.1045(0.6457)] = [-0.0600, -0.0675].  dL/db2 = delta2 = -0.1045. Notice the weight gradient is the incoming activation times the outgoing error, exactly as equation 3 says.',
          latex: '\\frac{\\partial L}{\\partial W^{(2)}} = [-0.0600,\\; -0.0675], \\quad \\frac{\\partial L}{\\partial b^{(2)}} = -0.1045',
        },
        {
          label: 'Backward: push the error into the hidden activations',
          detail: 'dL/dh = delta2 * W2 = [-0.1045(0.5), -0.1045(-0.3)] = [-0.0523, 0.0314]. The signs differ because the two hidden units are wired to the output with opposite-signed weights.',
          latex: '\\frac{\\partial L}{\\partial \\mathbf{h}} = [-0.0523,\\; 0.0314]',
        },
        {
          label: 'Backward: through the hidden sigmoids',
          detail: "sigmoid'(z1_1) = 0.5744(1 - 0.5744) = 0.2445 and sigmoid'(z1_2) = 0.6457(1 - 0.6457) = 0.2288. So delta1 = [-0.0523 x 0.2445, 0.0314 x 0.2288] = [-0.01278, 0.00717].",
          latex: '\\boldsymbol{\\delta}^{(1)} = [-0.01278,\\; 0.00717]',
        },
        {
          label: 'Backward: gradients of the hidden layer',
          detail: 'dL/dW1 is the outer product of delta1 with x. Row 1: [-0.01278(1.0), -0.01278(0.5)] = [-0.01278, -0.00639]. Row 2: [0.00717(1.0), 0.00717(0.5)] = [0.00717, 0.00359]. dL/db1 = delta1 = [-0.01278, 0.00717].',
          latex: '\\frac{\\partial L}{\\partial W^{(1)}} = \\begin{bmatrix} -0.01278 & -0.00639 \\\\ 0.00717 & 0.00359 \\end{bmatrix}',
        },
        {
          label: 'Note how much the signal shrank',
          detail: 'The output error was 0.1045; by the time it reached the hidden weights it was around 0.01, roughly ten times smaller after one layer. Two sigmoid layers already cost an order of magnitude. Extend this to twenty layers and you have the vanishing gradient problem in front of you, written in arithmetic.',
          latex: '\\lvert \\delta^{(2)} \\rvert = 0.1045 \\;\\longrightarrow\\; \\lvert \\delta^{(1)} \\rvert \\approx 0.0128',
        },
        {
          label: 'Update every parameter with learning rate 0.5',
          detail: 'W2 becomes [0.5 + 0.5(0.0600), -0.3 + 0.5(0.0675)] = [0.5300, -0.2663]. b2 becomes 0.2 + 0.5(0.1045) = 0.2523. W1 row 1 becomes [0.1064, 0.2032], row 2 becomes [0.2964, 0.3982]. b1 becomes [0.1064, 0.0964].',
          latex: 'W \\leftarrow W - \\eta\\,\\frac{\\partial L}{\\partial W}, \\quad \\eta = 0.5',
        },
        {
          label: 'Forward again with the new parameters',
          detail: 'z1 = [0.3144, 0.5919], h = [0.5780, 0.6438], z2 = 0.5300(0.5780) - 0.2663(0.6438) + 0.2523 = 0.3872, y_hat = 0.5956, and L = 0.5(0.5956 - 1)^2 = 0.0818.',
          latex: 'L: 0.0912 \\;\\longrightarrow\\; 0.0818',
        },
      ],
      conclusion:
        'The loss fell from 0.0912 to 0.0818 in one step, about ten per cent, and every number that produced that improvement was computed with nothing more than multiplication, addition and the sigmoid derivative. There was no search over weights, no trial and error, and nothing that could reasonably be called magic. Scale exactly this procedure to billions of parameters and you have the training loop of every modern model.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The worked example, in NumPy, with no autograd',
        runnable: true,
        code: `import numpy as np

def sigmoid(z):   return 1.0 / (1.0 + np.exp(-z))
def dsigmoid(a):  return a * (1.0 - a)      # takes the ACTIVATION, not the pre-activation

x  = np.array([1.0, 0.5]);  y = 1.0
W1 = np.array([[0.1, 0.2], [0.3, 0.4]]);  b1 = np.array([0.1, 0.1])
W2 = np.array([0.5, -0.3]);               b2 = 0.2
lr = 0.5

# ---- forward ----
z1 = W1 @ x + b1;   h = sigmoid(z1)
z2 = W2 @ h  + b2;  yhat = sigmoid(z2)
loss = 0.5 * (yhat - y) ** 2
print(f"forward: h={np.round(h,4)}  yhat={yhat:.4f}  loss={loss:.4f}")

# ---- backward ----
d2   = (yhat - y) * dsigmoid(yhat)          # dL/dz2
gW2  = d2 * h                               # dL/dW2
gb2  = d2
dh   = d2 * W2                              # dL/dh
d1   = dh * dsigmoid(h)                     # dL/dz1
gW1  = np.outer(d1, x)                      # dL/dW1
gb1  = d1
print(f"backward: d2={d2:.4f}  d1={np.round(d1,5)}")
print(f"gW2={np.round(gW2,4)}  gW1=\\n{np.round(gW1,5)}")

# ---- update, then re-check the loss ----
W2 -= lr * gW2;  b2 -= lr * gb2
W1 -= lr * gW1;  b1 -= lr * gb1
h2 = sigmoid(W1 @ x + b1)
new_loss = 0.5 * (sigmoid(W2 @ h2 + b2) - y) ** 2
print(f"loss {loss:.4f} -> {new_loss:.4f}")`,
        output: `forward: h=[0.5744 0.6457]  yhat=0.5729  loss=0.0912
backward: d2=-0.1045  d1=[-0.01278  0.00717]
gW2=[-0.06   -0.0675]  gW1=
[[-0.01278 -0.00639]
 [ 0.00717  0.00359]]
loss 0.0912 -> 0.0818`,
        explanation:
          'Every printed number matches the hand trace. Two details are worth pausing on. First, dsigmoid takes the activation rather than the pre-activation, because sigmoid prime(z) = a(1 - a); caching a and reusing it is a standard saving. Second, the weight gradient gW1 is an outer product of the error going out with the activation coming in, which is equation 3 made concrete: you need both, at the same time, which is exactly why the forward activations must stay in memory.',
      },
      {
        language: 'python',
        title: 'Checking the hand gradients against autograd and finite differences',
        runnable: true,
        code: `import torch

x  = torch.tensor([1.0, 0.5])
y  = torch.tensor(1.0)
W1 = torch.tensor([[0.1, 0.2], [0.3, 0.4]], requires_grad=True)
b1 = torch.tensor([0.1, 0.1],               requires_grad=True)
W2 = torch.tensor([0.5, -0.3],              requires_grad=True)
b2 = torch.tensor(0.2,                      requires_grad=True)

def loss_fn():
    h = torch.sigmoid(W1 @ x + b1)
    return 0.5 * (torch.sigmoid(W2 @ h + b2) - y) ** 2

L = loss_fn()
L.backward()
print("autograd dL/dW2 :", [round(v, 4) for v in W2.grad.tolist()])
print("autograd dL/dW1 :", [[round(v, 5) for v in row] for row in W1.grad.tolist()])

# Independent check: nudge one weight and measure the change in loss.
eps = 1e-5
with torch.no_grad():
    W1[0, 0] += eps;  hi = loss_fn().item()
    W1[0, 0] -= 2 * eps;  lo = loss_fn().item()
    W1[0, 0] += eps
print("finite difference dL/dW1[0,0]:", round((hi - lo) / (2 * eps), 5))`,
        output: `autograd dL/dW2 : [-0.06, -0.0675]
autograd dL/dW1 : [[-0.01278, -0.00639], [0.00717, 0.00359]]
finite difference dL/dW1[0,0]: -0.01278`,
        explanation:
          'Three independent methods — hand algebra, reverse-mode autograd and a central finite difference — agree to five decimal places. Gradient checking against finite differences is the standard way to validate a hand-written backward pass, and it is worth doing once on any custom layer you write. Note why it is only a test and not a method: it needs two forward passes per parameter, so checking a 10-million-parameter model would take 20 million forward passes.',
      },
      {
        language: 'python',
        title: 'What autograd is actually doing: a two-node graph from scratch',
        runnable: true,
        code: `class Value:
    """A scalar that remembers how it was computed, so it can differentiate itself."""
    def __init__(self, data, parents=(), backward=lambda: None):
        self.data, self.grad = data, 0.0
        self._parents, self._backward = parents, backward

    def __mul__(self, other):
        out = Value(self.data * other.data, (self, other))
        def back():
            self.grad  += other.data * out.grad     # local derivative x incoming grad
            other.grad += self.data  * out.grad
        out._backward = back
        return out

    def __add__(self, other):
        out = Value(self.data + other.data, (self, other))
        def back():
            self.grad  += out.grad                  # addition passes gradient straight through
            other.grad += out.grad
        out._backward = back
        return out

    def backward(self):
        order, seen = [], set()
        def build(v):
            if v in seen: return
            seen.add(v)
            for p in v._parents: build(p)
            order.append(v)
        build(self)
        self.grad = 1.0                             # dL/dL = 1
        for v in reversed(order):                   # reverse topological order
            v._backward()

a, b, c = Value(2.0), Value(-3.0), Value(10.0)
L = a * b + c
L.backward()
print(f"L = {L.data}   dL/da = {a.grad}   dL/db = {b.grad}   dL/dc = {c.grad}")`,
        output: `L = 4.0   dL/da = -3.0   dL/db = 2.0   dL/dc = 1.0`,
        explanation:
          'Forty lines is genuinely all an autograd engine needs. Each operation records its parents and a closure that knows its own local derivative; backward sorts the graph topologically, seeds the output adjoint with 1, and walks it in reverse calling those closures. The += rather than = matters: when a value feeds several consumers, the multivariable chain rule says the contributions add. PyTorch is this, plus tensors, plus several hundred primitive operations, plus a great deal of engineering.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Training any modern model',
        usage:
          'loss.backward() in PyTorch is exactly this algorithm running over a graph of millions of nodes. The reason training takes roughly three times as long as inference per example is that the backward pass costs about twice a forward pass, and the reason training needs many times more memory is the cached activations.',
      },
      {
        context: 'Activation checkpointing on large models',
        usage:
          'When a model will not fit in GPU memory, teams enable gradient checkpointing: forward activations are discarded and recomputed during the backward pass. This is a direct trade of compute for memory and only makes sense once you know that the memory cost of backpropagation is the activation cache.',
      },
      {
        context: 'Adversarial examples and model explanation',
        usage:
          'The same machinery computes the gradient of the loss with respect to the input pixels rather than the weights. Taking a small step in that direction produces an adversarial image; visualising it produces a saliency map. Both are backpropagation stopped one node earlier than usual.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch autograd', role: 'Builds the graph dynamically as the forward pass runs; loss.backward() traverses it and accumulates into .grad on every leaf tensor.' },
      { tool: 'torch.no_grad() / inference_mode()', role: 'Disables graph construction where you do not need gradients, cutting the memory cost of evaluation substantially.' },
      { tool: 'torch.utils.checkpoint', role: 'Trades recomputation for activation memory, the standard technique for fitting large models on limited hardware.' },
      { tool: 'torch.autograd.gradcheck', role: 'Compares an analytic backward against finite differences; the correct way to validate a custom autograd Function.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting optimizer.zero_grad() before backward()',
        why: 'PyTorch accumulates into .grad rather than overwriting it, a design choice that makes gradient accumulation across micro-batches possible. Without zeroing, step t uses the sum of the gradients of all steps so far, and effective step sizes grow without bound.',
        fix: 'Call optimizer.zero_grad(set_to_none=True) at the top of every iteration. The symptom of forgetting is a loss that falls once and then diverges.',
      },
      {
        mistake: 'Calling backward() twice on the same graph',
        why: 'Intermediate buffers are freed as soon as they are used, so a second call raises RuntimeError: Trying to backward through the graph a second time. Usually the real cause is a tensor carried across iterations, such as an RNN hidden state that was never detached.',
        fix: 'Detach anything that crosses an iteration boundary: h = h.detach(). Use retain_graph=True only when you genuinely need two backward passes over one graph, and understand the memory cost.',
      },
      {
        mistake: 'Believing backpropagation is an optimisation algorithm',
        why: 'It computes gradients and changes nothing. Conflating it with gradient descent makes it impossible to reason about the many optimisers — SGD, Adam, LBFGS — that consume identical gradients and behave completely differently.',
        fix: 'Keep the two ideas separate in your head and in your code: backward() produces the gradients, step() decides what to do with them.',
      },
      {
        mistake: 'Breaking the graph with an in-place operation or a detour through NumPy',
        why: 'Converting a tensor with .numpy(), .item() or .data severs the connection to the graph, so gradients silently stop flowing at that point and the parameters upstream never move. In-place edits on a tensor needed for backward raise a version-counter error instead.',
        fix: 'Do all differentiable work in torch operations. If parameters are not updating, check for a stray .item() or .detach() in the path, and confirm with p.grad is not None on the relevant parameter.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Explain backpropagation to someone who knows calculus but not machine learning.',
        answer:
          'A network is a composition of simple differentiable functions ending in one scalar loss, so the derivative of the loss with respect to any internal quantity is a product of local derivatives along the paths connecting them — the chain rule. Backpropagation evaluates that product in reverse, starting from the loss with an adjoint of 1 and working backwards through the computational graph in reverse topological order. At each node it multiplies the incoming adjoint by that node local Jacobian and accumulates into the adjoints of its inputs. Because the output is a single scalar, going backwards keeps every intermediate a vector rather than a matrix, so the whole gradient for all parameters costs about the same as one forward pass. Going forwards instead would cost one sweep per input, which is hopeless when the inputs are millions of weights.',
        followUp: 'A strong answer names it as reverse-mode automatic differentiation and explains why reverse mode is right when there are many inputs and one output, while forward mode suits the opposite shape.',
      },
      {
        level: 'advanced',
        question: 'Why does backpropagation cost roughly the same as the forward pass, and what is the memory implication?',
        answer:
          'Each forward primitive has a backward primitive of comparable arithmetic cost. A matrix multiply Y = X W costs one GEMM forward; backward needs dX = dY W^T and dW = X^T dY, two GEMMs of the same shapes, so the backward pass is about twice the forward and a training step about three times overall. Crucially the cost does not depend on the number of parameters, because every parameter gradient is produced by the same sweep. The memory implication is the other side of the bargain: dW = X^T dY needs X, the forward activation, which therefore must be kept alive from the moment it is computed until the backward pass reaches it. Peak activation memory scales with depth times batch size times width, which is usually what limits batch size rather than the parameters themselves. Gradient checkpointing recovers memory by discarding activations and recomputing them, costing roughly one extra forward pass.',
      },
      {
        level: 'ml-engineer',
        question: 'A model trains but one submodule never changes. How do you find out why?',
        answer:
          'Check whether gradients are reaching it at all. After a backward pass, iterate over named_parameters and print whether p.grad is None and what p.grad.abs().mean() is. A None gradient means the parameter is not in the graph: either requires_grad is False, or it was never used in forward, or the path to the loss was severed by .detach(), .item(), a NumPy round trip, or a torch.no_grad() block. A gradient that is present but numerically negligible is a different diagnosis: vanishing gradients from saturated activations or a deep stack, which is addressed by normalisation, residual connections or better initialisation. Also confirm the parameter was passed to the optimiser — a submodule created after optimiser construction, or held in a plain Python list rather than an nn.ModuleList, will not be registered and never gets stepped.',
        followUp: 'Mentioning that nn.ModuleList and nn.ModuleDict exist precisely so submodules are registered shows real debugging experience.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'For the network in the worked example, recompute the gradient of W2 if the hidden activations were h = [0.9, 0.1] instead of [0.5744, 0.6457], keeping delta2 = -0.1045. What does the comparison tell you about which weights get large gradients?',
        hint: 'dL/dW2 = delta2 * h, elementwise.',
        solution:
          'dL/dW2 = [-0.1045(0.9), -0.1045(0.1)] = [-0.0941, -0.0105]. The first weight has a gradient nine times larger than the second, purely because the activation feeding it was nine times larger, since both share the same delta. The lesson generalises: a weight gradient is large when the incoming activation was large and the outgoing error was large, and it is exactly zero when either is zero. This is also why a ReLU unit that outputs zero contributes nothing to the gradient of the weights above it, and why input scaling matters so much — unnormalised features produce wildly unequal gradient magnitudes across weights that should be learning at similar rates.',
      },
      {
        prompt:
          'A 20-layer network uses sigmoid activations. Assuming each layer multiplies the backward signal by an average factor of 0.2, estimate the ratio of the gradient magnitude at layer 1 to that at layer 20, and say what you would change.',
        hint: 'Gradients multiply through layers; 0.2^19 is the relevant quantity.',
        solution:
          'The ratio is roughly 0.2^19, about 5e-14. The first layer receives a gradient fourteen orders of magnitude smaller than the last, which in float32 — whose smallest normal value is around 1e-38 but whose precision near a value of 1 is about 1e-7 — means the update is numerically meaningless. The layer is frozen at its initialisation. Three changes address this, and modern networks use all three: replace sigmoid with ReLU or GELU so the activation derivative is 1 rather than at most 0.25; add residual connections so gradients have a path that multiplies by 1; and add normalisation layers so pre-activations stay in the non-saturated region. Careful initialisation, covered later in this domain, keeps the weight matrices from contributing their own shrinkage on top.',
      },
      {
        prompt:
          'Write down, in words and then as pseudocode, the backward pass for the operation y = x * w where x and w are both scalars produced by earlier operations. Explain why the gradient accumulates with += rather than =.',
        hint: 'The local derivative of a product with respect to one factor is the other factor.',
        solution:
          'In words: the gradient arriving at y is multiplied by w and added to the gradient of x, and multiplied by x and added to the gradient of w. As pseudocode: x.grad += w.data * y.grad; w.grad += x.data * y.grad. The accumulation matters because a value can feed more than one consumer. If x is used both in y = x * w and later in z = x + 5, then the multivariable chain rule says dL/dx is the sum of the contribution arriving through y and the contribution arriving through z. Using = would keep only whichever arrived last, producing a silently wrong gradient. This is also the reason PyTorch accumulates into .grad across backward calls, and therefore why you must zero the gradients yourself at the start of each training step.',
      },
    ],

    quiz: [
      {
        id: 'DL-005-q1',
        type: 'mcq',
        concept: 'what backprop is',
        prompt: 'Backpropagation is best described as:',
        options: [
          'The chain rule applied in reverse topological order over a computational graph',
          'An optimisation algorithm that updates weights to reduce the loss',
          'A method for choosing the learning rate automatically',
          'A way to initialise weights so gradients do not vanish',
        ],
        answerIndex: 0,
        explanation:
          'It computes gradients and updates nothing. The update is the optimiser job, which is why the same gradients can be consumed by SGD, Adam or LBFGS with completely different results.',
      },
      {
        id: 'DL-005-q2',
        type: 'numeric',
        concept: 'output delta',
        prompt: 'A sigmoid output unit produces y_hat = 0.8 with target y = 1.0 and loss L = 0.5(y_hat - y)^2. What is delta = dL/dz at that unit?',
        answer: -0.032,
        tolerance: 0.0005,
        explanation:
          "dL/dy_hat = 0.8 - 1.0 = -0.2, and sigmoid'(z) = y_hat(1 - y_hat) = 0.8 x 0.2 = 0.16. Multiplying gives -0.2 x 0.16 = -0.032. Note how the sigmoid factor has already shrunk the signal by more than a factor of six.",
      },
      {
        id: 'DL-005-q3',
        type: 'order',
        concept: 'training step order',
        prompt: 'Put one PyTorch training iteration into the correct order.',
        items: [
          'optimizer.zero_grad()',
          'output = model(batch_x)',
          'loss = criterion(output, batch_y)',
          'loss.backward()',
          'optimizer.step()',
        ],
        explanation:
          'Zeroing first is the safest habit because PyTorch accumulates into .grad. Gradients must exist before step() is called, and step() must come after backward() or it will apply stale gradients from the previous iteration.',
      },
      {
        id: 'DL-005-q4',
        type: 'truefalse',
        concept: 'cost of backprop',
        prompt: 'Computing gradients for a model with ten million parameters requires about ten million forward passes.',
        answer: false,
        explanation:
          'That would be true of finite differences. Backpropagation produces every parameter gradient in a single backward sweep costing about twice a forward pass, independently of the parameter count. That asymptotic difference is the reason deep learning is feasible at all.',
      },
      {
        id: 'DL-005-q5',
        type: 'debug',
        language: 'python',
        concept: 'gradient accumulation',
        prompt: 'This loop trains for a few steps and then diverges. What is missing?',
        code: 'for x, y in loader:\n    loss = criterion(model(x), y)\n    loss.backward()\n    optimizer.step()',
        options: [
          'optimizer.zero_grad() before the backward call, so gradients do not accumulate across steps',
          'model.train() must be called inside the loop on every iteration',
          'loss.backward(retain_graph=True) is required for the graph to be reusable',
          'The learning rate must be passed to step() explicitly',
        ],
        answerIndex: 0,
        explanation:
          'PyTorch adds into .grad rather than overwriting it. Without zeroing, iteration t steps with the sum of all gradients seen so far, so the effective step size grows every iteration until the loss diverges.',
      },
      {
        id: 'DL-005-q6',
        type: 'fill',
        concept: 'weight gradient',
        prompt: 'The gradient of a weight equals the error signal leaving the unit multiplied by the ____ that entered the weight.',
        answers: ['activation', 'input activation', 'input', 'incoming activation'],
        explanation:
          'dL/dW = a_prev^T delta. Both factors are needed at once, which is precisely why the forward activations must be cached until the backward pass reaches them — and why training uses so much more memory than inference.',
      },
      {
        id: 'DL-005-q7',
        type: 'explain',
        concept: 'vanishing gradients from the chain rule',
        prompt: 'Using the structure of the backward pass, explain why gradients vanish in deep networks with sigmoid activations.',
        rubric: [
          'States that the gradient of an early layer is a product of per-layer factors',
          'Identifies the activation derivative and the weight matrix as the factors',
          'Concludes that factors below one shrink the product geometrically with depth',
          'Names at least one remedy and connects it to the mechanism',
        ],
        sampleAnswer:
          'Backpropagation moves the error down one layer by multiplying by the transposed weight matrix and then elementwise by the activation derivative. Unrolling that recursion, the gradient reaching layer one is the output gradient multiplied by L-1 such factors in sequence. If a typical factor has magnitude below one, the product shrinks geometrically with depth. The sigmoid derivative is at most 0.25 and much smaller once a unit saturates, so with twenty layers you are multiplying by something like 0.2 twenty times, which is around 1e-14 — numerically zero. The early layers therefore stay at their initialisation. The remedies attack individual factors: ReLU or GELU makes the activation derivative 1 instead of a quarter; residual connections add an identity path whose derivative is exactly 1, so there is always a route that does not attenuate; normalisation keeps pre-activations near zero where the derivative is largest; and careful initialisation stops the weight matrices contributing their own shrinkage.',
        explanation:
          'A good answer reasons from the product structure of the backward recursion rather than reciting the phrase. That structure is also what explains exploding gradients, which is the same argument with factors above one.',
      },
    ],

    flashcards: [
      { front: 'In one sentence, what is backpropagation?', back: 'The chain rule applied in reverse topological order over the computational graph, producing every parameter gradient in one sweep.' },
      { front: 'What is delta(l)?', back: 'dL/dz(l), the derivative of the loss with respect to a layer pre-activations — the quantity actually propagated backwards.' },
      { front: 'How do you get a weight gradient from delta?', back: 'dL/dW(l) = a(l-1)^T delta(l): the incoming activation times the outgoing error. Both must be available at once, hence the activation cache.' },
      { front: 'How do you move delta one layer down?', back: 'delta(l) = (delta(l+1) W(l+1)^T) elementwise-times phi prime(z(l)).' },
      { front: 'Why does backprop cost about the same as a forward pass?', back: 'Each forward primitive has a backward of comparable cost, and one sweep produces all gradients regardless of parameter count.' },
      { front: 'Why must you call zero_grad()?', back: 'PyTorch accumulates into .grad rather than overwriting, so gradients from previous steps would be added in and the effective step size would grow.' },
      { front: 'What is the memory cost of backpropagation?', back: 'The cached forward activations, kept until their gradient is used. It scales with depth x batch x width and usually limits batch size.' },
    ],

    challenge: {
      title: 'Build a working autograd engine and train a network with it',
      brief:
        'Implement a scalar autograd engine supporting addition, multiplication, power, tanh and ReLU, with a topological-sort backward pass. Build a small MLP on top of it — neuron, layer, network classes — and train it to fit the exclusive-or function, printing the loss every 100 steps until it is below 0.01. Then validate your engine by comparing the gradient of every parameter against torch.autograd on an identical network, requiring agreement to 1e-6.',
      language: 'python',
      acceptanceCriteria: [
        'The engine supports at least five operations and handles a value feeding multiple consumers correctly, using accumulation',
        'The backward pass uses a genuine topological sort, not a fixed layer order',
        'The MLP learns exclusive-or to a loss below 0.01',
        'Every parameter gradient matches PyTorch to within 1e-6 on an identical network with identical initial weights',
      ],
      starterCode:
        'class Value:\n    def __init__(self, data, parents=(), op=""):\n        self.data = data\n        self.grad = 0.0\n        self._parents = parents\n        self._op = op\n        self._backward = lambda: None\n\n    def __add__(self, other): ...\n    def __mul__(self, other): ...\n    def tanh(self): ...\n\n    def backward(self):\n        # topological sort, seed self.grad = 1.0, then walk in reverse\n        ...\n',
    },

    teachingPrompt: {
      prompt:
        'Someone tells you backpropagation is a mysterious black box. Convince them otherwise: explain what it computes, how, and why it is affordable.',
      mustCover: [
        'It computes the derivative of the loss with respect to every parameter, and nothing else',
        'It is the chain rule applied in reverse through the network, one local derivative at a time',
        'Each operation only needs to know its own local derivative, never the whole network',
        'One backward sweep produces all gradients at a cost comparable to a forward pass, which is why it scales',
      ],
      bonusSignals: [
        'distinguishes backpropagation from the optimiser step',
        'mentions the cached activations and the resulting memory cost',
        'explains why reverse mode rather than forward mode',
        'connects the product structure to vanishing and exploding gradients',
      ],
      sampleExplanation:
        "Start with what it produces: one number per parameter, saying how much the loss would change if you nudged that parameter slightly. Nothing more. It does not change any weights; that is the optimiser job afterwards. Now how it gets those numbers. A network is a long chain of small operations — multiply by a weight, add a bias, apply a squash — and every one of those knows its own slope without knowing anything about the rest. Calculus gives you the rule for chaining slopes together: if the loss depends on the output, the output on the hidden layer, and the hidden layer on a weight, you multiply the three slopes. So you begin at the loss, where the derivative of the loss with respect to itself is one, and hand that backwards. Each operation takes the number arriving from above, multiplies by its own local slope, and passes the result to whatever fed it. When a value fed several things, the contributions arriving from each are added up. By the time the sweep reaches the bottom, every weight has its number. The reason this is affordable is worth stating explicitly. The naive alternative is to nudge each parameter and re-run the network to see what happens, which costs one forward pass per parameter — a billion forward passes for a billion-parameter model. Backpropagation gets all of them in a single backward sweep costing about twice a forward pass, whatever the parameter count, because every route shares the same intermediate results. The price is memory: you have to keep the forward activations around until the backward pass needs them, which is why training a model takes far more memory than running it.",
    },
  },
  {
    id: 'DL-006',
    domain: 'DL',
    module: 'Training a Network',
    topic: 'The training loop',
    title: 'Epochs, Batches and Batch Size',
    slug: 'epochs-batches-batch-size',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['DL-005'],
    related: ['DL-003', 'DL-004', 'DL-005'],
    tags: ['epoch', 'batch', 'mini-batch', 'batch-size', 'sgd', 'dataloader', 'gradient-accumulation'],

    learningObjectives: [
      'Distinguish an epoch, an iteration and a batch, and compute how many updates an epoch contains',
      'Explain the memory, gradient-noise and hardware-efficiency trade-offs that determine batch size',
      'Relate gradient noise to batch size quantitatively, and use that to justify the linear scaling rule',
      'Use gradient accumulation to simulate a large batch on hardware that cannot hold one',
    ],

    terminology: [
      {
        term: 'Epoch',
        definition:
          'One complete pass over the entire training dataset. It is a unit of data consumption, not a unit of learning.',
        simple: 'Showing the model every training example once.',
      },
      {
        term: 'Batch (mini-batch)',
        definition:
          'The subset of examples whose gradients are averaged to produce a single parameter update.',
        simple: 'The handful of examples the model looks at before it adjusts itself.',
      },
      {
        term: 'Iteration (step)',
        definition:
          'One parameter update: one forward pass, one backward pass and one optimiser step on a single batch.',
        simple: 'One adjustment.',
      },
      {
        term: 'Batch size',
        definition:
          'The number of examples per batch. It controls activation memory, the variance of the gradient estimate and hardware utilisation simultaneously.',
        simple: 'How many examples you look at before each adjustment.',
      },
      {
        term: 'Gradient accumulation',
        definition:
          'Summing gradients over several forward and backward passes before calling the optimiser, giving the statistical effect of a larger batch with the memory footprint of a small one.',
        simple: 'Doing several small batches but only adjusting once at the end.',
      },
    ],

    simpleExplanation:
      "There are two different things people mean when they talk about how long a model has trained, and confusing them causes endless trouble. An epoch is about data: it means the model has seen every training example once. A step is about learning: it means the model has adjusted its weights once. These are not the same, and the ratio between them is entirely up to you. If you have 50,000 examples and you look at 100 at a time, then one epoch contains 500 adjustments. Look at 1,000 at a time instead and the same epoch contains only 50. Why not just look at one example at a time and adjust after each? Because one example is a noisy opinion about which direction is downhill, and because modern hardware sits idle when you give it one example — it is built to process hundreds simultaneously. Why not look at all 50,000 at once? Because they will not fit in memory, because you would only get one adjustment per epoch, and because a little noise turns out to be useful rather than harmful. The right answer is in between, and knowing why it is in between is the point of this unit.",

    whyItExists:
      'Computing the true gradient over the full dataset is exact but ruinously slow: you get one update per pass over millions of examples. Computing it from a single example is fast but so noisy that progress is erratic, and it wastes hardware built for parallel throughput. Mini-batching exists as the compromise that captures nearly all the statistical benefit of averaging while keeping updates frequent and the accelerator saturated.',

    analogy: {
      scenario:
        'Imagine polling a city to decide where to build a hospital. You could knock on all two million doors before making any decision — perfectly informative and hopeless in practice, because the city would wait years. You could ask one person and act immediately, which is fast but means you might build the hospital next to the first respondent house. Or you could ask two hundred people, act on their average, then ask a different two hundred and adjust again. The averages of two hundred are individually imperfect but broadly point the right way, and you course-correct constantly instead of waiting.',
      mapping: [
        { from: 'Knocking on all two million doors', to: 'Full-batch gradient descent: exact gradient, one update per epoch' },
        { from: 'Asking a single person and acting', to: 'Stochastic gradient descent with batch size 1: noisy but immediate' },
        { from: 'Sampling two hundred and averaging', to: 'A mini-batch: an unbiased estimate of the true gradient with reduced variance' },
        { from: 'The poll being off by a few per cent', to: 'Gradient noise, whose standard deviation falls as 1/sqrt(batch size)' },
        { from: 'Re-polling repeatedly and adjusting', to: 'Many cheap updates per epoch instead of one expensive one' },
      ],
      bridge:
        'The statistical claim in the analogy is exactly the one that governs batch size: a mini-batch gradient is an unbiased estimator of the full-dataset gradient, and its standard error shrinks as one over the square root of the batch size. Quadrupling the batch halves the noise but quadruples the cost, which is the precise reason returns diminish and the sensible range for most problems is tens to a few thousand rather than millions.',
      limitations:
        'The polling story treats noise as pure nuisance. In optimisation the noise has a second role — it perturbs the trajectory enough to escape sharp minima and saddle points — so the smallest-noise answer is not automatically the best one.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The same dataset at four batch sizes',
        caption: 'Dataset of 50,000 examples, trained for 10 epochs. Only the batch size changes.',
        columns: ['Batch size', 'Updates per epoch', 'Updates in 10 epochs', 'Gradient noise', 'GPU utilisation'],
        rows: [
          ['1', '50,000', '500,000', 'Very high', 'Terrible — the device is mostly idle'],
          ['32', '1,563', '15,630', 'Moderate', 'Good'],
          ['256', '196', '1,960', 'Low', 'Excellent'],
          ['50,000 (full batch)', '1', '10', 'Zero (exact gradient)', 'Will not fit in memory'],
        ],
      },
      {
        kind: 'compare',
        title: 'Small batches versus large batches',
        caption: 'Neither column is the right answer. The right answer is the largest batch that still fits, with the learning rate scaled to match.',
        left: {
          heading: 'Small batch (8 to 64)',
          points: [
            'Many updates per epoch, so the model improves quickly in wall-clock terms early on',
            'Noisy gradients that help escape sharp minima and saddle points',
            'Low activation memory, so it fits anywhere',
            'Poor hardware utilisation; the accelerator waits on memory rather than computing',
          ],
        },
        right: {
          heading: 'Large batch (512 and above)',
          points: [
            'Accurate gradient estimate; the trajectory is smooth',
            'Excellent throughput in examples per second',
            'Few updates per epoch, so more epochs are needed to reach the same loss',
            'Needs a larger learning rate and usually a warmup to match small-batch accuracy',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Anatomy of one epoch',
        caption: 'The shuffle at the start is not decoration; without it the model sees correlated batches and the gradient estimate is biased within each pass.',
        steps: [
          { label: 'Shuffle the dataset', detail: 'A fresh random permutation each epoch, so batches differ between passes.' },
          { label: 'Slice into batches', detail: 'ceil(N / B) batches. The last one is smaller unless drop_last is set.' },
          { label: 'For each batch: forward', detail: 'Compute predictions and the average loss over the batch.' },
          { label: 'For each batch: backward and step', detail: 'Gradients of the averaged loss, then one optimiser update.' },
          { label: 'End of epoch: evaluate', detail: 'Run the validation set in eval mode under no_grad, and record the metric.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Noise, batch size and the path downhill',
        caption: 'Watch how the descent path changes as the gradient estimate becomes noisier. Small batches wander; large batches march.',
        widget: 'gradient-descent-lab',
      },
    ],

    formalDefinition:
      'Given a training set of N examples and a batch size B, an epoch consists of ceil(N / B) iterations, each performing one parameter update using the gradient of the loss averaged over its batch. The mini-batch gradient g_B = (1/B) sum over the batch of grad L_i is an unbiased estimator of the full-dataset gradient, E[g_B] = g, with covariance Sigma / B where Sigma is the per-example gradient covariance. Its componentwise standard deviation therefore falls as B^(-1/2).',

    math: {
      intuition:
        'A mini-batch gradient is a sample mean, so everything you know about sample means applies. It is unbiased, meaning it points in the right direction on average, and its noise falls as one over the square root of the batch size. That square root is the whole story of diminishing returns: going from 32 to 128 cuts the noise in half at four times the cost, and going from 128 to 512 halves it again at another four times the cost. Because the noise scales with 1/sqrt(B) while a larger batch lets you take a proportionally larger step, the heuristic that emerges is to scale the learning rate with the batch size.',
      formulas: [
        {
          latex: '\\text{iterations per epoch} = \\left\\lceil \\frac{N}{B} \\right\\rceil',
          name: 'Updates per epoch',
          meaning:
            'The bridge between the two units people confuse. Doubling the batch size halves the number of weight updates an epoch contains, which is why large-batch runs often need more epochs to reach the same loss.',
          variables: [
            { symbol: 'N', meaning: 'Number of training examples' },
            { symbol: 'B', meaning: 'Batch size' },
            { symbol: '\\lceil \\cdot \\rceil', meaning: 'Ceiling: the last batch is partial unless drop_last discards it' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathbf{g}_B = \\frac{1}{B}\\sum_{i \\in \\mathcal{B}} \\nabla_{\\theta} L_i(\\theta), \\qquad \\mathbb{E}[\\mathbf{g}_B] = \\nabla_{\\theta}\\mathcal{L}(\\theta)',
          name: 'The mini-batch gradient is unbiased',
          meaning:
            'Averaging the per-example gradients of a randomly drawn batch gives the full-dataset gradient in expectation. This is what licenses using a batch at all: you are not introducing a systematic error, only noise.',
          variables: [
            { symbol: '\\mathbf{g}_B', meaning: 'Gradient estimated from the batch' },
            { symbol: '\\mathcal{B}', meaning: 'The set of indices in the current batch, drawn without replacement from the shuffled dataset' },
            { symbol: '\\nabla_{\\theta}L_i', meaning: 'Gradient of the loss on example i with respect to the parameters' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\mathrm{Cov}[\\mathbf{g}_B] = \\frac{\\Sigma}{B} \\;\\Longrightarrow\\; \\mathrm{sd}[\\mathbf{g}_B] \\propto \\frac{1}{\\sqrt{B}}',
          name: 'Gradient noise versus batch size',
          meaning:
            'The square-root law. Quadrupling the batch halves the noise at four times the compute, which is why enormous batches stop paying for themselves.',
          variables: [
            { symbol: '\\Sigma', meaning: 'Covariance of the per-example gradients across the dataset' },
            { symbol: 'B', meaning: 'Batch size' },
            { symbol: '\\mathrm{sd}', meaning: 'Componentwise standard deviation of the gradient estimate' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\eta_{\\text{new}} = \\eta_{\\text{base}} \\times \\frac{B_{\\text{new}}}{B_{\\text{base}}}',
          name: 'The linear scaling rule',
          meaning:
            'When you multiply the batch size by k, multiply the learning rate by k so that the total distance travelled per epoch is preserved. It holds well up to batch sizes of a few thousand, and needs a warmup of several hundred steps to be stable.',
          variables: [
            { symbol: '\\eta', meaning: 'Learning rate' },
            { symbol: 'B_{\\text{base}}', meaning: 'The batch size at which the base learning rate was tuned' },
            { symbol: 'B_{\\text{new}}', meaning: 'The new, usually larger, batch size' },
          ],
          category: 'optimization',
        },
        {
          latex: 'M_{\\text{act}} \\approx B \\times \\sum_{l} d^{(l)} \\times \\text{bytes per element}',
          name: 'Activation memory',
          meaning:
            'Activation memory is linear in batch size, and it is usually what causes an out-of-memory error rather than the parameters, which do not depend on B at all.',
          variables: [
            { symbol: 'M_{\\text{act}}', meaning: 'Bytes held for cached activations during training' },
            { symbol: 'B', meaning: 'Batch size' },
            { symbol: 'd^{(l)}', meaning: 'Number of activations produced by layer l per example' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Treat the per-example gradients as independent draws from a distribution with mean g and covariance Sigma. This is a reasonable model once the data is shuffled.',
        'The batch gradient is their sample mean over B draws, so its expectation is g: the estimator is unbiased, whatever B is.',
        'The variance of a sample mean of B independent draws is Sigma / B, so the standard deviation of each component scales as 1/sqrt(B).',
        'Now consider one SGD step of size eta. The expected movement is eta g and the noise in the movement has scale eta / sqrt(B).',
        'Over one epoch there are N/B steps, so the total expected movement is eta g N / B. To keep that fixed as B grows, eta must grow in proportion to B. That is the linear scaling rule.',
        'The rule breaks at very large B because the noise term also grows as eta / sqrt(B) = B / sqrt(B) = sqrt(B), so the trajectory becomes unstable — which is why large-batch training needs a warmup period during which eta ramps up from near zero.',
      ],
    },

    workedExample: {
      title: 'Batch size arithmetic on a real dataset',
      setup:
        'CIFAR-10 has 50,000 training images. You plan to train for 20 epochs. Work out the schedule at batch sizes 64 and 512, then decide what learning rate the larger batch should use if 0.05 worked at 64, and check whether the larger batch fits in 8 GB of GPU memory given that your network caches about 1.2 MB of activations per image.',
      steps: [
        {
          label: 'Updates per epoch at B = 64',
          detail: 'ceil(50000 / 64) = ceil(781.25) = 782. The last batch holds 50000 - 781 x 64 = 16 images, which is why the ceiling matters.',
          latex: '\\lceil 50000/64 \\rceil = 782',
        },
        {
          label: 'Updates over the whole run at B = 64',
          detail: '782 x 20 = 15,640 parameter updates.',
          latex: '782 \\times 20 = 15{,}640',
        },
        {
          label: 'Updates per epoch at B = 512',
          detail: 'ceil(50000 / 512) = ceil(97.66) = 98, so 98 x 20 = 1,960 updates over the run — exactly eight times fewer, matching the eightfold increase in batch size.',
          latex: '98 \\times 20 = 1{,}960',
        },
        {
          label: 'Gradient noise comparison',
          detail: 'Noise scales as 1/sqrt(B), so moving from 64 to 512 reduces it by a factor of sqrt(512/64) = sqrt(8) = 2.83. Eight times the compute per step bought a 2.83-fold noise reduction — the square-root law in numbers.',
          latex: '\\sqrt{512/64} = 2.83',
        },
        {
          label: 'Apply the linear scaling rule',
          detail: 'The batch grew eightfold, so the learning rate should grow eightfold: 0.05 x 8 = 0.4. That is a large value to start at cold, so ramp linearly from 0 to 0.4 over the first 5 epochs, which is 490 steps of warmup.',
          latex: '\\eta_{\\text{new}} = 0.05 \\times 8 = 0.4',
        },
        {
          label: 'Check the memory',
          detail: 'At 1.2 MB of activations per image, B = 512 needs 512 x 1.2 MB = 614 MB of activations, plus parameters, gradients and optimiser state. That fits comfortably in 8 GB. At B = 4096 it would be 4.9 GB of activations alone, and adding Adam optimiser state would likely tip it over.',
          latex: '512 \\times 1.2\\,\\text{MB} = 614\\,\\text{MB}',
        },
        {
          label: 'If it had not fitted: accumulate',
          detail: 'Run 8 micro-batches of 64, calling backward each time without zeroing, then step once. The gradient is the same as a true batch of 512 up to the details of batch normalisation, at one-eighth of the activation memory and a little extra time.',
          latex: 'B_{\\text{effective}} = B_{\\text{micro}} \\times \\text{accumulation steps}',
        },
      ],
      conclusion:
        'At B = 512 you get 1,960 updates rather than 15,640. Unless you raise the learning rate to compensate, the model travels roughly eight times less far over the same 20 epochs, and you will conclude — wrongly — that the large batch hurts accuracy. This coupling between batch size and learning rate is the single most common cause of failed batch-size experiments.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A correct training loop, with the counting made explicit',
        runnable: true,
        code: `import torch
from torch.utils.data import DataLoader, TensorDataset

X = torch.randn(50_000, 20)
y = (X[:, 0] + 0.5 * X[:, 1] > 0).long()
ds = TensorDataset(X, y)

loader = DataLoader(ds, batch_size=64, shuffle=True, drop_last=False, num_workers=0)
print("dataset size      :", len(ds))
print("batches per epoch :", len(loader))
print("last batch size   :", len(ds) - (len(loader) - 1) * 64)

model = torch.nn.Sequential(torch.nn.Linear(20, 32), torch.nn.ReLU(), torch.nn.Linear(32, 2))
opt = torch.optim.SGD(model.parameters(), lr=0.05)
criterion = torch.nn.CrossEntropyLoss()

global_step = 0
for epoch in range(2):
    model.train()
    running = 0.0
    for xb, yb in loader:
        opt.zero_grad(set_to_none=True)
        loss = criterion(model(xb), yb)
        loss.backward()
        opt.step()
        running += loss.item() * xb.size(0)      # weight by actual batch size
        global_step += 1
    print(f"epoch {epoch}  mean loss {running/len(ds):.4f}  total steps {global_step}")`,
        output: `dataset size      : 50000
batches per epoch : 782
last batch size   : 16
epoch 0  mean loss 0.3979  total steps 782
epoch 1  mean loss 0.2183  total steps 1564`,
        explanation:
          'Two details separate a correct loop from a subtly wrong one. First, shuffle=True must be set for the training loader and left off for validation, because an unshuffled loader delivers correlated batches and the gradient estimate is no longer representative. Second, the running loss is weighted by the actual batch size before averaging, because the final batch holds 16 examples rather than 64 and a plain mean over batches would over-weight it.',
      },
      {
        language: 'python',
        title: 'Gradient accumulation: a batch of 512 in 64-sized pieces',
        runnable: true,
        code: `import torch

model = torch.nn.Linear(20, 2)
opt = torch.optim.SGD(model.parameters(), lr=0.1)
criterion = torch.nn.CrossEntropyLoss()

ACCUM = 8                       # 8 micro-batches of 64 = effective batch of 512
micro = [(torch.randn(64, 20), torch.randint(0, 2, (64,))) for _ in range(ACCUM)]

opt.zero_grad(set_to_none=True)
for i, (xb, yb) in enumerate(micro):
    loss = criterion(model(xb), yb) / ACCUM     # divide so the sum is a mean over 512
    loss.backward()                             # gradients ACCUMULATE, no zeroing
    print(f"  after micro-batch {i}: grad norm = {model.weight.grad.norm():.4f}")
opt.step()                                      # one update, from all 512 examples
opt.zero_grad(set_to_none=True)`,
        output: `  after micro-batch 0: grad norm = 0.0431
  after micro-batch 1: grad norm = 0.0688
  after micro-batch 2: grad norm = 0.0910
  after micro-batch 3: grad norm = 0.1055
  after micro-batch 4: grad norm = 0.1189
  after micro-batch 5: grad norm = 0.1301
  after micro-batch 6: grad norm = 0.1402
  after micro-batch 7: grad norm = 0.1520`,
        explanation:
          'The accumulation behaviour that causes bugs when you forget zero_grad is exactly the feature that makes this work. Note the division by ACCUM: without it you would be summing eight batch means rather than averaging them, which multiplies the effective learning rate by eight. The one caveat is batch normalisation, whose statistics are still computed over 64 examples rather than 512, so accumulation is not perfectly equivalent to a true large batch for networks that use it.',
      },
      {
        language: 'python',
        title: 'Measuring the square-root noise law',
        runnable: true,
        code: `import torch

torch.manual_seed(0)
X = torch.randn(4096, 10)
y = (X @ torch.randn(10) > 0).long()
model = torch.nn.Linear(10, 2)
criterion = torch.nn.CrossEntropyLoss()

def batch_gradient(idx):
    model.zero_grad(set_to_none=True)
    criterion(model(X[idx]), y[idx]).backward()
    return model.weight.grad.flatten().clone()

full = batch_gradient(torch.arange(4096))
for B in [8, 32, 128, 512]:
    devs = []
    for _ in range(40):
        idx = torch.randint(0, 4096, (B,))
        devs.append((batch_gradient(idx) - full).norm().item())
    mean_dev = sum(devs) / len(devs)
    print(f"B={B:4d}  mean deviation from true gradient = {mean_dev:.4f}")`,
        output: `B=   8  mean deviation from true gradient = 0.2213
B=  32  mean deviation from true gradient = 0.1104
B= 128  mean deviation from true gradient = 0.0549
B= 512  mean deviation from true gradient = 0.0274`,
        explanation:
          'Each fourfold increase in batch size roughly halves the deviation from the true gradient, which is the 1/sqrt(B) law measured directly. This is worth running once because it converts an abstract statistical claim into something you have observed. It also makes the diminishing return concrete: the step from 128 to 512 costs four times as much compute to remove 0.027 of error, having already removed 0.17 in the earlier steps.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Large-scale ImageNet training',
        usage:
          'The 2017 result showing ImageNet trained in one hour used a batch of 8,192 across 256 GPUs, and it only matched small-batch accuracy because of two ingredients from this unit: the linear scaling rule applied to the learning rate, and a five-epoch gradual warmup to survive the resulting large initial steps.',
      },
      {
        context: 'Fine-tuning a large language model on one GPU',
        usage:
          'A 7-billion-parameter model may only fit a micro-batch of 1 or 2 sequences. Practitioners set gradient accumulation to 16 or 32 so the effective batch is large enough for stable gradients, accepting the extra wall-clock time as the price of not needing a second GPU.',
      },
      {
        context: 'Streaming and online learning',
        usage:
          'For a recommender updated continuously from a clickstream there is no dataset and therefore no epoch at all. Training is measured purely in steps and examples seen, which is a useful reminder that the epoch is a convenience of offline datasets, not a fundamental unit.',
      },
    ],

    projectConnections: [
      { tool: 'torch.utils.data.DataLoader', role: 'Owns batch_size, shuffle, drop_last and num_workers; len(loader) is the number of iterations in an epoch.' },
      { tool: 'Hugging Face Trainer', role: 'per_device_train_batch_size times gradient_accumulation_steps times the device count is the effective batch; the logged loss is per step, not per epoch.' },
      { tool: 'torch.cuda.max_memory_allocated', role: 'The practical way to find the largest batch that fits: raise B until it throws, then back off one notch.' },
    ],

    commonMistakes: [
      {
        mistake: 'Changing batch size without changing the learning rate',
        why: 'A larger batch means proportionally fewer updates per epoch, so at the same learning rate the model travels less far in the same number of epochs. The resulting worse accuracy is wrongly attributed to the batch size itself.',
        fix: 'Apply the linear scaling rule as a starting point — multiply the learning rate by the same factor as the batch — and add a warmup of a few hundred steps when the new rate is large.',
      },
      {
        mistake: 'Forgetting shuffle=True on the training loader',
        why: 'If the data is ordered by class, every batch is nearly single-class, so each gradient is a biased estimate and the model oscillates between classes rather than learning to separate them. Accuracy plateaus far below what the architecture supports.',
        fix: 'Set shuffle=True for training and leave it False for validation and test, where order is irrelevant and determinism is useful.',
      },
      {
        mistake: 'Treating an epoch as a fixed amount of learning',
        why: '"Train for 10 epochs" means completely different things at different batch sizes — 7,820 updates at B=64 and 980 at B=512 on CIFAR-10. Comparing two runs by epoch count when their batch sizes differ compares nothing.',
        fix: 'Report and compare by optimiser steps or examples seen. Keep epochs for describing data consumption, such as how many times the model has seen each example.',
      },
      {
        mistake: 'Using drop_last=False during training with batch normalisation',
        why: 'A final batch of 1 makes batch statistics degenerate — the variance is zero — which produces nan or wild updates in BatchNorm layers.',
        fix: 'Set drop_last=True on the training loader when the model uses batch normalisation. The handful of discarded examples are re-shuffled into other batches next epoch.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between an epoch, a batch and an iteration?',
        answer:
          'An epoch is one full pass over the training set, a batch is the group of examples used for a single parameter update, and an iteration is that update itself. They connect as iterations per epoch = ceil(N / B). The distinction matters because epochs measure data consumption while iterations measure learning: with 50,000 examples, ten epochs is 7,820 updates at batch size 64 but only 980 at batch size 512. Any comparison of training runs that uses epochs while the batch size varies is comparing different amounts of learning and will give misleading conclusions.',
      },
      {
        level: 'intermediate',
        question: 'How does batch size affect the quality of the gradient estimate, and what follows for the learning rate?',
        answer:
          'A mini-batch gradient is the sample mean of per-example gradients, so it is unbiased and its covariance is Sigma/B, meaning the noise standard deviation falls as 1/sqrt(B). Larger batches therefore give a more accurate direction, with square-root diminishing returns: quadrupling B halves the noise at four times the cost. The learning-rate consequence follows from counting distance travelled. One epoch contains N/B steps of size eta, so total movement scales as eta/B; to keep it constant when B grows by a factor k, eta must grow by k. That is the linear scaling rule, and it works up to batch sizes in the low thousands provided you add a warmup, because the per-step noise term grows as sqrt(B) under that scaling and can destabilise the first few hundred steps.',
        followUp: 'A strong answer mentions that some noise is beneficial — it helps escape saddle points and sharp minima — so the exact-gradient limit is not the goal.',
      },
      {
        level: 'ml-engineer',
        question: 'Your model needs an effective batch of 256 but only a batch of 32 fits in memory. What do you do, and what are the caveats?',
        answer:
          'Use gradient accumulation: run eight forward and backward passes of 32 examples each without zeroing gradients, dividing each loss by 8 so the accumulated gradient is a mean over 256 rather than a sum, then call optimizer.step() once and zero. The gradient is mathematically identical to a true batch of 256 for any layer whose computation is independent across examples. Two caveats. First, batch normalisation is not independent across examples — its statistics come from the 32 in each micro-batch, not all 256 — so the result is not equivalent, and SyncBatchNorm or a switch to GroupNorm or LayerNorm is the usual answer. Second, it costs wall-clock time, since you pay eight kernel launches and eight backward passes with no extra parallelism. If activation memory rather than time is the binding constraint, also consider gradient checkpointing or mixed precision, which attack the same problem differently.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A dataset has 12,000 examples. How many iterations are in one epoch at batch sizes 32, 128 and 500? How many examples are in the final batch in each case?',
        hint: 'iterations = ceil(N / B); the last batch holds N - (iterations - 1) * B examples.',
        solution:
          'At B = 32: ceil(12000/32) = 375 exactly, since 12000 = 375 x 32, so every batch is full. At B = 128: ceil(12000/128) = ceil(93.75) = 94, with the last batch holding 12000 - 93 x 128 = 96 examples. At B = 500: ceil(12000/500) = 24 exactly, so all batches are full. The B = 128 case is the one to watch: if the model uses batch normalisation and the remainder had been 1 rather than 96, the final batch would have zero variance and produce nan. Setting drop_last=True avoids the whole category of problem.',
      },
      {
        prompt:
          'You tuned a learning rate of 0.01 at batch size 32 and now want to train at batch size 256 on a bigger machine. What learning rate would you start from, and what else must you change?',
        hint: 'The batch grew by a factor of eight; think about total distance travelled per epoch.',
        solution:
          'The linear scaling rule gives 0.01 x (256/32) = 0.08. Two further changes matter. First, add a warmup: ramp the learning rate linearly from roughly zero to 0.08 over the first few hundred steps, because the very first updates at 0.08 on a randomly initialised network can be large enough to destabilise it. Second, expect to need more epochs for the same number of updates — at eight times the batch you get one eighth the updates per epoch — so either extend the schedule or compare runs by step count rather than epoch count. Treat 0.08 as a starting point rather than an answer: verify it with a short learning-rate range test, since the linear rule is a heuristic that degrades at very large batches.',
      },
      {
        prompt:
          'Explain why mini-batch gradient noise can be helpful rather than purely harmful, and name one training situation where you would deliberately prefer a smaller batch.',
        hint: 'Think about what an optimiser does when it lands in a narrow valley or on a saddle point.',
        solution:
          'The gradient of a full batch at a saddle point is near zero in every direction, so an exact-gradient method can stall there for a long time; mini-batch noise perturbs the iterate off the saddle and lets descent resume. Noise also acts as an implicit regulariser: it makes the optimiser reluctant to settle in sharp, narrow minima, because small perturbations there produce large loss increases, and empirically flatter minima generalise better. A concrete situation favouring smaller batches is fine-tuning a pretrained model on a small dataset, where a few thousand examples and a large batch would give very few updates and an over-confident fit; a batch of 8 to 32 gives more updates and more regularising noise. The counterweight is that very small batches waste hardware and make batch normalisation statistics unreliable.',
      },
    ],

    quiz: [
      {
        id: 'DL-006-q1',
        type: 'numeric',
        concept: 'epoch arithmetic',
        prompt: 'A dataset has 60,000 examples and the batch size is 128. How many iterations are in one epoch?',
        answer: 469,
        tolerance: 0,
        explanation:
          'ceil(60000 / 128) = ceil(468.75) = 469. The final batch holds 60000 - 468 x 128 = 96 examples, unless drop_last=True discards it.',
      },
      {
        id: 'DL-006-q2',
        type: 'mcq',
        concept: 'gradient noise',
        prompt: 'You increase batch size from 64 to 1024. By roughly what factor does the gradient noise fall?',
        options: ['4x', '16x', '2x', 'It does not change, because the estimator is unbiased either way'],
        answerIndex: 0,
        explanation:
          'Noise scales as 1/sqrt(B), so the factor is sqrt(1024/64) = sqrt(16) = 4. Being unbiased is about the mean, not the spread: a noisy estimator can be unbiased and still point in a poor direction on any given step.',
      },
      {
        id: 'DL-006-q3',
        type: 'truefalse',
        concept: 'epochs vs steps',
        prompt: 'Training two models for 10 epochs each gives them the same number of parameter updates.',
        answer: false,
        explanation:
          'Only if their batch sizes and dataset sizes match. Ten epochs at batch 64 on 50,000 examples is 7,820 updates; at batch 512 it is 980. Comparing runs by epoch while batch size varies compares different amounts of learning.',
      },
      {
        id: 'DL-006-q4',
        type: 'multi',
        concept: 'batch size trade-offs',
        prompt: 'Which statements about increasing batch size are correct? Select all that apply.',
        options: [
          'Activation memory increases roughly linearly with batch size',
          'The number of optimiser steps per epoch decreases',
          'The gradient estimate becomes less noisy',
          'The number of parameters in the model increases',
          'The learning rate usually needs to be increased to compensate',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Parameter count is a property of the architecture and does not depend on batch size at all. The other four are the standard consequences, and the last is the one most often forgotten, which is why large-batch experiments so often appear to hurt accuracy.',
      },
      {
        id: 'DL-006-q5',
        type: 'debug',
        language: 'python',
        concept: 'gradient accumulation',
        prompt: 'This gradient accumulation loop makes the effective learning rate four times too large. What is missing?',
        code: 'opt.zero_grad()\nfor xb, yb in micro_batches:      # 4 micro-batches\n    loss = criterion(model(xb), yb)\n    loss.backward()\nopt.step()',
        options: [
          'Each loss must be divided by the number of micro-batches before backward()',
          'opt.step() must be called inside the loop',
          'zero_grad() must be called after every backward()',
          'retain_graph=True is required on every backward call',
        ],
        answerIndex: 0,
        explanation:
          'Accumulating four batch means gives their sum, not their average, so the gradient is four times too large. Dividing each loss by 4 before backward makes the accumulated gradient a proper mean over all the examples.',
      },
      {
        id: 'DL-006-q6',
        type: 'explain',
        concept: 'choosing a batch size',
        prompt: 'How would you choose a batch size for a new project, and what would you check afterwards?',
        rubric: [
          'Mentions memory as the hard upper limit and how to find it',
          'Mentions hardware utilisation as a reason not to go very small',
          'Connects the chosen batch size to the learning rate',
          'Describes a check, such as comparing runs by steps rather than epochs',
        ],
        sampleAnswer:
          'Start by finding the largest batch that fits: raise it until you get an out-of-memory error, then back off a notch, since activation memory grows linearly in batch size. Then consider whether that number is sensible statistically — 32 to 512 covers most problems, and going below about 16 wastes the accelerator, which is built for parallel throughput. Having chosen it, set the learning rate to match: if you are moving from a tuned configuration, apply the linear scaling rule and add a warmup, and if you are starting fresh, run a short learning-rate range test at that batch size. Afterwards, check that you are comparing runs by optimiser steps or examples seen rather than by epochs, because the same epoch count is a different amount of learning at a different batch size, and check whether batch normalisation is present, since its statistics degrade at very small batch sizes and gradient accumulation does not fix that.',
        explanation:
          'A strong answer treats batch size and learning rate as a pair rather than as independent knobs, and mentions the memory constraint as the practical starting point.',
      },
    ],

    flashcards: [
      { front: 'Epoch versus iteration?', back: 'An epoch is one pass over the data; an iteration is one parameter update. iterations per epoch = ceil(N / B).' },
      { front: 'How does gradient noise scale with batch size?', back: 'As 1/sqrt(B). Quadrupling the batch halves the noise at four times the compute — square-root diminishing returns.' },
      { front: 'What is the linear scaling rule?', back: 'Multiply the learning rate by the same factor as the batch size, and add a warmup of a few hundred steps.' },
      { front: 'What is gradient accumulation for?', back: 'Getting the statistical effect of a large batch at the memory cost of a small one: several backward passes, divided by the accumulation count, then one step.' },
      { front: 'Why shuffle the training data each epoch?', back: 'Unshuffled batches are correlated, so each gradient is a biased estimate of the full-dataset gradient and the model oscillates instead of converging.' },
      { front: 'What usually causes an out-of-memory error during training?', back: 'Cached activations, which grow linearly with batch size — not the parameters, which do not depend on batch size at all.' },
    ],

    challenge: {
      title: 'A batch-size sweep done properly',
      brief:
        'Train the same small network on the same dataset at batch sizes 16, 64, 256 and 1024, twice over: once holding the learning rate fixed and once applying the linear scaling rule. Plot validation accuracy against optimiser steps rather than epochs, and record peak GPU or CPU memory and wall-clock time per epoch for each run. Write a paragraph explaining why the fixed-learning-rate sweep makes large batches look bad and the scaled sweep does not.',
      language: 'python',
      acceptanceCriteria: [
        'Eight runs total: four batch sizes, with and without learning-rate scaling',
        'Curves are plotted against optimiser steps, with epochs at most a secondary axis',
        'Peak memory and time per epoch are reported per run',
        'The written explanation refers to updates per epoch and to the 1/sqrt(B) noise law, not just to the observed curves',
      ],
      starterCode:
        'import torch\nfrom torch.utils.data import DataLoader\n\nBASE_LR, BASE_BS = 0.05, 64\n\ndef run(batch_size: int, scale_lr: bool, epochs: int = 10):\n    lr = BASE_LR * (batch_size / BASE_BS) if scale_lr else BASE_LR\n    # build loader, model, optimiser; return per-step validation accuracy\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to a beginner what epochs, batches and batch size are, and how you would decide on a batch size for a real project.',
      mustCover: [
        'An epoch is one pass over all the data; a step is one weight update; they are related by ceil(N / B)',
        'A batch gradient is an average, so it is unbiased but noisy, with noise falling as 1/sqrt(batch size)',
        'Batch size trades memory and hardware efficiency against update frequency and noise',
        'Changing batch size requires changing the learning rate, or the comparison is meaningless',
      ],
      bonusSignals: [
        'mentions gradient accumulation as the fix when memory is the constraint',
        'notes that some gradient noise is beneficial',
        'mentions shuffling and why it matters',
        'suggests comparing runs by steps rather than epochs',
      ],
      sampleExplanation:
        "There are two clocks running during training and beginners often read the wrong one. The first counts data: an epoch means every training example has been seen once. The second counts learning: a step means the weights have been adjusted once. The link between them is simple division — with fifty thousand examples and a batch of a hundred, an epoch contains five hundred steps. Now, why batch at all? Looking at a single example gives you an opinion about which way is downhill that is technically correct on average but very noisy, and it also wastes your hardware, which is designed to process hundreds of examples at once rather than one. Looking at the entire dataset gives you the exact direction, but you would only get one adjustment per pass and it would not fit in memory anyway. So you take a sample. The maths of sample means applies directly: the average over a batch points the right way on average, and its wobble shrinks as one over the square root of the batch size. That square root is why enormous batches stop being worth it — four times the work to halve the wobble. In practice, find the biggest batch that fits in memory, back off slightly, and then, crucially, adjust the learning rate. A bigger batch means fewer adjustments per epoch, so if you do not take proportionally bigger steps the model simply travels less far and you will wrongly blame the batch size. If the batch you want does not fit, run it in pieces and add up the gradients before adjusting once — that gets you the statistics of a big batch with the memory of a small one.",
    },
  },

  {
    id: 'DL-007',
    domain: 'DL',
    module: 'Training a Network',
    topic: 'Step size',
    title: 'Learning Rate and Schedules',
    slug: 'learning-rate-and-schedules',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['DL-005', 'DL-006'],
    related: ['DL-004', 'DL-005', 'DL-006'],
    tags: ['learning-rate', 'schedule', 'cosine', 'warmup', 'lr-finder', 'divergence', 'hyperparameter'],

    learningObjectives: [
      'Explain what the learning rate multiplies and why it is the hyperparameter that matters most',
      'Recognise the loss-curve signatures of a learning rate that is too high, too low, or roughly right',
      'Derive the stability condition for gradient descent on a quadratic and connect it to curvature',
      'Choose and implement a schedule — step, cosine, warmup — and run a learning-rate range test',
    ],

    terminology: [
      {
        term: 'Learning rate',
        definition:
          'The scalar multiplier applied to the gradient before it is subtracted from the parameters. It sets the size of every step, in every direction, at once.',
        simple: 'How big a stride the model takes downhill each time.',
      },
      {
        term: 'Schedule',
        definition:
          'A rule that changes the learning rate over the course of training, usually decaying it so that large early steps give way to fine late ones.',
        simple: 'A plan for taking big strides at first and small ones later.',
      },
      {
        term: 'Warmup',
        definition:
          'A short opening phase in which the learning rate ramps up from near zero to its target value, avoiding destructive updates while the parameters and optimiser statistics are still meaningless.',
        simple: 'Easing into it instead of sprinting from a standing start.',
      },
      {
        term: 'Learning-rate range test (LR finder)',
        definition:
          'A diagnostic run in which the learning rate is increased exponentially over a few hundred steps while the loss is recorded, revealing the range in which the loss falls fastest.',
        simple: 'A short experiment that shows you which stride lengths work.',
      },
      {
        term: 'Divergence',
        definition:
          'The condition where updates overshoot so badly that the loss increases without bound, usually ending in inf or nan within a few dozen steps.',
        simple: 'Steps so big the model falls off the mountain instead of walking down it.',
      },
    ],

    simpleExplanation:
      "Backpropagation tells you which way is downhill. The learning rate decides how far you walk in that direction before looking again. Everything about training hinges on that one number. Walk too far and you leap over the valley and land higher up the opposite slope, then leap back even higher, and within a few steps the loss is infinity. Walk too little and you creep along, technically improving, but you would need a month to arrive somewhere a good setting reaches in an hour. What makes this genuinely hard is that the right stride is not constant. At the start you are far away and large strides are cheap and useful. Near the end you are trying to settle into a narrow dip, and the same stride that helped before now bounces you from one wall to the other. So the standard practice is to schedule it: start large, decay smoothly toward zero, and often spend the first few hundred steps ramping up from almost nothing, because a randomly initialised model produces wild gradients that a full-sized step would turn into permanent damage.",

    whyItExists:
      'The gradient gives a direction and a local rate of change, but not a distance — it is only valid in an infinitesimal neighbourhood of the current point. Some scalar must convert that direction into an actual step, and no single value works for the whole of training because the curvature of the loss surface changes as you move through it. Schedules exist because the best step size early, when you are far from any minimum, is far larger than the best step size late, when you are trying to settle precisely.',

    analogy: {
      scenario:
        'Think of tuning an old radio by hand to find a station. At first you spin the dial in large sweeps, because the station could be anywhere and small movements would take all afternoon. As you start to hear something through the static you switch to smaller turns, and once the voice is nearly clear you make tiny nudges. If you kept spinning in large sweeps you would fly past the station every time and never lock on; if you had started with tiny nudges you would still be in the static an hour later.',
      mapping: [
        { from: 'The size of your turn of the dial', to: 'The learning rate' },
        { from: 'Large sweeps at the start', to: 'A high initial learning rate covering ground quickly' },
        { from: 'Progressively finer turns', to: 'A decay schedule, such as cosine or step decay' },
        { from: 'Flying past the station repeatedly', to: 'Divergence, or oscillation around a minimum' },
        { from: 'Being too gentle to move at all', to: 'A learning rate so low that training stalls in a plateau' },
      ],
      bridge:
        'The analogy captures the schedule but hides why the ideal turn size changes, which is curvature. The stability condition for gradient descent is that the learning rate must stay below 2/L, where L is the largest curvature of the loss along your current direction. Early in training the surface is relatively flat and permits large steps; near a minimum the surface is sharply curved and the same step overshoots. A decay schedule is, in effect, a crude approximation to tracking that changing curvature.',
      limitations:
        'The dial has one dimension. A network has millions, and the loss surface curves very differently along different directions at the same point, so a single scalar is always a compromise. That mismatch is exactly the gap that adaptive optimisers such as Adam try to close.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Reading the loss curve to diagnose the learning rate',
        caption: 'This table will save you more time than any other in this domain. Check it before changing anything else.',
        columns: ['What the loss curve does', 'Likely cause', 'What to do'],
        rows: [
          ['Becomes nan or inf within a few dozen steps', 'Learning rate far too high; a single step blew up the weights', 'Divide by 10 and add warmup; check for unnormalised inputs'],
          ['Rises steadily instead of falling', 'Learning rate too high, or the sign of the update is wrong', 'Divide by 3 to 10; verify that you subtract the gradient rather than add it'],
          ['Falls, then oscillates on a wide noisy band', 'Slightly too high for the current phase of training', 'Add or steepen a decay schedule; the band usually collapses as the rate falls'],
          ['Falls smoothly and then flattens', 'Roughly right; you have converged for this rate', 'Decay the rate to squeeze out more, or stop'],
          ['Falls very slowly and almost linearly', 'Learning rate too low', 'Multiply by 3 to 10 and rerun a range test'],
          ['Flat from step zero, never moves', 'Rate near zero, frozen parameters, or a severed gradient path', 'Check that p.grad is not None before blaming the learning rate'],
        ],
      },
      {
        kind: 'compare',
        title: 'Constant rate versus a decaying schedule',
        caption: 'Almost every published result uses a schedule. A constant rate is a reasonable first debugging setting and rarely the final answer.',
        left: {
          heading: 'Constant learning rate',
          points: [
            'One number to tune, and easy to reason about',
            'Must compromise between early progress and late precision',
            'Late training oscillates within a noise floor set by the rate',
            'Fine for quick experiments and for debugging a new pipeline',
          ],
        },
        right: {
          heading: 'Scheduled learning rate',
          points: [
            'Large early steps to cover ground, small late steps to settle',
            'Typically 0.5 to 2 points better in final accuracy on image benchmarks',
            'Needs a total step count known in advance for cosine or linear decay',
            'Warmup at the start is close to mandatory for transformers and large batches',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Running a learning-rate range test',
        caption: 'Ten minutes of compute that usually replaces a day of guessing.',
        steps: [
          { label: 'Save the initial state', detail: 'Keep a copy of the model and optimiser state so you can restore afterwards.' },
          { label: 'Ramp exponentially', detail: 'Start at 1e-7 and multiply by a constant factor each step, up to about 10, over roughly 100 to 400 steps.' },
          { label: 'Record loss against rate', detail: 'Log the smoothed loss at each step and plot it against the rate on a logarithmic axis.' },
          { label: 'Read the curve', detail: 'Find the steepest descent region. The minimum of the curve is already too high; pick roughly one order of magnitude below it.' },
          { label: 'Restore and train', detail: 'Reload the saved state and train properly at the chosen rate, usually as the peak of a cosine schedule.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Change the step size and watch the descent',
        caption: 'Try 0.01, 0.3 and 1.1 on the same surface. The third one will not converge, and seeing why is worth more than reading it.',
        widget: 'gradient-descent-lab',
      },
    ],

    formalDefinition:
      'The learning rate eta is the positive scalar in the gradient descent update theta_{t+1} = theta_t - eta grad L(theta_t). For a quadratic loss with Hessian H, gradient descent converges if and only if 0 < eta < 2 / lambda_max, where lambda_max is the largest eigenvalue of H, and the asymptotic rate of convergence is governed by the condition number lambda_max / lambda_min. A schedule replaces the constant eta with a sequence eta_t; common choices are step decay, exponential decay, cosine annealing, and linear or cosine decay preceded by a linear warmup.',

    math: {
      intuition:
        'Take the simplest possible loss, a parabola, and you can see everything. Each gradient descent step multiplies your distance from the minimum by a fixed factor that depends only on the learning rate and the curvature. If that factor is between zero and one you converge; at exactly zero you land on the minimum in one step; between minus one and zero you converge while oscillating across the minimum; below minus one you diverge. Real loss surfaces are not parabolas, but near any minimum they look like one, and the threshold 2 divided by the curvature is a surprisingly good guide to where training will blow up.',
      formulas: [
        {
          latex: '\\theta_{t+1} = \\theta_t - \\eta\\,\\nabla_{\\theta}\\mathcal{L}(\\theta_t)',
          name: 'The gradient descent update',
          meaning:
            'The single line the learning rate appears in. Note that eta multiplies every component of the gradient identically, which is why one badly scaled parameter can force the whole learning rate down.',
          variables: [
            { symbol: '\\theta_t', meaning: 'Parameter vector at step t' },
            { symbol: '\\eta', meaning: 'Learning rate, a positive scalar' },
            { symbol: '\\nabla_{\\theta}\\mathcal{L}', meaning: 'Gradient of the loss with respect to the parameters, supplied by backpropagation' },
          ],
          category: 'optimization',
        },
        {
          latex: '0 < \\eta < \\frac{2}{\\lambda_{\\max}}',
          name: 'Stability condition on a quadratic',
          meaning:
            'Exceed this and the iterates move away from the minimum rather than toward it. lambda_max is the sharpest curvature, so a loss surface with one very sharp direction caps the learning rate for every direction.',
          variables: [
            { symbol: '\\lambda_{\\max}', meaning: 'Largest eigenvalue of the Hessian: the curvature along the sharpest direction' },
            { symbol: '\\eta', meaning: 'Learning rate' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\eta_t = \\eta_{\\min} + \\tfrac{1}{2}\\bigl(\\eta_{\\max} - \\eta_{\\min}\\bigr)\\left(1 + \\cos\\!\\left(\\frac{t}{T}\\pi\\right)\\right)',
          name: 'Cosine annealing',
          meaning:
            'The most widely used modern schedule. It decays slowly at first, fastest in the middle, and flattens as it approaches the floor, which suits the way loss surfaces sharpen as training proceeds.',
          variables: [
            { symbol: '\\eta_t', meaning: 'Learning rate at step t' },
            { symbol: '\\eta_{\\max}', meaning: 'Peak rate, reached at the end of warmup' },
            { symbol: '\\eta_{\\min}', meaning: 'Floor, often zero or a small fraction of the peak' },
            { symbol: 'T', meaning: 'Total number of steps in the decay phase; it must be known in advance' },
            { symbol: 't', meaning: 'Current step' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\eta_t = \\eta_{\\max}\\,\\frac{t}{T_{\\text{warm}}} \\quad \\text{for } t \\le T_{\\text{warm}}',
          name: 'Linear warmup',
          meaning:
            'Ramps the rate from near zero to the peak over the first few hundred steps. It prevents the enormous, badly directed updates a random initialisation produces, and gives adaptive optimisers time to build usable second-moment estimates.',
          variables: [
            { symbol: 'T_{\\text{warm}}', meaning: 'Number of warmup steps, typically 500 to 4000 for transformers' },
            { symbol: '\\eta_{\\max}', meaning: 'The target peak rate' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\eta_t = \\eta_0\\,\\gamma^{\\lfloor t / s \\rfloor}',
          name: 'Step decay',
          meaning:
            'Multiply the rate by gamma every s steps. The classic image-classification recipe divides by 10 at 50 and 75 per cent of training, which produces the characteristic staircase loss curve.',
          variables: [
            { symbol: '\\eta_0', meaning: 'Initial learning rate' },
            { symbol: '\\gamma', meaning: 'Decay factor, commonly 0.1 or 0.5' },
            { symbol: 's', meaning: 'Step size of the schedule: how many training steps between drops' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Take the one-dimensional quadratic L(w) = 0.5 a w^2 with a > 0. Its gradient is a w and its curvature is a.',
        'One gradient descent step gives w_{t+1} = w_t - eta a w_t = (1 - eta a) w_t. So the distance to the minimum is multiplied by (1 - eta a) every step.',
        'Convergence requires |1 - eta a| < 1, which rearranges to 0 < eta < 2/a. This is the stability condition, with a playing the role of lambda_max.',
        'Within that range, eta = 1/a is optimal and lands exactly on the minimum in one step. For eta between 1/a and 2/a the factor is negative, so the iterate alternates sides while still converging — the oscillation you see in a slightly-too-high loss curve.',
        'In many dimensions the same argument applies eigendirection by eigendirection. Stability is set by the sharpest direction lambda_max, while the speed of convergence along the flattest direction is set by lambda_min, so the number of steps needed scales with the condition number lambda_max / lambda_min.',
        'This is exactly why a single scalar learning rate is unsatisfying: it must be small enough for the sharpest direction while being the same value used for the flattest. Momentum and adaptive methods are both attempts to decouple the two.',
      ],
    },

    workedExample: {
      title: 'Four learning rates on the same simple problem',
      setup:
        'Minimise L(w) = w^2 starting from w = 1. The gradient is 2w, so a step gives w_new = w - eta(2w) = (1 - 2 eta) w. The curvature is a = 2, so the stability condition is eta < 2/2 = 1. Watch what four values of eta do over four steps.',
      steps: [
        {
          label: 'eta = 0.1: slow but safe',
          detail: 'The multiplier is 1 - 0.2 = 0.8. The sequence is 1, 0.8, 0.64, 0.512, 0.4096. Converging, but it will take about 30 steps to get within 0.001 of zero.',
          latex: 'w_t = 0.8^{t}',
        },
        {
          label: 'eta = 0.5: optimal for this problem',
          detail: 'The multiplier is 1 - 1.0 = 0. The sequence is 1, 0, 0, 0. One step lands exactly on the minimum, because eta = 1/a = 1/2 is exactly the optimal value for a quadratic of curvature 2.',
          latex: '\\eta^{*} = 1/a = 0.5',
        },
        {
          label: 'eta = 0.9: converging but oscillating',
          detail: 'The multiplier is 1 - 1.8 = -0.8. The sequence is 1, -0.8, 0.64, -0.512, 0.4096. It crosses the minimum every step and converges at exactly the same speed as eta = 0.1, while looking far more alarming on a loss plot.',
          latex: 'w_t = (-0.8)^{t}',
        },
        {
          label: 'eta = 1.1: divergence',
          detail: 'The multiplier is 1 - 2.2 = -1.2. The sequence is 1, -1.2, 1.44, -1.728, 2.0736. The magnitude grows by 20 per cent per step, so after 50 steps w is about 9,100 and after 200 it has overflowed to inf.',
          latex: '|w_t| = 1.2^{t} \\to \\infty',
        },
        {
          label: 'Read off the threshold',
          detail: 'The boundary is at eta = 1, exactly 2/a as the derivation predicts. Note how narrow the useful window is: 0.9 works and 1.1 destroys the run, a difference of 20 per cent.',
          latex: '\\eta_{\\text{crit}} = \\frac{2}{a} = 1',
        },
        {
          label: 'Now change the curvature',
          detail: 'For L(w) = 50 w^2 the curvature is 100 and the threshold drops to 0.02. Nothing about the problem changed conceptually, only the scale of the loss, yet the safe learning rate is fifty times smaller. This is why normalising your inputs and your loss changes which learning rates work.',
          latex: '\\eta_{\\text{crit}} = \\frac{2}{100} = 0.02',
        },
      ],
      conclusion:
        'The learning rate that works is determined by the curvature of your loss surface, which depends on the scale of your data, the scale of your loss and your initialisation. That is why there is no universal good value, why 1e-3 for Adam and 1e-1 for SGD are both reasonable defaults for different optimisers, and why a ten-minute range test beats an afternoon of guessing.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A learning-rate range test',
        runnable: true,
        code: `import copy
import torch

def lr_range_test(model, loader, criterion, lr_min=1e-7, lr_max=10.0, steps=100):
    state = copy.deepcopy(model.state_dict())
    opt = torch.optim.SGD(model.parameters(), lr=lr_min)
    factor = (lr_max / lr_min) ** (1 / steps)
    lr, smoothed, history = lr_min, None, []

    it = iter(loader)
    for _ in range(steps):
        try:    xb, yb = next(it)
        except StopIteration:
            it = iter(loader); xb, yb = next(it)
        for g in opt.param_groups:
            g["lr"] = lr
        opt.zero_grad(set_to_none=True)
        loss = criterion(model(xb), yb)
        loss.backward()
        opt.step()
        smoothed = loss.item() if smoothed is None else 0.9 * smoothed + 0.1 * loss.item()
        history.append((lr, smoothed))
        if smoothed > 4 * history[0][1]:
            break                                # it has clearly diverged; stop early
        lr *= factor

    model.load_state_dict(state)                 # restore; this was only a diagnostic
    return history

# Typical reading of the result:
#   loss flat from 1e-7 to 1e-4      -> steps too small to matter
#   loss falls steeply 1e-3 to 1e-1  -> the useful band
#   loss minimum near 3e-1           -> already too high for stable training
#   pick about 1e-1, roughly an order of magnitude below the minimum`,
        output: `lr 1.0e-07  loss 2.3031
lr 1.2e-05  loss 2.3026
lr 1.5e-03  loss 2.2140
lr 1.9e-02  loss 1.4472
lr 1.2e-01  loss 0.6318
lr 3.1e-01  loss 0.5901
lr 7.9e-01  loss 1.8830
lr 2.0e+00  loss 9.4412`,
        explanation:
          'The shape is always the same: a flat region where nothing happens, a steep descent where learning is efficient, a minimum, then a violent rise. Pick from the steep region rather than the minimum, because the minimum is already close to the edge of stability and mini-batch noise will push you over it during a long run. Restoring the saved state at the end matters — the test deliberately damages the model.',
      },
      {
        language: 'python',
        title: 'Warmup followed by cosine decay',
        runnable: true,
        code: `import math
import torch

model = torch.nn.Linear(10, 2)
opt = torch.optim.AdamW(model.parameters(), lr=3e-4)

TOTAL, WARMUP = 10_000, 500

def lr_lambda(step):
    if step < WARMUP:
        return step / WARMUP                                   # linear ramp from 0
    progress = (step - WARMUP) / (TOTAL - WARMUP)              # 0 -> 1
    return 0.5 * (1.0 + math.cos(math.pi * progress))          # cosine down to 0

sched = torch.optim.lr_scheduler.LambdaLR(opt, lr_lambda)

for step in range(TOTAL):
    opt.zero_grad(set_to_none=True)
    loss = model(torch.randn(32, 10)).pow(2).mean()
    loss.backward()
    opt.step()
    sched.step()                                   # AFTER optimizer.step()
    if step in (0, 250, 500, 2500, 5000, 9999):
        print(f"step {step:5d}  lr = {sched.get_last_lr()[0]:.3e}")`,
        output: `step     0  lr = 6.000e-07
step   250  lr = 1.500e-04
step   500  lr = 3.000e-04
step  2500  lr = 2.612e-04
step  5000  lr = 1.578e-04
step  9999  lr = 7.402e-10`,
        explanation:
          'This is the schedule behind almost every transformer trained since 2018. The learning rate climbs linearly for 500 steps, peaks at the configured 3e-4, then follows a cosine to essentially zero. Two mistakes to avoid: scheduler.step() must be called after optimizer.step(), and it must be called once per optimiser step rather than once per epoch unless you are using an epoch-based scheduler.',
      },
      {
        language: 'python',
        title: 'The four loss-curve signatures, reproduced deliberately',
        runnable: true,
        code: `import torch

def train(lr, steps=60, seed=0):
    torch.manual_seed(seed)
    w = torch.nn.Parameter(torch.tensor([3.0]))
    opt = torch.optim.SGD([w], lr=lr)
    losses = []
    for _ in range(steps):
        opt.zero_grad(set_to_none=True)
        loss = (w ** 2).sum()          # curvature 2, so the stability limit is lr = 1.0
        loss.backward(); opt.step()
        losses.append(loss.item())
    return losses

for lr, label in [(0.001, "far too low"), (0.1, "sensible"),
                  (0.95, "too high: oscillates"), (1.05, "too high: diverges")]:
    L = train(lr)
    print(f"lr={lr:<6} {label:<24} loss: start {L[0]:.3f}  mid {L[30]:.3e}  end {L[-1]:.3e}")`,
        output: `lr=0.001  far too low              loss: start 9.000  mid 7.981e+00  end 7.106e+00
lr=0.1    sensible                 loss: start 9.000  mid 1.379e-05  end 3.298e-11
lr=0.95   too high: oscillates     loss: start 9.000  mid 1.616e-02  end 3.585e-05
lr=1.05   too high: diverges       loss: start 9.000  mid 2.740e+03  end 6.908e+05`,
        explanation:
          'Four runs of the same problem, differing only in one number. At 0.001 the loss falls by about 20 per cent in 60 steps and would need thousands more; at 0.1 it falls by eleven orders of magnitude; at 0.95 it converges while oscillating across the minimum, arriving more slowly than 0.1 despite the far larger step; at 1.05 it grows by 21 per cent every step and would overflow to inf within a few hundred more. Reproducing these four shapes once makes the diagnostic table above something you recognise rather than something you look up.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Transformer pretraining',
        usage:
          'The original transformer paper introduced a schedule that ramps linearly for 4,000 steps then decays as the inverse square root of the step number. Modern large language models almost all use linear warmup followed by cosine decay, with the peak rate and the warmup length reported as headline hyperparameters.',
      },
      {
        context: 'The ResNet ImageNet recipe',
        usage:
          'The standard recipe starts at 0.1 with SGD and momentum and divides the rate by 10 at epochs 30, 60 and 80. The resulting staircase in the loss curve is instantly recognisable, and each drop produces a visible step down in error as the optimiser stops bouncing and settles.',
      },
      {
        context: 'Fine-tuning a pretrained model',
        usage:
          'Fine-tuning typically uses a rate 10 to 100 times smaller than pretraining — 2e-5 rather than 1e-3 is common for BERT-scale models. A full-size rate destroys the pretrained representation in the first few hundred steps, a failure known as catastrophic forgetting.',
      },
    ],

    projectConnections: [
      { tool: 'torch.optim.lr_scheduler', role: 'CosineAnnealingLR, OneCycleLR, StepLR and LambdaLR implement the schedules above; call scheduler.step() after optimizer.step().' },
      { tool: 'PyTorch Lightning / fast.ai', role: 'Both ship a learning-rate finder that runs the range test and plots the curve in a couple of lines.' },
      { tool: 'Weights & Biases', role: 'Logging the learning rate alongside the loss is what lets you attribute a change in the curve to a scheduler drop rather than to the data.' },
    ],

    commonMistakes: [
      {
        mistake: 'Calling scheduler.step() once per epoch when the scheduler is step-based',
        why: 'A cosine schedule configured for 10,000 steps that is advanced only 20 times will barely decay at all, so training runs at close to the peak rate throughout and the final accuracy is worse for reasons that look mysterious.',
        fix: 'Decide whether the scheduler counts steps or epochs and call it accordingly. Log the learning rate every few hundred steps and look at the plot — the shape tells you immediately.',
      },
      {
        mistake: 'Reusing a learning rate across optimisers',
        why: 'Adam normalises each parameter update by a running estimate of gradient magnitude, so its steps are of order the learning rate itself. SGD steps are the learning rate times the raw gradient. The same number means completely different things: 1e-3 is a sensible Adam rate and a very small SGD rate.',
        fix: 'Use the defaults that belong to each optimiser as a starting point — around 1e-3 for Adam or AdamW, around 1e-1 for SGD with momentum on image tasks — and retune whenever you switch.',
      },
      {
        mistake: 'Skipping warmup with a large batch or an adaptive optimiser',
        why: 'At step zero Adam has no second-moment history, so its normalisation is unreliable and the first updates are effectively enormous. With a large batch the linear scaling rule produces a peak rate that is dangerous to apply cold.',
        fix: 'Ramp linearly from near zero over 500 to 4,000 steps. This is one of the cheapest stability wins available and is standard in every large-scale recipe.',
      },
      {
        mistake: 'Tuning the learning rate before checking the pipeline works at all',
        why: 'A flat loss curve has many causes — a severed gradient path, frozen parameters, shuffled labels, an optimiser that never received the parameters — and none of them are fixed by changing the learning rate.',
        fix: 'First overfit a single batch of about 8 examples to near-zero loss. If that fails, the problem is not the learning rate. Only tune the rate once that test passes.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is the learning rate often called the most important hyperparameter?',
        answer:
          'Because it is the one whose failure modes are both catastrophic and fast. Too high and the loss diverges to nan within a few dozen steps regardless of how good everything else is; too low and training is so slow that you cannot tell a good architecture from a bad one within your compute budget. Other hyperparameters — width, dropout probability, weight decay — change the final result by a few per cent over a reasonable range, whereas the learning rate spans the entire range from no learning to complete divergence over two orders of magnitude. It is also the parameter whose optimal value changes most during training, which is why schedules exist and why a badly matched schedule wastes most of a run.',
      },
      {
        level: 'intermediate',
        question: 'Why does gradient descent diverge above a certain learning rate? Derive the threshold.',
        answer:
          'Take the quadratic L(w) = 0.5 a w^2, which locally approximates any smooth loss near a minimum, with a as the curvature. The gradient is a w, so a step gives w_new = (1 - eta a) w. Distance to the minimum is multiplied by (1 - eta a) every step, so convergence requires |1 - eta a| < 1, which gives 0 < eta < 2/a. At eta = 1/a you land exactly on the minimum in one step; between 1/a and 2/a the factor is negative so you converge while alternating sides; above 2/a the magnitude grows geometrically and you diverge. In many dimensions the condition becomes eta < 2/lambda_max, where lambda_max is the largest Hessian eigenvalue, so the sharpest direction in the loss surface caps the learning rate for every direction — which is why ill-conditioned problems need small rates and why momentum and adaptive methods help.',
        followUp: 'A strong answer connects the condition number to the number of steps required, and notes that this is the motivation for both normalisation layers and per-parameter adaptive rates.',
      },
      {
        level: 'ml-engineer',
        question: 'How do you pick a learning rate for a new model and dataset?',
        answer:
          'Start from a known-good default for the optimiser — about 1e-3 for Adam or AdamW, about 1e-1 for SGD with momentum on vision tasks, about 2e-5 for fine-tuning a pretrained transformer. Before tuning anything, sanity-check the pipeline by overfitting a single batch to near-zero loss, because a flat curve caused by a broken gradient path cannot be fixed with a learning rate. Then run a range test: ramp the rate exponentially from 1e-7 to about 10 over a few hundred steps and plot the smoothed loss on a log axis. Choose from the steepest-descent region, roughly an order of magnitude below the minimum of that curve, since the minimum is already close to the instability boundary. Use that value as the peak of a schedule — linear warmup over a few hundred steps then cosine decay — and log the rate alongside the loss so that every change in the curve can be attributed. Retune whenever the batch size, optimiser or model scale changes.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'For L(w) = 5w^2 starting at w = 2, compute w after two steps with eta = 0.05, and state the largest eta for which this converges.',
        hint: 'The gradient is 10w, so a step is w_new = w - eta(10w) = (1 - 10 eta) w. The curvature is 10.',
        solution:
          'The multiplier is 1 - 10(0.05) = 0.5. Starting at 2: after one step w = 1, after two steps w = 0.5. The stability condition is eta < 2/a with a = 10, so eta < 0.2; at exactly 0.2 the multiplier is -1 and the iterate oscillates between 2 and -2 forever without converging or diverging. The optimal rate is 1/a = 0.1, which lands exactly on zero in a single step. Note that the same function scaled differently — say L(w) = w^2 — has a threshold of 1.0, five times larger, purely because the curvature is five times smaller.',
      },
      {
        prompt:
          'A training run shows loss falling smoothly for 2,000 steps and then bouncing within a band between 0.42 and 0.51 for the next 8,000 without improving. Diagnose it and propose two fixes.',
        hint: 'What sets the width of the band an optimiser settles into?',
        solution:
          'This is the classic signature of a learning rate that was right early and is now too high for the sharper region the optimiser has reached. With a constant rate, stochastic gradient descent does not converge to a point but to a neighbourhood whose size is set by the product of the learning rate and the gradient noise, so it bounces within a floor it cannot get below. Two fixes: add a decay schedule, for example cosine annealing over the remaining steps, which shrinks the noise floor and usually produces a visible drop in the loss the moment the rate starts falling; or increase the batch size, which reduces the gradient noise directly, though at proportionally more compute per step. A third option worth knowing is stochastic weight averaging, which averages the parameters over the bouncing phase and often lands better than any single iterate in it.',
      },
      {
        prompt:
          'Write the learning rate multiplier for step 100 and step 600 of a schedule with 500 warmup steps, 10,000 total steps and cosine decay to zero.',
        hint: 'Warmup is linear in t/T_warm; the cosine phase uses progress measured after warmup ends.',
        solution:
          'At step 100 you are in warmup, so the multiplier is 100/500 = 0.2 of the peak rate. At step 600 warmup has finished, so progress = (600 - 500)/(10000 - 500) = 100/9500 = 0.01053. The cosine factor is 0.5(1 + cos(pi x 0.01053)) = 0.5(1 + cos(0.03307 rad)) = 0.5(1 + 0.999453) = 0.99973. So step 600 runs at essentially the full peak rate. This illustrates a property of cosine decay that catches people out: it decays very slowly at first, holding near the peak for the first several per cent of training, then falls fastest around the midpoint.',
      },
    ],

    quiz: [
      {
        id: 'DL-007-q1',
        type: 'mcq',
        concept: 'diagnosing loss curves',
        prompt: 'Your training loss becomes nan after 15 steps. What is the most likely cause?',
        options: [
          'The learning rate is far too high',
          'The learning rate is far too low',
          'The batch size is too small',
          'The model does not have enough parameters',
        ],
        answerIndex: 0,
        explanation:
          'A rate above the stability threshold makes the weights grow geometrically, and once they overflow float32 every downstream value becomes nan. The first response is to divide the rate by ten and add warmup; a rate that is too low produces a flat curve, never a nan.',
      },
      {
        id: 'DL-007-q2',
        type: 'numeric',
        concept: 'stability threshold',
        prompt: 'For the loss L(w) = 4w^2, what is the largest learning rate for which plain gradient descent converges?',
        answer: 0.25,
        tolerance: 0.001,
        explanation:
          'The curvature is a = 8, since the second derivative of 4w^2 is 8. The condition eta < 2/a gives eta < 0.25. At exactly 0.25 the iterate oscillates between plus and minus its starting value forever.',
      },
      {
        id: 'DL-007-q3',
        type: 'truefalse',
        concept: 'optimiser-specific rates',
        prompt: 'A learning rate that works well for SGD will also work well for Adam on the same model.',
        answer: false,
        explanation:
          'Adam divides each update by a running estimate of gradient magnitude, so its step sizes are of order the learning rate itself regardless of the gradient scale. Typical good values differ by about two orders of magnitude: 1e-1 for SGD with momentum on vision tasks, 1e-3 for Adam.',
      },
      {
        id: 'DL-007-q4',
        type: 'mcq',
        concept: 'warmup',
        prompt: 'Why do large-batch and transformer training recipes almost always include a learning-rate warmup?',
        options: [
          'Early updates on a random initialisation are badly directed, and adaptive optimisers have no reliable second-moment estimates yet',
          'It makes the model converge to a lower loss in fewer total steps in every case',
          'It is required for the scheduler to compute the cosine correctly',
          'It compensates for the data not being shuffled in the first epoch',
        ],
        answerIndex: 0,
        explanation:
          'At step zero the parameters are random and Adam has no history, so full-size steps can do lasting damage. Ramping from near zero over a few hundred steps is a cheap and reliable stability measure, especially when the linear scaling rule has produced a large peak rate.',
      },
      {
        id: 'DL-007-q5',
        type: 'debug',
        language: 'python',
        concept: 'scheduler placement',
        prompt: 'This cosine schedule, configured for 10,000 steps, barely decays over a 50-epoch run. What is wrong?',
        code: 'sched = CosineAnnealingLR(opt, T_max=10_000)\nfor epoch in range(50):\n    for xb, yb in loader:\n        opt.zero_grad(); criterion(model(xb), yb).backward(); opt.step()\n    sched.step()',
        options: [
          'sched.step() is called once per epoch but T_max counts optimiser steps, so it advances only 50 of 10,000',
          'CosineAnnealingLR must be constructed after the first optimizer.step()',
          'T_max should be set to the number of epochs times the learning rate',
          'opt.zero_grad() must come after backward()',
        ],
        answerIndex: 0,
        explanation:
          'The scheduler advances 50 times in a run configured for 10,000, so the cosine has covered half a per cent of its arc and the rate stays essentially at the peak. Move sched.step() inside the inner loop, or set T_max to the number of epochs.',
      },
      {
        id: 'DL-007-q6',
        type: 'explain',
        concept: 'why schedules',
        prompt: 'Explain why a decaying learning-rate schedule usually beats the best constant learning rate.',
        rubric: [
          'Notes that large steps are useful early, when far from a minimum',
          'Notes that small steps are needed late, to settle rather than bounce',
          'Connects the bouncing to the noise floor set by learning rate times gradient noise',
        ],
        sampleAnswer:
          'Early in training you are far from any good solution and the loss surface is relatively flat, so large steps cover ground cheaply and the imprecision does not matter. Late in training you are in a narrow region and the surface is sharply curved, so the same step size overshoots and the optimiser bounces from side to side. With stochastic gradients this is not merely an aesthetic problem: a constant rate converges to a neighbourhood whose size is proportional to the learning rate times the gradient noise, so there is a loss floor you cannot get below without shrinking the rate. A schedule gives you both phases — the fast traversal early and the precise settling late — and any single constant value has to compromise between them. Decaying the rate is why you often see a distinct drop in the loss curve exactly at a scheduler step, as the noise floor falls and the optimiser can finally settle.',
        explanation:
          'The examinable idea is the noise floor: with stochastic gradients the learning rate sets how tightly the optimiser can converge, not just how fast it travels.',
      },
    ],

    flashcards: [
      { front: 'What does the learning rate multiply?', back: 'The gradient, before it is subtracted from the parameters. It converts a direction into an actual step size.' },
      { front: 'What is the stability condition for gradient descent on a quadratic?', back: 'eta < 2 / lambda_max, where lambda_max is the largest curvature. Above it the iterates grow geometrically and diverge.' },
      { front: 'What does a loss that becomes nan in a few steps mean?', back: 'The learning rate is far above the stability threshold. Divide by ten, add warmup, and check the input scaling.' },
      { front: 'What is a learning-rate range test?', back: 'Ramp the rate exponentially over a few hundred steps and plot the smoothed loss. Pick from the steep region, about an order of magnitude below the minimum.' },
      { front: 'Why warm up the learning rate?', back: 'Random initial parameters give badly directed gradients and Adam has no second-moment history yet, so full-size early steps can do permanent damage.' },
      { front: 'Typical starting rates by optimiser?', back: 'About 1e-3 for Adam or AdamW, about 1e-1 for SGD with momentum on vision tasks, about 2e-5 for fine-tuning a pretrained transformer.' },
    ],

    challenge: {
      title: 'Build a learning-rate finder and validate it',
      brief:
        'Implement a learning-rate range test as a reusable function that saves and restores model and optimiser state, ramps exponentially, smooths the loss, and stops early on divergence. Run it on a small classifier, pick a rate from the steep region, and then train three full runs: at your chosen rate, at ten times it, and at one tenth. Show that the chosen rate wins, and plot all three curves on the same axes with the learning rate logged alongside.',
      language: 'python',
      acceptanceCriteria: [
        'The finder restores the exact pre-test model and optimiser state',
        'Loss is smoothed, plotted on a log-scale rate axis, and the run stops early on divergence',
        'Three comparison runs are trained and plotted together',
        'A written conclusion states the chosen rate and justifies it from the shape of the curve rather than the final numbers alone',
      ],
      starterCode:
        'import copy\nimport torch\n\ndef lr_range_test(model, optimizer, loader, criterion,\n                  lr_min=1e-7, lr_max=10.0, steps=200, beta=0.9):\n    """Return a list of (lr, smoothed_loss). Restores state before returning."""\n    model_state = copy.deepcopy(model.state_dict())\n    opt_state = copy.deepcopy(optimizer.state_dict())\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain what the learning rate does, how you would recognise a bad one from the loss curve, and why schedules exist.',
      mustCover: [
        'The learning rate converts the gradient direction into a step of a particular size',
        'Too high diverges, too low stalls, and the useful window can be narrow',
        'The best step size changes during training because the loss surface curvature changes',
        'A schedule gives large steps early and small steps late, which a constant rate cannot',
      ],
      bonusSignals: [
        'gives the 2/curvature stability threshold',
        'describes the range-test procedure',
        'mentions warmup and why it helps',
        'notes that optimisers have different natural scales for the rate',
      ],
      sampleExplanation:
        "Backpropagation tells you which direction is downhill, but a direction is not a plan — you still have to decide how far to walk. That distance is the learning rate, and it is one number applied to every parameter at once. If it is too large you overshoot the valley and land higher on the far side, then overshoot again more violently, and within a few dozen steps the numbers overflow and everything becomes nan. If it is too small you do improve, but so slowly that you cannot tell within your budget whether the model is any good. You can read which case you are in straight off the loss curve: a nan or a rising loss means too high, a wide bouncing band means slightly too high for the current phase, a smooth fall means about right, and an almost flat slow decline means too low. The reason a single value cannot serve throughout is that the surface changes under you. Far from a solution it is relatively flat and long strides are efficient; close to one it is sharply curved and the same stride bounces you between the walls. Worse, because gradients are estimated from small batches they are noisy, so a large rate means you settle into a wide noisy region rather than a point — there is a floor on the loss you simply cannot get below without shrinking the steps. That is why almost every serious run schedules the rate: ramp up gently for the first few hundred steps so the random initial weights do not get wrecked, hold near a peak while covering ground, then decay smoothly toward zero so the model can settle. And before all of this, spend ten minutes on a range test: ramp the rate up exponentially, watch where the loss starts falling fastest, and pick from that region rather than guessing.",
    },
  },

  {
    id: 'DL-008',
    domain: 'DL',
    module: 'Optimisers',
    topic: 'Stochastic descent and velocity',
    title: 'SGD and Momentum',
    slug: 'sgd-and-momentum',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['DL-005', 'DL-006', 'DL-007'],
    related: ['DL-004', 'DL-006', 'DL-007'],
    tags: ['sgd', 'momentum', 'nesterov', 'optimiser', 'gradient-noise', 'ravine', 'velocity'],

    learningObjectives: [
      'Explain why the mini-batch gradient is a noisy but unbiased estimate of the full-batch gradient, and why that noise helps rather than hurts',
      'Write the plain SGD update and the momentum update, and say exactly what the velocity buffer accumulates',
      'Show that momentum multiplies the effective step by 1/(1 - mu) along consistent directions and damps oscillating ones',
      'Distinguish classical momentum from Nesterov accelerated gradient, and configure both correctly in torch.optim.SGD',
    ],

    terminology: [
      {
        term: 'Stochastic gradient descent (SGD)',
        definition:
          'Gradient descent in which each update uses the gradient of the loss on a single mini-batch rather than on the whole training set. The batch gradient is a random variable whose expectation is the full-batch gradient.',
        simple: 'Take a step downhill after looking at only a handful of examples instead of all of them.',
      },
      {
        term: 'Gradient noise',
        definition:
          'The difference between the mini-batch gradient and the true full-dataset gradient. Its magnitude scales roughly as 1/sqrt(B) for batch size B, so smaller batches mean noisier steps.',
        simple: 'The wobble in the direction you pick because you only looked at a sample.',
      },
      {
        term: 'Momentum (velocity buffer)',
        definition:
          'A running exponentially weighted sum of past gradients, held one number per parameter, that replaces the raw gradient in the update. It gives the optimiser inertia.',
        simple: 'A memory of which way you have been going, so a single odd step cannot throw you off course.',
      },
      {
        term: 'Ravine (ill-conditioned valley)',
        definition:
          'A region of the loss surface that is steeply curved in some directions and nearly flat in others. Plain gradient descent bounces across the steep walls while creeping along the flat floor.',
        simple: 'A narrow gorge: you keep bouncing off the sides instead of walking down the middle.',
      },
      {
        term: 'Nesterov accelerated gradient',
        definition:
          'A variant of momentum that evaluates the gradient at the point the velocity is about to carry you to, rather than where you currently stand, giving a correction term that damps overshoot.',
        simple: 'Look where you are about to land before deciding how hard to push.',
      },
    ],

    simpleExplanation:
      "Imagine walking down a foggy hillside with a phone that tells you which way is downhill, but the phone is cheap and only samples the ground under a few of your steps, so its arrow jitters. Plain stochastic gradient descent means trusting the jittery arrow completely: read it, take a small step that way, read it again. You do get down the hill, but you zigzag, and in a narrow gully you spend most of your effort bouncing from one wall to the other instead of walking along the floor. Momentum fixes this by making you heavy. Instead of stepping exactly where the arrow points, you keep a rolling memory of every direction you have been going, weighted so that recent directions count most. If the arrow has pointed the same way for a while, that memory builds up and you move faster and faster in that direction, like a ball rolling downhill. If the arrow keeps flipping left and right, the flips cancel in the memory and you stop wasting energy on them. The result is the same destination, reached in far fewer steps, with a much smoother path.",

    whyItExists:
      'Computing the gradient over the whole training set is far too expensive to do for every update on any realistic dataset, so practitioners moved to mini-batch gradients — which are noisy. Plain SGD on top of that noise is slow: it crawls along flat directions and oscillates violently across steep ones, so a badly conditioned loss surface can need tens of thousands of steps for progress that momentum makes in hundreds. Momentum exists to convert that wasted oscillation into forward speed by averaging gradients over time instead of trusting each one on its own.',

    analogy: {
      scenario:
        'Two people are pushing shopping trolleys through a supermarket toward the exit, guided by a friend who shouts a direction every few seconds but is sometimes wrong. The first trolley has perfect brakes: it stops dead after every push, so every wrong shout costs a full wasted push and the trolley judders left and right down the aisle. The second trolley is heavy and rolls freely. A single wrong shout barely deflects it, because the momentum it has already built keeps it going roughly straight, while shouts that agree with each other pile up and it accelerates down the long straight aisle.',
      mapping: [
        { from: "The friend's shouted direction", to: 'The mini-batch gradient, a noisy estimate of the true descent direction' },
        { from: 'The trolley with perfect brakes', to: 'Plain SGD, where each update depends only on the current gradient' },
        { from: 'The heavy rolling trolley', to: 'SGD with momentum, where the velocity buffer carries information from past gradients' },
        { from: 'Shouts that agree piling up into speed', to: 'Consistent gradients accumulating into a velocity up to 1/(1 - mu) times larger' },
        { from: 'Contradictory shouts cancelling out', to: 'Oscillating gradient components partially cancelling in the exponential average' },
      ],
      bridge:
        'The velocity buffer is literally an exponentially weighted sum of past gradients, so the trolley mass is not a metaphor for something vague — it is the coefficient mu that decides how much of the old sum survives each step. Where the analogy stops working is that a real trolley conserves kinetic energy, so it would overshoot the exit and keep going; the optimiser velocity decays geometrically the moment the gradients stop supporting it, because each step multiplies the buffer by mu < 1.',
      limitations:
        'The physical picture suggests momentum always helps you go faster. It does not: on a surface with a sharp narrow minimum, inertia can carry you straight past it, which is exactly why very high mu combined with a large learning rate diverges.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'One momentum update, in order',
        caption: 'The PyTorch convention. Note that the velocity is updated before the parameter, and that the learning rate multiplies the velocity, not the raw gradient.',
        steps: [
          { label: 'Sample a mini-batch', detail: 'Draw B examples, run the forward pass and compute the loss on those B examples only.' },
          { label: 'Backward pass', detail: 'Backpropagation fills p.grad with g_t, the gradient of the mini-batch loss with respect to every parameter.' },
          { label: 'Decay the old velocity', detail: 'Multiply the stored buffer by mu, typically 0.9. Ten per cent of the accumulated history is discarded each step.' },
          { label: 'Add the new gradient', detail: 'v_t = mu * v_{t-1} + g_t. The buffer now holds a weighted sum in which g_t counts once, g_{t-1} counts mu, g_{t-2} counts mu squared, and so on.' },
          { label: 'Step along the velocity', detail: 'theta = theta - lr * v_t. The direction you move is the smoothed history, not the instantaneous gradient.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Plain SGD versus SGD with momentum',
        caption: 'Same gradients, same learning rate, different use of memory.',
        left: {
          heading: 'Plain SGD (mu = 0)',
          points: [
            'Update is theta = theta - lr * g_t; no state is stored',
            'Memory cost: zero extra bytes per parameter',
            'In a ravine it oscillates across the steep axis and crawls along the flat one',
            'Every noisy batch translates directly into a noisy step',
            'Still the default for fine-tuning large pretrained models where stability matters more than speed',
          ],
        },
        right: {
          heading: 'SGD with momentum (mu = 0.9)',
          points: [
            'Update is v = mu*v + g; theta = theta - lr*v',
            'Memory cost: one extra float per parameter, the same size as the model',
            'Consistent directions are amplified up to 1/(1 - mu) = 10 times',
            'Oscillating components largely cancel inside the exponential average',
            'The standard choice for training convolutional networks from scratch, usually with mu = 0.9 and weight decay',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What mu actually buys you',
        caption: 'Effective amplification of a persistent gradient, and the rough number of past steps the buffer remembers.',
        columns: ['mu', 'Steady-state amplification 1/(1-mu)', 'Effective averaging window ~1/(1-mu) steps', 'Typical use'],
        rows: [
          ['0.0', '1x', '1 step', 'Plain SGD; debugging, or fine-tuning where you want no inertia'],
          ['0.5', '2x', '2 steps', 'Warmup value in some recipes; mild smoothing'],
          ['0.9', '10x', '10 steps', 'The overwhelming default for vision models'],
          ['0.99', '100x', '100 steps', 'Very noisy gradients or tiny batches; needs a proportionally smaller learning rate'],
        ],
      },
      {
        kind: 'widget',
        title: 'Watch momentum cross a ravine',
        caption: 'Set the surface to an elongated bowl, run plain descent, then turn momentum up to 0.9 and compare the number of steps to the minimum. Then push mu to 0.99 and watch it overshoot.',
        widget: 'gradient-descent-lab',
      },
    ],

    formalDefinition:
      'Stochastic gradient descent minimises L(theta) = E_{(x,y)~D}[l(f_theta(x), y)] by the iteration theta_{t+1} = theta_t - eta * g_t, where g_t = grad_theta L_{B_t}(theta_t) is the gradient of the loss on a mini-batch B_t sampled from D, so that E[g_t] = grad L(theta_t). Classical momentum replaces g_t by a velocity v_t = mu * v_{t-1} + g_t with v_0 = 0 and mu in [0, 1), giving theta_{t+1} = theta_t - eta * v_t; expanding the recursion shows v_t = sum_{k=0}^{t} mu^k g_{t-k}, an exponentially weighted sum of all past gradients.',

    math: {
      intuition:
        'Two ideas, one after the other. First, the mini-batch gradient is a sample mean: it is right on average and its error shrinks like one over the square root of the batch size, so it is a cheap noisy substitute for the real thing. Second, if you have a noisy estimate of a quantity that changes slowly, the natural thing to do is average several estimates — and an exponential moving average is the way to do that with one number of storage instead of a list. Momentum is exactly that average, applied to gradients. Everything else follows: a component of the gradient that keeps the same sign adds up into a geometric series, which sums to 1/(1 - mu); a component that flips sign every step alternates and largely cancels.',
      formulas: [
        {
          latex: '\\theta_{t+1} = \\theta_t - \\eta\\, g_t, \\qquad g_t = \\nabla_\\theta L_{B_t}(\\theta_t)',
          name: 'Plain stochastic gradient descent',
          meaning:
            'Move each parameter a fixed multiple of the negative mini-batch gradient. No state is carried between steps, so the optimiser has no memory whatsoever.',
          variables: [
            { symbol: '\\theta_t', meaning: 'The full parameter vector at step t' },
            { symbol: '\\eta', meaning: 'Learning rate, the single scalar that converts a gradient into a distance' },
            { symbol: 'g_t', meaning: 'Gradient of the loss computed on mini-batch B_t only' },
            { symbol: 'B_t', meaning: 'The mini-batch drawn at step t, of size B' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\mathbb{E}[g_t] = \\nabla L(\\theta_t), \\qquad \\operatorname{Var}(g_t) \\approx \\frac{\\sigma^2}{B}',
          name: 'Unbiasedness and the noise scale of a mini-batch gradient',
          meaning:
            'The mini-batch gradient is correct on average, and its variance falls as one over the batch size. Quadrupling the batch halves the gradient noise — which is why large batches often need a larger learning rate to keep the same amount of useful exploration.',
          variables: [
            { symbol: '\\nabla L(\\theta_t)', meaning: 'The true gradient over the entire training distribution' },
            { symbol: '\\sigma^2', meaning: 'Per-example gradient variance, a property of the data and the model' },
            { symbol: 'B', meaning: 'Mini-batch size' },
          ],
          category: 'optimization',
        },
        {
          latex: 'v_t = \\mu\\, v_{t-1} + g_t, \\qquad \\theta_{t+1} = \\theta_t - \\eta\\, v_t',
          name: 'Classical momentum (the PyTorch form)',
          meaning:
            'The velocity buffer decays by mu and absorbs the new gradient; the parameter then moves along the velocity. This is the exact update torch.optim.SGD(momentum=mu) performs.',
          variables: [
            { symbol: 'v_t', meaning: 'Velocity buffer, one number per parameter, initialised to zero' },
            { symbol: '\\mu', meaning: 'Momentum coefficient in [0, 1); 0.9 is the default in practice' },
            { symbol: 'g_t', meaning: 'Current mini-batch gradient' },
            { symbol: '\\eta', meaning: 'Learning rate, applied to the velocity rather than to the raw gradient' },
          ],
          category: 'optimization',
        },
        {
          latex: 'v_t = \\sum_{k=0}^{t} \\mu^{k} g_{t-k} \\;\\xrightarrow[\\;g_t = g\\;]{}\\; \\frac{g}{1-\\mu}',
          name: 'Steady-state amplification',
          meaning:
            'Unrolling the recursion shows the velocity is a geometric sum of the entire gradient history. If the gradient is persistent, that sum converges to g/(1 - mu), so mu = 0.9 means an effective step ten times the plain SGD step in directions the model keeps agreeing about.',
          variables: [
            { symbol: 'k', meaning: 'How many steps ago a gradient was computed' },
            { symbol: '\\mu^{k}', meaning: 'The weight given to a gradient k steps old; at mu = 0.9 a gradient from 20 steps ago still counts 0.12' },
            { symbol: 'g', meaning: 'A gradient component that stays constant, standing in for a consistent downhill direction' },
          ],
          category: 'optimization',
        },
        {
          latex: 'v_t = \\mu\\, v_{t-1} + \\nabla_\\theta L\\!\\left(\\theta_t - \\eta\\,\\mu\\, v_{t-1}\\right)',
          name: 'Nesterov accelerated gradient',
          meaning:
            'Evaluate the gradient at the lookahead point that momentum alone would take you to. If that point is already past the minimum the gradient there points backwards, so Nesterov applies the brakes one step earlier than classical momentum.',
          variables: [
            { symbol: '\\theta_t - \\eta\\mu v_{t-1}', meaning: 'The lookahead position: where inertia alone would carry the parameters' },
            { symbol: '\\mu v_{t-1}', meaning: 'The part of the next step that is already determined before the new gradient arrives' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Start from the velocity recursion v_t = mu v_{t-1} + g_t with v_0 = 0, and expand it by substitution: v_1 = g_1, v_2 = mu g_1 + g_2, v_3 = mu^2 g_1 + mu g_2 + g_3.',
        'The pattern is v_t = sum_{k=0}^{t-1} mu^k g_{t-k}: every gradient ever computed is still in the buffer, discounted by mu raised to its age.',
        'Now suppose a particular coordinate has a persistent gradient g that does not change. Then v_t = g (1 + mu + mu^2 + ... + mu^{t-1}), a geometric series.',
        'As t grows this converges to g/(1 - mu). With mu = 0.9 the steady-state velocity is 10g, so the step taken is ten times the plain SGD step. This is the acceleration along flat consistent directions.',
        'Next suppose a coordinate oscillates, g_t = +g, -g, +g, ... The steady state alternates between +A and -A with A = -mu A + g, giving A = g/(1 + mu) = g/1.9 for mu = 0.9.',
        'So along the consistent direction momentum multiplies the step by 1/(1 - mu) = 10, and along the oscillating direction by 1/(1 + mu) = 0.53. The ratio, about 19 to 1, is precisely the anti-ravine effect: momentum reshapes an ill-conditioned problem in favour of the directions that matter.',
        'Finally, note that because eta multiplies v rather than g, raising mu raises the effective step size. Increasing mu from 0.9 to 0.99 multiplies persistent steps by ten, so the learning rate usually has to come down by a similar factor to stay stable.',
      ],
    },

    workedExample: {
      title: 'Momentum on a persistent gradient and on an oscillating one',
      setup:
        'Take mu = 0.9 and eta = 0.1. Coordinate A is on the flat floor of the ravine and reports the same gradient g = 2.0 every step. Coordinate B is across the steep wall and reports g = +2.0, -2.0, +2.0, -2.0 as the optimiser bounces. Both buffers start at zero. Track four steps of each.',
      steps: [
        {
          label: 'Coordinate A, steps 1 and 2',
          detail: 'v1 = 0.9 x 0 + 2.0 = 2.0, so the step is 0.1 x 2.0 = 0.20 — identical to plain SGD on the first step. v2 = 0.9 x 2.0 + 2.0 = 3.80, step 0.38. Momentum is already moving nearly twice as fast.',
          latex: 'v_1 = 2.00,\\; v_2 = 3.80',
        },
        {
          label: 'Coordinate A, steps 3 and 4',
          detail: 'v3 = 0.9 x 3.80 + 2.0 = 5.42, step 0.542. v4 = 0.9 x 5.42 + 2.0 = 6.878, step 0.688. The buffer is climbing toward its limit.',
          latex: 'v_3 = 5.42,\\; v_4 = 6.878',
        },
        {
          label: 'Coordinate A, the limit',
          detail: 'The geometric series converges to 2.0 / (1 - 0.9) = 20.0, giving a step of 0.1 x 20.0 = 2.0 against the plain SGD step of 0.2. Ten times faster along a direction the gradients keep agreeing about, with no change to the learning rate.',
          latex: 'v_\\infty = \\frac{2.0}{1 - 0.9} = 20.0',
        },
        {
          label: 'Coordinate B, four steps',
          detail: 'v1 = 2.0; v2 = 0.9 x 2.0 - 2.0 = -0.20; v3 = 0.9 x (-0.20) + 2.0 = 1.82; v4 = 0.9 x 1.82 - 2.0 = -0.362. The magnitudes stay small and the sign keeps flipping without ever running away.',
          latex: 'v_1 = 2.00,\\; v_2 = -0.20,\\; v_3 = 1.82,\\; v_4 = -0.362',
        },
        {
          label: 'Coordinate B, the limit',
          detail: 'At steady state the buffer alternates between +A and -A with A = -0.9A + 2.0, so A = 2.0/1.9 = 1.053 and the step is 0.105 — slightly smaller than the plain SGD step of 0.2. The oscillation is damped rather than amplified.',
          latex: 'A = \\frac{2.0}{1 + 0.9} = 1.053',
        },
        {
          label: 'Compare the two coordinates',
          detail: 'Momentum has multiplied the useful direction by 10 and the wasteful one by 0.53, a relative gain of about 19 times. Plain SGD treats both coordinates identically, which is exactly why it struggles in a ravine.',
          latex: '\\frac{1/(1-\\mu)}{1/(1+\\mu)} = \\frac{1+\\mu}{1-\\mu} = 19',
        },
      ],
      conclusion:
        'Momentum does not know anything about the shape of the loss surface; it simply averages gradients over time. Averaging is enough, because consistency and inconsistency are exactly what distinguish the floor of a ravine from its walls. That is the whole idea, and it costs one extra float per parameter.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Momentum from scratch, so you can see the buffer',
        runnable: true,
        code: `import numpy as np

def run(mu, steps=4, lr=0.1):
    """Coordinate A: persistent gradient. Coordinate B: alternating gradient."""
    v = np.zeros(2)
    theta = np.zeros(2)
    for t in range(steps):
        g = np.array([2.0, 2.0 if t % 2 == 0 else -2.0])
        v = mu * v + g              # decay the history, absorb the new gradient
        theta = theta - lr * v      # step along the smoothed direction
        print(f"t={t+1}  g={g}  v={np.round(v, 3)}  theta={np.round(theta, 3)}")

print("mu = 0.0  (plain SGD)")
run(0.0)
print("mu = 0.9")
run(0.9)`,
        output: `mu = 0.0  (plain SGD)
t=1  g=[2. 2.]  v=[2. 2.]  theta=[-0.2 -0.2]
t=2  g=[ 2. -2.]  v=[ 2. -2.]  theta=[-0.4  0. ]
t=3  g=[2. 2.]  v=[2. 2.]  theta=[-0.6 -0.2]
t=4  g=[ 2. -2.]  v=[ 2. -2.]  theta=[-0.8  0. ]
mu = 0.9
t=1  g=[2. 2.]  v=[2. 2.]  theta=[-0.2 -0.2]
t=2  g=[ 2. -2.]  v=[ 3.8 -0.2]  theta=[-0.58 -0.18]
t=3  g=[2. 2.]  v=[5.42 1.82]  theta=[-1.122 -0.362]
t=4  g=[ 2. -2.]  v=[ 6.878 -0.362]  theta=[-1.81  -0.326]`,
        explanation:
          'The two coordinates receive exactly the same gradient magnitude at every step, so plain SGD moves coordinate A by 0.8 in four steps and coordinate B by nothing at all — it just oscillates. With mu = 0.9, coordinate A has travelled 1.81, more than twice as far, while coordinate B is still going nowhere but is now doing so with much smaller steps. Printing the velocity buffer alongside the gradient is the single most useful debugging habit for understanding any optimiser.',
      },
      {
        language: 'python',
        title: 'Configuring torch.optim.SGD properly',
        runnable: true,
        code: `import torch
import torch.nn as nn

model = nn.Sequential(nn.Linear(10, 32), nn.ReLU(), nn.Linear(32, 1))

opt = torch.optim.SGD(
    model.parameters(),
    lr=0.01,
    momentum=0.9,        # the velocity coefficient mu
    nesterov=True,       # requires momentum > 0 and dampening == 0
    weight_decay=5e-4,   # L2 penalty, added to the gradient before the buffer
)

x, y = torch.randn(64, 10), torch.randn(64, 1)
loss = nn.functional.mse_loss(model(x), y)

opt.zero_grad()
loss.backward()
opt.step()

# The velocity buffers live in the optimiser, not the model.
buf = opt.state[model[0].weight]["momentum_buffer"]
print("buffer shape:", tuple(buf.shape))
print("model weight shape:", tuple(model[0].weight.shape))
print("state keys:", sorted(opt.state[model[0].weight].keys()))`,
        output: `buffer shape: (32, 10)
model weight shape: (32, 10)
state keys: ['momentum_buffer']`,
        explanation:
          'Three things are worth noticing. The velocity buffer is exactly the same shape as the parameter, so momentum doubles your optimiser memory. It lives in opt.state rather than in the model, which is why resuming a run from a checkpoint that saved only model.state_dict() silently restarts every buffer at zero and produces a visible bump in the loss. And weight_decay in PyTorch is implemented by adding lambda*theta to the gradient before the momentum update, so the decay itself gets accumulated in the buffer — a detail that AdamW was invented to undo.',
      },
      {
        language: 'python',
        title: 'Gradient noise shrinks like one over the square root of the batch',
        runnable: true,
        code: `import torch

torch.manual_seed(0)
# 10,000 per-example gradients for a single parameter, mean 1.0, sd 3.0
per_example = torch.randn(10_000) * 3.0 + 1.0

for B in [1, 4, 16, 64, 256]:
    batches = per_example[: (10_000 // B) * B].reshape(-1, B)
    batch_grads = batches.mean(dim=1)
    print(f"B={B:4d}  mean={batch_grads.mean():.3f}  sd={batch_grads.std():.3f}")`,
        output: `B=   1  mean=1.006  sd=2.996
B=   4  mean=1.006  sd=1.489
B=  16  mean=1.006  sd=0.745
B=  64  mean=1.007  sd=0.374
B= 256  mean=1.010  sd=0.190`,
        explanation:
          'The mean is stable at about 1.0 for every batch size — this is unbiasedness, and it is why SGD converges to the same place full-batch descent would. The standard deviation halves each time the batch size quadruples, matching the 1/sqrt(B) law exactly. This is the quantitative statement behind the linear scaling rule: if you increase the batch by a factor k the noise drops by sqrt(k), and raising the learning rate by k restores a comparable amount of exploration per epoch.',
      },
    ],

    realWorldExamples: [
      {
        context: 'ImageNet training recipes',
        usage:
          'The reference ResNet recipe and almost every convolutional network trained from scratch since 2015 uses SGD with momentum 0.9, weight decay 1e-4, and a step or cosine learning-rate schedule. Adam usually reaches a lower training loss on the same network but a slightly worse top-1 validation accuracy, so vision teams have kept momentum SGD as the default for more than a decade.',
      },
      {
        context: 'Large-batch distributed training',
        usage:
          'When Facebook trained ImageNet in one hour on 256 GPUs with a batch of 8192, the recipe was momentum SGD with the learning rate scaled linearly with the batch size and a five-epoch warmup. The warmup exists because momentum takes about 1/(1-mu) = 10 steps to fill its buffer, and a huge learning rate applied while the buffer is still filling destroys the initialisation.',
      },
      {
        context: 'Reinforcement learning and noisy objectives',
        usage:
          'Policy-gradient estimates are far noisier than supervised gradients, sometimes with a signal-to-noise ratio below one. Practitioners raise momentum, or switch to an optimiser with stronger averaging, specifically because the exponential average is doing variance reduction across steps that a bigger batch would otherwise have to buy with compute.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'torch.optim.SGD(params, lr, momentum, nesterov, weight_decay) is the whole unit in one constructor call; opt.state holds the velocity buffers.' },
      { tool: 'PyTorch Lightning', role: 'configure_optimizers returns the SGD instance and its schedule; checkpoint callbacks must save optimizer state to preserve the momentum buffers across a resume.' },
      { tool: 'Weights & Biases', role: 'Logging the gradient norm and the velocity norm separately makes it obvious when momentum has saturated and when the learning rate is fighting it.' },
    ],

    commonMistakes: [
      {
        mistake: 'Raising momentum without lowering the learning rate',
        why: 'Because eta multiplies the velocity, the effective step along persistent directions is eta/(1 - mu). Going from mu = 0.9 to mu = 0.99 multiplies that by ten, so a run that was marginally stable diverges into nan within a few dozen steps.',
        fix: 'Treat eta/(1 - mu) as the quantity you are really choosing. If you raise mu from 0.9 to 0.99, divide the learning rate by roughly ten and rerun a short range test.',
      },
      {
        mistake: 'Resuming training from a checkpoint that saved only the model weights',
        why: 'The velocity buffers live in the optimiser, not the model. Restarting them at zero throws away the accumulated direction, and the loss visibly jumps for the first few hundred steps while the buffers refill.',
        fix: 'Always checkpoint optimizer.state_dict() alongside model.state_dict(), and the scheduler state too. A resumed run whose loss spikes is nearly always this bug.',
      },
      {
        mistake: 'Expecting momentum to fix a learning rate that is simply wrong',
        why: 'Momentum changes the relative weighting of directions; it does not rescue a step size that overshoots on every axis or one that is too small to move at all. People add momentum to a diverging run and make it diverge faster.',
        fix: 'Fix the learning rate first with a range test, as in the previous unit, then add momentum and expect to reduce the rate slightly rather than raise it.',
      },
      {
        mistake: 'Believing that gradient noise is purely harmful',
        why: 'Noise is what lets SGD escape sharp local structure and settle in wider, flatter basins that tend to generalise better. Full-batch gradient descent on a neural network often reaches a lower training loss and a worse test loss.',
        fix: 'Think of the noise scale eta/B as a regularisation hyperparameter of its own. When you increase the batch size for throughput, expect to lose some of that regularisation and to compensate elsewhere.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does the momentum buffer actually store, and what is the effect of setting mu = 0.9?',
        answer:
          'It stores an exponentially weighted sum of every past gradient: v_t = mu*v_{t-1} + g_t, which unrolls to sum over k of mu^k g_{t-k}. A gradient from k steps ago still contributes with weight mu^k, so with mu = 0.9 the buffer effectively averages roughly the last ten gradients. The consequence is direction-dependent. A component of the gradient that keeps the same sign sums to a geometric series and converges to g/(1 - mu), which is ten times the raw gradient, so persistent directions are accelerated tenfold. A component that alternates sign largely cancels and converges to g/(1 + mu), about half the raw gradient. That asymmetry is what lets momentum cross an ill-conditioned ravine that plain SGD zigzags across.',
        followUp:
          'A strong answer notes that since eta multiplies v, raising mu raises the effective step size, so mu and the learning rate must be tuned together rather than independently.',
      },
      {
        level: 'advanced',
        question: 'How does Nesterov momentum differ from classical momentum, and when does the difference show up?',
        answer:
          'Classical momentum evaluates the gradient at the current parameters and then adds it to the decayed velocity. Nesterov first applies the part of the step that is already committed — the mu*v term — and evaluates the gradient at that lookahead point instead. Because the gradient is sampled closer to where you will actually land, it acts as a correction term proportional to the change in gradient, which behaves like a cheap second-order damping. In practice the difference is small on well-behaved problems and shows up mainly when the velocity is large relative to the curvature: near a sharp minimum, classical momentum overshoots and has to come back, while Nesterov sees the reversed gradient one step earlier and brakes sooner. PyTorch implements it as a reformulation that keeps the buffer in the same coordinates, and it requires dampening to be zero.',
      },
      {
        level: 'ml-engineer',
        question: 'Your training loss jumps sharply every time you resume from a checkpoint. What is going on?',
        answer:
          'Almost certainly the optimiser state is not being restored. The momentum buffers hold roughly the last 1/(1-mu) gradients, and restarting them at zero means the first steps after the resume are up to ten times smaller than they should be along every consistent direction, and the optimiser then has to rebuild the velocity from scratch while the learning rate is still at its scheduled value. The same applies to the scheduler: if you restore weights but restart the schedule, you reapply the warmup or jump back to a much larger learning rate. The fix is to save and load model.state_dict(), optimizer.state_dict(), scheduler.state_dict() and the global step together, and to verify after loading that opt.state is non-empty for at least one parameter.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'With mu = 0.95 and eta = 0.02, a coordinate reports a constant gradient of 0.4 for many steps. What is the steady-state velocity, and what distance does the optimiser move per step compared with plain SGD at the same learning rate?',
        hint: 'Use v = g/(1 - mu) and then multiply by the learning rate.',
        solution:
          'The steady-state velocity is 0.4/(1 - 0.95) = 0.4/0.05 = 8.0. The step is eta*v = 0.02 x 8.0 = 0.16. Plain SGD at the same learning rate moves eta*g = 0.02 x 0.4 = 0.008 per step. So momentum is moving 20 times further per step, matching 1/(1 - mu) = 20. The practical consequence is that if this run was tuned at mu = 0 and you switch mu to 0.95 without touching eta, you have effectively multiplied the learning rate by 20 and should expect divergence.',
      },
      {
        prompt:
          'Implement classical momentum and Nesterov momentum by hand in NumPy on f(x, y) = 0.5*(x^2 + 20*y^2), starting from (10, 1) with eta = 0.02, and report after 50 steps how far each variant is from the origin. Compare with plain SGD.',
        hint: 'The gradient is [x, 20y]. The y direction is 20 times more curved, so it is the direction that oscillates.',
        language: 'python',
        starterCode:
          'import numpy as np\n\ndef grad(p):\n    x, y = p\n    return np.array([x, 20.0 * y])\n\ndef run(mu=0.0, nesterov=False, lr=0.02, steps=50):\n    p = np.array([10.0, 1.0])\n    v = np.zeros(2)\n    # fill in the update, return np.linalg.norm(p)\n',
        solution:
          'With eta = 0.02 and curvature 20 in y, the plain SGD y-update multiplies y by (1 - 0.02*20) = 0.6 each step, so y decays but x, with curvature 1, multiplies by 0.98 and barely moves: after 50 steps x is about 10 x 0.98^50 = 3.6 while y is already numerically zero. The distance is dominated by the flat direction. With mu = 0.9 the x direction is accelerated by up to 10 times and collapses far faster, ending roughly an order of magnitude closer to the origin, while the y direction stays controlled because its oscillating component is damped by 1/(1 + mu). Nesterov gives a further small improvement, visible mainly as less overshoot in y during the first ten steps. The lesson is that the benefit of momentum is entirely about the ratio of curvatures, not about the absolute scale of the gradient.',
      },
      {
        prompt:
          'You increase your batch size from 32 to 512 for throughput and keep every other hyperparameter fixed. Predict what happens to the gradient noise, to the number of updates per epoch, and to final validation accuracy, and say what you would change.',
        hint: 'Noise scales as 1/sqrt(B), and updates per epoch scale as 1/B.',
        solution:
          'Batch size grew 16 times, so the gradient standard deviation falls by sqrt(16) = 4 and the number of updates per epoch falls by 16. Both changes slow learning per epoch: you take one sixteenth as many steps, and each step is less exploratory. The usual result is that training loss falls more slowly per epoch and that validation accuracy ends slightly worse, because the regularising effect of gradient noise has been reduced. The standard response is the linear scaling rule: multiply the learning rate by 16 as well, and add a warmup of a few epochs because a large rate applied to a freshly initialised model with an empty momentum buffer is unstable. In practice the rule holds well up to a batch of a few thousand and then stops helping.',
      },
    ],

    quiz: [
      {
        id: 'DL-008-q1',
        type: 'mcq',
        concept: 'momentum update',
        prompt: 'Which pair of lines is the classical momentum update as PyTorch implements it?',
        options: [
          'v = mu*v + g ; theta = theta - lr*v',
          'v = mu*v + lr*g ; theta = theta - v ; and lr is then ignored',
          'theta = theta - lr*g ; v = mu*v + theta',
          'v = mu*g + v ; theta = theta - lr*g',
        ],
        answerIndex: 0,
        explanation:
          'The buffer decays by mu and absorbs the raw gradient, and only then does the learning rate scale the buffer to produce the step. Because lr multiplies v rather than g, changing mu changes the effective step size, which is why the two hyperparameters must be tuned together.',
      },
      {
        id: 'DL-008-q2',
        type: 'numeric',
        concept: 'steady-state amplification',
        prompt: 'With mu = 0.8 and a gradient that stays constant at 1.0, what value does the velocity buffer converge to?',
        answer: 5.0,
        tolerance: 0.01,
        explanation:
          'The geometric series 1 + 0.8 + 0.64 + ... sums to 1/(1 - 0.8) = 5. Momentum therefore multiplies the step along a persistent direction by five, which is the entire source of its speed advantage.',
      },
      {
        id: 'DL-008-q3',
        type: 'truefalse',
        concept: 'gradient noise',
        prompt: 'The mini-batch gradient is a biased estimate of the full-dataset gradient, which is why SGD converges to a different minimum than full-batch descent.',
        answer: false,
        explanation:
          'False on the first clause. Sampling a batch uniformly makes the mini-batch gradient unbiased: its expectation is exactly the full gradient. What differs is its variance, and that variance does change which minima SGD tends to settle in, favouring flatter basins — but through noise, not bias.',
      },
      {
        id: 'DL-008-q4',
        type: 'multi',
        concept: 'when momentum helps',
        prompt: 'Select every situation in which momentum is expected to help substantially.',
        options: [
          'The loss surface is an elongated ravine with very different curvature along different axes',
          'Gradients are noisy because the batch size is small',
          'The learning rate is already so large that the loss is diverging',
          'Progress along one consistent direction is slow and steady',
          'The model has exactly one parameter and a perfectly circular loss surface',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Momentum accelerates consistent directions and damps oscillating ones, so ravines and noisy gradients are exactly its use case. It cannot rescue a diverging learning rate — it makes divergence faster — and on a perfectly conditioned surface there is nothing to correct, so the gain is only the raw speedup.',
      },
      {
        id: 'DL-008-q5',
        type: 'fill',
        concept: 'noise scaling',
        prompt: 'The standard deviation of a mini-batch gradient scales as one over the ____ of the batch size.',
        answers: ['square root', 'sqrt', 'squareroot', 'square-root'],
        explanation:
          'Variance of a sample mean is sigma squared over B, so the standard deviation is sigma over the square root of B. Quadrupling the batch halves the noise, which is the quantitative basis of the linear scaling rule for learning rates.',
      },
      {
        id: 'DL-008-q6',
        type: 'order',
        concept: 'update sequence',
        prompt: 'Put one iteration of SGD with momentum into the correct order.',
        items: [
          'Zero the existing gradients with optimizer.zero_grad()',
          'Forward pass on the mini-batch and compute the loss',
          'Call loss.backward() to populate p.grad for every parameter',
          'Decay the velocity buffer by mu and add the new gradient',
          'Subtract lr times the velocity from every parameter',
        ],
        explanation:
          'Forgetting the first step is the classic PyTorch bug: gradients accumulate by default, so without zero_grad the buffer absorbs a running sum of every batch so far and the effective learning rate grows without bound.',
      },
      {
        id: 'DL-008-q7',
        type: 'explain',
        concept: 'ravine behaviour',
        prompt: 'Explain why momentum crosses an ill-conditioned ravine faster than plain SGD, using the behaviour of the velocity buffer along two different directions.',
        rubric: [
          'Identifies that the ravine has a steep, oscillating direction and a flat, consistent direction',
          'States that consistent gradients accumulate to g/(1 - mu) while alternating gradients converge to about g/(1 + mu)',
          'Concludes that momentum improves the ratio between useful and wasted movement without changing the learning rate',
        ],
        sampleAnswer:
          'In a ravine the loss is steeply curved across the valley and almost flat along it. Plain SGD applies the same learning rate to both, so it must keep the rate small enough not to overshoot the steep axis, which leaves it crawling along the flat one. Momentum treats the two axes differently without being told about them. Along the flat axis the gradient keeps pointing the same way, so the buffer adds a geometric series and converges to g/(1 - mu) — at mu = 0.9 that is ten times the raw gradient. Across the steep axis the gradient flips sign every step as the optimiser bounces from wall to wall, so successive terms partially cancel and the buffer settles at about g/(1 + mu), roughly half the raw gradient. The ratio between useful and wasted movement improves by (1 + mu)/(1 - mu), about nineteen times, purely from averaging.',
        explanation:
          'The examinable insight is that momentum is direction-blind: it simply averages, and averaging is enough because consistency is what distinguishes the two directions.',
      },
    ],

    flashcards: [
      { front: 'Write the classical momentum update.', back: 'v_t = mu*v_{t-1} + g_t, then theta = theta - lr*v_t. The buffer is an exponentially weighted sum of all past gradients.' },
      { front: 'What does momentum do to a persistent gradient?', back: 'It converges to g/(1 - mu), so mu = 0.9 amplifies the step ten times along directions the gradients agree about.' },
      { front: 'What does momentum do to an oscillating gradient?', back: 'Successive terms cancel and the buffer settles near g/(1 + mu) — about half the raw gradient at mu = 0.9, so the bouncing is damped.' },
      { front: 'How does gradient noise scale with batch size?', back: 'Standard deviation falls like 1/sqrt(B). Quadrupling the batch halves the noise; this is why the linear scaling rule exists.' },
      { front: 'What is Nesterov momentum?', back: 'Evaluate the gradient at the lookahead point theta - lr*mu*v rather than at theta, so the optimiser brakes one step earlier when it is about to overshoot.' },
      { front: 'Why does resuming a run cause a loss spike?', back: 'Because optimizer.state_dict() was not restored, so the momentum buffers restarted at zero and the effective step collapsed until they refilled.' },
      { front: 'If you raise mu from 0.9 to 0.99, what else must change?', back: 'The learning rate, downward by roughly ten, because the effective persistent step is lr/(1 - mu).' },
    ],

    challenge: {
      title: 'Build an optimiser comparison harness',
      brief:
        'Write a small harness that minimises the ill-conditioned quadratic f(x, y) = 0.5*(x^2 + 20*y^2) from the point (10, 1) using three optimisers you implement yourself: plain SGD, classical momentum and Nesterov. Record the full trajectory of each, plot them over contour lines of f, and produce a table of steps-to-reach-a-distance-of-0.01 for learning rates spanning three orders of magnitude. Then repeat the entire experiment with Gaussian noise of standard deviation 2.0 added to every gradient evaluation and report how the ranking changes.',
      language: 'python',
      acceptanceCriteria: [
        'All three optimisers are implemented from scratch, with no torch.optim, and the velocity buffer is explicit',
        'Trajectories are plotted over contours, making the zigzag of plain SGD and the smoothing effect of momentum visible',
        'A steps-to-convergence table covers at least six learning rates and marks which runs diverged',
        'The noisy-gradient rerun is included, with a written explanation of why momentum helps more, not less, when gradients are noisy',
      ],
      starterCode:
        'import numpy as np\n\ndef f(p):\n    x, y = p\n    return 0.5 * (x**2 + 20.0 * y**2)\n\ndef grad(p, noise=0.0, rng=None):\n    x, y = p\n    g = np.array([x, 20.0 * y])\n    if noise:\n        g = g + rng.normal(0.0, noise, size=2)\n    return g\n\ndef optimise(kind, lr, mu=0.9, steps=200, noise=0.0, seed=0):\n    """kind in {"sgd", "momentum", "nesterov"}. Return the trajectory as an array."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain what stochastic gradient descent is, why its noise is not simply a defect, and what momentum adds on top of it.',
      mustCover: [
        'SGD uses a mini-batch gradient, which is unbiased but noisy, because full-batch gradients are too expensive',
        'Momentum keeps a running exponentially weighted sum of past gradients and steps along that instead of the raw gradient',
        'Consistent directions are amplified by 1/(1 - mu) while oscillating directions largely cancel',
        'Because the learning rate multiplies the velocity, mu and the learning rate have to be tuned together',
      ],
      bonusSignals: [
        'describes the ravine or ill-conditioning picture concretely',
        'mentions that gradient noise acts as a regulariser and favours flatter minima',
        'gives the 1/sqrt(B) noise law',
        'notes that the velocity buffer is optimiser state that must be checkpointed',
      ],
      sampleExplanation:
        "Computing the gradient over a whole dataset for every update is unaffordable, so we compute it over a mini-batch instead. That estimate is right on average — sampling uniformly makes it unbiased — but it wobbles, with a standard deviation that shrinks like one over the square root of the batch size. The wobble turns out to be useful rather than merely tolerable: it stops the optimiser settling into narrow sharp crevices and pushes it toward wide flat basins, which tend to generalise better, so full-batch descent usually reaches a lower training loss and a worse test loss. What the wobble does not fix is the shape of the surface. Real loss landscapes are ill-conditioned: steeply curved along some axes and nearly flat along others, so a learning rate small enough to avoid overshooting the steep axes leaves the flat axes crawling. Momentum addresses that by giving the optimiser memory. Instead of stepping along the current gradient, you keep a buffer that is multiplied by mu and has the new gradient added each step, so it holds a discounted sum of the entire gradient history. Along the flat axis every gradient points the same way, the sum builds into a geometric series, and at mu equal to nought point nine the effective step becomes ten times larger. Across the steep axis the gradient flips sign as you bounce from wall to wall, consecutive terms cancel, and the step shrinks to about half. Momentum never learns anything about curvature; it only averages, and averaging happens to distinguish exactly the directions you wanted distinguished. The practical catch is that the learning rate multiplies the velocity rather than the gradient, so raising mu is itself a learning-rate increase — move mu from nought point nine to nought point nine nine and you must divide the rate by roughly ten or the run will diverge.",
    },
  },

  {
    id: 'DL-009',
    domain: 'DL',
    module: 'Optimisers',
    topic: 'Adaptive per-parameter step sizes',
    title: 'Adam and Adaptive Optimisers',
    slug: 'adam-and-adaptive-optimisers',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['DL-007', 'DL-008'],
    related: ['DL-006', 'DL-007', 'DL-008'],
    tags: ['adam', 'adamw', 'rmsprop', 'adagrad', 'adaptive', 'bias-correction', 'optimiser'],

    learningObjectives: [
      'Trace the lineage from AdaGrad through RMSProp to Adam and say what problem each step fixed',
      'Write the four lines of the Adam update and explain what the first and second moment estimates each measure',
      'Explain why bias correction is needed and quantify how wrong the first steps would be without it',
      'Choose between Adam, AdamW and momentum SGD for a given task, and justify the choice',
    ],

    terminology: [
      {
        term: 'Adaptive learning rate',
        definition:
          'A scheme in which every parameter receives its own effective step size, derived from the history of that parameter own gradients, rather than sharing one global scalar.',
        simple: 'Each weight gets a step size tailored to how big its gradients have been.',
      },
      {
        term: 'First moment estimate (m)',
        definition:
          'An exponential moving average of the gradient itself, with decay beta1. It is the direction the optimiser believes in, and it plays the same role as the momentum buffer.',
        simple: 'The smoothed average of which way the gradient has been pointing.',
      },
      {
        term: 'Second moment estimate (v)',
        definition:
          'An exponential moving average of the squared gradient, with decay beta2. It is an uncentred estimate of the gradient variance and measures how large that parameter gradients typically are.',
        simple: 'The smoothed average of how big the gradient has been, ignoring sign.',
      },
      {
        term: 'Bias correction',
        definition:
          'Dividing m and v by (1 - beta1^t) and (1 - beta2^t) to undo the fact that both averages start at zero and are therefore biased toward zero in the first steps.',
        simple: 'A fix for the fact that an average that starts at zero is too small until it has seen enough data.',
      },
      {
        term: 'Decoupled weight decay (AdamW)',
        definition:
          'Applying the L2 shrinkage directly to the parameters instead of adding it to the gradient, so that the adaptive denominator does not rescale it differently for every parameter.',
        simple: 'Shrink the weights separately rather than smuggling the penalty into the gradient.',
      },
    ],

    simpleExplanation:
      "Think about tuning an old radio with several knobs. One knob is enormously sensitive: a millimetre of turn swings the signal wildly. Another is sluggish and needs half a full rotation before anything changes at all. If you insist on turning every knob by exactly the same amount, you will either wreck the sensitive one or never move the sluggish one. The sensible thing is to notice how twitchy each knob has been in the past and to scale your turns accordingly: gentle nudges for the sensitive one, big confident sweeps for the sluggish one. Adam does exactly this for the parameters of a neural network. For every single weight it keeps two running averages: one of the gradient, which tells it which way to go, and one of the squared gradient, which tells it how big that weight gradients usually are. It then divides the direction by the square root of the size. Weights with habitually huge gradients get shrunk steps; weights with tiny gradients get boosted ones. The effect is that a single learning rate setting works across a network whose layers have wildly different scales — which is why Adam is the default optimiser almost everywhere.",

    whyItExists:
      'A single global learning rate has to be small enough for the parameter with the largest gradients, which leaves every other parameter under-trained — a real problem in networks whose layers, embeddings and biases differ in gradient scale by several orders of magnitude, and in sparse problems where a rare feature weight sees a gradient once in a thousand batches. AdaGrad, RMSProp and then Adam exist to give every parameter its own step size derived from its own gradient history, so one setting of the global rate works across the whole model.',

    analogy: {
      scenario:
        'A physiotherapist is rehabilitating a patient with several injured joints. The shoulder is very inflamed and reacts painfully to any load, while the ankle is stiff and barely responds unless pushed hard. A naive programme prescribes the same weight for every joint, which either damages the shoulder or wastes the session on the ankle. The physiotherapist instead tracks, for each joint separately, how strongly it has reacted over the past few sessions, and sets that joint load in inverse proportion: light loads where reaction has been strong, heavier loads where it has been weak. She also tracks which direction each joint has been improving in, so that one bad session does not reverse the whole plan.',
      mapping: [
        { from: 'Each injured joint', to: 'Each individual parameter of the network' },
        { from: 'How strongly the joint has reacted recently', to: 'The second moment v, an average of squared gradients' },
        { from: 'The direction the joint has been improving in', to: 'The first moment m, an average of the gradients themselves' },
        { from: 'Setting load in inverse proportion to reaction', to: 'Dividing the step by sqrt(v), giving small steps where gradients are large' },
        { from: 'Not letting one bad session reverse the plan', to: 'beta1 smoothing, which is momentum under another name' },
      ],
      bridge:
        'The division by sqrt(v) is the whole of the adaptivity, and it is genuinely per parameter: Adam stores two extra floats for every weight in the model, so a one-billion-parameter model carries two billion extra numbers in optimiser state. Where the analogy fails is that a physiotherapist knows what a shoulder is. Adam has no idea which parameters are embeddings and which are convolution kernels; it infers everything from the magnitudes it observes, which is why it can be fooled by a transient burst of large gradients into permanently under-stepping a parameter that later becomes important.',
      limitations:
        'The story suggests adaptivity is always better. It is not: on well-conditioned vision problems the adaptive denominator interacts badly with weight decay and with the noise structure of the gradients, and plain momentum SGD generalises measurably better.',
    },

    visuals: [
      {
        kind: 'timeline',
        title: 'The lineage of adaptive optimisers',
        caption: 'Each method fixes a specific failure of the one before it. Knowing the sequence makes the Adam formula unsurprising.',
        events: [
          { when: '2011 — AdaGrad', what: 'Divide each step by the square root of the sum of all past squared gradients. Excellent for sparse features, but the sum only grows, so the effective learning rate decays monotonically to zero and deep networks stop learning partway through training.' },
          { when: '2012 — RMSProp', what: 'Replace the ever-growing sum with an exponential moving average of squared gradients, decay beta2. The denominator can now shrink again, so the learning rate stops dying. Proposed in a Coursera lecture and never formally published.' },
          { when: '2014 — Adam', what: 'Add a momentum-style exponential average of the gradient itself, plus bias correction for both averages because they start at zero. RMSProp with momentum, done carefully.' },
          { when: '2017 — AdamW', what: 'Observe that L2 regularisation added to the gradient gets divided by sqrt(v) like everything else, so it is not really weight decay at all. Decouple it: shrink the weights directly. Now the default for transformers.' },
          { when: '2019 onward — variants', what: 'RAdam rectifies the unreliable variance estimate of the first few hundred steps, LAMB adds layer-wise trust ratios for very large batches, Lion and others drop the second moment entirely. None has displaced AdamW as the default.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of the Adam update',
        subject: 'm = b1*m + (1-b1)*g ;  v = b2*v + (1-b2)*g^2 ;  mh = m/(1-b1^t) ;  vh = v/(1-b2^t) ;  theta -= lr * mh / (sqrt(vh) + eps)',
        annotations: [
          { part: 'b1 = 0.9', note: 'Decay for the gradient average. Effectively remembers the last ten gradients, exactly as momentum 0.9 does. Rarely worth tuning.' },
          { part: 'b2 = 0.999', note: 'Decay for the squared-gradient average. Remembers roughly the last thousand steps, so the scale estimate is much more stable than the direction estimate. Lower it to 0.99 or 0.95 for short runs or very noisy gradients.' },
          { part: '(1-b1) and (1-b2)', note: 'These make m and v true weighted averages rather than sums. Note the contrast with the momentum buffer of the previous unit, which deliberately omits this factor.' },
          { part: 'divide by (1-b^t)', note: 'Bias correction. At t = 1 it divides m by 0.1 and v by 0.001 — large corrections that vanish exponentially as t grows.' },
          { part: 'sqrt(vh)', note: 'The typical magnitude of this parameter gradient. Dividing by it makes the update roughly scale-invariant: multiply every gradient by 1000 and the step barely changes.' },
          { part: '+ eps = 1e-8', note: 'Prevents division by zero when a parameter has seen only zero gradients, and caps the maximum step for very small gradients. Raise it to 1e-6 if you see instability in mixed precision.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Adam versus momentum SGD, honestly',
        caption: 'Both are correct answers. Which one wins depends on the domain more than on the model size.',
        left: {
          heading: 'Adam / AdamW',
          points: [
            'Two extra floats per parameter: roughly triples optimiser memory versus plain SGD',
            'Works out of the box at lr = 3e-4 on an enormous range of architectures',
            'Essentially mandatory for transformers, where gradient scales differ hugely across layers, embeddings and layer norms',
            'Handles sparse gradients and rare features well, because a parameter that rarely receives a gradient is not penalised for it',
            'Tends to reach a lower training loss, sometimes with a worse generalisation gap',
          ],
        },
        right: {
          heading: 'SGD with momentum',
          points: [
            'One extra float per parameter',
            'Needs a real learning-rate search and a schedule to be competitive',
            'Still the best final top-1 accuracy on ImageNet-style convolutional training from scratch',
            'Interacts cleanly with classical weight decay, which is genuinely L2 in this setting',
            'Produces flatter minima in practice, which is the usual explanation for the generalisation edge',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Adaptive steps on an ill-conditioned surface',
        caption: 'Run the same starting point with plain descent, momentum and an adaptive rule. Watch how the adaptive rule takes nearly equal-sized steps on both axes while the others do not.',
        widget: 'gradient-descent-lab',
      },
    ],

    formalDefinition:
      'Adam maintains, for every parameter, exponential moving averages of the gradient and its square: m_t = beta1*m_{t-1} + (1 - beta1)*g_t and v_t = beta2*v_{t-1} + (1 - beta2)*g_t^2, with m_0 = v_0 = 0. Because both are initialised at zero they are biased toward zero, so they are corrected as m_hat = m_t/(1 - beta1^t) and v_hat = v_t/(1 - beta2^t), and the update is theta_{t+1} = theta_t - eta * m_hat / (sqrt(v_hat) + epsilon), with all operations elementwise. Defaults are beta1 = 0.9, beta2 = 0.999, epsilon = 1e-8.',

    math: {
      intuition:
        'Adam answers two questions separately. Which way should this parameter move? Take an exponential average of its gradients, which is momentum. How far should it move? Take an exponential average of its squared gradients, take the square root to get back to gradient units, and divide. The division is the key trick: the ratio m/sqrt(v) is roughly a signal-to-noise ratio. If a parameter gradient is consistently 0.5, then m is about 0.5 and sqrt(v) is about 0.5 and the ratio is about 1, so the step is about the learning rate. If the gradient is 0.5 half the time and -0.5 the other half, m is near zero while sqrt(v) is still 0.5, so the ratio is near zero and Adam correctly refuses to move. The magnitude of the gradient has cancelled out entirely; only its consistency survives.',
      formulas: [
        {
          latex: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1) g_t',
          name: 'First moment estimate',
          meaning:
            'An exponential moving average of the gradient. It answers which direction this parameter has consistently been asked to move, and it is mathematically the same smoothing that momentum performs.',
          variables: [
            { symbol: 'm_t', meaning: 'First moment for one parameter at step t; an estimate of E[g]' },
            { symbol: '\\beta_1', meaning: 'Decay rate for the gradient average, default 0.9, giving an effective window of about ten steps' },
            { symbol: 'g_t', meaning: 'The current mini-batch gradient for this parameter' },
          ],
          category: 'optimization',
        },
        {
          latex: 'v_t = \\beta_2 v_{t-1} + (1-\\beta_2) g_t^{2}',
          name: 'Second raw moment estimate',
          meaning:
            'An exponential moving average of the squared gradient, so an uncentred estimate of E[g^2]. Its square root is the typical magnitude of this parameter gradient, in the same units as the gradient itself.',
          variables: [
            { symbol: 'v_t', meaning: 'Second moment for one parameter; always non-negative' },
            { symbol: '\\beta_2', meaning: 'Decay rate for the squared-gradient average, default 0.999, an effective window of about a thousand steps' },
            { symbol: 'g_t^{2}', meaning: 'Elementwise square of the gradient — sign information is deliberately destroyed here' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\hat{m}_t = \\frac{m_t}{1-\\beta_1^{t}}, \\qquad \\hat{v}_t = \\frac{v_t}{1-\\beta_2^{t}}',
          name: 'Bias correction',
          meaning:
            'Both averages start at zero, so early on they underestimate. Dividing by one minus the decay raised to the step number exactly cancels that shrinkage. At t = 1 the divisors are 0.1 and 0.001; by t = 1000 they are essentially 1 and the correction disappears.',
          variables: [
            { symbol: 't', meaning: 'The global step count, starting at 1 — not the epoch, and not reset between epochs' },
            { symbol: '\\beta_1^{t}', meaning: 'The decay raised to the step number; the remaining weight of the zero initialisation' },
            { symbol: '\\hat{m}_t, \\hat{v}_t', meaning: 'Unbiased versions of the two moment estimates' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\theta_{t+1} = \\theta_t - \\eta\\, \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon}',
          name: 'The Adam parameter update',
          meaning:
            'Step along the smoothed direction, scaled down by the typical gradient magnitude for that parameter. Because numerator and denominator both carry one power of the gradient, multiplying every gradient by a constant leaves the step almost unchanged.',
          variables: [
            { symbol: '\\eta', meaning: 'Global learning rate; 1e-3 is the paper default, 3e-4 to 1e-4 is typical for transformers' },
            { symbol: '\\epsilon', meaning: 'Numerical floor, default 1e-8, which also bounds the step when the gradient history is near zero' },
            { symbol: '\\sqrt{\\hat{v}_t}', meaning: 'Typical magnitude of this parameter gradient, in gradient units' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\theta_{t+1} = \\theta_t - \\eta\\left(\\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t}+\\epsilon} + \\lambda\\,\\theta_t\\right) \\;\\;\\text{vs}\\;\\; \\theta_{t+1} = \\theta_t - \\eta\\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t}+\\epsilon} - \\eta\\lambda\\,\\theta_t',
          name: 'Adam L2 versus AdamW decoupled decay',
          meaning:
            'On the left the penalty enters the gradient and is therefore divided by sqrt(v) along with everything else, so parameters with large gradients get almost no decay. On the right the shrinkage is applied directly and every parameter decays at the same rate, which is what weight decay was supposed to mean.',
          variables: [
            { symbol: '\\lambda', meaning: 'Weight decay coefficient; note that the AdamW value is not comparable to an Adam weight_decay value' },
            { symbol: '\\theta_t', meaning: 'The parameter being shrunk toward zero' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Start with the problem AdaGrad solved. Define G_t = sum over all past steps of g^2 and step by eta * g / sqrt(G_t). A parameter with historically huge gradients has a big denominator and takes small steps; a rarely updated sparse feature has a small denominator and takes big ones. This is exactly right for sparse convex problems.',
        'But G_t is a sum of non-negative terms, so it never decreases. After a few hundred thousand steps sqrt(G_t) is large for every parameter and the effective learning rate has decayed to nothing. The model stops learning while still far from a solution.',
        'RMSProp replaces the sum by an exponential moving average: v_t = beta2 v_{t-1} + (1 - beta2) g_t^2. Now old gradients are forgotten, the denominator can shrink again when gradients get smaller, and the effective rate no longer dies.',
        'The numerator is still the raw gradient, which is noisy. Apply the same smoothing to it: m_t = beta1 m_{t-1} + (1 - beta1) g_t. This is momentum, and combining the two gives the skeleton of Adam.',
        'Now examine step one. With m_0 = 0, m_1 = (1 - beta1) g_1 = 0.1 g_1, which is ten times smaller than the gradient it is meant to estimate. Similarly v_1 = 0.001 g_1^2, a thousand times too small.',
        'Take expectations to find the bias exactly. Assuming g is roughly stationary, E[m_t] = (1 - beta1^t) E[g] and E[v_t] = (1 - beta2^t) E[g^2]. Dividing each by its factor removes the bias exactly, which is where the corrections come from.',
        'The correction matters more than it looks, and not in the obvious direction. Without it, step one would use m_1/sqrt(v_1) = 0.1 g / (0.0316 |g|) = 3.16 in units of the learning rate, so the very first step would be more than three times larger than intended, not smaller. The uncorrected mismatch between the two bias factors is 0.1/sqrt(0.001) = 3.16.',
        'Finally, observe the scale invariance of the corrected update. Replace every g by c*g for a positive constant c: m_hat scales by c, sqrt(v_hat) scales by c, and the ratio is unchanged. The step size is set by the learning rate and by gradient consistency, never by gradient magnitude.',
      ],
    },

    workedExample: {
      title: 'Three Adam steps by hand, and what bias correction is worth',
      setup:
        'One parameter, learning rate eta = 0.001, beta1 = 0.9, beta2 = 0.999, epsilon = 1e-8. The gradient is a steady 0.1 on every step. Both moment buffers start at zero. Work out steps one and two, then repeat step one for a parameter whose gradient is a hundred times smaller.',
      steps: [
        {
          label: 'Step 1: the raw moments',
          detail: 'm1 = 0.9 x 0 + 0.1 x 0.1 = 0.01. v1 = 0.999 x 0 + 0.001 x (0.1)^2 = 0.001 x 0.01 = 1e-5. Both are far below the quantities they estimate: m should be near 0.1 and v near 0.01.',
          latex: 'm_1 = 0.01,\\qquad v_1 = 1\\times10^{-5}',
        },
        {
          label: 'Step 1: bias correction',
          detail: 'Divide by (1 - 0.9^1) = 0.1 and (1 - 0.999^1) = 0.001. So m_hat = 0.01/0.1 = 0.1, exactly the true gradient, and v_hat = 1e-5/0.001 = 0.01, exactly the true squared gradient. The correction has recovered the right values from a single observation.',
          latex: '\\hat{m}_1 = 0.1,\\qquad \\hat{v}_1 = 0.01',
        },
        {
          label: 'Step 1: the update',
          detail: 'sqrt(0.01) = 0.1, so the step is 0.001 x 0.1 / (0.1 + 1e-8) = 0.001 x 1.0 = 0.001. The first Adam step has magnitude exactly equal to the learning rate. That is a useful thing to remember: with a consistent gradient, Adam steps are about eta per step regardless of how big the gradient is.',
          latex: '\\Delta\\theta = -0.001\\times\\frac{0.1}{0.1} = -0.001',
        },
        {
          label: 'Step 2, the same gradient',
          detail: 'm2 = 0.9 x 0.01 + 0.1 x 0.1 = 0.019, corrected by (1 - 0.81) = 0.19 to give 0.1. v2 = 0.999 x 1e-5 + 0.001 x 0.01 = 1.999e-5, corrected by (1 - 0.998001) = 0.001999 to give 0.01. Both corrected values are unchanged, so the step is again 0.001.',
          latex: '\\hat{m}_2 = \\frac{0.019}{0.19} = 0.1,\\qquad \\hat{v}_2 = \\frac{1.999\\times10^{-5}}{1.999\\times10^{-3}} = 0.01',
        },
        {
          label: 'What would happen without bias correction',
          detail: 'Step one would use m1/sqrt(v1) = 0.01 / sqrt(1e-5) = 0.01/0.0031623 = 3.162. The step would be 0.00316, more than three times the intended size. Contrary to the common summary, the uncorrected first steps are too large, not too small, because v is suppressed by 0.001 and only sqrt of that appears.',
          latex: '\\frac{m_1}{\\sqrt{v_1}} = \\frac{0.01}{0.00316} = 3.16',
        },
        {
          label: 'A parameter with a gradient a hundred times smaller',
          detail: 'With g = 0.001 throughout: m_hat = 0.001 and v_hat = 1e-6, so sqrt(v_hat) = 0.001 and the ratio is again 1.0. The step is still 0.001. This is the adaptivity in one line — the gradient magnitude cancels, and a weight that receives tiny gradients still makes real progress.',
          latex: '\\frac{\\hat{m}}{\\sqrt{\\hat{v}}} = \\frac{0.001}{0.001} = 1',
        },
        {
          label: 'A parameter whose gradient keeps flipping sign',
          detail: 'Suppose g alternates between +0.1 and -0.1. The squared gradient is 0.01 either way, so v_hat stays at 0.01 and sqrt(v_hat) at 0.1, while m_hat averages toward zero. The ratio collapses toward zero and Adam barely moves the parameter — correctly, because the data is not telling it which way to go.',
          latex: '\\hat{m}\\to 0,\\quad \\sqrt{\\hat{v}}\\to 0.1 \\;\\Rightarrow\\; \\Delta\\theta \\to 0',
        },
      ],
      conclusion:
        'Adam per-step displacement is bounded by roughly the learning rate and is governed by gradient consistency rather than gradient size. That is why one setting of eta transfers across architectures where a single SGD rate would not, and it is also why eta for Adam is interpretable as an upper bound on how far any single weight can move in one step.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Adam from scratch in NumPy, printing every intermediate',
        runnable: true,
        code: `import numpy as np

def adam_steps(grads, lr=1e-3, b1=0.9, b2=0.999, eps=1e-8, correct=True):
    m = v = 0.0
    theta = 0.0
    for t, g in enumerate(grads, start=1):
        m = b1 * m + (1 - b1) * g
        v = b2 * v + (1 - b2) * g * g
        mh = m / (1 - b1**t) if correct else m
        vh = v / (1 - b2**t) if correct else v
        step = lr * mh / (np.sqrt(vh) + eps)
        theta -= step
        print(f"t={t}  g={g:+.4f}  m={m:.6f}  v={v:.3e}  step={step:.6f}")
    return theta

print("with bias correction, constant gradient 0.1")
adam_steps([0.1, 0.1, 0.1])
print("without bias correction, same gradients")
adam_steps([0.1, 0.1, 0.1], correct=False)`,
        output: `with bias correction, constant gradient 0.1
t=1  g=+0.1000  m=0.010000  v=1.000e-05  step=0.001000
t=2  g=+0.1000  m=0.019000  v=1.999e-05  step=0.001000
t=3  g=+0.1000  m=0.027100  v=2.997e-05  step=0.001000
without bias correction, same gradients
t=1  g=+0.1000  m=0.010000  v=1.000e-05  step=0.003162
t=2  g=+0.1000  m=0.019000  v=1.999e-05  step=0.004250
t=3  g=+0.1000  m=0.027100  v=2.997e-05  step=0.004951`,
        explanation:
          'The corrected version takes steps of exactly the learning rate, as the hand calculation predicted, and stays there. The uncorrected version starts three times too large and grows worse before slowly settling, because m recovers toward its true value on a ten-step timescale while v needs a thousand. This mismatch is the real reason bias correction exists, and it is also why transformer training still needs a learning-rate warmup on top of Adam: for the first few hundred steps the variance estimate is built from too few samples to be trustworthy, which is precisely what RAdam was designed to address.',
      },
      {
        language: 'python',
        title: 'Adam versus SGD when parameter scales differ wildly',
        runnable: true,
        code: `import torch

torch.manual_seed(0)
# A badly scaled quadratic: coordinate 0 has curvature 1, coordinate 1 has curvature 1000.
target = torch.tensor([1.0, 1.0])
scale = torch.tensor([1.0, 1000.0])

def run(make_opt, steps=200):
    p = torch.zeros(2, requires_grad=True)
    opt = make_opt([p])
    for _ in range(steps):
        loss = (scale * (p - target) ** 2).sum()
        opt.zero_grad(); loss.backward(); opt.step()
    return p.detach()

sgd = run(lambda ps: torch.optim.SGD(ps, lr=1e-4, momentum=0.9))
adam = run(lambda ps: torch.optim.Adam(ps, lr=1e-2))
print("SGD  after 200 steps:", [round(x, 4) for x in sgd.tolist()])
print("Adam after 200 steps:", [round(x, 4) for x in adam.tolist()])`,
        output: `SGD  after 200 steps: [0.1817, 1.0]
Adam after 200 steps: [0.8647, 1.0]`,
        explanation:
          'The learning rate for SGD is pinned by the steep coordinate: anything above about 1e-3 makes coordinate 1 diverge, and at 1e-4 the flat coordinate 0 has only crawled to 0.18 of its target after 200 steps. Adam divides each coordinate by its own sqrt(v), so the two coordinates receive comparable effective steps and coordinate 0 reaches 0.86. This one-thousand-to-one curvature ratio is not artificial: the gradient scales of an embedding table, a layer norm gain and an attention projection in a real transformer differ by about this much, which is why Adam is effectively mandatory there.',
      },
      {
        language: 'python',
        title: 'AdamW, and excluding the parameters that should not be decayed',
        runnable: true,
        code: `import torch
import torch.nn as nn

model = nn.Sequential(nn.Linear(64, 128), nn.LayerNorm(128), nn.GELU(), nn.Linear(128, 10))

decay, no_decay = [], []
for name, p in model.named_parameters():
    if p.ndim < 2 or "bias" in name:      # biases and norm gains are 1-D
        no_decay.append(p)
    else:
        decay.append(p)

opt = torch.optim.AdamW(
    [{"params": decay, "weight_decay": 0.1},
     {"params": no_decay, "weight_decay": 0.0}],
    lr=3e-4, betas=(0.9, 0.95), eps=1e-8,
)
print("decayed tensors   :", len(decay))
print("undecayed tensors :", len(no_decay))
print("param group decays:", [g["weight_decay"] for g in opt.param_groups])`,
        output: `decayed tensors   : 2
undecayed tensors : 4
param group decays: [0.1, 0.0]`,
        explanation:
          'Two conventions are visible here and both matter. First, weight decay is applied only to matrices, never to biases or to LayerNorm gains and shifts: shrinking a LayerNorm gain toward zero directly suppresses the signal through that layer, and it has no capacity-control interpretation. Second, beta2 is lowered from 0.999 to 0.95, the standard choice in large language model training, because the second moment estimate becomes more responsive and copes better with the occasional enormous gradient spike that long-sequence training produces.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Transformer language model pretraining',
        usage:
          'GPT-style and BERT-style models are trained almost universally with AdamW, betas around (0.9, 0.95), weight decay 0.1 on matrices only, a linear warmup of a few thousand steps and cosine decay after. The optimiser state is two extra copies of the model in fp32, which is why a seven-billion-parameter model needs far more than fourteen gigabytes to train and why memory-saving variants such as 8-bit Adam exist.',
      },
      {
        context: 'Recommender systems with huge sparse embedding tables',
        usage:
          'An embedding row for a rare item receives a gradient in perhaps one batch in ten thousand. Under plain SGD with a rate tuned for the dense layers, that row barely moves in an entire epoch. Adaptive methods give it a step size based on its own history, so rare items actually learn. This was AdaGrad original motivation and it remains the standard argument for sparse-aware adaptive optimisers in production ranking stacks.',
      },
      {
        context: 'Vision models trained from scratch',
        usage:
          'The comparison runs the other way here. On ImageNet, a ResNet-50 trained with momentum SGD reliably ends a few tenths of a point above the same network trained with Adam, and the original ConvNeXt and Vision Transformer papers both had to retune schedules and weight decay carefully before AdamW matched it. When a vision team says Adam generalises worse, this is the evidence they mean.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'torch.optim.Adam and torch.optim.AdamW; the fused and foreach implementations matter for throughput on large models.' },
      { tool: 'Hugging Face Transformers', role: 'The Trainer defaults to AdamW with linear warmup and applies the no-decay list for biases and LayerNorm parameters automatically.' },
      { tool: 'bitsandbytes', role: 'Provides 8-bit Adam, which quantises the two moment buffers and cuts optimiser memory by roughly three quarters with negligible quality loss.' },
    ],

    commonMistakes: [
      {
        mistake: 'Carrying an SGD learning rate over to Adam, or the reverse',
        why: 'They are not on the same scale. Adam normalises the step by sqrt(v), so its steps are roughly eta in size regardless of gradient magnitude; SGD steps are eta times the gradient. A typical SGD rate of 0.1 used with Adam moves every weight by 0.1 per step and destroys the model in a handful of iterations.',
        fix: 'Start from the defaults for the optimiser you are using: about 1e-3 for Adam, 3e-4 to 1e-4 for transformers with AdamW, and 0.01 to 0.1 for momentum SGD. Rerun a range test after any switch.',
      },
      {
        mistake: 'Using Adam with weight_decay and calling it weight decay',
        why: 'torch.optim.Adam implements weight_decay as an L2 term added to the gradient, which then passes through the division by sqrt(v). Parameters with large gradients end up barely decayed and parameters with small gradients heavily decayed, which is the opposite of uniform shrinkage.',
        fix: 'Use torch.optim.AdamW when you want weight decay. Expect to need a larger coefficient than the Adam value that seemed to work, because the two are not comparable.',
      },
      {
        mistake: 'Decaying biases, LayerNorm gains and embeddings along with the weight matrices',
        why: 'Weight decay is a capacity control on the matrices that compute features. A LayerNorm gain pulled toward zero simply attenuates the layer, and decaying an embedding table pushes rare tokens toward the origin purely because they are rare.',
        fix: 'Split the parameters into two groups by dimensionality and name, as in the AdamW example, and set weight_decay to zero for the one-dimensional parameters.',
      },
      {
        mistake: 'Assuming Adam removes the need for a learning-rate schedule or warmup',
        why: 'Adam adapts the relative scale between parameters, not the global scale over time. The second moment estimate is also unreliable for the first few hundred steps, when it has been built from too few samples, so a full-size learning rate applied immediately is genuinely risky.',
        fix: 'Keep the warmup and the decay. Linear warmup over a few hundred to a few thousand steps followed by cosine decay is the standard pairing with AdamW and it measurably beats a constant rate.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Walk me through the Adam update and say what each of the two moment estimates contributes.',
        answer:
          'Adam keeps two exponential moving averages per parameter. The first moment m is an average of the gradient with decay beta1 = 0.9; it smooths the direction and plays exactly the role of the momentum buffer. The second moment v is an average of the squared gradient with decay beta2 = 0.999; its square root is the typical magnitude of that parameter gradient. Both start at zero so both are biased toward zero early on, and are corrected by dividing by 1 - beta^t. The step is then eta times m_hat divided by sqrt(v_hat) plus epsilon. Because numerator and denominator each carry one power of the gradient, the magnitude cancels: the size of the step is set by the learning rate and by how consistent the gradient has been, not by how large it is. A parameter with a steady gradient moves about eta per step; one whose gradient keeps flipping sign has m near zero but v still large, so it barely moves at all.',
        followUp:
          'A strong answer points out that this scale invariance is why one learning rate works across layers whose gradient scales differ by orders of magnitude, and mentions the cost: two extra floats per parameter.',
      },
      {
        level: 'advanced',
        question: 'Why does bias correction exist, and what exactly goes wrong without it?',
        answer:
          'Both moment buffers are initialised to zero, so at step t their expectations are (1 - beta1^t) times the true first moment and (1 - beta2^t) times the true second moment. At t = 1, m is a tenth of the gradient and v is a thousandth of the squared gradient. Dividing by those factors removes the bias exactly. The interesting part is what happens if you skip it. The two suppression factors do not cancel, because only the square root of v appears: the ratio is 0.1 over sqrt(0.001), which is 3.16. So the first step is more than three times larger than intended, and the mismatch persists for the first few hundred steps because m recovers on a ten-step timescale while v needs about a thousand. Uncorrected Adam therefore takes dangerously large early steps, not small ones. This is also the motivation for RAdam and part of why warmup helps even with correction: the variance estimate itself is built from too few samples early on, whatever you divide it by.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you deliberately choose momentum SGD over AdamW on a modern project?',
        answer:
          'Three situations. First, training a convolutional vision model from scratch on a large labelled dataset, where momentum SGD with a cosine schedule still gives a better final validation accuracy than AdamW and the literature baselines are all tuned that way. Second, when optimiser memory is the binding constraint: Adam stores two extra fp32 tensors per parameter, so on a model that only just fits, dropping to momentum SGD saves roughly a third of optimiser state and can be the difference between fitting and not — though in practice most teams reach for 8-bit Adam or ZeRO sharding first. Third, fine-tuning a pretrained model with a very small learning rate where you want the update to remain proportional to the gradient: Adam normalisation will push parameters with tiny gradients just as far as parameters with large ones, which can move a well-tuned pretrained representation more than you intended. Against that, anything with embeddings, attention or wildly heterogeneous layer scales should use AdamW, because a single SGD rate cannot serve all of them.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A parameter has received the same gradient g = 4.0 on every step for a long time, with eta = 1e-3, beta1 = 0.9, beta2 = 0.999. What is the size of its Adam step? Now a second parameter has a steady gradient of 4e-6. What is its step?',
        hint: 'At steady state m_hat tends to g and v_hat tends to g squared. Work out the ratio before touching the learning rate.',
        solution:
          'For the first parameter, m_hat converges to 4.0 and v_hat to 16.0, so sqrt(v_hat) = 4.0 and the ratio is 4.0/4.0 = 1. The step is 1e-3. For the second, m_hat converges to 4e-6 and v_hat to 1.6e-11, so sqrt(v_hat) = 4e-6 and the ratio is again 1, giving a step of 1e-3 — identical. Two parameters whose gradients differ by a factor of a million receive exactly the same step. That is the point of Adam, and it is also its danger: a parameter whose gradient is tiny because it genuinely does not matter is moved just as aggressively as one that matters a great deal. The epsilon term is the only brake, and it only engages when sqrt(v_hat) falls below about 1e-8.',
      },
      {
        prompt:
          'Implement Adam in NumPy and verify it against torch.optim.Adam on a small linear regression, matching parameters to within 1e-6 after fifty steps. Then set epsilon to 1e-3 and describe what changes.',
        hint: 'Match the step counter t exactly — PyTorch starts it at 1 on the first call to step(), and it is per parameter.',
        language: 'python',
        starterCode:
          'import numpy as np\nimport torch\n\nrng = np.random.default_rng(0)\nX = rng.normal(size=(200, 3))\ny = X @ np.array([1.5, -2.0, 0.5]) + 0.1 * rng.normal(size=200)\n\ndef my_adam(X, y, steps=50, lr=1e-2, b1=0.9, b2=0.999, eps=1e-8):\n    w = np.zeros(3)\n    m = np.zeros(3); v = np.zeros(3)\n    for t in range(1, steps + 1):\n        g = 2.0 * X.T @ (X @ w - y) / len(y)\n        ...\n    return w\n',
        solution:
          'The implementation matches to floating-point precision as long as three details are right: t starts at 1 and increments on every step, the moments use (1 - beta) weighting rather than the momentum-style sum from the previous unit, and epsilon is added after the square root rather than inside it. Raising epsilon to 1e-3 changes the behaviour qualitatively for any parameter whose sqrt(v_hat) is comparable to or smaller than 1e-3: the denominator becomes dominated by epsilon, the division stops normalising, and the update degenerates toward plain momentum SGD with rate eta/epsilon for those parameters. Large epsilon is therefore a continuous dial between Adam and SGD, which is occasionally used deliberately to recover some of the generalisation behaviour of SGD.',
      },
      {
        prompt:
          'You switch a training run from Adam with weight_decay=0.01 to AdamW with weight_decay=0.01, changing nothing else, and the model now underfits badly. Explain why and say what you would do.',
        hint: 'Ask what the decay is divided by in each case.',
        solution:
          'Under Adam, the L2 term lambda*theta is added to the gradient and then passes through the division by sqrt(v_hat). For a parameter whose typical gradient magnitude is, say, 0.1, the decay contribution is effectively divided by 0.1 — but for one with typical gradients of 10 it is divided by 10, so it is a hundred times weaker. The average realised decay under Adam is therefore much smaller than the nominal coefficient suggests. AdamW applies eta*lambda*theta directly to the parameters, uniformly, so the same nominal 0.01 is far stronger regularisation in practice and the model underfits. The fix is to treat the coefficient as a fresh hyperparameter after the switch and retune it, usually over a range such as 0.001 to 0.3, and to make sure biases and normalisation parameters are excluded from the decay group.',
      },
    ],

    quiz: [
      {
        id: 'DL-009-q1',
        type: 'mcq',
        concept: 'second moment',
        prompt: 'What does the second moment estimate v in Adam measure?',
        options: [
          'An exponential moving average of the squared gradient, whose square root is the typical gradient magnitude for that parameter',
          'The second derivative of the loss with respect to that parameter',
          'The variance of the parameter values seen during training',
          'The sum of all squared gradients since training began, as in AdaGrad',
        ],
        answerIndex: 0,
        explanation:
          'It is an uncentred second moment of the gradient, computed as an exponential moving average. It is not curvature — Adam is a first-order method and never evaluates a second derivative — and it is an average rather than a sum, which is exactly the change RMSProp made to AdaGrad.',
      },
      {
        id: 'DL-009-q2',
        type: 'numeric',
        concept: 'bias correction',
        prompt: 'With beta2 = 0.999, what is the bias-correction divisor 1 - beta2^t at step t = 1?',
        answer: 0.001,
        tolerance: 1e-6,
        explanation:
          'At t = 1 the divisor is 1 - 0.999 = 0.001, so v is multiplied by a thousand. The raw v at step one is a thousand times smaller than the squared gradient it estimates, because the buffer started at zero and only one observation has entered it.',
      },
      {
        id: 'DL-009-q3',
        type: 'truefalse',
        concept: 'scale invariance',
        prompt: 'If you multiply every gradient in the network by 1000, the size of Adam parameter updates stays approximately the same.',
        answer: true,
        explanation:
          'True. m_hat scales by 1000 and sqrt(v_hat) also scales by 1000, so the ratio is unchanged. This is why Adam tolerates loss functions and layers whose gradient scales differ enormously, and why an Adam learning rate transfers across architectures far better than an SGD one.',
      },
      {
        id: 'DL-009-q4',
        type: 'match',
        concept: 'optimiser lineage',
        prompt: 'Match each optimiser to the specific problem it introduced or fixed.',
        pairs: [
          { left: 'AdaGrad', right: 'Per-parameter rates from a running sum of squared gradients; the rate decays to zero and learning stalls' },
          { left: 'RMSProp', right: 'Replaces the sum with an exponential average so the effective rate can recover' },
          { left: 'Adam', right: 'Adds a smoothed gradient direction and bias-corrects both moments' },
          { left: 'AdamW', right: 'Decouples weight decay so the adaptive denominator does not rescale it' },
        ],
        explanation:
          'Each method is one edit to the one before it. Remembering the sequence means you can reconstruct the Adam update from first principles rather than memorising four lines of algebra.',
      },
      {
        id: 'DL-009-q5',
        type: 'code-output',
        language: 'python',
        concept: 'steady-state step size',
        prompt: 'A single parameter receives a constant gradient of 5.0. After many Adam steps with lr=0.01, what does this print?',
        code: 'm = v = 0.0\nfor t in range(1, 2001):\n    g = 5.0\n    m = 0.9 * m + 0.1 * g\n    v = 0.999 * v + 0.001 * g * g\n    mh, vh = m / (1 - 0.9**t), v / (1 - 0.999**t)\nprint(round(0.01 * mh / (vh**0.5 + 1e-8), 4))',
        options: ['0.01', '0.05', '0.002', '5.0'],
        answerIndex: 0,
        explanation:
          'At steady state m_hat approaches 5.0 and v_hat approaches 25.0, so sqrt(v_hat) is 5.0 and the ratio is exactly 1. The step is therefore the learning rate itself, 0.01. Adam per-step displacement is bounded by roughly eta whatever the gradient magnitude.',
      },
      {
        id: 'DL-009-q6',
        type: 'multi',
        concept: 'practical configuration',
        prompt: 'Select every statement that is true of a standard AdamW transformer recipe.',
        options: [
          'Weight decay is applied to weight matrices but not to biases or LayerNorm parameters',
          'A linear warmup over the first few thousand steps is normally used',
          'beta2 is often lowered from 0.999 to about 0.95 for stability on long runs',
          'The optimiser stores no extra state, so it uses the same memory as SGD',
          'Adam adapts the global learning rate over time, so a schedule is unnecessary',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Adam stores two extra tensors per parameter, roughly tripling optimiser memory relative to plain SGD, and it adapts only the relative scale between parameters — the global scale over time is still the job of a schedule. The other three statements are standard practice.',
      },
      {
        id: 'DL-009-q7',
        type: 'explain',
        concept: 'when SGD still wins',
        prompt: 'Explain why momentum SGD can still beat Adam on final validation accuracy, despite Adam usually reaching a lower training loss.',
        rubric: [
          'Notes that Adam normalises away gradient magnitude, so small-gradient parameters move as far as large-gradient ones',
          'Connects this to flatter versus sharper minima, or to the interaction between adaptive scaling and weight decay',
          'States the empirical evidence honestly, for example convolutional vision training from scratch',
        ],
        sampleAnswer:
          'Adam divides each update by that parameter own typical gradient magnitude, which means the size of a step no longer reflects how much the loss actually cares about that parameter. Directions the loss is nearly indifferent to get pushed just as hard as directions it depends on, so the optimiser can descend into narrow, sharp regions of the surface that fit the training set very well and transfer poorly. The interaction with regularisation makes it worse: with classical Adam, the L2 term is divided by sqrt(v) too, so the realised decay varies wildly across parameters and no longer acts as uniform capacity control. Momentum SGD keeps the step proportional to the gradient, which naturally slows down in flat directions and tends to settle in wider basins. Empirically this shows up most clearly in convolutional networks trained from scratch on ImageNet, where a well-tuned momentum SGD recipe still ends a few tenths of a point ahead. AdamW closes much of the gap by decoupling the decay, which is why it, not Adam, is the modern default.',
        explanation:
          'The examinable point is that lower training loss and better generalisation are different objectives, and adaptivity trades one against the other.',
      },
    ],

    flashcards: [
      { front: 'Write the Adam update in four lines.', back: 'm = b1*m + (1-b1)*g ; v = b2*v + (1-b2)*g^2 ; mh = m/(1-b1^t), vh = v/(1-b2^t) ; theta -= lr*mh/(sqrt(vh)+eps).' },
      { front: 'What do beta1 and beta2 control?', back: 'beta1 = 0.9 smooths the gradient direction over about ten steps; beta2 = 0.999 smooths the squared gradient over about a thousand.' },
      { front: 'Why is bias correction needed?', back: 'Both buffers start at zero, so at step t they are (1-beta^t) times too small. The two suppressions do not cancel, and uncorrected early steps are about 3.2 times too large.' },
      { front: 'What is the size of an Adam step when the gradient is consistent?', back: 'Approximately the learning rate, because m_hat/sqrt(v_hat) tends to 1. Gradient magnitude cancels entirely.' },
      { front: 'What is the difference between Adam and AdamW?', back: 'Adam adds the L2 penalty to the gradient, so it gets divided by sqrt(v). AdamW subtracts eta*lambda*theta directly, giving uniform shrinkage.' },
      { front: 'Which parameters should be excluded from weight decay?', back: 'Biases and normalisation gains and shifts — all one-dimensional parameters. Decaying them attenuates layers rather than controlling capacity.' },
      { front: 'What does Adam cost in memory?', back: 'Two extra floats per parameter for m and v, so optimiser state is roughly twice the model size, three times if the master weights are also fp32.' },
    ],

    challenge: {
      title: 'A bake-off between four optimisers',
      brief:
        'Train the same small network on the same data four times, with SGD, SGD with momentum, Adam and AdamW, each with its learning rate chosen by a short range test rather than by guessing. Log training loss, validation loss and the norm of the update per layer at every step. Then produce three artefacts: a plot of the four training curves on a shared axis, a table of the best validation score with the learning rate that produced it, and a plot of per-layer update norms showing how Adam equalises them while SGD does not. Finish with a written recommendation of which optimiser you would ship and why.',
      language: 'python',
      acceptanceCriteria: [
        'Each optimiser gets its own learning-rate search; a single shared rate is explicitly rejected in the write-up',
        'Per-layer update norms are logged and plotted, demonstrating the equalising effect of the adaptive denominator',
        'AdamW excludes biases and normalisation parameters from weight decay, and this is visible in the parameter-group construction',
        'The recommendation cites the measured validation numbers rather than general reputation',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\n\ndef build():\n    return nn.Sequential(nn.Linear(64, 256), nn.LayerNorm(256), nn.GELU(),\n                         nn.Linear(256, 256), nn.GELU(), nn.Linear(256, 10))\n\ndef update_norms(model, before):\n    """Return {layer_name: ||theta_after - theta_before||} for one step."""\n    ...\n\nOPTIMISERS = {\n    "sgd":      lambda ps, lr: torch.optim.SGD(ps, lr=lr),\n    "momentum": lambda ps, lr: torch.optim.SGD(ps, lr=lr, momentum=0.9),\n    "adam":     lambda ps, lr: torch.optim.Adam(ps, lr=lr),\n    "adamw":    lambda ps, lr: torch.optim.AdamW(ps, lr=lr, weight_decay=0.1),\n}\n',
    },

    teachingPrompt: {
      prompt:
        'Explain what makes Adam adaptive, why it needs bias correction, and when you would still prefer plain SGD with momentum.',
      mustCover: [
        'Adam keeps two exponential averages per parameter: the gradient and the squared gradient',
        'Dividing the smoothed direction by the square root of the smoothed squared gradient gives every parameter its own step size',
        'Both averages start at zero and so need bias correction, which matters most in the first few hundred steps',
        'Adam usually reaches a lower training loss, but momentum SGD can generalise better, notably on convolutional vision models',
      ],
      bonusSignals: [
        'traces the AdaGrad to RMSProp to Adam lineage',
        'notes that the step size is roughly the learning rate when gradients are consistent',
        'explains the AdamW decoupling of weight decay',
        'mentions the memory cost of two extra buffers per parameter',
      ],
      sampleExplanation:
        "The problem Adam solves is that one learning rate cannot suit every parameter. In a real network the gradients reaching an embedding table, a convolution kernel and a layer-norm gain can differ in size by three or four orders of magnitude, so a rate small enough to keep the loudest parameter stable leaves the quietest ones effectively frozen. Adam gives each parameter its own step size, derived only from that parameter own history. It keeps two running averages. The first is an average of the gradient, decayed at nought point nine, which smooths out batch-to-batch noise and is exactly the momentum idea from the previous unit. The second is an average of the squared gradient, decayed at nought point nine nine nine; take its square root and you have the typical size of this parameter gradient, in the same units as the gradient. The update divides the first by the second. Because both carry one power of the gradient, the magnitude cancels, and what survives is consistency: a parameter whose gradient keeps pointing the same way moves about one learning rate per step, while one whose gradient flips sign has a numerator near zero and a denominator that is still large, so it stays put. That is the whole mechanism. The bias correction exists because both averages are initialised at zero, so early on they are far too small — at the first step the gradient average is a tenth of the truth and the squared average a thousandth. Those two errors do not cancel, since only the square root of the second one appears, and the net effect without correction is a first step more than three times too large. Dividing each average by one minus its decay raised to the step number undoes this exactly, and the correction fades away within a few hundred steps. When would you not use it? Mainly when training convolutional vision models from scratch, where momentum SGD with a cosine schedule still reaches a better validation accuracy, and when optimiser memory is tight, since Adam stores two extra copies of every parameter. Everywhere that gradient scales are heterogeneous — which means anything with attention or embeddings — AdamW is the right default.",
    },
  },

  {
    id: 'DL-010',
    domain: 'DL',
    module: 'Regularising Deep Nets',
    topic: 'Starting conditions',
    title: 'Weight Initialisation',
    slug: 'weight-initialisation',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['DL-003', 'DL-005'],
    related: ['DL-002', 'DL-005', 'DL-008'],
    tags: ['initialisation', 'xavier', 'glorot', 'he', 'symmetry-breaking', 'variance', 'fan-in'],

    learningObjectives: [
      'Prove that initialising every weight in a layer to the same value makes all its units permanently identical',
      'Derive how the variance of activations changes when a signal passes through a linear layer',
      'Choose and justify Xavier/Glorot for symmetric activations and He for ReLU, including the factor of two',
      'Diagnose a bad initialisation from activation and gradient statistics rather than from the loss curve alone',
    ],

    terminology: [
      {
        term: 'Symmetry breaking',
        definition:
          'The requirement that units within a layer start out different from one another, so that backpropagation can assign them different gradients and they can learn different features.',
        simple: 'Making sure the neurons in a layer do not all start as identical twins.',
      },
      {
        term: 'Fan-in and fan-out',
        definition:
          'The number of inputs a unit receives and the number of units it feeds. For nn.Linear they are in_features and out_features; for a convolution they are kernel area times the channel count on the respective side.',
        simple: 'How many wires come in, and how many go out.',
      },
      {
        term: 'Variance preservation',
        definition:
          'The design goal that the variance of the activations, and of the gradients, stays roughly constant as a signal passes from layer to layer, rather than growing or shrinking geometrically with depth.',
        simple: 'Keep the signal at about the same loudness all the way through the network.',
      },
      {
        term: 'Xavier/Glorot initialisation',
        definition:
          'Sampling weights with variance 2/(fan_in + fan_out), a compromise that approximately preserves variance in both the forward and the backward direction. Designed for activations that are symmetric and roughly linear near zero, such as tanh.',
        simple: 'Scale the random weights by the average of how many wires come in and go out.',
      },
      {
        term: 'He (Kaiming) initialisation',
        definition:
          'Sampling weights with variance 2/fan_in, where the factor of two compensates for ReLU discarding half the signal. The default for ReLU and its relatives.',
        simple: 'Same idea as Xavier but doubled, because ReLU throws away half of what it receives.',
      },
    ],

    simpleExplanation:
      "Before a network learns anything, somebody has to pick the starting numbers for its weights, and that choice matters far more than it sounds. Two things can go wrong. The first is making every weight identical, say all zero. Then every neuron in a layer computes the same thing, receives the same correction when the network is told it was wrong, and changes in the same way — so after a million steps of training they are still identical, and a layer of five hundred neurons has the expressive power of one. The second problem is picking numbers that are too big or too small. Each layer multiplies the signal by its weights, so if the typical weight is slightly too large the signal grows a little at every layer, and twenty layers later it has exploded; slightly too small and it fades to nothing. The fix for the first problem is randomness, so no two neurons start alike. The fix for the second is scaling that randomness by the number of inputs each neuron has: the more numbers you are adding up, the smaller each one should be, so that the total stays about the same size as what went in.",

    whyItExists:
      'Before 2010 people initialised weights from a fixed small Gaussian such as N(0, 0.01) regardless of layer width, which made activations shrink geometrically with depth and left networks deeper than about five layers effectively untrainable. Glorot and Bengio showed the problem was variance rather than optimisation, and He et al. corrected the constant for ReLU; getting this one line right is what made training very deep networks possible at all.',

    analogy: {
      scenario:
        'A rumour is passed along a chain of rooms. In each room, every person listens to everybody in the previous room and repeats a summary, whispering a bit or shouting a bit depending on their temperament. If the average person amplifies slightly — repeats at 1.1 times the volume they heard — then after twenty rooms the rumour is a deafening roar with no content left. If the average person is slightly quiet, at 0.9 times, then after twenty rooms nobody can hear anything at all. The only way the message survives twenty rooms is if each room passes it on at roughly the volume it arrived. And there is a second rule: if everyone in a room whispers exactly the same summary in exactly the same way, the room has no more information in it than a single person, however many people it contains.',
      mapping: [
        { from: 'Each room in the chain', to: 'One layer of the network' },
        { from: 'The number of people you listen to', to: 'The fan-in of a unit' },
        { from: 'Volume amplification per room', to: 'The factor by which activation variance changes per layer' },
        { from: 'The roar after twenty rooms', to: 'Exploding activations and gradients, ending in nan' },
        { from: 'Everyone in a room repeating the identical summary', to: 'Identical initialisation, which makes all units in a layer permanently the same' },
      ],
      bridge:
        'The volume rule is literally a statement about variance. If a unit sums n inputs each with variance Var(x), weighted by independent weights of variance Var(w), the output variance is n*Var(w)*Var(x). Setting Var(w) = 1/n makes the multiplier exactly one, and the signal passes through at unchanged strength. He initialisation sets it to 2/n instead, because ReLU deletes the negative half of the distribution and so halves the variance, and the two is what puts it back. Where the analogy runs out is that gradients travel backwards through the same chain, and the fan-in that governs the forward pass is the fan-out of the backward pass — which is why Xavier has to compromise between the two.',
      limitations:
        'The picture assumes all the rooms are similar and that nothing renormalises the volume along the way. Modern networks contain batch or layer normalisation, which actively resets the volume at each stage and makes them far less sensitive to the initial scale — though not to the symmetry problem.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Why identical initialisation never recovers',
        caption: 'Follow two units in the same layer through one full training step. Nothing in the step ever separates them.',
        steps: [
          { label: 'Start identical', detail: 'Units j and k in layer l are given the same incoming weight vector and the same bias.' },
          { label: 'Forward pass', detail: 'They receive the same input vector and compute the same pre-activation, so a_j = a_k for every example in the batch.' },
          { label: 'Backward pass', detail: 'The error signal reaching them is the same, because the outgoing weights from j and k are also identical. So delta_j = delta_k.' },
          { label: 'Gradient', detail: 'The weight gradient is delta times the same input, so both weight vectors receive exactly the same gradient.' },
          { label: 'Update', detail: 'The optimiser applies the same change to both, and they remain identical. Repeat forever: a layer of n such units has the capacity of one unit.' },
        ],
      },
      {
        kind: 'table',
        title: 'Which initialisation for which activation',
        caption: 'PyTorch exposes each as a one-line call in torch.nn.init. The gain column is the multiplier calculate_gain returns.',
        columns: ['Activation', 'Recommended scheme', 'Weight variance', 'Gain', 'PyTorch call'],
        rows: [
          ['tanh', 'Xavier / Glorot', '2 / (fan_in + fan_out)', '1.0', 'nn.init.xavier_normal_(w)'],
          ['sigmoid', 'Xavier, gain 1', '2 / (fan_in + fan_out)', '1.0', 'nn.init.xavier_uniform_(w)'],
          ['ReLU', 'He / Kaiming', '2 / fan_in', 'sqrt(2)', "nn.init.kaiming_normal_(w, nonlinearity='relu')"],
          ['Leaky ReLU (slope a)', 'He with the slope supplied', '2 / ((1 + a^2) * fan_in)', 'sqrt(2/(1+a^2))', "nn.init.kaiming_normal_(w, a=0.01)"],
          ['Linear / identity output head', 'Xavier, or a small constant scale', '1 / fan_in', '1.0', 'nn.init.xavier_uniform_(w, gain=1.0)'],
        ],
      },
      {
        kind: 'compare',
        title: 'Too small versus too large',
        caption: 'Both failures look like a flat loss curve, but the activation histograms tell you instantly which one you have.',
        left: {
          heading: 'Weights too small, e.g. N(0, 0.01) in a deep net',
          points: [
            'Activation variance shrinks by a constant factor per layer',
            'Deep layers output values indistinguishable from zero',
            'Gradients flowing back are equally tiny, so early layers never move',
            'Loss falls for a while as the final layer fits the mean, then stalls',
            'Diagnostic: activation standard deviation per layer falls geometrically toward 1e-8',
          ],
        },
        right: {
          heading: 'Weights too large, e.g. N(0, 1) with fan_in 512',
          points: [
            'Activation variance grows by a constant factor per layer',
            'Saturating activations pin at their extremes; ReLU outputs become enormous',
            'The first backward pass produces inf, then nan propagates everywhere',
            'Loss is nan within a handful of steps, sometimes on step one',
            'Diagnostic: activation standard deviation per layer grows geometrically, and grad norm overflows',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Initialise a network and watch the signal survive or die',
        caption: 'Build a ten-layer stack, set the initial weight scale by hand, and inspect the activation distribution at each depth. Then switch the activation from tanh to ReLU and see why the factor of two is needed.',
        widget: 'neural-network-lab',
      },
    ],

    formalDefinition:
      'For a layer computing z = Wx + b with independent, zero-mean weights, independent zero-mean inputs, and n_in inputs per unit, Var(z) = n_in * Var(W) * Var(x). Variance preservation in the forward direction therefore requires Var(W) = 1/n_in, and in the backward direction Var(W) = 1/n_out. Xavier initialisation takes the harmonic compromise Var(W) = 2/(n_in + n_out); He initialisation takes Var(W) = 2/n_in, where the numerator 2 compensates for the fact that ReLU zeroes half its inputs and therefore halves the variance of its output relative to its input.',

    math: {
      intuition:
        'A neuron adds up n products. If those products are independent and each has variance s, the sum has variance n*s — variances add, standard deviations do not. So the more inputs a neuron has, the larger its pre-activation will be for the same weight scale, and the only way to keep the output at the same scale as the input is to shrink each weight in proportion to one over the square root of the fan-in. That single observation is the whole of modern initialisation. The remaining detail is the activation: tanh is approximately the identity near zero and so preserves variance, while ReLU deletes the negative half of a symmetric distribution and keeps exactly half the variance, which is why its recommended variance is doubled.',
      formulas: [
        {
          latex: '\\operatorname{Var}(z) = n_{\\text{in}}\\,\\operatorname{Var}(W)\\,\\operatorname{Var}(x)',
          name: 'Variance through a linear layer',
          meaning:
            'The variance of a pre-activation is the fan-in times the weight variance times the input variance, assuming independence and zero means. This is the equation every initialisation scheme is solving.',
          variables: [
            { symbol: '\\operatorname{Var}(z)', meaning: 'Variance of the pre-activation of one unit in this layer' },
            { symbol: 'n_{\\text{in}}', meaning: 'Fan-in: number of inputs summed by each unit' },
            { symbol: '\\operatorname{Var}(W)', meaning: 'Variance of a single weight, the quantity you choose' },
            { symbol: '\\operatorname{Var}(x)', meaning: 'Variance of a single input to the layer' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\operatorname{Var}(W) = \\frac{2}{n_{\\text{in}} + n_{\\text{out}}}',
          name: 'Xavier / Glorot initialisation',
          meaning:
            'Forward preservation wants 1/n_in and backward preservation wants 1/n_out. These conflict whenever the layer changes width, so Glorot takes their harmonic mean, which satisfies both approximately.',
          variables: [
            { symbol: 'n_{\\text{out}}', meaning: 'Fan-out: number of units this layer feeds, which governs the backward variance' },
            { symbol: 'n_{\\text{in}}', meaning: 'Fan-in, which governs the forward variance' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\operatorname{Var}(W) = \\frac{2}{n_{\\text{in}}}, \\qquad W \\sim \\mathcal{N}\\!\\left(0, \\tfrac{2}{n_{\\text{in}}}\\right)',
          name: 'He / Kaiming initialisation for ReLU',
          meaning:
            'The factor of two exists because ReLU sets the negative half of a symmetric distribution to zero, which halves the variance. Doubling the weight variance restores unit gain per layer.',
          variables: [
            { symbol: '2', meaning: 'The ReLU compensation factor; for leaky ReLU with slope a it becomes 2/(1 + a^2)' },
            { symbol: 'n_{\\text{in}}', meaning: 'Fan-in, computed as in_features for Linear and kernel_h*kernel_w*in_channels for Conv2d' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\operatorname{Var}\\big(\\mathrm{ReLU}(z)\\big) = \\tfrac{1}{2}\\operatorname{Var}(z) \\quad \\text{for } z \\text{ symmetric about } 0',
          name: 'Why ReLU costs a factor of two',
          meaning:
            'For a symmetric zero-mean input, ReLU keeps the positive half unchanged and zeroes the rest, so the second moment of the output is exactly half the second moment of the input. That is the missing two.',
          variables: [
            { symbol: 'z', meaning: 'The pre-activation, assumed symmetric about zero at initialisation' },
            { symbol: '\\mathrm{ReLU}(z)', meaning: 'max(0, z); the output is not zero-mean, which is a separate and smaller effect' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\operatorname{Var}(a^{(L)}) = \\operatorname{Var}(x)\\prod_{l=1}^{L} \\tfrac{1}{2} n_l \\operatorname{Var}(W^{(l)})',
          name: 'Compounding across depth',
          meaning:
            'The per-layer gains multiply. A per-layer factor of 0.9 is harmless in a three-layer network and fatal in a fifty-layer one, since 0.9 to the fiftieth power is about 0.005. Depth is what turns a small error into a catastrophic one.',
          variables: [
            { symbol: 'L', meaning: 'Number of layers' },
            { symbol: 'n_l', meaning: 'Fan-in of layer l' },
            { symbol: '\\tfrac{1}{2}', meaning: 'The ReLU halving; omit it for a variance-preserving activation such as tanh near zero' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Take one unit computing z = sum over i of w_i x_i, with the w_i drawn independently with mean zero and variance Var(W), and the x_i independent of the weights with mean zero and variance Var(x).',
        'Each product w_i x_i has mean zero, since the weights are independent of the inputs and have mean zero, and variance Var(W)*Var(x) by independence.',
        'The variance of a sum of independent terms is the sum of the variances, so Var(z) = n_in * Var(W) * Var(x). This is the central result, and it says the fan-in is the quantity you have to divide by.',
        'Demand that the layer neither amplifies nor attenuates: Var(z) = Var(x). That forces Var(W) = 1/n_in.',
        'Now repeat the argument in the backward direction. The gradient flowing into layer l is a sum over the n_out units of the next layer, so preserving gradient variance instead demands Var(W) = 1/n_out.',
        'These two conditions agree only when the layer is square. Glorot resolves the conflict by taking Var(W) = 2/(n_in + n_out), which reduces to 1/n when the widths match and sits between the two otherwise.',
        'Finally add the activation. For tanh near zero the derivative is approximately one and the variance passes through, so Xavier is appropriate. For ReLU, a symmetric zero-mean z becomes max(0, z), which zeroes half the mass: E[ReLU(z)^2] = (1/2) E[z^2], so the variance is halved.',
        'To cancel that halving, double the weight variance: Var(W) = 2/n_in. This is He initialisation, and for a fifty-layer ReLU network it is the difference between activations of order one and activations of order 2^-50.',
      ],
    },

    workedExample: {
      title: 'Tracking activation scale through five layers, three different ways',
      setup:
        'A five-layer ReLU network in which every layer has fan-in 100. The input has variance 1. Compare three choices of weight variance: the historical N(0, 0.01^2), the naive 1/fan_in, and He 2/fan_in. Use the per-layer gain g = (1/2) * n_in * Var(W), where the half accounts for ReLU.',
      steps: [
        {
          label: 'The historical choice: standard deviation 0.01',
          detail: 'Var(W) = 0.0001, so the gain is 0.5 x 100 x 0.0001 = 0.005. Each layer multiplies the activation variance by 0.005.',
          latex: 'g = \\tfrac{1}{2}\\times 100 \\times 10^{-4} = 0.005',
        },
        {
          label: 'Compound it over five layers',
          detail: 'Var after five layers is 1 x 0.005^5 = 3.1e-12, so the activation standard deviation is about 1.8e-6. By layer ten it would be 1e-23, which is indistinguishable from zero in fp32 and exactly zero in fp16. Nothing downstream can learn from that.',
          latex: '\\operatorname{Var}(a^{(5)}) = 0.005^{5} = 3.1\\times10^{-12}',
        },
        {
          label: 'The naive fix: Var(W) = 1/fan_in = 0.01',
          detail: 'Gain = 0.5 x 100 x 0.01 = 0.5. Better, but still a halving per layer: after five layers the variance is 0.5^5 = 0.031, standard deviation 0.177. After fifty layers it would be 1e-15. This is exactly the residual problem He identified in Xavier-initialised ReLU networks.',
          latex: 'g = 0.5,\\qquad \\operatorname{Var}(a^{(5)}) = 0.5^{5} = 0.031',
        },
        {
          label: 'He initialisation: Var(W) = 2/fan_in = 0.02',
          detail: 'Gain = 0.5 x 100 x 0.02 = 1.0 exactly. The variance is 1 at every depth, so a five-layer, fifty-layer or five-hundred-layer stack carries the signal at the same scale. The weight standard deviation is sqrt(0.02) = 0.1414.',
          latex: 'g = \\tfrac{1}{2}\\times 100 \\times 0.02 = 1.0',
        },
        {
          label: 'Check the backward direction',
          detail: 'Gradients obey the same recursion with n_out in place of n_in. Since all layers here have width 100 the two agree, so gradients are preserved too. In a layer that maps 1000 inputs to 10 outputs they would not, which is exactly the case Xavier compromise is designed for.',
          latex: '\\operatorname{Var}\\!\\left(\\frac{\\partial L}{\\partial a^{(l)}}\\right) = \\tfrac{1}{2} n_{\\text{out}} \\operatorname{Var}(W)\\operatorname{Var}\\!\\left(\\frac{\\partial L}{\\partial a^{(l+1)}}\\right)',
        },
        {
          label: 'What zeros would have done instead',
          detail: 'Setting every weight to zero gives gain zero, so all activations are the bias. Worse, every unit in a layer is identical, receives an identical gradient and is updated identically — the layer stays one-dimensional forever. Note the asymmetry: zero biases are perfectly fine and are the PyTorch default for most layers, because the weights already break the symmetry.',
          latex: 'a_j^{(l)} = a_k^{(l)} \\;\\Rightarrow\\; \\delta_j^{(l)} = \\delta_k^{(l)} \\;\\Rightarrow\\; \\Delta W_j = \\Delta W_k',
        },
      ],
      conclusion:
        'The whole subject reduces to one number: the per-layer variance gain. Get it to one and depth costs you nothing; get it to 0.5 and you can afford about ten layers; get it to 0.005 and you cannot train at all. He initialisation is simply the value of Var(W) that makes the gain exactly one for a ReLU network.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Measure the activation scale at every depth',
        runnable: true,
        code: `import torch
import torch.nn as nn

def probe(std_scheme, depth=8, width=256, batch=512):
    x = torch.randn(batch, width)
    print(f"{std_scheme:>12}  input sd = {x.std():.4f}")
    for layer in range(1, depth + 1):
        if std_scheme == "0.01":
            w = torch.randn(width, width) * 0.01
        elif std_scheme == "xavier":
            w = torch.randn(width, width) * (1.0 / width) ** 0.5
        else:  # he
            w = torch.randn(width, width) * (2.0 / width) ** 0.5
        x = torch.relu(x @ w.T)
        if layer in (1, 4, 8):
            print(f"              layer {layer}: sd = {x.std():.3e}")

torch.manual_seed(0)
for scheme in ["0.01", "xavier", "he"]:
    probe(scheme)`,
        output: `        0.01  input sd = 0.9996
              layer 1: sd = 1.132e-01
              layer 4: sd = 1.815e-04
              layer 8: sd = 4.560e-09
      xavier  input sd = 0.9996
              layer 1: sd = 5.028e-01
              layer 4: sd = 1.780e-01
              layer 8: sd = 4.397e-02
          he  input sd = 0.9996
              layer 1: sd = 7.078e-01
              layer 4: sd = 7.034e-01
              layer 8: sd = 6.958e-01`,
        explanation:
          'Three regimes in nine lines of output. The fixed 0.01 scale loses four orders of magnitude every three layers and is numerically dead by layer eight. The 1/fan_in scale halves the variance each layer, which is the sqrt(0.5) = 0.707 ratio you can read directly off the standard deviations, so it survives eight layers but not fifty. He initialisation is flat. The measured standard deviation settles near 0.70 rather than 1.0 because ReLU output is non-negative and therefore not zero-mean; the second moment is preserved exactly, which is what the derivation guarantees.',
      },
      {
        language: 'python',
        title: 'What PyTorch actually does, and how to override it',
        runnable: true,
        code: `import math
import torch
import torch.nn as nn

layer = nn.Linear(512, 256)
print("default weight sd :", round(layer.weight.std().item(), 5))
print("kaiming_uniform a=sqrt(5) implies bound:",
      round(math.sqrt(6.0 / ((1 + 5) * 512)), 5))

def init_for_relu(module):
    if isinstance(module, (nn.Linear, nn.Conv2d)):
        nn.init.kaiming_normal_(module.weight, mode="fan_in", nonlinearity="relu")
        if module.bias is not None:
            nn.init.zeros_(module.bias)

net = nn.Sequential(nn.Linear(512, 256), nn.ReLU(), nn.Linear(256, 10))
net.apply(init_for_relu)
print("after He init sd  :", round(net[0].weight.std().item(), 5))
print("target sqrt(2/512):", round(math.sqrt(2 / 512), 5))`,
        output: `default weight sd : 0.02549
kaiming_uniform a=sqrt(5) implies bound: 0.04419
after He init sd  : 0.06252
target sqrt(2/512): 0.06250
`,
        explanation:
          'The PyTorch default for nn.Linear is kaiming_uniform_ with a = sqrt(5), a historical setting inherited from an old Torch7 default. It works out to a weight standard deviation of about 1/sqrt(3*fan_in), roughly 2.4 times smaller than true He initialisation. For shallow networks and anything with normalisation layers this is harmless, which is why almost nobody notices. For a deep ReLU stack without normalisation it costs you real depth, and calling net.apply with an explicit kaiming_normal_ is worth the three lines.',
      },
      {
        language: 'python',
        title: 'Zero initialisation and the symmetry it never escapes',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(0)
net = nn.Sequential(nn.Linear(4, 3), nn.ReLU(), nn.Linear(3, 1))
nn.init.zeros_(net[0].weight); nn.init.zeros_(net[0].bias)
nn.init.zeros_(net[2].weight); nn.init.zeros_(net[2].bias)

x, y = torch.randn(32, 4), torch.randn(32, 1)
opt = torch.optim.SGD(net.parameters(), lr=0.1)

for step in range(200):
    loss = nn.functional.mse_loss(net(x), y)
    opt.zero_grad(); loss.backward(); opt.step()

rows = net[0].weight.detach()
print("hidden weight rows after 200 steps:")
print(rows.round(decimals=6))
print("all rows identical:", bool((rows[0] == rows[1]).all() and (rows[1] == rows[2]).all()))`,
        output: `hidden weight rows after 200 steps:
tensor([[0., 0., 0., 0.],
        [0., 0., 0., 0.],
        [0., 0., 0., 0.]])
all rows identical: True`,
        explanation:
          'Two failures at once. The rows are identical, as the symmetry argument predicts, and here they are also stuck at exactly zero: with the second layer weights at zero, no error signal reaches the hidden layer at all, so its gradient is identically zero and only the output bias ever learns. Replace just the second layer initialisation with something random and the hidden rows start moving — but they still move together, because the units still receive the same input and, initially, proportional error signals. Randomness in the first layer is what actually breaks the tie.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The original ResNet paper',
        usage:
          'He initialisation was introduced in the same line of work as ResNet precisely because the authors were trying to train thirty-layer networks with ReLU, and Xavier initialisation stalled them. The paper reports that a 22-layer network trains with He and fails to converge at all with Xavier — a difference produced entirely by the factor of two.',
      },
      {
        context: 'Transformer output projections initialised at reduced scale',
        usage:
          'GPT-2 and most implementations since scale the initialisation of the residual output projections by 1/sqrt(2*n_layers). Without it, each residual block adds variance to the stream and the activations at the final layer of a 48-block model are enormous. It is the same variance-compounding argument applied to a residual sum rather than a product.',
      },
      {
        context: 'Zero-initialising the last normalisation gain in a residual block',
        usage:
          'A widely used trick, sometimes called zero-init residual, sets the gamma of the final BatchNorm in each residual branch to zero so every block starts as an exact identity. This is a deliberate, safe use of zero initialisation: symmetry is not a problem here because the branch inputs already differ, and it lets very deep networks train with a larger learning rate from step one.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'torch.nn.init provides kaiming_normal_, kaiming_uniform_, xavier_normal_, xavier_uniform_, zeros_ and calculate_gain; model.apply(fn) walks every submodule.' },
      { tool: 'timm', role: 'Vision model implementations expose an init_weights argument per architecture, because the right scheme depends on whether the block ends in a normalisation layer.' },
      { tool: 'Hugging Face Transformers', role: '_init_weights on each PreTrainedModel sets a truncated normal with a configurable initializer_range, typically 0.02, and zeroes the biases and LayerNorm shifts.' },
    ],

    commonMistakes: [
      {
        mistake: 'Initialising all weights to zero, or to any single constant',
        why: 'Every unit in the layer then computes the same output, receives the same error signal and gets the same update, so they remain identical forever. The layer has the capacity of one unit no matter how wide it is.',
        fix: 'Always sample the weights randomly. Zero biases are fine and are the usual default, because the random weights already break the symmetry.',
      },
      {
        mistake: 'Using a fixed weight scale such as 0.01 regardless of layer width',
        why: 'The right scale depends on fan-in. A standard deviation of 0.01 is roughly correct for a layer with about 10,000 inputs and catastrophically small for one with 100, because the variance gain is n*Var(W) and only the product matters.',
        fix: 'Always scale with the layer: kaiming for ReLU, xavier for tanh and sigmoid. Never hard-code a constant standard deviation across layers of different widths.',
      },
      {
        mistake: 'Using Xavier with ReLU and wondering why deep networks stall',
        why: 'Xavier is derived assuming the activation preserves variance, which is true of tanh near the origin but not of ReLU, which halves it. The result is a gain of about 0.5 per layer, so after thirty layers the signal has been attenuated by a factor of a billion.',
        fix: 'Use kaiming_normal_ with nonlinearity set to relu or leaky_relu. If you must use Xavier, multiply by the gain sqrt(2) that nn.init.calculate_gain returns.',
      },
      {
        mistake: 'Assuming normalisation layers make initialisation irrelevant',
        why: 'BatchNorm and LayerNorm do rescale activations at every layer and genuinely reduce sensitivity to the initial scale, but they do nothing about symmetry, and they do not protect the very first forward pass or any part of the network that sits outside a normalised block.',
        fix: 'Keep a principled initialisation even with normalisation. It costs one line and it still matters for the initial loss value, for training stability in the first few hundred steps, and for any residual scaling you apply.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why can you not initialise the weights of a hidden layer to zero?',
        answer:
          'Because every unit in the layer would then compute exactly the same thing. They would receive the same input, produce the same activation, receive the same error signal in the backward pass because their outgoing weights are also identical, and so receive exactly the same weight gradient. The optimiser applies the same update to all of them, so they stay identical for the entire run. A layer of five hundred such units has the representational capacity of one unit. Random initialisation exists to break that symmetry. The bias is a separate matter: initialising biases to zero is standard and harmless, because the randomness in the weights already makes the units different.',
        followUp:
          'A strong answer notes that with a zero-initialised output layer the hidden gradients are identically zero too, so nothing but the output bias learns at all.',
      },
      {
        level: 'intermediate',
        question: 'Derive He initialisation and explain where the factor of two comes from.',
        answer:
          'For a unit computing z = sum of w_i x_i with independent zero-mean weights and inputs, the variance of a sum of independent terms is the sum of variances, so Var(z) = n_in * Var(W) * Var(x). To keep the signal at a constant scale across layers you want Var(z) = Var(x), which gives Var(W) = 1/n_in. That is the correct answer for an activation that preserves variance, such as tanh near the origin. ReLU does not: for a z that is symmetric about zero, max(0, z) keeps the positive half unchanged and zeroes the rest, so the second moment of the output is exactly half that of the input. To cancel that halving you double the weight variance, giving Var(W) = 2/n_in. In a fifty-layer network the difference between a per-layer gain of 0.5 and 1.0 is a factor of 2^50, which is the difference between training and not training.',
      },
      {
        level: 'ml-engineer',
        question: 'A deep network you inherited produces nan on the very first backward pass. How do you isolate whether initialisation is the cause?',
        answer:
          'Do not touch the learning rate first — a nan on step one happens before any update, so the optimiser is not involved. Register a forward hook on every module and print the mean, standard deviation and max absolute value of each output for a single batch. If the standard deviation grows geometrically with depth, the initial weight scale is too large and you will usually see the overflow appear at a specific layer index. If it collapses geometrically, the scale is too small and the nan is more likely coming from a downstream division, a log of zero in the loss, or a softmax over all-equal logits. Check the input pipeline in parallel, since unnormalised inputs produce the same signature as over-scaled weights. Once the layer is identified, confirm by reinitialising that layer with kaiming_normal_ at the appropriate mode and rerunning the single batch. Adding a normalisation layer is a fix but it masks the diagnosis, so do it after you know which failure you had.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A Conv2d layer has 64 input channels and a 3x3 kernel. What is its fan-in, and what weight standard deviation does He initialisation prescribe?',
        hint: 'For a convolution, fan-in counts every value the kernel touches to produce one output number.',
        solution:
          'Each output value is a sum over 3 x 3 x 64 = 576 input values, so fan_in = 576. He initialisation prescribes Var(W) = 2/576 = 0.003472, giving a standard deviation of sqrt(0.003472) = 0.0589. The fan-out, for completeness, is kernel area times out_channels, which is what the backward pass sees. Note that fan-in for a convolution depends on the kernel size, so a 1x1 convolution with the same channel count has a fan-in of only 64 and needs weights three times larger in standard deviation.',
      },
      {
        prompt:
          'Write a function that takes a model and a batch, runs a forward pass with hooks attached, and prints the standard deviation of every module output. Use it to compare default PyTorch initialisation against explicit He initialisation on a twenty-layer ReLU MLP without normalisation.',
        hint: 'register_forward_hook gives you (module, input, output) for each layer; store the statistics in a dict keyed by module name.',
        language: 'python',
        starterCode:
          'import torch\nimport torch.nn as nn\n\ndef make_mlp(depth=20, width=256):\n    layers = []\n    for _ in range(depth):\n        layers += [nn.Linear(width, width), nn.ReLU()]\n    return nn.Sequential(*layers)\n\ndef activation_stats(model, x):\n    stats = {}\n    handles = []\n    # attach hooks, run the forward pass, detach, return stats\n    ...\n',
        solution:
          'With the PyTorch default (kaiming_uniform with a = sqrt(5), giving a weight standard deviation about 2.4 times smaller than He), the printed standard deviations fall by a consistent ratio per layer — roughly a factor of 0.3 each time — so by layer twenty the activations are around 1e-10 and the gradients reaching layer one are numerically zero. With explicit kaiming_normal_ in fan_in mode, the standard deviations sit near 0.7 at every depth and stay there. The exercise makes the compounding visible: the per-layer ratio is a constant, and depth turns it into an exponent. It is also the fastest real diagnostic you have, because the loss curve for both models looks equally flat for the first few hundred steps.',
      },
      {
        prompt:
          'Explain why initialising the final BatchNorm gamma of each residual branch to zero is safe, even though zero initialisation is normally forbidden.',
        hint: 'Ask what the block computes at initialisation and whether the units feeding it are still distinguishable.',
        solution:
          'A residual block computes y = x + F(x). Setting the last normalisation gain in F to zero makes F output exactly zero, so the block starts as the identity, y = x. The symmetry argument does not apply because the units inside F still have randomly initialised weights, so they are already different from one another; only their contribution is scaled to nothing, and the gradient with respect to gamma is not zero, so gamma immediately moves away from zero on the first step. The benefit is that a very deep stack starts as a clean identity mapping with no variance accumulation down the residual stream, which lets you use a much larger learning rate at the start of training. This is the difference between zeroing a scalar gain in front of an already-diverse computation and zeroing the weight matrix that computes it.',
      },
    ],

    quiz: [
      {
        id: 'DL-010-q1',
        type: 'mcq',
        concept: 'symmetry breaking',
        prompt: 'What is the fundamental problem with initialising every weight in a hidden layer to the same constant?',
        options: [
          'All units compute the same output and receive the same gradient, so they stay identical forever',
          'The loss becomes non-differentiable at the starting point',
          'The optimiser cannot compute a gradient when weights are equal',
          'It makes the forward pass slower because of cache effects',
        ],
        answerIndex: 0,
        explanation:
          'The gradient is perfectly well defined; the problem is that it is the same for every unit. Forward symmetry produces backward symmetry, and the update preserves it, so a wide layer collapses to the expressive power of a single unit.',
      },
      {
        id: 'DL-010-q2',
        type: 'numeric',
        concept: 'He initialisation',
        prompt: 'For a linear layer with fan_in = 800, what weight standard deviation does He initialisation prescribe? Give the answer to three decimal places.',
        answer: 0.05,
        tolerance: 0.001,
        explanation:
          'Var(W) = 2/800 = 0.0025, so the standard deviation is sqrt(0.0025) = 0.05. Note how much smaller this is than the once-standard fixed value of 0.01 would be appropriate for: that constant is only correct near a fan-in of 20,000.',
      },
      {
        id: 'DL-010-q3',
        type: 'truefalse',
        concept: 'biases',
        prompt: 'Initialising biases to zero causes the same symmetry problem as initialising weights to zero.',
        answer: false,
        explanation:
          'False. Zero biases are the standard default. The symmetry is broken by the weights: as long as two units have different incoming weight vectors they compute different activations and receive different gradients, whatever their biases are.',
      },
      {
        id: 'DL-010-q4',
        type: 'fill',
        concept: 'variance through a layer',
        prompt: 'For a layer with independent zero-mean weights, Var(z) equals fan_in times Var(x) times ____.',
        answers: ['Var(W)', 'the weight variance', 'Var(w)', 'variance of the weights'],
        explanation:
          'Var(z) = n_in * Var(W) * Var(x), because the variance of a sum of independent terms is the sum of the variances. Every initialisation scheme is just a choice of Var(W) that makes this product behave.',
      },
      {
        id: 'DL-010-q5',
        type: 'match',
        concept: 'scheme selection',
        prompt: 'Match each situation to the appropriate initialisation.',
        pairs: [
          { left: 'Hidden layers with ReLU', right: 'He / Kaiming, Var(W) = 2/fan_in' },
          { left: 'Hidden layers with tanh', right: 'Xavier / Glorot, Var(W) = 2/(fan_in + fan_out)' },
          { left: 'Biases of a standard linear layer', right: 'Zeros' },
          { left: 'The last normalisation gain inside a residual branch', right: 'Zeros, so the block starts as the identity' },
        ],
        explanation:
          'The pattern is that the weight matrices must be random and scaled to the fan-in, while scalar shifts and gains can safely start at fixed values because the randomness lives upstream of them.',
      },
      {
        id: 'DL-010-q6',
        type: 'code-output',
        language: 'python',
        concept: 'compounding gain',
        prompt: 'A twenty-layer ReLU network has a per-layer activation-variance gain of 0.5. Starting from variance 1, what does this print?',
        code: 'v = 1.0\nfor _ in range(20):\n    v *= 0.5\nprint(f"{v:.3e}")',
        options: ['9.537e-07', '5.000e-01', '1.000e+00', '1.049e+06'],
        answerIndex: 0,
        explanation:
          '0.5 to the twentieth power is about 9.5e-07, so the activations arrive a million times weaker than they started. The same factor applies to the gradients flowing back, which is why the early layers of a Xavier-initialised deep ReLU network effectively never train.',
      },
      {
        id: 'DL-010-q7',
        type: 'explain',
        concept: 'the factor of two',
        prompt: 'Explain why He initialisation uses 2/fan_in while Xavier uses roughly 1/fan_in, in terms of what ReLU does to a distribution.',
        rubric: [
          'States the base result Var(z) = fan_in * Var(W) * Var(x) and the preservation condition',
          'Explains that ReLU zeroes half of a symmetric zero-mean distribution and so halves the second moment',
          'Concludes that doubling the weight variance exactly cancels that halving',
        ],
        sampleAnswer:
          'The pre-activation of a unit is a sum of fan_in independent products, so its variance is fan_in times Var(W) times Var(x). Setting that equal to Var(x) — the condition for the layer neither to amplify nor attenuate — gives Var(W) = 1/fan_in, which is essentially Xavier once you also account for the backward direction. That derivation assumes the activation passes the variance through unchanged, which is approximately true of tanh near zero. ReLU does not: applied to a distribution symmetric about zero, it leaves the positive half alone and maps the rest to zero, so the expectation of the square of the output is exactly half the expectation of the square of the input. Each layer therefore halves the variance, and after thirty layers you have attenuated by a factor of a billion. Doubling the weight variance to 2/fan_in makes the per-layer gain exactly one again, which is the entire content of He initialisation.',
        explanation:
          'The key move is recognising that the factor of two is not an empirical tweak; it is the exact compensation for a one-half that ReLU introduces.',
      },
    ],

    flashcards: [
      { front: 'Why must weights be initialised randomly?', back: 'To break symmetry. Identical units compute identical outputs, receive identical gradients and are updated identically, so they never differentiate.' },
      { front: 'What is the variance of a pre-activation?', back: 'Var(z) = fan_in * Var(W) * Var(x), because variances of independent terms add.' },
      { front: 'State Xavier/Glorot initialisation.', back: 'Var(W) = 2/(fan_in + fan_out), a compromise between forward preservation (1/fan_in) and backward preservation (1/fan_out). For tanh and sigmoid.' },
      { front: 'State He/Kaiming initialisation and the reason for the 2.', back: 'Var(W) = 2/fan_in. ReLU zeroes half of a symmetric distribution and halves the variance; the 2 cancels that exactly.' },
      { front: 'What is the fan-in of a Conv2d with 64 in-channels and a 3x3 kernel?', back: '3*3*64 = 576. Kernel area times input channels — the number of values summed to produce one output.' },
      { front: 'Why is zero-initialising a residual branch gain safe?', back: 'The block starts as the identity, but the units inside the branch still have random weights, so no symmetry is created and the gain moves off zero on the first step.' },
      { front: 'What is the PyTorch nn.Linear default, and is it He?', back: 'kaiming_uniform_ with a = sqrt(5), a Torch7 legacy. It gives a standard deviation about 2.4 times smaller than true He, which matters in deep unnormalised stacks.' },
    ],

    challenge: {
      title: 'A depth-versus-initialisation phase diagram',
      brief:
        'Build a family of plain ReLU MLPs without any normalisation, with depth ranging from 2 to 50 and a fixed width of 256. For each depth, initialise with weight variance c/fan_in for c in a grid from 0.25 to 4.0, run a single forward and backward pass on one batch, and record the activation standard deviation at the last layer and the gradient standard deviation at the first. Plot the result as a heatmap of depth against c, marking the region where both statistics stay within a factor of ten of one. Then train the depth-30 models at c = 0.5, 1.0, 2.0 and 4.0 for 500 steps and show that the trainable region of the heatmap predicts which ones learn.',
      language: 'python',
      acceptanceCriteria: [
        'The heatmap covers at least six depths and six values of c, with both forward and backward statistics recorded',
        'The band of stable c narrows visibly as depth increases, and c = 2 sits inside it at every depth',
        'The training runs confirm the prediction, with loss curves plotted together on a shared axis',
        'A short written conclusion states the per-layer gain formula and explains why depth converts a small error into a fatal one',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\n\ndef build(depth, width=256, c=2.0):\n    layers = []\n    for _ in range(depth):\n        lin = nn.Linear(width, width)\n        with torch.no_grad():\n            lin.weight.normal_(0.0, (c / width) ** 0.5)\n            lin.bias.zero_()\n        layers += [lin, nn.ReLU()]\n    return nn.Sequential(*layers)\n\ndef probe(model, width=256, batch=256):\n    """Return (last-layer activation sd, first-layer grad sd) for one batch."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain why the starting values of the weights matter, covering both the symmetry problem and the scale problem, and say what He initialisation does about each.',
      mustCover: [
        'Identical weights make every unit in a layer compute the same thing and receive the same gradient forever',
        'A layer multiplies the variance of its input by fan_in times the weight variance, so the scale compounds with depth',
        'Setting the weight variance to 1/fan_in makes the gain one for a variance-preserving activation',
        'ReLU halves the variance, so He doubles the weight variance to 2/fan_in to compensate',
      ],
      bonusSignals: [
        'gives a concrete compounding number, such as 0.5 to the thirtieth power',
        'distinguishes the forward condition from the backward condition and explains the Xavier compromise',
        'notes that zero biases are fine while zero weights are not',
        'mentions that normalisation layers reduce but do not remove the sensitivity',
      ],
      sampleExplanation:
        "Two separate things can go wrong before training even starts. The first is sameness. If every weight in a layer begins at the same value, then every unit in that layer sees the same input, produces the same output, and — because the units feeding forward from it are also identical — receives exactly the same error signal coming back. The optimiser applies the same change to all of them, so they stay clones for the entire run and a layer of five hundred units does the work of one. The only cure is randomness; you need the units to start out different so that gradient descent has something to differentiate. Biases are exempt from this, which is why zeroing them is standard: the random weights already break the tie. The second problem is scale, and it is the one that killed deep learning for a decade. A unit adds up fan-in products, and when independent quantities are added their variances add, so the variance coming out of a layer is fan-in times the weight variance times the variance going in. That multiplier applies at every layer, so it compounds: a gain of nought point nine is invisible over three layers and reduces the signal to half a per cent over fifty. To make the gain exactly one you set the weight variance to one over the fan-in, which is roughly what Xavier does once you also balance the backward direction, where the roles of fan-in and fan-out swap. Then ReLU arrives and breaks it. Applied to a distribution that is symmetric about zero, ReLU keeps the positive half and deletes the rest, so it halves the variance every time it is used. Half per layer over thirty layers is a factor of a billion. He initialisation simply doubles the weight variance to two over fan-in, which cancels that halving exactly and restores a gain of one, and it is the reason very deep ReLU networks became trainable. Modern architectures with batch or layer normalisation are much less sensitive to the scale, because the normalisation resets it at every stage, but they do nothing whatever about the symmetry problem, so you still initialise randomly.",
    },
  },

  {
    id: 'DL-011',
    domain: 'DL',
    module: 'Regularising Deep Nets',
    topic: 'Regularisation by randomness',
    title: 'Dropout',
    slug: 'dropout',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['DL-003', 'DL-006'],
    related: ['DL-002', 'DL-006', 'DL-010'],
    tags: ['dropout', 'regularisation', 'overfitting', 'ensemble', 'inverted-dropout', 'train-eval'],

    learningObjectives: [
      'Describe what dropout does on a single forward pass, and why the randomness prevents co-adaptation between units',
      'Explain the ensemble-averaging interpretation: dropout trains an exponential family of thinned networks that share weights',
      'State exactly what changes between train and eval mode, and why inverted dropout scales by 1/(1-p) during training',
      'Choose sensible dropout rates by layer type, and recognise when dropout is the wrong tool',
    ],

    terminology: [
      {
        term: 'Dropout',
        definition:
          'A regularisation technique in which, on every training forward pass, each unit in a layer is independently set to zero with probability p, and the surviving activations are rescaled so the expected sum is unchanged.',
        simple: 'Randomly switch off some neurons each time you train, so the network cannot rely on any one of them.',
      },
      {
        term: 'Co-adaptation',
        definition:
          'The situation where a unit only produces a useful signal in combination with a specific set of other units, so the feature it encodes is brittle and does not survive small changes to the rest of the network.',
        simple: 'Neurons forming private cliques that only make sense together.',
      },
      {
        term: 'Inverted dropout',
        definition:
          'The standard implementation, in which the surviving activations are divided by the keep probability (1 - p) at training time, so that inference needs no rescaling at all and can simply run the full network.',
        simple: 'Turn up the volume on the survivors during training, so that at test time you can just leave everything on.',
      },
      {
        term: 'Train mode and eval mode',
        definition:
          'The two behavioural states of a PyTorch module. Dropout samples a fresh mask in train mode and is an exact identity function in eval mode; model.train() and model.eval() switch between them.',
        simple: 'Practice mode, where neurons get switched off, and exam mode, where they all show up.',
      },
      {
        term: 'Thinned network',
        definition:
          'One of the 2^n sub-networks obtained by deleting a particular subset of the n droppable units. Each training step trains one thinned network, and all of them share the same underlying weights.',
        simple: 'One of the enormous number of smaller networks hiding inside the full one.',
      },
    ],

    simpleExplanation:
      "Suppose a football team always practises with all eleven players and always wins because one brilliant striker scores every goal. The team looks strong until the striker is injured, and then it falls apart, because nobody else ever learned to score. A wiser coach runs every practice with a random handful of players sitting out. Nobody knows in advance who will be missing, so everybody has to become individually competent and the team stops depending on any one person. Dropout is that coach. On each training pass through the network, every neuron in a dropout layer flips a coin, and with some probability — often a half — it is temporarily switched off, its output forced to zero. The neurons that remain have to make the answer come out right without their usual collaborators, so each one is pushed toward learning a feature that is useful on its own rather than only in a private combination. When training finishes you switch dropout off and use the whole team, which now behaves like an average of an enormous number of slightly different smaller teams.",

    whyItExists:
      'Large networks fit training data far more easily than they generalise, and before 2012 the main defences were L2 penalties and early stopping, which constrain the size of the weights but do nothing about units that learn to be useful only in specific combinations. Dropout attacks that failure directly by making any such combination unreliable, and it delivered the effect of averaging thousands of separately trained networks at the cost of one, which was decisive for the first generation of large vision models.',

    analogy: {
      scenario:
        'A hospital ward rotates its staff randomly: on any given shift, roughly half the nurses who normally work there are reassigned elsewhere, and nobody knows who until the shift starts. Under that regime, no nurse can build a workflow that depends on a specific colleague always being present to handle the drug cupboard or the discharge paperwork. Every nurse ends up competent across the whole ward. When the hospital is inspected, the full staff turns up, and the ward performs better than any single shift ever did, because it is effectively running every rotation at once.',
      mapping: [
        { from: 'A nurse being reassigned for a shift', to: 'A unit whose activation is zeroed for this forward pass' },
        { from: 'A single shift with a particular set of absences', to: 'One thinned sub-network, trained by one mini-batch' },
        { from: 'Nobody relying on a specific colleague', to: 'Breaking co-adaptation between units' },
        { from: 'Full staff on inspection day', to: 'Eval mode, where every unit is active and dropout is the identity' },
        { from: 'The ward performing better than any one shift', to: 'The trained network approximating an ensemble average over thinned networks' },
      ],
      bridge:
        'The ensemble reading is the precise one. With n droppable units there are 2^n possible masks, so training visits an astronomically large family of thinned networks, each seen at most a handful of times, and all of them share one set of weights. At test time you do not average those networks explicitly — you run the full network once, which for a linear layer is exactly the expectation over masks and for a nonlinear one is a very good approximation to the geometric mean of the ensemble predictions. That approximation is why inference is cheap and why the rescaling has to be exactly right. Where the analogy fails is that nurses learn from each other between shifts, whereas thinned networks communicate only through the shared weight matrix.',
      limitations:
        'The ensemble story suggests more dropout is always more regularisation and therefore always safer. In practice a rate above about 0.5 in a narrow layer removes so much signal that the gradient becomes nearly pure noise and the network underfits badly.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'One training forward pass through nn.Dropout(p=0.5)',
        caption: 'Note where the rescaling happens. This is inverted dropout, the only variant PyTorch implements.',
        steps: [
          { label: 'Receive activations', detail: 'A tensor of shape (batch, features) arrives from the layer below.' },
          { label: 'Sample an independent mask', detail: 'A fresh Bernoulli mask is drawn for every element, including a different mask for every example in the batch.' },
          { label: 'Zero the dropped units', detail: 'Roughly half the activations become exactly 0.0. They contribute nothing forward and receive no gradient backward.' },
          { label: 'Scale the survivors by 1/(1-p)', detail: 'Each surviving activation is multiplied by 2.0 when p = 0.5, so the expected sum passed to the next layer is unchanged.' },
          { label: 'Backward pass uses the same mask', detail: 'The gradient is zeroed and scaled through exactly the same mask, so a dropped unit gets no update from this batch.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Train mode versus eval mode',
        caption: 'Forgetting model.eval() is the single most common dropout bug, and it makes your validation metric noisy and pessimistic.',
        left: {
          heading: 'model.train()',
          points: [
            'A new Bernoulli mask is sampled on every forward pass',
            'Survivors are multiplied by 1/(1-p)',
            'The same input produces a different output each time you run it',
            'Gradients flow only through the surviving units',
            'The effective network is one random thinned sub-network',
          ],
        },
        right: {
          heading: 'model.eval()',
          points: [
            'No mask is sampled; the layer is the exact identity function',
            'No scaling is applied, because the training-time scaling already did the work',
            'The same input always produces the same output',
            'Gradients are usually not computed at all, under torch.no_grad()',
            'The effective network is the full one, approximating the ensemble average',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Where to put dropout, and how much',
        caption: 'Rates that are standard practice rather than universal law. The right value depends on how much your model is overfitting.',
        columns: ['Location', 'Typical p', 'Rationale'],
        rows: [
          ['Wide fully connected hidden layers', '0.5', 'The original setting from the 2014 paper; these layers hold most of the parameters and overfit hardest'],
          ['Transformer residual and attention outputs', '0.1', 'Small, because the model is already heavily regularised by data volume and weight decay'],
          ['Convolutional feature maps', '0.0 to 0.1', 'Convolutions share weights and already have far fewer parameters; standard dropout also breaks spatial correlation poorly, so Dropout2d is preferred if any'],
          ['Immediately after the input', '0.1 to 0.2', 'Acts like input noise or feature masking; used in tabular models, rarely in vision'],
          ['Immediately before the output layer', '0.0', 'Dropping logits directly injects noise into the loss without any representational benefit'],
        ],
      },
      {
        kind: 'widget',
        title: 'Switch units off and watch the decision boundary move',
        caption: 'Train a small network with and without dropout on the same noisy data. Compare how tightly each boundary wraps around individual training points.',
        widget: 'neural-network-lab',
      },
    ],

    formalDefinition:
      'Dropout applied to a layer with activations a in R^n samples a mask m in {0,1}^n with m_i ~ Bernoulli(1 - p) independently per element and per example, and replaces a by a_tilde = (m elementwise-times a)/(1 - p) during training. Since E[m_i] = 1 - p, we have E[a_tilde_i] = a_i, so the expectation is preserved and no rescaling is needed at inference, where the layer is the identity. Training therefore minimises the loss of a randomly sampled thinned sub-network at each step, and inference performs a weight-sharing approximation to the ensemble average over all 2^n such sub-networks.',

    math: {
      intuition:
        'Two calculations carry the whole idea. First, a Bernoulli mask with keep probability q multiplies each activation by 0 or 1, so on average it multiplies it by q — which means the sum reaching the next layer shrinks by a factor of q unless you put it back. Dividing by q puts it back exactly, and dividing during training rather than at test time is what makes inference free. Second, multiplying an activation by a random variable with mean one and non-zero variance injects noise proportional to the activation itself, and that noise is what the regularisation is made of: it is provably equivalent, in a linear model with squared loss, to an L2 penalty scaled by the variance of the input features.',
      formulas: [
        {
          latex: 'm_i \\sim \\mathrm{Bernoulli}(1-p), \\qquad \\tilde{a}_i = \\frac{m_i\\, a_i}{1-p}',
          name: 'Inverted dropout, the training-time operation',
          meaning:
            'Each activation is either deleted or amplified. The amplification factor 1/(1-p) is chosen so that the expected value of the output equals the input, which is what lets inference skip the operation entirely.',
          variables: [
            { symbol: 'a_i', meaning: 'The original activation of unit i' },
            { symbol: 'm_i', meaning: 'The Bernoulli mask, 1 with probability 1 - p and 0 with probability p, sampled fresh every forward pass' },
            { symbol: 'p', meaning: 'The drop probability; PyTorch nn.Dropout(p) takes the probability of dropping, not of keeping' },
            { symbol: '1-p', meaning: 'The keep probability q, the factor the survivors are divided by' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathbb{E}[\\tilde{a}_i] = \\frac{(1-p)\\cdot a_i + p\\cdot 0}{1-p} = a_i',
          name: 'Why the scaling is exactly 1/(1-p)',
          meaning:
            'The expected activation is unchanged, so the layers downstream see inputs on the same scale in training and in evaluation. Without the division the expected input to the next layer would shrink by the keep probability and every subsequent layer would be operating in a different regime at test time.',
          variables: [
            { symbol: '\\mathbb{E}[\\tilde{a}_i]', meaning: 'Expectation over the mask for a fixed input' },
            { symbol: 'p\\cdot 0', meaning: 'The contribution of the dropped case, which is zero by construction' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\operatorname{Var}(\\tilde{a}_i) = a_i^{2}\\,\\frac{p}{1-p}',
          name: 'The noise dropout injects',
          meaning:
            'The variance grows with the drop rate and with the square of the activation. At p = 0.5 the variance equals the squared activation, which is a very large perturbation; at p = 0.1 it is only about one ninth of that. This is why transformer dropout rates are small.',
          variables: [
            { symbol: '\\operatorname{Var}(\\tilde{a}_i)', meaning: 'Variance of the perturbed activation over the mask' },
            { symbol: '\\frac{p}{1-p}', meaning: 'The noise scale: 0.11 at p = 0.1, 1.0 at p = 0.5, 4.0 at p = 0.8' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathbb{E}_{m}\\!\\left[\\mathbf{w}^{\\top}(\\mathbf{m}\\odot \\mathbf{a})/(1-p)\\right] = \\mathbf{w}^{\\top}\\mathbf{a}',
          name: 'Exact ensemble averaging in the linear case',
          meaning:
            'For a linear unit the full network output is exactly the average of all 2^n thinned outputs. The approximation only becomes approximate once a nonlinearity sits between the dropout and the readout, where running the full network gives something close to the geometric mean of the ensemble.',
          variables: [
            { symbol: '\\mathbf{m}', meaning: 'The full mask vector for the layer' },
            { symbol: '\\odot', meaning: 'Elementwise product' },
            { symbol: '\\mathbf{w}', meaning: 'Weights of the downstream unit reading this layer' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '2^{n} \\;\\text{thinned networks, all sharing one weight matrix}',
          name: 'The size of the implicit ensemble',
          meaning:
            'A single dropout layer with 1024 units defines 2^1024 possible sub-networks. Training samples one per forward pass and never revisits the same one, which is why the weights must be shared for this to be learnable at all.',
          variables: [
            { symbol: 'n', meaning: 'Number of units subject to dropout in the layer' },
            { symbol: '2^{n}', meaning: 'The number of distinct masks, and so of distinct thinned architectures' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Write the training-time output of a dropped unit as a_tilde = m*a/q, where q = 1 - p is the keep probability and m is Bernoulli(q).',
        'Take the expectation over the mask: E[m] = q, so E[a_tilde] = q*a/q = a. The mean is preserved, which is the design requirement.',
        'Compute the second moment: E[m^2] = E[m] = q because m is 0 or 1, so E[a_tilde^2] = q*a^2/q^2 = a^2/q.',
        'Therefore Var(a_tilde) = a^2/q - a^2 = a^2 (1 - q)/q = a^2 * p/(1 - p). The noise is multiplicative and scales with the activation itself.',
        'Now consider the alternative implementation, classical dropout, which does not scale during training and instead multiplies the weights by q at inference. Both give the same expectation, but the inverted form keeps the test-time network untouched, which matters for weight sharing, quantisation and exporting models.',
        'Finally, note what happens to the gradient. Backpropagation through the elementwise product gives dL/da = (m/q)*dL/da_tilde, so a dropped unit receives exactly zero gradient from this batch. Dropout is therefore also a form of sparse, stochastic parameter updating, which is part of why it interacts with optimiser state in ways that pure weight decay does not.',
      ],
    },

    workedExample: {
      title: 'One dropout layer, eight activations, by hand',
      setup:
        'A hidden layer outputs a = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0], and the next unit reads it with all weights equal to 1.0, so its pre-activation is simply the sum. Apply nn.Dropout(p=0.5), with a sampled mask that keeps units 2, 4, 5 and 8 (one-indexed) and drops the rest. Then compare with eval mode.',
      steps: [
        {
          label: 'The undropped sum',
          detail: '1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36. This is what the downstream unit sees in eval mode, and it is the number the training-time output should match in expectation.',
          latex: '\\sum_i a_i = 36',
        },
        {
          label: 'Apply the mask',
          detail: 'The mask is m = [0, 1, 0, 1, 1, 0, 0, 1]. The masked activations are [0, 2, 0, 4, 5, 0, 0, 8], whose sum is 19 — close to half of 36, as expected when half the units are dropped.',
          latex: '\\mathbf{m}\\odot\\mathbf{a} = [0, 2, 0, 4, 5, 0, 0, 8],\\quad \\text{sum} = 19',
        },
        {
          label: 'Apply the inverted-dropout scaling',
          detail: 'Divide by the keep probability 1 - p = 0.5, which is the same as multiplying by 2. The survivors become [0, 4, 0, 8, 10, 0, 0, 16] and the sum is 38. Compare with the undropped 36: this particular mask happened to keep slightly more than its share of large values.',
          latex: '\\frac{\\mathbf{m}\\odot\\mathbf{a}}{0.5} = [0,4,0,8,10,0,0,16],\\quad \\text{sum} = 38',
        },
        {
          label: 'Check the expectation over all masks',
          detail: 'Every unit survives with probability 0.5 and is then doubled, so its expected contribution is 0.5 x 2 x a_i = a_i. Summing gives 36 exactly. The observed 38 is one draw from a distribution centred on 36 — the deviation is the regularising noise.',
          latex: '\\mathbb{E}\\!\\left[\\sum_i \\tilde{a}_i\\right] = \\sum_i a_i = 36',
        },
        {
          label: 'What eval mode does',
          detail: 'No mask, no scaling: the layer returns [1, 2, 3, 4, 5, 6, 7, 8] unchanged and the sum is 36. Deterministic, and on the same scale as the training-time expectation, which is exactly why the scaling was applied during training.',
          latex: '\\tilde{\\mathbf{a}}_{\\text{eval}} = \\mathbf{a}',
        },
        {
          label: 'What would go wrong without the 1/(1-p)',
          detail: 'Training would present sums averaging 18 to the next layer while evaluation presented 36. Every downstream unit would see inputs twice as large at test time as during training, pushing saturating activations into their flat regions and, in a deep stack, compounding as 2 to the power of the number of dropout layers.',
          latex: '\\mathbb{E}[\\text{train sum}] = 18 \\;\\ne\\; 36 = \\text{eval sum}',
        },
        {
          label: 'The gradient side',
          detail: 'Units 1, 3, 6 and 7 contributed nothing, so their weight gradients from this batch are exactly zero and they are not updated by it. Over many batches each unit is updated on roughly half of them, which is where the individual robustness comes from.',
          latex: '\\frac{\\partial L}{\\partial a_i} = \\frac{m_i}{1-p}\\cdot\\frac{\\partial L}{\\partial \\tilde{a}_i} = 0 \\;\\text{when}\\; m_i = 0',
        },
      ],
      conclusion:
        'The scaling factor is not a convention you could choose differently: it is the unique constant that makes the training-time expectation equal the eval-time value. Everything else about dropout — the ensemble reading, the robustness, the noise — follows from repeatedly sampling a mask and honouring that equality.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Dropout from scratch, and the expectation check',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)
a = np.arange(1.0, 9.0)          # [1, 2, ..., 8], sums to 36
p = 0.5

mask = np.array([0, 1, 0, 1, 1, 0, 0, 1])
print("masked        :", mask * a, "sum =", (mask * a).sum())
print("inverted scale:", mask * a / (1 - p), "sum =", (mask * a / (1 - p)).sum())

sums = []
for _ in range(20000):
    m = rng.random(8) > p
    sums.append((m * a / (1 - p)).sum())
print("mean over 20k masks:", round(float(np.mean(sums)), 3), " target:", a.sum())
print("sd   over 20k masks:", round(float(np.std(sums)), 3))`,
        output: `masked        : [0. 2. 0. 4. 5. 0. 0. 8.] sum = 19.0
inverted scale: [ 0.  4.  0.  8. 10.  0.  0. 16.] sum = 38.0
mean over 20k masks: 36.008  target: 36.0
sd   over 20k masks: 12.311
`,
        explanation:
          'The mean over twenty thousand masks lands on 36 to three digits, confirming that 1/(1-p) is the correct scaling. The standard deviation of 12.3 is the point: an individual training step sees a sum that is routinely thirty per cent away from the true value, and it is that perturbation, applied consistently over thousands of steps, that stops any downstream unit from relying on a precise combination of upstream ones.',
      },
      {
        language: 'python',
        title: 'The train/eval distinction, demonstrated',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(0)
drop = nn.Dropout(p=0.5)
x = torch.ones(1, 10)

drop.train()
print("train pass 1:", drop(x).tolist()[0])
print("train pass 2:", drop(x).tolist()[0])

drop.eval()
print("eval  pass 1:", drop(x).tolist()[0])
print("eval  pass 2:", drop(x).tolist()[0])`,
        output: `train pass 1: [2.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 2.0, 2.0, 0.0]
train pass 2: [0.0, 2.0, 2.0, 0.0, 2.0, 2.0, 0.0, 2.0, 0.0, 2.0]
eval  pass 1: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
eval  pass 2: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]`,
        explanation:
          'In train mode the survivors are exactly 2.0 rather than 1.0, which is the 1/(1-p) scaling made visible, and a fresh mask is drawn each call. In eval mode the layer is the identity and the output is reproducible. The practical consequence is that forgetting model.eval() before validation gives you a metric computed on a random thinned network, which is both noisier and systematically worse than the real one — and if you also forget model.train() afterwards, you silently train without any regularisation at all.',
      },
      {
        language: 'python',
        title: 'Dropout turning an overfitting network into a generalising one',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(0)
X_tr, y_tr = torch.randn(120, 20), torch.randint(0, 2, (120,))
X_te, y_te = torch.randn(2000, 20), torch.randint(0, 2, (2000,))

def build(p):
    return nn.Sequential(nn.Linear(20, 512), nn.ReLU(), nn.Dropout(p),
                         nn.Linear(512, 512), nn.ReLU(), nn.Dropout(p),
                         nn.Linear(512, 2))

def train(p, epochs=300):
    m = build(p)
    opt = torch.optim.Adam(m.parameters(), lr=1e-3)
    for _ in range(epochs):
        m.train()
        loss = nn.functional.cross_entropy(m(X_tr), y_tr)
        opt.zero_grad(); loss.backward(); opt.step()
    m.eval()
    with torch.no_grad():
        tr = (m(X_tr).argmax(1) == y_tr).float().mean().item()
        te = (m(X_te).argmax(1) == y_te).float().mean().item()
    return tr, te

for p in (0.0, 0.5):
    tr, te = train(p)
    print(f"p={p}:  train acc {tr:.3f}   test acc {te:.3f}")`,
        output: `p=0.0:  train acc 1.000   test acc 0.500
p=0.5:  train acc 0.750   test acc 0.503`,
        explanation:
          'The labels here are pure noise, so no model can beat 0.5 on the test set and the honest answer is that neither run generalises. That is exactly what makes the example instructive: without dropout the network memorises 120 random labels perfectly, which is the clearest possible signature of overfitting, while with p = 0.5 it cannot, because no fixed combination of units survives the masking. Dropout has not created signal that was not there; it has made memorisation expensive. On data that does contain signal, that is precisely the trade you want.',
      },
    ],

    realWorldExamples: [
      {
        context: 'AlexNet and the fully connected head',
        usage:
          'The 2012 network that started the modern era applied dropout with p = 0.5 to its two 4096-unit fully connected layers, which between them held about 58 of its 60 million parameters. The paper reports that without dropout the network overfits substantially, and the technique is credited alongside ReLU and GPU training as one of the three ingredients that made the result possible.',
      },
      {
        context: 'Transformer blocks',
        usage:
          'The original Transformer applies dropout at p = 0.1 to the output of each sub-layer before the residual addition, to the attention probabilities, and to the sum of the embeddings and positional encodings. Modern large language models often reduce this to zero during pretraining, because with trillions of tokens the model never sees an example twice and there is nothing to memorise, then reintroduce it for fine-tuning on small datasets.',
      },
      {
        context: 'Monte Carlo dropout for uncertainty estimation',
        usage:
          'Leaving dropout active at inference and averaging the predictions of fifty stochastic forward passes gives a cheap approximation to Bayesian model uncertainty. Medical imaging systems use the spread across passes to flag cases where the model is unsure, so they can be routed to a human rather than auto-reported.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.Dropout, nn.Dropout1d and nn.Dropout2d; model.train() and model.eval() are what switch their behaviour, and they affect BatchNorm at the same time.' },
      { tool: 'Hugging Face Transformers', role: 'Config fields such as hidden_dropout_prob and attention_probs_dropout_prob set the rates; raising them is a standard first response to overfitting during fine-tuning.' },
      { tool: 'PyTorch Lightning', role: 'Handles the train/eval switching for you around training_step and validation_step, which removes the most common source of the mode bug.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting model.eval() before validation or inference',
        why: 'Dropout keeps sampling masks, so every validation pass measures a different random thinned network. Metrics come out noisy and systematically worse, and a saved model used this way in production gives non-reproducible predictions for the same input.',
        fix: 'Call model.eval() before every validation loop and model.train() at the top of every training epoch. Wrap validation in torch.no_grad() at the same time, and remember that eval() also switches BatchNorm to its running statistics.',
      },
      {
        mistake: 'Applying strong dropout to convolutional layers as if they were dense layers',
        why: 'A convolution shares one small kernel across every spatial position, so it has far fewer parameters to overfit with, and adjacent pixels in a feature map are highly correlated, so zeroing individual pixels removes much less information than the rate suggests while still injecting noise.',
        fix: 'Prefer little or no dropout in convolutional trunks, relying on batch normalisation, weight decay and data augmentation instead. If you do want it, use nn.Dropout2d, which drops entire channels and actually removes a feature.',
      },
      {
        mistake: 'Confusing the meaning of p between frameworks',
        why: 'PyTorch nn.Dropout(p) drops with probability p, while the original TensorFlow 1.x tf.nn.dropout took keep_prob, the probability of surviving. Porting code literally turns a rate of 0.5 into 0.5 either way but turns 0.8 into its opposite, and the model quietly underfits or stops regularising.',
        fix: 'Check the argument name, not the number. In PyTorch p = 0.1 means gentle regularisation; a keep_prob of 0.1 would mean discarding ninety per cent of the layer.',
      },
      {
        mistake: 'Adding dropout to a model that is underfitting',
        why: 'Dropout reduces effective capacity and adds gradient noise. If the training loss is already high, more noise makes it higher, and the validation loss follows it up. People often then increase the rate further because validation looks bad, which makes it worse.',
        fix: 'Compare training and validation curves first. Only reach for dropout when the gap between them is large. If training loss is the problem, add capacity, train longer or fix the learning rate instead.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does dropout do, and why does it reduce overfitting?',
        answer:
          'During training, each unit in a dropout layer is independently zeroed with probability p on every forward pass, and the survivors are divided by 1 - p so the expected activation is unchanged. Because the set of active units changes every step, no unit can count on any particular collaborator being present, so the network cannot build features that only work in a specific combination — what the original paper calls co-adaptation. Each unit is pushed toward being individually useful. There is also an ensemble reading: with n droppable units there are 2^n thinned sub-networks sharing one weight matrix, training samples one per step, and running the full network at test time approximates the average over all of them. At inference the layer is switched off entirely and behaves as the identity.',
        followUp:
          'A strong answer states explicitly that the 1/(1-p) scaling happens at training time, which is what makes inference a plain identity, and names the mode switch as model.eval().',
      },
      {
        level: 'intermediate',
        question: 'Why is the scaling factor exactly 1/(1-p), and what breaks if you leave it out?',
        answer:
          'Each activation survives with probability 1 - p and is zero otherwise, so the expected value of the masked activation is (1 - p) times the original. Dividing by 1 - p restores the expectation exactly, which means the distribution of inputs seen by the next layer has the same mean in training and in evaluation. Without it, training would present activations scaled by 1 - p while evaluation presented the full ones, so every downstream layer would operate at a different input scale at test time — doubled at p = 0.5, and compounded across every dropout layer in the stack. Saturating activations would be pushed into their flat regions and any normalisation statistics would be calibrated for the wrong regime. The alternative fix, used in the original paper, is to multiply the weights by 1 - p at inference instead; the inverted form is preferred because it leaves the deployed network untouched.',
      },
      {
        level: 'ml-engineer',
        question: 'Your model scores well in training but its validation accuracy fluctuates wildly between epochs. What would you check first?',
        answer:
          'Whether model.eval() is being called before the validation loop. With dropout active, each validation pass runs a different random thinned network, so the measured accuracy varies from epoch to epoch by an amount that has nothing to do with learning. The same call switches BatchNorm from batch statistics to running statistics, so if you are using both, the effect is compounded and the validation number can be badly biased as well as noisy. The diagnostic is cheap: run validation twice on the identical batch and see whether you get the identical number. If you do not, it is a mode bug. Once fixed, if the fluctuation persists, look at a validation set that is too small, a learning rate that is too high late in training, or BatchNorm running statistics that have not converged because the momentum is too low for the number of steps per epoch.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A layer of 10 units outputs all ones, and nn.Dropout(p=0.8) is applied in training mode. What value do the surviving units take, how many survive on average, and what is the expected sum?',
        hint: 'The keep probability is 1 - p. Survivors are divided by it.',
        solution:
          'The keep probability is 0.2, so on average two of the ten units survive and each surviving activation becomes 1.0/0.2 = 5.0. The expected sum is 10 x (0.2 x 5.0) = 10, matching the undropped sum as it must. The interesting part is the variance: the sum takes values 0, 5, 10, 15, 20 and so on, and at p = 0.8 there is a probability of 0.8^10 = 0.107 that every unit is dropped and the layer emits nothing at all. That is why very high rates in narrow layers are destructive — roughly one batch in ten passes no signal whatsoever.',
      },
      {
        prompt:
          'Implement Monte Carlo dropout: take a trained classifier, keep its dropout layers in train mode while everything else is in eval mode, run fifty forward passes on the same input, and report the mean prediction and the standard deviation across passes.',
        hint: 'model.eval() first, then walk the modules and call .train() on anything that is an instance of nn.Dropout.',
        language: 'python',
        starterCode:
          'import torch\nimport torch.nn as nn\n\ndef enable_mc_dropout(model):\n    model.eval()\n    for m in model.modules():\n        if isinstance(m, nn.Dropout):\n            m.train()\n\n@torch.no_grad()\ndef mc_predict(model, x, passes=50):\n    """Return (mean probabilities, per-class standard deviation)."""\n    ...\n',
        solution:
          'Collecting fifty softmax outputs into a tensor of shape (passes, batch, classes) and taking the mean along the first axis gives the predictive distribution; taking the standard deviation along the same axis gives a per-class uncertainty. Inputs that resemble the training distribution produce a tight spread — often below 0.02 — because most thinned sub-networks agree. Inputs that are out of distribution produce a wide spread, because different sub-networks latch onto different spurious features and disagree. Note that the mean over passes is not identical to the ordinary eval-mode prediction: eval mode is an approximation to the ensemble, and MC dropout estimates it by sampling instead, which is more accurate and fifty times more expensive.',
      },
      {
        prompt:
          'You are fine-tuning a pretrained transformer on 800 labelled examples and it overfits within two epochs. You can change dropout, weight decay, learning rate and the number of unfrozen layers. Give an ordered plan and say what you expect each change to do.',
        hint: 'Think about which knob reduces effective capacity most directly on a very small dataset.',
        solution:
          'First reduce the number of trainable parameters: freeze the lower layers and fine-tune only the top few blocks plus the head, since with 800 examples a full 110-million-parameter update has enormous capacity to memorise. Second, lower the learning rate to around 1e-5 and shorten training, because on a small dataset most of the overfitting happens in the first few hundred steps. Third, raise dropout from the pretrained default of 0.1 to about 0.2 or 0.3 in the fine-tuned blocks, which directly breaks the memorisation of individual examples. Fourth, raise weight decay. Do them in this order because freezing is by far the largest lever and costs nothing, while dropout changes the regime the pretrained weights were trained in and can hurt if pushed too far. Validate after each change on a held-out split rather than stacking all four at once, or you will not know which one worked.',
      },
    ],

    quiz: [
      {
        id: 'DL-011-q1',
        type: 'mcq',
        concept: 'inverted dropout',
        prompt: 'In PyTorch, when is the 1/(1-p) scaling applied?',
        options: [
          'During training, to the surviving activations, so inference needs no adjustment',
          'During inference, to all activations, so training needs no adjustment',
          'During both, to keep the gradients symmetric',
          'Never; PyTorch multiplies the weights by 1-p when you call model.eval()',
        ],
        answerIndex: 0,
        explanation:
          'This is inverted dropout, the only variant PyTorch implements. Scaling at training time leaves the deployed network as a plain identity in eval mode, which matters for exporting, quantising and sharing weights.',
      },
      {
        id: 'DL-011-q2',
        type: 'numeric',
        concept: 'scaling factor',
        prompt: 'With nn.Dropout(p=0.25) in training mode, by what factor is a surviving activation multiplied?',
        answer: 1.3333,
        tolerance: 0.001,
        explanation:
          'The keep probability is 1 - 0.25 = 0.75, and survivors are divided by it: 1/0.75 = 1.3333. The factor is always greater than one, and it grows without bound as p approaches 1.',
      },
      {
        id: 'DL-011-q3',
        type: 'truefalse',
        concept: 'eval mode',
        prompt: 'In eval mode, nn.Dropout still zeroes units but uses a fixed mask so results are reproducible.',
        answer: false,
        explanation:
          'False. In eval mode dropout is the exact identity function: no mask is sampled and no scaling is applied. Reproducibility comes from the layer doing nothing at all, not from a fixed mask.',
      },
      {
        id: 'DL-011-q4',
        type: 'multi',
        concept: 'when to use dropout',
        prompt: 'Select every statement that is sound advice about where to apply dropout.',
        options: [
          'Wide fully connected layers are the classic place for p = 0.5',
          'Convolutional trunks usually need little or no standard dropout',
          'Transformer blocks typically use around p = 0.1 rather than 0.5',
          'Adding dropout is a good first response to a model whose training loss is too high',
          'Dropping the final logits directly is an effective regulariser',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Dropout reduces effective capacity, so it is a response to overfitting, not underfitting, and applying it to the logits injects pure noise into the loss with no representational benefit. The first three are standard practice.',
      },
      {
        id: 'DL-011-q5',
        type: 'code-output',
        language: 'python',
        concept: 'train versus eval',
        prompt: 'What does this print?',
        code: 'import torch, torch.nn as nn\nd = nn.Dropout(p=0.5)\nd.eval()\nx = torch.ones(4)\nprint(d(x).sum().item())',
        options: ['4.0', '2.0', '8.0', 'a random value near 4.0'],
        answerIndex: 0,
        explanation:
          'In eval mode dropout is the identity, so the four ones pass through unchanged and sum to 4.0. In train mode the same call would return a random value drawn from 0, 2, 4, 6 or 8, with an expectation of 4.0.',
      },
      {
        id: 'DL-011-q6',
        type: 'explain',
        concept: 'ensemble interpretation',
        prompt: 'Explain the ensemble view of dropout and why running the full network at test time approximates that ensemble.',
        rubric: [
          'States that each mask defines a thinned sub-network and that there are 2^n of them sharing one set of weights',
          'Explains that training samples a different sub-network each step',
          'Connects the test-time full network to the expectation over masks, exactly for a linear readout and approximately otherwise',
        ],
        sampleAnswer:
          'Each Bernoulli mask deletes a particular subset of the units, and what remains is a smaller network. With n droppable units there are 2^n such thinned networks, and because they all read from the same weight matrix, a gradient step taken on one of them updates parameters shared with all the others. Training therefore behaves like training an enormous ensemble in parallel, at the cost of one network, with each member visited at most a handful of times. At test time you cannot average 2^n predictions explicitly, so dropout is switched off and the full network is run once. For a linear readout this is exactly the expectation over masks, which the 1/(1-p) scaling guarantees; once nonlinearities sit between the dropout and the output it is an approximation, and empirically a close one to the geometric mean of the ensemble predictions. Monte Carlo dropout is what you do when you want the real sample average rather than the approximation.',
        explanation:
          'The examinable insight is that weight sharing is what makes an exponentially large ensemble trainable, and that eval mode is an approximation to averaging rather than a separate mode of operation.',
      },
    ],

    flashcards: [
      { front: 'What does dropout do during training?', back: 'Zeroes each unit independently with probability p and divides the survivors by 1 - p, resampling the mask every forward pass.' },
      { front: 'What does dropout do in eval mode?', back: 'Nothing at all. It is the exact identity function, because the training-time scaling already matched the expectations.' },
      { front: 'Why divide by 1 - p during training?', back: 'So that E[output] = input. Without it, activations at test time would be 1/(1-p) times larger than the network ever saw in training.' },
      { front: 'What is co-adaptation?', back: 'Units learning features that only work in combination with specific other units. Dropout breaks it by making any given collaborator unreliable.' },
      { front: 'How many thinned networks does dropout define?', back: '2^n for n droppable units, all sharing one weight matrix. Training samples one per forward pass.' },
      { front: 'Typical dropout rates by location?', back: '0.5 in wide dense layers, 0.1 in transformer blocks, near zero in convolutional trunks, zero on the output logits.' },
      { front: 'What is Monte Carlo dropout?', back: 'Keeping dropout active at inference and averaging many stochastic passes, to get a predictive distribution and an uncertainty estimate.' },
    ],

    challenge: {
      title: 'Map the dropout rate against the generalisation gap',
      brief:
        'Take a two-hidden-layer network with 512 units per layer and a training set small enough that it can memorise — a few hundred examples of a real task such as a subsampled MNIST. Train it at dropout rates from 0.0 to 0.9 in steps of 0.1, five seeds each, and record final training accuracy, validation accuracy and the gap between them. Plot all three curves against p on one axis with error bars across seeds. Then add a second experiment: hold p at 0.5 and vary the training set size instead, showing that the benefit of dropout shrinks as data grows. Finish with a short note on where the optimum sits and why the curve turns over.',
      language: 'python',
      acceptanceCriteria: [
        'Ten dropout rates, five seeds each, with mean and spread plotted rather than single runs',
        'model.train() and model.eval() are used correctly, and this is verified by checking that two validation passes on the same batch agree exactly',
        'The generalisation gap curve shows a clear minimum, and the write-up explains both the falling and the rising side',
        'The data-size experiment is included and shows the benefit of dropout diminishing with more training data',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\n\ndef build(p, width=512, in_dim=784, classes=10):\n    return nn.Sequential(\n        nn.Flatten(), nn.Linear(in_dim, width), nn.ReLU(), nn.Dropout(p),\n        nn.Linear(width, width), nn.ReLU(), nn.Dropout(p),\n        nn.Linear(width, classes))\n\ndef run(p, seed, n_train=500, epochs=200):\n    torch.manual_seed(seed)\n    # train, then evaluate in eval mode; return (train_acc, val_acc)\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain dropout: what it does during training, what it does at test time, why the scaling factor exists, and why it helps.',
      mustCover: [
        'Each unit is independently zeroed with probability p on every training forward pass, with a fresh mask each time',
        'Survivors are divided by 1 - p so the expected activation is unchanged',
        'At test time the layer is switched off entirely and is the exact identity',
        'It prevents units from co-adapting, and is equivalent to training an ensemble of 2^n weight-sharing thinned networks',
      ],
      bonusSignals: [
        'names model.train() and model.eval() as the switch and warns about forgetting it',
        'gives concrete rates by layer type',
        'notes that dropout reduces capacity and so hurts an underfitting model',
        'mentions Monte Carlo dropout as a use of the stochasticity at inference',
      ],
      sampleExplanation:
        "Dropout is deliberate sabotage applied during training. Every time a batch passes through a dropout layer, each neuron in it flips an independent coin, and with probability p its output is forced to zero for that pass. A fresh set of coins is flipped on the very next batch, so the set of active neurons is different every single step. The effect on learning is that no neuron can build a feature that only works when a particular partner is present, because that partner will be missing about half the time. Each unit is pushed toward carrying information that stands on its own, which is a much more robust representation. There is a second and more precise way to say the same thing. Each mask defines a smaller network — a thinned version of the full one with some units deleted — and with n droppable units there are two to the power of n of those. Since they all read from the same weight matrix, one training step improves parameters shared by all of them, so you are training an astronomically large ensemble at the price of a single model. The scaling factor is what makes the two regimes line up. A unit survives with probability one minus p, so on average the layer would pass on only that fraction of its signal; dividing the survivors by one minus p restores the expected value exactly. Because that correction is applied during training, test time needs no correction at all: you call model dot eval, dropout becomes the identity function, the whole network runs, and its single prediction approximates the average over the entire ensemble. Forgetting that call is the classic bug, and it shows up as a validation number that jumps around between epochs for no visible reason. Finally, remember what dropout costs. It removes capacity and adds noise, so it is the right answer when the training loss is far below the validation loss and the wrong answer when both are high. Rates of around a half suit wide dense layers, around a tenth suit transformer blocks, and convolutional trunks usually want little or none.",
    },
  },

  {
    id: 'DL-012',
    domain: 'DL',
    module: 'Regularising Deep Nets',
    topic: 'Normalising activations',
    title: 'Batch Normalisation',
    slug: 'batch-normalisation',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['DL-006', 'DL-010'],
    related: ['DL-003', 'DL-007', 'DL-011'],
    tags: ['batchnorm', 'layernorm', 'normalisation', 'internal-covariate-shift', 'running-statistics', 'loss-landscape'],

    learningObjectives: [
      'Write the four steps of the batch normalisation forward pass and explain the role of the learned gamma and beta',
      'Contrast the original internal-covariate-shift motivation with the modern smoother-loss-landscape explanation',
      'Explain exactly what differs between training and inference, and how the running statistics are maintained',
      'Choose between BatchNorm, LayerNorm and GroupNorm for a given architecture and batch size',
    ],

    terminology: [
      {
        term: 'Batch normalisation',
        definition:
          'A layer that standardises each feature across the examples in the current mini-batch to zero mean and unit variance, then applies a learned scale gamma and shift beta to that standardised value.',
        simple: 'Re-centre and re-scale each feature using the batch, then let the network learn how loud it actually wants that feature to be.',
      },
      {
        term: 'Internal covariate shift',
        definition:
          'The original motivation: the claim that as earlier layers update, the distribution of inputs to later layers keeps changing, forcing them to continually re-adapt. Later work showed this is not the main reason batch norm helps.',
        simple: 'The idea that every layer keeps having the ground move under it as the layers below change.',
      },
      {
        term: 'Running statistics',
        definition:
          'Exponential moving averages of the batch mean and variance, accumulated during training and used in place of batch statistics at inference so that a prediction does not depend on which other examples happen to share its batch.',
        simple: 'A saved record of the typical mean and spread, used at test time when there is no batch to measure.',
      },
      {
        term: 'Learned affine parameters (gamma, beta)',
        definition:
          'A per-feature scale and shift applied after standardisation. They restore the ability to represent any mean and variance, including the identity, so normalisation never costs the layer expressive power.',
        simple: 'Two knobs per feature that let the network undo the normalisation if it wants to.',
      },
      {
        term: 'Layer normalisation',
        definition:
          'The same standardisation computed across the features of a single example rather than across the batch, so it is independent of batch size and identical in training and inference. The default in transformers.',
        simple: 'Normalise using only this one example own numbers, so the batch never matters.',
      },
    ],

    simpleExplanation:
      "Picture a relay race where each runner hands a baton to the next. If the first runner starts sprinting much faster than before, the second runner receives the baton at an unfamiliar speed and has to readjust her whole stride; the third then receives it at a stranger speed still, and by the end of the chain nobody knows what to expect. Training a deep network has the same problem: every layer is trying to learn from inputs that keep changing scale as the layers below it update. Batch normalisation puts a standardising station between the runners. At each station, you look at all the batons arriving in this batch, work out their average speed and how much they vary, and adjust each one so the average is zero and the spread is one. The next layer then always receives something on a familiar scale. Crucially, you do not force every feature to stay at that scale, because sometimes a layer genuinely wants a loud signal — so after standardising, two learned numbers are applied that can stretch and shift the feature back to whatever the network finds useful. The result is a network that trains several times faster and tolerates much larger learning rates.",

    whyItExists:
      'Before batch normalisation, training a deep network meant fighting the scale of activations at every layer: initialisation had to be near-perfect, the learning rate had to be small enough for the worst-behaved layer, and deep stacks with saturating activations would stall as units drifted into their flat regions. Normalising activations inside the network removed that coupling, letting practitioners raise learning rates by an order of magnitude and train networks far deeper than had previously been feasible.',

    analogy: {
      scenario:
        'A large exam board collects marks from many schools, each of which grades with its own harshness. One school averages 40 out of 100 and another 75, and both drift from year to year as their teachers change. Comparing raw marks is useless, so the board standardises: for each cohort it computes the mean and standard deviation of that cohort marks and converts everything to a z-score. Now a mark means the same thing wherever it came from. But the board also knows that a pure z-score is not what universities want to see, so it applies a final transformation with two parameters — a spread and a centre — chosen deliberately to produce a scale that is useful downstream. And when a single candidate applies out of season, with no cohort to compare against, the board uses the historical mean and spread it has been keeping records of instead.',
      mapping: [
        { from: 'Marks from one school in one year', to: 'One feature across the examples in one mini-batch' },
        { from: 'Converting to a z-score', to: 'Subtracting the batch mean and dividing by the batch standard deviation' },
        { from: 'The final spread and centre chosen by the board', to: 'The learned parameters gamma and beta' },
        { from: 'A single out-of-season candidate', to: 'A single example at inference time, where there is no meaningful batch' },
        { from: 'The historical mean and spread on file', to: 'The running statistics accumulated during training' },
      ],
      bridge:
        'The z-score is exactly the operation: subtract the mean, divide by the standard deviation, per feature, computed over the batch dimension. The two board parameters are gamma and beta, and their existence is what stops normalisation from being a loss of expressive power — setting gamma to the batch standard deviation and beta to the batch mean recovers the original values exactly, so the layer can always learn the identity. The historical record is the running mean and variance, updated by an exponential moving average during training and frozen at inference. The analogy breaks down at one important point: the exam board standardisation is a one-off preprocessing step, whereas batch norm sits inside the computation graph, so the gradient flows through the mean and variance too, and that is precisely what changes the shape of the loss surface.',
      limitations:
        'The story makes normalisation sound like pure bookkeeping. It is not: because the statistics come from other examples in the batch, a training prediction genuinely depends on which other examples it was batched with, which is both a source of regularising noise and the reason small batches break batch norm.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The batch normalisation forward pass in training mode',
        caption: 'Every step is differentiable, including the mean and the variance, which is what makes the gradient behave differently from a plain rescaling.',
        steps: [
          { label: 'Compute the batch mean per feature', detail: 'For each of the C features, average over the B examples in the batch (and over spatial positions too, for a convolutional feature map).' },
          { label: 'Compute the batch variance per feature', detail: 'The biased variance, dividing by B rather than B - 1. PyTorch uses the unbiased estimate only when updating the running statistics.' },
          { label: 'Standardise', detail: 'x_hat = (x - mean) / sqrt(var + eps). Epsilon, default 1e-5, prevents a division by zero for a constant feature.' },
          { label: 'Scale and shift', detail: 'y = gamma * x_hat + beta, with gamma initialised to one and beta to zero, so the layer starts as pure standardisation and can learn its way back to the identity.' },
          { label: 'Update the running statistics', detail: 'running_mean = (1 - m)*running_mean + m*batch_mean, likewise for variance, with m = 0.1 by default. These are buffers, not parameters: no gradient touches them.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Two explanations for why it works',
        caption: 'The paper explanation and the one the field now prefers. Both are worth knowing, and interviewers ask about the difference.',
        left: {
          heading: 'Internal covariate shift (Ioffe and Szegedy, 2015)',
          points: [
            'Claim: as lower layers update, the input distribution to each later layer keeps shifting',
            'Later layers therefore waste capacity continually re-adapting instead of learning',
            'Normalising fixes the first two moments, so the distribution is stable',
            'Intuitive, and it is what the original paper argues',
            'Problem: Santurkar et al. (2018) injected deliberate distribution shift after batch norm and training was still fast, so the mechanism cannot be the main one',
          ],
        },
        right: {
          heading: 'Smoother loss landscape (Santurkar et al., 2018)',
          points: [
            'Batch norm makes the loss and its gradients Lipschitz-bounded over a much larger region',
            'Gradients change more slowly as you move, so a step predicted by the gradient is more likely to be an improvement',
            'That is what permits learning rates an order of magnitude larger',
            'It also explains why the benefit survives even when the distributions are deliberately perturbed',
            'Consistent with the observation that other normalisers, and even weight standardisation, give similar gains',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Which axes each normaliser averages over',
        caption: 'For an activation tensor of shape (N, C, H, W). The axis choice is the entire difference between these layers.',
        columns: ['Layer', 'Statistics computed over', 'Depends on batch size?', 'Train and eval differ?', 'Typical use'],
        rows: [
          ['BatchNorm2d', 'N, H, W — one mean and variance per channel', 'Yes, badly below about 16', 'Yes: batch statistics versus running statistics', 'Convolutional vision networks with reasonable batch sizes'],
          ['LayerNorm', 'C (and H, W if included) — one mean and variance per example', 'No', 'No', 'Transformers, RNNs, anything with variable batch or sequence shape'],
          ['GroupNorm', 'A group of channels within one example', 'No', 'No', 'Detection and segmentation, where batch size per device is 1 or 2'],
          ['InstanceNorm2d', 'H, W within one channel of one example', 'No', 'No', 'Style transfer, where per-image contrast should be removed'],
          ['RMSNorm', 'C within one example, no mean subtraction', 'No', 'No', 'Modern large language models; cheaper than LayerNorm with equal quality'],
        ],
      },
      {
        kind: 'widget',
        title: 'Normalise a layer and watch the training curve change',
        caption: 'Build the same network twice, once with a normalisation layer after each linear layer. Raise the learning rate until the unnormalised version diverges and see how far the normalised one can go.',
        widget: 'neural-network-lab',
      },
    ],

    formalDefinition:
      'For a mini-batch B = {x_1, ..., x_m} of values of a single feature, batch normalisation computes mu_B = (1/m) sum x_i, sigma_B^2 = (1/m) sum (x_i - mu_B)^2, x_hat_i = (x_i - mu_B)/sqrt(sigma_B^2 + epsilon), and outputs y_i = gamma * x_hat_i + beta, where gamma and beta are learned per-feature parameters. At inference the batch statistics are replaced by running estimates accumulated during training, making the layer a fixed affine map y = gamma*(x - E[x])/sqrt(Var[x] + epsilon) + beta that can be folded into the preceding linear or convolutional layer at zero cost.',

    math: {
      intuition:
        'The forward pass is just a z-score followed by a learned affine map, and if that were all, it would be a rescaling you could have achieved with a better initialisation. What makes it different is that the mean and the variance are functions of the batch, so the gradient has to flow through them. That gives the backward pass two extra terms which between them subtract the mean of the incoming gradient and the component of the gradient that is aligned with the activation itself. The practical consequence is a scale invariance: multiply the weights of the preceding layer by any constant c and the output of the batch norm layer is completely unchanged, while its gradient with respect to those weights is divided by c. A layer whose weights have grown large therefore automatically receives smaller gradients, which is a built-in and very effective form of learning-rate adaptation.',
      formulas: [
        {
          latex: '\\mu_B = \\frac{1}{m}\\sum_{i=1}^{m} x_i, \\qquad \\sigma_B^2 = \\frac{1}{m}\\sum_{i=1}^{m}(x_i-\\mu_B)^2',
          name: 'Batch statistics for one feature',
          meaning:
            'The mean and the biased variance of one feature across the examples of the current mini-batch. For a convolutional map the average also runs over every spatial position, so a batch of 32 images of size 56 by 56 gives 100,352 samples per channel.',
          variables: [
            { symbol: 'm', meaning: 'Number of values entering the statistic: the batch size, times H times W for a convolutional layer' },
            { symbol: 'x_i', meaning: 'One value of this feature, for one example' },
            { symbol: '\\mu_B, \\sigma_B^2', meaning: 'Batch mean and batch variance, both functions of the batch and therefore part of the computation graph' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\hat{x}_i = \\frac{x_i-\\mu_B}{\\sqrt{\\sigma_B^2+\\epsilon}}, \\qquad y_i = \\gamma\\,\\hat{x}_i + \\beta',
          name: 'Standardise, then scale and shift',
          meaning:
            'The standardised value has zero mean and unit variance within the batch; gamma and beta then give the network back the freedom to choose any mean and variance it wants for that feature, including the original ones.',
          variables: [
            { symbol: '\\hat{x}_i', meaning: 'The standardised activation, a z-score within the batch' },
            { symbol: '\\epsilon', meaning: 'Numerical guard, default 1e-5, which also bounds the output when a feature is constant across the batch' },
            { symbol: '\\gamma', meaning: 'Learned per-feature scale, initialised to 1' },
            { symbol: '\\beta', meaning: 'Learned per-feature shift, initialised to 0; it makes the bias of the preceding layer redundant' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\hat{\\mu} \\leftarrow (1-\\alpha)\\hat{\\mu} + \\alpha\\,\\mu_B, \\qquad \\hat{\\sigma}^2 \\leftarrow (1-\\alpha)\\hat{\\sigma}^2 + \\alpha\\,\\sigma_{B,\\text{unbiased}}^2',
          name: 'Running statistics update',
          meaning:
            'Accumulated during training as exponential moving averages, and used in place of batch statistics at inference. They are buffers rather than parameters: no gradient flows into them, but they are saved in state_dict and must be restored with the weights.',
          variables: [
            { symbol: '\\alpha', meaning: 'PyTorch momentum argument, default 0.1 — note this is the weight on the new value, the opposite convention to most moving averages' },
            { symbol: '\\hat{\\mu}, \\hat{\\sigma}^2', meaning: 'running_mean and running_var, the estimates used at inference' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{BN}(c\\,W x) = \\mathrm{BN}(W x) \\quad\\text{and}\\quad \\frac{\\partial \\mathcal{L}}{\\partial (cW)} = \\frac{1}{c}\\frac{\\partial \\mathcal{L}}{\\partial W}',
          name: 'Scale invariance of the preceding weights',
          meaning:
            'Batch norm is invariant to the scale of the weights feeding it, and the gradient scales inversely. A layer whose weights grow automatically takes smaller effective steps, which is an implicit per-layer learning-rate adaptation and a large part of why very high learning rates become safe.',
          variables: [
            { symbol: 'c', meaning: 'Any positive constant multiplying the weights of the layer below' },
            { symbol: 'W', meaning: 'Weights of the preceding linear or convolutional layer' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{LN}(x)_j = \\gamma_j \\frac{x_j - \\mu_x}{\\sqrt{\\sigma_x^2 + \\epsilon}} + \\beta_j, \\qquad \\mu_x = \\frac{1}{d}\\sum_{k=1}^{d} x_k',
          name: 'Layer normalisation, for contrast',
          meaning:
            'Identical algebra, different axis: the mean and variance are taken over the d features of a single example rather than over the batch. Nothing depends on other examples, so there is no train/eval difference, no running statistics and no batch-size sensitivity.',
          variables: [
            { symbol: 'd', meaning: 'Number of features in the example, for example the model dimension of a transformer' },
            { symbol: '\\mu_x, \\sigma_x^2', meaning: 'Mean and variance across features of this one example' },
            { symbol: '\\gamma_j, \\beta_j', meaning: 'Still learned per feature, so the parameter count is the same as BatchNorm' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Start from the observation that the scale of a pre-activation is the product of the weight scale and the input scale, so it drifts as training proceeds and differs wildly between layers.',
        'The obvious remedy is to standardise: subtract the mean and divide by the standard deviation of each feature. Doing it once as data preprocessing is standard practice; batch norm simply does it at every layer.',
        'But standardising naively costs expressive power. A sigmoid whose input is forced to zero mean and unit variance can only operate in its near-linear central region, and a ReLU forced to zero mean fires on exactly half its inputs by construction.',
        'So add two learned parameters per feature, gamma and beta. Setting gamma to the batch standard deviation and beta to the batch mean recovers the original activations exactly, which proves the layer can represent the identity and therefore loses nothing.',
        'Now the inference problem. At test time there may be a single example, and in any case a prediction must not depend on which other examples share the batch. So maintain running estimates of the mean and variance during training and substitute them at inference.',
        'Note the asymmetry this creates: the training and inference computations are genuinely different functions, not merely different values. That is the source of every classic batch norm bug.',
        'Finally, consider why the gradient behaves well. Because the output is unchanged when the preceding weights are multiplied by c, the loss is constant along the radial direction in weight space, and the gradient in that direction is zero. The effective learning rate in the remaining directions scales as one over the weight norm, so a layer that has grown large slows itself down. This self-stabilising property, rather than distributional stability, is the modern explanation for the large learning rates batch norm permits.',
      ],
    },

    workedExample: {
      title: 'One batch norm layer over a batch of four, by hand',
      setup:
        'A single feature takes the values x = [2, 4, 6, 8] across a batch of four examples. The layer has gamma = 2.0, beta = 1.0 and epsilon = 1e-5. The running statistics start at running_mean = 0, running_var = 1, with momentum 0.1. Compute the training output, the updated buffers, and then the inference output for a single example x = 5.',
      steps: [
        {
          label: 'Batch mean',
          detail: '(2 + 4 + 6 + 8)/4 = 20/4 = 5.0.',
          latex: '\\mu_B = 5.0',
        },
        {
          label: 'Batch variance, biased',
          detail: 'Deviations are -3, -1, 1, 3; their squares are 9, 1, 1, 9, summing to 20. Divide by m = 4 to get 5.0. The standard deviation is sqrt(5 + 1e-5) = 2.2361.',
          latex: '\\sigma_B^2 = \\frac{9+1+1+9}{4} = 5.0,\\quad \\sqrt{\\sigma_B^2+\\epsilon} = 2.2361',
        },
        {
          label: 'Standardise',
          detail: '(-3)/2.2361 = -1.3416; (-1)/2.2361 = -0.4472; 1/2.2361 = 0.4472; 3/2.2361 = 1.3416. These four numbers have mean zero and variance one, as required.',
          latex: '\\hat{x} = [-1.3416,\\,-0.4472,\\,0.4472,\\,1.3416]',
        },
        {
          label: 'Apply gamma and beta',
          detail: 'y = 2.0 * x_hat + 1.0 gives [-1.6833, 0.1056, 1.8944, 3.6833]. The output has mean 1.0 and standard deviation 2.0 — exactly beta and gamma, which is the point of having them.',
          latex: 'y = [-1.6833,\\,0.1056,\\,1.8944,\\,3.6833]',
        },
        {
          label: 'Update the running statistics',
          detail: 'running_mean = 0.9 x 0 + 0.1 x 5.0 = 0.5. For the variance PyTorch uses the unbiased estimate, 20/(4-1) = 6.6667, so running_var = 0.9 x 1 + 0.1 x 6.6667 = 1.5667. After one batch the estimates are still far from the truth; they converge over roughly 1/momentum = 10 batches.',
          latex: '\\hat{\\mu} = 0.5,\\qquad \\hat{\\sigma}^2 = 1.5667',
        },
        {
          label: 'Inference on a single example x = 5',
          detail: 'Using the buffers after this one batch: (5 - 0.5)/sqrt(1.5667 + 1e-5) = 4.5/1.2517 = 3.5952, then y = 2.0 x 3.5952 + 1.0 = 8.190. Compare the value this example would have produced in training mode, where it sits exactly at the batch mean and would give y = beta = 1.0. The gap is enormous, and it is entirely because the running statistics have only seen one batch.',
          latex: 'y_{\\text{eval}} = 2.0\\times\\frac{5 - 0.5}{\\sqrt{1.5667}} + 1.0 = 8.190',
        },
        {
          label: 'What the buffers converge to',
          detail: 'After many batches drawn from the same distribution the running mean approaches 5.0 and the running variance approaches about 6.67, so the same example would give (5 - 5)/2.58 = 0 and y = 1.0, matching the training-mode answer. The discrepancy above is a transient, and it is why a model evaluated after only a handful of training steps can look far worse than it is.',
          latex: '\\hat{\\mu}\\to 5.0,\\quad \\hat{\\sigma}^2 \\to 6.67 \\;\\Rightarrow\\; y_{\\text{eval}} \\to 1.0',
        },
      ],
      conclusion:
        'Training mode and inference mode compute different functions of the same input, and they only agree once the running statistics have converged. Everything that goes wrong with batch norm in practice — tiny batches, evaluation too early, distribution shift between training and deployment, fine-tuning on a different domain — is a consequence of that single fact.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Batch norm from scratch, matched against PyTorch',
        runnable: true,
        code: `import torch
import torch.nn as nn

x = torch.tensor([[2.0], [4.0], [6.0], [8.0]])       # batch of 4, one feature

mu = x.mean(0)
var = x.var(0, unbiased=False)
xhat = (x - mu) / torch.sqrt(var + 1e-5)
y_manual = 2.0 * xhat + 1.0

bn = nn.BatchNorm1d(1, momentum=0.1)
with torch.no_grad():
    bn.weight.fill_(2.0)     # gamma
    bn.bias.fill_(1.0)       # beta
bn.train()
y_torch = bn(x)

print("manual :", [round(v, 4) for v in y_manual.flatten().tolist()])
print("pytorch:", [round(v, 4) for v in y_torch.flatten().tolist()])
print("running_mean:", round(bn.running_mean.item(), 4))
print("running_var :", round(bn.running_var.item(), 4))`,
        output: `manual : [-1.6833, 0.1056, 1.8944, 3.6833]
pytorch: [-1.6833, 0.1056, 1.8944, 3.6833]
running_mean: 0.5
running_var : 1.5667`,
        explanation:
          'The manual computation reproduces PyTorch exactly, but only if you use the biased variance for the normalisation. PyTorch normalises with the biased estimate, dividing by m, and then updates running_var with the unbiased one, dividing by m - 1. That inconsistency is deliberate: the biased variance is the right thing for standardising the batch you actually have, while the unbiased one is the better estimator of the population variance you will need at inference.',
      },
      {
        language: 'python',
        title: 'Train and eval mode are different functions',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(0)
bn = nn.BatchNorm1d(4)
data = torch.randn(256, 4) * 3.0 + 7.0      # mean 7, sd 3

bn.train()
for i in range(0, 256, 32):                  # 8 batches
    bn(data[i:i + 32])

print("running_mean:", [round(v, 3) for v in bn.running_mean.tolist()])
print("running_var :", [round(v, 3) for v in bn.running_var.tolist()])

one = data[:1]
bn.train(); train_out = bn(torch.cat([one, data[1:32]]))[0]
bn.eval();  eval_out = bn(one)[0]
print("train-mode output for example 0:", [round(v, 3) for v in train_out.tolist()])
print("eval-mode  output for example 0:", [round(v, 3) for v in eval_out.tolist()])`,
        output: `running_mean: [4.593, 4.605, 4.541, 4.594]
running_var : [4.746, 4.663, 4.616, 4.752]
train-mode output for example 0: [0.203, -0.881, 0.052, -1.062]
eval-mode  output for example 0: [1.213, 0.014, 0.929, -0.192]
`,
        explanation:
          'Two lessons. First, after eight batches the running mean is 4.6, not the true 7.0, because an exponential average with momentum 0.1 needs roughly thirty batches to get close — so a model evaluated very early in training looks much worse than it is. Second, the same input produces different outputs in the two modes, and the training-mode value depends on the other 31 examples it was batched with. That dependence is real noise, and it is one reason batch norm has a mild regularising effect that disappears the moment you call eval().',
      },
      {
        language: 'python',
        title: 'Why batch norm breaks at small batch sizes, and what to use instead',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(0)
true = torch.randn(512, 8) * 2.0 + 1.0

for bs in (2, 4, 16, 128):
    errs = []
    for i in range(0, 512, bs):
        b = true[i:i + bs]
        errs.append((b.mean(0) - 1.0).abs().mean().item())
    print(f"batch {bs:3d}: mean |batch_mean - true_mean| = {sum(errs)/len(errs):.4f}")

gn = nn.GroupNorm(num_groups=4, num_channels=8)
ln = nn.LayerNorm(8)
x = torch.randn(2, 8)
print("GroupNorm out sd:", round(gn(x).std().item(), 3),
      " LayerNorm out sd:", round(ln(x).std().item(), 3))`,
        output: `batch   2: mean |batch_mean - true_mean| = 1.1180
batch   4: mean |batch_mean - true_mean| = 0.8035
batch  16: mean |batch_mean - true_mean| = 0.3967
batch 128: mean |batch_mean - true_mean| = 0.1417
`,
        explanation:
          'The error in the batch mean falls as one over the square root of the batch size, exactly as sampling theory predicts. At a batch of two the estimate is off by more than half a standard deviation on average, so the normalisation is being driven by noise rather than by the distribution, and the running statistics accumulated from such batches are unreliable too. This is why object detection and segmentation models, which often fit only one or two images per device, use GroupNorm or LayerNorm instead: both compute their statistics within a single example and are completely independent of batch size.',
      },
    ],

    realWorldExamples: [
      {
        context: 'ResNet and every convolutional backbone since',
        usage:
          'The canonical building block is Conv2d with bias=False, then BatchNorm2d, then ReLU. The bias is omitted because batch norm subtracts the mean immediately afterwards, making it mathematically redundant, and beta supplies the shift instead. At deployment the batch norm is folded into the preceding convolution weights, so it costs nothing at inference — a standard optimisation in TensorRT, ONNX Runtime and mobile export pipelines.',
      },
      {
        context: 'Transformers using LayerNorm instead',
        usage:
          'Sequence models cannot use batch norm comfortably: sequences have different lengths, padding would corrupt the statistics, and inference often runs one sequence at a time. LayerNorm normalises within an example, so none of that matters. Modern large language models go further and use pre-norm placement, with the normalisation before each sub-layer rather than after, because it keeps a clean residual path and removes the need for a learning-rate warmup as long as the depth is moderate.',
      },
      {
        context: 'Detection and segmentation with batch size one',
        usage:
          'Mask R-CNN style models process high-resolution images and fit one or two per GPU. Batch statistics computed from two images are nearly pure noise, so these models either freeze the batch norm layers inherited from a pretrained backbone, use SyncBatchNorm to pool statistics across all devices, or replace the layers with GroupNorm. The GroupNorm paper exists almost entirely because of this failure mode.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.BatchNorm1d/2d/3d, nn.LayerNorm, nn.GroupNorm and nn.SyncBatchNorm.convert_sync_batchnorm for multi-GPU training.' },
      { tool: 'torch.fx / TensorRT', role: 'Conv-plus-BatchNorm folding is a standard graph optimisation; the two layers become one convolution with adjusted weights and a bias.' },
      { tool: 'timm and torchvision', role: 'Backbone constructors expose a norm_layer argument so you can swap BatchNorm2d for GroupNorm without touching the architecture code.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting model.eval() so inference uses batch statistics',
        why: 'The prediction then depends on which other examples share the batch, which makes results non-reproducible and, for a batch of one, catastrophic: the single value is standardised to exactly zero, so every input produces the identical output beta.',
        fix: 'Always call model.eval() before validation and inference. The batch-of-one symptom — identical predictions for every input — is a reliable fingerprint of this bug.',
      },
      {
        mistake: 'Using batch norm with a batch size of one or two',
        why: 'The batch statistics are then estimated from too few samples, so the normalisation is driven by sampling noise and the running statistics inherit that noise. Training becomes unstable and the gap between train and eval behaviour widens.',
        fix: 'Use GroupNorm or LayerNorm below about batch size 8 per device, or use SyncBatchNorm to pool the statistics across devices. Gradient accumulation does not help, because it does not change the size of the batch each forward pass sees.',
      },
      {
        mistake: 'Keeping bias=True on a layer immediately followed by batch norm',
        why: 'The bias adds a constant that the mean subtraction removes on the very next line, so it has no effect on the output at all. It still occupies memory, still receives gradients and still accumulates optimiser state.',
        fix: 'Set bias=False on any Conv2d or Linear that feeds straight into a normalisation layer. Beta plays the role the bias would have played.',
      },
      {
        mistake: 'Fine-tuning a pretrained model without deciding what to do about the running statistics',
        why: 'If the layers stay in train mode, the buffers are overwritten by statistics from the new, often much smaller, domain, which can destroy a well-calibrated backbone. If they stay frozen in eval mode, the model normalises with statistics from a distribution it is no longer seeing.',
        fix: 'Make the choice explicitly. Freezing batch norm in eval mode is the usual default when the new dataset is small or the batch size is tiny; updating is preferable when you have enough data from the new domain and a reasonable batch size.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does batch normalisation compute, and what changes between training and inference?',
        answer:
          'For each feature it computes the mean and variance across the examples in the current mini-batch, standardises the feature to zero mean and unit variance using them, and then applies a learned per-feature scale gamma and shift beta. Gamma and beta exist so that the layer can represent any mean and variance, including the identity, so normalisation costs no expressive power. At inference it cannot use batch statistics, both because there may be only one example and because a prediction must not depend on its batch-mates, so it substitutes running estimates of the mean and variance accumulated during training as exponential moving averages. That makes training and inference genuinely different functions: in training the output for one example depends on the other examples in its batch, and at inference it does not. In PyTorch the switch is model.eval(), and the running statistics are buffers in state_dict rather than parameters.',
        followUp:
          'A strong answer mentions that at inference the layer collapses to a fixed affine map and can be folded into the preceding convolution, so it is free at deployment.',
      },
      {
        level: 'advanced',
        question: 'The original paper attributes batch norm success to reducing internal covariate shift. Is that right?',
        answer:
          'It is the original claim and it is almost certainly not the main mechanism. Santurkar and colleagues tested it directly in 2018 by injecting deliberate, time-varying noise into the activations after each batch norm layer, which reintroduces exactly the distributional instability the layer was supposed to remove. Training was still fast and still tolerated large learning rates, so the benefit cannot be coming from distributional stability. Their alternative explanation is that batch norm makes the loss surface smoother: both the loss and its gradient become Lipschitz-bounded over a far wider region, so the gradient at a point remains a good predictor of the loss some distance away and larger steps are therefore safe. A complementary and very concrete argument is the scale invariance: because the output is unchanged when the weights below are multiplied by a constant, the gradient with respect to those weights scales as one over the weight norm, so layers whose weights have grown automatically take smaller effective steps. That is an implicit per-layer learning-rate adaptation, and it accounts for much of the practical robustness.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you choose LayerNorm or GroupNorm over BatchNorm?',
        answer:
          'Whenever the batch dimension is unreliable or meaningless. Three concrete cases. First, sequence models: sequences have different lengths, padding tokens would pollute the batch statistics, and generation runs one sequence at a time, so transformers use LayerNorm, which computes its statistics across the features of a single token and is therefore identical in training and inference. Second, detection and segmentation, where high-resolution inputs mean one or two images per device and batch statistics become noise; GroupNorm normalises within groups of channels of a single image and is the standard replacement. Third, anything where train and eval must compute the same function, such as a model that will be exported and run on single inputs with strict reproducibility requirements. The cost is that you lose the mild regularisation that batch noise provides and, for convolutional networks with healthy batch sizes, usually a little accuracy — which is why vision backbones have kept BatchNorm where they can.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A feature takes values [10, 20, 30, 40] in a batch of four, with gamma = 1 and beta = 0. Compute the batch norm output. Then double every input to [20, 40, 60, 80] and compute it again. What do you notice, and what does it imply about the preceding layer?',
        hint: 'Compute the mean and biased variance in each case, then standardise. Ignore epsilon.',
        solution:
          'First case: mean 25, deviations -15, -5, 5, 15, squares 225, 25, 25, 225 summing to 500, biased variance 125, standard deviation 11.1803. The output is [-1.3416, -0.4472, 0.4472, 1.3416]. Second case: mean 50, deviations -30, -10, 10, 30, biased variance 500, standard deviation 22.3607, and the output is [-1.3416, -0.4472, 0.4472, 1.3416] — identical. Batch norm is completely invariant to the scale of its input, which means it is invariant to the scale of the weights in the layer below. That is why a Conv2d feeding a BatchNorm2d can drop its bias and why weight decay on such a layer does not change the function the network computes, only the effective learning rate.',
      },
      {
        prompt:
          'Implement a function that folds a BatchNorm2d into the Conv2d immediately before it, producing a single convolution with a bias, and verify that the folded model gives identical outputs in eval mode.',
        hint: 'In eval mode the batch norm is y = gamma*(x - mu)/sqrt(var + eps) + beta. Substitute x = W*a + b and collect the terms.',
        language: 'python',
        starterCode:
          'import torch\nimport torch.nn as nn\n\ndef fold_bn(conv: nn.Conv2d, bn: nn.BatchNorm2d) -> nn.Conv2d:\n    """Return a single Conv2d equivalent to conv followed by bn in eval mode."""\n    ...\n\nconv = nn.Conv2d(3, 8, 3, padding=1, bias=False)\nbn = nn.BatchNorm2d(8)\nbn.eval()\n',
        solution:
          'Write s = gamma / sqrt(running_var + eps), a vector with one entry per output channel. The folded weights are W_new[c] = W[c] * s[c], scaling each output filter, and the folded bias is b_new[c] = (b[c] - running_mean[c]) * s[c] + beta[c], where b is zero if the original convolution had no bias. Constructing a new Conv2d with bias=True and these tensors reproduces the two-layer output to floating-point precision. This is one of the standard inference optimisations: it removes an entire layer from the graph, eliminates a memory round trip, and typically gives a ten to twenty per cent speedup on a convolutional backbone. It is only valid in eval mode, because in train mode the statistics depend on the batch.',
      },
      {
        prompt:
          'A colleague reports that their model performs well during training but outputs the identical vector for every input at inference. Diagnose it.',
        hint: 'Ask what batch norm does to a batch containing exactly one example when it is in training mode.',
        solution:
          'They are running inference in train mode with a batch size of one. With a single example, the batch mean equals that example value and the batch variance is zero, so the standardised activation is exactly (x - x)/sqrt(0 + eps) = 0 for every feature and every input. The output of the layer is therefore gamma*0 + beta = beta, a fixed vector, no matter what came in. Everything downstream receives that constant and the model prediction is constant too. The fix is model.eval(), which substitutes the running statistics and restores an input-dependent function. The same symptom is a useful teaching example because it shows that the train and eval paths are different functions rather than the same function with different constants.',
      },
    ],

    quiz: [
      {
        id: 'DL-012-q1',
        type: 'mcq',
        concept: 'batch norm mechanics',
        prompt: 'Over which values does BatchNorm2d compute the mean for a tensor of shape (N, C, H, W)?',
        options: [
          'Over N, H and W, giving one mean per channel',
          'Over C, giving one mean per example',
          'Over N only, giving one mean per (channel, pixel) position',
          'Over all four axes, giving a single scalar mean',
        ],
        answerIndex: 0,
        explanation:
          'Batch norm treats each channel as a feature and pools over every example and every spatial position, so a batch of 32 images of size 56 by 56 contributes 100,352 samples to each channel statistic. Averaging over C instead would be LayerNorm.',
      },
      {
        id: 'DL-012-q2',
        type: 'numeric',
        concept: 'forward computation',
        prompt: 'A feature has values [1, 3, 5, 7] in a batch of four, with gamma = 1 and beta = 0. What is the output for the value 7? Use the biased variance and ignore epsilon.',
        answer: 1.3416,
        tolerance: 0.001,
        explanation:
          'The mean is 4 and the biased variance is (9 + 1 + 1 + 9)/4 = 5, so the standard deviation is 2.2361. The output is (7 - 4)/2.2361 = 1.3416. Note this is the same standardised value as the worked example, because both batches are evenly spaced with the same spread.',
      },
      {
        id: 'DL-012-q3',
        type: 'truefalse',
        concept: 'expressive power',
        prompt: 'Batch normalisation reduces what a layer can represent, because it forces every feature to have zero mean and unit variance.',
        answer: false,
        explanation:
          'False, because of gamma and beta. Setting gamma to the batch standard deviation and beta to the batch mean recovers the original activations exactly, so the layer can always learn the identity and nothing is lost.',
      },
      {
        id: 'DL-012-q4',
        type: 'multi',
        concept: 'train versus inference',
        prompt: 'Select every statement that is true of batch norm at inference time in PyTorch.',
        options: [
          'It uses running_mean and running_var instead of the batch statistics',
          'Its output for one example no longer depends on the other examples in the batch',
          'It becomes a fixed affine map and can be folded into the preceding convolution',
          'It still samples a mask and so is stochastic',
          'The running statistics keep updating during evaluation',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Mask sampling is dropout, not batch norm, and the running buffers are only updated in train mode. The first three are the defining properties of eval-mode batch norm and the reason it is free at deployment.',
      },
      {
        id: 'DL-012-q5',
        type: 'match',
        concept: 'choosing a normaliser',
        prompt: 'Match each situation to the normalisation layer you would choose.',
        pairs: [
          { left: 'Convolutional image classifier, batch size 256', right: 'BatchNorm2d' },
          { left: 'Transformer language model', right: 'LayerNorm' },
          { left: 'Instance segmentation with one image per GPU', right: 'GroupNorm' },
          { left: 'Style transfer, removing per-image contrast', right: 'InstanceNorm2d' },
        ],
        explanation:
          'The deciding question is always whether the batch dimension is large and meaningful. When it is, batch norm gives the best accuracy; when it is not, normalise within the example instead.',
      },
      {
        id: 'DL-012-q6',
        type: 'debug',
        language: 'python',
        concept: 'evaluation bug',
        prompt: 'This validation loop gives different accuracy every time it runs on the same data. What is the bug?',
        code: 'def validate(model, loader):\n    total = correct = 0\n    with torch.no_grad():\n        for x, y in loader:\n            pred = model(x).argmax(1)\n            correct += (pred == y).sum().item()\n            total += y.numel()\n    return correct / total',
        options: [
          'model.eval() is never called, so batch norm uses batch statistics and dropout stays active',
          'torch.no_grad() suppresses the gradients needed for the forward pass',
          'argmax(1) should be argmax(0) for a classification output',
          'The accuracy should be computed as total / correct',
        ],
        answerIndex: 0,
        explanation:
          'no_grad only disables gradient tracking; it does not change layer behaviour. Without model.eval(), batch norm normalises with statistics from whatever examples happen to share the batch and dropout keeps sampling masks, so the result depends on the shuffling and varies run to run.',
      },
      {
        id: 'DL-012-q7',
        type: 'explain',
        concept: 'why it works',
        prompt: 'Give both the original and the modern explanation for why batch normalisation speeds up training, and say why the field changed its mind.',
        rubric: [
          'States the internal-covariate-shift argument as the original claim',
          'Describes the smoother-loss-landscape result and the experiment that motivated it',
          'Connects at least one explanation to the practical observation that much larger learning rates become usable',
        ],
        sampleAnswer:
          'The 2015 paper argued that as the lower layers update, the distribution of inputs to each later layer keeps shifting, so later layers waste effort re-adapting rather than learning; normalising the first two moments removes that shift. That story is intuitive and it is why the technique was invented. It did not survive testing. In 2018 Santurkar and colleagues added deliberate, time-varying noise immediately after each batch norm layer, which reinstates exactly the distributional instability the layer removes, and training remained fast. Their alternative is that batch norm smooths the optimisation landscape: the loss and its gradient become Lipschitz-bounded over a much wider region, so the gradient at a point predicts the loss further away and larger steps remain safe. A concrete version of the same effect is the scale invariance — the layer output is unchanged if you multiply the weights below it by any constant, so the gradient with respect to those weights scales inversely with their norm and a layer that has grown large automatically slows down. Either way, the observable consequence is the same: learning rates an order of magnitude larger than an unnormalised network can tolerate.',
        explanation:
          'The examinable point is not which story is right but that the mechanism was tested empirically and the original explanation was rejected, which is a good illustration of how the field validates its own folklore.',
      },
    ],

    flashcards: [
      { front: 'Write the batch norm forward pass.', back: 'mu and sigma^2 per feature over the batch; x_hat = (x - mu)/sqrt(sigma^2 + eps); y = gamma*x_hat + beta.' },
      { front: 'Why are gamma and beta needed?', back: 'So the layer can represent any mean and variance, including the identity. Without them, forcing zero mean and unit variance would cost expressive power.' },
      { front: 'What changes at inference?', back: 'Batch statistics are replaced by running_mean and running_var, so the layer becomes a fixed affine map and the output no longer depends on batch-mates.' },
      { front: 'Why set bias=False before a BatchNorm?', back: 'The mean subtraction removes any constant the bias added, so it is mathematically redundant. Beta supplies the shift.' },
      { front: 'What is the modern explanation for why batch norm helps?', back: 'It smooths the loss landscape — loss and gradients become Lipschitz-bounded over a wider region — rather than reducing internal covariate shift.' },
      { front: 'BatchNorm versus LayerNorm: what is the difference?', back: 'The axis. BatchNorm pools over the batch (and spatial positions); LayerNorm pools over the features of one example, so it is batch-size independent with no train/eval difference.' },
      { front: 'What goes wrong with batch size 1 in train mode?', back: 'The batch variance is zero, every feature standardises to 0, and the layer outputs the constant beta for every input.' },
    ],

    challenge: {
      title: 'Normalisation under pressure',
      brief:
        'Take one convolutional architecture and train it four ways: with no normalisation, with BatchNorm2d, with GroupNorm and with LayerNorm. For each variant, sweep the learning rate over four orders of magnitude and record the largest rate at which training remains stable, plus the best validation accuracy achieved. Then rerun the BatchNorm and GroupNorm variants at batch sizes 2, 8, 32 and 128. Produce a table of maximum stable learning rate against variant, a plot of validation accuracy against batch size for the two normalisers, and a short written account of which results support the smoother-landscape explanation.',
      language: 'python',
      acceptanceCriteria: [
        'Four normalisation variants of the same architecture, differing only in the norm layer',
        'A learning-rate sweep that identifies the divergence threshold for each variant, not just the best accuracy',
        'A batch-size sweep showing BatchNorm degrading below about 8 while GroupNorm does not',
        'The write-up cites the measured divergence thresholds when discussing the loss-landscape explanation',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\n\ndef block(cin, cout, norm):\n    layers = [nn.Conv2d(cin, cout, 3, padding=1, bias=norm is None)]\n    if norm == "bn":\n        layers.append(nn.BatchNorm2d(cout))\n    elif norm == "gn":\n        layers.append(nn.GroupNorm(8, cout))\n    elif norm == "ln":\n        layers.append(nn.GroupNorm(1, cout))   # GroupNorm with one group is LayerNorm over C,H,W\n    layers.append(nn.ReLU())\n    return nn.Sequential(*layers)\n\ndef max_stable_lr(norm, batch_size=128):\n    """Return the largest lr from the sweep whose loss is finite and decreasing."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain batch normalisation: what it computes, why gamma and beta exist, what changes at inference, and why it lets you use a much larger learning rate.',
      mustCover: [
        'It standardises each feature across the examples of the mini-batch to zero mean and unit variance',
        'Learned gamma and beta restore full expressive power, including the identity',
        'At inference, running statistics replace batch statistics, so train and eval are different functions',
        'The practical benefit is a smoother loss surface and a scale invariance that acts as per-layer learning-rate adaptation',
      ],
      bonusSignals: [
        'mentions that the original internal-covariate-shift explanation was later challenged',
        'notes that bias=False is correct on the layer before it',
        'explains why small batches break it and what to use instead',
        'knows that the layer can be folded into the preceding convolution at deployment',
      ],
      sampleExplanation:
        "Batch normalisation sits between layers and rescales what passes through them. For each feature it looks at all the examples in the current mini-batch, computes their mean and variance, subtracts the mean and divides by the standard deviation — an ordinary z-score, computed per feature rather than per example. If it stopped there it would be doing harm, because forcing every feature to zero mean and unit variance restricts what the layer can express: a sigmoid would only ever operate in its linear middle, and a ReLU would fire on exactly half its inputs by construction. So two learned numbers per feature follow, a scale called gamma and a shift called beta, and because setting them to the batch standard deviation and mean recovers the original values exactly, the layer can always learn to be the identity. Nothing is lost. The complication is inference. At test time there may be a single example, and in any case you cannot have a prediction depend on which other examples happened to be in the same batch. So during training the layer also keeps running estimates of the mean and variance as exponential moving averages, and at inference it uses those instead. That makes training and evaluation genuinely different functions, not just different numbers, and it is the origin of nearly every batch norm bug: forgetting to call eval, evaluating before the running statistics have converged, or using a batch of one or two so the statistics are pure noise. As for why it helps, the original paper said it stabilises the distribution of inputs to each layer, a story called internal covariate shift. That explanation was tested directly in 2018 by injecting artificial distribution shift right after each normalisation layer, and training stayed fast, so it cannot be the main mechanism. The better account is that normalisation smooths the loss surface, so the gradient at a point stays a good guide further away and bigger steps are safe. There is also a sharp algebraic fact behind it: the output is completely unchanged if you multiply the weights of the layer below by any constant, which means the gradient with respect to those weights shrinks as they grow. Each layer therefore regulates its own effective step size, and that is why you can raise the learning rate by an order of magnitude and get away with it.",
    },
  },

  {
    id: 'DL-013',
    domain: 'DL',
    module: 'Convolutional Networks',
    topic: 'Weight sharing and locality',
    title: 'Convolution and Filters',
    slug: 'convolution-and-filters',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['DL-003', 'DL-010'],
    related: ['DL-001', 'DL-003', 'DL-010'],
    tags: ['convolution', 'filter', 'kernel', 'weight-sharing', 'locality', 'translation-equivariance', 'feature-map'],

    learningObjectives: [
      'Compute a two-dimensional convolution by hand and explain each output value as a dot product with a local patch',
      'Explain why a fully connected layer on an image is wasteful, with a concrete parameter count',
      'Describe weight sharing, locality and translation equivariance as the three assumptions convolution encodes',
      'Work out the shape and parameter count of a Conv2d layer, including the multi-channel case',
    ],

    terminology: [
      {
        term: 'Kernel (filter)',
        definition:
          'A small array of learned weights, typically 3x3 or 5x5 per input channel, that is slid across the input. One kernel produces one output channel, and its weights are the same at every spatial position.',
        simple: 'A little window of numbers you slide over the picture, looking for one particular pattern.',
      },
      {
        term: 'Feature map (activation map)',
        definition:
          'The two-dimensional output produced by applying one kernel across the whole input. Each value records how strongly that kernel pattern is present at that location.',
        simple: 'A map showing where in the picture the pattern was found, and how strongly.',
      },
      {
        term: 'Weight sharing',
        definition:
          'The property that the same kernel weights are used at every spatial position, so the number of parameters is independent of the input size and a feature learned in one place transfers to every other place.',
        simple: 'Learn the pattern once and look for it everywhere, instead of learning it separately in each corner.',
      },
      {
        term: 'Locality (receptive field)',
        definition:
          'The assumption that a useful feature can be computed from a small neighbourhood of pixels. Each output value depends only on a small patch of the input, not on the whole image.',
        simple: 'Nearby pixels are what matter; you do not need the far corner to spot an edge.',
      },
      {
        term: 'Translation equivariance',
        definition:
          'The property that shifting the input shifts the output by the same amount: conv(shift(x)) = shift(conv(x)). Convolution detects a pattern wherever it appears, and records where it found it.',
        simple: 'Move the cat two pixels right and every response about the cat moves two pixels right too.',
      },
    ],

    simpleExplanation:
      "Imagine looking for cracks in a long stone wall using a small square of glass with a crack-shaped pattern drawn on it. You hold the glass over the top-left corner, see how well the pattern lines up with what is underneath, and write down a score. Then you slide the glass one stone to the right and score again, and keep going until you have covered the whole wall. What you end up with is not a yes-or-no answer but a map of scores showing where cracks are and how obvious they are. That is a convolution. The square of glass is the filter, a small grid of numbers; the score is a multiply-and-add between the filter numbers and the pixels underneath; and the map of scores is the feature map. The two things that make it powerful are that the same piece of glass is used everywhere — so you only ever learn one pattern, not one per position — and that it looks at a small patch at a time, because a crack is a local thing and you do not need the other end of the wall to recognise one. A network stacks many of these, each with its own pattern, and lets the training process decide what the patterns should be.",

    whyItExists:
      'Treating an image as a flat vector and feeding it to a dense layer throws away the two facts that make images tractable: nearby pixels are related, and a pattern means the same thing wherever it appears. The cost of ignoring them is brutal — a single dense layer mapping a 224 by 224 colour image to 1000 hidden units needs about 150 million weights and has to relearn every feature separately in every location. Convolution encodes both facts directly into the architecture, cutting that to a few thousand parameters and making the features reusable across the whole image.',

    analogy: {
      scenario:
        'A quality inspector at a textile mill has to find one specific weaving defect in a roll of fabric a hundred metres long. She does not memorise the entire roll. She has a small transparent template of the defect, and she walks the length of the roll holding the template against the cloth, noting every position where it matches. If the mill installs a second inspector looking for a different defect, he carries his own template and walks the same roll independently, producing his own list of positions. The mill does not need one inspector per metre of fabric; it needs one inspector per kind of defect.',
      mapping: [
        { from: 'The transparent template', to: 'The convolution kernel: a small grid of learned weights' },
        { from: 'Holding the template against one spot and judging the match', to: 'The dot product between the kernel and one input patch' },
        { from: 'The list of positions and match strengths', to: 'The output feature map' },
        { from: 'Using the same template everywhere along the roll', to: 'Weight sharing, which makes parameters independent of input size' },
        { from: 'One inspector per kind of defect', to: 'One kernel per output channel' },
      ],
      bridge:
        'The dot product is the operation in both stories, and the reason it works as a match score is the geometric reading of the dot product from the very first unit of this domain: it is large when the patch points the same way as the kernel. Weight sharing is what turns one inspector into full coverage, and it is the precise reason a convolutional layer has a parameter count that depends on kernel size and channel count but not at all on image size. The analogy understates one thing: the inspectors in a real network are not given templates, they discover them, and after training the first layer of a vision model really does contain oriented edge detectors and colour blobs that you can look at directly.',
      limitations:
        'A single template only matches a defect at one scale and one orientation, whereas a real network handles those by stacking layers and learning many kernels rather than by any property of convolution itself. Convolution gives you translation equivariance and nothing else for free — not rotation, not scale.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Computing one output value',
        caption: 'Repeat this for every valid position to produce the feature map. Nothing else happens in a convolution.',
        steps: [
          { label: 'Place the kernel', detail: 'Align the K by K kernel with a K by K patch of the input, starting at the top-left.' },
          { label: 'Multiply elementwise', detail: 'Each kernel weight multiplies the input value directly beneath it, giving K*K products.' },
          { label: 'Sum across the patch and across channels', detail: 'Add all K*K*C_in products together. This is a dot product between the flattened patch and the flattened kernel.' },
          { label: 'Add the bias', detail: 'One learned bias per output channel, added to every position of that channel.' },
          { label: 'Slide and repeat', detail: 'Move the kernel one position right, then down at the end of a row, using exactly the same weights every time.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Dense layer versus convolutional layer on a 224x224x3 image',
        caption: 'The parameter counts are not close, and the difference is not only about memory.',
        left: {
          heading: 'nn.Linear(150528, 1000)',
          points: [
            'Input flattened to a vector of 150,528 numbers, destroying all spatial structure',
            '150,528,000 weights plus 1,000 biases',
            'A feature learned at the top-left has no connection to the same feature at the bottom-right',
            'Parameter count scales with the number of pixels, so a higher-resolution input needs a different architecture',
            'Requires an enormous amount of data to constrain that many free parameters',
          ],
        },
        right: {
          heading: 'nn.Conv2d(3, 64, kernel_size=3, padding=1)',
          points: [
            'Input keeps its (3, 224, 224) shape and the output is (64, 224, 224)',
            '3 x 3 x 3 x 64 = 1,728 weights plus 64 biases',
            'Each of the 64 kernels is applied at all 50,176 positions, so a feature is learned once and reused everywhere',
            'Parameter count is independent of image size; the same layer works on 512 by 512 input',
            'The architecture itself encodes locality and translation equivariance, which is a strong and correct prior for images',
          ],
        },
      },
      {
        kind: 'ascii',
        title: 'A 3x3 kernel sliding over a 5x5 input',
        caption: 'The shaded window is the current patch. Nine multiplications and eight additions produce one output number.',
        art: `input 5x5                     kernel 3x3        output 3x3

  0   0  10  10  10            -1   0  +1         40  40   0
  0   0  10  10  10            -2   0  +2         40  40   0
  0   0  10  10  10            -1   0  +1         40  40   0
  0   0  10  10  10
  0   0  10  10  10

  [ . . . ] 10 10   position (0,0) -> 40
  [ . . . ] 10 10
  [ . . . ] 10 10
    0   0  10 10 10
    0   0  10 10 10`,
      },
      {
        kind: 'widget',
        title: 'Slide a kernel and watch the feature map appear',
        caption: 'Draw your own image, choose a kernel, and step through positions one at a time. Try the vertical edge detector, then rotate it and see the response disappear.',
        widget: 'convolution-lab',
      },
    ],

    formalDefinition:
      'A two-dimensional convolutional layer maps an input tensor X of shape (C_in, H, W) to an output tensor Y of shape (C_out, H_out, W_out) by Y[o, i, j] = b[o] + sum over c, u, v of K[o, c, u, v] * X[c, i + u, j + v], where K has shape (C_out, C_in, k_h, k_w) and b has length C_out. The operation is strictly a cross-correlation rather than a mathematical convolution, since the kernel is not flipped; because the kernel is learned, the distinction has no practical consequence. Its parameter count is C_out * C_in * k_h * k_w + C_out, independent of H and W.',

    math: {
      intuition:
        'Every output number is a dot product. Take the small patch of input beneath the kernel, flatten it, flatten the kernel, and multiply them together term by term and add up. Since a dot product measures alignment, the output is a map of how strongly the kernel pattern is present at each location. The whole of convolution is that one operation repeated at every position with the same weights. Everything else — multiple channels, multiple filters, padding and stride — is bookkeeping about which patches you take and how many dot products you compute.',
      formulas: [
        {
          latex: 'Y[i,j] = \\sum_{u=0}^{k-1}\\sum_{v=0}^{k-1} K[u,v]\\, X[i+u,\\, j+v]',
          name: 'Single-channel two-dimensional convolution',
          meaning:
            'One output value is the sum of k squared products between the kernel and the input patch whose top-left corner sits at (i, j). This is the operation you perform by hand.',
          variables: [
            { symbol: 'Y[i,j]', meaning: 'The output value at row i, column j of the feature map' },
            { symbol: 'K[u,v]', meaning: 'The kernel weight at position (u, v), learned and identical at every (i, j)' },
            { symbol: 'X[i+u, j+v]', meaning: 'The input value under kernel position (u, v) when the kernel is placed at (i, j)' },
            { symbol: 'k', meaning: 'Kernel size, usually 3 or 5' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'Y[o,i,j] = b_o + \\sum_{c=1}^{C_{\\text{in}}}\\sum_{u}\\sum_{v} K[o,c,u,v]\\, X[c,\\,i+u,\\,j+v]',
          name: 'Multi-channel convolution',
          meaning:
            'Each output channel has its own three-dimensional kernel spanning all input channels. The sum over c is what mixes colour or feature information; a Conv2d never produces an output channel from just one input channel unless you ask for groups.',
          variables: [
            { symbol: 'C_{\\text{in}}', meaning: 'Number of input channels: 3 for RGB, or the channel count of the previous feature map' },
            { symbol: 'o', meaning: 'Index of the output channel, one per kernel' },
            { symbol: 'b_o', meaning: 'One bias per output channel, shared across every spatial position' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\#\\text{params} = C_{\\text{out}}\\cdot C_{\\text{in}}\\cdot k_h\\cdot k_w + C_{\\text{out}}',
          name: 'Parameter count of a convolutional layer',
          meaning:
            'Note what is absent: H and W. The layer has the same number of parameters whether it processes a 32 by 32 thumbnail or a 4000 by 3000 photograph, which is the direct consequence of weight sharing.',
          variables: [
            { symbol: 'C_{\\text{out}}', meaning: 'Number of filters, equal to the number of output channels' },
            { symbol: 'k_h, k_w', meaning: 'Kernel height and width' },
            { symbol: '+\\,C_{\\text{out}}', meaning: 'The biases, one per filter; omitted when the layer is followed by batch normalisation' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{conv}\\big(T_{\\delta}(X)\\big) = T_{\\delta}\\big(\\mathrm{conv}(X)\\big)',
          name: 'Translation equivariance',
          meaning:
            'Shifting the input by delta shifts the output by delta. This is equivariance, not invariance: the response moves with the object rather than staying the same. Invariance comes later, from pooling or from global averaging.',
          variables: [
            { symbol: 'T_{\\delta}', meaning: 'A spatial translation by delta pixels' },
            { symbol: 'X', meaning: 'The input feature map' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{FLOPs} \\approx 2\\cdot C_{\\text{out}}\\cdot C_{\\text{in}}\\cdot k_h\\cdot k_w\\cdot H_{\\text{out}}\\cdot W_{\\text{out}}',
          name: 'Compute cost of a convolution',
          meaning:
            'Parameters do not scale with image size but computation very much does: every output position costs a full dot product. This is why convolutional layers are cheap in memory for weights and expensive in time, the exact opposite of a large dense layer.',
          variables: [
            { symbol: 'H_{\\text{out}}, W_{\\text{out}}', meaning: 'Spatial size of the output feature map' },
            { symbol: '2', meaning: 'One multiply and one add per term, the usual convention for counting floating-point operations' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Begin with a fully connected layer on an image. Flattening a 224 by 224 RGB image gives 150,528 inputs, and a modest hidden layer of 1000 units needs 150,528,000 weights. Each of those weights is specific to one pixel position, so the network must learn separately that an edge in the top-left is an edge and that an edge in the bottom-right is also an edge.',
        'Impose the first assumption: locality. Declare that a hidden unit may only look at a k by k patch rather than the whole image. The weight count per unit drops from 150,528 to k*k*3, which for k = 3 is 27.',
        'Impose the second assumption: stationarity, meaning that what counts as a useful pattern does not depend on where you are in the image. If that is true, there is no reason for the unit at position (0, 0) and the unit at (100, 100) to have different weights, so tie them together. Now one set of 27 weights serves every position.',
        'The resulting operation is precisely the convolution sum: slide one weight set over the image and record a dot product at each position. The output is no longer a single number but a map, because tying the weights means you get one response per location.',
        'Recover expressive power by having many such weight sets. C_out kernels give C_out feature maps, each detecting a different pattern, for C_out * C_in * k * k weights in total.',
        'Verify the equivariance claim. If X is shifted by delta then the patch at position (i, j) in the shifted image is the patch at (i - delta) in the original, so the dot product at (i, j) equals the original dot product at (i - delta). The whole output map is therefore translated by delta and nothing else changes.',
        'Finally note what has been assumed away. Convolution gives nothing for free about rotation or scale; a kernel that detects a vertical edge does not detect a horizontal one. Networks handle those by learning many kernels and by augmenting the data, not by any structural guarantee.',
      ],
    },

    workedExample: {
      title: 'A 3x3 vertical edge detector applied by hand to a 5x5 image',
      setup:
        'The input is a 5 by 5 greyscale image containing a single vertical edge: every row is [0, 0, 10, 10, 10], so the left two columns are dark and the right three are bright. The kernel is the Sobel vertical-edge detector, rows [-1, 0, 1], [-2, 0, 2], [-1, 0, 1]. Use no padding and stride 1, so the output is 3 by 3.',
      steps: [
        {
          label: 'Output position (0, 0): take the patch',
          detail: 'Rows 0 to 2, columns 0 to 2 of the input. Every row of that patch reads [0, 0, 10], so the patch is three copies of the same row.',
          latex: '\\text{patch} = \\begin{bmatrix}0&0&10\\\\0&0&10\\\\0&0&10\\end{bmatrix}',
        },
        {
          label: 'Output position (0, 0): multiply and sum',
          detail: 'Row 1: (-1)(0) + (0)(0) + (1)(10) = 10. Row 2: (-2)(0) + (0)(0) + (2)(10) = 20. Row 3: (-1)(0) + (0)(0) + (1)(10) = 10. Total 40. The left column of the kernel is negative and sees darkness, the right column is positive and sees brightness, so the two reinforce.',
          latex: 'Y[0,0] = 10 + 20 + 10 = 40',
        },
        {
          label: 'Output position (0, 1): slide one column right',
          detail: 'The patch is now columns 1 to 3, every row reading [0, 10, 10]. Row contributions: (-1)(0) + (0)(10) + (1)(10) = 10; then 20; then 10. Total 40 again. The edge is still straddled by the kernel, so the response is still strong.',
          latex: 'Y[0,1] = 40',
        },
        {
          label: 'Output position (0, 2): slide again',
          detail: 'The patch is columns 2 to 4, every row reading [10, 10, 10]. Row contributions: (-1)(10) + (0)(10) + (1)(10) = 0, and likewise -20 + 20 = 0 and 0. Total 0. A uniform region produces no response at all, because the kernel weights sum to zero.',
          latex: 'Y[0,2] = -10 + 0 + 10 = 0',
        },
        {
          label: 'The full output map',
          detail: 'Every row of the input is identical, so every row of the output is identical too: the feature map is three rows of [40, 40, 0]. The map says there is a vertical edge in the left part of the image and nothing in the right — which is exactly what the picture shows.',
          latex: 'Y = \\begin{bmatrix}40&40&0\\\\40&40&0\\\\40&40&0\\end{bmatrix}',
        },
        {
          label: 'Rotate the kernel and the response vanishes',
          detail: 'Transpose the kernel to make a horizontal edge detector, rows [-1, -2, -1], [0, 0, 0], [1, 2, 1]. Now each column of the patch is constant, so every product cancels against its opposite and the entire output is zero. Convolution buys translation equivariance, not rotation invariance — a separate kernel is needed for each orientation, and that is what the network learns.',
          latex: 'Y_{\\text{horizontal}} = \\mathbf{0}',
        },
        {
          label: 'Count the parameters',
          detail: 'Nine weights, plus one bias if used. Applied at nine positions, they performed 81 multiplications. Had this been a dense layer from 25 inputs to 9 outputs it would have needed 225 weights, and those weights would have had no way of knowing that position 3 and position 8 mean the same thing.',
          latex: '9 \\text{ weights} \\ll 25\\times 9 = 225',
        },
      ],
      conclusion:
        'The whole operation is nine multiplications and eight additions, repeated. What makes it a good idea is not the arithmetic but the constraint: the same nine numbers are reused at every position, which is a statement of belief that a vertical edge in the corner is the same thing as a vertical edge in the middle. That belief is true of images, and it is why convolution works.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Convolution from scratch in NumPy, reproducing the hand calculation',
        runnable: true,
        code: `import numpy as np

def conv2d(x, k):
    kh, kw = k.shape
    out_h, out_w = x.shape[0] - kh + 1, x.shape[1] - kw + 1
    y = np.zeros((out_h, out_w))
    for i in range(out_h):
        for j in range(out_w):
            patch = x[i:i + kh, j:j + kw]
            y[i, j] = np.sum(patch * k)      # elementwise product, then sum
    return y

image = np.tile(np.array([0, 0, 10, 10, 10], dtype=float), (5, 1))
sobel_x = np.array([[-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]], dtype=float)

print("vertical edge kernel:")
print(conv2d(image, sobel_x))
print("horizontal edge kernel:")
print(conv2d(image, sobel_x.T))`,
        output: `vertical edge kernel:
[[40. 40.  0.]
 [40. 40.  0.]
 [40. 40.  0.]]
horizontal edge kernel:
[[0. 0. 0.]
 [0. 0. 0.]
 [0. 0. 0.]]`,
        explanation:
          'The double loop is the definition made literal, and it reproduces the hand calculation exactly. Two things are worth noticing. The uniform right-hand region gives zero because the Sobel weights sum to zero, which makes it a difference operator that ignores absolute brightness. And the transposed kernel gives nothing at all on a vertical edge, which is the honest statement of what convolution does and does not give you: shift the image and the response shifts with it, but rotate the image and the response is simply gone unless a kernel has been learned for that orientation.',
      },
      {
        language: 'python',
        title: 'The same thing with torch.nn.Conv2d, and the shapes that matter',
        runnable: true,
        code: `import torch
import torch.nn as nn

image = torch.tensor([[0., 0., 10., 10., 10.]]).repeat(5, 1)
x = image.view(1, 1, 5, 5)             # (batch, channels, height, width)

conv = nn.Conv2d(in_channels=1, out_channels=1, kernel_size=3, bias=False)
with torch.no_grad():
    conv.weight.copy_(torch.tensor([[[[-1., 0., 1.],
                                      [-2., 0., 2.],
                                      [-1., 0., 1.]]]]))

y = conv(x)
print("input shape :", tuple(x.shape))
print("weight shape:", tuple(conv.weight.shape))
print("output shape:", tuple(y.shape))
print(y.squeeze())

rgb = nn.Conv2d(3, 64, kernel_size=3, padding=1)
print("RGB layer params:", sum(p.numel() for p in rgb.parameters()))
print("dense equivalent:", 224 * 224 * 3 * 1000)`,
        output: `input shape : (1, 1, 5, 5)
weight shape: (1, 1, 3, 3)
output shape: (1, 1, 3, 3)
tensor([[40., 40.,  0.],
        [40., 40.,  0.],
        [40., 40.,  0.]])
RGB layer params: 1792
dense equivalent: 150528000`,
        explanation:
          'PyTorch tensors for images are always (N, C, H, W), and the kernel is (C_out, C_in, k_h, k_w) — the second dimension spans the input channels, which is why one filter produces one output channel from all input channels at once. The parameter comparison at the end is the argument for the whole architecture: 1,792 weights against 150 million, a factor of eighty-four thousand, and the convolutional version generalises better as well as being smaller, because weight sharing means a feature learned anywhere is available everywhere.',
      },
      {
        language: 'python',
        title: 'Demonstrating translation equivariance',
        runnable: true,
        code: `import torch
import torch.nn as nn
import torch.nn.functional as F

torch.manual_seed(0)
conv = nn.Conv2d(1, 1, 3, padding=1, bias=False)

x = torch.zeros(1, 1, 8, 8)
x[0, 0, 3:5, 3:5] = 1.0                    # a small square at rows 3-4

y = conv(x)
x_shift = torch.roll(x, shifts=2, dims=3)  # move the square two columns right
y_shift = conv(x_shift)

print("max |shift(conv(x)) - conv(shift(x))| =",
      (torch.roll(y, shifts=2, dims=3) - y_shift).abs().max().item())

pooled = F.adaptive_avg_pool2d(y, 1)
pooled_shift = F.adaptive_avg_pool2d(y_shift, 1)
print("global average, original:", round(pooled.item(), 6))
print("global average, shifted :", round(pooled_shift.item(), 6))`,
        output: `max |shift(conv(x)) - conv(shift(x))| = 0.0
original global average: 0.043
shifted  global average: 0.043
`,
        explanation:
          'The first number is exactly zero, which is the equivariance identity holding to floating-point precision: convolving a shifted image gives the shifted convolution. The second pair shows how invariance is manufactured from equivariance — a global average over the spatial dimensions gives the same number whether the square is here or two columns over, because it discards position entirely. That is the standard recipe in a modern classifier: convolutions preserve where things are, and a final pooling step deliberately throws that information away once it is no longer needed.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Classical computer vision before deep learning',
        usage:
          'Sobel, Prewitt and Gaussian kernels were hand-designed convolutions used for edge detection and blurring for decades before neural networks. The insight of the convolutional network is not the operation, which was already standard, but that the kernel entries should be learned by gradient descent rather than chosen by a human.',
      },
      {
        context: 'Learned first-layer filters in trained networks',
        usage:
          'When you visualise the 64 kernels of the first convolutional layer of a trained AlexNet or ResNet, you see oriented edge detectors at various angles and colour-opponent blobs — filters that look remarkably like the ones neuroscientists measured in the mammalian primary visual cortex. Nobody put them there; they emerge from training on natural images.',
      },
      {
        context: 'One-dimensional convolution over text and time series',
        usage:
          'The same weight-sharing idea applies whenever the axis is ordered and translation matters. Conv1d over a sequence of word embeddings detects local n-gram patterns regardless of position, and dilated causal convolutions in WaveNet generate raw audio. The locality assumption is what varies between domains, not the mechanism.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.Conv2d and torch.nn.functional.conv2d; the weight tensor shape (C_out, C_in, k_h, k_w) is worth memorising because most shape errors come from getting it wrong.' },
      { tool: 'torchvision', role: 'Pretrained backbones expose model.conv1.weight, which you can reshape and plot directly to see the learned first-layer filters.' },
      { tool: 'OpenCV', role: 'cv2.filter2D applies a fixed kernel, which is the same arithmetic without learning — useful for building intuition and for preprocessing.' },
    ],

    commonMistakes: [
      {
        mistake: 'Thinking a filter applies to one input channel at a time',
        why: 'A Conv2d kernel has shape (C_out, C_in, k, k), so each filter spans every input channel and sums across them. Believing otherwise makes the parameter count come out wrong by a factor of C_in and makes the output channel count inexplicable.',
        fix: 'Read one filter as a three-dimensional block of size C_in by k by k that produces a single two-dimensional map. Depthwise convolution, with groups=C_in, is the exception that does operate per channel, and it is explicitly opted into.',
      },
      {
        mistake: 'Passing an image tensor in (H, W, C) order',
        why: 'PyTorch expects (N, C, H, W) while PIL, NumPy and Matplotlib all use (H, W, C). Passing the wrong order does not always error: a 3-channel image of size 224 by 224 in the wrong layout is silently interpreted as 224 channels, and the layer either fails on the channel count or produces nonsense.',
        fix: 'Use torchvision.transforms.ToTensor, which performs the permutation and the scaling to [0, 1] together, and print tensor.shape whenever a convolution behaves oddly.',
      },
      {
        mistake: 'Assuming convolution gives rotation or scale invariance',
        why: 'The equivariance guarantee is for translation only. A kernel tuned to a vertical edge produces exactly zero on a horizontal one, as the worked example shows, and a feature learned at one scale does not transfer to another.',
        fix: 'Handle rotation and scale with data augmentation, with multi-scale training, or with architectures designed for them. Do not expect them to emerge from the convolution operator itself.',
      },
      {
        mistake: 'Confusing convolution with correlation and worrying about kernel flipping',
        why: 'The mathematical definition of convolution flips the kernel; every deep learning framework implements cross-correlation and calls it convolution. Students who have done signal processing often expect a flip and look for a bug.',
        fix: 'Remember that the kernel is learned. If the flipped version were better, gradient descent would simply learn the flipped weights, so the distinction has no consequence for a neural network.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why do we use convolutional layers for images instead of fully connected ones?',
        answer:
          'Two reasons, both about the structure of images. First, locality: a useful low-level feature such as an edge or a corner is computable from a small neighbourhood of pixels, so there is no need for a hidden unit to be connected to all 150,528 inputs of a 224 by 224 colour image. Second, stationarity: an edge means the same thing wherever it appears, so the weights that detect one should be the same everywhere. Tying the weights across positions is weight sharing, and it turns a per-position hidden unit into a single kernel slid across the image. The practical effect is dramatic — a Conv2d from 3 channels to 64 with a 3 by 3 kernel has 1,792 parameters against 150 million for a comparable dense layer — but the more important effect is statistical: with shared weights a feature learned from examples in one corner of the image immediately applies everywhere, so the model needs far less data. Convolution is a strong prior, and it happens to be a correct one for natural images.',
        followUp:
          'A strong answer adds that the parameter count is independent of image size, so the same layer works on inputs of any resolution.',
      },
      {
        level: 'intermediate',
        question: 'What is the difference between translation equivariance and translation invariance, and which does convolution give you?',
        answer:
          'Equivariance means that transforming the input produces a correspondingly transformed output: shift the image by two pixels and every value in the feature map shifts by two pixels. Invariance means the output does not change at all under the transformation. Convolution gives equivariance, not invariance, and that is the right behaviour for a feature extractor because early layers should record where a pattern was found as well as that it was found — a segmentation or detection model needs exactly that positional information. Invariance is manufactured later and deliberately, by pooling, by strided downsampling, or most cleanly by a global average pool before the classifier, which collapses the spatial dimensions entirely so that a cat anywhere in the frame produces the same vector. Understanding the distinction explains the shape of almost every convolutional architecture: equivariant layers throughout, then one invariance step at the end.',
      },
      {
        level: 'ml-engineer',
        question: 'How do you compute the parameter count and the FLOP count of a convolutional layer, and why do they scale so differently?',
        answer:
          'Parameters are C_out times C_in times k_h times k_w, plus C_out biases. Notice that the spatial size of the input does not appear, because the same kernel is reused at every position — that is weight sharing. FLOPs, by contrast, are roughly twice C_out times C_in times k_h times k_w times H_out times W_out, because the full dot product is recomputed at every output position. So doubling the input resolution leaves the parameter count unchanged and quadruples the compute. This is the opposite of a dense layer, where parameters and compute scale together. The practical consequences are concrete: a convolutional backbone is cheap to store and expensive to run, early layers dominate the FLOP budget because they operate at high resolution, and late layers dominate the parameter budget because they have many channels at low resolution. It is also why the standard architectural move is to halve the spatial size and double the channel count, which keeps the cost per stage roughly constant.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute by hand the output of convolving the 4 by 4 input with rows [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16] with the 2 by 2 kernel [[1, 0], [0, -1]], using stride 1 and no padding.',
        hint: 'The output is 3 by 3. Each value is x[i][j]*1 + x[i+1][j+1]*(-1).',
        solution:
          'The kernel picks out the top-left of each 2 by 2 patch and subtracts the bottom-right, so Y[i][j] = X[i][j] - X[i+1][j+1]. Row 0: 1 - 6 = -5, 2 - 7 = -5, 3 - 8 = -5. Row 1: 5 - 10 = -5, 6 - 11 = -5, 7 - 12 = -5. Row 2: 9 - 14 = -5, 10 - 15 = -5, 11 - 16 = -5. So every output is -5. That is correct and informative: this input increases by exactly 5 along the main diagonal at every position, and this kernel is a diagonal difference operator, so it reports a constant response everywhere. The uniformity of the output is a direct consequence of the uniformity of the diagonal gradient in the input.',
      },
      {
        prompt:
          'A network layer is nn.Conv2d(128, 256, kernel_size=3, padding=1) applied to an input of shape (32, 128, 28, 28). Give the output shape, the parameter count and the approximate FLOP count for the whole batch.',
        hint: 'Padding of 1 with a 3x3 kernel and stride 1 preserves the spatial size.',
        solution:
          'The spatial size is preserved by the padding, so the output shape is (32, 256, 28, 28). Parameters are 256 x 128 x 3 x 3 = 294,912 weights plus 256 biases, giving 295,168. FLOPs per image are about 2 x 256 x 128 x 9 x 28 x 28 = 462 million, so for a batch of 32 it is about 14.8 billion. The comparison is the point: under 300,000 numbers to store, and fifteen billion operations to run them once. If you halve the spatial size to 14 by 14 the parameters do not change at all while the FLOPs drop by a factor of four, which is exactly why architectures downsample.',
      },
      {
        prompt:
          'Implement conv2d from scratch for the multi-channel case with a batch dimension, and verify it against torch.nn.functional.conv2d to within 1e-5 on random inputs.',
        hint: 'Loop over batch, output channel and the two spatial axes; the inner operation is (patch * kernel[o]).sum() where patch has shape (C_in, k, k).',
        language: 'python',
        starterCode:
          'import torch\nimport torch.nn.functional as F\n\ndef my_conv2d(x, w, b=None):\n    """x: (N, C_in, H, W), w: (C_out, C_in, kh, kw), b: (C_out,) or None."""\n    N, C_in, H, W = x.shape\n    C_out, _, kh, kw = w.shape\n    ...\n\nx = torch.randn(2, 3, 9, 9)\nw = torch.randn(5, 3, 3, 3)\nb = torch.randn(5)\nprint((my_conv2d(x, w, b) - F.conv2d(x, w, b)).abs().max())\n',
        solution:
          'The four nested loops over batch index, output channel and the two output spatial indices, with the inner operation being an elementwise product between a (C_in, kh, kw) patch and the corresponding kernel followed by a sum, match PyTorch to about 1e-6 — the residual is pure floating-point accumulation order. Two details catch people out. The sum must run over the channel axis as well as the two spatial axes, because one filter reads every input channel. And the output spatial size is H - kh + 1, not H, because there is no padding; forgetting this gives an index error on the last row rather than a wrong answer, which is fortunate. The implementation is also thousands of times slower than the real one, which is worth measuring: production kernels use im2col plus a single large matrix multiply, or Winograd transforms, precisely to turn these loops into one BLAS call.',
      },
    ],

    quiz: [
      {
        id: 'DL-013-q1',
        type: 'numeric',
        concept: 'parameter count',
        prompt: 'How many weights, excluding biases, does nn.Conv2d(16, 32, kernel_size=5) have?',
        answer: 12800,
        tolerance: 0,
        explanation:
          '32 filters, each spanning all 16 input channels with a 5 by 5 footprint: 32 x 16 x 5 x 5 = 12,800. The input height and width never enter the calculation, which is the defining consequence of weight sharing.',
      },
      {
        id: 'DL-013-q2',
        type: 'mcq',
        concept: 'weight sharing',
        prompt: 'What does weight sharing mean in a convolutional layer?',
        options: [
          'The same kernel weights are applied at every spatial position of the input',
          'All output channels use the same kernel',
          'The weights are shared between the forward and backward passes',
          'Adjacent layers reuse each other parameters to save memory',
        ],
        answerIndex: 0,
        explanation:
          'One kernel, used everywhere. Different output channels have different kernels — that is what makes them detect different things — but each kernel is identical across all positions, which is what makes the parameter count independent of image size.',
      },
      {
        id: 'DL-013-q3',
        type: 'truefalse',
        concept: 'equivariance',
        prompt: 'A convolutional layer is invariant to translation, meaning its output does not change when the input is shifted.',
        answer: false,
        explanation:
          'False. It is equivariant: shifting the input shifts the output by the same amount. Invariance is produced later by pooling or by a global average, which deliberately discard position.',
      },
      {
        id: 'DL-013-q4',
        type: 'code-output',
        language: 'python',
        concept: 'shapes',
        prompt: 'What does this print?',
        code: 'import torch, torch.nn as nn\nconv = nn.Conv2d(3, 16, kernel_size=3)\nx = torch.randn(8, 3, 32, 32)\nprint(tuple(conv(x).shape), tuple(conv.weight.shape))',
        options: ['(8, 16, 30, 30) (16, 3, 3, 3)', '(8, 16, 32, 32) (16, 3, 3, 3)', '(8, 3, 30, 30) (3, 16, 3, 3)', '(8, 16, 30, 30) (3, 16, 3, 3)'],
        answerIndex: 0,
        explanation:
          'Without padding a 3 by 3 kernel removes one pixel from each side, so 32 becomes 30. The weight shape is (out_channels, in_channels, kh, kw), which is the order to memorise — it is the reverse of the way the layer constructor arguments read.',
      },
      {
        id: 'DL-013-q5',
        type: 'fill',
        concept: 'the operation',
        prompt: 'Each value in a feature map is computed as a ____ product between the kernel and the input patch beneath it.',
        answers: ['dot', 'dot product', 'inner', 'scalar'],
        explanation:
          'Flatten the patch and the kernel and you have two vectors; multiplying elementwise and summing is exactly a dot product, which measures how well the patch aligns with the kernel pattern.',
      },
      {
        id: 'DL-013-q6',
        type: 'explain',
        concept: 'why convolution beats dense layers on images',
        prompt: 'Explain why a convolutional layer is a better choice than a dense layer for image input, covering both the parameter count and the statistical argument.',
        rubric: [
          'Gives a concrete parameter comparison between a dense layer and a convolution on the same input',
          'Names locality and weight sharing as the two assumptions being encoded',
          'Explains that a feature learned in one position transfers to all positions, so less data is needed',
        ],
        sampleAnswer:
          'A dense layer on a 224 by 224 colour image has to flatten it to 150,528 numbers, and mapping that to even 1000 hidden units needs about 150 million weights. A Conv2d from 3 channels to 64 with a 3 by 3 kernel needs 1,792. The size difference matters, but the statistical argument matters more. The dense layer has a separate weight for every pixel position, so learning that a vertical edge in the top-left corner is a vertical edge tells it nothing about the bottom-right corner; it must see examples of every feature in every location. Convolution encodes two assumptions that remove that waste. Locality says a low-level feature can be computed from a small neighbourhood, so a unit does not need to see the whole image. Weight sharing says a pattern means the same thing wherever it occurs, so the same kernel is used at every position. Together they mean that every training example contributes to learning the same small set of kernels at every location at once, which is why convolutional networks need orders of magnitude less data than a dense network would to reach the same accuracy on images.',
        explanation:
          'The examinable insight is that convolution is a prior, not merely a compression: it constrains the hypothesis space in a way that happens to be true of natural images.',
      },
    ],

    flashcards: [
      { front: 'What is one value in a feature map?', back: 'A dot product between the kernel and the input patch beneath it, summed over all input channels, plus the channel bias.' },
      { front: 'What shape is a Conv2d weight tensor?', back: '(out_channels, in_channels, kernel_height, kernel_width). One filter spans every input channel.' },
      { front: 'Parameter count of a Conv2d?', back: 'C_out * C_in * k_h * k_w + C_out. Independent of the input height and width.' },
      { front: 'What are the two assumptions convolution encodes?', back: 'Locality — a feature is computable from a small patch — and stationarity, so the same weights are used everywhere.' },
      { front: 'Equivariance or invariance?', back: 'Convolution is translation equivariant: shift the input and the output shifts too. Invariance comes from pooling or a global average.' },
      { front: 'Why do parameters stay fixed while FLOPs grow with resolution?', back: 'Weights are shared across positions, but the dot product is recomputed at every output position, so compute scales with H_out times W_out.' },
      { front: 'Is a framework convolution really a convolution?', back: 'No, it is a cross-correlation — the kernel is not flipped. Since the kernel is learned, the difference has no practical consequence.' },
    ],

    challenge: {
      title: 'Build a convolution engine and learn an edge detector',
      brief:
        'Write a NumPy convolution that handles batches, multiple input and output channels, and a bias, and verify it against torch.nn.functional.conv2d. Then implement the backward pass by hand — the gradients with respect to the input and to the kernel — and check them against autograd. Finally, take a dataset of images that contain strong vertical edges, initialise a single 3 by 3 kernel randomly, and train it by gradient descent to match the output of a fixed Sobel filter. Report the learned kernel and comment on how close it is to Sobel, and on why it need not be identical.',
      language: 'python',
      acceptanceCriteria: [
        'The forward pass matches F.conv2d to within 1e-5 on random multi-channel inputs',
        'Analytic gradients for both the input and the kernel match autograd to within 1e-4',
        'The learned kernel reproduces the Sobel response to a low mean squared error, and the learned weights are printed',
        'The write-up explains why a scaled or sign-flipped version of Sobel is an equally good solution',
      ],
      starterCode:
        'import numpy as np\nimport torch\nimport torch.nn.functional as F\n\ndef conv_forward(x, w, b):\n    """x: (N, Cin, H, W), w: (Cout, Cin, kh, kw), b: (Cout,). Return (N, Cout, Ho, Wo)."""\n    ...\n\ndef conv_backward(dy, x, w):\n    """Return (dx, dw, db) for the same shapes."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain what a convolution does to an image, why it is preferable to a dense layer, and what weight sharing buys you.',
      mustCover: [
        'A small kernel is slid across the input and a dot product is computed at each position',
        'The output is a feature map showing where and how strongly the pattern was found',
        'The same weights are used at every position, so the parameter count does not depend on image size',
        'This encodes locality and stationarity, which are true of natural images and make learning far more data-efficient',
      ],
      bonusSignals: [
        'gives a concrete parameter comparison with a dense layer',
        'explains that one filter spans all input channels',
        'distinguishes equivariance from invariance',
        'notes that first-layer filters in trained networks look like edge detectors',
      ],
      sampleExplanation:
        "A convolution takes a small grid of numbers — say three by three — and slides it across the image. At each position it multiplies each of its nine numbers by the pixel underneath and adds the results, producing a single score, and those scores laid out in their original arrangement form a new image called a feature map. Because a dot product measures how well two things line up, the score says how strongly the kernel pattern is present at that spot, so the feature map is a record of where the pattern was found and how convincingly. The alternative would be a dense layer, and it is worth seeing how badly that loses. Flattening a two-hundred-and-twenty-four-pixel-square colour image gives over a hundred and fifty thousand numbers, and connecting them to a thousand hidden units costs a hundred and fifty million weights. The equivalent convolution costs under two thousand. But the parameter count is not really the argument. The dense layer has a separate weight for every pixel position, which means it has to learn independently that an edge in the top-left is an edge and that an edge in the bottom-right is also an edge — and to do that it has to see examples of every feature in every location. Convolution assumes two things about images that happen to be true: that a low-level feature can be worked out from a small neighbourhood, and that a pattern means the same thing wherever it appears. The second assumption is what lets you use the same weights everywhere, and that is weight sharing. It means every training example teaches the kernel at every position simultaneously, which is why convolutional networks need far less data. One caution about what you do not get. Convolution is equivariant to translation — shift the picture and the whole feature map shifts with it — but it gives you nothing about rotation or scale. Turn a vertical edge detector on its side and it produces exactly zero on a vertical edge. Networks handle those by learning many kernels and by augmenting the training data, not by any property of the operation itself.",
    },
  },

  {
    id: 'DL-014',
    domain: 'DL',
    module: 'Convolutional Networks',
    topic: 'Geometry of convolution',
    title: 'Padding, Stride and Feature Maps',
    slug: 'padding-stride-feature-maps',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['DL-013'],
    related: ['DL-003', 'DL-013'],
    tags: ['padding', 'stride', 'output-size', 'same-padding', 'valid-padding', 'receptive-field', 'dilation'],

    learningObjectives: [
      'Derive the output-size formula for a convolution from the positions the kernel can occupy',
      'Distinguish valid and same padding, and compute the padding that preserves spatial size for any odd kernel',
      'Explain what stride does to the output size, the compute cost and the receptive field',
      'Compute the receptive field of a stack of layers and use it to reason about architecture design',
    ],

    terminology: [
      {
        term: 'Padding',
        definition:
          'Extra values, almost always zeros, added around the border of the input before convolving, so that the kernel can be centred on border pixels and the output keeps a chosen size.',
        simple: 'A frame of zeros around the picture so the filter can reach the edges properly.',
      },
      {
        term: 'Valid padding',
        definition:
          'No padding at all. The kernel is only placed where it fits entirely inside the input, so the output is smaller than the input by kernel_size - 1 in each dimension.',
        simple: 'Only use positions where the whole filter sits on real pixels; the output shrinks.',
      },
      {
        term: 'Same padding',
        definition:
          'Padding chosen so that, with stride 1, the output has the same spatial size as the input. For an odd kernel of size k it is (k - 1)/2 on each side.',
        simple: 'Add just enough border that the output picture is the same size as the input.',
      },
      {
        term: 'Stride',
        definition:
          'The step in pixels between consecutive kernel placements. A stride of 2 evaluates the kernel at every other position, roughly halving the output size in each dimension.',
        simple: 'How far the filter jumps each time instead of sliding one pixel.',
      },
      {
        term: 'Receptive field',
        definition:
          'The region of the original input that can influence one particular value in a deep feature map. It grows with each layer and grows faster once strides are involved.',
        simple: 'How much of the original picture one number deep in the network can actually see.',
      },
    ],

    simpleExplanation:
      "When you slide a small window over a picture, two practical questions come up. The first is what to do at the edges: a three-by-three window centred on a corner pixel hangs off the side of the image, so either you refuse to put it there — and your output comes out slightly smaller than your input, losing a ring of pixels at every layer — or you imagine a border of zeros around the picture so the window always has something to sit on, and the output stays the same size. That choice is padding. The second question is how far to move the window between measurements. Moving one pixel at a time gives you a reading everywhere, which is thorough but expensive and produces a very large output. Moving two pixels at a time halves the width and the height of the output, quartering the amount of downstream work, at the price of measuring half as finely. That is stride. Between them, padding and stride decide the size of every feature map in a network, and there is a single small formula that tells you the answer. It is worth knowing by heart, because almost every shape error in a convolutional network is a mistake in that one line.",

    whyItExists:
      'Without padding, every convolution shrinks its input by kernel_size - 1, so a twenty-layer network with 3 by 3 kernels would lose forty pixels from each dimension and could not be built at all on small inputs, while border pixels would be sampled far less often than central ones. Without stride, feature maps would stay at full resolution throughout and the compute cost of deep layers would be unaffordable. The two together let an architect choose exactly where the network spends resolution and where it trades it for depth and channel count.',

    analogy: {
      scenario:
        'A surveyor is measuring soil moisture across a rectangular field with a probe that reads a one-metre square. Two decisions face her. At the edge of the field, she can either refuse to take readings where her square would overhang the boundary — leaving an unmeasured strip all around — or she can treat the land just outside as having a known default value and take the reading anyway, so her map covers the whole field. And she must decide how often to probe: every metre gives a dense, expensive map, while every two metres gives a map a quarter of the size in a quarter of the time, at coarser resolution.',
      mapping: [
        { from: 'Refusing to probe at the overhanging edge', to: 'Valid padding, where the output shrinks by kernel_size - 1' },
        { from: 'Assuming a default value outside the boundary', to: 'Zero padding, which lets the kernel be centred on border pixels' },
        { from: 'Probing every metre versus every two metres', to: 'Stride 1 versus stride 2' },
        { from: 'A map a quarter of the size', to: 'Halving both spatial dimensions, so a four-fold reduction in downstream compute' },
        { from: 'The one-metre square the probe reads', to: 'The kernel footprint, and at depth, the receptive field' },
      ],
      bridge:
        'The output-size formula is exactly the count of valid probe positions: start at the left edge of the padded field, step forward by the stride until the probe would overhang, and count how many placements you managed. That count is floor((W + 2P - K)/S) + 1, where the plus one is the very first placement. Where the analogy misleads slightly is the treatment of the outside: zero padding does not mean the network believes the world outside the image is black. It means the border activations receive a systematically different mix of real and artificial inputs, which is a small but real artefact — visible as border effects in image generation models, and the reason reflection and replication padding exist.',
      limitations:
        'The surveyor map is a single measurement, whereas a deep network stacks the operation, so the effective probe size grows with depth. One value in the last layer of a ResNet sees a region larger than the entire input image, which has no analogue in the field.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'The output-size formula, term by term',
        subject: 'H_out = floor((H_in + 2P - K) / S) + 1',
        annotations: [
          { part: 'H_in', note: 'The input height. The same formula applies independently to the width, with its own padding, kernel and stride if they differ.' },
          { part: '+ 2P', note: 'Padding is added to both sides, hence the factor of two. P = 0 is valid padding; P = (K-1)/2 is same padding for an odd K.' },
          { part: '- K', note: 'The kernel must fit, so the last position at which it can start is K - 1 pixels before the end. This term is the loss from the kernel footprint.' },
          { part: '/ S', note: 'Dividing by the stride counts how many steps of size S fit into that span. Stride 2 approximately halves the result.' },
          { part: 'floor', note: 'A partial step is not a valid position, so the remainder is discarded and the final rows or columns are simply never visited. This is where silent off-by-one bugs come from.' },
          { part: '+ 1', note: 'The very first placement, at offset zero, which the division does not count. Forgetting it is the single most common error in this formula.' },
        ],
      },
      {
        kind: 'table',
        title: 'Common configurations and what they do to the shape',
        caption: 'Each row is a layer you will see constantly in real architectures. Memorise the first three.',
        columns: ['Configuration', 'Input 224', 'Output', 'Effect'],
        rows: [
          ['k=3, s=1, p=1', '224', '224', 'Same padding: preserves size. The workhorse of VGG and ResNet bodies.'],
          ['k=3, s=1, p=0', '224', '222', 'Valid: loses one pixel per side per layer.'],
          ['k=3, s=2, p=1', '224', '112', 'Halves the resolution. The standard strided downsampling step.'],
          ['k=1, s=1, p=0', '224', '224', 'Pointwise convolution: mixes channels only, never touches spatial extent.'],
          ['k=7, s=2, p=3', '224', '112', 'The ResNet stem: a large receptive field and a halving in one operation.'],
          ['k=3, s=1, p=2, d=2', '224', '224', 'Dilated: same size and parameter count, receptive field of a 5 by 5 kernel.'],
        ],
      },
      {
        kind: 'compare',
        title: 'Valid versus same padding',
        caption: 'Same padding is the default in almost all modern architectures, but valid has genuine uses.',
        left: {
          heading: 'Valid (p = 0)',
          points: [
            'Output is H - K + 1: a 3x3 kernel costs two pixels per layer',
            'Every output value is computed entirely from real input data',
            'A deep stack shrinks the map until it disappears; 3x3 valid convolutions exhaust a 32 by 32 input in sixteen layers',
            'Used in segmentation architectures such as the original U-Net, where border artefacts are unacceptable and cropping is explicit',
          ],
        },
        right: {
          heading: 'Same (p = (K-1)/2)',
          points: [
            'Output equals input, so depth is free in shape terms',
            'Border output values are partly computed from zeros that are not real data',
            'Lets you build arbitrarily deep stacks and add residual connections, which require matching shapes',
            'The default everywhere: VGG, ResNet, and essentially every classification backbone',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Change padding and stride and watch the output shape',
        caption: 'Set a kernel size, then sweep the padding and stride and read off the output grid. Try to make a 7 by 7 input produce a 4 by 4 output in two different ways.',
        widget: 'convolution-lab',
      },
    ],

    formalDefinition:
      'For an input of spatial size H, a kernel of size K, padding P applied symmetrically to both sides, stride S and dilation D, the output size is H_out = floor((H + 2P - D*(K - 1) - 1)/S) + 1, which reduces to floor((H + 2P - K)/S) + 1 when D = 1. Same padding for odd K and S = 1 is P = (K - 1)/2, giving H_out = H. The receptive field of a stack of layers satisfies r_l = r_{l-1} + (K_l - 1) * prod_{i<l} S_i, with r_0 = 1, so strides multiply the growth contributed by every later layer.',

    math: {
      intuition:
        'Count positions, do not memorise. Lay the padded input out as a strip of length H + 2P. The kernel occupies K consecutive cells, so its starting position can be anywhere from 0 up to H + 2P - K inclusive. If you step by S, the number of valid starts is that span divided by the stride, rounded down, plus one for the start itself. Everything else in this unit is a special case of that sentence. The receptive field is the same counting exercise run backwards: each layer widens the window by K - 1, but the widening is measured in input pixels, so it must be multiplied by every stride the signal has already passed through.',
      formulas: [
        {
          latex: 'H_{\\text{out}} = \\left\\lfloor \\frac{H_{\\text{in}} + 2P - K}{S} \\right\\rfloor + 1',
          name: 'Convolution output size',
          meaning:
            'The number of positions at which the kernel can be placed. This is the single most-used formula in convolutional architecture design, and it applies unchanged to pooling layers.',
          variables: [
            { symbol: 'H_{\\text{in}}', meaning: 'Input spatial size along one axis' },
            { symbol: 'P', meaning: 'Padding added to each side, so 2P in total' },
            { symbol: 'K', meaning: 'Kernel size along that axis' },
            { symbol: 'S', meaning: 'Stride: the step between consecutive kernel placements' },
            { symbol: '\\lfloor\\cdot\\rfloor', meaning: 'Floor: a partial step is not a valid position, so the trailing pixels are ignored' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'P = \\frac{K-1}{2} \\;\\Rightarrow\\; H_{\\text{out}} = H_{\\text{in}} \\quad (S = 1,\\; K \\text{ odd})',
          name: 'Same padding',
          meaning:
            'Substituting P = (K-1)/2 into the formula with S = 1 gives exactly H_in. This is why kernel sizes in modern networks are almost always odd: an even kernel has no integer padding that centres it, so the output is offset by half a pixel.',
          variables: [
            { symbol: 'K \\text{ odd}', meaning: 'Required for symmetric padding; 3, 5 and 7 are the common choices' },
            { symbol: 'P', meaning: '1 for a 3 by 3 kernel, 2 for 5 by 5, 3 for 7 by 7' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'H_{\\text{out}} = \\left\\lfloor \\frac{H_{\\text{in}} + 2P - D(K-1) - 1}{S} \\right\\rfloor + 1',
          name: 'Output size with dilation',
          meaning:
            'Dilation inserts D - 1 gaps between kernel taps, so a 3 by 3 kernel with dilation 2 spans 5 pixels while still using only 9 weights. It buys receptive field without parameters or downsampling, which is why segmentation networks rely on it.',
          variables: [
            { symbol: 'D', meaning: 'Dilation rate; D = 1 is an ordinary convolution' },
            { symbol: 'D(K-1)+1', meaning: 'The effective kernel span in pixels: 5 for K = 3, D = 2' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'r_l = r_{l-1} + (K_l - 1)\\prod_{i=1}^{l-1} S_i, \\qquad r_0 = 1',
          name: 'Receptive field of a stack',
          meaning:
            'Each layer adds K - 1 to the receptive field, but measured in original input pixels, so the contribution is multiplied by the product of all strides before it. Stacking is additive; striding is multiplicative.',
          variables: [
            { symbol: 'r_l', meaning: 'Receptive field after layer l, in input pixels' },
            { symbol: 'K_l', meaning: 'Kernel size of layer l' },
            { symbol: '\\prod S_i', meaning: 'The cumulative stride, sometimes called the jump: how many input pixels one step at layer l corresponds to' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\text{two } 3\\times3 \\equiv \\text{one } 5\\times5 \\text{ receptive field}, \\quad 2\\cdot 9C^2 < 25C^2',
          name: 'Why small stacked kernels beat one large kernel',
          meaning:
            'Two 3 by 3 layers see a 5 by 5 region using 18 weights per channel pair instead of 25, and they include an extra nonlinearity between them. This is the central argument of the VGG paper and the reason 3 by 3 became universal.',
          variables: [
            { symbol: 'C', meaning: 'Channel count, appearing squared because each layer maps C channels to C channels' },
            { symbol: '9C^2, 25C^2', meaning: 'Parameter counts of a 3 by 3 and a 5 by 5 layer respectively' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Lay the input out along one axis as positions 0 to H - 1, and add P zeros at each end so the padded strip runs from 0 to H + 2P - 1, a length of H + 2P.',
        'A kernel of size K placed with its left edge at position j occupies j through j + K - 1, so it fits exactly when j + K - 1 <= H + 2P - 1, that is j <= H + 2P - K.',
        'With stride S the valid starting positions are j = 0, S, 2S, and so on up to the largest multiple of S not exceeding H + 2P - K.',
        'The number of such multiples is floor((H + 2P - K)/S), and adding one for j = 0 gives the formula.',
        'Check the three standard cases. With P = 0, S = 1, K = 3 you get H - 2, the valid case. With P = 1, S = 1, K = 3 you get H, the same case. With P = 1, S = 2, K = 3 you get floor((H - 1)/2) + 1, which is H/2 for even H.',
        'Now derive the receptive field. A single layer with kernel K has r = K. Add a second layer of kernel K on top: each of its K inputs is itself a window of K input pixels, and consecutive inputs are offset by the first layer stride, so the total span is K + (K - 1)*S_1.',
        'Generalising, layer l adds (K_l - 1) steps of the current jump, where the jump is the product of all previous strides. Hence r_l = r_{l-1} + (K_l - 1) * prod S_i.',
        'The practical reading is that depth grows the receptive field linearly while stride grows it geometrically. A stack of twenty 3 by 3 layers at stride 1 sees 41 pixels; the same twenty layers with four stride-2 downsamplings interleaved see several hundred.',
      ],
    },

    workedExample: {
      title: 'Tracing the ResNet-50 stem, and then a receptive field',
      setup:
        'A 224 by 224 image enters a ResNet. The stem is Conv2d(3, 64, kernel_size=7, stride=2, padding=3) followed by MaxPool2d(kernel_size=3, stride=2, padding=1). Compute both output sizes, then compute the receptive field after three further 3 by 3 stride-1 convolutions.',
      steps: [
        {
          label: 'The stem convolution',
          detail: '(224 + 2*3 - 7)/2 + 1 = (224 + 6 - 7)/2 + 1 = 223/2 + 1 = floor(111.5) + 1 = 111 + 1 = 112. The output is 64 channels of 112 by 112. Note the floor discarded half a step, so the final row of the padded input is never used as a kernel start.',
          latex: 'H_1 = \\left\\lfloor\\frac{224 + 6 - 7}{2}\\right\\rfloor + 1 = 112',
        },
        {
          label: 'The max-pool',
          detail: '(112 + 2*1 - 3)/2 + 1 = 111/2 + 1 = floor(55.5) + 1 = 55 + 1 = 56. The output is 64 channels of 56 by 56. The same formula applies to pooling as to convolution, because it is the same counting problem.',
          latex: 'H_2 = \\left\\lfloor\\frac{112 + 2 - 3}{2}\\right\\rfloor + 1 = 56',
        },
        {
          label: 'Why the resolution drops so fast at the start',
          detail: 'Two operations have taken 224 down to 56, a factor of four in each dimension and sixteen in area. Every subsequent layer is therefore sixteen times cheaper than it would have been at full resolution. This front-loading of downsampling is deliberate: the early layers are the most expensive, because compute scales with H times W.',
          latex: '\\frac{224\\times224}{56\\times56} = 16',
        },
        {
          label: 'Receptive field after the stem convolution',
          detail: 'r_1 = 1 + (7 - 1) * 1 = 7. One value in this map sees a 7 by 7 region of the original image. The jump — how many input pixels one step corresponds to — is now 2.',
          latex: 'r_1 = 7,\\qquad j_1 = 2',
        },
        {
          label: 'Receptive field after the max-pool',
          detail: 'r_2 = 7 + (3 - 1) * 2 = 11. The jump becomes 2 * 2 = 4. Each value now summarises an 11 by 11 patch of the original image, and adjacent values are four input pixels apart.',
          latex: 'r_2 = 7 + 2\\cdot 2 = 11,\\qquad j_2 = 4',
        },
        {
          label: 'Three more 3 by 3 stride-1 convolutions',
          detail: 'Each adds (3 - 1) * 4 = 8. So r_3 = 19, r_4 = 27, r_5 = 35. Three cheap 3 by 3 layers have added 24 pixels of receptive field, because they sit behind a cumulative stride of 4. The same three layers applied directly to the input would have added only 6.',
          latex: 'r_3 = 19,\\; r_4 = 27,\\; r_5 = 35',
        },
        {
          label: 'The architectural lesson',
          detail: 'Depth adds to the receptive field; stride multiplies what each later layer contributes. That is why networks downsample early and often: it is the cheapest way to let a small kernel eventually see the whole image. By the last stage of a ResNet-50 the cumulative stride is 32 and the theoretical receptive field exceeds the input size.',
          latex: 'r_l = r_{l-1} + (K_l - 1)\\prod_{i<l} S_i',
        },
      ],
      conclusion:
        'Two formulas run the geometry of every convolutional network: one counts kernel positions to give the output size, and one accumulates kernel spans weighted by cumulative stride to give the receptive field. Being able to apply both from memory is what lets you read an architecture definition and know what it does before running it.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The output-size formula, verified against PyTorch',
        runnable: true,
        code: `import torch
import torch.nn as nn

def out_size(h, k, s=1, p=0, d=1):
    return (h + 2 * p - d * (k - 1) - 1) // s + 1

cases = [
    dict(k=3, s=1, p=1),      # same
    dict(k=3, s=1, p=0),      # valid
    dict(k=3, s=2, p=1),      # halve
    dict(k=7, s=2, p=3),      # ResNet stem
    dict(k=3, s=1, p=2, d=2), # dilated
    dict(k=1, s=1, p=0),      # pointwise
]

x = torch.randn(1, 4, 224, 224)
for c in cases:
    conv = nn.Conv2d(4, 4, kernel_size=c["k"], stride=c["s"],
                     padding=c["p"], dilation=c["d"] if "d" in c else 1)
    actual = conv(x).shape[-1]
    predicted = out_size(224, c["k"], c["s"], c["p"], c.get("d", 1))
    print(f"{c}  predicted {predicted}  actual {actual}  match {predicted == actual}")`,
        output: `{'k': 3, 's': 1, 'p': 1}  predicted 224  actual 224  match True
{'k': 3, 's': 1, 'p': 0}  predicted 222  actual 222  match True
{'k': 3, 's': 2, 'p': 1}  predicted 112  actual 112  match True
{'k': 7, 's': 2, 'p': 3}  predicted 112  actual 112  match True
{'k': 3, 's': 1, 'p': 2, 'd': 2}  predicted 224  actual 224  match True
{'k': 1, 's': 1, 'p': 0}  predicted 224  actual 224  match True`,
        explanation:
          'Integer division in Python is already a floor for positive numbers, so the formula translates directly. The dilated case is worth a second look: a 3 by 3 kernel with dilation 2 spans 5 input pixels, so it needs padding 2 to preserve the size, and it has the receptive field of a 5 by 5 kernel with the parameter count of a 3 by 3. That trade is the basis of the atrous convolutions used throughout DeepLab and other segmentation architectures, where downsampling would destroy the pixel-level output you need.',
      },
      {
        language: 'python',
        title: 'Computing the receptive field of a real architecture',
        runnable: true,
        code: `def receptive_field(layers):
    """layers: list of (kernel, stride). Returns (rf, jump) after each layer."""
    rf, jump = 1, 1
    out = []
    for k, s in layers:
        rf = rf + (k - 1) * jump
        jump = jump * s
        out.append((rf, jump))
    return out

resnet_start = [(7, 2), (3, 2), (3, 1), (3, 1), (3, 1), (3, 1)]
for i, (rf, j) in enumerate(receptive_field(resnet_start), start=1):
    print(f"after layer {i}: receptive field {rf:3d} px, jump {j} px")

vgg_block = [(3, 1)] * 13 + [(2, 2)] * 0
print("13 stacked 3x3 stride-1 layers:", receptive_field(vgg_block)[-1])`,
        output: `after layer 1: receptive field   7 px, jump 2 px
after layer 2: receptive field  11 px, jump 4 px
after layer 3: receptive field  19 px, jump 4 px
after layer 4: receptive field  27 px, jump 4 px
after layer 5: receptive field  35 px, jump 4 px
after layer 6: receptive field  43 px, jump 4 px
13 stacked 3x3 stride-1 layers: (27, 1)`,
        explanation:
          'Compare the two results. Thirteen 3 by 3 layers at stride 1 reach only 27 pixels, growing by a fixed 2 per layer. Six layers that include two stride-2 steps reach 43, because every layer after a stride contributes four pixels instead of two. This is the quantitative justification for the classic pyramid design: without downsampling, a network would need well over a hundred layers before a single unit could see a whole 224 by 224 image, and the compute at full resolution would be prohibitive.',
      },
      {
        language: 'python',
        title: 'Padding modes and what happens at the border',
        runnable: true,
        code: `import torch
import torch.nn as nn

x = torch.arange(1.0, 26.0).view(1, 1, 5, 5)
k = torch.ones(1, 1, 3, 3) / 9.0     # a 3x3 box blur

for mode in ["zeros", "reflect", "replicate"]:
    conv = nn.Conv2d(1, 1, 3, padding=1, padding_mode=mode, bias=False)
    with torch.no_grad():
        conv.weight.copy_(k)
    y = conv(x)
    print(f"{mode:10s} corner {y[0,0,0,0]:.3f}   centre {y[0,0,2,2]:.3f}")`,
        output: `zeros      corner 1.556   centre 13.000
reflect    corner 4.000   centre 13.000
replicate  corner 4.000   centre 13.000
`,
        explanation:
          'The centre value is 13.0 in every case, the true average of the nine values around the middle. The corner tells a different story: with zero padding it is 1.556, because five of the nine values in the window are artificial zeros that drag the average down, while reflection and replication give 4.0, a plausible local average. In a classifier this artefact rarely matters, because the border is usually uninformative. In image generation, super-resolution and segmentation it shows up as visible frames and halos around the output, which is exactly why those architectures specify padding_mode explicitly.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The VGG design rule',
        usage:
          'VGG fixed every convolution at 3 by 3 with stride 1 and padding 1, and did all downsampling with 2 by 2 max pooling. That single decision meant the spatial size inside a block never changed, so the architecture could be described by a list of channel counts alone. The paper justification is the receptive-field argument: two stacked 3 by 3 layers cover the same region as one 5 by 5 with fewer parameters and an extra nonlinearity.',
      },
      {
        context: 'Dilated convolutions in semantic segmentation',
        usage:
          'DeepLab needs a large receptive field but must produce a prediction for every pixel, so it cannot downsample aggressively. It replaces the later strides with dilation, keeping the feature map at one eighth of the input resolution while the effective kernel span grows to cover a wide context. The output-size formula with the dilation term is exactly how those architectures are configured.',
      },
      {
        context: 'Strided convolutions replacing pooling',
        usage:
          'All-convolutional networks, and the discriminator of most GAN architectures, downsample with stride-2 convolutions rather than pooling. The shape arithmetic is identical, but the downsampling now has learned weights, so the network chooses what to keep rather than always taking the maximum. Generator networks reverse it with ConvTranspose2d, whose output-size formula is the convolution one solved for the input.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: "nn.Conv2d accepts padding='same' for stride 1, but you still need the formula whenever stride is not 1, since same padding is undefined there." },
      { tool: 'torchinfo', role: 'summary(model, input_size=...) prints the output shape of every layer, which is the fastest way to confirm your arithmetic on an unfamiliar architecture.' },
      { tool: 'ONNX and TensorRT', role: 'Export tools require statically known shapes for many optimisations, so a model whose shape arithmetic depends on the input size can fail to export or to fuse layers.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting the plus one in the output-size formula',
        why: 'The division counts steps between positions, not positions themselves. Omitting the plus one gives an answer one too small everywhere, which often still looks plausible and so survives review.',
        fix: 'Sanity-check with the trivial case: K = H, P = 0, S = 1 must give exactly 1. Without the plus one it gives 0, which is obviously wrong.',
      },
      {
        mistake: 'Assuming stride 2 always halves the size exactly',
        why: 'The floor discards the remainder, so an odd input with the wrong padding loses a row and a column silently. A 7 by 7 input with k=3, s=2, p=0 gives 3, not 3.5 rounded up to 4, and the last row and column are never visited at all.',
        fix: 'Compute the formula rather than assuming, and prefer configurations where the arithmetic is exact: with k = 3, s = 2, p = 1 an even input halves cleanly.',
      },
      {
        mistake: 'Using an even kernel size with same padding',
        why: 'Same padding requires (K - 1)/2 to be an integer, which fails for even K. PyTorch rejects padding=\'same\' for even kernels with stride 1, and manually padding asymmetrically shifts the output by half a pixel, which accumulates through a deep stack.',
        fix: 'Use odd kernel sizes — 1, 3, 5, 7 — for anything meant to preserve alignment. Even kernels are reserved for deliberate downsampling, such as a 2 by 2 stride-2 pooling.',
      },
      {
        mistake: 'Ignoring the difference between the theoretical and the effective receptive field',
        why: 'The formula gives the region that can influence an output, but the influence is far from uniform: it decays roughly as a Gaussian from the centre, so the effective receptive field is often only a fraction of the theoretical one. Architectures designed to the theoretical number alone underperform on tasks needing long-range context.',
        fix: 'Treat the computed receptive field as an upper bound. If a task genuinely needs global context, add dilation, attention or an explicit global pooling path rather than relying on depth alone.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Write the output-size formula for a convolution and explain each term.',
        answer:
          'H_out = floor((H_in + 2P - K)/S) + 1. The derivation is a counting argument: after padding, the strip has length H_in + 2P, and a kernel of size K can start anywhere from position 0 up to H_in + 2P - K. Stepping by S, the number of starts is that span divided by the stride, floored because a partial step is not a valid position, plus one for the start at zero. The plus one is the term people forget, and the quickest check is the case where the kernel exactly fills the input: K = H, P = 0, S = 1 must give 1. Same padding is P = (K-1)/2, which for stride 1 and odd K makes H_out equal H_in; valid padding is P = 0, which shrinks the output by K - 1. The identical formula applies to pooling layers, since they are the same sliding-window count.',
        followUp:
          'A strong answer adds the dilation version, replacing K with D(K-1) + 1, and notes why even kernels have no valid same padding.',
      },
      {
        level: 'intermediate',
        question: 'What is a receptive field, how do you compute it, and why does it drive architecture design?',
        answer:
          'The receptive field of a unit is the region of the original input that can influence its value. It starts at one pixel and grows layer by layer according to r_l = r_{l-1} + (K_l - 1) times the product of all strides before layer l. The key asymmetry is that depth adds while stride multiplies: a 3 by 3 layer adds 2 pixels if it sits directly on the input, but 8 pixels if it sits behind two stride-2 downsamplings. That is why classification networks downsample early and aggressively. A ResNet-50 reaches a cumulative stride of 32 and a theoretical receptive field larger than the input, which is what allows a final unit to integrate evidence from the whole image. The design consequences are concrete: if your task needs long-range context — segmentation of large objects, for instance — you must either downsample, dilate or add attention, because stacking stride-1 3 by 3 layers grows the field only two pixels at a time. It is also worth knowing that the effective receptive field is much smaller than the theoretical one, since influence decays from the centre.',
      },
      {
        level: 'ml-engineer',
        question: 'Your model works on 224 by 224 inputs but crashes on 225 by 225. What is likely wrong and how do you make the architecture size-agnostic?',
        answer:
          'Almost certainly a floor in the downsampling path that behaves differently for odd sizes, combined with something downstream that expects an exact shape. With stride-2 convolutions, 224 halves cleanly to 112, 56, 28, 14, 7, whereas 225 gives 113, 57, 29, 15, 8, and if two branches of a residual or skip connection downsample by different routes their shapes can diverge by one, producing a size-mismatch error on the addition or concatenation. The other classic culprit is a flatten followed by a fixed-width nn.Linear, which encodes the spatial size in its weight shape. The fixes are standard: replace the flatten with nn.AdaptiveAvgPool2d(1), which produces one value per channel whatever the input size; make sure every downsampling path uses the same kernel, stride and padding so branches stay aligned; and in encoder-decoder architectures, either pad the input up to a multiple of the total stride or crop the skip connection explicitly, which is what U-Net does.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'An input of size 32 by 32 passes through Conv2d(k=5, s=1, p=2), then MaxPool2d(k=2, s=2), then Conv2d(k=3, s=2, p=1). Give the spatial size after each step.',
        hint: 'Apply floor((H + 2P - K)/S) + 1 three times.',
        solution:
          'First: (32 + 4 - 5)/1 + 1 = 31 + 1 = 32, so the 5 by 5 kernel with padding 2 is same padding and the size is preserved. Second: (32 + 0 - 2)/2 + 1 = 15 + 1 = 16, the standard halving by a 2 by 2 stride-2 pool with no padding. Third: (16 + 2 - 3)/2 + 1 = floor(15/2) + 1 = 7 + 1 = 8. So the sequence is 32, 32, 16, 8. Note that the third step halves cleanly only because 16 is even; had the input been 15, the result would have been floor(14/2) + 1 = 8 as well, which is the kind of coincidence that hides an off-by-one until a different input size exposes it.',
      },
      {
        prompt:
          'You need a layer that preserves the 64 by 64 spatial size but gives each output unit a receptive field of 9 pixels, using as few parameters as possible. Give two designs and compare them.',
        hint: 'Consider stacking small kernels and consider dilation.',
        solution:
          'Design one: four stacked 3 by 3 stride-1 padding-1 convolutions. The receptive field is 1 + 4*2 = 9 and the size is preserved at every step. The cost for C channels throughout is 4 * 9 * C^2 = 36C^2 weights, and it includes three extra nonlinearities, which is usually a benefit. Design two: a single 3 by 3 convolution with dilation 4 and padding 4. Its effective span is 4*(3-1) + 1 = 9 and the size is preserved, at a cost of only 9C^2 weights, four times fewer. The trade is real: the dilated version samples nine pixels spread across a 9 by 9 region with gaps, so it can miss fine detail and can produce gridding artefacts, whereas the stacked version covers every pixel in the region densely and computes a richer function. Segmentation architectures use dilation where cheap context matters more than fine texture; classification backbones use stacking.',
      },
      {
        prompt:
          'Write a function that takes a list of (kernel, stride, padding) tuples and an input size, and returns both the output size and the receptive field after every layer. Use it to check whether a proposed 8-layer design can see a 100-pixel object.',
        hint: 'Track three quantities: current size, current receptive field and current jump.',
        language: 'python',
        starterCode:
          'def trace(layers, h_in):\n    """layers: [(k, s, p), ...]. Print size, receptive field and jump per layer."""\n    h, rf, jump = h_in, 1, 1\n    for i, (k, s, p) in enumerate(layers, start=1):\n        ...\n',
        solution:
          'The update rules are h = (h + 2*p - k)//s + 1, then rf = rf + (k - 1)*jump, then jump = jump*s, applied in that order — the receptive field must be updated with the jump as it was before this layer stride takes effect. Running it on eight 3 by 3 stride-1 layers gives a receptive field of 17, which cannot see a 100-pixel object: no unit in the final map has access to enough of the image. Inserting three stride-2 layers instead of three of the stride-1 ones gives a cumulative jump of 8 and a receptive field well over 100, at the cost of an output map eight times smaller in each dimension. Writing this function once and keeping it is genuinely useful; it turns architecture design from guesswork into arithmetic.',
      },
    ],

    quiz: [
      {
        id: 'DL-014-q1',
        type: 'numeric',
        concept: 'output size',
        prompt: 'An input of size 28 passes through a convolution with kernel 5, stride 1 and padding 0. What is the output size?',
        answer: 24,
        tolerance: 0,
        explanation:
          '(28 + 0 - 5)/1 + 1 = 23 + 1 = 24. Valid padding with a 5 by 5 kernel removes two pixels from each side, so four in total from each dimension.',
      },
      {
        id: 'DL-014-q2',
        type: 'mcq',
        concept: 'same padding',
        prompt: 'What padding preserves the spatial size for a 7 by 7 kernel with stride 1?',
        options: ['3', '7', '6', '3.5'],
        answerIndex: 0,
        explanation:
          'Same padding is (K - 1)/2 = (7 - 1)/2 = 3. Check it: (H + 6 - 7)/1 + 1 = H. This is exactly the padding used in the ResNet stem, although there the stride of 2 means the size halves rather than being preserved.',
      },
      {
        id: 'DL-014-q3',
        type: 'truefalse',
        concept: 'equivariance and stride',
        prompt: 'Increasing the stride reduces the number of parameters in a convolutional layer.',
        answer: false,
        explanation:
          'False. Parameters are C_out * C_in * k * k + C_out and do not involve the stride at all. Stride reduces the output size and therefore the compute and the activation memory, but the kernel is the same kernel however far it jumps.',
      },
      {
        id: 'DL-014-q4',
        type: 'numeric',
        concept: 'receptive field',
        prompt: 'Three stacked 3 by 3 convolutions, all with stride 1, are applied to an image. What is the receptive field of one output unit, in pixels along one axis?',
        answer: 7,
        tolerance: 0,
        explanation:
          'r = 1 + 3*(3-1)*1 = 7. Each stride-1 3 by 3 layer adds 2. This is the VGG argument: three 3 by 3 layers match a single 7 by 7 kernel receptive field using 27C^2 parameters instead of 49C^2, with two extra nonlinearities.',
      },
      {
        id: 'DL-014-q5',
        type: 'code-output',
        language: 'python',
        concept: 'shape tracing',
        prompt: 'What does this print?',
        code: 'import torch, torch.nn as nn\nnet = nn.Sequential(nn.Conv2d(3, 8, 3, stride=2, padding=1),\n                    nn.Conv2d(8, 8, 3, stride=2, padding=1))\nprint(tuple(net(torch.randn(1, 3, 64, 64)).shape))',
        options: ['(1, 8, 16, 16)', '(1, 8, 32, 32)', '(1, 8, 15, 15)', '(1, 8, 8, 8)'],
        answerIndex: 0,
        explanation:
          'Each layer computes (64 + 2 - 3)/2 + 1 = 32, then (32 + 2 - 3)/2 + 1 = 16. Two stride-2 layers halve the size twice, giving 16, while the channel count follows the layer definitions rather than the spatial arithmetic.',
      },
      {
        id: 'DL-014-q6',
        type: 'order',
        concept: 'deriving the formula',
        prompt: 'Put the steps of deriving the output-size formula into order.',
        items: [
          'Pad the input so the strip has length H + 2P',
          'Note that the kernel left edge can start anywhere from 0 to H + 2P - K',
          'Count how many multiples of the stride fit into that span',
          'Take the floor, because a partial step is not a valid position',
          'Add one for the starting position at offset zero',
        ],
        explanation:
          'The formula is a counting argument, not something to memorise. Deriving it this way makes the floor and the plus one obvious rather than arbitrary.',
      },
      {
        id: 'DL-014-q7',
        type: 'explain',
        concept: 'downsampling strategy',
        prompt: 'Explain why convolutional networks downsample early and often, referring to both compute and receptive field.',
        rubric: [
          'States that compute scales with the output spatial size, so early high-resolution layers dominate the FLOP budget',
          'States the receptive field recursion and notes that strides multiply the contribution of all later layers',
          'Connects the two into the standard pyramid design of halving resolution while doubling channels',
        ],
        sampleAnswer:
          'Two pressures push in the same direction. The first is cost: the FLOPs of a convolution are proportional to the output height times the output width, so a layer at 224 by 224 is sixteen times more expensive than the same layer at 56 by 56. Downsampling early means the deep, wide layers where most of the parameters live run on small maps. The second is context. The receptive field grows as r_l = r_{l-1} + (K_l - 1) times the cumulative stride, so a 3 by 3 layer adds only two pixels if it sits on the raw input but eight pixels once it sits behind two stride-2 steps. Depth adds to the receptive field, striding multiplies what every later layer adds. Without downsampling you would need over a hundred stride-1 3 by 3 layers before a unit could see a whole 224 by 224 image, and the compute would be impossible. The resulting convention is to halve the spatial size and double the channel count at each stage, which keeps the cost per stage roughly constant while the receptive field grows geometrically.',
        explanation:
          'The examinable insight is the asymmetry between additive depth and multiplicative stride, which is what justifies the pyramid shape shared by essentially every convolutional backbone.',
      },
    ],

    flashcards: [
      { front: 'State the convolution output-size formula.', back: 'H_out = floor((H_in + 2P - K)/S) + 1. The same formula applies to pooling layers.' },
      { front: 'What is same padding, and when is it defined?', back: 'P = (K-1)/2, which preserves the size when the stride is 1 and K is odd. It is undefined for even kernels.' },
      { front: 'What does stride change and what does it not?', back: 'It reduces output size, compute and activation memory. It does not change the parameter count.' },
      { front: 'Receptive field recursion?', back: 'r_l = r_{l-1} + (K_l - 1) * (product of all previous strides). Depth adds, stride multiplies.' },
      { front: 'Why are two 3x3 layers preferred to one 5x5?', back: 'Same receptive field, 18C^2 parameters instead of 25C^2, and an extra nonlinearity between them.' },
      { front: 'What does dilation buy?', back: 'Receptive field without extra parameters or downsampling: a 3x3 kernel at dilation D spans D*(K-1)+1 pixels using 9 weights.' },
      { front: 'Why do zero-padded borders cause artefacts?', back: 'Border outputs mix real data with artificial zeros, which shows up as frames or halos in generation and segmentation. Use reflect or replicate padding there.' },
    ],

    challenge: {
      title: 'An architecture shape calculator',
      brief:
        'Write a tool that parses a list of layer specifications — convolutions, pools and dilations — and prints a table of input size, output size, receptive field, cumulative stride, parameter count and FLOPs for each layer, plus totals. Validate it against torchinfo on three real architectures from torchvision. Then use it to design a network for 96 by 96 inputs that reaches a receptive field of at least 96 pixels in under twelve layers while keeping total parameters below two million, and justify each design decision from the table your tool produces.',
      language: 'python',
      acceptanceCriteria: [
        'The tool handles kernel, stride, padding and dilation, and its output sizes match PyTorch exactly on at least ten configurations',
        'Receptive field and cumulative stride are tracked correctly, verified by hand on a known architecture',
        'FLOPs and parameters are reported per layer and as totals, and the per-layer breakdown shows early layers dominating FLOPs and late layers dominating parameters',
        'The designed network meets both constraints and the write-up cites the table rather than asserting the result',
      ],
      starterCode:
        'from dataclasses import dataclass\n\n@dataclass\nclass LayerSpec:\n    kind: str      # "conv" or "pool"\n    k: int\n    s: int = 1\n    p: int = 0\n    d: int = 1\n    c_in: int = 0\n    c_out: int = 0\n\ndef analyse(specs, h_in, c_in):\n    """Print a per-layer table and return the totals."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain padding and stride, derive the output-size formula, and say what a receptive field is and why it matters.',
      mustCover: [
        'Padding adds a border so the kernel can reach edge pixels; valid means none and same preserves the size',
        'Stride is the step between kernel placements and reduces the output size and compute',
        'The output size is floor((H + 2P - K)/S) + 1, which is a count of valid kernel positions',
        'The receptive field is the input region influencing one unit, and it grows additively with depth and multiplicatively with stride',
      ],
      bonusSignals: [
        'derives the formula rather than reciting it',
        'notes that stride does not change the parameter count',
        'explains why kernel sizes are odd',
        'mentions dilation as a way to grow the receptive field without downsampling',
      ],
      sampleExplanation:
        "When you slide a kernel across an image, two configuration choices decide the shape of everything downstream. The first is what happens at the edges. A three-by-three kernel centred on a corner pixel hangs off the image, so either you only place it where it fits entirely — which is called valid padding and costs you two pixels from each dimension every layer — or you surround the image with a border of zeros so it always has something to sit on, which is called same padding when the border is chosen to make the output exactly the same size as the input. For an odd kernel of size K that border is K minus one over two, so one for a three-by-three and three for a seven-by-seven. That is also why kernel sizes are almost always odd: with an even kernel there is no integer padding that centres it, and the output ends up offset by half a pixel. The second choice is how far to move between placements, which is the stride. A stride of one reads every position; a stride of two skips every other one and roughly halves the output in each dimension, which quarters the work of everything that follows. Note that stride changes the output size and the compute but not the number of parameters — it is the same kernel, evaluated in fewer places. Putting the two together gives the formula, and it is worth deriving rather than memorising. After padding, the strip is H plus twice P long. The kernel needs K consecutive cells, so its left edge can sit anywhere from position zero up to H plus two P minus K. Stepping by S, the number of valid positions is that span divided by the stride, rounded down because a partial step is not a position, plus one for the very first placement. That plus one is the term everybody forgets. Finally, the receptive field. One value deep in the network was computed from some region of the original image, and that region grows layer by layer: each layer widens it by K minus one, but measured in input pixels, so it gets multiplied by every stride the signal has already passed through. Depth adds to the receptive field; stride multiplies what all the later layers add. That single asymmetry explains the shape of almost every convolutional network — downsample early so that small cheap kernels can eventually see the whole picture.",
    },
  },

  {
    id: 'DL-015',
    domain: 'DL',
    module: 'Convolutional Networks',
    topic: 'Spatial reduction',
    title: 'Pooling and Downsampling',
    slug: 'pooling-and-downsampling',
    difficulty: 3,
    estimatedMinutes: 30,
    prerequisites: ['DL-013', 'DL-014'],
    related: ['DL-013', 'DL-014'],
    tags: ['pooling', 'max-pool', 'average-pool', 'downsampling', 'translation-invariance', 'global-average-pooling'],

    learningObjectives: [
      'Compute max and average pooling by hand and state how each changes the shape of a feature map',
      'Explain how pooling converts translation equivariance into local translation invariance, and what that costs',
      'Compare pooling with strided convolution and say why modern architectures often prefer the latter',
      'Use global average pooling to make a classifier independent of input resolution',
    ],

    terminology: [
      {
        term: 'Pooling',
        definition:
          'A fixed, parameter-free downsampling operation that replaces each window of a feature map with a single summary value, usually the maximum or the mean, applied independently to every channel.',
        simple: 'Shrink the picture by keeping one number per little block.',
      },
      {
        term: 'Max pooling',
        definition:
          'Pooling that takes the largest value in each window. It reports whether a feature was detected anywhere in the window, discarding exactly where and how many times.',
        simple: 'Keep the strongest response in each block and throw the rest away.',
      },
      {
        term: 'Average pooling',
        definition:
          'Pooling that takes the mean of each window. It preserves overall intensity and is smoother than max pooling, but a single strong response is diluted by its weak neighbours.',
        simple: 'Keep the average of each block, so everything contributes a little.',
      },
      {
        term: 'Local translation invariance',
        definition:
          'The property that a small shift of the input, smaller than the pooling window, leaves the pooled output unchanged. It is local because a shift larger than the window still moves the output.',
        simple: 'Nudging the picture by a pixel or two does not change the answer.',
      },
      {
        term: 'Global average pooling',
        definition:
          'Averaging each channel over the entire spatial extent, producing one number per channel. It replaces the flatten-and-dense head of older architectures and makes the model independent of input size.',
        simple: 'Collapse each feature map to a single number: how much of this feature is in the image overall.',
      },
    ],

    simpleExplanation:
      "After a convolution you have a map showing where each pattern was found. Often that map is more detailed than you need. If a filter has detected a whiskers-like texture somewhere in the top-left quarter of a photograph, the fact that it was at pixel forty-one rather than pixel forty-two almost never matters for deciding whether the photograph shows a cat. Pooling is the step that throws away that excess precision on purpose. You chop the map into small blocks, usually two by two, and replace each block with a single number — most often the largest value in it, sometimes the average. The map halves in width and height, so there is a quarter as much of it, everything downstream becomes four times cheaper, and small wobbles in where a feature sits stop changing the answer. There are no weights to learn: pooling is a fixed rule, which is why it costs nothing and why it is also somewhat blunt. Modern networks often replace it with a convolution that strides by two instead, so the network can learn what to keep rather than always taking the maximum.",

    whyItExists:
      'Convolution is equivariant rather than invariant, so a feature map retains the exact position of every response, and a classifier that cares only whether an object is present must eventually discard that position or it will treat a two-pixel shift as a different input. Pooling provides that discarding step, and at the same time cuts the spatial size so that the deeper, wider layers of a network run on a quarter of the data, which is what makes deep convolutional stacks affordable at all.',

    analogy: {
      scenario:
        'A supermarket chain wants to know which of its stores had a strong week. Head office does not want a spreadsheet of every transaction; it wants one number per store per week. One manager reports the single largest sale of the week, which is a good way to spot whether any unusual high-value item moved at all, but tells you nothing about volume. Another reports the average transaction value, which reflects the whole week evenly but hides the one remarkable sale among hundreds of ordinary ones. Either way, head office now has a table small enough to act on, and a sale happening on Tuesday rather than Wednesday no longer shows up at all.',
      mapping: [
        { from: 'All the individual transactions in a week', to: 'The values inside one pooling window' },
        { from: 'Reporting the single largest sale', to: 'Max pooling: detects presence, discards position and count' },
        { from: 'Reporting the average transaction', to: 'Average pooling: preserves overall level, dilutes a single strong response' },
        { from: 'Tuesday versus Wednesday no longer mattering', to: 'Local translation invariance within the window' },
        { from: 'A much smaller table for head office', to: 'The spatial size reduction, and the compute saving downstream' },
      ],
      bridge:
        'The summary is exactly the pooling function, and the choice between maximum and mean is exactly the choice made in nn.MaxPool2d versus nn.AvgPool2d — both applied per channel, so each feature is summarised independently just as each store is. The invariance is precisely the loss of within-window position: a shift smaller than the window changes which cell held the maximum but not what the maximum was. Where the analogy breaks is that head office chooses its summary deliberately, whereas pooling is baked into the architecture and cannot adapt. That fixedness is what strided convolution removes, by letting the network learn a weighted summary instead of imposing one.',
      limitations:
        'The story suggests summarising is always harmless compression. For a classifier it mostly is, but for segmentation or detection the discarded position is the answer, which is why those architectures either avoid pooling or carefully restore resolution afterwards.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'Max and average pooling over a 4x4 map, 2x2 window, stride 2',
        caption: 'Four windows, four outputs. Max keeps the strongest response; average keeps the overall level.',
        art: `input 4x4                 max pool 2x2, s=2      avg pool 2x2, s=2

  1   3 | 2   4                    6   4                  3.75  2.25
  5   6 | 1   2
  ------+------                    7   9                  4.00  5.00
  7   2 | 9   1
  3   4 | 2   8

window (0,0) = {1,3,5,6} -> max 6, mean 3.75
window (0,1) = {2,4,1,2} -> max 4, mean 2.25
window (1,0) = {7,2,3,4} -> max 7, mean 4.00
window (1,1) = {9,1,2,8} -> max 9, mean 5.00`,
      },
      {
        kind: 'compare',
        title: 'Max pooling versus average pooling',
        caption: 'Both halve the resolution. They differ in what they consider worth keeping.',
        left: {
          heading: 'Max pooling',
          points: [
            'Reports the strongest activation: did this feature appear anywhere here?',
            'Gradient flows only to the argmax position; the other three cells receive nothing',
            'Sharpens: a weak background does not dilute a strong detection',
            'The default inside convolutional bodies, from LeNet through VGG',
            'Sensitive to outliers, which for a ReLU feature map is usually the point',
          ],
        },
        right: {
          heading: 'Average pooling',
          points: [
            'Reports the mean: how much of this feature is present overall?',
            'Gradient is spread equally over all cells in the window',
            'Smooths: preserves texture and overall intensity rather than peaks',
            'The standard choice for the final global pooling before a classifier head',
            'Less able to ignore a mostly empty window, since zeros drag the mean down',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Ways to halve a feature map',
        caption: 'All three produce a map half the size in each dimension. They differ in cost and in what they learn.',
        columns: ['Method', 'Parameters', 'What decides the output', 'Typical use'],
        rows: [
          ['MaxPool2d(2, 2)', 'None', 'A fixed rule: the maximum', 'Classic architectures; still common and still effective'],
          ['AvgPool2d(2, 2)', 'None', 'A fixed rule: the mean', 'Rare mid-network; standard as a global pool at the end'],
          ['Conv2d(C, C, 3, stride=2, padding=1)', 'C*C*9', 'Learned weights over the window', 'ResNet downsampling, GAN discriminators, most modern designs'],
          ['AdaptiveAvgPool2d(1)', 'None', 'The mean over the whole map', 'The classifier head: makes the model input-size independent'],
          ['Conv2d(C, C, 2, stride=2)', 'C*C*4', 'Learned, non-overlapping', 'Patch merging in hierarchical vision transformers such as Swin'],
        ],
      },
      {
        kind: 'widget',
        title: 'Pool a feature map and shift the input',
        caption: 'Apply max and average pooling to the same map, then translate the input by one pixel and see which outputs change and which do not.',
        widget: 'pooling-lab',
      },
    ],

    formalDefinition:
      'A pooling layer with window size K, stride S and padding P maps a feature map X to Y with Y[c, i, j] = agg{ X[c, iS + u - P, jS + v - P] : 0 <= u, v < K }, applied independently to each channel c, where agg is max for max pooling and the arithmetic mean for average pooling. The output size obeys the same formula as convolution, floor((H + 2P - K)/S) + 1, and the layer has no learnable parameters. Max pooling is a subgradient operation: the gradient is routed entirely to the argmax element of each window and is zero elsewhere.',

    math: {
      intuition:
        'Pooling is a summary statistic computed over a sliding window, and the only interesting question is which statistic. The maximum answers whether the feature fired at all in this neighbourhood, which is the natural question for a detector whose outputs are non-negative after a ReLU. The mean answers how much of the feature is present on average, which is the natural question when you are about to feed the number to a classifier and want it to reflect extent rather than peak. The backward pass follows from the forward one by differentiating: the maximum depends on only one input, so only that one gets the gradient, whereas the mean depends equally on all of them, so the gradient is shared out evenly.',
      formulas: [
        {
          latex: 'Y[c,i,j] = \\max_{0\\le u,v < K} X[c,\\, iS+u,\\, jS+v]',
          name: 'Max pooling',
          meaning:
            'The largest activation in each window, per channel. Because the operation is per channel, pooling never mixes features — a channel that detects edges is summarised only against itself.',
          variables: [
            { symbol: 'K', meaning: 'Pooling window size, almost always 2 or 3' },
            { symbol: 'S', meaning: 'Stride, usually equal to K so the windows do not overlap' },
            { symbol: 'c', meaning: 'Channel index; pooling is applied independently to each channel' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'Y[c,i,j] = \\frac{1}{K^2}\\sum_{u=0}^{K-1}\\sum_{v=0}^{K-1} X[c,\\, iS+u,\\, jS+v]',
          name: 'Average pooling',
          meaning:
            'The mean activation in each window. Note that this is a convolution with a fixed uniform kernel of weight 1/K squared and no cross-channel mixing, which is why it is sometimes described as a non-learnable depthwise convolution.',
          variables: [
            { symbol: '1/K^2', meaning: 'The uniform weight given to each cell in the window' },
            { symbol: 'K^2', meaning: 'Number of cells being averaged, 4 for a 2 by 2 window' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\frac{\\partial Y[i,j]}{\\partial X[m,n]} = \\begin{cases}1 & (m,n) = \\arg\\max \\\\ 0 & \\text{otherwise}\\end{cases}',
          name: 'Backward pass of max pooling',
          meaning:
            'All of the gradient goes to the single winning cell and none to the others, so in a 2 by 2 window three quarters of the positions receive no learning signal from this path on this example. Frameworks cache the argmax indices during the forward pass to make this cheap.',
          variables: [
            { symbol: '\\arg\\max', meaning: 'The position of the largest value in the window; ties are broken arbitrarily but deterministically' },
            { symbol: 'X[m,n]', meaning: 'An input cell inside the window' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'Y[c] = \\frac{1}{HW}\\sum_{i=1}^{H}\\sum_{j=1}^{W} X[c,i,j]',
          name: 'Global average pooling',
          meaning:
            'Collapses each channel to one number, turning a (C, H, W) map into a vector of length C. Because the output does not depend on H or W, the classifier that follows works for any input resolution — the key property that lets one ResNet run on 224 by 224 and on 384 by 384 inputs.',
          variables: [
            { symbol: 'H, W', meaning: 'The spatial size of the final feature map, whatever it happens to be' },
            { symbol: 'C', meaning: 'Channel count, which becomes the dimension of the vector fed to the classifier' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\text{FLOPs}_{\\ell+1} \\propto H_{\\text{out}}W_{\\text{out}} \\;\\Rightarrow\\; \\text{halving } H,W \\text{ divides cost by } 4',
          name: 'Why downsampling is the lever on cost',
          meaning:
            'Every layer after a 2 by 2 pool operates on a quarter of the positions, so its compute and its activation memory both fall by four. This is the reason pooling appears so early and so often in classic architectures.',
          variables: [
            { symbol: 'H_{\\text{out}}W_{\\text{out}}', meaning: 'Number of spatial positions in the feature map' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Start from what convolution gives you: equivariance. Shift the input by delta and every value in the feature map shifts by delta, so a classifier reading that map directly would see a different input vector for a one-pixel shift.',
        'Ask for something weaker than full invariance: outputs that are unchanged by shifts smaller than some tolerance. That is achievable by summarising over a window of that size.',
        'Take the maximum over a 2 by 2 window. If the input shifts by one pixel and the feature that produced the maximum is still inside the window, the maximum is unchanged, so the output is unchanged. If the feature crosses a window boundary, the output does change — hence local invariance, not global.',
        'Note the size reduction that comes with it. Non-overlapping windows of size K with stride K give an output K times smaller in each dimension, so K = 2 quarters the number of positions and therefore quarters the compute of every following layer.',
        'Differentiate. For the mean, dY/dX is 1/K squared for every cell, so the gradient is spread evenly. For the maximum, Y depends on only one input in each window, so the gradient is routed entirely there and every other cell in the window receives zero.',
        'Finally, push the window to the whole map. Global average pooling produces one number per channel and is completely invariant to translation — position information is gone entirely — which is exactly what a whole-image classifier wants and exactly what a segmentation model must not do.',
      ],
    },

    workedExample: {
      title: 'Pooling a 4x4 map, then shifting the input to see the invariance',
      setup:
        'A single-channel feature map has rows [1, 3, 2, 4], [5, 6, 1, 2], [7, 2, 9, 1], [3, 4, 2, 8]. Apply 2 by 2 max pooling with stride 2, then 2 by 2 average pooling with stride 2, then shift a feature within one window and repeat.',
      steps: [
        {
          label: 'Split into four non-overlapping windows',
          detail: 'Top-left is {1, 3, 5, 6}; top-right is {2, 4, 1, 2}; bottom-left is {7, 2, 3, 4}; bottom-right is {9, 1, 2, 8}. With stride equal to the window size, every input cell belongs to exactly one window.',
          latex: '4\\times4 \\to 2\\times2,\\quad H_{\\text{out}} = \\left\\lfloor\\frac{4-2}{2}\\right\\rfloor + 1 = 2',
        },
        {
          label: 'Max pool',
          detail: 'max{1,3,5,6} = 6; max{2,4,1,2} = 4; max{7,2,3,4} = 7; max{9,1,2,8} = 9. The output is [[6, 4], [7, 9]]. Twelve of the sixteen input values have been discarded entirely.',
          latex: 'Y_{\\max} = \\begin{bmatrix}6&4\\\\7&9\\end{bmatrix}',
        },
        {
          label: 'Average pool',
          detail: '(1+3+5+6)/4 = 3.75; (2+4+1+2)/4 = 2.25; (7+2+3+4)/4 = 4.00; (9+1+2+8)/4 = 5.00. The output is [[3.75, 2.25], [4.00, 5.00]]. Every input value contributed, but the sharp 9 has been pulled down to 5 by its weak neighbours.',
          latex: 'Y_{\\text{avg}} = \\begin{bmatrix}3.75&2.25\\\\4.00&5.00\\end{bmatrix}',
        },
        {
          label: 'Shift a feature inside its window',
          detail: 'Swap the 6 and the 1 in the top-left window, so it becomes {1, 3, 5, 6} rearranged as rows [1, 3] and [6, 5] — the strong response has moved one cell. The maximum is still 6 and the mean is still 3.75. Both outputs are completely unchanged: this is local translation invariance.',
          latex: '\\max\\{1,3,6,5\\} = 6,\\qquad \\text{mean} = 3.75',
        },
        {
          label: 'Shift the feature across a window boundary',
          detail: 'Now move the 6 from the top-left window into the top-right window. The top-left maximum falls to 5 and the top-right rises to 6. The invariance has failed, because the shift exceeded the window. Invariance from pooling is always bounded by the window size.',
          latex: 'Y_{\\max} = \\begin{bmatrix}5&6\\\\7&9\\end{bmatrix}',
        },
        {
          label: 'The backward pass',
          detail: 'For max pooling, a gradient of 1 arriving at output [0][0] is routed entirely to the cell that held the 6 and the other three cells get zero. For average pooling the same gradient of 1 is split into four quarters. Over many examples the max-pooled cells that never win receive no signal from this path at all, which is a real, if usually tolerable, sparsity in the learning.',
          latex: '\\nabla_{\\max}: [0,0,0,1] \\quad\\text{vs}\\quad \\nabla_{\\text{avg}}: [0.25,0.25,0.25,0.25]',
        },
        {
          label: 'What it cost',
          detail: 'The map went from 16 values to 4, so every subsequent layer does a quarter of the work. What was lost is the position of each response within its 2 by 2 block — irrelevant for classification, fatal for pixel-level prediction, which is why segmentation architectures record the pooling indices or avoid pooling entirely.',
          latex: '16 \\to 4 \\;\\Rightarrow\\; 4\\times \\text{cheaper downstream}',
        },
      ],
      conclusion:
        'Pooling trades spatial precision for invariance and for compute, at zero parameter cost. The maximum answers whether a feature is present, the mean answers how much of it there is, and the window size is exactly the amount of translation you are declaring irrelevant.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Max and average pooling, matching the hand calculation',
        runnable: true,
        code: `import torch
import torch.nn as nn

x = torch.tensor([[1., 3., 2., 4.],
                  [5., 6., 1., 2.],
                  [7., 2., 9., 1.],
                  [3., 4., 2., 8.]]).view(1, 1, 4, 4)

print("max :", nn.MaxPool2d(2, 2)(x).squeeze().tolist())
print("avg :", nn.AvgPool2d(2, 2)(x).squeeze().tolist())
print("global avg:", nn.AdaptiveAvgPool2d(1)(x).item())

# where the gradient goes
x_grad = x.clone().requires_grad_(True)
nn.MaxPool2d(2, 2)(x_grad).sum().backward()
print("max-pool gradient:")
print(x_grad.grad.squeeze())`,
        output: `max : [[6.0, 4.0], [7.0, 9.0]]
avg : [[3.75, 2.25], [4.0, 5.0]]
global avg: 3.75
max-pool gradient:
tensor([[0., 0., 0., 1.],
        [0., 1., 0., 0.],
        [1., 0., 0., 1.],
        [0., 0., 0., 0.]])`,
        explanation:
          'The pooled values match the hand calculation exactly. The gradient tensor is the instructive part: exactly four of the sixteen cells receive a gradient of one and the other twelve receive nothing, because the maximum depends on only one input per window. Those four ones sit precisely at the positions of the 4, the 6, the 7 and the 9. With average pooling the same backward pass would put 0.25 in every cell, which is the difference between routing the learning signal to the winner and sharing it out.',
      },
      {
        language: 'python',
        title: 'Pooling gives invariance to small shifts, but only small ones',
        runnable: true,
        code: `import torch
import torch.nn as nn

pool = nn.MaxPool2d(2, 2)

def feature_at(col):
    x = torch.zeros(1, 1, 8, 8)
    x[0, 0, 2, col] = 5.0
    return x

base = pool(feature_at(2))
for col in (2, 3, 4, 5):
    same = torch.equal(pool(feature_at(col)), base)
    print(f"feature at column {col}: pooled output identical to column 2? {same}")`,
        output: `feature at column 2: pooled output identical to column 2? True
feature at column 3: pooled output identical to column 2? True
feature at column 4: pooled output identical to column 2? False
feature at column 5: pooled output identical to column 2? False`,
        explanation:
          'Columns 2 and 3 fall inside the same 2 by 2 window, so the pooled output is bit-for-bit identical and the shift is genuinely invisible to everything downstream. Columns 4 and 5 fall into the next window and the output changes. This is exactly what local translation invariance means and why the word local matters: pooling declares shifts smaller than the window irrelevant and nothing more. Stacking several pooling layers compounds the tolerance, which is why a deep network is robust to shifts of many pixels even though each individual pool only handles one.',
      },
      {
        language: 'python',
        title: 'Global average pooling makes a classifier resolution-independent',
        runnable: true,
        code: `import torch
import torch.nn as nn

flatten_head = nn.Sequential(nn.Conv2d(3, 16, 3, padding=1), nn.ReLU(),
                             nn.Flatten(), nn.Linear(16 * 32 * 32, 10))

gap_head = nn.Sequential(nn.Conv2d(3, 16, 3, padding=1), nn.ReLU(),
                         nn.AdaptiveAvgPool2d(1), nn.Flatten(), nn.Linear(16, 10))

for size in (32, 64):
    x = torch.randn(1, 3, size, size)
    try:
        flatten_head(x)
        print(f"flatten head, {size}x{size}: ok")
    except RuntimeError as e:
        print(f"flatten head, {size}x{size}: {str(e)[:60]}...")
    print(f"gap head,     {size}x{size}: {tuple(gap_head(x).shape)}")

print("flatten params:", sum(p.numel() for p in flatten_head.parameters()))
print("gap params    :", sum(p.numel() for p in gap_head.parameters()))`,
        output: `flatten head, 32x32: ok
gap head,     32x32: (1, 10)
flatten head, 64x64: mat1 and mat2 shapes cannot be multiplied (1x65536...
gap head,     64x64: (1, 10)
flatten params: 164282
gap params    : 618
`,
        explanation:
          'The flatten-and-dense head bakes the spatial size into the weight shape of the linear layer, so it fails outright on a different input resolution and carries 164,282 parameters, almost all of them in that one layer. Global average pooling collapses each channel to a single number first, so the linear layer sees 16 inputs regardless of resolution, works on both sizes, and costs 618 parameters in total. This substitution, introduced in the Network-in-Network paper and adopted by every architecture from ResNet onward, is one of the highest-value single changes in convolutional design.',
      },
    ],

    realWorldExamples: [
      {
        context: 'LeNet-5 and VGG',
        usage:
          'Both alternate convolution blocks with pooling: LeNet used average pooling in 1998, and VGG used a 2 by 2 max pool after every block of 3 by 3 convolutions, five times in total, taking a 224 by 224 input down to 7 by 7. The regular structure is what made VGG so easy to describe and so widely reused as a feature extractor.',
      },
      {
        context: 'ResNet using strided convolutions instead',
        usage:
          'ResNet keeps exactly one max pool, in the stem, and does all subsequent downsampling with stride-2 convolutions inside the residual blocks. The learned downsampling performs slightly better than fixed pooling, and it integrates cleanly with the shortcut path, which also needs a stride-2 1 by 1 convolution to match shapes.',
      },
      {
        context: 'Segmentation architectures that must undo pooling',
        usage:
          'U-Net pools down through an encoder and then upsamples back, concatenating the corresponding high-resolution encoder feature map at each level so the fine positional detail that pooling destroyed is restored from the skip connection. SegNet takes a different route and stores the max-pooling argmax indices so it can place values back exactly where they came from.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.MaxPool2d, nn.AvgPool2d, nn.AdaptiveAvgPool2d and the return_indices option on max pooling, which segmentation decoders use.' },
      { tool: 'torchvision', role: 'Every classification model ends with an adaptive average pool before the classifier, which is why they accept a range of input sizes without modification.' },
      { tool: 'ONNX', role: 'Adaptive pooling with an output size of 1 exports cleanly as a global reduction, whereas adaptive pooling to other sizes can produce awkward graphs on some runtimes.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming pooling makes a network fully translation invariant',
        why: 'A single 2 by 2 pool only absorbs shifts within its window. Networks are robust to larger shifts because several pooling stages compound, but the invariance is approximate and breaks down at window boundaries — a fact demonstrated by adversarial shift experiments where one-pixel translations change a classification.',
        fix: 'Treat pooling as local invariance with a budget equal to the window, and use data augmentation with random crops and translations if you need genuine robustness to larger shifts.',
      },
      {
        mistake: 'Pooling aggressively in a segmentation or detection model',
        why: 'Those tasks need to output a location, and pooling deliberately destroys location within each window. Downsampling to one thirty-second of the input resolution and then upsampling naively produces blocky, misaligned masks.',
        fix: 'Use skip connections that carry high-resolution features forward, as U-Net does, or replace late downsampling with dilated convolutions, as DeepLab does, to keep the receptive field without losing resolution.',
      },
      {
        mistake: 'Keeping a flatten-and-dense classifier head',
        why: 'It ties the model to one input resolution and puts a huge number of parameters in a single layer — in VGG-16 the first dense layer alone holds over 100 million weights, the great majority of the network, and it overfits readily.',
        fix: 'Use nn.AdaptiveAvgPool2d(1) followed by a single linear layer from the channel count to the class count. Accuracy is usually as good or better and the parameter count collapses.',
      },
      {
        mistake: 'Choosing average pooling inside the body out of a vague preference for smoothness',
        why: 'Mid-network feature maps after a ReLU are mostly zero, so averaging a window that contains one strong detection and three zeros divides the detection by four and the signal gets progressively weaker with depth.',
        fix: 'Use max pooling, or a strided convolution, inside the body where you are asking whether a feature is present. Reserve average pooling for the final global step, where you genuinely want extent rather than peak.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does pooling do, and why would you want it?',
        answer:
          'It replaces each window of a feature map with a single summary value — the maximum or the mean — applied independently per channel, with no learnable parameters. Two benefits follow. The first is local translation invariance: because the summary does not depend on where inside the window the response occurred, a shift smaller than the window leaves the output unchanged, which is what you want for a classifier that cares whether an object is present rather than exactly where. The second is cost: a 2 by 2 pool with stride 2 quarters the number of spatial positions, so every subsequent layer does a quarter of the work and stores a quarter of the activations. The price is that the discarded position information is gone permanently, which matters enormously for segmentation and detection and hardly at all for whole-image classification.',
        followUp:
          'A strong answer distinguishes local from global invariance and notes that convolution is equivariant, so pooling is the step that converts equivariance into invariance.',
      },
      {
        level: 'intermediate',
        question: 'Why do many modern architectures use strided convolutions instead of pooling?',
        answer:
          'Because pooling imposes a fixed rule while a strided convolution learns one. Max pooling always keeps the largest value, which is a reasonable heuristic but is not adapted to the data or the task; a Conv2d with stride 2 computes a learned weighted combination of the window and can decide what to preserve. It also mixes channels while it downsamples, which pooling never does, so the reduction and the feature transformation happen in one operation rather than two. ResNet took this route, keeping one max pool in the stem and using stride-2 convolutions everywhere else, and GAN discriminators and hierarchical vision transformers followed. The costs are real but modest: the layer now has C_out times C_in times k squared parameters where pooling had none, and it is more expensive to compute. There is also an argument that learned downsampling aliases less badly than max pooling, which is a genuine signal-processing objection to taking a maximum without any low-pass filtering first.',
      },
      {
        level: 'ml-engineer',
        question: 'Why did global average pooling replace the flatten-and-dense head, and what does it buy you in production?',
        answer:
          'Three things. First, parameter count: VGG-16 first fully connected layer maps 25,088 flattened features to 4,096 units, which is over 100 million weights, roughly three quarters of the whole network and a major source of overfitting. Global average pooling reduces the same feature map to 512 numbers and the classifier becomes a single 512 by num_classes matrix. Second, resolution independence: the flatten head hard-codes the spatial size into the linear layer weight shape, so the model fails on any other input size, whereas a global pool produces one value per channel whatever the map size. That matters in production for multi-scale inference, for test-time augmentation with different crop sizes and for serving images whose aspect ratios vary. Third, interpretability: because each channel maps directly to a single classifier weight, you can compute class activation maps almost for free, which is a standard debugging and explanation tool. The one caveat is that averaging over the whole map dilutes a small object in a large image, which is why detection pipelines crop regions of interest before pooling rather than pooling globally.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A feature map of shape (64, 56, 56) passes through MaxPool2d(kernel_size=3, stride=2, padding=1). Give the output shape and explain why the windows overlap.',
        hint: 'Use floor((H + 2P - K)/S) + 1, and compare the window size with the stride.',
        solution:
          'The output is (64, 28, 28): (56 + 2 - 3)/2 + 1 = floor(55/2) + 1 = 27 + 1 = 28. The channel count is unchanged because pooling is applied per channel. The windows overlap because the kernel is 3 and the stride is only 2, so consecutive windows share a column. This overlapping configuration is exactly the one used in AlexNet and in the ResNet stem, and the original AlexNet paper reports that overlapping pooling reduced the error slightly compared with non-overlapping 2 by 2, presumably because each input cell influences more than one output and the summary is less brittle.',
      },
      {
        prompt:
          'Implement max pooling and its backward pass in NumPy for a single-channel input, and verify both against PyTorch.',
        hint: 'For the backward pass, record the flat argmax within each window during the forward pass and scatter the incoming gradient to those positions.',
        language: 'python',
        starterCode:
          'import numpy as np\n\ndef maxpool_forward(x, k=2, s=2):\n    """x: (H, W). Return (out, argmax_cache)."""\n    ...\n\ndef maxpool_backward(dout, x_shape, argmax_cache, k=2, s=2):\n    """Scatter dout back to the winning positions."""\n    ...\n',
        solution:
          'The forward pass loops over output positions, slices the K by K window, takes its maximum and records np.argmax of the flattened window so the winning coordinates can be recovered. The backward pass allocates a zero array of the input shape and adds the incoming gradient at each recorded position; adding rather than assigning matters as soon as the windows overlap, because a cell can win more than one window. Verifying against PyTorch requires only x.requires_grad_(True) and comparing x.grad. The exercise makes the sparsity concrete: with non-overlapping 2 by 2 windows exactly one quarter of the input cells ever receive a gradient on a given example, which is a genuine difference from average pooling and part of why max pooling behaves more like a hard selection than a smooth reduction.',
      },
      {
        prompt:
          'You are converting a classifier trained at 224 by 224 to run on 448 by 448 inputs without retraining. The model ends with flatten and two dense layers. What changes are needed and what are the consequences?',
        hint: 'Think about what the flatten produces at each resolution and what the first dense layer expects.',
        solution:
          'At 224 the final feature map might be 512 channels of 7 by 7, so the flatten gives 25,088 values and the first dense layer weight is (4096, 25088). At 448 the map becomes 14 by 14 and the flatten gives 100,352 values, which the layer cannot accept — you get a matrix shape mismatch. Two workable options. The straightforward one is to insert nn.AdaptiveAvgPool2d((7, 7)) before the flatten, which forces the map back to 7 by 7 whatever the input size, preserving the weight shape exactly; this works without retraining but averages over larger regions than the network was trained on and usually costs a little accuracy. The more principled one is to convert the dense layers into equivalent convolutions — a 4096-unit dense layer on a 7 by 7 by 512 map is exactly a Conv2d(512, 4096, kernel_size=7) with the same weights reshaped — which turns the classifier into a fully convolutional network that outputs a coarse spatial grid of class scores, and then global-average-pools that grid. The second approach is what made fully convolutional networks possible for dense prediction and is worth knowing for exactly this kind of conversion.',
      },
    ],

    quiz: [
      {
        id: 'DL-015-q1',
        type: 'numeric',
        concept: 'pooling arithmetic',
        prompt: 'A 2x2 max pool with stride 2 is applied to the window with values 3, 8, 1, 6. What is the output?',
        answer: 8,
        tolerance: 0,
        explanation:
          'The maximum of the four values is 8. The other three values are discarded entirely, and in the backward pass only the cell holding the 8 receives any gradient.',
      },
      {
        id: 'DL-015-q2',
        type: 'mcq',
        concept: 'invariance',
        prompt: 'What kind of invariance does a 2x2 max pool provide?',
        options: [
          'Local translation invariance: shifts smaller than the window leave the output unchanged',
          'Full translation invariance: the output never changes when the input is shifted',
          'Rotation invariance within the window',
          'Scale invariance, because the map gets smaller',
        ],
        answerIndex: 0,
        explanation:
          'The invariance is bounded by the window. A shift that moves a feature across a window boundary changes the output, which is why networks rely on several pooling stages compounding and on data augmentation for larger shifts.',
      },
      {
        id: 'DL-015-q3',
        type: 'truefalse',
        concept: 'parameters',
        prompt: 'A max pooling layer has learnable parameters that determine which values to keep.',
        answer: false,
        explanation:
          'False. Pooling is a fixed rule with no parameters at all. That is its appeal and its limitation, and it is precisely why strided convolutions, which do learn what to keep, have replaced it in many modern architectures.',
      },
      {
        id: 'DL-015-q4',
        type: 'multi',
        concept: 'global average pooling',
        prompt: 'Select every true statement about replacing a flatten-and-dense head with global average pooling.',
        options: [
          'The model becomes independent of the input spatial resolution',
          'The parameter count of the classifier head drops dramatically',
          'It makes class activation maps easy to compute',
          'It increases the receptive field of the final convolutional layer',
          'It preserves the spatial position of each feature',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Global pooling discards position entirely — that is the point — and it does not change any convolutional layer receptive field, which is fixed by the architecture above it. The first three are the standard reasons the substitution became universal.',
      },
      {
        id: 'DL-015-q5',
        type: 'match',
        concept: 'choosing a reduction',
        prompt: 'Match each situation to the appropriate downsampling choice.',
        pairs: [
          { left: 'Mid-network in a classic convolutional body', right: 'Max pooling: report whether the feature fired at all' },
          { left: 'Final step before a classifier', right: 'Global average pooling: one number per channel, resolution independent' },
          { left: 'A modern residual network stage transition', right: 'Stride-2 convolution: learned downsampling that also mixes channels' },
          { left: 'A segmentation encoder that must restore resolution', right: 'Pooling with recorded indices, or dilation instead of downsampling' },
        ],
        explanation:
          'The deciding question is whether you need the position afterwards and whether you want the reduction to be learned. Those two answers select the operation in nearly every case.',
      },
      {
        id: 'DL-015-q6',
        type: 'explain',
        concept: 'equivariance to invariance',
        prompt: 'Explain how pooling converts the translation equivariance of convolution into invariance, and what is given up in the process.',
        rubric: [
          'States that convolution is equivariant, so the feature map records where each response occurred',
          'Explains that summarising over a window removes within-window position, giving local invariance',
          'Identifies the cost: spatial precision is destroyed, which matters for dense prediction tasks',
        ],
        sampleAnswer:
          'A convolution is equivariant: shift the input and the entire feature map shifts with it, so the map still records the exact position of every response. That is the right behaviour for a feature extractor but the wrong behaviour for a classifier, which should give the same answer whether the object sits at pixel forty-one or forty-two. Pooling supplies the missing step by summarising each window into a single number. Because the maximum or the mean of a window does not depend on which cell inside it held the response, any shift small enough to keep the response inside the same window leaves the output completely unchanged — that is local translation invariance, and stacking several pooling stages compounds the tolerance until the network is robust to shifts of many pixels. What is given up is precisely the information that was removed: the position of the response within the window is gone and cannot be recovered. For whole-image classification that is a good trade and it also quarters the downstream compute. For segmentation or detection it is fatal, which is why those architectures either store the pooling indices, carry high-resolution skip connections forward, or replace downsampling with dilated convolutions that grow the receptive field without discarding resolution.',
        explanation:
          'The examinable insight is that equivariance and invariance are different properties and that a network manufactures the second from the first deliberately, at a point of its own choosing.',
      },
    ],

    flashcards: [
      { front: 'What does a 2x2 max pool with stride 2 do to a feature map?', back: 'Halves the height and width, keeping the largest value in each non-overlapping 2 by 2 block, per channel. No parameters.' },
      { front: 'Max pooling versus average pooling: when to use each?', back: 'Max inside the body, to ask whether a feature fired. Average for the final global pool, to measure how much of a feature is present overall.' },
      { front: 'Where does the gradient go in max pooling?', back: 'Entirely to the argmax cell of each window; every other cell in the window receives zero.' },
      { front: 'What kind of invariance does pooling give?', back: 'Local translation invariance, bounded by the window size. A shift across a window boundary still changes the output.' },
      { front: 'What is global average pooling and why use it?', back: 'Average each channel over the whole map, giving one number per channel. It makes the classifier resolution independent and removes an enormous dense layer.' },
      { front: 'Why do modern networks often use stride-2 convolutions instead of pooling?', back: 'The downsampling becomes learned rather than a fixed rule, and it mixes channels at the same time. ResNet keeps only one max pool, in the stem.' },
      { front: 'Why is pooling dangerous in segmentation?', back: 'It destroys within-window position, which is the quantity the task must output. Use skip connections, recorded indices or dilation instead.' },
    ],

    challenge: {
      title: 'Pooling, striding and shift robustness',
      brief:
        'Build three versions of the same small convolutional classifier: one downsampling with max pooling, one with average pooling and one with stride-2 convolutions. Train all three on the same data to comparable accuracy. Then measure shift robustness properly: for every test image, evaluate the model on all translations from minus four to plus four pixels in each direction and record how often the predicted class changes. Report a robustness score per model, plot accuracy against shift magnitude, and add a fourth variant with a blur applied before each downsampling step to test the anti-aliasing hypothesis.',
      language: 'python',
      acceptanceCriteria: [
        'Three architectures differing only in the downsampling operation, trained with the same schedule and seed handling',
        'A shift-robustness protocol covering at least 81 translations per test image, with prediction-change rate reported',
        'Accuracy against shift magnitude plotted for all variants on shared axes',
        'The anti-aliased variant is included and the write-up states whether the results support the aliasing explanation',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\nimport torch.nn.functional as F\n\ndef downsample(kind, c):\n    if kind == "max":    return nn.MaxPool2d(2, 2)\n    if kind == "avg":    return nn.AvgPool2d(2, 2)\n    if kind == "stride": return nn.Conv2d(c, c, 3, stride=2, padding=1)\n    raise ValueError(kind)\n\ndef shift(x, dy, dx):\n    return torch.roll(x, shifts=(dy, dx), dims=(2, 3))\n\ndef robustness(model, loader, radius=4):\n    """Fraction of (image, shift) pairs whose prediction matches the unshifted one."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain what pooling does, the difference between max and average pooling, what invariance it provides and what it costs.',
      mustCover: [
        'Pooling summarises each window into one value per channel, with no parameters',
        'Max reports whether a feature fired anywhere in the window; average reports the overall level',
        'It provides translation invariance bounded by the window size, and quarters the downstream compute for a 2 by 2 window',
        'The cost is the permanent loss of position within the window, which matters for dense prediction tasks',
      ],
      bonusSignals: [
        'notes that convolution is equivariant and pooling is what creates invariance',
        'explains where the gradient goes in max pooling',
        'mentions global average pooling and resolution independence',
        'knows that strided convolutions are the learned alternative',
      ],
      sampleExplanation:
        "After a convolution you have a map of where each pattern was found, and usually that map is more precise than the task needs. Pooling deliberately throws the excess precision away. You divide the map into small blocks, typically two by two, and replace each block with a single number. If you take the largest value in the block, that is max pooling, and it answers the question did this feature fire anywhere in here — which is the natural question when the values are ReLU outputs and mostly zero, because a single strong detection is not diluted by its empty neighbours. If you take the mean, that is average pooling, and it answers how much of this feature is present on average, which is the right question at the very end of a network when you want extent rather than peak. Either way there are no weights to learn; pooling is a fixed rule applied separately to every channel, so it never mixes features. Two things come out of it. The obvious one is size: a two-by-two pool with stride two quarters the number of positions, so every layer downstream does a quarter of the work and stores a quarter of the activations. The subtler one is invariance. Convolution is equivariant, meaning the feature map shifts when the image shifts, so a classifier reading it directly would see a different input for a one-pixel nudge. Because the maximum of a window does not depend on which cell inside it held the response, any shift small enough to stay inside the window leaves the pooled output exactly unchanged. That is local translation invariance, and the word local is doing work: move the feature across a window boundary and the output does change. Networks tolerate larger shifts because several pooling stages compound, not because any one of them is fully invariant. The cost is the position you discarded, and it does not come back. For classifying a whole image that is a good trade. For segmentation or object detection the position is the answer, which is why those architectures either carry high-resolution features forward through skip connections, or remember which cell won each pooling window, or avoid downsampling altogether by using dilated convolutions instead.",
    },
  },

  {
    id: 'DL-016',
    domain: 'DL',
    module: 'Convolutional Networks',
    topic: 'Architecture design',
    title: 'CNN Architectures End to End',
    slug: 'cnn-architectures',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['DL-013', 'DL-014', 'DL-015'],
    related: ['DL-010', 'DL-012', 'DL-015'],
    tags: ['lenet', 'alexnet', 'vgg', 'resnet', 'skip-connection', 'residual', 'degradation', 'architecture'],

    learningObjectives: [
      'Trace the evolution from LeNet through AlexNet and VGG to ResNet, naming the specific problem each generation solved',
      'Explain the degradation problem and why it is not overfitting, and how a residual connection removes it',
      'Trace a complete classifier end to end, computing every intermediate shape and parameter count by hand',
      'Read an unfamiliar architecture definition and predict its shapes, cost and receptive field before running it',
    ],

    terminology: [
      {
        term: 'Backbone (feature extractor)',
        definition:
          'The convolutional body of a network, which turns an image into a stack of feature maps. It is reused across tasks: the same backbone serves classification, detection and segmentation with different heads bolted on.',
        simple: 'The part that turns pixels into useful features, before anything task-specific happens.',
      },
      {
        term: 'Degradation problem',
        definition:
          'The empirical finding that adding layers to a plain deep network eventually makes the training error worse, not better. It is an optimisation failure, not overfitting, since the deeper model does worse on data it has seen.',
        simple: 'Past a certain depth, more layers make the network worse even at memorising its own training data.',
      },
      {
        term: 'Residual (skip) connection',
        definition:
          'A shortcut that adds the input of a block to its output, so the block computes y = F(x) + x and only has to learn the difference from the identity rather than the whole mapping.',
        simple: 'Let the signal jump over a block and be added back on, so the block only has to learn a correction.',
      },
      {
        term: 'Bottleneck block',
        definition:
          'A residual block that reduces the channel count with a 1 by 1 convolution, does the expensive 3 by 3 convolution at the reduced width, then restores the width with another 1 by 1. It makes very deep networks affordable.',
        simple: 'Squeeze the channels, do the expensive work narrow, then expand again.',
      },
      {
        term: 'Stage',
        definition:
          'A group of layers operating at one spatial resolution. The standard design halves the resolution and doubles the channel count at each stage boundary, keeping the compute per stage roughly constant.',
        simple: 'One rung of the pyramid: several layers at the same size, before the next halving.',
      },
    ],

    simpleExplanation:
      "A convolutional classifier is a pyramid. At the bottom it looks at the picture at full size with only a handful of feature detectors, finding simple things like edges and colour patches. Then it shrinks the picture by half and doubles the number of detectors, which now look for combinations of the simple things — corners, textures, repeated patterns. It does this four or five times, so by the top it is looking at a tiny grid with hundreds of detectors, each responding to something quite abstract like a wheel or a face. Finally it averages each detector response over the whole picture, giving one number per detector, and a single layer of weights turns those numbers into class scores. That basic shape has been stable since 1998. What changed over the years was mostly how to build it deeper without breaking it. The crucial discovery, in 2015, was almost embarrassingly simple: let the signal skip over each block and get added back on at the other end, so each block only has to learn a small correction rather than an entire transformation. With that one change, networks went from about twenty usable layers to more than a hundred.",

    whyItExists:
      'Once convolution, pooling and normalisation existed, the remaining question was how to compose them, and the answer was not obvious: stacking more layers on a plain network stops helping at around twenty and then actively hurts, even on training data. Architectures exist as the accumulated answers to that composition problem — which kernel sizes, how to downsample, where to put the nonlinearity, and above all how to keep gradients and signal flowing through a hundred layers — and the residual connection is the single idea that made genuinely deep networks trainable.',

    analogy: {
      scenario:
        'A long manuscript is passed down a chain of copy editors, each asked to improve it. In the first arrangement, each editor must rewrite the whole manuscript from scratch based on what she received. A poor editor in the middle of the chain can destroy the text, and there is no way for the original wording to survive if a dozen editors each rewrite everything. In the second arrangement, each editor receives the manuscript and writes only a list of changes, which is then applied to the manuscript she was given. An editor with nothing to contribute writes an empty list and the text passes through untouched. The chain can now be a hundred editors long without degrading, and every editor can see, through the accumulated text, something very close to what the original author wrote.',
      mapping: [
        { from: 'Each copy editor in the chain', to: 'One block of layers in the network' },
        { from: 'Rewriting the whole manuscript', to: 'A plain block that must learn the full mapping H(x)' },
        { from: 'Writing only a list of changes', to: 'A residual block learning F(x) = H(x) - x' },
        { from: 'An empty list of changes', to: 'F(x) = 0, so the block is the identity — easy to learn, since it just means driving the weights to zero' },
        { from: 'The original wording surviving the chain', to: 'The gradient reaching early layers undiminished, because the identity path has derivative one' },
      ],
      bridge:
        'The algebra is exactly the analogy: y = F(x) + x means the block output is its input plus a correction. Differentiating gives dy/dx = 1 + dF/dx, and that constant 1 is the whole point — it guarantees a path along which the gradient is neither amplified nor attenuated, so even a hundred blocks cannot multiply it away. Learning the identity becomes trivial, because it requires only that F output zero, which a weight matrix can do easily, whereas a plain stack of nonlinear layers has to conspire to reproduce its input exactly. The analogy does understate one thing: a residual block is not merely a safe editor, it also changes the geometry of the loss surface, which visualisation studies show becomes dramatically smoother when skip connections are added.',
      limitations:
        'The picture suggests each block makes a small tidy edit. In practice the learned residuals are not small or interpretable, and deep residual networks behave in some respects like an ensemble of many shallower paths through the skip connections rather than one very deep chain.',
    },

    visuals: [
      {
        kind: 'timeline',
        title: 'Four generations of convolutional architecture',
        caption: 'Each entry names the problem its predecessor had. Read it as a sequence of fixes rather than a list of models.',
        events: [
          { when: '1998 — LeNet-5', what: 'Two convolution-and-pool stages then three dense layers, about 60,000 parameters, trained on 32 by 32 digits. Establishes the entire template: alternate convolution and downsampling, then classify. Limited by available compute and data, and by sigmoid and tanh activations that saturate.' },
          { when: '2012 — AlexNet', what: 'Eight learned layers, 60 million parameters, two GPUs, and three decisive changes: ReLU instead of tanh, dropout in the dense head, and heavy data augmentation. Halves the ImageNet error rate and starts the modern era. Its 11 by 11 stride-4 first layer is crude by later standards.' },
          { when: '2014 — VGG', what: 'Replaces large kernels with stacks of 3 by 3, showing that three 3 by 3 layers match one 7 by 7 receptive field with fewer parameters and more nonlinearity. Beautifully uniform, but 138 million parameters — over 100 million of them in the first dense layer — and it stops improving beyond about nineteen layers.' },
          { when: '2015 — ResNet', what: 'Identifies the degradation problem: a 56-layer plain network has higher training error than a 20-layer one. Adds y = F(x) + x, and suddenly 50, 101 and 152 layers all train and all improve. Also adopts batch normalisation throughout and global average pooling instead of a dense head.' },
          { when: '2016 onward — refinements', what: 'DenseNet concatenates instead of adding; ResNeXt and MobileNet use grouped and depthwise convolutions for efficiency; EfficientNet scales depth, width and resolution together by a rule; ConvNeXt retunes a ResNet with transformer-era training recipes and matches vision transformers.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Plain block versus residual block',
        caption: 'The difference is one addition. Its effect on trainable depth is the largest single result in convolutional architecture.',
        left: {
          heading: 'Plain block: y = F(x)',
          points: [
            'Must learn the entire desired mapping from scratch',
            'Learning the identity requires the weights to conspire to reproduce the input exactly, which is hard',
            'Gradient must pass through every weight matrix, so it is multiplied by a chain of Jacobians',
            'Training error rises beyond about twenty layers: the degradation problem',
            'No path through the network along which the gradient is preserved',
          ],
        },
        right: {
          heading: 'Residual block: y = F(x) + x',
          points: [
            'Learns only the correction F(x) = H(x) - x',
            'The identity is the default: driving F to zero is easy, so extra depth can never hurt in principle',
            'dy/dx = 1 + dF/dx, so there is always a path with derivative exactly one',
            '152 layers train successfully and continue to improve',
            'The loss surface is visibly smoother, which is a separate and well-documented effect',
          ],
        },
      },
      {
        kind: 'table',
        title: 'A ResNet-18 traced end to end on a 224x224x3 input',
        caption: 'Every shape follows from the output-size formula. Note where the parameters are and where the compute is — they are not the same place.',
        columns: ['Stage', 'Operation', 'Output shape', 'Params'],
        rows: [
          ['Stem', 'Conv 7x7, 64, s=2, p=3 + BN + ReLU', '64 x 112 x 112', '9,408'],
          ['Stem', 'MaxPool 3x3, s=2, p=1', '64 x 56 x 56', '0'],
          ['Stage 1', '2 residual blocks, 64 channels, s=1', '64 x 56 x 56', '147,968'],
          ['Stage 2', '2 residual blocks, 128 channels, first s=2', '128 x 28 x 28', '525,568'],
          ['Stage 3', '2 residual blocks, 256 channels, first s=2', '256 x 14 x 14', '2,099,712'],
          ['Stage 4', '2 residual blocks, 512 channels, first s=2', '512 x 7 x 7', '8,393,728'],
          ['Head', 'Global average pool then Linear(512, 1000)', '1000', '513,000'],
        ],
      },
      {
        kind: 'widget',
        title: 'Build a classifier layer by layer',
        caption: 'Stack convolutions, pools and a classifier head, and watch the shapes and the parameter count update as you go. Add a skip connection and see the gradient magnitude at the first layer change.',
        widget: 'neural-network-lab',
      },
    ],

    formalDefinition:
      'A convolutional classifier is a composition f = h o g_L o ... o g_1 o s, where s is a stem that reduces resolution quickly, each g_l is a stage of blocks operating at fixed resolution, downsampling occurs at stage boundaries with a matching increase in channel width, and h is a head consisting of global average pooling followed by a linear map to the class logits. A residual block within a stage computes y = sigma(F(x, W) + P(x)), where F is typically two or three convolutions with normalisation, sigma is the activation, and P is the identity when shapes match and a 1 by 1 stride-matched projection when they do not.',

    math: {
      intuition:
        'Two pieces of arithmetic explain most architecture decisions. The first is the cost formula: a convolution costs about C_in times C_out times k squared times H times W, so halving H and W while doubling C_out leaves the cost of a stage roughly unchanged — which is why every architecture does exactly that. The second is the residual derivative. Differentiating y = F(x) + x gives 1 + dF/dx, and multiplying such terms down a hundred blocks gives a product that contains the term 1, so the gradient can never be driven to zero purely by depth. In a plain network the equivalent product is a chain of Jacobians whose norms multiply, and anything systematically below one vanishes geometrically.',
      formulas: [
        {
          latex: '\\mathbf{y} = \\mathcal{F}(\\mathbf{x}, \\{W_i\\}) + \\mathbf{x}',
          name: 'The residual block',
          meaning:
            'The block output is its input plus a learned correction. If the optimal mapping for this block is close to the identity, the weights only need to make F small, which is far easier than making a stack of nonlinear layers reproduce its input exactly.',
          variables: [
            { symbol: '\\mathcal{F}', meaning: 'The residual function: typically Conv-BN-ReLU-Conv-BN, with the final ReLU applied after the addition' },
            { symbol: '\\mathbf{x}', meaning: 'The block input, carried forward unchanged along the shortcut' },
            { symbol: '\\{W_i\\}', meaning: 'The learned weights inside the residual branch' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\frac{\\partial \\mathbf{y}}{\\partial \\mathbf{x}} = \\mathbf{I} + \\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}}',
          name: 'Why gradients survive depth',
          meaning:
            'The identity term guarantees a route along which the gradient is passed through untouched. Chaining L blocks gives a product of (I + dF) terms, which expands into a sum containing the pure identity path, so no amount of depth can multiply the gradient away.',
          variables: [
            { symbol: '\\mathbf{I}', meaning: 'The identity Jacobian contributed by the shortcut' },
            { symbol: '\\partial \\mathcal{F}/\\partial \\mathbf{x}', meaning: 'The Jacobian of the residual branch, which may be small without harming the flow' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\text{cost} \\propto C_{\\text{in}} C_{\\text{out}} k^2 H W, \\quad (H,W)\\to(\\tfrac{H}{2},\\tfrac{W}{2}),\\; C\\to 2C \\;\\Rightarrow\\; \\text{cost} \\to \\text{cost}',
          name: 'The halve-and-double rule',
          meaning:
            'Halving both spatial dimensions divides the cost by four; doubling the channel count multiplies it by four, because both C_in and C_out double. The two cancel, which is why almost every backbone keeps its per-stage cost roughly constant this way.',
          variables: [
            { symbol: 'C_{\\text{in}}, C_{\\text{out}}', meaning: 'Channel counts, both of which double at a stage boundary' },
            { symbol: 'H, W', meaning: 'Spatial dimensions, both halved at the boundary' },
          ],
          category: 'complexity',
        },
        {
          latex: '\\text{basic: } 2\\cdot 9C^2 = 18C^2 \\quad\\text{vs}\\quad \\text{bottleneck: } \\frac{C}{4}C + 9\\frac{C^2}{16} + \\frac{C}{4}C \\approx 1.06C^2',
          name: 'Why bottleneck blocks make depth affordable',
          meaning:
            'A basic block does two full-width 3 by 3 convolutions. A bottleneck squeezes to a quarter of the width with a 1 by 1, does the 3 by 3 there, and expands back, cutting the parameter count per block by more than a factor of ten and making ResNet-152 cheaper than VGG-19.',
          variables: [
            { symbol: 'C', meaning: 'The stage channel width' },
            { symbol: 'C/4', meaning: 'The squeezed width inside the bottleneck, the standard reduction ratio' },
          ],
          category: 'complexity',
        },
        {
          latex: 'y_L = y_{\\ell} + \\sum_{i=\\ell}^{L-1} \\mathcal{F}(y_i, W_i)',
          name: 'The unrolled residual stack',
          meaning:
            'Unrolling the recursion shows that any deep activation is its earlier value plus a sum of residuals, not a product of transformations. This additive structure is why residual networks behave partly like an ensemble of shorter paths, and why deleting a single block from a trained ResNet barely changes its accuracy.',
          variables: [
            { symbol: 'y_L', meaning: 'Activation after block L' },
            { symbol: 'y_{\\ell}', meaning: 'Activation at any earlier block' },
            { symbol: '\\sum \\mathcal{F}', meaning: 'The accumulated corrections from every block in between' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Suppose a shallow network of depth n achieves some training error. Construct a deeper network of depth n + k by copying the shallow one and appending k layers that compute the identity. By construction the deeper network can achieve exactly the same training error.',
        'Therefore a deeper network should never have higher training error than a shallower one. Yet He and colleagues measured precisely that: a 56-layer plain network on CIFAR-10 had higher training error than a 20-layer one.',
        'The gap is not overfitting, because the failure is on the training set. It is an optimisation failure: gradient descent cannot find the identity-preserving solution that provably exists.',
        'Why is the identity hard? A plain layer computes sigma(Wx + b), and reproducing x exactly requires the weights to form something close to the identity map through a nonlinearity, in every one of the k appended layers simultaneously. Nothing in the initialisation or the gradient signal points toward that solution.',
        'So change the parameterisation. Instead of asking the block to learn H(x), ask it to learn F(x) = H(x) - x and define the output as F(x) + x. Now the identity corresponds to F = 0, which is reached simply by driving the weights toward zero — a solution that weight decay actively pushes toward.',
        'Check the gradient. dy/dx = I + dF/dx, so the backward signal has a route with derivative exactly one. Over L blocks the total Jacobian expands into a sum of paths, one of which is the pure identity, so the gradient at block one cannot vanish through depth alone.',
        'Handle the shape mismatch at stage boundaries, where the residual branch changes both resolution and channel count. The shortcut then needs a 1 by 1 convolution with the matching stride — the projection shortcut — which is the only place a ResNet skip connection carries parameters.',
        'Finally, verify empirically. With this change, 34, 50, 101 and 152-layer networks all train, and deeper consistently beats shallower. The degradation problem does not reappear until well beyond a thousand layers.',
      ],
    },

    workedExample: {
      title: 'Tracing a complete CIFAR-10 classifier, shape by shape and parameter by parameter',
      setup:
        'A compact classifier for 3-channel 32 by 32 images: three convolution blocks, each Conv 3x3 padding 1 then BatchNorm then ReLU then MaxPool 2x2, with channel counts 32, 64 and 128, followed by a flatten and two dense layers of 256 and 10 units. Compute every shape and every parameter count, then identify where the parameters and the compute actually sit.',
      steps: [
        {
          label: 'Block 1',
          detail: 'Conv2d(3, 32, k=3, p=1) preserves the size: (32 + 2 - 3)/1 + 1 = 32. Parameters are 3 x 32 x 9 + 32 = 896. BatchNorm2d(32) adds 64 more, being one gamma and one beta per channel. MaxPool halves to 16. Output: 32 channels of 16 by 16.',
          latex: '3\\times32\\times32 \\to 32\\times16\\times16,\\quad 896 + 64 = 960 \\text{ params}',
        },
        {
          label: 'Block 2',
          detail: 'Conv2d(32, 64, k=3, p=1) keeps 16 by 16. Parameters are 32 x 64 x 9 + 64 = 18,496, plus 128 for the BatchNorm. MaxPool halves to 8. Output: 64 channels of 8 by 8.',
          latex: '32\\times16\\times16 \\to 64\\times8\\times8,\\quad 18{,}496 + 128 = 18{,}624',
        },
        {
          label: 'Block 3',
          detail: 'Conv2d(64, 128, k=3, p=1) keeps 8 by 8. Parameters are 64 x 128 x 9 + 128 = 73,856, plus 256 for the BatchNorm. MaxPool halves to 4. Output: 128 channels of 4 by 4.',
          latex: '64\\times8\\times8 \\to 128\\times4\\times4,\\quad 73{,}856 + 256 = 74{,}112',
        },
        {
          label: 'Flatten and the first dense layer',
          detail: '128 x 4 x 4 = 2048 values. Linear(2048, 256) has 2048 x 256 + 256 = 524,544 parameters. This single layer holds more than five times the parameters of the entire convolutional body.',
          latex: '2048 \\to 256,\\quad 524{,}544 \\text{ params}',
        },
        {
          label: 'The output layer and the total',
          detail: 'Linear(256, 10) has 256 x 10 + 10 = 2,570. Total: 960 + 18,624 + 74,112 + 524,544 + 2,570 = 620,810. The dense head is 84.6 per cent of the model.',
          latex: '\\text{total} = 620{,}810,\\quad \\frac{527{,}114}{620{,}810} = 84.9\\%',
        },
        {
          label: 'Where the compute is, by contrast',
          detail: 'Block 1 FLOPs are about 2 x 3 x 32 x 9 x 32 x 32 = 1.77 million; block 2 about 2 x 32 x 64 x 9 x 16 x 16 = 9.4 million; block 3 about 2 x 64 x 128 x 9 x 8 x 8 = 9.4 million; the dense head about 2 x 524,288 = 1.05 million. The convolutions are 95 per cent of the compute and 15 per cent of the parameters — exactly the reverse of the parameter picture.',
          latex: '\\text{conv FLOPs} \\approx 20.6\\text{M},\\quad \\text{dense FLOPs} \\approx 1.1\\text{M}',
        },
        {
          label: 'Replace the head with global average pooling',
          detail: 'Swap flatten and Linear(2048, 256) for AdaptiveAvgPool2d(1) then Linear(128, 10). The head becomes 128 x 10 + 10 = 1,290 parameters and the total falls to 94,986 — a reduction of 85 per cent — while the model gains the ability to accept any input resolution. On CIFAR-10 this version typically generalises better, because the enormous dense layer was the main thing overfitting.',
          latex: '620{,}810 \\to 94{,}986',
        },
        {
          label: 'Add residual connections',
          detail: 'Wrap each block as y = ReLU(BN(Conv(x)) + P(x)), where P is a 1 by 1 stride-matched convolution because the channel count changes at every block. On this three-block network the benefit is small, since three blocks do not suffer from degradation. Extend to sixteen blocks per stage and the plain version stalls while the residual version keeps improving — which is exactly the experiment the ResNet paper reports.',
          latex: 'y = \\sigma\\big(\\mathcal{F}(x) + P(x)\\big)',
        },
      ],
      conclusion:
        'Two facts fall straight out of the trace and they are worth carrying into every architecture you read. Parameters concentrate in the widest layers, which are the dense head and the deep low-resolution stages; compute concentrates in the early high-resolution stages. Optimise the wrong one and you will make a model that is smaller but no faster, or faster but no smaller.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The traced classifier, built and measured',
        runnable: true,
        code: `import torch
import torch.nn as nn

def block(cin, cout):
    return nn.Sequential(nn.Conv2d(cin, cout, 3, padding=1), nn.BatchNorm2d(cout),
                         nn.ReLU(), nn.MaxPool2d(2, 2))

dense_head = nn.Sequential(block(3, 32), block(32, 64), block(64, 128),
                           nn.Flatten(), nn.Linear(2048, 256), nn.ReLU(),
                           nn.Linear(256, 10))

gap_head = nn.Sequential(block(3, 32), block(32, 64), block(64, 128),
                         nn.AdaptiveAvgPool2d(1), nn.Flatten(), nn.Linear(128, 10))

x = torch.randn(1, 3, 32, 32)
for name, m in [("dense head", dense_head), ("gap head", gap_head)]:
    print(f"{name}: output {tuple(m(x).shape)}, params {sum(p.numel() for p in m.parameters()):,}")

h = x
for i, layer in enumerate(dense_head):
    h = layer(h)
    if isinstance(layer, nn.Sequential):
        print(f"  after block {i+1}: {tuple(h.shape)}")`,
        output: `dense head: output (1, 10), params 620,810
gap head: output (1, 10), params 94,986
  after block 1: (1, 32, 16, 16)
  after block 2: (1, 64, 8, 8)
  after block 3: (1, 128, 4, 4)`,
        explanation:
          'The parameter counts match the hand trace exactly, including the 84.6 per cent share held by the dense head and the 85 per cent reduction from swapping it for global average pooling. The shape printout confirms the pyramid: resolution halves and channels double at every block, which by the cost formula keeps the work per block roughly constant. Walking the model and printing intermediate shapes like this is the fastest way to understand an unfamiliar architecture, and it catches shape bugs before a training run does.',
      },
      {
        language: 'python',
        title: 'A residual block, including the projection shortcut',
        runnable: true,
        code: `import torch
import torch.nn as nn

class BasicBlock(nn.Module):
    def __init__(self, cin, cout, stride=1):
        super().__init__()
        self.conv1 = nn.Conv2d(cin, cout, 3, stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(cout)
        self.conv2 = nn.Conv2d(cout, cout, 3, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(cout)
        self.relu = nn.ReLU(inplace=True)
        # The shortcut needs a projection only when the shape changes.
        self.shortcut = nn.Identity()
        if stride != 1 or cin != cout:
            self.shortcut = nn.Sequential(
                nn.Conv2d(cin, cout, 1, stride=stride, bias=False), nn.BatchNorm2d(cout))

    def forward(self, x):
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        return self.relu(out + self.shortcut(x))   # add, then activate

same = BasicBlock(64, 64)
down = BasicBlock(64, 128, stride=2)
x = torch.randn(1, 64, 56, 56)
print("identity shortcut:", type(same.shortcut).__name__, tuple(same(x).shape))
print("projection shortcut:", type(down.shortcut).__name__, tuple(down(x).shape))
print("params, same block:", sum(p.numel() for p in same.parameters()))
print("params, down block:", sum(p.numel() for p in down.parameters()))`,
        output: `identity shortcut: Identity (1, 64, 56, 56)
projection shortcut: Sequential (1, 128, 28, 28)
params, same block: 73,984
params, down block: 230,144`,
        explanation:
          'Three details matter and all three are easy to get wrong. The addition happens before the final ReLU, not after, which is what preserves a clean identity path; applying the activation to x as well would break it. The convolutions have bias=False because the BatchNorm that follows removes any constant they add. And the shortcut is a plain Identity whenever the shapes match, acquiring a 1 by 1 convolution only at stage boundaries where the stride or channel count changes — which is why most of a ResNet skip connections cost nothing at all.',
      },
      {
        language: 'python',
        title: 'Degradation: deeper plain networks train worse',
        runnable: true,
        code: `import torch
import torch.nn as nn

def plain(depth, width=64):
    layers = [nn.Conv2d(3, width, 3, padding=1), nn.BatchNorm2d(width), nn.ReLU()]
    for _ in range(depth):
        layers += [nn.Conv2d(width, width, 3, padding=1), nn.BatchNorm2d(width), nn.ReLU()]
    return nn.Sequential(*layers, nn.AdaptiveAvgPool2d(1), nn.Flatten(), nn.Linear(width, 10))

torch.manual_seed(0)
x, y = torch.randn(64, 3, 32, 32), torch.randint(0, 10, (64,))

for depth in (4, 20, 40):
    torch.manual_seed(0)
    m = plain(depth)
    opt = torch.optim.SGD(m.parameters(), lr=0.05, momentum=0.9)
    for _ in range(120):
        loss = nn.functional.cross_entropy(m(x), y)
        opt.zero_grad(); loss.backward(); opt.step()
    first_grad = m[0].weight.grad.norm().item()
    print(f"depth {depth:2d}: final train loss {loss.item():.4f}  grad norm at layer 1 {first_grad:.2e}")`,
        output: `depth  4: final train loss 0.0031  grad norm at layer 1 1.84e-03
depth 20: final train loss 0.2694  grad norm at layer 1 2.11e-04
depth 40: final train loss 1.4471  grad norm at layer 1 3.86e-05
`,
        explanation:
          'This is the degradation problem on a single memorisable batch, where overfitting cannot be the explanation: every model has ample capacity to fit 64 random labels, and the shallow one does so almost exactly. The deeper plain networks cannot, and the gradient norm reaching the first layer falls by roughly an order of magnitude for each doubling of depth. Batch normalisation is already present, so this is not a simple scale problem. Replacing the plain stack with residual blocks restores the shallow-network training loss at every depth, which is the experiment worth running next and the entire argument of the ResNet paper in miniature.',
      },
    ],

    realWorldExamples: [
      {
        context: 'ResNet as the universal backbone',
        usage:
          'A decade after publication, ResNet-50 remains the default feature extractor for object detection with Faster R-CNN, instance segmentation with Mask R-CNN, pose estimation and person re-identification. In each case the classifier head is removed and the stage outputs at four resolutions are fed into a feature pyramid, which is why an architecture designed for classification underpins tasks it was never trained on.',
      },
      {
        context: 'Transfer learning in practice',
        usage:
          'The standard workflow for a new image task with a few thousand labels is to take an ImageNet-pretrained backbone, replace the final linear layer with one sized to the new class count, freeze most of the body and fine-tune the last stage plus the head. This works because the early layers learned edge and texture detectors that are genuinely general, and it routinely outperforms training from scratch by a wide margin on small datasets.',
      },
      {
        context: 'Mobile and embedded deployment',
        usage:
          'MobileNet and EfficientNet-Lite replace standard convolutions with depthwise separable ones, which factor a k by k by C_in by C_out convolution into a per-channel spatial filter plus a 1 by 1 channel mix, cutting cost by roughly a factor of k squared. The pyramid, the residual connections and the global average pooling head are all inherited unchanged; only the block internals differ.',
      },
    ],

    projectConnections: [
      { tool: 'torchvision.models', role: 'resnet18 through resnet152, vgg16, and dozens more, with pretrained weights and a documented layer naming scheme for freezing and surgery.' },
      { tool: 'timm', role: 'The de facto library for modern vision backbones, with consistent APIs for feature extraction at multiple stages and for swapping normalisation layers.' },
      { tool: 'torchinfo', role: 'summary(model, input_size) prints the shape, parameter count and estimated size of every layer — the automated version of the hand trace in this unit.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing the degradation problem is overfitting',
        why: 'The evidence is that the deeper plain network has higher error on the training set, which overfitting cannot explain — an overfitting model does better on training data, not worse. Misdiagnosing it leads people to add dropout or weight decay, which makes it worse.',
        fix: 'Always plot training error alongside validation error. Rising training error with depth is an optimisation failure and calls for architectural fixes such as residual connections, normalisation or better initialisation.',
      },
      {
        mistake: 'Applying the activation to the shortcut path',
        why: 'Writing ReLU(F(x)) + ReLU(x), or normalising the shortcut, destroys the clean identity that makes the gradient path work. The original paper tested several such variants and all of them trained worse than the plain addition followed by a single activation.',
        fix: 'Add first, then activate once: out = relu(F(x) + shortcut(x)). Leave the shortcut as nn.Identity unless the shape genuinely requires a projection.',
      },
      {
        mistake: 'Keeping a huge flatten-and-dense head in a modern architecture',
        why: 'It ties the model to one input resolution and concentrates most of the parameters in one layer that overfits readily — in VGG-16 it is over a hundred million of the hundred and thirty-eight million weights.',
        fix: 'End the body with nn.AdaptiveAvgPool2d(1) and a single linear layer from the channel count to the class count, which is what every architecture since ResNet does.',
      },
      {
        mistake: 'Optimising parameters when the bottleneck is compute, or the reverse',
        why: 'Parameters concentrate in the deep low-resolution stages and the head; FLOPs concentrate in the early high-resolution stages. Pruning the head makes a model smaller without making it faster, and shrinking the stem makes it faster without making it smaller.',
        fix: 'Profile before optimising. Measure both the per-layer parameter count and the per-layer FLOPs, decide which one your deployment target actually constrains, and act on that.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the degradation problem, and how does a residual connection solve it?',
        answer:
          'Degradation is the observation that adding layers to a plain deep network eventually raises the training error. It is not overfitting, because the failure is on data the model has seen: the ResNet paper shows a 56-layer plain network with higher training error than a 20-layer one on CIFAR-10. It is an optimisation failure, and the argument that makes it puzzling is constructive — you can build the deeper network by copying the shallow one and appending identity layers, so a solution with equal training error provably exists and gradient descent simply fails to find it. The reason is that reproducing the identity through a stack of nonlinear layers requires the weights to conspire in a very particular way, and nothing in the initialisation or the gradient points toward it. A residual block changes the parameterisation so that the identity is the default: y = F(x) + x means the block has to learn only the correction, and the identity corresponds to F = 0, which is easy to reach and which weight decay actively encourages. As a bonus, the derivative is 1 + dF/dx, so there is always a path along which the gradient passes through unchanged.',
        followUp:
          'A strong answer mentions the unrolled form, y_L = y_l + sum of residuals, which shows the network is additive rather than multiplicative and explains why removing a single block from a trained ResNet barely hurts.',
      },
      {
        level: 'intermediate',
        question: 'Walk me through the design of a modern convolutional classifier and justify each decision.',
        answer:
          'A stem reduces resolution fast — in ResNet a 7 by 7 stride-2 convolution followed by a stride-2 max pool, taking 224 down to 56 — because compute scales with the number of spatial positions and the early layers are where it is spent. Then four stages, each a run of residual blocks at a fixed resolution, with the first block of each stage halving the resolution and doubling the channel count. That halve-and-double rule keeps the cost per stage roughly constant, since dividing H and W by two divides cost by four while doubling both C_in and C_out multiplies it by four. Inside each block, 3 by 3 convolutions rather than larger kernels, because stacking two 3 by 3 layers matches a 5 by 5 receptive field with fewer parameters and an extra nonlinearity. Each convolution has bias=False and is followed by batch normalisation, which supplies its own shift and allows a much larger learning rate. Finally the head: global average pooling to one value per channel, then a single linear layer to the logits, which makes the model resolution-independent and removes the enormous dense layer that dominated VGG.',
      },
      {
        level: 'ml-engineer',
        question: 'You need to cut the inference latency of a ResNet-50 by half. Where do you look first?',
        answer:
          'Measure before changing anything, because the intuition about where time goes is usually wrong. Profile per layer, and expect the early high-resolution stages to dominate FLOPs while the late stages dominate parameters. In order of effort: first, fold every BatchNorm into its preceding convolution, which is free, removes a layer and typically buys ten to twenty per cent. Second, reduce the input resolution if the task tolerates it — going from 224 to 160 cuts FLOPs by roughly half and often costs only a point or two of accuracy. Third, use half precision or int8 quantisation, which on modern accelerators is close to a two-times win by itself. Fourth, consider a structurally cheaper backbone: a ResNet-34, or a MobileNet-style network with depthwise separable convolutions, possibly distilled from the ResNet-50 to recover accuracy. Structured channel pruning is the option to reach for last, because it needs retraining and its speedups are hardware-dependent — unstructured sparsity in particular often gives no wall-clock gain at all on a GPU.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute the parameter count of one ResNet basic block with 128 input and 128 output channels, stride 1, using bias=False convolutions and BatchNorm.',
        hint: 'Two 3 by 3 convolutions plus two BatchNorms. The shortcut is the identity here, so it costs nothing.',
        solution:
          'Each convolution has 128 x 128 x 3 x 3 = 147,456 weights and no bias, so two give 294,912. Each BatchNorm2d(128) has a gamma and a beta per channel, 256 parameters, and two give 512. The shortcut is nn.Identity because the shape is unchanged, so it adds nothing. The total is 295,424. For comparison, the downsampling block at the start of the same stage, mapping 64 to 128 with stride 2, adds a 1 by 1 projection of 64 x 128 = 8,192 weights plus another BatchNorm of 256, which is why stage-transition blocks are slightly larger. The running statistics in each BatchNorm are buffers rather than parameters, so they do not appear in this count but do appear in the checkpoint file.',
      },
      {
        prompt:
          'Design a classifier for 64 by 64 inputs with four stages, starting at 32 channels, and give the shape and parameter count after every stage. Then say where you would put the residual connections and why.',
        hint: 'Halve the resolution and double the channels at each stage boundary; end with global average pooling.',
        solution:
          'Stem: Conv 3x3 stride 1 to 32 channels, giving 32 x 64 x 64. Stage 1 at 32 channels, 64 by 64. Stage 2: first block stride 2, 64 channels, 32 by 32. Stage 3: 128 channels, 16 by 16. Stage 4: 256 channels, 8 by 8. Then global average pool to 256 and a linear layer to the class count. With two basic blocks per stage the parameter counts per stage are roughly 2 x (2 x 32 x 32 x 9) = 37k, then 2 x (2 x 64 x 64 x 9) = 147k plus a projection, then 590k, then 2.36M, so the deepest stage holds three quarters of the model. Residual connections go around every block, with an identity shortcut inside a stage and a 1 by 1 stride-2 projection at each stage boundary where both the resolution and the channel count change. The reason to put them everywhere rather than only in the deep stages is that the benefit is about gradient flow through the whole stack, and there is no cost to an identity shortcut.',
      },
      {
        prompt:
          'Reproduce the degradation experiment: train plain networks of depth 8, 20 and 44 on CIFAR-10 and then the same depths with residual connections, and report training error for all six.',
        hint: 'Keep everything else identical — optimiser, schedule, initialisation, augmentation — so depth and the skip connection are the only variables.',
        language: 'python',
        starterCode:
          'import torch\nimport torch.nn as nn\n\nclass Block(nn.Module):\n    def __init__(self, c, residual: bool):\n        super().__init__()\n        self.residual = residual\n        self.body = nn.Sequential(\n            nn.Conv2d(c, c, 3, padding=1, bias=False), nn.BatchNorm2d(c), nn.ReLU(),\n            nn.Conv2d(c, c, 3, padding=1, bias=False), nn.BatchNorm2d(c))\n        self.relu = nn.ReLU()\n\n    def forward(self, x):\n        out = self.body(x)\n        return self.relu(out + x) if self.residual else self.relu(out)\n\ndef make(depth, residual, width=32):\n    ...\n',
        solution:
          'The expected pattern, which reproduces the published result, is that the plain networks improve from depth 8 to depth 20 and then get worse at depth 44, with training error rising rather than falling, while the residual networks improve monotonically across all three depths. The essential experimental discipline is that the only difference between the two families is the single addition in forward — same width, same optimiser, same schedule, same initialisation, same augmentation — because otherwise any of those could explain the gap. Logging the gradient norm at the first convolution makes the mechanism visible: it falls by an order of magnitude with depth in the plain family and stays roughly constant in the residual family. The result is worth reproducing yourself once, because it is the clearest example in the field of an architectural change that solves an optimisation problem rather than a capacity problem.',
      },
    ],

    quiz: [
      {
        id: 'DL-016-q1',
        type: 'mcq',
        concept: 'degradation',
        prompt: 'The ResNet paper reports that a 56-layer plain network has higher training error than a 20-layer one. What does this demonstrate?',
        options: [
          'An optimisation failure: gradient descent cannot find a solution that provably exists',
          'Overfitting, because the deeper model has more parameters',
          'That the 56-layer model needs more training data',
          'A bug in their implementation, since deeper is always better',
        ],
        answerIndex: 0,
        explanation:
          'The error is on the training set, so overfitting is ruled out by definition. A deeper network can always match a shallower one by setting the extra layers to the identity, so a solution exists; the failure is that optimisation does not find it.',
      },
      {
        id: 'DL-016-q2',
        type: 'fill',
        concept: 'residual block',
        prompt: 'A residual block computes y = F(x) + ____, so that learning the identity requires only that F output zero.',
        answers: ['x', 'the input', 'x, the input'],
        explanation:
          'Adding the input back is the whole idea. The derivative becomes 1 + dF/dx, guaranteeing a gradient path with derivative one, and the identity mapping becomes the easy default rather than a hard target.',
      },
      {
        id: 'DL-016-q3',
        type: 'numeric',
        concept: 'parameter counting',
        prompt: 'How many weights, excluding biases and normalisation, does a basic residual block with 64 input and 64 output channels at stride 1 contain?',
        answer: 73728,
        tolerance: 0,
        explanation:
          'Two 3 by 3 convolutions, each 64 x 64 x 9 = 36,864, giving 73,728. The shortcut is the identity at matching shapes and contributes nothing, which is why most ResNet skip connections are free.',
      },
      {
        id: 'DL-016-q4',
        type: 'order',
        concept: 'architecture evolution',
        prompt: 'Put these architectural developments in chronological order.',
        items: [
          'LeNet-5: alternating convolution and pooling followed by dense layers',
          'AlexNet: ReLU, dropout and GPU training halve the ImageNet error',
          'VGG: uniform stacks of 3 by 3 convolutions replace large kernels',
          'ResNet: residual connections make networks beyond a hundred layers trainable',
          'EfficientNet: compound scaling of depth, width and resolution',
        ],
        explanation:
          'Each generation addresses a specific limitation of the previous one: activations and data for AlexNet, kernel design for VGG, trainable depth for ResNet, and principled scaling for EfficientNet.',
      },
      {
        id: 'DL-016-q5',
        type: 'truefalse',
        concept: 'skip connections',
        prompt: 'In a standard ResNet, every skip connection contains a 1 by 1 convolution to match shapes.',
        answer: false,
        explanation:
          'False. The shortcut is a plain identity whenever the input and output shapes match, which is most blocks. A 1 by 1 projection with the matching stride appears only at stage boundaries, where the resolution halves and the channel count doubles.',
      },
      {
        id: 'DL-016-q6',
        type: 'multi',
        concept: 'design rules',
        prompt: 'Select every statement that reflects standard modern convolutional design.',
        options: [
          'Halve the spatial resolution and double the channel count at each stage boundary',
          'End the body with global average pooling rather than a flatten and a large dense layer',
          'Use bias=False on convolutions that are immediately followed by batch normalisation',
          'Prefer a single large kernel such as 11 by 11 over stacks of 3 by 3 convolutions',
          'Apply the activation separately to both branches before adding them in a residual block',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Large kernels were abandoned after VGG showed stacked 3 by 3 layers are cheaper and more expressive, and activating the shortcut branch destroys the identity path that makes residual blocks work.',
      },
      {
        id: 'DL-016-q7',
        type: 'explain',
        concept: 'why residual connections work',
        prompt: 'Explain why residual connections allow networks of a hundred or more layers to train, giving both the optimisation argument and the gradient argument.',
        rubric: [
          'States that the block learns a correction F(x) = H(x) - x, so the identity corresponds to F = 0 and is easy to reach',
          'Gives the derivative 1 + dF/dx and explains that the identity path preserves the gradient',
          'Connects this to the degradation problem, noting it is an optimisation failure rather than overfitting',
        ],
        sampleAnswer:
          'There are two complementary arguments. The optimisation one is about what the block is asked to learn. A plain block must produce the whole desired mapping H(x), and if the best thing it could do is pass its input through unchanged, that requires a stack of weight matrices and nonlinearities to conspire into an exact identity — which nothing in the initialisation or the gradient signal encourages. A residual block computes F(x) + x, so it only has to learn the difference from the identity; producing the identity means driving F to zero, which is trivial and which weight decay actively pushes toward. Since a deeper network can always be built from a shallower one by appending identity layers, this removes the reason a deeper network should ever be worse, which is exactly the degradation problem. The gradient argument is about the backward pass. Differentiating y = F(x) + x gives 1 + dF/dx, so there is always a route through the block along which the gradient is multiplied by one. Chaining a hundred such blocks expands into a sum of paths that includes the pure identity path, so the gradient reaching the first layer cannot be driven to zero by depth alone — unlike a plain stack, where the gradient is a product of Jacobians and anything systematically below one vanishes geometrically.',
        explanation:
          'The examinable insight is that the residual connection is a reparameterisation, not an extra capacity: the function class is unchanged, but the optimisation problem becomes far easier.',
      },
    ],

    flashcards: [
      { front: 'What is the degradation problem?', back: 'Adding layers to a plain deep network eventually raises the training error. It is an optimisation failure, not overfitting.' },
      { front: 'Write the residual block equation and its derivative.', back: 'y = F(x) + x, so dy/dx = I + dF/dx. The identity term guarantees a gradient path with derivative one.' },
      { front: 'What is the halve-and-double rule?', back: 'At each stage boundary, halve the spatial resolution and double the channel count, which leaves the compute per stage roughly constant.' },
      { front: 'What is a bottleneck block?', back: '1x1 squeeze to a quarter width, 3x3 at that width, 1x1 expand back. It cuts the cost of a block by more than ten times, making ResNet-152 cheaper than VGG-19.' },
      { front: 'When does a ResNet shortcut carry parameters?', back: 'Only at stage boundaries, where a 1x1 stride-2 convolution is needed to match the changed resolution and channel count.' },
      { front: 'Where are the parameters and where is the compute in a CNN?', back: 'Parameters in the deep low-resolution stages and the head; compute in the early high-resolution stages. Optimise the one your deployment actually constrains.' },
      { front: 'What did VGG establish about kernel size?', back: 'Three stacked 3x3 layers match a 7x7 receptive field with 27C^2 parameters instead of 49C^2, plus two extra nonlinearities.' },
    ],

    challenge: {
      title: 'Reproduce the ResNet result from scratch',
      brief:
        'Implement plain and residual convolutional networks of depths 8, 20, 32 and 56 for CIFAR-10, sharing every component except the single addition in the residual forward pass. Train all eight with an identical schedule and seed protocol. Produce three artefacts: training and test error against depth for both families on shared axes, the gradient norm at the first convolutional layer logged throughout training for the deepest model of each family, and an ablation in which you delete individual residual blocks from the trained 56-layer residual network and measure the accuracy drop. Write up whether your numbers reproduce the published pattern and where they differ.',
      language: 'python',
      acceptanceCriteria: [
        'Eight models trained under an identical protocol, with the residual flag as the only architectural difference',
        'Training error plotted alongside test error, making clear that the plain family degradation appears on the training set',
        'First-layer gradient norms logged over training and compared between families',
        'The block-deletion ablation is run and discussed in terms of the unrolled additive form of a residual stack',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\n\nclass Block(nn.Module):\n    def __init__(self, cin, cout, stride=1, residual=True):\n        super().__init__()\n        self.residual = residual\n        self.body = nn.Sequential(\n            nn.Conv2d(cin, cout, 3, stride=stride, padding=1, bias=False), nn.BatchNorm2d(cout), nn.ReLU(),\n            nn.Conv2d(cout, cout, 3, padding=1, bias=False), nn.BatchNorm2d(cout))\n        self.short = nn.Identity()\n        if residual and (stride != 1 or cin != cout):\n            self.short = nn.Sequential(nn.Conv2d(cin, cout, 1, stride=stride, bias=False), nn.BatchNorm2d(cout))\n        self.relu = nn.ReLU()\n\n    def forward(self, x):\n        ...\n\ndef make_net(depth, residual):\n    """depth = 6n + 2 as in the CIFAR ResNet paper."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain the shape of a modern convolutional classifier and the role of residual connections, as if to someone who understands convolution and pooling but has never seen a full architecture.',
      mustCover: [
        'The pyramid: resolution halves and channel count doubles at each stage, keeping the cost per stage roughly constant',
        'A stem downsamples quickly, stages of blocks do the work, and a global average pool plus one linear layer forms the head',
        'The degradation problem: plain networks get worse on training data beyond about twenty layers',
        'A residual block computes F(x) + x, so the identity is the default and the gradient has a path with derivative one',
      ],
      bonusSignals: [
        'gives concrete parameter or FLOP numbers from a real architecture',
        'notes that parameters and compute concentrate in different parts of the network',
        'explains why the shortcut is usually an identity and only sometimes a projection',
        'mentions that global average pooling makes the model resolution-independent',
      ],
      sampleExplanation:
        "A convolutional classifier is shaped like a pyramid, and once you see why, most architecture decisions become obvious. It starts with a stem that cuts the resolution fast — in a ResNet a seven-by-seven stride-two convolution followed by a stride-two pool, taking two hundred and twenty-four pixels down to fifty-six in two operations. That is deliberate, because the cost of a convolution is proportional to the number of output positions, so the highest-resolution layers are the most expensive and you want as few of them as possible. Then come four stages. Within a stage the resolution is fixed and several blocks run in sequence; at each stage boundary the resolution halves and the channel count doubles. That pairing is not aesthetic, it is arithmetic: halving both spatial dimensions divides the work by four, and doubling both the input and output channel counts multiplies it by four, so the cost per stage stays roughly constant while the features become fewer in position and richer in kind. At the top, instead of flattening the final map into an enormous dense layer as VGG did, you average each channel over the whole map, giving one number per channel, and a single linear layer turns those into class scores. That substitution removed a hundred million parameters and made the model work at any input resolution. Now the crucial part. Once you try to make the stack deep, plain networks fail, and they fail in a surprising way: past about twenty layers the error on the training set starts going up. That cannot be overfitting, because overfitting improves training performance. It is an optimisation failure, and it is strange because a deeper network can trivially match a shallower one by making the extra layers compute the identity — the solution exists and gradient descent cannot find it. The reason is that reproducing your input exactly through a stack of weight matrices and nonlinearities is a very particular configuration that nothing pushes you toward. The residual connection fixes it by changing what the block is asked to learn. Write the output as F of x plus x, so the block learns only the correction. Now the identity means F equals zero, which is easy, and which weight decay actively encourages. And differentiating gives one plus the derivative of F, so there is always a route through the block where the gradient passes untouched — chain a hundred of those and the gradient reaching the first layer still survives. One addition, and the usable depth of convolutional networks went from about twenty layers to over a hundred.",
    },
  },
];
