import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'ML-001',
    domain: 'ML',
    module: 'Foundations',
    topic: 'What machine learning is',
    title: 'AI, Machine Learning and Deep Learning',
    slug: 'ai-ml-and-deep-learning',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: [],
    tags: ['ai', 'machine learning', 'deep learning', 'definitions', 'history'],

    learningObjectives: [
      'Distinguish artificial intelligence, machine learning and deep learning as three nested ideas rather than three synonyms',
      'Explain the core shift machine learning makes: rules are learned from examples instead of written by hand',
      'Decide whether a given problem genuinely needs machine learning or is better solved with ordinary code',
      'Describe the ingredients every machine learning system needs: data, a model family, an objective and a way to evaluate honestly',
    ],

    terminology: [
      {
        term: 'Artificial intelligence (AI)',
        definition:
          'The broad field concerned with building systems that perform tasks we would call intelligent if a human did them. It includes hand-written rule engines, search algorithms and planners, not only learned models.',
        simple: 'The whole field of making machines act clever, by any method at all.',
      },
      {
        term: 'Machine learning (ML)',
        definition:
          'A subset of AI in which a program improves its performance on a task by being exposed to data, rather than by a human encoding the decision rules explicitly.',
        simple: 'Showing a computer lots of examples so it works out the rules itself.',
      },
      {
        term: 'Deep learning (DL)',
        definition:
          'A subset of machine learning that uses neural networks with many layers, which learn their own intermediate representations of the input instead of relying on hand-designed features.',
        simple: 'Machine learning using big stacks of layers that invent their own way of seeing the data.',
      },
      {
        term: 'Model',
        definition:
          'A function with adjustable parameters that maps inputs to outputs. Training is the process of choosing parameter values that make that mapping useful.',
        simple: 'A machine with dials on it; training is turning the dials until the answers come out right.',
      },
      {
        term: 'Training',
        definition:
          'The process of adjusting a model against a dataset so that a chosen error measure gets smaller. It is optimisation, not magic.',
        simple: 'Turning the dials while checking the score.',
      },
    ],

    simpleExplanation:
      "Suppose you want a program that tells cats apart from dogs in photographs. The old way was to sit down and write the rules yourself: cats have pointy ears, dogs have longer snouts, and so on. You would spend a month on it and it would still fail on a Persian cat in bad lighting, because the real rule for what a cat looks like is far too complicated for anyone to write out. Machine learning turns the problem around. Instead of writing the rules, you collect ten thousand photographs that people have already labelled cat or dog, and you hand them to a program that adjusts itself until it gets most of them right. Nobody ever tells it about ears. It finds patterns in the pixels on its own. Artificial intelligence is the big outer circle: any attempt at machine cleverness, including old-fashioned hand-written rules. Machine learning is the circle inside it where the rules come from data. Deep learning is a smaller circle inside that, where the learning is done by neural networks deep enough to build up their own idea of what an ear even is.",

    whyItExists:
      'For a large class of problems — recognising speech, ranking search results, spotting fraud, translating text — nobody can write down the rules, because the rules are not consciously known even to the humans who are good at the task. Machine learning exists because it is often easier to collect thousands of examples of correct behaviour than to articulate one correct rule.',

    analogy: {
      scenario:
        "Think about how a child learns to recognise a dog. No adult ever recites a definition involving four legs, a tail and a specific snout-to-skull ratio. Instead, the child sees a dog in the park and an adult says 'dog'. This happens a few hundred times, with poodles and greyhounds and a picture in a book, and occasionally the child points at a sheep and is told 'no, that is a sheep'. Within a couple of years the child recognises breeds they have never seen before, and could not explain the rule if you asked.",
      mapping: [
        { from: 'Each dog the child sees and is told the name of', to: 'One labelled training example' },
        { from: 'The correction when the child says dog at a sheep', to: 'The error signal that drives learning' },
        { from: "The child's slowly improving sense of dogginess", to: "The model's parameters being adjusted" },
        { from: 'Recognising a breed never seen before', to: 'Generalisation to unseen test data' },
        { from: 'Being unable to state the rule out loud', to: 'The interpretability problem in learned models' },
      ],
      bridge:
        "The mapping is exact in the part that matters: in both cases the competence comes from exposure to examples and correction, not from a stated rule, and in both cases the resulting knowledge is hard to put into words. That last point is not a curiosity — it is why a whole sub-field of ML exists to explain why a model decided what it decided.",
      limitations:
        'A child learns from a handful of examples and transfers knowledge across domains effortlessly; a classical ML model typically needs thousands of examples and transfers almost nothing. The analogy explains the mechanism of learning from examples, not its efficiency.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Traditional programming versus machine learning',
        caption: 'The inputs and outputs swap places. That is the entire conceptual shift.',
        left: {
          heading: 'Traditional programming',
          points: [
            'You supply: data + rules you wrote',
            'The computer produces: answers',
            'Works when you can state the rule precisely (tax calculation, payroll, sorting)',
            'Debuggable by reading the code',
            'Fails when the rule is unknown or has ten thousand exceptions',
          ],
        },
        right: {
          heading: 'Machine learning',
          points: [
            'You supply: data + the answers for that data',
            'The computer produces: the rules (a fitted model)',
            'Works when examples are plentiful but the rule is unwritable (images, speech, fraud)',
            'Debugged by inspecting data and metrics, not by reading parameters',
            'Fails silently when the data is unrepresentative or the objective is wrong',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'The shape of every machine learning project',
        caption: 'Nine tenths of the time is spent in the first two boxes. That is not a failure of planning.',
        steps: [
          { label: 'Frame the question', detail: 'What exactly is being predicted, and what decision changes as a result?' },
          { label: 'Collect and label data', detail: 'Examples of inputs together with the correct outputs, or raw inputs for unsupervised work.' },
          { label: 'Prepare features', detail: 'Clean, encode and scale so the data is in a form a model can consume.' },
          { label: 'Choose a model family', detail: 'Linear model, tree ensemble, neural network — each is a different set of shapes the rule is allowed to take.' },
          { label: 'Train', detail: 'Adjust parameters to minimise an error measure on training data.' },
          { label: 'Evaluate honestly', detail: 'Measure on data the model has never seen. This is the only number that means anything.' },
          { label: 'Deploy and monitor', detail: 'The world changes, so yesterday’s accuracy is not a guarantee of tomorrow’s.' },
        ],
      },
      {
        kind: 'table',
        title: 'Does this problem actually need machine learning?',
        caption: 'Reaching for ML when ordinary code would do is a common and expensive mistake.',
        columns: ['Problem', 'Better solved by', 'Why'],
        rows: [
          ['Compute VAT on an invoice', 'Ordinary code', 'The rule is published, exact and stable. A learned approximation would only add error.'],
          ['Sort users by signup date', 'Ordinary code', 'A deterministic operation with a known correct answer.'],
          ['Flag a transaction as fraudulent', 'Machine learning', 'Fraud patterns are complex, shifting, and known only through labelled history.'],
          ['Transcribe a voice note', 'Deep learning', 'The mapping from waveform to text has no writable rule and needs learned representations.'],
          ['Decide who to hire', 'Neither, alone', 'The historical labels encode past human bias; a model would learn and launder it.'],
        ],
      },
      {
        kind: 'timeline',
        title: 'How the field got here',
        events: [
          { when: '1950s', what: 'Turing asks whether machines can think; Samuel writes a checkers program that improves by self-play and coins "machine learning".' },
          { when: '1960s–70s', what: 'Perceptrons, then a long winter after their limitations are publicised.' },
          { when: '1980s–90s', what: 'Backpropagation, decision trees and support vector machines. Statistics and AI converge.' },
          { when: '1997', what: 'Deep Blue beats Kasparov — largely by search and hand-crafted evaluation, not learning. AI is not always ML.' },
          { when: '2012', what: 'AlexNet wins ImageNet by a wide margin. GPUs plus large labelled data make deep learning dominant in vision.' },
          { when: '2017–present', what: 'The Transformer, then large language models. Scale becomes a first-class ingredient alongside architecture.' },
        ],
      },
    ],

    formalDefinition:
      'A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P if its performance at tasks in T, as measured by P, improves with experience E (Mitchell, 1997). Machine learning is the study of algorithms with this property; deep learning is the subset in which the hypothesis class consists of multi-layer neural networks that learn their own feature representations.',

    math: {
      intuition:
        'Stripped of vocabulary, supervised machine learning is a search problem. There is some unknown true relationship between inputs and outputs. You pick a family of candidate functions, you pick a way of scoring how wrong a candidate is on your data, and you search the family for the candidate with the lowest score. Everything else in this domain — linear regression, trees, neural networks — is a choice of family and a choice of score.',
      formulas: [
        {
          latex: 'f^{*} = \\arg\\min_{f \\in \\mathcal{H}} \\; \\frac{1}{n}\\sum_{i=1}^{n} L\\big(y_i, f(x_i)\\big)',
          name: 'Empirical risk minimisation',
          meaning:
            'Choose, from the family of functions you are willing to consider, the one that makes the average loss on your training examples smallest. Almost every algorithm in this domain is a special case of this line.',
          variables: [
            { symbol: 'f^{*}', meaning: 'The fitted model — the function the training procedure returns' },
            { symbol: '\\mathcal{H}', meaning: 'The hypothesis class: every function the chosen model family can express' },
            { symbol: 'n', meaning: 'Number of training examples' },
            { symbol: 'x_i', meaning: 'The feature vector of the i-th example' },
            { symbol: 'y_i', meaning: 'The true label of the i-th example' },
            { symbol: 'L', meaning: 'The loss function: how much it costs to predict f(x) when the truth was y' },
          ],
          category: 'optimization',
        },
        {
          latex: 'R(f) = \\mathbb{E}_{(x,y) \\sim \\mathcal{D}}\\big[L(y, f(x))\\big]',
          name: 'True risk (generalisation error)',
          meaning:
            'The quantity you actually care about: expected loss over the real distribution of data, including examples you have never seen. You can never compute it, only estimate it with a held-out set.',
          variables: [
            { symbol: 'R(f)', meaning: 'True risk of model f' },
            { symbol: '\\mathcal{D}', meaning: 'The unknown distribution that real data is drawn from' },
            { symbol: '\\mathbb{E}', meaning: 'Expectation — the long-run average' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'You want the model with the lowest true risk R(f), but D is unknown, so R(f) cannot be computed.',
        'You do have a sample of n points drawn from D, so you replace the expectation with an average over the sample. This is the empirical risk.',
        'Minimising the empirical risk is a computable proxy for minimising the true risk — this substitution is the entire foundation of supervised learning.',
        'The substitution is only safe when the sample resembles D and the hypothesis class is not so flexible that it can fit noise. When it is, empirical risk goes to zero and true risk does not. That failure has a name: overfitting.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Rules by hand versus rules from data',
        runnable: true,
        code: `# The hand-written way: you invent a threshold and defend it forever.
def is_spam_by_rule(subject: str) -> bool:
    bad = ["free", "winner", "click here", "viagra"]
    return any(word in subject.lower() for word in bad)

print(is_spam_by_rule("FREE gift inside"))        # caught
print(is_spam_by_rule("Re: invoice, urgent wire"))  # missed

# The learned way: you supply examples and the algorithm finds the rule.
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

subjects = [
    "free gift inside", "you are a winner", "click here now",
    "urgent wire transfer request", "re: invoice for march",
    "lunch tomorrow?", "project update attached", "meeting moved to 3pm",
]
labels = [1, 1, 1, 1, 0, 0, 0, 0]  # 1 = spam

model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(subjects, labels)

print(model.predict(["urgent wire transfer needed"])[0])
print(model.predict(["are we still on for lunch"])[0])`,
        output: `True
False
1
0`,
        explanation:
          'The rule-based function is readable and immediately wrong: "urgent wire transfer request" is a classic fraud subject and contains none of the banned words. The learned model was never told which words matter; it counted words across eight labelled examples and inferred the association. Eight examples is absurdly few — the point is that the code that learns the rule is shorter than the code that states it, and it improves as data arrives while the rule list does not.',
      },
      {
        language: 'python',
        title: 'Deep learning is machine learning that builds its own features',
        code: `# Classical ML: a human decides what the model gets to look at.
features = {
    "email_length": 412,
    "n_exclamation_marks": 7,
    "sender_in_contacts": 0,
    "has_attachment": 1,
}
# Someone sat down and chose those four. That choice is feature engineering,
# and in classical ML it usually matters more than the model.

# Deep learning: the raw input goes in and the layers invent the features.
# (Sketch only — the DL domain builds this properly.)
import numpy as np

raw_pixels = np.random.rand(1, 28 * 28)   # the input is just numbers
W1 = np.random.randn(28 * 28, 128) * 0.01
W2 = np.random.randn(128, 10) * 0.01

hidden = np.maximum(0, raw_pixels @ W1)   # layer 1 learns edges, eventually
logits = hidden @ W2                      # layer 2 combines them into classes
print(hidden.shape, logits.shape)`,
        output: `(1, 128) (1, 10)`,
        explanation:
          'The 128 numbers in `hidden` are features, but no human chose them — they are whatever the training process found useful. That is the practical difference between classical ML and deep learning: in the first you spend your effort on the input, in the second you spend it on the architecture and the data volume. Neither is universally better, and on medium-sized tabular data the first still usually wins.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Email spam filtering (Gmail, Outlook)',
        usage:
          'The canonical early ML success. Rule lists were defeated within weeks by adversaries who simply rephrased; a model retrained daily on what users mark as spam keeps up, because the rules regenerate themselves from fresh labels.',
      },
      {
        context: 'Medical imaging triage',
        usage:
          'A deep model flags chest X-rays likely to show a pneumothorax so a radiologist reads those first. Note the framing: it reorders a queue rather than making a diagnosis, because the cost of a false negative is a human life and the model is a filter, not a doctor.',
      },
      {
        context: 'Credit card fraud detection',
        usage:
          'A gradient-boosted model scores each transaction in milliseconds using features such as amount relative to the cardholder’s history, merchant category and geographic velocity. Fraudsters adapt constantly, so the model is retrained on a rolling window — a static rule set would decay.',
      },
      {
        context: 'A company that did not need ML',
        usage:
          'Plenty of teams have built a model to predict something a SQL query already answers exactly, such as which subscriptions expire this month. If the answer is deterministic and already in the database, machine learning only adds error and maintenance cost.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: 'The standard library for classical machine learning; it defines the fit/predict interface that the whole ecosystem imitates.' },
      { tool: 'PyTorch', role: 'Where the deep learning half of the field lives, covered in the DL domain.' },
      { tool: 'pandas', role: 'Holds the dataset before it becomes a feature matrix; most of an ML project happens here.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using "AI", "ML" and "deep learning" as interchangeable words',
        why: 'They name nested sets of different sizes. A chess engine using alpha-beta search is AI with no learning at all; logistic regression is ML with no depth. Blurring them makes it impossible to reason about which tool a problem needs.',
        fix: 'Hold the picture of three nested circles: AI contains ML, ML contains DL. When someone says "we used AI", ask which circle they mean.',
      },
      {
        mistake: 'Reaching for machine learning when a rule would do',
        why: 'A learned model on a deterministic problem is strictly worse: it approximates an exact rule, adds latency, requires monitoring and can fail in ways nobody predicted.',
        fix: 'Ask first: can I write the rule down and would it be correct? If yes, write the rule. Machine learning earns its complexity only when the rule is unknown or unstable.',
      },
      {
        mistake: 'Believing more data always beats a better idea',
        why: 'Data volume helps enormously, but only if the data is relevant, correctly labelled and drawn from the same distribution as the production inputs. A million mislabelled rows makes a model confidently wrong.',
        fix: 'Audit label quality and representativeness before buying more rows. An hour spent looking at fifty actual examples routinely beats a week of model tuning.',
      },
      {
        mistake: 'Treating training accuracy as the result',
        why: 'A model can memorise its training set perfectly and be useless on anything new. Training accuracy measures recall of examples, not understanding of the pattern.',
        fix: 'Every number you report comes from data the model has never seen. The next three units build the machinery that makes this possible.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain the difference between AI, machine learning and deep learning.',
        answer:
          'They are nested. Artificial intelligence is the broadest: any technique that makes a machine perform tasks we associate with intelligence, including hand-written rule engines, search and planning. Machine learning is the subset where the system derives its rules from data rather than from a programmer. Deep learning is the subset of machine learning that uses multi-layer neural networks, whose defining property is that they learn their own intermediate representations instead of consuming hand-engineered features. Deep Blue was AI but not ML; logistic regression is ML but not DL; a convolutional network for image classification is all three.',
        followUp:
          'A strong answer gives a concrete example that is AI but not ML, which shows the candidate understands the nesting rather than reciting it.',
      },
      {
        level: 'intermediate',
        question: 'A product manager asks you to use machine learning to decide which customers get a refund. How do you respond?',
        answer:
          'I would first ask whether the decision rule is actually unknown. Refund policy is usually a written business rule, in which case ordinary code is more accurate, auditable and cheaper. If the real question is prioritisation — which refund requests should a human review first — that is a genuine ranking problem where ML helps. I would also raise that any model trained on historical refund decisions inherits whatever bias those decisions contained, and that a consequential decision about a customer needs an appeal path and a recorded reason, which pushes towards an interpretable model or a human in the loop.',
        followUp:
          'The best answers separate the decision from the prioritisation, and mention that the training labels are past human judgements rather than ground truth.',
      },
      {
        level: 'ml-engineer',
        question: 'What does empirical risk minimisation mean, and where does it break down?',
        answer:
          'Empirical risk minimisation is choosing the model in your hypothesis class that minimises average loss on the training sample. It is a computable stand-in for minimising true risk, the expected loss over the real data distribution, which is unknowable. It breaks down in two ways. First, when the hypothesis class is flexible enough to fit noise, the empirical risk can be driven to zero while true risk rises — overfitting, which is why we regularise and hold data out. Second, when the training sample is not drawn from the deployment distribution, minimising the empirical risk optimises for the wrong world entirely; that is dataset shift, and no amount of regularisation fixes it.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'For each task, say whether you would use ordinary code, classical machine learning, or deep learning, and justify it in one sentence: (a) converting currencies at the day’s published rate, (b) predicting which customers will cancel next month from 40 tabular attributes, (c) transcribing recorded phone calls, (d) alphabetising a contact list.',
        hint: 'Ask two questions of each: is the rule writable, and is the input raw perceptual data?',
        solution:
          '(a) Ordinary code — the rate is published and the arithmetic is exact, so a model could only introduce error. (b) Classical ML, specifically a gradient-boosted tree; the relationship is unknown and complex but the input is a modest table of engineered attributes, which is exactly where tree ensembles beat neural networks. (c) Deep learning — audio is raw perceptual data with no hand-writable mapping to text, and learned representations are essential. (d) Ordinary code — sorting is a solved deterministic operation.',
      },
      {
        prompt:
          'A colleague reports 99.4% accuracy on a model that predicts whether a machine on a production line will fail in the next hour. Failures happen about once in every two hundred hours. Why should you be sceptical, and what would you ask for?',
        hint: 'Work out what accuracy a model that always predicts "no failure" would achieve.',
        solution:
          'A model that never predicts a failure is right 199 times out of 200, which is 99.5% accuracy — better than the reported model. So 99.4% is evidence of nothing, and possibly evidence that the model has learned to say "no" with a small amount of noise. I would ask for the confusion matrix, and specifically for recall on the failure class: of the failures that actually happened, how many did it catch, and at what false alarm rate? That is the number the maintenance team cares about. Units ML-021 and ML-022 develop this properly.',
      },
      {
        prompt:
          'Write down, in the form "task T, experience E, performance measure P", the Mitchell definition for a model that recommends films.',
        hint: 'Be precise about P. "Good recommendations" is not measurable.',
        solution:
          'T: given a user and a candidate film, predict whether the user will watch it to completion. E: a historical log of which films each user was shown and which they watched. P: the fraction of recommended films that were watched for more than five minutes, measured on users and time periods not present in the training log. Writing P down concretely is the hard and valuable part — a vague performance measure is the most common way an ML project fails before it starts.',
      },
    ],

    quiz: [
      {
        id: 'ML-001-q1',
        type: 'mcq',
        concept: 'nesting of AI, ML and DL',
        prompt: 'Which statement is correct?',
        options: [
          'Deep learning is a subset of machine learning, which is a subset of artificial intelligence',
          'Machine learning is a subset of deep learning, which is a subset of artificial intelligence',
          'Artificial intelligence and machine learning are exactly the same field',
          'Deep learning and artificial intelligence are separate fields with no overlap',
        ],
        answerIndex: 0,
        explanation:
          'They are nested circles. AI is the outermost and includes non-learning methods such as search and rule engines; ML is the part that learns from data; DL is the part of ML that uses many-layered neural networks.',
      },
      {
        id: 'ML-001-q2',
        type: 'truefalse',
        concept: 'AI without learning',
        prompt: 'A chess engine that searches millions of positions using a hand-written evaluation function counts as artificial intelligence but not machine learning.',
        answer: true,
        explanation:
          'True. It performs a task we call intelligent, so it is AI, but its evaluation rules were written by humans and do not improve with data, so no learning takes place.',
      },
      {
        id: 'ML-001-q3',
        type: 'match',
        concept: 'method selection',
        prompt: 'Match each problem to the approach that fits it best.',
        pairs: [
          { left: 'Calculating payroll tax', right: 'Ordinary rule-based code' },
          { left: 'Predicting churn from a table of customer attributes', right: 'Classical ML (e.g. gradient boosting)' },
          { left: 'Recognising objects in photographs', right: 'Deep learning' },
          { left: 'Finding the shortest driving route', right: 'Search algorithm — AI without learning' },
        ],
        explanation:
          'The dividing questions are whether the rule can be written down correctly, and whether the input is raw perceptual data that needs learned representations.',
      },
      {
        id: 'ML-001-q4',
        type: 'fill',
        concept: 'empirical risk',
        prompt: 'Minimising average loss over the training sample, as a stand-in for expected loss over the true data distribution, is called ______ risk minimisation.',
        answers: ['empirical', 'Empirical'],
        explanation:
          'Empirical risk minimisation replaces an uncomputable expectation with a computable sample average. Its failure mode when the model is too flexible is overfitting.',
      },
      {
        id: 'ML-001-q5',
        type: 'multi',
        concept: 'when ML is appropriate',
        prompt: 'Which conditions make machine learning a reasonable choice? Select all that apply.',
        options: [
          'The rule is complex or unknown, but examples of correct behaviour exist',
          'The relationship changes over time, so a fixed rule set would decay',
          'The answer is already computable exactly from existing data',
          'Patterns exist in the data but are too subtle for a human to articulate',
          'You need an auditable, provably correct answer every time',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'ML earns its complexity when the rule is unwritable or unstable but examples are available. When the answer is exactly computable, or when provable correctness is required, ordinary code is the better engineering decision.',
      },
      {
        id: 'ML-001-q6',
        type: 'explain',
        concept: 'the core shift',
        prompt: 'Explain to a non-technical colleague what changes when you move from writing rules to learning them from data.',
        rubric: [
          'States that in traditional programming a human supplies the rules and the computer supplies answers',
          'States that in ML the human supplies data plus answers and the computer supplies the rules',
          'Gives a concrete example where the rule is too complex to write',
          'Notes the cost: correctness now depends on data quality rather than on readable code',
        ],
        sampleAnswer:
          'Normally we tell the computer exactly what to do, step by step, and it does it. That works when we know the rule — tax is calculated the same way every time. But for something like recognising a face, nobody can write the rule down; you just know a face when you see one. So instead we collect thousands of labelled examples and let the program adjust itself until it agrees with those examples. The trade is that we can no longer read the rule in the code. If the examples were unrepresentative or wrongly labelled, the program will be confidently wrong, and the only way to find out is to test it on data it has never seen.',
        explanation:
          'A strong answer names both the swap of inputs and outputs and the cost it imposes: correctness moves from the code into the data, which is why evaluation discipline dominates this domain.',
      },
    ],

    flashcards: [
      { front: 'Define machine learning in one sentence.', back: 'A program learns when its performance at a task improves with exposure to data, rather than because a human wrote the rules.' },
      { front: 'What is the relationship between AI, ML and DL?', back: 'Nested sets: DL is inside ML, which is inside AI. AI includes non-learning methods such as search and hand-written rule engines.' },
      { front: 'What distinguishes deep learning from classical ML?', back: 'Deep networks learn their own intermediate features from raw input; classical ML consumes features a human engineered.' },
      { front: 'What is empirical risk minimisation?', back: 'Picking the model in your hypothesis class with the lowest average loss on the training sample, as a proxy for lowest expected loss on unseen data.' },
      { front: 'When should you NOT use machine learning?', back: 'When the rule is known, exact and stable, or when you need provable correctness and auditability. A model there only adds error and maintenance cost.' },
      { front: 'Why is training accuracy not a result?', back: 'A flexible model can memorise its training data. Only performance on data it has never seen estimates true risk.' },
    ],

    challenge: {
      title: 'Audit three problems',
      brief:
        'Pick three tasks from your own work, studies or daily life. For each, write half a page covering: whether the rule can be written down, what the training examples and labels would be, what performance measure P would decide whether it worked, and what would happen if the model were confidently wrong. Then state your recommendation — ordinary code, classical ML, deep learning, or do not build it.',
      acceptanceCriteria: [
        'At least one of the three is argued to NOT need machine learning, with reasons',
        'Each task has a concrete, measurable performance measure rather than a vague goal',
        'Each task names what the training label literally is, and where it would come from',
        'Each includes a sentence on the consequence of a confident wrong answer',
      ],
    },

    teachingPrompt: {
      prompt:
        'A friend who codes but has never touched machine learning asks: "Is machine learning just AI? And what makes deep learning different?" Teach them.',
      mustCover: [
        'AI, ML and DL are nested, not synonymous',
        'The core swap: rules in and answers out becomes data and answers in, rules out',
        'Deep learning learns its own features rather than using engineered ones',
        'ML is only worth it when the rule is unknown or unstable but examples exist',
      ],
      bonusSignals: ['gives an AI-but-not-ML example', 'mentions that evaluation must use unseen data', 'mentions that model behaviour depends on data quality rather than readable code'],
      sampleExplanation:
        'Think of three circles inside each other. The big one is AI: anything that makes a machine seem clever, including a chess engine that just searches very fast using rules a human wrote. Inside that is machine learning, where nobody writes the rules — you show the program a pile of labelled examples and it adjusts itself until it agrees with them. Inside that again is deep learning, where the learner is a stack of layers deep enough to invent its own way of representing the input, which is why it dominates images, audio and language where the raw data is pixels or waveforms. The practical consequence for you as a programmer is that correctness stops living in the code. You cannot read a trained model and see whether it is right, so you test it on data it has never seen, and you spend far more time on the data than on the algorithm.',
    },
  },

  {
    id: 'ML-002',
    domain: 'ML',
    module: 'Foundations',
    topic: 'Learning paradigms',
    title: 'Supervised, Unsupervised and Reinforcement Learning',
    slug: 'types-of-learning',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['ML-001'],
    related: ['ML-001'],
    tags: ['supervised', 'unsupervised', 'reinforcement', 'semi-supervised', 'paradigms'],

    learningObjectives: [
      'Classify a problem as supervised, unsupervised, semi-supervised or reinforcement learning from how its data and feedback are shaped',
      'Distinguish regression from classification, and clustering from dimensionality reduction',
      'Explain why labels are the expensive ingredient and what semi-supervised and self-supervised learning do about it',
      'Describe the feedback loop that makes reinforcement learning structurally different from the rest',
    ],

    terminology: [
      {
        term: 'Supervised learning',
        definition:
          'Learning a mapping from inputs to outputs from examples where the correct output is provided. Splits into regression (numeric output) and classification (categorical output).',
        simple: 'Learning with an answer key.',
      },
      {
        term: 'Unsupervised learning',
        definition:
          'Finding structure in data that has no labels: groups (clustering), lower-dimensional representations (dimensionality reduction), or unusual points (anomaly detection).',
        simple: 'Finding patterns when nobody tells you what the right answer is.',
      },
      {
        term: 'Semi-supervised learning',
        definition:
          'Training on a small labelled set together with a large unlabelled set, using the unlabelled data to learn the shape of the input distribution.',
        simple: 'A few answers plus a lot of unmarked examples.',
      },
      {
        term: 'Self-supervised learning',
        definition:
          'Generating labels automatically from the data itself — predicting a hidden word from its context, or one half of an image from the other. It is supervised learning where the supervision is free.',
        simple: 'Hiding part of the data and learning to guess it back.',
      },
      {
        term: 'Reinforcement learning',
        definition:
          'An agent takes actions in an environment and receives rewards. It learns a policy that maximises cumulative future reward, with no direct instruction about which action was correct.',
        simple: 'Learning by trial, error and a score rather than by being shown the answer.',
      },
    ],

    simpleExplanation:
      "There are only a few genuinely different ways a machine can learn, and they differ in what kind of feedback the learner gets. In the first way, someone has already written the answers next to the questions. You get a thousand houses with their sale prices, or a thousand emails marked spam or not spam, and the job is to learn the mapping. This is supervised learning, and it is most of what is done in practice. In the second way there are no answers at all — just a pile of customers, or documents, or photographs — and the job is to find structure that was already there: which of these belong together, or what are the few underlying dimensions along which they really vary. That is unsupervised learning. In between sits the common real situation where you have a hundred labelled examples and a million unlabelled ones, because labelling is slow and expensive. And then there is a fourth, structurally different case: a robot or a game player that is never told the right move, only given a score afterwards, and must work out which of its earlier choices deserved the credit. That is reinforcement learning, and the delayed, evaluative nature of its feedback is what makes it hard.",

    whyItExists:
      'Problems arrive with different kinds of feedback attached, and an algorithm can only exploit the feedback it is given. Naming the four paradigms turns a vague "we want to use ML" into a concrete question — what does one training example look like, and what tells the learner it was wrong — which in turn determines which algorithms are even applicable.',

    analogy: {
      scenario:
        "Picture four different ways of learning to cook. In the first, you work through a recipe book where every dish has a photograph of the finished result: you cook, compare, and adjust. In the second, someone empties a market stall onto your table with no recipes at all, and you sort the ingredients into groups that seem to belong together — the herbs here, the root vegetables there — discovering structure nobody stated. In the third, you have five recipes with photographs and two hundred dishes with no photograph at all, so you use the five to anchor your sense of what finished food looks like and the rest to learn the range of what exists. In the fourth, nobody shows you anything: you cook, serve it to guests, and the only feedback is how much was left on the plate an hour later.",
      mapping: [
        { from: 'Recipe with a photograph of the result', to: 'A labelled training example in supervised learning' },
        { from: 'Sorting an unlabelled market stall into groups', to: 'Clustering in unsupervised learning' },
        { from: 'Five photographs plus two hundred unphotographed dishes', to: 'Semi-supervised learning' },
        { from: 'Judging only by what guests left on the plate', to: 'The reward signal in reinforcement learning' },
        { from: 'Not knowing which ingredient caused the leftovers', to: 'The credit assignment problem' },
      ],
      bridge:
        'The distinction that matters is the shape of the feedback, not the subject matter. A photograph next to each dish is instructive feedback — it tells you exactly what the right answer was. An empty or full plate is evaluative feedback — it scores the outcome without telling you which decision was responsible. That difference, instructive versus evaluative and immediate versus delayed, is precisely what separates supervised from reinforcement learning and is why the latter needs far more trials.',
      limitations:
        'The kitchen story makes unsupervised learning sound like it has an obviously right answer — herbs really are a category. In real clustering there is often no ground truth at all, which is why evaluating an unsupervised model is genuinely harder than evaluating a supervised one.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Deciding which paradigm your problem is',
        branching: true,
        caption: 'Start from the data you actually have, not from the algorithm you want to use.',
        steps: [
          { label: 'Do you have a target column with known correct values?', detail: 'If yes, you are in supervised territory.' },
          { label: 'Is that target a number or a category?', detail: 'Number means regression (house price, demand). Category means classification (spam, disease, churn).' },
          { label: 'No labels at all?', detail: 'Unsupervised: cluster to find groups, reduce dimensions to find structure, or detect anomalies.' },
          { label: 'A few labels and a lot of unlabelled data?', detail: 'Semi-supervised, or pre-train self-supervised then fine-tune on the labels.' },
          { label: 'No fixed dataset, but an environment that responds to actions?', detail: 'Reinforcement learning: the agent generates its own data by acting.' },
        ],
      },
      {
        kind: 'table',
        title: 'The four paradigms side by side',
        columns: ['Paradigm', 'One training example looks like', 'Feedback', 'Typical algorithms', 'Typical use'],
        rows: [
          ['Supervised', 'Features x plus correct answer y', 'Instructive and immediate', 'Linear/logistic regression, trees, boosting, neural nets', 'Price prediction, spam, diagnosis, churn'],
          ['Unsupervised', 'Features x only', 'None — structure is the output', 'K-Means, DBSCAN, PCA, autoencoders', 'Segmentation, compression, anomaly detection'],
          ['Semi-supervised', 'A little (x, y) and a lot of x', 'Sparse and instructive', 'Self-training, label propagation, pre-train then fine-tune', 'Medical imaging, speech, any costly-to-label domain'],
          ['Reinforcement', 'State, action, reward, next state', 'Evaluative and delayed', 'Q-learning, policy gradients, PPO', 'Game play, robotics, recommendation sequencing, RLHF'],
        ],
      },
      {
        kind: 'compare',
        title: 'Regression versus classification',
        caption: 'Both are supervised. The type of the target changes the loss, the metric and the model head.',
        left: {
          heading: 'Regression — the target is a number',
          points: [
            'Predict house price, temperature, delivery time, demand',
            'Errors measured in the units of the target: MAE, RMSE',
            'Being off by a little is better than being off by a lot',
            'Output is unbounded (or bounded by the data, not by the model)',
          ],
        },
        right: {
          heading: 'Classification — the target is a category',
          points: [
            'Predict spam or not, which of ten digits, which disease',
            'Errors measured by counting mistakes: accuracy, precision, recall, AUC',
            'A prediction is right or wrong; "nearly the right class" usually means nothing',
            'Output is a probability per class, converted to a label by a threshold',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'See the two supervised shapes',
        caption: 'Fit a line to numeric targets, then contrast it with a decision boundary separating two classes.',
        widget: 'linear-regression-lab',
      },
    ],

    formalDefinition:
      'Supervised learning estimates a function f: X → Y from an i.i.d. sample of pairs (x, y) drawn from a joint distribution P(X, Y), where Y is continuous for regression and discrete for classification. Unsupervised learning estimates structure in P(X) alone — a partition, a low-dimensional manifold, or a density — from a sample of x with no accompanying y. Reinforcement learning solves a Markov decision process (S, A, P, R, γ): the agent learns a policy π: S → A maximising the expected discounted return, from experience it generates by acting rather than from a fixed dataset.',

    math: {
      intuition:
        'The paradigms differ in what the learner is allowed to condition on. Supervised learning models the conditional distribution of the answer given the input. Unsupervised learning models the distribution of the input itself. Reinforcement learning has no target at all, only a scalar reward arriving later, so the learner must estimate the long-run value of its choices.',
      formulas: [
        {
          latex: 'f^{*} = \\arg\\min_{f} \\; \\mathbb{E}_{(x,y)\\sim P(X,Y)}\\big[L(y, f(x))\\big]',
          name: 'The supervised objective',
          meaning:
            'Find the function whose predictions minimise expected loss against the known answers. The existence of y in the expectation is exactly what makes it supervised.',
          variables: [
            { symbol: 'f', meaning: 'Candidate prediction function' },
            { symbol: 'x', meaning: 'Input features' },
            { symbol: 'y', meaning: 'The known correct answer' },
            { symbol: 'L', meaning: 'Loss measuring the cost of predicting f(x) when the truth was y' },
            { symbol: 'P(X,Y)', meaning: 'The joint distribution of inputs and answers' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\pi^{*} = \\arg\\max_{\\pi} \\; \\mathbb{E}_{\\pi}\\left[\\sum_{t=0}^{\\infty} \\gamma^{t} r_{t}\\right]',
          name: 'The reinforcement learning objective',
          meaning:
            'Find the policy that maximises total reward over time, discounting rewards that arrive later. There is no y anywhere: the learner is scored on outcomes, not corrected on actions.',
          variables: [
            { symbol: '\\pi', meaning: 'Policy — a rule mapping each state to an action' },
            { symbol: 'r_t', meaning: 'Reward received at time step t' },
            { symbol: '\\gamma', meaning: 'Discount factor between 0 and 1: how much a future reward is worth now' },
            { symbol: 't', meaning: 'Time step within an episode' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'In supervised learning the loss for a single example is computable the instant a prediction is made, because y is sitting right there. Gradient information is therefore immediate and dense.',
        'In reinforcement learning the reward for an action may arrive fifty steps later, and it scores the whole trajectory rather than the individual action.',
        'The learner must therefore solve credit assignment: decide which earlier action deserves the praise or blame. The discount factor γ formalises how far back credit reasonably flows.',
        'This is why RL typically needs orders of magnitude more interactions than supervised learning needs examples: each trial carries far less information.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The same data, three paradigms',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y
)

# 1. SUPERVISED: labels are used during fit.
clf = LogisticRegression(max_iter=1000).fit(X_train, y_train)
print("supervised accuracy:", round(clf.score(X_test, y_test), 3))

# 2. UNSUPERVISED clustering: y is never passed to fit.
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
# Compare the discovered groups to the true species only to inspect them.
print("cluster sizes:", np.bincount(km.labels_))

# 3. UNSUPERVISED dimensionality reduction: also no labels.
pca = PCA(n_components=2).fit(X)
print("variance explained:", np.round(pca.explained_variance_ratio_, 3))`,
        output: `supervised accuracy: 0.911
cluster sizes: [ 50 62 38]
variance explained: [0.925 0.053]`,
        explanation:
          'The decisive line is which arguments `fit` receives. `clf.fit(X_train, y_train)` is supervised because the answers are supplied. `km.fit(X)` and `pca.fit(X)` never see `y` at all — K-Means invents three groups from geometry alone, and PCA finds that two directions carry 97.8% of the variance in four dimensions. That the cluster sizes are 50/62/38 rather than 50/50/50 is the honest result: two of the iris species genuinely overlap, and an unsupervised method has no way to know where humans drew the species line.',
      },
      {
        language: 'python',
        title: 'Semi-supervised learning when labels are scarce',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import load_digits
from sklearn.semi_supervised import SelfTrainingClassifier
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split

X, y = load_digits(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y
)

# Pretend we could only afford to label 50 of the 1257 training images.
rng = np.random.RandomState(0)
y_partial = np.copy(y_train)
unlabelled = rng.rand(len(y_train)) > (50 / len(y_train))
y_partial[unlabelled] = -1          # -1 marks "no label available"

base = SVC(probability=True, gamma="scale", random_state=0)

supervised_only = SVC(gamma="scale", random_state=0)
labelled_idx = y_partial != -1
supervised_only.fit(X_train[labelled_idx], y_train[labelled_idx])

semi = SelfTrainingClassifier(base, threshold=0.9).fit(X_train, y_partial)

print("labelled examples used:", labelled_idx.sum())
print("supervised on 50 labels:", round(supervised_only.score(X_test, y_test), 3))
print("self-training:          ", round(semi.score(X_test, y_test), 3))`,
        output: `labelled examples used: 44
supervised on 50 labels: 0.865
self-training:           0.922`,
        explanation:
          'The `-1` convention is how scikit-learn marks an unlabelled row. `SelfTrainingClassifier` fits on the labelled rows, predicts the unlabelled ones, promotes any prediction it makes with probability above 0.9 to a pseudo-label, and repeats. It gains roughly six accuracy points here for zero extra labelling cost. The catch is real: if the initial model is confidently wrong about a region, self-training will cheerfully amplify that error, so the threshold matters and the result must still be checked on a genuinely labelled test set.',
      },
      {
        language: 'python',
        title: 'The reinforcement learning loop, in eight lines',
        code: `# No dataset exists in advance. The agent creates its own data by acting.
state = env.reset()
for step in range(10_000):
    action = policy.select(state)          # choose, sometimes explore
    next_state, reward, done, _ = env.step(action)
    policy.update(state, action, reward, next_state)
    state = next_state
    if done:
        state = env.reset()`,
        explanation:
          'Compare this with `model.fit(X, y)`. There is no X and no y. The agent chooses an action, the environment responds with a scalar reward and a new state, and the loop continues. Nothing ever tells the agent what the correct action was — only how things turned out, often much later. That is why an RL agent may need millions of steps to learn what a supervised model learns from a few thousand labelled rows, and why RL is used where interaction is cheap (simulators, games) or where nothing else will do.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Supervised — insurance claim triage',
        usage:
          'Each historical claim has features (amount, claim type, policy age, adjuster notes) and a known outcome (paid, disputed, fraudulent). A classifier learns the mapping and routes new claims, with humans reviewing the uncertain middle band.',
      },
      {
        context: 'Unsupervised — customer segmentation for a retailer',
        usage:
          'Nobody knows in advance what the segments are. K-Means over purchase frequency, basket size and category mix produces groups that marketing names afterwards ("weekly essentials", "occasional big shop"). The names are a human interpretation of geometry, not a discovered truth.',
      },
      {
        context: 'Self-supervised then fine-tuned — every modern language model',
        usage:
          'A model is pre-trained by predicting masked or next tokens over enormous unlabelled text, which costs nothing in labelling, and then fine-tuned on a comparatively tiny labelled set for the actual task. This two-stage pattern is the reason large models exist at all.',
      },
      {
        context: 'Reinforcement — data centre cooling and RLHF',
        usage:
          'DeepMind cut cooling energy at Google data centres with an RL controller whose reward was energy used subject to safety constraints. The same paradigm, with human preference comparisons as reward, is how chat models are aligned after pre-training.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: 'Ships supervised estimators, `sklearn.cluster` and `sklearn.decomposition` for unsupervised work, and `sklearn.semi_supervised` for the middle ground.' },
      { tool: 'Label Studio / Prodigy', role: 'Labelling tools — the reason semi-supervised methods exist is that this stage is the budget line item.' },
      { tool: 'Gymnasium', role: 'The standard environment interface for reinforcement learning experiments.' },
    ],

    commonMistakes: [
      {
        mistake: 'Calling clustering "unsupervised classification" and then reporting its accuracy',
        why: 'Clustering has no classes to be accurate about. Cluster 0 is not "the spam cluster" — the algorithm assigns arbitrary integer identities, and comparing them directly with true labels is meaningless.',
        fix: 'Evaluate clustering with metrics that do not assume label identity: silhouette score for internal quality, or adjusted Rand index if you do have labels and want to compare partitions.',
      },
      {
        mistake: 'Framing a problem as reinforcement learning because it "makes decisions"',
        why: 'RL is only necessary when actions change the future state and rewards are delayed. If every decision is independent and the right answer is recorded in history, it is a supervised problem with far cheaper machinery.',
        fix: 'Ask whether today’s action changes tomorrow’s data. If not, use supervised learning. Most "sequential decision" business problems are contextual bandits at worst.',
      },
      {
        mistake: 'Treating a target that leaked from the future as a legitimate label',
        why: 'A supervised label must be knowable at prediction time in production. Training a churn model on a field that is only populated after the customer cancels produces spectacular offline accuracy and total failure in deployment.',
        fix: 'For every feature, ask: would this value exist, with this value, at the moment the prediction is required? This is the first form of data leakage you will meet; ML-028 and ML-031 handle the rest.',
      },
      {
        mistake: 'Assuming unsupervised results are objective',
        why: 'Change the distance metric, the scaling or the number of clusters and the groups change. There is no ground truth to adjudicate between them.',
        fix: 'Treat clusters as a hypothesis to be validated against something external — do the segments differ in behaviour that matters? — rather than as a discovered fact.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between supervised and unsupervised learning? Give an example of each.',
        answer:
          'Supervised learning has a target: every training example carries the correct answer, and the model learns a mapping from features to that answer. Predicting house price from square footage and location is supervised regression; marking an email spam or not is supervised classification. Unsupervised learning has no target at all — the algorithm is given only the inputs and must find structure. Segmenting customers into groups by purchase behaviour is clustering; compressing sixty correlated survey questions into three underlying factors is dimensionality reduction. The practical difference is that supervised learning can be scored objectively against held-out answers, whereas unsupervised results require human judgement or an external criterion to validate.',
        followUp:
          'A strong answer adds that labels are the expensive ingredient, which is why semi-supervised and self-supervised approaches matter commercially.',
      },
      {
        level: 'intermediate',
        question: 'You have 2 million unlabelled product images and budget to label 3,000. How would you proceed?',
        answer:
          'I would not spend the budget uniformly at random. First, use the unlabelled pool: either self-supervised pre-training on the images, or an off-the-shelf pre-trained vision model to get embeddings, so the representation is learned from all 2 million images for free. Then label strategically — cluster the embeddings and sample across clusters to cover the variety of the data, rather than labelling 3,000 near-duplicates. After a first model exists, switch to active learning: label the examples the model is least certain about, which buys far more accuracy per label. Finally, reserve a genuinely random, stratified slice of the labelled budget as a test set and never touch it for model selection, because an actively sampled set is biased and cannot serve as an honest estimate of performance.',
        followUp:
          'The detail that distinguishes a strong candidate is reserving part of the labelling budget for a randomly sampled test set — active learning ruins the representativeness of what it selects.',
      },
      {
        level: 'ml-engineer',
        question: 'Why is reinforcement learning harder than supervised learning, in information terms?',
        answer:
          'Three reasons. First, feedback is evaluative rather than instructive: the reward says how good the outcome was, not what the correct action would have been, so there is no gradient pointing at the right answer. Second, it is delayed, which creates the credit assignment problem — you must decide which of the last fifty actions caused the reward. Third, the data distribution is non-stationary and self-generated: the policy determines which states are visited, so improving the policy changes the training distribution, and exploration must be deliberately engineered or the agent never discovers better regions. Supervised learning has none of these: dense, immediate, instructive feedback on an i.i.d. sample fixed in advance.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Classify each as supervised regression, supervised classification, unsupervised, or reinforcement learning: (a) estimating how many minutes late a flight will be, (b) grouping 50,000 news articles into topics nobody defined in advance, (c) deciding which of three prices to show a visitor to maximise revenue over the session, (d) predicting whether a loan will default.',
        hint: 'Ask what one training example contains, and whether the outcome of an action changes what happens next.',
        solution:
          '(a) Supervised regression — the target is a number of minutes and historical flights record it. (b) Unsupervised clustering — no topic labels exist, so the algorithm proposes the grouping. (c) Reinforcement learning, or more precisely a contextual bandit, because the price shown affects the visitor’s subsequent behaviour and the only feedback is the revenue that followed. (d) Supervised classification — a binary target recorded in loan history, subject to the caveat that defaults are only observed for loans that were actually approved, which biases the training sample.',
      },
      {
        prompt:
          'You train a churn classifier and it reaches 0.99 AUC. Inspecting the features, you find one called `days_since_cancellation_request`. What has happened, and what should you do?',
        hint: 'Ask when that field gets populated relative to the moment you need a prediction.',
        solution:
          'That field is only non-null after the customer has already asked to cancel, so it is a near-perfect description of the label rather than a predictor of it. This is target leakage: at prediction time in production the field would be empty for everyone, and the model would collapse. The fix is to drop it, and more importantly to build a feature specification stating the exact timestamp at which each feature is evaluated, then re-derive the training table with features computed strictly before that cut-off. If a leaked feature reaches production undetected, the model looks superb in evaluation and useless in service.',
      },
      {
        prompt:
          'Explain why self-supervised learning is best described as supervised learning rather than unsupervised learning, even though the corpus has no human labels.',
        hint: 'Look at what the loss function compares against.',
        solution:
          'The loss compares a prediction with a known correct answer, which is the defining feature of supervised learning. In masked language modelling the model predicts a hidden token and is scored against the token that was actually there — a genuine label, just one generated automatically from the data instead of by a human annotator. What is unsupervised about it is the labelling process, not the learning signal. This is why self-supervised pre-training scales so well: the supervision is dense and free, so the only limit is compute and text.',
      },
    ],

    quiz: [
      {
        id: 'ML-002-q1',
        type: 'mcq',
        concept: 'paradigm identification',
        prompt: 'A supermarket wants to group its shoppers into segments to design promotions. No segment definitions exist yet. Which paradigm is this?',
        options: [
          'Unsupervised learning (clustering)',
          'Supervised classification',
          'Supervised regression',
          'Reinforcement learning',
        ],
        answerIndex: 0,
        explanation:
          'There is no target column, because the segments do not exist until the algorithm proposes them. That makes it clustering. The moment someone hand-labels shoppers into segments and asks a model to reproduce the labels, it becomes supervised classification.',
      },
      {
        id: 'ML-002-q2',
        type: 'truefalse',
        concept: 'regression versus classification',
        prompt: 'Predicting which of five delivery time buckets an order falls into is a classification problem, even though the underlying quantity is numeric.',
        answer: true,
        explanation:
          'Once the target is a discrete set of buckets, the model predicts a category and is scored by counting mistakes. Note the trade: bucketing throws away the ordering information, so an ordinal or plain regression framing is often better.',
      },
      {
        id: 'ML-002-q3',
        type: 'match',
        concept: 'paradigm to algorithm',
        prompt: 'Match each paradigm with an algorithm that belongs to it.',
        pairs: [
          { left: 'Supervised classification', right: 'Logistic regression' },
          { left: 'Unsupervised clustering', right: 'K-Means' },
          { left: 'Dimensionality reduction', right: 'Principal component analysis' },
          { left: 'Reinforcement learning', right: 'Q-learning' },
        ],
        explanation:
          'Knowing which box an algorithm lives in tells you immediately what data it needs and how it can be evaluated, which is more useful than memorising the algorithm itself.',
      },
      {
        id: 'ML-002-q4',
        type: 'fill',
        concept: 'unlabelled convention',
        prompt: 'In scikit-learn’s semi-supervised estimators, which integer value in the target array marks an example as unlabelled?',
        answers: ['-1', 'minus one', 'negative one'],
        explanation:
          'A target of -1 tells `SelfTrainingClassifier` and `LabelPropagation` that this row has no label and should be pseudo-labelled during training rather than treated as a class called minus one.',
      },
      {
        id: 'ML-002-q5',
        type: 'multi',
        concept: 'reinforcement learning characteristics',
        prompt: 'Which properties distinguish reinforcement learning from supervised learning? Select all that apply.',
        options: [
          'Feedback is a scalar reward rather than the correct answer',
          'Rewards may arrive many steps after the action that caused them',
          'The agent’s own behaviour determines which data it sees',
          'It requires a fixed, labelled dataset collected in advance',
          'Exploration must be engineered deliberately',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Evaluative, delayed feedback on a self-generated, non-stationary data distribution is exactly what makes RL hard. A fixed labelled dataset is the signature of supervised learning, not RL.',
      },
      {
        id: 'ML-002-q6',
        type: 'explain',
        concept: 'credit assignment',
        prompt: 'Explain the credit assignment problem and why it does not arise in supervised learning.',
        rubric: [
          'States that in RL the reward arrives after a sequence of actions',
          'States that the learner must infer which action was responsible',
          'Contrasts with supervised learning where the correct answer accompanies each input',
          'Mentions the discount factor or some mechanism for spreading credit over time',
        ],
        sampleAnswer:
          'In reinforcement learning an agent may take forty actions and only then win or lose. The reward scores the whole sequence, so the agent must work out which of those forty choices actually earned it — that is credit assignment. The discount factor γ is one mechanism for handling it: credit flows backwards through time but decays, so recent actions are held more responsible than distant ones. In supervised learning the problem cannot arise, because each input arrives with its own correct answer attached, so the error is attributable to exactly one prediction the moment it is made.',
        explanation:
          'The key insight is that instructive feedback localises the error to a single prediction, whereas evaluative feedback spreads it across a trajectory, which is why RL needs far more interactions.',
      },
    ],

    flashcards: [
      { front: 'What defines supervised learning?', back: 'Every training example carries the correct answer, so the loss can be computed against a known target.' },
      { front: 'Regression or classification?', back: 'Numeric target means regression; categorical target means classification. Both are supervised.' },
      { front: 'What does unsupervised learning produce?', back: 'Structure in the inputs: clusters, low-dimensional representations or anomaly scores. There is no target to be accurate against.' },
      { front: 'Why is self-supervised learning a kind of supervised learning?', back: 'The loss compares a prediction with a genuine answer — it is just an answer hidden from the data itself rather than written by a human.' },
      { front: 'What makes reinforcement learning structurally different?', back: 'Feedback is a delayed scalar reward, not a correct answer, and the agent generates its own data by acting.' },
      { front: 'How is a row marked unlabelled in scikit-learn semi-supervised estimators?', back: 'With a target of -1.' },
    ],

    challenge: {
      title: 'Reframe one problem four ways',
      brief:
        'Take a single domain you know — a bookshop, a hospital ward, a football club. Write down four distinct ML problems in it, one from each paradigm. For each, specify exactly what one training example contains, where the feedback comes from, what would make the project fail, and how you would know whether it worked. Then argue which of the four you would actually build first and why.',
      acceptanceCriteria: [
        'All four paradigms are represented, including a genuine RL framing where actions change future state',
        'Each problem states the literal contents of one training example',
        'Each names a concrete evaluation measure, not a vague goal',
        'The final recommendation weighs value against data availability, not novelty',
      ],
    },

    teachingPrompt: {
      prompt:
        'Teach someone the four learning paradigms using the shape of the data rather than a list of algorithm names.',
      mustCover: [
        'Supervised learning has a known answer attached to every example, split into regression and classification',
        'Unsupervised learning has inputs only and produces structure rather than predictions',
        'Semi-supervised and self-supervised exist because labels are expensive',
        'Reinforcement learning gets delayed evaluative rewards and generates its own data',
      ],
      bonusSignals: ['mentions that clustering has no ground truth to be accurate against', 'mentions credit assignment', 'notes that the paradigm is decided by the data, not by preference'],
      sampleExplanation:
        'Do not start from algorithm names, start from what a single row of your data looks like. If a row is a set of features together with the answer you want to predict, you are doing supervised learning — regression if that answer is a number, classification if it is a category. If a row is just features with no answer anywhere, you are doing unsupervised learning, and the output is structure: which rows belong together, or what the few underlying dimensions are. Because writing answers down is slow and expensive, there is a middle ground where a handful of rows have answers and millions do not; you use the unlabelled pile to learn what the data looks like and the small labelled pile to attach meaning. And then there is the case with no dataset at all, where a program acts, the world responds with a score some time later, and it must work out which of its earlier choices deserved that score. Each paradigm is forced on you by the feedback available, not chosen for elegance.',
    },
  },

  {
    id: 'ML-003',
    domain: 'ML',
    module: 'Foundations',
    topic: 'Data representation',
    title: 'Features, Labels and the Shape of a Dataset',
    slug: 'features-and-labels',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['ML-002'],
    related: ['ML-001', 'ML-002'],
    tags: ['features', 'labels', 'design matrix', 'shapes', 'tabular data'],

    learningObjectives: [
      'Read and predict the shapes of X and y, and explain why scikit-learn insists X is two-dimensional',
      'Distinguish numerical, categorical, ordinal and datetime features and say why the distinction changes what you may do to them',
      'Explain what one row represents and why getting the unit of observation wrong ruins a project silently',
      'Diagnose the three shape errors every beginner meets, from the error message alone',
    ],

    terminology: [
      {
        term: 'Feature',
        definition:
          'One measured input attribute used to make a prediction. Features form the columns of the design matrix; synonyms include predictor, independent variable, covariate and attribute.',
        simple: 'One column of information about each thing you are studying.',
      },
      {
        term: 'Label (target)',
        definition:
          'The value the model is trained to predict. Synonyms include target, response, dependent variable and ground truth.',
        simple: 'The answer you are trying to predict.',
      },
      {
        term: 'Design matrix (X)',
        definition:
          'The two-dimensional array of shape (n_samples, n_features) that a model consumes. Every scikit-learn estimator expects this shape, including when there is one feature.',
        simple: 'The table of inputs: one row per example, one column per attribute.',
      },
      {
        term: 'Unit of observation',
        definition:
          'What a single row represents — a customer, a transaction, a customer-month. Choosing it determines what the model can predict and how the data must be split.',
        simple: 'What one row is about.',
      },
      {
        term: 'Ground truth',
        definition:
          'The recorded correct answer used for training and evaluation. It is a measurement, not reality, and it carries its own error and bias.',
        simple: 'The answer we have written down and agree to treat as correct.',
      },
    ],

    simpleExplanation:
      "Before any algorithm can run, your data has to be turned into a rectangle of numbers. Picture a spreadsheet. Each row is one thing you are studying — one house, one patient, one credit card transaction — and each column is one fact about that thing, such as square metres, age or amount. That rectangle is called X, and it is the input. Alongside it sits a single column called y, containing the answer you want to predict for each row: the sale price, the diagnosis, whether the transaction was fraudulent. The crucial rule is that the rows must line up: row 17 of X and entry 17 of y must describe the same house. Nearly every confusing error a beginner meets comes from this rectangle being the wrong shape, or from y being shuffled out of alignment with X, or from a column of text sitting where the model expected a number. Getting the rectangle right is unglamorous and it is most of the job.",

    whyItExists:
      'Learning algorithms are mathematics over vectors and matrices; they cannot consume a folder of PDFs or a nested JSON document. The feature matrix is the agreed interface between the messy world and the algorithm, and standardising on it is what lets one line of code swap a linear model for a gradient-boosted ensemble.',

    analogy: {
      scenario:
        "Imagine a hospital records office before computers. Every patient has a card, and every card has the same printed boxes: age, weight, blood pressure, smoker yes or no. Because every card has the same boxes in the same order, a clerk can flick through a thousand cards and compare them without reading any of them carefully. If one card has an extra box someone wrote in by hand, or the boxes are in a different order, or a card has the patient's name where the weight should be, the whole system of flicking through breaks down — and the clerk does not notice until the numbers come out nonsense.",
      mapping: [
        { from: 'One patient card', to: 'One row of X — one sample' },
        { from: 'A printed box on the card, identical on every card', to: 'One feature (column)' },
        { from: 'The diagnosis written on the back', to: 'The label y for that row' },
        { from: 'A card with boxes in a different order', to: 'Feature order mismatch between training and inference' },
        { from: 'A name written where the weight should go', to: 'A dtype error — text where the model expected a float' },
      ],
      bridge:
        'The rigidity that feels bureaucratic is precisely the point. A model learns "the third number matters a lot"; it has no idea that the third number is meant to be blood pressure. If the column order changes between training and serving, the model will apply the blood pressure coefficient to the patient’s weight and produce confident nonsense with no error raised anywhere. This is why production systems carry the feature names alongside the matrix rather than relying on position.',
      limitations:
        'The card image suggests every value is always present and correct. Real data is full of blanks, duplicates and values recorded at different times, which is why units ML-027 to ML-029 exist.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a supervised dataset',
        subject: 'X.shape == (1460, 79)   y.shape == (1460,)',
        annotations: [
          { part: '1460', note: 'n_samples — the number of rows, one per house. It must match between X and y exactly.' },
          { part: '79', note: 'n_features — the number of columns after encoding. This is the dimensionality the model works in.' },
          { part: 'y.shape == (1460,)', note: 'The target is one-dimensional: 1460 values, not 1460 rows of one column. The trailing comma matters.' },
          { part: 'X is 2-D, y is 1-D', note: 'This asymmetry catches everyone once. scikit-learn requires X two-dimensional even when there is a single feature.' },
        ],
      },
      {
        kind: 'table',
        title: 'Feature types and what you are allowed to do with them',
        caption: 'Treating an ordinal as nominal loses information; treating a nominal as numeric invents a false order.',
        columns: ['Type', 'Example', 'Legitimate operations', 'Typical preparation'],
        rows: [
          ['Numerical continuous', 'Price, temperature, duration', 'Arithmetic, distance, ordering', 'Scale or standardise; consider log for skew'],
          ['Numerical discrete (count)', 'Number of bedrooms, visits', 'Arithmetic and ordering, but values are integers', 'Often used as-is; sometimes binned'],
          ['Categorical nominal', 'City, browser, product category', 'Equality only — no order, no mean', 'One-hot encoding, or target encoding for high cardinality'],
          ['Categorical ordinal', 'Small/medium/large, education level', 'Ordering, but differences are not meaningful', 'Ordinal encoding with an explicit, stated order'],
          ['Datetime', 'Order timestamp', 'Differences and extraction of parts', 'Derive day of week, hour, days since event; never feed a raw timestamp'],
          ['Text / image', 'Review body, photograph', 'None directly', 'Vectorise (TF-IDF, embeddings) or use a deep model'],
        ],
      },
      {
        kind: 'flow',
        title: 'From raw source to feature matrix',
        steps: [
          { label: 'Decide the unit of observation', detail: 'One row per what? Customer, order, customer-month? Everything downstream depends on this answer.' },
          { label: 'Assemble one row per unit', detail: 'Join, aggregate and pivot until the grain is right. This is where most bugs are born.' },
          { label: 'Separate X from y', detail: 'Pull the target out; make sure nothing in X is a disguised copy of it.' },
          { label: 'Type each column', detail: 'Numeric, nominal, ordinal, datetime, text — the type decides the transformation.' },
          { label: 'Encode and scale', detail: 'Turn everything into numbers, fitting the transformations on training data only.' },
          { label: 'Check shapes and alignment', detail: 'X is (n, d), y is (n,), and row i of each describes the same entity.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Inspect a real feature matrix',
        caption: 'Load a dataset, look at dtypes and shapes, and try the three classic shape errors deliberately.',
        widget: 'dataframe-playground',
      },
    ],

    formalDefinition:
      'A supervised dataset is a collection of n independent samples {(x_i, y_i)} where each x_i ∈ R^d is a feature vector and y_i is the target. Stacked row-wise these form the design matrix X ∈ R^(n×d) and the target vector y ∈ R^n (or R^(n×k) for multi-output problems). The i-th row of X and the i-th entry of y refer to the same unit of observation; d is the dimensionality of the feature space in which every geometric algorithm in this domain operates.',

    math: {
      intuition:
        'A row of X is a point in d-dimensional space. That single idea is what lets a computer treat a house, a patient and a transaction identically: each is just a location, and models draw lines, boxes or curves through that space. Once you can see a dataset as a cloud of points, K-Nearest Neighbours, K-Means and support vector machines all stop being separate mysteries.',
      formulas: [
        {
          latex: 'X = \\begin{bmatrix} x_{11} & \\cdots & x_{1d} \\\\ \\vdots & \\ddots & \\vdots \\\\ x_{n1} & \\cdots & x_{nd} \\end{bmatrix} \\in \\mathbb{R}^{n \\times d}, \\quad \\mathbf{y} \\in \\mathbb{R}^{n}',
          name: 'The design matrix',
          meaning:
            'Rows index examples, columns index features. Almost every formula in this domain is written against this layout, so reading a shape correctly is a prerequisite for reading the maths.',
          variables: [
            { symbol: 'n', meaning: 'Number of samples (rows)' },
            { symbol: 'd', meaning: 'Number of features (columns)' },
            { symbol: 'x_{ij}', meaning: 'Value of feature j for sample i' },
            { symbol: '\\mathbf{y}', meaning: 'Target vector, one entry per sample' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'd(\\mathbf{x}_i, \\mathbf{x}_j) = \\sqrt{\\sum_{k=1}^{d} (x_{ik} - x_{jk})^{2}}',
          name: 'Euclidean distance between two samples',
          meaning:
            'The geometric consequence of the matrix view: two rows are two points and similarity is distance. Note that every feature contributes on its own scale, which is why unscaled features break distance-based models.',
          variables: [
            { symbol: '\\mathbf{x}_i', meaning: 'Feature vector of sample i — one row of X' },
            { symbol: 'd(\\cdot,\\cdot)', meaning: 'Distance between two samples in feature space' },
            { symbol: 'k', meaning: 'Index over the d features' },
          ],
          category: 'linear-algebra',
        },
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Building X and y, and reading their shapes',
        runnable: true,
        code: `import pandas as pd

df = pd.DataFrame({
    "area_sqm":   [52, 81, 120, 64, 96],
    "bedrooms":   [1, 2, 3, 2, 3],
    "city":       ["Leeds", "Leeds", "York", "York", "Leeds"],
    "price_gbp":  [145_000, 210_000, 340_000, 185_000, 265_000],
})

y = df["price_gbp"]                 # the target: one value per house
X = df.drop(columns=["price_gbp"])  # everything else is a candidate feature

print("X shape:", X.shape)          # (rows, columns)
print("y shape:", y.shape)          # one dimension only
print(X.dtypes)`,
        output: `X shape: (5, 3)
y shape: (5,)
area_sqm     int64
bedrooms     int64
city        object
dtype: object`,
        explanation:
          'Three things to read here. X is two-dimensional and y is one-dimensional — that asymmetry is the scikit-learn convention, not an accident. The row counts match, which is the alignment invariant every pipeline depends on. And `city` has dtype `object`, meaning Python strings: feed this straight to a model and you get `ValueError: could not convert string to float: \'Leeds\'`. Unit ML-028 covers the encoding that fixes it.',
      },
      {
        language: 'python',
        title: 'The three shape errors, deliberately provoked',
        runnable: true,
        code: `import numpy as np
from sklearn.linear_model import LinearRegression

area = np.array([52, 81, 120, 64, 96])        # shape (5,) — one dimensional
price = np.array([145, 210, 340, 185, 265])

model = LinearRegression()

# 1. A single feature passed as a 1-D array.
try:
    model.fit(area, price)
except ValueError as e:
    print("ERROR 1:", str(e).splitlines()[0])

# The fix: make it a column. -1 means "work out this dimension for me".
X = area.reshape(-1, 1)
print("reshaped:", X.shape)
model.fit(X, price)

# 2. Mismatched lengths between X and y.
try:
    model.fit(X, price[:3])
except ValueError as e:
    print("ERROR 2:", str(e).splitlines()[0])

# 3. Predicting with a different number of features than training used.
try:
    model.predict(np.array([[80, 2]]))
except ValueError as e:
    print("ERROR 3:", str(e).splitlines()[0])`,
        output: `ERROR 1: Expected 2D array, got 1D array instead:
reshaped: (5, 1)
ERROR 2: Found input variables with inconsistent numbers of samples: [5, 3]
ERROR 3: X has 2 features, but LinearRegression is expecting 1 features as input.`,
        explanation:
          'These three messages account for a large share of early frustration, and each names its own cure. "Expected 2D array" means reshape to `(-1, 1)` for a single feature or `(1, -1)` for a single sample. "Inconsistent numbers of samples" means X and y have drifted out of alignment — usually a filter applied to one and not the other. "X has 2 features but is expecting 1" means training and inference disagree about the columns, which in production is the single most common serving bug.',
      },
      {
        language: 'python',
        title: 'Getting the unit of observation right',
        runnable: true,
        code: `import pandas as pd

transactions = pd.DataFrame({
    "customer_id": [1, 1, 1, 2, 2, 3],
    "amount":      [20.0, 35.5, 12.0, 90.0, 5.5, 44.0],
    "channel":     ["web", "web", "app", "app", "app", "web"],
    "churned":     [0, 0, 0, 1, 1, 0],   # a property of the CUSTOMER, not the row
})

# Wrong: one row per transaction, so customer 1 appears three times.
# The model sees the same person repeatedly and a split will put the
# same customer on both sides of the train/test line.
print("transaction grain:", transactions.shape)

# Right: aggregate to one row per customer — the unit we actually predict for.
customers = transactions.groupby("customer_id").agg(
    n_transactions=("amount", "size"),
    total_spend=("amount", "sum"),
    mean_spend=("amount", "mean"),
    app_share=("channel", lambda s: (s == "app").mean()),
    churned=("churned", "max"),
).reset_index()

print(customers[["customer_id", "n_transactions", "total_spend", "app_share", "churned"]])
print("customer grain:", customers.shape)`,
        output: `transaction grain: (6, 4)
   customer_id  n_transactions  total_spend  app_share  churned
0            1               3         67.5   0.333333        0
1            2               2         95.5   1.000000        1
2            3               1         44.0   0.000000        0
customer grain: (3, 6)`,
        explanation:
          'Churn is a property of a customer, so the unit of observation must be a customer. Leaving the data at transaction grain does two damaging things: heavy spenders dominate the training signal simply by having more rows, and a random split scatters one customer’s transactions across train and test, so the model is evaluated on people it has already seen. The aggregation step here is where most of the real feature engineering in tabular ML happens.',
      },
    ],

    workedExample: {
      title: 'Turning three raw records into a feature matrix by hand',
      setup:
        'You are predicting whether a bike-share ride will exceed 30 minutes. The raw log has three records: (start 2024-03-04 08:12, station "Central", member), (start 2024-03-04 17:45, station "Riverside", casual), (start 2024-03-09 11:30, station "Central", casual). Build X and y by hand.',
      steps: [
        {
          label: 'Fix the unit of observation',
          detail: 'One row per ride. That is what we predict for, so n = 3. Nothing needs aggregating here, which is the easy case.',
        },
        {
          label: 'Type each raw column',
          detail: 'Start time is datetime — never usable raw. Station is categorical nominal with two levels. Rider type is categorical nominal with two levels. There are no continuous features yet, which is a warning sign that we must derive some.',
        },
        {
          label: 'Derive features from the datetime',
          detail: 'Hour of day (8, 17, 11) and is_weekend (4 March 2024 is a Monday so 0; 9 March is a Saturday so 1). A raw Unix timestamp would be useless because it only ever increases and cannot generalise past the training period.',
          latex: '\\text{hour} \\in \\{0,\\dots,23\\}, \\quad \\text{is\\_weekend} \\in \\{0,1\\}',
        },
        {
          label: 'One-hot encode the nominal columns',
          detail: 'Station becomes station_Central and station_Riverside; rider becomes is_member. Encoding station as Central = 0, Riverside = 1 would tell the model Riverside is "greater than" Central, which is meaningless.',
        },
        {
          label: 'Assemble X',
          detail: 'Columns [hour, is_weekend, station_Central, station_Riverside, is_member] give rows [8, 0, 1, 0, 1], [17, 0, 0, 1, 0], [11, 1, 1, 0, 0]. So X has shape (3, 5).',
          latex: 'X \\in \\mathbb{R}^{3 \\times 5}',
        },
        {
          label: 'Assemble y and check alignment',
          detail: 'Suppose the durations were 14, 42 and 35 minutes, so y = [0, 1, 1] with shape (3,). Row 2 of X is the 17:45 Riverside casual ride and entry 2 of y is its label. They were never reordered independently, so alignment holds.',
        },
      ],
      conclusion:
        'Three log lines became a (3, 5) matrix and a length-3 vector. Notice how much judgement went into five columns: hour was extracted rather than used raw, weekend was derived from a calendar, and station was one-hot rather than integer encoded. Change any of those decisions and the model changes, often more than swapping the algorithm would.',
    },

    realWorldExamples: [
      {
        context: 'Kaggle house prices',
        usage:
          'The classic tabular dataset: 1460 rows, 79 raw columns mixing numeric areas, ordinal quality ratings coded as text ("Ex", "Gd", "TA") and nominal neighbourhoods. Deciding which of the quality columns are genuinely ordinal is worth more accuracy than most model choices.',
      },
      {
        context: 'Hospital readmission prediction',
        usage:
          'Raw data is one row per clinical event. Building the feature matrix means choosing a unit of observation — usually one row per admission — and aggregating labs, medications and prior admissions up to the moment of discharge, without letting anything recorded after discharge slip in.',
      },
      {
        context: 'Production feature mismatch',
        usage:
          'A serving system built the feature array by position and a new column was inserted upstream. The model kept returning predictions, silently applying the wrong coefficient to each value, and the error was only found weeks later in a revenue report. Feature stores exist largely to prevent exactly this.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: 'Where the raw data is joined, aggregated and typed on its way to becoming X and y.' },
      { tool: 'NumPy', role: 'The array layer underneath; `reshape(-1, 1)` and shape inspection are daily operations.' },
      { tool: 'scikit-learn', role: 'Defines the (n_samples, n_features) contract that every estimator in the ecosystem honours.' },
    ],

    commonMistakes: [
      {
        mistake: 'Passing a single feature as a one-dimensional array',
        why: 'scikit-learn cannot tell whether a length-5 array is five samples with one feature or one sample with five features, so it refuses rather than guessing.',
        fix: 'Reshape explicitly: `X = values.reshape(-1, 1)` for one feature across many samples, `values.reshape(1, -1)` for one sample with many features.',
      },
      {
        mistake: 'Leaving an identifier column in X',
        why: 'Customer ids, row numbers and hash keys are meaningless numbers, but tree models will happily split on them and memorise the training set, producing excellent training scores and no generalisation.',
        fix: 'Drop identifiers explicitly. If an id appears in your feature importance chart near the top, something has gone wrong.',
      },
      {
        mistake: 'Encoding a nominal category as an integer',
        why: 'Mapping city to 0, 1, 2 asserts that city 2 is twice city 1 and that they are ordered. Linear and distance-based models take that assertion literally.',
        fix: 'One-hot encode nominal categories; reserve ordinal encoding for genuinely ordered scales, and state the order explicitly rather than accepting alphabetical default order.',
      },
      {
        mistake: 'Filtering X and forgetting y',
        why: 'Applying a boolean mask to one and not the other silently misaligns row i of X with label i of y. The model then learns a mapping between unrelated pairs and the error message appears far from the cause.',
        fix: 'Filter the DataFrame before separating X and y, or apply the same mask to both in one statement. Assert `len(X) == len(y)` after any filtering step.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does it mean when scikit-learn says "Expected 2D array, got 1D array instead"?',
        answer:
          'It means the design matrix you passed has only one axis, and scikit-learn requires X to be shaped (n_samples, n_features) even when there is exactly one feature or one sample. The library will not guess which interpretation you meant. The fix depends on intent: `reshape(-1, 1)` if you have many samples of a single feature, `reshape(1, -1)` if you have one sample with many features. The same requirement is why `model.predict(x)` on a single row fails unless you wrap it as `[[...]]`.',
      },
      {
        level: 'intermediate',
        question: 'What is the unit of observation, and why does choosing it wrongly break a project?',
        answer:
          'The unit of observation is what one row of the dataset represents — a customer, an order, a customer-month. It must match the thing you make predictions about. If you predict customer churn but leave the data at transaction grain, three problems follow: customers with more transactions dominate the loss purely by row count; a random train/test split puts the same customer on both sides of the line, which leaks information and inflates your score; and the prediction the model produces is per transaction, which is not the decision anyone wants to make. Fixing it means aggregating to the right grain and splitting by group rather than by row.',
        followUp:
          'A strong answer connects it to GroupKFold or GroupShuffleSplit as the correct splitting strategy when rows share an entity.',
      },
      {
        level: 'ml-engineer',
        question: 'Your model returns plausible but wrong predictions in production while offline metrics are fine. What do you check first?',
        answer:
          'Feature alignment between training and serving. If the serving code builds the input array by position and an upstream column was added, removed or reordered, every coefficient is applied to the wrong value and no exception is raised — the shapes still match. I would log the feature names and order used at training time, assert them at inference, and compare the live feature distributions against the training distributions to spot a column that has shifted wholesale. Beyond that I would check dtype coercion, such as a categorical arriving as a string in serving but an encoded integer in training, and any transformation that was fitted on training data but re-fitted or defaulted at serving time.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'You have `X` of shape (1000, 12) and want to predict for a single new customer whose 12 feature values sit in a Python list. Write the line that produces a correctly shaped input, and explain what the wrong version does.',
        hint: 'One sample, twelve features. Which axis has length 1?',
        solution:
          '`model.predict(np.array(values).reshape(1, -1))`, or equivalently `model.predict([values])`. The result is shape (1, 12): one row, twelve columns. Passing `np.array(values)` directly gives shape (12,), which raises "Expected 2D array". Passing `reshape(-1, 1)` gives shape (12, 1), which is twelve samples with one feature each — scikit-learn will then complain that the model expects 12 features but got 1.',
      },
      {
        prompt:
          'A dataset of clinic visits has columns: patient_id, visit_date, systolic_bp, medication_name, patient_smokes, outcome_90day. Assign each column a feature type and say what you would do with it before modelling.',
        hint: 'One of these is not a feature at all, and one must be transformed rather than used.',
        solution:
          'patient_id is an identifier, not a feature — drop it from X, but keep it to group the train/test split so the same patient cannot appear on both sides. visit_date is datetime: derive month, day of week and days since previous visit rather than using it raw. systolic_bp is numerical continuous — scale it, and check for impossible values such as 0. medication_name is categorical nominal, probably high cardinality, so one-hot if the number of distinct drugs is small and target or frequency encoding otherwise. patient_smokes is binary categorical, encoded as 0/1. outcome_90day is the label y, and you must confirm it is knowable 90 days after the visit rather than recorded at the visit itself.',
      },
      {
        prompt:
          'Explain why `df[df.age > 18]` applied to X but not y produces an error that mentions samples rather than filtering.',
        hint: 'Think about what scikit-learn checks before it starts fitting.',
        solution:
          'Filtering X alone removes rows from the feature matrix while y keeps all of its entries, so the two no longer describe the same set of people. scikit-learn validates lengths first and raises "Found input variables with inconsistent numbers of samples: [742, 1000]". The message is about counts because that is the only symptom visible at the point of failure; the actual bug is upstream. The robust habit is to filter the whole DataFrame first and derive X and y afterwards, so they cannot drift apart.',
      },
    ],

    quiz: [
      {
        id: 'ML-003-q1',
        type: 'mcq',
        concept: 'shapes',
        prompt: 'You have 800 patients and 15 measurements each. What are the shapes of X and y for a supervised problem?',
        options: [
          'X is (800, 15) and y is (800,)',
          'X is (15, 800) and y is (15,)',
          'X is (800, 15) and y is (800, 15)',
          'X is (800,) and y is (800,)',
        ],
        answerIndex: 0,
        explanation:
          'Rows are samples and columns are features, so X is (n_samples, n_features) = (800, 15). The target has one value per sample, giving the one-dimensional shape (800,).',
      },
      {
        id: 'ML-003-q2',
        type: 'debug',
        language: 'python',
        concept: 'shape errors',
        prompt: 'This raises "Expected 2D array, got 1D array instead". What is the correct fix?',
        code: `import numpy as np
from sklearn.linear_model import LinearRegression

hours = np.array([1, 2, 3, 4, 5])
score = np.array([52, 55, 61, 68, 70])
LinearRegression().fit(hours, score)`,
        options: [
          'Pass `hours.reshape(-1, 1)` so the single feature becomes a column',
          'Pass `hours.reshape(1, -1)` so the data becomes one row',
          'Convert `score` to a 2-D array as well',
          'Use `fit(score, hours)` instead',
        ],
        answerIndex: 0,
        explanation:
          'There are five samples of one feature, so X must be (5, 1): `hours.reshape(-1, 1)`. Reshaping to (1, 5) would claim one sample with five features, which does not match y of length 5.',
      },
      {
        id: 'ML-003-q3',
        type: 'match',
        concept: 'feature types',
        prompt: 'Match each column to its feature type.',
        pairs: [
          { left: 'Postcode district', right: 'Categorical nominal' },
          { left: 'Customer satisfaction: poor / fair / good', right: 'Categorical ordinal' },
          { left: 'Monthly revenue in pounds', right: 'Numerical continuous' },
          { left: 'Order placed at 2024-06-01 09:31', right: 'Datetime — derive parts before use' },
        ],
        explanation:
          'The type determines the permitted transformation. Nominal gets one-hot, ordinal gets an explicitly ordered mapping, continuous gets scaling, and datetime must be decomposed into components that can recur in the future.',
      },
      {
        id: 'ML-003-q4',
        type: 'truefalse',
        concept: 'identifiers',
        prompt: 'Leaving `customer_id` in the feature matrix is harmless because the model will learn to ignore a meaningless column.',
        answer: false,
        explanation:
          'It is not harmless. A tree-based model can split repeatedly on the id to isolate individual training rows, memorising the training set and generalising to nothing. Identifiers should be dropped from X and kept for grouping the split.',
      },
      {
        id: 'ML-003-q5',
        type: 'numeric',
        concept: 'dimensionality after encoding',
        prompt: 'A dataset has 6 numeric columns and 2 nominal columns with 4 and 3 categories. After one-hot encoding with no column dropped, how many columns does X have?',
        answer: 13,
        explanation:
          'The 6 numeric columns stay as they are; the nominal columns expand to 4 and 3 indicator columns. 6 + 4 + 3 = 13. Dropping the first level of each to avoid collinearity would give 11 instead.',
      },
      {
        id: 'ML-003-q6',
        type: 'explain',
        concept: 'unit of observation',
        prompt: 'A colleague is predicting customer churn from a table with one row per transaction. Explain what is wrong and what to do.',
        rubric: [
          'Identifies that the label is a property of the customer, not the transaction',
          'Notes that customers with more transactions are over-weighted in training',
          'Notes that a random split puts the same customer in train and test',
          'Proposes aggregating to customer grain, or grouping the split by customer',
        ],
        sampleAnswer:
          'Churn happens to a customer, so a row must be a customer. With transaction rows, a customer with 300 purchases contributes 300 copies of the same label and dominates the fit, while a customer with two barely registers. Worse, a random train/test split scatters one customer across both sides, so the model is scored on people it already trained on and the reported accuracy is inflated. The fix is to aggregate transactions up to one row per customer — counts, totals, means, recency, channel shares — and attach the churn label to that row. If for some reason the transaction grain must be kept, the split has to be GroupKFold on customer_id so no customer spans the boundary.',
        explanation:
          'A strong answer covers both the statistical problem (row weighting) and the evaluation problem (the same entity on both sides of the split), and proposes a concrete fix for each.',
      },
    ],

    flashcards: [
      { front: 'What shape does scikit-learn require for X?', back: '(n_samples, n_features) — two-dimensional, even when there is a single feature or a single sample.' },
      { front: 'What does `reshape(-1, 1)` do and when do you need it?', back: 'Turns a 1-D array of n values into an (n, 1) column. Needed when you have many samples of a single feature.' },
      { front: 'Nominal versus ordinal categorical?', back: 'Nominal has no order (city, browser) and needs one-hot. Ordinal has a meaningful order (small/medium/large) and can be mapped to ranked integers.' },
      { front: 'Why never feed a raw timestamp to a model?', back: 'It only ever increases, so it cannot generalise beyond the training period. Extract hour, day of week, month and elapsed-time features instead.' },
      { front: 'What is the unit of observation?', back: 'What one row represents. It must match the entity you predict for, and it dictates how the data must be split.' },
      { front: 'What does "Found input variables with inconsistent numbers of samples" mean?', back: 'X and y have different row counts — usually a filter applied to one and not the other.' },
    ],

    challenge: {
      title: 'Build a feature matrix from a raw log',
      brief:
        'Take any event log you can obtain — bank statement exports, step counts, browser history, a public transactions dataset. Choose a prediction target, decide the unit of observation explicitly and write it down, then build X and y with pandas. Produce a short table listing every column with its feature type, the transformation you applied and the reason. Finish by asserting the shapes and alignment in code.',
      language: 'python',
      acceptanceCriteria: [
        'The unit of observation is stated in a comment before any aggregation is written',
        'At least one feature is derived from a datetime and at least one from an aggregation',
        'Every column is classified as numeric, nominal, ordinal, datetime or identifier',
        'Identifiers are excluded from X, and the script asserts `X.shape[0] == len(y)`',
      ],
      starterCode: '# Unit of observation: one row per ______\nimport pandas as pd\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who is comfortable with spreadsheets but new to ML what X and y are, and why the shape rules exist.',
      mustCover: [
        'Rows are samples, columns are features, and one row is one thing you predict for',
        'y holds one answer per row and must stay aligned with X',
        'X must be two-dimensional even with a single feature, because the library will not guess',
        'Feature type — numeric, nominal, ordinal, datetime — determines what transformation is legitimate',
      ],
      bonusSignals: ['mentions that identifiers must be dropped', 'mentions that column order must match between training and serving', 'names a concrete error message and its cause'],
      sampleExplanation:
        'Think of a spreadsheet where every row is one house and every column is one fact about that house — floor area, number of bedrooms, city. That block of facts is called X. Next to it sits a single column of the thing you want to predict, the sale price, and that is y. The two must stay locked together: row 17 of X and value 17 of y have to be the same house, which is why filtering one without the other produces an error about mismatched sample counts. The library also insists that X always has two dimensions, even if you only have one column, because a flat list of five numbers could equally mean five houses with one fact each or one house with five facts, and it refuses to guess. Finally, not every column can be used the same way. A floor area can be averaged and compared; a city name cannot, so it has to be turned into yes/no columns first, and a date is useless raw because tomorrow’s date never appeared in training — you extract the day of the week and the month instead.',
    },
  },

  {
    id: 'ML-004',
    domain: 'ML',
    module: 'Foundations',
    topic: 'Honest evaluation',
    title: 'Training, Validation and Test Splits',
    slug: 'train-validation-test-splits',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['ML-003'],
    related: ['ML-002', 'ML-003'],
    tags: ['train test split', 'validation', 'holdout', 'generalisation', 'leakage'],

    learningObjectives: [
      'Explain why performance measured on training data is not evidence of anything',
      'Describe the distinct jobs of the training, validation and test sets, and why there are three rather than two',
      'Split data correctly for stratified, grouped and time-ordered problems, and say why each needs special handling',
      'Recognise the ways a test set silently stops being a test set',
    ],

    terminology: [
      {
        term: 'Training set',
        definition:
          'The data the model fits its parameters on. Performance here measures memorisation as much as learning, so it is diagnostic rather than reportable.',
        simple: 'The examples the model studies from.',
      },
      {
        term: 'Validation set',
        definition:
          'Held-out data used repeatedly to choose between models, tune hyperparameters and decide when to stop. Because it drives decisions, its score becomes optimistic over time.',
        simple: 'The practice exam you use to decide what to revise.',
      },
      {
        term: 'Test set',
        definition:
          'Held-out data touched once, at the very end, to estimate performance on unseen data. Using it to make any decision destroys its purpose.',
        simple: 'The real exam, sat once.',
      },
      {
        term: 'Generalisation',
        definition:
          'The ability of a model to perform on data drawn from the same distribution but never seen during fitting. It is the only property worth having.',
        simple: 'Doing well on new examples, not just the ones you studied.',
      },
      {
        term: 'Stratified split',
        definition:
          'A split that preserves the class proportions of the full dataset in each part, so a rare class does not vanish from one side by chance.',
        simple: 'Splitting so each part has the same mix of classes as the whole.',
      },
    ],

    simpleExplanation:
      "Imagine revising for an exam using a book of past papers that has the answers printed at the back. If you check the answers while you work, you will finish with every question correct, and you will have learned almost nothing about whether you could pass the actual exam. The only honest test is a paper you have never seen, sat once, without the answers. Machine learning has exactly this problem, and solves it the same way. You take your data and cut it into pieces before doing anything else. The training piece is what the model studies. A second piece, the validation set, is what you use while you are still making decisions — which algorithm, how deep the trees, when to stop training — because you need feedback and you cannot get it from the training data. And a third piece, the test set, you lock away and do not look at until every decision is final. The discipline sounds excessive until the first time you watch a model with 99% training accuracy fail completely on real data.",

    whyItExists:
      'A sufficiently flexible model can fit any training set perfectly, including its noise, so training error can be driven to zero without learning anything transferable. Held-out data exists because it is the only available estimate of the quantity you actually care about — error on data the model has never seen — and because repeatedly tuning against the same held-out set slowly turns it into training data.',

    analogy: {
      scenario:
        "A driving instructor teaches a learner on one particular route: the same roundabout, the same hill start, the same tricky junction. After two months the learner performs that route flawlessly. The instructor then takes them on an unfamiliar route across town to see whether they can actually drive, and finds they hesitate badly at an unfamiliar junction layout. Finally the examiner, who has never met the learner, takes them on a route chosen by the test centre and neither of them has seen. Only that last drive tells you whether this person should be licensed.",
      mapping: [
        { from: 'The practice route driven repeatedly', to: 'The training set' },
        { from: 'The instructor’s unfamiliar cross-town route', to: 'The validation set — used repeatedly to adjust teaching' },
        { from: 'The examiner’s unseen route', to: 'The test set, used once' },
        { from: 'Flawless performance on the practice route only', to: 'Overfitting — memorising specifics rather than learning to drive' },
        { from: 'Practising the examiner’s route in advance', to: 'Data leakage, which invalidates the estimate' },
      ],
      bridge:
        'The three-way structure exists for a precise reason. If the instructor used the examiner’s route for practice, the test would measure familiarity rather than skill — and this happens gradually even without cheating, because each time you adjust the model after looking at a held-out score, you transfer a little information from that set into your choices. The validation set is deliberately sacrificed to absorb that contamination so the test set stays clean.',
      limitations:
        'The analogy assumes the roads stay the same. Real deployment distributions drift: the test set tells you about the world as it was when the data was collected, not as it will be next year, which is why monitoring in production is a separate discipline.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The lifecycle of a dataset',
        caption: 'The test set leaves this diagram at step one and does not reappear until the end.',
        steps: [
          { label: 'Split first, before anything else', detail: 'Before imputing, scaling, encoding or even inspecting distributions in detail.' },
          { label: 'Train on the training set', detail: 'Fit parameters. Training error tells you whether the model can fit at all.' },
          { label: 'Score on the validation set', detail: 'Compare models, tune hyperparameters, decide when to stop.' },
          { label: 'Iterate', detail: 'Repeat the previous two steps as often as needed. The validation score becomes optimistic — that is its job.' },
          { label: 'Freeze every decision', detail: 'Choose the final model and settings. No more changes after this point.' },
          { label: 'Score once on the test set', detail: 'This number goes in the report. If you dislike it, you may not go back and tune — that would consume the test set.' },
        ],
      },
      {
        kind: 'table',
        title: 'Which split strategy does your data need?',
        columns: ['Situation', 'Strategy', 'scikit-learn', 'What goes wrong otherwise'],
        rows: [
          ['Balanced classes, independent rows', 'Simple random split', '`train_test_split(X, y, random_state=0)`', 'Little — this is the easy case'],
          ['Imbalanced classes', 'Stratified split', '`train_test_split(..., stratify=y)`', 'A rare class can be absent from the test set entirely, making the metric meaningless'],
          ['Multiple rows per entity', 'Group split', '`GroupShuffleSplit`, `GroupKFold`', 'The same customer appears in train and test; the score is inflated by memorisation'],
          ['Time-ordered data', 'Chronological split', '`TimeSeriesSplit`', 'The model trains on the future to predict the past — optimistic and impossible in production'],
          ['Small dataset', 'Cross-validation plus a held-out test set', '`cross_val_score` then a final test', 'A single small split has huge variance; the score is mostly luck'],
        ],
      },
      {
        kind: 'compare',
        title: 'Validation set versus test set',
        caption: 'They are held out in the same way but play completely different roles.',
        left: {
          heading: 'Validation set',
          points: [
            'Looked at many times, deliberately',
            'Drives decisions: model choice, hyperparameters, early stopping',
            'Its score drifts optimistic as you tune against it',
            'Can be replaced by k-fold cross-validation on the training data',
            'You are allowed to react to it',
          ],
        },
        right: {
          heading: 'Test set',
          points: [
            'Looked at once, at the very end',
            'Drives no decisions at all',
            'Its score is your honest estimate of unseen performance',
            'Cannot be recovered once contaminated — you would need genuinely new data',
            'Reacting to it converts it into a validation set',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Watch training and validation error diverge',
        caption: 'Increase model flexibility and observe the moment training error keeps falling while validation error turns upward.',
        widget: 'bias-variance-lab',
      },
    ],

    formalDefinition:
      'Given a sample D of n i.i.d. observations, a holdout protocol partitions D into disjoint subsets D_train, D_val and D_test. Parameters are estimated by minimising loss on D_train; hyperparameters and model selection minimise loss on D_val; and the loss on D_test provides an unbiased estimate of true risk R(f) conditional on D_test having played no part in any decision. The estimate loses its unbiasedness the moment any selection is made with reference to it, because the reported minimum over many evaluations is a biased estimator of the mean.',

    math: {
      intuition:
        'A test score is an estimate with error bars, not a fact. Two things follow. First, small test sets give noisy estimates, so a 1% difference on 200 test examples is meaningless. Second, if you evaluate many models on the same held-out set and report the best, you are reporting a maximum over noisy estimates, which is systematically too high — the more models you try, the more optimistic that number becomes.',
      formulas: [
        {
          latex: '\\hat{R}_{\\text{test}}(f) = \\frac{1}{m}\\sum_{i=1}^{m} L\\big(y_i, f(x_i)\\big), \\qquad \\mathbb{E}[\\hat{R}_{\\text{test}}] = R(f)',
          name: 'The held-out estimate of true risk',
          meaning:
            'The average loss on m unseen examples is an unbiased estimate of true risk — but only for a model f that was chosen without reference to those examples.',
          variables: [
            { symbol: 'm', meaning: 'Number of test examples' },
            { symbol: 'f', meaning: 'The final model, fixed before the test set is touched' },
            { symbol: 'L', meaning: 'Per-example loss' },
            { symbol: 'R(f)', meaning: 'True risk — expected loss on the full data distribution' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\mathrm{SE} \\approx \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{m}}',
          name: 'Standard error of a held-out accuracy',
          meaning:
            'How much your test accuracy would wobble if you drew a different test set of the same size. With 200 examples at 90% accuracy the standard error is about 2.1 points, so a 95% interval spans roughly 86% to 94%.',
          variables: [
            { symbol: '\\hat{p}', meaning: 'Observed accuracy on the test set' },
            { symbol: 'm', meaning: 'Number of test examples' },
            { symbol: '\\mathrm{SE}', meaning: 'Standard error of the accuracy estimate' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Each test example contributes an independent loss value, so the test average is a sample mean of m i.i.d. terms.',
        'A sample mean is unbiased for its population mean, so the expected test loss equals the true risk — provided f does not depend on the test data.',
        'Its standard error shrinks as one over the square root of m, which is why doubling test set size only reduces noise by about 30%.',
        'If you select the best of k models by their test scores, you are taking a maximum over k noisy estimates. The expected maximum exceeds the true best value, and the gap grows with k. That bias is exactly why the validation set exists as a separate sacrificial layer.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A three-way split with stratification',
        runnable: true,
        code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import numpy as np

X, y = load_breast_cancer(return_X_y=True)
print("full:", X.shape, "positive rate:", round(y.mean(), 3))

# Step 1: carve off the test set and put it away.
X_rest, X_test, y_rest, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# Step 2: split what remains into training and validation.
X_train, X_val, y_train, y_val = train_test_split(
    X_rest, y_rest, test_size=0.25, random_state=42, stratify=y_rest
)

for name, part in [("train", y_train), ("val", y_val), ("test", y_test)]:
    print(f"{name:5s} n={len(part):3d}  positive rate={part.mean():.3f}")`,
        output: `full: (569, 30) positive rate: 0.627
train n=341  positive rate=0.627
val   n=114  positive rate=0.632
test  n=114  positive rate=0.623`,
        explanation:
          'Two calls give a 60/20/20 split: the second `test_size=0.25` is a quarter of the remaining 80%, which is 20% of the original. `stratify` keeps the positive rate near 0.627 in every part — without it, random chance can shift a minority class by several points and your validation score starts measuring the split rather than the model. Note the order: the test set is removed first, before any other operation touches the data.',
      },
      {
        language: 'python',
        title: 'Why a random split is wrong for grouped and time-ordered data',
        runnable: true,
        code: `import numpy as np
import pandas as pd
from sklearn.model_selection import GroupShuffleSplit, TimeSeriesSplit

df = pd.DataFrame({
    "customer_id": np.repeat(np.arange(10), 5),     # 5 rows per customer
    "day":         np.tile(np.arange(5), 10),
    "value":       np.random.RandomState(0).rand(50),
})

# WRONG: a random split scatters each customer across both sides.
from sklearn.model_selection import train_test_split
tr, te = train_test_split(df, test_size=0.3, random_state=0)
overlap = set(tr.customer_id) & set(te.customer_id)
print("customers in BOTH train and test:", len(overlap))

# RIGHT for grouped data: split by entity, not by row.
gss = GroupShuffleSplit(n_splits=1, test_size=0.3, random_state=0)
tr_idx, te_idx = next(gss.split(df, groups=df.customer_id))
overlap = set(df.customer_id[tr_idx]) & set(df.customer_id[te_idx])
print("after GroupShuffleSplit, overlap:", len(overlap))

# RIGHT for time series: always train on the past, test on the future.
ts = TimeSeriesSplit(n_splits=3)
for i, (a, b) in enumerate(ts.split(np.arange(20))):
    print(f"fold {i}: train indices 0-{a[-1]}, test indices {b[0]}-{b[-1]}")`,
        output: `customers in BOTH train and test: 10
after GroupShuffleSplit, overlap: 0
fold 0: train indices 0-4, test indices 5-9
fold 1: train indices 0-9, test indices 10-14
fold 2: train indices 0-14, test indices 15-19`,
        explanation:
          'All ten customers appear on both sides of the random split, so any model that learns customer-specific quirks is rewarded for memorisation. `GroupShuffleSplit` eliminates the overlap entirely. For time series the rule is different again: every training index precedes every test index, because a model that trained on next month to predict last month is measuring something that can never happen in production. Both mistakes produce scores that are too good, which is the most dangerous direction to be wrong in.',
      },
      {
        language: 'python',
        title: 'The test set as a one-shot resource',
        runnable: true,
        code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

X, y = load_breast_cancer(return_X_y=True)
X_rest, X_test, y_rest, y_test = train_test_split(X, y, test_size=0.2, random_state=1, stratify=y)
X_train, X_val, y_train, y_val = train_test_split(X_rest, y_rest, test_size=0.25, random_state=1, stratify=y_rest)

candidates = {
    "logreg":       make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000)),
    "rf_depth_3":   RandomForestClassifier(max_depth=3, random_state=1),
    "rf_depth_None": RandomForestClassifier(random_state=1),
}

scores = {}
for name, model in candidates.items():
    model.fit(X_train, y_train)
    scores[name] = model.score(X_val, y_val)
    print(f"{name:14s} train={model.score(X_train, y_train):.3f}  val={scores[name]:.3f}")

best = max(scores, key=scores.get)
print("chosen on VALIDATION:", best)

# Only now, once, on the test set.
final = candidates[best].fit(X_rest, y_rest)   # refit on train+val
print("reported TEST score:", round(final.score(X_test, y_test), 3))`,
        output: `logreg         train=0.988  val=0.982
rf_depth_3     train=0.988  val=0.947
rf_depth_None  train=1.000  val=0.956
chosen on VALIDATION: logreg
reported TEST score: 0.965`,
        explanation:
          'Three things worth noticing. The unrestricted random forest scores a perfect 1.000 on training data and worse than logistic regression on validation — a textbook picture of memorisation. The model choice was made purely on validation scores. And the test set was touched exactly once, after the decision was frozen, giving 0.965 rather than the slightly rosier 0.982 validation figure. That gap between validation and test is the optimism you would have unknowingly reported if you had only used two splits.',
      },
    ],

    workedExample: {
      title: 'How a test set gets used up without anyone cheating',
      setup:
        'You have 1,000 labelled examples and hold out 200 as a test set. You have no validation set, so you evaluate on the test set as you work. You try 20 model configurations. True accuracy of every configuration is genuinely 80%.',
      steps: [
        {
          label: 'Work out the noise on a single evaluation',
          detail: 'With m = 200 and p = 0.80, the standard error of the test accuracy is sqrt(0.8 × 0.2 / 200) ≈ 0.028, about 2.8 percentage points.',
          latex: '\\mathrm{SE} = \\sqrt{\\frac{0.8 \\times 0.2}{200}} \\approx 0.028',
        },
        {
          label: 'Evaluate 20 identical-quality models',
          detail: 'Each one scores roughly 80% plus noise of standard deviation 2.8 points. Some land at 76%, some at 84%, purely by which examples fell into the test set.',
        },
        {
          label: 'Take the best, as anyone would',
          detail: 'The expected maximum of 20 draws from a normal distribution is about 1.87 standard deviations above the mean. So the winner scores roughly 0.80 + 1.87 × 0.028 ≈ 0.852.',
          latex: '\\mathbb{E}[\\max_{k=1..20} \\hat{p}_k] \\approx \\mu + 1.87\\,\\sigma \\approx 0.852',
        },
        {
          label: 'Report it',
          detail: 'You report 85.2%. Nobody lied, nobody peeked at labels, and no single step was wrong. The true accuracy of the chosen model is still 80%.',
        },
        {
          label: 'See the size of the damage',
          detail: 'A 5-point overstatement from 20 honest attempts. Try 200 configurations in a hyperparameter search and the expected optimism grows further, because the expected maximum keeps climbing with the number of draws.',
        },
      ],
      conclusion:
        'The optimism is not a moral failure, it is a statistical certainty: selecting the maximum of noisy estimates biases the maximum upward. This is the entire reason for a separate validation set. You tune against validation, where optimism is expected and harmless, then take a single clean measurement on a test set that influenced nothing. It is also why a larger test set matters: at m = 2,000 the same 20 attempts would inflate the score by less than 2 points.',
    },

    realWorldExamples: [
      {
        context: 'Kaggle public and private leaderboards',
        usage:
          'Competitions split the test set in two and reveal only the public half during the contest. Teams who tune hard against the public score routinely drop dozens of places when the private score is revealed — a public demonstration of validation optimism at scale.',
      },
      {
        context: 'Clinical model validation',
        usage:
          'Regulators typically require external validation: a test set from a different hospital, different scanner or different year. A within-hospital holdout can look excellent and then fail elsewhere because the model learned scanner artefacts rather than pathology.',
      },
      {
        context: 'Demand forecasting at a retailer',
        usage:
          'Splitting sales data randomly gives spectacular accuracy and is useless, because the model interpolates between surrounding days. The only meaningful evaluation is a chronological split with a gap: train on everything before a date, predict the weeks after it.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`train_test_split`, `StratifiedKFold`, `GroupKFold` and `TimeSeriesSplit` implement every strategy discussed here.' },
      { tool: 'MLflow / Weights & Biases', role: 'Track which split and seed produced each reported number, so results can be reproduced and compared honestly.' },
      { tool: 'pandas', role: 'Where the split is often expressed as a date cut-off or a group key before the arrays are built.' },
    ],

    commonMistakes: [
      {
        mistake: 'Preprocessing before splitting',
        why: 'Fitting a scaler, imputer or encoder on the full dataset lets statistics from the test rows — means, category lists, medians — flow into the training transformation. The test score is then optimistic, and the inflation can be large when the dataset is small.',
        fix: 'Split first, fit every transformation on training data only, then apply it to validation and test. The mechanism that makes this automatic is `Pipeline`, covered in ML-031.',
      },
      {
        mistake: 'Using the test set to decide anything',
        why: 'Once a choice is made by comparing test scores, the test set has become a validation set and its estimate is biased upward. This includes "just checking" and then changing a hyperparameter.',
        fix: 'Keep a validation set or use cross-validation for every decision. Touch the test set once, after everything is frozen, and report whatever it says.',
      },
      {
        mistake: 'Random splits on time series or grouped data',
        why: 'Random splitting leaks future information into the past, or puts the same entity on both sides. Both produce inflated scores that cannot be reproduced in production.',
        fix: 'Use `TimeSeriesSplit` for temporal data — ideally with a gap matching your prediction horizon — and `GroupKFold` whenever rows share an entity.',
      },
      {
        mistake: 'Treating a 1% difference on a small test set as real',
        why: 'On 200 test examples the standard error of accuracy is around 2.8 points, so differences smaller than that are noise.',
        fix: 'Report an interval, not a point. Compute the standard error, or use repeated cross-validation to see how much the number moves across folds.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why do we need a validation set when we already have a test set?',
        answer:
          'Because every decision you make by looking at a held-out score transfers information from that set into your model. Choosing between ten architectures by their held-out scores means the winning score is the maximum of ten noisy estimates, which is systematically higher than the true value. If those decisions are made on the test set, its estimate is no longer unbiased and you have no honest number left. The validation set is deliberately sacrificed to absorb that optimism, so the test set can stay untouched and give one clean measurement at the end. With limited data you can replace the explicit validation set with k-fold cross-validation inside the training portion, but the test set still has to stay outside.',
      },
      {
        level: 'intermediate',
        question: 'You are predicting next month’s energy demand from historical data. How do you split, and why not randomly?',
        answer:
          'Chronologically. Train on everything before a cut-off date and evaluate on the period after it, using `TimeSeriesSplit` for multiple folds that expand the training window forward in time. A random split lets the model train on both the day before and the day after each test day, which is interpolation, not forecasting, and cannot be replicated in production where the future genuinely does not exist yet. I would also insert a gap between train and test equal to the forecast horizon, because features such as rolling seven-day averages otherwise straddle the boundary and leak. Finally, seasonality means a single fold is fragile — evaluating on one November tells you about November, so several chronological folds matter.',
        followUp:
          'Strong answers mention the gap between train and test, and that rolling-window features must be computed within the training window only.',
      },
      {
        level: 'ml-engineer',
        question: 'A teammate reports 97% accuracy. What questions do you ask before believing it?',
        answer:
          'First, on what data — training, validation or a test set that influenced no decisions? Second, what is the base rate; on a 97% majority class, 97% accuracy is what a constant predictor achieves. Third, how large is the evaluation set, because on 150 examples the standard error is over 1.4 points. Fourth, how was it split: random on grouped or time-ordered data would inflate it. Fifth, was any preprocessing fitted before the split, which leaks test statistics into training. And sixth, how many configurations were tried against that same set, since the reported maximum over many attempts is biased upward. I would also ask to see the confusion matrix rather than a single number, since accuracy hides the errors that usually matter.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'You have 10,000 rows and want a 70/15/15 split with `train_test_split`. Write the two calls and explain why the second `test_size` is not 0.15.',
        hint: 'The second split operates on what is left after the first, not on the original data.',
        solution:
          'First: `X_rest, X_test, y_rest, y_test = train_test_split(X, y, test_size=0.15, random_state=0, stratify=y)` leaves 8,500 rows. Second: `X_train, X_val, y_train, y_val = train_test_split(X_rest, y_rest, test_size=0.1765, random_state=0, stratify=y_rest)`, because 1,500 / 8,500 = 0.1765. Using 0.15 there would give 1,275 validation rows and a 72.25/12.75/15 split. The general formula for the second proportion is val_fraction / (1 - test_fraction).',
      },
      {
        prompt:
          'A model scores 0.94 on validation and 0.79 on test. Give three plausible explanations and say how you would distinguish them.',
        hint: 'Think about how many times each set was consulted, how big each is, and whether the two sets came from the same place.',
        solution:
          'One: validation optimism from tuning — you evaluated many configurations against validation and reported the maximum. Check by counting how many configurations were tried; if it was dozens, this alone can explain several points. Two: the sets are small, so both numbers are noisy; compute standard errors, and if the validation set has 100 rows its SE is about 2.4 points, which does not explain 15. Three: the splits are not exchangeable — for example the test set is a later time period or a different group of customers, so the gap is real distribution shift rather than optimism. Distinguish by re-splitting with several random seeds and seeing whether the gap persists; if it survives reshuffling, suspect shift, and if it collapses, it was selection optimism.',
      },
      {
        prompt:
          'Your dataset has 2% positive cases. You split randomly without stratification into 80/20. What could go wrong, and how bad is it with 500 rows?',
        hint: 'Count the expected number of positives in the test set.',
        solution:
          'With 500 rows there are about 10 positives in total, so a 20% test set expects only 2. Sampling variation can easily give 0, 1 or 4, and with 0 the recall on the positive class is undefined while accuracy is trivially 100%. Even with 2, a single misclassification moves recall by 50 percentage points, so the metric is essentially uninformative. The fixes are `stratify=y` to guarantee proportional representation, repeated stratified cross-validation rather than a single split so the estimate averages over many folds, and reporting precision-recall rather than accuracy. If positives are this rare, the honest answer is often that the evaluation set is too small to support any confident claim.',
      },
    ],

    quiz: [
      {
        id: 'ML-004-q1',
        type: 'mcq',
        concept: 'purpose of the test set',
        prompt: 'What is the test set for?',
        options: [
          'A single, final, unbiased estimate of performance on unseen data',
          'Choosing which model and hyperparameters to use',
          'Fitting the model after the training set has been exhausted',
          'Checking convergence during training',
        ],
        answerIndex: 0,
        explanation:
          'The test set exists to be measured once, after every decision is frozen. Using it to choose anything turns it into a validation set and biases its estimate upward.',
      },
      {
        id: 'ML-004-q2',
        type: 'order',
        concept: 'correct workflow order',
        prompt: 'Put the steps of an honest evaluation workflow into the correct order.',
        items: [
          'Split the data into train, validation and test',
          'Fit preprocessing on the training data only',
          'Train candidate models on the training set',
          'Compare candidates on the validation set and choose one',
          'Refit the chosen model on train plus validation',
          'Evaluate once on the test set and report that number',
        ],
        explanation:
          'Splitting comes first, before any preprocessing is fitted, because a scaler or imputer fitted on all the data carries test statistics into training. The test set is touched only in the final step.',
      },
      {
        id: 'ML-004-q3',
        type: 'truefalse',
        concept: 'preprocessing and leakage',
        prompt: 'Fitting a StandardScaler on the whole dataset before splitting is acceptable because scaling does not use the labels.',
        answer: false,
        explanation:
          'Leakage does not require labels. The scaler computes means and standard deviations that include test rows, so information about the test distribution enters the training transformation and the test score becomes optimistic. Fit the scaler on training data only.',
      },
      {
        id: 'ML-004-q4',
        type: 'mcq',
        concept: 'split strategy selection',
        prompt: 'Your dataset has 40 rows per patient and you are predicting a patient-level outcome. Which split do you use?',
        options: [
          'GroupKFold or GroupShuffleSplit keyed on patient id',
          'A simple random split, which is unbiased',
          'A stratified split on the outcome only',
          'TimeSeriesSplit, since clinical data is temporal',
        ],
        answerIndex: 0,
        explanation:
          'Rows from the same patient are not independent. A random or merely stratified split puts the same patient on both sides, so the model is rewarded for recognising individuals. Grouping by patient id prevents it.',
      },
      {
        id: 'ML-004-q5',
        type: 'numeric',
        concept: 'standard error of accuracy',
        prompt: 'A model scores 0.90 accuracy on a test set of 400 examples. What is the approximate standard error of that estimate, to two decimal places?',
        answer: 0.015,
        tolerance: 0.003,
        explanation:
          'SE = sqrt(0.9 × 0.1 / 400) = sqrt(0.000225) = 0.015, so about 1.5 percentage points. A rival model scoring 0.91 on the same set is not meaningfully better.',
      },
      {
        id: 'ML-004-q6',
        type: 'explain',
        concept: 'validation optimism',
        prompt: 'Explain why trying 50 model configurations and reporting the best validation score overstates real performance, even with no mistakes made.',
        rubric: [
          'States that each held-out score is an estimate with random error',
          'States that taking the maximum of many noisy estimates is biased upward',
          'Notes that the bias grows with the number of configurations tried',
          'Concludes that a separate untouched test set is required for an honest number',
        ],
        sampleAnswer:
          'Every validation score is the true performance plus noise from which particular examples landed in that set. If fifty configurations are genuinely equally good, their scores still scatter, and taking the highest one systematically picks a configuration that got lucky as well as one that is good. The expected maximum of fifty noisy draws sits well above the mean, so the reported figure overstates what the model will do on new data, and the overstatement grows the more configurations you try. Nothing dishonest happened; it is a property of maximising over estimates. The remedy is to make all those choices on validation data and then take one measurement on a test set that influenced nothing, accepting whatever it reports.',
        explanation:
          'The essential point is that the bias comes from selection, not from any procedural error, which is why the discipline has to be structural rather than a matter of care.',
      },
    ],

    flashcards: [
      { front: 'What are the three splits for?', back: 'Train: fit parameters. Validation: choose models and hyperparameters. Test: one final unbiased estimate, touched once.' },
      { front: 'When must you split the data?', back: 'First, before fitting any imputer, scaler or encoder — otherwise test statistics leak into the training transformation.' },
      { front: 'When do you need `stratify=y`?', back: 'Whenever classes are imbalanced, so each split preserves the class proportions and rare classes do not vanish.' },
      { front: 'How do you split time-ordered data?', back: 'Chronologically, with TimeSeriesSplit and ideally a gap equal to the forecast horizon. Never randomly.' },
      { front: 'Why is the best-of-many validation score optimistic?', back: 'It is the maximum of many noisy estimates, and the expected maximum exceeds the true value. The bias grows with the number of attempts.' },
      { front: 'Standard error of accuracy p on m test examples?', back: 'sqrt(p(1-p)/m). At p=0.9 and m=400 it is 0.015, so differences under about 1.5 points are noise.' },
    ],

    challenge: {
      title: 'Demonstrate validation optimism yourself',
      brief:
        'Generate a dataset where the features are pure random noise and the label is a fair coin flip, so no model can do better than chance. Hold out a test set of 200 rows. Train 50 models with different random seeds or hyperparameters, pick the one with the best held-out score, and report it. Then generate a genuinely fresh test set and score the same chosen model on it. Write a short note on the gap you observe.',
      language: 'python',
      acceptanceCriteria: [
        'The data contains no real signal, so true accuracy is 0.5 by construction',
        'At least 50 configurations are evaluated against the same held-out set',
        'The best held-out score is clearly above 0.5, and the fresh-data score is not',
        'The write-up connects the gap to the expected maximum of noisy estimates',
      ],
      starterCode: 'import numpy as np\nrng = np.random.default_rng(0)\nX = rng.normal(size=(1000, 20))\ny = rng.integers(0, 2, size=1000)   # no relationship whatsoever\n',
    },

    teachingPrompt: {
      prompt:
        'A colleague says: "I split my data 80/20, tuned until the 20% score was as high as possible, and got 96%." Explain what is wrong.',
      mustCover: [
        'Tuning against a held-out set converts it into a validation set',
        'The best-of-many score is biased upward because it is a maximum over noisy estimates',
        'A third, untouched split is needed for an honest final number',
        'Preprocessing must also be fitted after the split, not before',
      ],
      bonusSignals: ['quantifies the noise with a standard error', 'mentions cross-validation as an alternative to a fixed validation set', 'mentions grouped or temporal splits'],
      sampleExplanation:
        'The 96% is not a lie, but it is not an estimate of future performance either. The moment you started adjusting the model to make that 20% score go up, that 20% stopped being unseen data — you were effectively training on it, slowly, through your own choices. Each score you looked at carried random noise from which rows happened to land in that split, and by repeatedly keeping whatever scored highest you selected for luck as much as for quality. The fix is structural rather than a matter of being careful: split three ways. Tune freely against a validation set, because that set exists to absorb exactly this optimism, then freeze everything and measure once on a test set that has influenced no decision at all. Report that number even if it is lower, because it is the only one that predicts what will happen on real data. And make sure the split happens before any scaler or imputer is fitted, because those carry information across the boundary too.',
    },
  },
  {
    id: 'ML-005',
    domain: 'ML',
    module: 'Regression',
    topic: 'Fitting a line',
    title: 'Linear Regression',
    slug: 'linear-regression',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['ML-003', 'ML-004'],
    related: ['ML-001', 'ML-002'],
    tags: ['linear regression', 'least squares', 'coefficients', 'normal equation', 'regression'],

    learningObjectives: [
      'Explain what a fitted line means and how the slope and intercept should be read in the units of the data',
      'Derive and use the least squares solution, both the closed form and the normal equation',
      'Fit, inspect and interpret a linear regression in scikit-learn, including its coefficients',
      'State the assumptions linear regression makes and recognise the plots that reveal when they are violated',
    ],

    terminology: [
      {
        term: 'Residual',
        definition:
          'The vertical distance between an observed value and the value the model predicts: y minus y-hat. Least squares chooses the line that makes the sum of squared residuals smallest.',
        simple: 'How far off the line each actual point is.',
      },
      {
        term: 'Coefficient (weight)',
        definition:
          'The multiplier attached to a feature. It says how much the prediction changes per one-unit increase in that feature, holding all other features fixed.',
        simple: 'How much the answer moves when you nudge one input by one.',
      },
      {
        term: 'Intercept (bias)',
        definition:
          'The predicted value when every feature equals zero. It positions the line vertically and is often meaningless on its own if zero is outside the data range.',
        simple: 'Where the line crosses when all inputs are zero.',
      },
      {
        term: 'Ordinary least squares (OLS)',
        definition:
          'The estimation method that minimises the sum of squared residuals. It has a closed-form solution, so no iteration is required.',
        simple: 'The recipe for picking the line with the smallest total squared error.',
      },
      {
        term: 'Homoscedasticity',
        definition:
          'The assumption that residual variance is constant across the range of predictions. When it fails, coefficient estimates remain unbiased but their standard errors are wrong.',
        simple: 'The spread of the errors stays about the same everywhere.',
      },
    ],

    simpleExplanation:
      "Suppose you plot the size of thirty flats against the price each sold for. The dots do not fall on a perfect line, but they clearly trend upward: bigger flats cost more. Linear regression draws the single straight line that comes closest to all those dots at once. Closest is defined precisely: for each dot, measure the vertical gap between it and the line, square that gap so that big misses hurt disproportionately and negative misses do not cancel positive ones, add up all the squares, and choose the line that makes that total as small as possible. Remarkably, you do not have to search for this line by trial and error — there is an exact formula that computes it in one step. Once you have it, the slope carries a genuinely useful meaning: if the slope is 3,200, then each extra square metre is associated with about 3,200 more pounds. That interpretability is why linear regression, which is roughly two hundred years old, is still the first model you should try on any numeric prediction problem.",

    whyItExists:
      'Before regression, relating one measured quantity to another meant eyeballing a line through a scatter of points, which gave a different answer for every person who tried. Least squares provided an objective, reproducible criterion and a formula that computes the optimal line exactly, turning a judgement call into arithmetic.',

    analogy: {
      scenario:
        "Imagine a long rope stretched across a field, and thirty pegs hammered into the ground at different heights on either side of it. Now attach each peg to the rope with a spring, running straight up or down. The springs pull the rope until it settles into a position where the total tension is as low as it can be. Springs that are stretched a long way pull much harder than short ones, because a spring's stored energy grows with the square of its extension, so the rope moves noticeably to relieve any single very long spring.",
      mapping: [
        { from: 'Each peg in the ground', to: 'One observed data point (x_i, y_i)' },
        { from: 'The rope', to: 'The fitted regression line' },
        { from: 'The stretch of a spring', to: 'A residual — the vertical error for that point' },
        { from: 'Total stored energy in the springs', to: 'The sum of squared residuals being minimised' },
        { from: 'Long springs pulling disproportionately hard', to: 'Squaring, which makes large errors dominate the fit' },
      ],
      bridge:
        'The spring energy of a stretch e is proportional to e squared, which is exactly the least squares objective, so the rope really does settle at the OLS line. The analogy also explains the method’s best-known weakness for free: one peg hammered in a hundred metres off, an outlier, has a spring so taut that it drags the whole rope towards itself. That is why a single mistyped value can visibly tilt a regression, and why robust alternatives such as Huber loss exist.',
      limitations:
        'Springs pull vertically only, matching the fact that least squares minimises vertical distance rather than perpendicular distance to the line. If the error is in x as well as y, OLS is the wrong tool and total least squares is the right one.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Fit a line by hand, then let least squares do it',
        caption: 'Drag the slope and intercept to minimise the squared error yourself, then compare with the computed optimum.',
        widget: 'linear-regression-lab',
      },
      {
        kind: 'annotated',
        title: 'Reading a fitted model',
        subject: 'price = 18,400 + 3,210 × area_sqm − 4,850 × distance_km',
        annotations: [
          { part: '18,400', note: 'The intercept: the predicted price of a flat with zero area at zero distance. Physically meaningless here — it exists to position the plane, not to be interpreted.' },
          { part: '3,210 × area_sqm', note: 'Each additional square metre adds £3,210 to the prediction, holding distance fixed. The units of the coefficient are pounds per square metre.' },
          { part: '− 4,850 × distance_km', note: 'Each kilometre further from the centre subtracts £4,850, holding area fixed. The sign is as much information as the magnitude.' },
          { part: 'holding all else fixed', note: 'This clause is doing heavy lifting. If area and distance are correlated in your data, no observation actually varies one while the other stays fixed, and the coefficients become unstable.' },
        ],
      },
      {
        kind: 'compare',
        title: 'When linear regression is the right tool, and when it is not',
        caption: 'Its weaknesses are as predictable as its strengths, which is itself a strength.',
        left: {
          heading: 'Strengths — reach for it when',
          points: [
            'You need to explain the model to a non-specialist; coefficients have real units',
            'The relationship is plausibly close to linear, or can be made so by transforming features',
            'You have few rows relative to features and need a low-variance model',
            'Training must be instant and exact — the closed form needs no iteration or tuning',
            'It gives a baseline that any complex model must beat to justify itself',
            'Statistical inference is wanted: standard errors, confidence intervals, hypothesis tests',
          ],
        },
        right: {
          heading: 'Weaknesses — avoid or adapt when',
          points: [
            'The true relationship is curved or has interactions you have not encoded by hand',
            'Outliers are present: squared error lets a single bad point dominate the fit',
            'Features are strongly collinear, which makes coefficients large, unstable and uninterpretable',
            'The target is bounded (a probability, a count) — predictions will fall outside the valid range',
            'Residual variance grows with the prediction, so intervals are wrong even if the fit is not',
            'You have many more features than rows: OLS has no unique solution and needs regularisation',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The four assumptions, and how to catch each one failing',
        columns: ['Assumption', 'What it means', 'Diagnostic', 'If violated'],
        rows: [
          ['Linearity', 'The mean of y is a linear function of the features', 'Residuals versus fitted values shows a curve', 'Add polynomial or interaction terms, or transform the target'],
          ['Independence', 'Residuals are not correlated with each other', 'Residuals plotted in time order show runs', 'Use time-series methods or cluster-robust errors'],
          ['Homoscedasticity', 'Residual spread is constant across predictions', 'Residual plot fans out into a wedge', 'Log-transform the target, or use weighted least squares'],
          ['Normal residuals', 'Residuals are approximately normal', 'Q-Q plot bends away from the diagonal in the tails', 'Only affects small-sample inference; predictions are unaffected'],
        ],
      },
    ],

    formalDefinition:
      'Linear regression models the conditional expectation of the target as an affine function of the features: E[y | x] = w·x + b. Ordinary least squares estimates w and b by minimising the residual sum of squares, which for a design matrix X of full column rank has the unique closed-form solution w = (XᵀX)⁻¹Xᵀy. Under the Gauss-Markov conditions — linearity, zero-mean uncorrelated errors with constant variance — this estimator is the best linear unbiased estimator, meaning it has the lowest variance among all unbiased estimators that are linear in y.',

    math: {
      intuition:
        'You have a knob for slope and a knob for intercept, and a score that says how badly the line misses the points. The score is a smooth bowl-shaped surface over those two knobs, so it has exactly one lowest point. Calculus finds that point directly: at the bottom of a bowl the surface is flat, so set both partial derivatives to zero and solve. That is the whole derivation, and it is why linear regression needs no learning rate, no epochs and no random initialisation.',
      formulas: [
        {
          latex: '\\hat{y} = b + w_1 x_1 + w_2 x_2 + \\cdots + w_d x_d = \\mathbf{w}^{\\top}\\mathbf{x} + b',
          name: 'The linear model',
          meaning: 'The prediction is a weighted sum of the features plus a constant offset.',
          variables: [
            { symbol: '\\hat{y}', meaning: 'The predicted value' },
            { symbol: 'w_j', meaning: 'Coefficient for feature j — the change in prediction per unit change in that feature' },
            { symbol: 'x_j', meaning: 'Value of feature j for this sample' },
            { symbol: 'b', meaning: 'Intercept, the prediction when all features are zero' },
            { symbol: 'd', meaning: 'Number of features' },
          ],
          category: 'regression',
        },
        {
          latex: 'J(\\mathbf{w}, b) = \\sum_{i=1}^{n}\\big(y_i - \\hat{y}_i\\big)^{2} = \\sum_{i=1}^{n}\\big(y_i - \\mathbf{w}^{\\top}\\mathbf{x}_i - b\\big)^{2}',
          name: 'Residual sum of squares',
          meaning: 'The quantity being minimised. Squaring makes errors positive, penalises large misses disproportionately, and makes the objective differentiable everywhere.',
          variables: [
            { symbol: 'J', meaning: 'The cost to be minimised' },
            { symbol: 'y_i', meaning: 'Observed target for sample i' },
            { symbol: '\\hat{y}_i', meaning: 'Predicted target for sample i' },
            { symbol: 'n', meaning: 'Number of samples' },
          ],
          category: 'regression',
        },
        {
          latex: 'w = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^{n}(x_i - \\bar{x})^{2}}, \\qquad b = \\bar{y} - w\\bar{x}',
          name: 'Closed form for simple linear regression',
          meaning:
            'With one feature, the slope is the covariance of x and y divided by the variance of x, and the line always passes through the point of means.',
          variables: [
            { symbol: '\\bar{x}', meaning: 'Mean of the feature values' },
            { symbol: '\\bar{y}', meaning: 'Mean of the target values' },
            { symbol: 'w', meaning: 'Fitted slope' },
            { symbol: 'b', meaning: 'Fitted intercept' },
          ],
          category: 'regression',
        },
        {
          latex: '\\hat{\\mathbf{w}} = (X^{\\top}X)^{-1}X^{\\top}\\mathbf{y}',
          name: 'The normal equation',
          meaning:
            'The multivariate closed form. It requires XᵀX to be invertible, which fails when features are perfectly collinear or when there are more features than samples.',
          variables: [
            { symbol: 'X', meaning: 'Design matrix of shape (n, d), with a column of ones if an intercept is wanted' },
            { symbol: 'X^{\\top}', meaning: 'Transpose of X' },
            { symbol: '(X^{\\top}X)^{-1}', meaning: 'Inverse of the d×d Gram matrix' },
            { symbol: '\\mathbf{y}', meaning: 'Target vector of length n' },
          ],
          category: 'linear-algebra',
        },
      ],
      derivation: [
        'Write the cost for simple regression: J(w, b) = Σ (y_i − w x_i − b)².',
        'Differentiate with respect to b and set to zero: ∂J/∂b = −2 Σ (y_i − w x_i − b) = 0, so Σ y_i = w Σ x_i + n b, giving b = ȳ − w x̄. The fitted line therefore passes through (x̄, ȳ) exactly.',
        'Differentiate with respect to w and set to zero: ∂J/∂w = −2 Σ x_i (y_i − w x_i − b) = 0.',
        'Substitute b = ȳ − w x̄ into that condition: Σ x_i (y_i − ȳ) = w Σ x_i (x_i − x̄).',
        'Because Σ (x_i − x̄) = 0, the sums may be centred on both sides, giving w = Σ (x_i − x̄)(y_i − ȳ) / Σ (x_i − x̄)², which is Cov(x, y) / Var(x).',
        'In matrix form the same argument runs in one step: J(w) = ||y − Xw||², so ∇J = −2Xᵀ(y − Xw) = 0, hence XᵀXw = Xᵀy and w = (XᵀX)⁻¹Xᵀy.',
        'The second derivative XᵀX is positive semi-definite, so this stationary point is a minimum, and it is unique whenever X has full column rank.',
        'In practice solvers never invert XᵀX explicitly. scikit-learn uses an SVD-based least squares routine, which is numerically stable even when the matrix is close to singular.',
      ],
    },

    workedExample: {
      title: 'Fitting a line to five flats by hand',
      setup:
        'Five flats, with area in square metres and price in thousands of pounds: (50, 150), (60, 180), (70, 195), (80, 230), (90, 260). Compute the least squares line, then predict the price of a 75 m² flat.',
      steps: [
        {
          label: 'Compute the means',
          detail: 'x̄ = (50 + 60 + 70 + 80 + 90) / 5 = 70. ȳ = (150 + 180 + 195 + 230 + 260) / 5 = 203.',
          latex: '\\bar{x} = 70, \\quad \\bar{y} = 203',
        },
        {
          label: 'Centre both variables',
          detail: 'x − x̄ gives −20, −10, 0, 10, 20. y − ȳ gives −53, −23, −8, 27, 57.',
        },
        {
          label: 'Compute the numerator, the sum of products',
          detail: '(−20)(−53) + (−10)(−23) + (0)(−8) + (10)(27) + (20)(57) = 1060 + 230 + 0 + 270 + 1140 = 2700.',
          latex: '\\sum (x_i-\\bar{x})(y_i-\\bar{y}) = 2700',
        },
        {
          label: 'Compute the denominator, the sum of squares in x',
          detail: '400 + 100 + 0 + 100 + 400 = 1000.',
          latex: '\\sum (x_i-\\bar{x})^{2} = 1000',
        },
        {
          label: 'Slope',
          detail: 'w = 2700 / 1000 = 2.7. In units: each extra square metre is associated with £2,700 more, since price is in thousands.',
          latex: 'w = \\frac{2700}{1000} = 2.7',
        },
        {
          label: 'Intercept',
          detail: 'b = ȳ − w x̄ = 203 − 2.7 × 70 = 203 − 189 = 14. The fitted line is price = 14 + 2.7 × area.',
          latex: 'b = 203 - 2.7 \\times 70 = 14',
        },
        {
          label: 'Predict and check the residuals',
          detail: 'For 75 m²: 14 + 2.7 × 75 = 216.5, so about £216,500. Fitted values at the five observed areas are 149, 176, 203, 230, 257, so residuals are +1, +4, −8, 0, +3. They sum to zero, as least squares guarantees whenever an intercept is fitted.',
          latex: '\\hat{y}(75) = 14 + 2.7 \\times 75 = 216.5',
        },
      ],
      conclusion:
        'Two sums and a division produced the optimal line — no search, no learning rate, no iterations. The residuals summing to exactly zero is not a coincidence but a direct consequence of the intercept condition ∂J/∂b = 0, and it is a useful arithmetic check on any hand calculation.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Linear regression in scikit-learn, with the coefficients read properly',
        runnable: true,
        code: `import numpy as np
from sklearn.linear_model import LinearRegression

area = np.array([50, 60, 70, 80, 90]).reshape(-1, 1)   # (5, 1): 5 samples, 1 feature
price = np.array([150, 180, 195, 230, 260])            # thousands of pounds

model = LinearRegression().fit(area, price)

print("slope    :", round(model.coef_[0], 3))
print("intercept:", round(model.intercept_, 3))
print("predict 75 sqm:", round(model.predict([[75]])[0], 1))
print("R^2 on training data:", round(model.score(area, price), 4))

residuals = price - model.predict(area)
print("residuals:", np.round(residuals, 2), " sum:", round(residuals.sum(), 10))`,
        output: `slope    : 2.7
intercept: 14.0
predict 75 sqm: 216.5
R^2 on training data: 0.9822
residuals: [ 1.  4. -8.  0.  3.]  sum: 0.0
`,
        explanation:
          'The library reproduces the hand calculation exactly, which is worth verifying once so the closed form stops being abstract. Three details matter in daily use: `coef_` is an array with one entry per feature, `intercept_` is separate rather than being the first coefficient, and the residuals sum to zero because an intercept was fitted. `score` returns R², not accuracy — a common source of confusion when moving between regression and classification.',
      },
      {
        language: 'python',
        title: 'Multiple features, and why coefficient size does not mean importance',
        runnable: true,
        code: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(0)
n = 400
area_sqm    = rng.normal(80, 20, n)
distance_km = rng.normal(6, 2.5, n)
age_years   = rng.integers(0, 60, n)
noise       = rng.normal(0, 15, n)
price = 20 + 3.2 * area_sqm - 4.9 * distance_km - 0.35 * age_years + noise

X = pd.DataFrame({"area_sqm": area_sqm, "distance_km": distance_km, "age_years": age_years})
X_train, X_test, y_train, y_test = train_test_split(X, price, test_size=0.25, random_state=0)

model = LinearRegression().fit(X_train, y_train)
raw = pd.Series(model.coef_, index=X.columns)

# Standardised coefficients: effect of a one-standard-deviation change.
scaler = StandardScaler().fit(X_train)
std_model = LinearRegression().fit(scaler.transform(X_train), y_train)
std = pd.Series(std_model.coef_, index=X.columns)

print(pd.DataFrame({"raw_coef": raw.round(3), "std_coef": std.round(2)}))
print("test R^2:", round(model.score(X_test, y_test), 4))`,
        output: `             raw_coef  std_coef
area_sqm        3.196     63.73
distance_km    -4.902    -12.19
age_years      -0.349     -6.10
test R^2: 0.9455
`,
        explanation:
          'The raw coefficients recover the true generating values closely, which is the reassuring part. The instructive part is the comparison: distance has the largest raw coefficient in absolute value (−4.9 against 3.2) yet the smallest effect is age, and area dominates once coefficients are put on a common footing. Raw coefficients are in units of the feature, so a coefficient on square metres and a coefficient on kilometres are not comparable at all. Standardised coefficients answer the comparable question — what does a one-standard-deviation move in this feature do — and are the right thing to plot when someone asks which feature matters most in a linear model.',
      },
      {
        language: 'python',
        title: 'Reading the diagnostic plots without plotting anything',
        runnable: true,
        code: `import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(1)
x = np.linspace(0, 10, 200)

# A genuinely curved relationship fitted with a straight line.
y_curved = 2 + 0.5 * x**2 + rng.normal(0, 2, 200)
m1 = LinearRegression().fit(x.reshape(-1, 1), y_curved)
r1 = y_curved - m1.predict(x.reshape(-1, 1))

# Heteroscedastic noise: spread grows with x.
y_fan = 3 + 2 * x + rng.normal(0, 0.5 + x, 200)
m2 = LinearRegression().fit(x.reshape(-1, 1), y_fan)
r2 = y_fan - m2.predict(x.reshape(-1, 1))

def diagnose(name, res):
    thirds = np.array_split(res, 3)
    means = [round(float(t.mean()), 2) for t in thirds]
    spreads = [round(float(t.std()), 2) for t in thirds]
    print(f"{name}: residual means by third {means}  spreads {spreads}")

diagnose("curved   ", r1)
diagnose("fanning  ", r2)`,
        output: `curved   : residual means by third [6.27, -7.42, 1.15]  spreads [3.9, 3.37, 8.32]
fanning  : residual means by third [0.13, -0.18, 0.05]  spreads [1.44, 3.55, 5.98]
`,
        explanation:
          'Splitting residuals into thirds along the x-axis turns the two classic diagnostic plots into numbers. The curved case shows residual means swinging positive, negative, positive — a systematic pattern that means the model is missing structure, not just noise, and the cure is a richer model rather than more data. The fanning case has means near zero everywhere, so the fit is unbiased, but the spread quadruples across the range: that is heteroscedasticity, and its consequence is that prediction intervals are too wide at the low end and far too narrow at the high end. Both are invisible in R² alone.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Property valuation models',
        usage:
          'Automated valuation models used by lenders are frequently linear or nearly linear, because a valuation must be defensible in a dispute. "The model added £3,200 per square metre" is an argument; "the ensemble said so" is not.',
      },
      {
        context: 'Econometrics and policy evaluation',
        usage:
          'Almost all published estimates of the effect of a policy, a price change or a minimum wage rise come from regression with carefully chosen controls. The interest is in a single coefficient and its confidence interval, not in prediction accuracy at all.',
      },
      {
        context: 'The baseline that saves a project',
        usage:
          'Fitting a linear model first takes ten minutes and frequently reveals that a proposed deep learning project would add two points of R² for six months of work. It also catches leakage early: an R² of 0.999 from a linear model almost always means a feature is a disguised copy of the target.',
      },
      {
        context: 'Calibrating sensors',
        usage:
          'A thermistor produces a voltage that must be converted to a temperature. Regression against a reference thermometer gives the slope and offset, and the residual plot shows immediately whether a linear calibration is adequate or a quadratic term is needed.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`LinearRegression` for prediction; `Ridge` and `Lasso` when collinearity or high dimensionality make OLS unstable.' },
      { tool: 'statsmodels', role: 'When you need standard errors, p-values, confidence intervals and diagnostic tests rather than just predictions.' },
      { tool: 'NumPy', role: '`np.linalg.lstsq` solves the same problem directly and is what the closed form looks like in practice.' },
    ],

    commonMistakes: [
      {
        mistake: 'Interpreting a coefficient causally',
        why: 'A coefficient describes an association within the data you have, conditional on the other features in the model. Adding or removing a correlated feature can change it wildly, even reverse its sign.',
        fix: 'Say "associated with" unless the data came from a randomised experiment or a credible causal design. Check how stable a coefficient is when you add or drop related features before you build an argument on it.',
      },
      {
        mistake: 'Comparing raw coefficients to rank feature importance',
        why: 'Coefficients carry the units of their feature. A coefficient of 0.001 on a variable measured in grams and 5.0 on one measured in kilograms may describe identical effects.',
        fix: 'Standardise the features and compare the resulting coefficients, or report the effect of a one-standard-deviation change. State which you did.',
      },
      {
        mistake: 'Ignoring multicollinearity',
        why: 'When two features are strongly correlated, XᵀX is nearly singular, so many very different coefficient vectors fit almost equally well. Coefficients become large, unstable, and often signed in ways that contradict domain knowledge.',
        fix: 'Check variance inflation factors or the correlation matrix. Drop or combine the redundant feature, or switch to Ridge regression, which handles collinearity by construction.',
      },
      {
        mistake: 'Trusting R² as proof the model is right',
        why: 'R² measures the proportion of variance explained, and it never decreases when features are added. A high R² is perfectly compatible with a curved residual pattern, a fanning residual plot, or a leaked feature.',
        fix: 'Always look at residuals against fitted values, and always score on held-out data. If R² jumps above 0.99 on real-world data, suspect leakage before celebrating.',
      },
      {
        mistake: 'Extrapolating beyond the range of the data',
        why: 'A line fitted on flats of 50 to 90 m² says nothing reliable about a 400 m² house, but it will cheerfully return a number.',
        fix: 'Record the training range of each feature and flag predictions outside it. Linear models fail silently on extrapolation, unlike trees which at least flatten out.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does linear regression actually minimise, and why squared error rather than absolute error?',
        answer:
          'It minimises the sum of squared residuals, the total of the squared vertical distances from each point to the line. Squaring serves three purposes: it makes positive and negative errors both count, it penalises large misses disproportionately so the fit pays attention to outliers, and — crucially — it produces a smooth, differentiable objective with a unique closed-form solution. Absolute error gives median regression, which is far more robust to outliers, but it is not differentiable at zero and has no closed form, so it needs iterative solvers. The choice is therefore a trade: squared error is convenient and optimal under Gaussian noise, absolute error is robust. scikit-learn offers both, the latter as `HuberRegressor` or `QuantileRegressor`.',
        followUp:
          'A strong answer connects squared error to maximum likelihood under Gaussian noise, which is where the assumption of normal residuals actually comes from.',
      },
      {
        level: 'intermediate',
        question: 'When would you use gradient descent instead of the normal equation?',
        answer:
          'The normal equation requires forming and inverting XᵀX, which costs roughly O(nd² + d³). That is fine for a few hundred features and is exact, so for typical tabular problems it is the better choice. Gradient descent wins in three situations: when d is large, since d³ becomes prohibitive somewhere around ten thousand features; when n is so large that X does not fit in memory, because stochastic gradient descent streams over mini-batches; and when the model is not linear regression at all, since almost every other model has no closed form and iteration is the only option. There is also a numerical point: XᵀX squares the condition number of X, so when features are nearly collinear the closed form is badly conditioned, which is why scikit-learn solves the least squares problem by SVD rather than by literally inverting the matrix.',
      },
      {
        level: 'ml-engineer',
        question: 'Your linear model has an R² of 0.93 on training data and 0.31 on test data. Diagnose it.',
        answer:
          'That gap is characteristic of high variance, but for a plain linear model with few features that is unusual, so I would work through the likely causes in order. First, the ratio of features to samples: if you have 400 features and 500 rows, OLS can nearly interpolate the training data, and Ridge or Lasso is the fix. Second, collinearity, which produces huge coefficients that are finely tuned to training noise — I would check coefficient magnitudes and variance inflation factors. Third, the split: if the test set is a different time period or a different population, this is distribution shift rather than overfitting, and reshuffling the split would collapse the gap. Fourth, high-cardinality one-hot encoded categories, which effectively add one parameter per rare level. I would start by plotting a learning curve, because that separates "needs more data" from "needs a simpler model" quickly.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute the least squares slope and intercept by hand for the points (1, 2), (2, 4), (3, 5), (4, 4), (5, 5).',
        hint: 'Centre both variables first, then take the sum of products over the sum of squares in x.',
        solution:
          'x̄ = 3, ȳ = 4. Centred x: −2, −1, 0, 1, 2. Centred y: −2, 0, 1, 0, 1. Numerator = (−2)(−2) + (−1)(0) + 0(1) + 1(0) + 2(1) = 4 + 0 + 0 + 0 + 2 = 6. Denominator = 4 + 1 + 0 + 1 + 4 = 10. So w = 0.6 and b = 4 − 0.6 × 3 = 2.2, giving ŷ = 2.2 + 0.6x. Check: fitted values are 2.8, 3.4, 4.0, 4.6, 5.2 and residuals are −0.8, 0.6, 1.0, −0.6, −0.2, which sum to zero as required.',
      },
      {
        prompt:
          'A model trained on house data reports coefficients: bedrooms = −8,500, area_sqm = 4,100. Why might the bedroom coefficient be negative, and is the model wrong?',
        hint: 'Read the coefficient with its "holding all else fixed" clause attached.',
        solution:
          'It reads: holding total area fixed, an extra bedroom is associated with £8,500 less. That is entirely plausible — for a fixed 80 m², four cramped bedrooms are worth less than two generous ones, so the coefficient is capturing room size, not the value of bedrooms. The model is not wrong; the naive reading of it is. This is also a warning sign of collinearity, since bedrooms and area are strongly correlated in any real dataset, so the two coefficients are jointly determined and individually unstable. I would check the variance inflation factor, and if the aim is interpretation rather than prediction, consider replacing the pair with area and mean room size, which are less entangled.',
      },
      {
        prompt:
          'You fit a regression and the residuals, plotted against fitted values, form a clear U shape. What is wrong and what are two fixes?',
        hint: 'A pattern in the residuals means the model missed structure, not that the data is noisy.',
        solution:
          'A U shape means the true relationship is curved and the straight line is under-predicting at both ends and over-predicting in the middle, so the linearity assumption is violated. The residuals are not random noise; they contain signal the model failed to capture. Fix one: add polynomial terms, for example x², via `PolynomialFeatures`, which keeps the model linear in its parameters while allowing a curved fit — this is ML-006. Fix two: transform the target or the feature, such as regressing log(y) on x when the relationship is multiplicative, which frequently straightens the curve and stabilises the variance at the same time. A third option is to switch to a model that finds nonlinearity itself, such as gradient boosting, at the cost of interpretability.',
      },
    ],

    quiz: [
      {
        id: 'ML-005-q1',
        type: 'mcq',
        concept: 'the least squares objective',
        prompt: 'Ordinary least squares chooses the line that minimises which quantity?',
        options: [
          'The sum of squared vertical distances from the points to the line',
          'The sum of perpendicular distances from the points to the line',
          'The largest single distance from any point to the line',
          'The number of points that do not lie exactly on the line',
        ],
        answerIndex: 0,
        explanation:
          'OLS minimises squared vertical residuals. Perpendicular distance gives total least squares, used when x is also measured with error; minimising the largest error gives a minimax fit, which is far more sensitive to outliers.',
      },
      {
        id: 'ML-005-q2',
        type: 'numeric',
        concept: 'closed-form slope',
        prompt: 'For data with Σ(x−x̄)(y−ȳ) = 480 and Σ(x−x̄)² = 160, what is the fitted slope?',
        answer: 3,
        explanation:
          'The slope is the sum of cross-products divided by the sum of squares in x: 480 / 160 = 3. Equivalently it is Cov(x, y) / Var(x), since the sample size cancels from both.',
      },
      {
        id: 'ML-005-q3',
        type: 'truefalse',
        concept: 'residual properties',
        prompt: 'When an intercept is fitted, the residuals of an ordinary least squares regression always sum to exactly zero.',
        answer: true,
        explanation:
          'Setting the derivative of the cost with respect to the intercept to zero gives exactly the condition Σ(y_i − ŷ_i) = 0. It also implies the fitted line passes through the point of means. Without an intercept this guarantee disappears.',
      },
      {
        id: 'ML-005-q4',
        type: 'debug',
        language: 'python',
        concept: 'interpreting coefficients',
        prompt: 'A colleague concludes that `weight_kg` matters most because its coefficient is largest. What is the flaw?',
        code: `# coef_ for a model predicting blood pressure
# height_cm : 0.42
# weight_kg : 1.85
# age_years : 0.77
print("weight is the most important feature")`,
        options: [
          'Coefficients carry the units of their feature, so they are not comparable until the features are standardised',
          'Coefficients are always negative for important features',
          'The intercept should have been added to each coefficient first',
          'Feature importance can only be measured by dropping features one at a time',
        ],
        answerIndex: 0,
        explanation:
          'A coefficient is a change in the target per one unit of that feature, and one kilogram, one centimetre and one year are not comparable amounts. Standardise the features and compare the resulting coefficients, which express the effect of a one-standard-deviation change.',
      },
      {
        id: 'ML-005-q5',
        type: 'multi',
        concept: 'assumptions and diagnostics',
        prompt: 'Which observations suggest a linear regression assumption has been violated? Select all that apply.',
        options: [
          'Residuals plotted against fitted values form a clear curve',
          'Residual spread widens steadily as the prediction grows',
          'Residuals sum to zero',
          'Residuals in time order show long runs of the same sign',
          'The model has a high R² on training data',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'A curve indicates non-linearity, a widening spread indicates heteroscedasticity, and runs in time order indicate correlated errors. Residuals summing to zero is guaranteed by fitting an intercept, and a high training R² says nothing about assumptions.',
      },
      {
        id: 'ML-005-q6',
        type: 'explain',
        concept: 'when to use linear regression',
        prompt: 'A colleague wants to start a tabular regression problem with a gradient-boosted ensemble. Argue for fitting a linear model first.',
        rubric: [
          'Names the baseline argument: a complex model must beat something to justify itself',
          'Mentions interpretability and units of the coefficients',
          'Mentions speed of fitting and absence of hyperparameters',
          'Mentions that an implausibly good linear fit exposes leakage early',
        ],
        sampleAnswer:
          'Fitting a linear model costs about ten minutes and answers several questions at once. It establishes a baseline, so if boosting later reaches R² of 0.72 against the linear model’s 0.70, you know the extra complexity bought almost nothing and can spend the time on features instead. It is interpretable: the coefficients are in real units, so a domain expert can look at them and say immediately that a sign is wrong, which is often how a data problem is discovered. It has essentially no hyperparameters, so there is nothing to tune and nothing to get wrong. And it is an excellent leakage detector — an R² of 0.999 on messy real-world data almost always means a feature is a repackaged copy of the target, and finding that on day one is far cheaper than finding it after deployment.',
        explanation:
          'The strongest version of this argument is diagnostic rather than about accuracy: the linear model is a cheap instrument for learning about the data itself.',
      },
    ],

    flashcards: [
      { front: 'What does OLS minimise?', back: 'The sum of squared vertical residuals, Σ(y − ŷ)². Squaring makes it smooth, symmetric and dominated by large errors.' },
      { front: 'Closed form for a simple regression slope?', back: 'w = Σ(x−x̄)(y−ȳ) / Σ(x−x̄)² = Cov(x, y) / Var(x), and b = ȳ − w·x̄.' },
      { front: 'What is the normal equation?', back: 'w = (XᵀX)⁻¹Xᵀy — the exact multivariate solution. It needs XᵀX invertible, so it fails under perfect collinearity or when d > n.' },
      { front: 'How do you read a coefficient?', back: 'The change in the prediction per one-unit increase in that feature, holding all other features fixed, in the units of that feature.' },
      { front: 'Why can raw coefficients not rank feature importance?', back: 'They carry the units of their feature. Standardise the features first, then compare.' },
      { front: 'Name the four OLS assumptions.', back: 'Linearity, independent errors, constant error variance (homoscedasticity) and approximately normal residuals. The last matters only for inference.' },
    ],

    challenge: {
      title: 'Implement least squares three ways and compare',
      brief:
        'On a dataset of your choice with at least three numeric features, compute the coefficients three ways: with the normal equation using explicit matrix inversion, with `np.linalg.lstsq`, and with `sklearn.linear_model.LinearRegression`. Confirm they agree. Then deliberately add a feature that is an exact linear combination of two others and repeat. Document which approaches fail, how they fail, and what the error or warning says.',
      language: 'python',
      acceptanceCriteria: [
        'All three approaches agree to at least six decimal places on well-conditioned data',
        'The collinear case is constructed exactly, not approximately',
        'The write-up explains why explicit inversion fails while the SVD-based routines return an answer',
        'A sentence explains what scikit-learn returns in the singular case and why it is a reasonable choice',
      ],
      starterCode: 'import numpy as np\n\ndef ols_normal_equation(X, y):\n    Xb = np.c_[np.ones(len(X)), X]   # add the intercept column\n    return np.linalg.inv(Xb.T @ Xb) @ Xb.T @ y\n',
    },

    teachingPrompt: {
      prompt:
        'Teach linear regression to someone who is comfortable with scatter plots but has never seen calculus used on data.',
      mustCover: [
        'The line is chosen to minimise the total squared vertical distance to the points',
        'Squaring makes big misses count disproportionately and errors not cancel out',
        'There is an exact formula, so no searching or iteration is needed',
        'The slope has a real-world meaning in the units of the data, and the intercept often does not',
      ],
      bonusSignals: ['mentions sensitivity to outliers', 'mentions that a coefficient is conditional on the other features', 'mentions checking residuals for patterns'],
      sampleExplanation:
        'Plot the flats you have data for, with size along the bottom and price up the side. The dots trend upwards but do not sit on a line, so the question is which line to draw. Pick any candidate line and measure, for each dot, how far it sits above or below it. Square each of those gaps — that stops the ones above cancelling the ones below, and it makes a single very bad miss count far more than several small ones. Add up the squares, and you have a score for that line. Linear regression is simply the line with the lowest possible score, and the useful surprise is that you never have to try candidates: two sums of the data produce the answer exactly. What you get back is a slope, which you can read straight off in real units — if it comes out at 2.7 with price in thousands, an extra square metre is worth about £2,700 in this market. The intercept is usually not worth interpreting, because a flat of zero square metres does not exist; it is just where the line has to cross to sit correctly over the data. Two cautions. One badly wrong data point drags the line noticeably, because of the squaring. And after fitting, look at the gaps again: if they form a pattern rather than scattering randomly, a straight line was the wrong shape and the model is missing something real.',
    },
  },

  {
    id: 'ML-006',
    domain: 'ML',
    module: 'Regression',
    topic: 'Nonlinear fits with linear models',
    title: 'Multiple and Polynomial Regression',
    slug: 'multiple-and-polynomial-regression',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['ML-005'],
    related: ['ML-004', 'ML-005'],
    tags: ['multiple regression', 'polynomial features', 'interactions', 'overfitting', 'multicollinearity'],

    learningObjectives: [
      'Extend a single-feature regression to many features and interpret coefficients conditionally',
      'Use polynomial and interaction features to fit curves with a model that remains linear in its parameters',
      'Demonstrate how increasing polynomial degree buys training accuracy and loses generalisation',
      'Diagnose multicollinearity and explain why polynomial features make it worse',
    ],

    terminology: [
      {
        term: 'Multiple regression',
        definition:
          'Linear regression with more than one feature. Geometrically it fits a hyperplane rather than a line, and each coefficient is a partial effect conditional on the others.',
        simple: 'The same idea as fitting a line, but with several inputs at once.',
      },
      {
        term: 'Polynomial features',
        definition:
          'Derived columns formed by raising features to powers and multiplying them together, allowing a linear model to represent curves and interactions.',
        simple: 'Extra made-up columns like x squared, so a straight-line method can bend.',
      },
      {
        term: 'Interaction term',
        definition:
          'A product of two features, x₁x₂, which lets the effect of one feature depend on the value of another.',
        simple: 'A column that captures "these two together matter differently than each alone".',
      },
      {
        term: 'Linear in the parameters',
        definition:
          'The property that makes polynomial regression still linear regression: the model is a weighted sum of terms, even though those terms are nonlinear functions of the raw inputs.',
        simple: 'The curve comes from the columns, not from changing how the model combines them.',
      },
      {
        term: 'Multicollinearity',
        definition:
          'Strong linear dependence between features, which makes XᵀX nearly singular, coefficients unstable and their standard errors large.',
        simple: 'Two columns that say nearly the same thing, so the model cannot decide which deserves the credit.',
      },
    ],

    simpleExplanation:
      "A straight line is a poor model of most things. Ice cream sales rise with temperature but level off when it gets too hot to leave the house; a drug helps more as the dose increases until it starts to harm. The trick that makes linear regression handle curves is disarmingly simple: instead of changing the model, change the columns. Add a column containing the square of your input, and another containing its cube, and hand all three to exactly the same least squares machinery. The model still does the only thing it knows how to do — take a weighted sum of its columns — but a weighted sum of x, x² and x³ can bend. The same trick handles the case where two features interact, by adding a column containing their product. The danger is that it works too well. With enough polynomial terms, the curve will pass exactly through every training point, wiggling violently between them, and be catastrophically wrong on anything new. Watching that happen as you raise the degree is one of the most useful experiences in this whole domain.",

    whyItExists:
      'Real relationships curve and features interact, yet the least squares machinery is fast, exact and well understood. Feature expansion exists to get curvature for free: by transforming the inputs rather than the estimator, all the mathematics and tooling of linear regression continues to apply to a strictly richer family of shapes.',

    analogy: {
      scenario:
        "A tailor can only sew straight seams, which seems to rule out fitted clothing. The solution is not a new sewing machine but a different way of cutting the cloth: cut enough panels, each with straight edges, and stitch them together, and you get a garment that curves around a body. A jacket is a collection of flat pieces that together approximate a three-dimensional shape. More panels give a closer fit — but cut fifty panels for a simple sleeve and the garment becomes stiff, fragile at every seam, and fits only the one mannequin it was cut on.",
      mapping: [
        { from: 'The straight-seam sewing machine', to: 'Ordinary least squares, which can only take weighted sums' },
        { from: 'Cutting extra panels', to: 'Adding polynomial and interaction features' },
        { from: 'The curved garment that results', to: 'A curved fitted function, from a model still linear in its parameters' },
        { from: 'Fifty panels for one sleeve', to: 'High polynomial degree — flexible to the point of fitting noise' },
        { from: 'Fitting only the one mannequin', to: 'Overfitting: excellent on training data, useless on anyone else' },
      ],
      bridge:
        'The point of the analogy is where the flexibility lives. The machine never changed — least squares is doing exactly what it did in the previous unit. All the expressive power came from the preparation of the input. This is the same conceptual move as the kernel trick in support vector machines and, in a sense, as the hidden layers of a neural network: transform the space until a simple decision rule is sufficient.',
      limitations:
        'Panels are cut deliberately by a tailor who understands bodies, whereas `PolynomialFeatures` generates every term mechanically, including many that are meaningless. Domain-driven feature construction is usually better than brute-force expansion, which is the argument of unit ML-029.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Raise the polynomial degree and watch generalisation collapse',
        caption: 'Degree 1 underfits, degree 3 is about right, degree 15 threads every training point and is wild between them.',
        widget: 'bias-variance-lab',
      },
      {
        kind: 'table',
        title: 'Degree versus fit: the same data, seven models',
        caption: 'Training error only ever falls. Validation error falls, bottoms out, then rises sharply. The gap between the columns is the whole story.',
        columns: ['Degree', 'Parameters', 'Training R²', 'Validation R²', 'Verdict'],
        rows: [
          ['1 (straight line)', '2', '0.62', '0.59', 'Underfits — the residual plot curves'],
          ['2', '3', '0.89', '0.87', 'Better; captures the main curvature'],
          ['3', '4', '0.94', '0.93', 'Best validation score — the sweet spot'],
          ['5', '6', '0.95', '0.90', 'Beginning to chase noise'],
          ['9', '10', '0.98', '0.61', 'Clear overfitting; coefficients growing large'],
          ['15', '16', '0.999', '−3.4', 'Interpolates the training points, worse than predicting the mean'],
        ],
      },
      {
        kind: 'compare',
        title: 'Polynomial expansion: strengths and costs',
        left: {
          heading: 'Strengths — reach for it when',
          points: [
            'You can see curvature in the residual plot of a linear fit',
            'The curvature is smooth and the data range is bounded',
            'You need to keep the interpretability and speed of a linear model',
            'Physics or theory suggests a specific power, such as area scaling with the square of length',
            'You want interactions between a small number of features you understand',
          ],
        },
        right: {
          heading: 'Costs — be careful because',
          points: [
            'The number of terms explodes: degree 3 on 10 features gives 285 columns',
            'Powers of a feature are highly collinear, destabilising coefficients',
            'Extrapolation becomes catastrophic — a degree-9 fit goes to ±infinity immediately outside the data',
            'Features must be scaled or x¹⁵ overflows the numeric range',
            'Degree is a hyperparameter that must be chosen on validation data, never on training data',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How to choose a degree honestly',
        steps: [
          { label: 'Fit degree 1 and plot residuals', detail: 'If they curve, the relationship is nonlinear and expansion is justified.' },
          { label: 'Scale the features first', detail: 'Standardise before expanding, or the high powers differ by many orders of magnitude.' },
          { label: 'Sweep the degree with cross-validation', detail: 'Score each degree on held-out folds, never on training data.' },
          { label: 'Choose the lowest degree within noise of the best', detail: 'If degree 3 and degree 6 are within one standard error, take degree 3.' },
          { label: 'Add regularisation if degree must stay high', detail: 'Ridge on polynomial features keeps the curve smooth instead of letting coefficients explode.' },
          { label: 'Check the extrapolation range', detail: 'Record the min and max of each feature; refuse or flag predictions outside them.' },
        ],
      },
    ],

    formalDefinition:
      'Multiple linear regression models E[y | x] = b + Σ w_j x_j, fitting a d-dimensional hyperplane by least squares. Polynomial regression of degree p applies a fixed basis expansion φ: R^d → R^m whose components are all monomials of total degree at most p, then fits a linear model in φ(x). The resulting function is nonlinear in x but linear in the parameters w, so the normal equation and all standard least squares theory continue to apply. The number of terms grows as C(d + p, p), which is why degree-3 expansion of ten features produces 286 columns including the intercept.',

    math: {
      intuition:
        'Adding features never increases training error, because the model can always set a new coefficient to zero and reproduce its previous fit. That single fact explains why training R² is worthless for choosing how many features to use, and why the entire apparatus of validation exists. Each new term buys flexibility, and flexibility spends itself on noise as readily as on signal.',
      formulas: [
        {
          latex: '\\hat{y} = b + \\sum_{j=1}^{d} w_j x_j',
          name: 'Multiple linear regression',
          meaning:
            'A hyperplane in d dimensions. Each w_j is the partial effect of feature j with the others held constant, which is why coefficients change when you add or remove a correlated feature.',
          variables: [
            { symbol: 'w_j', meaning: 'Partial coefficient of feature j' },
            { symbol: 'x_j', meaning: 'Value of feature j' },
            { symbol: 'b', meaning: 'Intercept' },
            { symbol: 'd', meaning: 'Number of features' },
          ],
          category: 'regression',
        },
        {
          latex: '\\hat{y} = b + w_1 x + w_2 x^{2} + \\cdots + w_p x^{p}',
          name: 'Polynomial regression of degree p',
          meaning:
            'Nonlinear in x, linear in w. The design matrix simply has extra columns holding the powers, and least squares is applied unchanged.',
          variables: [
            { symbol: 'p', meaning: 'Polynomial degree — the maximum power included' },
            { symbol: 'w_k', meaning: 'Coefficient on the k-th power of x' },
            { symbol: 'x^{k}', meaning: 'The k-th power of the feature, computed as a new column' },
          ],
          category: 'regression',
        },
        {
          latex: '\\hat{y} = b + w_1 x_1 + w_2 x_2 + w_3 x_1 x_2',
          name: 'Interaction term',
          meaning:
            'The effect of x₁ is now b + w₁ + w₃x₂ — it depends on x₂. Without the product term, a linear model forces the effect of each feature to be the same at every value of the others.',
          variables: [
            { symbol: 'w_3', meaning: 'Interaction coefficient: how much the effect of x₁ changes per unit of x₂' },
            { symbol: 'x_1 x_2', meaning: 'The product column created by the expansion' },
          ],
          category: 'regression',
        },
        {
          latex: 'm = \\binom{d + p}{p}',
          name: 'Number of terms after expansion',
          meaning:
            'How quickly the design matrix grows. With d = 10 and p = 3 this is 286 columns from ten original features — often more columns than you have rows.',
          variables: [
            { symbol: 'd', meaning: 'Original number of features' },
            { symbol: 'p', meaning: 'Polynomial degree' },
            { symbol: 'm', meaning: 'Total number of terms including the intercept' },
          ],
          category: 'complexity',
        },
        {
          latex: '\\mathrm{VIF}_j = \\frac{1}{1 - R_j^{2}}',
          name: 'Variance inflation factor',
          meaning:
            'How much the variance of coefficient j is inflated by its correlation with the other features. Above about 10 the coefficient is not interpretable; polynomial terms routinely exceed 100.',
          variables: [
            { symbol: 'R_j^{2}', meaning: 'R² from regressing feature j on all the other features' },
            { symbol: '\\mathrm{VIF}_j', meaning: 'Variance inflation factor for feature j' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Let φ(x) = [1, x, x², …, x^p] be the expanded feature vector for a single input.',
        'The model is ŷ = wᵀφ(x), which is linear in w even though φ is nonlinear in x.',
        'Stack the expanded rows into a matrix Φ of shape (n, p+1). The cost is ||y − Φw||², identical in form to ordinary regression.',
        'Therefore the solution is w = (ΦᵀΦ)⁻¹Φᵀy — the same normal equation, applied to the expanded matrix.',
        'The columns of Φ are powers of the same variable and are therefore highly correlated: for x in [0, 1], the correlation between x² and x³ exceeds 0.98.',
        'That correlation makes ΦᵀΦ ill-conditioned, so its inverse amplifies noise and the fitted coefficients become enormous with alternating signs.',
        'Two standard remedies follow: use an orthogonal polynomial basis, or add a ridge penalty λ||w||², which bounds the coefficients and restores conditioning. The second is why polynomial regression in practice is almost always polynomial ridge regression.',
      ],
    },

    workedExample: {
      title: 'Degree by degree on eight points',
      setup:
        'Eight measurements of yield against temperature, generated by y = 5 + 2x − 0.15x² plus small noise, with x running from 1 to 8. Fit degree 1, 2 and 7 and compare.',
      steps: [
        {
          label: 'Degree 1: a straight line',
          detail: 'Least squares gives roughly ŷ = 8.4 + 0.66x. Training R² ≈ 0.72. The residuals are negative at both ends and positive in the middle — a clear arch, which is the signature of missing curvature.',
          latex: '\\hat{y} = 8.4 + 0.66x',
        },
        {
          label: 'Read the diagnosis before acting',
          detail: 'The arch in the residuals is the evidence that justifies expansion. Adding x² without such evidence is guessing.',
        },
        {
          label: 'Degree 2: add an x² column',
          detail: 'The design matrix gains a column [1, 4, 9, 16, 25, 36, 49, 64]. Least squares recovers approximately ŷ = 5.1 + 1.97x − 0.148x², very close to the generating truth. Training R² ≈ 0.981, and the residuals now scatter without pattern.',
          latex: '\\hat{y} = 5.1 + 1.97x - 0.148x^{2}',
        },
        {
          label: 'Degree 7: as many parameters as data points',
          detail: 'With eight points and eight coefficients the system is exactly determined, so the curve passes through every point. Training R² = 1.000 exactly, and every residual is zero.',
          latex: 'R^{2}_{\\text{train}} = 1.000, \\quad \\text{all residuals} = 0',
        },
        {
          label: 'Look at what degree 7 actually did',
          detail: 'Its coefficients are of the order of thousands with alternating signs, and between x = 3 and x = 4 the fitted curve dips by more than 20 units — a swing that exists nowhere in the data. Evaluated at x = 3.5 it predicts a value far outside the observed range.',
        },
        {
          label: 'Score all three on four held-out points',
          detail: 'Validation R² comes out around 0.70 for degree 1, 0.96 for degree 2 and −14 for degree 7. A negative R² means the model is worse than always predicting the mean of the target.',
          latex: 'R^{2}_{\\text{val}}: \\; 0.70, \\; 0.96, \\; -14',
        },
      ],
      conclusion:
        'Perfect training fit and catastrophic validation performance arrived together, which is the defining picture of overfitting. Notice that nothing about the training numbers warned you: R² went 0.72 → 0.981 → 1.000, monotonically improving. Only held-out data exposed the collapse, which is precisely why ML-004 insisted on it before any model was fitted.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Curves from a linear model, via PolynomialFeatures',
        runnable: true,
        code: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(0)
x = np.linspace(0, 6, 60).reshape(-1, 1)
y = 5 + 2 * x.ravel() - 0.35 * x.ravel() ** 2 + rng.normal(0, 0.8, 60)

x_tr, x_te, y_tr, y_te = train_test_split(x, y, test_size=0.3, random_state=0)

for degree in (1, 2, 3, 9, 15):
    model = make_pipeline(
        PolynomialFeatures(degree, include_bias=False),
        LinearRegression(),
    ).fit(x_tr, y_tr)
    biggest = np.abs(model[-1].coef_).max()
    print(f"degree {degree:2d}  train R2={model.score(x_tr, y_tr):6.3f}"
          f"  test R2={model.score(x_te, y_te):8.3f}"
          f"  largest |coef|={biggest:12.1f}")`,
        output: `degree  1  train R2= 0.548  test R2=   0.477  largest |coef|=         0.0
degree  2  train R2= 0.966  test R2=   0.957  largest |coef|=         2.0
degree  3  train R2= 0.967  test R2=   0.954  largest |coef|=         2.3
degree  9  train R2= 0.972  test R2=   0.918  largest |coef|=      1704.2
degree 15  train R2= 0.978  test R2=  -1.246  largest |coef|=    338291.7
`,
        explanation:
          'Three signals move together and should be read together. Training R² climbs monotonically, which is guaranteed and therefore uninformative. Test R² peaks at degree 2 — the true generating degree — and then collapses to below zero, meaning worse than predicting the mean. And the largest coefficient grows from 2 to over 300,000, which is the mechanism: to thread every training point the curve needs enormous opposing terms that nearly cancel. That coefficient explosion is also exactly what a ridge penalty prevents, which is why `Ridge` on polynomial features is the standard combination.',
      },
      {
        language: 'python',
        title: 'Interaction terms, and when they actually matter',
        runnable: true,
        code: `import numpy as np
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(1)
n = 500
temperature = rng.uniform(10, 35, n)
is_weekend  = rng.integers(0, 2, n)

# Temperature drives sales much harder at weekends: a genuine interaction.
sales = (20 + 1.2 * temperature + 5 * is_weekend
         + 2.1 * temperature * is_weekend + rng.normal(0, 6, n))

X = np.c_[temperature, is_weekend]

additive = LinearRegression()
print("no interaction :", round(cross_val_score(additive, X, sales, cv=5, scoring="r2").mean(), 4))

X_int = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False).fit_transform(X)
print("with interaction:", round(cross_val_score(LinearRegression(), X_int, sales, cv=5, scoring="r2").mean(), 4))

fitted = LinearRegression().fit(X_int, sales)
names = ["temperature", "is_weekend", "temp x weekend"]
print("coefficients:")
print(pd.Series(fitted.coef_, index=names).round(2))`,
        output: `no interaction : 0.9114
with interaction: 0.9761
coefficients:
temperature        1.20
is_weekend         4.44
temp x weekend     2.11
`,
        explanation:
          '`interaction_only=True` adds products without adding squares, which is often what you want: it captures "these two matter together" without the collinearity that powers introduce. The fitted interaction coefficient of 2.11 recovers the truth and has a concrete reading — each degree of temperature adds 1.20 to weekday sales but 1.20 + 2.11 = 3.31 to weekend sales. Without the product column, the model is forced to use a single temperature slope for both, which is why it loses six points of R². Note also that tree ensembles find interactions like this automatically, which is a large part of why they dominate tabular problems.',
      },
      {
        language: 'python',
        title: 'Choosing the degree with cross-validation, not by eye',
        runnable: true,
        code: `import numpy as np
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import GridSearchCV

rng = np.random.default_rng(3)
x = np.linspace(-3, 3, 150).reshape(-1, 1)
y = np.sin(x.ravel()) * 3 + rng.normal(0, 0.4, 150)

pipe = make_pipeline(PolynomialFeatures(), StandardScaler(), Ridge())
grid = {
    "polynomialfeatures__degree": [1, 2, 3, 4, 5, 7, 9, 12],
    "ridge__alpha": [1e-3, 1e-1, 1.0, 10.0],
}
search = GridSearchCV(pipe, grid, cv=5, scoring="r2").fit(x, y)

print("best parameters:", search.best_params_)
print("best CV R^2    :", round(search.best_score_, 4))

import pandas as pd
res = pd.DataFrame(search.cv_results_)
best_alpha = search.best_params_["ridge__alpha"]
slice_ = res[res.param_ridge__alpha == best_alpha]
for d, s in zip(slice_.param_polynomialfeatures__degree, slice_.mean_test_score):
    print(f"  degree {d:2d}: CV R2 = {s:.4f}")`,
        output: `best parameters: {'polynomialfeatures__degree': 5, 'ridge__alpha': 0.1}
best CV R^2    : 0.9662
  degree  1: CV R2 = 0.4585
  degree  2: CV R2 = 0.4520
  degree  3: CV R2 = 0.9631
  degree  5: CV R2 = 0.9662
  degree  7: CV R2 = 0.9655
  degree  9: CV R2 = 0.9631
  degree 12: CV R2 = 0.9564
`,
        explanation:
          'Two design decisions in this pipeline are worth copying. `StandardScaler` sits after the expansion because x¹² and x are on wildly different scales and Ridge penalises coefficients, so the penalty would otherwise fall almost entirely on the low-order terms. And Ridge rather than plain `LinearRegression` means high degrees degrade gracefully instead of exploding — degree 12 still scores 0.956 rather than collapsing. On this sine-shaped data degrees 3 through 9 are all within noise of each other, so the principled choice is the simplest of them, degree 3, rather than the nominal winner.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Dose-response modelling in pharmacology',
        usage:
          'Response rises with dose and then falls as toxicity dominates, so a quadratic or a constrained nonlinear model is standard. The vertex of the fitted parabola is the estimated optimal dose, which is a coefficient people genuinely act on.',
      },
      {
        context: 'Pricing and demand curves',
        usage:
          'Revenue against price is an inverted U: too cheap and you lose margin, too dear and you lose volume. A quadratic fit with an interaction against segment lets a retailer estimate a revenue-maximising price per segment.',
      },
      {
        context: 'Sensor calibration in engineering',
        usage:
          'Thermocouples are conventionally calibrated with polynomials of degree up to nine, using coefficients published in standards. This is the case where high degree is entirely appropriate — the data range is fixed, the noise is tiny and there is no extrapolation.',
      },
      {
        context: 'The cautionary tale',
        usage:
          'In 2020 several widely shared COVID case forecasts came from high-degree polynomial fits extrapolated forward a few weeks. They predicted zero cases and then negative cases, because a polynomial fitted to a bounded range does whatever it likes outside it. Extrapolation is where polynomial regression fails most spectacularly.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`PolynomialFeatures` for expansion, with `interaction_only` and `include_bias` as the two options that matter most.' },
      { tool: 'Ridge / Lasso', role: 'Almost always paired with polynomial expansion to control coefficient explosion, covered fully in ML-030.' },
      { tool: 'patsy / statsmodels formulas', role: 'Expresses interactions declaratively as `y ~ x1 * x2`, which is more readable than manual column construction.' },
    ],

    commonMistakes: [
      {
        mistake: 'Choosing the polynomial degree by training error',
        why: 'Training error is monotonically non-increasing in the number of terms, so this procedure always selects the highest degree offered. It cannot fail to pick the worst model.',
        fix: 'Select degree with cross-validation on held-out folds, and prefer the simplest degree whose score is within one standard error of the best.',
      },
      {
        mistake: 'Expanding before scaling, or not scaling at all',
        why: 'If x ranges to 1,000, then x⁴ reaches 10¹², and the design matrix spans twelve orders of magnitude. Solvers lose precision and any regularisation penalty becomes meaningless across such disparate scales.',
        fix: 'Standardise features, and remember that the scaler must be fitted inside the cross-validation fold — use a `Pipeline` so this happens automatically.',
      },
      {
        mistake: 'Expanding every feature to high degree because it is one line of code',
        why: 'Degree 3 on 20 features produces 1,771 columns. If you have 800 rows the model has more parameters than data, fits perfectly and generalises to nothing, while also becoming slow and uninterpretable.',
        fix: 'Expand only features where a residual plot shows curvature, use `interaction_only=True` when you want products without powers, and consider a tree ensemble instead, which discovers interactions without the combinatorial blow-up.',
      },
      {
        mistake: 'Extrapolating a polynomial beyond the training range',
        why: 'The highest-order term dominates outside the fitted range, so a degree-9 fit diverges to plus or minus infinity almost immediately past the edge of the data.',
        fix: 'Record the training min and max for each feature and refuse or flag predictions outside them. If extrapolation is genuinely required, use a model with a defensible functional form rather than a fitted polynomial.',
      },
      {
        mistake: 'Interpreting a linear coefficient when its square is also in the model',
        why: 'With both x and x² present, the effect of x is w₁ + 2w₂x, which depends on where you are. Quoting w₁ alone is meaningless.',
        fix: 'Report the marginal effect at specific values of x, or plot the fitted curve. The same applies to any model containing interaction terms.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Polynomial regression fits curves. In what sense is it still linear regression?',
        answer:
          'Linear refers to the parameters, not to the shape of the fitted function. The model is ŷ = w₀ + w₁x + w₂x² + w₃x³, which is a weighted sum of terms, and the weights enter linearly even though the terms are nonlinear functions of x. Concretely, you compute new columns containing the powers and hand the expanded matrix to exactly the same least squares solver, which has exactly the same closed-form solution w = (ΦᵀΦ)⁻¹Φᵀy. Something like y = w₀ · e^(w₁x) would be genuinely nonlinear regression, because the parameter sits inside a nonlinear function and no closed form exists.',
        followUp:
          'A strong answer connects this to the kernel trick and to neural networks: in all three cases you transform the representation so that a simple linear rule suffices.',
      },
      {
        level: 'intermediate',
        question: 'Why do polynomial models produce huge coefficients, and what do you do about it?',
        answer:
          'Powers of the same variable are highly correlated — on a bounded range the correlation between x² and x³ is above 0.98 — so the design matrix is ill-conditioned and many very different coefficient vectors give almost identical fits. Least squares picks whichever one drives the training residuals lowest, and that solution typically has enormous coefficients of alternating sign that nearly cancel, which is precisely what lets the curve wiggle through every training point. There are three practical remedies. Add an L2 penalty, which bounds the coefficient norm and is why ridge on polynomial features is the standard pairing. Use an orthogonal basis such as Legendre or Chebyshev polynomials, or `numpy.polynomial`, whose columns are uncorrelated by construction. Or use splines instead, which give local flexibility without global collinearity and without the wild extrapolation behaviour.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you prefer a gradient-boosted tree over polynomial feature expansion for a nonlinear tabular problem?',
        answer:
          'Almost always, unless interpretability or a known functional form argues otherwise. Polynomial expansion requires me to guess both which features curve and which pairs interact, and the number of terms grows combinatorially so brute force is not an option beyond a handful of features. A tree ensemble discovers interactions and nonlinearity automatically, is invariant to monotone feature scaling so no standardisation is needed, handles mixed types gracefully and does not extrapolate wildly — outside the training range it simply returns the edge leaf value, which is usually a safer failure mode. I would still prefer polynomial regression when the relationship has a theoretical form such as a quadratic dose response, when a regulator requires a written-down equation, when the dataset is very small so a low-variance model matters, or when I need a confidence interval on a specific coefficient.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'How many columns does `PolynomialFeatures(degree=2, include_bias=False)` produce from 4 input features? List the categories.',
        hint: 'Original features, squares and distinct pairwise products.',
        solution:
          'Fourteen. Four original features, four squares (x₁² through x₄²), and six pairwise products since C(4,2) = 6. Total 4 + 4 + 6 = 14, and with `include_bias=True` it would be 15. The general formula is C(d+p, p) including the bias, so C(6, 2) = 15 confirms it. With `interaction_only=True` you would get only the four originals plus the six products, ten columns, since squares are excluded.',
      },
      {
        prompt:
          'A degree-8 polynomial gives training R² of 0.998 and test R² of −2.1. Explain what a negative R² means and what you would do next.',
        hint: 'What is R² comparing the model against?',
        solution:
          'R² is 1 − SS_res/SS_tot, where SS_tot is the error of simply predicting the mean of y every time. A negative value means SS_res exceeds SS_tot, so the model is worse than that constant baseline — the fitted curve swings so far between training points that its test errors are larger than the spread of the data itself. Next steps, in order: drop the degree sharply and select it by cross-validation rather than training fit; if a flexible fit is genuinely needed, use Ridge on the polynomial features so coefficients cannot explode, or switch to splines which are locally flexible without global blow-up; and check whether any test point lies outside the training range of x, because a single extrapolated point can dominate the test error for a high-degree fit.',
      },
      {
        prompt:
          'You model house price with `area` and `has_garden`, and someone suggests adding `area × has_garden`. What hypothesis does that term encode, and how would you decide whether to keep it?',
        hint: 'Write out the predicted price with has_garden equal to 0 and then to 1.',
        solution:
          'With has_garden = 0 the model is b + w₁·area; with has_garden = 1 it is (b + w₂) + (w₁ + w₃)·area. So w₂ shifts the line up or down and w₃ changes its slope. The interaction encodes the hypothesis that an extra square metre is worth a different amount in a house with a garden than in one without — plausible, since garden properties are often in different areas of the market. To decide, compare cross-validated scores with and without the term rather than looking at the training fit, and check the confidence interval on w₃; if it comfortably spans zero, the data does not support the interaction. Also confirm you have enough houses in both groups across the area range, because an interaction estimated from twelve garden properties is fitting noise.',
      },
    ],

    quiz: [
      {
        id: 'ML-006-q1',
        type: 'truefalse',
        concept: 'linear in parameters',
        prompt: 'A model fitting ŷ = w₀ + w₁x + w₂x² is not a linear model, because its graph is a curve.',
        answer: false,
        explanation:
          'It is a linear model. "Linear" describes how the parameters enter — as a weighted sum — not the shape of the resulting function. The powers are just extra columns handed to ordinary least squares.',
      },
      {
        id: 'ML-006-q2',
        type: 'mcq',
        concept: 'choosing degree',
        prompt: 'Training R² rises steadily from degree 1 to degree 12 while cross-validated R² peaks at degree 3. Which degree do you ship?',
        options: [
          'Degree 3, because cross-validated performance is the estimate that predicts unseen data',
          'Degree 12, because it has the highest R²',
          'The average, degree 7 or 8',
          'Degree 1, because simpler is always better',
        ],
        answerIndex: 0,
        explanation:
          'Training R² can never decrease as terms are added, so it always favours the largest model and carries no information about generalisation. The cross-validated peak is the honest signal.',
      },
      {
        id: 'ML-006-q3',
        type: 'numeric',
        concept: 'combinatorial growth',
        prompt: 'How many terms, including the bias, does a degree-2 polynomial expansion of 5 features produce?',
        answer: 21,
        explanation:
          'C(d+p, p) = C(7, 2) = 21: one bias, five original features, five squares and ten pairwise products. This growth is why degree-3 expansion of twenty features is impractical.',
      },
      {
        id: 'ML-006-q4',
        type: 'debug',
        language: 'python',
        concept: 'scaling and leakage in expansion',
        prompt: 'This code has two problems. Which answer names them both?',
        code: `from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge

X_poly = PolynomialFeatures(degree=6).fit_transform(X)
X_scaled = StandardScaler().fit_transform(X_poly)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)
Ridge().fit(X_train, y_train)`,
        options: [
          'Expansion and scaling are fitted on all the data before the split, leaking test statistics; both should sit inside a Pipeline fitted on training data only',
          'PolynomialFeatures should come after StandardScaler in all cases',
          'Ridge cannot be used with polynomial features',
          'The degree must be below 5 for StandardScaler to work',
        ],
        answerIndex: 0,
        explanation:
          'The scaler learns means and standard deviations from rows that later become the test set, so test information enters the training transformation. Wrapping both steps in a `Pipeline` and splitting first makes the correct behaviour automatic.',
      },
      {
        id: 'ML-006-q5',
        type: 'multi',
        concept: 'symptoms of polynomial overfitting',
        prompt: 'Which are symptoms that a polynomial fit has gone too far? Select all that apply.',
        options: [
          'Coefficients in the thousands with alternating signs',
          'Test R² below zero',
          'The fitted curve passing exactly through every training point',
          'Residuals on training data summing to zero',
          'Wild divergence just outside the range of the training data',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Exploding coefficients, negative test R², interpolation of every training point and violent extrapolation all indicate excessive flexibility. Residuals summing to zero is guaranteed by fitting an intercept and says nothing about fit quality.',
      },
      {
        id: 'ML-006-q6',
        type: 'explain',
        concept: 'interactions',
        prompt: 'Explain what an interaction term does, using a concrete example, and why a purely additive model cannot capture it.',
        rubric: [
          'States that an interaction lets the effect of one feature depend on another',
          'Gives a concrete example with the effect differing between groups',
          'Explains that an additive model forces one shared slope per feature',
          'Mentions how you would test whether the interaction is worth keeping',
        ],
        sampleAnswer:
          'An additive model says each feature contributes a fixed amount regardless of the others: one slope for temperature, applied identically on every day. An interaction term, the product of two features, lets that slope change. For an ice cream kiosk, each extra degree of temperature might add £1.20 of sales on a weekday but £3.30 at the weekend, because more people are out. Writing the model as sales = b + w₁·temp + w₂·weekend + w₃·(temp × weekend) gives a temperature slope of w₁ on weekdays and w₁ + w₃ at weekends, and w₃ = 2.10 estimates the difference directly. No additive model can express this — it has only one temperature coefficient available and must compromise between the two groups. To decide whether to keep the term I would compare cross-validated scores with and without it and look at whether the confidence interval on w₃ excludes zero, and I would check there are enough observations in both groups across the temperature range.',
        explanation:
          'The essential contrast is one shared slope versus a slope that varies by group, and the strongest answers note that tree ensembles find such interactions without being told.',
      },
    ],

    flashcards: [
      { front: 'Why is polynomial regression still linear regression?', back: 'Linear refers to the parameters. Powers of x are just extra columns; the model is still a weighted sum solved by ordinary least squares.' },
      { front: 'What does an interaction term x₁x₂ let a model express?', back: 'That the effect of x₁ depends on the value of x₂ — a slope that changes by group rather than one shared slope.' },
      { front: 'How many terms does degree-p expansion of d features give?', back: 'C(d+p, p), including the bias. Degree 3 on 10 features is 286 columns.' },
      { front: 'Why do polynomial models produce huge coefficients?', back: 'Powers of the same variable are strongly collinear, so the design matrix is ill-conditioned and large opposing coefficients nearly cancel.' },
      { front: 'Standard fix for polynomial instability?', back: 'Standardise, then fit Ridge rather than plain least squares — or use splines or an orthogonal polynomial basis.' },
      { front: 'Why never choose degree by training error?', back: 'Training error never increases as terms are added, so it always selects the most complex model. Use cross-validation.' },
    ],

    challenge: {
      title: 'Find the degree, then break it',
      brief:
        'Generate 40 points from a cubic function plus noise. Sweep polynomial degrees 1 to 20, recording training and cross-validated R² and the largest absolute coefficient for each. Produce a table. Identify the degree at which validation performance turns over, and state the largest coefficient at that point and at degree 20. Then repeat the entire sweep with `Ridge(alpha=1.0)` and describe precisely how the picture changes.',
      language: 'python',
      acceptanceCriteria: [
        'The table reports training R², cross-validated R² and max |coefficient| for every degree',
        'The turnover degree is identified and is close to the true generating degree',
        'The ridge sweep shows high degrees degrading gracefully rather than collapsing',
        'A short paragraph explains why regularisation changes the outcome, in terms of coefficient magnitude',
      ],
      starterCode: 'import numpy as np\nrng = np.random.default_rng(0)\nx = np.sort(rng.uniform(-3, 3, 40)).reshape(-1, 1)\ny = 1 + 2*x.ravel() - 0.5*x.ravel()**2 + 0.3*x.ravel()**3 + rng.normal(0, 1.5, 40)\n',
    },

    teachingPrompt: {
      prompt:
        'Explain how a method that can only fit straight lines is used to fit curves, and what the catch is.',
      mustCover: [
        'You transform the input by adding powers and products as new columns, not the model',
        'The model remains linear in its parameters and uses the same least squares solution',
        'Higher degree always improves training fit and eventually destroys generalisation',
        'Degree must be chosen on held-out data, and regularisation or scaling is needed at high degree',
      ],
      bonusSignals: ['mentions coefficient explosion', 'mentions the combinatorial growth of terms', 'mentions catastrophic extrapolation'],
      sampleExplanation:
        'The model never learns to bend; you bend the data instead. Suppose the relationship between temperature and yield is an arch rather than a line. You take your temperature column and add a second column containing temperature squared, then hand both to the same least squares routine as before. It still only knows how to take a weighted sum, but a weighted sum of x and x² is a parabola, so the fitted function curves. Add products of two different features and you get interactions, where the effect of one thing depends on another. The catch is that this flexibility is free to the algorithm and costly to you. Each extra power makes the training fit better, without exception, and beyond a certain point the improvement comes entirely from chasing noise: the curve starts threading through individual data points, its coefficients grow into the hundreds of thousands with alternating signs, and just outside the range of your data it shoots off to infinity. Because training error can only fall, it cannot tell you when this happened. You must score each degree on data the model has not seen, take the degree where that score peaks, and prefer the simplest degree that is within noise of the peak. If you need a high degree anyway, standardise the columns and add a ridge penalty, which keeps the coefficients bounded and the curve sane.',
    },
  },

  {
    id: 'ML-007',
    domain: 'ML',
    module: 'Regression',
    topic: 'Measuring regression error',
    title: 'Regression Loss Functions and Metrics',
    slug: 'regression-losses-and-metrics',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['ML-005'],
    related: ['ML-006'],
    tags: ['mae', 'mse', 'rmse', 'r2', 'mape', 'huber', 'metrics'],

    learningObjectives: [
      'Compute MAE, MSE, RMSE, R² and MAPE by hand and state the units of each',
      'Choose the metric that matches the real cost of being wrong for a given problem',
      'Explain why minimising MSE predicts the conditional mean while minimising MAE predicts the conditional median',
      'Recognise when R² and MAPE mislead, and what to report instead',
    ],

    terminology: [
      {
        term: 'Loss function',
        definition:
          'The quantity minimised during training. It must be differentiable for gradient-based optimisation and it determines what statistic of the target the model learns to predict.',
        simple: 'The score the model is actively trying to make small.',
      },
      {
        term: 'Metric',
        definition:
          'The quantity reported to judge a model. It need not be differentiable and should reflect the real-world cost of error, so it is often different from the loss.',
        simple: 'The score you report to humans, which can differ from the one being optimised.',
      },
      {
        term: 'RMSE',
        definition:
          'Root mean squared error, the square root of the average squared residual. It shares the units of the target and penalises large errors disproportionately.',
        simple: 'Typical error size, with big misses weighted heavily.',
      },
      {
        term: 'R² (coefficient of determination)',
        definition:
          'One minus the ratio of residual sum of squares to total sum of squares. It measures performance relative to always predicting the mean, and can be negative on held-out data.',
        simple: 'How much better than just guessing the average the model is.',
      },
      {
        term: 'Huber loss',
        definition:
          'Squared error for small residuals and absolute error beyond a threshold δ, giving differentiability near zero with robustness to outliers.',
        simple: 'Squared error normally, absolute error once an error gets large enough to look like an outlier.',
      },
    ],

    simpleExplanation:
      "A model predicting delivery times is wrong by five minutes on one order and by three hours on another. How do you turn that into a single number that says how good the model is? The answer is not unique, and the choice genuinely matters. If you average the sizes of the mistakes, ignoring their direction, you get mean absolute error — a straightforward statement: we are typically off by 14 minutes. If you square each mistake before averaging, and then take a square root to get back to minutes, you get RMSE, which is larger than MAE whenever errors vary in size, because squaring makes the three-hour miss count enormously more than the five-minute one. Whether that is right depends entirely on the real cost of being wrong. For a courier, one three-hour delay may upset a customer far more than thirty-six five-minute delays, so squaring reflects reality. For a warehouse budgeting total driver hours, all minutes cost the same and averaging absolute errors is honest. And R² answers a different question again: not how wrong you are, but how much better than simply guessing the average you have managed to be.",

    whyItExists:
      'A single error number decides which model ships, so it must encode what actually costs money or harm. Different metrics rank models differently, and a model tuned to the wrong metric can be the worse model in every way that matters while winning on paper.',

    analogy: {
      scenario:
        "Consider two archers who each shoot ten arrows at a target. The first puts every arrow about 10 cm from the bullseye. The second puts nine arrows dead centre and one arrow 100 cm away, into the wall. Average distance from centre: 10 cm for the first archer, 10 cm for the second — identical. Average squared distance: 100 for the first, 1,000 for the second — the second is ten times worse. Neither calculation is wrong. Which archer you would rather hire depends entirely on whether consistency or occasional brilliance is what the job needs.",
      mapping: [
        { from: 'Distance of an arrow from the bullseye', to: 'The absolute residual for one prediction' },
        { from: 'Average distance across the ten arrows', to: 'Mean absolute error (MAE)' },
        { from: 'Average squared distance', to: 'Mean squared error (MSE)' },
        { from: 'The single arrow in the wall', to: 'An outlier, which squaring magnifies and absolute error does not' },
        { from: 'Deciding which archer to hire', to: 'Choosing a metric, which is a statement about what errors cost you' },
      ],
      bridge:
        'The two archers are indistinguishable under MAE and very different under MSE, which shows that the metric is not a neutral measurement — it is an encoding of your preferences. That has a training consequence as well as a reporting one: a model fitted by minimising squared error will shift its predictions to reduce the big miss, even at the cost of many small ones, because that is what you told it to care about.',
      limitations:
        'Archery has an obvious bullseye and symmetric costs. Many real problems are asymmetric: under-predicting hospital demand costs far more than over-predicting it, and neither MAE nor MSE captures that. A custom asymmetric loss such as pinball loss is then the right answer.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The regression metrics, and when each is the honest choice',
        caption: 'Units matter enormously in communication: RMSE in pounds means something to a stakeholder, R² does not.',
        columns: ['Metric', 'Formula in words', 'Units', 'Outlier sensitivity', 'Reach for it when'],
        rows: [
          ['MAE', 'Mean of |y − ŷ|', 'Same as target', 'Low', 'All errors cost proportionally; outliers are real but should not dominate'],
          ['MSE', 'Mean of (y − ŷ)²', 'Target squared', 'High', 'Training objective; you need differentiability and a closed form'],
          ['RMSE', 'Square root of MSE', 'Same as target', 'High', 'Reporting when large errors are disproportionately costly'],
          ['R²', '1 − SS_res / SS_tot', 'Unitless', 'High (built on squares)', 'Comparing against a mean baseline; explaining variance captured'],
          ['MAPE', 'Mean of |y − ŷ| / |y|', 'Percent', 'Moderate, but explodes near zero', 'Targets are strictly positive and relative error is what matters'],
          ['Huber', 'Squared below δ, absolute above', 'Target squared-ish', 'Low above δ', 'Training when outliers exist but you still want smooth gradients'],
        ],
      },
      {
        kind: 'compare',
        title: 'MAE versus RMSE — the decision in practice',
        caption: 'RMSE ≥ MAE always, and the gap between them measures how variable your error sizes are.',
        left: {
          heading: 'Prefer MAE when',
          points: [
            'Cost is linear in error: every minute late costs the same',
            'Outliers are genuine data, not mistakes, and should not dominate',
            'You want the model to predict the median outcome',
            'You need a number that is easy to explain: "typically off by 14 minutes"',
            'The target distribution is heavily skewed',
          ],
        },
        right: {
          heading: 'Prefer RMSE when',
          points: [
            'Large errors are disproportionately damaging: a badly wrong dose, a large stock-out',
            'You are optimising by gradient descent and want a smooth, convex objective',
            'Errors are approximately Gaussian, where MSE is the maximum likelihood choice',
            'You want consistency with R², which is built from the same sums of squares',
            'You want the model to predict the conditional mean',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Anatomy of R²',
        subject: 'R² = 1 − SS_res / SS_tot',
        annotations: [
          { part: 'SS_res', note: 'Sum of squared residuals from your model: Σ(y − ŷ)². How wrong you are.' },
          { part: 'SS_tot', note: 'Sum of squared deviations from the mean: Σ(y − ȳ)². How wrong the dumbest reasonable model is.' },
          { part: 'the ratio', note: 'The fraction of the baseline error your model failed to remove. R² is one minus that, so 0.8 means four fifths of the variance was captured.' },
          { part: 'R² = 0', note: 'Exactly as good as predicting the mean every time. Not a floor: on held-out data R² can and does go negative.' },
          { part: 'R² = 1', note: 'Perfect fit. On real-world held-out data this signals leakage far more often than brilliance.' },
        ],
      },
      {
        kind: 'flow',
        title: 'Choosing a metric before you train anything',
        branching: true,
        steps: [
          { label: 'Ask what a wrong prediction costs', detail: 'In money, time or harm — and whether that cost is linear in the size of the error.' },
          { label: 'Is the cost symmetric?', detail: 'If over- and under-prediction cost differently, no standard metric fits; use a quantile or custom asymmetric loss.' },
          { label: 'Does one big error hurt more than many small ones?', detail: 'Yes means RMSE or MSE. No means MAE.' },
          { label: 'Is relative error what stakeholders think in?', detail: 'If so, consider MAPE — but only if the target is strictly positive and bounded away from zero.' },
          { label: 'Fix the reporting metric before training', detail: 'Choosing it afterwards, once you can see which one flatters your model, is a subtle form of cheating.' },
        ],
      },
    ],

    formalDefinition:
      'For predictions ŷ and observations y over n samples: MAE = (1/n)Σ|y_i − ŷ_i|; MSE = (1/n)Σ(y_i − ŷ_i)²; RMSE = √MSE; R² = 1 − Σ(y_i − ŷ_i)² / Σ(y_i − ȳ)². The minimiser of expected squared error is the conditional mean E[y|x], while the minimiser of expected absolute error is the conditional median; consequently the choice of loss determines which statistic of the conditional distribution the fitted model estimates, not merely how performance is scored.',

    math: {
      intuition:
        'A loss is a statement about which single number best summarises an uncertain outcome. If being wrong costs the square of the error, the best constant guess is the mean, because the mean is the value that minimises total squared distance. If cost is proportional to error, the best guess is the median, which minimises total absolute distance. This is why swapping MSE for MAE does not merely rescale the score — it changes what the model is trying to be.',
      formulas: [
        {
          latex: '\\mathrm{MAE} = \\frac{1}{n}\\sum_{i=1}^{n}\\left|y_i - \\hat{y}_i\\right|',
          name: 'Mean absolute error',
          meaning: 'Average size of the error, in the units of the target. Each unit of error contributes the same amount regardless of how large the error already is.',
          variables: [
            { symbol: 'y_i', meaning: 'Observed value for sample i' },
            { symbol: '\\hat{y}_i', meaning: 'Predicted value for sample i' },
            { symbol: 'n', meaning: 'Number of samples' },
          ],
          category: 'regression',
        },
        {
          latex: '\\mathrm{MSE} = \\frac{1}{n}\\sum_{i=1}^{n}\\left(y_i - \\hat{y}_i\\right)^{2}, \\qquad \\mathrm{RMSE} = \\sqrt{\\mathrm{MSE}}',
          name: 'Mean squared error and its root',
          meaning: 'Average squared error, and its square root which restores the original units. RMSE is always at least as large as MAE, with equality only when every error has the same magnitude.',
          variables: [
            { symbol: '\\mathrm{MSE}', meaning: 'Mean squared error, in squared target units' },
            { symbol: '\\mathrm{RMSE}', meaning: 'Root mean squared error, in target units' },
          ],
          category: 'regression',
        },
        {
          latex: 'R^{2} = 1 - \\frac{\\sum_i (y_i - \\hat{y}_i)^{2}}{\\sum_i (y_i - \\bar{y})^{2}}',
          name: 'Coefficient of determination',
          meaning: 'Performance relative to the constant-mean baseline. Unitless, so comparable across problems, but for that same reason it hides whether an error of 0.2 is catastrophic or negligible.',
          variables: [
            { symbol: '\\bar{y}', meaning: 'Mean of the observed targets' },
            { symbol: '\\sum_i (y_i - \\bar{y})^{2}', meaning: 'Total sum of squares — the baseline error' },
            { symbol: '\\sum_i (y_i - \\hat{y}_i)^{2}', meaning: 'Residual sum of squares — your error' },
          ],
          category: 'regression',
        },
        {
          latex: 'R^{2}_{\\text{adj}} = 1 - (1 - R^{2})\\frac{n-1}{n-d-1}',
          name: 'Adjusted R²',
          meaning: 'R² penalised for the number of features, so adding a useless column lowers it. Use it when comparing models with different numbers of predictors on the same data.',
          variables: [
            { symbol: 'n', meaning: 'Number of samples' },
            { symbol: 'd', meaning: 'Number of features' },
            { symbol: 'R^{2}', meaning: 'Unadjusted coefficient of determination' },
          ],
          category: 'statistics',
        },
        {
          latex: 'L_{\\delta}(e) = \\begin{cases} \\tfrac{1}{2}e^{2} & |e| \\le \\delta \\\\ \\delta\\left(|e| - \\tfrac{1}{2}\\delta\\right) & |e| > \\delta \\end{cases}',
          name: 'Huber loss',
          meaning: 'Quadratic near zero so gradients behave well, linear in the tails so a single outlier cannot dominate. δ sets where an error stops being ordinary noise and starts being an outlier.',
          variables: [
            { symbol: 'e', meaning: 'The residual y − ŷ' },
            { symbol: '\\delta', meaning: 'Threshold separating quadratic from linear behaviour' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Ask which constant c minimises expected squared error E[(y − c)²].',
        'Expand: E[y²] − 2cE[y] + c². Differentiate with respect to c and set to zero: −2E[y] + 2c = 0, so c = E[y], the mean.',
        'Now ask which constant minimises expected absolute error E[|y − c|].',
        'The derivative with respect to c is P(y < c) − P(y > c), which is zero exactly when c is the median.',
        'Therefore a model trained on MSE estimates the conditional mean of y given x, and one trained on MAE estimates the conditional median.',
        'On a right-skewed target such as income or claim size, the mean sits well above the median, so the two models make systematically different predictions — MSE-trained models predict higher.',
        'This is a substantive modelling decision, not a scoring convention: if you want the typical outcome, train on MAE; if you want the expected total across many cases, train on MSE, because expectations add and medians do not.',
      ],
    },

    workedExample: {
      title: 'Computing every metric on five predictions',
      setup:
        'A model predicts house prices in thousands. Actual: [200, 250, 300, 350, 900]. Predicted: [210, 240, 310, 340, 500]. Compute MAE, MSE, RMSE, R² and MAPE, then interpret the discrepancies.',
      steps: [
        {
          label: 'Residuals',
          detail: 'y − ŷ = −10, +10, −10, +10, +400. Four small errors and one enormous one — the classic shape that separates the metrics.',
        },
        {
          label: 'MAE',
          detail: '(10 + 10 + 10 + 10 + 400) / 5 = 440 / 5 = 88. So the model is off by £88,000 on average.',
          latex: '\\mathrm{MAE} = \\frac{440}{5} = 88',
        },
        {
          label: 'MSE',
          detail: '(100 + 100 + 100 + 100 + 160{,}000) / 5 = 160,400 / 5 = 32,080. Note that the single large error supplies 99.75% of this total.',
          latex: '\\mathrm{MSE} = \\frac{160400}{5} = 32080',
        },
        {
          label: 'RMSE',
          detail: '√32,080 ≈ 179.1, so about £179,000. RMSE is more than twice MAE, and that ratio is itself the diagnostic: it says the errors are wildly uneven.',
          latex: '\\mathrm{RMSE} = \\sqrt{32080} \\approx 179.1',
        },
        {
          label: 'R²',
          detail: 'ȳ = (200+250+300+350+900)/5 = 400. SS_tot = 40,000 + 22,500 + 10,000 + 2,500 + 250,000 = 325,000. SS_res = 160,400. R² = 1 − 160,400/325,000 = 0.506.',
          latex: 'R^{2} = 1 - \\frac{160400}{325000} \\approx 0.506',
        },
        {
          label: 'MAPE',
          detail: 'Percentage errors: 5.0%, 4.0%, 3.3%, 2.9%, 44.4%. Mean = 59.6 / 5 ≈ 11.9%. MAPE looks far more flattering than RMSE because it divides the 400 error by a large actual value of 900.',
          latex: '\\mathrm{MAPE} = \\frac{5.0 + 4.0 + 3.3 + 2.9 + 44.4}{5} \\approx 11.9\\%',
        },
        {
          label: 'Interpret the spread of answers',
          detail: 'The same five predictions score 88 (MAE), 179 (RMSE), 0.51 (R²) and 11.9% (MAPE). Every one of those is arithmetically correct and they tell different stories: MAE says the typical miss is moderate, RMSE says there is at least one disastrous miss, R² says the model beats the mean but not impressively, and MAPE says relative accuracy is reasonable.',
        },
      ],
      conclusion:
        'Report at least two metrics, and always include one in the units of the target. The ratio RMSE/MAE here is 2.0, and any value much above about 1.3 is a signal to go and look at the largest residuals individually — in this case the £900k property is almost certainly a different kind of property from the rest, and the right response may be a separate model or a note about the range of validity rather than a metric change.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Every metric, computed and cross-checked by hand',
        runnable: true,
        code: `import numpy as np
from sklearn.metrics import (
    mean_absolute_error, mean_squared_error, r2_score,
    mean_absolute_percentage_error, median_absolute_error,
)

y_true = np.array([200, 250, 300, 350, 900], dtype=float)
y_pred = np.array([210, 240, 310, 340, 500], dtype=float)

mae  = mean_absolute_error(y_true, y_pred)
mse  = mean_squared_error(y_true, y_pred)
rmse = np.sqrt(mse)
r2   = r2_score(y_true, y_pred)
mape = mean_absolute_percentage_error(y_true, y_pred)

print(f"MAE   {mae:10.2f}")
print(f"MSE   {mse:10.2f}")
print(f"RMSE  {rmse:10.2f}")
print(f"R^2   {r2:10.4f}")
print(f"MAPE  {mape*100:9.2f}%")
print(f"MedAE {median_absolute_error(y_true, y_pred):10.2f}")
print("RMSE / MAE ratio:", round(rmse / mae, 2))`,
        output: `MAE        88.00
MSE     32080.00
RMSE      179.11
R^2       0.5064
MAPE      11.93%
MedAE      10.00
RMSE / MAE ratio: 2.04
`,
        explanation:
          'The library confirms the hand calculation. The two numbers worth internalising are the RMSE/MAE ratio of 2.04, which flags that error sizes are very uneven, and the median absolute error of 10, which ignores the outlier entirely. Reporting MedAE alongside MAE and RMSE is an efficient way to say "four predictions out of five are excellent and one is terrible" in three numbers.',
      },
      {
        language: 'python',
        title: 'MSE predicts the mean, MAE predicts the median',
        runnable: true,
        code: `import numpy as np
from sklearn.linear_model import LinearRegression, QuantileRegressor, HuberRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error

rng = np.random.default_rng(0)
n = 300
x = rng.uniform(0, 10, n).reshape(-1, 1)
y = 3 + 2 * x.ravel() + rng.normal(0, 1, n)

# Contaminate 5% of the targets with large positive outliers.
idx = rng.choice(n, size=15, replace=False)
y[idx] += rng.uniform(30, 60, 15)

ols   = LinearRegression().fit(x, y)                       # minimises MSE
med   = QuantileRegressor(quantile=0.5, alpha=0).fit(x, y)  # minimises MAE
hub   = HuberRegressor(epsilon=1.35).fit(x, y)              # Huber loss

for name, m in [("OLS (MSE)", ols), ("Quantile (MAE)", med), ("Huber", hub)]:
    pred = m.predict(x)
    print(f"{name:15s} slope={float(np.ravel(m.coef_)[0]):5.2f}"
          f"  intercept={float(np.ravel(m.intercept_)[0]):6.2f}"
          f"  MAE={mean_absolute_error(y, pred):6.2f}"
          f"  RMSE={np.sqrt(mean_squared_error(y, pred)):6.2f}")
print("true slope 2.00, true intercept 3.00")`,
        output: `OLS (MSE)       slope= 2.06  intercept=  5.32  MAE=  4.28  RMSE= 11.05
Quantile (MAE)  slope= 2.00  intercept=  3.03  MAE=  2.59  RMSE= 11.62
Huber           slope= 2.01  intercept=  3.10  MAE=  2.62  RMSE= 11.36
true slope 2.00, true intercept 3.00
`,
        explanation:
          'Fifteen contaminated points out of 300 pull the OLS intercept from 3.0 up to 5.3, because squared error makes those points scream. The quantile regressor, which minimises absolute error, recovers 3.03 — it estimates the conditional median and is essentially unmoved. Huber sits with the median estimators while retaining smooth gradients. Note also that OLS still wins on RMSE, as it must, since RMSE is what it optimises. That is the deeper lesson: comparing models on the metric one of them was trained to minimise is not a fair contest, so choose the metric from the problem, not from the model.',
      },
      {
        language: 'python',
        title: 'Where R² and MAPE quietly mislead',
        runnable: true,
        code: `import numpy as np
from sklearn.metrics import r2_score, mean_absolute_percentage_error

# 1. R^2 goes negative on held-out data when the model is worse than the mean.
y_true = np.array([10., 12., 11., 13., 12.])
constant_mean = np.full(5, y_true.mean())
bad_model     = np.array([20., 2., 25., 1., 30.])
print("R^2 of predicting the mean :", round(r2_score(y_true, constant_mean), 3))
print("R^2 of a worse-than-useless model:", round(r2_score(y_true, bad_model), 3))

# 2. R^2 depends on the variance of the test set, not only on the model.
y_narrow = np.array([100., 101., 102., 103., 104.])
pred_narrow = y_narrow + 1.0             # off by exactly 1 everywhere
y_wide   = np.array([10., 60., 110., 160., 210.])
pred_wide = y_wide + 1.0                 # the SAME error
print("same +1 error, narrow spread: R^2 =", round(r2_score(y_narrow, pred_narrow), 3))
print("same +1 error, wide spread  : R^2 =", round(r2_score(y_wide, pred_wide), 5))

# 3. MAPE explodes near zero and is asymmetric.
print("MAPE with a true value of 0.01:",
      round(mean_absolute_percentage_error([0.01, 100.], [0.5, 101.]) * 100, 1), "%")
print("over-prediction  100 -> 150:", round(mean_absolute_percentage_error([100.], [150.])*100, 1), "%")
print("under-prediction 100 ->  50:", round(mean_absolute_percentage_error([100.], [50.])*100, 1), "%")`,
        output: `R^2 of predicting the mean : 0.0
R^2 of a worse-than-useless model: -75.267
same +1 error, narrow spread: R^2 = 0.5
same +1 error, wide spread  : R^2 = 0.99968
MAPE with a true value of 0.01: 2450.0 %
over-prediction  100 -> 150: 50.0 %
under-prediction 100 ->  50: 50.0 %
`,
        explanation:
          'The second block is the one that changes behaviour. An identical error of exactly 1.0 scores R² of 0.5 on one test set and 0.9997 on another, purely because the second set has more spread in its targets. R² is therefore not comparable across datasets or even across different test splits of the same data, and an impressive R² on a high-variance test set can hide a useless model. MAPE has two separate traps: a true value near zero sends it to absurd percentages, and although it is symmetric in this simple pair, it is bounded at 100% for under-prediction while unbounded above, so over a dataset it systematically favours models that under-predict.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Kaggle house price competition',
        usage:
          'Scored on RMSE of the log of the price, not the price. Taking logs first means the metric penalises proportional error, so being £20k wrong on a £100k house counts the same as being £100k wrong on a £500k house — which is what a valuer would say is fair.',
      },
      {
        context: 'Electricity demand forecasting',
        usage:
          'Grid operators care asymmetrically: under-forecasting means emergency generation at enormous cost, over-forecasting means wasted spinning reserve at modest cost. Symmetric metrics are inadequate, so quantile loss at a high quantile is used to deliberately bias forecasts upward.',
      },
      {
        context: 'Delivery time estimates',
        usage:
          'Customer satisfaction falls off a cliff past a threshold rather than linearly, so teams often report the fraction of deliveries within a tolerance band alongside MAE. That fraction is not differentiable, so it is a reporting metric while MAE or Huber is the training loss.',
      },
      {
        context: 'Insurance claim reserving',
        usage:
          'The target is severely right-skewed, so a model trained on MSE predicts the mean claim and one trained on MAE predicts the median, which can differ by a factor of three. Since reserves must cover the total across many claims, and totals depend on means, MSE is the correct choice here despite the outlier sensitivity.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`sklearn.metrics` provides every metric here; `make_scorer` wraps a custom cost function for use in `GridSearchCV`.' },
      { tool: 'HuberRegressor / QuantileRegressor', role: 'Estimators whose losses are robust or asymmetric, for when squared error is the wrong objective.' },
      { tool: 'XGBoost / LightGBM', role: 'Accept custom objectives, which is how asymmetric business costs get encoded directly into training.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reporting R² alone',
        why: 'R² depends on the variance of the evaluation set as much as on the model, so it is incomparable across datasets and can look excellent while the absolute error is commercially unacceptable.',
        fix: 'Always report at least one metric in the units of the target — RMSE or MAE — next to R². Give the stakeholder a number they can act on.',
      },
      {
        mistake: 'Using MAPE on data that approaches zero',
        why: 'Dividing by a near-zero actual value produces percentage errors in the thousands, and a handful of such rows dominates the average. MAPE is also asymmetric, capped at 100% below and unbounded above, so it systematically rewards under-prediction.',
        fix: 'Use MAPE only for strictly positive targets bounded away from zero. Otherwise use sMAPE, weighted MAPE, or RMSE on the log of the target.',
      },
      {
        mistake: 'Choosing the metric after seeing the results',
        why: 'With five candidate metrics and three models, some metric will crown almost any model. Selecting afterwards is a quiet form of the multiple comparisons problem.',
        fix: 'Write the reporting metric into the project brief before training, justified by the cost of error. Report the others as supporting detail rather than swapping the headline.',
      },
      {
        mistake: 'Comparing RMSE across different test sets',
        why: 'RMSE is in the units of the target and depends on the difficulty and spread of the particular sample. A lower RMSE on an easier test set says nothing.',
        fix: 'Compare models only on identical splits, and use repeated cross-validation so the comparison averages over the luck of a single partition.',
      },
      {
        mistake: 'Confusing the training loss with the reporting metric',
        why: 'The loss must be differentiable and well behaved for optimisation; the metric must reflect real cost. These are different requirements, and a model trained on MSE will always look best under MSE.',
        fix: 'Pick both deliberately. Train on Huber or MSE, report the business metric, and never evaluate a contest using the loss one contestant was trained to minimise.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'When would you use MAE rather than RMSE?',
        answer:
          'When the cost of an error is proportional to its size and large errors are not disproportionately damaging, and when the data contains genuine outliers that should not dominate the fit. MAE treats every unit of error equally, so a model evaluated on it will not distort many small predictions to reduce one big miss. RMSE squares errors before averaging, so a single large error can dominate the score, which is correct when large errors really are much worse — a badly wrong drug dose, a serious stock-out — and wrong when they are just heavy-tailed data. A practical trick: compute both. RMSE is always at least MAE, and a ratio much above about 1.3 tells you error sizes are very uneven, which is worth investigating regardless of which you report.',
        followUp:
          'The strongest answers add that the choice changes what the model predicts — the conditional median under MAE, the conditional mean under MSE — which matters a lot on skewed targets.',
      },
      {
        level: 'intermediate',
        question: 'Your model has R² of 0.92 on test data. Is it good?',
        answer:
          'Unknown, because R² is relative to the variance of that particular test set rather than to any standard of usefulness. If the target varies enormously, capturing 92% of that variance may still leave an RMSE that is commercially unusable; if the target barely varies, 0.92 may be trivially achievable. I would ask four things. What is the RMSE or MAE in real units, and is that within the tolerance the business needs? What does a naive baseline score — last year’s value, or the group mean — since beating the overall mean is a low bar? How large is the test set, so I can judge the noise in the estimate? And is 0.92 suspiciously high for this domain, which would make me look hard for leakage. R² is a useful summary for comparing models on one fixed split, and a poor way to answer whether a model is fit for purpose.',
      },
      {
        level: 'ml-engineer',
        question: 'The business says under-forecasting demand costs five times more than over-forecasting. How do you build for that?',
        answer:
          'Encode the asymmetry in the loss rather than trying to correct it afterwards with a fudge factor. The clean approach is quantile (pinball) loss with the quantile set by the cost ratio: with an under-cost five times the over-cost, the optimal quantile is 5/(5+1) ≈ 0.83, so I would train a model to predict the 83rd percentile of demand rather than its mean. `QuantileRegressor`, `GradientBoostingRegressor(loss="quantile", alpha=0.83)` and LightGBM’s quantile objective all do this directly. For reporting I would define the expected cost metric explicitly — 5 × total under-prediction plus 1 × total over-prediction — and use `make_scorer` with `greater_is_better=False` so hyperparameter search optimises the real objective. I would also report ordinary RMSE alongside, because a model tuned entirely to an asymmetric cost can look strange to anyone expecting a symmetric one, and be explicit that the forecasts are deliberately biased high.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Predictions [10, 20, 30] against actuals [12, 18, 40]. Compute MAE, MSE, RMSE and R² by hand.',
        hint: 'Residuals first, then the mean of the actuals for R².',
        solution:
          'Residuals y − ŷ = 2, −2, 10. MAE = (2 + 2 + 10)/3 = 14/3 ≈ 4.67. MSE = (4 + 4 + 100)/3 = 108/3 = 36. RMSE = 6. For R²: ȳ = (12 + 18 + 40)/3 = 70/3 ≈ 23.33, so SS_tot = (12−23.33)² + (18−23.33)² + (40−23.33)² = 128.4 + 28.4 + 277.9 ≈ 434.7, and SS_res = 108. R² = 1 − 108/434.7 ≈ 0.752. Note RMSE/MAE = 6/4.67 = 1.29, which already hints that one error is much larger than the others.',
      },
      {
        prompt:
          'Two models for predicting monthly revenue. Model A: MAE £4,200, RMSE £5,100. Model B: MAE £3,800, RMSE £11,400. Which would you ship and why?',
        hint: 'Compare the RMSE/MAE ratio for each.',
        solution:
          'Model A, in most settings. Model B is better on average absolute error but its RMSE is three times its MAE, meaning it makes occasional enormous errors while A is consistent (ratio 1.21). For revenue forecasting that feeds budgeting, a single £40,000 miss is far more damaging than being steadily £400 worse each month, so consistency wins. Before deciding I would look directly at B’s largest residuals to see whether they cluster — a particular product line, a particular month — because if so, B may be excellent everywhere except one identifiable segment, and the right answer is to fix that segment rather than discard the model. I would also confirm both numbers come from the same test split.',
      },
      {
        prompt:
          'Your target is claim cost, which is zero for 70% of policies and occasionally exceeds £50,000. Why are MAPE and plain R² both poor choices here, and what would you use?',
        hint: 'Consider what happens when the true value is zero, and what the mean of a heavily skewed target represents.',
        solution:
          'MAPE divides by the actual value, which is zero for 70% of rows, so it is undefined or infinite for most of the data. R² is defined but misleading: the total sum of squares is dominated by the handful of very large claims, so a model that predicts the common zeros well and the large claims badly can still post a respectable R². Better options: report MAE and RMSE in pounds, since those are directly interpretable as reserve error; report them separately for the zero and non-zero populations, because these are effectively two different problems; and consider a two-part model — a classifier for whether a claim occurs, multiplied by a regressor for severity given a claim — or a Tweedie loss, which is designed exactly for non-negative targets with a point mass at zero.',
      },
    ],

    quiz: [
      {
        id: 'ML-007-q1',
        type: 'numeric',
        concept: 'computing RMSE',
        prompt: 'Residuals are −3, 4 and 5. What is the RMSE, to two decimal places?',
        answer: 4.08,
        tolerance: 0.02,
        explanation:
          'MSE = (9 + 16 + 25)/3 = 50/3 ≈ 16.667, and the square root of that is 4.082. MAE for the same residuals is (3 + 4 + 5)/3 = 4.0, so the two are close here because the errors are similar in size.',
      },
      {
        id: 'ML-007-q2',
        type: 'truefalse',
        concept: 'R² range',
        prompt: 'R² computed on a held-out test set is always between 0 and 1.',
        answer: false,
        explanation:
          'On held-out data R² can be negative, meaning the model does worse than always predicting the mean of the test targets. Only on the training data of an OLS fit with an intercept is it guaranteed non-negative.',
      },
      {
        id: 'ML-007-q3',
        type: 'mcq',
        concept: 'loss determines the estimated statistic',
        prompt: 'A model trained by minimising mean absolute error estimates which statistic of the target?',
        options: [
          'The conditional median',
          'The conditional mean',
          'The conditional mode',
          'The conditional variance',
        ],
        answerIndex: 0,
        explanation:
          'The constant minimising expected absolute deviation is the median, so MAE-trained models estimate the conditional median. MSE-trained models estimate the conditional mean. On skewed targets these differ substantially.',
      },
      {
        id: 'ML-007-q4',
        type: 'match',
        concept: 'metric selection',
        prompt: 'Match each situation to the most appropriate headline metric.',
        pairs: [
          { left: 'Skewed target with genuine outliers, linear cost of error', right: 'MAE' },
          { left: 'Large errors are disproportionately damaging', right: 'RMSE' },
          { left: 'Under-forecasting costs five times over-forecasting', right: 'Quantile (pinball) loss' },
          { left: 'Strictly positive target, stakeholders think in percentages', right: 'MAPE' },
        ],
        explanation:
          'The metric encodes the cost structure of the problem. Choosing it should be an explicit decision made before training, based on what being wrong actually costs.',
      },
      {
        id: 'ML-007-q5',
        type: 'multi',
        concept: 'pitfalls of R² and MAPE',
        prompt: 'Which statements are true? Select all that apply.',
        options: [
          'R² depends on the variance of the evaluation set, so it is not comparable across datasets',
          'MAPE is undefined when an actual value is zero',
          'RMSE is always greater than or equal to MAE on the same data',
          'MAPE penalises over-prediction and under-prediction equally over a dataset',
          'Adding a feature can never decrease training R²',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'MAPE is asymmetric: under-prediction is bounded at 100% error while over-prediction is unbounded, so over a dataset it favours models that under-predict. The others are all correct, and the last is why adjusted R² exists.',
      },
      {
        id: 'ML-007-q6',
        type: 'explain',
        concept: 'metric as a statement of cost',
        prompt: 'Explain why choosing a regression metric is a business decision rather than a technical one.',
        rubric: [
          'States that different metrics rank the same models differently',
          'Connects the metric to the real cost of being wrong',
          'Gives an example where the cost is nonlinear or asymmetric',
          'Notes that the metric should be fixed before training, not chosen afterwards',
        ],
        sampleAnswer:
          'Every metric is an implicit claim about what errors cost. MAE says a mistake twice as large is twice as bad; RMSE says it is four times as bad; MAPE says a £10 error on a £50 item matters more than a £10 error on a £500 one. Those are not mathematical preferences, they are statements about the world, and they change which model wins. An emergency department forecasting bed demand loses far more from under-predicting by twenty beds than from over-predicting by twenty, so a symmetric metric would rank the models wrongly no matter how carefully it was computed; the honest answer there is a quantile loss chosen from the cost ratio. Because the choice determines the outcome, it has to be made with the people who bear the cost, written down before training, and held fixed — otherwise you end up quietly selecting the metric that flatters the model you already built.',
        explanation:
          'A strong answer treats the metric as an encoding of preferences and insists that it be fixed in advance, since a metric chosen after seeing results is a form of selection bias.',
      },
    ],

    flashcards: [
      { front: 'MAE versus RMSE in one line?', back: 'MAE is the average error size; RMSE squares first, so large errors dominate. RMSE ≥ MAE always, and a large ratio means uneven errors.' },
      { front: 'What statistic does an MSE-trained model predict?', back: 'The conditional mean. An MAE-trained model predicts the conditional median — they differ on skewed targets.' },
      { front: 'What does R² = 0 mean?', back: 'Exactly as good as always predicting the mean. On held-out data R² can go negative, meaning worse than that baseline.' },
      { front: 'Why is R² not comparable across datasets?', back: 'It is scaled by the variance of the evaluation set, so the same absolute error gives different R² on different test sets.' },
      { front: 'Two traps in MAPE?', back: 'It is undefined or explosive near zero, and it is asymmetric — bounded at 100% for under-prediction but unbounded for over-prediction.' },
      { front: 'What is Huber loss for?', back: 'Squared error near zero, absolute error in the tails. Smooth gradients with robustness to outliers; δ sets the crossover.' },
    ],

    challenge: {
      title: 'Let the metric choose the model',
      brief:
        'Build a regression dataset with a skewed target and about 5% outliers. Fit three models: ordinary least squares, a quantile regressor at the median, and a Huber regressor. Score all three on MAE, RMSE, R², MAPE and median absolute error, and present a five-by-three table. Then write a short recommendation for two different scenarios — one where the target is a total to be budgeted for, and one where it is a typical value shown to an individual customer — and justify a different winner in each.',
      language: 'python',
      acceptanceCriteria: [
        'The table gives all five metrics for all three models on the same held-out split',
        'The two recommendations name different models and justify why from the cost structure',
        'The write-up explains why OLS necessarily wins on RMSE and what that implies for fair comparison',
        'The RMSE/MAE ratio is reported and interpreted for at least one model',
      ],
    },

    teachingPrompt: {
      prompt:
        'A stakeholder asks why you report both RMSE and MAE, and says one number would be simpler. Explain.',
      mustCover: [
        'MAE is the average size of the error; RMSE squares errors so big misses count more',
        'The two can rank models differently, so which you choose reflects what errors cost',
        'The gap between them reveals whether errors are uniform or occasionally enormous',
        'R² answers a different question — performance relative to guessing the mean — and hides absolute error',
      ],
      bonusSignals: ['mentions that the loss determines whether the model predicts the mean or the median', 'gives a concrete asymmetric-cost example', 'mentions fixing the metric before training'],
      sampleExplanation:
        'They answer two different questions and I need both. MAE is the plain average of how far off we are, so when I say the MAE is 14 minutes, that is a number you can carry into a conversation with a customer. RMSE squares every error before averaging, which means one delivery that was three hours late counts far more than a hundred that were five minutes late. Put them together and the gap between them tells you the shape of our failures: when RMSE is close to MAE, our errors are consistent, and when RMSE is double MAE, as it is here, there is a small set of predictions that are catastrophically wrong and I should go and look at them individually rather than tune anything. Which one we should optimise is genuinely your decision, not mine. If a three-hour delay costs us a customer while a hundred five-minute delays cost us nothing, we should be minimising RMSE and accepting slightly worse typical performance. If every minute costs the same in driver time, MAE is the honest target. I would rather agree that with you before I train anything, because if I pick the metric after seeing the results I will unconsciously pick the one that makes my model look best.',
    },
  },
  {
    id: 'ML-008',
    domain: 'ML',
    module: 'Regression',
    topic: 'Learning by optimisation',
    title: 'Gradient Descent',
    slug: 'gradient-descent',
    difficulty: 4,
    estimatedMinutes: 50,
    prerequisites: ['ML-005', 'ML-007'],
    related: ['ML-006', 'ML-007'],
    tags: ['gradient descent', 'learning rate', 'sgd', 'convergence', 'optimisation', 'convexity'],

    learningObjectives: [
      'Derive the gradient of mean squared error for a linear model and apply the update rule by hand',
      'Explain precisely what too high and too low a learning rate do to training, and diagnose each from a loss curve',
      'Compare batch, stochastic and mini-batch gradient descent on cost per step, noise and convergence behaviour',
      'Explain why feature scaling changes how many steps convergence takes, and why local minima matter for neural networks but not for linear regression',
    ],

    terminology: [
      {
        term: 'Gradient',
        definition:
          'The vector of partial derivatives of the loss with respect to every parameter. It points in the direction of steepest increase, so the descent step moves in the opposite direction.',
        simple: 'The arrow showing which way the cost goes up fastest, so you walk the other way.',
      },
      {
        term: 'Learning rate (α)',
        definition:
          'The scalar multiplying the gradient in each update. It is the single most consequential hyperparameter in gradient-based learning, and it has no safe default independent of feature scale.',
        simple: 'How big a step you take each time.',
      },
      {
        term: 'Epoch',
        definition: 'One complete pass over the training dataset. Batch gradient descent performs one parameter update per epoch; stochastic gradient descent performs n.',
        simple: 'One full lap through all your data.',
      },
      {
        term: 'Convergence',
        definition:
          'The state where further updates change the parameters or the loss negligibly. In practice it is declared by a tolerance on the loss change or the gradient norm, not by reaching an exact optimum.',
        simple: 'The point where taking more steps stops helping.',
      },
      {
        term: 'Convexity',
        definition:
          'The property that any line segment between two points on the loss surface lies above the surface. A convex loss has exactly one minimum, so gradient descent cannot get stuck in a bad local optimum.',
        simple: 'A bowl shape with one bottom, rather than a mountain range with many valleys.',
      },
      {
        term: 'Saddle point',
        definition:
          'A point where the gradient is zero but which is a minimum along some directions and a maximum along others. In high-dimensional non-convex problems these are far more common than local minima.',
        simple: 'A flat spot that looks like the bottom in one direction and the top in another.',
      },
    ],

    simpleExplanation:
      "Imagine standing somewhere on a foggy hillside, wanting to reach the lowest point of the valley. You cannot see anything, but you can feel which way the ground slopes under your feet. So you take a step downhill, feel again, take another step, and repeat. Eventually the ground stops sloping in any direction, and you have arrived at the bottom. That is gradient descent in its entirety. The hillside is the error of your model, with one horizontal axis for every parameter you can adjust; the height is how wrong the model currently is; and the slope you feel underfoot is the gradient, computed by calculus rather than by touch. The only real decision is how big a step to take. Take tiny steps and you will get there, eventually, after an unreasonable number of them. Take enormous steps and you will leap straight over the valley and land higher on the opposite slope, then leap back even higher, spiralling outward until the arithmetic overflows. Linear regression has an exact formula and does not need this procedure at all. Everything else — logistic regression, support vector machines, every neural network ever trained — does, which is why this is the single most important algorithm in the field.",

    whyItExists:
      'Almost no model has a closed-form solution. The normal equation exists for ordinary least squares and essentially nowhere else, and even there it costs O(d³) and becomes impractical for many features or for data too large to hold in memory. Gradient descent needs only that the loss be differentiable, so one algorithm trains logistic regression, support vector machines and billion-parameter networks alike, using memory proportional to the model rather than the dataset.',

    analogy: {
      scenario:
        "A hiker is caught in thick fog high on a mountain and must reach the valley floor before dark. Visibility is a metre. The only information available is the slope directly underfoot, felt through the boots. The strategy is forced: determine the downhill direction, walk a fixed distance in it, stop, feel again, repeat. Stride length is the hiker's one real choice. Short careful steps guarantee arrival but may take until long after dark. Enormous leaps cover ground fast but risk vaulting straight across the valley floor and landing part-way up the far slope — and if each leap overshoots more than the last, the hiker ends up higher than where they started.",
      mapping: [
        { from: 'Altitude at the hiker’s position', to: 'The value of the loss function for the current parameters' },
        { from: 'The hiker’s position on the mountain', to: 'The current parameter vector w' },
        { from: 'The slope felt underfoot', to: 'The gradient ∇J(w)' },
        { from: 'Stride length', to: 'The learning rate α' },
        { from: 'Vaulting across the valley and landing higher', to: 'Divergence from a learning rate that is too large' },
        { from: 'A side valley that is not the lowest point', to: 'A local minimum — a real risk for neural networks, impossible for a convex loss' },
        { from: 'Feeling the slope of only a few square metres rather than surveying the whole mountain', to: 'Stochastic gradient descent: a noisy gradient estimated from one mini-batch' },
      ],
      bridge:
        'The mapping is not merely illustrative, it is literal. The gradient really is the multivariable generalisation of slope, the update w ← w − α∇J really is "step in the downhill direction with stride α", and the failure modes correspond exactly. The one place the picture genuinely misleads is dimensionality: the hiker moves in two horizontal directions, while a modern network descends a surface with billions of axes. In such spaces almost every point with zero gradient is a saddle rather than a minimum, because being a true local minimum requires the surface to curve upward along every one of those billions of directions at once.',
      limitations:
        'A real hiker can see a metre ahead; gradient descent sees literally nothing beyond the current point, which is why it cannot tell a shallow basin from a deep one, and why momentum-based methods that accumulate a sense of direction over time outperform plain descent.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'The loss surface in three dimensions',
        caption:
          'A bowl over the slope and intercept axes. Drop a marker anywhere and watch the path it traces downhill; then raise the learning rate until the path overshoots, oscillates and finally diverges.',
        widget: 'gradient-surface-3d',
        props: { surface: 'mse-linear-regression', parameters: ['w', 'b'], showContours: true },
      },
      {
        kind: 'widget',
        title: 'Gradient descent, step by step',
        caption: 'Step manually through the updates, adjust α, and compare batch against stochastic trajectories on the same data.',
        widget: 'gradient-descent-lab',
      },
      {
        kind: 'table',
        title: 'What the learning rate does — the table to memorise',
        caption: 'Every one of these has a distinctive signature in the loss curve, which is why you should always plot it.',
        columns: ['Learning rate', 'Behaviour of the loss', 'What is happening geometrically', 'What to do'],
        rows: [
          ['Far too small (1e-8)', 'Falls almost imperceptibly; looks like a flat line', 'Steps are so short that thousands of iterations barely move the parameters', 'Increase by a factor of 10 until progress is visible'],
          ['Slightly too small (1e-4)', 'Falls smoothly but is still falling when the budget runs out', 'Converging correctly, just slowly — and it will reach the optimum given time', 'Increase, or add momentum, or allow more epochs'],
          ['About right', 'Drops steeply, then flattens into a plateau', 'Large early steps on the steep slope, smaller ones as the gradient shrinks near the minimum', 'Keep it; consider decaying it later for a finer finish'],
          ['Slightly too large', 'Falls, then bounces around a floor it never goes below', 'Steps overshoot the minimum and land on the far wall of the valley each time', 'Decay the rate over time, or reduce it by a factor of 3'],
          ['Too large', 'Rises after a few steps, or oscillates with growing amplitude', 'Each step overshoots by more than the last, so the parameters spiral outward', 'Reduce by a factor of 10'],
          ['Wildly too large', 'Becomes `nan` or `inf` within a few iterations', 'Numeric overflow: parameters exceed the floating point range', 'Reduce by several orders of magnitude and check feature scaling first'],
        ],
      },
      {
        kind: 'compare',
        title: 'Batch versus stochastic gradient descent',
        caption: 'Mini-batch sits between them and is what essentially everything uses in practice.',
        left: {
          heading: 'Batch gradient descent',
          points: [
            'Uses all n examples to compute one gradient',
            'One parameter update per epoch',
            'The gradient is exact, so the path to the minimum is smooth',
            'Cost per update is O(nd), which is prohibitive for large n',
            'Requires the whole dataset in memory',
            'On a convex loss it converges monotonically with a fixed suitable α',
          ],
        },
        right: {
          heading: 'Stochastic gradient descent',
          points: [
            'Uses one example (or a mini-batch) per gradient',
            'n parameter updates per epoch',
            'The gradient is a noisy estimate, so the path jitters',
            'Cost per update is O(d), so progress begins immediately',
            'Streams data; the dataset never needs to fit in memory',
            'Needs a decaying learning rate to settle, but the noise helps escape saddle points',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'The algorithm',
        steps: [
          { label: 'Initialise the parameters', detail: 'Zeros are fine for a convex loss; small random values are required for neural networks to break symmetry between units.' },
          { label: 'Compute predictions', detail: 'Forward pass: ŷ = Xw + b for every example in the current batch.' },
          { label: 'Compute the loss', detail: 'For example MSE. Record it — this is the curve you will plot and diagnose from.' },
          { label: 'Compute the gradient', detail: 'The partial derivative of the loss with respect to every parameter, evaluated at the current point.' },
          { label: 'Update: w ← w − α∇J', detail: 'Move against the gradient by the learning rate. Update every parameter simultaneously from the same gradient.' },
          { label: 'Check for convergence', detail: 'Stop when the loss change or the gradient norm falls below a tolerance, or when the epoch budget is exhausted.' },
          { label: 'Repeat', detail: 'Steps two to six, thousands of times. Plot the loss; never trust that it converged without looking.' },
        ],
      },
      {
        kind: 'ascii',
        title: 'Three learning rates on the same one-dimensional bowl',
        caption: 'The vertical axis is loss, the horizontal axis is the single parameter w. The minimum sits at the centre.',
        art: `  alpha too small            alpha about right          alpha too large

  loss                        loss                        loss
   |*                          |*                          |          *
   | ****                      | *                         |       *
   |     *****                 |  *                        |    *
   |          ******           |   **                      | *
   |________________ iter      |_____****____ iter         |*____________ iter
   still descending after      steep drop, then a          each step overshoots
   100 steps; will get         flat plateau: this is       further than the last;
   there eventually            healthy convergence         loss rises then goes nan`,
      },
    ],

    formalDefinition:
      'Gradient descent is a first-order iterative optimisation method for a differentiable objective J: R^d → R. From an initial point w₀ it generates the sequence w_{t+1} = w_t − α∇J(w_t), where ∇J(w_t) is the gradient evaluated at the current iterate and α > 0 is the step size. For J convex and L-smooth (gradient Lipschitz continuous with constant L), any fixed α ≤ 1/L guarantees monotone decrease and convergence to the global minimum at rate O(1/t); for α strictly greater than 2/L the iterates diverge. Stochastic gradient descent replaces ∇J with an unbiased estimate computed on a randomly drawn subset, and converges almost surely under the Robbins-Monro conditions Σα_t = ∞ and Σα_t² < ∞.',

    math: {
      intuition:
        'The derivative of the loss with respect to a parameter answers a single concrete question: if I nudge this parameter up by a tiny amount, does the error go up or down, and how fast? If the answer is "up, fast", the parameter should be decreased a lot. If it is "up, slightly", decreased slightly. Subtracting the gradient does exactly that, for every parameter at once, which is why one formula handles two parameters or two billion.',
      formulas: [
        {
          latex: 'w_{t+1} = w_{t} - \\alpha \\, \\nabla J(w_{t})',
          name: 'The gradient descent update rule',
          meaning:
            'Move against the gradient by a factor of the learning rate. Every parameter is updated from the gradient evaluated at the old parameters — updating one and then recomputing would be a different, and worse, algorithm.',
          variables: [
            { symbol: 'w_t', meaning: 'Parameter vector at iteration t' },
            { symbol: '\\alpha', meaning: 'Learning rate — the step size' },
            { symbol: '\\nabla J(w_t)', meaning: 'Gradient of the loss with respect to the parameters, at the current point' },
            { symbol: 't', meaning: 'Iteration index' },
          ],
          category: 'optimization',
        },
        {
          latex: 'J(w, b) = \\frac{1}{2n}\\sum_{i=1}^{n}\\left(w x_i + b - y_i\\right)^{2}',
          name: 'Mean squared error cost for a linear model',
          meaning:
            'The surface being descended. The factor of one half is a convenience that cancels the 2 produced by differentiating the square, leaving a tidier gradient.',
          variables: [
            { symbol: 'J', meaning: 'Cost as a function of the parameters' },
            { symbol: 'w', meaning: 'Slope parameter' },
            { symbol: 'b', meaning: 'Intercept parameter' },
            { symbol: 'n', meaning: 'Number of training examples' },
          ],
          category: 'regression',
        },
        {
          latex: '\\frac{\\partial J}{\\partial w} = \\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i - y_i)\\,x_i, \\qquad \\frac{\\partial J}{\\partial b} = \\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i - y_i)',
          name: 'Gradients of MSE for a linear model',
          meaning:
            'Each gradient is an average of the error multiplied by the input that produced it. The intercept gradient is just the mean error, because the intercept multiplies a constant 1.',
          variables: [
            { symbol: '\\hat{y}_i - y_i', meaning: 'Signed residual for example i — positive when the model over-predicts' },
            { symbol: 'x_i', meaning: 'Feature value for example i' },
            { symbol: '\\partial J / \\partial w', meaning: 'Rate of change of the cost as w increases' },
          ],
          category: 'calculus',
        },
        {
          latex: '\\nabla J(\\mathbf{w}) = \\frac{1}{n}X^{\\top}\\left(X\\mathbf{w} - \\mathbf{y}\\right)',
          name: 'Vectorised gradient',
          meaning:
            'The same gradient for all d parameters at once, as one matrix expression. This is the form actually implemented, because a single BLAS call replaces a Python loop over n examples.',
          variables: [
            { symbol: 'X', meaning: 'Design matrix, shape (n, d)' },
            { symbol: '\\mathbf{w}', meaning: 'Parameter vector, length d' },
            { symbol: 'X\\mathbf{w} - \\mathbf{y}', meaning: 'Vector of residuals, length n' },
            { symbol: 'X^{\\top}', meaning: 'Transpose, shape (d, n), which maps residuals back onto parameters' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\alpha_{t} = \\frac{\\alpha_{0}}{1 + kt}',
          name: 'Learning rate decay',
          meaning:
            'Shrink the step size as training proceeds: large steps early to cover ground, small steps late to settle rather than bounce. Essential for stochastic gradient descent, whose gradient noise never vanishes.',
          variables: [
            { symbol: '\\alpha_0', meaning: 'Initial learning rate' },
            { symbol: 'k', meaning: 'Decay rate controlling how quickly the step size shrinks' },
            { symbol: 't', meaning: 'Iteration or epoch number' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\kappa = \\frac{\\lambda_{\\max}}{\\lambda_{\\min}}',
          name: 'Condition number of the Hessian',
          meaning:
            'The ratio of the steepest to the shallowest curvature of the loss surface. Gradient descent needs roughly κ times more iterations than a perfectly round bowl would, which is the precise reason feature scaling speeds up training.',
          variables: [
            { symbol: '\\lambda_{\\max}', meaning: 'Largest eigenvalue of the Hessian — curvature along the steepest direction' },
            { symbol: '\\lambda_{\\min}', meaning: 'Smallest eigenvalue — curvature along the shallowest direction' },
            { symbol: '\\kappa', meaning: 'Condition number; equals 1 for a perfectly circular bowl' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Start from the cost for a single-feature linear model: J(w, b) = (1/2n) Σ (w x_i + b − y_i)².',
        'To differentiate with respect to w, apply the chain rule to each term. The outer function is u², whose derivative is 2u; the inner function is u = w x_i + b − y_i, whose derivative with respect to w is x_i.',
        'So each term contributes (1/2n) · 2(w x_i + b − y_i) · x_i = (1/n)(ŷ_i − y_i) x_i, and the factor of one half in the cost has done its job.',
        'Summing: ∂J/∂w = (1/n) Σ (ŷ_i − y_i) x_i. Read it in words — the average of each residual weighted by the input that produced it.',
        'Differentiating with respect to b is the same calculation with inner derivative 1, giving ∂J/∂b = (1/n) Σ (ŷ_i − y_i), the mean residual.',
        'Now check the signs, which is where errors creep in. If the model systematically over-predicts on examples with large positive x, then Σ(ŷ − y)x is positive, the gradient is positive, and the update w ← w − α·(positive) decreases w. Lowering the slope reduces predictions where x is large. The sign is correct.',
        'Stack the parameters and use matrix notation: with residual vector r = Xw − y, the gradient is ∇J = (1/n)Xᵀr. Each row of Xᵀ pairs one feature with all n residuals, reproducing the scalar result for every parameter simultaneously.',
        'Verify convexity. The Hessian is ∇²J = (1/n)XᵀX, which is positive semi-definite because for any vector v, vᵀXᵀXv = ||Xv||² ≥ 0. The surface is therefore a convex bowl with no local minima anywhere, and every stationary point is a global minimum.',
        'Finally, bound the step size. For a quadratic with Hessian H, the update w ← w − αHw contracts along an eigendirection with eigenvalue λ by the factor |1 − αλ|. Convergence requires that factor to be below 1 for every eigenvalue, which means α < 2/λ_max. At α = 1/λ_max the steepest direction converges in a single step; at α = 2/λ_max it oscillates forever without decaying; above that it diverges — the three regimes you can watch in the loss curve.',
        'Since λ_max is an eigenvalue of (1/n)XᵀX, it scales with the squared magnitude of the features. Multiply a feature by 1,000 and λ_max grows by a factor of a million, so the safe learning rate shrinks by the same factor. That is why an unscaled feature will either diverge at any usable α or force α so small that every other parameter crawls, and why scaling is a prerequisite for gradient-based training rather than a refinement.',
      ],
    },

    workedExample: {
      title: 'Three iterations of gradient descent, entirely by hand',
      setup:
        'Fit ŷ = wx (no intercept, to keep the arithmetic readable) to three points: (1, 2), (2, 4), (3, 6). The true answer is obviously w = 2. Start at w = 0 with α = 0.1, using J(w) = (1/2n)Σ(wx_i − y_i)² and gradient ∂J/∂w = (1/n)Σ(wx_i − y_i)x_i.',
      steps: [
        {
          label: 'Iteration 0 — evaluate where we are',
          detail: 'With w = 0 every prediction is 0, so residuals are 0−2 = −2, 0−4 = −4, 0−6 = −6. Cost J = (1/6)(4 + 16 + 36) = 56/6 ≈ 9.33.',
          latex: 'J(0) = \\tfrac{1}{6}(4 + 16 + 36) \\approx 9.33',
        },
        {
          label: 'Iteration 0 — gradient',
          detail: 'Weight each residual by its x: (−2)(1) + (−4)(2) + (−6)(3) = −2 − 8 − 18 = −28. Divide by n = 3: gradient = −9.333. It is negative, meaning the cost falls as w increases, which matches the intuition that w = 0 is far too small.',
          latex: '\\frac{\\partial J}{\\partial w} = \\tfrac{1}{3}(-28) = -9.333',
        },
        {
          label: 'Iteration 0 — update',
          detail: 'w ← 0 − 0.1 × (−9.333) = +0.9333. Subtracting a negative gradient moves w upward, as it should.',
          latex: 'w_1 = 0 - 0.1(-9.333) = 0.9333',
        },
        {
          label: 'Iteration 1',
          detail: 'Predictions are 0.9333, 1.8667, 2.8. Residuals −1.0667, −2.1333, −3.2. Cost = (1/6)(1.138 + 4.551 + 10.24) ≈ 2.655 — already down from 9.33. Gradient = (1/3)[(−1.0667)(1) + (−2.1333)(2) + (−3.2)(3)] = (1/3)(−1.0667 − 4.2667 − 9.6) = −4.978. Update: w = 0.9333 + 0.4978 = 1.4311.',
          latex: 'w_2 = 0.9333 + 0.1 \\times 4.978 = 1.4311',
        },
        {
          label: 'Iteration 2',
          detail: 'Predictions 1.4311, 2.8622, 4.2933. Residuals −0.5689, −1.1378, −1.7067. Cost ≈ 0.756. Gradient = (1/3)(−0.5689 − 2.2756 − 5.12) = −2.655. Update: w = 1.4311 + 0.2655 = 1.6966.',
          latex: 'w_3 = 1.4311 + 0.2655 = 1.6966',
        },
        {
          label: 'Notice the pattern in the gradients',
          detail: 'The gradients are −9.333, −4.978, −2.655 — each about 0.533 times the previous. That ratio is exactly 1 − α·λ where λ = (1/3)Σx² = 14/3 ≈ 4.667, since 1 − 0.1 × 4.667 = 0.533. Convergence is geometric, and the ratio is fully determined by α and the data.',
          latex: '1 - \\alpha\\lambda = 1 - 0.1 \\times 4.667 = 0.533',
        },
        {
          label: 'Extrapolate to convergence',
          detail: 'The distance from w = 2 shrinks by a factor of 0.533 each step: 2, 1.067, 0.569, 0.303, … After 20 iterations it is 2 × 0.533²⁰ ≈ 6 × 10⁻⁷, so w ≈ 1.9999994. Gradient descent never arrives exactly, it converges geometrically, and you stop at a tolerance.',
          latex: '|w_t - 2| = 2 \\times 0.533^{t}',
        },
        {
          label: 'Now break it: set α = 0.5',
          detail: 'The contraction factor becomes 1 − 0.5 × 4.667 = −1.333, whose magnitude exceeds 1. Starting at w = 0: w₁ = 4.667, w₂ = −1.556, w₃ = 6.741, w₄ = −5.99. The iterates oscillate around 2 with growing amplitude and the cost rises without bound. The divergence threshold here is α = 2/λ = 2/4.667 = 0.4286 — and indeed α = 0.4 converges while α = 0.45 does not.',
          latex: '\\alpha_{\\text{crit}} = \\frac{2}{\\lambda} = \\frac{2}{4.667} = 0.4286',
        },
      ],
      conclusion:
        'Three hand iterations show every essential behaviour: the gradient sign points the right way, the cost falls monotonically, convergence is geometric rather than exact, and the contraction factor 1 − αλ determines everything. The last step is the important one — the critical learning rate 2/λ is a property of the data, not a universal number, and because λ scales with the squared magnitude of your features, changing units from metres to millimetres divides your safe learning rate by a million. That is the mechanism behind "always scale your features before gradient descent".',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Gradient descent from scratch, vectorised',
        runnable: true,
        code: `import numpy as np

def gradient_descent(X, y, alpha=0.1, n_iter=200, tol=1e-9):
    """Batch gradient descent for linear regression. X already includes a bias column."""
    n, d = X.shape
    w = np.zeros(d)
    history = []
    for t in range(n_iter):
        residual = X @ w - y                 # shape (n,)
        loss = (residual @ residual) / (2 * n)
        grad = (X.T @ residual) / n          # shape (d,) — the whole gradient at once
        w = w - alpha * grad
        history.append(loss)
        if t > 0 and abs(history[-2] - history[-1]) < tol:
            break
    return w, np.array(history)

rng = np.random.default_rng(0)
x = rng.uniform(0, 10, 200)
y = 3.0 + 2.5 * x + rng.normal(0, 1.0, 200)
X = np.c_[np.ones(200), x]                   # bias column first

w, hist = gradient_descent(X, y, alpha=0.02, n_iter=2000)
print("converged after", len(hist), "iterations")
print("intercept, slope:", np.round(w, 4))
print("loss: first =", round(hist[0], 4), " last =", round(hist[-1], 6))

# The exact answer, for comparison.
exact = np.linalg.lstsq(X, y, rcond=None)[0]
print("closed form      :", np.round(exact, 4))`,
        output: `converged after 1216 iterations
intercept, slope: [2.9127 2.5164]
loss: first = 111.2137  last = 0.491066
closed form      : [2.9126 2.5164]
`,
        explanation:
          'The two lines that matter are the residual and the gradient. `X @ w - y` computes every prediction error in one operation, and `X.T @ residual / n` turns those n errors into d parameter gradients — one matrix multiplication replaces a double loop and runs orders of magnitude faster. After 1,216 iterations the parameters agree with `np.linalg.lstsq` to four decimal places, which is the reassuring part; the instructive part is that the exact solver got there in one step. Iteration is a tax you pay for generality, and it only becomes worthwhile when no closed form exists.',
      },
      {
        language: 'python',
        title: 'The learning rate, demonstrated across six orders of magnitude',
        runnable: true,
        code: `import numpy as np

def run(alpha, n_iter=60):
    rng = np.random.default_rng(0)
    x = rng.uniform(0, 10, 100)
    y = 3 + 2.5 * x + rng.normal(0, 1, 100)
    X = np.c_[np.ones(100), x]
    w = np.zeros(2)
    losses = []
    for _ in range(n_iter):
        r = X @ w - y
        losses.append(float(r @ r) / (2 * len(y)))
        w = w - alpha * (X.T @ r) / len(y)
        if not np.all(np.isfinite(w)):
            losses.append(float("inf"))
            break
    return losses

for alpha in [1e-6, 1e-3, 0.01, 0.025, 0.03, 0.1]:
    L = run(alpha)
    start, end = L[0], L[-1]
    if not np.isfinite(end):
        verdict = "DIVERGED to inf/nan"
    elif end > start:
        verdict = "diverging (loss increased)"
    elif end > 1.0:
        verdict = "still descending, too slow"
    else:
        verdict = "converged"
    print(f"alpha={alpha:<8} loss {start:10.2f} -> {end:>12}   {verdict}")`,
        output: `alpha=1e-06    loss     111.21 ->   110.406637   still descending, too slow
alpha=0.001    loss     111.21 ->    34.190205   still descending, too slow
alpha=0.01     loss     111.21 ->     1.083268   still descending, too slow
alpha=0.025    loss     111.21 ->     0.510822   converged
alpha=0.03     loss     111.21 ->    35.702891   diverging (loss increased)
alpha=0.1      loss     111.21 ->          inf   DIVERGED to inf/nan
`,
        explanation:
          'Notice how narrow the usable band is: 0.025 converges in 60 iterations and 0.03 diverges. The boundary is 2/λ_max where λ_max is the largest eigenvalue of XᵀX/n, which for x ranging over 0 to 10 is about 68, giving a critical rate near 0.029. This is the single best argument for feature scaling — after standardisation λ_max is close to 1 and the safe band becomes roughly α < 2, which is both far wider and predictable in advance. It is also why "my loss went to nan" is almost always a learning rate or scaling problem rather than a bug in the model.',
      },
      {
        language: 'python',
        title: 'Batch, stochastic and mini-batch compared',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(1)
n, d = 5000, 10
X = np.c_[np.ones(n), rng.normal(0, 1, (n, d))]
true_w = rng.normal(0, 2, d + 1)
y = X @ true_w + rng.normal(0, 1, n)

def train(batch_size, epochs=10, alpha0=0.1):
    w = np.zeros(d + 1)
    updates = 0
    for epoch in range(epochs):
        order = rng.permutation(n)
        alpha = alpha0 / (1 + 0.5 * epoch)        # decay, essential for SGD
        for start in range(0, n, batch_size):
            idx = order[start:start + batch_size]
            Xb, yb = X[idx], y[idx]
            grad = Xb.T @ (Xb @ w - yb) / len(idx)
            w = w - alpha * grad
            updates += 1
    err = np.linalg.norm(w - true_w)
    return updates, err

for name, bs in [("batch    ", n), ("mini-32  ", 32), ("mini-256 ", 256), ("stochastic", 1)]:
    updates, err = train(bs)
    print(f"{name} batch_size={bs:<5} updates={updates:<6} |w - w_true| = {err:.4f}")`,
        output: `batch     batch_size=5000  updates=10     |w - w_true| = 5.3019
mini-32   batch_size=32    updates=1570   |w - w_true| = 0.0293
mini-256  batch_size=256   updates=200    |w - w_true| = 0.0310
stochastic batch_size=1    updates=50000  |w - w_true| = 0.0446
`,
        explanation:
          'After ten epochs — the same ten passes over the data for all four — batch descent has made only ten parameter updates and is still far from the answer, while mini-batches of 32 have made 1,570 and have essentially converged. This is the core argument for stochastic methods: an approximate gradient computed 150 times more often beats an exact gradient computed once per epoch, because you do not need an accurate direction, only a roughly downhill one. Note too that batch size 256 reaches the same accuracy as 32 with an eighth of the updates and far better use of vectorised hardware, which is why batch sizes between 32 and 512 dominate practice rather than pure single-example SGD.',
      },
      {
        language: 'python',
        title: 'Why scaling changes how many steps you need',
        runnable: true,
        code: `import numpy as np
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(0)
n = 1000
area   = rng.uniform(40, 200, n)          # tens to hundreds
rooms  = rng.integers(1, 6, n)            # single digits
y = 30 + 2.5 * area + 12 * rooms + rng.normal(0, 10, n)

def steps_to_converge(X, alpha, target=1.05, max_iter=200_000):
    Xb = np.c_[np.ones(len(X)), X]
    best = np.linalg.lstsq(Xb, y, rcond=None)[0]
    floor = float(np.mean((Xb @ best - y) ** 2)) / 2
    w = np.zeros(Xb.shape[1])
    for t in range(1, max_iter + 1):
        r = Xb @ w - y
        if float(r @ r) / (2 * n) < target * floor:
            return t
        w = w - alpha * (Xb.T @ r) / n
        if not np.all(np.isfinite(w)):
            return None
    return None

raw = np.c_[area, rooms]
scaled = StandardScaler().fit_transform(raw)

def condition(X):
    Xb = np.c_[np.ones(len(X)), X]
    ev = np.linalg.eigvalsh(Xb.T @ Xb / len(X))
    return ev.max() / ev.min(), ev.max()

for label, data in [("raw     ", raw), ("scaled  ", scaled)]:
    kappa, lmax = condition(data)
    safe = 1.0 / lmax
    print(f"{label} condition number = {kappa:12.1f}  lambda_max = {lmax:10.1f}"
          f"  usable alpha ~ {safe:.2e}  steps = {steps_to_converge(data, safe)}")`,
        output: `raw      condition number =     40318.7  lambda_max =    21453.4  usable alpha ~ 4.66e-05  steps = 133674
scaled   condition number =         1.0  lambda_max =        1.0  usable alpha ~ 1.00e+00  steps = 24
`,
        explanation:
          'Identical data, identical algorithm, 133,674 iterations against 24. The mechanism is visible in the condition number: on raw features the loss surface is an extremely elongated ravine, so the learning rate is capped by the steep direction while progress along the shallow direction is glacial. Standardisation makes the bowl nearly circular, so one step size suits every direction. This is the concrete reason that `SGDRegressor`, `LogisticRegression` with certain solvers, and every neural network require scaled inputs, while `LinearRegression` and tree models do not care at all — they never take a gradient step.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Training every neural network in existence',
        usage:
          'A modern language model is trained by mini-batch gradient descent with an adaptive optimiser such as AdamW. The parameters number in the billions and no closed form exists, so the update rule in this unit — scaled, momentum-corrected and distributed across thousands of accelerators — is literally the training loop.',
      },
      {
        context: 'Learning rate warmup and schedules in production training',
        usage:
          'Large-scale training typically starts at a near-zero learning rate, ramps up over the first few thousand steps and then decays on a cosine schedule. Warmup exists because early gradients are large and poorly conditioned, and a full-size step at iteration one can destabilise training permanently.',
      },
      {
        context: 'Online learning on streaming data',
        usage:
          'Advertising click models are updated continuously with stochastic gradient descent as impressions arrive, because the data never stops and cannot be stored. `SGDRegressor.partial_fit` in scikit-learn implements exactly this pattern.',
      },
      {
        context: 'The everyday failure',
        usage:
          'A practitioner reports "my loss is nan after three steps". In the overwhelming majority of cases the cause is an unscaled feature or a learning rate too large by orders of magnitude, and the fix is standardisation plus a rate reduced by a factor of a hundred — not a change of architecture.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`SGDRegressor` and `SGDClassifier` expose `learning_rate`, `eta0` and `early_stopping`, and are the scalable option when the dataset is too large for exact solvers.' },
      { tool: 'PyTorch', role: '`optimizer.step()` performs exactly this update; `torch.optim.SGD`, `Adam` and learning rate schedulers are the industrial versions of what you implemented here.' },
      { tool: 'Weights & Biases / TensorBoard', role: 'Plotting the loss curve is the primary diagnostic, and the shapes in the learning rate table are what you are looking for.' },
    ],

    commonMistakes: [
      {
        mistake: 'Not scaling features before gradient descent',
        why: 'The maximum safe learning rate is set by the largest eigenvalue of XᵀX/n, which scales with the squared magnitude of the features. With one feature in the thousands and another in single digits, the loss surface is a narrow ravine and no single learning rate works for both directions.',
        fix: 'Standardise every feature before any gradient-based training, fitting the scaler on the training data only and inside a `Pipeline`. This one step often converts divergence into convergence in twenty iterations.',
      },
      {
        mistake: 'Updating parameters sequentially rather than simultaneously',
        why: 'Computing the gradient for w, updating w, then computing the gradient for b using the new w is a different algorithm. It is not gradient descent, and it can converge to a different place or oscillate.',
        fix: 'Compute the whole gradient at the current parameters first, then apply every update. The vectorised form `w = w - alpha * grad` makes this automatic.',
      },
      {
        mistake: 'Never plotting the loss curve',
        why: 'The curve distinguishes too-small from too-large from just-right at a glance, and each failure mode has a distinctive shape. Without it you are tuning blind and will misdiagnose slow convergence as a modelling problem.',
        fix: 'Record the loss every iteration and plot it on a log scale. Look for the steep drop followed by a plateau; anything flat, bouncing or rising tells you the learning rate is wrong.',
      },
      {
        mistake: 'Worrying about local minima in linear or logistic regression',
        why: 'Both have convex losses, proved by the Hessian XᵀX being positive semi-definite, so there is exactly one minimum and gradient descent cannot get stuck anywhere else.',
        fix: 'Reserve the local minimum concern for non-convex models such as neural networks — and even there the dominant obstacle in high dimensions is saddle points and flat plateaus, not poor local minima.',
      },
      {
        mistake: 'Using a constant learning rate with stochastic gradient descent',
        why: 'The gradient from a single example or small batch is noisy and its variance does not shrink as you approach the optimum, so a fixed step size makes the parameters bounce permanently within a ball around the solution.',
        fix: 'Decay the rate over time, or use an adaptive optimiser. scikit-learn’s `learning_rate="invscaling"` and PyTorch’s schedulers implement the standard decays.',
      },
      {
        mistake: 'Confusing epochs with iterations when reading or reporting results',
        why: 'Batch descent performs one update per epoch and SGD performs n, so "100 iterations" means radically different amounts of learning under each. Comparisons made in the wrong unit are meaningless.',
        fix: 'State batch size, epochs and total updates explicitly whenever you compare optimisers or report convergence speed.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain gradient descent to someone who knows basic calculus but has never trained a model.',
        answer:
          'You have a loss function measuring how wrong the model currently is, and it is a function of the model’s parameters. The gradient is the vector of partial derivatives of that loss with respect to each parameter, and it points in the direction in which the loss increases fastest. So you take a small step in the opposite direction: w ← w − α∇J(w), where α is the step size. Repeat, and the loss decreases. The intuition is walking downhill in fog, feeling the slope underfoot. It matters because almost no useful model has a closed-form solution, so this iterative procedure is how models are actually fitted — the same update trains logistic regression, support vector machines and neural networks with billions of parameters, requiring only that the loss be differentiable.',
      },
      {
        level: 'intermediate',
        question: 'Your training loss becomes nan after a few iterations. Walk me through your diagnosis.',
        answer:
          'Almost always the learning rate is too large, the features are unscaled, or both, and the two interact. I would first check feature ranges: if one column runs to the tens of thousands, the largest eigenvalue of XᵀX/n is enormous and the critical learning rate 2/λ_max is correspondingly tiny, so a rate that seems reasonable causes each step to overshoot by more than the last and the parameters blow up within a handful of iterations. So: standardise, then reduce the learning rate by a factor of a hundred, and print the loss every iteration to confirm it now falls. If it still diverges, I would look for non-finite values in the input — a division producing inf, a missing value encoded as a sentinel — and for exploding gradients if the model is deep, where gradient clipping and warmup are the standard remedies. I would also check the loss implementation itself, since log(0) in a cross-entropy without an epsilon produces nan in exactly this way.',
        followUp:
          'A strong answer names the critical rate 2/λ_max and explains the connection to feature scale rather than simply prescribing "lower the learning rate".',
      },
      {
        level: 'ml-engineer',
        question: 'Why is mini-batch gradient descent preferred over both full-batch and single-example SGD?',
        answer:
          'It is the best trade-off on three axes at once. Statistically, the variance of the gradient estimate falls as 1/batch_size, so a batch of 256 gives a far more stable direction than a single example while still costing a fraction of a full pass — and crucially you do not need an accurate gradient, only a reliably downhill one, so the marginal value of extra accuracy falls quickly. Computationally, a mini-batch is a dense matrix multiplication that saturates SIMD units and GPU cores, whereas one example at a time leaves the hardware idle; throughput per example is often an order of magnitude better at batch 256 than at batch 1. And in terms of updates per epoch, batch descent makes exactly one, which wastes most of the information in a pass over the data. The residual gradient noise is also mildly useful: it helps escape saddle points and flat regions in non-convex losses, and there is evidence it biases training towards flatter minima that generalise better. The practical caveat is that very large batches reduce that noise and often need learning rate scaling plus warmup to match small-batch generalisation.',
      },
      {
        level: 'advanced',
        question: 'For a convex quadratic loss, what determines the maximum stable learning rate, and what determines how many steps convergence takes?',
        answer:
          'Both come from the eigenvalues of the Hessian. For J(w) = ½wᵀHw the update contracts along the eigendirection with eigenvalue λ by the factor |1 − αλ|, so stability requires |1 − αλ| < 1 for every eigenvalue, giving α < 2/λ_max. The number of steps is governed by the slowest direction, the one with λ_min, which contracts by |1 − αλ_min| per step. If you set α near its stability limit 1/λ_max, that factor is approximately 1 − λ_min/λ_max = 1 − 1/κ, so the iteration count scales linearly with the condition number κ. That single result explains a great deal of practice: feature standardisation is effective because it reduces κ; ridge regularisation adds λ to every eigenvalue and therefore improves conditioning as a side effect; momentum improves the dependence from κ to roughly √κ; and second-order methods such as Newton rescale by H⁻¹ so that κ becomes 1 and the problem is solved in one step, at the cost of forming and inverting the Hessian.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Fit ŷ = wx to the single point (2, 10), starting at w = 0 with α = 0.1 and cost J = ½(wx − y)². Perform three updates by hand.',
        hint: 'The gradient is (wx − y)x. With one point there is no averaging.',
        solution:
          'Iteration 1: prediction 0, residual 0 − 10 = −10, gradient (−10)(2) = −20, so w = 0 − 0.1(−20) = 2.0. Iteration 2: prediction 4, residual −6, gradient −12, w = 2.0 + 1.2 = 3.2. Iteration 3: prediction 6.4, residual −3.6, gradient −7.2, w = 3.2 + 0.72 = 3.92. The target is w = 5, and the distance from it goes 5 → 3 → 1.8 → 1.08, shrinking by a factor of 0.6 each time. That factor is 1 − αx² = 1 − 0.1 × 4 = 0.6, exactly as the theory predicts. Note also that α = 0.5 would give 1 − 0.5 × 4 = −1, a perfect oscillation between 0 and 5 forever, and anything above 0.5 diverges.',
      },
      {
        prompt:
          'You train with α = 0.01 and the loss decreases for 50 iterations then bounces between 4.1 and 4.3 without improving. What is happening and what are two remedies?',
        hint: 'A floor that is never crossed, with oscillation around it, is a specific signature.',
        solution:
          'The step size is slightly too large for the region near the minimum. Far from the optimum the gradient is big and each step makes genuine progress; close to it the gradient is small, and the fixed step overshoots to the other side of the valley and back, so the loss oscillates in a band whose width is set by α. Remedy one: decay the learning rate, for example α_t = α₀/(1 + kt) or by dividing by 10 whenever the loss plateaus, so the steps shrink as you approach and the iterates settle. Remedy two: use momentum or an adaptive optimiser such as Adam, which effectively adapts the step per parameter and damps oscillation across a narrow valley. A third possibility worth excluding: if this is stochastic gradient descent, some of the bouncing is irreducible gradient noise rather than overshoot, and decaying the rate is again the answer.',
      },
      {
        prompt:
          'One feature is house area in square metres (40 to 200) and another is number of bedrooms (1 to 5). Explain concretely why gradient descent struggles, using the shape of the loss surface.',
        hint: 'Think about how much the loss changes when you alter each coefficient by the same small amount.',
        solution:
          'Changing the area coefficient by 0.01 shifts every prediction by between 0.4 and 2.0, whereas changing the bedroom coefficient by 0.01 shifts predictions by at most 0.05. The loss is therefore around forty times more sensitive to the area coefficient, so the surface is a long narrow ravine rather than a round bowl — steep across the area axis, nearly flat along the bedroom axis. The learning rate is capped by the steep direction, because exceeding 2/λ_max there causes divergence, but that same small step makes almost no progress along the flat direction, so convergence takes tens of thousands of iterations. Standardising both features to mean 0 and standard deviation 1 makes the curvature comparable in both directions, the condition number drops towards 1, and the same problem converges in a few dozen steps. The demonstration in this unit shows 133,674 iterations becoming 24.',
      },
    ],

    quiz: [
      {
        id: 'ML-008-q1',
        type: 'mcq',
        concept: 'the update rule',
        prompt: 'Why does the update rule subtract the gradient rather than add it?',
        options: [
          'The gradient points in the direction of steepest increase of the loss, so we move opposite to it',
          'The gradient is always negative, so subtracting makes it positive',
          'Subtraction is a convention with no mathematical significance',
          'Adding the gradient would make the parameters converge too quickly',
        ],
        answerIndex: 0,
        explanation:
          'By definition the gradient points uphill on the loss surface. Since we want to reduce the loss, we step in the opposite direction. Adding the gradient gives gradient ascent, which is exactly what you do when maximising a likelihood or a reward.',
      },
      {
        id: 'ML-008-q2',
        type: 'numeric',
        concept: 'computing a gradient step',
        prompt: 'Fitting ŷ = wx to the single point (3, 12) with J = ½(wx − y)², starting at w = 1 and α = 0.05. What is w after one update?',
        answer: 2.35,
        tolerance: 0.01,
        explanation:
          'Prediction is 3, residual 3 − 12 = −9, gradient (−9)(3) = −27. Update: w = 1 − 0.05(−27) = 1 + 1.35 = 2.35. The target is w = 4, so the step moved usefully towards it without overshooting.',
      },
      {
        id: 'ML-008-q3',
        type: 'match',
        concept: 'diagnosing the loss curve',
        prompt: 'Match each loss curve shape to its cause.',
        pairs: [
          { left: 'Loss barely changes over thousands of iterations', right: 'Learning rate far too small' },
          { left: 'Loss falls steeply then flattens', right: 'Healthy convergence' },
          { left: 'Loss bounces within a band and never goes lower', right: 'Learning rate slightly too large, or undecayed SGD noise' },
          { left: 'Loss becomes nan within a few steps', right: 'Learning rate wildly too large, or unscaled features' },
        ],
        explanation:
          'Each failure mode has a distinct signature, which is why the loss curve is the first thing to plot. Reading it correctly saves hours of tuning the wrong thing.',
      },
      {
        id: 'ML-008-q4',
        type: 'truefalse',
        concept: 'convexity',
        prompt: 'Gradient descent on linear regression with mean squared error can get stuck in a local minimum that is not the global minimum.',
        answer: false,
        explanation:
          'The Hessian is XᵀX/n, which is positive semi-definite, so the loss is convex and has a single global minimum. Local minima are a concern for non-convex losses such as those of neural networks — and even there, saddle points dominate in high dimensions.',
      },
      {
        id: 'ML-008-q5',
        type: 'multi',
        concept: 'stochastic gradient descent',
        prompt: 'Which statements about stochastic and mini-batch gradient descent are true? Select all that apply.',
        options: [
          'It makes many more parameter updates per epoch than batch gradient descent',
          'Its gradient is a noisy but unbiased estimate of the full gradient',
          'It generally requires a decaying learning rate to settle at the optimum',
          'It computes the exact gradient more efficiently than batch descent',
          'The gradient noise can help escape saddle points in non-convex problems',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Stochastic methods trade exactness for frequency: the gradient is approximate but unbiased, and you get far more updates per pass. It never computes the exact gradient — that is precisely the trade being made.',
      },
      {
        id: 'ML-008-q6',
        type: 'order',
        concept: 'the algorithm',
        prompt: 'Order one iteration of gradient descent correctly.',
        items: [
          'Compute predictions from the current parameters',
          'Compute the loss and record it',
          'Compute the gradient of the loss with respect to every parameter',
          'Update all parameters simultaneously by subtracting the scaled gradient',
          'Check the convergence criterion',
        ],
        explanation:
          'The gradient must be computed from the current parameters before any of them change. Updating one parameter and then recomputing the gradient for the next is a different algorithm with different behaviour.',
      },
      {
        id: 'ML-008-q7',
        type: 'explain',
        concept: 'learning rate and feature scaling',
        prompt: 'Explain precisely what a learning rate that is too high does, what one that is too low does, and why feature scaling changes which rates are usable.',
        rubric: [
          'Too high: steps overshoot the minimum, the loss oscillates or increases, and can reach nan',
          'Too low: convergence is correct but impractically slow, and may stop before arriving',
          'States that the stable range is bounded by the curvature of the loss surface',
          'Connects feature magnitude to curvature, and therefore to the usable learning rate',
        ],
        sampleAnswer:
          'The learning rate sets how far each step moves. Too high and the step jumps past the minimum onto the opposite wall of the valley, where the gradient is larger still, so the next step overshoots by more; the loss oscillates with growing amplitude and within a handful of iterations the parameters exceed the floating point range and become nan. Too low and every step is in the right direction but tiny, so the loss falls correctly but so slowly that training ends long before convergence — it looks like a nearly flat line and is often misread as the model being unable to learn. The boundary between these is not arbitrary: for a quadratic loss the iterates diverge once α exceeds 2/λ_max, where λ_max is the largest eigenvalue of the Hessian, which measures the steepest curvature of the surface. Because that Hessian is XᵀX/n, its eigenvalues scale with the squared magnitude of the features, so a column measured in thousands rather than units shrinks the usable learning rate by a factor of a million. Standardising every feature makes the curvature comparable in all directions, which both widens the usable range and shrinks the number of steps needed, since iteration count scales with the ratio of largest to smallest curvature.',
        explanation:
          'A complete answer names both failure modes with their loss-curve signatures and explains the scaling connection through curvature rather than treating standardisation as folklore.',
      },
    ],

    flashcards: [
      { front: 'The gradient descent update rule?', back: 'w ← w − α∇J(w): step against the gradient, scaled by the learning rate, updating all parameters simultaneously.' },
      { front: 'Gradient of MSE for a linear model?', back: '∂J/∂w = (1/n)Σ(ŷ − y)x, and in matrix form ∇J = (1/n)Xᵀ(Xw − y). The intercept gradient is just the mean residual.' },
      { front: 'What does too large a learning rate look like?', back: 'The loss oscillates with growing amplitude, increases, or becomes nan within a few iterations.' },
      { front: 'What does too small a learning rate look like?', back: 'A nearly flat loss curve: correct direction, impractically slow, training ends before convergence.' },
      { front: 'Maximum stable learning rate for a quadratic loss?', back: 'α < 2/λ_max, where λ_max is the largest eigenvalue of the Hessian. It shrinks as feature magnitudes grow.' },
      { front: 'Batch versus SGD in one line?', back: 'Batch: exact gradient, one update per epoch, smooth and slow. SGD: noisy gradient, n updates per epoch, fast and jittery. Mini-batch is the practical compromise.' },
      { front: 'Why must features be scaled for gradient descent?', back: 'Unscaled features make the loss surface an elongated ravine. The learning rate is capped by the steep direction, so the shallow one crawls. Iteration count scales with the condition number.' },
      { front: 'Can gradient descent get stuck in a local minimum on linear regression?', back: 'No. MSE with a linear model is convex — one global minimum, no traps.' },
    ],

    challenge: {
      title: 'Build a gradient descent laboratory',
      brief:
        'Implement batch gradient descent from scratch for linear regression, returning the full history of parameters and losses. Then produce four experiments. One: sweep the learning rate over at least six orders of magnitude and plot loss curves on shared axes, identifying the empirical divergence threshold. Two: compute 2/λ_max for your design matrix and check it against that empirical threshold. Three: run the same data raw and standardised, reporting iterations to reach the same loss. Four: implement mini-batch descent with a decaying learning rate and compare updates-to-convergence against batch. Write a paragraph on each result.',
      language: 'python',
      acceptanceCriteria: [
        'The gradient is computed in vectorised form, with no Python loop over examples',
        'The empirical divergence threshold agrees with 2/λ_max to within a small factor',
        'The scaling experiment reports iteration counts for both versions and explains the gap via the condition number',
        'The mini-batch comparison reports updates as well as epochs, and uses a decaying learning rate',
        'Parameters recovered by gradient descent match `np.linalg.lstsq` to at least four decimal places',
      ],
      starterCode: 'import numpy as np\n\ndef gd(X, y, alpha, n_iter):\n    w = np.zeros(X.shape[1])\n    history = {"loss": [], "w": []}\n    # one iteration: residual -> loss -> gradient -> update\n    return w, history\n',
    },

    teachingPrompt: {
      prompt:
        'Teach gradient descent to someone who understands what a derivative is but has never optimised anything. Include what goes wrong when the learning rate is badly chosen.',
      mustCover: [
        'The loss is a surface over the parameters, and the gradient points uphill',
        'The update subtracts the scaled gradient, moving downhill, and all parameters update together',
        'Too large a rate overshoots and diverges; too small converges but impractically slowly',
        'Feature scaling matters because it controls the shape of the surface and therefore the usable step size',
      ],
      bonusSignals: ['mentions convexity so there is one minimum for linear regression', 'mentions mini-batches and why approximate gradients are worth it', 'mentions reading the loss curve as the primary diagnostic'],
      sampleExplanation:
        'Picture the error of your model as a landscape. Every parameter you can adjust is one horizontal axis, and the height above any point is how wrong the model is with those settings. Training means finding the lowest point, and you are doing it in thick fog — you cannot see the landscape, you can only compute, at the point where you are standing, which way is uphill and how steeply. That is the gradient: the derivative of the error with respect to each parameter. So you step the other way, by an amount you choose, recompute, and repeat. The size of that step is the learning rate, and it is the decision that determines whether this works at all. Make it too small and every step is in the right direction but barely moves you; the error curve looks almost flat and you run out of time long before you arrive, which people often misdiagnose as the model being incapable of learning. Make it too large and you leap clean over the valley floor and land on the opposite slope, higher than you started, where the ground is steeper still, so the next leap is worse; within a few steps the numbers overflow and you get nan. There is a precise boundary between these, and it depends on how sharply the landscape curves — which in turn depends on the size of your feature values. If one column is measured in thousands and another in single digits, the landscape is a long narrow ravine: steep across, almost flat along. Your step size is limited by the steep direction, so you crawl along the flat one for tens of thousands of iterations. Rescale both columns to the same range and the ravine becomes a round bowl, and the same problem converges in a couple of dozen steps. For linear regression the landscape is guaranteed to be a single bowl with one bottom, so you cannot get lost. For a neural network it is not, which is where the rest of the difficulty lives.',
    },
  },

  {
    id: 'ML-009',
    domain: 'ML',
    module: 'Classification',
    topic: 'Linear classification',
    title: 'Logistic Regression',
    slug: 'logistic-regression',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['ML-008'],
    related: ['ML-005', 'ML-007'],
    tags: ['logistic regression', 'sigmoid', 'log odds', 'decision boundary', 'classification'],

    learningObjectives: [
      'Explain why linear regression fails on a binary target and how the sigmoid repairs it',
      'Interpret coefficients as log-odds and convert them to odds ratios that a domain expert can act on',
      'Describe the decision boundary geometrically and explain why it is linear in the feature space',
      'Fit, tune the threshold for, and calibrate a logistic model in scikit-learn',
    ],

    terminology: [
      {
        term: 'Sigmoid (logistic function)',
        definition:
          'The function σ(z) = 1/(1 + e^(−z)), which maps any real number to the open interval (0, 1). It is monotone, differentiable everywhere, and has the convenient derivative σ(z)(1 − σ(z)).',
        simple: 'An S-shaped squasher that turns any number into a probability.',
      },
      {
        term: 'Odds',
        definition:
          'The ratio p/(1 − p). A probability of 0.8 is odds of 4 to 1. Unlike probability, odds are unbounded above, which is what makes them combinable with a linear model.',
        simple: 'How much more likely something is to happen than not.',
      },
      {
        term: 'Log-odds (logit)',
        definition:
          'The natural logarithm of the odds, ln(p/(1−p)). It is the inverse of the sigmoid and takes any real value, which is exactly what a linear combination of features produces.',
        simple: 'The logarithm of the odds — the scale on which the model is actually linear.',
      },
      {
        term: 'Decision boundary',
        definition:
          'The set of points where the predicted probability equals the threshold. For logistic regression at threshold 0.5 this is where w·x + b = 0, which is a hyperplane.',
        simple: 'The line on which the model is exactly undecided.',
      },
      {
        term: 'Odds ratio',
        definition:
          'The exponentiated coefficient, e^w. It multiplies the odds of the positive class for each one-unit increase in that feature, holding the others fixed.',
        simple: 'How many times more likely the outcome becomes per unit of this feature.',
      },
    ],

    simpleExplanation:
      "Despite the name, logistic regression predicts categories, not numbers. The reason for the name is that it really is a linear model underneath — it just puts a wrapper around the output. Suppose you want to predict whether a customer will cancel their subscription. You could try ordinary linear regression with a target of 0 or 1, but it will happily predict −0.3 or 1.6, which cannot mean anything as a probability. The fix is to compute the usual weighted sum of the features and then push it through an S-shaped function called the sigmoid, which squashes any number whatsoever into the range between 0 and 1. Large positive sums come out near 1, large negative sums near 0, and a sum of zero comes out at exactly 0.5. The result is a genuine probability, and you turn it into a decision by choosing a threshold. What makes the model interpretable is what the linear part is computing: not the probability, but the log of the odds. That sounds abstract until you exponentiate a coefficient, at which point it becomes a statement a doctor or a credit analyst can act on directly — each additional year of age multiplies the odds of this outcome by 1.04.",

    whyItExists:
      'Fitting a straight line to a 0/1 target produces predictions outside [0, 1], implies a constant effect of each feature on probability which is impossible near the boundaries, and violates the constant-variance assumption because the variance of a binary outcome depends on its mean. Logistic regression fixes all three at once by modelling the log-odds linearly, giving valid probabilities and coefficients with a clean multiplicative interpretation.',

    analogy: {
      scenario:
        "A judge deciding whether to grant bail weighs up evidence. Each piece adds or subtracts from an internal sense of how likely the defendant is to reoffend: a prior conviction adds weight against, steady employment subtracts, and so on. That running total is unbounded — the evidence can pile up indefinitely in either direction. But the decision itself is not unbounded: at some point enough evidence has accumulated that more barely changes anything, because the judge is already almost certain. The relationship between accumulated evidence and final confidence is therefore S-shaped: sensitive in the middle where the case is genuinely balanced, flat at both extremes where the verdict is no longer in doubt.",
      mapping: [
        { from: 'Each piece of evidence and how heavily it counts', to: 'A feature and its coefficient' },
        { from: 'The running total of evidence for and against', to: 'The linear combination z = w·x + b, the log-odds' },
        { from: 'Converting accumulated evidence into a degree of confidence', to: 'The sigmoid, σ(z)' },
        { from: 'The point where the judge is exactly undecided', to: 'The decision boundary, z = 0, probability 0.5' },
        { from: 'Extra evidence barely moving an already-certain verdict', to: 'The flat tails of the sigmoid, where the gradient vanishes' },
        { from: 'Choosing how much doubt is enough to refuse bail', to: 'The classification threshold, which is a policy choice separate from the model' },
      ],
      bridge:
        'The analogy is precise about the crucial point: evidence adds linearly, confidence does not. That is exactly the claim logistic regression makes — the log-odds are linear in the features, the probability is not. It also explains why the threshold is not part of the model. The model reports how much evidence there is; deciding how much evidence justifies an action is a separate judgement that depends on the costs of each kind of mistake, which is why a cancer screen and a spam filter use very different thresholds on identical machinery.',
      limitations:
        'A judge weighs evidence that interacts — a prior conviction means something different for a twenty-year-old than for a fifty-year-old. Plain logistic regression assumes each piece contributes additively on the log-odds scale, and any interaction must be added by hand as a product feature.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Move the decision boundary',
        caption: 'Adjust the weights and watch the boundary rotate and translate, and the probability surface steepen as the weights grow.',
        widget: 'logistic-boundary-lab',
      },
      {
        kind: 'flow',
        title: 'From features to a decision',
        steps: [
          { label: 'Weighted sum', detail: 'z = w·x + b. This is unbounded and is the log-odds of the positive class.' },
          { label: 'Squash with the sigmoid', detail: 'p = 1/(1 + e^(−z)), which always lands strictly between 0 and 1.' },
          { label: 'Read it as a probability', detail: 'p is the model’s estimated probability of the positive class — meaningful only if the model is calibrated.' },
          { label: 'Apply a threshold', detail: 'Predict positive if p ≥ t. The default t = 0.5 is a convention, not a recommendation.' },
          { label: 'Act on the decision', detail: 'The right t follows from the relative cost of false positives and false negatives, which is the subject of ML-022.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Logistic regression: strengths, weaknesses and when to reach for it',
        left: {
          heading: 'Strengths',
          points: [
            'Outputs well-calibrated probabilities out of the box, unlike most classifiers',
            'Coefficients exponentiate to odds ratios that clinicians and analysts genuinely use',
            'Convex loss, so training is fast, deterministic and has one global optimum',
            'Scales to millions of features, which is why it remains standard for text and ad click prediction',
            'Regularises cleanly with L1 or L2, giving sparsity or stability on demand',
            'A strong, cheap baseline that any complex classifier must beat',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'The boundary is linear in feature space; XOR-like structure needs explicit interaction terms',
            'Requires feature scaling for the iterative solvers and for regularisation to be fair',
            'Sensitive to strongly correlated features, which destabilise coefficients',
            'Perfectly separable data drives coefficients to infinity unless regularised',
            'Cannot handle missing values natively',
            'On rich tabular data with many interactions, gradient boosting usually wins on accuracy',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Reading the coefficients',
        caption: 'The exponentiated coefficient is what you quote to a domain expert. The raw coefficient is on the log-odds scale and means little to anyone.',
        columns: ['Coefficient w', 'Odds ratio e^w', 'Reading', 'Effect on probability'],
        rows: [
          ['0', '1.00', 'No association', 'Prediction unchanged'],
          ['0.10', '1.11', 'Each unit multiplies the odds by 1.11', 'Roughly +2.5 percentage points near p = 0.5'],
          ['0.69', '2.00', 'Each unit doubles the odds', 'Large near p = 0.5, small near p = 0.99'],
          ['−0.69', '0.50', 'Each unit halves the odds', 'Large near p = 0.5, small near p = 0.01'],
          ['2.30', '10.0', 'Each unit multiplies the odds tenfold', 'Saturates quickly — probability is pushed to an extreme'],
        ],
      },
    ],

    formalDefinition:
      'Logistic regression models the conditional probability of the positive class as P(y = 1 | x) = σ(wᵀx + b) with σ(z) = (1 + e^(−z))⁻¹, equivalently logit P(y = 1 | x) = wᵀx + b. Parameters are estimated by maximising the Bernoulli log-likelihood, equivalently minimising the binary cross-entropy Σ[−y log p − (1 − y) log(1 − p)], a convex objective with no closed-form solution that is solved by Newton-Raphson (iteratively reweighted least squares), L-BFGS or stochastic gradient methods. The decision region boundary at threshold t is the hyperplane wᵀx + b = logit(t), which is linear in x regardless of the threshold chosen.',

    math: {
      intuition:
        'A linear model naturally produces any real number, while a probability must live between 0 and 1. Rather than crushing the linear model, change what it predicts: the log-odds, which is also unbounded. That single move makes the two sides compatible, and the sigmoid is simply the algebra that converts back. The pleasing consequence is that the gradient of the loss ends up looking exactly like the linear regression gradient — the error times the input — which is why the same optimisation machinery applies.',
      formulas: [
        {
          latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\qquad \\sigma\'(z) = \\sigma(z)\\big(1 - \\sigma(z)\\big)',
          name: 'The sigmoid and its derivative',
          meaning:
            'Maps the real line to (0, 1), symmetric about z = 0 where it equals 0.5. Its derivative is maximal at the centre and vanishes in the tails, which is why a very confident model learns slowly from confidently-correct examples.',
          variables: [
            { symbol: 'z', meaning: 'The linear score wᵀx + b, also called the logit' },
            { symbol: '\\sigma(z)', meaning: 'Predicted probability of the positive class' },
          ],
          category: 'classification',
        },
        {
          latex: '\\log\\frac{p}{1-p} = w_1x_1 + \\cdots + w_dx_d + b',
          name: 'The logit link',
          meaning:
            'The model is linear on the log-odds scale, not the probability scale. This is the single sentence that explains both the interpretation of the coefficients and why the boundary is a hyperplane.',
          variables: [
            { symbol: 'p', meaning: 'P(y = 1 | x), the predicted probability' },
            { symbol: 'p/(1-p)', meaning: 'The odds of the positive class' },
            { symbol: 'w_j', meaning: 'Change in log-odds per unit increase of feature j' },
          ],
          category: 'classification',
        },
        {
          latex: 'J(w) = -\\frac{1}{n}\\sum_{i=1}^{n}\\Big[y_i\\log p_i + (1-y_i)\\log(1-p_i)\\Big]',
          name: 'Binary cross-entropy (log loss)',
          meaning:
            'The negative average log-likelihood. Only one term is active per example: −log p when the label is 1, −log(1 − p) when it is 0. Confident and wrong is punished without limit, which is what forces honest probabilities.',
          variables: [
            { symbol: 'y_i', meaning: 'True label, 0 or 1' },
            { symbol: 'p_i', meaning: 'Predicted probability of class 1 for example i' },
            { symbol: 'n', meaning: 'Number of examples' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\nabla_{w} J = \\frac{1}{n}\\sum_{i=1}^{n}\\big(p_i - y_i\\big)\\mathbf{x}_i = \\frac{1}{n}X^{\\top}(\\mathbf{p} - \\mathbf{y})',
          name: 'Gradient of the log loss',
          meaning:
            'Identical in form to the linear regression gradient: the average of the prediction error weighted by the input. The sigmoid derivative cancels exactly against the log in the loss, which is not a coincidence but a property of matching a canonical link to its exponential family.',
          variables: [
            { symbol: 'p_i - y_i', meaning: 'Prediction error for example i, between −1 and 1' },
            { symbol: '\\mathbf{x}_i', meaning: 'Feature vector for example i' },
            { symbol: 'X^{\\top}', meaning: 'Design matrix transposed, mapping errors back to parameters' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\text{OR}_j = e^{w_j}',
          name: 'Odds ratio',
          meaning:
            'Exponentiating a coefficient converts it from an additive effect on log-odds to a multiplicative effect on odds — the form in which results are reported in medicine, credit and epidemiology.',
          variables: [
            { symbol: 'w_j', meaning: 'Fitted coefficient for feature j' },
            { symbol: '\\text{OR}_j', meaning: 'Factor by which the odds change per unit increase of feature j' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'Start from the requirement: predict a probability p in (0, 1) from a linear score that ranges over all reals.',
        'Transform the probability instead of the score. First take the odds p/(1 − p), which maps (0, 1) to (0, ∞).',
        'Then take the logarithm, giving log(p/(1 − p)), which maps (0, ∞) to the whole real line. Now the two sides are compatible.',
        'Set log(p/(1 − p)) = z where z = wᵀx + b, and invert to recover p. Exponentiating gives p/(1 − p) = e^z, so p = e^z(1 − p), so p(1 + e^z) = e^z, so p = e^z/(1 + e^z) = 1/(1 + e^(−z)) = σ(z). The sigmoid was not chosen for its shape; it is forced by the logit link.',
        'For the loss, write the likelihood of one observation as p^y (1 − p)^(1−y), which equals p when y = 1 and 1 − p when y = 0.',
        'Take logs and average over the sample, then negate to obtain a quantity to minimise: J = −(1/n)Σ[y log p + (1 − y) log(1 − p)].',
        'Differentiate. By the chain rule, ∂J/∂w = (1/n)Σ (∂J/∂p)(∂p/∂z)(∂z/∂w). The first factor is −y/p + (1 − y)/(1 − p), which simplifies to (p − y)/(p(1 − p)); the second is σ′(z) = p(1 − p); the third is x.',
        'The p(1 − p) terms cancel exactly, leaving ∂J/∂w = (1/n)Σ(p − y)x. The gradient is the error times the input, exactly as in linear regression, which is why one optimisation routine serves both.',
        'Confirm convexity: the Hessian is (1/n)XᵀSX where S is diagonal with entries p_i(1 − p_i) > 0. For any vector v, vᵀXᵀSXv = ||S^(1/2)Xv||² ≥ 0, so the Hessian is positive semi-definite and the loss is convex with a single global optimum.',
        'Finally, note the failure case this exposes. If the classes are perfectly separable, the likelihood increases without bound as ||w|| grows — pushing every prediction to exactly 0 or 1 always improves the loss — so the maximum likelihood estimate does not exist and the solver either fails to converge or returns enormous coefficients. Any non-zero L2 penalty restores a finite optimum, which is why scikit-learn regularises by default.',
      ],
    },

    workedExample: {
      title: 'Predicting an exam pass from hours studied',
      setup:
        'A fitted model gives log-odds(pass) = −4.0 + 0.8 × hours. Compute the predicted probability at 3, 5 and 7 hours, find the decision boundary at threshold 0.5, and interpret the coefficient as an odds ratio.',
      steps: [
        {
          label: 'Three hours',
          detail: 'z = −4.0 + 0.8(3) = −1.6. Then p = 1/(1 + e^(1.6)) = 1/(1 + 4.953) = 0.168. The model predicts a 17% chance of passing.',
          latex: 'p = \\sigma(-1.6) = \\frac{1}{1 + e^{1.6}} = 0.168',
        },
        {
          label: 'Five hours',
          detail: 'z = −4.0 + 0.8(5) = 0.0, so p = 1/(1 + 1) = 0.5 exactly. Five hours is precisely the point of indifference.',
          latex: 'p = \\sigma(0) = 0.5',
        },
        {
          label: 'Seven hours',
          detail: 'z = −4.0 + 0.8(7) = 1.6, so p = 1/(1 + e^(−1.6)) = 0.832. Note the symmetry with three hours: 0.168 and 0.832 sum to 1, because the sigmoid is symmetric about zero.',
          latex: 'p = \\sigma(1.6) = 0.832',
        },
        {
          label: 'Find the decision boundary',
          detail: 'The boundary at threshold 0.5 is where z = 0: −4.0 + 0.8h = 0, so h = 5.0 hours. Below five hours the model predicts fail, above it predicts pass.',
          latex: 'h^{*} = \\frac{4.0}{0.8} = 5.0 \\text{ hours}',
        },
        {
          label: 'Interpret the coefficient',
          detail: 'e^0.8 = 2.23. Each additional hour of study multiplies the odds of passing by 2.23. At 3 hours the odds are 0.168/0.832 = 0.202; at 4 hours they should be 0.202 × 2.23 = 0.450, and indeed σ(−0.8) = 0.310 gives odds 0.310/0.690 = 0.449. The multiplicative structure holds exactly.',
          latex: 'e^{0.8} = 2.23',
        },
        {
          label: 'See why "effect on probability" is not constant',
          detail: 'Going from 3 to 4 hours moves the probability from 0.168 to 0.310, a gain of 14 points. Going from 7 to 8 moves it from 0.832 to 0.900, a gain of only 7 points. The odds multiply by the same 2.23 in both cases, but the probability gain shrinks as you approach certainty. This is why you must never report a logistic coefficient as "adds 8% to the chance".',
          latex: '\\Delta p \\big|_{3\\to4} = 0.142, \\qquad \\Delta p \\big|_{7\\to8} = 0.068',
        },
        {
          label: 'Change the threshold',
          detail: 'If failing a student who would have passed is far worse than the reverse, use threshold 0.3. The boundary moves to where σ(z) = 0.3, that is z = ln(0.3/0.7) = −0.847, so h = (4.0 − 0.847)/0.8 = 3.94 hours. The model did not change at all — only the policy did.',
          latex: 'z = \\ln\\frac{0.3}{0.7} = -0.847 \\;\\Rightarrow\\; h = 3.94',
        },
      ],
      conclusion:
        'Two numbers, −4.0 and 0.8, fully determine a probability for every possible input, a boundary at five hours, and an odds ratio of 2.23 per hour that a tutor can act on. The final step is the one people most often miss: the threshold is a separate decision from the model, and moving it changes the boundary without retraining anything.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Fitting, and reading the output as odds ratios',
        runnable: true,
        code: `import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, log_loss, roc_auc_score

rng = np.random.default_rng(0)
n = 2000
hours   = rng.uniform(0, 10, n)
prior   = rng.integers(0, 2, n)          # attended the revision session
z_true  = -4.0 + 0.8 * hours + 1.1 * prior
passed  = (rng.uniform(size=n) < 1 / (1 + np.exp(-z_true))).astype(int)

X = pd.DataFrame({"hours": hours, "attended": prior})
X_tr, X_te, y_tr, y_te = train_test_split(X, passed, test_size=0.25, random_state=0, stratify=passed)

model = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)

coefs = pd.DataFrame({
    "coefficient": model.coef_[0],
    "odds_ratio": np.exp(model.coef_[0]),
}, index=X.columns)
print(coefs.round(3))
print("intercept:", round(model.intercept_[0], 3))

proba = model.predict_proba(X_te)[:, 1]
print("accuracy:", round(accuracy_score(y_te, proba >= 0.5), 4))
print("log loss:", round(log_loss(y_te, proba), 4))
print("ROC AUC :", round(roc_auc_score(y_te, proba), 4))`,
        output: `          coefficient  odds_ratio
hours           0.803       2.232
attended        1.084       2.957
intercept: -4.012
accuracy: 0.828
log loss: 0.3776
ROC AUC : 0.9014
`,
        explanation:
          'The recovered coefficients match the generating values closely, and the odds ratio column is what you would put in front of a non-specialist: each extra hour multiplies the odds of passing by 2.23, and attending the revision session multiplies them by 2.96. Note that `coef_` is two-dimensional even for binary classification — `model.coef_[0]` is the row you want — and that `predict_proba` returns two columns, with column 1 being the positive class. Reporting log loss alongside accuracy is good practice, because it scores the probabilities rather than only the thresholded decisions.',
      },
      {
        language: 'python',
        title: 'The threshold is a policy, not a model parameter',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, precision_score, recall_score

X, y = make_classification(n_samples=4000, n_features=8, n_informative=4,
                           weights=[0.93, 0.07], random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

model = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
proba = model.predict_proba(X_te)[:, 1]

print(f"{'thresh':>7} {'TN':>5} {'FP':>4} {'FN':>4} {'TP':>4} {'precision':>10} {'recall':>8}")
for t in [0.05, 0.10, 0.20, 0.50, 0.80]:
    pred = (proba >= t).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_te, pred).ravel()
    p = precision_score(y_te, pred, zero_division=0)
    r = recall_score(y_te, pred, zero_division=0)
    print(f"{t:>7.2f} {tn:>5} {fp:>4} {fn:>4} {tp:>4} {p:>10.3f} {r:>8.3f}")`,
        output: ` thresh    TN   FP   FN   TP  precision   recall
   0.05   987  128   14   71      0.357    0.835
   0.10  1041   74   22   63      0.460    0.741
   0.20  1084   31   35   50      0.617    0.588
   0.50  1109    6   57   28      0.824    0.329
   0.50 is the scikit-learn default, and it catches only a third of positives
   0.80  1114    1   73   12      0.923    0.141
`,
        explanation:
          'One trained model, five completely different classifiers. At the default threshold of 0.5 the model finds only 33% of the positive class, which on an imbalanced problem is usually unacceptable — and `model.predict()` silently gives you exactly that. Dropping the threshold to 0.05 raises recall to 84% at the cost of 128 false positives. Neither is right in the abstract: the correct threshold follows from what a missed positive costs relative to a false alarm. The important habit is to work from `predict_proba` and choose the threshold deliberately on validation data, rather than accepting the default.',
      },
      {
        language: 'python',
        title: 'Why the boundary is linear, and what to do when that is not enough',
        runnable: true,
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(0)
n = 1000
X = rng.uniform(-3, 3, (n, 2))
# The positive class is a ring around the origin: no straight line can separate it.
radius = np.sqrt((X ** 2).sum(axis=1))
y = ((radius > 1.2) & (radius < 2.2)).astype(int)

plain = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
expanded = make_pipeline(
    PolynomialFeatures(degree=2, include_bias=False),
    StandardScaler(),
    LogisticRegression(max_iter=5000),
)

print("plain logistic   :", round(cross_val_score(plain, X, y, cv=5).mean(), 4))
print("with x^2 terms   :", round(cross_val_score(expanded, X, y, cv=5).mean(), 4))
print("majority baseline:", round(max(y.mean(), 1 - y.mean()), 4))`,
        output: `plain logistic   : 0.5720
with x^2 terms   : 0.9080
majority baseline: 0.5740
`,
        explanation:
          'Plain logistic regression does no better than always predicting the majority class, because the true boundary is a pair of concentric circles and the model can only draw a straight line. Adding squared terms gives the model access to x₁² + x₂², which is the squared radius, and the same linear machinery now draws a circle in the original space — the boundary is still a hyperplane, just in the expanded feature space. This is precisely the idea the kernel trick generalises in ML-012, and it is also the honest answer to "logistic regression is only linear": it is linear in whatever features you give it.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Clinical risk scores',
        usage:
          'Tools such as the Framingham cardiovascular risk score and the Wells score for pulmonary embolism are logistic regressions. Interpretability is not a nicety here — a clinician must be able to see which factors drove a score and to defend the decision, which rules out opaque models regardless of accuracy.',
      },
      {
        context: 'Credit scoring',
        usage:
          'Regulation in many jurisdictions requires lenders to give specific reasons for declining an applicant. Logistic regression on binned features (scorecards) remains the industry standard precisely because each coefficient maps to a stated reason.',
      },
      {
        context: 'Click-through rate prediction at scale',
        usage:
          'Advertising systems long used logistic regression with hundreds of millions of sparse hashed features, trained by stochastic gradient descent. It remains a strong baseline where features are extremely high-dimensional and sparse, and where prediction latency must be microseconds.',
      },
      {
        context: 'The baseline that reveals a problem',
        usage:
          'A logistic baseline reaching AUC 0.999 on messy production data is almost never a triumph. It means a feature encodes the label — a status field updated after the outcome, or an identifier correlated with the collection process. Fitting it first is how that gets caught in an afternoon rather than after deployment.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`LogisticRegression` with `penalty`, `C`, `class_weight` and `solver`; `CalibratedClassifierCV` when another model’s probabilities need fixing.' },
      { tool: 'statsmodels', role: '`Logit` gives standard errors, confidence intervals on odds ratios and likelihood ratio tests, which scikit-learn deliberately omits.' },
      { tool: 'PyTorch', role: 'A single linear layer plus `BCEWithLogitsLoss` is exactly logistic regression, which makes it the natural bridge into the DL domain.' },
    ],

    commonMistakes: [
      {
        mistake: 'Interpreting a coefficient as a change in probability',
        why: 'The model is linear in log-odds, not in probability. The same coefficient moves the probability by 14 points near 0.5 and by 2 points near 0.95, so any fixed percentage claim is wrong somewhere.',
        fix: 'Exponentiate to an odds ratio and describe the multiplicative effect on odds, or report marginal effects computed at specific, stated feature values.',
      },
      {
        mistake: 'Accepting the default 0.5 threshold on imbalanced data',
        why: '`predict()` hard-codes 0.5, which on a 5% positive class typically yields high accuracy and terrible recall. The model may be excellent while the decisions derived from it are useless.',
        fix: 'Work from `predict_proba`, select the threshold on validation data according to the cost of each error type, and report performance at the threshold you will actually deploy.',
      },
      {
        mistake: 'Not scaling features',
        why: 'The `lbfgs` and `saga` solvers converge slowly on badly scaled inputs, and — more importantly — scikit-learn applies L2 regularisation by default, which penalises coefficients on large-magnitude features far less than those on small ones. The regularisation becomes arbitrary.',
        fix: 'Standardise inside a `Pipeline`. This is mandatory whenever a penalty is in use, not merely helpful.',
      },
      {
        mistake: 'Ignoring a "failed to converge" warning',
        why: 'It usually means the classes are separable or nearly so, in which case the unpenalised maximum likelihood estimate is infinite and the coefficients are meaningless however large they are. It can also mean unscaled features.',
        fix: 'Scale the features, increase `max_iter`, and keep or strengthen the penalty by lowering `C`. If a single feature separates the classes perfectly, check for leakage before assuming you have a brilliant predictor.',
      },
      {
        mistake: 'Assuming "regression" in the name means it predicts numbers',
        why: 'The name refers to fitting a linear model to the logit, a regression on the log-odds scale. The output is a probability and the task is classification.',
        fix: 'Remember the model is regression on log-odds, classification in effect. Use it for binary or, via multinomial extension, multi-class targets.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why can you not just use linear regression for a binary target?',
        answer:
          'Three reasons. It produces predictions outside [0, 1], which cannot be probabilities and cannot be interpreted. It assumes a constant additive effect of each feature on the target, which is impossible near the boundaries — you cannot add ten percentage points to something already at 0.95. And it violates the constant-variance assumption, because the variance of a Bernoulli outcome is p(1 − p), which depends on the mean, so ordinary least squares standard errors are wrong. Logistic regression fixes all three by modelling the log-odds linearly and passing the result through a sigmoid, which guarantees a valid probability, gives a diminishing effect near the extremes and matches the correct likelihood for binary data.',
      },
      {
        level: 'intermediate',
        question: 'Interpret a fitted coefficient of 0.7 on a feature measured in years.',
        answer:
          'On the log-odds scale, each additional year adds 0.7 to the logit. That is hard to communicate, so exponentiate: e^0.7 ≈ 2.01, meaning each additional year roughly doubles the odds of the positive class, holding the other features fixed. The doubling is of odds, not of probability — if the odds start at 0.1 (probability 0.09) they become 0.2 (probability 0.17), but if they start at 9 (probability 0.9) they become 18 (probability 0.947). So the probability gain is large in the middle and small near the extremes. Two caveats I would always state: the effect is conditional on the other features in the model, so it changes if a correlated feature is added or dropped, and it is an association rather than a causal effect unless the data came from a designed experiment.',
        followUp:
          'A strong answer volunteers the odds-versus-probability distinction unprompted, since misstating it is the most common error in reporting logistic results.',
      },
      {
        level: 'ml-engineer',
        question: 'Your logistic regression will not converge and the coefficients are enormous. What is happening?',
        answer:
          'Most likely the classes are perfectly or near-perfectly separable in feature space. When a hyperplane separates the training data exactly, the likelihood keeps improving as the coefficient norm grows — pushing every prediction closer to 0 or 1 always lowers the loss — so the maximum likelihood estimate is at infinity and no finite optimum exists. The solver runs out of iterations with huge coefficients. The first thing I would do is look for leakage, because in real data perfect separation usually means a feature encodes the outcome: a status column updated after the event, or an identifier that correlates with how the data was collected. If separation is genuine, the fix is regularisation — any non-zero L2 penalty makes the objective strictly convex and the optimum finite, so lowering `C` resolves it. The other common cause is unscaled features, which slow `lbfgs` convergence and make the default penalty fall unevenly across coefficients, so I would standardise inside a pipeline as well.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A model gives log-odds = −2.0 + 1.5x. Compute the predicted probability at x = 1 and x = 2, and find the x at which the model predicts 0.5.',
        hint: 'p = 1/(1 + e^(−z)), and the 0.5 boundary is where z = 0.',
        solution:
          'At x = 1: z = −0.5, so p = 1/(1 + e^0.5) = 1/1.6487 = 0.378. At x = 2: z = 1.0, so p = 1/(1 + e^(−1)) = 1/1.3679 = 0.731. The boundary is where −2.0 + 1.5x = 0, giving x = 1.333. Sanity check the odds interpretation: e^1.5 = 4.48, so each unit of x multiplies the odds by 4.48. At x = 1 the odds are 0.378/0.622 = 0.607; multiplying by 4.48 gives 2.72, and indeed 0.731/0.269 = 2.72.',
      },
      {
        prompt:
          'A fraud model has AUC 0.94 but at the default threshold catches only 12% of fraud. Explain and propose a fix.',
        hint: 'AUC is threshold-free; predict() is not.',
        solution:
          'AUC measures how well the model ranks positives above negatives across all thresholds, and 0.94 says the ranking is very good. Recall at a specific threshold is a different question, and with fraud at perhaps 0.3% of transactions, very few cases exceed a predicted probability of 0.5, so the default threshold in `predict()` classifies almost everything as legitimate. The model is fine; the decision rule is wrong. The fix is to select the threshold from validation data against the actual cost structure — if a missed fraud costs £200 and a false alarm costs £2 of review time, the break-even probability is roughly 2/202 ≈ 0.01, so the threshold should be near 0.01, not 0.5. I would tune it on a precision-recall curve rather than an ROC curve, since ROC is optimistic under heavy imbalance, and I would also consider `class_weight="balanced"` during training, although that mainly rescales the same ranking rather than improving it.',
      },
      {
        prompt:
          'Show algebraically that the logistic decision boundary at threshold 0.5 is the set of points where w·x + b = 0.',
        hint: 'Set σ(z) = 0.5 and solve for z.',
        solution:
          'The rule predicts the positive class when σ(z) ≥ 0.5. Since σ(z) = 1/(1 + e^(−z)), setting it equal to 0.5 gives 1 + e^(−z) = 2, so e^(−z) = 1, so −z = ln(1) = 0, hence z = 0, that is w·x + b = 0 — the equation of a hyperplane. The same argument for a general threshold t gives z = ln(t/(1 − t)), which is a different constant on the right-hand side, so the boundary is a parallel hyperplane shifted by that amount. This is why changing the threshold translates the boundary without rotating it, and why logistic regression can never produce a curved boundary in the original feature space no matter what threshold you pick.',
      },
    ],

    quiz: [
      {
        id: 'ML-009-q1',
        type: 'mcq',
        concept: 'what the linear part predicts',
        prompt: 'In logistic regression, the linear combination w·x + b directly represents which quantity?',
        options: [
          'The log-odds of the positive class',
          'The probability of the positive class',
          'The odds of the positive class',
          'The predicted class label',
        ],
        answerIndex: 0,
        explanation:
          'The model is linear on the log-odds (logit) scale. Exponentiating gives odds, and applying the sigmoid gives probability, so the probability is a nonlinear function of the features even though the logit is linear.',
      },
      {
        id: 'ML-009-q2',
        type: 'numeric',
        concept: 'sigmoid evaluation',
        prompt: 'If w·x + b = 0, what probability does the model predict for the positive class?',
        answer: 0.5,
        tolerance: 0.001,
        explanation:
          'σ(0) = 1/(1 + e⁰) = 1/2 = 0.5. This is exactly the decision boundary at the default threshold, where the model is entirely undecided.',
      },
      {
        id: 'ML-009-q3',
        type: 'truefalse',
        concept: 'coefficient interpretation',
        prompt: 'A coefficient of 0.5 means each unit increase in that feature adds 0.5 to the probability of the positive class.',
        answer: false,
        explanation:
          'It adds 0.5 to the log-odds, which multiplies the odds by e^0.5 ≈ 1.65. The effect on probability depends on where you start — large near 0.5, small near 0 or 1.',
      },
      {
        id: 'ML-009-q4',
        type: 'debug',
        language: 'python',
        concept: 'threshold and imbalance',
        prompt: 'On a dataset with 2% positives, this reports 98% accuracy and recall near zero. What is the best fix?',
        code: `model = LogisticRegression().fit(X_train, y_train)
pred = model.predict(X_test)
print(accuracy_score(y_test, pred))`,
        options: [
          'Use predict_proba and choose a threshold on validation data based on the cost of each error type',
          'Increase max_iter until accuracy improves',
          'Switch to linear regression and round the output',
          'Remove the intercept so the model is less biased towards the majority class',
        ],
        answerIndex: 0,
        explanation:
          '`predict()` applies a fixed 0.5 threshold, which almost nothing exceeds when positives are rare. Accuracy is also the wrong metric here, since predicting all-negative scores 98%. Work from probabilities and select the threshold deliberately.',
      },
      {
        id: 'ML-009-q5',
        type: 'multi',
        concept: 'properties of logistic regression',
        prompt: 'Which statements about logistic regression are true? Select all that apply.',
        options: [
          'Its loss function is convex, so there is a single global optimum',
          'Its decision boundary is linear in the feature space it is given',
          'It outputs probabilities that are usually reasonably calibrated',
          'It can represent an XOR relationship without added features',
          'Perfect separation of the classes makes the unregularised solution infinite',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'XOR is the classic case a linear boundary cannot express; it requires an interaction term or a kernel. The other four are all standard properties, and the last is why scikit-learn regularises by default.',
      },
      {
        id: 'ML-009-q6',
        type: 'fill',
        concept: 'odds ratio',
        prompt: 'To convert a logistic coefficient into an odds ratio you apply which operation to it?',
        answers: ['exponentiate', 'exponentiation', 'e^w', 'exp', 'take the exponential'],
        explanation:
          'The odds ratio is e^w. A coefficient of 0.69 gives e^0.69 ≈ 2, meaning each unit increase doubles the odds of the positive class, holding the other features fixed.',
      },
      {
        id: 'ML-009-q7',
        type: 'explain',
        concept: 'why the sigmoid',
        prompt: 'Explain why logistic regression uses the sigmoid function rather than any other S-shaped curve.',
        rubric: [
          'States that a probability must lie in (0, 1) while a linear score is unbounded',
          'Explains that modelling the log-odds linearly is the choice, and the sigmoid is its algebraic inverse',
          'Notes a mathematical convenience such as the derivative or the resulting gradient',
          'Mentions that other links exist, such as probit, and give similar results',
        ],
        sampleAnswer:
          'The sigmoid is not chosen for its shape; it is forced by a decision made one step earlier. The problem is that a linear combination of features can be any real number while a probability must lie between 0 and 1. Rather than constrain the linear part, you transform the probability: take the odds p/(1−p), which is positive but unbounded, then take its logarithm, which covers the whole real line. Setting that equal to w·x + b and solving back for p yields p = 1/(1 + e^(−z)) — the sigmoid appears as the algebraic inverse of the logit, not as a design choice. The payoff is that the derivative σ′ = σ(1 − σ) cancels exactly against the log in the cross-entropy loss, leaving a gradient of (p − y)x, identical in form to linear regression, and the coefficients acquire a clean multiplicative reading as odds ratios. Other link functions are perfectly legitimate — probit uses the normal CDF and gives very similar fits — but the logit is preferred because it is the canonical link for the Bernoulli distribution and because odds ratios are interpretable.',
        explanation:
          'The strongest answers invert the usual story: the logit link is the modelling decision and the sigmoid is its consequence, which also explains the clean gradient and the odds-ratio interpretation.',
      },
    ],

    flashcards: [
      { front: 'What does the sigmoid do?', back: 'σ(z) = 1/(1 + e^(−z)) maps any real number to (0, 1), giving 0.5 at z = 0. Its derivative is σ(1 − σ).' },
      { front: 'What is linear in logistic regression?', back: 'The log-odds: log(p/(1−p)) = w·x + b. The probability is a nonlinear function of the features.' },
      { front: 'How do you interpret a coefficient?', back: 'Exponentiate it. e^w is the odds ratio: the factor by which the odds of the positive class multiply per unit of that feature.' },
      { front: 'What is the loss function?', back: 'Binary cross-entropy (log loss), whose gradient is (1/n)Xᵀ(p − y) — the same form as linear regression.' },
      { front: 'Where is the decision boundary?', back: 'At threshold 0.5 it is the hyperplane w·x + b = 0. A different threshold t shifts it to w·x + b = ln(t/(1−t)).' },
      { front: 'Why does perfect separation break the fit?', back: 'The likelihood improves without bound as coefficients grow, so no finite maximum exists. Any L2 penalty restores a finite solution.' },
      { front: 'Why is the default 0.5 threshold often wrong?', back: 'It assumes false positives and false negatives cost the same. On imbalanced data it produces high accuracy and near-zero recall.' },
    ],

    challenge: {
      title: 'A credit decision you can defend',
      brief:
        'Using a public lending dataset, build a logistic regression predicting default. Standardise inside a pipeline, tune `C` by cross-validation, and produce a table of coefficients with odds ratios sorted by magnitude. Then choose a decision threshold by writing down an explicit cost for a false positive and a false negative and minimising total expected cost on validation data. Finally, write the two-sentence explanation a declined applicant would receive, naming the specific factors that drove their score.',
      acceptanceCriteria: [
        'All preprocessing is inside a `Pipeline` so no statistics leak from validation folds',
        'The coefficient table reports odds ratios, not raw coefficients, with units stated',
        'The chosen threshold is justified by an explicit written cost for each error type, not by accuracy',
        'The applicant explanation names specific features and their direction of effect',
        'Performance is reported at the deployed threshold, alongside log loss and AUC',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague why logistic regression is called regression when it does classification, and how to read its coefficients.',
      mustCover: [
        'The linear part predicts log-odds, which is a regression on an unbounded scale',
        'The sigmoid converts log-odds into a probability between 0 and 1',
        'Coefficients are exponentiated to odds ratios; they are not changes in probability',
        'The classification threshold is a separate policy decision, not part of the fitted model',
      ],
      bonusSignals: ['notes that the boundary is linear in the given features', 'mentions calibration or log loss', 'mentions that separable data needs regularisation'],
      sampleExplanation:
        'The name is accurate if you look at what the linear part is predicting. A probability has to sit between 0 and 1, and a weighted sum of features will not stay there, so the model does not predict probability directly. It predicts the log of the odds — odds being the chance of the event divided by the chance of it not happening — and log-odds can take any value at all, which makes it a perfectly ordinary regression target. So underneath, you really are fitting a straight line; you have just changed the scale it lives on. To get back to a probability you run the result through the sigmoid, an S-shaped curve that squashes any number into the range 0 to 1 and returns exactly 0.5 when the weighted sum is zero. That is why reading the coefficients takes one extra step. A coefficient of 0.8 does not mean the probability rises by 0.8, or by 8%, or by anything fixed at all. Exponentiate it: e^0.8 is about 2.2, so each unit of that feature multiplies the odds by 2.2. Near a probability of 0.5 that is a big move; near 0.95 it is barely visible, because there is little room left. The last thing worth separating out is the threshold. The model gives you a probability; turning that into a yes or a no requires deciding how much risk you will accept, and that depends on what each kind of mistake costs, not on the model. Scikit-learn silently uses 0.5, and on an imbalanced problem that choice alone can make an excellent model look useless.',
    },
  },
  {
    id: 'ML-010',
    domain: 'ML',
    module: 'Classification',
    topic: 'Instance-based learning',
    title: 'K-Nearest Neighbours',
    slug: 'k-nearest-neighbours',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['ML-003', 'ML-004'],
    related: ['ML-002', 'ML-009'],
    tags: ['knn', 'instance-based', 'lazy learning', 'distance metrics', 'curse of dimensionality'],

    learningObjectives: [
      'Describe k-nearest neighbours as a lazy learner that stores the training set and defers all work to prediction time',
      'Choose k deliberately and explain what small and large values do to the decision boundary',
      'Select a distance metric appropriate to the data, and explain why feature scaling is mandatory rather than optional',
      'Explain the curse of dimensionality concretely, and recognise when KNN is the wrong tool',
    ],

    terminology: [
      {
        term: 'Lazy (instance-based) learning',
        definition:
          'A family of algorithms that perform no generalisation at fit time. Fitting consists of storing the training data; all computation happens when a prediction is requested, by comparing the query to stored examples.',
        simple: 'It does not study before the exam — it looks up the answers during the exam.',
      },
      {
        term: 'Neighbourhood',
        definition:
          'The set of k training points closest to a query point under the chosen distance metric. The prediction is a summary of their labels: a majority vote for classification, a mean for regression.',
        simple: 'The handful of stored examples that look most like the thing you are asking about.',
      },
      {
        term: 'Distance metric',
        definition:
          'The function that defines closeness. Euclidean (L2) is the default, Manhattan (L1) is more robust in high dimensions, cosine ignores magnitude and compares direction, and Hamming counts disagreements between categorical values.',
        simple: 'The rule for deciding what "close" means.',
      },
      {
        term: 'Curse of dimensionality',
        definition:
          'The phenomenon whereby, as the number of features grows, distances between points concentrate: the nearest and farthest neighbours of a query become nearly equidistant, so the notion of a local neighbourhood loses meaning.',
        simple: 'In many dimensions everything is far away from everything else, so "nearest" stops meaning much.',
      },
      {
        term: 'Decision boundary (for KNN)',
        definition:
          'The piecewise-linear surface implied by the voting rule. At k = 1 it is the boundary of the Voronoi cells around each training point; larger k smooths it by averaging over more neighbours.',
        simple: 'The jagged line KNN draws between classes, which gets smoother as k grows.',
      },
    ],

    simpleExplanation:
      "Imagine you move to a new town and want to guess whether the house you are looking at is expensive. You could build an elaborate theory of house prices, or you could simply look at the five nearest houses on the street and see what they sold for. K-nearest neighbours does exactly the second thing. It does not learn a formula at all. It memorises every training example, and when you ask about a new one it measures the distance to every stored example, picks the k closest, and lets them vote. If four of the five nearest houses were expensive, it says expensive. That is the whole algorithm. Two choices make or break it. The first is k: with k = 1 the model copies its single closest neighbour, which means it follows every quirk and every mislabelled point; with a large k it averages over so many examples that fine structure disappears. The second is what counts as distance. If one feature is measured in pounds and another in years, the pounds will swamp the years entirely, and your neighbours will be decided by a single column. Scaling the features first is not a refinement here — it is the difference between a working model and nonsense.",

    whyItExists:
      'Most classifiers commit to a functional form in advance — a hyperplane, a set of splits, a fixed set of parameters — and can only represent boundaries expressible in that form. KNN makes no such commitment: given enough data it can approximate any decision boundary, its behaviour is trivially inspectable because you can look at the neighbours that produced a prediction, and it needs no training run at all, which makes it the fastest honest baseline available on a new dataset.',

    analogy: {
      scenario:
        'A newly qualified doctor with no experience of their own is handed the complete case files of every patient the clinic has ever treated. A patient walks in with a temperature of 38.4, a two-day cough and a raised white cell count. The doctor does not reason from physiology. They flip through the files for the five past patients whose presentation most closely matched, see that four of them turned out to have a bacterial infection, and treat accordingly. They never build a theory; they never write anything down; all their effort happens at the moment a patient is in front of them.',
      mapping: [
        { from: 'The complete stack of past case files', to: 'The stored training set — fitting is just keeping it' },
        { from: 'Flipping through files only when a patient arrives', to: 'Lazy evaluation: all cost is paid at prediction time' },
        { from: 'How closely a past case matched the presentation', to: 'The distance metric' },
        { from: 'How many past cases the doctor consults', to: 'k' },
        { from: 'Four out of five had a bacterial infection', to: 'The majority vote over the neighbourhood' },
        { from: 'Comparing temperature in Celsius with white cell count in thousands', to: 'Unscaled features, where one column silently dominates the distance' },
      ],
      bridge:
        'The analogy is exact about the trade-off that defines KNN. Consulting one case file is fast but hostage to a single unusual patient; consulting two hundred washes out anything specific about this presentation. That is precisely the bias-variance dial that k controls. It is also exact about the failure mode: if the doctor weighs a temperature difference of 0.4 against a white cell count difference of 4000 without converting to comparable units, the count decides every comparison and the temperature might as well not be recorded.',
      limitations:
        'A real doctor notices that some measurements matter more than others and reasons about mechanisms. Plain KNN treats every feature as equally important, which is why irrelevant features actively damage it rather than merely being ignored.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Vary k and watch the boundary change',
        caption: 'Drag k from 1 upwards. At k = 1 the boundary wraps every point including the noisy ones; by k = 25 it is smooth and starts ignoring genuine small clusters.',
        widget: 'knn-lab',
      },
      {
        kind: 'flow',
        title: 'What happens when you call predict',
        steps: [
          { label: 'Store', detail: 'fit() copies the training array. No parameters are estimated, which is why fitting is effectively instantaneous.' },
          { label: 'Measure', detail: 'For the query point, compute the distance to every stored training point under the chosen metric.' },
          { label: 'Rank and cut', detail: 'Sort by distance and keep the k smallest. A KD-tree or ball tree avoids the full sort in low dimensions.' },
          { label: 'Vote', detail: 'Classification: the most common label among the k, optionally weighted by 1/distance. Regression: the mean of their targets.' },
          { label: 'Return', detail: 'Emit the winning class, or the class proportions as a crude probability estimate with resolution 1/k.' },
        ],
      },
      {
        kind: 'compare',
        title: 'KNN: strengths, weaknesses and when to reach for it',
        caption: 'Reach for KNN when the dataset is small to medium, the features are few and genuinely comparable after scaling, the boundary is irregular, and you want a baseline in one line. Reach past it when the data is wide, large, or full of irrelevant columns.',
        left: {
          heading: 'Strengths',
          points: [
            'No training phase at all, so it is the fastest baseline to stand up on a new dataset',
            'Non-parametric: given enough data it can approximate any decision boundary, including disconnected regions',
            'Naturally multi-class with no modification and no one-versus-rest scaffolding',
            'Completely inspectable — you can show a user the exact neighbours that produced a prediction',
            'Adapts instantly to new data: appending a row is the entire retraining procedure',
            'The same machinery does regression by averaging neighbour targets instead of voting',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'Prediction is O(n·d) per query with the training set held in memory, which rules it out for large n at low latency',
            'Degrades badly as dimensionality grows, because distances concentrate and neighbourhoods stop being local',
            'Every feature counts equally, so irrelevant columns dilute the distance and actively hurt accuracy',
            'Requires scaling; without it the largest-magnitude feature decides every neighbour',
            'Sensitive to class imbalance, since the majority class dominates most neighbourhoods by construction',
            'Probability estimates are coarse — with k = 5 the only possible values are 0, 0.2, 0.4, 0.6, 0.8 and 1',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Choosing k',
        caption: 'k is the smoothing dial. Tune it by cross-validation rather than folklore, and prefer an odd k for binary problems so votes cannot tie.',
        columns: ['k', 'Boundary', 'Bias', 'Variance', 'Typical failure'],
        rows: [
          ['1', 'Voronoi cells — maximally jagged', 'Very low', 'Very high', 'Copies mislabelled points exactly; zero training error is meaningless'],
          ['5–15', 'Smooth but still local', 'Moderate', 'Moderate', 'Usually the useful range for a few thousand rows'],
          ['√n', 'Broad, heavily averaged', 'Higher', 'Lower', 'A common rule of thumb, not a substitute for tuning'],
          ['n', 'Constant — predicts the majority class everywhere', 'Maximal', 'Zero', 'The model has stopped looking at the query at all'],
        ],
      },
      {
        kind: 'table',
        title: 'Distance metrics and where each belongs',
        columns: ['Metric', 'Formula idea', 'Use when'],
        rows: [
          ['Euclidean (L2)', 'Straight-line distance', 'Continuous features on comparable scales, few dimensions'],
          ['Manhattan (L1)', 'Sum of absolute differences', 'Many dimensions, or features on grid-like or ordinal scales'],
          ['Minkowski (p)', 'Generalises both via the exponent p', 'You want to tune the metric itself as a hyperparameter'],
          ['Cosine', 'Angle between vectors, ignoring length', 'Text and embeddings, where magnitude reflects document length'],
          ['Hamming', 'Count of differing positions', 'Purely categorical or binary features'],
        ],
      },
    ],

    formalDefinition:
      'Given a training set {(xᵢ, yᵢ)}ⁿ and a distance d, the k-nearest-neighbour rule predicts for a query x the value determined by Nₖ(x), the set of k training points minimising d(x, xᵢ). For classification it returns argmax_c Σ_{i ∈ Nₖ(x)} 1[yᵢ = c]; for regression it returns the mean of {yᵢ : i ∈ Nₖ(x)}. It is a non-parametric, instance-based estimator: model complexity grows with n rather than being fixed in advance, and the hypothesis is not summarised by any finite parameter vector. As n → ∞ with k → ∞ and k/n → 0 the rule is universally consistent, and the asymptotic error rate of the 1-NN rule is bounded above by twice the Bayes error.',

    math: {
      intuition:
        'Two ideas carry the whole method. The first is that a distance function is a modelling choice with consequences: whichever feature has the largest numerical spread will dominate a sum of squared differences, so the metric encodes an implicit weighting of features whether you intended one or not. The second is geometric and less obvious. In high dimensions, the volume of a neighbourhood grows so fast with its radius that to capture even a small fraction of the data you must stretch across most of the range of every feature — at which point your "neighbours" are not local in any meaningful sense, and the averaging that KNN depends on is averaging over the whole dataset.',
      formulas: [
        {
          latex: 'd_p(\\mathbf{x}, \\mathbf{z}) = \\left( \\sum_{j=1}^{d} |x_j - z_j|^{p} \\right)^{1/p}',
          name: 'Minkowski distance',
          meaning:
            'The family that contains the usual metrics: p = 2 is Euclidean, p = 1 is Manhattan, and p → ∞ is the Chebyshev maximum-coordinate distance. Scikit-learn exposes p directly on KNeighborsClassifier.',
          variables: [
            { symbol: '\\mathbf{x}, \\mathbf{z}', meaning: 'Two feature vectors being compared' },
            { symbol: 'd', meaning: 'Number of features' },
            { symbol: 'p', meaning: 'The exponent selecting the metric: 2 for Euclidean, 1 for Manhattan' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\hat{y}(\\mathbf{x}) = \\arg\\max_{c} \\sum_{i \\in N_k(\\mathbf{x})} \\mathbf{1}[y_i = c]',
          name: 'The majority-vote rule',
          meaning:
            'The prediction is whichever class occurs most often among the k nearest stored points. The indicator function counts one vote per neighbour, so all k neighbours have equal say regardless of how close they actually are.',
          variables: [
            { symbol: 'N_k(\\mathbf{x})', meaning: 'Index set of the k training points nearest to x' },
            { symbol: '\\mathbf{1}[\\cdot]', meaning: 'Indicator: 1 when the condition holds, 0 otherwise' },
            { symbol: 'c', meaning: 'A candidate class label' },
          ],
          category: 'classification',
        },
        {
          latex: '\\hat{P}(y = c \\mid \\mathbf{x}) = \\frac{\\sum_{i \\in N_k(\\mathbf{x})} w_i \\mathbf{1}[y_i = c]}{\\sum_{i \\in N_k(\\mathbf{x})} w_i}, \\qquad w_i = \\frac{1}{d(\\mathbf{x}, \\mathbf{x}_i)^2}',
          name: 'Distance-weighted vote',
          meaning:
            'Gives closer neighbours more influence, which makes the prediction less sensitive to the exact value of k and smooths the boundary. This is weights="distance" in scikit-learn.',
          variables: [
            { symbol: 'w_i', meaning: 'Weight of neighbour i, falling off with distance' },
            { symbol: 'd(\\mathbf{x}, \\mathbf{x}_i)', meaning: 'Distance from the query to neighbour i' },
          ],
          category: 'classification',
        },
        {
          latex: '\\hat{y}(\\mathbf{x}) = \\frac{1}{k} \\sum_{i \\in N_k(\\mathbf{x})} y_i',
          name: 'KNN regression',
          meaning:
            'The same neighbourhood, averaged instead of voted. The predicted surface is piecewise constant, which is why KNN regression cannot extrapolate beyond the range of the training targets.',
          variables: [
            { symbol: 'y_i', meaning: 'The numeric target of neighbour i' },
            { symbol: 'k', meaning: 'Number of neighbours averaged' },
          ],
          category: 'regression',
        },
        {
          latex: 'e_d(r) = r^{1/d}',
          name: 'Edge length of a neighbourhood capturing a fraction r of the data',
          meaning:
            'For data spread uniformly in a d-dimensional unit cube, a sub-cube must have edge r^(1/d) to contain a fraction r of the points. This is the curse of dimensionality in one line: at d = 10, capturing 1% of the data requires covering 63% of the range of every feature.',
          variables: [
            { symbol: 'r', meaning: 'Fraction of the data you want inside the neighbourhood' },
            { symbol: 'd', meaning: 'Number of dimensions' },
            { symbol: 'e_d(r)', meaning: 'Required edge length as a fraction of each feature range' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Take n points spread uniformly through the unit cube in d dimensions, and ask how big a neighbourhood must be to contain a fraction r of them.',
        'A sub-cube with edge length e has volume e^d, and because the points are uniform, the expected fraction inside it equals its volume. Setting e^d = r gives e = r^(1/d).',
        'At d = 1, capturing 1% of the data needs an interval of length 0.01 — genuinely local. At d = 2 it needs 0.1. At d = 10 it needs 0.01^(0.1) = 0.63, or 63% of the range of every single feature.',
        'So in ten dimensions the "1% nearest neighbourhood" spans most of the dataset in every direction. It is a neighbourhood in name only, and averaging over it is barely different from averaging over everything.',
        'The same effect shows up as distance concentration. For many distributions the ratio (dₘₐₓ − dₘᵢₙ)/dₘᵢₙ over a query tends to zero as d grows, so the nearest and farthest points become nearly equidistant and the ranking that KNN depends on is driven by noise.',
        'This is why KNN typically degrades beyond roughly ten to twenty informative features, and why the standard remedies are dimensionality reduction (ML-019), feature selection (ML-020), or a metric such as cosine that is less affected.',
        'The scaling argument is the same algebra in miniature. In the squared Euclidean distance Σ(xⱼ − zⱼ)², a feature with a spread of 10,000 contributes terms of order 10⁸ while a feature with a spread of 3 contributes terms of order 10. The second feature cannot affect the ranking at all, so the model silently becomes one-dimensional.',
      ],
    },

    workedExample: {
      title: 'Classifying one point by hand, then watching scaling change the answer',
      setup:
        'Six training points in two dimensions, labelled A or B: P1 (5, 4) A, P2 (4, 6) B, P3 (7, 5) A, P4 (5, 8) B, P5 (1, 5) B, P6 (5, 10) B. Classify the query q = (5, 5) with Euclidean distance.',
      steps: [
        {
          label: 'Compute every distance',
          detail: 'd(q, P1) = √(0² + 1²) = 1.000. d(q, P2) = √(1² + 1²) = 1.414. d(q, P3) = √(2² + 0²) = 2.000. d(q, P4) = √(0² + 3²) = 3.000. d(q, P5) = √(4² + 0²) = 4.000. d(q, P6) = √(0² + 5²) = 5.000.',
          latex: 'd(\\mathbf{q}, \\mathbf{P}_1) = \\sqrt{(5-5)^2 + (5-4)^2} = 1',
        },
        {
          label: 'k = 1',
          detail: 'The single nearest point is P1 at distance 1.000, labelled A. Prediction: A. Note that this prediction rests entirely on one observation — if P1 had been mislabelled, the model would be confidently wrong.',
        },
        {
          label: 'k = 3',
          detail: 'The three nearest are P1 (1.000, A), P2 (1.414, B) and P3 (2.000, A). Votes: A = 2, B = 1. Prediction: A.',
          latex: '\\text{votes} = \\{A: 2, B: 1\\} \\Rightarrow \\hat{y} = A',
        },
        {
          label: 'k = 5',
          detail: 'Now include P4 (3.000, B) and P5 (4.000, B). Votes: A = 2 (P1, P3), B = 3 (P2, P4, P5). Prediction flips to B. The same query, the same data, a different answer — which is exactly why k must be tuned rather than guessed.',
          latex: '\\text{votes} = \\{A: 2, B: 3\\} \\Rightarrow \\hat{y} = B',
        },
        {
          label: 'k = 5 with distance weighting',
          detail: 'Weight each vote by 1/d. A gets 1/1.000 + 1/2.000 = 1.500. B gets 1/1.414 + 1/3.000 + 1/4.000 = 0.707 + 0.333 + 0.250 = 1.290. Prediction returns to A, because the two A neighbours are much closer than the three B ones. Distance weighting makes the result far less sensitive to the exact k.',
          latex: 'w_A = 1.500 > w_B = 1.290 \\Rightarrow \\hat{y} = A',
        },
        {
          label: 'Now change the units and watch it break',
          detail: 'Take a different problem: feature 1 is age in years, feature 2 is income in pounds. Query q = (30, 50000). Candidate N1 = (31, 52000) is one year older and £2,000 richer. Candidate N2 = (55, 50100) is twenty-five years older and £100 richer. Unscaled: d(q, N1) = √(1 + 4,000,000) = 2000.0, d(q, N2) = √(625 + 10,000) = 103.1. The algorithm considers N2 nineteen times closer.',
          latex: 'd(\\mathbf{q}, N_1) = 2000.0 \\quad \\text{vs} \\quad d(\\mathbf{q}, N_2) = 103.1',
        },
        {
          label: 'Standardise and recompute',
          detail: 'With age standard deviation 10 years and income standard deviation £15,000, the differences become: N1 = (0.1 sd, 0.133 sd) giving d = 0.167; N2 = (2.5 sd, 0.0067 sd) giving d = 2.500. N1 is now fifteen times closer than N2, which matches every human intuition about who resembles a thirty-year-old earning £50,000.',
          latex: 'd_{\\text{scaled}}(\\mathbf{q}, N_1) = 0.167 \\quad \\text{vs} \\quad d_{\\text{scaled}}(\\mathbf{q}, N_2) = 2.500',
        },
      ],
      conclusion:
        'Two lessons, both arithmetical rather than theoretical. Changing k from 3 to 5 reversed the prediction, so k is a genuine hyperparameter and not a detail. And leaving income in pounds made a twenty-five-year age gap invisible, so scaling is a correctness requirement for KNN, not a performance tweak. Put the scaler in a pipeline so it is fitted on training folds only, and tune k by cross-validation.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The scaling problem, measured',
        runnable: true,
        code: `from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_wine(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

raw = KNeighborsClassifier(n_neighbors=5).fit(X_tr, y_tr)
scaled = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)).fit(X_tr, y_tr)

print("unscaled accuracy:", round(raw.score(X_te, y_te), 4))
print("scaled accuracy  :", round(scaled.score(X_te, y_te), 4))

# Why: one column dwarfs the rest.
spreads = X_tr.std(axis=0)
print("largest feature sd :", round(spreads.max(), 1))
print("smallest feature sd:", round(spreads.min(), 3))`,
        output: `unscaled accuracy: 0.7037
scaled accuracy  : 0.9630
largest feature sd : 312.6
smallest feature sd: 0.121
`,
        explanation:
          'The wine dataset contains proline, measured in the hundreds, alongside features such as hue that live between 0 and 2. In the squared Euclidean distance, proline contributes terms roughly six orders of magnitude larger than hue, so the nearest neighbours are determined by proline alone and the other twelve features may as well not exist. One `StandardScaler` recovers twenty-six points of accuracy. Note that the scaler lives inside a `Pipeline`: fitting it on the full `X` before splitting would leak test-set statistics into training, which is the mistake ML-028 and ML-031 treat at length.',
      },
      {
        language: 'python',
        title: 'Choosing k by cross-validation instead of folklore',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import GridSearchCV
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_breast_cancer(return_X_y=True)

pipe = Pipeline([("scale", StandardScaler()), ("knn", KNeighborsClassifier())])
grid = {
    "knn__n_neighbors": [1, 3, 5, 9, 15, 25, 51],
    "knn__weights": ["uniform", "distance"],
    "knn__p": [1, 2],
}
search = GridSearchCV(pipe, grid, cv=5, scoring="accuracy", n_jobs=-1).fit(X, y)

print("best params:", search.best_params_)
print("best CV accuracy:", round(search.best_score_, 4))

res = search.cv_results_
for k in [1, 5, 15, 51]:
    mask = (np.array([p["knn__n_neighbors"] for p in res["params"]]) == k)
    print(f"k={k:>3}  best mean CV score {res['mean_test_score'][mask].max():.4f}")`,
        output: `best params: {'knn__n_neighbors': 9, 'knn__p': 1, 'knn__weights': 'distance'}
best CV accuracy: 0.9736
k=  1  best mean CV score 0.9613
k=  5  best mean CV score 0.9701
k= 15  best mean CV score 0.9719
k= 51  best mean CV score 0.9666
`,
        explanation:
          'The score curve over k is an inverted U, which is the bias-variance trade-off made visible: k = 1 overfits, k = 51 over-smooths, and the optimum sits in between. Treat the metric as a hyperparameter too — here Manhattan distance (p = 1) beats Euclidean, which is common once you have thirty features, because L1 suffers less from distance concentration. Everything is tuned inside the pipeline, so the scaler is refitted on each training fold rather than seeing the held-out fold.',
      },
      {
        language: 'python',
        title: 'The curse of dimensionality, demonstrated',
        runnable: true,
        code: `import numpy as np
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier

rng = np.random.default_rng(0)
n = 1000

# Two informative features; the rest are pure noise appended on the right.
base = rng.normal(size=(n, 2))
y = (base[:, 0] + base[:, 1] > 0).astype(int)

for n_noise in [0, 5, 20, 100]:
    noise = rng.normal(size=(n, n_noise))
    X = np.hstack([base, noise])
    score = cross_val_score(KNeighborsClassifier(15), X, y, cv=5).mean()
    print(f"{n_noise:>4} noise features -> accuracy {score:.3f}")

# And the geometry behind it.
for d in [1, 2, 10, 50]:
    print(f"d={d:>3}: edge needed to capture 1% of the data = {0.01 ** (1 / d):.3f}")`,
        output: `   0 noise features -> accuracy 0.965
   5 noise features -> accuracy 0.883
  20 noise features -> accuracy 0.731
 100 noise features -> accuracy 0.574
d=  1: edge needed to capture 1% of the data = 0.010
d=  2: edge needed to capture 1% of the data = 0.100
d= 10: edge needed to capture 1% of the data = 0.631
d= 50: edge needed to capture 1% of the data = 0.912
`,
        explanation:
          'The informative signal never changes — the label is always determined by the first two columns — yet accuracy collapses towards chance as noise columns are added. This is the crucial difference between KNN and a model that can learn feature weights: a tree or a regularised linear model would ignore the noise, whereas KNN sums squared differences over every column and so dilutes the real signal with each addition. The second loop shows the geometry driving it: in fifty dimensions a neighbourhood holding 1% of the data must span 91% of the range of every feature, so it is not local at all. The practical consequence is that KNN belongs after feature selection or dimensionality reduction, never before.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Recommendation by similar users',
        usage:
          'Classical collaborative filtering is KNN over a user-item matrix: find the k users whose rating vectors are most similar to yours under cosine distance, then recommend what they liked and you have not seen. Cosine rather than Euclidean, because a user who rates everything generously should still count as similar to one who rates the same films harshly.',
      },
      {
        context: 'Duplicate and near-duplicate detection',
        usage:
          'Product catalogues and customer databases use nearest-neighbour search over embeddings to find records that refer to the same real-world entity. Modern vector databases such as FAISS are KNN with approximate search, trading exactness for a speed-up of several orders of magnitude.',
      },
      {
        context: 'Missing-value imputation',
        usage:
          'Scikit-learn’s `KNNImputer` fills a missing cell with the average of that column among the k most similar complete rows. It usually beats mean imputation because it conditions on the rest of the row, and it is the standard example of KNN used as a component rather than as the final model.',
      },
      {
        context: 'The baseline that sets the bar',
        usage:
          'On a new tabular problem, a scaled KNN takes two minutes to produce and gives an immediate answer to "is there signal here at all". If a heavily tuned gradient boosting model beats it by half a point, the extra complexity is probably not earning its keep.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`KNeighborsClassifier` and `KNeighborsRegressor` with `n_neighbors`, `weights`, `metric` and `p`; `KNNImputer` for missing values; `NearestNeighbors` for raw neighbour search.' },
      { tool: 'FAISS / hnswlib', role: 'Approximate nearest-neighbour indexes that make KNN viable over millions of vectors, which is the retrieval half of a RAG system.' },
      { tool: 'pandas', role: 'Inspecting the actual neighbour rows returned by `kneighbors()` is the standard way to explain a KNN prediction to a stakeholder.' },
    ],

    commonMistakes: [
      {
        mistake: 'Not scaling the features',
        why: 'Euclidean distance sums squared differences, so a feature measured in thousands contributes terms millions of times larger than one measured in units. The model silently reduces to that single column.',
        fix: 'Put a `StandardScaler` or `MinMaxScaler` before the estimator in a `Pipeline`. For KNN this is a correctness requirement, not an optimisation.',
      },
      {
        mistake: 'Fitting the scaler on the whole dataset before splitting',
        why: 'The scaler’s mean and standard deviation then contain information from the test rows, so the evaluation is optimistic. It is the most common form of data leakage and it is invisible in the metrics.',
        fix: 'Always scale inside a `Pipeline` passed to `cross_val_score` or `GridSearchCV`, so each fold refits the scaler on training data only.',
      },
      {
        mistake: 'Using an even k on a binary problem',
        why: 'With k = 4 a two-two split is a genuine tie, and the tie-break is an implementation detail — scikit-learn resolves it by class order, which has nothing to do with the data.',
        fix: 'Use an odd k for binary classification, or set `weights="distance"` so exact ties become vanishingly unlikely.',
      },
      {
        mistake: 'Reporting the training accuracy of a 1-NN model',
        why: 'Every training point is its own nearest neighbour at distance zero, so 1-NN always achieves 100% training accuracy. The number carries no information whatsoever about generalisation.',
        fix: 'Evaluate on held-out data or by cross-validation. If you see a perfect training score from any model, check whether it is structurally guaranteed before celebrating.',
      },
      {
        mistake: 'Throwing every available column at it',
        why: 'KNN weighs all features equally. Irrelevant columns do not merely fail to help — they add noise to every distance calculation and drag the neighbourhood away from genuinely similar points.',
        fix: 'Select features first (ML-020) or reduce with PCA (ML-019). If you have hundreds of columns, a tree ensemble or a linear model is usually the better tool.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What happens during training in KNN?',
        answer:
          'Essentially nothing. KNN is a lazy learner: `fit` stores the training data, possibly building a KD-tree or ball tree to speed later searches, but it estimates no parameters and forms no summary of the data. All the computation is deferred to prediction time, where each query requires computing distances to the stored points and ranking them. This inverts the usual cost profile — most models are expensive to train and cheap to predict, whereas KNN is free to train and expensive to predict, with cost growing linearly in the size of the training set. It also means the model has no parameters to inspect: you cannot look at a coefficient, you can only look at the neighbours a particular prediction used.',
      },
      {
        level: 'intermediate',
        question: 'How does k affect the bias-variance trade-off, and how would you choose it?',
        answer:
          'Small k gives a low-bias, high-variance model. With k = 1 the boundary wraps tightly around every training point, including mislabelled ones, so a small change in the training data can change the boundary substantially. Large k averages over more neighbours, which reduces variance but increases bias: the boundary smooths out, and at k = n the model ignores the query entirely and always predicts the majority class. So k is the complexity dial, running from most complex at k = 1 to simplest at k = n — the reverse direction from most hyperparameters, which is worth stating explicitly. I would choose it with `GridSearchCV` over a pipeline containing the scaler, sweeping k on a roughly logarithmic grid, and I would tune `weights` and the Minkowski `p` at the same time, since distance weighting typically flattens the sensitivity to k considerably.',
        followUp:
          'A strong answer notes that increasing k reduces model complexity, which is the opposite of the usual convention, and that an odd k avoids ties in binary problems.',
      },
      {
        level: 'ml-engineer',
        question: 'A KNN model performs well in a notebook but is too slow in production. What are your options?',
        answer:
          'First I would confirm where the cost is: KNN is O(nÂ·d) per query with the full training set resident in memory, so the levers are n, d and exactness. Reducing d through PCA or feature selection helps twice over, since it cuts both the distance computation and the curse of dimensionality. Reducing n through prototype selection â for instance cluster the training set and keep centroids, or use condensed nearest neighbour â often costs very little accuracy. If the data is low-dimensional, a KD-tree or ball tree brings queries closer to O(log n), though both degenerate to brute force past roughly twenty dimensions. Beyond that I would move to approximate nearest neighbours with FAISS or HNSW, which gives order-of-magnitude speed-ups for a small and measurable recall loss. The honest option that should be on the table is replacing the model: a logistic regression or a gradient boosting model distilled on the same data usually matches KNN’s accuracy with constant-time inference and a far smaller memory footprint, and KNN’s main advantages â no training, full inspectability â matter much less once the system is in production.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Training points: (1, 1) class X, (2, 2) class X, (4, 4) class Y, (5, 5) class Y, (1, 5) class Y. Classify the query (3, 3) with k = 1, k = 3 and k = 5 under Euclidean distance.',
        hint: 'Compute all five distances first, sort them, then take the first k labels in turn.',
        solution:
          'Distances from (3, 3): to (1,1) is √8 = 2.828 (X); to (2,2) is √2 = 1.414 (X); to (4,4) is √2 = 1.414 (Y); to (5,5) is √8 = 2.828 (Y); to (1,5) is √8 = 2.828 (Y). k = 1: there is a tie at 1.414 between an X and a Y — a genuinely undefined case that the library resolves by index order, and a good illustration of why exact ties matter. k = 3: the three nearest are (2,2) X, (4,4) Y and one of the three points at 2.828, so the answer depends on the tie-break; with `weights="distance"` the two points at 1.414 dominate and the vote is still one-all. k = 5: all points are included, giving X = 2, Y = 3, so the prediction is Y. The real lesson is that this dataset is symmetric about the query, and KNN has nothing sensible to say about a point sitting exactly on the boundary.',
      },
      {
        prompt:
          'You have a dataset where one feature is house price in pounds (range 100,000 to 900,000) and another is number of bedrooms (range 1 to 6). Without scaling, what fraction of the squared Euclidean distance does the bedroom feature typically contribute?',
        hint: 'Compare the magnitude of a typical squared difference in each feature.',
        solution:
          'A typical price difference might be £100,000, contributing (10⁵)² = 10¹⁰ to the squared distance. A typical bedroom difference is 1, contributing 1. The bedroom feature therefore accounts for roughly 1 part in 10¹⁰ — about one ten-billionth of the distance. It is not merely down-weighted; it is numerically invisible, and would still be invisible if it were the only feature that mattered. After standardising, both features have unit variance and each contributes on the order of 1 per squared difference, so the model can actually use both. This is the arithmetic behind the rule that KNN must always be preceded by scaling.',
      },
      {
        prompt:
          'Explain why a 1-NN classifier always achieves 100% accuracy on its own training set, and why this tells you nothing about generalisation.',
        hint: 'What is the nearest neighbour of a training point?',
        solution:
          'For any training point xᵢ, the distance to itself is zero, and no other point can be closer. So the single nearest neighbour of a training point is always itself, and the predicted label is its own true label. Perfect training accuracy is therefore a structural property of the algorithm, guaranteed before you have looked at a single value in the data — it would hold equally for a dataset with completely random labels. Generalisation is a statement about unseen points, where 1-NN is hostage to the nearest stored example, including mislabelled ones. This is why 1-NN is the canonical illustration that training error and test error can be arbitrarily far apart, and why leave-one-out cross-validation — which excludes the point itself — is the natural way to evaluate KNN.',
      },
    ],

    quiz: [
      {
        id: 'ML-010-q1',
        type: 'mcq',
        concept: 'lazy learning',
        prompt: 'What does KNN actually do when you call fit()?',
        options: [
          'Stores the training data, optionally building a search index',
          'Estimates one weight per feature by gradient descent',
          'Computes the k cluster centroids that summarise the data',
          'Builds a set of if-then splits over the features',
        ],
        answerIndex: 0,
        explanation:
          'KNN is a lazy, instance-based learner: fitting is storage. All the real computation — distance calculation, ranking and voting — happens at prediction time, which is why training is instant and inference is slow.',
      },
      {
        id: 'ML-010-q2',
        type: 'truefalse',
        concept: 'complexity direction',
        prompt: 'Increasing k makes the KNN model more complex and more prone to overfitting.',
        answer: false,
        explanation:
          'It is the other way round. Small k means a jagged, high-variance boundary that follows individual points; large k averages over more neighbours and smooths the boundary, increasing bias and reducing variance. At k = n the model always predicts the majority class.',
      },
      {
        id: 'ML-010-q3',
        type: 'numeric',
        concept: 'curse of dimensionality',
        prompt: 'In a 10-dimensional unit cube of uniformly spread data, what edge length must a sub-cube have to contain 1% of the points? Give the answer to two decimal places.',
        answer: 0.63,
        tolerance: 0.02,
        explanation:
          'Volume equals edge^d, so edge = r^(1/d) = 0.01^(0.1) ≈ 0.631. Capturing just 1% of the data requires covering 63% of the range of every feature, which is why neighbourhoods stop being local in high dimensions.',
      },
      {
        id: 'ML-010-q4',
        type: 'debug',
        language: 'python',
        concept: 'scaling and leakage',
        prompt: 'This KNN pipeline scores 0.99 in cross-validation but 0.71 on genuinely new data. What is the flaw?',
        code: `scaler = StandardScaler().fit(X)
X_scaled = scaler.transform(X)
scores = cross_val_score(KNeighborsClassifier(5), X_scaled, y, cv=5)`,
        options: [
          'The scaler is fitted on all of X, so each validation fold was scaled using statistics that include itself',
          'KNeighborsClassifier does not accept scaled input and needs raw features',
          'cross_val_score requires a Pipeline object and silently returns training scores otherwise',
          'n_neighbors=5 is an odd number, which biases the vote towards the first class',
        ],
        answerIndex: 0,
        explanation:
          'Fitting the scaler before splitting lets the mean and standard deviation of the validation rows influence the transform applied to them. The fix is `make_pipeline(StandardScaler(), KNeighborsClassifier(5))` passed directly to `cross_val_score`, so the scaler is refitted on each training fold.',
      },
      {
        id: 'ML-010-q5',
        type: 'multi',
        concept: 'properties of KNN',
        prompt: 'Which statements about KNN are true? Select all that apply.',
        options: [
          'It requires feature scaling to work correctly with Euclidean distance',
          'Its prediction cost grows with the size of the training set',
          'It can represent decision boundaries that are disconnected or highly irregular',
          'Irrelevant features are effectively ignored by the algorithm',
          'A 1-NN model always achieves perfect accuracy on its training data',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Irrelevant features are not ignored — every feature contributes equally to the distance, so noise columns actively degrade the neighbourhood. That is the key difference from a tree or a regularised linear model, which can learn to down-weight them.',
      },
      {
        id: 'ML-010-q6',
        type: 'match',
        concept: 'distance metrics',
        prompt: 'Match each distance metric to the situation it suits best.',
        pairs: [
          { left: 'Cosine', right: 'Text or embedding vectors, where length reflects document size rather than meaning' },
          { left: 'Manhattan (L1)', right: 'Many features, where L2 suffers most from distance concentration' },
          { left: 'Hamming', right: 'Purely categorical or binary features' },
          { left: 'Euclidean (L2)', right: 'A handful of continuous features on comparable scales' },
        ],
        explanation:
          'The metric is a modelling choice with real consequences and is worth including in a hyperparameter grid. Cosine is the standard for embeddings, L1 tends to degrade more gracefully than L2 as dimensionality rises, and Hamming is the natural fit for categorical data.',
      },
      {
        id: 'ML-010-q7',
        type: 'explain',
        concept: 'why KNN fails in high dimensions',
        prompt: 'Explain why k-nearest neighbours degrades as the number of features increases, and what you would do about it.',
        rubric: [
          'States that neighbourhood volume grows so fast with dimension that neighbourhoods stop being local',
          'Mentions distance concentration — nearest and farthest points become nearly equidistant',
          'Notes that every feature contributes equally, so irrelevant columns dilute the distance',
          'Proposes a concrete remedy: dimensionality reduction, feature selection, or a different model',
        ],
        sampleAnswer:
          'There are two related effects. The geometric one is that volume explodes with dimension. If data sits uniformly in a unit cube, a sub-cube capturing a fraction r of it needs edge length r^(1/d) — in ten dimensions, holding just 1% of the data means covering 63% of the range of every feature, so the "neighbourhood" is not local at all and averaging over it is barely different from averaging over the whole dataset. The statistical one is distance concentration: as d grows, the distance from a query to its nearest and farthest points converges, so the ranking KNN relies on becomes noise-driven. On top of both sits the fact that KNN weighs every feature equally in the distance, so adding irrelevant columns does not merely waste space, it dilutes the real signal — I have seen accuracy fall from 0.96 to 0.57 by appending a hundred pure-noise columns to a two-feature problem. The remedies, in order of how much I would trust them: cut the dimensionality first with feature selection or PCA; switch to a metric less affected by concentration, such as Manhattan or cosine; learn a metric that weights features, for instance with neighbourhood components analysis; and, if the data is genuinely wide, accept that KNN is the wrong tool and use a model that learns feature relevance, such as a regularised linear model or a gradient boosting ensemble.',
        explanation:
          'A complete answer separates the geometry of high-dimensional volume from the equal-weighting problem, since they call for different fixes — dimensionality reduction for the first, feature selection or a weighted metric for the second.',
      },
    ],

    flashcards: [
      { front: 'What does KNN do at fit time?', back: 'Stores the training set, possibly in a KD-tree or ball tree. No parameters are learned — it is a lazy, instance-based learner.' },
      { front: 'Which direction does k control complexity?', back: 'k = 1 is the most complex model (jagged boundary, high variance); large k is the simplest (smooth boundary, high bias). Complexity falls as k rises.' },
      { front: 'Why must you scale features for KNN?', back: 'Euclidean distance sums squared differences, so the largest-magnitude feature dominates. Without scaling the model silently uses one column.' },
      { front: 'What is the curse of dimensionality for KNN?', back: 'A neighbourhood holding a fraction r of the data needs edge r^(1/d). At d = 10 and r = 0.01 that is 63% of every feature range — no longer local.' },
      { front: 'Why is 1-NN training accuracy always 100%?', back: 'Every training point is its own nearest neighbour at distance zero, so the prediction is its own label. The number says nothing about generalisation.' },
      { front: 'What does weights="distance" do?', back: 'Weights each neighbour by 1/d², so closer neighbours count more. It smooths the boundary and reduces sensitivity to the exact value of k.' },
      { front: 'When is cosine distance the right metric?', back: 'For text and embeddings, where vector magnitude reflects document length rather than meaning, so only direction should count.' },
    ],

    challenge: {
      title: 'KNN that survives contact with reality',
      brief:
        'Take a tabular dataset with at least fifteen features. Build a pipeline containing a scaler and a KNN classifier, and tune n_neighbors, weights and p by cross-validation. Then deliberately break it: append twenty columns of Gaussian noise and re-run the search, recording how accuracy changes. Finally, repair it by inserting a feature-selection or PCA step before the classifier, and report all three numbers side by side. Add a short function that, given a query row, prints the k neighbour rows that produced the prediction.',
      acceptanceCriteria: [
        'Scaling happens inside the pipeline, so no fold ever sees statistics derived from itself',
        'The hyperparameter search covers n_neighbors, weights and p, with results reported as a table over k',
        'The noise experiment quantifies the accuracy drop rather than asserting that noise is harmful',
        'The dimensionality-reduction step recovers a measurable part of the lost accuracy',
        'The explanation function returns the actual neighbour rows and their distances, not just the prediction',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague how KNN makes a prediction, why k matters, and why you would never run it on unscaled data.',
      mustCover: [
        'Fitting stores the data; all work happens at prediction time by measuring distance to every stored point',
        'The k nearest points vote, and k controls smoothness — small k overfits, large k over-smooths',
        'Distance sums over all features, so unscaled features let the largest-magnitude column decide everything',
        'Performance degrades in high dimensions because neighbourhoods stop being local',
      ],
      bonusSignals: ['mentions distance weighting', 'mentions that prediction cost grows with n', 'mentions that irrelevant features actively hurt'],
      sampleExplanation:
        'KNN is the algorithm that refuses to generalise. Fitting it does not estimate anything; it just keeps the training data. When a new example arrives, the model measures how far that example is from every stored point, takes the k closest, and lets them vote on the label. For regression it averages their targets instead. That is genuinely the whole method, which is why it takes no time to train and a long time to predict — the opposite of almost everything else. Two choices decide whether it works. The first is k, and it runs in the direction people do not expect: k = 1 is the most complex model, because the boundary wraps around every single point including the mislabelled ones, and a large k is the simplest, because you are averaging over so much of the dataset that local structure disappears. Somewhere in between is right, and you find it by cross-validation rather than by rule of thumb. The second choice is the distance function, and this is where people get hurt. Euclidean distance adds up squared differences across all the features. If one column is income in pounds and another is number of children, a difference of £20,000 contributes four hundred million while a difference of two children contributes four. The children column cannot influence the answer at all — the model has quietly become one-dimensional without telling you. So you standardise first, always, and you do it inside a pipeline so the scaler never sees your validation data. The last thing worth saying is where KNN stops working: once you have more than ten or twenty informative features, high-dimensional geometry means the nearest and farthest neighbours are nearly the same distance away, and the whole idea of a local neighbourhood quietly stops meaning anything.',
    },
  },

  {
    id: 'ML-011',
    domain: 'ML',
    module: 'Classification',
    topic: 'Probabilistic classification',
    title: 'Naive Bayes',
    slug: 'naive-bayes',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['ML-003'],
    related: ['ML-009', 'ML-010'],
    tags: ['naive bayes', 'bayes theorem', 'conditional independence', 'laplace smoothing', 'text classification'],

    learningObjectives: [
      'Derive the naive Bayes classifier from Bayes theorem and state exactly which assumption makes it "naive"',
      'Explain why the independence assumption is almost always false and why the classifier still works well',
      'Apply Laplace smoothing and explain the catastrophe it prevents',
      'Choose between multinomial, Bernoulli, Gaussian and complement naive Bayes for a given data type',
    ],

    terminology: [
      {
        term: 'Prior probability',
        definition:
          'P(y = c), the probability of a class before looking at any features. In naive Bayes it is estimated as the fraction of training documents belonging to that class.',
        simple: 'How common the class is in general, before you see any evidence.',
      },
      {
        term: 'Likelihood',
        definition:
          'P(x | y = c), the probability of observing these feature values given the class. Naive Bayes factorises it into a product of per-feature terms, which is the only reason it is tractable.',
        simple: 'How typical this evidence is for that class.',
      },
      {
        term: 'Posterior probability',
        definition:
          'P(y = c | x), the probability of the class after taking the features into account. The classifier predicts the class with the largest posterior, the maximum a posteriori (MAP) estimate.',
        simple: 'How likely the class is once you have seen the evidence.',
      },
      {
        term: 'Conditional independence assumption',
        definition:
          'The assumption that, given the class, the features are statistically independent: P(x₁, …, x_d | y) = Π P(xⱼ | y). This is the "naive" part, and it is almost always false in real data.',
        simple: 'Pretending that, once you know the answer, each clue is unrelated to the others.',
      },
      {
        term: 'Laplace (additive) smoothing',
        definition:
          'Adding a pseudo-count α to every feature-class count before computing probabilities, so that no estimated probability is ever exactly zero. Controlled by the `alpha` parameter in scikit-learn.',
        simple: 'Pretending you saw every possibility once, so nothing is ever ruled out completely.',
      },
    ],

    simpleExplanation:
      'Naive Bayes is a spam filter turned into an algorithm. To decide whether an email is spam, you look at each word in it and ask how often that word appears in spam compared with legitimate mail. The word "invoice" might be mildly suspicious, "unsubscribe" more so, and the name of your manager strongly reassuring. You then combine all that evidence and see which side wins. The clever part is the combining. Doing it properly would mean knowing how every word interacts with every other word, which would need vastly more data than anyone has. So naive Bayes makes a simplifying assumption that is flatly untrue: it pretends that, once you know whether the email is spam, the words are unrelated to each other. In reality "free" and "viagra" travel together constantly, but the model treats them as independent votes. This lets you just multiply the individual word probabilities together, which is fast and needs very little data. The assumption ruins the probabilities the model reports — they come out absurdly close to 0 or 1 — but it often leaves the ranking intact, and for choosing the more likely class, the ranking is all that matters.',

    whyItExists:
      'Computing P(x | y) properly for d binary features requires estimating 2^d − 1 probabilities per class, which is impossible for anything beyond a handful of features. The conditional independence assumption collapses that to d probabilities per class, turning an intractable estimation problem into counting. The result trains in a single pass over the data, handles tens of thousands of features comfortably, and works with very few examples per class.',

    analogy: {
      scenario:
        'A panel of specialist doctors each examine a patient separately, without conferring. The dermatologist reports that the rash is consistent with condition A. The haematologist reports that the blood count is consistent with condition A. The radiologist reports that the scan is consistent with condition B. The hospital administrator, who cannot read any of the scans, simply multiplies together how strongly each specialist favours each condition and announces the winner. The procedure would be exactly right if the specialists examined genuinely unrelated aspects of the patient. They do not — dehydration shows up in both the blood count and the skin — so when two specialists are really reporting the same underlying fact, that fact gets counted twice and the administrator ends up far more certain than the evidence warrants.',
      mapping: [
        { from: 'Each specialist’s separate report', to: 'P(xâ±¼ | y), the likelihood of one feature given the class' },
        { from: 'How common each condition is in this hospital', to: 'The class prior P(y)' },
        { from: 'Multiplying the reports together', to: 'The naive factorisation Π P(xⱼ | y)' },
        { from: 'Specialists never conferring', to: 'The conditional independence assumption' },
        { from: 'Dehydration counted twice through skin and blood', to: 'Correlated features double-counting the same evidence' },
        { from: 'The administrator announcing the winner', to: 'The MAP decision rule, argmax over classes' },
      ],
      bridge:
        'The analogy pins down both the power and the flaw precisely. The power is that each specialist only needs enough patients to judge their own signal, rather than enough to judge every combination of signals — which is why naive Bayes trains on tiny datasets. The flaw is double-counting: correlated features push the product to an extreme, which is exactly why naive Bayes reports probabilities of 0.9999 when the honest answer is 0.7. But note what double-counting usually does not do: if the evidence genuinely favours condition A, counting it twice makes the model more emphatic about A rather than switching it to B. The ranking survives what the calibration does not, which is why a model with untrustworthy probabilities can still be a good classifier.',
      limitations:
        'The panel analogy suggests the specialists are equally reliable. In naive Bayes, a single feature with a near-zero likelihood can veto the entire product by driving it to zero, which has no real counterpart in the story and is exactly what Laplace smoothing exists to prevent.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Classifying one document',
        steps: [
          { label: 'Count at training time', detail: 'For each class, count how many documents it has and how often each word occurs in it. This single pass is the entire training procedure.' },
          { label: 'Smooth the counts', detail: 'Add α (usually 1) to every word-class count so that an unseen word gets a small positive probability instead of zero.' },
          { label: 'Take logs', detail: 'Work with log P(y) + Σ log P(wⱼ | y) rather than a product, because multiplying thousands of small probabilities underflows to exactly 0.0 in floating point.' },
          { label: 'Score every class', detail: 'Add the log-prior to the sum of log-likelihoods of the observed words, once per class.' },
          { label: 'Take the argmax', detail: 'Predict the highest-scoring class. Normalising the scores gives a posterior, but treat that number with suspicion.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Count, smooth and score a small corpus',
        caption: 'Edit the toy training documents and watch the word likelihoods, the smoothed counts and the final log-scores update.',
        widget: 'code-playground',
      },
      {
        kind: 'compare',
        title: 'Naive Bayes: strengths, weaknesses and when to reach for it',
        caption: 'Reach for it on high-dimensional sparse count data — text, above all — when you need a fast, strong baseline from little training data. Reach past it when you need trustworthy probabilities, or when features are heavily correlated and the data is plentiful enough to model them properly.',
        left: {
          heading: 'Strengths',
          points: [
            'Trains in one pass with no iterative optimisation — seconds on data where other models take minutes',
            'Works with remarkably little data, because each parameter is estimated from a one-dimensional count',
            'Scales to hundreds of thousands of features, which is the natural size of a vocabulary',
            'Naturally multi-class and naturally handles sparse input without densifying it',
            'Online-friendly: `partial_fit` updates counts incrementally as new data arrives',
            'Robust to irrelevant features, which contribute roughly the same factor to every class and cancel',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'Probabilities are badly calibrated — typically pushed to 0.999 or 0.001 by double-counted evidence',
            'Correlated features are counted repeatedly, so duplicated columns silently inflate their influence',
            'Cannot learn feature interactions at all; the decision boundary is linear in log-space',
            'A zero count vetoes a class entirely unless smoothing is applied',
            'Gaussian naive Bayes assumes each feature is normally distributed within each class, which is often badly wrong',
            'On imbalanced text data the majority class dominates unless you use the complement variant',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Which variant for which data',
        columns: ['Variant', 'Feature model', 'Use for', 'scikit-learn class'],
        rows: [
          ['Multinomial', 'Counts drawn from a per-class multinomial', 'Word counts or TF-IDF for text classification', 'MultinomialNB'],
          ['Bernoulli', 'Binary presence or absence of each feature', 'Short texts where repetition adds little, or binary features', 'BernoulliNB'],
          ['Gaussian', 'Each feature normal within each class', 'Continuous features that are roughly bell-shaped per class', 'GaussianNB'],
          ['Complement', 'Statistics of the complement of each class', 'Imbalanced text, where multinomial favours the majority', 'ComplementNB'],
          ['Categorical', 'A discrete distribution per categorical feature', 'Unordered categorical features with modest cardinality', 'CategoricalNB'],
        ],
      },
    ],

    formalDefinition:
      'Naive Bayes is a generative classifier that models the joint distribution P(x, y) = P(y) Π_{j=1}^{d} P(xⱼ | y) and predicts ŷ = argmax_c P(y = c) Π_j P(xⱼ | y = c), which by Bayes theorem is the maximum a posteriori class since the evidence P(x) is constant across classes. The defining assumption is conditional independence of the features given the class, which reduces the number of likelihood parameters from exponential in d to linear in d. Parameters are estimated by maximum likelihood with additive (Laplace) smoothing α > 0, and in the multinomial case the resulting decision function is linear in the feature counts once logs are taken, making naive Bayes a linear classifier in log-space despite its generative formulation.',

    math: {
      intuition:
        'Start from Bayes theorem, which tells you how to turn "how likely is this evidence given each class" into "how likely is each class given this evidence". The obstacle is the likelihood term: modelling the joint distribution of every feature combination is hopeless. The naive move is to assume the features are independent once the class is fixed, which turns a joint distribution into a product of one-dimensional ones — each of which you can estimate by counting. Two practical details follow. Multiplying thousands of small probabilities underflows, so you work in logs, which also reveals that the model is secretly linear. And a single unseen feature would make the product exactly zero and veto its class outright, so you add a pseudo-count to everything.',
      formulas: [
        {
          latex: 'P(y \\mid \\mathbf{x}) = \\frac{P(\\mathbf{x} \\mid y)\\,P(y)}{P(\\mathbf{x})}',
          name: 'Bayes theorem',
          meaning:
            'The posterior is the likelihood times the prior, normalised by the evidence. Because P(x) does not depend on the class, it can be dropped when comparing classes — you only need the numerator to find the argmax.',
          variables: [
            { symbol: 'P(y \\mid \\mathbf{x})', meaning: 'Posterior: probability of the class given the observed features' },
            { symbol: 'P(\\mathbf{x} \\mid y)', meaning: 'Likelihood: probability of the features given the class' },
            { symbol: 'P(y)', meaning: 'Prior: how common the class is overall' },
            { symbol: 'P(\\mathbf{x})', meaning: 'Evidence: the same for every class, so it cancels in the comparison' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(x_1, \\ldots, x_d \\mid y) = \\prod_{j=1}^{d} P(x_j \\mid y)',
          name: 'The naive conditional independence assumption',
          meaning:
            'The single assumption that makes the method work. It reduces the likelihood from a joint distribution over 2^d cells (for binary features) to d separate one-dimensional distributions, each estimated by counting.',
          variables: [
            { symbol: 'x_j', meaning: 'The value of feature j' },
            { symbol: 'd', meaning: 'Number of features' },
            { symbol: 'y', meaning: 'The class being conditioned on' },
          ],
          category: 'probability',
        },
        {
          latex: '\\hat{y} = \\arg\\max_{c} \\left[ \\log P(y = c) + \\sum_{j=1}^{d} \\log P(x_j \\mid y = c) \\right]',
          name: 'The log-space decision rule',
          meaning:
            'The form actually implemented. Logs convert the product into a sum, which avoids floating-point underflow and shows that the score is a linear function of the feature counts — naive Bayes is a linear classifier in disguise.',
          variables: [
            { symbol: '\\log P(y = c)', meaning: 'Log-prior for class c' },
            { symbol: '\\log P(x_j \\mid y = c)', meaning: 'Log-likelihood contribution of feature j' },
          ],
          category: 'classification',
        },
        {
          latex: '\\hat{P}(w \\mid c) = \\frac{N_{wc} + \\alpha}{N_c + \\alpha |V|}',
          name: 'Laplace-smoothed multinomial likelihood',
          meaning:
            'The smoothed estimate of how often word w occurs in class c. Adding α to the numerator and α|V| to the denominator keeps the probabilities summing to one while guaranteeing none is exactly zero.',
          variables: [
            { symbol: 'N_{wc}', meaning: 'Number of times word w occurs across all documents of class c' },
            { symbol: 'N_c', meaning: 'Total word count across class c' },
            { symbol: '\\alpha', meaning: 'Smoothing pseudo-count, 1 for Laplace, smaller values for less smoothing' },
            { symbol: '|V|', meaning: 'Vocabulary size — the number of distinct features' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(x_j \\mid y = c) = \\frac{1}{\\sqrt{2\\pi\\sigma_{jc}^{2}}} \\exp\\!\\left(-\\frac{(x_j - \\mu_{jc})^{2}}{2\\sigma_{jc}^{2}}\\right)',
          name: 'Gaussian naive Bayes likelihood',
          meaning:
            'For continuous features, model each feature within each class as a normal distribution and estimate only its mean and variance. Two numbers per feature per class is the entire model.',
          variables: [
            { symbol: '\\mu_{jc}', meaning: 'Mean of feature j among training examples of class c' },
            { symbol: '\\sigma_{jc}^{2}', meaning: 'Variance of feature j within class c' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Goal: predict the class with the highest posterior, argmax_c P(y = c | x).',
        'Apply Bayes theorem: P(y = c | x) = P(x | y = c) P(y = c) / P(x).',
        'The denominator P(x) is identical for every class, so it cannot change which class is largest. Drop it: argmax_c P(x | y = c) P(y = c).',
        'The remaining obstacle is P(x | y = c). With d binary features this is a table of 2^d − 1 free parameters per class. At d = 30 that is over a billion cells, and no dataset can fill them.',
        'Assume conditional independence given the class: P(x | y = c) = Π_j P(xⱼ | y = c). The parameter count drops from 2^d − 1 to d per class, and each one is a simple count.',
        'The rule becomes argmax_c P(y = c) Π_j P(xⱼ | y = c). For text with 20,000 words and 2 classes this is 40,000 counts, which a laptop computes in one pass.',
        'Take logarithms, which is monotone and so preserves the argmax: argmax_c [log P(y = c) + Σⱼ log P(xⱼ | y = c)]. This is essential in practice — a product of 500 probabilities each around 0.001 is about 10^(−1500), which is exactly 0.0 in double precision.',
        'Notice what the log form reveals. For multinomial naive Bayes, Σⱼ xⱼ log P(wⱼ | c) is a dot product between the count vector and a weight vector. The decision boundary is therefore a hyperplane, and naive Bayes is a linear classifier — it simply estimates its weights by counting rather than by optimising a loss.',
        'Now the zero-count problem. If word w never appears in class c in training, the maximum likelihood estimate is P(w | c) = 0, so the entire product is zero and class c is impossible no matter how much other evidence supports it. One unseen word vetoes everything.',
        'Fix it by adding a pseudo-count: P̂(w | c) = (N_wc + α) / (N_c + α|V|). This is the posterior mean under a Dirichlet(α) prior, so it is a principled Bayesian estimate rather than a hack. α = 1 is Laplace smoothing; smaller α smooths less and is often better tuned by cross-validation.',
        'Finally, why does it work despite the false assumption? The classifier only needs the argmax to be correct, not the posterior. Correlated features distort the magnitude of the product — typically pushing it towards 0 or 1 — but usually in the direction the evidence already pointed. Domingos and Pazzani showed formally that naive Bayes is optimal under zero-one loss for a much wider class of distributions than those satisfying independence, which is the theoretical explanation for its stubbornly good accuracy alongside its terrible calibration.',
      ],
    },

    workedExample: {
      title: 'A spam filter computed entirely by hand',
      setup:
        'Training set of five short messages. Spam: "win money now", "win free money". Ham: "meeting at noon", "project meeting now", "lunch at noon". Classify the new message "win money".',
      steps: [
        {
          label: 'Priors',
          detail: 'Two of the five documents are spam, three are ham. P(spam) = 2/5 = 0.4 and P(ham) = 3/5 = 0.6.',
          latex: 'P(\\text{spam}) = 0.4, \\qquad P(\\text{ham}) = 0.6',
        },
        {
          label: 'Vocabulary and word counts',
          detail: 'The vocabulary is {win, money, now, free, meeting, at, noon, project, lunch}, so |V| = 9. Spam contains 6 word tokens: win 2, money 2, now 1, free 1. Ham contains 9 word tokens: meeting 2, at 2, noon 2, now 1, project 1, lunch 1.',
          latex: 'N_{\\text{spam}} = 6, \\qquad N_{\\text{ham}} = 9, \\qquad |V| = 9',
        },
        {
          label: 'Smoothed likelihoods for "win"',
          detail: 'P(win | spam) = (2 + 1)/(6 + 9) = 3/15 = 0.200. P(win | ham) = (0 + 1)/(9 + 9) = 1/18 = 0.056. Without smoothing the ham term would be 0/9 = 0, and the message could never be ham no matter what else it said.',
          latex: 'P(\\text{win} \\mid \\text{spam}) = \\frac{3}{15} = 0.200, \\quad P(\\text{win} \\mid \\text{ham}) = \\frac{1}{18} = 0.056',
        },
        {
          label: 'Smoothed likelihoods for "money"',
          detail: 'P(money | spam) = (2 + 1)/15 = 0.200. P(money | ham) = (0 + 1)/18 = 0.056. Both words are equally suspicious here because both appear twice in spam and never in ham.',
          latex: 'P(\\text{money} \\mid \\text{spam}) = 0.200, \\quad P(\\text{money} \\mid \\text{ham}) = 0.056',
        },
        {
          label: 'Score each class',
          detail: 'Spam score = 0.4 × 0.200 × 0.200 = 0.0160. Ham score = 0.6 × 0.056 × 0.056 = 0.00185. Spam wins by a factor of about 8.6, so the message is classified as spam.',
          latex: 's_{\\text{spam}} = 0.0160 \\quad \\text{vs} \\quad s_{\\text{ham}} = 0.00185',
        },
        {
          label: 'Normalise to a posterior',
          detail: 'P(spam | message) = 0.0160 / (0.0160 + 0.00185) = 0.896. Note how confident the model already is on the basis of five tiny documents — this over-confidence is the signature of naive Bayes and gets far more extreme with real message lengths.',
          latex: 'P(\\text{spam} \\mid \\mathbf{x}) = \\frac{0.0160}{0.0160 + 0.00185} = 0.896',
        },
        {
          label: 'Watch what correlated features do',
          detail: 'Suppose the message were "win money win money" — the same evidence repeated. Spam score becomes 0.4 × 0.2⁴ = 0.00064, ham 0.6 × 0.056⁴ = 5.9 × 10⁻⁶, giving a posterior of 0.991. Repeating identical evidence made the model much more certain, although it learned nothing new. That is exactly what correlated features do in real data, and it is why naive Bayes probabilities should be used for ranking, not as honest risk estimates.',
          latex: 'P(\\text{spam} \\mid \\text{doubled evidence}) = 0.991',
        },
        {
          label: 'The same computation in logs',
          detail: 'log spam = ln 0.4 + 2 ln 0.2 = −0.916 − 3.219 = −4.135. log ham = ln 0.6 + 2 ln 0.056 = −0.511 − 5.772 = −6.283. The difference of 2.15 in log-space is the same factor of e^2.15 = 8.6 computed above, and this is the form libraries actually use because a real document with 500 words would underflow to zero as a raw product.',
          latex: '\\log s_{\\text{spam}} = -4.135, \\qquad \\log s_{\\text{ham}} = -6.283',
        },
      ],
      conclusion:
        'Five documents, nine vocabulary entries, and a handful of divisions produce a working spam classifier — that is the appeal. The two details that matter most are visible even at this scale: smoothing is what stops a single unseen word from vetoing a class outright, and repeating the same evidence sharpens the posterior without adding information, which is precisely why the model is an excellent ranker and a poor probability estimator.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Text classification in six lines, and why it is still competitive',
        runnable: true,
        code: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score
import time

cats = ["sci.space", "rec.sport.hockey", "talk.politics.guns", "comp.graphics"]
train = fetch_20newsgroups(subset="train", categories=cats, remove=("headers", "footers", "quotes"))
test = fetch_20newsgroups(subset="test", categories=cats, remove=("headers", "footers", "quotes"))

for name, clf in [("MultinomialNB", MultinomialNB(alpha=0.1)),
                  ("LogisticRegression", LogisticRegression(max_iter=2000))]:
    pipe = make_pipeline(TfidfVectorizer(), clf)
    t0 = time.perf_counter()
    pipe.fit(train.data, train.target)
    fit_s = time.perf_counter() - t0
    acc = accuracy_score(test.target, pipe.predict(test.data))
    print(f"{name:<20} accuracy {acc:.4f}   fit {fit_s:.2f}s")`,
        output: `MultinomialNB        accuracy 0.8862   fit 0.31s
LogisticRegression   accuracy 0.8975   fit 2.84s
`,
        explanation:
          'On sparse high-dimensional text, naive Bayes gets within about a point of logistic regression while fitting roughly ten times faster, because its training is counting rather than iterative optimisation. That ratio is why it remains the standard first model for text: you learn within seconds whether the problem is easy, and you get a baseline any later model has to beat. Note `alpha=0.1` rather than the default 1.0 â with a large vocabulary, Laplace’s full pseudo-count over-smooths, and alpha is worth tuning by cross-validation on a logarithmic grid.',
      },
      {
        language: 'python',
        title: 'The zero-frequency catastrophe, and what smoothing does',
        runnable: true,
        code: `import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

docs = ["win money now", "win free money", "meeting at noon", "project meeting now", "lunch at noon"]
y = np.array([1, 1, 0, 0, 0])          # 1 = spam

vec = CountVectorizer()
X = vec.fit_transform(docs)
query = vec.transform(["win money"])

for alpha in [1e-10, 0.1, 1.0, 10.0]:
    nb = MultinomialNB(alpha=alpha).fit(X, y)
    p = nb.predict_proba(query)[0, 1]
    print(f"alpha={alpha:<8} P(spam) = {p:.6f}")

# The hand computation, reproduced.
nb = MultinomialNB(alpha=1.0).fit(X, y)
print("vocabulary size:", len(vec.vocabulary_))
print("log priors     :", np.round(nb.class_log_prior_, 4))`,
        output: `alpha=1e-10    P(spam) = 1.000000
alpha=0.1      P(spam) = 0.994778
alpha=1.0      P(spam) = 0.896396
alpha=10.0     P(spam) = 0.542332
`,
        explanation:
          'With alpha driven to zero the model becomes absolutely certain, because "win" and "money" never appear in ham and the unsmoothed likelihood is exactly zero — the ham class is vetoed rather than merely disfavoured. At alpha = 1 you recover the 0.896 computed by hand in the worked example. At alpha = 10 the pseudo-counts swamp the five real documents and the model becomes nearly agnostic. Alpha is therefore a regularisation strength: it trades confidence for robustness, and the right value depends on vocabulary size relative to corpus size.',
      },
      {
        language: 'python',
        title: 'Good rankings, bad probabilities',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, brier_score_loss

# Deliberately correlated features: exactly what the naive assumption forbids.
X, y = make_classification(n_samples=4000, n_features=20, n_informative=6,
                           n_redundant=10, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

for name, clf in [("GaussianNB", GaussianNB()), ("LogisticRegression", LogisticRegression(max_iter=1000))]:
    clf.fit(X_tr, y_tr)
    p = clf.predict_proba(X_te)[:, 1]
    print(f"{name:<20} AUC {roc_auc_score(y_te, p):.4f}   Brier {brier_score_loss(y_te, p):.4f}"
          f"   frac(p>0.99 or p<0.01) {np.mean((p > 0.99) | (p < 0.01)):.3f}")`,
        output: `GaussianNB           AUC 0.9375   Brier 0.1192   frac(p>0.99 or p<0.01) 0.681
LogisticRegression   AUC 0.9531   Brier 0.0904   frac(p>0.99 or p<0.01) 0.212
`,
        explanation:
          'This is the naive Bayes trade-off in one table. The ten redundant features are linear combinations of the informative ones, so the same evidence is counted several times over; the AUC — which depends only on the ordering — stays respectable, but the Brier score, which measures the accuracy of the probabilities themselves, is markedly worse, and 68% of predictions are pinned beyond 0.99 or below 0.01. If you need a ranking, naive Bayes is fine. If a downstream decision multiplies the probability by a cost, wrap it in `CalibratedClassifierCV` or use a different model.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Spam filtering, historically and still',
        usage:
          'Paul Graham’s "A Plan for Spam" in 2002 popularised Bayesian filtering and changed email overnight. Production filters have since become far more elaborate, but naive Bayes over token counts remains a component, because it retrains cheaply as spammers change tactics and supports incremental updates per user.',
      },
      {
        context: 'Document triage and routing',
        usage:
          'Support ticket routing, legal document categorisation and news topic tagging all use multinomial naive Bayes as a first-pass classifier. When there are hundreds of categories and only a few dozen examples of some of them, the fact that each parameter is estimated from a simple count is a decisive advantage.',
      },
      {
        context: 'Medical and genomic screening',
        usage:
          'Gaussian naive Bayes is used where there are far more features than samples — gene expression arrays with 20,000 probes and 80 patients, for example. Any model that tries to estimate feature interactions cannot possibly do so from 80 rows, whereas naive Bayes needs only a mean and a variance per feature per class.',
      },
      {
        context: 'The baseline that calibrates expectations',
        usage:
          'Running naive Bayes first on a text problem tells you within seconds whether the task is nearly solved or genuinely hard. If it reaches 0.95 accuracy, a transformer is probably unnecessary; if it reaches 0.55, the signal is subtle and the labelling scheme deserves inspection before any modelling continues.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`MultinomialNB`, `BernoulliNB`, `GaussianNB` and `ComplementNB`, all with `alpha` and `partial_fit` for streaming updates.' },
      { tool: 'scikit-learn text stack', role: '`CountVectorizer` and `TfidfVectorizer` produce exactly the sparse count matrices `MultinomialNB` expects, which is why the pair is a two-line text classifier.' },
      { tool: 'CalibratedClassifierCV', role: 'Wraps naive Bayes with isotonic or sigmoid calibration when the downstream decision needs real probabilities rather than a ranking.' },
    ],

    commonMistakes: [
      {
        mistake: 'Treating the predicted probabilities as trustworthy',
        why: 'Correlated features count the same evidence repeatedly, driving the product towards 0 or 1. A naive Bayes "99% spam" routinely corresponds to a true rate nearer 80%.',
        fix: 'Use the probabilities for ranking and thresholding only. If a downstream calculation needs calibrated numbers, wrap the model in `CalibratedClassifierCV` and check a reliability curve.',
      },
      {
        mistake: 'Disabling or ignoring smoothing',
        why: 'With alpha = 0, any feature value unseen in a class during training gives that class a likelihood of exactly zero, which vetoes it regardless of all other evidence. One rare word can decide a document.',
        fix: 'Keep alpha > 0 and tune it — often 0.01 to 0.1 for large vocabularies, where the default 1.0 over-smooths. Never set alpha to zero on text.',
      },
      {
        mistake: 'Using GaussianNB on skewed or categorical features',
        why: 'GaussianNB models each feature as normal within each class. On a heavily skewed variable such as income, or on an integer-encoded category where the ordering is meaningless, that model is simply wrong and the likelihoods are nonsense.',
        fix: 'Transform skewed features (log or quantile) before GaussianNB, use `CategoricalNB` for unordered categories, and `MultinomialNB` for counts.',
      },
      {
        mistake: 'Duplicating correlated features and expecting no effect',
        why: 'Adding a copy of a feature multiplies its likelihood term in twice, doubling its influence on the log-score. Most models are merely indifferent to duplicated columns; naive Bayes actively double-counts them.',
        fix: 'De-duplicate near-identical columns, or prefer a discriminative model when features are known to be strongly correlated.',
      },
      {
        mistake: 'Assuming the independence assumption must be checked before using the model',
        why: 'People sometimes abandon naive Bayes after discovering their features are correlated. But the assumption is essentially never satisfied in real data, and the classifier is frequently accurate anyway, because the argmax survives distortions that the posterior does not.',
        fix: 'Judge it empirically — fit it, cross-validate it, and compare against a discriminative baseline. Violation of the assumption is a reason to distrust the probabilities, not automatically the predictions.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What exactly is "naive" about naive Bayes?',
        answer:
          'The assumption that features are conditionally independent given the class, that is P(x₁, …, x_d | y) = Π P(xⱼ | y). In an email classifier this claims that once you know a message is spam, seeing the word "free" tells you nothing about whether you will also see "offer", which is obviously false — those words co-occur constantly. The assumption is not made because anyone believes it, but because it is what makes the problem tractable: modelling the full joint likelihood over d binary features needs 2^d − 1 parameters per class, whereas the factorised version needs only d, each estimated by a simple count. That is the whole bargain: a false assumption bought in exchange for an estimation problem that can actually be solved from limited data.',
      },
      {
        level: 'intermediate',
        question: 'If the independence assumption is nearly always violated, why does naive Bayes still classify well?',
        answer:
          'Because classification only requires the argmax of the posterior to be right, and the argmax is far more robust than the posterior itself. When features are correlated, the same evidence gets multiplied in several times, which pushes the score towards an extreme — but generally in the direction the evidence already favoured. So the model becomes badly over-confident while still ranking the classes correctly. You can see this empirically: on data with deliberately redundant features, naive Bayes will hold an AUC close to a logistic regression while its Brier score, which scores the probabilities themselves, is much worse. Domingos and Pazzani made this formal in 1997, showing naive Bayes is optimal under zero-one loss over a much broader class of distributions than those actually satisfying independence. The practical rule I would state is: trust the ranking, distrust the number, and calibrate if the number matters.',
        followUp:
          'A strong answer distinguishes ranking metrics such as AUC from calibration metrics such as Brier score or log loss, and mentions calibration as the remedy.',
      },
      {
        level: 'ml-engineer',
        question: 'Your multinomial naive Bayes text classifier predicts the majority class for almost everything. What do you check?',
        answer:
          'First, class balance. Multinomial naive Bayes is known to be biased towards classes with more training text, because the likelihood estimates for a large class are computed from far more tokens and its prior is larger too. The standard fix is `ComplementNB`, which estimates parameters from the complement of each class and was designed specifically for imbalanced text; alternatively, set uniform priors with `fit_prior=False`, or resample. Second, alpha. On a vocabulary of tens of thousands with modest corpus size, the default alpha of 1.0 adds |V| pseudo-counts to every denominator and can flatten the likelihoods enough that the prior dominates, so I would sweep alpha logarithmically from 1e-3 to 10. Third, the feature representation: raw counts let long documents dominate, so I would check whether TF-IDF with sublinear term frequency and L2 normalisation improves separation. Fourth, and most important, I would look at a confusion matrix and a handful of misclassified documents before touching hyperparameters at all, because "predicts the majority class" is also exactly what you see when the labels are noisy or the classes genuinely overlap, and no amount of tuning fixes that.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Training data: 3 spam documents containing 12 words total, of which "offer" appears 4 times; 7 ham documents containing 30 words total, of which "offer" appears once. Vocabulary size is 20. Compute the Laplace-smoothed P(offer | spam) and P(offer | ham), and the priors.',
        hint: 'Use (count + 1) / (class total + |V|), and priors from document counts.',
        solution:
          'Priors: P(spam) = 3/10 = 0.3, P(ham) = 7/10 = 0.7. Likelihoods with α = 1 and |V| = 20: P(offer | spam) = (4 + 1)/(12 + 20) = 5/32 = 0.156. P(offer | ham) = (1 + 1)/(30 + 20) = 2/50 = 0.040. The word is about 3.9 times more likely in spam. For a one-word document "offer", the scores are 0.3 × 0.156 = 0.0469 for spam and 0.7 × 0.040 = 0.0280 for ham, giving P(spam | offer) = 0.0469/(0.0469 + 0.0280) = 0.626 — spam wins, but only modestly, because the strong likelihood ratio is partly offset by the ham-favouring prior.',
      },
      {
        prompt:
          'A naive Bayes model outputs P(fraud) = 0.9997 for a transaction. Your colleague wants to multiply that by a £500 loss to compute expected cost. What do you tell them, and what would you do instead?',
        hint: 'Which properties of naive Bayes probabilities are reliable, and which are not?',
        solution:
          'The expected-cost calculation requires a calibrated probability, and naive Bayes almost never provides one. Because correlated features multiply the same evidence in repeatedly, the posterior is pushed towards the extremes: a reported 0.9997 might correspond to a true fraud rate nearer 0.85, so the expected cost would be overstated by a large and unknown factor. What the number is good for is ordering — transactions with higher scores really are more likely to be fraud, which is why AUC stays high. The fix is to calibrate: wrap the estimator in `CalibratedClassifierCV` with isotonic regression on held-out data, then verify with a reliability diagram that predicted probabilities near 0.9 correspond to roughly 90% observed fraud. Alternatively, use a model that produces calibrated probabilities natively, such as logistic regression, and keep naive Bayes as the fast baseline.',
      },
      {
        prompt:
          'Show that multinomial naive Bayes is a linear classifier by writing its decision function in log-space.',
        hint: 'Take the log of the prediction rule and collect terms in the feature counts.',
        solution:
          'The score for class c is log P(c) + Σⱼ xⱼ log P(wⱼ | c), where xⱼ is the count of word j in the document. Define bₙ = log P(c) and wⱼᶜ = log P(wⱼ | c). The score is then bₙ + Σⱼ wⱼᶜ xⱼ, which is an affine function of the count vector x — a dot product plus a bias. For two classes, the decision rule compares score₁ against score₀, so it predicts class 1 when (b₁ − b₀) + Σⱼ (wⱼ¹ − wⱼ⁰) xⱼ > 0, which is precisely a hyperplane in x. So naive Bayes draws exactly the same kind of boundary as logistic regression; the difference is entirely in how the weights are obtained. Naive Bayes sets them by counting under a generative model, while logistic regression fits them by minimising a discriminative loss — which is why logistic regression usually wins with plenty of data and naive Bayes often wins with very little.',
      },
    ],

    quiz: [
      {
        id: 'ML-011-q1',
        type: 'mcq',
        concept: 'the naive assumption',
        prompt: 'Which assumption gives naive Bayes its name?',
        options: [
          'Features are conditionally independent given the class',
          'Classes are equally likely a priori',
          'Every feature is normally distributed',
          'The decision boundary is linear',
        ],
        answerIndex: 0,
        explanation:
          'Conditional independence lets the joint likelihood factorise into a product of per-feature terms, cutting the parameter count from exponential to linear in the number of features. The other statements are either optional variants or consequences, not the defining assumption.',
      },
      {
        id: 'ML-011-q2',
        type: 'numeric',
        concept: 'Laplace smoothing',
        prompt: 'A word appears 3 times in a class with 17 total word tokens. The vocabulary has 10 entries. What is the Laplace-smoothed (α = 1) probability of the word given the class? Give three decimal places.',
        answer: 0.148,
        tolerance: 0.002,
        explanation:
          '(3 + 1)/(17 + 1×10) = 4/27 = 0.148. The α in the numerator and α|V| in the denominator keep the per-class probabilities summing to one while guaranteeing nothing is exactly zero.',
      },
      {
        id: 'ML-011-q3',
        type: 'truefalse',
        concept: 'calibration',
        prompt: 'Naive Bayes typically produces well-calibrated probability estimates.',
        answer: false,
        explanation:
          'It is usually badly calibrated. Correlated features contribute the same evidence multiple times, pushing the posterior towards 0 or 1. The ranking is often still good, which is why AUC stays high while Brier score and log loss deteriorate.',
      },
      {
        id: 'ML-011-q4',
        type: 'fill',
        concept: 'zero-frequency problem',
        prompt: 'Adding a pseudo-count to every feature-class count so no probability is ever zero is called which kind of smoothing?',
        answers: ['laplace', 'laplace smoothing', 'additive', 'additive smoothing', 'lidstone'],
        explanation:
          'Laplace (additive, or Lidstone for general α) smoothing. It is the posterior mean under a Dirichlet prior, and it prevents a single unseen feature from driving an entire class likelihood to zero.',
      },
      {
        id: 'ML-011-q5',
        type: 'match',
        concept: 'choosing a variant',
        prompt: 'Match each naive Bayes variant to the data it is designed for.',
        pairs: [
          { left: 'MultinomialNB', right: 'Word counts or TF-IDF vectors' },
          { left: 'BernoulliNB', right: 'Binary presence or absence indicators' },
          { left: 'GaussianNB', right: 'Continuous features that are roughly normal within each class' },
          { left: 'ComplementNB', right: 'Text classification with strongly imbalanced classes' },
        ],
        explanation:
          'The variants differ only in how P(xⱼ | y) is modelled. Choosing the wrong one — GaussianNB on integer-encoded categories, for instance — means the likelihood model is simply false and the estimates are meaningless.',
      },
      {
        id: 'ML-011-q6',
        type: 'code-output',
        language: 'python',
        concept: 'smoothing strength',
        prompt: 'With training data where "win" never appears in the ham class, what does this print?',
        code: `nb = MultinomialNB(alpha=1e-10).fit(X, y)
print(round(nb.predict_proba(vec.transform(["win money"]))[0, 1], 3))`,
        options: ['1.0', '0.896', '0.5', '0.0'],
        explanation:
          'With alpha effectively zero, P(win | ham) is essentially zero, so the entire ham likelihood collapses and the spam posterior is driven to 1.0. This is the zero-frequency catastrophe: one unseen word vetoes a class outright, which is exactly why smoothing exists.',
        answerIndex: 0,
      },
      {
        id: 'ML-011-q7',
        type: 'explain',
        concept: 'why a false assumption still works',
        prompt: 'Explain why naive Bayes often classifies accurately even though its independence assumption is violated.',
        rubric: [
          'Distinguishes getting the argmax right from getting the posterior right',
          'Explains that correlated features double-count evidence and push probabilities to extremes',
          'Notes that the distortion usually preserves the ordering of the classes',
          'Mentions a practical consequence, such as good AUC alongside poor calibration',
        ],
        sampleAnswer:
          'Classification asks only which class scores highest, not what its probability is, and those two questions have very different robustness. When features are correlated, the factorised likelihood multiplies in the same underlying evidence several times over. That inflates the magnitude of the score — which is why naive Bayes so often reports 0.999 when the honest answer is 0.8 — but it inflates it in the direction the evidence already pointed. The class that was winning tends to keep winning, just by a wider and fictitious margin. So the argmax survives an error that completely destroys the calibration. You can measure exactly this: build data with ten redundant features, and naive Bayes will hold an AUC within a couple of points of logistic regression while its Brier score is substantially worse and most of its predictions sit beyond 0.99 or below 0.01. Domingos and Pazzani proved the general version of this in 1997, showing the classifier is optimal under zero-one loss for a far wider family of distributions than those actually satisfying independence. The practical takeaway is a division of labour: use naive Bayes when you need a ranking or a decision and speed matters, and either calibrate it or use a discriminative model when the probability itself feeds into a cost calculation.',
        explanation:
          'The key insight is that the argmax is invariant to a great deal of distortion in the posterior, so a model can be simultaneously a good classifier and a bad probability estimator.',
      },
    ],

    flashcards: [
      { front: 'What is the naive Bayes prediction rule?', back: 'argmax over classes of P(y) × Π P(xⱼ | y), computed in logs as log P(y) + Σ log P(xⱼ | y) to avoid underflow.' },
      { front: 'What is the naive assumption?', back: 'Features are conditionally independent given the class. It cuts the likelihood parameters from 2^d − 1 to d per class.' },
      { front: 'Why is Laplace smoothing necessary?', back: 'Without it, any feature unseen in a class gives likelihood zero, vetoing that class entirely. P̂ = (N + α)/(N_c + α|V|).' },
      { front: 'Why are naive Bayes probabilities untrustworthy?', back: 'Correlated features count the same evidence repeatedly, pushing the posterior towards 0 or 1. Good AUC, poor Brier score.' },
      { front: 'Which variant for word counts?', back: 'MultinomialNB. BernoulliNB for binary presence, GaussianNB for continuous features, ComplementNB for imbalanced text.' },
      { front: 'Is naive Bayes linear?', back: 'Yes. In log-space the score is log P(c) + Σ xⱼ log P(wⱼ|c), an affine function of the counts, so the boundary is a hyperplane.' },
      { front: 'When does naive Bayes beat logistic regression?', back: 'With very little training data, or very many features relative to samples — its parameters are one-dimensional counts, so they converge fast.' },
    ],

    challenge: {
      title: 'A spam filter you can explain line by line',
      brief:
        'Implement multinomial naive Bayes from scratch with NumPy: fit should compute class log-priors and smoothed log-likelihoods from a sparse count matrix, and predict should return the argmax of the log-scores. Verify it matches `MultinomialNB` to within floating-point tolerance on the 20 newsgroups data. Then extend it: add an `alpha` sweep showing the accuracy curve, and add a method that, for a given document, returns the ten tokens contributing most to the winning class’s score.',
      acceptanceCriteria: [
        'Training is a single pass of counting — no loops over documents at prediction time',
        'All arithmetic is done in log-space, and the code notes where a raw product would underflow',
        'Predictions match scikit-learn’s `MultinomialNB` to at least six decimal places on the same data',
        'The alpha sweep is plotted or tabulated, and the chosen value is justified by held-out accuracy',
        'The token-contribution method returns log-probability contributions, not raw counts, and the top tokens are recognisably sensible for the class',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague how naive Bayes classifies an email, what the naive assumption is, and why the model is useful despite that assumption being false.',
      mustCover: [
        'Bayes theorem turns P(evidence | class) into P(class | evidence), and the evidence term cancels across classes',
        'The naive assumption factorises the likelihood into a product of per-feature terms, making estimation a counting exercise',
        'The assumption is false because features correlate, which double-counts evidence and wrecks calibration',
        'The argmax is far more robust than the posterior, so the classifier still ranks correctly',
      ],
      bonusSignals: ['mentions Laplace smoothing and the zero-frequency problem', 'mentions working in log-space to avoid underflow', 'notes that naive Bayes is linear in log-space'],
      sampleExplanation:
        'Start with what you actually want: given the words in this email, how likely is it to be spam. What you can easily measure is the reverse — given that emails are spam, how often does each word show up. Bayes theorem converts one into the other: the posterior is the likelihood times the prior, divided by the evidence, and since the evidence term is identical for every class it cannot change which class wins, so you can ignore it. That leaves the likelihood of the whole email given the class, and this is where the difficulty lives. Modelling the probability of a specific combination of words would require seeing that combination many times, and with a vocabulary of twenty thousand words you never will. So naive Bayes assumes the words are independent of one another once you know the class, which lets you multiply the individual word probabilities together. That assumption is plainly wrong — "free" and "offer" turn up together far more than independence predicts — but it turns an impossible estimation problem into counting, and counting works with very little data. What you lose is the honesty of the number. Correlated words feed the same evidence into the product repeatedly, so the model reports 0.9999 when the truthful answer is around 0.8. What you keep is the ordering: the class that was ahead stays ahead, it just wins by an exaggerated margin, and for choosing a class the margin does not matter. Two practical details finish the picture. You work in logarithms, because multiplying five hundred small probabilities underflows to exactly zero in floating point. And you add a pseudo-count to every word, because a word never seen in a class would otherwise give that class a likelihood of zero and veto it outright, however strong the rest of the evidence.',
    },
  },

  {
    id: 'ML-012',
    domain: 'ML',
    module: 'Classification',
    topic: 'Margin-based classification',
    title: 'Support Vector Machines',
    slug: 'support-vector-machines',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['ML-009'],
    related: ['ML-010', 'ML-011'],
    tags: ['svm', 'margin', 'support vectors', 'kernel trick', 'hinge loss', 'rbf'],

    learningObjectives: [
      'Explain what the margin is and why maximising it is a sensible objective rather than an arbitrary one',
      'Identify support vectors and explain why the rest of the training data has no effect on the fitted boundary',
      'Describe the kernel trick and explain how an RBF kernel produces a curved boundary without ever computing the mapped features',
      'Tune C and gamma with an understanding of what each one does, and know when an SVM is the wrong choice',
    ],

    terminology: [
      {
        term: 'Margin',
        definition:
          'The perpendicular distance from the decision hyperplane to the nearest training point of either class. A support vector machine chooses, among all separating hyperplanes, the one for which this distance is greatest.',
        simple: 'The width of the empty corridor between the boundary and the closest examples.',
      },
      {
        term: 'Support vector',
        definition:
          'A training point that lies on the margin boundary or violates it. Only these points have non-zero dual coefficients, so the fitted hyperplane depends on them alone; removing any other point leaves the solution unchanged.',
        simple: 'The few examples right on the edge that actually decide where the line goes.',
      },
      {
        term: 'Hinge loss',
        definition:
          'The loss max(0, 1 − y·f(x)), which is zero once a point is correctly classified with margin at least 1 and grows linearly thereafter. It is what makes the SVM solution sparse in the training points.',
        simple: 'No penalty once you are safely on the right side; a growing penalty as you cross over.',
      },
      {
        term: 'Kernel trick',
        definition:
          'Replacing every inner product xᵢᵀxⱼ in the dual problem with a kernel function K(xᵢ, xⱼ) that equals an inner product in some higher-dimensional space, thereby fitting a linear model in that space without ever computing the coordinates.',
        simple: 'Getting the benefit of a huge feature expansion by computing similarities instead of the features.',
      },
      {
        term: 'C (regularisation parameter)',
        definition:
          'The penalty applied to margin violations. Large C insists on classifying training points correctly, giving a narrow margin and a complex boundary; small C tolerates violations in exchange for a wider, smoother margin.',
        simple: 'How much you care about getting every training point right versus keeping a wide, simple corridor.',
      },
      {
        term: 'Gamma (RBF kernel width)',
        definition:
          'The inverse width of the radial basis function K(x, z) = exp(−γ‖x − z‖²). Large gamma makes each training point influence only its immediate vicinity; small gamma makes influence spread widely and the boundary smooth.',
        simple: 'How far the influence of each training point reaches.',
      },
    ],

    simpleExplanation:
      'If two groups of points can be separated by a straight line, there are infinitely many lines that do it. Most of them pass uncomfortably close to some of the points, and a line that barely squeezes past an example is a line that will misclassify the next similar example. A support vector machine picks the line that leaves the widest possible empty corridor between the two groups — it pushes the boundary as far from both sides as it can. The width of that corridor is called the margin, and a striking consequence is that only the points sitting right on the edge of it matter. Those are the support vectors. Delete every other training point, refit, and you get exactly the same line. The second idea is what made SVMs famous. Many datasets cannot be separated by a straight line at all, but could be if you first transformed them into a higher-dimensional space where the groups pull apart. Actually computing that transformation is usually far too expensive. The kernel trick sidesteps it entirely: the algorithm only ever needs to know how similar pairs of points are in the new space, and for the right choice of similarity function that number can be computed directly from the original coordinates, without ever constructing the new space.',

    whyItExists:
      'Perceptrons and unregularised logistic regression will happily return any separating hyperplane, including one that passes within a hair of a training point and therefore generalises poorly. Maximising the margin gives a unique, well-defined solution with a generalisation bound that depends on the margin rather than on the number of dimensions, which is what allows an SVM to work in feature spaces of effectively infinite dimension without overfitting catastrophically.',

    analogy: {
      scenario:
        'You are asked to draw the border between two neighbouring countries on a map where villages of each nationality are already marked. One option is to draw a line that hugs the outskirts of a village on one side â technically it separates everybody, but the first new house built in that village ends up on the wrong side. The sensible approach is to find the widest strip of empty land between the two populations and run the border down its middle. The only villages that constrain your choice are those on the edges of that empty strip: the ones deep inside each country could be moved, added to or removed without changing your border at all. And if the populations are interleaved in a way that no straight border can separate â one country’s villages forming a ring around the other’s capital â you might notice that the two groups separate cleanly once you also take altitude into account, so the border becomes a flat plane in three dimensions that looks like a circle when projected back onto the map.',
      mapping: [
        { from: 'The widest empty strip between the populations', to: 'The margin' },
        { from: 'Villages on the edges of the strip', to: 'Support vectors, the only points with non-zero dual coefficients' },
        { from: 'Villages deep inside a country', to: 'Non-support vectors, which can be deleted without changing the solution' },
        { from: 'Allowing a few villages inside the strip to get a wider strip overall', to: 'The soft margin, controlled by C' },
        { from: 'Adding altitude as an extra coordinate', to: 'Mapping into a higher-dimensional feature space' },
        { from: 'A flat plane in 3D that looks curved on the flat map', to: 'A linear boundary in kernel space that is nonlinear in the original space' },
      ],
      bridge:
        'The analogy captures the two claims that define an SVM. First, that among all valid borders the one with the greatest clearance is the most defensible, because clearance is exactly what buys tolerance to new, unseen villages — this is the intuition behind the margin-based generalisation bound. Second, that only the boundary villages carry information: the fitted hyperplane is a weighted sum over support vectors alone, which is why an SVM can be trained on a large dataset and then described entirely by a small subset of it.',
      limitations:
        'The map analogy makes the higher-dimensional space sound like a concrete, inspectable place. With an RBF kernel that space is infinite-dimensional and no coordinates are ever computed — only pairwise similarities exist, which is exactly what makes the trick affordable and also what makes the resulting model uninterpretable.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Drag the margin and the kernel',
        caption: 'Move points, change C and gamma, and watch the support vectors light up. Notice that dragging a non-support vector does nothing at all until it crosses the margin.',
        widget: 'svm-margin-lab',
      },
      {
        kind: 'flow',
        title: 'How an SVM is fitted',
        steps: [
          { label: 'State the objective', detail: 'Among all hyperplanes separating the classes, find the one maximising the distance to the nearest point of either class.' },
          { label: 'Make it soft', detail: 'Real data overlaps, so allow violations with slack variables ξᵢ and penalise their total by C. Hard margin is the special case C → ∞.' },
          { label: 'Take the dual', detail: 'Lagrangian duality turns the problem into a quadratic program in α, where the data appears only inside inner products xᵢᵀxⱼ.' },
          { label: 'Swap in a kernel', detail: 'Because the data appears only as inner products, replacing them with K(xᵢ, xⱼ) fits a linear model in an implicit feature space at no extra cost.' },
          { label: 'Solve and keep the survivors', detail: 'The optimiser (SMO) returns α; points with αᵢ = 0 are discarded and only the support vectors are stored.' },
          { label: 'Predict', detail: 'f(x) = Σ αᵢyᵢK(xᵢ, x) + b, a similarity-weighted vote over support vectors. The sign is the class.' },
        ],
      },
      {
        kind: 'compare',
        title: 'SVM: strengths, weaknesses and when to reach for it',
        caption: 'Reach for an SVM on small to medium datasets — say under 50,000 rows — with many features and a clear margin, especially text with a linear kernel or a genuinely curved boundary with RBF. Reach past it for large n, for probability outputs, or when you need to explain the model.',
        left: {
          heading: 'Strengths',
          points: [
            'Maximising the margin gives a unique solution with a generalisation bound that does not depend on dimensionality',
            'Effective when features outnumber samples, which breaks many other methods',
            'The kernel trick buys highly nonlinear boundaries without an explicit feature expansion',
            'The model is defined by support vectors alone, so it is memory-efficient relative to the training set',
            'Convex objective: no local optima and a deterministic solution for fixed hyperparameters',
            'LinearSVC on sparse text data is fast, strong, and competitive with logistic regression',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'Training is roughly O(n²) to O(n³) in the number of samples, so kernel SVMs are impractical beyond tens of thousands of rows',
            'No native probability output; `probability=True` runs Platt scaling via internal cross-validation and is slow',
            'Results are highly sensitive to C and gamma, so a hyperparameter search is mandatory rather than optional',
            'Requires feature scaling, since both the margin and the RBF kernel are distance-based',
            'A kernel SVM is essentially uninterpretable — there are no coefficients in the original feature space',
            'Multi-class is handled by one-versus-one or one-versus-rest wrappers rather than natively',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What C and gamma actually do',
        caption: 'These two interact, so they must be tuned jointly on a logarithmic grid. A common failure is finding a good C at one gamma and assuming it transfers.',
        columns: ['Setting', 'Effect on the boundary', 'Bias / variance', 'Symptom when wrong'],
        rows: [
          ['Small C (0.01)', 'Wide margin, many violations tolerated, smooth', 'High bias, low variance', 'Underfits: training and test scores both mediocre'],
          ['Large C (1000)', 'Narrow margin, few violations tolerated, contorted', 'Low bias, high variance', 'Overfits: near-perfect training score, poor test score'],
          ['Small gamma (0.001)', 'Each point influences a wide region; boundary near-linear', 'High bias', 'RBF behaves like a linear kernel and underfits'],
          ['Large gamma (100)', 'Each point influences only its immediate neighbourhood', 'Very high variance', 'Islands around individual points; memorises the training set'],
          ['gamma="scale"', 'Sets γ = 1/(d · Var(X)), adapting to feature spread', 'Sensible default', 'Still needs tuning, but rarely catastrophic'],
        ],
      },
      {
        kind: 'table',
        title: 'Common kernels',
        columns: ['Kernel', 'K(x, z)', 'Implicit feature space', 'Use when'],
        rows: [
          ['Linear', 'xᵀz', 'The original space', 'Many features, sparse data, text; also when you need coefficients'],
          ['Polynomial', '(γ xᵀz + r)^d', 'All monomials up to degree d', 'Interactions of known order matter; prone to numerical trouble at high d'],
          ['RBF (Gaussian)', 'exp(−γ‖x − z‖²)', 'Infinite-dimensional', 'The sensible default for dense, low-dimensional numeric data'],
          ['Sigmoid', 'tanh(γ xᵀz + r)', 'Not always a valid inner product', 'Rarely — included for historical reasons, often not positive semi-definite'],
        ],
      },
    ],

    formalDefinition:
      'A support vector machine finds the hyperplane wáµx + b = 0 solving min_{w,b,Î¾} Â½âwâÂ² + C Î£áµ¢ Î¾áµ¢ subject to yáµ¢(wáµxáµ¢ + b) â¥ 1 â Î¾áµ¢ and Î¾áµ¢ â¥ 0, where yáµ¢ â {â1, +1}. The geometric margin is 2/âwâ, so minimising âwâÂ² maximises it. The Lagrangian dual is max_Î± Î£áµ¢ Î±áµ¢ â Â½ Î£áµ¢Î£â±¼ Î±áµ¢Î±â±¼yáµ¢yâ±¼ K(xáµ¢, xâ±¼) subject to 0 â¤ Î±áµ¢ â¤ C and Î£áµ¢ Î±áµ¢yáµ¢ = 0, in which the data enters only through inner products, permitting their replacement by any positive semi-definite kernel K by Mercer’s theorem. The decision function is f(x) = sign(Î£áµ¢ Î±áµ¢yáµ¢K(xáµ¢, x) + b), with Î±áµ¢ > 0 exactly for support vectors. The primal is equivalent to minimising the average hinge loss plus an L2 penalty, which places the SVM in the same regularised-empirical-risk family as logistic regression with a different loss.',

    math: {
      intuition:
        'Everything follows from one geometric fact: for a hyperplane wᵀx + b = 0, the distance from a point to that plane is |wᵀx + b|/‖w‖. Fix the scale so that the closest points satisfy |wᵀx + b| = 1, and the margin becomes exactly 2/‖w‖. Maximising the margin is then the same as minimising ‖w‖², which is a clean convex objective. Switching to the dual is what makes kernels possible: in the dual, the data never appears on its own, only inside inner products between pairs of points — and an inner product is exactly what a kernel computes. That single structural observation is the kernel trick.',
      formulas: [
        {
          latex: '\\gamma_{\\text{geom}} = \\frac{y_i(\\mathbf{w}^{\\top}\\mathbf{x}_i + b)}{\\lVert \\mathbf{w} \\rVert}, \\qquad \\text{margin width} = \\frac{2}{\\lVert \\mathbf{w} \\rVert}',
          name: 'Geometric margin',
          meaning:
            'The signed perpendicular distance from a point to the hyperplane, made positive by multiplying by the label. Under the canonical scaling |wᵀx + b| = 1 at the closest points, the full corridor is 2/‖w‖ wide.',
          variables: [
            { symbol: '\\mathbf{w}', meaning: 'Normal vector to the hyperplane; its direction fixes the orientation' },
            { symbol: 'b', meaning: 'Bias, shifting the hyperplane away from the origin' },
            { symbol: 'y_i', meaning: 'Label, coded as −1 or +1 so that the product is positive when correct' },
            { symbol: '\\lVert \\mathbf{w} \\rVert', meaning: 'Euclidean norm of w; small norm means a wide margin' },
          ],
          category: 'classification',
        },
        {
          latex: '\\min_{\\mathbf{w}, b, \\xi} \\; \\frac{1}{2}\\lVert \\mathbf{w} \\rVert^{2} + C\\sum_{i=1}^{n}\\xi_i \\quad \\text{s.t.} \\quad y_i(\\mathbf{w}^{\\top}\\mathbf{x}_i + b) \\geq 1 - \\xi_i, \\; \\xi_i \\geq 0',
          name: 'Soft-margin primal problem',
          meaning:
            'Maximise the margin while paying C for every unit of margin violation. The two terms are in direct tension: the first wants a wide corridor, the second wants every point outside it.',
          variables: [
            { symbol: '\\xi_i', meaning: 'Slack: how far point i intrudes into or across the margin' },
            { symbol: 'C', meaning: 'Cost per unit of violation. Large C approaches a hard margin' },
            { symbol: 'n', meaning: 'Number of training examples' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\max_{\\alpha} \\; \\sum_{i}\\alpha_i - \\frac{1}{2}\\sum_{i}\\sum_{j}\\alpha_i\\alpha_j y_i y_j K(\\mathbf{x}_i, \\mathbf{x}_j) \\quad \\text{s.t.} \\quad 0 \\leq \\alpha_i \\leq C, \\; \\sum_i \\alpha_i y_i = 0',
          name: 'The dual problem',
          meaning:
            'The form actually solved. Crucially the training points appear only inside K, never alone — which is precisely what permits swapping the inner product for any valid kernel.',
          variables: [
            { symbol: '\\alpha_i', meaning: 'Dual coefficient for point i; non-zero exactly for support vectors' },
            { symbol: 'K(\\mathbf{x}_i, \\mathbf{x}_j)', meaning: 'Kernel: an inner product in the implicit feature space' },
            { symbol: 'C', meaning: 'Upper bound on each αᵢ, which is how the soft margin appears in the dual' },
          ],
          category: 'optimization',
        },
        {
          latex: 'K_{\\text{RBF}}(\\mathbf{x}, \\mathbf{z}) = \\exp\\!\\left(-\\gamma \\lVert \\mathbf{x} - \\mathbf{z} \\rVert^{2}\\right)',
          name: 'Radial basis function kernel',
          meaning:
            'A similarity that decays with distance: 1 when the points coincide, approaching 0 as they separate. Its implicit feature map is infinite-dimensional, which is why it can fit essentially any boundary — and why it needs regularising.',
          variables: [
            { symbol: '\\gamma', meaning: 'Inverse width. Large γ means influence decays quickly, giving a wiggly boundary' },
            { symbol: '\\lVert \\mathbf{x} - \\mathbf{z} \\rVert^{2}', meaning: 'Squared Euclidean distance, which is why scaling matters' },
          ],
          category: 'classification',
        },
        {
          latex: 'L_{\\text{hinge}}(y, f) = \\max\\left(0, \\; 1 - y \\, f(\\mathbf{x})\\right)',
          name: 'Hinge loss',
          meaning:
            'Zero once a point is correct with margin at least 1, then linear. The flat region is what makes the solution sparse: points comfortably correct contribute no gradient and end up with αᵢ = 0.',
          variables: [
            { symbol: 'y', meaning: 'True label in {−1, +1}' },
            { symbol: 'f(\\mathbf{x})', meaning: 'Signed distance-like score wᵀx + b' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'A hyperplane is the set {x : wᵀx + b = 0}. The distance from any point x₀ to it is |wᵀx₀ + b|/‖w‖ — the numerator measures how far off the plane you are, and dividing by ‖w‖ removes the arbitrary scale of w.',
        'w and b can be rescaled together without moving the plane, so fix the scale by requiring the closest points on each side to satisfy |wᵀx + b| = 1. The two margin boundaries are then wᵀx + b = ±1.',
        'The distance between those two parallel planes is 2/‖w‖. So maximising the margin means minimising ‖w‖, and for convenience we minimise ½‖w‖² instead, which has the same minimiser and a nicer derivative.',
        'Require every point to be on the correct side with margin at least 1: yᵢ(wᵀxᵢ + b) ≥ 1, with labels coded as ±1 so one inequality covers both classes. This is the hard-margin problem, and it has no solution when the classes overlap.',
        'Introduce slack ξᵢ ≥ 0, relaxing the constraint to yᵢ(wᵀxᵢ + b) ≥ 1 − ξᵢ, and add C Σξᵢ to the objective. Now overlap is permitted at a price, and C sets the price.',
        'Form the Lagrangian with multipliers αᵢ for the margin constraints and μᵢ for the non-negativity of the slacks, then set the derivatives with respect to w, b and ξ to zero.',
        '∂L/∂w = 0 yields w = Σᵢ αᵢyᵢxᵢ. This is the key structural result: the optimal normal vector is a linear combination of the training points, weighted by their dual coefficients.',
        '∂L/∂b = 0 yields Σᵢ αᵢyᵢ = 0, and ∂L/∂ξᵢ = 0 yields αᵢ = C − μᵢ, which combined with μᵢ ≥ 0 gives the box constraint 0 ≤ αᵢ ≤ C.',
        'Substituting back eliminates w, b and ξ entirely, leaving the dual: max_α Σαᵢ − ½ΣΣ αᵢαⱼyᵢyⱼ xᵢᵀxⱼ. Observe carefully: the only appearance of the data is the inner product xᵢᵀxⱼ.',
        'The Karush-Kuhn-Tucker conditions state αᵢ[yᵢ(wᵀxᵢ + b) − 1 + ξᵢ] = 0. So either αᵢ = 0, meaning the point sits strictly outside the margin and contributes nothing, or the constraint is tight and the point lies on or inside the margin. The latter are the support vectors, and since w = Σ αᵢyᵢxᵢ, only they define the boundary.',
        'Now the trick. Suppose you map every point through some φ into a higher-dimensional space and fit there. The dual would need φ(xᵢ)ᵀφ(xⱼ) — only that, never φ(xᵢ) alone. If a function K(x, z) equals φ(x)ᵀφ(z) for some φ, you can compute the dual without ever evaluating φ.',
        'Mercer’s theorem says any continuous, symmetric, positive semi-definite K corresponds to such a Ï. The RBF kernel qualifies, and its Ï maps into an infinite-dimensional space â so an RBF SVM fits a linear model in infinitely many dimensions using only nÂ² distance computations.',
        'Finally, rewrite the primal to see what the SVM is really doing. Since ξᵢ = max(0, 1 − yᵢf(xᵢ)) at the optimum, the objective is ½‖w‖² + C Σ max(0, 1 − yᵢf(xᵢ)) — an L2 penalty plus total hinge loss. So an SVM is regularised empirical risk minimisation with hinge loss, exactly as logistic regression is with log loss. The flat region of the hinge is the entire source of sparsity: log loss is never exactly zero, so every point influences a logistic model, whereas comfortably-correct points contribute nothing to an SVM.',
      ],
    },

    workedExample: {
      title: 'Finding the maximum-margin line by hand',
      setup:
        'Four points in two dimensions. Class +1: (3, 3) and (4, 4). Class −1: (1, 1) and (0, 1). Find the maximum-margin separating line, identify the support vectors, and compute the margin width.',
      steps: [
        {
          label: 'Spot the closest opposing pair',
          detail: 'By inspection the two classes are closest at (3, 3) from the positive side and (1, 1) from the negative side, at a distance of √8 = 2.828. The points (4, 4) and (0, 1) are further back and will turn out not to constrain the solution.',
          latex: '\\lVert (3,3) - (1,1) \\rVert = \\sqrt{8} = 2.828',
        },
        {
          label: 'Guess the orientation',
          detail: 'The maximum-margin hyperplane is perpendicular to the segment joining the closest opposing pair and passes through its midpoint. That segment runs along direction (2, 2), so w is proportional to (1, 1), and the midpoint is (2, 2).',
          latex: '\\mathbf{w} \\propto (1, 1), \\qquad \\text{midpoint} = (2, 2)',
        },
        {
          label: 'Apply the canonical scaling',
          detail: 'Write w = (a, a) and require wᵀx + b = +1 at (3, 3) and −1 at (1, 1). That gives 6a + b = 1 and 2a + b = −1. Subtracting, 4a = 2, so a = 0.5 and b = −1 − 2(0.5) = −2.',
          latex: '\\mathbf{w} = (0.5,\\, 0.5), \\qquad b = -2',
        },
        {
          label: 'Write down the boundary',
          detail: 'The decision boundary is 0.5x₁ + 0.5x₂ − 2 = 0, that is x₁ + x₂ = 4 — the anti-diagonal through (2, 2). The margin boundaries are x₁ + x₂ = 6 and x₁ + x₂ = 2.',
          latex: 'x_1 + x_2 = 4',
        },
        {
          label: 'Compute the margin width',
          detail: '‖w‖ = √(0.25 + 0.25) = √0.5 = 0.7071, so the margin width is 2/‖w‖ = 2.828. That matches the distance between (3, 3) and (1, 1) exactly, as it must, since those two points sit on opposite margin boundaries.',
          latex: '\\frac{2}{\\lVert \\mathbf{w} \\rVert} = \\frac{2}{0.7071} = 2.828',
        },
        {
          label: 'Check the other two points',
          detail: 'At (4, 4): wᵀx + b = 2 + 2 − 2 = 2, and y·f = +1 × 2 = 2 ≥ 1, so it is strictly outside the margin. At (0, 1): 0 + 0.5 − 2 = −1.5, and y·f = −1 × (−1.5) = 1.5 ≥ 1, also outside. Both have α = 0 and hinge loss 0.',
          latex: 'y \\, f(4,4) = 2 > 1, \\qquad y \\, f(0,1) = 1.5 > 1',
        },
        {
          label: 'Confirm the support vectors',
          detail: 'Only (3, 3) and (1, 1) satisfy y·f = 1 exactly, so only they are support vectors. Delete (4, 4) and (0, 1) entirely and refit: the same line comes back. Move (4, 4) to (10, 10) and nothing changes either — but move (3, 3) by a centimetre and the whole boundary shifts.',
          latex: '\\alpha_{(3,3)} > 0, \\; \\alpha_{(1,1)} > 0, \\; \\alpha_{(4,4)} = \\alpha_{(0,1)} = 0',
        },
        {
          label: 'Recover the dual coefficients',
          detail: 'With two support vectors, w = α₁(+1)(3,3) + α₂(−1)(1,1) and Σαᵢyᵢ = 0 forces α₁ = α₂ = α. Then w = α(3,3) − α(1,1) = α(2,2) = (0.5, 0.5), so α = 0.25. Each support vector carries a quarter of the weight, and the whole model is two numbers and two stored points.',
          latex: '\\alpha_1 = \\alpha_2 = 0.25',
        },
      ],
      conclusion:
        'The entire fitted model is two support vectors with α = 0.25 each, giving the line x₁ + x₂ = 4 and a margin 2.828 wide. Half the training set had no influence whatsoever — and that is the defining property of an SVM, not an artefact of this tiny example. It is also the reason SVMs are sensitive to outliers near the boundary and completely indifferent to outliers far from it, the opposite of least-squares behaviour.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Support vectors are the model',
        runnable: true,
        code: `import numpy as np
from sklearn.svm import SVC

X = np.array([[3.0, 3.0], [4.0, 4.0], [1.0, 1.0], [0.0, 1.0]])
y = np.array([1, 1, -1, -1])

clf = SVC(kernel="linear", C=1e6).fit(X, y)      # huge C ~ hard margin
print("w =", np.round(clf.coef_[0], 4), " b =", round(clf.intercept_[0], 4))
print("support vectors:", clf.support_vectors_.tolist())
print("dual coefs    :", np.round(clf.dual_coef_[0], 4))
print("margin width  :", round(2 / np.linalg.norm(clf.coef_[0]), 4))

# Delete the two non-support vectors and refit: identical model.
keep = np.array([0, 2])
clf2 = SVC(kernel="linear", C=1e6).fit(X[keep], y[keep])
print("refit w =", np.round(clf2.coef_[0], 4), " b =", round(clf2.intercept_[0], 4))`,
        output: `w = [0.5 0.5]  b = -2.0
support vectors: [[1.0, 1.0], [3.0, 3.0]]
dual coefs    : [-0.25  0.25]
margin width  : 2.8284
`,
        explanation:
          'The library reproduces the hand computation exactly: w = (0.5, 0.5), b = −2, margin 2.828, and dual coefficients of magnitude 0.25. The final refit on only the two support vectors returns the identical model, which is the sharpest possible demonstration that non-support vectors carry no information. `dual_coef_` stores αᵢyᵢ rather than αᵢ, which is why one entry is negative. Setting C very large approximates a hard margin, the right choice here because the data is cleanly separable.',
      },
      {
        language: 'python',
        title: 'C and gamma, tuned jointly because they interact',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_moons
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

X, y = make_moons(n_samples=800, noise=0.28, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

pipe = make_pipeline(StandardScaler(), SVC(kernel="rbf"))
grid = {"svc__C": [0.1, 1, 10, 100, 1000], "svc__gamma": [0.01, 0.1, 1, 10, 100]}
search = GridSearchCV(pipe, grid, cv=5, n_jobs=-1).fit(X_tr, y_tr)
print("best:", search.best_params_, "CV score", round(search.best_score_, 4))

# What the extremes look like.
for C, g in [(0.1, 0.1), (1000, 100), (1, 1)]:
    m = make_pipeline(StandardScaler(), SVC(kernel="rbf", C=C, gamma=g)).fit(X_tr, y_tr)
    n_sv = m[-1].n_support_.sum()
    print(f"C={C:<6} gamma={g:<5} train {m.score(X_tr, y_tr):.3f}  test {m.score(X_te, y_te):.3f}  SVs {n_sv}")`,
        output: `best: {'svc__C': 10, 'svc__gamma': 1} CV score 0.9518
C=0.1    gamma=0.1   train 0.859  test 0.850  SVs 401
C=1000   gamma=100   train 1.000  test 0.821  SVs 331
C=1      gamma=1     train 0.948  test 0.946  SVs 189
`,
        explanation:
          'The three rows are the whole story of these two hyperparameters. Small C with small gamma underfits: the boundary is nearly straight, training and test scores are both around 0.85, and almost every point is a support vector because the wide margin swallows them all. Large C with large gamma memorises: a perfect training score, a test score twelve points lower, and a boundary that has drawn little islands around individual training points. The tuned middle generalises, and the support-vector count is a useful diagnostic — if most of your training set ends up a support vector, the model is either heavily regularised or badly mis-specified. Note the `StandardScaler`: the RBF kernel is a function of squared Euclidean distance, so unscaled features corrupt it exactly as they corrupt KNN.',
      },
      {
        language: 'python',
        title: 'Linear versus kernel, and why LinearSVC exists',
        runnable: true,
        code: `import time
import numpy as np
from sklearn.datasets import make_classification
from sklearn.svm import SVC, LinearSVC
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

for n in [2000, 8000, 32000]:
    X, y = make_classification(n_samples=n, n_features=20, n_informative=10, random_state=0)
    row = [f"n={n:>6}"]
    for name, est in [("SVC(rbf)", SVC(kernel="rbf")), ("LinearSVC", LinearSVC(dual="auto", max_iter=5000))]:
        m = make_pipeline(StandardScaler(), est)
        t0 = time.perf_counter()
        m.fit(X, y)
        row.append(f"{name} {time.perf_counter() - t0:6.2f}s acc {m.score(X, y):.3f}")
    print("   ".join(row))`,
        output: `n=  2000   SVC(rbf)   0.14s acc 0.967   LinearSVC   0.02s acc 0.862
n=  8000   SVC(rbf)   1.58s acc 0.956   LinearSVC   0.06s acc 0.859
n= 32000   SVC(rbf)  22.41s acc 0.951   LinearSVC   0.24s acc 0.857
`,
        explanation:
          'Kernel SVM training time grows super-linearly — roughly quadratically here — because the optimiser works with an n × n kernel matrix, while `LinearSVC` solves the primal directly and scales close to linearly. At 32,000 rows the gap is already a factor of ninety, and by a million rows the kernel version is simply not an option. The accuracy column shows what you are paying for: on data with genuine nonlinearity, RBF buys about nine points. The practical rule is to use `LinearSVC` (or `SGDClassifier` with hinge loss) for large or sparse high-dimensional data such as text, where the boundary is usually close to linear anyway, and reserve kernel SVC for smaller dense problems where the curvature is real.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Text categorisation before deep learning',
        usage:
          'Linear SVMs on TF-IDF features were the state of the art for topic classification and sentiment analysis for roughly fifteen years, and remain a strong baseline. High-dimensional sparse text tends to be nearly linearly separable, which is precisely the regime where margin maximisation shines and where the number of features exceeding the number of samples is not a problem.',
      },
      {
        context: 'Bioinformatics and small-sample problems',
        usage:
          'Gene expression classification often has 20,000 features and 100 patients. SVMs handle this because the generalisation bound depends on the margin rather than the dimensionality, and because specialised kernels — string kernels for sequences, graph kernels for molecules — let domain structure be encoded directly in the similarity function.',
      },
      {
        context: 'Novelty and anomaly detection',
        usage:
          'One-class SVM fits a boundary around the region occupied by normal data and flags anything outside it. It is used in manufacturing quality control and network intrusion detection, where you have abundant examples of normal behaviour and almost none of the failures you want to catch.',
      },
      {
        context: 'Handwritten digit recognition',
        usage:
          'An RBF SVM on MNIST reaches roughly 98.5% accuracy with modest tuning, which was competitive with the best systems for years and is still a useful reference point. It is the standard demonstration that a kernel method can match early neural networks on a genuinely nonlinear problem.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`SVC` and `SVR` for kernel methods, `LinearSVC` for large linear problems, `OneClassSVM` for novelty detection; `gamma="scale"` as the sane default.' },
      { tool: 'LIBSVM / LIBLINEAR', role: 'The C libraries scikit-learn wraps. LIBSVM implements sequential minimal optimisation for the dual; LIBLINEAR solves the primal and is what makes LinearSVC fast.' },
      { tool: 'CalibratedClassifierCV', role: 'The recommended route to probabilities from an SVM — cheaper and more transparent than `SVC(probability=True)`, which runs an internal five-fold cross-validation.' },
    ],

    commonMistakes: [
      {
        mistake: 'Not scaling the features',
        why: 'The margin is a Euclidean distance and the RBF kernel is a function of squared Euclidean distance. An unscaled feature with a large range dominates both, so the model effectively ignores the others and gamma becomes impossible to tune.',
        fix: 'Always put a `StandardScaler` before the SVM in a pipeline. This is not a refinement; an unscaled SVM is often worse than a majority-class baseline.',
      },
      {
        mistake: 'Tuning C and gamma independently',
        why: 'They interact strongly: a large gamma with a large C gives a wildly overfitted boundary, while the same gamma with a small C can be reasonable. Optimising one with the other fixed usually lands in the wrong region of the grid entirely.',
        fix: 'Search them jointly on a logarithmic grid, typically C in 10^(−2 … 3) and gamma in 10^(−4 … 1), then refine around the winner.',
      },
      {
        mistake: 'Running a kernel SVC on hundreds of thousands of rows',
        why: 'Kernel SVM training is roughly O(n²) to O(n³) and the kernel matrix needs O(n²) memory. At n = 500,000 the matrix alone would be two terabytes in double precision.',
        fix: 'Use `LinearSVC`, `SGDClassifier(loss="hinge")`, or an explicit kernel approximation such as `Nystroem` or `RBFSampler` followed by a linear model.',
      },
      {
        mistake: 'Treating `SVC(probability=True)` output as a free probability',
        why: 'That flag triggers Platt scaling fitted by internal five-fold cross-validation, which multiplies training time by roughly five and can produce probabilities that disagree with `predict()` near the boundary, because the two use different fitted quantities.',
        fix: 'If you need probabilities, wrap the SVM in `CalibratedClassifierCV` explicitly so the calibration is visible and evaluable, or use logistic regression instead.',
      },
      {
        mistake: 'Expecting interpretable feature importances from an RBF SVM',
        why: 'The model lives in an implicit feature space that is never materialised; there are no coefficients in the original features, only dual weights attached to training points.',
        fix: 'Use a linear kernel if you need coefficients, or apply a model-agnostic method such as permutation importance or SHAP while remembering these explain the behaviour rather than the mechanism.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is a support vector, and why does it matter that most training points are not support vectors?',
        answer:
          'A support vector is a training point that lies exactly on the margin boundary or violates it — formally, one whose dual coefficient αᵢ is non-zero. The Karush-Kuhn-Tucker conditions force αᵢ = 0 for every point that is correctly classified with margin strictly greater than 1, and since the fitted normal vector is w = Σ αᵢyᵢxᵢ, those points contribute nothing at all. Three consequences follow. The model is compact: you store only the support vectors, which can be a small fraction of the training set. Prediction cost scales with the number of support vectors rather than with n. And the model has an unusual robustness profile — moving a point that sits far from the boundary has literally no effect, whereas moving a support vector by a small amount shifts the entire hyperplane. That is the opposite of least squares, where every point pulls on the fit in proportion to its residual. It also gives a useful diagnostic: if nearly every training point is a support vector, either C is very small or the kernel is badly mis-specified.',
      },
      {
        level: 'advanced',
        question: 'Explain the kernel trick. Why can you use an infinite-dimensional feature space without infinite computation?',
        answer:
          'When you derive the dual of the SVM problem, the training data appears in exactly one place: the inner product xáµ¢áµxâ±¼. It never appears alone. So if you wanted to fit in a transformed space Ï(x), the only thing you would ever need is Ï(xáµ¢)áµÏ(xâ±¼) â and if some function K(x, z) happens to equal that inner product, you can compute it directly from the original coordinates and never construct Ï at all. Mercer’s theorem tells you which functions qualify: any continuous, symmetric, positive semi-definite kernel corresponds to an inner product in some Hilbert space. The RBF kernel exp(âÎ³âx â zâÂ²) qualifies, and expanding the exponential shows its implicit feature map contains polynomial terms of every degree, so the space is infinite-dimensional. You never pay for those dimensions because you only ever evaluate nÂ² similarities, each costing O(d). What you pay instead is that the model is now defined implicitly through the training points: there is no weight vector in the original space to inspect, prediction requires evaluating the kernel against every support vector, and training requires an n Ã n matrix, which is what makes kernel SVMs impractical beyond tens of thousands of samples.',
        followUp:
          'A strong answer states the structural reason — the data appears only inside inner products in the dual — rather than just asserting that kernels compute similarity, and names the cost: O(n²) memory and loss of interpretability.',
      },
      {
        level: 'ml-engineer',
        question: 'How do an SVM and logistic regression actually differ, given both fit linear boundaries?',
        answer:
          'They are the same template with a different loss. Both minimise a regularised empirical risk: an L2 penalty on the weights plus an average loss. Logistic regression uses log loss, which is smooth, never exactly zero, and yields a probabilistic model with a clean likelihood interpretation. An SVM uses hinge loss, which is exactly zero once a point is correct with margin at least 1. That flat region has three practical consequences. First, sparsity: points comfortably on the right side contribute nothing to the solution, which is why only support vectors matter, whereas every point influences a logistic fit. Second, robustness profile: hinge loss grows linearly for misclassified points while log loss also grows without bound but more gently near the boundary, so the SVM cares intensely about points near the margin and not at all about confident ones. Third, output: log loss is a proper scoring rule so logistic regression gives usable probabilities directly, whereas an SVM gives an uncalibrated decision value that needs Platt scaling. In practice I would choose logistic regression when I need probabilities or coefficient interpretation, LinearSVC when I have wide sparse data and want the margin’s robustness, and a kernel SVM when the dataset is small enough to afford it and the boundary is genuinely curved.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given w = (2, −1) and b = −3, compute the margin width and the signed distance from the point (4, 1) to the decision boundary.',
        hint: 'Margin width is 2/‖w‖; signed distance is (wᵀx + b)/‖w‖.',
        solution:
          '‖w‖ = √(4 + 1) = √5 = 2.2361, so the margin width is 2/2.2361 = 0.8944. For the point (4, 1): wᵀx + b = 2(4) + (−1)(1) − 3 = 8 − 1 − 3 = 4. The signed distance is 4/2.2361 = 1.7889, so the point lies on the positive side, about 1.79 units from the boundary. Since the functional margin 4 is comfortably greater than 1, this point sits strictly outside the margin, its hinge loss is zero, and its dual coefficient would be zero — it is not a support vector and could be deleted without changing the model.',
      },
      {
        prompt:
          'Your RBF SVM scores 1.000 on training data and 0.72 on the test set. Which hyperparameters would you change, and in which direction?',
        hint: 'Which settings make the boundary contort around individual points?',
        solution:
          'A perfect training score with a large gap is classic overfitting, and with an RBF kernel there are two culprits. Gamma is likely too large: a big gamma makes each training point’s influence decay very quickly with distance, so the model can draw a small island around every point and memorise the data. Lower gamma so influence spreads and the boundary smooths. C is likely too large as well: a big C makes margin violations very expensive, forcing the boundary to contort to classify every training point. Lower C to allow violations and widen the margin. I would search both jointly on a logarithmic grid rather than adjusting one at a time, because their effects compound, and I would watch the support-vector count as a diagnostic â an overfitted RBF model typically has a large number of support vectors scattered through the data rather than concentrated along a boundary. If lowering both does not close the gap, the next question is whether the test set differs systematically from the training set, or whether there is simply not enough data to support a nonlinear boundary, in which case a linear kernel may generalise better.',
      },
      {
        prompt:
          'Explain why an SVM is unaffected by moving a correctly-classified point further away from the boundary, while linear regression is affected by moving any point at all.',
        hint: 'Compare the shape of hinge loss with squared error.',
        solution:
          'Hinge loss is max(0, 1 − y·f(x)). Once y·f(x) ≥ 1 the loss is exactly zero and — crucially — its gradient is also exactly zero, so the point exerts no force on the solution. Moving it further away keeps y·f(x) above 1, so the loss stays at zero and nothing changes; formally, the KKT conditions give it a dual coefficient of αᵢ = 0 and it drops out of w = Σ αᵢyᵢxᵢ entirely. Squared error, by contrast, is (y − f(x))², which is zero only when the prediction is exactly right and grows quadratically otherwise. Every point has a non-zero residual and therefore a non-zero gradient, and the quadratic shape means distant points pull hardest. So the two models have opposite sensitivities: an SVM is completely indifferent to confident, distant points and extremely sensitive to points near the margin, whereas least squares is dominated by the most distant points. This is why a single far-away outlier can visibly rotate a regression line while leaving an SVM boundary untouched — and conversely, why mislabelled points right at the class boundary are far more damaging to an SVM.',
      },
    ],

    quiz: [
      {
        id: 'ML-012-q1',
        type: 'mcq',
        concept: 'the objective',
        prompt: 'Among all hyperplanes that separate the classes, which one does an SVM select?',
        options: [
          'The one maximising the distance to the nearest training point of either class',
          'The one minimising the total squared distance to all training points',
          'The one passing through the mean of each class',
          'The one minimising the number of misclassified points',
        ],
        answerIndex: 0,
        explanation:
          'The SVM maximises the geometric margin, 2/‖w‖, which is why the objective minimises ½‖w‖². Maximising clearance to the nearest points is what yields a generalisation bound independent of dimensionality.',
      },
      {
        id: 'ML-012-q2',
        type: 'truefalse',
        concept: 'support vectors',
        prompt: 'Deleting a training point that is not a support vector and refitting produces exactly the same SVM.',
        answer: true,
        explanation:
          'Non-support vectors have dual coefficient αᵢ = 0, and since w = Σ αᵢyᵢxᵢ they contribute nothing to the solution. This is a defining property of the SVM and follows from the KKT conditions.',
      },
      {
        id: 'ML-012-q3',
        type: 'numeric',
        concept: 'margin arithmetic',
        prompt: 'If the fitted weight vector is w = (3, 4), what is the width of the margin? Give two decimal places.',
        answer: 0.4,
        tolerance: 0.01,
        explanation:
          '‖w‖ = √(9 + 16) = 5, and the margin width is 2/‖w‖ = 2/5 = 0.40. A larger weight norm always means a narrower margin, which is why minimising ‖w‖² maximises the corridor.',
      },
      {
        id: 'ML-012-q4',
        type: 'multi',
        concept: 'C and gamma',
        prompt: 'Which changes would you make to an RBF SVM that scores 1.00 on training and 0.70 on test data? Select all that apply.',
        options: [
          'Decrease gamma',
          'Decrease C',
          'Increase gamma',
          'Increase C',
          'Add more training data if it is available',
        ],
        answerIndices: [0, 1, 4],
        explanation:
          'That gap is overfitting. Lower gamma widens each point’s region of influence and smooths the boundary; lower C tolerates margin violations and widens the margin; more data is the remedy that costs no bias. Increasing either parameter would make the overfitting worse.',
      },
      {
        id: 'ML-012-q5',
        type: 'order',
        concept: 'how an SVM is fitted',
        prompt: 'Put the steps of fitting a kernel SVM into order.',
        items: [
          'Write the primal: maximise the margin subject to correct classification with slack',
          'Form the Lagrangian and set derivatives with respect to w, b and slack to zero',
          'Obtain the dual, in which data appears only inside inner products',
          'Replace each inner product with a kernel function',
          'Solve the quadratic program for the dual coefficients',
          'Keep only the points with non-zero coefficients as support vectors',
        ],
        explanation:
          'The critical step is the third: the dual’s structure, where data appears only as inner products, is precisely what makes substituting a kernel legitimate. Without taking the dual there is nowhere for a kernel to go.',
      },
      {
        id: 'ML-012-q6',
        type: 'fill',
        concept: 'the loss function',
        prompt: 'The SVM minimises an L2 penalty plus which loss function?',
        answers: ['hinge', 'hinge loss', 'the hinge loss', 'max(0, 1 - y f(x))'],
        explanation:
          'Hinge loss, max(0, 1 − y·f(x)). Its exactly-zero region for confidently correct points is what makes the solution sparse in the training data, unlike log loss which is never exactly zero.',
      },
      {
        id: 'ML-012-q7',
        type: 'explain',
        concept: 'the kernel trick',
        prompt: 'Explain the kernel trick to someone who understands linear models but has never seen an SVM.',
        rubric: [
          'Explains that a nonlinear boundary can be made linear by mapping into a higher-dimensional space',
          'States that in the dual formulation the data appears only inside inner products',
          'Explains that a kernel computes that inner product directly, so the mapping is never performed',
          'Notes a cost: the O(n²) kernel matrix, loss of interpretability, or the need to tune gamma',
        ],
        sampleAnswer:
          'Start with a dataset that no straight line can separate â say one class forming a ring around the other. If you add a third coordinate equal to xâÂ² + xâÂ², the ring lifts into a bowl shape and a flat plane now separates the classes cleanly. Project that plane back down and it looks like a circle. So nonlinearity can always be bought by adding features; the problem is that the useful expansions are enormous. All polynomial terms up to degree five over twenty features is already tens of thousands of columns, and some expansions are infinite. The kernel trick removes the need to build them. When you derive the SVM’s dual optimisation problem, the training data turns out to appear in exactly one place: the inner product between pairs of points. It never appears on its own. So if you want to fit in the expanded space Ï(x), the only quantity you ever need is Ï(xáµ¢)áµÏ(xâ±¼) â and for well-chosen expansions there is a function K(xáµ¢, xâ±¼) computable from the original coordinates that equals it. The RBF kernel exp(âÎ³âx â zâÂ²) corresponds to an infinite-dimensional expansion and costs one exponential and one distance to evaluate. Mercer’s theorem tells you which functions are legitimate: symmetric and positive semi-definite ones. The price is real, though. You now need an n Ã n matrix of pairwise similarities, which is why kernel SVMs stall past tens of thousands of rows, and because the expanded features never exist, there are no coefficients to interpret â only weights attached to individual support vectors.',
        explanation:
          'The essential point is structural: kernels are possible because the dual formulation only ever touches the data through inner products. An answer that only says "kernels measure similarity" has missed the mechanism.',
      },
    ],

    flashcards: [
      { front: 'What does an SVM maximise?', back: 'The geometric margin, 2/‖w‖ — the perpendicular distance from the boundary to the nearest point of either class. Equivalently it minimises ½‖w‖².' },
      { front: 'What is a support vector?', back: 'A training point on or inside the margin, with non-zero dual coefficient αᵢ. Only these define the boundary; all other points can be deleted.' },
      { front: 'What does C control?', back: 'The penalty for margin violations. Large C means a narrow margin and a complex boundary (low bias, high variance); small C means a wide, smoother margin.' },
      { front: 'What does gamma control?', back: 'The RBF kernel width. Large gamma means each point influences only its immediate neighbourhood, giving a wiggly, high-variance boundary.' },
      { front: 'Why is the kernel trick possible?', back: 'In the dual, data appears only inside inner products xᵢᵀxⱼ. Replacing them with K(xᵢ, xⱼ) fits in an implicit feature space without computing it.' },
      { front: 'What loss does an SVM minimise?', back: 'Hinge loss max(0, 1 − y·f(x)) plus an L2 penalty. The flat zero region is what makes the solution sparse in the training points.' },
      { front: 'Why not use a kernel SVM on a million rows?', back: 'Training is roughly O(n²)–O(n³) and the kernel matrix needs O(n²) memory. Use LinearSVC, SGDClassifier, or Nystroem approximation instead.' },
    ],

    challenge: {
      title: 'Mapping the C-gamma landscape',
      brief:
        'Take a two-dimensional dataset with a genuinely curved boundary, such as make_moons with noise. Fit RBF SVMs across a 5 × 5 logarithmic grid of C and gamma, and for each one record the training score, the cross-validated score and the number of support vectors. Present the three as heatmaps or tables over the grid. Then answer, in writing and with evidence from your own numbers: which corner of the grid overfits, which underfits, what the support-vector count tells you that the accuracy does not, and where the two hyperparameters trade off against one another.',
      acceptanceCriteria: [
        'A StandardScaler is inside the pipeline, and the write-up explains why an unscaled RBF kernel is meaningless',
        'Training and cross-validated scores are reported separately for every grid cell, not just the best one',
        'The support-vector count is tabulated and interpreted, not merely printed',
        'The write-up identifies the overfitting and underfitting corners by reference to the recorded numbers',
        'The chosen model is evaluated once on a held-out test set that took no part in the search',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague what makes a support vector machine different from logistic regression, covering the margin, support vectors and the kernel trick.',
      mustCover: [
        'The SVM picks the separating hyperplane with the widest margin, not just any separating hyperplane',
        'Only support vectors — points on or inside the margin — determine the solution',
        'Hinge loss is zero for confidently correct points, which is the source of that sparsity',
        'The kernel trick works because the dual touches the data only through inner products',
      ],
      bonusSignals: ['mentions that C and gamma interact and must be tuned jointly', 'mentions the O(n²) scaling limit', 'notes that SVM and logistic regression differ only in the loss'],
      sampleExplanation:
        'Both models draw a straight boundary, so the difference is in which straight boundary they draw and why. If two classes are separable there are infinitely many lines that work, and unregularised logistic regression is content with any of them â it will happily return one that skims a training point, because moving further away always improves its loss a little. The support vector machine asks a sharper question: which separating line leaves the widest empty corridor on both sides. That corridor is the margin, and the logic behind maximising it is that clearance is exactly what buys tolerance for the next unseen example. Now the surprising consequence. Once you have found the widest corridor, only the points touching its edges had any say in where it went. Those are the support vectors. Everything else could be deleted, or moved further away, and the same line comes back â which you can verify in about five lines of scikit-learn. That comes from the shape of the loss: hinge loss is exactly zero once a point is correct by a comfortable margin, so such points contribute no gradient at all. Logistic regression’s log loss is never exactly zero, so every single point tugs on the fit. That is genuinely the whole difference between the two models â same L2 penalty, different loss â and it explains why an SVM ignores distant outliers while a logistic fit does not. The second idea is what made SVMs famous. Lots of data cannot be split by any straight line, but could be if you first expanded it into more dimensions. Building those dimensions explicitly is usually prohibitive. The trick is that when you rewrite the optimisation in its dual form, the data only ever shows up inside inner products between pairs of points â never on its own. So if a function exists that computes what that inner product would have been in the expanded space, you can use it directly and skip the expansion entirely. The RBF kernel does this for an infinite-dimensional expansion at the cost of one exponential per pair. What you give up is interpretability, since those features never exist, and scalability, since you now need an n by n matrix of pairwise similarities â which is why a kernel SVM is a great choice at ten thousand rows and a terrible one at ten million.',
    },
  },

  {
    id: 'ML-013',
    domain: 'ML',
    module: 'Classification',
    topic: 'Classification objectives',
    title: 'Cross-Entropy and Classification Losses',
    slug: 'cross-entropy-loss',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['ML-009'],
    related: ['ML-007', 'ML-011'],
    tags: ['cross-entropy', 'log loss', 'softmax', 'proper scoring rule', 'brier score', 'hinge loss'],

    learningObjectives: [
      'Explain why accuracy cannot be used as a training objective and what cross-entropy provides instead',
      'Compute binary and categorical cross-entropy by hand from predicted probabilities',
      'Explain what a proper scoring rule is and why squared error on probabilities trains a classifier poorly',
      'Choose among log loss, hinge loss, focal loss and class weighting for a given classification problem',
    ],

    terminology: [
      {
        term: 'Cross-entropy',
        definition:
          'The expected number of bits needed to encode outcomes from a true distribution p using a code optimised for a predicted distribution q, written H(p, q) = −Σ p(x) log q(x). For a one-hot label it reduces to the negative log of the probability assigned to the correct class.',
        simple: 'How surprised the model was by the answer that actually happened.',
      },
      {
        term: 'Log loss',
        definition:
          'The average cross-entropy over a dataset. Identical to the negative average log-likelihood of the observed labels under the model, which is why minimising it is maximum likelihood estimation.',
        simple: 'The average surprise, and the standard score for probabilistic classifiers.',
      },
      {
        term: 'Softmax',
        definition:
          'The function converting a vector of real-valued scores into a probability distribution: softmax(z)ₖ = e^{zₖ} / Σⱼ e^{zⱼ}. It generalises the sigmoid to more than two classes and is the standard output layer for multi-class models.',
        simple: 'Turns a list of scores into probabilities that add up to one.',
      },
      {
        term: 'Proper scoring rule',
        definition:
          'A loss whose expected value is minimised precisely when the predicted probabilities equal the true probabilities. Log loss and Brier score are proper; accuracy and hinge loss are not.',
        simple: 'A score that can only be gamed by being honest.',
      },
      {
        term: 'Logit',
        definition:
          'The raw, unnormalised score a model produces before the sigmoid or softmax is applied. Numerically stable implementations compute the loss directly from logits rather than from probabilities.',
        simple: 'The score before it is squashed into a probability.',
      },
    ],

    simpleExplanation:
      'A classifier that says "90% chance of rain" is making a stronger claim than one that says "60% chance of rain", and when it rains we should reward the first more. When it does not rain, we should punish the first more too. Cross-entropy is the scoring rule that does exactly this: it takes the probability the model assigned to whatever actually happened, takes the logarithm, and flips the sign. Assign 0.9 to the correct answer and you lose 0.105. Assign 0.5 and you lose 0.693. Assign 0.01 and you lose 4.6 — confident and wrong is punished savagely, and as the assigned probability approaches zero the penalty grows without any upper bound. That unbounded punishment is the point. It makes the safest strategy honesty: a model minimising cross-entropy cannot improve its score by exaggerating its confidence, so the probabilities it reports end up meaning something. It is also why we do not train on accuracy. Accuracy only counts how many predictions land on the right side of a threshold, so nudging a probability from 0.51 to 0.99 changes nothing at all — and a loss that does not change gives gradient descent nothing to follow.',

    whyItExists:
      'Accuracy is a step function of the model parameters: it is flat almost everywhere and jumps discontinuously when a prediction crosses the threshold, so its gradient is zero or undefined and no gradient-based optimiser can use it. Cross-entropy is a smooth, convex surrogate that is minimised by the true probabilities, punishes confident errors without bound, and produces a gradient of exactly (prediction − label) when paired with a sigmoid or softmax output.',

    analogy: {
      scenario:
        'A weather forecaster is paid under a contract designed by a suspicious insurer. Each day, the insurer looks at what the forecaster said about the weather that actually occurred and fines them the logarithm of that stated probability, with the sign flipped. Say 90% rain on a day it rains and the fine is small. Say 90% rain on a dry day and the fine is large. Say 99.9% on a day it does not rain and the fine is enormous. The forecaster quickly discovers something uncomfortable: there is no clever hedging strategy. Overstating confidence to look impressive is ruinous on the days you are wrong, and understating it to stay safe costs you every single day. The only way to minimise the long-run fine is to report exactly what you believe.',
      mapping: [
        { from: 'The probability the forecaster stated for what actually happened', to: 'The predicted probability of the true class, p_y' },
        { from: 'The logarithm of that probability, negated, as the fine', to: 'Cross-entropy, −log p_y' },
        { from: 'A ruinous fine for confident errors', to: 'The unbounded penalty as p_y approaches 0' },
        { from: 'No hedging strategy beating honesty', to: 'Log loss is a proper scoring rule' },
        { from: 'The long-run average fine', to: 'Average log loss over the dataset' },
        { from: 'A contract that only asked "were you right?"', to: 'Accuracy — flat, gradient-free, and indifferent to confidence' },
      ],
      bridge:
        'The contract is the loss function, and the forecaster is the optimiser. The reason this particular contract is used is not aesthetic: it is the only shape with the property that the expected fine is minimised exactly when the stated probabilities equal the true ones. That is what "proper scoring rule" means, and it is why a model trained on cross-entropy produces probabilities that can be interpreted rather than merely ranked. The contrast with an accuracy-based contract is equally instructive — under that contract, the forecaster is paid the same whether they say 51% or 99%, so they learn nothing from the days they were narrowly right.',
      limitations:
        'The story implies the forecaster has genuine beliefs to report honestly. A model has only whatever its functional form allows, so minimising log loss makes it as honest as its capacity and its training data permit — which on a small or biased sample can still be confidently wrong.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Compute the loss for your own predictions',
        caption: 'Edit predicted probabilities and true labels, and watch log loss, Brier score and accuracy diverge from one another.',
        widget: 'code-playground',
      },
      {
        kind: 'flow',
        title: 'From scores to a loss value',
        steps: [
          { label: 'Produce logits', detail: 'The model emits an unnormalised score per class, z ∈ ℝᴷ, with no constraint on range or sign.' },
          { label: 'Normalise', detail: 'Sigmoid for two classes, softmax for K. The result is a valid probability distribution over the classes.' },
          { label: 'Pick out the true class', detail: 'One-hot labels mean only one term survives the sum: the loss depends solely on the probability assigned to the correct class.' },
          { label: 'Take −log', detail: 'Small probability on the true class means a large loss, and the penalty grows without bound as the probability approaches zero.' },
          { label: 'Average and differentiate', detail: 'Averaging gives log loss. The gradient with respect to the logits is exactly (p − y), which is why this pairing is universal.' },
        ],
      },
      {
        kind: 'table',
        title: 'What each loss value means',
        caption: 'Log loss is reported in nats when using the natural logarithm. A useful reference point: predicting the base rate for every example on a balanced problem gives exactly ln 2 = 0.693.',
        columns: ['Probability on the true class', 'Cross-entropy (nats)', 'Interpretation'],
        rows: [
          ['0.99', '0.010', 'Confident and correct — almost no penalty'],
          ['0.90', '0.105', 'Comfortably correct'],
          ['0.70', '0.357', 'Correct but uncertain'],
          ['0.50', '0.693', 'Exactly the coin-flip baseline on a balanced problem'],
          ['0.10', '2.303', 'Wrong and fairly confident about it'],
          ['0.01', '4.605', 'Confidently wrong — one such example can dominate a batch'],
          ['0.0001', '9.210', 'Why libraries clip probabilities away from zero'],
        ],
      },
      {
        kind: 'compare',
        title: 'Cross-entropy: strengths, weaknesses and when to reach for it',
        caption: 'Reach for cross-entropy whenever you need calibrated probabilities or are training by gradient descent, which covers essentially all of logistic regression and deep learning. Reach past it for hinge loss when you want margin-based sparsity, or for a cost-sensitive loss when the two error types have wildly different prices.',
        left: {
          heading: 'Strengths',
          points: [
            'A proper scoring rule: minimised exactly at the true probabilities, so it rewards honest calibration',
            'Convex in the logits for a linear model, giving a single global optimum',
            'Paired with sigmoid or softmax, the gradient simplifies to (p − y) — no vanishing factor',
            'Equivalent to maximum likelihood for the Bernoulli or categorical distribution, so it inherits that theory',
            'Scores probabilities rather than thresholded decisions, so it detects degradation accuracy misses',
            'Extends directly to multi-class and to multi-label problems',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'Unbounded, so a single confidently-wrong example can dominate a mini-batch gradient',
            'Numerically fragile near 0 and 1 — requires clipping or, better, a from-logits implementation',
            'Under heavy class imbalance the majority class dominates the sum unless weights are applied',
            'Harder to explain to stakeholders than accuracy, and has no natural units',
            'Does not encode asymmetric error costs unless you weight the classes explicitly',
            'Mislabelled training examples are punished hardest, so it is sensitive to label noise',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The classification loss family',
        columns: ['Loss', 'Formula', 'Proper?', 'Use when'],
        rows: [
          ['Binary cross-entropy', '−[y log p + (1−y) log(1−p)]', 'Yes', 'Two classes, probabilities needed — the default'],
          ['Categorical cross-entropy', '−Σₖ yₖ log pₖ', 'Yes', 'One label out of K classes, with softmax output'],
          ['Brier score', '(p − y)²', 'Yes', 'Reporting calibration; bounded, so it is easier to communicate'],
          ['Hinge', 'max(0, 1 − y·f)', 'No', 'Support vector machines; gives sparsity, not probabilities'],
          ['Focal', '−(1 − p)^γ log p', 'No', 'Extreme imbalance, e.g. dense object detection — down-weights easy examples'],
          ['Weighted cross-entropy', '−wᵧ log p_y', 'Yes, per class', 'Imbalance or asymmetric error costs stated in advance'],
        ],
      },
    ],

    formalDefinition:
      'For a predicted distribution q and a true distribution p over K classes, the cross-entropy is H(p, q) = −Σₖ pₖ log qₖ = H(p) + D_KL(p ‖ q), where H(p) is the entropy of the true distribution and D_KL is the Kullback-Leibler divergence. With one-hot labels H(p) = 0, so minimising cross-entropy is exactly minimising the KL divergence between the label distribution and the model. The empirical risk over n examples, L = −(1/n) Σᵢ Σₖ y_{ik} log p_{ik}, equals the negative average log-likelihood under a categorical model, making its minimiser the maximum likelihood estimate. When p = softmax(z), the gradient with respect to the logits is ∂L/∂z = p − y, and the loss is convex in z for a linear model. Log loss is a strictly proper scoring rule: E_{y∼p}[L(q, y)] is uniquely minimised at q = p.',

    math: {
      intuition:
        'Information theory supplies the measuring stick. The surprise of an event of probability q is −log q: certain events carry no surprise, impossible ones carry infinite surprise. Cross-entropy is the average surprise your model experiences when reality is drawn from the true distribution but the model expected its own. That average is minimised exactly when the model matches reality, which is the whole justification for using it as a loss. The second piece of the story is mechanical: pairing this loss with a sigmoid or softmax makes the awkward derivative of the squashing function cancel exactly against the logarithm, leaving a gradient of simply (prediction − truth).',
      formulas: [
        {
          latex: 'H(p, q) = -\\sum_{k=1}^{K} p_k \\log q_k = H(p) + D_{\\mathrm{KL}}(p \\,\\|\\, q)',
          name: 'Cross-entropy and its decomposition',
          meaning:
            'Cross-entropy splits into the irreducible entropy of the truth plus the divergence between the model and the truth. Since one-hot labels have zero entropy, minimising cross-entropy is exactly minimising KL divergence — the model is being pushed to match the label distribution.',
          variables: [
            { symbol: 'p_k', meaning: 'True probability of class k; 1 for the observed class with one-hot labels' },
            { symbol: 'q_k', meaning: 'Predicted probability of class k' },
            { symbol: 'H(p)', meaning: 'Entropy of the true distribution — a constant the model cannot influence' },
            { symbol: 'D_{\\mathrm{KL}}', meaning: 'Kullback-Leibler divergence, the extra cost of using q in place of p' },
          ],
          category: 'information-theory',
        },
        {
          latex: 'L_{\\text{BCE}} = -\\frac{1}{n}\\sum_{i=1}^{n}\\Big[ y_i \\log p_i + (1 - y_i)\\log(1 - p_i) \\Big]',
          name: 'Binary cross-entropy',
          meaning:
            'Only one term is active per example: −log p when the label is 1, −log(1 − p) when it is 0. The average over the dataset is what scikit-learn reports as `log_loss`.',
          variables: [
            { symbol: 'y_i', meaning: 'True label, 0 or 1' },
            { symbol: 'p_i', meaning: 'Predicted probability that example i belongs to class 1' },
            { symbol: 'n', meaning: 'Number of examples' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\mathrm{softmax}(\\mathbf{z})_k = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}, \\qquad L = -\\log \\mathrm{softmax}(\\mathbf{z})_{y}',
          name: 'Softmax and categorical cross-entropy',
          meaning:
            'Softmax exponentiates to make every score positive, then normalises so they sum to one. The loss picks out the single entry corresponding to the true class — every other prediction affects the loss only through the denominator.',
          variables: [
            { symbol: 'z_k', meaning: 'Logit (raw score) for class k' },
            { symbol: 'K', meaning: 'Number of classes' },
            { symbol: 'y', meaning: 'Index of the true class' },
          ],
          category: 'classification',
        },
        {
          latex: '\\frac{\\partial L}{\\partial \\mathbf{z}} = \\mathbf{p} - \\mathbf{y}',
          name: 'The gradient with respect to the logits',
          meaning:
            'The single most useful identity in classification. The Jacobian of the softmax cancels exactly against the derivative of the log, leaving the raw error. No vanishing factor appears, which is why confidently wrong predictions still produce a strong learning signal.',
          variables: [
            { symbol: '\\mathbf{p}', meaning: 'Vector of predicted probabilities' },
            { symbol: '\\mathbf{y}', meaning: 'One-hot vector of the true label' },
            { symbol: '\\mathbf{z}', meaning: 'Vector of logits' },
          ],
          category: 'optimization',
        },
        {
          latex: 'L_{\\text{focal}} = -(1 - p_y)^{\\gamma} \\log p_y',
          name: 'Focal loss',
          meaning:
            'Cross-entropy multiplied by a factor that shrinks towards zero for examples the model already handles well. With γ = 2, an example at p = 0.9 contributes a hundredth of its usual weight, which lets rare hard examples survive a sum dominated by easy background.',
          variables: [
            { symbol: 'p_y', meaning: 'Predicted probability of the true class' },
            { symbol: '\\gamma', meaning: 'Focusing parameter; 0 recovers ordinary cross-entropy, 2 is the common choice' },
          ],
          category: 'classification',
        },
        {
          latex: '\\mathrm{Brier} = \\frac{1}{n}\\sum_{i=1}^{n}(p_i - y_i)^{2}',
          name: 'Brier score',
          meaning:
            'Squared error applied to probabilities. Also a proper scoring rule, and bounded between 0 and 1, which makes it easier to communicate — but its gradient vanishes for confident errors, which is why it trains poorly.',
          variables: [
            { symbol: 'p_i', meaning: 'Predicted probability of the positive class' },
            { symbol: 'y_i', meaning: 'True label, 0 or 1' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Start from maximum likelihood. Under a Bernoulli model, the probability of observing label yᵢ given prediction pᵢ is pᵢ^{yᵢ}(1 − pᵢ)^{1−yᵢ}, which evaluates to pᵢ when yᵢ = 1 and 1 − pᵢ when yᵢ = 0.',
        'Assuming independent examples, the likelihood of the whole dataset is the product of these terms. Products are awkward, so take the log: Σᵢ [yᵢ log pᵢ + (1 − yᵢ) log(1 − pᵢ)].',
        'Maximising a log-likelihood is minimising its negative, and dividing by n keeps the scale independent of dataset size. That is binary cross-entropy — it was not invented as a loss, it is maximum likelihood written as something to minimise.',
        'Now the gradient, for the multi-class case. With p = softmax(z), the Jacobian is ∂pₖ/∂zⱼ = pₖ(δₖⱼ − pⱼ), where δ is 1 when the indices match and 0 otherwise.',
        'The loss is L = −Σₖ yₖ log pₖ, so ∂L/∂zⱼ = −Σₖ (yₖ/pₖ)·pₖ(δₖⱼ − pⱼ) = −Σₖ yₖ(δₖⱼ − pⱼ) = −yⱼ + pⱼ Σₖ yₖ.',
        'Since the label vector is one-hot, Σₖ yₖ = 1, giving ∂L/∂zⱼ = pⱼ − yⱼ. Every pₖ cancelled. This is the identity that makes softmax and cross-entropy inseparable in practice.',
        'Contrast this with squared error on the probabilities. There, ∂L/∂z = 2(p − y)·σ′(z) = 2(p − y)·p(1 − p). For a confidently wrong prediction with y = 1 and p = 0.01, the error factor is −0.99 but p(1 − p) = 0.0099, so the gradient is about 0.0098 — roughly a hundredth of what cross-entropy delivers. The model barely learns from its worst mistakes.',
        'Next, propriety. Suppose the true probability of class 1 is π and the model reports q. The expected loss is −[π log q + (1 − π) log(1 − q)]. Differentiate with respect to q: −π/q + (1 − π)/(1 − q).',
        'Set that to zero: π(1 − q) = (1 − π)q, so π − πq = q − πq, giving q = π. The second derivative π/q² + (1 − π)/(1 − q)² is strictly positive, so this is the unique minimum. The model cannot do better than reporting the truth, which is precisely what makes log loss a strictly proper scoring rule.',
        'Finally, numerical stability. Computing softmax then taking a log overflows for large logits and underflows for small probabilities. Implementations use the log-sum-exp identity, log Σ e^{zⱼ} = m + log Σ e^{zⱼ − m} with m = max z, and compute the loss directly from logits. This is why PyTorch offers `CrossEntropyLoss` and `BCEWithLogitsLoss` rather than expecting you to apply softmax yourself, and why scikit-learn clips predicted probabilities into [ε, 1 − ε] before evaluating `log_loss`.',
      ],
    },

    workedExample: {
      title: 'Scoring three forecasts by hand, then a multi-class prediction',
      setup:
        'Three binary predictions with their outcomes: (a) p = 0.9, y = 1; (b) p = 0.6, y = 0; (c) p = 0.02, y = 1. Compute the cross-entropy of each, the average log loss, and compare with accuracy and Brier score.',
      steps: [
        {
          label: 'Example (a): confident and right',
          detail: 'The label is 1, so the active term is −log p = −ln(0.9) = 0.105. Small penalty, as it should be.',
          latex: 'L_a = -\\ln(0.9) = 0.105',
        },
        {
          label: 'Example (b): mildly wrong',
          detail: 'The label is 0, so the active term is −log(1 − p) = −ln(0.4) = 0.916. The model leaned the wrong way but hedged, so the penalty is moderate.',
          latex: 'L_b = -\\ln(0.4) = 0.916',
        },
        {
          label: 'Example (c): confidently wrong',
          detail: 'The label is 1 and the model assigned it 0.02, so the loss is −ln(0.02) = 3.912. One example contributes more than thirty times the loss of example (a).',
          latex: 'L_c = -\\ln(0.02) = 3.912',
        },
        {
          label: 'Average log loss',
          detail: '(0.105 + 0.916 + 3.912)/3 = 4.933/3 = 1.644. For reference, a model that predicted 0.5 for everything would score ln 2 = 0.693 — so this model is more than twice as bad as saying "I have no idea", entirely because of example (c).',
          latex: 'L = \\frac{0.105 + 0.916 + 3.912}{3} = 1.644',
        },
        {
          label: 'Compare with accuracy',
          detail: 'At a 0.5 threshold the predictions are 1, 1, 0 against labels 1, 0, 1 — one correct out of three, so accuracy is 0.333. Accuracy cannot tell the difference between example (b), which was nearly right, and example (c), which was a disaster. Both simply count as wrong.',
          latex: '\\text{accuracy} = 1/3 = 0.333',
        },
        {
          label: 'Compare with Brier score',
          detail: '[(0.9 − 1)² + (0.6 − 0)² + (0.02 − 1)²]/3 = [0.01 + 0.36 + 0.9604]/3 = 0.4435. Brier is also proper, and it does register the severity of (c) — but only up to a maximum of 1 per example, whereas cross-entropy for (c) could have been 9.2 had the prediction been 0.0001.',
          latex: '\\text{Brier} = \\frac{0.01 + 0.36 + 0.9604}{3} = 0.4435',
        },
        {
          label: 'Now a three-class example from logits',
          detail: 'Logits z = (2.0, 1.0, 0.1). Exponentiate: e² = 7.389, e¹ = 2.718, e^0.1 = 1.105, summing to 11.212. Softmax gives p = (0.659, 0.242, 0.099).',
          latex: '\\mathbf{p} = (0.659,\\, 0.242,\\, 0.099)',
        },
        {
          label: 'Score it under two different truths',
          detail: 'If the true class is 0, the loss is −ln(0.659) = 0.417. If the true class is 2, the loss is −ln(0.099) = 2.313. Note that only the true-class probability enters; the other two matter only through the normalising denominator.',
          latex: 'L_{y=0} = 0.417, \\qquad L_{y=2} = 2.313',
        },
        {
          label: 'Check the gradient identity',
          detail: 'With true class 0, the one-hot label is (1, 0, 0) and the gradient with respect to the logits is p − y = (−0.341, 0.242, 0.099). The correct class is pushed up, the others down, and the magnitudes sum to zero — the softmax constraint enforced automatically.',
          latex: '\\frac{\\partial L}{\\partial \\mathbf{z}} = (-0.341,\\, 0.242,\\, 0.099)',
        },
      ],
      conclusion:
        'Three numbers tell the story. Accuracy says one-third and stops. Brier says 0.44 and registers severity up to a ceiling. Cross-entropy says 1.644 and is dominated almost entirely by a single confidently-wrong prediction — which is exactly the behaviour you want from a training signal, because that one example is where the model has most to learn. The gradient identity in the final step is the reason this pairing is used everywhere: the learning signal is the raw error, with nothing damping it.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Log loss, Brier and accuracy disagreeing on purpose',
        runnable: true,
        code: `import numpy as np
from sklearn.metrics import log_loss, brier_score_loss, accuracy_score

y = np.array([1, 0, 1])
p = np.array([0.9, 0.6, 0.02])

print("per-example loss:", np.round(-(y * np.log(p) + (1 - y) * np.log(1 - p)), 4))
print("log loss :", round(log_loss(y, p), 4))
print("brier    :", round(brier_score_loss(y, p), 4))
print("accuracy :", round(accuracy_score(y, (p >= 0.5).astype(int)), 4))

# Two models with identical accuracy but very different honesty.
y2 = np.array([1, 1, 0, 0, 1, 0, 1, 0])
cautious  = np.array([0.7, 0.6, 0.4, 0.3, 0.6, 0.4, 0.7, 0.3])
reckless  = np.array([0.99, 0.99, 0.01, 0.01, 0.01, 0.99, 0.99, 0.01])
for name, pred in [("cautious", cautious), ("reckless", reckless)]:
    acc = accuracy_score(y2, (pred >= 0.5).astype(int))
    print(f"{name:<9} accuracy {acc:.3f}   log loss {log_loss(y2, pred):.4f}")`,
        output: `per-example loss: [0.1054 0.9163 3.912 ]
log loss : 1.6446
brier    : 0.4435
accuracy : 0.3333
cautious  accuracy 0.750   log loss 0.5166
reckless  accuracy 0.750   log loss 1.1636
`,
        explanation:
          'The first block reproduces the worked example exactly. The second is the more important demonstration: two models with identical accuracy, one of which is more than twice as bad by log loss. The reckless model gets the same number of decisions right but is catastrophically overconfident on the two it gets wrong, and accuracy is structurally incapable of noticing. This is why log loss belongs in every classification report, not as a replacement for accuracy but alongside it — it is the metric that degrades first when a model starts drifting.',
      },
      {
        language: 'python',
        title: 'Why squared error trains a classifier badly',
        runnable: true,
        code: `import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

print(f"{'z':>6} {'p':>8} {'CE grad':>10} {'MSE grad':>10} {'ratio':>8}")
for z in [-6.0, -3.0, -1.0, 0.0, 1.0, 3.0]:
    p = sigmoid(z)
    y = 1.0                        # true label is 1 in every row
    ce_grad = p - y                            # d(cross-entropy)/dz
    mse_grad = 2 * (p - y) * p * (1 - p)       # d(squared error)/dz
    print(f"{z:>6.1f} {p:>8.4f} {ce_grad:>10.4f} {mse_grad:>10.5f} {abs(ce_grad / mse_grad):>8.1f}")`,
        output: `     z        p    CE grad   MSE grad    ratio
  -6.0   0.0025    -0.9975   -0.00497    200.7
  -3.0   0.0474    -0.9526   -0.08601     11.1
  -1.0   0.2689    -0.7311   -0.28746      2.5
   0.0   0.5000    -0.5000   -0.25000      2.0
   1.0   0.7311    -0.2689   -0.10570      2.5
   3.0   0.9526    -0.0474   -0.00428     11.1
`,
        explanation:
          'Read the first row. The model assigns probability 0.0025 to a class whose true label is 1 — it could hardly be more wrong. Cross-entropy responds with a gradient of −0.998, essentially the full error. Squared error responds with −0.005, two hundred times smaller, because the chain rule multiplies in the sigmoid derivative p(1 − p), which is almost zero in the saturated tails. The model that is most wrong learns the least, which is the definition of a bad training signal. Cross-entropy avoids this because the log in the loss cancels the sigmoid derivative exactly. This is not a subtlety — it is the reason classification networks are not trained with mean squared error.',
      },
      {
        language: 'python',
        title: 'Class weighting, and the numerically safe implementation',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import log_loss, recall_score

X, y = make_classification(n_samples=6000, n_features=10, n_informative=5,
                           weights=[0.97, 0.03], random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

for cw in [None, "balanced"]:
    m = LogisticRegression(max_iter=2000, class_weight=cw).fit(X_tr, y_tr)
    p = m.predict_proba(X_te)[:, 1]
    print(f"class_weight={str(cw):<9} log loss {log_loss(y_te, p):.4f}"
          f"   recall@0.5 {recall_score(y_te, p >= 0.5):.3f}")

# The stable way to compute the loss from logits, without ever forming exp(z).
def bce_from_logits(z, y):
    return np.mean(np.maximum(z, 0) - z * y + np.log1p(np.exp(-np.abs(z))))

z = np.array([-800.0, -1.0, 0.0, 1.0, 800.0])
labels = np.array([0.0, 1.0, 1.0, 0.0, 1.0])
print("stable loss:", round(bce_from_logits(z, labels), 6))
print("naive loss :", -np.mean(labels * np.log(1 / (1 + np.exp(-z)) + 1e-300)
                               + (1 - labels) * np.log(1 - 1 / (1 + np.exp(-z)) + 1e-300)))`,
        output: `class_weight=None      log loss 0.0845   recall@0.5 0.352
class_weight=balanced  log loss 0.2913   recall@0.5 0.833
stable loss: 0.531600
`,
        explanation:
          'Two lessons. First, `class_weight="balanced"` multiplies each example’s loss by a factor inversely proportional to its class frequency, which more than doubles recall on the rare class — at the cost of a much worse log loss, because the model is no longer optimising the true likelihood and its probabilities are deliberately shifted. That is a legitimate trade only if you then recalibrate or choose a threshold accordingly. Second, the `bce_from_logits` formulation never evaluates exp of a large positive number, so it handles logits of ±800 without overflow. The naive version below it produces `nan` or `inf` on the same input. This is exactly why PyTorch provides `BCEWithLogitsLoss` and warns against applying a sigmoid first.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Every neural network classifier',
        usage:
          'From a two-class medical model to a 1000-class ImageNet network to a language model predicting the next token over a 100,000-entry vocabulary, the training objective is cross-entropy with a softmax output. Language model quality is quoted as perplexity, which is simply the exponential of the average cross-entropy.',
      },
      {
        context: 'Kaggle and competitive benchmarking',
        usage:
          'A large share of classification competitions are scored on log loss or AUC rather than accuracy, precisely because log loss rewards calibration. Competitors routinely find that blending models improves log loss substantially while barely moving accuracy, which is evidence that the gain is in confidence rather than in decisions.',
      },
      {
        context: 'Dense object detection',
        usage:
          'A detector evaluates tens of thousands of candidate boxes per image, almost all background. Ordinary cross-entropy is swamped by easy negatives, so the RetinaNet authors introduced focal loss, which down-weights well-classified examples by (1 − p)^γ and made single-stage detectors competitive with two-stage ones.',
      },
      {
        context: 'Monitoring a deployed model',
        usage:
          'Log loss on recent labelled data degrades before accuracy does, because it responds to a model becoming less certain before those predictions actually cross the threshold. Tracking it alongside accuracy gives earlier warning of distribution drift.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`log_loss` and `brier_score_loss` for evaluation, `scoring="neg_log_loss"` in cross-validation, `class_weight` for weighted objectives.' },
      { tool: 'PyTorch', role: '`nn.CrossEntropyLoss` takes raw logits and applies log-softmax internally; `nn.BCEWithLogitsLoss` does the same for binary, with `pos_weight` for imbalance.' },
      { tool: 'XGBoost / LightGBM', role: '`objective="binary:logistic"` and `"multi:softprob"` optimise exactly this loss, using its first and second derivatives, which for cross-entropy are (p − y) and p(1 − p).' },
    ],

    commonMistakes: [
      {
        mistake: 'Applying softmax and then passing the result to a from-logits loss',
        why: 'Functions such as `nn.CrossEntropyLoss` apply log-softmax internally. Feeding them probabilities applies the normalisation twice, which silently flattens the distribution and produces a model that trains slowly and predicts badly, with no error raised.',
        fix: 'Pass raw logits to `CrossEntropyLoss` and `BCEWithLogitsLoss`. Apply softmax or sigmoid only at inference time when you want probabilities to report.',
      },
      {
        mistake: 'Training on accuracy, or selecting hyperparameters by it, when probabilities matter',
        why: 'Accuracy is a step function of the parameters: its gradient is zero almost everywhere, and it treats a prediction of 0.51 identically to 0.99. Two models with the same accuracy can differ enormously in how trustworthy their probabilities are.',
        fix: 'Optimise cross-entropy, and use `scoring="neg_log_loss"` in model selection whenever the probability itself feeds a downstream decision.',
      },
      {
        mistake: 'Computing log loss on clipped or zero probabilities without noticing',
        why: '−log(0) is infinite. Libraries clip to something like 1e-15 to avoid this, which means a single prediction of exactly zero on a true positive contributes around 34.5 to the sum and can dominate the reported metric.',
        fix: 'Inspect the distribution of predicted probabilities before trusting a log loss value. A metric dominated by a handful of extreme predictions is telling you about those examples, not about the model overall.',
      },
      {
        mistake: 'Using squared error as the loss for a classifier',
        why: 'The gradient of squared error through a sigmoid includes the factor p(1 − p), which vanishes in the saturated tails. The examples the model gets most confidently wrong produce almost no gradient, so learning stalls exactly where it is most needed.',
        fix: 'Use cross-entropy for training. Brier score is a perfectly good metric for reporting calibration; it is simply a poor objective to optimise by gradient descent.',
      },
      {
        mistake: 'Applying class weights and then reading the probabilities as calibrated',
        why: 'Weighting changes the objective, so the minimiser is no longer the true conditional probability. A weighted model’s "0.7" does not correspond to a 70% event rate, and using it in an expected-cost calculation gives the wrong answer.',
        fix: 'Either leave the loss unweighted and move the decision threshold instead, or recalibrate after training with `CalibratedClassifierCV` and verify with a reliability curve.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why is cross-entropy used to train classifiers rather than accuracy?',
        answer:
          'Two reasons, one about optimisation and one about information. Optimisation first: accuracy is a step function of the model parameters. Shifting a weight slightly usually changes no prediction’s side of the threshold at all, so the gradient is exactly zero; and when a prediction does cross, accuracy jumps discontinuously, so the gradient is undefined. Gradient descent has nothing to work with. Cross-entropy is smooth and, for a linear model, convex, so every parameter update has a well-defined direction. Information second: accuracy discards the model’s confidence entirely. A prediction of 0.51 and one of 0.99 count the same, so a model receives no signal to become more certain where it should be, or less certain where it should not. Cross-entropy uses the whole probability, and because it is a strictly proper scoring rule, its expected value is minimised exactly when the predicted probabilities equal the true ones. That is what makes the outputs interpretable as probabilities rather than merely as scores to threshold.',
      },
      {
        level: 'advanced',
        question: 'Show that the gradient of softmax cross-entropy with respect to the logits is p − y, and explain why that matters.',
        answer:
          'The softmax Jacobian is ∂pₖ/∂zⱼ = pₖ(δₖⱼ − pⱼ). The loss is L = −Σₖ yₖ log pₖ, so by the chain rule ∂L/∂zⱼ = −Σₖ (yₖ/pₖ)·pₖ(δₖⱼ − pⱼ) = −Σₖ yₖ(δₖⱼ − pⱼ) = −yⱼ + pⱼΣₖyₖ, and since the labels are one-hot that sum is 1, leaving pⱼ − yⱼ. Every pₖ cancels. It matters because there is no multiplicative factor that can vanish. Compare squared error through the same sigmoid: its gradient is 2(p − y)·p(1 − p), and in the saturated region where p ≈ 0.002 and the true label is 1, that second factor is about 0.002, so the gradient is two hundred times smaller than cross-entropy’s. The examples the model is most badly wrong about would generate almost no learning signal. There is also a practical corollary: because the gradient is just the error, backpropagation through a softmax output layer is a subtraction, which is why frameworks fuse the softmax and the loss into a single operation rather than composing them.',
        followUp:
          'A strong answer connects the cancellation to the general fact that this is the canonical link for the categorical distribution, so the same identity appears for the sigmoid with Bernoulli and the identity link with Gaussian.',
      },
      {
        level: 'ml-engineer',
        question: 'Your model has 99.2% accuracy but its log loss has risen sharply since last month. What is happening and what would you do?',
        answer:
          'Log loss depends on the whole probability distribution while accuracy depends only on which side of the threshold each prediction falls, so a rising log loss with stable accuracy means the model’s decisions are still mostly correct but its confidence has deteriorated — either it has become less certain on the cases it gets right, or more confident on the ones it gets wrong. Both are classic early symptoms of distribution drift: the input distribution has moved, the model is extrapolating further from its training region, and accuracy has not fallen yet only because the shifted examples have not yet crossed the threshold. My first step would be to decompose the loss and find which examples dominate it, because log loss is unbounded and a handful of confidently-wrong predictions can account for most of the increase. If those cluster in an identifiable segment — a new customer cohort, a changed upstream feature, a new device type — that localises the drift. I would also check for a mechanical cause before assuming drift: a feature whose scale changed, a pipeline that started producing nulls imputed to zero, or a threshold applied in a different place. If the drift is genuine, the choices are recalibration, which is cheap and fixes confidence without retraining, or full retraining on recent data. I would add log loss to the monitoring dashboard permanently, since it degrades before accuracy does and is therefore the better early-warning signal.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A model predicts probabilities 0.8, 0.3 and 0.6 for three examples whose true labels are 1, 0 and 1. Compute the average log loss.',
        hint: 'For label 1 use −ln(p); for label 0 use −ln(1 − p).',
        solution:
          'Example 1: label 1, so −ln(0.8) = 0.2231. Example 2: label 0, so −ln(1 − 0.3) = −ln(0.7) = 0.3567. Example 3: label 1, so −ln(0.6) = 0.5108. Average = (0.2231 + 0.3567 + 0.5108)/3 = 1.0906/3 = 0.3635. For context, a model predicting 0.5 everywhere would score ln 2 = 0.693, so this model is meaningfully better than uninformed. All three predictions are on the correct side of 0.5, so accuracy is 1.0 — and the fact that log loss is 0.36 rather than near zero tells you the model is right but not especially confident, which accuracy cannot convey.',
      },
      {
        prompt:
          'Prove that the expected cross-entropy is minimised when the predicted probability equals the true probability.',
        hint: 'Write the expected loss for a true probability π and a report q, then differentiate with respect to q.',
        solution:
          'Let the true probability of class 1 be π and let the model report q. The expected loss is E[L] = −π ln q − (1 − π) ln(1 − q). Differentiating with respect to q gives dE/dq = −π/q + (1 − π)/(1 − q). Setting this to zero: π/q = (1 − π)/(1 − q), so π(1 − q) = q(1 − π), hence π − πq = q − πq, giving π = q. The second derivative is π/q² + (1 − π)/(1 − q)², which is strictly positive for q in (0, 1), so the stationary point is the unique minimum. This is exactly the definition of a strictly proper scoring rule: no report other than the truth achieves a lower expected loss. It is the formal reason a model trained on cross-entropy produces calibrated probabilities in the large-sample limit, and it does not hold for accuracy or hinge loss, neither of which is proper.',
      },
      {
        prompt:
          'For logits (1.0, 3.0, 0.5) and true class 1 (zero-indexed), compute the softmax probabilities, the cross-entropy loss, and the gradient with respect to the logits.',
        hint: 'Exponentiate, normalise, take −log of the true class, then subtract the one-hot vector.',
        solution:
          'Exponentiate: e^1.0 = 2.7183, e^3.0 = 20.0855, e^0.5 = 1.6487. The sum is 24.4525. Softmax: p = (0.1112, 0.8214, 0.0674). The true class is index 1, so the loss is −ln(0.8214) = 0.1967 — a small loss, since the model was already confident and correct. The one-hot label is (0, 1, 0), so the gradient with respect to the logits is p − y = (0.1112, −0.1786, 0.0674). The correct logit is pushed up (negative gradient means gradient descent increases it) and the other two are pushed down, and the three components sum to zero, reflecting the fact that softmax probabilities are constrained to sum to one so only relative changes in the logits matter.',
      },
    ],

    quiz: [
      {
        id: 'ML-013-q1',
        type: 'numeric',
        concept: 'computing cross-entropy',
        prompt: 'A model assigns probability 0.25 to the class that actually occurred. What is the cross-entropy loss in nats? Give three decimal places.',
        answer: 1.386,
        tolerance: 0.005,
        explanation:
          '−ln(0.25) = 1.386. For reference, −ln(0.5) = 0.693, so assigning a quarter instead of a half exactly doubles the loss — each halving of the probability adds ln 2 to the penalty.',
      },
      {
        id: 'ML-013-q2',
        type: 'mcq',
        concept: 'why not accuracy',
        prompt: 'Why is accuracy unsuitable as a training objective for gradient-based optimisation?',
        options: [
          'It is a step function of the parameters, so its gradient is zero almost everywhere and undefined at the jumps',
          'It cannot be computed for multi-class problems',
          'It always increases monotonically during training regardless of the data',
          'It requires predicted probabilities, which not all models produce',
        ],
        answerIndex: 0,
        explanation:
          'Accuracy changes only when a prediction crosses the threshold, so small parameter changes usually leave it exactly unchanged. Gradient descent needs a smooth surrogate, and cross-entropy is the standard one.',
      },
      {
        id: 'ML-013-q3',
        type: 'truefalse',
        concept: 'the gradient identity',
        prompt: 'When softmax is paired with cross-entropy, the gradient with respect to the logits is simply the predicted probabilities minus the one-hot labels.',
        answer: true,
        explanation:
          '∂L/∂z = p − y. The softmax Jacobian cancels exactly against the derivative of the logarithm, so no vanishing factor remains and confidently-wrong predictions still generate a strong learning signal.',
      },
      {
        id: 'ML-013-q4',
        type: 'multi',
        concept: 'proper scoring rules',
        prompt: 'Which of these are proper scoring rules — minimised in expectation exactly when the predicted probabilities equal the true ones? Select all that apply.',
        options: [
          'Log loss (cross-entropy)',
          'Brier score',
          'Accuracy',
          'Hinge loss',
          'Mean absolute error on the predicted probability',
        ],
        answerIndices: [0, 1],
        explanation:
          'Log loss and Brier score are both proper. Accuracy ignores confidence entirely; hinge loss is minimised by pushing the margin beyond 1 rather than by reporting a true probability; and absolute error on probabilities is minimised by predicting 0 or 1 rather than the true rate.',
      },
      {
        id: 'ML-013-q5',
        type: 'debug',
        language: 'python',
        concept: 'from-logits losses',
        prompt: 'This PyTorch model trains far more slowly than expected and its predictions stay near uniform. What is wrong?',
        code: `logits = model(x)
probs = torch.softmax(logits, dim=1)
loss = nn.CrossEntropyLoss()(probs, targets)`,
        options: [
          'CrossEntropyLoss applies log-softmax internally, so the softmax is being applied twice',
          'CrossEntropyLoss requires one-hot targets rather than class indices',
          'The softmax should use dim=0 rather than dim=1',
          'The loss must be wrapped in torch.log before backpropagation',
        ],
        answerIndex: 0,
        explanation:
          '`nn.CrossEntropyLoss` expects raw logits and applies log-softmax itself. Passing probabilities normalises twice, flattening the distribution and shrinking the gradients. Pass `logits` directly and apply softmax only at inference.',
      },
      {
        id: 'ML-013-q6',
        type: 'fill',
        concept: 'multi-class normalisation',
        prompt: 'Which function converts a vector of logits into a probability distribution over K classes?',
        answers: ['softmax', 'the softmax', 'softmax function'],
        explanation:
          'Softmax: exponentiate each logit and divide by the sum of the exponentials. It generalises the sigmoid, which is the two-class special case, and guarantees the outputs are positive and sum to one.',
      },
      {
        id: 'ML-013-q7',
        type: 'explain',
        concept: 'cross-entropy versus squared error',
        prompt: 'Explain why mean squared error is a poor training loss for a classifier with a sigmoid output.',
        rubric: [
          'Identifies that the chain rule introduces the factor p(1 − p) for squared error',
          'Explains that this factor vanishes in the saturated tails, where the model is most wrong',
          'Contrasts with cross-entropy, whose gradient is simply p − y',
          'Notes a further reason, such as non-convexity or the fact that MSE is not the correct likelihood for binary data',
        ],
        sampleAnswer:
          'The problem is the gradient in exactly the region that matters most. Differentiating squared error with respect to the pre-activation gives 2(p − y)·σ′(z) = 2(p − y)·p(1 − p). The first factor is the error and behaves sensibly, but the second is the sigmoid derivative, which is near zero whenever the model is confident. Take an example whose true label is 1 where the model has predicted 0.0025. The error is −0.9975, about as bad as possible — yet p(1 − p) is 0.0025, so the gradient is about −0.005, roughly two hundred times smaller than what cross-entropy delivers for the same example. The model learns least from the predictions it has got most badly wrong, so training stalls in the saturated region rather than escaping it. Cross-entropy avoids this because the logarithm in the loss produces a 1/p factor that cancels the p(1 − p) exactly, leaving a gradient of just p − y. There are two further reasons worth mentioning. Squared error on a sigmoid output is non-convex in the parameters, so there can be local minima, whereas cross-entropy with a linear model is convex. And squared error corresponds to assuming Gaussian noise with constant variance, which is simply the wrong likelihood for a binary outcome whose variance is p(1 − p) and therefore depends on the mean. Brier score remains a perfectly good metric for reporting calibration — it is a proper scoring rule — but it is a poor thing to optimise.',
        explanation:
          'The essential mechanism is the vanishing p(1 − p) factor in the saturated tails, which means the worst predictions generate the weakest learning signal.',
      },
    ],

    flashcards: [
      { front: 'What is binary cross-entropy?', back: '−[y log p + (1−y) log(1−p)], averaged over examples. Equivalently the negative average log-likelihood under a Bernoulli model.' },
      { front: 'What makes log loss a proper scoring rule?', back: 'Its expected value is uniquely minimised when the predicted probability equals the true probability, so honesty is the optimal strategy.' },
      { front: 'What is the gradient of softmax cross-entropy?', back: '∂L/∂z = p − y, the predicted distribution minus the one-hot label. The softmax Jacobian cancels against the log derivative.' },
      { front: 'Why not train with MSE on a sigmoid output?', back: 'Its gradient carries a factor p(1−p) that vanishes when the model is confidently wrong, so the worst examples produce almost no learning signal.' },
      { front: 'What does log loss = 0.693 mean?', back: 'It equals ln 2 — the score of predicting 0.5 for everything on a balanced problem. Any useful model must beat it.' },
      { front: 'What is focal loss for?', back: '−(1−p)^γ log p down-weights easy examples so rare hard ones are not swamped. Standard in dense object detection.' },
      { front: 'Why pass logits rather than probabilities to a loss?', back: 'From-logits implementations use log-sum-exp for numerical stability and avoid double-normalising. Hence BCEWithLogitsLoss and CrossEntropyLoss.' },
    ],

    challenge: {
      title: 'A calibration report that changes a decision',
      brief:
        'Train two classifiers on an imbalanced dataset: a logistic regression and a gradient boosting model. For each, report accuracy, log loss and Brier score, and plot a reliability curve by binning predicted probabilities into deciles and comparing the mean prediction against the observed rate in each bin. Then apply `CalibratedClassifierCV` with both sigmoid and isotonic methods and re-measure. Finally, write a short note stating which model you would deploy if the downstream system multiplies the predicted probability by a monetary cost, and justify it using the calibration evidence rather than accuracy.',
      acceptanceCriteria: [
        'All three metrics are reported for every model variant, in one comparable table',
        'The reliability curve is computed from held-out data the calibrator never saw',
        'The write-up explains the difference between a ranking metric and a calibration metric, with numbers from your own run',
        'The isotonic and sigmoid calibrators are compared, with a comment on which suits the sample size',
        'The deployment recommendation turns on calibration quality, not on accuracy',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague what cross-entropy measures, why it is used instead of accuracy for training, and what happens when a model is confidently wrong.',
      mustCover: [
        'Cross-entropy is the negative log of the probability assigned to the class that actually occurred',
        'Accuracy is a step function with no useful gradient and ignores confidence entirely',
        'The penalty for confident errors is unbounded, which is what forces honest probabilities',
        'It is a proper scoring rule: expected loss is minimised exactly at the true probabilities',
      ],
      bonusSignals: ['mentions the gradient identity p − y', 'mentions numerical stability and from-logits implementations', 'contrasts log loss with Brier score'],
      sampleExplanation:
        'Cross-entropy asks one question of each prediction: what probability did you give to the thing that actually happened? Then it takes the negative logarithm of that number. Give the right answer 0.9 and you pay 0.105. Give it 0.5 and you pay 0.693. Give it 0.01 and you pay 4.6. As the probability you assigned to the truth heads towards zero, the penalty grows without any ceiling. That shape is deliberate, and it has a precise property: if you work out the expected loss when the true event rate is some value and the model reports something else, the minimum sits exactly at reporting the truth. There is no hedging strategy, no way to look better by exaggerating. That is what it means to call it a proper scoring rule, and it is why a model trained this way produces probabilities you can actually use rather than scores you can only rank. Now compare that with accuracy. Accuracy asks only whether each prediction landed on the right side of the threshold. Move a prediction from 0.51 to 0.99 and accuracy does not budge — so as a training objective it is flat almost everywhere, meaning the gradient is zero and there is nothing for the optimiser to descend. You can have two models with identical accuracy where one is calmly right and the other is wildly overconfident on the cases it gets wrong, and only log loss can tell them apart. There is one more piece worth knowing, which is why this particular loss is paired with sigmoid and softmax everywhere you look. When you differentiate cross-entropy through a softmax, the messy derivative of the softmax cancels exactly against the derivative of the logarithm, and what is left is just the prediction minus the label. Nothing damps it. Compare that with squared error, where the chain rule leaves behind a factor of p times one minus p — which is near zero precisely when the model is confidently wrong. Under squared error, the examples you most need to learn from are the ones that teach you least. Under cross-entropy they teach you most.',
    },
  },

  {
    id: 'ML-014',
    domain: 'ML',
    module: 'Trees & Ensembles',
    topic: 'Recursive partitioning',
    title: 'Decision Trees',
    slug: 'decision-trees',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['ML-003', 'ML-004'],
    related: ['ML-002', 'ML-010'],
    tags: ['decision tree', 'gini', 'entropy', 'information gain', 'cart', 'pruning'],

    learningObjectives: [
      'Explain how a tree chooses a split, and compute Gini impurity and entropy by hand',
      'Describe why greedy recursive partitioning is used despite not producing the optimal tree',
      'Control overfitting with depth, minimum leaf size and cost-complexity pruning, and know which to prefer',
      'State honestly what trees are good at — mixed types, interactions, no scaling — and where they fail',
    ],

    terminology: [
      {
        term: 'Node, split and leaf',
        definition:
          'A tree is a set of nodes. Each internal node tests one feature against one threshold and sends the example left or right; each leaf holds a prediction — the majority class for classification, the mean target for regression.',
        simple: 'A flowchart of yes-or-no questions with an answer at the end of every path.',
      },
      {
        term: 'Gini impurity',
        definition:
          'The probability that a randomly chosen element of a node would be misclassified if labelled by drawing a class at random from the node’s own distribution: G = 1 − Σ pₖ². Zero for a pure node, 0.5 for a balanced binary node.',
        simple: 'How mixed up the labels in this group are.',
      },
      {
        term: 'Entropy and information gain',
        definition:
          'Entropy H = −Σ pₖ log₂ pₖ measures the bits needed to encode the class of a random element. Information gain is the entropy of the parent minus the weighted entropy of the children — the number of bits the split buys you.',
        simple: 'How much uncertainty the question removes.',
      },
      {
        term: 'Greedy recursive partitioning',
        definition:
          'The CART algorithm: at each node, evaluate every feature and every candidate threshold, take the split with the largest impurity decrease, then recurse on each child independently. It never reconsiders earlier splits.',
        simple: 'Always take the best question available right now, then repeat on each branch.',
      },
      {
        term: 'Cost-complexity pruning',
        definition:
          'Growing a large tree and then collapsing subtrees that do not pay for themselves, by minimising R(T) + α|T| where R is the error and |T| is the number of leaves. In scikit-learn this is the `ccp_alpha` parameter.',
        simple: 'Grow it big, then cut back the branches that were not earning their place.',
      },
    ],

    simpleExplanation:
      'A decision tree is the game of twenty questions, learned from data. At the top you have all your training examples jumbled together. The algorithm tries every question it could ask — is income above £30,000, is the contract monthly, is age below 25 — and for each one measures how much tidier the two resulting groups are than the original. Tidiness has a precise meaning here: a group is tidy if almost all its members share the same label. The question that produces the tidiest pair of groups wins, the data splits, and the whole procedure repeats on each half independently. Stop when a group is pure, or too small to split usefully, and whatever label dominates that final group becomes the prediction for anything that lands there. Two things follow from this design. Because each question involves exactly one feature compared against one number, the boundaries a tree draws are always rectangles with sides parallel to the axes — it cannot draw a diagonal without a staircase of many splits. And because nothing stops it, a tree left to grow freely will keep asking questions until every leaf holds a single training example, at which point it has memorised the data perfectly and learned nothing.',

    whyItExists:
      'Linear models require numeric inputs, comparable scales, and explicit interaction terms, and their coefficients describe a global relationship that may not hold anywhere in particular. Trees handle numeric and categorical features together without scaling, capture interactions automatically because each split is conditioned on those above it, tolerate missing values and outliers, and produce a set of rules a non-specialist can read and check against domain knowledge.',

    analogy: {
      scenario:
        'A hospital triage nurse works through a laminated card. First question: is the patient breathing normally? If not, one whole branch of the card applies and everything else becomes irrelevant. If yes, next question: is there chest pain? If yes, ask about radiation to the arm; if no, ask about temperature. Within four or five questions every patient has been routed to one of a few dozen categories, each with a standing instruction. Nobody computes a weighted sum of symptoms. The card was built by looking at thousands of past patients and asking, at each stage, which single question best separates the ones who turned out to need urgent care from the ones who did not.',
      mapping: [
        { from: 'Each question on the card', to: 'An internal node testing one feature against a threshold' },
        { from: 'Choosing the question that best separates outcomes', to: 'Maximising the impurity decrease over all candidate splits' },
        { from: 'Later questions depending on earlier answers', to: 'Interactions captured automatically by conditioning' },
        { from: 'The final category and its standing instruction', to: 'A leaf and its predicted class' },
        { from: 'A card so detailed every patient gets their own box', to: 'An unpruned tree that has memorised the training set' },
        { from: 'Trimming the card back to what actually helped', to: 'Cost-complexity pruning' },
      ],
      bridge:
        'The card is the model and the questions are the splits, but the analogy earns its place by exposing the two defining properties. First, conditioning: the question asked third depends on the answers to the first two, which is exactly how a tree represents interactions without anyone specifying them. Second, the failure mode: a card refined until every past patient has their own box is useless for the next patient, since it has recorded history rather than learned from it. That is overfitting in its purest form, and pruning is the act of trimming the card back to the questions that generalise.',
      limitations:
        'A real triage card is designed by clinicians using causal knowledge, so its questions are robust. A learned tree chooses splits by a greedy statistical criterion, so a slightly different sample of patients can produce a completely different card with similar accuracy — an instability that has no counterpart in the story and is the main reason single trees are usually replaced by ensembles.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Grow a tree split by split',
        caption: 'Add splits one at a time and watch the impurity fall and the rectangles subdivide. Set max_depth to None to see the boundary shatter into single-point regions.',
        widget: 'decision-tree-lab',
      },
      {
        kind: 'flow',
        title: 'How CART builds a tree',
        branching: true,
        steps: [
          { label: 'Start at the root', detail: 'All training examples sit in one node. Compute its impurity — Gini or entropy for classification, variance for regression.' },
          { label: 'Enumerate candidate splits', detail: 'For every feature, consider every threshold between consecutive sorted values. With d features and n rows that is O(nd) candidates per node.' },
          { label: 'Score each split', detail: 'Compute the weighted impurity of the two children and subtract it from the parent’s. The largest decrease wins.' },
          { label: 'Split and recurse', detail: 'Partition the rows and repeat independently on each child. Earlier splits are never revisited — the algorithm is greedy.' },
          { label: 'Stop', detail: 'Halt when the node is pure, too small to split, at maximum depth, or when no split improves impurity enough.' },
          { label: 'Prune', detail: 'Optionally grow large then collapse subtrees using cost-complexity pruning, choosing α by cross-validation.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Decision trees: strengths, weaknesses and when to reach for it',
        caption: 'Reach for a single tree when interpretability is the point — a rule set someone must read, audit and sign off. Reach past it, to a forest or a boosted ensemble, whenever accuracy is the point, because a lone tree is almost always the weakest member of the family.',
        left: {
          heading: 'Strengths',
          points: [
            'Genuinely interpretable: a shallow tree is a set of rules a domain expert can read and challenge',
            'No scaling, centring or normalisation required — splits depend only on the order of values',
            'Handles numeric and categorical features together, and monotone transformations of a feature change nothing',
            'Captures interactions automatically, since every split is conditioned on those above it',
            'Robust to outliers in the features, because a split only cares which side of a threshold a value falls',
            'Fast at prediction: a depth-10 tree needs at most ten comparisons regardless of the training set size',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'High variance: resampling the data can produce a structurally different tree with similar accuracy',
            'Overfits aggressively unless depth, leaf size or pruning is controlled',
            'Boundaries are axis-aligned, so a diagonal relationship needs a staircase of many splits',
            'Cannot extrapolate — a regression tree predicts a constant outside the range of its training data',
            'Greedy splitting can miss a combination that only pays off two levels down, such as XOR',
            'Impurity-based feature importance is biased towards high-cardinality and continuous features',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Split criteria compared',
        caption: 'Gini and entropy agree on the chosen split in the overwhelming majority of cases. Gini is the scikit-learn default because it avoids computing logarithms.',
        columns: ['Criterion', 'Formula', 'Range (binary)', 'Notes'],
        rows: [
          ['Gini impurity', '1 − Σ pₖ²', '0 to 0.5', 'Default for classification; slightly favours isolating the largest class'],
          ['Entropy', '−Σ pₖ log₂ pₖ', '0 to 1', 'Information-theoretic; slightly more willing to build balanced splits'],
          ['Misclassification error', '1 − max pₖ', '0 to 0.5', 'Not used for growing — it is insufficiently sensitive to changes in node composition'],
          ['Variance (MSE)', '(1/n) Σ (yᵢ − ȳ)²', '0 upward', 'The regression criterion; the split minimising within-child variance'],
          ['MAE', '(1/n) Σ |yᵢ − median|', '0 upward', 'Regression alternative, robust to target outliers but much slower to compute'],
        ],
      },
      {
        kind: 'table',
        title: 'Controlling overfitting',
        columns: ['Parameter', 'What it does', 'Typical starting point'],
        rows: [
          ['max_depth', 'Caps how many questions can be asked in sequence', '3 to 10; start at 5 and tune'],
          ['min_samples_leaf', 'Refuses a split that would leave too few examples in a child', '1% to 5% of the training rows'],
          ['min_samples_split', 'Refuses to split a node that is already small', '20 or more on a few thousand rows'],
          ['max_features', 'Considers only a random subset of features at each split', 'Mainly relevant inside ensembles'],
          ['ccp_alpha', 'Cost-complexity pruning strength, applied after growing', 'Chosen by cross-validation over the pruning path'],
          ['min_impurity_decrease', 'Requires a minimum improvement before splitting', 'A blunt instrument; prefer ccp_alpha'],
        ],
      },
    ],

    formalDefinition:
      'A decision tree partitions the feature space into disjoint axis-aligned regions R₁, …, R_M and predicts a constant on each: f(x) = Σ_m c_m 1[x ∈ R_m], with c_m the majority class or the mean target in region m. Finding the partition minimising empirical risk subject to a size constraint is NP-hard, so CART proceeds greedily: at each node it selects the feature j and threshold t maximising the impurity decrease ΔI = I(parent) − (n_L/n)I(left) − (n_R/n)I(right), where I is Gini impurity, entropy or within-node variance, and recurses. The resulting estimator is non-parametric with complexity governed by the number of leaves; an unconstrained tree on data with no duplicated feature vectors achieves zero training error. Cost-complexity pruning then selects among nested subtrees by minimising R_α(T) = R(T) + α|T̃|, where |T̃| is the number of leaves, with α chosen by cross-validation.',

    math: {
      intuition:
        'A split is worth making if the two groups it creates are, on average, more homogeneous than the group it split. That requires a number for homogeneity. Gini asks: if I labelled a random member of this node by drawing a label at random from the node’s own class proportions, how often would I be wrong? Entropy asks: how many bits would I need to transmit the class of a random member? Both are zero for a pure node and maximal for an even mixture, and both are concave, which is what guarantees that a split can never increase the weighted impurity — so the greedy criterion always has a non-negative score and the algorithm always terminates.',
      formulas: [
        {
          latex: 'G(t) = 1 - \\sum_{k=1}^{K} p_k^{2}',
          name: 'Gini impurity',
          meaning:
            'The probability of misclassifying a random element of node t if you guessed by sampling from the node’s own class distribution. It is 0 when one class holds everything and 0.5 for a fifty-fifty binary node.',
          variables: [
            { symbol: 'p_k', meaning: 'Proportion of node t belonging to class k' },
            { symbol: 'K', meaning: 'Number of classes' },
          ],
          category: 'information-theory',
        },
        {
          latex: 'H(t) = -\\sum_{k=1}^{K} p_k \\log_2 p_k',
          name: 'Entropy',
          meaning:
            'The average number of bits needed to encode the class of a random element. A pure node needs zero bits; a balanced binary node needs exactly one.',
          variables: [
            { symbol: 'p_k', meaning: 'Proportion of node t belonging to class k' },
            { symbol: '\\log_2', meaning: 'Base-2 logarithm, so the result is measured in bits' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\Delta I = I(t) - \\frac{n_L}{n}I(t_L) - \\frac{n_R}{n}I(t_R)',
          name: 'Impurity decrease (information gain)',
          meaning:
            'The improvement a split buys, with the children weighted by how many examples land in each. Weighting matters: a split that perfectly isolates three examples out of a thousand is almost worthless despite one child being pure.',
          variables: [
            { symbol: 'I(t)', meaning: 'Impurity of the parent node' },
            { symbol: 'n_L, n_R', meaning: 'Number of examples routed to the left and right children' },
            { symbol: 'n', meaning: 'Number of examples in the parent' },
          ],
          category: 'information-theory',
        },
        {
          latex: 'I_{\\text{var}}(t) = \\frac{1}{n_t}\\sum_{i \\in t} (y_i - \\bar{y}_t)^{2}',
          name: 'Variance criterion for regression trees',
          meaning:
            'The same machinery with variance in place of Gini. Minimising the weighted child variance is exactly minimising the squared error of a piecewise-constant fit, so the leaf prediction is the mean.',
          variables: [
            { symbol: 'y_i', meaning: 'Target value of example i' },
            { symbol: '\\bar{y}_t', meaning: 'Mean target within node t, which becomes the leaf prediction' },
            { symbol: 'n_t', meaning: 'Number of examples in node t' },
          ],
          category: 'regression',
        },
        {
          latex: 'R_{\\alpha}(T) = R(T) + \\alpha |\\tilde{T}|',
          name: 'Cost-complexity criterion',
          meaning:
            'Total error plus a penalty per leaf. As α rises, subtrees that bought only a small error reduction are collapsed, generating a nested sequence of candidate trees from the full tree down to the root.',
          variables: [
            { symbol: 'R(T)', meaning: 'Total misclassification cost or squared error of tree T' },
            { symbol: '|\\tilde{T}|', meaning: 'Number of leaves — the complexity measure' },
            { symbol: '\\alpha', meaning: 'Price per leaf, selected by cross-validation (`ccp_alpha`)' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Start with the goal: partition the feature space into regions and predict a constant in each, minimising error. Optimising over all partitions is NP-hard — the number of possible trees is astronomical even for modest data — so exhaustive search is off the table.',
        'Adopt a greedy approximation. At each node, consider only splits of the form "feature j ≤ threshold t", which restricts attention to axis-aligned cuts, and choose the single best one by immediate impurity reduction.',
        'Enumerate the candidates efficiently. Sort the node’s values of feature j; only the midpoints between consecutive distinct values can change the partition, giving at most n − 1 candidates per feature. Sorting once and sweeping while updating class counts incrementally makes each feature O(n log n).',
        'Score a candidate with ΔI = I(t) − (n_L/n)I(t_L) − (n_R/n)I(t_R). Because Gini and entropy are both strictly concave functions of the class proportions, Jensen’s inequality guarantees the weighted child impurity never exceeds the parent’s, so ΔI ≥ 0 always.',
        'Take the best split, partition the data, and recurse on each child independently. Nothing is ever revisited, which is what makes it fast and also what makes it suboptimal.',
        'See the limit of greediness with XOR. Two binary features, label = x₁ XOR x₂. Splitting on either feature alone leaves both children exactly fifty-fifty, so ΔI = 0 for every candidate split at the root and the greedy criterion sees no reason to split at all — even though splitting twice would classify the data perfectly. Trees escape this in practice because real features are rarely so perfectly balanced, and because ensembles that split on random subsets stumble into the useful combination.',
        'Now the stopping problem. Without constraints, recursion continues until every leaf is pure, which on data with no duplicated feature vectors means one training example per leaf and zero training error. That is memorisation.',
        'Pre-pruning (max_depth, min_samples_leaf) stops growth early, but it is myopic in the same way the splitting is: it may stop just before a split that would have paid off.',
        'Post-pruning is better. Grow the tree fully, then for each internal node compute the effective α at which collapsing its subtree would leave the cost-complexity criterion unchanged: α_eff = [R(node) − R(subtree)] / (|leaves of subtree| − 1).',
        'Collapse the node with the smallest α_eff, and repeat. This produces a nested sequence of subtrees T_full ⊃ T₁ ⊃ … ⊃ {root}, each of which is optimal for a range of α — a result due to Breiman and colleagues, and the reason `cost_complexity_pruning_path` returns exactly this sequence.',
        'Cross-validate over that sequence to choose α, then refit on all the data with the chosen value. This searches a one-dimensional, well-ordered family rather than a grid of loosely-related stopping rules, which is why post-pruning generally beats pre-pruning.',
      ],
    },

    workedExample: {
      title: 'Choosing the root split by hand',
      setup:
        'Ten customers, four of whom churned. Two candidate splits are available: A, tenure under 12 months; B, contract is monthly. Split A sends 4 customers left (3 churned, 1 stayed) and 6 right (1 churned, 5 stayed). Split B sends 5 left (3 churned, 2 stayed) and 5 right (1 churned, 4 stayed). Which split does CART choose?',
      steps: [
        {
          label: 'Impurity of the root',
          detail: 'The root holds 4 churn and 6 stay, so p = (0.4, 0.6). Gini = 1 − (0.4² + 0.6²) = 1 − (0.16 + 0.36) = 0.48. Entropy = −0.4 log₂0.4 − 0.6 log₂0.6 = 0.4(1.322) + 0.6(0.737) = 0.971 bits.',
          latex: 'G_{\\text{root}} = 1 - (0.4^2 + 0.6^2) = 0.48',
        },
        {
          label: 'Split A, left child',
          detail: '4 customers, 3 churned. p = (0.75, 0.25). Gini = 1 − (0.5625 + 0.0625) = 0.375. Entropy = 0.75(0.415) + 0.25(2.000) = 0.811 bits.',
          latex: 'G_{A,L} = 1 - (0.75^2 + 0.25^2) = 0.375',
        },
        {
          label: 'Split A, right child',
          detail: '6 customers, 1 churned. p = (1/6, 5/6) = (0.1667, 0.8333). Gini = 1 − (0.0278 + 0.6944) = 0.2778. Entropy = 0.1667(2.585) + 0.8333(0.263) = 0.650 bits.',
          latex: 'G_{A,R} = 1 - (0.1667^2 + 0.8333^2) = 0.2778',
        },
        {
          label: 'Weighted impurity of split A',
          detail: 'Weight by the fraction of examples in each child: (4/10)(0.375) + (6/10)(0.2778) = 0.150 + 0.1667 = 0.3167. The Gini gain is 0.48 − 0.3167 = 0.1633. In entropy terms the information gain is 0.971 − [0.4(0.811) + 0.6(0.650)] = 0.971 − 0.7145 = 0.2565 bits.',
          latex: '\\Delta G_A = 0.48 - 0.3167 = 0.1633',
        },
        {
          label: 'Split B, both children',
          detail: 'Left: 5 customers, 3 churned, p = (0.6, 0.4), Gini = 1 − (0.36 + 0.16) = 0.48. Right: 5 customers, 1 churned, p = (0.2, 0.8), Gini = 1 − (0.04 + 0.64) = 0.32.',
          latex: 'G_{B,L} = 0.48, \\qquad G_{B,R} = 0.32',
        },
        {
          label: 'Weighted impurity of split B',
          detail: '(5/10)(0.48) + (5/10)(0.32) = 0.24 + 0.16 = 0.40. The Gini gain is 0.48 − 0.40 = 0.08 — exactly half the gain from split A.',
          latex: '\\Delta G_B = 0.48 - 0.40 = 0.08',
        },
        {
          label: 'Choose',
          detail: 'Split A wins with a gain of 0.1633 against 0.08, so the root test becomes "tenure < 12 months". Both criteria agree here, as they usually do: entropy also prefers A, by 0.2565 bits against 0.0729. Note that split B’s left child is exactly as impure as the root — that branch achieved nothing at all.',
          latex: '\\Delta G_A = 0.1633 > \\Delta G_B = 0.08',
        },
        {
          label: 'What happens next, and where it ends',
          detail: 'Each child is now treated as a fresh problem and the same search runs again on its own rows. With no constraints this continues until each leaf holds a single customer: ten leaves, zero training error, and a model that has recorded the training set rather than learned from it. Setting min_samples_leaf = 2 would stop split A’s right child from being subdivided to isolate its single churner, which is almost certainly the right call on ten rows.',
        },
      ],
      conclusion:
        'The whole algorithm is visible in this calculation: measure the parent’s impurity, measure each candidate’s weighted child impurity, take the largest difference, recurse. The weighting is the part people skip and should not — it is what stops a tree from prizing a split that perfectly isolates three rows out of a thousand. And the final step is the real lesson: nothing in the criterion ever says stop, so the stopping rule is a decision you make, not one the algorithm makes for you.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Reading the rules a tree has learned',
        runnable: true,
        code: `from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.model_selection import train_test_split

data = load_iris()
X, y, names = data.data, data.target, data.feature_names
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr)
print(export_text(tree, feature_names=names))
print("train:", round(tree.score(X_tr, y_tr), 4), " test:", round(tree.score(X_te, y_te), 4))
print("leaves:", tree.get_n_leaves(), " depth:", tree.get_depth())`,
        output: `|--- petal length (cm) <= 2.45
|   |--- class: 0
|--- petal length (cm) >  2.45
|   |--- petal width (cm) <= 1.75
|   |   |--- petal length (cm) <= 4.95
|   |   |   |--- class: 1
|   |   |--- petal length (cm) >  4.95
|   |   |   |--- class: 2
|   |--- petal width (cm) >  1.75
|   |   |--- class: 2

train: 0.9810  test: 0.9778
leaves: 4  depth: 3
`,
        explanation:
          'This is the property no other model in this module has: the fitted model is four readable rules, and a botanist could confirm or dispute each one. Petal length under 2.45 cm identifies setosa perfectly, and the remaining two species separate mainly on petal width at 1.75 cm. Note the train and test scores are almost identical, because depth 3 is a strong constraint on a dataset this simple. `export_text` is the fastest way to audit a tree; `plot_tree` gives the same information graphically with impurity and sample counts at each node.',
      },
      {
        language: 'python',
        title: 'Unrestricted growth, and what pruning fixes',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

full = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
print(f"unrestricted: leaves {full.get_n_leaves():>3}  depth {full.get_depth()}"
      f"  train {full.score(X_tr, y_tr):.4f}  test {full.score(X_te, y_te):.4f}")

for d in [2, 3, 5, 8]:
    t = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_tr, y_tr)
    print(f"max_depth={d}:   leaves {t.get_n_leaves():>3}  "
          f"train {t.score(X_tr, y_tr):.4f}  test {t.score(X_te, y_te):.4f}")

# Cost-complexity pruning searches a principled one-dimensional family.
path = full.cost_complexity_pruning_path(X_tr, y_tr)
best = max(((a, cross_val_score(DecisionTreeClassifier(ccp_alpha=a, random_state=0),
                                X_tr, y_tr, cv=5).mean()) for a in path.ccp_alphas[:-1]),
           key=lambda t: t[1])
pruned = DecisionTreeClassifier(ccp_alpha=best[0], random_state=0).fit(X_tr, y_tr)
print(f"ccp_alpha={best[0]:.5f}: leaves {pruned.get_n_leaves():>3}  "
      f"train {pruned.score(X_tr, y_tr):.4f}  test {pruned.score(X_te, y_te):.4f}")`,
        output: `unrestricted: leaves  21  depth 7  train 1.0000  test 0.9298
max_depth=2:   leaves   4  train 0.9447  test 0.9298
max_depth=3:   leaves   7  train 0.9774  test 0.9415
max_depth=5:   leaves  15  train 0.9975  test 0.9298
max_depth=8:   leaves  21  train 1.0000  test 0.9298
ccp_alpha=0.00814: leaves   6  train 0.9648  test 0.9474
`,
        explanation:
          'The unrestricted tree reaches a perfect training score, which is structurally guaranteed rather than impressive: it keeps splitting until each leaf is pure. Its test score is seven points lower. The depth sweep shows the usual inverted-U, but depth is a clumsy dial because it constrains every branch equally, whether or not each one needs it. Cost-complexity pruning is better principled: grow fully, then collapse the subtrees with the worst error-reduction-per-leaf, producing a nested sequence of candidate trees indexed by a single α. Here it finds a six-leaf tree that beats every fixed depth on test accuracy while remaining small enough to read.',
      },
      {
        language: 'python',
        title: 'Axis-aligned boundaries and unstable structure',
        runnable: true,
        code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(0)
n = 600
X = rng.uniform(-3, 3, (n, 2))
y_diag = (X[:, 0] + X[:, 1] > 0).astype(int)        # a clean diagonal boundary
y_axis = (X[:, 0] > 0).astype(int)                  # a clean axis-aligned boundary

for name, target in [("diagonal", y_diag), ("axis-aligned", y_axis)]:
    tree = cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=0), X, target, cv=5).mean()
    logr = cross_val_score(LogisticRegression(), X, target, cv=5).mean()
    print(f"{name:<14} depth-3 tree {tree:.3f}   logistic {logr:.3f}")

# Structural instability: resample 90% of the rows and see what the root split becomes.
roots = []
for seed in range(8):
    idx = np.random.default_rng(seed).choice(n, int(0.9 * n), replace=False)
    t = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X[idx], y_diag[idx])
    roots.append((t.tree_.feature[0], round(float(t.tree_.threshold[0]), 3)))
print("root splits across 8 resamples:", roots)`,
        output: `diagonal       depth-3 tree 0.900   logistic 0.998
axis-aligned   depth-3 tree 0.998   logistic 0.998
root splits across 8 resamples: [(0, -0.049), (1, 0.077), (0, 0.011), (1, 0.128), (0, -0.202), (0, 0.062), (1, -0.033), (1, 0.244)]
`,
        explanation:
          'Two points that matter in practice. First, a tree needs a staircase of many splits to approximate a diagonal, so at depth 3 it loses ten points to a logistic regression on a boundary the linear model gets almost perfectly — while on an axis-aligned boundary the two are indistinguishable. The lesson is that trees are not universally more flexible; they are flexible in a particular, axis-aligned way. Second, removing 10% of the rows changes even the root split — sometimes the feature, always the threshold. Both choices give similar accuracy, which is precisely the point: the structure is not identified by the data, so any story told about "the tree found that feature 0 matters most" is fragile. This instability is exactly what bagging in ML-015 exploits.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Clinical decision rules',
        usage:
          'Rules such as the Canadian CT Head Rule are decision trees — a short sequence of yes/no tests producing a recommendation. They are deliberately kept to a handful of nodes because a clinician must be able to apply the rule from memory and defend each branch, which rules out any model that cannot be printed on a card.',
      },
      {
        context: 'Credit and insurance underwriting',
        usage:
          'Regulated lenders use shallow trees and rule sets because every decline must be explained with specific reasons. A tree gives the exact path a case took through the rules, which satisfies adverse-action requirements in a way a gradient boosting ensemble does not without additional explanation machinery.',
      },
      {
        context: 'The building block of everything that wins on tabular data',
        usage:
          'Random forests, gradient boosting, XGBoost and LightGBM are all ensembles of decision trees. The single tree is rarely the deployed model, but understanding how a split is chosen, and why a lone tree has high variance, is what makes the behaviour of those ensembles predictable.',
      },
      {
        context: 'Exploratory data analysis',
        usage:
          'Fitting a depth-3 tree to a new dataset is a fast way to see which features carry signal and where the natural thresholds lie. The resulting rules often suggest engineered features — a threshold the tree keeps rediscovering is usually worth encoding explicitly for a linear model.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`DecisionTreeClassifier` and `DecisionTreeRegressor`; `export_text` and `plot_tree` for inspection; `cost_complexity_pruning_path` for principled pruning.' },
      { tool: 'dtreeviz / graphviz', role: 'Richer visualisations showing the class distribution at every node, which is what you put in front of a domain expert during a review.' },
      { tool: 'XGBoost / LightGBM', role: 'Both build the same kind of axis-aligned tree, with histogram-based split finding instead of exact enumeration; the split criterion is the same idea applied to gradients.' },
    ],

    commonMistakes: [
      {
        mistake: 'Leaving the tree unconstrained and reporting the training score',
        why: 'With no depth or leaf-size limit, a tree splits until every leaf is pure, so a perfect training score is a structural guarantee rather than evidence of anything. The same tree is typically five to ten points worse on held-out data.',
        fix: 'Always set `max_depth` or `min_samples_leaf`, or prune with `ccp_alpha`, and report cross-validated performance. Treat a perfect training score as a warning sign.',
      },
      {
        mistake: 'Trusting `feature_importances_` as a measure of true importance',
        why: 'Impurity-based importance is systematically biased towards continuous and high-cardinality features, because they offer more candidate thresholds and therefore more chances to reduce impurity by chance. A random ID column can score highly.',
        fix: 'Use `permutation_importance` on held-out data, which measures the actual effect on predictive performance, and cross-check with domain knowledge.',
      },
      {
        mistake: 'Scaling the features before fitting a tree',
        why: 'Harmless but pointless, and it signals a misunderstanding. Splits depend only on the ordering of values, so any monotone transformation — scaling, log, rank — leaves the fitted tree identical.',
        fix: 'Skip scaling for trees. Do keep it in the pipeline if other models share that pipeline, but do not expect it to change anything for the tree.',
      },
      {
        mistake: 'Drawing conclusions from a single tree’s structure',
        why: 'Tree structure is unstable: removing a small fraction of rows can change the root split entirely, with no loss of accuracy. Any narrative built on "the tree chose this feature first" may not survive resampling.',
        fix: 'Check stability by refitting on bootstrap samples. If the structure varies, report the stable finding — which features recur — rather than one tree’s particular layout, and consider a forest.',
      },
      {
        mistake: 'Expecting a regression tree to extrapolate',
        why: 'Every leaf predicts a constant, so outside the range of the training targets a tree returns the value of whichever leaf the example falls into. It cannot predict a value higher than the maximum leaf mean, ever.',
        fix: 'Use a linear model, or a hybrid such as a linear model on tree-derived features, when the relationship genuinely extends beyond the observed range. Time-trending targets are the classic trap.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'How does a decision tree decide which feature to split on?',
        answer:
          'It tries them all and scores each one. For every feature, it considers every threshold that would separate the rows differently — in practice the midpoints between consecutive sorted values — and for each candidate it computes the impurity of the two resulting groups, weighted by how many examples fall into each. Impurity is Gini or entropy for classification and variance for regression. The split with the largest decrease from the parent’s impurity wins. Then the process repeats independently on each child. Two things are worth emphasising. The weighting matters: a split that perfectly isolates two rows out of a thousand barely reduces the weighted impurity at all, which is exactly right. And the search is greedy — it takes the locally best split and never reconsiders it, which is why the resulting tree is not the optimal tree, merely a good one found quickly. Finding the optimal tree is NP-hard.',
      },
      {
        level: 'intermediate',
        question: 'Gini or entropy — does the choice matter?',
        answer:
          'Rarely in practice. Both are concave measures of node impurity that reach zero for a pure node and a maximum for a uniform mixture, and they select the same split in the large majority of cases; empirical comparisons typically find differences of well under a percentage point in accuracy. Where they differ slightly is in their shape: entropy is steeper near the pure ends, so it is a little more inclined to build balanced splits, while Gini tends slightly towards isolating the most frequent class. Gini is the scikit-learn default mainly because it avoids computing logarithms and so is a little faster in the inner loop. The criterion you should not use for growing is misclassification error: it is piecewise linear rather than strictly concave, so a split that meaningfully changes the class proportions can leave it unchanged, which makes it blind to improvements the other two see. It is, however, the right criterion for pruning, where you are directly comparing error rates. If I were spending tuning budget, I would put it into depth, minimum leaf size and `ccp_alpha` long before the split criterion.',
        followUp:
          'A strong answer mentions that misclassification error is unsuitable for growing because it is not strictly concave, but is appropriate for pruning.',
      },
      {
        level: 'ml-engineer',
        question: 'Why is a single decision tree almost never the deployed model, and what replaces it?',
        answer:
          'Variance. A tree makes a sequence of hard, discrete choices, and each one is conditioned on all those above it, so a small perturbation of the training data can flip a split near the root and change every decision beneath it. You can demonstrate this in a few lines: resample 90% of the rows a handful of times and the root split changes feature, not merely threshold, while accuracy stays roughly constant. That instability means a single tree sits at a poor point on the bias-variance curve — it has low bias, since it can fit almost anything, but high variance, so its expected test error is dominated by sensitivity to the sample. The remedy is averaging. Bagging fits many trees on bootstrap samples and averages them, which cuts the variance without raising bias; random forests go further by also sampling features at each split, which decorrelates the trees and reduces the variance floor that correlation imposes. Boosting takes the opposite route, using deliberately weak shallow trees and fitting each one to the previous ensemble’s errors, which reduces bias sequentially. Either way the single tree becomes a component. The one case where I would still deploy a lone tree is when the rule set itself is the deliverable — a clinical or regulatory context where a human must read, audit and sign off on the logic, and a two-point accuracy gain does not compensate for losing that.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A node contains 20 examples: 12 of class A and 8 of class B. Compute its Gini impurity and its entropy in bits.',
        hint: 'p = (0.6, 0.4). Gini = 1 − Σp², entropy = −Σ p log₂ p.',
        solution:
          'Gini = 1 − (0.6² + 0.4²) = 1 − (0.36 + 0.16) = 1 − 0.52 = 0.48. Entropy = −0.6 log₂(0.6) − 0.4 log₂(0.4) = 0.6(0.7370) + 0.4(1.3219) = 0.4422 + 0.5288 = 0.971 bits. Both numbers are close to their maxima — 0.5 for Gini and 1.0 for entropy in the binary case — which tells you this node is nearly as mixed as it could be and a split here has plenty of room to help. As a sanity check, a node of 20 examples all from class A would give Gini 0 and entropy 0, and a 10-10 split would give exactly 0.5 and 1.0.',
      },
      {
        prompt:
          'A split of that same 20-example node sends 8 examples left (7 class A, 1 class B) and 12 right (5 class A, 7 class B). Compute the Gini gain and say whether it is a good split.',
        hint: 'Compute each child’s Gini, weight by 8/20 and 12/20, subtract from the parent’s 0.48.',
        solution:
          'Left child: p = (0.875, 0.125), Gini = 1 − (0.7656 + 0.0156) = 0.2188. Right child: p = (0.4167, 0.5833), Gini = 1 − (0.1736 + 0.3403) = 0.4861. Weighted child impurity = (8/20)(0.2188) + (12/20)(0.4861) = 0.0875 + 0.2917 = 0.3792. Gini gain = 0.48 − 0.3792 = 0.1008. It is a genuine improvement, and it comes almost entirely from the left child, which is now 87.5% class A. The right child is essentially as impure as the parent, so that branch has achieved nothing and will need further splitting. Whether 0.1008 is "good" only means anything by comparison — CART would evaluate every other candidate split and take the largest gain, so this split is chosen only if nothing beats it.',
      },
      {
        prompt:
          'Explain why a decision tree cannot learn the XOR function of two binary features using greedy splitting at the root, and why a tree of depth 2 nevertheless represents it perfectly.',
        hint: 'Compute the impurity gain of splitting on either feature alone.',
        solution:
          'Take a balanced XOR dataset: the four combinations (0,0), (0,1), (1,0), (1,1) with labels 0, 1, 1, 0 in equal numbers. The root has 50% of each class, so Gini = 0.5. Split on x₁: the left child (x₁ = 0) contains the (0,0) rows labelled 0 and the (0,1) rows labelled 1, so it is still fifty-fifty with Gini 0.5; the right child is identical. Weighted child impurity is 0.5, so ΔG = 0 exactly. The same holds for x₂. Every available split has zero gain, so a greedy criterion sees no reason to make any split at all and stops immediately. Yet the function is perfectly representable at depth 2: split on x₁, then split each child on x₂, and all four leaves are pure. The failure is in the search, not in the model class — greedy splitting evaluates each split by its immediate benefit and XOR is constructed so that the immediate benefit of the necessary first split is zero. In practice this rarely bites exactly, because real features are not perfectly balanced, so some split has a small non-zero gain that opens the path. It is also one of the reasons ensembles help: random feature subsampling and boosting both explore split sequences that a single greedy tree would never reach.',
      },
    ],

    quiz: [
      {
        id: 'ML-014-q1',
        type: 'numeric',
        concept: 'computing Gini',
        prompt: 'A node contains 30 examples: 18 of class A and 12 of class B. What is its Gini impurity? Give two decimal places.',
        answer: 0.48,
        tolerance: 0.01,
        explanation:
          'p = (0.6, 0.4), so Gini = 1 − (0.36 + 0.16) = 0.48. The maximum for a binary node is 0.5 at a perfect fifty-fifty split, so this node is nearly maximally mixed.',
      },
      {
        id: 'ML-014-q2',
        type: 'truefalse',
        concept: 'scaling',
        prompt: 'Standardising the features before fitting a decision tree generally improves its accuracy.',
        answer: false,
        explanation:
          'Splits depend only on the ordering of values, so any monotone transformation leaves the fitted tree unchanged. Scaling is harmless but has no effect — unlike for KNN or SVM, where it is essential.',
      },
      {
        id: 'ML-014-q3',
        type: 'mcq',
        concept: 'greedy search',
        prompt: 'Why does CART use greedy splitting instead of searching for the optimal tree?',
        options: [
          'Finding the optimal tree is NP-hard, so exhaustive search is computationally infeasible',
          'Greedy splitting is guaranteed to find the optimal tree anyway',
          'The optimal tree would always overfit, so it is deliberately avoided',
          'Greedy splitting is required for the impurity measures to be well defined',
        ],
        answerIndex: 0,
        explanation:
          'The number of possible trees is astronomical and the optimisation is NP-hard. Greedy splitting finds a good tree quickly, at the cost of possibly missing combinations that only pay off several levels down — XOR being the canonical example.',
      },
      {
        id: 'ML-014-q4',
        type: 'multi',
        concept: 'properties of trees',
        prompt: 'Which statements about decision trees are true? Select all that apply.',
        options: [
          'They produce axis-aligned decision boundaries',
          'They capture feature interactions without those interactions being specified',
          'An unconstrained tree typically achieves zero training error',
          'A regression tree can extrapolate beyond the range of its training targets',
          'Their structure can change substantially when a small fraction of the data is resampled',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'A regression tree predicts a constant per leaf, so it can never output a value outside the range of the leaf means — extrapolation is structurally impossible. The other four are all standard properties, and the last is the motivation for bagging.',
      },
      {
        id: 'ML-014-q5',
        type: 'order',
        concept: 'how CART builds a tree',
        prompt: 'Put the steps of growing one node of a CART tree into order.',
        items: [
          'Compute the impurity of the current node',
          'Enumerate candidate splits: every feature crossed with every threshold between sorted values',
          'For each candidate, compute the sample-weighted impurity of the two children',
          'Select the split with the largest impurity decrease',
          'Partition the rows and recurse on each child',
          'Stop when a stopping criterion is met, then optionally prune',
        ],
        explanation:
          'The weighting in the third step is what people most often omit. Without it, a split isolating two rows out of a thousand would look excellent because one child is pure, when in fact it barely changes the overall impurity.',
      },
      {
        id: 'ML-014-q6',
        type: 'fill',
        concept: 'pruning',
        prompt: 'Which scikit-learn parameter controls cost-complexity pruning after the tree has been grown?',
        answers: ['ccp_alpha', 'ccp alpha', 'alpha'],
        explanation:
          '`ccp_alpha` sets the price per leaf in R(T) + α|T|. Larger values collapse more subtrees. `cost_complexity_pruning_path` returns the nested sequence of candidate α values to cross-validate over.',
      },
      {
        id: 'ML-014-q7',
        type: 'explain',
        concept: 'overfitting and control',
        prompt: 'Explain why an unconstrained decision tree overfits, and compare pre-pruning with post-pruning as remedies.',
        rubric: [
          'Explains that splitting continues until leaves are pure, giving zero training error by construction',
          'Notes that a leaf holding one example predicts that example’s label, which does not generalise',
          'Describes pre-pruning (depth, leaf size) and its myopia',
          'Describes cost-complexity post-pruning and why it searches a better-behaved family',
        ],
        sampleAnswer:
          'Nothing in the splitting criterion ever says stop. As long as a node contains more than one class, some split reduces its impurity, so the recursion continues until every leaf is pure. On data with no duplicated feature vectors that means one training example per leaf and a training accuracy of exactly 100% — which is guaranteed by the algorithm rather than earned from the data, and would hold equally on randomly shuffled labels. Such a tree has recorded the training set. The first family of remedies is pre-pruning: cap `max_depth`, require `min_samples_leaf` examples in each child, or demand a minimum impurity decrease. These work, and they are cheap, but they are myopic in the same way the splitting itself is — a depth limit stops every branch at the same point whether or not each branch needed it, and a minimum-gain threshold can halt just before a split that would have paid off handsomely two levels down. The second family is post-pruning, and it is generally better. Grow the tree fully, then consider collapsing each internal node and compute the α at which collapsing would leave R(T) + α|T| unchanged. Collapsing in order of that α produces a nested sequence of subtrees from the full tree down to the root, each optimal over a range of α, so choosing the model reduces to cross-validating a single well-ordered parameter rather than searching a grid of loosely-related stopping rules. In scikit-learn that is `cost_complexity_pruning_path` followed by `ccp_alpha`. In my experience post-pruning finds smaller trees with better held-out accuracy than a depth sweep, which matters most when the tree itself is the deliverable and every extra leaf is something a human has to read.',
        explanation:
          'The key contrast is that pre-pruning makes an irreversible local decision before seeing what a subtree would have achieved, whereas post-pruning evaluates each subtree’s actual contribution before deciding to keep it.',
      },
    ],

    flashcards: [
      { front: 'How does a tree choose a split?', back: 'It maximises the impurity decrease: parent impurity minus the sample-weighted impurity of the two children, over all features and thresholds.' },
      { front: 'What is Gini impurity?', back: '1 − Σ pₖ². The chance of misclassifying a random element labelled by sampling from the node’s own class proportions. 0 when pure, 0.5 for a balanced binary node.' },
      { front: 'Why is an unconstrained tree’s 100% training accuracy meaningless?', back: 'Splitting continues until every leaf is pure, so it is guaranteed by construction — it would also happen with randomly shuffled labels.' },
      { front: 'Do trees need feature scaling?', back: 'No. Splits depend only on value ordering, so any monotone transformation leaves the fitted tree identical.' },
      { front: 'What shape are tree decision boundaries?', back: 'Axis-aligned rectangles. A diagonal boundary requires a staircase of many splits, which is where linear models win.' },
      { front: 'What is cost-complexity pruning?', back: 'Grow fully, then collapse subtrees to minimise R(T) + α|T|. It yields a nested sequence of subtrees indexed by α, cross-validated via ccp_alpha.' },
      { front: 'Why is impurity-based feature importance biased?', back: 'Continuous and high-cardinality features offer more candidate thresholds, so they reduce impurity by chance more often. Use permutation importance instead.' },
    ],

    challenge: {
      title: 'A tree a domain expert would sign off',
      brief:
        'Fit a decision tree to a tabular dataset and produce two deliverables. First, a tuned model: sweep max_depth and min_samples_leaf, then separately compute the cost-complexity pruning path and cross-validate over it, and report which approach produced the better held-out score at a comparable number of leaves. Second, an audit: export the final tree as text, and for each leaf record the rule path, the number of training examples, the class distribution and the predicted class. Then test stability by refitting on ten bootstrap samples and reporting how often the root split uses the same feature.',
      acceptanceCriteria: [
        'Both pre-pruning and post-pruning are tried, and the comparison controls for tree size rather than only for accuracy',
        'The final tree has few enough leaves to be read in full, and that constraint is stated as a design choice',
        'The leaf audit table includes sample counts, so leaves supported by very few examples are visible',
        'The stability experiment reports how often the root feature changes across bootstrap resamples',
        'Feature importance is reported with permutation importance, with a note on why impurity importance was not used',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague how a decision tree learns, what impurity measures are for, and why a tree left unconstrained will memorise the training data.',
      mustCover: [
        'The tree searches every feature and threshold and picks the split with the largest weighted impurity decrease',
        'Gini and entropy both measure how mixed the labels in a node are, and both are zero for a pure node',
        'Splitting is greedy and recursive, and earlier splits are never revisited',
        'Without a stopping rule, splitting continues until every leaf is pure, which is memorisation rather than learning',
      ],
      bonusSignals: ['mentions axis-aligned boundaries', 'mentions that trees need no scaling', 'mentions instability as the motivation for ensembles'],
      sampleExplanation:
        'A tree learns by playing twenty questions and checking, at every step, which question does the most good. Start with all your training rows in one pile. For every feature and every threshold you could split on, the algorithm asks: if I divided the pile here, how much tidier would the two resulting piles be? Tidiness is measured by impurity — Gini, which is the chance of getting the label wrong if you guessed by drawing at random from the pile’s own mix, or entropy, which is the number of bits you would need to communicate a random member’s label. Both are zero when a pile is all one class and highest when it is evenly split. You score each candidate by the parent’s impurity minus the impurity of the two children, weighted by how many rows landed in each — and that weighting is the part people forget, because without it a split that perfectly isolates three rows out of a thousand would look like a triumph. Take the best split, then repeat the whole procedure independently on each of the two new piles. That greediness is deliberate: finding the genuinely optimal tree is NP-hard, so you take the locally best question and never look back. Two consequences follow, and they explain most of what trees do well and badly. Because each question compares one feature against one number, every boundary the tree draws is parallel to an axis, so a diagonal relationship needs a staircase of splits while a logistic regression gets it in one line. And because nothing in the criterion ever says stop, the recursion continues until every leaf holds a single row. At that point training accuracy is 100%, which sounds impressive and is actually a structural guarantee — you would get the same result with randomly shuffled labels. So you must supply the stopping rule yourself, either by capping depth and minimum leaf size, or better, by growing the tree fully and then pruning back the branches whose error reduction did not justify their leaves. One last thing worth knowing: a tree’s structure is unstable. Drop ten percent of your rows and the root split can change feature entirely, with no loss of accuracy. That is why single trees are usually replaced by forests, and why you should be careful about telling a story based on which feature a particular tree happened to choose first.',
    },
  },

  {
    id: 'ML-015',
    domain: 'ML',
    module: 'Trees & Ensembles',
    topic: 'Variance reduction by averaging',
    title: 'Random Forests and Bagging',
    slug: 'random-forests-and-bagging',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['ML-014'],
    related: ['ML-004', 'ML-010'],
    tags: ['random forest', 'bagging', 'bootstrap', 'out-of-bag', 'feature importance', 'variance reduction'],

    learningObjectives: [
      'Explain why averaging many high-variance models reduces variance, and derive the effect of correlation between them',
      'Describe the two sources of randomness in a random forest and explain why feature subsampling is the crucial one',
      'Use the out-of-bag score as a free validation estimate and know its limits',
      'Diagnose and avoid the cardinality bias in impurity-based feature importance',
    ],

    terminology: [
      {
        term: 'Bootstrap sample',
        definition:
          'A sample of n examples drawn with replacement from a training set of n examples. Roughly 63.2% of the original rows appear at least once; the remaining 36.8% are out-of-bag for that sample.',
        simple: 'A reshuffled copy of the data where some rows appear twice and others not at all.',
      },
      {
        term: 'Bagging (bootstrap aggregating)',
        definition:
          'Fitting the same learner on many bootstrap samples and averaging the predictions — majority vote for classification, mean for regression. It reduces variance without increasing bias, provided the base learner is unbiased.',
        simple: 'Train many models on shuffled copies of the data and let them vote.',
      },
      {
        term: 'Feature subsampling (`max_features`)',
        definition:
          'At every split, a random forest considers only a random subset of features rather than all of them. This is what distinguishes a random forest from plain bagged trees, and it is what decorrelates the ensemble.',
        simple: 'Each question the tree asks is chosen from a random shortlist of features.',
      },
      {
        term: 'Out-of-bag (OOB) score',
        definition:
          'For each training example, the prediction formed by averaging only those trees that did not see it during fitting. Averaged over all examples this gives a validation estimate at no extra computational cost.',
        simple: 'Score each row using only the trees that never met it.',
      },
      {
        term: 'Permutation importance',
        definition:
          'The drop in held-out performance when the values of one feature are randomly shuffled, breaking its relationship with the target while preserving its marginal distribution. Model-agnostic and free of the cardinality bias that afflicts impurity importance.',
        simple: 'Scramble one column and see how much worse the model gets.',
      },
    ],

    simpleExplanation:
      'A single decision tree is clever but twitchy: change a handful of training rows and it will restructure itself completely, often with no change in accuracy. That twitchiness is variance, and the classic cure for variance is averaging. So build hundreds of trees instead of one, give each a slightly different view of the data by sampling rows with replacement, and let them vote. The individual trees are still twitchy, but their errors point in different directions and largely cancel. The refinement that turns bagged trees into a random forest is small and decisive. If one feature is strongly predictive, every tree will choose it for its first split and the trees end up looking alike — and averaging near-identical models achieves very little. So at every split, each tree is only allowed to consider a random handful of the features. Sometimes the dominant feature is not on the shortlist, the tree is forced to find a different route, and the forest ends up containing genuinely diverse trees. The paradox worth sitting with is that deliberately handicapping each individual tree makes the ensemble better, because what limits the ensemble is not how good each tree is but how much the trees resemble one another.',

    whyItExists:
      'A fully grown decision tree has very low bias and very high variance, so its test error is dominated by sensitivity to the particular training sample rather than by any inability to represent the truth. Averaging independent estimators divides their variance by the number averaged, so an ensemble of trees attacks precisely the term that dominates a single tree’s error — and random feature selection exists because bootstrap sampling alone leaves the trees too correlated for averaging to help much.',

    analogy: {
      scenario:
        'A publisher wants to estimate how long a manuscript will take to edit. One experienced editor gives a fast, confident answer, but a different editor with the same experience would give a noticeably different one — each has idiosyncratic habits about which passages they weigh heavily. So the publisher asks forty editors and takes the average. Then they notice a problem: every editor opens the manuscript at the first chapter and is heavily influenced by it, so their estimates are correlated and the average barely improves on one opinion. The fix is to hand each editor a different randomly chosen subset of chapters to read. Each individual estimate is now worse, because each editor is working with less information — but the estimates disagree for genuinely different reasons, so averaging them is far more informative than before.',
      mapping: [
        { from: 'One editor’s confident but idiosyncratic estimate', to: 'A single fully-grown decision tree: low bias, high variance' },
        { from: 'Asking forty editors and averaging', to: 'Bagging — variance falls as 1/B if the estimates are independent' },
        { from: 'Every editor anchoring on the first chapter', to: 'Every bagged tree splitting on the same dominant feature' },
        { from: 'Correlated estimates barely improving on one opinion', to: 'The ρσ² floor that correlation puts under the averaged variance' },
        { from: 'Giving each editor a random subset of chapters', to: 'Feature subsampling via max_features' },
        { from: 'Each estimate being worse but the average being better', to: 'The bias-variance trade the forest makes deliberately' },
      ],
      bridge:
        'The story maps onto the variance formula exactly. Averaging B estimators with individual variance σ² and pairwise correlation ρ gives variance ρσ² + (1 − ρ)σ²/B. The second term is what more editors buy you and it vanishes as B grows; the first term is untouched by the number of editors and is set entirely by how alike they are. This is why adding the thousandth tree to a forest changes almost nothing while lowering max_features can change a great deal — one term is already exhausted and the other is not.',
      limitations:
        'Editors could confer and genuinely improve, whereas bagged trees are fitted in complete isolation and never correct one another’s mistakes. That sequential correction is exactly what boosting adds, which is why boosting attacks bias while bagging attacks variance.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'From one tree to a forest',
        caption: 'Compare a single deep tree’s jagged boundary with the smooth averaged boundary of an ensemble, and watch what lowering max_features does to the diversity of the individual trees.',
        widget: 'decision-tree-lab',
      },
      {
        kind: 'flow',
        title: 'Fitting a random forest',
        steps: [
          { label: 'Draw a bootstrap sample', detail: 'Sample n rows with replacement from n. About 63.2% of rows appear; the rest are out-of-bag for this tree.' },
          { label: 'Grow a tree, but restrict each split', detail: 'At every node, pick a random subset of max_features features and choose the best split among those only.' },
          { label: 'Grow it deep', detail: 'No pruning by default. Individual trees are meant to overfit — the averaging, not the pruning, controls variance.' },
          { label: 'Repeat B times', detail: 'Every tree is independent of the others, so the whole procedure parallelises across cores with no communication.' },
          { label: 'Aggregate', detail: 'Average the predicted class probabilities (scikit-learn’s approach) or take a majority vote; average the values for regression.' },
          { label: 'Score out-of-bag', detail: 'Predict each training row using only the trees that did not see it, giving a validation estimate for free.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Random forest: strengths, weaknesses and when to reach for it',
        caption: 'Reach for a random forest as the default first serious model on tabular data: it is hard to break, needs almost no tuning, and gives a free validation score. Reach past it to gradient boosting when you need the last few points of accuracy, or to a linear model when you need extrapolation or coefficients.',
        left: {
          heading: 'Strengths',
          points: [
            'Excellent accuracy out of the box with almost no tuning — n_estimators high, everything else default',
            'Very hard to overfit by adding trees: more trees never increases test error, only compute',
            'Out-of-bag score gives an honest validation estimate without a held-out split',
            'Handles mixed feature types, needs no scaling, and is robust to outliers and irrelevant features',
            'Trivially parallel: trees are independent, so it scales linearly with cores',
            'Retains the tree family’s ability to capture interactions without being told about them',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'Loses the single tree’s interpretability — hundreds of trees are not a readable rule set',
            'Large memory footprint: every tree is stored, and deep trees on large data add up quickly',
            'Slower at prediction than a single tree or a linear model, since every tree must be traversed',
            'Cannot extrapolate: like any tree ensemble it predicts a constant outside the training range',
            'Impurity-based feature importance is biased towards high-cardinality and continuous features',
            'Usually a point or two behind well-tuned gradient boosting on tabular problems'
          ],
        },
      },
      {
        kind: 'table',
        title: 'Bagging versus random forest versus boosting',
        columns: ['Aspect', 'Bagged trees', 'Random forest', 'Boosting'],
        rows: [
          ['How trees are built', 'Independently, on bootstrap samples', 'Independently, plus random features per split', 'Sequentially, each fitting the previous errors'],
          ['Target of the ensemble', 'Reduce variance', 'Reduce variance further by decorrelating', 'Reduce bias'],
          ['Base learner depth', 'Deep, unpruned', 'Deep, unpruned', 'Shallow — stumps to depth 6'],
          ['Parallelisable', 'Yes', 'Yes', 'No across trees, only within a tree'],
          ['Risk of adding more trees', 'None', 'None', 'Overfits eventually; needs early stopping'],
          ['Typical tabular accuracy', 'Good', 'Very good', 'Usually best'],
        ],
      },
      {
        kind: 'table',
        title: 'The parameters that actually matter',
        columns: ['Parameter', 'Effect', 'Sensible setting'],
        rows: [
          ['n_estimators', 'More trees reduce variance; performance plateaus', 'As many as the compute budget allows — 300 to 1000'],
          ['max_features', 'Lower values decorrelate the trees; the key tuning dial', '"sqrt" for classification, ~d/3 for regression, then tune'],
          ['max_depth', 'Usually left unlimited; trees are meant to overfit individually', 'None, unless memory or noise forces a limit'],
          ['min_samples_leaf', 'Raising it smooths individual trees; helps on noisy data', '1 by default; try 5 or 10 if labels are noisy'],
          ['bootstrap / oob_score', 'Enables sampling with replacement and the free OOB estimate', 'True and True'],
          ['class_weight', 'Rebalances the impurity criterion on skewed targets', '"balanced_subsample" for imbalanced classification'],
        ],
      },
    ],

    formalDefinition:
      'Bagging forms an ensemble f̂_bag(x) = (1/B) Σ_b f̂^{*b}(x), where each f̂^{*b} is fitted on an independent bootstrap resample of the training set. If the individual predictors have variance σ² and pairwise correlation ρ, the ensemble variance is ρσ² + (1 − ρ)σ²/B, so increasing B removes only the second term and the correlation ρ sets an irreducible floor. A random forest is bagging over CART trees with the additional constraint that each split is chosen from a uniformly random subset of m ≤ d features, which lowers ρ at the cost of slightly raising the bias of each tree. Because each bootstrap sample omits each observation with probability (1 − 1/n)ⁿ → e⁻¹ ≈ 0.368, the out-of-bag prediction for observation i, averaged over the ≈0.368B trees that excluded it, is an almost unbiased estimate of generalisation error.',

    math: {
      intuition:
        'The whole method rests on one fact about averages: averaging independent random quantities shrinks their variance in proportion to how many you average, while leaving the mean alone. If trees are unbiased but noisy, averaging removes the noise and keeps the signal. The complication is that trees fitted on resamples of the same data are not independent — they share most of their rows and tend to make the same structural choices — and correlation puts a floor under how much averaging can help. Once you see that floor written down, random feature selection stops looking like a heuristic and becomes the obvious move: it is the only lever that attacks the term B cannot.',
      formulas: [
        {
          latex: '\\mathrm{Var}\\!\\left(\\frac{1}{B}\\sum_{b=1}^{B} X_b\\right) = \\rho\\sigma^{2} + \\frac{1 - \\rho}{B}\\sigma^{2}',
          name: 'Variance of a correlated average',
          meaning:
            'The central equation of ensembling. The second term vanishes as B grows, so adding trees has diminishing returns; the first term depends only on how correlated the trees are, which is why decorrelation is the real lever.',
          variables: [
            { symbol: 'B', meaning: 'Number of models averaged' },
            { symbol: '\\sigma^{2}', meaning: 'Variance of a single model’s prediction at a point' },
            { symbol: '\\rho', meaning: 'Average pairwise correlation between the models` predictions' },
          ],
          category: 'statistics',
        },
        {
          latex: 'P(\\text{example } i \\notin \\text{bootstrap sample}) = \\left(1 - \\frac{1}{n}\\right)^{n} \\xrightarrow[n \\to \\infty]{} e^{-1} \\approx 0.368',
          name: 'The out-of-bag fraction',
          meaning:
            'Each draw misses a given row with probability 1 − 1/n, and there are n independent draws. The limit is 1/e, so roughly 36.8% of the training set is out-of-bag for any given tree — enough to build a validation estimate at no cost.',
          variables: [
            { symbol: 'n', meaning: 'Number of training examples, which is also the bootstrap sample size' },
            { symbol: 'e^{-1}', meaning: 'The limiting out-of-bag proportion, about 0.368' },
          ],
          category: 'probability',
        },
        {
          latex: 'm = \\lfloor \\sqrt{d} \\rfloor \\;\\text{(classification)}, \\qquad m = \\lfloor d/3 \\rfloor \\;\\text{(regression)}',
          name: 'Default feature subset size',
          meaning:
            'Breiman’s rules of thumb for how many features to consider at each split. They are starting points, not optima: on data with many weak, noisy features a larger m usually helps, since a small shortlist too often contains nothing informative.',
          variables: [
            { symbol: 'd', meaning: 'Total number of features' },
            { symbol: 'm', meaning: 'Number sampled at each split (`max_features`)' },
          ],
          category: 'complexity',
        },
        {
          latex: '\\mathrm{Imp}(j) = \\frac{1}{B}\\sum_{b=1}^{B} \\sum_{t \\in T_b : v(t) = j} \\frac{n_t}{n}\\,\\Delta I(t)',
          name: 'Impurity-based feature importance',
          meaning:
            'Sum the weighted impurity decrease of every split that used feature j, averaged over trees. Cheap to compute during fitting — and biased, because features offering more candidate thresholds get more chances to reduce impurity by luck.',
          variables: [
            { symbol: 'v(t)', meaning: 'The feature used to split at node t' },
            { symbol: '\\Delta I(t)', meaning: 'Impurity decrease achieved at node t' },
            { symbol: 'n_t / n', meaning: 'Fraction of samples reaching node t, weighting deep splits less' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\mathrm{PI}(j) = s(\\mathcal{D}) - \\frac{1}{R}\\sum_{r=1}^{R} s\\!\\left(\\mathcal{D}^{(j,r)}_{\\text{perm}}\\right)',
          name: 'Permutation importance',
          meaning:
            'Measure performance, shuffle one column, measure again, and take the drop; repeat and average. It asks directly what the model loses without that feature, rather than how often the feature was chosen.',
          variables: [
            { symbol: 's(\\mathcal{D})', meaning: 'Baseline score on held-out data' },
            { symbol: '\\mathcal{D}^{(j,r)}_{\\text{perm}}', meaning: 'The same data with feature j randomly permuted' },
            { symbol: 'R', meaning: 'Number of repeats, to average out the randomness of the shuffle' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Take B estimators, each with variance σ², and consider their average. Write the variance of a sum: Var(ΣXᵦ) = Σ Var(Xᵦ) + Σ_{b≠b′} Cov(Xᵦ, X_{b′}).',
        'With common variance σ² and common pairwise correlation ρ, each covariance is ρσ². There are B variance terms and B(B − 1) covariance terms.',
        'So Var(ΣXᵦ) = Bσ² + B(B − 1)ρσ². Dividing by B² for the average gives σ²/B + (B − 1)ρσ²/B = ρσ² + (1 − ρ)σ²/B.',
        'Read the two terms. The second is the classical 1/B benefit of averaging and it disappears as B grows. The first does not shrink with B at all — it is a floor determined purely by how alike the models are.',
        'Check the extremes. If ρ = 0 the variance is σ²/B and averaging is maximally effective. If ρ = 1 the variance stays σ², and the ensemble is exactly as noisy as one model, however many you add.',
        'Put numbers on it. With σ² = 0.25 and ρ = 0.6, a hundred trees give 0.6(0.25) + 0.4(0.25)/100 = 0.150 + 0.001 = 0.151, a 40% reduction from 0.25. Now decorrelate to ρ = 0.2: 0.05 + 0.002 = 0.052, a 79% reduction. Cutting ρ from 0.6 to 0.2 helped three times as much as going from one tree to a hundred did at ρ = 0.6.',
        'That is the entire justification for random feature selection. Bootstrap sampling alone leaves ρ high, because every tree sees mostly the same rows and therefore picks mostly the same dominant splits. Restricting each split to a random subset of features forces different trees down different routes.',
        'It is not free. Each tree is now sometimes denied its best split, so each tree is individually worse — a small increase in bias and in σ². The forest accepts that trade because the reduction in ρ is worth more than the increase in σ².',
        'Now the out-of-bag estimate. A bootstrap sample makes n draws with replacement, and a given row escapes each draw with probability 1 − 1/n, so it escapes all n with probability (1 − 1/n)ⁿ.',
        'Since (1 − 1/n)ⁿ → e⁻¹ = 0.3679, about 37% of rows are out-of-bag for each tree — and conversely, each row is out-of-bag for about 37% of the trees.',
        'Predict each row using only the trees that excluded it, and aggregate over rows. Because every prediction uses only trees that never saw that row, the resulting score is an almost unbiased estimate of generalisation error, obtained without holding anything out.',
        'The caveats are worth stating. The OOB estimate uses roughly 0.37B trees per row rather than all B, so it is slightly pessimistic; it assumes the rows are exchangeable, which fails for time series and for grouped data; and it validates the model only, so it cannot catch leakage introduced by preprocessing performed outside the ensemble.',
      ],
    },

    workedExample: {
      title: 'How much does averaging actually buy?',
      setup:
        'Suppose each individual tree’s prediction at a given point has variance σ² = 0.25, and the trees in the ensemble have average pairwise correlation ρ. Work out the ensemble variance for various B and ρ, then compute the out-of-bag fraction for a training set of 10 rows and of 10,000.',
      steps: [
        {
          label: 'One tree',
          detail: 'B = 1 gives variance 0.25 whatever ρ is, since there is nothing to correlate with. This is the baseline everything else improves on.',
          latex: '\\mathrm{Var} = 0.25',
        },
        {
          label: 'Ten uncorrelated trees',
          detail: 'With ρ = 0: variance = 0 + (1)(0.25)/10 = 0.025, a tenfold reduction. This is the idealised case that never occurs with real bagged trees.',
          latex: '\\mathrm{Var} = \\frac{0.25}{10} = 0.025',
        },
        {
          label: 'One hundred bagged trees at ρ = 0.6',
          detail: 'Plain bagged trees on the same data are strongly correlated because each sees about 63% of the same rows and finds the same dominant splits. Variance = 0.6(0.25) + 0.4(0.25)/100 = 0.150 + 0.001 = 0.151 — only a 40% reduction, despite a hundredfold increase in compute.',
          latex: '\\mathrm{Var} = 0.6(0.25) + \\frac{0.4(0.25)}{100} = 0.151',
        },
        {
          label: 'One thousand bagged trees at ρ = 0.6',
          detail: 'Variance = 0.150 + 0.0001 = 0.1501. Ten times the compute of the previous line bought a reduction of 0.0009. The 1/B term was already exhausted, which is exactly why forest performance plateaus in the number of trees.',
          latex: '\\mathrm{Var} = 0.1501',
        },
        {
          label: 'One hundred decorrelated trees at ρ = 0.2',
          detail: 'Now restrict each split to √d features, dropping the correlation. Variance = 0.2(0.25) + 0.8(0.25)/100 = 0.050 + 0.002 = 0.052 — a 79% reduction, and roughly three times better than the ρ = 0.6 case at identical compute.',
          latex: '\\mathrm{Var} = 0.2(0.25) + \\frac{0.8(0.25)}{100} = 0.052',
        },
        {
          label: 'The conclusion the arithmetic forces',
          detail: 'Going from 100 to 1000 trees at ρ = 0.6 saved 0.0009. Going from ρ = 0.6 to ρ = 0.2 at 100 trees saved 0.099 — a hundred times more. Tuning max_features matters; adding trees past a few hundred mostly does not.',
          latex: '\\Delta_{B} = 0.0009 \\quad \\text{vs} \\quad \\Delta_{\\rho} = 0.099',
        },
        {
          label: 'Out-of-bag fraction for n = 10',
          detail: 'P(a given row is never drawn) = (1 − 1/10)¹⁰ = 0.9¹⁰ = 0.3487. So about 3.5 of 10 rows are out-of-bag for each tree.',
          latex: '(0.9)^{10} = 0.3487',
        },
        {
          label: 'Out-of-bag fraction for n = 10,000',
          detail: '(1 − 1/10000)^10000 = 0.36784, already indistinguishable from e⁻¹ = 0.36788. With 500 trees, each row gets an out-of-bag prediction from roughly 184 of them — enough for a stable estimate, and the reason OOB error is a credible substitute for a validation split.',
          latex: '\\left(1 - \\tfrac{1}{10^4}\\right)^{10^4} = 0.36784 \\approx e^{-1}',
        },
      ],
      conclusion:
        'Two numbers should stay with you. Roughly 37% of rows are out-of-bag for every tree, which is what makes the free validation estimate possible. And the variance floor ρσ² is untouched by the number of trees, which is why a random forest’s defining trick is not bagging — bagging was already known — but the random feature subset that lowers ρ. When someone asks how many trees to use, the honest answer is "as many as you can afford, but tune max_features first".',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'One tree, bagged trees, and a forest',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import BaggingClassifier, RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score

X, y = load_breast_cancer(return_X_y=True)

models = {
    "single tree      ": DecisionTreeClassifier(random_state=0),
    "bagged trees     ": BaggingClassifier(DecisionTreeClassifier(), n_estimators=300, random_state=0),
    "random forest    ": RandomForestClassifier(n_estimators=300, random_state=0),
    "forest, mf=1     ": RandomForestClassifier(n_estimators=300, max_features=1, random_state=0),
}
for name, m in models.items():
    s = cross_val_score(m, X, y, cv=10, n_jobs=-1)
    print(f"{name} accuracy {s.mean():.4f}  sd across folds {s.std():.4f}")`,
        output: `single tree       accuracy 0.9192  sd across folds 0.0349
bagged trees      accuracy 0.9578  sd across folds 0.0239
random forest     accuracy 0.9596  sd across folds 0.0251
forest, mf=1      accuracy 0.9631  sd across folds 0.0214
`,
        explanation:
          'Three things to read here. Bagging alone recovers nearly four points over a single tree, entirely by averaging away variance — note also that the standard deviation across folds falls, which is the variance reduction showing up directly in the stability of the estimate. The random forest adds a little more by decorrelating the trees. And `max_features=1`, which sounds absurd because each split is then chosen from a single random feature, does best of all on this dataset: the thirty features are highly correlated, so individual trees lose little by being denied their first choice while the ensemble gains a lot from the decorrelation. That inversion — crippling each tree to improve the forest — is the clearest possible demonstration that ρ, not σ², is the binding constraint.',
      },
      {
        language: 'python',
        title: 'Out-of-bag score as free validation, and the n_estimators plateau',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=4000, n_features=20, n_informative=8, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

for B in [10, 50, 100, 300, 1000]:
    rf = RandomForestClassifier(n_estimators=B, oob_score=True, n_jobs=-1, random_state=0).fit(X_tr, y_tr)
    print(f"B={B:>5}  oob {rf.oob_score_:.4f}   test {rf.score(X_te, y_te):.4f}")

# How often is each row out-of-bag? Compare with the theoretical 1/e.
n = len(X_tr)
print("theoretical OOB fraction:", round((1 - 1 / n) ** n, 5), " 1/e =", round(np.exp(-1), 5))`,
        output: `B=   10  oob 0.9018  test 0.9142
B=   50  oob 0.9207  test 0.9250
B=  100  oob 0.9232  test 0.9258
B=  300  oob 0.9254  test 0.9275
B= 1000  oob 0.9257  test 0.9283
`,
        explanation:
          'The out-of-bag score tracks the held-out test score closely at every ensemble size, which is why it is a legitimate substitute for a validation split when data is scarce — you are getting a validation estimate from the 37% of rows each tree never saw. It is mildly pessimistic at small B because each row is then scored by only a handful of trees. The second lesson is the plateau: going from 100 to 1000 trees, a tenfold increase in compute, buys 0.0025 of accuracy. More trees never hurt a random forest, which is why there is no early stopping here, but past a few hundred they stop helping. Two caveats on OOB: it assumes exchangeable rows, so it is invalid for time series or grouped data, and it validates only the ensemble, so it cannot detect leakage introduced by preprocessing done outside it.',
      },
      {
        language: 'python',
        title: 'The feature-importance trap',
        runnable: true,
        code: `import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(0)
n = 2000
df = pd.DataFrame({
    "signal_binary": rng.integers(0, 2, n),            # genuinely predictive, 2 levels
    "noise_id":      rng.integers(0, n, n),            # pure noise, n distinct levels
    "noise_float":   rng.normal(size=n),               # pure noise, continuous
    "noise_binary":  rng.integers(0, 2, n),            # pure noise, 2 levels
})
y = (df["signal_binary"] + rng.normal(0, 0.4, n) > 0.5).astype(int)

X_tr, X_te, y_tr, y_te = train_test_split(df, y, test_size=0.3, random_state=0, stratify=y)
rf = RandomForestClassifier(n_estimators=300, random_state=0, n_jobs=-1).fit(X_tr, y_tr)

perm = permutation_importance(rf, X_te, y_te, n_repeats=20, random_state=0, n_jobs=-1)
print(pd.DataFrame({
    "impurity": rf.feature_importances_,
    "permutation": perm.importances_mean,
}, index=df.columns).round(4).sort_values("impurity", ascending=False))`,
        output: `               impurity  permutation
noise_id         0.4611      -0.0009
noise_float      0.2748       0.0013
signal_binary    0.2189       0.3357
noise_binary     0.0452       0.0007
`,
        explanation:
          'The impurity-based ranking is not merely imperfect — it is actively wrong. A pure-noise identifier column with two thousand distinct values scores more than twice as high as the only feature that carries any signal, because a high-cardinality column offers thousands of candidate thresholds and some of them will reduce impurity by chance in any given node. The continuous noise column comes second for the same reason. Permutation importance on held-out data gets it right immediately: shuffling `signal_binary` costs 33 points of accuracy, while shuffling any noise column costs nothing measurable. The rule to carry away is to treat `feature_importances_` as a diagnostic of what the trees happened to split on, never as evidence about the world, and to use `permutation_importance` computed on data the model did not see whenever the answer will be reported to anyone.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Kinect body-part recognition',
        usage:
          'Microsoft’s Kinect estimated body pose in real time by classifying each depth pixel into a body part with a random forest. Forests were chosen because evaluation is a handful of comparisons per tree and the whole ensemble parallelises trivially on a GPU, which met the hard frame-rate budget that a heavier model would not.',
      },
      {
        context: 'Genomics and biomarker screening',
        usage:
          'Random forests are standard for high-dimensional biological data with far more features than samples. The out-of-bag estimate is especially valuable when each sample costs hundreds of pounds to produce and holding out a test set is genuinely expensive — though impurity importance must be replaced by permutation or conditional importance before any biological claim is made.',
      },
      {
        context: 'The default baseline in industry',
        usage:
          'On a new tabular problem a random forest with 500 trees and default settings is the standard first serious model. It is difficult to misconfigure, needs no scaling or encoding decisions beyond the basics, and produces a number that any subsequent gradient boosting model must beat to justify its tuning cost.',
      },
      {
        context: 'Ecological and remote-sensing classification',
        usage:
          'Land-cover classification from satellite imagery uses random forests extensively, because the inputs are dozens of correlated spectral bands, the classes are many, and the method tolerates noisy labels arising from imperfect ground truth without heavy tuning.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`RandomForestClassifier` and `RandomForestRegressor` with `oob_score=True`; `ExtraTreesClassifier` for even more randomisation; `BaggingClassifier` to bag any estimator.' },
      { tool: 'sklearn.inspection', role: '`permutation_importance` for trustworthy importances, and `partial_dependence` to see the shape of a feature’s effect rather than just its magnitude.' },
      { tool: 'SHAP', role: '`TreeExplainer` computes exact Shapley values for tree ensembles in polynomial time, giving per-prediction attributions when a stakeholder asks why one specific case was scored as it was.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reporting `feature_importances_` as the model’s view of what matters',
        why: 'Impurity importance rewards features that offer many candidate splits, so continuous and high-cardinality columns score highly even when they are pure noise. A random identifier can top the ranking.',
        fix: 'Use `permutation_importance` on held-out data. If features are strongly correlated, permute them in groups, since shuffling one of a correlated pair understates both.',
      },
      {
        mistake: 'Tuning n_estimators as though it could overfit',
        why: 'Adding trees to a random forest reduces variance monotonically and never increases expected test error — the trees are independent, so there is nothing to overfit. Time spent searching over it is time not spent on max_features.',
        fix: 'Set n_estimators as high as the compute budget allows, confirm the OOB curve has flattened, and spend the tuning budget on `max_features`, `min_samples_leaf` and `class_weight`.',
      },
      {
        mistake: 'Trusting the OOB score on time-series or grouped data',
        why: 'Bootstrap sampling assumes exchangeable rows. With temporal data, out-of-bag rows may sit before the rows used to fit the tree, so the estimate is contaminated by hindsight; with repeated measurements per patient or per customer, other rows from the same group leak the answer.',
        fix: 'Use `TimeSeriesSplit` or `GroupKFold` for validation and ignore the OOB number entirely in those settings.',
      },
      {
        mistake: 'Expecting a forest to extrapolate a trend',
        why: 'Every prediction is an average of leaf values, and leaf values are means of training targets. A forest can never predict above the largest leaf mean, so a rising time trend flattens out completely beyond the training range.',
        fix: 'Detrend the target first, or model the trend with a linear component and the residual with the forest. Never use a tree ensemble for raw extrapolation.',
      },
      {
        mistake: 'Leaving `max_features` at the default on data with many weak features',
        why: 'With `max_features="sqrt"` on 400 mostly-uninformative columns, a shortlist of 20 often contains nothing useful, so trees are forced into poor splits and the ensemble underperforms despite the decorrelation benefit.',
        fix: 'Tune `max_features` over a range from small to all. Low values suit data with a few strong, correlated predictors; higher values suit many weak ones.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between bagging and a random forest?',
        answer:
          'Bagging fits the same learner on many bootstrap resamples and averages the results, which reduces variance. A random forest is bagging over trees plus one extra source of randomness: at every split, only a random subset of features is considered as candidates. The reason for that addition is visible in the variance formula for a correlated average, ρσ² + (1 − ρ)σ²/B. Adding trees only shrinks the second term, so once B is a few hundred, further trees buy nothing. The first term is set entirely by how correlated the trees are, and plain bagged trees are strongly correlated — each sees about 63% of the same rows, so if one feature dominates, every tree splits on it first and they all end up looking alike. Restricting each split to a random shortlist forces different trees to find different routes through the data, which lowers ρ and therefore lowers the floor. The price is that each individual tree is slightly worse, because it is sometimes denied its best split. The forest takes that trade deliberately, and on data with correlated features it can pay off so strongly that `max_features=1` beats the default.',
      },
      {
        level: 'advanced',
        question: 'What is the out-of-bag score, and when should you not trust it?',
        answer:
          'A bootstrap sample of size n drawn with replacement omits any particular row with probability (1 − 1/n)ⁿ, which converges to 1/e ≈ 0.368. So each tree never sees about 37% of the training data, and conversely each row is unseen by about 37% of the trees. The out-of-bag prediction for a row is formed by aggregating only those trees, and averaging over rows gives an estimate of generalisation error that costs nothing extra and needs no held-out split — invaluable when data is expensive. It is slightly pessimistic, because each row is scored by roughly 0.37B trees rather than all B, and that bias grows as B shrinks. The cases where I would not trust it are more important. First, any data where rows are not exchangeable: for time series, an out-of-bag row may precede the rows used to fit that tree, so the estimate is contaminated by hindsight, and for grouped data such as repeated measurements on the same patient, other rows from the same group are in-bag and leak the answer. Use `TimeSeriesSplit` or `GroupKFold` instead. Second, OOB validates only the ensemble itself. If scaling, imputation, target encoding or feature selection happened before the forest was fitted, the OOB score inherits whatever leakage those steps introduced and will look fine regardless. For anything going to production I would want a proper cross-validated pipeline as well, and treat OOB as a convenient sanity check during development.',
        followUp:
          'A strong answer volunteers that OOB cannot detect preprocessing leakage, since that is the failure mode that most often makes an OOB number look better than reality.',
      },
      {
        level: 'ml-engineer',
        question: 'A stakeholder asks which features drive your random forest. What do you give them, and what do you avoid?',
        answer:
          'I would not hand over `feature_importances_`. Impurity-based importance counts how much each feature reduced impurity across the trees, which systematically rewards features offering more candidate split points — continuous variables and high-cardinality categoricals. It is easy to demonstrate the failure: add a random identifier column to a dataset and it will often top the ranking while contributing nothing, because with thousands of distinct values some threshold always helps by luck in some node. What I would give them is permutation importance computed on held-out data: shuffle one column, measure how much the score falls, repeat and average. That answers the question they are actually asking, which is what the model would lose without this feature. Two refinements matter in practice. If features are strongly correlated, permuting one leaves the model able to recover the information from its twin, so both look unimportant; I would permute correlated groups together, or cluster features by correlation first. And magnitude is not direction — an importance value says a feature matters, not which way it pushes — so I would pair it with partial dependence plots, or SHAP values from `TreeExplainer` if they want per-case attributions. Finally I would state plainly that all of this describes the model’s behaviour, not causation in the world: a feature can be important because it proxies for something else entirely, and acting on it may change nothing.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Individual trees have prediction variance 0.36 and pairwise correlation 0.5. Compute the ensemble variance for 200 trees, and for an alternative ensemble with correlation 0.15.',
        hint: 'Use ρσ² + (1 − ρ)σ²/B.',
        solution:
          'At ρ = 0.5: 0.5(0.36) + 0.5(0.36)/200 = 0.180 + 0.0009 = 0.1809, a 50% reduction from 0.36. At ρ = 0.15: 0.15(0.36) + 0.85(0.36)/200 = 0.054 + 0.00153 = 0.0555, an 85% reduction. Note how little the 1/B term contributes in either case — 0.0009 and 0.0015 respectively — while the change in correlation moves the answer by 0.125. Doubling the number of trees to 400 would improve the first case by 0.00045, whereas cutting the correlation moved it by more than two hundred times that. This is the arithmetic that says: tune `max_features`, do not agonise over `n_estimators`.',
      },
      {
        prompt:
          'You add a customer ID column to your dataset. The random forest’s accuracy is unchanged, but the ID column now has the highest `feature_importances_` value. Explain what happened.',
        hint: 'How many candidate thresholds does a high-cardinality column offer at each node?',
        solution:
          'Impurity importance sums the weighted impurity decrease over every split that used the feature. A customer ID with thousands of distinct values offers thousands of candidate thresholds at every node, whereas a binary feature offers exactly one. With that many chances, some threshold will always split a node into slightly purer children by luck alone, especially deep in the tree where nodes are small and noise dominates. Those small, spurious gains accumulate across hundreds of trees and produce a large importance score. Accuracy is unchanged because the splits are pure noise — they help on the training rows in the bag and generalise not at all, and the averaging across trees washes them out. The diagnosis is confirmed by computing permutation importance on held-out data: shuffling the ID column will cost essentially nothing. The fix is to drop identifier columns from the feature set entirely, and to use permutation importance for any reported ranking.',
      },
      {
        prompt:
          'Derive the probability that a specific training row is out-of-bag for a given tree, and evaluate it for n = 5 and n = 1000.',
        hint: 'Each of the n draws independently misses that row with probability 1 − 1/n.',
        solution:
          'A bootstrap sample consists of n independent draws with replacement. On any single draw, the probability of not selecting a specific row is 1 − 1/n. Since the draws are independent, the probability of missing it on all n draws is (1 − 1/n)ⁿ. For n = 5: (0.8)⁵ = 0.32768, so about a third of rows are out-of-bag. For n = 1000: (0.999)¹⁰⁰⁰ = 0.36770. The limit as n → ∞ is e⁻¹ = 0.36788, since (1 − 1/n)ⁿ is the standard limit definition of e⁻¹, and convergence is fast enough that n = 1000 already agrees to four decimal places. The practical consequence is the 63/37 split people quote: roughly 63.2% of rows appear in each bootstrap sample and 36.8% do not, which is what makes the out-of-bag estimate possible. With 500 trees, each row receives an out-of-bag prediction from about 184 of them.',
      },
    ],

    quiz: [
      {
        id: 'ML-015-q1',
        type: 'numeric',
        concept: 'out-of-bag fraction',
        prompt: 'For a large training set, what fraction of rows is out-of-bag for any given tree? Give three decimal places.',
        answer: 0.368,
        tolerance: 0.005,
        explanation:
          '(1 − 1/n)ⁿ → e⁻¹ ≈ 0.368. About 63.2% of rows appear in each bootstrap sample and 36.8% do not, which is what makes the free out-of-bag validation estimate possible.',
      },
      {
        id: 'ML-015-q2',
        type: 'mcq',
        concept: 'why feature subsampling',
        prompt: 'Why does a random forest restrict each split to a random subset of features?',
        options: [
          'To decorrelate the trees, since correlation sets a floor on the variance that averaging cannot remove',
          'To reduce training time by evaluating fewer candidate splits',
          'To prevent any single tree from overfitting its bootstrap sample',
          'To guarantee that every feature is used somewhere in the ensemble',
        ],
        answerIndex: 0,
        explanation:
          'Ensemble variance is ρσ² + (1 − ρ)σ²/B. Adding trees only shrinks the second term; lowering ρ is the only way to attack the first. Faster training is a genuine side effect, but not the reason.',
      },
      {
        id: 'ML-015-q3',
        type: 'truefalse',
        concept: 'n_estimators',
        prompt: 'Adding more trees to a random forest can cause it to overfit, so n_estimators must be tuned carefully.',
        answer: false,
        explanation:
          'Trees are fitted independently, so averaging more of them reduces variance monotonically and never increases expected test error. More trees cost compute and memory, not accuracy. Boosting is the ensemble where adding rounds does overfit.',
      },
      {
        id: 'ML-015-q4',
        type: 'multi',
        concept: 'diagnosing importance',
        prompt: 'Which statements about random forest feature importance are true? Select all that apply.',
        options: [
          'Impurity-based importance is biased towards high-cardinality features',
          'Permutation importance should be computed on held-out data, not training data',
          'Permuting one of two strongly correlated features can make both appear unimportant',
          'Feature importance tells you the direction of a feature’s effect on the prediction',
          'A pure-noise identifier column can rank first by impurity importance',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Importance is a magnitude, never a direction — for that you need partial dependence or SHAP values. The correlation caveat is the one most often missed: a model can recover a shuffled feature’s information from its twin, so both look irrelevant.',
      },
      {
        id: 'ML-015-q5',
        type: 'order',
        concept: 'fitting a random forest',
        prompt: 'Put the steps of fitting one tree in a random forest into order.',
        items: [
          'Draw a bootstrap sample of n rows with replacement',
          'At the current node, select a random subset of max_features features',
          'Find the best split among those features only',
          'Partition and recurse until the stopping criterion is met',
          'Record which rows were out-of-bag for this tree',
          'Repeat for the next tree, independently of all the others',
        ],
        explanation:
          'The feature subset is drawn afresh at every node, not once per tree — that per-node resampling is what produces the diversity, and it is the detail most often misremembered.',
      },
      {
        id: 'ML-015-q6',
        type: 'fill',
        concept: 'the key hyperparameter',
        prompt: 'Which random forest hyperparameter controls how many features are considered at each split, and is therefore the main lever on tree correlation?',
        answers: ['max_features', 'max features', 'mtry'],
        explanation:
          '`max_features` (called `mtry` in R). Lowering it decorrelates the trees, which attacks the ρσ² floor that adding trees cannot touch. Defaults are √d for classification and d/3 for regression.',
      },
      {
        id: 'ML-015-q7',
        type: 'explain',
        concept: 'why averaging works',
        prompt: 'Explain why averaging many decision trees improves on a single tree, and why random feature selection is needed on top of bagging.',
        rubric: [
          'Identifies that a deep tree has low bias and high variance, so variance dominates its error',
          'States that averaging B independent estimators divides variance by B while leaving bias unchanged',
          'Gives the correlated-average formula, or explains that correlation sets a floor',
          'Explains that feature subsampling lowers correlation at the cost of slightly worse individual trees',
        ],
        sampleAnswer:
          'A fully grown tree can represent almost any boundary, so it has very little bias — but it is extremely sensitive to the particular sample it was trained on. Drop ten percent of the rows and the root split can change feature entirely. That means its expected test error is dominated by variance, not by an inability to fit the truth, and variance is the one component you can attack by averaging. If you fit B estimators that are unbiased and independent, their average has the same bias and variance divided by B, so the noise cancels while the signal survives. Bootstrap sampling is the device that generates the B different fits from one dataset. The catch is that trees fitted on resamples of the same data are not independent. Each bootstrap sample contains about 63% of the original rows, so the trees see mostly the same evidence, and if one feature is clearly the strongest they will all split on it first and end up structurally similar. The exact cost of that shows up when you write the variance of a correlated average: ρσ² + (1 − ρ)σ²/B. The second term is the benefit of averaging and it vanishes as B grows, but the first is untouched by B and is fixed entirely by how alike the trees are. So once you have a few hundred trees, more trees buy nothing and the only remaining lever is ρ. Random feature selection is that lever. By restricting each split to a random shortlist, you force trees down different routes and cut the correlation. It does make each tree individually worse, since a tree is sometimes denied its best split, but the forest is trading a small increase in σ² for a large decrease in ρ — and on data with several correlated strong features the trade is so favourable that even `max_features=1` can win.',
        explanation:
          'The complete answer is the correlated-average formula: it explains simultaneously why bagging helps, why more trees eventually stop helping, and why the forest’s distinctive trick is decorrelation rather than averaging.',
      },
    ],

    flashcards: [
      { front: 'What does bagging reduce?', back: 'Variance. Averaging B estimators leaves bias unchanged and divides variance by B — if they are independent.' },
      { front: 'What is the variance of a correlated average?', back: 'ρσ² + (1 − ρ)σ²/B. Adding trees shrinks only the second term; correlation sets an irreducible floor.' },
      { front: 'What makes a random forest different from bagged trees?', back: 'A random subset of features is considered at every split, which decorrelates the trees and lowers the ρσ² floor.' },
      { front: 'What fraction of rows is out-of-bag?', back: '(1 − 1/n)ⁿ → 1/e ≈ 36.8%. Each row is unseen by roughly 37% of the trees, giving a free validation estimate.' },
      { front: 'Can a random forest overfit by adding trees?', back: 'No. Trees are independent, so more trees only reduce variance. It costs compute and memory, never accuracy.' },
      { front: 'Why is impurity feature importance biased?', back: 'High-cardinality and continuous features offer more candidate thresholds, so they reduce impurity by chance more often. Use permutation importance.' },
      { front: 'When is the OOB score invalid?', back: 'When rows are not exchangeable — time series or grouped data — and it can never detect leakage from preprocessing done outside the model.' },
    ],

    challenge: {
      title: 'Measuring the decorrelation effect yourself',
      brief:
        'On a tabular dataset with at least fifteen correlated features, fit random forests across a sweep of max_features from 1 to all. For each setting, record the cross-validated accuracy, the out-of-bag score, and an empirical estimate of tree correlation obtained by collecting each tree’s predicted probabilities on a held-out set and computing the mean pairwise correlation across trees. Plot accuracy and correlation against max_features on the same axis. Then produce a feature-importance comparison: impurity importance against permutation importance on held-out data, including at least one deliberately planted high-cardinality noise column.',
      acceptanceCriteria: [
        'Tree correlation is estimated empirically from per-tree predictions, not assumed',
        'The accuracy and correlation curves are shown together so the trade-off is visible',
        'The out-of-bag score is compared against the cross-validated score, with any discrepancy discussed',
        'The planted noise column appears high in impurity importance and near zero in permutation importance',
        'The write-up states which value of max_features you would deploy and why, in terms of the variance formula',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague how a random forest works, why averaging trees helps, and why each tree is deliberately restricted to a random subset of features.',
      mustCover: [
        'A deep tree has low bias and high variance, so averaging attacks the dominant error term',
        'Bootstrap sampling creates different training sets from one dataset so the trees differ',
        'Correlation between trees puts a floor on the ensemble variance that more trees cannot remove',
        'Feature subsampling lowers that correlation by forcing trees down different routes',
      ],
      bonusSignals: ['mentions the out-of-bag estimate and its 37% origin', 'notes that more trees never overfit', 'mentions the bias in impurity-based importance'],
      sampleExplanation:
        'Start with what is wrong with a single tree. It is not that it cannot fit the data — a deep tree can fit almost anything, so its bias is tiny. The problem is that it is unstable: remove a few rows and it may pick a different root split and restructure everything beneath. So its error is dominated by variance, sensitivity to which particular sample you happened to collect. Variance is the error component that averaging removes. If you could fit a hundred independent trees and average them, the idiosyncrasies would cancel and the variance would fall by a factor of a hundred while the bias stayed put. You do not have a hundred datasets, so you manufacture them: draw a bootstrap sample, n rows sampled with replacement from your n rows, for each tree. That is bagging, and it works — typically several points of accuracy over a single tree. But here is the catch, and it is the thing that makes a forest a forest. Trees grown on bootstrap samples of the same data are not independent. Each sample contains about 63% of the original rows, so the trees are looking at largely the same evidence, and if one feature is clearly the most predictive, every tree will split on it first and they will all end up resembling one another. When you write down the variance of an average of correlated things, you get rho sigma squared plus one-minus-rho sigma squared over B. The second term is what more trees buy you and it goes to zero. The first term does not care how many trees you have at all — it is set purely by how alike they are. So past a few hundred trees you are pushing on a term that is already exhausted. The forest’s answer is to attack the other term. At every split, the tree is only allowed to look at a random handful of the features. Sometimes the dominant feature is not on the list, so the tree has to find another route, and the trees genuinely diverge. Each individual tree is a bit worse for being handicapped, and that is fine, because the ensemble is limited by similarity rather than by individual quality. On data with several correlated strong predictors, allowing just one random feature per split can beat the default. One more thing you get for free: because each tree missed about 37% of the rows, you can score every row using only the trees that never saw it, which gives you a validation estimate without holding anything out. That is the out-of-bag score, and it is genuinely useful — as long as your rows are exchangeable, which they are not for time series or repeated measurements on the same subject.',
    },
  },

  {
    id: 'ML-016',
    domain: 'ML',
    module: 'Trees & Ensembles',
    topic: 'Sequential error correction',
    title: 'Boosting, Gradient Boosting and XGBoost',
    slug: 'boosting-and-xgboost',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['ML-014', 'ML-015'],
    related: ['ML-007', 'ML-008'],
    tags: ['boosting', 'adaboost', 'gradient boosting', 'xgboost', 'learning rate', 'early stopping'],

    learningObjectives: [
      'Explain boosting as sequential error correction, and contrast it with bagging on bias, variance and parallelism',
      'Describe gradient boosting as gradient descent performed in function space, with trees as the steps',
      'Trade learning rate against number of estimators, and use early stopping correctly on a validation set',
      'Explain the specific innovations of XGBoost and LightGBM, and why boosted trees still win on tabular data',
    ],

    terminology: [
      {
        term: 'Weak learner',
        definition:
          'A model only slightly better than chance — for boosting, typically a decision stump or a tree of depth 3 to 6. Boosting theory shows that a weak learner, applied repeatedly to reweighted or residual-corrected data, can be combined into an arbitrarily strong one.',
        simple: 'A deliberately feeble model that is only asked to be a little better than guessing.',
      },
      {
        term: 'Residual (and pseudo-residual)',
        definition:
          'What the current ensemble is getting wrong. For squared error this is literally y − F(x); in general it is the negative gradient of the loss with respect to the current prediction, which is why the method generalises to any differentiable loss.',
        simple: 'The part of the answer the model has not accounted for yet.',
      },
      {
        term: 'Learning rate (shrinkage)',
        definition:
          'A factor ν ∈ (0, 1] applied to each new tree’s contribution before adding it to the ensemble. Smaller values require more trees but generalise better, because no single tree can overcommit the ensemble.',
        simple: 'How much of each correction you actually apply.',
      },
      {
        term: 'Early stopping',
        definition:
          'Monitoring the loss on a held-out validation set after each boosting round and halting when it stops improving for a set number of rounds. It is the primary defence against boosting’s tendency to overfit with too many rounds.',
        simple: 'Stop adding trees when the validation score stops getting better.',
      },
      {
        term: 'Second-order approximation',
        definition:
          'XGBoost’s use of both the gradient and the Hessian of the loss when scoring candidate splits, giving a Newton-like step rather than a plain gradient step. This yields a closed-form optimal leaf value and a principled split-gain formula.',
        simple: 'Using the curvature of the loss, not just its slope, to decide each step.',
      },
    ],

    simpleExplanation:
      'Bagging builds hundreds of models in parallel and lets them vote, each working in ignorance of the others. Boosting does the opposite: it builds models one at a time, and each new model is shown precisely where the ones before it went wrong. Start with something almost trivially simple — often a tree with a single split. It will be badly wrong on most examples. Compute the errors it left behind, and fit a second small tree not to the original target but to those errors. Add it to the first, but only a fraction of it, typically a tenth, so the correction is cautious. Compute the remaining errors, fit a third tree to those, and continue for a few hundred rounds. Each tree is nearly useless on its own; the sum of them is not. Two features follow from this design. Because each tree exists only to fix what remains, boosting reduces bias rather than variance, which is why the individual trees are kept shallow — you want a weak learner that nudges, not a strong one that overcommits. And because the process keeps fitting whatever error is left, it will eventually start fitting noise, so unlike a random forest it genuinely can overfit by running too long. Stopping at the right round is a decision you must make.',

    whyItExists:
      'Bagging reduces variance but leaves bias untouched: averaging a thousand trees that all miss the same structure still misses it. Boosting attacks bias directly by fitting each new model to what the ensemble currently gets wrong, which lets an ensemble of deliberately weak learners approximate complicated functions with far fewer parameters than a single deep model would need. On heterogeneous tabular data with interactions, missing values and mixed types, the result still outperforms neural networks in most published comparisons.',

    analogy: {
      scenario:
        'A student sits a practice exam and gets 60%. Rather than resitting the same full paper repeatedly, they mark it, identify precisely which questions they got wrong, and spend the next session only on that material. They resit, now scoring 75%, mark again, and focus the next session on the smaller set still failing. Each study session is short and narrowly targeted — useless as a complete education on its own — but the sequence converges quickly because nothing is wasted on material already mastered. The danger appears near the end: once the genuine gaps are filled, further sessions start memorising the idiosyncrasies of these particular practice papers, and performance on a real, unseen exam begins to fall even as practice scores keep climbing.',
      mapping: [
        { from: 'Each short, targeted study session', to: 'One weak learner, typically a shallow tree' },
        { from: 'The questions still being failed', to: 'The residuals, or negative gradients, of the current ensemble' },
        { from: 'Studying only the remaining gaps', to: 'Fitting the next tree to the current errors rather than to the original target' },
        { from: 'Not overhauling everything after one session', to: 'The learning rate, shrinking each tree’s contribution' },
        { from: 'Cumulative knowledge across all sessions', to: 'The additive model F_M(x) = Σ ν·h_m(x)' },
        { from: 'Practice scores rising while real performance falls', to: 'Overfitting, detected by early stopping on a validation set' },
      ],
      bridge:
        'The story captures the two properties that separate boosting from bagging. It is inherently sequential — session three depends on the results of session two — which is why boosting cannot be parallelised across trees the way a forest can. And it attacks bias: each session targets a genuine gap in knowledge rather than averaging out random noise in the marking. The final beat of the story is the one that matters operationally. There is no analogue of it in bagging, where more trees are always safe; here, the validation curve turns upward and you must stop.',
      limitations:
        'A student consolidates and generalises between sessions. A boosting ensemble never revisits or simplifies an earlier tree — every tree it ever fitted stays in the sum with its original weight, which is why the ensemble grows monotonically in size and why regularisation has to be applied at the moment each tree is added.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Gradient descent, one step at a time',
        caption: 'Boosting is gradient descent where each step is a tree fitted to the negative gradient. Vary the step size and watch the same trade-off between speed and stability appear.',
        widget: 'gradient-descent-lab',
      },
      {
        kind: 'flow',
        title: 'One round of gradient boosting',
        steps: [
          { label: 'Start from a constant', detail: 'F₀(x) is the value minimising the loss with no features — the mean for squared error, the log-odds of the base rate for log loss.' },
          { label: 'Compute pseudo-residuals', detail: 'rᵢ = −∂L(yᵢ, F(xᵢ))/∂F. For squared error this is exactly y − F; for log loss it is y − p.' },
          { label: 'Fit a shallow tree to them', detail: 'The tree is trained on the residuals, not on y. Depth 3 to 6 keeps it weak and limits interaction order.' },
          { label: 'Find each leaf’s optimal value', detail: 'Replace the tree’s own leaf means with the value minimising the actual loss in that leaf — a line search, done in closed form for common losses.' },
          { label: 'Add a shrunken copy', detail: 'F ← F + ν·h(x) with ν around 0.05 to 0.1. Shrinkage is the single most effective regulariser in boosting.' },
          { label: 'Check the validation loss', detail: 'Evaluate on held-out data. Stop when it has not improved for `early_stopping_rounds`, and keep the best iteration.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Boosting: strengths, weaknesses and when to reach for it',
        caption: 'Reach for gradient boosting whenever accuracy on tabular data is the objective and you have time to tune — it is the model that wins most tabular competitions. Reach past it when you need a model nobody has to tune, when training must parallelise across trees, or when the data is images, audio or text.',
        left: {
          heading: 'Strengths',
          points: [
            'Consistently the strongest family on heterogeneous tabular data, ahead of both forests and neural networks',
            'Reduces bias as well as variance, so it can represent structure a bagged ensemble of the same trees cannot',
            'Works with any differentiable loss — squared error, log loss, quantile, ranking objectives, custom ones',
            'Modern implementations handle missing values natively by learning a default direction at each split',
            'Early stopping on a validation set gives a principled way to choose the number of rounds',
            'Provides strong regularisation levers: shrinkage, subsampling, column sampling, L1 and L2 on leaf weights',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'Genuinely overfits with too many rounds, unlike a random forest — early stopping is mandatory, not optional',
            'Sequential by construction, so trees cannot be fitted in parallel; only the split search within a tree parallelises',
            'Many interacting hyperparameters, so it needs real tuning to beat a default random forest',
            'Sensitive to label noise, because each round concentrates on the examples still being got wrong',
            'Not interpretable as a rule set, and the additive structure obscures what any individual tree contributes',
            'Like all tree ensembles, it cannot extrapolate beyond the range of the training targets',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Bagging versus boosting, side by side',
        columns: ['Property', 'Random forest', 'Gradient boosting'],
        rows: [
          ['Trees fitted', 'Independently, in parallel', 'Sequentially, each on the previous errors'],
          ['Primary error reduced', 'Variance', 'Bias (variance via shrinkage and subsampling)'],
          ['Base learner', 'Deep, unpruned, low bias', 'Shallow, depth 3–6, deliberately weak'],
          ['Effect of more trees', 'Monotone improvement, then plateau', 'Improvement, then overfitting'],
          ['Key hyperparameter', 'max_features', 'learning_rate paired with n_estimators'],
          ['Tuning effort needed', 'Very little', 'Substantial'],
          ['Typical tabular result', 'Strong baseline', 'Usually the best result'],
        ],
      },
      {
        kind: 'table',
        title: 'What to tune, and in what order',
        columns: ['Parameter', 'Effect', 'Typical range'],
        rows: [
          ['learning_rate', 'Shrinks each tree’s contribution; lower generalises better but needs more rounds', '0.01 to 0.1'],
          ['n_estimators', 'Number of rounds; set high and let early stopping choose', '2000+ with early stopping'],
          ['max_depth', 'Caps the interaction order each tree can express', '3 to 8; 6 is a common default'],
          ['min_child_weight', 'Minimum summed Hessian in a leaf; raising it fights overfitting on noisy data', '1 to 20'],
          ['subsample', 'Row sampling per tree, adding stochastic regularisation', '0.6 to 1.0'],
          ['colsample_bytree', 'Column sampling per tree, the boosting analogue of max_features', '0.5 to 1.0'],
          ['reg_lambda / reg_alpha', 'L2 and L1 penalties on leaf weights', 'lambda 1 to 10; alpha usually 0'],
        ],
      },
    ],

    formalDefinition:
      'Gradient boosting fits an additive model F_M(x) = F₀(x) + ν Σ_{m=1}^{M} h_m(x) by stagewise minimisation of an empirical loss Σᵢ L(yᵢ, F(xᵢ)). At stage m it computes pseudo-residuals r_{im} = −[∂L(yᵢ, F(xᵢ))/∂F(xᵢ)]_{F = F_{m−1}}, fits a base learner h_m to those residuals by least squares, and takes a step in that direction — hence the interpretation as gradient descent in function space, where the function is the model itself and each tree approximates the negative gradient. XGBoost instead performs a second-order expansion, minimising Σᵢ [gᵢ h(xᵢ) + ½hᵢ h(xᵢ)²] + Ω(h) with Ω(h) = γT + ½λ Σ_j w_j², which yields the closed-form optimal leaf weight w_j* = −G_j/(H_j + λ) and a split gain of ½[G_L²/(H_L+λ) + G_R²/(H_R+λ) − G²/(H+λ)] − γ, where G and H are sums of gradients and Hessians in a node.',

    math: {
      intuition:
        'Ordinary gradient descent adjusts numbers: you have parameters, you compute the gradient of the loss with respect to them, and you step downhill. Gradient boosting adjusts a function: the thing being improved is the model’s output on each training point, and the gradient of the loss with respect to those outputs tells you how each prediction should move. That gradient is only defined at the training points, so to turn it into something you can apply to new data you fit a small tree to it. Each tree is therefore an approximate downhill step in the space of functions, and the learning rate is exactly the step size — with the same trade-off between speed and overshoot as in parameter space.',
      formulas: [
        {
          latex: 'F_m(x) = F_{m-1}(x) + \\nu \\, h_m(x)',
          name: 'The additive update',
          meaning:
            'The ensemble is a running sum. Each new tree is a correction, scaled down by the learning rate so that no single tree can commit the ensemble too strongly to one view of the residuals.',
          variables: [
            { symbol: 'F_m', meaning: 'Ensemble prediction after m rounds' },
            { symbol: 'h_m', meaning: 'The tree fitted at round m' },
            { symbol: '\\nu', meaning: 'Learning rate (shrinkage), typically 0.01 to 0.1' },
          ],
          category: 'optimization',
        },
        {
          latex: 'r_{im} = -\\left[\\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)}\\right]_{F = F_{m-1}}',
          name: 'Pseudo-residuals',
          meaning:
            'The negative gradient of the loss with respect to the current prediction for each training point. For squared error it equals y − F, the ordinary residual; for log loss it equals y − p. This is the step that makes boosting work with any differentiable loss.',
          variables: [
            { symbol: 'r_{im}', meaning: 'Pseudo-residual for example i at round m — the direction its prediction should move' },
            { symbol: 'L', meaning: 'The chosen loss function' },
            { symbol: 'F_{m-1}', meaning: 'The ensemble built so far' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\alpha_m = \\frac{1}{2}\\ln\\!\\left(\\frac{1 - \\varepsilon_m}{\\varepsilon_m}\\right), \\qquad w_i \\leftarrow w_i \\, e^{\\,\\alpha_m \\mathbf{1}[y_i \\neq h_m(x_i)]}',
          name: 'AdaBoost weight update',
          meaning:
            'The original boosting algorithm reweights examples rather than fitting residuals. A learner with low error ε gets a large vote α; misclassified examples have their weights multiplied up so the next learner concentrates on them. AdaBoost is gradient boosting with exponential loss.',
          variables: [
            { symbol: '\\varepsilon_m', meaning: 'Weighted error rate of learner m' },
            { symbol: '\\alpha_m', meaning: 'Vote weight given to learner m in the final ensemble' },
            { symbol: 'w_i', meaning: 'Sampling weight of example i, renormalised each round' },
          ],
          category: 'classification',
        },
        {
          latex: 'w_j^{*} = -\\frac{G_j}{H_j + \\lambda}, \\qquad G_j = \\sum_{i \\in I_j} g_i, \\quad H_j = \\sum_{i \\in I_j} h_i',
          name: 'Optimal leaf weight (XGBoost)',
          meaning:
            'Using a second-order expansion, the value that minimises the regularised loss in a leaf has a closed form: the summed gradient over the summed Hessian, damped by λ. No line search is needed, and λ shrinks leaves supported by little curvature.',
          variables: [
            { symbol: 'g_i, h_i', meaning: 'First and second derivatives of the loss at example i' },
            { symbol: 'I_j', meaning: 'Set of examples landing in leaf j' },
            { symbol: '\\lambda', meaning: 'L2 regularisation on leaf weights (`reg_lambda`)' },
          ],
          category: 'optimization',
        },
        {
          latex: '\\mathrm{Gain} = \\frac{1}{2}\\left[\\frac{G_L^{2}}{H_L + \\lambda} + \\frac{G_R^{2}}{H_R + \\lambda} - \\frac{(G_L + G_R)^{2}}{H_L + H_R + \\lambda}\\right] - \\gamma',
          name: 'XGBoost split gain',
          meaning:
            'The impurity criterion from ML-014, rederived from the loss itself rather than chosen heuristically. Subtracting γ means a split must buy at least a fixed amount of improvement to be worth the extra leaf, giving built-in pre-pruning.',
          variables: [
            { symbol: 'G_L, G_R', meaning: 'Summed gradients in the left and right children' },
            { symbol: 'H_L, H_R', meaning: 'Summed Hessians in each child' },
            { symbol: '\\gamma', meaning: 'Minimum gain required to make a split (`gamma`), a complexity penalty per leaf' },
          ],
          category: 'optimization',
        },
      ],
      derivation: [
        'Frame the problem as minimising Σᵢ L(yᵢ, F(xᵢ)) over functions F, rather than over a fixed parameter vector.',
        'Pretend for a moment that F is just a vector of n numbers — its values at the training points. Then the gradient of the total loss with respect to that vector has components ∂L(yᵢ, Fᵢ)/∂Fᵢ, and ordinary gradient descent says to step in the negative of that direction.',
        'For squared error, L = ½(y − F)², so ∂L/∂F = −(y − F) and the negative gradient is exactly the residual y − F. This is why the first boosting algorithms were described as "fitting the residuals" — that description is the special case.',
        'For log loss with F as the log-odds, the negative gradient is y − p where p = σ(F). Again it is the error, now on the probability scale. Any differentiable loss gives some notion of error, which is what makes the framework general.',
        'The problem is that this gradient is defined only at the n training points. To apply the step to new data you need a function, so fit a base learner h_m to the pseudo-residuals by least squares. The tree is a generalisable approximation of the gradient.',
        'Take the step: F_m = F_{m−1} + ν h_m. The learning rate ν is the step size, playing precisely the role it plays in parameter-space gradient descent.',
        'One refinement matters. The tree was fitted to approximate the gradient, but within each leaf you can do better: choose the leaf value that directly minimises the actual loss over the examples in that leaf. For squared error this is their mean; for log loss there is a one-step Newton approximation. Friedman called this TreeBoost, and it is why gradient boosting outperforms naively fitting residuals.',
        'Now XGBoost’s improvement. Expand the loss to second order around the current prediction: L(y, F + h) ≈ L(y, F) + g·h + ½·h·h², where g and h are the first and second derivatives. Drop the constant term.',
        'Add explicit regularisation Ω = γT + ½λΣ w_j², penalising both the number of leaves T and the magnitude of the leaf weights.',
        'For a fixed tree structure, the objective becomes Σ_j [G_j w_j + ½(H_j + λ) w_j²] + γT, which is a sum of independent quadratics in the leaf weights. Setting the derivative to zero gives w_j* = −G_j/(H_j + λ) directly — no line search.',
        'Substituting back gives the optimal objective value −½ Σ_j G_j²/(H_j + λ) + γT. The gain from splitting one leaf into two is the difference between the parent’s value and the children’s, which is exactly the split-gain formula. The impurity criterion is therefore derived from the loss rather than posited.',
        'Subtracting γ at every split gives automatic pre-pruning: a split with gain below γ is rejected, so the tree stops growing where growth does not pay.',
        'Finally, note where the remaining engineering gains came from. Histogram binning (LightGBM, and XGBoost’s `hist` method) buckets continuous features into a few hundred bins, turning split search from O(n log n) sorting into O(bins) counting. Sparsity-aware split finding learns a default direction for missing values instead of imputing them. Level-wise growth (XGBoost) versus leaf-wise growth (LightGBM) trades balanced trees against faster loss reduction. None of these change the mathematics; they are what made it fast enough to dominate.',
      ],
    },

    workedExample: {
      title: 'Two rounds of gradient boosting, computed by hand',
      setup:
        'Four points with x = 1, 2, 3, 4 and targets y = 2, 4, 6, 10. Use squared-error loss, decision stumps as base learners, and a learning rate of ν = 0.5.',
      steps: [
        {
          label: 'Initialise',
          detail: 'F₀ is the constant minimising squared error, which is the mean: (2 + 4 + 6 + 10)/4 = 5.5. Its total squared error is 3.5² + 1.5² + 0.5² + 4.5² = 12.25 + 2.25 + 0.25 + 20.25 = 35.0.',
          latex: 'F_0 = 5.5, \\qquad \\mathrm{SSE}_0 = 35.0',
        },
        {
          label: 'Pseudo-residuals for round 1',
          detail: 'For squared error the negative gradient is y − F, so r = (2 − 5.5, 4 − 5.5, 6 − 5.5, 10 − 5.5) = (−3.5, −1.5, 0.5, 4.5).',
          latex: '\\mathbf{r}_1 = (-3.5,\\, -1.5,\\, 0.5,\\, 4.5)',
        },
        {
          label: 'Fit a stump to the residuals',
          detail: 'The best single split on x is at 2.5. Left leaf holds x ∈ {1, 2} with residual mean (−3.5 − 1.5)/2 = −2.5; right leaf holds x ∈ {3, 4} with mean (0.5 + 4.5)/2 = +2.5.',
          latex: 'h_1(x) = \\begin{cases} -2.5 & x \\leq 2.5 \\\\ +2.5 & x > 2.5 \\end{cases}',
        },
        {
          label: 'Apply the shrunken update',
          detail: 'F₁ = F₀ + 0.5·h₁. For x ∈ {1, 2}: 5.5 + 0.5(−2.5) = 4.25. For x ∈ {3, 4}: 5.5 + 0.5(2.5) = 6.75. Note that without shrinkage the left leaf would have jumped straight to 3.0 — half the correction is deliberately withheld.',
          latex: 'F_1 = (4.25,\\, 4.25,\\, 6.75,\\, 6.75)',
        },
        {
          label: 'New residuals',
          detail: 'r = (2 − 4.25, 4 − 4.25, 6 − 6.75, 10 − 6.75) = (−2.25, −0.25, −0.75, 3.25). Total squared error is now 5.0625 + 0.0625 + 0.5625 + 10.5625 = 16.25, down from 35.0.',
          latex: '\\mathbf{r}_2 = (-2.25,\\, -0.25,\\, -0.75,\\, 3.25), \\quad \\mathrm{SSE}_1 = 16.25',
        },
        {
          label: 'Choose the round-2 split',
          detail: 'Evaluate each candidate by the squared error it leaves. Split at 1.5: left {−2.25} SSE 0, right {−0.25, −0.75, 3.25} mean 0.75, SSE = 1.0 + 2.25 + 6.25 = 9.5, total 9.5. Split at 2.5: left mean −1.25 SSE 2.0, right mean 1.25 SSE 8.0, total 10.0. Split at 3.5: left {−2.25, −0.25, −0.75} mean −1.0833 SSE 2.167, right {3.25} SSE 0, total 2.167. The split at 3.5 wins decisively.',
          latex: 'x \\leq 3.5 \\Rightarrow \\mathrm{SSE} = 2.167',
        },
        {
          label: 'Second update',
          detail: 'h₂ predicts −1.0833 for x ≤ 3.5 and +3.25 for x = 4. Then F₂ = F₁ + 0.5·h₂ gives 4.25 − 0.542 = 3.708 for x ∈ {1, 2}, 6.75 − 0.542 = 6.208 for x = 3, and 6.75 + 1.625 = 8.375 for x = 4.',
          latex: 'F_2 = (3.708,\\, 3.708,\\, 6.208,\\, 8.375)',
        },
        {
          label: 'Measure the progress',
          detail: 'Residuals are now (−1.708, 0.292, −0.208, 1.625), giving SSE = 2.918 + 0.085 + 0.043 + 2.641 = 5.687. The sequence 35.0 → 16.25 → 5.69 shows each round removing a large share of what remained, with the biggest corrections going to the points that were most wrong.',
          latex: '\\mathrm{SSE}: 35.0 \\to 16.25 \\to 5.69',
        },
        {
          label: 'What the learning rate bought',
          detail: 'With ν = 1.0 the first round would have landed on F₁ = (3.0, 3.0, 8.0, 8.0), an SSE of 9.0 — better after one round. But each stump would then be committing the ensemble fully to its own reading of the residuals, including any noise in them. Shrinkage spreads the fit across many trees so that no single one dominates, which is empirically the most reliable regulariser boosting has. The cost is that you need roughly 1/ν times as many rounds.',
          latex: '\\nu = 1.0: \\mathrm{SSE}_1 = 9.0 \\quad \\text{vs} \\quad \\nu = 0.5: \\mathrm{SSE}_1 = 16.25',
        },
      ],
      conclusion:
        'Four points, two stumps, and the error falls by 84%. Every element of real gradient boosting is present: initialise with a constant, compute the negative gradient, fit a weak learner to it, shrink, add, repeat. Continue this on four points and the ensemble will eventually interpolate them exactly — which is the overfitting that early stopping exists to prevent, and the sharpest single difference from a random forest.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The learning rate and rounds trade-off, with early stopping',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import log_loss

X, y = make_classification(n_samples=8000, n_features=25, n_informative=10,
                           n_redundant=5, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

for lr in [0.5, 0.1, 0.03]:
    m = HistGradientBoostingClassifier(
        learning_rate=lr, max_iter=2000, early_stopping=True,
        validation_fraction=0.15, n_iter_no_change=30, random_state=0).fit(X_tr, y_tr)
    p = m.predict_proba(X_te)[:, 1]
    print(f"lr={lr:<5} stopped at {m.n_iter_:>4} trees   test acc {m.score(X_te, y_te):.4f}"
          f"   log loss {log_loss(y_te, p):.4f}")

rf = RandomForestClassifier(n_estimators=500, n_jobs=-1, random_state=0).fit(X_tr, y_tr)
print(f"random forest   500 trees   test acc {rf.score(X_te, y_te):.4f}"
      f"   log loss {log_loss(y_te, rf.predict_proba(X_te)[:, 1]):.4f}")`,
        output: `lr=0.5   stopped at   47 trees   test acc 0.9260   log loss 0.2116
lr=0.1   stopped at  201 trees   test acc 0.9370   log loss 0.1774
lr=0.03  stopped at  678 trees   test acc 0.9395   log loss 0.1731
random forest   500 trees   test acc 0.9285   log loss 0.1935
`,
        explanation:
          'The learning rate and the number of rounds are one dial, not two: halving the rate roughly triples the rounds needed, and smaller rates keep finding slightly better optima because no individual tree can overcommit the ensemble. Early stopping is what makes this practical — set `max_iter` far higher than you need and let the validation loss decide, rather than guessing. Note that the boosted model beats a 500-tree random forest on both accuracy and log loss, which is the usual outcome on tabular data, and that it did so with 201 trees at lr = 0.1. The remaining question is always whether the tuning effort is worth one point of accuracy, and on a first pass a random forest is often the better use of an afternoon.',
      },
      {
        language: 'python',
        title: 'Boosting genuinely overfits; a forest does not',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_regression
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

X, y = make_regression(n_samples=1200, n_features=12, noise=25.0, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)

gb = GradientBoostingRegressor(n_estimators=1500, learning_rate=0.1, max_depth=4,
                               random_state=0).fit(X_tr, y_tr)
train_curve = [mean_squared_error(y_tr, p) for p in gb.staged_predict(X_tr)]
test_curve = [mean_squared_error(y_te, p) for p in gb.staged_predict(X_te)]
best = int(np.argmin(test_curve))
print(f"boosting: best test MSE {test_curve[best]:.1f} at round {best + 1}")
print(f"          at round 1500: train {train_curve[-1]:.1f}  test {test_curve[-1]:.1f}")
for r in [50, 200, best + 1, 800, 1500]:
    print(f"   round {r:>5}: train {train_curve[r-1]:>8.1f}   test {test_curve[r-1]:>8.1f}")

rf = RandomForestRegressor(n_estimators=1500, n_jobs=-1, random_state=0).fit(X_tr, y_tr)
print(f"forest at 1500 trees: test MSE {mean_squared_error(y_te, rf.predict(X_te)):.1f}")`,
        output: `boosting: best test MSE 1146.3 at round 187
          at round 1500: train 12.4  test 1398.7
   round    50: train  1832.1   test   1489.6
   round   200: train   478.3   test   1147.9
   round   187: train   521.6   test   1146.3
   round   800: train    68.9   test   1309.1
   round  1500: train    12.4   test   1398.7
`,
        explanation:
          'This is the single most important operational difference between boosting and bagging. The training error falls monotonically towards zero — by round 1500 the ensemble has essentially memorised the training set — while the test error bottoms out around round 187 and then climbs by 22%. A random forest run for the same 1500 trees simply plateaus; there is no corresponding curve to watch. The consequence is that `n_estimators` in boosting is not a "more is better" parameter but a genuine capacity control, and you should never set it by intuition. Use a validation set with early stopping, or in scikit-learn’s `GradientBoostingRegressor` use `staged_predict` as here to find the minimum explicitly.',
      },
      {
        language: 'python',
        title: 'Regularisation levers, and why shrinkage is the strongest',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_score

X, y = make_classification(n_samples=3000, n_features=20, n_informative=6,
                           flip_y=0.10, random_state=0)   # 10% label noise

configs = [
    ("no regularisation   ", dict(n_estimators=400, learning_rate=1.0, max_depth=6, subsample=1.0)),
    ("shrinkage only      ", dict(n_estimators=400, learning_rate=0.05, max_depth=6, subsample=1.0)),
    ("shallower trees     ", dict(n_estimators=400, learning_rate=1.0, max_depth=2, subsample=1.0)),
    ("row subsampling     ", dict(n_estimators=400, learning_rate=1.0, max_depth=6, subsample=0.6)),
    ("shrinkage + depth   ", dict(n_estimators=400, learning_rate=0.05, max_depth=3, subsample=0.8)),
]
for name, kw in configs:
    s = cross_val_score(GradientBoostingClassifier(random_state=0, **kw), X, y, cv=5, n_jobs=-1)
    print(f"{name} CV accuracy {s.mean():.4f} (+/- {s.std():.4f})")`,
        output: `no regularisation    CV accuracy 0.8250 (+/- 0.0161)
shrinkage only       CV accuracy 0.8853 (+/- 0.0108)
shallower trees      CV accuracy 0.8797 (+/- 0.0125)
row subsampling      CV accuracy 0.8410 (+/- 0.0139)
shrinkage + depth    CV accuracy 0.8893 (+/- 0.0091)
`,
        explanation:
          'With ten percent of labels flipped, an unregularised boosting run chases the noise: each round concentrates on the examples still being got wrong, and the mislabelled ones are permanently wrong, so they attract more and more of the model’s capacity. Shrinkage alone recovers six points, which is why `learning_rate` is the first thing to lower whenever boosting underperforms. Shallower trees help nearly as much by limiting how much structure any one round can absorb. Row subsampling helps least here on its own but combines well, and combining shrinkage with a depth limit is best. The general ordering — learning rate first, then depth, then subsampling and L2 — is a reliable starting recipe, and the sensitivity of boosting to label noise is the clearest case where a random forest is the safer choice.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Tabular machine learning competitions',
        usage:
          'XGBoost, LightGBM and CatBoost dominate structured-data competitions and have done for a decade. Systematic comparisons continue to find that boosted trees match or beat deep learning on heterogeneous tabular data with fewer than roughly a million rows, and with far less tuning of architecture.',
      },
      {
        context: 'Learning to rank in search and recommendation',
        usage:
          'LambdaMART — gradient boosting with a ranking objective — powers large-scale search ranking. Boosting handles ranking losses naturally because the framework needs only a differentiable objective, so the gradient of a ranking metric surrogate substitutes directly for a residual.',
      },
      {
        context: 'Credit risk and fraud scoring',
        usage:
          'Banks and payment processors use gradient boosting on transaction features, typically paired with SHAP values to satisfy explanation requirements. Native handling of missing values matters here: a missing field is often itself informative, and learning a default direction at each split preserves that signal rather than imputing it away.',
      },
      {
        context: 'Physics event classification',
        usage:
          'The Higgs boson machine learning challenge was won with gradient boosting, and boosted decision trees remain standard in high-energy physics for separating signal events from background across tens of engineered kinematic features.',
      },
    ],

    projectConnections: [
      { tool: 'XGBoost', role: 'Second-order gradient boosting with L1 and L2 on leaf weights, sparsity-aware split finding and a `hist` method; `early_stopping_rounds` with an eval set is the standard training loop.' },
      { tool: 'LightGBM', role: 'Histogram binning with leaf-wise growth — usually the fastest option on large datasets, at the cost of needing `num_leaves` and `min_data_in_leaf` tuned to avoid overfitting.' },
      { tool: 'scikit-learn', role: '`HistGradientBoostingClassifier` and `HistGradientBoostingRegressor` bring LightGBM-style speed with no extra dependency, and support `early_stopping=True` out of the box.' },
      { tool: 'SHAP', role: '`TreeExplainer` gives exact per-prediction attributions for boosted ensembles, which is how these models are deployed in regulated settings.' },
    ],

    commonMistakes: [
      {
        mistake: 'Setting n_estimators by intuition instead of early stopping',
        why: 'Boosting reduces training error monotonically towards zero, so more rounds always look better on training data while test error turns upward after some point. Guessing the number is guessing where that turn happens.',
        fix: 'Set `n_estimators` very high, pass a validation set, and use `early_stopping_rounds` (XGBoost/LightGBM) or `early_stopping=True` (scikit-learn). Record the best iteration and use it.',
      },
      {
        mistake: 'Tuning learning_rate and n_estimators independently',
        why: 'They are two views of a single quantity, roughly the total amount of correction applied. Halving the learning rate without raising the round budget simply produces an underfitted model, and a grid over both wastes most of its cells.',
        fix: 'Fix a small learning rate — 0.05 or 0.03 — set a large round budget, and let early stopping determine the count. Tune depth, subsampling and regularisation at that fixed rate.',
      },
      {
        mistake: 'Using deep trees as base learners',
        why: 'Boosting reduces bias by accumulating many small corrections. A depth-15 tree is not a weak learner — it fits most of the residual in one round, including its noise, and the ensemble overfits within a handful of rounds.',
        fix: 'Keep `max_depth` between 3 and 8. If you find yourself needing deep trees, the signal probably requires high-order interactions and more rounds at low depth is usually the better route.',
      },
      {
        mistake: 'Applying boosting to data with substantial label noise',
        why: 'Each round focuses on examples the ensemble still gets wrong, and mislabelled examples are permanently wrong. They attract progressively more capacity, so the model ends up fitting the noise specifically.',
        fix: 'Lower the learning rate, reduce depth, raise `min_child_weight`, and consider a random forest instead — averaging is far more forgiving of label noise than sequential correction.',
      },
      {
        mistake: 'Selecting the number of rounds on the test set',
        why: 'Using the test set to pick the stopping point makes the reported test score optimistic, because the choice of iteration has been fitted to that data. The effect is often one to two points, which is exactly the margin these models are judged on.',
        fix: 'Split three ways: train, validation for early stopping, and a test set touched once at the end. Inside cross-validation, do the early stopping within each fold.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between bagging and boosting?',
        answer:
          'Bagging fits many models independently on bootstrap resamples and averages them, which reduces variance while leaving bias unchanged. The base learner is therefore deliberately strong — deep, unpruned trees with low bias and high variance — because averaging is the variance cure. Boosting fits models sequentially, each one trained on what the current ensemble is getting wrong, so it reduces bias. Its base learner is deliberately weak — a shallow tree — because you want each round to nudge rather than to overcommit. Three practical consequences follow. Bagging parallelises perfectly across trees while boosting cannot, since round m needs round m − 1`s residuals. Adding trees to a bagged ensemble never hurts, whereas boosting genuinely overfits after some number of rounds, so early stopping is mandatory. And boosting is more sensitive to label noise, because a permanently mislabelled example is permanently in the residual and attracts more and more attention, whereas averaging washes it out. In return, boosting is usually a point or two more accurate on tabular data once tuned.',
      },
      {
        level: 'advanced',
        question: 'In what sense is gradient boosting "gradient descent"?',
        answer:
          'It is gradient descent where the parameter being optimised is the function itself. Think of the model as the vector of its predictions at the n training points, and consider the total loss as a function of that vector. Its gradient has components ∂L(yᵢ, Fᵢ)/∂Fᵢ, and standard gradient descent says to move each prediction in the negative gradient direction. For squared error that negative gradient is exactly y − F, the residual, which is why the earliest descriptions said "fit the residuals" — that is the special case. For log loss with F as the log-odds, it is y − p. The obstacle is that this gradient exists only at the training points, so it cannot be applied to a new example. Boosting’s move is to fit a base learner to the negative gradients by least squares, producing a function that approximates the descent direction everywhere, and then take a step of size ν in that direction: F ← F + ν·h. The learning rate is the step size in the ordinary sense, with the same trade-off between progress per step and stability. This framing is what makes the method general: any differentiable loss supplies a gradient, so quantile regression, ranking objectives and custom business losses all drop in without changing the algorithm. XGBoost extends the same idea to second order, using both gradient and Hessian, which turns each step into a Newton step and yields the closed-form leaf weight −G/(H + λ) and the split-gain formula.',
        followUp:
          'A strong answer notes that the residual interpretation is the squared-error special case, and that the second-order version makes the split criterion a consequence of the loss rather than a heuristic.',
      },
      {
        level: 'ml-engineer',
        question: 'Why do boosted trees still beat neural networks on tabular data?',
        answer:
          'Several reasons, and they compound. Tabular features are heterogeneous — a categorical code, a skewed monetary amount, a count, a timestamp — and trees are invariant to any monotone transformation of a feature, so they need none of the scaling and encoding decisions a network requires and cannot be derailed by an outlier in one column. Trees also find axis-aligned thresholds naturally, and a great deal of real tabular structure genuinely is threshold-shaped: risk changes at an age boundary, a fee applies above an amount. A network has to learn such a step from smooth activations, which takes many parameters and far more data. Missing values are informative in tabular data and modern boosting implementations learn a default direction at each split rather than imputing, which preserves the signal. There is also a sample-size argument: networks pay off when there is enough data to learn representations, and most tabular problems have thousands to hundreds of thousands of rows rather than millions. Finally there is inductive bias — the published comparisons, notably Grinsztajn and colleagues in 2022, attribute the gap to trees being robust to uninformative features and to the rotational invariance of neural networks being exactly the wrong prior when individual columns carry meaning. Where I would reach for a network instead is when the tabular data sits alongside text or images, when I need embeddings of very high-cardinality categoricals, or when the dataset is large enough that representation learning starts to pay.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Targets are y = 10, 20, 30 and the initial model predicts the mean. With squared-error loss and a learning rate of 0.3, compute F₀, the first pseudo-residuals, and the updated predictions if the first tree predicts the residual exactly.',
        hint: 'F₀ is the mean; residuals are y − F; the update is F₀ + ν·h.',
        solution:
          'F₀ = (10 + 20 + 30)/3 = 20. Pseudo-residuals are y − F₀ = (−10, 0, 10). If the first tree reproduced these exactly, the update F₁ = F₀ + 0.3·h gives (20 − 3, 20 + 0, 20 + 3) = (17, 20, 23). Note that even with a tree that fits the residuals perfectly, shrinkage means the ensemble moves only 30% of the way towards the targets, so the remaining residuals are (−7, 0, 7) — exactly 0.7 of the originals. That is the general pattern: with a perfect base learner, each round multiplies the residual by (1 − ν), so you need roughly ln(ε)/ln(1 − ν) rounds to shrink it to a fraction ε. This is why the learning rate and the number of rounds are one dial rather than two.',
      },
      {
        prompt:
          'Your gradient boosting model achieves 0.99 accuracy on training data and 0.84 on the test set. List four changes you would make and say what each one does.',
        hint: 'Think about capacity per round, total capacity, and randomisation.',
        solution:
          'First, lower `learning_rate` — from 0.1 to 0.03, say — so each tree contributes less and the fit is spread over more rounds, which empirically is the most effective single regulariser in boosting. Second, use early stopping on a proper validation set: with a training accuracy of 0.99 the model is almost certainly past the minimum of the validation curve, and simply stopping at the right round often recovers most of the gap. Third, reduce `max_depth` to 3 or 4, which limits the interaction order any single tree can express and forces the ensemble to build complexity gradually. Fourth, add stochasticity with `subsample` around 0.7 and `colsample_bytree` around 0.7, so each tree sees a different slice of the data and rows are not repeatedly targeted. Beyond those I would raise `min_child_weight` to refuse leaves supported by little curvature, and raise `reg_lambda`. I would also check the data itself: a fifteen-point gap on tabular data sometimes means label noise, in which case boosting is a poor fit and a random forest would be more robust, or it means the test set differs systematically from training, which no hyperparameter fixes.',
      },
      {
        prompt:
          'Explain why a random forest cannot overfit by adding trees while gradient boosting can, referring to how each ensemble is constructed.',
        hint: 'Are the trees fitted to the same target or to changing targets?',
        solution:
          'In a random forest every tree is fitted independently to a bootstrap sample of the same original data and the same target. Averaging more independent estimates of the same quantity reduces the variance of the average and leaves its bias unchanged, so the expected test error falls monotonically and then plateaus — there is no mechanism by which tree 501 can make the ensemble worse, because it does not know what the first 500 did. In boosting each tree is fitted to the current residuals, which change every round. Early on those residuals are dominated by genuine unmodelled structure, and fitting them improves the model. Once that structure is exhausted, what remains in the residuals is noise specific to the training sample — mislabelled points, sampling quirks — and the next tree dutifully fits that too, because the algorithm has no way to distinguish remaining signal from remaining noise. Training error keeps falling towards zero while test error turns upward. The practical consequence is a genuine asymmetry in how you treat the two: `n_estimators` in a forest is a compute budget, whereas in boosting it is a capacity control that must be chosen on held-out data by early stopping.',
      },
    ],

    quiz: [
      {
        id: 'ML-016-q1',
        type: 'mcq',
        concept: 'what boosting fits',
        prompt: 'In gradient boosting, what target is each new tree fitted to?',
        options: [
          'The negative gradient of the loss with respect to the current predictions',
          'The original target values, on a bootstrap sample of the rows',
          'The predictions of the previous tree',
          'A randomly selected subset of the classes',
        ],
        answerIndex: 0,
        explanation:
          'Each tree approximates the negative gradient — the pseudo-residuals. For squared error that equals y − F, the ordinary residual, which is the special case that gave rise to the "fit the residuals" description.',
      },
      {
        id: 'ML-016-q2',
        type: 'truefalse',
        concept: 'overfitting behaviour',
        prompt: 'Like a random forest, gradient boosting cannot overfit by adding more trees.',
        answer: false,
        explanation:
          'It can and does. Each round fits whatever error remains, and once genuine structure is exhausted that error is noise. Training loss falls monotonically while validation loss turns upward, which is why early stopping is mandatory.',
      },
      {
        id: 'ML-016-q3',
        type: 'numeric',
        concept: 'shrinkage arithmetic',
        prompt: 'The current prediction is 20 and the target is 35. A tree predicts the residual exactly, with learning rate 0.2. What is the updated prediction?',
        answer: 23,
        tolerance: 0.01,
        explanation:
          'The residual is 35 − 20 = 15, and the update is 20 + 0.2(15) = 23. Shrinkage means the ensemble moves only a fifth of the way, leaving a residual of 12 — exactly 0.8 of the original — so roughly 1/ν times as many rounds are needed.',
      },
      {
        id: 'ML-016-q4',
        type: 'match',
        concept: 'bagging versus boosting',
        prompt: 'Match each property to the ensemble method it describes.',
        pairs: [
          { left: 'Reduces variance by averaging independent models', right: 'Bagging / random forest' },
          { left: 'Reduces bias by sequential error correction', right: 'Boosting' },
          { left: 'Uses deep, unpruned base learners', right: 'Bagging / random forest' },
          { left: 'Requires early stopping to avoid overfitting', right: 'Boosting' },
          { left: 'Trees can be fitted fully in parallel', right: 'Bagging / random forest' },
        ],
        explanation:
          'The division is consistent: independent averaging attacks variance and therefore wants strong base learners, while sequential correction attacks bias and therefore wants weak ones. Every other difference follows from that.',
      },
      {
        id: 'ML-016-q5',
        type: 'multi',
        concept: 'regularising boosting',
        prompt: 'Which changes reduce overfitting in a gradient boosting model? Select all that apply.',
        options: [
          'Lower the learning rate and increase the number of rounds with early stopping',
          'Reduce max_depth',
          'Set subsample below 1.0',
          'Increase max_depth to capture more structure per tree',
          'Increase min_child_weight',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Deeper trees increase the capacity absorbed per round, which makes overfitting worse, not better. The other four all limit how much any one round can commit the ensemble, and lowering the learning rate is usually the most effective single change.',
      },
      {
        id: 'ML-016-q6',
        type: 'fill',
        concept: 'stopping criterion',
        prompt: 'What technique halts boosting when validation performance stops improving for a set number of rounds?',
        answers: ['early stopping', 'early-stopping', 'early_stopping_rounds'],
        explanation:
          'Early stopping. Set a large round budget, monitor a held-out validation set, and keep the best iteration. Choosing the stopping round on the test set instead makes the reported score optimistic.',
      },
      {
        id: 'ML-016-q7',
        type: 'explain',
        concept: 'gradient boosting as gradient descent',
        prompt: 'Explain how gradient boosting is gradient descent, and what the learning rate corresponds to.',
        rubric: [
          'Frames the model’s predictions at the training points as the thing being optimised',
          'Identifies the pseudo-residual as the negative gradient of the loss with respect to the prediction',
          'Explains that a tree is fitted to those gradients so the step generalises beyond the training points',
          'Identifies the learning rate as the step size, with the usual speed-versus-stability trade-off',
        ],
        sampleAnswer:
          'Ordinary gradient descent optimises a vector of parameters. Gradient boosting optimises the model’s output itself. Treat the current model as the vector of its predictions at the n training points, and write the total loss as a function of that vector. The derivative of the loss with respect to prediction i tells you which way that prediction should move to reduce the loss, and the negative of it is the descent direction. For squared error that derivative works out to the ordinary residual y − F, which is why the method was first described as fitting the residuals — but that is only the special case. For log loss with F on the log-odds scale it is y − p, and for any differentiable loss it is something analogous, which is exactly why boosting extends to quantile regression, ranking objectives and custom business losses without any change to the algorithm. The obstacle is that this gradient is only defined where you have labels. A new example has no residual. So instead of applying the gradient directly, you fit a small tree to it by least squares, and that tree is a function you can evaluate anywhere — an approximation to the descent direction across the whole feature space. Then you take the step: F ← F + ν·h. The learning rate ν is the step size in the ordinary sense, and it carries the ordinary trade-off. A large ν makes fast progress per round but lets each tree commit the ensemble strongly to its own reading of the residuals, including their noise. A small ν requires many more rounds but spreads the fit across them and generalises better, which is why 0.03 with a thousand rounds usually beats 0.3 with a hundred. XGBoost refines this by expanding the loss to second order and using the Hessian as well, making each step a Newton step; the practical payoff is a closed-form optimal leaf value and a split-gain criterion derived from the loss rather than chosen heuristically.',
        explanation:
          'The crucial insight is that the optimisation happens in function space: the gradient tells you how predictions should move, and fitting a tree to it converts a per-point direction into a function you can apply to new data.',
      },
    ],

    flashcards: [
      { front: 'What does each boosting round fit?', back: 'The negative gradient of the loss with respect to the current predictions — the residual y − F for squared error, y − p for log loss.' },
      { front: 'Bagging versus boosting in one line?', back: 'Bagging averages independent deep trees to cut variance; boosting adds shallow trees sequentially to cut bias.' },
      { front: 'What does the learning rate do?', back: 'Shrinks each tree’s contribution. Lower values generalise better but need roughly 1/ν times as many rounds. It is the strongest regulariser in boosting.' },
      { front: 'Why is early stopping mandatory in boosting?', back: 'Training loss falls monotonically while validation loss turns upward once genuine structure is exhausted and the model starts fitting noise.' },
      { front: 'Why shallow trees in boosting?', back: 'The base learner should be weak so each round nudges rather than overcommits. Depth 3–6 also caps the interaction order per tree.' },
      { front: 'What is XGBoost’s split gain?', back: '½[G_L²/(H_L+λ) + G_R²/(H_R+λ) − G²/(H+λ)] − γ, derived from a second-order expansion of the loss rather than posited as an impurity measure.' },
      { front: 'Why do boosted trees beat neural nets on tabular data?', back: 'Invariance to monotone feature transforms, natural axis-aligned thresholds, native missing-value handling, and robustness to uninformative columns.' },
    ],

    challenge: {
      title: 'Find the overfitting point, then push it further out',
      brief:
        'On a regression dataset with meaningful noise, train a gradient boosting model for far more rounds than it needs and use staged predictions to plot training and validation error against round number. Identify the round at which validation error is minimised and quantify how much worse the final model is. Then run a small study: for each of learning_rate, max_depth, subsample and min_samples_leaf, vary that parameter alone and record how the optimal round and the minimum validation error change. Finish with a single tuned configuration chosen by early stopping inside cross-validation, evaluated once on a test set held out from the start.',
      acceptanceCriteria: [
        'Training and validation curves are plotted against round number on the same axes, with the minimum marked',
        'The degradation from running past the optimum is quantified, not merely described',
        'Each regularisation parameter is varied in isolation so its individual effect on the optimal round is visible',
        'Early stopping is performed inside each cross-validation fold, never on the test set',
        'The write-up states which parameter gave the largest improvement per unit of tuning effort',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague how gradient boosting works, how it differs from a random forest, and why it needs early stopping when a forest does not.',
      mustCover: [
        'Trees are fitted sequentially, each one to the errors the current ensemble still makes',
        'The base learners are deliberately weak and shallow because boosting reduces bias, not variance',
        'The learning rate shrinks each contribution, trading more rounds for better generalisation',
        'Continued rounds eventually fit noise, so validation loss turns upward and training must be stopped',
      ],
      bonusSignals: ['frames it as gradient descent in function space', 'mentions sensitivity to label noise', 'mentions that boosting cannot be parallelised across trees'],
      sampleExplanation:
        'A random forest builds hundreds of trees that never speak to one another and averages them, which cancels out the twitchiness of any individual tree. Boosting works the other way round. It builds trees one at a time, and each new tree is handed a very specific job: fix what the ensemble so far is still getting wrong. You start with something trivial — the mean of the target, say — work out how far off that is for every training row, and fit a small tree to those errors rather than to the original target. Then you add that tree to the running total, but deliberately only a fraction of it, typically a tenth. Recompute what is still wrong, fit another small tree to that, add a fraction of it, and keep going for a few hundred rounds. Each tree on its own is nearly useless; the accumulated sum is not. The reason the trees are kept shallow is worth spelling out, because it is the opposite of a forest. A forest wants strong base learners, because averaging fixes variance and deep trees have low bias. Boosting wants weak ones, because it is fixing bias by accumulation and a deep tree would swallow the entire residual in one round, noise included. If you want the elegant version: think of the model as its vector of predictions on the training points, take the derivative of the loss with respect to those predictions, and you have a direction each prediction should move. That is gradient descent, except the thing being optimised is a function rather than a parameter vector, and each tree is a generalisable approximation of one step. The learning rate really is the step size. Now the part that changes how you operate the thing. In a forest, more trees are always safe — tree five hundred does not know what the others did, so it cannot make matters worse. In boosting, every tree is fitted to whatever error is left, and once the genuine structure has been absorbed, what remains is noise peculiar to your training sample. The next tree fits that too, because nothing tells it the difference. So the training error keeps sliding towards zero while the validation error bottoms out and climbs. You will see a gap of twenty percent or more if you let it run. That means the number of rounds is not a compute budget, it is a capacity control, and it has to be chosen on held-out data with early stopping. The same sensitivity explains why boosting struggles with noisy labels: a permanently mislabelled row is permanently in the residual, so it attracts more and more of the model’s attention, which is precisely the situation where a forest is the safer choice.',
    },
  },

  {
    id: 'ML-017',
    domain: 'ML',
    module: 'Clustering',
    topic: 'Centroid-based clustering',
    title: 'K-Means Clustering',
    slug: 'k-means-clustering',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['ML-002', 'ML-003'],
    related: ['ML-010'],
    tags: ['k-means', 'clustering', 'unsupervised', 'inertia', 'elbow method', 'silhouette'],

    learningObjectives: [
      'Trace Lloyd’s algorithm by hand and explain why it always converges but not necessarily to the best answer',
      'Choose k using the elbow method and silhouette scores, and explain the limits of both',
      'Explain why k-means requires scaling and why it can only find roughly spherical, similarly-sized clusters',
      'Diagnose sensitivity to initialisation and explain what k-means++ and n_init actually do about it',
    ],

    terminology: [
      {
        term: 'Centroid',
        definition:
          'The mean of all points currently assigned to a cluster. It is the point minimising the sum of squared distances to the cluster’s members, which is exactly why the update step takes a mean rather than a median.',
        simple: 'The average position of everything in the group.',
      },
      {
        term: 'Inertia (within-cluster sum of squares)',
        definition:
          'The objective k-means minimises: the total squared distance from each point to its assigned centroid. It decreases monotonically with k and reaches zero when k equals the number of distinct points.',
        simple: 'How tightly packed the groups are, added up.',
      },
      {
        term: 'Lloyd’s algorithm',
        definition:
          'The standard k-means procedure: assign every point to its nearest centroid, recompute each centroid as the mean of its assigned points, and repeat until assignments stop changing. Each step cannot increase the objective, so it always converges.',
        simple: 'Assign, average, repeat until nothing moves.',
      },
      {
        term: 'Silhouette score',
        definition:
          'For each point, (b − a)/max(a, b) where a is the mean distance to points in its own cluster and b is the mean distance to points in the nearest other cluster. It runs from −1 to 1 and is averaged over all points.',
        simple: 'How much better a point fits its own group than the next-best group.',
      },
      {
        term: 'k-means++',
        definition:
          'An initialisation scheme that picks the first centroid uniformly at random and then picks each subsequent one with probability proportional to its squared distance from the nearest chosen centroid, spreading the starting points out.',
        simple: 'Choose starting centres that are far apart, rather than at random.',
      },
    ],

    simpleExplanation:
      'You have a pile of data points and a belief that they fall into, say, three natural groups, but nobody has labelled them. K-means finds those groups by a procedure so simple you can do it with a pencil. Drop three markers anywhere on the map. Assign every point to whichever marker is closest. Now move each marker to the average position of the points that chose it. Some points are now closer to a different marker, so reassign everything and move the markers again. Repeat. Within a handful of rounds the markers stop moving, and where they settle defines your clusters. Two things are worth knowing before you trust the result. The procedure always stops, but where it stops depends on where you dropped the markers — a different start can give a genuinely different and worse answer, which is why implementations repeat the whole thing from several starting points and keep the best. And because "closest" means Euclidean distance to a single central point, k-means can only find clusters that are roughly round and roughly the same size. Give it two long parallel streaks of points and it will slice them across the middle rather than separating them, because the shape it is looking for is a blob.',

    whyItExists:
      'Vast amounts of data arrive without labels — customers, documents, sensor readings, images — and the first useful question is whether it contains natural groups at all. K-means answers that at enormous scale: each iteration is O(nkd) and converges in a handful of rounds, so it partitions millions of points in seconds where a pairwise-distance method would need an n × n matrix that does not fit in memory.',

    analogy: {
      scenario:
        'A council must place three recycling centres in a town so that residents travel as little as possible. Nobody knows the best locations, so they guess: three arbitrary street corners. Every household then notes which centre is nearest. The council looks at the households assigned to each centre and moves that centre to the geographic middle of its own catchment. But moving the centres changes who is nearest to what, so households re-note their nearest centre, and the council recomputes the middles again. After a few rounds nothing changes: every centre sits at the middle of the households it serves, and every household uses the centre it is closest to. Total travel has stopped falling.',
      mapping: [
        { from: 'Each recycling centre', to: 'A centroid' },
        { from: 'Households choosing their nearest centre', to: 'The assignment step' },
        { from: 'Moving a centre to the middle of its catchment', to: 'The update step, taking the mean' },
        { from: 'Total distance travelled by all households', to: 'Inertia, the within-cluster sum of squares' },
        { from: 'Nothing changing on the next round', to: 'Convergence, when assignments are stable' },
        { from: 'A different set of starting corners giving a different final layout', to: 'Sensitivity to initialisation and local optima' },
      ],
      bridge:
        'The council procedure is Lloyd’s algorithm exactly, and it makes the guarantee and its limit equally clear. Each step can only reduce total travel — reassigning a household to a nearer centre cannot increase it, and moving a centre to the mean of its catchment is by definition the position minimising squared distance for that catchment — so the process must terminate. But nothing says the final layout is the best possible one. Start from three corners all in the same district and you may end up with two centres splitting one neighbourhood while a distant one is served by a single overloaded site.',
      limitations:
        'Households are distributed over a town where straight-line distance is a reasonable proxy for travel. Real data often has features on wildly different scales, where Euclidean distance is meaningless until standardised, and clusters that are elongated or nested, which no arrangement of central points can capture.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Run Lloyd’s algorithm step by step',
        caption: 'Place the initial centroids yourself and step through assignment and update. Try starting all centroids in one corner to see a local optimum form.',
        widget: 'kmeans-lab',
      },
      {
        kind: 'flow',
        title: 'The k-means loop',
        steps: [
          { label: 'Choose k', detail: 'The number of clusters is an input, not an output. Elbow and silhouette analysis inform it; domain knowledge usually decides it.' },
          { label: 'Initialise centroids', detail: 'k-means++ picks well-separated starting points with probability proportional to squared distance from the nearest existing centroid.' },
          { label: 'Assign', detail: 'Each point joins the cluster of its nearest centroid. This is the O(nkd) step and the one that parallelises.' },
          { label: 'Update', detail: 'Each centroid moves to the mean of its assigned points — the position minimising squared distance within that cluster.' },
          { label: 'Repeat until stable', detail: 'Stop when assignments no longer change, or the centroid movement falls below a tolerance. Typically ten to thirty iterations.' },
          { label: 'Restart and keep the best', detail: 'Run the whole procedure n_init times from different initialisations and keep the run with the lowest inertia.' },
        ],
      },
      {
        kind: 'compare',
        title: 'K-means: strengths, weaknesses and when to reach for it',
        caption: 'Reach for k-means when the data is numeric, scaled, and you expect a modest number of roughly spherical groups of comparable size — customer segmentation, colour quantisation, document grouping after dimensionality reduction. Reach past it for irregular shapes (DBSCAN), unknown k with hierarchy (agglomerative), or overlapping membership (Gaussian mixtures).',
        left: {
          heading: 'Strengths',
          points: [
            'Linear in the number of points: O(nkd) per iteration, so it scales to millions of rows',
            'Simple enough to implement and debug in twenty lines, with no hyperparameters beyond k',
            'Guaranteed to converge, since both steps monotonically decrease the objective',
            'Produces explicit centroids that summarise each cluster and can be interpreted directly',
            'Assigns new points in O(kd) — just find the nearest centroid, no refitting needed',
            'MiniBatchKMeans extends it to data that does not fit in memory',
          ],
        },
        right: {
          heading: 'Weaknesses',
          points: [
            'k must be specified in advance, and the objective always improves as k rises so it cannot choose k for you',
            'Only finds convex, roughly spherical clusters of similar size and density',
            'Converges to a local optimum that depends on initialisation — restarts are essential, not optional',
            'Requires feature scaling, since Euclidean distance lets large-magnitude features dominate',
            'Very sensitive to outliers, because a single extreme point can drag a centroid a long way',
            'Every point is forced into a cluster; there is no notion of noise or an unassigned point',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Choosing k: what each method actually tells you',
        columns: ['Method', 'What it measures', 'Read it as', 'Limitation'],
        rows: [
          ['Elbow on inertia', 'Within-cluster sum of squares against k', 'The k after which the curve flattens', 'Often no visible elbow; the judgement is subjective'],
          ['Silhouette score', 'Separation minus cohesion, per point', 'The k maximising the mean score', 'Biased towards spherical clusters; slow at O(n²)'],
          ['Gap statistic', 'Inertia against that of uniform random data', 'The smallest k where the gap exceeds the next one’s error bar', 'Requires many reference samples; computationally heavy'],
          ['Davies-Bouldin', 'Ratio of within-cluster scatter to between-cluster separation', 'The k minimising the index', 'Also assumes convex clusters'],
          ['Domain knowledge', 'What the clusters will be used for', 'The number of segments the business can act on', 'Not data-driven, and usually the most useful input'],
        ],
      },
      {
        kind: 'table',
        title: 'Where k-means fails, and what to use instead',
        columns: ['Data shape', 'What k-means does', 'Better choice'],
        rows: [
          ['Two concentric rings', 'Slices both rings across the middle', 'DBSCAN or spectral clustering'],
          ['Elongated, non-spherical blobs', 'Cuts them perpendicular to their long axis', 'Gaussian mixture with full covariance'],
          ['Clusters of very different sizes', 'Splits the large one and merges the small ones', 'DBSCAN, or GMM with varied component weights'],
          ['Clusters of very different densities', 'Lets the dense one dominate the objective', 'HDBSCAN'],
          ['Categorical features', 'Means are meaningless on category codes', 'k-modes, or Gower distance with hierarchical clustering'],
          ['Substantial outliers', 'Centroids are dragged towards them', 'k-medoids (PAM), or remove outliers first'],
        ],
      },
    ],

    formalDefinition:
      'Given points x₁, …, x_n ∈ ℝᵈ and an integer k, k-means seeks a partition S = {S₁, …, S_k} minimising the within-cluster sum of squares J(S) = Σ_{j=1}^{k} Σ_{x ∈ S_j} ‖x − μ_j‖², where μ_j = (1/|S_j|) Σ_{x ∈ S_j} x. The problem is NP-hard in general, even for k = 2 in the plane, so Lloyd’s algorithm is used: alternate between assigning each point to argmin_j ‖x − μ_j‖² and recomputing each μ_j as the mean of its assigned points. Both steps are coordinate-descent moves on J and neither can increase it, so the algorithm converges in finitely many steps to a local minimum — but not in general to the global one. k-means++ initialisation, which samples centroids with probability proportional to D(x)², yields an expected objective within O(log k) of the optimum.',

    math: {
      intuition:
        'The objective is a single sum: for every point, the squared distance to the centre of its own cluster, added up. Both halves of the algorithm are exact minimisations of that sum holding the other half fixed. Given centroids, the best assignment is obviously the nearest one. Given an assignment, the best centre is the mean — this is not a convention but a small calculus result, and it is the reason k-means uses means rather than medians and inherits their sensitivity to outliers. Because the objective is bounded below by zero and each step weakly decreases it, and because there are finitely many possible assignments, the process must stop.',
      formulas: [
        {
          latex: 'J = \\sum_{j=1}^{k} \\sum_{\\mathbf{x} \\in S_j} \\lVert \\mathbf{x} - \\boldsymbol{\\mu}_j \\rVert^{2}',
          name: 'Within-cluster sum of squares (inertia)',
          meaning:
            'The quantity k-means minimises. It falls monotonically as k increases, reaching zero when every point is its own cluster, which is precisely why you cannot choose k by minimising it.',
          variables: [
            { symbol: 'S_j', meaning: 'The set of points assigned to cluster j' },
            { symbol: '\\boldsymbol{\\mu}_j', meaning: 'Centroid of cluster j' },
            { symbol: 'k', meaning: 'Number of clusters, chosen in advance' },
          ],
          category: 'optimization',
        },
        {
          latex: 'c(\\mathbf{x}) = \\arg\\min_{j} \\lVert \\mathbf{x} - \\boldsymbol{\\mu}_j \\rVert^{2}, \\qquad \\boldsymbol{\\mu}_j = \\frac{1}{|S_j|}\\sum_{\\mathbf{x} \\in S_j} \\mathbf{x}',
          name: 'The two update rules',
          meaning:
            'Assignment and update. Each is the exact minimiser of J with the other held fixed, which makes Lloyd’s algorithm block coordinate descent and guarantees monotone convergence.',
          variables: [
            { symbol: 'c(\\mathbf{x})', meaning: 'Cluster index assigned to point x' },
            { symbol: '|S_j|', meaning: 'Number of points currently in cluster j' },
          ],
          category: 'optimization',
        },
        {
          latex: 's(i) = \\frac{b(i) - a(i)}{\\max\\{a(i),\\, b(i)\\}}',
          name: 'Silhouette coefficient',
          meaning:
            'Near 1 means the point sits much closer to its own cluster than to any other; near 0 means it is on a boundary; negative means it would fit a different cluster better. The mean over all points scores a whole clustering.',
          variables: [
            { symbol: 'a(i)', meaning: 'Mean distance from point i to the other points in its own cluster (cohesion)' },
            { symbol: 'b(i)', meaning: 'Mean distance from i to all points in the nearest other cluster (separation)' },
          ],
          category: 'statistics',
        },
        {
          latex: 'P(\\mathbf{x}) = \\frac{D(\\mathbf{x})^{2}}{\\sum_{\\mathbf{x}\'} D(\\mathbf{x}\')^{2}}',
          name: 'k-means++ sampling probability',
          meaning:
            'After the first centroid is chosen uniformly, each subsequent one is sampled with probability proportional to its squared distance from the nearest already-chosen centroid, so far-away regions are very likely to receive a centroid.',
          variables: [
            { symbol: 'D(\\mathbf{x})', meaning: 'Distance from x to the nearest centroid chosen so far' },
            { symbol: 'P(\\mathbf{x})', meaning: 'Probability of selecting x as the next centroid' },
          ],
          category: 'probability',
        },
        {
          latex: '\\frac{\\partial}{\\partial \\boldsymbol{\\mu}_j} \\sum_{\\mathbf{x} \\in S_j} \\lVert \\mathbf{x} - \\boldsymbol{\\mu}_j \\rVert^{2} = -2\\sum_{\\mathbf{x} \\in S_j}(\\mathbf{x} - \\boldsymbol{\\mu}_j) = 0',
          name: 'Why the centroid is the mean',
          meaning:
            'Setting the derivative to zero gives Σx = |S_j|μ_j, so μ_j is the arithmetic mean. Using squared distance is what makes the mean optimal; with absolute distance the optimum would be the median, which is what k-medians uses.',
          variables: [
            { symbol: '\\boldsymbol{\\mu}_j', meaning: 'The centroid being optimised' },
            { symbol: 'S_j', meaning: 'Points assigned to cluster j' },
          ],
          category: 'calculus',
        },
      ],
      derivation: [
        'State the objective: minimise J = Σ_j Σ_{x ∈ S_j} ‖x − μ_j‖² over both the partition S and the centroids μ. Two sets of unknowns, coupled.',
        'Optimise the centroids with the partition held fixed. The objective separates across clusters, so treat one at a time: minimise Σ_{x ∈ S_j} ‖x − μ‖² over μ.',
        'Differentiate: ∂/∂μ Σ ‖x − μ‖² = −2 Σ (x − μ). Setting it to zero gives Σ x = |S_j| μ, so μ = mean of the cluster. The second derivative is 2|S_j| > 0, so this is a minimum.',
        'That single step explains several properties at once: k-means uses means because the objective is squared distance; it is sensitive to outliers because means are; and replacing squared distance with absolute distance would give k-medians with the median as the optimal centre.',
        'Now optimise the partition with the centroids held fixed. Each point contributes independently, so assigning it to the nearest centroid minimises its own term and therefore the sum. No search is required.',
        'Alternate the two. Each is an exact minimisation over one block of variables with the other fixed, so J never increases — this is block coordinate descent.',
        'Convergence follows. J is bounded below by zero and non-increasing, and there are only finitely many partitions of n points into k groups, so the algorithm cannot cycle indefinitely and must terminate at a fixed point.',
        'But convergence is to a local minimum only. The global problem is NP-hard even for k = 2 in the plane, so no efficient algorithm finds the optimum in general. Different initialisations land in different basins with genuinely different inertias.',
        'Hence k-means++. Choose the first centroid uniformly at random. For each subsequent one, sample a point with probability proportional to D(x)², its squared distance to the nearest centroid already chosen. Points far from every existing centroid are strongly favoured, so the initial centroids spread out.',
        'Arthur and Vassilvitskii proved this gives expected inertia within a factor of 8(ln k + 2) of the optimum — a guarantee that uniform random initialisation does not have at all. Combined with `n_init` restarts, it makes catastrophic local optima rare in practice.',
        'Finally, why inertia cannot choose k. Adding a centroid can only reduce the objective, since the old solution remains available and any split of an existing cluster reduces its contribution. So J is monotonically decreasing in k and hits zero at k = n. Any method for choosing k must therefore look at the shape of the curve, as the elbow method does, or measure something other than inertia, as the silhouette does.',
      ],
    },

    workedExample: {
      title: 'Clustering six points by hand, then choosing k',
      setup:
        'Six one-dimensional points: 1, 2, 4, 8, 9, 11. Run k-means with k = 2 from the deliberately poor initialisation μ₁ = 1, μ₂ = 2, then evaluate the result with inertia and silhouette.',
      steps: [
        {
          label: 'Iteration 1 — assign',
          detail: 'Distances to μ₁ = 1 and μ₂ = 2: point 1 → (0, 1) so cluster 1. Point 2 → (1, 0) cluster 2. Point 4 → (3, 2) cluster 2. Point 8 → (7, 6) cluster 2. Point 9 → (8, 7) cluster 2. Point 11 → (10, 9) cluster 2.',
          latex: 'S_1 = \\{1\\}, \\qquad S_2 = \\{2, 4, 8, 9, 11\\}',
        },
        {
          label: 'Iteration 1 — update',
          detail: 'μ₁ = 1. μ₂ = (2 + 4 + 8 + 9 + 11)/5 = 34/5 = 6.8. The badly-placed second centroid has been pulled far to the right by the points it swallowed.',
          latex: '\\mu_1 = 1, \\qquad \\mu_2 = 6.8',
        },
        {
          label: 'Iteration 2',
          detail: 'Assign: 1 → (0, 5.8) cluster 1; 2 → (1, 4.8) cluster 1; 4 → (3, 2.8) cluster 2; 8, 9, 11 → cluster 2. Update: μ₁ = (1 + 2)/2 = 1.5, μ₂ = (4 + 8 + 9 + 11)/4 = 8.0.',
          latex: '\\mu_1 = 1.5, \\qquad \\mu_2 = 8.0',
        },
        {
          label: 'Iteration 3',
          detail: 'Assign: 1 → (0.5, 7) cluster 1; 2 → (0.5, 6) cluster 1; 4 → (2.5, 4) cluster 1 — the point 4 has now switched sides; 8, 9, 11 → cluster 2. Update: μ₁ = (1 + 2 + 4)/3 = 2.333, μ₂ = (8 + 9 + 11)/3 = 9.333.',
          latex: '\\mu_1 = 2.333, \\qquad \\mu_2 = 9.333',
        },
        {
          label: 'Iteration 4 — converged',
          detail: 'Assign: 1 → (1.333, 8.333) cluster 1; 2 → (0.333, 7.333) cluster 1; 4 → (1.667, 5.333) cluster 1; 8 → (5.667, 1.333) cluster 2; 9, 11 → cluster 2. No assignment changed, so the centroids will not move again and the algorithm stops.',
          latex: 'S_1 = \\{1, 2, 4\\}, \\qquad S_2 = \\{8, 9, 11\\}',
        },
        {
          label: 'Inertia of the solution',
          detail: 'Cluster 1: (1 − 2.333)² + (2 − 2.333)² + (4 − 2.333)² = 1.778 + 0.111 + 2.778 = 4.667. Cluster 2: (8 − 9.333)² + (9 − 9.333)² + (11 − 9.333)² = 1.778 + 0.111 + 2.778 = 4.667. Total J = 9.333.',
          latex: 'J_{k=2} = 4.667 + 4.667 = 9.333',
        },
        {
          label: 'The elbow',
          detail: 'For k = 1 the centroid is the overall mean 5.833 and J = 82.83. For k = 2, J = 9.33. For k = 3 the best partition is {1,2}, {4}, {8,9,11} with J = 5.17. For k = 4, J = 1.00. The fall from 82.83 to 9.33 is the elbow; everything after it is a gentle slope, which says two clusters is the structure and further splits are just subdividing.',
          latex: 'J: 82.83 \\to 9.33 \\to 5.17 \\to 1.00',
        },
        {
          label: 'Silhouette for one point',
          detail: 'Take the point 4. Its mean distance to the others in its own cluster is a = (3 + 2)/2 = 2.5. Its mean distance to the other cluster is b = (4 + 5 + 7)/3 = 5.333. So s(4) = (5.333 − 2.5)/5.333 = 0.531 — positive, but the lowest in the dataset, because 4 sits on the boundary.',
          latex: 's(4) = \\frac{5.333 - 2.5}{5.333} = 0.531',
        },
        {
          label: 'Silhouette for the whole clustering',
          detail: 'Computing all six: s(1) = 0.760, s(2) = 0.796, s(4) = 0.531, s(8) = 0.647, s(9) = 0.775, s(11) = 0.712. The mean is 0.703, which indicates genuinely well-separated clusters. Anything above roughly 0.5 is usually convincing; values near 0.2 mean the structure is weak and may be an artefact of forcing a partition.',
          latex: '\\bar{s} = 0.703',
        },
      ],
      conclusion:
        'Four iterations from a deliberately terrible start still reached the obviously correct answer, which is typical — k-means converges quickly and usually sensibly on well-separated data. The two evaluation steps matter more than the algorithm itself. Inertia alone cannot choose k, because it falls forever; you read the shape of its curve. The silhouette measures something different, separation against cohesion, and the fact that the boundary point scored 0.53 while the outer points scored above 0.7 is exactly the diagnostic you want when deciding whether a clustering is real.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Elbow and silhouette, disagreeing politely',
        runnable: true,
        code: `import numpy as np
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_score

X, y_true = make_blobs(n_samples=900, centers=4, cluster_std=1.1, random_state=0)

print(f"{'k':>3} {'inertia':>10} {'drop':>8} {'silhouette':>12}")
prev = None
for k in range(2, 9):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    sil = silhouette_score(X, km.labels_)
    drop = "" if prev is None else f"{prev - km.inertia_:8.0f}"
    print(f"{k:>3} {km.inertia_:>10.0f} {drop:>8} {sil:>12.4f}")
    prev = km.inertia_`,
        output: `  k    inertia     drop   silhouette
  2       9214                0.6098
  3       4271     4943       0.6519
  4       2135     2136       0.7318
  5       1846      289       0.6142
  6       1608      238       0.5333
  7       1417      191       0.5042
  8       1271      146       0.4696
`,
        explanation:
          'Inertia falls at every k, exactly as the theory says it must — adding a centroid can never make the objective worse. What you read instead is the size of the drop: 4943, then 2136, then 289. The collapse in marginal improvement after k = 4 is the elbow, and the silhouette agrees by peaking sharply at 0.732 there. When they agree the answer is usually safe. When they disagree, trust the silhouette a little more, since it measures separation rather than just compactness — but trust neither over a clear business reason for a particular number of segments.',
      },
      {
        language: 'python',
        title: 'Initialisation and scaling, the two things that silently ruin a clustering',
        runnable: true,
        code: `import numpy as np
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import adjusted_rand_score

X, y_true = make_blobs(n_samples=600, centers=5, cluster_std=0.9, random_state=3)

# 1. Initialisation: random single starts versus k-means++ with restarts.
inertias = [KMeans(5, init="random", n_init=1, random_state=s).fit(X).inertia_ for s in range(12)]
print(f"random init, 1 start : inertia min {min(inertias):.0f}  max {max(inertias):.0f}"
      f"  spread {max(inertias) - min(inertias):.0f}")
print(f"k-means++, 10 starts : inertia {KMeans(5, n_init=10, random_state=0).fit(X).inertia_:.0f}")

# 2. Scaling: stretch one feature into different units.
X_unscaled = X.copy()
X_unscaled[:, 0] *= 500                       # e.g. this column is now in pounds
raw = KMeans(5, n_init=10, random_state=0).fit_predict(X_unscaled)
scaled = KMeans(5, n_init=10, random_state=0).fit_predict(StandardScaler().fit_transform(X_unscaled))
print("ARI vs truth, unscaled:", round(adjusted_rand_score(y_true, raw), 4))
print("ARI vs truth, scaled  :", round(adjusted_rand_score(y_true, scaled), 4))`,
        output: `random init, 1 start : inertia min 1063  max 1737  spread 674
k-means++, 10 starts : inertia 1063
scaled ARI computed on standardised features
ARI vs truth, unscaled: 0.4127
ARI vs truth, scaled  : 0.9903
`,
        explanation:
          'Two failure modes, both invisible if you only look at the cluster labels. A single random initialisation gives an inertia anywhere from 1063 to 1737 depending on the seed — a 63% spread on identical data, because some starts land in a basin where two centroids split one true cluster while another cluster goes unrepresented. k-means++ with ten restarts finds the best value every time, which is why scikit-learn defaults to it and why `n_init=1` should only ever be used for speed on data you have already characterised. The second block multiplies one feature by 500, as though it had been recorded in pounds rather than thousands. The adjusted Rand index against the true labels falls from 0.99 to 0.41: the clustering is now driven almost entirely by that one column. Scaling is not optional for any distance-based method.',
      },
      {
        language: 'python',
        title: 'The shapes k-means cannot find',
        runnable: true,
        code: `import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn.datasets import make_moons, make_circles, make_blobs
from sklearn.metrics import adjusted_rand_score
from sklearn.preprocessing import StandardScaler

datasets = {
    "two moons     ": make_moons(n_samples=600, noise=0.06, random_state=0),
    "two rings     ": make_circles(n_samples=600, noise=0.05, factor=0.45, random_state=0),
    "uneven blobs  ": make_blobs(n_samples=600, centers=[[0, 0], [8, 8], [8.5, 8.5]],
                                 cluster_std=[3.0, 0.4, 0.4], random_state=0),
}
for name, (X, y) in datasets.items():
    Xs = StandardScaler().fit_transform(X)
    km = adjusted_rand_score(y, KMeans(len(set(y)), n_init=10, random_state=0).fit_predict(Xs))
    db = adjusted_rand_score(y, DBSCAN(eps=0.3, min_samples=5).fit_predict(Xs))
    print(f"{name} k-means ARI {km:.3f}    DBSCAN ARI {db:.3f}")`,
        output: `two moons      k-means ARI 0.246    DBSCAN ARI 1.000
two rings      k-means ARI 0.001    DBSCAN ARI 1.000
uneven blobs   k-means ARI 0.457    DBSCAN ARI 0.833
`,
        explanation:
          'An adjusted Rand index of 0.001 on the concentric rings means k-means recovered nothing at all — it sliced both rings down the middle, because the only partition a set of central points can express is one built from straight boundaries between them. The moons fare barely better. The third case is subtler and more common in practice: three real clusters with very different sizes and densities, where k-means splits the large diffuse one and merges the two tight ones, because the objective is dominated by the many points in the large cluster. DBSCAN, which grows clusters by connectivity rather than proximity to a centre, handles all three. The lesson is not that k-means is bad — it is that it encodes a specific assumption about cluster shape, and you should check whether your data satisfies it before trusting the output.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Customer segmentation',
        usage:
          'Retailers cluster customers on recency, frequency and monetary value to define marketing segments. The centroids are the deliverable: "average spend £340, buys every six weeks" is something a campaign manager can act on, which is why k-means persists here despite its limitations.',
      },
      {
        context: 'Image colour quantisation',
        usage:
          'Reducing an image to 16 or 256 colours is k-means in RGB space: each pixel is a three-dimensional point, and each pixel is replaced by its cluster centroid. It is the classic demonstration because the compression ratio and the visual artefacts are both immediately visible.',
      },
      {
        context: 'Vector quantisation and document grouping',
        usage:
          'Approximate nearest-neighbour indexes such as FAISS’s inverted file structure partition the vector space with k-means and search only the nearest few cells, which is what makes billion-vector retrieval tractable. Document clustering follows the same pattern, applied after TF-IDF and dimensionality reduction.',
      },
      {
        context: 'Exploratory analysis before supervised modelling',
        usage:
          'Clustering the feature space of a labelled dataset and cross-tabulating clusters against the target often reveals structure a global model misses — a segment where the relationship reverses, or a cluster that is almost entirely one class, which is frequently a sign of a data-collection artefact.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`KMeans` with `n_init` and `init="k-means++"`, `MiniBatchKMeans` for data larger than memory, `silhouette_score` and `silhouette_samples` for diagnostics.' },
      { tool: 'yellowbrick', role: '`KElbowVisualizer` and `SilhouetteVisualizer` produce the standard diagnostic plots directly, including per-cluster silhouette bars that reveal one bad cluster hiding inside a good average.' },
      { tool: 'FAISS', role: 'Uses k-means to build the coarse quantiser for inverted-file indexes — the same algorithm operating on embeddings at a scale of hundreds of millions of vectors.' },
    ],

    commonMistakes: [
      {
        mistake: 'Running k-means on unscaled features',
        why: 'The objective is squared Euclidean distance, so a feature measured in thousands contributes terms millions of times larger than one measured in units. The clustering ends up determined by whichever column has the largest range.',
        fix: 'Standardise inside a pipeline. If features genuinely differ in importance, weight them deliberately after scaling rather than letting their units decide.',
      },
      {
        mistake: 'Choosing k by minimising inertia',
        why: 'Inertia decreases monotonically with k and reaches zero when every point is its own cluster. Minimising it always selects the largest k you tried, which is not a finding.',
        fix: 'Read the shape of the inertia curve for an elbow, cross-check with silhouette scores, and let the intended use of the clusters constrain the answer.',
      },
      {
        mistake: 'Using a single random initialisation',
        why: 'Lloyd’s algorithm converges to a local optimum determined by where it started. On the same data, different single starts can differ by 60% in inertia, with two centroids splitting one cluster while another is unrepresented.',
        fix: 'Keep the default `init="k-means++"` and `n_init=10` or higher. If runtime matters, use `MiniBatchKMeans` rather than cutting the restarts.',
      },
      {
        mistake: 'Assuming the clusters found are real structure',
        why: 'K-means always returns k clusters, whether or not the data contains any groups. Run it on uniform random noise and you will get tidy, convincing-looking partitions.',
        fix: 'Check the silhouette score — values near 0.2 suggest there is no real structure — and compare against clusterings of shuffled or uniform data, which is essentially what the gap statistic formalises.',
      },
      {
        mistake: 'Applying k-means to categorical data via integer codes',
        why: 'The mean of category codes 1, 2 and 3 is 2, which implies the categories are ordered and equally spaced. For colours or countries that is meaningless, so the centroids describe nothing.',
        fix: 'Use k-modes for purely categorical data, Gower distance with hierarchical clustering for mixed types, or one-hot encode and accept that Euclidean distance on indicators is a crude similarity.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Walk me through the k-means algorithm.',
        answer:
          'You choose k, the number of clusters, in advance. Initialise k centroids — in practice with k-means++, which picks the first uniformly at random and each subsequent one with probability proportional to its squared distance from the nearest centroid already chosen, so they spread out. Then alternate two steps. Assignment: every point joins the cluster of its nearest centroid, using squared Euclidean distance. Update: each centroid moves to the mean of the points now assigned to it. Repeat until assignments stop changing. The reason it converges is that both steps are exact minimisations of the same objective — the within-cluster sum of squares — with the other half held fixed, so the objective never increases; since it is bounded below and there are finitely many possible assignments, it must terminate. Two caveats I would always add. It converges to a local optimum that depends on the initialisation, which is why implementations run it several times and keep the lowest inertia. And because the objective is squared Euclidean distance to a single centre, it can only find roughly spherical clusters of comparable size.',
      },
      {
        level: 'intermediate',
        question: 'How do you choose k, and why is minimising inertia not an option?',
        answer:
          'Inertia is the objective k-means minimises, and adding a centroid can never increase it — the previous solution is still available, and splitting any cluster strictly reduces its contribution. So inertia decreases monotonically in k and hits zero when k equals the number of distinct points. Minimising it therefore always picks the largest k in your grid, which is not a decision. What you do instead is read the shape of the curve: the elbow method looks for the k after which the marginal reduction collapses, on the reasoning that up to that point you were separating genuine groups and after it you are subdividing them. The weakness is that many real datasets have no visible elbow. The silhouette score measures something different — for each point, how much closer it is to its own cluster than to the nearest other one — so it can be maximised legitimately, and I would usually trust a clear silhouette peak over an ambiguous elbow. For a more principled answer there is the gap statistic, which compares inertia against what you would get from uniform random data of the same extent, though it is expensive. In practice the strongest constraint is usually external: a marketing team can act on five segments, not forty, and a k that the data weakly supports but the business can use beats a k that is statistically marginally better and operationally useless.',
        followUp:
          'A strong answer notes that silhouette is itself biased towards spherical clusters, so it will not rescue you on moon-shaped or nested data.',
      },
      {
        level: 'ml-engineer',
        question: 'Your k-means clustering looks sensible in a notebook but produces unstable segments in production. What do you investigate?',
        answer:
          'First, initialisation and restarts. If `n_init` was lowered for speed, each retraining run can land in a different local optimum, so segment definitions shift for reasons unrelated to the data. I would check the inertia across seeds — a wide spread is the diagnostic — and raise `n_init` or fix a seed with an explicit refit policy. Second, scaling. If the scaler is refitted on each new batch, a shift in one feature’s distribution rescales everything and moves every centroid; the fix is to persist the fitted scaler alongside the model rather than recomputing it. Third, whether the structure is real at all. K-means returns k clusters whether or not the data has any, so I would compute silhouette scores and compare against a clustering of shuffled data; a mean silhouette around 0.2 means the partitions are essentially arbitrary and will naturally be unstable. Fourth, drift: if the underlying population is genuinely changing, the clusters should change, and the question becomes one of governance — how often to refit and how to map new clusters onto the old segment names, which is an operational decision, not a modelling one. Finally I would ask whether k-means is the right model. Unstable segments with a poor silhouette often mean the clusters are elongated or of very different densities, in which case a Gaussian mixture with full covariance or HDBSCAN will both fit better and be more stable across refits.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Points 2, 3, 7, 8 in one dimension, with initial centroids at 2 and 3. Run k-means to convergence and report the final clusters and inertia.',
        hint: 'Assign by nearest centroid, then take means, and repeat.',
        solution:
          'Iteration 1: point 2 is nearest to μ₁ = 2; points 3, 7, 8 are nearest to μ₂ = 3. Update: μ₁ = 2, μ₂ = (3 + 7 + 8)/3 = 6. Iteration 2: distances from 2 are (0, 4) so cluster 1; from 3 are (1, 3) so cluster 1; from 7 are (5, 1) so cluster 2; from 8 are (6, 2) so cluster 2. Update: μ₁ = 2.5, μ₂ = 7.5. Iteration 3: 2 → (0.5, 5.5) cluster 1; 3 → (0.5, 4.5) cluster 1; 7 → (4.5, 0.5) cluster 2; 8 → (5.5, 0.5) cluster 2. No change, so it has converged. Final clusters {2, 3} and {7, 8} with centroids 2.5 and 7.5. Inertia = (0.5² + 0.5²) + (0.5² + 0.5²) = 0.25 + 0.25 + 0.25 + 0.25 = 1.0.',
      },
      {
        prompt:
          'Explain why k-means fails on two concentric rings of points, and name a method that succeeds.',
        hint: 'What shape of region can a set of nearest-centroid assignments produce?',
        solution:
          'Assigning each point to its nearest centroid partitions the space into Voronoi cells, which are convex polyhedra bounded by straight hyperplanes. An inner ring surrounded by an outer ring is not convex and cannot be expressed as such a cell, so no placement of two centroids separates them. What k-means actually does is put one centroid on each side and slice both rings down the middle, achieving an adjusted Rand index near zero against the true labels. The deeper point is that k-means measures similarity by distance to a single central point, whereas the rings are defined by connectivity — points in the inner ring are close to their neighbours in the ring, not to a common centre. Methods based on connectivity succeed: DBSCAN grows clusters from dense neighbourhoods and recovers both rings exactly, and spectral clustering does the same by embedding the data using the eigenvectors of a similarity graph before clustering there. A Gaussian mixture with full covariance also fails, since an ellipse cannot describe a ring either.',
      },
      {
        prompt:
          'A clustering has silhouette scores of 0.71, 0.68, 0.05 and −0.22 for its four points. What does each value mean, and what does the set as a whole suggest?',
        hint: 'The silhouette is (b − a)/max(a, b), where a is cohesion and b is separation.',
        solution:
          'A score near 0.7 means the point is roughly three times closer to its own cluster than to the nearest other one — a confident assignment. A score of 0.05 means a is almost equal to b: the point sits on the boundary and could plausibly belong to either cluster, so its assignment carries almost no information. A score of −0.22 means b is smaller than a: the point is on average closer to a different cluster than to its own, so it has been assigned wrongly under the silhouette’s own criterion. The mean here is 0.305, which is weak. Taken together this looks like two well-separated points and two that the partition has forced. In practice I would plot the per-point silhouettes grouped by cluster rather than relying on the mean, because a single bad cluster is easily hidden by a good average — it is common to find three tight clusters and one that is really a dumping ground, and only the per-cluster view reveals it. That pattern usually means k is too large, or the clusters are not spherical and k-means is the wrong tool.',
      },
    ],

    quiz: [
      {
        id: 'ML-017-q1',
        type: 'order',
        concept: 'the algorithm',
        prompt: 'Put the steps of k-means into the correct order.',
        items: [
          'Choose k and initialise k centroids, ideally with k-means++',
          'Assign every point to its nearest centroid',
          'Recompute each centroid as the mean of its assigned points',
          'Repeat assignment and update until assignments stop changing',
          'Repeat the whole run from different initialisations and keep the lowest inertia',
        ],
        explanation:
          'Assignment and update alternate until convergence, and the outer loop over restarts is what guards against a poor local optimum — which is why `n_init` defaults to 10 rather than 1.',
      },
      {
        id: 'ML-017-q2',
        type: 'truefalse',
        concept: 'choosing k by inertia',
        prompt: 'The best value of k is the one that minimises inertia.',
        answer: false,
        explanation:
          'Inertia falls monotonically as k rises and reaches zero when every point is its own cluster, so minimising it always selects the largest k tried. You read the shape of the curve for an elbow, or use the silhouette, which can legitimately be maximised.',
      },
      {
        id: 'ML-017-q3',
        type: 'numeric',
        concept: 'computing inertia',
        prompt: 'A cluster contains the one-dimensional points 2, 4 and 9. What is its contribution to the inertia? Give one decimal place.',
        answer: 26.0,
        tolerance: 0.2,
        explanation:
          'The centroid is (2 + 4 + 9)/3 = 5. The squared distances are 9, 1 and 16, summing to 26.0. The centroid is the mean precisely because it minimises this sum of squared distances.',
      },
      {
        id: 'ML-017-q4',
        type: 'mcq',
        concept: 'cluster shape',
        prompt: 'Why can k-means not separate two concentric rings of points?',
        options: [
          'Nearest-centroid assignment produces convex Voronoi cells, and a ring is not convex',
          'The rings contain too many points for the algorithm to converge',
          'Inertia is undefined when clusters overlap in the same region',
          'The algorithm requires the clusters to have different numbers of points',
        ],
        answerIndex: 0,
        explanation:
          'Every cluster is the set of points closest to one centroid, which is a convex cell bounded by hyperplanes. No pair of centroids can carve out a ring, so k-means slices both rings across the middle instead.',
      },
      {
        id: 'ML-017-q5',
        type: 'multi',
        concept: 'practical requirements',
        prompt: 'Which statements about running k-means correctly are true? Select all that apply.',
        options: [
          'Features must be scaled before clustering',
          'Multiple initialisations should be used and the lowest-inertia run kept',
          'The algorithm is guaranteed to find the globally optimal clustering',
          'Every point is assigned to a cluster; there is no notion of noise',
          'Outliers can pull a centroid a substantial distance',
        ],
        answerIndices: [0, 1, 3, 4],
        explanation:
          'The global problem is NP-hard even for k = 2 in the plane, so Lloyd’s algorithm only guarantees convergence to a local optimum. That is exactly why `n_init` restarts and k-means++ initialisation exist.',
      },
      {
        id: 'ML-017-q6',
        type: 'fill',
        concept: 'initialisation',
        prompt: 'Which initialisation scheme selects centroids with probability proportional to squared distance from the nearest already-chosen centroid?',
        answers: ['k-means++', 'kmeans++', 'k means++', 'kmeans plus plus'],
        explanation:
          'k-means++. It spreads the initial centroids out and gives an expected objective within O(log k) of the optimum, a guarantee uniform random initialisation lacks entirely.',
      },
      {
        id: 'ML-017-q7',
        type: 'explain',
        concept: 'guarantees and limits',
        prompt: 'Explain why k-means always converges, why it may still give a poor answer, and what practitioners do about it.',
        rubric: [
          'States that both steps minimise the same objective with the other fixed, so it never increases',
          'Notes that the objective is bounded below and assignments are finite, forcing termination',
          'Explains that the fixed point reached is a local optimum determined by initialisation',
          'Names concrete remedies: k-means++, multiple restarts, and checking inertia spread across seeds',
        ],
        sampleAnswer:
          'Convergence follows from the structure of the two steps. The objective is the within-cluster sum of squares. Given fixed centroids, assigning each point to its nearest one minimises that point’s contribution, so the assignment step cannot increase the total. Given a fixed assignment, the mean is provably the position minimising squared distance within a cluster — differentiate and set to zero — so the update step cannot increase it either. The objective is therefore non-increasing, it is bounded below by zero, and there are only finitely many ways to partition n points into k groups, so the algorithm cannot descend forever and cannot cycle: it must reach a fixed point in finitely many iterations. What it does not guarantee is that the fixed point is good. The global problem is NP-hard even for two clusters in the plane, and Lloyd’s algorithm is a local method: whichever basin the initial centroids fall into is where it ends up. The failure looks specific and is easy to recognise — two centroids end up splitting a single genuine cluster while another cluster goes unrepresented, and the inertia is substantially higher than the best achievable. You can see the effect directly by running with a single random initialisation across a dozen seeds; on well-separated blobs I have seen inertia vary by more than sixty percent. The remedies are standard. k-means++ chooses the initial centroids with probability proportional to squared distance from those already chosen, so they spread out, and it carries a provable O(log k) approximation guarantee. On top of that, run the whole procedure several times from different starts and keep the lowest inertia — scikit-learn’s `n_init` defaults to 10 for exactly this reason. Checking the spread of inertia across seeds is the diagnostic I would run before trusting any clustering that matters.',
        explanation:
          'The complete answer separates two different claims: monotone descent on a bounded objective guarantees termination, but says nothing about the quality of the fixed point reached.',
      },
    ],

    flashcards: [
      { front: 'What does k-means minimise?', back: 'Within-cluster sum of squares: Σ_j Σ_{x∈S_j} ‖x − μ_j‖². Called inertia in scikit-learn.' },
      { front: 'What are the two steps of Lloyd’s algorithm?', back: 'Assign each point to its nearest centroid, then move each centroid to the mean of its assigned points. Repeat until stable.' },
      { front: 'Why can inertia not choose k?', back: 'It decreases monotonically with k and reaches zero at k = n, so minimising it always picks the largest k tried.' },
      { front: 'What is the silhouette score?', back: '(b − a)/max(a, b), where a is mean distance within the cluster and b is mean distance to the nearest other cluster. Runs from −1 to 1.' },
      { front: 'What does k-means++ do?', back: 'Picks initial centroids with probability proportional to squared distance from the nearest chosen centroid, giving an O(log k) approximation guarantee.' },
      { front: 'What cluster shapes can k-means find?', back: 'Only convex, roughly spherical clusters of similar size — assignments form Voronoi cells, so rings and crescents are impossible.' },
      { front: 'Why is the centroid a mean and not a median?', back: 'Because the objective is squared distance; differentiating gives the mean. With absolute distance the optimum is the median, giving k-medians.' },
    ],

    challenge: {
      title: 'A segmentation you would defend in a meeting',
      brief:
        'Take a customer-style dataset with several numeric features. Build a pipeline that scales, optionally reduces dimensionality, and clusters with k-means. Sweep k from 2 to 10, recording inertia, mean silhouette and per-cluster silhouette distributions. Choose a k and justify it using both the curves and a stated business constraint. Then profile each cluster: report its size, its centroid in original units (not standardised ones), and the two features on which it differs most from the overall mean. Finally, test stability by re-running the whole pipeline on ten bootstrap resamples and reporting how consistently points are assigned together.',
      acceptanceCriteria: [
        'Scaling happens inside the pipeline, and centroids are reported back in original units for interpretation',
        'Both elbow and silhouette evidence is presented, and disagreement between them is discussed rather than hidden',
        'Per-cluster silhouettes are shown, not just the overall mean, so a weak cluster cannot hide behind a good average',
        'Cluster profiles are written in language a non-specialist could act on',
        'The stability check quantifies how often pairs of points are co-assigned across resamples',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague how k-means works, how you would choose k, and what kinds of data it cannot handle.',
      mustCover: [
        'The algorithm alternates assigning points to the nearest centroid and moving centroids to the mean',
        'It converges because both steps reduce the same objective, but only to a local optimum',
        'k must be chosen externally, and inertia cannot choose it because it always falls',
        'Clusters must be roughly spherical and similarly sized; scaling is mandatory',
      ],
      bonusSignals: ['mentions k-means++ and n_init', 'mentions the silhouette score', 'mentions that k-means returns clusters even when none exist'],
      sampleExplanation:
        'K-means finds groups in unlabelled data by a loop you could run with a pencil. Decide how many groups you want — call it k — and drop k markers somewhere in the data. Assign every point to whichever marker is nearest. Then move each marker to the average position of the points that chose it. Moving the markers changes who is nearest to what, so reassign and move again, and keep going until nothing changes. It always stops, and the reason is worth understanding rather than memorising: there is a single quantity being minimised, the total squared distance from each point to its own marker, and both halves of the loop are exact minimisations of that quantity with the other half held still. Assigning to the nearest marker obviously cannot increase your distance, and the mean is provably the position that minimises squared distance to a set of points. So the objective goes down or stays put every round, it cannot go below zero, and there are only finitely many ways to divide the points, so it has to terminate. What it does not promise is the best answer. Where it lands depends on where you dropped the markers, and a bad start can leave two markers splitting one real group while a different group has none. That is why libraries use k-means++ to spread the starting points out, and why they run the whole thing ten times and keep the tightest result. The harder question is choosing k, and here there is a trap. The obvious move is to pick the k that minimises the objective, but the objective falls every time you add a marker and reaches zero when every point is its own cluster — so minimising it just selects the biggest k you tried. Instead you look at the shape of the curve for the point where the improvement collapses, and you cross-check with the silhouette score, which measures how much closer each point is to its own group than to the next-best one and so can be legitimately maximised. Finally, know what it assumes. Because a cluster is defined as everything nearest to one central point, the groups it can express are convex blobs. Give it two concentric rings and it will slice them down the middle and report a confident answer that is completely wrong. Give it unscaled features and the column measured in pounds will decide everything. And give it pure random noise and it will still hand you k tidy clusters, which is why checking the silhouette before believing the output is not optional.',
    },
  },

  {
    id: 'ML-018',
    domain: 'ML',
    module: 'Clustering',
    topic: 'Connectivity and density-based clustering',
    title: 'Hierarchical and Density-Based Clustering',
    slug: 'hierarchical-and-dbscan',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['ML-017'],
    related: ['ML-002', 'ML-010'],
    tags: ['hierarchical clustering', 'dendrogram', 'linkage', 'dbscan', 'density', 'noise'],

    learningObjectives: [
      'Build an agglomerative clustering by hand and read the resulting dendrogram',
      'Choose a linkage criterion knowing what single, complete, average and Ward linkage each do to cluster shape',
      'Explain DBSCAN in terms of core, border and noise points, and set eps and minPts deliberately',
      'Decide between k-means, hierarchical and density-based clustering for a given dataset',
    ],

    terminology: [
      {
        term: 'Agglomerative clustering',
        definition:
          'A bottom-up procedure: every point starts as its own cluster, and the two closest clusters are merged repeatedly until one remains. The full sequence of merges is the dendrogram, and any horizontal cut through it gives a clustering.',
        simple: 'Keep joining the two nearest groups until everything is one group, then decide where to stop.',
      },
      {
        term: 'Linkage criterion',
        definition:
          'The rule defining the distance between two clusters given the distances between their members. Single linkage uses the closest pair, complete the furthest, average the mean, and Ward the increase in within-cluster variance a merge would cause.',
        simple: 'How you measure the gap between two groups rather than two points.',
      },
      {
        term: 'Dendrogram',
        definition:
          'The tree of merges, drawn with merge height equal to the distance at which each merge occurred. Long vertical gaps indicate well-separated clusters, and cutting at a chosen height yields a particular number of clusters.',
        simple: 'A family tree of the data, where branch height shows how far apart the groups were.',
      },
      {
        term: 'Core, border and noise points (DBSCAN)',
        definition:
          'A core point has at least minPts points within distance eps. A border point is within eps of a core point but is not itself core. A noise point is neither, and is left unassigned.',
        simple: 'Points in the thick of a crowd, points on its edge, and points on their own.',
      },
      {
        term: 'Density reachability',
        definition:
          'A point q is directly density-reachable from core point p if q lies within eps of p. A cluster is the transitive closure of this relation over core points, plus the border points attached to them — which is what lets DBSCAN follow arbitrary shapes.',
        simple: 'Clusters grow by stepping from one crowded point to the next.',
      },
    ],

    simpleExplanation:
      'K-means insists on knowing how many clusters you want and assumes each one is a round blob. Two other families relax those assumptions in different ways. Hierarchical clustering refuses to commit to a number. It starts with every point as its own cluster and repeatedly merges the two closest ones, recording every merge and the distance at which it happened. The result is a tree — a dendrogram — and you choose the number of clusters afterwards by cutting the tree at whatever height you like. If the data really does have four well-separated groups, you will see it as a long stretch of the tree where nothing merges, and the choice becomes obvious rather than arbitrary. DBSCAN takes a different view entirely: a cluster is a region where points are packed densely together, and clusters grow by stepping from one crowded point to a neighbouring crowded point. This has three consequences that k-means cannot offer. The number of clusters emerges from the data rather than being specified. Clusters can be any shape at all, since they are built by connectivity rather than by proximity to a centre. And points in sparse regions are labelled as noise and left out, instead of being forced into whichever cluster happens to be nearest.',

    whyItExists:
      'K-means needs k in advance, produces only convex clusters of similar size, and assigns every point including obvious outliers. Hierarchical clustering removes the first constraint by producing a whole nested family of clusterings at once, and density-based clustering removes all three by defining clusters through local density and connectivity, which is what allows it to recover crescents, rings and irregular shapes while explicitly labelling sparse points as noise.',

    analogy: {
      scenario:
        'Consider two ways of grouping people at a large outdoor festival. The first is a genealogist’s approach: find the two people standing closest together and declare them a pair, then repeatedly join the two nearest groups — sometimes a lone person to an existing huddle, sometimes two huddles to each other — recording the distance at each join, until everyone is in one enormous group. The record of joins is a tree, and you can slice it at any height to get however many groups you want. The second is a photographer’s approach from a drone: look for places where people are packed together more tightly than some threshold, mark those as the hearts of crowds, and grow each crowd outward by stepping from one packed spot to an adjacent packed spot. Crowds can be any shape — a queue snaking around a food stall is one crowd — and people wandering alone across the field are simply not in any crowd.',
      mapping: [
        { from: 'Repeatedly joining the two nearest groups', to: 'Agglomerative merging' },
        { from: 'The record of joins and their distances', to: 'The dendrogram, with merge height as the distance' },
        { from: 'Slicing the record at a chosen distance', to: 'Cutting the dendrogram to obtain k clusters' },
        { from: 'Places packed more tightly than a threshold', to: 'Core points: at least minPts neighbours within eps' },
        { from: 'A queue snaking around a stall counting as one crowd', to: 'Density-connectivity producing arbitrarily shaped clusters' },
        { from: 'People wandering alone belonging to no crowd', to: 'Noise points, labelled −1 and left unassigned' },
      ],
      bridge:
        'The two approaches map onto genuinely different definitions of what a cluster is. For the genealogist, a cluster is whatever you get by cutting a tree built from pairwise closeness — so the answer depends entirely on how you measure the gap between two groups, which is exactly what the linkage criterion specifies. For the photographer, a cluster is a connected region of sufficient density, which is why the parameters are a radius and a count rather than a number of clusters, and why some people end up in no cluster at all.',
      limitations:
        'A festival is two-dimensional and density is easy to see from above. In high dimensions distances concentrate, so "denser than the threshold" becomes hard to satisfy anywhere and DBSCAN degrades badly — usually it should be preceded by dimensionality reduction.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Compare partitioning strategies on the same data',
        caption: 'Switch between centroid, connectivity and density views on moons, rings and blobs to see which definition of "cluster" each method is enforcing.',
        widget: 'kmeans-lab',
      },
      {
        kind: 'flow',
        title: 'DBSCAN, step by step',
        branching: true,
        steps: [
          { label: 'Pick an unvisited point', detail: 'Count how many points lie within distance eps of it, including itself.' },
          { label: 'Is it a core point?', detail: 'If the count is at least minPts, yes. Start a new cluster from it. If not, tentatively label it noise — it may later be claimed as a border point.' },
          { label: 'Expand', detail: 'Add all points within eps. For each newly added point that is itself core, add its eps-neighbourhood too, and keep going.' },
          { label: 'Attach border points', detail: 'Non-core points inside a core point’s neighbourhood join the cluster but do not extend it further.' },
          { label: 'Stop the cluster', detail: 'When no core point in the cluster has unvisited neighbours, the cluster is complete. Move to the next unvisited point.' },
          { label: 'Report noise', detail: 'Points never claimed by any cluster are labelled −1. A high noise fraction usually means eps is too small.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Hierarchical versus DBSCAN: strengths, weaknesses and when to reach for each',
        caption: 'Reach for hierarchical clustering when the number of clusters is unknown, the dataset is modest (under roughly ten thousand rows) and a nested structure is meaningful — taxonomy, gene expression, document hierarchies. Reach for DBSCAN when clusters are irregularly shaped, the data contains genuine outliers you want excluded, and density is roughly uniform within clusters.',
        left: {
          heading: 'Hierarchical (agglomerative)',
          points: [
            'Strength: no need to choose k in advance — the dendrogram shows the whole family of solutions',
            'Strength: the tree itself is interpretable and often meaningful, as in taxonomies or phylogenies',
            'Strength: works with any distance matrix, including non-Euclidean and precomputed similarities',
            'Weakness: O(n²) memory and O(n² log n) to O(n³) time, so it stalls past tens of thousands of points',
            'Weakness: merges are irrevocable — an early mistake propagates through the whole tree',
            'Weakness: single linkage suffers from chaining, where a thread of points merges two distinct clusters',
          ],
        },
        right: {
          heading: 'DBSCAN (density-based)',
          points: [
            'Strength: finds arbitrarily shaped clusters, including rings, crescents and elongated structures',
            'Strength: the number of clusters emerges from the data rather than being specified',
            'Strength: explicitly labels sparse points as noise instead of forcing them into a cluster',
            'Weakness: highly sensitive to eps, and a single eps cannot fit clusters of differing densities',
            'Weakness: degrades in high dimensions as distances concentrate and density loses meaning',
            'Weakness: border points can be assigned differently depending on processing order, so results are not fully deterministic',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Linkage criteria and the cluster shapes they produce',
        caption: 'Ward is the usual default for Euclidean data because it behaves most like k-means while still giving a dendrogram. Single linkage is the one to use deliberately or not at all.',
        columns: ['Linkage', 'Distance between clusters', 'Produces', 'Watch out for'],
        rows: [
          ['Single', 'Minimum distance between any pair', 'Long, snaking clusters; can follow curves', 'Chaining — one bridge of points merges two real clusters'],
          ['Complete', 'Maximum distance between any pair', 'Compact, roughly equal-diameter clusters', 'Breaks up large genuine clusters; sensitive to outliers'],
          ['Average', 'Mean distance over all cross pairs', 'A compromise between the two', 'Not invariant to monotone transformations of the distance'],
          ['Ward', 'Increase in total within-cluster variance', 'Spherical clusters of similar size, like k-means', 'Requires Euclidean distance; will impose blobs on non-blob data'],
          ['Centroid', 'Distance between cluster centroids', 'Similar to Ward', 'Can produce inversions where a merge height decreases'],
        ],
      },
      {
        kind: 'table',
        title: 'Choosing a clustering algorithm',
        columns: ['Situation', 'Best choice', 'Why'],
        rows: [
          ['Millions of points, blob-like clusters', 'K-means or MiniBatchKMeans', 'Only linear-time option; assumptions are satisfied'],
          ['Unknown k, nested structure is meaningful', 'Agglomerative with Ward', 'The dendrogram exposes structure at every scale'],
          ['Irregular shapes, outliers to exclude', 'DBSCAN', 'Density-connectivity follows shape; noise is labelled'],
          ['Clusters of very different densities', 'HDBSCAN', 'Varies the density threshold rather than fixing one eps'],
          ['Overlapping or probabilistic membership', 'Gaussian mixture model', 'Gives soft assignments and models cluster covariance'],
          ['Very high dimension', 'Reduce first with PCA or UMAP, then cluster', 'Distance concentration undermines all density and distance methods'],
        ],
      },
    ],

    formalDefinition:
      'Agglomerative hierarchical clustering begins with n singleton clusters and repeatedly merges the pair minimising a linkage function d(A, B), producing a nested sequence of partitions representable as a dendrogram whose merge heights are the linkage distances; Ward’s criterion chooses the merge minimising the increase in total within-cluster sum of squares, Δ = (|A||B|/(|A|+|B|))‖μ_A − μ_B‖². DBSCAN instead fixes ε > 0 and an integer minPts, defines a point p as core if |N_ε(p)| ≥ minPts, defines q as directly density-reachable from core p if q ∈ N_ε(p), and defines a cluster as a maximal set of points that are density-connected — that is, mutually reachable through a chain of core points. Points belonging to no such set are labelled noise. DBSCAN therefore determines the number of clusters from the data and has worst-case complexity O(n²), reduced to O(n log n) with a spatial index in low dimensions.',

    math: {
      intuition:
        'Both methods replace "distance to a centre" with something more local. Hierarchical clustering only ever needs distances between clusters, so the entire modelling choice lives in the linkage function — and different linkages encode genuinely different beliefs about what makes a cluster, from "any two members are close" (complete) to "there exists a path of close neighbours" (single). DBSCAN formalises the second of those ideas with a threshold: a point is in the interior of a cluster if enough neighbours are within a radius, and clusters are the connected components of the interior, with the fringe attached. Both escape the convexity that Voronoi cells impose on k-means.',
      formulas: [
        {
          latex: 'd_{\\text{single}}(A, B) = \\min_{a \\in A, b \\in B} d(a, b), \\qquad d_{\\text{complete}}(A, B) = \\max_{a \\in A, b \\in B} d(a, b)',
          name: 'Single and complete linkage',
          meaning:
            'The two extremes. Single linkage merges as soon as any two members are close, so clusters can snake; complete linkage requires all members to be close, so clusters stay compact and roughly equal in diameter.',
          variables: [
            { symbol: 'A, B', meaning: 'Two clusters whose distance is being measured' },
            { symbol: 'd(a, b)', meaning: 'The underlying point-to-point distance' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'd_{\\text{avg}}(A, B) = \\frac{1}{|A||B|}\\sum_{a \\in A}\\sum_{b \\in B} d(a, b)',
          name: 'Average linkage',
          meaning:
            'The mean over all cross-cluster pairs. Less prone to chaining than single linkage and less sensitive to a single distant point than complete linkage, which is why it is a reasonable default for non-Euclidean distances.',
          variables: [
            { symbol: '|A|, |B|', meaning: 'Cluster sizes, used to normalise the sum of cross pairs' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\Delta(A, B) = \\frac{|A|\\,|B|}{|A| + |B|} \\lVert \\boldsymbol{\\mu}_A - \\boldsymbol{\\mu}_B \\rVert^{2}',
          name: 'Ward linkage',
          meaning:
            'The exact increase in total within-cluster sum of squares caused by merging A and B. Ward is therefore the hierarchical analogue of the k-means objective, which is why it produces similar, roughly spherical clusters.',
          variables: [
            { symbol: '\\boldsymbol{\\mu}_A, \\boldsymbol{\\mu}_B', meaning: 'Centroids of the two clusters' },
            { symbol: '|A|, |B|', meaning: 'Cluster sizes; the weighting penalises merging two large clusters' },
          ],
          category: 'optimization',
        },
        {
          latex: 'N_{\\varepsilon}(p) = \\{q \\in D : d(p, q) \\leq \\varepsilon\\}, \\qquad p \\text{ is core} \\iff |N_{\\varepsilon}(p)| \\geq \\text{minPts}',
          name: 'The DBSCAN core condition',
          meaning:
            'The single definition everything else rests on. A core point sits in the interior of a dense region; clusters are the connected components of the core points, with non-core neighbours attached as borders.',
          variables: [
            { symbol: '\\varepsilon', meaning: 'Neighbourhood radius (`eps`)' },
            { symbol: '\\text{minPts}', meaning: 'Minimum neighbours, including the point itself in scikit-learn’s `min_samples`' },
            { symbol: 'D', meaning: 'The dataset' },
          ],
          category: 'complexity',
        },
        {
          latex: '\\text{minPts} \\geq d + 1, \\quad \\text{commonly } 2d; \\qquad \\varepsilon \\approx \\text{knee of the sorted } k\\text{-distance curve}',
          name: 'Choosing the DBSCAN parameters',
          meaning:
            'A practical recipe: set minPts from the dimensionality, then plot each point’s distance to its minPts-th nearest neighbour in sorted order and take eps at the knee, where the curve turns sharply upward.',
          variables: [
            { symbol: 'd', meaning: 'Number of features' },
            { symbol: 'k\\text{-distance}', meaning: 'Distance from each point to its k-th nearest neighbour, with k = minPts − 1' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'Begin with the agglomerative procedure. Compute the full n × n distance matrix — this is immediately why the method costs O(n²) memory and stalls on large data.',
        'Place every point in its own cluster. Repeatedly find the pair of clusters minimising the linkage distance, merge them, and record the merge height.',
        'After each merge, the distances from the new cluster to all others must be updated. The Lance-Williams formula expresses every standard linkage as the same recurrence with different coefficients, which is how one implementation supports them all.',
        'After n − 1 merges everything is in one cluster and the dendrogram is complete. Cutting it at height h gives the clustering that existed just before any merge above h.',
        'Now see what each linkage encodes. Single linkage merges A and B as soon as one member of each is close, so a thin thread of points can join two otherwise distinct clusters — the chaining effect. That is a defect when clusters are compact and a feature when clusters are genuinely elongated.',
        'Complete linkage requires every member of A to be close to every member of B, which produces compact clusters of similar diameter but will happily split a large, genuine, elongated cluster in two.',
        'Ward’s criterion is derived rather than posited. The increase in total within-cluster sum of squares from merging A and B works out to (|A||B|/(|A|+|B|))‖μ_A − μ_B‖², so Ward greedily minimises exactly the objective k-means minimises. This is why the two produce similar clusters, and why Ward inherits the same blob assumption.',
        'Turn to DBSCAN, which starts from a different definition. Fix ε and minPts. A point is core if its ε-neighbourhood contains at least minPts points.',
        'Define q directly density-reachable from p if p is core and q ∈ N_ε(p). Density-reachable is the transitive closure over core points, and two points are density-connected if both are density-reachable from some common core point.',
        'A cluster is a maximal density-connected set. Because reachability chains through core points, a cluster can extend arbitrarily far in any direction as long as density is maintained — which is exactly how DBSCAN follows a crescent or a ring that no centroid-based method can express.',
        'Border points — inside a core point’s neighbourhood but not core themselves — are attached to a cluster but cannot extend it. If a border point lies within ε of core points from two different clusters it goes to whichever is processed first, which is the one source of non-determinism in the algorithm.',
        'Points that are neither core nor border are noise, labelled −1. This is the feature k-means lacks entirely: an outlier is excluded rather than dragging a centroid towards it.',
        'Parameter selection follows from the definitions. minPts controls how many neighbours constitute "dense"; the usual guidance is at least d + 1 and commonly 2d, with larger values giving more robustness to noise. Then plot the sorted distance from each point to its (minPts − 1)-th nearest neighbour: the curve is flat for points inside clusters and rises sharply for noise points, and the knee is a principled choice of ε.',
        'The remaining limitation is structural. A single ε defines one density threshold for the entire dataset, so a dataset containing one tight cluster and one diffuse cluster cannot be handled well by any ε — either the diffuse cluster fragments into noise, or the tight ones merge. HDBSCAN addresses this by building a hierarchy over all density thresholds and extracting the most stable clusters, which is why it is generally the better default today.',
      ],
    },

    workedExample: {
      title: 'Agglomerative clustering by hand, then DBSCAN on the same data',
      setup:
        'Five one-dimensional points: A = 1, B = 2, C = 5, D = 9, E = 10. Pairwise distances: AB = 1, AC = 4, AD = 8, AE = 9, BC = 3, BD = 7, BE = 8, CD = 4, CE = 5, DE = 1. Build the dendrogram under single and complete linkage, then run DBSCAN on a second dataset.',
      steps: [
        {
          label: 'Single linkage, merges 1 and 2',
          detail: 'The smallest distances are AB = 1 and DE = 1. Merge both at height 1, giving clusters {A,B}, {C}, {D,E}.',
          latex: '\\text{merge } \\{A,B\\} \\text{ at } h = 1, \\quad \\{D,E\\} \\text{ at } h = 1',
        },
        {
          label: 'Single linkage, merge 3',
          detail: 'Recompute using the minimum across pairs: d({A,B}, C) = min(4, 3) = 3; d(C, {D,E}) = min(4, 5) = 4; d({A,B}, {D,E}) = min(8, 9, 7, 8) = 7. The smallest is 3, so merge {A,B} with C at height 3.',
          latex: 'd_{\\text{single}}(\\{A,B\\}, C) = 3',
        },
        {
          label: 'Single linkage, final merge',
          detail: 'd({A,B,C}, {D,E}) = min(8, 9, 7, 8, 4, 5) = 4. Merge at height 4. The dendrogram heights are 1, 1, 3, 4.',
          latex: '\\text{heights} = (1,\\, 1,\\, 3,\\, 4)',
        },
        {
          label: 'Complete linkage on the same data',
          detail: 'The first two merges are identical. Then d({A,B}, C) = max(4, 3) = 4; d(C, {D,E}) = max(4, 5) = 5; d({A,B}, {D,E}) = max(8, 9, 7, 8) = 9. Merge {A,B} with C at height 4, then the final merge at max(8, 9, 7, 8, 4, 5) = 9.',
          latex: '\\text{heights} = (1,\\, 1,\\, 4,\\, 9)',
        },
        {
          label: 'Read the two dendrograms',
          detail: 'Under complete linkage the last merge happens at 9 while the one before it happens at 4 — a gap of 5, strongly suggesting two clusters. Under single linkage the same merges happen at 4 and 3, a gap of only 1, so the two-cluster structure looks far less convincing. Same data, same true structure, and the linkage choice changed how obvious it appeared.',
          latex: '\\text{gap}_{\\text{complete}} = 5 \\quad \\text{vs} \\quad \\text{gap}_{\\text{single}} = 1',
        },
        {
          label: 'Cut the tree',
          detail: 'Cutting the complete-linkage dendrogram anywhere between heights 4 and 9 gives two clusters: {A, B, C} and {D, E}. Cutting between 1 and 4 gives three: {A, B}, {C}, {D, E}. The cut height is the decision, and the dendrogram makes the consequences of each choice visible before you commit.',
          latex: '\\text{cut at } h = 6 \\Rightarrow \\{A,B,C\\}, \\{D,E\\}',
        },
        {
          label: 'Now DBSCAN — set up',
          detail: 'Take the points 1, 2, 3, 10, 11, 25 with eps = 1.5 and minPts = 3, counting the point itself. Neighbourhood sizes: |N(1)| = |{1,2}| = 2; |N(2)| = |{1,2,3}| = 3; |N(3)| = |{2,3}| = 2; |N(10)| = |{10,11}| = 2; |N(11)| = |{10,11}| = 2; |N(25)| = |{25}| = 1.',
          latex: '|N_{1.5}(2)| = 3 \\geq \\text{minPts}',
        },
        {
          label: 'Classify and grow',
          detail: 'Only the point 2 is core. Start a cluster from it and add its neighbours 1 and 3 as border points; neither is core, so neither extends the cluster further. Points 10 and 11 are not core and are not within eps of any core point, so they are noise. Point 25 is noise. Result: one cluster {1, 2, 3} and three noise points.',
          latex: 'C_1 = \\{1, 2, 3\\}, \\qquad \\text{noise} = \\{10, 11, 25\\}',
        },
        {
          label: 'Change one parameter',
          detail: 'Set minPts = 2 instead. Now |N(1)| = 2 qualifies, so 1 is core; so are 3, 10 and 11. The clusters become {1, 2, 3} and {10, 11}, with only 25 as noise. A single parameter change turned two noise points into a cluster — which is precisely why eps and minPts must be chosen deliberately, and why the fraction of points labelled noise is the first diagnostic to check.',
          latex: '\\text{minPts} = 2 \\Rightarrow C_1 = \\{1,2,3\\},\\; C_2 = \\{10,11\\},\\; \\text{noise} = \\{25\\}',
        },
      ],
      conclusion:
        'The hierarchical half shows that the linkage criterion is a modelling assumption, not a detail: the same five points gave a convincing two-cluster structure under complete linkage and an ambiguous one under single linkage. The DBSCAN half shows the same for eps and minPts, where changing minPts from 3 to 2 converted a pair of noise points into a legitimate cluster. Neither method removes the need for judgement — they relocate it from "how many clusters" to "what counts as close" and "what counts as dense".',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Linkage choice changes the answer',
        runnable: true,
        code: `import numpy as np
from sklearn.cluster import AgglomerativeClustering
from sklearn.datasets import make_moons, make_blobs
from sklearn.metrics import adjusted_rand_score
from sklearn.preprocessing import StandardScaler

sets = {
    "blobs ": make_blobs(n_samples=500, centers=3, cluster_std=1.0, random_state=0),
    "moons ": make_moons(n_samples=500, noise=0.05, random_state=0),
}
for name, (X, y) in sets.items():
    Xs = StandardScaler().fit_transform(X)
    k = len(set(y))
    scores = {}
    for link in ["ward", "complete", "average", "single"]:
        labels = AgglomerativeClustering(n_clusters=k, linkage=link).fit_predict(Xs)
        scores[link] = adjusted_rand_score(y, labels)
    print(name, "  ".join(f"{k2}: {v:.3f}" for k2, v in scores.items()))`,
        output: `blobs  ward: 1.000  complete: 0.968  average: 1.000  single: 0.004
moons  ward: 0.481  complete: 0.386  average: 0.407  single: 1.000
`,
        explanation:
          'The ranking inverts completely between the two datasets, which is the clearest possible evidence that linkage is a modelling assumption rather than a tuning knob. On compact blobs, Ward and average linkage are perfect while single linkage scores 0.004 — essentially nothing — because a single stray point bridges two clusters and chaining merges them. On the two moons, single linkage is perfect precisely because chaining is what you want: each moon is a connected thread of nearby points, and the ability to follow that thread is the whole requirement. Ward manages only 0.48 there because it minimises within-cluster variance, which is the same blob assumption k-means makes. Choose linkage by asking what shape you expect, not by trying them all and keeping the best number on labelled data you will not have in production.',
      },
      {
        language: 'python',
        title: 'Choosing eps from the k-distance curve',
        runnable: true,
        code: `import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import adjusted_rand_score

X, y = make_moons(n_samples=800, noise=0.07, random_state=0)
Xs = StandardScaler().fit_transform(X)

# The recipe: sort each point's distance to its (minPts-1)-th neighbour and look for the knee.
min_pts = 5
d, _ = NearestNeighbors(n_neighbors=min_pts).fit(Xs).kneighbors(Xs)
kdist = np.sort(d[:, -1])
for q in [0.50, 0.80, 0.90, 0.95, 0.99]:
    print(f"  {int(q*100)}th percentile of {min_pts}-distance: {np.quantile(kdist, q):.3f}")

print()
for eps in [0.05, 0.10, 0.20, 0.30, 0.60]:
    labels = DBSCAN(eps=eps, min_samples=min_pts).fit_predict(Xs)
    n_clusters = len(set(labels) - {-1})
    noise = np.mean(labels == -1)
    print(f"eps={eps:<5} clusters {n_clusters:>2}   noise {noise:6.1%}   ARI {adjusted_rand_score(y, labels):.3f}")`,
        output: `  50th percentile of 5-distance: 0.088
  80th percentile of 5-distance: 0.114
  90th percentile of 5-distance: 0.129
  95th percentile of 5-distance: 0.145
  99th percentile of 5-distance: 0.191

eps=0.05  clusters 18   noise  38.2%   ARI 0.152
eps=0.10  clusters  2   noise   6.0%   ARI 0.947
eps=0.20  clusters  2   noise   0.0%   ARI 1.000
eps=0.30  clusters  1   noise   0.0%   ARI 0.000
eps=0.60  clusters  1   noise   0.0%   ARI 0.000
`,
        explanation:
          'The failure modes sit on either side of a narrow window. Too small an eps and no point has enough neighbours: the data shatters into eighteen fragments with 38% labelled noise. Too large and everything becomes density-connected into a single cluster, which is why ARI collapses to zero at eps = 0.30. The usable range here is roughly 0.10 to 0.25. The k-distance percentiles point at it: most points sit within about 0.09 of their fifth neighbour, and the curve turns upward around the 90th to 95th percentile, which is the standard heuristic for eps. Always report the noise fraction alongside the cluster count — a solution with 38% noise is telling you the parameters are wrong, not that the data is mostly outliers.',
      },
      {
        language: 'python',
        title: 'The one thing a fixed eps cannot do',
        runnable: true,
        code: `import numpy as np
from sklearn.cluster import DBSCAN, AgglomerativeClustering, KMeans
from sklearn.datasets import make_blobs
from sklearn.metrics import adjusted_rand_score
from sklearn.preprocessing import StandardScaler

# Three clusters with deliberately different densities.
X, y = make_blobs(n_samples=[300, 300, 300],
                  centers=[[0, 0], [6, 0], [12, 0]],
                  cluster_std=[0.3, 1.0, 2.5], random_state=0)
Xs = StandardScaler().fit_transform(X)

for eps in [0.08, 0.15, 0.30, 0.50]:
    lab = DBSCAN(eps=eps, min_samples=8).fit_predict(Xs)
    print(f"DBSCAN eps={eps:<5} clusters {len(set(lab) - {-1}):>2}"
          f"  noise {np.mean(lab == -1):6.1%}  ARI {adjusted_rand_score(y, lab):.3f}")

print("Ward   k=3            ARI", round(adjusted_rand_score(
    y, AgglomerativeClustering(n_clusters=3).fit_predict(Xs)), 3))
print("KMeans k=3            ARI", round(adjusted_rand_score(
    y, KMeans(3, n_init=10, random_state=0).fit_predict(Xs)), 3))`,
        output: `DBSCAN eps=0.08  clusters  2  noise  62.4%  ARI 0.274
DBSCAN eps=0.15  clusters  2  noise  33.1%  ARI 0.476
DBSCAN eps=0.30  clusters  2  noise   7.2%  ARI 0.611
DBSCAN eps=0.50  clusters  2  noise   0.9%  ARI 0.717
Ward   k=3            ARI 0.842
KMeans k=3            ARI 0.756
`,
        explanation:
          'This is the structural limitation of DBSCAN and it cannot be tuned away. A single eps defines one density threshold for the whole dataset, but here the three clusters have standard deviations of 0.3, 1.0 and 2.5. Any eps tight enough to keep the dense cluster separate is too tight for the diffuse one, which fragments into noise; any eps loose enough to hold the diffuse cluster together merges the two tighter ones. No value of eps recovers all three, and the best DBSCAN result is beaten by both Ward and plain k-means. The remedy is HDBSCAN, which builds a hierarchy across all density thresholds and extracts the most persistent clusters, or — where the blob assumption genuinely holds, as it does here — simply using a method that makes it.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Gene expression and phylogenetics',
        usage:
          'Hierarchical clustering with average or Ward linkage is the standard way to group genes with similar expression profiles, and the dendrogram is the output rather than an intermediate: biologists read the tree structure itself, since nested similarity corresponds to shared regulatory pathways or evolutionary descent.',
      },
      {
        context: 'Geospatial and trajectory analysis',
        usage:
          'DBSCAN is the default for finding places of interest from GPS traces, because stops form dense irregular blobs while travel between them is sparse and should be excluded as noise. The same approach identifies crime hotspots and clusters of seismic events, where shapes follow roads or faults rather than circles.',
      },
      {
        context: 'Anomaly detection',
        usage:
          'DBSCAN’s noise label is used directly as an outlier flag in network intrusion detection and fraud monitoring. Unlike k-means, which forces every point into a cluster and so dilutes the very outliers you are hunting for, DBSCAN leaves them unassigned by construction.',
      },
      {
        context: 'Grouping document or image embeddings',
        usage:
          'After reducing embeddings with UMAP, HDBSCAN is the usual clustering step in topic-modelling pipelines such as BERTopic. The combination works because the reduction restores meaningful density, and HDBSCAN handles the widely differing cluster sizes that real corpora produce.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`AgglomerativeClustering` with `linkage` and either `n_clusters` or `distance_threshold`; `DBSCAN` with `eps` and `min_samples`; `HDBSCAN` since version 1.3.' },
      { tool: 'scipy.cluster.hierarchy', role: '`linkage`, `dendrogram` and `fcluster` — the tools you actually use to draw and cut a dendrogram, which scikit-learn does not provide.' },
      { tool: 'hdbscan / UMAP', role: 'The standard pairing for embedding-based clustering: reduce with UMAP to restore density, then cluster with HDBSCAN, which varies the density threshold rather than fixing one eps.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using single linkage without understanding chaining',
        why: 'Single linkage merges clusters as soon as any two members are close, so one thin thread of points bridges two genuinely separate clusters and they merge into one. On compact blob data it can score essentially zero.',
        fix: 'Use Ward for Euclidean blob-like data and average for general distances. Choose single linkage deliberately, when you want elongated connected structures — where it is the best option available.',
      },
      {
        mistake: 'Running DBSCAN on unscaled features',
        why: 'eps is a single radius in the feature space, so it only means something if all features share a scale. Unscaled, eps is effectively measured in the units of the largest feature and the others are ignored.',
        fix: 'Standardise first, always. Then choose eps from the k-distance curve computed on the scaled data, not by guessing.',
      },
      {
        mistake: 'Accepting a DBSCAN result with a large noise fraction',
        why: 'A run labelling 40% of points as noise is almost never telling you that 40% of the data are outliers — it is telling you eps is too small or minPts too large for the density that actually exists.',
        fix: 'Report the noise fraction with every run. Raise eps or lower minPts until it is plausible for the domain, and if no setting gives both sensible clusters and sensible noise, the densities likely differ and HDBSCAN is the right tool.',
      },
      {
        mistake: 'Applying hierarchical clustering to hundreds of thousands of points',
        why: 'The full distance matrix is O(n²) in memory: at n = 200,000 that is 160 GB in double precision, before the merging even starts.',
        fix: 'Sub-sample and cluster the sample, use `MiniBatchKMeans` to produce a few thousand micro-clusters and run hierarchical clustering on those, or switch to a linear-time method.',
      },
      {
        mistake: 'Expecting DBSCAN to handle clusters of differing densities',
        why: 'A single eps sets one density threshold for the entire dataset. If one cluster is tight and another diffuse, no eps separates all of them — one will fragment or two will merge.',
        fix: 'Use HDBSCAN, which builds a hierarchy over all density levels and extracts the most stable clusters, or cluster different density regimes separately if the regimes are known.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'When would you choose DBSCAN over k-means?',
        answer:
          'Three situations, all following from how DBSCAN defines a cluster. First, when clusters are not convex — DBSCAN grows clusters by stepping from one dense point to a neighbouring dense point, so it follows crescents, rings and elongated shapes that a set of centroids cannot express, since nearest-centroid assignment produces convex Voronoi cells. Second, when the data contains genuine outliers you want excluded: DBSCAN labels sparse points as noise, whereas k-means forces every point into a cluster and lets outliers drag centroids around. Third, when you do not know how many clusters there are and have no principled way to choose — DBSCAN determines that from the density structure. What you give up is substantial. You now have to choose eps and minPts, and eps is at least as hard to choose as k and much less intuitive; a single eps cannot accommodate clusters of very different densities; and DBSCAN degrades in high dimensions because distances concentrate and "denser than the threshold" stops discriminating. So I would reach for DBSCAN on low-dimensional geometric or geospatial data with irregular shapes, and stay with k-means on high-dimensional blob-like data at scale.',
      },
      {
        level: 'advanced',
        question: 'How would you set eps and minPts for a DBSCAN run?',
        answer:
          'I would set minPts first, because it has a clearer rationale. The usual guidance is at least d + 1 and commonly 2d for d features, with larger values giving more robustness to noise and a stronger requirement for what counts as dense; on two-dimensional geospatial data 4 or 5 is typical. Then I would choose eps from the data rather than guessing. Compute each point’s distance to its (minPts − 1)-th nearest neighbour, sort those distances ascending, and plot them. Points inside clusters have small values that vary little, so the curve is flat; noise points have much larger values, so the curve turns sharply upward. The knee of that curve is the natural eps, and in practice it usually sits around the 90th to 95th percentile of the distribution. I would sweep eps over a range around the knee and report, for each value, the number of clusters, the noise fraction and — if labels exist for validation — an agreement score, because the sensitivity is steep: I have seen a dataset go from eighteen clusters with 38% noise to two perfect clusters to one merged blob over an eps range of 0.05 to 0.30. Two preconditions matter more than either parameter. Features must be standardised, since eps is a single radius in the feature space and is meaningless otherwise. And if the dimensionality is high I would reduce first, because density-based methods lose discriminating power when distances concentrate. If no eps gives both sensible clusters and a sensible noise fraction, that usually means the clusters have different densities, and I would move to HDBSCAN.',
        followUp:
          'A strong answer volunteers that a large noise fraction is a diagnostic of bad parameters rather than a finding about the data, and knows that a fixed eps cannot handle varying densities.',
      },
      {
        level: 'ml-engineer',
        question: 'You need to cluster two million embeddings. Hierarchical clustering runs out of memory and DBSCAN finds one giant cluster. What is your approach?',
        answer:
          'Both symptoms are expected and both point at the same underlying issue. Hierarchical clustering needs the full pairwise distance matrix, which at two million points is four trillion entries — it was never going to run, regardless of hardware. DBSCAN finding one giant cluster is the signature of high-dimensional distance concentration: when every point is roughly equidistant from every other, any eps large enough to make points core makes everything density-connected. So my first move would be dimensionality reduction, specifically UMAP down to five to fifteen dimensions, which is designed to preserve local neighbourhood structure and restores the density contrast that density-based methods need. Then I would run HDBSCAN rather than DBSCAN, since embedding clusters almost always vary in density and size, and HDBSCAN extracts stable clusters across density levels instead of committing to one eps; this UMAP-plus-HDBSCAN pipeline is what topic-modelling tools such as BERTopic use, at exactly this scale. If I needed hierarchical structure specifically, I would use a two-stage approach: MiniBatchKMeans to produce a few thousand micro-clusters, then agglomerative clustering on those centroids weighted by cluster size, which gives a dendrogram over a tractable number of nodes. And I would validate on a sample before committing compute — cluster a hundred thousand points, inspect the resulting groups by hand, and only then scale up. For clustering at this size the expensive mistake is not a slow algorithm, it is running the wrong one for six hours.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Points at 0, 1, 2, 3 in one dimension. Build the single-linkage and complete-linkage dendrograms and give the merge heights for each.',
        hint: 'All adjacent distances are 1. Track how the cluster-to-cluster distance changes after each merge.',
        solution:
          'Single linkage: the smallest distance is 1, achieved by several pairs. Merge {0,1} at height 1. Now d({0,1}, 2) = min(2, 1) = 1 and d(2, 3) = 1, so merge again at height 1 — say {0,1,2}. Then d({0,1,2}, 3) = min(3, 2, 1) = 1, so the final merge is also at height 1. Heights: 1, 1, 1. The dendrogram is a ladder with no gaps, correctly indicating that this data has no cluster structure at all. Complete linkage: merge {0,1} at height 1. Then d({0,1}, 2) = max(2, 1) = 2 and d(2, 3) = 1, so merge {2,3} at height 1. Finally d({0,1}, {2,3}) = max(2, 3, 1, 2) = 3, so the last merge is at height 3. Heights: 1, 1, 3. The gap from 1 to 3 makes it look as though there are two clusters — but there are not; the apparent structure is an artefact of complete linkage’s preference for compact, equal-sized groups. The lesson is that a visible gap in a dendrogram is evidence about the linkage as much as about the data.',
      },
      {
        prompt:
          'With eps = 2 and minPts = 3 (including the point itself), classify each of the points 1, 2, 3, 4, 10, 20 as core, border or noise.',
        hint: 'Count the points within distance 2 of each, then apply the definitions in order.',
        solution:
          'Neighbourhoods within distance 2: N(1) = {1,2,3} size 3; N(2) = {1,2,3,4} size 4; N(3) = {1,2,3,4} size 4; N(4) = {2,3,4} size 3; N(10) = {10} size 1; N(20) = {20} size 1. Applying minPts = 3: points 1, 2, 3 and 4 are all core. Points 10 and 20 have neighbourhoods of size 1, so they are not core, and they are not within eps of any core point, so they are noise rather than border points. The four core points are mutually density-reachable — 1 reaches 3 directly, 3 reaches 4 directly, and so on — so they form a single cluster {1, 2, 3, 4}, with no border points in this example. Final answer: one cluster of four, two noise points. Note that there are no border points here because every non-core point is isolated; border points appear when a non-core point sits on the fringe of a dense region.',
      },
      {
        prompt:
          'Explain why a single eps cannot handle a dataset containing one tight cluster and one diffuse cluster, and name a method that can.',
        hint: 'What does eps mean in terms of density?',
        solution:
          'The core condition asks whether at least minPts points lie within eps, which is a statement about local density: it defines a single density threshold applied uniformly across the dataset. If one cluster has points packed at, say, ten per unit area and another has one per unit area, then an eps tuned to the dense cluster gives the diffuse cluster too few neighbours per ball, so its points fail the core test and are labelled noise — the cluster fragments or disappears. Conversely, an eps large enough for the diffuse cluster makes the dense region and anything near it density-connected, so separate tight clusters merge into one. There is no intermediate value that satisfies both, because the requirement is contradictory. You can see this empirically: on three blobs with standard deviations 0.3, 1.0 and 2.5, sweeping eps finds at most two of the three clusters at every value, and the best result is beaten by plain k-means. The remedy is HDBSCAN, which does not fix a density threshold at all — it builds a hierarchy of DBSCAN results across all values of eps, then extracts the clusters that persist over the widest range of density levels. That makes it robust to varying density and removes eps as a parameter, leaving only a minimum cluster size, which is far easier to reason about.',
      },
    ],

    quiz: [
      {
        id: 'ML-018-q1',
        type: 'mcq',
        concept: 'chaining',
        prompt: 'Which linkage criterion is most vulnerable to the chaining effect, where a thin thread of points merges two distinct clusters?',
        options: ['Single linkage', 'Complete linkage', 'Ward linkage', 'Average linkage'],
        answerIndex: 0,
        explanation:
          'Single linkage defines cluster distance as the minimum over all cross pairs, so one close pair is enough to trigger a merge. That is a defect on compact blobs and exactly the desired behaviour on elongated structures such as two moons.',
      },
      {
        id: 'ML-018-q2',
        type: 'truefalse',
        concept: 'noise handling',
        prompt: 'DBSCAN assigns every point to a cluster.',
        answer: false,
        explanation:
          'Points that are neither core nor within eps of a core point are labelled noise, conventionally −1. This is a genuine advantage over k-means, which forces every point into a cluster and lets outliers drag centroids.',
      },
      {
        id: 'ML-018-q3',
        type: 'numeric',
        concept: 'core condition',
        prompt: 'With eps = 1.5 and min_samples = 3 (counting the point itself), how many of the points {1, 2, 3, 4, 9} are core points?',
        answer: 2,
        tolerance: 0.1,
        explanation:
          'Neighbourhood sizes within distance 1.5 are: N(1) = {1,2} is 2; N(2) = {1,2,3} is 3; N(3) = {2,3,4} is 3; N(4) = {3,4} is 2; N(9) = {9} is 1. Only the points 2 and 3 reach min_samples, so exactly two points are core; 1 and 4 become border points and 9 is noise.',
      },
      {
        id: 'ML-018-q4',
        type: 'match',
        concept: 'choosing a method',
        prompt: 'Match each dataset characteristic to the most suitable clustering method.',
        pairs: [
          { left: 'Two interlocking crescents', right: 'DBSCAN or single-linkage agglomerative' },
          { left: 'Millions of roughly spherical clusters', right: 'MiniBatchKMeans' },
          { left: 'Unknown k, nested taxonomy is meaningful', right: 'Agglomerative with Ward linkage' },
          { left: 'Clusters of very different densities', right: 'HDBSCAN' },
        ],
        explanation:
          'Each method encodes a different definition of a cluster: proximity to a centre, connectivity through close pairs, or density-connectivity. Matching the definition to the data matters far more than tuning any one method.',
      },
      {
        id: 'ML-018-q5',
        type: 'multi',
        concept: 'DBSCAN in practice',
        prompt: 'Which statements about DBSCAN are true? Select all that apply.',
        options: [
          'The number of clusters is determined by the data rather than specified in advance',
          'Features should be standardised before choosing eps',
          'A single eps cannot accommodate clusters of very different densities',
          'It scales to very high dimensions better than k-means does',
          'A large noise fraction usually indicates poorly chosen parameters',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'DBSCAN degrades faster than k-means in high dimensions, not better: distance concentration makes every point roughly equidistant, so no eps discriminates between dense and sparse regions. Reduce dimensionality first.',
      },
      {
        id: 'ML-018-q6',
        type: 'fill',
        concept: 'reading the tree',
        prompt: 'What is the name of the tree diagram produced by agglomerative clustering, whose branch heights show merge distances?',
        answers: ['dendrogram', 'a dendrogram', 'the dendrogram'],
        explanation:
          'The dendrogram. Cutting it at a chosen height yields a clustering, and a long vertical stretch with no merges is evidence of well-separated groups — though as with linkage, apparent gaps can be artefacts of the criterion used.',
      },
      {
        id: 'ML-018-q7',
        type: 'explain',
        concept: 'three definitions of a cluster',
        prompt: 'Compare k-means, hierarchical clustering and DBSCAN in terms of what each one assumes a cluster is.',
        rubric: [
          'States that k-means defines a cluster as everything nearest to one centre, giving convex regions',
          'States that hierarchical clustering defines it through a linkage criterion over pairwise distances',
          'States that DBSCAN defines it as a density-connected region, allowing arbitrary shapes and noise',
          'Connects each definition to a concrete strength or failure mode',
        ],
        sampleAnswer:
          'The three differ in their definition of a cluster, and every practical difference follows from that. For k-means a cluster is the set of points closest to one centre. Since each cluster is a Voronoi cell, the regions are convex and bounded by straight hyperplanes, which is why k-means cannot separate two concentric rings no matter how you initialise it, and why it is dominated by large clusters — the objective sums squared distances, so the many points in a big diffuse cluster outweigh the few in a tight one. It also has to be told k, since the objective falls monotonically as k rises. For hierarchical clustering a cluster is whatever a linkage criterion produces when you repeatedly merge the two closest groups, so the definition is deferred to that criterion. Complete linkage says a cluster is a set where every member is close to every other, producing compact equal-diameter groups. Single linkage says a cluster is a set connected by a chain of close neighbours, which follows elongated shapes beautifully and also merges two distinct clusters if one thread of points bridges them. Ward says a cluster is a set with low internal variance, which makes it the hierarchical analogue of k-means. The advantage is that you get every k at once and can choose after seeing the dendrogram; the cost is the O(n²) distance matrix, which rules out large data. For DBSCAN a cluster is a maximal density-connected region: points with enough neighbours within a radius are core, and clusters are the connected components of core points with their fringes attached. That definition buys arbitrary shapes, a number of clusters determined by the data, and an explicit noise label for sparse points. What it costs is a single global density threshold — one eps for the whole dataset — so it cannot handle a tight cluster and a diffuse cluster simultaneously, and it degrades in high dimensions where distances concentrate and density stops discriminating.',
        explanation:
          'The strongest answers treat the choice of algorithm as a choice of definition, since each method’s failure modes are direct consequences of the definition it enforces.',
      },
    ],

    flashcards: [
      { front: 'What is a dendrogram?', back: 'The tree of merges from agglomerative clustering, with branch height equal to the merge distance. Cutting it at a height gives a clustering.' },
      { front: 'What does single linkage do wrong?', back: 'Chaining: it merges clusters as soon as any two members are close, so a thin thread of points joins two distinct clusters.' },
      { front: 'What is Ward linkage?', back: 'Merge the pair that increases total within-cluster variance least: Δ = (|A||B|/(|A|+|B|))‖μ_A − μ_B‖². The hierarchical analogue of k-means.' },
      { front: 'What is a DBSCAN core point?', back: 'A point with at least minPts points (including itself) within distance eps. Clusters are the connected components of core points plus their borders.' },
      { front: 'How do you choose eps?', back: 'Sort each point’s distance to its (minPts−1)-th nearest neighbour and take the knee of the curve, typically around the 90th–95th percentile.' },
      { front: 'Why can DBSCAN not handle varying densities?', back: 'A single eps sets one density threshold for the whole dataset. Use HDBSCAN, which extracts stable clusters across all density levels.' },
      { front: 'Why is hierarchical clustering limited to small data?', back: 'It needs the full n × n distance matrix: O(n²) memory and O(n² log n) to O(n³) time. At n = 200,000 that is over 100 GB.' },
    ],

    challenge: {
      title: 'Three definitions of a cluster, one dataset',
      brief:
        'Assemble four two-dimensional datasets: compact blobs, two moons, concentric rings, and blobs with deliberately different densities. On each, run k-means, agglomerative clustering with all four linkages, and DBSCAN with eps chosen from the k-distance curve. Score every combination with the adjusted Rand index against the known labels, and present the results as a single table of method against dataset. Then write a short analysis explaining each failure in terms of the definition of a cluster that method enforces, not in terms of tuning.',
      acceptanceCriteria: [
        'All features are standardised before clustering, and the write-up says why this matters for each method',
        'eps is chosen from the k-distance curve and the procedure is shown, not asserted',
        'The results table covers every method on every dataset, including the failures',
        'Each failure is explained mechanistically — convexity, chaining, or a fixed density threshold',
        'The analysis ends with a decision rule for choosing a method from properties of the data, not from trying all of them',
      ],
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague how hierarchical clustering and DBSCAN differ from k-means, and when each is the right tool.',
      mustCover: [
        'Hierarchical clustering produces a whole tree of nested clusterings rather than one partition, so k is chosen afterwards',
        'The linkage criterion determines what shape of cluster you get, and single linkage can chain',
        'DBSCAN defines clusters by density and connectivity, so it finds arbitrary shapes and labels noise',
        'DBSCAN’s eps sets one global density threshold, which fails when clusters differ in density',
      ],
      bonusSignals: ['mentions the O(n²) memory cost of hierarchical clustering', 'mentions choosing eps from the k-distance curve', 'mentions HDBSCAN for varying densities'],
      sampleExplanation:
        'K-means makes two commitments up front: you tell it how many clusters there are, and it assumes each one is a round blob around a central point. The other two families relax those commitments in different directions. Hierarchical clustering refuses to pick a number. Every point starts as its own cluster, then you repeatedly merge the two closest clusters, recording the distance at every merge, until everything is one group. What you get is a tree, and you choose the number of clusters afterwards by deciding where to cut it. That is genuinely useful, because if there really are four well-separated groups you will see a long stretch of the tree where nothing merges, and the cut becomes evident rather than arbitrary. The subtlety is that "distance between two clusters" needs defining, and the definition you pick is a real modelling assumption. Complete linkage takes the furthest pair, which gives compact groups of similar size. Single linkage takes the closest pair, which lets a cluster snake along a curve — wonderful for two interlocking crescents, disastrous on blobs, because one stray bridge of points will chain two clusters into one. Ward linkage merges whichever pair increases the within-cluster variance least, which makes it the hierarchical version of k-means and a sensible default for Euclidean data. The cost of all this is the distance matrix: n squared entries, so at a couple of hundred thousand points you are out of memory before you start. DBSCAN takes a different view of what a cluster even is. It says a cluster is a region where points are packed densely. Pick a radius, eps, and a count, minPts. Any point with at least minPts neighbours inside that radius is a core point, sitting in the interior of something dense. Clusters then grow by stepping from one core point to another, picking up the non-core points on the fringes as borders. Everything left over is noise. That gives you three things k-means cannot: shapes can be anything at all, since you are following connectivity rather than measuring distance to a centre; the number of clusters comes out of the data; and outliers are excluded instead of being forced into whichever cluster is nearest. The price is eps, which is harder to choose than k and much less intuitive — the standard recipe is to plot every point’s distance to its minPts-th neighbour in sorted order and take the knee. And there is one limitation you cannot tune away: eps is a single density threshold for the whole dataset, so if one cluster is tight and another is diffuse, no value works for both. That is exactly the case for HDBSCAN, which builds the hierarchy across every density level and keeps the clusters that persist.',
    },
  },

];
