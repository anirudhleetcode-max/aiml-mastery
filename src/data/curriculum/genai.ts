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
