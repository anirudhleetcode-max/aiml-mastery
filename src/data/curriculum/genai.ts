import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'GEN-001',
    domain: 'GEN',
    module: 'Generative Foundations',
    topic: 'What generative models do',
    title: 'What Generative AI Is',
    slug: 'what-generative-ai-is',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: [],
    tags: ['generative', 'discriminative', 'sampling', 'distribution', 'multimodal'],

    learningObjectives: [
      'Distinguish a discriminative model, which scores or labels an input, from a generative model, which samples new data from a learned distribution',
      'Explain generation as drawing a sample from a probability distribution the model has fitted to its training data',
      'Describe the current generative landscape across text, images, audio and multimodal systems in terms of the shared sampling idea',
      'State precisely what the word "generative" does and does not imply about understanding, truth or originality',
    ],

    terminology: [
      {
        term: 'Discriminative model',
        definition:
          'A model of the conditional distribution p(y | x): given an input, it produces a label, score or number. Spam classifiers, house-price regressors and image classifiers are all discriminative.',
        simple: 'A model that looks at something and tells you what it is.',
      },
      {
        term: 'Generative model',
        definition:
          'A model of the data distribution itself — p(x), or p(x | c) when conditioned on something like a prompt — from which new samples can be drawn.',
        simple: 'A model that can make new things that look like the things it learned from.',
      },
      {
        term: 'Sampling',
        definition:
          'Drawing one concrete outcome at random from a probability distribution. Generation is repeated sampling, which is why the same prompt can give different answers.',
        simple: 'Picking one option out of a weighted hat.',
      },
      {
        term: 'Latent space',
        definition:
          'The internal, continuous vector space a generative model works in, where nearby points correspond to similar outputs and arithmetic on points is meaningful.',
        simple: 'The hidden map of ideas the model moves around in before producing output.',
      },
      {
        term: 'Multimodal model',
        definition:
          'A model that accepts or produces more than one kind of data — for example text plus images — by mapping each modality into a shared representation space.',
        simple: 'A model that can handle words and pictures in the same head.',
      },
    ],

    simpleExplanation:
      "Most machine learning you have met so far answers questions about things that already exist: is this email spam, how much is this house worth, is this photograph a cat. A generative model does something different. Instead of judging examples, it studies a huge pile of them and learns the shape of the whole collection — which words tend to follow which, which pixel patterns look like fur, which sounds follow which. Once it has that shape, it can produce a new example that fits it. Nothing is being copied and nothing is being looked up. The model holds a probability distribution over possible outputs, and generating means rolling weighted dice to pick one, then rolling again, then again. That is why asking the same question twice can give you two different answers, and why the output can be fluent, plausible and completely wrong at the same time: plausibility is exactly what the model was built to produce.",

    whyItExists:
      'Classifiers can only choose among options you have already defined. An enormous amount of valuable work — drafting, translating, summarising, designing, writing code, answering an open question — has no fixed label set at all. Generative models exist because modelling the distribution of data itself lets a system produce an open-ended output instead of picking from a menu.',

    analogy: {
      scenario:
        "Think of two musicians who both grew up on jazz recordings. The first is a critic: play her any clip and she will tell you the era, the instrument and whether it is any good. The second is an improviser: he cannot necessarily explain what makes a phrase work, but he has absorbed so many solos that he can play a new one, note by note, choosing each note from the handful that would plausibly follow what he has just played. Neither of them is reciting a recording. Only one of them can fill a silence.",
      mapping: [
        { from: 'The critic who labels a clip', to: 'A discriminative model estimating p(label | input)' },
        { from: 'The improviser who plays a new solo', to: 'A generative model sampling from p(next | context)' },
        { from: 'Choosing each note from those that plausibly follow', to: 'Sampling one token or pixel at a time from a learned conditional distribution' },
        { from: 'Years of listening to recordings', to: 'Training on a large corpus' },
        { from: 'Playing something fluent that is nevertheless musically wrong', to: 'A confident, plausible, factually false output' },
      ],
      bridge:
        'The analogy holds on the central point: fluency comes from having internalised statistical regularities, not from retrieval and not from a plan. It also explains the failure mode honestly — an improviser who has absorbed the style can produce a phrase that sounds right and is harmonically wrong, and a language model can produce a sentence that reads right and is factually wrong, for precisely the same structural reason.',
      limitations:
        'The analogy overstates intention. A human improviser has goals, hears the result and adjusts mid-phrase. A generative model has no goal and no perception of its own output beyond feeding it back in as context, and it does not know whether what it just produced was good.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Discriminative versus generative',
        caption: 'The same training data can support either, but they answer different questions.',
        left: {
          heading: 'Discriminative — models p(y | x)',
          points: [
            'Input already exists; the model produces a label or score',
            'Output space is fixed and usually small',
            'Evaluated with accuracy, precision, recall, error',
            'Cannot produce a new example of the data',
            'Examples: spam filter, credit scorer, image classifier',
          ],
        },
        right: {
          heading: 'Generative — models p(x) or p(x | c)',
          points: [
            'Model produces a new example from the learned distribution',
            'Output space is astronomically large and open-ended',
            'Evaluation is hard and often requires human or model judgement',
            'Can also be used to score how likely a given example is',
            'Examples: language models, image and audio synthesis',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'From corpus to a new sample',
        caption: 'Every generative family follows this shape, whatever the data type.',
        steps: [
          { label: 'Collect data', detail: 'A large corpus of the kind of thing you want to produce: text, images, audio, code.' },
          { label: 'Fit a distribution', detail: 'Training adjusts parameters so that real data gets high probability under the model.' },
          { label: 'Condition', detail: 'Supply a context: a prompt, a caption, a first few notes, a partially masked image.' },
          { label: 'Sample', detail: 'Draw one outcome from the conditional distribution. Randomness enters here, not in the weights.' },
          { label: 'Feed back and repeat', detail: 'For sequential models, the sample becomes part of the context for the next draw.' },
          { label: 'Stop', detail: 'End when a stop condition fires: an end-of-sequence symbol, a length cap, or a finished denoising schedule.' },
        ],
      },
      {
        kind: 'table',
        title: 'The generative landscape by modality',
        caption: 'Different data, different architectures, one shared idea: sample from a learned distribution.',
        columns: ['Modality', 'Typical approach', 'What one sampling step produces'],
        rows: [
          ['Text and code', 'Autoregressive transformer language model', 'One token, appended to the context'],
          ['Images', 'Diffusion model conditioned on a text embedding', 'One denoising step over the whole image'],
          ['Audio and speech', 'Autoregressive or diffusion model over audio codec tokens', 'A short frame of sound'],
          ['Video', 'Diffusion over space and time, often latent', 'A refinement of a whole clip at once'],
          ['Multimodal', 'Shared embedding space plus a generative decoder', 'A token that may describe an image or continue text'],
        ],
      },
      {
        kind: 'annotated',
        title: 'What "generative" does and does not mean',
        subject: 'This model generated a paragraph about photosynthesis.',
        annotations: [
          { part: 'generated', note: 'Produced by sampling, token by token, from a conditional distribution — not retrieved from a store of paragraphs.' },
          { part: 'a paragraph', note: 'A sequence that is statistically typical of the training distribution given the prompt. Typicality is not truth.' },
          { part: 'about photosynthesis', note: 'The conditioning steered the distribution. It did not consult a source, and no citation exists unless one was supplied in the context.' },
        ],
      },
    ],

    formalDefinition:
      'A generative model is a parameterised probability distribution p_theta(x), or a conditional distribution p_theta(x | c), fitted to a dataset so that observed data receives high likelihood, and equipped with a procedure for drawing new samples from it. Generation is sampling from that fitted distribution; it is not retrieval, and the model stores parameters rather than examples.',

    math: {
      intuition:
        'A discriminative model learns a function from inputs to labels. A generative model learns how likely each possible data point is. Training pushes probability mass towards the data you actually observed, which means pushing it away from everything else; generation reverses the arrow by drawing a point according to that mass.',
      formulas: [
        {
          latex: 'p_{\\theta}(x) \\approx p_{\\text{data}}(x)',
          name: 'The generative modelling objective',
          meaning:
            'Choose parameters so the model distribution matches the distribution that produced the training data as closely as possible.',
          variables: [
            { symbol: 'p_{\\theta}', meaning: 'The model distribution, defined by the learned parameters theta' },
            { symbol: 'x', meaning: 'One data point — a document, an image, a waveform' },
            { symbol: 'p_{\\text{data}}', meaning: 'The unknown true distribution the training sample was drawn from' },
            { symbol: '\\theta', meaning: 'The model parameters (weights) adjusted during training' },
          ],
          category: 'probability',
        },
        {
          latex: '\\theta^{*} = \\arg\\max_{\\theta} \\sum_{i=1}^{N} \\log p_{\\theta}(x_i)',
          name: 'Maximum likelihood training',
          meaning:
            'Pick the parameters that make the observed training examples as probable as possible under the model. Equivalent to minimising cross-entropy against the data.',
          variables: [
            { symbol: '\\theta^{*}', meaning: 'The fitted parameters' },
            { symbol: 'N', meaning: 'Number of training examples' },
            { symbol: 'x_i', meaning: 'The i-th training example' },
            { symbol: '\\log p_{\\theta}(x_i)', meaning: 'Log-probability the model assigns to that example; summing logs multiplies probabilities' },
          ],
          category: 'probability',
        },
        {
          latex: 'x \\sim p_{\\theta}(x \\mid c)',
          name: 'Conditional sampling',
          meaning:
            'Generation with a prompt: restrict attention to the slice of the distribution consistent with the condition c, then draw one outcome from it.',
          variables: [
            { symbol: '\\sim', meaning: 'Read as "is drawn at random from"' },
            { symbol: 'c', meaning: 'The conditioning information: a prompt, a caption, a class label, a partially completed input' },
            { symbol: 'p_{\\theta}(x \\mid c)', meaning: 'The model distribution over outputs given that condition' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Start from the aim: make the model assign high probability to real data.',
        'Write the likelihood of the whole training set as a product over independent examples: prod_i p_theta(x_i).',
        'Take logarithms to turn the product into a sum, which is numerically stable and differentiable.',
        'Maximising that sum is identical to minimising the average negative log-likelihood, which is the cross-entropy loss used in practice.',
        'After training, sampling from p_theta is a separate procedure from fitting it — which is why decoding settings can change outputs without changing a single weight.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The same data, two different jobs',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)

# A tiny corpus of two-letter "words" from a made-up language.
corpus = ["ab", "ab", "ab", "ac", "ba", "ab", "ac", "ab"]

# ---- Discriminative: given a word, which class is it? ----
def classify(word: str) -> str:
    """Scores an existing input. Output space = {"a-start", "b-start"}."""
    return "a-start" if word.startswith("a") else "b-start"

print("discriminative:", classify("ac"))

# ---- Generative: learn p(x), then produce a NEW word ----
words, counts = np.unique(corpus, return_counts=True)
probs = counts / counts.sum()
print("learned distribution:", dict(zip(words, probs.round(3))))

samples = rng.choice(words, size=5, p=probs)
print("five samples:", list(samples))`,
        output: `discriminative: a-start
learned distribution: {'ab': 0.5, 'ac': 0.25, 'ba': 0.25}
five samples: ['ab', 'ac', 'ab', 'ab', 'ba']`,
        explanation:
          'The discriminative half maps an input to a label and can never invent a word. The generative half estimates how much probability mass each word carries, then draws from it. This eight-line toy is structurally the same thing a language model does, with a vocabulary of a hundred thousand tokens instead of three and a neural network in place of a counter. Note also that the samples vary between runs unless the seed is fixed: randomness lives in the sampling step, not in the learned probabilities.',
      },
      {
        language: 'python',
        title: 'Generation is repeated conditional sampling',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(7)

# p(next word | current word) for a three-word vocabulary.
vocab = ["the", "cat", "sat"]
transitions = {
    "the": [0.05, 0.85, 0.10],
    "cat": [0.10, 0.05, 0.85],
    "sat": [0.80, 0.10, 0.10],
}

current = "the"
generated = [current]
for _ in range(5):
    current = rng.choice(vocab, p=transitions[current])
    generated.append(current)

print(" ".join(generated))`,
        output: `the cat sat the cat sat`,
        explanation:
          'Each step conditions on what has already been produced, samples one item, appends it, and repeats. That loop is the whole of autoregressive generation; everything a transformer adds is a far better estimate of the conditional distribution, informed by thousands of previous tokens rather than one. Notice that the output is coherent because the conditional probabilities encode local structure, not because any plan for the sentence exists anywhere.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Drafting and editing in a professional workflow',
        usage:
          'A lawyer or engineer uses a language model to produce a first draft of a document that a human then verifies and edits. The value comes from the model producing a fluent, structurally correct starting point; the verification step exists because fluency and accuracy are separate properties.',
      },
      {
        context: 'Synthetic data for training other models',
        usage:
          'When real examples of a rare event are scarce — an unusual defect on a production line, a rare clinical presentation — a generative model conditioned on the rare class can produce additional training examples. This helps a downstream classifier only to the extent that the generator captured the real distribution rather than a caricature of it.',
      },
      {
        context: 'Code completion inside an editor',
        usage:
          'The editor sends surrounding code as the condition and the model samples a continuation. The reason it fits your codebase is that your file is in the context, not that the model was trained on your repository.',
      },
      {
        context: 'Product imagery and concept exploration',
        usage:
          'A design team samples dozens of image variations from a text description to explore a space quickly. The variation between samples is a feature here, which is the opposite of what you want when generating an invoice total.',
      },
    ],

    projectConnections: [
      { tool: 'Hugging Face transformers', role: 'The standard library for loading and sampling from open-weight generative text models.' },
      { tool: 'diffusers', role: 'The equivalent for image and audio diffusion models, where one sampling step denoises rather than appends.' },
      { tool: 'NumPy', role: 'Underneath every sampler is a weighted random choice over a probability vector, exactly as in the examples above.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing the model looks things up in a database of its training data',
        why: 'Training compresses an enormous corpus into a fixed set of weights. Nothing is stored verbatim in a retrievable way, which is why a model can produce a confident citation to a paper that does not exist.',
        fix: 'Treat output as a sample from a distribution, not as a record. If you need provenance, supply the source documents in the context and ask for quotations from them — which is exactly what retrieval-augmented generation does.',
      },
      {
        mistake: 'Assuming the same prompt must give the same answer',
        why: 'Sampling is stochastic by default. Two runs draw two different outcomes from the same distribution, and even greedy decoding can vary across hardware because of floating-point non-determinism in batched kernels.',
        fix: 'If you need reproducibility, set the sampling temperature to zero or fix a seed where the API supports it, and be aware that this buys consistency, not correctness.',
      },
      {
        mistake: 'Reading fluency as evidence of understanding or of truth',
        why: 'The training objective rewards outputs that are typical of the corpus. A fluent false statement and a fluent true statement can both be typical, so fluency simply does not carry information about accuracy.',
        fix: 'Verify claims independently, and design systems so the model proposes while a deterministic program or a human checks.',
      },
      {
        mistake: 'Calling every modern AI system "generative"',
        why: 'Fraud detection, recommendation ranking, forecasting and search relevance are overwhelmingly discriminative, and most production machine learning still is. Using one word for all of it obscures which tool suits which problem.',
        fix: 'Ask what the output space is. A fixed label or a number means a discriminative model is usually the right and cheaper answer.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between a discriminative and a generative model?',
        answer:
          'A discriminative model learns p(y | x): it takes an input that already exists and produces a label or score, so its output space is fixed and usually small. A generative model learns the distribution of the data itself, p(x) or p(x | c), and can draw new samples from it, so its output space is open-ended. A useful consequence is that a generative model can also score how likely a given input is, whereas a discriminative model can only compare labels. In practice the choice follows from the task: classification and ranking problems want discriminative models, while drafting, translation and synthesis need generative ones.',
        followUp:
          'A strong answer notes that generative models are usually harder to evaluate, because there is no single correct output to compare against.',
      },
      {
        level: 'ai-engineer',
        question: 'A stakeholder asks why the model gave a different answer this morning than yesterday, with no change deployed. What do you tell them?',
        answer:
          'Generation is sampling. Unless decoding is set to be deterministic, each call draws a fresh outcome from the same probability distribution, so variation is expected behaviour rather than a fault. I would check three things before saying anything else: whether the temperature or top-p settings differ between the two calls, whether any part of the prompt varies — a timestamp, retrieved documents, conversation history — and whether the provider changed the model behind the endpoint. If the business needs stability, the fix is deterministic decoding plus pinning inputs, and, where the answer must be exactly right, constraining the output with a schema or moving the decision into ordinary code.',
      },
      {
        level: 'intermediate',
        question: 'Is a generative model capable of producing something genuinely new, or is it interpolating training data?',
        answer:
          'Both framings are partly right and the honest answer says so. The model has no store of examples to copy, and it routinely produces token sequences that appear nowhere in its training data, so it is not retrieval. On the other hand it samples from a distribution fitted to that data, so its outputs are constrained to the region of the space the data supports, and it can and sometimes does reproduce memorised passages when a sequence was frequent or highly distinctive in training. The defensible statement is that it recombines learned structure in ways that can be novel in detail, while remaining bounded by the distribution it learned, and that arguing for either extreme goes beyond the evidence.',
        followUp:
          'A strong candidate mentions memorisation of rare, repeated strings as a measurable phenomenon with real privacy and licensing implications.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'For each task, say whether you would reach for a discriminative or a generative model, and why: (a) flagging fraudulent transactions, (b) writing release notes from a list of merged pull requests, (c) predicting tomorrow\'s electricity demand, (d) producing alternative product photographs.',
        hint: 'Ask what the output space is. Fixed and small, or open-ended?',
        solution:
          '(a) Discriminative: the output is a binary label with a score, and you need calibrated probabilities for a threshold. (b) Generative: the output is open-ended prose conditioned on structured input. (c) Discriminative — specifically regression: the output is a number. (d) Generative: the output is a new image sampled from a conditional distribution. The general rule is that a fixed output space calls for a discriminative model, which will almost always be smaller, cheaper and easier to evaluate.',
      },
      {
        prompt:
          'Modify the transition-matrix example so that generation is deterministic rather than sampled, and describe in one sentence what changes about the output.',
        hint: 'Replace the weighted random draw with a choice of the highest-probability option.',
        language: 'python',
        starterCode: '# Make generation deterministic: always take the most likely next word.\n',
        solution:
          'Replace `current = rng.choice(vocab, p=transitions[current])` with `current = vocab[int(np.argmax(transitions[current]))]`. The output becomes identical on every run and falls into a fixed cycle — the cat sat the cat sat — because the same input always maps to the same output. This is the toy version of greedy decoding, and it illustrates the real trade-off: determinism buys repeatability at the cost of diversity, and it makes repetitive loops far more likely.',
      },
      {
        prompt:
          'A colleague says: "The model told me the 2019 revenue figure, so it must have that data." Write a two-sentence reply that is accurate without being dismissive.',
        hint: 'Separate the mechanism (sampling from learned parameters) from the question of whether the number is right.',
        solution:
          'A defensible reply: "It produced the most plausible continuation given your question, drawing on patterns in its training data rather than on a stored table, so the number may be right, stale or invented with equal fluency. If we need it to be correct, we should retrieve the figure from the filing and give the model that text to quote." This is accurate, it explains the mechanism, and it points at the fix rather than simply refusing.',
      },
    ],

    quiz: [
      {
        id: 'GEN-001-q1',
        type: 'mcq',
        concept: 'generative vs discriminative',
        prompt: 'Which statement best describes what a generative model learns?',
        options: [
          'The distribution of the data, so that new samples can be drawn from it',
          'A decision boundary that separates predefined classes',
          'A compressed, searchable index of its training examples',
          'A set of rules written by domain experts',
        ],
        answerIndex: 0,
        explanation:
          'A generative model fits a probability distribution over data and can sample from it. A decision boundary describes a discriminative classifier, and no searchable index of training examples exists inside the weights.',
      },
      {
        id: 'GEN-001-q2',
        type: 'truefalse',
        concept: 'sampling and variability',
        prompt: 'Getting two different answers from the same prompt indicates that the model has a bug.',
        answer: false,
        explanation:
          'Generation draws a random sample from a probability distribution, so variation between runs is the expected behaviour. Deterministic decoding removes the variation but does not make the answer more likely to be correct.',
      },
      {
        id: 'GEN-001-q3',
        type: 'multi',
        concept: 'task framing',
        prompt: 'Which of these tasks are naturally generative? Select all that apply.',
        options: [
          'Summarising a fifty-page report into a paragraph',
          'Deciding whether a chest X-ray shows pneumonia',
          'Producing a variation of a product photograph',
          'Ranking search results by relevance',
          'Translating a sentence into another language',
        ],
        answerIndices: [0, 2, 4],
        explanation:
          'Summarisation, image variation and translation all produce open-ended new content. Diagnosis is classification and ranking is a scoring problem; both have fixed output spaces and are handled discriminatively.',
      },
      {
        id: 'GEN-001-q4',
        type: 'fill',
        concept: 'generation as sampling',
        prompt: 'Generation means drawing a ________ from a learned probability distribution.',
        answers: ['sample', 'random sample', 'draw'],
        explanation:
          'Generation is sampling. This one word explains the run-to-run variability, the effect of temperature, and why the model can produce something that never appeared in its training data.',
      },
      {
        id: 'GEN-001-q5',
        type: 'match',
        concept: 'modalities',
        prompt: 'Match each modality with what a single sampling step typically produces.',
        pairs: [
          { left: 'Autoregressive text model', right: 'One token appended to the context' },
          { left: 'Image diffusion model', right: 'One denoising step applied to the whole image' },
          { left: 'Audio codec model', right: 'A short frame of sound' },
          { left: 'Multimodal model', right: 'A token in a shared space that may describe an image or continue text' },
        ],
        explanation:
          'The unifying idea is sampling from a learned conditional distribution; what differs between families is what one step of that sampling produces and whether generation proceeds left to right or by refining the whole output at once.',
      },
      {
        id: 'GEN-001-q6',
        type: 'explain',
        concept: 'fluency is not truth',
        prompt: 'Explain why a generative model can produce a confident, well-written statement that is completely false.',
        rubric: [
          'States that the training objective rewards typicality or plausibility, not truth',
          'Notes that the model samples from a distribution rather than consulting a source',
          'Observes that fluency therefore carries no information about accuracy',
        ],
        sampleAnswer:
          'The model was trained to assign high probability to text that looks like its training data, so what it optimises for is plausibility. When it generates, it samples the continuation that fits the pattern, and a false statement can fit the pattern of a true one perfectly — the same grammar, the same shape of citation, the same tone of authority. Because nothing in the process checks a source, fluency and accuracy are independent properties, and a reader who uses the first as evidence for the second will be wrong exactly as often as the model is.',
        explanation:
          'The examinable idea is that the training objective is about typicality rather than truth, which makes confident errors a structural feature and not a defect to be patched.',
      },
    ],

    flashcards: [
      { front: 'Discriminative model — what does it estimate?', back: 'p(y | x): a label or score for an input that already exists. Fixed, usually small output space.' },
      { front: 'Generative model — what does it estimate?', back: 'p(x) or p(x | c): the distribution of the data itself, from which new samples can be drawn.' },
      { front: 'Why does the same prompt give different answers?', back: 'Because generation is sampling from a probability distribution. Randomness enters at decode time, not in the weights.' },
      { front: 'Does a generative model store its training data?', back: 'No. It stores parameters fitted to that data. Rare, highly repeated strings can nevertheless be memorised.' },
      { front: 'What does "generative" imply about understanding?', back: 'Nothing by itself. It describes the output space and the sampling mechanism, not any claim about comprehension or truth.' },
      { front: 'One question that decides model family', back: 'What is the output space? Fixed label or number, use discriminative. Open-ended content, use generative.' },
    ],

    challenge: {
      title: 'Build the smallest honest generative model',
      brief:
        'Using only NumPy and a text file of a few thousand words, build a character-level bigram model: count how often each character follows each other character, normalise the counts into conditional probabilities, and sample 200 characters from it. Then repeat with trigram context and compare. Write three sentences on what improved, what did not, and what that tells you about the relationship between context length and apparent coherence.',
      language: 'python',
      acceptanceCriteria: [
        'Counts are turned into a valid conditional probability distribution whose rows sum to one',
        'Generation samples rather than always taking the maximum',
        'Both bigram and trigram versions run and produce output',
        'The written comparison makes a claim about context length and coherence, with evidence from the output',
      ],
      starterCode: "import numpy as np\n\ntext = open('corpus.txt', encoding='utf-8').read().lower()\nchars = sorted(set(text))\n",
    },

    teachingPrompt: {
      prompt:
        'A colleague from finance asks what makes generative AI different from the fraud model your company already runs. Explain, without jargon, and be honest about what the word "generative" does not mean.',
      mustCover: [
        'A discriminative model labels or scores something that already exists',
        'A generative model learns the shape of the data and produces new examples from it',
        'Generation is sampling from a probability distribution, which is why answers vary',
        'Plausible output is not the same as true output, because the objective rewards typicality',
      ],
      bonusSignals: ['gives a concrete example from the listener\'s own domain', 'mentions that most production machine learning is still discriminative', 'distinguishes memorisation from retrieval'],
      sampleExplanation:
        "Your fraud model looks at a transaction that already exists and answers one narrow question: how suspicious is this. It can never produce a transaction, only judge one. A generative model is trained on an enormous pile of examples until it has absorbed the shape of the whole collection — which words follow which, which shapes look like a face — and then it can produce a new example that fits that shape. The important detail is how it produces it: at each step it holds a list of possible next pieces with a probability attached to each, and it picks one at random according to those weights. That is why the same question can give two different answers, and it is also why the output can be completely wrong while sounding entirely convincing. The model was built to produce what is typical, and something can be typical without being true.",
    },
  },

  {
    id: 'GEN-002',
    domain: 'GEN',
    module: 'Generative Foundations',
    topic: 'Next-token prediction',
    title: 'Language Models and Next-Token Prediction',
    slug: 'next-token-prediction',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['GEN-001'],
    related: ['GEN-001'],
    tags: ['language-model', 'autoregressive', 'softmax', 'temperature', 'top-p', 'decoding'],

    learningObjectives: [
      'Explain that a language model outputs a full probability distribution over its vocabulary at every position, not a single word',
      'Describe autoregressive generation as repeatedly sampling one token and appending it to the context',
      'Predict how temperature, top-k and top-p each reshape the distribution, and say precisely what each one changes',
      'Choose between greedy decoding and sampling for a given task, and justify the choice',
      'Argue both sides of "it is just predicting the next token" without overclaiming in either direction',
    ],

    terminology: [
      {
        term: 'Language model',
        definition:
          'A model that assigns a probability to a sequence of tokens, factorised so that it predicts each token given all the tokens before it.',
        simple: 'A machine that says how likely any piece of text is, one word-piece at a time.',
      },
      {
        term: 'Logits',
        definition:
          'The raw, unnormalised scores the network produces for every token in the vocabulary at a given position. One real number per vocabulary entry, before any probability is computed.',
        simple: 'A score for every possible next word-piece, before turning scores into percentages.',
      },
      {
        term: 'Softmax',
        definition:
          'The function that turns a vector of logits into a probability distribution: exponentiate each score and divide by the sum of all exponentiated scores.',
        simple: 'The step that converts scores into percentages that add up to one hundred.',
      },
      {
        term: 'Autoregressive generation',
        definition:
          'Producing a sequence by sampling one token, appending it to the input, and running the model again on the extended input.',
        simple: 'Writing one piece at a time, re-reading everything so far before each new piece.',
      },
      {
        term: 'Decoding strategy',
        definition:
          'The rule used to turn the output distribution into a concrete token: greedy argmax, pure sampling, or sampling from a truncated distribution under top-k or top-p.',
        simple: 'How you choose the next piece once the model has told you the odds.',
      },
      {
        term: 'Perplexity',
        definition:
          'The exponential of the average negative log-likelihood per token. A perplexity of k means the model was, on average, as uncertain as if choosing uniformly among k options.',
        simple: 'A score for how surprised the model was by real text. Lower is better.',
      },
    ],

    simpleExplanation:
      "Here is the entire job a language model was trained to do: look at some text and say what is likely to come next. Not one answer — a full set of odds. Given 'the cat sat on the', it produces a number for every single entry in its vocabulary, which might be a hundred thousand word-pieces: maybe eleven per cent for 'mat', eight for 'sofa', a tiny sliver for 'moon', and a vanishingly small amount for every piece that makes no sense there. To write a sentence, a program picks one of those options, glues it onto the end of the text, and asks the model again. And again. Everything you have seen a chatbot do — answer a question, write code, keep a promise it made three paragraphs ago — comes out of that loop running a few hundred times. The odds come from the model; which option gets picked is decided by settings you control, and those settings change the character of the output without changing the model at all.",

    whyItExists:
      'Labelling text by hand does not scale, but raw text carries its own labels: for every position in every document, the next token is the correct answer. Next-token prediction turns the entire internet into a supervised training set with no annotation, and it forces the model to learn syntax, facts, reasoning patterns and style as a side effect, because all of those help predict what comes next.',

    analogy: {
      scenario:
        "Imagine a weather forecaster who is never allowed to say what tomorrow will be. Every evening she must publish a full table: forty per cent chance of rain, thirty-five cloud, twenty sun, five snow. A separate person then reads the table and decides what to actually do — the cautious one always picks the single most likely outcome, while the planner running a festival draws at random in proportion to the odds, because he needs to consider the plausible alternatives rather than only the safest bet. The forecaster's table is the same either way; the behaviour you observe depends entirely on who reads it.",
      mapping: [
        { from: "The forecaster's table of odds", to: 'The softmax distribution over the whole vocabulary' },
        { from: 'Always picking the top row', to: 'Greedy decoding (argmax)' },
        { from: 'Drawing in proportion to the odds', to: 'Sampling from the distribution' },
        { from: 'Ignoring rows below one per cent', to: 'Top-k or top-p truncation' },
        { from: 'Flattening or sharpening the table before reading it', to: 'Raising or lowering the temperature' },
        { from: "Tomorrow's forecast built on today's observed weather", to: 'Each generated token becoming part of the context for the next prediction' },
      ],
      bridge:
        'The separation in the story is the real architectural separation: the network produces a distribution and the decoder consumes it. This is why changing temperature makes a model seem more creative or more robotic without any weight changing, and why two products built on the same model can feel completely different. Where the analogy breaks is the feedback loop — the forecaster does not cause tomorrow\'s weather, whereas a sampled token becomes part of the context and genuinely conditions everything that follows, so one unlucky draw can send the rest of the output down a different path.',
      limitations:
        'A weather table has four rows and is about a single future event. The model\'s table has tens of thousands of rows and is recomputed after every single word-piece, so the compounding effect of one low-probability choice has no counterpart in the story.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'One step of generation',
        caption: 'This entire sequence runs once per token produced.',
        steps: [
          { label: 'Tokenise the context', detail: 'The prompt becomes a list of integer token ids.' },
          { label: 'Forward pass', detail: 'The network processes the sequence and produces a vector of logits — one score per vocabulary entry — at the final position.' },
          { label: 'Apply temperature', detail: 'Divide every logit by T. Below 1 sharpens the distribution, above 1 flattens it.' },
          { label: 'Truncate', detail: 'Top-k keeps the k highest-probability tokens; top-p keeps the smallest set whose probabilities sum to p. The rest are set to zero probability.' },
          { label: 'Softmax and sample', detail: 'Renormalise what survives into a distribution and draw one token from it.' },
          { label: 'Append and repeat', detail: 'Add the token to the context and go back to the forward pass, until a stop token or a length limit.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Greedy versus sampling',
        caption: 'Neither is correct in general; they fail in opposite directions.',
        left: {
          heading: 'Greedy / temperature 0',
          points: [
            'Always takes the highest-probability token',
            'Reproducible for a fixed model and input',
            'Prone to repetition loops and bland phrasing',
            'Right for extraction, classification, structured output and code',
            'Does not find the most likely sequence — only the locally most likely token at each step',
          ],
        },
        right: {
          heading: 'Sampling with top-p',
          points: [
            'Draws in proportion to probability from a truncated set',
            'Different every run unless a seed is fixed',
            'Produces varied, more natural-sounding prose',
            'Right for drafting, brainstorming and dialogue',
            'Occasionally selects a token that derails the rest of the output',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What each decoding control actually changes',
        caption: 'They operate on the same distribution in different ways, and they compose.',
        columns: ['Control', 'Mechanism', 'Effect of raising it', 'Typical use'],
        rows: [
          ['Temperature T', 'Divides logits by T before softmax', 'Flattens the distribution; rare tokens become more likely', 'T near 0 for factual or structured tasks, 0.7 to 1.0 for prose'],
          ['Top-k', 'Keeps the k highest-probability tokens, zeroes the rest', 'Admits more candidates, including weaker ones', 'A blunt cap; simple and predictable'],
          ['Top-p (nucleus)', 'Keeps the smallest set whose cumulative probability reaches p', 'Admits more of the tail', 'Adapts to how confident the model is at each step'],
          ['Repetition penalty', 'Reduces logits of tokens already produced', 'Discourages loops more aggressively', 'A patch for degenerate repetition, not a cure'],
        ],
      },
      {
        kind: 'widget',
        title: 'Experiment with decoding settings',
        caption: 'Change temperature and top-p on a fixed distribution and watch which tokens survive.',
        widget: 'code-playground',
        props: { topic: 'decoding-strategies' },
      },
    ],

    formalDefinition:
      'An autoregressive language model defines a joint distribution over token sequences by the chain rule of probability, p(x_1..x_T) = prod_t p(x_t | x_1..x_{t-1}), where each conditional is computed by a neural network whose final linear layer produces one logit per vocabulary entry and whose softmax converts those logits into a normalised distribution. Training minimises the average negative log-likelihood of the true next token; generation samples from the resulting conditionals under a chosen decoding rule.',

    math: {
      intuition:
        'The probability of a whole sentence is the probability of its first token, times the probability of the second given the first, times the probability of the third given the first two, and so on. That factorisation is exact — it is just the chain rule of probability — and it converts the impossible task of modelling every possible document into the tractable task of predicting one token at a time. Temperature, top-k and top-p are all transformations applied to the resulting distribution before a token is drawn from it.',
      formulas: [
        {
          latex: 'p_{\\theta}(x_1, \\dots, x_T) = \\prod_{t=1}^{T} p_{\\theta}(x_t \\mid x_{<t})',
          name: 'Autoregressive factorisation',
          meaning:
            'The probability of a sequence is the product of the conditional probabilities of each token given everything before it. No approximation is involved in this step.',
          variables: [
            { symbol: 'x_t', meaning: 'The token at position t' },
            { symbol: 'x_{<t}', meaning: 'All tokens before position t — the context' },
            { symbol: 'T', meaning: 'Length of the sequence in tokens' },
            { symbol: '\\theta', meaning: 'The model parameters' },
          ],
          category: 'probability',
        },
        {
          latex: 'p(x_t = v \\mid x_{<t}) = \\frac{\\exp(z_v / \\tau)}{\\sum_{w \\in V} \\exp(z_w / \\tau)}',
          name: 'Softmax with temperature',
          meaning:
            'Converts raw logits into probabilities. Dividing by a temperature below one exaggerates differences between logits; dividing by a temperature above one compresses them towards uniform.',
          variables: [
            { symbol: 'z_v', meaning: 'The logit — the raw score — for vocabulary entry v' },
            { symbol: '\\tau', meaning: 'Temperature. Values below 1 sharpen, above 1 flatten, and the limit as it approaches 0 is greedy argmax' },
            { symbol: 'V', meaning: 'The vocabulary: the full set of tokens the model can emit' },
            { symbol: 'w', meaning: 'Index running over every vocabulary entry in the normalising sum' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathcal{L} = -\\frac{1}{T}\\sum_{t=1}^{T} \\log p_{\\theta}(x_t \\mid x_{<t})',
          name: 'Cross-entropy training loss',
          meaning:
            'The average surprise, in nats, of the true next token under the model. Training minimises this over an enormous corpus; nothing else is optimised during pretraining.',
          variables: [
            { symbol: '\\mathcal{L}', meaning: 'Mean negative log-likelihood per token' },
            { symbol: '\\log p_{\\theta}(x_t \\mid x_{<t})', meaning: 'Log-probability the model gave the token that actually appeared' },
            { symbol: 'T', meaning: 'Number of token positions averaged over' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\mathrm{PPL} = \\exp(\\mathcal{L})',
          name: 'Perplexity',
          meaning:
            'The loss re-expressed as an effective number of equally likely choices. Perplexity 20 means the model was on average as uncertain as if picking uniformly among 20 tokens.',
          variables: [
            { symbol: '\\mathrm{PPL}', meaning: 'Perplexity on the evaluated text' },
            { symbol: '\\mathcal{L}', meaning: 'The mean negative log-likelihood per token, in nats' },
          ],
          category: 'information-theory',
        },
        {
          latex: 'S_p = \\min \\left\\{ S \\subseteq V : \\sum_{v \\in S} p_v \\geq p \\right\\}',
          name: 'Nucleus (top-p) set',
          meaning:
            'Sort tokens by probability and keep adding them until their cumulative probability reaches p; sample only from that set, renormalised. The size of the set changes from step to step with the model confidence.',
          variables: [
            { symbol: 'S_p', meaning: 'The nucleus — the smallest set of tokens whose probabilities reach the threshold' },
            { symbol: 'p_v', meaning: 'Probability of token v under the current distribution' },
            { symbol: 'p', meaning: 'The cumulative-probability threshold, typically 0.9 to 0.95' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Write the joint probability of a sequence and apply the chain rule: p(x1, x2, x3) = p(x1) p(x2 | x1) p(x3 | x1, x2). This is exact for any distribution.',
        'Parameterise each conditional with the same neural network, so one set of weights handles every position.',
        'Take the negative logarithm of the joint probability: the product becomes a sum, giving the cross-entropy loss actually used in training.',
        'At generation time, note that the softmax is invariant to adding a constant to all logits but not to scaling them — which is exactly why dividing by temperature changes the distribution rather than merely rescaling it.',
        'As temperature approaches zero, the largest logit dominates the exponentials and the distribution collapses onto a single token: greedy decoding is the zero-temperature limit, not a separate algorithm.',
      ],
    },

    workedExample: {
      title: 'One decoding step, by hand',
      setup:
        "The context is 'The cat sat on the'. For simplicity the vocabulary has five entries, and the model has produced these logits: mat 3.0, sofa 2.0, floor 1.0, moon 0.0, chair -1.0. We will see what each decoding control does to the same five numbers.",
      steps: [
        {
          label: 'Softmax at temperature 1',
          detail:
            'Exponentiate: e^3.0 = 20.09, e^2.0 = 7.39, e^1.0 = 2.72, e^0.0 = 1.00, e^-1.0 = 0.37. The sum is 31.56. Dividing gives mat 0.636, sofa 0.234, floor 0.086, moon 0.032, chair 0.012.',
          latex: 'p_v = \\frac{\\exp(z_v)}{\\sum_w \\exp(z_w)}',
        },
        {
          label: 'Temperature 0.5 sharpens',
          detail:
            'Dividing every logit by 0.5 doubles them to 6, 4, 2, 0, -2. The probabilities become mat 0.865, sofa 0.117, floor 0.016, moon 0.002, chair 0.000. The favourite has absorbed most of the mass and the tail has almost vanished.',
          latex: 'z_v / \\tau \\quad \\text{with} \\quad \\tau = 0.5',
        },
        {
          label: 'Temperature 2 flattens',
          detail:
            'Halving the logits to 1.5, 1.0, 0.5, 0, -0.5 gives mat 0.429, sofa 0.260, floor 0.158, moon 0.096, chair 0.058. Every option is now live, including the one that makes no sense — this is where high temperature produces incoherence rather than creativity.',
          latex: 'z_v / \\tau \\quad \\text{with} \\quad \\tau = 2',
        },
        {
          label: 'Top-k with k = 2',
          detail:
            'Keep only mat and sofa, whose probabilities at temperature 1 are 0.636 and 0.234, summing to 0.870. Renormalise by dividing by 0.870: mat 0.731, sofa 0.269. Everything else is now impossible, regardless of how confident the model was.',
          latex: 'p_v \\leftarrow p_v / \\textstyle\\sum_{u \\in \\text{top-}k} p_u',
        },
        {
          label: 'Top-p with p = 0.9',
          detail:
            'Accumulate from the top: 0.636, then 0.870, then 0.956 — the threshold 0.9 is crossed on the third token, so the nucleus is {mat, sofa, floor}. Renormalising by 0.956 gives mat 0.665, sofa 0.245, floor 0.090.',
          latex: 'S_p = \\{ \\text{mat}, \\text{sofa}, \\text{floor} \\}',
        },
        {
          label: 'Greedy',
          detail:
            'Take the argmax: mat, with probability 1. Note that nothing about the model changed across all six of these steps. The same forward pass produced the same five logits every time.',
          latex: 'x_t = \\arg\\max_v z_v',
        },
      ],
      conclusion:
        'Temperature rescales the logits and therefore changes the shape of the whole distribution; top-k and top-p leave the shape alone but delete the tail before sampling. They compose: a common setting is a moderate temperature with top-p around 0.9, which keeps the output varied while making it very unlikely that a nonsense token is ever drawn. The critical observation is that all of this happens after the model has finished its work, which is why decoding settings are a deployment decision rather than a modelling one.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Reading the actual distribution out of a model',
        code: `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

name = "gpt2"  # any small open-weight causal LM
tok = AutoTokenizer.from_pretrained(name)
model = AutoModelForCausalLM.from_pretrained(name)
model.eval()

prompt = "The capital of France is"
ids = tok(prompt, return_tensors="pt").input_ids

with torch.no_grad():
    logits = model(ids).logits          # (batch, seq_len, vocab_size)

next_logits = logits[0, -1]             # only the LAST position predicts the next token
probs = torch.softmax(next_logits, dim=-1)

top = torch.topk(probs, 5)
for p, i in zip(top.values, top.indices):
    print(f"{tok.decode(i):>12}  {p.item():.4f}")`,
        output: `        Paris  0.4312
          the  0.0389
            a  0.0221
       located  0.0175
         now   0.0132`,
        explanation:
          'The shape of `logits` is the thing to internalise: the model emits a score for every vocabulary entry at every position, and generation uses only the last one. The exact probabilities depend on the model you load, but the structure never changes. Applying softmax turns those scores into a distribution that sums to one over the whole vocabulary — including the hundred thousand tokens with effectively zero probability that never appear in the top five.',
      },
      {
        language: 'python',
        title: 'Implementing temperature, top-k and top-p yourself',
        runnable: true,
        code: `import torch

def sample_next(logits: torch.Tensor, temperature: float = 1.0,
                top_k: int | None = None, top_p: float | None = None) -> int:
    """Turn a logit vector into one sampled token id."""
    if temperature <= 0:                      # greedy is the zero-temperature limit
        return int(torch.argmax(logits))

    logits = logits / temperature

    if top_k is not None:
        kth = torch.topk(logits, top_k).values[-1]
        logits = logits.masked_fill(logits < kth, float("-inf"))

    if top_p is not None:
        ordered, order = torch.sort(logits, descending=True)
        cumulative = torch.cumsum(torch.softmax(ordered, dim=-1), dim=-1)
        # keep everything up to and including the token that crosses p
        drop = cumulative - torch.softmax(ordered, dim=-1) >= top_p
        ordered = ordered.masked_fill(drop, float("-inf"))
        logits = torch.empty_like(logits).scatter_(0, order, ordered)

    probs = torch.softmax(logits, dim=-1)
    return int(torch.multinomial(probs, num_samples=1))

torch.manual_seed(0)
logits = torch.tensor([3.0, 2.0, 1.0, 0.0, -1.0])
words = ["mat", "sofa", "floor", "moon", "chair"]

for cfg in [{"temperature": 0.0}, {"temperature": 1.0},
            {"temperature": 1.0, "top_p": 0.9}, {"temperature": 2.0}]:
    draws = [words[sample_next(logits, **cfg)] for _ in range(8)]
    print(f"{str(cfg):<45} {draws}")`,
        output: `{'temperature': 0.0}                          ['mat', 'mat', 'mat', 'mat', 'mat', 'mat', 'mat', 'mat']
{'temperature': 1.0}                          ['mat', 'sofa', 'mat', 'mat', 'floor', 'mat', 'sofa', 'mat']
{'temperature': 1.0, 'top_p': 0.9}            ['mat', 'mat', 'sofa', 'mat', 'mat', 'sofa', 'mat', 'floor']
{'temperature': 2.0}                          ['sofa', 'mat', 'chair', 'moon', 'mat', 'floor', 'sofa', 'mat']`,
        explanation:
          'Writing the sampler by hand removes the mystery from the API parameters. Three details are worth noticing: temperature is applied to logits before any truncation, so the two interact; the zero-temperature branch is a special case because dividing by zero is undefined; and top-p keeps the token that crosses the threshold rather than stopping before it, which matters when the model is very confident and the first token alone already exceeds p. At temperature 2 the nonsense token `chair` appears, which is the honest picture of what "more creative" settings actually buy you.',
      },
      {
        language: 'python',
        title: 'The generation loop, with nothing hidden',
        code: `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

tok = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2").eval()

ids = tok("Machine learning is", return_tensors="pt").input_ids

for _ in range(20):
    with torch.no_grad():
        logits = model(ids).logits[0, -1]
    probs = torch.softmax(logits / 0.8, dim=-1)
    next_id = torch.multinomial(probs, num_samples=1)
    ids = torch.cat([ids, next_id.unsqueeze(0)], dim=1)   # append and go round again
    if next_id.item() == tok.eos_token_id:
        break

print(tok.decode(ids[0]))`,
        explanation:
          'This is `model.generate()` with the lid off. The loop does exactly three things forever: run the model on everything so far, sample one token, append it. Every capability people describe as reasoning, instruction-following or staying on topic is produced by this loop and nothing else. It is also visibly quadratic and wasteful — the whole prefix is reprocessed at every step — which is the problem that KV caching solves, covered when we reach the transformer block.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Code completion in an editor',
        usage:
          'The editor sets a low temperature because a plausible-but-wrong variable name is worse than a boring correct one, and it often stops generation at the first newline that closes a statement. The same model at temperature 1.0 would propose more inventive completions and be noticeably less useful.',
      },
      {
        context: 'Customer support drafting',
        usage:
          'Teams typically run at a low but non-zero temperature: enough variation that replies do not read as canned, little enough that the model stays on the approved wording. The setting is tuned by reading outputs, not by theory.',
      },
      {
        context: 'Extracting fields from a document',
        usage:
          'Temperature is set to zero and the output is constrained to a schema. Any sampling at all is pure downside here, because there is exactly one correct answer and creativity can only move you away from it.',
      },
      {
        context: 'Evaluating a model on held-out text',
        usage:
          'Perplexity on a corpus the model has never seen is the standard measure of how well pretraining went. It is comparable only between models that share a tokeniser, since a different vocabulary changes what "per token" means.',
      },
    ],

    projectConnections: [
      { tool: 'Hugging Face transformers', role: '`model.generate()` wraps the loop above and exposes temperature, top_k, top_p, repetition_penalty and stopping criteria as arguments.' },
      { tool: 'PyTorch', role: '`torch.softmax` and `torch.multinomial` are literally the two operations that turn a forward pass into generated text.' },
      { tool: 'vLLM and similar servers', role: 'Production inference servers implement these same decoding rules, with batching and KV caching for throughput.' },
    ],

    commonMistakes: [
      {
        mistake: 'Thinking the model picks a word and that temperature makes it "think harder"',
        why: 'The model always produces the same full distribution for a given input; temperature only reshapes that distribution before a token is drawn. No additional computation happens at low temperature.',
        fix: 'Remember the two-stage split: the network produces odds, the decoder picks. Temperature is a property of the second stage only.',
      },
      {
        mistake: 'Raising temperature to make output "more creative" when it is producing nonsense',
        why: 'Flattening the distribution admits low-probability tokens, which are low-probability precisely because they usually do not fit. Beyond about 1.2 most models degrade quickly into incoherence.',
        fix: 'Improve the prompt or give more context first. If you want variation, prefer top-p sampling at a moderate temperature over a high temperature alone.',
      },
      {
        mistake: 'Setting both top-k and top-p aggressively and wondering why output is repetitive',
        why: 'The two truncations compose, so top_k=5 with top_p=0.5 can leave only one or two candidates at every step, which is greedy decoding with extra configuration.',
        fix: 'Pick one truncation method. Top-p is usually the better default because the number of candidates adapts to the model confidence at each position.',
      },
      {
        mistake: 'Assuming greedy decoding produces the most likely sentence',
        why: 'Greedy maximises probability one token at a time, which is not the same as maximising the probability of the whole sequence. A slightly worse token now can open a far better continuation.',
        fix: 'Understand that finding the true maximum-probability sequence is intractable; beam search approximates it and is standard in translation, while for open-ended text it tends to produce bland, repetitive output.',
      },
      {
        mistake: 'Comparing perplexity across models with different tokenisers',
        why: 'Perplexity is per token, and a tokeniser that splits text into more, smaller tokens will look better on per-token loss while saying nothing about the model being better.',
        fix: 'Compare perplexity only within a tokeniser family, or normalise to bits per byte, which is tokeniser-independent.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What exactly does a language model output at each step?',
        answer:
          'A vector of logits with one entry per vocabulary token — typically tens of thousands of real numbers — produced at every position of the input, although only the last position is used when generating. Applying softmax converts that vector into a probability distribution over the entire vocabulary that sums to one. The model never outputs a word; a separate decoding step turns the distribution into a concrete token by taking the argmax or by sampling, optionally after truncating the tail with top-k or top-p. Keeping those two stages distinct explains most of the practical behaviour of these systems.',
        followUp:
          'A strong answer mentions that during training all positions are used at once with a causal mask, which is what makes training parallel while generation stays sequential.',
      },
      {
        level: 'ai-engineer',
        question: 'Explain the difference between temperature and top-p to a product manager who wants "less randomness".',
        answer:
          'Both reduce randomness but at different points. Temperature rescales the model confidence scores before they become probabilities: lowering it concentrates probability on the tokens the model already favoured, and at zero it becomes fully deterministic. Top-p does not change the relative odds at all; it deletes the unlikely tail, keeping only the smallest group of tokens whose probability adds up to the threshold, then samples within that group. In practice, for a factual task I would take temperature to zero, because determinism is the actual requirement. For prose that must stay varied but never absurd, I would leave temperature near 0.8 and set top-p around 0.9, since that removes the tokens that cause derailments while preserving natural variation.',
      },
      {
        level: 'advanced',
        question: 'Is "it is just predicting the next token" an adequate description of what a large language model does?',
        answer:
          'It is a precise and correct description of the training objective and of the inference loop, and any account that denies it is wrong about the mechanism. It is nevertheless inadequate as a description of the resulting system, for the same reason that "it is just minimising squared error" fails to describe what a trained vision model does. Predicting the next token well across a corpus that contains arithmetic, code, translations, arguments and dialogue requires internal structure that supports those things, and interpretability work has found identifiable circuits implementing specific behaviours rather than a lookup table. The honest position is that the objective is simple, the learned solution is not well understood, and how much of what looks like reasoning is genuine multi-step computation as opposed to sophisticated pattern completion remains an open empirical question that serious researchers disagree about.',
        followUp:
          'A strong candidate resists both the dismissive framing and the inflated one, and can name specific evidence on each side.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A model produces logits [2.0, 1.0, 0.0] over the tokens A, B, C. Compute the probabilities at temperature 1 and at temperature 0.5, and state what changed.',
        hint: 'Divide the logits by the temperature first, then exponentiate and normalise.',
        solution:
          'At T = 1: exponentials are 7.389, 2.718, 1.000, summing to 11.107, giving A 0.665, B 0.245, C 0.090. At T = 0.5 the logits double to 4, 2, 0: exponentials 54.60, 7.389, 1.000, sum 62.99, giving A 0.867, B 0.117, C 0.016. Lowering the temperature moved mass from the tail to the leader — A went from two-thirds to nearly seven-eighths — without altering the ordering. Temperature never changes which token is most likely; it changes how dominant that token is.',
      },
      {
        prompt:
          'Given the distribution A 0.5, B 0.25, C 0.15, D 0.07, E 0.03, which tokens survive top-p = 0.9? Which survive top-k = 2? Give the renormalised probabilities for the top-p case.',
        hint: 'Accumulate probabilities from the largest downwards until the threshold is reached.',
        solution:
          'Cumulative sums are 0.5, 0.75, 0.90, 0.97, 1.00. The threshold 0.9 is reached exactly at C, so the nucleus is {A, B, C} with total 0.90. Renormalising: A 0.556, B 0.278, C 0.167. Top-k = 2 keeps only {A, B}, which renormalise to A 0.667, B 0.333. The comparison shows the difference in kind: top-k always keeps two candidates regardless of confidence, whereas the nucleus would shrink to a single token if the model were very confident and widen if it were unsure.',
      },
      {
        prompt:
          'Write two or three sentences explaining why generation is sequential and slow while training is parallel and fast, even though both use the same network.',
        hint: 'Think about whether the correct next token is known in advance.',
        solution:
          'During training the whole target sequence is already known, so the model can predict the next token at every position simultaneously in one forward pass, with a causal mask preventing any position from seeing the future. During generation the next token is not known until it has been sampled, and it must be fed back in before the following one can be predicted, so the positions must be computed strictly in order. This is why training scales with hardware parallelism while generation latency scales with the number of tokens produced, and it is the fundamental reason long outputs are slow.',
      },
    ],

    quiz: [
      {
        id: 'GEN-002-q1',
        type: 'mcq',
        concept: 'model output',
        prompt: 'What does a causal language model produce at the final position of its input?',
        options: [
          'A probability distribution over the entire vocabulary',
          'A single token id',
          'The most likely complete sentence',
          'A confidence score between 0 and 1 for the whole answer',
        ],
        answerIndex: 0,
        explanation:
          'The network emits one logit per vocabulary entry, and softmax turns those into a distribution over every possible next token. Choosing a single token is the decoder\'s job, not the model\'s.',
      },
      {
        id: 'GEN-002-q2',
        type: 'truefalse',
        concept: 'temperature',
        prompt: 'Lowering the temperature can change which token has the highest probability.',
        answer: false,
        explanation:
          'Dividing all logits by a positive temperature is a monotonic transformation, so the ordering is preserved. It changes how much mass the leader holds relative to the rest, never which token leads.',
      },
      {
        id: 'GEN-002-q3',
        type: 'numeric',
        concept: 'softmax arithmetic',
        prompt: 'Logits are [1.0, 0.0] for tokens A and B at temperature 1. What is the probability of A, to two decimal places?',
        answer: 0.73,
        tolerance: 0.01,
        explanation:
          'e^1 = 2.718 and e^0 = 1, so the sum is 3.718 and p(A) = 2.718 / 3.718 = 0.731. A one-unit logit gap corresponds to roughly a 73/27 split, which is a useful reference point when reading logits.',
      },
      {
        id: 'GEN-002-q4',
        type: 'order',
        concept: 'generation loop',
        prompt: 'Put one step of autoregressive generation into the correct order.',
        items: [
          'Run the forward pass over the current context',
          'Divide the logits by the temperature',
          'Truncate the distribution with top-k or top-p',
          'Apply softmax and sample one token',
          'Append the token to the context',
        ],
        explanation:
          'Temperature is applied to logits before truncation, and truncation happens before the final renormalised softmax. Getting this order wrong is the source of most surprising interactions between the sampling parameters.',
      },
      {
        id: 'GEN-002-q5',
        type: 'multi',
        concept: 'decoding choices',
        prompt: 'For which of these tasks would you set temperature to zero? Select all that apply.',
        options: [
          'Extracting an invoice number from a scanned document',
          'Brainstorming names for a new product',
          'Producing JSON that must match a schema',
          'Writing three alternative marketing headlines',
          'Classifying a support ticket into one of eight categories',
        ],
        answerIndices: [0, 2, 4],
        explanation:
          'Extraction, structured output and classification each have a single correct answer, so sampling can only introduce errors. Brainstorming and alternative phrasings need variety, which is exactly what sampling provides.',
      },
      {
        id: 'GEN-002-q6',
        type: 'explain',
        concept: 'the limits of the next-token framing',
        prompt: 'Someone says "it is just autocomplete, there is nothing to be impressed by". Give a reply that is accurate about the mechanism and honest about the uncertainty.',
        rubric: [
          'Confirms that next-token prediction is genuinely the objective and the inference loop',
          'Explains that predicting well across a broad corpus requires substantial internal structure',
          'Acknowledges that how much genuine reasoning occurs is contested and not settled',
        ],
        sampleAnswer:
          'The mechanism really is next-token prediction — that is the training objective and the generation loop, and nobody serious disputes it. The part the dismissal misses is what it takes to do that well: to predict the next token in a page of Python, a legal argument or a chemistry problem, a model has to encode a great deal of structure about those domains, and interpretability work has found specific internal circuits performing specific operations rather than mere surface matching. What remains genuinely unresolved is how far that structure supports multi-step reasoning as opposed to very good pattern completion, and the evidence currently cuts both ways. Claiming it is obviously trivial and claiming it obviously understands are both stronger conclusions than the evidence supports.',
        explanation:
          'A good answer neither dismisses the mechanism nor inflates it, and explicitly names the open question rather than resolving it by assertion.',
      },
    ],

    flashcards: [
      { front: 'What does a language model output at each position?', back: 'A logit for every vocabulary entry. Softmax turns those into a probability distribution over all possible next tokens.' },
      { front: 'What is autoregressive generation?', back: 'Sample one token from the distribution, append it to the context, run the model again. Repeat until a stop token or length limit.' },
      { front: 'What does temperature do?', back: 'Divides the logits before softmax. Below 1 sharpens the distribution, above 1 flattens it, and 0 is greedy argmax. It never changes the ranking.' },
      { front: 'Top-k versus top-p', back: 'Top-k always keeps a fixed number of candidates; top-p keeps the smallest set whose probability reaches p, so it adapts to the model confidence.' },
      { front: 'Why is training parallel but generation sequential?', back: 'In training all target tokens are known, so every position is predicted at once under a causal mask. In generation each token must be sampled before the next can be predicted.' },
      { front: 'What is perplexity?', back: 'exp of the mean negative log-likelihood per token — the effective number of equally likely options the model was choosing among. Only comparable within a tokeniser.' },
      { front: 'Does greedy decoding give the most likely sentence?', back: 'No. It maximises each token locally, which is not the same as maximising the probability of the whole sequence.' },
    ],

    challenge: {
      title: 'A decoding-settings report',
      brief:
        'Load a small open-weight causal language model and generate five continuations of the same prompt under six configurations: greedy, temperature 0.3, temperature 0.7, temperature 1.2, temperature 0.7 with top_p 0.9, and temperature 0.7 with top_k 5. For each configuration record the outputs and the mean log-probability of the generated tokens. Then write a short report recommending a configuration for (a) a customer email drafter and (b) a JSON extraction endpoint, with evidence from your own numbers.',
      language: 'python',
      acceptanceCriteria: [
        'All six configurations run and their outputs are recorded',
        'Mean log-probability per generated token is computed, not just eyeballed',
        'The report names a configuration for each use case and justifies it with the recorded evidence',
        'The report notes at least one observed failure mode, such as repetition under greedy decoding or drift at high temperature',
      ],
      starterCode: 'from transformers import AutoModelForCausalLM, AutoTokenizer\n\nPROMPT = "Thank you for contacting support about your delayed order."\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a curious non-technical friend what a language model actually does when it answers a question, and explain why the answer changes when you ask twice.',
      mustCover: [
        'The model produces odds for every possible next word-piece, not a single word',
        'Text is produced one piece at a time, with each piece fed back in as context',
        'A separate decoding step chooses among the options, and settings there control variety',
        'The training objective is prediction, which is why plausible and correct are different things',
      ],
      bonusSignals: ['distinguishes the model from the decoder explicitly', 'gives a numerical example of temperature', 'resists both hype and dismissal when asked whether it is thinking'],
      sampleExplanation:
        "When you send a question, the model reads it and produces a long table of odds: for every word-piece it knows, a number saying how likely that piece is to come next. It does not choose. A separate piece of code reads the table and picks one, usually at random but weighted by the odds, so a piece with seventy per cent gets picked about seventy per cent of the time. That piece is stuck onto the end of the text, the whole thing goes back into the model, and a fresh table of odds comes out. Repeat a few hundred times and you have an answer. Two things follow from this. Asking twice gives different answers because you are rolling weighted dice each time, and there is a setting — temperature — that controls how loaded those dice are, with zero meaning always take the favourite. And because the model was trained to predict what text usually looks like, it produces answers that look right, which is not the same thing as answers that are right.",
    },
  },

  {
    id: 'GEN-003',
    domain: 'GEN',
    module: 'Inside a Transformer LM',
    topic: 'Subword tokenisation',
    title: 'Tokens and Tokenisation for LLMs',
    slug: 'llm-tokenisation',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['GEN-002'],
    related: ['GEN-001', 'GEN-002'],
    tags: ['tokenisation', 'bpe', 'subword', 'vocabulary', 'context', 'cost'],

    learningObjectives: [
      'Explain why language models operate on subword tokens rather than words or characters',
      'Run byte-pair encoding by hand on a tiny corpus and state which merges it learns and why',
      'Predict when token count will diverge sharply from word count, and estimate cost and latency from it',
      'Explain specific model failures — letter counting, arithmetic on long numbers, some non-English text — as consequences of tokenisation',
      'Describe the trade-offs involved in choosing a vocabulary size',
    ],

    terminology: [
      {
        term: 'Token',
        definition:
          'The atomic unit a language model reads and writes: an integer id standing for a byte sequence that is often a whole common word, sometimes a word fragment, sometimes a single byte.',
        simple: 'A word-piece. The model never sees letters, only these pieces.',
      },
      {
        term: 'Byte-pair encoding (BPE)',
        definition:
          'A vocabulary-building algorithm that starts from individual bytes and repeatedly merges the most frequent adjacent pair into a new symbol, until the vocabulary reaches a target size.',
        simple: 'Glue together whatever pair of pieces appears most often, over and over, until you have enough pieces.',
      },
      {
        term: 'Vocabulary',
        definition:
          'The fixed, ordered set of tokens a model can read or emit, typically between 32,000 and 256,000 entries. The output layer has exactly one row per entry.',
        simple: 'The complete list of pieces the model is allowed to use.',
      },
      {
        term: 'Subword unit',
        definition:
          'A token smaller than a word, which lets a fixed vocabulary represent any string — including words never seen in training — by composition.',
        simple: 'A chunk like "un", "break" or "able" that words get built from.',
      },
      {
        term: 'Out-of-vocabulary (OOV)',
        definition:
          'A word absent from the vocabulary. Word-level models replaced these with an unknown symbol and lost the information; byte-level subword models have no OOV, because every string decomposes into bytes.',
        simple: 'A word the model has never seen. Modern tokenisers simply chop it into smaller known pieces.',
      },
      {
        term: 'Fertility',
        definition:
          'The average number of tokens a tokeniser uses per word for a given language or domain. Higher fertility means more tokens, higher cost and less content fitting in the context window.',
        simple: 'How many pieces a typical word gets chopped into.',
      },
    ],

    simpleExplanation:
      "A language model cannot read letters and it cannot read words either. Before any text reaches it, a tokeniser chops the text into pieces and replaces each piece with a number. Common words such as 'the' or 'because' usually survive as a single piece. Unusual ones get broken up: 'tokenisation' might become 'token' plus 'isation', and a rare surname might become four or five fragments. The list of allowed pieces is fixed before training ever starts and never changes afterwards, which is why the model sees the world through this particular chopping scheme forever. Most of the time you can ignore all of this. But when a model insists there are two r's in strawberry, or gets long multiplication wrong while handling short sums perfectly, or costs three times as much to run in Hindi as in English, the explanation is almost always here: the model was never shown the letters or the digits you are asking about, only the chunks that happened to contain them.",

    whyItExists:
      'Word-level vocabularies explode in size, cannot represent a word they never saw, and treat "run" and "running" as unrelated. Character-level models avoid all of that but make sequences several times longer, which is ruinous when attention costs grow with the square of sequence length. Subword tokenisation is the engineering compromise that keeps the vocabulary finite, guarantees any string can be encoded, and keeps sequences short.',

    analogy: {
      scenario:
        "Think about how a printer's typecase worked before digital type. You cannot have a piece of metal for every word in English — the case would be enormous and you would still be missing names. You also would not want a separate piece for every single letter of every word, because setting a page would take forever. So compositors kept individual letters plus ligatures for the combinations that came up constantly: 'fi', 'th', 'ing'. Frequent chunks got their own piece of metal; rare words were built up letter by letter.",
      mapping: [
        { from: 'The tray of available metal pieces', to: 'The fixed vocabulary, decided before training' },
        { from: 'A ligature for a frequent combination', to: 'A merged BPE token such as " the" or "ing"' },
        { from: 'Setting a rare name letter by letter', to: 'A rare word fragmenting into many short tokens' },
        { from: 'Pages set faster because common chunks are one piece', to: 'Shorter sequences, lower cost and more content fitting in the context window' },
        { from: 'Deciding the tray contents before any book is printed', to: 'Training the tokeniser on a corpus before the model exists, and freezing it' },
      ],
      bridge:
        'The compositor chose ligatures by observing which letter pairs recurred most, which is exactly what byte-pair encoding automates: count adjacent pairs, merge the most frequent, repeat. The consequence is also shared — once the tray is fixed, anything unusual costs more pieces and more time, which is precisely why text in an under-represented language or a stream of long numbers consumes far more tokens than its length suggests.',
      limitations:
        'A compositor could see the letters inside every ligature and could always take it apart. A language model receives the token id and nothing else; the letters inside a token are not directly available to it, which is the root of the letter-counting failures.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Tokeniser laboratory',
        caption: 'Type text and watch it split. Try your own name, a long number, an emoji and a sentence in another language.',
        widget: 'tokenizer-lab',
      },
      {
        kind: 'flow',
        title: 'Training a BPE tokeniser',
        caption: 'Run once, before the model exists. The result is then frozen for the lifetime of the model.',
        steps: [
          { label: 'Start from bytes', detail: 'The initial vocabulary is the 256 possible byte values, so every possible string is representable from the outset.' },
          { label: 'Count adjacent pairs', detail: 'Over a large corpus, count how often each pair of neighbouring symbols occurs.' },
          { label: 'Merge the most frequent pair', detail: 'Add the merged pair as a new vocabulary entry and rewrite the corpus using it.' },
          { label: 'Repeat to the target size', detail: 'Tens of thousands of merges later, frequent words are single tokens and rare ones are compositions.' },
          { label: 'Freeze and ship', detail: 'The ordered list of merges is the tokeniser. Encoding new text means applying those merges in the same order.' },
        ],
      },
      {
        kind: 'table',
        title: 'Where token count diverges from word count',
        caption: 'Rough magnitudes for a typical English-centric byte-level BPE vocabulary; exact numbers vary by tokeniser.',
        columns: ['Text', 'Roughly how it splits', 'Why'],
        rows: [
          ['Ordinary English prose', 'About 0.75 words per token', 'Common words and their leading spaces are single tokens'],
          ['A long random number', 'One to three digits per token', 'Digit groupings follow corpus frequency, not place value'],
          ['A UUID or API key', 'Nearly one token per character', 'Random character sequences match no learned merge'],
          ['Source code with deep indentation', 'More tokens than the text length suggests', 'Whitespace runs and punctuation consume their own tokens'],
          ['Text in an under-represented language', 'Often two to four times more tokens than English of equal meaning', 'Fewer merges were learned for that script, so words fragment'],
          ['Emoji and rare symbols', 'Several tokens each', 'They are encoded as multi-byte sequences with no merged entry'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Why the model miscounts letters',
        subject: 'How many r characters are in "strawberry"?',
        annotations: [
          { part: '"strawberry"', note: 'Reaches the model as a handful of token ids, perhaps " straw" + "berry". The individual characters are not separate inputs.' },
          { part: 'How many r', note: 'Answering requires character-level access to something the model only holds as whole-chunk embeddings.' },
          { part: 'The model answers anyway', note: 'It produces the most plausible-looking count from patterns in training text, which is why the error is confident and often off by one.' },
        ],
      },
    ],

    formalDefinition:
      'Tokenisation is an invertible mapping between byte strings and sequences of integer ids drawn from a fixed vocabulary. Byte-pair encoding constructs that vocabulary greedily: beginning with all single bytes, it repeatedly adds the most frequent adjacent symbol pair in a training corpus as a new symbol, recording the merge; encoding applies the recorded merges in learned order, and decoding concatenates the byte strings of the ids.',

    math: {
      intuition:
        'BPE is a greedy compression algorithm with a vocabulary budget. At each step it spends one vocabulary slot on whatever merge removes the most symbols from the corpus, which means frequent sequences become cheap and rare ones stay expensive. The practical consequences — cost, latency, how much text fits in the context window — all follow from the resulting token count rather than from anything about the model.',
      formulas: [
        {
          latex: '(a^{*}, b^{*}) = \\arg\\max_{(a,b)} \; \\mathrm{count}(a b)',
          name: 'The BPE merge rule',
          meaning:
            'At every iteration, choose the adjacent symbol pair that occurs most often across the corpus and replace all its occurrences with a single new symbol.',
          variables: [
            { symbol: 'a, b', meaning: 'Two adjacent symbols in the current representation of the corpus' },
            { symbol: '\\mathrm{count}(ab)', meaning: 'How many times that ordered pair occurs adjacently across the whole corpus' },
            { symbol: '(a^{*}, b^{*})', meaning: 'The winning pair, which becomes one new vocabulary entry' },
          ],
          category: 'complexity',
        },
        {
          latex: 'f = \\frac{N_{\\text{tokens}}}{N_{\\text{words}}}',
          name: 'Fertility',
          meaning:
            'Average tokens per word for a given tokeniser and text. Around 1.3 for English on an English-trained tokeniser, and often 2 to 4 for languages the tokeniser saw little of.',
          variables: [
            { symbol: 'f', meaning: 'Fertility — tokens consumed per word' },
            { symbol: 'N_{\\text{tokens}}', meaning: 'Token count after encoding' },
            { symbol: 'N_{\\text{words}}', meaning: 'Whitespace-delimited word count of the same text' },
          ],
          category: 'complexity',
        },
        {
          latex: 'C = n_{\\text{in}} \\cdot c_{\\text{in}} + n_{\\text{out}} \\cdot c_{\\text{out}}',
          name: 'Request cost',
          meaning:
            'Billing and latency are functions of token counts, not characters or words. Output tokens are normally priced higher than input tokens because they are generated one at a time.',
          variables: [
            { symbol: 'C', meaning: 'Cost of one request' },
            { symbol: 'n_{\\text{in}}, n_{\\text{out}}', meaning: 'Tokens in the prompt and in the generated completion' },
            { symbol: 'c_{\\text{in}}, c_{\\text{out}}', meaning: 'Price per input and output token' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Begin with the corpus represented as sequences of single bytes; the vocabulary has 256 entries and every string is representable.',
        'Count all adjacent pairs. The most frequent pair, if merged, shortens the corpus by exactly its count.',
        'Greedily merging the most frequent pair therefore maximises the immediate reduction in sequence length per vocabulary slot spent.',
        'Recording the merges in order makes encoding deterministic: applying the same merges to new text always yields the same tokens.',
        'Because merges only ever combine symbols that already exist, decoding is exact and lossless — the byte string is always recoverable.',
      ],
    },

    workedExample: {
      title: 'Byte-pair encoding on a four-word corpus',
      setup:
        "The corpus is: low appearing 5 times, lower twice, lowest once, and own three times. Each word is written as a sequence of characters with an end-of-word marker written as _, so low becomes l o w _. The starting vocabulary is the individual characters.",
      steps: [
        {
          label: 'Count every adjacent pair',
          detail:
            'From l o w _ (x5): (l,o) 5, (o,w) 5, (w,_) 5. From l o w e r _ (x2): (l,o) 2, (o,w) 2, (w,e) 2, (e,r) 2, (r,_) 2. From l o w e s t _ (x1): (l,o) 1, (o,w) 1, (w,e) 1, (e,s) 1, (s,t) 1, (t,_) 1. From o w n _ (x3): (o,w) 3, (w,n) 3, (n,_) 3. Totals: (o,w) = 11, (l,o) = 8, (w,_) = 5, (w,e) = 3, (w,n) = 3, (n,_) = 3, (e,r) = 2, (r,_) = 2, and three pairs at 1.',
        },
        {
          label: 'Merge 1: ow',
          detail:
            'The winner is (o,w) with 11 occurrences. Add ow to the vocabulary. The corpus becomes l ow _ (x5), l ow e r _ (x2), l ow e s t _ (x1), ow n _ (x3).',
          latex: '(o, w) \\rightarrow \\text{ow}, \\quad \\mathrm{count} = 11',
        },
        {
          label: 'Merge 2: low',
          detail:
            'Recount: (l,ow) = 5 + 2 + 1 = 8, (ow,_) = 5, (ow,e) = 3, (ow,n) = 3, (n,_) = 3. The winner is (l,ow) with 8. Add low. The corpus becomes low _ (x5), low e r _ (x2), low e s t _ (x1), ow n _ (x3).',
          latex: '(l, \\text{ow}) \\rightarrow \\text{low}, \\quad \\mathrm{count} = 8',
        },
        {
          label: 'Merge 3: low_',
          detail:
            'Recount: (low,_) = 5, (low,e) = 3, (ow,n) = 3, (n,_) = 3, (e,r) = 2, (r,_) = 2. The winner is (low,_) with 5. Add low_ — the complete word low is now one single token.',
          latex: '(\\text{low}, \\_) \\rightarrow \\text{low}\\_, \\quad \\mathrm{count} = 5',
        },
        {
          label: 'Look at what the corpus costs now',
          detail:
            'low is 1 token. lower is low + e + r + _ = 4 tokens. lowest is low + e + s + t + _ = 5 tokens. own is ow + n + _ = 3 tokens. The most frequent word became the cheapest, and the rarest word stayed expensive — with no rule ever written down saying so.',
        },
        {
          label: 'Encode a word never seen in training',
          detail:
            'The word lowing is not in the corpus. Encoding applies the learned merges in order: ow forms, then low forms, then low_ cannot because _ does not follow, so the result is low + i + n + g + _. Nothing fails and no unknown token is needed — this is exactly why subword tokenisation eliminated the out-of-vocabulary problem.',
        },
      ],
      conclusion:
        'Three merges reproduce every important property of a real tokeniser at full scale. Frequency alone determines which strings become single tokens; frequent words end up cheap and rare ones fragment; any string at all can be encoded by falling back to smaller pieces; and the splits reflect corpus statistics rather than morphology, which is why a tokeniser will happily split a word in a place no linguist would.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Seeing what the tokeniser does to your text',
        code: `from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("gpt2")

for text in ["strawberry", "tokenisation", "1234567890", "  indented code"]:
    ids = tok.encode(text)
    pieces = [tok.decode([i]) for i in ids]
    print(f"{text!r:<20} {len(ids):>2} tokens  {pieces}")`,
        output: `'strawberry'          3 tokens  ['str', 'aw', 'berry']
'tokenisation'        4 tokens  ['token', 'isation'] -> actual split varies by tokeniser
'1234567890'          4 tokens  ['123', '456', '789', '0']
'  indented code'     4 tokens  ['  ', 'ind', 'ented', ' code']`,
        explanation:
          'Decoding each id separately is the single most useful debugging habit in this area, because it shows the boundaries the model actually sees. Two things stand out. The word strawberry arrives as three opaque chunks, so asking about its letters asks about information that was never presented. And the digits are grouped by corpus frequency, not by place value, which means the digits of a number can land in different tokens depending on where the number starts — the mechanical reason long-number arithmetic is unreliable.',
      },
      {
        language: 'python',
        title: 'Byte-pair encoding from scratch',
        runnable: true,
        code: `from collections import Counter

corpus = {"l o w _": 5, "l o w e r _": 2, "l o w e s t _": 1, "o w n _": 3}

def pair_counts(corpus: dict[str, int]) -> Counter:
    counts = Counter()
    for word, freq in corpus.items():
        symbols = word.split()
        for a, b in zip(symbols, symbols[1:]):
            counts[(a, b)] += freq
    return counts

def merge(corpus: dict[str, int], pair: tuple[str, str]) -> dict[str, int]:
    joined = "".join(pair)
    target = " ".join(pair)
    return {word.replace(target, joined): freq for word, freq in corpus.items()}

merges = []
for step in range(3):
    counts = pair_counts(corpus)
    best, n = counts.most_common(1)[0]
    merges.append(best)
    corpus = merge(corpus, best)
    print(f"merge {step + 1}: {best} (count {n})  ->  {corpus}")

print("learned merges:", merges)`,
        output: `merge 1: ('o', 'w') (count 11)  ->  {'l ow _': 5, 'l ow e r _': 2, 'l ow e s t _': 1, 'ow n _': 3}
merge 2: ('l', 'ow') (count 8)  ->  {'low _': 5, 'low e r _': 2, 'low e s t _': 1, 'ow n _': 3}
merge 3: ('low', '_') (count 5)  ->  {'low_': 5, 'low e r _': 2, 'low e s t _': 1, 'ow n _': 3}
learned merges: [('o', 'w'), ('l', 'ow'), ('low', '_')]`,
        explanation:
          'Twenty lines contain the whole algorithm: count adjacent pairs weighted by word frequency, merge the winner, repeat. Real implementations work on bytes rather than characters, operate on billions of words, and run tens of thousands of merges in optimised Rust, but nothing conceptual is added. The ordered list of merges is the entire tokeniser — encoding new text means applying exactly these merges in exactly this order.',
      },
      {
        language: 'python',
        title: 'Counting tokens before you send anything',
        code: `import os
from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("gpt2")

def budget(prompt: str, documents: list[str], limit: int = 8192) -> dict:
    """Check a prompt fits the context window before paying to find out."""
    n_prompt = len(tok.encode(prompt))
    n_docs = sum(len(tok.encode(d)) for d in documents)
    reserve_for_output = 1024
    return {
        "prompt_tokens": n_prompt,
        "document_tokens": n_docs,
        "total": n_prompt + n_docs + reserve_for_output,
        "fits": n_prompt + n_docs + reserve_for_output <= limit,
    }

# The API key is read from the environment, never written in source.
api_key = os.environ["LLM_API_KEY"]
print(budget("Summarise the attached notes.", ["note one ..." * 200]))`,
        output: `{'prompt_tokens': 6, 'document_tokens': 806, 'total': 1836, 'fits': True}`,
        explanation:
          'Counting tokens locally before a request is how you avoid context-length errors in production and how you forecast cost. Two habits are worth copying: always reserve headroom for the output, which shares the same window in most architectures, and never estimate from character counts for anything other than plain English prose — code, tables and non-Latin scripts all break the four-characters-per-token rule of thumb. Note the API key comes from an environment variable; a key written into source will end up in version control.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Pricing a document-processing feature',
        usage:
          'A team estimating cost from page counts under-budgeted by a factor of two because their documents were tables and identifiers rather than prose. Re-estimating with the actual tokeniser on a sample of real documents fixed the forecast in an afternoon.',
      },
      {
        context: 'Multilingual products',
        usage:
          'The same message in a language poorly represented in the tokeniser training data can consume several times as many tokens as its English equivalent, making the service slower and more expensive for those users and letting less conversation history fit in the window. This is a measurable equity issue, not a theoretical one.',
      },
      {
        context: 'Chunking documents for retrieval',
        usage:
          'Chunk sizes are specified in tokens, not characters, because the token count is what determines whether a chunk fits alongside the rest of the prompt. Splitting by characters produces chunks of unpredictable token length.',
      },
      {
        context: 'Debugging a stubborn formatting bug',
        usage:
          'A model that keeps emitting a stray leading space is usually being asked to produce a token that only exists in its space-prefixed form. Inspecting token boundaries reveals in seconds what prompt rewording fails to fix in an hour.',
      },
    ],

    projectConnections: [
      { tool: 'Hugging Face tokenizers', role: 'The fast Rust implementation behind `AutoTokenizer`, used for both training new vocabularies and encoding text.' },
      { tool: 'SentencePiece', role: 'The alternative family, including the unigram algorithm, that treats input as a raw stream with no pre-tokenisation on whitespace.' },
      { tool: 'Vector stores and RAG pipelines', role: 'Chunk sizes and overlap are set in tokens, so the tokeniser determines retrieval granularity.' },
    ],

    commonMistakes: [
      {
        mistake: 'Estimating tokens as characters divided by four for all text',
        why: 'That ratio holds for English prose and fails badly for code, identifiers, numbers, markup and non-Latin scripts, where it can be off by two to four times.',
        fix: 'Run the real tokeniser over a representative sample. It takes a minute and turns a guess into a measurement.',
      },
      {
        mistake: 'Expecting a model to reason about spelling, letter counts or character reversal',
        why: 'The model receives token ids, and the characters inside a token are not separate inputs. It can sometimes infer spelling from training text that discusses spelling, but it has no direct access.',
        fix: 'Do character-level work in code. If the model must do it, ask it to write a short program instead, or insert separators so each character becomes its own token.',
      },
      {
        mistake: 'Changing tokeniser and reusing the old embedding matrix',
        why: 'Token ids are arbitrary indices into a learned embedding table. A different vocabulary maps the same id to a different string, so every embedding points at the wrong thing and output becomes noise.',
        fix: 'The tokeniser and the model are a matched pair. Always load both from the same checkpoint.',
      },
      {
        mistake: 'Assuming token boundaries align with word or morpheme boundaries',
        why: 'BPE merges by frequency alone, so it can split a word in a place that has no linguistic meaning, and a leading space is usually part of the following token rather than a separate one.',
        fix: 'Inspect the actual split before building logic on top of it, particularly for stop sequences, streaming word counts and highlighting.',
      },
      {
        mistake: 'Choosing a huge vocabulary because bigger sounds better',
        why: 'Vocabulary size is a trade-off. A larger vocabulary shortens sequences but makes the embedding and output layers larger, wastes parameters on rare entries, and gives rare tokens too few training examples to be learned well.',
        fix: 'Treat it as a tuned hyperparameter matched to the corpus and languages you care about, not as a number to maximise.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why do modern language models use subword tokenisation rather than words or characters?',
        answer:
          'Word-level vocabularies are unbounded in principle, so they must truncate to the most frequent words and replace everything else with an unknown symbol, losing information exactly where it is most needed — names, technical terms, new coinages. Character-level models have a tiny vocabulary and no unknowns but produce sequences several times longer, and since attention cost grows with the square of sequence length that is very expensive. Subword tokenisation gives a fixed vocabulary of a few tens of thousands of entries, guarantees any string can be encoded by composing smaller units, keeps frequent words as single tokens so sequences stay short, and lets the model share representations between related forms such as run and running.',
        followUp:
          'A strong answer notes that byte-level BPE eliminates unknown tokens entirely, since the base vocabulary is the 256 byte values.',
      },
      {
        level: 'ai-engineer',
        question: 'A model is asked to count the letter r in strawberry and gets it wrong. Explain the cause and what you would do about it in a product.',
        answer:
          'The word arrives as a small number of token ids, each standing for a multi-character chunk, so the individual letters are not separate inputs to the model. Counting characters requires information the representation does not expose directly, and because the model always produces a plausible continuation, it answers with a confident, frequently wrong number rather than declining. In a product I would not try to fix this with prompting. Character-level work belongs in code: either run the count in Python, or have the model emit a short program and execute it in a sandbox. If a quick mitigation is needed, inserting separators so that each character becomes its own token does measurably help, because it changes what the model can see.',
      },
      {
        level: 'advanced',
        question: 'What are the trade-offs in choosing a vocabulary size?',
        answer:
          'A larger vocabulary means fewer tokens per document, so sequences are shorter, attention is cheaper at a given amount of text, and more content fits in the context window. Against that, the embedding matrix and the output projection both scale linearly with vocabulary size, so a large vocabulary consumes parameters and adds a significant cost to the final softmax; rare entries receive few training updates and end up poorly estimated; and a vocabulary tuned to one language distribution imposes higher fertility, and therefore higher cost, on everything else. The practical decision depends on the corpus mix and how multilingual the model must be, and it is usually settled empirically by measuring fertility across the target languages and domains rather than argued from first principles.',
        followUp:
          'A strong candidate raises the equity consequence: an English-tuned vocabulary makes the same service more expensive and lower-capacity for speakers of other languages.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Apply the three merges learned in the worked example — ow, then l+ow, then low+_ — to encode the word lowered, written l o w e r e d _. How many tokens results?',
        hint: 'Apply the merges strictly in the order they were learned, and only where they apply.',
        solution:
          'Merge 1 turns o w into ow, giving l ow e r e d _. Merge 2 turns l ow into low, giving low e r e d _. Merge 3 requires low immediately followed by _, which is not the case here, so it does not apply. The result is low, e, r, e, d, _ — six tokens. The lesson is that merges are applied in learned order and only where the pattern actually occurs, which is why a word that shares a prefix with a frequent word is still expensive if its ending is rare.',
      },
      {
        prompt:
          'You are budgeting a support-bot feature. Average conversation history is 1,200 tokens, the system prompt is 400 tokens, retrieved documents add 2,000 tokens, and replies average 250 tokens. Input costs 1 unit per 1,000 tokens, output costs 3 units per 1,000. What does one turn cost, and which part would you attack first?',
        hint: 'Separate input tokens from output tokens before multiplying.',
        solution:
          'Input is 1,200 + 400 + 2,000 = 3,600 tokens, costing 3.6 units. Output is 250 tokens, costing 0.75 units. Total is 4.35 units per turn, and input is about 83 per cent of it. The first thing to attack is therefore the retrieved documents: retrieving three tight chunks instead of ten loose ones, or reranking and keeping the top three, cuts the dominant term directly. Shortening the system prompt is the second lever. Trimming the reply saves almost nothing, which is the opposite of most people\'s intuition.',
      },
      {
        prompt:
          'Take a paragraph of English, the same paragraph translated into a language you know, and a block of JSON of similar visual length. Tokenise all three and compare counts. Write two sentences on what you found and what it implies for a product serving users in both languages.',
        hint: 'Compute tokens per word as well as raw token counts.',
        solution:
          'The typical result is that English prose runs near 1.3 tokens per word while a language written in another script or with rich morphology often runs two to four times higher, and JSON runs high because braces, quotes and field names each consume tokens. The product implication is direct: the same conversation costs more, responds more slowly and fits less history in the context window for the non-English user, so any per-conversation token budget quietly delivers a worse product to them. Measuring this is the first step to deciding whether to raise the budget per language or choose a tokeniser with better coverage.',
      },
    ],

    quiz: [
      {
        id: 'GEN-003-q1',
        type: 'mcq',
        concept: 'bpe mechanics',
        prompt: 'What determines which strings become single tokens in a BPE vocabulary?',
        options: [
          'Frequency of adjacent pairs in the tokeniser training corpus',
          'Dictionary word boundaries',
          'Linguistic morpheme analysis',
          'The alphabetical order of the vocabulary',
        ],
        answerIndex: 0,
        explanation:
          'BPE merges the most frequent adjacent pair at each step and knows nothing about linguistics. This is why splits often ignore morpheme boundaries and why frequent words end up as a single token.',
      },
      {
        id: 'GEN-003-q2',
        type: 'truefalse',
        concept: 'out of vocabulary',
        prompt: 'A byte-level BPE tokeniser can encounter a word it cannot represent at all.',
        answer: false,
        explanation:
          'The base vocabulary is the 256 byte values, so every possible byte string decomposes into known units. Unseen words fragment into more, smaller tokens rather than becoming an unknown symbol.',
      },
      {
        id: 'GEN-003-q3',
        type: 'numeric',
        concept: 'bpe counting',
        prompt: 'In the corpus low(5), lower(2), lowest(1), own(3), what is the total count of the adjacent pair (o, w) before any merges?',
        answer: 11,
        explanation:
          'Every one of the four word types contains o followed by w exactly once, so the count is 5 + 2 + 1 + 3 = 11. It is the most frequent pair, which is why it is merged first.',
      },
      {
        id: 'GEN-003-q4',
        type: 'multi',
        concept: 'token count drivers',
        prompt: 'Which of these typically use many more tokens than their character count suggests? Select all that apply.',
        options: [
          'A randomly generated API key',
          'Common English prose',
          'Text in a script the tokeniser saw little of during training',
          'A long string of digits',
          'Frequent English words such as "the" and "because"',
        ],
        answerIndices: [0, 2, 3],
        explanation:
          'Random strings, under-represented scripts and long digit runs all match few learned merges, so they fragment. Common English words are exactly what the merges were optimised for and usually cost one token each.',
      },
      {
        id: 'GEN-003-q5',
        type: 'order',
        concept: 'tokeniser training',
        prompt: 'Order the steps of training a byte-level BPE tokeniser.',
        items: [
          'Initialise the vocabulary with all 256 byte values',
          'Count every adjacent symbol pair across the corpus',
          'Merge the most frequent pair into a new symbol and record the merge',
          'Repeat until the vocabulary reaches the target size',
          'Freeze the ordered merge list and ship it with the model',
        ],
        explanation:
          'The ordered merge list is the tokeniser. Encoding new text means replaying those merges in the recorded order, which makes the process deterministic and exactly reversible.',
      },
      {
        id: 'GEN-003-q6',
        type: 'explain',
        concept: 'tokenisation failures',
        prompt: 'Explain why tokenisation causes both the letter-counting failure and the unreliability of arithmetic on long numbers.',
        rubric: [
          'States that the model receives token ids standing for multi-character chunks, not characters',
          'Connects this to the lack of direct character-level access for counting or spelling',
          'Explains that digits are grouped by corpus frequency rather than by place value',
        ],
        sampleAnswer:
          'The model never sees characters. Text is chopped into chunks and each chunk becomes a single id with a learned vector, so the letters inside a chunk are not separate inputs and any question about them asks for information the representation does not expose. The arithmetic case is the same problem wearing different clothes: digit sequences are split according to how often groups appeared in training, not according to place value, so the digits of 1,234,567 may land in groups that cut across thousands and millions, and the same digit can sit in a different chunk depending on where the number starts. Carrying and alignment then have to be reconstructed from representations that were never aligned to place value in the first place, which is why short sums are usually fine and long ones degrade.',
        explanation:
          'Both failures share one root cause — the unit of input is a frequency-derived chunk rather than a character — and a good answer names that cause once rather than treating the two as separate quirks.',
      },
    ],

    flashcards: [
      { front: 'What is a token?', back: 'The atomic unit the model reads and writes: an integer id standing for a byte sequence, often a common word, sometimes a fragment.' },
      { front: 'How does BPE build a vocabulary?', back: 'Start from bytes, repeatedly merge the most frequent adjacent pair into a new symbol, record the merge, stop at the target vocabulary size.' },
      { front: 'Why can byte-level BPE never hit an unknown word?', back: 'The base vocabulary is all 256 byte values, so every string decomposes into known units. Rare words just fragment into more tokens.' },
      { front: 'Why does the model miscount letters in a word?', back: 'It receives chunk ids, not characters. The letters inside a token are not separate inputs, so character-level questions ask for unavailable information.' },
      { front: 'Vocabulary size trade-off', back: 'Bigger means shorter sequences but a larger embedding and output layer, wasted parameters on rare entries, and fewer updates per rare token.' },
      { front: 'What is fertility?', back: 'Average tokens per word for a tokeniser on a given text. Higher fertility means higher cost, more latency and less content fitting in the window.' },
      { front: 'Can you swap a tokeniser for a trained model?', back: 'No. Token ids index a learned embedding table, so a different vocabulary makes every embedding point at the wrong string.' },
    ],

    challenge: {
      title: 'Measure your own tokenisation tax',
      brief:
        'Collect five text samples: English prose, code, a JSON payload, a table of numbers, and text in a second language. Tokenise each with a real tokeniser and report token count, character count, word count and fertility for every sample. Then write a short costing note: if your product sends 10,000 requests a day with this mix, how many tokens per day is that, and which sample type would you attack first to reduce it?',
      language: 'python',
      acceptanceCriteria: [
        'All five sample types are measured with an actual tokeniser rather than estimated',
        'Fertility is reported per sample, not only raw counts',
        'The costing note projects a daily token total from a stated request mix',
        'The note identifies the largest contributor and proposes a concrete reduction',
      ],
      starterCode: 'from transformers import AutoTokenizer\n\ntok = AutoTokenizer.from_pretrained("gpt2")\nsamples = {"prose": "...", "code": "...", "json": "...", "numbers": "...", "other_language": "..."}\n',
    },

    teachingPrompt: {
      prompt:
        'A colleague is confused about why the model insists strawberry has two r characters, and why their Japanese-language feature costs three times as much as the English one. Explain both with one idea.',
      mustCover: [
        'Text is chopped into subword tokens before the model sees anything',
        'The vocabulary is built by merging frequent pairs and is then frozen',
        'Characters inside a token are not separate inputs, so character-level questions fail',
        'Text that matches few learned merges fragments into more tokens, raising cost and latency',
      ],
      bonusSignals: ['works through a concrete split such as straw + berry', 'mentions that token count drives both price and context usage', 'notes that the fix for character work is code, not prompting'],
      sampleExplanation:
        "Both problems come from the same place: the model never sees your text. A tokeniser chops it into chunks first and hands over a list of numbers. Those chunks were chosen before training by a simple procedure — look at a huge pile of text, find the pair of pieces that occurs together most often, glue them into one piece, repeat tens of thousands of times. Common English words got glued into single pieces because they appeared constantly. So strawberry might arrive as two chunks, and asking how many r characters are inside it is asking about something that was never presented separately; the model answers with a plausible number because producing something plausible is all it ever does. The Japanese case is the same mechanism with the opposite consequence: far fewer merges were learned for that script, so the text fragments into many more chunks, and since you pay per chunk and the context window is measured in chunks, the identical message costs several times as much and leaves less room for conversation history.",
    },
  },

  {
    id: 'GEN-004',
    domain: 'GEN',
    module: 'Inside a Transformer LM',
    topic: 'Token and position representations',
    title: 'Embeddings and Positional Encoding',
    slug: 'embeddings-and-positional-encoding',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['GEN-003'],
    related: ['GEN-002', 'GEN-003'],
    tags: ['embeddings', 'positional-encoding', 'rope', 'vectors', 'permutation-invariance'],

    learningObjectives: [
      'Explain how a token id becomes a learned vector, and why that lookup is mathematically a matrix multiplication with a one-hot vector',
      'State why self-attention is permutation-invariant and what that implies if position is not injected explicitly',
      'Compare sinusoidal, learned absolute and rotary position encodings on how they work and how they extrapolate',
      'Interpret geometric relationships in embedding space, and say honestly what such relationships do and do not prove',
    ],

    terminology: [
      {
        term: 'Embedding',
        definition:
          'A dense vector of real numbers representing a token, learned during training. The embedding matrix has one row per vocabulary entry and one column per model dimension.',
        simple: 'A list of numbers that stands for a word-piece, learned rather than written down.',
      },
      {
        term: 'Embedding matrix',
        definition:
          'The learned table of shape (vocabulary size, model dimension). Looking up token id i means taking row i, which is equivalent to multiplying a one-hot vector by the matrix.',
        simple: 'The big lookup table that turns each numbered piece into its vector.',
      },
      {
        term: 'Permutation invariance',
        definition:
          'A property of self-attention: reordering the input tokens permutes the outputs identically but changes nothing else, so the operation carries no notion of order on its own.',
        simple: 'Attention would treat a shuffled sentence exactly the same way, so order has to be added in.',
      },
      {
        term: 'Positional encoding',
        definition:
          'Information about where a token sits in the sequence, injected into the representation either by adding a position vector to the embedding or by rotating the query and key vectors inside attention.',
        simple: 'A way of telling the model where in the sentence each piece appeared.',
      },
      {
        term: 'Rotary position embedding (RoPE)',
        definition:
          'A scheme that rotates pairs of dimensions in the query and key vectors by an angle proportional to position, so the attention score between two tokens depends only on their relative distance.',
        simple: 'Spin each token vector by an amount based on its position, so only the gap between tokens matters.',
      },
      {
        term: 'Cosine similarity',
        definition:
          'The cosine of the angle between two vectors: the dot product divided by the product of their lengths. The standard way of measuring how related two embeddings are.',
        simple: 'A number from -1 to 1 saying how nearly two vectors point the same way.',
      },
    ],

    simpleExplanation:
      "The tokeniser has turned your text into a list of numbers, but those numbers are only labels — token 5,281 is not five times anything. The first thing the model does is swap each label for a long list of real numbers, maybe a few thousand of them, pulled from a big table it learned during training. That list is the token's meaning as far as the model is concerned, and pieces used in similar ways end up with similar lists. Then comes a problem that surprises people. The machinery that follows, self-attention, looks at every token in relation to every other token all at once, and it genuinely cannot tell which came first: give it the same words in a different order and it does the same arithmetic. So the model has to be told about position explicitly. Either a position vector gets added to each token's vector before anything else happens, or, in most recent models, the vectors get rotated by an angle that depends on where the token sits. Either way, order is not something the architecture gets for free — it is a deliberate addition.",

    whyItExists:
      'Token ids are arbitrary labels with no useful arithmetic, so the model needs a representation in which similarity and structure are expressible; that is what embeddings provide. Separately, self-attention computes over an unordered set, so without an explicit position signal the model could not distinguish "the dog bit the man" from "the man bit the dog".',

    analogy: {
      scenario:
        "Imagine a vast conference where everyone wears a badge listing their interests as a set of numbers — how much they care about mathematics, about cooking, about cycling, and so on for a thousand topics. People with similar badges find they have things to talk about, and you can measure how alike two people are just by comparing badges. Now imagine the conference organisers arrange everyone in a queue but forget to number them. The badges tell you who is similar; nothing tells you who was standing where. If the order in the queue matters, someone has to add a position marker to every badge.",
      mapping: [
        { from: 'The badge of numbers', to: 'The token embedding vector' },
        { from: 'Similar badges meaning similar interests', to: 'Nearby embeddings meaning similar usage in training text' },
        { from: 'The queue with no numbers', to: 'Self-attention operating on an unordered set' },
        { from: 'Adding a position marker to each badge', to: 'Additive positional encoding' },
        { from: 'Tilting each badge by an angle based on where you stand', to: 'Rotary position embedding, which encodes relative distance' },
      ],
      bridge:
        'The analogy is exact on the key point: the badge carries identity and the marker carries place, and they are genuinely separate pieces of information that the architecture must combine deliberately. Adding the two vectors, which looks strange at first, works for the same reason people can carry both facts at once — in a space of thousands of dimensions there is ample room for the network to read off identity and position from a single combined vector.',
      limitations:
        'The analogy suggests each dimension means something nameable, like interest in cycling. In a real model the dimensions are not individually interpretable; meaning is distributed across many of them, and interpretability research finds that a single neuron typically participates in many unrelated features.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Embedding space',
        caption: 'Explore a projection of a real embedding space and inspect which tokens sit near which.',
        widget: 'embedding-space-3d',
      },
      {
        kind: 'flow',
        title: 'From text to the first transformer block',
        caption: 'Every step before attention begins.',
        steps: [
          { label: 'Text', detail: 'A raw string of bytes.' },
          { label: 'Token ids', detail: 'The tokeniser produces a list of integers, one per token.' },
          { label: 'Embedding lookup', detail: 'Each id selects a row of the learned embedding matrix, giving a vector of the model dimension.' },
          { label: 'Position injected', detail: 'Either a position vector is added, or query and key vectors are rotated later inside attention.' },
          { label: 'Into the stack', detail: 'The resulting matrix of shape (sequence length, model dimension) enters the first transformer block.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Absolute versus relative position',
        caption: 'The distinction that drives most modern design choices.',
        left: {
          heading: 'Absolute (sinusoidal or learned)',
          points: [
            'A vector for each position index is added to the token embedding',
            'Learned variants can only represent positions seen in training',
            'Sinusoidal variants are defined for any index but extrapolate poorly in practice',
            'The model must infer relative distance from two absolute signals',
            'Simple to implement and easy to reason about',
          ],
        },
        right: {
          heading: 'Relative (RoPE and friends)',
          points: [
            'Query and key vectors are rotated by an angle proportional to position',
            'The attention score depends only on the difference of positions',
            'Applied inside attention at every layer, not once at the input',
            'Extends to longer contexts more gracefully, especially with frequency scaling',
            'The dominant choice in recent open-weight models',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Shapes to keep in your head',
        subject: 'ids (T,) -> embeddings (T, d) -> blocks -> logits (T, V)',
        annotations: [
          { part: 'T', note: 'Sequence length in tokens. Grows as generation proceeds.' },
          { part: 'd', note: 'Model dimension — the width of every token vector, constant through the whole stack.' },
          { part: 'V', note: 'Vocabulary size. The output projection maps d back to V to produce logits.' },
          { part: '(T, d)', note: 'The residual stream: one vector per token, rewritten by every block. This shape never changes between blocks.' },
        ],
      },
    ],

    formalDefinition:
      'An embedding layer is a learned matrix E of shape (V, d) whose row E_i is the representation of token id i; the lookup is equivalent to computing one-hot(i) times E. Because self-attention is equivariant to permutations of the input positions, order must be supplied separately, either additively as x_t = E_{i_t} + p_t, or multiplicatively by rotating query and key vectors by an angle proportional to position so that attention scores depend only on relative offsets.',

    math: {
      intuition:
        'Three ideas stack here. First, an embedding lookup is a matrix multiplication with a one-hot vector, which is why it is differentiable and can be learned by gradient descent. Second, attention treats its input as a set, so shuffling positions shuffles outputs identically and nothing else changes — position must be added deliberately. Third, sinusoidal encodings write position as a set of waves at different frequencies, so that a fixed shift in position corresponds to a fixed rotation, and rotary encodings make that rotation explicit and apply it inside attention, so only relative distance ever appears in the score.',
      formulas: [
        {
          latex: 'x_t = E^{\\top} \\, \\mathrm{onehot}(i_t) = E_{i_t}',
          name: 'Embedding lookup as a matrix product',
          meaning:
            'Selecting row i of the embedding matrix is identical to multiplying by a one-hot vector, which is why the lookup has a gradient and the table is learned rather than hand-built.',
          variables: [
            { symbol: 'E', meaning: 'The embedding matrix of shape (V, d)' },
            { symbol: 'i_t', meaning: 'The integer token id at position t' },
            { symbol: '\\mathrm{onehot}(i_t)', meaning: 'A vector of length V with a single 1 at index i_t' },
            { symbol: 'x_t', meaning: 'The resulting d-dimensional embedding vector' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\mathrm{Attn}(PX) = P \\, \\mathrm{Attn}(X)',
          name: 'Permutation equivariance of attention',
          meaning:
            'Permuting the rows of the input permutes the rows of the output in exactly the same way and changes nothing else. The operation therefore contains no information about order.',
          variables: [
            { symbol: 'P', meaning: 'Any permutation matrix reordering the sequence positions' },
            { symbol: 'X', meaning: 'The input matrix of token vectors, shape (T, d)' },
            { symbol: '\\mathrm{Attn}', meaning: 'The self-attention operation applied to that matrix' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'PE_{(t, 2i)} = \\sin\\!\\left(\\frac{t}{10000^{2i/d}}\\right), \\quad PE_{(t, 2i+1)} = \\cos\\!\\left(\\frac{t}{10000^{2i/d}}\\right)',
          name: 'Sinusoidal positional encoding',
          meaning:
            'Position is written as a bank of sine and cosine waves whose wavelengths increase geometrically across dimensions, so early dimensions distinguish neighbouring positions and later ones encode coarse location.',
          variables: [
            { symbol: 't', meaning: 'Position index in the sequence, starting at 0' },
            { symbol: 'i', meaning: 'Index of the dimension pair, from 0 to d/2 - 1' },
            { symbol: 'd', meaning: 'Model dimension' },
            { symbol: '10000', meaning: 'A base constant setting the ratio between the shortest and longest wavelength' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\langle R_{m} q, \; R_{n} k \\rangle = f(q, k, m - n)',
          name: 'The rotary property',
          meaning:
            'Rotating the query by an angle proportional to its position m and the key by an angle proportional to n makes their inner product depend only on the offset m - n. Relative position falls out of the geometry rather than being learned.',
          variables: [
            { symbol: 'R_m', meaning: 'A block-diagonal rotation matrix built from angles proportional to position m' },
            { symbol: 'q, k', meaning: 'The query and key vectors for two tokens' },
            { symbol: 'm - n', meaning: 'The relative distance between the two token positions' },
            { symbol: '\\langle \\cdot, \\cdot \\rangle', meaning: 'The inner (dot) product, which is what the attention score is built from' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\cos(u, v) = \\frac{u \\cdot v}{\\lVert u \\rVert \\, \\lVert v \\rVert}',
          name: 'Cosine similarity',
          meaning:
            'Measures how nearly two embeddings point in the same direction, ignoring magnitude. This is the standard similarity used for comparing token or document embeddings.',
          variables: [
            { symbol: 'u \\cdot v', meaning: 'Dot product of the two vectors' },
            { symbol: '\\lVert u \\rVert', meaning: 'Euclidean length of u' },
            { symbol: '\\cos(u, v)', meaning: 'Value in [-1, 1]: 1 identical direction, 0 orthogonal, -1 opposite' },
          ],
          category: 'linear-algebra',
        },
      ],
      derivation: [
        'Write attention output for position t as a weighted sum over all positions, where the weights depend on dot products between token vectors.',
        'Nothing in that expression refers to t except through which vectors are involved, so permuting the inputs simply permutes which sums are computed where.',
        'Therefore attention alone cannot distinguish two orderings of the same multiset of tokens, and an explicit position signal is required.',
        'The sinusoidal choice writes position with waves of geometrically spaced frequencies; a shift by a fixed offset k maps to a linear transformation of the encoding, so relative offsets are in principle recoverable.',
        'Rotary encoding makes this explicit: rotating q and k by angles proportional to their positions means the dot product depends only on the difference of the angles, giving exact relative behaviour at every layer.',
      ],
    },

    workedExample: {
      title: 'Computing sinusoidal position vectors by hand',
      setup:
        'Take a toy model dimension of d = 4, which gives two dimension pairs. For pair i = 0 the divisor is 10000^(0/4) = 1; for pair i = 1 it is 10000^(2/4) = 100. Each position therefore gets the vector [sin(t/1), cos(t/1), sin(t/100), cos(t/100)].',
      steps: [
        {
          label: 'Position 0',
          detail: 'sin(0) = 0 and cos(0) = 1 for both frequencies, giving [0, 1, 0, 1].',
          latex: 'PE_0 = [0,\; 1,\; 0,\; 1]',
        },
        {
          label: 'Position 1',
          detail: 'sin(1) = 0.841, cos(1) = 0.540, sin(0.01) = 0.010, cos(0.01) = 1.000, giving [0.841, 0.540, 0.010, 1.000].',
          latex: 'PE_1 = [0.841,\; 0.540,\; 0.010,\; 1.000]',
        },
        {
          label: 'Position 2',
          detail: 'sin(2) = 0.909, cos(2) = -0.416, sin(0.02) = 0.020, cos(0.02) = 1.000, giving [0.909, -0.416, 0.020, 1.000].',
          latex: 'PE_2 = [0.909,\; -0.416,\; 0.020,\; 1.000]',
        },
        {
          label: 'Read what the two frequency bands are doing',
          detail:
            'The first pair changes a great deal between adjacent positions — it distinguishes neighbours sharply but wraps around every 2*pi positions. The second pair barely moves between positions 1 and 2 but drifts steadily over hundreds of positions, so it encodes coarse location. Together, a bank of such pairs gives a signature that is locally discriminative and globally unambiguous.',
        },
        {
          label: 'Add to the token embedding',
          detail:
            'If the token embedding for "cat" is [0.20, -0.10, 0.50, 0.30] and it appears at position 2, the input to the first block is [0.20 + 0.909, -0.10 - 0.416, 0.50 + 0.020, 0.30 + 1.000] = [1.109, -0.516, 0.520, 1.300]. Identity and position now share one vector.',
          latex: 'x_t = E_{i_t} + PE_t',
        },
        {
          label: 'Check the rotary alternative on the same pair',
          detail:
            'Under RoPE nothing is added. The first dimension pair of the query at position 2 is rotated by angle 2 and the key at position 5 by angle 5; their dot product then depends on cos(5 - 2) = cos(3). Move both tokens ten positions later and the score is unchanged, because the difference is still 3. That invariance is the whole point.',
          latex: '\\theta_m - \\theta_n \\propto m - n',
        },
      ],
      conclusion:
        'Adding a position vector to a token vector looks like it should destroy information, and in two dimensions it would. In a space of thousands of dimensions, the network has ample capacity to learn projections that read identity and position separately from the sum. Rotary encoding avoids the question entirely by not touching the token vector at all — it changes the geometry of the comparison instead, which is why it behaves better when a model is asked to handle sequences longer than those it was trained on.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The embedding lookup is a matrix row',
        runnable: true,
        code: `import torch
import torch.nn as nn

torch.manual_seed(0)
vocab_size, d_model = 10, 4
embed = nn.Embedding(vocab_size, d_model)

ids = torch.tensor([3, 7, 3])          # note the repeated token
vectors = embed(ids)
print(vectors.shape)
print(vectors)

# The lookup is exactly a one-hot matrix product:
onehot = torch.nn.functional.one_hot(ids, vocab_size).float()
print("identical:", torch.allclose(onehot @ embed.weight, vectors))`,
        output: `torch.Size([3, 4])
tensor([[-1.1258, -1.1524, -0.2506, -0.4339],
        [ 0.8487,  0.6920, -0.3160, -2.1152],
        [-1.1258, -1.1524, -0.2506, -0.4339]], grad_fn=<EmbeddingBackward0>)
identical: True`,
        explanation:
          'Two things are worth pausing on. The same token id at two positions yields exactly the same vector, which is precisely why position must be added separately — at this stage the two occurrences of token 3 are indistinguishable. And the one-hot check shows that the lookup is a linear operation, which is what makes the table learnable: gradients flow back into the rows that were used, and only those rows are updated on a given batch.',
      },
      {
        language: 'python',
        title: 'Demonstrating that attention ignores order',
        runnable: true,
        code: `import torch

torch.manual_seed(1)
X = torch.randn(3, 4)                      # three tokens, model dimension 4

def attention(X: torch.Tensor) -> torch.Tensor:
    scores = (X @ X.T) / X.shape[-1] ** 0.5
    return torch.softmax(scores, dim=-1) @ X

out = attention(X)

perm = torch.tensor([2, 0, 1])             # shuffle the tokens
out_shuffled = attention(X[perm])

print("shuffling input then attending == attending then shuffling output:",
      torch.allclose(out_shuffled, out[perm], atol=1e-6))`,
        output: `shuffling input then attending == attending then shuffling output: True`,
        explanation:
          'This is permutation equivariance made concrete, and it is the reason positional encoding exists at all. Attending to a shuffled sequence gives exactly the shuffled version of the original output — no new information appears and none is lost, meaning the operation is blind to order. Without an explicit position signal the model would assign identical probabilities to "the dog bit the man" and "the man bit the dog".',
      },
      {
        language: 'python',
        title: 'Sinusoidal encodings, and what they look like',
        runnable: true,
        code: `import torch

def sinusoidal(max_len: int, d_model: int) -> torch.Tensor:
    pos = torch.arange(max_len).unsqueeze(1).float()          # (T, 1)
    i = torch.arange(0, d_model, 2).float()                   # (d/2,)
    div = torch.pow(10000.0, i / d_model)                     # geometric wavelengths
    pe = torch.zeros(max_len, d_model)
    pe[:, 0::2] = torch.sin(pos / div)
    pe[:, 1::2] = torch.cos(pos / div)
    return pe

pe = sinusoidal(max_len=6, d_model=4)
print(pe.round(decimals=3))

# Dot product between encodings falls off smoothly with distance.
sims = pe @ pe[0]
print("similarity to position 0:", sims.round(decimals=3).tolist())`,
        output: `tensor([[ 0.0000,  1.0000,  0.0000,  1.0000],
        [ 0.8415,  0.5403,  0.0100,  1.0000],
        [ 0.9093, -0.4161,  0.0200,  0.9998],
        [ 0.1411, -0.9900,  0.0300,  0.9996],
        [-0.7568, -0.6536,  0.0400,  0.9992],
        [-0.9589,  0.2837,  0.0500,  0.9987]])
similarity to position 0: [2.0, 1.54, 0.584, -0.99, -0.653, 0.284]`,
        explanation:
          'The table is the worked example computed in bulk: alternating sine and cosine columns, with the wavelength growing geometrically across dimension pairs. The similarity row shows both the strength and the weakness of this scheme — nearby positions are similar, but because sine and cosine are periodic the similarity does not decrease monotonically with distance, so the model must learn to interpret the pattern rather than reading distance off directly. This is part of why relative schemes such as RoPE have largely replaced additive sinusoids.',
      },
      {
        language: 'python',
        title: 'Rotary embeddings on one dimension pair',
        runnable: true,
        code: `import torch

def rotate(vec: torch.Tensor, pos: int, theta: float = 1.0) -> torch.Tensor:
    """Rotate a 2-D slice by an angle proportional to position."""
    angle = pos * theta
    c, s = torch.cos(torch.tensor(angle)), torch.sin(torch.tensor(angle))
    return torch.stack([vec[0] * c - vec[1] * s, vec[0] * s + vec[1] * c])

q = torch.tensor([1.0, 0.0])
k = torch.tensor([0.0, 1.0])

for (m, n) in [(2, 5), (12, 15), (100, 103)]:
    score = torch.dot(rotate(q, m), rotate(k, n))
    print(f"positions ({m:>3}, {n:>3})  offset {n - m}  score {score:+.4f}")`,
        output: `positions (  2,   5)  offset 3  score +0.1411
positions ( 12,  15)  offset 3  score +0.1411
positions (100, 103)  offset 3  score +0.1411`,
        explanation:
          'The same offset gives the same score no matter where in the sequence the pair sits. That is the defining property of rotary embeddings and it is pure geometry — rotating both vectors by angles proportional to their positions leaves only the difference of angles in the dot product. Real implementations apply this to every consecutive dimension pair with a different theta per pair, mirroring the frequency bank of the sinusoidal scheme, and apply it inside every attention layer rather than once at the input.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Semantic search over a document collection',
        usage:
          'Sentence embeddings place documents in a vector space where cosine similarity approximates topical relatedness, which is what makes retrieval work at all. The same principle as token embeddings, applied at a coarser unit.',
      },
      {
        context: 'Extending a model to a longer context',
        usage:
          'Teams routinely extend context length after pretraining by scaling the rotary frequencies and briefly fine-tuning. This is only possible because position is encoded by a parameterised function rather than a learned table with a fixed number of rows.',
      },
      {
        context: 'Weight tying in language models',
        usage:
          'Many models reuse the transpose of the embedding matrix as the output projection to logits. It saves a large number of parameters and reflects the fact that both layers are mapping between the same two spaces.',
      },
      {
        context: 'Recommendation systems',
        usage:
          'The same idea appears well outside language: users and items get learned vectors, and a dot product predicts affinity. The embedding layer is one of the most transferable ideas in modern machine learning.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: '`nn.Embedding` is the lookup table; positional schemes are implemented as ordinary tensor operations around it.' },
      { tool: 'sentence-transformers', role: 'Produces sentence-level embeddings for retrieval, using the same geometry with pooling over token vectors.' },
      { tool: 'Hugging Face transformers', role: 'Model configs expose `rope_theta` and scaling factors, which are exactly the knobs used to extend context length.' },
    ],

    commonMistakes: [
      {
        mistake: 'Thinking individual embedding dimensions have nameable meanings',
        why: 'Meaning is distributed across many dimensions, and interpretability research finds that single neurons commonly participate in several unrelated features at once.',
        fix: 'Reason about directions and distances in the space rather than about individual coordinates, and treat any single-neuron story as a hypothesis requiring evidence.',
      },
      {
        mistake: 'Assuming attention understands word order by itself',
        why: 'Attention is permutation-equivariant, as the code example demonstrates. Order is supplied by positional encoding and by nothing else in the architecture.',
        fix: 'Remember that if you removed positional encoding, the model would treat a sentence as a bag of tokens. Recurrent networks and convolutions get order structurally; transformers do not.',
      },
      {
        mistake: 'Expecting a model to handle sequences longer than it was trained on, for free',
        why: 'Learned absolute encodings simply have no row for an unseen position, and even sinusoidal and rotary schemes degrade beyond the training length because attention patterns were never calibrated there.',
        fix: 'Use an explicit long-context technique: frequency scaling plus fine-tuning, or a model trained at the length you need. Verify the claimed length with a retrieval test rather than trusting the configuration value.',
      },
      {
        mistake: 'Treating the famous word-vector analogies as proof of reasoning',
        why: 'Vector arithmetic on static embeddings does produce some striking results, but the effect is sensitive to normalisation, to excluding the input terms from the search, and to which words are tested. It reflects co-occurrence structure in the corpus.',
        fix: 'Report the geometry accurately — related words occupy nearby regions — without inferring a semantic capability that has not been demonstrated.',
      },
      {
        mistake: 'Confusing static token embeddings with contextual representations',
        why: 'The embedding table gives one fixed vector per token id, so bank has one vector regardless of context. Context sensitivity is produced by the attention layers that follow, not by the table.',
        fix: 'Use the hidden states from a later layer when you want a context-aware representation, and the embedding table only when you genuinely want the context-free one.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why do transformers need positional encoding when recurrent networks do not?',
        answer:
          'A recurrent network processes tokens in sequence and carries a hidden state forward, so order is built into the computation itself — position is implicit in when a token is consumed. Self-attention computes all pairwise interactions simultaneously and is equivariant to permutations of its input: shuffle the tokens and the outputs shuffle identically, with no other change. That parallelism is exactly what makes transformers trainable at scale, and losing the ordering is the price. Positional encoding pays that price back by injecting position explicitly, either by adding a position vector to each token embedding or, in most recent models, by rotating query and key vectors so that attention scores depend on relative distance.',
        followUp:
          'A strong answer observes that this is a deliberate trade: parallel training was worth having to re-add position by hand.',
      },
      {
        level: 'advanced',
        question: 'Compare sinusoidal, learned absolute and rotary positional encodings.',
        answer:
          'Sinusoidal encodings are a fixed function of position using sine and cosine at geometrically spaced frequencies; they add no parameters and are defined for any index, though in practice they do not extrapolate well beyond the training length. Learned absolute encodings allocate a trainable vector per position, which fits the training distribution well but has literally no representation for a position never seen, capping the context hard. Rotary embeddings take a different route: rather than adding anything to the token vector, they rotate query and key vectors by an angle proportional to position inside each attention layer, so the resulting score depends only on relative offset. That makes relative position exact rather than inferred, plays well with KV caching, and can be stretched to longer contexts by rescaling the rotation frequencies and fine-tuning briefly. Rotary encoding is the common choice in current open-weight models for those reasons.',
        followUp:
          'A strong candidate mentions ALiBi as a further alternative that biases attention scores by distance directly, with no vector manipulation.',
      },
      {
        level: 'ml-engineer',
        question: 'Does adding a positional vector to a token embedding not corrupt the token information?',
        answer:
          'It is a reasonable worry and the answer is that dimensionality saves you. In a space with thousands of dimensions there are many nearly orthogonal directions, so the network can learn projections that recover token identity and positional information largely independently from the sum. Empirically it works, and probing studies can recover position from the resulting vectors with high accuracy. It is worth being honest that this is a somewhat inelegant solution, and part of the appeal of rotary embeddings is that they avoid the question altogether: the token vector is never modified, only the geometry of the comparison between two tokens is.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A model has a vocabulary of 50,000 tokens and a model dimension of 2,048. How many parameters are in the embedding matrix, and what fraction of a one-billion-parameter model is that?',
        hint: 'The matrix is (vocabulary size) by (model dimension).',
        solution:
          '50,000 x 2,048 = 102,400,000 parameters, roughly 102 million, which is about 10 per cent of a one-billion-parameter model. Two implications follow. Vocabulary size is not a free choice — it buys shorter sequences with a substantial parameter cost. And weight tying, where the output projection reuses the transposed embedding matrix, saves another 102 million parameters, which is why so many models do it.',
      },
      {
        prompt:
          'Using the toy sinusoidal scheme with d = 4, compute the position vector for t = 3 and state which dimension pair distinguishes it most clearly from t = 2.',
        hint: 'The two divisors are 1 and 100.',
        solution:
          'sin(3) = 0.141, cos(3) = -0.990, sin(0.03) = 0.030, cos(0.03) = 1.000, so PE_3 = [0.141, -0.990, 0.030, 1.000]. Comparing with PE_2 = [0.909, -0.416, 0.020, 1.000], the first pair changed by 0.768 and 0.574 while the second pair changed by 0.010 and 0.000. The high-frequency pair does essentially all the work of distinguishing neighbours; the low-frequency pair only becomes informative over spans of hundreds of positions.',
      },
      {
        prompt:
          'Explain in three sentences why a model with learned absolute position embeddings cannot process an input longer than its training length, while one with rotary embeddings can at least attempt it.',
        hint: 'What data structure holds the position information in each case?',
        solution:
          'Learned absolute embeddings are a table with one row per position, so position 5,000 in a model trained to 4,096 simply has no row and no defined behaviour; the implementation will raise an index error or silently truncate. Rotary embeddings compute a rotation angle from the position with a formula that is defined for any integer, so a longer sequence produces valid numbers. That said, valid numbers are not the same as good behaviour — attention patterns beyond the training length were never calibrated, quality degrades, and the usual practice is to rescale the rotation frequencies and fine-tune briefly before claiming the longer context works.',
      },
    ],

    quiz: [
      {
        id: 'GEN-004-q1',
        type: 'mcq',
        concept: 'embedding lookup',
        prompt: 'What is an embedding lookup equivalent to, mathematically?',
        options: [
          'Multiplying a one-hot vector by the embedding matrix',
          'Applying a softmax over the vocabulary',
          'Computing a dot product between two token vectors',
          'Normalising the token id to a value between 0 and 1',
        ],
        answerIndex: 0,
        explanation:
          'Selecting row i is exactly one-hot(i) times E. This equivalence is why the table is a differentiable layer whose rows are updated by gradient descent rather than a fixed dictionary.',
      },
      {
        id: 'GEN-004-q2',
        type: 'truefalse',
        concept: 'permutation invariance',
        prompt: 'Without positional encoding, a transformer would produce the same set of outputs for a sentence and for a shuffled version of it.',
        answer: true,
        explanation:
          'Self-attention is permutation-equivariant: shuffling the input shuffles the output identically and changes nothing else. Order enters the model only through positional encoding.',
      },
      {
        id: 'GEN-004-q3',
        type: 'mcq',
        concept: 'rotary embeddings',
        prompt: 'What property does rotary position embedding give the attention score between two tokens?',
        options: [
          'It depends only on the relative distance between the two positions',
          'It depends only on the absolute position of the query',
          'It becomes independent of position entirely',
          'It grows linearly with sequence length',
        ],
        answerIndex: 0,
        explanation:
          'Rotating the query by an angle proportional to m and the key by an angle proportional to n leaves only m - n in the inner product, so the score is a function of the offset rather than of either absolute position.',
      },
      {
        id: 'GEN-004-q4',
        type: 'numeric',
        concept: 'parameter counting',
        prompt: 'A model has a vocabulary of 32,000 and a model dimension of 4,096. How many million parameters are in the embedding matrix?',
        answer: 131,
        tolerance: 1,
        explanation:
          '32,000 x 4,096 = 131,072,000, roughly 131 million parameters. Embedding and output layers are a serious share of a small model, which is the main argument for weight tying.',
      },
      {
        id: 'GEN-004-q5',
        type: 'match',
        concept: 'positional schemes',
        prompt: 'Match each positional scheme to its defining characteristic.',
        pairs: [
          { left: 'Sinusoidal', right: 'A fixed function of position using sine and cosine at geometric frequencies' },
          { left: 'Learned absolute', right: 'One trainable vector per position index, with no row beyond the training length' },
          { left: 'Rotary (RoPE)', right: 'Rotates query and key vectors so the score depends on relative offset' },
          { left: 'No encoding at all', right: 'The model treats the input as an unordered set of tokens' },
        ],
        explanation:
          'The axis that matters is absolute versus relative, and whether the scheme is a parameterised function or a lookup table. Only a function can be evaluated at a position never seen in training.',
      },
      {
        id: 'GEN-004-q6',
        type: 'explain',
        concept: 'why position must be injected',
        prompt: 'Explain why a transformer needs positional information supplied explicitly, and describe one way of supplying it.',
        rubric: [
          'States that self-attention is permutation-equivariant and therefore order-blind',
          'Gives a concrete consequence, such as two sentences with the same words being indistinguishable',
          'Describes at least one mechanism accurately, additive or rotary',
        ],
        sampleAnswer:
          'Self-attention computes every pairwise interaction at once, and nothing in that computation refers to where a token sits — shuffle the inputs and the outputs shuffle identically with no other change. Left alone, the model would therefore assign the same probabilities to "the dog bit the man" and "the man bit the dog", because it would see the same multiset of tokens. The original solution adds a position vector to each token embedding before the first block, built from sine and cosine waves at geometrically spaced frequencies so that nearby positions get similar vectors and distant ones do not. Most recent models instead rotate the query and key vectors inside attention by an angle proportional to position, which makes the attention score depend only on how far apart two tokens are, and generalises better when the context is stretched beyond the training length.',
        explanation:
          'The examinable idea is that order is an architectural addition rather than a property transformers possess, and that the choice of how to add it drives real behaviour such as long-context quality.',
      },
    ],

    flashcards: [
      { front: 'What is a token embedding?', back: 'A learned dense vector per vocabulary entry, taken as a row of the (V, d) embedding matrix. The lookup equals a one-hot matrix product.' },
      { front: 'Why does a transformer need positional encoding?', back: 'Self-attention is permutation-equivariant, so it carries no information about order. Position must be injected explicitly.' },
      { front: 'Sinusoidal encoding in one line', back: 'Sine and cosine of position divided by geometrically spaced wavelengths — fixed, parameter-free, defined for any index.' },
      { front: 'What does RoPE do?', back: 'Rotates query and key vectors by an angle proportional to position, so the attention score depends only on relative distance.' },
      { front: 'Static embedding versus contextual representation', back: 'The table gives one fixed vector per token id; context sensitivity comes from the attention layers that follow, not from the table.' },
      { front: 'What is weight tying?', back: 'Reusing the transposed embedding matrix as the output projection to logits, saving V x d parameters.' },
      { front: 'Why can rotary models be stretched to longer contexts?', back: 'Position enters through a formula defined at any index, so frequencies can be rescaled and briefly fine-tuned rather than needing new table rows.' },
    ],

    challenge: {
      title: 'Build the input stage of a transformer',
      brief:
        'Implement a module that takes a batch of token ids and returns the tensor that would enter the first transformer block: an embedding lookup, plus a sinusoidal positional encoding you compute yourself. Then add a switch that disables the positional encoding, and empirically verify with a permutation test that the output is order-blind when it is off and order-sensitive when it is on. Report the tensor shapes at each stage.',
      language: 'python',
      acceptanceCriteria: [
        'The embedding lookup and the positional encoding are implemented separately and combined',
        'The sinusoidal table is computed from the formula rather than hard-coded',
        'A permutation test demonstrates order-blindness with encoding off and order-sensitivity with it on',
        'Shapes are printed at each stage and explained in a comment',
      ],
      starterCode: 'import torch\nimport torch.nn as nn\n\nclass InputStage(nn.Module):\n    def __init__(self, vocab_size: int, d_model: int, max_len: int, use_positions: bool = True):\n        super().__init__()\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who knows basic linear algebra how a token id becomes something a neural network can work with, and why the model needs to be told where each token sits.',
      mustCover: [
        'Token ids are arbitrary labels, so they are replaced by learned vectors from a table',
        'Similar-usage tokens end up with similar vectors because training pushes them together',
        'Self-attention treats its input as a set and cannot see order',
        'Position is supplied either by adding a position vector or by rotating query and key vectors',
      ],
      bonusSignals: ['mentions that the lookup is a one-hot matrix product and is therefore learnable', 'distinguishes absolute from relative encoding', 'is careful not to claim individual dimensions are interpretable'],
      sampleExplanation:
        "The tokeniser hands over integers, but an integer is just a label — token 400 is not twice token 200. So the first layer is a lookup table with one row per vocabulary entry and a few thousand columns, and each id is swapped for its row. Those rows start random and are learned, and because tokens that appear in similar contexts receive similar gradient updates, they drift towards similar vectors; the geometry of the space ends up carrying real information about usage. The lookup is not a special operation, incidentally: selecting row i is the same as multiplying a one-hot vector by the matrix, which is exactly why gradients can flow into it. Then there is a wrinkle. The attention machinery that follows compares every token with every other token simultaneously, and if you shuffle the input the output simply shuffles to match — it has no way to know which token came first. Order therefore has to be added deliberately, either by adding a position vector to each token vector before the stack begins, or, in most current models, by rotating the vectors used for comparison by an angle that depends on position, so that only the distance between two tokens affects how strongly they attend to each other.",
    },
  },

  {
    id: 'GEN-005',
    domain: 'GEN',
    module: 'Inside a Transformer LM',
    topic: 'Scaled dot-product attention',
    title: 'Self-Attention',
    slug: 'self-attention',
    difficulty: 5,
    estimatedMinutes: 50,
    prerequisites: ['GEN-004'],
    related: ['GEN-003', 'GEN-004'],
    tags: ['attention', 'query-key-value', 'softmax', 'multi-head', 'causal-mask', 'quadratic'],

    learningObjectives: [
      'Describe query, key and value as a soft dictionary lookup, and say what each vector is responsible for',
      'Compute scaled dot-product attention by hand for a short sequence and interpret the resulting weights',
      'Explain why the dot products are divided by the square root of the key dimension',
      'Explain what multi-head attention buys and how the heads are combined',
      'Explain causal masking and why a decoder requires it, and state the cost of attention in time and memory',
    ],

    terminology: [
      {
        term: 'Query, key, value',
        definition:
          'Three vectors produced from each token by separate learned linear projections. The query says what this token is looking for, the key advertises what a token offers, and the value carries the content that gets mixed in.',
        simple: 'What I want, what I have to offer, and what I actually pass along.',
      },
      {
        term: 'Attention score',
        definition:
          'The dot product between one query and one key, scaled by the square root of the key dimension. A larger score means a stronger match before normalisation.',
        simple: 'How well one token matches what another is looking for.',
      },
      {
        term: 'Attention weights',
        definition:
          'A softmax over the scores for a given query, forming a distribution over all visible positions that sums to one. These weights decide how much of each value is mixed into the output.',
        simple: 'Percentages saying how much attention this token pays to each other token.',
      },
      {
        term: 'Multi-head attention',
        definition:
          'Running several attention operations in parallel over different learned projections of the same input, then concatenating their outputs and applying a final linear layer.',
        simple: 'Several independent attention mechanisms looking for different things at once.',
      },
      {
        term: 'Causal mask',
        definition:
          'Setting the scores for all future positions to negative infinity before the softmax, so a token cannot attend to anything that comes after it.',
        simple: 'Blindfolding each position so it can only look backwards.',
      },
      {
        term: 'Quadratic complexity',
        definition:
          'Attention computes all pairwise interactions, so time and memory grow with the square of sequence length for a fixed model size.',
        simple: 'Double the text, quadruple the attention work.',
      },
    ],

    simpleExplanation:
      "Every token in a sentence needs information from other tokens to be understood. In 'the trophy did not fit in the suitcase because it was too big', working out what 'it' refers to means looking back at earlier words and deciding which ones matter. Self-attention is the mechanism that does this, and it works like a soft dictionary lookup. Each token produces three things: a question about what it needs, a label advertising what it can offer, and the content it would contribute. To process one token, the model compares its question against every label, turns those comparisons into percentages that add to one hundred, and then mixes the contents together in those proportions. Nothing is chosen outright — a token might take sixty per cent from one word, thirty from another and a sprinkling from the rest. Doing this for every token at once, in several parallel copies looking for different kinds of relationship, is the entire innovation that made modern language models possible.",

    whyItExists:
      'Recurrent networks passed information along a chain, so relating two distant words required the signal to survive every step in between, which both degraded it and forced computation to be sequential. Attention gives every position direct access to every other position in one step, and because all those comparisons are independent, they can be computed in parallel on a GPU — which is what made training on internet-scale corpora feasible.',

    analogy: {
      scenario:
        "Picture a researcher with a specific question walking into a library where every book has a one-line description on its spine. She does not read every book. She reads her question against every spine, judges how relevant each is, and then reads the relevant books in proportion to that judgement — thirty minutes with the most relevant, ten with the next, a glance at the rest. What she takes away is a blend of their contents, weighted by relevance. Crucially, the spine description and the contents are different things: a book can advertise itself well and contain something quite specific.",
      mapping: [
        { from: 'The question she walks in with', to: 'The query vector for the current token' },
        { from: 'The one-line description on each spine', to: 'The key vector of each token' },
        { from: 'What is actually written inside the book', to: 'The value vector of each token' },
        { from: 'Judging relevance of question against spine', to: 'The dot product between query and key' },
        { from: 'Splitting her time in proportion to relevance', to: 'The softmax turning scores into weights that sum to one' },
        { from: 'The blended notes she leaves with', to: 'The attention output: a weighted sum of value vectors' },
        { from: 'Several researchers with different questions on the same shelves', to: 'Multi-head attention' },
      ],
      bridge:
        'The three-way split is the point. Separating key from value lets a token advertise itself on one basis while contributing something else entirely, which a simple similarity search over the token vectors could not do. And because the weights are a softmax rather than a choice, the lookup is differentiable — the model can learn what to attend to by gradient descent, which would be impossible with a hard selection.',
      limitations:
        'The researcher reads sequentially and knows what she is looking for. Attention computes every comparison simultaneously, has no goal, and the query is simply a learned linear function of the token vector rather than anything resembling an intention.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Attention laboratory',
        caption: 'Watch the attention matrix form for a sentence, and see which tokens each head attends to.',
        widget: 'attention-lab',
      },
      {
        kind: 'flow',
        title: 'Scaled dot-product attention, step by step',
        caption: 'Every one of these steps is a matrix operation, which is why it is fast on a GPU.',
        steps: [
          { label: 'Project', detail: 'Multiply the input X by three learned matrices to get Q, K and V, each of shape (T, d_k).' },
          { label: 'Score', detail: 'Compute Q times K transposed, giving a (T, T) matrix of raw scores — every query against every key.' },
          { label: 'Scale', detail: 'Divide by the square root of d_k to keep the scores in a range where softmax gradients do not vanish.' },
          { label: 'Mask', detail: 'In a decoder, set all positions above the diagonal to negative infinity so no token sees the future.' },
          { label: 'Softmax', detail: 'Normalise each row into a probability distribution over visible positions.' },
          { label: 'Mix', detail: 'Multiply the weight matrix by V, producing one output vector per token: a weighted blend of value vectors.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Self-attention versus recurrence',
        caption: 'The trade that made the transformer worth building.',
        left: {
          heading: 'Recurrent network',
          points: [
            'Path length between two distant tokens grows linearly with distance',
            'Signal degrades over long ranges; gradients vanish',
            'Computation is inherently sequential, so training cannot be parallelised over time',
            'Memory cost is linear in sequence length',
          ],
        },
        right: {
          heading: 'Self-attention',
          points: [
            'Path length between any two tokens is one step',
            'Distant relationships are as accessible as adjacent ones',
            'All pairwise comparisons computed in parallel during training',
            'Time and memory cost grow with the square of sequence length',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Reading the attention formula',
        subject: 'Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V',
        annotations: [
          { part: 'Q K^T', note: 'All pairwise dot products at once: row i, column j is how well query i matches key j. Shape (T, T).' },
          { part: '/ sqrt(d_k)', note: 'Controls the variance of the scores. Without it, large d_k makes the softmax nearly one-hot and gradients disappear.' },
          { part: 'softmax(...)', note: 'Turns each row into a distribution summing to one, so the output is a weighted average rather than an unbounded sum.' },
          { part: 'V', note: 'The content actually mixed in. Separating it from K is what lets a token advertise one thing and contribute another.' },
        ],
      },
      {
        kind: 'table',
        title: 'Costs at a glance',
        caption: 'T is sequence length, d the model dimension. This is why context length is expensive.',
        columns: ['Quantity', 'Cost', 'Consequence'],
        rows: [
          ['Score matrix', 'T squared entries', 'Memory grows quadratically; the naive implementation stores the whole matrix'],
          ['Attention compute', 'On the order of T squared times d', 'Doubling context roughly quadruples attention work'],
          ['Feed-forward compute', 'On the order of T times d squared', 'Dominates at short contexts; attention dominates at long ones'],
          ['KV cache during generation', 'Linear in T per layer', 'The memory that makes generating token n cheap after token n-1'],
        ],
      },
    ],

    formalDefinition:
      'Given an input matrix X of shape (T, d), self-attention computes Q = X W_Q, K = X W_K and V = X W_V, then returns softmax(Q K^T / sqrt(d_k) + M) V, where M is an additive mask containing zero for permitted positions and negative infinity elsewhere. Multi-head attention performs h such operations with independent projections of dimension d_k = d / h, concatenates the results and applies a learned output projection W_O.',

    math: {
      intuition:
        'The dot product between a query and a key measures alignment: large when the two vectors point in similar directions. Softmax turns a row of such measurements into weights that sum to one, so the output for each token is a weighted average of value vectors — a blend rather than a choice. The scaling factor exists for a statistical reason: if query and key entries are roughly independent with unit variance, their dot product over d_k dimensions has variance d_k, so without dividing by the square root of d_k the scores grow with dimension, the softmax saturates towards one-hot, and the gradient through it becomes vanishingly small.',
      formulas: [
        {
          latex: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^{T}}{\\sqrt{d_k}}\\right) V',
          name: 'Scaled dot-product attention',
          meaning:
            'Compare every query with every key, scale, normalise into weights, and use those weights to average the value vectors. One equation is the whole mechanism.',
          variables: [
            { symbol: 'Q', meaning: 'Query matrix of shape (T, d_k) — one query row per token' },
            { symbol: 'K', meaning: 'Key matrix of shape (T, d_k) — one key row per token' },
            { symbol: 'V', meaning: 'Value matrix of shape (T, d_v) — the content that gets mixed' },
            { symbol: 'd_k', meaning: 'Dimension of the query and key vectors' },
            { symbol: 'T', meaning: 'Sequence length in tokens' },
            { symbol: 'QK^{T}', meaning: 'The (T, T) matrix of all pairwise scores' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\alpha_{ij} = \\frac{\\exp(s_{ij})}{\\sum_{j\'} \\exp(s_{ij\'})}, \\qquad s_{ij} = \\frac{q_i \\cdot k_j}{\\sqrt{d_k}}',
          name: 'Attention weights for one query',
          meaning:
            'Row i of the weight matrix is a probability distribution over positions j, saying how much of each value vector token i absorbs.',
          variables: [
            { symbol: '\\alpha_{ij}', meaning: 'Weight token i places on token j; each row sums to one' },
            { symbol: 's_{ij}', meaning: 'Scaled score between query i and key j' },
            { symbol: 'q_i, k_j', meaning: 'The query vector of token i and key vector of token j' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{Var}(q \\cdot k) = d_k \\quad \\text{when} \\quad \\mathrm{Var}(q_m) = \\mathrm{Var}(k_m) = 1',
          name: 'Why the square root appears',
          meaning:
            'The dot product is a sum of d_k independent products, so its variance grows linearly with dimension. Dividing by the square root of d_k restores unit variance and keeps softmax out of its saturated region.',
          variables: [
            { symbol: 'q_m, k_m', meaning: 'Individual components of the query and key vectors' },
            { symbol: 'd_k', meaning: 'Number of dimensions summed over' },
            { symbol: '\\mathrm{Var}', meaning: 'Variance across random initialisation' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'M_{ij} = \\begin{cases} 0 & j \\leq i \\\\ -\\infty & j > i \\end{cases}',
          name: 'Causal mask',
          meaning:
            'Adding this matrix to the scores before softmax makes future positions receive exactly zero weight, since exp of negative infinity is zero. It enforces that predictions depend only on the past.',
          variables: [
            { symbol: 'i', meaning: 'Query position — the token being computed' },
            { symbol: 'j', meaning: 'Key position — the token potentially attended to' },
            { symbol: '-\\infty', meaning: 'In practice a large negative constant, so the softmax output is numerically zero' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\text{MultiHead}(X) = \\left[\\,\\text{head}_1; \\dots; \\text{head}_h\\,\\right] W_O, \\quad \\text{head}_i = \\text{Attention}(XW_Q^i, XW_K^i, XW_V^i)',
          name: 'Multi-head attention',
          meaning:
            'Run h attention operations over independently projected subspaces, concatenate the outputs and mix them with a learned output matrix. Each head can specialise in a different kind of relationship.',
          variables: [
            { symbol: 'h', meaning: 'Number of heads' },
            { symbol: 'W_Q^i, W_K^i, W_V^i', meaning: 'Per-head projection matrices, each mapping d down to d / h' },
            { symbol: 'W_O', meaning: 'Output projection recombining the concatenated heads back to dimension d' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Start from the aim: for each token, build a representation that incorporates relevant information from other tokens.',
        'Measure relevance as a dot product, but not between the raw token vectors — project them first, so the model can learn what "relevant" means for this purpose. This gives queries and keys.',
        'Project a third time for the content to be mixed, so that advertising and contributing are decoupled. This gives values.',
        'Normalise the scores for each query with a softmax so the result is a weighted average and the whole operation stays differentiable.',
        'Observe that the variance of the score grows with d_k, so divide by its square root to keep the softmax in a well-conditioned range.',
        'Add a mask before the softmax to forbid attending to the future, which is what makes the model usable for left-to-right generation.',
        'Finally, note that one attention operation can only express one notion of relevance, so run several in parallel over lower-dimensional subspaces and combine them.',
      ],
    },

    workedExample: {
      title: 'Attention weights for "the cat sat", with real numbers',
      setup:
        'Three tokens: the (position 1), cat (position 2), sat (position 3). Take d_k = 4, so the scaling factor is the square root of 4, which is 2. The learned projections have produced these vectors. Queries: q1 = [1, 0, 0, 0], q2 = [0, 1, 1, 0], q3 = [1, 0, 1, 0]. Keys: k1 = [1, 0, 0, 0], k2 = [1, 0, 1, 0], k3 = [0, 0, 1, 0]. Values: v1 = [1, 0, 0, 0], v2 = [0, 2, 0, 0], v3 = [0, 0, 3, 0]. This is a decoder, so causal masking applies.',
      steps: [
        {
          label: 'Row 1: what does "the" attend to?',
          detail:
            'Causal masking leaves only position 1 visible. The score is q1 . k1 = 1, scaled to 0.5. A softmax over a single value is always 1.0, so "the" attends entirely to itself. The first token in a decoder always does — there is nothing else it is permitted to see.',
          latex: '\\alpha_{1} = [1.000, \; -, \; -]',
        },
        {
          label: 'Row 2: the scores for "cat"',
          detail:
            'q2 . k1 = (0)(1) + (1)(0) + (1)(0) + (0)(0) = 0. q2 . k2 = (0)(1) + (1)(0) + (1)(1) + (0)(0) = 1. Position 3 is masked. Scaling by 2 gives 0 and 0.5.',
          latex: 's_{2} = [0.0, \; 0.5, \; -\\infty]',
        },
        {
          label: 'Row 2: softmax',
          detail:
            'exp(0) = 1.000 and exp(0.5) = 1.649, summing to 2.649. Dividing gives 1.000 / 2.649 = 0.378 and 1.649 / 2.649 = 0.622. So "cat" takes 38 per cent from "the" and 62 per cent from itself.',
          latex: '\\alpha_{2} = [0.378, \; 0.622, \; -]',
        },
        {
          label: 'Row 3: the scores for "sat"',
          detail:
            'q3 . k1 = (1)(1) = 1. q3 . k2 = (1)(1) + (1)(1) = 2. q3 . k3 = (1)(1) = 1. Nothing is masked, since position 3 sees everything. Dividing each by 2 gives 0.5, 1.0 and 0.5.',
          latex: 's_{3} = [0.5, \; 1.0, \; 0.5]',
        },
        {
          label: 'Row 3: softmax',
          detail:
            'exp(0.5) = 1.6487, exp(1.0) = 2.7183, exp(0.5) = 1.6487. The sum is 6.0157. Dividing: 1.6487 / 6.0157 = 0.274, 2.7183 / 6.0157 = 0.452, 1.6487 / 6.0157 = 0.274. So "sat" attends 27 per cent to "the", 45 per cent to "cat" and 27 per cent to itself — a plausible pattern for a verb locating its subject.',
          latex: '\\alpha_{3} = [0.274, \; 0.452, \; 0.274]',
        },
        {
          label: 'The output for "sat"',
          detail:
            'Blend the value vectors with those weights: 0.274 x [1,0,0,0] + 0.452 x [0,2,0,0] + 0.274 x [0,0,3,0] = [0.274, 0.904, 0.822, 0]. The output vector for "sat" now carries information from all three tokens in learned proportions, and this is what continues into the rest of the block.',
          latex: 'o_3 = \\sum_j \\alpha_{3j} v_j = [0.274,\; 0.904,\; 0.822,\; 0]',
        },
        {
          label: 'What the scaling changed',
          detail:
            'Without dividing by 2, the row-3 scores would be 1, 2, 1, giving exp values 2.718, 7.389, 2.718 and weights 0.212, 0.576, 0.212. The distribution is noticeably sharper. With d_k = 4 the difference is mild; at d_k = 128 the unscaled scores would be large enough to push softmax almost entirely onto one position and flatten the gradient to nearly zero.',
          latex: '\\alpha_{3}^{\\text{unscaled}} = [0.212, \; 0.576, \; 0.212]',
        },
        {
          label: 'The full attention matrix',
          detail:
            'Stacking the three rows gives a lower-triangular matrix: row 1 is [1.000, 0, 0], row 2 is [0.378, 0.622, 0], row 3 is [0.274, 0.452, 0.274]. Every row sums to one and the upper triangle is exactly zero, which is the visual signature of causal attention.',
        },
      ],
      conclusion:
        'Every number here came from three dot products, one division and one softmax per row. Scale this to 64 dimensions per head, 32 heads, 40 layers and 8,000 tokens and nothing conceptual changes — only the size of the matrices. It is also worth noticing what the attention weights are not: they are the mixing proportions used at one layer of one head, and reading them as an explanation of the model output is a well-documented mistake, because the value vectors and the forty layers that follow matter just as much.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Attention from scratch, matching the worked example',
        runnable: true,
        code: `import torch

d_k = 4
scale = d_k ** 0.5                       # = 2.0

Q = torch.tensor([[1., 0., 0., 0.],      # the
                  [0., 1., 1., 0.],      # cat
                  [1., 0., 1., 0.]])     # sat
K = torch.tensor([[1., 0., 0., 0.],
                  [1., 0., 1., 0.],
                  [0., 0., 1., 0.]])
V = torch.tensor([[1., 0., 0., 0.],
                  [0., 2., 0., 0.],
                  [0., 0., 3., 0.]])

scores = (Q @ K.T) / scale
mask = torch.triu(torch.ones(3, 3), diagonal=1).bool()   # True above the diagonal
scores = scores.masked_fill(mask, float("-inf"))

weights = torch.softmax(scores, dim=-1)
out = weights @ V

print("attention weights:\\n", weights.round(decimals=3))
print("output:\\n", out.round(decimals=3))`,
        output: `attention weights:
 tensor([[1.0000, 0.0000, 0.0000],
        [0.3775, 0.6225, 0.0000],
        [0.2741, 0.4519, 0.2741]])
output:
 tensor([[1.0000, 0.0000, 0.0000, 0.0000],
        [0.3775, 1.2450, 0.0000, 0.0000],
        [0.2741, 0.9037, 0.8222, 0.0000]])`,
        explanation:
          'These are exactly the numbers computed by hand, which is worth confirming for yourself — the gap between reading the formula and trusting it closes when the arithmetic matches. Two implementation details matter in practice: the mask is applied to the scores before the softmax rather than to the weights afterwards, because zeroing weights after normalisation would leave rows that no longer sum to one, and the mask uses a large negative value rather than a literal infinity in production code to avoid producing not-a-number values under mixed precision.',
      },
      {
        language: 'python',
        title: 'Multi-head attention as a module',
        runnable: true,
        code: `import torch
import torch.nn as nn

class MultiHeadSelfAttention(nn.Module):
    def __init__(self, d_model: int, n_heads: int):
        super().__init__()
        assert d_model % n_heads == 0
        self.n_heads = n_heads
        self.d_head = d_model // n_heads
        self.qkv = nn.Linear(d_model, 3 * d_model, bias=False)   # one fused projection
        self.proj = nn.Linear(d_model, d_model, bias=False)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        B, T, D = x.shape
        q, k, v = self.qkv(x).split(D, dim=2)
        # (B, T, D) -> (B, n_heads, T, d_head): each head gets its own slice
        q = q.view(B, T, self.n_heads, self.d_head).transpose(1, 2)
        k = k.view(B, T, self.n_heads, self.d_head).transpose(1, 2)
        v = v.view(B, T, self.n_heads, self.d_head).transpose(1, 2)

        scores = (q @ k.transpose(-2, -1)) / self.d_head ** 0.5
        causal = torch.triu(torch.ones(T, T, device=x.device), diagonal=1).bool()
        scores = scores.masked_fill(causal, float("-inf"))

        out = torch.softmax(scores, dim=-1) @ v                  # (B, heads, T, d_head)
        out = out.transpose(1, 2).contiguous().view(B, T, D)     # concatenate heads
        return self.proj(out)

x = torch.randn(2, 6, 64)
print(MultiHeadSelfAttention(d_model=64, n_heads=8)(x).shape)`,
        output: `torch.Size([2, 6, 64])`,
        explanation:
          'This is a complete, working attention layer in about twenty lines. The view-and-transpose dance is the part worth studying: the model dimension is split into equal slices, one per head, so eight heads over 64 dimensions each operate in an 8-dimensional subspace. Heads cost nothing extra in total compute — they redistribute the same parameters — which is why they are close to free and why models use many of them. The output projection at the end is not decoration: without it the concatenated head outputs would never be mixed with one another.',
      },
      {
        language: 'python',
        title: 'Measuring the quadratic cost yourself',
        runnable: true,
        code: `import torch, time

def attention_cost(T: int, d: int = 64, trials: int = 5) -> float:
    q = torch.randn(1, T, d)
    k = torch.randn(1, T, d)
    v = torch.randn(1, T, d)
    start = time.perf_counter()
    for _ in range(trials):
        w = torch.softmax(q @ k.transpose(-2, -1) / d ** 0.5, dim=-1)
        _ = w @ v
    return (time.perf_counter() - start) / trials

base = attention_cost(512)
for T in [512, 1024, 2048, 4096]:
    t = attention_cost(T)
    print(f"T={T:>5}  time x{t / base:6.1f}  score matrix entries {T * T:,}")`,
        output: `T=  512  time x   1.0  score matrix entries 262,144
T= 1024  time x   3.8  score matrix entries 1,048,576
T= 2048  time x  15.1  score matrix entries 4,194,304
T= 4096  time x  61.4  score matrix entries 16,777,216`,
        explanation:
          'Each doubling of sequence length costs roughly four times as much, which is the quadratic term made visible on your own machine. This single measurement explains why long context is expensive, why FlashAttention — which computes the same result without ever materialising the full score matrix in memory — was such a significant engineering result, and why a great deal of research has gone into approximations that trade exactness for subquadratic scaling.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Coreference within a long document',
        usage:
          'When a model correctly resolves a pronoun to a noun mentioned three paragraphs earlier, attention is the mechanism that made that noun directly reachable. In a recurrent model the information would have had to survive hundreds of sequential steps.',
      },
      {
        context: 'Code models tracking a variable',
        usage:
          'A model completing a function must connect a use of a variable to its definition far above. Attention heads that specialise in this kind of matching have been identified directly in interpretability work.',
      },
      {
        context: 'Serving cost and context pricing',
        usage:
          'The quadratic term is why providers price long contexts as they do and why latency rises sharply with prompt length. Understanding it changes how you design a retrieval pipeline: sending three relevant chunks rather than thirty is a cost decision grounded in this formula.',
      },
      {
        context: 'Attention visualisations in model debugging',
        usage:
          'Plotting attention matrices helps diagnose behaviour — for instance seeing most weight parked on the first token, a well-documented pattern often called an attention sink. It is a useful diagnostic, but it is weak evidence about why a particular output was produced.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: '`torch.nn.functional.scaled_dot_product_attention` provides a fused, memory-efficient implementation used by most modern code.' },
      { tool: 'FlashAttention', role: 'Computes exact attention without materialising the T-by-T matrix, turning a memory bottleneck into a compute-bound operation.' },
      { tool: 'Hugging Face transformers', role: 'Every causal model exposes `output_attentions=True`, which returns the per-head weight matrices for inspection.' },
    ],

    commonMistakes: [
      {
        mistake: 'Omitting the square-root scaling',
        why: 'The dot product of two d_k-dimensional vectors has variance proportional to d_k, so at realistic dimensions unscaled scores are large, the softmax saturates towards one-hot, and gradients through it approach zero. Training stalls or becomes unstable.',
        fix: 'Always divide by the square root of the head dimension — note head dimension, not model dimension, which is a common off-by-a-factor bug in hand-written implementations.',
      },
      {
        mistake: 'Applying the causal mask after the softmax',
        why: 'Zeroing weights after normalisation leaves rows that no longer sum to one, so the output is a shrunken blend and the model leaks a scale signal about how many positions were masked.',
        fix: 'Add negative infinity to the scores before the softmax. The exponential of negative infinity is zero, and the remaining weights renormalise correctly.',
      },
      {
        mistake: 'Treating attention weights as an explanation of the output',
        why: 'Weights describe mixing proportions in one head of one layer. The value vectors, the other heads, and every subsequent layer all shape the result, and there is published work showing attention maps can be altered without changing predictions.',
        fix: 'Use attention maps as a diagnostic and a source of hypotheses. For causal claims, use interventional methods such as ablating a head and measuring the effect.',
      },
      {
        mistake: 'Believing multi-head attention multiplies the compute cost',
        why: 'The model dimension is split across heads rather than duplicated, so eight heads of dimension 64 cost about the same as one head of dimension 512.',
        fix: 'Think of heads as partitioning the same budget into independent subspaces, which lets different heads learn different relational patterns at essentially no extra cost.',
      },
      {
        mistake: 'Assuming a longer context window is always better',
        why: 'Attention cost grows quadratically, and retrieval quality within a very long context is uneven — models often attend well to the beginning and end and less well to the middle.',
        fix: 'Put the most relevant material in the context rather than the most material. Measure whether your pipeline actually uses what you send before paying for a longer window.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Explain query, key and value, and why three projections are needed rather than one.',
        answer:
          'Each token is projected three ways by separate learned matrices. The query represents what this token needs from context; the key represents what a token offers as a basis for matching; the value is the content contributed when a match occurs. Separating query from key allows the matching to be asymmetric, so token A can strongly attend to B without B attending to A — which is necessary, because a pronoun should seek its antecedent and not the reverse. Separating key from value decouples advertising from content, so a token can be easy to find on one basis while contributing something quite different. If you collapsed all three into the raw token vector you would have symmetric similarity search over the input, which is strictly less expressive and empirically much worse.',
        followUp:
          'A strong candidate notes that Q, K and V are usually computed by one fused linear layer for efficiency, then split.',
      },
      {
        level: 'advanced',
        question: 'Why is the dot product divided by the square root of d_k?',
        answer:
          'Assume the query and key components are roughly independent with unit variance at initialisation. Their dot product is a sum of d_k such products, so it has variance d_k and standard deviation the square root of d_k. At a head dimension of 128 that means scores routinely reaching magnitudes around 11, and the difference between the largest and the rest is then large enough that the softmax output is nearly one-hot. Since the gradient of softmax is proportional to p times (1 - p), a saturated softmax passes almost no gradient, so the attention pattern cannot be learned. Dividing by the square root of d_k restores unit variance regardless of dimension, keeping the softmax in a region where it discriminates but still has usable gradients.',
        followUp:
          'A strong answer distinguishes head dimension from model dimension, since the scaling uses the former.',
      },
      {
        level: 'ml-engineer',
        question: 'What is the computational complexity of self-attention, and what follows from it in practice?',
        answer:
          'Building the score matrix requires T squared times d_k multiply-accumulate operations and produces a T-by-T matrix, so both time and memory are quadratic in sequence length, while the feed-forward sublayer is linear in T and quadratic in model dimension. At short contexts the feed-forward term dominates; as context grows, attention takes over. Three practical consequences follow. Long-context inference is expensive and latency climbs faster than linearly with prompt length. Memory, not compute, is often the first binding constraint, which is why FlashAttention — computing exact attention in tiles without ever materialising the full matrix — was such a significant result. And at inference the KV cache makes each new token cost linear rather than quadratic work, at the price of memory that grows with context length, which is frequently what limits how many concurrent requests a server can hold.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'With d_k = 16, a query and key give a raw dot product of 8. What is the scaled score? If a second key gives a raw dot product of 12, what are the two attention weights after softmax over just these two?',
        hint: 'Scale first, then exponentiate the scaled values.',
        solution:
          'The square root of 16 is 4, so the scaled scores are 8 / 4 = 2 and 12 / 4 = 3. Exponentiating gives 7.389 and 20.086, summing to 27.475, so the weights are 0.269 and 0.731. Note what the scaling did: unscaled, the scores 8 and 12 would give weights of 0.018 and 0.982, an almost one-hot distribution. The same raw preference becomes a far more moderate one, which is exactly the point of the scaling factor.',
      },
      {
        prompt:
          'Write out the causal mask for a sequence of length 4 as a matrix of 0 and negative infinity, and state how many of the 16 score entries are actually used.',
        hint: 'Position i may attend to position j only when j is less than or equal to i.',
        solution:
          'Row 1 is [0, -inf, -inf, -inf]; row 2 is [0, 0, -inf, -inf]; row 3 is [0, 0, 0, -inf]; row 4 is [0, 0, 0, 0]. Ten of the sixteen entries are used — the count is T(T+1)/2 = 10. This is why causal attention costs roughly half of bidirectional attention, and it is also why the first token has no choice but to attend entirely to itself, since it is the only position it can see.',
      },
      {
        prompt:
          'A model has model dimension 512 and 8 heads. What is the head dimension, what are the shapes of Q, K and V per head for a 100-token sequence, and how many entries does one head\'s score matrix contain?',
        hint: 'The model dimension is divided among the heads, not duplicated.',
        solution:
          'The head dimension is 512 / 8 = 64. Per head, Q, K and V each have shape (100, 64). The score matrix for one head is (100, 100) = 10,000 entries, and across 8 heads that is 80,000 entries for this one layer at this short length. Scaling the sequence to 8,000 tokens would give 64 million entries per head per layer, which is a direct route to understanding why memory rather than arithmetic is usually the first thing to break at long context.',
      },
    ],

    quiz: [
      {
        id: 'GEN-005-q1',
        type: 'mcq',
        concept: 'qkv roles',
        prompt: 'In self-attention, what does the value vector represent?',
        options: [
          'The content mixed into the output when a token is attended to',
          'What the current token is looking for',
          'How a token advertises itself for matching',
          'The position of the token in the sequence',
        ],
        answerIndex: 0,
        explanation:
          'The query is what a token seeks and the key is how a token advertises itself; the value is the content actually blended into the output. Keeping key and value separate lets a token be findable on one basis and contribute something different.',
      },
      {
        id: 'GEN-005-q2',
        type: 'numeric',
        concept: 'attention arithmetic',
        prompt: 'Scores after scaling are [0.5, 1.0, 0.5]. What attention weight does the middle position receive, to three decimal places?',
        answer: 0.452,
        tolerance: 0.005,
        explanation:
          'exp(0.5) = 1.6487 twice and exp(1.0) = 2.7183, summing to 6.0157. The middle weight is 2.7183 / 6.0157 = 0.452 — exactly the row computed in the worked example.',
      },
      {
        id: 'GEN-005-q3',
        type: 'truefalse',
        concept: 'scaling factor',
        prompt: 'The square-root scaling in attention exists to keep the output vectors small.',
        answer: false,
        explanation:
          'It controls the variance of the scores entering the softmax. Without it, large head dimensions push the softmax towards one-hot, where its gradient nearly vanishes and the attention pattern cannot be learned.',
      },
      {
        id: 'GEN-005-q4',
        type: 'order',
        concept: 'attention pipeline',
        prompt: 'Order the steps of masked scaled dot-product attention.',
        items: [
          'Project the input into queries, keys and values',
          'Compute all pairwise query-key dot products',
          'Divide the scores by the square root of the head dimension',
          'Add the causal mask so future positions score negative infinity',
          'Apply softmax along each row',
          'Multiply the weights by the value matrix',
        ],
        explanation:
          'The mask must be applied to the scores before the softmax. Masking afterwards would leave rows that no longer sum to one and would leak information about how many positions were hidden.',
      },
      {
        id: 'GEN-005-q5',
        type: 'code-output',
        language: 'python',
        concept: 'causal masking',
        prompt: 'What are the attention weights in row 1 of a causally masked 3-token sequence?',
        code: 'scores = torch.tensor([[2.0, 5.0, 1.0]])\nmask = torch.tensor([[False, True, True]])\nscores = scores.masked_fill(mask, float("-inf"))\nprint(torch.softmax(scores, dim=-1))',
        options: [
          'tensor([[1., 0., 0.]])',
          'tensor([[0.0464, 0.9362, 0.0171]])',
          'tensor([[0.3333, 0.3333, 0.3333]])',
          'tensor([[2.0, 0.0, 0.0]])',
        ],
        answerIndex: 0,
        explanation:
          'Positions 2 and 3 are masked to negative infinity, whose exponential is zero, so all the weight falls on position 1 regardless of the fact that position 2 had the highest raw score. The first token in a decoder always attends entirely to itself.',
      },
      {
        id: 'GEN-005-q6',
        type: 'multi',
        concept: 'complexity and heads',
        prompt: 'Which statements about attention cost and multi-head attention are correct? Select all that apply.',
        options: [
          'The score matrix has T squared entries for a sequence of length T',
          'Doubling sequence length roughly quadruples attention compute',
          'Eight heads cost roughly eight times as much compute as one head of the same model dimension',
          'Heads split the model dimension into subspaces rather than duplicating it',
          'The output projection after concatenating heads can be omitted with no loss',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Heads partition the same dimension budget, so they are close to free. The output projection is required — without it the concatenated head outputs are never mixed with one another, which removes a meaningful part of the layer expressiveness.',
      },
      {
        id: 'GEN-005-q7',
        type: 'explain',
        concept: 'attention as soft lookup',
        prompt: 'Explain self-attention as a soft dictionary lookup, and say why the lookup has to be soft.',
        rubric: [
          'Maps query, key and value onto the dictionary metaphor accurately',
          'Explains that softmax produces weights that sum to one, giving a blended result',
          'States that a hard selection would not be differentiable and could not be trained by gradient descent',
        ],
        sampleAnswer:
          'In an ordinary dictionary you supply a key, it matches exactly one stored key, and you get back its value. Attention does the same shape of thing with three differences. Every token emits a query saying what it needs, every token emits a key advertising what it offers, and matching is by dot product rather than by equality. Rather than selecting one match, the scores are pushed through a softmax to produce weights summing to one, and the output is a blend of every value in those proportions. The softness is not merely a nicety: a hard argmax selection is a step function with zero gradient almost everywhere, so the model could never learn what to attend to. Softmax makes the whole lookup differentiable, which means the projections that define what counts as a match are learned from data along with everything else.',
        explanation:
          'A good answer connects the metaphor to the mathematics and identifies differentiability as the reason for the softmax, rather than treating softness as a design preference.',
      },
    ],

    flashcards: [
      { front: 'The attention formula', back: 'softmax(Q K^T / sqrt(d_k)) V — compare every query with every key, scale, normalise, then blend the value vectors.' },
      { front: 'What do Q, K and V represent?', back: 'Query: what this token needs. Key: what a token offers for matching. Value: the content blended into the output.' },
      { front: 'Why divide by sqrt(d_k)?', back: 'The dot product has variance d_k, so without scaling the softmax saturates at large head dimensions and its gradient nearly vanishes.' },
      { front: 'What is a causal mask?', back: 'Negative infinity added to scores for future positions before the softmax, so a token can only attend to itself and earlier tokens.' },
      { front: 'What does multi-head attention buy?', back: 'Several independent relational patterns learned in parallel over subspaces of the same dimension budget, then concatenated and projected.' },
      { front: 'Cost of attention', back: 'Quadratic in sequence length for both time and memory: the score matrix has T squared entries.' },
      { front: 'Are attention weights an explanation?', back: 'No. They are mixing proportions in one head of one layer. Causal claims need interventions such as ablating a head.' },
    ],

    challenge: {
      title: 'Implement and interrogate an attention layer',
      brief:
        'Write multi-head causal self-attention from scratch in PyTorch without using any built-in attention function, and verify it against `torch.nn.functional.scaled_dot_product_attention` on random input. Then run a small pretrained causal model on a sentence containing a pronoun, extract the attention matrices, and find the head whose weights most strongly connect the pronoun to its antecedent. Write a paragraph on what that head appears to do, and a second paragraph on why that observation is weaker evidence than it looks.',
      language: 'python',
      acceptanceCriteria: [
        'The hand-written implementation matches the reference within floating-point tolerance',
        'Causal masking is applied to scores before the softmax and verified to produce a lower-triangular weight matrix',
        'Attention maps are extracted from a real model and one head is identified with evidence',
        'The second paragraph names a concrete reason attention maps are not explanations',
      ],
      starterCode: 'import torch\nimport torch.nn as nn\nimport torch.nn.functional as F\n\nclass MyAttention(nn.Module):\n    def __init__(self, d_model: int, n_heads: int):\n        super().__init__()\n',
    },

    teachingPrompt: {
      prompt:
        'Teach self-attention to someone who understands dot products but has never seen a transformer. Use a concrete three-word example and real numbers.',
      mustCover: [
        'Each token produces a query, a key and a value through learned projections',
        'Scores are dot products between queries and keys, scaled by the square root of the head dimension',
        'Softmax turns the scores into weights that sum to one, and the output is a weighted blend of values',
        'A decoder masks future positions so each token sees only itself and what came before',
      ],
      bonusSignals: ['walks through actual arithmetic rather than describing it', 'explains why the scaling matters', 'mentions multiple heads and the quadratic cost'],
      sampleExplanation:
        "Take the three words the, cat, sat. Each word gets turned into three different vectors by three learned matrices: a query saying what it needs from the rest of the sentence, a key advertising what it has, and a value carrying what it would contribute. To work out the new representation of sat, take its query and dot it against all three keys. Suppose that gives 1, 2 and 1. Divide each by the square root of the head dimension — with four dimensions that is 2, so we get 0.5, 1, 0.5 — and push them through a softmax, which gives 0.27, 0.45 and 0.27. Those are proportions, and they add to one. The output for sat is then 0.27 of the value vector for the, plus 0.45 of the value for cat, plus 0.27 of its own. It has absorbed information from the whole sentence, weighted by how relevant each word turned out to be. Two additions complete the picture. Because this is a left-to-right model, any word later in the sentence is blocked before the softmax, so the first word can only ever attend to itself. And rather than one such mechanism, the model runs several in parallel over different slices of the vector, so one can track grammatical subjects while another tracks something else entirely. The cost is that every word is compared with every other word, so doubling the length of the text roughly quadruples the work.",
    },
  },
