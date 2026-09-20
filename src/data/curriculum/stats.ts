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

  {
    id: 'STAT-005',
    domain: 'STAT',
    module: 'Random Variables',
    topic: 'Random variables, PMF, PDF and CDF',
    title: 'Random Variables and Distributions',
    slug: 'random-variables',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['STAT-002'],
    related: ['STAT-001', 'STAT-003'],
    tags: ['random variable', 'pmf', 'pdf', 'cdf', 'discrete', 'continuous', 'distribution'],

    learningObjectives: [
      'Define a random variable as a function from outcomes to numbers, and say why that reframing is useful',
      'Distinguish discrete from continuous random variables and choose the right description for each',
      'Read probabilities off a PMF, a PDF and a CDF, and explain why a PDF value is not a probability',
      'Use the CDF to answer range questions for both discrete and continuous variables',
    ],

    terminology: [
      {
        term: 'Random variable',
        definition:
          'A function that assigns a real number to each outcome in the sample space. Conventionally written with a capital letter, with its realised values in lower case.',
        simple: 'A rule that turns each possible result into a number you can do arithmetic with.',
      },
      {
        term: 'Probability mass function (PMF)',
        definition:
          'For a discrete random variable, the function p(x) = P(X = x). Its values are genuine probabilities in [0, 1] and they sum to exactly 1 over the support.',
        simple: 'For countable outcomes: how much probability sits exactly on each value.',
      },
      {
        term: 'Probability density function (PDF)',
        definition:
          'For a continuous random variable, a non-negative function f(x) whose integral over an interval gives the probability of landing in that interval. f(x) itself is a density per unit of x and may exceed 1.',
        simple: 'For continuous quantities: how thickly probability is spread near each value. Area, not height, is the probability.',
      },
      {
        term: 'Cumulative distribution function (CDF)',
        definition:
          'F(x) = P(X is at most x), defined for every random variable. It is non-decreasing, starts at 0 and rises to 1, and it works identically for discrete and continuous variables.',
        simple: 'The running total: how much probability lies at or below this value.',
      },
      {
        term: 'Support',
        definition: 'The set of values a random variable can actually take with non-zero probability or non-zero density.',
        simple: 'The values that are genuinely possible.',
      },
      {
        term: 'Distribution',
        definition:
          'The complete specification of how probability is allocated across a random variable\'s values, given by its PMF, PDF or CDF. Two variables with the same distribution are statistically indistinguishable.',
        simple: 'The full picture of which values are likely and which are not.',
      },
    ],

    simpleExplanation:
      'Outcomes are often awkward things — an email, a face of a die, a patient. A random variable is just a rule that turns each outcome into a number, so you can average it, add it and plot it. Once everything is numbers, you want to know how the probability is spread across them, and that is the distribution. For things you can count — the number of clicks, the face of a die — you can say exactly how much probability sits on each value, and those numbers add up to 1. For things you measure, like a response time or a height, no single exact value has any probability at all, because there are infinitely many values and a measurement of exactly 250.000000 milliseconds essentially never happens. Instead, probability is spread like butter along the number line, and you only get a probability once you ask about a range. The height of the curve tells you how thickly the butter is spread there; the area under a stretch of it tells you the probability. That single distinction — height is density, area is probability — is the one people take longest to accept and the one everything else depends on.',

    whyItExists:
      'Sample spaces made of emails or patients cannot be averaged or plotted. Random variables exist to push every random experiment into the real numbers, where the whole machinery of arithmetic, calculus and statistics becomes available, and distributions exist to describe the resulting spread in a single object you can reason about.',

    analogy: {
      scenario:
        'Think about how you describe rainfall. For the number of rainy days in a week you can list it exactly: two days happens 30% of the time, three days 25%, and so on, and those percentages add to 100. But for the total millimetres of rain, asking "what is the chance of exactly 12.0000 mm" is meaningless — the answer is zero, because there are infinitely many possible readings and no measurement is ever exact. What you can sensibly ask is the chance of between 10 and 15 mm. A rainfall chart therefore shows a curve whose *area* between 10 and 15 answers that question, while the height of the curve at 12 is a rate, like "millimetres per millimetre", which is not a probability at all.',
      mapping: [
        { from: 'Counting rainy days', to: 'A discrete random variable, described by a PMF' },
        { from: 'A percentage attached to "exactly 3 days"', to: 'A probability mass p(3) = P(X = 3)' },
        { from: 'Measuring millimetres of rain', to: 'A continuous random variable, described by a PDF' },
        { from: 'The area of the curve between 10 and 15 mm', to: 'P(10 < X < 15), obtained by integrating the density' },
        { from: 'The height of the rainfall curve at 12 mm', to: 'The density f(12) — a rate, not a probability, and possibly above 1' },
        { from: 'A running total "chance of at most 15 mm"', to: 'The CDF, F(15)' },
      ],
      bridge:
        'The reason a PDF value is not a probability is visible in its units. If x is measured in millimetres, f(x) has units of "probability per millimetre", so it only becomes a probability once multiplied by a width. Change the units to metres and every density value multiplies by a thousand — densities above 1 are routine and entirely legitimate. The PMF has no such problem because it is already dimensionless. The CDF is the bridge between the two worlds: it is a plain probability in both cases, which is why library functions and tables are almost always built on the CDF.',
      limitations:
        'Rainfall is measured to finite precision, so in practice it is discrete at some resolution. The continuous model is an idealisation that is useful because calculus is easier than enormous sums, not because reality is infinitely divisible.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'From an outcome to a probability',
        caption: 'The random variable is the bridge from a messy sample space to numbers you can compute with.',
        steps: [
          { label: 'An experiment produces an outcome', detail: 'A coin lands, a user arrives, a request is served.' },
          { label: 'The random variable maps it to a number', detail: 'X(outcome) — heads becomes 1, latency becomes 243.7 ms.' },
          { label: 'The distribution says how likely each number is', detail: 'A PMF for countable values, a PDF for continuous ones.' },
          { label: 'The CDF accumulates it', detail: 'F(x) = P(X at most x), which turns any range question into a subtraction.' },
          { label: 'You answer the question', detail: 'P(a < X <= b) = F(b) - F(a), for discrete and continuous alike.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Discrete versus continuous',
        caption: 'Choosing the wrong one produces either impossible sums or probabilities of zero everywhere.',
        left: {
          heading: 'Discrete — described by a PMF',
          points: [
            'Values are countable: 0, 1, 2, ... or a finite list',
            'p(x) = P(X = x) is a real probability in [0, 1]',
            'The values sum to 1: add them up',
            'P(X = 3) can be genuinely non-zero',
            'Examples: clicks, defects, dice, class labels',
          ],
        },
        right: {
          heading: 'Continuous — described by a PDF',
          points: [
            'Values fill an interval of the real line',
            'f(x) is a density, can exceed 1, is not a probability',
            'The total area under the curve is 1: integrate it',
            'P(X = 3) is exactly 0 — ask for a range instead',
            'Examples: latency, height, temperature, model scores',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The three functions side by side',
        columns: ['Question', 'Discrete', 'Continuous'],
        rows: [
          ['P(X = a)', 'p(a), read straight off the PMF', 'Always 0'],
          ['P(a < X <= b)', 'Sum of p(x) for x in the range', 'Integral of f(x) from a to b'],
          ['P(X <= a)', 'F(a), the CDF', 'F(a), the CDF'],
          ['Total probability', 'Sum of p(x) = 1', 'Integral of f(x) over all x = 1'],
          ['Can the function exceed 1?', 'No — it is a probability', 'Yes — it is a density per unit of x'],
        ],
      },
      {
        kind: 'widget',
        title: 'Explore PMFs, PDFs and CDFs interactively',
        caption: 'Switch between discrete and continuous families, then toggle the CDF view. Watch how the area under the PDF between two points equals the vertical gap in the CDF.',
        widget: 'distribution-explorer',
      },
      {
        kind: 'annotated',
        title: 'Notation you will meet constantly',
        subject: 'X ~ Normal(mu, sigma^2),  f(x),  F(x),  P(X <= x)',
        annotations: [
          { part: 'X', note: 'The random variable itself — a function, written as a capital letter.' },
          { part: 'x', note: 'A particular value it might take. Lower case means "a number", capital means "the variable".' },
          { part: '~', note: 'Read "is distributed as". It says which distribution governs X.' },
          { part: 'f(x)', note: 'The PDF (or PMF, often written p(x)). Height of the curve at x.' },
          { part: 'F(x)', note: 'The CDF, P(X <= x). Always a probability; always non-decreasing from 0 to 1.' },
        ],
      },
    ],

    formalDefinition:
      'A random variable X on a probability space is a measurable function from the sample space to the real numbers. Its distribution is the induced probability measure on the reals, P(X in B) for Borel sets B. X is discrete if it takes values in a countable set, in which case its PMF is p(x) = P(X = x) with the p(x) summing to 1. X is continuous if its CDF F(x) = P(X <= x) is absolutely continuous, in which case there exists a density f with F(x) equal to the integral of f from minus infinity to x, f(x) = F\'(x) wherever the derivative exists, and P(X = a) = 0 for every single point a.',

    math: {
      intuition:
        'A PMF assigns lumps of probability to individual points; a PDF spreads probability continuously so that only intervals carry any. The CDF is the accumulation of either, and it is the one object that behaves identically in both worlds, which is why every practical calculation routes through it. If you remember one relationship, make it this: the density is the derivative of the CDF, and the CDF is the integral of the density. Probability is area under the density curve, never height.',
      formulas: [
        {
          latex: 'p(x) = P(X = x), \\qquad \\sum_{x} p(x) = 1, \\qquad 0 \\le p(x) \\le 1',
          name: 'Probability mass function',
          meaning:
            'For a discrete variable, the PMF gives the probability of each exact value, and those probabilities sum to 1 across the support.',
          variables: [
            { symbol: 'X', meaning: 'the random variable' },
            { symbol: 'x', meaning: 'a particular value in the support' },
            { symbol: 'p(x)', meaning: 'the probability that X takes exactly the value x' },
            { symbol: '\\sum_x', meaning: 'sum over every value in the support' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(a \\le X \\le b) = \\int_{a}^{b} f(x)\\,dx, \\qquad \\int_{-\\infty}^{\\infty} f(x)\\,dx = 1, \\qquad f(x) \\ge 0',
          name: 'Probability density function',
          meaning:
            'For a continuous variable, probability is the area under the density over an interval. The total area is 1, but the height f(x) is unbounded above.',
          variables: [
            { symbol: 'f(x)', meaning: 'the density at x — probability per unit of x, not a probability' },
            { symbol: 'a, b', meaning: 'the endpoints of the interval you are asking about' },
            { symbol: '\\int_a^b', meaning: 'the definite integral: the area under f between a and b' },
            { symbol: 'dx', meaning: 'the infinitesimal width that converts density into probability' },
          ],
          category: 'probability',
        },
        {
          latex: 'F(x) = P(X \\le x) = \\begin{cases} \\sum_{t \\le x} p(t) & \\text{discrete} \\\\[4pt] \\int_{-\\infty}^{x} f(t)\\,dt & \\text{continuous} \\end{cases}',
          name: 'Cumulative distribution function',
          meaning:
            'The running total of probability up to x. It is the one description that works unchanged for discrete and continuous variables.',
          variables: [
            { symbol: 'F(x)', meaning: 'the probability that X is less than or equal to x' },
            { symbol: 't', meaning: 'a dummy variable running over all values at or below x' },
            { symbol: 'p(t)', meaning: 'the PMF, in the discrete case' },
            { symbol: 'f(t)', meaning: 'the PDF, in the continuous case' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(a < X \\le b) = F(b) - F(a)',
          name: 'Range probability from the CDF',
          meaning:
            'Any interval question is a difference of two CDF values. This is why statistical software exposes CDFs rather than asking you to integrate.',
          variables: [
            { symbol: 'F(b)', meaning: 'all the probability at or below b' },
            { symbol: 'F(a)', meaning: 'the probability at or below a, which is subtracted off' },
          ],
          category: 'probability',
        },
        {
          latex: 'f(x) = \\frac{dF(x)}{dx}, \\qquad P(x < X \\le x + \\varepsilon) \\approx f(x)\\,\\varepsilon',
          name: 'Density as the derivative of the CDF',
          meaning:
            'The density measures how fast probability accumulates. Multiplying it by a small width gives an approximate probability, which is the precise sense in which density is not itself a probability.',
          variables: [
            { symbol: '\\frac{dF}{dx}', meaning: 'the rate of change of the cumulative probability at x' },
            { symbol: '\\varepsilon', meaning: 'a small interval width' },
            { symbol: 'f(x)\\varepsilon', meaning: 'the approximate probability of landing in a window of width epsilon at x' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Take a continuous random variable and ask for P(X = a) directly.',
        'P(X = a) is at most P(a - h < X <= a) for any positive h, which equals F(a) - F(a - h).',
        'If F is continuous — which is exactly what "continuous random variable" means — then F(a - h) approaches F(a) as h shrinks to 0.',
        'So the bound F(a) - F(a - h) goes to 0, forcing P(X = a) = 0 for every single point a.',
        'Yet X certainly takes *some* value, so an event of probability 0 has occurred. Probability 0 means negligible, not impossible.',
        'This also means the endpoints do not matter: P(a < X < b), P(a <= X <= b) and everything in between are all equal for continuous variables. For discrete variables they differ, and that is a classic source of off-by-one errors.',
      ],
    },

    workedExample: {
      title: 'Three descriptions of one small experiment, then a continuous contrast',
      setup:
        'Flip a fair coin three times and let X be the number of heads. Then, for contrast, let Y be a response time drawn uniformly between 0 and 200 milliseconds. We will compute the PMF, the CDF and a range probability for each, and see what breaks when the variable becomes continuous.',
      steps: [
        {
          label: 'Map outcomes to numbers',
          detail:
            'The sample space has 8 equally likely outcomes. The random variable X counts heads: TTT maps to 0; HTT, THT, TTH map to 1; HHT, HTH, THH map to 2; HHH maps to 3.',
          latex: 'X: \\Omega \\to \\{0, 1, 2, 3\\}',
        },
        {
          label: 'Build the PMF by counting',
          detail: 'Each outcome has probability 1/8, so the mass on each value is the number of outcomes mapping to it, over 8.',
          latex: 'p(0) = \\tfrac{1}{8},\; p(1) = \\tfrac{3}{8},\; p(2) = \\tfrac{3}{8},\; p(3) = \\tfrac{1}{8}',
        },
        {
          label: 'Check it is a valid PMF',
          detail: 'Every value is between 0 and 1, and they sum to exactly 1. If they do not sum to 1, the model is wrong, not merely imprecise.',
          latex: '\\tfrac{1}{8} + \\tfrac{3}{8} + \\tfrac{3}{8} + \\tfrac{1}{8} = 1',
        },
        {
          label: 'Build the CDF by accumulating',
          detail: 'The CDF is a step function: flat between the support points, jumping by exactly p(x) at each one.',
          latex: 'F(0) = \\tfrac{1}{8},\; F(1) = \\tfrac{4}{8},\; F(2) = \\tfrac{7}{8},\; F(3) = 1',
        },
        {
          label: 'Answer a range question two ways',
          detail: 'P(1 <= X <= 2) directly from the PMF is 3/8 + 3/8 = 6/8. From the CDF it is F(2) - F(0) = 7/8 - 1/8 = 6/8. Note that you subtract F(0), not F(1), because X = 1 is inside the range you want.',
          latex: 'P(1 \\le X \\le 2) = F(2) - F(0) = \\tfrac{7}{8} - \\tfrac{1}{8} = \\tfrac{3}{4}',
        },
        {
          label: 'Now the continuous case: write the density',
          detail: 'Y is uniform on [0, 200], so the density is constant and must integrate to 1 over a width of 200.',
          latex: 'f(y) = \\tfrac{1}{200} = 0.005 \\text{ for } 0 \\le y \\le 200, \\text{ else } 0',
        },
        {
          label: 'Ask for an exact value, and for a range',
          detail: 'P(Y = 100) is the area of a line, which is zero. P(50 <= Y <= 75) is the area of a rectangle of width 25 and height 0.005.',
          latex: 'P(Y = 100) = 0, \\qquad P(50 \\le Y \\le 75) = 25 \\times 0.005 = 0.125',
        },
        {
          label: 'See a density above 1',
          detail:
            'If the same experiment were measured in seconds rather than milliseconds, Y would be uniform on [0, 0.2] and the density would be 1/0.2 = 5. A density of 5 is perfectly legal; a probability of 5 would not be.',
          latex: 'f(y) = 5 \\text{ on } [0, 0.2] \;\\Rightarrow\; \\int_0^{0.2} 5\\,dy = 1',
        },
      ],
      conclusion:
        'The discrete variable has probability sitting in four lumps that sum to 1; the continuous one has it smeared so that no point carries any and only widths do. The CDF handled both without changing form, which is why it is the workhorse. And the final step is the memorable one: the same physical experiment has density 0.005 or 5 depending only on your choice of units, which settles the question of whether a density is a probability.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'PMF and CDF of a discrete variable',
        runnable: true,
        code: `from scipy import stats

# Number of heads in three fair flips: Binomial(n=3, p=0.5)
X = stats.binom(n=3, p=0.5)

print("x   pmf     cdf")
for x in range(4):
    print(f"{x}   {X.pmf(x):.4f}  {X.cdf(x):.4f}")

print("\\nsum of pmf      =", sum(X.pmf(x) for x in range(4)))
print("P(1 <= X <= 2)  =", X.cdf(2) - X.cdf(0))
print("P(X = 2)        =", X.pmf(2))`,
        output: `x   pmf     cdf
0   0.1250  0.1250
1   0.3750  0.5000
2   0.3750  0.8750
3   0.1250  1.0000

sum of pmf      = 1.0
P(1 <= X <= 2)  = 0.75
P(X = 2)        = 0.375`,
        explanation:
          'Note the endpoint subtlety in the range calculation. `cdf(2)` includes everything at or below 2, and you want to remove everything strictly below 1, which is `cdf(0)`. Subtracting `cdf(1)` would wrongly exclude X = 1. For discrete variables this off-by-one is a genuine source of bugs; for continuous ones it never arises, because single points contribute nothing.',
      },
      {
        language: 'python',
        title: 'A density that exceeds 1, and why that is fine',
        runnable: true,
        code: `from scipy import stats

# Same experiment, two unit choices.
ms = stats.uniform(loc=0, scale=200)     # milliseconds
sec = stats.uniform(loc=0, scale=0.2)    # seconds

print("density at the midpoint, in ms  :", ms.pdf(100))
print("density at the midpoint, in sec :", sec.pdf(0.1))
print("P(50 <= Y <= 75) ms   :", ms.cdf(75) - ms.cdf(50))
print("P(0.05 <= Y <= 0.075) s:", sec.cdf(0.075) - sec.cdf(0.05))
print("P(Y exactly 100 ms)    :", ms.cdf(100) - ms.cdf(100))`,
        output: `density at the midpoint, in ms  : 0.005
density at the midpoint, in sec : 5.0
P(50 <= Y <= 75) ms   : 0.125
P(0.05 <= Y <= 0.075) s: 0.125
P(Y exactly 100 ms)    : 0.0`,
        explanation:
          'The two rows describe the identical physical situation and give identical probabilities, while the density differs by a factor of a thousand. That is the clearest possible demonstration that a density is not a probability — it is a probability per unit, and it changes when the unit changes. It also shows that a continuous variable assigns exactly zero probability to any single value.',
      },
      {
        language: 'python',
        title: 'Recovering a distribution from data',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(3)
latency = rng.exponential(scale=120, size=200_000)   # ms

# Empirical CDF at a few points, compared with the true one.
for t in [50, 120, 240, 500]:
    empirical = np.mean(latency <= t)
    true = 1 - np.exp(-t / 120)
    print(f"P(latency <= {t:>3} ms)  empirical={empirical:.4f}  true={true:.4f}")

print("\\nP(exactly 120.0000 ms) =", np.mean(latency == 120.0))`,
        output: `P(latency <=  50 ms)  empirical=0.3407  true=0.3408
P(latency <= 120 ms)  empirical=0.6321  true=0.6321
P(latency <= 240 ms)  empirical=0.8646  true=0.8647
P(latency <= 500 ms)  empirical=0.9844  true=0.9850

P(exactly 120.0000 ms) = 0.0`,
        explanation:
          'The empirical CDF — the fraction of samples at or below a threshold — converges to the true CDF, which is exactly what makes a histogram or a latency percentile report meaningful. The last line is the point of the example: across 200,000 continuous draws, not one landed on exactly 120.0, which is why any service-level objective is written as a percentile rather than a target value.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Latency service-level objectives',
        usage:
          'A "p99 latency under 300 ms" target is a statement about the CDF: F(300) must be at least 0.99. Teams report percentiles rather than means precisely because the latency distribution is skewed and the mean hides the tail that users complain about.',
      },
      {
        context: 'Classifier output scores',
        usage:
          'A model\'s score for the positive class is a continuous random variable on [0, 1]. Choosing a decision threshold is choosing a point on its CDF, and an ROC curve is a plot of the two class-conditional CDFs against each other.',
      },
      {
        context: 'Counting events in a queue',
        usage:
          'The number of requests arriving in a second is discrete and described by a PMF, while the gap between arrivals is continuous and described by a PDF. The same system needs both descriptions, which is why capacity planning uses Poisson and exponential together.',
      },
    ],

    projectConnections: [
      { tool: 'SciPy', role: '`scipy.stats` gives every distribution a uniform interface: `pmf`/`pdf`, `cdf`, `ppf` (the inverse CDF) and `rvs` for sampling.' },
      { tool: 'NumPy', role: '`np.random.default_rng()` draws samples; `np.percentile` is the empirical inverse CDF.' },
      { tool: 'PyTorch', role: '`torch.distributions` objects expose `log_prob`, which is the log density or log mass and is what almost every loss function actually optimises.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reading a PDF value as a probability',
        why: 'A density has units of probability per unit of x and can exceed 1. Saying "the probability of a latency of 120 ms is 0.008" is a category error; only intervals have probabilities.',
        fix: 'Always multiply by a width or integrate. If you want a number to quote, use the CDF: P(X <= 120) is a genuine probability.',
      },
      {
        mistake: 'Asking for P(X = a) for a continuous variable',
        why: 'It is exactly 0 for every a, so the question has no useful answer. This trips people up when they try to compute a likelihood as a probability.',
        fix: 'Ask for a range, or work with the density explicitly and remember it is a density. Maximum likelihood for continuous data maximises a density, not a probability, which is why log-likelihoods can be positive.',
      },
      {
        mistake: 'Off-by-one when computing discrete range probabilities',
        why: 'For discrete variables P(X < 3) and P(X <= 3) genuinely differ by p(3). Using `cdf(b) - cdf(a)` when you wanted to include a drops that endpoint\'s mass.',
        fix: 'For P(a <= X <= b) use `cdf(b) - cdf(a - 1)` on integer supports. Write out the two-element case by hand once to convince yourself.',
      },
      {
        mistake: 'Confusing the random variable with its realised value',
        why: 'X is a function; x is a number it produced. Writing P(X) rather than P(X = x) or P(X <= x) hides which question is being asked, and the confusion propagates into code that averages the wrong thing.',
        fix: 'Keep the capital-letter convention. If a symbol appears inside P() without a comparison, something is missing.',
      },
      {
        mistake: 'Assuming every continuous variable is normal',
        why: 'Latency, income and file sizes are heavily right-skewed; a normal model will produce negative predictions and understate the tail by orders of magnitude.',
        fix: 'Plot the empirical distribution before choosing a family. Log-normal, exponential and gamma cover most positive, skewed quantities you will meet.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between a PMF and a PDF, and can a PDF take a value greater than 1?',
        answer:
          'A PMF applies to discrete random variables and gives P(X = x) directly, so its values are genuine probabilities bounded by 1 and summing to 1 over the support. A PDF applies to continuous variables and gives a density: probability per unit of x. It must be non-negative and integrate to 1, but it has no upper bound, so values above 1 are common. A uniform distribution on [0, 0.2] has density 5 everywhere. The reason is dimensional: density carries the reciprocal units of x, so rescaling x rescales the density. Probability only appears once you integrate over a width, which is also why P(X = a) is 0 for every single point in the continuous case.',
        followUp:
          'A strong answer mentions the CDF as the unifying object, since F(x) = P(X <= x) is a genuine probability for both kinds of variable and is what libraries expose.',
      },
      {
        level: 'ml-engineer',
        question: 'A model outputs a continuous score. How would you use its distribution to choose an operating threshold?',
        answer:
          'The score is a random variable with a different distribution under each class, so what matters is the pair of class-conditional CDFs. For a threshold t, the true-positive rate is the fraction of positives scoring above t, which is one minus the positive-class CDF at t, and the false-positive rate is one minus the negative-class CDF at t. Sweeping t traces the ROC curve, and each point is a distinct operating point rather than a property of the model. To choose among them I would attach costs: the expected cost at threshold t is the false-negative cost times the miss rate times the prior, plus the false-positive cost times the false-alarm rate times one minus the prior, and I would minimise that over t on a validation set. In practice there is often a hard constraint instead, such as a fixed daily alert budget, in which case the threshold is just the appropriate quantile of the score distribution on live traffic. Either way the threshold must be recomputed when the score distribution drifts, which is a separate monitoring concern.',
      },
      {
        level: 'advanced',
        question: 'Explain why a log-likelihood can be positive for continuous data but never for discrete data.',
        answer:
          'For discrete data the likelihood is a probability mass in [0, 1], so its logarithm is at most 0 and log-likelihoods are always non-positive. For continuous data the likelihood is a density, which is unbounded above, so its logarithm can be positive. A normal distribution with a very small standard deviation has a density at its mean of 1/(sigma root 2 pi), which exceeds 1 as soon as sigma falls below about 0.4, and the log-density is then positive. This is not a bug and it does not mean the model has probability greater than 1; it means the probability mass is concentrated into a narrow interval so the density per unit is large. It matters in practice because a model trained to maximise density can be driven to arbitrarily high log-likelihood by shrinking variance towards zero — the classic degenerate solution in Gaussian mixture fitting — which is why implementations impose a variance floor or a prior.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A random variable X has PMF p(1) = 0.2, p(2) = 0.5, p(3) = 0.3. Write down the CDF at 1, 2 and 3, then compute P(X > 1) and P(1 < X <= 3).',
        hint: 'The CDF accumulates the masses from the left; complements are often easier than sums.',
        solution:
          'F(1) = 0.2, F(2) = 0.7, F(3) = 1.0. The masses are valid: all in [0, 1] and summing to exactly 1.\n\nP(X > 1) = 1 - F(1) = 1 - 0.2 = 0.8. Using the complement avoids adding 0.5 + 0.3 by hand and generalises to large supports.\n\nP(1 < X <= 3) = F(3) - F(1) = 1.0 - 0.2 = 0.8. Same answer, as it must be, since X only takes the values 1, 2 and 3 so "greater than 1" and "in (1, 3]" describe the same event here.',
      },
      {
        prompt:
          'Y is uniform on [0, 4]. State the PDF, compute P(1 <= Y <= 2.5), and explain what P(Y = 2) equals and why.',
        hint: 'A uniform density is a rectangle whose total area must be 1.',
        solution:
          'The density is constant over an interval of width 4, so f(y) = 1/4 = 0.25 for 0 <= y <= 4 and 0 elsewhere. That is a valid PDF: non-negative, and its total area is 4 x 0.25 = 1.\n\nP(1 <= Y <= 2.5) is the area of a rectangle of width 1.5 and height 0.25, so 0.375.\n\nP(Y = 2) = 0. The "area" above a single point has zero width and therefore zero area. This is not a statement that 2 is impossible — Y must land on some value, and every value it could land on individually has probability 0. Probability 0 for a continuous variable means negligible, not impossible.',
      },
      {
        prompt:
          'Using scipy, verify that for a continuous distribution the four expressions P(a < X < b), P(a <= X < b), P(a < X <= b) and P(a <= X <= b) are all equal, and that for a discrete one they are not.',
        hint: 'Compute each with `cdf` and `pmf`, and compare. For the discrete case the differences will be exactly the endpoint masses.',
        language: 'python',
        starterCode: 'from scipy import stats\n\nC = stats.norm(loc=0, scale=1)\nD = stats.binom(n=10, p=0.4)\na, b = 2, 5\n',
        solution:
          'from scipy import stats\nC = stats.norm(0, 1)\nD = stats.binom(10, 0.4)\na, b = 2, 5\n\n# Continuous: endpoints carry no mass, so all four agree.\nprint(C.cdf(b) - C.cdf(a))          # 0.02274...\n\n# Discrete: the four differ by the endpoint masses.\nprint("P(a < X < b) ", D.cdf(b - 1) - D.cdf(a))\nprint("P(a <= X <= b)", D.cdf(b) - D.cdf(a - 1))\n\nFor the normal, `P(X = a)` is 0 so including or excluding an endpoint changes nothing; all four expressions equal 0.022750.\n\nFor Binomial(10, 0.4): P(2 < X < 5) = P(X in {3, 4}) = 0.2150 + 0.2508 = 0.4658, while P(2 <= X <= 5) = P(X in {2,3,4,5}) = 0.1209 + 0.2150 + 0.2508 + 0.2007 = 0.7874. The gap of 0.3216 is exactly p(2) + p(5). This is why discrete range questions need explicit care about endpoints and continuous ones do not.',
      },
    ],

    quiz: [
      {
        id: 'STAT-005-q1',
        type: 'truefalse',
        concept: 'density vs probability',
        prompt: 'A probability density function can take values greater than 1.',
        answer: true,
        explanation:
          'A density is probability per unit of x, so it is bounded only by the requirement that its total integral is 1. A uniform distribution on [0, 0.2] has density 5 everywhere, and that is entirely legitimate.',
      },
      {
        id: 'STAT-005-q2',
        type: 'mcq',
        concept: 'continuous variables',
        prompt: 'For a continuous random variable X, what is P(X = 3.5)?',
        options: [
          'Exactly 0, because a single point has no width',
          'Equal to the density f(3.5)',
          'It depends on the distribution',
          'Undefined, because the question is meaningless',
        ],
        answerIndex: 0,
        explanation:
          'Continuous variables assign probability to intervals, not points, so every individual value has probability 0. The density f(3.5) is a rate and becomes a probability only when multiplied by a width.',
      },
      {
        id: 'STAT-005-q3',
        type: 'numeric',
        concept: 'CDF arithmetic',
        prompt:
          'A discrete variable has p(0) = 0.1, p(1) = 0.3, p(2) = 0.4, p(3) = 0.2. What is P(1 <= X <= 2)?',
        answer: 0.7,
        tolerance: 0.005,
        explanation:
          '0.3 + 0.4 = 0.7. From the CDF this is F(2) - F(0) = 0.8 - 0.1 = 0.7. Subtracting F(1) instead would wrongly drop the mass at X = 1.',
      },
      {
        id: 'STAT-005-q4',
        type: 'match',
        concept: 'distribution functions',
        prompt: 'Match each function to what it returns.',
        pairs: [
          { left: 'PMF, p(x)', right: 'The probability that a discrete variable equals exactly x' },
          { left: 'PDF, f(x)', right: 'Probability per unit of x; area under it gives probability' },
          { left: 'CDF, F(x)', right: 'The probability that the variable is at most x' },
          { left: 'Inverse CDF (quantile)', right: 'The value below which a given fraction of probability lies' },
        ],
        explanation:
          'The CDF is the unifying object: it is a genuine probability for both discrete and continuous variables, and its inverse gives percentiles, which is what latency targets and confidence intervals are built from.',
      },
      {
        id: 'STAT-005-q5',
        type: 'code-output',
        language: 'python',
        concept: 'CDF and range probabilities',
        prompt: 'What does this print?',
        code: 'from scipy import stats\nU = stats.uniform(loc=0, scale=4)\nprint(round(U.pdf(2), 2), round(U.cdf(3) - U.cdf(1), 2))',
        options: ['0.25 0.5', '0.5 0.25', '0.25 0.25', '1.0 0.5'],
        answerIndex: 0,
        explanation:
          'The density of a uniform on [0, 4] is 1/4 = 0.25 everywhere. The probability of landing between 1 and 3 is a rectangle of width 2 and height 0.25, so 0.5.',
      },
      {
        id: 'STAT-005-q6',
        type: 'explain',
        concept: 'random variables',
        prompt:
          'A colleague says "the probability that the latency is 200 ms is 0.004, because that is what the density plot shows". Correct them, and tell them what they should compute instead.',
        rubric: [
          'States that a density value is not a probability and has units of probability per unit of x',
          'Notes that P(X = 200) is exactly 0 for a continuous variable',
          'Gives a correct alternative, such as a range probability or a CDF value or a percentile',
        ],
        sampleAnswer:
          'The 0.004 is a density, not a probability. Its units are probability per millisecond, which you can see by noticing that if they replotted the same data in seconds every value on the vertical axis would multiply by a thousand — and a probability cannot depend on the units of the horizontal axis. The probability that latency is exactly 200.000 ms is 0, since a single point has no width. What they almost certainly want is one of two things: a range, such as P(195 <= X <= 205), which is roughly the density times the 10 ms width, so about 0.04; or a cumulative statement such as P(X <= 200), read straight off the CDF, which is the form service-level objectives use. If they want a single number to report, the p95 or p99 latency is the honest one.',
        explanation:
          'The examinable idea is that density carries units and probability does not, and that the CDF is what converts a distribution into statements people can act on.',
      },
    ],

    flashcards: [
      { front: 'What is a random variable?', back: 'A function mapping each outcome in the sample space to a real number, so probability questions become arithmetic.' },
      { front: 'PMF vs PDF', back: 'PMF: discrete, p(x) = P(X = x), values are probabilities summing to 1. PDF: continuous, f(x) is a density, can exceed 1, integrates to 1.' },
      { front: 'Why is a PDF value not a probability?', back: 'It has units of probability per unit of x. Change the units of x and the density changes; probability does not. Only area under it is a probability.' },
      { front: 'What is the CDF?', back: 'F(x) = P(X <= x). Non-decreasing from 0 to 1, defined for discrete and continuous variables alike, and the basis of every range calculation.' },
      { front: 'P(a < X <= b) in terms of the CDF', back: 'F(b) - F(a). For continuous variables the endpoints do not matter; for discrete ones they do.' },
      { front: 'What is P(X = a) for a continuous X?', back: 'Exactly 0, for every a. Probability 0 means negligible, not impossible — X still lands somewhere.' },
    ],

    challenge: {
      title: 'Build a distribution inspector',
      brief:
        'Write a function that takes any `scipy.stats` frozen distribution and prints a compact report: whether it is discrete or continuous, its support, the value of the PMF or PDF at three points, the CDF at those points, the 5th, 50th and 95th percentiles via the inverse CDF, and a verification that the total probability is 1 (by summation for discrete, by numerical integration for continuous). Run it on a binomial, a Poisson, a uniform and a normal, and write two sentences on what changes between the discrete and continuous reports.',
      language: 'python',
      acceptanceCriteria: [
        'The function detects discrete versus continuous rather than being told',
        'Total probability is verified numerically and printed for every distribution',
        'Percentiles are obtained from the inverse CDF, not estimated from samples',
        'The report shows at least one density value greater than 1 for a suitably narrow continuous distribution',
      ],
      starterCode:
        'from scipy import stats\nimport numpy as np\n\ndef inspect(dist, name: str) -> None:\n    """Print a PMF/PDF, CDF and quantile report for a frozen scipy distribution."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach random variables and distributions to someone comfortable with basic probability. Make sure they leave understanding why the height of a density curve is not a probability.',
      mustCover: [
        'A random variable is a rule turning outcomes into numbers',
        'Discrete variables are described by a PMF whose values are probabilities that sum to 1',
        'Continuous variables are described by a PDF where only area is probability, and P(X = a) = 0',
        'The CDF accumulates probability and works the same way for both kinds',
      ],
      bonusSignals: [
        'uses units to argue that a density is not a probability',
        'gives an example of a density above 1',
        'connects the CDF to percentiles or latency targets',
      ],
      sampleExplanation:
        'A random variable is just a rule that turns each possible result into a number. Flip three coins and let X be the number of heads: now instead of eight fiddly outcomes you have four numbers, and numbers you can average and plot. The distribution tells you how likely each number is. When the values can be counted, you can say exactly how much probability sits on each one — an eighth on zero heads, three eighths on one, and so on, adding to exactly one. That list is the probability mass function. When the quantity is measured rather than counted, like a response time, this breaks. There are infinitely many possible times, so no exact value gets any probability at all; asking for the chance of exactly 200.000000 milliseconds gives zero. Probability is instead spread along the line, and you only get a number once you ask about a stretch of it. The curve you see plotted is a density, and the area beneath a stretch of it is the probability of landing in that stretch. The height alone is not a probability, and the cleanest proof is units: plot the same latencies in seconds instead of milliseconds and every height multiplies by a thousand, while the actual chances obviously do not change. The one function that works for both cases is the cumulative distribution function, which just answers "what is the chance of being at or below this value". That is why latency targets are written as percentiles and why every statistics library hands you a cdf.',
    },
  },

  {
    id: 'STAT-006',
    domain: 'STAT',
    module: 'Random Variables',
    topic: 'Expectation and variance',
    title: 'Expectation and Variance',
    slug: 'expectation-and-variance',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['STAT-005'],
    related: ['STAT-002', 'STAT-005'],
    tags: ['expectation', 'expected value', 'variance', 'standard deviation', 'linearity'],

    learningObjectives: [
      'Compute an expected value as a probability-weighted sum and interpret it as a long-run average',
      'Apply linearity of expectation, including to variables that are not independent',
      'Compute variance both from the definition and via the shortcut E[X squared] minus the square of the mean',
      'Explain why standard deviation exists at all — the units problem variance creates',
    ],

    terminology: [
      {
        term: 'Expectation (expected value)',
        definition:
          'E[X], the probability-weighted average of a random variable\'s values. It is the value the sample mean converges to as the number of observations grows.',
        simple: 'The long-run average if you repeated the experiment forever.',
      },
      {
        term: 'Linearity of expectation',
        definition:
          'E[aX + bY + c] = aE[X] + bE[Y] + c, which holds for any random variables whatsoever, including dependent ones.',
        simple: 'Averages add up, no matter how tangled the variables are.',
      },
      {
        term: 'Variance',
        definition:
          'Var(X) = E[(X - E[X])^2], the expected squared deviation from the mean. It measures spread and is always non-negative.',
        simple: 'On average, how far from the middle do the values sit — squared.',
      },
      {
        term: 'Standard deviation',
        definition:
          'The square root of the variance, which restores the original units of the variable and so can be compared directly with the mean.',
        simple: 'Typical distance from the average, in the same units as the data.',
      },
      {
        term: 'Law of the unconscious statistician',
        definition:
          'E[g(X)] is computed by summing or integrating g(x) against the distribution of X, without first deriving the distribution of g(X).',
        simple: 'To average a function of X, weight the function values by how likely each x is.',
      },
    ],

    simpleExplanation:
      'Suppose a game pays you whatever a die shows. Play it once and you get anything from 1 to 6. Play it ten thousand times and the average payout settles very close to 3.5, even though 3.5 is not a face on the die. That settling point is the expected value: not what you expect to see on any given roll, but the long-run average. You compute it by taking every possible value, multiplying by how likely it is, and adding the results — a weighted average where the weights are probabilities. But an average alone is a thin description. A game that always pays 3.5 and a game that pays 0 or 7 on a coin flip have the same expectation and feel completely different. So you also measure spread: take how far each value sits from the mean, square it so that being below and above both count as distance, and average those squares. That is variance. Squaring made the arithmetic work but wrecked the units — a variance of salaries comes out in squared pounds, which means nothing to anyone — so you take the square root at the end and call it the standard deviation.',

    whyItExists:
      'You cannot carry a whole distribution around in your head or in a report, so you need a few numbers that summarise it. Expectation exists to answer "what happens on average", which is the basis of every expected-cost decision, and variance exists because an average with no notion of spread is actively misleading about risk.',

    analogy: {
      scenario:
        'Think about balancing a ruler with weights glued along it. Put a heavy weight at 2 and a light one at 6, and the ruler balances somewhere between, closer to the heavy end. The balance point is not where most of the mass sits, nor a place you would necessarily find any weight at all — it is the point where the turning forces cancel. Now ask a different question: how spread out are the weights around that balance point? Two rulers can balance at the identical spot while one has everything clustered at the centre and the other has all its mass at the two extreme ends.',
      mapping: [
        { from: 'Positions along the ruler', to: 'The values the random variable can take' },
        { from: 'The size of each weight', to: 'The probability of that value' },
        { from: 'The balance point', to: 'The expected value, E[X]' },
        { from: 'How far the weights sit from the balance point', to: 'Deviations from the mean' },
        { from: 'The moment of inertia about the balance point', to: 'The variance' },
      ],
      bridge:
        'This is more than a picture: expectation really is the first moment of the probability distribution, and variance really is the second central moment, using exactly the mechanical definitions. That correspondence explains two things people find odd. First, why the expectation of a die is 3.5, a value the die can never show — balance points do not have to coincide with weights. Second, why variance squares the deviations rather than taking absolute values: squaring is what makes the quantity additive over independent variables, exactly as moments of inertia add.',
      limitations:
        'The ruler is finite; real distributions can have such heavy tails that the balance point does not exist at all. A Cauchy distribution has no mean and no variance, and its sample average never settles no matter how much data you collect — which is why robust summaries such as the median exist.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Computing an expectation and a variance',
        caption: 'Five steps that work for any discrete distribution.',
        steps: [
          { label: 'List the values and their probabilities', detail: 'The PMF. Check the probabilities sum to 1 before going further.' },
          { label: 'Multiply each value by its probability', detail: 'This weights each outcome by how often it happens.' },
          { label: 'Add them: that is E[X]', detail: 'The balance point of the distribution.' },
          { label: 'For each value, square its distance from E[X]', detail: 'Squaring makes below and above both count as spread.' },
          { label: 'Weight those squares by probability and add', detail: 'That is Var(X). Take the square root for the standard deviation.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Same expectation, different risk',
        caption: 'Expectation alone cannot distinguish these two bets, which is precisely why variance is reported alongside it.',
        left: {
          heading: 'Bet A: always pays 50',
          points: [
            'E[X] = 50',
            'Var(X) = 0, standard deviation 0',
            'Every single play gives exactly 50',
            'A model with this accuracy profile is completely predictable',
          ],
        },
        right: {
          heading: 'Bet B: pays 0 or 100 on a fair coin',
          points: [
            'E[X] = 0.5(0) + 0.5(100) = 50',
            'Var(X) = 2500, standard deviation 50',
            'No single play ever gives 50',
            'Same average, entirely different thing to live with',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Variance of a fair die, computed twice',
        caption: 'The definitional route and the shortcut must agree; if they do not, one of them has an arithmetic slip.',
        columns: ['x', 'p(x)', 'x p(x)', '(x - 3.5)^2', '(x - 3.5)^2 p(x)'],
        rows: [
          ['1', '1/6', '0.1667', '6.25', '1.0417'],
          ['2', '1/6', '0.3333', '2.25', '0.3750'],
          ['3', '1/6', '0.5000', '0.25', '0.0417'],
          ['4', '1/6', '0.6667', '0.25', '0.0417'],
          ['5', '1/6', '0.8333', '2.25', '0.3750'],
          ['6', '1/6', '1.0000', '6.25', '1.0417'],
          ['Total', '1', '3.5000', '', '2.9167'],
        ],
      },
      {
        kind: 'widget',
        title: 'Watch a sample mean converge on the expectation',
        caption: 'Flip repeatedly and track the running average of the payout. Early on it lurches; with enough trials it settles on the expected value. That settling is the law of large numbers.',
        widget: 'coin-flip-sim',
      },
    ],

    formalDefinition:
      'For a discrete random variable X with PMF p, the expectation is E[X] = sum over x of x p(x), provided the sum converges absolutely; for a continuous X with density f it is the integral of x f(x) dx over the real line. The variance is Var(X) = E[(X - E[X])^2], equivalently E[X^2] - (E[X])^2, and the standard deviation is its non-negative square root. Expectation is linear — E[aX + bY + c] = aE[X] + bE[Y] + c for all random variables X and Y, independent or not — whereas variance satisfies Var(aX + b) = a^2 Var(X) and Var(X + Y) = Var(X) + Var(Y) only when X and Y are uncorrelated.',

    math: {
      intuition:
        'Expectation is a weighted average where the weights are probabilities, so a value that happens twice as often pulls twice as hard. Variance asks the same weighted-average question about squared distance from the centre. The two shortcut identities below are worth memorising: the computational form of variance saves a pass over the data, and linearity of expectation is the single most useful fact in the whole of probability because it needs no independence assumption whatsoever.',
      formulas: [
        {
          latex: 'E[X] = \\sum_{x} x\\, p(x) \\qquad \\text{(discrete)}, \\qquad E[X] = \\int_{-\\infty}^{\\infty} x\\, f(x)\\,dx \\qquad \\text{(continuous)}',
          name: 'Expected value',
          meaning: 'The probability-weighted average of all the values the variable can take.',
          variables: [
            { symbol: 'E[X]', meaning: 'the expectation of X, often written mu' },
            { symbol: 'x', meaning: 'a value the variable can take' },
            { symbol: 'p(x)', meaning: 'the probability mass at x, used as the weight' },
            { symbol: 'f(x)', meaning: 'the density at x, in the continuous case' },
          ],
          category: 'probability',
        },
        {
          latex: 'E[aX + bY + c] = a\\,E[X] + b\\,E[Y] + c',
          name: 'Linearity of expectation',
          meaning:
            'Expectation passes straight through sums and constant multiples. Crucially this requires no independence at all, which makes it the most reusable tool in probability.',
          variables: [
            { symbol: 'a, b', meaning: 'constant coefficients' },
            { symbol: 'c', meaning: 'a constant offset, whose expectation is itself' },
            { symbol: 'X, Y', meaning: 'any two random variables, dependent or not' },
          ],
          category: 'probability',
        },
        {
          latex: '\\operatorname{Var}(X) = E\\bigl[(X - \\mu)^2\\bigr] = E[X^2] - \\mu^2',
          name: 'Variance and its computational form',
          meaning:
            'The average squared distance from the mean. The right-hand form needs only the first two moments, so it computes in a single pass over the data.',
          variables: [
            { symbol: '\\mu', meaning: 'the mean E[X]' },
            { symbol: 'E[X^2]', meaning: 'the expectation of the squared variable — the second raw moment' },
            { symbol: '(X - \\mu)^2', meaning: 'the squared deviation of a value from the mean' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\sigma = \\sqrt{\\operatorname{Var}(X)}',
          name: 'Standard deviation',
          meaning:
            'The square root of the variance, which restores the original units so the spread can be compared with the mean directly.',
          variables: [
            { symbol: '\\sigma', meaning: 'the standard deviation, in the same units as X' },
            { symbol: '\\operatorname{Var}(X)', meaning: 'the variance, in squared units' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\operatorname{Var}(aX + b) = a^2\\operatorname{Var}(X), \\qquad \\operatorname{Var}(X + Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) \;\\text{ if uncorrelated}',
          name: 'Variance under transformation and addition',
          meaning:
            'Shifting a variable does not change its spread; scaling it multiplies the variance by the square of the factor. Variances add only when the variables do not move together.',
          variables: [
            { symbol: 'a', meaning: 'a scaling factor; note it enters squared' },
            { symbol: 'b', meaning: 'a shift, which has no effect on spread at all' },
            { symbol: 'X + Y', meaning: 'the sum of two random variables' },
          ],
          category: 'statistics',
        },
        {
          latex: 'E[g(X)] = \\sum_{x} g(x)\\,p(x)',
          name: 'Law of the unconscious statistician',
          meaning:
            'To average a function of a random variable, weight the function values by the original probabilities. You never need the distribution of g(X) itself.',
          variables: [
            { symbol: 'g', meaning: 'any function applied to the random variable, such as squaring' },
            { symbol: 'g(x)', meaning: 'the function evaluated at the value x' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Start from the definition: Var(X) = E[(X - mu)^2], where mu is the constant E[X].',
        'Expand the square inside the expectation: (X - mu)^2 = X^2 - 2 mu X + mu^2.',
        'Apply linearity of expectation term by term: E[X^2] - 2 mu E[X] + E[mu^2].',
        'Both mu and mu^2 are constants, so E[mu^2] = mu^2, and E[X] = mu.',
        'Substituting gives E[X^2] - 2 mu^2 + mu^2 = E[X^2] - mu^2.',
        'That is the computational form. It is useful because you can accumulate a running sum of x and of x squared in one pass, and it is dangerous in floating point when the mean is large relative to the spread, because it subtracts two nearly equal big numbers — which is why NumPy uses a two-pass or Welford algorithm instead.',
      ],
    },

    workedExample: {
      title: 'A fair die, then a pair of dice, using linearity',
      setup:
        'Let X be the face shown by one fair six-sided die. Compute E[X] and Var(X) from first principles, then use linearity to get the expectation of the sum of two dice without enumerating all 36 outcomes.',
      steps: [
        {
          label: 'Expectation as a weighted sum',
          detail: 'Each face has probability 1/6, so the weights are equal and this reduces to the plain average of 1 through 6.',
          latex: 'E[X] = \\tfrac{1}{6}(1 + 2 + 3 + 4 + 5 + 6) = \\tfrac{21}{6} = 3.5',
        },
        {
          label: 'Note what 3.5 is and is not',
          detail:
            'No face shows 3.5. The expectation is the balance point of the distribution and the value the running average of many rolls converges to, not a value you will observe.',
          latex: '3.5 \\notin \\{1,2,3,4,5,6\\}',
        },
        {
          label: 'Second moment',
          detail: 'Average the squares, weighted by probability. This is the law of the unconscious statistician with g(x) = x squared.',
          latex: 'E[X^2] = \\tfrac{1}{6}(1 + 4 + 9 + 16 + 25 + 36) = \\tfrac{91}{6} \\approx 15.1667',
        },
        {
          label: 'Variance by the computational form',
          detail: 'Subtract the square of the mean from the mean of the squares.',
          latex: '\\operatorname{Var}(X) = \\tfrac{91}{6} - 3.5^2 = 15.1667 - 12.25 = 2.9167 = \\tfrac{35}{12}',
        },
        {
          label: 'Cross-check with the definition',
          detail:
            'Squared deviations are 6.25, 2.25, 0.25, 0.25, 2.25, 6.25, summing to 17.5. Divided by 6 that is 2.9167 — the two routes agree, as they must.',
          latex: '\\tfrac{17.5}{6} = 2.9167',
        },
        {
          label: 'Standard deviation restores the units',
          detail:
            'A variance of 2.9167 is in "squared pips", which is meaningless. The square root is 1.71 pips, directly comparable to the mean of 3.5.',
          latex: '\\sigma = \\sqrt{2.9167} \\approx 1.7078',
        },
        {
          label: 'Two dice: expectation by linearity',
          detail:
            'Let S = X1 + X2. Linearity gives the answer immediately, with no need to enumerate 36 outcomes or even to assume the dice are independent.',
          latex: 'E[S] = E[X_1] + E[X_2] = 3.5 + 3.5 = 7',
        },
        {
          label: 'Two dice: variance needs independence',
          detail:
            'Here the dice are independent, so variances add. If instead the second die were glued to show whatever the first showed, the sum would be 2X with variance 4(2.9167) = 11.67, four times larger — so this step genuinely depends on the assumption.',
          latex: '\\operatorname{Var}(S) = 2.9167 + 2.9167 = 5.8333, \\quad \\sigma_S \\approx 2.4152',
        },
      ],
      conclusion:
        'E[X] = 3.5, Var(X) = 35/12 ≈ 2.917, sigma ≈ 1.708. The two-dice step is the important one: expectation added without any assumption at all, while variance added only because the dice were independent. That asymmetry is why linearity of expectation solves problems that look intractable, and why claims about the variance of a sum always deserve a second look.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Expectation and variance from a PMF',
        runnable: true,
        code: `values = [1, 2, 3, 4, 5, 6]
probs = [1 / 6] * 6

mean = sum(x * p for x, p in zip(values, probs))
second = sum(x * x * p for x, p in zip(values, probs))

var_definition = sum((x - mean) ** 2 * p for x, p in zip(values, probs))
var_shortcut = second - mean ** 2

print(f"E[X]              = {mean:.4f}")
print(f"E[X^2]            = {second:.4f}")
print(f"Var by definition = {var_definition:.4f}")
print(f"Var by shortcut   = {var_shortcut:.4f}")
print(f"SD                = {var_shortcut ** 0.5:.4f}")`,
        output: `E[X]              = 3.5000
E[X^2]            = 15.1667
Var by definition = 2.9167
Var by shortcut   = 2.9167
SD                = 1.7078`,
        explanation:
          'Both variance routes agree to the last digit here. The shortcut needs only one pass and two accumulators, which is why streaming metric systems use it — but it subtracts two nearly equal numbers when the mean is large, so on data centred far from zero it loses precision badly. NumPy avoids this by subtracting the mean first, and Welford\'s algorithm updates both quantities incrementally without ever forming the dangerous difference.',
      },
      {
        language: 'python',
        title: 'Linearity of expectation holds even for dependent variables',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(42)
n = 500_000

x = rng.integers(1, 7, n)
y = 7 - x                     # perfectly (negatively) dependent on x

print(f"E[X]            = {x.mean():.4f}")
print(f"E[Y]            = {y.mean():.4f}")
print(f"E[X + Y]        = {(x + y).mean():.4f}   (linearity predicts 7)")
print()
print(f"Var(X)          = {x.var():.4f}")
print(f"Var(Y)          = {y.var():.4f}")
print(f"Var(X + Y)      = {(x + y).var():.4f}   (adding them would predict 5.83)")`,
        output: `E[X]            = 3.4998
E[Y]            = 3.5002
E[X + Y]        = 7.0000   (linearity predicts 7)

Var(X)          = 2.9158
Var(Y)          = 2.9158
Var(X + Y)      = 0.0000   (adding them would predict 5.83)`,
        explanation:
          'Y is completely determined by X, so the two are maximally dependent. Expectation still adds perfectly — that is the point of linearity, and it needs no independence. Variance emphatically does not: X + Y is the constant 7, so its variance is exactly 0, not the 5.83 you would get from adding variances. Any time you see variances being added, check that the variables are genuinely uncorrelated.',
      },
      {
        language: 'python',
        title: 'Expected value as a decision tool',
        runnable: true,
        code: `# Threshold choice for a fraud model, by expected cost per transaction.
base_rate = 0.002
cost_fn = 500.0     # cost of missing a fraud
cost_fp = 8.0       # cost of reviewing a false alarm

def expected_cost(recall, fpr):
    missed = base_rate * (1 - recall) * cost_fn
    alarms = (1 - base_rate) * fpr * cost_fp
    return missed + alarms

for name, recall, fpr in [("loose ", 0.95, 0.05),
                          ("medium", 0.80, 0.01),
                          ("tight ", 0.50, 0.001)]:
    print(f"{name}  recall={recall:.2f} fpr={fpr:.3f}  "
          f"expected cost = {expected_cost(recall, fpr):.4f} per transaction")`,
        output: `loose   recall=0.95 fpr=0.050  expected cost = 0.4493 per transaction
medium  recall=0.80 fpr=0.010  expected cost = 0.2799 per transaction
tight   recall=0.50 fpr=0.001  expected cost = 0.5080 per transaction`,
        explanation:
          'This is expectation used as it is used in industry: each threshold produces a random cost, and you pick the one with the lowest expected value. The medium threshold wins even though the loose one catches far more fraud, because 5% false positives on 99.8% of traffic is expensive. Notice that expected cost alone says nothing about variance — if the business cannot absorb an occasional very bad week, a higher-expected-cost but lower-variance option may still be the right call.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Choosing a decision threshold by expected cost',
        usage:
          'Every classification threshold implies an expected cost per prediction: miss rate times the prior times the cost of a miss, plus false-alarm rate times the cost of a review. Minimising that expectation is how thresholds are chosen when someone has done the analysis properly.',
      },
      {
        context: 'The bias-variance decomposition',
        usage:
          'Expected squared prediction error decomposes into squared bias plus variance plus irreducible noise, and the entire decomposition is an exercise in expanding an expectation of a square — the same algebra as the computational form of variance.',
      },
      {
        context: 'Gradient estimates in stochastic training',
        usage:
          'A mini-batch gradient is an unbiased estimate of the full gradient — its expectation is the true gradient — with variance inversely proportional to batch size. That trade-off is the entire reason batch size is a hyperparameter.',
      },
      {
        context: 'Reporting latency to stakeholders',
        usage:
          'Mean latency with no measure of spread is close to useless: a 200 ms mean with a 400 ms standard deviation describes a service that regularly times out. Teams pair the mean with a percentile or a standard deviation for exactly this reason.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: '`.mean()` and `.var()` compute these directly; note `np.var` defaults to the population form with `ddof=0`.' },
      { tool: 'PyTorch', role: 'Every loss function is an expectation estimated by the batch mean; `loss.backward()` differentiates that estimate.' },
      { tool: 'scikit-learn', role: '`cross_val_score` returns per-fold scores whose mean and standard deviation together tell you whether a difference between models is meaningful.' },
    ],

    commonMistakes: [
      {
        mistake: 'Expecting to observe the expected value',
        why: 'E[X] is a balance point, not a typical outcome. A fair die has expectation 3.5, which it can never show, and a heavily skewed distribution can have an expectation that almost no observation lies near.',
        fix: 'Read E[X] as "the long-run average", and always report a measure of spread beside it so the reader knows how far from it individual values fall.',
      },
      {
        mistake: 'Adding variances of dependent variables',
        why: 'Var(X + Y) = Var(X) + Var(Y) requires zero covariance. For correlated variables the true variance includes a 2Cov(X, Y) term, which can make the sum far larger or, as with X and 7 - X, exactly zero.',
        fix: 'Write the general identity Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y) and justify dropping the last term explicitly. Correlated model errors in an ensemble are the classic case where dropping it is wrong.',
      },
      {
        mistake: 'Forgetting that scaling squares the variance',
        why: 'Var(aX) = a^2 Var(X), not a Var(X). Converting a measurement from metres to centimetres multiplies the standard deviation by 100 and the variance by 10,000.',
        fix: 'Do unit conversions on the standard deviation, where the factor is linear, and square only at the end if you need a variance.',
      },
      {
        mistake: 'Reporting variance instead of standard deviation',
        why: 'Variance has squared units — squared pounds, squared milliseconds — which no reader can interpret and which cannot be compared with the mean.',
        fix: 'Report the standard deviation for communication, and keep the variance for algebra, where its additivity is what makes it useful.',
      },
      {
        mistake: 'Assuming the mean always exists',
        why: 'Heavy-tailed distributions such as the Cauchy have no finite expectation; the sample average wanders indefinitely rather than converging, so every average you compute is meaningless and misleadingly stable-looking.',
        fix: 'Plot the running mean as the sample grows. If it has not settled by the end of your data, use a median or a trimmed mean and be suspicious of any confidence interval built on the mean.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'State linearity of expectation precisely and explain why it is so useful.',
        answer:
          'E[aX + bY + c] = aE[X] + bE[Y] + c for any random variables X and Y and any constants, with no independence requirement whatsoever. That last clause is what makes it powerful: most probabilistic identities need independence, so problems involving tangled dependencies are usually hard, but any question about an average decomposes regardless. The classic example is the expected number of fixed points in a random permutation: define an indicator for each position, note each has expectation 1/n, and sum to get exactly 1 — even though the indicators are strongly dependent. In machine learning the same trick gives the expected number of distinct examples in a bootstrap sample, and it is why the mini-batch gradient is unbiased for the full gradient without any assumption that examples are independent within a batch.',
        followUp:
          'A strong answer contrasts this with variance, which does need uncorrelatedness to add, and can name the indicator-variable technique explicitly.',
      },
      {
        level: 'intermediate',
        question: 'Why do we use standard deviation when variance already measures spread?',
        answer:
          'Variance is in squared units, which makes it uninterpretable and incomparable with the mean. If salaries are in pounds, variance is in pounds squared, and "the variance of salaries is 64,000,000" conveys nothing. The square root gives 8,000 pounds, which can be read directly as a typical deviation and compared with a mean salary. Variance remains the quantity you do algebra with, because it is additive over independent variables and decomposes cleanly in the bias-variance identity, while standard deviation is the quantity you report. There is also a practical bridge: for roughly normal data the 68-95-99.7 rule turns a standard deviation straight into probability statements, whereas variance supports no such intuition.',
      },
      {
        level: 'ml-engineer',
        question: 'Why does averaging the predictions of an ensemble reduce variance, and what limits the benefit?',
        answer:
          'If you average n models each with prediction variance sigma squared and pairwise correlation rho, the variance of the average is rho sigma squared plus (1 - rho) sigma squared over n. The second term vanishes as n grows, so with uncorrelated models the variance falls like 1/n. But the first term does not depend on n at all, so the correlation between models sets a floor: perfectly correlated models give no benefit whatsoever, no matter how many you add. This is exactly why bagging bootstraps the training data and why random forests additionally sample features at each split — both are mechanisms for driving rho down rather than for making individual trees better. It is also why ensembling ten checkpoints of the same training run helps far less than ensembling ten models trained with different seeds, architectures or data splits.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A lottery ticket costs 2. It pays 100 with probability 0.01 and nothing otherwise. Compute the expected profit per ticket and the standard deviation of the profit, and say what each number tells a player.',
        hint: 'Define the profit random variable first: it takes two values, both net of the ticket price.',
        solution:
          'Profit takes the value 98 with probability 0.01 and -2 with probability 0.99.\n\nE[profit] = 0.01(98) + 0.99(-2) = 0.98 - 1.98 = -1.00. On average you lose exactly 1 per ticket.\n\nE[profit squared] = 0.01(9604) + 0.99(4) = 96.04 + 3.96 = 100.00.\nVar = 100.00 - (-1)^2 = 99. Standard deviation = sqrt(99) ≈ 9.95.\n\nThe two numbers say different things. The expectation says the game is a reliable long-run loss of 1 per ticket, which is what matters to the operator selling millions. The standard deviation of about 10 is large relative to the mean, which is what matters to the player: any individual ticket\'s outcome is dominated by noise, and that is exactly the property that makes gambling feel winnable.',
      },
      {
        prompt:
          'Prove that Var(aX + b) = a^2 Var(X), and use it to convert a standard deviation of 5 degrees Celsius into Fahrenheit.',
        hint: 'Start from the definition and note what happens to the mean under the same transformation. Fahrenheit is 1.8 times Celsius plus 32.',
        solution:
          'Let Y = aX + b. By linearity, E[Y] = aE[X] + b, so the deviation is Y - E[Y] = a(X - E[X]) — the shift b cancels entirely.\n\nSquaring: (Y - E[Y])^2 = a^2 (X - E[X])^2. Taking expectations and pulling out the constant: Var(Y) = a^2 Var(X).\n\nFor the conversion, a = 1.8 and b = 32. The standard deviation is the square root of the variance, so it scales by |a| rather than a^2: sd = 1.8 x 5 = 9 degrees Fahrenheit. The +32 has no effect, which is the intuitive part — shifting every reading by the same amount moves the centre but not the spread.',
      },
      {
        prompt:
          'By simulation, verify that Var(X + Y) equals Var(X) + Var(Y) for two independent dice but not for two dice constrained to sum to 7. Explain the result.',
        hint: 'Construct the dependent pair as Y = 7 - X and compare the empirical variances.',
        language: 'python',
        starterCode: 'import numpy as np\nrng = np.random.default_rng(0)\nn = 400_000\nx = rng.integers(1, 7, n)\n',
        solution:
          'import numpy as np\nrng = np.random.default_rng(0)\nn = 400_000\nx = rng.integers(1, 7, n)\ny_indep = rng.integers(1, 7, n)\ny_dep = 7 - x\nprint(x.var(), y_indep.var(), (x + y_indep).var())   # ≈ 2.917, 2.917, 5.833\nprint(x.var(), y_dep.var(), (x + y_dep).var())        # ≈ 2.917, 2.917, 0.000\n\nFor the independent pair the sum has variance ≈ 5.833, which is 2.917 + 2.917 as the addition rule predicts.\n\nFor the dependent pair the sum is identically 7, so its variance is exactly 0 despite each die individually having variance 2.917. The general identity is Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y), and here Cov(X, 7 - X) = -Var(X) = -2.917, so the cross term is -5.833 and cancels the other two exactly. Independence makes the covariance zero, which is the only reason variances usually appear to add.',
      },
    ],

    quiz: [
      {
        id: 'STAT-006-q1',
        type: 'numeric',
        concept: 'expected value',
        prompt:
          'A game pays 10 with probability 0.2, 5 with probability 0.5, and 0 otherwise. What is the expected payout?',
        answer: 4.5,
        tolerance: 0.05,
        explanation:
          '0.2(10) + 0.5(5) + 0.3(0) = 2 + 2.5 = 4.5. The weights are the probabilities and must sum to 1, which they do: 0.2 + 0.5 + 0.3.',
      },
      {
        id: 'STAT-006-q2',
        type: 'truefalse',
        concept: 'linearity',
        prompt: 'E[X + Y] = E[X] + E[Y] only holds when X and Y are independent.',
        answer: false,
        explanation:
          'Linearity of expectation holds for any random variables whatsoever. Independence is required for variances to add, and for E[XY] = E[X]E[Y], but never for expectations of sums.',
      },
      {
        id: 'STAT-006-q3',
        type: 'numeric',
        concept: 'variance scaling',
        prompt: 'If Var(X) = 9, what is Var(3X + 5)?',
        answer: 81,
        tolerance: 0.5,
        explanation:
          'Var(aX + b) = a^2 Var(X) = 9 x 9 = 81. The additive constant 5 shifts the distribution without changing its spread, and the multiplier enters squared.',
      },
      {
        id: 'STAT-006-q4',
        type: 'mcq',
        concept: 'units',
        prompt: 'Why is standard deviation usually reported instead of variance?',
        options: [
          'It is in the same units as the data, so it can be compared with the mean',
          'It is always smaller, which looks better in a report',
          'Variance can be negative, and standard deviation cannot',
          'Standard deviation is additive over independent variables',
        ],
        answerIndex: 0,
        explanation:
          'Variance is in squared units and cannot be interpreted alongside a mean. Variance is never negative, and it is variance — not standard deviation — that adds over independent variables, which is why the algebra is done in variance and the reporting in standard deviation.',
      },
      {
        id: 'STAT-006-q5',
        type: 'code-output',
        language: 'python',
        concept: 'computational form of variance',
        prompt: 'What does this print?',
        code: 'vals, probs = [0, 10], [0.5, 0.5]\nm = sum(v * p for v, p in zip(vals, probs))\ns = sum(v * v * p for v, p in zip(vals, probs))\nprint(m, s - m ** 2)',
        options: ['5.0 25.0', '5.0 50.0', '10.0 25.0', '5.0 0.0'],
        answerIndex: 0,
        explanation:
          'The mean is 5.0 and E[X squared] is 0.5(0) + 0.5(100) = 50, so the variance is 50 - 25 = 25 and the standard deviation is 5. Note that no observation ever equals the mean.',
      },
      {
        id: 'STAT-006-q6',
        type: 'explain',
        concept: 'expectation and risk',
        prompt:
          'Two deployment strategies have identical expected cost. Explain why you might still strongly prefer one, and what statistic you would put in front of the decision-maker.',
        rubric: [
          'States that expectation summarises the long-run average and says nothing about spread',
          'Explains that variance or a tail quantile captures the risk that differs between the options',
          'Gives a concrete example where the low-variance option is preferable despite equal expectation',
        ],
        sampleAnswer:
          'Expectation is a balance point, so two options can average identically while behaving completely differently in any single instance. Suppose both strategies cost 50,000 a year in expectation, but one is a steady 50,000 while the other is usually 10,000 and occasionally 500,000 after an outage. Those are the same expectation and very different businesses to run, because the second can exhaust a budget or breach a service-level agreement in a single bad month. I would put the standard deviation and a tail quantile in front of the decision-maker — the 95th percentile cost, or the probability of exceeding some threshold that actually matters to them — rather than only the mean. This is also why ensembling is attractive even when it does not improve average accuracy: it reduces the variance of the prediction, and predictable is often worth more than marginally better on average.',
        explanation:
          'The point being tested is that a single summary statistic cannot describe a distribution, and that risk lives in the spread and the tail rather than in the mean.',
      },
    ],

    flashcards: [
      { front: 'Definition of expected value', back: 'E[X] = sum of x times p(x): the probability-weighted average, and the value the sample mean converges to.' },
      { front: 'Linearity of expectation', back: 'E[aX + bY + c] = aE[X] + bE[Y] + c, for any random variables — independence is not required.' },
      { front: 'Two formulas for variance', back: 'Var(X) = E[(X - mu)^2] = E[X^2] - mu^2. The second computes in one pass but loses precision when the mean is large.' },
      { front: 'Var(aX + b) = ?', back: 'a^2 Var(X). Shifting does not change spread; scaling multiplies the variance by the square of the factor.' },
      { front: 'When do variances add?', back: 'Only when the variables are uncorrelated. In general Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y).' },
      { front: 'Why take the square root of variance?', back: 'Variance is in squared units and cannot be compared with the mean. The standard deviation restores the original units.' },
    ],

    challenge: {
      title: 'Expected value of a threshold policy',
      brief:
        'You have a classifier\'s validation scores and true labels. Write code that, for every candidate threshold, computes the expected cost per example given a cost for false negatives and a cost for false positives, plots or prints the cost curve, and reports the optimal threshold. Then show how the optimum moves as the class base rate changes from 10% to 0.1%, and write two sentences explaining the direction of that movement.',
      language: 'python',
      acceptanceCriteria: [
        'Expected cost is computed as a probability-weighted sum, not as a raw error count',
        'The optimal threshold is found by minimising the expected cost, not fixed at 0.5',
        'The analysis is repeated for at least three base rates and the results compared',
        'A short written interpretation explains why the optimum moves as it does',
      ],
      starterCode:
        'import numpy as np\n\ndef expected_cost(scores, labels, threshold, cost_fn=1.0, cost_fp=1.0):\n    """Expected cost per example at a given decision threshold."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach expectation and variance to someone who knows what a distribution is. Use a concrete example, and make sure they understand both why the expected value need not be observable and why we bother taking a square root at the end.',
      mustCover: [
        'Expectation is a probability-weighted average and the long-run average of repeated trials',
        'The expected value need not be a value the variable can actually take',
        'Variance is the average squared distance from the mean, so spread counts in both directions',
        'Standard deviation exists because squaring destroys the units',
      ],
      bonusSignals: [
        'mentions linearity of expectation and that it needs no independence',
        'gives two distributions with the same mean and different spread',
        'connects to expected cost or to the bias-variance decomposition',
      ],
      sampleExplanation:
        'Expectation is the long-run average. Take a die that pays you its face value. Any single roll gives you something between 1 and 6, but if you roll it ten thousand times the running average settles at 3.5. You get that number by multiplying each value by how likely it is and adding: a sixth of 1, plus a sixth of 2, and so on. Notice immediately that 3.5 is not a face on the die. An expectation is a balance point, not a prediction, and treating it as a typical outcome is the most common way people misuse it. Now, an average on its own can be badly misleading. A bet that always pays 50 and a bet that pays 0 or 100 on a coin flip have exactly the same expectation, and they are not the same thing to live with. So you also measure how far values sit from the mean. You cannot just average the distances, because the ones below and above cancel out to zero by construction, so you square them first, which also makes big deviations count disproportionately. That average squared distance is the variance. The problem is that squaring wrecked the units: if you were measuring salaries in pounds, the variance is in pounds squared, which nobody can interpret. So you take the square root and call it the standard deviation, and now you have a number in pounds that you can put next to the mean and read directly. Variance is what you do algebra with — it adds up nicely over independent things — and standard deviation is what you put in the report.',
    },
  },

  {
    id: 'STAT-007',
    domain: 'STAT',
    module: 'Describing Data',
    topic: 'Measures of central tendency',
    title: 'Mean, Median and Mode',
    slug: 'mean-median-mode',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: [],
    related: ['STAT-006'],
    tags: ['mean', 'median', 'mode', 'skew', 'outliers', 'robustness'],

    learningObjectives: [
      'Compute the mean, median and mode of a small dataset by hand',
      'Choose the honest summary for a given distribution, and justify the choice',
      'Explain robustness: why the median survives outliers and the mean does not',
      'Predict the relative ordering of the three statistics from the direction of skew',
    ],

    terminology: [
      {
        term: 'Mean (arithmetic average)',
        definition:
          'The sum of all values divided by how many there are. It is the balance point of the data and uses every observation, which is both its strength and its weakness.',
        simple: 'Add everything up and share it out equally.',
      },
      {
        term: 'Median',
        definition:
          'The middle value when the data are sorted; with an even count, the average of the two middle values. Exactly half the observations lie at or below it.',
        simple: 'The value in the middle when you line everyone up.',
      },
      {
        term: 'Mode',
        definition:
          'The most frequently occurring value. A distribution may have none, one or several, and for continuous data it is defined by the peak of the density rather than by repeated values.',
        simple: 'The most common value.',
      },
      {
        term: 'Skew',
        definition:
          'Asymmetry in a distribution. Right (positive) skew has a long tail towards high values and pulls the mean above the median; left skew does the reverse.',
        simple: 'A lopsided distribution with a long tail on one side.',
      },
      {
        term: 'Robust statistic',
        definition:
          'A summary whose value changes only slightly when a small fraction of the data is arbitrarily corrupted. The median has a breakdown point of 50%; the mean has 0%.',
        simple: 'A number that does not lurch when a few values go haywire.',
      },
      {
        term: 'Breakdown point',
        definition:
          'The proportion of the data that must be corrupted before a statistic can be driven to an arbitrary value. Higher is more robust.',
        simple: 'How much bad data it takes to ruin the number.',
      },
    ],

    simpleExplanation:
      'When you have a pile of numbers, you want one number that stands for the whole pile. There are three sensible answers and they disagree more often than people expect. The mean shares everything out equally: add it all up, divide by how many there are. The median lines everyone up in order and takes whoever is standing in the middle. The mode simply asks which value shows up most often. On a tidy, symmetric pile these three land in almost the same place and the choice does not matter. On a lopsided pile they can be wildly different, and then the choice is the whole story. Put one billionaire in a room of ordinary people and the mean income becomes millions while the median barely moves, because the median only cares about who is in the middle, not how extreme the extremes are. That is why governments report median household income and not mean: one number describes a typical household and the other describes an accounting identity nobody lives in.',

    whyItExists:
      'A dataset of a million rows cannot be reported, remembered or compared. Summaries of centre exist so a distribution can be discussed in one number, and three of them exist because "the centre" genuinely means different things depending on whether you want a balance point, a typical case, or the most common case.',

    analogy: {
      scenario:
        'Picture a small company with ten employees. Nine earn around 30,000 and the founder takes 1,000,000. If you ask "what does someone here earn?", the mean gives 127,000 — a figure that describes nobody in the building, because the founder\'s salary has been smeared thinly across everyone else. The median gives 30,000, which is what you would actually find if you stopped a random person in the corridor. If seven of the nine happen to earn exactly 30,000, that is also the mode: the salary you are most likely to bump into.',
      mapping: [
        { from: 'Sharing the total payroll equally among everyone', to: 'The mean' },
        { from: 'Lining everyone up by salary and asking the middle person', to: 'The median' },
        { from: 'The salary printed on the most contracts', to: 'The mode' },
        { from: 'The founder\'s outlying salary', to: 'An extreme value with unbounded influence on the mean' },
        { from: 'The median barely moving when the founder gets a raise', to: 'Robustness — a 50% breakdown point' },
      ],
      bridge:
        'The salary picture maps exactly onto the mathematics. The mean is the point that minimises total squared distance to the data, so a far-away point exerts enormous pull; the median is the point that minimises total absolute distance, so each point pulls with the same force regardless of how far it sits. That is the entire reason one is fragile and the other is not, and it is the same reason that squared-error regression chases outliers while absolute-error regression ignores them.',
      limitations:
        'The story implies the mean is simply worse, which is false. If you are budgeting total payroll, the mean is exactly the right number, because mean times headcount is the total and no median-based figure has that property. The mean is the wrong summary for "typical" and the right one for "total".',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Mean versus median',
        caption: 'Neither is better in general; they answer different questions and fail in different ways.',
        left: {
          heading: 'Mean',
          points: [
            'Uses every observation, so it carries all the information',
            'Minimises total squared distance to the data',
            'Breakdown point 0%: one extreme value can move it anywhere',
            'The only summary where centre times count gives the total',
            'Right for totals, budgets and expected values',
          ],
        },
        right: {
          heading: 'Median',
          points: [
            'Uses only the ordering, so it discards magnitude information',
            'Minimises total absolute distance to the data',
            'Breakdown point 50%: half the data must be corrupted to move it far',
            'Cannot be combined across groups by simple weighting',
            'Right for "typical", for skewed data and for dirty data',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What skew does to the three statistics',
        caption: 'The rule of thumb is that the mean chases the tail.',
        columns: ['Shape', 'Ordering', 'Example', 'Which to report'],
        rows: [
          ['Symmetric, single peak', 'mean = median = mode', 'Heights, measurement error', 'Mean, with a standard deviation'],
          ['Right (positive) skew', 'mode < median < mean', 'Income, latency, file sizes', 'Median, with quartiles'],
          ['Left (negative) skew', 'mean < median < mode', 'Age at death, exam scores with a ceiling', 'Median'],
          ['Bimodal', 'the centre is misleading entirely', 'Two mixed populations', 'Neither — split the groups first'],
          ['Categorical', 'only the mode is defined', 'Most common class label', 'Mode'],
        ],
      },
      {
        kind: 'flow',
        title: 'Choosing a summary statistic',
        caption: 'Four questions, in order, and you almost never get them wrong.',
        branching: true,
        steps: [
          { label: 'Is the data categorical?', detail: 'If yes, only the mode is meaningful — mean shoe colour does not exist.' },
          { label: 'Plot it. Is it roughly symmetric and single-peaked?', detail: 'If yes, report the mean with a standard deviation.' },
          { label: 'Is it skewed or does it contain outliers?', detail: 'If yes, report the median with the interquartile range.' },
          { label: 'Is it bimodal?', detail: 'If yes, no single centre is honest. Identify and separate the two populations.' },
          { label: 'Do you actually need a total?', detail: 'If yes, use the mean regardless of skew — only the mean multiplies up to a total.' },
        ],
      },
      {
        kind: 'ascii',
        title: 'Right-skewed data, with the three centres marked',
        caption: 'The long tail on the right drags the mean away from the bulk of the data while the median stays put.',
        art: `  count
    |
 30 |        ##
    |        ##
 20 |     ## ## ##
    |     ## ## ##
 10 |  ## ## ## ## ##
    |  ## ## ## ## ## ##  ##        ##            ##
  0 +----------------------------------------------------
       ^   ^     ^
       |   |     |
    mode  median mean                          outliers
      30    40    78.6`,
      },
    ],

    formalDefinition:
      'For a sample of n observations, the mean is the sum of the observations divided by n. The median is the value at position (n+1)/2 in the sorted order when n is odd, and the mean of the observations at positions n/2 and n/2 + 1 when n is even. The mode is any value attaining the maximum frequency. The mean minimises the sum of squared deviations and is the unique unbiased linear estimator of the population mean under standard assumptions; the median minimises the sum of absolute deviations and has an asymptotic breakdown point of 50%, against 0% for the mean.',

    math: {
      intuition:
        'Each of the three centres is the answer to a different optimisation problem, which is the cleanest way to understand why they differ. Ask for the single value that is closest to your data in a squared sense and you get the mean; ask in an absolute sense and you get the median; ask which value appears most and you get the mode. Because squaring punishes large distances disproportionately, a single distant point can drag the mean a long way, while for the median every point pulls with the same force and only the count on each side matters.',
      formulas: [
        {
          latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i',
          name: 'Sample mean',
          meaning: 'Add every observation and divide by the number of observations.',
          variables: [
            { symbol: '\\bar{x}', meaning: 'the sample mean, read "x bar"' },
            { symbol: 'n', meaning: 'the number of observations' },
            { symbol: 'x_i', meaning: 'the i-th observation' },
            { symbol: '\\sum', meaning: 'sum over all n observations' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\tilde{x} = \\begin{cases} x_{((n+1)/2)} & n \\text{ odd} \\\\[4pt] \\tfrac{1}{2}\\bigl(x_{(n/2)} + x_{(n/2+1)}\\bigr) & n \\text{ even} \\end{cases}',
          name: 'Sample median',
          meaning: 'The middle value of the sorted data, or the average of the two middle values when there is no single middle.',
          variables: [
            { symbol: '\\tilde{x}', meaning: 'the sample median' },
            { symbol: 'x_{(k)}', meaning: 'the k-th smallest observation, called the k-th order statistic' },
            { symbol: 'n', meaning: 'the number of observations' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\bar{x} = \\arg\\min_{c} \\sum_{i=1}^{n}(x_i - c)^2, \\qquad \\tilde{x} \\in \\arg\\min_{c} \\sum_{i=1}^{n}\\lvert x_i - c\\rvert',
          name: 'Mean and median as optimisers',
          meaning:
            'The mean is the single number closest to the data in squared distance; the median is the closest in absolute distance. This is the source of the robustness difference.',
          variables: [
            { symbol: 'c', meaning: 'a candidate summary value being optimised over' },
            { symbol: '(x_i - c)^2', meaning: 'squared distance, which grows quadratically and so gives distant points enormous influence' },
            { symbol: '\\lvert x_i - c \\rvert', meaning: 'absolute distance, which grows linearly so every point pulls equally hard' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\text{skew} \\approx \\frac{3(\\bar{x} - \\tilde{x})}{s}',
          name: 'Pearson second skewness coefficient',
          meaning:
            'A quick diagnostic: the gap between mean and median, in standard deviations, estimates the direction and rough size of the skew.',
          variables: [
            { symbol: '\\bar{x} - \\tilde{x}', meaning: 'the gap between mean and median; positive means right-skewed' },
            { symbol: 's', meaning: 'the sample standard deviation, used to make the measure unit-free' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'To see why the mean minimises squared distance, write the objective S(c) = sum of (x_i - c)^2.',
        'Differentiate with respect to c: S\'(c) = -2 sum of (x_i - c).',
        'Set the derivative to zero: sum of x_i - n c = 0.',
        'Solve: c = (1/n) sum of x_i, which is precisely the mean. The second derivative is 2n, which is positive, so it is a minimum.',
        'For absolute distance the objective is not differentiable at the data points, but the same argument works with subgradients: moving c upward by a small amount reduces the objective by the number of points above c and increases it by the number below.',
        'The objective therefore stops improving exactly when the counts on each side are equal — which is the definition of the median. Note that only the counts matter, not the distances, and that is precisely why the median is robust.',
      ],
    },

    workedExample: {
      title: 'Seven salaries, and what one founder does to the average',
      setup:
        'A small team reports annual salaries in thousands: 32, 35, 38, 40, 40, 45, 320. Compute all three measures of centre, then remove the outlier and recompute, to see which statistics were actually describing the team.',
      steps: [
        {
          label: 'Sort the data',
          detail: 'Already sorted here, but sorting is mandatory before taking a median and is the step people skip.',
          latex: '32,\; 35,\; 38,\; 40,\; 40,\; 45,\; 320',
        },
        {
          label: 'Mean',
          detail: 'Sum is 32 + 35 + 38 + 40 + 40 + 45 + 320 = 550, over 7 observations.',
          latex: '\\bar{x} = \\frac{550}{7} \\approx 78.57',
        },
        {
          label: 'Median',
          detail: 'Seven values, so the middle is the 4th in sorted order. Three values sit below it and three above.',
          latex: '\\tilde{x} = x_{(4)} = 40',
        },
        {
          label: 'Mode',
          detail: 'Only 40 appears more than once, so the data are unimodal with mode 40.',
          latex: '\\text{mode} = 40',
        },
        {
          label: 'Notice the disagreement',
          detail:
            'Six of the seven people earn between 32 and 45. The mean of 78.57 is higher than every one of those six salaries. It is arithmetically correct and descriptively useless.',
          latex: '\\bar{x} = 78.57 > 45 = \\max(\\text{six of seven salaries})',
        },
        {
          label: 'Drop the outlier and recompute',
          detail:
            'Without the 320: sum is 230 over 6 observations, so the mean is 38.33 — a fall of 40.24. The median moves from 40 to the average of the 3rd and 4th values, 39, a fall of just 1.',
          latex: '\\bar{x}_{-} = \\frac{230}{6} \\approx 38.33, \\qquad \\tilde{x}_{-} = \\tfrac{38 + 40}{2} = 39',
        },
        {
          label: 'Quantify the influence',
          detail:
            'A single observation out of seven moved the mean by more than 40 units and the median by 1. Push that salary to 3,200 and the mean becomes 490 while the median does not move at all.',
          latex: '\\Delta\\bar{x} = 40.24, \\qquad \\Delta\\tilde{x} = 1',
        },
        {
          label: 'Check the skew diagnostic',
          detail:
            'The mean sits far above the median, which is the signature of right skew and the ordering mode < median < mean, exactly as the table predicts.',
          latex: '40 = \\text{mode} \\le \\tilde{x} = 40 < \\bar{x} = 78.57',
        },
      ],
      conclusion:
        'Mean 78.57, median 40, mode 40. The right answer to "what does someone on this team earn?" is 40; the right answer to "what is the payroll?" is 78.57 times seven, which is 550. Both statistics are correct and only one of them is an honest summary of a typical person. When the mean sits far above the median, suspect a long right tail and report the median.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'All three measures, before and after an outlier',
        runnable: true,
        code: `import statistics as st
import numpy as np

salaries = [32, 35, 38, 40, 40, 45, 320]
clean = salaries[:-1]

for name, data in [("with outlier", salaries), ("without    ", clean)]:
    print(f"{name}: mean={np.mean(data):7.2f}  "
          f"median={np.median(data):6.2f}  mode={st.mode(data)}")

# Push the outlier further and watch only one statistic move.
extreme = salaries[:-1] + [3200]
print(f"\\nextreme     : mean={np.mean(extreme):7.2f}  "
      f"median={np.median(extreme):6.2f}  mode={st.mode(extreme)}")`,
        output: `with outlier: mean=  78.57  median= 40.00  mode=40
without    : mean=  38.33  median= 39.00  mode=40

extreme     : mean= 490.00  median= 40.00  mode=40`,
        explanation:
          'Multiplying the outlier by ten multiplies the mean by more than six and leaves the median exactly where it was. This is the breakdown point made visible: the mean has one of 0%, meaning a single corrupted value can drag it anywhere at all, while the median needs more than half the data to be corrupted before it can be moved arbitrarily. In practice this is why a single logging bug that records a latency of 10^9 ms destroys your mean latency dashboard and leaves your p50 untouched.',
      },
      {
        language: 'python',
        title: 'Skew determines the ordering',
        runnable: true,
        code: `import numpy as np
from scipy import stats

rng = np.random.default_rng(1)

datasets = {
    "symmetric   ": rng.normal(100, 15, 100_000),
    "right-skewed": rng.lognormal(mean=4.0, sigma=0.9, size=100_000),
    "left-skewed ": 100 - rng.lognormal(mean=3.0, sigma=0.6, size=100_000),
}

for name, d in datasets.items():
    mean, median = d.mean(), np.median(d)
    skew = stats.skew(d)
    order = "mean > median" if mean > median else "mean < median"
    print(f"{name}: mean={mean:8.2f} median={median:8.2f} "
          f"skew={skew:+6.2f}  -> {order}")`,
        output: `symmetric   : mean=  100.01 median=  100.02 skew= +0.00  -> mean < median
right-skewed: mean=   81.44 median=   54.60 skew= +3.52  -> mean > median
left-skewed : mean=   75.72 median=   79.91 skew= -2.45  -> mean < median`,
        explanation:
          'The rule is that the mean chases the tail. Right skew has its long tail at high values, so the mean is pulled above the median; left skew does the reverse; and on symmetric data the two coincide to within noise. This gives you a free diagnostic that needs no plotting: compute both, and if they differ by a meaningful fraction of the standard deviation, your data are skewed and the mean is not a typical value.',
      },
      {
        language: 'python',
        title: 'Why the median cannot be averaged across groups',
        runnable: true,
        code: `import numpy as np

team_a = np.array([30, 32, 34, 36, 38])          # 5 people
team_b = np.array([50, 55, 60, 65, 70, 75, 900])  # 7 people
combined = np.concatenate([team_a, team_b])

print("mean  A =", team_a.mean(), " mean  B =", round(team_b.mean(), 2))
print("weighted mean of means =",
      round((5 * team_a.mean() + 7 * team_b.mean()) / 12, 2))
print("mean of combined       =", round(combined.mean(), 2))
print()
print("median A =", np.median(team_a), " median B =", np.median(team_b))
print("average of medians     =", (np.median(team_a) + np.median(team_b)) / 2)
print("median of combined     =", np.median(combined))`,
        output: `mean  A = 34.0  mean  B = 182.14
weighted mean of means = 120.5
mean of combined       = 120.5

median A = 34.0  median B = 65.0
average of medians     = 49.5
median of combined     = 44.0`,
        explanation:
          'Means compose: a count-weighted average of group means equals the overall mean exactly, which is why distributed metric systems can aggregate means from shards. Medians do not: the average of the two medians is 49.5 while the true combined median is 44.0, and no weighting fixes it in general. This is the practical cost of robustness, and it is why percentile aggregation across servers needs sketch data structures such as t-digest rather than simple averaging.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Latency dashboards',
        usage:
          'Teams report p50 and p99 latency rather than the mean, because a handful of multi-second requests inflate the mean into a number no user experiences. The median tells you about the typical request; the p99 tells you about the tail that generates complaints.',
      },
      {
        context: 'Imputing missing values',
        usage:
          'scikit-learn\'s `SimpleImputer` offers mean, median and most-frequent strategies. Median is the default choice for skewed numeric columns such as income or house price, mean for roughly symmetric ones, and most-frequent for categorical columns where the other two are undefined.',
      },
      {
        context: 'Regression loss choice',
        usage:
          'Fitting with squared error makes the model predict the conditional mean; fitting with absolute error makes it predict the conditional median. Choosing a loss is therefore choosing which measure of centre you want your model to estimate, and Huber loss interpolates between them.',
      },
      {
        context: 'Official statistics',
        usage:
          'National statistics agencies report median household income precisely because income is strongly right-skewed. Reporting the mean would make a country look richer than most of its households actually are.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.describe()` gives mean and the quartiles including the median; `df.mode()` handles categorical columns.' },
      { tool: 'NumPy', role: '`np.mean`, `np.median`, and `np.percentile` for arbitrary quantiles. There is deliberately no `np.mode`.' },
      { tool: 'scikit-learn', role: '`SimpleImputer(strategy="median")` is the standard defence against skewed numeric features with missing values.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reporting the mean of a heavily skewed variable',
        why: 'Income, latency, file size and session length all have long right tails, so the mean sits above most of the data and describes no typical case. The audience will read it as typical anyway.',
        fix: 'Plot a histogram first. If the mean and median differ noticeably, report the median with the interquartile range, and mention the mean only when you genuinely need a total.',
      },
      {
        mistake: 'Forgetting to sort before taking a median',
        why: 'The median is defined on the sorted order. Taking the middle element of an unsorted list returns an arbitrary observation, and the error is silent because the result still looks plausible.',
        fix: 'Use a library function — `np.median` or `statistics.median` — which sorts internally. Hand-rolling this is not worth the risk.',
      },
      {
        mistake: 'Averaging medians or percentiles across groups',
        why: 'Medians are not linear, so a weighted average of group medians is not the overall median. Averaging per-server p99 latencies understates the true p99, often badly.',
        fix: 'Pool the raw data and recompute, or use a mergeable sketch such as t-digest or HDR histogram that supports exact-enough percentile aggregation.',
      },
      {
        mistake: 'Summarising a bimodal distribution with any single centre',
        why: 'If the data are a mixture of two populations, every measure of centre lands in the valley between them — a value that is not typical of either group and may be rare in the data.',
        fix: 'Plot it. If you see two peaks, find the variable that separates them and report each group separately, because the mixture is the finding.',
      },
      {
        mistake: 'Believing the mode is always meaningful for continuous data',
        why: 'With continuous measurements no value repeats, so the sample mode is either undefined or an artefact of rounding. The population mode is a property of the density, not of repeated values.',
        fix: 'For continuous data, estimate the mode from a histogram or kernel density estimate, and be aware the answer depends on the bin width or bandwidth you chose.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'When would you report the median instead of the mean?',
        answer:
          'Whenever the distribution is skewed or contains outliers, and whenever "typical" is the question being asked. Income, latency, house prices and session durations all have long right tails, so the mean is pulled above the bulk of the data and describes no real case: in a team of six people earning around 40,000 and one earning 320,000, the mean of 78,600 exceeds every one of the six salaries. The median is robust, with a breakdown point of 50%, so it barely moves. The mean is still the right choice when the data are roughly symmetric, when you need a total — mean times count gives the total and no median-based figure does — or when you need the statistical properties of the sample mean for inference, such as the central limit theorem and standard errors.',
        followUp:
          'A strong answer notes the trade-off honestly: the median discards magnitude information, is less efficient than the mean on clean normal data, and cannot be aggregated across groups by weighting.',
      },
      {
        level: 'intermediate',
        question: 'A model trained with mean squared error and the same model trained with mean absolute error give different predictions on skewed targets. Explain why.',
        answer:
          'Squared error is minimised by the mean and absolute error by the median, so the two losses make the model estimate different functionals of the conditional distribution of y given x. On a right-skewed target such as house price or claim amount, the conditional mean sits above the conditional median, so the squared-error model will systematically predict higher values, and it will be far more influenced by a handful of very large targets because each contributes quadratically to the gradient. Absolute error weights every residual equally in the gradient, which makes it robust but also means it is insensitive to how badly wrong a large error is. Which one you want depends on the decision: if you need an unbiased estimate of total cost across many predictions, you want the mean and therefore squared error; if you want a prediction that is typically close, you want the median and therefore absolute error. Huber loss is the common compromise, behaving quadratically near zero and linearly in the tails.',
      },
      {
        level: 'ml-engineer',
        question: 'Your p99 latency dashboard averages the p99 reported by each of 50 servers. What is wrong with that, and what would you do instead?',
        answer:
          'Percentiles are not linear, so the average of per-server p99 values is not the p99 of the combined traffic and is usually an underestimate. The intuition is that the global p99 is driven by whichever servers are actually slow, and averaging dilutes their contribution with 49 healthy ones; in the extreme, one server serving all the slow requests has its signal divided by 50. The fix is to aggregate distributions rather than summaries, by shipping histograms or a mergeable sketch such as t-digest, DDSketch or an HDR histogram, and computing the percentile once from the merged structure. These give bounded relative error and merge associatively, which is what makes them correct under arbitrary shard layouts. If only per-server summaries are available, reporting the maximum of the per-server p99 values is a defensible upper-bound proxy, and it is at least honest about being a proxy.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute the mean, median and mode of: 4, 8, 6, 4, 10, 4, 12. Then add the value 100 and recompute all three, noting how much each moved.',
        hint: 'Sort first. Track which statistics change and by how much.',
        solution:
          'Sorted: 4, 4, 4, 6, 8, 10, 12. Sum = 48, n = 7.\n\nMean = 48/7 ≈ 6.857. Median = the 4th value = 6. Mode = 4 (it appears three times).\n\nAfter adding 100: sorted 4, 4, 4, 6, 8, 10, 12, 100. Sum = 148, n = 8.\nMean = 148/8 = 18.5, an increase of 11.64.\nMedian = average of the 4th and 5th values = (6 + 8)/2 = 7, an increase of 1.\nMode = 4, unchanged.\n\nOne new observation out of eight moved the mean by 170% and the median by 17%. Note also that the mean is now larger than every value except the outlier itself, which is the diagnostic signature of a badly skewed summary.',
      },
      {
        prompt:
          'A dataset has mean 50 and median 35. What does this tell you about its shape, and which summary would you put in a report for a non-technical audience?',
        hint: 'Which direction does the mean get pulled, and by what?',
        solution:
          'The mean sits well above the median, which is the signature of right (positive) skew: a long tail of high values is dragging the mean upward while the median stays near the bulk of the data. The likely ordering is mode below median below mean. The gap of 15 is substantial relative to the median itself, so the skew is not marginal.\n\nUsing the Pearson diagnostic, if the standard deviation were 30 the skewness would be roughly 3(50 - 35)/30 = 1.5, which is strongly skewed.\n\nFor a non-technical audience I would lead with the median of 35 as the typical value, give the interquartile range so they can see the spread, and mention the mean only if a total is needed — noting explicitly that it is higher because of a small number of very large values. Presenting the mean alone would leave readers believing 50 is typical when most of the data sit well below it.',
      },
      {
        prompt:
          'Write a function that computes all three statistics and also reports the percentage change in each when the largest value is multiplied by ten. Run it on a dataset of your choice and interpret the result.',
        hint: 'Use `np.mean`, `np.median` and `statistics.multimode`; compute before and after and compare.',
        language: 'python',
        starterCode:
          'import numpy as np\nimport statistics as st\n\ndef sensitivity(data: list[float]) -> None:\n    """Report mean, median and mode before and after inflating the max."""\n    ...\n',
        solution:
          'import numpy as np, statistics as st\n\ndef sensitivity(data):\n    d = sorted(data)\n    inflated = d[:-1] + [d[-1] * 10]\n    for name, s in [("before", d), ("after ", inflated)]:\n        print(f"{name}: mean={np.mean(s):9.2f} median={np.median(s):8.2f} "\n              f"mode={st.multimode(s)}")\n    print(f"mean moved {100 * (np.mean(inflated) / np.mean(d) - 1):.1f}%, "\n          f"median moved {100 * (np.median(inflated) / np.median(d) - 1):.1f}%")\n\nsensitivity([32, 35, 38, 40, 40, 45, 320])\n\nOutput: the mean rises from 78.57 to 490.00, a change of +523.6%, while the median stays at 40.00, a change of 0.0%. The mode is unchanged at 40.\n\nThe interpretation is the breakdown point made concrete: corrupting one observation out of seven can move the mean without limit, whereas moving the median requires corrupting at least half the data. Any metric pipeline that reports means without a guard against absurd values is one logging bug away from a meaningless dashboard.',
      },
    ],

    quiz: [
      {
        id: 'STAT-007-q1',
        type: 'numeric',
        concept: 'median',
        prompt: 'What is the median of 3, 7, 1, 9, 4, 6?',
        answer: 5,
        tolerance: 0.01,
        explanation:
          'Sorted: 1, 3, 4, 6, 7, 9. With six values there is no single middle, so take the average of the 3rd and 4th: (4 + 6)/2 = 5. Note that 5 does not appear in the data, which is normal for an even-sized sample.',
      },
      {
        id: 'STAT-007-q2',
        type: 'mcq',
        concept: 'skew',
        prompt: 'A dataset has mean 85 and median 60. What is the most likely shape?',
        options: [
          'Right-skewed, with a long tail of high values',
          'Left-skewed, with a long tail of low values',
          'Symmetric with high variance',
          'Bimodal with two equal peaks',
        ],
        answerIndex: 0,
        explanation:
          'The mean is pulled towards the tail. A mean well above the median means the tail is on the high side, which is right (positive) skew — the classic shape for income, latency and file sizes.',
      },
      {
        id: 'STAT-007-q3',
        type: 'truefalse',
        concept: 'robustness',
        prompt: 'Changing the single largest value in a dataset to an enormous number leaves the median unchanged.',
        answer: true,
        explanation:
          'The median depends only on the sorted order, and inflating the largest value does not change anyone\'s position in that order. The mean, by contrast, can be moved arbitrarily far by that single change.',
      },
      {
        id: 'STAT-007-q4',
        type: 'match',
        concept: 'choosing a statistic',
        prompt: 'Match each situation to the summary you should report.',
        pairs: [
          { left: 'Household income across a country', right: 'Median — strongly right-skewed' },
          { left: 'Total payroll budget for next year', right: 'Mean — it multiplies up to the total' },
          { left: 'Most common browser among users', right: 'Mode — the data are categorical' },
          { left: 'Measurement error from a calibrated instrument', right: 'Mean — roughly symmetric, and it uses all the data' },
        ],
        explanation:
          'The choice follows from the question and the shape. Only the mean multiplies up to a total, only the mode works for categorical data, and the median is the honest answer to "typical" whenever the distribution is skewed.',
      },
      {
        id: 'STAT-007-q5',
        type: 'code-output',
        language: 'python',
        concept: 'sensitivity to outliers',
        prompt: 'What does this print?',
        code: 'import numpy as np\nd = [1, 2, 3, 4, 1000]\nprint(round(np.mean(d), 1), np.median(d))',
        options: ['202.0 3.0', '2.5 3.0', '202.0 4.0', '200.0 3.0'],
        answerIndex: 0,
        explanation:
          'The sum is 1010 over 5 values, so the mean is 202.0, which is larger than four of the five observations. The median is the 3rd sorted value, 3.0, which genuinely describes the bulk of the data.',
      },
      {
        id: 'STAT-007-q6',
        type: 'explain',
        concept: 'honest summaries',
        prompt:
          'A product manager reports "average session length is 12 minutes" from data where most sessions last under 2 minutes. Explain what has happened and what you would report instead.',
        rubric: [
          'Identifies a right-skewed distribution with a small number of very long sessions',
          'Explains that the mean is pulled by the tail and is not a typical value',
          'Proposes the median plus a spread measure, or a full distribution, as the honest alternative',
        ],
        sampleAnswer:
          'Session length is almost always right-skewed: most people bounce quickly and a small number leave a tab open for hours. Those few enormous sessions contribute their full magnitude to the mean, dragging it far above the bulk of the data, so 12 minutes can easily be the average when the median is 90 seconds. The mean is arithmetically correct and descriptively false: essentially no session lasts 12 minutes. I would report the median session length, add the interquartile range or the 25th and 75th percentiles so the spread is visible, and show a histogram if there is room, because the shape is the finding. I would also check whether the long tail is real engagement or an instrumentation artefact — sessions that never receive an explicit end event and time out after an hour are a very common cause, and if so the fix is in the logging rather than in the statistic.',
        explanation:
          'A complete answer covers three things: the mechanism (skew plus an unbounded mean), the remedy (median and spread), and the possibility that the tail is a data-quality problem rather than a real phenomenon.',
      },
    ],

    flashcards: [
      { front: 'Mean, median, mode in one line each', back: 'Mean: sum over count, the balance point. Median: the middle of the sorted data. Mode: the most frequent value.' },
      { front: 'Why is the median robust?', back: 'It depends only on the ordering, so extreme values cannot pull it. Its breakdown point is 50%; the mean\'s is 0%.' },
      { front: 'What does right skew do to the three?', back: 'mode < median < mean. The mean chases the long tail, so it sits above the bulk of the data.' },
      { front: 'What does each statistic minimise?', back: 'The mean minimises total squared distance; the median minimises total absolute distance. That is the whole robustness story.' },
      { front: 'When must you use the mean?', back: 'When you need a total (mean times count), and when you need the sampling theory that underpins standard errors and confidence intervals.' },
      { front: 'Why can you not average medians across groups?', back: 'Medians are not linear. Pool the raw data or use a mergeable sketch such as t-digest; averaging per-shard percentiles understates the true percentile.' },
    ],

    challenge: {
      title: 'An honest summary function',
      brief:
        'Write a function `summarise(series)` that inspects a numeric column and prints the summary a careful analyst would: the count, mean, median, standard deviation, the quartiles, a skewness estimate, the number of values beyond 1.5 interquartile ranges from the quartiles, and a one-line recommendation of which measure of centre to report and why. Run it on at least one symmetric and one heavily skewed column and confirm that the recommendation differs.',
      language: 'python',
      acceptanceCriteria: [
        'The recommendation is derived from the data — for example from the mean-median gap or a skewness estimate — not hard-coded',
        'Outliers are counted using an explicit, stated rule',
        'The function is demonstrated on both a symmetric and a skewed dataset',
        'The printed recommendation includes a reason, not just a verdict',
      ],
      starterCode:
        'import numpy as np\nimport pandas as pd\n\ndef summarise(series: pd.Series) -> None:\n    """Print a full, honest description of a numeric column."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach mean, median and mode to someone who has never thought about which one to use. Make them understand robustness and skew without using those words until you have earned them.',
      mustCover: [
        'How each of the three is computed',
        'That they can disagree sharply, and an example where they do',
        'Why extreme values move the mean but not the median',
        'How to choose: skew, outliers, categorical data, and whether a total is needed',
      ],
      bonusSignals: [
        'gives the income or latency example with real numbers',
        'mentions the ordering mode < median < mean under right skew',
        'notes that the mean is still correct when you need a total',
      ],
      sampleExplanation:
        'You have a pile of numbers and you want one number to stand for the pile. There are three honest answers. The mean is what you get if you pool everything and share it out equally: add it all up and divide by how many there are. The median is what you get if you line everyone up smallest to largest and ask whoever is standing in the middle. The mode is simply whichever value turns up most often. On a tidy pile they agree and the choice does not matter. Now put a founder earning a million into a room of nine people earning thirty thousand. Share the total out equally and everyone gets about a hundred and twenty-seven thousand — which is more than nine of the ten people actually earn, so as a description of "what people here earn" it is false even though the arithmetic is right. Line them up instead and the person in the middle earns thirty thousand, which is what you would actually find if you stopped someone in the corridor. Here is the reason for the difference: when you average, every value contributes its full size, so one gigantic value can drag the answer anywhere. When you take the middle, all that matters is how many people are above and below, not how far above they are — the founder could earn a billion and the middle person would be unchanged. So: if the pile is lopsided, with a few very large values, use the middle one. If it is tidy and symmetric, use the average, which has the advantage of using every number. If the data are categories rather than numbers, only the most-common answer even makes sense. And if what you actually need is a total, such as the payroll, use the average, because average times headcount gives you the total and nothing else does.',
    },
  },

  {
    id: 'STAT-008',
    domain: 'STAT',
    module: 'Describing Data',
    topic: 'Measures of spread',
    title: 'Spread: Variance and Standard Deviation',
    slug: 'spread-variance-std',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['STAT-007'],
    related: ['STAT-006', 'STAT-007'],
    tags: ['variance', 'standard deviation', 'range', 'iqr', 'bessel', 'degrees of freedom'],

    learningObjectives: [
      'Compute range, interquartile range, variance and standard deviation for a small dataset by hand',
      'Explain why deviations are squared rather than simply added or taken in absolute value',
      'Give a correct account of why sample variance divides by n minus 1 rather than n',
      'Choose between standard deviation and the interquartile range based on the shape of the data',
    ],

    terminology: [
      {
        term: 'Range',
        definition:
          'Maximum minus minimum. It uses only two observations, so it is trivially computed and grows without bound as the sample size increases.',
        simple: 'The distance from the smallest value to the largest.',
      },
      {
        term: 'Interquartile range (IQR)',
        definition:
          'The third quartile minus the first: the width of the middle 50% of the sorted data. It ignores the extreme quarters entirely and is therefore robust.',
        simple: 'How wide the middle half of the data is.',
      },
      {
        term: 'Variance',
        definition:
          'The average squared deviation from the mean. For a sample it is computed with denominator n minus 1; for a full population, with n.',
        simple: 'On average, how far from the middle values sit — squared.',
      },
      {
        term: 'Standard deviation',
        definition:
          'The square root of the variance, expressed in the original units of the data so it can be compared with the mean.',
        simple: 'Typical distance from the average, in the units you started with.',
      },
      {
        term: "Bessel's correction",
        definition:
          'Dividing by n minus 1 rather than n in the sample variance. It corrects the downward bias introduced by measuring deviations from the sample mean instead of the unknown true mean.',
        simple: 'The fix that stops sample variance being systematically too small.',
      },
      {
        term: 'Degrees of freedom',
        definition:
          'The number of values in a calculation that are free to vary. After the sample mean is fixed, only n minus 1 of the deviations can be chosen freely, because they are constrained to sum to zero.',
        simple: 'How many of the numbers could still have been anything, once the mean is pinned down.',
      },
    ],

    simpleExplanation:
      'Two datasets can have exactly the same average and be nothing alike. Imagine two model versions that both average 90% accuracy: one scores between 89 and 91 on every test set, the other swings between 60 and 100. Knowing the average tells you nothing about which one you would rather deploy. Spread is the second number you need. The crudest measure is the range — biggest minus smallest — but it depends entirely on two observations and gets larger simply because you collected more data. A far better idea is to ask how far a typical value sits from the middle. You cannot just average the distances as they are, because the ones below the mean are negative and cancel the ones above, always giving exactly zero. So you square them first, which also makes far-away values count disproportionately, then average, and then take a square root at the end to undo the squaring and get back to your original units. That final number is the standard deviation, and it is the single most reported measure of spread in all of statistics.',

    whyItExists:
      'An average with no measure of spread is actively misleading: it suggests a precision the data may not have and hides the risk that matters for decisions. Spread exists so that "90% accurate" can be distinguished from "90% accurate, plus or minus 1" and "90% accurate, plus or minus 20", which are completely different claims.',

    analogy: {
      scenario:
        'Two archers both average a bullseye. The first puts every arrow within a centimetre of the centre. The second puts half her arrows a metre to the left and half a metre to the right; they average out to dead centre, and she has never once hit the target. If you were choosing an archer for a competition, the average score would be useless and the scatter would be everything. Now notice how you would measure that scatter. You cannot average the signed misses — left and right cancel to zero for both archers, which was the whole problem. You have to remove the sign, and squaring is the way to do it that makes physics and algebra work out.',
      mapping: [
        { from: 'The average landing point of the arrows', to: 'The mean' },
        { from: 'Signed misses cancelling to zero', to: 'Why deviations sum to zero by construction' },
        { from: 'Squaring each miss distance', to: 'Squared deviations' },
        { from: 'The average squared miss', to: 'The variance, in squared centimetres' },
        { from: 'Converting back to a typical miss in centimetres', to: 'Taking the square root to get the standard deviation' },
      ],
      bridge:
        'The cancellation point is not a technicality — the sum of deviations from the sample mean is exactly zero, always, by the definition of the mean. That identity is also the reason for the n minus 1 in the sample variance: once you have computed the mean from the data, the deviations are no longer free, since any n minus 1 of them determine the last one. You have spent one degree of freedom, and dividing by n would pretend you had not.',
      limitations:
        'The archery picture suggests squaring is the only sensible choice. Averaging absolute misses also works and is more robust; squaring wins because it makes variances add over independent quantities and because it is differentiable everywhere, which matters enormously for optimisation. It is a choice with reasons, not a necessity.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Four measures of spread, compared',
        caption: 'Robustness and interpretability pull in opposite directions; pick according to the shape of your data.',
        columns: ['Measure', 'Definition', 'Robust?', 'Units', 'Use when'],
        rows: [
          ['Range', 'max - min', 'No — uses only the two extremes', 'Original', 'Quick sanity check; quality-control charts'],
          ['IQR', 'Q3 - Q1', 'Yes — ignores the outer quarters', 'Original', 'Skewed data, outliers, boxplots'],
          ['Variance', 'Mean squared deviation', 'No', 'Squared', 'Algebra: it adds over independent variables'],
          ['Std deviation', 'Square root of variance', 'No', 'Original', 'Reporting, z-scores, roughly normal data'],
        ],
      },
      {
        kind: 'flow',
        title: 'Computing a standard deviation by hand',
        caption: 'Six steps. The third is the one that exists purely to defeat cancellation.',
        steps: [
          { label: 'Compute the mean', detail: 'Everything is measured relative to it.' },
          { label: 'Subtract the mean from each value', detail: 'These deviations always sum to exactly zero.' },
          { label: 'Square each deviation', detail: 'Removes the sign and makes large deviations count disproportionately.' },
          { label: 'Add the squares', detail: 'This total is the sum of squares, the quantity regression also minimises.' },
          { label: 'Divide by n - 1 for a sample, n for a population', detail: 'The correction accounts for having estimated the mean from the same data.' },
          { label: 'Take the square root', detail: 'Restores the original units, giving the standard deviation.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Standard deviation versus interquartile range',
        caption: 'The same trade-off as mean versus median, one level up.',
        left: {
          heading: 'Standard deviation',
          points: [
            'Uses every observation',
            'Pairs naturally with the mean and with z-scores',
            'Interpretable via the 68-95-99.7 rule when data are near-normal',
            'One extreme value can inflate it without limit',
            'Additive in variance form, which drives all of statistical theory',
          ],
        },
        right: {
          heading: 'Interquartile range',
          points: [
            'Uses only the 25th and 75th percentiles',
            'Pairs naturally with the median',
            'Unaffected by anything in the outer quarters',
            'Defines the standard boxplot outlier rule, 1.5 x IQR',
            'No clean algebra: IQRs do not add or decompose',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'See spread change shape',
        caption: 'Hold the mean fixed and vary the standard deviation. Watch how the curve flattens and widens while its centre stays put, and how much probability moves into the tails.',
        widget: 'distribution-explorer',
      },
      {
        kind: 'annotated',
        title: 'Anatomy of the sample variance formula',
        subject: 's^2 = sum over i of (x_i - xbar)^2 / (n - 1)',
        annotations: [
          { part: '(x_i - xbar)', note: 'A deviation: how far one observation sits from the sample mean. These always sum to zero.' },
          { part: 'squared', note: 'Removes the sign so deviations cannot cancel, and makes large deviations dominate.' },
          { part: 'sum over i', note: 'The sum of squares — the same quantity least-squares regression minimises.' },
          { part: 'n - 1', note: "Bessel's correction. One degree of freedom was consumed by estimating the mean from this same data." },
          { part: 's^2', note: 'Variance, in squared units. Take the square root for the standard deviation s.' },
        ],
      },
    ],

    formalDefinition:
      'For a sample of n observations with sample mean x-bar, the sample variance is s squared = (1/(n-1)) times the sum of (x_i - x-bar) squared, and the sample standard deviation is its non-negative square root. The population variance uses the true mean mu and divides by N. Dividing by n - 1 makes s squared an unbiased estimator of the population variance — its expectation equals the true variance exactly — although s itself remains a slightly biased estimator of sigma because the square root is a concave function. The interquartile range is the difference between the 75th and 25th percentiles, and the range is the difference between the maximum and minimum.',

    math: {
      intuition:
        'Spread is the average distance from the centre, with two adjustments. First, distances must not be allowed to cancel, so they are squared. Second, when the centre itself was estimated from the same data, the deviations come out slightly too small — the sample mean is, by construction, the point that makes them as small as possible — so the divisor is reduced from n to n minus 1 to compensate. The square root at the end is purely cosmetic in the mathematical sense and essential in the communicative one: it puts the number back into the units of the data.',
      formulas: [
        {
          latex: 's^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i - \\bar{x})^2',
          name: 'Sample variance',
          meaning:
            'The average squared deviation from the sample mean, with the divisor reduced by one to correct for having estimated that mean from the same data.',
          variables: [
            { symbol: 's^2', meaning: 'the sample variance, in squared units' },
            { symbol: 'n', meaning: 'the number of observations' },
            { symbol: 'x_i', meaning: 'the i-th observation' },
            { symbol: '\\bar{x}', meaning: 'the sample mean, estimated from this same data' },
            { symbol: 'n-1', meaning: "the degrees of freedom remaining after estimating the mean — Bessel's correction" },
          ],
          category: 'statistics',
        },
        {
          latex: '\\sigma^2 = \\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2',
          name: 'Population variance',
          meaning:
            'When you have the entire population and the true mean, no correction is needed and the divisor is N.',
          variables: [
            { symbol: '\\sigma^2', meaning: 'the population variance' },
            { symbol: 'N', meaning: 'the size of the whole population' },
            { symbol: '\\mu', meaning: 'the true population mean, known rather than estimated' },
          ],
          category: 'statistics',
        },
        {
          latex: 's = \\sqrt{s^2}, \\qquad \\text{IQR} = Q_3 - Q_1',
          name: 'Standard deviation and interquartile range',
          meaning:
            'Two ways to express spread in the original units: one built on squared deviations from the mean, the other on the width of the middle half.',
          variables: [
            { symbol: 's', meaning: 'the sample standard deviation' },
            { symbol: 'Q_1', meaning: 'the first quartile — 25% of the data lies at or below it' },
            { symbol: 'Q_3', meaning: 'the third quartile — 75% lies at or below it' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\sum_{i=1}^{n}(x_i - \\bar{x}) = 0',
          name: 'Deviations sum to zero',
          meaning:
            'The identity that forces us to square: raw deviations from the sample mean always cancel exactly, so their average carries no information at all.',
          variables: [
            { symbol: '(x_i - \\bar{x})', meaning: 'a raw, signed deviation' },
            { symbol: '0', meaning: 'the sum, which is exactly zero for every dataset without exception' },
          ],
          category: 'statistics',
        },
        {
          latex: 'E[s^2] = \\sigma^2 \\quad \\text{with } n-1, \\qquad E\\!\\left[\\tfrac{1}{n}\\sum (x_i - \\bar{x})^2\\right] = \\frac{n-1}{n}\\sigma^2',
          name: 'Why the correction is needed',
          meaning:
            'Dividing by n gives an estimator that is too small by exactly the factor (n-1)/n on average. Dividing by n - 1 removes that bias exactly.',
          variables: [
            { symbol: 'E[\\cdot]', meaning: 'expectation over repeated samples from the population' },
            { symbol: '\\sigma^2', meaning: 'the true population variance being estimated' },
            { symbol: '\\frac{n-1}{n}', meaning: 'the shrinkage factor: 0.5 at n = 2, 0.99 at n = 100, so the correction matters most for small samples' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\text{outlier if } x < Q_1 - 1.5\\,\\text{IQR} \;\\text{ or }\; x > Q_3 + 1.5\\,\\text{IQR}',
          name: 'Tukey boxplot outlier rule',
          meaning:
            'The conventional robust definition of an outlier, built entirely from quartiles so that the outliers themselves cannot influence the rule.',
          variables: [
            { symbol: '1.5', meaning: 'a convention chosen by Tukey; it flags about 0.7% of normally distributed data' },
            { symbol: '\\text{IQR}', meaning: 'the interquartile range, which sets the scale' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Why n minus 1? Consider estimating the spread of a population whose true mean mu is unknown.',
        'If you knew mu, the natural estimator would be the average of (x_i - mu)^2, and dividing by n would be correct.',
        'But you do not know mu, so you use x-bar instead — and x-bar is the value that minimises the sum of squared deviations for this particular sample.',
        'That means the sum of (x_i - x-bar)^2 is, for every sample, smaller than or equal to the sum of (x_i - mu)^2. The deviations you measure are systematically too small.',
        'Algebraically, the expected value of the sum of (x_i - x-bar)^2 works out to exactly (n - 1) sigma squared rather than n sigma squared.',
        'Dividing by n - 1 rather than n therefore makes the expectation come out to exactly sigma squared: the estimator becomes unbiased.',
        'The intuition in one sentence: you used the data once already to locate the centre, so only n - 1 independent pieces of information about spread remain. At n = 2 you have a single piece, and dividing by 1 rather than 2 makes a 100% difference; at n = 1000 the correction is negligible.',
      ],
    },

    workedExample: {
      title: 'Eight numbers, every measure of spread',
      setup:
        'Take the dataset 2, 4, 4, 4, 5, 5, 7, 9. It is small enough to do entirely by hand and chosen so the arithmetic comes out clean. We will compute the range, the quartiles and IQR, the population variance, the sample variance, and both standard deviations, and then see how much a single corrupted value changes each.',
      steps: [
        {
          label: 'Mean',
          detail: 'Sum is 2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40, over 8 observations.',
          latex: '\\bar{x} = \\tfrac{40}{8} = 5',
        },
        {
          label: 'Deviations, and the check that they cancel',
          detail: 'Subtract 5 from each value. The negatives and positives sum to exactly zero, which is why they must be squared.',
          latex: '-3,\\, -1,\\, -1,\\, -1,\\, 0,\\, 0,\\, 2,\\, 4 \;\\longrightarrow\; \\text{sum} = 0',
        },
        {
          label: 'Squared deviations, and the sum of squares',
          detail: 'Square each deviation, then add. This total is the numerator of every variance formula.',
          latex: '9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32',
        },
        {
          label: 'Population variance and standard deviation',
          detail: 'If these eight numbers are the entire population, divide by n = 8.',
          latex: '\\sigma^2 = \\tfrac{32}{8} = 4, \\qquad \\sigma = 2',
        },
        {
          label: 'Sample variance and standard deviation',
          detail: 'If they are a sample from a larger population, divide by n - 1 = 7. The result is larger, as the correction always makes it.',
          latex: 's^2 = \\tfrac{32}{7} \\approx 4.5714, \\qquad s \\approx 2.1381',
        },
        {
          label: 'Range and quartiles',
          detail:
            'Range is 9 - 2 = 7. The lower half is 2, 4, 4, 4 with median 4, so Q1 = 4; the upper half is 5, 5, 7, 9 with median 6, so Q3 = 6.',
          latex: '\\text{range} = 7, \\quad Q_1 = 4, \\quad Q_3 = 6, \\quad \\text{IQR} = 2',
        },
        {
          label: 'Apply the Tukey outlier rule',
          detail: 'Fences at 4 - 1.5(2) = 1 and 6 + 1.5(2) = 9. Every value lies within, so nothing is flagged — including the 9, which sits exactly on the fence.',
          latex: '[1,\\, 9] \\supseteq \\{2, \\ldots, 9\\}',
        },
        {
          label: 'Now corrupt one value and recompute',
          detail:
            'Replace the 9 with 100. The mean rises to 16.375, the sample standard deviation explodes from 2.14 to about 33.6, and the IQR moves only from 2 to 2.5 because the corrupted point merely stays in the top quarter.',
          latex: 's: 2.14 \\to 33.6 \;(\\times 15.7), \\qquad \\text{IQR}: 2 \\to 2.5 \;(\\times 1.25)',
        },
      ],
      conclusion:
        'Sample standard deviation 2.14, population standard deviation 2.00, IQR 2, range 7. Two things are worth carrying away. First, the n versus n minus 1 choice changed the answer by 7% at n = 8 and would change it by 41% at n = 3, so it is not a pedantic detail on small samples. Second, one corrupted observation multiplied the standard deviation by nearly sixteen and the IQR by one and a quarter, which is exactly why exploratory analysis leads with quartiles and boxplots.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The n versus n-1 trap in NumPy and pandas',
        runnable: true,
        code: `import numpy as np
import pandas as pd

data = [2, 4, 4, 4, 5, 5, 7, 9]
a = np.array(data)
s = pd.Series(data)

print("numpy  var (ddof=0, population):", a.var())
print("numpy  var (ddof=1, sample)    :", a.var(ddof=1))
print("pandas var (ddof=1 by default) :", s.var())
print()
print("numpy  std (ddof=0):", round(a.std(), 4))
print("pandas std (ddof=1):", round(s.std(), 4))`,
        output: `numpy  var (ddof=0, population): 4.0
numpy  var (ddof=1, sample)    : 4.571428571428571
pandas var (ddof=1 by default) : 4.571428571428571

numpy  std (ddof=0): 2.0
pandas std (ddof=1): 2.1381`,
        explanation:
          'NumPy defaults to `ddof=0` (population) and pandas defaults to `ddof=1` (sample), so the same data gives different answers depending on which library you reached for. This is a genuine and frequent source of confusion in mixed codebases, and it silently changes reported numbers. Decide which one you mean, pass `ddof` explicitly, and the discrepancy disappears.',
      },
      {
        language: 'python',
        title: 'Demonstrating that dividing by n is biased',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)
true_var = 25.0          # population sigma^2, with sigma = 5
n = 5
trials = 200_000

samples = rng.normal(loc=100, scale=5, size=(trials, n))
biased = samples.var(axis=1, ddof=0).mean()
unbiased = samples.var(axis=1, ddof=1).mean()

print(f"true population variance     : {true_var:.4f}")
print(f"average of /n   estimates    : {biased:.4f}")
print(f"average of /(n-1) estimates  : {unbiased:.4f}")
print(f"predicted bias factor (n-1)/n: {(n - 1) / n:.4f}")
print(f"observed  ratio              : {biased / true_var:.4f}")`,
        output: `true population variance     : 25.0000
average of /n   estimates    : 19.9834
average of /(n-1) estimates  : 24.9793
predicted bias factor (n-1)/n: 0.8000
observed  ratio              : 0.7993`,
        explanation:
          'Averaged over 200,000 samples of size 5, dividing by n lands at 80% of the true variance — exactly the predicted (n-1)/n factor — while dividing by n minus 1 lands on the truth. This is not a rounding argument or a convention: it is a measurable, systematic bias, and it arises because the sample mean is the point that makes the squared deviations as small as they can possibly be for that particular sample.',
      },
      {
        language: 'python',
        title: 'Robust spread when the data are dirty',
        runnable: true,
        code: `import numpy as np
from scipy import stats

clean = np.array([2, 4, 4, 4, 5, 5, 7, 9], dtype=float)
dirty = clean.copy()
dirty[-1] = 100.0        # one corrupted reading

def report(name, d):
    q1, q3 = np.percentile(d, [25, 75])
    print(f"{name}: std={d.std(ddof=1):8.3f}  IQR={q3 - q1:6.3f}  "
          f"MAD={stats.median_abs_deviation(d, scale='normal'):6.3f}")

report("clean", clean)
report("dirty", dirty)`,
        output: `clean: std=   2.138  IQR= 2.000  MAD= 1.483
dirty: std=  33.600  IQR= 2.500  MAD= 1.483`,
        explanation:
          'One corrupted value multiplies the standard deviation by nearly sixteen while the IQR moves by a quarter and the median absolute deviation does not move at all. The `scale="normal"` argument rescales the MAD so that it estimates the same quantity as the standard deviation for normally distributed data, which makes the two directly comparable. When you are screening a new dataset, comparing a robust and a non-robust spread measure is one of the fastest ways to detect that something is wrong with the data.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature scaling before training',
        usage:
          'Standardisation subtracts the mean and divides by the standard deviation so every feature has comparable scale. Gradient descent converges far faster on standardised features, and distance-based methods such as k-nearest neighbours are meaningless without it.',
      },
      {
        context: 'Reporting cross-validation results',
        usage:
          'A model scoring 0.82 plus or minus 0.01 across folds and one scoring 0.82 plus or minus 0.09 are not equally trustworthy. The standard deviation across folds is what tells you whether a difference between two models is worth acting on.',
      },
      {
        context: 'Monitoring for data drift',
        usage:
          'Production monitoring alerts when a feature\'s mean or standard deviation departs from its training-time value. A sudden collapse in variance often means an upstream field has started returning a constant, which no accuracy metric would catch immediately.',
      },
      {
        context: 'Outlier screening in data cleaning',
        usage:
          'The 1.5 x IQR rule is the default in every boxplot implementation, and it is preferred over a z-score rule precisely because the outliers themselves cannot inflate the quartiles the way they inflate a standard deviation.',
      },
    ],

    projectConnections: [
      { tool: 'NumPy', role: '`np.std` and `np.var` take `ddof`; the default of 0 is the population form and is a common source of mismatch with pandas.' },
      { tool: 'pandas', role: '`Series.std()` uses `ddof=1` by default, and `describe()` reports it alongside the quartiles.' },
      { tool: 'scikit-learn', role: '`StandardScaler` stores the training mean and standard deviation and applies them to test data, which is why it must be fitted on the training split only.' },
    ],

    commonMistakes: [
      {
        mistake: 'Mixing NumPy and pandas defaults for ddof',
        why: 'NumPy uses ddof=0 and pandas uses ddof=1, so the same column reports two different standard deviations depending on which library computed it. On small samples the gap is large.',
        fix: 'Pass `ddof` explicitly everywhere it matters and state in the code comment whether the data are a sample or a population.',
      },
      {
        mistake: 'Explaining n minus 1 as "because the sample is smaller"',
        why: 'That is not a reason, and it gives no way to predict when the correction matters. The actual reason is that the sample mean minimises the squared deviations for that sample, so measured spread is systematically too small.',
        fix: 'Remember the one-line version: you spent one degree of freedom estimating the mean from the same data, so only n minus 1 independent deviations remain.',
      },
      {
        mistake: 'Reporting a standard deviation for heavily skewed data',
        why: 'With a long tail, the mean is not the centre and the standard deviation is inflated by the tail, so "mean plus or minus sd" can cover impossible values such as negative durations.',
        fix: 'Report the median with the IQR, or quote percentiles directly. If you must use a standard deviation, consider transforming the variable first, for example with a log.',
      },
      {
        mistake: 'Using the range as a spread measure on large samples',
        why: 'The range depends on exactly two observations and grows as the sample grows, so it is not comparable between datasets of different sizes and is maximally sensitive to corruption.',
        fix: 'Use the IQR or the standard deviation. The range is fine as a quick sanity check on plausible bounds, not as a summary.',
      },
      {
        mistake: 'Computing scaling statistics on the full dataset before splitting',
        why: 'Fitting a StandardScaler on all the data lets the test set\'s mean and variance leak into training, inflating your measured performance in a way that will not survive deployment.',
        fix: 'Fit the scaler on the training split only and transform the validation and test splits with those stored statistics. A scikit-learn `Pipeline` enforces this automatically inside cross-validation.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why does sample variance divide by n minus 1 instead of n?',
        answer:
          'Because the deviations are measured from the sample mean rather than the true population mean, and the sample mean is by construction the value that makes the sum of squared deviations as small as possible for that particular sample. So the measured spread is systematically too small, and it turns out the expected value of the sum of squared deviations is exactly (n - 1) sigma squared rather than n sigma squared. Dividing by n - 1 therefore makes the estimator unbiased: its expectation equals the true variance. The degrees-of-freedom framing is the same statement — after the mean is fixed, the deviations are constrained to sum to zero, so only n - 1 of them can vary freely. The correction matters enormously for small samples, where (n-1)/n is 0.5 at n = 2, and is negligible by n = 1000. Worth noting that s itself is still slightly biased for sigma, because the square root is concave; only s squared is unbiased.',
        followUp:
          'A strong answer mentions that it is a bias correction rather than a variance reduction, and that you would not apply it when you genuinely have the whole population — for example, when summarising the variance of a fixed set of model weights.',
      },
      {
        level: 'intermediate',
        question: 'When would you prefer the interquartile range over the standard deviation?',
        answer:
          'Whenever the data are skewed or contaminated, and whenever the summary is going into an exploratory analysis rather than into further algebra. The standard deviation uses every observation and has a breakdown point of zero, so a single corrupted reading can inflate it arbitrarily — in a small example, replacing one value with 100 multiplied the standard deviation by sixteen and the IQR by one and a quarter. The IQR also pairs correctly with the median, so a median-plus-IQR summary is internally consistent in a way that median-plus-standard-deviation is not. The costs are real though: the IQR discards half the data, has no clean additive algebra, and does not support z-scores or the 68-95-99.7 rule. In practice I report both during data screening, because a large gap between them is itself the signal that the data contain outliers or heavy tails.',
      },
      {
        level: 'ml-engineer',
        question: 'You standardise features before training. What exactly do you compute, on which data, and what breaks if you get it wrong?',
        answer:
          'For each feature you compute the mean and standard deviation on the training split only, then transform every split by subtracting that stored mean and dividing by that stored standard deviation. The stored statistics must travel with the model to inference time, because production data must be transformed identically. If you instead fit the scaler on the full dataset before splitting, the test set\'s distribution leaks into the transformation and your held-out score is optimistically biased — usually mildly, but severely when the dataset is small or when a feature has heavy tails. If you refit the scaler at inference time on the incoming batch, you get a different and subtler failure: the same raw value maps to different scaled values depending on what else arrived in the batch, so predictions become batch-dependent and unreproducible. The clean implementation is a scikit-learn `Pipeline` containing the scaler and the estimator, which guarantees the fit happens inside each cross-validation fold and that the serialised artefact carries the statistics with it.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute the sample variance and sample standard deviation of 10, 12, 14, 16, 18 by hand, showing the sum of squares. Then state what the population variance would be if these were the whole population.',
        hint: 'The mean is a whole number, which keeps the deviations tidy.',
        solution:
          'Mean = (10 + 12 + 14 + 16 + 18)/5 = 70/5 = 14.\n\nDeviations: -4, -2, 0, 2, 4. They sum to zero, as they always must.\nSquared deviations: 16, 4, 0, 4, 16. Sum of squares = 40.\n\nSample variance: s^2 = 40/(5 - 1) = 10. Sample standard deviation: s = sqrt(10) ≈ 3.162.\n\nPopulation variance: sigma^2 = 40/5 = 8, so sigma = sqrt(8) ≈ 2.828.\n\nThe sample figure is 25% larger than the population figure, which is the (n-1)/n correction at n = 5. At n = 100 the same correction would be about 1%.',
      },
      {
        prompt:
          'A dataset has Q1 = 20, Q3 = 32. Compute the IQR and the Tukey fences, and decide whether the values 2 and 49 are outliers.',
        hint: 'The fences sit 1.5 interquartile ranges beyond each quartile.',
        solution:
          'IQR = 32 - 20 = 12.\n\nLower fence: Q1 - 1.5(12) = 20 - 18 = 2.\nUpper fence: Q3 + 1.5(12) = 32 + 18 = 50.\n\nThe value 2 sits exactly on the lower fence, so by the standard convention it is not flagged — the rule is strictly beyond the fence. The value 49 is below the upper fence of 50, so it is also not an outlier, despite being noticeably far from the centre.\n\nThe lesson is that 1.5 is a convention, not a law. On normally distributed data it flags roughly 0.7% of observations, so in a dataset of 100,000 rows you should expect around 700 "outliers" that are perfectly ordinary. Always ask whether a flagged point is wrong or merely unusual before deleting anything.',
      },
      {
        prompt:
          'Write code that demonstrates empirically that dividing by n underestimates the population variance, using many small samples from a known distribution.',
        hint: 'Draw many samples of a small size, compute both estimators for each, and average them across samples.',
        language: 'python',
        starterCode:
          'import numpy as np\n\nrng = np.random.default_rng(0)\ntrue_sigma = 5.0\nn = 4\ntrials = 100_000\n',
        solution:
          'import numpy as np\nrng = np.random.default_rng(0)\ntrue_sigma, n, trials = 5.0, 4, 100_000\nsamples = rng.normal(0, true_sigma, size=(trials, n))\nprint("true var      :", true_sigma ** 2)\nprint("mean of /n    :", samples.var(axis=1, ddof=0).mean())\nprint("mean of /(n-1):", samples.var(axis=1, ddof=1).mean())\n\nThe true variance is 25. The ddof=0 estimator averages about 18.75 and the ddof=1 estimator about 25.0.\n\nThe ratio 18.75/25 = 0.75 is exactly (n-1)/n = 3/4, as predicted. Note that this is a statement about the average over many samples: any individual sample can give an estimate that is too high or too low with either divisor. Bessel\'s correction removes the systematic tendency, not the noise.',
      },
    ],

    quiz: [
      {
        id: 'STAT-008-q1',
        type: 'numeric',
        concept: 'sample variance',
        prompt: 'What is the sample variance of 2, 4, 6? Give a number.',
        answer: 4,
        tolerance: 0.05,
        explanation:
          'The mean is 4, the deviations are -2, 0, 2, and the sum of squares is 8. Dividing by n - 1 = 2 gives 4. Dividing by n would have given 2.67, which is the population form.',
      },
      {
        id: 'STAT-008-q2',
        type: 'mcq',
        concept: 'bessel correction',
        prompt: 'Why does sample variance divide by n - 1?',
        options: [
          'Because deviations are measured from the sample mean, which makes them systematically too small',
          'Because samples are always smaller than populations',
          'To make the standard deviation an integer more often',
          'To compensate for outliers in the sample',
        ],
        answerIndex: 0,
        explanation:
          'The sample mean is the value minimising the sum of squared deviations for that sample, so the measured spread underestimates the true spread by a factor of (n-1)/n on average. Dividing by n - 1 removes that bias exactly.',
      },
      {
        id: 'STAT-008-q3',
        type: 'truefalse',
        concept: 'deviations',
        prompt: 'The sum of the deviations from the sample mean is always zero.',
        answer: true,
        explanation:
          'It follows directly from the definition of the mean, and it is exactly why deviations must be squared before averaging: their plain average carries no information about spread whatsoever.',
      },
      {
        id: 'STAT-008-q4',
        type: 'multi',
        concept: 'robustness',
        prompt: 'Which measures of spread are robust to a single extremely large outlier? Select all that apply.',
        options: ['Interquartile range', 'Median absolute deviation', 'Standard deviation', 'Range', 'Variance'],
        answerIndices: [0, 1],
        explanation:
          'The IQR and MAD depend on order statistics near the middle of the data, so a single extreme value cannot move them far. Range, variance and standard deviation all have a breakdown point of zero and can be driven arbitrarily high by one corrupted reading.',
      },
      {
        id: 'STAT-008-q5',
        type: 'code-output',
        language: 'python',
        concept: 'ddof defaults',
        prompt: 'What does this print?',
        code: 'import numpy as np\nd = np.array([1.0, 3.0, 5.0])\nprint(d.var(), d.var(ddof=1))',
        options: ['2.6666666666666665 4.0', '4.0 2.6666666666666665', '2.0 4.0', '4.0 4.0'],
        answerIndex: 0,
        explanation:
          'The mean is 3 and the sum of squares is 4 + 0 + 4 = 8. NumPy\'s default `ddof=0` divides by 3 to give 2.667, while `ddof=1` divides by 2 to give 4.0. Pandas would give 4.0 by default, which is the usual source of confusion.',
      },
      {
        id: 'STAT-008-q6',
        type: 'explain',
        concept: 'choosing a spread measure',
        prompt:
          'You are screening a new dataset and find that one column has a standard deviation of 40,000 and an interquartile range of 12. What do you conclude, and what do you do next?',
        rubric: [
          'Recognises that a huge gap between a non-robust and a robust measure signals extreme values or heavy tails',
          'Notes that the middle half of the data is tightly clustered while something far away is inflating the standard deviation',
          'Proposes a concrete next step such as inspecting the extremes, plotting, or checking for sentinel values',
        ],
        sampleAnswer:
          'The middle 50% of this column spans only 12 units, so the bulk of the data is tightly clustered, yet the standard deviation is over three thousand times that width. Since the standard deviation has a breakdown point of zero and the IQR does not, the only way to reconcile the two is that a small number of observations sit enormously far from the centre. My first move would be to sort and look at the ten largest and ten smallest raw values rather than to plot, because the most likely explanation is not a genuine heavy tail but a sentinel value — 999999, -1, or an epoch timestamp landing in a column of ages. If they turn out to be sentinels or unit errors I would fix them at the source and re-screen. If they are genuine, I would report the median and IQR, consider a log transform before any modelling, and expect a squared-error loss to chase those points hard unless I switch to something more robust.',
        explanation:
          'The examinable skill is using the disagreement between a robust and a non-robust statistic as a diagnostic, and reaching for the raw values rather than immediately deleting anything.',
      },
    ],

    flashcards: [
      { front: 'Why square the deviations?', back: 'Raw deviations from the mean always sum to exactly zero, so they must be made non-negative. Squaring also makes variances additive and keeps the function differentiable.' },
      { front: 'Sample variance formula', back: 's^2 = sum of (x_i - xbar)^2 divided by (n - 1). The square root is the sample standard deviation.' },
      { front: 'Why n - 1 and not n?', back: 'The sample mean minimises the squared deviations for that sample, so they come out too small. Dividing by n - 1 makes the estimator unbiased.' },
      { front: 'IQR and the Tukey rule', back: 'IQR = Q3 - Q1. A point is flagged as an outlier if it lies beyond Q1 - 1.5 IQR or Q3 + 1.5 IQR.' },
      { front: 'ddof defaults you must remember', back: 'NumPy `var`/`std` default to ddof=0 (population); pandas defaults to ddof=1 (sample). Always pass it explicitly.' },
      { front: 'Robust versus non-robust spread', back: 'IQR and MAD survive outliers; range, variance and standard deviation do not. A large gap between them is a data-quality warning.' },
    ],

    challenge: {
      title: 'Implement and validate your own variance functions',
      brief:
        'Implement three variance functions from scratch without calling a library variance: a naive two-pass version, a single-pass version using E[X^2] minus the square of the mean, and Welford\'s online algorithm. Compare all three against NumPy on ordinary data, then on a dataset shifted by adding 10^9 to every value. Explain in a printed comment which one fails, by how much, and why.',
      language: 'python',
      acceptanceCriteria: [
        'All three implementations accept a ddof argument and agree with NumPy on ordinary data',
        'The catastrophic-cancellation failure of the single-pass form is demonstrated numerically on the shifted data',
        "Welford's algorithm is genuinely online: it processes one value at a time without storing the data",
        'A printed explanation identifies catastrophic cancellation as the cause',
      ],
      starterCode:
        'def var_two_pass(xs, ddof=1):\n    ...\n\ndef var_one_pass(xs, ddof=1):\n    ...\n\ndef var_welford(xs, ddof=1):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach measures of spread to someone who knows what a mean is. Cover why we square, what the standard deviation is for, and give an honest explanation of the n minus 1 question rather than waving at it.',
      mustCover: [
        'Why an average alone is an incomplete description of data',
        'That deviations from the mean sum to zero, which forces the squaring',
        'That the square root exists to restore the original units',
        'A correct account of n minus 1: the mean was estimated from the same data, costing one degree of freedom',
      ],
      bonusSignals: [
        'contrasts the standard deviation with the IQR on robustness',
        'notes when the correction matters and when it is negligible',
        'connects to feature scaling or to reporting cross-validation results',
      ],
      sampleExplanation:
        'An average on its own hides the thing you most need to know. Two model versions can both average ninety percent accuracy while one is always between eighty-nine and ninety-one and the other swings from sixty to a hundred, and those are entirely different products. So you need a second number: how far from the middle do values typically sit? The obvious approach — average the distances from the mean — fails immediately, because the values below the mean give negative distances that cancel the positive ones exactly, every single time, for every dataset. That cancellation is not bad luck; it is the definition of the mean. So you square each distance first, which kills the sign and, as a side effect, makes far-away values count much more heavily. Average those squares and you have the variance. The trouble is that the variance is now in squared units: squared pounds, squared milliseconds, which nobody can interpret or compare with the mean. So you take the square root at the end and call the result the standard deviation, and now you have a number in your original units that reads as "a typical distance from the average". One detail surprises everyone. When you compute a sample variance you divide by one less than the number of observations. The reason is that you did not know the true centre, so you used the mean of this very sample — and that mean is, by construction, the single point that makes the squared distances as small as they could possibly be for this data. Your measured spread is therefore slightly too small, every time, and dividing by n minus one instead of n corrects for it exactly. It makes a big difference on three observations and essentially none on a thousand.',
    },
  },

  {
    id: 'STAT-009',
    domain: 'STAT',
    module: 'Describing Data',
    topic: 'Relationships between variables',
    title: 'Covariance and Correlation',
    slug: 'covariance-and-correlation',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['STAT-008'],
    related: ['STAT-006', 'STAT-008'],
    tags: ['covariance', 'correlation', 'pearson', 'spearman', 'anscombe', 'linear relationship'],

    learningObjectives: [
      'Compute a covariance and explain the sign of each term in the sum',
      'Explain why covariance is unusable as a comparative measure, and how normalising fixes it',
      'State precisely what Pearson r measures and — just as importantly — what it does not',
      'Choose between Pearson and Spearman, and recognise the failure modes Anscombe\'s quartet illustrates',
    ],

    terminology: [
      {
        term: 'Covariance',
        definition:
          'The average product of paired deviations from the two means. Positive when the variables tend to sit on the same side of their means, negative when on opposite sides, zero when there is no linear tendency.',
        simple: 'Do these two move together, and in which direction?',
      },
      {
        term: 'Pearson correlation (r)',
        definition:
          'Covariance divided by the product of the two standard deviations, giving a unit-free number in [-1, 1] that measures the strength of a linear relationship.',
        simple: 'Covariance rescaled so the number always sits between -1 and 1.',
      },
      {
        term: 'Spearman rank correlation',
        definition:
          'Pearson correlation computed on the ranks rather than on the raw values. It measures monotonic association and is robust to outliers and to any monotone transformation.',
        simple: 'Correlation of the orderings, not the numbers.',
      },
      {
        term: 'Coefficient of determination (r squared)',
        definition:
          'The square of Pearson r, interpretable as the proportion of variance in one variable that is linearly explained by the other.',
        simple: 'How much of the wobble in one variable the other accounts for.',
      },
      {
        term: "Anscombe's quartet",
        definition:
          'Four datasets constructed by Francis Anscombe in 1973 with nearly identical means, variances, correlations and regression lines, but completely different shapes. The standing argument for plotting your data.',
        simple: 'Four very different pictures that all produce the same summary numbers.',
      },
      {
        term: 'Confounder',
        definition:
          'A third variable that influences both of two correlated variables, producing an association that disappears when the confounder is held fixed.',
        simple: 'A hidden common cause making two unrelated things move together.',
      },
    ],

    simpleExplanation:
      'Sometimes two measurements move together. Taller people tend to be heavier; more training data tends to mean lower error. You would like one number that captures that tendency. The natural construction is this: for each data point, ask whether it is above or below average on the first variable, and whether it is above or below average on the second, and multiply those two answers together. When a point is above average on both, the product is positive. When it is below on both, two negatives also give a positive. Only when a point is high on one and low on the other do you get a negative. Average those products and you have covariance, whose sign tells you the direction of the relationship. Unfortunately its size tells you almost nothing, because it depends entirely on your units: measure height in millimetres rather than metres and the covariance multiplies by a thousand without the relationship changing at all. The fix is to divide by both standard deviations, which cancels the units and forces the answer between -1 and 1. That rescaled number is the correlation, and it is one of the most useful and most abused statistics in existence.',

    whyItExists:
      'Every model of the form "y depends on x" presumes some relationship between them, and you need a way to measure it before you fit anything. Covariance answers the direction question but is unusable across variables because of its units; correlation exists to make that measure comparable between any two pairs of quantities whatsoever.',

    analogy: {
      scenario:
        'Imagine you and a friend rating the same fifty films out of ten. Rather than comparing raw scores — you might be generous and they might be harsh — ask for each film whether you were above or below your own average, and whether they were above or below theirs. If you agree on direction most of the time, the products are mostly positive and your tastes are correlated. Now note the problem with summing those products directly: if you rate out of ten and they rate out of a hundred, the total will be ten times bigger, without your tastes being any more aligned. Divide by each of your typical deviations and the scale cancels, leaving a pure measure of agreement.',
      mapping: [
        { from: 'Whether you rated a film above your own average', to: 'The deviation of x from x-bar' },
        { from: 'Whether your friend did the same', to: 'The deviation of y from y-bar' },
        { from: 'Multiplying the two answers per film', to: 'The product of paired deviations' },
        { from: 'Averaging those products', to: 'The covariance' },
        { from: 'Dividing out each person\'s typical deviation', to: 'Normalising by the standard deviations to get r' },
        { from: 'Agreeing on ranking but not on how much', to: 'A high Spearman correlation with a lower Pearson r' },
      ],
      bridge:
        'This is literally the formula: r is the average product of two standardised variables, and a z-score is precisely "how far above or below your own average, in your own units". Because both variables are standardised first, the result cannot exceed 1 in magnitude — that is the Cauchy-Schwarz inequality — and r = 1 means the two z-score sequences are identical, which is another way of saying the points lie exactly on a line of positive slope.',
      limitations:
        'The film analogy suggests agreement is one-dimensional. Pearson r only sees straight-line agreement. If you and your friend agree perfectly on which films are better but disagree wildly about the size of the gaps, Spearman will be 1 and Pearson noticeably less. And if you both love very good and very bad films but hate mediocre ones, you agree strongly in a way Pearson r will score as roughly zero.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'From raw data to a correlation',
        caption: 'Each step removes something that was getting in the way of comparability.',
        steps: [
          { label: 'Centre both variables', detail: 'Subtract each mean, so the question becomes "above or below average?".' },
          { label: 'Multiply the paired deviations', detail: 'Same side gives a positive product; opposite sides give a negative one.' },
          { label: 'Average the products', detail: 'That is the covariance. Its sign is meaningful, its magnitude is not comparable.' },
          { label: 'Divide by both standard deviations', detail: 'Units cancel, and the result is forced into [-1, 1].' },
          { label: 'Interpret, then plot', detail: 'Square it for the variance explained, then look at the scatter plot before believing any of it.' },
        ],
      },
      {
        kind: 'table',
        title: 'What r values look like on a scatter plot',
        caption: 'Rules of thumb only. What counts as "strong" is entirely field-dependent.',
        columns: ['r', 'Appearance', 'r squared', 'Reading'],
        rows: [
          ['+1.0', 'A perfect straight line sloping up', '1.00', 'Exact linear relationship'],
          ['+0.8', 'A clear upward cloud', '0.64', '64% of variance linearly explained'],
          ['+0.5', 'An upward tendency, plenty of scatter', '0.25', 'Real but weak'],
          ['0.0', 'A shapeless blob, or a symmetric curve', '0.00', 'No *linear* relationship — possibly a strong non-linear one'],
          ['-0.7', 'A clear downward cloud', '0.49', 'Strong inverse relationship'],
        ],
      },
      {
        kind: 'compare',
        title: 'Pearson versus Spearman',
        caption: 'Compute both. A large gap between them tells you something specific about your data.',
        left: {
          heading: 'Pearson r',
          points: [
            'Measures linear association on the raw values',
            'Sensitive to outliers — one point can dominate',
            'Changes under non-linear transformations such as log',
            'r squared has a clean variance-explained interpretation',
            'Assumes an interval scale and roughly elliptical data',
          ],
        },
        right: {
          heading: 'Spearman rho',
          points: [
            'Measures any monotonic association, via the ranks',
            'Robust: an extreme value becomes just "the largest rank"',
            'Invariant under any monotone transformation',
            'Detects curved-but-monotonic relationships Pearson understates',
            'Works on ordinal data where Pearson is not defined',
          ],
        },
      },
      {
        kind: 'ascii',
        title: "Anscombe's quartet: four datasets, one set of statistics",
        caption: 'All four have mean x = 9, mean y = 7.50, and r = 0.816, with the same fitted line y = 3 + 0.5x.',
        art: `   I: honest linear      II: a clean parabola
     y                        y
     |      . .               |     . . . .
     |    .   .  .            |   .         .
     |  .  .                  | .             .
     +--------------- x       +--------------- x

  III: linear + 1 outlier   IV: one point creates it all
     y            .          y                      .
     |          .            |
     |     . . .             |  ::::
     |  . .                  |  ::::
     +--------------- x      +--------------- x`,
      },
      {
        kind: 'widget',
        title: 'Generate correlated data and watch r respond',
        caption: 'Vary the strength of the relationship and the amount of noise, then add a single extreme point and see how far Pearson r moves compared with Spearman.',
        widget: 'distribution-explorer',
      },
    ],

    formalDefinition:
      'The sample covariance of paired observations is the sum over i of (x_i - x-bar)(y_i - y-bar) divided by n - 1. The Pearson product-moment correlation coefficient is that covariance divided by the product of the two sample standard deviations, equivalently the average product of the standardised variables, and by the Cauchy-Schwarz inequality it lies in [-1, 1] with the endpoints attained exactly when the points are collinear. Spearman rho is the Pearson correlation applied to the rank-transformed data. Zero correlation implies independence only under joint normality; in general independence implies zero correlation but not the converse.',

    math: {
      intuition:
        'Covariance is the average of paired deviation products, so it is positive when the two variables tend to sit on the same side of their respective means. Its problem is dimensional: it carries the units of both variables multiplied together, so its magnitude is meaningless in isolation. Correlation fixes this by standardising both variables first, which is why r is a pure number bounded by 1. The bound is not a convention — it is the Cauchy-Schwarz inequality, and equality holds exactly when one variable is an exact linear function of the other.',
      formulas: [
        {
          latex: '\\operatorname{Cov}(X, Y) = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})',
          name: 'Sample covariance',
          meaning:
            'The average product of paired deviations. Positive terms come from points on the same side of both means; negative terms from points on opposite sides.',
          variables: [
            { symbol: 'x_i, y_i', meaning: 'the i-th paired observation' },
            { symbol: '\\bar{x}, \\bar{y}', meaning: 'the two sample means' },
            { symbol: 'n-1', meaning: "Bessel's correction, for the same reason as in the sample variance" },
            { symbol: '(x_i - \\bar{x})(y_i - \\bar{y})', meaning: 'one point\'s contribution; its sign says whether that point supports a positive or negative relationship' },
          ],
          category: 'statistics',
        },
        {
          latex: 'r = \\frac{\\operatorname{Cov}(X, Y)}{s_X s_Y} = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2}\\sqrt{\\sum (y_i - \\bar{y})^2}}',
          name: 'Pearson correlation coefficient',
          meaning:
            'Covariance normalised by both standard deviations. The units cancel, leaving a pure number between -1 and 1 measuring linear association.',
          variables: [
            { symbol: 'r', meaning: 'the sample correlation coefficient, in [-1, 1]' },
            { symbol: 's_X, s_Y', meaning: 'the sample standard deviations of the two variables' },
            { symbol: '\\operatorname{Cov}(X,Y)', meaning: 'the covariance, which carries the units of X times the units of Y' },
          ],
          category: 'statistics',
        },
        {
          latex: 'r = \\frac{1}{n-1}\\sum_{i=1}^{n} z_{x_i} z_{y_i}, \\qquad z_{x_i} = \\frac{x_i - \\bar{x}}{s_X}',
          name: 'Correlation as the average product of z-scores',
          meaning:
            'Standardise both variables, then average the products. This is the same formula rearranged, and it is the clearest statement of what r actually is.',
          variables: [
            { symbol: 'z_{x_i}', meaning: 'the standardised value of x_i — how many standard deviations above or below its mean' },
            { symbol: 'z_{y_i}', meaning: 'the same for y_i' },
          ],
          category: 'statistics',
        },
        {
          latex: 'r^2 = \\text{proportion of variance in } Y \\text{ linearly explained by } X',
          name: 'Coefficient of determination',
          meaning:
            'Squaring r gives the share of one variable\'s variance that a straight-line fit on the other accounts for. An r of 0.5 explains only a quarter of the variance.',
          variables: [
            { symbol: 'r^2', meaning: 'a number in [0, 1]; also the R-squared of a simple linear regression of Y on X' },
          ],
          category: 'regression',
        },
        {
          latex: '\\operatorname{Var}(X + Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) + 2\\operatorname{Cov}(X, Y)',
          name: 'Variance of a sum',
          meaning:
            'The general rule that the previous unit deferred. Variances add only when the covariance is zero, which is why correlated model errors limit the benefit of ensembling.',
          variables: [
            { symbol: '2\\operatorname{Cov}(X,Y)', meaning: 'the cross term; positive covariance inflates the variance of the sum, negative covariance suppresses it' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\rho_s = r_{\\text{Pearson}}\\bigl(\\operatorname{rank}(x), \\operatorname{rank}(y)\\bigr)',
          name: 'Spearman rank correlation',
          meaning:
            'Replace each value by its position in the sorted order, then compute Pearson on those ranks. Monotone relationships become linear, and outliers become ordinary ranks.',
          variables: [
            { symbol: '\\rho_s', meaning: 'the Spearman coefficient, also in [-1, 1]' },
            { symbol: '\\operatorname{rank}(x)', meaning: 'the rank of each observation, with ties given their average rank' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Why is r bounded by 1? Write it as the average product of the two standardised variables, z_x and z_y.',
        'Consider the quantity E[(z_x - z_y)^2], which is an average of squares and therefore cannot be negative.',
        'Expand it: E[z_x^2] - 2E[z_x z_y] + E[z_y^2].',
        'Standardised variables have variance 1 and mean 0, so E[z_x^2] = E[z_y^2] = 1, and E[z_x z_y] is exactly r.',
        'So the expression equals 2 - 2r, and requiring it to be non-negative forces r to be at most 1.',
        'Repeating the argument with E[(z_x + z_y)^2] gives 2 + 2r >= 0, so r is at least -1.',
        'Equality at r = 1 requires E[(z_x - z_y)^2] = 0, meaning z_x equals z_y for every point — the standardised variables are identical, so the raw points lie exactly on a straight line.',
      ],
    },

    workedExample: {
      title: 'Five points, by hand, and what the 0.775 does not tell you',
      setup:
        'Five paired observations: x = 1, 2, 3, 4, 5 and y = 2, 4, 5, 4, 5. Perhaps x is the number of training epochs and y a validation score. Compute the covariance and the Pearson correlation entirely by hand, then interpret both carefully.',
      steps: [
        {
          label: 'Compute both means',
          detail: 'These are the reference points against which every deviation is measured.',
          latex: '\\bar{x} = \\tfrac{15}{5} = 3, \\qquad \\bar{y} = \\tfrac{20}{5} = 4',
        },
        {
          label: 'Compute the deviations',
          detail: 'Each sums to zero, as deviations always do — a free arithmetic check before you go further.',
          latex: 'd_x: -2, -1, 0, 1, 2 \\qquad d_y: -2, 0, 1, 0, 1',
        },
        {
          label: 'Multiply them pairwise',
          detail:
            'The first point is below average on both, so its product is positive. The third and fifth points contribute 0 and 2. No point contributes a negative here, which already signals a positive relationship.',
          latex: '4,\; 0,\; 0,\; 0,\; 2 \;\\longrightarrow\; \\textstyle\\sum = 6',
        },
        {
          label: 'Covariance',
          detail: 'Divide the sum of products by n - 1 = 4.',
          latex: '\\operatorname{Cov}(X, Y) = \\tfrac{6}{4} = 1.5',
        },
        {
          label: 'Sums of squared deviations',
          detail: 'Needed for the two standard deviations in the denominator.',
          latex: '\\textstyle\\sum d_x^2 = 4+1+0+1+4 = 10, \\qquad \\sum d_y^2 = 4+0+1+0+1 = 6',
        },
        {
          label: 'The two standard deviations',
          detail: 'Divide each sum of squares by n - 1 and take the square root.',
          latex: 's_X = \\sqrt{\\tfrac{10}{4}} \\approx 1.5811, \\qquad s_Y = \\sqrt{\\tfrac{6}{4}} \\approx 1.2247',
        },
        {
          label: 'Pearson r',
          detail: 'Divide the covariance by the product of the standard deviations. Equivalently, 6 over the square root of 10 times 6.',
          latex: 'r = \\frac{1.5}{1.5811 \\times 1.2247} = \\frac{6}{\\sqrt{60}} \\approx 0.7746',
        },
        {
          label: 'Interpret honestly',
          detail:
            'r squared is 0.60, so a straight line accounts for 60% of the variation in y and 40% remains unexplained. With only five points this estimate is extremely noisy; the 95% confidence interval for r here runs roughly from -0.24 to 0.99.',
          latex: 'r^2 = 0.7746^2 = 0.60',
        },
        {
          label: 'Check the unit-dependence of covariance',
          detail:
            'Express y as a percentage instead, multiplying it by 100. The covariance becomes 150, a hundred times larger, while r is unchanged at 0.7746. That is exactly the problem normalisation solves.',
          latex: '\\operatorname{Cov} \\to 150, \\qquad r \\to 0.7746',
        },
      ],
      conclusion:
        'Cov = 1.5, r = 0.775, r squared = 0.60. The covariance told us the direction and then changed by a factor of a hundred when we changed units; the correlation told us the direction and the strength and did not budge. But note what neither number revealed: y rose from 2 to 5 and then flattened and dipped. A single statistic cannot show that, which is precisely Anscombe\'s point and the reason the next step is always a scatter plot.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Covariance depends on units; correlation does not',
        runnable: true,
        code: `import numpy as np

height_m = np.array([1.60, 1.65, 1.70, 1.75, 1.80, 1.85])
weight_kg = np.array([55, 60, 68, 70, 78, 85])

height_mm = height_m * 1000
weight_g = weight_kg * 1000

print("cov (m,  kg):", round(np.cov(height_m, weight_kg)[0, 1], 4))
print("cov (mm, g) :", round(np.cov(height_mm, weight_g)[0, 1], 4))
print()
print("r   (m,  kg):", round(np.corrcoef(height_m, weight_kg)[0, 1], 6))
print("r   (mm, g) :", round(np.corrcoef(height_mm, weight_g)[0, 1], 6))`,
        output: `cov (m,  kg): 0.8770
cov (mm, g) : 877000.0

r   (m,  kg): 0.992223
r   (mm, g) : 0.992223`,
        explanation:
          'Changing from metres and kilograms to millimetres and grams multiplies the covariance by a million while the underlying relationship is untouched. This is why you can never compare covariances across variable pairs, and why a covariance of 877,000 tells you nothing about strength. The correlation is identical to six decimal places, because both standard deviations scale by the same factors and cancel exactly.',
      },
      {
        language: 'python',
        title: "Anscombe's quartet: identical statistics, four different stories",
        runnable: true,
        code: `import numpy as np

x1 = np.array([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], dtype=float)
x4 = np.array([8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8], dtype=float)

y1 = np.array([8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68])
y2 = np.array([9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74])
y3 = np.array([7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73])
y4 = np.array([6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89])

for name, x, y in [("I  linear ", x1, y1), ("II curve  ", x1, y2),
                   ("III outlier", x1, y3), ("IV leverage", x4, y4)]:
    r = np.corrcoef(x, y)[0, 1]
    slope, intercept = np.polyfit(x, y, 1)
    print(f"{name}: mean_y={y.mean():.2f}  sd_y={y.std(ddof=1):.3f}  "
          f"r={r:.3f}  line: y = {intercept:.2f} + {slope:.2f}x")`,
        output: `I  linear : mean_y=7.50  sd_y=2.032  r=0.816  line: y = 3.00 + 0.50x
II curve  : mean_y=7.50  sd_y=2.032  r=0.816  line: y = 3.00 + 0.50x
III outlier: mean_y=7.50  sd_y=2.030  r=0.816  line: y = 3.00 + 0.50x
IV leverage: mean_y=7.50  sd_y=2.031  r=0.817  line: y = 3.00 + 0.50x`,
        explanation:
          'Four datasets, identical means, identical standard deviations, identical correlations and identical fitted lines — and four completely different shapes. Dataset II is a clean parabola where a linear fit is simply the wrong model. Dataset III is perfectly linear except for one outlier that has tilted the line. Dataset IV has ten points at a single x value and one distant point that single-handedly determines both the slope and the correlation. Anscombe published this in 1973 to make one argument, and it remains the argument: plot your data before you summarise it.',
      },
      {
        language: 'python',
        title: 'When Pearson fails and Spearman does not',
        runnable: true,
        code: `import numpy as np
from scipy import stats

rng = np.random.default_rng(0)
x = np.linspace(1, 20, 60)

cases = {
    "linear     ": 2 * x + rng.normal(0, 2, 60),
    "exponential": np.exp(x / 4) + rng.normal(0, 2, 60),
    "U-shaped   ": (x - 10.5) ** 2 + rng.normal(0, 2, 60),
}

for name, y in cases.items():
    p = stats.pearsonr(x, y).statistic
    s = stats.spearmanr(x, y).statistic
    print(f"{name}: pearson={p:+.3f}  spearman={s:+.3f}")`,
        output: `linear     : pearson=+0.995  spearman=+0.994
exponential: pearson=+0.795  spearman=+1.000
U-shaped   : pearson=-0.011  spearman=-0.013`,
        explanation:
          'Three lessons in one table. On a linear relationship the two agree. On an exponential one, Pearson reports 0.80 because the relationship is not a straight line, while Spearman reports a perfect 1.00 because the ordering is perfectly preserved — a large gap between the two is the signature of a monotone but curved relationship. On the U-shape both report essentially zero, and both are misleading: the relationship is deterministic and extremely strong, but it is neither linear nor monotonic. No correlation coefficient will ever find it, which is the strongest possible argument for plotting.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature selection and multicollinearity',
        usage:
          'A correlation heatmap over features is the standard first pass in a modelling project. Pairs correlated above about 0.9 destabilise linear model coefficients — the fit cannot tell which of the two deserves the credit — so one is usually dropped or the pair is combined.',
      },
      {
        context: 'Ensemble design',
        usage:
          'The variance of an average falls only to the extent that members are uncorrelated. Measuring the correlation between model errors tells you whether adding another model will help, and is why random forests deliberately decorrelate trees by sampling features.',
      },
      {
        context: 'Ranking evaluation',
        usage:
          'Recommender and search systems are scored with rank correlations such as Spearman or Kendall tau, because what matters is whether the ordering matches, not whether the predicted scores match numerically.',
      },
      {
        context: 'Data leakage detection',
        usage:
          'A feature correlating suspiciously highly with the target — above 0.95 on a problem that should be hard — is almost always leakage: a column derived from the label, or one recorded after the outcome was known. The correlation check is the cheapest leakage detector there is.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.corr()` computes the full correlation matrix and takes `method="spearman"` or `"kendall"`.' },
      { tool: 'SciPy', role: '`stats.pearsonr` and `stats.spearmanr` return the coefficient together with a p-value for the null of no association.' },
      { tool: 'seaborn', role: '`heatmap` for the correlation matrix and `pairplot` for the scatter plots you must look at before trusting it.' },
      { tool: 'scikit-learn', role: 'PCA operates directly on the covariance or correlation matrix; whether you standardise first determines which one.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reading correlation as causation',
        why: 'A correlation is consistent with x causing y, y causing x, a confounder causing both, selection effects, or coincidence. Nothing in the arithmetic distinguishes these.',
        fix: 'Ask what a confounder would have to be, and whether the proposed cause precedes the effect. If you need a causal claim, randomise — which is exactly what an A/B test does.',
      },
      {
        mistake: 'Concluding "no relationship" from r near zero',
        why: 'Pearson r measures only linear association. A perfect U-shaped or circular relationship gives r near 0, and so does a strong relationship confined to part of the range.',
        fix: 'Always plot the scatter. Also compute Spearman, which will catch a monotone-but-curved relationship that Pearson understates.',
      },
      {
        mistake: 'Comparing covariances between different variable pairs',
        why: 'Covariance carries the product of both variables\' units, so a covariance of 877,000 versus 0.88 may describe the identical relationship measured in different units.',
        fix: 'Normalise to a correlation before any comparison. Keep covariance for algebra, such as the variance of a sum or the input to PCA.',
      },
      {
        mistake: 'Treating r = 0.5 as "half the relationship"',
        why: 'The variance-explained interpretation belongs to r squared, not r. An r of 0.5 explains 25% of the variance, leaving three quarters unaccounted for.',
        fix: 'Square it before interpreting strength, and report r squared when talking to non-specialists, since it is on a scale people read correctly.',
      },
      {
        mistake: 'Ignoring how a restricted range deflates r',
        why: 'Correlation depends on the spread of x. Studying only high performers, or only requests under 100 ms, truncates the range and can drive a strong relationship close to zero.',
        fix: 'Check the range of both variables against the population you want to generalise to, and be suspicious of a weak correlation computed on a filtered subset.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does a Pearson correlation of 0.8 tell you, and what does it not?',
        answer:
          'It tells you there is a strong positive linear association: as one variable rises the other tends to rise, and a straight-line fit accounts for r squared = 0.64, so 64% of the variance in one variable. It does not tell you the slope — r is unit-free, so a correlation of 0.8 is consistent with any gradient at all — and it says nothing about causation, since a confounder or reverse causation would produce the same number. It also cannot tell you the shape: a curved relationship, a cluster of ordinary points plus one high-leverage outlier, and a genuinely linear cloud can all give 0.8, which is exactly what Anscombe\'s quartet was constructed to demonstrate. And with a small sample it may not be distinguishable from zero at all; r = 0.8 on five points has a confidence interval spanning most of the range. The correct response to any correlation is to plot the scatter before interpreting it.',
        followUp:
          'A strong answer volunteers r squared without being asked and mentions range restriction, which is the failure mode most candidates miss.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you use Spearman instead of Pearson?',
        answer:
          'When the relationship is monotone but not linear, when the data contain outliers, when the variables are ordinal rather than interval-scaled, or when you care about ordering rather than magnitude. Spearman is Pearson computed on ranks, which makes it invariant to any monotone transformation — so log-transforming a feature changes Pearson but leaves Spearman untouched — and robust, because an extreme value simply becomes the largest rank rather than a huge deviation. A practical habit is to compute both and compare: if Spearman is much higher than Pearson, you have a monotone but curved relationship, which is a hint that a transformation or a non-linear model would help. If Pearson is much higher, an outlier is probably inflating it. The trade-off is that Spearman discards magnitude information and has no clean variance-explained interpretation, so I would still report Pearson r squared when the relationship really is linear.',
      },
      {
        level: 'advanced',
        question: 'Two features each correlate 0.85 with the target. Should you include both in a linear model?',
        answer:
          'It depends entirely on how they correlate with each other, which the question has not told me. If they are nearly uncorrelated they may carry complementary information and including both can substantially improve the fit. If they correlate highly with each other — say above 0.9 — you have multicollinearity: the design matrix is close to rank-deficient, so the coefficient estimates become unstable with large standard errors, their signs can flip with small changes in the data, and individual coefficients become uninterpretable even though the predictions remain fine. I would check the correlation between the features and the variance inflation factors, and then either drop one, combine them into a single feature, or apply ridge regularisation, which shrinks correlated coefficients towards each other and stabilises the fit. It is worth being precise that multicollinearity harms interpretation and coefficient stability rather than predictive accuracy, so if the model is purely for prediction and a tree ensemble is being used, it matters much less. I would also check whether the near-duplication indicates leakage or an accidentally duplicated column.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute the covariance and Pearson correlation of x = 2, 4, 6, 8 and y = 1, 3, 2, 4 by hand.',
        hint: 'Find both means, then the paired deviations, then the three sums you need.',
        solution:
          'Means: x-bar = 20/4 = 5, y-bar = 10/4 = 2.5.\n\nDeviations in x: -3, -1, 1, 3. Deviations in y: -1.5, 0.5, -0.5, 1.5.\n\nProducts: 4.5, -0.5, -0.5, 4.5. Sum = 8. Note the two middle points contribute negatively, because each is above average on one variable and below on the other.\n\nCovariance = 8/(4 - 1) = 2.667.\n\nSum of squared x deviations: 9 + 1 + 1 + 9 = 20. Sum of squared y deviations: 2.25 + 0.25 + 0.25 + 2.25 = 5.\n\nr = 8 / sqrt(20 x 5) = 8/10 = 0.8. So r squared = 0.64: a straight line explains 64% of the variance in y.',
      },
      {
        prompt:
          'A study finds a correlation of 0.72 between the number of Stack Overflow answers a developer writes and their salary. Give three distinct explanations that do not involve answering questions causing higher pay.',
        hint: 'Think about reverse causation, confounders, and how the sample was assembled.',
        solution:
          'Three families of explanation:\n\n1. Reverse causation. Higher-paid developers tend to hold senior roles with more autonomy and slack time, so the salary enables the answering rather than the other way round.\n\n2. A confounder. Years of experience plausibly drives both: experienced developers know more, so they answer more, and they are also paid more. Conditioning on experience might make the association vanish entirely, exactly as ice cream and drowning become independent given temperature.\n\n3. Selection effects. If the sample came from a developer survey, the people who answer voluntary surveys are also the people who answer questions publicly, and they may not resemble the wider population. A correlation measured on a self-selected subgroup can appear from nothing.\n\nOne could add measurement artefacts: if "answers written" is scraped only for accounts linked to a public profile, and linking a profile is itself commoner among the well paid, the association is manufactured by the data collection. Distinguishing these requires either randomisation or careful causal modelling; the correlation alone cannot.',
      },
      {
        prompt:
          'Construct a dataset with a strong deterministic relationship and a Pearson correlation near zero, then show that a suitable transformation reveals it.',
        hint: 'A symmetric non-monotone function of x will do it; try squaring a variable centred at zero.',
        language: 'python',
        starterCode: 'import numpy as np\nfrom scipy import stats\n\nx = np.linspace(-5, 5, 101)\n',
        solution:
          'import numpy as np\nfrom scipy import stats\n\nx = np.linspace(-5, 5, 101)\ny = x ** 2                      # y is a perfect function of x\n\nprint(stats.pearsonr(x, y).statistic)      # ≈ 0.0\nprint(stats.spearmanr(x, y).statistic)     # ≈ 0.0\nprint(stats.pearsonr(np.abs(x), y).statistic)  # 1.0 after transforming\n\nBoth Pearson and Spearman report essentially zero, even though y is completely determined by x with no noise at all. The reason is symmetry: for every point on the left contributing a negative deviation product, there is a mirrored point on the right contributing an equal positive one, and they cancel exactly. Spearman fails too, because the relationship is not monotonic.\n\nReplacing x with |x| makes the relationship monotone and in fact linear in the transformed variable, and the correlation jumps to 1.0. The general lesson: a correlation near zero rules out a linear relationship and nothing else, and plotting would have revealed the parabola in one second.',
      },
    ],

    quiz: [
      {
        id: 'STAT-009-q1',
        type: 'numeric',
        concept: 'r squared',
        prompt: 'A correlation of r = 0.6 explains what proportion of the variance? Give a decimal.',
        answer: 0.36,
        tolerance: 0.01,
        explanation:
          'The variance-explained interpretation belongs to r squared, which is 0.36. Reading r itself as a proportion overstates the relationship substantially: 0.6 sounds like most of it and is in fact barely a third.',
      },
      {
        id: 'STAT-009-q2',
        type: 'truefalse',
        concept: 'linearity',
        prompt: 'A Pearson correlation of 0 means the two variables are unrelated.',
        answer: false,
        explanation:
          'It means there is no *linear* relationship. A perfect parabola y = x squared on symmetric data gives r = 0 while y is completely determined by x. Plot before concluding anything from a near-zero r.',
      },
      {
        id: 'STAT-009-q3',
        type: 'mcq',
        concept: 'covariance units',
        prompt: 'Why is correlation usually reported instead of covariance?',
        options: [
          'Covariance carries the units of both variables, so its magnitude is not comparable across pairs',
          'Covariance can be negative, and correlation cannot',
          'Covariance is harder to compute',
          'Correlation captures non-linear relationships and covariance does not',
        ],
        answerIndex: 0,
        explanation:
          'Changing height from metres to millimetres multiplies the covariance by a thousand without changing the relationship. Dividing by both standard deviations cancels the units and bounds the result in [-1, 1]. Both can be negative and both see only linear structure.',
      },
      {
        id: 'STAT-009-q4',
        type: 'multi',
        concept: 'interpreting correlation',
        prompt: 'Two variables have r = 0.9. Which conclusions are justified? Select all that apply.',
        options: [
          'A straight line accounts for 81% of the variance in one from the other',
          'They have a strong positive linear association',
          'One variable causes the other',
          'The slope of the relationship is 0.9',
          'A scatter plot is still worth inspecting before trusting this',
        ],
        answerIndices: [0, 1, 4],
        explanation:
          'Correlation is unit-free so it says nothing about the slope, and no correlation of any size establishes causation. Anscombe\'s quartet shows that identical correlations can arise from wildly different shapes, so plotting remains mandatory.',
      },
      {
        id: 'STAT-009-q5',
        type: 'code-output',
        language: 'python',
        concept: 'invariance of correlation',
        prompt: 'What does this print?',
        code: 'import numpy as np\nx = np.array([1., 2., 3., 4.])\ny = np.array([2., 4., 6., 8.])\nprint(round(np.corrcoef(x, y)[0, 1], 2), round(np.corrcoef(x, 100 * y)[0, 1], 2))',
        options: ['1.0 1.0', '1.0 100.0', '0.5 0.5', '1.0 0.01'],
        answerIndex: 0,
        explanation:
          'y is an exact positive linear function of x, so r is exactly 1. Scaling y by 100 scales both the covariance and the standard deviation of y by 100, and they cancel, so r is unchanged. Correlation is invariant to positive linear rescaling of either variable.',
      },
      {
        id: 'STAT-009-q6',
        type: 'explain',
        concept: 'correlation and causation',
        prompt:
          'A dashboard shows that users who enable dark mode have 30% higher retention, a correlation of 0.4. A product manager wants to make dark mode the default. Advise them.',
        rubric: [
          'Identifies that the comparison is between self-selected groups, not randomised ones',
          'Names at least one plausible confounder, such as engagement level driving both',
          'Proposes a randomised experiment as the way to answer the actual question',
        ],
        sampleAnswer:
          'The comparison is between people who chose dark mode and people who did not, and that choice is not random. The most likely explanation is a confounder: users who dig into settings at all are already more engaged, and engaged users both discover dark mode and retain better. Under that story dark mode is a marker of engagement rather than a cause of it, and switching the default would move the marker without moving retention — it might even hurt, since the users who would have actively chosen it are exactly the ones who no longer signal anything. There is also a possible reverse-causation reading: people who stay long enough to retain are the ones who eventually customise their settings. The only way to settle it is to randomise: assign a fraction of new users to a dark default, compare retention against the control, and only then decide. That experiment is also cheap, which makes it hard to justify shipping on the correlation instead.',
        explanation:
          'The examinable move is spotting self-selection and proposing randomisation. Naming a specific, plausible confounder rather than saying "correlation is not causation" is what separates a good answer from a slogan.',
      },
    ],

    flashcards: [
      { front: 'What does covariance measure?', back: 'The average product of paired deviations from the two means. Its sign gives the direction of linear association; its magnitude depends on units.' },
      { front: 'Pearson r in one line', back: 'Covariance divided by both standard deviations — equivalently the average product of z-scores. Unit-free and bounded in [-1, 1].' },
      { front: 'What does r squared mean?', back: 'The proportion of variance in one variable explained by a straight-line fit on the other. r = 0.5 explains only 25%.' },
      { front: 'Pearson vs Spearman', back: 'Pearson measures linear association on raw values; Spearman measures monotone association on ranks and is robust to outliers and monotone transformations.' },
      { front: "What is Anscombe's quartet?", back: 'Four datasets with near-identical means, variances, correlations and regression lines but completely different shapes. The argument for always plotting.' },
      { front: 'Does r = 0 mean no relationship?', back: 'No — only no linear relationship. A perfect symmetric parabola gives r = 0 while being fully deterministic.' },
      { front: 'Variance of a sum', back: 'Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y). Variances add only when the covariance is zero.' },
    ],

    challenge: {
      title: 'A correlation report that refuses to mislead',
      brief:
        'Write a function that takes two numeric arrays and produces a responsible correlation report: Pearson r with a confidence interval, Spearman rho, r squared, the sample size, a warning if the sample is too small for the estimate to be meaningful, a warning if Pearson and Spearman differ by more than 0.15, and a warning if removing the single most influential point changes r by more than 0.1. Demonstrate it on Anscombe\'s four datasets and confirm that your warnings fire on datasets III and IV but not on dataset I.',
      language: 'python',
      acceptanceCriteria: [
        'Both Pearson and Spearman are computed and compared automatically',
        'Leave-one-out influence is calculated to detect a single dominating point',
        "The report is demonstrated on all four Anscombe datasets with differing warnings",
        'Every warning states the specific reason, not just that something is wrong',
      ],
      starterCode:
        'import numpy as np\nfrom scipy import stats\n\ndef correlation_report(x, y, name: str = "") -> None:\n    """Pearson, Spearman, influence and a set of explicit warnings."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach covariance and correlation to someone who knows about means and standard deviations. Make sure they understand why we normalise, what r squared means, and why a correlation near zero does not mean "unrelated".',
      mustCover: [
        'Covariance as the average product of paired deviations, and what its sign means',
        'Why covariance magnitude is uninterpretable, and how dividing by the standard deviations fixes it',
        'That r measures linear association only, and that r squared is the variance explained',
        'That correlation does not establish causation, with a concrete confounder',
      ],
      bonusSignals: [
        'mentions Anscombe\'s quartet or insists on plotting',
        'contrasts Spearman with Pearson and says when each is right',
        'gives a real confounding example rather than reciting the slogan',
      ],
      sampleExplanation:
        'You want one number for whether two measurements move together. Here is the construction. For each observation, ask whether it is above or below average on the first variable, and above or below average on the second, then multiply those two answers. If a point is above average on both, you get a positive product; if it is below on both, two negatives also give a positive; only when it is high on one and low on the other do you get a negative. Average those products and you have the covariance, and its sign tells you the direction of the relationship. The trouble is its size. Measure height in millimetres rather than metres and the covariance multiplies by a thousand, even though nothing about the relationship changed. So you divide by each variable\'s own standard deviation, which cancels the units and, as a bonus, forces the answer between minus one and one. That is the correlation. Now three things about reading it. First, square it before you interpret strength: a correlation of 0.5 accounts for a quarter of the variation, not half. Second, it only sees straight lines. Plot y equal to x squared over a symmetric range and the correlation is exactly zero while y is perfectly determined by x, because the left half and the right half cancel. So a correlation near zero rules out a linear relationship and nothing else. Third, and most abused: a correlation says nothing about cause. Ice cream sales and drownings correlate strongly, and neither causes the other — hot weather causes both. The only reliable way to get a causal answer is to intervene and randomise, which is exactly what an A/B test does. And before you interpret any correlation at all, plot the scatter: Anscombe built four datasets with the same means, the same variances, the same correlation and the same fitted line, and they look nothing alike.',
    },
  },

  {
    id: 'STAT-010',
    domain: 'STAT',
    module: 'Distributions',
    topic: 'The normal distribution',
    title: 'The Normal Distribution',
    slug: 'the-normal-distribution',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['STAT-008'],
    related: ['STAT-005', 'STAT-006', 'STAT-008'],
    tags: ['normal', 'gaussian', 'z-score', 'standardisation', '68-95-99.7', 'bell curve'],

    learningObjectives: [
      'Describe the shape of the normal distribution and the role of its two parameters',
      'Apply the 68-95-99.7 rule to answer probability questions without a table or a computer',
      'Compute and interpret a z-score, and use standardisation to compare values on different scales',
      'Recognise when data are not normal, and name the consequences of assuming normality anyway',
    ],

    terminology: [
      {
        term: 'Normal (Gaussian) distribution',
        definition:
          'A continuous distribution, symmetric about its mean, whose density is the familiar bell curve determined entirely by a mean and a standard deviation.',
        simple: 'The bell-shaped curve where most values cluster near the middle.',
      },
      {
        term: 'Standard normal',
        definition:
          'The normal distribution with mean 0 and standard deviation 1, conventionally denoted Z. Every normal variable becomes standard normal after standardisation.',
        simple: 'The reference bell curve that everything else is converted into.',
      },
      {
        term: 'z-score',
        definition:
          'The number of standard deviations a value lies above or below its mean, computed as (x - mu)/sigma. It is unit-free, so values from different scales become comparable.',
        simple: 'How many standard deviations from average this value is.',
      },
      {
        term: 'Standardisation',
        definition:
          'Transforming a variable by subtracting its mean and dividing by its standard deviation, producing a variable with mean 0 and standard deviation 1.',
        simple: 'Re-expressing every value as a distance from the average, measured in standard deviations.',
      },
      {
        term: '68-95-99.7 rule',
        definition:
          'For a normal distribution, approximately 68.3% of the probability lies within one standard deviation of the mean, 95.4% within two, and 99.7% within three.',
        simple: 'Most values are within one standard deviation, nearly all within three.',
      },
      {
        term: 'Heavy-tailed distribution',
        definition:
          'A distribution whose extreme values occur far more often than a normal distribution with the same variance would predict. Financial returns and latency are classic cases.',
        simple: 'A distribution where shocking outliers are much less shocking than you would expect.',
      },
    ],

    simpleExplanation:
      'Measure the height of ten thousand adults and plot the results, and a very particular shape appears: a single hump in the middle, falling away symmetrically on both sides, with extremes that are rare but not impossible. Measure the weight of loaves from a bakery, or the errors of a well-calibrated instrument, and the same shape appears again. This is the normal distribution, and the reason it turns up everywhere is worth stating plainly: whenever a quantity is the sum of many small independent influences, the result tends towards this shape regardless of what those influences individually looked like. Height is genetics plus nutrition plus a hundred other small factors, and adding them up produces a bell. The shape is fixed by exactly two numbers — where the centre is and how wide it is — and once you know them you know everything. That is what makes it so convenient, and also what makes it so frequently misapplied: plenty of real data, including almost every quantity that cannot go below zero, is not shaped like this at all.',

    whyItExists:
      'Adding up many small independent effects produces this one shape no matter what the effects looked like individually, which is why it describes measurement error, biological variation and aggregate quantities so often. It is also the distribution for which the entire apparatus of classical inference — standard errors, confidence intervals, t-tests — was worked out exactly.',

    analogy: {
      scenario:
        'Picture a Galton board: a vertical board studded with rows of pegs, with a ball dropped in at the top. At each peg the ball bounces left or right with equal chance, and after twenty rows it lands in one of the bins at the bottom. To land in the far left bin it must go left twenty times in a row, which almost never happens. To land in a middle bin it needs roughly ten lefts and ten rights, and there are enormous numbers of ways to achieve that. Drop a thousand balls and the bins fill into a bell shape, every time, without anyone designing it.',
      mapping: [
        { from: 'One bounce off a peg', to: 'One small independent random influence' },
        { from: 'The sum of twenty bounces', to: 'A quantity built by adding many small effects' },
        { from: 'The extreme bins needing an unbroken run', to: 'Tails being rare because they require many effects to align' },
        { from: 'Middle bins having many routes into them', to: 'The centre having the highest density' },
        { from: 'The bell appearing regardless of peg spacing', to: 'The central limit theorem: the shape does not depend on the individual distributions' },
      ],
      bridge:
        'The Galton board is the central limit theorem made physical, and it explains the two things people find mysterious about the normal distribution. It appears everywhere because summation is everywhere, not because nature has a preference for bell curves. And its tails fall off extraordinarily fast — at four standard deviations the density is about a thirty-thousandth of the peak — because reaching the far bin requires every single bounce to cooperate.',
      limitations:
        'The board only produces a bell because the bounces are independent and none of them dominates. If one peg had a strong bias, or if a single bounce could send the ball ten bins over, you would get something quite different. That is exactly the situation with financial returns and network latency, where one event can dominate the sum, and it is why those quantities have far heavier tails than the normal model predicts.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of the normal curve',
        subject: 'X ~ N(mu, sigma^2)',
        annotations: [
          { part: 'mu', note: 'The mean. It is also the median and the mode, because the curve is perfectly symmetric. Changing it slides the whole curve sideways.' },
          { part: 'sigma', note: 'The standard deviation. Changing it widens or narrows the curve while keeping the total area at 1, so a wider curve is also flatter.' },
          { part: 'sigma^2', note: 'The variance. The notation uses the variance, but everything you interpret uses the standard deviation.' },
          { part: 'The inflection points', note: 'The curve changes from concave to convex at exactly one standard deviation either side of the mean — you can literally see sigma on the plot.' },
          { part: 'The tails', note: 'They approach zero but never reach it, so every real value has some non-zero density, including impossible ones such as a negative height.' },
        ],
      },
      {
        kind: 'table',
        title: 'The 68-95-99.7 rule, with exact figures',
        caption: 'The round numbers are what you use in your head; the exact ones are what software returns.',
        columns: ['Range', 'Rule of thumb', 'Exact', 'Outside this range', 'Roughly once every'],
        rows: [
          ['mu ± 1 sigma', '68%', '68.27%', '31.73%', '3 observations'],
          ['mu ± 2 sigma', '95%', '95.45%', '4.55%', '22 observations'],
          ['mu ± 3 sigma', '99.7%', '99.73%', '0.27%', '370 observations'],
          ['mu ± 4 sigma', '99.99%', '99.994%', '0.006%', '15,787 observations'],
          ['mu ± 6 sigma', 'essentially all', '99.9999998%', '2 in a billion', '506 million observations'],
        ],
      },
      {
        kind: 'flow',
        title: 'Answering a probability question with a z-score',
        caption: 'The standardisation step is what lets one table serve every normal distribution ever.',
        steps: [
          { label: 'Write down mu and sigma', detail: 'The two parameters that fully determine the distribution.' },
          { label: 'Standardise the value of interest', detail: 'z = (x - mu)/sigma, giving the distance from the mean in standard deviations.' },
          { label: 'Look up or compute the standard normal CDF', detail: 'Phi(z) = P(Z <= z). One function answers every normal question.' },
          { label: 'Convert to the probability you actually want', detail: 'Above: 1 - Phi(z). Between: Phi(z2) - Phi(z1). Outside: 2(1 - Phi(|z|)).' },
          { label: 'Sanity-check against the rule', detail: 'If z = 2 and your answer is not close to 2.5% in one tail, recheck the arithmetic.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Normal versus heavy-tailed, for the same standard deviation',
        caption: 'Assuming normality when the data are heavy-tailed understates extreme risk by orders of magnitude.',
        left: {
          heading: 'Normal',
          points: [
            'A 4-sigma event roughly once in 16,000 observations',
            'A 6-sigma event roughly twice in a billion',
            'Mean and variance completely determine everything',
            'The sample mean is an efficient, well-behaved estimator',
            'Appropriate for measurement error and aggregate biological variation',
          ],
        },
        right: {
          heading: 'Heavy-tailed (e.g. Student t with 3 df, log-normal)',
          points: [
            'A 4-sigma event perhaps once in a few hundred observations',
            '6-sigma days occur repeatedly in real financial data',
            'Higher moments may not even exist',
            'The sample mean converges slowly and is unstable',
            'Appropriate for latency, income, file size, market returns',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Move mu and sigma and watch the curve respond',
        caption: 'Shift the mean and the curve slides without changing shape; increase sigma and it flattens and spreads, since the area must stay at exactly 1. Shade the tail regions to see the 68-95-99.7 rule directly.',
        widget: 'distribution-explorer',
        props: { family: 'normal' },
      },
    ],

    formalDefinition:
      'A random variable X is normally distributed with mean mu and variance sigma squared if its density is f(x) = 1/(sigma root 2 pi) times exp of minus (x - mu) squared over 2 sigma squared, for all real x. The distribution is symmetric about mu, where mean, median and mode coincide, with inflection points at mu plus or minus sigma. It is closed under linear transformation — aX + b is again normal — and under addition of independent normals, and the standardised variable Z = (X - mu)/sigma has the standard normal distribution with mean 0 and variance 1. Its CDF has no elementary closed form and is written Phi.',

    math: {
      intuition:
        'The density has one idea in it: probability should fall off with distance from the centre, and it should fall off extremely fast. The exponent is the squared z-score, so a value two standard deviations out is penalised four times as hard as one standard deviation out, and three standard deviations out nine times as hard. Everything in front of the exponential is just the constant needed to make the total area come to exactly 1. Once you see that the whole shape depends on x only through the z-score, it becomes obvious why standardisation works: every normal distribution is the same curve with the axis relabelled.',
      formulas: [
        {
          latex: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\!\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)',
          name: 'Normal probability density function',
          meaning:
            'The bell curve. Density falls off as the exponential of the negative squared distance from the mean, measured in standard deviations.',
          variables: [
            { symbol: 'x', meaning: 'the value at which the density is evaluated' },
            { symbol: '\\mu', meaning: 'the mean: the centre of the curve, and also its median and mode' },
            { symbol: '\\sigma', meaning: 'the standard deviation: how wide the curve is' },
            { symbol: '\\sigma\\sqrt{2\\pi}', meaning: 'the normalising constant that forces the total area to equal exactly 1' },
            { symbol: '(x-\\mu)^2/\\sigma^2', meaning: 'the squared z-score — the only way x enters the formula' },
          ],
          category: 'probability',
        },
        {
          latex: 'z = \\frac{x - \\mu}{\\sigma}',
          name: 'z-score (standardisation)',
          meaning:
            'How many standard deviations a value lies from the mean. Being unit-free, it makes values from completely different scales comparable.',
          variables: [
            { symbol: 'z', meaning: 'the standardised value; positive above the mean, negative below' },
            { symbol: 'x - \\mu', meaning: 'the raw deviation from the mean, in the original units' },
            { symbol: '\\sigma', meaning: 'the standard deviation, which sets the natural unit of distance' },
          ],
          category: 'statistics',
        },
        {
          latex: 'X \\sim N(\\mu, \\sigma^2) \;\\Longrightarrow\; Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)',
          name: 'Reduction to the standard normal',
          meaning:
            'Every normal distribution becomes the standard normal after standardisation, which is why a single table or a single function answers every question.',
          variables: [
            { symbol: 'N(\\mu, \\sigma^2)', meaning: 'the normal distribution with that mean and variance' },
            { symbol: 'N(0,1)', meaning: 'the standard normal: mean 0, standard deviation 1' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(\\mu - k\\sigma \\le X \\le \\mu + k\\sigma) = 2\\Phi(k) - 1',
          name: 'The empirical rule, exactly',
          meaning:
            'The probability of falling within k standard deviations of the mean. At k = 1, 2, 3 this gives 0.6827, 0.9545 and 0.9973.',
          variables: [
            { symbol: 'k', meaning: 'the number of standard deviations either side of the mean' },
            { symbol: '\\Phi', meaning: 'the standard normal CDF, which has no elementary closed form' },
            { symbol: '2\\Phi(k) - 1', meaning: 'the central probability, obtained by removing both tails' },
          ],
          category: 'probability',
        },
        {
          latex: 'X_1 \\sim N(\\mu_1, \\sigma_1^2),\; X_2 \\sim N(\\mu_2, \\sigma_2^2) \\text{ independent} \;\\Longrightarrow\; X_1 + X_2 \\sim N(\\mu_1 + \\mu_2,\; \\sigma_1^2 + \\sigma_2^2)',
          name: 'Closure under addition',
          meaning:
            'The sum of independent normals is exactly normal, with means and variances adding. This is why the normal family sits at the centre of statistical theory.',
          variables: [
            { symbol: '\\mu_1 + \\mu_2', meaning: 'means always add, by linearity of expectation' },
            { symbol: '\\sigma_1^2 + \\sigma_2^2', meaning: 'variances add because the variables are independent; standard deviations do not add' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Why does standardisation work? Start with X normal with mean mu and standard deviation sigma, and define Z = (X - mu)/sigma.',
        'By linearity of expectation, E[Z] = (E[X] - mu)/sigma = 0.',
        'By the scaling rule for variance, Var(Z) = Var(X)/sigma^2 = sigma^2/sigma^2 = 1.',
        'So Z has mean 0 and variance 1 for any distribution, not only the normal. What is special about the normal is that Z is still *normal*, because the family is closed under linear transformation.',
        'Look at the density: x enters only through (x - mu)^2 / sigma^2, which is exactly z squared.',
        'So every normal density is the same function of z, with the horizontal axis relabelled and the height rescaled to keep the area at 1.',
        'That is why one table of Phi values served every statistician for a century, and why a z-score of 2 means the same thing whether you are measuring heights in centimetres or latencies in milliseconds.',
      ],
    },

    workedExample: {
      title: 'Model latency, z-scores and an alert threshold',
      setup:
        'A deployed model has request latency that is approximately normal with mean 250 ms and standard deviation 40 ms. You must answer three practical questions: what fraction of requests exceed 330 ms, what threshold would flag the slowest 1% of requests, and how often a monitoring alert set at three standard deviations would fire spuriously.',
      steps: [
        {
          label: 'State the parameters',
          detail: 'Two numbers determine everything about this distribution.',
          latex: '\\mu = 250 \\text{ ms}, \\qquad \\sigma = 40 \\text{ ms}',
        },
        {
          label: 'Standardise 330 ms',
          detail: 'Eighty milliseconds above the mean, and each standard deviation is 40 ms, so this is exactly two of them.',
          latex: 'z = \\frac{330 - 250}{40} = \\frac{80}{40} = 2.0',
        },
        {
          label: 'Use the empirical rule',
          detail:
            'About 95.4% of values lie within two standard deviations, so 4.6% lie outside. By symmetry, half of that is in the upper tail.',
          latex: 'P(X > 330) = \\tfrac{1 - 0.9545}{2} = 0.0228',
        },
        {
          label: 'Interpret it operationally',
          detail: 'Roughly 2.3% of requests, or about 1 in 44. On a service handling ten million requests a day, that is 228,000 requests over 330 ms.',
          latex: '0.0228 \\times 10^7 \\approx 228{,}000 \\text{ requests/day}',
        },
        {
          label: 'Invert the question for the p99 threshold',
          detail:
            'The slowest 1% sit above the 99th percentile, which for a standard normal is z = 2.326. Convert back to milliseconds by reversing the standardisation.',
          latex: 'x = \\mu + z\\sigma = 250 + 2.326 \\times 40 \\approx 343 \\text{ ms}',
        },
        {
          label: 'Evaluate a three-sigma alert',
          detail:
            'A threshold at 250 + 3(40) = 370 ms fires on 0.135% of requests by chance alone. At 10,000 requests per minute that is 13.5 spurious alerts every minute — a threshold chosen without this arithmetic is a pager that nobody will answer.',
          latex: '\\tfrac{1 - 0.9973}{2} = 0.00135 \;\\Rightarrow\; 13.5 \\text{ per minute at } 10^4 \\text{ rpm}',
        },
        {
          label: 'Now question the assumption',
          detail:
            'Latency is almost never normal: it is right-skewed with a long tail from retries, cold starts and garbage collection. A normal model with mean 250 and sigma 40 puts P(latency < 130 ms) at 0.13%, when in reality a large share of requests are served from cache well under that.',
          latex: 'P(X < 130) = \\Phi(-3) = 0.00135 \;\\text{— implausible for real latency}',
        },
      ],
      conclusion:
        'Under the normal model, 2.3% of requests exceed 330 ms, the p99 threshold sits at 343 ms, and a three-sigma alert fires 13.5 times a minute at typical traffic. The arithmetic is exact and the model is questionable: the final step shows the normal assumption making a prediction about fast requests that anyone who has looked at a latency histogram knows is wrong. Compute the empirical percentiles instead, and keep the normal model for quantities that genuinely arise as sums of many small effects.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The empirical rule, verified exactly',
        runnable: true,
        code: `from scipy import stats

Z = stats.norm(loc=0, scale=1)

for k in [1, 2, 3, 4, 6]:
    inside = Z.cdf(k) - Z.cdf(-k)
    outside = 1 - inside
    one_in = 1 / outside if outside > 0 else float("inf")
    print(f"within {k} sigma: {inside * 100:11.7f}%   "
          f"outside: {outside * 100:9.6f}%   about 1 in {one_in:,.0f}")`,
        output: `within 1 sigma:  68.2689492%   outside: 31.731051%   about 1 in 3
within 2 sigma:  95.4499736%   outside:  4.550026%   about 1 in 22
within 3 sigma:  99.7300204%   outside:  0.269980%   about 1 in 370
within 4 sigma:  99.9936658%   outside:  0.006334%   about 1 in 15,787
within 6 sigma:  99.9999998%   outside:  0.000000%   about 1 in 506,797,346`,
        explanation:
          'The final column is the one worth internalising, because it converts an abstract probability into an operational frequency. A three-sigma monitoring threshold fires by chance roughly once in every 370 observations, which on a high-traffic service is many times per minute. This is also the origin of the "six sigma" quality slogan: about two defects per billion, if the process really is normal.',
      },
      {
        language: 'python',
        title: 'Standardisation makes incomparable things comparable',
        runnable: true,
        code: `from scipy import stats

candidates = [
    ("Exam A", 82, 70, 8),     # (name, score, mean, sd)
    ("Exam B", 640, 500, 100),
    ("Exam C", 29, 24, 4),
]

for name, score, mu, sd in candidates:
    z = (score - mu) / sd
    pct = stats.norm.cdf(z) * 100
    print(f"{name}: raw={score:>4}  z={z:+.3f}  percentile={pct:5.1f}%")`,
        output: `Exam A: raw=  82  z=+1.500  percentile= 93.3%
Exam B: raw= 640  z=+1.400  percentile= 91.9%
Exam C: raw=  29  z=+1.250  percentile= 89.4%`,
        explanation:
          'The raw scores of 82, 640 and 29 cannot be compared at all — they are on different scales with different spreads. Standardising converts each into "how many standard deviations above average", and now Exam A is the strongest performance despite having by far the smallest raw number. This is exactly what `StandardScaler` does to features before training, and for the same reason: it puts everything on a common footing so that no variable dominates simply because it was measured in larger units.',
      },
      {
        language: 'python',
        title: 'Checking whether data are actually normal',
        runnable: true,
        code: `import numpy as np
from scipy import stats

rng = np.random.default_rng(0)
n = 5_000

samples = {
    "normal   ": rng.normal(250, 40, n),
    "lognormal": rng.lognormal(5.4, 0.45, n),
    "bimodal  ": np.concatenate([rng.normal(200, 15, n // 2),
                                 rng.normal(320, 15, n // 2)]),
}

for name, d in samples.items():
    within1 = np.mean(np.abs(d - d.mean()) < d.std())
    skew = stats.skew(d)
    kurt = stats.kurtosis(d)          # 0 for a normal distribution
    print(f"{name}: within 1sd={within1:.3f} (normal: 0.683)  "
          f"skew={skew:+.2f}  excess kurtosis={kurt:+.2f}")`,
        output: `normal   : within 1sd=0.684 (normal: 0.683)  skew=+0.01  excess kurtosis=-0.03
lognormal: within 1sd=0.767 (normal: 0.683)  skew=+1.62  excess kurtosis=+4.52
bimodal  : within 1sd=0.713 (normal: 0.683)  skew=+0.00  excess kurtosis=-1.50`,
        explanation:
          'Three quick diagnostics, no formal test required. The log-normal data show strong positive skew and heavy tails, so the empirical rule fails badly. The bimodal data are perfectly symmetric with zero skew — which is why skew alone is not enough — but negative excess kurtosis reveals a flat, two-humped shape, and the mean sits in a valley where almost no data live. In practice the fastest check of all is a histogram plus a quantile-quantile plot; these numbers are what you report once you have looked.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature standardisation before training',
        usage:
          'scikit-learn\'s `StandardScaler` converts every feature to a z-score using the training mean and standard deviation. It is required for distance-based methods and regularised linear models, and it substantially speeds up gradient descent by making the loss surface less elongated.',
      },
      {
        context: 'Weight initialisation in neural networks',
        usage:
          'He and Glorot initialisation draw weights from normal distributions with variances set from the layer widths, chosen precisely so that activation variance neither explodes nor vanishes as signals pass through many layers.',
      },
      {
        context: 'Anomaly detection thresholds',
        usage:
          'Monitoring systems commonly alert at three standard deviations from a rolling mean. On genuinely normal metrics that fires about once in 370 points; on heavy-tailed metrics such as latency it fires constantly, which is why robust alternatives based on percentiles or the median absolute deviation are preferred.',
      },
      {
        context: 'Measurement error and instrument calibration',
        usage:
          'Errors from a well-calibrated instrument really are close to normal, because they aggregate many tiny independent perturbations. This is the case the distribution was originally developed for, by Gauss, working on astronomical observations.',
      },
    ],

    projectConnections: [
      { tool: 'SciPy', role: '`stats.norm` provides `pdf`, `cdf`, `ppf` and `rvs`; `stats.probplot` produces the quantile-quantile plot that checks normality visually.' },
      { tool: 'scikit-learn', role: '`StandardScaler` for z-scores; `PowerTransformer` and `QuantileTransformer` for forcing skewed features closer to normal.' },
      { tool: 'NumPy', role: '`rng.normal` for sampling, and `np.clip` when a normal model would otherwise produce impossible values such as negative durations.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming data are normal without looking',
        why: 'Most real quantities that cannot be negative — latency, income, file size, counts — are right-skewed. A normal model will put meaningful probability on negative values and will drastically understate the upper tail.',
        fix: 'Plot a histogram and a quantile-quantile plot before modelling. If the data are positive and skewed, consider a log transform or a log-normal, gamma or exponential model instead.',
      },
      {
        mistake: 'Believing the central limit theorem makes your data normal',
        why: 'It applies to the distribution of sample *means*, not to the raw observations. No amount of data makes a skewed population normal; it makes the sampling distribution of its mean normal.',
        fix: 'Be precise about which quantity you are claiming is normal. The raw incomes are not; the average of a thousand randomly chosen incomes very nearly is.',
      },
      {
        mistake: 'Using three-sigma alerts on heavy-tailed metrics',
        why: 'The 0.27% figure is a property of the normal distribution. For heavy-tailed data, four- and five-sigma events occur orders of magnitude more often, so the alert fires constantly and is then ignored.',
        fix: 'Threshold on empirical percentiles computed from historical data, or use a robust scale such as the median absolute deviation instead of the standard deviation.',
      },
      {
        mistake: 'Fitting the scaler on the full dataset before splitting',
        why: 'The test set\'s mean and standard deviation leak into the transformation, so held-out performance is optimistically biased and will not reproduce in deployment.',
        fix: 'Fit on the training split only and apply the stored statistics everywhere else. A scikit-learn `Pipeline` enforces this inside every cross-validation fold automatically.',
      },
      {
        mistake: 'Confusing standardisation with normalisation',
        why: 'Standardising gives mean 0 and standard deviation 1 but does not change the shape and does not bound the values. Min-max normalisation rescales to [0, 1]. Neither makes a skewed distribution symmetric.',
        fix: 'Pick the transformation that matches the requirement: z-scores for scale-sensitive algorithms, min-max for bounded inputs, and a power or quantile transform when you genuinely need to change the shape.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why does the normal distribution appear so often in practice?',
        answer:
          'Because of the central limit theorem: when a quantity is the sum or average of many small independent contributions, none of which dominates, its distribution tends towards a normal regardless of what the individual contributions looked like. Height aggregates many genetic and environmental factors, measurement error aggregates many tiny perturbations, and a sample mean aggregates observations, so all three are close to normal. There are two important caveats. The first is that the theorem applies to sums, so quantities that arise multiplicatively — income growth, file sizes, network latency — tend to be log-normal rather than normal, with a long right tail. The second is that the conditions matter: if one contribution can dominate the sum, as in financial returns during a crash, the tails are far heavier than normal and the model understates extreme risk by orders of magnitude. So the honest summary is that the normal distribution is common because addition is common, not because nature prefers bells.',
        followUp:
          'A strong answer distinguishes clearly between the raw data being normal and the sampling distribution of the mean being normal, which is the confusion the CLT most often causes.',
      },
      {
        level: 'intermediate',
        question: 'What is a z-score and why standardise features before training?',
        answer:
          'A z-score is (x - mu)/sigma: how many standard deviations a value lies from its mean. It is unit-free, so values measured on entirely different scales become directly comparable. Standardising features matters for three families of algorithm. Distance-based methods such as k-nearest neighbours, k-means and support vector machines compute distances, so an unscaled feature measured in thousands will dominate one measured in units purely because of its scale. Regularised linear models penalise coefficient size, so without scaling the penalty falls unevenly across features. And gradient descent converges much faster on standardised inputs, because the loss surface becomes closer to spherical rather than a long narrow valley. Tree-based models are the exception: they split on thresholds within a single feature at a time, so monotone rescaling changes nothing. Crucially, the mean and standard deviation must be computed on the training split only and then applied to validation, test and production data, or you leak information from the held-out set.',
      },
      {
        level: 'ml-engineer',
        question: 'Your latency monitoring alerts at three standard deviations above the rolling mean, and it fires constantly. Diagnose and fix.',
        answer:
          'The three-sigma rule assumes normality, where it fires on 0.135% of observations in the upper tail. Latency is not normal: it is right-skewed with a heavy tail produced by retries, cold starts, garbage collection pauses and tail-latency amplification across dependencies. Under such a distribution, values far above three sigma are routine rather than exceptional, so the alert is behaving correctly for a model that does not describe the data. There is a second problem: a rolling mean and rolling standard deviation are themselves not robust, so a genuine incident inflates the standard deviation and desensitises the detector exactly when you need it. The fix is to threshold on empirical quantiles of the historical distribution — alert when the p99 exceeds its own historical p99 by some margin — or to use a robust scale such as the median absolute deviation in place of the standard deviation. Better still, alert on a quantity the business cares about, such as the fraction of requests breaching the service-level objective, which is bounded, interpretable and does not depend on any distributional assumption at all.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Adult heights in a population are approximately normal with mean 170 cm and standard deviation 8 cm. What fraction are taller than 186 cm, and what height marks the 10th percentile?',
        hint: 'Standardise for the first question. For the second, start from the z-value and reverse the standardisation.',
        solution:
          'First question: z = (186 - 170)/8 = 2.0. The empirical rule says 95.45% lie within two standard deviations, so 4.55% lie outside, and by symmetry half of that is above. So about 2.28% are taller than 186 cm — roughly 1 person in 44.\n\nSecond question: the 10th percentile of the standard normal is z = -1.2816. Reversing the standardisation, x = mu + z sigma = 170 + (-1.2816)(8) = 170 - 10.25 = 159.75 cm. So 10% of the population is shorter than about 160 cm.\n\nIn Python: `stats.norm(170, 8).sf(186)` gives 0.02275 and `stats.norm(170, 8).ppf(0.10)` gives 159.75.',
      },
      {
        prompt:
          'A model scores 0.91 accuracy. Across 50 bootstrap resamples the accuracies have mean 0.905 and standard deviation 0.012. Assuming approximate normality, give the range that should contain about 95% of resample accuracies, and say what this implies about a competing model scoring 0.92.',
        hint: 'Two standard deviations either side of the mean. Then ask whether the competitor lies inside or outside.',
        solution:
          'Two standard deviations is 2 x 0.012 = 0.024, so the interval is 0.905 ± 0.024, giving roughly [0.881, 0.929].\n\nThe competing model at 0.920 lies comfortably inside that range. That means a difference of this size is entirely consistent with resampling noise from the first model alone, so on this evidence you cannot claim the second model is genuinely better. The z-score of the competitor relative to the first model\'s resampling distribution is (0.920 - 0.905)/0.012 = 1.25, which corresponds to a one-sided tail probability of about 10.6% — nowhere near conventional significance.\n\nWhat you would actually do: evaluate both models on the *same* resamples and look at the distribution of the paired difference, which removes the shared variation due to which examples landed in each resample and is far more powerful than comparing two independent intervals.',
      },
      {
        prompt:
          'Generate right-skewed data, show that the 68-95-99.7 rule fails on it, then apply a log transform and show that the rule holds much better.',
        hint: 'Log-normal data become normal after taking logs, which is the definition of the family.',
        language: 'python',
        starterCode:
          'import numpy as np\n\nrng = np.random.default_rng(0)\nd = rng.lognormal(mean=3.0, sigma=0.8, size=200_000)\n',
        solution:
          'import numpy as np\nrng = np.random.default_rng(0)\nd = rng.lognormal(3.0, 0.8, 200_000)\n\ndef within(x, k):\n    return np.mean(np.abs(x - x.mean()) < k * x.std())\n\nfor k in (1, 2, 3):\n    print(k, round(within(d, k), 4), round(within(np.log(d), k), 4))\n\nRaw data give roughly 0.80, 0.95 and 0.98 within one, two and three standard deviations, against the normal figures of 0.683, 0.954 and 0.997. The one-sigma figure is far too high and the three-sigma figure far too low, which is the classic signature of a right-skewed distribution: too much mass bunched near the mean and too much in the far right tail, with the standard deviation inflated by that tail.\n\nAfter taking logs the figures land at approximately 0.683, 0.954 and 0.997 — the log-normal is defined as the distribution whose logarithm is normal, so this is exact rather than lucky. The practical lesson is that a log transform is the first thing to try on any positive, right-skewed quantity, and it is why so many models are fitted to log-price, log-latency or log-count.',
      },
    ],

    quiz: [
      {
        id: 'STAT-010-q1',
        type: 'numeric',
        concept: 'z-score',
        prompt: 'Test scores are normal with mean 500 and standard deviation 100. What is the z-score of a score of 650?',
        answer: 1.5,
        tolerance: 0.05,
        explanation:
          '(650 - 500)/100 = 1.5. The score sits one and a half standard deviations above the mean, which corresponds to about the 93rd percentile.',
      },
      {
        id: 'STAT-010-q2',
        type: 'mcq',
        concept: 'empirical rule',
        prompt: 'For a normal distribution, roughly what proportion of values lie more than two standard deviations from the mean?',
        options: ['About 5%', 'About 32%', 'About 0.3%', 'About 50%'],
        answerIndex: 0,
        explanation:
          'About 95.45% lie within two standard deviations, so roughly 4.55% — commonly rounded to 5% — lie outside, split evenly between the two tails at about 2.3% each.',
      },
      {
        id: 'STAT-010-q3',
        type: 'truefalse',
        concept: 'CLT misconception',
        prompt: 'The central limit theorem guarantees that with enough data, your raw observations will be normally distributed.',
        answer: false,
        explanation:
          'It concerns the distribution of sample means, not of raw observations. Incomes stay right-skewed no matter how many you collect; it is the average of many incomes that becomes approximately normal.',
      },
      {
        id: 'STAT-010-q4',
        type: 'numeric',
        concept: 'inverting the z-score',
        prompt:
          'Latency is normal with mean 250 ms and standard deviation 40 ms. What latency marks the 97.5th percentile? Give your answer in milliseconds.',
        answer: 328,
        tolerance: 3,
        explanation:
          'The 97.5th percentile of the standard normal is z = 1.96, so x = 250 + 1.96(40) = 328.4 ms. This is the upper end of the familiar two-sigma interval and the same 1.96 that appears in every 95% confidence interval.',
      },
      {
        id: 'STAT-010-q5',
        type: 'multi',
        concept: 'when normality fails',
        prompt: 'Which of these quantities are usually poorly described by a normal distribution? Select all that apply.',
        options: [
          'Web request latency',
          'Household income',
          'Measurement error from a calibrated instrument',
          'Daily returns during a financial crisis',
          'The mean of 1,000 independent draws from a skewed population',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Latency and income are positive and right-skewed; crisis returns are heavy-tailed with extreme events far more common than normal predicts. Instrument error aggregates many tiny independent perturbations and really is close to normal, and the mean of 1,000 draws is normal by the central limit theorem even though the population is not.',
      },
      {
        id: 'STAT-010-q6',
        type: 'explain',
        concept: 'normality assumptions',
        prompt:
          'A teammate sets an anomaly alert at three standard deviations above a rolling mean of request latency, and it fires dozens of times an hour. Explain what is wrong and propose a better approach.',
        rubric: [
          'Identifies that latency is right-skewed and heavy-tailed rather than normal',
          'Explains that the 0.135% figure is a property of the normal distribution and does not transfer',
          'Proposes a concrete alternative such as empirical percentiles, a robust scale, or an objective-based alert',
        ],
        sampleAnswer:
          'The three-sigma threshold is derived from the normal distribution, where only 0.135% of observations exceed it. Latency is not normal — it is right-skewed with a long tail produced by retries, cold starts, garbage collection and slow dependencies — so values several standard deviations above the mean are ordinary rather than exceptional, and the alert is doing exactly what it was told on a model that does not fit. There is a second, subtler problem: the rolling mean and rolling standard deviation are themselves not robust, so a real incident inflates the standard deviation and desensitises the detector precisely when it matters. I would replace it with a threshold derived from the empirical distribution — alert when the current p99 exceeds its historical p99 by a chosen margin — or use a robust scale such as the median absolute deviation. The best version alerts on something the business defined, such as the fraction of requests breaching the service-level objective, because that number is bounded, interpretable and free of distributional assumptions.',
        explanation:
          'The key insight is that a rule of thumb inherits the assumptions of the distribution it came from, and that latency violates those assumptions in exactly the direction that generates false alarms.',
      },
    ],

    flashcards: [
      { front: 'What two parameters define a normal distribution?', back: 'The mean mu (where the centre is) and the standard deviation sigma (how wide it is). Mean, median and mode all coincide.' },
      { front: 'The 68-95-99.7 rule', back: 'About 68% of values lie within 1 sigma of the mean, 95% within 2, and 99.7% within 3. Exactly: 68.27%, 95.45%, 99.73%.' },
      { front: 'What is a z-score?', back: 'z = (x - mu)/sigma: how many standard deviations a value lies from the mean. Unit-free, so it makes different scales comparable.' },
      { front: 'Why does the normal appear so often?', back: 'The central limit theorem: sums and averages of many small independent effects tend to normal regardless of the individual distributions.' },
      { front: 'Name three quantities that are not normal', back: 'Latency, income and file size — all positive and right-skewed. Financial returns are heavy-tailed. Any bimodal mixture is not normal either.' },
      { front: 'What z gives a 95% central interval?', back: 'z = 1.96, so mu ± 1.96 sigma. The rounded "2 sigma" gives 95.45% instead of exactly 95%.' },
    ],

    challenge: {
      title: 'A normality screening report',
      brief:
        'Write a function that takes a numeric array and decides how normal it is. Report the mean, median and their gap; skewness and excess kurtosis; the observed proportions within one, two and three standard deviations against the theoretical 0.683, 0.954 and 0.997; the fraction of a fitted normal\'s probability mass that falls below the observed minimum (which exposes impossible predictions); and a plain-English verdict with a recommendation. Run it on a normal sample, a log-normal sample and a bimodal mixture, and confirm that the verdict differs appropriately in each case.',
      language: 'python',
      acceptanceCriteria: [
        'Observed and theoretical coverage proportions are compared directly for k = 1, 2, 3',
        'Skewness and excess kurtosis are reported with their normal reference values',
        'The verdict is derived from the computed diagnostics rather than hard-coded',
        'The report is demonstrated on at least three samples with genuinely different shapes',
        'For non-normal data the report suggests a concrete remedy such as a log transform',
      ],
      starterCode:
        'import numpy as np\nfrom scipy import stats\n\ndef normality_report(data: np.ndarray, name: str = "") -> None:\n    """Diagnose how well a normal distribution describes this data."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach the normal distribution to someone who knows about means and standard deviations. Explain why it turns up everywhere, teach the 68-95-99.7 rule and z-scores, and finish by warning them about the data that is not normal.',
      mustCover: [
        'The shape, and that exactly two parameters determine it completely',
        'Why it appears so often: sums of many small independent effects',
        'The 68-95-99.7 rule and what a z-score means',
        'That many real quantities — latency, income, file size — are not normal, and what goes wrong if you assume they are',
      ],
      bonusSignals: [
        'uses the Galton board or another concrete mechanism for the bell shape',
        'converts a tail probability into an operational frequency such as "once in 370"',
        'mentions the log transform for positive skewed data',
      ],
      sampleExplanation:
        'Measure ten thousand adult heights and plot them and you get a hump in the middle falling away symmetrically on both sides. Measure the errors of a good instrument and you get the same shape. The reason is worth understanding, because it is not a coincidence. Picture a board of pegs with a ball dropped from the top, bouncing left or right at each peg. To land at the far left it must go left every single time, which almost never happens; to land in the middle it needs roughly equal numbers of each, and there are an enormous number of ways to do that. Drop a thousand balls and you get a bell, every time. Anything that is the sum of many small independent nudges behaves like that ball, and a great many quantities are. The shape is pinned down by exactly two numbers: where the middle is, and how wide the spread is. Once you know those, you know everything, and the most useful consequence is a rule you can do in your head. About two thirds of values lie within one standard deviation of the middle, about ninety-five percent within two, and about ninety-nine point seven percent within three. So if latency averages two hundred and fifty milliseconds with a spread of forty, then three hundred and thirty is two standard deviations out and roughly two percent of requests are slower than that. Converting any value to "how many standard deviations from the middle" is called a z-score, and it is what lets you compare a test score out of eight hundred with one out of thirty. Now the warning. Plenty of real data is not shaped like this at all. Anything that cannot go below zero and occasionally goes very high — latency, income, file sizes — has a long tail on the right, and if you force a bell curve onto it you will predict negative values and badly underestimate how often the extremes happen. The first thing to try with such data is taking logarithms, which very often turns the long tail into a respectable bell.',
    },
  },

  {
    id: 'STAT-011',
    domain: 'STAT',
    module: 'Distributions',
    topic: 'Common distribution families',
    title: 'Binomial, Poisson and Other Useful Distributions',
    slug: 'binomial-poisson-distributions',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['STAT-005'],
    related: ['STAT-002', 'STAT-006', 'STAT-010'],
    tags: ['bernoulli', 'binomial', 'poisson', 'uniform', 'exponential', 'generative story'],

    learningObjectives: [
      'State the generative story behind Bernoulli, binomial, Poisson, uniform and exponential variables',
      'Choose the right distribution family for a described situation, and justify the choice from its assumptions',
      'Compute binomial and Poisson probabilities, and know their means and variances',
      'Explain the relationships between the families, including the Poisson limit and the Poisson-exponential pairing',
    ],

    terminology: [
      {
        term: 'Bernoulli',
        definition:
          'A single trial with two outcomes, coded 1 with probability p and 0 with probability 1 - p. Its mean is p and its variance p(1 - p).',
        simple: 'One yes-or-no event.',
      },
      {
        term: 'Binomial',
        definition:
          'The number of successes in n independent Bernoulli trials with a constant success probability p. Its mean is np and its variance np(1 - p).',
        simple: 'How many times something happened out of a fixed number of tries.',
      },
      {
        term: 'Poisson',
        definition:
          'The count of events in a fixed interval when events occur independently at a constant average rate. Its mean and variance are both equal to lambda.',
        simple: 'How many rare events happened in a window of time, when there is no fixed number of tries.',
      },
      {
        term: 'Uniform',
        definition:
          'Every value in a range is equally likely. Discrete for a fair die, continuous on an interval with constant density 1/(b - a).',
        simple: 'Anything in this range is as likely as anything else.',
      },
      {
        term: 'Exponential',
        definition:
          'The waiting time until the next event in a Poisson process. It is memoryless: the distribution of remaining wait does not depend on how long you have already waited.',
        simple: 'How long until the next event, when events arrive at a steady random rate.',
      },
      {
        term: 'Generative story',
        definition:
          'The mechanism a distribution assumes produced the data. Choosing a distribution means asserting that its story matches your situation.',
        simple: 'The description of how the numbers came to be.',
      },
    ],

    simpleExplanation:
      'Distributions are not arbitrary formulas to memorise. Each one is the answer to a specific question about a specific kind of random process, and if you learn the question you never need to memorise the formula. Does something either happen or not, once? That is a Bernoulli. Do you repeat that fixed number of times and count the successes? Binomial. Do events instead trickle in at some average rate with no fixed number of attempts — emails arriving, servers failing, customers walking in — and you count how many arrived in an hour? Poisson. Are you waiting for the next one of those to arrive? Exponential. Is every value in a range equally plausible, with no preference at all? Uniform. The skill this unit teaches is reading a situation and recognising which story it matches, because once you name the story the mean, the variance and the probability of any outcome all follow. Getting the story wrong is far more damaging than any arithmetic slip, because a wrong family gives confidently wrong answers.',

    whyItExists:
      'A handful of random mechanisms — repeated yes-or-no trials, events arriving at a rate, waiting times, complete indifference — generate a large fraction of the randomness anyone actually meets. Naming those mechanisms means you can compute with them immediately instead of re-deriving everything from the sample space each time.',

    analogy: {
      scenario:
        'Think of a busy coffee shop. Whether one particular customer orders a pastry is a single yes-or-no event. Out of the next fifty customers, how many order a pastry is a counting question with a fixed number of tries. How many customers walk through the door between nine and ten is a different counting question entirely, because there is no fixed number of tries — people simply arrive at some rate. How long the barista waits for the next customer is a waiting-time question. And if a customer picks a table entirely at random with no preference, the table they choose is uniform.',
      mapping: [
        { from: 'Does this one customer buy a pastry?', to: 'Bernoulli(p)' },
        { from: 'How many of the next fifty buy one?', to: 'Binomial(n = 50, p)' },
        { from: 'How many customers arrive between nine and ten?', to: 'Poisson(lambda)' },
        { from: 'How long until the next customer walks in?', to: 'Exponential(lambda)' },
        { from: 'Which of the twelve tables do they pick?', to: 'Discrete uniform' },
      ],
      bridge:
        'The distinction between the binomial and the Poisson question is the one that matters most, and the coffee shop makes it concrete: binomial needs a fixed denominator, a known number of trials. "How many of fifty customers bought a pastry" has one; "how many customers arrived" does not, because there is no pool of people who might have arrived and did not. That is exactly the question to ask when choosing between them. The Poisson and the exponential are then two views of the same process — count events in a window, or measure the gap between them — which is why the same lambda appears in both.',
      limitations:
        'All these stories assume independence and a constant rate, and a coffee shop honours neither. Arrivals surge at nine and collapse at three, and one person joining a queue makes the next person more likely to walk past. Real count data are therefore usually overdispersed — more variable than Poisson predicts — which is why the negative binomial exists.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Five distributions and the question each answers',
        caption: 'Read the "generative story" column first; the parameters and formulas follow from it.',
        columns: ['Distribution', 'Generative story', 'Parameters', 'Mean', 'Variance'],
        rows: [
          ['Bernoulli', 'One trial, success or failure', 'p', 'p', 'p(1 - p)'],
          ['Binomial', 'Count of successes in n fixed independent trials', 'n, p', 'np', 'np(1 - p)'],
          ['Poisson', 'Count of events in an interval at a constant rate', 'lambda', 'lambda', 'lambda'],
          ['Discrete uniform', 'One of k outcomes, all equally likely', 'k', '(k + 1)/2', '(k^2 - 1)/12'],
          ['Continuous uniform', 'Any value in [a, b], all equally likely', 'a, b', '(a + b)/2', '(b - a)^2/12'],
          ['Exponential', 'Waiting time to the next Poisson event', 'lambda', '1/lambda', '1/lambda^2'],
        ],
      },
      {
        kind: 'flow',
        title: 'Choosing a distribution from the situation',
        caption: 'Four questions in order. The second one is where most mistakes happen.',
        branching: true,
        steps: [
          { label: 'Is the outcome a count or a measurement?', detail: 'Counts go to the discrete families; continuous measurements to uniform, exponential or normal.' },
          { label: 'For a count: is there a fixed number of trials?', detail: 'Yes means binomial. No — events just arrive — means Poisson.' },
          { label: 'For a measurement: are you timing a gap between events?', detail: 'If yes, exponential. If every value is equally plausible, uniform.' },
          { label: 'Is the quantity a sum or average of many small effects?', detail: 'If so, reach for the normal regardless of the underlying mechanism.' },
          { label: 'Check the assumptions before you commit', detail: 'Independence, constant p or constant rate. If the variance far exceeds the mean, Poisson is already wrong.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Binomial versus Poisson',
        caption: 'They converge when n is large and p is small, but the questions they answer are different.',
        left: {
          heading: 'Binomial(n, p)',
          points: [
            'A fixed, known number of trials n',
            'Every trial has the same success probability p',
            'The count is bounded above by n',
            'Variance np(1 - p) is always less than the mean np',
            'Example: how many of 1,000 emails were opened',
          ],
        },
        right: {
          heading: 'Poisson(lambda)',
          points: [
            'No fixed number of trials — events simply occur',
            'A constant average rate over the interval',
            'The count is unbounded, though large values are vanishingly rare',
            'Variance equals the mean exactly, which is a testable claim',
            'Example: how many support tickets arrived today',
          ],
        },
      },
      {
        kind: 'timeline',
        title: 'The Poisson process, seen two ways',
        caption: 'One mechanism, two questions, two distributions sharing the same rate parameter.',
        events: [
          { when: 'Events arrive at random along a timeline', what: 'A Poisson process with rate lambda events per unit time' },
          { when: 'Count events in a fixed window', what: 'That count is Poisson(lambda x window length)' },
          { when: 'Measure the gap between consecutive events', what: 'That gap is Exponential(lambda), with mean 1/lambda' },
          { when: 'Wait for the k-th event', what: 'That total wait is Gamma(k, lambda), the sum of k exponentials' },
          { when: 'Ask how long you still have to wait', what: 'Exactly the same distribution as when you started — the memoryless property' },
        ],
      },
      {
        kind: 'widget',
        title: 'Compare the families side by side',
        caption: 'Switch between binomial, Poisson, uniform and exponential, and watch the binomial converge on the Poisson as n grows and p shrinks with np held fixed.',
        widget: 'distribution-explorer',
      },
    ],

    formalDefinition:
      'A Bernoulli(p) variable takes the value 1 with probability p and 0 otherwise. A Binomial(n, p) variable is the sum of n independent Bernoulli(p) variables, with PMF equal to n-choose-k times p to the k times (1 - p) to the n - k. A Poisson(lambda) variable has PMF e to the minus lambda times lambda to the k over k factorial for non-negative integers k, and arises as the limit of Binomial(n, lambda/n) as n tends to infinity. A continuous Uniform(a, b) variable has constant density 1/(b - a) on [a, b]. An Exponential(lambda) variable has density lambda e to the minus lambda x for x at least 0, is the inter-arrival time of a Poisson process with rate lambda, and is the unique continuous memoryless distribution.',

    math: {
      intuition:
        'Each formula is just its story written down. The binomial PMF counts the ways to arrange k successes among n trials and multiplies by the probability of any one such arrangement. The Poisson PMF is what the binomial becomes when you slice the interval into more and more trials each less and less likely, holding the expected count fixed. The exponential density comes straight from asking for the probability that no Poisson event has yet occurred. If you can retell the story, you can reconstruct the formula.',
      formulas: [
        {
          latex: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\qquad k = 0, 1, \\ldots, n',
          name: 'Binomial PMF',
          meaning:
            'The number of ways to choose which k of the n trials succeeded, times the probability of any one such pattern.',
          variables: [
            { symbol: 'n', meaning: 'the fixed number of independent trials' },
            { symbol: 'k', meaning: 'the number of successes being asked about' },
            { symbol: 'p', meaning: 'the probability of success on a single trial, constant across trials' },
            { symbol: '\\binom{n}{k}', meaning: 'the binomial coefficient: how many distinct arrangements of k successes among n trials exist' },
            { symbol: 'p^k(1-p)^{n-k}', meaning: 'the probability of one specific arrangement, by the multiplication rule for independent events' },
          ],
          category: 'probability',
        },
        {
          latex: 'E[X] = np, \\qquad \\operatorname{Var}(X) = np(1-p)',
          name: 'Binomial mean and variance',
          meaning:
            'Because the binomial is a sum of n independent Bernoulli variables, its mean and variance are n times the Bernoulli values.',
          variables: [
            { symbol: 'np', meaning: 'the expected number of successes' },
            { symbol: 'np(1-p)', meaning: 'the variance, maximised at p = 0.5 and zero when p is 0 or 1' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(X = k) = \\frac{e^{-\\lambda}\\lambda^{k}}{k!}, \\qquad k = 0, 1, 2, \\ldots',
          name: 'Poisson PMF',
          meaning:
            'The probability of exactly k events in an interval when events occur independently at an average rate of lambda per interval.',
          variables: [
            { symbol: '\\lambda', meaning: 'the expected number of events in the interval; it is both the mean and the variance' },
            { symbol: 'k', meaning: 'the observed count, any non-negative integer with no upper bound' },
            { symbol: 'k!', meaning: 'k factorial, which divides out the orderings of indistinguishable events' },
            { symbol: 'e^{-\\lambda}', meaning: 'the normalising factor; note that it alone gives P(X = 0)' },
          ],
          category: 'probability',
        },
        {
          latex: '\\operatorname{Binomial}(n, p) \;\\xrightarrow[\;np \\to \\lambda\;]{n \\to \\infty}\; \\operatorname{Poisson}(\\lambda)',
          name: 'Poisson limit theorem',
          meaning:
            'When trials are many and each success is rare, the binomial becomes the Poisson. This is why the Poisson is called the law of rare events.',
          variables: [
            { symbol: 'n \\to \\infty', meaning: 'the number of trials grows without bound' },
            { symbol: 'np \\to \\lambda', meaning: 'the expected count is held fixed while p shrinks like lambda/n' },
          ],
          category: 'probability',
        },
        {
          latex: 'f(x) = \\lambda e^{-\\lambda x} \;(x \\ge 0), \\qquad F(x) = 1 - e^{-\\lambda x}, \\qquad E[X] = \\tfrac{1}{\\lambda}',
          name: 'Exponential density, CDF and mean',
          meaning:
            'The waiting time to the next Poisson event. The CDF is simply one minus the probability that no event has occurred yet.',
          variables: [
            { symbol: '\\lambda', meaning: 'the event rate — events per unit time' },
            { symbol: '1/\\lambda', meaning: 'the mean waiting time; a rate of 2 per minute gives an average wait of half a minute' },
            { symbol: 'e^{-\\lambda x}', meaning: 'the probability of waiting longer than x, which is the Poisson probability of zero events in [0, x]' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(X > s + t \\mid X > s) = P(X > t)',
          name: 'The memoryless property',
          meaning:
            'Having already waited s makes no difference: the remaining wait has the same distribution as a fresh one. The exponential is the only continuous distribution with this property.',
          variables: [
            { symbol: 's', meaning: 'the time already waited' },
            { symbol: 't', meaning: 'the additional time being asked about' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Where does the Poisson come from? Take an interval and chop it into n tiny slices.',
        'Assume at most one event can occur per slice, with probability p = lambda/n, independently across slices.',
        'The count of events is then Binomial(n, lambda/n), whose expected value is n times lambda/n, which equals lambda for every n.',
        'Write out the binomial PMF and let n go to infinity with lambda fixed.',
        'The binomial coefficient times p^k tends to lambda^k / k!, and (1 - lambda/n)^(n-k) tends to e^(-lambda).',
        'Multiplying gives e^(-lambda) lambda^k / k!, which is the Poisson PMF.',
        'The exponential then follows immediately: the probability of waiting longer than x is the probability of zero events in a window of length x, which is e^(-lambda x). So the CDF is 1 - e^(-lambda x), and differentiating gives the density.',
      ],
    },

    workedExample: {
      title: 'One dataset, three families: opens, tickets and waiting times',
      setup:
        'A product team has three questions. An email campaign goes to 10 recipients who each open independently with probability 0.3 — what is the chance exactly 3 open it? Support tickets arrive at an average of 2 per hour — what is the chance of none in the next hour, and of exactly 3? And given that rate, how long should the on-call engineer expect to wait, and what is the chance of a quiet hour?',
      steps: [
        {
          label: 'Identify the first family',
          detail: 'A fixed number of independent trials, each with the same success probability, and we count successes. That is a binomial.',
          latex: 'X \\sim \\operatorname{Binomial}(n = 10,\; p = 0.3)',
        },
        {
          label: 'Compute the binomial probability',
          detail: 'There are 120 ways to choose which three recipients opened it, and each such pattern has probability 0.3 cubed times 0.7 to the seventh.',
          latex: 'P(X = 3) = \\binom{10}{3}(0.3)^3(0.7)^7 = 120 \\times 0.027 \\times 0.082354 \\approx 0.2668',
        },
        {
          label: 'Check the mean and variance',
          detail: 'The expected number of opens is 3, and the variance is less than the mean — a signature that distinguishes binomial from Poisson.',
          latex: 'E[X] = 10(0.3) = 3, \\qquad \\operatorname{Var}(X) = 10(0.3)(0.7) = 2.1',
        },
        {
          label: 'Identify the second family',
          detail:
            'There is no fixed number of trials here: tickets simply arrive. There is no pool of tickets that could have been filed and were not. That is a Poisson.',
          latex: 'Y \\sim \\operatorname{Poisson}(\\lambda = 2 \\text{ per hour})',
        },
        {
          label: 'Compute two Poisson probabilities',
          detail: 'For k = 0 the formula collapses to e to the minus lambda. For k = 3 include the lambda cubed over 3 factorial factor.',
          latex: 'P(Y = 0) = e^{-2} \\approx 0.1353, \\qquad P(Y = 3) = \\frac{e^{-2} 2^3}{3!} = \\frac{0.1353 \\times 8}{6} \\approx 0.1804',
        },
        {
          label: 'Switch to the waiting-time view',
          detail: 'The same process, asked about gaps rather than counts, gives an exponential with the same rate.',
          latex: 'T \\sim \\operatorname{Exponential}(\\lambda = 2), \\qquad E[T] = \\tfrac{1}{2} \\text{ hour} = 30 \\text{ minutes}',
        },
        {
          label: 'Confirm the two views agree',
          detail:
            'The chance of waiting more than one hour for the next ticket must equal the chance of zero tickets in that hour — and it does, exactly.',
          latex: 'P(T > 1) = e^{-2 \\times 1} = 0.1353 = P(Y = 0)',
        },
        {
          label: 'Apply the memoryless property',
          detail:
            'If the engineer has already waited 45 quiet minutes, the expected further wait is still 30 minutes, not 30 minus 45. The process does not accumulate pressure.',
          latex: 'P(T > 1.75 \\mid T > 0.75) = P(T > 1) = 0.1353',
        },
        {
          label: 'Sanity-check the Poisson assumption',
          detail:
            'Poisson insists that the variance of the hourly counts equals the mean. If the team measures a mean of 2 and a variance of 9, arrivals are overdispersed — bursty, probably correlated — and a negative binomial is the honest model.',
          latex: '\\text{Poisson requires } \\operatorname{Var}(Y) = E[Y] = \\lambda',
        },
      ],
      conclusion:
        'P(exactly 3 opens) = 0.267, P(no tickets in an hour) = 0.135, P(exactly 3 tickets) = 0.180, and the expected wait between tickets is 30 minutes. Two things are worth keeping. The first is the choosing rule: a fixed denominator means binomial, no denominator means Poisson. The second is the consistency check — P(wait exceeds one hour) and P(zero events in one hour) came out to the same 0.1353 because they are literally the same event, described from two directions.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'All five families through one SciPy interface',
        runnable: true,
        code: `from scipy import stats

binom = stats.binom(n=10, p=0.3)
pois = stats.poisson(mu=2)
unif = stats.uniform(loc=0, scale=10)
expo = stats.expon(scale=1 / 2)        # scale = 1/lambda
bern = stats.bernoulli(p=0.3)

print(f"Bernoulli  P(X=1)   = {bern.pmf(1):.4f}   mean={bern.mean():.3f} var={bern.var():.3f}")
print(f"Binomial   P(X=3)   = {binom.pmf(3):.4f}   mean={binom.mean():.3f} var={binom.var():.3f}")
print(f"Poisson    P(X=3)   = {pois.pmf(3):.4f}   mean={pois.mean():.3f} var={pois.var():.3f}")
print(f"Uniform    P(2<X<5) = {unif.cdf(5) - unif.cdf(2):.4f}   mean={unif.mean():.3f} var={unif.var():.3f}")
print(f"Exponential P(T>1)  = {expo.sf(1):.4f}   mean={expo.mean():.3f} var={expo.var():.3f}")`,
        output: `Bernoulli  P(X=1)   = 0.3000   mean=0.300 var=0.210
Binomial   P(X=3)   = 0.2668   mean=3.000 var=2.100
Poisson    P(X=3)   = 0.1804   mean=2.000 var=2.000
Uniform    P(2<X<5) = 0.3000   mean=5.000 var=8.333
Exponential P(T>1)  = 0.1353   mean=0.500 var=0.500`,
        explanation:
          'Two details to note. First, SciPy parameterises the exponential by `scale`, which is the mean 1/lambda, not by the rate — getting this backwards is the single most common bug when using it. Second, look at the Poisson row: mean and variance are both exactly 2. That equality is a strong, testable claim about your data, and when real counts violate it the Poisson model is wrong no matter how well it fits the mean.',
      },
      {
        language: 'python',
        title: 'Watching the binomial become a Poisson',
        runnable: true,
        code: `from scipy import stats

lam = 3.0
print("      n        p    P(X=2) binomial   Poisson")
for n in [10, 50, 500, 5000]:
    p = lam / n
    b = stats.binom(n, p).pmf(2)
    print(f"{n:>7}  {p:.5f}          {b:.6f}  {stats.poisson(lam).pmf(2):.6f}")`,
        output: `      n        p    P(X=2) binomial   Poisson
     10  0.30000          0.233474  0.224042
     50  0.06000          0.226054  0.224042
    500  0.00600          0.224243  0.224042
   5000  0.00060          0.224062  0.224042`,
        explanation:
          'Holding np fixed at 3 while n grows and p shrinks, the binomial converges on the Poisson, matching to four decimal places by n = 500. This is the Poisson limit theorem, and it is why the Poisson is a good model for rare events in large populations: radioactive decays, typographical errors per page, or server failures across a fleet. It is also a practical shortcut, since the Poisson has one parameter instead of two and is far cheaper to evaluate for large n.',
      },
      {
        language: 'python',
        title: 'Overdispersion: when Poisson is the wrong story',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)

# Story A: a genuine constant-rate process.
steady = rng.poisson(lam=5.0, size=20_000)

# Story B: the rate itself varies hour to hour (bursty traffic).
varying_rate = rng.gamma(shape=1.0, scale=5.0, size=20_000)
bursty = rng.poisson(varying_rate)

for name, d in [("steady ", steady), ("bursty ", bursty)]:
    print(f"{name}: mean={d.mean():.3f}  var={d.var():.3f}  "
          f"var/mean={d.var() / d.mean():.2f}  P(X=0)={np.mean(d == 0):.4f}")`,
        output: `steady : mean=5.001  var=4.980  var/mean=1.00  P(X=0)=0.0067
bursty : mean=5.005  var=29.799  var/mean=5.95  P(X=0)=0.1669`,
        explanation:
          'Both series average five events, so any model fitted to the mean alone would look fine. But the bursty series has six times the variance and produces an empty interval 17% of the time against the Poisson prediction of 0.67%. The variance-to-mean ratio, sometimes called the dispersion index, is the diagnostic: it should be about 1 for a genuine Poisson. When it is far above 1, the rate itself is varying and a negative binomial — which is exactly this gamma-mixed Poisson — is the right model. Fitting a Poisson to overdispersed counts produces confidence intervals that are far too narrow and p-values that are far too small.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A/B test conversion counts',
        usage:
          'The number of conversions among n visitors in a variant is binomial with a fixed n and unknown p. Every two-proportion test, and every confidence interval for a conversion rate, is built on that model.',
      },
      {
        context: 'Capacity planning for a service',
        usage:
          'Request arrivals are modelled as a Poisson process so that queueing theory applies: the count in a window is Poisson and the gap between requests is exponential. The entire M/M/1 queue analysis rests on this pairing.',
      },
      {
        context: 'Dropout and random masking in neural networks',
        usage:
          'Dropout multiplies each activation by an independent Bernoulli variable, so the number of surviving units in a layer is binomial. The same mechanism underlies random feature masking in tree ensembles.',
      },
      {
        context: 'Modelling rare failures',
        usage:
          'Hardware failures across a large fleet are Poisson to a good approximation: many machines, each with a tiny independent failure probability — precisely the binomial-to-Poisson limit. Overdispersion then reveals correlated failures such as a bad batch or a shared rack.',
      },
    ],

    projectConnections: [
      { tool: 'SciPy', role: '`stats.binom`, `stats.poisson`, `stats.expon`, `stats.uniform` and `stats.bernoulli` share one interface for pmf, cdf, ppf and rvs.' },
      { tool: 'NumPy', role: '`rng.binomial`, `rng.poisson`, `rng.exponential` and `rng.uniform` for fast sampling inside simulations.' },
      { tool: 'statsmodels', role: '`GLM` with a Poisson or negative binomial family fits count regressions and reports a dispersion diagnostic.' },
      { tool: 'PyTorch', role: '`torch.distributions.Bernoulli` and `Categorical` underlie sampling in variational and reinforcement learning models.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a binomial when there is no fixed number of trials',
        why: 'The binomial requires a known n. "How many customers arrived today" has no denominator, because there is no defined set of people who might have arrived and did not.',
        fix: 'Ask: can I name the n and point at the failures? If not, you want a Poisson. If yes, binomial.',
      },
      {
        mistake: 'Assuming Poisson without checking the variance',
        why: 'The Poisson insists the variance equals the mean. Real counts are usually overdispersed because the rate varies over time, so intervals come out far too narrow and significance is overstated.',
        fix: 'Compute the variance-to-mean ratio. If it is materially above 1, use a negative binomial or a quasi-Poisson model that estimates the dispersion.',
      },
      {
        mistake: 'Confusing the exponential rate with its scale',
        why: 'SciPy\'s `expon` takes `scale = 1/lambda`, while NumPy\'s `rng.exponential` also takes a scale. Passing the rate where the mean is expected inverts the distribution silently.',
        fix: 'Always check the mean of the object you constructed: `stats.expon(scale=1/2).mean()` should return 0.5 for a rate of 2 per unit time.',
      },
      {
        mistake: 'Believing a long wait makes the next event sooner',
        why: 'The exponential is memoryless, so having waited 45 minutes tells you nothing about the remaining wait. Expecting events to be "due" is the gambler\'s fallacy in continuous time.',
        fix: 'Remember that P(T > s + t given T > s) = P(T > t) exactly. If your process genuinely ages — as machine wear does — use a Weibull or gamma distribution instead.',
      },
      {
        mistake: 'Applying binomial assumptions to correlated trials',
        why: 'The binomial requires independent trials with a constant p. Email opens within one household, or clicks within one session, are correlated, so the true variance exceeds np(1 - p).',
        fix: 'Define the trial at the level where independence is plausible — per household or per session rather than per event — or use a model that accounts for clustering.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'When would you model something as binomial rather than Poisson?',
        answer:
          'Binomial when there is a fixed, known number of independent trials each with the same success probability, and you count successes. Poisson when events simply occur over an interval at some average rate, with no denominator to speak of. The decisive test is whether you can point at the failures: "how many of 1,000 emails were opened" has 1,000 trials and identifiable non-openers, so it is binomial; "how many support tickets arrived today" has no set of tickets that could have been filed and were not, so it is Poisson. They converge when n is large and p is small with np fixed, which is the Poisson limit theorem, so for rare events in large populations either gives nearly the same numbers and the Poisson is simpler. The assumptions differ in a checkable way too: the binomial has variance np(1-p), which is always less than its mean, while the Poisson has variance exactly equal to its mean. If observed counts have variance well above the mean, both are wrong and you want a negative binomial.',
        followUp:
          'A strong answer volunteers the variance-to-mean diagnostic and names overdispersion as the common real-world failure of the Poisson assumption.',
      },
      {
        level: 'intermediate',
        question: 'What does it mean for the exponential distribution to be memoryless, and why does it matter?',
        answer:
          'It means P(T > s + t given T > s) equals P(T > t): having already waited s units makes no difference whatsoever to the distribution of the remaining wait. The exponential is the only continuous distribution with this property, and the geometric is its discrete counterpart. It matters in two directions. Where it holds, it simplifies analysis enormously — queueing theory, Markov chains and reliability models are tractable largely because exponential holding times let you forget the past — and it means an engineer who has waited 45 quiet minutes should still expect the same average wait as at the start. Where it does not hold, assuming it is dangerous: mechanical components wear out, so failure hazard increases with age, and a memoryless model will badly underestimate failures in older equipment. The usual fix is a Weibull distribution, whose shape parameter lets the hazard rate rise or fall with age, with the exponential as the special case where it is constant.',
      },
      {
        level: 'ml-engineer',
        question: 'You fit a Poisson regression to daily support ticket counts and the confidence intervals look implausibly narrow. What would you check?',
        answer:
          'Overdispersion, almost certainly. The Poisson model constrains the variance to equal the mean, so if the true counts are more variable than that, the standard errors are computed from a variance that is too small and every interval comes out too tight while p-values come out too small. The first check is the dispersion statistic — the Pearson chi-squared divided by the residual degrees of freedom — which should be near 1 and will be well above it if the model is misspecified; a quick version is the raw variance-to-mean ratio of the counts. The usual causes are a rate that varies with something not in the model, such as day of week, marketing pushes or incidents, and clustering, where one root cause produces a burst of tickets that are not independent events. The remedies in order of preference are: add the missing covariates, since unexplained heterogeneity is often just an omitted variable; switch to a negative binomial, which is a gamma-mixed Poisson with an explicit dispersion parameter; or use quasi-Poisson or robust sandwich standard errors, which keep the Poisson mean model and simply inflate the standard errors. I would also check for excess zeros, since a zero-inflated model is a different fix for a different problem.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A model has 92% accuracy. In a batch of 20 independent predictions, what is the probability that exactly 2 are wrong, and what is the expected number of errors?',
        hint: 'Define success as an error to keep the arithmetic natural, then identify n and p.',
        solution:
          'Let X be the number of errors, so X is Binomial(n = 20, p = 0.08).\n\nP(X = 2) = C(20, 2) (0.08)^2 (0.92)^18 = 190 x 0.0064 x 0.2229 = 0.2711.\n\nExpected errors: E[X] = np = 20 x 0.08 = 1.6. Variance: np(1-p) = 20 x 0.08 x 0.92 = 1.472, so the standard deviation is about 1.21.\n\nIn Python: `stats.binom(20, 0.08).pmf(2)` gives 0.2711.\n\nNote the assumption doing the work here: independence. If the 20 predictions come from one user session, or from consecutive frames of one video, the errors will be correlated and the true variance will exceed 1.472, so any interval built on this model will be too narrow.',
      },
      {
        prompt:
          'A website receives an average of 6 visits per minute. What is the probability of no visits in the next 30 seconds, and what is the expected gap between consecutive visits?',
        hint: 'Scale the rate to the window you are asking about, then note that the two questions are the same one.',
        solution:
          'The rate is 6 per minute, so over a 30-second window lambda = 3.\n\nP(no visits in 30 s) = e^(-3) = 0.0498, just under 5%.\n\nThe gap between consecutive visits is Exponential with rate 6 per minute, so the mean gap is 1/6 of a minute = 10 seconds.\n\nThe consistency check: P(gap > 30 s) = e^(-6 x 0.5) = e^(-3) = 0.0498, which is the same number, because "the next gap exceeds 30 seconds" and "zero visits in the next 30 seconds" are literally the same event.\n\nThe scaling step is the one people get wrong: lambda must always be expressed for the window you are asking about, so halving the window halves lambda.',
      },
      {
        prompt:
          'Simulate 10,000 hourly ticket counts from a Poisson process with rate 4, then from a process whose rate itself varies. Compute the variance-to-mean ratio for each and explain what it tells you.',
        hint: 'Draw the varying rate from a gamma distribution and pass the whole array to `rng.poisson`.',
        language: 'python',
        starterCode:
          'import numpy as np\n\nrng = np.random.default_rng(0)\nsteady = rng.poisson(4.0, 10_000)\n',
        solution:
          'import numpy as np\nrng = np.random.default_rng(0)\n\nsteady = rng.poisson(4.0, 10_000)\nrates = rng.gamma(shape=1.0, scale=4.0, size=10_000)\nbursty = rng.poisson(rates)\n\nfor name, d in [("steady", steady), ("bursty", bursty)]:\n    print(name, round(d.mean(), 3), round(d.var(), 3), round(d.var() / d.mean(), 2))\n\nThe steady series gives a mean of about 4.0, a variance of about 4.0, and a ratio of about 1.00. The bursty series gives a mean of about 4.0, a variance of about 20, and a ratio of about 5.\n\nThe ratio is the dispersion index, and the Poisson model predicts exactly 1. A ratio far above 1 means the counts are more variable than any Poisson can produce, which happens when the rate itself varies — traffic surges, incidents, day-of-week effects. Fitting a Poisson to such data reproduces the mean correctly and understates the variance badly, so every confidence interval and p-value derived from it is too optimistic. The negative binomial is precisely this gamma-mixed Poisson and is the standard fix.',
      },
    ],

    quiz: [
      {
        id: 'STAT-011-q1',
        type: 'match',
        concept: 'generative stories',
        prompt: 'Match each situation to the distribution that models it.',
        pairs: [
          { left: 'How many of 100 emails get opened', right: 'Binomial' },
          { left: 'How many customers arrive in an hour', right: 'Poisson' },
          { left: 'How long until the next arrival', right: 'Exponential' },
          { left: 'Whether one visitor converts', right: 'Bernoulli' },
          { left: 'A value picked at random from a range with no preference', right: 'Uniform' },
        ],
        explanation:
          'Each family answers a different question about a different mechanism. Fixed trials with a countable denominator means binomial; events arriving at a rate means Poisson; gaps between those events means exponential.',
      },
      {
        id: 'STAT-011-q2',
        type: 'numeric',
        concept: 'binomial',
        prompt: 'X is Binomial(n = 10, p = 0.3). What is E[X]?',
        answer: 3,
        tolerance: 0.05,
        explanation:
          'E[X] = np = 10 x 0.3 = 3. The variance is np(1 - p) = 2.1, which is always smaller than the mean for a binomial — a useful way to distinguish it from a Poisson.',
      },
      {
        id: 'STAT-011-q3',
        type: 'truefalse',
        concept: 'poisson variance',
        prompt: 'For a Poisson distribution, the variance equals the mean.',
        answer: true,
        explanation:
          'Both equal lambda. This is a strong and testable claim: if observed counts have variance much larger than their mean, the data are overdispersed and the Poisson model is wrong.',
      },
      {
        id: 'STAT-011-q4',
        type: 'mcq',
        concept: 'memorylessness',
        prompt:
          'Buses arrive as a Poisson process averaging one every 10 minutes. You have waited 15 minutes. How much longer should you expect to wait?',
        options: [
          '10 minutes — the exponential is memoryless',
          'Less than 10 minutes, because a bus is overdue',
          '25 minutes, because the waits add',
          'It cannot be determined without more information',
        ],
        answerIndex: 0,
        explanation:
          'The exponential is memoryless: the remaining wait has exactly the same distribution as a fresh one, regardless of how long you have already waited. Expecting the bus to be "due" is the gambler\'s fallacy in continuous time.',
      },
      {
        id: 'STAT-011-q5',
        type: 'numeric',
        concept: 'poisson pmf',
        prompt:
          'Events arrive at an average of 2 per hour. What is the probability of zero events in the next hour? Give a decimal to three places.',
        answer: 0.135,
        tolerance: 0.005,
        explanation:
          'P(X = 0) = e^(-lambda) = e^(-2) = 0.1353, since lambda^0 and 0! are both 1. This is also P(the waiting time exceeds one hour) under the corresponding exponential, because they are the same event.',
      },
      {
        id: 'STAT-011-q6',
        type: 'explain',
        concept: 'choosing a distribution',
        prompt:
          'A colleague models daily signups with a Poisson and finds that quiet days and huge days both happen far more often than the model predicts. Diagnose the problem and suggest a fix.',
        rubric: [
          'Identifies overdispersion: the observed variance exceeds the mean, which Poisson forbids',
          'Explains a plausible mechanism, such as the rate varying with day of week or marketing activity',
          'Proposes a concrete remedy such as adding covariates or moving to a negative binomial',
        ],
        sampleAnswer:
          'The symptom is too many extreme days in both directions, which is overdispersion: the observed variance is larger than the mean, and the Poisson model forbids that by construction since its variance is fixed equal to lambda. I would first compute the variance-to-mean ratio to confirm it is well above 1. The usual mechanism is that the rate itself is not constant — signups surge after a marketing push or a product launch and collapse at weekends — so the data are a mixture of Poisson distributions with different rates, and a mixture is always more dispersed than any single component. The first fix is to model the variation explicitly by adding day-of-week and campaign covariates in a Poisson regression, because unexplained heterogeneity is very often just an omitted variable. If dispersion persists after that, switch to a negative binomial, which is exactly a gamma-mixed Poisson and has a dispersion parameter to absorb the extra variance. If the problem is specifically an excess of zero days rather than general spread, a zero-inflated model targets that directly. Until this is fixed, every confidence interval from the model is too narrow.',
        explanation:
          'The examinable skill is recognising that a distribution encodes a testable claim about variance, and that violating it invalidates the uncertainty estimates even when the fitted mean is fine.',
      },
    ],

    flashcards: [
      { front: 'Bernoulli vs binomial', back: 'Bernoulli is one yes-or-no trial with mean p. Binomial is the count of successes in n such trials, with mean np and variance np(1-p).' },
      { front: 'When do you use a Poisson?', back: 'Counting events in an interval when they occur independently at a constant rate and there is no fixed number of trials. Mean = variance = lambda.' },
      { front: 'Binomial or Poisson — how do you decide?', back: 'Can you name n and point at the failures? Then binomial. If events simply arrive with no denominator, Poisson.' },
      { front: 'What is the exponential distribution for?', back: 'The waiting time to the next Poisson event. Mean 1/lambda, and P(T > x) = e^(-lambda x).' },
      { front: 'What does memoryless mean?', back: 'P(T > s + t | T > s) = P(T > t). Having waited does not change the remaining wait. The exponential is the only continuous distribution with this property.' },
      { front: 'What is overdispersion?', back: 'Count data whose variance exceeds its mean, which a Poisson cannot produce. Usually a varying rate; fix with covariates or a negative binomial.' },
      { front: 'Poisson limit theorem', back: 'Binomial(n, lambda/n) tends to Poisson(lambda) as n grows. Many trials, each rare, with a fixed expected count.' },
    ],

    challenge: {
      title: 'A distribution-choosing assistant',
      brief:
        'Write a function that takes an array of observations and a flag saying whether they are counts or measurements, and recommends a distribution family with a stated reason. For counts it should compare the variance-to-mean ratio against 1 and distinguish binomial-like (ratio below 1), Poisson-like (near 1) and overdispersed (well above 1), and check for excess zeros. For measurements it should test whether the data are non-negative and whether the coefficient of variation is near 1, which is the signature of an exponential. Validate it by generating samples from each family and confirming it recovers the right answer at least four times out of five.',
      language: 'python',
      acceptanceCriteria: [
        'The recommendation is derived from computed statistics, not from the caller stating the family',
        'The dispersion index is used to separate binomial, Poisson and overdispersed counts',
        'Every recommendation is accompanied by the numeric evidence that produced it',
        'The function is validated against simulated data from at least four different families',
      ],
      starterCode:
        'import numpy as np\n\ndef suggest_distribution(data: np.ndarray, kind: str = "count") -> str:\n    """Recommend a distribution family, with the evidence for the recommendation."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach the common distribution families to someone who knows what a PMF and a PDF are. Organise it around the generative story behind each one, and make sure they can tell binomial and Poisson apart.',
      mustCover: [
        'That each distribution corresponds to a specific mechanism, not an arbitrary formula',
        'Bernoulli and binomial: fixed trials with a constant success probability',
        'Poisson: events arriving at a rate with no fixed number of trials, and variance equal to the mean',
        'Exponential: the waiting time between Poisson events, and memorylessness',
      ],
      bonusSignals: [
        'gives the "can you point at the failures?" test for binomial versus Poisson',
        'mentions the Poisson limit theorem or overdispersion',
        'notes that Poisson and exponential are two views of one process',
      ],
      sampleExplanation:
        'These are not formulas to memorise; each one is the answer to a specific question about a specific mechanism. Start with a single yes-or-no event — does this visitor convert? — which is a Bernoulli, described entirely by the probability p. Now repeat it a fixed number of times and count the successes: out of a hundred emails, how many were opened? That is a binomial, and its two parameters are simply how many tries and what the chance is each time. Here is the distinction people miss. Suppose instead you ask how many customers walked into the shop this morning. There is no fixed number of tries — there is no pool of people who might have walked in and did not — so the binomial has nothing to count. What you have instead is events arriving at some average rate, and the count in a window follows a Poisson, described by that single rate. The test I use is: can I name the denominator and point at the failures? If yes, binomial. If no, Poisson. The Poisson comes with a strong claim attached, which is that its variance equals its mean, and that is worth checking against real data, because most real counts are burstier than that. Finally, if you take that same stream of arriving events and ask a different question — how long until the next one? — you get the exponential, with an average wait of one over the rate. The Poisson and the exponential are two views of one process, which is why "no events in the next hour" and "the next gap is longer than an hour" come out to exactly the same number. One last property of the exponential surprises everybody: it is memoryless. If buses average one every ten minutes and you have been waiting fifteen, your expected remaining wait is still ten minutes. Nothing is overdue, because the process does not accumulate pressure.',
    },
  },

  {
    id: 'STAT-012',
    domain: 'STAT',
    module: 'Sampling & Inference',
    topic: 'Samples and bias',
    title: 'Sampling and Sampling Bias',
    slug: 'sampling-and-bias',
    difficulty: 3,
    estimatedMinutes: 30,
    prerequisites: ['STAT-007'],
    related: ['STAT-001', 'STAT-010'],
    tags: ['sampling', 'population', 'selection bias', 'survivorship bias', 'stratified', 'train test split'],

    learningObjectives: [
      'Distinguish a population from a sample, and a parameter from a statistic',
      'Describe simple random, stratified and cluster sampling, and say when each is appropriate',
      'Identify selection bias and survivorship bias in a described scenario',
      'Explain why a train/test split is a sampling problem, and what goes wrong when it is done carelessly',
    ],

    terminology: [
      {
        term: 'Population',
        definition:
          'The complete set of units you want to draw a conclusion about. In machine learning it is the distribution the model will actually face in deployment, not the data you happen to hold.',
        simple: 'Everyone or everything you actually care about.',
      },
      {
        term: 'Sample',
        definition: 'The subset of the population you actually observe and compute with.',
        simple: 'The part you managed to measure.',
      },
      {
        term: 'Parameter versus statistic',
        definition:
          'A parameter is a fixed, usually unknown number describing the population, written with Greek letters. A statistic is computed from the sample and varies from sample to sample, written with Latin letters.',
        simple: 'The true value you want (parameter) versus your estimate of it (statistic).',
      },
      {
        term: 'Sampling bias',
        definition:
          'A systematic difference between the sample and the population, caused by the way the sample was collected. More data does not fix it.',
        simple: 'Your sample is the wrong shape, and collecting more of it stays the wrong shape.',
      },
      {
        term: 'Survivorship bias',
        definition:
          'Analysing only the units that made it through some filter, so the failures are invisible and the conclusion is drawn from a censored population.',
        simple: 'Studying the winners and forgetting that the losers are missing.',
      },
      {
        term: 'Stratified sampling',
        definition:
          'Dividing the population into strata and sampling within each, guaranteeing that every stratum is represented in proportion to its size (or deliberately over-represented).',
        simple: 'Split into groups first, then sample from each group.',
      },
    ],

    simpleExplanation:
      'You almost never get to measure everything. You measure some of it and hope the part you measured resembles the whole. Whether it does depends entirely on how you chose the part. If every member of the population had an equal chance of being picked, your sample will look like the population apart from random wobble, and that wobble shrinks as you collect more. But if the way you chose quietly favoured some members over others, your sample is the wrong shape, and here is the crucial part: collecting more of it does not help at all. A poll conducted by telephone in 1936 surveyed millions of people and still called the election wrong, because the people who owned telephones were richer than the people who did not. That is the difference between noise, which more data cures, and bias, which more data only makes more confident. In machine learning this is the whole story of the train/test split: the test set is a sample, and it only tells you what deployment will look like if it was drawn the same way deployment data will be.',

    whyItExists:
      'Measuring an entire population is almost always impossible or pointless, so every conclusion rests on a sample. Sampling theory exists to say when a sample licenses a claim about the population, and the vocabulary of bias exists because the most expensive errors come from samples that were large, precise and systematically wrong.',

    analogy: {
      scenario:
        'During the Second World War, the Statistical Research Group examined returning bombers to decide where to add armour. The damage was concentrated on the wings and fuselage and sparse around the engines, and the obvious recommendation was to armour the places with the most bullet holes. Abraham Wald pointed out the flaw: these were the planes that came back. Aircraft hit in the engines were not in the sample at all, because they were at the bottom of the Channel. The armour belonged exactly where the returning planes showed no damage.',
      mapping: [
        { from: 'All bombers that flew the mission', to: 'The population' },
        { from: 'The bombers that returned', to: 'The sample, selected by a filter correlated with the outcome' },
        { from: 'Planes downed and never examined', to: 'The missing data that invalidates the naive conclusion' },
        { from: 'Bullet holes on the wings', to: 'A pattern that is real in the sample and misleading about the population' },
        { from: "Wald's inversion", to: 'Reasoning about the selection mechanism rather than only about the observed data' },
      ],
      bridge:
        'The mechanism is exactly the one that corrupts machine learning datasets. A credit model trained only on approved applicants never sees how rejected applicants would have performed, so it learns about a population that was filtered by the previous model\'s decisions. A churn model trained on current customers has no data on the ones who already left. In every case the fix is the same as Wald\'s: ask what the selection rule was, and what it made invisible.',
      limitations:
        'The bomber story has a clean, knowable selection mechanism. Most real bias is subtler and partly unknowable — you cannot always enumerate who was excluded or why — so in practice you combine reasoning about the mechanism with explicit checks, such as comparing your sample\'s composition against a known population breakdown.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Bias versus variance in sampling',
        caption: 'The single most important distinction in this unit: only one of these is cured by more data.',
        left: {
          heading: 'Sampling variance (noise)',
          points: [
            'Random difference between the sample and the population',
            'Shrinks like one over the square root of n',
            'Symmetric: a sample is equally likely to be high or low',
            'Quantified by the standard error and a confidence interval',
            'More data genuinely fixes it',
          ],
        },
        right: {
          heading: 'Sampling bias (systematic error)',
          points: [
            'Systematic difference caused by the selection mechanism',
            'Does not shrink at all as n grows',
            'Directional: consistently wrong the same way',
            'Invisible in the data — no statistic reveals it',
            'More data makes you more confidently wrong',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Sampling designs and when to use them',
        columns: ['Design', 'How it works', 'Use when', 'Main risk'],
        rows: [
          ['Simple random', 'Every unit has the same chance of selection', 'You have a complete list and no structure to protect', 'A rare subgroup may be missed entirely'],
          ['Stratified', 'Split into strata, sample within each', 'Important subgroups must be represented', 'You must know the strata in advance'],
          ['Cluster', 'Sample whole groups, then measure all within them', 'Reaching individuals is expensive', 'Units within a cluster are correlated, so effective n is smaller'],
          ['Systematic', 'Take every k-th unit from an ordered list', 'The list is convenient and has no periodicity', 'Hidden periodicity in the list aligns with k'],
          ['Convenience', 'Take whoever is easiest to reach', 'Almost never, for inference', 'Selection bias of unknown size and direction'],
        ],
      },
      {
        kind: 'flow',
        title: 'From a question to a defensible sample',
        caption: 'The first step is the one teams skip, and it is the one that determines whether anything that follows is valid.',
        steps: [
          { label: 'Define the target population precisely', detail: 'Who or what must the conclusion apply to? For a model, it is the deployment distribution.' },
          { label: 'Identify the sampling frame', detail: 'The list you can actually draw from. The gap between frame and population is where bias enters.' },
          { label: 'Choose a design', detail: 'Simple random unless structure demands stratification or cost demands clustering.' },
          { label: 'Draw the sample and record non-response', detail: 'Who declined or was unreachable matters as much as who was measured.' },
          { label: 'Check composition against known benchmarks', detail: 'Compare age, region or class balance against a trusted source, and weight if needed.' },
        ],
      },
      {
        kind: 'timeline',
        title: 'Famous sampling failures',
        caption: 'Each was large, careful and systematically wrong.',
        events: [
          { when: '1936', what: 'Literary Digest polls 2.4 million people from car and telephone registers and predicts Landon; Roosevelt wins 46 of 48 states.' },
          { when: '1948', what: '"Dewey Defeats Truman" — quota sampling let interviewers choose respondents within quotas, introducing their own preferences.' },
          { when: '1940s', what: "Wald's bomber armour analysis: the returning aircraft were a survivorship-filtered sample." },
          { when: '2016 onward', what: 'Face recognition systems trained on unrepresentative image sets show large accuracy gaps across skin tone and gender.' },
          { when: 'Ongoing', what: 'Credit and hiring models trained only on accepted applicants, never observing the counterfactual outcomes of those rejected.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Sampling variability you can watch',
        caption: 'Flip a biased coin and estimate p from small samples. The estimates scatter widely at n = 10 and tighten at n = 1000 — but if the coin you are flipping is not the coin you care about, no amount of flipping helps.',
        widget: 'coin-flip-sim',
      },
    ],

    formalDefinition:
      'A population is the set of units about which inference is desired, characterised by parameters such as mu and sigma. A sample is a subset drawn from a sampling frame, and a statistic is any function of the sample used to estimate a parameter. A sampling scheme is unbiased for a statistic if the expectation of that statistic over repeated sampling equals the corresponding population parameter. Simple random sampling gives every subset of a given size equal probability of selection; stratified sampling partitions the population and samples independently within strata, which reduces variance when strata are internally homogeneous. Sampling bias is a non-zero difference between the expectation of the statistic and the parameter that persists as the sample size grows without bound.',

    math: {
      intuition:
        'Error in an estimate has two parts that behave completely differently. The random part shrinks predictably as you collect more data, at a rate governed by the square root of the sample size — which is also why quadrupling your data only halves your error. The systematic part does not shrink at all, because it is built into how the sample was chosen. Total error is the combination, and once bias dominates, extra data buys you nothing but false confidence.',
      formulas: [
        {
          latex: '\\operatorname{SE}(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}',
          name: 'Standard error of the mean',
          meaning:
            'How much a sample mean typically differs from the population mean purely by chance. It falls with the square root of the sample size.',
          variables: [
            { symbol: '\\sigma', meaning: 'the population standard deviation of the individual observations' },
            { symbol: 'n', meaning: 'the sample size' },
            { symbol: '\\sqrt{n}', meaning: 'the square root, which is why quadrupling the sample halves the standard error' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\operatorname{Bias}(\\hat{\\theta}) = E[\\hat{\\theta}] - \\theta',
          name: 'Bias of an estimator',
          meaning:
            'The systematic gap between what your estimation procedure gives on average and the truth. Sampling bias makes this non-zero no matter how large n becomes.',
          variables: [
            { symbol: '\\hat{\\theta}', meaning: 'the estimate computed from the sample' },
            { symbol: '\\theta', meaning: 'the true population parameter' },
            { symbol: 'E[\\hat{\\theta}]', meaning: 'the average of the estimate over many repetitions of the whole sampling procedure' },
          ],
          category: 'statistics',
        },
        {
          latex: 'E\\bigl[(\\hat{\\theta} - \\theta)^2\\bigr] = \\operatorname{Bias}(\\hat{\\theta})^2 + \\operatorname{Var}(\\hat{\\theta})',
          name: 'Mean squared error decomposition',
          meaning:
            'Total expected squared error splits into a systematic part and a random part. Only the second term falls as the sample grows.',
          variables: [
            { symbol: '\\operatorname{Bias}^2', meaning: 'the squared systematic error, which is unaffected by sample size' },
            { symbol: '\\operatorname{Var}(\\hat{\\theta})', meaning: 'the sampling variance, which falls like 1/n' },
          ],
          category: 'statistics',
        },
        {
          latex: 'n \;\\approx\; \\left(\\frac{z\\,\\sigma}{E}\\right)^{2}',
          name: 'Sample size for a target margin of error',
          meaning:
            'How many observations you need to estimate a mean to within a chosen margin. Note the square: halving the margin costs four times the data.',
          variables: [
            { symbol: 'E', meaning: 'the margin of error you are willing to accept' },
            { symbol: 'z', meaning: 'the standard normal critical value, 1.96 for 95% confidence' },
            { symbol: '\\sigma', meaning: 'the population standard deviation, usually estimated from a pilot sample' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Why does the standard error involve a square root? Write the sample mean as (1/n) times the sum of the observations.',
        'Each observation is independent with variance sigma squared.',
        'Variance of a sum of independent variables is the sum of the variances, so the sum has variance n sigma squared.',
        'Var(aX) = a^2 Var(X), and here a = 1/n, so the sample mean has variance (1/n^2)(n sigma^2) = sigma^2/n.',
        'Taking the square root gives the standard deviation of the sample mean: sigma over root n.',
        'The practical consequence is brutal and worth internalising: to halve your uncertainty you need four times the data, and to get one more decimal place you need a hundred times as much.',
        'None of this argument touches bias, because every step assumed the observations were drawn from the population of interest. If they were not, the expectation itself is wrong and no value of n repairs it.',
      ],
    },

    workedExample: {
      title: 'Estimating model accuracy from a test set that was not random',
      setup:
        'A team builds an image classifier and reports 94% accuracy on a held-out test set of 2,000 images. The dataset was assembled by scraping images uploaded between January and March; the model will be deployed year-round on user photos. We will quantify the random error, then reason about the systematic error, and see which one dominates.',
      steps: [
        {
          label: 'Quantify the random error',
          detail:
            'Accuracy on n independent test images is a proportion, whose standard error is the square root of p(1-p)/n.',
          latex: '\\operatorname{SE} = \\sqrt{\\frac{0.94 \\times 0.06}{2000}} = \\sqrt{0.0000282} \\approx 0.0053',
        },
        {
          label: 'Turn it into an interval',
          detail: 'Roughly two standard errors either side gives the range that random variation alone would produce.',
          latex: '0.94 \\pm 1.96(0.0053) = [0.9296,\; 0.9504]',
        },
        {
          label: 'Note how small that is',
          detail:
            'The random uncertainty is about one percentage point. A team looking only at this would conclude the estimate is precise to within a point.',
          latex: '\\pm 1.04 \\text{ percentage points}',
        },
        {
          label: 'Now ask what the sample actually represents',
          detail:
            'Images from January to March are winter images in the northern hemisphere: different lighting, different clothing, different scenes. The sampling frame is not the deployment population.',
          latex: '\\text{frame} \\ne \\text{population}',
        },
        {
          label: 'Estimate the systematic error',
          detail:
            'Suppose true summer accuracy is 88% and the deployment year is split evenly. The real annual accuracy is the average, 91%, so the test estimate is systematically 3 points too high — three times the entire random uncertainty.',
          latex: '\\text{true} = \\tfrac{0.94 + 0.88}{2} = 0.91, \\qquad \\text{bias} = +0.03',
        },
        {
          label: 'Ask what more data would do',
          detail:
            'Scraping 200,000 winter images instead of 2,000 shrinks the standard error by a factor of ten, to 0.05 percentage points. The 3-point bias is untouched. The interval becomes tighter and stays wrong.',
          latex: '\\operatorname{SE} \\to 0.00053, \\qquad \\text{bias} \\to 0.03',
        },
        {
          label: 'Fix it by changing the design, not the size',
          detail:
            'Stratify by month and sample within each, so every season is represented in proportion to deployment traffic. This costs nothing in sample size and removes the bias entirely.',
          latex: '\\hat{p}_{\\text{strat}} = \\sum_{h} w_h \\hat{p}_h',
        },
      ],
      conclusion:
        'The random error was ±1.0 points and the systematic error was +3.0 points, so the headline number was wrong by three times its own stated uncertainty — and the confidence interval gave no hint of it, because a confidence interval only describes sampling variability. The remedy was a change of design rather than a change of scale. Whenever you see a very tight interval around a number that feels too good, the question to ask is not "is n large enough" but "what was excluded".',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Noise shrinks with n; bias does not',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)
population = rng.normal(loc=100, scale=15, size=1_000_000)
truth = population.mean()

print(f"true population mean = {truth:.3f}\\n")
print("     n   random sample   biased sample (top half only)")
for n in [100, 1_000, 10_000, 100_000]:
    fair = rng.choice(population, n, replace=False).mean()
    upper = population[population > truth]
    biased = rng.choice(upper, n, replace=False).mean()
    print(f"{n:>6}   {fair:12.3f}   {biased:21.3f}")`,
        output: `true population mean = 99.987

     n   random sample   biased sample (top half only)
   100        100.877                   111.933
  1000        100.147                   111.981
 10000         99.963                   111.966
100000         99.999                   111.968`,
        explanation:
          'The random sample converges on the truth as n grows, exactly as the standard error predicts. The biased sample converges too — but on 111.97, a value that is not the population mean and never will be. This is the single most important idea in the unit: more data reduces variance and does nothing whatsoever to bias. A biased estimate with a huge sample is simply a confidently wrong estimate.',
      },
      {
        language: 'python',
        title: 'Stratified splitting when a class is rare',
        runnable: true,
        code: `import numpy as np
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(0)
n = 2000
y = (rng.random(n) < 0.02).astype(int)      # 2% positive class
X = rng.normal(size=(n, 3))

for name, strat in [("random    ", None), ("stratified", y)]:
    rates = []
    for seed in range(5):
        _, _, ytr, yte = train_test_split(
            X, y, test_size=0.25, random_state=seed, stratify=strat)
        rates.append(yte.mean())
    print(f"{name}: test positive rate across 5 splits = "
          f"{[round(r, 4) for r in rates]}")`,
        output: `random    : test positive rate across 5 splits = [0.028, 0.014, 0.024, 0.012, 0.022]
stratified: test positive rate across 5 splits = [0.02, 0.02, 0.02, 0.02, 0.02]`,
        explanation:
          'With a 2% positive class, a random 500-row test set contains about 10 positives, and that count swings between 6 and 14 across seeds — so measured recall swings wildly for reasons that have nothing to do with the model. Stratifying pins the class balance in every split, which removes a large source of evaluation noise at no cost. This is why `stratify=y` should be the default for any classification problem with imbalance, and why `StratifiedKFold` exists.',
      },
      {
        language: 'python',
        title: 'A leaky split: grouped data sampled as if independent',
        runnable: true,
        code: `import numpy as np
from sklearn.model_selection import train_test_split, GroupShuffleSplit
from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(0)
# 200 patients, 10 near-identical scans each.
patient = np.repeat(np.arange(200), 10)
signal = rng.normal(size=200)[patient]
X = (signal + rng.normal(scale=0.05, size=2000)).reshape(-1, 1)
y = (rng.normal(size=200) + signal > 0).astype(int)[patient]

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=0)
naive = LogisticRegression().fit(Xtr, ytr).score(Xte, yte)

gss = GroupShuffleSplit(test_size=0.3, n_splits=1, random_state=0)
tr, te = next(gss.split(X, y, groups=patient))
grouped = LogisticRegression().fit(X[tr], y[tr]).score(X[te], y[te])

print(f"row-wise split (leaky)   : {naive:.3f}")
print(f"patient-wise split (fair): {grouped:.3f}")`,
        output: `row-wise split (leaky)   : 0.938
patient-wise split (fair): 0.850`,
        explanation:
          'A row-wise split puts scans from the same patient into both training and test, so the model can memorise patients rather than learn the condition, and the reported score is inflated by nine points. Splitting by patient — with `GroupShuffleSplit` or `GroupKFold` — asks the question that deployment will actually ask: how does this perform on a person it has never seen? The same issue arises with multiple sessions per user, multiple frames per video, and time series, where the only honest split is chronological.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The 1936 Literary Digest poll',
        usage:
          'A sample of 2.4 million respondents drawn from car registrations and telephone directories predicted a Landon landslide; Roosevelt won 46 of 48 states. The frame over-represented the wealthy during the Depression. Gallup called it correctly with 50,000 well-chosen respondents.',
      },
      {
        context: 'Facial recognition accuracy gaps',
        usage:
          'The 2018 Gender Shades study found error rates up to 34% for darker-skinned women against under 1% for lighter-skinned men, largely because the benchmark training sets were overwhelmingly light-skinned and male. The models were not broken; the sample was.',
      },
      {
        context: 'Credit scoring and the rejected applicants',
        usage:
          'A lender only observes repayment for applicants it approved, so the training data is filtered by the previous model\'s decisions. Naively retraining entrenches those decisions, which is why "reject inference" methods and deliberate random approvals exist.',
      },
      {
        context: 'Evaluating on the wrong slice',
        usage:
          'A model that is 95% accurate overall can be 60% accurate on a subgroup making up 5% of traffic, and the aggregate metric will never reveal it. Stratified evaluation by subgroup is how that failure gets caught before deployment does.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`train_test_split(stratify=y)`, `StratifiedKFold`, `GroupKFold` and `TimeSeriesSplit` encode the four sampling designs evaluation actually needs.' },
      { tool: 'pandas', role: '`DataFrame.sample` with `weights` for weighted resampling; `groupby().size()` for checking sample composition against a benchmark.' },
      { tool: 'imbalanced-learn', role: 'Resampling strategies for class imbalance, which change the training distribution deliberately and must never be applied to the test set.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing a large sample is automatically a good sample',
        why: 'Bias does not shrink with n. The Literary Digest surveyed 2.4 million people and got the 1936 election spectacularly wrong, while Gallup succeeded with 50,000 chosen properly.',
        fix: 'Interrogate the selection mechanism before the sample size. Ask who could not have been selected, and whether that correlates with what you are measuring.',
      },
      {
        mistake: 'Random-splitting grouped or temporal data',
        why: 'Rows from the same patient, user or session are not independent, so a random split leaks information across the boundary and inflates the score. For time series it lets the model see the future.',
        fix: 'Use `GroupKFold` when rows share an entity and `TimeSeriesSplit` when order matters. The split must mirror the prediction task you will face in deployment.',
      },
      {
        mistake: 'Applying resampling or scaling before the split',
        why: 'Oversampling the minority class before splitting puts copies of the same rows in both training and test, so the test score measures memorisation. Fitting a scaler on everything leaks the test distribution.',
        fix: 'Split first, always. Put every fitted transformation inside a `Pipeline` so it is refitted within each fold automatically.',
      },
      {
        mistake: 'Ignoring non-response',
        why: 'The people who decline a survey, or the sessions that drop out before the outcome is recorded, are usually systematically different from those who remain. Silently dropping them is survivorship bias.',
        fix: 'Record and report the response rate. Compare respondents against known population benchmarks and weight, or state explicitly what the missing group might change.',
      },
      {
        mistake: 'Confusing an unrepresentative test set with a hard problem',
        why: 'When deployment accuracy falls well below test accuracy, the instinct is to blame the model and retrain. Frequently the test set simply did not resemble production traffic.',
        fix: 'Compare the feature distributions of the test set against a live sample before touching the model. Drift detection exists precisely because this is the more common explanation.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is sampling bias, and why does collecting more data not fix it?',
        answer:
          'Sampling bias is a systematic difference between your sample and the population it is meant to represent, produced by the selection mechanism rather than by chance. Total error decomposes into squared bias plus variance; increasing n reduces the variance term like 1/n but leaves the bias term untouched, so a larger biased sample converges — on the wrong number. The Literary Digest poll of 1936 is the canonical case: 2.4 million responses drawn from car and telephone registers, during the Depression, produced a confident and badly wrong prediction, while Gallup was right with 50,000 respondents chosen to be representative. In machine learning the same pattern appears when a test set is scraped differently from how production data arrives, or when training data is filtered by a previous model\'s decisions. The fix is always a change of design — random or stratified selection, reweighting, or deliberately sampling the excluded group — never a change of scale.',
        followUp:
          'A strong answer notes that confidence intervals quantify only the variance term, so a tight interval provides no evidence whatsoever against bias.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you construct a train/test split for a dataset of medical images with multiple scans per patient?',
        answer:
          'Split by patient, not by image. If scans from one patient land in both sets, the model can recognise that individual rather than the condition, and the test score measures memorisation — in a simple simulation this inflates accuracy by roughly nine points. I would use `GroupKFold` or `GroupShuffleSplit` with the patient identifier as the group, which guarantees every patient appears in exactly one fold. I would also stratify by the outcome where possible so that class balance is preserved across folds, which matters a great deal when the positive class is rare. Beyond that I would check for other leakage channels that patient grouping does not cover: scanner or site identifiers, since a model can learn to recognise a hospital whose case mix differs; and acquisition date, if practice changed over time, in which case a chronological split is the honest test. The principle throughout is that the split should mirror the deployment question — performance on a patient never seen before, at a site that may also be new.',
      },
      {
        level: 'advanced',
        question: 'A model performs far worse in production than on the test set. Walk through how you would diagnose it.',
        answer:
          'I would work from cheapest to most expensive, and I would assume a data problem before a model problem because that is usually where it is. First, leakage in evaluation: check whether the split respected groups and time, whether any preprocessing was fitted before splitting, and whether any feature is unavailable or computed differently at inference time — a feature built from a field populated after the outcome is the classic case. Second, sampling bias in the test set: compare the feature and label distributions of the test set against a live production sample, per feature, and look at the composition by segment. Third, genuine drift: even a well-built test set goes stale, so I would check whether input distributions have moved since collection and whether the relationship between features and label has changed, which is the harder covariate-shift versus concept-drift distinction. Fourth, serving skew: confirm the production pipeline computes features identically to training, since a units mismatch or a different null-handling rule produces exactly this symptom. Finally, segment the production errors — by user cohort, device, region, time of day — because a large aggregate gap is often one badly served segment rather than uniform degradation. The order matters: the first two are free to check and account for most cases.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A university surveys students about course satisfaction by posting a link in the online portal. 800 respond out of 12,000. Identify two distinct sources of bias and propose a design that addresses each.',
        hint: 'Think about who reaches the portal, and who bothers to answer once they do.',
        solution:
          'Two distinct biases.\n\n1. Coverage bias in the frame. Students who no longer engage with the portal — the disengaged, those who have effectively dropped out, those with poor connectivity — have little chance of ever seeing the link. Their satisfaction is almost certainly lower than average, so they are exactly the people whose absence distorts the result. Fix: use the full enrolment register as the frame and contact a random sample through a channel everyone has, such as registered email or post, with follow-ups.\n\n2. Non-response (self-selection) bias. Among those who see it, people with strong opinions — usually the very satisfied and the very angry — are far more likely to respond than the indifferent middle. A 6.7% response rate means the result describes the opinionated, not the student body. Fix: draw a random sample of a manageable size, pursue it with reminders and a small incentive to raise the response rate, and compare respondents against known enrolment characteristics such as year, faculty and mode of study, reweighting where they differ.\n\nIn addition: stratify by faculty and year so that small programmes are represented, and report the response rate prominently alongside every figure.',
      },
      {
        prompt:
          'You need to estimate a population mean to within ±2 units with 95% confidence, and a pilot study suggests the standard deviation is about 15. How large a sample do you need? What if you want ±1?',
        hint: 'Use n = (z sigma / E)^2 and note what happens to n when E halves.',
        solution:
          'For E = 2: n = (1.96 x 15 / 2)^2 = (14.7)^2 = 216.1, so 217 observations, rounding up.\n\nFor E = 1: n = (1.96 x 15 / 1)^2 = (29.4)^2 = 864.4, so 865 observations.\n\nHalving the margin of error quadrupled the required sample, because the margin falls with the square root of n. This is the fundamental economics of data collection: the first few hundred observations buy most of the precision you will ever get, and each additional decimal place costs a hundredfold.\n\nTwo caveats. The formula uses the population standard deviation, which the pilot only estimates, so treat the answer as approximate and consider using a t critical value for small pilots. And none of this protects against bias: 865 badly chosen observations give a margin of ±1 around the wrong number.',
      },
      {
        prompt:
          'Demonstrate empirically that a random split of grouped data inflates measured accuracy relative to a group-aware split.',
        hint: 'Generate data where rows within a group are nearly identical, then compare `train_test_split` against `GroupShuffleSplit`.',
        language: 'python',
        starterCode:
          'import numpy as np\nfrom sklearn.model_selection import train_test_split, GroupShuffleSplit\nfrom sklearn.linear_model import LogisticRegression\n\nrng = np.random.default_rng(0)\ngroups = np.repeat(np.arange(200), 10)\n',
        solution:
          'Generate a per-group latent signal, repeat it across the ten rows of each group with a little noise, and derive the label from the group-level signal so that knowing the group nearly determines the label.\n\nWith a row-wise `train_test_split`, roughly 70% of each group\'s rows land in training and the rest in test, so for every test row there is a near-duplicate in training. The model effectively looks up the answer, and measured accuracy comes out around 0.94.\n\nWith `GroupShuffleSplit(groups=groups)`, every group is wholly in one side of the split, so the model must generalise to unseen groups and accuracy falls to around 0.85.\n\nThe nine-point gap is pure leakage — it exists in the evaluation, not in the model. The honest number is the second one, because in deployment every patient, user or video is a group the model has never seen. The same reasoning applies to k-fold: use `GroupKFold`, and for anything with a time order use `TimeSeriesSplit` so that the model is never trained on the future.',
      },
    ],

    quiz: [
      {
        id: 'STAT-012-q1',
        type: 'truefalse',
        concept: 'bias vs sample size',
        prompt: 'Collecting more data will eventually eliminate sampling bias.',
        answer: false,
        explanation:
          'Bias is a property of the selection mechanism, not of the sample size. More data shrinks the variance term and leaves the bias term untouched, producing a tighter interval around the wrong value.',
      },
      {
        id: 'STAT-012-q2',
        type: 'mcq',
        concept: 'survivorship bias',
        prompt:
          'A study of successful startups finds that 90% had a technical co-founder, and concludes this is the key to success. What is the flaw?',
        options: [
          'Failed startups are absent from the sample, so the rate among all startups is unknown',
          'The sample size is too small to be reliable',
          'Correlation between the two variables was not computed',
          'The study should have used a stratified sample of investors',
        ],
        answerIndex: 0,
        explanation:
          'This is survivorship bias. If 90% of failed startups also had a technical co-founder, the factor carries no information at all. You cannot evaluate a predictor of success by examining only the successes.',
      },
      {
        id: 'STAT-012-q3',
        type: 'numeric',
        concept: 'standard error',
        prompt:
          'A population has standard deviation 20. What is the standard error of the mean for a sample of 100?',
        answer: 2,
        tolerance: 0.05,
        explanation:
          'SE = sigma/sqrt(n) = 20/10 = 2. To halve this to 1 you would need 400 observations, because the standard error falls with the square root of the sample size.',
      },
      {
        id: 'STAT-012-q4',
        type: 'match',
        concept: 'sampling designs',
        prompt: 'Match each sampling approach to its defining feature.',
        pairs: [
          { left: 'Simple random', right: 'Every unit has an equal chance of selection' },
          { left: 'Stratified', right: 'The population is split into groups and each is sampled' },
          { left: 'Cluster', right: 'Whole groups are selected and fully measured' },
          { left: 'Convenience', right: 'Whoever is easiest to reach is included' },
        ],
        explanation:
          'Stratified sampling guarantees representation of subgroups and reduces variance; cluster sampling saves cost but correlates units within a cluster; convenience sampling is cheap and provides no basis for inference.',
      },
      {
        id: 'STAT-012-q5',
        type: 'multi',
        concept: 'splitting data',
        prompt: 'Which of these would you use to avoid an over-optimistic evaluation? Select all that apply.',
        options: [
          'Stratify the split by the target when a class is rare',
          'Split by patient identifier when there are multiple scans per patient',
          'Split chronologically for time-series data',
          'Oversample the minority class before splitting',
          'Fit the scaler on the full dataset before splitting',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'The last two are leakage. Oversampling before splitting places duplicates of the same rows on both sides, and fitting a scaler on everything lets the test distribution influence training. Both must happen after the split, ideally inside a Pipeline.',
      },
      {
        id: 'STAT-012-q6',
        type: 'explain',
        concept: 'diagnosing a bad sample',
        prompt:
          'A recommendation model tested at 0.31 click-through rate is deployed and achieves 0.19. The test set was built from logged interactions of users who clicked at least once last month. Explain what likely went wrong.',
        rubric: [
          'Identifies that the test population was filtered to already-engaged users',
          'Explains that the deployment population includes less engaged users not represented in the test set',
          'Proposes a fix such as sampling from the full user base or a randomised holdout of traffic',
        ],
        sampleAnswer:
          'The test set was drawn from users who clicked at least once last month, which is a filter on the very behaviour being predicted. Those users are more engaged than average by construction, so the measured click-through rate describes the easy part of the population, and deployment adds everyone else — dormant users, new users with no history, people who browse without clicking. The gap is not model degradation; the model was never measured on the population it now faces. This is the same structure as Wald\'s bombers: the units that did not survive the filter are invisible, and the conclusion drawn from the survivors does not transfer. The fix is to evaluate on a sample drawn the way production traffic arrives — ideally a small randomised holdout of live traffic, which also gives an unbiased baseline for future comparisons — and to report the metric broken down by engagement segment so that a single aggregate number cannot hide a weak segment again. I would also check that the logging pipeline is not filtering impressions in some related way, since the same filter often appears twice.',
        explanation:
          'The answer must identify the selection mechanism specifically and explain why it correlates with the outcome being measured, rather than gesturing at bias in general.',
      },
    ],

    flashcards: [
      { front: 'Population vs sample vs parameter vs statistic', back: 'Population: everyone you care about. Sample: who you measured. Parameter: the true population value. Statistic: your sample-based estimate of it.' },
      { front: 'Why does more data not fix bias?', back: 'Error = bias squared + variance. More data shrinks variance like 1/n and leaves bias unchanged, so you converge confidently on the wrong answer.' },
      { front: 'What is survivorship bias?', back: 'Analysing only the units that passed some filter. Wald\'s bombers: armour the places where returning planes were undamaged, because those hits were fatal.' },
      { front: 'Standard error of the mean', back: 'sigma/sqrt(n). Quadrupling the sample halves the error, which is why precision gets expensive fast.' },
      { front: 'When do you stratify a split?', back: 'When a class or subgroup is rare enough that random splits would vary its representation materially. `stratify=y` in scikit-learn.' },
      { front: 'When do you split by group or by time?', back: 'By group when rows share an entity (patient, user, session); by time for time series. A random split leaks in both cases.' },
    ],

    challenge: {
      title: 'Build a sampling-bias detector',
      brief:
        'Write a tool that compares a sample against a reference population on every column: for numeric columns report the difference in means in units of the reference standard deviation, and for categorical columns report the difference in category proportions. Flag any column where the gap exceeds a threshold you choose and justify. Then demonstrate it by taking a deliberately biased sample from a synthetic population — for example filtering on one variable — and confirming that your tool flags not only that variable but also anything correlated with it.',
      language: 'python',
      acceptanceCriteria: [
        'Numeric and categorical columns are handled with appropriate, separately stated comparisons',
        'Differences are reported on a standardised scale so columns are comparable',
        'The demonstration shows the tool flagging a correlated column, not only the one that was filtered',
        'The output states which columns are suspect and by how much, not merely pass or fail',
      ],
      starterCode:
        'import pandas as pd\nimport numpy as np\n\ndef compare_to_population(sample: pd.DataFrame, population: pd.DataFrame,\n                          threshold: float = 0.1) -> pd.DataFrame:\n    """Per-column comparison of a sample against a reference population."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach sampling and sampling bias to someone who knows basic statistics. Make the bias-versus-noise distinction unmistakable, and connect it to how machine learning datasets are built.',
      mustCover: [
        'The difference between a population and a sample, and between a parameter and a statistic',
        'That random error shrinks with sample size and systematic error does not',
        'At least two named biases, such as selection and survivorship, with concrete examples',
        'That a train/test split is a sampling decision, and what goes wrong when groups or time are ignored',
      ],
      bonusSignals: [
        'uses the Literary Digest or Wald bomber example',
        'notes that a confidence interval says nothing about bias',
        'mentions stratified, group-aware or chronological splitting',
      ],
      sampleExplanation:
        'You rarely get to measure everything, so you measure a part and hope it resembles the whole. Whether it does depends entirely on how you chose that part, and this is where two completely different kinds of error live. The first is noise: even a perfectly fair sample will be a bit off from the population by luck, and that error shrinks in a predictable way — quadruple the sample and you halve the error. The second is bias: if the way you selected quietly favoured some members over others, your sample is the wrong shape, and here is the part that matters, collecting more of it does not help at all. In 1936 a magazine polled two point four million people and predicted the wrong winner by a landslide, because it sampled from car and telephone registers during the Depression; Gallup got it right with fifty thousand people chosen properly. More data made the magazine more confident and no more correct. The most elegant example of bias is Abraham Wald\'s. Asked where to armour bombers, the military pointed at the bullet holes on returning planes. Wald pointed out that those were the planes that came back — the ones hit in the engines were at the bottom of the sea — so the armour belonged exactly where the survivors showed no damage. Now bring this to machine learning, where it is the same problem wearing different clothes. Your test set is a sample, and it only tells you about deployment if it was drawn the way deployment data arrives. If your images are all from winter, your accuracy estimate is about winter. If you split rows randomly when ten scans belong to one patient, the model memorises patients and your score is inflated. If your data comes only from users who already clicked, you have Wald\'s bombers. And notice that no confidence interval will warn you about any of this, because an interval measures only the noise.',
    },
  },

  {
    id: 'STAT-013',
    domain: 'STAT',
    module: 'Sampling & Inference',
    topic: 'The central limit theorem',
    title: 'The Central Limit Theorem',
    slug: 'central-limit-theorem',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['STAT-010', 'STAT-012'],
    related: ['STAT-006', 'STAT-008', 'STAT-010'],
    tags: ['central limit theorem', 'sampling distribution', 'standard error', 'law of large numbers'],

    learningObjectives: [
      'State the central limit theorem precisely, including what it says about the mean, the spread and the shape',
      'Distinguish the sampling distribution of a statistic from the distribution of the raw data',
      'Compute a standard error and explain the square-root-of-n relationship and its cost',
      'Say what the theorem does not promise: when it fails, how fast it converges, and what it never claims about raw data',
    ],

    terminology: [
      {
        term: 'Sampling distribution',
        definition:
          'The distribution of a statistic — usually the sample mean — over all possible samples of a given size from a population. It is a distribution of estimates, not of observations.',
        simple: 'If you repeated the whole study many times, the spread of answers you would get.',
      },
      {
        term: 'Standard error',
        definition:
          'The standard deviation of a sampling distribution. For the sample mean it is sigma over the square root of n.',
        simple: 'How much your estimate would wobble if you redid the study.',
      },
      {
        term: 'Central limit theorem',
        definition:
          'The sampling distribution of the mean of n independent, identically distributed observations with finite variance approaches a normal distribution as n grows, whatever the shape of the population.',
        simple: 'Averages become bell-shaped even when the thing you are averaging is not.',
      },
      {
        term: 'Law of large numbers',
        definition:
          'The sample mean converges to the population mean as n grows. It says where the estimate lands; the central limit theorem says how it is scattered around that point.',
        simple: 'With enough data the average settles on the truth.',
      },
      {
        term: 'Convergence rate',
        definition:
          'How quickly the sampling distribution approaches normality. It depends on the skewness and kurtosis of the population, not only on n.',
        simple: 'How much data you need before the bell shape actually appears.',
      },
    ],

    simpleExplanation:
      'Here is a result that ought to be impossible. Take any population at all — incomes with a monstrous right tail, a coin that is either 0 or 1, waiting times that pile up near zero — and draw a sample from it, then compute the average. Do that many times and plot those averages. Regardless of what the original data looked like, the averages form a bell curve. The individual values can be as lopsided as you like and the averages come out symmetric and normal. The reason is that averaging is summing, and extreme values in a sum have to be cancelled by ordinary ones to survive; a sample average is only extreme if most of its members conspired, which is rare. Two things follow, and they are the foundation of everything in the next two units. First, the averages centre on the true population mean. Second, their spread is the population spread divided by the square root of the sample size — so uncertainty shrinks as you collect more, but slowly, and you need four times the data to halve it.',

    whyItExists:
      'Without it, every inference would require knowing the exact distribution of the population, which is never available. The theorem lets you compute standard errors, confidence intervals and hypothesis tests for the mean of essentially any population, which is why the same handful of procedures works across every field that uses statistics.',

    analogy: {
      scenario:
        'Imagine a town where most people earn a modest wage and a few earn enormous sums, so a histogram of incomes is a tall spike near the left with a long thin tail stretching right. Now send out surveyors, each of whom stops 50 random people and reports the average income of their 50. Most surveyors will meet 50 ordinary earners and report something close to the typical average. A surveyor who happens to catch one millionaire will report higher, but that one salary is divided by 50, so it moves the average far less than it moved the raw histogram. To report a really extreme average, a surveyor would need several millionaires in one group of 50, which almost never happens. Collect all the surveyors\' reports and they form a symmetric bell — from a population that was anything but.',
      mapping: [
        { from: 'The lopsided income histogram', to: 'The population distribution, which can be any shape' },
        { from: 'One surveyor stopping 50 people', to: 'One sample of size n = 50' },
        { from: 'That surveyor\'s reported average', to: 'One draw from the sampling distribution of the mean' },
        { from: 'The histogram of all surveyors\' reports', to: 'The sampling distribution, which is approximately normal' },
        { from: 'A millionaire\'s salary being divided by 50', to: 'Why extremes are damped: dividing by n shrinks every contribution' },
        { from: 'Needing several millionaires to move the average', to: 'Why the tails of the sampling distribution are thin' },
      ],
      bridge:
        'The damping is exactly the square-root-of-n rule. Each observation contributes 1/n of its deviation, and because the deviations are independent they partly cancel, so the standard deviation of the average is sigma/root n rather than sigma/n or sigma. The analogy also makes the failure case visible: if one person in the town earned more than everybody else combined, no amount of averaging would damp them, and that is precisely the condition — infinite or near-infinite variance — under which the theorem does not apply.',
      limitations:
        'The story assumes surveyors sample independently and that the town does not change while they work. If surveyors all work one wealthy street, or if incomes shift mid-survey, the sampling distribution is still centred somewhere but no longer on the town\'s true mean. The theorem addresses noise, never bias.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Run the theorem yourself',
        caption: 'Pick a deliberately hideous population — heavily skewed, or a two-humped mixture — then increase the sample size and watch the histogram of sample means straighten into a bell while the population histogram stays exactly as ugly as it was.',
        widget: 'clt-sim',
      },
      {
        kind: 'compare',
        title: 'The population distribution versus the sampling distribution',
        caption: 'Confusing these two is the single most common misunderstanding of the theorem.',
        left: {
          heading: 'Distribution of the data',
          points: [
            'One dot per observation',
            'Whatever shape the world produced: skewed, bimodal, discrete',
            'Spread is sigma, the population standard deviation',
            'Does not change shape as you collect more data',
            'Example: individual incomes, heavily right-skewed',
          ],
        },
        right: {
          heading: 'Sampling distribution of the mean',
          points: [
            'One dot per *sample*, each dot an average of n observations',
            'Approximately normal once n is reasonably large',
            'Spread is sigma/root n, the standard error',
            'Narrows as n grows, and becomes more bell-shaped',
            'Example: average income of 500 randomly chosen people',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'What the theorem actually asserts',
        caption: 'Three claims, and they are about different things.',
        steps: [
          { label: 'Centre', detail: 'The sampling distribution of the mean is centred on the true population mean mu. The estimator is unbiased.' },
          { label: 'Spread', detail: 'Its standard deviation — the standard error — is sigma divided by the square root of n.' },
          { label: 'Shape', detail: 'Its shape approaches normal as n grows, whatever shape the population had.' },
          { label: 'Conditions', detail: 'Observations independent, identically distributed, and the population variance finite.' },
          { label: 'What it does not say', detail: 'Nothing about the raw data becoming normal, and nothing about bias.' },
        ],
      },
      {
        kind: 'table',
        title: 'How large must n be? It depends on the population',
        caption: 'The "n = 30" rule of thumb is a convenience, not a theorem, and it fails badly on heavy tails.',
        columns: ['Population shape', 'Example', 'Roughly adequate n', 'Why'],
        rows: [
          ['Already normal', 'Measurement error', '1', 'The mean of normals is exactly normal at any n'],
          ['Symmetric, light tails', 'Uniform, fair die', '5 to 10', 'Symmetry means nothing to correct'],
          ['Moderately skewed', 'Exponential waiting times', '30 to 50', 'The skew of the mean falls like 1/root n'],
          ['Heavily skewed', 'Income, latency, log-normal', 'hundreds to thousands', 'Rare extreme values dominate until n is large'],
          ['Rare binary events', 'p = 0.001 conversions', 'np at least 10, so n above 10,000', 'Otherwise most samples contain no events at all'],
          ['Infinite variance', 'Cauchy, some power laws', 'Never', 'The theorem does not apply; the mean of Cauchy is Cauchy'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of the standard error',
        subject: 'SE = sigma / sqrt(n)',
        annotations: [
          { part: 'sigma', note: 'The population standard deviation. More variable data means a noisier estimate, proportionally.' },
          { part: 'n', note: 'The sample size. It is the only part you control.' },
          { part: 'sqrt', note: 'The square root is the expensive part: to halve the error you need four times the data.' },
          { part: 'SE', note: 'The typical distance between your sample mean and the truth. Not the spread of the data — the spread of the estimate.' },
        ],
      },
    ],

    formalDefinition:
      'Let X_1 through X_n be independent and identically distributed random variables with finite mean mu and finite variance sigma squared. Let X-bar_n denote their average. Then the standardised quantity root n times (X-bar_n - mu) divided by sigma converges in distribution to the standard normal as n tends to infinity. Equivalently, for large n the sample mean is approximately normal with mean mu and standard deviation sigma over root n. The result requires finite variance but makes no assumption whatsoever about the shape of the underlying distribution; the Berry-Esseen theorem bounds the approximation error by a constant times the third absolute moment divided by sigma cubed times root n, which is why skewed populations converge more slowly.',

    math: {
      intuition:
        'Two separate facts are being combined. The law of large numbers says the sample mean homes in on the population mean — it tells you where. The central limit theorem tells you how the estimate is scattered around that point, and remarkably, the scatter has the same bell shape regardless of the population. The reason is cancellation: a sample mean can only be extreme if many of its observations are extreme in the same direction, and independent observations rarely conspire. That is also why the standard error has a square root in it: the deviations partly cancel, so the total error grows like root n while the number of observations grows like n, and the average error therefore falls like 1 over root n.',
      formulas: [
        {
          latex: '\\bar{X}_n \;\\xrightarrow{\;d\;}\; N\\!\\left(\\mu,\; \\frac{\\sigma^2}{n}\\right) \\quad \\text{as } n \\to \\infty',
          name: 'Central limit theorem',
          meaning:
            'For large n the sample mean behaves like a normal variable centred on the population mean with variance sigma squared over n, whatever the population looked like.',
          variables: [
            { symbol: '\\bar{X}_n', meaning: 'the sample mean of n independent observations' },
            { symbol: '\\mu', meaning: 'the population mean, which the sampling distribution is centred on' },
            { symbol: '\\sigma^2', meaning: 'the population variance of a single observation' },
            { symbol: '\\sigma^2/n', meaning: 'the variance of the sample mean, which shrinks as the sample grows' },
            { symbol: '\\xrightarrow{d}', meaning: 'convergence in distribution: the shape approaches normal, it does not become exactly normal at finite n' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\operatorname{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}, \\qquad \\widehat{\\operatorname{SE}} = \\frac{s}{\\sqrt{n}}',
          name: 'Standard error of the mean',
          meaning:
            'The standard deviation of the sampling distribution. In practice sigma is unknown, so the sample standard deviation s is substituted.',
          variables: [
            { symbol: '\\sigma', meaning: 'the population standard deviation of individual observations' },
            { symbol: 's', meaning: 'the sample standard deviation, used as an estimate of sigma' },
            { symbol: 'n', meaning: 'the sample size' },
          ],
          category: 'statistics',
        },
        {
          latex: 'Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \;\\xrightarrow{\;d\;}\; N(0, 1)',
          name: 'Standardised form',
          meaning:
            'Standardising the sample mean by its own standard error gives a quantity that is approximately standard normal — the basis of every z-test and z-interval.',
          variables: [
            { symbol: 'Z_n', meaning: 'the standardised sample mean: how many standard errors the estimate sits from the truth' },
            { symbol: '\\sigma/\\sqrt{n}', meaning: 'the standard error, used here as the natural unit of distance' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\operatorname{SE}(\\hat{p}) = \\sqrt{\\frac{p(1-p)}{n}}',
          name: 'Standard error of a proportion',
          meaning:
            'The special case for binary outcomes, since a proportion is just the mean of zeros and ones with population variance p(1 - p).',
          variables: [
            { symbol: '\\hat{p}', meaning: 'the observed sample proportion' },
            { symbol: 'p', meaning: 'the true population proportion' },
            { symbol: 'p(1-p)', meaning: 'the variance of a single Bernoulli trial, maximised at p = 0.5' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\bigl|F_n(x) - \\Phi(x)\\bigr| \;\\le\; \\frac{C\\,\\rho}{\\sigma^3\\sqrt{n}}',
          name: 'Berry-Esseen bound',
          meaning:
            'A precise statement of how fast the approximation improves. The error falls like one over root n but is scaled by the population skewness, which is why skewed data need far more of it.',
          variables: [
            { symbol: 'F_n', meaning: 'the true CDF of the standardised sample mean at sample size n' },
            { symbol: '\\Phi', meaning: 'the standard normal CDF it is approaching' },
            { symbol: '\\rho', meaning: 'the third absolute central moment of the population — a measure of asymmetry and tail weight' },
            { symbol: 'C', meaning: 'a universal constant, known to be below 0.5' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Why sigma over root n? Start with the sample mean written as (1/n) times the sum of X_1 through X_n.',
        'Each observation has variance sigma squared, and they are independent, so the variance of the sum is n sigma squared.',
        'The scaling rule says Var(aX) = a^2 Var(X). Here a is 1/n.',
        'So Var(X-bar) = (1/n^2)(n sigma^2) = sigma^2/n.',
        'Taking the square root gives the standard error, sigma over root n.',
        'Notice where independence entered: it is the step where variances were allowed to add. If observations are correlated — repeated measurements on the same user, or autocorrelated time series — the variance of the sum includes covariance terms and the true standard error is larger, sometimes by a great deal.',
        'For the shape claim, the standard proof takes the characteristic function of the standardised sum, expands it to second order, and shows the limit is exp(-t^2/2), which is the characteristic function of the standard normal. What matters for intuition is that only the first two moments survive the limit, which is exactly why the population shape stops mattering.',
      ],
    },

    workedExample: {
      title: 'A deliberately hideous population, averaged',
      setup:
        'Consider a population of session durations that is about as far from normal as you can arrange: 90% of sessions last around 5 seconds and 10% last around 300 seconds. The distribution has two separated humps, is violently right-skewed, and no single observation ever lands near the mean. We will compute the population parameters exactly, then see what happens to the sample mean at increasing sample sizes.',
      steps: [
        {
          label: 'Population mean, by the weighted-sum definition',
          detail: 'Expectation is a probability-weighted average, so mix the two components by their weights.',
          latex: '\\mu = 0.9(5) + 0.1(300) = 4.5 + 30 = 34.5 \\text{ seconds}',
        },
        {
          label: 'Note that the mean describes nobody',
          detail: 'No session lasts 34.5 seconds. The mean sits in the empty valley between the two humps, which is exactly why this population is a good test case.',
          latex: '34.5 \\notin \\{\\approx 5\\} \\cup \\{\\approx 300\\}',
        },
        {
          label: 'Population variance, via E[X squared] minus the square of the mean',
          detail: 'Treating the two components as concentrated at 5 and 300 for simplicity.',
          latex: 'E[X^2] = 0.9(25) + 0.1(90000) = 22.5 + 9000 = 9022.5',
        },
        {
          label: 'Finish the variance and the standard deviation',
          detail: 'Subtract the square of the mean.',
          latex: '\\sigma^2 = 9022.5 - 34.5^2 = 9022.5 - 1190.25 = 7832.25, \\qquad \\sigma \\approx 88.5',
        },
        {
          label: 'Standard error at n = 100',
          detail: 'Divide the population standard deviation by the square root of the sample size.',
          latex: '\\operatorname{SE}_{100} = \\frac{88.5}{\\sqrt{100}} = 8.85 \\text{ seconds}',
        },
        {
          label: 'Standard error at n = 10,000',
          detail: 'A hundredfold increase in data gives a tenfold reduction in standard error — the square-root penalty in action.',
          latex: '\\operatorname{SE}_{10000} = \\frac{88.5}{100} = 0.885 \\text{ seconds}',
        },
        {
          label: 'Build an interval at n = 10,000',
          detail:
            'By the theorem the sample mean is approximately normal, so about 95% of samples give a mean within two standard errors of the truth.',
          latex: '34.5 \\pm 1.96(0.885) = [32.77,\; 36.23]',
        },
        {
          label: 'Ask how large n must be here',
          detail:
            'At n = 100 the sample contains on average 10 long sessions, and that count varies between roughly 4 and 17, so the sample mean is still visibly right-skewed. By n = 10,000 there are about 1,000 long sessions and the skew of the mean has fallen by a factor of ten. Bimodality in the population is irrelevant; what governs the rate is the skewness.',
          latex: '\\text{skew}(\\bar{X}_n) = \\frac{\\text{skew}(X)}{\\sqrt{n}}',
        },
      ],
      conclusion:
        'The population is bimodal and wildly skewed, and yet the sample mean at n = 10,000 is approximately normal with mean 34.5 and standard error 0.885 seconds. Note precisely what did and did not happen: the raw session durations are exactly as ugly as they were, and no amount of data will change that. It is the average that became well behaved. Note also the cost of precision — moving from ±8.85 to ±0.885 seconds required a hundredfold increase in data.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The theorem demonstrated on three awful populations',
        runnable: true,
        code: `import numpy as np
from scipy import stats

rng = np.random.default_rng(0)
trials = 20_000

populations = {
    "exponential": lambda k: rng.exponential(2.0, k),
    "bimodal    ": lambda k: np.where(rng.random(k) < 0.9,
                                      rng.normal(5, 1, k),
                                      rng.normal(300, 20, k)),
    "bernoulli  ": lambda k: (rng.random(k) < 0.2).astype(float),
}

for name, draw in populations.items():
    raw_skew = stats.skew(draw(200_000))
    print(f"{name}  population skew = {raw_skew:+.2f}")
    for n in [2, 10, 100]:
        means = draw(trials * n).reshape(trials, n).mean(axis=1)
        print(f"    n={n:>3}: skew of sample means = {stats.skew(means):+.3f}")`,
        output: `exponential  population skew = +2.00
    n=  2: skew of sample means = +1.425
    n= 10: skew of sample means = +0.636
    n=100: skew of sample means = +0.191
bimodal      population skew = +2.67
    n=  2: skew of sample means = +1.889
    n= 10: skew of sample means = +0.857
    n=100: skew of sample means = +0.264
bernoulli    population skew = +1.50
    n=  2: skew of sample means = +1.071
    n= 10: skew of sample means = +0.479
    n=100: skew of sample means = +0.148`,
        explanation:
          'Three populations that could hardly be less normal — an exponential, a two-humped mixture, and a variable that only ever takes the values 0 and 1 — and in every case the skewness of the sample mean falls in exactly the predicted way. Each tenfold increase in n divides the skew by roughly the square root of ten, about 3.16, which is precisely what the Berry-Esseen bound says. The populations themselves never change; only the averages become well behaved.',
      },
      {
        language: 'python',
        title: 'The standard error, verified empirically',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(1)
sigma = 15.0
trials = 50_000

print("     n   predicted SE   observed SE   ratio")
for n in [10, 40, 160, 640]:
    means = rng.normal(100, sigma, size=(trials, n)).mean(axis=1)
    predicted = sigma / np.sqrt(n)
    observed = means.std(ddof=1)
    print(f"{n:>6}   {predicted:12.4f}   {observed:11.4f}   {observed/predicted:5.3f}")`,
        output: `     n   predicted SE   observed SE   ratio
    10         4.7434        4.7370   0.999
    40         2.3717        2.3686   0.999
   160         1.1859        1.1853   0.999
   640         0.5929        0.5932   1.000`,
        explanation:
          'Each row quadruples the sample size and exactly halves the standard error, which is the practical meaning of the square root. The sobering version of that arithmetic: going from ±5 to ±0.5 requires a hundredfold increase in data, and to ±0.05 a ten-thousandfold increase. This is why experiments are powered in advance rather than extended indefinitely, and why a marginal result rarely becomes decisive by simply collecting a bit more.',
      },
      {
        language: 'python',
        title: 'Where the theorem fails: infinite variance',
        runnable: true,
        code: `import numpy as np

rng = np.random.default_rng(0)

print("Cauchy population (undefined mean, infinite variance)")
for n in [10, 100, 10_000, 1_000_000]:
    means = rng.standard_cauchy(size=(200, n)).mean(axis=1)
    print(f"  n={n:>8}: spread of sample means (IQR) = {np.subtract(*np.percentile(means, [75, 25])):.3f}")

print("\\nNormal population, for contrast")
for n in [10, 100, 10_000, 1_000_000]:
    means = rng.normal(size=(200, n)).mean(axis=1)
    print(f"  n={n:>8}: spread of sample means (IQR) = {np.subtract(*np.percentile(means, [75, 25])):.4f}")`,
        output: `Cauchy population (undefined mean, infinite variance)
  n=      10: spread of sample means (IQR) = 2.141
  n=     100: spread of sample means (IQR) = 2.062
  n=   10000: spread of sample means (IQR) = 1.884
  n= 1000000: spread of sample means (IQR) = 2.030

Normal population, for contrast
  n=      10: spread of sample means (IQR) = 0.4271
  n=     100: spread of sample means (IQR) = 0.1345
  n=   10000: spread of sample means (IQR) = 0.0136
  n= 1000000: spread of sample means (IQR) = 0.0014`,
        explanation:
          'The Cauchy distribution has such heavy tails that its variance is infinite, and the theorem\'s conditions fail. The consequence is dramatic: the spread of the sample mean does not shrink at all, even at a million observations. In fact the mean of n Cauchy variables has exactly the same Cauchy distribution as a single one, so averaging accomplishes literally nothing. The normal contrast shows the expected hundredfold narrowing. The practical warning is that for extremely heavy-tailed data — some financial returns, some network and file-size distributions — sample means and the intervals built on them are far less trustworthy than their formulas suggest, and a median or a trimmed mean is the safer summary.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A/B test significance',
        usage:
          'Conversion is a 0/1 Bernoulli variable, about as non-normal as a variable can be, yet every A/B test computes a z-statistic on the difference of two proportions. That is legitimate only because the theorem makes the sampling distribution of each proportion approximately normal once np is large enough.',
      },
      {
        context: 'Reporting model performance with error bars',
        usage:
          'Test-set accuracy is a sample mean of per-example correctness. Its standard error is the square root of p(1-p)/n, which is why a 1,000-example test set gives roughly ±2 percentage points and cannot distinguish a 91% model from a 92% one.',
      },
      {
        context: 'Mini-batch gradient descent',
        usage:
          'A mini-batch gradient is an average of per-example gradients, so it is unbiased for the full gradient with a standard error falling like one over the square root of the batch size. Doubling the batch reduces gradient noise by only about 30%, which is why very large batches give diminishing returns.',
      },
      {
        context: 'Monitoring aggregate metrics',
        usage:
          'Daily average latency is well behaved and trend-testable even though individual latencies are heavy-tailed, because the daily average aggregates millions of requests. The same dashboard should not apply normal reasoning to individual request times.',
      },
    ],

    projectConnections: [
      { tool: 'SciPy', role: '`stats.sem` computes the standard error of the mean; `stats.ttest_ind` and `stats.norm` rely on the theorem for their sampling distributions.' },
      { tool: 'NumPy', role: 'Reshaping a long draw into a (trials, n) array and averaging along one axis is the idiomatic way to simulate a sampling distribution.' },
      { tool: 'scikit-learn', role: '`cross_val_score` produces per-fold scores whose mean and standard error quantify how much of an observed difference is noise.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing the theorem makes the raw data normal',
        why: 'It is a statement about the sampling distribution of a statistic, not about observations. Incomes remain skewed no matter how many you collect; it is the average of many incomes that becomes normal.',
        fix: 'Always name which distribution you mean. If you are about to apply a normal-based method to individual observations, the theorem does not license it.',
      },
      {
        mistake: 'Trusting "n = 30" as a universal threshold',
        why: 'The required n depends on the population\'s skewness and tail weight. For a symmetric population 5 may suffice; for heavily skewed income or latency data, hundreds or thousands are needed; for a rare binary event you need np of at least about 10.',
        fix: 'Simulate. Bootstrap the sampling distribution of your statistic and look at it, rather than invoking a rule of thumb that has no theorem behind it.',
      },
      {
        mistake: 'Applying it to dependent observations',
        why: 'The derivation adds variances, which requires independence. Repeated measurements on the same user, or autocorrelated time series, have a larger true standard error — sometimes several times larger.',
        fix: 'Aggregate to the independent unit — one row per user rather than per event — or use methods that model the correlation, such as clustered standard errors or a block bootstrap.',
      },
      {
        mistake: 'Confusing standard deviation with standard error',
        why: 'The standard deviation describes the spread of the data and does not shrink with n; the standard error describes the spread of the estimate and does. Reporting one as the other misstates uncertainty by a factor of root n.',
        fix: 'Ask what the error bar is about. Describing the population? Standard deviation. Describing how precisely you know the mean? Standard error.',
      },
      {
        mistake: 'Forgetting that it says nothing about bias',
        why: 'The theorem describes the distribution of estimates around the true mean of the population you sampled. If that population is not the one you care about, the sampling distribution is beautifully normal around the wrong value.',
        fix: 'Treat sampling design and sampling theory as separate problems. A narrow confidence interval is not evidence that the sample was representative.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'State the central limit theorem and explain why it matters in practice.',
        answer:
          'For independent, identically distributed observations with finite mean mu and finite variance sigma squared, the sampling distribution of the sample mean approaches a normal distribution with mean mu and standard deviation sigma over root n as n grows, regardless of the shape of the population. It matters because it decouples inference from knowing the population distribution. Without it, every confidence interval and hypothesis test would require you to know the exact distribution you sampled from, which you essentially never do. With it, the same z and t procedures work for incomes, latencies, conversion indicators and anything else with finite variance. It is also the reason a proportion — the mean of zeros and ones, about as non-normal as a variable gets — can be tested with normal-theory methods in every A/B test ever run. The two things to be careful about are that it concerns the statistic and not the raw data, and that the required n depends on the population\'s skewness rather than on any universal threshold.',
        followUp:
          'A strong answer distinguishes it from the law of large numbers: the law says the estimate converges to the truth, the theorem describes the shape and scale of the scatter around it on the way there.',
      },
      {
        level: 'intermediate',
        question: 'What is the difference between standard deviation and standard error?',
        answer:
          'The standard deviation measures the spread of individual observations around their mean and is a property of the population. It does not change as you collect more data — a bigger sample from the same population estimates the same sigma more precisely, but sigma itself is fixed. The standard error measures the spread of a *statistic* across hypothetical repetitions of the study, and for the sample mean it equals sigma over root n, so it shrinks as the sample grows. The practical consequence is that they answer different questions and should be used for different error bars: if you are describing how variable individuals are, use the standard deviation; if you are describing how precisely you know the mean, use the standard error. Reporting a standard error when the reader expects a standard deviation understates the variability of the population by a factor of root n, which on a large sample is enormously misleading.',
      },
      {
        level: 'ml-engineer',
        question: 'Your A/B test on a rare conversion event shows a significant result after two days. What would you check before shipping?',
        answer:
          'Several things, and the first is whether the normal approximation is even valid. For a rare event the sampling distribution of a proportion is only approximately normal when np and n(1-p) are both comfortably above about 10; if the treatment arm has a handful of conversions, the interval and p-value are unreliable and I would use an exact binomial or a bootstrap instead. Second, whether the test was stopped because it reached significance, which is optional stopping and inflates the false-positive rate well above the nominal level — the fix is a pre-registered sample size, or a sequential procedure such as an alpha-spending boundary that is designed for repeated looks. Third, independence: if one user can convert several times, or conversions cluster within a session or a household, the effective sample size is smaller than the row count and the true standard error is larger, so I would aggregate to the user level. Fourth, whether two days covers a representative slice of traffic, since weekday and weekend populations differ and novelty effects are strongest early. Fifth, the practical size of the effect against its interval: a statistically significant lift whose interval runs from 0.1% to 4% may not justify the change. And finally, how many variants and metrics were examined, because the multiple-comparisons arithmetic applies here as much as anywhere.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A population has mean 50 and standard deviation 12. For samples of size 36, what are the mean and standard error of the sampling distribution, and what range contains about 95% of sample means?',
        hint: 'The sampling distribution is centred on the population mean; divide sigma by the square root of n.',
        solution:
          'Mean of the sampling distribution: 50, the same as the population mean, because the sample mean is unbiased.\n\nStandard error: 12/sqrt(36) = 12/6 = 2.\n\nBy the central limit theorem the sampling distribution is approximately normal, so about 95% of sample means lie within 1.96 standard errors: 50 ± 1.96(2) = 50 ± 3.92, giving [46.08, 53.92].\n\nNote what this is not: it is not a statement that 95% of individual observations lie in that range. Individuals have standard deviation 12, so about 95% of them lie in 50 ± 23.5, a range six times wider. Confusing the two is the most common error in this topic.',
      },
      {
        prompt:
          'A test set of 1,000 examples gives 92% accuracy. Compute the standard error and a rough 95% range, and say whether you could distinguish this model from one scoring 93%.',
        hint: 'Accuracy is a proportion, so use the square root of p(1-p)/n.',
        solution:
          'SE = sqrt(0.92 x 0.08 / 1000) = sqrt(0.0000736) = 0.00858.\n\nA 95% range is 0.92 ± 1.96(0.00858) = 0.92 ± 0.0168, so roughly [0.903, 0.937], or ±1.7 percentage points.\n\nA model scoring 93% sits comfortably inside that range, so on this test set alone the two are indistinguishable — the difference is well within what resampling noise produces. To resolve a one-point difference reliably you would need a far larger test set: matching a margin of about 0.5 points requires roughly 11,000 examples, since the margin falls with the square root of n.\n\nThe much better approach is a paired comparison: evaluate both models on the *same* examples and analyse the per-example differences. That removes the variation caused by which examples happened to be in the test set and is dramatically more powerful at the same sample size.',
      },
      {
        prompt:
          'By simulation, show that the sampling distribution of the mean becomes normal for a heavily skewed population, and find roughly how large n must be before it looks acceptably normal.',
        hint: 'Use a log-normal or exponential population, and track the skewness of the sample means as n increases.',
        language: 'python',
        starterCode:
          'import numpy as np\nfrom scipy import stats\n\nrng = np.random.default_rng(0)\ntrials = 20_000\n',
        solution:
          'import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(0)\ntrials = 20_000\n\nfor n in [1, 5, 30, 100, 500]:\n    means = rng.lognormal(0, 1.2, size=(trials, n)).mean(axis=1)\n    print(n, round(stats.skew(means), 3))\n\nThe population skewness of a log-normal with sigma = 1.2 is about 5.4. The skewness of the sample mean falls roughly as 5.4/sqrt(n): about 2.4 at n = 5, 1.0 at n = 30, 0.54 at n = 100 and 0.24 at n = 500.\n\nUsing a common working threshold of |skew| below about 0.5, this population needs roughly n = 120 before the sampling distribution is acceptably normal — four times the "n = 30" rule of thumb. Repeating the exercise with sigma = 2.0 pushes the requirement into the thousands.\n\nThe general lesson: the rule of thumb is not a theorem, and the honest procedure is to simulate or bootstrap the sampling distribution of your actual statistic on your actual data rather than to assume.',
      },
    ],

    quiz: [
      {
        id: 'STAT-013-q1',
        type: 'truefalse',
        concept: 'what the CLT claims',
        prompt: 'The central limit theorem says that with a large enough sample, your raw data will be normally distributed.',
        answer: false,
        explanation:
          'It concerns the sampling distribution of the mean, not the observations. Incomes stay right-skewed forever; it is the average of many incomes that becomes approximately normal.',
      },
      {
        id: 'STAT-013-q2',
        type: 'numeric',
        concept: 'standard error',
        prompt:
          'A population has standard deviation 24. What is the standard error of the mean for a sample of 64?',
        answer: 3,
        tolerance: 0.05,
        explanation:
          'SE = sigma/sqrt(n) = 24/8 = 3. Quadrupling the sample to 256 would halve it to 1.5, which is the square-root penalty that makes precision expensive.',
      },
      {
        id: 'STAT-013-q3',
        type: 'mcq',
        concept: 'sample size requirements',
        prompt: 'For which population would you need the largest sample before the mean is approximately normal?',
        options: [
          'A heavily right-skewed log-normal',
          'A uniform distribution on [0, 1]',
          'A symmetric triangular distribution',
          'A normal distribution',
        ],
        answerIndex: 0,
        explanation:
          'Convergence speed is governed by skewness and tail weight, not by how "unusual" the shape looks. Symmetric populations converge in a handful of observations, a normal is already exact at n = 1, and heavy right skew can require hundreds or thousands.',
      },
      {
        id: 'STAT-013-q4',
        type: 'multi',
        concept: 'conditions',
        prompt: 'Which conditions does the classical central limit theorem require? Select all that apply.',
        options: [
          'Observations are independent',
          'Observations are identically distributed',
          'The population variance is finite',
          'The population is approximately normal',
          'The sample size is at least 30',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'The whole point is that the population need not be normal. The n = 30 figure is a rule of thumb with no theorem behind it — the required size depends on the population\'s skewness. Finite variance is the condition that genuinely fails for Cauchy-like data.',
      },
      {
        id: 'STAT-013-q5',
        type: 'order',
        concept: 'deriving the standard error',
        prompt: 'Put the derivation of the standard error of the mean into order.',
        items: [
          'Write the sample mean as (1/n) times the sum of the observations',
          'Note that each observation has variance sigma squared',
          'Use independence to add variances: the sum has variance n sigma squared',
          'Apply Var(aX) = a squared Var(X) with a = 1/n',
          'Obtain Var(X-bar) = sigma squared over n',
          'Take the square root to get SE = sigma over root n',
        ],
        explanation:
          'The independence step is where the argument can break: correlated observations add covariance terms, so the real standard error is larger than the formula suggests — often much larger for clustered or autocorrelated data.',
      },
      {
        id: 'STAT-013-q6',
        type: 'explain',
        concept: 'applying the CLT',
        prompt:
          'A colleague says "our latency data is right-skewed, so we cannot use a t-test on the mean". Respond.',
        rubric: [
          'Explains that the t-test concerns the sampling distribution of the mean, not the raw data',
          'Notes that with a large sample the central limit theorem makes that sampling distribution approximately normal even for skewed data',
          'Adds an honest caveat about how skewness slows convergence, or questions whether the mean is the right summary at all',
        ],
        sampleAnswer:
          'The normality assumption behind a t-test applies to the sampling distribution of the mean, not to the individual observations, so skewed raw data is not by itself a disqualification. With the sample sizes typical of latency monitoring — thousands or millions of requests — the central limit theorem makes the sampling distribution of the mean very close to normal, and the t-test is fine. Two caveats though. First, convergence is slower for skewed populations, so I would check by bootstrapping the sampling distribution rather than assuming, especially if the sample is small or the tail is extreme enough that variance is barely finite. Second, and more importantly, I would question whether the mean is the statistic we want at all. For latency the mean is dominated by the tail and describes no real request; the p50 and p99 are what users experience and what service-level objectives are written against. So the right answer is probably not "use a different test for the mean" but "test a different statistic", comparing percentiles with a bootstrap, which sidesteps the distributional question entirely.',
        explanation:
          'A complete answer separates the statistical objection (which is misplaced) from the measurement objection (which is well founded), and offers the bootstrap as the practical route when assumptions are in doubt.',
      },
    ],

    flashcards: [
      { front: 'State the central limit theorem', back: 'For independent, identically distributed observations with finite variance, the sample mean is approximately normal with mean mu and standard deviation sigma/root n, whatever the population shape.' },
      { front: 'Sampling distribution vs data distribution', back: 'The data distribution is one dot per observation and keeps its shape. The sampling distribution is one dot per sample mean, becomes normal, and narrows as n grows.' },
      { front: 'Standard error of the mean', back: 'sigma/sqrt(n). Quadrupling the sample halves it; a hundredfold increase is needed for one more decimal place.' },
      { front: 'CLT vs law of large numbers', back: 'The law says the sample mean converges to mu. The theorem describes the shape and scale of the scatter around mu at finite n.' },
      { front: 'When does the CLT fail?', back: 'Infinite variance (Cauchy, some power laws), dependent observations, or a sample too small for the population\'s skewness.' },
      { front: 'Is "n = 30" a rule?', back: 'No, it is a rule of thumb with no theorem behind it. Symmetric populations need far less; heavily skewed ones need hundreds or thousands.' },
      { front: 'What does the CLT say about bias?', back: 'Nothing. It describes scatter around the mean of the population you sampled. If that is the wrong population, the interval is normal and wrong.' },
    ],

    challenge: {
      title: 'A central limit theorem laboratory',
      brief:
        'Build a simulation tool that takes any sampling function and, for a list of sample sizes, produces the sampling distribution of the mean: its mean, its standard deviation compared against the theoretical sigma/root n, its skewness, and a normality diagnostic. Run it on at least five populations — normal, uniform, exponential, a rare Bernoulli with p = 0.01, and a Cauchy — and produce a table showing the smallest n at which each becomes acceptably normal by your chosen criterion. Explain in a printed summary why the Cauchy never does.',
      language: 'python',
      acceptanceCriteria: [
        'Observed standard errors are compared against the theoretical sigma/root n for every population and sample size',
        'A stated, justified normality criterion is applied consistently',
        'The Cauchy case is included and its failure explained in terms of infinite variance',
        'The rare-Bernoulli case demonstrates that np, not n alone, governs the requirement',
        'The output is a readable table plus a short written interpretation',
      ],
      starterCode:
        'import numpy as np\nfrom scipy import stats\n\ndef clt_lab(sampler, name: str, sizes=(2, 5, 30, 100, 1000), trials: int = 20_000) -> None:\n    """Simulate the sampling distribution of the mean at several sample sizes."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach the central limit theorem to someone who knows about means, standard deviations and the normal distribution. Make sure they end up able to state exactly what it promises and exactly what it does not.',
      mustCover: [
        'That it describes the distribution of sample means, not of raw observations',
        'The three claims: centred on mu, standard deviation sigma/root n, shape approaching normal',
        'That it holds regardless of the population shape, given finite variance and independence',
        'What it does not promise: nothing about raw data, nothing about bias, and no universal sample size',
      ],
      bonusSignals: [
        'demonstrates with a deliberately non-normal population',
        'explains the square root and its practical cost',
        'names a failure case such as heavy tails or dependent observations',
      ],
      sampleExplanation:
        'Take a population that is as far from a bell curve as you can imagine — say session durations where ninety percent last five seconds and ten percent last five minutes, so the histogram is two separate humps with nothing in between. Now do this: pick a hundred sessions at random, average them, write the number down, and repeat ten thousand times. Plot those ten thousand averages and you get a clean, symmetric bell curve. That is the central limit theorem, and the first thing to be precise about is what became normal. The session durations did not; they are exactly as ugly as they were and always will be. It is the averages that became normal. The reason is cancellation. For one average to come out extreme, a lot of its hundred members have to be extreme in the same direction at once, and independent observations rarely conspire like that; one long session gets divided by a hundred, so it barely moves the result. The theorem makes three claims. The averages centre on the true population mean. Their spread is the population spread divided by the square root of the sample size — that is called the standard error. And their shape approaches a normal curve as the sample grows. The square root is worth dwelling on, because it is the economics of the whole of data collection: to halve your uncertainty you need four times the data, and one more decimal place costs a hundred times as much. Finally, the limits. It says nothing about the raw data. It says nothing about bias — if you sampled the wrong population, you get a beautiful normal distribution centred on the wrong number. It needs the observations to be independent, so repeated measurements on the same user do not count separately. And it needs finite variance, which fails for a few genuinely wild distributions where averaging never helps at all.',
    },
  },

  {
    id: 'STAT-014',
    domain: 'STAT',
    module: 'Sampling & Inference',
    topic: 'Quantifying uncertainty in an estimate',
    title: 'Confidence Intervals',
    slug: 'confidence-intervals',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['STAT-012', 'STAT-013'],
    related: ['STAT-008', 'STAT-010', 'STAT-006'],
    tags: ['confidence interval', 'standard error', 'margin of error', 'coverage', 'sample size', 'bootstrap'],

    learningObjectives: [
      'State what a 95% confidence interval actually guarantees, in terms of the procedure rather than the one interval you computed',
      'Identify and correct the interpretation almost everyone gives, and explain precisely why it is wrong',
      'Decompose an interval into estimate, critical value and standard error, and compute each',
      'Predict how interval width responds to sample size, variability and confidence level, including the square-root cost',
      'Choose between a z interval, a t interval and a bootstrap interval, and say what each assumes',
      'Read a reported interval critically, including what it does not protect you against',
    ],

    terminology: [
      {
        term: 'Point estimate',
        definition:
          'A single number computed from a sample and used as a guess at a population quantity — a sample mean estimating a population mean, for instance.',
        simple: 'Your single best guess from the data you have.',
      },
      {
        term: 'Standard error',
        definition:
          'The standard deviation of a statistic’s sampling distribution. For a sample mean it is the population standard deviation divided by the square root of the sample size.',
        simple: 'How much your estimate would wobble if you collected the data again.',
      },
      {
        term: 'Margin of error',
        definition:
          'The half-width of a confidence interval: the critical value multiplied by the standard error. The interval is the estimate plus and minus this quantity.',
        simple: 'The plus-or-minus part.',
      },
      {
        term: 'Critical value',
        definition:
          'The multiplier taken from the sampling distribution that determines how many standard errors wide the interval is — about 1.96 for 95% under normality, or the corresponding t value for small samples.',
        simple: 'How many wobbles wide you make the interval.',
      },
      {
        term: 'Coverage',
        definition:
          'The long-run proportion of intervals, built by a given procedure over repeated samples, that contain the true parameter. A procedure with 95% nominal confidence should have 95% coverage.',
        simple: 'How often the method’s intervals actually catch the true value.',
      },
      {
        term: 'Bootstrap interval',
        definition:
          'An interval built by resampling the observed data with replacement thousands of times, recomputing the statistic each time, and taking percentiles of the resulting distribution.',
        simple: 'Simulating "collect the data again" by reusing the data you have.',
      },
    ],

    simpleExplanation:
      "You measure something on a sample — the average time a hundred users spent on a page, say — and get 4.2 minutes. That number is almost certainly not the true average for all users, because a different hundred users would have given you something slightly different. A confidence interval is how you say that out loud. Instead of reporting 4.2, you report something like 4.2 plus or minus 0.3, meaning \"somewhere in the region of 3.9 to 4.5\". The width comes from two things: how spread out the individual values are, and how many of them you collected. More data narrows the interval, but annoyingly slowly — to halve the width you need four times as much data, not twice. And here is the part almost everyone gets wrong, including many people who use these professionally. The 95% does not describe your particular interval. It describes the method. If you repeated the whole exercise many times, about 95% of the intervals the method produces would contain the true value. Yours either does or it does not; you simply cannot know which.",

    whyItExists:
      'A single number from a sample looks certain and is not, and that false certainty causes real decisions to be made on noise. An interval makes the uncertainty part of the result, so that a 2% measured improvement with an interval spanning −3% to +7% is visibly indistinguishable from no effect at all rather than being reported as a win.',

    analogy: {
      scenario:
        'Think of a fishing net rather than a spear. You are trying to catch one particular fish — the true population value — that is swimming somewhere you cannot see. Each time you sample data, you cast a net of a certain width around wherever your boat happens to be. The manufacturer of the net has tested the design: cast this way, it catches the fish on about 95 casts out of 100. Once a specific cast has been made and the net is closed, however, the fish is either inside it or it is not. Nothing about that particular net is 95% anything. The 95 out of 100 was a property of the casting procedure, established before you cast.',
      mapping: [
        { from: 'The unseen fish', to: 'The true population parameter, a fixed unknown number' },
        { from: 'Where your boat happens to be', to: 'Your sample estimate, which varies from sample to sample' },
        { from: 'The width of the net', to: 'The margin of error: critical value times standard error' },
        { from: 'The manufacturer’s tested catch rate', to: 'The coverage of the procedure over repeated samples' },
        { from: 'One specific closed net', to: 'The one interval you actually computed, which either contains the parameter or does not' },
        { from: 'Casting from a boat moored in the wrong lake', to: 'A biased sample, which the interval cannot detect or correct' },
      ],
      bridge:
        'The net makes the crucial grammatical point visible: the probability statement attaches to the casting, which is random, and not to the fish, which is fixed and not random at all. That is exactly why the correct phrasing is "95% of intervals constructed this way contain the parameter" and not "there is a 95% chance the parameter is in this interval" — in the frequentist framework the parameter has no distribution to be 95% of.',
      limitations:
        'The analogy flatters the method in one important way. The manufacturer’s catch rate assumes you are fishing in the right lake. A confidence interval quantifies sampling variability only; if your sample is biased, the interval is narrow, confident and centred on the wrong answer, and more data makes it narrower without making it any less wrong.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Building a confidence interval for a mean',
        caption: 'Five steps, and the assumption each one depends on.',
        steps: [
          { label: 'Compute the point estimate', detail: 'The sample mean x̄. This is where the interval is centred, so any bias here shifts everything.' },
          { label: 'Estimate the standard error', detail: 'SE = s/√n, using the sample standard deviation. This is how much x̄ would wobble across repeated samples.' },
          { label: 'Choose a confidence level', detail: '95% is conventional, not principled. Higher confidence means a wider interval — you cannot have both.' },
          { label: 'Look up the critical value', detail: '1.96 for 95% under normality; a t value with n − 1 degrees of freedom when n is small and sigma is estimated.' },
          { label: 'Form estimate ± critical value × SE', detail: 'The margin of error is the product; the interval is the estimate plus and minus it.' },
          { label: 'Report it as a range, not a number', detail: 'And state the level, because "±0.3" without "95%" is meaningless.' },
        ],
      },
      {
        kind: 'compare',
        title: 'What a 95% interval does and does not mean',
        caption: 'The single most repeated error in applied statistics.',
        left: {
          heading: 'Correct',
          points: [
            '95% of intervals built this way, over repeated samples, contain the true value',
            'The randomness lives in the sampling, and therefore in the interval',
            'This particular interval either contains the parameter or does not',
            'Coverage is a property of the procedure, verifiable by simulation',
            'Values outside the interval are less compatible with the data, not impossible',
          ],
        },
        right: {
          heading: 'Wrong, and why',
          points: [
            '"There is a 95% chance the true mean is in this interval" — the parameter is fixed, not random',
            '"95% of the data lie in this interval" — that is a prediction interval, and it is far wider',
            '"95% of future sample means will land in it" — that is roughly 83%, not 95%',
            '"The interval contains the sample mean 95% of the time" — it contains it always, by construction',
            '"A wider interval means the estimate is wrong" — it means it is less precise',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What changes the width',
        caption: 'Computed for a mean with s = 10, showing the square-root penalty explicitly.',
        columns: ['n', 'SE = s/√n', '95% margin (1.96 × SE)', 'Interval width', 'Effect of quadrupling n'],
        rows: [
          ['25', '2.00', '3.92', '7.84', 'from n = 25 to 100 halves the width'],
          ['100', '1.00', '1.96', '3.92', 'from n = 100 to 400 halves it again'],
          ['400', '0.50', '0.98', '1.96', 'from n = 400 to 1600 halves it again'],
          ['1600', '0.25', '0.49', '0.98', 'each halving costs four times the data'],
          ['10000', '0.10', '0.20', '0.39', 'one extra decimal place costs 100× the data'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of an interval',
        subject: 'x̄ ± t* × (s / √n)',
        annotations: [
          { part: 'x̄', note: 'The point estimate. It sets the centre, so sampling bias moves the whole interval and the method cannot tell.' },
          { part: '±', note: 'Symmetric here because the sampling distribution of a mean is symmetric. Intervals for a proportion near 0 or 1, or for a ratio, are not.' },
          { part: 't*', note: 'The critical value: how many standard errors wide. 1.96 for 95% with large n; larger for small n, which is the t distribution paying for estimating sigma.' },
          { part: 's / √n', note: 'The standard error. The √n is the whole economics of data collection: precision improves with the square root, not linearly.' },
          { part: 'the product t* × SE', note: 'The margin of error — the number people quote as "plus or minus" in a poll.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Watch coverage happen',
        caption: 'Draw many samples, build an interval from each, and count how many of them capture the true mean. It converges on 95%, and some of them miss.',
        widget: 'confidence-interval-sim',
      },
      {
        kind: 'widget',
        title: 'Where the standard error comes from',
        caption: 'The sampling distribution of the mean narrows as √n — the fact the interval width is built on.',
        widget: 'clt-sim',
      },
    ],

    formalDefinition:
      'A 1 − α confidence interval for a parameter θ is a pair of statistics (L(X), U(X)), computed from the sample and therefore random, such that P(L(X) ≤ θ ≤ U(X)) = 1 − α under repeated sampling, where the probability is over the sampling distribution and θ is fixed. Coverage is thus a property of the procedure rather than of any realised interval; for a mean with a normally distributed sampling distribution the interval takes the form x̄ ± z(1−α/2)·σ/√n, replacing z by the t quantile with n − 1 degrees of freedom when σ is estimated from the sample.',

    math: {
      intuition:
        'Everything follows from one result you already have: the central limit theorem says the sample mean is approximately normal, centred on the true mean, with a spread of sigma over root n. Call that spread the standard error. A normal distribution puts about 95% of its mass within 1.96 standard deviations of its centre, so before you collect any data you can say that the sample mean you are about to obtain will land within 1.96 standard errors of the true mean about 95% of the time. Now flip the sentence around. If the sample mean is usually within 1.96 standard errors of the true mean, then an interval of that width drawn around the sample mean usually reaches the true mean — because "A is within d of B" and "B is within d of A" are the same statement. That flip is the entire construction, and it also explains the interpretation. The probability was attached to where the sample mean lands, which is random. The true mean never moved. Once you substitute your actual numbers, there is no randomness left to have a probability about.',
      formulas: [
        {
          latex: '\\bar{x} \\pm z_{1-\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}',
          name: 'Confidence interval for a mean, sigma known',
          meaning:
            'The estimate plus and minus a chosen number of standard errors. With alpha = 0.05 the multiplier is 1.96, giving the familiar 95% interval.',
          variables: [
            { symbol: '\\bar{x}', meaning: 'The sample mean — the point estimate at the centre of the interval' },
            { symbol: 'z_{1-\\alpha/2}', meaning: 'The standard normal quantile leaving alpha/2 in each tail: 1.645 for 90%, 1.96 for 95%, 2.576 for 99%' },
            { symbol: '\\sigma', meaning: 'The population standard deviation, assumed known in this version' },
            { symbol: 'n', meaning: 'The sample size' },
            { symbol: '\\alpha', meaning: 'The error rate you accept, so the confidence level is 1 − alpha' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\mathrm{SE}(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}} \\quad\\text{estimated by}\\quad \\frac{s}{\\sqrt{n}}',
          name: 'Standard error of the mean',
          meaning:
            'The standard deviation of the sampling distribution of the mean. It is not the spread of the data — it is the spread of the estimate, and it shrinks as the square root of the sample size.',
          variables: [
            { symbol: '\\mathrm{SE}', meaning: 'Standard error: how much the estimate varies across repeated samples' },
            { symbol: '\\sigma', meaning: 'Population standard deviation — the spread of individual observations, which does not shrink with n' },
            { symbol: 's', meaning: 'Sample standard deviation, used when sigma is unknown' },
            { symbol: '\\sqrt{n}', meaning: 'The square root of the sample size, the source of diminishing returns to data collection' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\bar{x} \\pm t_{n-1,\\,1-\\alpha/2}\\,\\frac{s}{\\sqrt{n}}',
          name: 'The t interval, for when sigma is estimated',
          meaning:
            'Estimating sigma from the same small sample adds uncertainty, so the multiplier comes from a heavier-tailed t distribution, making the interval wider than the z version.',
          variables: [
            { symbol: 't_{n-1,\\,1-\\alpha/2}', meaning: 'The t quantile with n − 1 degrees of freedom; 2.776 at n = 5 and 95%, against 1.96 for z' },
            { symbol: 'n-1', meaning: 'Degrees of freedom — one is spent estimating the mean before estimating the spread' },
            { symbol: 's', meaning: 'The sample standard deviation, itself an estimate and therefore a source of extra uncertainty' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\hat{p} \\pm z_{1-\\alpha/2}\\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}',
          name: 'Interval for a proportion',
          meaning:
            'The conversion-rate version, used in every A/B test dashboard. The variance of a proportion depends on the proportion itself, which is why it is widest at 0.5.',
          variables: [
            { symbol: '\\hat{p}', meaning: 'The observed proportion, such as a click-through or conversion rate' },
            { symbol: '\\hat{p}(1-\\hat{p})', meaning: 'The variance of a single Bernoulli trial; maximised at p = 0.5 and small near 0 or 1' },
            { symbol: 'n', meaning: 'Number of trials — the approximation needs roughly n·p and n·(1−p) both above 10' },
          ],
          category: 'statistics',
        },
        {
          latex: 'n \\ge \\left(\\frac{z_{1-\\alpha/2}\\,\\sigma}{E}\\right)^{2}',
          name: 'Sample size for a target margin of error',
          meaning:
            'Solve the margin-of-error formula for n. The square is the point: halving the margin E multiplies the required sample size by four.',
          variables: [
            { symbol: 'E', meaning: 'The margin of error you are willing to tolerate — the half-width of the interval' },
            { symbol: 'z_{1-\\alpha/2}', meaning: 'The critical value for your confidence level' },
            { symbol: '\\sigma', meaning: 'An estimate of the population spread, usually from a pilot study or historical data' },
            { symbol: 'n', meaning: 'The required sample size, rounded up' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Start from the central limit theorem: for large n, the sample mean has approximately the distribution N(mu, sigma²/n).',
        'Standardise it: Z = (x̄ − mu)/(sigma/√n) is approximately standard normal, with mean 0 and standard deviation 1.',
        'By definition of the quantile, P(−z ≤ Z ≤ z) = 1 − alpha when z is the 1 − alpha/2 quantile. For alpha = 0.05, z = 1.96.',
        'Substitute: P(−1.96 ≤ (x̄ − mu)/(sigma/√n) ≤ 1.96) = 0.95.',
        'Multiply through the inequality by sigma/√n: P(−1.96·sigma/√n ≤ x̄ − mu ≤ 1.96·sigma/√n) = 0.95.',
        'Subtract x̄ and multiply by −1, which reverses the inequalities: P(x̄ − 1.96·sigma/√n ≤ mu ≤ x̄ + 1.96·sigma/√n) = 0.95.',
        'That final line is the interval. Read it carefully: the only random quantity in it is x̄, which appears at both ends. Mu is a fixed constant sitting in the middle, not a random variable.',
        'This is exactly why the interpretation must be about the procedure. Before sampling, the statement is a genuine probability about where the random endpoints will fall. After sampling, x̄ is a number, the endpoints are numbers, mu is a number, and the statement is either true or false — with no probability left in it.',
        'When sigma is unknown you substitute s, which is itself estimated from the same data. The standardised quantity then follows a t distribution with n − 1 degrees of freedom rather than a normal one, and its heavier tails give a larger multiplier — which is the interval honestly paying for the extra uncertainty.',
      ],
    },

    workedExample: {
      title: 'An interval, a misinterpretation, and a sample-size decision',
      setup:
        'You measure page load times for a random sample of 100 sessions. The sample mean is 4.20 seconds and the sample standard deviation is 1.50 seconds. Build a 95% confidence interval, interpret it correctly, and work out what it would take to halve its width.',
      steps: [
        { label: 'Point estimate', detail: 'x̄ = 4.20 seconds. This is the centre of the interval and the best single guess available.', latex: '\\bar{x} = 4.20' },
        { label: 'Standard error', detail: 'SE = s/√n = 1.50/√100 = 1.50/10 = 0.15 seconds. Note this is ten times smaller than the spread of the data itself — it describes the estimate, not the sessions.', latex: '\\mathrm{SE} = \\frac{1.50}{\\sqrt{100}} = 0.15' },
        { label: 'Critical value', detail: 'n = 100 is comfortably large, so t with 99 degrees of freedom is 1.984, barely different from the normal 1.96. Using the t value is the more honest choice.', latex: 't_{99,\\,0.975} = 1.984' },
        { label: 'Margin of error', detail: '1.984 × 0.15 = 0.298, so about 0.30 seconds.', latex: 'E = 1.984 \\times 0.15 \\approx 0.30' },
        { label: 'The interval', detail: '4.20 ± 0.30, that is [3.90, 4.50] seconds.', latex: '[3.90,\\; 4.50]' },
        { label: 'State it correctly', detail: 'The procedure that produced this interval captures the true mean load time in 95% of repeated samples. This particular interval either contains it or does not.' },
        { label: 'Three wrong statements to reject', detail: 'Not "there is a 95% probability the true mean is between 3.90 and 4.50" — the true mean is fixed. Not "95% of page loads take between 3.90 and 4.50 seconds" — that would be a prediction interval, and with s = 1.50 it would be roughly [1.2, 7.2], five times wider. And not "95% of future sample means will fall in this interval" — the actual figure is about 83%, because both the new mean and this interval vary.' },
        { label: 'Halving the width', detail: 'The margin is proportional to 1/√n, so to halve it you need 4n. From 100 sessions to 400 sessions takes the interval to roughly 4.20 ± 0.15, that is [4.05, 4.35].', latex: 'E \\propto \\frac{1}{\\sqrt{n}}' },
        { label: 'What it costs to be sure to 0.05 seconds', detail: 'Solve n ≥ (1.96 × 1.50 / 0.05)² = (58.8)² = 3457, so about 3500 sessions. Getting from ±0.30 to ±0.05 — a factor of six — costs thirty-five times the data.', latex: 'n \\ge \\left(\\frac{1.96 \\times 1.50}{0.05}\\right)^2 \\approx 3457' },
        { label: 'The assumption nobody checks', detail: 'All of this quantifies sampling variability only. If the 100 sessions came disproportionately from one region or one device type, the interval is exactly as narrow as calculated and centred on the wrong number, and collecting 3500 biased sessions would make it narrower and no less wrong.' },
      ],
      conclusion:
        'The interval [3.90, 4.50] is a statement about the precision of your measurement procedure, not a probability about the world. Its width is governed by the square root of the sample size, which sets the brutal economics of data collection: each extra decimal place of precision costs a hundred times the data. And none of it protects against a biased sample, which is why how you collected the hundred sessions matters more than the arithmetic you just did.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Coverage is a property of the procedure, and you can verify it',
        runnable: true,
        code: `import numpy as np
from scipy import stats

rng = np.random.default_rng(0)
TRUE_MU, TRUE_SIGMA, n = 4.2, 1.5, 100

def interval(sample, conf=0.95):
    xbar, s = sample.mean(), sample.std(ddof=1)
    tcrit = stats.t.ppf(1 - (1 - conf) / 2, df=len(sample) - 1)
    margin = tcrit * s / np.sqrt(len(sample))
    return xbar - margin, xbar + margin

hits = 0
trials = 10_000
for i in range(trials):
    sample = rng.normal(TRUE_MU, TRUE_SIGMA, n)
    lo, hi = interval(sample)
    if lo <= TRUE_MU <= hi:
        hits += 1
    if i < 3:
        print(f"  interval {i}: [{lo:.3f}, {hi:.3f}]  contains mu? {lo <= TRUE_MU <= hi}")

print(f"coverage: {hits / trials:.4f} of {trials} intervals contained the true mean")`,
        output: `  interval 0: [3.959, 4.535]  contains mu? True
  interval 1: [4.003, 4.596]  contains mu? True
  interval 2: [3.816, 4.398]  contains mu? True
coverage: 0.9487 of 10000 intervals contained the true mean`,
        explanation:
          'This is the definition made executable. Each loop draws a fresh sample and builds a fresh interval, and the intervals differ from one another because the data does — that variation is where the 95% lives. Roughly 95% of them contain 4.2 and roughly 5% do not, and the code cannot tell which is which without knowing the answer in advance, which in real work you never do. Run it with `conf=0.80` and coverage drops to about 80%, confirming the number is a property of the procedure rather than a description of any one interval.',
      },
      {
        language: 'python',
        title: 'The square-root penalty, and the difference from a prediction interval',
        runnable: true,
        code: `import numpy as np
from scipy import stats

s, conf = 1.5, 0.95
print(f"{'n':>7} {'SE':>8} {'margin':>8} {'width':>8}")
for n in (25, 100, 400, 1600, 10_000):
    se = s / np.sqrt(n)
    margin = stats.t.ppf(0.975, df=n - 1) * se
    print(f"{n:>7} {se:>8.4f} {margin:>8.4f} {2 * margin:>8.4f}")

# Sample size needed for a target margin of error
for target in (0.30, 0.15, 0.05):
    n_needed = int(np.ceil((1.96 * s / target) ** 2))
    print(f"margin {target}: need n >= {n_needed}")

# A confidence interval is NOT a prediction interval
xbar, n = 4.2, 100
ci = 1.96 * s / np.sqrt(n)
pi = 1.96 * s * np.sqrt(1 + 1 / n)
print(f"95% CI for the mean:        [{xbar - ci:.2f}, {xbar + ci:.2f}]")
print(f"95% interval for one value: [{xbar - pi:.2f}, {xbar + pi:.2f}]")`,
        output: `      n       SE   margin    width
     25   0.3000   0.6192   1.2383
    100   0.1500   0.2977   0.5953
    400   0.0750   0.1474   0.2948
   1600   0.0375   0.0736   0.1472
  10000   0.0150   0.0294   0.0588
margin 0.3: need n >= 97
margin 0.15: need n >= 385
margin 0.05: need n >= 3458
95% CI for the mean:        [3.91, 4.49]
95% interval for one value: [1.25, 7.15]`,
        explanation:
          'The first table shows the square root at work: every quadrupling of n halves the width, so precision is bought at a quadratic price. The sample-size figures make that concrete — going from a margin of 0.30 to 0.05 is a factor of six in precision and thirty-five times the data. The last two lines address the most common confusion of all. The confidence interval for the mean is [3.91, 4.49] and is narrow because averages are stable; the interval predicting a single new observation is [1.25, 7.15] and is five times wider because individual page loads vary. Quoting the first when someone asked the second understates the real spread enormously.',
      },
      {
        language: 'python',
        title: 'When the formula does not apply: proportions and the bootstrap',
        runnable: true,
        code: `import numpy as np
from scipy import stats
rng = np.random.default_rng(1)

# A conversion rate: the normal approximation needs np and n(1-p) above ~10
def prop_ci(successes, n, conf=0.95):
    p = successes / n
    z = stats.norm.ppf(1 - (1 - conf) / 2)
    margin = z * np.sqrt(p * (1 - p) / n)
    return p, (p - margin, p + margin)

for successes, n in [(120, 2000), (3, 200)]:
    p, (lo, hi) = prop_ci(successes, n)
    ok = min(n * p, n * (1 - p)) >= 10
    print(f"p={p:.4f} CI=[{lo:.4f}, {hi:.4f}]  approximation valid? {ok}")

# Wilson interval: correct even for small counts, and never goes below zero
print("Wilson:", [round(v, 4) for v in stats.binomtest(3, 200).proportion_ci(method="wilson")])

# Bootstrap: no distributional assumption, works for any statistic
skewed = rng.lognormal(mean=1.0, sigma=1.2, size=200)
boot = np.array([rng.choice(skewed, size=len(skewed), replace=True).mean()
                 for _ in range(10_000)])
print(f"mean={skewed.mean():.3f}  bootstrap 95% CI="
      f"[{np.percentile(boot, 2.5):.3f}, {np.percentile(boot, 97.5):.3f}]")
print(f"t-interval for comparison: "
      f"{tuple(round(v, 3) for v in stats.t.interval(0.95, len(skewed) - 1, skewed.mean(), stats.sem(skewed)))}")`,
        output: `p=0.0600 CI=[0.0496, 0.0704]  approximation valid? True
p=0.0150 CI=[-0.0018, 0.0318]  approximation valid? False
Wilson: [0.0051, 0.0432]
mean=4.851  bootstrap 95% CI=[4.113, 5.717]
t-interval for comparison: (4.088, 5.613)`,
        explanation:
          'Three lessons. The second proportion interval has a negative lower bound, which is impossible for a rate — a clear signal that the normal approximation has been used outside its range, and the check `min(np, n(1−p)) ≥ 10` catches it before you publish. The Wilson interval fixes this by construction and should be the default for small counts. The bootstrap handles the third case: with strongly skewed log-normal data the sampling distribution of the mean is itself skewed, so the bootstrap interval is asymmetric about the estimate while the t interval is forced to be symmetric — and you can see the two disagree at both ends. The bootstrap assumes only that the sample is representative, which makes it the pragmatic choice for statistics with no tidy formula, such as a median, a 95th percentile, or an AUC.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Reporting model accuracy',
        usage:
          'A classifier scoring 92.0% on a 1000-item test set has a 95% interval of roughly ±1.7 percentage points. That is why a rival model at 92.8% cannot be declared better on that evidence, and why a leaderboard without intervals encourages conclusions the data does not support.',
      },
      {
        context: 'A/B testing a product change',
        usage:
          'The dashboard reports a lift of +1.2% with an interval of [−0.4%, +2.8%]. Because the interval contains zero, the honest read is that the experiment has not yet distinguished the change from no effect, and the useful next question is how much more traffic would be needed.',
      },
      {
        context: 'Opinion polling',
        usage:
          'The "margin of error ±3 points" quoted in news coverage is exactly this quantity, computed for a proportion at n around 1000. It accounts for sampling variability only, which is why polls with impeccable margins still miss when the sampling frame is unrepresentative.',
      },
      {
        context: 'Cross-validation results',
        usage:
          'Five-fold cross-validation gives five scores; the interval across folds shows whether a 0.3-point difference between two pipelines is signal or fold noise. Reporting the mean alone hides exactly the information needed to decide.',
      },
    ],

    projectConnections: [
      { tool: 'scipy.stats', role: '`t.interval`, `norm.ppf`, `sem` and `binomtest(...).proportion_ci` cover the standard constructions directly.' },
      { tool: 'scipy.stats.bootstrap', role: 'Builds bootstrap intervals for arbitrary statistics, including BCa intervals that correct for skew.' },
      { tool: 'scikit-learn', role: '`cross_val_score` returns per-fold scores precisely so you can report spread rather than a single number.' },
      { tool: 'statsmodels', role: '`conf_int()` on a fitted model gives intervals for every coefficient, which is where regression uncertainty is actually read.' },
    ],

    commonMistakes: [
      {
        mistake: 'Saying "there is a 95% probability the true value lies in this interval"',
        why: 'In the frequentist framework the parameter is a fixed unknown constant with no probability distribution. The randomness is entirely in the sampling, and therefore in the interval’s endpoints. Once the numbers are computed, the statement is simply true or false and no probability remains.',
        fix: 'Say "95% of intervals constructed by this procedure contain the true value". If you genuinely want a probability statement about the parameter, you want a Bayesian credible interval, which requires a prior and means something different.',
      },
      {
        mistake: 'Confusing a confidence interval with a prediction interval',
        why: 'A confidence interval bounds the mean and shrinks like 1/√n; a prediction interval bounds a single future observation and does not shrink towards zero, because individual variability never goes away. They differ by a factor of √n and people routinely quote the narrow one when asked about the wide one.',
        fix: 'Ask which question is being answered: "where is the average" or "where will the next one land". Use s/√n for the first and s·√(1 + 1/n) for the second.',
      },
      {
        mistake: 'Treating "the interval contains zero" as proof of no effect',
        why: 'An interval of [−0.4%, +2.8%] is equally compatible with no effect and with a useful 2% gain. Absence of evidence is not evidence of absence, and with a small sample an interval can be too wide to rule out anything at all.',
        fix: 'Report the interval and interpret its width. Say "we cannot distinguish this from no effect; effects up to +2.8% remain consistent with the data" and state the sample size needed to narrow it.',
      },
      {
        mistake: 'Believing a narrow interval means an accurate estimate',
        why: 'Width measures precision, which is only about sampling variability. A biased sampling procedure produces a tight interval around the wrong value, and more data makes it tighter without moving it closer to the truth.',
        fix: 'Interrogate how the sample was obtained before looking at the arithmetic. Bias is a design problem and no interval can detect it.',
      },
      {
        mistake: 'Using the normal approximation for small counts or heavily skewed data',
        why: 'For a proportion with only three successes in 200 trials the formula can return a negative lower bound, which is impossible; for skewed data the symmetric interval misplaces both ends because the sampling distribution is not symmetric.',
        fix: 'Check np and n(1−p) are both above about 10. Use a Wilson or Clopper–Pearson interval for proportions and a bootstrap for skewed data or unusual statistics.',
      },
      {
        mistake: 'Building many intervals and highlighting the interesting ones',
        why: 'At 95% confidence, one interval in twenty misses by design. Compute twenty segment-level intervals and you should expect roughly one to be misleading; picking the one that excludes zero and reporting it alone turns an expected error into a finding.',
        fix: 'Decide in advance which comparisons matter, and widen the intervals to control the family-wise error rate when making many at once.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does a 95% confidence interval actually mean?',
        answer:
          'It means that the procedure used to build it captures the true parameter in 95% of repeated samples. The confidence attaches to the method, not to the particular interval in front of you: your interval either contains the parameter or it does not, and you cannot know which. The reason is that in the frequentist framework the parameter is a fixed constant while the sample — and therefore both endpoints of the interval — is random. You can see this in the derivation: the probability statement is made before sampling, about where random endpoints will fall relative to a fixed mu, and once you substitute actual numbers there is no random quantity left to attach a probability to. The statement people usually want, "there is a 95% chance the parameter is in this range", is a Bayesian credible interval, which is a legitimate thing to compute but requires a prior and answers a different question.',
        followUp:
          'A strong answer offers to demonstrate it by simulation: build ten thousand intervals from a known population and count how many contain the truth.',
      },
      {
        level: 'intermediate',
        question: 'Your A/B test shows a 1.2% lift with a 95% interval of [−0.4%, 2.8%]. What do you tell the product manager?',
        answer:
          'That the experiment has not yet distinguished this change from no change, and also has not ruled out a worthwhile improvement — both conclusions matter. The interval spans zero, so the data are compatible with a small loss, with no effect, and with a 2.8% gain, and anyone reporting "we saw a 1.2% lift" without the interval is reporting noise as a result. The useful next step is a power calculation: if a 1% lift is the smallest effect worth shipping, I can compute how much traffic is needed for the interval to be narrow enough to detect it, since the width shrinks with the square root of the sample size. I would also check the test’s integrity before extending it — whether the analysis was peeked at repeatedly, whether randomisation was at the right unit, and whether this is one of many metrics being examined, because each of those inflates the chance of a spurious finding independently of the interval itself.',
        followUp:
          'Strong answers name the minimum detectable effect explicitly and mention that repeatedly checking an ongoing test invalidates the stated coverage.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you put a confidence interval on a model’s test-set accuracy, and what would you be careful about?',
        answer:
          'Accuracy on a test set is a proportion, so the straightforward approach is a binomial interval: with accuracy p̂ on n items, the margin is roughly 1.96·√(p̂(1−p̂)/n), which at 92% on 1000 items is about ±1.7 percentage points. For small test sets or accuracies near 0 or 1, I would use a Wilson interval instead of the normal approximation, because the latter can produce bounds outside [0, 1]. Three cautions. First, this interval covers sampling variability of the test set only; it says nothing about whether the test set represents deployment data, which is usually the larger risk. Second, it assumes the test items are independent — if the set contains multiple crops of the same image or several sessions from the same user, the effective sample size is smaller and the true interval is wider, so I would use a clustered bootstrap resampling at the user or document level. Third, if the test set has been used repeatedly for model selection it is no longer a clean sample, and the interval will be optimistically centred no matter how correctly it is computed. For comparing two models on the same test set I would not compare overlapping intervals; I would build an interval for the paired difference, which is much tighter because it removes the item-level variation common to both.',
        followUp:
          'Mentioning that overlapping intervals do not imply a non-significant difference, and that the paired difference is the right quantity, is the mark of real experience.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A sample of 64 API response times has a mean of 210 ms and a standard deviation of 48 ms. Compute the 95% confidence interval, then state how large a sample you would need for a margin of error of 5 ms.',
        hint: 'SE = s/√n, and the margin is about 1.96 × SE. For the sample size, solve the margin formula for n and remember it appears under a square root.',
        solution:
          'SE = 48/√64 = 48/8 = 6 ms. With n = 64 the t value with 63 degrees of freedom is 1.998, essentially 2, so the margin is 1.998 × 6 ≈ 12 ms. The interval is 210 ± 12, that is [198, 222] ms.\n\nInterpretation: the procedure that produced this range captures the true mean response time in 95% of repeated samples. This particular range either does or does not.\n\nFor a margin of 5 ms, solve n ≥ (1.96 × 48 / 5)² = (18.816)² = 354.0, so n = 355 measurements. Note what happened: cutting the margin from 12 ms to 5 ms, a factor of 2.4, required 355/64 ≈ 5.5 times the data — which is 2.4 squared, as the formula requires. This quadratic cost is the single most useful thing to remember when someone asks whether a bit more data will settle the question.',
      },
      {
        prompt:
          'A colleague writes in a report: "We are 95% confident that between 41% and 47% of users prefer the new layout, which means there is a 95% probability the true figure is in that range, and that 95% of users fall between 41% and 47%." Identify every error and rewrite the sentence.',
        hint: 'There are two distinct errors here, and they are different mistakes rather than two phrasings of one.',
        solution:
          'Error one: "there is a 95% probability the true figure is in that range". The true proportion of users preferring the layout is a fixed number, not a random variable, so it has no probability of being anywhere. The 95% describes the interval-building procedure across repeated samples. This is the classic misstatement and the one that leads people to treat a single study as more conclusive than it is.\n\nError two: "95% of users fall between 41% and 47%" is a category mistake rather than a rephrasing. Users do not have percentages; each user either prefers the layout or does not. The interval bounds the population proportion, a single aggregate quantity, not the spread of individuals. This confusion is the same one that makes people quote a confidence interval when asked for a prediction interval.\n\nRewrite: "In a sample of n users, 44% preferred the new layout. A 95% confidence interval for the population proportion is 41% to 47%; intervals constructed this way contain the true proportion in 95% of repeated samples. The data are therefore consistent with a true preference anywhere in that range, which includes values both above and below a simple majority split."',
      },
      {
        prompt:
          'Model A scores 91.0% and model B scores 93.0% on the same 500-item test set. Each has a 95% interval of roughly ±2.4 points, so the intervals overlap substantially. Can you conclude anything, and what would you compute instead?',
        hint: 'The two models were evaluated on the same items. What variability does that let you remove?',
        solution:
          'You cannot conclude "no difference" from overlapping intervals, and this is a genuinely common error: overlapping individual intervals do not imply the difference is indistinguishable from zero. The reason is that both intervals are dominated by variation in which items happened to be in the test set — and that variation is shared by both models, since they were scored on exactly the same items.\n\nThe right quantity is an interval for the paired difference. For each item record whether A was correct and whether B was correct, and focus on the discordant pairs: items where exactly one model was right. If B is right and A is wrong on b items, and the reverse on c items, McNemar’s test or a binomial interval on b/(b + c) gives an interval for the difference that removes all the item-level variation common to both models. In practice this interval is far narrower than either individual one, and a 2-point gap on 500 items can easily be clearly distinguishable from zero under the paired analysis while the marginal intervals overlap heavily.\n\nThe general principle is to build the interval for the quantity you want to make a decision about — here, the difference — rather than inspecting two intervals for quantities you do not care about individually. The same applies to cross-validation: compare per-fold differences, not two sets of fold scores.',
      },
    ],

    quiz: [
      {
        id: 'STAT-014-q1',
        type: 'mcq',
        concept: 'correct interpretation',
        prompt: 'A 95% confidence interval for the mean is [10.2, 12.8]. Which statement is correct?',
        options: [
          '95% of intervals built by this procedure over repeated samples contain the true mean',
          'There is a 95% probability the true mean is between 10.2 and 12.8',
          '95% of the observations lie between 10.2 and 12.8',
          '95% of future sample means will fall between 10.2 and 12.8',
        ],
        answerIndex: 0,
        explanation:
          'Confidence is a property of the procedure. The parameter is fixed and the interval is random, so once the numbers are computed the statement is simply true or false. Option 3 describes a prediction interval, which is much wider; option 4 is about 83%, not 95%.',
      },
      {
        id: 'STAT-014-q2',
        type: 'numeric',
        concept: 'standard error',
        prompt: 'A sample of n = 400 has standard deviation s = 20. What is the standard error of the mean?',
        answer: 1,
        tolerance: 0.01,
        explanation:
          'SE = s/√n = 20/√400 = 20/20 = 1. Note how much smaller this is than the data’s own spread of 20: the standard error describes how the estimate varies, not how the observations vary.',
      },
      {
        id: 'STAT-014-q3',
        type: 'mcq',
        concept: 'sample size and width',
        prompt: 'You want to halve the width of a confidence interval. Roughly how much data do you need?',
        options: [
          'Four times as much',
          'Twice as much',
          'Half as much',
          'It depends only on the confidence level, not the sample size',
        ],
        answerIndex: 0,
        explanation:
          'The margin of error is proportional to 1/√n, so halving it requires quadrupling n. This square-root relationship is the fundamental economics of data collection: each extra decimal place of precision costs a hundred times the data.',
      },
      {
        id: 'STAT-014-q4',
        type: 'truefalse',
        concept: 'bias versus precision',
        prompt: 'A very narrow confidence interval guarantees the estimate is close to the true value.',
        answer: false,
        explanation:
          'False. Width measures precision, which concerns sampling variability alone. A biased sampling procedure gives a tight interval around the wrong number, and collecting more data narrows it further without moving it towards the truth.',
      },
      {
        id: 'STAT-014-q5',
        type: 'fill',
        concept: 'critical value',
        prompt: 'For a 95% confidence interval with a large sample, how many standard errors wide is the margin of error?',
        answers: ['1.96', '1.96 standard errors', 'about 2', '~1.96', '2'],
        explanation:
          'About 1.96, the standard normal quantile leaving 2.5% in each tail. It is 1.645 for 90% and 2.576 for 99%, which is why higher confidence always costs width.',
      },
      {
        id: 'STAT-014-q6',
        type: 'multi',
        concept: 'what widens an interval',
        prompt: 'Which of these make a confidence interval for a mean wider?',
        options: [
          'Increasing the confidence level from 90% to 99%',
          'A larger population standard deviation',
          'A smaller sample size',
          'A sample mean further from zero',
          'Using a t critical value instead of z when n is small',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Width is critical value times s/√n, so it responds to the confidence level, the spread and the sample size, and to the heavier-tailed t multiplier when sigma is estimated. Where the mean happens to sit only shifts the interval; it does not change its width.',
      },
      {
        id: 'STAT-014-q7',
        type: 'explain',
        concept: 'interpretation and limits',
        prompt:
          'An A/B test reports a conversion lift of +1.2% with a 95% confidence interval of [−0.4%, +2.8%]. Explain what this does and does not tell the business, and what you would do next.',
        rubric: [
          'States that the interval includes zero, so the data do not distinguish the change from no effect',
          'Notes that this is not evidence of no effect — a useful gain remains consistent with the data',
          'Proposes a concrete next step tied to the square-root relationship between width and sample size',
        ],
        sampleAnswer:
          'The measured lift is 1.2%, but the interval runs from a small loss to a substantial gain, so the experiment has not separated this change from doing nothing. The first thing to say plainly is that reporting "we saw a 1.2% lift" without the interval would be reporting noise as a finding. The second thing, equally important and usually omitted, is that this is not evidence the change does nothing: a real gain of 2% is entirely consistent with these data, so "no significant effect" must not be translated into "no effect". The experiment is simply underpowered for the size of effect being looked for. What I would do next depends on the smallest lift worth shipping. If that is 1%, I would compute the traffic needed for the margin of error to be comfortably below 1%. Because the margin shrinks with the square root of the sample size, roughly halving the current margin of 1.6 points means about four times the current traffic, and I would check whether that is a few more days or a few more months before committing. Alongside that I would verify the things an interval cannot see: that randomisation was at the right unit, that the analysis was not peeked at repeatedly while running — which destroys the stated coverage — and that this is not one metric out of twenty being scanned for something interesting, because at 95% confidence one interval in twenty excludes zero by chance alone.',
        explanation:
          'A good answer refuses both wrong conclusions — "it worked" and "it does nothing" — and converts the width of the interval into a concrete data-collection decision.',
      },
    ],

    flashcards: [
      { front: 'What does 95% confidence actually refer to?', back: 'The procedure: 95% of intervals built this way over repeated samples contain the true parameter. Not the particular interval you computed.' },
      { front: 'Why is "95% probability the parameter is in this interval" wrong?', back: 'The parameter is a fixed constant with no distribution; the randomness is in the sample and hence in the endpoints. After computing, the statement is simply true or false.' },
      { front: 'What is the standard error of a mean?', back: 's/√n — the standard deviation of the sampling distribution of the mean, describing how the estimate wobbles, not how the data spread.' },
      { front: 'How does interval width depend on n?', back: 'It is proportional to 1/√n. Quadrupling the data halves the width; one extra decimal place of precision costs a hundred times the data.' },
      { front: 'Confidence interval versus prediction interval?', back: 'The first bounds the mean and shrinks with n; the second bounds a single future observation and stays roughly as wide as the data, about √n times wider.' },
      { front: 'When should you use a t interval instead of z?', back: 'When sigma is estimated from a small sample. The t distribution has heavier tails, giving a larger multiplier that pays for that extra uncertainty.' },
      { front: 'When is the bootstrap the right tool?', back: 'When the statistic has no tidy formula — a median, a percentile, an AUC — or the data are skewed enough that a symmetric interval misplaces both ends.' },
      { front: 'What can a confidence interval never tell you?', back: 'Whether the sample was biased. It quantifies sampling variability only; a biased sample gives a narrow interval around the wrong value.' },
    ],

    challenge: {
      title: 'Verify coverage, then break it',
      brief:
        'Write a simulation that builds confidence intervals for a mean under five conditions and measures actual coverage against the nominal 95%: normal data with n = 100, normal data with n = 5 using both the z and t multipliers, strongly skewed log-normal data with n = 20, a proportion with p = 0.01 and n = 200 using the normal approximation, and the same proportion using a Wilson interval. Then add a sixth condition with a deliberately biased sampler — one that systematically omits the top decile — and report both coverage and interval width. Produce a table and a short written conclusion about which failures the interval can and cannot warn you about.',
      language: 'python',
      acceptanceCriteria: [
        'Coverage is measured empirically over at least 10,000 replications per condition, not asserted',
        'The z-versus-t comparison at n = 5 shows the z interval under-covering, with the size of the shortfall stated',
        'The small-p normal approximation is shown to under-cover and to produce impossible bounds below zero',
        'The Wilson interval is shown to restore approximately nominal coverage for the same small-p case',
        'The biased sampler shows near-zero coverage with narrow intervals, and the write-up draws the correct conclusion about bias versus precision',
      ],
      starterCode:
        'import numpy as np\nfrom scipy import stats\n\nrng = np.random.default_rng(0)\n\ndef coverage(sampler, true_value, interval_fn, trials=10_000):\n    """Fraction of intervals from interval_fn that contain true_value."""\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who understands means, standard deviations and the central limit theorem what a confidence interval is, how wide it should be, and exactly what the 95% refers to. Make sure they leave able to correct the standard misinterpretation.',
      mustCover: [
        'An interval reports the precision of an estimate rather than a single number pretending to be exact',
        'Width is the critical value times the standard error, and the standard error shrinks as √n',
        'The 95% is a property of the procedure across repeated samples, not of the one interval computed',
        'The interval covers sampling variability only and cannot detect bias',
      ],
      bonusSignals: ['distinguishes a confidence interval from a prediction interval', 'gives the quadratic cost of extra precision', 'says explicitly why "95% chance the parameter is in here" is wrong'],
      sampleExplanation:
        'You measure something on a sample and get a number. That number is not the truth, and everyone knows it, but a bare number on a slide stops looking uncertain within about four seconds. A confidence interval is the discipline of reporting the uncertainty alongside the estimate so the reader cannot forget it. The construction comes straight from the central limit theorem. Your sample mean is approximately normal, centred on the true mean, with a spread of sigma over root n — call that the standard error, and notice it describes how the estimate wobbles rather than how the data spread. A normal distribution keeps about 95% of its mass within 1.96 standard deviations of its centre, so before you collect anything you can say the mean you are about to get will land within 1.96 standard errors of the true mean about 95% of the time. Then you flip it: if the sample mean is usually within that distance of the true mean, an interval of that width drawn around your sample mean usually reaches the true mean, because being within a distance is symmetric. That flip is the whole construction. Now the interpretation, which is where almost everyone goes wrong, including people who use these professionally. It is tempting to say "there is a 95% chance the true value is between 3.9 and 4.5". That sentence is wrong, and it is worth knowing exactly why rather than just avoiding it. The true mean is a fixed number. It is not wandering about. The thing that was random was your sample, and therefore the two endpoints of your interval. Before you collected the data, there genuinely was a 95% probability that the random interval you were about to build would land around the fixed truth. After you collect it, everything in the statement is a specific number and the statement is simply true or false — you just do not know which. So the correct phrasing is about the method: intervals built this way capture the truth 95% of the time. Picture casting a net: the manufacturer tested the design and it catches the fish on 95 casts in 100, but once this particular net has closed, the fish is in or out. Two practical consequences. First, width. It is the critical value times the standard error, and the standard error carries a square root, so precision gets expensive fast — quadrupling your data halves the width, and squeezing out one more decimal place costs a hundred times the data. When someone asks whether collecting a bit more data will settle the question, that square root is your answer. Second, and this is the limitation to state loudly: the interval quantifies sampling variability and nothing else. If your sample came from the wrong population, the interval will be beautifully narrow and centred on the wrong number, and more data will make it narrower and no less wrong. How you collected the data matters more than the arithmetic you do afterwards.',
    },
  },
  {
    id: 'STAT-015',
    domain: 'STAT',
    module: 'Interpreting Evidence',
    topic: 'Testing claims and inferring causes',
    title: 'Hypothesis Testing, p-values and Causation',
    slug: 'hypothesis-testing-and-p-values',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['STAT-013', 'STAT-014'],
    related: ['STAT-003', 'STAT-009', 'STAT-012'],
    tags: ['hypothesis testing', 'p-value', 'type I error', 'type II error', 'power', 'p-hacking', 'multiple comparisons', 'causation', 'confounding', 'a-b testing'],

    learningObjectives: [
      'Set up a null and an alternative hypothesis for a concrete question, and explain why the null is the one assumed true',
      'Define a p-value correctly and identify the three wrong definitions people routinely give',
      'Distinguish type I from type II errors, and explain how alpha, effect size and sample size determine power',
      'Explain how multiple comparisons and p-hacking manufacture significance, and apply a correction',
      'Separate statistical significance from practical importance, and read a test alongside its confidence interval',
      'Explain why correlation does not imply causation, name the mechanisms that produce spurious association, and say what randomisation actually buys',
    ],

    terminology: [
      {
        term: 'Null hypothesis',
        definition:
          'The default claim of no effect or no difference, denoted H₀. It is assumed true for the purpose of computing the p-value, and is rejected only if the data would be surprising under it.',
        simple: 'The boring explanation: nothing is going on.',
      },
      {
        term: 'Test statistic',
        definition:
          'A single number computed from the sample that measures how far the data fall from what the null predicts, scaled by the noise — for example a t statistic, which is a difference divided by its standard error.',
        simple: 'How big the effect is, measured in units of how much it wobbles.',
      },
      {
        term: 'p-value',
        definition:
          'The probability of obtaining a test statistic at least as extreme as the observed one, assuming the null hypothesis is true. It is a statement about the data given the hypothesis, never the reverse.',
        simple: 'If nothing were really going on, how often would you see a result this striking?',
      },
      {
        term: 'Significance level',
        definition:
          'A threshold alpha, chosen before seeing the data, below which the p-value leads to rejecting the null. It is the type I error rate you have agreed to tolerate.',
        simple: 'The bar you set in advance for calling a result convincing.',
      },
      {
        term: 'Type I and type II error',
        definition:
          'A type I error rejects a true null — a false positive, occurring at rate alpha. A type II error fails to reject a false null — a false negative, occurring at rate beta.',
        simple: 'Crying wolf, versus missing the wolf.',
      },
      {
        term: 'Power',
        definition:
          'The probability 1 − beta of detecting an effect of a specified size when it genuinely exists. It rises with sample size, with effect size, and with a larger alpha.',
        simple: 'The chance your test notices a real effect.',
      },
      {
        term: 'Confounder',
        definition:
          'A variable that influences both the supposed cause and the supposed effect, producing an association between them that is not causal.',
        simple: 'A hidden third thing driving both of the things you measured.',
      },
      {
        term: 'p-hacking',
        definition:
          'Analysing data in many ways — trying subgroups, metrics, exclusions or stopping points — and reporting whichever yielded p < 0.05. It inflates the false-positive rate far above the nominal alpha.',
        simple: 'Searching until something looks significant, then reporting only that.',
      },
    ],

    simpleExplanation:
      "Suppose you change the colour of a button and conversions go up by 2%. Did the change work, or would you have seen a wobble like that anyway? Hypothesis testing is a formal way of asking that question. You start by assuming the dull answer — the change did nothing — and then ask: if that were true, how often would random variation alone produce a result at least as striking as the one I got? That probability is the p-value. If it is very small, the dull answer is starting to look like a poor explanation for what you saw, so you reject it. Two cautions come with this, and they matter more than the arithmetic. The first is that a small p-value tells you the result is hard to explain by chance; it does not tell you the effect is large, or important, or real in some deeper sense. The second is that the whole procedure only earns its guarantees if you decided what to test before you looked. Search through enough comparisons and something will cross the line by luck alone — at the usual threshold, about one in twenty.",

    whyItExists:
      'Every measured difference is part signal and part noise, and human beings are extremely good at seeing patterns in noise. Hypothesis testing exists to impose a decision rule agreed in advance: a specified false-positive rate, a defined threshold, and an explicit statement of what the data would have to look like to change your mind — so that conclusions do not depend on how badly someone wanted the result.',

    analogy: {
      scenario:
        'A criminal trial begins by assuming the defendant is innocent, and the prosecution must show that the evidence would be very unlikely to arise if that assumption held. The jury is not asked whether innocence is probable; it is asked whether the evidence is compatible with it. A verdict of not guilty therefore does not mean the defendant has been shown to be innocent — only that the evidence fell short. And the standard of proof is fixed before the trial, precisely so that it cannot be adjusted once everyone can see which way the evidence points.',
      mapping: [
        { from: 'The presumption of innocence', to: 'The null hypothesis, assumed true while the evidence is weighed' },
        { from: 'The strength of the evidence against innocence', to: 'The test statistic' },
        { from: 'How unlikely this evidence would be for an innocent person', to: 'The p-value' },
        { from: 'The standard of proof, fixed in advance', to: 'The significance level alpha' },
        { from: 'Convicting an innocent defendant', to: 'A type I error, a false positive at rate alpha' },
        { from: 'Acquitting a guilty defendant', to: 'A type II error, a false negative at rate beta' },
        { from: 'A verdict of not guilty', to: 'Failing to reject the null — which is not the same as proving it' },
        { from: 'Retrying the same person until a jury convicts', to: 'Testing many metrics or peeking repeatedly until something reaches p < 0.05' },
      ],
      bridge:
        'The asymmetry in the story is the asymmetry in the mathematics. The p-value is computed under the assumption that the null is true, so like a trial it can only ever cast doubt on that assumption — it cannot confirm it, and it says nothing about the probability that the assumption is true. That is exactly why "we failed to reject the null" must never be reported as "we showed there is no effect", and why the retrial image captures p-hacking so well: each fresh attempt gets its own independent chance of a false conviction.',
      limitations:
        'The analogy has no counterpart for effect size, and that omission matters. A court asks only whether guilt is established; statistics must also ask how much. A massive sample can make a completely trivial difference come out as overwhelmingly significant, which is a conviction for an offence nobody should care about.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Running a hypothesis test honestly',
        caption: 'Steps one to three happen before any data is seen. That ordering is what the guarantees depend on.',
        steps: [
          { label: 'State H₀ and H₁', detail: 'The null is the no-effect default; the alternative is what you would act on. Decide one-sided or two-sided now, not later.' },
          { label: 'Choose alpha and the minimum effect worth detecting', detail: 'Alpha is the false-positive rate you accept. The minimum effect is a business or scientific judgement, not a statistical one.' },
          { label: 'Compute the required sample size', detail: 'Power analysis turns alpha, the effect size and a target power of 80% or 90% into an n. Commit to it.' },
          { label: 'Collect the data, then compute the test statistic', detail: 'A difference divided by its standard error. No looking before the planned n is reached.' },
          { label: 'Compute the p-value and the confidence interval', detail: 'The p-value gives the decision; the interval gives the magnitude and its uncertainty. Report both, always.' },
          { label: 'Decide, and state the effect size', detail: 'Reject or fail to reject — and say how big the effect was and whether that size matters in practice.' },
        ],
      },
      {
        kind: 'compare',
        title: 'What a p-value is, and the three things people think it is',
        caption: 'The three wrong definitions are all the same error: reversing the conditional.',
        left: {
          heading: 'Correct',
          points: [
            'P(data at least this extreme | H₀ is true)',
            'A statement about the data, conditional on the hypothesis',
            'Small p means the data are surprising if nothing is going on',
            'Says nothing about how large the effect is',
            'Its guarantees hold only for a test specified in advance',
          ],
        },
        right: {
          heading: 'Wrong, and why',
          points: [
            '"The probability the null is true" — that reverses the conditional; it would need a prior',
            '"The probability the result was due to chance" — same reversal in plainer clothing',
            '"1 − p is the probability the finding will replicate" — replication depends on power and true effect size, not p',
            '"p = 0.04 means a stronger effect than p = 0.06" — a threshold is not a measurement',
            '"p > 0.05 proves there is no effect" — absence of evidence, not evidence of absence',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The four outcomes of a test',
        caption: 'Alpha and beta are the two ways of being wrong, and lowering one raises the other unless you collect more data.',
        columns: ['', 'H₀ is actually true', 'H₀ is actually false'],
        rows: [
          ['You reject H₀', 'Type I error — false positive, rate alpha', 'Correct detection — probability 1 − beta, the power'],
          ['You fail to reject H₀', 'Correct — probability 1 − alpha', 'Type II error — false negative, rate beta'],
          ['Controlled by', 'Choosing alpha before the test', 'Sample size, effect size and alpha together'],
          ['Cost in an A/B test', 'Shipping a change that does nothing, and trusting a false result', 'Discarding a change that would have worked'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a t statistic',
        subject: 't = (x̄₁ − x̄₂) / SE(x̄₁ − x̄₂)',
        annotations: [
          { part: 'x̄₁ − x̄₂', note: 'The observed effect: the raw difference between groups. This is what the business cares about, in its own units.' },
          { part: 'SE(x̄₁ − x̄₂)', note: 'The noise: how much that difference would vary across repeated experiments. It shrinks as √n.' },
          { part: 'the ratio', note: 'Signal divided by noise. Big t means the difference is large relative to the wobble, which is the only sense in which a test finds anything.' },
          { part: 'why n matters', note: 'Increasing n does not change the effect, only the denominator — so any non-zero difference becomes significant eventually.' },
          { part: 'the p-value from t', note: 'The tail area beyond ±t under the null distribution. Two-sided unless you genuinely pre-registered a direction.' },
        ],
      },
      {
        kind: 'flow',
        title: 'From correlation to a causal claim',
        caption: 'Four rival explanations must be eliminated before "X causes Y" is warranted.',
        branching: true,
        steps: [
          { label: 'X and Y move together', detail: 'The starting observation. It is compatible with every branch below.' },
          { label: 'Chance', detail: 'With enough variables examined, strong correlations appear by luck alone. Ruled out by pre-registration and replication.' },
          { label: 'Reverse causation', detail: 'Y causes X. Ruled out by temporal ordering or by intervening on X.' },
          { label: 'Confounding', detail: 'A third variable Z drives both. Ruled out by randomisation, or partially by adjusting for measured confounders.' },
          { label: 'Selection effects', detail: 'The sample was chosen in a way that manufactures the association. Ruled out by examining how units entered the data.' },
          { label: 'Causation', detail: 'What remains once the others are excluded. A randomised experiment excludes confounding by construction, which is why it is the gold standard.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Where the null distribution comes from',
        caption: 'Simulate the sampling distribution under the null, then see where your observed statistic falls in its tail.',
        widget: 'clt-sim',
      },
    ],

    formalDefinition:
      'Given a null hypothesis H₀ specifying a distribution for a test statistic T, the p-value of an observed t_obs is P(T at least as extreme as t_obs | H₀), where extremeness is defined by the alternative. Rejecting H₀ when p ≤ alpha yields a test with type I error rate alpha; the type II error rate beta and the power 1 − beta are defined against a specific alternative and depend on the effect size, the variance and the sample size. A p-value is a probability of data given a hypothesis and is not P(H₀ | data), which requires a prior and Bayes’ theorem.',

    math: {
      intuition:
        'The whole machine rests on one comparison. Assume nothing is going on. Under that assumption, the difference you are measuring still wobbles from experiment to experiment, and the central limit theorem tells you the shape and width of that wobble: roughly normal, centred on zero, with a spread equal to the standard error. That is the null distribution — a full picture of what noise alone can produce. Now place your observed difference on it. If it sits comfortably inside the bulk, noise explains it and you have learned nothing. If it sits far out in the tail, noise is a poor explanation, and the p-value is exactly the area of that tail: the proportion of noise-only experiments that would have produced something at least this extreme. Two consequences follow immediately. First, since the standard error shrinks like one over root n, any non-zero difference at all is eventually pushed into the tail by enough data — so statistical significance is a statement about sample size as much as about the effect. Second, since the tail beyond the threshold has area alpha by construction, testing twenty independent true nulls gives you roughly one excursion into it by chance, which is the entire arithmetic of the multiple-comparisons problem.',
      formulas: [
        {
          latex: 'p = P\\bigl(|T| \\ge |t_{\\text{obs}}| \\;\\big|\\; H_0\\bigr)',
          name: 'The p-value, two-sided',
          meaning:
            'The probability of a statistic at least as extreme as the one observed, computed assuming the null is true. Note the direction of the conditioning bar — it is the single most important symbol in the formula.',
          variables: [
            { symbol: 'T', meaning: 'The test statistic regarded as a random variable under the null' },
            { symbol: 't_{\\text{obs}}', meaning: 'The value actually computed from your sample' },
            { symbol: 'H_0', meaning: 'The null hypothesis, assumed true for the purpose of this calculation' },
            { symbol: '|\\cdot|', meaning: 'Absolute value, making the test two-sided: extreme in either direction counts' },
          ],
          category: 'statistics',
        },
        {
          latex: 't = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\dfrac{s_1^2}{n_1} + \\dfrac{s_2^2}{n_2}}}',
          name: 'Two-sample t statistic (Welch)',
          meaning:
            'The observed difference divided by its standard error. Welch’s version does not assume the two groups have equal variances, which is why it is the sensible default.',
          variables: [
            { symbol: '\\bar{x}_1, \\bar{x}_2', meaning: 'The two group means — control and treatment' },
            { symbol: 's_1^2, s_2^2', meaning: 'The two sample variances, estimated separately' },
            { symbol: 'n_1, n_2', meaning: 'The two group sizes' },
            { symbol: 'the denominator', meaning: 'The standard error of the difference — the noise the effect must stand out against' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\alpha = P(\\text{reject } H_0 \\mid H_0 \\text{ true}), \\qquad \\beta = P(\\text{fail to reject } H_0 \\mid H_1 \\text{ true}), \\qquad \\text{power} = 1 - \\beta',
          name: 'The two error rates and power',
          meaning:
            'Alpha is chosen; beta follows from the design. For a fixed sample size, tightening alpha increases beta — the only way to reduce both is more data.',
          variables: [
            { symbol: '\\alpha', meaning: 'Type I error rate: the false-positive rate you accept, conventionally 0.05' },
            { symbol: '\\beta', meaning: 'Type II error rate: the chance of missing a real effect of the specified size' },
            { symbol: '1 - \\beta', meaning: 'Power: the probability of detecting that effect when it exists; 0.80 is a common target' },
            { symbol: 'H_1', meaning: 'A specific alternative — power is undefined without naming the effect size you care about' },
          ],
          category: 'statistics',
        },
        {
          latex: 'n \\approx \\frac{2\\sigma^2\\,(z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\delta^2}',
          name: 'Sample size per group for a two-sample comparison',
          meaning:
            'The n needed to detect a difference delta with the chosen alpha and power. The square on delta is the punchline: halving the effect you want to detect quadruples the data required.',
          variables: [
            { symbol: '\\delta', meaning: 'The minimum effect size worth detecting, in the measurement’s own units' },
            { symbol: '\\sigma', meaning: 'The standard deviation of the outcome within a group' },
            { symbol: 'z_{1-\\alpha/2}', meaning: '1.96 for alpha = 0.05 two-sided' },
            { symbol: 'z_{1-\\beta}', meaning: '0.84 for 80% power, 1.28 for 90% power' },
            { symbol: 'n', meaning: 'Required observations per group' },
          ],
          category: 'statistics',
        },
        {
          latex: 'P(\\text{at least one false positive}) = 1 - (1-\\alpha)^{m}',
          name: 'The multiple-comparisons inflation',
          meaning:
            'Run m independent tests on true nulls and the chance of at least one spurious significant result grows quickly: 23% at m = 5, 40% at m = 10, 64% at m = 20.',
          variables: [
            { symbol: 'm', meaning: 'The number of independent tests performed — including the ones you did not report' },
            { symbol: '\\alpha', meaning: 'The per-test significance level' },
            { symbol: '(1-\\alpha)^m', meaning: 'The probability that every one of the m tests correctly fails to reject' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\alpha_{\\text{Bonferroni}} = \\frac{\\alpha}{m}, \\qquad \\text{BH: reject } p_{(i)} \\le \\frac{i}{m}\\alpha',
          name: 'Two corrections',
          meaning:
            'Bonferroni controls the chance of any false positive and is conservative. Benjamini–Hochberg controls the expected proportion of false discoveries among those declared significant, and is the usual choice when screening many hypotheses.',
          variables: [
            { symbol: 'm', meaning: 'The number of tests in the family' },
            { symbol: 'p_{(i)}', meaning: 'The i-th smallest p-value when they are sorted ascending' },
            { symbol: 'i', meaning: 'That p-value’s rank, which makes the BH threshold less punishing than Bonferroni for the smallest p-values' },
            { symbol: '\\alpha', meaning: 'The family-wise error rate, or the false discovery rate, being controlled' },
          ],
          category: 'statistics',
        },
        {
          latex: 'P(H_0 \\mid \\text{data}) = \\frac{P(\\text{data} \\mid H_0)\\,P(H_0)}{P(\\text{data})} \\neq p',
          name: 'Why the p-value is not the probability the null is true',
          meaning:
            'Getting from P(data | H₀) to P(H₀ | data) requires Bayes’ theorem and a prior. When most tested hypotheses are false leads, a p just under 0.05 can still leave a large posterior probability that the null is true.',
          variables: [
            { symbol: 'P(H_0 \\mid \\text{data})', meaning: 'What people want: the probability the null is true given what was observed' },
            { symbol: 'P(\\text{data} \\mid H_0)', meaning: 'What the p-value is built from: the probability of the data given the null' },
            { symbol: 'P(H_0)', meaning: 'The prior probability the null is true — supplied by context, never by the data alone' },
            { symbol: 'P(\\text{data})', meaning: 'The marginal probability of the data across all hypotheses' },
          ],
          category: 'probability',
        },
      ],
      derivation: [
        'Why does a small p-value count as evidence? Start by assuming the null is true, and derive the distribution the test statistic must then follow.',
        'For a difference of means, the central limit theorem gives that distribution: approximately normal, centred on zero, with standard deviation equal to the standard error of the difference.',
        'Standardising by that standard error produces a statistic whose null distribution is known and fixed — a t distribution, or a standard normal for large samples.',
        'The p-value is the tail area beyond the observed value. By construction, if the null is true this quantity is uniformly distributed on [0, 1], which is why P(p ≤ alpha) = alpha exactly.',
        'That uniformity is the whole guarantee: rejecting when p ≤ alpha gives a false-positive rate of exactly alpha, no more and no less — for one pre-specified test.',
        'Now break the guarantee. Run m independent tests on true nulls. Each p-value is uniform, so the probability that none falls below alpha is (1 − alpha)^m, and the chance of at least one false positive is 1 − (1 − alpha)^m. At alpha = 0.05 and m = 20 that is 0.64.',
        'The same arithmetic covers p-hacking, which is multiple testing with the count concealed. Trying four metrics, three subgroups and two exclusion rules is twenty-four tests even if only one is written up — the reported alpha of 0.05 is then a fiction.',
        'Repeated peeking is the sequential version: checking an ongoing experiment daily and stopping at the first p < 0.05 raises the false-positive rate to well above 0.30, because each look is another opportunity to cross the line. Sequential designs exist precisely to restore the guarantee under looking.',
        'Finally, why a p-value cannot tell you the probability the null is true. It supplies P(data | H₀); the question asks for P(H₀ | data), and Bayes’ theorem shows these differ by the ratio of priors and the marginal likelihood.',
        'A concrete consequence: if only one in ten tested hypotheses is genuinely true, a test with alpha = 0.05 and 80% power produces about 45 false positives for every 80 true ones across a thousand tests — so roughly a third of significant findings are wrong even with everything done correctly.',
      ],
    },

    workedExample: {
      title: 'An A/B test, from power calculation to honest conclusion',
      setup:
        'A model-ranked recommendation panel is tested against the existing rule-based one. Baseline conversion is 5.0%. The product team says a lift below 0.5 percentage points is not worth the maintenance cost. Plan the experiment, then analyse a result of 5.6% treatment against 5.0% control on 20,000 users per arm.',
      steps: [
        { label: 'State the hypotheses', detail: 'H₀: p_treatment = p_control, the new panel changes nothing. H₁: p_treatment ≠ p_control, two-sided because a meaningful drop matters as much as a rise.', latex: 'H_0: p_t = p_c' },
        { label: 'Fix alpha and power before collecting anything', detail: 'alpha = 0.05, power = 0.80. Both are decisions about acceptable error rates, made now so they cannot be adjusted once the numbers are visible.', latex: '\\alpha = 0.05,\\; 1-\\beta = 0.80' },
        { label: 'Compute the required sample size', detail: 'For proportions with p ≈ 0.05, sigma² ≈ p(1 − p) = 0.0475, and delta = 0.005. n ≈ 2(0.0475)(1.96 + 0.84)²/0.005² = 2(0.0475)(7.84)/0.000025 ≈ 29,792 per arm.', latex: 'n \\approx \\frac{2 p(1-p)(z_{\\alpha/2} + z_{\\beta})^2}{\\delta^2} \\approx 29{,}800' },
        { label: 'Notice the problem immediately', detail: 'The experiment as run has 20,000 per arm, not 29,800. It is underpowered for the effect the team said it cares about — power is roughly 63%, so a genuine 0.5-point lift would be missed more than a third of the time. This is worth knowing before the analysis, not after.' },
        { label: 'Compute the observed difference', detail: '5.6% − 5.0% = 0.6 percentage points, a relative lift of 12%.', latex: '\\hat{p}_t - \\hat{p}_c = 0.006' },
        { label: 'Compute the standard error of the difference', detail: 'SE = √(0.056·0.944/20000 + 0.05·0.95/20000) = √(2.643e−6 + 2.375e−6) = √5.018e−6 = 0.00224.', latex: '\\mathrm{SE} = 0.00224' },
        { label: 'Compute the test statistic', detail: 'z = 0.006/0.00224 = 2.68. The observed difference is 2.68 standard errors from zero.', latex: 'z = 2.68' },
        { label: 'Compute the p-value', detail: 'Two-sided tail area beyond ±2.68 under the standard normal is 0.0074. Under the null, results this extreme occur about seven times in a thousand.', latex: 'p = 0.0074' },
        { label: 'Build the confidence interval, which is the more useful output', detail: '0.006 ± 1.96(0.00224) = 0.006 ± 0.0044, that is [0.0016, 0.0104], or a lift between 0.16 and 1.04 percentage points.', latex: '[0.16\\%,\\; 1.04\\%]' },
        { label: 'Read the interval against the decision threshold', detail: 'The interval excludes zero, so the effect is distinguishable from nothing. But it also includes values below the 0.5-point threshold the team set, so the data do not establish that the lift is large enough to be worth shipping. Significance and importance have come apart, and only the interval reveals it.' },
        { label: 'Check what would invalidate all of this', detail: 'Was this the only metric examined, or one of fifteen? Was the test stopped as soon as p dropped below 0.05, or at the planned n? Was randomisation at the user level, so that one user cannot contribute to both arms? Any of these breaks the stated 0.05 error rate regardless of the arithmetic above.' },
        { label: 'State the conclusion honestly', detail: 'The new panel produces a conversion lift that is unlikely to be chance alone, estimated at 0.6 points with a plausible range of 0.16 to 1.04 points. Because the range extends below the 0.5-point decision threshold, the experiment does not settle whether the lift justifies the cost; extending to roughly 30,000 per arm would narrow it enough to decide.' },
      ],
      conclusion:
        'The p-value answered one narrow question — is this distinguishable from noise — and answered it well. Every decision-relevant fact came from elsewhere: the size of the effect, its plausible range, the pre-set threshold for mattering, and whether the experiment had the power to detect what was being looked for. Report the p-value if you like, but the interval and the effect size are what anyone should act on.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A two-sample test, with the interval that makes it interpretable',
        runnable: true,
        code: `import numpy as np
from scipy import stats

rng = np.random.default_rng(7)
control   = rng.normal(100, 15, 200)      # true mean 100
treatment = rng.normal(103, 15, 200)      # true mean 103: a real effect

t, p = stats.ttest_ind(treatment, control, equal_var=False)   # Welch
diff = treatment.mean() - control.mean()
se = np.sqrt(treatment.var(ddof=1) / 200 + control.var(ddof=1) / 200)
ci = (diff - 1.96 * se, diff + 1.96 * se)

print(f"observed difference: {diff:.2f}")
print(f"t = {t:.3f}, p = {p:.5f}")
print(f"95% CI for the difference: [{ci[0]:.2f}, {ci[1]:.2f}]")
print(f"Cohen's d = {diff / np.sqrt((treatment.var(ddof=1) + control.var(ddof=1)) / 2):.3f}")

# The same true effect, with a tiny sample: real, but undetectable
small_c, small_t = rng.normal(100, 15, 12), rng.normal(103, 15, 12)
t2, p2 = stats.ttest_ind(small_t, small_c, equal_var=False)
print(f"n=12 per arm: p = {p2:.3f}  ->  fail to reject, though the effect is real")`,
        output: `observed difference: 3.63
t = 2.484, p = 0.01340
95% CI for the difference: [0.77, 6.50]
Cohen's d = 0.248
n=12 per arm: p = 0.462  ->  fail to reject, though the effect is real`,
        explanation:
          'Three outputs, three different jobs. The p-value of 0.013 says a difference this large is unlikely under the null. The confidence interval [0.77, 6.50] says how large the difference plausibly is, which is what anyone deciding whether to act needs. Cohen’s d of 0.25 standardises it as a small effect. The final line is the lesson that a p-value alone cannot convey: the same real three-point effect, measured on twelve subjects per arm, gives p = 0.46. Nothing about the world changed — only the power. Reporting "no significant difference" there would be reporting the sample size, not the biology.',
      },
      {
        language: 'python',
        title: 'Manufacturing significance three ways',
        runnable: true,
        code: `import numpy as np
from scipy import stats
rng = np.random.default_rng(0)

# 1. Multiple comparisons: 20 metrics, NO real effect anywhere
pvals = [stats.ttest_ind(rng.normal(0, 1, 100), rng.normal(0, 1, 100)).pvalue
         for _ in range(20)]
print("significant out of 20 pure-noise tests:", sum(p < 0.05 for p in pvals))
print("P(at least one) =", round(1 - 0.95 ** 20, 3))

# 2. Peeking: check every 50 users and stop at the first p < 0.05
def peeking_trial():
    a, b = [], []
    for _ in range(40):                       # up to 2000 per arm
        a.extend(rng.normal(0, 1, 50)); b.extend(rng.normal(0, 1, 50))
        if stats.ttest_ind(a, b).pvalue < 0.05:
            return True                       # "significant!" — but H0 is TRUE
    return False
print("false positives when peeking:", sum(peeking_trial() for _ in range(500)) / 500)

# 3. Corrections restore the guarantee
from statsmodels.stats.multitest import multipletests
rej_bonf = multipletests(pvals, alpha=0.05, method="bonferroni")[0]
rej_bh   = multipletests(pvals, alpha=0.05, method="fdr_bh")[0]
print("after Bonferroni:", rej_bonf.sum(), " after Benjamini-Hochberg:", rej_bh.sum())`,
        output: `significant out of 20 pure-noise tests: 2
P(at least one) = 0.642
false positives when peeking: 0.366
after Bonferroni: 0  after Benjamini-Hochberg: 0`,
        explanation:
          'Every effect in this script is exactly zero by construction, so every "significant" result is a false positive. Twenty noise-only tests produced two of them, close to the expected one, and the probability of getting at least one was 64%. The peeking simulation is the more alarming number: checking an ongoing experiment repeatedly and stopping at the first p < 0.05 gave a false-positive rate of 37% rather than 5% — a sevenfold inflation, achieved without a single dishonest act, just impatience. The corrections restore the guarantee: Bonferroni divides alpha by the number of tests, while Benjamini–Hochberg controls the expected proportion of false discoveries and is less conservative when you are genuinely screening many hypotheses.',
      },
      {
        language: 'python',
        title: 'Power: the number nobody computes until it is too late',
        runnable: true,
        code: `import numpy as np
from statsmodels.stats.power import TTestIndPower
from statsmodels.stats.proportion import proportion_effectsize

analysis = TTestIndPower()

# How much data to detect a given standardised effect at 80% power?
for d in (0.2, 0.5, 0.8):
    n = analysis.solve_power(effect_size=d, alpha=0.05, power=0.80)
    print(f"effect d={d}:  n = {int(np.ceil(n))} per group")

# The A/B version: 5.0% baseline, want to detect a 0.5-point lift
h = proportion_effectsize(0.055, 0.050)
n_ab = analysis.solve_power(effect_size=h, alpha=0.05, power=0.80)
print(f"\\n5.0% -> 5.5% lift: n = {int(np.ceil(n_ab)):,} per arm")

# What power does an underpowered study actually have?
for n in (5_000, 20_000, 30_000):
    pw = analysis.power(effect_size=h, nobs1=n, alpha=0.05, ratio=1.0)
    print(f"n={n:>6,} per arm  ->  power = {pw:.2f}")`,
        output: `effect d=0.2:  n = 394 per group
effect d=0.5:  n = 64 per group
effect d=0.8:  n = 26 per group

5.0% -> 5.5% lift: n = 30,142 per arm
n= 5,000 per arm  ->  power = 0.22
n=20,000 per arm  ->  power = 0.64
n=30,000 per arm  ->  power = 0.80`,
        explanation:
          'The first block shows the quadratic cost of subtlety: detecting a small standardised effect of 0.2 needs 394 per group, while a large one needs 26. The A/B numbers are the ones worth internalising — moving a 5% conversion rate by half a point takes about 30,000 users per arm, which is why small sites genuinely cannot measure small lifts and should stop pretending otherwise. The last block is the diagnosis for most disappointing experiments: at 5,000 per arm the power is 0.22, so a real half-point lift would be missed 78% of the time. Running that test and reporting "no significant difference" describes the sample size, not the feature.',
      },
      {
        language: 'python',
        title: 'Confounding, and what randomisation actually does',
        runnable: true,
        code: `import numpy as np, pandas as pd
rng = np.random.default_rng(3)
n = 5000

# Observational: heavy users BOTH adopt the feature and convert more anyway.
engagement = rng.normal(0, 1, n)                       # the confounder
adopted = (engagement + rng.normal(0, 0.5, n)) > 0.3   # driven by engagement
converted = 0.05 + 0.04 * (engagement > 0)             # feature has NO effect
converted = rng.random(n) < converted

obs = pd.DataFrame({"adopted": adopted, "engagement": engagement > 0, "converted": converted})
naive = obs.groupby("adopted")["converted"].mean()
print("naive observational 'lift':", round(naive[True] - naive[False], 4))

# Adjust for the measured confounder: compare within engagement strata
strat = obs.groupby(["engagement", "adopted"])["converted"].mean().unstack()
print("within-stratum differences:", (strat[True] - strat[False]).round(4).tolist())

# Randomised: assignment is independent of engagement by construction
assigned = rng.random(n) < 0.5
converted_rct = rng.random(n) < (0.05 + 0.04 * (engagement > 0))   # still no effect
rct = pd.DataFrame({"assigned": assigned, "converted": converted_rct})
r = rct.groupby("assigned")["converted"].mean()
print("randomised estimate:", round(r[True] - r[False], 4))`,
        output: `naive observational 'lift': 0.0331
within-stratum differences: [0.0021, -0.0049]
randomised estimate: -0.0018`,
        explanation:
          'The feature does nothing — it appears nowhere in the code that generates conversions. Yet the naive comparison of adopters against non-adopters shows a 3.3-point "lift", because engaged users both adopt the feature and convert more for unrelated reasons. That is confounding, and no amount of extra data fixes it: a larger sample estimates the wrong number more precisely. Adjusting within engagement strata removes almost all of it, which is what regression adjustment and propensity matching attempt. But note the crucial limitation: that worked only because the confounder was measured. Randomisation does something stronger — it makes assignment independent of every confounder, measured or not, so the estimated difference is near zero as it should be. That is the entire reason randomised experiments are the gold standard, and the reason an observational "users who did X converted more" claim should never be reported as an effect of X.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A/B testing a model in production',
        usage:
          'Traffic is split between the current ranker and a new one, a primary metric is fixed in advance, a power calculation sets the runtime, and the test is not read until it ends. Mature experimentation platforms enforce this by hiding results until the planned sample is reached, precisely because peeking inflates false positives sevenfold.',
      },
      {
        context: 'Comparing two models offline',
        usage:
          'A paired test on the same evaluation set — McNemar’s test for classification, or a paired bootstrap for a ranking metric — is what tells you whether a 0.4-point gain survives resampling, rather than eyeballing two averages.',
      },
      {
        context: 'The replication crisis',
        usage:
          'Large replication projects in psychology and cancer biology found that a substantial fraction of published p < 0.05 findings did not reproduce. The diagnosed causes are exactly this unit’s material: low power, undisclosed multiple comparisons, flexible analysis choices and publication bias towards significant results.',
      },
      {
        context: 'Feature-importance screening',
        usage:
          'Testing a thousand candidate features for association with a target at alpha = 0.05 yields about fifty false positives even if none is genuinely predictive. Benjamini–Hochberg control of the false discovery rate is standard practice for exactly this reason.',
      },
    ],

    projectConnections: [
      { tool: 'scipy.stats', role: '`ttest_ind`, `ttest_rel`, `chi2_contingency` and `mannwhitneyu` cover the common tests directly.' },
      { tool: 'statsmodels', role: '`power` for sample-size planning and `multitest.multipletests` for Bonferroni and Benjamini–Hochberg corrections.' },
      { tool: 'mlxtend / scipy', role: 'McNemar’s test for comparing two classifiers on the same test set — the paired comparison that removes item-level noise.' },
      { tool: 'Experimentation platforms', role: 'Tools such as GrowthBook or an in-house system enforce pre-registration, fixed horizons or sequential designs so the error rates quoted are the real ones.' },
    ],

    commonMistakes: [
      {
        mistake: 'Saying the p-value is the probability the null hypothesis is true',
        why: 'It is P(data | H₀), not P(H₀ | data). Reversing a conditional requires Bayes’ theorem and a prior, and when most tested hypotheses are false leads, a p just under 0.05 can leave a substantial probability that the null is still true.',
        fix: 'State it as "if there were no effect, results this extreme would occur about p of the time". If you want a probability about the hypothesis, do a Bayesian analysis and supply the prior explicitly.',
      },
      {
        mistake: 'Reading p > 0.05 as proof of no effect',
        why: 'Failing to reject means the evidence was insufficient, which is equally consistent with no effect and with a real effect the study lacked the power to see. At 22% power, a genuine effect is missed more than three quarters of the time.',
        fix: 'Report the confidence interval and the power. Say "we could not distinguish this from zero; effects up to X remain consistent with the data" rather than "there is no effect".',
      },
      {
        mistake: 'Confusing statistical significance with practical importance',
        why: 'The test statistic is the effect divided by the standard error, and the standard error shrinks as √n. With enough data any non-zero difference becomes significant, including differences far too small to matter to anyone.',
        fix: 'Decide the minimum effect worth acting on before the test, and judge the confidence interval against it. Report effect sizes, not only p-values.',
      },
      {
        mistake: 'Peeking at a running experiment and stopping when it turns significant',
        why: 'Each look is another chance to cross the threshold, so the false-positive rate compounds. Checking daily and stopping at the first p < 0.05 pushes it from 5% to well over 30%.',
        fix: 'Fix the sample size in advance and analyse once, or use a sequential design with alpha-spending that accounts for the looks explicitly.',
      },
      {
        mistake: 'Testing many things and reporting only what worked',
        why: 'Trying several metrics, subgroups, transformations or exclusion rules is multiple testing whether or not it is disclosed. With twenty implicit comparisons, the chance of at least one spurious result is 64%, and the reported alpha of 0.05 is fiction.',
        fix: 'Pre-register the primary metric and analysis. Treat everything else as exploratory and label it as such, and apply Bonferroni or Benjamini–Hochberg when a family of tests is genuinely intended.',
      },
      {
        mistake: 'Inferring causation from an observational difference',
        why: 'A confounder that influences both the supposed cause and the outcome produces a real, statistically significant, entirely non-causal association — and more data estimates that wrong number more precisely rather than correcting it.',
        fix: 'Randomise where you can. Where you cannot, name the plausible confounders, adjust for the measured ones, use a design such as difference-in-differences or instrumental variables, and state the remaining assumptions plainly.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Define a p-value precisely, and give one common definition that is wrong.',
        answer:
          'A p-value is the probability of obtaining a test statistic at least as extreme as the one observed, assuming the null hypothesis is true. It is a statement about the data conditional on a hypothesis. The most common wrong definition is that it is the probability the null hypothesis is true — that reverses the conditional and would require a prior and Bayes’ theorem to compute. Two other frequent errors: that it is "the probability the result is due to chance", which is the same reversal in less formal language, and that 1 − p is the probability the finding will replicate, which depends on power and the true effect size rather than on p. It is also worth saying what a p-value contains no information about: the size of the effect. A very small p-value can accompany a difference far too small to matter, because the statistic is the effect divided by a standard error that shrinks with sample size.',
        followUp:
          'A strong answer volunteers that the p-value is uniformly distributed under the null, which is exactly why alpha behaves as advertised for a single pre-specified test and fails under multiple testing.',
      },
      {
        level: 'intermediate',
        question: 'Your A/B test has been running three days and just crossed p = 0.04. Do you ship?',
        answer:
          'Not on that basis, and the reason is that the 0.04 is not trustworthy if the test was being watched. Checking repeatedly and stopping at the first crossing is sequential testing without sequential correction, and it inflates the false-positive rate from 5% to above 30% — simulation makes this easy to demonstrate. So the first questions are procedural: was a sample size fixed in advance from a power calculation, has that sample been reached, was this the pre-registered primary metric, and how many other metrics have been examined. If the answer is that we have been looking daily, the honest position is that we do not have a valid 5% test and should either run to the planned horizon or adopt a sequential design with alpha-spending that accounts for the looks. Second, even with a valid p-value I would not decide on it alone: I would look at the confidence interval for the effect against the minimum lift we agreed is worth shipping, because significance and importance are different questions and only the interval answers the second.',
        followUp:
          'Mentioning novelty effects and day-of-week seasonality as reasons to run at least one full weekly cycle shows practical experience.',
      },
      {
        level: 'ml-engineer',
        question: 'A stakeholder shows you that users who adopted a new feature convert 30% more, and wants to roll it out everywhere. What do you say?',
        answer:
          'That the comparison does not support the conclusion, and that the effect is very likely confounded. Users who adopt a new feature are not a random sample: they are typically the more engaged users, and engagement independently predicts conversion, so a difference of this kind would appear even if the feature did nothing at all. This is straightforward to demonstrate in simulation, and it has a property worth stating plainly — more data does not help, because a larger sample estimates the confounded quantity more precisely rather than correcting it. Reverse causation is also live here: people who were already about to convert may be more likely to explore new features. What I would propose is a randomised experiment, because randomisation makes assignment independent of every confounder including the ones we have not thought to measure, which is precisely what adjustment cannot promise. If a randomised test is genuinely impossible, I would look for a quasi-experimental design — a staged rollout giving a difference-in-differences comparison, a regression discontinuity if eligibility has a threshold, or an instrument — and adjust for measured confounders while stating explicitly that the estimate rests on the assumption of no unmeasured confounding. Finally I would reframe the size: 30% relative on a small base may be a fraction of a percentage point absolute, which is worth knowing before anyone commits engineering effort.',
        followUp:
          'A strong candidate distinguishes a confounder from a mediator and notes that adjusting for a mediator would wrongly remove part of the genuine effect.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A test comparing two models yields p = 0.03. Write down three statements about this result that are wrong, and one that is right, explaining each in a sentence.',
        hint: 'Consider what the p-value is conditional on, what it says about effect size, and what it says about replication.',
        solution:
          'Wrong: "There is a 3% probability that the models are equally good." This reverses the conditional. The p-value is P(data this extreme | models equally good); turning it into a probability about the hypothesis requires a prior and Bayes’ theorem.\n\nWrong: "There is a 97% chance this result will replicate." Replication probability depends on the true effect size and the power of the replication study, not on the p-value of the original. For a study at 50% power, a p just under 0.05 often replicates well below half the time.\n\nWrong: "The difference between the models is large." The p-value is the effect divided by a standard error that shrinks like 1/√n. On a large test set a trivial difference produces a small p, so significance says nothing about magnitude.\n\nRight: "If the two models were genuinely equally good, we would see a difference at least this large in about 3% of repeated evaluations." That is exactly the definition, and it makes explicit both the conditional and the fact that the statement concerns the data rather than the hypothesis.',
      },
      {
        prompt:
          'You screen 500 candidate features for association with churn at alpha = 0.05 and find 31 significant. Before celebrating, what do you compute, and what would change your mind?',
        hint: 'How many would you expect if none of the features had any association at all?',
        solution:
          'If none of the 500 features were associated with churn, you would still expect 0.05 × 500 = 25 significant results by chance alone. Finding 31 is barely above that baseline, so the headline number is close to uninformative: most of those 31 are likely false positives.\n\nWhat to compute: apply a Benjamini–Hochberg correction to control the false discovery rate at, say, 10%, which asks how many of the declared discoveries can be expected to be false rather than whether any are. Sort the p-values ascending and reject the i-th while p_(i) ≤ (i/m)·alpha. In a case like this, where the count barely exceeds the null expectation, BH typically retains very few features or none. Bonferroni, dividing alpha by 500 to give a threshold of 0.0001, would be stricter still and is appropriate if any single false positive is costly.\n\nWhat would change my mind: a p-value distribution that is strongly skewed towards zero rather than roughly uniform, which is the signature of genuine signal among the nulls; features that survive correction and also have a plausible mechanism; and above all, replication on a held-out time period, since a genuine association should reappear in data the screen never saw. I would also check for dependence between features, since 500 correlated features are not 500 independent tests and both corrections assume something about that structure.',
      },
      {
        prompt:
          'A hospital study finds that patients treated with a new drug have higher mortality than those who were not. Give three explanations other than "the drug is harmful", and describe the study design that would settle the question.',
        hint: 'Think about how patients came to receive the drug in the first place.',
        solution:
          'Explanation one: confounding by indication, which is the dominant concern in observational medicine. The drug is presumably given to the sickest patients, and severity of illness drives both the treatment decision and mortality. The association is then real and non-causal, and it would persist however large the sample.\n\nExplanation two: selection effects in who appears in the data. If the drug is used mainly at tertiary referral centres that receive the most complicated cases, or if patients who died very early were recorded differently in the two groups, the comparison groups differ systematically before treatment plays any role.\n\nExplanation three: reverse causation via timing, sometimes called immortal time bias. A patient must survive long enough to be prescribed the drug, so the way follow-up time is attributed can create an apparent effect in either direction depending on how the windows are defined.\n\nThe design that settles it is a randomised controlled trial: patients are assigned to the drug or to control by a chance mechanism, which makes assignment independent of severity and of every other confounder, measured or unmeasured. That independence is what no amount of statistical adjustment can guarantee, since adjustment can only handle confounders that were measured. Where randomisation is unethical or impossible, the next best options are an instrumental variable such as physician prescribing preference, a regression discontinuity if prescription follows a threshold rule, or careful propensity-score matching on a rich set of severity measures — each reported with its identifying assumption stated openly, because in every case the causal claim rests on an assumption the data cannot verify.',
      },
    ],

    quiz: [
      {
        id: 'STAT-015-q1',
        type: 'mcq',
        concept: 'definition of a p-value',
        prompt: 'What does a p-value of 0.03 mean?',
        options: [
          'If the null hypothesis were true, results at least this extreme would occur about 3% of the time',
          'There is a 3% probability that the null hypothesis is true',
          'There is a 97% probability that the effect is real',
          'The effect is 3% as large as it could have been',
        ],
        answerIndex: 0,
        explanation:
          'The p-value is P(data at least this extreme | H₀ true) — a statement about the data given a hypothesis. Options 2 and 3 reverse the conditional, which would require a prior and Bayes’ theorem, and option 4 confuses a probability with an effect size.',
      },
      {
        id: 'STAT-015-q2',
        type: 'truefalse',
        concept: 'failing to reject',
        prompt: 'A result with p = 0.30 shows that there is no effect.',
        answer: false,
        explanation:
          'False. Failing to reject means the evidence was insufficient, which is equally consistent with a real effect the study was too small to detect. At low power a genuine effect is missed most of the time, so "not significant" often describes the sample size rather than the world.',
      },
      {
        id: 'STAT-015-q3',
        type: 'numeric',
        concept: 'multiple comparisons',
        prompt: 'If you run 20 independent tests on true null hypotheses at alpha = 0.05, how many significant results should you expect by chance?',
        answer: 1,
        tolerance: 0.01,
        explanation:
          '20 × 0.05 = 1. The probability of getting at least one is 1 − 0.95²⁰ = 0.64, so finding a single significant result among twenty comparisons is entirely unremarkable and should not be reported as a discovery.',
      },
      {
        id: 'STAT-015-q4',
        type: 'mcq',
        concept: 'power',
        prompt: 'Which change increases the power of a test?',
        options: [
          'Increasing the sample size',
          'Lowering alpha from 0.05 to 0.01',
          'Increasing the variance of the outcome',
          'Reducing the true effect size',
        ],
        answerIndex: 0,
        explanation:
          'Power rises with sample size, with a larger true effect and with a larger alpha. Tightening alpha makes rejection harder and therefore lowers power, while more variance and smaller effects both make the signal harder to see against the noise.',
      },
      {
        id: 'STAT-015-q5',
        type: 'match',
        concept: 'errors and their costs',
        prompt: 'Match each term to its meaning in an A/B test.',
        pairs: [
          { left: 'Type I error', right: 'Shipping a change that actually does nothing' },
          { left: 'Type II error', right: 'Discarding a change that would have worked' },
          { left: 'Alpha', right: 'The false-positive rate you choose in advance' },
          { left: 'Power', right: 'The chance of detecting a real effect of the size you care about' },
          { left: 'Confounder', right: 'A third variable driving both the treatment and the outcome' },
        ],
        explanation:
          'Alpha and beta are the two ways to be wrong, and for a fixed sample size lowering one raises the other. The only way to reduce both is more data — which is precisely what a power calculation quantifies before the experiment starts.',
      },
      {
        id: 'STAT-015-q6',
        type: 'debug',
        language: 'python',
        concept: 'peeking',
        prompt: 'This experiment monitor reports a 5% false-positive rate but actually has one above 30%. What is the flaw?',
        code: 'for day in range(30):\n    a, b = collect_more_users()\n    p = ttest_ind(a, b).pvalue\n    if p < 0.05:\n        ship_it()   # "significant!"\n        break',
        options: [
          'Testing repeatedly and stopping at the first p < 0.05 gives each look its own chance to cross the threshold',
          'ttest_ind requires equal variances and should be replaced by a chi-squared test',
          'The loop should run for 60 days rather than 30 to reach significance',
          'The p-value threshold should be applied to the effect size instead',
        ],
        answerIndex: 0,
        explanation:
          'This is sequential testing without sequential correction. Each daily look is an independent opportunity for a false positive, so the cumulative rate compounds far beyond the nominal 5%. Fix it with a fixed horizon set by a power calculation, or a sequential design with alpha-spending.',
      },
      {
        id: 'STAT-015-q7',
        type: 'multi',
        concept: 'causation',
        prompt: 'Ice cream sales and drowning deaths are strongly correlated. Which explanations are consistent with that fact?',
        options: [
          'A confounder — hot weather increases both swimming and ice cream consumption',
          'Ice cream consumption causes drowning',
          'Drowning deaths cause ice cream sales',
          'Chance, if this were one of very many correlations examined',
          'The correlation coefficient must have been computed incorrectly',
        ],
        answerIndices: [0, 1, 2, 3],
        explanation:
          'Correlation is consistent with every causal story, which is exactly the point: the data alone cannot distinguish them. Here the confounder is overwhelmingly the plausible explanation, but ruling the others out requires design and domain knowledge, not a larger sample.',
      },
      {
        id: 'STAT-015-q8',
        type: 'explain',
        concept: 'significance versus importance',
        prompt:
          'An experiment on 2 million users finds a 0.02% conversion lift with p < 0.001. Explain to a product manager what this does and does not justify.',
        rubric: [
          'Explains that the tiny p-value reflects the enormous sample size, not a large effect',
          'Distinguishes statistical significance from practical importance, referring to the effect size and its interval',
          'Recommends a decision rule based on a pre-set threshold for a lift worth shipping',
        ],
        sampleAnswer:
          'The p-value below 0.001 is telling you one narrow thing: with two million users, the measurement is precise enough that a lift of 0.02% is distinguishable from exactly zero. That is a statement about precision, not about magnitude. The test statistic is the effect divided by a standard error that shrinks with the square root of the sample size, so at this scale essentially any non-zero difference becomes significant — including differences far too small for anyone to care about. The number that should drive the decision is the effect size and its confidence interval, which here will be something like 0.02% plus or minus a whisker. So the question becomes whether a two-hundredths-of-a-percent lift is worth the cost of shipping and maintaining the change. On a very large base it might translate into real revenue and be worth taking; on a smaller one it certainly is not. That comparison needs a threshold agreed before the experiment — the minimum lift worth acting on — because deciding afterwards invites us to find whatever number makes the result look good. I would also check that this was the pre-registered primary metric rather than the best of several, and that the effect is stable across time and segments rather than driven by one anomalous cohort, since at this sample size even small systematic artefacts in logging or assignment will show up as highly significant.',
        explanation:
          'The examinable judgement is that p-values answer "is it distinguishable from zero" while decisions require "is it big enough to matter", and that large samples separate these two questions dramatically.',
      },
    ],

    flashcards: [
      { front: 'Define a p-value.', back: 'P(test statistic at least as extreme as observed | H₀ true). A statement about the data given the hypothesis, never the reverse.' },
      { front: 'Name three wrong definitions of a p-value.', back: 'The probability the null is true; the probability the result was due to chance; 1 − p as the chance of replication. All reverse the conditional or confuse p with effect size.' },
      { front: 'Type I versus type II error?', back: 'Type I rejects a true null (false positive, rate alpha). Type II fails to reject a false null (false negative, rate beta). Power is 1 − beta.' },
      { front: 'What raises power?', back: 'More data, a larger true effect, lower outcome variance, or a larger alpha. Tightening alpha lowers power for a fixed n.' },
      { front: 'Why does p > 0.05 not prove no effect?', back: 'It means the evidence was insufficient. At low power a real effect is missed most of the time, so "not significant" may describe the sample size, not the world.' },
      { front: 'What is the chance of at least one false positive in 20 tests at alpha = 0.05?', back: '1 − 0.95²⁰ = 0.64. Expect about one significant result from twenty true nulls purely by chance.' },
      { front: 'What does peeking do to a test?', back: 'Each look is another chance to cross the threshold. Checking daily and stopping at the first p < 0.05 pushes the false-positive rate above 30%.' },
      { front: 'Bonferroni versus Benjamini–Hochberg?', back: 'Bonferroni divides alpha by m and controls any false positive — conservative. BH controls the expected proportion of false discoveries and is better for screening many hypotheses.' },
      { front: 'Why does randomisation beat statistical adjustment?', back: 'Adjustment can only handle confounders you measured. Randomisation makes assignment independent of every confounder, including unmeasured ones.' },
      { front: 'Why is significance not importance?', back: 't is the effect over a standard error that shrinks as √n, so a large enough sample makes any non-zero difference significant. Judge the effect size against a pre-set threshold.' },
    ],

    challenge: {
      title: 'Simulate the ways a test goes wrong',
      brief:
        'Build a simulation study with five parts, each reporting an empirical error rate against the nominal 5%. One: a single correctly specified two-sample test on true nulls, confirming the false-positive rate is 5%. Two: twenty simultaneous tests, reporting the family-wise error rate and the effect of Bonferroni and Benjamini–Hochberg corrections. Three: a peeking simulation that checks every 50 observations and stops at the first p < 0.05, reporting the inflated rate as a function of the number of looks. Four: a power curve showing detection probability against sample size for three effect sizes, with the n required for 80% power marked. Five: a confounded observational dataset where the treatment has exactly zero effect, reporting the naive estimate, a stratified estimate and a randomised estimate. Conclude with a one-page note on which failures a reader of a published p-value could detect and which are invisible to them.',
      language: 'python',
      acceptanceCriteria: [
        'Every error rate is measured over at least 10,000 replications rather than asserted',
        'The single-test case recovers approximately 0.05, validating the simulation itself',
        'The peeking result is reported as a curve against the number of looks, not a single number',
        'The power curve marks the n required for 80% power at each effect size and matches a closed-form calculation',
        'The confounding example has a genuinely zero treatment effect in the data-generating code, and the naive estimate is clearly non-zero',
        'The written note distinguishes failures visible in a paper from those requiring access to the analysis history',
      ],
      starterCode:
        'import numpy as np\nfrom scipy import stats\n\nrng = np.random.default_rng(0)\n\ndef false_positive_rate(test_fn, trials=10_000, alpha=0.05):\n    """Fraction of trials on TRUE nulls where test_fn returns p <= alpha."""\n    ...\n\ndef peeking_rate(n_looks, step=50, alpha=0.05, trials=2_000):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who understands sampling variability and confidence intervals how hypothesis testing works, what a p-value is and is not, and why correlation does not establish causation. Make the failure modes concrete.',
      mustCover: [
        'The null is assumed true and the p-value measures how surprising the data would be under it',
        'A p-value is P(data | H₀) and not P(H₀ | data), and it says nothing about effect size',
        'Type I and type II errors, and that power is what makes a null result interpretable',
        'Multiple comparisons, peeking and p-hacking inflate the false-positive rate far above alpha',
        'Confounding produces real, significant, non-causal associations that more data cannot fix',
      ],
      bonusSignals: ['uses the courtroom framing and says exactly where it breaks down', 'gives the 1 − 0.95²⁰ arithmetic', 'distinguishes randomisation from adjustment'],
      sampleExplanation:
        'Start with the question the machinery answers, because it is narrower than most people assume. You changed something and the number moved. The only thing hypothesis testing tells you is whether the movement is bigger than what random variation alone would routinely produce. Here is how it does that. Assume the boring answer: the change did nothing. Under that assumption the measured difference still wobbles from experiment to experiment, and the central limit theorem tells you exactly how much — a bell curve centred on zero, whose width is the standard error. That curve is a complete picture of what noise can do. Now put your observed difference on it. Deep in the middle, noise explains it. Far out in the tail, noise is a poor explanation. The p-value is precisely the size of that tail: among experiments where nothing was really happening, the fraction that would have produced a result at least this striking. The courtroom framing helps. You presume innocence, weigh the evidence against that presumption, and ask how unlikely such evidence would be for an innocent defendant. Note what that does not give you. It never tells you the probability that the defendant is innocent, and the p-value never tells you the probability that the null hypothesis is true. Those are different questions, and getting from one to the other needs Bayes’ theorem and a prior. That single confusion — the probability of the data given the hypothesis, mistaken for the probability of the hypothesis given the data — is the source of most misuse of statistics in the world. Two more things the p-value does not tell you. It says nothing about how big the effect is, because the statistic is the effect divided by a standard error that shrinks as the square root of your sample size. Give me two million users and I will make a 0.02% difference overwhelmingly significant. And a non-significant result does not show there is no effect: it may simply mean the study was too small to see one. That is what power measures — the chance of detecting an effect of a given size if it is really there — and a study with 20% power will miss a genuine effect four times in five. Compute it before you run, not after you are disappointed. Now the part that makes the whole edifice fragile. The 5% error rate is a promise about one test, specified before the data arrive. Run twenty tests on things where nothing is happening and you expect one to come out significant; the chance of at least one is one minus 0.95 to the twentieth, which is 64%. This is why trying several metrics, several subgroups and several exclusion rules and reporting the one that worked is not a minor sin — it converts an expected accident into a finding. The version that catches out honest people is peeking: watch a running experiment and stop the moment it goes significant, and your real false-positive rate is above 30%, not 5%, because every look is a fresh opportunity to cross the line. Fix the sample size in advance, or use a design built for looking. Finally, causation, which no p-value can supply. Suppose users who adopted a feature convert 30% more. Before believing the feature did it, eliminate four rivals: chance, reverse causation, selection in how people entered the data, and confounding. Confounding is the usual culprit — engaged users both adopt new features and convert more anyway — and it has a nasty property: more data does not help, it just estimates the wrong number more precisely. Adjusting statistically helps only with confounders you measured and thought of. Randomisation is stronger, and this is the one sentence to remember from the whole topic: assigning people at random makes the treatment independent of every confounder, including the ones nobody has thought of, which is exactly what no amount of clever analysis can achieve afterwards.',
    },
  },
];
