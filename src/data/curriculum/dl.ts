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
];
