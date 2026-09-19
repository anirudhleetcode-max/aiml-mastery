import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'STAT-001',
    domain: 'STAT',
    module: 'Probability',
    topic: 'Sample spaces and events',
    title: 'Probability, Sample Spaces and Events',
    slug: 'probability-sample-spaces-events',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: [],
    tags: ['probability', 'sample space', 'event', 'frequentist', 'bayesian', 'uncertainty'],

    learningObjectives: [
      'List the sample space of a simple random experiment and describe an event as a subset of it',
      'Compute the probability of an event by counting equally likely outcomes',
      'Explain probability both as a long-run frequency and as a degree of belief, and say when each reading applies',
      'Recognise where a machine learning model is quietly making a probability claim',
    ],

    terminology: [
      {
        term: 'Random experiment',
        definition:
          'Any procedure whose outcome is not known in advance but whose set of possible outcomes is known: rolling a die, serving an advert, asking a classifier for a prediction.',
        simple: 'Something you do where you know what could happen but not what will happen.',
      },
      {
        term: 'Sample space',
        definition:
          'The set of every outcome the experiment can produce, written as the Greek capital omega. Outcomes must be mutually exclusive and cover every possibility.',
        simple: 'The complete list of things that could happen, with nothing missing and nothing counted twice.',
      },
      {
        term: 'Event',
        definition:
          'Any subset of the sample space — a collection of outcomes you care about, such as "the die shows an even number".',
        simple: 'A description of some of the possible results, like "an even number".',
      },
      {
        term: 'Probability',
        definition:
          'A number between 0 and 1 assigned to an event, where 0 means impossible, 1 means certain, and the probabilities of all outcomes in the sample space sum to 1.',
        simple: 'A score from 0 to 1 saying how likely something is.',
      },
      {
        term: 'Frequentist interpretation',
        definition:
          'Probability is the fraction of times an event occurs if the experiment is repeated indefinitely under identical conditions.',
        simple: 'If you did it a million times, how often would it happen?',
      },
      {
        term: 'Bayesian interpretation',
        definition:
          'Probability is a numerical measure of how strongly a rational agent believes a proposition, given the evidence it currently holds.',
        simple: 'How confident you are, written as a number.',
      },
    ],

    simpleExplanation:
      "Some things you cannot predict. Flip a coin and you genuinely do not know whether it will land heads. But you are not completely in the dark either: you know it will be heads or tails and not a cabbage, and you know the two are equally likely. Probability is the language for exactly that situation — knowing the menu of possible results without knowing which one you will get. The full menu is called the sample space. Anything you might care about, like \"heads\" or \"an even number\", is a slice of that menu and is called an event. The probability of an event is how much of the menu it covers, written as a number from 0 (never happens) to 1 (always happens). Half the coin menu is heads, so the probability is 0.5. Three of the six faces of a die are even, so the probability of an even roll is 3 out of 6. That is the entire idea, and everything else in this domain is built on it.",

    whyItExists:
      'Almost nothing worth predicting is certain: whether an email is spam, whether a patient has a disease, whether a user clicks. Probability exists because we needed a way to reason carefully about such things instead of guessing, and because without it there is no honest way to state how confident a model is in what it just told you.',

    analogy: {
      scenario:
        'Picture a large dartboard divided into coloured regions, and imagine throwing a dart completely blind so it is equally likely to land anywhere on the board. The whole board is everything that could happen. A coloured region is one particular kind of result — "red", say. The chance of hitting red is simply the fraction of the board that is red. If red covers a quarter of the board, you will hit red a quarter of the time.',
      mapping: [
        { from: 'The whole dartboard', to: 'The sample space — every possible outcome' },
        { from: 'A coloured region', to: 'An event — a subset of outcomes' },
        { from: 'The area of a region divided by the total area', to: 'The probability of that event' },
        { from: 'The whole board having area 1', to: 'All probabilities summing to exactly 1' },
        { from: 'A region with zero area', to: 'An impossible event, probability 0' },
      ],
      bridge:
        'Probability really is an area-like measure: it is non-negative, the whole space measures 1, and the measure of two non-overlapping regions is the sum of their measures. That is not a loose metaphor, it is literally the axiomatic definition Kolmogorov wrote down in 1933. When you later compute a probability by integrating under a curve, you are doing exactly the dartboard calculation with a shape that happens to be curved.',
      limitations:
        'The board assumes every point is equally likely, which is the special case that makes counting work. Real sample spaces are usually weighted: a spam filter\'s outcomes are not equally likely, and a loaded die\'s faces are not equal slices. The area picture survives, but you must let some regions be denser than others.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'From a question to a probability',
        caption: 'The same four steps work whether you are rolling dice or auditing a classifier.',
        steps: [
          { label: 'Name the experiment', detail: 'What exactly is the repeatable action? "Roll one fair six-sided die."' },
          { label: 'Write the sample space', detail: 'Every outcome, nothing missing, nothing overlapping: {1, 2, 3, 4, 5, 6}.' },
          { label: 'Define the event as a subset', detail: '"Even" becomes the set {2, 4, 6}.' },
          { label: 'Measure the subset', detail: 'With equally likely outcomes, count: 3 favourable out of 6 total, so P = 0.5.' },
          { label: 'Sanity-check', detail: 'Is the answer between 0 and 1? Do the probabilities of all outcomes sum to 1?' },
        ],
      },
      {
        kind: 'compare',
        title: 'Two readings of the same number',
        caption: 'Both are used daily in machine learning, often in the same sentence.',
        left: {
          heading: 'Frequentist: long-run frequency',
          points: [
            '"P(heads) = 0.5" means: repeat forever and half the flips are heads',
            'Needs a repeatable experiment to even make sense',
            'Natural for test-set accuracy, click-through rates, error rates',
            'Awkward for one-off claims: there is no long run of "this patient"',
          ],
        },
        right: {
          heading: 'Bayesian: degree of belief',
          points: [
            '"P(rain tomorrow) = 0.7" means: I am 70% confident, given what I know',
            'Works for unrepeatable, one-off events',
            'Natural for model parameters, priors, and a classifier\'s confidence',
            'Requires you to state your prior honestly, which people dislike',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Watch a frequency converge on a probability',
        caption: 'Flip a coin a few times and the proportion of heads jumps around. Flip it ten thousand times and it settles near 0.5. That settling is what "long-run frequency" means.',
        widget: 'coin-flip-sim',
      },
      {
        kind: 'table',
        title: 'Sample spaces you will actually meet',
        columns: ['Experiment', 'Sample space', 'An example event', 'P(event)'],
        rows: [
          ['One fair coin flip', '{H, T}', 'Heads', '1/2 = 0.5'],
          ['One fair die roll', '{1, 2, 3, 4, 5, 6}', 'Even number', '3/6 = 0.5'],
          ['Two coin flips', '{HH, HT, TH, TT}', 'Exactly one head', '2/4 = 0.5'],
          ['Draw one card', '52 cards', 'A heart', '13/52 = 0.25'],
          ['Classify one email', '{spam, not spam}', 'Spam', 'Whatever the base rate is — not 0.5'],
        ],
      },
    ],

    formalDefinition:
      'A probability space is a triple consisting of a sample space (the set of all outcomes), a collection of events (subsets of the sample space closed under complement and countable union), and a probability measure P satisfying Kolmogorov\'s axioms: P(A) is at least 0 for every event A, P of the whole sample space equals 1, and for pairwise disjoint events the probability of their union is the sum of their probabilities. When the sample space is finite with equally likely outcomes, P(A) reduces to the count of outcomes in A divided by the count of all outcomes.',

    math: {
      intuition:
        'Start with counting, because that is where the intuition lives. If every outcome is equally likely, then probability is just "how many of the outcomes I want, out of how many there are". The three axioms below are the grown-up version: they say probabilities are never negative, the total is exactly 1, and non-overlapping possibilities add up. Everything else in probability — Bayes, distributions, the central limit theorem — is a consequence of those three lines.',
      formulas: [
        {
          latex: 'P(A) = \\frac{|A|}{|\\Omega|}',
          name: 'Classical (counting) probability',
          meaning:
            'When every outcome is equally likely, the probability of an event is the number of outcomes in it divided by the total number of outcomes.',
          variables: [
            { symbol: 'P(A)', meaning: 'the probability of event A, a number between 0 and 1' },
            { symbol: 'A', meaning: 'the event: the subset of outcomes you care about' },
            { symbol: '|A|', meaning: 'the count of outcomes in A (its size)' },
            { symbol: '\\Omega', meaning: 'the sample space: the set of every possible outcome' },
            { symbol: '|\\Omega|', meaning: 'the total number of possible outcomes' },
          ],
          category: 'probability',
        },
        {
          latex: '0 \\le P(A) \\le 1, \\qquad P(\\Omega) = 1, \\qquad P(\\varnothing) = 0',
          name: 'The range axiom',
          meaning:
            'Probabilities live on the interval from 0 to 1. Something certain has probability 1; something impossible has probability 0.',
          variables: [
            { symbol: 'P(\\Omega)', meaning: 'the probability that something in the sample space happens — certainty' },
            { symbol: '\\varnothing', meaning: 'the empty event, containing no outcomes at all' },
          ],
          category: 'probability',
        },
        {
          latex: 'A \\cap B = \\varnothing \;\\Longrightarrow\; P(A \\cup B) = P(A) + P(B)',
          name: 'Additivity for disjoint events',
          meaning:
            'If two events cannot both happen, the probability that one or the other happens is the sum of their probabilities.',
          variables: [
            { symbol: 'A \\cap B', meaning: 'the intersection: outcomes in both A and B' },
            { symbol: 'A \\cup B', meaning: 'the union: outcomes in A, or B, or both' },
            { symbol: '\\varnothing', meaning: 'the empty set — here it means A and B share no outcomes' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(A) = \\lim_{n \\to \\infty} \\frac{n_A}{n}',
          name: 'Frequentist interpretation',
          meaning:
            'The probability of A is the value the observed fraction of A settles on as you repeat the experiment more and more times.',
          variables: [
            { symbol: 'n', meaning: 'the number of repetitions of the experiment' },
            { symbol: 'n_A', meaning: 'how many of those repetitions produced event A' },
            { symbol: '\\lim_{n \\to \\infty}', meaning: 'the value the ratio approaches as the number of trials grows without bound' },
          ],
          category: 'probability',
        },
      ],
    },

    workedExample: {
      title: 'Rolling two dice and asking for a total of 7',
      setup:
        'Roll two fair six-sided dice, one red and one blue, and ask for the probability that the two faces sum to 7. Almost everyone\'s first instinct is to count the possible totals (2 through 12, so eleven of them) and answer 1/11. That is wrong, and the reason it is wrong is the most valuable thing in this unit.',
      steps: [
        {
          label: 'Choose a sample space of equally likely outcomes',
          detail:
            'Totals are not equally likely, so they cannot be used for counting. Ordered pairs of faces are equally likely. Treat the dice as distinguishable: the outcome is (red face, blue face).',
          latex: '\\Omega = \\{(1,1), (1,2), \\ldots, (6,6)\\}',
        },
        {
          label: 'Count the sample space',
          detail: 'Six choices for the red die, and for each of those six choices for the blue die.',
          latex: '|\\Omega| = 6 \\times 6 = 36',
        },
        {
          label: 'Write the event as a subset',
          detail: 'Enumerate every ordered pair that sums to 7. Note that (1,6) and (6,1) are two different outcomes.',
          latex: 'A = \\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\\}, \\quad |A| = 6',
        },
        {
          label: 'Divide',
          detail: 'Six favourable outcomes out of thirty-six equally likely ones.',
          latex: 'P(A) = \\frac{6}{36} = \\frac{1}{6} \\approx 0.1667',
        },
        {
          label: 'Check against a total that is rare',
          detail:
            'A total of 12 has only one ordered pair, (6,6), so its probability is 1/36 ≈ 0.028 — six times less likely than a 7. That difference is invisible if you pretend all eleven totals are equal.',
          latex: 'P(\\text{total} = 12) = \\tfrac{1}{36}',
        },
      ],
      conclusion:
        'P(sum = 7) = 1/6 ≈ 0.167, not 1/11 ≈ 0.091. The lesson generalises far beyond dice: counting only gives the right answer when the things you are counting are equally likely. Choosing the right sample space is the actual skill; the division is arithmetic.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Exact probability by enumerating the sample space',
        runnable: true,
        code: `from itertools import product

# Every equally likely outcome of rolling two distinguishable dice.
sample_space = list(product(range(1, 7), repeat=2))
print("outcomes:", len(sample_space))

# An event is just a subset, so filter the sample space.
sum_is_seven = [o for o in sample_space if sum(o) == 7]
print("favourable:", len(sum_is_seven))
print("P(sum = 7) =", len(sum_is_seven) / len(sample_space))

at_least_one_six = [o for o in sample_space if 6 in o]
print("P(at least one six) =", len(at_least_one_six) / len(sample_space))`,
        output: `outcomes: 36
favourable: 6
P(sum = 7) = 0.16666666666666666
P(at least one six) = 0.3055555555555556`,
        explanation:
          'This is the counting definition written as code: build the sample space, filter it down to the event, divide the sizes. Because the enumeration is exhaustive the answer is exact, not an estimate. Note that 11/36 = 0.3056 for "at least one six" — not 2/6, which double-counts the outcome (6,6). Enumeration is the cheapest way to catch that kind of mistake.',
      },
      {
        language: 'python',
        title: 'The same probability by simulation, and how it converges',
        runnable: true,
        code: `import random

random.seed(0)

def estimate(trials):
    hits = sum(1 for _ in range(trials)
               if random.randint(1, 6) + random.randint(1, 6) == 7)
    return hits / trials

for n in [10, 100, 1_000, 100_000]:
    print(f"n = {n:>6}  estimate = {estimate(n):.4f}")

print("exact       =", 1 / 6)`,
        output: `n =     10  estimate = 0.1000
n =    100  estimate = 0.2000
n =   1000  estimate = 0.1710
n = 100000  estimate = 0.1665
exact       = 0.16666666666666666`,
        explanation:
          'This is the frequentist definition made literal: repeat the experiment and watch the observed fraction settle. Ten trials tell you almost nothing, a hundred are still wobbly, and a hundred thousand land within a thousandth of the truth. The same principle explains why a model evaluated on 50 test examples gives you a number you should not trust, and one evaluated on 50,000 gives you a number you can.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A classifier that outputs 0.83',
        usage:
          'When a spam filter reports 0.83 for an email, it is asserting a probability. The frequentist reading is "among emails the model scores like this one, about 83% are spam" — and that claim is checkable, which is exactly what calibration curves test.',
      },
      {
        context: 'Weather forecasting',
        usage:
          '"70% chance of rain tomorrow" cannot be a long-run frequency, because tomorrow happens once. It is a degree of belief given today\'s atmospheric data. Forecasters are nonetheless scored on it: over many such forecasts, it should rain on roughly 70% of the days they said 70%.',
      },
      {
        context: 'Class imbalance in fraud detection',
        usage:
          'If 0.2% of transactions are fraudulent, the sample space for a single transaction is {fraud, legitimate} with probabilities 0.002 and 0.998. That base rate, not the model, is why a classifier that always predicts "legitimate" scores 99.8% accuracy and is worthless.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: '`numpy.random` is the standard way to simulate a sample space when enumerating it is impossible.' },
      { tool: 'scikit-learn', role: '`predict_proba` returns probabilities over the sample space of classes; they always sum to 1 across the row.' },
      { tool: 'SciPy', role: '`scipy.stats` packages the standard probability distributions you will meet from STAT-010 onwards.' },
    ],

    commonMistakes: [
      {
        mistake: 'Counting outcomes that are not equally likely',
        why: 'The formula P(A) = |A|/|omega| is only valid when every outcome in the sample space has the same probability. Totals on two dice are not equally likely, so counting them gives 1/11 instead of the correct 1/6.',
        fix: 'Before dividing, ask: could I swap any two outcomes in this list and have the experiment look identical? If not, go down to a finer sample space, such as ordered pairs, where the answer is yes.',
      },
      {
        mistake: 'Believing a "law of averages" corrects short runs',
        why: 'After five heads, people feel tails is "due". The coin has no memory: the next flip is still 0.5. The long-run frequency converges because later trials swamp the early imbalance, not because anything pushes back towards 0.5.',
        fix: 'Say it as proportion, not count: the *excess* of heads can keep growing while the *fraction* still heads towards 0.5. Run the coin simulator and watch both numbers at once.',
      },
      {
        mistake: 'Writing a sample space with gaps or overlaps',
        why: 'The outcomes must be mutually exclusive and collectively exhaustive. A sample space like {rains, is sunny} silently omits "cloudy and dry", so the probabilities will not sum to 1 and every later calculation inherits the error.',
        fix: 'Check two things every time: can two of my outcomes happen together (overlap, bad), and is there any result not on my list (gap, bad)?',
      },
      {
        mistake: 'Treating probability 0 as "physically impossible"',
        why: 'In a continuous sample space, every individual value has probability exactly 0, yet one of them occurs. Probability 0 means "negligible measure", which coincides with impossibility only in finite sample spaces.',
        fix: 'For continuous quantities, always ask for the probability of a range, never of a point. STAT-005 makes this precise with the difference between a density and a probability.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'A fair coin has just landed heads five times in a row. What is the probability the next flip is heads?',
        answer:
          'Exactly 0.5. The flips are independent: the coin has no memory and no mechanism by which past outcomes could influence the next one. The intuition that tails is "due" is the gambler\'s fallacy. What the law of large numbers actually promises is that the *proportion* of heads converges to 0.5 as the number of flips grows, which happens by dilution — later flips swamp the early run — not by compensation. In fact the expected absolute difference between heads and tails counts grows with the square root of the number of flips.',
        followUp:
          'A strong answer separates two genuinely different questions: "is this coin fair?" (a question about the coin, where five heads is weak evidence) and "given that it is fair, what is next?" (0.5, always). Conflating them is the mistake.',
      },
      {
        level: 'intermediate',
        question: 'Explain the difference between the frequentist and Bayesian interpretations of probability, and give a machine learning situation where each is the natural one.',
        answer:
          'Frequentist probability is the limiting relative frequency of an event over repeated trials, so it only means something for repeatable experiments. Bayesian probability is a degree of belief given available evidence, so it can be applied to one-off propositions and to unknown fixed quantities such as a model parameter. Test-set accuracy is naturally frequentist: rerun evaluation on fresh samples from the same distribution and the number stabilises. A prior over a model\'s weights, or "the probability that this particular deployment regresses", is naturally Bayesian, because there is no population of repetitions to average over. The two schools agree on the mathematics and disagree on what the numbers mean; in practice most machine learning work mixes them without ceremony.',
        followUp:
          'Mentioning that the disagreement has practical consequences — confidence intervals versus credible intervals, and whether you are allowed to put a distribution on a parameter — signals real understanding rather than a memorised contrast.',
      },
      {
        level: 'ml-engineer',
        question: 'Your model outputs a number between 0 and 1 for each example. In what sense is that a probability, and how would you check?',
        answer:
          'It is a probability only if it is calibrated: among all examples the model scores near 0.7, roughly 70% should actually be positive. Most models do not give this for free — a sigmoid output is a monotone score, and boosted trees and deep networks are often badly overconfident. You check it by binning predictions and plotting observed positive rate against predicted probability (a reliability diagram), and by summarising with Brier score or expected calibration error. If it is miscalibrated you fix it post hoc with Platt scaling or isotonic regression on held-out data. The distinction matters because a ranking task only needs the order to be right, whereas anything that feeds the number into a decision threshold or an expected-cost calculation needs the number itself to be right.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write the sample space for flipping three fair coins, then compute the probability of getting exactly two heads.',
        hint: 'Each outcome is an ordered triple such as HTH. How many are there, and how many contain exactly two H?',
        solution:
          'The sample space has 2 x 2 x 2 = 8 equally likely outcomes: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.\n\nExactly two heads occurs in HHT, HTH and THH — three outcomes. So P = 3/8 = 0.375.\n\nNote what goes wrong if you use the coarser sample space {0 heads, 1 head, 2 heads, 3 heads}: those four outcomes are not equally likely, so 1/4 is wrong. The ordered triples are equally likely, which is why they are the right thing to count.',
      },
      {
        prompt:
          'A bag holds 4 red, 5 blue and 3 green marbles. You draw one at random. Compute P(red), P(not red) and P(red or green), and verify the three numbers are consistent.',
        hint: 'The sample space has 12 equally likely outcomes. "Not red" and "red or green" are both subsets you can count directly.',
        solution:
          'Total marbles: 4 + 5 + 3 = 12.\n\nP(red) = 4/12 = 1/3 ≈ 0.333.\nP(not red) = 8/12 = 2/3 ≈ 0.667. Consistency check: P(red) + P(not red) = 1, as the complement rule demands.\nP(red or green) = (4 + 3)/12 = 7/12 ≈ 0.583. Because red and green cannot both occur on a single draw, this is the sum 1/3 + 1/4 = 7/12, which matches.\n\nEvery probability landed in [0, 1] and the three outcomes 4/12 + 5/12 + 3/12 sum to 1, so the sample space has no gaps or overlaps.',
      },
      {
        prompt:
          'Estimate P(at least one six in four rolls of a die) by simulation in Python, then check your estimate against the exact answer.',
        hint: 'The complement is much easier to count than the event itself: what is the probability of no six at all in four rolls?',
        language: 'python',
        starterCode:
          'import random\nrandom.seed(1)\n\ntrials = 200_000\n# Count how many trials contain at least one 6 in four rolls.\n',
        solution:
          'import random\nrandom.seed(1)\ntrials = 200_000\nhits = sum(1 for _ in range(trials)\n           if any(random.randint(1, 6) == 6 for _ in range(4)))\nprint(hits / trials)\n\nThe simulation prints approximately 0.518.\n\nExact answer via the complement: the probability of no six on one roll is 5/6, and the four rolls are independent, so P(no six at all) = (5/6)^4 = 625/1296 ≈ 0.4823. Therefore P(at least one six) = 1 - 0.4823 = 0.5177.\n\nThe simulation agrees to about three decimal places, which is roughly the precision 200,000 trials buys you. This "at least one" pattern — count the complement instead — is used constantly, and appears formally in STAT-002.',
      },
    ],

    quiz: [
      {
        id: 'STAT-001-q1',
        type: 'mcq',
        concept: 'sample space',
        prompt: 'You roll two fair dice and record the total. Why is P(total = 7) not equal to 1/11?',
        options: [
          'Because the eleven possible totals are not equally likely, so counting them is invalid',
          'Because there are actually twelve possible totals, not eleven',
          'Because the dice are not independent of each other',
          'Because probabilities must always be written as decimals',
        ],
        answerIndex: 0,
        explanation:
          'The counting formula requires equally likely outcomes. Totals are not: 7 arises from six ordered pairs while 12 arises from one. Counting the 36 equally likely ordered pairs gives the correct 6/36 = 1/6.',
      },
      {
        id: 'STAT-001-q2',
        type: 'numeric',
        concept: 'counting probability',
        prompt: 'A standard 52-card deck. What is the probability of drawing a heart? Give your answer as a decimal.',
        answer: 0.25,
        tolerance: 0.005,
        explanation:
          'There are 13 hearts among 52 equally likely cards, so 13/52 = 0.25. Each card is genuinely equally likely in a shuffled deck, which is what makes plain counting legitimate here.',
      },
      {
        id: 'STAT-001-q3',
        type: 'truefalse',
        concept: 'gambler\'s fallacy',
        prompt: 'After a fair coin lands heads five times in a row, the next flip is more likely to be tails.',
        answer: false,
        explanation:
          'The coin has no memory, so the next flip remains 0.5. The long-run proportion converges by dilution from future flips, not by any force correcting past imbalance. Believing otherwise is the gambler\'s fallacy.',
      },
      {
        id: 'STAT-001-q4',
        type: 'multi',
        concept: 'axioms',
        prompt: 'Which of these must be true for any valid assignment of probabilities? Select all that apply.',
        options: [
          'Every probability is between 0 and 1 inclusive',
          'The probabilities of all outcomes in the sample space sum to 1',
          'Every outcome must have the same probability',
          'An impossible event has probability 0',
          'Every event with probability 0 is physically impossible',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Equal probabilities are a special case, not a requirement — loaded dice are perfectly valid. And in continuous sample spaces individual values have probability 0 yet one of them occurs, so probability 0 does not imply impossibility.',
      },
      {
        id: 'STAT-001-q5',
        type: 'match',
        concept: 'vocabulary',
        prompt: 'Match each term to what it denotes.',
        pairs: [
          { left: 'Sample space', right: 'The set of all possible outcomes' },
          { left: 'Event', right: 'A subset of the sample space' },
          { left: 'Outcome', right: 'One single result of the experiment' },
          { left: 'Probability measure', right: 'The rule assigning a number in [0, 1] to each event' },
        ],
        explanation:
          'Keeping these four straight prevents most beginner confusion: an outcome is a single point, an event is a set of points, the sample space is the set of every point, and the measure is the function that scores sets.',
      },
      {
        id: 'STAT-001-q6',
        type: 'explain',
        concept: 'interpretations of probability',
        prompt:
          'A weather app says "70% chance of rain tomorrow". A frequentist objects that tomorrow only happens once. Explain what the number can legitimately mean and how you could still check whether the app is any good.',
        rubric: [
          'Identifies the statement as a degree of belief given current evidence, not a frequency over repetitions of tomorrow',
          'Notes that a frequency reading needs a reference class of many similar forecasts',
          'Describes calibration: over all days the app said 70%, it should rain on about 70% of them',
        ],
        sampleAnswer:
          'Tomorrow is a one-off, so there is no long run of tomorrows to count and the number cannot be a frequency about that specific day. Read instead as a degree of belief: given today\'s pressure, humidity and model output, the forecaster is 70% confident. That is still testable, just not one day at a time. Collect every day on which the app said 70% and check whether rain occurred on roughly 70% of them. If it rained on 40% of them the app is overconfident and badly calibrated, even though no individual forecast was ever "wrong".',
        explanation:
          'The key move is recognising that a single-case belief becomes checkable once you aggregate over a reference class of similar claims. This is exactly how classifier calibration is assessed.',
      },
    ],

    flashcards: [
      { front: 'What is a sample space?', back: 'The set of every possible outcome of a random experiment, with outcomes mutually exclusive and collectively exhaustive.' },
      { front: 'What is an event?', back: 'Any subset of the sample space — a collection of outcomes you care about, such as "the die shows an even number".' },
      { front: 'When is P(A) = |A| / |omega| valid?', back: 'Only when every outcome in the sample space is equally likely. Otherwise you must weight outcomes instead of counting them.' },
      { front: 'Frequentist vs Bayesian probability', back: 'Frequentist: long-run relative frequency over repeated trials. Bayesian: degree of belief given evidence, usable for one-off events and for parameters.' },
      { front: 'What is the gambler\'s fallacy?', back: 'Believing past independent outcomes change future ones — that tails is "due" after a run of heads. The coin has no memory.' },
      { front: 'Does probability 0 mean impossible?', back: 'In a finite sample space, yes. In a continuous one, every single value has probability 0 yet one of them occurs — 0 means negligible measure.' },
    ],

    challenge: {
      title: 'Build a probability calculator by enumeration',
      brief:
        'Write a Python function `probability(sample_space, predicate)` that takes a list of equally likely outcomes and a predicate function, and returns the exact probability of the event the predicate describes. Use it to answer four questions about rolling three dice: the probability that the total is at least 15, that all three faces match, that at least two faces match, and that the three faces are all different. Confirm that the last two sum to 1.',
      language: 'python',
      acceptanceCriteria: [
        'The sample space of three dice is built programmatically, not hard-coded',
        'The function works for any predicate without modification',
        'All four probabilities are printed with at least four decimal places',
        'The script asserts that P(at least two match) + P(all different) equals 1',
      ],
      starterCode:
        'from itertools import product\n\ndef probability(sample_space, predicate):\n    """Exact probability of an event over an equally likely sample space."""\n    ...\n\nspace = list(product(range(1, 7), repeat=3))\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine years old and I have just asked you what "probability" means. Teach me, using a dice or coin example, and tell me what a sample space is without using the word "set".',
      mustCover: [
        'Probability describes situations where you know what could happen but not what will',
        'The sample space is the complete list of things that could happen, with nothing missing',
        'An event is a description covering some of those possibilities',
        'Probability is how much of the list the event covers, on a scale from 0 to 1',
      ],
      bonusSignals: [
        'mentions that counting only works when the possibilities are equally likely',
        'distinguishes long-run frequency from confidence in a one-off claim',
        'connects to a real prediction such as rain or spam',
      ],
      sampleExplanation:
        'Probability is what you use when you know what could happen but not what will. Take a die. Before you roll it, write down the full list of things that could come up: one, two, three, four, five, six. Nothing else is possible, and no two of them can happen at once, so the list is complete and tidy — that list is the sample space. Now pick something you care about, like "I get an even number". That covers three items on your list: two, four and six. The probability is just how much of the list your description covers, which is three out of six, or one half. A probability of 0 means your description covers nothing on the list and can never happen; a probability of 1 means it covers everything and must happen. The only catch is that this counting trick works because all six faces are equally likely. If the die were loaded so it landed on six half the time, you would have to weigh the items instead of just counting them.',
    },
  },

  {
    id: 'STAT-002',
    domain: 'STAT',
    module: 'Probability',
    topic: 'Rules of probability',
    title: 'Combining Probabilities',
    slug: 'combining-probabilities',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['STAT-001'],
    related: ['STAT-001'],
    tags: ['addition rule', 'multiplication rule', 'complement', 'independence', 'mutually exclusive'],

    learningObjectives: [
      'Apply the addition rule correctly, with and without overlap between the two events',
      'Apply the multiplication rule, and state exactly when the simple product form is allowed',
      'Use the complement rule to turn an awkward "at least one" question into an easy one',
      'Distinguish mutually exclusive from independent, and explain why the two are almost opposites',
    ],

    terminology: [
      {
        term: 'Union (A or B)',
        definition:
          'The event that at least one of A and B occurs, written A union B. In probability, "or" is always inclusive: both counts as "or".',
        simple: 'At least one of the two things happens.',
      },
      {
        term: 'Intersection (A and B)',
        definition: 'The event that A and B both occur, written A intersect B.',
        simple: 'Both things happen together.',
      },
      {
        term: 'Complement',
        definition:
          'The event that A does not occur, written A-bar or A-complement. Its probability is 1 minus P(A), because A and its complement partition the sample space.',
        simple: 'Everything except A.',
      },
      {
        term: 'Mutually exclusive (disjoint)',
        definition:
          'Two events that cannot both happen: their intersection is empty, so P(A and B) = 0. A single card cannot be both a heart and a spade.',
        simple: 'They rule each other out.',
      },
      {
        term: 'Independent',
        definition:
          'Two events where knowing one occurred tells you nothing about the other, formally P(A and B) = P(A)P(B). Two separate coin flips are independent.',
        simple: 'One happening does not change the chance of the other.',
      },
    ],

    simpleExplanation:
      'Once you can find the probability of one thing, the next question is always about two things at once. There are only three moves you need. First, "or": add the two probabilities, but if the events can happen together you have counted the overlap twice, so subtract it back off once. Second, "and": multiply the probabilities, but the second one must be worked out assuming the first already happened. Third, "not": subtract from 1, because everything that is not A is exactly the rest of the list. That third move is far more useful than it sounds. Questions that begin with "at least one" are usually painful to attack head-on and trivial once you flip them into "none at all, then subtract from 1". Almost every probability calculation you will ever do in machine learning is some combination of these three moves applied repeatedly.',

    whyItExists:
      'Real questions are compound: what is the chance this request is slow or errors, what is the chance all ten microservices stay up, what is the chance at least one of a thousand tests is a false positive. Single-event probability answers none of these. The combining rules exist so that compound questions decompose into simple ones, and so that the double-counting mistake people make instinctively gets caught.',

    analogy: {
      scenario:
        'Imagine two overlapping circles drawn on a table, one for people who own a dog and one for people who own a cat. Count the dog circle, count the cat circle, add them, and you have counted everyone in the lens-shaped overlap — the people who own both — exactly twice. To get the true number of people who own at least one pet, you must subtract the overlap once. Now imagine two circles that are drawn far apart and never touch, such as "born in January" and "born in June". There is no overlap to remove, so plain addition is safe.',
      mapping: [
        { from: 'The area of the dog circle', to: 'P(A)' },
        { from: 'The lens-shaped overlap', to: 'P(A and B), the intersection' },
        { from: 'Subtracting the overlap once', to: 'The minus term in the general addition rule' },
        { from: 'Two circles that never touch', to: 'Mutually exclusive events, where P(A and B) = 0' },
        { from: 'Everything on the table outside a circle', to: 'The complement of that event' },
      ],
      bridge:
        'The Venn picture is exact, not decorative: probability behaves like area, so inclusion-exclusion is literally the statement that overlapping regions get counted twice when you add areas. Where the picture stops helping is independence. Independence is not about whether the circles overlap — it is about whether the overlap is exactly as large as you would predict from the two areas alone, P(A)P(B). Two circles can overlap a lot, a little, or by exactly the independent amount, and the drawing looks much the same in each case.',
      limitations:
        'Venn diagrams show set relationships but not probabilities unless you draw them to scale, and they become useless past three events. They also make it tempting to believe that non-overlapping means unrelated, which is precisely backwards.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Choosing the right rule',
        caption: 'Answer two questions and the rule picks itself.',
        branching: true,
        steps: [
          { label: 'Does the question say "or" / "at least one"?', detail: 'If yes, you want a union — go to the addition rule.' },
          { label: 'Can both events happen together?', detail: 'If yes, use P(A) + P(B) - P(A and B). If no, they are disjoint and the subtraction term is 0.' },
          { label: 'Does the question say "and" / "both" / "in a row"?', detail: 'You want an intersection — go to the multiplication rule.' },
          { label: 'Does the first event change the second?', detail: 'If no, they are independent and P(A and B) = P(A)P(B). If yes, use P(A) x P(B given A).' },
          { label: 'Is the question "at least one of many"?', detail: 'Flip to the complement: 1 - P(none), which is almost always the easier calculation.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Mutually exclusive versus independent',
        caption: 'The single most conflated pair in introductory probability. They are not two words for the same idea.',
        left: {
          heading: 'Mutually exclusive',
          points: [
            'Definition: P(A and B) = 0 — they cannot co-occur',
            'Knowing A happened tells you B definitely did not',
            'That is maximal dependence, not independence',
            'Example: one card is a heart / that same card is a spade',
            'Addition becomes easy: P(A or B) = P(A) + P(B)',
          ],
        },
        right: {
          heading: 'Independent',
          points: [
            'Definition: P(A and B) = P(A) x P(B)',
            'Knowing A happened tells you nothing about B',
            'They can and usually do co-occur',
            'Example: first flip is heads / second flip is heads',
            'Multiplication becomes easy: P(A and B) = P(A)P(B)',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The four rules on one page',
        columns: ['Question', 'Rule', 'Condition for the simple form'],
        rows: [
          ['P(not A)', 'P(not A) = 1 - P(A)', 'Always true, no conditions'],
          ['P(A or B)', 'P(A) + P(B) - P(A and B)', 'Always true; drop the last term only if disjoint'],
          ['P(A and B)', 'P(A) x P(B given A)', 'Always true; becomes P(A)P(B) only if independent'],
          ['P(at least one of n)', '1 - P(none of them)', 'Always true; P(none) is a product if independent'],
        ],
      },
      {
        kind: 'widget',
        title: 'Independence you can watch',
        caption: 'Flip two coins repeatedly. The fraction of double-heads settles near 0.25, which is 0.5 x 0.5 — the multiplication rule for independent events, confirmed empirically.',
        widget: 'coin-flip-sim',
        props: { coins: 2 },
      },
    ],

    formalDefinition:
      'For events A and B in a probability space: the complement rule states P(A-complement) = 1 - P(A); the general addition rule (inclusion-exclusion) states P(A union B) = P(A) + P(B) - P(A intersect B); and the general multiplication rule states P(A intersect B) = P(A) P(B given A) whenever P(A) is positive. A and B are mutually exclusive when P(A intersect B) = 0, and independent when P(A intersect B) = P(A)P(B). Two events with non-zero probability cannot be both mutually exclusive and independent.',

    math: {
      intuition:
        'Think of probability as area on a dartboard. "Or" means the combined region, and if you add two overlapping regions you counted the shared part twice, so subtract it once. "And" means the shared part itself, and the honest way to reach it is to first land in A, then ask how likely B is *now that you know you are inside A*. "Not" is everything else on the board. The special cases people memorise — add without subtracting, multiply without conditioning — are just what happens when the overlap is empty or exactly the expected size.',
      formulas: [
        {
          latex: 'P(A^c) = 1 - P(A)',
          name: 'Complement rule',
          meaning: 'The probability that A does not happen is one minus the probability that it does.',
          variables: [
            { symbol: 'A^c', meaning: 'the complement of A: every outcome not in A' },
            { symbol: 'P(A)', meaning: 'the probability of A' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
          name: 'General addition rule (inclusion-exclusion)',
          meaning:
            'The chance that at least one of A and B occurs, corrected for the fact that adding the two probabilities counts the overlap twice.',
          variables: [
            { symbol: 'A \\cup B', meaning: 'the union: A happens, or B happens, or both' },
            { symbol: 'A \\cap B', meaning: 'the intersection: both A and B happen' },
            { symbol: 'P(A \\cap B)', meaning: 'the overlap being subtracted; it is 0 when the events are mutually exclusive' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(A \\cap B) = P(A)\\,P(B \\mid A) = P(B)\\,P(A \\mid B)',
          name: 'General multiplication rule',
          meaning:
            'The chance both happen is the chance the first happens, times the chance the second happens given that the first already did.',
          variables: [
            { symbol: 'P(B \\mid A)', meaning: 'the conditional probability of B given that A has occurred' },
            { symbol: 'P(A)', meaning: 'the unconditional probability of A' },
          ],
          category: 'probability',
        },
        {
          latex: 'A \\perp B \\iff P(A \\cap B) = P(A)\\,P(B)',
          name: 'Definition of independence',
          meaning:
            'A and B are independent exactly when the probability of both equals the product of the two separate probabilities — equivalently, when conditioning on one changes nothing.',
          variables: [
            { symbol: 'A \\perp B', meaning: 'the notation for "A is independent of B"' },
            { symbol: 'P(A)P(B)', meaning: 'the product of the marginal probabilities — the overlap you would expect if the events were unrelated' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(\\text{at least one}) = 1 - \\prod_{i=1}^{n} \\bigl(1 - p_i\\bigr)',
          name: 'At-least-one rule for independent events',
          meaning:
            'Rather than enumerating all the ways at least one thing can happen, compute the probability that none of them happens and subtract from 1.',
          variables: [
            { symbol: 'n', meaning: 'the number of independent events' },
            { symbol: 'p_i', meaning: 'the probability that the i-th event occurs' },
            { symbol: '1 - p_i', meaning: 'the probability that the i-th event does not occur' },
            { symbol: '\\prod', meaning: 'the product over all n events — valid only because they are independent' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Start with the fact that probability is additive over disjoint events.',
        'Split the union into three disjoint pieces: A-only, B-only, and the overlap A and B.',
        'So P(A union B) = P(A only) + P(B only) + P(A and B).',
        'Now note that P(A) = P(A only) + P(A and B), and likewise P(B) = P(B only) + P(A and B).',
        'Adding those two gives P(A) + P(B) = P(A only) + P(B only) + 2 P(A and B).',
        'That is the union plus one extra copy of the overlap, so subtracting P(A and B) once recovers P(A union B). This is why the minus term is there and why it appears exactly once.',
      ],
    },

    workedExample: {
      title: 'One card from a standard deck: heart or face card?',
      setup:
        'Draw a single card from a well-shuffled 52-card deck. Let H be "the card is a heart" and F be "the card is a face card" (jack, queen or king). We want P(H or F). The tempting answer is 13/52 + 12/52 = 25/52, and it is wrong.',
      steps: [
        {
          label: 'Probability of a heart',
          detail: 'Thirteen of the fifty-two cards are hearts.',
          latex: 'P(H) = \\tfrac{13}{52} = 0.25',
        },
        {
          label: 'Probability of a face card',
          detail: 'Three face cards in each of four suits gives twelve face cards.',
          latex: 'P(F) = \\tfrac{12}{52} \\approx 0.2308',
        },
        {
          label: 'Find the overlap',
          detail:
            'Cards that are both a heart and a face card: the jack, queen and king of hearts. Three of them. These are the cards that plain addition counts twice.',
          latex: 'P(H \\cap F) = \\tfrac{3}{52} \\approx 0.0577',
        },
        {
          label: 'Apply the addition rule',
          detail: 'Add the two, subtract the double-counted overlap once.',
          latex: 'P(H \\cup F) = \\tfrac{13}{52} + \\tfrac{12}{52} - \\tfrac{3}{52} = \\tfrac{22}{52} = \\tfrac{11}{26} \\approx 0.4231',
        },
        {
          label: 'Verify by direct counting',
          detail:
            '13 hearts, plus the 9 face cards that are not hearts (three each in spades, clubs and diamonds), gives 22 cards. The rule and the count agree.',
          latex: '13 + 9 = 22 \;\\Rightarrow\; \\tfrac{22}{52} \\approx 0.4231',
        },
        {
          label: 'Now check independence, which is a different question',
          detail:
            'P(H)P(F) = 0.25 x 0.2308 = 0.0577, which equals P(H and F) exactly. So heart and face card are independent — even though they overlap heavily. Overlap and independence are unrelated questions.',
          latex: 'P(H)P(F) = \\tfrac{13}{52}\\cdot\\tfrac{12}{52} = \\tfrac{3}{52} = P(H \\cap F)',
        },
      ],
      conclusion:
        'P(heart or face card) = 22/52 ≈ 0.423, not 25/52 ≈ 0.481. The three double-counted cards are the whole story. And the final step is worth pausing on: these two events overlap and are independent, which is only confusing if you believed those words meant the same thing.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The addition rule, verified by enumeration',
        runnable: true,
        code: `suits = ["hearts", "diamonds", "clubs", "spades"]
ranks = [str(n) for n in range(2, 11)] + ["J", "Q", "K", "A"]
deck = [(r, s) for s in suits for r in ranks]

is_heart = lambda c: c[1] == "hearts"
is_face = lambda c: c[0] in {"J", "Q", "K"}

p_h = sum(map(is_heart, deck)) / 52
p_f = sum(map(is_face, deck)) / 52
p_both = sum(1 for c in deck if is_heart(c) and is_face(c)) / 52
p_either = sum(1 for c in deck if is_heart(c) or is_face(c)) / 52

print(f"P(H)          = {p_h:.4f}")
print(f"P(F)          = {p_f:.4f}")
print(f"P(H and F)    = {p_both:.4f}")
print(f"P(H or F)     = {p_either:.4f}")
print(f"naive sum     = {p_h + p_f:.4f}   <- wrong, double counts")
print(f"addition rule = {p_h + p_f - p_both:.4f}")
print("independent?  ", abs(p_both - p_h * p_f) < 1e-12)`,
        output: `P(H)          = 0.2500
P(F)          = 0.2308
P(H and F)    = 0.0577
P(H or F)     = 0.4231
naive sum     = 0.4808   <- wrong, double counts
addition rule = 0.4231
independent?   True`,
        explanation:
          'The enumeration gives ground truth, so the naive sum can be shown to be wrong rather than merely asserted to be. The final line is the important one: these two events overlap substantially and are nevertheless independent, because the overlap is exactly the size the product predicts. That is the test for independence — never "do they overlap".',
      },
      {
        language: 'python',
        title: 'Why "at least one" should always be flipped',
        runnable: true,
        code: `# A service has a 1% failure rate per request. Independent requests.
p_fail = 0.01

for n in [1, 10, 70, 100, 300]:
    p_none = (1 - p_fail) ** n
    print(f"n = {n:>3}   P(at least one failure) = {1 - p_none:.4f}")`,
        output: `n =   1   P(at least one failure) = 0.0100
n =  10   P(at least one failure) = 0.0956
n =  70   P(at least one failure) = 0.5041
n = 100   P(at least one failure) = 0.6340
n = 300   P(at least one failure) = 0.9510`,
        explanation:
          'Counting "at least one failure" directly means summing over exactly one failure, exactly two, and so on — tedious and easy to get wrong. The complement collapses it to a single product. The numbers also carry a hard operational lesson: a 99% reliable dependency called 100 times per page load fails on roughly two thirds of page loads. The same arithmetic governs multiple-comparison problems in STAT-015, where twenty independent tests at the 5% level give a 64% chance of at least one false positive.',
      },
      {
        language: 'python',
        title: 'Independence is a numerical check, not a feeling',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(7)
n = 200_000

# Two genuinely independent fair coins.
a = rng.random(n) < 0.5
b = rng.random(n) < 0.5

# A third variable deliberately coupled to a.
c = np.where(rng.random(n) < 0.8, a, ~a)

def report(name, x, y):
    joint = np.mean(x & y)
    product = np.mean(x) * np.mean(y)
    print(f"{name}: P(both)={joint:.4f}  P(x)P(y)={product:.4f}  "
          f"independent={abs(joint - product) < 0.005}")

report("a & b", a, b)
report("a & c", a, c)`,
        output: `a & b: P(both)=0.2502  P(x)P(y)=0.2501  independent=True
a & c: P(both)=0.4008  P(x)P(y)=0.2502  independent=False`,
        explanation:
          'The test for independence is always the same comparison: does the joint probability equal the product of the marginals? For a and b it does, to within simulation noise. For a and c it does not — the joint is 0.40 against a predicted 0.25 — because c agrees with a 80% of the time. This is precisely the check a Naive Bayes classifier assumes holds for every pair of features, and precisely the assumption that is usually false.',
      },
    ],

    realWorldExamples: [
      {
        context: 'System reliability in an ML serving stack',
        usage:
          'A prediction endpoint that depends on a feature store, a model server and a cache is up only if all three are up. With 99.9% availability each and independent failures, the product is 99.7%: roughly a full day of downtime a year appearing out of three components that each look excellent.',
      },
      {
        context: 'Multiple comparisons in experimentation',
        usage:
          'A team evaluates 20 model variants at the 5% significance level. The probability of at least one false positive is 1 - 0.95^20 = 0.64. The complement rule is what turns "we found a significant winner" into "we would have found one anyway".',
      },
      {
        context: 'Naive Bayes text classification',
        usage:
          'Naive Bayes multiplies per-word probabilities together, which is exactly the independent-events multiplication rule applied to features. Words in real sentences are obviously not independent, which is what the word "naive" is admitting.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`MultinomialNB` is the multiplication rule under a conditional independence assumption, applied to word counts.' },
      { tool: 'NumPy', role: 'Boolean array operations `&`, `|` and `~` compute intersections, unions and complements over whole datasets at once.' },
      { tool: 'statsmodels', role: '`multipletests` applies Bonferroni and Benjamini-Hochberg corrections, which exist because of the at-least-one rule.' },
    ],

    commonMistakes: [
      {
        mistake: 'Adding probabilities for events that can co-occur',
        why: 'Plain addition counts the overlap twice, which inflates the answer and can even push it above 1 — a sure sign the rule was misapplied.',
        fix: 'Always start from the general form P(A) + P(B) - P(A and B) and drop the last term only after you have checked that the events genuinely cannot co-occur.',
      },
      {
        mistake: 'Treating mutually exclusive and independent as synonyms',
        why: 'They are close to opposites. If A and B are mutually exclusive and both have non-zero probability, then learning A occurred tells you B definitely did not — the strongest possible dependence. P(A and B) = 0, not P(A)P(B).',
        fix: 'Test them with different questions. Mutually exclusive asks "can both happen?" Independent asks "does the joint equal the product?" Two events with positive probability can never be both.',
      },
      {
        mistake: 'Multiplying probabilities that are not independent',
        why: 'P(A and B) = P(A)P(B) requires independence. Drawing two aces without replacement gives 4/52 x 3/51, not 4/52 x 4/52, because the first draw changes the deck.',
        fix: 'Ask whether the first event changes the situation for the second. If it does, use P(A) x P(B given A). "With replacement" and "without replacement" is the classic tell.',
      },
      {
        mistake: 'Attacking "at least one" head-on',
        why: 'Enumerating one failure, two failures, three failures and so on is laborious and invites arithmetic slips, and the terms do not simplify.',
        fix: 'Compute P(none) and subtract from 1. For independent events P(none) is a single product, which turns a page of work into one line.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between mutually exclusive events and independent events? Can two events be both?',
        answer:
          'Mutually exclusive means they cannot occur together: P(A and B) = 0. Independent means occurrence of one carries no information about the other: P(A and B) = P(A)P(B). Two events with non-zero probabilities cannot be both, because mutual exclusivity forces the joint probability to 0 while independence forces it to the strictly positive product P(A)P(B). In fact mutually exclusive events are maximally dependent — learning that A happened tells you with certainty that B did not. The only degenerate case where both hold is when at least one event has probability 0.',
        followUp:
          'A strong answer supplies one example of each: a single card being a heart and being a spade (exclusive), versus two separate coin flips (independent), and points out that a card being a heart and a face card is overlapping yet independent.',
      },
      {
        level: 'intermediate',
        question: 'Your service calls four independent downstream dependencies, each with 99.5% availability. What is the availability of your service, and what does that tell you about error budgets?',
        answer:
          'If the service needs all four, availability is 0.995^4 = 0.9801, so about 98%. Put the other way, the failure probability is 1 - 0.9801 = 0.0199, roughly four times the per-dependency failure rate of 0.5%, because failure probabilities add approximately when they are small. That is nearly 175 hours of downtime a year from four components that each look reliable in isolation. The practical consequences are that error budgets must be allocated across the dependency graph rather than set per component, that serial dependencies multiply while redundant replicas multiply their *failure* probabilities instead, and that the independence assumption is usually optimistic since shared infrastructure creates correlated failures.',
      },
      {
        level: 'ml-engineer',
        question: 'Naive Bayes multiplies per-feature probabilities together. Which rule is that, what does it assume, and why does the classifier still work when the assumption is false?',
        answer:
          'It is the multiplication rule under an assumption of conditional independence of features given the class: P(x1, ..., xn given y) is taken to equal the product of P(xi given y). In text that is plainly false, since "New" and "York" co-occur far more than independence predicts, and correlated features get their evidence counted multiple times. The resulting posterior probabilities are therefore badly calibrated, usually pushed towards 0 or 1. It still classifies well because classification only depends on which class scores highest, and the overcounting tends to distort the magnitudes of the scores without reordering them. So Naive Bayes is a reasonable ranker and a poor probability estimator, and you should not feed its outputs into a cost-sensitive threshold without calibrating first.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'In a class of 40 students, 22 study Python, 17 study SQL and 9 study both. How many study at least one, and what is the probability that a randomly chosen student studies neither?',
        hint: 'Use inclusion-exclusion for "at least one", then the complement rule for "neither".',
        solution:
          'At least one: 22 + 17 - 9 = 30 students. The 9 who study both were counted in each of the first two figures, so they must be subtracted once.\n\nP(at least one) = 30/40 = 0.75.\nP(neither) = 1 - 0.75 = 0.25, which is 10 students.\n\nChecking the four disjoint groups: Python only 22 - 9 = 13, SQL only 17 - 9 = 8, both 9, neither 10. Total 13 + 8 + 9 + 10 = 40. The parts account for everyone, which is the sanity check worth doing every time.',
      },
      {
        prompt:
          'You draw two cards from a standard deck without replacement. What is P(both are aces)? Now answer the same question with replacement, and explain the difference.',
        hint: 'Without replacement, the second probability is conditional on the first draw having removed an ace.',
        solution:
          'Without replacement: P(first ace) = 4/52. Given that, only 3 aces remain among 51 cards, so P(second ace given first ace) = 3/51. By the multiplication rule, P(both) = (4/52)(3/51) = 12/2652 = 1/221 ≈ 0.00452.\n\nWith replacement: the deck is restored, so the draws are independent and P(both) = (4/52)(4/52) = 1/169 ≈ 0.00592.\n\nWithout replacement is less likely, because removing an ace makes the second ace harder. The general rule P(A and B) = P(A)P(B given A) covers both cases; the independent product is only the special case where P(B given A) happens to equal P(B).',
      },
      {
        prompt:
          'A model is deployed behind three independent health checks, each with a 2% chance of falsely flagging a healthy model. Compute the probability of at least one false alarm per deployment, and then the number of checks at which the false-alarm rate exceeds 50%.',
        hint: 'Work with the complement: the probability that no check fires is a product.',
        language: 'python',
        starterCode: 'p = 0.02\n# P(at least one false alarm) for n independent checks\n',
        solution:
          'For three checks: P(no alarm) = 0.98^3 = 0.941192, so P(at least one) = 1 - 0.941192 = 0.058808, about 5.9%.\n\nFor the threshold, solve 1 - 0.98^n > 0.5, i.e. 0.98^n < 0.5, i.e. n > ln(0.5)/ln(0.98) = (-0.6931)/(-0.020203) = 34.31. So from n = 35 checks onwards, more than half of all deployments trigger a false alarm.\n\nIn Python: `import math; math.log(0.5) / math.log(0.98)` gives 34.31.\n\nThis is the reason alerting systems with many independent checks drown teams in noise, and it is the identical arithmetic to the multiple-comparisons problem in hypothesis testing.',
      },
    ],

    quiz: [
      {
        id: 'STAT-002-q1',
        type: 'numeric',
        concept: 'addition rule',
        prompt:
          'P(A) = 0.6, P(B) = 0.5 and P(A and B) = 0.3. What is P(A or B)?',
        answer: 0.8,
        tolerance: 0.005,
        explanation:
          'Inclusion-exclusion: 0.6 + 0.5 - 0.3 = 0.8. Without subtracting the overlap you would get 1.1, which is impossible — a useful signal that the rule was misapplied.',
      },
      {
        id: 'STAT-002-q2',
        type: 'truefalse',
        concept: 'exclusive vs independent',
        prompt: 'If two events are mutually exclusive and both have non-zero probability, they are also independent.',
        answer: false,
        explanation:
          'They are maximally dependent. Mutual exclusivity gives P(A and B) = 0, whereas independence would require P(A)P(B), which is strictly positive. Knowing A occurred tells you B certainly did not.',
      },
      {
        id: 'STAT-002-q3',
        type: 'mcq',
        concept: 'multiplication rule',
        prompt: 'Two cards are drawn without replacement. Which expression gives P(both hearts)?',
        options: [
          '(13/52) x (12/51)',
          '(13/52) x (13/52)',
          '(13/52) + (12/51)',
          '(13/52) x (13/51)',
        ],
        answerIndex: 0,
        explanation:
          'After removing one heart, 12 hearts remain among 51 cards, so the second factor is conditional on the first draw. Using 13/52 twice would be the with-replacement answer, which is a different experiment.',
      },
      {
        id: 'STAT-002-q4',
        type: 'numeric',
        concept: 'complement rule',
        prompt:
          'Twenty independent statistical tests are each run at a 5% significance level, with no real effect present. What is the probability of at least one false positive? Give a decimal to two places.',
        answer: 0.64,
        tolerance: 0.02,
        explanation:
          '1 - 0.95^20 = 1 - 0.3585 = 0.6415. Roughly two times in three you find a "significant" result purely by chance, which is exactly why multiple-comparison corrections exist.',
      },
      {
        id: 'STAT-002-q5',
        type: 'code-output',
        language: 'python',
        concept: 'independence check',
        prompt: 'What does this print?',
        code: 'p_a, p_b, p_both = 0.4, 0.5, 0.2\nprint(p_both == p_a * p_b, round(p_a + p_b - p_both, 2))',
        options: ['True 0.7', 'False 0.7', 'True 0.9', 'False 0.9'],
        answerIndex: 0,
        explanation:
          'P(A)P(B) = 0.4 x 0.5 = 0.2, which equals P(A and B), so the events are independent and the first value is True. The union is 0.4 + 0.5 - 0.2 = 0.7.',
      },
      {
        id: 'STAT-002-q6',
        type: 'explain',
        concept: 'rule selection',
        prompt:
          'A colleague computes the probability that a pipeline succeeds as the sum of the success probabilities of its five stages, and gets 4.7. Diagnose the error and give them the correct approach.',
        rubric: [
          'Identifies that a probability above 1 is impossible and signals a misapplied rule',
          'Explains that "all stages succeed" is an intersection, so it needs multiplication, not addition',
          'States the correct expression and, if stages are not independent, the conditional form',
        ],
        sampleAnswer:
          'The answer 4.7 is impossible, since probabilities cannot exceed 1, so the rule itself is wrong rather than the arithmetic. "The pipeline succeeds" means every stage succeeds, which is an intersection, and intersections multiply rather than add. If the stages fail independently, the correct value is the product of the five success probabilities — which will be *lower* than any individual stage, not higher. If failures are correlated, for example because all five stages share one database, the product is not valid either and you need P(stage 2 succeeds given stage 1 did) and so on. Addition would only be appropriate for a question about "at least one stage failing", and even then only with the overlap subtracted or, far more simply, as 1 minus the product of the success probabilities.',
        explanation:
          'The examinable skill is mapping English words onto set operations: "and"/"all" is intersection and multiplies, "or"/"at least one" is union and adds with correction, and an impossible answer means you chose the wrong operation.',
      },
    ],

    flashcards: [
      { front: 'General addition rule', back: 'P(A or B) = P(A) + P(B) - P(A and B). Subtract the overlap once because adding counts it twice.' },
      { front: 'General multiplication rule', back: 'P(A and B) = P(A) x P(B given A). It simplifies to P(A)P(B) only when A and B are independent.' },
      { front: 'Mutually exclusive vs independent', back: 'Exclusive: P(A and B) = 0, they cannot co-occur, so they are maximally dependent. Independent: P(A and B) = P(A)P(B).' },
      { front: 'How do you handle "at least one"?', back: 'Flip to the complement: P(at least one) = 1 - P(none). For independent events P(none) is a single product.' },
      { front: '20 tests at the 5% level, no real effects — P(at least one significant)?', back: '1 - 0.95^20 ≈ 0.64. This is the multiple-comparisons problem in one line.' },
      { front: 'How do you test independence numerically?', back: 'Compare the joint probability with the product of the marginals. Equal means independent; overlapping tells you nothing either way.' },
    ],

    challenge: {
      title: 'The birthday problem, from first principles',
      brief:
        'Using only the complement rule and the multiplication rule, compute the probability that at least two people in a room of n share a birthday, assuming 365 equally likely birthdays and independence. Print the probability for n from 2 to 60, find the smallest n for which it exceeds 0.5, and then verify your exact answer with a Monte Carlo simulation of at least 100,000 rooms.',
      language: 'python',
      acceptanceCriteria: [
        'The exact calculation uses 1 - P(all distinct) rather than enumerating collisions',
        'The smallest n with probability above 0.5 is reported (it is 23)',
        'A simulation independently estimates the probability for that n',
        'The exact and simulated values agree to within 0.01',
      ],
      starterCode:
        'def p_shared_birthday(n: int) -> float:\n    """Probability that at least two of n people share a birthday."""\n    p_all_distinct = 1.0\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach me the three rules for combining probabilities — or, and, not — and then explain why "mutually exclusive" and "independent" are not the same thing, using an example of each.',
      mustCover: [
        'The addition rule for "or", including subtracting the overlap when events can co-occur',
        'The multiplication rule for "and", with the second probability conditional on the first',
        'The complement rule and its use for "at least one" questions',
        'That mutually exclusive means cannot co-occur, while independent means one carries no information about the other',
      ],
      bonusSignals: [
        'notes that exclusive events with positive probability are maximally dependent',
        'gives an example of events that overlap yet are independent',
        'connects the at-least-one rule to multiple comparisons or system reliability',
      ],
      sampleExplanation:
        'There are three moves. For "or", add the two probabilities — but if both things can happen at once you have counted that shared part twice, so subtract it back off once. For "and", multiply, but the second probability has to be worked out assuming the first already happened: two aces from one deck is 4/52 times 3/51, not 4/52 twice, because the first ace is gone. For "not", subtract from 1, and this is the move that saves you the most work, because any question phrased as "at least one" becomes "one minus the chance of none". Now the confusing pair. Mutually exclusive means the two things cannot both happen: a single card cannot be both a heart and a spade. Independent means knowing about one tells you nothing about the other: my coin landing heads says nothing about yours. These are almost opposites. If I tell you the card is a heart, you know with complete certainty it is not a spade — that is the strongest possible dependence, not independence. And events can perfectly well overlap and still be independent: a card being a heart and being a face card overlap in three cards, yet each tells you nothing about the other, because 13/52 times 12/52 comes out to exactly 3/52.',
    },
  },

  {
    id: 'STAT-003',
    domain: 'STAT',
    module: 'Conditional Probability',
    topic: 'Conditioning and independence',
    title: 'Conditional Probability and Independence',
    slug: 'conditional-probability',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['STAT-002'],
    related: ['STAT-001', 'STAT-002'],
    tags: ['conditional probability', 'independence', 'contingency table', 'joint', 'marginal'],

    learningObjectives: [
      'Interpret P(A given B) as restricting attention to the part of the sample space where B is true',
      'Read joint, marginal and conditional probabilities off a two-way contingency table',
      'State the formal definition of independence and test it on real counts rather than by intuition',
      'Explain why P(A given B) and P(B given A) are different quantities, and name the error of confusing them',
    ],

    terminology: [
      {
        term: 'Conditional probability',
        definition:
          'P(A given B) is the probability of A once you know B has occurred. It is the joint probability of A and B, renormalised by P(B) so that it is again a probability within the restricted world.',
        simple: 'The chance of A, once you already know B happened.',
      },
      {
        term: 'Joint probability',
        definition: 'P(A and B), the probability that both events occur, measured against the full sample space.',
        simple: 'How often both things happen together, out of everything.',
      },
      {
        term: 'Marginal probability',
        definition:
          'The probability of a single event ignoring the other, obtained by summing a row or column of the joint table. The name comes from writing the totals in the margins.',
        simple: 'The plain chance of one thing, ignoring the other.',
      },
      {
        term: 'Conditioning',
        definition:
          'The act of restricting the sample space to the outcomes consistent with known information, then rescaling probabilities so they sum to 1 in that smaller world.',
        simple: 'Throwing away the possibilities you now know did not happen, and rescaling the rest.',
      },
      {
        term: 'Conditional independence',
        definition:
          'A and B are conditionally independent given C when P(A and B given C) = P(A given C) P(B given C). Two variables can be dependent overall yet independent once a third is fixed.',
        simple: 'Two things stop being related once you already know a third thing.',
      },
    ],

    simpleExplanation:
      'Information changes probabilities. Before you know anything, the chance a random person is over six feet tall is fairly small. Tell me they play professional basketball and the chance shoots up — the person has not changed, your information has. Conditional probability is how that update is written down. The mechanic is simple: when you learn that B happened, you cross out every outcome where B did not happen and look only at the ones that survive. Among those survivors, you ask what fraction also has A. That is why the formula divides by P(B): you have shrunk the world to just B, and everything must be re-measured against the new, smaller world so the probabilities still add to 1. When the answer comes out exactly the same as before you learned anything, the two events are called independent, which means B carried no information about A. That is the whole idea, and it is the engine behind Bayes rule, Naive Bayes, and every model that updates a prediction when a new feature arrives.',

    whyItExists:
      'Predictions are never made in ignorance: you always know something — the email\'s words, the patient\'s symptoms, the user\'s history. Conditional probability exists to express how a known fact changes the odds of an unknown one, which is the exact shape of every supervised learning problem: P(label given features).',

    analogy: {
      scenario:
        'Imagine a lecture hall of 200 students and you want the chance that a randomly picked student passed the exam. You count passes across the whole hall. Now someone tells you the student you will pick is sitting in the front three rows. You do not recount the whole hall — you ignore everyone behind row three and count passes only among the people who remain. The hall has not changed; the region you are allowed to look at has shrunk, and the fractions must be recomputed against that smaller group.',
      mapping: [
        { from: 'The whole lecture hall', to: 'The full sample space' },
        { from: 'Being told "front three rows"', to: 'Conditioning on the event B' },
        { from: 'Ignoring everyone behind row three', to: 'Discarding outcomes where B is false' },
        { from: 'Students in the front rows who passed', to: 'The joint event A and B' },
        { from: 'Dividing by the number of front-row students', to: 'Dividing by P(B) to renormalise in the smaller world' },
      ],
      bridge:
        'The division by P(B) is not a formal nicety — it is literally "out of how many are left". If the front rows contain 40 students and 30 of them passed, the conditional probability is 30/40 = 0.75, which is exactly P(passed and front) / P(front) = (30/200)/(40/200). The two forms are the same arithmetic written at different scales. Independence is then the statement that the front-row pass rate happens to equal the whole-hall pass rate, so the seating information was worthless.',
      limitations:
        'The hall analogy suggests conditioning is just filtering rows of a dataset, which is true for observed data but not for interventions. Filtering to front-row students tells you about students who chose to sit there; it does not tell you what would happen if you *moved* a back-row student to the front. That distinction — observing versus doing — is the heart of causal inference and returns in STAT-015.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'How conditioning works, step by step',
        caption: 'Every conditional probability is these four moves.',
        steps: [
          { label: 'Start with the full sample space', detail: 'All outcomes, with probabilities summing to 1.' },
          { label: 'Learn that B happened', detail: 'New information arrives — the email contains the word "free".' },
          { label: 'Discard everything where B is false', detail: 'Those outcomes now have probability 0; only the B-region survives.' },
          { label: 'Renormalise by dividing by P(B)', detail: 'Scale up the survivors so they sum to 1 again inside the smaller world.' },
          { label: 'Read off the fraction that also has A', detail: 'That fraction is P(A given B).' },
        ],
      },
      {
        kind: 'table',
        title: 'A contingency table: 1,000 emails',
        caption: 'Every joint, marginal and conditional probability in this unit can be read directly off these six numbers.',
        columns: ['', 'Contains "free"', 'Does not contain "free"', 'Row total'],
        rows: [
          ['Spam', '180', '120', '300'],
          ['Not spam', '35', '665', '700'],
          ['Column total', '215', '785', '1000'],
        ],
      },
      {
        kind: 'compare',
        title: 'Two conditionals that are not the same number',
        caption: 'Swapping the condition changes the denominator, and therefore the answer.',
        left: {
          heading: 'P(spam given "free") = 180/215 ≈ 0.837',
          points: [
            'Denominator: the 215 emails containing "free"',
            'Question: of the emails with this word, how many are spam?',
            'This is what a spam filter needs at prediction time',
            'Depends heavily on how common spam is overall',
          ],
        },
        right: {
          heading: 'P("free" given spam) = 180/300 = 0.600',
          points: [
            'Denominator: the 300 spam emails',
            'Question: of the spam, how much of it uses this word?',
            'This is what you estimate from labelled training data',
            'Does not change when the spam base rate changes',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Move the sliders and watch the conditional move',
        caption: 'Change the base rate and the per-class word rates, and watch P(class given evidence) respond. The gap between the two conditionals is the whole lesson.',
        widget: 'bayes-explorer',
      },
    ],

    formalDefinition:
      'For events A and B with P(B) greater than 0, the conditional probability of A given B is defined as P(A given B) = P(A intersect B) / P(B). This defines a genuine probability measure on the restricted sample space B. Events A and B are independent if and only if P(A intersect B) = P(A)P(B), equivalently P(A given B) = P(A) when P(B) is positive, equivalently P(B given A) = P(B) when P(A) is positive.',

    math: {
      intuition:
        'Conditioning is renormalisation. The joint probability P(A and B) is measured against the whole sample space, but once B is known, the whole space is no longer the right yardstick — B is. Dividing by P(B) rescales that slice so it counts as 1 again. Independence is then a statement about whether the rescaling changed anything: if P(A given B) comes out equal to P(A), then B told you nothing, and rearranging that equality gives the product form P(A and B) = P(A)P(B).',
      formulas: [
        {
          latex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\qquad P(B) > 0',
          name: 'Definition of conditional probability',
          meaning:
            'The probability of A given B is the joint probability of both, divided by the probability of the thing you conditioned on.',
          variables: [
            { symbol: 'P(A \\mid B)', meaning: 'the probability of A in the world where B is known to have occurred' },
            { symbol: 'P(A \\cap B)', meaning: 'the joint probability that A and B both occur, measured on the full sample space' },
            { symbol: 'P(B)', meaning: 'the marginal probability of B — the size of the restricted world, used as the new denominator' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(A \\cap B) = P(A \\mid B)\\,P(B) = P(B \\mid A)\\,P(A)',
          name: 'Chain rule for two events',
          meaning:
            'Rearranging the definition gives two equivalent ways to build a joint probability. Setting them equal is one step away from Bayes theorem.',
          variables: [
            { symbol: 'P(B \\mid A)', meaning: 'the reverse conditional: probability of B given A' },
            { symbol: 'P(A)', meaning: 'the marginal probability of A' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(A \\mid B) = P(A) \\iff P(A \\cap B) = P(A)P(B) \\iff P(B \\mid A) = P(B)',
          name: 'Equivalent statements of independence',
          meaning:
            'Independence can be stated three ways: conditioning does not change A, the joint factorises, or conditioning does not change B. All three say the same thing.',
          variables: [
            { symbol: '\\iff', meaning: 'if and only if — each statement implies the others' },
            { symbol: 'P(A)P(B)', meaning: 'the product of marginals, which the joint must equal exactly under independence' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(A_1 \\cap \\cdots \\cap A_n) = P(A_1)\\,P(A_2 \\mid A_1)\\cdots P(A_n \\mid A_1 \\cap \\cdots \\cap A_{n-1})',
          name: 'General chain rule',
          meaning:
            'Any joint probability over many events factorises into a product of conditionals, each one conditioning on everything already assumed.',
          variables: [
            { symbol: 'n', meaning: 'the number of events being combined' },
            { symbol: 'A_i', meaning: 'the i-th event in the chosen ordering' },
            { symbol: 'P(A_n \\mid \\cdots)', meaning: 'the probability of the last event given all the previous ones' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(A \\cap B \\mid C) = P(A \\mid C)\\,P(B \\mid C)',
          name: 'Conditional independence',
          meaning:
            'A and B are independent once C is known, even though they may be strongly dependent when C is ignored. This is the assumption Naive Bayes makes about features given the class.',
          variables: [
            { symbol: 'C', meaning: 'the conditioning event or variable — in Naive Bayes, the class label' },
            { symbol: 'P(A \\mid C)', meaning: 'probability of A within the world where C holds' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Suppose the sample space has N equally likely outcomes, B contains n_B of them, and A and B together contain n_AB.',
        'Learning that B occurred means the only outcomes still possible are the n_B inside B.',
        'Within that restricted world, the fraction that also lies in A is n_AB / n_B.',
        'Divide numerator and denominator by N: (n_AB / N) / (n_B / N).',
        'But n_AB / N is exactly P(A and B), and n_B / N is exactly P(B).',
        'Hence P(A given B) = P(A and B) / P(B). The definition is counting inside a shrunken world, written in a way that also works when outcomes are not equally likely.',
      ],
    },

    workedExample: {
      title: 'Reading every probability off one contingency table',
      setup:
        'A labelled corpus of 1,000 emails. 300 are spam and 700 are not. Among the spam, 180 contain the word "free"; among the legitimate mail, 35 do. The full table is: spam and "free" 180, spam and no "free" 120, ham and "free" 35, ham and no "free" 665. Every question below is answered by choosing the right denominator.',
      steps: [
        {
          label: 'Marginals — ignore one variable entirely',
          detail: 'Row totals give the class base rates; column totals give how often the word appears at all.',
          latex: 'P(\\text{spam}) = \\tfrac{300}{1000} = 0.30, \\qquad P(\\text{free}) = \\tfrac{215}{1000} = 0.215',
        },
        {
          label: 'Joint — both at once, out of everything',
          detail: '180 of the full 1,000 emails are spam and contain the word. The denominator is the whole corpus.',
          latex: 'P(\\text{spam} \\cap \\text{free}) = \\tfrac{180}{1000} = 0.18',
        },
        {
          label: 'Conditional the useful way round',
          detail:
            'Restrict to the 215 emails containing "free" and ask what fraction are spam. This is what the filter needs when an email arrives.',
          latex: 'P(\\text{spam} \\mid \\text{free}) = \\frac{0.18}{0.215} = \\tfrac{180}{215} \\approx 0.8372',
        },
        {
          label: 'Conditional the other way round',
          detail:
            'Restrict to the 300 spam emails and ask what fraction contain "free". This is what you measure from training data. Note it is a completely different number.',
          latex: 'P(\\text{free} \\mid \\text{spam}) = \\frac{0.18}{0.30} = \\tfrac{180}{300} = 0.60',
        },
        {
          label: 'Test independence',
          detail:
            'If the word carried no information, the joint would equal the product of marginals. It does not: 0.18 is nearly three times 0.0645, so the word is strongly informative.',
          latex: 'P(\\text{spam})P(\\text{free}) = 0.30 \\times 0.215 = 0.0645 \\ne 0.18',
        },
        {
          label: 'Quantify how much the evidence moved you',
          detail:
            'The base rate of spam was 0.30. Seeing the word "free" raises it to 0.8372, a factor of 2.79. Equivalently, the likelihood ratio is P(free given spam) / P(free given ham) = 0.60 / 0.05 = 12.',
          latex: '\\frac{P(\\text{free} \\mid \\text{spam})}{P(\\text{free} \\mid \\text{ham})} = \\frac{180/300}{35/700} = \\frac{0.60}{0.05} = 12',
        },
      ],
      conclusion:
        'Every number here came from the same six counts; only the denominator changed. P(spam given "free") = 0.837 and P("free" given spam) = 0.600 are both correct and answer different questions, and swapping them is the single most consequential error in applied probability. The likelihood ratio of 12 is the cleanest summary of how much this one word is worth as evidence, and it is exactly the quantity Bayes theorem multiplies by in the next unit.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Conditioning is filtering, then renormalising',
        runnable: true,
        code: `import pandas as pd

counts = pd.DataFrame(
    {"free": [180, 35], "no_free": [120, 665]},
    index=["spam", "ham"],
)
joint = counts / counts.values.sum()

print("joint:")
print(joint.round(4), "\\n")
print("P(spam)        =", joint.loc["spam"].sum())
print("P(free)        =", joint["free"].sum())
print("P(spam & free) =", joint.loc["spam", "free"])
print("P(spam | free) =", round(joint.loc["spam", "free"] / joint["free"].sum(), 4))
print("P(free | spam) =", round(joint.loc["spam", "free"] / joint.loc["spam"].sum(), 4))`,
        output: `joint:
      free  no_free
spam  0.18    0.120
ham   0.035   0.665 

P(spam)        = 0.3
P(free)        = 0.215
P(spam & free) = 0.18
P(spam | free) = 0.8372
P(free | spam) = 0.6`,
        explanation:
          'Marginals are row and column sums, the joint is a single cell, and each conditional is that same cell divided by a different total. Writing it this way makes the point concrete: the numerator never changes, only the denominator does, and the denominator is whichever world you have decided to live in.',
      },
      {
        language: 'python',
        title: 'Testing independence on real counts',
        runnable: true,
        code: `import numpy as np

def check(name, joint):
    joint = np.asarray(joint, dtype=float)
    joint = joint / joint.sum()
    row = joint.sum(axis=1, keepdims=True)
    col = joint.sum(axis=0, keepdims=True)
    expected = row @ col            # what independence would predict
    gap = np.abs(joint - expected).max()
    print(f"{name}: max |joint - product| = {gap:.4f}  independent={gap < 0.005}")

check("spam / free   ", [[180, 120], [35, 665]])
check("suit / face   ", [[3, 10], [9, 30]])   # hearts vs face cards`,
        output: `spam / free   : max |joint - product| = 0.1155  independent=False
suit / face   : max |joint - product| = 0.0000  independent=True`,
        explanation:
          'The independence test is mechanical: compute what the joint table would look like if the variables were unrelated (the outer product of the marginals) and compare. The spam table is far from it, which is why "free" is a useful feature. The card table matches exactly, confirming that being a heart tells you nothing about being a face card. A chi-squared test of independence is this comparison with a sampling-noise allowance bolted on.',
      },
      {
        language: 'python',
        title: 'Conditional independence: a correlation that vanishes',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)
n = 100_000

# Hot days cause both ice cream sales and swimming accidents.
hot = rng.random(n) < 0.3
ice = rng.random(n) < np.where(hot, 0.8, 0.1)
swim = rng.random(n) < np.where(hot, 0.5, 0.05)

def dep(x, y, mask=None):
    if mask is not None:
        x, y = x[mask], y[mask]
    return np.mean(x & y) - np.mean(x) * np.mean(y)

print(f"overall       : joint - product = {dep(ice, swim):+.4f}")
print(f"given hot     : joint - product = {dep(ice, swim, hot):+.4f}")
print(f"given not hot : joint - product = {dep(ice, swim, ~hot):+.4f}")`,
        output: `overall       : joint - product = +0.0752
given hot     : joint - product = +0.0002
given not hot : joint - product = -0.0001
`,
        explanation:
          'Ice cream sales and swimming accidents are strongly associated overall, yet once you fix the temperature the association disappears entirely. They are conditionally independent given the weather. This is the structure behind every confounded correlation, and it is also the assumption Naive Bayes makes in reverse: it hopes that fixing the class label makes the features independent of one another.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Every supervised classifier',
        usage:
          'A classifier estimates P(label given features). The entire training procedure is an attempt to learn a conditional distribution, which is why more informative features — ones that change the conditional away from the base rate — improve a model and uninformative ones do not.',
      },
      {
        context: 'Churn modelling with imbalanced classes',
        usage:
          'If 3% of customers churn, P(churn) = 0.03 is the marginal. A model is only useful if P(churn given behaviour) departs sharply from 0.03 for some segments. Comparing the conditional against the base rate, rather than against 0.5, is how you judge whether a feature is earning its place.',
      },
      {
        context: 'Medical triage protocols',
        usage:
          'Clinicians routinely need P(disease given symptom) but the literature reports P(symptom given disease), because studies are run on diagnosed patients. Converting between the two requires the base rate, and failing to convert is the classic source of over-diagnosis.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`pd.crosstab` builds contingency tables, and `normalize="index"` or `"columns"` gives you the two conditionals directly.' },
      { tool: 'scikit-learn', role: '`predict_proba` is an estimate of P(class given features) — a conditional distribution, renormalised to sum to 1 across classes.' },
      { tool: 'SciPy', role: '`scipy.stats.chi2_contingency` tests whether a contingency table departs from independence by more than sampling noise.' },
    ],

    commonMistakes: [
      {
        mistake: 'Confusing P(A given B) with P(B given A)',
        why: 'They have different denominators and can differ by orders of magnitude. P("free" given spam) = 0.60 while P(spam given "free") = 0.84 here, and with a rarer class the gap becomes enormous.',
        fix: 'Say the denominator out loud before computing: "out of the emails containing free" versus "out of the spam emails". If the phrase after "out of" differs, the numbers will differ.',
      },
      {
        mistake: 'Concluding independence because the events rarely co-occur',
        why: 'Independence is about whether the joint equals the product of the marginals, not about whether the joint is small. Two rare events can be strongly dependent, and two common ones can be independent.',
        fix: 'Always run the numeric comparison: P(A and B) against P(A)P(B). Rarity is irrelevant to the test.',
      },
      {
        mistake: 'Assuming features are independent because it makes the maths easy',
        why: 'Multiplying per-feature probabilities when features are correlated counts the same evidence repeatedly, producing posteriors pinned at 0 or 1 that are badly calibrated even when the ranking is acceptable.',
        fix: 'Reserve the product form for cases where conditional independence is plausible, and calibrate the outputs afterwards. Where features are obviously redundant, drop or combine them.',
      },
      {
        mistake: 'Treating conditioning on observed data as if it were an intervention',
        why: 'P(recovery given took drug) is computed among people who chose to take the drug, and that choice may correlate with health. It is not the same as the probability of recovery if you gave the drug to everyone.',
        fix: 'Distinguish observation from intervention explicitly. Randomisation is what makes the two coincide, which is exactly why A/B tests randomise assignment.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Define conditional probability and explain why the definition divides by P(B).',
        answer:
          'P(A given B) = P(A and B) / P(B), defined whenever P(B) is positive. The division is a renormalisation. Once you know B occurred, outcomes outside B are no longer possible, so the sample space has shrunk to B. The joint probability P(A and B) is still measured against the original space, which is now the wrong yardstick, so you rescale by the size of the new space. Dividing by P(B) guarantees that the conditional probabilities of B and its complement within the restricted world sum to 1, which is what makes P(given B) an honest probability measure rather than just a ratio. With equally likely outcomes it reduces to counting: outcomes in both A and B, divided by outcomes in B.',
        followUp:
          'A strong answer notes that conditioning yields a genuine probability measure satisfying all the axioms, which is why every rule — addition, multiplication, Bayes — continues to hold inside a conditional world.',
      },
      {
        level: 'ml-engineer',
        question: 'What is the difference between independence and conditional independence, and where does each show up in machine learning?',
        answer:
          'Independence says P(A and B) = P(A)P(B) unconditionally. Conditional independence says P(A and B given C) = P(A given C)P(B given C), which can hold when unconditional independence fails and vice versa. Ice cream sales and drowning incidents are dependent overall but conditionally independent given temperature: the weather was driving both. In machine learning, Naive Bayes assumes features are conditionally independent given the class, which lets it multiply per-feature likelihoods and makes it trainable from very little data. Conditional independence is also the core of graphical models: a Bayesian network is exactly a set of conditional independence claims, and it is what allows a huge joint distribution to factorise into small local terms. The catch in both cases is that the assumption is usually wrong to some degree, which degrades calibration more than it degrades ranking.',
      },
      {
        level: 'advanced',
        question: 'Explain Simpson\'s paradox in terms of conditioning, and say what it means for how you evaluate a model.',
        answer:
          'Simpson\'s paradox is the situation where an association holds within every subgroup but reverses when the subgroups are pooled, or the reverse. It arises because the marginal probability mixes subgroups with different base rates and different group sizes, so the pooled number is a weighted average that need not respect the within-group pattern. The Berkeley admissions case is canonical: women were admitted at a lower rate overall yet at an equal or higher rate in nearly every department, because they applied disproportionately to departments with low admission rates. For model evaluation the lesson is that aggregate metrics can hide, or invent, subgroup effects. A model whose overall accuracy improves may have got worse for every cohort if the cohort mix shifted, so you slice metrics by the variables that plausibly confound them and check that the conditional picture agrees with the marginal one. Deciding which variable to condition on is a causal question, not a statistical one — conditioning on a collider makes things worse, not better.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Using the same 1,000-email table (spam-and-free 180, spam-and-no-free 120, ham-and-free 35, ham-and-no-free 665), compute P(ham given "free") and P(ham given no "free"), and say what the difference tells you about the feature.',
        hint: 'Use the column totals 215 and 785 as the denominators.',
        solution:
          'The table is: spam-and-free 180, spam-and-nofree 120, ham-and-free 35, ham-and-nofree 665.\n\nP(ham given "free") = 35/215 ≈ 0.1628. Note this is 1 - 0.8372, as it must be, since spam and ham partition the restricted world.\nP(ham given no "free") = 665/785 ≈ 0.8471.\n\nThe unconditional P(ham) is 0.70. Seeing "free" drops it to 0.16; not seeing it lifts it to 0.85. Because both conditionals differ substantially from the marginal, the feature carries real information in both directions — which is exactly what you want from a feature. A feature whose presence is informative but whose absence is not would show one conditional moving and the other sitting at the base rate.',
      },
      {
        prompt:
          'Two fair dice are rolled. Let A be "the first die shows 4" and B be "the total is 7". Are A and B independent? Show the calculation, then repeat with B changed to "the total is 8".',
        hint: 'Compute P(A), P(B) and P(A and B) over the 36 equally likely ordered pairs.',
        solution:
          'For total 7: P(A) = 6/36 = 1/6. P(B) = 6/36 = 1/6. A and B together means the pair (4,3), a single outcome, so P(A and B) = 1/36. The product P(A)P(B) = 1/36 as well, so they are independent. Equivalently P(B given A) = 1/6, unchanged from P(B) — knowing the first die is a 4 does not change your chance of a total of 7, because whatever the first die shows, exactly one value of the second die completes a 7.\n\nFor total 8: P(B) = 5/36 (the pairs 2-6, 3-5, 4-4, 5-3, 6-2). P(A and B) is still 1/36, the pair (4,4). The product is (1/6)(5/36) = 5/216 ≈ 0.0231, while the joint is 1/36 ≈ 0.0278. They differ, so A and B are dependent. Concretely, P(total 8 given first die is 4) = 1/6 ≈ 0.167, against a base rate of 5/36 ≈ 0.139: a 4 is a slightly helpful start towards 8.\n\nThe pair of results is instructive — tiny changes in the event definition flip independence on and off, which is why it must be computed rather than guessed.',
      },
      {
        prompt:
          'Using pandas, build a contingency table from a small dataset of your own and produce both conditional distributions. Then state which one a deployed model would use and why.',
        hint: '`pd.crosstab(rows, cols, normalize="index")` and `normalize="columns"` give the two directions.',
        language: 'python',
        starterCode:
          'import pandas as pd\n\ndf = pd.DataFrame({\n    "label": ["spam"] * 300 + ["ham"] * 700,\n    "has_free": [True] * 180 + [False] * 120 + [True] * 35 + [False] * 665,\n})\n',
        solution:
          'import pandas as pd\ndf = pd.DataFrame({\n    "label": ["spam"] * 300 + ["ham"] * 700,\n    "has_free": [True] * 180 + [False] * 120 + [True] * 35 + [False] * 665,\n})\nprint(pd.crosstab(df.label, df.has_free, normalize="index"))   # P(word | label)\nprint(pd.crosstab(df.label, df.has_free, normalize="columns"))  # P(label | word)\n\nThe first table normalises within each label row and gives P(has_free given label): 0.60 for spam, 0.05 for ham. The second normalises within each word column and gives P(label given has_free): 0.8372 spam when the word is present.\n\nA deployed model needs the second direction, because at prediction time it observes the word and must infer the label. But it usually *estimates* the first direction from training data, because per-class word rates are stable while the base rate of spam varies by mailbox and by month. Bayes theorem, in the next unit, is the machinery for turning the first into the second using a base rate you supply separately.',
      },
    ],

    quiz: [
      {
        id: 'STAT-003-q1',
        type: 'numeric',
        concept: 'conditional probability',
        prompt:
          'A box has 5 red and 3 blue balls. You draw two without replacement. Given that the first is red, what is the probability the second is red? Give a decimal to three places.',
        answer: 0.571,
        tolerance: 0.01,
        explanation:
          'After removing one red, 4 reds remain among 7 balls, so 4/7 ≈ 0.571. Conditioning has literally shrunk the sample space from 8 balls to 7.',
      },
      {
        id: 'STAT-003-q2',
        type: 'mcq',
        concept: 'direction of conditioning',
        prompt:
          'A study reports that 95% of people with the flu have a fever. Which quantity is this, and can you conclude that 95% of feverish people have the flu?',
        options: [
          'It is P(fever given flu); no, P(flu given fever) needs the base rates of flu and fever',
          'It is P(flu given fever); yes, the two are interchangeable',
          'It is the joint probability P(flu and fever); yes, it applies either way',
          'It is P(fever); no conclusion about flu is possible at all',
        ],
        answerIndex: 0,
        explanation:
          'The study conditioned on having the flu, so the denominator is flu patients. Reversing the conditional requires Bayes theorem and the marginal rates; fever is far more common than flu, so P(flu given fever) is much lower than 95%.',
      },
      {
        id: 'STAT-003-q3',
        type: 'truefalse',
        concept: 'independence test',
        prompt: 'If P(A and B) is very small, then A and B are close to independent.',
        answer: false,
        explanation:
          'Independence requires P(A and B) to equal P(A)P(B), not to be small. Two rare events can be perfectly correlated, and the joint will still be small. The comparison against the product is the only valid test.',
      },
      {
        id: 'STAT-003-q4',
        type: 'fill',
        concept: 'definition',
        prompt:
          'Complete the definition: P(A given B) equals P(A and B) divided by ______.',
        answers: ['P(B)', 'the probability of B', 'P of B', 'the marginal probability of B'],
        explanation:
          'Dividing by P(B) renormalises the joint probability against the restricted sample space, so conditional probabilities within that smaller world still sum to 1.',
      },
      {
        id: 'STAT-003-q5',
        type: 'multi',
        concept: 'equivalent forms of independence',
        prompt: 'Which statements are equivalent to "A and B are independent", assuming both have non-zero probability? Select all that apply.',
        options: [
          'P(A and B) = P(A)P(B)',
          'P(A given B) = P(A)',
          'P(B given A) = P(B)',
          'P(A and B) = 0',
          'P(A or B) = P(A) + P(B)',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'The first three are the standard equivalent formulations. The last two describe mutually exclusive events, which is the opposite situation: exclusivity forces maximal dependence.',
      },
      {
        id: 'STAT-003-q6',
        type: 'explain',
        concept: 'conditional independence',
        prompt:
          'Ice cream sales and drowning incidents are strongly correlated across the year, but the correlation vanishes once you look within a single temperature band. Explain what is going on using conditional probability, and say what this implies for a model that uses ice cream sales as a feature.',
        rubric: [
          'Identifies temperature as a common cause producing the unconditional association',
          'States that the two are conditionally independent given temperature',
          'Notes that a predictive model can still exploit the correlation, but a causal claim or an intervention cannot',
        ],
        sampleAnswer:
          'Hot weather raises both ice cream sales and the number of people swimming, so the two move together across the year even though neither influences the other. Written formally, P(drowning and ice cream) is much larger than P(drowning)P(ice cream), so they are dependent; but once you condition on temperature, P(drowning and ice cream given temp) equals the product of the two conditionals, so they are conditionally independent given temperature. For a purely predictive model this is not fatal: ice cream sales are a legitimate proxy for temperature and will genuinely improve forecasts, as long as the relationship between weather and ice cream stays stable. What you cannot do is act on it. Banning ice cream would not reduce drownings, and if the proxy relationship breaks — a price change, a new competitor — the model degrades for reasons that have nothing to do with drowning.',
        explanation:
          'The distinction being tested is between a feature that predicts and a feature that causes. Conditional independence given a common cause is the formal signature of a proxy.',
      },
    ],

    flashcards: [
      { front: 'Definition of conditional probability', back: 'P(A given B) = P(A and B) / P(B). Restrict the sample space to B, then renormalise so it sums to 1 again.' },
      { front: 'Why divide by P(B)?', back: 'Because B is the new sample space. Dividing rescales the surviving outcomes so they form a proper probability distribution.' },
      { front: 'Joint vs marginal vs conditional', back: 'Joint: both, out of everything. Marginal: one, ignoring the other (a row or column total). Conditional: one, out of the subset where the other holds.' },
      { front: 'Three equivalent statements of independence', back: 'P(A and B) = P(A)P(B); P(A given B) = P(A); P(B given A) = P(B).' },
      { front: 'What is conditional independence?', back: 'P(A and B given C) = P(A given C)P(B given C). Two variables can be dependent overall yet independent once C is fixed.' },
      { front: 'Why is P(A|B) not P(B|A)?', back: 'Different denominators. P("free"|spam) = 0.60 but P(spam|"free") = 0.84 — same numerator, different worlds. Swapping them is the prosecutor\'s fallacy.' },
    ],

    challenge: {
      title: 'A conditional probability report for any two columns',
      brief:
        'Write a function that takes a pandas DataFrame and the names of two binary columns and prints a full report: the 2x2 contingency table of counts, the joint distribution, both marginals, both conditional distributions, the product-of-marginals table that independence would predict, and a verdict on whether the two columns are independent within a stated tolerance. Test it on a dataset where you know the answer, such as a simulated one with a deliberately planted dependence.',
      language: 'python',
      acceptanceCriteria: [
        'Both conditional directions are printed and clearly labelled with their denominators',
        'The independence verdict compares the observed joint against the outer product of the marginals',
        'The function works on any two binary columns without hard-coded names',
        'It is demonstrated on one dependent pair and one independent pair',
      ],
      starterCode:
        'import pandas as pd\nimport numpy as np\n\ndef conditional_report(df: pd.DataFrame, a: str, b: str, tol: float = 0.01) -> None:\n    """Print joint, marginal and conditional probabilities for two binary columns."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain conditional probability to someone who has met basic probability but nothing else. Use a concrete table of counts, and make sure they end up understanding why P(A given B) and P(B given A) are different.',
      mustCover: [
        'Conditioning means restricting the sample space to outcomes consistent with what you now know',
        'The division by P(B) is a renormalisation so the smaller world sums to 1 again',
        'P(A given B) and P(B given A) share a numerator but have different denominators',
        'Independence means the conditional equals the unconditional — the evidence changed nothing',
      ],
      bonusSignals: [
        'uses a contingency table with real counts',
        'names the prosecutor\'s fallacy or gives a medical example of reversing the conditional',
        'mentions that a classifier is estimating P(label given features)',
      ],
      sampleExplanation:
        'Conditional probability is what happens to a probability when you learn something. Take 1,000 emails: 300 are spam, 700 are not. Knowing nothing, the chance a random one is spam is 300 out of 1,000, so 0.30. Now suppose you open it and see the word "free". You no longer care about all 1,000 emails — you care only about the 215 that contain that word. Of those, 180 are spam. So the probability is now 180 out of 215, about 0.84. Nothing about the emails changed; you simply stopped looking at the ones you now know it is not, and recounted among what was left. That recount is exactly what the formula does: P(spam given "free") = P(spam and "free") divided by P("free"), and the division is just "out of how many are left". Here is the part that catches people. Ask the opposite question — of the 300 spam emails, how many contain "free"? — and you get 180 out of 300, which is 0.60. Same 180 on top, completely different number, because the denominator changed from 215 to 300. These two quantities get swapped all the time, and in medicine it is dangerous: "95% of flu patients have a fever" is nothing like "95% of feverish people have flu", because fever is common and flu is not. Finally, if learning the word had left the probability sitting at 0.30, the word would have told you nothing, and we would say spam and that word are independent.',
    },
  },

  {
    id: 'STAT-004',
    domain: 'STAT',
    module: 'Conditional Probability',
    topic: 'Bayes theorem',
    title: "Bayes' Theorem",
    slug: 'bayes-theorem',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['STAT-003'],
    related: ['STAT-001', 'STAT-002', 'STAT-003'],
    tags: ['bayes', 'prior', 'posterior', 'likelihood', 'base rate', 'naive bayes', 'false positives'],

    learningObjectives: [
      'Derive Bayes theorem in two lines from the definition of conditional probability',
      'Name and interpret the prior, likelihood, evidence and posterior in a concrete problem',
      'Explain why a 99%-accurate test for a rare disease produces mostly false positives, with numbers',
      'Use the law of total probability to compute the evidence term when it is not given directly',
      'Connect the theorem to Naive Bayes classification and to the base-rate fallacy in model evaluation',
    ],

    terminology: [
      {
        term: 'Prior',
        definition:
          'P(H), the probability assigned to a hypothesis before seeing the current evidence. In diagnostics it is the prevalence or base rate.',
        simple: 'What you believed before the new information arrived.',
      },
      {
        term: 'Likelihood',
        definition:
          'P(E given H), the probability of observing the evidence if the hypothesis were true. Read as a function of the hypothesis with the evidence fixed, it is not itself a probability distribution over hypotheses.',
        simple: 'How expected this evidence would be, if the hypothesis were right.',
      },
      {
        term: 'Evidence (marginal likelihood)',
        definition:
          'P(E), the total probability of seeing the evidence under every hypothesis weighted by its prior. It is the normalising constant that makes the posterior sum to 1.',
        simple: 'How often this evidence shows up at all, across all the possibilities.',
      },
      {
        term: 'Posterior',
        definition: 'P(H given E), the updated probability of the hypothesis after taking the evidence into account.',
        simple: 'What you believe after the new information.',
      },
      {
        term: 'Base-rate fallacy',
        definition:
          'The error of judging P(H given E) from the likelihood alone while ignoring how rare H is to begin with. It is the most consequential mistake in applied probability.',
        simple: 'Forgetting that a rare thing is still rare even after a suggestive clue.',
      },
      {
        term: 'Law of total probability',
        definition:
          'P(E) = sum over a partition of the hypothesis space of P(E given H_i) P(H_i). It is how you compute the denominator of Bayes theorem from quantities you actually know.',
        simple: 'Add up all the ways the evidence could have arisen.',
      },
    ],

    simpleExplanation:
      'Bayes theorem answers one question: I believed something with a certain strength, then I saw a clue — how strongly should I believe it now? The answer has a shape that is easy to remember. Start with how likely the thing was before the clue. Multiply by how well the clue fits that explanation. Divide by how often the clue turns up in general, across every explanation. What makes it powerful is the last part. A clue that fits your favourite explanation perfectly is still worthless if it also turns up constantly for other reasons. This is why a test that is right 99% of the time can still be wrong most of the time it says yes: if only one person in a thousand has the disease, the tiny 1% error rate applied to the enormous healthy population produces far more false alarms than there are genuine cases. The theorem is not a trick — it is just the definition of conditional probability rearranged — but it corrects an instinct that is wrong so reliably that doctors, lawyers and engineers all get it wrong without it.',

    whyItExists:
      'You almost always know P(evidence given cause) — that is what studies and labelled training data measure — but you need P(cause given evidence) to make a decision. Bayes theorem exists to flip that conditional, and it makes explicit that the flip is impossible without the base rate, which is precisely the quantity human intuition throws away.',

    analogy: {
      scenario:
        'A fire alarm goes off in a building. Before you panic, ask three things. How often is there actually a fire in this building in a given year? Almost never. If there were a fire, would the alarm sound? Yes, almost certainly. And how often does this alarm sound anyway — burnt toast, steam from a shower, someone testing it? Constantly. The alarm is excellent at detecting fires and still, when it sounds, the overwhelmingly likely explanation is toast, because fires are rare and toast is not.',
      mapping: [
        { from: 'How often there is a fire, before any alarm', to: 'The prior, P(fire)' },
        { from: 'Whether the alarm would sound if there were a fire', to: 'The likelihood, P(alarm given fire)' },
        { from: 'How often the alarm sounds for any reason at all', to: 'The evidence, P(alarm)' },
        { from: 'Your belief that there is a fire now that it is ringing', to: 'The posterior, P(fire given alarm)' },
        { from: 'Toast, steam and drills', to: 'The false-positive mass contributed by the many non-fire cases' },
      ],
      bridge:
        'Divide the fire numbers and the theorem falls out exactly: P(fire given alarm) = P(alarm given fire) P(fire) / P(alarm). Notice what the analogy makes obvious and the algebra can obscure — a good detector is not enough. The alarm being near-perfect at spotting real fires does nothing to stop toast dominating the denominator. That denominator is the whole reason rare-disease testing behaves so counter-intuitively.',
      limitations:
        'The alarm story implies you know the prior. Often you do not, and the honest answer is a range: compute the posterior for a prior of 0.001 and for 0.01 and see whether the decision changes. Where the conclusion flips over a plausible range of priors, the evidence was not strong enough to settle the question.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Updating a belief with evidence',
        caption: 'The same four quantities appear in every application, from spam filtering to medical testing.',
        steps: [
          { label: 'State the prior', detail: 'How likely is the hypothesis before this evidence? For a disease, the prevalence.' },
          { label: 'State the likelihoods', detail: 'How likely is this evidence if the hypothesis is true, and if it is false? Sensitivity and 1 - specificity.' },
          { label: 'Compute the evidence', detail: 'Total probability of seeing this evidence: true positives plus false positives, weighted by the prior.' },
          { label: 'Divide', detail: 'Posterior = prior x likelihood / evidence. The result is a probability over hypotheses.' },
          { label: 'Sanity-check against the prior', detail: 'Did the belief move in the direction the evidence should push it, and by a plausible amount?' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of Bayes theorem',
        subject: 'P(H | E) = P(E | H) x P(H) / P(E)',
        annotations: [
          { part: 'P(H | E)', note: 'Posterior — what you want. The updated belief in the hypothesis after seeing the evidence.' },
          { part: 'P(E | H)', note: 'Likelihood — how well the hypothesis explains the evidence. This is what labelled data and clinical studies give you.' },
          { part: 'P(H)', note: 'Prior — how plausible the hypothesis was beforehand. The base rate everyone forgets.' },
          { part: 'P(E)', note: 'Evidence — how often this observation happens at all. Expand it with the law of total probability when it is not given.' },
          { part: 'P(E | H) / P(E)', note: 'The support factor: greater than 1 means the evidence raises your belief, less than 1 means it lowers it.' },
        ],
      },
      {
        kind: 'table',
        title: 'A 99%-accurate test in a population of 100,000',
        caption: 'Prevalence 0.1%, sensitivity 99%, specificity 99%. Every number below is a count of people.',
        columns: ['', 'Test positive', 'Test negative', 'Row total'],
        rows: [
          ['Has the disease', '99', '1', '100'],
          ['Does not have it', '999', '98,901', '99,900'],
          ['Column total', '1,098', '98,902', '100,000'],
        ],
      },
      {
        kind: 'widget',
        title: 'Drag the prevalence and watch the posterior collapse',
        caption: 'Hold sensitivity and specificity at 99% and slide the prevalence from 50% down to 0.1%. The posterior falls from 99% to 9% without the test getting any worse.',
        widget: 'bayes-explorer',
      },
      {
        kind: 'compare',
        title: 'Two questions people constantly swap',
        caption: 'Both are about the same test; they differ by which world you are standing in.',
        left: {
          heading: 'Sensitivity: P(positive | disease) = 0.99',
          points: [
            'Denominator: the 100 people who have the disease',
            'A property of the test, fixed by its design',
            'Measured in a lab on known cases',
            'Unchanged when you move to a different population',
          ],
        },
        right: {
          heading: 'Precision / PPV: P(disease | positive) = 0.09',
          points: [
            'Denominator: the 1,098 people who tested positive',
            'A property of the test *and* the population',
            'What the patient in the chair actually wants to know',
            'Collapses as the disease becomes rarer',
          ],
        },
      },
    ],

    formalDefinition:
      'For events H and E with P(E) greater than 0, Bayes theorem states P(H given E) = P(E given H) P(H) / P(E). When the hypothesis space is partitioned into mutually exclusive, exhaustive hypotheses H_1 through H_k, the denominator expands by the law of total probability to the sum over i of P(E given H_i) P(H_i), giving P(H_j given E) = P(E given H_j)P(H_j) divided by that sum. The theorem is an immediate consequence of the two ways of writing the joint probability P(H intersect E).',

    math: {
      intuition:
        'The whole theorem is one algebraic rearrangement. The joint probability of hypothesis and evidence can be built in two directions — start with the hypothesis and ask for the evidence, or start with the evidence and ask for the hypothesis. Both must give the same number, so setting them equal and dividing gives you a way to convert one conditional into the other. The prior is the price of admission: you cannot flip a conditional without knowing how common the hypothesis was to begin with. The odds form at the end is worth memorising, because it strips away the awkward denominator and shows that evidence acts multiplicatively on odds.',
      formulas: [
        {
          latex: 'P(H \\mid E) = \\frac{P(E \\mid H)\\,P(H)}{P(E)}',
          name: "Bayes' theorem",
          meaning:
            'The updated probability of a hypothesis equals its prior probability times how well it explains the evidence, divided by how likely that evidence was overall.',
          variables: [
            { symbol: 'H', meaning: 'the hypothesis — for example, that a patient has the disease' },
            { symbol: 'E', meaning: 'the observed evidence — for example, a positive test result' },
            { symbol: 'P(H \\mid E)', meaning: 'the posterior: belief in H after seeing E' },
            { symbol: 'P(E \\mid H)', meaning: 'the likelihood: how probable E is when H holds (the test sensitivity)' },
            { symbol: 'P(H)', meaning: 'the prior: belief in H before seeing E (the prevalence or base rate)' },
            { symbol: 'P(E)', meaning: 'the evidence: total probability of observing E under all hypotheses' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(E) = \\sum_{i=1}^{k} P(E \\mid H_i)\\,P(H_i)',
          name: 'Law of total probability',
          meaning:
            'The overall probability of the evidence is the sum, over every mutually exclusive way the world could be, of how likely the evidence is in that world times how likely that world is.',
          variables: [
            { symbol: 'H_i', meaning: 'the i-th hypothesis in a mutually exclusive, exhaustive partition' },
            { symbol: 'k', meaning: 'the number of hypotheses in the partition' },
            { symbol: 'P(H_i)', meaning: 'the prior weight of the i-th hypothesis' },
            { symbol: '\\sum', meaning: 'sum over all hypotheses, which guarantees the posteriors add to 1' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(H \\mid E) = \\frac{P(E \\mid H)P(H)}{P(E \\mid H)P(H) + P(E \\mid \\neg H)P(\\neg H)}',
          name: 'Two-hypothesis form',
          meaning:
            'For a yes-or-no hypothesis, the denominator is simply the true positives plus the false positives. This is the form used for every medical-test calculation.',
          variables: [
            { symbol: '\\neg H', meaning: 'the complement of H — the hypothesis is false' },
            { symbol: 'P(E \\mid \\neg H)', meaning: 'the false-positive rate, which equals 1 minus the specificity' },
            { symbol: 'P(\\neg H)', meaning: '1 minus the prior; for a rare disease this is close to 1, which is why the false-positive term dominates' },
          ],
          category: 'probability',
        },
        {
          latex: '\\underbrace{\\frac{P(H \\mid E)}{P(\\neg H \\mid E)}}_{\\text{posterior odds}} = \\underbrace{\\frac{P(E \\mid H)}{P(E \\mid \\neg H)}}_{\\text{likelihood ratio}} \\times \\underbrace{\\frac{P(H)}{P(\\neg H)}}_{\\text{prior odds}}',
          name: 'Odds form of Bayes theorem',
          meaning:
            'Evidence multiplies the odds. The awkward denominator cancels, leaving a clean statement: posterior odds are prior odds scaled by the likelihood ratio.',
          variables: [
            { symbol: '\\frac{P(H)}{P(\\neg H)}', meaning: 'prior odds — the ratio of belief for to against, before evidence' },
            { symbol: '\\frac{P(E \\mid H)}{P(E \\mid \\neg H)}', meaning: 'the likelihood ratio or Bayes factor: how many times more expected the evidence is under H than under not-H' },
            { symbol: '\\frac{P(H \\mid E)}{P(\\neg H \\mid E)}', meaning: 'posterior odds, convertible back to a probability via odds/(1 + odds)' },
          ],
          category: 'probability',
        },
        {
          latex: '\\hat{y} = \\arg\\max_{c}\; P(c)\\prod_{j=1}^{d} P(x_j \\mid c)',
          name: 'Naive Bayes classifier',
          meaning:
            'Pick the class with the highest posterior. The evidence term is the same for every class so it can be dropped, and the likelihood is factorised by assuming features are conditionally independent given the class.',
          variables: [
            { symbol: '\\hat{y}', meaning: 'the predicted class label' },
            { symbol: 'c', meaning: 'a candidate class' },
            { symbol: 'P(c)', meaning: 'the class prior, estimated from training-set frequencies' },
            { symbol: 'x_j', meaning: 'the value of the j-th feature' },
            { symbol: 'd', meaning: 'the number of features' },
            { symbol: '\\prod', meaning: 'the product over features — valid only under the conditional independence assumption' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'Start from the definition of conditional probability, applied in both directions.',
        'P(H given E) = P(H and E) / P(E), provided P(E) is positive.',
        'P(E given H) = P(H and E) / P(H), provided P(H) is positive.',
        'Rearrange the second to get P(H and E) = P(E given H) P(H). The joint probability is the same object either way round.',
        'Substitute that expression for P(H and E) into the first equation.',
        'This gives P(H given E) = P(E given H) P(H) / P(E), which is Bayes theorem. No new assumption was introduced at any step.',
        'Finally, if P(E) is unknown, expand it with the law of total probability as P(E given H)P(H) + P(E given not-H)P(not-H), since H and not-H partition the space.',
      ],
    },

    workedExample: {
      title: 'The 99%-accurate test that is wrong 91% of the time it says yes',
      setup:
        'A disease affects 1 in 1,000 people. A screening test has sensitivity 99% (it correctly flags 99% of people who have the disease) and specificity 99% (it correctly clears 99% of people who do not). You take the test as part of a routine screen, with no symptoms. It comes back positive. What is the probability you have the disease? Write your instinctive answer down before reading on; most people, including most physicians asked this question in published studies, say around 99%.',
      steps: [
        {
          label: 'Write down the three inputs',
          detail: 'Prior (prevalence), sensitivity, and false-positive rate, which is 1 minus specificity.',
          latex: 'P(D) = 0.001, \\quad P(+ \\mid D) = 0.99, \\quad P(+ \\mid \\neg D) = 0.01',
        },
        {
          label: 'Take a concrete population of 100,000',
          detail: 'Counting people is far less error-prone than manipulating decimals, and it makes the answer obvious rather than merely correct.',
          latex: '100{,}000 \\times 0.001 = 100 \\text{ with the disease}, \\quad 99{,}900 \\text{ without}',
        },
        {
          label: 'Count the true positives',
          detail: 'Of the 100 people who have it, the test catches 99. The test is genuinely excellent at its job.',
          latex: '100 \\times 0.99 = 99',
        },
        {
          label: 'Count the false positives',
          detail:
            'Of the 99,900 healthy people, 1% are wrongly flagged. A 1% error rate is small, but the healthy population is enormous, so it produces 999 false alarms.',
          latex: '99{,}900 \\times 0.01 = 999',
        },
        {
          label: 'Total positives — this is the evidence term',
          detail: 'Everyone who got a positive result, whether correctly or not.',
          latex: 'P(+) = \\frac{99 + 999}{100{,}000} = \\frac{1098}{100{,}000} = 0.01098',
        },
        {
          label: 'Divide: the posterior',
          detail: 'Of the 1,098 people holding a positive result, only 99 actually have the disease.',
          latex: 'P(D \\mid +) = \\frac{99}{1098} \\approx 0.0902',
        },
        {
          label: 'Confirm with the formula',
          detail: 'Same answer, same arithmetic, less intuitive presentation.',
          latex: 'P(D \\mid +) = \\frac{0.99 \\times 0.001}{0.99 \\times 0.001 + 0.01 \\times 0.999} = \\frac{0.00099}{0.01098} \\approx 0.0902',
        },
        {
          label: 'Now test again, and watch the prior do its work',
          detail:
            'A second independent positive uses the first posterior as the new prior: 0.0902. The likelihood ratio is 99, so the posterior odds become (0.0902/0.9098) x 99 = 9.815, which is a probability of 9.815/10.815.',
          latex: 'P(D \\mid ++) = \\frac{9.815}{1 + 9.815} \\approx 0.9075',
        },
      ],
      conclusion:
        'A single positive result means about a 9% chance of disease, not 99%. Nothing is wrong with the test: the 999 false positives exist because 1% of a very large healthy group outnumbers 99% of a very small sick group. This is the base-rate fallacy, and it is exactly why screening programmes confirm positives with a second test — which, as the last step shows, pushes the posterior above 90%. The identical arithmetic governs fraud detection, rare-class classification and anomaly alerting: precision collapses as the positive class becomes rare, no matter how good the model looks on recall.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Bayes theorem as a function, and the effect of prevalence',
        runnable: true,
        code: `def posterior(prior, sensitivity, false_positive_rate):
    """P(disease | positive test)."""
    true_pos = sensitivity * prior
    false_pos = false_positive_rate * (1 - prior)
    return true_pos / (true_pos + false_pos)

print(" prevalence   P(disease | +)")
for prevalence in [0.5, 0.1, 0.01, 0.001, 0.0001]:
    p = posterior(prevalence, sensitivity=0.99, false_positive_rate=0.01)
    print(f"  {prevalence:>8.4f}      {p:>8.4f}")`,
        output: ` prevalence   P(disease | +)
    0.5000        0.9900
    0.1000        0.9167
    0.0100        0.5000
    0.0010        0.0902
    0.0001        0.0098`,
        explanation:
          'The test never changes across these rows — only the population does. At 50% prevalence a positive result is nearly conclusive; at 0.01% it is almost meaningless. Notice the row where prevalence equals the false-positive rate: the posterior is exactly 0.5, a coin flip. That is the crossover point, and it is a useful thing to be able to spot instantly: when the base rate falls below your false-positive rate, positives are more often wrong than right.',
      },
      {
        language: 'python',
        title: 'Sequential updating: today\'s posterior is tomorrow\'s prior',
        runnable: true,
        code: `def update(prior_odds, likelihood_ratio):
    return prior_odds * likelihood_ratio

def odds_to_prob(o):
    return o / (1 + o)

prior = 0.001
odds = prior / (1 - prior)
lr = 0.99 / 0.01          # likelihood ratio of a positive result

for test in range(1, 4):
    odds = update(odds, lr)
    print(f"after {test} positive test(s): P(disease) = {odds_to_prob(odds):.4f}")`,
        output: `after 1 positive test(s): P(disease) = 0.0902
after 2 positive test(s): P(disease) = 0.9075
after 3 positive test(s): P(disease) = 0.9990`,
        explanation:
          'The odds form makes updating trivial: multiply by the likelihood ratio each time and the normalising constant never appears. This is why Bayesian reasoning composes — evidence arrives one piece at a time and each update starts from where the last one finished. The assumption doing the work is that the test errors are independent, which for a repeated laboratory assay on the same sample is often false, since a contaminated sample fails the same way twice.',
      },
      {
        language: 'python',
        title: 'Naive Bayes is this theorem with a product of likelihoods',
        runnable: true,
        code: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

train = ["free money now", "claim your free prize", "win cash free",
         "meeting at three", "project update attached", "lunch tomorrow"]
labels = ["spam", "spam", "spam", "ham", "ham", "ham"]

vec = CountVectorizer()
X = vec.fit_transform(train)
model = MultinomialNB(alpha=1.0).fit(X, labels)

for text in ["free prize", "project meeting"]:
    probs = model.predict_proba(vec.transform([text]))[0]
    pairs = dict(zip(model.classes_, probs.round(3)))
    print(f"{text!r:20} -> {pairs}")`,
        output: `'free prize'         -> {'ham': 0.09, 'spam': 0.91}
'project meeting'    -> {'ham': 0.938, 'spam': 0.062}`,
        explanation:
          'Under the hood this is the theorem: class prior times the product of per-word likelihoods, normalised across classes so the two numbers sum to 1. The `alpha=1.0` is Laplace smoothing, which exists because a word never seen in a class would give a likelihood of exactly 0 and annihilate the entire product regardless of the other evidence. The probabilities it returns are typically overconfident, because the conditional independence assumption counts correlated words as separate evidence — so use it to rank, and calibrate before using it to decide.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Fraud detection at low base rates',
        usage:
          'With 0.1% fraud, a model with 99% recall and a 1% false-positive rate flags roughly 999 legitimate transactions for every 99 fraudulent ones. Review teams are sized by that ratio, not by the model\'s recall, which is why precision at a fixed alert volume is the metric that actually gets negotiated.',
      },
      {
        context: 'A/B test interpretation',
        usage:
          'If historically only one in ten proposed model changes is a genuine improvement, then a "significant at p < 0.05" result has a posterior probability of being real that is far below 95%. The prior over hypotheses is what converts a p-value into a belief, and ignoring it is why so many shipped wins fail to replicate.',
      },
      {
        context: 'Spam filtering',
        usage:
          'Paul Graham\'s 2002 essay "A Plan for Spam" popularised Bayesian filtering, which multiplies per-token likelihood ratios against a prior. It cut spam dramatically with a model simple enough to run on a mail server of the period.',
      },
      {
        context: 'Courtroom reasoning',
        usage:
          'The prosecutor\'s fallacy — presenting a one-in-a-million match probability as a one-in-a-million chance of innocence — is exactly the omission of the prior. With a suspect pool of ten million, a one-in-a-million match is expected to occur ten times by chance alone.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`GaussianNB`, `MultinomialNB` and `BernoulliNB` implement the theorem with different likelihood models.' },
      { tool: 'PyMC', role: 'Full Bayesian inference: you declare priors and a likelihood, and it samples the posterior when the integral has no closed form.' },
      { tool: 'scikit-learn metrics', role: '`precision_score` is P(positive class given predicted positive) — a posterior — while `recall_score` is the likelihood P(predicted positive given positive class).' },
    ],

    commonMistakes: [
      {
        mistake: 'Ignoring the base rate and reading the posterior off the likelihood',
        why: 'People hear "99% accurate" and answer 99%. The likelihood P(+ given disease) says nothing on its own about P(disease given +), because the latter depends on how many healthy people there are to generate false positives.',
        fix: 'Always instantiate a concrete population of 10,000 or 100,000 people and count the four cells. If the numbers surprise you, they were going to surprise you in production too.',
      },
      {
        mistake: 'Forgetting to expand P(E) with the law of total probability',
        why: 'The evidence term is rarely handed to you. Using only the true-positive branch as the denominator gives a posterior of exactly 1, which is obviously wrong and yet is a very common slip.',
        fix: 'Write the denominator as two terms every time: P(E given H)P(H) + P(E given not-H)P(not-H). The second term is the false positives, and it is usually the larger one.',
      },
      {
        mistake: 'Treating the posterior as if it were the likelihood on the next round',
        why: 'When updating sequentially, the previous posterior becomes the new prior, not the new likelihood. Mixing them double-counts evidence and drives the belief to 0 or 1 far too fast.',
        fix: 'Use the odds form: posterior odds = prior odds x likelihood ratio. Carry the odds forward and multiply by a fresh likelihood ratio for each new, genuinely independent, observation.',
      },
      {
        mistake: 'Assuming repeated tests are independent',
        why: 'The clean sequential update requires errors to be independent given the truth. Re-running the same assay on the same contaminated sample, or re-scoring the same email with the same model, reproduces the same error rather than providing new evidence.',
        fix: 'Only multiply likelihood ratios for genuinely independent evidence — a different assay, a different modality, a fresh sample — and be sceptical of confidence that grows suspiciously fast.',
      },
      {
        mistake: 'Confusing the likelihood with a probability over hypotheses',
        why: 'P(E given H) read as a function of H does not integrate to 1 and is not a distribution over hypotheses. Maximising it (maximum likelihood) is not the same as finding the most probable hypothesis unless the prior is flat.',
        fix: 'Keep the two directions labelled. If the quantity has the hypothesis after the bar it is a likelihood; if the hypothesis is before the bar it is a posterior.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'A disease affects 1 in 1,000 people. A test has 99% sensitivity and 99% specificity. You test positive. What is the probability you have the disease?',
        answer:
          'About 9%. Take 100,000 people: 100 have the disease and 99,900 do not. The test catches 99 of the 100 true cases, and wrongly flags 1% of the 99,900 healthy people, which is 999 false positives. So 1,098 people test positive and only 99 of them are ill, giving 99/1098 = 0.0902. The formula gives the same thing: (0.99 x 0.001) / (0.99 x 0.001 + 0.01 x 0.999) = 0.00099/0.01098. The intuition is that a 1% error rate applied to a huge healthy population produces far more false positives than there are true cases in a tiny sick population. This is why screening programmes always confirm with a second, ideally different, test — a second independent positive pushes the posterior above 90%.',
        followUp:
          'Strong candidates volunteer the crossover rule: when prevalence drops below the false-positive rate, a positive result is more often wrong than right. They also connect it to precision in rare-class classification without being prompted.',
      },
      {
        level: 'ml-engineer',
        question: 'Derive Bayes theorem, and explain what each term corresponds to when training a classifier.',
        answer:
          'Start from the definition of conditional probability written both ways: P(H given E) = P(H and E)/P(E) and P(E given H) = P(H and E)/P(H). The joint P(H and E) is the same quantity in both, so substituting gives P(H given E) = P(E given H)P(H)/P(E). In classification, H is a class label and E is the observed feature vector. The prior P(H) is the class base rate, estimated from training-set label frequencies. The likelihood P(E given H) is the feature distribution within each class, which is what a generative model such as Naive Bayes or a Gaussian mixture explicitly fits. The evidence P(E) is the same for every class so it drops out of an argmax, which is why you often see the unnormalised product used for prediction. The posterior P(H given E) is what you actually want and what a discriminative model such as logistic regression estimates directly, skipping the generative decomposition entirely.',
        followUp:
          'The strongest answers use this to explain the generative-versus-discriminative distinction, and note that generative models can handle missing features and generate data, while discriminative models usually win on accuracy given enough labels.',
      },
      {
        level: 'advanced',
        question: 'Your model achieves 99% recall and 99% specificity on a fraud problem where 0.1% of transactions are fraudulent. The business complains about alert volume. Explain the situation quantitatively and propose a response.',
        answer:
          'Per million transactions there are 1,000 fraudulent ones and 999,000 legitimate ones. The model catches 990 of the fraud and raises 9,990 false alarms from the legitimate traffic, so 10,980 alerts contain 990 true cases: precision of about 9%. Reviewers therefore discard roughly nine alerts for every real one, which is what they are complaining about. Recall and specificity are properties of the model, but precision is a property of the model and the base rate together, so improving the headline metrics barely helps. The realistic levers are: raise the decision threshold to trade recall for precision and pick the operating point by expected cost rather than by an F-score; add a cheap second-stage model or rule set that only sees flagged transactions, which multiplies the likelihood ratios; segment the population so the effective prior is higher within a segment, for example by merchant category or by amount; and present risk scores with an expected-value ranking rather than binary alerts so reviewer time goes to the highest-value cases first. It is also worth measuring precision at a fixed alert budget, which is the metric that actually corresponds to the constraint.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A factory has two machines. Machine A makes 70% of the parts with a 2% defect rate; machine B makes 30% with a 5% defect rate. A randomly chosen part is defective. What is the probability it came from machine B?',
        hint: 'The evidence is "defective". Expand P(defective) over the two machines with the law of total probability.',
        solution:
          'Priors: P(A) = 0.70, P(B) = 0.30. Likelihoods: P(defective given A) = 0.02, P(defective given B) = 0.05.\n\nP(defective) = 0.70 x 0.02 + 0.30 x 0.05 = 0.014 + 0.015 = 0.029.\n\nP(B given defective) = 0.015 / 0.029 = 0.5172.\n\nSo machine B produced only 30% of the parts but is responsible for about 52% of the defects. Note that the posterior for B went up (0.30 to 0.52) while the posterior for A went down (0.70 to 0.48), and the two still sum to 1 — a useful check that the denominator was computed correctly.',
      },
      {
        prompt:
          'A spam filter knows: 40% of mail is spam; the phrase "verify your account" appears in 25% of spam and 0.5% of legitimate mail. An email contains the phrase. Compute the posterior, then recompute it for a mailbox where only 2% of mail is spam.',
        hint: 'Use the odds form: prior odds times the likelihood ratio. The likelihood ratio is the same in both mailboxes.',
        solution:
          'Likelihood ratio = 0.25 / 0.005 = 50. The phrase is 50 times more expected in spam than in legitimate mail, and this number does not depend on the mailbox.\n\nMailbox 1: prior odds = 0.40/0.60 = 0.6667. Posterior odds = 0.6667 x 50 = 33.33, so P = 33.33/34.33 = 0.9709.\n\nMailbox 2: prior odds = 0.02/0.98 = 0.02041. Posterior odds = 0.02041 x 50 = 1.0204, so P = 1.0204/2.0204 = 0.5050.\n\nIdentical evidence, identical model, and yet one mailbox gets a confident 97% and the other a coin flip at 51%. This is why a spam filter trained on one population is miscalibrated when deployed on another, and why recalibrating the prior on deployment is often more valuable than retraining the likelihoods.',
      },
      {
        prompt:
          'Write a Python function that takes a prior, a sensitivity and a specificity, and returns the prevalence at which the posterior after one positive test equals 0.5. Verify it against the case sensitivity = specificity = 0.99.',
        hint: 'Set the true-positive mass equal to the false-positive mass and solve for the prior.',
        language: 'python',
        starterCode: 'def crossover_prevalence(sensitivity: float, specificity: float) -> float:\n    ...\n',
        solution:
          'The posterior is 0.5 exactly when true positives equal false positives:\n\nsensitivity x p = (1 - specificity) x (1 - p)\n\nSolving: p x [sensitivity + (1 - specificity)] = (1 - specificity), so\n\np = (1 - specificity) / (sensitivity + 1 - specificity)\n\ndef crossover_prevalence(sensitivity, specificity):\n    fpr = 1 - specificity\n    return fpr / (sensitivity + fpr)\n\nFor sensitivity = specificity = 0.99: fpr = 0.01, so p = 0.01/1.00 = 0.01. At 1% prevalence a positive result is exactly a coin flip, which matches the table in the code example above. Below that prevalence, most positives are false. The rule of thumb worth carrying away is that the crossover sits at roughly the false-positive rate whenever sensitivity is close to 1.',
      },
    ],

    quiz: [
      {
        id: 'STAT-004-q1',
        type: 'numeric',
        concept: 'base rate fallacy',
        prompt:
          'Prevalence 0.1%, sensitivity 99%, specificity 99%. What is P(disease | positive test)? Give a decimal to three places.',
        answer: 0.09,
        tolerance: 0.01,
        explanation:
          'Per 100,000 people: 99 true positives and 999 false positives, so 99/1098 = 0.0902. The 999 false positives come from applying a small 1% error rate to a very large healthy population.',
      },
      {
        id: 'STAT-004-q2',
        type: 'match',
        concept: 'bayes terminology',
        prompt: 'Match each term in Bayes theorem to its role.',
        pairs: [
          { left: 'Prior, P(H)', right: 'Belief in the hypothesis before seeing the evidence' },
          { left: 'Likelihood, P(E|H)', right: 'How probable the evidence is if the hypothesis holds' },
          { left: 'Evidence, P(E)', right: 'Total probability of the observation across all hypotheses' },
          { left: 'Posterior, P(H|E)', right: 'Updated belief after incorporating the evidence' },
        ],
        explanation:
          'Keeping these four labelled is most of the battle. The evidence term is the normalising constant; expanding it with the law of total probability is what makes the posterior sum to 1 across hypotheses.',
      },
      {
        id: 'STAT-004-q3',
        type: 'truefalse',
        concept: 'sensitivity vs precision',
        prompt: 'A test with 99% sensitivity gives a 99% chance of disease when it returns a positive result.',
        answer: false,
        explanation:
          'Sensitivity is P(positive | disease) and has a different denominator from P(disease | positive). Without the prevalence you cannot convert one into the other, and for rare diseases the posterior is far lower.',
      },
      {
        id: 'STAT-004-q4',
        type: 'order',
        concept: 'derivation',
        prompt: 'Put the derivation of Bayes theorem into order.',
        items: [
          'Write P(H|E) = P(H and E) / P(E) from the definition of conditional probability',
          'Write P(E|H) = P(H and E) / P(H), the same definition in the other direction',
          'Rearrange the second to get P(H and E) = P(E|H)P(H)',
          'Substitute that into the first equation',
          'Obtain P(H|E) = P(E|H)P(H) / P(E)',
          'Expand P(E) with the law of total probability when it is not given directly',
        ],
        explanation:
          'The theorem introduces nothing new: it is the definition of conditional probability applied twice, plus a substitution. That is worth knowing, because it means Bayes cannot be "wrong" — only the numbers you feed it can be.',
      },
      {
        id: 'STAT-004-q5',
        type: 'mcq',
        concept: 'odds form',
        prompt:
          'Prior odds of a hypothesis are 1:9 and a piece of evidence has a likelihood ratio of 18. What are the posterior odds and the posterior probability?',
        options: [
          '2:1, so about 0.667',
          '18:9, so about 0.5',
          '1:162, so about 0.006',
          '19:9, so about 0.679',
        ],
        answerIndex: 0,
        explanation:
          'Posterior odds = prior odds x likelihood ratio = (1/9) x 18 = 2, which is 2:1. Converting to probability: 2/(1+2) = 0.667. The odds form avoids computing the evidence term entirely.',
      },
      {
        id: 'STAT-004-q6',
        type: 'numeric',
        concept: 'law of total probability',
        prompt:
          'Machine A makes 70% of parts with a 2% defect rate; machine B makes 30% with a 5% defect rate. What proportion of all parts are defective? Give a decimal to three places.',
        answer: 0.029,
        tolerance: 0.002,
        explanation:
          '0.70 x 0.02 + 0.30 x 0.05 = 0.014 + 0.015 = 0.029. This weighted sum over a partition of the sample space is the law of total probability, and it is the denominator of any Bayes calculation about this factory.',
      },
      {
        id: 'STAT-004-q7',
        type: 'explain',
        concept: 'base rates in ML',
        prompt:
          'Your fraud model has 99% recall and 99% specificity, but reviewers say most alerts are false. Explain why, using Bayes theorem, and say what you would change.',
        rubric: [
          'Computes or describes the true-positive and false-positive counts at the real base rate',
          'Identifies precision as depending on the base rate, not only on the model',
          'Proposes a concrete response such as threshold tuning, a second stage, or segmentation',
        ],
        sampleAnswer:
          'At a 0.1% fraud rate, a million transactions contain 1,000 fraudulent and 999,000 legitimate. The model catches 990 of the fraud and misflags 1% of the legitimate traffic, which is 9,990 alerts. So 10,980 alerts hold 990 real cases and precision is about 9%: the reviewers are right, and the model is not broken. Recall and specificity describe the model alone, but precision is the posterior P(fraud given flagged) and depends on the prior, which here is tiny. The fixes are to raise the threshold and accept lower recall in exchange for precision, choosing the operating point by expected cost rather than by F1; to add a second-stage model over flagged cases so its likelihood ratio multiplies the first; or to segment so that within a high-risk segment the effective prior is much higher. I would also report precision at a fixed daily alert budget, because that is the number the review team actually lives with.',
        explanation:
          'The answer must separate model properties (recall, specificity) from population properties (prevalence) and recognise that precision mixes the two. That separation is the practical payoff of this unit.',
      },
    ],

    flashcards: [
      { front: "Bayes' theorem", back: 'P(H|E) = P(E|H)P(H) / P(E). Posterior = likelihood x prior / evidence.' },
      { front: 'Name the four terms', back: 'Prior P(H): belief before. Likelihood P(E|H): fit of evidence to hypothesis. Evidence P(E): how often the observation occurs overall. Posterior P(H|E): belief after.' },
      { front: 'Law of total probability', back: 'P(E) = sum over i of P(E|H_i)P(H_i). It is how you compute the denominator from quantities you know.' },
      { front: '99% accurate test, 0.1% prevalence, positive result — P(disease)?', back: 'About 9%. Per 100,000: 99 true positives versus 999 false positives, so 99/1098 = 0.0902.' },
      { front: 'Odds form of Bayes', back: 'Posterior odds = prior odds x likelihood ratio. The evidence term cancels, so sequential updates are just repeated multiplication.' },
      { front: 'Where is the crossover to a coin flip?', back: 'When prevalence falls to roughly the false-positive rate, a positive result is right about half the time. Below that, most positives are false.' },
      { front: 'What makes Naive Bayes "naive"?', back: 'It assumes features are conditionally independent given the class, so likelihoods multiply. Good rankings, poorly calibrated probabilities.' },
    ],

    challenge: {
      title: 'A screening-programme calculator',
      brief:
        'Build a tool that, given prevalence, sensitivity and specificity, reports the full 2x2 outcome table for a population of 100,000, the positive and negative predictive values, and the posterior after one, two and three independent positive results. Then use it to answer a design question: a health service wants the post-test probability after a single positive to exceed 50% at a prevalence of 0.2%. Find the specificity required, holding sensitivity at 99%, and comment on whether that is achievable in practice.',
      language: 'python',
      acceptanceCriteria: [
        'The 2x2 table of counts is printed and the four cells sum to 100,000',
        'Positive and negative predictive values are both reported',
        'Sequential updating uses the odds form rather than recomputing from scratch',
        'The required specificity is found numerically and stated to at least three decimal places',
        'A short printed comment interprets the result for a non-technical reader',
      ],
      starterCode:
        'def screening_report(prevalence: float, sensitivity: float, specificity: float, n: int = 100_000) -> dict:\n    """Full diagnostic picture for a screening test in a population of n."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach Bayes theorem to someone who has just learned conditional probability. Derive it rather than stating it, then use the rare-disease example with real numbers to show why their intuition will be wrong.',
      mustCover: [
        'The derivation from the two ways of writing the joint probability P(H and E)',
        'What the prior, likelihood, evidence and posterior each mean',
        'The rare-disease calculation showing most positives are false when prevalence is low',
        'Why the base rate cannot be dropped, and what happens to the answer when it is',
      ],
      bonusSignals: [
        'counts people in a concrete population instead of manipulating decimals',
        'mentions the odds form or the likelihood ratio',
        'connects to precision in rare-class classification or to the prosecutor\'s fallacy',
      ],
      sampleExplanation:
        'Bayes theorem is not a new idea; it is one rearrangement. You already know that P(H given E) is P(H and E) divided by P(E), and that P(E given H) is that same P(H and E) divided by P(H). Since both involve the same joint probability, you can substitute one into the other and get P(H given E) = P(E given H) x P(H) / P(E). That is it. The reason it matters is that you almost always measure the wrong direction. A study tells you how often sick people test positive; you need to know how often positive people are sick. Now the numbers, because they are the part that will surprise you. Suppose a disease affects 1 person in 1,000 and a test is 99% accurate in both directions. Take 100,000 people. A hundred of them are ill, and the test correctly flags 99 of those. The other 99,900 are healthy, and the test wrongly flags 1% of them, which is 999 people. So 1,098 people are walking around with a positive result and only 99 of them are ill — about 9%, not 99%. The test is not broken. A small error rate applied to a very large healthy group simply produces more false alarms than there are real cases in a very small sick group. That is the base rate doing its work, and it is exactly why a fraud model with superb recall still buries its reviewers in false positives.',
    },
  },
