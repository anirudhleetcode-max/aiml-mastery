import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'VIZ-001',
    domain: 'VIZ',
    module: 'Why Plot',
    topic: 'Visualisation as a thinking tool',
    title: 'Why Visualisation Matters',
    slug: 'why-visualisation-matters',
    difficulty: 1,
    estimatedMinutes: 25,
    prerequisites: [],
    tags: ['anscombe', 'datasaurus', 'eda', 'summary-statistics', 'thinking-tool'],

    learningObjectives: [
      "Explain why summary statistics alone can hide the shape of a dataset, using Anscombe's quartet as the evidence",
      'Describe what the Datasaurus dozen demonstrates about mean, standard deviation and correlation',
      'Use a plot as a step in exploratory data analysis rather than as decoration added at the end',
      'List the specific data pathologies — outliers, clusters, non-linearity, gaps, censoring — that a picture reveals and a table of numbers does not',
    ],

    terminology: [
      {
        term: 'Summary statistic',
        definition:
          'A single number that compresses a whole column into one value: mean, median, standard deviation, correlation coefficient. Compression is lossy by construction.',
        simple: 'One number that stands in for a thousand numbers — useful, but it throws away detail.',
      },
      {
        term: "Anscombe's quartet",
        definition:
          'Four eleven-point datasets, constructed by the statistician Francis Anscombe in 1973, that share the same mean, variance, correlation and fitted regression line while looking completely different when plotted.',
        simple: 'Four datasets whose numbers agree and whose pictures do not.',
      },
      {
        term: 'Datasaurus dozen',
        definition:
          'Thirteen datasets produced by Matejka and Fitzmaurice in 2017 — one of them shaped like a dinosaur — that agree to two decimal places on mean x, mean y, standard deviation of each and their correlation.',
        simple: "Anscombe's trick taken to an extreme: a dinosaur and a star with identical statistics.",
      },
      {
        term: 'Exploratory data analysis (EDA)',
        definition:
          'The stage of a project, named by John Tukey, in which you look at data to form hypotheses about it, rather than to confirm ones you already hold. Plotting is its primary instrument.',
        simple: 'Looking at your data to find out what is actually in it before you model it.',
      },
      {
        term: 'Overplotting',
        definition:
          'When so many marks land in the same region of a chart that they merge into a solid block, hiding density differences and the number of points involved.',
        simple: 'Too many dots on top of each other, so you cannot see how many there are.',
      },
    ],

    simpleExplanation:
      "Imagine four classes take the same test, and someone tells you the average mark in each class was exactly 75. You might conclude the four classes are the same. But one class could have every single pupil scoring 75; another could be split into a group that scored 50 and a group that scored 100; a third could have everyone near 74 except one pupil who scored 300 because of a marking error. The average is identical and the stories are completely different. A number like the average squashes hundreds of facts down into one fact, and whatever gets squashed out is invisible from then on. A picture does not squash. When you draw every pupil as a dot, the class that splits into two groups looks split, the marking error sticks out at the top of the page, and you see it in under a second without doing any arithmetic. That is the entire argument for plotting: your eyes notice shapes, gaps, clumps and odd ones out far faster than your mind notices them in a column of numbers.",

    whyItExists:
      'Before cheap plotting, analysts checked data by reading tables and computing summaries, and they routinely fitted models to data that violated the model\'s assumptions without ever noticing. Anscombe published his quartet in 1973 specifically to argue that computers had made it too easy to produce statistics and too rare to look at the data those statistics came from. Plotting exists as the cheapest possible defence against being confidently wrong about the shape of your own data.',

    analogy: {
      scenario:
        "A doctor is handed a patient's file containing a single line: average heart rate over 24 hours, 72 beats per minute. That is a perfectly healthy number. It is also exactly what you get from a steady 72 all day, and exactly what you get from a patient who sat at 50 for twenty-two hours and then spiked to 190 for two. The heart-rate trace — the picture — takes one second to distinguish those two patients. The average cannot distinguish them at all, and no amount of extra precision on the average will help, because the information was destroyed when the trace was collapsed into a mean.",
      mapping: [
        { from: 'The 24-hour heart-rate trace', to: 'The plot: every observation drawn individually' },
        { from: 'The single average figure in the file', to: 'A summary statistic such as the mean or the correlation coefficient' },
        { from: 'The two-hour spike to 190', to: 'An outlier, or a regime change, that the summary averages away' },
        { from: 'The doctor spotting the spike instantly', to: 'Pre-attentive visual processing: the eye finds anomalies without conscious search' },
        { from: 'Ordering the trace before prescribing', to: 'Plotting during EDA, before choosing a model' },
      ],
      bridge:
        "The mapping is exact in the way that matters: a mean is a many-to-one function, so infinitely many different datasets map to the same mean, and once you hold only the mean you cannot tell which one you had. Anscombe's quartet is simply four of those preimages written down explicitly, chosen so that four different summaries — mean x, mean y, variance and correlation — all collapse at once. Plotting is the inverse operation you can actually perform: it shows you the dataset instead of its image under a lossy map.",
      limitations:
        'The analogy flatters plots slightly. A trace is trustworthy because the eye is reading raw data; a chart can itself be a lossy or distorted rendering — a histogram with the wrong bin width, or a scatter so overplotted that a million points look like a thousand. The picture removes the compression only if you draw it honestly, which is what the rest of this domain is about.',
    },

    visuals: [
      {
        kind: 'table',
        title: "Anscombe's quartet: identical statistics, four different datasets",
        caption:
          'Every column below is the same to two decimal places. Each dataset has eleven points. Only the picture tells them apart.',
        columns: ['Statistic', 'Dataset I', 'Dataset II', 'Dataset III', 'Dataset IV'],
        rows: [
          ['Mean of x', '9.00', '9.00', '9.00', '9.00'],
          ['Sample variance of x', '11.00', '11.00', '11.00', '11.00'],
          ['Mean of y', '7.50', '7.50', '7.50', '7.50'],
          ['Sample variance of y', '4.13', '4.13', '4.13', '4.13'],
          ['Correlation of x and y', '0.816', '0.816', '0.816', '0.816'],
          ['Fitted line', 'y = 3.00 + 0.500x', 'y = 3.00 + 0.500x', 'y = 3.00 + 0.500x', 'y = 3.00 + 0.500x'],
          ['What the plot shows', 'A genuine noisy linear trend', 'A clean parabola — badly fitted by a line', 'A perfect line plus one outlier', 'All x equal 8 except one leverage point at x = 19'],
        ],
      },
      {
        kind: 'compare',
        title: 'What a number tells you versus what a picture tells you',
        caption: 'Neither replaces the other. The failure mode is using only the left-hand column.',
        left: {
          heading: 'Summary statistics',
          points: [
            'Comparable across datasets and reproducible to any precision',
            'Feed directly into tests, thresholds and dashboards',
            'Scale to a billion rows without becoming unreadable',
            'Cannot express shape: bimodality, curvature, clusters, gaps',
            'Hide outliers by design — an outlier is exactly what an average dilutes',
          ],
        },
        right: {
          heading: 'A plot of the same data',
          points: [
            'Shows shape, spread, gaps, clusters and odd points at a glance',
            'Reveals violated assumptions before a model silently misfits',
            'Exposes data-collection artefacts: floors, ceilings, rounding, duplicated rows',
            'Hard to compare precisely — the eye reads "bigger", not "1.4x bigger"',
            'Degrades under volume: a million points overplot into a solid blob',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Where plotting sits in a real analysis',
        caption:
          'Plotting is not the last step before the slide deck. It is the step that decides what you do next.',
        steps: [
          { label: 'Load the data', detail: 'Rows arrive from a CSV, a database or a feature store. You know nothing about them yet.' },
          { label: 'Look at the distributions', detail: 'One histogram per numeric column. This is where you find the -999 sentinel values and the column that is 94 percent zero.' },
          { label: 'Look at the relationships', detail: 'Scatter plots of candidate features against the target. Curvature here tells you a linear model will underfit.' },
          { label: 'Form a hypothesis', detail: '"Revenue is bimodal because consumer and enterprise accounts are mixed in one table."' },
          { label: 'Check it', detail: 'Split by account type and re-plot. Either two clean distributions appear, or the hypothesis dies cheaply.' },
          { label: 'Only then model', detail: 'You now know which transformations, which features and which assumptions are defensible.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Try it: which chart answers which question',
        caption:
          'A first pass at the chooser you will meet properly in the Choosing the Right Chart unit. Pick a question and see which chart type it implies.',
        widget: 'chart-chooser',
      },
    ],

    formalDefinition:
      'Summary statistics are many-to-one functions from a dataset to a scalar, so the preimage of any statistic is an infinite family of datasets. Visualisation is the practice of rendering observations individually, preserving the joint structure that scalar summaries discard, so that properties invisible to the chosen statistics — modality, curvature, heteroscedasticity, clustering, outliers and leverage — become directly perceptible.',

    math: {
      intuition:
        'The reason four different datasets can share four statistics is not a coincidence or a trick of construction alone: it follows from counting. Eleven points in two dimensions carry twenty-two numbers. The mean of x, mean of y, variance of x, variance of y and correlation are five numbers. Fixing five constraints on a twenty-two dimensional space leaves seventeen dimensions of freedom, and Anscombe simply walked around inside that space until he found four configurations that look nothing alike. Matejka and Fitzmaurice automated the walk: start from any target shape, nudge points at random, keep the nudge only if the statistics stay within tolerance. Given enough nudges you can reach a dinosaur.',
      formulas: [
        {
          latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i',
          name: 'Sample mean',
          meaning:
            'The balance point of the values. Every value contributes with equal weight, which is exactly why one extreme value can drag it a long way.',
          variables: [
            { symbol: 'n', meaning: 'the number of observations' },
            { symbol: 'x_i', meaning: 'the i-th observation' },
            { symbol: '\\bar{x}', meaning: 'the arithmetic mean of the sample' },
          ],
          category: 'statistics',
        },
        {
          latex: 's^2 = \\frac{1}{n-1}\\sum_{i=1}^{n} (x_i - \\bar{x})^2',
          name: 'Sample variance',
          meaning:
            'The average squared distance from the mean. It measures spread but says nothing at all about the arrangement of the points producing that spread.',
          variables: [
            { symbol: 's^2', meaning: 'the sample variance' },
            { symbol: 'x_i - \\bar{x}', meaning: 'how far one observation sits from the mean' },
            { symbol: 'n - 1', meaning: "Bessel's correction, which makes the estimate unbiased for the population variance" },
          ],
          category: 'statistics',
        },
        {
          latex: 'r = \\frac{\\sum_i (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_i (x_i - \\bar{x})^2}\\,\\sqrt{\\sum_i (y_i - \\bar{y})^2}}',
          name: 'Pearson correlation coefficient',
          meaning:
            'The strength of the straight-line relationship between two variables, between -1 and 1. Because it only ever measures straightness, a perfect parabola can score close to zero.',
          variables: [
            { symbol: 'r', meaning: 'the correlation coefficient' },
            { symbol: 'x_i, y_i', meaning: 'the paired observations' },
            { symbol: '\\bar{x}, \\bar{y}', meaning: 'the two sample means' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'A dataset of n paired points lives in a space of 2n real numbers.',
        'Requiring a fixed mean x, mean y, variance x, variance y and correlation imposes five equations on those 2n numbers.',
        'For n = 11 that leaves a 17-dimensional solution set, which is vastly larger than a single dataset.',
        'Therefore infinitely many visually distinct datasets satisfy the same five summaries — the quartet exhibits four of them by hand.',
        'The Datasaurus method searches that solution set numerically: perturb a point, accept the perturbation if it moves the shape towards a target and leaves the statistics within tolerance, repeat.',
      ],
    },

    workedExample: {
      title: "Checking Anscombe's third dataset by hand",
      setup:
        'Dataset III has x = 10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5 and y = 7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73. Ten of those eleven points lie exactly on one straight line; the third one does not. We will see that the summaries never mention this.',
      steps: [
        {
          label: 'Mean of x',
          detail: 'The x values sum to 99 over eleven points, so the mean is 9.00 — identical to the other three datasets, which share the same x column.',
          latex: '\\bar{x} = \\tfrac{99}{11} = 9.00',
        },
        {
          label: 'Mean of y',
          detail: 'The y values sum to 82.50, giving a mean of 7.50. Again identical to datasets I, II and IV, to two decimal places.',
          latex: '\\bar{y} = \\tfrac{82.50}{11} = 7.50',
        },
        {
          label: 'The hidden structure',
          detail:
            'Drop the point (13, 12.74) and the remaining ten points satisfy y = 4.0 + 0.346x exactly, to the precision of the published data. One point is doing all the work of bending the fitted line.',
        },
        {
          label: 'The fitted line on all eleven points',
          detail:
            'Least squares returns y = 3.00 + 0.500x with an R-squared of 0.67 — a result that looks like a moderately noisy linear relationship and is nothing of the kind.',
          latex: '\\hat{y} = 3.00 + 0.500x',
        },
        {
          label: 'What a residual plot would have said',
          detail:
            'Plotting residuals against x shows ten points hugging zero in a tidy diagonal band and one residual of about +3.2. That single picture diagnoses the dataset in a second.',
        },
      ],
      conclusion:
        'Every statistic reported for dataset III is defensible, reproducible and completely misleading about its structure. The cost of finding this out was one scatter plot. This is the argument of the entire unit in miniature: plot first, and plot the residuals too.',
    },

    codeExamples: [
      {
        language: 'python',
        title: "Anscombe's quartet: the statistics agree, the pictures do not",
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

x_common = np.array([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], dtype=float)

datasets = {
    "I":   (x_common, np.array([8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68])),
    "II":  (x_common, np.array([9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74])),
    "III": (x_common, np.array([7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73])),
    "IV":  (np.array([8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8], dtype=float),
            np.array([6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89])),
}

print(f"{'set':>4} {'mean x':>7} {'var x':>7} {'mean y':>7} {'var y':>7} {'corr':>7} {'slope':>7} {'intercept':>10}")
for name, (x, y) in datasets.items():
    slope, intercept = np.polyfit(x, y, deg=1)
    corr = np.corrcoef(x, y)[0, 1]
    print(f"{name:>4} {x.mean():7.2f} {x.var(ddof=1):7.2f} {y.mean():7.2f} "
          f"{y.var(ddof=1):7.2f} {corr:7.3f} {slope:7.3f} {intercept:10.2f}")

fig, axes = plt.subplots(2, 2, figsize=(8, 8), sharex=True, sharey=True)
line_x = np.array([3.0, 20.0])
for ax, (name, (x, y)) in zip(axes.flat, datasets.items()):
    ax.scatter(x, y, s=45, color="#1f77b4", zorder=3)
    ax.plot(line_x, 3.0 + 0.5 * line_x, color="#d62728", linewidth=1.5, zorder=2)
    ax.set_title(f"Dataset {name}")
    ax.set_xlim(2, 20)
    ax.set_ylim(2, 14)
    ax.grid(alpha=0.3)

fig.suptitle("Anscombe's quartet: one regression line, four different stories", fontsize=13)
fig.supxlabel("x")
fig.supylabel("y")
fig.tight_layout()
fig.savefig("anscombe.png", dpi=200)`,
        output: ` set  mean x   var x  mean y   var y    corr   slope  intercept
   I    9.00   11.00    7.50    4.13   0.816   0.500       3.00
  II    9.00   11.00    7.50    4.13   0.816   0.500       3.00
 III    9.00   11.00    7.50    4.13   0.816   0.500       3.00
  IV    9.00   11.00    7.50    4.13   0.816   0.500       3.00`,
        explanation:
          'The printed table is four identical rows, which is the point. The saved figure is a two-by-two grid sharing one pair of axes, with the same red line drawn across all four panels. Top left, the points scatter loosely around the line like genuine noisy measurements. Top right, they trace a smooth downward-opening parabola that the straight line slices through the middle of, above the data at both ends and below it in the centre. Bottom left, ten points sit on a tidy diagonal and one point floats high above at x = 13, visibly dragging the red line off the diagonal. Bottom right, every point is stacked in a vertical column at x = 8 except a single point far to the right at x = 19, which alone determines the slope — remove it and the slope is undefined.',
      },
      {
        language: 'python',
        title: 'The Datasaurus idea: same statistics, deliberately absurd shapes',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

def summary(points):
    x, y = points[:, 0], points[:, 1]
    return np.array([x.mean(), y.mean(), x.std(ddof=1), y.std(ddof=1), np.corrcoef(x, y)[0, 1]])

def perturb_towards(points, target_fn, steps=200_000, tol=0.01, scale=0.6):
    """Nudge points towards a target shape while holding the summaries fixed."""
    current = points.copy()
    start = summary(points)
    for _ in range(steps):
        i = rng.integers(len(current))
        candidate = current.copy()
        candidate[i] += rng.normal(0, scale, size=2)
        if target_fn(candidate[i]) > target_fn(current[i]):
            continue  # moved away from the target shape, reject
        if np.all(np.abs(summary(candidate) - start) < tol):
            current = candidate
    return current

# Target: push every point towards the circumference of a circle.
centre, radius = np.array([54.0, 48.0]), 30.0
to_circle = lambda p: abs(np.linalg.norm(p - centre) - radius)

blob = rng.normal(loc=centre, scale=[16.8, 26.9], size=(142, 2))
ring = perturb_towards(blob, to_circle)

for name, pts in [("random blob", blob), ("ring", ring)]:
    m = summary(pts)
    print(f"{name:>12}  mean=({m[0]:.2f}, {m[1]:.2f})  sd=({m[2]:.2f}, {m[3]:.2f})  r={m[4]:+.3f}")

fig, (ax_left, ax_right) = plt.subplots(1, 2, figsize=(10, 5), sharex=True, sharey=True)
for ax, pts, title in [(ax_left, blob, "Before"), (ax_right, ring, "After")]:
    ax.scatter(pts[:, 0], pts[:, 1], s=20, color="#2a9d8f")
    ax.set_title(title)
    ax.set_xlabel("x")
    ax.grid(alpha=0.3)
ax_left.set_ylabel("y")
fig.suptitle("Same mean, same standard deviation, same correlation", fontsize=13)
fig.tight_layout()
fig.savefig("datasaurus_idea.png", dpi=200)`,
        output: ` random blob  mean=(53.86, 47.29)  sd=(16.31, 27.55)  r=+0.041
        ring  mean=(53.87, 47.30)  sd=(16.32, 27.56)  r=+0.038`,
        explanation:
          'This is the Matejka and Fitzmaurice algorithm in twenty lines: propose a small random move for one point, reject it if it takes that point away from the target shape, reject it again if it moves any summary statistic outside a tolerance, otherwise keep it. The printed summaries before and after agree to two decimal places. The figure shows why that is alarming: the left panel is a shapeless cloud, the right panel is a clearly hollow ring with an empty centre, and every statistic you would normally report is the same for both. The published Datasaurus dozen uses the same loop with a dinosaur as the starting shape and twelve different targets, including a star, a bullseye and a set of vertical lines.',
      },
      {
        language: 'python',
        title: 'Five minutes of EDA that saves a week of modelling',
        runnable: true,
        code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)

# A realistic mess: two customer segments, a sentinel value and a hard ceiling.
consumer = rng.normal(40, 12, 700)
enterprise = rng.normal(180, 45, 300)
spend = np.concatenate([consumer, enterprise])
spend[rng.choice(len(spend), 40, replace=False)] = -999.0   # "missing" sentinel
spend = np.clip(spend, -999, 250)                            # billing system caps at 250

df = pd.DataFrame({"monthly_spend": spend})

print(df["monthly_spend"].describe().round(2).to_string())

fig, (ax_raw, ax_clean) = plt.subplots(1, 2, figsize=(11, 4.5))
ax_raw.hist(df["monthly_spend"], bins=60, color="#264653")
ax_raw.set_title("As loaded")
ax_raw.set_xlabel("monthly spend")
ax_raw.set_ylabel("customers")

clean = df.loc[df["monthly_spend"] > -1, "monthly_spend"]
ax_clean.hist(clean, bins=60, color="#e76f51")
ax_clean.set_title("Sentinel removed")
ax_clean.set_xlabel("monthly spend")

fig.tight_layout()
fig.savefig("eda_first_look.png", dpi=200)`,
        output: `count    1000.00
mean       75.55
std       102.48
min      -999.00
25%        34.79
50%        45.84
75%       128.20
max       250.00`,
        explanation:
          'The describe() output looks odd but survivable: a mean of about 76 with a standard deviation of 102. Nothing in it says "this column is broken in three separate ways". The figure does. The left panel has one lonely bar pinned at -999 on the far left and everything else crushed into a sliver on the right, which is the classic visual signature of a sentinel value masquerading as a number. The right panel, with the sentinel dropped, shows two clearly separated humps — a tall one near 40 and a shorter, wider one near 180 — plus a single spike at exactly 250 where the billing system truncates. Three findings, one figure: a mean of 75.55 describes precisely nobody in this dataset.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A regression model that fits well and predicts badly',
        usage:
          'A pricing team reports an R-squared of 0.67 on a linear model and ships it. A residual plot would have shown a clean U shape, meaning the true relationship curves and the model is systematically over-predicting in the middle of the range and under-predicting at both ends. This is Anscombe dataset II with a business attached.',
      },
      {
        context: 'Feature scaling before training a neural network',
        usage:
          'Plotting a histogram of each feature before and after StandardScaler is routine practice at any team that has been burned once. It catches columns that are 90 percent zeros, columns already scaled by an upstream job, and columns where a single 1e9 outlier will flatten every other value to near zero after scaling.',
      },
      {
        context: 'Class imbalance discovered too late',
        usage:
          'A fraud classifier reports 99.2 percent accuracy. A single bar chart of the label counts shows 99.2 percent of rows are the negative class, meaning the model has learned to say "not fraud" every time. Thirty seconds of plotting prevents a fortnight of misplaced confidence.',
      },
    ],

    projectConnections: [
      { tool: 'matplotlib', role: 'The plotting layer everything else is built on; the figure you save into a report or a notebook.' },
      { tool: 'pandas', role: 'df.describe() gives the summaries and df.hist() gives the pictures — the two halves of the argument in this unit.' },
      { tool: 'seaborn', role: 'pairplot() draws every scatter and every histogram of a dataset in one call, which is the fastest possible first look.' },
      { tool: 'scikit-learn', role: 'Learning curves, residual plots and confusion matrices are diagnostic plots; a scalar score never tells you why a model fails.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reporting the mean of a column without ever looking at its distribution',
        why: 'The mean is only a good description of a single, roughly symmetric hump. For bimodal, heavily skewed or sentinel-contaminated data it names a value that no observation is near.',
        fix: 'Draw the histogram first, then decide which summary is honest. For a skewed column the median and an interquartile range describe it far better, and for a bimodal one the right answer is usually to split the data.',
      },
      {
        mistake: 'Treating a correlation coefficient as a measure of relationship strength in general',
        why: 'Pearson correlation measures straight-line association only. A perfect deterministic parabola through the origin can produce r near zero, and a single leverage point can produce r near 0.8 out of eleven points that show nothing.',
        fix: 'Always show the scatter plot next to the coefficient. If a number is worth reporting, the picture behind it is worth showing.',
      },
      {
        mistake: 'Plotting only at the end, to illustrate a conclusion you already reached',
        why: 'A chart produced to decorate a finished result is never allowed to overturn it, so it can only confirm. All the value of visualisation is in the phase where you are still willing to change your mind.',
        fix: 'Make the first plot before the first model. Treat "what would this look like if I am wrong?" as the question the plot exists to answer.',
      },
      {
        mistake: 'Trusting a scatter plot of a million rows',
        why: 'Once marks overlap, a region that contains ten points and a region that contains ten thousand look identical, so the picture stops being a faithful rendering of the data.',
        fix: 'Use transparency, sample the rows, or switch to a two-dimensional density such as hexbin. The scatter-plot unit covers each of these concretely.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: "What is Anscombe's quartet and why does anyone still talk about a fifty-year-old example with eleven points in it?",
        answer:
          'It is four eleven-point datasets that share the same mean and variance in both variables, the same correlation of 0.816, and the same least-squares line y = 3 + 0.5x, while looking entirely different when plotted: one is genuinely linear with noise, one is a parabola, one is a perfect line with a single outlier, and one is a vertical stack of identical x values plus one distant leverage point. It still matters because the failure it illustrates has not gone away — it has scaled. Modern pipelines compute far more summaries, far faster, over far more columns, and a dashboard of aggregates gives exactly the same false sense of understanding that Anscombe was warning about. The quartet is the shortest possible proof that summaries are lossy and the loss can be total.',
        followUp:
          'A strong answer mentions the Datasaurus dozen as the modern generalisation, and notes that the quartet also motivates residual plots specifically, since datasets II, III and IV all have obviously pathological residuals.',
      },
      {
        level: 'intermediate',
        question: 'You join a project and inherit a dataset of 2 million rows and 60 columns. What do you plot first, and why that?',
        answer:
          'First, one histogram per numeric column, on a grid, and one bar chart of value counts per categorical column. That single pass finds sentinel values such as -999 or 1900-01-01, columns with a hard floor or ceiling from an upstream system, columns that are almost entirely one value and therefore carry no signal, and columns whose skew will need a log transform. Second, the target variable on its own: its distribution for regression, or its class balance for classification, because that decides the metric and the sampling strategy. Third, scatter or hexbin plots of the handful of features most likely to matter against the target, to see curvature and heteroscedasticity before choosing a model family. Only after that would I look at a correlation heatmap, because a heatmap of Pearson coefficients inherits every weakness this unit is about.',
        followUp:
          'Mentioning sampling for the scatter stage, and mentioning that the correlation heatmap should come last rather than first, both distinguish someone who has actually done this from someone reciting a checklist.',
      },
      {
        level: 'ml-engineer',
        question: 'A colleague says visualisation is a presentation concern and belongs to the reporting team, not the modelling team. How do you respond?',
        answer:
          'I would separate two different activities that share the word "chart". Presentation visualisation is indeed about communicating a settled result to an audience, and polish matters there. Diagnostic visualisation is a modelling activity: learning curves tell you whether more data will help or whether you are bias-limited, residual plots tell you which assumption your model violates, a confusion matrix tells you which classes are being confused rather than just how often, and feature distributions before and after scaling tell you whether the preprocessing did what you think. None of those are for an audience; they are instruments, and they are as much part of modelling as a loss curve. In practice the team that outsources its plots is the team that discovers its label leak in production.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Two columns both have mean 50 and standard deviation 20. Name three genuinely different shapes the data could have, and say which plot would distinguish them fastest.',
        hint: 'Think about symmetry, modality and outliers separately — each is a different way to hit the same two numbers.',
        solution:
          'Three possibilities among many: (1) a single symmetric hump centred at 50, the case everyone imagines; (2) a bimodal mixture with one group near 30 and another near 70, which averages to 50 and inflates the standard deviation exactly as observed; (3) a tight cluster near 46 plus a handful of extreme values around 200, where the outliers carry almost all of the spread. A histogram distinguishes all three immediately: one hump, two humps, or one hump plus a long tail with isolated bars. A box plot would separate case 3 quickly by showing the far-out points but would show cases 1 and 2 as near-identical boxes, which is precisely the weakness of box plots covered in the seaborn unit.',
      },
      {
        prompt:
          "Reproduce Anscombe's dataset II from the code example, fit a straight line to it, and plot the residuals against x. Describe the pattern and say what it proves.",
        hint: 'A residual is the observed y minus the predicted y. Plot residuals on the vertical axis, x on the horizontal, and draw a horizontal line at zero.',
        language: 'python',
        starterCode:
          'import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.array([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], dtype=float)\ny = np.array([9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74])\n# Fit a line, compute residuals, plot them against x.\n',
        solution:
          'slope, intercept = np.polyfit(x, y, 1)\nresid = y - (slope * x + intercept)\nfig, ax = plt.subplots(figsize=(6, 4))\nax.axhline(0, color="grey", linewidth=1)\nax.scatter(x, resid)\nax.set_xlabel("x")\nax.set_ylabel("residual")\nfig.tight_layout()\n\nThe residuals form a clean inverted-U: negative at both ends of the x range and positive in the middle, with essentially no scatter around that arc. That is a deterministic pattern, not noise, and it proves the straight line is the wrong functional form — the data are quadratic. The general rule this demonstrates is that residuals from a correctly specified model should look structureless; any visible shape in a residual plot is signal the model failed to capture.',
      },
      {
        prompt:
          'A dashboard shows average response time of 200 ms, steady for six months. Users complain it is slow. Give two data shapes consistent with that average and describe the plot that would settle the argument.',
        hint: 'Averages over a heavy-tailed distribution are notoriously reassuring. Think about what a small fraction of very slow requests does to the mean.',
        solution:
          'Shape one: nearly every request takes about 200 ms, so users and the dashboard agree and the complaint is about something else. Shape two: 95 percent of requests complete in 50 ms and 5 percent take 3 seconds, which also averages to roughly 200 ms — and since users notice the slow ones, every user experiences the 3-second tail regularly. A histogram of response times on a log x-axis settles it in seconds by showing whether there is one hump or a hump plus a far-right tail. The operational fix is to stop reporting the mean and report the 50th, 95th and 99th percentiles instead, which is why every serious latency dashboard is built on percentiles rather than averages.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-001-q1',
        type: 'mcq',
        concept: 'anscombe',
        prompt: "Which statement about Anscombe's quartet is correct?",
        options: [
          'All four datasets share the same mean, variance, correlation and regression line, but have very different shapes',
          'All four datasets are identical, and only the axis scales differ between the plots',
          'The four datasets have different statistics but happen to produce similar-looking plots',
          'The quartet shows that correlation always equals zero for non-linear data',
        ],
        answerIndex: 0,
        explanation:
          'The quartet was constructed so that four separate summary statistics agree to two decimal places while the scatter plots show a noisy line, a parabola, a line with one outlier and a vertical stack with one leverage point. That mismatch is the entire lesson.',
      },
      {
        id: 'VIZ-001-q2',
        type: 'truefalse',
        concept: 'summary statistics',
        prompt: 'If two datasets have the same mean and the same standard deviation, they must have similar shapes.',
        answer: false,
        explanation:
          'Fixing two scalars leaves an enormous space of datasets. A symmetric hump, a two-humped mixture and a tight cluster plus extreme outliers can all share a mean of 50 and a standard deviation of 20. The Datasaurus dozen pushes this to thirteen datasets agreeing on five statistics at once.',
      },
      {
        id: 'VIZ-001-q3',
        type: 'multi',
        concept: 'what plots reveal',
        prompt: 'Which of the following does a histogram reveal that describe() typically does not? Select all that apply.',
        options: [
          'Bimodality — two separate groups mixed into one column',
          'A sentinel value such as -999 sitting far from the real data',
          'The exact numeric value of the 75th percentile',
          'A hard ceiling where an upstream system truncates values',
          'The number of rows in the dataset',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Shape features — two humps, an isolated sentinel bar, a spike at a truncation point — are exactly what pictures show and scalars hide. Precise percentiles and row counts are the opposite case: the table gives them exactly and the eye can only approximate them.',
      },
      {
        id: 'VIZ-001-q4',
        type: 'code-output',
        language: 'python',
        concept: 'correlation limits',
        prompt: 'What does this print, and what does it tell you about Pearson correlation?',
        code: 'import numpy as np\nx = np.array([-3, -2, -1, 0, 1, 2, 3], dtype=float)\ny = x ** 2\nprint(round(float(np.corrcoef(x, y)[0, 1]), 3))',
        options: ['0.0', '1.0', '-1.0', '0.816'],
        answerIndex: 0,
        explanation:
          'y is a perfect deterministic function of x, yet the correlation is exactly zero because the relationship is symmetric about the origin and contains no straight-line component. Pearson r measures linearity, not dependence, which is why it must always be read next to a scatter plot.',
      },
      {
        id: 'VIZ-001-q5',
        type: 'order',
        concept: 'eda workflow',
        prompt: 'Put these steps of a first analysis into the order a careful analyst would follow.',
        items: [
          'Load the raw data and check its shape and dtypes',
          'Plot the distribution of every numeric column',
          'Plot candidate features against the target',
          'Form and test a specific hypothesis about the structure you saw',
          'Fit a model using the transformations the plots justified',
        ],
        explanation:
          'Plotting comes before modelling, and the distribution pass comes before the relationship pass because a column with a sentinel value will corrupt every scatter plot you draw from it. Hypotheses are formed from the pictures and tested cheaply, before anything expensive is fitted.',
      },
      {
        id: 'VIZ-001-q6',
        type: 'explain',
        concept: 'why plot',
        prompt: 'A teammate says "I already have the mean, the standard deviation and the correlation — a chart would not tell me anything new." Write the reply you would actually send.',
        rubric: [
          'States that summary statistics are lossy: many different datasets map to the same summaries',
          'Gives a concrete example such as bimodality, an outlier or curvature that the summaries cannot express',
          'Names the practical consequence — a wrong model, a wrong metric or a missed data-quality problem',
        ],
        sampleAnswer:
          'Those three numbers are compressions, and compression means many datasets map to the same output. Anscombe wrote down four eleven-point datasets that agree on exactly those statistics: one is a noisy line, one is a parabola, one is a perfect line plus a single outlier, and one is a vertical stack with one leverage point. If ours is the parabola, a linear model will be systematically wrong in the middle of the range and we will not find out from the correlation. It is one line of matplotlib to check, and if the picture matches what the numbers suggest we have lost thirty seconds.',
        explanation:
          'A good answer is concrete rather than moralising: it names a specific dataset shape the statistics cannot distinguish and the specific modelling decision that would go wrong as a result.',
      },
    ],

    flashcards: [
      {
        front: "What do the four datasets in Anscombe's quartet have in common?",
        back: 'Mean x 9.00, variance x 11.00, mean y 7.50, variance y 4.13, correlation 0.816 and the fitted line y = 3.00 + 0.500x. Nothing else — the plots look entirely different.',
      },
      {
        front: 'What is the Datasaurus dozen?',
        back: 'Thirteen datasets by Matejka and Fitzmaurice (2017), including a dinosaur, a star and a bullseye, that agree on mean x, mean y, both standard deviations and correlation to two decimal places.',
      },
      {
        front: 'Why can Pearson correlation be near zero for a strong relationship?',
        back: 'It measures only the straight-line component. A symmetric parabola has perfect dependence and zero linear component, so r is zero.',
      },
      {
        front: 'What is the first plot to draw on an unfamiliar dataset?',
        back: 'One histogram per numeric column. It finds sentinel values, hard floors and ceilings, near-constant columns, skew and bimodality in a single pass.',
      },
      {
        front: 'What does structure in a residual plot mean?',
        back: 'The model has the wrong functional form. Residuals from a well-specified model should look structureless; a U shape means the true relationship curves.',
      },
      {
        front: 'Why is a mean a poor summary of latency?',
        back: 'Latency is heavy-tailed, so a small fraction of very slow requests pulls the mean up while most requests are fast — report the 50th, 95th and 99th percentiles instead.',
      },
    ],

    challenge: {
      title: 'Build your own quartet',
      brief:
        'Construct three datasets of at least 30 points each that agree on mean x, mean y, both standard deviations and Pearson correlation to two decimal places, but that look obviously different when plotted: one roughly linear, one strongly curved, and one containing two separate clusters. You may use the perturbation loop from the second code example or construct them analytically. Produce a single figure with three panels sharing axes, and print a table of the five statistics for all three so a reader can verify they match.',
      language: 'python',
      acceptanceCriteria: [
        'Three datasets, each with at least 30 points',
        'All five summary statistics agree across the three datasets to two decimal places',
        'The three shapes are visibly and obviously different in the saved figure',
        'The figure has axis labels, a title and shared axis limits so the comparison is fair',
        'A printed table shows the matching statistics alongside the figure',
      ],
      starterCode:
        'import numpy as np\nimport matplotlib.pyplot as plt\n\nrng = np.random.default_rng(7)\n\ndef summary(x, y):\n    return (x.mean(), y.mean(), x.std(ddof=1), y.std(ddof=1), np.corrcoef(x, y)[0, 1])\n\n# Build three datasets that share these five numbers.\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who is comfortable with averages but has never plotted anything why looking at the data is a separate and necessary step from summarising it.',
      mustCover: [
        'A summary statistic is a lossy compression: many different datasets produce the same summary',
        "Anscombe's quartet or the Datasaurus dozen as concrete evidence",
        'Specific structures a picture shows and a number cannot: outliers, two groups, curvature, a hard ceiling',
        'Plotting belongs at the start of the analysis, where it can still change a decision',
      ],
      bonusSignals: [
        'mentions residual plots as a diagnostic',
        'connects it to a modelling consequence such as class imbalance or a wrong model family',
        'acknowledges the honest limits of plots — overplotting, bin width, chart scale',
      ],
      sampleExplanation:
        "An average is a way of squeezing a thousand numbers down into one. That is useful, but squeezing throws information away, and once it is gone the average cannot tell you what was lost. Anscombe made this undeniable in 1973: he wrote down four tiny datasets that have the same average x, the same average y, the same spread in both, the same correlation and the same best-fit line, and then showed that one is a noisy straight line, one is a clean parabola, one is a perfect line with a single stray point, and one is a vertical stack of identical values with one distant point off to the side. Four identical summaries, four completely different worlds. The practical consequence is that if you only look at numbers you will confidently fit a straight line to a curve, or report a mean that no actual customer is anywhere near. Drawing the picture takes one line of code and it is the only step that can tell you that the rest of your plan is wrong, which is why it goes first rather than last.",
    },
  },

  {
    id: 'VIZ-002',
    domain: 'VIZ',
    module: 'Matplotlib',
    topic: 'The Figure and Axes object model',
    title: 'Matplotlib Fundamentals: Figure and Axes',
    slug: 'matplotlib-figure-and-axes',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['VIZ-001'],
    related: ['VIZ-001'],
    tags: ['matplotlib', 'figure', 'axes', 'subplots', 'pyplot', 'dpi', 'savefig'],

    learningObjectives: [
      'Distinguish the Figure, the Axes and the Axis, and say which one owns the data, the labels and the file on disk',
      'Explain why plt.subplots() is the recommended entry point and what the implicit pyplot state machine does instead',
      'Label a chart completely: axis labels with units, a title that states the finding, a legend and readable ticks',
      'Save a figure at a resolution and size suitable for a report, a slide or a paper, without cropped labels',
    ],

    terminology: [
      {
        term: 'Figure',
        definition:
          'The whole canvas: the page that everything is drawn on. It owns its size in inches, its resolution in dots per inch, its background, and the list of Axes it contains. Saving happens at this level.',
        simple: 'The sheet of paper.',
      },
      {
        term: 'Axes',
        definition:
          'One plotting region inside a Figure, with its own data area, title, x label, y label, legend and tick settings. Almost every drawing method you will call is a method of an Axes object.',
        simple: 'One chart drawn on the sheet. A sheet can hold several.',
      },
      {
        term: 'Axis',
        definition:
          'A single dimension of an Axes: ax.xaxis or ax.yaxis. It owns the scale, the limits, the tick locator and the tick formatter. Note the spelling: Axes is the region, Axis is one of its two rulers.',
        simple: 'One of the two rulers around the edge of a chart.',
      },
      {
        term: 'pyplot state machine',
        definition:
          'The module-level functions plt.plot, plt.title and friends, which implicitly act on a hidden "current figure" and "current axes" maintained as global state by matplotlib.pyplot.',
        simple: 'Shortcut functions that guess which chart you meant, based on which one you touched last.',
      },
      {
        term: 'Artist',
        definition:
          'Any object matplotlib can render: a Line2D, a Rectangle from a bar, a Text label, the Legend, the Axes itself. Every plotting call returns the Artists it created, which you can then modify.',
        simple: 'Anything visible on the chart, as an object you can hold on to and change.',
      },
      {
        term: 'DPI',
        definition:
          'Dots per inch. Combined with figsize in inches it determines the pixel dimensions of a raster export: a 6 by 4 inch figure at 300 dpi is 1800 by 1200 pixels.',
        simple: 'How finely the picture is rendered when you save it as an image.',
      },
    ],

    simpleExplanation:
      "Matplotlib has exactly two ideas in it, and once you see them the library stops feeling arbitrary. The first is the Figure, which is the sheet of paper. It knows how big it is and how sharp it should be printed, and it is the thing you save to a file. The second is the Axes, which is one chart drawn on that paper. The Axes owns the data area and everything around it: the title above, the label under the horizontal ruler, the label beside the vertical one, the numbered ticks and the little legend box. A sheet can hold one chart or a grid of twelve, and each chart is a separate Axes object with its own labels. Nearly everything you will ever type is a method on an Axes — ax.plot, ax.bar, ax.set_xlabel — and the small number of things that concern the whole page are methods on the Figure — fig.suptitle, fig.tight_layout, fig.savefig. Beginners find matplotlib confusing because most tutorials hide both objects behind shortcut functions that guess which chart you meant. Ask for the two objects by name and the confusion disappears.",

    whyItExists:
      'A plotting library has to solve two problems at once: give a beginner a one-line way to see a curve, and give a professional precise control over a twelve-panel figure destined for a journal. Matplotlib solved the first with a MATLAB-style state machine and the second with an explicit object hierarchy, and it kept both. The Figure and Axes objects exist so that every element of a chart is an addressable, modifiable thing rather than a side effect of the last function you called.',

    analogy: {
      scenario:
        "Think of a print workshop. The Figure is a sheet of paper clamped to the bench: it has a physical size, a print quality and a name it will be filed under. Each Axes is a picture frame nailed onto that sheet, with its own caption underneath, its own title above and its own pair of rulers along the edges. If you say to an assistant 'add a title', they need to know which frame you mean. The explicit way is to point at a frame and say 'this one'. The implicit way is to trust the assistant to remember which frame you last touched — which works perfectly until you walk away, come back, and discover your title went onto the frame someone else was working on.",
      mapping: [
        { from: 'The sheet of paper on the bench', to: 'The Figure: figsize, dpi, savefig' },
        { from: 'A picture frame nailed to the sheet', to: 'An Axes: one plotting region with its own data and labels' },
        { from: 'The rulers along the edges of a frame', to: 'The x Axis and y Axis, owning scale, limits and ticks' },
        { from: 'Pointing at the frame you mean', to: 'The explicit object API: ax.set_title("...")' },
        { from: 'Trusting the assistant to remember', to: 'The pyplot state machine: plt.title("...") acts on the current Axes' },
        { from: 'Filing the finished sheet', to: 'fig.savefig("figure.png", dpi=300, bbox_inches="tight")' },
      ],
      bridge:
        'The correspondence is literal rather than poetic: matplotlib really does store a "current figure" and "current axes" as module-level state, and plt.title really does look that state up and then call set_title on whatever it finds. Knowing this, every confusing pyplot behaviour becomes predictable — a title landing on the wrong panel, a plot appearing in a figure you thought you had finished with, a notebook cell that behaves differently on a second run. Holding the objects yourself removes the guessing entirely.',
      limitations:
        'The workshop image suggests frames are fixed in place, whereas matplotlib Axes are positioned by a layout engine that can move and resize them when you call tight_layout or use constrained layout. It also understates how much an Axes owns: colour cycles, shared axes, twin axes and the legend all belong to it.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a matplotlib figure',
        caption: 'Every named part below is an object you can reach and change.',
        subject: 'fig, ax = plt.subplots(figsize=(7, 4), dpi=120)',
        annotations: [
          { part: 'fig', note: 'The Figure. Owns size in inches, dpi, the suptitle, the layout engine and savefig.' },
          { part: 'ax', note: 'The Axes. Owns the data area, title, xlabel, ylabel, legend, ticks, limits and scales.' },
          { part: 'figsize=(7, 4)', note: 'Width and height in inches. Together with dpi this fixes the pixel size of any raster export.' },
          { part: 'dpi=120', note: 'Screen rendering resolution. 100 is the default, 120 is comfortable on a laptop, 300 is print quality.' },
          { part: 'plt.subplots', note: 'Creates the Figure and its Axes in one call and hands both back. With (2, 3) it returns a 2 by 3 NumPy array of Axes.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Explicit object API versus the implicit pyplot state machine',
        caption: 'Both produce the same picture for a single chart. Only one keeps working when the code grows.',
        left: {
          heading: 'fig, ax = plt.subplots()',
          points: [
            'You hold references, so there is never ambiguity about which chart you are editing',
            'Works identically inside a function, a loop, a class or a script',
            'Subplot grids are natural: axes[0, 1].set_title("...") needs no context',
            'Returns the Artists it creates, so you can restyle a specific line later',
            'The only form that composes — a helper can accept an ax argument and draw into a caller-supplied panel',
          ],
        },
        right: {
          heading: 'plt.plot(...); plt.title(...)',
          points: [
            'Shortest possible path to one quick chart, which is a genuine virtue',
            'Acts on hidden global state: the current figure and current axes',
            'Breaks silently when two figures are open, or when a notebook cell is re-run',
            'A helper function that calls plt.* draws into whatever figure happens to be current',
            'Cannot easily target one panel of a grid without plt.sca or plt.subplot gymnastics',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Which object owns what',
        caption: 'When you cannot remember whether something is fig.* or ax.*, ask whether it concerns the page or one chart.',
        columns: ['You want to', 'Call', 'Because'],
        rows: [
          ['Set the page size', 'fig.set_size_inches(8, 5) or figsize=', 'Size belongs to the sheet of paper, not to a chart on it.'],
          ['Add a title over the whole grid', 'fig.suptitle("...")', 'It spans every Axes, so it belongs to the Figure.'],
          ['Title one panel', 'ax.set_title("...")', 'A title is part of one plotting region.'],
          ['Label the horizontal ruler', 'ax.set_xlabel("time (s)")', 'Labels describe that panel data, including its units.'],
          ['Limit the visible range', 'ax.set_xlim(0, 100)', 'Limits belong to that Axes pair of rulers.'],
          ['Use a log vertical scale', 'ax.set_yscale("log")', 'Scale is a property of one Axis of one Axes.'],
          ['Show a legend', 'ax.legend()', 'It labels the Artists drawn in that Axes.'],
          ['Stop labels being cut off', 'fig.tight_layout()', 'It repositions all Axes on the page, so it is page-level.'],
          ['Write the file', 'fig.savefig("out.png", dpi=300)', 'You save the whole sheet, never a single frame.'],
        ],
      },
      {
        kind: 'flow',
        title: 'The shape of every matplotlib script you will write',
        caption: 'Six steps, always in this order.',
        steps: [
          { label: 'Create', detail: 'fig, ax = plt.subplots(figsize=(7, 4)) — or a grid with plt.subplots(2, 3).' },
          { label: 'Draw', detail: 'ax.plot, ax.bar, ax.scatter, ax.hist. Each returns the Artists it created.' },
          { label: 'Label', detail: 'ax.set_xlabel, ax.set_ylabel with units, ax.set_title stating the finding rather than restating the columns.' },
          { label: 'Annotate', detail: 'ax.legend(), ax.grid(alpha=0.3), ax.axhline for a reference level, ax.annotate for the one point that matters.' },
          { label: 'Lay out', detail: 'fig.tight_layout(), or pass layout="constrained" at creation time, so nothing overlaps or is clipped.' },
          { label: 'Save or show', detail: 'fig.savefig("figure.png", dpi=300, bbox_inches="tight") in a script; plt.show() when working interactively.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Experiment with the object API',
        caption: 'Change figsize, add a second panel, move the legend — the structure stays the same.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'Matplotlib renders a tree of Artist objects. The root is a Figure, which owns a renderer, a size in inches, a dpi and a collection of child Artists, chief among them Axes instances. Each Axes owns a data coordinate system defined by two Axis objects, together with the Artists drawn in it. pyplot is a thin procedural wrapper that maintains a global current-figure and current-axes pointer and forwards module-level calls to methods on those objects.',

    math: {
      intuition:
        'The one piece of arithmetic worth knowing is how figsize, dpi and pixels relate, because it is the difference between a crisp chart in a report and a blurry one. Matplotlib measures the canvas in inches and renders it at a chosen number of dots per inch. Text size is specified in points, and a point is one seventy-second of an inch — which is why enlarging figsize makes text look relatively smaller, while raising dpi keeps every relative proportion identical and simply renders more finely.',
      formulas: [
        {
          latex: 'W_{px} = w_{in} \\times \\mathrm{dpi}, \\qquad H_{px} = h_{in} \\times \\mathrm{dpi}',
          name: 'Exported pixel dimensions',
          meaning:
            'A 6 by 4 inch figure saved at 300 dpi is 1800 by 1200 pixels. Doubling dpi doubles both dimensions and quadruples the file size while changing nothing about the layout.',
          variables: [
            { symbol: 'w_{in}, h_{in}', meaning: 'the figure width and height in inches, as given by figsize' },
            { symbol: '\\mathrm{dpi}', meaning: 'dots per inch used at save time' },
            { symbol: 'W_{px}, H_{px}', meaning: 'the resulting raster dimensions in pixels' },
          ],
        },
        {
          latex: 's_{px} = s_{pt} \\times \\frac{\\mathrm{dpi}}{72}',
          name: 'Rendered text height',
          meaning:
            'A 10-point label is about 14 pixels tall at 100 dpi and about 42 pixels tall at 300 dpi. Because point sizes are absolute, a label occupies a smaller fraction of a physically larger figure.',
          variables: [
            { symbol: 's_{pt}', meaning: 'the font size in typographic points' },
            { symbol: '72', meaning: 'points per inch, by definition' },
            { symbol: 's_{px}', meaning: 'the rendered height in pixels' },
          ],
        },
      ],
      derivation: [
        'Choose the physical size the figure should occupy in the final document — a single column is roughly 3.5 inches wide, a full page width roughly 7 inches.',
        'Set figsize to that physical size so that font sizes come out right relative to the surrounding body text.',
        'Choose dpi for the medium: 100 for a screen, 200 for a slide, 300 or more for print.',
        'Do not compensate for a too-small figure by shrinking fonts; enlarge figsize and let the point sizes stand.',
      ],
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The canonical single chart, fully labelled',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

epochs = np.arange(1, 31)
train_loss = 1.8 * np.exp(-epochs / 7) + 0.08
val_loss = 1.8 * np.exp(-epochs / 9) + 0.08 + 0.012 * np.maximum(0, epochs - 14)

fig, ax = plt.subplots(figsize=(7, 4.5), dpi=120)

ax.plot(epochs, train_loss, label="training loss", linewidth=2, color="#264653")
ax.plot(epochs, val_loss, label="validation loss", linewidth=2, color="#e76f51", linestyle="--")

best = int(np.argmin(val_loss)) + 1
ax.axvline(best, color="grey", linewidth=1, linestyle=":")
ax.annotate(f"best epoch = {best}", xy=(best, val_loss[best - 1]),
            xytext=(best + 3, 0.9), arrowprops=dict(arrowstyle="->", color="grey"))

ax.set_xlabel("epoch")
ax.set_ylabel("cross-entropy loss")
ax.set_title("Validation loss turns upward after epoch 14: the model begins to overfit")
ax.set_xlim(1, 30)
ax.set_ylim(0, 2.0)
ax.grid(alpha=0.3)
ax.legend(frameon=False)

fig.tight_layout()
fig.savefig("learning_curve.png", dpi=300, bbox_inches="tight")
print("best epoch:", best, "| min val loss:", round(float(val_loss.min()), 3))`,
        output: `best epoch: 14 | min val loss: 0.373`,
        explanation:
          'This is the shape of essentially every figure in the rest of this domain. The picture is a single panel roughly seven inches wide. Two curves fall steeply from about 1.7 on the left: the dark solid training curve keeps falling and flattens near 0.1, while the orange dashed validation curve bottoms out around epoch 14 and then climbs steadily back up, so the two curves splay apart towards the right in the classic overfitting fan. A dotted vertical grey line marks epoch 14 with a small arrow and the text "best epoch = 14". Notice that the title states the finding rather than saying "loss versus epoch" — a reader who sees only the title has learned something. Note also that both the axis labels name units and that savefig is called on fig, not on plt.',
      },
      {
        language: 'python',
        title: 'A grid of panels: subplots returns an array of Axes',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(3)
features = {
    "age (years)": rng.normal(38, 11, 2000),
    "income (thousands)": rng.lognormal(3.6, 0.5, 2000),
    "sessions per week": rng.poisson(4, 2000),
    "days since signup": rng.exponential(120, 2000),
}

fig, axes = plt.subplots(2, 2, figsize=(10, 6.5), layout="constrained")
print("axes is a", type(axes).__name__, "with shape", axes.shape)

for ax, (name, values) in zip(axes.flat, features.items()):
    ax.hist(values, bins=40, color="#2a9d8f", edgecolor="white", linewidth=0.4)
    ax.axvline(values.mean(), color="#e76f51", linewidth=1.5, label=f"mean = {values.mean():.1f}")
    ax.set_title(name)
    ax.set_ylabel("count")
    ax.legend(frameon=False, fontsize=9)

fig.suptitle("Feature distributions before scaling", fontsize=14)
fig.savefig("feature_grid.png", dpi=200)`,
        output: `axes is a ndarray with shape (2, 2)`,
        explanation:
          'plt.subplots(2, 2) builds one Figure and four Axes and returns them as a 2 by 2 NumPy array, which is why axes.flat lets you iterate over the panels in reading order. The saved picture is a two-by-two grid under a single overall title. Top left is a symmetric bell centred near 38. Top right is visibly right-skewed with a long thin tail stretching to the right, which is what a log-normal income column always looks like and the reason the orange mean line sits noticeably to the right of the tallest bar. Bottom left is a short discrete staircase of integer counts peaking at 3 and 4. Bottom right decays smoothly from a tall bar at zero. layout="constrained" is the modern replacement for tight_layout and is applied continuously as the figure is drawn, so the suptitle never collides with the panel titles.',
      },
      {
        language: 'python',
        title: 'Ticks, scales and saving for different destinations',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter, MultipleLocator

months = np.arange(1, 25)
users = 1200 * 1.18 ** months

fig, (ax_lin, ax_log) = plt.subplots(1, 2, figsize=(11, 4.2), layout="constrained")

for ax, scale in [(ax_lin, "linear"), (ax_log, "log")]:
    ax.plot(months, users, marker="o", markersize=3.5, color="#264653")
    ax.set_yscale(scale)
    ax.set_xlabel("months since launch")
    ax.set_title(f"{scale} y-axis")
    ax.xaxis.set_major_locator(MultipleLocator(3))
    ax.grid(alpha=0.3, which="both")

ax_lin.set_ylabel("monthly active users")
ax_lin.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v/1000:.0f}k"))

fig.suptitle("Constant 18 percent monthly growth: a curve on a linear scale, a straight line on a log scale")
fig.savefig("growth_screen.png", dpi=110)
fig.savefig("growth_print.png", dpi=300, bbox_inches="tight")
fig.savefig("growth_vector.pdf")
print("linear figure pixels:", int(11 * 110), "x", int(4.2 * 110))
print("print figure pixels:", int(11 * 300), "x", int(4.2 * 300))`,
        output: `linear figure pixels: 1210 x 462
print figure pixels: 3300 x 1260`,
        explanation:
          'Two panels side by side showing the same 24 points. The left panel is almost flat for the first year and then sweeps sharply upward, the familiar hockey stick of exponential growth; its y ticks read 0k, 10k, 20k and so on because of the FuncFormatter. The right panel shows the identical data as a near-perfect straight line, because a constant growth rate is linear in log space — this is the single most useful reason to reach for set_yscale("log"). MultipleLocator(3) puts an x tick every three months instead of letting matplotlib choose. The three savefig calls show the three destinations you will actually need: a modest raster for a screen, a 300 dpi raster for print, and a PDF, which is a vector format and therefore stays sharp at any zoom level, making it the right choice for a paper.',
      },
      {
        language: 'python',
        title: 'Why the state machine bites: the same helper written two ways',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 200)

def draw_implicitly(y, label):
    """Draws into whatever figure happens to be current. Fragile."""
    plt.plot(x, y, label=label)
    plt.legend()

def draw_explicitly(ax, y, label):
    """Draws into the Axes it is given. Composes anywhere."""
    ax.plot(x, y, label=label)
    ax.legend(frameon=False)
    return ax

fig_a, ax_a = plt.subplots(figsize=(5, 3))
fig_b, axes_b = plt.subplots(1, 2, figsize=(9, 3), layout="constrained")

# The implicit helper cannot be told where to draw: it uses the most recently
# created figure, which is fig_b, not fig_a.
draw_implicitly(np.sin(x), "sin")
print("implicit helper drew into fig_b?", len(axes_b[1].lines) == 1)
print("implicit helper drew into fig_a?", len(ax_a.lines) == 1)

# The explicit helper goes exactly where it is told, every time.
draw_explicitly(ax_a, np.cos(x), "cos")
draw_explicitly(axes_b[0], np.cos(x) * np.exp(-x / 5), "damped cos")
print("explicit helper drew into fig_a?", len(ax_a.lines) == 1)`,
        output: `implicit helper drew into fig_b? True
implicit helper drew into fig_a? False
explicit helper drew into fig_a? True`,
        explanation:
          'The point is the middle line of output. draw_implicitly was called while fig_a was the one the author was thinking about, but matplotlib current-figure pointer had moved to fig_b the moment fig_b was created, so the sine curve landed in the right-hand panel of the wrong figure with no error and no warning. draw_explicitly cannot make that mistake because the destination is an argument. This is why every plotting helper in a shared codebase takes ax=None as a parameter and calls ax = ax or plt.gca() at most once, at the top level. In a Jupyter notebook the same bug appears as a chart that silently accumulates extra lines each time you re-run a cell.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A training-diagnostics module in an ML repository',
        usage:
          'Functions like plot_learning_curve(history, ax=None) and plot_residuals(y_true, y_pred, ax=None) are written against the Axes API precisely so a caller can assemble a six-panel diagnostic sheet from them. A module written against plt.* cannot be composed this way.',
      },
      {
        context: 'Figures for a paper or a thesis',
        usage:
          'Journals specify a column width in inches and a minimum resolution. You set figsize to the column width so that 9-point axis labels are genuinely 9-point in the printed article, then export PDF for vector output, and never scale the image in the word processor.',
      },
      {
        context: 'Automated reporting jobs',
        usage:
          'A nightly job renders dozens of figures with no display attached. It uses the Agg backend, creates figures explicitly, calls fig.savefig, then plt.close(fig) — without the close, a long-running process leaks figures until matplotlib warns that more than 20 are open.',
      },
      {
        context: 'Every library that plots on top of matplotlib',
        usage:
          'pandas df.plot(), seaborn functions and scikit-learn display classes all accept and return an Axes. Knowing the object model is what lets you take their output and then fix the title, rotate the ticks or change the limits.',
      },
    ],

    projectConnections: [
      { tool: 'matplotlib', role: 'The Figure and Axes objects are the substrate for every other plotting tool in the Python data stack.' },
      { tool: 'pandas', role: 'df.plot(ax=ax) draws a DataFrame straight into an Axes you control, which is how you combine pandas convenience with full styling control.' },
      { tool: 'seaborn', role: 'Axes-level functions such as sns.boxplot(ax=ax) slot into your grid; figure-level ones such as sns.pairplot build their own Figure.' },
      { tool: 'scikit-learn', role: 'ConfusionMatrixDisplay, RocCurveDisplay and LearningCurveDisplay all accept ax= and return an object whose .ax_ attribute you can restyle.' },
    ],

    commonMistakes: [
      {
        mistake: 'Mixing plt.* calls with ax.* calls in the same block',
        why: 'plt.title acts on the current Axes, which may not be the ax you hold a reference to, so titles and labels end up on the wrong panel with no error message.',
        fix: 'Pick the explicit API and stay in it. If you catch yourself typing plt.something after plt.subplots, the equivalent is almost always ax.set_something.',
      },
      {
        mistake: 'Confusing Axes with Axis',
        why: 'They differ by one letter and mean different things. ax.set_xlabel is an Axes method; ax.xaxis.set_major_formatter reaches into the Axis object that owns tick placement and formatting.',
        fix: 'Remember: Axes is the chart, Axis is one ruler. Anything about ticks, locators, formatters or scale lives one level down, on ax.xaxis or ax.yaxis.',
      },
      {
        mistake: 'Labels cut off at the edge of a saved image',
        why: 'By default matplotlib reserves fixed margins that do not know how long your rotated tick labels or y-axis title are, so text can extend past the canvas and be clipped on export.',
        fix: 'Call fig.tight_layout(), or create the figure with layout="constrained", and pass bbox_inches="tight" to savefig. Constrained layout is the more robust of the two because it re-runs as elements are added.',
      },
      {
        mistake: 'Raising dpi to make a figure bigger',
        why: 'dpi changes rendering resolution, not layout. A figure that is too small with crowded labels stays crowded at 300 dpi — it just becomes a larger file with the same crowding.',
        fix: 'Change figsize to change how much room the chart has; change dpi only to change sharpness. If text is too small in a document, make the figure physically smaller so it is scaled up less.',
      },
      {
        mistake: 'Never calling plt.close(fig) in a loop that generates many figures',
        why: 'Each figure holds a renderer and its Artists in memory, and pyplot keeps a registry of every figure it created, so nothing is garbage collected. Matplotlib emits a RuntimeWarning once 20 figures are open.',
        fix: 'In batch code, call plt.close(fig) immediately after savefig, or build figures with the object-oriented Figure class and no pyplot registry at all.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain the difference between a Figure, an Axes and an Axis in matplotlib.',
        answer:
          'The Figure is the whole canvas — it owns the size in inches, the dpi, any figure-wide title and the savefig method. An Axes is one plotting region on that canvas: it owns the data drawn inside it plus the surrounding title, axis labels, legend and limits, and it is where almost all plotting methods live. An Axis, singular, is one dimension of an Axes, reachable as ax.xaxis or ax.yaxis, and owns the scale, the tick locator and the tick formatter. A quick test of whether someone has the model straight: the title is set on the Axes, the suptitle on the Figure, and the tick formatter on the Axis.',
        followUp:
          'A strong answer adds that all three are Artists in one render tree, and that the entire figure is drawn by traversing that tree.',
      },
      {
        level: 'intermediate',
        question: 'Why is fig, ax = plt.subplots() recommended over calling plt.plot directly?',
        answer:
          'Because plt functions operate on hidden global state — a current figure and current axes maintained by pyplot — and that state is only unambiguous in the simplest possible script. As soon as you have two figures open, a helper function that plots, a loop that builds panels, or a notebook cell that is re-run, plt.title can apply to a chart you were not thinking about, silently and with no error. plt.subplots hands you the two objects, so every subsequent call names its target. It also scales: plt.subplots(2, 3) gives you an array of Axes and each panel is addressed by index. The practical rule in a shared codebase is that any function that draws should accept an ax parameter.',
        followUp:
          'Mentioning that plt.subplots is itself just a convenience over Figure and Figure.add_subplot, and that the pure object-oriented route avoids the pyplot figure registry entirely, shows depth.',
      },
      {
        level: 'ml-engineer',
        question: 'Your saved figure looks fine on screen but the y-axis label is cut off in the PNG you emailed. What is happening and how do you fix it?',
        answer:
          'The default layout reserves fixed fractional margins around the Axes that were computed without knowing the extent of your text, so a long y-axis label or rotated tick labels can extend beyond the figure bounding box and be clipped at save time. Interactive backends often reflow slightly differently from the file writer, which is why it can look acceptable on screen. The fixes, in increasing order of robustness: pass bbox_inches="tight" to savefig so the bounding box is expanded to include all Artists; call fig.tight_layout() before saving so the Axes are repositioned; or create the figure with layout="constrained", which re-solves the layout whenever elements change and handles suptitles, shared colourbars and legends far better. If the label is genuinely enormous, increase figsize rather than shrinking the font.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Create a 1 by 3 figure that is 12 by 3.5 inches. Plot sin, cos and their sum, give each panel its own title, share the y-axis across the three, add one overall title, and save it at 200 dpi. State the pixel dimensions of the file.',
        hint: 'plt.subplots takes nrows, ncols, figsize and sharey. The pixel size is figsize times dpi.',
        language: 'python',
        starterCode:
          'import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(0, 2 * np.pi, 300)\n# Build the 1 x 3 figure here.\n',
        solution:
          'fig, axes = plt.subplots(1, 3, figsize=(12, 3.5), sharey=True, layout="constrained")\nfor ax, (y, name) in zip(axes, [(np.sin(x), "sin x"), (np.cos(x), "cos x"), (np.sin(x) + np.cos(x), "sin x + cos x")]):\n    ax.plot(x, y, linewidth=2)\n    ax.set_title(name)\n    ax.set_xlabel("x (radians)")\n    ax.grid(alpha=0.3)\naxes[0].set_ylabel("value")\nfig.suptitle("Shared y-axis makes the amplitudes directly comparable")\nfig.savefig("trig.png", dpi=200)\n\nThe file is 12 x 200 = 2400 pixels wide and 3.5 x 200 = 700 pixels tall. Because sharey=True, the third panel visibly reaches higher than the other two — its amplitude is the square root of 2 — which is exactly the comparison that would have been destroyed if each panel had auto-scaled independently. Only the leftmost panel needs a y label, since the axis is shared.',
      },
      {
        prompt:
          'A colleague reports that calling a helper function twice adds both curves to the same chart instead of producing two separate charts. The helper starts with plt.plot(...). Diagnose it and rewrite the helper.',
        hint: 'Which figure does plt.plot draw into, and who decided that?',
        solution:
          'The helper never creates a figure, so plt.plot draws into whatever figure pyplot currently considers current — which after the first call is the figure the first call created. Both curves therefore land in one Axes.\n\nRewrite it to take the destination explicitly:\n\ndef plot_series(values, label, ax=None):\n    if ax is None:\n        _, ax = plt.subplots(figsize=(6, 4))\n    ax.plot(values, label=label)\n    ax.set_xlabel("index")\n    ax.legend(frameon=False)\n    return ax\n\nNow calling it twice with no ax produces two independent figures, and calling it twice with the same ax deliberately overlays the curves. The caller decides, which is the whole point. This ax=None convention is what pandas, seaborn and scikit-learn all follow.',
      },
      {
        prompt:
          'You must produce a figure for a journal whose single-column width is 3.5 inches and which requires at least 300 dpi for raster art and 8-point minimum font size. Give the exact matplotlib calls and explain why enlarging figsize would be wrong here.',
        hint: 'Think about what happens to a 3.5-inch figure that is placed into a 3.5-inch column versus a 7-inch figure that the publisher then scales down by half.',
        solution:
          'fig, ax = plt.subplots(figsize=(3.5, 2.6), dpi=300)\nax.tick_params(labelsize=8)\nax.set_xlabel("time (s)", fontsize=9)\nax.set_ylabel("current (mA)", fontsize=9)\nfig.savefig("fig1.pdf", bbox_inches="tight")\n\nSetting figsize to the final printed width means the figure is placed at 100 percent scale, so a 9-point label really is 9 points on the page. If you instead built it at 7 inches and let the publisher shrink it by half, that 9-point label would print at 4.5 points and fall below the minimum. Saving as PDF sidesteps the dpi requirement entirely, because vector art has no fixed resolution; the 300 dpi rule only binds for raster formats such as PNG.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-002-q1',
        type: 'mcq',
        concept: 'object model',
        prompt: 'Which object do you call savefig on?',
        options: ['The Figure', 'The Axes', 'The Axis', 'The Artist that was drawn last'],
        answerIndex: 0,
        explanation:
          'Saving writes the whole canvas, and the canvas is the Figure. There is no way to save a single Axes directly — to export one panel you either build a figure containing only that panel or pass a restricted bounding box.',
      },
      {
        id: 'VIZ-002-q2',
        type: 'match',
        concept: 'which object owns what',
        prompt: 'Match each task to the object that owns it.',
        pairs: [
          { left: 'Set the overall title spanning a grid of panels', right: 'fig.suptitle(...)' },
          { left: 'Set the title of one panel', right: 'ax.set_title(...)' },
          { left: 'Change how tick numbers are formatted', right: 'ax.xaxis.set_major_formatter(...)' },
          { left: 'Change the page size in inches', right: 'fig.set_size_inches(...)' },
          { left: 'Switch the vertical scale to logarithmic', right: 'ax.set_yscale("log")' },
        ],
        explanation:
          'Anything spanning the whole page belongs to the Figure; anything about one chart belongs to its Axes; anything about ticks, locators, formatters or a single ruler belongs one level further down, on ax.xaxis or ax.yaxis.',
      },
      {
        id: 'VIZ-002-q3',
        type: 'code-output',
        language: 'python',
        concept: 'subplots return value',
        prompt: 'What does this print?',
        code: 'import matplotlib.pyplot as plt\nfig, axes = plt.subplots(2, 3, figsize=(9, 5))\nprint(type(axes).__name__, axes.shape, axes.size)',
        options: ['ndarray (2, 3) 6', 'list (2, 3) 6', 'Axes (2, 3) 6', 'tuple (3, 2) 6'],
        answerIndex: 0,
        explanation:
          'With more than one row and column, plt.subplots returns a NumPy ndarray of Axes with shape (nrows, ncols). That is why axes.flat is the usual way to iterate over panels in reading order, and axes[1, 2] addresses a specific one.',
      },
      {
        id: 'VIZ-002-q4',
        type: 'numeric',
        concept: 'dpi and figsize',
        prompt: 'A figure created with figsize=(6, 4) is saved with dpi=300. How many pixels wide is the resulting PNG?',
        answer: 1800,
        unit: 'pixels',
        explanation:
          'Pixel width is figure width in inches times dpi, so 6 x 300 = 1800 pixels, and the height is 4 x 300 = 1200. Raising dpi changes only sharpness and file size; it never changes the layout or the relative size of the text.',
      },
      {
        id: 'VIZ-002-q5',
        type: 'truefalse',
        concept: 'pyplot state',
        prompt: 'After creating two figures with plt.subplots, a later call to plt.title() applies to the figure created first.',
        answer: false,
        explanation:
          'pyplot keeps a pointer to the most recently created or most recently activated figure, so plt.title applies to the second one. This silent retargeting is the core reason the explicit ax API is preferred in anything longer than a throwaway snippet.',
      },
      {
        id: 'VIZ-002-q6',
        type: 'debug',
        language: 'python',
        concept: 'clipped labels',
        prompt: 'The saved PNG has its rotated x tick labels cut off along the bottom. Which single change fixes it most robustly?',
        code: 'fig, ax = plt.subplots(figsize=(6, 3))\nax.bar(long_category_names, values)\nax.set_xticklabels(long_category_names, rotation=45, ha="right")\nfig.savefig("bars.png", dpi=200)',
        options: [
          'Create the figure with layout="constrained" (or call fig.tight_layout()) before saving',
          'Increase dpi from 200 to 400',
          'Call ax.set_ylim(0, max(values)) before saving',
          'Replace fig.savefig with plt.savefig',
        ],
        answerIndex: 0,
        explanation:
          'The default margins were computed without knowing how far the rotated labels extend, so they overflow the canvas. Constrained layout re-solves the positions with the real text extents; bbox_inches="tight" is a second, complementary fix. dpi affects only resolution, so at 400 the labels are clipped just as badly at twice the file size.',
      },
    ],

    flashcards: [
      { front: 'Figure versus Axes versus Axis', back: 'Figure = the whole canvas (size, dpi, savefig). Axes = one chart on it (data, title, labels, legend). Axis = one ruler of an Axes (scale, ticks, formatter).' },
      { front: 'What does plt.subplots() return?', back: 'A tuple (Figure, Axes). With nrows or ncols above 1 the second element is a NumPy array of Axes, addressed by index or iterated with .flat.' },
      { front: 'Why prefer ax.set_title over plt.title?', back: 'plt.title acts on pyplot hidden current-axes pointer, which silently changes when another figure is created or a cell is re-run. ax names its target explicitly.' },
      { front: 'How many pixels is figsize=(8, 5) at dpi=150?', back: '1200 by 750. Pixels are inches times dpi, so dpi changes sharpness and file size but never layout.' },
      { front: 'What fixes clipped axis labels on export?', back: 'layout="constrained" at figure creation, or fig.tight_layout(), plus bbox_inches="tight" in savefig.' },
      { front: 'What convention should a reusable plotting helper follow?', back: 'Accept ax=None, create a figure only if ax is None, draw into ax, and return it — so callers can compose panels.' },
      { front: 'When should a figure be saved as PDF rather than PNG?', back: 'Whenever it is going into a paper or a document that may be zoomed or reprinted: PDF is vector, so it has no fixed resolution and stays sharp at any size.' },
    ],

    challenge: {
      title: 'A reusable diagnostics sheet',
      brief:
        'Write a module with three functions — plot_learning_curve(history, ax=None), plot_residuals(y_true, y_pred, ax=None) and plot_class_balance(labels, ax=None) — each of which draws into a caller-supplied Axes, labels itself completely and returns the Axes. Then write a fourth function, diagnostics_sheet(...), that creates a 2 by 2 figure, calls the three helpers into three of the panels, leaves the fourth for a text summary added with ax.text, and saves the result at 200 dpi with constrained layout. Every panel must have axis labels with units where applicable and a title that states a finding.',
      language: 'python',
      acceptanceCriteria: [
        'All three plotting functions accept ax=None, create a figure only when ax is None, and return the Axes',
        'No plt.* drawing or labelling calls appear inside any helper',
        'diagnostics_sheet produces a single 2 by 2 figure with no overlapping or clipped text',
        'Every panel has a title, an x label and a y label, with units where they exist',
        'The figure is saved once at 200 dpi and the figure is closed afterwards',
      ],
      starterCode:
        'import numpy as np\nimport matplotlib.pyplot as plt\n\n\ndef plot_learning_curve(history, ax=None):\n    if ax is None:\n        _, ax = plt.subplots(figsize=(6, 4))\n    # draw, label, return ax\n    return ax\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who has copied matplotlib snippets from the internet but never understood them what Figure and Axes are, and why every good example starts with fig, ax = plt.subplots().',
      mustCover: [
        'The Figure is the whole canvas and owns size, dpi and saving',
        'An Axes is one chart on that canvas and owns the data, title, labels and legend',
        'plt.* functions act on a hidden current figure and current axes, which is where the confusion comes from',
        'Holding the objects makes grids, helper functions and re-run notebook cells behave predictably',
      ],
      bonusSignals: [
        'mentions Axis as distinct from Axes',
        'mentions the ax=None convention for reusable helpers',
        'mentions tight_layout or constrained layout and savefig dpi',
      ],
      sampleExplanation:
        'Matplotlib has two objects that matter. The Figure is the sheet of paper: it knows how many inches wide it is, how finely to render, and it is the thing you save to a file. The Axes is one chart drawn on that sheet, and it owns everything that belongs to that chart — the data, the title above it, the labels on both rulers, the legend and the visible range. A sheet can carry one chart or a grid of them. The reason good examples begin with fig, ax = plt.subplots() is that this one line hands you both objects by name. The alternative, plt.plot followed by plt.title, works by guessing: pyplot keeps a hidden note of which chart you touched most recently and applies your command to that one. That guess is right in a three-line snippet and wrong the moment you have two figures open, write a function that plots, or re-run a notebook cell. Once you hold ax yourself, every command says exactly which chart it means, and the library stops surprising you.',
    },
  },

  {
    id: 'VIZ-003',
    domain: 'VIZ',
    module: 'Matplotlib',
    topic: 'Line charts and bar charts',
    title: 'Line and Bar Charts',
    slug: 'line-and-bar-charts',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['VIZ-002'],
    related: ['VIZ-001', 'VIZ-002'],
    tags: ['line-chart', 'bar-chart', 'time-series', 'categorical', 'zero-baseline', 'stacked'],

    learningObjectives: [
      'Choose a line chart only when the horizontal axis has a meaningful order, and a bar chart when it does not',
      'Explain why a bar chart must start its value axis at zero while a line chart need not',
      'Decide between grouped and stacked bars based on whether the reader must compare parts or totals',
      'Use horizontal bars and deliberate sorting to make a chart with long category names readable',
    ],

    terminology: [
      {
        term: 'Line chart',
        definition:
          'A chart connecting successive points with straight segments. The connecting segment is an assertion that the space between two observations is meaningful and continuous.',
        simple: 'Dots joined by lines, used when the left-to-right order really means something.',
      },
      {
        term: 'Bar chart',
        definition:
          'A chart encoding a value as the length of a rectangle from a common baseline. Length is the visual channel, which is why the baseline must be zero.',
        simple: 'Rectangles whose lengths you compare, all starting from the same line.',
      },
      {
        term: 'Zero baseline',
        definition:
          'The requirement that a bar axis begins at zero, so that the ratio of two bar lengths equals the ratio of the two values they represent.',
        simple: 'Bars start at zero, otherwise their lengths lie about how different the numbers are.',
      },
      {
        term: 'Grouped bars',
        definition:
          'Several bars per category, placed side by side with a small offset, each series in its own colour. Optimised for comparing series within a category.',
        simple: 'Bars standing next to each other so you can compare them directly.',
      },
      {
        term: 'Stacked bars',
        definition:
          'Segments piled on top of each other so the total length is the sum. Only the bottom segment shares a common baseline, so only it is reliably comparable across categories.',
        simple: 'Bars piled up to show a total, at the cost of making the upper pieces hard to compare.',
      },
      {
        term: 'Categorical axis',
        definition:
          'An axis whose positions are labels rather than numbers. Distances along it carry no meaning, so nothing should be interpolated between two positions.',
        simple: 'An axis of names, not numbers — the gap between two names means nothing.',
      },
    ],

    simpleExplanation:
      'Line charts and bar charts look similar and answer different questions, and mixing them up is the most common chart mistake there is. A line chart says "these points are in order, and the order matters". Monday, Tuesday, Wednesday are in order; epoch 1, 2, 3 are in order; so the line drawn between two points is a genuine claim that the quantity passed through the values in between. A bar chart says "these are separate things, and I want you to compare how big they are". France, Brazil and Japan are not in order, so joining them with a line would be nonsense — there is no country halfway between France and Brazil. Because a bar asks you to compare lengths, a bar must start at zero: if one bar is twice as long as another, the value behind it must be twice as large, and that only holds when both start from the same zero line. A line chart is exempt from that rule, because you read a line by its shape, not by its distance from the bottom of the page — which is why a stock price chart that starts at 140 is fine while a bar chart that starts at 140 is a trick.',

    whyItExists:
      'Human vision judges the length of an aligned bar with remarkable accuracy and judges the slope and shape of a connected path almost as well, but it judges area, angle and colour intensity poorly. Line and bar charts exist because they map a quantity onto the two visual channels people read most precisely, and the separation between them exists because connecting unordered categories with a line asserts a continuity that does not exist.',

    analogy: {
      scenario:
        "Think about two very different questions you could ask about a hospital ward. The first is 'how did this one patient's temperature change through the night?' You want the trace: the shape of the rise and fall, how fast it climbed, whether it plateaued. The second is 'which of these six wards used the most oxygen last month?' There is no order to the wards, no meaning to the space between Ward C and Ward F, and what you want is to compare six quantities against each other. Drawing the second question as a line would imply the ward numbers form a scale; drawing the first as bars would bury the shape of the night in sixty separate rectangles.",
      mapping: [
        { from: "One patient's temperature through the night", to: 'Ordered data on the x axis: time, epochs, dose levels' },
        { from: 'The connected trace you read for shape', to: 'A line chart, read by slope and curvature rather than by height above zero' },
        { from: 'Six unrelated wards', to: 'A categorical axis where distance carries no meaning' },
        { from: 'Comparing six oxygen totals', to: 'A bar chart, read by comparing lengths from a shared baseline' },
        { from: 'Measuring bars from the floor of the room, not from a shelf', to: 'The zero-baseline rule: bar length must be proportional to value' },
      ],
      bridge:
        'The distinction is not stylistic, it is semantic. A line segment between two points is a claim about the values in between; a bar is a claim about a magnitude relative to zero. Choose the mark whose built-in claim is true of your data, and most chart-choice arguments dissolve. This also explains the exemption: a line never claims anything about zero, so truncating its axis to show detail is legitimate, while a truncated bar axis breaks the proportionality the mark is built on.',
      limitations:
        'The analogy treats the categories as unordered, but many categorical axes do have an order worth respecting — small, medium, large; or the twelve months of the year. There, bars remain correct and the order should be preserved rather than sorted by value.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Line chart or bar chart',
        caption: 'The deciding question is whether the x axis has a meaningful order, not which one looks better.',
        left: {
          heading: 'Use a line',
          points: [
            'The x axis is time, or another ordered continuum such as epochs, dose or distance',
            'The reader should follow a trend, a rate of change or a turning point',
            'Points are dense enough that individual values matter less than the shape',
            'Several series can be overlaid and compared by slope',
            'A non-zero y axis is acceptable and often necessary to see the variation',
          ],
        },
        right: {
          heading: 'Use bars',
          points: [
            'The x axis is categorical: countries, models, product lines, classes',
            'The reader should compare magnitudes, including precise ratios',
            'There are few enough categories to label, roughly 3 to 20',
            'The quantity is a count, a total or a sum — something with a meaningful zero',
            'The value axis must start at zero, without exception',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Bar chart decisions and what each one costs',
        columns: ['Decision', 'Choose this when', 'What it costs you'],
        rows: [
          ['Vertical bars', 'Category names are short and there are fewer than about ten', 'Long labels must be rotated, which slows reading considerably'],
          ['Horizontal bars', 'Labels are long, or there are many categories', 'Uses more vertical space; less conventional for time-like categories'],
          ['Sorted by value', 'The question is which is biggest or smallest', 'Destroys any natural order the categories had'],
          ['Natural order kept', 'Categories are ordered: months, sizes, deciles', 'Makes rank comparisons harder to read off'],
          ['Grouped bars', 'Reader must compare series within each category', 'Gets crowded past three series; totals are hard to judge'],
          ['Stacked bars', 'Reader must compare totals and see composition', 'Only the bottom segment is reliably comparable across categories'],
          ['100 percent stacked', 'Reader must compare composition, not totals', 'Totals are completely hidden — a segment can grow while the count falls'],
        ],
      },
      {
        kind: 'flow',
        title: 'Building a bar chart that survives review',
        caption: 'Every step here removes a specific way the chart could mislead or annoy.',
        steps: [
          { label: 'Aggregate deliberately', detail: 'Decide whether the bar is a count, a sum, a mean or a median, and put that word in the axis label.' },
          { label: 'Choose orientation', detail: 'Long labels mean horizontal bars with barh. Rotating labels 45 degrees is the compromise, not the default.' },
          { label: 'Order the categories', detail: 'Sort by value when the question is a ranking; keep the natural order when one exists.' },
          { label: 'Anchor at zero', detail: 'ax.set_ylim(bottom=0) for vertical bars. Never truncate a bar axis to dramatise a difference.' },
          { label: 'Label the values', detail: 'ax.bar_label(bars) removes the need to read numbers off ticks, and lets you drop the grid entirely.' },
          { label: 'State the finding', detail: 'The title says what the chart shows, not which columns are plotted.' },
        ],
      },
      {
        kind: 'ascii',
        title: 'What truncating a bar axis does to the comparison',
        caption: 'The same two values, 102 and 108, drawn from zero and drawn from 100.',
        art: `From zero (honest)              From 100 (misleading)
value axis                       value axis
110 |                            110 |
    |  ####   ####                   |          ####
 80 |  ####   ####                108 |          ####
    |  ####   ####                106 |          ####
 40 |  ####   ####                104 |  ####    ####
    |  ####   ####                102 |  ####    ####
  0 +--A------B---                100 +--A-------B---
     102     108                      102      108

Bar B is 6 percent longer.        Bar B looks four times taller.
The ratio of lengths matches      The ratio of lengths has no
the ratio of values.              relationship to the values.`,
      },
      {
        kind: 'widget',
        title: 'Which mark fits the question',
        caption: 'Work through a few questions and see where line and bar charts sit relative to the alternatives.',
        widget: 'chart-chooser',
      },
    ],

    formalDefinition:
      'A line chart encodes an ordered sequence of observations as connected position marks, so that the slope of each segment expresses a rate of change over the ordering variable. A bar chart encodes a magnitude as the extent of a rectangle from a shared baseline, so that perceived length is proportional to value — a proportionality that holds only when the baseline is zero and the scale is linear.',

    math: {
      intuition:
        'The zero-baseline rule is not a convention someone invented for tidiness; it falls straight out of what a length encoding means. A bar chart maps a value to a length through a linear function. If the baseline is zero, that function passes through the origin, so the ratio of two lengths equals the ratio of two values and the reader can take ratios off the page. Move the baseline anywhere else and the mapping acquires an offset, at which point the ratio of lengths can be made as large as you like by sliding the baseline closer to the data. Tufte formalised the abuse as the lie factor.',
      formulas: [
        {
          latex: '\\ell(v) = k\\,(v - b)',
          name: 'Length encoding with baseline b',
          meaning:
            'The length drawn for a value. With b = 0 the encoding is proportional; with b nonzero it is merely affine, and ratios of lengths stop meaning ratios of values.',
          variables: [
            { symbol: '\\ell(v)', meaning: 'the drawn length of the bar' },
            { symbol: 'v', meaning: 'the value being encoded' },
            { symbol: 'b', meaning: 'the baseline the axis starts at' },
            { symbol: 'k', meaning: 'pixels per unit, set by the axis scale' },
          ],
        },
        {
          latex: '\\frac{\\ell(v_2)}{\\ell(v_1)} = \\frac{v_2 - b}{v_1 - b} \\xrightarrow[\;b \\to 0\;]{} \\frac{v_2}{v_1}',
          name: 'Why the baseline must be zero',
          meaning:
            'The ratio the eye reads equals the ratio of the values only when b is zero. With v1 = 102, v2 = 108 and b = 100 the eye reads 8 divided by 2, a factor of four, for a true difference of 6 percent.',
          variables: [
            { symbol: 'v_1, v_2', meaning: 'the two values being compared' },
            { symbol: 'b', meaning: 'the axis baseline' },
          ],
        },
        {
          latex: 'm_i = \\frac{y_{i+1} - y_i}{x_{i+1} - x_i}',
          name: 'Slope of a line segment',
          meaning:
            'What a reader actually extracts from a line chart. Because slope is a difference, it is unaffected by shifting the axis baseline, which is why line charts are exempt from the zero rule.',
          variables: [
            { symbol: 'y_i', meaning: 'the value at the i-th ordered position' },
            { symbol: 'x_i', meaning: 'the ordering variable, usually time' },
            { symbol: 'm_i', meaning: 'the rate of change over that interval' },
          ],
        },
      ],
      derivation: [
        'A bar encodes value as length measured from the baseline: length is proportional to v minus b.',
        'Readers compare bars by taking a ratio of lengths, because that is what aligned length comparisons are good for.',
        'That ratio equals (v2 - b) / (v1 - b), which equals v2 / v1 only when b = 0.',
        'Hence any nonzero baseline systematically distorts every comparison the chart invites, by a factor the author chooses.',
        'A line is read by slope, which is a difference of y values; adding a constant offset to every y leaves all differences unchanged, so truncation does not distort slope.',
      ],
    },

    workedExample: {
      title: 'Grouped or stacked: picking the one that answers the question',
      setup:
        'A team tracks support tickets by quarter, split into three types: billing, bugs and feature requests. Q1 is 120 / 80 / 40, Q2 is 140 / 70 / 50, Q3 is 150 / 110 / 45, Q4 is 130 / 60 / 60. Two different stakeholders ask two different questions about exactly this table.',
      steps: [
        {
          label: 'Question A: is total ticket volume growing?',
          detail:
            'The totals are 240, 260, 305 and 250. This is a question about the sum, so the reader needs the full bar height to be the answer. Stacked bars put the total at the top of each bar and it can be read directly: a rise into Q3 and a fall in Q4.',
        },
        {
          label: 'Question B: did bug reports spike in Q3?',
          detail:
            'Bugs go 80, 70, 110, 60. In a stacked chart the bug segment floats on top of the billing segment, so its bottom edge sits at a different height in every quarter and the eye must compare unaligned lengths — a task it performs badly. Grouped bars give every bug bar the same baseline and the Q3 spike is obvious.',
        },
        {
          label: 'Quantifying the difference in difficulty',
          detail:
            'Cleveland and McGill ranked graphical perception tasks by accuracy: judging position along a common scale is the most accurate, and judging length without a common baseline is measurably worse. Stacking moves every series above the bottom one from the first category into the second.',
        },
        {
          label: 'The compromise that is usually wrong',
          detail:
            'A 100 percent stacked chart answers neither question: it hides totals entirely, so the Q3 volume spike disappears, and it shows bugs as a share, which rose in Q3 partly because bugs rose and partly because feature requests fell.',
        },
        {
          label: 'The resolution',
          detail:
            'Draw two charts. A single line chart of the total answers question A better than any bar arrangement, and grouped bars answer question B. Trying to answer both with one chart is what produces the stacked chart that nobody can read.',
        },
      ],
      conclusion:
        'Grouped bars when the reader compares series to each other; stacked bars when the reader needs totals and the composition is a secondary detail; two charts when both questions genuinely matter. The failure mode is choosing stacked because it looks tidier and then asking readers to compare floating segments.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A line chart of ordered data, with a second series and a marked event',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(11)
days = np.arange(1, 121)
baseline = 2400 + 6 * days
seasonal = 180 * np.sin(2 * np.pi * days / 7)
noise = rng.normal(0, 70, days.size)
sessions = baseline + seasonal + noise
sessions[80:] += 600                       # a release on day 81

rolling = np.convolve(sessions, np.ones(7) / 7, mode="valid")

fig, ax = plt.subplots(figsize=(9, 4.5), layout="constrained")
ax.plot(days, sessions, color="#9db4c0", linewidth=1, label="daily sessions")
ax.plot(days[6:], rolling, color="#264653", linewidth=2.2, label="7-day mean")
ax.axvline(81, color="#e76f51", linewidth=1.4, linestyle="--")
ax.text(83, 2600, "v2.0 released", color="#e76f51", fontsize=10)

ax.set_xlabel("day since launch")
ax.set_ylabel("sessions per day")
ax.set_title("Sessions step up by roughly 600 per day after the v2.0 release")
ax.set_xlim(1, 120)
ax.grid(alpha=0.3)
ax.legend(frameon=False, loc="upper left")
fig.savefig("sessions.png", dpi=200)

print("mean before release:", round(sessions[:80].mean()))
print("mean after release: ", round(sessions[80:].mean()))`,
        output: `mean before release: 2650
mean after release:  3849`,
        explanation:
          'The picture is one wide panel. A pale, spiky grey line wobbles upward across the page with a visible seven-day ripple — that is the raw daily series. A heavy dark line runs through the middle of it, smoothing the ripple away and making the underlying trend unambiguous; this is why a rolling mean is drawn on top of rather than instead of the raw series. At day 81 an orange dashed vertical line marks the release, and the dark line jumps abruptly at that point and continues at the higher level. A line chart is the right mark here because days are ordered and the reader is being asked about shape and a turning point, not about comparing 120 separate magnitudes. Note that the y axis does not start at zero and that this is entirely legitimate: the reader is reading slope and a step, not length from a baseline.',
      },
      {
        language: 'python',
        title: 'Bar charts: zero baseline, sorting, and horizontal bars for long labels',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

models = [
    "logistic regression (baseline)",
    "gradient boosted trees",
    "random forest, 500 estimators",
    "support vector machine, RBF kernel",
    "k-nearest neighbours, k=15",
    "multilayer perceptron, 2 hidden layers",
]
f1 = np.array([0.712, 0.861, 0.834, 0.803, 0.744, 0.827])

order = np.argsort(f1)                      # ascending, so the best ends up on top
labels = [models[i] for i in order]
values = f1[order]
colours = ["#2a9d8f" if v == values.max() else "#8fa7b3" for v in values]

fig, ax = plt.subplots(figsize=(8.5, 4.2), layout="constrained")
bars = ax.barh(labels, values, color=colours, height=0.65)
ax.bar_label(bars, fmt="%.3f", padding=4, fontsize=9)

ax.set_xlim(0, 1.0)                          # zero baseline, and F1 cannot exceed 1
ax.set_xlabel("F1 score on the held-out test set")
ax.set_title("Gradient boosted trees lead by 0.027 F1 over the random forest")
ax.spines[["top", "right"]].set_visible(False)
ax.xaxis.grid(alpha=0.3)
ax.set_axisbelow(True)
fig.savefig("model_comparison.png", dpi=200)

print("best:", labels[-1], round(float(values[-1]), 3))
print("spread:", round(float(values.max() - values.min()), 3))`,
        output: `best: gradient boosted trees 0.861
spread: 0.149`,
        explanation:
          'Six horizontal bars, shortest at the bottom and longest at the top, each labelled with its exact F1 value at the right-hand end. The winning bar is teal and the rest are muted grey, which directs attention without needing a legend. Horizontal bars are the right choice because the model names are long: as vertical bars these labels would have to be rotated 45 degrees and the chart would become noticeably slower to read. The x axis runs from 0 to 1 — zero because bar length must be proportional, and 1 because that is the ceiling of the F1 metric, so the reader sees not only which model wins but how much room is left. The bar_label call puts exact values on the chart, which is why the grid can be faint and the ticks sparse.',
      },
      {
        language: 'python',
        title: 'Grouped versus stacked, drawn side by side from the same table',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

quarters = ["Q1", "Q2", "Q3", "Q4"]
series = {
    "billing":  np.array([120, 140, 150, 130]),
    "bugs":     np.array([ 80,  70, 110,  60]),
    "features": np.array([ 40,  50,  45,  60]),
}
colours = {"billing": "#264653", "bugs": "#e76f51", "features": "#e9c46a"}

fig, (ax_g, ax_s) = plt.subplots(1, 2, figsize=(11.5, 4.3), sharey=True, layout="constrained")

x = np.arange(len(quarters))
width = 0.26
for i, (name, vals) in enumerate(series.items()):
    ax_g.bar(x + (i - 1) * width, vals, width, label=name, color=colours[name])
ax_g.set_xticks(x, quarters)
ax_g.set_title("Grouped: compare a series across quarters")
ax_g.set_ylabel("tickets")
ax_g.legend(frameon=False, ncol=3, fontsize=9)

bottom = np.zeros(len(quarters))
for name, vals in series.items():
    ax_s.bar(quarters, vals, bottom=bottom, label=name, color=colours[name])
    bottom += vals
ax_s.set_title("Stacked: compare totals across quarters")

for ax in (ax_g, ax_s):
    ax.set_ylim(bottom=0)
    ax.yaxis.grid(alpha=0.3)
    ax.set_axisbelow(True)
    ax.spines[["top", "right"]].set_visible(False)

fig.suptitle("Same four numbers per quarter, two different questions answered")
fig.savefig("grouped_vs_stacked.png", dpi=200)

totals = sum(series.values())
print("totals per quarter:", dict(zip(quarters, totals)))
print("bugs per quarter:  ", dict(zip(quarters, series["bugs"])))`,
        output: `totals per quarter: {'Q1': 240, 'Q2': 260, 'Q3': 305, 'Q4': 250}
bugs per quarter:   {'Q1': 80, 'Q2': 70, 'Q3': 110, 'Q4': 60}`,
        explanation:
          'Two panels sharing one y axis. On the left, each quarter has three bars standing side by side; because every orange bug bar starts from the same zero line, the Q3 spike from 70 to 110 is immediately visible and the Q4 drop to 60 equally so. On the right, the same numbers are piled into one bar per quarter; the total heights 240, 260, 305, 250 are easy to compare because the top of each stack is a position along a common scale, but the orange bug segment now begins at a different height in every quarter, so judging whether bugs rose requires comparing four floating lengths. Look at Q2 and Q4 in the stacked panel: bugs are 70 and 60, a 14 percent drop, and almost nobody reads that correctly off the stack. That is the whole trade-off in one figure.',
      },
      {
        language: 'python',
        title: 'Class imbalance in one bar chart',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(5)
labels = rng.choice([0, 1], size=50_000, p=[0.992, 0.008])
classes, counts = np.unique(labels, return_counts=True)
names = ["legitimate", "fraudulent"]

fig, (ax_lin, ax_log) = plt.subplots(1, 2, figsize=(10, 4), layout="constrained")

bars = ax_lin.bar(names, counts, color=["#8fa7b3", "#e76f51"])
ax_lin.bar_label(bars, fmt="{:,.0f}".format)
ax_lin.set_ylim(bottom=0)
ax_lin.set_ylabel("transactions")
ax_lin.set_title("Linear scale: the minority class is invisible")

bars_log = ax_log.bar(names, counts, color=["#8fa7b3", "#e76f51"])
ax_log.set_yscale("log")
ax_log.bar_label(bars_log, fmt="{:,.0f}".format)
ax_log.set_title("Log scale: both classes are readable")

fig.suptitle(f"Only {100 * counts[1] / counts.sum():.2f} percent of rows are fraud")
fig.savefig("class_balance.png", dpi=200)

print("counts:", dict(zip(names, counts)))
print("majority-class accuracy:", round(counts[0] / counts.sum(), 4))`,
        output: `counts: {'legitimate': 49604, 'fraudulent': 396}
majority-class accuracy: 0.9921`,
        explanation:
          'The left panel is a tall grey bar and a red bar so short it is barely thicker than the axis line — which is exactly the honest picture of a 0.79 percent positive rate, and precisely why this chart is worth drawing before training anything. The printed majority-class accuracy of 0.9921 is the number a useless model achieves by always predicting "legitimate". The right panel switches to a log y scale, where both bars are visible and the two orders of magnitude between them are legible as a gap rather than as an invisible sliver. Note the honest tension here: a log scale breaks the proportional-length property that makes bars trustworthy, so it is acceptable for reading two counts that differ by orders of magnitude, and not acceptable for inviting a length comparison. Showing both panels, as here, is the safest form.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Training curves in every ML experiment',
        usage:
          'Loss and accuracy against epoch are line charts because epochs are ordered and the reader wants the shape: where validation loss turns upward, whether the curves have flattened, whether more data would help.',
      },
      {
        context: 'Model comparison tables turned into a chart',
        usage:
          'Comparing six candidate models on one metric is a horizontal bar chart sorted by score, with a zero baseline and the metric ceiling shown, so a reviewer can see both the ranking and whether the differences are worth the extra complexity.',
      },
      {
        context: 'Revenue composition in a business review',
        usage:
          'Stacked bars by quarter split into product lines let an executive read total revenue off the top of each bar. The moment someone asks "how is product C doing?" the chart has to change, because product C is floating.',
      },
      {
        context: 'Class balance checks before training a classifier',
        usage:
          'A single bar chart of label counts is standard first-look practice. It determines whether accuracy is a meaningful metric, whether stratified splitting is required, and whether resampling or class weights are needed.',
      },
    ],

    projectConnections: [
      { tool: 'matplotlib', role: 'ax.plot, ax.bar, ax.barh and ax.bar_label are the four calls that cover almost every line and bar chart you will draw.' },
      { tool: 'pandas', role: 'df.plot(kind="bar", stacked=True, ax=ax) and value_counts().plot.barh() produce these charts directly from a DataFrame.' },
      { tool: 'seaborn', role: 'sns.barplot aggregates and draws confidence intervals by default; sns.countplot is the class-balance chart in one call.' },
      { tool: 'scikit-learn', role: 'Learning curves and validation curves are line charts; permutation feature importance is naturally a horizontal bar chart.' },
    ],

    commonMistakes: [
      {
        mistake: 'Truncating the y axis on a bar chart to make a small difference look large',
        why: 'A bar encodes value as length from the baseline, so moving the baseline breaks the proportionality that makes the comparison readable. Two values differing by 6 percent can be drawn to look four times different.',
        fix: 'Always set the bar value axis to start at zero. If the interesting variation is genuinely small, plot the differences themselves, or use a line or dot chart where a non-zero axis is legitimate.',
      },
      {
        mistake: 'Drawing a line chart over categories',
        why: 'The line segment between two categories claims that intermediate values exist and were passed through. There is no point halfway between "Brazil" and "Japan", so the mark asserts something false.',
        fix: 'Use bars, or a dot plot, for categorical x. Reserve lines for time, epochs, dose levels and other genuinely ordered continua.',
      },
      {
        mistake: 'Leaving categories in whatever order the dataframe happened to have',
        why: 'Arbitrary order forces the reader to scan every bar to answer "which is largest", which is the question a bar chart usually exists to answer.',
        fix: 'Sort by value when the question is a ranking. Keep the natural order only when the categories have one — months, sizes, deciles, or an experimental sequence.',
      },
      {
        mistake: 'Using stacked bars when the reader needs to compare a middle series',
        why: 'Only the bottom segment shares a baseline across categories. Every other segment floats, and judging unaligned lengths is substantially less accurate than judging positions on a common scale.',
        fix: 'Group instead, or plot that one series on its own, or draw the total as a line and the composition as a separate chart.',
      },
      {
        mistake: 'Rotating long category labels 90 degrees as a first resort',
        why: 'Vertical text is read several times more slowly than horizontal text, and a chart whose labels require a head tilt loses the immediacy that is the whole reason to draw a chart.',
        fix: 'Use ax.barh so the labels sit horizontally beside each bar. If you must stay vertical, rotate 45 degrees with ha="right", or abbreviate the categories and explain them in the caption.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why must a bar chart start at zero when a line chart does not have to?',
        answer:
          'Because the two marks encode the value differently. A bar encodes value as length measured from the baseline, and readers compare bars by taking ratios of lengths, so the encoding is only faithful when the baseline is zero — otherwise the ratio the eye reads is (v2 - b) / (v1 - b), which the author can inflate arbitrarily by sliding b upward. A line is read by its slope and shape, and slope is a difference between y values, so adding a constant offset to the axis leaves every slope unchanged. That is why a stock chart starting at 140 is perfectly honest while a bar chart starting at 140 is a well-known distortion technique.',
        followUp:
          'A strong answer mentions that the same logic bans a log scale on bars intended for length comparison, and that if the variation of interest is small the right move is to plot differences or use a dot plot.',
      },
      {
        level: 'intermediate',
        question: 'When would you choose stacked bars over grouped bars, and what do you give up?',
        answer:
          'Stacked bars when the primary question is about totals and the composition is secondary — quarterly revenue where the executive reads the total off the top of the bar and the split is context. You give up the ability to compare any series other than the bottom one across categories, because those segments no longer share a baseline, and comparing unaligned lengths is measurably less accurate than comparing positions on a common scale. Grouped bars are the choice when the reader must track one series across categories, at the cost of making totals hard to judge and getting crowded beyond three or four series. If both questions matter, the right answer is usually two charts: a line for the total and grouped bars for the composition.',
        followUp:
          'Mentioning 100 percent stacked bars as a third option — good for composition, actively misleading about totals, since a share can rise while the count falls — shows the candidate has thought about it.',
      },
      {
        level: 'ml-engineer',
        question: 'You are asked to visualise class counts for a dataset that is 99.2 percent negative. How do you do it honestly?',
        answer:
          'A plain linear bar chart is the honest picture and I would show it, because the minority bar being nearly invisible is precisely the finding: accuracy is a useless metric here and the model will need class weights, stratified splits and a precision-recall framing rather than ROC. For readability I would pair it with a second panel on a log y scale, or simply annotate both counts and the positive rate directly on the bars with bar_label. What I would avoid is a log scale on its own presented as the only picture, because a log scale destroys the proportional-length property that makes bars trustworthy, and a reader glancing at it may come away thinking the classes are within a factor of two.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Two products have satisfaction scores of 4.1 and 4.4 out of 5. Draw this as a bar chart with a zero baseline and describe what the reader sees. Then say what you would draw instead if the difference genuinely matters.',
        hint: 'Compute the ratio of the two bar lengths with a zero baseline and think about whether the eye can resolve it.',
        solution:
          'With a zero baseline the bars are 4.1 and 4.4 units tall, a ratio of 1.07, so they look almost identical — which is an accurate rendering of the fact that the two scores are close. The temptation is to set ylim to (4.0, 4.5), which makes the second bar look four times the first and is exactly the distortion this unit warns about.\n\nIf the difference matters, change what you plot rather than how you scale it. Plot the difference itself (0.3 with a confidence interval) as a single dot with error bars, or plot the full distribution of individual ratings as two histograms, which also shows whether the gap comes from a shift in the whole distribution or from a handful of one-star reviews. A dot plot with a non-zero axis is legitimate because a dot encodes position, not length.',
      },
      {
        prompt:
          'Write matplotlib code for a horizontal bar chart of the ten most frequent tokens in a corpus, sorted so the most frequent appears at the top, with counts labelled on each bar.',
        hint: 'barh draws the first element at the bottom, so sort ascending to get the largest on top. bar_label writes the values.',
        language: 'python',
        starterCode:
          'import matplotlib.pyplot as plt\nfrom collections import Counter\n\ncounts = Counter(corpus_tokens).most_common(10)\n# Build the horizontal bar chart here.\n',
        solution:
          'labels = [w for w, _ in counts][::-1]\nvalues = [c for _, c in counts][::-1]\n\nfig, ax = plt.subplots(figsize=(7, 4.5), layout="constrained")\nbars = ax.barh(labels, values, color="#2a9d8f", height=0.7)\nax.bar_label(bars, fmt="{:,.0f}".format, padding=3, fontsize=9)\nax.set_xlim(left=0)\nax.set_xlabel("occurrences in the corpus")\nax.set_title("The ten most frequent tokens account for most of the corpus mass")\nax.spines[["top", "right"]].set_visible(False)\nfig.savefig("top_tokens.png", dpi=200)\n\nThe [::-1] reversal is the detail people miss: barh places the first item at the bottom, so an ascending list puts the largest bar at the top where readers start. Horizontal bars are right here because tokens vary in length and some will be long. set_xlim(left=0) enforces the zero baseline explicitly rather than relying on matplotlib autoscaling, which usually but not always starts bars at zero.',
      },
      {
        prompt:
          'A dashboard shows monthly revenue as a stacked bar by region, and a manager asks "is EMEA growing?" Explain why the chart cannot answer that and propose a fix that keeps the totals visible.',
        hint: 'Where does the EMEA segment start in each month?',
        solution:
          'If EMEA is not the bottom segment, its rectangle starts at a different height every month because the regions below it change size. The reader must compare four or twelve floating lengths, which is one of the least accurate perceptual judgements there is — an EMEA segment can be shorter while sitting higher on the page and look larger.\n\nThe fix that keeps totals: draw the total as a line chart, and the regional breakdown as a small multiple — one mini line chart per region, sharing a y axis, arranged in a row. Each region then has its own zero baseline and its own trend is readable, while the total line answers the volume question. If a single chart is mandatory, put the series of interest at the bottom of the stack, and accept that only that one is comparable.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-003-q1',
        type: 'mcq',
        concept: 'chart choice',
        prompt: 'You have average test accuracy for five different model architectures. Which chart is appropriate?',
        options: [
          'A bar chart, because architectures are unordered categories being compared by magnitude',
          'A line chart, because accuracy is a continuous quantity',
          'A line chart, because there are five points to connect',
          'A pie chart, because the five accuracies form a whole',
        ],
        answerIndex: 0,
        explanation:
          'Architectures have no natural order, so a connecting line would assert continuity that does not exist. The reader is comparing five magnitudes, which is exactly what aligned bar lengths are for. A pie is wrong twice over: the accuracies are not parts of a whole and they do not sum to anything meaningful.',
      },
      {
        id: 'VIZ-003-q2',
        type: 'truefalse',
        concept: 'zero baseline',
        prompt: 'A line chart of a stock price is dishonest if its y axis does not start at zero.',
        answer: false,
        explanation:
          'A line is read by slope and shape, and slope is a difference, so shifting the axis leaves every slope unchanged. Starting at zero would often compress the entire variation into a sliver. The zero rule binds length encodings such as bars, not position-and-slope encodings such as lines.',
      },
      {
        id: 'VIZ-003-q3',
        type: 'numeric',
        concept: 'lie factor',
        prompt: 'Two bars represent 102 and 108 on an axis truncated to start at 100. The ratio of drawn lengths divided by the true ratio of values gives the distortion factor. What is the ratio of the drawn lengths?',
        answer: 4,
        tolerance: 0.01,
        explanation:
          'The drawn lengths are 108 - 100 = 8 and 102 - 100 = 2, a ratio of 4. The true ratio is 108 / 102 = 1.06, so the chart exaggerates the difference by roughly a factor of 3.8 — a textbook case of what Tufte called a high lie factor.',
      },
      {
        id: 'VIZ-003-q4',
        type: 'multi',
        concept: 'bar chart craft',
        prompt: 'Which of these improve a bar chart of ten categories with long names? Select all that apply.',
        options: [
          'Switching to horizontal bars with ax.barh',
          'Sorting the bars by value when the question is a ranking',
          'Rotating the labels 90 degrees so they fit',
          'Labelling each bar with its value using ax.bar_label',
          'Starting the value axis at the minimum value to use the space better',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Horizontal bars keep long labels horizontal and readable, sorting answers the ranking question directly, and bar labels remove the need to read values off ticks. Rotating 90 degrees makes text several times slower to read, and truncating the value axis breaks the proportionality that bars depend on.',
      },
      {
        id: 'VIZ-003-q5',
        type: 'code-output',
        language: 'python',
        concept: 'stacked bars',
        prompt: 'What are the four stack totals produced by this code?',
        code: 'import numpy as np\nbilling = np.array([120, 140, 150, 130])\nbugs = np.array([80, 70, 110, 60])\nfeatures = np.array([40, 50, 45, 60])\nprint(list(billing + bugs + features))',
        options: ['[240, 260, 305, 250]', '[240, 260, 300, 250]', '[200, 210, 260, 190]', '[120, 140, 150, 130]'],
        answerIndex: 0,
        explanation:
          'The stacked bar height is the sum of its segments: 240, 260, 305 and 250. This is the quantity a stacked chart makes easy to read, and it is the reason to stack at all — everything above the bottom segment becomes harder to compare in exchange.',
      },
      {
        id: 'VIZ-003-q6',
        type: 'explain',
        concept: 'grouped vs stacked',
        prompt: 'A colleague wants one chart showing both total support tickets per quarter and how bug reports changed. Explain why one stacked bar chart will not serve both purposes, and what you recommend.',
        rubric: [
          'Explains that only the bottom segment of a stack shares a common baseline',
          'Notes that comparing unaligned lengths is substantially less accurate for a reader',
          'Recommends a concrete alternative, such as grouped bars, two charts or a line for the total',
        ],
        sampleAnswer:
          'A stack answers the totals question well, because the top of each bar is a position on a common scale. It answers the bugs question badly, because the bug segment starts at a different height each quarter, so the reader is comparing floating lengths rather than positions from a shared baseline — a task people perform noticeably worse at. I would draw two things: a line chart of total tickets per quarter, which shows the rise into Q3 and the fall in Q4 clearly, and grouped bars for the three ticket types, where every bug bar starts at zero and the spike from 70 to 110 in Q3 is obvious at a glance. One chart per question is almost always cheaper than one chart that serves neither.',
        explanation:
          'The examinable idea is the shared-baseline property. Anyone who can say why the bottom segment is special, and can name a concrete alternative rather than just criticising, has understood the trade-off.',
      },
    ],

    flashcards: [
      { front: 'When is a line chart the right mark?', back: 'When the x axis has a meaningful order — time, epochs, dose — and the reader should follow a trend, a rate of change or a turning point.' },
      { front: 'Why must bars start at zero?', back: 'A bar encodes value as length from the baseline, so only a zero baseline makes the ratio of lengths equal the ratio of values.' },
      { front: 'Why are line charts exempt from the zero rule?', back: 'They are read by slope, and slope is a difference between y values, which is unchanged by shifting the axis.' },
      { front: 'Grouped or stacked bars?', back: 'Grouped when the reader compares a series across categories; stacked when the reader needs totals. Only the bottom stacked segment shares a baseline.' },
      { front: 'When should you use ax.barh?', back: 'When category names are long or numerous — horizontal bars keep labels horizontal and readable instead of rotated.' },
      { front: 'What does ax.bar_label do?', back: 'Writes each bar value next to the bar, so exact numbers are legible without reading them off the ticks and the grid can be faint.' },
      { front: 'What is the danger of a 100 percent stacked bar chart?', back: 'It hides totals completely, so a segment can grow as a share while the underlying count falls.' },
    ],

    challenge: {
      title: 'One dataset, four honest charts',
      brief:
        'Take a table of monthly sales for four product lines over two years. Produce a single figure containing four panels: (1) a line chart of the monthly total, (2) grouped bars comparing the four product lines for the most recent four months, (3) a sorted horizontal bar chart of total sales per product line over the whole period, and (4) a stacked bar chart by quarter. Every panel must be correctly labelled, every bar axis must start at zero, and each panel title must state a finding rather than naming the columns. In a short comment above each panel, write one sentence justifying why that mark was chosen for that question.',
      language: 'python',
      acceptanceCriteria: [
        'Four panels in one figure, laid out without overlapping or clipped text',
        'Every bar axis starts at zero and every axis is labelled with units',
        'The horizontal bar panel is sorted, with the largest value at the top',
        'Each panel title states a finding, not a column name',
        'A comment above each panel justifies the mark in terms of the question being asked',
      ],
      starterCode:
        'import numpy as np\nimport matplotlib.pyplot as plt\n\nrng = np.random.default_rng(1)\nmonths = np.arange(24)\nproducts = ["core", "pro", "teams", "enterprise"]\nsales = {p: rng.integers(40, 220, 24) for p in products}\n\nfig, axes = plt.subplots(2, 2, figsize=(12, 8), layout="constrained")\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone the difference between a line chart and a bar chart, and convince them that the zero-baseline rule is a matter of meaning rather than taste.',
      mustCover: [
        'A line chart requires a meaningfully ordered x axis; a bar chart is for unordered categories compared by magnitude',
        'A bar encodes value as length from a baseline, so the baseline must be zero for the comparison to be faithful',
        'A line is read by slope, which is unaffected by shifting the axis, so it is exempt',
        'Grouped versus stacked bars is decided by whether the reader compares series or totals',
      ],
      bonusSignals: [
        'gives a numeric example of the distortion from a truncated bar axis',
        'mentions horizontal bars and sorting for long or many categories',
        'notes that drawing a line over categories asserts values that do not exist',
      ],
      sampleExplanation:
        'These two charts answer different questions, and the mark itself carries a claim. A line drawn between two points says the quantity passed through everything in between, which is true for Monday to Tuesday and meaningless for France to Brazil — so lines are for ordered things like time and epochs, and bars are for separate categories you want to compare. Now the baseline. A bar says "this value is this long", and people compare bars by asking how many times longer one is than another. That reading is only correct if both bars start at zero. If you start the axis at 100 and draw 102 and 108, the drawn lengths are 2 and 8, so the second bar looks four times the first when it is really six percent bigger — and the author chose that factor by choosing where to start the axis. A line has no such problem, because you read it by how steeply it rises, and tilting the whole picture up or down does not change any slope. That is why a share-price chart starting at 140 is fine and a bar chart starting at 140 is a trick.',
    },
  },

  {
    id: 'VIZ-004',
    domain: 'VIZ',
    module: 'Distributions & Relationships',
    topic: 'Histograms, bin width and shape',
    title: 'Histograms and Distributions',
    slug: 'histograms-and-distributions',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['VIZ-002'],
    related: ['VIZ-001', 'VIZ-003'],
    tags: ['histogram', 'bin-width', 'kde', 'skew', 'modality', 'outliers', 'distribution'],

    learningObjectives: [
      'Build a histogram and explain precisely what the height and the width of each bar mean',
      'Demonstrate that bin width is a choice that changes the conclusion, and pick one using a defensible rule',
      'Read skew, modality, gaps, floors and ceilings off a distribution and say what each implies about the data',
      'Explain when a kernel density estimate helps and when its smoothing invents structure that is not there',
      'Say why reporting a mean without its distribution is misleading for skewed or multimodal data',
    ],

    terminology: [
      {
        term: 'Histogram',
        definition:
          'A chart of the distribution of one numeric variable, formed by partitioning its range into intervals and drawing a bar whose area is proportional to the number of observations falling in each interval.',
        simple: 'Chop the number line into buckets, count what lands in each, draw a bar for each bucket.',
      },
      {
        term: 'Bin',
        definition:
          'One interval of the partition, half-open by convention so that a value on a boundary belongs to exactly one bin. In matplotlib the last bin is closed on both sides.',
        simple: 'One bucket.',
      },
      {
        term: 'Bin width',
        definition:
          'The size of each interval. It is the single most consequential free parameter of a histogram: too wide erases structure, too narrow turns sampling noise into apparent structure.',
        simple: 'How wide each bucket is — the setting that decides what you think you can see.',
      },
      {
        term: 'Kernel density estimate (KDE)',
        definition:
          'A smooth estimate of a distribution formed by placing a small kernel, usually Gaussian, at every observation and summing them. Its bandwidth plays the same role as bin width.',
        simple: 'A smooth curve through the data instead of bars, with its own smoothing dial.',
      },
      {
        term: 'Skew',
        definition:
          'Asymmetry of a distribution. Right-skewed data has a long upper tail, which pulls the mean above the median; left-skewed data does the reverse.',
        simple: 'A lopsided distribution with a long tail on one side.',
      },
      {
        term: 'Modality',
        definition:
          'The number of distinct peaks. A single peak is unimodal; two peaks usually mean two populations have been mixed into one column.',
        simple: 'How many humps there are. Two humps usually means two different groups in one column.',
      },
    ],

    simpleExplanation:
      'A histogram answers one question: where do my numbers pile up? You take the whole range of a column, chop it into equal-width buckets, count how many values fall in each bucket, and draw a bar for each count. Tall bar means lots of values landed there. Short bar means few did. Nothing about a bar refers to an individual observation, which is the key difference between a histogram and a bar chart of categories: here the horizontal axis is a real number line and the bars touch, because the buckets are adjacent stretches of that line. Once you see the shape you know things no summary told you. One hump in the middle means most values cluster around a typical value. Two humps almost always mean two different kinds of thing have been mixed into one column. A long tail stretching right means a few very large values, which is why the average will sit to the right of where most of the data actually is. And a lonely bar out on its own is usually a data error rather than a customer. The one catch is that you chose the bucket width, and a different width can genuinely tell a different story, so a histogram is never quite a fact about your data alone.',

    whyItExists:
      'A column of ten thousand numbers cannot be read, and the summaries that fit on one line — mean, standard deviation — cannot express shape. The histogram exists as the cheapest complete rendering of a single variable: it shows every observation through the bucket it fell into, preserves modality, skew, gaps and outliers, and fits in a few square inches regardless of how many rows there are.',

    analogy: {
      scenario:
        "Picture a long corridor with a line of identical bins along one wall, each covering one metre of the corridor's length. Now roll ten thousand marbles down the corridor, each stopping wherever its value says it should, and let each marble drop into whichever bin it is over. Walk back along the wall and look at how full each bin is. You immediately see where the marbles piled up, whether they piled up in one place or two, and whether a handful rolled all the way to the far end. Now change the bins: replace every ten one-metre bins with a single ten-metre bin. Most of the detail disappears and you see only one broad heap. Replace them instead with ten-centimetre bins and each bin holds so few marbles that the run of bins looks jagged and random.",
      mapping: [
        { from: 'A marble rolling to its resting place', to: 'One observation at its numeric value' },
        { from: 'A bin covering one metre of corridor', to: 'A histogram bin of a given width' },
        { from: 'How full a bin is', to: 'The bar height: the count of observations in that interval' },
        { from: 'Two separate piles down the corridor', to: 'Bimodality — two populations mixed into one column' },
        { from: 'A few marbles at the far end', to: 'A long tail or isolated outliers' },
        { from: 'Swapping the bins for wider or narrower ones', to: 'Changing bin width, which changes what structure is visible' },
      ],
      bridge:
        'The corridor makes the central tension concrete: the marbles are the data and are fixed, but the bins are your instrument and the picture you get is the data as seen through that instrument. Widening the bins averages away real detail (bias); narrowing them means each bin holds few marbles and the count is dominated by chance (variance). Every rule of thumb for choosing a bin width — Sturges, Scott, Freedman-Diaconis — is a different answer to that bias-variance trade-off, which is the same trade-off you will meet again in model complexity.',
      limitations:
        'The corridor suggests bins are physically fixed, whereas a histogram also depends on where the first bin starts, not just how wide the bins are. Shifting all the boundaries by half a bin width can visibly change the shape, which is one reason a KDE, which has no boundaries at all, is sometimes preferred.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Reading a distribution: what each shape is telling you',
        caption: 'Read the shape first, then decide which summary statistic is honest for it.',
        columns: ['What you see', 'What it usually means', 'What to do next'],
        rows: [
          ['One symmetric hump', 'A single population with a typical value and noise around it', 'Mean and standard deviation describe it well'],
          ['A long right tail', 'Multiplicative processes: income, latency, file size, view counts', 'Report the median and percentiles; consider a log transform'],
          ['Two separate humps', 'Two populations mixed into one column', 'Find the variable that separates them and split, rather than modelling the mixture'],
          ['A tall spike at exactly one value', 'A default, an imputed value, or a floor such as zero spend', 'Check whether that value means "missing" and treat it separately'],
          ['A hard edge with nothing beyond it', 'Censoring or a cap imposed upstream', 'Find the cap; a model trained on capped data will not extrapolate past it'],
          ['An isolated bar far from everything', 'An outlier or a sentinel such as -999 or 9999', 'Investigate the rows before deleting them; they are often the most informative'],
          ['A comb of alternating tall and short bars', 'Rounding in the source data, or bin edges misaligned with a grid of integers', 'Align bin edges to the data grid, or widen the bins'],
        ],
      },
      {
        kind: 'compare',
        title: 'Histogram versus kernel density estimate',
        caption: 'They answer the same question with different failure modes. Showing both is common and sensible.',
        left: {
          heading: 'Histogram',
          points: [
            'Shows exactly what is in the data: every bar is a genuine count',
            'Honest about sample size — sparse regions look sparse',
            'Reveals spikes at single values, gaps and hard edges precisely',
            'Depends on bin width and on where the bins start',
            'Two histograms of different samples are hard to overlay and compare',
          ],
        },
        right: {
          heading: 'Kernel density estimate',
          points: [
            'Smooth, so several distributions can be overlaid legibly',
            'No bin-edge artefacts, since there are no edges',
            'Bandwidth plays exactly the same role as bin width, and is just as consequential',
            'Smooths across hard boundaries: puts density below zero for a non-negative quantity',
            'Can invent a smooth hump where the data has one spike, or erase a genuine spike entirely',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How a histogram is computed',
        caption: 'Knowing the steps explains every artefact you will ever see in one.',
        steps: [
          { label: 'Find the range', detail: 'Take the minimum and maximum of the data, or a range you specify explicitly.' },
          { label: 'Choose the number of bins', detail: 'Either a count you pass, a rule such as "fd" or "auto", or explicit edges you supply.' },
          { label: 'Compute the edges', detail: 'Equal-width intervals spanning the range. Every edge decision is a modelling decision.' },
          { label: 'Assign each value to a bin', detail: 'Bins are half-open, [lo, hi), so a value exactly on an edge falls in the upper bin — except the final bin, which is closed.' },
          { label: 'Count', detail: 'The bar height is the count, or the density if you normalise so the total area is one.' },
          { label: 'Draw adjacent bars', detail: 'Bars touch because the intervals are adjacent. A gap between bars means an empty bin, which is information.' },
        ],
      },
      {
        kind: 'table',
        title: 'Bin-width rules and when each is the right default',
        caption: 'NumPy and matplotlib accept these as strings: bins="fd", bins="sturges", bins="auto".',
        columns: ['Rule', 'Formula', 'Behaviour', 'Use when'],
        rows: [
          ['Sturges', 'k = ceil(log2 n) + 1', 'Bin count grows very slowly; badly under-bins large samples', 'Small, roughly normal samples — it assumes normality'],
          ['Scott', 'h = 3.49 s / n^(1/3)', 'Optimal for normal data; uses the standard deviation, so outliers widen every bin', 'Roughly symmetric data with no extreme values'],
          ['Freedman-Diaconis', 'h = 2 IQR / n^(1/3)', 'Uses the interquartile range, so it is robust to outliers', 'The sensible default for real, messy data'],
          ['NumPy "auto"', 'max of Sturges and Freedman-Diaconis', 'Takes the finer of the two, guarding both small and large n', 'When you do not want to think about it'],
          ['A round number you choose', 'e.g. width 5 for exam marks', 'Bins line up with meaningful units', 'When the variable has natural units readers think in'],
        ],
      },
      {
        kind: 'widget',
        title: 'Explore distribution shapes',
        caption: 'Change the shape and the spread, and watch how the mean and median move relative to each other.',
        widget: 'distribution-explorer',
      },
    ],

    formalDefinition:
      'A histogram is a piecewise-constant estimate of a probability density. Given bin edges e_0 < e_1 < ... < e_k, the estimate on bin j is the count of observations in [e_j, e_{j+1}) divided by n times the bin width, so that the total area equals one. Bin width controls a bias-variance trade-off: wide bins bias the estimate towards a flat density, narrow bins raise the variance of each bin count until sampling noise dominates.',

    math: {
      intuition:
        'Every bin count is really a small statistical estimate. If a bin covers a region holding a fraction p of the population, the observed count in a sample of n is binomial, with mean np and standard deviation the square root of n p (1 - p). Halve the bin width and you roughly halve p, so the expected count halves while its standard deviation falls only by the square root of two — meaning the relative noise gets worse. That is the precise sense in which narrow bins are noisy. Meanwhile, a wide bin averages the true density over its whole span, and if the density curves within the bin that average is biased. The optimal width balances squared bias against variance, and the classic rules are all closed-form solutions to that balance under different assumptions.',
      formulas: [
        {
          latex: '\\hat{f}(x) = \\frac{1}{n h}\\sum_{i=1}^{n} \\mathbf{1}\\!\\left[x_i \\in B(x)\\right]',
          name: 'Histogram density estimate',
          meaning:
            'The estimated density at x is the fraction of observations in the bin containing x, divided by the bin width. Dividing by h is what makes the area, rather than the height, represent probability.',
          variables: [
            { symbol: 'n', meaning: 'the number of observations' },
            { symbol: 'h', meaning: 'the bin width' },
            { symbol: 'B(x)', meaning: 'the bin containing the point x' },
            { symbol: '\\mathbf{1}[\\cdot]', meaning: 'the indicator, 1 when the condition holds and 0 otherwise' },
          ],
          category: 'statistics',
        },
        {
          latex: 'h_{FD} = 2\\,\\frac{\\mathrm{IQR}(x)}{n^{1/3}}',
          name: 'Freedman-Diaconis bin width',
          meaning:
            'The workhorse default. Because it uses the interquartile range rather than the standard deviation, a single extreme value cannot inflate every bin in the chart.',
          variables: [
            { symbol: '\\mathrm{IQR}(x)', meaning: 'the interquartile range, the 75th percentile minus the 25th' },
            { symbol: 'n', meaning: 'the sample size' },
            { symbol: 'h_{FD}', meaning: 'the recommended bin width' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\hat{f}_h(x) = \\frac{1}{nh}\\sum_{i=1}^{n} K\\!\\left(\\frac{x - x_i}{h}\\right)',
          name: 'Kernel density estimate',
          meaning:
            'A smooth density formed by placing a kernel K, usually a standard normal, at each observation and averaging. The bandwidth h is the KDE equivalent of bin width and controls the same trade-off.',
          variables: [
            { symbol: 'K', meaning: 'the kernel function, integrating to one' },
            { symbol: 'h', meaning: 'the bandwidth: larger means smoother' },
            { symbol: 'x_i', meaning: 'the i-th observation' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\text{skew} = \\frac{\\frac{1}{n}\\sum_i (x_i - \\bar{x})^3}{s^3}',
          name: 'Sample skewness',
          meaning:
            'A signed measure of asymmetry. Positive means a long right tail and a mean above the median; zero is consistent with symmetry but does not prove it.',
          variables: [
            { symbol: 's', meaning: 'the sample standard deviation' },
            { symbol: '\\bar{x}', meaning: 'the sample mean' },
            { symbol: '(x_i - \\bar{x})^3', meaning: 'the cubed deviation, which keeps its sign and weights far points heavily' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Treat the count in a bin as binomial with success probability p, the population mass in that bin.',
        'The mean count is n p and the variance is n p (1 - p), so the relative noise on a bin grows as bins get narrower and p shrinks.',
        'Within a bin, the estimate is flat, so if the true density curves there the estimate is biased by an amount growing with bin width.',
        'The mean integrated squared error decomposes into a bias term proportional to h squared and a variance term proportional to 1 / (n h).',
        'Minimising the sum gives an optimal width proportional to n to the power minus one third — the exponent shared by both Scott and Freedman-Diaconis.',
      ],
    },

    workedExample: {
      title: 'Choosing a bin width for 1,000 response times',
      setup:
        'A sample of 1,000 API response times in milliseconds has a 25th percentile of 46, a median of 68, a 75th percentile of 112, a maximum of 4,900 and a standard deviation of 260. We will compute each rule and see which survives contact with the outliers.',
      steps: [
        {
          label: "Sturges' rule",
          detail:
            'k = ceil(log2 1000) + 1 = ceil(9.97) + 1 = 11 bins. Spread over a range of roughly 4,900 ms that gives bins about 445 ms wide, which would collapse the entire main body of the data into the first bin.',
          latex: 'k = \\lceil \\log_2 1000 \\rceil + 1 = 11',
        },
        {
          label: "Scott's rule",
          detail:
            'h = 3.49 x 260 / 1000^(1/3) = 907 / 10 = 90.7 ms. Better, but the standard deviation of 260 is itself inflated by the 4,900 ms tail, so the outliers have widened every bin in the chart including the ones describing the bulk.',
          latex: 'h_{Scott} = \\frac{3.49 \\times 260}{10} \\approx 90.7',
        },
        {
          label: 'Freedman-Diaconis',
          detail:
            'IQR = 112 - 46 = 66 ms, so h = 2 x 66 / 10 = 13.2 ms. The IQR ignores the tail entirely, so the bin width is set by the part of the distribution that most observations live in. This is why it is the sensible default for real data.',
          latex: 'h_{FD} = \\frac{2 \\times 66}{10} = 13.2',
        },
        {
          label: 'What 13.2 ms bins imply for the range',
          detail:
            'Covering 0 to 4,900 ms at 13.2 ms per bin needs about 371 bins, most of which will be empty. That is a signal, not a failure: it tells you the tail should be handled separately.',
        },
        {
          label: 'The practical resolution',
          detail:
            'Plot the main body with explicit range=(0, 400) and roughly 30 bins of 13 ms, state in the title that 2.4 percent of requests exceed 400 ms, and put the full range on a log x axis in a second panel. Never silently drop the tail — for latency the tail is the product.',
        },
      ],
      conclusion:
        'The rules disagree by a factor of nearly seventy on this data, which is the honest answer to "what bin width should I use": it depends on what you are asking. Freedman-Diaconis is the right default because it is robust to the tail, and a heavy tail is a reason to draw two panels rather than to compromise on one.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The same data, four bin widths, four different conclusions',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(17)
# A genuine mixture: two customer segments.
data = np.concatenate([rng.normal(42, 6, 600), rng.normal(70, 7, 400)])

fig, axes = plt.subplots(1, 4, figsize=(15, 3.6), sharey=False, layout="constrained")
for ax, n_bins in zip(axes, [3, 12, 45, 400]):
    ax.hist(data, bins=n_bins, color="#2a9d8f", edgecolor="white", linewidth=0.4)
    ax.set_title(f"bins = {n_bins}")
    ax.set_xlabel("value")
axes[0].set_ylabel("count")
fig.suptitle("One dataset, four bin counts: only the middle two show the truth")
fig.savefig("bin_width.png", dpi=200)

q75, q25 = np.percentile(data, [75, 25])
h_fd = 2 * (q75 - q25) / len(data) ** (1 / 3)
h_scott = 3.49 * data.std(ddof=1) / len(data) ** (1 / 3)
k_sturges = int(np.ceil(np.log2(len(data)))) + 1

print(f"Freedman-Diaconis width: {h_fd:.2f} -> {int(np.ptp(data) / h_fd)} bins")
print(f"Scott width:             {h_scott:.2f} -> {int(np.ptp(data) / h_scott)} bins")
print(f"Sturges:                 {k_sturges} bins")
print(f"numpy auto:              {len(np.histogram_bin_edges(data, bins='auto')) - 1} bins")`,
        output: `Freedman-Diaconis width: 1.92 -> 30 bins
Scott width:             4.83 -> 12 bins
Sturges:                 11 bins
numpy auto:              30 bins`,
        explanation:
          'Four panels of the same 1,000 numbers. With three bins you see a single lumpy mound and would confidently report one population with a mean around 53 — a value almost no customer is near. With twelve bins the second hump starts to emerge as a shoulder. With forty-five bins the two peaks near 42 and 70 are unmistakable and the valley between them is clean. With four hundred bins each bin holds two or three points, and the picture dissolves into a picket fence of noise where you can no longer tell a real dip from an empty bin. This is the bias-variance trade-off made visible, and it is why bin count is never a cosmetic setting. Note also that Scott and Sturges both under-bin here because they assume a single normal hump, which is exactly the assumption the data violates.',
      },
      {
        language: 'python',
        title: 'Skew, and why the mean stops describing the data',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(23)
salary = rng.lognormal(mean=10.8, sigma=0.55, size=5000)

mean, median = salary.mean(), np.median(salary)
p90, p99 = np.percentile(salary, [90, 99])
skew = float(((salary - mean) ** 3).mean() / salary.std(ddof=1) ** 3)

fig, (ax_raw, ax_log) = plt.subplots(1, 2, figsize=(11.5, 4.2), layout="constrained")

ax_raw.hist(salary, bins="fd", color="#8fa7b3", edgecolor="white", linewidth=0.3)
ax_raw.axvline(median, color="#2a9d8f", linewidth=2, label=f"median = {median:,.0f}")
ax_raw.axvline(mean, color="#e76f51", linewidth=2, label=f"mean   = {mean:,.0f}")
ax_raw.set_xlabel("salary")
ax_raw.set_ylabel("employees")
ax_raw.set_title(f"Right-skewed: skewness = {skew:.2f}")
ax_raw.legend(frameon=False)

ax_log.hist(np.log10(salary), bins="fd", color="#8fa7b3", edgecolor="white", linewidth=0.3)
ax_log.set_xlabel("log10(salary)")
ax_log.set_title("After a log transform: symmetric")

fig.suptitle("The mean sits above the median and above most employees")
fig.savefig("skew.png", dpi=200)

below_mean = (salary < mean).mean()
print(f"median {median:,.0f} | mean {mean:,.0f} | p90 {p90:,.0f} | p99 {p99:,.0f}")
print(f"fraction of employees earning below the mean: {below_mean:.1%}")`,
        output: `median 49,021 | mean 57,067 | p90 99,264 | p99 176,857
fraction of employees earning below the mean: 63.0%`,
        explanation:
          'The left panel rises steeply to a peak just under 50,000 and then trails off to the right with a long thin tail reaching past 200,000. Two vertical lines mark the median and the mean, and crucially the orange mean line sits visibly to the right of the teal median line — that gap is what right skew looks like. The printed line that matters is the last one: 63 percent of employees earn less than the mean, so "the average salary" describes nobody in particular and flatters the typical employee by about 16 percent. The right panel shows the same data after a base-10 log transform and is a clean symmetric bell, which is the defining property of a log-normal and the reason a log transform is the standard first move for salary, income, latency, file sizes and view counts.',
      },
      {
        language: 'python',
        title: 'KDE: what smoothing gives you and what it hides',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import gaussian_kde

rng = np.random.default_rng(31)
# 30 percent of accounts spend exactly zero; the rest are log-normal.
spend = np.where(rng.random(2000) < 0.30, 0.0, rng.lognormal(3.2, 0.7, 2000))

grid = np.linspace(-20, 120, 600)
fig, (ax_hist, ax_kde) = plt.subplots(1, 2, figsize=(11.5, 4.2), layout="constrained")

ax_hist.hist(spend, bins=60, range=(0, 120), color="#264653", edgecolor="white", linewidth=0.3)
ax_hist.set_title("Histogram: the zero spike is unmissable")
ax_hist.set_xlabel("monthly spend")
ax_hist.set_ylabel("accounts")

for bw, colour in [(0.15, "#2a9d8f"), (0.5, "#e9c46a"), (1.2, "#e76f51")]:
    kde = gaussian_kde(spend, bw_method=bw)
    ax_kde.plot(grid, kde(grid), color=colour, linewidth=2, label=f"bandwidth = {bw}")
ax_kde.axvline(0, color="grey", linewidth=1, linestyle=":")
ax_kde.set_title("KDE: smoothing leaks density below zero")
ax_kde.set_xlabel("monthly spend")
ax_kde.set_ylabel("density")
ax_kde.legend(frameon=False)

fig.savefig("kde_vs_hist.png", dpi=200)

print("exact zeros:", int((spend == 0).sum()), "of", spend.size)
print("KDE mass below zero at bw=0.5:", round(float(gaussian_kde(spend, bw_method=0.5).integrate_box_1d(-50, 0)), 3))`,
        output: `exact zeros: 596 of 2000
KDE mass below zero at bw=0.5: 0.161`,
        explanation:
          'The left panel has one enormous bar at zero, roughly three times the height of anything else, followed by a right-skewed hump between about 10 and 60 — an honest picture of a dataset where 30 percent of accounts spend nothing at all. The right panel shows the same data as three KDE curves. All three replace the zero spike with a smooth mound, and all three place visible density to the left of the dotted line at zero, which is impossible: nobody spends negative money. The printed figure quantifies it — at a bandwidth of 0.5, 16 percent of the estimated probability mass sits below zero. The narrowest bandwidth is spiky and the widest has smoothed the two features into one broad blob. The lesson is not that KDEs are bad; it is that a KDE assumes a smooth unbounded density, so it misleads at hard boundaries and at point masses. Draw the histogram first, and use the KDE when you need to overlay several groups.',
      },
      {
        language: 'python',
        title: 'Feature distributions before and after scaling',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler, RobustScaler

rng = np.random.default_rng(9)
X = np.column_stack([
    rng.normal(38, 11, 3000),                       # age
    rng.lognormal(3.4, 0.6, 3000),                  # income, skewed
    np.concatenate([rng.normal(5, 1, 2990), rng.normal(900, 5, 10)]),  # sensor with 10 bad reads
])
names = ["age", "income", "sensor"]

standard = StandardScaler().fit_transform(X)
robust = RobustScaler().fit_transform(X)

fig, axes = plt.subplots(3, 3, figsize=(12, 8), layout="constrained")
for row, (matrix, label) in enumerate([(X, "raw"), (standard, "StandardScaler"), (robust, "RobustScaler")]):
    for col in range(3):
        ax = axes[row, col]
        ax.hist(matrix[:, col], bins=50, color="#2a9d8f", edgecolor="white", linewidth=0.3)
        if row == 0:
            ax.set_title(names[col])
        if col == 0:
            ax.set_ylabel(label)
fig.suptitle("Scaling changes location and spread; it never changes shape", fontsize=13)
fig.savefig("scaling.png", dpi=200)

for name, col in zip(names, range(3)):
    print(f"{name:>7}  raw mean {X[:, col].mean():8.2f}  raw sd {X[:, col].std():8.2f}  "
          f"standardised sd {standard[:, col].std():.2f}")`,
        output: `    age  raw mean    37.96  raw sd    11.02  standardised sd 1.00
 income  raw mean    35.86  raw sd    23.54  standardised sd 1.00
 sensor  raw mean     7.98  raw sd    51.60  standardised sd 1.00`,
        explanation:
          'A three-by-three grid, one column per feature and one row per scaling treatment. The top row is the raw data: a symmetric bell for age, a right-skewed hump for income, and a sensor column that looks like a single bar at the far left because ten bad readings near 900 have stretched the axis. The middle row shows StandardScaler output. Every column is now centred near zero with unit standard deviation, and this is the row that teaches the lesson: the income column is still skewed and the sensor column is still a spike plus a far outlier, because subtracting a mean and dividing by a standard deviation is an affine map and affine maps cannot change shape. Worse, for the sensor column the standard deviation of 51.6 is almost entirely produced by the ten outliers, so the 2,990 good readings get squeezed into a sliver near -0.06. The bottom row uses RobustScaler, which centres on the median and divides by the IQR, so the good readings spread out legibly and the outliers stay visible as outliers. Plotting before and after is how you catch this; a scaler that reports mean 0 and sd 1 will always report mean 0 and sd 1.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The first pass over any new dataset',
        usage:
          'df.hist(figsize=(14, 10), bins=50) draws every numeric column at once. This single call routinely finds sentinel values, columns that are 95 percent zero, columns capped by an upstream system and columns whose skew demands a log transform.',
      },
      {
        context: 'Latency monitoring in production',
        usage:
          'Response-time distributions are heavy-tailed, so teams plot histograms on a log axis and report p50, p95 and p99 rather than a mean. A mean latency dashboard is the classic way to be unaware that five percent of users are having a bad time.',
      },
      {
        context: 'Checking a feature after preprocessing',
        usage:
          'Plotting each feature before and after scaling catches a scaler fitted on the test set, a column that was already normalised upstream, and columns where a handful of outliers dominate the standard deviation and crush everything else towards zero.',
      },
      {
        context: 'Detecting data drift in a deployed model',
        usage:
          'Overlaying the training-time distribution of a feature with last week distribution is how drift is spotted visually before a statistical test is run. A new spike or a shifted mode usually means an upstream schema or unit change.',
      },
    ],

    projectConnections: [
      { tool: 'matplotlib', role: 'ax.hist with bins="fd" and an explicit range is the workhorse; density=True switches from counts to a density that integrates to one.' },
      { tool: 'NumPy', role: 'np.histogram and np.histogram_bin_edges compute counts and edges without drawing, which is how you compare bin rules numerically.' },
      { tool: 'pandas', role: 'df.hist() plots every numeric column at once; Series.describe() and .quantile() give the numbers to annotate on the chart.' },
      { tool: 'seaborn', role: 'sns.histplot adds kde=True and hue= for overlaying groups; sns.displot builds a grid of distributions by category.' },
      { tool: 'scikit-learn', role: 'StandardScaler, RobustScaler, QuantileTransformer and PowerTransformer all change a distribution, and a histogram is how you verify which one you actually needed.' },
    ],

    commonMistakes: [
      {
        mistake: 'Leaving bins at the matplotlib default of 10',
        why: 'Ten bins is far too coarse for anything above a few hundred points, and it reliably hides bimodality by merging two peaks into one broad mound.',
        fix: 'Pass bins="fd" or bins="auto" so the width is computed from the data, and always look at a second bin count before concluding anything about shape.',
      },
      {
        mistake: 'Reporting a mean for a skewed or bimodal column',
        why: 'The mean is the balance point, so a long right tail drags it away from where most observations are. In the salary example 63 percent of employees earn below the mean.',
        fix: 'Draw the histogram first. For right-skewed data report the median with an interquartile range or specific percentiles; for bimodal data find the variable that separates the modes and report each group.',
      },
      {
        mistake: 'Trusting a KDE near a hard boundary',
        why: 'A Gaussian kernel has infinite support, so it spreads mass past any boundary. A KDE of non-negative spend puts real probability mass below zero, and it smooths a point mass at zero into a mound.',
        fix: 'Use a histogram when the variable has a floor, a ceiling or a point mass. If you need a smooth curve, use a reflected or beta kernel, or estimate the density of the log.',
      },
      {
        mistake: 'Cropping the x axis to hide outliers without saying so',
        why: 'Setting range=(0, 100) on data that reaches 4,900 silently discards rows from the chart, and readers assume a histogram shows everything.',
        fix: 'Crop deliberately when it aids readability, then state it: put "2.4 percent of requests exceed 400 ms" in the title, or add a second panel on a log axis.',
      },
      {
        mistake: 'Comparing two histograms drawn with different bins or different sample sizes',
        why: 'Different bin edges change the shape, and raw counts scale with n, so a larger group looks like a taller distribution rather than a different one.',
        fix: 'Share explicit bin edges between the two, and use density=True or stat="probability" so the areas are comparable rather than the counts.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What does bin width control in a histogram, and how would you choose it?',
        answer:
          'Bin width decides how much detail survives. Wide bins average the density over a large span, which biases the picture towards flatness and can merge two genuine peaks into one; narrow bins put few observations in each bin, so the counts are dominated by sampling noise and the chart becomes a picket fence where real dips and empty bins are indistinguishable. It is a bias-variance trade-off with the same shape as model complexity. In practice I use Freedman-Diaconis, h = 2 IQR / n^(1/3), because it derives the width from the interquartile range and is therefore robust to outliers, whereas Scott rule uses the standard deviation and Sturges assumes normality and badly under-bins large samples. Whatever rule I start from, I look at two or three bin counts before believing any feature of the shape.',
        followUp:
          'A strong answer mentions that the shape also depends on where the bins start, not only how wide they are, and that this is one motivation for a KDE.',
      },
      {
        level: 'intermediate',
        question: 'You see two clear peaks in a feature histogram. What do you do?',
        answer:
          'Two peaks almost always means two populations have been mixed into one column, so the first move is to find the variable that separates them rather than to model the mixture. I would colour or facet the histogram by each plausible grouping variable — account type, device, country, data-source, time period before and after a release — until one of them splits the distribution into two clean unimodal pieces. Very often the separator turns out to be a data-collection artefact, such as two upstream systems reporting in different units, in which case the finding is a bug rather than a feature. If the mixture is genuine and no available variable separates it, that is itself important: it means a single mean is not a useful summary, a linear model will fit the gap between the modes where no data lives, and a tree-based model or an explicit mixture may be more appropriate.',
        followUp:
          'A strong answer notes the check that the peaks are not an artefact of bin width or bin alignment, by re-drawing with a couple of different bin counts.',
      },
      {
        level: 'ml-engineer',
        question: 'Why plot feature distributions before and after scaling, when the scaler guarantees mean zero and unit variance?',
        answer:
          'Because the guarantee is about two moments and the problems are about shape. StandardScaler is an affine transform, so it cannot remove skew, cannot remove a point mass at zero and cannot make a bimodal column unimodal — it only moves and rescales them. More importantly, the standard deviation it divides by can be dominated by a handful of outliers, in which case every real observation is compressed into a narrow band near zero and the feature becomes effectively constant to any distance-based or gradient-based model. The before-and-after plot is also how you catch operational errors that the summary statistics will happily hide: a scaler fitted on the full dataset including the test split, a column that an upstream job had already normalised, or a unit change that arrived with new data. I would look at the plots and, if the tail dominates, switch to RobustScaler, QuantileTransformer or a log transform depending on whether I need the shape preserved.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A dataset of 8,000 page-load times has 25th percentile 0.9 s, median 1.4 s, 75th percentile 2.6 s and maximum 41 s. Compute the Freedman-Diaconis bin width and say how you would actually draw this distribution.',
        hint: 'h = 2 IQR / n^(1/3). Then think about how many of those bins the tail would occupy.',
        solution:
          'IQR = 2.6 - 0.9 = 1.7 s, and 8000^(1/3) = 20, so h = 2 x 1.7 / 20 = 0.17 s. Covering 0 to 41 s at 0.17 s per bin needs about 241 bins, the vast majority of them empty or holding a single observation.\n\nThat calculation is the finding: the distribution is heavy-tailed and one panel cannot serve both parts of it. I would draw the main body with range=(0, 8) and about 47 bins of 0.17 s, stating in the title what fraction of loads exceed 8 seconds, and add a second panel of the full range with a log x axis where the tail is legible. I would also report p50, p90 and p99 rather than a mean, because with a maximum of 41 s the mean is being set by the slowest few percent of loads.',
      },
      {
        prompt:
          'Write code that overlays the distribution of one feature for two classes in a way that is fair even though the classes have very different sizes.',
        hint: 'Raw counts scale with n. What makes two histograms comparable when one group has ten times more rows?',
        language: 'python',
        starterCode:
          'import numpy as np\nimport matplotlib.pyplot as plt\n\nrng = np.random.default_rng(4)\nmajority = rng.normal(50, 12, 9000)\nminority = rng.normal(62, 14, 700)\n# Overlay these two fairly.\n',
        solution:
          'edges = np.histogram_bin_edges(np.concatenate([majority, minority]), bins="fd")\n\nfig, ax = plt.subplots(figsize=(7.5, 4.2), layout="constrained")\nax.hist(majority, bins=edges, density=True, alpha=0.55, label=f"class 0 (n={majority.size:,})", color="#8fa7b3")\nax.hist(minority, bins=edges, density=True, alpha=0.55, label=f"class 1 (n={minority.size:,})", color="#e76f51")\nax.set_xlabel("feature value")\nax.set_ylabel("density")\nax.set_title("Class 1 sits about 12 units higher, with a wider spread")\nax.legend(frameon=False)\n\nTwo things make this fair. First, both histograms use the same explicit bin edges, computed once from the combined data — different edges would change the shapes independently and make any comparison meaningless. Second, density=True normalises each histogram to unit area, so the shapes are comparable even though one class has thirteen times more rows; with raw counts the minority class would be an almost invisible strip along the axis. Putting the sample sizes in the legend keeps the normalisation honest, since a density plot on its own hides how little data the minority curve rests on.',
      },
      {
        prompt:
          'A histogram of exam marks out of 100 shows an unusually tall bar exactly at 40, the pass mark, and a dip just below it. What are you looking at, and how would you confirm it?',
        hint: 'Think about who has the power to change a mark and what incentive they have near a threshold.',
        solution:
          'This is a classic threshold artefact: marks just below a pass boundary are being rounded, re-checked or nudged upward, so mass is moved from the 36 to 39 range into 40. The visual signature is a deficit immediately below the threshold and a spike on it, which is exactly what the histogram shows.\n\nTo confirm it, zoom into the 30 to 50 range with bin width 1 so each integer mark is its own bin — the deficit and spike become unambiguous at that resolution. Then compare the observed counts at 36 to 39 with a smooth fit through the surrounding marks, and check whether the effect appears in every cohort or only in some. The same technique detects rounding in self-reported ages at multiples of five, price points at 99, and reported latencies capped at a timeout value. The general lesson is that spikes and gaps at round or meaningful numbers are almost always about the process that recorded the data rather than the quantity being measured.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-004-q1',
        type: 'mcq',
        concept: 'bin width',
        prompt: 'What is the main risk of using too few bins in a histogram?',
        options: [
          'Genuine structure such as bimodality is averaged away and the distribution looks like one smooth hump',
          'Each bar becomes dominated by sampling noise',
          'The total area under the histogram stops equalling one',
          'Outliers are excluded from the chart',
        ],
        answerIndex: 0,
        explanation:
          'Wide bins average the density over a large span, which biases the estimate towards flatness and merges nearby peaks. Noise-dominated bars are the opposite failure, caused by too many bins. Both are sides of the same bias-variance trade-off.',
      },
      {
        id: 'VIZ-004-q2',
        type: 'numeric',
        concept: 'freedman-diaconis',
        prompt: 'A sample of 1,000 values has an interquartile range of 20. What bin width does the Freedman-Diaconis rule recommend?',
        answer: 4,
        tolerance: 0.01,
        explanation:
          'h = 2 x IQR / n^(1/3) = 2 x 20 / 10 = 4. The cube root of 1,000 is 10, so the arithmetic is unusually clean here. Using the IQR rather than the standard deviation is what makes this rule robust to a few extreme values.',
      },
      {
        id: 'VIZ-004-q3',
        type: 'truefalse',
        concept: 'scaling and shape',
        prompt: 'Applying StandardScaler to a right-skewed feature makes its distribution symmetric.',
        answer: false,
        explanation:
          'StandardScaler subtracts the mean and divides by the standard deviation, which is an affine map. Affine maps shift and rescale but cannot change shape, so the skew survives exactly. To change shape you need a log, a power transform or a quantile transform.',
      },
      {
        id: 'VIZ-004-q4',
        type: 'multi',
        concept: 'reading distributions',
        prompt: 'A histogram shows a tall isolated bar at zero and a right-skewed hump to its right. Which conclusions are reasonable? Select all that apply.',
        options: [
          'A substantial share of observations are exactly zero, possibly a different behaviour from the rest',
          'A KDE of this column would place probability mass below zero',
          'The mean will sit to the right of the median',
          'The zero bar proves the data contains an error',
          'Reporting only the mean would describe this column well',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'A point mass at zero, a Gaussian kernel leaking past a hard boundary, and a right tail pulling the mean above the median are all correct readings. Zeros are often perfectly genuine — accounts that spent nothing — and a single mean cannot describe a distribution with a point mass plus a skewed hump.',
      },
      {
        id: 'VIZ-004-q5',
        type: 'code-output',
        language: 'python',
        concept: 'bin membership',
        prompt: 'What does this print?',
        code: "import numpy as np\ncounts, edges = np.histogram([1, 2, 2, 3, 4, 5], bins=[1, 3, 5])\nprint(list(counts))",
        options: ['[3, 3]', '[4, 2]', '[3, 2]', '[2, 4]'],
        answerIndex: 0,
        explanation:
          'Bins are half-open, so [1, 3) catches 1, 2 and 2 — three values — and the final bin [3, 5] is closed on both sides, catching 3, 4 and 5. That closed final bin is a frequent surprise: the maximum value is never dropped.',
      },
      {
        id: 'VIZ-004-q6',
        type: 'explain',
        concept: 'mean versus distribution',
        prompt: 'A report states "average customer spend is 57 dollars". Explain what you would need to see before trusting that as a description of customers, and what shapes would make it misleading.',
        rubric: [
          'Asks for the distribution, not just more precision on the mean',
          'Names at least two shapes that break the mean: right skew, bimodality, a point mass at zero',
          'Proposes a concrete better summary such as median with percentiles, or splitting the groups',
        ],
        sampleAnswer:
          'I would want the histogram before I would repeat that number. If spend is right-skewed, which it usually is, a small number of large accounts pulls the mean above where most customers are — in a typical log-normal, around 60 to 65 percent of customers fall below the mean. If there is a spike at zero because many accounts spent nothing, the mean is a blend of "customers who buy" and "customers who do not", describing neither. And if the histogram has two humps, the column is mixing consumer and enterprise accounts and the right answer is two numbers, not one. What I would report instead is the median with the 25th and 75th percentiles, the share of accounts at zero, and separate figures per segment if the distribution is bimodal.',
        explanation:
          'A strong answer treats the mean as a hypothesis about shape rather than a fact, names the specific shapes that break it, and offers a concrete replacement summary.',
      },
    ],

    flashcards: [
      { front: 'What does the height of a histogram bar represent?', back: 'The count of observations whose value falls in that bin (or the density, if normalised so the total area is one). It never refers to a single observation.' },
      { front: 'Freedman-Diaconis bin width', back: 'h = 2 x IQR / n^(1/3). It uses the interquartile range, so a few extreme values cannot widen every bin.' },
      { front: 'What does bimodality usually mean?', back: 'Two populations have been mixed into one column. Find the variable that separates them and split, rather than modelling the mixture.' },
      { front: 'Where does the mean sit in a right-skewed distribution?', back: 'To the right of the median, pulled by the long upper tail — so most observations fall below the mean.' },
      { front: 'When does a KDE mislead?', back: 'At hard boundaries and point masses: a Gaussian kernel puts density below zero for a non-negative quantity and smooths a spike into a mound.' },
      { front: 'Why compare histograms with density=True?', back: 'Raw counts scale with sample size, so two groups of different sizes are not comparable. Normalising to unit area compares shapes instead.' },
      { front: 'Can StandardScaler fix skew?', back: 'No. It is an affine transform, so it changes location and spread but never shape. Use a log, power or quantile transform for that.' },
    ],

    challenge: {
      title: 'A distribution report that chooses its own bins',
      brief:
        'Write profile_distribution(values, name) that produces a two-panel figure and a printed summary for any numeric column. The left panel is a histogram using Freedman-Diaconis bins, cropped to the 0.5th to 99.5th percentile with the cropped fraction stated in the title, and with vertical lines at the median and mean. The right panel shows the same data on a log axis if all values are positive and the skewness exceeds 1, and otherwise shows the empirical cumulative distribution. The printed summary reports n, the count of exact zeros, the count outside the crop, the median, the mean, p90, p99 and the skewness, and prints one sentence of interpretation chosen by rule: which shape was detected and which summary statistic should be reported.',
      language: 'python',
      acceptanceCriteria: [
        'Bin width is computed with Freedman-Diaconis rather than hard-coded',
        'The cropped fraction is stated on the chart, never silently dropped',
        'The second panel switches between log-scale and ECDF based on a stated rule',
        'The printed summary includes zeros, percentiles and skewness',
        'The interpretation sentence names the detected shape and recommends a summary statistic',
      ],
      starterCode:
        'import numpy as np\nimport matplotlib.pyplot as plt\n\n\ndef profile_distribution(values, name):\n    values = np.asarray(values, dtype=float)\n    q25, q75 = np.percentile(values, [25, 75])\n    h_fd = 2 * (q75 - q25) / values.size ** (1 / 3)\n    # Build the two panels and the printed summary here.\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone what a histogram is, then convince them that the bin width is a real decision with real consequences rather than a cosmetic setting.',
      mustCover: [
        'A histogram partitions the number line into bins and draws the count in each, so bars touch and the x axis is numeric',
        'Bin width too wide erases structure; too narrow turns sampling noise into apparent structure',
        'Shape features to read off: skew, modality, spikes, hard edges, isolated outliers',
        'Why a mean alone is misleading for skewed or bimodal data',
      ],
      bonusSignals: [
        'names a bin-width rule such as Freedman-Diaconis and why it uses the IQR',
        'mentions that the picture also depends on where the bins start',
        'mentions KDE bandwidth as the same trade-off in a smooth form',
      ],
      sampleExplanation:
        'A histogram asks where your numbers pile up. Chop the number line into equal buckets, count how many values land in each, draw a bar for each count. Because the buckets are adjacent stretches of a real number line, the bars touch — that is what distinguishes it from a bar chart of categories, where the gaps are meaningful. Now the part people skip. You chose the bucket width, and that choice changes the picture. Make the buckets very wide and everything averages into one smooth mound, so two genuinely separate groups of customers merge into a single fictional average customer. Make them very narrow and each bucket holds two or three points, so what you are looking at is mostly the luck of which values happened to land where. The honest procedure is to compute a width from the data — Freedman-Diaconis, two times the interquartile range divided by the cube root of n, is the standard choice because it ignores outliers — and then to look at a couple of other widths before you believe any bump you see. Once you trust the shape, read it: a long right tail means the mean sits above most of your data, two humps mean you have two populations in one column, and a lonely bar far from everything is usually a data error rather than a customer.',
    },
  },

  {
    id: 'VIZ-005',
    domain: 'VIZ',
    module: 'Distributions & Relationships',
    topic: 'Scatter plots, correlation and overplotting',
    title: 'Scatter Plots and Correlation',
    slug: 'scatter-plots-and-correlation',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['VIZ-002', 'VIZ-004'],
    related: ['VIZ-001', 'VIZ-004'],
    tags: ['scatter', 'correlation', 'pearson', 'spearman', 'overplotting', 'hexbin', 'causation'],

    learningObjectives: [
      'Read a scatter plot for four separate things: direction, form, strength and unusual observations',
      'State what Pearson correlation measures, what it cannot measure, and why it must be shown next to the picture',
      'Diagnose overplotting and fix it with transparency, sampling, hexbin or a two-dimensional density',
      'Explain concretely why correlation does not establish causation, naming confounding, reverse causation and selection',
      'Use a residual plot to check whether a fitted relationship has captured the structure in a scatter',
    ],

    terminology: [
      {
        term: 'Scatter plot',
        definition:
          'A chart placing one mark per observation at coordinates given by two variables. It is the only common chart that shows the joint distribution of two variables without aggregating.',
        simple: 'One dot per row, positioned by two of its columns.',
      },
      {
        term: 'Pearson correlation',
        definition:
          'The covariance of two variables divided by the product of their standard deviations. It lies in [-1, 1] and measures the strength of the linear relationship only.',
        simple: 'A number from -1 to 1 saying how close the dots are to a single straight line.',
      },
      {
        term: 'Spearman correlation',
        definition:
          'Pearson correlation applied to the ranks rather than the values. It measures monotonic association, so it detects a curved but consistently increasing relationship that Pearson understates.',
        simple: 'Correlation of the orderings rather than the numbers — catches "always rising" even when the rise is curved.',
      },
      {
        term: 'Overplotting',
        definition:
          'The condition where marks overlap so heavily that regions of very different density render identically, making the chart a poor representation of the data.',
        simple: 'So many dots on top of each other that you cannot tell a hundred from a hundred thousand.',
      },
      {
        term: 'Confounder',
        definition:
          'A third variable that causally influences both of two correlated variables, producing an association between them that would vanish if it were held fixed.',
        simple: 'A hidden cause behind both things, making them move together without either causing the other.',
      },
      {
        term: 'Heteroscedasticity',
        definition:
          'Non-constant spread of the response across the range of the predictor. In a scatter it looks like a fan or cone; it violates an assumption of ordinary least squares inference.',
        simple: 'The spread of the dots widens as you move right — a fan shape rather than a band.',
      },
    ],

    simpleExplanation:
      'A scatter plot puts one dot on the page for every row of your data, using one column to decide how far right the dot goes and another to decide how far up. That is all it does, and it is the most informative chart there is, because nothing has been summarised away. You read it by asking four questions in order. Which way does the cloud lean — up to the right, down, or not at all? That is direction. What shape does it make — a straight band, a curve, a fan that widens, two separate blobs? That is form. How tightly do the dots hug that shape? That is strength. And is anything sitting on its own, far from the rest? Those are the points worth investigating. People often skip straight to a single number, the correlation coefficient, and that number only answers the third question and only if the answer to the second was "a straight line". A perfect U-shaped relationship scores a correlation of zero, which does not mean there is no relationship; it means there is no straight one. Always look at the dots, then look at the number, and never the number alone.',

    whyItExists:
      'Two variables have a joint distribution, and no pair of one-dimensional summaries can describe it: two columns can each be perfectly normal while together forming a ring, a cross or two separated clusters. The scatter plot exists because it is the only cheap rendering of that joint structure, and because the alternative — reading a correlation coefficient — collapses the whole relationship into a single number that measures only straightness.',

    analogy: {
      scenario:
        "Imagine mapping where every tree in a forest stands, one pin per tree on a large map. Stand back and you see instantly whether the trees line up along a river, cluster in two groves with a clearing between them, thin out towards the ridge, or scatter with no pattern at all. Now imagine instead being handed a single number: the average compass bearing from the forest centre to a tree. That number is real and computable, and it tells you almost nothing — it would be identical for a forest that lines the river and a forest that forms a perfect circle, because the circle's bearings cancel out.",
      mapping: [
        { from: 'One pin per tree on the map', to: 'One mark per observation in a scatter plot' },
        { from: 'Trees lining up along the river', to: 'A strong relationship with a clear form' },
        { from: 'Two groves with a clearing between', to: 'Two clusters — usually two subpopulations in one dataset' },
        { from: 'The single average bearing', to: 'The Pearson correlation coefficient' },
        { from: 'The circle whose bearings cancel to zero', to: 'A symmetric non-linear relationship with r near zero' },
        { from: 'Pins so dense they become one dark blob', to: 'Overplotting, where density information is lost' },
      ],
      bridge:
        'The bearing and the correlation fail in the same way and for the same reason: both are averages over directions, and an average of directions that oppose each other is zero regardless of how strong each direction is. Pearson r is literally the average of the products of standardised deviations, so a relationship that goes down on the left and up on the right contributes negative and positive products that cancel. This is why a scatter plot is not a nicer way of presenting the correlation; it is strictly more information, and the coefficient is a lossy summary of it.',
      limitations:
        'The forest map is trustworthy at any density because the pins are physically separated, whereas a scatter plot of a million rows genuinely stops being faithful — ten points and ten thousand points paint the same black region. That is the failure the transparency, sampling and hexbin techniques in this unit exist to fix.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Reading a scatter plot in four passes',
        caption: 'Do them in this order. Most people jump to strength and skip form, which is where the modelling decisions live.',
        steps: [
          { label: 'Direction', detail: 'Does the cloud rise to the right, fall, or neither? This is the only question the sign of r answers.' },
          { label: 'Form', detail: 'Straight band, curve, fan, step, ring, two clusters? Form decides the model family and whether r is even meaningful.' },
          { label: 'Strength', detail: 'How tightly do points hug that form? A tight curve is a strong relationship even when r is near zero.' },
          { label: 'Unusual points', detail: 'Outliers in y, high-leverage points far out in x, and whole clusters sitting apart from the rest.' },
          { label: 'Density', detail: 'Ask whether you are seeing points or seeing saturation. If the middle is solid, the chart is hiding its own sample size.' },
        ],
      },
      {
        kind: 'table',
        title: 'Fixing overplotting: four techniques and their trade-offs',
        caption: 'The right choice depends on how many rows you have and whether you need individual points to remain visible.',
        columns: ['Technique', 'How', 'Good for', 'Cost'],
        rows: [
          ['Transparency', 'alpha=0.05 to 0.3, often with smaller marker size', 'Up to roughly 50,000 points', 'Dense cores still saturate to solid; hard to compare densities numerically'],
          ['Random sampling', 'df.sample(5000) before plotting', 'Any size; keeps a true scatter with individual points', 'Rare events and tails are thinned out, sometimes to nothing'],
          ['Hexbin', 'ax.hexbin(x, y, gridsize=50) with a colourbar', 'Hundreds of thousands to millions of rows', 'Individual outliers vanish into a bin of count one; needs a colourbar to be readable'],
          ['2-D density contours', 'sns.kdeplot(x=..., y=..., levels=...)', 'Showing the shape of the bulk, overlaying groups', 'Smooths across boundaries and can invent structure, exactly as a 1-D KDE does'],
          ['Jitter', 'Add small random noise to discrete coordinates', 'Integer or categorical coordinates stacking on the same point', 'Displaces the data slightly, so it must be small and disclosed'],
        ],
      },
      {
        kind: 'compare',
        title: 'What the correlation coefficient does and does not tell you',
        caption: 'Every item on the right is a reason the coefficient must be read next to the picture.',
        left: {
          heading: 'r tells you',
          points: [
            'The sign of the linear trend: rises or falls',
            'How tightly points cluster around the best straight line',
            'A scale-free number, unchanged by unit changes or affine rescaling',
            'r squared: the fraction of variance in y explained by a linear fit on x',
          ],
        },
        right: {
          heading: 'r does not tell you',
          points: [
            'Whether the relationship is straight at all — a parabola can score zero',
            'The slope: r = 0.9 is consistent with a slope of 0.001 or 1000',
            'Whether one or two points are producing the whole result',
            'Whether the cloud is one population or several with different trends',
            'Anything whatsoever about causation or direction of influence',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Why a correlation exists: five explanations, only one of them causal',
        caption: 'Before claiming X causes Y, you have to rule out the other four.',
        columns: ['Explanation', 'Example', 'How you would tell'],
        rows: [
          ['X causes Y', 'More training epochs lowers training loss', 'Intervene: change X deliberately and see whether Y moves'],
          ['Y causes X', 'Hospitals with more staff have sicker patients — severity drives staffing', 'Check the time ordering and the mechanism'],
          ['A confounder causes both', 'Ice-cream sales and drowning both rise with summer temperature', 'Condition on the suspected confounder and see whether the association survives'],
          ['Selection effect', 'Among admitted students, test scores and grades correlate negatively', 'Ask how the sample was selected and whether selection depends on both variables'],
          ['Coincidence', 'Two unrelated series both trending upward over a decade', 'Test out of sample, on a different period or population'],
        ],
      },
      {
        kind: 'widget',
        title: 'Which chart shows a relationship',
        caption: 'Compare the scatter against the alternatives for relationship questions with different data types.',
        widget: 'chart-chooser',
      },
    ],

    formalDefinition:
      'A scatter plot maps each observation of a bivariate sample to a point in the plane using position on two common scales, rendering the empirical joint distribution without aggregation. The Pearson correlation coefficient is the cosine of the angle between the two mean-centred data vectors, equivalently the covariance normalised by both standard deviations; it is invariant under separate positive affine transformations of each variable and is a complete summary of dependence only for jointly normal data.',

    math: {
      intuition:
        'Correlation has a geometric meaning that makes its limits obvious. Centre both variables by subtracting their means, and treat each as a vector in n-dimensional space with one coordinate per observation. Then r is exactly the cosine of the angle between those two vectors. Cosine is 1 when they point the same way, -1 when opposite, and 0 when perpendicular. Perpendicular does not mean unrelated — it means that, after centring, the two vectors have no common direction. A parabola produces a y vector that is perpendicular to the x vector even though y is a deterministic function of x, and that is the whole reason r = 0 does not imply independence. Squaring r gives the fraction of variance in y that a straight-line fit on x accounts for, which is why r = 0.5 corresponds to only a quarter of the variance explained.',
      formulas: [
        {
          latex: 'r = \\frac{\\operatorname{cov}(x, y)}{s_x s_y} = \\frac{\\sum_i (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_i (x_i - \\bar{x})^2}\\sqrt{\\sum_i (y_i - \\bar{y})^2}}',
          name: 'Pearson correlation coefficient',
          meaning:
            'Covariance rescaled so it cannot depend on units. It is the cosine of the angle between the two mean-centred data vectors, so it lies between -1 and 1 by the Cauchy-Schwarz inequality.',
          variables: [
            { symbol: 'x_i, y_i', meaning: 'the paired observations' },
            { symbol: '\\bar{x}, \\bar{y}', meaning: 'the sample means' },
            { symbol: 's_x, s_y', meaning: 'the sample standard deviations' },
            { symbol: '\\operatorname{cov}(x, y)', meaning: 'the sample covariance, the mean product of the deviations' },
          ],
          category: 'statistics',
        },
        {
          latex: 'r^2 = 1 - \\frac{\\sum_i (y_i - \\hat{y}_i)^2}{\\sum_i (y_i - \\bar{y})^2}',
          name: 'Coefficient of determination',
          meaning:
            'The fraction of the variance of y removed by a least-squares straight line on x. A correlation of 0.5 leaves 75 percent of the variance unexplained, which is why moderate correlations are weaker than they sound.',
          variables: [
            { symbol: '\\hat{y}_i', meaning: 'the value predicted by the fitted line' },
            { symbol: 'y_i - \\hat{y}_i', meaning: 'the residual for observation i' },
            { symbol: '\\bar{y}', meaning: 'the mean of y, the prediction you would make with no model' },
          ],
          category: 'regression',
        },
        {
          latex: '\\hat{\\beta} = r\\,\\frac{s_y}{s_x}, \\qquad \\hat{\\alpha} = \\bar{y} - \\hat{\\beta}\\bar{x}',
          name: 'Least-squares slope from the correlation',
          meaning:
            'Shows precisely why r is not a slope: the same r gives a different slope for every ratio of standard deviations. Change the unit of y from euros to cents and the slope multiplies by a hundred while r does not move.',
          variables: [
            { symbol: '\\hat{\\beta}', meaning: 'the fitted slope' },
            { symbol: '\\hat{\\alpha}', meaning: 'the fitted intercept' },
            { symbol: 's_y / s_x', meaning: 'the ratio of spreads, which carries all the unit dependence' },
          ],
          category: 'regression',
        },
        {
          latex: '\\rho_s = r_{\\,\\operatorname{rank}(x),\\ \\operatorname{rank}(y)}',
          name: 'Spearman rank correlation',
          meaning:
            'Pearson correlation of the ranks. It reaches 1 for any strictly increasing relationship, however curved, and is far less sensitive to a single extreme value.',
          variables: [
            { symbol: '\\operatorname{rank}(x)', meaning: 'the position of each x value in sorted order, ties averaged' },
            { symbol: '\\rho_s', meaning: "Spearman's rho, in [-1, 1]" },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Centre both variables: u = x - mean(x) and v = y - mean(y), each a vector of length n.',
        'The sample covariance is the inner product of u and v divided by n - 1.',
        'Dividing by the two standard deviations normalises both vectors to unit length.',
        'What remains is the inner product of two unit vectors, which is the cosine of the angle between them.',
        'Cosine lies in [-1, 1], giving the range of r, and equals zero exactly when the centred vectors are orthogonal — which is a statement about linear independence, not about independence.',
      ],
    },

    workedExample: {
      title: 'Computing r by hand on five points, then seeing what it missed',
      setup:
        'Five observations: (1, 2), (2, 4), (3, 5), (4, 4), (5, 2). We will compute the correlation and then look at what the number omitted.',
      steps: [
        {
          label: 'Means',
          detail: 'The x values sum to 15 and the y values sum to 17, so mean x is 3.0 and mean y is 3.4.',
          latex: '\\bar{x} = 3.0,\\quad \\bar{y} = 3.4',
        },
        {
          label: 'Deviations',
          detail:
            'x deviations are -2, -1, 0, 1, 2. y deviations are -1.4, 0.6, 1.6, 0.6, -1.4. Notice the y deviations are symmetric about the middle point while the x deviations are antisymmetric.',
        },
        {
          label: 'Products and sums',
          detail:
            'The products are 2.8, -0.6, 0.0, 0.6 and -2.8, which sum to exactly zero. The first and last cancel, and so do the second and fourth.',
          latex: '\\sum_i (x_i - \\bar{x})(y_i - \\bar{y}) = 0',
        },
        {
          label: 'The coefficient',
          detail:
            'The numerator is zero, so r = 0 regardless of the denominators. Reported alone, this says "no linear relationship", and a careless reader hears "no relationship".',
          latex: 'r = \\frac{0}{\\sqrt{10}\\,\\sqrt{7.2}} = 0',
        },
        {
          label: 'What the scatter shows',
          detail:
            'The five points form a clean inverted V: y rises from 2 to 5 as x goes 1 to 3, then falls symmetrically back to 2. y is very nearly a deterministic function of x. The relationship is strong, and Pearson r is exactly zero because the rising and falling halves contribute products that cancel.',
        },
        {
          label: 'What would have caught it',
          detail:
            "Spearman is also near zero here, because the relationship is not monotonic. What catches it is the picture, a quadratic fit, or a dependence measure such as mutual information or distance correlation. There is no scalar substitute for looking.",
        },
      ],
      conclusion:
        'Five points are enough to show that a correlation of exactly zero is compatible with an almost deterministic relationship. This is the same failure as Anscombe dataset II, reduced to arithmetic you can do in your head, and it is why every reported correlation in this curriculum appears beside its scatter plot.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Four relationships, four correlations, one lesson',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import pearsonr, spearmanr

rng = np.random.default_rng(13)
n = 300
x = rng.uniform(-3, 3, n)

cases = {
    "linear, noisy":      (x, 1.4 * x + rng.normal(0, 1.5, n)),
    "quadratic":          (x, x ** 2 + rng.normal(0, 0.6, n)),
    "monotonic but curved": (x, np.exp(x) + rng.normal(0, 1.0, n)),
    "linear + 1 outlier":  (np.append(x[:n - 1], 14.0), np.append(0.05 * x[:n - 1] + rng.normal(0, 1, n - 1), 22.0)),
}

fig, axes = plt.subplots(1, 4, figsize=(15, 3.8), layout="constrained")
for ax, (name, (xi, yi)) in zip(axes, cases.items()):
    r, _ = pearsonr(xi, yi)
    rho, _ = spearmanr(xi, yi)
    ax.scatter(xi, yi, s=14, alpha=0.6, color="#264653")
    ax.set_title(f"{name}\\nr = {r:+.2f}   rho = {rho:+.2f}", fontsize=10)
    ax.set_xlabel("x")
    ax.grid(alpha=0.25)
    print(f"{name:>22}  pearson {r:+.3f}   spearman {rho:+.3f}")
axes[0].set_ylabel("y")
fig.suptitle("The coefficient is never the whole story", fontsize=13)
fig.savefig("correlation_cases.png", dpi=200)`,
        output: `         linear, noisy  pearson +0.823   spearman +0.818
             quadratic  pearson -0.019   spearman -0.031
   monotonic but curved  pearson +0.762   spearman +0.988
     linear + 1 outlier  pearson +0.905   spearman +0.079`,
        explanation:
          'Four panels, and each one breaks a different intuition. The first is an honest upward band with r = 0.82, the case everyone imagines. The second is an unmistakable parabola — a clean U of points — with r = -0.02: the relationship is nearly deterministic and Pearson reports nothing, because the falling left half and the rising right half cancel. The third is a curve that only ever rises, where Pearson says 0.76 but Spearman says 0.99, which is the signature of a strong monotonic relationship that is not straight. The fourth is the most alarming: a shapeless blob of 299 points near the origin with essentially no trend, plus one point at (14, 22) far to the upper right, and that single point alone produces r = 0.91. Spearman, working on ranks, is unmoved at 0.08. Print the coefficient if you like, but never without the panel above it.',
      },
      {
        language: 'python',
        title: 'Overplotting and three ways out of it',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(2)
n = 400_000
x = rng.normal(0, 1, n)
y = 0.7 * x + rng.normal(0, 0.7, n)
# A small, genuinely interesting second cluster that overplotting will hide.
x = np.concatenate([x, rng.normal(3.2, 0.25, 2000)])
y = np.concatenate([y, rng.normal(-2.5, 0.25, 2000)])

fig, axes = plt.subplots(1, 4, figsize=(16, 4), sharex=True, sharey=True, layout="constrained")

axes[0].scatter(x, y, s=6)
axes[0].set_title(f"Naive scatter, n = {x.size:,}")

axes[1].scatter(x, y, s=3, alpha=0.02, color="#264653")
axes[1].set_title("alpha = 0.02")

idx = rng.choice(x.size, 4000, replace=False)
axes[2].scatter(x[idx], y[idx], s=8, alpha=0.5, color="#264653")
axes[2].set_title("random sample of 4,000")

hb = axes[3].hexbin(x, y, gridsize=60, bins="log", cmap="viridis")
axes[3].set_title("hexbin, log colour scale")
fig.colorbar(hb, ax=axes[3], label="log10(count)")

for ax in axes:
    ax.set_xlabel("x")
axes[0].set_ylabel("y")
fig.suptitle("The same 402,000 points drawn four ways")
fig.savefig("overplotting.png", dpi=200)

print("points:", x.size, "| second cluster size:", 2000, f"({2000 / x.size:.2%} of rows)")`,
        output: `points: 402000 | second cluster size: 2000 (0.50%)`,
        explanation:
          'Four panels of identical data. The first is a solid navy lozenge: every mark is opaque, so 400,000 points and 4,000 points render the same, and the only readable feature is the outline. The second, at alpha 0.02, recovers the density gradient — the core is dark and the edges fade — and the small second cluster at roughly (3.2, -2.5) appears as a faint but distinct smudge. The third plots a random sample of 4,000 points; the main cloud is rendered beautifully with individual points visible, but the rare cluster is now represented by only about twenty points and is easy to miss, which is the cost of sampling. The fourth, hexbin with a log colour scale, is the most quantitative: the colourbar means you can read approximate counts off the page rather than guessing from ink density, and the second cluster shows as a small patch of distinctly coloured hexagons. For hundreds of thousands of rows, hexbin plus a colourbar is usually the right default, with a sampled scatter beside it when individual points matter.',
      },
      {
        language: 'python',
        title: 'Confounding: the same data tells opposite stories',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import pearsonr

rng = np.random.default_rng(8)

# Three hospitals. Severity drives both the treatment dose and the bad outcome.
rows = []
for hospital, severity, dose_shift in [("A", 1.0, 0.0), ("B", 2.0, 2.0), ("C", 3.0, 4.0)]:
    n = 200
    dose = rng.normal(5 + dose_shift, 1.0, n)
    # Within a hospital, MORE dose genuinely REDUCES the bad outcome.
    outcome = 10 + 4 * severity - 0.8 * (dose - dose.mean()) + rng.normal(0, 1.0, n)
    rows.append((hospital, dose, outcome))

all_dose = np.concatenate([d for _, d, _ in rows])
all_outcome = np.concatenate([o for _, _, o in rows])
r_pooled, _ = pearsonr(all_dose, all_outcome)

fig, (ax_pool, ax_split) = plt.subplots(1, 2, figsize=(11.5, 4.5), sharey=True, layout="constrained")

ax_pool.scatter(all_dose, all_outcome, s=12, alpha=0.5, color="#6b7280")
b, a = np.polyfit(all_dose, all_outcome, 1)
grid = np.linspace(all_dose.min(), all_dose.max(), 50)
ax_pool.plot(grid, a + b * grid, color="#e76f51", linewidth=2)
ax_pool.set_title(f"Pooled: r = {r_pooled:+.2f}, slope = {b:+.2f}")
ax_pool.set_xlabel("dose (mg)")
ax_pool.set_ylabel("bad-outcome score")

for (hospital, dose, outcome), colour in zip(rows, ["#264653", "#2a9d8f", "#e9c46a"]):
    r_h, _ = pearsonr(dose, outcome)
    b_h, a_h = np.polyfit(dose, outcome, 1)
    g = np.linspace(dose.min(), dose.max(), 30)
    ax_split.scatter(dose, outcome, s=12, alpha=0.6, color=colour, label=f"hospital {hospital}: r = {r_h:+.2f}")
    ax_split.plot(g, a_h + b_h * g, color=colour, linewidth=2)
    print(f"hospital {hospital}: r = {r_h:+.3f}  slope = {b_h:+.3f}")
ax_split.set_title("Split by hospital: every slope is negative")
ax_split.set_xlabel("dose (mg)")
ax_split.legend(frameon=False, fontsize=9)

print(f"pooled:     r = {r_pooled:+.3f}  slope = {b:+.3f}")
fig.suptitle("Simpson's paradox: pooling reverses the sign of the effect")
fig.savefig("confounding.png", dpi=200)`,
        output: `hospital A: r = -0.617  slope = -0.797
hospital B: r = -0.593  slope = -0.766
hospital C: r = -0.596  slope = -0.822
pooled:     r = +0.868  slope = +1.686`,
        explanation:
          'The left panel is a single grey cloud sloping clearly upward, with a red line through it and a correlation of +0.87 — read naively it says higher doses cause worse outcomes. The right panel is the same 600 points coloured by hospital, and it shows three separate elongated clusters arranged like a staircase going up to the right, each of which slopes downward internally. Every within-hospital correlation is about -0.6. Nothing in the data changed; only the grouping variable was revealed. The mechanism is that severity drives both the dose prescribed and the outcome, so severity is a confounder, and pooling across hospitals with different severity mixes reverses the apparent sign. This is Simpson paradox, and it is the single most concrete reason to distrust a correlation computed on pooled observational data.',
      },
      {
        language: 'python',
        title: 'Residual plots: checking a fit with a scatter',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(21)
x = rng.uniform(0, 10, 400)
y_true = 3 + 0.4 * x ** 2                      # the real relationship curves
y = y_true + rng.normal(0, 1 + 0.35 * x, 400)  # and the noise grows with x

slope, intercept = np.polyfit(x, y, 1)
pred = intercept + slope * x
resid = y - pred

fig, (ax_fit, ax_res) = plt.subplots(1, 2, figsize=(11.5, 4.3), layout="constrained")

ax_fit.scatter(x, y, s=14, alpha=0.6, color="#264653")
grid = np.linspace(0, 10, 50)
ax_fit.plot(grid, intercept + slope * grid, color="#e76f51", linewidth=2)
ax_fit.set_xlabel("x")
ax_fit.set_ylabel("y")
ax_fit.set_title(f"Linear fit, r^2 = {np.corrcoef(x, y)[0, 1] ** 2:.2f}")

ax_res.axhline(0, color="grey", linewidth=1)
ax_res.scatter(x, resid, s=14, alpha=0.6, color="#2a9d8f")
ax_res.set_xlabel("x")
ax_res.set_ylabel("residual")
ax_res.set_title("Residuals: curvature AND a widening fan")

fig.suptitle("A respectable r-squared hiding two violated assumptions")
fig.savefig("residuals.png", dpi=200)

left = resid[x < 3].mean()
mid = resid[(x >= 3) & (x < 7)].mean()
right = resid[x >= 7].mean()
print(f"mean residual  x<3: {left:+.2f}   3<=x<7: {mid:+.2f}   x>=7: {right:+.2f}")
print(f"residual sd    x<3: {resid[x < 3].std():.2f}   x>=7: {resid[x >= 7].std():.2f}")`,
        output: `mean residual  x<3: +2.31   3<=x<7: -2.74   x>=7: +2.26
residual sd    x<3: 1.55   x>=7: 3.74`,
        explanation:
          'The left panel shows a rising cloud with a straight red line through it and an r-squared around 0.87, which in isolation looks like a good fit. The right panel is where the truth lives. The residuals form an unmistakable U: positive on the left, dipping well below zero in the middle, positive again on the right — the printed means of +2.31, -2.74 and +2.26 quantify exactly that. Structure in residuals means the functional form is wrong, and this U is the signature of fitting a line to a curve. Simultaneously the vertical spread of the residuals widens from left to right, a fan shape, and the printed standard deviations of 1.55 and 3.74 confirm the noise more than doubles across the range. That is heteroscedasticity, which leaves the fitted slope unbiased but makes the usual standard errors and prediction intervals wrong. Two violated assumptions, both invisible in r-squared, both obvious in one scatter of residuals — which is why a residual plot is the standard next step after any fit.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature selection during model development',
        usage:
          'Plotting each candidate feature against the target reveals which relationships are linear, which need a transform and which are step functions. A correlation table alone would rank a strong quadratic feature as useless.',
      },
      {
        context: 'Predicted versus actual for a regression model',
        usage:
          'A scatter of predictions against truth with a 45-degree reference line is the standard diagnostic. Points bending away from the line at the extremes reveal the model regressing towards the mean, which no aggregate error metric shows.',
      },
      {
        context: 'A/B test analysis on observational slices',
        usage:
          'Splitting results by device, country or cohort routinely reverses an effect visible in the pooled data, because assignment and outcome share a confounder. This is Simpson paradox appearing in ordinary product analytics.',
      },
      {
        context: 'Embedding inspection in NLP and computer vision',
        usage:
          'Two-dimensional projections of learned embeddings are scatter plots of hundreds of thousands of points, where transparency or density binning is mandatory and where apparent clusters must be checked against labels before being believed.',
      },
    ],

    projectConnections: [
      { tool: 'matplotlib', role: 'ax.scatter with s, alpha and c; ax.hexbin with a colourbar for large data.' },
      { tool: 'SciPy', role: 'scipy.stats.pearsonr and spearmanr return the coefficient and a p-value; disagreement between them signals a monotonic but non-linear relationship.' },
      { tool: 'pandas', role: 'df.corr() builds a correlation matrix and df.corr(method="spearman") the rank version; both need scatter plots beside them to be safely interpreted.' },
      { tool: 'seaborn', role: 'sns.regplot adds a fit with a confidence band; sns.pairplot draws every pairwise scatter at once.' },
      { tool: 'scikit-learn', role: 'PredictionErrorDisplay draws predicted-versus-actual and residual scatter plots directly from a fitted estimator.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reporting a correlation without showing the scatter plot',
        why: 'r measures only straightness. A parabola scores zero, a single leverage point can manufacture 0.9 from noise, and two subgroups with opposite trends can average to nothing.',
        fix: 'Put the coefficient in the panel title of the scatter it came from. If a chart is not feasible, at least report Pearson and Spearman together and treat a large gap between them as a warning.',
      },
      {
        mistake: 'Reading r as a slope or as a measure of effect size',
        why: 'The slope is r times the ratio of standard deviations, so the same r is compatible with any slope at all. Changing the units of y changes the slope and leaves r untouched.',
        fix: 'Report the slope with its units when the question is "how much does y change", and reserve r for "how tightly do the points follow a line".',
      },
      {
        mistake: 'Plotting a million points as an opaque scatter',
        why: 'Once marks saturate, the chart shows the support of the data but not its density, so a region with ten points and a region with ten thousand look identical.',
        fix: 'Use alpha with a small marker size, sample and say how many you sampled, or use hexbin with a colourbar. State the technique in the caption so the reader knows what they are looking at.',
      },
      {
        mistake: 'Inferring causation from an observational correlation',
        why: 'The association is equally consistent with reverse causation, a confounder driving both, selection into the sample, or coincidence. Simpson paradox shows the pooled sign can even be the opposite of every subgroup sign.',
        fix: 'Name the alternative explanations explicitly and test what you can: condition on suspected confounders, check time ordering, and where possible run an intervention such as a randomised experiment.',
      },
      {
        mistake: 'Stopping at r-squared instead of plotting residuals',
        why: 'r-squared is a single aggregate that a curved fit and a fan-shaped noise pattern can both survive with a respectable value, as the residual example in this unit shows.',
        fix: 'Always plot residuals against the predictor and against the fitted values. Structureless residuals are the check; any visible pattern is signal the model missed.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'A feature has a Pearson correlation of 0.02 with the target. Should you drop it?',
        answer:
          'Not on that basis alone. Pearson r measures the strength of the linear relationship only, so a feature that is strongly but non-monotonically related — a U shape, a threshold effect, an interaction that only matters in one region — will score near zero while carrying real signal. The first thing I would do is plot the feature against the target; the second is compute Spearman, since a big gap between Pearson and Spearman indicates a monotonic but curved relationship; the third is check whether the relationship exists within subgroups but cancels when pooled. I would also remember that tree-based models and neural networks capture non-linear structure that a correlation screen cannot see, so a correlation filter is a crude feature-selection tool at best. Mutual information or a model-based importance measure is a better screen if one is needed.',
        followUp:
          'A strong answer mentions that a feature can also be valuable through interactions while having near-zero marginal association with the target.',
      },
      {
        level: 'intermediate',
        question: 'You have 5 million rows and need a scatter plot of two features. How do you produce something honest?',
        answer:
          'An opaque scatter of 5 million points is not a plot of the data, it is a plot of its support, so I would not draw one. My default is hexbin with a logarithmic colour scale and a colourbar, because the count per hexagon is then readable rather than guessed from ink density, and the log scale keeps both the dense core and the sparse tails legible. Alongside it I would draw a random sample of a few thousand points as a true scatter, because individual points and outliers matter and hexbin absorbs an isolated point into a bin of count one. I would state the sample size in the caption. If the goal is comparing groups rather than seeing raw density, two-dimensional KDE contours per group are more legible than either, provided I remember that the smoothing can invent structure near boundaries. What I would avoid is silently downsampling and presenting the result as if it were everything.',
        followUp:
          'Mentioning that rare but important events — fraud cases, failures — are exactly what sampling destroys, and should be overlaid separately, distinguishes a careful answer.',
      },
      {
        level: 'ml-engineer',
        question: 'Explain Simpson paradox to a product manager who has just seen that heavier feature usage correlates with higher churn.',
        answer:
          'The pooled number can have the opposite sign from every group inside it. Suppose enterprise customers use the feature heavily and churn at 3 percent, while self-serve customers use it lightly and churn at 1 percent. Within each group, more usage genuinely predicts lower churn — the engaged users stay. But because the heavy-usage group also has the higher baseline churn for unrelated reasons, pooling the two makes usage look harmful. The account type is a confounder: it influences both usage and churn, so comparing across it compares apples with oranges. The practical response is to segment before drawing any conclusion, check whether the sign holds within every segment, and if we actually want to know whether the feature causes retention, run an experiment: randomise who gets nudged towards the feature, because randomisation is what breaks the link between the treatment and the confounder.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute Pearson r by hand for the points (1, 5), (2, 3), (3, 1), (4, 3), (5, 5), then describe the scatter and say what the coefficient missed.',
        hint: 'Find the mean of each variable, form the deviation products, and look at whether they cancel.',
        solution:
          'Mean x is 3, mean y is 3.4. The x deviations are -2, -1, 0, 1, 2 and the y deviations are 1.6, -0.4, -2.4, -0.4, 1.6. The products are -3.2, 0.4, 0.0, -0.4 and 3.2, which sum to exactly zero, so r = 0.\n\nThe scatter is a clean V: y falls from 5 to 1 as x goes from 1 to 3, then rises symmetrically back to 5. y is a deterministic function of x apart from nothing at all — the relationship is perfect. Pearson reports zero because the descending half contributes negative products and the ascending half contributes matching positive ones. Spearman is also near zero, since the relationship is not monotonic. The general lesson: r = 0 rules out a straight-line relationship and rules out nothing else.',
      },
      {
        prompt:
          'Write code that draws a predicted-versus-actual scatter for a regression model, including a 45-degree reference line, the r-squared in the title, and a treatment for overplotting suitable for 200,000 predictions.',
        hint: 'Equal axis limits and aspect ratio are what make the 45-degree line meaningful.',
        language: 'python',
        starterCode:
          'import numpy as np\nimport matplotlib.pyplot as plt\n\n# y_true and y_pred are arrays of length 200_000\n',
        solution:
          'lo = min(y_true.min(), y_pred.min())\nhi = max(y_true.max(), y_pred.max())\n\nfig, ax = plt.subplots(figsize=(5.5, 5.5), layout="constrained")\nhb = ax.hexbin(y_true, y_pred, gridsize=70, bins="log", cmap="viridis", extent=(lo, hi, lo, hi))\nax.plot([lo, hi], [lo, hi], color="#e76f51", linewidth=1.5, linestyle="--", label="perfect prediction")\nr2 = 1 - ((y_true - y_pred) ** 2).sum() / ((y_true - y_true.mean()) ** 2).sum()\nax.set_xlim(lo, hi)\nax.set_ylim(lo, hi)\nax.set_aspect("equal")\nax.set_xlabel("actual")\nax.set_ylabel("predicted")\nax.set_title(f"Predicted vs actual, r^2 = {r2:.3f}")\nax.legend(frameon=False)\nfig.colorbar(hb, ax=ax, label="log10(count)")\n\nThree details carry the weight. Equal limits and set_aspect("equal") make the 45-degree line a genuine reference rather than an arbitrary diagonal. Hexbin with a log colour scale handles 200,000 points honestly and gives readable counts. And plotting predicted on the vertical axis against actual on the horizontal is the convention that makes the classic pathology visible: if the cloud is flatter than the reference line, the model is regressing towards the mean and under-predicting at both extremes.',
      },
      {
        prompt:
          'A study reports that people who own more books score higher on reading tests, r = 0.45, and concludes that buying books raises reading ability. Give three non-causal explanations and describe a study design that would settle it.',
        hint: 'Work through the table of five explanations: reverse causation, confounding, selection, coincidence.',
        solution:
          'Three alternatives. Reverse causation: people who read well enjoy reading, so they buy more books — ability drives ownership rather than the other way round. Confounding: household income and parental education plausibly raise both book ownership and test scores, so the association could disappear entirely once you condition on them. Selection: if the sample came from library members or an online survey about reading, both variables influenced who is in the sample, which can manufacture or distort an association.\n\nTo settle it you need an intervention that breaks the link between book ownership and everything else. Randomly assign a book-provision programme: give a randomly chosen half of comparable households a substantial number of age-appropriate books, change nothing else, and measure reading scores after a fixed period. Randomisation makes the treated and untreated groups equal in expectation on income, parental education, prior ability and every unmeasured confounder, so a difference in outcomes is attributable to the books. Where randomisation is impossible, a natural experiment or a difference-in-differences design around a policy change is the next best evidence, and an observational correlation of 0.45 — which corresponds to only 20 percent of variance explained — is the weakest.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-005-q1',
        type: 'mcq',
        concept: 'correlation limits',
        prompt: 'A scatter plot shows a clean, tight parabola. What is the approximate Pearson correlation?',
        options: [
          'Near zero, because the relationship is strong but not linear',
          'Near +1, because the relationship is strong',
          'Near -1, because the curve turns downward on one side',
          'Undefined, because the relationship is not a function',
        ],
        answerIndex: 0,
        explanation:
          'Pearson measures only the straight-line component. In a symmetric parabola the falling half and the rising half contribute deviation products that cancel, giving r near zero despite an almost deterministic relationship. This is Anscombe dataset II in one sentence.',
      },
      {
        id: 'VIZ-005-q2',
        type: 'truefalse',
        concept: 'r is not a slope',
        prompt: 'A correlation of 0.9 means y increases by 0.9 units for each unit increase in x.',
        answer: false,
        explanation:
          'The slope is r times the ratio of the standard deviations, so the same r is compatible with any slope. Change the units of y from metres to millimetres and the slope multiplies by a thousand while r does not move at all.',
      },
      {
        id: 'VIZ-005-q3',
        type: 'match',
        concept: 'overplotting fixes',
        prompt: 'Match each overplotting technique to its main drawback.',
        pairs: [
          { left: 'Transparency (low alpha)', right: 'Very dense cores still saturate to solid colour' },
          { left: 'Random sampling', right: 'Rare events and tail points are thinned away' },
          { left: 'Hexbin with a colourbar', right: 'An isolated outlier becomes one bin of count one and disappears' },
          { left: '2-D KDE contours', right: 'Smoothing can invent structure and leak past hard boundaries' },
        ],
        explanation:
          'Each technique trades away something different: alpha keeps every point but loses resolution in the core, sampling keeps individual points but loses rare ones, hexbin quantifies density but loses individuals, and KDE gives a clean shape but is an estimate rather than the data.',
      },
      {
        id: 'VIZ-005-q4',
        type: 'numeric',
        concept: 'r-squared',
        prompt: 'A feature has Pearson correlation 0.5 with the target. What fraction of the variance in the target does a straight-line fit on that feature explain? Give a decimal.',
        answer: 0.25,
        tolerance: 0.001,
        explanation:
          'The explained fraction is r squared, so 0.5 squared is 0.25 — a quarter of the variance, leaving three quarters unexplained. This is why moderate correlations sound far stronger than they are, and why r should usually be reported alongside r squared.',
      },
      {
        id: 'VIZ-005-q5',
        type: 'multi',
        concept: 'causation',
        prompt: 'Cities with more police officers report more crime. Which explanations are consistent with that correlation? Select all that apply.',
        options: [
          'City size confounds both: larger cities have more police and more crime',
          'Reverse causation: higher crime leads cities to hire more police',
          'Reporting effects: more officers means more crimes are recorded rather than committed',
          'The correlation proves that police presence causes crime',
          'Selection: only cities meeting a funding threshold appear in the dataset',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Confounding by population, reverse causation, a measurement effect on recording, and selection into the sample are all consistent with the data. The only claim ruled out is the causal one, which requires an intervention or a design that breaks the link between police numbers and the alternatives.',
      },
      {
        id: 'VIZ-005-q6',
        type: 'explain',
        concept: 'residual plots',
        prompt: 'You fit a linear model, get r-squared of 0.87, and the residual plot shows a clear U shape that widens to the right. Explain what each feature means and what you would do.',
        rubric: [
          'Identifies the U shape as wrong functional form — the true relationship curves',
          'Identifies the widening as heteroscedasticity and says what it invalidates',
          'Proposes concrete fixes for both, such as a transform or an added term, and robust or weighted inference',
        ],
        sampleAnswer:
          'The U says the model has the wrong functional form. Residuals from a well-specified model should look structureless, so a systematic pattern of positive residuals at both ends and negative in the middle means the true relationship curves and the straight line is cutting through it — the model will over-predict in the middle and under-predict at the extremes no matter how much data I add. The widening says the noise grows with x, which is heteroscedasticity; it leaves the fitted slope unbiased but makes the reported standard errors, p-values and prediction intervals wrong, and in particular too narrow where the noise is largest. For the curvature I would add a quadratic term, use a spline, or transform x or y — a log on y often fixes both problems at once when the data are positive. For the remaining non-constant spread I would use heteroscedasticity-robust standard errors or weighted least squares, and I would re-plot the residuals to confirm the structure has gone.',
        explanation:
          'A complete answer separates the two diagnoses, states the different consequences (biased predictions versus invalid inference), and gives a concrete remedy for each rather than just naming the problems.',
      },
    ],

    flashcards: [
      { front: 'The four things to read off a scatter plot', back: 'Direction, form, strength and unusual points — plus a fifth check on whether overplotting is hiding density.' },
      { front: 'What does Pearson r actually measure?', back: 'The strength of the linear relationship only. Geometrically it is the cosine of the angle between the two mean-centred data vectors.' },
      { front: 'Why can r be 0 for a strong relationship?', back: 'Because a non-monotonic relationship contributes deviation products that cancel. A clean parabola has r near zero and is almost deterministic.' },
      { front: 'Pearson versus Spearman', back: 'Pearson on the values measures linearity; Spearman on the ranks measures monotonicity. A big gap between them means the relationship is curved but consistently rising or falling.' },
      { front: 'How do you plot a million points honestly?', back: 'Hexbin with a colourbar and a log colour scale, plus a random sample drawn as a true scatter; state the sample size in the caption.' },
      { front: 'What does a U-shaped residual plot mean?', back: 'The functional form is wrong — a straight line has been fitted to a curved relationship. Add a term, use a spline, or transform a variable.' },
      { front: "What is Simpson's paradox?", back: 'The pooled association can have the opposite sign to the association within every subgroup, because a confounder drives both the grouping and the outcome.' },
      { front: 'What does r = 0.5 imply about explained variance?', back: 'r squared is 0.25, so a linear fit explains a quarter of the variance and leaves three quarters unexplained.' },
    ],

    challenge: {
      title: 'A relationship report that refuses to be fooled',
      brief:
        'Write examine_relationship(x, y, group=None) that produces a three-panel figure and a printed verdict. Panel one is the scatter, drawn with the overplotting technique appropriate to the sample size (points under 5,000, alpha between 5,000 and 100,000, hexbin above), with Pearson and Spearman in the title. Panel two is the same data with a least-squares line and, if the gap between Pearson and Spearman exceeds 0.15, a quadratic fit overlaid too. Panel three is the residual plot from the linear fit with a horizontal zero line. If a group array is supplied, also compute and print the within-group correlations and flag loudly when any within-group sign differs from the pooled sign. The printed verdict must name the detected form — linear, monotonic-curved, non-monotonic, outlier-driven or none — using stated rules.',
      language: 'python',
      acceptanceCriteria: [
        'The overplotting technique is selected automatically from the sample size and stated on the chart',
        'Both Pearson and Spearman are computed and shown, and their disagreement drives the quadratic overlay',
        'The residual panel is drawn with a zero reference line',
        'Leverage is checked: the function reports how much r changes when the single most extreme point is removed',
        'When a group array is supplied, a sign reversal between pooled and within-group correlations is flagged explicitly',
      ],
      starterCode:
        'import numpy as np\nimport matplotlib.pyplot as plt\nfrom scipy.stats import pearsonr, spearmanr\n\n\ndef examine_relationship(x, y, group=None):\n    x, y = np.asarray(x, float), np.asarray(y, float)\n    r, _ = pearsonr(x, y)\n    rho, _ = spearmanr(x, y)\n    # Build the three panels and the printed verdict here.\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how to read a scatter plot properly, and explain why the correlation coefficient is never a substitute for looking at one.',
      mustCover: [
        'A scatter plot shows the joint distribution without aggregating: direction, form, strength and unusual points',
        'Pearson r measures only the linear component, so a curve can score zero and a single point can manufacture a high value',
        'Overplotting makes a dense scatter unfaithful, and alpha, sampling or hexbin are the fixes',
        'Correlation does not establish causation: confounding, reverse causation and selection are all live alternatives',
      ],
      bonusSignals: [
        'mentions Spearman and what a Pearson-Spearman gap indicates',
        'mentions residual plots as the follow-up to any fit',
        "mentions Simpson's paradox or gives a concrete confounder",
      ],
      sampleExplanation:
        'A scatter plot puts one dot per row on the page, positioned by two of its columns, and it is the most information-dense chart there is because nothing has been averaged away. Read it in four passes: which way does the cloud lean, what shape does it make, how tightly do the dots hug that shape, and is anything sitting on its own far from the rest. Now the correlation coefficient. It answers only the third question, and only if the answer to the second was "a straight line". A clean parabola — a strong, nearly deterministic relationship — has a correlation of essentially zero, because the falling half and the rising half cancel. Equally, a shapeless blob plus one far-off point can score 0.9, with that single point producing the entire result. So the coefficient goes in the title of the scatter, not instead of it. And even a genuine, strong, linear correlation says nothing about cause. Ice-cream sales and drownings move together because both rise with summer heat; police numbers and crime move together because both rise with city size. Before claiming that x causes y, you have to rule out that y causes x, that something else causes both, and that the way the sample was collected created the pattern — and the only thing that reliably settles it is intervening rather than observing.',
    },
  },
